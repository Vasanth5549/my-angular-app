import { Component, EventEmitter, Injectable, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, iBusyIndicator} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, Exception, CListItem, PatientContext, List, Enum, ArrayOfLong } from 'epma-platform/models';
import { AppDialog, EventArgs } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper as Helper, ObjectHelper } from 'epma-platform/helper';
import { CReqMsgGetAdminMultiSlot, CReqMsgGetSelfAdminDetails, CReqMsgManageSelfAdmin, CReqMsgOmitSlots, CReqMsgReinstateSlots, CReqMsgUpdateTitratedDose, CResMsgGetAdminMultiSlot, CResMsgGetSelfAdminDetails, CResMsgOmitSlots, CResMsgReinstateSlots, CResMsgUpdateTitratedDose, DoseSchedule, GetAdminMultiSlotCompletedEventArgs, GetSelfAdminDetailsCompletedEventArgs, ManageSelfAdminCompletedEventArgs, ManageSelfAdminParams, MedicationAdministrationWSSoapClient, MultiSlotParams, OmitSlotsCompletedEventArgs, OmitSlotsParams, ReinstateSlotParams, ReinstateSlotsCompletedEventArgs, SelfAdminDrug, SlotData, UpdateTitratedDoseCompletedEventArgs } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { AdministrationDetailVM, SlotDetailVM } from './MedicationChartVM';
import { CReqMsgGetPatientPersonalCarer, CResMsgGetPatientPersonalCarer, GetPatientPersonalCarerCompletedEventArgs, QueryPatientRecordWSSoapClient } from 'src/app/shared/epma-platform/soap-client/QueryPatientRecordWS';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { CReqMsgGetFormViewDefaultParams, CResMsgGetFormViewDefaultParams, GetFormViewDefaultParamsCompletedEventArgs, IPPFormViewParams, IPPFrequency, IPPMAManagePrescriptionWSSoapClient, IPPScheduledetails, ManageReviewPeriod, ObjectInfo, ReviewAfterDetail } from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
//import { DrugItem } from 'src/app/product/shared/models/drugItem';
import { Resource } from '../resource';
import { MedicationCommonConceptCodeData, MedicationCommonProfileData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { CValuesetTerm } from 'src/app/shared/epma-platform/soap-client/CReferenceWS';
import { MCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/common';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common'
import { CConstants, DoseTypeCode, MultiRouteType, SlotStatus, UOMType } from '../utilities/CConstants';
import { ChartContext, MedChartData, ValueDomainValues } from '../utilities/globalvariable';
import { CReqMsgGetAllOptions, CResMsgGetAllOptions, GetAllOptionsCompletedEventArgs, ManagePrescriptionWSSoapClient } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { Common } from '../utilities/common';
import { MedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { iTreeViewCollection } from 'src/app/shared/epma-platform/controls-model/treeView.model';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import { AppSessionInfo } from 'src/app/lorappcommonbb/utilities/globalvariable';
import * as IPPManagePrescSer from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { PrescriptionHelper } from '../utilities/PrescriptionHelper';
import { AdminstrativeTimesVM } from 'src/app/lorappmedicationcommonbb/viewmodel/adminstrativetimesvm';
import { ChartRow } from 'src/app/lorarcbluebirdmedicationchart/common/ChartRow';
import { DrugItem } from 'src/app/lorarcbluebirdmedicationchart/common/DrugItem';
  
    export enum FormDefaults {
        ALL,

        DOSAGEFORM,

        DOSEUOM,

        SITE
    }
    export class MedsAdminMultiSlotVM extends ViewModelBase {
        private isPRN: boolean;
        private medchartOID: number;
        private multiSlot: ObservableCollection<SlotDetailVM>;
        private prescriptionItemOID: number;
        public CurrentDateTime: DateTime;
        private slotDate: DateTime;
        private drugDetail: DrugItem;
        //public delegate void MedsAdminMultiSlotDelegate();
        public MedsAdminMultiSlotCompleted: Function;
        public IsPatientSelfAdmin: boolean;
        private IsRecordAdmin: boolean = false;
        private IsPRNfromPresChart: boolean = false;
        public IsReloadChartRequired: boolean = false;
        public PrescriptionItemStatus: string;
        public IsPRNWithSchedule: boolean;
        public IsLaunchedPRNFromPresChart: boolean = false;
        public personalCarers: ObservableCollection<CListItem>;
        public conceptCodes: StringBuilder = new StringBuilder();
        public resolvedConceptCodes: ObservableCollection<CListItem>;
        GetAdminMultiSlotCompleted = new EventEmitter();
        public GetMultiSlotDetail(isPRNFlag: boolean, isRecordAdmin: boolean, IsPRNLaunchedfromPresChart: boolean): void {
            this.isPRN = isPRNFlag;
            this.IsRecordAdmin = isRecordAdmin;
            this.IsPRNfromPresChart = IsPRNLaunchedfromPresChart;
            let objQPService: QueryPatientRecordWSSoapClient = new QueryPatientRecordWSSoapClient();
            objQPService.GetPatientPersonalCarerCompleted  = (s,e) => { this.objService_GetPatientPersonalCarerCompleted(s,e); } ;
            let objQPReq: CReqMsgGetPatientPersonalCarer = new CReqMsgGetPatientPersonalCarer();
            objQPReq.oContextInformation = CommonBB.FillContext();
            objQPReq.PatientIDBC = PatientContext.PatientOID != null ? PatientContext.PatientOID.ToString() : String.Empty;
            objQPReq.CurrentBC = "IncludeRemoved";
            objQPService.GetPatientPersonalCarerAsync(objQPReq);
        }
        private GetMultiSlotDetails(): void {
            if (this.SlotDate != null) {
                let objService: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
                objService.GetAdminMultiSlotCompleted  = (s,e) => { this.objSerive_GetAdminMultiSlotCompleted(s,e); } ;
                let oMultiSlotParams: CReqMsgGetAdminMultiSlot = new CReqMsgGetAdminMultiSlot();
                oMultiSlotParams.oContextInformation = CommonBB.FillContext();
                oMultiSlotParams.oMultiSlotParamsBC = new MultiSlotParams();
                oMultiSlotParams.oMultiSlotParamsBC.MedChartOID = this.MedchartOID;
                oMultiSlotParams.oMultiSlotParamsBC.PrescriptionItemOID = this.PrescriptionItemOID;
                oMultiSlotParams.oMultiSlotParamsBC.SlotDate = Convert.ToDateTime(this.SlotDate.ToShortDateString()).ToUniversalTime();
                oMultiSlotParams.oMultiSlotParamsBC.PatientOID = ChartContext.PatientOID;
                oMultiSlotParams.oMultiSlotParamsBC.DuenessTime = MedChartData.DuenessThreshold;
                oMultiSlotParams.oMultiSlotParamsBC.OverDueTime = CConstants.OverdueToNotknownTime;
                oMultiSlotParams.oMultiSlotParamsBC.IsPRN = this.isPRN;
                this.IsLaunchedPRNFromPresChart = this.IsPRNfromPresChart;
                objService.GetAdminMultiSlotAsync(oMultiSlotParams);
            }
        }
        private objSerive_GetAdminMultiSlotCompleted(sender: Object, e: GetAdminMultiSlotCompletedEventArgs): void {
            let _ErrorID: number = 80000085;
            let _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:MedsadminVM, Method:objSerive_GetAdminMultiSlotCompleted()";
            let dtAdministeredDate: DateTime= DateTime.MinValue;
            let objResAdminMultislot: CResMsgGetAdminMultiSlot = e.Result;
            if ((e.Error == null) && ((objResAdminMultislot != null) && (objResAdminMultislot.oMultiSlotDetail != null))) {
                try {
                    let objSlotDetailVM: ObservableCollection<SlotDetailVM> = new ObservableCollection<SlotDetailVM>();
                    if ((objResAdminMultislot.oMultiSlotDetail.oSlotDetail != null) && (objResAdminMultislot.oMultiSlotDetail.oSlotDetail.Count > 0)) {
                        let objSlotDetail: SlotDetailVM;
                        let nCnt: number = objResAdminMultislot.oMultiSlotDetail.oSlotDetail.Count;
                        for (let i: number = 0; i < nCnt; i++) {
                            if (objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].Status != "CC_DELETED") {
                                objSlotDetail = new SlotDetailVM();
                                objSlotDetail.CurrentServerDate = this.CurrentDateTime;
                                objSlotDetail.PrescriptionItemOID = this.PrescriptionItemOID;
                                objSlotDetail.TodaySlotDate = this.SlotDate;
                                objSlotDetail.PresScheduleOID = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].PrescriptionItemOID;
                                objSlotDetail.AdminMethod = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdminMethod;
                                objSlotDetail.Dose = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].Dose;
                                objSlotDetail.LDose = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].Dose;
                                objSlotDetail.UDose = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].UpperDose;
                                objSlotDetail.DoseUOM = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].DoseUOM;
                                objSlotDetail.DoseUOMOID = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].DoseUOMOID;
                                objSlotDetail.DoseUOMLzoID = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].DoseUOMLzoID;
                                objSlotDetail.IsNextSlotMultiSlotAdmin = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].IsNextSlotMultiSlotAdmin;
                                objSlotDetail.Status = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].Status;
                                objSlotDetail.AdministrationDetail = new AdministrationDetailVM();
                                objSlotDetail.AdministrationDetail.AdministeredByOID = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.AdministeredByOID.ToString();
                                objSlotDetail.AdministrationDetail.AdminByPersonalCarerOID = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.AdminByPersonalCarerOID;
                                objSlotDetail.AdministrationDetail.AdministratorType = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.AdministratorType;
                                objSlotDetail.AdministrationDetail.AdministeredBy = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.AdministeredBy;
                                if (String.Equals(objSlotDetail.Status, SlotStatus.SELFADMINISTERED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(objSlotDetail.Status, SlotStatus.GIVEN, StringComparison.CurrentCultureIgnoreCase)) {
                                    if (String.Equals(objSlotDetail.AdministrationDetail.AdministratorType, "PersonalCarer", StringComparison.CurrentCultureIgnoreCase)) {
                                        if (objSlotDetail.AdministrationDetail.AdminByPersonalCarerOID > 0) {
                                            objSlotDetail.AdministrationDetail.AdministeredBy = Resource.MedicationAdministrator.rdbparent_text + " - " + objSlotDetail.AdministrationDetail.AdministeredBy;
                                            if (this.personalCarers != null && this.personalCarers.Count > 0) {
                                                let selectedPersonalCarer: CListItem = this.personalCarers.FirstOrDefault(x => x.Value == objSlotDetail.AdministrationDetail.AdminByPersonalCarerOID.ToString());
                                                if (selectedPersonalCarer != null) {
                                                    if (selectedPersonalCarer.Tag != null && !String.IsNullOrEmpty(selectedPersonalCarer.Tag.ToString()) && this.resolvedConceptCodes != null && this.resolvedConceptCodes.Count > 0) {
                                                        objSlotDetail.AdministrationDetail.PersonalCarerRelationship = this.resolvedConceptCodes.Where(c => c.Value == selectedPersonalCarer.Tag.ToString()).Select(s => s.DisplayText).FirstOrDefault().ToString();
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                objSlotDetail.AdministrationDetail.RecordedBy = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.RecordedBy;
                                objSlotDetail.AdministrationDetail.RecordedAt = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.RecordedAt;
                                objSlotDetail.AdminReason = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.AdminReasonCode;
                                objSlotDetail.AdministeredRoute = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.Route;
                                objSlotDetail.AdministrationDetail.LastAdministeredBy = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.LastAdministeredBy;
                                objSlotDetail.AdministrationDetail.LastAdministeredAt = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.LastAdministeredAt;
                                dtAdministeredDate = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.AdministeredDate;
                                objSlotDetail.AdministrationDetail.AdministeredDate = dtAdministeredDate;
                                if (this.isPRN) {
                                    objSlotDetail.ScheduledDTTM = dtAdministeredDate;
                                }
                                else {
                                    objSlotDetail.ScheduledDTTM = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].ScheduledDTTM;
                                }
                                objSlotDetail.AdministrationDetail.MedAdminOID = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.MedAdminOID;
                                objSlotDetail.AdministrationDetail.Dose = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.Dose;
                                objSlotDetail.AdministrationDetail.strDoseUOM = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.DoseUOM;
                                objSlotDetail.AdministrationDetail.lnDoseUOMOID = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.DoseUOMOID;
                                objSlotDetail.AdministrationDetail.IsHistoryExists = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.IsHistoryExists;
                                objSlotDetail.AdministrationDetail.AdministeredOnTimeMode = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.AdministeredOnTimeMode;
                                objSlotDetail.AdministrationDetail.AdminComments = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.AdminComments;
                                objSlotDetail.IsParacetamolIngredient = this.IsParacetamolIngredient;
                                objSlotDetail.ParacetamolAdminCount = this.ParacetamolAdminCount;
                                objSlotDetail.AdministrationDetail.IsDuringHomeLeave = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.IsDuringHomeLeave;
                                let sReason: string = String.Empty;
                                if (!String.IsNullOrEmpty(objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.AdminReasonCode)) {
                                    sReason = ValueDomainValues.oRecordAdminReasons.Count > 0 ? CommonBB.GetText(objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.AdminReasonCode, ValueDomainValues.oRecordAdminReasons) : objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.AdminReasonCode;
                                    if (objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].Status == SlotStatus.DEFERADMIN || objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].Status == SlotStatus.DEFERDUENOW || objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].Status == SlotStatus.DEFEROVERDUE) {
                                        objSlotDetail.AdministrationDetail.ReasonForNotDefer = ObjectHelper.CreateObject(new CListItem(), {
                                            DisplayText: sReason,
                                            Value: objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.AdminReasonCode
                                        });
                                    }
                                    else if (objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].Status == SlotStatus.NOTGIVEN) {
                                        objSlotDetail.AdministrationDetail.ReasonNotGiven = ObjectHelper.CreateObject(new CListItem(), {
                                            DisplayText: sReason,
                                            Value: objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.AdminReasonCode
                                        });
                                    }
                                }
                                else if (!String.IsNullOrEmpty(objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.DoseDiscReasonCode)) {
                                    sReason = ValueDomainValues.oRecordAdminReasons.Count > 0 ? CommonBB.GetText(objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.DoseDiscReasonCode, ValueDomainValues.oRecordAdminReasons) : objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.DoseDiscReasonCode;
                                }
                                if (!String.IsNullOrEmpty(sReason)) {
                                    let isDoseDiscrepancyExists: boolean = false;
                                    if (!String.IsNullOrEmpty(objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.AdminReasonCode) && ValueDomainValues.oRecordAdminDoseDiscrepancyReasons != null && ValueDomainValues.oRecordAdminDoseDiscrepancyReasons.Count > 0) {
                                        let DoseDiscrepancyValueSet = ValueDomainValues.oRecordAdminDoseDiscrepancyReasons.Where(cValueSet => String.Compare(objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.AdminReasonCode, cValueSet.csCode, StringComparison.CurrentCultureIgnoreCase) == 0).Select(cValueSet => cValueSet);
                                        if (DoseDiscrepancyValueSet != null && DoseDiscrepancyValueSet.Count() > 0)
                                            isDoseDiscrepancyExists = true;
                                    }
                                    if (!isDoseDiscrepancyExists) {
                                        if (!String.IsNullOrEmpty(objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.DoseDiscReasonCode) && ValueDomainValues.oRecordAdminDoseDiscrepancyReasons != null && ValueDomainValues.oRecordAdminDoseDiscrepancyReasons.Count > 0) {
                                            let DoseDiscrepancyValueSet = ValueDomainValues.oRecordAdminDoseDiscrepancyReasons.Where(cValueSet =>String.Compare(objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.DoseDiscReasonCode,cValueSet.csCode,StringComparison.CurrentCultureIgnoreCase)==0).Select(cValueSet => cValueSet);
                                            if (DoseDiscrepancyValueSet != null && DoseDiscrepancyValueSet.Count() > 0)
                                                isDoseDiscrepancyExists = true;
                                        }
                                    }
                                    if (isDoseDiscrepancyExists) {
                                        objSlotDetail.AdministrationDetail.DoseDiscReasonCode = ObjectHelper.CreateObject(new CListItem(), {
                                            DisplayText: sReason,
                                            Value: objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.DoseDiscReasonCode
                                        });
                                    }
                                }
                                objSlotDetail.IsLastPRN = this.isPRN;
                                objSlotDetail.IsLaunchprnFromPresChart = this.IsLaunchedPRNFromPresChart;
                                objSlotDetail.DrugDetail = this.DrugDetail;
                                objSlotDetail.IsPatientSelfAdmin = this.IsPatientSelfAdmin;
                                objSlotDetail.IsNextPRNAllowed = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].IsNextDoseAllowedForPRN;
                                objSlotDetail.MinTimeInterval = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].MinimumIntervalForPRN;
                                this.IsNextPRNAllow = objSlotDetail.IsNextPRNAllowed;
                                objSlotDetail.isInfusionInProgressForMultiRouteItem = objResAdminMultislot.oMultiSlotDetail.IsInfusionInProgressForMultiRouteItem;
                                objSlotDetail.InProgressInfusionMultiRouteDTTM = objResAdminMultislot.oMultiSlotDetail.InProgressMultiRouteInfusionAdminDTTM;
                                objSlotDetail.AdministrationDetail.IsAdministeredOnInfusionChart = objResAdminMultislot.oMultiSlotDetail.oSlotDetail[i].AdministrationDetail.IsAdministeredOnInfusionChart;
                                // let itemMRtype: MultiRouteType;
                                // if (Enum.TryParse<MultiRouteType>(objResAdminMultislot.oMultiSlotDetail.MultiRouteType.ToString(), itemMRtype))
                                // itemMRtype = Enum.Parse(MultiRouteType,objResAdminMultislot.oMultiSlotDetail.MultiRouteType.ToString(), true)
                                // if (itemMRtype)
                                objSlotDetail.MultiRoute_Type = objResAdminMultislot.oMultiSlotDetail.MultiRouteType;
                                objSlotDetailVM.Add(objSlotDetail);
                            }
                        }
                    }
                    this.IsNextPRNAllow = objResAdminMultislot.oMultiSlotDetail.IsNextDoseAllowedForPRN;
                    this.MinimumTime = objResAdminMultislot.oMultiSlotDetail.MinimumIntervalForPRN;
                    this.LastRecordedAtForPRN = objResAdminMultislot.oMultiSlotDetail.LastRecordedAtForPRN;
                    if (this.isPRN && !this.IsLaunchedPRNFromPresChart) {
                        dtAdministeredDate = this.LastRecordedAtForPRN;
                        let objLastSlotVM: SlotDetailVM = ObjectHelper.CreateObject(new SlotDetailVM(), { IsPatientSelfAdmin: this.IsPatientSelfAdmin, IsLastPRN: true, DrugDetail: this.drugDetail, MinTimeInterval: this.MinimumTime, PreviousAdministeredDate: dtAdministeredDate });
                        if (!this.IsNextPRNAllow && DateTime.NotEquals(dtAdministeredDate , DateTime.MinValue))
                            objLastSlotVM.IsNextPRNAllowed = false;
                        else objLastSlotVM.IsNextPRNAllowed = true;
                        objLastSlotVM.IsParacetamolIngredient = this.IsParacetamolIngredient;
                        objLastSlotVM.ParacetamolAdminCount = this.ParacetamolAdminCount;
                        objLastSlotVM.TodaySlotDate = this.SlotDate;
                        objLastSlotVM.CurrentServerDate = this.CurrentDateTime;
                        objLastSlotVM.isInfusionInProgressForMultiRouteItem = objResAdminMultislot.oMultiSlotDetail.IsInfusionInProgressForMultiRouteItem;
                        objLastSlotVM.InProgressInfusionMultiRouteDTTM = objResAdminMultislot.oMultiSlotDetail.InProgressMultiRouteInfusionAdminDTTM;
                        objSlotDetailVM.Add(objLastSlotVM);
                    }
                    this.MultiSlot = objSlotDetailVM;
                    // emit data to multislot
                    this.GetAdminMultiSlotCompleted.emit(true);
                    if (objSlotDetailVM != null) {
                        let nCount: number = objSlotDetailVM.Count;
                        if (nCount > 0) {
                            objSlotDetailVM[nCount - 1].IsLastSlotinCurrentView = true;
                        }
                    }
                }
               catch(ex:any)  {
                    let lnReturn: number =  AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number =  AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
            if (this.MedsAdminMultiSlotCompleted != null)
                this.MedsAdminMultiSlotCompleted();
        }
        objService_GetPatientPersonalCarerCompleted(sender: Object, e: GetPatientPersonalCarerCompletedEventArgs): void {
            if (e.Error == null) {
                let objRes: CResMsgGetPatientPersonalCarer = e.Result;
                if (objRes != null && objRes.oPersonalCarer != null && objRes.oPersonalCarer.Count > 0) {
                    this.personalCarers = new ObservableCollection<CListItem>();
                    objRes.oPersonalCarer.forEach( (carer)=> {
                        let item: CListItem = new CListItem();
                        item.DisplayText = String.Concat(carer.SurName, " ", carer.ForeName);
                        item.Value = carer.PersonalCarerOID;
                        item.Tag = carer.Relationship;
                        this.personalCarers.Add(item);
                        this.conceptCodes.Append(carer.Relationship);
                        this.conceptCodes.Append("~^~");
                    });
                    if (this.personalCarers.Count > 0) {
                        if (MedicationCommonConceptCodeData.ViewConceptCodes == null)
                            MedicationCommonConceptCodeData.ViewConceptCodes = new ObservableCollection<CValuesetTerm>();
                        if (this.conceptCodes != null && this.conceptCodes.Length > 0)
                            this.resolvedConceptCodes = new ObservableCollection<CListItem>(MCommonBB.GetResolvedSupplyInstTermText(this.conceptCodes));
                    }
                }
            }
            this.GetMultiSlotDetails();
        }
        public get IsPRN(): boolean {
            return this.isPRN;
        }
        public set IsPRN(value: boolean) {
            this.isPRN = value;
        }
        public get MedchartOID(): number {
            return this.medchartOID;
        }
        public set MedchartOID(value: number) {
            this.medchartOID = value;
        }
        public get MultiSlot(): ObservableCollection<SlotDetailVM> {
            return this.multiSlot;
        }
        public set MultiSlot(value: ObservableCollection<SlotDetailVM>) {
            if (this.multiSlot != value) {
                this.multiSlot = value;
                // NotifyPropertyChanged("MultiSlot");
            }
        }
        public get PrescriptionItemOID(): number {
            return this.prescriptionItemOID;
        }
        public set PrescriptionItemOID(value: number) {
            this.prescriptionItemOID = value;
        }
        public get SlotDate(): DateTime{
            return this.slotDate;
        }
        public set SlotDate(value: DateTime) {
            this.slotDate = value;
        }
        public get DrugDetail(): DrugItem {
            return this.drugDetail;
        }
        public set DrugDetail(value: DrugItem) {
            this.drugDetail = value;
        }
        public IsNextPRNAllow: boolean;
        public MinimumTime: number;
        public LastRecordedAtForPRN: DateTime;
        public OverDueCount: number;
        public DueCount: number;
        public ParacetamolAdminCount: number;
        public IsParacetamolIngredient: boolean;
        public IsStrikethroughDisable: boolean;
        public IsPICompOrDiscAndScheduleDTTMBeyondPIStopDTTM: boolean;
    }
    export class DrugHeaderVM extends ViewModelBase {
        private _DrugIdentifyingOID: number;
        public get DrugIdentifyingOID(): number {
            return this._DrugIdentifyingOID;
        }
        public set DrugIdentifyingOID(value: number) {
            if (!Helper.ReferenceEquals(this._DrugIdentifyingOID, value)) {
                this._DrugIdentifyingOID = value;
               // // NotifyPropertyChanged("DrugIdentifyingOID");
            }
        }
        private _PrescriptionItemOID: number;
        public get PrescriptionItemOID(): number {
            return this._PrescriptionItemOID;
        }
        public set PrescriptionItemOID(value: number) {
            if (!Helper.ReferenceEquals(this._PrescriptionItemOID, value)) {
                this._PrescriptionItemOID = value;
               // // NotifyPropertyChanged("PrescriptionItemOID");
            }
        }
        private _DrugName: string;
        public get DrugName(): string {
            return this._DrugName;
        }
        public set DrugName(value: string) {
            if (!Helper.ReferenceEquals(this._DrugName, value)) {
                this._DrugName = value;
                //// NotifyPropertyChanged("DrugName");
            }
        }
        private _Dose: string;
        public get Dose(): string {
            return this._Dose;
        }
        public set Dose(value: string) {
            if (!Helper.ReferenceEquals(this._Dose, value)) {
                this._Dose = value;
                //// NotifyPropertyChanged("Dose");
            }
        }
        private _DoseUOM: string;
        public get DoseUOM(): string {
            return this._DoseUOM;
        }
        public set DoseUOM(value: string) {
            if (!Helper.ReferenceEquals(this._DoseUOM, value)) {
                this._DoseUOM = value;
                //// NotifyPropertyChanged("DoseUOM");
            }
        }
        private _DrugFrequency: string;
        public get DrugFrequency(): string {
            return this._DrugFrequency;
        }
        public set DrugFrequency(value: string) {
            if (!Helper.ReferenceEquals(this._DrugFrequency, value)) {
                this._DrugFrequency = value;
                //// NotifyPropertyChanged("DrugFrequency");
            }
        }
        private _DoseType: string;
        public get DoseType(): string {
            return this._DoseType;
        }
        public set DoseType(value: string) {
            if (!Helper.ReferenceEquals(this._DoseType, value)) {
                this._DoseType = value;
                //// NotifyPropertyChanged("DoseType");
            }
        }
        private _Route: string;
        public get Route(): string {
            return this._Route;
        }
        public set Route(value: string) {
            if (!Helper.ReferenceEquals(this._Route, value)) {
                this._Route = value;
                //// NotifyPropertyChanged("Route");
            }
        }
        private _Site: string;
        public get Site(): string {
            return this._Site;
        }
        public set Site(value: string) {
            if (!Helper.ReferenceEquals(this._Site, value)) {
                this._Site = value;
               // // NotifyPropertyChanged("Site");
            }
        }
        private _PrescriptionItemStatus: string;
        public get PrescriptionItemStatus(): string {
            return this._PrescriptionItemStatus;
        }
        public set PrescriptionItemStatus(value: string) {
            if (!Helper.ReferenceEquals(this._PrescriptionItemStatus, value)) {
                this._PrescriptionItemStatus = value;
                //// NotifyPropertyChanged("PrescriptionItemStatus");
            }
        }
        private _PrescriberName: string;
        public get PrescriberName(): string {
            return this._PrescriberName;
        }
        public set PrescriberName(value: string) {
            if (!Helper.ReferenceEquals(this._PrescriberName, value)) {
                this._PrescriberName = value;
                //// NotifyPropertyChanged("PrescriberName");
            }
        }
        private _IsWitnessRequired: boolean;
        public get IsWitnessRequired(): boolean {
            return this._IsWitnessRequired;
        }
        public set IsWitnessRequired(value: boolean) {
            if (!Helper.ReferenceEquals(this._IsWitnessRequired, value)) {
                this._IsWitnessRequired = value;
                //// NotifyPropertyChanged("IsWitnessRequired");
            }
        }
    }
    export class SelfAdminDrugDetailVM extends ViewModelBase {
        //public delegate void IsDataUpdatedDelegate();
        public IsDataUpdatedEvent: Function;
        // public event: EventHandler< SelfAdminCallBackEventArgs > OnSelfAdminCallBack;   
        public OnSelfAdminCallBack: Function;
        objMedicationAdministrationWSSoapClient: MedicationAdministrationWSSoapClient;
        GetSelfAdminDetailsCompleted = new EventEmitter();
        constructor() {
            super();
            this.objMedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
            this.objMedicationAdministrationWSSoapClient.GetSelfAdminDetailsCompleted  = (s,e) => { this.objMedicationAdministrationWSSoapClient_GetSelfAdminDetailsCompleted(s,e); } ;
            this.objMedicationAdministrationWSSoapClient.ManageSelfAdminCompleted  = (s,e) => { this.objMedicationAdministrationWSSoapClient_ManageSelfAdminCompleted(s,e); } ;
        }
        private _SelfAdminDrugDetails: ObservableCollection<SelfAdminDrug>;
        public get SelfAdminDrugDetails(): ObservableCollection<SelfAdminDrug> {
            return this._SelfAdminDrugDetails;
        }
        public set SelfAdminDrugDetails(value: ObservableCollection<SelfAdminDrug>) {
            if (!Helper.ReferenceEquals(this._SelfAdminDrugDetails, value)) {
                this._SelfAdminDrugDetails = value;
                //// NotifyPropertyChanged("SelfAdminDrugDetails");
            }
        }
        public GetSelfAdminDetails(MCVersion: number, MedCharOIDBC: number): void {
            let objCReqMsgGetSelfAdminDetails: CReqMsgGetSelfAdminDetails = new CReqMsgGetSelfAdminDetails();
            objCReqMsgGetSelfAdminDetails.objManageSelfAdminParamsBC = new ManageSelfAdminParams();
            objCReqMsgGetSelfAdminDetails.objManageSelfAdminParamsBC.MedChartOID = MedCharOIDBC;
            objCReqMsgGetSelfAdminDetails.objManageSelfAdminParamsBC.PatientOID = ChartContext.PatientOID;
            objCReqMsgGetSelfAdminDetails.objManageSelfAdminParamsBC.McVersion = MCVersion;
            let PresType: string = PatientContext.PrescriptionType;
            if (String.Compare(PresType, "CC_FRADMINSTN", StringComparison.InvariantCultureIgnoreCase) == 0)
                PresType = "CC_FOR_ADMIN";
            objCReqMsgGetSelfAdminDetails.objManageSelfAdminParamsBC.PrescriptionType = PresType;
            objCReqMsgGetSelfAdminDetails.objManageSelfAdminParamsBC.OperationMode = CConstants.OverdueToNotknownTime.ToString();
            let sImageList: string;
            objCReqMsgGetSelfAdminDetails.objManageSelfAdminParamsBC.SealRecordList = PrescriptionHelper.GetSealDrugs(CConstants.PatConf_Pres, (o) => { sImageList = o; });
            objCReqMsgGetSelfAdminDetails.objManageSelfAdminParamsBC.SealImageList = sImageList;
            let nDrugsExpDuration: number = 0;
            if (MedicationCommonProfileData.MedViewConfig != null)
                nDrugsExpDuration = Convert.ToInt32(PrescriptionHelper.GetDuration(MedicationCommonProfileData.MedViewConfig.DrugsExpiryDuration));
            objCReqMsgGetSelfAdminDetails.objManageSelfAdminParamsBC.ProfileHoldDuration = nDrugsExpDuration;
            objCReqMsgGetSelfAdminDetails.oContextInformation = CommonBB.FillContext();
            this.objMedicationAdministrationWSSoapClient.GetSelfAdminDetailsAsync(objCReqMsgGetSelfAdminDetails);
        }
        objMedicationAdministrationWSSoapClient_GetSelfAdminDetailsCompleted(sender: Object, e: GetSelfAdminDetailsCompletedEventArgs): void {
            let _ErrorID: number = 80000084;
            let _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:MedsadminVM, Method:objMedicationAdministrationWSSoapClient_GetSelfAdminDetailsCompleted()";
            if (e.Error == null) {
                try {
                    let objResponse: CResMsgGetSelfAdminDetails = e.Result;
                    if (objResponse != null && objResponse.objSelfAdminDrugDetails != null && objResponse.objSelfAdminDrugDetails.Count > 0) {
                        this.SelfAdminDrugDetails = objResponse.objSelfAdminDrugDetails;
                        for (let idx: number = 0; idx < objResponse.objSelfAdminDrugDetails.Count; idx++) {
                            this.SelfAdminDrugDetails[idx].ItemSubType = objResponse.objSelfAdminDrugDetails[idx].ItemSubType;
                            this.SelfAdminDrugDetails[idx].MultiComponentItems = objResponse.objSelfAdminDrugDetails[idx].MultiComponentItems;
                            this.SelfAdminDrugDetails[idx].LorenzoID = objResponse.objSelfAdminDrugDetails[idx].oPrescriptionItemView.oPrescriptionItem.LorenzoID;
                            this.SelfAdminDrugDetails[idx].oPrescriptionItemView.oPresItemBasicPropertiesView.Route.Name = MedicationCommonBB.RouteName(objResponse.objSelfAdminDrugDetails[idx].oPrescriptionItemView.oPresItemBasicPropertiesView.Route.Name);
                        }
                    }
                }
               catch(ex:any)  {
                    let lnReturn: number =  AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number =  AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
            if (this.OnSelfAdminCallBack != null)
                this.OnSelfAdminCallBack(this, new SelfAdminCallBackEventArgs(CallBackMethodRefName.GetSelfAdminDetails, e.Error));
                this.GetSelfAdminDetailsCompleted.emit(true);
        }
        public ManageSelfAdminDetails(): void {
            let objCReqMsgManageSelfAdmin: CReqMsgManageSelfAdmin = new CReqMsgManageSelfAdmin();
            objCReqMsgManageSelfAdmin.objSelfAdminDrugDetailsBC = this.FillManageSelfAdministerDetails(this.SelfAdminDrugDetails);
            objCReqMsgManageSelfAdmin.nPatientOIDBC = ChartContext.PatientOID;
            objCReqMsgManageSelfAdmin.oContextInformation = CommonBB.FillContext();
            objCReqMsgManageSelfAdmin.oContextInformation.PageInfo = PatientContext.EncounterOid.ToString();
            this.objMedicationAdministrationWSSoapClient.ManageSelfAdminAsync(objCReqMsgManageSelfAdmin);
        }
        objMedicationAdministrationWSSoapClient_ManageSelfAdminCompleted(sender: Object, e: ManageSelfAdminCompletedEventArgs): void {
            if (this.OnSelfAdminCallBack != null)
                this.OnSelfAdminCallBack(this, new SelfAdminCallBackEventArgs(CallBackMethodRefName.ManageSelfAdmin, e.Error));
            if (this.IsDataUpdatedEvent != null)
                this.IsDataUpdatedEvent();
        }
        private FillManageSelfAdministerDetails(oRequestObject: ObservableCollection<SelfAdminDrug>): ObservableCollection<SelfAdminDrug> {
            let oSelfAdminDrugDetails: ObservableCollection<SelfAdminDrug> = null;
            if (oRequestObject != null) {
                oSelfAdminDrugDetails = new ObservableCollection<SelfAdminDrug>();
                oRequestObject.forEach( (oSelfAdminDrug)=> {
                    let objSelfAdminDrug: SelfAdminDrug = new SelfAdminDrug();
                    objSelfAdminDrug.PrescriptionItemOID = oSelfAdminDrug.PrescriptionItemOID;
                    objSelfAdminDrug.DuenessThresholdTime = Convert.ToInt64(MedChartData.DuenessThreshold);
                    objSelfAdminDrug.IsSelfAdministered = oSelfAdminDrug.IsSelfAdministered;
                    objSelfAdminDrug.OverdueToNotknownTime = CConstants.OverdueToNotknownTime;
                    objSelfAdminDrug.SelfAdminComments = oSelfAdminDrug.SelfAdminComments;
                    oSelfAdminDrugDetails.Add(objSelfAdminDrug);
                });
            }
            return oSelfAdminDrugDetails;
        }
    }
    @Injectable({
        providedIn:"root"
    })
    export class OmitSlotsVM extends ViewModelBase {
        private _LastOmittedSlotDTTM: DateTime;
        public oAdminTimesVM: AdminstrativeTimesVM;
        private _TreeVwCol: iTreeViewCollection;
        public get TreeVwCol(): iTreeViewCollection {
            return this._TreeVwCol;
        }
        public set TreeVwCol(value: iTreeViewCollection) {
            if (!Helper.ReferenceEquals(this._TreeVwCol, value)) {
                this._TreeVwCol = value;
                // NotifyPropertyChanged("TreeVwCol");
            }
        }
        public get LastOmittedSlotDTTM(): DateTime{
            return this._LastOmittedSlotDTTM;
        }
        public set LastOmittedSlotDTTM(value: DateTime) {
            this._LastOmittedSlotDTTM = value;
        }
	//revisityasik
        private _DurationValue: number = 0;
        public get DurationValue(): number {
            return this._DurationValue;
        }
        public set DurationValue(value: number) {
            if (value != this._DurationValue) {
                this._DurationValue = value;
                // NotifyPropertyChanged("DurationValue");
                this.CalculateDateTime();
            }
        }
        private _ReviewAfterValue: number;
        public get ReviewAfterValue(): number {
            return this._ReviewAfterValue;
        }
        public set ReviewAfterValue(value: number) {
            if (value != this._ReviewAfterValue) {
                this._ReviewAfterValue = value;
                // NotifyPropertyChanged("ReviewAfterValue");
                this.CalculateDateTime();
            }
        }
        private _ReviewDTTM: DateTime;
        public get ReviewDTTM(): DateTime{
            return this._ReviewDTTM;
        }
        public set ReviewDTTM(value: DateTime) {
            if (!Helper.ReferenceEquals(this._ReviewDTTM, value)) {
                this._ReviewDTTM = value;
                // NotifyPropertyChanged("ReviewPeriod");
            }
        }
        //revisitmeyasik
        private _EndDateTime: DateTime = DateTime.MinValue;
        public get EndDateTime(): DateTime{
            return this._EndDateTime;
        }
        public set EndDateTime(value: DateTime) {
            if (!Helper.ReferenceEquals(this._EndDateTime, value)) {
                this._EndDateTime = value;
                // NotifyPropertyChanged("EndDateTime");
            }
        }
        private _DurationUOM: ObservableCollection<CListItem>;
        public get DurationUOM(): ObservableCollection<CListItem> {
            return this._DurationUOM;
        }
        public set DurationUOM(value: ObservableCollection<CListItem>) {
            if (!Helper.ReferenceEquals(this._DurationUOM, value)) {
                this._DurationUOM = value;
                // NotifyPropertyChanged("DurationUOM");
            }
        }
        private _iReviewAfterUOM: ObservableCollection<CListItem>;
        public get IReviewAfterUOM(): ObservableCollection<CListItem> {
            return this._iReviewAfterUOM;
        }
        public set IReviewAfterUOM(value: ObservableCollection<CListItem>) {
            if (!Helper.ReferenceEquals(this._iReviewAfterUOM, value)) {
                this._iReviewAfterUOM = value;
                // NotifyPropertyChanged("IReviewAfterUOM");
            }
        }
	//revisityasik
        private _EndDate: DateTime = DateTime.MinValue;
        public get EndDate(): DateTime{
            return this._EndDate;
        }
        public set EndDate(value: DateTime) {
            if (!Helper.ReferenceEquals(this._EndDate, value)) {
                this._EndDate = value;
                // NotifyPropertyChanged("EndDate");
            }
        }
        private _FromDate: DateTime;
        public get FromDate(): DateTime{
            return this._FromDate;
        }
        public set FromDate(value: DateTime) {
            if (!Helper.ReferenceEquals(this._FromDate, value)) {
                this._FromDate = value;
                // NotifyPropertyChanged("FromDate");
            }
        }
        private _OmitFromDate: DateTime;
        public get OmitFromDate(): DateTime{
            return this._OmitFromDate;
        }
        public set OmitFromDate(value: DateTime) {
            if (!Helper.ReferenceEquals(this._OmitFromDate, value)) {
                this._OmitFromDate = value;
                // NotifyPropertyChanged("OmitFromDate");
                this.CalculateDateTime();
            }
        }
        private _OmitReason: string;
        public get OmitReason(): string {
            return this._OmitReason;
        }
        public set OmitReason(value: string) {
            if (!Helper.ReferenceEquals(this._OmitReason, value)) {
                this._OmitReason = value;
                // NotifyPropertyChanged("OmitReason");
            }
        }
        private _OmittedBy: string;
        public get OmittedBy(): string {
            return this._OmittedBy;
        }
        public set OmittedBy(value: string) {
            if (!Helper.ReferenceEquals(this._OmittedBy, value)) {
                this._OmittedBy = value;
                // NotifyPropertyChanged("OmittedBy");
            }
        }
        private _ReviewComments: string;
        public get ReviewComments(): string {
            return this._ReviewComments;
        }
        public set ReviewComments(value: string) {
            if (!Helper.ReferenceEquals(this._ReviewComments, value)) {
                this._ReviewComments = value;
                // NotifyPropertyChanged("ReviewComments");
            }
        }
        private _Until: boolean;
        public get Until(): boolean {
            return this._Until;
        }
        public set Until(value: boolean) {
            this._Until = value;
            // NotifyPropertyChanged("Until");
        }
        private _Indefinite: boolean;
        public get Indefinite(): boolean {
            return this._Indefinite;
        }
        public set Indefinite(value: boolean) {
            this._Indefinite = value;
            // NotifyPropertyChanged("Indefinite");
        }
	//revisityasik
        private _DurationUOMValue: CListItem = null;
        public get DurationUOMValue(): CListItem {
            return this._DurationUOMValue;
        }
        public set DurationUOMValue(value: CListItem) {
            if (value != this._DurationUOMValue) {
                this._DurationUOMValue = value;
                // NotifyPropertyChanged("DurationUOMValue");
                this.CalculateDateTime();
            }
        }
        private _ReviewAfterUOMValue: CListItem;
        public get ReviewAfterUOMValue(): CListItem {
            return this._ReviewAfterUOMValue;
        }
        public set ReviewAfterUOMValue(value: CListItem) {
            if (value != this._ReviewAfterUOMValue) {
                this._ReviewAfterUOMValue = value;
                // NotifyPropertyChanged("ReviewAfterUOMValue");
                this.CalculateDateTime();
            }
        }
        private _freqCode: string;
        public get freqCode(): string {
            return this._freqCode;
        }
        public set freqCode(value: string) {
            this._freqCode = value;
            // NotifyPropertyChanged("freqCode");
        }
        private _lblReviewAfterUOM_Text: string;
        public get lblReviewAfterUOM_Text(): string {
            return this._lblReviewAfterUOM_Text;
        }
        public set lblReviewAfterUOM_Text(value: string) {
            this._lblReviewAfterUOM_Text = value;
            // NotifyPropertyChanged("lblReviewAfterUOM_Text");
        }
        private _OmittedSlots: OmitSlotsParams;
        public get OmittedSlots(): OmitSlotsParams {
            return this._OmittedSlots;
        }
        public set OmittedSlots(value: OmitSlotsParams) {
            this._OmittedSlots = value;
            // NotifyPropertyChanged("OmittedSlots");
        }
        private _UpdatedSlotsData: ObservableCollection<SlotData>;
        public get UpdatedSlotsData(): ObservableCollection<SlotData> {
            return this._UpdatedSlotsData;
        }
        public set UpdatedSlotsData(value: ObservableCollection<SlotData>) {
            this._UpdatedSlotsData = value;
            // NotifyPropertyChanged("UpdatedSlotsData");
        }
        private _isEnableSelectedSlot: boolean = true;
        public get IsEnableSelectedSlot(): boolean {
            return this._isEnableSelectedSlot;
        }
        public set IsEnableSelectedSlot(value: boolean) {
            this._isEnableSelectedSlot = value;
            // NotifyPropertyChanged("IsEnableSelectedSlot");
        }
        private _isEnableUntil: boolean = true;
        public get IsEnableUntil(): boolean {
            return this._isEnableUntil;
        }
        public set IsEnableUntil(value: boolean) {
            this._isEnableUntil = value;
            // NotifyPropertyChanged("IsEnableUntil");
        }
        private _isEnableIndefinite: boolean = true;
        public get IsEnableIndefinite(): boolean {
            return this._isEnableIndefinite;
        }
        public set IsEnableIndefinite(value: boolean) {
            this._isEnableIndefinite = value;
            // NotifyPropertyChanged("IsEnableIndefinite");
        }
        private _isOmitSuccess: boolean;
        public get IsOmitSuccess(): boolean {
            return this._isOmitSuccess;
        }
        public set IsOmitSuccess(value: boolean) {
            this._isOmitSuccess = value;
            // NotifyPropertyChanged("IsOmitSuccess");
        }
        private _isPastSlotSelected: boolean;
        public get IsPastSlotSelected(): boolean {
            return this._isPastSlotSelected;
        }
        public set IsPastSlotSelected(value: boolean) {
            this._isPastSlotSelected = value;
            // NotifyPropertyChanged("IsPastSlotSelected");
        }
        private _PrescriptionItemEndDate: DateTime;
        public get PrescriptionItemEndDate(): DateTime{
            return this._PrescriptionItemEndDate;
        }
        public set PrescriptionItemEndDate(value: DateTime) {
            this._PrescriptionItemEndDate = value;
            // NotifyPropertyChanged("PrescriptionItemEndDate");
        }
        private _PrescriptionItemStartDate: DateTime;
        public get PrescriptionItemStartDate(): DateTime{
            return this._PrescriptionItemStartDate;
        }
        public set PrescriptionItemStartDate(value: DateTime) {
            this._PrescriptionItemStartDate = value;
            // NotifyPropertyChanged("PrescriptionItemStartDate");
        }
	//revisityasik
        private _EndDateValue: DateTime = DateTime.MinValue;
        public get EndDateValue(): DateTime{
            return this._EndDateValue;
        }
        public set EndDateValue(value: DateTime) {
            this._EndDateValue = value;
            // NotifyPropertyChanged("EndDateValue");
        }
        private _OmittedFromDateTime: DateTime;
        public get OmittedFromDateTime(): DateTime{
            return this._OmittedFromDateTime;
        }
        public set OmittedFromDateTime(value: DateTime) {
            this._OmittedFromDateTime = value;
            // NotifyPropertyChanged("PrescriptionItemStartDate");
            this.CalculateDateTime();
        }
        private _parentDTTM: DateTime;
        public get ParentDTTM(): DateTime{
            return this._parentDTTM;
        }
        public set ParentDTTM(value: DateTime) {
            this._parentDTTM = value;
            // NotifyPropertyChanged("ParentDTTM");
        }
        private _UOM: string;
        public get UOM(): string {
            return this._UOM;
        }
        public set UOM(value: string) {
            this._UOM = value;
            // NotifyPropertyChanged("UOM");
        }
        public IsBolus: boolean;
        public IsInfusion: boolean;
        public InfusionTypeCode: string;
        //public delegate void IsSlotUpdatedDelegate();
        public IsSlotUpdatedEvent: Function;
        public IsLastSlotCheckRequired: boolean = false;
        public IsUpdatePIStatusToCompleted: boolean = false;
        public FreqPerodCode: string;
        public IsReloadChartRequired: boolean = false;
        public PrescriptionItemStatus: string;
        public CurrentPrescriptionItemStatus: string;
        public CACode: string;
        public IslastSlotincurrentview: boolean = false;
        public MedicationSelected: boolean = false;
        private static CONTS_DURATIONUOM_HOURS: string = "HOURS";
        private static CONTS_DURATIONUOM_DAY: string = "DAY";
        private static CONTS_CC_MEDDRSN1: string = "CC_MEDDRSN1";
        public oFrequencyDetails: IPPFrequency;
        public scheduletimes: ObservableCollection<IPPScheduledetails>;
        CurrentDateTime: DateTime= CommonBB.GetServerDateTime();
        public NoOfPhysicalDays: number = 0;
        public DoseType: string = String.Empty;
        private _scheduleDTTM: DateTime;
        public _DoseTypeCode: string;
        public get ScheduleDTTM(): DateTime{
            return this._scheduleDTTM;
        }
        public set ScheduleDTTM(value: DateTime) {
            this._scheduleDTTM = value;
            // NotifyPropertyChanged("ScheduleDTTM");
        }
        public OmitSlots(oOmitSlotsParams: OmitSlotsParams): void {
            let ResultDays: number = 0;
            let objMedicationAdministrationWSSoapClient: MedicationAdministrationWSSoapClient;
            objMedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
            objMedicationAdministrationWSSoapClient.OmitSlotsCompleted  = (s,e) => { this.objMedicationAdministrationWSSoapClient_OmitSlotsCompleted(s,e); } ;
            let oCReqMsgOmitSlots: CReqMsgOmitSlots = new CReqMsgOmitSlots();
            // ObjectHelper.stopFinishAndCancelEvent(true);
            oCReqMsgOmitSlots.oOmitSlotsParamsBC = new OmitSlotsParams();
            oCReqMsgOmitSlots.oContextInformation = CommonBB.FillContext();
            oCReqMsgOmitSlots.oContextInformation.PageInfo = PatientContext.EncounterOid.ToString();
            oCReqMsgOmitSlots.oOmitSlotsParamsBC.PatientOID = ChartContext.PatientOID;
            oCReqMsgOmitSlots.oOmitSlotsParamsBC.PrescriptionItemOID = oOmitSlotsParams.PrescriptionItemOID;
            oCReqMsgOmitSlots.oOmitSlotsParamsBC.OSlotData = oOmitSlotsParams.OSlotData;
            oCReqMsgOmitSlots.oOmitSlotsParamsBC.Reason = this.OmitReason;
            if (this.Until) {
                oCReqMsgOmitSlots.oOmitSlotsParamsBC.FromDTTM = this.FromDate;
                oCReqMsgOmitSlots.oOmitSlotsParamsBC.ToDTTM = this.EndDate;
                oCReqMsgOmitSlots.oOmitSlotsParamsBC.OmitIndefinite = this.Indefinite;
                this.IsUpdatePIStatusToCompleted = true;
                this.IsLastSlotCheckRequired = true;
            }
            else if (this.Indefinite) {
                oCReqMsgOmitSlots.oOmitSlotsParamsBC.FromDTTM = this.FromDate;
                oCReqMsgOmitSlots.oOmitSlotsParamsBC.OmitReviewFromDTTM = this.FromDate;
                oCReqMsgOmitSlots.oOmitSlotsParamsBC.OmitIndefinite = this.Indefinite;
                oCReqMsgOmitSlots.oOmitSlotsParamsBC.ManageReviewPeriod = new ManageReviewPeriod();
                oCReqMsgOmitSlots.oOmitSlotsParamsBC.ManageReviewPeriod.oReviewAfterDetail = new ReviewAfterDetail();
                oCReqMsgOmitSlots.oOmitSlotsParamsBC.ManageReviewPeriod.NewReviewRequestComments = this.ReviewComments;
                oCReqMsgOmitSlots.oOmitSlotsParamsBC.ManageReviewPeriod.NewReviewAfter = this.ReviewAfterValue.ToString();
                oCReqMsgOmitSlots.oOmitSlotsParamsBC.ManageReviewPeriod.NewReviewAfterDTTM = this.ReviewDTTM;
                oCReqMsgOmitSlots.oOmitSlotsParamsBC.ManageReviewPeriod.PrescriptionItemOID = oOmitSlotsParams.PrescriptionItemOID;
                oCReqMsgOmitSlots.oOmitSlotsParamsBC.ManageReviewPeriod.NewReviewAfterUOM = new ObjectInfo();
                oCReqMsgOmitSlots.oOmitSlotsParamsBC.ManageReviewPeriod.NewReviewAfterUOM.Name = this.ReviewAfterUOMValue.DisplayText;
                oCReqMsgOmitSlots.oOmitSlotsParamsBC.ManageReviewPeriod.NewReviewAfterUOM.Code = this.ReviewAfterUOMValue.Value;
                oCReqMsgOmitSlots.oOmitSlotsParamsBC.ManageReviewPeriod.NewReviewType = new ObjectInfo();
                oCReqMsgOmitSlots.oOmitSlotsParamsBC.ManageReviewPeriod.NewReviewType.Code = CConstants.OmitDosReview;
                oCReqMsgOmitSlots.oOmitSlotsParamsBC.ManageReviewPeriod.oReviewAfterDetail.ReviewOutcome = new IPPManagePrescSer.ObjectInfo();
                oCReqMsgOmitSlots.oOmitSlotsParamsBC.ManageReviewPeriod.oReviewAfterDetail.ReviewOutcome.Code = CConstants.ReviweOutcomeSchldFurtherRW;
                oCReqMsgOmitSlots.oOmitSlotsParamsBC.ManageReviewPeriod.oReviewAfterDetail.PrescriptionItemOID = oOmitSlotsParams.PrescriptionItemOID;
                oCReqMsgOmitSlots.oOmitSlotsParamsBC.ManageReviewPeriod.oReviewAfterDetail.ReviewRequestedBy = ChartContext.CurrentUserName;
                if (ChartContext.EncounterOID > 0) {
                    oCReqMsgOmitSlots.oOmitSlotsParamsBC.ManageReviewPeriod.EncounterOID = ChartContext.EncounterOID;
                }
                oCReqMsgOmitSlots.oOmitSlotsParamsBC.OperationMode = CConstants.Initiate;
                if (!String.IsNullOrEmpty(this.DoseType) && String.Equals(this.DoseType, DoseTypeCode.STEPPEDVARIABLE, StringComparison.InvariantCultureIgnoreCase)) {
                    ResultDays = 28;
                }
                else {
                    ResultDays = this.CalculateDays();
                }
                this.NoOfPhysicalDays = ResultDays;
                oCReqMsgOmitSlots.oOmitSlotsParamsBC.ToDTTM = (DateTime.NotEquals(this.PrescriptionItemEndDate , DateTime.MinValue) && DateTime.GreaterThan(this.FromDate.AddDays(ResultDays) , this.PrescriptionItemEndDate)) ? this.PrescriptionItemEndDate : this.FromDate.AddDays(ResultDays);
                this.IsUpdatePIStatusToCompleted = true;
                this.IsLastSlotCheckRequired = true;
            }
            else {
                oCReqMsgOmitSlots.oOmitSlotsParamsBC.FromDTTM = oOmitSlotsParams.FromDTTM;
                oCReqMsgOmitSlots.oOmitSlotsParamsBC.ToDTTM = this.EndDate;
                oCReqMsgOmitSlots.oOmitSlotsParamsBC.OmitIndefinite = this.Indefinite;
            }
            oCReqMsgOmitSlots.oOmitSlotsParamsBC.DurationUOM = this.UOM;
            oCReqMsgOmitSlots.oOmitSlotsParamsBC.IsLastSlotCheckRequired = this.IsLastSlotCheckRequired;
            oCReqMsgOmitSlots.oOmitSlotsParamsBC.IsUpdatePIStatusToCompleted = this.IsUpdatePIStatusToCompleted;
            oCReqMsgOmitSlots.oOmitSlotsParamsBC.PresItemENDTTM = this.PrescriptionItemEndDate;
            oCReqMsgOmitSlots.oOmitSlotsParamsBC.ScheduledDTTM = this.ScheduleDTTM;
            if (!String.IsNullOrEmpty(this.FreqPerodCode) && String.Equals(this.FreqPerodCode, CConstants.OnceOnlyPerodCode, StringComparison.CurrentCultureIgnoreCase) && !String.IsNullOrEmpty(this._DoseTypeCode) && !String.Equals(this._DoseTypeCode, DoseTypeCode.STEPPED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(this._DoseTypeCode, DoseTypeCode.STEPPEDVARIABLE) && !String.Equals(this._DoseTypeCode, DoseTypeCode.VARIABLE, StringComparison.InvariantCultureIgnoreCase)) {
                oCReqMsgOmitSlots.oOmitSlotsParamsBC.IsOnceOnlyFrequency = true;
            }
            if (MedChartData.MedChartOID > 0)
                oCReqMsgOmitSlots.oOmitSlotsParamsBC.MedChartOID = MedChartData.MedChartOID;
            if (DateTime.NotEquals(MedChartData.LastUpdateDTTM , DateTime.MinValue))
                oCReqMsgOmitSlots.oOmitSlotsParamsBC.LastModifiedAt = MedChartData.LastUpdateDTTM;
            objMedicationAdministrationWSSoapClient.OmitSlotsAsync(oCReqMsgOmitSlots);
        }
        public CalculateDays(): number {
            let days: number = 0;
            let mulFactor: number = 1,
                minInDay = 24 * 60, minInWeek = 7 * 24 * 60,
                minInMonth = 28 * 24 * 60, minInYear = 365 * 24 * 60;
            if (this.oAdminTimesVM != null && this.oAdminTimesVM.FreqDetails != null && this.oAdminTimesVM.FreqDetails.oFrequency != null) {
                switch (this.freqCode) {
                    case "CC_MINUTES":
                        mulFactor = 1;
                        days = 3;
                        break;
                    case "CC_HOURS":
                        mulFactor = 60;
                        days = 3;
                        break;
                    case "CC_MEDDRSN1":
                        mulFactor = minInDay;
                        days = 3;
                        break;
                    case "CC_MEDDRSN2":
                        mulFactor = minInWeek;
                        days = 7 * 3;
                        break;
                    case "CC_MEDRSN3":
                        mulFactor = minInMonth;
                        days = 28 * 3;
                        break;
                    case "CC_MEDRSN4":
                        mulFactor = minInYear;
                        days = 365 * 3;
                        break;
                }
                if (this.oAdminTimesVM.FreqDetails.oFrequency.LowPeriod > 0) {
                    let nCalMins: number;
                    nCalMins = mulFactor * ((this.oAdminTimesVM.FreqDetails.oFrequency.HighPeriod > 0) ? this.oAdminTimesVM.FreqDetails.oFrequency.HighPeriod : this.oAdminTimesVM.FreqDetails.oFrequency.LowPeriod);
                    if (nCalMins > minInDay) {
                        days = (nCalMins * 3) / minInDay;
                    }
                }
            }
            return days;
        }
        public CalculateDateTime(): void {
            let Time: number = 0;
            let ReviewAfterUOM: string = String.Empty;
            let ReviewAfterInNum: number = 0;
            if (this.Indefinite) {
                if (this.ReviewAfterUOMValue != null && this.ReviewAfterValue > 0) {
                    ReviewAfterUOM = this.ReviewAfterUOMValue.DisplayText;
                    ReviewAfterInNum = this.ReviewAfterValue;
                    Time = this.ConvertDurationToMinutes(ReviewAfterUOM, ReviewAfterInNum);
                    this.ReviewDTTM = this.ParentDTTM.AddMinutes(Time);
                    this.lblReviewAfterUOM_Text = this.ReviewDTTM.ToString(CConstants.DateTimeFormat);
                }
            }
            else if (this.Until) {
                if (this.DurationValue > 0 && this.DurationUOMValue != null) {
                    if ((String.Equals(this.DurationUOMValue.Value, OmitSlotsVM.CONTS_CC_MEDDRSN1, StringComparison.InvariantCultureIgnoreCase))) {
                        this.EndDateTime = this.EndDateValue = this.OmitFromDate.DateTime.AddTime(this.OmittedFromDateTime.Value).AddDays(Convert.ToDouble(this.DurationValue));
                        this.UOM = OmitSlotsVM.CONTS_DURATIONUOM_DAY;
                    }
                    else {
                        this.EndDateTime = this.EndDateValue = this.OmitFromDate.DateTime.AddTime(this.OmittedFromDateTime.Value).AddHours(Convert.ToDouble(this.DurationValue));
                        this.UOM = OmitSlotsVM.CONTS_DURATIONUOM_HOURS;
                    }
                }
            }
        }
        objMedicationAdministrationWSSoapClient_OmitSlotsCompleted(sender: Object, e: OmitSlotsCompletedEventArgs): void {
            let sLockingMessage: string = String.Empty;
            let _ErrorID: number = 80000083;
            // ObjectHelper.stopFinishAndCancelEvent(false);
            let _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:MedsadminVM, Method:objMedicationAdministrationWSSoapClient_OmitSlotsCompleted()";
            if (e.Error == null) {
                try {
                    let oCResMsgOmitSlots: CResMsgOmitSlots = e.Result;
                    if (oCResMsgOmitSlots != null && oCResMsgOmitSlots.oContextInformation != null && oCResMsgOmitSlots.oContextInformation.Errors.Count <= 0) {
                        if (DateTime.NotEquals(oCResMsgOmitSlots.dLastUpdateDTTM , DateTime.MinValue))
                            MedChartData.LastUpdateDTTM = oCResMsgOmitSlots.dLastUpdateDTTM;
                        if (!String.IsNullOrEmpty(oCResMsgOmitSlots.sLastUpdateBy)) {
                            ChartContext.CurrentUserName = oCResMsgOmitSlots.sLastUpdateBy;
                        }
                        this.LastOmittedSlotDTTM = oCResMsgOmitSlots.LastOmittedSlotDTTM;
                        if (oCResMsgOmitSlots.oUpdatedSlotsData != null && oCResMsgOmitSlots.oUpdatedSlotsData.Count > 0) {
                            this.IsOmitSuccess = true;
                            this.UpdatedSlotsData = oCResMsgOmitSlots.oUpdatedSlotsData;
                        }
                        else {
                            this.IsOmitSuccess = false;
                        }
                        this.IsReloadChartRequired = oCResMsgOmitSlots.IsPresItemStatusUpdated;
                        this.CurrentPrescriptionItemStatus = this.IsReloadChartRequired ? CConstants.COMPLETED : String.Empty;
                        if (this.IsSlotUpdatedEvent != null)
                            this.IsSlotUpdatedEvent();
                    }
                    else if (oCResMsgOmitSlots != null && oCResMsgOmitSlots.oContextInformation != null && oCResMsgOmitSlots.oContextInformation.Errors.Count > 0 && oCResMsgOmitSlots.lErrorCode == 900025 && !String.IsNullOrEmpty(oCResMsgOmitSlots.sLastUpdateBy)) {
                        let msg: iMessageBox = new iMessageBox();
                        sLockingMessage = String.Format(Resource.MedsAdminPrescChartView.LockMsg_ORSPresChart, oCResMsgOmitSlots.sLastUpdateBy);
                        msg = new iMessageBox();
                        msg.Title = "Lorenzo";
                        msg.MessageButton = MessageBoxButton.OK;
                        msg.Message = sLockingMessage;
                        msg.MessageBoxClose  = (s,e) => { this.oMsgBox_OmitErrorMessageClose(s,e); } ;
                        msg.Show();
                    }
                }
               catch(ex:any)  {
                    let lnReturn: number =  AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number =  AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
        }
        oMsgBox_OmitErrorMessageClose(sender: Object, e: MessageEventArgs): void {
            if (this.IsSlotUpdatedEvent != null) {
                this.IsSlotUpdatedEvent();
            }
        }
        public ConvertDurationToMinutes(DurationUOM: string, Duration: number): number {
            let _TmpDuration: number = 0;
            switch (DurationUOM) {
                case UOMType.Hours:
                    _TmpDuration = TimeSpan.FromHours(Duration).TotalMinutes;
                    break;
                case UOMType.Days:
                    _TmpDuration = TimeSpan.FromDays(Duration).TotalMinutes;
                    break;
                case UOMType.Weeks:
                    _TmpDuration = TimeSpan.FromDays(Duration * 7).TotalMinutes;
                    break;
                case UOMType.Doses:
                    if (this.oAdminTimesVM != null && this.oAdminTimesVM.FreqDetails != null) {
                        if (this.scheduletimes != null && this.scheduletimes.Count > 0) {
                            this.oAdminTimesVM.FreqDetails.oFixedTimes = this.scheduletimes;
                        }
                        if (this.oFrequencyDetails != null) {
                            this.oAdminTimesVM.FreqDetails.oFrequency.IsSunday = this.oFrequencyDetails.IsSunday;
                            this.oAdminTimesVM.FreqDetails.oFrequency.IsMonday = this.oFrequencyDetails.IsMonday;
                            this.oAdminTimesVM.FreqDetails.oFrequency.IsTuesday = this.oFrequencyDetails.IsTuesday;
                            this.oAdminTimesVM.FreqDetails.oFrequency.IsWednesday = this.oFrequencyDetails.IsWednesday;
                            this.oAdminTimesVM.FreqDetails.oFrequency.IsThursday = this.oFrequencyDetails.IsThursday;
                            this.oAdminTimesVM.FreqDetails.oFrequency.IsFriday = this.oFrequencyDetails.IsFriday;
                            this.oAdminTimesVM.FreqDetails.oFrequency.IsSaturday = this.oFrequencyDetails.IsSaturday;
                        }
                    }
                    let listOfDTTM: List<DateTime> = MedicationCommonBB.GetScheduleDatesForDoseDuration(this.PrescriptionItemStartDate, this.ParentDTTM, this.ReviewAfterValue, this.oAdminTimesVM.FreqDetails);
                    if (listOfDTTM != null && listOfDTTM.Count > 0) {
                        _TmpDuration = ((listOfDTTM.Max().Subtract(this.ParentDTTM).Days * 1440) ) + ((listOfDTTM.Max().Subtract(this.ParentDTTM).Hours * 60)) + ((listOfDTTM.Max().Subtract(this.ParentDTTM).Minutes));
                    }
                    break;
            }
            return _TmpDuration;
        }
        private _IsPRN: boolean;
        public get IsPRN(): boolean {
            return this._IsPRN;
        }
        public set IsPRN(value: boolean) {
            this._IsPRN = value;
        }
    }
    export class ReinstateVM extends ViewModelBase {
        public oChartRow: ChartRow;
        public objScheduletimes: ObservableCollection<IPPScheduledetails>;
        public objFrequencyDetails: IPPFrequency;
        private _LastOmittedSlotDTTM: DateTime;
        private _TreeVwCol: iTreeViewCollection;
        public get TreeVwCol(): iTreeViewCollection {
            return this._TreeVwCol;
        }
        public set TreeVwCol(value: iTreeViewCollection) {
            if (!Helper.ReferenceEquals(this._TreeVwCol, value)) {
                this._TreeVwCol = value;
                // NotifyPropertyChanged("TreeVwCol");
            }
        }
        public get LastOmittedSlotDTTM(): DateTime{
            return this._LastOmittedSlotDTTM;
        }
        public set LastOmittedSlotDTTM(value: DateTime) {
            this._LastOmittedSlotDTTM = value;
        }
        private _ReinstateReason: string = String.Empty;
        public get ReinstateReason(): string {
            return this._ReinstateReason;
        }
        public set ReinstateReason(value: string) {
            this._ReinstateReason = value;
            // NotifyPropertyChanged("ReinstateReason");
        }
        private _ReinstateSlotData: ObservableCollection<SlotData>;
        public get ReinstateSlotData(): ObservableCollection<SlotData> {
            return this._ReinstateSlotData;
        }
        public set ReinstateSlotData(value: ObservableCollection<SlotData>) {
            this._ReinstateSlotData = value;
            // NotifyPropertyChanged("ReinstateSlotData");
        }
        private _isReinstateSuccess: boolean;
        public get IsReinstateSuccess(): boolean {
            return this._isReinstateSuccess;
        }
        public set IsReinstateSuccess(value: boolean) {
            this._isReinstateSuccess = value;
            // NotifyPropertyChanged("IsReinstateSuccess");
        }
        private _UpdatedSlotsData: ObservableCollection<SlotData>;
        public get UpdatedSlotsData(): ObservableCollection<SlotData> {
            return this._UpdatedSlotsData;
        }
        public set UpdatedSlotsData(value: ObservableCollection<SlotData>) {
            this._UpdatedSlotsData = value;
            // NotifyPropertyChanged("UpdatedSlotsData");
        }
        private _MedAdminOID: ArrayOfLong;
        public get MedAdminOID(): ArrayOfLong {
            return this._MedAdminOID;
        }
        public set MedAdminOID(value: ArrayOfLong) {
            this._MedAdminOID = value;
            // NotifyPropertyChanged("MedAdminOID");
        }
        public IsBolus: boolean;
        public IsInfusion: boolean;
        //public delegate void IsSlotUpdatedDelegate();
        public IsSlotUpdatedEvent: Function;
        public IsLastSlotCheckRequired: boolean = false;
        public IsUpdatePIStatusToCompleted: boolean = false;
        public FreqPerodCode: string;
        public IsReloadChartRequired: boolean = false;
        public PrescriptionItemStatus: string;
        public CACode: string;
        public IsLastSlotinCurrentView: boolean = false;
        private _scheduleDTTM: DateTime;
        public _DoseTypeCode: string;
        public oManageReviewPeriod: ManageReviewPeriod;
        public MedicationSelected: boolean = false;
        private _isPastSlotSelected: boolean;
        public get IsPastSlotSelected(): boolean {
            return this._isPastSlotSelected;
        }
        public set IsPastSlotSelected(value: boolean) {
            this._isPastSlotSelected = value;
            // NotifyPropertyChanged("IsPastSlotSelected");
        }
        public get ScheduleDTTM(): DateTime{
            return this._scheduleDTTM;
        }
        public set ScheduleDTTM(value: DateTime) {
            this._scheduleDTTM = value;
            // NotifyPropertyChanged("ScheduleDTTM");
        }
        private _PrescriptionItemEndDate: DateTime;
        public get PrescriptionItemEndDate(): DateTime{
            return this._PrescriptionItemEndDate;
        }
        public set PrescriptionItemEndDate(value: DateTime) {
            this._PrescriptionItemEndDate = value;
            // NotifyPropertyChanged("PrescriptionItemEndDate");
        }
        private _PrescriptionItemOID: number;
        public get PrescriptionItemOID(): number {
            return this._PrescriptionItemOID;
        }
        public set PrescriptionItemOID(value: number) {
            if (this._PrescriptionItemOID != value) {
                this._PrescriptionItemOID = value;
                // NotifyPropertyChanged("PrescriptionItemOID");
            }
        }
        private _isReinstateAllEnable: boolean;
        public get IsReinstateAllEnable(): boolean {
            return this._isReinstateAllEnable;
        }
        public set IsReinstateAllEnable(value: boolean) {
            if (this._isReinstateAllEnable != value)
                this._isReinstateAllEnable = value;
            // NotifyPropertyChanged("IsReinstateAllEnable");
        }
        private _isIndefiniteOmit: boolean;
        public get IsIndefiniteOmit(): boolean {
            return this._isIndefiniteOmit;
        }
        public set IsIndefiniteOmit(value: boolean) {
            if (this._isIndefiniteOmit != value)
                this._isIndefiniteOmit = value;
            // NotifyPropertyChanged("IsIndefiniteOmit");
        }
        private _isMedicationselected: boolean;
        public get IsMedicationSelected(): boolean {
            return this._isMedicationselected;
        }
        public set IsMedicationSelected(value: boolean) {
            if (this._isMedicationselected != value)
                this._isMedicationselected = value;
            // NotifyPropertyChanged("IsMedicationSelected");
        }
        private _ischkReinstateAll: boolean;
        public get IsChkReinstateAll(): boolean {
            return this._ischkReinstateAll;
        }
        public set IsChkReinstateAll(value: boolean) {
            if (this._ischkReinstateAll != value)
                this._ischkReinstateAll = value;
            // NotifyPropertyChanged("IsChkReinstateAll");
        }
        public GetReinstateAllDetails(oReinstateVM: ReinstateVM): void {
            let SelectedSlotsMinDate: DateTime= DateTime.MinValue;
            if (oReinstateVM.ReinstateSlotData != null && oReinstateVM.ReinstateSlotData.Count > 0) {
                SelectedSlotsMinDate = oReinstateVM.ReinstateSlotData.OrderBy(x => x.ScheduleDTTM).Select(x => x.ScheduleDTTM).FirstOrDefault();
            }
            if (oReinstateVM.IsIndefiniteOmit) {
                if (this.IsMedicationSelected) {
                    this.IsReinstateAllEnable = false;
                    this.IsChkReinstateAll = true;
                }
                else if (DateTime.NotEquals(SelectedSlotsMinDate , DateTime.MinValue) && DateTime.GreaterThanOrEqualTo(SelectedSlotsMinDate , CommonBB.GetServerDateTime())) {
                    this.IsChkReinstateAll = true;
                    this.IsReinstateAllEnable = false;
                }
            }
            else {
                if (this.IsMedicationSelected) {
                    this.IsReinstateAllEnable = true;
                    this.IsChkReinstateAll = false;
                }
                else if (DateTime.NotEquals(SelectedSlotsMinDate , DateTime.MinValue) && DateTime.GreaterThanOrEqualTo(SelectedSlotsMinDate , CommonBB.GetServerDateTime())) {
                    this.IsChkReinstateAll = false;
                    this.IsReinstateAllEnable = true;
                }
            }
            if (DateTime.NotEquals(SelectedSlotsMinDate , DateTime.MinValue) && DateTime.LessThan(SelectedSlotsMinDate , CommonBB.GetServerDateTime())) {
                this.IsChkReinstateAll = false;
                this.IsReinstateAllEnable = false;
            }
        }
        public ReinstateSlots(): void {
            let objMedicationAdministrationWSSoapClient: MedicationAdministrationWSSoapClient;
            objMedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
            objMedicationAdministrationWSSoapClient.ReinstateSlotsCompleted  = (s,e) => { this.objMedicationAdministrationWSSoapClient_ReinstateSlotsCompleted(s,e); } ;
            let oCReqMsgReinstateSlots: CReqMsgReinstateSlots = new CReqMsgReinstateSlots();
            oCReqMsgReinstateSlots.oContextInformation = CommonBB.FillContext();
            oCReqMsgReinstateSlots.oContextInformation.PageInfo = PatientContext.EncounterOid.ToString();
            oCReqMsgReinstateSlots.oReinstateSlotParamsBC = new ReinstateSlotParams();
            oCReqMsgReinstateSlots.oReinstateSlotParamsBC.MedAdminOID = this.MedAdminOID;
            oCReqMsgReinstateSlots.oReinstateSlotParamsBC.PatientOID = ChartContext.PatientOID;
            oCReqMsgReinstateSlots.oReinstateSlotParamsBC.Reason = this.ReinstateReason;
            oCReqMsgReinstateSlots.oReinstateSlotParamsBC.OSlotData = this.ReinstateSlotData;
            oCReqMsgReinstateSlots.oReinstateSlotParamsBC.ReviewPeriodDtls = this.oManageReviewPeriod;
            if (oCReqMsgReinstateSlots.oReinstateSlotParamsBC.ReviewPeriodDtls != null) {
                oCReqMsgReinstateSlots.oReinstateSlotParamsBC.ReviewPeriodDtls.EncounterOID = ChartContext.EncounterOID > 0 ? ChartContext.EncounterOID : 0;
            }
            oCReqMsgReinstateSlots.oReinstateSlotParamsBC.ReinstateAll = this.IsChkReinstateAll;
            oCReqMsgReinstateSlots.oReinstateSlotParamsBC.PrescriptionItemOID = this.PrescriptionItemOID;
            if (String.Equals(this.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) && DateTime.NotEquals(this.PrescriptionItemEndDate , DateTime.MinValue) && this.IsChkReinstateAll) {
                this.IsLastSlotCheckRequired = true;
                this.IsUpdatePIStatusToCompleted = true;
            }
            oCReqMsgReinstateSlots.oReinstateSlotParamsBC.IsLastSlotCheckRequired = this.IsLastSlotCheckRequired;
            oCReqMsgReinstateSlots.oReinstateSlotParamsBC.IsUpdatePIStatusToCompleted = this.IsUpdatePIStatusToCompleted;
            oCReqMsgReinstateSlots.oReinstateSlotParamsBC.PresItemENDTTM = this.PrescriptionItemEndDate;
            oCReqMsgReinstateSlots.oReinstateSlotParamsBC.ScheduledDTTM = this.ScheduleDTTM;
            if ((this.IsChkReinstateAll && this.IsIndefiniteOmit && this.IsMedicationSelected) || (this.IsChkReinstateAll && !this.IsIndefiniteOmit && this.ReinstateSlotData != null && this.ReinstateSlotData.Count == 0)) {
                oCReqMsgReinstateSlots.oReinstateSlotParamsBC.ReinstateSlotDTTM = CommonBB.GetServerDateTime();
            }
            else if (this.IsChkReinstateAll && this.ReinstateSlotData != null && this.ReinstateSlotData.Count > 0) {
                oCReqMsgReinstateSlots.oReinstateSlotParamsBC.ReinstateSlotDTTM = this.ReinstateSlotData.Min(x => x.ScheduleDTTM).ScheduleDTTM;
            }
            if (!String.IsNullOrEmpty(this.FreqPerodCode) && String.Equals(this.FreqPerodCode, CConstants.OnceOnlyPerodCode, StringComparison.CurrentCultureIgnoreCase) && !String.IsNullOrEmpty(this._DoseTypeCode) && !String.Equals(this._DoseTypeCode, DoseTypeCode.STEPPED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(this._DoseTypeCode, DoseTypeCode.STEPPEDVARIABLE) && !String.Equals(this._DoseTypeCode, DoseTypeCode.VARIABLE, StringComparison.InvariantCultureIgnoreCase)) {
                oCReqMsgReinstateSlots.oReinstateSlotParamsBC.IsOnceOnlyFrequency = true;
            }
            if (MedChartData.MedChartOID > 0)
                oCReqMsgReinstateSlots.oReinstateSlotParamsBC.MedChartOID = MedChartData.MedChartOID;
            if (DateTime.NotEquals(MedChartData.LastUpdateDTTM , DateTime.MinValue))
                oCReqMsgReinstateSlots.oReinstateSlotParamsBC.LastModifiedAt = MedChartData.LastUpdateDTTM;
            objMedicationAdministrationWSSoapClient.ReinstateSlotsAsync(oCReqMsgReinstateSlots);
            iBusyIndicator.Start("ReinstateSlot", true);
        }
        objMedicationAdministrationWSSoapClient_ReinstateSlotsCompleted(sender: Object, e: ReinstateSlotsCompletedEventArgs): void {
            iBusyIndicator.Stop("ReinstateSlot");
            let sLockingMessage: string = String.Empty;
            let _ErrorID: number = 80000082;
            let _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:MedsadminVM, Method:objMedicationAdministrationWSSoapClient_ReinstateSlotsCompleted()";
            if (e.Error == null) {
                try {
                    let oCResMsgReinstateSlots: CResMsgReinstateSlots = e.Result;
                    if (oCResMsgReinstateSlots != null && oCResMsgReinstateSlots.oContextInformation != null && oCResMsgReinstateSlots.oContextInformation.Errors.Count <= 0) {
                        if (DateTime.NotEquals(oCResMsgReinstateSlots.dLastUpdateDTTM , DateTime.MinValue))
                            MedChartData.LastUpdateDTTM = oCResMsgReinstateSlots.dLastUpdateDTTM;
                        if (!String.IsNullOrEmpty(oCResMsgReinstateSlots.sLastUpdateBy)) {
                            ChartContext.CurrentUserName = oCResMsgReinstateSlots.sLastUpdateBy;
                        }
                        this.LastOmittedSlotDTTM = oCResMsgReinstateSlots.LastOmittedSlotDTTM;
                        if (oCResMsgReinstateSlots.oUpdatedSlotsData != null && oCResMsgReinstateSlots.oUpdatedSlotsData.Count > 0) {
                            this.IsReinstateSuccess = true;
                            this.UpdatedSlotsData = oCResMsgReinstateSlots.oUpdatedSlotsData;
                        }
                        else {
                            this.IsReinstateSuccess = true;
                            if (!this.IsChkReinstateAll) {
                                this.IsReinstateSuccess = false;
                            }
                        }
                        this.IsReloadChartRequired = oCResMsgReinstateSlots.IsPresItemStatusUpdated;
                        if (this.IsSlotUpdatedEvent != null)
                            this.IsSlotUpdatedEvent();
                    }
                    else if (oCResMsgReinstateSlots != null && oCResMsgReinstateSlots.oContextInformation != null && oCResMsgReinstateSlots.oContextInformation.Errors.Count > 0 && oCResMsgReinstateSlots.lErrorCode == 900025 && !String.IsNullOrEmpty(oCResMsgReinstateSlots.sLastUpdateBy)) {
                        let msg: iMessageBox = new iMessageBox();
                        sLockingMessage = String.Format(Resource.MedsAdminPrescChartView.LockMsg_ORSPresChart, oCResMsgReinstateSlots.sLastUpdateBy);
                        msg = new iMessageBox();
                        msg.Title = "Lorenzo";
                        msg.MessageButton = MessageBoxButton.OK;
                        msg.Message = sLockingMessage;
                        msg.MessageBoxClose  = (s,e) => { this.oMsgBox_ReinstateErrorMessageClose(s,e); } ;
                        msg.Show();
                    }
                }
               catch(ex:any)  {
                    let lnReturn: number =  AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number =  AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
        }
        oMsgBox_ReinstateErrorMessageClose(sender: Object, e: MessageEventArgs): void {
            if (this.IsSlotUpdatedEvent != null) {
                this.IsSlotUpdatedEvent();
            }
        }
    }
    export class TitratedDoseVM extends ViewModelBase {
        private MoreOptionCode: string;
        private _Dose: string;
        public get Dose(): string {
            return this._Dose;
        }
        public set Dose(value: string) {
            if (!Helper.ReferenceEquals(this._Dose, value)) {
                this._Dose = value;
                // NotifyPropertyChanged("Dose");
            }
        }
        private _doseUOM: CListItem;
        public get DoseUOM(): CListItem {
            return this._doseUOM;
        }
        public set DoseUOM(value: CListItem) {
            if (value != null && value.DisplayText == "More") {
                this.MoreOptionCode = CConstants.DoseUOMOptionCode;
                this.GetMoreComboOption();
            }
            else {
                if (this.DoseUOMList != null)
                    this._doseUOM = this.GetComboValue(value, this.DoseUOMList);
                else this._doseUOM = value;
                if (Helper.ReferenceEquals(this._doseUOM, value) != true) {
                    // NotifyPropertyChanged("DoseUOM");
                }
            }
            // NotifyPropertyChanged("DoseUOM");
        }
        private _DoseUOMList: ObservableCollection<CListItem>;
        public get DoseUOMList(): ObservableCollection<CListItem> {
            return this._DoseUOMList;
        }
        public set DoseUOMList(value: ObservableCollection<CListItem>) {
            if (!Helper.ReferenceEquals(this._DoseUOMList, value)) {
                this._DoseUOMList = value;
                // NotifyPropertyChanged("DoseUOMList");
            }
        }
        private _SlotDttm: string;
        public get SlotDttm(): string {
            return this._SlotDttm;
        }
        public set SlotDttm(value: string) {
            if (!Helper.ReferenceEquals(this._SlotDttm, value)) {
                this._SlotDttm = value;
                // NotifyPropertyChanged("SlotDttm");
            }
        }
        private _SlotTime: string;
        public get SlotTime(): string {
            return this._SlotTime;
        }
        public set SlotTime(value: string) {
            this._SlotTime = value;
            // NotifyPropertyChanged("SlotTime");
        }
        private _TritdatedSlotData: SlotData;
        public get TritdatedSlotData(): SlotData {
            return this._TritdatedSlotData;
        }
        public set TritdatedSlotData(value: SlotData) {
            this._TritdatedSlotData = value;
            // NotifyPropertyChanged("TritdatedSlotData");
        }
        private _PrescriptionItemScheduleOID: number;
        public get PrescriptionItemScheduleOID(): number {
            return this._PrescriptionItemScheduleOID;
        }
        public set PrescriptionItemScheduleOID(value: number) {
            if (!Helper.ReferenceEquals(this._PrescriptionItemScheduleOID, value)) {
                this._PrescriptionItemScheduleOID = value;
                // NotifyPropertyChanged("PrescriptionItemScheduleOID");
            }
        }
        private _routeOID: number;
        public get RouteOID(): number {
            return this._routeOID;
        }
        public set RouteOID(value: number) {
            if (this._routeOID != value) {
                this._routeOID = value;
                // NotifyPropertyChanged("RouteOID");
            }
        }
        private _RouteOIDS: string;
        public get RouteOIDs(): string {
            return this._RouteOIDS;
        }
        public set RouteOIDs(value: string) {
            if (this._RouteOIDS != value) {
                this._RouteOIDS = value;
                // NotifyPropertyChanged("RouteOIDs");
            }
        }
        private _identifyingOID: number;
        public get IdentifyingOID(): number {
            return this._identifyingOID;
        }
        public set IdentifyingOID(value: number) {
            if (this._identifyingOID != value) {
                this._identifyingOID = value;
                // NotifyPropertyChanged("IdentifyingOID");
            }
        }
        private _identifyingType: string;
        public get IdentifyingType(): string {
            return this._identifyingType;
        }
        public set IdentifyingType(value: string) {
            if (this._identifyingType != value) {
                this._identifyingType = value;
                // NotifyPropertyChanged("IdentifyingType");
            }
        }
        private _mCVersion: string;
        public get MCVersion(): string {
            return this._mCVersion;
        }
        public set MCVersion(value: string) {
            if (this._mCVersion != value) {
                this._mCVersion = value;
                // NotifyPropertyChanged("MCVersion");
            }
        }
        private _ObsDrugname: string;
        public get ObsDrugname(): string {
            return this._ObsDrugname;
        }
        public set ObsDrugname(value: string) {
            if (this._ObsDrugname != value) {
                this._ObsDrugname = value;
                // NotifyPropertyChanged("ObsDrugname");
            }
        }
        private _sItemsubtype: string;
        public get SItemsubtype(): string {
            return this._sItemsubtype;
        }
        public set SItemsubtype(value: string) {
            if (this._sItemsubtype != value) {
                this._sItemsubtype = value;
                // NotifyPropertyChanged("SItemsubtype");
            }
        }
        private _sMulticompnames: string;
        public get smulticompnames(): string {
            return this._sMulticompnames;
        }
        public set smulticompnames(value: string) {
            if (this._sMulticompnames != value) {
                this._sMulticompnames = value;
                // NotifyPropertyChanged("smulticompnames");
            }
        }
        private _sLorenzoID: string;
        public get slorenzoID(): string {
            return this._sLorenzoID;
        }
        public set slorenzoID(value: string) {
            if (this._sLorenzoID != value) {
                this._sLorenzoID = value;
                // NotifyPropertyChanged("slorenzoID");
            }
        }
        private _defaultDetails: FormViewerDefaultsVM;
        public get DefaultDetails(): FormViewerDefaultsVM {
            return this._defaultDetails;
        }
        public set DefaultDetails(value: FormViewerDefaultsVM) {
            if (this._defaultDetails != value) {
                this._defaultDetails = value;
                // NotifyPropertyChanged("DefaultDetails");
            }
        }
        private _isTitratedSuccess: boolean;
        public get IsTitratedSuccess(): boolean {
            return this._isTitratedSuccess;
        }
        public set IsTitratedSuccess(value: boolean) {
            this._isTitratedSuccess = value;
            // NotifyPropertyChanged("IsTitratedSuccess");
        }
        private _PrescriptionItemOID: number;
        public get PrescriptionItemOID(): number {
            return this._PrescriptionItemOID;
        }
        public set PrescriptionItemOID(value: number) {
            if (this._PrescriptionItemOID != value) {
                this._PrescriptionItemOID = value;
                // NotifyPropertyChanged("PrescriptionItemOID");
            }
        }
        private _ModifiedatDttm: DateTime;
        public get LastModifiedAt(): DateTime{
            return this._ModifiedatDttm;
        }
        public set LastModifiedAt(value: DateTime) {
            if (!Helper.ReferenceEquals(this._ModifiedatDttm, value)) {
                this._ModifiedatDttm = value;
              //  // NotifyPropertyChanged("LastModifiedAt");
            }
        }
        //public delegate void IsTitratedUpdatedDelegate();
        public IsTitratedUpdatedEvent: Function;
        public SlotDose: string;
        public SlotDoseUOM: number;
        public SlotDoseUOMName: string;
        public SlotDoseName: string;
        public SlotDoseUOMOrphan: number;
        public SlotDoseUOMNameOrphan: string;
        public DosageFormOID: number;
        private GetMoreComboOption(): void {
            let objService: ManagePrescriptionWSSoapClient = new ManagePrescriptionWSSoapClient();
            objService.GetAllOptionsCompleted  = (s,e) => { this.objService_GetAllOptionsCompleted(s,e); } ;
            let objAllRequest: CReqMsgGetAllOptions = new CReqMsgGetAllOptions();
            objAllRequest.IdentifyingOIDBC = this.IdentifyingOID;
            objAllRequest.IdentifyingTypeBC = this.IdentifyingType;
            objAllRequest.sOptionCodeBC = this.MoreOptionCode;
            objAllRequest.MCVersionNoBC = AppSessionInfo.AMCV;
            objAllRequest.oContextInformation = Common.FillContext();
            objService.GetAllOptionsAsync(objAllRequest);
        }
        objService_GetAllOptionsCompleted(sender: Object, e: GetAllOptionsCompletedEventArgs): void {
            let _ErrorID: number = 80000081;
            let _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:MedsadminVM, Method:objService_GetAllOptionsCompleted()";
            if (e.Error == null) {
                try {
                    let objResponse: CResMsgGetAllOptions = e.Result;
                    if (objResponse != null && objResponse.oValues != null && objResponse.oValues.Count > 0) {
                        switch (this.MoreOptionCode) {
                            case CConstants.DoseUOMOptionCode:
                                this._defaultDetails.Uoms = new ObservableCollection<CListItem>();
                                for (let i: number = 0; i < objResponse.oValues.Count; i++) {
                                    if (!String.IsNullOrEmpty(objResponse.oValues[i].Name)) {
                                        this._defaultDetails.Uoms.Add(ObjectHelper.CreateObject(new CListItem(), {
                                            DisplayText: objResponse.oValues[i].Name,
                                            Value: objResponse.oValues[i].Code.ToString()
                                        }));
                                    }
                                }
                                break;
                        }
                    }
                }
               catch(ex:any)  {
                    let lnReturn: number =  AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number =  AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
        }
        public GetComboValue(oListItem: CListItem, oListCollection: ObservableCollection<CListItem>): CListItem {
            if (oListItem != null && oListCollection != null) {
                let selectedVal = oListCollection.Where(oItem =>oItem.Value==oListItem.Value).Select(oItem => oItem);
                if (selectedVal != null && selectedVal.Count() > 0) {
                    oListItem = selectedVal.ElementAt(0);
                }
                else if (!String.IsNullOrEmpty(oListItem.DisplayText)) {
                    oListCollection.Add(oListItem);
                }
            }
            return oListItem;
        }
        public GetFormDefaults(lnIdentifyingOID: number, strIdentifyingType: string, lnRouteOID: string, lnFormOID: string, strMCVersion: string, strParamType: string): void {
            let objServiceProxy: IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescriptionWSSoapClient();
            objServiceProxy.GetFormViewDefaultParamsCompleted  = (s,e) => { this.objServiceProxy_GetFormViewDefaultParamsCompleted(s,e); } ;
            let objReq: CReqMsgGetFormViewDefaultParams = new CReqMsgGetFormViewDefaultParams();
            objReq.objFormViewParamsBC = new IPPFormViewParams();
            objReq.objFormViewParamsBC.IdentifyingOID = lnIdentifyingOID;
            objReq.objFormViewParamsBC.IdentifyingType = strIdentifyingType;
            objReq.objFormViewParamsBC.RouteOID = (!String.IsNullOrEmpty(lnRouteOID)) ? Convert.ToInt64(lnRouteOID) : 0;
            objReq.objFormViewParamsBC.RouteOIDs = lnRouteOID;
            objReq.objFormViewParamsBC.FormOID = (!String.IsNullOrEmpty(lnFormOID)) ? Convert.ToInt64(lnFormOID) : 0;
            objReq.objFormViewParamsBC.MCVersion = strMCVersion;
            objReq.objFormViewParamsBC.ParamType = strParamType;
            objReq.objFormViewParamsBC.PatientOID = ChartContext.PatientOID;
            objReq.oContextInformation = Common.FillContext();
            objServiceProxy.GetFormViewDefaultParamsAsync(objReq);
        }
        objServiceProxy_GetFormViewDefaultParamsCompleted(sender: Object, e: GetFormViewDefaultParamsCompletedEventArgs): void {
            let _ErrorID: number = 80000080;
            let _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:MedsadminVM, Method:objServiceProxy_GetFormViewDefaultParamsCompleted()";
            if (e.Error == null) {
                try {
                    if (this.DefaultDetails == null)
                        this.DefaultDetails = new FormViewerDefaultsVM();
                    let objRes: CResMsgGetFormViewDefaultParams = e.Result;
                    if (objRes.objDefaults != null && objRes.objDefaults.DoseUOM != null) {
                        this.DefaultDetails.Uoms = new ObservableCollection<CListItem>();
                        objRes.objDefaults.DoseUOM.forEach( (objUOM)=> {
                            if (!String.IsNullOrEmpty(objUOM.UOMName)) {
                                let oList: CListItem = ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: objUOM.UOMName,
                                    Value: objUOM.UOMId.ToString()
                                });
                                this.DefaultDetails.Uoms.Add(oList);
                                if (this.SlotDoseUOM > 0 && this.SlotDoseUOM == objUOM.UOMId) {
                                    this.DoseUOM = oList;
                                }
                            }
                        });
                        if(this.DefaultDetails.Uoms.Where(x => (x.Value == this.SlotDoseUOMOrphan.ToString())).Count() == 0){
                            let oList: CListItem = ObjectHelper.CreateObject(new CListItem(), {
                                DisplayText: this.SlotDoseUOMNameOrphan,
                                Value: this.SlotDoseUOMOrphan.ToString()
                            });
                            if (oList != null && !String.IsNullOrEmpty(oList.DisplayText))
                                this.DefaultDetails.Uoms.Add(oList);
                            if (this.DoseUOM == null && !String.IsNullOrEmpty(this.SlotDose))
                                this.DoseUOM = oList;
                        }
                        if (!String.IsNullOrEmpty(this.SlotDose))
                            this.Dose = this.SlotDose;
                    }
                }
               catch(ex:any)  {
                    let lnReturn: number =  AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number =  AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
        }
        public EnterTitratedDose(oDoseSchedule: DoseSchedule): void {
            let objMedicationAdministrationWSSoapClient: MedicationAdministrationWSSoapClient;
            objMedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
            objMedicationAdministrationWSSoapClient.UpdateTitratedDoseCompleted  = (s,e) => { this.objMedicationAdministrationWSSoapClient_UpdateTitratedDoseCompleted(s,e); } ;
            let oCReqMsgUpdateTitratedDose: CReqMsgUpdateTitratedDose = new CReqMsgUpdateTitratedDose();
            oCReqMsgUpdateTitratedDose.oContextInformation = CommonBB.FillContext();
            oCReqMsgUpdateTitratedDose.oContextInformation.PageInfo = PatientContext.EncounterOid.ToString();
            oCReqMsgUpdateTitratedDose.oDoseScheduleBC = new DoseSchedule();
            oCReqMsgUpdateTitratedDose.oDoseScheduleBC.PrescriptionItemScheduleOID = oDoseSchedule.PrescriptionItemScheduleOID;
            oCReqMsgUpdateTitratedDose.oDoseScheduleBC.Dose = oDoseSchedule.Dose.ToUpper();
            oCReqMsgUpdateTitratedDose.oDoseScheduleBC.DoseUOM = oDoseSchedule.DoseUOM;
            oCReqMsgUpdateTitratedDose.oDoseScheduleBC.DoseUOMOID = oDoseSchedule.DoseUOMOID;
            oCReqMsgUpdateTitratedDose.oDoseScheduleBC.ScheduledDTTM = oDoseSchedule.ScheduledDTTM;
            oCReqMsgUpdateTitratedDose.oDoseScheduleBC.PrescriptionItemOID = oDoseSchedule.PrescriptionItemOID;
            oCReqMsgUpdateTitratedDose.oDoseScheduleBC.PatientOID = ChartContext.PatientOID;
            if (MedChartData.MedChartOID > 0)
                oCReqMsgUpdateTitratedDose.oDoseScheduleBC.MedChartOID = MedChartData.MedChartOID;
            if (DateTime.NotEquals(MedChartData.LastUpdateDTTM , DateTime.MinValue))
                oCReqMsgUpdateTitratedDose.oDoseScheduleBC.LastModifiedAt = MedChartData.LastUpdateDTTM;
            objMedicationAdministrationWSSoapClient.UpdateTitratedDoseAsync(oCReqMsgUpdateTitratedDose);
        }
        objMedicationAdministrationWSSoapClient_UpdateTitratedDoseCompleted(sender: Object, e: UpdateTitratedDoseCompletedEventArgs): void {
            let _ErrorID: number = 80000079;
            let sLockingMessage: string = String.Empty;
            let _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:MedsadminVM, Method:objMedicationAdministrationWSSoapClient_UpdateTitratedDoseCompleted()";
            let oCResMsgUpdateTitratedDose: CResMsgUpdateTitratedDose = e.Result;
            if (oCResMsgUpdateTitratedDose != null && oCResMsgUpdateTitratedDose.oContextInformation != null && oCResMsgUpdateTitratedDose.oContextInformation.Errors.Count <= 0) {
                if (e.Error == null) {
                    try {
                        if (oCResMsgUpdateTitratedDose != null && oCResMsgUpdateTitratedDose.oContextInformation != null && oCResMsgUpdateTitratedDose.oContextInformation.Errors.Count <= 0) {
                            if (DateTime.NotEquals(oCResMsgUpdateTitratedDose.dLastUpdateDTTM , DateTime.MinValue))
                                MedChartData.LastUpdateDTTM = oCResMsgUpdateTitratedDose.dLastUpdateDTTM;
                            if (oCResMsgUpdateTitratedDose.lPrescriptionItemScheduleOID > 0)
                                MedChartData.PrescriptionItemScheduleOID = oCResMsgUpdateTitratedDose.lPrescriptionItemScheduleOID;
                            if (!String.IsNullOrEmpty(oCResMsgUpdateTitratedDose.sLastUpdateBy)) {
                                ChartContext.CurrentUserName = oCResMsgUpdateTitratedDose.sLastUpdateBy;
                            }
                            this.IsTitratedSuccess = true;
                        }
                        else {
                            this.IsTitratedSuccess = false;
                        }
                        if (this.IsTitratedUpdatedEvent != null)
                            this.IsTitratedUpdatedEvent();
                    }
                   catch(ex:any)  {
                        let lnReturn: number =  AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                    }

                }
                else {
                    let lnReturn: number =  AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
                }
            }
            else if (oCResMsgUpdateTitratedDose != null && oCResMsgUpdateTitratedDose.oContextInformation != null && oCResMsgUpdateTitratedDose.oContextInformation.Errors.Count > 0 && oCResMsgUpdateTitratedDose.lErrorCode == 900025 && !String.IsNullOrEmpty(oCResMsgUpdateTitratedDose.sLastUpdateBy)) {
                let msg: iMessageBox = new iMessageBox();
                sLockingMessage = String.Format(Resource.MedsAdminPrescChartView.LockMsg_ORSPresChart, oCResMsgUpdateTitratedDose.sLastUpdateBy);
                msg = new iMessageBox();
                msg.Title = "Lorenzo";
                msg.MessageButton = MessageBoxButton.OK;
                msg.MessageBoxClose  = (s,e) => { this.oMsgBox_EnterDoseErrorMessageClose(s,e); } ;
                msg.Message = sLockingMessage;
                msg.Show();
            }
        }
        oMsgBox_EnterDoseErrorMessageClose(sender: Object, e: MessageEventArgs): void {
            if (this.IsTitratedUpdatedEvent != null) {
                this.IsTitratedUpdatedEvent();
            }
        }
    }
    export class FormViewerDefaultsVM extends ViewModelBase {
        private uoms: ObservableCollection<CListItem>;
        public get Uoms(): ObservableCollection<CListItem> {
            return this.uoms;
        }
        public set Uoms(value: ObservableCollection<CListItem>) {
            this.uoms = value;
            // NotifyPropertyChanged("Uoms");
        }
    }
    // export module SelfAdminDrugDetailVM {
        export enum CallBackMethodRefName {
            GetSelfAdminDetails,

            ManageSelfAdmin
        }
    // }
    // export module SelfAdminDrugDetailVM {
        export class SelfAdminCallBackEventArgs extends EventArgs {
            private sMethodName: CallBackMethodRefName;
            private oError: Exception;
            constructor(sCallBackMethodName: CallBackMethodRefName, oCallBackError: Exception) {
                super();
                this.sMethodName = sCallBackMethodName;
                this.oError = oCallBackError;
            }
            public get CallBackMethod(): CallBackMethodRefName {
                return this.sMethodName;
            }
            public get CallBackError(): Exception {
                return this.oError;
            }
        }
    // }
