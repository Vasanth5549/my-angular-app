import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection  } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from '../../shared/epma-platform/soap-client/helper.service';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { CConstants, DoseTypeCode, PrescriptionTypes } from '../utilities/constants';
import { RelatedOptions } from '../model/common';

import { IPPMABaseVM } from './ippmabasevm';
import { Common } from '../utilities/common';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { ProfileData } from '../utilities/profiledata';
import { CReqMsgGetRelatedOptions, CResMsgGetRelatedOptions, DrugItemInputData, GetRelatedOptionsCompletedEventArgs, ManagePrescriptionWSSoapClient }  from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import * as IPPMAManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import * as ManagePrescSer from '../../shared/epma-platform/soap-client/ManagePrescriptionWS'
import { PrescriptionItemVM } from './PrescriptionItemVM';
import { medbrandconstraintschild } from '../view/medbrandconstraintschild';
    export class MedBrandConstraintsVM extends ViewModelBase {
        private sDrugOID: number = 0;
        public get DrugOID(): number {
            return this.sDrugOID;
        }
        public set DrugOID(value: number) {
            this.sDrugOID = value;
        }
        private sDrugType: string;
        public get DrugType(): string {
            return this.sDrugType;
        }
        public set DrugType(value: string) {
            this.sDrugType = value;
        }
        private sDrugName: string;
        public get DrugName(): string {
            return this.sDrugName;
        }
        public set DrugName(value: string) {
            this.sDrugName = value;
        }
        private isAccessConst: string;
        public get IsAccessConst(): string {
            return this.isAccessConst;
        }
        public set IsAccessConst(value: string) {
            this.isAccessConst = value;
        }
        private _slorenzoID: string;
        public get LorenzoID(): string {
            return this._slorenzoID;
        }
        public set LorenzoID(value: string) {
            this._slorenzoID = value;
        }
        private isFormulary: string;
        public get IsFormulary(): string {
            return this.isFormulary;
        }
        public set IsFormulary(value: string) {
            this.isFormulary = value;
        }
        private isPrescribeByBrand: string;
        public get IsPrescribeByBrand(): string {
            return this.isPrescribeByBrand;
        }
        public set IsPrescribeByBrand(value: string) {
            this.isPrescribeByBrand = value;
        }
        private itemType: string;
        public get ItemType(): string {
            return this.itemType;
        }
        public set ItemType(value: string) {
            this.itemType = value;
        }
        private lnParentDrugOID: number = 0;
        public get ParentDrugOID(): number {
            return this.lnParentDrugOID;
        }
        public set ParentDrugOID(value: number) {
            this.lnParentDrugOID = value;
        }
        private lnDosageFormOID: string;
        public get DosageFormOID(): string {
            return this.lnDosageFormOID;
        }
        public set DosageFormOID(value: string) {
            this.lnDosageFormOID = value;
        }
        private lnRouteOID: string;
        public get RouteOID(): string {
            return this.lnRouteOID;
        }
        public set RouteOID(value: string) {
            this.lnRouteOID = value;
        }
        private strStrengthText: string;
        public get StrengthText(): string {
            return this.strStrengthText;
        }
        public set StrengthText(value: string) {
            this.strStrengthText = value;
        }
        private sParentDrugType: string;
        public get ParentDrugType(): string {
            return this.sParentDrugType;
        }
        public set ParentDrugType(value: string) {
            this.sParentDrugType = value;
        }
        private sParentDrugName: string;
        public get ParentDrugName(): string {
            return this.sParentDrugName;
        }
        public set ParentDrugName(value: string) {
            this.sParentDrugName = value;
        }
        private _bIsFormularyChecked: boolean = false;
        public get IsFormularyChecked(): boolean {
            return this._bIsFormularyChecked;
        }
        public set IsFormularyChecked(value: boolean) {
            this._bIsFormularyChecked = value;
            if (value)
                this.PopulateCheckedGrid();
            else this.PopulateUncheckedGrid();
        }
        public IsBrand: boolean = false;
        private itemsubType: string;
        public get ItemsubType(): string {
            return this.itemsubType;
        }
        public set ItemsubType(value: string) {
            this.itemsubType = value;
        }
        public PopulateCheckedGrid(): void {
            this.IsFormulary = "1";
            if ((this.IsForSelectProduct) || ((!String.IsNullOrEmpty(this.ItemsubType) && (String.Compare(this.ItemsubType, CConstants.SUBTYPE, StringComparison.InvariantCultureIgnoreCase) == 0)))) {
                if (this.IsBrand) {
                    this.GetBrandOptions(false);
                }
                else {
                    this.GetSelectProduct();
                }
            }
            else {
                this.GetBrandOptions(true);
            }
        }
        public PopulateUncheckedGrid(): void {
            this.IsFormulary = "0";
            if ((this.IsForSelectProduct) || ((!String.IsNullOrEmpty(this.ItemsubType) && (String.Compare(this.ItemsubType, CConstants.SUBTYPE, StringComparison.InvariantCultureIgnoreCase) == 0))))
                if (this.IsBrand) {
                    this.GetBrandOptions(false);
                }
                else {
                    this.GetSelectProduct();
                }
            else {
                this.GetBrandOptions(true);
            }
        }
        private formularyNote: string;
        public get FormularyNote(): string {
            return this.formularyNote;
        }
        public set FormularyNote(value: string) {
            this.formularyNote = value;
        }
        MedBrandConstraintChildChangedEvent:Function;
        private brandItems: ObservableCollection<RelatedOptions> = new ObservableCollection<RelatedOptions>();
        public get BrandItems(): ObservableCollection<RelatedOptions> {
            return this.brandItems;
        }
        public set BrandItems(value: ObservableCollection<RelatedOptions>) {
            if (this.brandItems != value) {
                this.brandItems.CopyFrom(value);
                if (this.MedBrandConstraintChildChangedEvent != null) {
                    this.MedBrandConstraintChildChangedEvent();
                }
            }
        }
        private processOptions: ObservableCollection<PrescriptionItemVM> = new ObservableCollection<PrescriptionItemVM>();
        public get ProcessOptions(): ObservableCollection<PrescriptionItemVM> {
            return this.processOptions;
        }
        public set ProcessOptions(value: ObservableCollection<PrescriptionItemVM>) {
            if (this.processOptions != value) {
                //this.processOptions = value;
               //NotifyPropertyChanged("ProcessOptions");
               this.processOptions.CopyFrom(value);
            }
        }
        private _IsForSelectProduct: boolean = false;
        public get IsForSelectProduct(): boolean {
            return this._IsForSelectProduct;
        }
        public set IsForSelectProduct(value: boolean) {
            this._IsForSelectProduct = value;
        }
        oIPPMABASEVM: IPPMABaseVM;
        constructor();
        constructor(ovm?: IPPMABaseVM);
        constructor(ovm?: IPPMABaseVM)
        {
            super();
            switch (arguments.length)
            {
                case 1:
                    this.oIPPMABASEVM = ovm;
                    break;
            }
        }
         Item: medbrandconstraintschild;
        public Brandlaunch: boolean = false;
        
        public GetItem(oMedBrandChild: medbrandconstraintschild, formulary: string, Brand: boolean): void {
            this.Item = oMedBrandChild;
            this.isFormulary = formulary;
            this.Brandlaunch = Brand;
            if (Brand == false) {
                this.GetSelectProduct();
            }
            else {
                this.GetBrandOptions(false);
            }
        }
        
        public GetSelectProduct(): void {
            let objService: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
            objService.GetSelectProductCompleted  = (s,e) => { this.objService_GetSelectProductCompleted(s,e); } ;
            let objReq: IPPMAManagePrescSer.CReqMsgGetSelectProduct = new IPPMAManagePrescSer.CReqMsgGetSelectProduct();
            objReq.oContextInformation = Common.FillContext();
            objReq.oSelectProductBC = new IPPMAManagePrescSer.BrandInputData();
            objReq.oSelectProductBC.IdentifyingOID = this.ParentDrugOID > 0 ? this.ParentDrugOID : 0;
            objReq.oSelectProductBC.IdentifyingType = !String.IsNullOrEmpty(this.ParentDrugType) ? this.ParentDrugType : String.Empty;
            objReq.oSelectProductBC.IsFormulary = (String.IsNullOrEmpty(this.IsFormulary) || this.IsFormulary == "0") ? true : false;
            objReq.oSelectProductBC.MCVersionNo = String.IsNullOrEmpty(ContextManager.Instance["AMCV"].ToString()) ? String.Empty : ContextManager.Instance["AMCV"].ToString();
            objReq.oSelectProductBC.RouteOID = !String.IsNullOrEmpty(this.RouteOID) ? this.RouteOID : String.Empty;
            objService.GetSelectProductAsync(objReq);
        }
        objService_GetSelectProductCompleted(sender: Object, e: IPPMAManagePrescSer.GetSelectProductCompletedEventArgs): void {
            let _ErrorID: number = 80000070;
            let _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:MedBrandConstraintsVM, Method:objService_GetSelectProductCompleted()";
            let objResponse: IPPMAManagePrescSer.CResMsgGetSelectProduct = e.Result;
            if (e.Error == null && objResponse != null && objResponse.oDrugs != null) {
                try {
                    let objRelOptions: RelatedOptions;
                    let objRelOptionsColl: ObservableCollection<RelatedOptions> = new ObservableCollection<RelatedOptions>();
                    for (let nCount: number = 0; nCount < objResponse.oDrugs.Count; nCount++) {
                        objRelOptions = new RelatedOptions();
                        objRelOptions.IdentifyingName = objResponse.oDrugs[nCount].IdentifyingName;
                        objRelOptions.IdentifyingOID = objResponse.oDrugs[nCount].IdentifyingOID;
                        objRelOptions.IdentifyingType = objResponse.oDrugs[nCount].IdentifyingType;
                        objRelOptions.IsAccessConst = objResponse.oDrugs[nCount].IsAccessContraint;
                        objRelOptions.IsFormulary = objResponse.oDrugs[nCount].IsFormulary;
                        objRelOptions.IsPrescribeByBrand = objResponse.oDrugs[nCount].IsPrescribeByBrand;
                        objRelOptions.ItemType = objResponse.oDrugs[nCount].ItemType;
                        objRelOptions.LorenzoID = objResponse.oDrugs[nCount].LorenzoID;
                        objRelOptions.MCVersion = String.IsNullOrEmpty(ContextManager.Instance["AMCV"].ToString()) ? String.Empty : ContextManager.Instance["AMCV"].ToString();
                        objRelOptions.FormularyNote = objResponse.oDrugs[nCount].FormularyNote;
                        objRelOptions.DrugProperties = objResponse.oDrugs[nCount].DrugProperties;
                        objRelOptions.PrescribableitemlistOID = objResponse.oDrugs[nCount].PrescribableItemListOID;
                        objRelOptions.IsMonPeriodMand = String.Equals(objResponse.oDrugs[nCount].MonPeriodMand, '1') ? true : false;
                        objRelOptions.IsInfusionFluid = String.IsNullOrEmpty(objResponse.oDrugs[nCount].IsInfusion) ? String.Empty : objResponse.oDrugs[nCount].IsInfusion;
                        objRelOptions.Routes = objResponse.oDrugs[nCount].Routes;
                        objRelOptions.IsAllowMultipleRoute = objResponse.oDrugs[nCount].IsAllowMultipleRoute;
                        objRelOptions.IsIgnoreEPresRuleAdminMethod = objResponse.oDrugs[nCount].IsIgnoreEPresRuleAdminMethod;
                        objRelOptions.IsAuthorise = objResponse.oDrugs[nCount].IsAuthorise;
                        objRelOptionsColl.Add(objRelOptions);
                    }
                    this.BrandItems = objRelOptionsColl;
                }
               catch(ex:any)  {
                    let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                this.BrandItems = new ObservableCollection<RelatedOptions>();
                this.ProcessOptions = new ObservableCollection<PrescriptionItemVM>();
            }
            Busyindicator.SetStatusIdle("MCBrandConstraint");
            //Not Required for LHS. To be Re-Visited.
            /*
            if (this.Item != null) {
                if (this.BrandItems.Count == 0) {
                    this.Item.appDialog.DialogResult = true;
                }
                else {
                    let objMsg: iMessageBox = new iMessageBox();
                    objMsg.MessageButton = MessageBoxButton.OK;
                    objMsg.Title = "LORENZO";
                    if (!this.Brandlaunch) {
                        objMsg.Message = "Please select a product to proceed further";
                    }
                    else objMsg.Message = "Please select a brand to proceed further";
                    objMsg.Show();
                }
                this.BrandItems = new ObservableCollection<RelatedOptions>();
                this.Item = null;
            }
            */
        }
        public GetBrandOptions(ShowsAMBrand: boolean): void {
            let objService: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
            objService.GetBrandOptionsCompleted  = (s,e) => { this.objService_GetBrandOptionsCompleted(s,e); } ;
            let objRequest: IPPMAManagePrescSer.CReqMsgGetBrandOptions = new IPPMAManagePrescSer.CReqMsgGetBrandOptions();
            objRequest.oContextInformation = Common.FillContext();
            objRequest.oBrandDataBC = new IPPMAManagePrescSer.BrandInputData();
            objRequest.oBrandDataBC.IdentifyingOID = this.ParentDrugOID > 0 ? this.ParentDrugOID : 0;
            objRequest.oBrandDataBC.IdentifyingType = !String.IsNullOrEmpty(this.ParentDrugType) ? this.ParentDrugType : String.Empty;
            objRequest.oBrandDataBC.IsFormulary = (String.IsNullOrEmpty(this.IsFormulary) || this.IsFormulary == "0") ? true : false;
            objRequest.oBrandDataBC.MCVersionNo = String.IsNullOrEmpty(ContextManager.Instance["AMCV"].ToString()) ? String.Empty : ContextManager.Instance["AMCV"].ToString();
            objRequest.oBrandDataBC.FormOID = !String.IsNullOrEmpty(this.DosageFormOID) ? Convert.ToInt64(this.DosageFormOID) : 0;
            objRequest.oBrandDataBC.RouteOID = !String.IsNullOrEmpty(this.RouteOID) ? this.RouteOID : String.Empty;
            objRequest.oBrandDataBC.Strength = !String.IsNullOrEmpty(this.StrengthText) ? this.StrengthText : String.Empty;
            objRequest.oBrandDataBC.Itemsubtype = !String.IsNullOrEmpty(this.ItemsubType) ? this.ItemsubType : String.Empty;
            if (ShowsAMBrand && ProfileData.MedSearchConfig != null) {
                if (String.IsNullOrEmpty(ProfileData.MedSearchConfig.DisplayAMBrandOption) || ProfileData.MedSearchConfig.DisplayAMBrandOption.Equals("YES", StringComparison.InvariantCultureIgnoreCase)) {
                    objRequest.oBrandDataBC.IsSearchBrandByAM = true;
                }
                else {
                    objRequest.oBrandDataBC.IsSearchBrandByAM = false;
                }
            }
            objService.GetBrandOptionsAsync(objRequest);
        }
        objService_GetBrandOptionsCompleted(sender: Object, e: IPPMAManagePrescSer.GetBrandOptionsCompletedEventArgs): void {
            let _ErrorID: number = 80000070;
            let _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:MedBrandConstraintsVM, Method:objService_GetBrandOptionsCompleted()";
            let objResponse: IPPMAManagePrescSer.CResMsgGetBrandOptions = e.Result;
            if (e.Error == null && objResponse != null && objResponse.oDrugs != null) {
                try {
                    let objRelOptions: RelatedOptions;
                    let objRelOptionsColl: ObservableCollection<RelatedOptions> = new ObservableCollection<RelatedOptions>();
                    for (let nCount: number = 0; nCount < objResponse.oDrugs.Count; nCount++) {
                        objRelOptions = new RelatedOptions();
                        objRelOptions.IdentifyingName = objResponse.oDrugs[nCount].IdentifyingName;
                        objRelOptions.IdentifyingOID = objResponse.oDrugs[nCount].IdentifyingOID;
                        objRelOptions.IdentifyingType = objResponse.oDrugs[nCount].IdentifyingType;
                        objRelOptions.DosageForm = objResponse.oDrugs[nCount].sDosageForm;
                        objRelOptions.DosageFormID = objResponse.oDrugs[nCount].DosageFormID;
                        objRelOptions.Strength = objResponse.oDrugs[nCount].sStrength;
                        objRelOptions.IsAccessConst = objResponse.oDrugs[nCount].IsAccessContraint;
                        objRelOptions.IsFormulary = objResponse.oDrugs[nCount].IsFormulary;
                        objRelOptions.IsPrescribeByBrand = objResponse.oDrugs[nCount].IsPrescribeByBrand;
                        objRelOptions.ItemType = objResponse.oDrugs[nCount].ItemType;
                        objRelOptions.LorenzoID = objResponse.oDrugs[nCount].LorenzoID;
                        objRelOptions.MCVersion = objResponse.oDrugs[nCount].MCVersionNo;
                        objRelOptions.FormularyNote = objResponse.oDrugs[nCount].FormularyNote;
                        objRelOptions.DrugProperties = objResponse.oDrugs[nCount].DrugProperties;
                        objRelOptions.MCQuantityUomcol = objResponse.oDrugs[nCount].MCUOMS;
                        objRelOptions.PrescribableitemlistOID = objResponse.oDrugs[nCount].PrescribableItemListOID;
                        objRelOptions.IsMonPeriodMand = String.Equals(objResponse.oDrugs[nCount].MonPeriodMand, '1') ? true : false;
                        objRelOptions.IsInfusionFluid = String.IsNullOrEmpty(objResponse.oDrugs[nCount].IsInfusion) ? String.Empty : objResponse.oDrugs[nCount].IsInfusion;
                        objRelOptions.IsIgnoreEPresRuleAdminMethod = objResponse.oDrugs[nCount].IsIgnoreEPresRuleAdminMethod;
                        objRelOptionsColl.Add(objRelOptions);
                    }
                    this.BrandItems = objRelOptionsColl;
                }
               catch(ex:any)  {
                    let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                this.BrandItems = new ObservableCollection<RelatedOptions>();
                this.ProcessOptions = new ObservableCollection<PrescriptionItemVM>();
            }
            Busyindicator.SetStatusIdle("MCBrandConstraint");
            /*
            if (this.Item != null) {
                if (this.BrandItems.Count == 0) {
                    this.Item.appDialog.DialogResult = true;
                }
                else {
                    let objMsg: iMessageBox = new iMessageBox();
                    objMsg.MessageButton = MessageBoxButton.OK;
                    objMsg.Title = "LORENZO";
                    if (!this.Brandlaunch) {
                        objMsg.Message = "Please select a product to proceed further";
                    }
                    else objMsg.Message = "Please select a brand to proceed further";
                    objMsg.Show();
                }
                this.BrandItems = new ObservableCollection<RelatedOptions>();
                this.Item = null;
            }
            */
        }
        public GetRelatedOptions(): void {
            if (this.ParentDrugOID > 0 && this.ParentDrugType != null) {
                let oStirng: ManagePrescSer.ArrayOfString = new ManagePrescSer.ArrayOfString();
                oStirng.Add("ACTUALPRODUCT");
                let objService: ManagePrescriptionWSSoapClient = new ManagePrescriptionWSSoapClient();
                objService.GetRelatedOptionsCompleted  = (s,e) => { this.objService_GetRelatedOptionsCompleted(s,e); } ;
                let objRequest: CReqMsgGetRelatedOptions = new CReqMsgGetRelatedOptions();
                objRequest.oContextInformation = Common.FillContext();
                objRequest.oDrugItemInputDataBC = new DrugItemInputData();
                objRequest.oDrugItemInputDataBC.IdentifyingOID = this.ParentDrugOID > 0 ? this.ParentDrugOID : 0;
                objRequest.oDrugItemInputDataBC.IdentifyingType = !String.IsNullOrEmpty(this.ParentDrugType) ? this.ParentDrugType : String.Empty;
                objRequest.oDrugItemInputDataBC.IsPrescribeByBrand = "1";
                objRequest.oDrugItemInputDataBC.MCVersionNo = String.IsNullOrEmpty(ContextManager.Instance["AMCV"].ToString()) ? String.Empty : ContextManager.Instance["AMCV"].ToString();
                objRequest.oDrugItemInputDataBC.IsFormulary = (String.IsNullOrEmpty(this.IsFormulary) || this.IsFormulary == "0") ? true : false;
                if ((String.Compare(objRequest.oDrugItemInputDataBC.IdentifyingType, CConstants.CATALOGUEITEM) == 0) || (String.Compare(objRequest.oDrugItemInputDataBC.IdentifyingType, CConstants.VIRTUALPRODUCT) == 0)) {
                    objRequest.oDrugItemInputDataBC.MatchIdentifyingTypes = oStirng;
                }
                objService.GetRelatedOptionsAsync(objRequest);
            }
        }
        objService_GetRelatedOptionsCompleted(sender: Object, e: GetRelatedOptionsCompletedEventArgs): void {
            let _ErrorID: number = 80000071;
            let _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:MedBrandConstraintsVM, Method:objService_GetRelatedOptionsCompleted()";
            let objResponse: CResMsgGetRelatedOptions = e.Result;
            if (e.Error == null && objResponse != null && objResponse.oRelatedDrugs != null) {
                try {
                    let objRelOptions: RelatedOptions;
                    let objRelOptionsColl: ObservableCollection<RelatedOptions> = new ObservableCollection<RelatedOptions>();
                    for (let nCount: number = 0; nCount < objResponse.oRelatedDrugs.Count; nCount++) {
                        objRelOptions = new RelatedOptions();
                        objRelOptions.IdentifyingName = objResponse.oRelatedDrugs[nCount].IdentifyingName;
                        objRelOptions.IdentifyingOID = objResponse.oRelatedDrugs[nCount].IdentifyingOID;
                        objRelOptions.IdentifyingType = objResponse.oRelatedDrugs[nCount].IdentifyingType;
                        objRelOptions.IsAccessConst = objResponse.oRelatedDrugs[nCount].IsAccessContraint;
                        objRelOptions.IsFormulary = objResponse.oRelatedDrugs[nCount].IsFormulary;
                        objRelOptions.IsPrescribeByBrand = objResponse.oRelatedDrugs[nCount].IsPrescribeByBrand;
                        objRelOptions.ItemType = objResponse.oRelatedDrugs[nCount].ItemType;
                        objRelOptions.LorenzoID = objResponse.oRelatedDrugs[nCount].LorenzoID;
                        objRelOptionsColl.Add(objRelOptions);
                    }
                    this.BrandItems = objRelOptionsColl;
                }
               catch(ex:any)  {
                    let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                this.BrandItems = new ObservableCollection<RelatedOptions>();
                this.ProcessOptions = new ObservableCollection<PrescriptionItemVM>();
            }
        }
        public GetProcessingOptions(): void {
            if (this.DrugOID > 0 && this.DrugType != null) {
                let objManagePres: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
                objManagePres.GetProcessingOptionsCompleted  = (s,e) => { this.objManagePres_GetProcessingOptionsCompleted(s,e); } ;
                let objReqProcessOpt: IPPMAManagePrescSer.CReqMsgGetProcessingOptions = new IPPMAManagePrescSer.CReqMsgGetProcessingOptions();
                let objReqDrugInputData: IPPMAManagePrescSer.DrugItemInputData = new IPPMAManagePrescSer.DrugItemInputData();
                objReqDrugInputData.IdentifyingOID = this.DrugOID;
                objReqDrugInputData.IdentifyingType = this.DrugType;
                objReqDrugInputData.IsFormulary = (String.IsNullOrEmpty(this.IsFormulary) || this.IsFormulary == "0") ? false : true;
                objReqDrugInputData.MCVersionNo = String.IsNullOrEmpty(ContextManager.Instance["AMCV"].ToString()) ? String.Empty : ContextManager.Instance["AMCV"].ToString();
                objReqDrugInputData.FavouritesDetailOID = 0;
                objReqProcessOpt.oDrugItemInputDataBC = objReqDrugInputData;
                objReqProcessOpt.oContextInformation = Common.FillContext();
                objManagePres.GetProcessingOptionsAsync(objReqProcessOpt);
            }
        }
        objManagePres_GetProcessingOptionsCompleted(sender: Object, e: IPPMAManagePrescSer.GetProcessingOptionsCompletedEventArgs): void {
            let objResProcessOpt: IPPMAManagePrescSer.CResMsgGetProcessingOptions = e.Result;
            let oPresItem: ObservableCollection<PrescriptionItemVM> = new ObservableCollection<PrescriptionItemVM>();
            if (e.Error == null && objResProcessOpt != null && objResProcessOpt.oPrescribingOptionDetails != null) {
                let oItemVM: PrescriptionItemVM;
                for (let nCnt: number = 0; nCnt < objResProcessOpt.oPrescribingOptionDetails.Count; nCnt++) {
                    let bCanAdd: boolean = objResProcessOpt.oPrescribingOptionDetails[nCnt] != null;
                    if (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration) != 0 && objResProcessOpt.oPrescribingOptionDetails[nCnt].BasicProperties != null && objResProcessOpt.oPrescribingOptionDetails[nCnt].BasicProperties.Dose != null && objResProcessOpt.oPrescribingOptionDetails[nCnt].BasicProperties.Dose.DoseType != null) {
                        bCanAdd = String.Compare(objResProcessOpt.oPrescribingOptionDetails[nCnt].BasicProperties.Dose.DoseType.Code, DoseTypeCode.TITRATED, StringComparison.OrdinalIgnoreCase) != 0;
                    }
                    if (!bCanAdd)
                        continue;
                    oItemVM = new PrescriptionItemVM(this.oIPPMABASEVM);
                    oItemVM.GetPresItemDetails(objResProcessOpt.oPrescribingOptionDetails[nCnt]);
                    oItemVM.PrescriptionItemOID = 0;
                    oPresItem.Add(oItemVM);
                }
            }
            oPresItem.Add(ObjectHelper.CreateObject(new PrescriptionItemVM(null), { IsOther: true }));
            this.ProcessOptions = oPresItem;
        }
    }