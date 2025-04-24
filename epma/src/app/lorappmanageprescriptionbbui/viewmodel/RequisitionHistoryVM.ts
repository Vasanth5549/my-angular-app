import { Component, EventEmitter, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison , AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, Visibility} from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { CReqMsgGetRequisitionHistoryDetails, CResMsgGetRequisitionHistoryDetails, GetRequisitionHistoryDetailsCompletedEventArgs, IPPMAManagePrescriptionWSSoapClient, RequisitionHistoryDetails } from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { PrescriptionItemVM } from './PrescriptionItemVM';
import { TechValidateVM } from './TechValidateVM';
import { Common } from '../utilities/common';
import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { Resource } from '../resource';
import { CConstants } from '../utilities/constants';

    export class RequisitionHistoryVM extends ViewModelBase {

        public getdata:EventEmitter<any>=new EventEmitter();
        
        private _sDrugName: string = String.Empty;
        public get sDrugName(): string {
            return this._sDrugName;
        }
        public set sDrugName(value: string) {
            this._sDrugName = value;
           //NotifyPropertyChanged("sDrugName");
        }
        private _RequisitionHistoryList: ObservableCollection<RequisitionHistoryDetails> = new ObservableCollection<RequisitionHistoryDetails>();
        public get RequisitionHistoryList(): ObservableCollection<RequisitionHistoryDetails> {
            return this._RequisitionHistoryList;
        }
        public set RequisitionHistoryList(value: ObservableCollection<RequisitionHistoryDetails>) {
            this.RequisitionHistoryList.CopyFrom(value);
            // this._RequisitionHistoryList = value;
            //NotifyPropertyChanged("RequisitionHistoryList");
        }
        public oPrescriptionItemVM: PrescriptionItemVM;
        private _MedlineVisibility: Visibility = Visibility.Visible;
        private _DrugVisibility: Visibility = Visibility.Visible;
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
        constructor(sLorenzo?: string, oPresItemVM?:string | PrescriptionItemVM );
        constructor(sDGName?: string , sLorenzo?: string | PrescriptionItemVM, oPresItemVM?: PrescriptionItemVM);
        constructor(sDGName?: string, sLorenzo?: string | PrescriptionItemVM, oPresItemVM?: PrescriptionItemVM)
		{
            super();
            let strLorenzo:string;
            if(sLorenzo instanceof PrescriptionItemVM)
            {
                oPresItemVM=sLorenzo as PrescriptionItemVM;
            }
            if( typeof(sLorenzo)=='string'){
                strLorenzo=sLorenzo;
            }
		    switch (arguments.length) {
			case 3:
            this.oPrescriptionItemVM = oPresItemVM;
            if (oPresItemVM != null && oPresItemVM.FormViewerDetails != null && oPresItemVM.FormViewerDetails.BasicDetails != null) {
                if (oPresItemVM.FormViewerDetails.BasicDetails.DisplayFlag) {
                    this.MedlineVisibility = Visibility.Visible;
                    this.DrugVisibility = Visibility.Collapsed;
                    oPresItemVM.FormViewerDetails.BasicDetails.LaunchedFromTechValidate = false;
                }
                else {
                    this.MedlineVisibility = Visibility.Collapsed;
                    this.DrugVisibility = Visibility.Visible;
                    this.sDrugName = oPresItemVM.FormViewerDetails.BasicDetails.IdentifyingName;
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
            if (!String.IsNullOrEmpty(strLorenzo)) {
                if (String.Equals(strLorenzo, "PI-000", StringComparison.InvariantCultureIgnoreCase) || String.Equals(strLorenzo, "PI-001", StringComparison.InvariantCultureIgnoreCase)) {
                    if (oPresItemVM != null && oPresItemVM.PrescriptionItemOID > 0) {
                        this.GetRequisitionHistory(strLorenzo, oPresItemVM.FluidPrescribableItemListOID, oPresItemVM.PresMultiCompitemOID);
                    }
                }
                else {
                    this.GetRequisitionHistory(strLorenzo, oPresItemVM.FluidPrescribableItemListOID, oPresItemVM.PresMultiCompitemOID);
                }
            }
			break;
			case 2:
			if (!String.IsNullOrEmpty(sDGName)) {
                this.GetRequisitionHistory(sDGName, oPresItemVM.FluidPrescribableItemListOID, oPresItemVM.PresMultiCompitemOID);
            }
			break;
			}
        }

        public GetRequisitionHistory(sLorenzo: string, FluidPrescribableItemListOID: number, PrescriptionMultiComponentOID: number): void {
            let oReq: CReqMsgGetRequisitionHistoryDetails = new CReqMsgGetRequisitionHistoryDetails();
            oReq.sLorenzoIDBC = sLorenzo;
            oReq.oContextInformation = Common.FillContext();
            oReq.lnPatientoidBC = PatientContext.PatientOID;
            oReq.lnEncounteroidBC = PatientContext.EncounterOid;
            oReq.lnFluidPrescribableItemListOIDBC = FluidPrescribableItemListOID;
            oReq.lnPrescriptionMultiComponentOIDBC = PrescriptionMultiComponentOID;
            if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.FormViewerDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails != null && (!String.IsNullOrEmpty(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingType) && (String.Equals(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.NONCATALOGUEITEM, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.Precatalog, StringComparison.InvariantCultureIgnoreCase))) || (this.oPrescriptionItemVM != null && !String.IsNullOrEmpty(this.oPrescriptionItemVM.ItemSubType) && String.Compare(this.oPrescriptionItemVM.ItemSubType, CConstants.SUBTYPE, StringComparison.InvariantCultureIgnoreCase) == 0 && String.Compare(this.oPrescriptionItemVM.LorenzoID, "PI-001", StringComparison.OrdinalIgnoreCase) == 0)) {
                oReq.PrescriptionItemOIDBC = this.oPrescriptionItemVM.PrescriptionItemOID;
            }
            else if (PatientContext.PrescriptionOID != null) {
                let PresItemOIDs: string[] = PatientContext.PrescriptionOID.Split(',');
                if (PresItemOIDs.length == 1) {
                    oReq.PrescriptionItemOIDBC = Convert.ToInt64(PresItemOIDs[0]);
                }
            }
            let objServiceProxy: IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescriptionWSSoapClient();
            objServiceProxy.GetRequisitionHistoryDetailsCompleted  = (s,e) => { this.objServiceProxy_GetRequisitionHistoryDetailsCompleted(s,e); } ;
            objServiceProxy.GetRequisitionHistoryDetailsAsync(oReq);
        }
        public objServiceProxy_GetRequisitionHistoryDetailsCompleted(sender: Object, e: GetRequisitionHistoryDetailsCompletedEventArgs): void {
            if (e.Error == null) {
                let oRes: CResMsgGetRequisitionHistoryDetails = e.Result;
                if (oRes != null && oRes.arrRequisitionHistoryDetails != null && oRes.arrRequisitionHistoryDetails.Count > 0) {
                    for (let iCnt: number = 0; iCnt < oRes.arrRequisitionHistoryDetails.Count; iCnt++) {
                        if (oRes.arrRequisitionHistoryDetails[iCnt] != null) {
                            if (oRes.arrRequisitionHistoryDetails[iCnt].RequestStatus == "REQUESTED")
                                oRes.arrRequisitionHistoryDetails[iCnt].RequestStatus = Resource.Supplyhistory.MedReqHistory_Requested;
                            else if (oRes.arrRequisitionHistoryDetails[iCnt].RequestStatus == "CANCELLED")
                                oRes.arrRequisitionHistoryDetails[iCnt].RequestStatus = Resource.Supplyhistory.MedReqHistory_Cancelled;
                        }
                    }
                    this.RequisitionHistoryList = oRes.arrRequisitionHistoryDetails;

                    this.getdata.emit(true);
                }
            }
        }
    }