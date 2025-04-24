
import { Convert, AppActivity, ObjectHelper } from 'epma-platform/services';
import {
    Double,
    StringComparison, AppDialogEventargs,
    AppDialogResult,
    ObservableCollection,
    Visibility,
    ArrayOfString,
    ChildWindow, CListItem, WindowButtonType
} from 'epma-platform/models';
import { Colors, SolidColorBrush } from 'epma-platform/controls';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import {
    MessageEventArgs, MessageBoxResult, iMessageBox,
    MessageBoxButton, MessageBoxType
} from 'epma-platform/services';
import { ChartContext, TagDrugHeaderDetail, ValueDomainValues, MedChartData } from './globalvariable';
import { GetMedsChartData } from '../common/getmedschartdata';
import { CDrugHdrAddnlInfo, CDrugHeader, DrugHeaderItem , DrugHeader} from '../common/drugheader';
import { AdministrationDetailVM, SlotDetailVM } from '../viewmodel/MedicationChartVM';
import { CConstants, ChartType, DoseTypeCode, InfChartAlert, InfusionRecordAdminTypeCodes, InfusionTypesCode, MedAction, MedicationAction, MultiRouteType, RecordAdminType, SlotStatus } from './CConstants';
import { INFRecordAdminParams } from './InfusionChartHelper';
import { Common, MedsAdminCommonData } from './common';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { AdministrationDetail, AlertsInfo, CALaunch, CReqMsgGetInfRecAdminDefaultValues, CResMsgGetInfRecAdminDefaultValues, GetInfRecAdminDefaultValuesCompletedEventArgs, InfAdministeredTimes, InfSumaryViewParams, InfusionAdminDetail, MedicationAdministrationWSSoapClient, SlotDetail } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { InfusionChart } from '../resource/infusionchart.designer';
import { MedsAdminChartToolTip } from '../resource/medsadmincharttooltip.designer';
import { ProfileData } from './ProfileData';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { InfActionsConceptCodeData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { InfusionTypeCode } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { InfrecordadminVM } from '../viewmodel/InfrecordadminVM';
import { DrugItem } from 'src/app/lorarcbluebirdmedicationchart/common/DrugItem';
import { InfusionTagObject } from 'src/app/lorarcbluebirdmedicationchart/common/InfusionTagObject';
import { InfRecAdmMainView } from '../child/InfRecAdmMainView';
import { MedsAdminStrikethrough } from '../child/MedsAdminStrikethrough';


export class InfusionRecAdminHelper {
    objrecordadminmainview: InfRecAdmMainView;
    oTagDrugHeaderDetail: TagDrugHeaderDetail;
    oDrugItem: DrugItem;
    oGetMedsChartData: GetMedsChartData;
    SlotOID: number = 0;
    PrescriptionItemOID: number = 0;
    ScheduledDTTM: DateTime = DateTime.MinValue;
    strInfType: string = String.Empty;
    oInfChrtAlerts: ArrayOfString;
    _Callback: Function;
    isAlertExist: boolean = false;
    bIsAltRqrd: boolean = true;
    oHdrRecordAdmin: CDrugHdrAddnlInfo = null;
    _CanBeStruckThrough: boolean;
    _InfRecAdminTypeCode: InfRecAdminTypeCode = null;
    public AppWindowHeight: number = 670;
    _SlotStatus: string = null;
    _CAlaunch: string = String.Empty;
    public oRecordAdminVM: InfrecordadminVM;
    public oRecordAdminMainView: InfRecAdmMainView;
    oMAST: MedsAdminStrikethrough;
    oSlotVM: SlotDetailVM = null;
    IsAnyParacetamolAdministeredInGivenPeriod: boolean = false;
    public oIChartSlot: InfusionTagObject;
    public IsNextHomeLeaveSlotExists: boolean = false;
    public ScanRecMedMultiRoute: MultiRouteType;
    //public delegate void DlgtInfRecordAdminFinish(SlotDetail objRes, AppDialogResult eAppDialogResult);
    public LaunchRecordadmininfusion(objINFRecAdminParams: INFRecordAdminParams, nMedAdminOID: number, PrescItemOID: number, oInfChartAlerts: ArrayOfString, oCallback: Function, isAltShown: boolean, CanBeStruckThrough: boolean, oInfRecAdminTypeCode: InfRecAdminTypeCode, oInfCALaunch: CALaunch): void {
        this.bIsAltRqrd = isAltShown;
        this._Callback = oCallback;
        let objService: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
        let objReq: CReqMsgGetInfRecAdminDefaultValues = new CReqMsgGetInfRecAdminDefaultValues();
        objReq.oContextInformation = CommonBB.FillContext();
        objReq.oInfSumaryViewParamsBC = new InfSumaryViewParams();
        objReq.oInfSumaryViewParamsBC.PatientOID = ChartContext.PatientOID;
        objReq.oInfSumaryViewParamsBC.PrescriptionItemOID = PrescItemOID;
        objReq.oInfSumaryViewParamsBC.UomTypeCode = "volume,time,compound,weight";
        objReq.oInfSumaryViewParamsBC.IsAlertShown = isAltShown;
        if (objINFRecAdminParams != null && !String.IsNullOrEmpty(objINFRecAdminParams.SlotStatus) && String.Compare(objINFRecAdminParams.SlotStatus, SlotStatus.NOTGIVEN) == 0)
            objReq.oInfSumaryViewParamsBC.ShowChartStatus = objINFRecAdminParams.SlotStatus;
        if (objINFRecAdminParams != null && objINFRecAdminParams.SlotOID > 0) {
            objReq.oInfSumaryViewParamsBC.PrescriptionItemScheduleOID = (objINFRecAdminParams != null && objINFRecAdminParams.SlotOID > 0) ? objINFRecAdminParams.SlotOID : 0;
            this.SlotOID = objINFRecAdminParams.SlotOID;
            this.ScheduledDTTM = objINFRecAdminParams.ScheduledDTTM;
            this._SlotStatus = objINFRecAdminParams.SlotStatus;
            this.IsAnyParacetamolAdministeredInGivenPeriod = objINFRecAdminParams.IsAnyParacetamolAdministeredInGivenPeriod;
        }
        else {
            this.SlotOID = 0;
        }
        if (objINFRecAdminParams != null && String.Equals(objINFRecAdminParams.SlotStatus, "CC_NOTKNOWN", StringComparison.CurrentCultureIgnoreCase) && nMedAdminOID == 0) {
            objReq.oInfSumaryViewParamsBC.IsSlotInPastDateAndStatusUnknown = true;
        }
        this.PrescriptionItemOID = PrescItemOID;
        if (this.oIChartSlot != null && this.oIChartSlot.oDrugItem != null && this.oIChartSlot.oDrugItem.Tag != null) {
            let oTagDrugHeaderDetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(this.oIChartSlot.oDrugItem.Tag, TagDrugHeaderDetail);
            this.ScanRecMedMultiRoute = oTagDrugHeaderDetail.MultiRoute_Type;
        }
        this._CanBeStruckThrough = CanBeStruckThrough;
        this._CAlaunch = oInfCALaunch.ToString();
        this._InfRecAdminTypeCode = new InfRecAdminTypeCode();
        if (oInfRecAdminTypeCode != null) {
            this._InfRecAdminTypeCode = oInfRecAdminTypeCode;
        }
        if (oInfChartAlerts != null && oInfChartAlerts.Count > 0) {
            this.oInfChrtAlerts = new ArrayOfString();
            this.oInfChrtAlerts = oInfChartAlerts;
        }
        if (objService != null) {
            objService.GetInfRecAdminDefaultValuesCompleted = (s, e) => { this.objService_GetInfRecAdminDefaultValuesCompleted(s, e); };
            objService.GetInfRecAdminDefaultValuesAsync(objReq);
        }
    }
    private objService_GetInfRecAdminDefaultValuesCompleted(sender: Object, e: GetInfRecAdminDefaultValuesCompletedEventArgs): void {
        if (e.Error != null)
            return
        let oInfrecordadminVM: InfrecordadminVM;
        let objCResDefltInfRecdAdmin: CResMsgGetInfRecAdminDefaultValues = e.Result;
        if (objCResDefltInfRecdAdmin != null && objCResDefltInfRecdAdmin.oDrugDetail != null && objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader != null) {
            if (objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.FormViewParameters != null && !String.IsNullOrEmpty(objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.FormViewParameters.INFTYCODE)) {
                this.strInfType = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.FormViewParameters.INFTYCODE;
            }
            else if (!String.IsNullOrEmpty(objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.ItemSubType)) {
                this.strInfType = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.ItemSubType;
            }
            if (objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.IsPGD && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail != null) {
                this.PGDinfStrikethrough(objCResDefltInfRecdAdmin);
            }
            else if (String.Compare(this._CAlaunch, CALaunch.FluidBalnce.ToString()) == 0) {
                this.oRecordAdminVM.InitialiseVM(this.strInfType);
                this.oRecordAdminVM.CanBeStruckThrough = true;
                this.oRecordAdminVM.PrescriptionDuration = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.PrescriptionDuration;
                this.oRecordAdminVM.InfusionType = new CListItem();
                this.oRecordAdminVM.InfusionType.Value = this.strInfType;
                this.oRecordAdminVM.InfSlotStatus = !String.IsNullOrEmpty(this._SlotStatus) ? this._SlotStatus : objCResDefltInfRecdAdmin.oDrugDetail.SlotDetails[0].Status.ToString();
                this.oRecordAdminVM.bIsAlertRequired = false;
                if (objCResDefltInfRecdAdmin != null && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail != null && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.PrescriptionItemScheduleOID > 0)
                    this.SlotOID = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.PrescriptionItemScheduleOID;
                if (objCResDefltInfRecdAdmin.oInfAdministeredTimes != null && objCResDefltInfRecdAdmin.oInfAdministeredTimes.Count > 0) {
                    let _SlotsWhichAreSubsequentToCurrentSlot = objCResDefltInfRecdAdmin.oInfAdministeredTimes.Where(x => x.SlotOID > this.SlotOID);
                    if (_SlotsWhichAreSubsequentToCurrentSlot != null && _SlotsWhichAreSubsequentToCurrentSlot.Count() > 0) {
                        this.oRecordAdminVM.ShowLastActionStrikeThrough = false;
                    }
                    else {
                        this.oRecordAdminVM.ShowLastActionStrikeThrough = true;
                    }
                }
                else {
                    this.oRecordAdminVM.ShowLastActionStrikeThrough = true;
                }
                this.oRecordAdminMainView.InitilizeView(this.oRecordAdminVM);
                this.FillDrugHeaderData(objCResDefltInfRecdAdmin, this.oRecordAdminMainView, this.oRecordAdminVM);
                this.FillInfRecAdminVM(objCResDefltInfRecdAdmin, this.oRecordAdminVM);
                this.oRecordAdminMainView.MainViewLoad();
                this.oRecordAdminVM.OnInfRecordAdminServiceCompleted = (s) => { this.FormVM_OnInfRecordAdminFBServiceCompleted(s); };
            }
            else {
                oInfrecordadminVM = new InfrecordadminVM();
                this.objrecordadminmainview = new InfRecAdmMainView();
                oInfrecordadminVM.InfSlotStatus = !String.IsNullOrEmpty(this._SlotStatus) ? this._SlotStatus : (objCResDefltInfRecdAdmin != null && objCResDefltInfRecdAdmin.oDrugDetail != null && objCResDefltInfRecdAdmin.oDrugDetail.SlotDetails != null && objCResDefltInfRecdAdmin.oDrugDetail.SlotDetails.Count > 0 && objCResDefltInfRecdAdmin.oDrugDetail.SlotDetails[0] != null && !String.IsNullOrEmpty(objCResDefltInfRecdAdmin.oDrugDetail.SlotDetails[0].Status)) ? objCResDefltInfRecdAdmin.oDrugDetail.SlotDetails[0].Status.ToString() : String.Empty;
                this.FillDrugHeaderData(objCResDefltInfRecdAdmin, this.objrecordadminmainview, oInfrecordadminVM);
                oInfrecordadminVM.IsCALaunchCode = this._CAlaunch;
                this.FillInfRecAdminVM(objCResDefltInfRecdAdmin, oInfrecordadminVM);
                oInfrecordadminVM.InitialiseVM(this.strInfType);
                oInfrecordadminVM.CanBeStruckThrough = this._CanBeStruckThrough;
                oInfrecordadminVM.PrescriptionDuration = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.PrescriptionDuration;
                oInfrecordadminVM.InfusionType = new CListItem();
                oInfrecordadminVM.InfusionType.Value = this.strInfType;
                oInfrecordadminVM.bIsAlertRequired = this.bIsAltRqrd;
                if (objCResDefltInfRecdAdmin.oDrugDetail.SlotDetails != null && objCResDefltInfRecdAdmin.oDrugDetail.SlotDetails.Count > 0 && objCResDefltInfRecdAdmin.oDrugDetail.SlotDetails[0] != null && objCResDefltInfRecdAdmin.oDrugDetail.SlotDetails[0].AdministrationDetail != null) {
                    oInfrecordadminVM.MedAdminOID = objCResDefltInfRecdAdmin.oDrugDetail.SlotDetails[0].AdministrationDetail.MedAdminOID;
                }
                if (objCResDefltInfRecdAdmin.oInfAdministeredTimes != null && objCResDefltInfRecdAdmin.oInfAdministeredTimes.Count > 0) {
                    let _SlotsWhichAreSubsequentToCurrentSlot = objCResDefltInfRecdAdmin.oInfAdministeredTimes.Where(oAdminTime => oAdminTime.SlotOID != this.SlotOID && ((String.Equals(oAdminTime.SlotStatus, SlotStatus.NOTGIVEN, StringComparison.InvariantCultureIgnoreCase) && oAdminTime.InfusionStartDTTM > oInfrecordadminVM.LastActionDateTime) || (!String.Equals(oAdminTime.SlotStatus, SlotStatus.NOTGIVEN, StringComparison.InvariantCultureIgnoreCase) && oAdminTime.InfusionEndDTTM > oInfrecordadminVM.LastActionDateTime))).OrderBy(o => o.InfusionEndDTTM).Select(oAdminTime => oAdminTime);
                    if (_SlotsWhichAreSubsequentToCurrentSlot != null && _SlotsWhichAreSubsequentToCurrentSlot.Count() > 0) {
                        oInfrecordadminVM.ShowLastActionStrikeThrough = false;
                    }
                    else {
                        oInfrecordadminVM.ShowLastActionStrikeThrough = true;
                    }
                }
                else {
                    oInfrecordadminVM.ShowLastActionStrikeThrough = true;
                }
                oInfrecordadminVM.oIChartSlot = this.oIChartSlot;
                oInfrecordadminVM.IsNextHomeLeaveSlotExists = this.IsNextHomeLeaveSlotExists;
                this.objrecordadminmainview.InitilizeView(oInfrecordadminVM);
                this.objrecordadminmainview.DataContext = oInfrecordadminVM;
                this.objrecordadminmainview.recordadminVM.SetInfusionActions();
                oInfrecordadminVM.OnInfRecordAdminServiceCompleted = (s) => { this.FormVM_OnInfRecordAdminServiceCompleted(s); };
                let Callback = (s, e) => {
                    if (s != null && e != null) {
                        this.objrecordadminmainview = s;
                    }
                }
                // ObjectHelper.stopFinishAndCancelEvent(true);
                if (oInfrecordadminVM.InfusionType != null && !String.IsNullOrEmpty(oInfrecordadminVM.InfusionType.Value) && (((String.Compare(oInfrecordadminVM.IsCALaunchCode, CALaunch.InfusionChart.ToString()) == 0) && (String.Compare(oInfrecordadminVM.InfSlotStatus, SlotStatus.NOTYETRECORDED) == 0) && (String.Compare(oInfrecordadminVM.InfusionType.Value, InfusionTypesCode.INTERMITTENT) == 0)) || ((String.Compare(oInfrecordadminVM.InfusionType.Value, InfusionTypesCode.INTERMITTENT) == 0) || (String.Equals(oInfrecordadminVM.ItemSubType, InfusionTypesCode.SUBTYPE_GAS)) && oInfrecordadminVM.IsPRN && oInfrecordadminVM.InfusionRecordAdminTypeCode == InfusionRecordAdminTypeCodes.IsRetrospectivePRN)))
                    this.AppWindowHeight = 750;
                else if ((String.Compare(oInfrecordadminVM.IsCALaunchCode, CALaunch.OverviewChart.ToString()) == 0) && (String.Compare(oInfrecordadminVM.ItemSubType, InfusionTypesCode.SUBTYPE_GAS) != 0) && (String.Compare(oInfrecordadminVM.InfSlotStatus, SlotStatus.NOTYETRECORDED) == 0) || (String.Compare(oInfrecordadminVM.InfSlotStatus, SlotStatus.NOTKNOWN) == 0))
                    this.AppWindowHeight = 750;
                else if ((String.Compare(oInfrecordadminVM.InfusionType.Value, InfusionTypesCode.SUBTYPE_GAS) == 0) && (String.Compare(oInfrecordadminVM.IsCALaunchCode, CALaunch.OverviewChart.ToString()) == 0) && ((String.Compare(oInfrecordadminVM.InfSlotStatus, SlotStatus.NOTYETRECORDED) == 0) || (String.Compare(oInfrecordadminVM.InfSlotStatus, SlotStatus.NOTKNOWN) == 0)))
                    this.AppWindowHeight = 700;
                if (!this.isAlertExist) {
                    this.objrecordadminmainview.HelpCode = "FM_MED_INFRECADMIN";
                    let dialogWindowHeight = (this.AppWindowHeight/window.devicePixelRatio); 
                    AppActivity.OpenWindow("Record administration", this.objrecordadminmainview, (s) => { this.objRecordadmininfusion_Closed(s); }, "Record administration", true, dialogWindowHeight, 820, true, WindowButtonType.OkCancel, Callback);
                }
            }
        }
    }
    public PGDinfStrikethrough(objCResDefltInfRecdAdmin: CResMsgGetInfRecAdminDefaultValues): void {
        this.oSlotVM = new SlotDetailVM();
        this.oGetMedsChartData = new GetMedsChartData();
        if (DateTime.NotEquals(objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.ScheduleDTTM, DateTime.MinValue)) {
            this.oSlotVM.ScheduledDTTM = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.ScheduleDTTM;
        }
        this.oSlotVM.CurrentServerDate = CommonBB.GetServerDateTime();
        this.oSlotVM.PrescriptionItemOID = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.PrescriptionItemOID;
        this.oSlotVM.DrugDetail = this.oGetMedsChartData.GetDrugHeader(objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader);
        this.oSlotVM.PresScheduleOID = this.SlotOID;
        this.oSlotVM.DoseType = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.DoseType;
        this.oSlotVM.Dose = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.Dose;
        this.oSlotVM.DoseUOM = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.DoseUOM;
        this.oSlotVM.DoseUOMOID = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.DoseUOMOID;
        this.oSlotVM.DoseUOMLzoID = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.DoseUOMLzoID;
        this.oSlotVM.LDose = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.LowerDose;
        this.oSlotVM.UDose = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.UpperDose;
        this.oSlotVM.Status = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.PrescriptionItemStatus;
        this.oSlotVM.AdministrationDetail = new AdministrationDetailVM();
        if (DateTime.NotEquals(objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.RecordedAt, DateTime.MinValue) && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.RecordedBy != null) {
            this.oSlotVM.AdministrationDetail.RecordedBy = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.RecordedBy;
            this.oSlotVM.AdministrationDetail.RecordedAt = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.RecordedAt;
        }
        this.oSlotVM.AdministrationDetail.AdministeredBy = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.AdministeredBy;
        this.oSlotVM.PrescriptionItemStatus = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.PrescriptionItemStatus;
        this.oSlotVM.PrescriptionEndDate = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.EndDate;
        this.oSlotVM.FreqPerodCode = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.FrequencyType;
        this.oSlotVM.CACode = MedAction.StrikethorughAdmin;
        if (objCResDefltInfRecdAdmin.oDrugDetail.SlotDetails != null && objCResDefltInfRecdAdmin.oDrugDetail.SlotDetails.Count > 0 && objCResDefltInfRecdAdmin.oDrugDetail.SlotDetails[0] != null) {
            this.oSlotVM.IsLastSlotinCurrentView = objCResDefltInfRecdAdmin.oDrugDetail.SlotDetails[0].IsLastSlotInView;
            this.oSlotVM.IsLastSlotCheckRequired = objCResDefltInfRecdAdmin.oDrugDetail.SlotDetails[0].IsLastSlotCheckRequired;
            this.oSlotVM.AdministrationDetail.MedAdminOID = objCResDefltInfRecdAdmin.oDrugDetail.SlotDetails[0].AdministrationDetail != null ? objCResDefltInfRecdAdmin.oDrugDetail.SlotDetails[0].AdministrationDetail.MedAdminOID : 0;
        }
        this.oSlotVM.MultiRoute_Type = <MultiRouteType>objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.MultiRouteType;
        this.oSlotVM.IsParacetamolIngredient = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.IsParacetamolIngredient;
        this.launchPGDinfStrikethrough(this.oSlotVM, objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.IsPGD);
    }
    public launchPGDinfStrikethrough(oSlotVM: SlotDetailVM, IsPGD: boolean): void {
        let oHdrAddnlInfo: CDrugHdrAddnlInfo = new CDrugHdrAddnlInfo();
        oHdrAddnlInfo.RecordedAt = oSlotVM.AdministrationDetail.RecordedAt.ToUserDateTimeString(CConstants.DateTimeFormat) + " (Due at " + oSlotVM.AdministrationDetail.SlotDate.ToUserDateTimeString(CConstants.Timeformat) + ")";
        this.oMAST = new MedsAdminStrikethrough();
        this.oMAST.constructorImpl(oSlotVM, IsPGD);
        //this.oMAST.IsSlotUpdatedEvent -= oMAST_IsSlotUpdatedEvent;
        this.oMAST.IsSlotUpdatedEvent = (s, e) => { this.oMAST_IsSlotUpdatedEvent(); };
        this.oMAST.drgHeader = new DrugHeader();
        this.oMAST.drgHeader.oDrugHeader = new CDrugHeader();
        this.oMAST.drgHeader.oDrugHeader.oDrugHdrBasicInfo = new DrugHeaderItem();
        this.oMAST.drgHeader.oDrugHeader.oDrugHdrBasicInfo.bShowFrequency = false;
        this.oMAST.drgHeader.oDrugHeader.oDrugHdrBasicInfo.bShowSite = false;
        this.oMAST.drgHeader.oDrugHeader.oDrugHdrBasicInfo.bShowAsrequired = false;
        oHdrAddnlInfo.SteppedDoseUOM = oSlotVM.DoseUOM;
        oHdrAddnlInfo.SteppedLowerDose = oSlotVM.LDose;
        oHdrAddnlInfo.SteppedUpperDose = oSlotVM.UDose;
        oHdrAddnlInfo.RecordAdminViewed = RecordAdminType.RecordAdmin;
        this.oMAST.drgHeader.DataContext = Common.SetDrugHeaderContent(oSlotVM.DrugDetail, oHdrAddnlInfo, this.oMAST.drgHeader);
        this.oMAST.HelpCode = "MN_STRIKEADMIN";
        let Callback = (s, e) => {
            if (s != null && e != null) {
                this.oMAST = s;
            }
        }
        // ObjectHelper.stopFinishAndCancelEvent(true);
        AppActivity.OpenWindow(InfusionChart.Title_StrikeThrough, this.oMAST, (s)=>{this.oMAST_Closed(s);}, InfusionChart.DialogTitle_StrikeThrough, true, 730, 420, true, WindowButtonType.OkCancel,null,null,null,Callback);
    }
    iAppdialog: ChildWindow = new ChildWindow();
    oMAST_Closed(args: AppDialogEventargs): void {
        if (args != null && args.Content != null) {
            this.oMAST = args.Content.Component;
        this.iAppdialog = args.AppChildWindow;
        if (this.oSlotVM !=null && !this.oSlotVM.IsSubmitInProgress) {
            if (args.Result == AppDialogResult.Ok) {
                if (!Common.CheckIfLockingDurationElapsed((s, e) => { this.oMsgBox_InfRecAdminClose(s, e); })) {
                    // if (!Common.CheckIfLockingDurationElapsed()) {
                    this.oSlotVM.IsSubmitInProgress = true;
                    Busyindicator.SetStatusBusy("Administration", true);
                    let bdialogresult: boolean = this.oMAST.cmdOkClick();
                    if (bdialogresult) {
                        // ObjectHelper.stopFinishAndCancelEvent(false);
                        args.AppChildWindow.DialogResult = true;
                    }
                    else {
                        Busyindicator.SetStatusIdle("Administration");
                    }
                }
            }
            else if (args.Result == AppDialogResult.Cancel || args.Result == AppDialogResult.Close) {
                if (this._Callback != null) {
                    this._Callback(this.oSlotDetail, args.Result);
                }
                // ObjectHelper.stopFinishAndCancelEvent(false);
                args.AppChildWindow.DialogRef.close();
                // args.AppChildWindow.DialogResult = false;
            }
        }
    }
    }
    oMAST_IsSlotUpdatedEvent(): void {
        this.oSlotDetail = new SlotDetail();
        this.oSlotDetail.AdministrationDetail = new AdministrationDetail();
        this.oSlotDetail.AdministrationDetail.MedAdminOID = this.oSlotVM.AdministrationDetail.MedAdminOID;
        this.oSlotDetail.AdministrationDetail.IsAdministeredOnInfusionChart = true;
        if (this._Callback != null) {
            this._Callback(this.oSlotDetail, AppDialogResult.Ok);
        }
        Busyindicator.SetStatusIdle("Administration");
    }
    oSlotDetail: SlotDetail = null;
   
    objRecordadmininfusion_Closed(args: AppDialogEventargs): void {
        let oInfRecAdmMainView: InfRecAdmMainView = ObjectHelper.CreateType<InfRecAdmMainView>(args.Content.Component, InfRecAdmMainView);
        this.iAppdialog = args.AppChildWindow;
        this.objrecordadminmainview = args.Content.Component;
        if (oInfRecAdmMainView != null && oInfRecAdmMainView.recordadminVM != null) {
            this.oSlotDetail = new SlotDetail();
            this.oSlotDetail.AdministrationDetail = new AdministrationDetail();
            this.oSlotDetail.AdministrationDetail.MedAdminOID = oInfRecAdmMainView.recordadminVM.MedAdminOID;
            this.oSlotDetail.AdministrationDetail.IsAdministeredOnInfusionChart = true;
        }
        if (!oInfRecAdmMainView.recordadminVM.IsSubmitInProgress) {
            if (args.Result == AppDialogResult.Ok) {
                if (!Common.CheckIfLockingDurationElapsed((s, e) => { this.oMsgBox_InfRecAdminClose(s, e); })) {
                    // if (!Common.CheckIfLockingDurationElapsed()) {
                    let _bIsValidationOk: boolean = false;
                    if (oInfRecAdmMainView != null && oInfRecAdmMainView.recordadminVM != null && oInfRecAdmMainView.recordadminVM.FormVM != null && !String.IsNullOrEmpty(oInfRecAdmMainView.recordadminVM.InfusionAction)) {
                        oInfRecAdmMainView.recordadminVM.IsSubmitInProgress = true;
                        Busyindicator.SetStatusBusy("InfRecAdminSubmit");
                        _bIsValidationOk = oInfRecAdmMainView.recordadminVM.FormVM.ValidateAndSubmitForm();

                    }
                    else {
                        if (this._Callback != null) {
                            this._Callback(this.oSlotDetail, AppDialogResult.Cancel);
                        }
                        // ObjectHelper.stopFinishAndCancelEvent(false);
                        args.AppChildWindow.DialogRef.close();
                    }
                }
            }
            else if (args.Result == AppDialogResult.Cancel || args.Result == AppDialogResult.Close) {
                if (this._Callback != null) {
                    this._Callback(this.oSlotDetail, args.Result);
                }
                // ObjectHelper.stopFinishAndCancelEvent(false);
                args.AppChildWindow.DialogRef.close();
            }
        }
    }
    oMsgBox_InfRecAdminClose(sender: Object, e: MessageEventArgs): void {
        if (this._Callback != null) {
            this._Callback(this.oSlotDetail, AppDialogResult.Cancel);
        }
        this.iAppdialog.DialogResult = false;
    }
    FormVM_OnInfRecordAdminServiceCompleted(objRes: SlotDetail): void {
        if (this._Callback != null) {
            this._Callback(objRes, AppDialogResult.Ok);
        }
        this.objrecordadminmainview.appDialog.DialogResult = true;
      if( this.objrecordadminmainview.dupDialogRef != undefined){
        this.objrecordadminmainview.dupDialogRef.close();}
      
       
        Busyindicator.SetStatusIdle("InfRecAdminSubmit");
        if (this.objrecordadminmainview != null && this.objrecordadminmainview.recordadminVM != null && this.objrecordadminmainview.recordadminVM.ReasonforStop != null && !String.IsNullOrEmpty(this.objrecordadminmainview.recordadminVM.ReasonforStop.Value) && String.Compare(this.objrecordadminmainview.recordadminVM.ReasonforStop.Value, "CC_MEDALLADVRECTINTO") == 0)
            this.objrecordadminmainview.recordadminVM.LaunchRecordallergy((this.objrecordadminmainview.recordadminVM), false);
    }
    FormVM_OnInfRecordAdminFBServiceCompleted(objRes: SlotDetail): void {
        this.oRecordAdminVM.CloseInfRecAdminWizard();
        Busyindicator.SetStatusIdle("InfRecAdminSubmit");
        if (this.oRecordAdminVM != null && this.oRecordAdminVM.ReasonforStop != null && !String.IsNullOrEmpty(this.oRecordAdminVM.ReasonforStop.Value) && String.Compare(this.oRecordAdminVM.ReasonforStop.Value, "CC_MEDALLADVRECTINTO") == 0)
            this.oRecordAdminVM.LaunchRecordallergy((this.oRecordAdminVM), false);
    }
    public FillInfRecAdminVM(oRes: CResMsgGetInfRecAdminDefaultValues, oInfrecordadminVM: InfrecordadminVM): void {
        this.FillInfRecAdminDefaults(oRes, oInfrecordadminVM);
        this.FillSummaryViewData(oRes, oInfrecordadminVM);
        this.FillAdminTimes(oRes, oInfrecordadminVM);
    }
    private FillDrugHeaderData(objCResDefltInfRecdAdmin: CResMsgGetInfRecAdminDefaultValues, oInfRecAdmMainView: InfRecAdmMainView, oInfRecAdminVM: InfrecordadminVM): void {
        // this.oGetMedsChartData = new GetMedsChartData();
        let dtCurrentDateTime: DateTime = CommonBB.GetServerDateTime();
        let Startdate: DateTime = dtCurrentDateTime.DateTime.AddDays(-2);
        let Enddate: DateTime = dtCurrentDateTime.DateTime.AddDays(1);
        this.oGetMedsChartData = new GetMedsChartData(ChartContext.PatientOID, ChartContext.EncounterOID, dtCurrentDateTime,
            Startdate, Enddate, ChartType.Infusion_Chart, String.Empty, MedChartData.MedChartOID, false, false);
        this.oDrugItem = new DrugItem();
        this.oHdrRecordAdmin = new CDrugHdrAddnlInfo();
        if (objCResDefltInfRecdAdmin != null && objCResDefltInfRecdAdmin.oDrugDetail != null && objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader != null) {
            this.oDrugItem = this.oGetMedsChartData.GetDrugHeader(objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader);
            if (!String.IsNullOrEmpty(objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.PerodCode))
                oInfRecAdminVM.FreqPerodCode = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.PerodCode;
            let IsAlertShow: boolean = false;
            if (this.oDrugItem != null) {
                if (String.Compare(oInfRecAdminVM.InfSlotStatus, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) == 0) {
                    this.oHdrRecordAdmin.RecordedAt = objCResDefltInfRecdAdmin.oInfSumaryViewAdminDetail.RecordedAt.ToUserDateTimeString(CConstants.DateTimeFormat) + " (Due at " + this.ScheduledDTTM.ToUserDateTimeString(CConstants.Timeformat) + ")";
                }
                else {
                    if (DateTime.NotEquals(this.ScheduledDTTM, DateTime.MinValue))
                        this.oHdrRecordAdmin.DueAt = this.ScheduledDTTM.ToUserDateTimeString(CConstants.DateTimeFormat);
                    if ((!String.Equals(oInfRecAdminVM.InfSlotStatus, SlotStatus.DEFERADMIN, StringComparison.CurrentCultureIgnoreCase) && !String.Equals(oInfRecAdminVM.InfSlotStatus, SlotStatus.DEFERDUENOW, StringComparison.CurrentCultureIgnoreCase) && !String.Equals(oInfRecAdminVM.InfSlotStatus, SlotStatus.DEFEROVERDUE, StringComparison.CurrentCultureIgnoreCase)) && objCResDefltInfRecdAdmin.oDrugDetail != null && objCResDefltInfRecdAdmin.oDrugDetail.SlotDetails[0] != null && objCResDefltInfRecdAdmin.oDrugDetail.SlotDetails[0].AdministrationDetail != null && (DateTime.NotEquals(objCResDefltInfRecdAdmin.oDrugDetail.SlotDetails[0].AdministrationDetail.AdministeredDate, DateTime.MinValue))) {
                        this.oHdrRecordAdmin.RecordedAt = objCResDefltInfRecdAdmin.oDrugDetail.SlotDetails[0].AdministrationDetail.AdministeredDate.ToUserDateTimeString(CConstants.DateTimeFormat);
                    }
                }
                this.oHdrRecordAdmin.SteppedDoseUOM = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.DoseUOM;
                this.oHdrRecordAdmin.SteppedLowerDose = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.LowerDose;
                this.oHdrRecordAdmin.SteppedUpperDose = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.UpperDose;
                if (DateTime.NotEquals(objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.ReviewDTTM, DateTime.MinValue)) {
                    this.oHdrRecordAdmin.ReviewAt = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.ReviewDTTM.ToUserDateTimeString(CConstants.DateTimeFormat);
                    if (DateTime.LessThanOrEqualTo(objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.ReviewDTTM.Date, CommonBB.GetServerDateTime().Date)) {
                        this.oHdrRecordAdmin.ReviewAtVisibility = Visibility.Visible;
                        this.oHdrRecordAdmin.ReviewIconTooltip = Common.GetReviewIconTooltip(objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.ReviewType, objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.ReviewDTTM, objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.ReviewRequestedComments, objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.ReviewedRequestedby);
                    }
                }
                oInfRecAdminVM.IsCriticalMed = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.IsCriticalMed;
                oInfRecAdminVM.CriticalMedsRoutes = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.CriticalMedsRoutes;
                oInfRecAdminVM.CriticalMedsMsg = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.CriticalMedsMsg;
                oInfRecAdminVM.CriticalMedsURL = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.CriticalDrugSiteURL;
                this.SetDrugHeaderProperties(this.oDrugItem, this.oHdrRecordAdmin, oInfRecAdmMainView, this._CanBeStruckThrough, IsAlertShow, oInfRecAdminVM.InfSlotStatus);
            }
            if (this.oDrugItem.Tag != null) {
                this.oTagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(this.oDrugItem.Tag, TagDrugHeaderDetail);
                this.FillAlertdetails(objCResDefltInfRecdAdmin, oInfRecAdminVM, this.oTagDrugHeaderDetail);
                this.SetVMProperties(oInfRecAdminVM, this.oTagDrugHeaderDetail);
                if (objCResDefltInfRecdAdmin.oDrugDetail != null && objCResDefltInfRecdAdmin.oDrugDetail.SlotDetails != null && objCResDefltInfRecdAdmin.oDrugDetail.SlotDetails[0] != null && objCResDefltInfRecdAdmin.oDrugDetail.SlotDetails[0].AdministrationDetail != null)
                    oInfRecAdminVM.MedAdminOID = objCResDefltInfRecdAdmin.oDrugDetail.SlotDetails[0].AdministrationDetail.MedAdminOID;
                oInfRecAdminVM.IsInfusionFluid = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.IsInfusionFluid;
            }
            if (!String.IsNullOrEmpty(objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.AmendedAsRequired)) {
                oInfRecAdminVM.AmendedAsRequired = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.AmendedAsRequired;
            }
            oInfRecAdminVM.IsPRNWithSchedule = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.IsPRNWithSchedule;
        }
    }
    private FillInfRecAdminDefaults(objCResDefltInfRecdAdmin: CResMsgGetInfRecAdminDefaultValues, oInfRecAdminVM: InfrecordadminVM): void {
        if (objCResDefltInfRecdAdmin != null && objCResDefltInfRecdAdmin.oDrugDetail != null && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail != null) {
            if (objCResDefltInfRecdAdmin != null && objCResDefltInfRecdAdmin.oDrugDetail != null && objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader != null) {
                oInfRecAdminVM.IsConditionalExists = objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.IsConditionalExists;
            }
            if ((String.Compare(objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.DoseType, "CC_MEDDOSE4", StringComparison.OrdinalIgnoreCase) == 0) || (String.Compare(objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.DoseType, "CC_STEPPEDVARIABLE", StringComparison.OrdinalIgnoreCase) == 0)) {
                if ((!String.IsNullOrEmpty(objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.Dose)) && (String.IsNullOrEmpty(objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.UpperDose) || String.Equals(objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.UpperDose, "0", StringComparison.CurrentCultureIgnoreCase))) {
                    oInfRecAdminVM.Dose = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.Dose;
                }
            }
            if (objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.DoseUOMOID > 0) {
                oInfRecAdminVM.DoseUOMOID = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.DoseUOMOID;
            }
            if (!String.IsNullOrEmpty(objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.DoseUOM)) {
                oInfRecAdminVM.DoseUOMName = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.DoseUOM;
                oInfRecAdminVM.IslblDoseValue = oInfRecAdminVM.Dose + " " + oInfRecAdminVM.DoseUOMName;
            }
            if (!String.IsNullOrEmpty(objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.DoseUomLorenzoID) && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.DoseUomLorenzoID.length > 0) {
                oInfRecAdminVM.DoseUomLorenzoID = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.DoseUomLorenzoID;
            }
            if (((oInfRecAdminVM.InfusionType != null && String.Compare(InfusionTypesCode.CONTINUOUS, oInfRecAdminVM.InfusionType.Value, StringComparison.OrdinalIgnoreCase) == 0) || (String.Compare(InfusionTypesCode.INTERMITTENT, oInfRecAdminVM.InfusionType.Value, StringComparison.OrdinalIgnoreCase) == 0)) && (String.IsNullOrEmpty(objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.Dose) || objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.DoseUOMOID < 0 || String.IsNullOrEmpty(objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.DoseUOM))) {
                oInfRecAdminVM.IsEnableDose = false;
                oInfRecAdminVM.IsEnableStopDose = false;
            }
            if (objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oSiteList != null) {
                oInfRecAdminVM.SiteList = new ObservableCollection<CListItem>();
                objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oSiteList.forEach((oSList) => {
                    let objSite: CListItem = new CListItem();
                    if (oSList.SiteOID > 0)
                        objSite.Value = oSList.SiteOID.ToString();
                    if (!String.IsNullOrEmpty(oSList.SiteName)) {
                        objSite.DisplayText = oSList.SiteName;
                    }
                    oInfRecAdminVM.SiteList.Add(objSite);
                });
                let oMoresite: CListItem = ObjectHelper.CreateObject(new CListItem(), {
                    DisplayText: "More",
                    Value: "0"
                });
                oInfRecAdminVM.SiteList.Add(oMoresite);
            }
            if (!String.IsNullOrEmpty(objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.Site)) {
                let _tmpSite: CListItem = Common.GetSelectedItem(objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.SiteOID, oInfRecAdminVM.SiteList);
                if (_tmpSite == null) {
                    let _PrescribedSite: CListItem = ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.Site,
                        Value: objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.SiteOID != null ? objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.SiteOID : String.Empty
                    });
                    if (oInfRecAdminVM.SiteList == null) {
                        oInfRecAdminVM.SiteList = new ObservableCollection<CListItem>();
                    }
                    oInfRecAdminVM.SiteList.Add(_PrescribedSite);
                    _tmpSite = _PrescribedSite;
                }
                if (_tmpSite != null) {
                    oInfRecAdminVM.Site = _tmpSite;
                    oInfRecAdminVM.IsEnableSite = false;
                }
            }
            else {
                if (oInfRecAdminVM.SiteList == null) {
                    oInfRecAdminVM.SiteList = new ObservableCollection<CListItem>();
                    let oMoresite: CListItem = ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: "More",
                        Value: "0"
                    });
                    oInfRecAdminVM.SiteList.Add(oMoresite);
                }
            }
            if (objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.PrescribedRoutes != null && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.PrescribedRoutes.Count > 0) {
                oInfRecAdminVM.PrescribedRoutes = new ObservableCollection<CListItem>();
                let oRoutlst: CListItem;
                objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.PrescribedRoutes.forEach((oRouteList) => {
                    oRoutlst = new CListItem();
                    oRoutlst.DisplayText = oRouteList.Name;
                    oRoutlst.Value = oRouteList.OID.ToString();
                    oInfRecAdminVM.PrescribedRoutes.Add(oRoutlst);
                });
                if (objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.PrescribedRoutes.Count == 1) {
                    oInfRecAdminVM.SelectedRoute = oInfRecAdminVM.PrescribedRoutes.FirstOrDefault();
                    oInfRecAdminVM.IsRouteDefaultValueSetInProgress = true;
                }
            }
            if (!String.IsNullOrEmpty(objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.Lumen)) {
                oInfRecAdminVM.Lumen = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.Lumen;
                oInfRecAdminVM.IsEnableLumen = false;
            }
            else oInfRecAdminVM.IsEnableLumen = true;
            if (objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail != null && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail.Count > 0) {
                if (objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].Route != null && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].Route.OID > 0) {
                    let oRoute: CListItem = Common.GetSelectedItem(objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].Route.OID.ToString(), oInfRecAdminVM.PrescribedRoutes);
                    if (oRoute != null) {
                        oInfRecAdminVM.SelectedRoute = oRoute;
                    }
                }
                if (!String.IsNullOrEmpty(objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.DeliveryDevice)) {
                    oInfRecAdminVM.DeliveryDevice = ObjectHelper.CreateObject(new CListItem(), {
                        Value: objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.DeliveryDevice,
                        DisplayText: objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.DeliveryDevice
                    });
                    oInfRecAdminVM.DeliveryDeviceText = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.DeliveryDevice;
                    if (oInfRecAdminVM.DeliveryDeviceList == null)
                        oInfRecAdminVM.DeliveryDeviceList = new ObservableCollection<CListItem>();
                    oInfRecAdminVM.DeliveryDeviceList.Add(oInfRecAdminVM.DeliveryDevice);
                    oInfRecAdminVM.IsEnabledDeliveryDevice = false;
                }
                else {
                    oInfRecAdminVM.IsEnabledDeliveryDevice = true;
                }
                if (objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail != null && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oUomTypeList != null && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oUomTypeList.Count > 0) {
                    let qryUomTypeList = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oUomTypeList.Where(oUOMTypeList => String.Compare(oUOMTypeList.UOMTYCode, "volume", StringComparison.CurrentCultureIgnoreCase) == 0).Select(oUOMTypeList => oUOMTypeList);
                    if (String.Equals(oInfRecAdminVM.ItemSubType, CConstants.SUBTYPE_GAS))
                        qryUomTypeList = qryUomTypeList.Where(u => String.Equals(u.LorenzoID, CConstants.litre));
                    else qryUomTypeList = qryUomTypeList.Where(u => String.Equals(u.LorenzoID, CConstants.ml));
                    oInfRecAdminVM.BagVolumeUOMList = new ObservableCollection<CListItem>();
                    oInfRecAdminVM.WastageUOMList = new ObservableCollection<CListItem>();
                    oInfRecAdminVM.VolumeInfusedUOMList = new ObservableCollection<CListItem>();
                    oInfRecAdminVM.InfusionRateUOMNumeratorList = new ObservableCollection<CListItem>();
                    oInfRecAdminVM.ConcentrationVolumeUOMList = new ObservableCollection<CListItem>();
                    qryUomTypeList.forEach((oUOMTypeList) => {
                        let objUOMType: CListItem = new CListItem();
                        if (oUOMTypeList.UoMOID > 0 && !String.IsNullOrEmpty(oUOMTypeList.UOMTYCode)) {
                            objUOMType.Value = oUOMTypeList.UoMOID.ToString();
                            objUOMType.Tag = oUOMTypeList.LorenzoID;
                        }
                        if (!String.IsNullOrEmpty(oUOMTypeList.Name)) {
                            objUOMType.DisplayText = oUOMTypeList.Name;
                        }
                        if (!String.IsNullOrEmpty(objUOMType.DisplayText)) {
                            oInfRecAdminVM.BagVolumeUOMList.Add(objUOMType);
                            oInfRecAdminVM.WastageUOMList.Add(objUOMType);
                            oInfRecAdminVM.VolumeInfusedUOMList.Add(objUOMType);
                            oInfRecAdminVM.ConcentrationVolumeUOMList.Add(objUOMType);
                            oInfRecAdminVM.InfusionRateUOMNumeratorList.Add(objUOMType);
                        }
                    });
                }
                if (objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail != null && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oUomTypeList != null && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oUomTypeList.Count > 0) {
                    let qryUomTypeList = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oUomTypeList.Where(oUOMTypeList => String.Compare(oUOMTypeList.UOMTYCode, "time", StringComparison.CurrentCultureIgnoreCase) == 0).Select(oUOMTypeList => oUOMTypeList);
                    qryUomTypeList = qryUomTypeList.OrderBy(x => x.LorenzoID).Select(x => x);
                    if (String.Equals(oInfRecAdminVM.ItemSubType, CConstants.SUBTYPE_GAS))
                        qryUomTypeList = qryUomTypeList.Where(x => x.LorenzoID == CConstants.minute);
                    oInfRecAdminVM.InfusionRateUOMDenominatorList = new ObservableCollection<CListItem>();
                    oInfRecAdminVM.InfusionPeriodMedAdminUOMList = new ObservableCollection<CListItem>();
                    qryUomTypeList.forEach((oUOMTypeList) => {
                        let objUOMType: CListItem = new CListItem();
                        if (oUOMTypeList.UoMOID > 0)
                            objUOMType.Value = oUOMTypeList.UoMOID.ToString();
                        if (!String.IsNullOrEmpty(oUOMTypeList.Name)) {
                            objUOMType.DisplayText = oUOMTypeList.Name;
                            objUOMType.Tag = oUOMTypeList.LorenzoID;
                        }
                        if (!String.IsNullOrEmpty(objUOMType.DisplayText)) {
                            if (!String.Equals(oUOMTypeList.LorenzoID, CConstants.second) && !String.Equals(oUOMTypeList.LorenzoID, CConstants.month) && !String.Equals(oUOMTypeList.LorenzoID, CConstants.year)) {
                                oInfRecAdminVM.InfusionPeriodMedAdminUOMList.Add(objUOMType);
                            }
                            if (!String.IsNullOrEmpty(objUOMType.DisplayText) && (String.Equals(objUOMType.Tag, CConstants.minute) || String.Equals(objUOMType.Tag, CConstants.hour))) {
                                oInfRecAdminVM.InfusionRateUOMDenominatorList.Add(objUOMType);
                            }
                        }
                    });
                }
                if (objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail != null && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oUomTypeList != null && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oUomTypeList.Count > 0) {
                    let qryUomTypeList = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oUomTypeList.Where(oUOMTypeList => String.Compare(oUOMTypeList.UOMTYCode, "weight", StringComparison.CurrentCultureIgnoreCase) == 0).Select(oUOMTypeList => oUOMTypeList);
                    oInfRecAdminVM.WeightInfusedUOMList = new ObservableCollection<CListItem>();
                    qryUomTypeList.forEach((oUOMTypeList) => {
                        let objUOMType: CListItem = new CListItem();
                        if (oUOMTypeList.UoMOID > 0)
                            objUOMType.Value = oUOMTypeList.UoMOID.ToString();
                        if (!String.IsNullOrEmpty(oUOMTypeList.Name)) {
                            objUOMType.DisplayText = oUOMTypeList.Name;
                        }
                        oInfRecAdminVM.WeightInfusedUOMList.Add(objUOMType);
                    });
                }
                if (objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail != null && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oUomTypeList != null && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oUomTypeList.Count > 0) {
                    let qryUomTypeList = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oUomTypeList.Where(oUOMTypeList => String.Compare(oUOMTypeList.UOMTYCode, "compound", StringComparison.CurrentCultureIgnoreCase) == 0).Select(oUOMTypeList => oUOMTypeList);
                    oInfRecAdminVM.CompoundInfusedUOMList = new ObservableCollection<CListItem>();
                    qryUomTypeList.forEach((oUOMTypeList) => {
                        let objUOMType: CListItem = new CListItem();
                        if (oUOMTypeList.UoMOID > 0)
                            objUOMType.Value = oUOMTypeList.UoMOID.ToString();
                        if (!String.IsNullOrEmpty(oUOMTypeList.Name)) {
                            objUOMType.DisplayText = oUOMTypeList.Name;
                        }
                        oInfRecAdminVM.CompoundInfusedUOMList.Add(objUOMType);
                    });
                }
                if (!String.IsNullOrEmpty(objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRate)) {
                    oInfRecAdminVM.DripInfusionRate = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRate;
                    if (String.Equals(oInfRecAdminVM.ItemSubType, CConstants.SUBTYPE_GAS)) {
                        oInfRecAdminVM.IsInfRateVolBased = true;
                    }
                }
                if (objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRateUOM != null && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRateUOM.UOMId > 0) {
                    oInfRecAdminVM.DripInfRateUomOID = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRateUOM.UOMId;
                }
                if (objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRateUOM != null && !String.IsNullOrEmpty(objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRateUOM.UOMName)) {
                    oInfRecAdminVM.DripInfusionRateUom = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRateUOM.UOMName;
                    if (String.Compare(objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRateUOM.UOMCode, "UOM-128") == 0)
                        oInfRecAdminVM.IsEnableDripCal = false;
                    else oInfRecAdminVM.IsEnableDripCal = true;
                }
                if (objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRateUOM != null && !String.IsNullOrEmpty(objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRateUOM.UOMCode)) {
                    oInfRecAdminVM.InfusionRateUOMLorenzoID = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRateUOM.UOMCode;
                }
                if (objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRatePerUOM != null && !String.IsNullOrEmpty(objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRatePerUOM.UOMName)) {
                    oInfRecAdminVM.DripInfRatePerUomOID = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRatePerUOM.UOMId;
                    if (!String.IsNullOrEmpty(oInfRecAdminVM.DripInfusionRateUom)) {
                        oInfRecAdminVM.DripInfusionRateUom += "/" + objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRatePerUOM.UOMName;
                    }
                }
                if (objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRatePerUOM != null && !String.IsNullOrEmpty(objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRatePerUOM.UOMCode)) {
                    oInfRecAdminVM.InfusionRatePerLorezoID = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRatePerUOM.UOMCode;
                }
                oInfRecAdminVM.ConcentrationStrengthUOMList = new ObservableCollection<CListItem>();
                if (objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.ConcentrationDoseUOMs != null && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.ConcentrationDoseUOMs.Count > 0 && !String.Equals(oInfRecAdminVM.ItemSubType, "CC_MULCMPNTITM")) {
                    let oStrengthUomItem: CListItem;
                    objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.ConcentrationDoseUOMs.OrderBy(x => x.Name).forEach((oStrengthItem) => {
                        oStrengthUomItem = new CListItem();
                        oStrengthUomItem.DisplayText = oStrengthItem.Name;
                        oStrengthUomItem.Value = oStrengthItem.OID.ToString();
                        oInfRecAdminVM.ConcentrationStrengthUOMList.Add(oStrengthUomItem);
                    });
                }
                if ((String.Compare(objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.DoseType, DoseTypeCode.CONDITIONAL, StringComparison.OrdinalIgnoreCase) == 0 && !oInfRecAdminVM.IsConditionalExists)) {
                    if ((oInfRecAdminVM.ConcentrationStrengthUOMList.Count > 0 && !oInfRecAdminVM.ConcentrationStrengthUOMList.Any(x => x.DisplayText.Contains("More"))) || (oInfRecAdminVM.ConcentrationStrengthUOMList.Count == 0)) {
                        oInfRecAdminVM.ConcentrationStrengthUOMList.Add(ObjectHelper.CreateObject(new CListItem(), { DisplayText: "More", Value: "CC_More" }));
                    }
                    oInfRecAdminVM.DoseUOMs = new ObservableCollection<CListItem>(oInfRecAdminVM.ConcentrationStrengthUOMList);
                    oInfRecAdminVM.StopDoseUOMs = new ObservableCollection<CListItem>(oInfRecAdminVM.ConcentrationStrengthUOMList);
                }
                if (!String.IsNullOrEmpty(objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].ConcentrationStrength)) {
                    oInfRecAdminVM.ConcentrationStrength = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].ConcentrationStrength;
                    if (oInfRecAdminVM.PrevConcentrationVisible == Visibility.Visible)
                        oInfRecAdminVM.PreviousConcentration = oInfRecAdminVM.ConcentrationStrength + "  ";
                }
                else {
                    oInfRecAdminVM.EnableConcentration = false;
                }
                if (objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].ConcentrationStrengthUOM != null && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].ConcentrationStrengthUOM.UOMId > 0) {
                    let tmpStrength: CListItem = new CListItem();
                    tmpStrength.DisplayText = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].ConcentrationStrengthUOM.UOMName;
                    tmpStrength.Value = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].ConcentrationStrengthUOM.UOMId.ToString();
                    oInfRecAdminVM.ConcentrationStrengthUOM = tmpStrength;
                    if (Common.GetSelectedItem(tmpStrength.Value, oInfRecAdminVM.ConcentrationStrengthUOMList) == null)
                        oInfRecAdminVM.ConcentrationStrengthUOMList.Add(tmpStrength);
                    oInfRecAdminVM.ConcentrationStrengthUOM = Common.GetSelectedItem(oInfRecAdminVM.ConcentrationStrengthUOM.Value, oInfRecAdminVM.ConcentrationStrengthUOMList);
                    if (oInfRecAdminVM.PrevConcentrationVisible == Visibility.Visible)
                        oInfRecAdminVM.PreviousConcentration += oInfRecAdminVM.ConcentrationStrengthUOM.DisplayText + "/";
                }
                else {
                    oInfRecAdminVM.EnableConcentration = false;
                }
                if ((oInfRecAdminVM.ConcentrationStrengthUOMList.Count > 0 && !oInfRecAdminVM.ConcentrationStrengthUOMList.Any(x => x.DisplayText.Contains("More"))) || (oInfRecAdminVM.ConcentrationStrengthUOMList.Count == 0)) {
                    oInfRecAdminVM.ConcentrationStrengthUOMList.Add(ObjectHelper.CreateObject(new CListItem(), { DisplayText: "More", Value: "CC_More" }));
                }
                if (!String.IsNullOrEmpty(objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].ConcentrationVolume)) {
                    oInfRecAdminVM.ConcentrationVolume = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].ConcentrationVolume;
                    if (oInfRecAdminVM.PrevConcentrationVisible == Visibility.Visible) {
                        oInfRecAdminVM.PreviousConcentration += oInfRecAdminVM.ConcentrationVolume + " ";
                    }
                }
                else {
                    oInfRecAdminVM.EnableConcentration = false;
                }
                if (objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].ConcentrationVolumeUOM != null && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].ConcentrationVolumeUOM.UOMId > 0) {
                    let tmpVolume: CListItem = new CListItem();
                    tmpVolume.DisplayText = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].ConcentrationVolumeUOM.UOMName;
                    tmpVolume.Value = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].ConcentrationVolumeUOM.UOMId.ToString();
                    oInfRecAdminVM.ConcentrationVolumeUOM = tmpVolume;
                    oInfRecAdminVM.ConcentrationVolumeUOM = Common.GetSelectedItem(oInfRecAdminVM.ConcentrationVolumeUOM.Value, oInfRecAdminVM.ConcentrationVolumeUOMList);
                    if (oInfRecAdminVM.PrevConcentrationVisible == Visibility.Visible)
                        oInfRecAdminVM.PreviousConcentration += oInfRecAdminVM.ConcentrationVolumeUOM.DisplayText;
                }
                else {
                    oInfRecAdminVM.EnableConcentration = false;
                }
                if (objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail != null && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail.Count > 0 && !String.IsNullOrEmpty(objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].ConcentrationStrength) && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].ConcentrationStrengthUOM != null && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].ConcentrationStrengthUOM.UOMId > 0 && !String.IsNullOrEmpty(objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].ConcentrationVolume) && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].ConcentrationVolumeUOM != null && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].ConcentrationVolumeUOM.UOMId > 0 && oInfRecAdminVM.InfusionType != null && !String.IsNullOrEmpty(oInfRecAdminVM.InfusionType.Value) && !String.Equals(oInfRecAdminVM.InfusionType.Value, InfusionTypeCode.PCA, StringComparison.InvariantCultureIgnoreCase)) {
                    oInfRecAdminVM.IsEnableConcentration = false;
                }
                else {
                    oInfRecAdminVM.IsEnableConcentration = true;
                }
                if (oInfRecAdminVM.InfusionType != null && !String.IsNullOrEmpty(oInfRecAdminVM.InfusionType.Value) && String.Equals(oInfRecAdminVM.InfusionType.Value, InfusionTypeCode.CONTINUOUS, StringComparison.InvariantCultureIgnoreCase)) {
                    if (!oInfRecAdminVM.IsEnableConcentration) {
                        oInfRecAdminVM.IsMandatoryForBegunConcentration = false;
                        oInfRecAdminVM.IsCtrlConcentration = Visibility.Collapsed;
                        oInfRecAdminVM.IslblConcentrationValueVisi = Visibility.Visible;
                        oInfRecAdminVM.IsBackgrdConcentrationVisible = Visibility.Visible;
                        oInfRecAdminVM.lblConcentrationValue = oInfRecAdminVM.ConcentrationStrength + "  " + oInfRecAdminVM.ConcentrationStrengthUOM.DisplayText + "/" + oInfRecAdminVM.ConcentrationVolume + " " + oInfRecAdminVM.ConcentrationVolumeUOM.DisplayText;
                    }
                    else if (oInfRecAdminVM.IsEnableConcentration && !oInfRecAdminVM.IsInfusionFluid) {
                        oInfRecAdminVM.IsMandatoryForBegunConcentration = true;
                        oInfRecAdminVM.IsCtrlConcentration = Visibility.Visible;
                        oInfRecAdminVM.IslblConcentrationValueVisi = Visibility.Collapsed;
                        oInfRecAdminVM.IsBackgrdConcentrationVisible = Visibility.Visible;
                    }
                    else {
                        oInfRecAdminVM.IsMandatoryForBegunConcentration = false;
                        oInfRecAdminVM.IsCtrlConcentration = Visibility.Collapsed;
                        oInfRecAdminVM.IslblConcentrationValueVisi = Visibility.Collapsed;
                        oInfRecAdminVM.lblConcentrationVisi = Visibility.Collapsed;
                        oInfRecAdminVM.IsBackgrdRouteVisible = Visibility.Collapsed;
                        oInfRecAdminVM.IsBackgrdConcentrationVisible = Visibility.Collapsed;
                    }
                }
                else {
                    if (oInfRecAdminVM.InfusionType != null && !String.IsNullOrEmpty(oInfRecAdminVM.InfusionType.Value) && String.Equals(oInfRecAdminVM.InfusionType.Value, InfusionTypeCode.SINGLEDOSEVOLUME, StringComparison.InvariantCultureIgnoreCase)) {
                        oInfRecAdminVM.IsMandatoryForBegunConcentration = true;
                    }
                    oInfRecAdminVM.IsCtrlConcentration = Visibility.Visible;
                    oInfRecAdminVM.IslblConcentrationValueVisi = Visibility.Collapsed;
                }
                if (objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.InfusionPeriodforMedAdmin > 0) {
                    oInfRecAdminVM.InfusionPeriodMedAdmin = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.InfusionPeriodforMedAdmin.ToString();
                    oInfRecAdminVM.EnableInfusionPeriodMedAdmin = false;
                    if (objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.InfusionPeriodUOMforMedAdmin != null && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.InfusionPeriodUOMforMedAdmin.UOMId > 0) {
                        let tmpInfPeriod: CListItem = new CListItem();
                        tmpInfPeriod.DisplayText = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.InfusionPeriodUOMforMedAdmin.UOMName;
                        tmpInfPeriod.Value = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.InfusionPeriodUOMforMedAdmin.UOMId.ToString();
                        oInfRecAdminVM.InfusionPeriodMedAdminUOM = tmpInfPeriod;
                        if (Common.GetSelectedItem(oInfRecAdminVM.InfusionPeriodMedAdminUOM.Value, oInfRecAdminVM.InfusionPeriodMedAdminUOMList) == null)
                            oInfRecAdminVM.InfusionPeriodMedAdminUOMList.Add(tmpInfPeriod);
                        oInfRecAdminVM.InfusionPeriodMedAdminUOM = Common.GetSelectedItem(oInfRecAdminVM.InfusionPeriodMedAdminUOM.Value, oInfRecAdminVM.InfusionPeriodMedAdminUOMList);
                    }
                }
                else if (oInfRecAdminVM.InfusionType != null && (String.Equals(oInfRecAdminVM.InfusionType.Value, InfusionTypesCode.CONTINUOUS, StringComparison.InvariantCultureIgnoreCase) || String.Equals(oInfRecAdminVM.InfusionType.Value, InfusionTypesCode.SINGLEDOSEVOLUME, StringComparison.InvariantCultureIgnoreCase))) {
                    oInfRecAdminVM.EnableInfusionPeriodMedAdmin = false;
                }
                else {
                    oInfRecAdminVM.EnableInfusionPeriodMedAdmin = true;
                }
                if (oInfRecAdminVM.VolumeInfusedUOMList != null) {
                    let checkVolumebasedIfusedUom = oInfRecAdminVM.VolumeInfusedUOMList.Where(c => c.Tag.ToString() == oInfRecAdminVM.InfusionRateUOMLorenzoID).Select(s => s).ToList();
                    if (checkVolumebasedIfusedUom.Count > 0) {
                        oInfRecAdminVM.IsInfRateVolBased = true;
                        oInfRecAdminVM.InfusionRate = oInfRecAdminVM.DripInfusionRate;
                        oInfRecAdminVM.InfusionRateUOM = oInfRecAdminVM.DripInfusionRateUom;
                    }
                    else if (oInfRecAdminVM != null && String.IsNullOrEmpty(oInfRecAdminVM.InfusionRateUOMLorenzoID)) {
                        oInfRecAdminVM.IsInfRateVolBased = true;
                    }
                    else {
                        oInfRecAdminVM.IsInfRateVolBased = false;
                    }
                }
                if (objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].IsInfusionRateRangeProvided == true) {
                    oInfRecAdminVM.EnableInfusionDose = !oInfRecAdminVM.IsInfRateVolBased;
                    oInfRecAdminVM.InfusionDose = String.Empty;
                    oInfRecAdminVM.InfusionDoseNumeratorUOMID = (oInfRecAdminVM.EnableInfusionDose) ? oInfRecAdminVM.DripInfRateUomOID : 0;
                    oInfRecAdminVM.InfusionDoseDenominatorUOMID = (oInfRecAdminVM.EnableInfusionDose) ? oInfRecAdminVM.DripInfRatePerUomOID : 0;
                    oInfRecAdminVM.InfusionDoseUOM = (oInfRecAdminVM.EnableInfusionDose) ? oInfRecAdminVM.DripInfusionRateUom : String.Empty;
                    oInfRecAdminVM.InfusionRate = String.Empty;
                    oInfRecAdminVM.InfusionRateUOMNumerator = ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRateUOM.UOMName,
                        Value: objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRateUOM.UOMId.ToString(),
                        Tag: objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRateUOM.UOMCode
                    });
                    oInfRecAdminVM.InfusionRateUOMNumerator = Common.GetSelectedItem(oInfRecAdminVM.InfusionRateUOMNumerator.Value, oInfRecAdminVM.InfusionRateUOMNumeratorList);
                    oInfRecAdminVM.InfusionRateUOMDenominator = ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRatePerUOM.UOMName,
                        Value: objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRatePerUOM.UOMId.ToString(),
                        Tag: objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRatePerUOM.UOMCode
                    });
                    oInfRecAdminVM.InfusionRateUOMDenominator = Common.GetSelectedItem(oInfRecAdminVM.InfusionRateUOMDenominator.Value, oInfRecAdminVM.InfusionRateUOMDenominatorList);
                    oInfRecAdminVM.InfusionRateUOM = String.Empty;
                }
                else if ((oInfRecAdminVM.IsInfRateVolBased == false) && (oInfRecAdminVM.VolumeInfusedUOMList != null)) {
                    oInfRecAdminVM.EnableInfusionDose = true;
                    oInfRecAdminVM.InfusionDose = oInfRecAdminVM.DripInfusionRate;
                    oInfRecAdminVM.InfusionDoseNumeratorUOMID = oInfRecAdminVM.DripInfRateUomOID;
                    oInfRecAdminVM.InfusionDoseDenominatorUOMID = oInfRecAdminVM.DripInfRatePerUomOID;
                    oInfRecAdminVM.InfusionDoseUOM = oInfRecAdminVM.DripInfusionRateUom;
                    oInfRecAdminVM.InfusionRate = String.Empty;
                    oInfRecAdminVM.InfusionRateUOMNumerator = null;
                    oInfRecAdminVM.InfusionRateUOMDenominator = null;
                    oInfRecAdminVM.InfusionRateUOM = String.Empty;
                }
                else {
                    oInfRecAdminVM.EnableInfusionDose = false;
                    oInfRecAdminVM.InfusionDose = String.Empty;
                    oInfRecAdminVM.InfusionDoseNumeratorUOMID = 0;
                    oInfRecAdminVM.InfusionDoseDenominatorUOMID = 0;
                    oInfRecAdminVM.InfusionDoseUOM = String.Empty;
                    oInfRecAdminVM.InfusionRate = oInfRecAdminVM.DripInfusionRate;
                    oInfRecAdminVM.InfusionRateUOMNumerator = new CListItem();
                    oInfRecAdminVM.InfusionRateUOMNumerator.DisplayText = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRateUOM.UOMName;
                    oInfRecAdminVM.InfusionRateUOMNumerator.Value = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRateUOM.UOMId.ToString();
                    oInfRecAdminVM.InfusionRateUOMNumerator.Tag = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRateUOM.UOMCode;
                    oInfRecAdminVM.InfusionRateUOMNumerator = Common.GetSelectedItem(oInfRecAdminVM.InfusionRateUOMNumerator.Value, oInfRecAdminVM.InfusionRateUOMNumeratorList);
                    oInfRecAdminVM.InfusionRateUOMDenominator = new CListItem();
                    oInfRecAdminVM.InfusionRateUOMDenominator.DisplayText = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRatePerUOM.UOMName;
                    oInfRecAdminVM.InfusionRateUOMDenominator.Value = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRatePerUOM.UOMId.ToString();
                    oInfRecAdminVM.InfusionRateUOMDenominator.Tag = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRatePerUOM.UOMCode;
                    oInfRecAdminVM.InfusionRateUOMDenominator = Common.GetSelectedItem(oInfRecAdminVM.InfusionRateUOMDenominator.Value, oInfRecAdminVM.InfusionRateUOMDenominatorList);
                    oInfRecAdminVM.InfusionRateUOM = oInfRecAdminVM.DripInfusionRateUom;
                }
                if (oInfRecAdminVM.VolumeInfusedUOMList != null) {
                    let checkVolumebasedIfusedUom = oInfRecAdminVM.VolumeInfusedUOMList.Where(c => c.Tag.ToString() == oInfRecAdminVM.InfusionRateUOMLorenzoID).Select(s => s).ToList();
                    if (checkVolumebasedIfusedUom.Count > 0) {
                        oInfRecAdminVM.IsInfRateVolBased = true;
                        oInfRecAdminVM.InfusionRate = oInfRecAdminVM.DripInfusionRate;
                        oInfRecAdminVM.InfusionRateUOM = oInfRecAdminVM.DripInfusionRateUom;
                    }
                    else {
                        oInfRecAdminVM.IsInfRateVolBased = false;
                        if (!String.IsNullOrEmpty(oInfRecAdminVM.InfusionDoseUOM)) {
                            oInfRecAdminVM.IsInfusionrateCal = Visibility.Visible;
                            oInfRecAdminVM.IsInfDripnrateCal = Visibility.Collapsed;
                        }
                        else if (!String.IsNullOrEmpty(oInfRecAdminVM.DoseUOMName) && oInfRecAdminVM.DoseUOMOID > 0) {
                            let checkVolumebasedIfusedUom1 = oInfRecAdminVM.VolumeInfusedUOMList.Where(c => c.Value.ToString() == oInfRecAdminVM.DoseUOMOID.ToString()).Select(s => s).ToList();
                            if (checkVolumebasedIfusedUom1 != null && checkVolumebasedIfusedUom1.Count > 0) {
                                oInfRecAdminVM.IsInfusionrateCal = Visibility.Collapsed;
                                oInfRecAdminVM.IsInfDripnrateCal = Visibility.Visible;
                            }
                            else {
                                oInfRecAdminVM.IsInfusionrateCal = Visibility.Visible;
                                oInfRecAdminVM.IsInfDripnrateCal = Visibility.Collapsed;
                            }
                        }
                    }
                }
                if (objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oAlertsInfoDetails != null) {
                    this.isAlertExist = true;
                    oInfRecAdminVM.bIsAlertRequired = false;
                    this.ShowAlertMessage(objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oAlertsInfoDetails, oInfRecAdminVM);
                }
                if (this.SlotOID > 0)
                    oInfRecAdminVM.PresScheduleOID = this.SlotOID;
                else oInfRecAdminVM.PresScheduleOID = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.PrescriptionItemScheduleOID;
                if (this.PrescriptionItemOID > 0)
                    oInfRecAdminVM.PrescriptionItemOID = this.PrescriptionItemOID;
                else oInfRecAdminVM.PrescriptionItemOID = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].PrescriptionItemOID;
                if (((String.Compare(InfusionTypesCode.INTERMITTENT, oInfRecAdminVM.InfusionType.Value, StringComparison.OrdinalIgnoreCase) == 0) || (String.Compare(InfusionTypesCode.PCA, oInfRecAdminVM.InfusionType.Value, StringComparison.OrdinalIgnoreCase) == 0)) && (String.IsNullOrEmpty(oInfRecAdminVM.InfusionRate) || String.IsNullOrEmpty(oInfRecAdminVM.InfusionRateUOM))) {
                    oInfRecAdminVM.IsEnableInfusionrate = true;
                }
                if (oInfRecAdminVM.InfusionRateUOMNumerator != null && !String.IsNullOrEmpty(oInfRecAdminVM.InfusionRateUOMNumerator.Value) && !String.Equals(oInfRecAdminVM.InfusionRateUOMNumerator.Value, "0", StringComparison.OrdinalIgnoreCase))
                    oInfRecAdminVM.DontChangeInfRateDefUOMOID = Number.Parse(oInfRecAdminVM.InfusionRateUOMNumerator.Value);
                if (oInfRecAdminVM.InfusionRateUOMDenominator != null && !String.IsNullOrEmpty(oInfRecAdminVM.InfusionRateUOMDenominator.Value) && !String.Equals(oInfRecAdminVM.InfusionRateUOMDenominator.Value, "0", StringComparison.OrdinalIgnoreCase))
                    oInfRecAdminVM.DontChangeInfRateDefPerUOMOID = Number.Parse(oInfRecAdminVM.InfusionRateUOMDenominator.Value);
                if (!String.IsNullOrEmpty(oInfRecAdminVM.InfusionRate))
                    oInfRecAdminVM.DontChangeInfRateDefValue = oInfRecAdminVM.InfusionRate;
                if (!String.IsNullOrEmpty(oInfRecAdminVM.DripRate))
                    oInfRecAdminVM.DontChangeDripRateDefValue = oInfRecAdminVM.DripRate;
                if (oInfRecAdminVM.DripRateUOMID > 0)
                    oInfRecAdminVM.DontChangeDripRateDefUOMOID = oInfRecAdminVM.DripRateUOMID;
                if (!String.IsNullOrEmpty(oInfRecAdminVM.DripRateUOM))
                    oInfRecAdminVM.DontChangeDripRateDefUOM = oInfRecAdminVM.DripRateUOM;
                if (oInfRecAdminVM.DripRatePerUOMID > 0)
                    oInfRecAdminVM.DontChangeDripRateDefPerUOMOID = oInfRecAdminVM.DripRatePerUOMID;
            }
            if (!String.IsNullOrEmpty(oInfRecAdminVM.ItemSubType) && String.Equals(oInfRecAdminVM.ItemSubType, InfusionTypesCode.SUBTYPE_GAS, StringComparison.CurrentCultureIgnoreCase) && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail != null && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRateUOM != null && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRatePerUOM != null) {
                let oRateNumUOM: CListItem = Common.GetSelectedItem(objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRateUOM.UOMId.ToString(), oInfRecAdminVM.InfusionRateUOMNumeratorList);
                if (oRateNumUOM != null) {
                    oInfRecAdminVM.FlowrateNumUOM = oRateNumUOM;
                }
                let oRateDinUOM: CListItem = Common.GetSelectedItem(objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].InfusionRatePerUOM.UOMId.ToString(), oInfRecAdminVM.InfusionRateUOMDenominatorList);
                if (oRateDinUOM != null) {
                    oInfRecAdminVM.FlowrateDenUOM = oRateDinUOM;
                }
            }
            if (objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail != null && !String.IsNullOrEmpty(objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].Humidification)) {
                oInfRecAdminVM.Humicode = objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oInfusionAdminDetail[0].Humidification;
                oInfRecAdminVM.IsEnableHumidification = false;
            }
            else oInfRecAdminVM.IsEnableHumidification = true;
        }
    }
    private FillSummaryViewData(oResGetInfRecAdminDefaultValues: CResMsgGetInfRecAdminDefaultValues, oInfRecAdminVM: InfrecordadminVM): void {
        if (oResGetInfRecAdminDefaultValues.oInfSumaryViewAdminDetail != null) {
            let objAdmDet: AdministrationDetail = oResGetInfRecAdminDefaultValues.oInfSumaryViewAdminDetail;
            if ((String.Compare(oInfRecAdminVM.InfSlotStatus, SlotStatus.DEFERADMIN) != 0) && (String.Compare(oInfRecAdminVM.InfSlotStatus, SlotStatus.DEFEROVERDUE) != 0) && (String.Compare(oInfRecAdminVM.InfSlotStatus, SlotStatus.DEFERDUENOW) != 0) && (String.Compare(oInfRecAdminVM.InfSlotStatus, SlotStatus.NOTGIVEN) != 0)) {
                if (oResGetInfRecAdminDefaultValues.oInfSumaryViewAdminDetail.oAlertsInfoDetails != null) {

                }
                oInfRecAdminVM.InfusionAdministrationDetail = new AdministrationDetailVM();
                if (DateTime.NotEquals(objAdmDet.AdministeredDate, DateTime.MinValue)) {
                    oInfRecAdminVM.GivenDateTime = objAdmDet.AdministeredDate.ToUserDateTimeString(CConstants.DateTimeFormat);
                    oInfRecAdminVM.LastActionDateTime = objAdmDet.AdministeredDate;
                }
                if (!String.IsNullOrEmpty(objAdmDet.AdministeredBy)) {
                    oInfRecAdminVM.AdministeredBy = objAdmDet.AdministeredBy;
                    oInfRecAdminVM.SummaryViewAdministeredBy = objAdmDet.AdministeredBy;
                }
                if (objAdmDet.AdministeredByOID > 0) {
                    oInfRecAdminVM.AdministeredByOID = objAdmDet.AdministeredByOID.ToString();
                    oInfRecAdminVM.SummaryViewAdministeredByOID = objAdmDet.AdministeredByOID.ToString();
                    oInfRecAdminVM.InfusionAdministrationDetail.AdministeredByOID = objAdmDet.AdministeredByOID.ToString();
                }
                if (!String.IsNullOrEmpty(objAdmDet.WitnessedBy)) {
                    oInfRecAdminVM.WitnessBy = objAdmDet.WitnessedBy;
                }
                if (!String.IsNullOrEmpty(objAdmDet.Dose) || !String.IsNullOrEmpty(oInfRecAdminVM.Dose)) {
                    oInfRecAdminVM.Dose = !String.IsNullOrEmpty(objAdmDet.Dose) ? objAdmDet.Dose : oInfRecAdminVM.Dose;
                    if (String.Equals(oInfRecAdminVM.InfusionType.Value, InfusionTypesCode.CONTINUOUS, StringComparison.OrdinalIgnoreCase) || String.Equals(oInfRecAdminVM.InfusionType.Value, InfusionTypesCode.INTERMITTENT, StringComparison.OrdinalIgnoreCase) || String.Equals(oInfRecAdminVM.InfusionType.Value, InfusionTypesCode.SINGLEDOSEVOLUME, StringComparison.OrdinalIgnoreCase) || String.Equals(oInfRecAdminVM.InfusionType.Value, InfusionTypesCode.FLUID, StringComparison.OrdinalIgnoreCase)) {
                        oInfRecAdminVM.DoseAdministered = !String.IsNullOrEmpty(objAdmDet.Dose) ? objAdmDet.Dose : oInfRecAdminVM.Dose;
                    }
                }
                if (objAdmDet.DoseUOMOID > 0) {
                    oInfRecAdminVM.DoseUOMOID = objAdmDet.DoseUOMOID;
                }
                if (!String.IsNullOrEmpty(objAdmDet.DoseUOM)) {
                    oInfRecAdminVM.DoseUOMName = objAdmDet.DoseUOM;
                }
                if (!String.IsNullOrEmpty(objAdmDet.DoseUOM) && objAdmDet.DoseUOMOID > 0) {
                    if (oInfRecAdminVM != null && oInfRecAdminVM.StopDoseUOMs != null && oInfRecAdminVM.StopDoseUOMs.Count > 0) {
                        for (let oUOM of oInfRecAdminVM.StopDoseUOMs.ToArray()) {
                            if (String.Equals(oUOM.Value, objAdmDet.DoseUOMOID.ToString())) {
                                oInfRecAdminVM.lstStopDoseUOM = oUOM;
                                break;
                            }
                        }
                        // oInfRecAdminVM.StopDoseUOMs.forEach( (oUOM)=> {
                        //       if (String.Equals(oUOM.Value, objAdmDet.DoseUOMOID.ToString())) {
                        //           oInfRecAdminVM.lstStopDoseUOM = oUOM;
                        //           break;
                        //       }
                        //   });
                        if (oInfRecAdminVM.lstStopDoseUOM == null) {
                            let oDoseUOM: CListItem = ObjectHelper.CreateObject(new CListItem(), {
                                DisplayText: objAdmDet.DoseUOM,
                                Value: objAdmDet.DoseUOMOID.ToString()
                            });
                            let nIndex: number = oInfRecAdminVM.StopDoseUOMs.Count - 1;
                            oInfRecAdminVM.StopDoseUOMs.Insert(nIndex, oDoseUOM);
                            oInfRecAdminVM.lstStopDoseUOM = oDoseUOM;
                        }
                    }
                }
                if (objAdmDet.MedAdminOID > 0) {
                    oInfRecAdminVM.MedAdminOID = objAdmDet.MedAdminOID;
                }
                if (!String.IsNullOrEmpty(oInfRecAdminVM.Dose) && !String.IsNullOrEmpty(oInfRecAdminVM.DoseUOMName)) {
                    oInfRecAdminVM.DoseValue = String.Concat(oInfRecAdminVM.Dose, " ", oInfRecAdminVM.DoseUOMName);
                }
                if (((oInfRecAdminVM.InfusionType != null && String.Equals(InfusionTypesCode.CONTINUOUS, oInfRecAdminVM.InfusionType.Value, StringComparison.OrdinalIgnoreCase)) || (String.Equals(InfusionTypesCode.INTERMITTENT, oInfRecAdminVM.InfusionType.Value, StringComparison.OrdinalIgnoreCase)) || (String.Equals(InfusionTypesCode.FLUID, oInfRecAdminVM.InfusionType.Value, StringComparison.OrdinalIgnoreCase)) || (String.Equals(InfusionTypesCode.SINGLEDOSEVOLUME, oInfRecAdminVM.InfusionType.Value, StringComparison.OrdinalIgnoreCase))) && (String.IsNullOrEmpty(oInfRecAdminVM.Dose) || oInfRecAdminVM.DoseUOMOID <= 0 || String.IsNullOrEmpty(oInfRecAdminVM.DoseUOMName))) {
                    oInfRecAdminVM.IsEnableStopDose = false;
                }
                if (!String.IsNullOrEmpty(objAdmDet.Lumen)) {
                    oInfRecAdminVM.SummaryviewLumen = objAdmDet.Lumen;
                }
                if (!String.IsNullOrEmpty(objAdmDet.Site)) {
                    oInfRecAdminVM.SummaryviewSite = objAdmDet.Site;
                }
                if (!String.IsNullOrEmpty(objAdmDet.DeliveryDevice)) {
                    oInfRecAdminVM.SummaryViewDeliverydevice = objAdmDet.DeliveryDevice;
                }
                if (objAdmDet.InfusionPeriodforMedAdmin > 0) {
                    oInfRecAdminVM.InfusionPeriodMedAdmin = objAdmDet.InfusionPeriodforMedAdmin.ToString();
                    if (objAdmDet.InfusionPeriodUOMforMedAdmin != null && objAdmDet.InfusionPeriodUOMforMedAdmin.UOMId > 0) {
                        let tmpInfPeriod: CListItem = new CListItem();
                        tmpInfPeriod.DisplayText = objAdmDet.InfusionPeriodUOMforMedAdmin.UOMName;
                        tmpInfPeriod.Value = objAdmDet.InfusionPeriodUOMforMedAdmin.UOMId.ToString();
                        oInfRecAdminVM.InfusionPeriodMedAdminUOM = tmpInfPeriod;
                        if (Common.GetSelectedItem(oInfRecAdminVM.InfusionPeriodMedAdminUOM.Value, oInfRecAdminVM.InfusionPeriodMedAdminUOMList) == null)
                            oInfRecAdminVM.InfusionPeriodMedAdminUOMList.Add(tmpInfPeriod);
                        oInfRecAdminVM.InfusionPeriodMedAdminUOM = Common.GetSelectedItem(oInfRecAdminVM.InfusionPeriodMedAdminUOM.Value, oInfRecAdminVM.InfusionPeriodMedAdminUOMList);
                    }
                }
                if (objAdmDet.oInfusionAdminDetail != null && objAdmDet.oInfusionAdminDetail.Count > 0) {
                    let objInfAdmDet: InfusionAdminDetail = objAdmDet.oInfusionAdminDetail[0];
                    if (!String.IsNullOrEmpty(objInfAdmDet.InfusionRate)) {
                        oInfRecAdminVM.InfusionRate = objInfAdmDet.InfusionRate;
                    }
                    if (objInfAdmDet.InfusionRateUOM != null && !String.IsNullOrEmpty(objInfAdmDet.InfusionRateUOM.UOMName)) {
                        oInfRecAdminVM.InfusionRateUOM = objInfAdmDet.InfusionRateUOM.UOMName;
                    }
                    if (objInfAdmDet.InfusionRateUOM != null && !String.IsNullOrEmpty(objInfAdmDet.InfusionRateUOM.UOMCode)) {
                        oInfRecAdminVM.InfusionRateUOMLorenzoID = objInfAdmDet.InfusionRateUOM.UOMCode;
                    }
                    if (objInfAdmDet.InfusionRateUOM != null && !String.IsNullOrEmpty(objInfAdmDet.InfusionRateUOM.UOMName)) {
                        oInfRecAdminVM.InfusionRateUOMNumerator = ObjectHelper.CreateObject(new CListItem(), {
                            Value: objInfAdmDet.InfusionRateUOM.UOMId.ToString(),
                            DisplayText: objInfAdmDet.InfusionRateUOM.UOMName
                        });
                        oInfRecAdminVM.InfusionRateUOMNumerator = Common.GetSelectedItem(oInfRecAdminVM.InfusionRateUOMNumerator.Value, oInfRecAdminVM.InfusionRateUOMNumeratorList);
                    }
                    if (oInfRecAdminVM.InfusionRateUOMNumerator != null && !String.IsNullOrEmpty(oInfRecAdminVM.InfusionRateUOMNumerator.Value) && !String.Equals(oInfRecAdminVM.InfusionRateUOMNumerator.Value, "0", StringComparison.OrdinalIgnoreCase))
                        oInfRecAdminVM.DontChangeInfRateDefUOMOID = Number.Parse(oInfRecAdminVM.InfusionRateUOMNumerator.Value);
                    if (objInfAdmDet.InfusionRatePerUOM != null && !String.IsNullOrEmpty(objInfAdmDet.InfusionRatePerUOM.UOMName)) {
                        oInfRecAdminVM.InfusionRateUOMDenominator = ObjectHelper.CreateObject(new CListItem(), {
                            Value: objInfAdmDet.InfusionRatePerUOM.UOMId.ToString(),
                            DisplayText: objInfAdmDet.InfusionRatePerUOM.UOMName
                        });
                        oInfRecAdminVM.InfusionRateUOMDenominator = Common.GetSelectedItem(oInfRecAdminVM.InfusionRateUOMDenominator.Value, oInfRecAdminVM.InfusionRateUOMDenominatorList);
                        if (!String.IsNullOrEmpty(oInfRecAdminVM.InfusionRateUOM)) {
                            oInfRecAdminVM.InfusionRateUOM += "/" + objInfAdmDet.InfusionRatePerUOM.UOMName;
                        }
                    }
                    if (oInfRecAdminVM.InfusionRateUOMDenominator != null && !String.IsNullOrEmpty(oInfRecAdminVM.InfusionRateUOMDenominator.Value) && !String.Equals(oInfRecAdminVM.InfusionRateUOMDenominator.Value, "0", StringComparison.OrdinalIgnoreCase))
                        oInfRecAdminVM.DontChangeInfRateDefPerUOMOID = Number.Parse(oInfRecAdminVM.InfusionRateUOMDenominator.Value);
                    if (!String.IsNullOrEmpty(oInfRecAdminVM.InfusionRate) && !String.IsNullOrEmpty(oInfRecAdminVM.InfusionRateUOM)) {
                        oInfRecAdminVM.InfusionRateValue = this.ValidDecimal(oInfRecAdminVM.InfusionRate) + " " + oInfRecAdminVM.InfusionRateUOM;
                        oInfRecAdminVM.DontChangeInfRateDefValue = oInfRecAdminVM.InfusionRate;
                    }
                    if (objInfAdmDet.InfusionRatePerUOM != null && !String.IsNullOrEmpty(objInfAdmDet.InfusionRatePerUOM.UOMCode)) {
                        oInfRecAdminVM.InfusionRatePerLorezoID = objInfAdmDet.InfusionRatePerUOM.UOMCode;
                    }
                    oInfRecAdminVM.EnableConcentration = true;
                    if (!String.IsNullOrEmpty(objInfAdmDet.ConcentrationStrength)) {
                        if (!oInfRecAdminVM.ChangeConcentrationAlert && !oInfRecAdminVM.ChangeRateAndConcentrationAlert)
                            oInfRecAdminVM.ConcentrationStrength = objInfAdmDet.ConcentrationStrength;
                        oInfRecAdminVM.PreviousConcentration = objInfAdmDet.ConcentrationStrength;
                    }
                    else oInfRecAdminVM.EnableConcentration = false;
                    if (objInfAdmDet.ConcentrationStrengthUOM != null && objInfAdmDet.ConcentrationStrengthUOM.UOMId > 0) {
                        if (!oInfRecAdminVM.ChangeConcentrationAlert && !oInfRecAdminVM.ChangeRateAndConcentrationAlert) {
                            let tmpStrength: CListItem = new CListItem();
                            tmpStrength.DisplayText = objInfAdmDet.ConcentrationStrengthUOM.UOMName;
                            tmpStrength.Value = objInfAdmDet.ConcentrationStrengthUOM.UOMId.ToString();
                            if (Common.GetSelectedItem(tmpStrength.Value, oInfRecAdminVM.ConcentrationStrengthUOMList) == null) {
                                if (oInfRecAdminVM.ConcentrationStrengthUOMList != null && oInfRecAdminVM.ConcentrationStrengthUOMList.Any(x => x.DisplayText.Contains("More")))
                                    oInfRecAdminVM.ConcentrationStrengthUOMList.Insert(oInfRecAdminVM.ConcentrationStrengthUOMList.Count - 1, tmpStrength);
                            }
                            oInfRecAdminVM.ConcentrationStrengthUOM = Common.GetSelectedItem(tmpStrength.Value, oInfRecAdminVM.ConcentrationStrengthUOMList);
                        }
                        if (!String.IsNullOrEmpty(oInfRecAdminVM.PreviousConcentration)) {
                            oInfRecAdminVM.PreviousConcentration = oInfRecAdminVM.PreviousConcentration + " ";
                        }
                        oInfRecAdminVM.PreviousConcentration += objInfAdmDet.ConcentrationStrengthUOM.UOMName + "/";
                    }
                    else oInfRecAdminVM.EnableConcentration = false;
                    if (!String.IsNullOrEmpty(objInfAdmDet.ConcentrationVolume)) {
                        if (!oInfRecAdminVM.ChangeConcentrationAlert && !oInfRecAdminVM.ChangeRateAndConcentrationAlert)
                            oInfRecAdminVM.ConcentrationVolume = objInfAdmDet.ConcentrationVolume;
                        oInfRecAdminVM.PreviousConcentration += objInfAdmDet.ConcentrationVolume;
                    }
                    else oInfRecAdminVM.EnableConcentration = false;
                    if (objInfAdmDet.ConcentrationVolumeUOM != null && objInfAdmDet.ConcentrationVolumeUOM.UOMId > 0) {
                        if (!oInfRecAdminVM.ChangeConcentrationAlert && !oInfRecAdminVM.ChangeRateAndConcentrationAlert) {
                            let tmpVolume: CListItem = new CListItem();
                            tmpVolume.DisplayText = objInfAdmDet.ConcentrationVolumeUOM.UOMName;
                            tmpVolume.Value = objInfAdmDet.ConcentrationVolumeUOM.UOMId.ToString();
                            oInfRecAdminVM.ConcentrationVolumeUOM = tmpVolume;
                            oInfRecAdminVM.ConcentrationVolumeUOM = Common.GetSelectedItem(oInfRecAdminVM.ConcentrationVolumeUOM.Value, oInfRecAdminVM.ConcentrationVolumeUOMList);
                        }
                        if (!String.IsNullOrEmpty(oInfRecAdminVM.PreviousConcentration)) {
                            oInfRecAdminVM.PreviousConcentration = oInfRecAdminVM.PreviousConcentration + " ";
                        }
                        oInfRecAdminVM.PreviousConcentration += objInfAdmDet.ConcentrationVolumeUOM.UOMName;
                    }
                    else oInfRecAdminVM.EnableConcentration = false;
                    if (!String.IsNullOrEmpty(objInfAdmDet.InfusionDose)) {
                        oInfRecAdminVM.InfusionDose = objInfAdmDet.InfusionDose;
                        if (objInfAdmDet.InfusionDoseUOMNumerator != null) {
                            oInfRecAdminVM.InfusionDoseNumeratorUOMID = objInfAdmDet.InfusionDoseUOMNumerator.UOMId;
                            oInfRecAdminVM.InfusionDoseUOM = objInfAdmDet.InfusionDoseUOMNumerator.UOMName;
                        }
                        if (objInfAdmDet.InfusionDoseUOMDenominator != null) {
                            oInfRecAdminVM.InfusionDoseDenominatorUOMID = objInfAdmDet.InfusionDoseUOMDenominator.UOMId;
                            oInfRecAdminVM.InfusionDoseUOM += "/" + objInfAdmDet.InfusionDoseUOMDenominator.UOMName;
                        }
                    }
                    if (!String.IsNullOrEmpty(objInfAdmDet.DripRate)) {
                        oInfRecAdminVM.DripRate = objInfAdmDet.DripRate;
                        oInfRecAdminVM.DontChangeDripRateDefValue = objInfAdmDet.DripRate;
                    }
                    if (objInfAdmDet.DripRateUOM != null && objInfAdmDet.DripRateUOM.UOMId > 0) {
                        oInfRecAdminVM.DripRateUOMID = objInfAdmDet.DripRateUOM.UOMId;
                        oInfRecAdminVM.DontChangeDripRateDefUOMOID = objInfAdmDet.DripRateUOM.UOMId;
                    }
                    if (objInfAdmDet.DripRateUOM != null && !String.IsNullOrEmpty(objInfAdmDet.DripRateUOM.UOMName)) {
                        oInfRecAdminVM.DripRateUOM = objInfAdmDet.DripRateUOM.UOMName;
                        oInfRecAdminVM.DontChangeDripRateDefUOM = objInfAdmDet.DripRateUOM.UOMName;
                    }
                    if (objInfAdmDet.DripRatePerUOM != null && objInfAdmDet.DripRatePerUOM.UOMId > 0) {
                        oInfRecAdminVM.DripRatePerUOMID = objInfAdmDet.DripRatePerUOM.UOMId;
                        oInfRecAdminVM.DontChangeDripRateDefPerUOMOID = objInfAdmDet.DripRatePerUOM.UOMId;
                    }
                    if (objInfAdmDet.DripRatePerUOM != null && !String.IsNullOrEmpty(objInfAdmDet.DripRatePerUOM.UOMName)) {
                        oInfRecAdminVM.DripRateUOM += "/" + objInfAdmDet.DripRatePerUOM.UOMName;
                        oInfRecAdminVM.DontChangeDripRateDefUOM += "/" + objInfAdmDet.DripRatePerUOM.UOMName;
                    }
                    if (!String.IsNullOrEmpty(oInfRecAdminVM.DripRate) && !String.IsNullOrEmpty(oInfRecAdminVM.DripRateUOM)) {
                        oInfRecAdminVM.DripRateValue = oInfRecAdminVM.DripRate + " " + oInfRecAdminVM.DripRateUOM;
                    }
                    if (!String.IsNullOrEmpty(objAdmDet.TotalVolumeInfused)) {
                        let totVolInf: number = 0;
                        if (Number.TryParse(objAdmDet.TotalVolumeInfused, (o) => { totVolInf = o; }) && totVolInf > 0) {
                            oInfRecAdminVM.InfusedTotalVolume = String.Format("{0}", this.Formatto2DecimalPlace(totVolInf));
                        }
                    }
                    if (!String.IsNullOrEmpty(objAdmDet.TotalVolumeInfusedUOMName)) {
                        oInfRecAdminVM.InfusedTotalVolUOM = ObjectHelper.CreateObject(new CListItem(), { DisplayText: objAdmDet.TotalVolumeInfusedUOMName });
                    }
                    let InfVol: number = 0;
                    if (!String.IsNullOrEmpty(oInfRecAdminVM.InfusedTotalVolume) && (String.Compare(oInfRecAdminVM.InfusedTotalVolume, "0") != 0) && oInfRecAdminVM.InfusedTotalVolUOM != null && !String.IsNullOrEmpty(oInfRecAdminVM.InfusedTotalVolUOM.DisplayText)) {
                        if (!String.IsNullOrEmpty(oInfRecAdminVM.InfusedTotalVolume)) {
                            Number.TryParse(oInfRecAdminVM.InfusedTotalVolume, (o) => { InfVol = o; });
                        }
                        if (InfVol > 0) {
                            oInfRecAdminVM.InfusedVolumeValue = oInfRecAdminVM.InfusedTotalVolume + " " + oInfRecAdminVM.InfusedTotalVolUOM.DisplayText;
                        }
                    }
                    let dPlannedVolume: number = 0;
                    if (!String.IsNullOrEmpty(objAdmDet.PlannedInfusionVolume) && Number.TryParse(objAdmDet.PlannedInfusionVolume, (o) => { dPlannedVolume = o; }) && dPlannedVolume > 0 && !String.IsNullOrEmpty(objAdmDet.PlannedInfusionVolumeUOMName) && oInfRecAdminVM.InfusionType != null && !String.Equals(oInfRecAdminVM.InfusionType.Value, InfusionTypeCode.CONTINUOUS, StringComparison.CurrentCultureIgnoreCase)) {
                        oInfRecAdminVM.TotalVolumeToBeInfused = String.Format("{0} {1}", this.Formatto2DecimalPlace(dPlannedVolume), objAdmDet.PlannedInfusionVolumeUOMName);
                        oInfRecAdminVM.TotalVolumeToBeInfusedUOM = objAdmDet.PlannedInfusionVolumeUOMName;
                        oInfRecAdminVM.TotalVolumeToBeInfusedValue = dPlannedVolume;
                    }
                    let dCummVol: number = 0;
                    if (oResGetInfRecAdminDefaultValues != null && oResGetInfRecAdminDefaultValues.oDrugDetail != null && oResGetInfRecAdminDefaultValues.oDrugDetail.SlotDetails != null && oResGetInfRecAdminDefaultValues.oDrugDetail.SlotDetails.Count > 0 && oResGetInfRecAdminDefaultValues.oDrugDetail.SlotDetails[0].EstVolumeInfusedInProgressUOM != null) {
                        let sUomName: string = oResGetInfRecAdminDefaultValues.oDrugDetail.SlotDetails[0].EstVolumeInfusedInProgressUOM.UOMName;
                        oInfRecAdminVM.EstVolumeInfusedInProgress = String.Format("{0} {1} in", this.Formatto2DecimalPlace(oResGetInfRecAdminDefaultValues.oDrugDetail.SlotDetails[0].EstVolumeInfusedInProgress), sUomName);
                        if (oResGetInfRecAdminDefaultValues.oDrugDetail.SlotDetails[0].EstVolumeInfusedInProgressDurationInMins > 0) {
                            let lTotalDuration: number = oResGetInfRecAdminDefaultValues.oDrugDetail.SlotDetails[0].EstVolumeInfusedInProgressDurationInMins;
                            let _AccumlatedDuration: TimeSpan = TimeSpan.FromMinutes(lTotalDuration);
                            let totalHours: number = 0;
                            let HoursInDay: number = 24;
                            if (_AccumlatedDuration.Days > 0) {
                                totalHours = _AccumlatedDuration.Days * HoursInDay;
                            }
                            if (_AccumlatedDuration.Hours > 0) {
                                totalHours = totalHours + _AccumlatedDuration.Hours;
                            }
                            if (totalHours > 0) {
                                oInfRecAdminVM.EstVolumeInfusedInProgress = oInfRecAdminVM.EstVolumeInfusedInProgress + String.Format(" {0} hours", totalHours);
                            }
                            if (_AccumlatedDuration.Minutes > 0) {
                                oInfRecAdminVM.EstVolumeInfusedInProgress = oInfRecAdminVM.EstVolumeInfusedInProgress + String.Format(" {0} mins", _AccumlatedDuration.Minutes);
                            }
                        }
                        dCummVol = oResGetInfRecAdminDefaultValues.oDrugDetail.SlotDetails[0].EstVolumeInfusedInProgress + InfVol;
                        if (dPlannedVolume > 0 && dCummVol > 0) {
                            let dPercentOfTotal: number = 0;
                            if (dPlannedVolume <= dCummVol) {
                                dPercentOfTotal = 100;
                            }
                            else {
                                dPercentOfTotal = (dCummVol * 100) / dPlannedVolume;
                            }
                            oInfRecAdminVM.CummulativeVolumeInfused = String.Format("{0} {1} ({2}% complete)", this.Formatto2DecimalPlace(dCummVol), sUomName, this.Formatto2DecimalPlace(dPercentOfTotal));
                        }
                        else {
                            oInfRecAdminVM.CummulativeVolumeInfused = String.Format("{0} {1}", this.Formatto2DecimalPlace(dCummVol), sUomName);
                        }
                    }
                    if (objInfAdmDet.oInfusionBagDetail.PrevBagSequence > 0) {
                        oInfRecAdminVM.prevBagSeqNumber = objInfAdmDet.oInfusionBagDetail.PrevBagSequence;
                    }
                    if (!String.IsNullOrEmpty(objInfAdmDet.oInfusionBagDetail.BagVolume)) {
                        oInfRecAdminVM.PrevBagVolume = objInfAdmDet.oInfusionBagDetail.BagVolume;
                    }
                    if (objInfAdmDet.oInfusionBagDetail != null && objInfAdmDet.oInfusionBagDetail.BagVolumeUOM != null && objInfAdmDet.oInfusionBagDetail.BagVolumeUOM.UOMId > 0) {
                        oInfRecAdminVM.PrevBagVolumeUom = ObjectHelper.CreateObject(new CListItem(), {
                            Value: objInfAdmDet.oInfusionBagDetail.BagVolumeUOM.UOMId.ToString(),
                            DisplayText: objInfAdmDet.oInfusionBagDetail.BagVolumeUOM.UOMName,
                            Tag: objInfAdmDet.oInfusionBagDetail.BagVolumeUOM.UOMCode
                        });
                    }
                    if (!String.IsNullOrEmpty(oInfRecAdminVM.PrevBagVolume) && oInfRecAdminVM.PrevBagVolumeUom != null && !String.IsNullOrEmpty(oInfRecAdminVM.PrevBagVolumeUom.DisplayText)) {
                        oInfRecAdminVM.CurrentBagValue = String.Format("{0} {1}", this.Formatto2DecimalPlace(Number.Parse(oInfRecAdminVM.PrevBagVolume)), oInfRecAdminVM.PrevBagVolumeUom.DisplayText);
                    }
                    if (objAdmDet.IsCanComplete) {
                        oInfRecAdminVM.IsEnableComplete = true;
                    }
                    if (objInfAdmDet.Route != null && !String.IsNullOrEmpty(objInfAdmDet.Route.Name)) {
                        oInfRecAdminVM.summaryviewRoute = objInfAdmDet.Route.Name;
                    }
                }
                if (this.oTagDrugHeaderDetail != null) {
                    if ((oInfRecAdminVM.ChangeConcentrationAlert) || (oInfRecAdminVM.ChangeRateAndConcentrationAlert))
                        oInfRecAdminVM.PrevConcentrationVisible = Visibility.Visible;
                    else oInfRecAdminVM.PrevConcentrationVisible = Visibility.Collapsed;
                    if (oInfRecAdminVM.IsInfRateVolBased) {
                        if (!oInfRecAdminVM.ChangeFlowRateAlert && !oInfRecAdminVM.CondDoseMonitoringPeriodAlert && !oInfRecAdminVM.ChangeConcentrationAlert && !oInfRecAdminVM.ChangeRateAndConcentrationAlert && ProfileData.ChartSettingsConfig.IsChangeFlowRateEnabled) {

                        }
                        else {
                            oInfRecAdminVM.ChangedInfusionRate = (String.IsNullOrEmpty(this.oTagDrugHeaderDetail.UpperRate) || String.Equals(this.oTagDrugHeaderDetail.UpperRate, "0")) ? this.oTagDrugHeaderDetail.Rate : String.Empty;
                            oInfRecAdminVM.DripInfusionRate = oInfRecAdminVM.ChangedInfusionRate;
                            let oRateNumUOM: CListItem = Common.GetSelectedItem(this.oTagDrugHeaderDetail.RateNumeratorUOMOID.ToString(), oInfRecAdminVM.InfusionRateUOMNumeratorList);
                            if (oRateNumUOM != null) {
                                oInfRecAdminVM.ChangedInfRateNumUOM = oRateNumUOM;
                                oInfRecAdminVM.DripInfRateUomOID = Convert.ToInt64(oInfRecAdminVM.ChangedInfRateNumUOM.Value);
                            }
                            let oRateDinUOM: CListItem = Common.GetSelectedItem(this.oTagDrugHeaderDetail.RateDinominatorUOMOID.ToString(), oInfRecAdminVM.InfusionRateUOMDenominatorList);
                            if (oRateDinUOM != null) {
                                oInfRecAdminVM.ChangedInfRateDinUOM = oRateDinUOM;
                                oInfRecAdminVM.DripInfRatePerUomOID = Convert.ToInt64(oInfRecAdminVM.ChangedInfRateDinUOM.Value);
                            }
                            if (oRateNumUOM != null && oRateDinUOM != null)
                                oInfRecAdminVM.DripInfusionRateUom = oInfRecAdminVM.ChangedInfRateNumUOM.DisplayText + "/" + oInfRecAdminVM.ChangedInfRateDinUOM.DisplayText;
                        }
                    }
                    else {
                        oInfRecAdminVM.DripInfusionRate = this.oTagDrugHeaderDetail.Rate;
                        if (oInfRecAdminVM.ChangeFlowRateAlert || oInfRecAdminVM.ChangeRateAndConcentrationAlert) {
                            oInfRecAdminVM.InfusionDose = this.oTagDrugHeaderDetail.Rate;
                            if (this.oTagDrugHeaderDetail.RateNumeratorUOMOID != null) {
                                oInfRecAdminVM.InfusionDoseNumeratorUOMID = this.oTagDrugHeaderDetail.RateNumeratorUOMOID;
                                oInfRecAdminVM.InfusionDoseUOM = this.oTagDrugHeaderDetail.RateNumeratorUOM;
                            }
                            if (this.oTagDrugHeaderDetail.RateDinominatorUOMOID != null) {
                                oInfRecAdminVM.InfusionDoseDenominatorUOMID = this.oTagDrugHeaderDetail.RateDinominatorUOMOID;
                                oInfRecAdminVM.InfusionDoseUOM += "/" + this.oTagDrugHeaderDetail.RateDinominatorUOM;
                            }
                        }
                    }
                }
            }
            else if (String.Equals(oInfRecAdminVM.InfSlotStatus, SlotStatus.NOTGIVEN, StringComparison.InvariantCultureIgnoreCase)) {
                if (DateTime.NotEquals(objAdmDet.AdministeredDate, DateTime.MinValue)) {
                    oInfRecAdminVM.GivenDateTime = objAdmDet.AdministeredDate.ToUserDateTimeString(CConstants.DateTimeFormat);
                    oInfRecAdminVM.LastActionDateTime = objAdmDet.AdministeredDate;
                }
            }
            oInfRecAdminVM.ReasonforMedicationAction = objAdmDet.MedicationAction;
            oInfRecAdminVM.ReasonforAdminReasonCode = objAdmDet.AdminReasonCode;
            oInfRecAdminVM.IsDuringHomeLeave = objAdmDet.IsDuringHomeLeave;
            if (!String.IsNullOrEmpty(objAdmDet.AdminComments)) {
                oInfRecAdminVM.CommentsValue = objAdmDet.AdminComments;
            }
            if (DateTime.NotEquals(objAdmDet.RecordedAt, DateTime.MinValue)) {
                oInfRecAdminVM.RecordedAtValue = objAdmDet.RecordedAt.ToUserDateTimeString(CConstants.DateTimeFormat);
            }
            if (!String.IsNullOrEmpty(objAdmDet.RecordedBy)) {
                oInfRecAdminVM.RecordedByValue = objAdmDet.RecordedBy;
            }
            if (!String.IsNullOrEmpty(objAdmDet.MedicationAction)) {
                let sPrevInfusionAction: string = CommonBB.GetText(objAdmDet.MedicationAction, InfActionsConceptCodeData.ConceptCodes);
                if (String.Equals(objAdmDet.MedicationAction, sPrevInfusionAction))
                    sPrevInfusionAction = CommonBB.GetText(objAdmDet.MedicationAction, ValueDomainValues.oSlotStatus);
                oInfRecAdminVM.PrevInfusionAction = sPrevInfusionAction;
                oInfRecAdminVM.StrikeThruAction = oInfRecAdminVM.PrevInfusionAction;
                oInfRecAdminVM.PrevInfusionActionCode = objAdmDet.MedicationAction;
                oInfRecAdminVM.StrikeThruActionCode = objAdmDet.MedicationAction;
                oInfRecAdminVM.PrevInfusionActionCode = objAdmDet.MedicationAction;
                if (!String.IsNullOrEmpty(oInfRecAdminVM.StrikeThruActionCode) && (String.Compare(oInfRecAdminVM.StrikeThruActionCode, "CC_NOTADMINISTERED", StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oInfRecAdminVM.StrikeThruActionCode, "CC_DEFERADMIN", StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oInfRecAdminVM.StrikeThruActionCode, "CC_BEGUN", StringComparison.CurrentCultureIgnoreCase) != 0) || !CConstants.IsAllowEntireAdminStrikeThru) {
                    oInfRecAdminVM.IsStrikeThruEnable = true;
                    oInfRecAdminVM.IsStrikeThruVisible = Visibility.Visible;
                }
                else {
                    oInfRecAdminVM.IsStrikeThruEnable = false;
                    oInfRecAdminVM.IsStrikeThruVisible = Visibility.Collapsed;
                }
                if (CConstants.IsAllowEntireAdminStrikeThru && String.Compare(oInfRecAdminVM.IsCALaunchCode, CALaunch.OverviewChart.ToString()) == 0) {
                    oInfRecAdminVM.IsStrikeThruEnable = false;
                    oInfRecAdminVM.IsStrikeThruVisible = Visibility.Collapsed;
                }
                if (CConstants.IsAllowEntireAdminStrikeThru) {
                    oInfRecAdminVM.IsEntireAdminStrikeThruEnable = true;
                    oInfRecAdminVM.IsEntireAdminStrikeThruVisible = Visibility.Visible;
                }
            }
            if (objAdmDet.oInfusionAdminDetail != null && !String.IsNullOrEmpty(objAdmDet.oInfusionAdminDetail[0].Humidification) && !String.IsNullOrEmpty(oInfRecAdminVM.PrevInfusionActionCode))
                oInfRecAdminVM.HumidificationValue = objAdmDet.oInfusionAdminDetail[0].Humidification;
        }
    }
    public ValidDecimal(sValue: string): string {
        let fParValue: number = 0;
        if (!String.IsNullOrEmpty(sValue) && sValue.IndexOf(".") != -1 && Double.TryParse(sValue, (o) => { fParValue = o; }) && fParValue > 0) {
            return Convert.ToString(fParValue);
        }
        return sValue;
    }
    private Formatto2DecimalPlace(num: number): string | null {
        if (num) {
            const decimalPart = num.toString().split('.')[1];

            if (decimalPart && decimalPart.length > 2) {
                return num.toFixed(2);
            }

            return num.toString();
        }
        return null;
    }
    private FillAdminTimes(objCResDefltInfRecdAdmin: CResMsgGetInfRecAdminDefaultValues, oInfRecAdminVM: InfrecordadminVM): void {
        if (objCResDefltInfRecdAdmin != null && objCResDefltInfRecdAdmin.oInfAdministeredTimes != null && objCResDefltInfRecdAdmin.oInfAdministeredTimes.Count > 0) {
            oInfRecAdminVM.InfAdministeredTimes = new ObservableCollection<InfAdministeredTimes>();
            oInfRecAdminVM.InfAdministeredTimes = objCResDefltInfRecdAdmin.oInfAdministeredTimes;
        }
    }
    private SetDrugHeaderProperties(oDrugItem: DrugItem, oHdrRecordAdmin: CDrugHdrAddnlInfo, objrecordadminmainview: InfRecAdmMainView, CanBeStruckThrough: boolean, IsAlertShown: boolean, InfSlotStatus: string): void {
        if (oDrugItem != null) {
            objrecordadminmainview.objDrugHeader.oDrugHeader = new CDrugHeader();
            objrecordadminmainview.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo = new DrugHeaderItem();
            objrecordadminmainview.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowFrequency = true;
            objrecordadminmainview.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowSite = true;
            objrecordadminmainview.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowAsrequired = true;
            objrecordadminmainview.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.SlotStatus = InfSlotStatus;
            if (oHdrRecordAdmin != null)
                oHdrRecordAdmin.RecordAdminViewed = RecordAdminType.InfusionRecordAdmin;
            objrecordadminmainview.objDrugHeader.DataContext = Common.SetDrugHeaderContent(oDrugItem, oHdrRecordAdmin, objrecordadminmainview.objDrugHeader);
            objrecordadminmainview.CanBeStruckThrough = CanBeStruckThrough;
            objrecordadminmainview.IsAlertShown = IsAlertShown;
        }
    }
    public ShowAlertMessage(oAlertInfo: AlertsInfo, oInfRecAdminVM: InfrecordadminVM): void {
        let sErrorMsg: string = String.Empty;
        if (oAlertInfo != null && (!String.IsNullOrEmpty(oAlertInfo.Alert))) {
            switch (oAlertInfo.Alert) {
                case InfChartAlert.STEP_DOSE_FLOW_RATE_ALERT:
                case InfChartAlert.FLOW_RATE_CHANGE_ALERT:
                    sErrorMsg = String.Format(MedsAdminChartToolTip.InfChartRateChngAlert_MsgText, oAlertInfo.PreInfRate, oAlertInfo.InfRate);
                    oInfRecAdminVM.ChangeFlowRateAlert = true;
                    break;
                case InfChartAlert.CONCENTRATION_CHANGE_ALERT:
                    sErrorMsg = String.Format(MedsAdminChartToolTip.InfChartConcentrationChngAlert_MsgText, oAlertInfo.PreConcentration, oAlertInfo.Concentration);
                    oInfRecAdminVM.ChangeConcentrationAlert = true;
                    break;
                case InfChartAlert.RATE_N_CONCENTRATION_CHANGE_ALERT:
                    sErrorMsg = String.Format(MedsAdminChartToolTip.InfChartRateChngAlert_MsgText, oAlertInfo.PreInfRate, oAlertInfo.InfRate);
                    sErrorMsg += "\r\n";
                    sErrorMsg += String.Format(MedsAdminChartToolTip.InfChartConcentrationChngAlert_MsgText, oAlertInfo.PreConcentration, oAlertInfo.Concentration);
                    oInfRecAdminVM.ChangeRateAndConcentrationAlert = true;
                    break;
                case InfChartAlert.AMENDMENT_ALERT:
                    sErrorMsg = "Drug that is being recorded has been amended by user " + oAlertInfo.ModifiedBy + ", " + oAlertInfo.ModifiedAt.ToString(CConstants.DateTimeFormat);
                    sErrorMsg = sErrorMsg + "\r\n";
                    sErrorMsg = sErrorMsg + "Please mark this  as not given or stop this infusion if in progress and  proceed with the new prescription.";
                    oInfRecAdminVM.AmendmentAlert = true;
                    break;
                case InfChartAlert.DISCONTINUATION_ALERT:
                    sErrorMsg = String.Format(MedsAdminChartToolTip.InfChartDisCntdAlert_MsgText1, oAlertInfo.ModifiedBy, oAlertInfo.ModifiedAt.ToString(CConstants.DateTimeFormat));
                    sErrorMsg = sErrorMsg + "\r\n";
                    sErrorMsg = sErrorMsg + "\r\n" + MedsAdminChartToolTip.InfChartDisCntdAlert_MsgText2;
                    oInfRecAdminVM.DiscontinueAlert = true;
                    break;
                case InfChartAlert.COND_DOSE_MONITORING_PER_ALERT:
                    sErrorMsg = MedsAdminChartToolTip.InfChartMonitordAlert_MsgText;
                    oInfRecAdminVM.CondDoseMonitoringPeriodAlert = true;
                    break;
                case InfChartAlert.INFUSION_PERIOD_COMPLETED_ALERT:
                    sErrorMsg = MedsAdminChartToolTip.InfChartInfusionPeriodCompletedAlert_ToolTip;
                    oInfRecAdminVM.InfusionPeriodCompletedAlert = true;
                    break;
            }
            if (!String.IsNullOrEmpty(sErrorMsg)) {
                this.ShowErrorMessage(sErrorMsg, MessageBoxButton.OK, MessageBoxType.Exclamation,/*MsgBoxTag:*/CConstants.InfusionWarning,/*MsgBoxHeight:*/170,/*MsgBoxWidth:*/410);
            }
        }
    }
    iMsgBox: iMessageBox;
    ShowErrorMessage(sErrorMsg: string, oMessageBoxButton: MessageBoxButton, oMessageBoxType: MessageBoxType, MsgBoxTag: Object = null, MsgBoxHeight: number = null, MsgBoxWidth: number = null): void {
        if (!String.IsNullOrEmpty(sErrorMsg)) {
            this.iMsgBox = ObjectHelper.CreateObject(new iMessageBox(), {
                Title: "LORENZO",
                Message: sErrorMsg,
                MessageButton: oMessageBoxButton,
                IconType: oMessageBoxType
            });
            if (MsgBoxTag != null)
                this.iMsgBox.Tag = MsgBoxTag;
            if (MsgBoxHeight.HasValue)
                this.iMsgBox.Height = MsgBoxHeight.Value;
            if (MsgBoxWidth.HasValue)
                this.iMsgBox.Width = MsgBoxWidth.Value;
            this.iMsgBox.OverlayBrush = new SolidColorBrush(Colors.Transparent);
            this.iMsgBox.MessageBoxClose = (s, e) => { this.iMsgBox_MessageBoxClose(s, e); };
            this.iMsgBox.Show();
        }
    }
  iMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
    if (e.MessageBoxResult == MessageBoxResult.OK) {
      if (String.Compare(this._CAlaunch, CALaunch.FluidBalnce.ToString()) != 0) {
        let Callback = (s, e) => {
          if (s != null && e != null) {
            this.objrecordadminmainview = s;
          }
        }
        let InfrecordadminVMobj = ObjectHelper.CreateType<InfrecordadminVM>(this.objrecordadminmainview.DataContext, InfrecordadminVM);
        InfrecordadminVMobj.bIsAlertRequired = false;
        AppActivity.OpenWindow("Record administration", this.objrecordadminmainview, (s) => { this.objRecordadmininfusion_Closed(s); }, "Record administration", true, this.AppWindowHeight, 823, true, WindowButtonType.OkCancel, Callback);
      }
    }
  }
    private SetVMProperties(oInfRecAdminVM: InfrecordadminVM, oTagDrugHeaderDetail: TagDrugHeaderDetail): void {
        if (oTagDrugHeaderDetail != null) {
            oInfRecAdminVM.PresLorenzoID = oTagDrugHeaderDetail.LorenzoID;
            oInfRecAdminVM.RouteOID = oTagDrugHeaderDetail.RouteOID;
            oInfRecAdminVM.IsControlledDrug = oTagDrugHeaderDetail.IsControlDrug;
            if (!String.IsNullOrEmpty(oTagDrugHeaderDetail.IsOnGoing) && (String.Compare(oTagDrugHeaderDetail.IsOnGoing, "y", StringComparison.OrdinalIgnoreCase) == 0)) {
                oInfRecAdminVM.IsOngoing = true;
            }
            else oInfRecAdminVM.IsOngoing = false;
            if (!String.IsNullOrEmpty(oTagDrugHeaderDetail.Fluid)) {
                oInfRecAdminVM.FluidName = !String.IsNullOrEmpty(oTagDrugHeaderDetail.Fluid) ? oTagDrugHeaderDetail.Fluid : String.Empty;
                oInfRecAdminVM.IsFluidCDDrug = oTagDrugHeaderDetail.IsFluidControlDrug;
            }
            oInfRecAdminVM.IsCDDrug = oTagDrugHeaderDetail.IsControlDrug;
            if ((!String.IsNullOrEmpty(oTagDrugHeaderDetail.Volume)) && (!String.IsNullOrEmpty(oTagDrugHeaderDetail.Volume))) {
                oInfRecAdminVM.PresVolme = oTagDrugHeaderDetail.Volume;
                oInfRecAdminVM.PresVolmeUOM = oTagDrugHeaderDetail.VolumeUOM;
                oInfRecAdminVM.PresVolmeUOMOID = oTagDrugHeaderDetail.VolumeUOMOID;
            }
            oInfRecAdminVM.IsPRN = oTagDrugHeaderDetail.IsPRN ? oTagDrugHeaderDetail.IsPRN : false;
            oInfRecAdminVM.LowerDose = !String.IsNullOrEmpty(oTagDrugHeaderDetail.LowerDose) ? oTagDrugHeaderDetail.LowerDose : String.Empty;
            oInfRecAdminVM.UpperDose = !String.IsNullOrEmpty(oTagDrugHeaderDetail.UpperDose) ? oTagDrugHeaderDetail.UpperDose : String.Empty;
            oInfRecAdminVM.InfusionPeriod = !String.IsNullOrEmpty(oTagDrugHeaderDetail.InfusionPeriod) ? oTagDrugHeaderDetail.InfusionPeriod : String.Empty;
            oInfRecAdminVM.InfusionPeriodUOM = !String.IsNullOrEmpty(oTagDrugHeaderDetail.InfusionPeriodUOM) ? oTagDrugHeaderDetail.InfusionPeriodUOM : String.Empty;
            oInfRecAdminVM.InfusionPeriodUomOID = oTagDrugHeaderDetail.InfusionPeriodUOMOID;
            oInfRecAdminVM.ScheduledDTTM = this.ScheduledDTTM;
            oInfRecAdminVM.DrugName = !String.IsNullOrEmpty(oTagDrugHeaderDetail.DrugName) ? oTagDrugHeaderDetail.DrugName : String.Empty;
            oInfRecAdminVM.IsAnyParacetamolAdministeredInGivenPeriod = this.IsAnyParacetamolAdministeredInGivenPeriod;
            oInfRecAdminVM.IsParacetamolIngredient = oTagDrugHeaderDetail.IsParacetamolIngredient;
            oInfRecAdminVM.ParentPrescriptionItemOID = oTagDrugHeaderDetail.ParentPrescriptionItemOID > 0 ? oTagDrugHeaderDetail.ParentPrescriptionItemOID : 0;
            oInfRecAdminVM.InfusionGroupSequenceNo = oTagDrugHeaderDetail.InfusionGroupSequenceNo > 0 ? oTagDrugHeaderDetail.InfusionGroupSequenceNo : 0;
            oInfRecAdminVM.InfusionSequentialItemNo = oTagDrugHeaderDetail.InfusionSeqOrder > 0 ? oTagDrugHeaderDetail.InfusionSeqOrder : 0;
            oInfRecAdminVM.ItemType = !String.IsNullOrEmpty(oTagDrugHeaderDetail.ItemType) ? oTagDrugHeaderDetail.ItemType : String.Empty;
            oInfRecAdminVM.AdminMethod = !String.IsNullOrEmpty(oTagDrugHeaderDetail.AdminMethod) ? oTagDrugHeaderDetail.AdminMethod : String.Empty;
            oInfRecAdminVM.MultiRouteType = oTagDrugHeaderDetail.MultiRoute_Type;
            oInfRecAdminVM.IsCustomiseMedScan = oTagDrugHeaderDetail.IsCustomiseMedScan;
            oInfRecAdminVM.IsMedScanExcluded = oTagDrugHeaderDetail.IsMedScanExcluded;
            if (!oInfRecAdminVM.IsMedScanExcluded && (!String.IsNullOrEmpty(this._CAlaunch) && String.Equals(this._CAlaunch, CALaunch.FluidBalnce.ToString(), StringComparison.CurrentCultureIgnoreCase))) {
                oInfRecAdminVM.IsMedScanExcluded = true;
            }
            oInfRecAdminVM.ScanRecMedMultiRoute = this.ScanRecMedMultiRoute;
        }
    }
    private FillAlertdetails(objCResDefltInfRecdAdmin: CResMsgGetInfRecAdminDefaultValues, oInfRecAdminVM: InfrecordadminVM, oTagDrugHeaderDetail: TagDrugHeaderDetail): void {
        if (oTagDrugHeaderDetail != null && ((String.Equals(this._CAlaunch, CALaunch.InfusionChart.ToString(), StringComparison.OrdinalIgnoreCase)) || (String.Equals(this._CAlaunch, CALaunch.OverviewChart.ToString(), StringComparison.OrdinalIgnoreCase)))) {
            if (this._InfRecAdminTypeCode != null)
                oInfRecAdminVM.InfusionRecordAdminTypeCode = this._InfRecAdminTypeCode.TypeCode;
            if (oInfRecAdminVM.InfusionRecordAdminTypeCode == InfusionRecordAdminTypeCodes.ContinuousSequentialAdministration && !String.Equals(oTagDrugHeaderDetail.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oTagDrugHeaderDetail.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase)) {
                oInfRecAdminVM.SequentialPrescItemOID = this._InfRecAdminTypeCode.NextPrescOID;
            }
            else if (oInfRecAdminVM.InfusionRecordAdminTypeCode == InfusionRecordAdminTypeCodes.AmendmentAlertAdministration) {
                oInfRecAdminVM.AmendedPrescriptionItemOID = this._InfRecAdminTypeCode.NextPrescOID;
            }
            else if (this._InfRecAdminTypeCode != null && this._InfRecAdminTypeCode.TypeCode == InfusionRecordAdminTypeCodes.IsRetrospectivePRN && (!String.Equals(oInfRecAdminVM.InfSlotStatus, SlotStatus.STOPPED) && !String.Equals(oInfRecAdminVM.InfSlotStatus, SlotStatus.COMPLETED))) {
                oInfRecAdminVM.IsChkReStop = true;
            }
            oInfRecAdminVM.IdentifyingOID = oTagDrugHeaderDetail.DrugIdentifyingOID;
            oInfRecAdminVM.IdentifyingType = oTagDrugHeaderDetail.DrugIdentifyingType;
            oInfRecAdminVM.PrescriptionItemOID = oTagDrugHeaderDetail.PrescriptionItemOID;
            oInfRecAdminVM.InfusionType = ObjectHelper.CreateObject(new CListItem(), { Value: oTagDrugHeaderDetail.INFTYCODE });
            oInfRecAdminVM.PrescriptionItemStatus = oTagDrugHeaderDetail.PrescriptionItemStatus;
            oInfRecAdminVM.MCVersionNo = oTagDrugHeaderDetail.MCVersionNo;
            oInfRecAdminVM.Lorenzoid = oTagDrugHeaderDetail.LorenzoID;
            oInfRecAdminVM.ItemSubType = oTagDrugHeaderDetail.ItemSubType;
            oInfRecAdminVM.Multicomponentitem = String.Join("^", oTagDrugHeaderDetail.MultiComponentItems.ToArray());
            oInfRecAdminVM.PrescriptionStartDate = oTagDrugHeaderDetail.StartDate;
            oInfRecAdminVM.DoseType = oTagDrugHeaderDetail.DoseType;
            oInfRecAdminVM.PrescriptionEndDate = oTagDrugHeaderDetail.EndDate;
            if (this.oInfChrtAlerts != null && this.oInfChrtAlerts.Count > 0) {
                oInfRecAdminVM.AmendmentAlert = this.oInfChrtAlerts[0].Contains(InfChartAlert.AMENDMENT_ALERT);
                oInfRecAdminVM.ChangeFlowRateAlert = this.oInfChrtAlerts[0].Contains(InfChartAlert.FLOW_RATE_CHANGE_ALERT);
                oInfRecAdminVM.ChangeConcentrationAlert = this.oInfChrtAlerts[0].Contains(InfChartAlert.CONCENTRATION_CHANGE_ALERT);
                oInfRecAdminVM.ChangeRateAndConcentrationAlert = this.oInfChrtAlerts[0].Contains(InfChartAlert.RATE_N_CONCENTRATION_CHANGE_ALERT);
                oInfRecAdminVM.DiscontinueAlert = this.oInfChrtAlerts[0].Contains(InfChartAlert.DISCONTINUATION_ALERT);
                oInfRecAdminVM.DueAlert = this.oInfChrtAlerts[0].Contains(InfChartAlert.DUE_ALERT);
                oInfRecAdminVM.OverDueAlert = this.oInfChrtAlerts[0].Contains(InfChartAlert.OVERDUE_ALERT);
                oInfRecAdminVM.InfusionPeriodCompletedAlert = this.oInfChrtAlerts[0].Contains(InfChartAlert.INFUSION_PERIOD_COMPLETED_ALERT);
                oInfRecAdminVM.CondDoseMonitoringPeriodAlert = this.oInfChrtAlerts[0].Contains(InfChartAlert.COND_DOSE_MONITORING_PER_ALERT);
            }
        }
        else if (objCResDefltInfRecdAdmin != null && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail != null && objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oAlertsInfoDetails != null && objCResDefltInfRecdAdmin.oDrugDetail != null && objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader != null && objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.AmendedPrescriptionItemOID > 0 && (String.Equals(this._CAlaunch, CALaunch.FluidBalnce.ToString(), StringComparison.OrdinalIgnoreCase)) && String.Equals(objCResDefltInfRecdAdmin.oDefaultInfRecAdminDetail.oAlertsInfoDetails.Alert, InfChartAlert.AMENDMENT_ALERT, StringComparison.OrdinalIgnoreCase)) {
            oInfRecAdminVM.InfusionRecordAdminTypeCode = InfusionRecordAdminTypeCodes.AmendmentAlertAdministration;
            oInfRecAdminVM.AmendedPrescriptionItemOID = Convert.ToInt64(objCResDefltInfRecdAdmin.oDrugDetail.DrugHeader.AmendedPrescriptionItemOID);
        }
    }
    public LaunchInfRecordAdminForFB(MedAdminOID: number, PatientOID: number): void {
        let objMedsAdminCommonData: MedsAdminCommonData = new MedsAdminCommonData();
        objMedsAdminCommonData.GetProfileConfigData();
        // let oInfusionChartVM: InfusionChartVM = new InfusionChartVM();
        let objService: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
        let objReq: CReqMsgGetInfRecAdminDefaultValues = new CReqMsgGetInfRecAdminDefaultValues();
        PatientContext.PatientOID = PatientOID;
        objReq.oContextInformation = CommonBB.FillContext();
        objReq.oInfSumaryViewParamsBC = new InfSumaryViewParams();
        objReq.oInfSumaryViewParamsBC.PatientOID = PatientOID;
        objReq.oInfSumaryViewParamsBC.MedAdminOID = MedAdminOID;
        objReq.oInfSumaryViewParamsBC.oCALunch = CALaunch.FluidBalnce;
        this._CAlaunch = CALaunch.FluidBalnce.ToString();
        if (objService != null) {
            objService.GetInfRecAdminDefaultValuesCompleted = (s, e) => { this.objService_GetInfRecAdminDefaultValuesCompleted(s, e); };
            objService.GetInfRecAdminDefaultValuesAsync(objReq);
        }
    }
    private GetTermtextForReason(_SlotStatus: string, Reasoncode: string, oInfRecAdminVM: InfrecordadminVM): string {
        let _ReasonTermText: string = String.Empty;
        if (!String.IsNullOrEmpty(_SlotStatus) && !String.IsNullOrEmpty(Reasoncode)) {
            let _ReasonList: ObservableCollection<CListItem> = null;
            switch (_SlotStatus) {
                case SlotStatus.DEFERADMIN:
                case SlotStatus.DEFERDUENOW:
                case SlotStatus.DEFEROVERDUE:
                    _ReasonList = oInfRecAdminVM.ReasonForNotDefers;
                    break;
                case SlotStatus.NOTGIVEN:
                    _ReasonList = oInfRecAdminVM.ReasonNotGivens;
                    break;
                case MedicationAction.PAUSE:
                    _ReasonList = oInfRecAdminVM.ReasonforPauselist;
                    break;
                case MedicationAction.STOP:
                    _ReasonList = oInfRecAdminVM.ReasonforStoplist;
                    break;
            }
            if (_ReasonList != null) {
                let SelectedTermText = _ReasonList.Where(oItem => String.Compare(Reasoncode, oItem.Value, StringComparison.CurrentCultureIgnoreCase) == 0).Select(oItem => oItem);
                if (SelectedTermText != null && SelectedTermText.Count() > 0) {
                    _ReasonTermText = SelectedTermText.First().DisplayText;
                }
            }
        }
        return _ReasonTermText;
    }
}
export class InfRecAdminTypeCode {
    public TypeCode: number;
    public NextPrescOID: number;
}

