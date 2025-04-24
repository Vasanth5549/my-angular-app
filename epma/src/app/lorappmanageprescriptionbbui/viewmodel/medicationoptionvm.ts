import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, List, ObservableCollection, CListItem, RTEEventargs, CValuesetTerm, AppSessionInfo, ContextInfo, PatientContext, ClerkFormViewDeftBehaviour } from 'epma-platform/models';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate, ProcessRTE } from 'epma-platform/services';
import * as Application from 'src/app/lorappcommonbb/amshelper';
import { ObjectHelper } from 'epma-platform/helper';
  import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity } from 'epma-platform/services';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import { Dictionary } from 'src/app/shared/epma-platform/index.dictionary';
import { IViewModelBase, ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { IPPMABaseVM } from './ippmabasevm';
import { PrescriptionItemVM } from './PrescriptionItemVM';
import * as ManagePrescSer from '../../shared/epma-platform/soap-client/ManagePrescriptionWS';
import * as MedicationMgmtSer from '../../shared/epma-platform/soap-client/MedicationMgmtWS'

import * as IPPMAManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS'
import { MulticomponentChildVM, MulticomponentVM } from './MulticomponentVM';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { RelateItem } from './RelateItem';
import { ProfileData } from '../utilities/profiledata';
import { CReqMsgGetAlternateOptions, CReqMsgGetItemMongraph, CReqMsgGetProductPackOptions, CReqMsgGetRelatedOptions, CResMsgGetAlternateOptions, CResMsgGetItemMongraph, CResMsgGetProductPackOptions, CResMsgGetRelatedOptions, DrugItemInputData, DrugProperty, GetAlternateOptionsCompletedEventArgs, GetItemMongraphCompletedEventArgs, GetProductPackOptionsCompletedEventArgs, GetRelatedOptionsCompletedEventArgs, ManagePrescriptionWSSoapClient, MonographInfo } from '../../shared/epma-platform/soap-client/ManagePrescriptionWS';
import { DoseTypeCode, PrescriptionTypes } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { CConstants, ValueDomain } from '../utilities/constants';
import { MedicationCommonConceptCodeData, MedicationCommonProfileData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { PackOptionItem } from '../model/common';
import { Common } from '../utilities/common';
import { AlternateItem } from './alternateitem';
import { CValuesetCollection } from 'src/app/shared/epma-platform/soap-client/CReferenceWS';
import 'epma-platform/booleanextension';
import 'epma-platform/numberextension';
import 'epma-platform/stringextension';
import {iMath as Math} from 'epma-platform/mathextension';
import 'epma-platform/arrayextension';
import { InjectorInstance } from 'src/app/app.module';
import { SubjectEventEmitterService } from 'src/app/shared/epma-platform/services/subject-eventemitter.service';

    export class MedicationOptionVM extends ViewModelBase implements IViewModelBase {
        private dicProductType: Dictionary<string, string>;
        private sRelatedFormValue: string;
        private sAlternateFormValue: string;
        private _bIsFormularyCheckedProductOptions: boolean = false;
        private oIPPMABaseVM: IPPMABaseVM;
        public _LstNonFormularyDOS: List<PrescriptionItemVM>;
        constructor();
        constructor(obj?: IPPMABaseVM);
        constructor(obj?: IPPMABaseVM)
        {
            super();
            switch (arguments.length)
            {
                case 1:
                    this.oIPPMABaseVM = obj;
                    break;
            }
        }
        public get IsFormularyCheckedProductOptions(): boolean {
            return this._bIsFormularyCheckedProductOptions;
        }
        public set IsFormularyCheckedProductOptions(value: boolean) {
            this._bIsFormularyCheckedProductOptions = value;
           //NotifyPropertyChanged("IsFormularyCheckedProductOptions");
            if (this._bIsFormularyCheckedProductOptions) {
                this.IsFormulary = "0";
            }
            else this.IsFormulary = "1";
            this.CallWebServicePackOptionItem();
        }
        private _TagObjVM: ManagePrescSer.ConstituentItem;
        public get TagObjVM(): ManagePrescSer.ConstituentItem {
            return this._TagObjVM;
        }
        public set TagObjVM(value: ManagePrescSer.ConstituentItem) {
            this._TagObjVM = value;
        }
        private _bIsFormularyCheckedPrescOptions: boolean = false;
        public get IsFormularyCheckedPrescOptions(): boolean {
            return this._bIsFormularyCheckedPrescOptions;
        }
        public set IsFormularyCheckedPrescOptions(value: boolean) {
            this._bIsFormularyCheckedPrescOptions = value;
           //NotifyPropertyChanged("IsFormularyCheckedPrescOptions");
            if (this.TagObjVM != null) {
                if (this._bIsFormularyCheckedPrescOptions) {
                    this.TagObjVM.IsFormulary = "0";
                }
                else this.TagObjVM.IsFormulary = "1";
                if (this.TagObjVM.OID > 0) {
                    this.GetProcessingDetails(this.TagObjVM);
                }
                else {
                    this.GetRelatedPrescibeOptionDetails(this.TagObjVM);
                }
            }
        }
        private _oDetails: string[];
        public AlternateoptionChangedEvent: Function;
        private aRelateList: ObservableCollection<AlternateItem>=new ObservableCollection<AlternateItem>();
        public get ODetails(): string[] {
            return this._oDetails;
        }
        public set ODetails(value: string[]) {
            if (this._oDetails != value) {
                this._oDetails = value;
               //NotifyPropertyChanged("ODetails");
            }
        }
        public get ARelateList(): ObservableCollection<AlternateItem> {
            return this.aRelateList;
        }
        public set ARelateList(value: ObservableCollection<AlternateItem>) {
            if (this.aRelateList != value) {
               // this.aRelateList = value;
                this.aRelateList.CopyFrom(value);
                if (this.AlternateoptionChangedEvent != null) {
                    this.AlternateoptionChangedEvent();
                }
            }
        }
        getAlternateOptionCalled:boolean=false;
        public SetODetails(_oDetails: string[], IsFormularyRelatedOption: string): void {
            this.ODetails = _oDetails;
            if (this.dicProductType == null || (this.dicProductType != null && this.dicProductType.Count() == 0)) {
                this.sAlternateFormValue = IsFormularyRelatedOption;
                ProcessRTE.GetValuesByDomainCode(ValueDomain.ProductType, (s,e) => {this.OnRTEResult(s);});
            }
            else this.GetAlternateOptions(IsFormularyRelatedOption);
            if(this.getAlternateOptionCalled===false){
                this.GetAlternateOptions(IsFormularyRelatedOption);
            }
           this.getAlternateOptionCalled=false;
        }
        public GetAlternateOptions(IsFormularyRelatedOption: string): void {
            this.getAlternateOptionCalled=true;
            let objService: ManagePrescriptionWSSoapClient = new ManagePrescriptionWSSoapClient();
            objService.GetAlternateOptionsCompleted  = (s,e) => { this.objService_GetAlternateOptionsCompleted(s,e); } ;
            let objReqProcess: CReqMsgGetAlternateOptions = new CReqMsgGetAlternateOptions();
            objReqProcess.oContextInformation = Common.FillContext();
            objReqProcess.oDrugItemBasicDataBC = new DrugItemInputData();
            objReqProcess.oDrugItemBasicDataBC.IdentifyingOID = !String.IsNullOrEmpty(this.ODetails[0]) ? Convert.ToInt64(this.ODetails[0]) : 0;
            objReqProcess.oDrugItemBasicDataBC.IdentifyingType = !String.IsNullOrEmpty(this.ODetails[1]) ? this.ODetails[1] : String.Empty;
            objReqProcess.oDrugItemBasicDataBC.IsFormulary = (String.IsNullOrEmpty(IsFormularyRelatedOption) || IsFormularyRelatedOption == "0") ? true : false;
            objReqProcess.oDrugItemBasicDataBC.MCVersionNo = AppSessionInfo.AMCV;
            objService.GetAlternateOptionsAsync(objReqProcess);
        }
        objService_GetAlternateOptionsCompleted(sender: Object, e: GetAlternateOptionsCompletedEventArgs): void {
            let _ErrorID: number = 80000020;
            let _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:MedicationOptionVM, Method:objService_GetAlternateOptionsCompleted()";
            let objResProcess: CResMsgGetAlternateOptions = e.Result;
            if (e.Error == null) {
                try {
                    if (objResProcess.oAlternateOptions != null && objResProcess.oAlternateOptions.Count > 0) {
                        let objItem: AlternateItem;
                        let aRelateMedList: ObservableCollection<AlternateItem> = new ObservableCollection<AlternateItem>();
                        for (let nCnt: number = 0; nCnt < objResProcess.oAlternateOptions.Count; nCnt++) {
                            objItem = new AlternateItem();
                            if (objResProcess.oAlternateOptions[nCnt].DrugProperties != null && objResProcess.oAlternateOptions[nCnt].DrugProperties.Count > 0) {
                                let formNote: string = String.Empty;
                                if (this.dicProductType != null && this.dicProductType.Count() > 0)
                                    formNote = objItem.SetDrugPropertyTooltip(objResProcess.oAlternateOptions[nCnt].DrugProperties, this.dicProductType, objResProcess.oAlternateOptions[nCnt].ITMSUBTYP);
                                if (!String.IsNullOrEmpty(objResProcess.oAlternateOptions[nCnt].FormularyNote)) {
                                    objItem.FormularyNotes = "Formulary note - " + objResProcess.oAlternateOptions[nCnt].FormularyNote;
                                }
                                objItem.DrugProperties = objItem.FormularyNotes + "*" + formNote;
                            }
                            else {
                                if (!String.IsNullOrEmpty(objResProcess.oAlternateOptions[nCnt].FormularyNote)) {
                                    objItem.FormularyNotes = "Formulary note - " + objResProcess.oAlternateOptions[nCnt].FormularyNote;
                                }
                                objItem.DrugProperties = objItem.FormularyNotes;
                            }
                            objItem.IdentifyingName = objResProcess.oAlternateOptions[nCnt].IdentifyingName;
                            objItem.IdentifyingType = objResProcess.oAlternateOptions[nCnt].IdentifyingType;
                            objItem.IdentifyingOID = Convert.ToString(objResProcess.oAlternateOptions[nCnt].IdentifyingOID);
                            objItem.IsFormulary = objResProcess.oAlternateOptions[nCnt].IsFormulary;
                            objItem.Message = objResProcess.oAlternateOptions[nCnt].Comments;
                            objItem.mcitemdisplay = objResProcess.oAlternateOptions[nCnt].MCIItemDisplay;
                            objItem.LorenzoID = objResProcess.oAlternateOptions[nCnt].LorenzoID;
                            objItem.IsAccessConstraint = objResProcess.oAlternateOptions[nCnt].IsAccessContraint;
                            objItem.IsByBrand = objResProcess.oAlternateOptions[nCnt].IsPrescribeByBrand;
                            objItem.ItemType = !String.IsNullOrEmpty(this.ODetails[5]) ? this.ODetails[5] : String.Empty;
                            objItem.LorenzoID = objResProcess.oAlternateOptions[nCnt].LorenzoID;
                            objItem.ItemsubType = objResProcess.oAlternateOptions[nCnt].ITMSUBTYP;
                            objItem.SourceDataProviderType = objResProcess.oAlternateOptions[nCnt].SourceDataProviderType;
                            objItem.IsIndicationRequired = objResProcess.oAlternateOptions[nCnt].IsIndicationRequired;
                            objItem.FormularyOID = objResProcess.oAlternateOptions[nCnt].FormularyOID;
                            objItem.IsAuthorise = objResProcess.oAlternateOptions[nCnt].IsAuthorise;
                            let objMulti: MulticomponentChildVM = null;
                            if (objItem.MulticomponentDetails == null)
                                objItem.MulticomponentDetails = new MulticomponentVM();
                            objItem.MulticomponentDetails.oMCItemBasicInfo = new ObservableCollection<MulticomponentChildVM>();
                            if (objResProcess.oAlternateOptions[nCnt].MCChildItems != null) {
                                for (let ncount: number = 0; ncount < objResProcess.oAlternateOptions[nCnt].MCChildItems.Count; ncount++) {
                                    objMulti = new MulticomponentChildVM();
                                    objMulti.ComponentName = objResProcess.oAlternateOptions[nCnt].MCChildItems[ncount].ComponentName;
                                    objMulti.IdentifyingType = objResProcess.oAlternateOptions[nCnt].MCChildItems[ncount].CompIdentifyingType;
                                    objMulti.IdentifyingOID = objResProcess.oAlternateOptions[nCnt].MCChildItems[ncount].CompIdentifyingOID;
                                    if (objMulti != null)
                                        objItem.MulticomponentDetails.oMCItemBasicInfo.Add(objMulti);
                                }
                            }
                            aRelateMedList.Add(objItem);
                        }
                        this.ARelateList = aRelateMedList;
                    }
                    else {
                        this.ARelateList = null;
                        Busyindicator.SetStatusIdle("secondaryItem");
                    }
                }
               catch(ex:any)  {
                    let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
            Busyindicator.SetStatusIdle("secondaryItem");
        }
        private _medRelatedOptionoDetails: string[];
        public FormularyNote: ObservableCollection<DrugProperty>;
        public _formularyNotes: string;
        public get FormularyNotes(): string {
            return this._formularyNotes;
        }
        public set FormularyNotes(value: string) {
            if (this._formularyNotes != value) {
                this._formularyNotes = value;
               //NotifyPropertyChanged("FormularyNotes");
            }
        }
        public get MedRelatedOptionoDetails(): string[] {
            return this._medRelatedOptionoDetails;
        }
        public set MedRelatedOptionoDetails(value: string[]) {
            if (this._medRelatedOptionoDetails != value) {
                this._medRelatedOptionoDetails = value;
               //NotifyPropertyChanged("MedRelatedOptionoDetails");
            }
        }
        //private medRelateList: ObservableCollection<RelateItem>;
        public RelatedoptionChangedEvent: Function;
        private medRelateList: ObservableCollection<RelateItem> = new ObservableCollection<RelateItem>();
        public get MedRelateList(): ObservableCollection<RelateItem> {
            return this.medRelateList;
        }
        public set MedRelateList(value: ObservableCollection<RelateItem>) {
            if (this.medRelateList != value) {
                this.medRelateList.CopyFrom(value);// added as suggested 
               //NotifyPropertyChanged("MedRelateList");
                if (this.RelatedoptionChangedEvent != null) {
                    this.RelatedoptionChangedEvent();
                }
            }
        }
        private FillingProductDomain(lstCListItem: List<CListItem>): void {
            this.dicProductType = new Dictionary<string, string>();
            lstCListItem.forEach( (oCListItem)=> {
                this.dicProductType.Add(oCListItem.Value, oCListItem.DisplayText);
            });
        }
        public  IsGetRelatedServiceCalled : boolean = false;
        public SetMedRelatedOptionODetails(_oDetails: string[], sFormularyCheckedValue: string): void {
            this.MedRelatedOptionoDetails = _oDetails;
            if (this.dicProductType == null || (this.dicProductType != null && this.dicProductType.Count() == 0)) {
                this.sRelatedFormValue = sFormularyCheckedValue;
                ProcessRTE.GetValuesByDomainCode(ValueDomain.ProductType, (s,e) => {this.OnRTEResultForRelatedOptions(s);});

                if(!this.IsGetRelatedServiceCalled)
                {
                    this.GetRelatedOptions(sFormularyCheckedValue);
                }
            }
            else this.GetRelatedOptions(sFormularyCheckedValue);
	    
	    this.IsGetRelatedServiceCalled = false;
        }
        public GetRelatedOptions(sFormularyCheckedValue: string): void {
            this.IsGetRelatedServiceCalled =true;
            let aString: ManagePrescSer.ArrayOfString = new ManagePrescSer.ArrayOfString();
            let sSearchType: string = (!String.IsNullOrEmpty(this.MedRelatedOptionoDetails[5])) ? this.MedRelatedOptionoDetails[5] : "CC_DRUG";
            let drugType: string = String.Empty;
            if (ProfileData.MedSearchConfig != null && ProfileData.MedSearchConfig.PowerSearchConfig != null && ProfileData.MedSearchConfig.PowerSearchConfig.Count > 0) {
                let nPowerSrchCnt: number = ProfileData.MedSearchConfig.PowerSearchConfig.Count;
                for (let i: number = 0; i < nPowerSrchCnt; i++) {
                    if (String.Compare(ProfileData.MedSearchConfig.PowerSearchConfig[i].ItemTypeValue, sSearchType, StringComparison.InvariantCultureIgnoreCase) == 0) {
                        drugType = ProfileData.MedSearchConfig.PowerSearchConfig[i].SecondaryResultList.ToUpper();
                        drugType = drugType.Replace(" ", String.Empty);
                        drugType = drugType.Replace("VIRTUALMOIETY", "CATALOGUEITEM");
                        let myData: string[] = drugType.Split(',');
                        for (let dnt: number = 0; dnt < myData.length; dnt++) {
                            if (!aString.Contains(myData[dnt])) {
                                aString.Add(myData[dnt]);
                            }
                        }
                    }
                }
            }
            let objService: ManagePrescriptionWSSoapClient = new ManagePrescriptionWSSoapClient();
            objService.GetRelatedOptionsCompleted  = (s,e) => { this.objService_GetRelatedOptionsCompleted(s,e); } ;
            let objReqProcess: CReqMsgGetRelatedOptions = new CReqMsgGetRelatedOptions();
            objReqProcess.oContextInformation = Common.FillContext();
            objReqProcess.oDrugItemInputDataBC = new DrugItemInputData();
            objReqProcess.oDrugItemInputDataBC.IdentifyingOID = (!String.IsNullOrEmpty(this.MedRelatedOptionoDetails[0])) ? Convert.ToInt64(this.MedRelatedOptionoDetails[0]) : 0;
            objReqProcess.oDrugItemInputDataBC.IdentifyingType = (!String.IsNullOrEmpty(this.MedRelatedOptionoDetails[1])) ? this.MedRelatedOptionoDetails[1] : String.Empty;
            objReqProcess.oDrugItemInputDataBC.IsFormulary = (String.IsNullOrEmpty(sFormularyCheckedValue) || sFormularyCheckedValue == "0") ? true : false;
            objReqProcess.oDrugItemInputDataBC.MCVersionNo = AppSessionInfo.AMCV;
            objReqProcess.oDrugItemInputDataBC.IsPrescribeByBrand = "0";
            objReqProcess.oDrugItemInputDataBC.MatchIdentifyingTypes = aString;
            objReqProcess.oDrugItemInputDataBC.IsTechValidateCA = '0';
            if (this.oIPPMABaseVM != null) {
                objReqProcess.oDrugItemInputDataBC.TeamOIDs = !String.IsNullOrEmpty(this.oIPPMABaseVM.sTeamOIDs) ? this.oIPPMABaseVM.sTeamOIDs : String.Empty;
            }
            objService.GetRelatedOptionsAsync(objReqProcess);
        }
        objService_GetRelatedOptionsCompleted(sender: Object, e: GetRelatedOptionsCompletedEventArgs): void {
            let _ErrorID: number = 80000019;
            let _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:MedicationOptionVM, Method:objService_GetRelatedOptionsCompleted()";
            let objResProcess: CResMsgGetRelatedOptions = e.Result;
            if (e.Error == null) {
                try {
                    if (objResProcess.oRelatedDrugs != null && objResProcess.oRelatedDrugs.Count > 0) {
                        let objItem: RelateItem;
                        let aRelateList: ObservableCollection<RelateItem> = new ObservableCollection<RelateItem>();
                        for (let nCnt: number = 0; nCnt < objResProcess.oRelatedDrugs.Count; nCnt++) {
                            objItem = new RelateItem();
                            if (objResProcess.oRelatedDrugs[nCnt] == null)
                                continue;
                            if (objResProcess.oRelatedDrugs[nCnt].DrugProperties != null && objResProcess.oRelatedDrugs[nCnt].DrugProperties.Count > 0) {
                                let formNote: string = String.Empty;
                                if (this.dicProductType != null && this.dicProductType.Count() > 0)
                                    formNote = objItem.SetDrugPropertyTooltip(objResProcess.oRelatedDrugs[nCnt].DrugProperties, this.dicProductType, objResProcess.oRelatedDrugs[nCnt].ITMSUBTYP);
                                if (!String.IsNullOrEmpty(objResProcess.oRelatedDrugs[nCnt].FormularyNote)) {
                                    objItem.FormularyNotes = "Formulary note - " + objResProcess.oRelatedDrugs[nCnt].FormularyNote;
                                }
                                objItem.DrugProperties = objItem.FormularyNotes + "*" + formNote;
                            }
                            else {
                                if (!String.IsNullOrEmpty(objResProcess.oRelatedDrugs[nCnt].FormularyNote)) {
                                    objItem.FormularyNotes = "Formulary note - " + objResProcess.oRelatedDrugs[nCnt].FormularyNote;
                                }
                                objItem.DrugProperties = objItem.FormularyNotes;
                            }
                            objItem.PrescribingNote = objResProcess.oRelatedDrugs[nCnt].PrescribingNote;
                            objItem.IdentifyingName = objResProcess.oRelatedDrugs[nCnt].IdentifyingName;
                            objItem.IdentifyingType = objResProcess.oRelatedDrugs[nCnt].IdentifyingType;
                            objItem.IdentifyingOID = Convert.ToString(objResProcess.oRelatedDrugs[nCnt].IdentifyingOID);
                            objItem.IsFormulary = objResProcess.oRelatedDrugs[nCnt].IsFormulary;
                            objItem.IsAccessConstraint = objResProcess.oRelatedDrugs[nCnt].IsAccessContraint;
                            objItem.IsByBrand = objResProcess.oRelatedDrugs[nCnt].IsPrescribeByBrand;
                            objItem.LorenzoID = objResProcess.oRelatedDrugs[nCnt].LorenzoID;
                            objItem.MCItemdisplay = objResProcess.oRelatedDrugs[nCnt].MCIItemDisplay;
                            objItem.ItemType = objResProcess.oRelatedDrugs[nCnt].ItemType;
                            objItem.ItemSubType = objResProcess.oRelatedDrugs[nCnt].ItemSubType;
                            objItem.IsIndicationRequired = objResProcess.oRelatedDrugs[nCnt].IsIndicationRequired;
                            objItem.SourceDataProviderType = objResProcess.oRelatedDrugs[nCnt].SourceDataProviderType;
                            objItem.FormularyOID = objResProcess.oRelatedDrugs[nCnt].FormularyOID;
                            objItem.IsAuthorise = objResProcess.oRelatedDrugs[nCnt].IsAuthorise;
                            if (objResProcess.oRelatedDrugs[nCnt].DrugProperties != null && objResProcess.oRelatedDrugs[nCnt].DrugProperties.Count > 0) {
                                for (let i: number = 0; i < objResProcess.oRelatedDrugs[nCnt].DrugProperties.Count; i++) {
                                    if (objResProcess.oRelatedDrugs[nCnt].DrugProperties[i].DrugName == "CATALOGUEITEM" || String.Equals(objResProcess.oRelatedDrugs[nCnt].DrugProperties[i].DrugName, CConstants.ACTUALMOIETY, StringComparison.InvariantCultureIgnoreCase)) {
                                        if (i == 0 && !String.IsNullOrEmpty(objResProcess.oRelatedDrugs[nCnt].DrugProperties[i].DrugPropertyCode) && !String.IsNullOrEmpty(objResProcess.oRelatedDrugs[nCnt].DrugProperties[i].VMChildCode)) {
                                            objItem.DrugProperyCode = objResProcess.oRelatedDrugs[nCnt].DrugProperties[i].VMChildCode;
                                            objItem.DrugProperyHdn = objResProcess.oRelatedDrugs[nCnt].DrugProperties[i].DrugPropertyCode;
                                        }
                                        else if (i > 0 && !String.IsNullOrEmpty(objResProcess.oRelatedDrugs[nCnt].DrugProperties[i].DrugPropertyCode) && !String.IsNullOrEmpty(objResProcess.oRelatedDrugs[nCnt].DrugProperties[i].VMChildCode)) {
                                            objItem.DrugProperyCode = objItem.DrugProperyCode + "," + objResProcess.oRelatedDrugs[nCnt].DrugProperties[i].VMChildCode;
                                            objItem.DrugProperyHdn = objItem.DrugProperyHdn + "," + objResProcess.oRelatedDrugs[nCnt].DrugProperties[i].DrugPropertyCode;
                                        }
                                        if (i == 0 && !String.IsNullOrEmpty(objResProcess.oRelatedDrugs[nCnt].DrugProperties[i].HighRiskMsg)) {
                                            objItem.HighRiskMsg = objResProcess.oRelatedDrugs[nCnt].DrugProperties[i].HighRiskMsg;
                                        }
                                        else if (i > 0 && !String.IsNullOrEmpty(objResProcess.oRelatedDrugs[nCnt].DrugProperties[i].HighRiskMsg)) {
                                            objItem.HighRiskMsg = objItem.HighRiskMsg + "," + objResProcess.oRelatedDrugs[nCnt].DrugProperties[i].HighRiskMsg;
                                        }
                                    }
                                    else {
                                        if (i == 0 && !String.IsNullOrEmpty(objResProcess.oRelatedDrugs[nCnt].DrugProperties[i].DrugPropertyCode)) {
                                            objItem.DrugProperyCode = ",";
                                            objItem.DrugProperyHdn = objResProcess.oRelatedDrugs[nCnt].DrugProperties[i].DrugPropertyCode;
                                        }
                                        else if (i > 0 && !String.IsNullOrEmpty(objResProcess.oRelatedDrugs[nCnt].DrugProperties[i].DrugPropertyCode)) {
                                            objItem.DrugProperyCode = objItem.DrugProperyCode + ",";
                                            objItem.DrugProperyHdn = objItem.DrugProperyHdn + "," + objResProcess.oRelatedDrugs[nCnt].DrugProperties[i].DrugPropertyCode;
                                        }
                                        if (i == 0 && !String.IsNullOrEmpty(objResProcess.oRelatedDrugs[nCnt].DrugProperties[i].HighRiskMsg)) {
                                            objItem.HighRiskMsg = objResProcess.oRelatedDrugs[nCnt].DrugProperties[i].HighRiskMsg;
                                        }
                                        else if (i > 0 && !String.IsNullOrEmpty(objResProcess.oRelatedDrugs[nCnt].DrugProperties[i].HighRiskMsg)) {
                                            objItem.HighRiskMsg = objItem.HighRiskMsg + "," + objResProcess.oRelatedDrugs[nCnt].DrugProperties[i].HighRiskMsg;
                                        }
                                    }
                                }
                            }
                            let objMulti: MulticomponentChildVM = null;
                            if (objItem.MulticomponentDetails == null)
                                objItem.MulticomponentDetails = new MulticomponentVM();
                            objItem.MulticomponentDetails.oMCItemBasicInfo = new ObservableCollection<MulticomponentChildVM>();
                            if (objResProcess.oRelatedDrugs[nCnt].MCChildItems != null) {
                                for (let ncount: number = 0; ncount < objResProcess.oRelatedDrugs[nCnt].MCChildItems.Count; ncount++) {
                                    objMulti = new MulticomponentChildVM();
                                    objMulti.ComponentName = objResProcess.oRelatedDrugs[nCnt].MCChildItems[ncount].ComponentName;
                                    objMulti.IdentifyingType = objResProcess.oRelatedDrugs[nCnt].MCChildItems[ncount].CompIdentifyingType;
                                    objMulti.IdentifyingOID = objResProcess.oRelatedDrugs[nCnt].MCChildItems[ncount].CompIdentifyingOID;
                                    if (objMulti != null)
                                        objItem.MulticomponentDetails.oMCItemBasicInfo.Add(objMulti);
                                }
                            }
                            aRelateList.Add(objItem);
                        }
                        this.MedRelateList = aRelateList;
                    }
                    else {
                        this.MedRelateList = null;
                        Busyindicator.SetStatusIdle("secondaryItem");
                    }
                }
               catch(ex:any)  {
                    let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
            Busyindicator.SetStatusIdle("secondaryItem");
        }
        private _medPrescripbedOptionoDetails: string[];
        public get MedPrescribedOptionoDetails(): string[] {
            return this._medPrescripbedOptionoDetails;
        }
        public set MedPrescribedOptionoDetails(value: string[]) {
            if (this._medPrescripbedOptionoDetails != value)
                this._medPrescripbedOptionoDetails = value;
           //NotifyPropertyChanged("MedPrescribedOptionoDetails");
        }
        private _medPresribedOptionList: ObservableCollection<PrescriptionItemVM> = new ObservableCollection<PrescriptionItemVM>();
        
        
        public get MedPrescribedOptionList(): ObservableCollection<PrescriptionItemVM> {
            return this._medPresribedOptionList;
        }
        public set MedPrescribedOptionList(value: ObservableCollection<PrescriptionItemVM>) {
            if (this._medPresribedOptionList != value) {
               // this._medPresribedOptionList = value;
               this._medPresribedOptionList.Clear();
               this._medPresribedOptionList.CopyFrom(value);
              /*   if (value  && value.array.length>0) {
                    value.array.forEach(item => {
                        this._medPresribedOptionList.Add(item)
                    })
                } */
               //NotifyPropertyChanged("MedPrescribedOptionList");
            }
        }
        private _meddrugprescriptionoptionID: ObservableCollection<PrescriptionItemVM>;
        public get MeddrugprescriptionoptionID(): ObservableCollection<PrescriptionItemVM> {
            return this._meddrugprescriptionoptionID;
        }
        public set MeddrugprescriptionoptionID(value: ObservableCollection<PrescriptionItemVM>) {
            if (this._meddrugprescriptionoptionID != value) {
                this._meddrugprescriptionoptionID = value;
               //NotifyPropertyChanged("MeddrugprescriptionoptionID");
            }
        }
        private _meddrugprescriptionoption: ObservableCollection<PrescriptionItemVM> = new ObservableCollection<PrescriptionItemVM>();
        public get Meddrugprescriptionoption(): ObservableCollection<PrescriptionItemVM> {
            return this._meddrugprescriptionoption;
        }
        public set Meddrugprescriptionoption(value: ObservableCollection<PrescriptionItemVM>) {
            if (this._meddrugprescriptionoption != value) {
                //this._meddrugprescriptionoption = value;
                this._meddrugprescriptionoption.CopyFrom(value);
               //NotifyPropertyChanged("Meddrugprescriptionoption");
            }
        }
        public SetMedPrescribedOptionDetails(_oDetails: string[], sNonFormularyCheckedValue: string): void {
            this.MedPrescribedOptionoDetails = _oDetails;
            if ((this.MedPrescribedOptionList.Length == 0) || (sNonFormularyCheckedValue.Equals("1") && this._LstNonFormularyDOS == null)) {
                this.GetPrescribingOptions(sNonFormularyCheckedValue);
            }
            else if (this.MedPrescribedOptionList != null) {
                if (sNonFormularyCheckedValue.Equals("1") && this._LstNonFormularyDOS != null && this._LstNonFormularyDOS.Count > 0) {
                    this.AppendNonFormularyDOS();
                }
                else if (sNonFormularyCheckedValue.Equals("0")) {
                    this.MedPrescribedOptionList.Where(x => x.IsNonformulary && x.IsNonformulary.Equals('1')).ToList().forEach( (oItem)=> {
                        this.MedPrescribedOptionList.Remove(oItem);
                    });
                }
                Busyindicator.SetStatusIdle("secondaryItem");
            }
        }
        private AppendNonFormularyDOS(): void {
            if (this.MedPrescribedOptionList != null && this._LstNonFormularyDOS != null && this._LstNonFormularyDOS.Count > 0) {                                                       
                
                let _otherOption: PrescriptionItemVM = this.MedPrescribedOptionList.FirstOrDefault(x => x.IsOther);
                if (_otherOption != null) {
                    this.MedPrescribedOptionList.Where(x => x.IsOther).ToList().forEach( (oItem)=> {
                        this.MedPrescribedOptionList.Remove(oItem);
                    });  
                }   

                this._LstNonFormularyDOS.forEach( (oItem)=> {
                    this.MedPrescribedOptionList.Add(oItem);
                }); 

                if (_otherOption != null) {
                    this.MedPrescribedOptionList.Add(ObjectHelper.CreateObject(new PrescriptionItemVM(null), { IsOther: true }));                
                }
            }
        }
        private callRTE(processingOptionsSender,processingOptionsCompletedEventArgs){
            ProcessRTE.GetValuesByDomainCode(ValueDomain.RANGEOPERATOR, (RTEResult,domainValuesCompletedEventArgs) => {this.OnRTEResultForDomainsCodes(processingOptionsSender,processingOptionsCompletedEventArgs,RTEResult)});
        }
        private OnRTEResultForDomainsCodes(processingOptionsSender,processingOptionsCompletedEventArgs,RTEResult){
            this.objService_GetProcessingOptionsCompleted(processingOptionsSender,processingOptionsCompletedEventArgs,RTEResult);
        }
        public GetPrescribingOptions(sNonFormularyCheckedValue: string): void {
            let objService: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
            objService.GetProcessingOptionsCompleted  = (processingOptionsSender,processingOptionsEventArgs) => {
                this.callRTE(processingOptionsSender,processingOptionsEventArgs);
            };
            let objReqProcess: IPPMAManagePrescSer.CReqMsgGetProcessingOptions = new IPPMAManagePrescSer.CReqMsgGetProcessingOptions();
            objReqProcess.oContextInformation = Common.FillContext();
            objReqProcess.oDrugItemInputDataBC = new IPPMAManagePrescSer.DrugItemInputData();
            objReqProcess.oDrugItemInputDataBC.IdentifyingOID = this.MedPrescribedOptionoDetails != null && !String.IsNullOrEmpty(this.MedPrescribedOptionoDetails[0]) ? Convert.ToInt64(this.MedPrescribedOptionoDetails[0]) : 0;
            objReqProcess.oDrugItemInputDataBC.IdentifyingType = this.MedPrescribedOptionoDetails != null && !String.IsNullOrEmpty(this.MedPrescribedOptionoDetails[1]) ? this.MedPrescribedOptionoDetails[1] : String.Empty;
            objReqProcess.oDrugItemInputDataBC.IsFormulary = (String.IsNullOrEmpty(sNonFormularyCheckedValue) || sNonFormularyCheckedValue == "0") ? true : false;
            objReqProcess.oDrugItemInputDataBC.FormularyOID = (this.MedPrescribedOptionoDetails != null && this.MedPrescribedOptionoDetails.length > 14) ? Convert.ToInt64(this.MedPrescribedOptionoDetails[14]) : 0;
            objReqProcess.oDrugItemInputDataBC.MCVersionNo = AppSessionInfo.AMCV;
            if (this.oIPPMABaseVM != null && this.oIPPMABaseVM._bIsSearchCatalogueClicked) {
                objReqProcess.oDrugItemInputDataBC.IsFetchFormularyAndNonFormulary = true;
                objReqProcess.oContextInformation.PageInfo = "2";
            }
            else {
                objReqProcess.oContextInformation.PageInfo = sNonFormularyCheckedValue;
            }
            if (this.oIPPMABaseVM != null && this.oIPPMABaseVM.GpConnectMedicationItem != null && !String.IsNullOrEmpty(this.oIPPMABaseVM.GpConnectMedicationItem.GPConnectID) && this.oIPPMABaseVM.GpConnectMedicationItem.GPCProductFormOID > 0) {
                objReqProcess.oDrugItemInputDataBC.GPCProductFormOID = this.oIPPMABaseVM.GpConnectMedicationItem.GPCProductFormOID;
            }
            objService.GetProcessingOptionsAsync(objReqProcess);
            this.SubjectEventEmitterService.SearchCompleted = false;
        }
        public SubjectEventEmitterService: SubjectEventEmitterService = InjectorInstance.get<SubjectEventEmitterService>(SubjectEventEmitterService);
        objService_GetProcessingOptionsCompleted(sender: Object, e: IPPMAManagePrescSer.GetProcessingOptionsCompletedEventArgs,RTEResult?:any): void {
            let _ErrorID: number = 80000018;
            let _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:MedicationOptionVM, Method:objService_GetProcessingOptionsCompleted()";
            let objResProcess: IPPMAManagePrescSer.CResMsgGetProcessingOptions = e.Result;
            if (e.Error == null) {
                try {
                    let oPresItem: ObservableCollection<PrescriptionItemVM> = new ObservableCollection<PrescriptionItemVM>();
                    let _IsRequestForNonFormulary: boolean = false;
                    let _IsItHasFormualryDOS: boolean = false;
                    if (objResProcess != null) {
                        let oItemVM: PrescriptionItemVM;
                        if (objResProcess.oContextInformation != null && !String.IsNullOrEmpty(objResProcess.oContextInformation.PageInfo) && (objResProcess.oContextInformation.PageInfo.Equals("1") || objResProcess.oContextInformation.PageInfo.Equals("2"))) {
                            _IsRequestForNonFormulary = true;
                            if (objResProcess.oContextInformation.PageInfo.Equals("2")) {
                                _IsItHasFormualryDOS = true;
                            }
                        }
                        if (objResProcess.IsSecAuthorised && (String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.OrdinalIgnoreCase) && PatientContext.ClerkFormViewDefaultBehavior != ClerkFormViewDeftBehaviour.LaunchFormMandatory)) {
                            if (this.oIPPMABaseVM != null)
                                this.oIPPMABaseVM.AuthoriseStringEventCall();
                        }
                        if (objResProcess.oPrescribingOptionDetails != null && objResProcess.oPrescribingOptionDetails.Count > 0) {
                            let nOptionCnt: number = objResProcess.oPrescribingOptionDetails.Count;
                            for (let nCnt: number = 0; nCnt < nOptionCnt; nCnt++) {
                                oItemVM = new PrescriptionItemVM(this.oIPPMABaseVM);
                                oItemVM.IsFormViewDataLoaded = false;
                                oItemVM.GetPresItemDetails(objResProcess.oPrescribingOptionDetails[nCnt],RTEResult);
                                oItemVM.PrescriptionItemOID = 0;
                                if ((objResProcess.oPrescribingOptionDetails[nCnt].DoseFormulaDet != null) && (MedicationCommonProfileData.PrescribeConfig.EnableDoseCalc) && ((!String.IsNullOrEmpty(objResProcess.oPrescribingOptionDetails[nCnt].DoseFormulaDet.BSAFormula)) || (!String.IsNullOrEmpty(objResProcess.oPrescribingOptionDetails[nCnt].DoseFormulaDet.CalculationFor)) || (!String.IsNullOrEmpty(objResProcess.oPrescribingOptionDetails[nCnt].DoseFormulaDet.IsDoseCalcAlwaysUse) && String.Equals(objResProcess.oPrescribingOptionDetails[nCnt].DoseFormulaDet.IsDoseCalcAlwaysUse, "1")) || (!String.IsNullOrEmpty(objResProcess.oPrescribingOptionDetails[nCnt].DoseFormulaDet.DoseCalcFrequencyName)) || (!String.IsNullOrEmpty(objResProcess.oPrescribingOptionDetails[nCnt].DoseFormulaDet.DoseCalcBasedOn)) || (!String.IsNullOrEmpty(objResProcess.oPrescribingOptionDetails[nCnt].DoseFormulaDet.DefaultWeightType)) || (!String.IsNullOrEmpty(objResProcess.oPrescribingOptionDetails[nCnt].DoseFormulaDet.RequestedDose)))) {
                                    oItemVM.IsDoseCalcInfo = true;
                                }
                                else {
                                    oItemVM.IsDoseCalcInfo = false;
                                }
                                if (String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.OrdinalIgnoreCase) && PatientContext.ClerkFormViewDefaultBehavior != ClerkFormViewDeftBehaviour.LaunchFormMandatory && objResProcess.IsSecAuthorised) {
                                    oItemVM.FormViewerDetails.BasicDetails.IsAuthorise = true;
                                }
                                if (oItemVM.FormularyOID > 0) {
                                    oItemVM.IsNonformulary = '0';
                                }
                                else {
                                    oItemVM.IsNonformulary = _IsRequestForNonFormulary ? '1' : '0';
                                }
                                oPresItem.Add(oItemVM);
                                if (_IsRequestForNonFormulary) {
                                    if (this._LstNonFormularyDOS == null) {
                                        this._LstNonFormularyDOS = new List<PrescriptionItemVM>();
                                    }
                                    if (oItemVM.IsNonformulary == '1') {
                                        this._LstNonFormularyDOS.Add(oItemVM);
                                    }
                                }
                            }
                        }
                    }
                    if (_IsRequestForNonFormulary && !_IsItHasFormualryDOS) {
                        if (this.MedPrescribedOptionList == null) {
                            this.MedPrescribedOptionList = new ObservableCollection<PrescriptionItemVM>();
                            this.MedPrescribedOptionList.Add(ObjectHelper.CreateObject(new PrescriptionItemVM(null), { IsOther: true }));
                        }
                        this.AppendNonFormularyDOS();
                    }
                    else {
                        oPresItem.Add(ObjectHelper.CreateObject(new PrescriptionItemVM(null), { IsOther: true }));
                        this.MedPrescribedOptionList = oPresItem;
                    }
                    this.SubjectEventEmitterService.SearchCompleted = true;
                    this.SubjectEventEmitterService.responseEventEmitter.next("completed");
                }
               catch(ex:any)  {
                    let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
            Busyindicator.SetStatusIdle("secondaryItem");
        }
        private _meddrugprescriptionoptionlist: ObservableCollection<MedicationMgmtSer.PrescriptionItemDetails>;
        public get Meddrugprescriptionoptionlist(): ObservableCollection<MedicationMgmtSer.PrescriptionItemDetails> {
            return this._meddrugprescriptionoptionlist;
        }
        public set Meddrugprescriptionoptionlist(value: ObservableCollection<MedicationMgmtSer.PrescriptionItemDetails>) {
            if (this._meddrugprescriptionoptionlist != value) {
                this._meddrugprescriptionoptionlist = value;
               //NotifyPropertyChanged("Meddrugprescriptionoptionlist");
            }
        }
        private _managePrescSer_meddrugprescriptionoptionlist: ObservableCollection<ManagePrescSer.PrescriptionItemDetails>;
        public get ManagePrescSer_meddrugprescriptionoptionlist(): ObservableCollection<ManagePrescSer.PrescriptionItemDetails> {
            return this._managePrescSer_meddrugprescriptionoptionlist;
        }
        public set ManagePrescSer_meddrugprescriptionoptionlist(value: ObservableCollection<ManagePrescSer.PrescriptionItemDetails>) {
            if (this._managePrescSer_meddrugprescriptionoptionlist != value) {
                this._managePrescSer_meddrugprescriptionoptionlist = value;
               //NotifyPropertyChanged("ManagePrescSer_meddrugprescriptionoptionlist");
            }
        }
        public GetProcessingDetails(sTagObj: ManagePrescSer.ConstituentItem): void {
            let objService: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
            objService.GetFavouritesDrugItemCompleted  = (s,e) => { this.objService_GetFavouritesDrugItemCompleted(s,e); } ;
            let oReqMsgGetFavouritesDrugItem: IPPMAManagePrescSer.CReqMsgGetFavouritesDrugItem = new IPPMAManagePrescSer.CReqMsgGetFavouritesDrugItem();
            if (sTagObj.PrescribeItemID > 0) {
                oReqMsgGetFavouritesDrugItem.IdentifyingOIDBC = sTagObj.PrescribeItemID;
            }
            if (!String.IsNullOrEmpty(sTagObj.Type)) {
                oReqMsgGetFavouritesDrugItem.IdentifyingTypeBC = sTagObj.Type;
            }
            if (!String.IsNullOrEmpty(sTagObj.IsFormulary)) {
                let sIsFormulary: string[] = sTagObj.IsFormulary.Split('^');
                if (sIsFormulary.length > 1) {
                    oReqMsgGetFavouritesDrugItem.IsFormularyBC = sIsFormulary[1] == "False" ? "0" : "1";
                }
                else {
                    oReqMsgGetFavouritesDrugItem.IsFormularyBC = sTagObj.IsFormulary;
                }
                if (sIsFormulary.Contains("Fav"))
                    return
            }
            if (sTagObj.OID > 0) {
                oReqMsgGetFavouritesDrugItem.FavOIdBC = Convert.ToInt64(sTagObj.OID);
            }
            if (!String.IsNullOrEmpty(sTagObj.MCVersion)) {
                oReqMsgGetFavouritesDrugItem.MVersionBC = sTagObj.MCVersion;
            }
            oReqMsgGetFavouritesDrugItem.oContextInformation = Common.FillContext();
            objService.GetFavouritesDrugItemAsync(oReqMsgGetFavouritesDrugItem);
        }
        objService_GetFavouritesDrugItemCompleted(sender: Object, e: IPPMAManagePrescSer.GetFavouritesDrugItemCompletedEventArgs): void {
            let oResMsgGetFavouritesDrugItem: IPPMAManagePrescSer.CResMsgGetFavouritesDrugItem;
            oResMsgGetFavouritesDrugItem = e.Result;
            if (oResMsgGetFavouritesDrugItem != null && oResMsgGetFavouritesDrugItem.oPrescriptionItemDetails != null && oResMsgGetFavouritesDrugItem.oPrescriptionItemDetails.Count > 0) {
                let oPresItem: ObservableCollection<PrescriptionItemVM> = new ObservableCollection<PrescriptionItemVM>();
                let oItemVM: PrescriptionItemVM;
                for (let nCnt: number = 0; nCnt < oResMsgGetFavouritesDrugItem.oPrescriptionItemDetails.Count; nCnt++) {
                    oItemVM = new PrescriptionItemVM(this.oIPPMABaseVM);
                    oItemVM.GetPresItemDetails(oResMsgGetFavouritesDrugItem.oPrescriptionItemDetails[nCnt]);
                    oItemVM.PrescriptionItemOID = 0;
                    if ((oResMsgGetFavouritesDrugItem.oPrescriptionItemDetails[nCnt].DoseFormulaDet != null) && (MedicationCommonProfileData.PrescribeConfig.EnableDoseCalc) && ((!String.IsNullOrEmpty(oResMsgGetFavouritesDrugItem.oPrescriptionItemDetails[nCnt].DoseFormulaDet.BSAFormula)) || (!String.IsNullOrEmpty(oResMsgGetFavouritesDrugItem.oPrescriptionItemDetails[nCnt].DoseFormulaDet.CalculationFor)) || (!String.IsNullOrEmpty(oResMsgGetFavouritesDrugItem.oPrescriptionItemDetails[nCnt].DoseFormulaDet.IsDoseCalcAlwaysUse) && String.Equals(oResMsgGetFavouritesDrugItem.oPrescriptionItemDetails[nCnt].DoseFormulaDet.IsDoseCalcAlwaysUse, "1")) || (!String.IsNullOrEmpty(oResMsgGetFavouritesDrugItem.oPrescriptionItemDetails[nCnt].DoseFormulaDet.DoseCalcFrequencyName)) || (!String.IsNullOrEmpty(oResMsgGetFavouritesDrugItem.oPrescriptionItemDetails[nCnt].DoseFormulaDet.DoseCalcBasedOn)) || (!String.IsNullOrEmpty(oResMsgGetFavouritesDrugItem.oPrescriptionItemDetails[nCnt].DoseFormulaDet.DefaultWeightType)) || (!String.IsNullOrEmpty(oResMsgGetFavouritesDrugItem.oPrescriptionItemDetails[nCnt].DoseFormulaDet.RequestedDose)))) {
                        oItemVM.IsDoseCalcInfo = true;
                    }
                    else {
                        oItemVM.IsDoseCalcInfo = false;
                    }
                    if (!String.IsNullOrEmpty(this.IsFormulary)) {
                        oItemVM.IsNonformulary = ((this.IsFormulary[0] == '1') ? '0' : '1');
                    }
                    oPresItem.Add(oItemVM);
                }
                this.MedPrescribedOptionList = oPresItem;
            }
            else {
                this.MedPrescribedOptionList = null;
            }
        }
        public GetRelatedPrescibeOptionDetails(sTagObj: ManagePrescSer.ConstituentItem): void {
            let objService: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
            objService.GetProcessingOptionsCompleted  = (s,e) => { this.objService_Related_GetProcessingOptionsCompleted(s,e); } ;
            let objRequest: IPPMAManagePrescSer.CReqMsgGetProcessingOptions = new IPPMAManagePrescSer.CReqMsgGetProcessingOptions();
            objRequest.oDrugItemInputDataBC = new IPPMAManagePrescSer.DrugItemInputData();
            if (sTagObj.PrescribeItemID > 0) {
                objRequest.oDrugItemInputDataBC.IdentifyingOID = sTagObj.PrescribeItemID;
            }
            if (!String.IsNullOrEmpty(sTagObj.Type)) {
                objRequest.oDrugItemInputDataBC.IdentifyingType = sTagObj.Type;
            }
            let lnFormularyOID: number = 0;
            Number.TryParse(sTagObj.IsFormulary, (o) => { lnFormularyOID = o; });
            objRequest.oDrugItemInputDataBC.IsFormulary = (lnFormularyOID > 0) ? true : false;
            this.IsFormularyforprocess = objRequest.oDrugItemInputDataBC.IsFormulary;
            if (sTagObj.OID > 0) {
                objRequest.oDrugItemInputDataBC.FavouritesDetailOID = Convert.ToInt64(sTagObj.OID);
            }
            if (!String.IsNullOrEmpty(sTagObj.MCVersion)) {
                objRequest.oDrugItemInputDataBC.MCVersionNo = sTagObj.MCVersion;
            }
            objRequest.oDrugItemInputDataBC.FormularyOID = Convert.ToInt64(sTagObj.FormularyOID);
            objRequest.oContextInformation = Common.FillContext();
            objService.GetProcessingOptionsAsync(objRequest);
        }
        objService_Related_GetProcessingOptionsCompleted(sender: Object, e: IPPMAManagePrescSer.GetProcessingOptionsCompletedEventArgs): void {
            let _ErrorID: number = 80000017;
            let _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:MedicationOptionVM, Method:objService_Related_GetProcessingOptionsCompleted()";
            let oResMsgGetProcessingOptions: IPPMAManagePrescSer.CResMsgGetProcessingOptions;
            oResMsgGetProcessingOptions = e.Result;
            if (e.Error == null) {
                try {
                    let oPresItem: ObservableCollection<PrescriptionItemVM> = new ObservableCollection<PrescriptionItemVM>();
                    if (oResMsgGetProcessingOptions != null && oResMsgGetProcessingOptions.oPrescribingOptionDetails != null && oResMsgGetProcessingOptions.oPrescribingOptionDetails.Count > 0) {
                        let oItemVM: PrescriptionItemVM;
                        for (let nCnt: number = 0; nCnt < oResMsgGetProcessingOptions.oPrescribingOptionDetails.Count; nCnt++) {
                            let bCanAdd: boolean = oResMsgGetProcessingOptions.oPrescribingOptionDetails[nCnt] != null;
                            if (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration) != 0 && oResMsgGetProcessingOptions.oPrescribingOptionDetails[nCnt].BasicProperties != null && oResMsgGetProcessingOptions.oPrescribingOptionDetails[nCnt].BasicProperties.Dose != null && oResMsgGetProcessingOptions.oPrescribingOptionDetails[nCnt].BasicProperties.Dose.DoseType != null) {
                                bCanAdd = String.Compare(oResMsgGetProcessingOptions.oPrescribingOptionDetails[nCnt].BasicProperties.Dose.DoseType.Code, DoseTypeCode.TITRATED, StringComparison.OrdinalIgnoreCase) != 0;
                            }
                            if (!bCanAdd)
                                continue;
                            oItemVM = new PrescriptionItemVM(this.oIPPMABaseVM);
                            oItemVM.GetPresItemDetails(oResMsgGetProcessingOptions.oPrescribingOptionDetails[nCnt]);
                            oItemVM.IsNonformulary = (this.IsFormularyforprocess == true) ? '0' : '1';
                            oItemVM.PrescriptionItemOID = 0;
                            if ((oResMsgGetProcessingOptions.oPrescribingOptionDetails[nCnt].DoseFormulaDet != null) && (MedicationCommonProfileData.PrescribeConfig.EnableDoseCalc) && ((!String.IsNullOrEmpty(oResMsgGetProcessingOptions.oPrescribingOptionDetails[nCnt].DoseFormulaDet.BSAFormula)) || (!String.IsNullOrEmpty(oResMsgGetProcessingOptions.oPrescribingOptionDetails[nCnt].DoseFormulaDet.CalculationFor)) || (!String.IsNullOrEmpty(oResMsgGetProcessingOptions.oPrescribingOptionDetails[nCnt].DoseFormulaDet.IsDoseCalcAlwaysUse) && String.Equals(oResMsgGetProcessingOptions.oPrescribingOptionDetails[nCnt].DoseFormulaDet.IsDoseCalcAlwaysUse, "1")) || (!String.IsNullOrEmpty(oResMsgGetProcessingOptions.oPrescribingOptionDetails[nCnt].DoseFormulaDet.DoseCalcFrequencyName)) || (!String.IsNullOrEmpty(oResMsgGetProcessingOptions.oPrescribingOptionDetails[nCnt].DoseFormulaDet.DoseCalcBasedOn)) || (!String.IsNullOrEmpty(oResMsgGetProcessingOptions.oPrescribingOptionDetails[nCnt].DoseFormulaDet.DefaultWeightType)) || (!String.IsNullOrEmpty(oResMsgGetProcessingOptions.oPrescribingOptionDetails[nCnt].DoseFormulaDet.RequestedDose)))) {
                                oItemVM.IsDoseCalcInfo = true;
                            }
                            else {
                                oItemVM.IsDoseCalcInfo = false;
                            }
                            oPresItem.Add(oItemVM);
                        }
                    }
                    oPresItem.Add(ObjectHelper.CreateObject(new PrescriptionItemVM(null), { IsOther: true, IsNonformulary: (this.IsFormularyforprocess == true) ? '0' : '1' }));
                    this.Meddrugprescriptionoption = oPresItem;
                }
               catch(ex:any)  {
                    let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
            Busyindicator.SetStatusIdle("Prescribingoption");
        }
        public static oCDomainValueCollection: ObservableCollection<CValuesetCollection>;
        private static CONST_MNGRF: string = "MNGRF";
        private _monographinformationlist: ObservableCollection<ManagePrescSer.MonographInfo>;
        public get MonographInformationList(): ObservableCollection<ManagePrescSer.MonographInfo> {
            return this._monographinformationlist;
        }
        public set MonographInformationList(value: ObservableCollection<ManagePrescSer.MonographInfo>) {
            if (this._monographinformationlist != value) {
                this._monographinformationlist = value;
               //NotifyPropertyChanged("MonographInformationList");
            }
        }
        public GetMonographDetails(objRelItem: RelateItem): void {
            Busyindicator.SetStatusBusy("Links");
            let objService: ManagePrescriptionWSSoapClient = new ManagePrescriptionWSSoapClient();
            objService.GetItemMongraphCompleted  = (s,e) => { this.objService_GetItemMongraphCompleted(s,e); } ;
            let objRequest: CReqMsgGetItemMongraph = new CReqMsgGetItemMongraph();
            objRequest.oContextInformation = Common.FillContext();
            objRequest.oDrugItemBasicDataBC = new ManagePrescSer.DrugItemBasicData();
            objRequest.oDrugItemBasicDataBC.IdentifyingOID = Convert.ToInt64(objRelItem.IdentifyingOID);
            objRequest.oDrugItemBasicDataBC.IdentifyingType = objRelItem.IdentifyingType;
            objRequest.oDrugItemBasicDataBC.MCVersionNo = AppSessionInfo.AMCV;
            objService.GetItemMongraphAsync(objRequest);
        }
        objService_GetItemMongraphCompleted(sender: Object, e: GetItemMongraphCompletedEventArgs): void {
            let _ErrorID: number = 80000016;
            let _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:MedicationOptionVM, Method:objService_GetItemMongraphCompleted()";
            let objResponse: CResMsgGetItemMongraph = e.Result;
            if (e.Error == null) {
                try {
                    if (objResponse != null && objResponse.MonographInformation != null && objResponse.MonographInformation.Count > 0) {
                        this.MonographInformationList = objResponse.MonographInformation;
                    }
                    this.GetDomainDetails();
                }
               catch(ex:any)  {
                    let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
            Busyindicator.SetStatusIdle("Links");
        }
        OnRTEResult(args: RTEEventargs): void {
            if (String.IsNullOrEmpty(args.Request) || args.Result == null)
                return
            if (String.Compare(args.Request, MedicationOptionVM.CONST_MNGRF, StringComparison.CurrentCultureIgnoreCase) == 0) {
                if (this.MonographInformationList != null && this.MonographInformationList.Count > 0) {
                    let obscolObj: List<MonographInfo> = new List<MonographInfo>();
                    let objResult: Dictionary<string, List<CListItem>> = <Dictionary<string, List<CListItem>>>args.Result;
                    objResult.forEach( (objDomainDetail)=> {
                        objDomainDetail.Value.forEach( (oCListItem)=> {
                            let oTerm = this.MonographInformationList.Where(x => x.Type == oCListItem.Value).ToList();
                            if (oTerm != null) {
                                let CntTerm: number = oTerm.Count;
                                if (CntTerm > 0) {
                                    for (let iCnt: number = 0; iCnt < CntTerm; iCnt++) {
                                        oTerm[iCnt].Type = oCListItem.DisplayText;
                                        obscolObj.Add(oTerm[iCnt]);
                                    }
                                }
                            }
                        });
                    });
                    if (obscolObj == null || obscolObj.Count == 0) {
                        if (MedicationCommonConceptCodeData.ViewConceptCodes != null && MedicationCommonConceptCodeData.ViewConceptCodes.Count > 0) {
                            MedicationCommonConceptCodeData.ViewConceptCodes.forEach( (oCListItem)=> {
                                let oTerm = this.MonographInformationList.Where(x => x.Type == oCListItem.csCode).ToList();
                                if (oTerm != null) {
                                    let CntTerm: number = oTerm.Count;
                                    if (CntTerm > 0) {
                                        for (let iCnt: number = 0; iCnt < CntTerm; iCnt++) {
                                            oTerm[iCnt].Type = oCListItem.csDescription;
                                            obscolObj.Add(oTerm[iCnt]);
                                        }
                                    }
                                }
                            });
                        }
                    }
                    this.MonographInformationList = new ObservableCollection<MonographInfo>();
                    if (obscolObj != null) {
                        let CntCol: number = obscolObj.Count;
                        if (CntCol > 0) {
                            for (let iIndx: number = 0; iIndx < CntCol; iIndx++) {
                                this.MonographInformationList.Add(obscolObj[iIndx]);
                            }
                        }
                    }
                }
            }
            else if (String.Compare(args.Request, ValueDomain.ProductType, StringComparison.CurrentCultureIgnoreCase) == 0) {
                this.FillingProductDomain(<List<CListItem>>args.Result);
                if (!String.IsNullOrEmpty(this.sAlternateFormValue)) {
                    this.GetAlternateOptions(this.sAlternateFormValue);
                }
            }
        }
        OnRTEResultForRelatedOptions(args: RTEEventargs): void {
            if (String.IsNullOrEmpty(args.Request) || args.Result == null)
                return
            if (String.Compare(args.Request, ValueDomain.ProductType, StringComparison.CurrentCultureIgnoreCase) == 0) {
                this.FillingProductDomain(<List<CListItem>>args.Result);
                if (!String.IsNullOrEmpty(this.sRelatedFormValue)) {
                    this.GetRelatedOptions(this.sRelatedFormValue);
                }
            }
        }
        private GetDomainDetails(): void {
            ProcessRTE.GetValuesByDomainCodes(MedicationOptionVM.CONST_MNGRF, (s,e) =>{this.OnRTEViewResult(s);});
            ProcessRTE.GetHierarchicalValuesByDomains(CConstants.CodingSchemeName, CConstants.Version, CConstants.FilterType, ContextInfo.Culture, MedicationOptionVM.CONST_MNGRF, (s,e) => {this.OnRTEResult(s);});
        }
        OnRTEViewResult(args: RTEEventargs): void {
            if (String.IsNullOrEmpty(args.Request) || args.Result == null)
                return
            if (String.Compare(args.Request, MedicationOptionVM.CONST_MNGRF) == 0) {
                if (args.Result instanceof Dictionary) {
                    let objResult: Dictionary<string, List<CListItem>> = <Dictionary<string, List<CListItem>>>args.Result;
                    objResult.forEach( (objDomainDetail)=> {
                        if (String.Equals(objDomainDetail.Key, MedicationOptionVM.CONST_MNGRF)) {
                            if (MedicationCommonConceptCodeData.ViewConceptCodes == null)
                                MedicationCommonConceptCodeData.ViewConceptCodes = new ObservableCollection<CValuesetTerm>();
                            objDomainDetail.Value.forEach( (oCListItem)=> {
                                MedicationCommonConceptCodeData.ViewConceptCodes.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                            });
                            return;
                        }
                    });
                }
            }
        }
        //public delegate void PackOptionChanged();
        public PackOptionChangedEvent: Function;
        private _packOptionItemList: ObservableCollection<PackOptionItem> = new ObservableCollection<PackOptionItem>();
        public get PackOptionItemList(): ObservableCollection<PackOptionItem> {
            return this._packOptionItemList;
        }
        public set PackOptionItemList(value: ObservableCollection<PackOptionItem>) {
            if (value) {
                this._packOptionItemList.CopyFrom(value)  ;
                if (this.PackOptionChangedEvent != null) {
                    this.PackOptionChangedEvent();
                }
               //NotifyPropertyChanged("PackOptionItemList");
            }
        }
        public IdentifyingOID: number = 0;
        public IdentifyingType: string;
        public ItemType: string;
        public CallWebServicePackOptionItem(): void {
            let objService: ManagePrescriptionWSSoapClient = new ManagePrescriptionWSSoapClient();
            objService.GetProductPackOptionsCompleted  = (s,e) => { this.objService_GetProductPackOptionsCompleted(s,e); } ;
            let objRequest: CReqMsgGetProductPackOptions = new CReqMsgGetProductPackOptions();
            objRequest.oContextInformation = Common.FillContext();
            objRequest.oDrugItemBasicDataBC = new ManagePrescSer.DrugItemBasicData();
            objRequest.oDrugItemBasicDataBC.IdentifyingOID = this.IdentifyingOID;
            objRequest.oDrugItemBasicDataBC.IdentifyingType = !String.IsNullOrEmpty(this.IdentifyingType) ? this.IdentifyingType : String.Empty;
            objRequest.oDrugItemBasicDataBC.MCVersionNo = AppSessionInfo.AMCV;
            objRequest.oDrugItemBasicDataBC.IsPrescribeByBrand = this.IsFormulary;
            objRequest.oDrugItemBasicDataBC.ItemType = !String.IsNullOrEmpty(this.ItemType) ? this.ItemType : String.Empty;
            objService.GetProductPackOptionsAsync(objRequest);
        }
        objService_GetProductPackOptionsCompleted(sender: Object, e: GetProductPackOptionsCompletedEventArgs): void {
            let _ErrorID: number = 80000015;
            let _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:MedicationOptionVM, Method:objService_GetProductPackOptionsCompleted()";
          //  this.PackOptionItemList = null;
            let objRelatedDet: ObservableCollection<PackOptionItem> = new ObservableCollection<PackOptionItem>();
            let objResponse: CResMsgGetProductPackOptions = e.Result;
            let oRDetails: PackOptionItem;
            if (e.Error == null) {
                try {
                    if (objResponse != null && objResponse.oPackItems != null) {
                        let nItemDetail: number = objResponse.oPackItems.Count;
                        for (let nItemCount: number = 0; nItemCount < nItemDetail; nItemCount++) {
                            oRDetails = new PackOptionItem();
                            oRDetails.DrugProperyHdn = objResponse.oPackItems[nItemCount].DrugProperties[0].DrugPropertyCode;
                            oRDetails.DrugProperyCode = objResponse.oPackItems[nItemCount].DrugProperties[0].VMChildCode;
                            oRDetails.HighRiskMsg = objResponse.oPackItems[nItemCount].DrugProperties[0].HighRiskMsg;
                            oRDetails.IdentifyingOID = objResponse.oPackItems[nItemCount].IdentifyingOID;
                            oRDetails.IdentifyingName = objResponse.oPackItems[nItemCount].IdentifyingName;
                            oRDetails.IdentifyingType = objResponse.oPackItems[nItemCount].IdentifyingType;
                            oRDetails.IsFormulary = objResponse.oPackItems[nItemCount].IsFormulary;
                            oRDetails.LorenzoID = objResponse.oPackItems[nItemCount].LorenzoID;
                            if (objResponse.oPackItems[nItemCount].ItemType != null) {
                                oRDetails.ItemType = objResponse.oPackItems[nItemCount].ItemType;
                            }
                            else {
                                oRDetails.ItemType = !String.IsNullOrEmpty(this.ItemType) ? this.ItemType : String.Empty;
                            }
                            oRDetails.IsAccessConstraint = objResponse.oPackItems[nItemCount].IsAccessContraint;
                            oRDetails.IsByBrand = objResponse.oPackItems[nItemCount].IsPrescribeByBrand;
                            oRDetails.IsIndicationRequired = objResponse.oPackItems[nItemCount].IsIndicationRequired;
                            oRDetails.SourceDataproviderType = objResponse.oPackItems[nItemCount].SourceDataProviderType;
                            oRDetails.IsAuthorise = objResponse.oPackItems[nItemCount].IsAuthorise;
                            oRDetails.PrescribingNote = objResponse.oPackItems[nItemCount].PrescribingNote;
                            objRelatedDet.Add(oRDetails);
                        }
                    }
                }
               catch(ex:any)  {
                    let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
            this.PackOptionItemList = objRelatedDet;
        }
        public IsFormulary: string;
        public IsFormularyforprocess: boolean = false;
        public DisposeVmEvents(): void {
            this.PackOptionChangedEvent = null;
        }
        public DoCleanUP(): void {
            this.DisposeVmEvents();
        }
    }