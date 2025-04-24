import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, CommonBB} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, Visibility, ObservableCollection  } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from '../../shared/epma-platform/soap-client/helper.service';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import 'epma-platform/stringextension';
import { Resource } from '../resource';
import { CReqMsgGetSupplyHistoryDetails,  CReqMsgGetWardStockPresItemsDetails, CResMsgGetSupplyHistoryDetails, CResMsgGetWardStockPresItemsDetails, GetSupplyHistoryDetailsCompletedEventArgs, GetWardStockPresItemsDetailsCompletedEventArgs, IPPMAManagePrescriptionWSSoapClient, SupplyHistoryDetails, WardStockPresItemCriteria, WardStockPresItemDetails } from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { PrescriptionItemVM } from './PrescriptionItemVM';
import { MedChartData } from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import {  AppSessionInfo, PatientContext} from 'src/app/lorappcommonbb/utilities/globalvariable';
import {  MedicationCommonConceptCodeData, MedicationCommonProfileData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { Common } from '../utilities/common';
import { PrescriptionHelper } from '../utilities/prescriptionhelper';
import { CommonFlags } from '../utilities/globalvariable';
import { CConstants, PrescriptionTypes } from '../utilities/constants';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { TechValidateVM } from './TechValidateVM';
import { Environment } from '../../product/shared/models/Common';

    export class SupplyHistoryVM extends ViewModelBase {
        private _spWardStockVisibility: Visibility = Visibility.Collapsed;
        private _SupplyHistoryList: ObservableCollection<SupplyHistoryDetails> = new ObservableCollection<SupplyHistoryDetails>();
        //public delegate void RefreshWardStockICON();
        public RefreshWardStockEvent: Function;
        private _MedlineVisibility: Visibility = Visibility.Collapsed;
        private _DrugVisibility: Visibility = Visibility.Collapsed;
        private _sDrugName: string = String.Empty;
        public get MedlineVisibility(): Visibility {
            return this._MedlineVisibility;
        }
        public set MedlineVisibility(value: Visibility) {
            this._MedlineVisibility = value;
           //NotifyPropertyChanged("MedlineVisibility");
        }
        public get DrugVisibility(): Visibility {
            return this._DrugVisibility;
        }
        public set DrugVisibility(value: Visibility) {
            this._DrugVisibility = value;
           //NotifyPropertyChanged("DrugVisibility");
        }
        public get sDrugName(): string {
            return this._sDrugName;
        }
        public set sDrugName(value: string) {
            this._sDrugName = value;
           //NotifyPropertyChanged("sDrugName");
        }
        public get SupplyHistoryList(): ObservableCollection<SupplyHistoryDetails> {
            return this._SupplyHistoryList;
        }
        public set SupplyHistoryList(value: ObservableCollection<SupplyHistoryDetails>) {
            this._SupplyHistoryList = value;
           //NotifyPropertyChanged("SupplyHistoryList");
        }
        public get spWardStockVisibility(): Visibility {
            return this._spWardStockVisibility;
        }
        public set spWardStockVisibility(value: Visibility) {
            this._spWardStockVisibility = value;
           //NotifyPropertyChanged("spWardStockVisibility");
        }
        private _WardStockPresItemDetailsList: ObservableCollection<WardStockPresItemDetails>;
        public get WardStockPresItemDetailsList(): ObservableCollection<WardStockPresItemDetails> {
            return this._WardStockPresItemDetailsList;
        }
        public set WardStockPresItemDetailsList(value: ObservableCollection<WardStockPresItemDetails>) {
            this._WardStockPresItemDetailsList = value;
           //NotifyPropertyChanged("WardStockPresItemDetailsList");
        }
        public ProductName: string;
        private _ProductVisibility: Visibility = Visibility.Collapsed;
        public get ProductVisibility(): Visibility {
            return this._ProductVisibility;
        }
        public set ProductVisibility(value: Visibility) {
            this._ProductVisibility = value;
           //NotifyPropertyChanged("ProductVisibility");
        }
        private _Medlinecontent: Object = null;
        public get MedlineContent(): Object {
            return this._Medlinecontent;
        }
        public set MedlineContent(value: Object) {
            this._Medlinecontent = value;
           //NotifyPropertyChanged("MedlineContent");
        }        
        public oPrescriptionItemVM: PrescriptionItemVM;
        constructor();
        constructor(identifyingOID?: PrescriptionItemVM | number);
		constructor(identifyingOID?: PrescriptionItemVM | number, Identifyingtype?: string, routeOID?: string, drugformOID?: string, StrengthText?: string);
		constructor(identifyingOID?: PrescriptionItemVM | number, Identifyingtype?: string, routeOID?: string, drugformOID?: string, StrengthText?: string)
		{
            super();
            let PresItemVM : PrescriptionItemVM = null;            
            if (identifyingOID && identifyingOID instanceof PrescriptionItemVM)
            {
                PresItemVM = identifyingOID;
            }
		    switch (arguments.length) {
			case 1:
            if (PresItemVM != null) {
                if (PresItemVM != null && PresItemVM.FormViewerDetails != null && PresItemVM.FormViewerDetails.BasicDetails != null) {
                    this.oPrescriptionItemVM = PresItemVM;
                    if (PresItemVM.FormViewerDetails.BasicDetails.DisplayFlag) {
                        this.MedlineVisibility = Visibility.Visible;
                        this.DrugVisibility = Visibility.Collapsed;
                        PresItemVM.FormViewerDetails.BasicDetails.LaunchedFromTechValidate = false;
                    }
                    else {
                        this.MedlineVisibility = Visibility.Collapsed;
                        this.DrugVisibility = Visibility.Visible;
                        this.sDrugName = PresItemVM.FormViewerDetails.BasicDetails.IdentifyingName;
                    }
                    this.ProductName = String.Empty;
                    if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.FormViewerDetails != null && this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails != null) {
                        if (this.oPrescriptionItemVM.drugProductDetails != null && !String.IsNullOrEmpty(this.oPrescriptionItemVM.drugProductDetails.IdentifyingName) && this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.IslaunchedFromProductOptions != false && this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails == true) {
                            this.ProductName = this.oPrescriptionItemVM.drugProductDetails.IdentifyingName;
                        }
                        if (this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.CustomTechValidatedItem != null && !String.IsNullOrEmpty(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.CustomTechValidatedItem.DrugItem.IdentifyingName) && this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.IslaunchedFromProductOptions != false && this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails == false) {
                            this.ProductName = this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.CustomTechValidatedItem.DrugItem.IdentifyingName;
                        }
                    }
                    else {
                        this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails = new TechValidateVM();
                        this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails = true;
                    }
                    if (this.oPrescriptionItemVM.FormViewerDetails.TechValidateDetails.IslaunchedFromProductOptions != false) {
                        this.ProductVisibility = Visibility.Visible;
                    }
                    else {

                    }
                }
                if (PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration || PatientContext.PrescriptionType == PrescriptionTypes.Inpatient) {
                    if (PresItemVM != null && PresItemVM.FormViewerDetails != null && PresItemVM.FormViewerDetails.BasicDetails != null) {
                        this.spWardStockVisibility = Visibility.Visible;
                        this.GetWardStockPresDetails(PresItemVM.FormViewerDetails.BasicDetails.IdentifyingOID,
                            PresItemVM.FormViewerDetails.BasicDetails.IdentifyingType,
                            PresItemVM.FormViewerDetails.BasicDetails.Route == null ? String.Empty : PresItemVM.FormViewerDetails.BasicDetails.Route.Value,
                            PresItemVM.FormViewerDetails.BasicDetails.DosageForm == null ? String.Empty : PresItemVM.FormViewerDetails.BasicDetails.DosageForm.Value,
                            PresItemVM.FormViewerDetails.BasicDetails.Strength == null ? String.Empty : PresItemVM.FormViewerDetails.BasicDetails.Strength.DisplayText);
                    }
                }
            }
			break;
			case 5: 
			 if (PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration || PatientContext.PrescriptionType == PrescriptionTypes.Inpatient) {
                this.MedlineVisibility = Visibility.Visible;
                this.spWardStockVisibility = Visibility.Visible;

                if (ContextManager.Instance['ServiceOID'] != null) {
                    let ServiceOID: number = 0;
                    Number.TryParse(
                      ContextManager.Instance['ServiceOID'].ToString(),
                      (o) => (ServiceOID = o)
                    );
                    MedChartData.ServiceOID = ServiceOID;
                  }
                  if (ContextManager.Instance['LocationOID'] != null) {
                    let LocationOID: number = 0;
                    Number.TryParse(
                      ContextManager.Instance['LocationOID'].ToString(),
                      (o) => (LocationOID = o)
                    );
                    MedChartData.LocationOID = LocationOID;
                  }


                this.GetWardStockPresDetails(<number>identifyingOID, Identifyingtype, routeOID, drugformOID, StrengthText);
            }
			break;
			}
        }
      
        public GetWardStockPresDetails(IdentifyingOID: number, IdentifyingType: string, RouteOID: string, ProductFormOID: string, StrengthText: string): void {
            let oReq: CReqMsgGetWardStockPresItemsDetails = new CReqMsgGetWardStockPresItemsDetails();
            oReq.oWSPresItemCriteriaBC = new WardStockPresItemCriteria();
            oReq.oWSPresItemCriteriaBC.IdentifyingOID = IdentifyingOID;
            oReq.oWSPresItemCriteriaBC.IdentifyingType = IdentifyingType;
            oReq.oWSPresItemCriteriaBC.RouteOIDs = !String.IsNullOrEmpty(RouteOID) ? RouteOID : String.Empty;
            oReq.oWSPresItemCriteriaBC.ProductFormOID = (!String.IsNullOrEmpty(ProductFormOID)) ? Convert.ToInt64(ProductFormOID) : 0;
            oReq.oWSPresItemCriteriaBC.ServiceOID = MedChartData.ServiceOID;
            oReq.oWSPresItemCriteriaBC.LocationOID = MedChartData.LocationOID;
            oReq.oWSPresItemCriteriaBC.MCVersion = AppSessionInfo.AMCV;
            oReq.oWSPresItemCriteriaBC.StrengthText = StrengthText;
            oReq.oWSPresItemCriteriaBC.EncounterOID = PatientContext.EncounterOid;
            oReq.oWSPresItemCriteriaBC.IsEnableWSC = MedicationCommonProfileData.AddPrescribingConfig != null ? MedicationCommonProfileData.AddPrescribingConfig.EnableWardStockConfig : false;
            oReq.oContextInformation = Common.FillContext();
            let objServiceProxy: IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescriptionWSSoapClient();
            objServiceProxy.GetWardStockPresItemsDetailsCompleted  = (s,e) => { this.objServiceProxy_GetWardStockPresItemsDetailsCompleted(s,e); } ;
            objServiceProxy.GetWardStockPresItemsDetailsAsync(oReq);
        }
        public objServiceProxy_GetWardStockPresItemsDetailsCompleted(sender: Object, e: GetWardStockPresItemsDetailsCompletedEventArgs): void {
            if (e.Error == null) {
                let oRes: CResMsgGetWardStockPresItemsDetails = e.Result;
                if (oRes != null && oRes.arrWSPresItemDetails != null && oRes.arrWSPresItemDetails.Count > 0) {
                    this.WardStockPresItemDetailsList = oRes.arrWSPresItemDetails;
                }
                if (MedicationCommonProfileData.AddPrescribingConfig != null && MedicationCommonProfileData.AddPrescribingConfig.EnableWardStockConfig) {
                    if (oRes != null && oRes.IsWardStock && this.RefreshWardStockEvent != null) {
                        this.RefreshWardStockEvent();
                    }
                }
                else if (oRes != null && oRes.arrWSPresItemDetails != null && oRes.arrWSPresItemDetails.Count > 0) {
                    if (this.RefreshWardStockEvent != null) {
                        this.RefreshWardStockEvent();
                    }
                }
            }
        }
        GetSupplyHistory(sLorenzoID: string, IsMCIComp: boolean, IsCallForFluid: boolean): void {
            let oReq: CReqMsgGetSupplyHistoryDetails = new CReqMsgGetSupplyHistoryDetails();
            oReq.sLorenzoIDBC = sLorenzoID;
            oReq.oContextInformation = Common.FillContext();
            oReq.lnPatientoidBC = PatientContext.PatientOID;
            oReq.lnEncounteroidBC = PatientContext.EncounterOid;
            oReq.IsMCICompBC = IsMCIComp;
            oReq.IsCallForFluidBC = IsCallForFluid;
            oReq.IsCallFromCABC = true;
            if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.FormViewerDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails != null && (!String.IsNullOrEmpty(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingType) && (String.Equals(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.NONCATALOGUEITEM, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.Precatalog, StringComparison.InvariantCultureIgnoreCase))) || (this.oPrescriptionItemVM != null && String.Compare(this.oPrescriptionItemVM.LorenzoID, CommonFlags.MClorenzoid, StringComparison.OrdinalIgnoreCase) == 0 && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.isAdhocitem)) {
                oReq.PrescriptionItemOIDBC = this.oPrescriptionItemVM.PrescriptionItemOID;
            }
            let objServiceProxy: IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescriptionWSSoapClient();
            objServiceProxy.GetSupplyHistoryDetailsCompleted  = (s,e) => { this.objServiceProxy_GetSupplyHistoryDetailsCompleted(s,e); } ;
            objServiceProxy.GetSupplyHistoryDetailsAsync(oReq);
        }
        objServiceProxy_GetSupplyHistoryDetailsCompleted(sender: Object, e: GetSupplyHistoryDetailsCompletedEventArgs): void {
            if (e.Error == null) {
                let oRes: CResMsgGetSupplyHistoryDetails = e.Result;
                if (oRes != null && oRes.arrSupplyHistoryDetails != null && oRes.arrSupplyHistoryDetails.Count > 0) {
                    this.SupplyHistoryList = new ObservableCollection<SupplyHistoryDetails>();
                    oRes.arrSupplyHistoryDetails.forEach( (objSupplyHistoryDetails)=> {
                        let oSupplyHistoryDetails: SupplyHistoryDetails = new SupplyHistoryDetails();
                        oSupplyHistoryDetails.Drugname = objSupplyHistoryDetails.Drugname;
                        oSupplyHistoryDetails.IsDoseCombinationsDefined = objSupplyHistoryDetails.IsDoseCombinationsDefined;
                        oSupplyHistoryDetails.LocationName = objSupplyHistoryDetails.LocationName;
                        oSupplyHistoryDetails.ServiceName = objSupplyHistoryDetails.ServiceName;
                        oSupplyHistoryDetails.SupplieddBy = objSupplyHistoryDetails.SupplieddBy;
                        oSupplyHistoryDetails.SuppliedDTTM = objSupplyHistoryDetails.SuppliedDTTM;
                        oSupplyHistoryDetails.NextSupplyDTTM = objSupplyHistoryDetails.NextSupplyDTTM.Date;
                        oSupplyHistoryDetails.SortingDTTM = objSupplyHistoryDetails.SortingDTTM;
                        oSupplyHistoryDetails.PresItemstatusCode = objSupplyHistoryDetails.PresItemstatusCode;
                        if (objSupplyHistoryDetails.IsDoseCombinationsDefined == '0') {
                            oSupplyHistoryDetails.SupplystatusCode = (CommonBB.GetText(objSupplyHistoryDetails.SupplystatusCode, MedicationCommonConceptCodeData.ViewConceptCodes));
                        }
                        if (!String.IsNullOrEmpty(objSupplyHistoryDetails.Prescriptiontype))
                            oSupplyHistoryDetails.Prescriptiontype = PrescriptionHelper.GetPrescriptionType(objSupplyHistoryDetails.Prescriptiontype);
                        let sSupplyinscomments: StringBuilder = new StringBuilder();
                        if ((!String.IsNullOrEmpty(objSupplyHistoryDetails.Supplyinstruction) && (!String.Equals(objSupplyHistoryDetails.Supplyinstruction, CConstants.Supplycomments)))) {
                            let _arrSupplyInstruction: string = objSupplyHistoryDetails.Supplyinstruction;
                            let nSeparatorCount: number = _arrSupplyInstruction.Split(';').length;
                            if (nSeparatorCount > 0) {
                                let _sbSupplyInstructionsText: StringBuilder = new StringBuilder();
                                for (let _i: number = 0; _i < nSeparatorCount; _i++) {
                                    let sSupplyInstruction: string = String.Empty;
                                    if (MedicationCommonConceptCodeData.ViewConceptCodes != null) {
                                        sSupplyInstruction = CommonBB.GetText(_arrSupplyInstruction.Split(';')[_i], MedicationCommonConceptCodeData.ViewConceptCodes);
                                    }
                                    if (String.IsNullOrEmpty(sSupplyInstruction) && MedicationCommonConceptCodeData.ConceptCodes != null) {
                                        sSupplyInstruction = CommonBB.GetText(_arrSupplyInstruction.Split(';')[_i], MedicationCommonConceptCodeData.ConceptCodes);
                                    }
                                    _sbSupplyInstructionsText.Append(sSupplyInstruction);
                                    if (_i < nSeparatorCount - 1) {
                                        _sbSupplyInstructionsText.Append(";");
                                    }
                                }
                                sSupplyinscomments.Append(_sbSupplyInstructionsText.ToString());
                            }
                            else {
                                sSupplyinscomments.Append(CommonBB.GetText(objSupplyHistoryDetails.Supplyinstruction, MedicationCommonConceptCodeData.ViewConceptCodes));
                            }
                        }
                        if (!String.IsNullOrEmpty(objSupplyHistoryDetails.SupplyComments)) {
                            if (sSupplyinscomments != null && !String.IsNullOrEmpty(sSupplyinscomments.ToString()))
                                sSupplyinscomments.Append(Environment.NewLine);
                            sSupplyinscomments.Append(Resource.Supplyhistory.Comments + objSupplyHistoryDetails.SupplyComments);
                        }
                        oSupplyHistoryDetails.Supplyinstruction = sSupplyinscomments.ToString();
                        this.SupplyHistoryList.Add(oSupplyHistoryDetails);
                    });
                }
            }
        }
    }