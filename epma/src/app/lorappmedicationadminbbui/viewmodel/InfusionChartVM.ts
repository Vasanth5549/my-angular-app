import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, ScriptObject, AppLoadService} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, HtmlPage, ObservableCollection, Random, Visibility, RelayCommand, List, AppContextInfo, ChildWizardCloseEventargs, CListItem, ContextInformation } from 'epma-platform/models';
import { AppDialog, Colors, SolidColorBrush } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import { ObjectHelper as Helper } from 'epma-platform/helper';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ActivityCode, Common, MedsAdminCommonData } from '../utilities/common';
import { CConstants, DoseTypeCode, InfChartAlert, InfusionRecordAdminTypeCodes, MedicationAction, PrescriptionTypes, PrescriptionTypesMenuCode, SlotStatus } from '../utilities/CConstants';
import { ChartContext, MedChartData, ValueDomainValues } from '../utilities/globalvariable';
import { CommonBB,LzoWizardAction } from 'src/app/lorappcommonbb/utilities/common';
import { SVIconLaunchFrom } from 'src/app/product/shared/models/constant';
import { TagDrugHeaderDetail } from '../utilities/globalvariable';
import { RecordAdminType } from '../utilities/CConstants';
import * as IPPManagePrescSer from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { PatientContext,AppSessionInfo } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { SlotDetailVM } from './MedicationChartVM';
import { CDrugHdrAddnlInfo, CDrugHeader, DrugHeaderItem } from '../common/drugheader';
import { UserPermissions } from '../utilities/ProfileData';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { AdministrationDetail, CReqMsgGetInfusionChart, CResMsgGetInfusionChart, CResMsgRecordInfusionAdministration, DrugDetail, Encounter, GetInfusionChartCompletedEventArgs, MedChartParams, MedicationAdministrationWSSoapClient, SlotDetail, UOM } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { PrescriptionHelper } from '../utilities/PrescriptionHelper';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { LockedUsersDetails, MedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { ConditionalDoseVM ,RequestSource} from 'src/app/lorappmedicationcommonbb/viewmodel/ConditionalDoseVM';
import { MedConditionalDose } from 'src/app/lorappmedicationcommonbb/view/medconditionaldose';
import { MedTitratedDose } from 'src/app/lorappmedicationcommonbb/view/medtitrateddose';
import { MultipleDoseDetail } from 'src/app/lorappmedicationcommonbb/viewmodel/prescriptionitemdetailsvm';
import { MedicationCommonProfileData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { PropertyChangedEventArgs } from 'src/app/shared/epma-platform/controls/epma-tab/epma-tab.component';
import { MedsAdminChartToolTip } from '../resource/medsadmincharttooltip.designer';
import { InfusionTagObject } from 'src/app/lorarcbluebirdmedicationchart/common/InfusionTagObject';
import { medMCItems } from 'src/app/lorappmedicationcommonbb/view/medmcitems';
import { InfusionChartRow } from 'src/app/lorarcbluebirdmedicationchart/common/InfusionChartRow';
import { InfrecordadminVM } from './InfrecordadminVM';
import { DateTimeKind } from 'epma-platform/DateTime';
import { CContextInformation, WizardType } from 'src/app/shared/epma-platform/models/eppma-common-types';
import { InfRecAdmMainView } from '../child/InfRecAdmMainView';
import { MedicationAdminVM } from '../ca/medicationadmin/medicationadminvm';
import { MedsRecordAdminstrator } from '../child/medsadminrecordadmin';
import { medddetailsChild } from 'src/app/lorappmedicationcommonbb/child/medddetailschild';
import { LaunchWizard } from 'src/app/shared/epma-platform/models/launchwizard';
import { GetClinicalEncountersDetailCompletedEventArgs } from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { MedSteppedFullPrescriptionVW } from 'src/app/lorappmedicationcommonbb/view/medSteppedFullPrescriptionVW';

    export class InfusionChartVM extends ViewModelBase {
        //public delegate void dlgGetInfusionChartData(CResMsgGetInfusionChart oRes);
        public OnGetInfusionChartData: Function;
        //public delegate void dlgRefreshInfusionChart(SlotDetail oResSlotDetail);
        public OnRefreshInfusionChart: Function;
        //public delegate void dlgOnPropertyChanged();
        public OnPropertyChanged: Function;
        isClinEncMesToBeLaunchd: boolean = false;
        private startDTTM: DateTime;
        private endDTTM: DateTime;
        private currentDTTM: DateTime;
        private currentPage: number = 2;
        oslotvm: SlotDetailVM;
        oinfusrecordvm: InfrecordadminVM;
        oSlotDetail: SlotDetail;
        CurrentSlotDetail: SlotDetail;
        oMedsAdminRec: MedsRecordAdminstrator;
        oHdrRecordAdmin: CDrugHdrAddnlInfo;
        public isPrescribeLinkClicked: boolean = false;
        private OriginalSequence: List<number> = new List<number>();
        public iSNextOrPrevButtonClicked: boolean = false;
        IsReqMedicationLaunched: boolean = false;
        IsTitratedIconClicked: boolean = false;
        msg: iMessageBox;
        public oEncList: ObservableCollection<Encounter> = new ObservableCollection<Encounter>();
        _ISCanWithoutClerkPrompt: boolean = false;
        constructor() {
            super();
            this.CheckPermission();
        }
        public FillOriginalItemSequence(objRes: CResMsgGetInfusionChart): void {
            if (this.iSNextOrPrevButtonClicked && this.OriginalSequence != null && this.OriginalSequence.Count == 0) {
                this.OriginalSequence.Clear();
                if (objRes.InfusionChatView.DrugDetail != null) {
                    let nTotalDrugCount: number = objRes.InfusionChatView.DrugDetail.Count;
                    for (let iCnt: number = 0; iCnt < nTotalDrugCount; iCnt++) {
                        if (objRes.InfusionChatView.DrugDetail[iCnt] != null && objRes.InfusionChatView.DrugDetail[iCnt].DrugHeader != null && objRes.InfusionChatView.DrugDetail[iCnt].DrugHeader.PrescriptionItemOID > 0) {
                            this.OriginalSequence.Add(objRes.InfusionChatView.DrugDetail[iCnt].DrugHeader.PrescriptionItemOID);
                        }
                    }
                }
            }
        }
        private RearrangeItemsToRetainOldSequence(objRes: CResMsgGetInfusionChart): void {
            if (this.OriginalSequence != null && this.iSNextOrPrevButtonClicked) {
                if (objRes.InfusionChatView.DrugDetail != null) {
                    let DrugDetailList = objRes.InfusionChatView.DrugDetail.ToList<DrugDetail>();
                    let nTotalDrugCount: number = this.OriginalSequence.Count;
                    for (let iCnt: number = 0; iCnt < nTotalDrugCount; iCnt++) {
                        let oMatchingItem = DrugDetailList.Where(x => x.DrugHeader.PrescriptionItemOID == this.OriginalSequence[iCnt]).FirstOrDefault();
                        if (oMatchingItem != null && DrugDetailList.IndexOf(oMatchingItem) != iCnt) {
                            DrugDetailList.Remove(oMatchingItem);
                            DrugDetailList.Insert(iCnt, oMatchingItem);
                        }
                    }
                    objRes.InfusionChatView.DrugDetail = new ObservableCollection<DrugDetail>(DrugDetailList);
                }
            }
        }
        public GetInfusionChartData(dStartDate: DateTime, dEndDate: DateTime, dCurrentDTTM: DateTime): void {
            MedChartData.NonInfusionItemCount = 0;
            MedChartData.InfusionItemCount = 0;
            this.OverDueCount = 0;
            this.DuenowCount = 0;
            this.InprogressCount = 0;
            this.AsrequiredCount = 0;
            this.StartDTTM = dStartDate;
            this.EndDTTM = dEndDate;
            this.CurrentDTTM = dCurrentDTTM;
            if (UserPermissions.CanRequestMedication && MedChartData.bAllowStockRequestByNurse) {
                this.IsRMVisible = Visibility.Visible;
                this.IsRMEnabled = true;
                MedChartData.bRequestMedicationEnable = true;
                MedChartData.bRequestMedicationVisible = true;
            }
            else {
                this.IsRMVisible = Visibility.Collapsed;
                MedChartData.bRequestMedicationEnable = false;
                MedChartData.bRequestMedicationVisible = false;
            }
            let objService: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
            let oParams: MedChartParams = new MedChartParams();
            objService.GetInfusionChartCompleted  = (s,e) => { this.objService_GetInfusionChartCompleted(s,e); } ;
            if (!this.iSNextOrPrevButtonClicked)
                this.OriginalSequence.Clear();
           let objReq: CReqMsgGetInfusionChart = new CReqMsgGetInfusionChart();
           // revisit 
            objReq.oContextInformation = CommonBB.FillContext();
            oParams.PatientOID = ChartContext.PatientOID; 
            oParams.EncounterOID = ChartContext.EncounterOID;
            oParams.StartDate = dStartDate.AddDateAdjustment();
            oParams.EndDate = dEndDate.AddDateAdjustment();
            oParams.DuenessWindowTimeMinutes = MedChartData.DuenessThreshold;
            oParams.OverDueTimeHours = CConstants.OverdueToNotknownTime;
            oParams.MedChartOID = MedChartData.MedChartOID;
            oParams.PrescType = "CC_DSCHRG";
            oParams.ProfileDiscontinuedDrugFlag = '\0';
            oParams.RefreshTriggeredCACode = MedChartData.RefreshTriggeredCACode;
            let sImageList: string;
            oParams.SealRecordList = Common.GetSealDrugs((o) => { sImageList = o; });
            let nDrugsExpDuration: number = 0;
            if (MedicationCommonProfileData.MedViewConfig != null)
                nDrugsExpDuration = Convert.ToInt32(PrescriptionHelper.GetDuration(MedicationCommonProfileData.MedViewConfig.DrugsExpiryDuration));
            oParams.ProfileHoldDuration = nDrugsExpDuration;
            objReq.ViewMedChartParamsBC = oParams;
            objService.GetInfusionChartAsync(objReq);
        }
        objService_GetInfusionChartCompleted(sender: Object, e: GetInfusionChartCompletedEventArgs): void {
            if (e.Error != null)
                return
            this.NavDirection = InfusionChartVM.eDirection.None;
            let objRes: CResMsgGetInfusionChart = e.Result;
            if (objRes != null && objRes.InfusionChatView != null) {
                if (this.iSNextOrPrevButtonClicked)
                    this.RearrangeItemsToRetainOldSequence(objRes);
                MedChartData.NonInfusionItemCount = objRes.InfusionChatView.NonInfusionItemCount;
                MedChartData.InfusionItemCount = objRes.InfusionChatView.InfusionItemCount;
                if (!String.IsNullOrEmpty(MedChartData.RefreshTriggeredCACode) && (String.Equals(MedChartData.RefreshTriggeredCACode, "MN_MEDINPATSL_P2", StringComparison.InvariantCultureIgnoreCase) || String.Equals(MedChartData.RefreshTriggeredCACode, "MN_MED_VALIDATE_S_P2", StringComparison.InvariantCultureIgnoreCase) || String.Equals(MedChartData.RefreshTriggeredCACode, "MN_MED_REQUEST", StringComparison.InvariantCultureIgnoreCase))) {
                    MedChartData.bRequestMedicationEnable = objRes.InfusionChatView.IsReqMedEnable.Equals(CConstants.one);
                    if (String.Equals(MedChartData.RefreshTriggeredCACode, "MN_MEDINPATSL_P2", StringComparison.InvariantCultureIgnoreCase)) {
                        MedsAdminCommonData.FillEventsWithNotKnownStatus(objRes.InfusionChatView.EventsInNotKnownStatus);
                    }
                }
                if (objRes.InfusionChatView.OID > 0) {
                    MedChartData.ChartStatus = objRes.InfusionChatView.ChartStatus;
                    MedChartData.ActiveFrom = objRes.InfusionChatView.ActiveFrom.Date;
                    MedChartData.ActiveTo = objRes.InfusionChatView.ActiveTo.Date;
                    MedChartData.SuspendedOn = objRes.InfusionChatView.ActiveTo;
                }
                MedChartData.IsAuthoriseDrugAval = objRes.InfusionChatView.IsAuthoriseDrugAvailable;
            }
            if (!String.IsNullOrEmpty(MedChartData.ChartStatus)) {
                this.ChartStatusDisplayText = CommonBB.GetText(MedChartData.ChartStatus, ValueDomainValues.oChartStatus);
            }
            if (MedChartData.PatinetInfo != null && !String.IsNullOrEmpty(MedChartData.PatinetInfo.Observation)) {
                let sHtWtBSA: string = MedChartData.PatinetInfo.Observation;
                if (!String.IsNullOrEmpty(PatientContext.BSA))
                    sHtWtBSA += " " + PatientContext.BSA + MedsAdminChartToolTip.PatientBSAUOMText;
                this.PatientInfoDisplayText = sHtWtBSA;
            }
            this.OverDueSlotsColor = new SolidColorBrush(MedChartData.OverDueSlotsColor);
            this.DueSlotsColor = new SolidColorBrush(MedChartData.DueSlotsColor);
            this.AsRequiredSlotsColor = new SolidColorBrush(MedChartData.AsRequiredSlotsColor);
            this.InProgressSlotsColor = new SolidColorBrush(CommonBB.ToColor(CConstants.InProgressCellBgColor));
            if (e.Error == null && this.OnGetInfusionChartData != null) {             
                // commented need to revisit
                //   this.OnGetInfusionChartData(ObjectHelper.CreateType<CResMsgGetInfusionChart>(e.Result, CResMsgGetInfusionChart));
                this.OnGetInfusionChartData(null,e.Result);
            }
            this.iSNextOrPrevButtonClicked = false;
            if ((MedChartData.IsMedChartReadOnly) || (String.IsNullOrEmpty(MedChartData.ChartStatus) || String.Equals(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.CurrentCultureIgnoreCase))) {
                this.IsRMEnabled = false;
                MedChartData.bRequestMedicationEnable = false;
            }
        }
        public LaunchPrescriptionDetails(PrescriptionItemOID: number, sDrugName: string, sHeight: string, sDefaulttab: string, sItemSubType: string, sLorenzoID: string, MCVersionNo: string, DoseCalcExist: string): void {
            let ddetChild: medddetailsChild = new medddetailsChild();
            ddetChild.MedDetailsUserControl.PrescriptionItemOID = PrescriptionItemOID;
            ddetChild.MedDetailsUserControl.MCVersion = !String.IsNullOrEmpty(MCVersionNo) ? MCVersionNo : AppSessionInfo.AMCV;
            ddetChild.MedDetailsUserControl.LorenzoID = sLorenzoID;
            ddetChild.MedDetailsUserControl.DoseCalcExist = DoseCalcExist;
            ddetChild.MedDetailsUserControl.ServiceOID = MedChartData.ServiceOID;
            ddetChild.MedDetailsUserControl.LocationOID = MedChartData.LocationOID;
            if (!String.IsNullOrEmpty(sDefaulttab))
                ddetChild.MedDetailsUserControl.sDefaultTab = sDefaulttab;
            if (sDefaulttab == "SupplyInstructions")
                ddetChild.MedDetailsUserControl.TechValDef = true;
            ddetChild.MedDetailsUserControl.oLaunchFrom = SVIconLaunchFrom.MedChart;
            ddetChild.MedDetailsUserControl.PresType = PrescriptionTypes.ForAdministration;
            if (String.Compare(sItemSubType, CConstants.ItemSubType, StringComparison.InvariantCultureIgnoreCase) == 0) {
                sDrugName = MedsAdminChartToolTip.AdhocItemCaption;
            }
            ddetChild.onDialogClose = (e)=>this.ddetChild_Closed(e);
            let dialogWindowHeight = (Convert.ToInt64(sHeight)/window.devicePixelRatio);
            // ObjectHelper.stopFinishAndCancelEvent(true);
            AppActivity.OpenWindow(sDrugName, ddetChild, (e)=>this.ddetChild_Closed(e), "", false, dialogWindowHeight,930, false, WindowButtonType.Close, null);
        }
        ddetChild_Closed(args: AppDialogEventargs): void {
            // ObjectHelper.stopFinishAndCancelEvent(false);
            args.AppChildWindow.DialogResult = true;
        }
        public LaunchDoseTypeScreen(PrescriptionItemOID: number, sDrugName: string, sDoseType: string, sInfusiontype: string): void {
            if (String.Compare(sDoseType, DoseTypeCode.CONDITIONAL, StringComparison.OrdinalIgnoreCase) == 0) {
                let ConditionalVM: ConditionalDoseVM = new ConditionalDoseVM(RequestSource.ViewDrugDetails, PrescriptionItemOID);
                ConditionalVM.DrugName = sDrugName;
                let objConditional: MedConditionalDose = new MedConditionalDose();
                objConditional.DataContext = ConditionalVM;
                objConditional.DoseType = sDoseType.Trim();
                objConditional.InfusionType = sInfusiontype;
                AppActivity.OpenWindow((sDrugName + " - LORENZO -- Webpage Dialog"), objConditional, (e)=>this.omedobjConditional_Closed(e), "", false, 250, 460, false, WindowButtonType.Close, null);
            }
            else if (String.Compare(sDoseType, DoseTypeCode.TITRATED, StringComparison.OrdinalIgnoreCase) == 0) {
                if (!this.IsTitratedIconClicked) {
                    this.IsTitratedIconClicked = true;
                    let objTitrated: MedTitratedDose = new MedTitratedDose();
                    let MultiDoseDetailVM: MultipleDoseDetail = new MultipleDoseDetail(PrescriptionItemOID, AppSessionInfo.AMCV, DoseTypeCode.TITRATED, "EPR", PatientContext.PrescriptionType);
                    objTitrated.DataContext = MultiDoseDetailVM;
                    objTitrated.onDialogClose = this.objTitrated_Closed;
                    AppActivity.OpenWindow(sDrugName, objTitrated, (e)=>this.objTitrated_Closed(e), "", false, 350, 480, false, WindowButtonType.Close, null);
                }
            }
            else {
                // To Do story 34284 and 34285 - revisit

                  let objStepped: MedSteppedFullPrescriptionVW = new MedSteppedFullPrescriptionVW();
                  objStepped.oLaunchFrom = SVIconLaunchFrom.MedChart;
                  objStepped.sPrescriptionTypeCode = PrescriptionTypes.ForAdministration;
                  Busyindicator.SetStatusBusy("SteppenFullPrescription");
                  let MultiDoseDetailVM: MultipleDoseDetail = new MultipleDoseDetail(PrescriptionItemOID, AppSessionInfo.AMCV, sDoseType, "EPR", PatientContext.PrescriptionType);
                 
                  let temp =  MultiDoseDetailVM.PresItemDoseInfoServicedata.subscribe(()=> {                     
                  	objStepped.DataContext = MultiDoseDetailVM;
                  	objStepped.sInfusionType = sInfusiontype;
                  	objStepped.onDialogClose = this.MedSteppedDose_Closed;
                  	AppActivity.OpenWindow(sDrugName + " - LORENZO -- Webpage Dialog", objStepped, this.MedSteppedDose_Closed, "", false, 600, 950, false, WindowButtonType.Close, null);
                    temp.unsubscribe(); 
                    });
                }
        }
        omedobjConditional_Closed(args: AppDialogEventargs): void {
            args.AppChildWindow.DialogResult = true;
        }
        private objTitrated_Closed(args: AppDialogEventargs): void {
            this.IsTitratedIconClicked = false;
            args.AppChildWindow.DialogResult = true;
        }
        private MedSteppedDose_Closed(args: AppDialogEventargs): void {
            args.AppChildWindow.DialogResult = true;
        }
        public LaunchMultiComponentItemDetails(nMedCharOId: number, sItemName: string): void {
            let oMedMCItems: medMCItems = new medMCItems();
            oMedMCItems.constructorimpl(nMedCharOId, sItemName, String.Empty);
            // ObjectHelper.stopFinishAndCancelEvent(true);
            AppActivity.OpenWindow(sItemName, oMedMCItems, (e)=>this.oMedMCItems_Closed(e), sItemName, false, 400, 600, false, WindowButtonType.Close, null);
        }
        oMedMCItems_Closed(args: AppDialogEventargs): void {
            // ObjectHelper.stopFinishAndCancelEvent(false);
            args.AppChildWindow.DialogResult = true;
        }
        objrecordadminmainview: InfRecAdmMainView;
        public LaunchRecordadmininfusion(oClickedSlotTagObject: InfusionTagObject, CanBeStruckThrough: boolean, IsAlertShown: boolean): void {
            let oHdrRecordAdmin: CDrugHdrAddnlInfo = new CDrugHdrAddnlInfo();
            let oTagDrugHeaderDetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(oClickedSlotTagObject.oDrugItem.Tag, TagDrugHeaderDetail);
            this.SetVMProperties(oClickedSlotTagObject, oHdrRecordAdmin);
            this.oinfusrecordvm.bIsAlertRequired = IsAlertShown;
            this.objrecordadminmainview = new InfRecAdmMainView();
            this.objrecordadminmainview.InitilizeView(this.oinfusrecordvm);
            this.SetDrugHeaderProperties(oClickedSlotTagObject, oHdrRecordAdmin, this.objrecordadminmainview, CanBeStruckThrough, IsAlertShown);
            if (this.oinfusrecordvm.FormVM != null) {
                if (this.oinfusrecordvm.oTagDrugHeaderDetail != null) {
                    this.oinfusrecordvm.PresLorenzoID = this.oinfusrecordvm.oTagDrugHeaderDetail.LorenzoID;
                    this.oinfusrecordvm.RouteOID = this.oinfusrecordvm.oTagDrugHeaderDetail.RouteOID;
                    this.oinfusrecordvm.IsControlledDrug = this.oinfusrecordvm.oTagDrugHeaderDetail.IsControlDrug;
                }
                if (this.oinfusrecordvm != null) {
                    this.oinfusrecordvm.oIChartSlot = oClickedSlotTagObject;
                }
                AppActivity.OpenWindow("Record administration infusion", this.objrecordadminmainview,(e)=> this.objRecordadmininfusion_Closed(e), "Record administration infusion", true, 650, 800, true, WindowButtonType.OkCancel, null);
            }
        }
        private SetVMProperties(oClickedSlotTagObject: InfusionTagObject, oHdrRecordAdmin: CDrugHdrAddnlInfo): void {
            let oTagDrugHeaderDetail: TagDrugHeaderDetail = null;
            this.oSlotDetail = ObjectHelper.CreateType<SlotDetail>(oClickedSlotTagObject.oChartCell.Tag, SlotDetail);
            let TempInfType: string = String.Empty;
            if (this.oSlotDetail != null) {
                oHdrRecordAdmin.DueAt = this.oSlotDetail.ScheduledDTTM.ToUserDateTimeString(CConstants.DateTimeFormat);
                if (this.oSlotDetail.AdministrationDetail != null && (DateTime.NotEquals(this.oSlotDetail.AdministrationDetail.AdministeredDate , DateTime.MinValue)))
                    oHdrRecordAdmin.RecordedAt = this.oSlotDetail.AdministrationDetail.AdministeredDate.ToUserDateTimeString(CConstants.DateTimeFormat);
            }
            if (oClickedSlotTagObject != null && oClickedSlotTagObject.oDrugItem != null && oClickedSlotTagObject.oDrugItem.Tag != null && oClickedSlotTagObject.oDrugItem.Tag instanceof TagDrugHeaderDetail) {
                oTagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(oClickedSlotTagObject.oDrugItem.Tag, TagDrugHeaderDetail);
                if (!String.IsNullOrEmpty(oTagDrugHeaderDetail.INFTYCODE)) {
                    TempInfType = oTagDrugHeaderDetail.INFTYCODE;
                }
                else if (!String.IsNullOrEmpty(oTagDrugHeaderDetail.ItemSubType)) {
                    TempInfType = oTagDrugHeaderDetail.ItemSubType;
                }
                if (DateTime.NotEquals(oTagDrugHeaderDetail.ReviewDTTM , DateTime.MinValue)) {
                    oHdrRecordAdmin.ReviewAt = oTagDrugHeaderDetail.ReviewDTTM.ToUserDateTimeString(CConstants.DateTimeFormat);
                    if (DateTime.LessThanOrEqualTo(oTagDrugHeaderDetail.ReviewDTTM.Date , CommonBB.GetServerDateTime().Date)) {
                        oHdrRecordAdmin.ReviewAtVisibility = Visibility.Visible;
                        oHdrRecordAdmin.ReviewIconTooltip = Common.GetReviewIconTooltip(oTagDrugHeaderDetail.ReviewType, oTagDrugHeaderDetail.ReviewDTTM, oTagDrugHeaderDetail.ReviewRequestedComments, oTagDrugHeaderDetail.ReviewRequestedby);
                    }
                }
            }
            this.oinfusrecordvm = new InfrecordadminVM();
            this.oinfusrecordvm.InitialiseVM(TempInfType);
            this.oinfusrecordvm.oTagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(oClickedSlotTagObject.oDrugItem.Tag, TagDrugHeaderDetail);
            if (!String.IsNullOrEmpty(this.oinfusrecordvm.Dose)) {
                let sDose: string[] = oClickedSlotTagObject.oDrugItem.Dose.Split(' ');
                this.oinfusrecordvm.Dose = sDose[0];
            }
            if (this.oSlotDetail != null) {
                this.oinfusrecordvm.PresScheduleOID = this.oSlotDetail.OID;
                this.oinfusrecordvm.InfSlotStatus = this.oSlotDetail.Status;
                this.oinfusrecordvm.MedAdminOID = this.oSlotDetail.AdministrationDetail.MedAdminOID;
                this.oinfusrecordvm.SlotDate = this.oSlotDetail.ScheduledDTTM;
            }
            this.oinfusrecordvm.IsParacetamolIngredient = oTagDrugHeaderDetail.IsParacetamolIngredient;
            this.oinfusrecordvm.InfusionRecordAdminTypeCode = oTagDrugHeaderDetail.InfusionRecordAdminTypeCode;
            if (this.oinfusrecordvm.InfusionRecordAdminTypeCode == InfusionRecordAdminTypeCodes.ContinuousSequentialAdministration) {
                this.oinfusrecordvm.SequentialPrescItemOID = oTagDrugHeaderDetail.SequentialPrescriptionItemOID;
            }
            else if (this.oinfusrecordvm.InfusionRecordAdminTypeCode == InfusionRecordAdminTypeCodes.AmendmentAlertAdministration) {
                this.oinfusrecordvm.AmendedPrescriptionItemOID = oTagDrugHeaderDetail.AmendedParentPrescriptionItemOID;
            }
            if (oClickedSlotTagObject != null && oClickedSlotTagObject.oDrugItem != null && oClickedSlotTagObject.oDrugItem.Tag != null && oClickedSlotTagObject.oDrugItem.Tag instanceof TagDrugHeaderDetail) {
                this.oinfusrecordvm.IdentifyingOID = oTagDrugHeaderDetail.DrugIdentifyingOID;
                this.oinfusrecordvm.IdentifyingType = oTagDrugHeaderDetail.DrugIdentifyingType;
                this.oinfusrecordvm.PrescriptionItemOID = !String.IsNullOrEmpty(oClickedSlotTagObject.oDrugItem.Key) ? Convert.ToInt64(oClickedSlotTagObject.oDrugItem.Key) : 0;
                this.oinfusrecordvm.InfusionType = ObjectHelper.CreateObject(new CListItem(), { Value: oTagDrugHeaderDetail.INFTYCODE });
                this.oinfusrecordvm.PrescriptionItemStatus = oTagDrugHeaderDetail.PrescriptionItemStatus;
                this.oinfusrecordvm.MCVersionNo = oTagDrugHeaderDetail.MCVersionNo;
                this.oinfusrecordvm.Lorenzoid = oTagDrugHeaderDetail.LorenzoID;
                this.oinfusrecordvm.ItemSubType = oTagDrugHeaderDetail.ItemSubType;
                this.oinfusrecordvm.Multicomponentitem = String.Join("^", oTagDrugHeaderDetail.MultiComponentItems.ToArray());
                this.oinfusrecordvm.PrescriptionStartDate = oTagDrugHeaderDetail.StartDate;
                this.oinfusrecordvm.PrescriptionEndDate = oTagDrugHeaderDetail.EndDate;
                this.oinfusrecordvm.DoseType = oTagDrugHeaderDetail.DoseType;
                if (oTagDrugHeaderDetail.InfChartAlerts != null && oTagDrugHeaderDetail.InfChartAlerts.Count > 0) {
                    this.oinfusrecordvm.AmendmentAlert = oTagDrugHeaderDetail.InfChartAlerts.Any(o=>{o=InfChartAlert.AMENDMENT_ALERT});
                    this.oinfusrecordvm.ChangeFlowRateAlert = oTagDrugHeaderDetail.InfChartAlerts.Any(o=>{o=InfChartAlert.FLOW_RATE_CHANGE_ALERT});
                    this.oinfusrecordvm.ChangeConcentrationAlert = oTagDrugHeaderDetail.InfChartAlerts.Any(o=>{o=InfChartAlert.CONCENTRATION_CHANGE_ALERT});
                    this.oinfusrecordvm.ChangeRateAndConcentrationAlert = oTagDrugHeaderDetail.InfChartAlerts.Any(o=>{o=InfChartAlert.RATE_N_CONCENTRATION_CHANGE_ALERT});
                    this.oinfusrecordvm.DiscontinueAlert = oTagDrugHeaderDetail.InfChartAlerts.Any(o=>{o=InfChartAlert.DISCONTINUATION_ALERT});
                    this.oinfusrecordvm.DueAlert = oTagDrugHeaderDetail.InfChartAlerts.Any(o=>{o=InfChartAlert.DUE_ALERT});
                    this.oinfusrecordvm.OverDueAlert = oTagDrugHeaderDetail.InfChartAlerts.Any(o=>{o=InfChartAlert.OVERDUE_ALERT});
                    this.oinfusrecordvm.InfusionPeriodCompletedAlert = oTagDrugHeaderDetail.InfChartAlerts.Any(o=>{o=InfChartAlert.INFUSION_PERIOD_COMPLETED_ALERT});
                    this.oinfusrecordvm.CondDoseMonitoringPeriodAlert = oTagDrugHeaderDetail.InfChartAlerts.Any(o=>{o=InfChartAlert.COND_DOSE_MONITORING_PER_ALERT});
                }
                let tempInfRate: string = String.Empty;
                let tempInfRateUom: string = String.Empty;
                let tempInfRatePerUom: string = String.Empty;
                if (!String.IsNullOrEmpty(oTagDrugHeaderDetail.Rate)) {
                    tempInfRate = oTagDrugHeaderDetail.Rate;
                }
                if (!String.IsNullOrEmpty(oTagDrugHeaderDetail.RateNumeratorUOM)) {
                    tempInfRateUom = oTagDrugHeaderDetail.RateNumeratorUOM;
                }
                if (!String.IsNullOrEmpty(oTagDrugHeaderDetail.RateDinominatorUOM)) {
                    if (!String.IsNullOrEmpty(tempInfRateUom)) {
                        tempInfRateUom += "/" + oTagDrugHeaderDetail.RateDinominatorUOM;
                    }
                }
                if (!String.IsNullOrEmpty(tempInfRate) && !String.IsNullOrEmpty(tempInfRateUom)) {
                    this.oinfusrecordvm.InfusionRateValue = tempInfRate + " " + tempInfRateUom;
                }
                if (!String.IsNullOrEmpty(oTagDrugHeaderDetail.DrugName)) {
                    this.oinfusrecordvm.DrugName = oTagDrugHeaderDetail.DrugName;
                }
            }
        }
        private SetDrugHeaderProperties(oClickedSlotTagObject: InfusionTagObject, oHdrRecordAdmin: CDrugHdrAddnlInfo, objrecordadminmainview: InfRecAdmMainView, CanBeStruckThrough: boolean, IsAlertShown: boolean): void {
           //Revisit the commented lines stub html has been created-> lorappmedicationadminbbui\child\InfRecAdmMainView.ts
            if (oClickedSlotTagObject != null && oHdrRecordAdmin != null) {
                objrecordadminmainview.objDrugHeader.oDrugHeader = new CDrugHeader();
                objrecordadminmainview.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo = new DrugHeaderItem();
                objrecordadminmainview.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowFrequency = true;
                objrecordadminmainview.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowSite = true;
                objrecordadminmainview.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowAsrequired = true;
                if (oHdrRecordAdmin != null)
                    oHdrRecordAdmin.RecordAdminViewed = RecordAdminType.InfusionRecordAdmin;
                objrecordadminmainview.objDrugHeader.DataContext = Common.SetDrugHeaderContent(oClickedSlotTagObject.oDrugItem, oHdrRecordAdmin, objrecordadminmainview.objDrugHeader);
                this.oinfusrecordvm.bIsAlertRequired = IsAlertShown;
                objrecordadminmainview.DataContext = this.oinfusrecordvm;
                objrecordadminmainview.CanBeStruckThrough = CanBeStruckThrough;
                objrecordadminmainview.IsAlertShown = IsAlertShown;
            }
        }
        objRecordadmininfusion_Closed(args: AppDialogEventargs): void {
            if (args.Result == AppDialogResult.Ok) {
                if (!String.IsNullOrEmpty(this.oinfusrecordvm.InfusionAction)) {
                    this.oinfusrecordvm.FormVM.ValidateAndSubmitForm();
                }
                else {
                    args.AppChildWindow.DialogResult = false;
                }
            }
            else if (args.Result == AppDialogResult.Cancel) {
                args.AppChildWindow.DialogResult = false;
            }
        }
        private _ChartStatusDisplayText: string = String.Empty;
        public get ChartStatusDisplayText(): string {
            return this._ChartStatusDisplayText;
        }
        public set ChartStatusDisplayText(value: string) {
            if (!Helper.ReferenceEquals(this._ChartStatusDisplayText, value)) {
                this._ChartStatusDisplayText = value;
                ////NotifyPropertyChanged("ChartStatusDisplayText");
            }
        }
        private _PatientInfoDisplayText: string = String.Empty;
        public get PatientInfoDisplayText(): string {
            return this._PatientInfoDisplayText;
        }
        public set PatientInfoDisplayText(value: string) {
            if (!Helper.ReferenceEquals(this._PatientInfoDisplayText, value)) {
                this._PatientInfoDisplayText = value;
                ////NotifyPropertyChanged("PatientInfoDisplayText");
            }
        }
        private _OverDueSlotsColor: SolidColorBrush;
        public get OverDueSlotsColor(): SolidColorBrush {
            return this._OverDueSlotsColor;
        }
        public set OverDueSlotsColor(value: SolidColorBrush) {
            if (!Helper.ReferenceEquals(this._OverDueSlotsColor, value)) {
                this._OverDueSlotsColor = value;
                ////NotifyPropertyChanged("OverDueSlotsColor");
            }
        }
        private _DueSlotsColor: SolidColorBrush;
        public get DueSlotsColor(): SolidColorBrush {
            return this._DueSlotsColor;
        }
        public set DueSlotsColor(value: SolidColorBrush) {
            if (!Helper.ReferenceEquals(this._DueSlotsColor, value)) {
                this._DueSlotsColor = value;
                ////NotifyPropertyChanged("DueSlotsColor");
            }
        }
        private _InProgressSlotsColor: SolidColorBrush;
        public get InProgressSlotsColor(): SolidColorBrush {
            return this._InProgressSlotsColor;
        }
        public set InProgressSlotsColor(value: SolidColorBrush) {
            if (!Helper.ReferenceEquals(this._InProgressSlotsColor, value)) {
                this._InProgressSlotsColor = value;
                ////NotifyPropertyChanged("InProgressSlotsColor");
            }
        }
        private _AsRequiredSlotsColor: SolidColorBrush;
        public get AsRequiredSlotsColor(): SolidColorBrush {
            return this._AsRequiredSlotsColor;
        }
        public set AsRequiredSlotsColor(value: SolidColorBrush) {
            if (!Helper.ReferenceEquals(this._AsRequiredSlotsColor, value)) {
                this._AsRequiredSlotsColor = value;
                ////NotifyPropertyChanged("AsRequiredSlotsColor");
            }
        }
        private _oChartRows: ObservableCollection<InfusionChartRow>;
        public set oChartRows(value: ObservableCollection<InfusionChartRow>) {
            if (!Helper.ReferenceEquals(this._oChartRows, value)) {
                this._oChartRows = value;
            }
        }
        public get oChartRows(): ObservableCollection<InfusionChartRow> {
            return this._oChartRows;
        }
        public get StartDTTM(): DateTime{
            return this.startDTTM;
        }
        public set StartDTTM(value: DateTime) {
            this.startDTTM = value;
            ////NotifyPropertyChanged("StartDTTM");
        }
        public get EndDTTM(): DateTime{
            return this.endDTTM;
        }
        public set EndDTTM(value: DateTime) {
            this.endDTTM = value;
            ////NotifyPropertyChanged("EndDTTM");
        }
        public get CurrentDTTM(): DateTime{
            return this.currentDTTM;
        }
        public set CurrentDTTM(value: DateTime) {
            this.currentDTTM = value;
            ////NotifyPropertyChanged("CurrentDTTM");
        }
        public get CurrentPageView(): number {
            this.currentPage = 2;
            let _TmpCurrentTime: DateTime= CommonBB.GetServerDateTime().AddSeconds(-this.currentDTTM.Second);
            if (_TmpCurrentTime > this.EndDTTM)
                this.currentPage = 1;
            else if (_TmpCurrentTime < this.StartDTTM)
                this.currentPage = 3;
            return this.currentPage;
        }
        private _InfChartViewMinStartTime: DateTime= DateTime.MinValue;
        public get InfChartViewMinStartTime(): DateTime{
            return this._InfChartViewMinStartTime;
        }
        public set InfChartViewMinStartTime(value: DateTime) {
            this._InfChartViewMinStartTime = value;
            //NotifyPropertyChanged("InfChartViewMinStartTime");
        }
        private _InfChartViewMaxStartTime: DateTime= DateTime.MinValue;
        public get InfChartViewMaxStartTime(): DateTime{
            return this._InfChartViewMaxStartTime;
        }
        public set InfChartViewMaxStartTime(value: DateTime) {
            this._InfChartViewMaxStartTime = value;
            //NotifyPropertyChanged("InfChartViewMaxStartTime");
        }
        private _NavDirection: eDirection;
        public get NavDirection(): eDirection {
            return this._NavDirection;
        }
        public set NavDirection(value: eDirection) {
            this._NavDirection = value;
            //NotifyPropertyChanged("NavDirection");
        }
        private _OverDueCount: number;
        public get OverDueCount(): number {
            return this._OverDueCount;
        }
        public set OverDueCount(value: number) {
            this._OverDueCount = value;
            //NotifyPropertyChanged("OverDueCount");
        }
        private _DuenowCount: number;
        public get DuenowCount(): number {
            return this._DuenowCount;
        }
        public set DuenowCount(value: number) {
            this._DuenowCount = value;
            //NotifyPropertyChanged("DuenowCount");
        }
        private _InprogressCount: number;
        public get InprogressCount(): number {
            return this._InprogressCount;
        }
        public set InprogressCount(value: number) {
            this._InprogressCount = value;
            //NotifyPropertyChanged("InprogressCount");
        }
        private _AsrequiredCount: number;
        public get AsrequiredCount(): number {
            return this._AsrequiredCount;
        }
        public set AsrequiredCount(value: number) {
            this._AsrequiredCount = value;
            //NotifyPropertyChanged("AsrequiredCount");
        }
        public SlotPreviousStatus: string;
        public UpdateSummaryBar(objSlotDetail: SlotDetail, isRowRefresh: boolean): void {
            if (objSlotDetail != null) {
                if (isRowRefresh) {
                    if (!String.IsNullOrEmpty(this.SlotPreviousStatus)) {
                        if (String.Compare(this.SlotPreviousStatus, objSlotDetail.Status) != 0) {
                            this.DecrementSummaryBarCount(this.SlotPreviousStatus);
                            this.IncrementSummaryBarCount(objSlotDetail.Status);
                        }
                    }
                }
                else {
                    this.IncrementSummaryBarCount(objSlotDetail.Status);
                }
            }
        }
        private IncrementSummaryBarCount(sStatus: string): void {
            if (!String.Equals(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.InvariantCultureIgnoreCase) && (String.Compare(sStatus, SlotStatus.DUENOW, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(sStatus, SlotStatus.DEFERDUENOW, StringComparison.CurrentCultureIgnoreCase) == 0))
                this.DuenowCount++;
            else if (!String.Equals(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.InvariantCultureIgnoreCase) && (String.Compare(sStatus, SlotStatus.OVERDUE, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(sStatus, SlotStatus.DEFEROVERDUE, StringComparison.CurrentCultureIgnoreCase) == 0))
                this.OverDueCount++;
            else if (String.Compare(sStatus, SlotStatus.INPROGRESS, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(sStatus, SlotStatus.PAUSED, StringComparison.CurrentCultureIgnoreCase) == 0)
                this.InprogressCount++;
        }
        private DecrementSummaryBarCount(sStatus: string): void {
            if (!String.Equals(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.InvariantCultureIgnoreCase) && (String.Compare(sStatus, SlotStatus.DUENOW, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(sStatus, SlotStatus.DEFERDUENOW, StringComparison.CurrentCultureIgnoreCase) == 0))
                this.DuenowCount--;
            else if (!String.Equals(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.InvariantCultureIgnoreCase) && (String.Compare(sStatus, SlotStatus.OVERDUE, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(sStatus, SlotStatus.DEFEROVERDUE, StringComparison.CurrentCultureIgnoreCase) == 0))
                this.OverDueCount--;
            else if (String.Compare(sStatus, SlotStatus.INPROGRESS, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(sStatus, SlotStatus.PAUSED, StringComparison.CurrentCultureIgnoreCase) == 0)
            if(this.InprogressCount > 0)
                    this.InprogressCount--;   
            
        }
        public SetCurrentDTTM(): void {
            this.CurrentDTTM = CommonBB.GetServerDateTime();
            let _EvenStartTime: DateTime= (this.CurrentDTTM.Hour % 2 == 0) ? this.CurrentDTTM : this.CurrentDTTM.AddHours(-1);
            let _StartTime: DateTime= new DateTime(_EvenStartTime.Year, _EvenStartTime.Month, _EvenStartTime.Day, _EvenStartTime.Hour, 0, 0, DateTimeKind.Unspecified);
            this.InfChartViewMinStartTime = _StartTime.AddHours(-36);
            this.InfChartViewMaxStartTime = _StartTime.AddHours(12);
            if (this.NavDirection == eDirection.Backward && (DateTime.GreaterThan(this.StartDTTM , this.InfChartViewMinStartTime))) {
                this.StartDTTM = this.StartDTTM.AddHours(-CConstants.navDurationHrs);
                this.EndDTTM = this.StartDTTM.AddHours(24).AddSeconds(-1);
            }
            else if (this.NavDirection == eDirection.Forward && (DateTime.LessThan(this.StartDTTM , this.InfChartViewMaxStartTime))) {
                this.StartDTTM = this.StartDTTM.AddHours(CConstants.navDurationHrs);
                this.EndDTTM = this.StartDTTM.AddHours(24).AddSeconds(-1);
            }
            else {
                this.StartDTTM = _StartTime.AddHours(-12);
                this.EndDTTM = this.StartDTTM.AddHours(24).AddSeconds(-1);
            }
        }
        public ParacetamolAdminCount: number;
        public IsParaIngDrug: boolean;
        private _IsPrescribeEnabled: boolean;
        private _PrescribeCommand: RelayCommand;
        public GetIsPrescribeEnabled(): boolean {
            return this._IsPrescribeEnabled;
        }
        public get IsPrescribeEnabled(): boolean {
            return this._IsPrescribeEnabled;
        }
        private set IsPrescribeEnabled(value: boolean) {
            this._IsPrescribeEnabled = value;
            this.PrescribeCommand = new RelayCommand(()=>this.LaunchPrescribeWizard, ()=>this.GetIsPrescribeEnabled);
        }
        public get PrescribeCommand(): RelayCommand {
            return this._PrescribeCommand;
        }
        public set PrescribeCommand(value: RelayCommand) {
            if (!Helper.ReferenceEquals(this._PrescribeCommand, value)) {
                this._PrescribeCommand = value;
                //NotifyPropertyChanged("PrescribeCommand");
            }
        }
        public LaunchPrescribeWizard(): void {
            if (!this.isClinEncMesToBeLaunchd) {
                this.isClinEncMesToBeLaunchd = true;
                let objService1: IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
                objService1.GetClinicalEncountersDetailCompleted  = (s,e) => { this.objService1_GetClinicalEncountersDetailCompleted(s,e); } ;
                let objReq1: IPPManagePrescSer.CReqMsgGetClinicalEncountersDetail = new IPPManagePrescSer.CReqMsgGetClinicalEncountersDetail();
                objReq1.oContextInformation = CommonBB.FillContext();
                objReq1.lnEncounterOIDBC = ChartContext.EncounterOID;
                objReq1.lnPatientOIDBC = ChartContext.PatientOID;
                objService1.GetClinicalEncountersDetailAsync(objReq1);
            }
        }
        public objService1_GetClinicalEncountersDetailCompleted(sender: Object, e: GetClinicalEncountersDetailCompletedEventArgs): void {
            if (e.Error == null && e.Result != null && !String.IsNullOrEmpty(e.Result.sClinicalEncDet)) {
                this.ShowErrorMessage((s,e) => { this.iMsgBox_MessageBoxClose(s,e); },"There are active for administration prescriptions for this patient from " + e.Result.sClinicalEncDet + ", Please review and remove any that are no longer relevant", MessageBoxButton.OK, MessageBoxType.Exclamation,CConstants.InfusionWarning,160,410);
            }
            else this.LaunchPrescribeWizardSecondary();
        }
        iMsgBox: iMessageBox;
        ShowErrorMessage(ocallback:Function, sErrorMsg: string, oMessageBoxButton: MessageBoxButton, oMessageBoxType: MessageBoxType, MsgBoxTag: Object = null, MsgBoxHeight: number = null, MsgBoxWidth: number = null, title?:string): void {
            if (!String.IsNullOrEmpty(sErrorMsg)) {
                this.iMsgBox = ObjectHelper.CreateObject(new iMessageBox(), {
                    Title: title ? title :"LORENZO",
                    Message: sErrorMsg,
                    MessageButton: oMessageBoxButton,
                    IconType: oMessageBoxType
                });
                if (MsgBoxHeight.HasValue)
                    this.iMsgBox.Height = MsgBoxHeight.Value;
                if (MsgBoxWidth.HasValue)
                    this.iMsgBox.Width = MsgBoxWidth.Value;
                this.iMsgBox.OverlayBrush = new SolidColorBrush(Colors.Transparent);
                this.iMsgBox.MessageBoxClose  = ocallback ;
                this.iMsgBox.Show();
            }
        }
        iMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
            //if (this.iMsgBox != null)
            //     this.iMsgBox.Close();
         this.LaunchPrescribeWizardSecondary();
        }
        private async LaunchPrescribeWizardSecondary(): Promise<void> {
            this.isClinEncMesToBeLaunchd = false;
            let bIscancel: boolean = false;
            Common.GPCConsentVerifyStatus = String.Empty;
            if (!String.IsNullOrEmpty(ChartContext.MedchartLaunchLoc) && ChartContext.MedchartLaunchLoc.Equals("VW_PTLST")) {
                if (PatientContext.EncounterOid <= 0) {
                    this.SelectEncounter((o) => { bIscancel = o; });
                    if (!bIscancel && PatientContext.EncounterOid > 0 && !String.IsNullOrEmpty(PatientContext.EncounterType)) {
                        await this.RecordAllergyforInpatientPrescribe(PatientContext.EncounterOid.ToString(), PatientContext.EncounterType);
                    }
                }
                else {
                    await this.RecordAllergyforInpatientPrescribe(PatientContext.EncounterOid.ToString(), PatientContext.EncounterType);
                }
            }
            else {
                await this.RecordAllergyforInpatientPrescribe(PatientContext.EncounterOid.ToString(), PatientContext.EncounterType);
            }
        }
        async RecordAllergyforInpatientPrescribe(EncounterOid: string, EncounterType: string): Promise<void> {
            let menucode: string = String.Empty;
            if (String.Equals(EncounterType, CConstants.InpatientEncValue, StringComparison.CurrentCultureIgnoreCase)) {
                menucode = PrescriptionTypesMenuCode.Inpatient;
            }
            else {
                menucode = PrescriptionTypesMenuCode.ForAdministration;
            }
            let CONFALRGY: string = "MN_HI_CONFALRGY";
            let Allergylaunch: ScriptObject = null;
        //    Allergylaunch = await  ObjectHelper.CreateType<ScriptObject>(HtmlPage.Window.InvokeAsync("LaunchAllergyCheckedforChartMedication", menucode, EncounterType, PatientContext.EncounterOid > 0 ? true : false, EncounterOid), ScriptObject);
           
        //     if (Allergylaunch != null && Allergylaunch.GetProperty("LaunchCA") != null && !String.IsNullOrEmpty(Allergylaunch.GetProperty("LaunchCA").ToString())) {
            
        let result_sp = await ObjectHelper.CreateType<ScriptObject>(HtmlPage.Window.InvokeAsync("LaunchAllergyCheckedforChartMedication", menucode, EncounterType, PatientContext.EncounterOid > 0 ? true : false, EncounterOid), ScriptObject);
           
            if(result_sp.returnData)
            {
                let result =  {Response:result_sp.GetProperty("result").Response};
                let oReturn = result_sp.GetProperty("oReturn");
                //this.sMenuCode = sMenuCode;
                if (result.Response.AllergyPromptRequired != null && result.Response.AllergyPromptRequired != "" && result.Response.AllergyPromptRequired == "True") {
                    
                        let callbackResult=  (sender: Object, e: MessageEventArgs) => {
                                    if (e && e.MessageBoxResult &&e.MessageBoxResult == MessageBoxResult.OK) {
                                        this.OnPrescribelaunch(PrescriptionTypesMenuCode.AllergyChecked, EncounterType, EncounterOid);                    
                                    }             
                                };            
                        this.ShowErrorMessage(callbackResult ,"Please review medication related allergies/ADRs and update if necessary before proceeding.", MessageBoxButton.OKCancel, MessageBoxType.Information,CConstants.InfusionWarning,160,410,"Information - LORENZO");
                            
               
            }
            
            else if (oReturn["LaunchCA"] == menucode) {
                    this.LaunchPrescribeCareActivity(EncounterOid, EncounterType);
                }
            }
            else {
                this.LaunchPrescribeCareActivity(EncounterOid, EncounterType);
            }
        }
        async LaunchPrescribeCareActivity(EncounterOid: string, EncounterType: string): Promise<void> {
            let oParam: string[] = new Array(3);
            let sMenuCode: string = String.Empty;
            let sprompt: string = "CAlaunch";
            if ((String.Compare(EncounterType, CConstants.InpatientEncValue) == 0) || (String.Compare(EncounterType, CConstants.InaptientEncText) == 0)) {
                sMenuCode = PrescriptionTypesMenuCode.Inpatient;
                EncounterType = CConstants.InpatientEncValue;
                let sLockingMessage: string = String.Empty;
                let clerkcheck: string = String.Empty;
                clerkcheck = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("GetMedclerkPromptValue", sMenuCode, PatientContext.PatientOID, EncounterOid, "EPR", ""), "string");
                if (!String.IsNullOrEmpty(clerkcheck) && String.Equals(clerkcheck, "true")) {
                    let _LockedUsersDetails: LockedUsersDetails;
                    let IsLocked: boolean = MedicationCommonBB.IsLockedByAnotherUser(PrescriptionTypesMenuCode.Clerking, true, (o) => { _LockedUsersDetails = o; });
                    if (_LockedUsersDetails != null && !String.IsNullOrEmpty(_LockedUsersDetails.WarningMessage)) {
                        if (!String.IsNullOrEmpty(_LockedUsersDetails.ErrorCode) && String.Equals(_LockedUsersDetails.ErrorCode, CConstants.LockErrorcode, StringComparison.InvariantCultureIgnoreCase)) {
                            this.msg = new iMessageBox();
                            this.msg.Title = "Lorenzo";
                            this.msg.MessageButton = MessageBoxButton.OK;
                            this.msg.Message = _LockedUsersDetails.WarningMessage;
                            this.msg.Show();
                            return 
                        }
                        else if (!String.IsNullOrEmpty(_LockedUsersDetails.ErrorCode) && String.Equals(_LockedUsersDetails.ErrorCode, CConstants.ReadOnlyErrorcode, StringComparison.InvariantCultureIgnoreCase)) {

                        }
                        else if (!String.IsNullOrEmpty(_LockedUsersDetails.ErrorCode) && String.Equals(_LockedUsersDetails.ErrorCode, CConstants.WarningErrorcode, StringComparison.InvariantCultureIgnoreCase)) {

                        }
                    }
                    else {
                        let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", PatientContext.EncounterOid, "MedPrescribeClerking", Common.nLockDuration), "string");
                        sprompt = ObjectHelper.CreateType<string>(await HtmlPage.Window.InvokeAsync("LaunchClerkPrmptFromChartMedication", sMenuCode, EncounterType, PatientContext.PatientOID, EncounterOid), "string");
                    }
                }
            }
            else {
                sMenuCode = PrescriptionTypesMenuCode.ForAdministration;
                EncounterType = CConstants.OutpatientEncValue;
            }
            if (String.Equals(sprompt, "CNFRECCLRK", StringComparison.OrdinalIgnoreCase)) {
                this.OnPrescribelaunch(PrescriptionTypesMenuCode.sclerking, EncounterType, EncounterOid);
            }
            else if (sprompt != null) {
                let _sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", PatientContext.EncounterOid, "MedPrescribeClerking", Common.nLockDuration), "string");
                let _LockedUsersDetails: LockedUsersDetails;
                let IsLocked: boolean = MedicationCommonBB.IsLockedByAnotherUser(sMenuCode, true,(o) => { _LockedUsersDetails = o; } );
                if (_LockedUsersDetails != null && !String.IsNullOrEmpty(_LockedUsersDetails.WarningMessage)) {
                    if (!String.IsNullOrEmpty(_LockedUsersDetails.ErrorCode) && String.Equals(_LockedUsersDetails.ErrorCode, CConstants.LockErrorcode, StringComparison.InvariantCultureIgnoreCase)) {
                        this.msg = new iMessageBox();
                        this.msg.Title = "Lorenzo";
                        this.msg.MessageButton = MessageBoxButton.OK;
                        this.msg.Message = _LockedUsersDetails.WarningMessage;
                        this.msg.Show();
                        return 
                    }
                    else if (!String.IsNullOrEmpty(_LockedUsersDetails.ErrorCode) && String.Equals(_LockedUsersDetails.ErrorCode, CConstants.ReadOnlyErrorcode, StringComparison.InvariantCultureIgnoreCase)) {

                    }
                    else if (!String.IsNullOrEmpty(_LockedUsersDetails.ErrorCode) && String.Equals(_LockedUsersDetails.ErrorCode, CConstants.WarningErrorcode, StringComparison.InvariantCultureIgnoreCase)) {
                        this.msg = new iMessageBox();
                        this.msg.Title = "Lorenzo";
                        this.msg.MessageButton = MessageBoxButton.YesNo;
                        this.msg.MessageBoxClose  = (s,e) => { this.InpatientClickWarning_MessageBoxClose(s,e); } ;
                        this.msg.Message = _LockedUsersDetails.WarningMessage;
                        this.msg.Show();
                    }
                }
                else {
                    let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", MedChartData.MedChartOID, "MedPrescribeInpatient", Common.nLockDuration), "string");
                    //Common.CADataContext.OnClosePrescribeCareActivity -= this.OnClosePrescribeCareActivityEventCompleted;
                    Common.CADataContext.OnClosePrescribeCareActivity  = (s,e,i) => { this.OnClosePrescribeCareActivityEventCompleted(s,e,i); } ;
                    this.OnPrescribelaunch(sMenuCode, EncounterType, EncounterOid);
                }
            }
            else {
                let _sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", PatientContext.EncounterOid, "MedPrescribeClerking", Common.nLockDuration), "string");
            }
           
        }
        public OnClosePrescribeCareActivityEventCompleted(LastLaunchCA: string, CurrentlaunchCA: string, IsAutoSaveGPC: boolean): void {
            if (!Common.IsLockedByAnyUser()) {
                this._ISCanWithoutClerkPrompt = IsAutoSaveGPC;
                let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", PatientContext.EncounterOid, "MedPrescribeClerking", Common.nLockDuration), "string");
                if (!String.Equals(sResult, "false", StringComparison.InvariantCultureIgnoreCase)) {
                    this.OnPrescribelaunch(PrescriptionTypesMenuCode.Clerking, PatientContext.EncounterOid.ToString(), PatientContext.EncounterType);
                }
                this._ISCanWithoutClerkPrompt = false;
            }
        }
        InpatientClickWarning_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
            if (e.MessageBoxResult == MessageBoxResult.Yes) {
                let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", MedChartData.MedChartOID, "MedPrescribeInpatient", Common.nLockDuration), "string");
                let sMenuCode: string = String.Empty;
                if (String.Equals(PatientContext.EncounterType, CConstants.InaptientEncText, StringComparison.InvariantCultureIgnoreCase) || String.Equals(PatientContext.EncounterType, CConstants.InpatientEncValue, StringComparison.InvariantCultureIgnoreCase)) {
                    sMenuCode = PrescriptionTypesMenuCode.Inpatient;
                }
                else {
                    sMenuCode = PrescriptionTypesMenuCode.ForAdministration;
                }
                this.OnPrescribelaunch(sMenuCode, PatientContext.EncounterType, PatientContext.EncounterOid.ToString());
            }
        }
        async OnPrescribelaunch(sMenuCode: string, EncounterType: string, EncounterOid: string): Promise<void> {
            let MedclerkPrompt: string = "YES";
            let clerkingsource: string = String.Empty;
            let sQuery: string = "&MENUCODE=" + sMenuCode;
            sQuery += "&ENCID=" + ChartContext.EncounterOID.ToString();
            sQuery += "&ENCTYPE=" + ChartContext.EncounterType.ToString();
            sQuery += "&IsAllergyPrompted=True";
            sQuery += "&IsLaunchFromChart=True";
            sQuery += "&RequestLockOID=";
            if (String.Equals(sMenuCode, PrescriptionTypesMenuCode.ForAdministration, StringComparison.InvariantCultureIgnoreCase) || String.Equals(sMenuCode, PrescriptionTypesMenuCode.Inpatient, StringComparison.InvariantCultureIgnoreCase)) {
                sQuery += MedChartData.MedChartOID.ToString();
                sQuery += "&GPCConsentStatus=" + Common.GPCConsentVerifyStatus;
            }
            else {
                sQuery += ChartContext.EncounterOID.ToString();
            }
             //RR PAN 216 Fix
             sQuery += "&MedChartPatientOID=" + PatientContext.PatientOID;
             
            this.MedicationAdminBaseVM.sLastCACode = sMenuCode; 
            //this.MedicationAdminBaseVM.PropertyChanged -= new System.ComponentModel.PropertyChangedEventHandler(obj_PropertyChanged);
            this.MedicationAdminBaseVM.PropertyChanged  = (s,e) => { this.obj_PropertyChanged(s,e); } ;
            if (!this._ISCanWithoutClerkPrompt && String.Compare(sMenuCode, PrescriptionTypesMenuCode.sclerking, StringComparison.OrdinalIgnoreCase) == 0) {
                sQuery += "&MedclerkPrompt=" + MedclerkPrompt;
                clerkingsource = ObjectHelper.CreateType<string>( await HtmlPage.Window.InvokeAsync("LaunchMedClerkSourceChartMedication", PatientContext.PatientOID, EncounterOid, MedclerkPrompt), String);
                if (clerkingsource != null) {
                    sQuery += "&CLRKSRC=" + clerkingsource;
                    sQuery += "&GPCConsentStatus=" + Common.GPCConsentVerifyStatus;
                    sQuery += "&sOrgMenucode=" + Common.GetInpatientMedMenucode();
                    AppLoadService.LaunchWizard((args)=>this.OnChildWizardClose(args), sMenuCode, sQuery);
                    //LaunchWizard((args)=>this.OnChildWizardClose(args), sMenuCode, sQuery);
                }
            }
            else if (String.Equals(sMenuCode, PrescriptionTypesMenuCode.AllergyChecked, StringComparison.CurrentCultureIgnoreCase)) {
                sQuery = "&MENUCODE=" + sMenuCode;
                sQuery += "&ENCOUNTEROID=" + PatientContext.EncounterOid.ToString();
                sQuery += "&ENCTYPE=" + PatientContext.EncounterType;
                sQuery += "&IsAllergyPrompted=True";
                AppLoadService.LaunchWizard((args)=>this.OnChildWizardClose(args), sMenuCode, sQuery);
            }
            else {
                sQuery += "&CLRKSRC=";
                if (this._ISCanWithoutClerkPrompt) {
                    sQuery += "&GPCConsentStatus=" + Common.GPCConsentVerifyStatus;
                }
                this.MedicationAdminBaseVM.PropertyChanged  = (s,e) => { this.obj_PropertyChanged(s,e); } ;
                this.MedicationAdminBaseVM.LaunchWizard(sMenuCode, sQuery,2);
            }
        }
        public OnInpatientlaunch(): void {
            let sMenuCode: string = String.Empty;
            let EncounterType: string = String.Empty;
            if ((String.Compare(ChartContext.EncounterType, CConstants.OutpatientEncValue) == 0 || String.Compare(ChartContext.EncounterType, CConstants.AccAndEmerEncValue) == 0 || String.Compare(ChartContext.EncounterType, CConstants.ContactEncValue) == 0) || (String.Compare(ChartContext.EncounterType, CConstants.OutpatientEncText) == 0 || String.Compare(ChartContext.EncounterType, CConstants.AccAndEmerEncText) == 0 || String.Compare(ChartContext.EncounterType, CConstants.ContactEncText) == 0)) {
                sMenuCode = PrescriptionTypesMenuCode.ForAdministration;
                EncounterType = CConstants.OutpatientEncValue;
            }
            else if ((String.Compare(ChartContext.EncounterType, CConstants.InpatientEncValue) == 0) || (String.Compare(ChartContext.EncounterType, CConstants.InaptientEncText) == 0)) {
                sMenuCode = PrescriptionTypesMenuCode.Inpatient;
                EncounterType = CConstants.InpatientEncValue;
            }
            this.OnPrescribelaunch(sMenuCode, EncounterType, ChartContext.EncounterOID.ToString());
        }
        private obj_PropertyChanged(sender: Object, e: PropertyChangedEventArgs): void {
            let sResult: string = String.Empty;
            if (e.PropertyName == "MedsAdminChartViewClosed" || e.PropertyName == "MedsAdminTVClosed" || e.PropertyName == "RequestMedicationClosed") {
                if (e.PropertyName == "MedsAdminChartViewClosed") {
                    this.isPrescribeLinkClicked = true;
                }
                if (e.PropertyName == "MedsAdminTVClosed") {
                    sResult = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", PatientContext.EncounterOid, "MedTVInpatient", Common.nLockDuration), "string");
                }
                MedChartData.PatinetInfo = Common.GetPatientInfo();
                if (this.MedicationAdminBaseVM != null) {
                    this.MedicationAdminBaseVM.SetHeightweightPopUp();
                }
                if (this.OnPropertyChanged != null)
                this.OnPropertyChanged();
            }
            else if (e.PropertyName == "MedsAdminTVClosedCancel") {
                sResult = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", PatientContext.EncounterOid, "MedTVInpatient", Common.nLockDuration), "string");
            }
            else if (e.PropertyName == "MedsAdminChartViewClosedCancel") {
                MedChartData.PatinetInfo = Common.GetPatientInfo();
                if (this.MedicationAdminBaseVM != null) {
                    this.MedicationAdminBaseVM.SetHeightweightPopUp();
                }
            }
            if (e.PropertyName == "RequestMedicationClosedCancel" || e.PropertyName == "RequestMedicationClosed") {
                this.IsReqMedicationLaunched = false;
            }
            if (this.MedicationAdminBaseVM != null) {
                //this.MedicationAdminBaseVM.PropertyChanged -= obj_PropertyChanged;
            }
        }
        public OnChildWizardClose(args: ChildWizardCloseEventargs): void {
            let eWizardAction: LzoWizardAction = CommonBB.GetWizardAction(args.ContextData);
            if (args.ContextData != null) {
                let _CanShownDIConPrmptInGPCTAB: string = String.Empty;
                _CanShownDIConPrmptInGPCTAB = CommonBB.GetValueFromWizardContext(args.ContextData, "CanShownDIConPrmptInGPCTAB");
                if (String.Equals(_CanShownDIConPrmptInGPCTAB, "true", StringComparison.InvariantCultureIgnoreCase)) {
                    Common.GPCConsentVerifyStatus = "1";
                }
                else {
                    Common.GPCConsentVerifyStatus = "0";
                }
            }
            if (!String.IsNullOrEmpty(this.MedicationAdminBaseVM.sLastCACode) && (String.Compare(this.MedicationAdminBaseVM.sLastCACode, PrescriptionTypesMenuCode.sclerking, StringComparison.OrdinalIgnoreCase) == 0)) {
                let _sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", PatientContext.EncounterOid, "MedPrescribeClerking", Common.nLockDuration), "string");
                if (eWizardAction == LzoWizardAction.Finish || eWizardAction == LzoWizardAction.FinishNow) {
                    let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", MedChartData.MedChartOID, "MedPrescribeInpatient", Common.nLockDuration), "string");
                    this.OnInpatientlaunch();
                }
            }
            else if (!String.IsNullOrEmpty(this.MedicationAdminBaseVM.sLastCACode) && String.Equals(this.MedicationAdminBaseVM.sLastCACode, PrescriptionTypesMenuCode.AllergyChecked, StringComparison.CurrentCultureIgnoreCase)) {
                if (eWizardAction == LzoWizardAction.Finish || eWizardAction == LzoWizardAction.FinishNow) {
                    let SetAppsession: ScriptObject = null;
                    if (this.MedicationAdminBaseVM.WizardContext != null) {
                        this.MedicationAdminBaseVM.WizardContext["IsAllergyPrompted"] = "True";
                        this.MedicationAdminBaseVM.WizardContext["IsLaunched"] = "true";
                    }
                    this.MedicationAdminBaseVM.RenderBanner(this.MedicationAdminBaseVM.objTaskInfo);
                    SetAppsession = ObjectHelper.CreateType<ScriptObject>(HtmlPage.Window.Invoke("SetAppsession", "True", PatientContext.EncounterOid, PatientContext.PatientOID), ScriptObject);
                    let EncounterOID: string = String.Empty;
                    let EncounterType: string = String.Empty;
                    if (PatientContext.EncounterOid > 0) {
                        EncounterOID = PatientContext.EncounterOid.ToString();
                    }
                    if (!String.IsNullOrEmpty(PatientContext.EncounterType)) {
                        EncounterType = PatientContext.EncounterType;
                    }
                    this.LaunchPrescribeCareActivity(EncounterOID, EncounterType);
                }
            }
        }
        SelectEncounter(out1: (bIsCancel: boolean) => void): void {
            let bIsCancel: boolean;

            bIsCancel = false;
            let oParam: string[] = new Array(1);
            oParam[0] = PatientContext.PatientOID.ToString();
            let returnValue: Object = HtmlPage.Window.Invoke("LaunchSelectEncounter", oParam);
            if (returnValue != null && returnValue.ToString().length > 0) {
                let arrEncounter: string[] = returnValue.ToString().Split(',');
                let lnEncOID: number;
                for (let i: number = 0; i < arrEncounter.length; i++) {
                    if (Number.TryParse(arrEncounter[0], (o) => (lnEncOID = o)))
                        PatientContext.EncounterOid = lnEncOID;
                    PatientContext.EncounterType = arrEncounter[1].Trim();
                }
            }
            else bIsCancel = true;

            out1(bIsCancel);

        }
        private _IsPrintMedChartEnabled: boolean;
        private _PrintMedChartCommand: RelayCommand;
        public GetIsPrintMedChartEnabled(): boolean {
            return this._IsPrintMedChartEnabled;
        }
        public get IsPrintMedChartEnabled(): boolean {
            return this._IsPrintMedChartEnabled;
        }
        public set IsPrintMedChartEnabled(value: boolean) {
            this._IsPrintMedChartEnabled = value;
            this.PrintMedChartCommand = new RelayCommand(()=>this.LaunchPrintMedChartWizard(),()=> this.GetIsPrintMedChartEnabled());
        }
        public get PrintMedChartCommand(): RelayCommand {
            return this._PrintMedChartCommand;
        }
        public set PrintMedChartCommand(value: RelayCommand) {
            if (!Helper.ReferenceEquals(this._PrintMedChartCommand, value)) {
                this._PrintMedChartCommand = value;
                //NotifyPropertyChanged("PrintMedChartCommand");
            }
        }
        public LaunchPrintMedChartWizard(): void {
            let oRandom: Random = new Random();
            this.MedicationAdminBaseVM.sLastCACode = "MN_PrintMedChart_P2";
            let sQuery: string = String.Empty;
            let ISFIRSTCLICK: string = "Yes";
            sQuery += "&MEDICATIONCHARTOID=" + MedChartData.MedChartOID.ToString();
            sQuery += "&CHARTSTATUS=" + MedChartData.ChartStatus;
            sQuery += "&CHARTSTARTDTTM=" + MedChartData.ActiveFrom.ToString("dd-MMM-yyyy HH:mm");
            if (DateTime.NotEquals(MedChartData.ActiveTo.Date , DateTime.MinValue.Date)) {
                sQuery += "&CHARTENDDTTM=" + MedChartData.ActiveTo.ToString("dd-MMM-yyyy HH:mm");
            }
            else {
                sQuery += "&CHARTENDDTTM=" + DateTime.MinValue.DateTime.ToString("dd-MMM-yyyy HH:mm");
            }
            sQuery += "&PATIENTOID=" + ChartContext.PatientOID.ToString();
            sQuery += "&SRVCPOINTOID=" + MedChartData.ServiceOID.ToString();
            sQuery += "&RNDMOID=" + oRandom.Next().ToString();
            sQuery += "&ISFIRSTCLICK=" + ISFIRSTCLICK;
            this.MedicationAdminBaseVM.LaunchWizard("MN_PrintMedChart_P2", sQuery, WizardType.WIZARD);
        }
        private _IsTechValEnabled: boolean;
        public get IsTechValEnabled(): boolean {
            return this._IsTechValEnabled;
        }
        public set IsTechValEnabled(value: boolean) {
            this._IsTechValEnabled = value;
            //NotifyPropertyChanged("IsTechValEnabled");
        }
        private _IsTechValVisible: Visibility;
        public get IsTechValVisible(): Visibility {
            return this._IsTechValVisible;
        }
        public set IsTechValVisible(value: Visibility) {
            if (this._IsTechValVisible != value) {
                this._IsTechValVisible = value;
                //NotifyPropertyChanged("IsTechValVisible");
            }
        }
        private _IsReqMedicationVisible: Visibility;
        public get IsReqMedicationVisible(): Visibility {
            return this._IsReqMedicationVisible;
        }
        public set IsReqMedicationVisible(value: Visibility) {
            if (this._IsReqMedicationVisible != value) {
                this._IsReqMedicationVisible = value;
                //NotifyPropertyChanged("IsReqMedicationVisible");
            }
        }
        private _MedicationAdminVM: MedicationAdminVM;
        public get MedicationAdminBaseVM(): MedicationAdminVM {
            return this._MedicationAdminVM;
        }
        public set MedicationAdminBaseVM(value: MedicationAdminVM) {
            if (!Helper.ReferenceEquals(this._MedicationAdminVM, value)) {
                this._MedicationAdminVM = value;
                //NotifyPropertyChanged("MedicationAdminBaseVM");
            }
        }
        private _IsPrescribeVisible: Visibility;
        public get IsPrescribeVisible(): Visibility {
            return this._IsPrescribeVisible;
        }
        public set IsPrescribeVisible(value: Visibility) {
            if (this._IsPrescribeVisible != value) {
                this._IsPrescribeVisible = value;
                //NotifyPropertyChanged("IsPrescribeVisible");
            }
        }
        private _IsRecPGDVisible: Visibility;
        public get IsRecPGDVisible(): Visibility {
            return this._IsRecPGDVisible;
        }
        public set IsRecPGDVisible(value: Visibility) {
            if (this._IsRecPGDVisible != value) {
                this._IsRecPGDVisible = value;
                //NotifyPropertyChanged("IsRecPGDVisible");
            }
        }
        private _IsPrintVisible: Visibility;
        public get IsPrintVisible(): Visibility {
            return this._IsPrintVisible;
        }
        public set IsPrintVisible(value: Visibility) {
            if (this._IsPrintVisible != value) {
                this._IsPrintVisible = value;
                //NotifyPropertyChanged("IsPrintVisible");
            }
        }
        private _IsFBVisible: Visibility;
        public get IsFBVisible(): Visibility {
            return this._IsFBVisible;
        }
        public set IsFBVisible(value: Visibility) {
            if (this._IsFBVisible != value) {
                this._IsFBVisible = value;
                //NotifyPropertyChanged("IsFBVisible");
            }
        }
        private _IsFBEnabled: boolean;
        public get IsFBEnabled(): boolean {
            return this._IsFBEnabled;
        }
        public set IsFBEnabled(value: boolean) {
            if (this._IsFBEnabled != value) {
                this._IsFBEnabled = value;
                //NotifyPropertyChanged("IsFBEnabled");
            }
        }
        private _IsRMVisible: Visibility;
        public get IsRMVisible(): Visibility {
            return this._IsRMVisible;
        }
        public set IsRMVisible(value: Visibility) {
            if (this._IsRMVisible != value) {
                this._IsRMVisible = value;
                //NotifyPropertyChanged("IsRMVisible");
            }
        }
        private _IsRMEnabled: boolean;
        public get IsRMEnabled(): boolean {
            return this._IsRMEnabled;
        }
        public set IsRMEnabled(value: boolean) {
            if (this._IsRMEnabled != value) {
                this._IsRMEnabled = value;
                //NotifyPropertyChanged("IsRMEnabled");
            }
        }
        private CheckPermission(): void {
            this.IsRecPGDVisible = (UserPermissions.CanRecordPGD && !MedChartData.IsLaunchFrmPrescribe) ? Visibility.Visible : Visibility.Collapsed;
            this.IsPrescribeVisible = (UserPermissions.CanPrescribe && !MedChartData.IsLaunchFrmPrescribe) ? Visibility.Visible : Visibility.Collapsed;
            this.IsPrintVisible = (UserPermissions.CanPrintMedChart && !MedChartData.IsLaunchFrmPrescribe) ? Visibility.Visible : Visibility.Collapsed;
            this.IsFBVisible = (UserPermissions.CanViewFBChart && !MedChartData.IsLaunchFrmPrescribe) ? Visibility.Visible : Visibility.Collapsed;
            if (this.IsFBVisible == Visibility.Visible)
                this.IsFBEnabled = UserPermissions.CanEnableFBChart;
            if (UserPermissions.CanPrescribe) {
                let _EnablePrescribeCommand: boolean = true;
                if (MedChartData.IsMedChartReadOnly || String.Compare(PatientContext.EncounterCode, CConstants.ENCstatus, StringComparison.CurrentCultureIgnoreCase) == 0)
                    _EnablePrescribeCommand = false;
                this.IsPrescribeEnabled = _EnablePrescribeCommand;
            }
            if (UserPermissions.CanPrintMedChart) {
                let _EnablePrintCommand: boolean = true;
                if (!UserPermissions.CanPrintMedChart || MedChartData.IsMedChartReadOnly)
                    _EnablePrintCommand = false;
                this.IsPrintMedChartEnabled = _EnablePrintCommand;
            }
            if (UserPermissions.CanTechnicallyValidate) {
                this.IsTechValVisible = Visibility.Visible;
                let _EnableTechVCommand: boolean = true;
                if (!UserPermissions.CanTechnicallyValidate || MedChartData.IsMedChartReadOnly)
                    _EnableTechVCommand = false;
                this.IsTechValEnabled = _EnableTechVCommand;
            }
            else {
                this.IsTechValVisible = Visibility.Collapsed;
            }
        }
        public RowRefresh(objResponse: CResMsgRecordInfusionAdministration): void {
            if (objResponse != null && objResponse.oSlotDetail != null) {
                this.oSlotDetail = objResponse.oSlotDetail;
                this.OnRefreshInfusionChart(this.oSlotDetail);
            }
        }
        private SetToolTipValuesForRowRefresh(): void {
            if (this.oinfusrecordvm != null && this.CurrentSlotDetail != null) {
                if (this.oSlotDetail.Status == SlotStatus.INPROGRESS && this.oSlotDetail.AdministrationDetail != null && this.oSlotDetail.AdministrationDetail.MedicationAction == MedicationAction.BEGUN) {
                    let BegunInfusionAction = this.oSlotDetail.AdministrationDetail.oInfusionAdminDetail.Where(c => c.ActionCode == MedicationAction.BEGUN && c.oInfusionBagDetail.BagSequence == 1).Select(s => s).FirstOrDefault();
                    if (BegunInfusionAction != null) {
                        if (this.oinfusrecordvm.BagVolumeUOM != null) {
                            BegunInfusionAction.oInfusionBagDetail.BagVolumeUOM = ObjectHelper.CreateObject(new UOM(), { UOMId: Convert.ToInt64(this.oinfusrecordvm.BagVolumeUOM.Value), UOMName: this.oinfusrecordvm.BagVolumeUOM.DisplayText, UOMCode: this.oinfusrecordvm.BagVolumeUOM.Tag != null ? this.oinfusrecordvm.BagVolumeUOM.Tag.ToString() : String.Empty });
                        }
                        if (!String.IsNullOrEmpty(this.oinfusrecordvm.InfusionRateUOM)) {
                            let infRateUOM: string[] = this.oinfusrecordvm.InfusionRateUOM.Split('/');
                            if (infRateUOM.length > 1) {
                                if (BegunInfusionAction.InfusionRateUOM == null)
                                    BegunInfusionAction.InfusionRateUOM = ObjectHelper.CreateObject(new UOM(), { UOMName: infRateUOM[0] });
                                else BegunInfusionAction.InfusionRateUOM.UOMName = infRateUOM[0];
                                if (BegunInfusionAction.InfusionRatePerUOM == null)
                                    BegunInfusionAction.InfusionRatePerUOM = ObjectHelper.CreateObject(new UOM(), { UOMName: infRateUOM[1] });
                                else BegunInfusionAction.InfusionRatePerUOM.UOMName = infRateUOM[1];
                            }
                        }
                        if (!String.IsNullOrEmpty(this.oinfusrecordvm.DripRateUOM)) {
                            let infDripRateUOM: string[] = this.oinfusrecordvm.DripRateUOM.Split('/');
                            if (infDripRateUOM.length > 1) {
                                if (BegunInfusionAction.InfusionRateUOM == null)
                                    BegunInfusionAction.InfusionRateUOM = ObjectHelper.CreateObject(new UOM(), { UOMName: infDripRateUOM[0] });
                                else BegunInfusionAction.InfusionRateUOM.UOMName = infDripRateUOM[0];
                                if (BegunInfusionAction.InfusionRatePerUOM == null)
                                    BegunInfusionAction.InfusionRatePerUOM = ObjectHelper.CreateObject(new UOM(), { UOMName: infDripRateUOM[1] });
                                else BegunInfusionAction.InfusionRatePerUOM.UOMName = infDripRateUOM[1];
                            }
                        }
                    }
                }
                else if (this.oSlotDetail.Status == SlotStatus.PAUSED && this.oSlotDetail.AdministrationDetail != null && this.oSlotDetail.AdministrationDetail.MedicationAction == MedicationAction.PAUSE) {
                    let PauseInfusionAction = this.oSlotDetail.AdministrationDetail.oInfusionAdminDetail.Where(c => c.ActionCode == MedicationAction.PAUSE).Select(s => s).LastOrDefault();
                    if (PauseInfusionAction != null) {
                        PauseInfusionAction.infusionReasonCode = this.oinfusrecordvm.ReasonforPause.Value;
                    }
                }
                else if (this.oSlotDetail.AdministrationDetail != null && ((this.oSlotDetail.Status == SlotStatus.STOPPED && this.oSlotDetail.AdministrationDetail.MedicationAction == MedicationAction.STOP) || (this.oSlotDetail.Status == SlotStatus.COMPLETED && this.oSlotDetail.AdministrationDetail.MedicationAction == MedicationAction.COMPLETE))) {
                    let StopInfusionAction = this.oSlotDetail.AdministrationDetail.oInfusionAdminDetail.Where(c => c.ActionCode == MedicationAction.STOP).Select(s => s).LastOrDefault();
                    if (StopInfusionAction != null) {
                        StopInfusionAction.infusionReasonCode = this.oinfusrecordvm.ReasonforStop.Value;
                    }
                    this.oSlotDetail.AdministrationDetail.TotalVolumeInfused = this.oinfusrecordvm.VolumeInfused;
                    this.oSlotDetail.AdministrationDetail.TotalVolumeInfusedUOMName = this.oinfusrecordvm.VolumeInfusedUOM != null && !String.IsNullOrEmpty(this.oinfusrecordvm.VolumeInfusedUOM.Value) ? this.oinfusrecordvm.VolumeInfusedUOM.Value : String.Empty;
                }
                else if (this.oSlotDetail.Status == SlotStatus.NOTGIVEN || this.oSlotDetail.Status == SlotStatus.DEFERADMIN || this.oSlotDetail.Status == SlotStatus.DEFERDUENOW || this.oSlotDetail.Status == SlotStatus.DEFEROVERDUE) {
                    this.oSlotDetail.AdministrationDetail.AdminReasonCode = this.CurrentSlotDetail.AdministrationDetail.AdminReasonCode;
                    this.oSlotDetail.AdministrationDetail.ReasonNotGiven = this.CurrentSlotDetail.AdministrationDetail.ReasonNotGiven;
                }
                else if (this.oSlotDetail.Status == SlotStatus.OMITTED) {
                    this.oSlotDetail.AdministrationDetail.AdminComments = this.CurrentSlotDetail.AdministrationDetail.AdminComments;
                }
                this.oSlotDetail.AdministrationDetail.AmendReasonCode = this.CurrentSlotDetail.AdministrationDetail.AmendReasonCode;
                this.oSlotDetail.AdministrationDetail.AdminReasonCode = this.CurrentSlotDetail.AdministrationDetail.AmendReasonCode;
                this.oSlotDetail.AdministrationDetail.AdministeredBy = this.CurrentSlotDetail.AdministrationDetail.AdministeredBy;
                this.oSlotDetail.AdministrationDetail.AdministeredDate = this.CurrentSlotDetail.AdministrationDetail.AdministeredDate;
                this.oSlotDetail.AdministrationDetail.RecordedBy = this.CurrentSlotDetail.AdministrationDetail.RecordedBy;
                this.oSlotDetail.AdministrationDetail.RecordedAt = this.CurrentSlotDetail.AdministrationDetail.RecordedAt;
                if (this.oSlotDetail.AdministrationDetail.oInfusionAdminDetail != null && this.oSlotDetail.AdministrationDetail.oInfusionAdminDetail.Count > 0) {
                    let nCount: number = this.oSlotDetail.AdministrationDetail.oInfusionAdminDetail.Count;
                    if (this.oSlotDetail.AdministrationDetail.oInfusionAdminDetail != null && this.oSlotDetail.AdministrationDetail.oInfusionAdminDetail.Count > 0 && this.CurrentSlotDetail.AdministrationDetail.oInfusionAdminDetail != null && this.CurrentSlotDetail.AdministrationDetail.oInfusionAdminDetail.Count > 0) {
                        this.oSlotDetail.AdministrationDetail.oInfusionAdminDetail[nCount - 1].RecordedBy = this.CurrentSlotDetail.AdministrationDetail.oInfusionAdminDetail[0].RecordedBy;
                        this.oSlotDetail.AdministrationDetail.oInfusionAdminDetail[nCount - 1].RecordedAt = this.CurrentSlotDetail.AdministrationDetail.oInfusionAdminDetail[0].RecordedAt;
                        if (this.CurrentSlotDetail.AdministrationDetail.oInfusionAdminDetail[0].oInfusionBagDetail != null && this.CurrentSlotDetail.AdministrationDetail.oInfusionAdminDetail[0].oInfusionBagDetail.AdministeredBy != null) {
                            this.oSlotDetail.AdministrationDetail.oInfusionAdminDetail[nCount - 1].oInfusionBagDetail.AdministeredBy.Name = this.CurrentSlotDetail.AdministrationDetail.oInfusionAdminDetail[0].oInfusionBagDetail.AdministeredBy.Name;
                            this.oSlotDetail.AdministrationDetail.oInfusionAdminDetail[nCount - 1].oInfusionBagDetail.AdministeredBy.LastModifiedAt = this.CurrentSlotDetail.AdministrationDetail.oInfusionAdminDetail[0].oInfusionBagDetail.AdministeredBy.LastModifiedAt;
                        }
                    }
                }
            }
        }
        public OpenRecordAdminScreen(objAdminDetail: AdministrationDetail, oSlotVM: SlotDetailVM, oClickedSlotTagObject: InfusionTagObject): void {
            this.oHdrRecordAdmin = new CDrugHdrAddnlInfo();
            this.oMedsAdminRec = new MedsRecordAdminstrator();
            this.oMedsAdminRec.constructorImpl(oSlotVM);
            this.oslotvm = oSlotVM;
            this.oMedsAdminRec.objDrugHeader.oDrugHeader = new CDrugHeader();
            this.oMedsAdminRec.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo = new DrugHeaderItem();
            this.oMedsAdminRec.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowFrequency = false;
            this.oMedsAdminRec.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowSite = false;
            this.oMedsAdminRec.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowAsrequired = false;
            this.oHdrRecordAdmin.RecordAdminViewed = RecordAdminType.InfusionRecordAdmin;
            this.oMedsAdminRec.objDrugHeader.DataContext = Common.SetDrugHeaderContent(oClickedSlotTagObject.oDrugItem, this.oHdrRecordAdmin, this.oMedsAdminRec.objDrugHeader);
            this.oMedsAdminRec.objAdminDetail = objAdminDetail;
            objAdminDetail = null;
            this.oMedsAdminRec.OnRecAdminFinishEvent  = () => { this.oMedsAdminRec_OnRecAdminFinishEvent(); } ;
            this.oMedsAdminRec.onDialogClose = (e) => { this.oMedsAdminRec_Closed(e); } ;
            AppActivity.OpenWindow("Record administration", this.oMedsAdminRec, this.oMedsAdminRec_Closed, "Record administration", true, 775, 450, false, WindowButtonType.OkCancel, null);
        }
        oMedsAdminRec_OnRecAdminFinishEvent(): void {
            let objSlotDetailBC: SlotDetail = new SlotDetail();
            objSlotDetailBC.AdministrationDetail = new AdministrationDetail();
            objSlotDetailBC.PrescriptionItemOID = this.oslotvm.PrescriptionItemOID;
            objSlotDetailBC.OID = this.oslotvm.PresScheduleOID;
            objSlotDetailBC.Status = SlotStatus.NOTGIVEN;
            objSlotDetailBC.MCVersion = this.oslotvm.MCVersionNo;
            objSlotDetailBC.PrescriptionType = (PatientContext.PrescriptionType != null && PatientContext.PrescriptionType.Trim().length > 0) ? PatientContext.PrescriptionType : PrescriptionTypes.ForAdministration;
            objSlotDetailBC.AdministrationDetail = new AdministrationDetail();
            this.OnRefreshInfusionChart(objSlotDetailBC);
        }
        oMedsAdminRec_Closed(args: AppDialogEventargs): void {
            if (this.oMedsAdminRec != null && args.Result == AppDialogResult.Ok) {
                this.oMedsAdminRec.appDialog.DialogResult = true;
                this.oMedsAdminRec.cmdOk_Click();
            }
            else if (args.Result == AppDialogResult.Cancel) {
                this.oMedsAdminRec.appDialog.DialogResult = true;
                Busyindicator.SetStatusIdle("MedChart");
            }
        }
        public CurrentActivityCode: ActivityCode = ActivityCode.None;
        private oBtnLaunchFBChart: RelayCommand;
        public get BtnLaunchFBChart(): RelayCommand {
            if (this.oBtnLaunchFBChart == null) {
                this.oBtnLaunchFBChart = new RelayCommand(()=>this.LaunchFBChart());
            }
            return this.oBtnLaunchFBChart;
        }
        public LaunchFBChart(): void {
            Common.LaunchFBChart();
        }
        private oBtnLaunchTV: RelayCommand;
        public get BtnLaunchTV(): RelayCommand {
            if (this.oBtnLaunchTV == null) {
                this.oBtnLaunchTV = new RelayCommand(()=>this.cmdTechValidate_Click());
            }
            return this.oBtnLaunchTV;
        }
        private oBtnLaunchRM: RelayCommand;
        public get BtnLaunchRM(): RelayCommand {
            if (this.oBtnLaunchRM == null) {
                this.oBtnLaunchRM = new RelayCommand(()=>this.cmdRequestMedication_Click());
            }
            return this.oBtnLaunchRM;
        }
        public cmdTechValidate_Click(): void {
            let sMenuCode: string = String.Empty;
            let CACode: string = String.Empty;
            MedChartData.CalledFrom = String.Empty;
            CACode = "MN_MEDCHART";
            sMenuCode = "MN_MED_VALIDATE_S_P2";
            let sQuery: string = "&MenuCode=" + sMenuCode;
            sQuery += "&PATIENTOID=" + PatientContext.PatientOID;
            if (PatientContext.EncounterOid > 0)
                sQuery += "&EncounterOID=" + PatientContext.EncounterOid;
            else sQuery += "&EncounterOID=" + ChartContext.EncounterOID;
            sQuery += "&PrescType=" + PrescriptionTypes.ForAdministration;
            sQuery += "&PRESCRIPTIONOID=" + "";
            sQuery += "&LaunchFrom=" + CACode;
            sQuery += "&CallingFrom=" + CConstants.sTabInfusionKey;
            sQuery += "&ENCTYPE=" + PatientContext.EncounterType;
            if (PatientContext.EncounterOid > 0)
                sQuery += "&RequestLockOID=" + PatientContext.EncounterOid;
            else sQuery += "&RequestLockOID=" + ChartContext.EncounterOID;
            let bIsLocked: boolean = false;
            this.MedicationAdminBaseVM.CheckPessimisticLock((o) => { bIsLocked = o; });
            if (!bIsLocked) {
                let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", PatientContext.EncounterOid, "MedTVInpatient", Common.nLockDuration), "string");
                this.MedicationAdminBaseVM.sLastCACode = sMenuCode;
                //this.MedicationAdminBaseVM.PropertyChanged -= obj_PropertyChanged;
                this.MedicationAdminBaseVM.PropertyChanged  = (s,e) => { this.obj_PropertyChanged(s,e); } ;
                this.MedicationAdminBaseVM.LaunchWizard(sMenuCode, sQuery,2);
            }
        }
        public cmdRequestMedication_Click(): void {
           // if (!this.IsReqMedicationLaunched) {
                this.IsReqMedicationLaunched = true;
                let sMenuCode: string = CConstants.RequestMedication;
                let CACode: string = "MN_MEDCHART";
                MedChartData.CalledFrom = String.Empty;
                let sQuery: string = "&MenuCode=" + sMenuCode;
                sQuery += "&PATIENTOID=" + PatientContext.PatientOID;
                if (PatientContext.EncounterOid > 0)
                    sQuery += "&EncounterOID=" + PatientContext.EncounterOid;
                else sQuery += "&EncounterOID=" + ChartContext.EncounterOID;
                sQuery += "&ChartPatientOID=" + ChartContext.PatientOID;
                sQuery += "&PrescType=" + PrescriptionTypes.ForAdministration;
                sQuery += "&PRESCRIPTIONOID=" + "";
                sQuery += "&LaunchFrom=" + CACode;
                sQuery += "&CallingFrom=" + CConstants.sTabInfusionKey;
                sQuery += "&ENCTYPE=" + PatientContext.EncounterType;
                sQuery += "&SRVCPOINTOID=" + MedChartData.ServiceOID.ToString();
                sQuery += "&LocationOID=" + MedChartData.LocationOID.ToString();
                if (!String.IsNullOrEmpty(AppContextInfo.JobRoleOID)) {
                    sQuery += "&JobRoleOID=" + AppContextInfo.JobRoleOID;
                }
                this.MedicationAdminBaseVM.sLastCACode = sMenuCode;
                //this.MedicationAdminBaseVM.PropertyChanged -= new System.ComponentModel.PropertyChangedEventHandler(obj_PropertyChanged);
                this.MedicationAdminBaseVM.PropertyChanged  = (s,e) => { this.obj_PropertyChanged(s,e); } ;
                this.MedicationAdminBaseVM.LaunchWizard(sMenuCode, sQuery,2);
       //     }
        }
    }
    export module InfusionChartVM {
        export enum eDirection {
            None = 0,

            Backward = 1,

            Forward = 2
        }
    }

    export enum eDirection {
        None = 0,

        Backward = 1,

        Forward = 2
    }
