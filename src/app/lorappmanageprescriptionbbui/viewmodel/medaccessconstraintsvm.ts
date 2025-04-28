import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, CListItem, ObservableCollection, Visibility} from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import * as IPPMAManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { PrescriptionItemVM } from './PrescriptionItemVM';
import * as Application from 'src/app/lorappcommonbb/amshelper';
import { IPPMABaseVM } from './ippmabasevm';
import { MedicationCommonProfileData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { Common } from '../utilities/common';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { GPConnectItemVM } from './GPConnectItemVM';
import { CConstants } from '../utilities/constants';
import * as IPPMACommon from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import 'epma-platform/booleanextension';
import 'epma-platform/numberextension';
import 'epma-platform/stringextension';
import {iMath} from 'epma-platform/mathextension';
import 'epma-platform/arrayextension';

    export class MedAccessConstraintsVM extends ViewModelBase {
        private lsIndication: ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
        public get LsIndication(): ObservableCollection<CListItem> {
            return this.lsIndication;
        }
        public set LsIndication(value: ObservableCollection<CListItem>) {
            if (this.lsIndication != value) {
                this.lsIndication.Clear();
                if (value  && value.array.length>0) {
                    value.array.forEach(item => {
                        this.lsIndication.Add(item)
                    })
                }
                //this.lsIndication = value;
               //NotifyPropertyChanged("LsIndication");
            }
        }
        private nonFormularyReason: CListItem;
        public get NonFormularyReason(): CListItem {
            return this.nonFormularyReason;
        }
        public set NonFormularyReason(value: CListItem) {
            if (this.nonFormularyReason != value) {
                this.nonFormularyReason = value;
               //NotifyPropertyChanged("NonFormularyReason");
            }
        }
        private otherNonFormularyReason: string;
        public get OtherNonFormularyReason(): string {
            return this.otherNonFormularyReason;
        }
        public set OtherNonFormularyReason(value: string) {
            this.otherNonFormularyReason = value;
        }
        private presOptions: ObservableCollection<PrescriptionItemVM> = new ObservableCollection<PrescriptionItemVM>() ;
        public get PresOptions(): ObservableCollection<PrescriptionItemVM> {
            return this.presOptions;
        }
        public set PresOptions(value: ObservableCollection<PrescriptionItemVM>) {
            if (this.presOptions != value) {
                //this.presOptions = value;
                this.presOptions.Clear();
                if (value  && value.array.length>0) {
                    value.array.forEach(item => {
                        this.presOptions.Add(item)
                    })
                }
               //NotifyPropertyChanged("PresOptions");
            }
        }
        private drugOid: string;
        public get DrugOid(): string {
            return this.drugOid;
        }
        public set DrugOid(value: string) {
            this.drugOid = value;
        }
        private formularyNote: string;
        public get FormularyNote(): string {
            return this.formularyNote;
        }

        /* ReVisit required for _isIconVisible value set here */
        public set FormularyNote(value: string) {
            this.formularyNote = value;
            if (!String.IsNullOrEmpty(this.formularyNote))
                this._isIconVisible = "Visible";
            else this._isIconVisible = "Collapsed";
        }
        private drugPropertyNote: string;
        public get DrugPropertyNote(): string {
            return this.drugPropertyNote;
        }

        /* ReVisit required for _isDrugPropertyIconVisible value set here */
        public set DrugPropertyNote(value: string) {
            this.drugPropertyNote = value;
            if (!String.IsNullOrEmpty(this.drugPropertyNote))
            this._isDrugPropertyIconVisible = "Visible";
        else this._isDrugPropertyIconVisible = "Collapsed";
        }
        private drugType: string;
        public get DrugType(): string {
            return this.drugType;
        }
        public set DrugType(value: string) {
            this.drugType = value;
        }
        private drugName: string;
        public get DrugName(): string {
            return this.drugName;
        }
        public set DrugName(value: string) {
            this.drugName = value;
        }
        private identifyingOID: number = 0;
        public get IdentifyingOID(): number {
            return this.identifyingOID;
        }
        public set IdentifyingOID(value: number) {
            this.identifyingOID = value;
        }
        private identifyingType: string;
        public get IdentifyingType(): string {
            return this.identifyingType;
        }
        public set IdentifyingType(value: string) {
            this.identifyingType = value;
        }
        private code: string;
        public get Code(): string {
            return this.code;
        }
        public set Code(value: string) {
            this.code = value;
        }
        private codingschemeCode: string;
        public get CodingschemeCode(): string {
            return this.codingschemeCode;
        }
        public set CodingschemeCode(value: string) {
            this.codingschemeCode = value;
        }
        private version: string;
        public get Version(): string {
            return this.version;
        }
        public set Version(value: string) {
            this.version = value;
        }
        private term: string;
        public get Term(): string {
            return this.term;
        }
        public set Term(value: string) {
            this.term = value;
        }
        private lblDrugVisible: boolean = false;
        public get LblDrugVisible(): boolean {
            return this.lblDrugVisible;
        }
        public set LblDrugVisible(value: boolean) {
            if (this.lblDrugVisible != value) {
                this.lblDrugVisible = value;
               //NotifyPropertyChanged("LblDrugVisible");
            }
        }
        private _isIconVisible: string = "Collapsed";
        private _isDrugPropertyIconVisible: string = "Collapsed";
        public get IsIconVisible(): string {
            return this._isIconVisible;
        }
        public set IsIconVisible(value: string) {
            this._isIconVisible = value;
           //NotifyPropertyChanged("IsIconVisible");
        }
        public get IsDrugPropertyIconVisible(): string {
            return this._isDrugPropertyIconVisible;
        }
        public set IsDrugPropertyIconVisible(value: string) {
            this._isDrugPropertyIconVisible = value;           
           //NotifyPropertyChanged("IsDrugPropertyIconVisible");
        }
        private itemsubType: string;
        public get ItemsubType(): string {
            return this.itemsubType;
        }
        public set ItemsubType(value: string) {
            this.itemsubType = value;
        }
        private _isDataproviderType: string;
        public get IsDataproviderType(): string {
            return this._isDataproviderType;
        }
        public set IsDataproviderType(value: string) {
            this._isDataproviderType = value;
        }
        private _IsIndicationRequired: string;
        public get IsIndicationRequired(): string {
            return this._IsIndicationRequired;
        }
        public set IsIndicationRequired(value: string) {
            this._IsIndicationRequired = value;
        }
        private _IsEnableOverrideReason: boolean = false;
        private _IsChkOverrideIndication: boolean = false;
        private _IndicationOverrideReason: ObservableCollection<CListItem>;
        private _IndicationOverrideReasonValue: CListItem;
        private _IsAccessConstr: string;
        private _IsFormulary: boolean = false;
        public get IsEnableOverrideReason(): boolean {
            return this._IsEnableOverrideReason;
        }
        public set IsEnableOverrideReason(value: boolean) {
            if (value != this._IsEnableOverrideReason) {
                this._IsEnableOverrideReason = value;
               //NotifyPropertyChanged("IsEnableOverrideReason");
            }
        }
        public get IsChkOverrideIndication(): boolean {
            return this._IsChkOverrideIndication;
        }
        public set IsChkOverrideIndication(value: boolean) {
            if (value != this._IsChkOverrideIndication) {
                this._IsChkOverrideIndication = value;
                this.EnableDisableRsnOverrideIndication(value);
               //NotifyPropertyChanged("IsChkOverrideIndication");
            }
        }
        public get IndicationOverrideReason(): ObservableCollection<CListItem> {
            return this._IndicationOverrideReason;
        }
        public set IndicationOverrideReason(value: ObservableCollection<CListItem>) {
            this._IndicationOverrideReason = value;
           //NotifyPropertyChanged("IndicationOverrideReason");
        }
        public get IndicationOverrideReasonValue(): CListItem {
            return this._IndicationOverrideReasonValue;
        }
        public set IndicationOverrideReasonValue(value: CListItem) {
            this._IndicationOverrideReasonValue = value;
           //NotifyPropertyChanged("IndicationOverrideReasonValue");
        }
        public get IsAccessConstr(): string {
            return this._IsAccessConstr;
        }
        public set IsAccessConstr(value: string) {
            this._IsAccessConstr = value;
        }
        public get IsFormulary(): boolean {
            return this._IsFormulary;
        }
        public set IsFormulary(value: boolean) {
            this._IsFormulary = value;
        }
        private _IsVisibleOverrideIndication: Visibility = Visibility.Collapsed;
        public get IsVisibleOverrideIndication(): Visibility {
            return this._IsVisibleOverrideIndication;
        }
        public set IsVisibleOverrideIndication(value: Visibility) {
            this._IsVisibleOverrideIndication = value;
           //NotifyPropertyChanged("IsVisibleOverrideIndication");
        }
        oippmabasevm: IPPMABaseVM;
        constructor();
        constructor(ovm?: IPPMABaseVM);
        constructor(ovm?: IPPMABaseVM)
        {
            super();
            switch (arguments.length) {
                case 1:
                    this.oippmabasevm = ovm;
                    if (this.IndicationOverrideReason == null && IPPMACommon.IndicationOverrideReason.ConceptCodes != null && IPPMACommon.IndicationOverrideReason.ConceptCodes.Count > 0) {
                        this.IndicationOverrideReason = new ObservableCollection<CListItem>();
                        this.IndicationOverrideReason = IPPMACommon.IndicationOverrideReason.ConceptCodes;
                    }
                    break;
            }
        }
        public GetProcessingOptionByIndication(): void {
            if (this.IdentifyingOID > 0 && this.IdentifyingType != null) {
                let objManagePres: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
                objManagePres.SearchProcessingOptionsByIndicationsCompleted  = (s,e) => { this.objManagePres_SearchProcessingOptionsByIndicationsCompleted(s,e); } ;
                let objReqProcessOpt: IPPMAManagePrescSer.CReqMsgSearchProcessingOptionsByIndications = new IPPMAManagePrescSer.CReqMsgSearchProcessingOptionsByIndications();
                let objReqDrugBscData: IPPMAManagePrescSer.DrugItemBasicData = new IPPMAManagePrescSer.DrugItemBasicData();
                objReqDrugBscData.IdentifyingOID = this.IdentifyingOID;
                objReqDrugBscData.IdentifyingType = this.IdentifyingType;
                let objReqIndication: IPPMAManagePrescSer.Indication = new IPPMAManagePrescSer.Indication();
                objReqIndication.Code = this.Code;
                objReqIndication.CodingschemeCode = this.CodingschemeCode;
                objReqIndication.Version = this.Version;
                objReqIndication.Term = this.Term;
                if (this.oippmabasevm != null && this.oippmabasevm.GpConnectMedicationItem != null && !String.IsNullOrEmpty(this.oippmabasevm.GpConnectMedicationItem.GPConnectID) && this.oippmabasevm.GpConnectMedicationItem.GPCProductFormOID > 0) {
                    objReqDrugBscData.GPCProductFormOID = this.oippmabasevm.GpConnectMedicationItem.GPCProductFormOID;
                }
                objReqProcessOpt.oDrugItemBasicDataBC = objReqDrugBscData;
                objReqProcessOpt.oIndicationsBC = objReqIndication;
                objReqProcessOpt.oDrugItemBasicDataBC.MCVersionNo = String.IsNullOrEmpty(ContextManager.Instance["AMCV"].ToString()) ? String.Empty : ContextManager.Instance["AMCV"].ToString();
                objReqProcessOpt.oContextInformation = Common.FillContext();
                objManagePres.SearchProcessingOptionsByIndicationsAsync(objReqProcessOpt);
            }
        }
        objManagePres_SearchProcessingOptionsByIndicationsCompleted(sender: Object, e: IPPMAManagePrescSer.SearchProcessingOptionsByIndicationsCompletedEventArgs): void {
            let _ErrorID: number = 80000068;
            let _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:MedaccessConstraintsVM, Method:objManagePres_SearchProcessingOptionsByIndicationsCompleted()";
            let objResProcessOpt: IPPMAManagePrescSer.CResMsgSearchProcessingOptionsByIndications = e.Result;
            if (e.Error == null && objResProcessOpt != null && objResProcessOpt.oPrescriptionItemDetails != null) {
                try {
                    let oPresItem: ObservableCollection<PrescriptionItemVM> = new ObservableCollection<PrescriptionItemVM>();
                    let oItemVM: PrescriptionItemVM;
                    for (let nCnt: number = 0; nCnt < objResProcessOpt.oPrescriptionItemDetails.Count; nCnt++) {
                        oItemVM = new PrescriptionItemVM(this.oippmabasevm);
                        objResProcessOpt.oPrescriptionItemDetails[nCnt].IsAccessContraint = "1";
                        oItemVM.GetPresItemDetails(objResProcessOpt.oPrescriptionItemDetails[nCnt]);
                        objResProcessOpt.oPrescriptionItemDetails[nCnt].IsAccessContraint = null;
                        oItemVM.IsAccessContraint = null;
                        oItemVM.PrescriptionItemOID = 0;
                        if ((objResProcessOpt.oPrescriptionItemDetails[nCnt].DoseFormulaDet != null) && (MedicationCommonProfileData.PrescribeConfig.EnableDoseCalc) && ((!String.IsNullOrEmpty(objResProcessOpt.oPrescriptionItemDetails[nCnt].DoseFormulaDet.BSAFormula)) || (!String.IsNullOrEmpty(objResProcessOpt.oPrescriptionItemDetails[nCnt].DoseFormulaDet.CalculationFor)) || (!String.IsNullOrEmpty(objResProcessOpt.oPrescriptionItemDetails[nCnt].DoseFormulaDet.IsDoseCalcAlwaysUse) && String.Equals(objResProcessOpt.oPrescriptionItemDetails[nCnt].DoseFormulaDet.IsDoseCalcAlwaysUse, "1")) || (!String.IsNullOrEmpty(objResProcessOpt.oPrescriptionItemDetails[nCnt].DoseFormulaDet.DoseCalcFrequencyName)) || (!String.IsNullOrEmpty(objResProcessOpt.oPrescriptionItemDetails[nCnt].DoseFormulaDet.DoseCalcBasedOn)) || (!String.IsNullOrEmpty(objResProcessOpt.oPrescriptionItemDetails[nCnt].DoseFormulaDet.DefaultWeightType)) || (!String.IsNullOrEmpty(objResProcessOpt.oPrescriptionItemDetails[nCnt].DoseFormulaDet.RequestedDose)))) {
                            oItemVM.IsDoseCalcInfo = true;
                        }
                        else {
                            oItemVM.IsDoseCalcInfo = false;
                        }
                        oItemVM.DrugPropertyNote = this.DrugPropertyNote;
                        oItemVM.IsNonformulary = (!this.IsFormulary) ? '1' : '0';
                        oPresItem.Add(oItemVM);
                    }
                    this.PresOptions = oPresItem;
                }
               catch(ex:any)  {
                    let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                this.PresOptions = null;
            }
        }
        public GetIndications(): void {
            if (this.DrugOid != null && this.DrugType != null) {
                let objService: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
                objService.GetIPPProcessingOptionIndicationsCompleted  = (s,e) => { this.objServiceProxy_GetIPPProcessingOptionIndicationsCompleted(s,e); } ;
                let objRequest: IPPMAManagePrescSer.CReqMsgGetIPPProcessingOptionIndications = new IPPMAManagePrescSer.CReqMsgGetIPPProcessingOptionIndications();
                objRequest.oDrugItemBasicDataBC = new IPPMAManagePrescSer.DrugItemBasicData();
                if (!String.IsNullOrEmpty(this.DrugOid.ToString()))
                    objRequest.oDrugItemBasicDataBC.IdentifyingOID = String.IsNullOrEmpty(this.DrugOid) ? 0 : Number.Parse(this.DrugOid.ToString());
                objRequest.oDrugItemBasicDataBC.IdentifyingType = String.IsNullOrEmpty(this.DrugType) ? String.Empty : this.DrugType.ToString();
                objRequest.oDrugItemBasicDataBC.MCVersionNo = String.IsNullOrEmpty(ContextManager.Instance["AMCV"].ToString()) ? String.Empty : ContextManager.Instance["AMCV"].ToString();
                objRequest.oContextInformation = Common.FillContext();
                objService.GetIPPProcessingOptionIndicationsAsync(objRequest);
            }
        }
        objServiceProxy_GetIPPProcessingOptionIndicationsCompleted(sender: Object, e: IPPMAManagePrescSer.GetIPPProcessingOptionIndicationsCompletedEventArgs): void {
            let _ErrorID: number = 80000069;
            let _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:MedaccessConstraintsVM, Method:objServiceProxy_GetProcessingOptionIndicationsCompleted()";
            let objResponse: IPPMAManagePrescSer.CResMsgGetIPPProcessingOptionIndications = e.Result;
            if (e.Error == null && objResponse != null) {
                try {
                    if (objResponse.oProcessingOptionIndications != null) {
                        this.LsIndication = new ObservableCollection<CListItem>();
                        for (let nIndicationCount: number = 0; nIndicationCount < objResponse.oProcessingOptionIndications.Length; nIndicationCount++) {
                            let lstItem: CListItem = new CListItem();
                            lstItem.DisplayText = objResponse.oProcessingOptionIndications[nIndicationCount].Term;
                            lstItem.Value = objResponse.oProcessingOptionIndications[nIndicationCount].Code + "," + objResponse.oProcessingOptionIndications[nIndicationCount].CodingschemeCode + "," + objResponse.oProcessingOptionIndications[nIndicationCount].Version;
                            this.LsIndication.Add(lstItem);
                        }
                    }
                }
               catch(ex:any)  {
                    let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                this.LsIndication = null;
            }
            Busyindicator.SetStatusIdle("SearchItem");
        }
        public validateForMDDFLocailzeIndication(): boolean {
            let isIndication: boolean = false;
            if (String.Equals(this.IsAccessConstr, "1", StringComparison.CurrentCultureIgnoreCase) && !String.IsNullOrEmpty(this.IsDataproviderType) && String.Equals(this.IsDataproviderType, CConstants.SourceDataProvider, StringComparison.CurrentCultureIgnoreCase)) {
                isIndication = true;
            }
            return isIndication;
        }
        public EnableDisableRsnOverrideIndication(IsChkOverride: boolean): void {
            if (IsChkOverride) {
                this.IsEnableOverrideReason = true;
            }
            else {
                //this.IndicationOverrideReasonValue = new CListItem();
                this.IndicationOverrideReasonValue =null;
                this.IsEnableOverrideReason = false;
            }
        }
        public GpConnectMedicationItem: GPConnectItemVM;
    }