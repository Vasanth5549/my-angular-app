import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow, ObservableCollection,  ChildWindow, AppSessionInfo, CListItem } from 'epma-platform/models';
import { AppDialog, Border, Colors, EventArgs, SolidColorBrush, StackPanel, iCheckBox, iLabel, iTextBox, iTreeViewControl } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { DrugItem } from 'src/app/lorarcbluebirdmedicationchart/common/DrugItem';
// import { CDrugHdrAddnlInfo, DrugHeader } from '../common/drugheader';
import { CDrugHdrAddnlInfo,DrugHeader } from 'src/app/lorappmedicationadminbbui/common/drugheader';
import { ReinstateVM } from 'src/app/lorappmedicationadminbbui/viewmodel/MedsAdminVM';
import * as Application from 'src/app/lorappcommonbb/amshelper';
// import { PrescriptionChartVM } from '../ca/prescriptionchart/prescriptionchartvm';
import { PrescriptionChartVM } from 'src/app/lorappmedicationadminbbui/ca/prescriptionchart/prescriptionchartvm';
import * as IPPMAManagePrescSer from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
// import { ChartContext, MedChartData, TagDrugHeaderDetail } from 'src/app/utilities/globalvariable';
import { ChartContext,  MedChartData, TagDrugHeaderDetail } from 'src/app/lorappmedicationadminbbui/utilities/globalvariable';
import { AdminstrativeTimesVM } from 'src/app/lorappmedicationcommonbb/viewmodel/adminstrativetimesvm';
// import { ResDrugHeader } from '../common/resdrugheader.designer';
import { ResDrugHeader } from 'src/app/lorappmedicationadminbbui/common/resdrugheader.designer';
//import { Common } from 'src/app/lorappmanageprescriptionbbui/utilities/common'; 
 import { Common } from 'src/app/lorappmedicationadminbbui/utilities/common';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { CReqMsgOmitSlots, CResMsgOmitSlots, MedicationAdministrationWSSoapClient, OmitSlotsCompletedEventArgs, OmitSlotsParams, SlotData } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
 //import { CTreeListItem, iTreeViewCollection } from 'src/app/shared/epma-platform/controls-model/treeView.model';
 //import { CConstants, DoseTypeCode, MedImage, MedImages } from '../utilities/CConstants';
import { CConstants, DoseTypeCode, MedImage,MedImages } from 'src/app/lorappmedicationadminbbui/utilities/CConstants'; 
import { Resource } from 'src/app/lorappmedicationadminbbui/resource';
import { MedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { ReviewOutcomeVM } from 'src/app/lorappmedicationcommonbb/viewmodel/reviewoutcomevm';
import { ChartRow } from 'src/app/lorarcbluebirdmedicationchart/common/ChartRow';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { InfusionTypeCode } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import * as IPPManagePrescSer from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS'
import { CReqMsgGetFormViewControls, CResMsgGetFormViewControls, FormViewCriteria, GetFormViewControlsCompletedEventArgs, ManagePrescriptionWSSoapClient } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { CTreeListItem, iTreeViewCollection } from 'src/app/shared/epma-platform/controls-model/treeView.model';
import { ReviewOutcome } from 'src/app/lorappmedicationcommonbb/child/reviewoutcome';
import { MedsAdminPrescChartView } from 'src/app/lorappmedicationadminbbui/view/medsadminprescchartview';
import{ MedsAdminReinstateslots as MedsslotRes} from "src/app/lorappmedicationadminbbui/resource/medsadminreinstateslots.designer";
import * as ControlStyles from "src/app/shared/epma-platform/controls/ControlStyles";
import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
@Component({
    selector: 'medsadminReinstateslots',
    templateUrl: './MedsAdminReinstateslots.html',
    styleUrls: ['./MedsAdminReinstateslots.css']
  })
export class MedsAdminReinstateslots extends iAppDialogWindow implements  AfterViewInit {
    private static CONTS_REINSTATEREASONS: string = "Reinstatereasons";
    public Styles = ControlStyles
    oDrugItem: DrugItem;
    oHdrAddnlInfo: CDrugHdrAddnlInfo;
    oReinstateVM: ReinstateVM;
    ReviewAfterMandatory: boolean = false;
    DynamicFormReviewMandatoryFetched: boolean = false;
    oManageReviewPeriod: IPPMAManagePrescSer.ManageReviewPeriod =null;
    oPrescriptionChartVM: PrescriptionChartVM;
    oReviewOutcome: ReviewOutcome;
    public objtagheader: TagDrugHeaderDetail;
    AdminTimeVM: AdminstrativeTimesVM;
    private LayoutRoot: StackPanel;
    @ViewChild("LayoutRootTempRef", { read: StackPanel, static: false }) set _LayoutRoot(c: StackPanel) {
        if (c) { this.LayoutRoot = c; }
    };
    objDrugHeader: DrugHeader;
    @ViewChild("objDrugHeaderTempRef", { read: DrugHeader, static: false }) set _objDrugHeader(c: DrugHeader) {
        if (c) { this.objDrugHeader = c; }
    };
    private brdSTA: Border;
    @ViewChild("brdSTATempRef", { read: Border, static: false }) set _brdSTA(c: Border) {
        if (c) { this.brdSTA = c; }
    };
    private lblBorder: iLabel;
    @ViewChild("lblBorderTempRef", { read: iLabel, static: false }) set _lblBorder(c: iLabel) {
        if (c) { this.lblBorder = c; }
    };
    private stpTV: StackPanel;
    @ViewChild("stpTVTempRef", { read: StackPanel, static: false }) set _stpTV(c: StackPanel) {
        if (c) { this.stpTV = c; }
    };
    public tvwReinstateslots: iTreeViewControl = new iTreeViewControl();
    @ViewChild("tvwReinstateslotsTempRef", { read: iTreeViewControl, static: false }) set _tvwReinstateslots(c: iTreeViewControl) {
        if (c) { this.tvwReinstateslots = c; }
    };
    private chkReinstateAll: iCheckBox;
    @ViewChild("chkReinstateAllTempRef", { read: iCheckBox, static: false }) set _chkReinstateAll(c: iCheckBox) {
        if (c) { this.chkReinstateAll = c; }
    };
    private lblReinstatereason: iLabel;
    @ViewChild("lblReinstatereasonTempRef", { read: iLabel, static: false }) set _lblReinstatereason(c: iLabel) {
        if (c) { this.lblReinstatereason = c; }
    };
    private txtReinstatereason: iTextBox;
    @ViewChild("txtReinstatereasonTempRef", { read: iTextBox, static: false }) set _txtReinstatereason(c: iTextBox) {
        if (c) { this.txtReinstatereason = c; }
    };

    constructor() {
        //  const MedsslotRes = new MedsslotRes();
        super();
        // InitializeComponent();
        // this.Loaded  = (s,e) => { medsadminReinstateslots_Loaded(s,e); } ;
        // this.oDrugItem = new DrugItem();
        // this.oHdrAddnlInfo = new CDrugHdrAddnlInfo();
        // this.oDrugItem.DoseLabel = ResDrugHeader.drugItem_DoseLabelText;
        // this.oDrugItem.RouteLabel = ResDrugHeader.drugItem_RouteLabelText;
        // this.objDrugHeader.DataContext = Common.SetDrugHeaderContent(this.oDrugItem, this.oHdrAddnlInfo, this.objDrugHeader);

    }

    public maxScrollHeight;
    ngAfterViewInit(): void {
    if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
        this.maxScrollHeight = 369;
    }else{
        this.maxScrollHeight = (window.devicePixelRatio == 1) ? "auto" : 407;
    }
        this.medsadminReinstateslots_Loaded({}, null);
    }
    medsadminReinstateslots_Loaded(sender: Object, e: RoutedEventArgs): void {
        if (this.DataContext != null && this.DataContext instanceof ReinstateVM) {
            this.oReinstateVM = ObjectHelper.CreateType<ReinstateVM>(this.DataContext, ReinstateVM);
            // ObjectHelper.stopFinishAndCancelEvent(true);
            if (this.oReinstateVM != null) {
                this.oReinstateVM.GetReinstateAllDetails(this.oReinstateVM);
            }
        }
        this.PopulateTreeData(this.oReinstateVM.ReinstateSlotData);
        // this.oReinstateVM.IsSlotUpdatedEvent = (s, e) => { this.oReinstateVM_IsSlotUpdatedEvent(); };
    }
    // oReinstateVM_IsSlotUpdatedEvent(): void {
    //     this.appDialog.DialogResult = true;
    // }
    private PopulateTreeData(oReinstateSlotData: ObservableCollection<SlotData>): void {
        let iTVCol: iTreeViewCollection = null;
        let oCParentTV: CTreeListItem;
        let oCChildTV: CTreeListItem;

        let odrDateTime = oReinstateSlotData.OrderBy(o => o.ScheduleDTTMascending).Select(s => s);
        let grpDateTime = odrDateTime.GroupBy(g => g.ScheduleDTTM.DateTime).Select(s => s);
        iTVCol = new iTreeViewCollection();
        let nCount :number =grpDateTime.Count();

        grpDateTime.forEach((gdt) => {
            // for (let i: number = 0; i < nCount; i++) {
            // let gdt = grpDateTime[i];
            oCParentTV = new CTreeListItem();
            // let gpDTTM: DateTime = new DateTime(gdt.key);
            oCParentTV.Key = (Convert.ToDateTime(gdt.key)).ToString(CConstants.ShortDateFormat);
            // oCParentTV.Key = gpDTTM.ToString(CConstants.ShortDateFormat);
            // oCParentTV.ParentKey = "0";
            oCParentTV.ParentKey = null;
            oCParentTV.Value = (Convert.ToDateTime(gdt.key)).ToString(CConstants.ShortDateFormat);
            // oCParentTV.Value = gpDTTM.ToString(CConstants.ShortDateFormat);
            oCParentTV.NormalImagePath = MedImage.GetPath(MedImages.CalenderIcon);
            oCParentTV.Expanded = true;
            iTVCol.Add(oCParentTV);
            gdt.forEach((dt) => {
                oCChildTV = new CTreeListItem();
                oCChildTV.Key = dt.ScheduleDTTM.ToUserDateTimeString(CConstants.Timeformat);
                oCChildTV.ParentKey = (Convert.ToDateTime(gdt.key)).ToString(CConstants.ShortDateFormat);
                // oCChildTV.ParentKey = gpDTTM.ToString(CConstants.ShortDateFormat);
                oCChildTV.Value = dt.ScheduleDTTM.ToUserDateTimeString(CConstants.Timeformat);
                if (this.oReinstateVM.IsInfusion && !this.oReinstateVM.IsBolus)
                    oCChildTV.NormalImagePath = MedImage.GetPath(MedImages.InfOmittedIcon);
                else oCChildTV.NormalImagePath = MedImage.GetPath(MedImages.OmittedSlotIcon);
                iTVCol.Add(oCChildTV);
            });
        }
        );
        this.oReinstateVM.TreeVwCol = iTVCol;
        this.tvwReinstateslots.TreeViewDataContext = this.oReinstateVM.TreeVwCol;
        //bugid36242 stub created
        this.tvwReinstateslots.ExpandAll();
        this.tvwReinstateslots.IsEditable = false;
    }
    GetResourceString(sKey: string) {
        let oOverrideBarcodeScanRes: MedsslotRes = new MedsslotRes();
        return oOverrideBarcodeScanRes.GetResourceString(sKey);
    }
    public cmdOkClick(): boolean {
        if (this.CheckMandatory()) {
            if (this.oReinstateVM.IsChkReinstateAll) {
                if (this.oReinstateVM.IsIndefiniteOmit) {
                    if (!this.oReinstateVM.MedicationSelected && this.oReinstateVM.UpdatedSlotsData != null && this.oReinstateVM.UpdatedSlotsData.Count > 0 && CommonBB.GetServerDateTime() < this.oReinstateVM.UpdatedSlotsData[0].ScheduleDTTM) {
                        let objMedicationAdministrationWSSoapClient: MedicationAdministrationWSSoapClient;
                        objMedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
                        objMedicationAdministrationWSSoapClient.OmitSlotsCompleted = (s, e) => { this.objMedicationAdministrationWSSoapClient_OmitSlotsCompleted(s, e); };
                        let oCReqMsgOmitSlots: CReqMsgOmitSlots = new CReqMsgOmitSlots();
                        // ObjectHelper.stopFinishAndCancelEvent(true);
                        oCReqMsgOmitSlots.oOmitSlotsParamsBC = new OmitSlotsParams();
                        oCReqMsgOmitSlots.oContextInformation = CommonBB.FillContext();
                        oCReqMsgOmitSlots.oContextInformation.PageInfo = PatientContext.EncounterOid.ToString();
                        oCReqMsgOmitSlots.oOmitSlotsParamsBC.PatientOID = ChartContext.PatientOID;
                        oCReqMsgOmitSlots.oOmitSlotsParamsBC.PrescriptionItemOID = this.objtagheader.PrescriptionItemOID;
                        oCReqMsgOmitSlots.oOmitSlotsParamsBC.Reason = this.objtagheader.OmitComments;
                        oCReqMsgOmitSlots.oOmitSlotsParamsBC.FromDTTM = this.objtagheader.IndefiniteOmitFromDTTM;
                        oCReqMsgOmitSlots.oOmitSlotsParamsBC.ToDTTM = this.oReinstateVM.UpdatedSlotsData[0].ScheduleDTTM.AddMinutes(-1);
                        oCReqMsgOmitSlots.oOmitSlotsParamsBC.OmitIndefinite = false;
                        oCReqMsgOmitSlots.oOmitSlotsParamsBC.IsLastSlotCheckRequired = false;
                        oCReqMsgOmitSlots.oOmitSlotsParamsBC.IsUpdatePIStatusToCompleted = false;
                        oCReqMsgOmitSlots.oOmitSlotsParamsBC.PresItemENDTTM = this.objtagheader.EndDate;
                        if (MedChartData.MedChartOID > 0)
                            oCReqMsgOmitSlots.oOmitSlotsParamsBC.MedChartOID = MedChartData.MedChartOID;
                        if (MedChartData.LastUpdateDTTM != DateTime.MinValue)
                            oCReqMsgOmitSlots.oOmitSlotsParamsBC.LastModifiedAt = MedChartData.LastUpdateDTTM;
                        objMedicationAdministrationWSSoapClient.OmitSlotsAsync(oCReqMsgOmitSlots);
                    }
                    else {
                        let objSerProxy: ManagePrescriptionWSSoapClient = new ManagePrescriptionWSSoapClient();
                        objSerProxy.GetFormViewControlsCompleted = (s, e) => { this.objService_GetFormViewControlsCompleted(s, e); };
                        let objReqForm: CReqMsgGetFormViewControls = new CReqMsgGetFormViewControls();
                        objReqForm.oFormViewCriteriaBC = new FormViewCriteria();
                        objReqForm.oFormViewCriteriaBC.IdentifyingOID = this.objtagheader.DrugIdentifyingOID;
                        objReqForm.oFormViewCriteriaBC.IdentifyingType = this.objtagheader.DrugIdentifyingType;
                        objReqForm.mcVersionNoBC = AppSessionInfo.AMCV;
                        objReqForm.oFormViewCriteriaBC.IsBasic = '1';
                        objReqForm.oFormViewCriteriaBC.RouteOID = this.objtagheader.RouteOID;
                        objReqForm.oFormViewCriteriaBC.FormOID = this.objtagheader.DosageFormOID;
                        objReqForm.oFormViewCriteriaBC.IsInfusionOn = '0';
                        objReqForm.oFormViewCriteriaBC.PrescriptionType = PatientContext.PrescriptionType;
                        objReqForm.oFormViewCriteriaBC.ItemSubType = this.objtagheader.ItemSubType;
                        objReqForm.oContextInformation = Common.FillContext();
                        objSerProxy.GetFormViewControlsAsync(objReqForm);
                    }
                }
                else {
                    this.oReinstateVM.ReinstateSlots();
                }
            }
            else {
                this.oReinstateVM.UpdatedSlotsData = null;
                if (this.oReinstateVM != null && this.oReinstateVM.ReinstateSlotData != null && this.oReinstateVM.ReinstateSlotData.Count > 0) {
                    this.oReinstateVM.ReinstateSlots();
                }
            }
            return true;
        }
        else {
            return false;
        }
    }
    objMedicationAdministrationWSSoapClient_OmitSlotsCompleted(sender: Object, e: OmitSlotsCompletedEventArgs): void {
        if (e.Error == null) {
            let oCResMsgOmitSlots: CResMsgOmitSlots = e.Result;
            // ObjectHelper.stopFinishAndCancelEvent(false);
            if (oCResMsgOmitSlots != null && oCResMsgOmitSlots.oContextInformation != null && oCResMsgOmitSlots.oContextInformation.Errors.Count <= 0) {
                if (oCResMsgOmitSlots.dLastUpdateDTTM != DateTime.MinValue)
                    MedChartData.LastUpdateDTTM = oCResMsgOmitSlots.dLastUpdateDTTM;
            }
            if (oCResMsgOmitSlots.oUpdatedSlotsData != null && oCResMsgOmitSlots.oUpdatedSlotsData.Count > 0) {
                //26254 Bug Id Stub hasbeen created for concat
                this.oReinstateVM.UpdatedSlotsData = new ObservableCollection<SlotData>(oCResMsgOmitSlots.oUpdatedSlotsData.Concat(this.oReinstateVM.UpdatedSlotsData));
            }
        }
        let objSerProxy: ManagePrescriptionWSSoapClient = new ManagePrescriptionWSSoapClient();
        objSerProxy.GetFormViewControlsCompleted = (s, e) => { this.objService_GetFormViewControlsCompleted(s, e); };
        let objReqForm: CReqMsgGetFormViewControls = new CReqMsgGetFormViewControls();
        objReqForm.oFormViewCriteriaBC = new FormViewCriteria();
        objReqForm.oFormViewCriteriaBC.IdentifyingOID = this.objtagheader.DrugIdentifyingOID;
        objReqForm.oFormViewCriteriaBC.IdentifyingType = this.objtagheader.DrugIdentifyingType;
        objReqForm.mcVersionNoBC = AppSessionInfo.AMCV;
        objReqForm.oFormViewCriteriaBC.IsBasic = '1';
        objReqForm.oFormViewCriteriaBC.RouteOID = this.objtagheader.RouteOID;
        objReqForm.oFormViewCriteriaBC.FormOID = this.objtagheader.DosageFormOID;
        objReqForm.oFormViewCriteriaBC.IsInfusionOn = '0';
        objReqForm.oFormViewCriteriaBC.PrescriptionType = PatientContext.PrescriptionType;
        objReqForm.oFormViewCriteriaBC.ItemSubType = this.objtagheader.ItemSubType;
        objReqForm.oContextInformation = Common.FillContext();
        objSerProxy.GetFormViewControlsAsync(objReqForm);
    }
    private objService_GetFormViewControlsCompleted(sender: Object, e: GetFormViewControlsCompletedEventArgs): void {
        let _ErrorID: number = 80000113;
        let ReviewText: string = String.Empty;
        let ReviewTextCode: string = String.Empty;
        let _ErrorSource: string = "LorAppMedicationAdmin_P2.dll, Class:MedsAdminPrescChartView, Method:objService_GetFormViewControlsCompleted()";
        if (e.Error == null && e.Result != null) {
            try {
                let objres: CResMsgGetFormViewControls = e.Result;
                if (objres != null && objres.oFormViewControls != null && objres.oFormViewControls.Columns != null && objres.oFormViewControls.Mandatory != null && objres.oFormViewControls.Columns.Count > 0 && objres.oFormViewControls.Mandatory.Count > 0) {
                    let columnsArray: string[] = objres.oFormViewControls.Columns.ToArray();
                    let mandatoryArray: string[] = objres.oFormViewControls.Mandatory.ToArray();
                    let indexsupply: number = Array.IndexOf(columnsArray, "CC_REVIEWAFTER");
                    if (indexsupply != -1) {
                        this.DynamicFormReviewMandatoryFetched = true;
                        this.ReviewAfterMandatory = String.Equals(mandatoryArray[indexsupply], "1");
                    }
                    else {
                        this.DynamicFormReviewMandatoryFetched = false;
                    }
                }
                this.AdminTimeVM = null;
                if (this.objtagheader.DrugFrequencyOID > 0) {
                    this.AdminTimeVM = new AdminstrativeTimesVM(this.objtagheader.DrugFrequencyOID);
                }
                let objServiceProxy: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
                objServiceProxy.GetReviewHistoryCompleted = (s, e) => { this.objService_GetReviewHistoryCompleted(s, e); };
                let objReq: IPPMAManagePrescSer.CReqMsgGetReviewHistory = new IPPMAManagePrescSer.CReqMsgGetReviewHistory();
                objReq.lnPatientoidBC = PatientContext.PatientOID;
                objReq.lnPrescriptionItemOIDBC = this.oReinstateVM.PrescriptionItemOID;
                objReq.oContextInformation = CommonBB.FillContext();
                objServiceProxy.GetReviewHistoryAsync(objReq);
            }
            catch (ex: any) {
                let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
            }

        }
        else {
            let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
        }
    }
    private objService_GetReviewHistoryCompleted(sender: Object, e: IPPMAManagePrescSer.GetReviewHistoryCompletedEventArgs): void {
        let _ErrorID: number = 80000113;
        let ReviewText: string = String.Empty;
        let ReviewTextCode: string = String.Empty;
        let _ErrorSource: string = "LorAppMedicationAdmin_P2.dll, Class:MedsAdminPrescChartView, Method:objService_GetReviewHistoryCompleted()";
        if (e.Error == null && e.Result != null) {
            try {
                this.oManageReviewPeriod = null;
                this.oManageReviewPeriod = new IPPMAManagePrescSer.ManageReviewPeriod();
                this.oManageReviewPeriod.oReviewAfterDetail = new IPPMAManagePrescSer.ReviewAfterDetail();
                let objres: IPPMAManagePrescSer.CResMsgGetReviewHistory = e.Result;
                if (objres != null && objres.ReviewAfterDetails != null && objres.ReviewAfterDetails.Count > 0) {
                    this.oManageReviewPeriod.oReviewAfterDetail.ReviewAfter = objres.ReviewAfterDetails[0].ReviewPeriod;
                    this.oManageReviewPeriod.oReviewAfterDetail.ReviewAfterUOM = objres.ReviewAfterDetails[0].ReviewAfterUOM;
                    this.oManageReviewPeriod.oReviewAfterDetail.ReviewedDTTM = objres.ReviewAfterDetails[0].ReviewedDTTM;
                    this.oManageReviewPeriod.oReviewAfterDetail.ReviewDueDTTM = objres.ReviewAfterDetails[0].ReviewDueDTTM;
                    this.oManageReviewPeriod.oReviewAfterDetail.ReviewType = new IPPManagePrescSer.ObjectInfo();
                    this.oManageReviewPeriod.oReviewAfterDetail.ReviewType = objres.ReviewAfterDetails[0].ReviewType;
                    this.oManageReviewPeriod.oReviewAfterDetail.ReviewRequestedDTTM = objres.ReviewAfterDetails[0].ReviewRequestedDTTM;
                    this.oManageReviewPeriod.oReviewAfterDetail.ReviewRequestedBy = objres.ReviewAfterDetails[0].ReviewRequestedBy;
                    this.oManageReviewPeriod.oReviewAfterDetail.ReviewRequestComments = objres.ReviewAfterDetails[0].ReviewRequestComments;
                    this.oManageReviewPeriod.oReviewAfterDetail.PrescriptionItemOID = objres.ReviewAfterDetails[0].PrescriptionItemOID;
                    this.oManageReviewPeriod.oReviewAfterDetail.ReviewPeriod = objres.ReviewAfterDetails[0].ReviewPeriod;
                    this.oManageReviewPeriod.oReviewAfterDetail.ReviewOutcome = ObjectHelper.CreateObject(new IPPMAManagePrescSer.ObjectInfo(), { Code: CConstants.ReviewReinstate });
                    this.oManageReviewPeriod.oReviewAfterDetail.ReviewOutcomeComments = objres.ReviewAfterDetails[0].ReviewOutcomeComments;
                    this.oManageReviewPeriod.oReviewAfterDetail.Reviewer = objres.ReviewAfterDetails[0].Reviewer;
                    this.oManageReviewPeriod.oReviewAfterDetail.ReinstateReason = this.oReinstateVM.ReinstateReason;
                    this.oManageReviewPeriod.oReviewAfterDetail.DiscontinueReason = objres.ReviewAfterDetails[0].DiscontinueReason;
                    if (!this.DynamicFormReviewMandatoryFetched) {
                        this.ReviewAfterMandatory = objres.IsReviewMandatory;
                    }
                    if (String.Equals(this.objtagheader.DrugIdentifyingType, CConstants.NONCATALOGUEITEM, StringComparison.OrdinalIgnoreCase) || String.Equals(this.objtagheader.DrugIdentifyingType, CConstants.Precatalog, StringComparison.OrdinalIgnoreCase)) {
                        this.ReviewAfterMandatory = false;
                    }
                    if (this.ReviewAfterMandatory) {
                        let oReviewOutcomeVM: ReviewOutcomeVM;
                        this.oReviewOutcome = new ReviewOutcome();
                        this.oReviewOutcome.constructorImpl(this.oManageReviewPeriod);
                        oReviewOutcomeVM = ObjectHelper.CreateType<ReviewOutcomeVM>(this.oReviewOutcome.DataContext, ReviewOutcomeVM);
                        if (!String.IsNullOrEmpty(this.objtagheader.DoseType)) {
                            oReviewOutcomeVM.DoseType = this.objtagheader.DoseType;
                        }
                        if (!String.IsNullOrEmpty(this.objtagheader.INFTYCODE)) {
                            oReviewOutcomeVM.InfusionType = this.objtagheader.INFTYCODE;
                        }
                        if (!String.IsNullOrEmpty(this.objtagheader.FreqPerodcode)) {
                            oReviewOutcomeVM.FrequencyType = this.objtagheader.FreqPerodcode;
                        }
                        if (!String.IsNullOrEmpty(this.objtagheader.DurationUOM)) {
                            oReviewOutcomeVM.DurationUOM = this.objtagheader.DurationUOM;
                        }
                        if (!String.Equals(this.objtagheader.Duration, 0)) {
                            oReviewOutcomeVM.Duration = this.objtagheader.Duration.ToString();
                        }
                        if (!String.IsNullOrEmpty(this.objtagheader.InfusionPeriodUOM)) {
                            oReviewOutcomeVM.InfusionPeriodUOM = this.objtagheader.InfusionPeriodUOM;
                        }
                        if (!String.IsNullOrEmpty(this.objtagheader.InfusionPeriod)) {
                            oReviewOutcomeVM.InfusionPeriod = this.objtagheader.InfusionPeriod;
                        }
                        if (this.objtagheader.StartDate != DateTime.MinValue) {
                            oReviewOutcomeVM.StartDTTM = this.objtagheader.StartDate;
                        }
                        if (this.objtagheader.EndDate != DateTime.MinValue) {
                            oReviewOutcomeVM.StopDTTM = this.objtagheader.EndDate;
                        }
                        if (this.objtagheader.DrugFrequencyOID > 0) {
                            oReviewOutcomeVM.FrequencyOID = this.objtagheader.DrugFrequencyOID;
                        }
                        oReviewOutcomeVM.ReviewOutcomeListEnabled = false;
                        oReviewOutcomeVM.IsPRN = this.objtagheader.IsPRN;
                        if (this.AdminTimeVM != null) {
                            oReviewOutcomeVM.oAdminTimesVM = this.AdminTimeVM;
                        }
                        if (this.oReinstateVM.objFrequencyDetails != null) {
                            oReviewOutcomeVM.oFrequecydetails = this.oReinstateVM.objFrequencyDetails;
                        }
                        if (this.oReinstateVM.objScheduletimes != null && this.oReinstateVM.objScheduletimes.Count > 0) {
                            if (!String.IsNullOrEmpty(this.oReinstateVM.objScheduletimes[0].ScheduledTime)) {
                                oReviewOutcomeVM.oAdminDataforFreqDetails = this.oReinstateVM.objScheduletimes;
                            }
                        }
                        if (this.oReinstateVM.oChartRow != null && this.oReinstateVM.oChartRow.TimeSlots != null && this.oReinstateVM.oChartRow.TimeSlots.Count > 0) {
                            if (!String.IsNullOrEmpty(this.oReinstateVM.oChartRow.TimeSlots[0].SlotTime)) {
                                if (!((this.objtagheader.IsInfusion && !String.Equals(this.objtagheader.INFTYCODE, InfusionTypeCode.INTERMITTENT)) || (this.objtagheader.IsInfusion && String.Equals(this.objtagheader.INFTYCODE, InfusionTypeCode.INTERMITTENT) && String.Equals(this.objtagheader.DoseType, DoseTypeCode.STEPPEDVARIABLE)) || this.objtagheader.IsPRN || String.Equals(this.objtagheader.FreqPerodcode, CConstants.OnceOnlyPerodCode) || String.Equals(this.objtagheader.DoseType, DoseTypeCode.STEPPEDVARIABLE))) {
                                    if (this.DoseCalculationByScheduleTimes(this.oReinstateVM.oChartRow) != null) {
                                        oReviewOutcomeVM.oAdminDataforFreqDetails = this.DoseCalculationByScheduleTimes(this.oReinstateVM.oChartRow);
                                    }
                                    if (this.DoseCalculationByFrequency(this.oReinstateVM.oChartRow) != null) {
                                        oReviewOutcomeVM.oFrequecydetails = this.DoseCalculationByFrequency(this.oReinstateVM.oChartRow);
                                    }
                                }
                            }
                        }
                        oReviewOutcomeVM.ReviewAfterMandatoryConfig = this.ReviewAfterMandatory;
                        this.oReviewOutcome.onDialogClose = this.oReviewOutcomeChild_Closed;
                        let Callback = (s, e) => {
                            if (s != null && e != null) {
                                this.oReviewOutcome = s;
                            }
                        }
                        AppActivity.OpenWindow("Review prescription item", this.oReviewOutcome, (s) => {this.oReviewOutcomeChild_Closed(s)}, this.objtagheader.DrugName, true, 690, 520, true, WindowButtonType.OkCancel, null, null, null, Callback);
                    }
                    else {
                        this.oManageReviewPeriod.oReviewAfterDetail.ReviewOutcome = ObjectHelper.CreateObject(new IPPMAManagePrescSer.ObjectInfo(), { Code: CConstants.ReviewReinstate });
                        this.oReinstateVM.oManageReviewPeriod = this.oManageReviewPeriod;
                        this.oReinstateVM.ReinstateSlots();
                    }
                }
            }
            catch (ex: any) {
                let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
            }

        }
        else {
            let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
        }
    }
    private DoseCalculationByScheduleTimes(oChartRow: ChartRow): ObservableCollection<IPPMAManagePrescSer.IPPScheduledetails> {
        let oAdminData: ObservableCollection<IPPMAManagePrescSer.IPPScheduledetails> = null;
        let oIPPSchDetail: IPPMAManagePrescSer.IPPScheduledetails = null;
        if (oChartRow != null) {
            if (oChartRow.TimeSlots != null && oChartRow.TimeSlots.Count > 0) {
                oAdminData = new ObservableCollection<IPPMAManagePrescSer.IPPScheduledetails>();
                let nCount: number = oChartRow.TimeSlots.Count;
                for (let i: number = 0; i < nCount; i++)
                // oChartRow.TimeSlots.forEach( (item)=> 
                {
                    let item = oChartRow.TimeSlots[i];
                    if (!String.IsNullOrEmpty(item.SlotTime)) {
                        oIPPSchDetail = new IPPMAManagePrescSer.IPPScheduledetails();
                        let nMinutes: number = 0;
                        let nTotMinutes: number = 0;
                        if (!String.IsNullOrEmpty(item.SlotTime)) {
                            nMinutes = CommonBB.ConvertHourstoMinutes(Convert.ToDouble(item.SlotTime.Split(':')[0]));
                            nTotMinutes = nMinutes + Convert.ToInt32(Convert.ToDouble(item.SlotTime.Split(':')[1]));
                        }
                        oIPPSchDetail.ScheduledTime = nTotMinutes.ToString();
                        oAdminData.Add(oIPPSchDetail);
                    }
                    else {
                        break;
                    }
                };
            }
        }
        return oAdminData;
    }
    private DoseCalculationByFrequency(oChartRow: ChartRow): IPPMAManagePrescSer.IPPFrequency {
        let FrequencyText: string = String.Empty;
        let FrequencyLabel: string = String.Empty;
        let FrequencyValue: string[];
        let oFrequency: IPPMAManagePrescSer.IPPFrequency = null;
        let otag: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(oChartRow.DrugItem.Tag, TagDrugHeaderDetail);
        if (oChartRow != null) {
            if (oChartRow.DrugItem != null) {
                if (String.Equals(otag.FreqPerodcode, CConstants.sWeeklyFreqUOMCode)) {
                    if (!String.IsNullOrEmpty(oChartRow.DrugItem.FrequencyText) && !String.IsNullOrEmpty(oChartRow.DrugItem.FrequencyWeeklyLabel) && !String.IsNullOrEmpty(oChartRow.DrugItem.FrequencyWeeklyValue)) {
                        FrequencyText = oChartRow.DrugItem.FrequencyText;
                        FrequencyLabel = oChartRow.DrugItem.FrequencyWeeklyLabel;
                        FrequencyValue = oChartRow.DrugItem.FrequencyWeeklyValue.Split(',');
                        oFrequency = new IPPMAManagePrescSer.IPPFrequency();
                        if (oFrequency != null) {
                            FrequencyValue.forEach((item) => {
                                switch (item) {
                                    case CConstants.Sunday:
                                        oFrequency.IsSunday = true;
                                        break;
                                    case CConstants.Monday:
                                        oFrequency.IsMonday = true;
                                        break;
                                    case CConstants.Tuesday:
                                        oFrequency.IsTuesday = true;
                                        break;
                                    case CConstants.Wednesday:
                                        oFrequency.IsWednesday = true;
                                        break;
                                    case CConstants.Thursday:
                                        oFrequency.IsThursday = true;
                                        break;
                                    case CConstants.Friday:
                                        oFrequency.IsFriday = true;
                                        break;
                                    case CConstants.Saturday:
                                        oFrequency.IsSaturday = true;
                                        break;
                                }
                            });
                        }
                    }
                }
            }
        }
        return oFrequency;
    }
    AppDialogWindow: ChildWindow;
    private oReviewOutcomeChild_Closed(args: AppDialogEventargs): void {
        let sResult: string = String.Empty;
        this.AppDialogWindow = args.AppChildWindow;
        this.oReviewOutcome = args.Content.Component;

        // this.oMAModorST.DataContext=args.Content.DataContext;
        // this.oSlotVM = ObjectHelper.CreateType<SlotDetailVM>(this.oMedsAdminRec.objslotVM, SlotDetailVM);

        
        let objreviewOutcome: ReviewOutcome = (ObjectHelper.CreateType<ReviewOutcome>(args.Content.Component, ReviewOutcome));
        if (args.Result == AppDialogResult.Ok) {
            // if (objreviewOutcome.cmdOkClick(this.oManageReviewPeriod)) {
            if (objreviewOutcome.cmdOkClick((o) => { this.oManageReviewPeriod = o; })) {
                if (this.oManageReviewPeriod != null && this.oManageReviewPeriod.oReviewAfterDetail != null && this.oManageReviewPeriod.oReviewAfterDetail.ReviewOutcome != null && !String.IsNullOrEmpty(this.oManageReviewPeriod.oReviewAfterDetail.ReviewOutcome.Code) && String.Equals(this.oManageReviewPeriod.oReviewAfterDetail.ReviewOutcome.Code, CConstants.ReviewDiscontinue, StringComparison.InvariantCultureIgnoreCase)) {
                    let ochartview: MedsAdminPrescChartView = new MedsAdminPrescChartView();
                    let sMenuCode: string = ochartview.GetMenuCode();
                    PatientContext.PrescriptionType = MedicationCommonBB.GetPrescriptionTypeCode(sMenuCode);
                    let oDeletedItemsInfo: ObservableCollection<IPPMAManagePrescSer.DeletedItemsInfo> = new ObservableCollection<IPPMAManagePrescSer.DeletedItemsInfo>();
                    let info: IPPMAManagePrescSer.DeletedItemsInfo = new IPPMAManagePrescSer.DeletedItemsInfo();
                    info.PrescriptionItemData = new IPPMAManagePrescSer.PrescriptionItemInputData();
                    info.PrescriptionItemData.OID = this.oManageReviewPeriod.oReviewAfterDetail.PrescriptionItemOID;
                    info.PrescriptionItemData.PrescriptionItemStatus = CConstants.DISCONTINUED;
                    info.PrescriptionItemData.PrescriptionType = PatientContext.PrescriptionType;
                    info.DeletedInfo = new IPPMAManagePrescSer.PrescriptionItemAction();
                    info.DeletedInfo.ActionCode = CConstants.DISCONTINUED;
                    info.DeletedInfo.DirectDiscontinueReason = this.oManageReviewPeriod.oReviewAfterDetail.DiscontinueReason;
                    info.PrescriptionItemData.ReviewOutcomeComments = this.oManageReviewPeriod.oReviewAfterDetail.ReviewOutcomeComments;
                    info.IsPatMerged = PatientContext.PatientOID != PatientContext.MergedPatientOID ? "1" : "0";
                    oDeletedItemsInfo.Add(info);
                    ochartview.DiscontinueCancelDrugs(oDeletedItemsInfo);
                }
                else {
                    this.oReinstateVM.oManageReviewPeriod = this.oManageReviewPeriod;
                    if (this.oReinstateVM.oManageReviewPeriod.oReviewAfterDetail != null) {
                        if (this.oReinstateVM.oManageReviewPeriod.NewReviewAfterDTTM != DateTime.MinValue) {
                            this.oReinstateVM.oManageReviewPeriod.NewReviewType = ObjectHelper.CreateObject(new IPPMAManagePrescSer.ObjectInfo(), { Code: CConstants.GenReview });
                        }
                    }
                    this.oReinstateVM.ReinstateSlots();
                    args.AppChildWindow.DialogResult = true;
                }
            }
        }
        
        else if (args.Result == AppDialogResult.Cancel) {
            this.oManageReviewPeriod.oReviewAfterDetail.ReviewOutcome = ObjectHelper.CreateObject(new IPPMAManagePrescSer.ObjectInfo(), { Code: CConstants.ReviewReinstate });
            this.oReinstateVM.oManageReviewPeriod = this.oManageReviewPeriod;
            if (this.oManageReviewPeriod.oReviewAfterDetail != null) {
                this.oReinstateVM.oManageReviewPeriod.NewReviewType = ObjectHelper.CreateObject(new IPPMAManagePrescSer.ObjectInfo(), { Code: CConstants.GenReview });
              
              //NeedTorevisitAthulyaNagaraj
              
                // let objreviewOutcomeVM: ReviewOutcomeVM=new ReviewOutcomeVM();
                // objreviewOutcomeVM = (ObjectHelper.CreateType<ReviewOutcomeVM>(objreviewOutcome.DataContext, ReviewOutcomeVM));
                // objreviewOutcomeVM.ReviewPeriod=this.oManageReviewPeriod.oReviewAfterDetail.ReviewPeriod;
                // (ObjectHelper.CreateType<ReviewOutcomeVM>(objreviewOutcome.DataContext, ReviewOutcomeVM)).ReviewPeriod = this.oManageReviewPeriod.oReviewAfterDetail.ReviewPeriod;
                // (ObjectHelper.CreateType<ReviewOutcomeVM>(objreviewOutcome.DataContext, ReviewOutcomeVM)).lstReviewAfterUOMCombo = new CListItem();
                // (ObjectHelper.CreateType<ReviewOutcomeVM>(objreviewOutcome.DataContext, ReviewOutcomeVM)).lstReviewAfterUOMCombo.Value = this.oManageReviewPeriod.oReviewAfterDetail.ReviewAfterUOM.Code;
                // (ObjectHelper.CreateType<ReviewOutcomeVM>(objreviewOutcome.DataContext, ReviewOutcomeVM)).lstReviewAfterUOMCombo.DisplayText = this.oManageReviewPeriod.oReviewAfterDetail.ReviewAfterUOM.Name;
                // let selectedVal = (objreviewOutcome.DataContext as ReviewOutcomeVM).ReviewAfterUOMListCombo.Where(oItem => this.oManageReviewPeriod.oReviewAfterDetail.ReviewAfterUOM != null && oItem.Value == this.oManageReviewPeriod.oReviewAfterDetail.ReviewAfterUOM.Code).Select(oItem => oItem);
                // if (selectedVal != null && selectedVal.Count() > 0) {
                //     (ObjectHelper.CreateType<ReviewOutcomeVM>(objreviewOutcome.DataContext, ReviewOutcomeVM)).lstReviewAfterUOMCombo = selectedVal.ElementAt(0);
                // }
                // (ObjectHelper.CreateType<ReviewOutcomeVM>(objreviewOutcome.DataContext, ReviewOutcomeVM)).GetreviewDate();
                // this.oReinstateVM.oManageReviewPeriod.NewReviewAfterDTTM = (ObjectHelper.CreateType<ReviewOutcomeVM>(objreviewOutcome.DataContext, ReviewOutcomeVM)).ReviewAfterDTTM;
                this.oReinstateVM.oManageReviewPeriod.NewReviewAfter = this.oManageReviewPeriod.oReviewAfterDetail.ReviewAfter;
                this.oReinstateVM.oManageReviewPeriod.NewReviewAfterUOM = this.oManageReviewPeriod.oReviewAfterDetail.ReviewAfterUOM;
                this.oReinstateVM.oManageReviewPeriod.NewReviewRequestComments = this.oManageReviewPeriod.oReviewAfterDetail.ReviewRequestComments;
            }
            this.oReviewOutcome.dupDialogRef.close();

            // args.AppChildWindow.DialogResult = true;
            this.oReinstateVM.ReinstateSlots();
        }
    }
    private CheckMandatory(): boolean {
        let bResult: boolean = true;
        let oiMessageBox: iMessageBox = new iMessageBox();
        oiMessageBox.Closed = (s, e) => { this.oiMessageBox_Closed(s, e); };
        oiMessageBox.Title = "Lorenzo";
        oiMessageBox.IconType = MessageBoxType.Information;
        if (String.IsNullOrWhiteSpace(this.oReinstateVM.ReinstateReason)) {
            oiMessageBox.Message = Resource.MedsAdminReinstateslots.ErrMsg_ReinstateReasons;
            oiMessageBox.Tag = MedsAdminReinstateslots.CONTS_REINSTATEREASONS;
            oiMessageBox.OverlayBrush = new SolidColorBrush(Colors.Transparent);
            oiMessageBox.MessageButton = MessageBoxButton.OK;
            oiMessageBox.Width = 355;
            oiMessageBox.Show();
            return false;
        }
        return bResult;
    }
    oiMessageBox_Closed(sender: Object, e: EventArgs): void {
        let oiMessageBox: iMessageBox = ObjectHelper.CreateType<iMessageBox>(sender, iMessageBox);
        if (oiMessageBox != null) {
            if (String.Compare(oiMessageBox.Tag.ToString(), MedsAdminReinstateslots.CONTS_REINSTATEREASONS, StringComparison.CurrentCultureIgnoreCase) == 0) {
                this.txtReinstatereason.Focus();
            }
        }
    }
    private chkReinstateAll_Checked(sender: Object, e: RoutedEventArgs): void {

    }
    private chkReinstateAll_UnChecked(sender: Object, e: RoutedEventArgs): void {

    }
}
