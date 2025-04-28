
import { AfterViewInit, Component, HostListener, Input, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { GridComponent, GridDataResult, PageChangeEvent, } from "@progress/kendo-angular-grid";
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity, ScriptObject, AppLoadService } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, ArrayOfString, Exception, AppContextInfo, List, HtmlPage, Visibility } from 'epma-platform/models';
import { AppDialog, Border, Color, Colors, EventArgs, FrameworkElement, Grid, HeaderImageAlignment, HeaderImageListItem, iButton, iLabel, iTab, iTabItem, iTextBox, KeyEventArgs, MouseButtonEventArgs, SolidColorBrush, StackPanel, TextBlock, Thickness, UserControl } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import {
    Align,
    AnimationDirection,
    AnimationType,
    Offset,
    PopupAnimation,
    PopupComponent,
} from '@progress/kendo-angular-popup';
import { INFRecordAdminParams, InfusionChartHelper } from '../utilities/InfusionChartHelper';
import { InfusionChartVM } from '../viewmodel/InfusionChartVM';
import { PGDAdminstrationVM } from '../viewmodel/pgdvm';
import { MedicationAdminVM } from '../ca/medicationadmin/medicationadminvm';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { RecordPGD } from '../child/recordpgd';
import { GetMedsChartData } from '../common/getmedschartdata';
import { iInfusionChart } from 'src/app/lorarcbluebirdmedicationchart/iInfusionChart/iInfusionChart';
import { InfRecAdminTypeCode, InfusionRecAdminHelper } from '../utilities/InfusionRecAdminHelper';
import { CALaunch, CResMsgGetInfusionChart, CResMsgRecordPGD, DrugDetail, Encounter, SlotDetail } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { SlotDetailVM } from '../viewmodel/MedicationChartVM';
import { InfusionTagObject } from 'src/app/lorarcbluebirdmedicationchart/common/InfusionTagObject';
import { RowDefinition } from 'src/app/shared/epma-platform/controls/epma-grid/epma-grid.component';
import { CommPrescriptionItemViewVM } from 'src/app/lorappmedicationcommonbb/viewmodel/prescriptionitemviewvm';
import { PrescriptionItemDetailsVM } from 'src/app/lorappmedicationcommonbb/viewmodel/prescriptionitemdetailsvm';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { ChartContext, MedChartData, TagDrugHeaderDetail, TagSlotDetail, ValueDomainValues } from '../utilities/globalvariable';
import { ChartIcon } from 'src/app/lorarcbluebirdmedicationchart/common/ChartIcon';
import { MedDoseDetails } from 'src/app/lorappmedicationcommonbb/view/meddosedetails';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import { Resource } from '../resource'
import { CConstants, ChartType, InfChartAlert, InfStrikeOutType, InfusionRecordAdminTypeCodes, InfusionTypesCode, MedicationAction, MedImage, MedImages, MultiRouteType, PrescriptionTypes, SlotStatus } from '../utilities/CConstants';
import { InfusionChartRow } from 'src/app/lorarcbluebirdmedicationchart/common/InfusionChartRow';
import { CDrugHdrAddnlInfo, CDrugHeader, DrugHeader, DrugHeaderItem } from '../common/drugheader';
import { ProfileData, UserPermissions } from '../utilities/ProfileData';
import { MedicationCommonProfileData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { ActivityCode, Common, MedsAdminCommonData } from '../utilities/common';
import { MedsAdminMainView } from './MedsAdminMainView';
// import { MedicationAdministrator } from '../resource/medicationadministrator.designer';
import { InfusionChartCell } from 'src/app/lorarcbluebirdmedicationchart/common/InfusionChartCell';
// import { MedsAdminChartToolTip } from '../resource/medsadmincharttooltip.designer';
import { InfusionProcessIcon } from 'src/app/lorarcbluebirdmedicationchart/common/InfusionProcessIcon';
import { ImageAlignment, VisualTreeHelper } from 'src/app/shared/epma-platform/models/eppma-common-types';
import { SlotAdministrationHelper } from '../common/slotadministrationhelper';
import { InfusionTypeCode } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { Button } from '@progress/kendo-angular-buttons';
import { ManageBarcodeHelper } from '../common/ManageBarcodeHelper';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
//import { PatientContext } from 'src/app/product/shared/models/Commonbbglobalvariable';
import { CCommSequentialHelper } from 'src/app/lorappmedicationcommonbb/utilities/CSequentialHelper';
import { MedicationChart } from '../resource/medicationchart.designer';
import { MedsAdminChartOverview } from '../resource/medsadminchartoverview.designer';
import { CumulativeAdministration } from '../model/cumulativeadministration';
import { DoseCalculator } from 'src/app/lorappmedicationcommonbb/resource/dosecalculator.designer';
import { Point } from '@progress/kendo-drawing/dist/npm/geometry';
import { Canvas } from 'src/app/shared/epma-platform/controls/epma-canvas/epma-canvas.component';
import { InfRecAdmMainView } from '../child/InfRecAdmMainView';
import { TagObject } from 'src/app/lorarcbluebirdmedicationchart/common/TagObject';
import { Binding, BindingMode } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { InfusionChartColumn } from 'src/app/lorarcbluebirdmedicationchart/common/InfusionChartColumn';
import { medsadmindetails } from 'src/app/lorappmedicationcommonbb/resource/medsadmindetails.designer';
import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { DrugItem } from 'src/app/lorarcbluebirdmedicationchart/common/DrugItem';
import { MedsAdminChartToolTip } from '../resource/medsadmincharttooltip.designer';
var that;
@Component({
    selector: 'infusion-chartview',
    templateUrl: './InfusionChartView.html',
    styleUrls: ['./InfusionChartView.css']
})
export class InfusionChartView extends UserControl {//} implements AfterViewInit{
    private LgndClickCount: number = 0;
    private _PopupParent: FrameworkElement;
    dtCurrentDateTime: DateTime = CommonBB.GetServerDateTime();
    objInfusionChartHelper: InfusionChartHelper;
    objInfusionChartVM: InfusionChartVM;
    dStartDate: DateTime = DateTime.MinValue;
    dEndDate: DateTime = DateTime.MinValue;
    objpgdadminstrationvm: PGDAdminstrationVM;
    oMedicationAdminVM: MedicationAdminVM;
    objRecordPGD: RecordPGD;
    msg: iMessageBox;
    objpgdadminvm: PGDAdminstrationVM;
    oGetMedsChartData: GetMedsChartData;
    IsCumulativeWarningAcknowledged: boolean = null;
    IsOutsideAdminTimeErrMsgExists: boolean = false;
    IsDiscontinuedErrorMsgExists: boolean = false;
    IsAnotherAdminDueErrMsgExists: boolean = false;
    IsInfusionAlertErrMsgExists: boolean = false;
    IsPreviousslotscheduledErrMsgExists: boolean = false;
    IsLockIconMsgExists: boolean = false;
    _previousAlertStatus: ObservableCollection<string> = null;
    //  InfusionChartControl: iInfusionChart;
    oResponseInfusionChart: CResMsgGetInfusionChart;
    IsConflictsErrorMsgExists: boolean = false;
    IsAlertShown: boolean = true;
    oSlotVM: SlotDetailVM = null;
    oClickedSlotTagObject: InfusionTagObject;
    oHdrRecordAdmin: CDrugHdrAddnlInfo;
    sSlotStatus: string = String.Empty;
    sDose: string = String.Empty;
    sDoseUOM: string = String.Empty;
    lnDoseUOMOID: number = 0;
    oInfusionRecAdminHelper: InfusionRecAdminHelper;
    PrescItemOID: number = 0;
    objINFRecAdminParams: INFRecordAdminParams = null;
    oInfChartAlerts: ArrayOfString = null;
    _canBeStruckThorugh: boolean = false;
    ParaChangedEvent: Function;
    PropertyChanged: Function;
    oInfRecAdminTypeCode: InfRecAdminTypeCode = null;
    InfCALaunch: CALaunch;
    IsRestrosPRN: boolean = false;
    lGroupSeqNo: number;
    objCommPrescriptionItemViewVM: CommPrescriptionItemViewVM;
    objPrescitemdetvm: PrescriptionItemDetailsVM;
    sParacetamolRecentlyAdministered: number = -1;
    OnGetInfusionChartDataEvent: Function;
    OnChartHotSpotClickEvent: Function;
    OnDrugHotSpotClickEvent: Function;
    OnPreviousClickEvent: Function;
    OnNextClickEvent: Function;
    OnNextClickCompleteEvent: Function;
    OnPreviousClickCompleteEvent: Function;
    OnErrorEvent: Function;
    infusionChartLoadCompleted: boolean = false;
  

    public LayoutRoot: Grid = new Grid()
    showPopup: boolean;
    public oMedsAdminChart = Resource.MedsAdminChartToolTip;
    oMedicationRequest = Resource.MedicationRequest;
    OnInfRecordAdminFinishCallback: any;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    private RowChart: RowDefinition = new RowDefinition();
    @ViewChild("RowChartTempRef", { read: RowDefinition, static: false }) set _RowChart(c: RowDefinition) {
        if (c) { this.RowChart = c; }
    };
    private InfusionChartControl: iInfusionChart = new iInfusionChart();
    @ViewChild("InfusionChartControlTempRef", { read: iInfusionChart, static: false }) set _InfusionChartControl(c: iInfusionChart) {
        if (c) { this.InfusionChartControl = c; }
    };
    private SeedCanvas: Canvas;
    @ViewChild("SeedCanvasTempRef", { read: Canvas, static: false }) set _SeedCanvas(c: Canvas) {
        if (c) { this.SeedCanvas = c; }
    };
    private popup: PopupComponent;
    @ViewChild("popupTempRef", { read: PopupComponent, static: false }) set _popup(c: PopupComponent) {
        if (c) { this.popup = c; }
    };
    private Brd: Border;
    @ViewChild("BrdTempRef", { read: Border, static: false }) set _Brd(c: Border) {
        if (c) { this.Brd = c; }
    };
    private LayoutRoot1: Grid;
    @ViewChild("LayoutRoot1TempRef", { read: Grid, static: false }) set _LayoutRoot1(c: Grid) {
        if (c) { this.LayoutRoot1 = c; }
    };
    // LegendsLayoutRoot: Grid;
    // @ViewChild("LegendsLayoutRootTempRef", { read: Grid, static: false }) set _LegendsLayoutRoot(c: Grid) {
    //     if (c) { this.LegendsLayoutRoot = c; }
    // };

    private btnNotGivenReason: iButton = new iButton();
    @ViewChild("btnNotGivenReasonTempRef", { read: iButton, static: false }) set _btnNotGivenReason(c: iButton) {
        if (c) { this.btnNotGivenReason = c; }
    };
    private cmdScheduledstart: iButton = new iButton();
    @ViewChild("cmdScheduledstartTempRef", { read: iButton, static: false }) set _cmdScheduledstart(c: iButton) {
        if (c) { this.cmdScheduledstart = c; }
    };
    private cmdDeferred: iButton = new iButton();
    @ViewChild("cmdDeferredTempRef", { read: iButton, static: false }) set _cmdDeferred(c: iButton) {
        if (c) { this.cmdDeferred = c; }
    };
    private cmdBegun: iButton = new iButton();
    @ViewChild("cmdBegunTempRef", { read: iButton, static: false }) set _cmdBegun(c: iButton) {
        if (c) { this.cmdBegun = c; }
    };
    private cmdPaused: iButton = new iButton();
    @ViewChild("cmdPausedTempRef", { read: iButton, static: false }) set _cmdPaused(c: iButton) {
        if (c) { this.cmdPaused = c; }
    };
    private cmdStopped: iButton = new iButton();
    @ViewChild("cmdStoppedTempRef", { read: iButton, static: false }) set _cmdStopped(c: iButton) {
        if (c) { this.cmdStopped = c; }
    };
    private cmdCompleted: iButton = new iButton();
    @ViewChild("cmdCompletedTempRef", { read: iButton, static: false }) set _cmdCompleted(c: iButton) {
        if (c) { this.cmdCompleted = c; }
    };
    private cmdNotGiven: iButton = new iButton();
    @ViewChild("cmdNotGivenTempRef", { read: iButton, static: false }) set _cmdNotGiven(c: iButton) {
        if (c) { this.cmdNotGiven = c; }
    };
    private cmdEstimatedStop: iButton = new iButton();
    @ViewChild("cmdEstimatedStopTempRef", { read: iButton, static: false }) set _cmdEstimatedStop(c: iButton) {
        if (c) { this.cmdEstimatedStop = c; }
    };
    private cmdOmitted: iButton = new iButton();
    @ViewChild("cmdOmittedTempRef", { read: iButton, static: false }) set _cmdOmitted(c: iButton) {
        if (c) { this.cmdOmitted = c; }
    };
    private cmdMci: iButton = new iButton();
    @ViewChild("cmdMciTempRef", { read: iButton, static: false }) set _cmdMci(c: iButton) {
        if (c) { this.cmdMci = c; }
    };
    private cmdOrderSet: iButton = new iButton();
    @ViewChild("cmdOrderSetTempRef", { read: iButton, static: false }) set _cmdOrderSet(c: iButton) {
        if (c) { this.cmdOrderSet = c; }
    };
    private cmCD: iButton = new iButton();
    @ViewChild("cmCDTempRef", { read: iButton, static: false }) set _cmCD(c: iButton) {
        if (c) { this.cmCD = c; }
    };
    private cmdAllert: iButton = new iButton();
    @ViewChild("cmdAllertTempRef", { read: iButton, static: false }) set _cmdAllert(c: iButton) {
        if (c) { this.cmdAllert = c; }
    };
    private cmdCumlativeDose: iButton = new iButton();
    @ViewChild("cmdCumlativeDoseTempRef", { read: iButton, static: false }) set _cmdCumlativeDose(c: iButton) {
        if (c) { this.cmdCumlativeDose = c; }
    };
    private cmdConflits: iButton = new iButton();
    @ViewChild("cmdConflitsTempRef", { read: iButton, static: false }) set _cmdConflits(c: iButton) {
        if (c) { this.cmdConflits = c; }
    };
    private cmdClinicalVrfy: iButton = new iButton();
    @ViewChild("cmdClinicalVrfyTempRef", { read: iButton, static: false }) set _cmdClinicalVrfy(c: iButton) {
        if (c) { this.cmdClinicalVrfy = c; }
    };
    private cmdDiscontinue: iButton = new iButton();
    @ViewChild("cmdDiscontinueTempRef", { read: iButton, static: false }) set _cmdDiscontinue(c: iButton) {
        if (c) { this.cmdDiscontinue = c; }
    };
    private cmdUnackConflict: iButton = new iButton();
    @ViewChild("cmdUnackConflictTempRef", { read: iButton, static: false }) set _cmdUnackConflict(c: iButton) {
        if (c) { this.cmdUnackConflict = c; }
    };
    private cmdLegend_RequestMedication: iButton = new iButton();
    @ViewChild("cmdLegend_RequestMedicationTempRef", { read: iButton, static: false }) set _cmdLegend_RequestMedication(c: iButton) {
        if (c) { this.cmdLegend_RequestMedication = c; }
    };
    private cmdLegend_HomeLeave: iButton = new iButton();
    @ViewChild("cmdLegend_HomeLeaveTempRef", { read: iButton, static: false }) set _cmdLegend_HomeLeave(c: iButton) {
        if (c) { this.cmdLegend_HomeLeave = c; }
    };
    private cmdLegend_ReviewDue: iButton = new iButton();
    @ViewChild("cmdLegend_ReviewDueTempRef", { read: iButton, static: false }) set _cmdLegend_ReviewDue(c: iButton) {
        if (c) { this.cmdLegend_ReviewDue = c; }
    };
    private cmdLegend_Amended: iButton = new iButton();
    @ViewChild("cmdLegend_AmendedTempRef", { read: iButton, static: false }) set _cmdLegend_Amended(c: iButton) {
        if (c) { this.cmdLegend_Amended = c; }
    };
    private cmdLegend_DoseDetails: iButton = new iButton();
    @ViewChild("cmdLegend_DoseDetailsTempRef", { read: iButton, static: false }) set _cmdLegend_DoseDetails(c: iButton) {
        if (c) { this.cmdLegend_DoseDetails = c; }
    };
    private cmdLegend_OnAdmission: iButton = new iButton();
    @ViewChild("cmdLegend_OnAdmissionTempRef", { read: iButton, static: false }) set _cmdLegend_OnAdmission(c: iButton) {
        if (c) { this.cmdLegend_OnAdmission = c; }
    };
    private cmdLegend_DoseCalculator: iButton = new iButton();
    @ViewChild("cmdLegend_DoseCalculatorTempRef", { read: iButton, static: false }) set _cmdLegend_DoseCalculator(c: iButton) {
        if (c) { this.cmdLegend_DoseCalculator = c; }
    };
    private cmdLegend_prescriptiondetails: iButton = new iButton();
    @ViewChild("cmdLegend_prescriptiondetailsTempRef", { read: iButton, static: false }) set _cmdLegend_prescriptiondetails(c: iButton) {
        if (c) { this.cmdLegend_prescriptiondetails = c; }
    };
    private cmdLegend_SupplyInst: iButton = new iButton();
    @ViewChild("cmdLegend_SupplyInstTempRef", { read: iButton, static: false }) set _cmdLegend_SupplyInst(c: iButton) {
        if (c) { this.cmdLegend_SupplyInst = c; }
    };
    private cmdLegend_CriticalMeds: iButton = new iButton();
    @ViewChild("cmdLegend_criticalMedsTempRef", { read: iButton, static: false }) set _cmdLegend_CriticalMeds(c: iButton) {
        if (c) { this.cmdLegend_CriticalMeds = c; }
    };
    LegendsLayoutRoot: FrameworkElement = new FrameworkElement();
    NotGivenReasonsLayoutRoot: FrameworkElement = new FrameworkElement();
    public anchorAlign: Align = { horizontal: "right", vertical: "top" };
    public popupAlign: Align = { horizontal: "left", vertical: "bottom" };
    // NotGivenReasonsLayoutRoot: Grid = new Grid();
    // @ViewChild("NotGivenReasonsLayoutRootTempRef", { read: Grid, static: false }) set _NotGivenReasonsLayoutRoot(c: Grid) {
    //     if (c) { this.NotGivenReasonsLayoutRoot = c; }
    // };
    private btnLegends: iButton = new iButton();
    @ViewChild("btnLegendsTempRef", { read: iButton, static: false }) set _btnLegends(c: iButton) {
        if (c) { this.btnLegends = c; }
    };
    private btnRsnHeader: iLabel = new iLabel();
    @ViewChild("btnRsnHeaderTempRef", { read: iLabel, static: false }) set _btnRsnHeader(c: iLabel) {
        if (c) { this.btnRsnHeader = c; }
    };
    private btnPatientUnavailable: iLabel = new iLabel();
    @ViewChild("btnPatientUnavailableTempRef", { read: iLabel, static: false }) set _btnPatientUnavailable(c: iLabel) {
        if (c) { this.btnPatientUnavailable = c; }
    };
    private btnPatientRefuseddoseWC: iLabel = new iLabel();
    @ViewChild("btnPatientRefuseddoseWCTempRef", { read: iLabel, static: false }) set _btnPatientRefuseddoseWC(c: iLabel) {
        if (c) { this.btnPatientRefuseddoseWC = c; }
    };
    private btnPatientRefuseddoseWOC: iLabel = new iLabel();
    @ViewChild("btnPatientRefuseddoseWOCTempRef", { read: iLabel, static: false }) set _btnPatientRefuseddoseWOC(c: iLabel) {
        if (c) { this.btnPatientRefuseddoseWOC = c; }
    };
    private btnMedicationUnavailable: iLabel = new iLabel();
    @ViewChild("btnMedicationUnavailableTempRef", { read: iLabel, static: false }) set _btnMedicationUnavailable(c: iLabel) {
        if (c) { this.btnMedicationUnavailable = c; }
    };
    private btnNilbyMouth: iLabel = new iLabel();
    @ViewChild("btnNilbyMouthTempRef", { read: iLabel, static: false }) set _btnNilbyMouth(c: iLabel) {
        if (c) { this.btnNilbyMouth = c; }
    };
    private btnRouteNotAvailable: iLabel = new iLabel();
    @ViewChild("btnRouteNotAvailableTempRef", { read: iLabel, static: false }) set _btnRouteNotAvailable(c: iLabel) {
        if (c) { this.btnRouteNotAvailable = c; }
    };
    private btnMedicinefreeInterval: iLabel = new iLabel();
    @ViewChild("btnMedicinefreeIntervalTempRef", { read: iLabel, static: false }) set _btnMedicinefreeInterval(c: iLabel) {
        if (c) { this.btnMedicinefreeInterval = c; }
    };
    private btnPrescriptionIncorrect: iLabel = new iLabel();
    @ViewChild("btnPrescriptionIncorrectTempRef", { read: iLabel, static: false }) set _btnPrescriptionIncorrect(c: iLabel) {
        if (c) { this.btnPrescriptionIncorrect = c; }
    };
    private btnPatientUnableToTake: iLabel = new iLabel();
    @ViewChild("btnPatientUnableToTakeTempRef", { read: iLabel, static: false }) set _btnPatientUnableToTake(c: iLabel) {
        if (c) { this.btnPatientUnableToTake = c; }
    };
    private btnClinicalReason: iLabel = new iLabel();
    @ViewChild("btnClinicalReasonTempRef", { read: iLabel, static: false }) set _btnClinicalReason(c: iLabel) {
        if (c) { this.btnClinicalReason = c; }
    };
    private btnNumbers: iLabel = new iLabel();
    @ViewChild("btnNumbersTempRef", { read: iLabel, static: false }) set _btnNumbers(c: iLabel) {
        if (c) { this.btnNumbers = c; }
    };
    private btnNo1: iLabel = new iLabel();
    @ViewChild("btnNo1TempRef", { read: iLabel, static: false }) set _btnNo1(c: iLabel) {
        if (c) { this.btnNo1 = c; }
    };
    private btnNo2: iLabel = new iLabel();
    @ViewChild("btnNo2TempRef", { read: iLabel, static: false }) set _btnNo2(c: iLabel) {
        if (c) { this.btnNo2 = c; }
    };
    private btnNo3: iLabel = new iLabel();
    @ViewChild("btnNo3TempRef", { read: iLabel, static: false }) set _btnNo3(c: iLabel) {
        if (c) { this.btnNo3 = c; }
    };
    private btnNo4: iLabel = new iLabel();
    @ViewChild("btnNo4TempRef", { read: iLabel, static: false }) set _btnNo4(c: iLabel) {
        if (c) { this.btnNo4 = c; }
    };
    private btnNo5: iLabel = new iLabel();
    @ViewChild("btnNo5TempRef", { read: iLabel, static: false }) set _btnNo5(c: iLabel) {
        if (c) { this.btnNo5 = c; }
    };
    private btnNo6: iLabel = new iLabel();
    @ViewChild("btnNo6TempRef", { read: iLabel, static: false }) set _btnNo6(c: iLabel) {
        if (c) { this.btnNo6 = c; }
    };
    private btnNo7: iLabel = new iLabel();
    @ViewChild("btnNo7TempRef", { read: iLabel, static: false }) set _btnNo7(c: iLabel) {
        if (c) { this.btnNo7 = c; }
    };
    private btnNo8: iLabel = new iLabel();
    @ViewChild("btnNo8TempRef", { read: iLabel, static: false }) set _btnNo8(c: iLabel) {
        if (c) { this.btnNo8 = c; }
    };
    private btnNo9: iLabel = new iLabel();
    @ViewChild("btnNo9TempRef", { read: iLabel, static: false }) set _btnNo9(c: iLabel) {
        if (c) { this.btnNo9 = c; }
    };
    private btnNo10: iLabel = new iLabel();
    @ViewChild("btnNo10TempRef", { read: iLabel, static: false }) set _btnNo10(c: iLabel) {
        if (c) { this.btnNo10 = c; }
    };
    private lblPatientHtWtBSA: iLabel = new iLabel();
    @ViewChild("lblPatientHtWtBSATempRef", { read: iLabel, static: false }) set _lblPatientHtWtBSA(c: iLabel) {
        if (c) { this.lblPatientHtWtBSA = c; }
    };
    private lblChatStatus: iLabel = new iLabel();
    @ViewChild("lblChatStatusTempRef", { read: iLabel, static: false }) set _lblChatStatus(c: iLabel) {
        if (c) { this.lblChatStatus = c; }
    };
    private lblChatStatusValue: iLabel = new iLabel();
    @ViewChild("lblChatStatusValueTempRef", { read: iLabel, static: false }) set _lblChatStatusValue(c: iLabel) {
        if (c) { this.lblChatStatusValue = c; }
    };
    private btnHeightweightPopUp: iButton;
    @ViewChild("btnHeightweightPopUpTempRef", { read: iButton, static: false }) set _btnHeightweightPopUp(c: iButton) {
        if (c) { this.btnHeightweightPopUp = c; }
    };
    private lblDSTClockNotifier: iLabel = new iLabel();
    @ViewChild("lblDSTClockNotifierTempRef", { read: iLabel, static: false }) set _lblDSTClockNotifier(c: iLabel) {
        if (c) { this.lblDSTClockNotifier = c; }
    };
    private lblAuthoriseNotifier: iLabel = new iLabel();
    @ViewChild("lblAuthoriseNotifierTempRef", { read: iLabel, static: false }) set _lblAuthoriseNotifier(c: iLabel) {
        if (c) { this.lblAuthoriseNotifier = c; }
    };
    private ChartLegandRight: StackPanel;
    @ViewChild("ChartLegandRightTempRef", { read: StackPanel, static: false }) set _ChartLegandRight(c: StackPanel) {
        if (c) { this.ChartLegandRight = c; }
    };
    private RectOverdueColor: Border;
    @ViewChild("RectOverdueColorTempRef", { read: Border, static: false }) set _RectOverdueColor(c: Border) {
        if (c) { this.RectOverdueColor = c; }
    };
    private lblOverdueNumber: iLabel = new iLabel();
    @ViewChild("lblOverdueNumberTempRef", { read: iLabel, static: false }) set _lblOverdueNumber(c: iLabel) {
        if (c) { this.lblOverdueNumber = c; }
    };
    private lblOverdue: iLabel = new iLabel();
    @ViewChild("lblOverdueTempRef", { read: iLabel, static: false }) set _lblOverdue(c: iLabel) {
        if (c) { this.lblOverdue = c; }
    };
    private RectDueColor: Border;
    @ViewChild("RectDueColorTempRef", { read: Border, static: false }) set _RectDueColor(c: Border) {
        if (c) { this.RectDueColor = c; }
    };
    private lblDueNumber: iLabel = new iLabel();
    @ViewChild("lblDueNumberTempRef", { read: iLabel, static: false }) set _lblDueNumber(c: iLabel) {
        if (c) { this.lblDueNumber = c; }
    };
    private lblDue: iLabel = new iLabel();
    @ViewChild("lblDueTempRef", { read: iLabel, static: false }) set _lblDue(c: iLabel) {
        if (c) { this.lblDue = c; }
    };
    private RectInprogressColor: Border;
    @ViewChild("RectInprogressColorTempRef", { read: Border, static: false }) set _RectInprogressColor(c: Border) {
        if (c) { this.RectInprogressColor = c; }
    };
    private lblInprogressNumber: iLabel = new iLabel();
    @ViewChild("lblInprogressNumberTempRef", { read: iLabel, static: false }) set _lblInprogressNumber(c: iLabel) {
        if (c) { this.lblInprogressNumber = c; }
    };
    private lblInprogress: iLabel = new iLabel();
    @ViewChild("lblInprogressTempRef", { read: iLabel, static: false }) set _lblInprogress(c: iLabel) {
        if (c) { this.lblInprogress = c; }
    };
    private RectAsRequiredColor: Border;
    @ViewChild("RectAsRequiredColorTempRef", { read: Border, static: false }) set _RectAsRequiredColor(c: Border) {
        if (c) { this.RectAsRequiredColor = c; }
    };
    private lblAsRequiredNumber: iLabel = new iLabel();
    @ViewChild("lblAsRequiredNumberTempRef", { read: iLabel, static: false }) set _lblAsRequiredNumber(c: iLabel) {
        if (c) { this.lblAsRequiredNumber = c; }
    };
    private lblAsRequired: iLabel = new iLabel();
    @ViewChild("lblAsRequiredTempRef", { read: iLabel, static: false }) set _lblAsRequired(c: iLabel) {
        if (c) { this.lblAsRequired = c; }
    };
    private cmdRecordPGDLinks: iButton = new iButton();
    @ViewChild("cmdRecordPGDLinksTempRef", { read: iButton, static: false }) set _cmdRecordPGDLinks(c: iButton) {
        if (c) { this.cmdRecordPGDLinks = c; }
    };
    private cmdPrescribe: iButton = new iButton();
    @ViewChild("cmdPrescribeTempRef", { read: iButton, static: false }) set _cmdPrescribe(c: iButton) {
        if (c) { this.cmdPrescribe = c; }
    };
    private cmdPrintMedChart: iButton = new iButton();
    @ViewChild("cmdPrintMedChartTempRef", { read: iButton, static: false }) set _cmdPrintMedChart(c: iButton) {
        if (c) { this.cmdPrintMedChart = c; }
    };
    // private cmdFluidBalance: iButton = new iButton();
    // @ViewChild("cmdFluidBalanceTempRef", { read: iButton, static: false }) set _cmdFluidBalance(c: iButton) {
    //     if (c) { this.cmdFluidBalance = c; }
    // };
    private cmdRequestMedication: iButton = new iButton();
    @ViewChild("cmdRequestMedicationTempRef", { read: iButton, static: false }) set _cmdRequestMedication(c: iButton) {
        if (c) { this.cmdRequestMedication = c; }
    };
    private cmdTechValidate: iButton = new iButton();
    @ViewChild("cmdTechValidateTempRef", { read: iButton, static: false }) set _cmdTechValidate(c: iButton) {
        if (c) { this.cmdTechValidate = c; }
    };
    private cmdShowLegend: iButton = new iButton();
    @ViewChild("cmdShowLegendTempRef", { read: iButton, static: false }) set _cmdShowLegend(c: iButton) {
        if (c) { this.cmdShowLegend = c; }
    };
    private cmdWristbandScan: iButton = new iButton();
    @ViewChild("cmdWristbandScanTempRef", { read: iButton, static: false }) set _cmdWristbandScan(c: iButton) {
        if (c) { this.cmdWristbandScan = c; }
    };
    private lblEmpty: iLabel = new iLabel();
    @ViewChild("lblEmptyTempRef", { read: iLabel, static: false }) set _lblEmpty(c: iLabel) {
        if (c) { this.lblEmpty = c; }
    };
    // private txtBarcode: iTextBox = new iTextBox();
    // @ViewChild("txtBarcodeTempRef", { read: iTextBox, static: false }) set _txtBarcode(c: iTextBox) {
    //     if (c) { this.txtBarcode = c; }
    // };
    @ViewChild('txtBarcodeTempRef', { static: false }) txtBarcode: ElementRef;
    @Input() get isChildWizard(){
        return AppLoadService.isChildWizard;
    }
    //#endregion VIEWCHILD
    IsMedChartReadOnly: boolean;
    constructor() {
        super();
        that = this;
       
        this.objInfusionChartVM = new InfusionChartVM();
        this.objInfusionChartHelper = new InfusionChartHelper(this.objInfusionChartVM);
        // if (this.objInfusionChartVM.MedicationAdminBaseVM == null)
        // this.objInfusionChartVM.MedicationAdminBaseVM = new MedicationAdminVM();
        // this.DataContext = this.objInfusionChartVM;
        this.LayoutRoot.DataContext = this.objInfusionChartVM;
    }
    private constructorLoad() {
        this.objInfusionChartHelper.OnInfusionChartLoadCompleted = (s, e) => {

            // to send the cahrtrows data to infusionchart component
            // this.LayoutRoot.ChildrenArr.forEach((child: any) => {
            //     child.control['ChartRows'] = this.InfusionChartControl.ChartRows;
            // });

            this.objInfusionChartHelper_OnInfusionChartLoadCompleted(s);
        };
        this.ParaChangedEvent = (s, e) => { this.CumulativeParacetamol_WarningChangeEvent(e); };
        this.PropertyChanged = (s, e) => { this.objInfusionChartVM_OnPropertyChanged(); };
        this.OnGetInfusionChartDataEvent = (s, e) => {
            // setTimeout(() => {
            this.InfusionChartControl = that.InfusionChartControl;
            this.objInfusionChartVM_OnGetInfusionChartData(e);
        //     }, 0);
         };
        this.OnChartHotSpotClickEvent = (s, e) => { this.InfusionChartControl_OnChartHotSpotClick(s, e); };
        this.OnDrugHotSpotClickEvent = (s, e) => { this.InfusionChartControl_OnDrugHotSpotClick(s, e); };
        this.OnPreviousClickEvent = (s, e) => { this.InfusionChartControl_OnPreviousClick(s, e); };
        this.OnNextClickEvent = (s, e) => { this.InfusionChartControl_OnNextClick(s, e); };
        this.OnNextClickCompleteEvent = (s, e) => { this.InfusionChartControl_OnNextClickComplete(s, e); };
        this.OnPreviousClickCompleteEvent = (s, e) => { this.InfusionChartControl_OnPreviousClickComplete(s, e); };
        this.OnErrorEvent = (s, e) => { this.InfusionChartControl_OnErrorLog(e); };
    }
    ngOnInit() {
         this.constructorLoad();
         AppContextInfo.UserOID = ContextManager.Instance['UserOID'].toString();
        AppContextInfo.OrganisationName = ContextManager.Instance["OrganisationName"].toString();
        AppContextInfo.JobRoleOID = ContextManager.Instance["JobRoleOID"].toString();
        AppContextInfo.OrganisationOID = ContextManager.Instance["OrganisationOID"].toString();
    }
    ngAfterViewInit(): void {
        setTimeout(() => {
            this.LoadVisibility();
        }, 1000);
        
        this.UserControl_Loaded({}, null);

    }
    public barCodeVisibilityFlag = true;
    public barCodeReadOnlyFlag = false;
        LoadVisibility() {   
           // this.IsMedChartReadOnly = false;
        this.IsMedChartReadOnly = MedChartData.IsMedChartReadOnly;
    
        if (!this.IsMedChartReadOnly) {
            this.cmdWristbandScan.IsEnabled = true;
            this.barCodeReadOnlyFlag = false;
            this.cmdWristbandScan.Visibility = Visibility.Visible;
            this.barCodeVisibilityFlag = true;
        }
        else {
            this.cmdWristbandScan.IsEnabled = false;
            this.barCodeReadOnlyFlag = true;
            this.cmdWristbandScan.Visibility = Visibility.Collapsed;
            this.barCodeVisibilityFlag = false;
        }
        //this.btnHeightweightPopUp.Visibility = this.SetVisibility(this.DataContext.IsVisibleHWIndicator);
          this.cmdPrintMedChart.Visibility = this.LayoutRoot.DataContext.IsPrintVisible;
          this.cmdPrintMedChart.IsEnabled = this.objInfusionChartVM.IsPrintMedChartEnabled;

        //  this.cmdFluidBalance.Visibility = this.LayoutRoot.DataContext.IsFBVisible;
        //  this.cmdFluidBalance.IsEnabled = this.objInfusionChartVM.IsFBEnabled;

         this.cmdRequestMedication.Visibility = this.LayoutRoot.DataContext.IsRMVisible;
          this.cmdRequestMedication.IsEnabled = this.objInfusionChartVM.IsRMEnabled;

         this.cmdTechValidate.Visibility = this.LayoutRoot.DataContext.IsTechValVisible;
          this.cmdTechValidate.IsEnabled = this.objInfusionChartVM.IsTechValEnabled;

         this.cmdRecordPGDLinks.Visibility = this.LayoutRoot.DataContext.IsRecPGDVisible;

         this.cmdPrescribe.Visibility = this.LayoutRoot.DataContext.IsPrescribeVisible;
          this.cmdPrescribe.IsEnabled = this.objInfusionChartVM.IsPrescribeEnabled;

        // this.cmdPrintMedChart.Click = (s) => this.objInfusionChartVM.LaunchPrintMedChartWizard();

        // this.cmdFluidBalance.Click = (s) => this.objInfusionChartVM.LaunchFBChart();

        // this.cmdRequestMedication.Click = (s) => this.objInfusionChartVM.cmdRequestMedication_Click();

        // this.cmdTechValidate.Click = (s) => this.objInfusionChartVM.cmdTechValidate_Click();
        this.objInfusionChartVM.IsFBEnabled = UserPermissions.CanEnableFBChart;
        if ((this.IsMedChartReadOnly && !MedChartData.IsLaunchFrmPrescribe)||MedChartData.IsLaunchFrmPrescribe) {
            this.cmdTechValidate.Visibility = Visibility.Collapsed;
            this.cmdRequestMedication.Visibility = Visibility.Collapsed;
            this.cmdPrintMedChart.Visibility = Visibility.Collapsed;
            this.cmdPrescribe.Visibility = Visibility.Collapsed;
            // this.cmdFluidBalance.Visibility = Visibility.Collapsed;
            this.cmdRecordPGDLinks.Visibility = Visibility.Collapsed;
        }
        
        if (this.IsMedChartReadOnly) {
            this.cmdRecordPGDLinks.IsEnabled = false;
        }

         this.cmdPrescribe.Click = (s) => this.objInfusionChartVM.LaunchPrescribeWizard();
    
    }

    SetVisibility(value: boolean | number | string): Visibility {
        let _valVisibility = Visibility.Collapsed;
        if (typeof value == 'boolean') {
            if (value == true) {
                _valVisibility = Visibility.Visible;
            }
        }
        else if (typeof value == 'number') {
            if (value == 1) {
                _valVisibility = Visibility.Visible;
            }
        }
        else if (typeof value == 'string') {
            if (value == 'Visible') {
                _valVisibility = Visibility.Visible;
            }
        }
        return _valVisibility;
    }
    oTagSlotDetail: TagSlotDetail;
    //  oClickedSlotTagObject: TagObject;
    oTagDrugHeaderDetail: TagDrugHeaderDetail = new TagDrugHeaderDetail();
    TextBlockControl: TextBlock = new TextBlock();
    public _isActivityLaunchedInSlot: boolean;
    public get IsActivityLaunchedInSlot(): boolean {
        return this._isActivityLaunchedInSlot;
    }
    public set IsActivityLaunchedInSlot(value: boolean) {
        this._isActivityLaunchedInSlot = value;
        if (this.TextBlockControl != null) {
            this.TextBlockControl.Visibility = this._isActivityLaunchedInSlot ? Visibility.Visible : Visibility.Collapsed;
        }
    }
    InfRecAdmMainView: InfRecAdmMainView;

    private UserControl_Loaded(sender: Object, e: RoutedEventArgs): void {
        Busyindicator.SetStatusBusy("InfusionChart");
        ChartContext.CurrentChartTab = CConstants.sTabInfusionKey;
        ChartContext.IsInfusionAlertsNotReviewed = false;
        this.InitializeInfusionChart();
        this.cmdTechValidate.IsEnabled = this.objInfusionChartVM.IsTechValEnabled;
        if (this.objInfusionChartVM.MedicationAdminBaseVM == null) {
            this.objInfusionChartVM.MedicationAdminBaseVM = this.DataContext;

        }
        //this.objInfusionChartVM.OnPropertyChanged -= this.PropertyChanged;
        this.objInfusionChartVM.OnPropertyChanged = this.PropertyChanged;
        if (this.objInfusionChartVM.MedicationAdminBaseVM != null) {
            //this.objInfusionChartVM.MedicationAdminBaseVM.CumulativeParacetamol.RefreshCumulativeWarningEvent -= this.ParaChangedEvent;
            this.objInfusionChartVM.MedicationAdminBaseVM.CumulativeParacetamol.RefreshCumulativeWarningEvent = (s, e) => { this.ParaChangedEvent(s, e); };
        }
        //this.objInfusionChartVM.OnGetInfusionChartData -= this.OnGetInfusionChartDataEvent;
        this.objInfusionChartVM.OnGetInfusionChartData = (s, e) => { this.OnGetInfusionChartDataEvent(s, e); };
        this.InfusionChartControl.Height = this.RowChart.ActualHeight - 5;
        // revsit
        //   this.InfusionChartControl.Width = this.LayoutRoot.ActualWidth;
        this.objInfusionChartVM.GetInfusionChartData(this.objInfusionChartVM.StartDTTM, this.objInfusionChartVM.EndDTTM, this.objInfusionChartVM.CurrentDTTM);
        // this.objInfusionChartVM.IsFBEnabled = UserPermissions.CanEnableFBChart;
        // if (this.IsMedChartReadOnly && !MedChartData.IsLaunchFrmPrescribe) {
        //     this.cmdTechValidate.Visibility = Visibility.Collapsed;
        //     this.cmdRequestMedication.Visibility = Visibility.Collapsed;
        //     this.cmdPrintMedChart.Visibility = Visibility.Collapsed;
        //     this.cmdPrescribe.Visibility = Visibility.Collapsed;
        //     this.cmdFluidBalance.Visibility = Visibility.Collapsed;
        //     this.cmdRecordPGDLinks.Visibility = Visibility.Collapsed;
        // }
        // if (this.IsMedChartReadOnly) {
        //     this.cmdRecordPGDLinks.IsEnabled = false;
        // }
        if (this.objInfusionChartVM != null && this.objInfusionChartVM.MedicationAdminBaseVM != null) {
            this.objInfusionChartVM.MedicationAdminBaseVM.SetHeightweightPopUp();
            if (MedChartData.PatinetInfo != null && !String.IsNullOrEmpty(MedChartData.PatinetInfo.Observation)) {                
                let sHtWtBSA: string = MedChartData.PatinetInfo.Observation;
                if (!String.IsNullOrEmpty(PatientContext.BSA))
                    sHtWtBSA += " " + PatientContext.BSA + MedsAdminChartToolTip.PatientBSAUOMText;
                this.objInfusionChartVM.MedicationAdminBaseVM.PatientHtWtBSAText = sHtWtBSA;
                CommonBB.PatientBSADataCompletedEvent_chart= (s, e) => { this.CommonBB_PatientBSADataCompletedEvent_chart(s, e); };                
            }            
        }
        if (this.DataContext instanceof MedicationAdminVM) {
            if (MedicationCommonProfileData.PrescribeConfig != null && MedicationCommonProfileData.PrescribeConfig.EnableDoseCalc) {
                //(ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM)).ActivityConsiderationUpdatedCompleted -= MedsAdminChartView_ActivityConsiderationUpdatedCompleted;
                (ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM)).ActivityConsiderationUpdatedCompleted = (s, e) => { this.MedsAdminChartView_ActivityConsiderationUpdatedCompleted(); };
            }
        }
        // this.DataContext = this.objInfusionChartVM;
        Busyindicator.SetStatusIdle("InfusionChart");
        if( ChartContext.CurrentChartTab == "CC_INFUSIONCHART" && !GetMedsChartData.bInvokeWarningUnsubscribe)
             GetMedsChartData.InvokeWarning.next(true);        
    }
    CommonBB_PatientBSADataCompletedEvent_chart(Formula: string, BSA: string) {        
        let sHtWtBSA: string = MedChartData.PatinetInfo.Observation;
        if (!String.IsNullOrEmpty(PatientContext.BSA))
            sHtWtBSA += " " + PatientContext.BSA + MedsAdminChartToolTip.PatientBSAUOMText;
        this.objInfusionChartVM.MedicationAdminBaseVM.PatientHtWtBSAText = sHtWtBSA;
    }
    private RefreshDCAlertIcon(): void {
        if (String.Equals(ChartContext.CurrentChartTab, CConstants.sTabInfusionKey, StringComparison.InvariantCultureIgnoreCase) && this.InfusionChartControl != null && this.InfusionChartControl.ChartRows != null && this.InfusionChartControl.ChartRows.Count > 0 && MedicationCommonProfileData.PrescribeConfig != null && MedicationCommonProfileData.PrescribeConfig.EnableDoseCalc && MedicationCommonProfileData.PrescribeConfig.HeightWeightChangeAlert) {
            let dtRecordHWDTTM: DateTime = DateTime.MinValue;
            if (MedChartData.PatinetInfo != null) {
                dtRecordHWDTTM = DateTime.GreaterThanOrEqualTo(MedChartData.PatinetInfo.DCHTRecordDTTM , MedChartData.PatinetInfo.DCWTRecordDTTM) ? MedChartData.PatinetInfo.DCHTRecordDTTM : MedChartData.PatinetInfo.DCWTRecordDTTM;
            }
            let oPresItem: List<number> = this.oResponseInfusionChart.InfusionChatView.DrugDetail.Where(C => C.DrugHeader != null && C.DrugHeader.IsDoseCalculatedByDC && dtRecordHWDTTM != DateTime.MinValue && C.DrugHeader.DCalcDTTM < dtRecordHWDTTM && !String.Equals(C.DrugHeader.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) && !String.Equals(C.DrugHeader.PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.CurrentCultureIgnoreCase) && !String.Equals(C.DrugHeader.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase)).Select(S => S.DrugHeader.PrescriptionItemOID).ToList();
            if (oPresItem != null && oPresItem.Count > 0) {
                oPresItem.forEach((PresItem) => {
                    let oSelectChartRow: InfusionChartRow = this.InfusionChartControl.ChartRows.Where(C => C.Key.Equals("Row-" + PresItem.ToString())).FirstOrDefault();
                    if (oSelectChartRow != null && oSelectChartRow.DrugItem != null && oSelectChartRow.DrugItem.Tag != null) {
                        let oTagObj: InfusionTagObject = new InfusionTagObject();
                        let oEmptyTagObj: InfusionTagObject = new InfusionTagObject();
                        oTagObj.oChartCell = oSelectChartRow.InfusionChartCells.FirstOrDefault();
                        oSelectChartRow.DrugItem.DoseCalcIcon = this.LoadImage("IsDoseCalculatedByDC", MedImage.GetPath(MedImages.DoseCalculatorWithAlert));
                        oSelectChartRow.DrugItem.DoseCalcIcon.Tooltip = Resource.DoseCalculator.DoseCalci_Tooltip;
                        this.InfusionChartControl.RowRefresh(oEmptyTagObj);
                        this.InfusionChartControl.RowRefresh(oTagObj);
                    }
                });
            }
        }
    }
    public LoadImage(key: string, Uri: string): ChartIcon {
        let oChartIcon: ChartIcon = new ChartIcon();
        oChartIcon.Key = key;
        oChartIcon.UriString = Uri;
        return oChartIcon;
    }
    MedsAdminChartView_ActivityConsiderationUpdatedCompleted(): void {
        this.RefreshDCAlertIcon();
    }
    LaunchDosecalciDetails(PrescriptionItemOId: number, sDrugName: string): void {
        Busyindicator.SetStatusBusy("DCIconClicked");
        let objDosecalc: MedDoseDetails = new MedDoseDetails();
        this.objPrescitemdetvm = new PrescriptionItemDetailsVM();
        objDosecalc.PrescriptionItemOID = PrescriptionItemOId;
        this.objPrescitemdetvm.GetDoseDeatils(PrescriptionItemOId);
        this.objPrescitemdetvm.DoseDetailEvent = (s, e) => { this.PrescriptionItemDetailsVM_DoseDetailEvent(this.objPrescitemdetvm); };
    }
    PrescriptionItemDetailsVM_DoseDetailEvent(PresItemDetails: PrescriptionItemDetailsVM): void {
        let objDoseCalc: MedDoseDetails = new MedDoseDetails();
        objDoseCalc = new MedDoseDetails();
        objDoseCalc.DataContext = PresItemDetails.DoseDetails;
        let stitle: string = "Dose calculation details - LORENZO -- Webpage Dialog";
        let dialogWindowHeight;
        if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
            dialogWindowHeight = 470;
        }else{
            dialogWindowHeight = 700;
        }
        AppActivity.OpenWindow(stitle, objDoseCalc, this.omedDoseDetails_Closed, "", false, dialogWindowHeight, 820, false, WindowButtonType.Close, null);
    }
    omedDoseDetails_Closed(args: AppDialogEventargs): void {
        Busyindicator.SetStatusIdle("DCIconClicked");
        args.AppChildWindow.DialogResult = true;
    }
    InfusionChartControl_OnErrorLog(e: Exception): void {
        console.log('flicker',e);
        let lnReturn: number = 0;
        let _ErrorID: number = 80000099;
        let _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:InfusionChartView, Method:InfusionChartControl_OnErrorLog()";
        lnReturn = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e);
    }
    objInfusionChartVM_OnPropertyChanged(): void {
        this.InitializeInfusionChart();
        // this.InfusionChartControl.Height = this.RowChart.ActualHeight - 5;
        // this.InfusionChartControl.Width = this.LayoutRoot.ActualWidth;
        this.objInfusionChartVM.GetInfusionChartData(this.objInfusionChartVM.StartDTTM, this.objInfusionChartVM.EndDTTM, this.objInfusionChartVM.CurrentDTTM);
	
        if (this.objInfusionChartVM != null && this.objInfusionChartVM.MedicationAdminBaseVM != null) {
            this.objInfusionChartVM.MedicationAdminBaseVM.PropertyChanged = null;
        }
    }
    cmdRecordPGDLinks_Click(e): void {
        Busyindicator.SetStatusBusy("RecordPgd");
        this.objpgdadminstrationvm = new PGDAdminstrationVM(true);
        this.objpgdadminstrationvm.IsPGDListsAvailable(Convert.ToInt64(AppContextInfo.JobRoleOID), 0, MedChartData.MedChartOID);
        this.objpgdadminstrationvm.IsPGDListAvailableEvent = (s) => { this.objpgdadminstrationvm_IsPGDListAvailableEvent(s); };
    }
    async RecordPGDOrAllergyLaunch(): Promise<void> {
        let menucode: string = "MN_RECORDPGD_P2";
        let CONFALRGY: string = "MN_HI_CONFALRGY";
        let IsPatContextEncAvlb: boolean = false;
        let Launch: string;
        let Allergylaunch: ScriptObject = null;
        let EncOID: string = PatientContext.EncounterOid.ToString();
        let Enctype: string = CommonBB.GetText(PatientContext.EncounterType, ValueDomainValues.oEncTyp);
        if (PatientContext.EncounterOid == 0) {
            let oLatestActiveEncounter: Encounter = this.GetLatestActiveEncounter();
            if (oLatestActiveEncounter != null) {
                EncOID = oLatestActiveEncounter.EncounterOID.ToString();
                Enctype = oLatestActiveEncounter.Type;
            } 
        }
       if (!String.IsNullOrEmpty(EncOID))
           IsPatContextEncAvlb = true;
        let result_sp = null;
        result_sp = ObjectHelper.CreateType<ScriptObject>(await HtmlPage.Window.InvokeAsync("LaunchAllergyCheckedforChartMedication", menucode, Enctype, IsPatContextEncAvlb, EncOID), ScriptObject);
        if (result_sp.returnData) {
            let result = { Response: result_sp.GetProperty("result").Response };
            let oReturn_sp = result_sp.GetProperty("oReturn");
            if (result.Response != null && result.Response.AllergyPromptRequired != null && result.Response.AllergyPromptRequired != "" && result.Response.AllergyPromptRequired == "True") {
                let callbackResult = (sender: Object, e: MessageEventArgs) => {
                    if (e.MessageBoxResult == MessageBoxResult.Cancel) {
                        Busyindicator.SetStatusIdle("RecordPgd");
                        return;
                    }
                    if (e.MessageBoxResult == MessageBoxResult.OK) {
                        let oReturn = [];
                        oReturn["LaunchCA"] = "MN_HI_CONFALRGY";
                        let returnScriptObject: ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = oReturn;
                        this.GetPRGDAllergylaunch(returnScriptObject, menucode, EncOID, Enctype);
                    }
                };
                let msg: iMessageBox = new iMessageBox();
                msg.Title = 'Information - LORENZO';
                msg.Message = 'Please review medication related allergies/ADRs and update if necessary before proceeding.';
                msg.Width = 410,
                msg.Height = 160,
                msg.MessageButton = MessageBoxButton.OKCancel;
                msg.IconType = MessageBoxType.Information;
                msg.MessageBoxClose = callbackResult;
                msg.Show();
            }
            else {
                let oReturn = [];
                oReturn["LaunchCA"] = oReturn_sp['LaunchCA'];
                let returnScriptObject: ScriptObject = new ScriptObject();
                returnScriptObject.returnData = oReturn;
                this.GetPRGDAllergylaunch(returnScriptObject, menucode, EncOID, Enctype);
            }
        }
        else {
            let oReturn = [];
            oReturn["LaunchCA"] = menucode;
            let returnScriptObject: ScriptObject = new ScriptObject();
            returnScriptObject.returnData = oReturn;
            this.GetPRGDAllergylaunch(returnScriptObject, menucode, EncOID, Enctype);
        }
    }
    GetPRGDAllergylaunch(resData, MenuCode, EncounterOid, EncounterType) {
        let Allergylaunch = ObjectHelper.CreateType<ScriptObject>(resData, ScriptObject);
        let CONFALRGY: string = "MN_HI_CONFALRGY";
        if (Allergylaunch != null && Allergylaunch.GetProperty("LaunchCA") != null && !String.IsNullOrEmpty(Allergylaunch.GetProperty("LaunchCA").ToString())) {
            let Launch: string = String.Empty;
            Launch = Allergylaunch.GetProperty("LaunchCA").ToString();
           if (Launch == CONFALRGY) {
               this.LaunchAllergy(CONFALRGY, MenuCode);
           }
           else if (Launch == MenuCode) {
               this.RecordPGDLaunch();
           }
        else {
            this.RecordPGDLaunch();
            }
        }
    }
    messageBoxClose(sender:object, e: MessageEventArgs) {
        //console.log("messageEventArgs callback ", e, e.MessageBoxResult);
        if (e.MessageBoxResult == MessageBoxResult.No) {
            return;
        }
        if (e.MessageBoxResult == MessageBoxResult.Yes) {
            this.RecordPGDLaunch();
        }
    }
    public GetLatestActiveEncounter(): Encounter {
        let oEnc = this.objInfusionChartVM.oEncList.Where(x => x.EndDate == DateTime.MinValue).OrderByDescending(x => x.StartDate).Select(x => x);
        let oLatestEnc: Encounter = null;
        if (oEnc != null && oEnc.Count() > 0) {
            oLatestEnc = oEnc.FirstOrDefault();
        }
        return oLatestEnc;
    }
    public LaunchAllergy(code: string, menucode: string): void {
        let sArgs: string = "&ENCOUNTEROID=" + PatientContext.EncounterOid.ToString();
        this.oMedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
        this.oMedicationAdminVM.sLastCACode = code;
        this.oMedicationAdminVM.Menucodeallergy = menucode;
        this.oMedicationAdminVM.IsRecordPGDLaunchedFromInfusionChart = true;
        this.oMedicationAdminVM.RecAllergyCallback = ()=>this.RecordPGDLaunch();
        this.oMedicationAdminVM.LaunchWizard(code, sArgs);
        if (String.Equals(menucode, "MN_RECORDPGD_P2", StringComparison.CurrentCultureIgnoreCase)) {
            Busyindicator.SetStatusIdle("RecordPgd");
        }
    }
    public RecordPGDLaunch(): void {
        this.objRecordPGD = new RecordPGD();
        this.objRecordPGD.constructorImpl(MedChartData.MedChartOID);
        this.objRecordPGD.DataContext = this.objpgdadminstrationvm;
        this.objRecordPGD.oDrugItem = new DrugItem();
        this.objRecordPGD.oHdrAddnlInfo = new CDrugHdrAddnlInfo();
        this.objRecordPGD.oDrugItem.DoseLabel = MedsAdminChartToolTip.DoseText;
        this.objRecordPGD.oDrugItem.RouteLabel = MedsAdminChartToolTip.ROUTEText;
        this.objRecordPGD.oDrugItem.Route = " ";
        this.objRecordPGD.drgHeader = new DrugHeader();
        this.objRecordPGD.drgHeader.oDrugHeader = new CDrugHeader();
        this.objRecordPGD.drgHeader.oDrugHeader.oDrugHdrBasicInfo = new DrugHeaderItem();
        this.objRecordPGD.drgHeader.oDrugHeader.oDrugHdrBasicInfo.bShowFrequency = false;
        this.objRecordPGD.drgHeader.oDrugHeader.oDrugHdrBasicInfo.bShowSite = false;
        this.objRecordPGD.drgHeader.oDrugHeader.oDrugHdrBasicInfo.bShowAsrequired = false;
        this.objRecordPGD.drgHeader.DataContext = Common.SetDrugHeaderContent(this.objRecordPGD.oDrugItem, this.objRecordPGD.oHdrAddnlInfo, this.objRecordPGD.drgHeader);
         AppActivity.OpenWindow("Record PGD administration", this.objRecordPGD, (e)=>this.objRecordPGD_Closed(e), "Record patient group directive administration", true, 700, 1050, true, WindowButtonType.OkCancel, null);
    }
    objpgdadminstrationvm_IsPGDListAvailableEvent(IsPGDListAvailable: boolean): void {
        if (IsPGDListAvailable) {
            let bIsOpenSecExistPGD: boolean = false;
            let objIsOpenSecExists: ScriptObject = ObjectHelper.CreateType<ScriptObject>(HtmlPage.Window.Invoke("IsOpenSecExist", null, null, 5), ScriptObject);
            let sSecMessage: string = String.Empty;
            if (objIsOpenSecExists != null && objIsOpenSecExists.GetProperty("IsOpenSecExists") != null && !String.IsNullOrEmpty(objIsOpenSecExists.GetProperty("IsOpenSecExists").ToString())) {
                bIsOpenSecExistPGD = Convert.ToBoolean(objIsOpenSecExists.GetProperty("IsOpenSecExists").ToString());
            }
            if (bIsOpenSecExistPGD) {
                sSecMessage = String.Format(Resource.MedsAdminChartToolTip.IsOpenSectionPGDToolTip, bIsOpenSecExistPGD);
                this.msg = new iMessageBox();
                this.msg.Title = "Lorenzo";
                this.msg.MessageButton = MessageBoxButton.OK;
                this.msg.MessageBoxClose = (s, e) => { this.RecordPgdLaunch_MessageBoxClose(s, e); };
                this.msg.Message = sSecMessage;
                this.msg.Show();
            }
            if (!bIsOpenSecExistPGD) {
                this.RecordPGDOrAllergyLaunch();
            }
        }
        else {
            this.msg = new iMessageBox();
            this.msg.Title = "Lorenzo";
            this.msg.MessageButton = MessageBoxButton.OK;
            this.msg.Message = "No medication available for administration under PGD";
            this.msg.Show();
            Busyindicator.SetStatusIdle("RecordPgd");
        }
    }
    RecordPgdLaunch_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        this.RecordPGDOrAllergyLaunch();
    }
    objRecordPGD_Closed(args: AppDialogEventargs): void {
        this.objRecordPGD = args.Content.Component;
        this.objpgdadminvm = ObjectHelper.CreateType<PGDAdminstrationVM>(this.objRecordPGD.DataContext, PGDAdminstrationVM);
        if (args.Result == AppDialogResult.Ok) {
            let bdialogresult: boolean = this.objRecordPGD.cmdOkClick();
            if (bdialogresult) {
                args.AppChildWindow.DialogResult = true;
            }
        }
        else if (args.Result == AppDialogResult.Cancel) {
            args.AppChildWindow.DialogResult = false;
            this.objRecordPGD.dupDialogRef.close();
        }
        this.objpgdadminstrationvm.CheckRecordPGDEvent = null;
        this.objpgdadminstrationvm.CheckRecordPGDEvent = (s, e, p) => { this.objpgdadminstrationvm_CheckRecordPGDEvent(s, e, p); };
        Busyindicator.SetStatusIdle("RecordPgd");
    }

    isPGDRefreshedRequired : boolean = false;
    objpgdadminstrationvm_CheckRecordPGDEvent(IsRecorded: boolean, oCResMsgRecordPGD: CResMsgRecordPGD, IsSingleActionChecked: boolean): void {
        if (IsRecorded) {
            if (!IsSingleActionChecked) {
                let oFauxTab: iTab = (ObjectHelper.CreateType<iTabItem>(this.Parent, iTabItem)) != null ? ObjectHelper.CreateType<iTab>((ObjectHelper.CreateType<iTabItem>(this.Parent, iTabItem)).Parent, iTab) : null;
                if (oFauxTab != null) {
                    let oFauxTabItem: iTabItem = oFauxTab.GetItem(CConstants.sTabInfusionKey);
                    if (oFauxTabItem instanceof iTabItem && oFauxTabItem.Key == CConstants.sTabInfusionKey) {
                        oFauxTab.Click(oFauxTabItem.Key, true);
                        this.isPGDRefreshedRequired = true;                        
                        setTimeout(() => {
                            Busyindicator.SetStatusBusy("InfusionChart");
                            this.objInfusionChartVM_OnPropertyChanged();
                        }, 500);      
                    }
                }
            }
            else {
                this.EnableDisableTabItemByKey(CConstants.sTabChartKey, true);
                this.EnableDisableTabItemByKey(CConstants.sTabInfusionKey, true);
                this.SetDefaultTabByKey(CConstants.sTabChartKey);
            }
        }
    }
    InitializeInfusionChart(): void {
        if (this.InfusionChartControl != null && this.LayoutRoot.Children.Contains(this.InfusionChartControl))
            this.LayoutRoot.Children.Remove(this.InfusionChartControl);
        //  this.InfusionChartControl = new iInfusionChart();
        this.LayoutRoot.Children.Clear();
        Grid.SetColumn(this.InfusionChartControl, 0);
        //revist throwing error this.LayoutRoot.SetColumnSpan(this.InfusionChartControl, 2);
        Grid.SetRow(this.InfusionChartControl, 3);
        this.LayoutRoot.Children.Add(this.InfusionChartControl);
        this.SetInfusionChartParams();
        this.InfusionChartControl.AutoGenerateColumn = true;
        //  this.InfusionChartControl.SetBinding('ChartRows',this.InfusionChartControl.ChartRows);

        // revisit actual code need to revisit
        //  this.InfusionChartControl.SetBinding(iInfusionChart.ChartRowsProperty, ObjectHelper.CreateObject(new Binding("oChartRows"), { Mode: BindingMode.OneWay }));

        //this.InfusionChartControl.OnChartHotSpotClick -= this.OnChartHotSpotClickEvent;
        this.InfusionChartControl.OnChartHotSpotClick = (s, e) => { this.OnChartHotSpotClickEvent(s, e); };
        //this.InfusionChartControl.OnDrugHotSpotClick -= this.OnDrugHotSpotClickEvent;
        this.InfusionChartControl.OnDrugHotSpotClick = (s, e) => { this.OnDrugHotSpotClickEvent(s, e); };
        //this.InfusionChartControl.OnPreviousClick -= this.OnPreviousClickEvent;
        this.InfusionChartControl.OnPreviousClick = (s, e) => { this.OnPreviousClickEvent(s, e); };
        //this.InfusionChartControl.OnNextClick -= this.OnNextClickEvent;
        this.InfusionChartControl.OnNextClick = (s, e) => { this.OnNextClickEvent(s, e); };
        //this.InfusionChartControl.OnNextClickComplete -= this.OnNextClickCompleteEvent;
        this.InfusionChartControl.OnNextClickComplete = (s, e) => { this.OnNextClickCompleteEvent(s, e); };
        //this.InfusionChartControl.OnPreviousClickComplete -= this.OnPreviousClickCompleteEvent;
        this.InfusionChartControl.OnPreviousClickComplete = (s, e) => { this.OnPreviousClickCompleteEvent(s, e); };
        //this.InfusionChartControl.OnErrorLog -= this.OnErrorEvent;
        this.InfusionChartControl.OnErrorLog = (s, e) => { this.OnErrorEvent(s, e); };
    }
    InfusionChartControl_OnPreviousClickComplete(sender: Object, e: RoutedEventArgs): void {
        this.objInfusionChartVM.GetInfusionChartData(this.objInfusionChartVM.StartDTTM, this.objInfusionChartVM.EndDTTM, (this.objInfusionChartVM.CurrentPageView == 2 ? this.objInfusionChartVM.CurrentDTTM : DateTime.MinValue));
    }
    InfusionChartControl_OnNextClickComplete(sender: Object, e: RoutedEventArgs): void {
        this.objInfusionChartVM.GetInfusionChartData(this.objInfusionChartVM.StartDTTM, this.objInfusionChartVM.EndDTTM, (this.objInfusionChartVM.CurrentPageView == 2 ? this.objInfusionChartVM.CurrentDTTM : DateTime.MinValue));
    }
    private InfusionChartControl_OnNextClick(sender: Object, e: RoutedEventArgs): void {
        Busyindicator.SetStatusBusy("InfusionChart");
        this.objInfusionChartVM.NavDirection = InfusionChartVM.eDirection.Forward;
        this.SetInfusionChartParams();
        this.objInfusionChartVM.iSNextOrPrevButtonClicked = true;
        this.objInfusionChartVM.FillOriginalItemSequence(this.oResponseInfusionChart);
    }
    private InfusionChartControl_OnPreviousClick(sender: Object, e: RoutedEventArgs): void {
        Busyindicator.SetStatusBusy("InfusionChart");
        this.objInfusionChartVM.NavDirection = InfusionChartVM.eDirection.Backward;
        this.SetInfusionChartParams();
        this.objInfusionChartVM.iSNextOrPrevButtonClicked = true;
        this.objInfusionChartVM.FillOriginalItemSequence(this.oResponseInfusionChart);
    }
    HomeLeavemsgbox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.Yes) {
            let Tagobject: InfusionTagObject = ObjectHelper.CreateType<InfusionTagObject>(this.msg.Tag, InfusionTagObject);
            this.SlotClick(Tagobject);
        }
        else if (e.MessageBoxResult == MessageBoxResult.No) {
            if (this.objInfusionChartVM != null) {
                this.objInfusionChartVM.CurrentActivityCode = ActivityCode.None;
            }
            Busyindicator.SetStatusIdle("LaunchInfRecAdmin");
        }
    }
    private InfusionChartControl_OnChartHotSpotClick(sender: Object, TagObject: InfusionTagObject): void {
        if (this.objInfusionChartVM.CurrentActivityCode == ActivityCode.None) {
           
            if (!MedChartData.IsMedChartReadOnly) {
                if (Common.CheckIfLockingDurationElapsed(this.iMsgBox_MessageBoxClose)) {
                    return
                }
                Busyindicator.SetStatusBusy("LaunchInfRecAdmin");
                this.objInfusionChartVM.CurrentActivityCode = ActivityCode.RecordAdmin;
                let oINFRecordAdminParams: INFRecordAdminParams = ObjectHelper.CreateType<INFRecordAdminParams>(TagObject.oChartCell.Tag, INFRecordAdminParams);
                let oTagDrugHeaderdetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(TagObject.oDrugItem.Tag, TagDrugHeaderDetail);
                if (String.Compare(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0 && ((oINFRecordAdminParams != null && (oINFRecordAdminParams.SlotStatus.Equals(SlotStatus.PLANNED, StringComparison.InvariantCultureIgnoreCase) || oINFRecordAdminParams.SlotStatus.Equals(SlotStatus.HOMELEAVE, StringComparison.InvariantCultureIgnoreCase)) && !Common.IsRetrospectiveSlot(TagObject)) || (oINFRecordAdminParams == null && oTagDrugHeaderdetail != null && oTagDrugHeaderdetail.IsPRN && !oTagDrugHeaderdetail.IsPRNWithSchedule && DateTime.NotEquals(MedChartData.SuspendedOn, DateTime.MinValue) && DateTime.GreaterThanOrEqualTo(TagObject.oChartColumn.StartDateTime.Date, MedChartData.SuspendedOn.Date)))) {
                    this.msg = new iMessageBox();
                    this.msg.Title = "Lorenzo";
                    this.msg.MessageButton = MessageBoxButton.YesNo;
                    this.msg.IconType = MessageBoxType.Question;
                    this.msg.Tag = TagObject;
                    this.msg.Height = 160;
                    this.msg.Width = 400;
                    this.msg.MessageBoxClose = (s, e) => { this.HomeLeavemsgbox_MessageBoxClose(s, e); };
                    this.msg.Message = Resource.MedicationChart.HomeLeaveMsg;
                    this.msg.Show();
                }
                else {
                    this.SlotClick(TagObject);
                }
            }
        }
    }
    private SlotClick(TagObject: InfusionTagObject): void {
        if (TagObject != null)
            this.oClickedSlotTagObject = TagObject;
        this.IsConflictsErrorMsgExists = false;
        this.IsDiscontinuedErrorMsgExists = false;
        this.IsOutsideAdminTimeErrMsgExists = false;
        this.IsAnotherAdminDueErrMsgExists = false;
        this.IsCumulativeWarningAcknowledged = null;
        this.sParacetamolRecentlyAdministered = -1;
        this.IsInfusionAlertErrMsgExists = false;
        this.IsPreviousslotscheduledErrMsgExists = false;
        this.IsLockIconMsgExists = false;
        let FindRestroSlot;
        let oINFRecordAdminParams: INFRecordAdminParams = ObjectHelper.CreateType<INFRecordAdminParams>(this.oClickedSlotTagObject.oChartCell.Tag, INFRecordAdminParams);
        this.objInfusionChartVM.SlotPreviousStatus = (oINFRecordAdminParams != null) ? oINFRecordAdminParams.SlotStatus : String.Empty;
        if (TagObject != null && TagObject.oDrugItem != null && TagObject.oDrugItem.Tag != null && (<TagDrugHeaderDetail>(TagObject.oDrugItem.Tag)).IsPRN) {
            let oTagDrugHeaderdetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(TagObject.oDrugItem.Tag, TagDrugHeaderDetail);
            let RowIdx = this.InfusionChartControl.ChartRows.Where(c => c.DrugItem.Key == TagObject.oDrugItem.Key).Select(s => s.RowIndex).FirstOrDefault();
            if (RowIdx >= 0 && this.oResponseInfusionChart.InfusionChatView != null && this.oResponseInfusionChart.InfusionChatView.DrugDetail != null && this.oResponseInfusionChart.InfusionChatView.DrugDetail != null && TagObject != null && TagObject.oDrugItem != null && !String.IsNullOrEmpty(TagObject.oDrugItem.Key)) {
                let PresItemOID: number = Convert.ToInt64(TagObject.oDrugItem.Key);
                let lstDrugDetail = this.oResponseInfusionChart.InfusionChatView.DrugDetail.Where(c => c.DrugHeader.PrescriptionItemOID == PresItemOID).FirstOrDefault();      
                if (lstDrugDetail != null && lstDrugDetail.SlotDetails != null && lstDrugDetail.SlotDetails.Count > 0) {
                    // let FindRestroSlot: List<SlotDetail> = null;
                    if (oTagDrugHeaderdetail != null && !oTagDrugHeaderdetail.IsPRNWithSchedule) {
                        FindRestroSlot  = lstDrugDetail.SlotDetails.Where(oCuslotdetail => oCuslotdetail.Status != "CC_DELETED" && (oCuslotdetail.AdministrationDetail != null) && (oCuslotdetail.AdministrationDetail.AdministeredDate != DateTime.MinValue) && oCuslotdetail.AdministrationDetail.AdministeredDate > TagObject.oChartColumn.EndDateTime).Select(oCuslotdetail => oCuslotdetail);
                    }
                    else {
                        let FindRestroIsPRNWithSlot: SlotDetail = lstDrugDetail.SlotDetails.
                            Where(oCuslotdetail =>
                                (oCuslotdetail.Status == "CC_INPROGRESS" || oCuslotdetail.Status == "CC_RSSTOPPED" || oCuslotdetail.Status == "CC_COMPLETED")
                                && oCuslotdetail.OID != oINFRecordAdminParams.SlotOID
                                && (oCuslotdetail.AdministrationDetail != null)
                                && (oCuslotdetail.AdministrationDetail.AdministeredDate != DateTime.MinValue)
                                && oCuslotdetail.AdministrationDetail.AdministeredDate > TagObject.oChartColumn.EndDateTime)
                            .OrderByDescending(oCuslotdetail => oCuslotdetail.AdministrationDetail.AdministeredDate).FirstOrDefault();
                        if (FindRestroIsPRNWithSlot != null) {
                            FindRestroSlot = new List<SlotDetail>();
                            FindRestroSlot.Add(FindRestroIsPRNWithSlot);
                        }
                    }
                    if (FindRestroSlot != null && FindRestroSlot.arr.length > 0) {
                        this.IsRestrosPRN = true;
                    }
                    else this.IsRestrosPRN = false;
                }
                else this.IsRestrosPRN = false;
                if (oTagDrugHeaderdetail != null && (String.Compare(oTagDrugHeaderdetail.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase) == 0)) {
                    this.IsRestrosPRN = true;
                }
            }
            else this.IsRestrosPRN = false;
        }

        if (this.CheckValidation(TagObject)) {

            this.LaunchMezzanine(TagObject);
        }
        else {
            this.objInfusionChartVM.CurrentActivityCode = ActivityCode.None;
            Busyindicator.SetStatusIdle("LaunchInfRecAdmin");
        }
    }
    private InfusionChartControl_OnDrugHotSpotClick(sender: Object, TagObject: InfusionTagObject): void {
        let oChartIcon: ChartIcon = (<ChartIcon>((<FrameworkElement>(sender)).Tag));
        let DoseTypeCode: string = String.Empty;
        if (TagObject.oDrugItem != null && oChartIcon != null) {
            if (!String.IsNullOrEmpty(TagObject.oDrugItem.Key) && !String.IsNullOrEmpty(TagObject.oDrugItem.Drugname)) {
                if (!String.IsNullOrEmpty(oChartIcon.Key)) {
                    if (String.Compare(oChartIcon.Key, "Conflicts", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oChartIcon.Key, "SupplyInstructions", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oChartIcon.Key, "Conflict", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oChartIcon.Key, "Prescription", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oChartIcon.Key, "PGD", StringComparison.CurrentCultureIgnoreCase) == 0) {
                        let sHeight: string = String.Empty;
                        if (String.Compare(oChartIcon.Key, "PGD", StringComparison.CurrentCultureIgnoreCase) == 0)
                            sHeight = "650";
                            else sHeight = "650";
                        let oTagDrugDetail: TagDrugHeaderDetail = <TagDrugHeaderDetail>TagObject.oDrugItem.Tag;
                        let DoseCalcExist: string = '0';
                        if (TagObject.oDrugItem != null && TagObject.oDrugItem.DoseCalcIcon != null && !String.IsNullOrEmpty(TagObject.oDrugItem.DoseCalcIcon.UriString)) {
                            if (TagObject.oDrugItem.DoseCalcIcon.UriString.Contains(MedImages.DoseCalculatorWithAlert)) {
                                DoseCalcExist = '2';
                            }
                            else if (TagObject.oDrugItem.DoseCalcIcon.UriString.Contains(MedImages.DoseCalculator)) {
                                DoseCalcExist = '1';
                            }
                        }
                        this.objInfusionChartVM.LaunchPrescriptionDetails(Convert.ToInt64(TagObject.oDrugItem.Key), TagObject.oDrugItem.Drugname, sHeight, oChartIcon.Key, oTagDrugDetail.ItemSubType, oTagDrugDetail.LorenzoID, oTagDrugDetail.MCVersionNo, DoseCalcExist);
                    }
                    else if (String.Compare(oChartIcon.Key, "VariableDose", StringComparison.CurrentCultureIgnoreCase) == 0) {
                        let oTagDrugDetail: TagDrugHeaderDetail = <TagDrugHeaderDetail>TagObject.oDrugItem.Tag;
                        if (TagObject.oDrugItem.Tag != null && TagObject.oDrugItem.Tag instanceof TagDrugHeaderDetail) {
                            DoseTypeCode = (<TagDrugHeaderDetail>(TagObject.oDrugItem.Tag)).DoseType;
                            this.objInfusionChartVM.LaunchDoseTypeScreen(Convert.ToInt64(TagObject.oDrugItem.Key), TagObject.oDrugItem.Drugname, DoseTypeCode, oTagDrugDetail.INFTYCODE);
                        }
                    }
                    else if (String.Compare(oChartIcon.Key, "MultiComponent Drug", StringComparison.CurrentCultureIgnoreCase) == 0) {
                        if (!String.IsNullOrEmpty(TagObject.oDrugItem.Key)) {
                            let oTagDrugHeaderDetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(TagObject.oDrugItem.Tag, TagDrugHeaderDetail);
                            this.objInfusionChartVM.LaunchMultiComponentItemDetails(Convert.ToInt64(TagObject.oDrugItem.Key), oTagDrugHeaderDetail.DrugName);
                        }
                    }
                    else if (String.Compare(oChartIcon.Key, "IsDoseCalculatedByDC", StringComparison.CurrentCultureIgnoreCase) == 0) {
                        let oTagDrugDetail: TagDrugHeaderDetail = <TagDrugHeaderDetail>TagObject.oDrugItem.Tag;
                        this.LaunchDosecalciDetails(Convert.ToInt64(TagObject.oDrugItem.Key), TagObject.oDrugItem.Drugname);
                    }
                    else if (String.Compare(oChartIcon.Key, "SequenceLink", StringComparison.CurrentCultureIgnoreCase) == 0) {
                        let oTagDrugDetail: TagDrugHeaderDetail = <TagDrugHeaderDetail>TagObject.oDrugItem.Tag;
                        this.LaunchSequentialDetails(Convert.ToInt32(oTagDrugDetail.InfusionGroupSequenceNo));
                    }
                }
            }
        }
    }
    LaunchSequentialDetails(GroupSeqNo: number): void {
        Busyindicator.SetStatusBusy("LaunchSeqMez");
        that = this;
        this.lGroupSeqNo = GroupSeqNo;
        this.FillPrescriptions();
    }
    public FillPrescriptions(): void {
        if (PatientContext.EncounterOid > 0) {
            let nCurrentEncounterOID: number = PatientContext.EncounterOid;
            this.objCommPrescriptionItemViewVM = new CommPrescriptionItemViewVM();
            this.objCommPrescriptionItemViewVM.GetPatientMedications(PrescriptionTypes.ForAdministration, '7', ChartContext.EncounterOID > 0 ? ChartContext.EncounterOID : nCurrentEncounterOID);
            this.objCommPrescriptionItemViewVM.GetMedicationsEvent = (s, e) => { this.CommPrescriptionItemViewVM_GetMedicationsEvent(s); };
        }
    }
    CommPrescriptionItemViewVM_GetMedicationsEvent(PresItemDetails: CommPrescriptionItemViewVM): void {
        if (PresItemDetails != null && PresItemDetails.MedsResolve != null && this.lGroupSeqNo > 0) {
            //To be Re-Visited.
             CCommSequentialHelper.LaunchItemsInSequenceMezzanine(PresItemDetails.MedsResolve, this.lGroupSeqNo, this.OnSequentialMezzanineClosed);
            return
        }
    }
    OnSequentialMezzanineClosed(args: AppDialogEventargs): void {
       that.lGroupSeqNo = 0;
        //this.objCommPrescriptionItemViewVM.GetMedicationsEvent -= CommPrescriptionItemViewVM_GetMedicationsEvent;
        Busyindicator.SetStatusIdle("LaunchSeqMez");
        // ObjectHelper.stopFinishAndCancelEvent(false);
        if (args != null && args.AppChildWindow != null)
            args.AppChildWindow.DialogResult = true;
    }
    objInfusionChartVM_OnGetInfusionChartData(oRes: CResMsgGetInfusionChart): void {
        //   this.InfusionChartControl = new iInfusionChart();
        if (this.InfusionChartControl.ChartRows != null && this.InfusionChartControl.ChartRows.Count > 0){
            this.InfusionChartControl.ChartRows.Clear();
        }
     
        this.objInfusionChartHelper.LoadInfusionChart(this.InfusionChartControl, oRes);
        MedChartData.InfusionItemCount = (oRes != null && oRes.InfusionChatView != null) ? oRes.InfusionChatView.InfusionItemCount : 0;
        if (oRes.InfusionChatView != null)
            this.oResponseInfusionChart = oRes;
        if (!this.isPGDRefreshedRequired) {
            if (ProfileData.InfusionPresConfig != null && ProfileData.InfusionPresConfig.IsEnablePrescInfus && (String.Compare(MedChartData.ChartStatus, CConstants.sChartActiveStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0)) {
                if (MedChartData.NonInfusionItemCount > 0 || MedChartData.InfusionItemCount > 0) {
                    this.EnableDisableTabItemByKey(CConstants.sTabChartOverViewKey, true);
                }
                if (MedChartData.NonInfusionItemCount <= 0 && MedChartData.InfusionItemCount <= 0) {
                    this.EnableDisableTabItemByKey(CConstants.sTabChartKey, true);
                    this.EnableDisableTabItemByKey(CConstants.sTabInfusionKey, false);
                    this.EnableDisableTabItemByKey(CConstants.sTabChartOverViewKey, false);
                    // commented to fix the switching b/w the tabs
                    this.SetDefaultTabByKey(CConstants.sTabChartKey);
                }
                else if (MedChartData.NonInfusionItemCount > 0 && MedChartData.InfusionItemCount <= 0) {
                    this.EnableDisableTabItemByKey(CConstants.sTabInfusionKey, false);
                    this.EnableDisableTabItemByKey(CConstants.sTabChartKey, true);
                    this.SetDefaultTabByKey(CConstants.sTabChartKey);
                }
                else if (MedChartData.NonInfusionItemCount <= 0 && MedChartData.InfusionItemCount > 0) {
                    this.EnableDisableTabItemByKey(CConstants.sTabChartKey, false);
                    this.EnableDisableTabItemByKey(CConstants.sTabInfusionKey, true);
                    this.SetDefaultTabByKey(CConstants.sTabInfusionKey);
                }
                else if (MedChartData.NonInfusionItemCount > 0 && MedChartData.InfusionItemCount > 0) {
                    this.EnableDisableTabItemByKey(CConstants.sTabChartKey, true);
                    this.EnableDisableTabItemByKey(CConstants.sTabInfusionKey, true);
                    if (!this.objInfusionChartVM.isPrescribeLinkClicked)
                        this.SetDefaultTabByKey(CConstants.sTabInfusionKey);
                }
            }
        }
        else{
        this.isPGDRefreshedRequired = false;
        }
        this.objInfusionChartVM.isPrescribeLinkClicked = false;
        if (MedChartData.IsAuthoriseDrugAval) {
            this.lblAuthoriseNotifier.Visibility = Visibility.Visible;
        }
        else {
            this.lblAuthoriseNotifier.Visibility = Visibility.Collapsed;
        }
        let DSTDatetime: DateTime = Common.DSTTimeInChart(this.objInfusionChartVM.StartDTTM, this.objInfusionChartVM.EndDTTM, ChartType.Infusion_Chart);
        if (DateTime.NotEquals(DSTDatetime , DateTime.MinValue)) {
            this.lblDSTClockNotifier.Visibility = Visibility.Visible;
            this.lblDSTClockNotifier.Text = String.Format(Resource.MedicationAdministrator.DSTTimeClockChange_text, DSTDatetime.ToString(CConstants.ShortDateFormat));
        }
        else {
            this.lblDSTClockNotifier.Visibility = Visibility.Collapsed;
        }
        if (!String.IsNullOrEmpty(MedChartData.RefreshTriggeredCACode)) {
            if (String.Equals(MedChartData.RefreshTriggeredCACode, "MN_MEDINPATSL_P2", StringComparison.InvariantCultureIgnoreCase)) {
                let oMedsAdminMainView: MedsAdminMainView = GetMedsChartData.GetMedAdminMainViewTab(this);
                if (oMedsAdminMainView != null) {
                    oMedsAdminMainView.DrawAlertIconNextToOverviewTab();
                }
            }
            MedChartData.RefreshTriggeredCACode = String.Empty;
        }
    }

    private EnableDisableTabItemByKey(sKey: string, IsEnabled: boolean): void {
        //revisit
        let oFauxTab: iTab = ObjectHelper.CreateType<iTab>((ObjectHelper.CreateType<iTabItem>(this.Parent, iTabItem))?.Parent, iTab);
        if (oFauxTab !== undefined) {
            let oFauxTabItem: iTabItem = oFauxTab.GetItem(sKey);
            if (oFauxTabItem instanceof iTabItem && oFauxTabItem.Key == sKey) {
                oFauxTabItem.IsEnabled = IsEnabled;
            }
        }
    }
    private SetDefaultTabByKey(sKey: string): void {
        //revisit
        let oFauxTab: iTab = ObjectHelper.CreateType<iTab>((ObjectHelper.CreateType<iTabItem>(this.Parent, iTabItem))?.Parent, iTab);
        if (oFauxTab !== undefined) {
            if (oFauxTab.SelectedKey != sKey) {
                let oFauxTabItem: iTabItem = oFauxTab.GetItem(sKey);
                if (oFauxTabItem != null) {
                    oFauxTab.Click(oFauxTabItem.Key, true);
                }
            }
        }
    }
    objInfusionChartHelper_OnInfusionChartLoadCompleted(IsInfusionAlertExists: boolean): void {
        this.RefreshFauxTabAlertIcons(IsInfusionAlertExists);
    }
    private SetInfusionChartParams(): void {
        if (this.InfusionChartControl != null && this.InfusionChartControl.ChartRows != null) {
            this.InfusionChartControl.ChartRows.Clear();
        }
        this.objInfusionChartVM.SetCurrentDTTM();
        this.InfusionChartControl.StartDate = this.objInfusionChartVM.StartDTTM;
        this.InfusionChartControl.EndDate = this.objInfusionChartVM.EndDTTM;
        this.InfusionChartControl.CurrentDateTime = this.objInfusionChartVM.CurrentDTTM;
        this.InfusionChartControl.ChartInterval = new TimeSpan(0, 2, 0, 0, 0);
        this.InfusionChartControl.DrugHeaderText = "Drug details";
        let DSTDatetime: DateTime = Common.DSTTimeInChart(this.objInfusionChartVM.StartDTTM, this.objInfusionChartVM.EndDTTM, ChartType.Infusion_Chart);
        if (DateTime.NotEquals(this.InfusionChartControl.StartDate.Date , this.InfusionChartControl.EndDate.Date)) {
            if (DateTime.NotEquals(DSTDatetime , DateTime.MinValue) && DateTime.Equals(DSTDatetime.Date , this.InfusionChartControl.StartDate.Date)) {
                this.InfusionChartControl.Timeheader = Common.Asterisk + this.InfusionChartControl.StartDate.DateTime.ToString(CConstants.InfusionchartDateFormat) + " - " + this.InfusionChartControl.EndDate.DateTime.ToString(CConstants.InfusionchartDateFormat);
            }
            else if (DateTime.NotEquals(DSTDatetime , DateTime.MinValue) && DateTime.Equals(DSTDatetime.Date , this.InfusionChartControl.EndDate.Date)) {
                this.InfusionChartControl.Timeheader = this.InfusionChartControl.StartDate.DateTime.ToString(CConstants.InfusionchartDateFormat) + " - " + Common.Asterisk + this.InfusionChartControl.EndDate.DateTime.ToString(CConstants.InfusionchartDateFormat);
            }
            else {
                this.InfusionChartControl.Timeheader = this.InfusionChartControl.StartDate.DateTime.ToString(CConstants.InfusionchartDateFormat) + " - " + this.InfusionChartControl.EndDate.DateTime.ToString(CConstants.InfusionchartDateFormat);
            }
        }
        else {
            this.InfusionChartControl.Timeheader = String.Empty;
            if (DateTime.NotEquals(DSTDatetime , DateTime.MinValue)) {
                this.InfusionChartControl.Timeheader = Common.Asterisk;
            }
            this.InfusionChartControl.Timeheader += this.InfusionChartControl.StartDate.ToString(CConstants.InfusionchartDateFormat);
        }
        if (DateTime.LessThanOrEqualTo(this.objInfusionChartVM.StartDTTM , this.objInfusionChartVM.InfChartViewMinStartTime)) {
            this.InfusionChartControl.EnablePreviousButton = false;
        }
        else {
            this.InfusionChartControl.EnablePreviousButton = true;
        }
        if (DateTime.GreaterThanOrEqualTo(this.objInfusionChartVM.StartDTTM , this.objInfusionChartVM.InfChartViewMaxStartTime)) {
            this.InfusionChartControl.EnableNextButton = false;
        }
        else {
            this.InfusionChartControl.EnableNextButton = true;
        }
    }
    public OnInfRecordAdminFinish(objRes: SlotDetail, eAppDialogResult: AppDialogResult): void {
        let oResSlotDetail: SlotDetail = objRes;
        let isConflictAlertIconExists: boolean = false;
        if (eAppDialogResult == AppDialogResult.Ok && oResSlotDetail != null) {
            // ObjectHelper.stopFinishAndCancelEvent(false);
            let oTagDrugHeaderDetail: TagDrugHeaderDetail = (this.oClickedSlotTagObject != null && this.oClickedSlotTagObject.oDrugItem != null) ? ObjectHelper.CreateType<TagDrugHeaderDetail>(this.oClickedSlotTagObject.oDrugItem.Tag, TagDrugHeaderDetail) : null;
            if (oTagDrugHeaderDetail != null) {
                if (this._previousAlertStatus != null && this._previousAlertStatus.Count > 0) {
                    this._previousAlertStatus.Clear();
                }
                if (oTagDrugHeaderDetail.InfChartAlerts != null && oTagDrugHeaderDetail.InfChartAlerts.Count > 0) {
                    if (this._previousAlertStatus == null) {
                        this._previousAlertStatus = new ObservableCollection<string>();
                    }
                    let nAlertCount: number = oTagDrugHeaderDetail.InfChartAlerts.Count;
                    for (let i: number = 0; i < nAlertCount; i++) {
                        this._previousAlertStatus.Add(oTagDrugHeaderDetail.InfChartAlerts[i]);
                    }
                }
                oTagDrugHeaderDetail.PreviousPrescriptionItemStatus = oTagDrugHeaderDetail.PrescriptionItemStatus != null ? oTagDrugHeaderDetail.PrescriptionItemStatus : String.Empty;
            }
            if (((String.Equals(oTagDrugHeaderDetail.INFTYCODE, InfusionTypesCode.CONTINUOUS) || String.Equals(oTagDrugHeaderDetail.INFTYCODE, InfusionTypesCode.FLUID) || String.Equals(oTagDrugHeaderDetail.INFTYCODE, InfusionTypesCode.SINGLEDOSEVOLUME)) && oTagDrugHeaderDetail.ParentPrescriptionItemOID > 0 && oTagDrugHeaderDetail.InfusionSeqOrder > 0 && oResSlotDetail.AdministrationDetail != null && (oResSlotDetail.AdministrationDetail.StrikeoutAction == InfStrikeOutType.EntireAdmin || oResSlotDetail.AdministrationDetail.StrikeoutAction == CConstants.ACTIONSTOP || oResSlotDetail.AdministrationDetail.StrikeoutAction == CConstants.ACTIONCOMPLETE || oResSlotDetail.AdministrationDetail.StrikeoutAction == "CC_COMPLETE")) || ((oResSlotDetail.Status == SlotStatus.NOTGIVEN || oResSlotDetail.Status == SlotStatus.STOPPED || oResSlotDetail.Status == SlotStatus.COMPLETED) && (oTagDrugHeaderDetail.InfusionRecordAdminTypeCode == InfusionRecordAdminTypeCodes.AmendmentAlertAdministration || oTagDrugHeaderDetail.InfusionRecordAdminTypeCode == InfusionRecordAdminTypeCodes.ContinuousSequentialAdministration))) {
                if (this.oClickedSlotTagObject != null && this.oClickedSlotTagObject.oInfusionChartRow != null) {
                    this.InfusionChartControl.InvokeInfusionDetectChange();
                }
                this.SetInfusionChartParams();
                this.objInfusionChartVM.GetInfusionChartData(this.objInfusionChartVM.StartDTTM, this.objInfusionChartVM.EndDTTM, this.objInfusionChartVM.CurrentDTTM);
            }
            else {
                if (this.InfusionChartControl.ChartRows != null) {
                    let oCurrentRow: InfusionChartRow = new InfusionChartRow();
                    let RowIndex: number = null;
                    if (this.oClickedSlotTagObject != null && this.oClickedSlotTagObject.oInfusionChartRow != null) {
                        RowIndex = this.oClickedSlotTagObject.oInfusionChartRow.RowIndex;
                        if (RowIndex != null) {
                            this.objInfusionChartVM.UpdateSummaryBar(oResSlotDetail, true);
                            oCurrentRow = this.InfusionChartControl.ChartRows.Where(c => c.RowIndex == RowIndex).Select(s => s).FirstOrDefault();
                            this.CheckWhetherAlertStillExistsOnRefresh(oCurrentRow, oResSlotDetail);
                            let isAsRequiredLockIconExists: boolean = false;
                            let isCumulativeParacetomalExists: boolean = false;
                            if (oResSlotDetail.OID > 0 && this.oResponseInfusionChart != null && this.oResponseInfusionChart.InfusionChatView != null && this.oResponseInfusionChart.InfusionChatView.DrugDetail != null && this.oResponseInfusionChart.InfusionChatView.DrugDetail.Count > 0) {
                                let iTotalCount: number = this.oResponseInfusionChart.InfusionChatView.DrugDetail != null ? this.oResponseInfusionChart.InfusionChatView.DrugDetail.Count : 0;
                                for (let i: number = 0; i < iTotalCount; i++) {
                                    if (this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.PrescriptionItemOID == oTagDrugHeaderDetail.PrescriptionItemOID) {
                                        if (oTagDrugHeaderDetail.IsPRN) {
                                            if (this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails == null) {
                                                this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails = new ObservableCollection<SlotDetail>();
                                                this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails.Add(oResSlotDetail);
                                            }
                                            else {
                                                let isNewPRNAdministered: boolean = false;
                                                let oPRNNewSlotAdded = this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails.Where(oItem => oItem.OID == oResSlotDetail.OID);
                                                if (oPRNNewSlotAdded != null && oPRNNewSlotAdded.Count() > 0)
                                                    isNewPRNAdministered = true;
                                                if (!isNewPRNAdministered)
                                                    this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails.Add(oResSlotDetail);
                                            }
                                        }
                                        let modifiedSlot: SlotDetail = this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails.Where(oItem => oItem.OID == oResSlotDetail.OID).FirstOrDefault();
                                        if (modifiedSlot != null) {
                                            let slotToUpdate: number = this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails.IndexOf(modifiedSlot);
                                            this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails.RemoveAt(slotToUpdate);
                                            this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails.Insert(slotToUpdate,oResSlotDetail);
                                           // richa this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails[slotToUpdate] = oResSlotDetail;
                                        }
                                        if (this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails != null && this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails.Count > 0)
                                            this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails = new ObservableCollection<SlotDetail>(this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails.OrderBy(oItem => (oItem.AdministrationDetail != null && DateTime.NotEquals(oItem.AdministrationDetail.AdministeredDate , DateTime.MinValue)) ? oItem.AdministrationDetail.AdministeredDate : oItem.ScheduledDTTM).Select(c => c));
                                        this.ClearInfusionChartRow(oCurrentRow);
                                        if (this.objInfusionChartHelper != null && oCurrentRow != null && oCurrentRow.InfusionChartCells != null && oCurrentRow.InfusionChartCells.Count > 0) {
                                            let oCellIndex: number = this.objInfusionChartHelper.FindCellIndexByTime(this.objInfusionChartVM.CurrentDTTM);
                                            if (oCellIndex > -1) {
                                                let oInfusionChartCell: InfusionChartCell = oCurrentRow.InfusionChartCells[oCellIndex];
                                                if (oInfusionChartCell != null && oInfusionChartCell.AlertIcons != null && oInfusionChartCell.AlertIcons.Count > 0) {
                                                    let oINFRecordAdminParams: INFRecordAdminParams = ObjectHelper.CreateType<INFRecordAdminParams>(oInfusionChartCell.Tag, INFRecordAdminParams);
                                                    if (oINFRecordAdminParams != null && oINFRecordAdminParams.SlotOID == oResSlotDetail.OID) {
                                                        oINFRecordAdminParams.SlotStatus = !String.IsNullOrEmpty(oResSlotDetail.Status) ? oResSlotDetail.Status : String.Empty;
                                                        oINFRecordAdminParams.ScheduledDTTM = DateTime.NotEquals(oResSlotDetail.ScheduledDTTM , DateTime.MinValue ) ? oResSlotDetail.ScheduledDTTM : DateTime.MinValue;
                                                        oInfusionChartCell.Tag = oINFRecordAdminParams;
                                                    }
                                                }
                                            }
                                        }
                                        if (oTagDrugHeaderDetail.IsPRNWithSchedule)
                                            oResSlotDetail.IsNextDoseAllowedForPRN = oTagDrugHeaderDetail.IsPRNWithSchedule;
                                        if (this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.IsPRN && this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails != null && this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails.Count > 0) {
                                            let IsInprogressOrPausedExists = this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails.Where(c => (String.Equals(c.Status, SlotStatus.INPROGRESS, StringComparison.CurrentCultureIgnoreCase) || String.Equals(c.Status, SlotStatus.PAUSED, StringComparison.CurrentCultureIgnoreCase)));
                                            if (IsInprogressOrPausedExists != null && IsInprogressOrPausedExists.Count() > 0) {
                                                isConflictAlertIconExists = true;
                                            }
                                        }
                                        else if (this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails != null && this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails.Count > 0) {
                                            let oInprogressItemSlots = this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails.Where(c => (String.Equals(c.Status, SlotStatus.DUENOW, StringComparison.CurrentCultureIgnoreCase) || String.Equals(c.Status, SlotStatus.OVERDUE, StringComparison.CurrentCultureIgnoreCase) || String.Equals(c.Status, SlotStatus.NOTYETRECORDED, StringComparison.CurrentCultureIgnoreCase)));
                                            if (!(oInprogressItemSlots != null && oInprogressItemSlots.Count() > 0)) {
                                                isConflictAlertIconExists = true;
                                            }
                                        }
                                        let jTotalCount: number = this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails != null ? this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails.Count : 0;
                                        for (let j: number = 0; j < jTotalCount; j++) {
                                            if (this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails[j].OID == oResSlotDetail.OID){
                                                // this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails.RemoveAt(j);
                                                // this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails.Insert(j,oResSlotDetail);
                                               this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails[j] = oResSlotDetail;
                                            }
                                            if (!isAsRequiredLockIconExists && oTagDrugHeaderDetail.IsPRN && !oResSlotDetail.IsNextDoseAllowedForPRN) {
                                                isAsRequiredLockIconExists = true;
                                                this.objInfusionChartHelper.PlotAsRequiredLockIcon(oCurrentRow, this.objInfusionChartVM.CurrentDTTM);
                                            }
                                            if (String.Equals(oTagDrugHeaderDetail.INFTYCODE, InfusionTypesCode.CONTINUOUS) && oResSlotDetail.AdministrationDetail != null && (!String.IsNullOrEmpty(oResSlotDetail.PrescriptionItemStatus) && !String.Equals(oResSlotDetail.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase) && !String.Equals(oResSlotDetail.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase)) && !String.IsNullOrEmpty(oTagDrugHeaderDetail.InfusionPeriod) && Number.Parse(oTagDrugHeaderDetail.InfusionPeriod) > 0 && DateTime.NotEquals(oResSlotDetail.AdministrationDetail.InfusionEndDate , DateTime.MinValue) && DateTime.LessThan(oResSlotDetail.AdministrationDetail.InfusionEndDate , DateTime.Now)) {
                                                if (this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.InfChartAlerts == null) {
                                                    this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.InfChartAlerts = new ArrayOfString();
                                                }
                                                if (!this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.InfChartAlerts.Any(s => s.Equals(InfChartAlert.INFUSION_PERIOD_COMPLETED_ALERT))) {
                                                    this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.InfChartAlerts.Add(InfChartAlert.INFUSION_PERIOD_COMPLETED_ALERT);
                                                    this.objInfusionChartHelper.PlotAlertIcon(this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.InfChartAlerts, oCurrentRow, this.objInfusionChartVM.CurrentDTTM, oResSlotDetail);
                                                }
                                                this.RefreshFauxTabAlertIcons(true);
                                            }
                                            if (this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.IsPRN) {
                                                if (this.objInfusionChartVM.IsParaIngDrug && this.objInfusionChartVM.ParacetamolAdminCount > 3 && !isCumulativeParacetomalExists) {
                                                    isCumulativeParacetomalExists = true;
                                                    let oCell: InfusionChartCell;
                                                    let oCellIndex: number = this.objInfusionChartHelper.FindCellIndexByTime(this.objInfusionChartVM.CurrentDTTM);
                                                    if (oCellIndex > -1 && oCurrentRow.InfusionChartCells != null) {
                                                        oCell = oCurrentRow.InfusionChartCells[oCellIndex];
                                                        oCell.AlertIcons.Add(this.objInfusionChartHelper.CheckAndSetCumulativeIcon());
                                                    }
                                                }
                                            }
                                            let oChartCell: InfusionChartCell;
                                            let oCellIdx: number = this.objInfusionChartHelper.FindCellIndexByTime(this.objInfusionChartVM.CurrentDTTM);
                                            if (!isConflictAlertIconExists && oCellIdx > -1 && oCurrentRow.InfusionChartCells != null && this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.IsConflictExists == 'R') {
                                                oChartCell = oCurrentRow.InfusionChartCells[oCellIdx];
                                                oChartCell.AlertIcons.Add(this.objInfusionChartHelper.UnacknowledgedConflictIcon());
                                                isConflictAlertIconExists = true;
                                            }
                                            if (this.objInfusionChartHelper.oGetMedsChartData != null && this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.IsConflictExists == 'R') {
                                                this.objInfusionChartHelper.oGetMedsChartData.cUnackConflict = this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.IsConflictExists;
                                            }
                                            this.objInfusionChartHelper.CreateChartRows(oCurrentRow, this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails[j], this.objInfusionChartVM.CurrentDTTM, this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.PrescriptionItemStatus);
                                        }
                                        if (!String.IsNullOrEmpty(oResSlotDetail.PrescriptionItemStatus)) {
                                            this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.PrescriptionItemStatus = oResSlotDetail.PrescriptionItemStatus;
                                            oTagDrugHeaderDetail.PrescriptionItemStatus = oResSlotDetail.PrescriptionItemStatus;
                                        }
                                        if (!oTagDrugHeaderDetail.IsPRN || (oTagDrugHeaderDetail.IsPRN && oTagDrugHeaderDetail.IsPRNWithSchedule)) {
                                            if (String.Compare(this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) != 0) {
                                                if (this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails != null && this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails.Count > 0) {
                                                    let _IsPRNWIthOutScheduleOrPatientSelfAdminItem: boolean = false;
                                                    if (this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.IsSelfAdministered || (this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.IsPRN && !this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.IsPRNWithSchedule)) {
                                                        _IsPRNWIthOutScheduleOrPatientSelfAdminItem = true;
                                                    }
                                                    if (String.Compare(this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.InfusionType, InfusionTypesCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) == 0) {
                                                        let oInfActionCompleted = this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails.Where(oItem => String.Compare(oItem.Status, SlotStatus.STOPPED, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.COMPLETED, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) != 0).Select(oItem => oItem);
                                                        this.dtCurrentDateTime = CommonBB.GetServerDateTime();
                                                        if (_IsPRNWIthOutScheduleOrPatientSelfAdminItem && ((oInfActionCompleted != null && oInfActionCompleted.Count() == 0) ||DateTime.NotEquals(oTagDrugHeaderDetail.EndDate , DateTime.MinValue) && oTagDrugHeaderDetail.EndDate < this.dtCurrentDateTime)) {
                                                            this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.PrescriptionItemStatus = CConstants.COMPLETED;
                                                            oTagDrugHeaderDetail.PrescriptionItemStatus = CConstants.COMPLETED;
                                                        }
                                                    }
                                                    else {
                                                        let oInfActionCompleted = this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails.Where(oItem => String.Compare(oItem.Status, SlotStatus.STOPPED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oItem.Status, SlotStatus.COMPLETED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oItem.Status, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) == 0).Select(oItem => oItem);
                                                        if (oInfActionCompleted != null && oInfActionCompleted.Count() > 0) {
                                                            this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.PrescriptionItemStatus = CConstants.COMPLETED;
                                                            oTagDrugHeaderDetail.PrescriptionItemStatus = CConstants.COMPLETED;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        if (this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.PrescriptionItemStatus == CConstants.COMPLETED) {
                                            this.oClickedSlotTagObject.oInfusionChartRow.DrugItem.PrescriptionStatus = ValueDomainValues.oPrescriptionItemStatus.Count > 0 ? CommonBB.GetText(this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.PrescriptionItemStatus, ValueDomainValues.oPrescriptionItemStatus) : this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.PrescriptionItemStatus;
                                            this.oClickedSlotTagObject.oInfusionChartRow.DrugItem.PStatusIcon = ObjectHelper.CreateObject(new ChartIcon(), { Key: "COMPLETED", UriString: MedImage.GetPath(MedImages.CompletedIcon) });
                                            this.oClickedSlotTagObject.oInfusionChartRow.DrugItem.PStatusIcon.Tooltip = Resource.MedsAdminChartToolTip.Completed;
                                            this.oClickedSlotTagObject.oInfusionChartRow.DrugItem.PStatusIcon.EnableOnHotSpotClick = false;
                                        }
                                        else {
                                            let sStatus: string = ValueDomainValues.oPrescriptionItemStatus.Count > 0 ? CommonBB.GetText(CConstants.COMPLETED, ValueDomainValues.oPrescriptionItemStatus) : String.Empty;
                                            if (!String.IsNullOrEmpty(this.oClickedSlotTagObject.oInfusionChartRow.DrugItem.PrescriptionStatus) && !String.IsNullOrEmpty(sStatus) && this.oClickedSlotTagObject.oInfusionChartRow.DrugItem.PrescriptionStatus == sStatus) {
                                                this.oClickedSlotTagObject.oInfusionChartRow.DrugItem.PrescriptionStatus = String.Empty;
                                                this.oClickedSlotTagObject.oInfusionChartRow.DrugItem.PStatusIcon = null;
                                            }
                                        }
                                        if ((oResSlotDetail.Status == SlotStatus.INPROGRESS || oResSlotDetail.Status == SlotStatus.NOTGIVEN || oResSlotDetail.Status == SlotStatus.STOPPED || oResSlotDetail.Status == SlotStatus.COMPLETED) && (String.Compare(this.oClickedSlotTagObject.oDrugItem.PrescriptionStatus, CConstants.DiscontinueText, StringComparison.CurrentCultureIgnoreCase) == 0)) {
                                            oCurrentRow.RowBackground = new SolidColorBrush(Colors.Grey);
                                        }
                                        else {
                                            if (oTagDrugHeaderDetail.IsPRN) {
                                                if (String.Equals(this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase)) {
                                                    oCurrentRow.RowBackground = new SolidColorBrush(Color.FromArgb(255, 185, 251, 114));
                                                }
                                                else {
                                                    if (oCurrentRow.RowBackground != null && oCurrentRow.RowBackground.color == Color.FromArgb(255, 185, 251, 114)) {
                                                        oCurrentRow.RowBackground = new SolidColorBrush(MedChartData.AsRequiredSlotsColor);
                                                    }
                                                }
                                            }
                                            else {
                                                if (this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.PrescriptionItemStatus == CConstants.COMPLETED && this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails != null && this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails.Count > 0) {
                                                    let oInfActionCompleted = this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].SlotDetails.Where(oItem => String.Compare(oItem.Status, SlotStatus.STOPPED, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.COMPLETED, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) != 0);
                                                    if (oInfActionCompleted != null && oInfActionCompleted.Count() == 0) {
                                                        oCurrentRow.RowBackground = new SolidColorBrush(Color.FromArgb(255, 185, 251, 114));
                                                    }
                                                    else if (this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.PrescriptionItemStatus == CConstants.COMPLETED) {
                                                        oCurrentRow.RowBackground = new SolidColorBrush(Color.FromArgb(255, 185, 251, 114));
                                                    }
                                                    else if (oCurrentRow.RowBackground != null && oCurrentRow.RowBackground.color == Color.FromArgb(255, 185, 251, 114)) {
                                                        oCurrentRow.RowBackground = new SolidColorBrush();
                                                    }
                                                }
                                                else {
                                                    if (oCurrentRow.RowBackground != null && oCurrentRow.RowBackground.color == Color.FromArgb(255, 185, 251, 114)) {
                                                        oCurrentRow.RowBackground = new SolidColorBrush();
                                                    }
                                                }
                                                if (oResSlotDetail != null && oResSlotDetail.AdministrationDetail != null && oResSlotDetail.AdministrationDetail.IsAlertRequired && oResSlotDetail.AdministrationDetail.oAlertsInfoDetails != null && String.Equals(oResSlotDetail.AdministrationDetail.oAlertsInfoDetails.Alert, InfChartAlert.AMENDMENT_ALERT, StringComparison.InvariantCultureIgnoreCase)) {
                                                    let _IsIconAlreadyExists: boolean = true;
                                                    oCurrentRow.RowBackground = new SolidColorBrush(Color.FromArgb(250, 250, 250, 250));
                                                    if (this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.InfChartAlerts == null || this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.InfChartAlerts.Count == 0) {
                                                        this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.InfChartAlerts = new ArrayOfString();
                                                        this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.InfChartAlerts.Add(InfChartAlert.AMENDMENT_ALERT);
                                                        _IsIconAlreadyExists = false;
                                                    }
                                                    else if (!this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.InfChartAlerts.Any(s => s.Equals(InfChartAlert.AMENDMENT_ALERT))) {
                                                        this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.InfChartAlerts.Add(InfChartAlert.AMENDMENT_ALERT);
                                                        _IsIconAlreadyExists = false;
                                                    }
                                                    if (!_IsIconAlreadyExists) {
                                                        this.objInfusionChartHelper.PlotAlertIcon(this.oResponseInfusionChart.InfusionChatView.DrugDetail[i].DrugHeader.InfChartAlerts, oCurrentRow, this.objInfusionChartVM.CurrentDTTM, oResSlotDetail);
                                                        this.RefreshFauxTabAlertIcons(true);
                                                    }
                                                }
                                            }
                                        }
                                        break;
                                    }
                                }
                            }
                            this.oClickedSlotTagObject.oInfusionChartRow = oCurrentRow;
                            this.oClickedSlotTagObject.oInfusionChartRow.RowIndex = Convert.ToInt32(RowIndex);
                            this.InfusionChartControl.RowRefresh(this.oClickedSlotTagObject);
                            oTagDrugHeaderDetail.IsNextDoseAllowedForPRN = oResSlotDetail.IsNextDoseAllowedForPRN;
                            oTagDrugHeaderDetail.MinimumIntervalForPRN = oResSlotDetail.MinimumIntervalForPRN;
                            oTagDrugHeaderDetail.LastAdministeredAtForPRN = oResSlotDetail.LastRecordedAtForPRN;
                            if (this.objInfusionChartVM.MedicationAdminBaseVM != null) {
                                if ((oResSlotDetail.Status == SlotStatus.NOTGIVEN || oResSlotDetail.Status == SlotStatus.STOPPED || oResSlotDetail.Status == SlotStatus.COMPLETED) && (String.Compare(this.oClickedSlotTagObject.oDrugItem.PrescriptionStatus, CConstants.DiscontinueText, StringComparison.CurrentCultureIgnoreCase) == 0)) {
                                    this.objInfusionChartVM.MedicationAdminBaseVM.CumulativeParacetamol.GetCumulativeParacetamol();
                                }
                            }
                        }
                    }
                }
            }
            this.RefreshInfusionChart(oTagDrugHeaderDetail, oResSlotDetail);
        }
        this.objInfusionChartVM.CurrentActivityCode = ActivityCode.None;
        Busyindicator.SetStatusIdle("LaunchInfRecAdmin");
    }
    public RefreshInfusionChart(oTagDrugHeaderDetail: TagDrugHeaderDetail, oResSlotDetail: SlotDetail): void {
        if (oTagDrugHeaderDetail != null && oResSlotDetail != null && this.objInfusionChartVM != null) {
            let _previousItemStatus: string = oTagDrugHeaderDetail.PreviousPrescriptionItemStatus != null ? oTagDrugHeaderDetail.PreviousPrescriptionItemStatus : String.Empty;
            let _currentItemStatus: string = oTagDrugHeaderDetail.PrescriptionItemStatus != null ? oTagDrugHeaderDetail.PrescriptionItemStatus : String.Empty;
            let _currentAlertStatus: string = (oResSlotDetail != null && oResSlotDetail.AdministrationDetail != null && oResSlotDetail.AdministrationDetail.oAlertsInfoDetails != null && !String.IsNullOrEmpty(oResSlotDetail.AdministrationDetail.oAlertsInfoDetails.Alert)) ? oResSlotDetail.AdministrationDetail.oAlertsInfoDetails.Alert : String.Empty;
            let isPreviousCompleted: boolean = String.Equals(_previousItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase);
            let isCurrentCompleted: boolean = String.Equals(_currentItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase);
            let isPreviousDisContinued: boolean = String.Equals(_previousItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase);
            let isCurrentDisContinued: boolean = String.Equals(_currentItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase);
            let isAlertExists: boolean = (this._previousAlertStatus != null && this._previousAlertStatus.Count > 0 && this._previousAlertStatus.Any(x => x.Equals(_currentAlertStatus, StringComparison.InvariantCultureIgnoreCase))) ? true : false;
            if ((isPreviousCompleted && !isCurrentCompleted) || (!isPreviousCompleted && isCurrentCompleted) || ((isPreviousCompleted || isCurrentCompleted || isPreviousDisContinued || isCurrentDisContinued) && !isAlertExists)) {
                Busyindicator.SetStatusBusy("InfusionChart");
                this.SetInfusionChartParams();
                this.objInfusionChartVM.GetInfusionChartData(this.objInfusionChartVM.StartDTTM, this.objInfusionChartVM.EndDTTM, this.objInfusionChartVM.CurrentDTTM);
                if (this.objInfusionChartVM.MedicationAdminBaseVM != null) {
                    this.objInfusionChartVM.MedicationAdminBaseVM.SetHeightweightPopUp();
                }
            }
        }
    }
    private CheckWhetherAlertStillExistsOnRefresh(oCurrentRow: InfusionChartRow, oResSlotDetail: SlotDetail): void {
        let oTagDrugHeaderDetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(this.oClickedSlotTagObject.oDrugItem.Tag, TagDrugHeaderDetail);
        if (oTagDrugHeaderDetail != null && this.objInfusionChartVM != null) {
            if (String.Compare(oTagDrugHeaderDetail.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) == 0 || (oTagDrugHeaderDetail.InfusionRecordAdminTypeCode == InfusionRecordAdminTypeCodes.AmendmentAlertAdministration && String.Compare(oTagDrugHeaderDetail.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase) == 0)) {
                if (oResSlotDetail.Status == SlotStatus.NOTGIVEN || oResSlotDetail.Status == SlotStatus.STOPPED || oResSlotDetail.Status == SlotStatus.COMPLETED) {
                    this.ClearExistingChartRowAlerts(oCurrentRow, this.objInfusionChartVM.CurrentDTTM, oTagDrugHeaderDetail);
                }
            }
            else {
                if (oTagDrugHeaderDetail != null && oTagDrugHeaderDetail.InfChartAlerts != null && oTagDrugHeaderDetail.InfChartAlerts.Count > 0 && (oTagDrugHeaderDetail.InfChartAlerts[0] == InfChartAlert.FLOW_RATE_CHANGE_ALERT || oTagDrugHeaderDetail.InfChartAlerts[0] == InfChartAlert.CONCENTRATION_CHANGE_ALERT || oTagDrugHeaderDetail.InfChartAlerts[0] == InfChartAlert.RATE_N_CONCENTRATION_CHANGE_ALERT || oTagDrugHeaderDetail.InfChartAlerts[0] == InfChartAlert.STEP_DOSE_FLOW_RATE_ALERT || oTagDrugHeaderDetail.InfChartAlerts[0] == InfChartAlert.INFUSION_PERIOD_COMPLETED_ALERT) && String.Compare(oResSlotDetail.Status, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) != 0) {
                    if (oResSlotDetail != null && oResSlotDetail.AdministrationDetail != null && oResSlotDetail.AdministrationDetail.oInfusionAdminDetail != null) {
                        let oChangeFlowRate = oResSlotDetail.AdministrationDetail.oInfusionAdminDetail.Where(oItem => oItem.RecordedAt != DateTime.MinValue).Select(oItem => oItem);
                        if (oChangeFlowRate != null && oChangeFlowRate.Count() > 0) {
                            let oLastItemAction = oChangeFlowRate.OrderByDescending(oItem => oItem.RecordedAt);
                            if (oLastItemAction != null && oLastItemAction.Count() > 0) {
                                if ((!String.Equals(oTagDrugHeaderDetail.InfChartAlerts[0], InfChartAlert.INFUSION_PERIOD_COMPLETED_ALERT, StringComparison.CurrentCultureIgnoreCase) && (String.Equals(oLastItemAction.FirstOrDefault().ActionCode, MedicationAction.CHANGEFLOWRATE, StringComparison.CurrentCultureIgnoreCase) || String.Equals(oLastItemAction.FirstOrDefault().ActionCode, MedicationAction.BEGUN, StringComparison.CurrentCultureIgnoreCase))) || String.Equals(oLastItemAction.FirstOrDefault().ActionCode, MedicationAction.STOP, StringComparison.CurrentCultureIgnoreCase) || String.Equals(oLastItemAction.FirstOrDefault().ActionCode, MedicationAction.COMPLETE, StringComparison.CurrentCultureIgnoreCase)) {
                                    this.ClearExistingChartRowAlerts(oCurrentRow, this.objInfusionChartVM.CurrentDTTM, oTagDrugHeaderDetail);
                                }
                            }
                        }
                    }
                    else if (String.Equals(oTagDrugHeaderDetail.InfChartAlerts[0], InfChartAlert.INFUSION_PERIOD_COMPLETED_ALERT, StringComparison.CurrentCultureIgnoreCase) && String.Equals(oResSlotDetail.AdministrationDetail.StrikeoutAction, InfStrikeOutType.EntireAdmin, StringComparison.CurrentCultureIgnoreCase)) {
                        this.ClearExistingChartRowAlerts(oCurrentRow, this.objInfusionChartVM.CurrentDTTM, oTagDrugHeaderDetail);
                    }
                }
                else {
                    this.ClearExistingChartRowAlerts(oCurrentRow, this.objInfusionChartVM.CurrentDTTM, oTagDrugHeaderDetail);
                }
            }
            let isAlertExists: boolean = false;
            let oAlertItems = this.oResponseInfusionChart.InfusionChatView.DrugDetail.Where(oItem => oItem.DrugHeader.InfChartAlerts != null && oItem.DrugHeader.InfChartAlerts.Count > 0).Select(oItem => oItem);
            if (oAlertItems != null && oAlertItems.Count() > 0) {
                isAlertExists = true;
            }
            this.RefreshFauxTabAlertIcons(isAlertExists);
        }
    }
    private ClearExistingChartRowAlerts(oCurrentRow: InfusionChartRow, dtCurrentDTTM: DateTime, oTagDrugHeaderDetail: TagDrugHeaderDetail): void {
        if (this.objInfusionChartHelper != null && oCurrentRow != null && oCurrentRow.InfusionChartCells != null && oCurrentRow.InfusionChartCells.Count > 0) {
            let oCellIndex: number = this.objInfusionChartHelper.FindCellIndexByTime(dtCurrentDTTM);
            if (oCellIndex > -1) {
                let oInfusionChartCell: InfusionChartCell = oCurrentRow.InfusionChartCells[oCellIndex];
                if (oInfusionChartCell != null && oInfusionChartCell.AlertIcons != null && oInfusionChartCell.AlertIcons.Count > 0) {
                    oInfusionChartCell.AlertIcons.Clear();
                }
            }
        }
        if (oTagDrugHeaderDetail.InfChartAlerts != null && oTagDrugHeaderDetail.InfChartAlerts.Count > 0) {
            oTagDrugHeaderDetail.InfChartAlerts.Clear();
        }
        if (this.oResponseInfusionChart != null && this.oResponseInfusionChart.InfusionChatView != null && this.oResponseInfusionChart.InfusionChatView.DrugDetail != null && this.oResponseInfusionChart.InfusionChatView.DrugDetail.Count > 0) {
            let oSelectedItem = this.oResponseInfusionChart.InfusionChatView.DrugDetail.Where(oItem => oItem.DrugHeader.PrescriptionItemOID == oTagDrugHeaderDetail.PrescriptionItemOID).Select(oItem => oItem);
            if (oSelectedItem != null && oSelectedItem.Count() > 0) {
                oSelectedItem.First().DrugHeader.InfChartAlerts = null;
            }
        }
    }
    private RefreshFauxTabAlertIcons(IsNotifyAlertExists: boolean): void {
        //revisit this condition of undefined
        if (IsNotifyAlertExists != undefined) {
            let oFauxTab: iTab = ObjectHelper.CreateType<iTab>((ObjectHelper.CreateType<iTabItem>(this.Parent, iTabItem))?.Parent, iTab);
            if (oFauxTab !== undefined) {
                let oFauxTabItem: iTabItem = oFauxTab.GetItem(CConstants.sTabInfusionKey);
                if (oFauxTabItem instanceof iTabItem && oFauxTabItem.Key == CConstants.sTabInfusionKey) {
                    if (oFauxTabItem.HeaderImageList == null)
                        oFauxTabItem.HeaderImageList = new List<HeaderImageListItem>();
                    else oFauxTabItem.HeaderImageList.Clear();
                    if (this.objInfusionChartVM.DuenowCount > 0 || this.objInfusionChartVM.OverDueCount > 0) {
                        oFauxTabItem.HeaderImageList.Add(ObjectHelper.CreateObject(new HeaderImageListItem(), { HeaderImage: MedImage.GetPath(MedImages.InfDuenessAlertIcon), HeaderImageAlignment: HeaderImageAlignment.Right, HeaderImgToolTip: Resource.InfusionChart.infDuenessAlert_Tooltip }));
                    }
                    if (IsNotifyAlertExists) {
                        oFauxTabItem.HeaderImageList.Add(ObjectHelper.CreateObject(new HeaderImageListItem(), { HeaderImage: MedImage.GetPath(MedImages.InfChartAlertIcon), HeaderImageAlignment: HeaderImageAlignment.Right, HeaderImgToolTip: Resource.InfusionChart.infNotifyAlert_Tooltip }));
                    }
                    oFauxTabItem.UpdateHeaderForChart();
                }
            }
        }
    }
    CumulativeParacetamol_WarningChangeEvent(ParacetamolAdminCount: number): void {
        if (ChartContext.CurrentChartTab == CConstants.sTabInfusionKey) {
            this.SetInfusionChartParams();
            this.objInfusionChartVM.GetInfusionChartData(this.objInfusionChartVM.StartDTTM, this.objInfusionChartVM.EndDTTM, this.objInfusionChartVM.CurrentDTTM);
        }
    }
    private ClearInfusionChartRow(oCurrentRow: InfusionChartRow): void {
        let isInfusionAlertIconExists: boolean = false;
        let nCurrentDTTMColIndex: number = -1;
        if (oCurrentRow != null) {
            if (this.objInfusionChartHelper != null) {
                let oCellIndex: number = this.objInfusionChartHelper.FindCellIndexByTime(this.objInfusionChartVM.CurrentDTTM);
                if (oCellIndex > -1) {
                    nCurrentDTTMColIndex = oCurrentRow.InfusionChartCells[oCellIndex].ColIndex;
                }
            }
            for (let j: number = 0; j < 12; j++) {
                isInfusionAlertIconExists = false;
                if (oCurrentRow.InfusionChartCells[j] != null && oCurrentRow.InfusionChartCells[j].Tag != null) {
                    if (oCurrentRow.InfusionChartCells[j].AlertIcons != null && oCurrentRow.InfusionChartCells[j].AlertIcons.Count > 0) {
                        let oPRNItem = oCurrentRow.InfusionChartCells[j].AlertIcons.Where(oItem => oItem.Key == "icoPRNLockIcon");
                        if (oPRNItem != null && oPRNItem.Count() > 0)
                            oCurrentRow.InfusionChartCells[j].AlertIcons.Remove(oPRNItem.First());
                        let oCumulativeItem = oCurrentRow.InfusionChartCells[j].AlertIcons.Where(oItem => oItem.Key == CConstants.CumulativeWarning);
                        if (oCumulativeItem != null && oCumulativeItem.Count() > 0)
                            oCurrentRow.InfusionChartCells[j].AlertIcons.Remove(oCumulativeItem.First());
                        let oInfusionAlertItem = oCurrentRow.InfusionChartCells[j].AlertIcons.Where(oItem => oItem.Key.Equals("icoStepDoseFlowRateChange") || oItem.Key.Equals("icoFlowRateChange") || oItem.Key.Equals("icoAmendment") || oItem.Key.Equals("icoDiscontinuation") || oItem.Key.Equals("icoDoseMonitorPeriod"));
                        if (oInfusionAlertItem != null && oInfusionAlertItem.Count() > 0)
                            isInfusionAlertIconExists = true;
                    }
                    oCurrentRow.InfusionChartCells[j].CLines.Clear();
                    oCurrentRow.InfusionChartCells[j].ProcessChartIcon.Clear();
                    oCurrentRow.InfusionChartCells[j].InfusionIcons.Clear();
                    oCurrentRow.InfusionChartCells[j].LineType = InfusionProcessIcon.LineTypes.None;
                    oCurrentRow.InfusionChartCells[j].LineColour = new SolidColorBrush();
                    oCurrentRow.InfusionChartCells[j].MultiActuionIcon = null;
                    oCurrentRow.InfusionChartCells[j].AdministrationIcon = null;
                    oCurrentRow.InfusionChartCells[j].HomeLeaveIcon = null;
                    if (!isInfusionAlertIconExists && oCurrentRow != null && oCurrentRow.DrugItem != null && oCurrentRow.DrugItem.Tag != null && !(<TagDrugHeaderDetail>(oCurrentRow.DrugItem.Tag)).IsPRN)
                        oCurrentRow.InfusionChartCells[j].EnableCellClick = false;
                    if (nCurrentDTTMColIndex == oCurrentRow.InfusionChartCells[j].ColIndex) {
                        oCurrentRow.InfusionChartCells[j].InfusionAlignment = ImageAlignment.Center;
                        oCurrentRow.InfusionChartCells[j].ChartBackground = new SolidColorBrush(Colors.Transparent);
                    }
                    else {
                        oCurrentRow.InfusionChartCells[j].ChartBackground = new SolidColorBrush();
                    }
                    if (!isInfusionAlertIconExists)
                        oCurrentRow.InfusionChartCells[j].Tag = null;
                }
            }
        }
    }
    InProgressScheduledDTTM:DateTime  = DateTime.MinValue;
    public CheckValidation(TagObject: InfusionTagObject): boolean {
        let sErrorMsg: string = String.Empty;
        let sDurgName: string = String.Empty;
        let oTagDrugHeaderDetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(TagObject.oDrugItem.Tag, TagDrugHeaderDetail);
        let oINFRecordAdminParams: INFRecordAdminParams = ObjectHelper.CreateType<INFRecordAdminParams>(TagObject.oChartCell.Tag, INFRecordAdminParams);
        let dtCurrentDateTime: DateTime = CommonBB.GetServerDateTime();
        if (oTagDrugHeaderDetail != null) {
            if (!UserPermissions.CanManageMedAdministration) {
                this.ShowErrorMessage(Resource.MedsAdminChartOverview.CanManageMedAdministration, MessageBoxButton.OK, MessageBoxType.Critical);
                return false;
            }
            if (!String.IsNullOrEmpty(oTagDrugHeaderDetail.DrugName)) {
                sDurgName = oTagDrugHeaderDetail.DrugName;
            }
            if (this.oResponseInfusionChart != null && this.oResponseInfusionChart.InfusionChatView != null && this.oResponseInfusionChart.InfusionChatView.DrugDetail != null && Common.IsPreviousSeqPresItemInprogress(oTagDrugHeaderDetail, this.oResponseInfusionChart.InfusionChatView.DrugDetail)) {
                this.ShowErrorMessage(String.Format(Resource.InfusionChart.PreviousContSeqInProgress, TagObject.oDrugItem.Drugname), MessageBoxButton.OK, MessageBoxType.Critical);
                return false;
            }
            let isDisContinueInfusionAlertExist: boolean = false;
            if (oTagDrugHeaderDetail.InfChartAlerts != null && oTagDrugHeaderDetail.InfChartAlerts.Count > 0 && oTagDrugHeaderDetail.InfChartAlerts[0] == InfChartAlert.DISCONTINUATION_ALERT) {
                isDisContinueInfusionAlertExist = true;
            }
            if (!isDisContinueInfusionAlertExist && !this.IsDiscontinuedErrorMsgExists && TagObject.oDrugItem.PStatusIcon != null && !String.IsNullOrEmpty(TagObject.oDrugItem.PStatusIcon.Key) && String.Compare(TagObject.oDrugItem.PStatusIcon.Key, "DISCONTINUED", StringComparison.CurrentCultureIgnoreCase) == 0 && oINFRecordAdminParams != null && !String.IsNullOrEmpty(oINFRecordAdminParams.SlotStatus) && String.Compare(oINFRecordAdminParams.SlotStatus, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) != 0) {
                this.IsAlertShown = false;
                this.IsDiscontinuedErrorMsgExists = true;
                this.ShowErrorMessage(Resource.MedsAdminChartToolTip.DiscontinuedErrorMsg, MessageBoxButton.YesNo, MessageBoxType.Question);
                return false;
            }
            if (oINFRecordAdminParams != null && !String.IsNullOrEmpty(oINFRecordAdminParams.SlotStatus) && String.Equals(oINFRecordAdminParams.SlotStatus, SlotStatus.NOTKNOWN, StringComparison.CurrentCultureIgnoreCase) && oTagDrugHeaderDetail.IsAmendCompletedStatus && !String.IsNullOrEmpty(oTagDrugHeaderDetail.PrescriptionItemStatus) && (String.Equals(oTagDrugHeaderDetail.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase))) {
                this.ShowErrorMessage(Resource.MedicationChart.AmendedCompletedWarningMsg, MessageBoxButton.OK, MessageBoxType.Information,/*MsgBoxTag:*/CConstants.sAmendedCompletedWarMsg);
                return false;
            }
            if (oINFRecordAdminParams != null) {
                let IsNotAllNotYetRecordedExists: boolean = false;
                if (!this.IsConflictsErrorMsgExists && this.oResponseInfusionChart != null && this.oResponseInfusionChart.InfusionChatView != null && this.oResponseInfusionChart.InfusionChatView.DrugDetail != null && this.oResponseInfusionChart.InfusionChatView.DrugDetail.Count > 0) {
                    let oSelectedItem = this.oResponseInfusionChart.InfusionChatView.DrugDetail.Where(oItem => oItem.DrugHeader.PrescriptionItemOID == oTagDrugHeaderDetail.PrescriptionItemOID).Select(oItem => oItem);
                    if (oSelectedItem != null && oSelectedItem.Count() > 0) {
                        let oSlotDetails = oSelectedItem.First().SlotDetails;
                        if (oSlotDetails != null && oSlotDetails.Count > 0) {
                            let DueOverdueSlotExists = oSlotDetails.Where(slot => (String.Compare(slot.Status, SlotStatus.DUENOW, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(slot.Status, SlotStatus.OVERDUE, StringComparison.CurrentCultureIgnoreCase) == 0)).Select(slot => slot);
                            if (DueOverdueSlotExists != null && DueOverdueSlotExists.Count() > 0) {
                                IsNotAllNotYetRecordedExists = true;
                            }
                        }
                    }
                }
                let IsUnackConflictExists: string = oTagDrugHeaderDetail.UnackIsConflictExists;
                if (!this.IsConflictsErrorMsgExists && IsNotAllNotYetRecordedExists && (String.Compare(oINFRecordAdminParams.SlotStatus, SlotStatus.NOTYETRECORDED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oINFRecordAdminParams.SlotStatus, SlotStatus.DUENOW, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oINFRecordAdminParams.SlotStatus, SlotStatus.OVERDUE, StringComparison.CurrentCultureIgnoreCase) == 0) && IsUnackConflictExists == 'R' && TagObject.oDrugItem.DrugnameIcon1 != null && !String.IsNullOrEmpty(TagObject.oDrugItem.DrugnameIcon1.Key) && String.Compare(TagObject.oDrugItem.DrugnameIcon1.Key, "Conflicts", StringComparison.CurrentCultureIgnoreCase) == 0) {
                    this.IsConflictsErrorMsgExists = true;
                    this.ShowErrorMessage(Resource.MedsAdminChartToolTip.UnacknowledgedConflictsErrorMsg, MessageBoxButton.YesNo, MessageBoxType.Question);
                    return false;
                }
                if (!this.IsPreviousslotscheduledErrMsgExists && oTagDrugHeaderDetail.INFTYCODE == InfusionTypeCode.INTERMITTENT && (!oTagDrugHeaderDetail.IsPRN || (oTagDrugHeaderDetail.IsPRN && oTagDrugHeaderDetail.IsPRNWithSchedule))) {
                    let InProgressSlotExists: boolean = false;
                    if (oINFRecordAdminParams != null && (String.Equals(oINFRecordAdminParams.SlotStatus, SlotStatus.STOPPED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(oINFRecordAdminParams.SlotStatus, SlotStatus.COMPLETED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(oINFRecordAdminParams.SlotStatus, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase))) {
                        InProgressSlotExists = true;
                    }
                    if (!InProgressSlotExists) {
                        this.InProgressScheduledDTTM = DateTime.MinValue;
                        InProgressSlotExists = this.IsPreviousInProgressInfusionExists(TagObject, oINFRecordAdminParams, oTagDrugHeaderDetail);
                        if (InProgressSlotExists) {
                            this.IsPreviousslotscheduledErrMsgExists = true;
                            let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                                Title: "LORENZO",
                                Message: String.Format(Resource.InfusionChart.Previousslotscheduled, TagObject.oDrugItem.Drugname, this.InProgressScheduledDTTM.ToString(CConstants.DateTimeFormat)),
                                MessageButton: MessageBoxButton.OK,
                                IconType: MessageBoxType.Information,
                                Height: 160,
                                Width: 410
                            });
                            iMsgBox.OverlayBrush = new SolidColorBrush(Colors.Transparent);
                            iMsgBox.Show();
                            return false;
                        }
                    }
                }
                let IsNextDueSlotExists: boolean = false;
                if (!this.IsPreviousslotscheduledErrMsgExists && !this.IsAnotherAdminDueErrMsgExists) {
                    if ((String.Compare(oINFRecordAdminParams.SlotStatus, SlotStatus.DUENOW, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oINFRecordAdminParams.SlotStatus, SlotStatus.OVERDUE, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oINFRecordAdminParams.SlotStatus, SlotStatus.DEFERDUENOW, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oINFRecordAdminParams.SlotStatus, SlotStatus.DEFEROVERDUE, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oINFRecordAdminParams.SlotStatus, SlotStatus.NOTYETRECORDED, StringComparison.CurrentCultureIgnoreCase) == 0) && (this.oResponseInfusionChart != null && this.oResponseInfusionChart.InfusionChatView != null && this.oResponseInfusionChart.InfusionChatView.DrugDetail != null && this.oResponseInfusionChart.InfusionChatView.DrugDetail.Count > 0)) {
                        let oSelectedItem = this.oResponseInfusionChart.InfusionChatView.DrugDetail.Where(oItem => oItem.DrugHeader.PrescriptionItemOID == oTagDrugHeaderDetail.PrescriptionItemOID).Select(oItem => oItem);
                        if (oSelectedItem != null && oSelectedItem.Count() > 0) {
                            let oSlotDetails = oSelectedItem.First().SlotDetails;
                            if (oSlotDetails != null && oSlotDetails.Count > 0) {
                                if (DateTime.GreaterThan(dtCurrentDateTime , oINFRecordAdminParams.ScheduledDTTM)) {
                                    let NextDueSlotExists = oSlotDetails.Where(slot => (DateTime.GreaterThan(slot.ScheduledDTTM , oINFRecordAdminParams.ScheduledDTTM) && (String.Compare(slot.Status, SlotStatus.DUENOW, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(slot.Status, SlotStatus.OVERDUE, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(slot.Status, SlotStatus.DEFERDUENOW, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(slot.Status, SlotStatus.DEFEROVERDUE, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(slot.Status, SlotStatus.NOTYETRECORDED, StringComparison.CurrentCultureIgnoreCase) == 0))).Select(slot => slot);
                                    if (NextDueSlotExists != null && NextDueSlotExists.Count() > 0) {
                                        IsNextDueSlotExists = true;
                                    }
                                }
                            }
                        }
                    }
                }
                if (!this.IsPreviousslotscheduledErrMsgExists && !this.IsAnotherAdminDueErrMsgExists && IsNextDueSlotExists) {
                    this.IsAnotherAdminDueErrMsgExists = true;
                    this.ShowErrorMessage(String.Format(Resource.InfusionChart.infAnotherAdminDueErrMsg, sDurgName), MessageBoxButton.YesNo, MessageBoxType.Question);
                    return false;
                }
                else if (!this.IsPreviousslotscheduledErrMsgExists && !this.IsOutsideAdminTimeErrMsgExists && String.Compare(oINFRecordAdminParams.SlotStatus, SlotStatus.PLANNED, StringComparison.CurrentCultureIgnoreCase) == 0 && DateTime.NotEquals(oINFRecordAdminParams.ScheduledDTTM , DateTime.MinValue) && MedChartData.AdvDurationForRecording > 0) {
                    let TimeDifference: number = Convert.ToInt32(oINFRecordAdminParams.ScheduledDTTM.Subtract(dtCurrentDateTime).TotalMinutes);
                    if (TimeDifference > 0 && TimeDifference > MedChartData.DuenessThreshold && TimeDifference <= MedChartData.AdvDurationForRecording) {
                        this.IsOutsideAdminTimeErrMsgExists = true;
                        this.ShowErrorMessage(String.Format(Resource.InfusionChart.infFutureSlotAdminErrMsgWithYesNo, sDurgName), MessageBoxButton.YesNo, MessageBoxType.Question,/*MsgBoxTag:*/CConstants.OutsideAdminTimeMsgYesNo);
                        return false;
                    }
                    else if (TimeDifference > MedChartData.AdvDurationForRecording) {
                        this.IsOutsideAdminTimeErrMsgExists = true;
                        this.ShowErrorMessage(String.Format(Resource.InfusionChart.infFutureSlotAdminErrMsg, sDurgName), MessageBoxButton.OK, MessageBoxType.Critical,/*MsgBoxTag:*/CConstants.OutsideAdminTimeMsgOk);
                        return false;
                    }
                }
                if (oTagDrugHeaderDetail.IsParacetamolIngredient && DateTime.NotEquals(oINFRecordAdminParams.ScheduledDTTM , DateTime.MinValue) && this.sParacetamolRecentlyAdministered == -1 && (String.Equals(oINFRecordAdminParams.SlotStatus, SlotStatus.OVERDUE, StringComparison.CurrentCultureIgnoreCase) || String.Equals(oINFRecordAdminParams.SlotStatus, SlotStatus.DEFEROVERDUE, StringComparison.CurrentCultureIgnoreCase) || String.Equals(oINFRecordAdminParams.SlotStatus, SlotStatus.DUENOW, StringComparison.CurrentCultureIgnoreCase) || String.Equals(oINFRecordAdminParams.SlotStatus, SlotStatus.DEFERDUENOW, StringComparison.CurrentCultureIgnoreCase) || String.Equals(oINFRecordAdminParams.SlotStatus, SlotStatus.NOTYETRECORDED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(oINFRecordAdminParams.SlotStatus, SlotStatus.PLANNED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(oINFRecordAdminParams.SlotStatus, SlotStatus.PATIENTSELFADMIN, StringComparison.CurrentCultureIgnoreCase))) {
                    let oSlotHelper: SlotAdministrationHelper = new SlotAdministrationHelper();
                    //oSlotHelper.TriggerParacetamolWarningEvent -= oSlotHelper_TriggerParacetamolWarningEvent;
                    oSlotHelper.TriggerParacetamolWarningEvent = (s) => { this.oSlotHelper_TriggerParacetamolWarningEvent(s); };
                    oSlotHelper.IsAnyParacetamolAdministered(dtCurrentDateTime, oINFRecordAdminParams.SlotOID);
                    Busyindicator.SetStatusBusy("CheckParaAdministered");
                    this.sParacetamolRecentlyAdministered = 0;
                    return false;
                }
                if (String.Compare(oINFRecordAdminParams.SlotStatus, SlotStatus.OVERDUE, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oINFRecordAdminParams.SlotStatus, SlotStatus.DEFEROVERDUE, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oINFRecordAdminParams.SlotStatus, SlotStatus.DUENOW, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oINFRecordAdminParams.SlotStatus, SlotStatus.DEFERDUENOW, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oINFRecordAdminParams.SlotStatus, SlotStatus.NOTYETRECORDED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oINFRecordAdminParams.SlotStatus, SlotStatus.PLANNED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oINFRecordAdminParams.SlotStatus, SlotStatus.HOMELEAVE, StringComparison.CurrentCultureIgnoreCase) == 0 || oTagDrugHeaderDetail.IsPRN) {
                    let nParaAdminCnt: number = 0;
                    if (this.objInfusionChartVM.MedicationAdminBaseVM != null && this.objInfusionChartVM.MedicationAdminBaseVM.CumulativeParacetamol.ParacetamolAdministeredCount.HasValue) {
                        nParaAdminCnt = this.objInfusionChartVM.MedicationAdminBaseVM.CumulativeParacetamol.ParacetamolAdministeredCount.Value;
                    }
                    if (oTagDrugHeaderDetail.IsParacetamolIngredient && nParaAdminCnt > 3 && (this.IsCumulativeWarningAcknowledged == null || (this.IsCumulativeWarningAcknowledged.HasValue && !this.IsCumulativeWarningAcknowledged.Value))) {
                        this.IsCumulativeWarningAcknowledged = false;
                        this.ShowErrorMessage(String.Format(Resource.MedsAdminChartToolTip.CumulativeWarningMsg, nParaAdminCnt), MessageBoxButton.YesNo, MessageBoxType.Question,/*MsgBoxTag:*/CConstants.CumulativeWarning,/*MsgBoxHeight:*/160,/*MsgBoxWidth:*/410);
                        return false;
                    }
                }
                if (!this.IsInfusionAlertErrMsgExists && !this.IsPreviousslotscheduledErrMsgExists && oTagDrugHeaderDetail.InfChartAlerts != null && oTagDrugHeaderDetail.InfChartAlerts.Count > 0) {
                    switch (oTagDrugHeaderDetail.InfChartAlerts[0]) {
                        case InfChartAlert.STEP_DOSE_FLOW_RATE_ALERT:
                        case InfChartAlert.FLOW_RATE_CHANGE_ALERT:
                            let sCurrentRate: string = String.Empty;
                            sCurrentRate = oTagDrugHeaderDetail.Rate + " " + oTagDrugHeaderDetail.RateNumeratorUOM + "/" + oTagDrugHeaderDetail.RateDinominatorUOM;
                            sErrorMsg = String.Format(Resource.MedsAdminChartToolTip.InfChartRateChngAlert_MsgText, oTagDrugHeaderDetail.PreviousRate, sCurrentRate);
                            break;
                        case InfChartAlert.AMENDMENT_ALERT:
                            oTagDrugHeaderDetail.InfusionRecordAdminTypeCode = InfusionRecordAdminTypeCodes.AmendmentAlertAdministration;
                            sErrorMsg = String.Format(Resource.MedsAdminChartToolTip.InfChartAmendAlert_MsgText1, oTagDrugHeaderDetail.PrescribedBy, oTagDrugHeaderDetail.PrescribedAt.ToString(CConstants.DateTimeFormat));
                            if (this.oResponseInfusionChart.InfusionChatView.DrugDetail != null && this.oResponseInfusionChart.InfusionChatView.DrugDetail.Count > 0) {
                                let oSelectedItem = this.oResponseInfusionChart.InfusionChatView.DrugDetail.Where(oItem => oItem.DrugHeader.IsAmendment && oItem.DrugHeader.AmendedPrescriptionItemOID == oTagDrugHeaderDetail.PrescriptionItemOID).Select(oItem => oItem);
                                if (oSelectedItem != null && oSelectedItem.Count() > 0) {
                                    let oDrugDetail: DrugDetail = oSelectedItem.First();
                                    oTagDrugHeaderDetail.AmendedParentPrescriptionItemOID = oDrugDetail.DrugHeader.PrescriptionItemOID;
                                    sErrorMsg = String.Format(Resource.MedsAdminChartToolTip.InfChartAmendAlert_MsgText1, oDrugDetail.DrugHeader.PrescriberName, oDrugDetail.DrugHeader.PrescribedAt.ToString(CConstants.DateTimeFormat));
                                    sErrorMsg = sErrorMsg + "\r\n" + Resource.MedsAdminChartToolTip.InfChartAmendAlert_MsgText2;
                                    sErrorMsg = sErrorMsg + "\r\n" + this.objInfusionChartHelper.GetAmendmentAlertMessage(oDrugDetail.DrugHeader.PrescriptionItemOID, oDrugDetail.DrugHeader.AmendedPrescriptionItemOID);
                                    sErrorMsg = sErrorMsg + "\r\n" + Resource.MedsAdminChartToolTip.InfChartAmendAlert_MsgText3;
                                }
                                else {
                                    sErrorMsg = sErrorMsg + "\r\n\r\n" + Resource.MedsAdminChartToolTip.InfChartAmendIVToNonIVText;
                                }
                            }
                            break;
                        case InfChartAlert.DISCONTINUATION_ALERT:
                            sErrorMsg = String.Format(Resource.MedsAdminChartToolTip.InfChartDisCntdAlert_MsgText1, oTagDrugHeaderDetail.CancelDiscontinuedBy, oTagDrugHeaderDetail.CancelDiscontinuedDttm.ToString(CConstants.DateTimeFormat));
                            sErrorMsg = sErrorMsg + "\r\n";
                            sErrorMsg = sErrorMsg + "\r\n" + Resource.MedsAdminChartToolTip.InfChartDisCntdAlert_MsgText2;
                            break;
                        case InfChartAlert.COND_DOSE_MONITORING_PER_ALERT:
                            sErrorMsg = Resource.MedsAdminChartToolTip.InfChartMonitordAlert_MsgText;
                            break;
                        case InfChartAlert.DUE_ALERT:
                        case InfChartAlert.OVERDUE_ALERT:
                            sErrorMsg = Resource.MedsAdminChartToolTip.InfChartDuenessAlert_MsgText;
                            break;
                        case InfChartAlert.CONCENTRATION_CHANGE_ALERT:
                            sErrorMsg = String.Format(Resource.MedsAdminChartToolTip.InfChartConcentrationChngAlert_MsgText, oTagDrugHeaderDetail.PreviousDrugConcentration, oTagDrugHeaderDetail.DrugConcentration);
                            break;
                        case InfChartAlert.RATE_N_CONCENTRATION_CHANGE_ALERT:
                            let sCurrentInfRate: string = String.Empty;
                            sCurrentInfRate = oTagDrugHeaderDetail.Rate + " " + oTagDrugHeaderDetail.RateNumeratorUOM + "/" + oTagDrugHeaderDetail.RateDinominatorUOM;
                            sErrorMsg = String.Format(Resource.MedsAdminChartToolTip.InfChartRateChngAlert_MsgText, oTagDrugHeaderDetail.PreviousRate, sCurrentInfRate);
                            sErrorMsg = sErrorMsg + "\r\n";
                            sErrorMsg = sErrorMsg + "\r\n" + String.Format(Resource.MedsAdminChartToolTip.InfChartConcentrationChngAlert_MsgText, oTagDrugHeaderDetail.PreviousDrugConcentration, oTagDrugHeaderDetail.DrugConcentration);
                            break;
                        case InfChartAlert.INFUSION_PERIOD_COMPLETED_ALERT:
                            sErrorMsg = Resource.MedsAdminChartToolTip.InfChartInfusionPeriodCompletedAlert_ToolTip;
                            break;
                        default:
                            oTagDrugHeaderDetail.InfusionRecordAdminTypeCode = InfusionRecordAdminTypeCodes.None;
                            break;
                    }
                    if (!String.IsNullOrEmpty(sErrorMsg)) {
                        this.IsInfusionAlertErrMsgExists = true;
                        this.IsAlertShown = false;
                        this.ShowErrorMessage(sErrorMsg, MessageBoxButton.OK, MessageBoxType.Exclamation,/*MsgBoxTag:*/CConstants.InfusionWarning,/*MsgBoxHeight:*/160,/*MsgBoxWidth:*/410);
                        return false;
                    }
                }
            }
            else {
                if (!this.IsPreviousslotscheduledErrMsgExists && (oTagDrugHeaderDetail.INFTYCODE == InfusionTypeCode.INTERMITTENT || (String.Equals(oTagDrugHeaderDetail.ItemSubType, InfusionTypesCode.SUBTYPE_GAS) && oTagDrugHeaderDetail.IsPRN)) && !this.IsRestrosPRN) {
                    let InProgressSlotExists: boolean = false;
                    if (oINFRecordAdminParams != null && (String.Equals(oINFRecordAdminParams.SlotStatus, SlotStatus.STOPPED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(oINFRecordAdminParams.SlotStatus, SlotStatus.COMPLETED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(oINFRecordAdminParams.SlotStatus, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase))) {
                        InProgressSlotExists = true;
                    }
                    if (!InProgressSlotExists) {
                        this.InProgressScheduledDTTM = DateTime.MinValue;
                        InProgressSlotExists = this.IsPreviousInProgressInfusionExists(TagObject, oINFRecordAdminParams, oTagDrugHeaderDetail);
                        if (InProgressSlotExists) {
                            this.IsPreviousslotscheduledErrMsgExists = true;
                            let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                                Title: "LORENZO",
                                Message: String.Format(Resource.InfusionChart.Previousslotscheduled, TagObject.oDrugItem.Drugname, this.InProgressScheduledDTTM.ToString(CConstants.DateTimeFormat)),
                                MessageButton: MessageBoxButton.OK,
                                IconType: MessageBoxType.Information,
                                Height: 160,
                                Width: 410
                            });
                            iMsgBox.OverlayBrush = new SolidColorBrush(Colors.Transparent);
                            iMsgBox.Show();
                            return false;
                        }
                    }
                }
                if (!this.IsPreviousslotscheduledErrMsgExists && !this.IsLockIconMsgExists && oTagDrugHeaderDetail.IsPRN && !oTagDrugHeaderDetail.IsNextDoseAllowedForPRN) {
                    this.IsLockIconMsgExists = true;
                    let sTimetoPrescribe: string = String.Empty;
                    let sAdminDate: string = oTagDrugHeaderDetail.LastAdministeredAtForPRN.ToString(CConstants.DateTimeFormat);
                    if (oTagDrugHeaderDetail.MinimumIntervalForPRN < 60)
                        sTimetoPrescribe = oTagDrugHeaderDetail.MinimumIntervalForPRN + " minute(s).";
                    else if (oTagDrugHeaderDetail.MinimumIntervalForPRN >= 60)
                        sTimetoPrescribe = Number.isInteger(Convert.ToDouble(oTagDrugHeaderDetail.MinimumIntervalForPRN  / Convert.ToDouble(60))) ? Convert.ToDouble(oTagDrugHeaderDetail.MinimumIntervalForPRN  / Convert.ToDouble(60)) + " hour(s)." : Convert.ToDouble(oTagDrugHeaderDetail.MinimumIntervalForPRN  / Convert.ToDouble(60)).toFixed(2) + " hour(s).";
                    sErrorMsg = oTagDrugHeaderDetail.DrugName + Resource.InfusionChart.LockIconToolTip + sAdminDate + Resource.InfusionChart.LockIconTimeToolTip + sTimetoPrescribe + Resource.InfusionChart.LockIconContinueToolTip;
                    this.ShowErrorMessage(sErrorMsg, MessageBoxButton.YesNo, MessageBoxType.Question,/*MsgBoxTag:*/CConstants.PRNLockWarning,/*MsgBoxHeight:*/160,/*MsgBoxWidth:*/400);
                    return false;
                }
                let nParaAdminCnt: number = 0;
                if (this.objInfusionChartVM.MedicationAdminBaseVM != null && this.objInfusionChartVM.MedicationAdminBaseVM.CumulativeParacetamol.ParacetamolAdministeredCount.HasValue) {
                    nParaAdminCnt = this.objInfusionChartVM.MedicationAdminBaseVM.CumulativeParacetamol.ParacetamolAdministeredCount.Value;
                }
                if (oTagDrugHeaderDetail.IsParacetamolIngredient && nParaAdminCnt > 3 && (this.IsCumulativeWarningAcknowledged == null || (this.IsCumulativeWarningAcknowledged.HasValue && !this.IsCumulativeWarningAcknowledged.Value))) {
                    this.IsCumulativeWarningAcknowledged = false;
                    this.ShowErrorMessage(String.Format(Resource.MedsAdminChartToolTip.CumulativeWarningMsg, nParaAdminCnt), MessageBoxButton.YesNo, MessageBoxType.Question,/*MsgBoxTag:*/CConstants.CumulativeWarning,/*MsgBoxHeight:*/160,/*MsgBoxWidth:*/410);
                    return false;
                }
            }
        }
        return true;
    }
    oSlotHelper_TriggerParacetamolWarningEvent(bParacetamolAdministered: boolean): void {
        Busyindicator.SetStatusIdle("CheckParaAdministered");
        if (bParacetamolAdministered) {
            if (this.oClickedSlotTagObject != null && this.oClickedSlotTagObject.oChartCell != null && this.oClickedSlotTagObject.oChartCell.Tag != null && this.oClickedSlotTagObject.oChartCell.Tag instanceof INFRecordAdminParams) {
                (ObjectHelper.CreateType<INFRecordAdminParams>(this.oClickedSlotTagObject.oChartCell.Tag, INFRecordAdminParams)).IsAnyParacetamolAdministeredInGivenPeriod = bParacetamolAdministered;
            }
            this.ShowErrorMessage(Resource.MedicationAdministrator.ParacetamolAdministration_WarningMsg, MessageBoxButton.YesNo, MessageBoxType.Question,/*MsgBoxTag:*/CConstants.ParacetamolRecentlyAdministered,/*MsgBoxHeight:*/180,/*MsgBoxWidth:*/420);
        }
        else {
            this.sParacetamolRecentlyAdministered = 1;
            if (this.iMsgBox == null) {
                this.iMsgBox = new iMessageBox();
            }
            this.iMsgBox.Tag = CConstants.ParacetamolRecentlyAdministered;
            this.iMsgBox_MessageBoxClose(null, new MessageEventArgs(MessageBoxResult.Yes));
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
            if (MsgBoxHeight && MsgBoxHeight.HasValue)
                this.iMsgBox.Height = MsgBoxHeight.Value;
            if (MsgBoxWidth && MsgBoxWidth.HasValue)
                this.iMsgBox.Width = MsgBoxWidth.Value;
            this.iMsgBox.OverlayBrush = new SolidColorBrush(Colors.Transparent);
            this.iMsgBox.MessageBoxClose = (s, e) => { this.iMsgBox_MessageBoxClose(s, e); };
            this.iMsgBox.Show();
            // ObjectHelper.stopFinishAndCancelEvent(true);
        }
    }
    iMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        let IsInfRecAdminLaunched: boolean = false;
        // ObjectHelper.stopFinishAndCancelEvent(false);
        Busyindicator.SetStatusIdle("LaunchInfRecAdmin");
        this.objInfusionChartVM.CurrentActivityCode = ActivityCode.RecordAdmin;
        let isParacetamolMsg: boolean = this.iMsgBox != null && typeof this.iMsgBox.Tag === "string" && String.Compare(this.iMsgBox.Tag.ToString(), CConstants.ParacetamolRecentlyAdministered) == 0;
        if (e.MessageBoxResult == MessageBoxResult.Yes) {
            let isCumulativeMsg: boolean = this.iMsgBox != null && typeof this.iMsgBox.Tag === "string" && String.Compare(this.iMsgBox.Tag.ToString(), CConstants.CumulativeWarning) == 0;
            if (isCumulativeMsg)
                this.IsCumulativeWarningAcknowledged = true;
            if (isParacetamolMsg) {
                this.sParacetamolRecentlyAdministered = 1;
            }
            if (this.oClickedSlotTagObject != null && this.oClickedSlotTagObject.oDrugItem != null && this.CheckValidation(this.oClickedSlotTagObject)) {
                this.LaunchMezzanine(this.oClickedSlotTagObject);
                this.IsDiscontinuedErrorMsgExists = false;
                IsInfRecAdminLaunched = true;
            }
        }
        else if (e.MessageBoxResult == MessageBoxResult.OK) {
            let isInfusionAlertExists: boolean = this.iMsgBox != null && typeof this.iMsgBox.Tag === "string" && String.Compare(this.iMsgBox.Tag.ToString(), CConstants.InfusionWarning) == 0;
            if (isInfusionAlertExists) {
                let isCumulativeMsg: boolean = this.iMsgBox != null && typeof this.iMsgBox.Tag === "string" && String.Compare(this.iMsgBox.Tag.ToString(), CConstants.CumulativeWarning) == 0;
                if (isCumulativeMsg)
                    this.IsCumulativeWarningAcknowledged = true;
                if (this.oClickedSlotTagObject != null && this.oClickedSlotTagObject.oDrugItem != null && this.CheckValidation(this.oClickedSlotTagObject) && this.IsMixedMultiRoutePlannedOrInprogress(this.oClickedSlotTagObject)) {
                    this.LaunchMezzanine(this.oClickedSlotTagObject);
                    this.IsDiscontinuedErrorMsgExists = false;
                    IsInfRecAdminLaunched = true;
                }
            }
            else {
                let IsAmendCompletedStatus: boolean = this.iMsgBox != null && typeof this.iMsgBox.Tag === "string" && String.Equals(this.iMsgBox.Tag.ToString(), CConstants.sAmendedCompletedWarMsg);
                if (IsAmendCompletedStatus) {
                    this.LaunchMezzanine(this.oClickedSlotTagObject);
                    IsInfRecAdminLaunched = true;
                }
            }
        }
        else {
            if (isParacetamolMsg) {
                this.sParacetamolRecentlyAdministered = -1;
            }
        }
        if (!IsInfRecAdminLaunched) {
            this.objInfusionChartVM.CurrentActivityCode = ActivityCode.None;
            Busyindicator.SetStatusIdle("LaunchInfRecAdmin");
        }
    }
    private IsMixedMultiRoutePlannedOrInprogress(TagObject: InfusionTagObject): boolean {
        if (TagObject != null && TagObject.oDrugItem != null && TagObject.oDrugItem.Tag != null && TagObject.oChartCell != null && TagObject.oChartCell.Tag != null) {
            let oTagDrugHeaderDetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(TagObject.oDrugItem.Tag, TagDrugHeaderDetail);
            let oINFRecordAdminParams: INFRecordAdminParams = ObjectHelper.CreateType<INFRecordAdminParams>(TagObject.oChartCell.Tag, INFRecordAdminParams);
            if (oTagDrugHeaderDetail != null && oINFRecordAdminParams != null && oTagDrugHeaderDetail.MultiRoute_Type == MultiRouteType.Mixed_Routes && (String.Equals(oINFRecordAdminParams.SlotStatus, SlotStatus.PLANNED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(oINFRecordAdminParams.SlotStatus, SlotStatus.INPROGRESS, StringComparison.CurrentCultureIgnoreCase))) {
                return true;
            }
            else if (oTagDrugHeaderDetail != null && oINFRecordAdminParams != null && oTagDrugHeaderDetail.MultiRoute_Type != MultiRouteType.Mixed_Routes) {
                return true;
            }
        }
        return false;
    }
    private IsPreviousInProgressInfusionExists(TagObject: InfusionTagObject, oClickedINFRecordAdminParams: INFRecordAdminParams, oTagDrugHeaderDetail: TagDrugHeaderDetail): boolean {
        let IsPreviousInprogressInfusionFound: boolean = false;
        this.InProgressScheduledDTTM = DateTime.MinValue;
        let RowIndex = this.InfusionChartControl.ChartRows.Where(c => c.DrugItem.Key == TagObject.oDrugItem.Key).Select(s => s.RowIndex).FirstOrDefault();
        if (this.InfusionChartControl.ChartRows.Count > 0) {
            let CurrentSlotDetail = this.InfusionChartControl.ChartRows[RowIndex].InfusionChartCells.Where(c => c.CLines.Count > 0);
            if (CurrentSlotDetail != null && CurrentSlotDetail.Count() > 0) {
                if (oClickedINFRecordAdminParams != null) {
                    for (let i: number = 0; i < CurrentSlotDetail.Count(); i++) {
                        let oInfusionChartCell = CurrentSlotDetail[i];
                        let objINFRecordAdminParams: INFRecordAdminParams = ObjectHelper.CreateType<INFRecordAdminParams>(oInfusionChartCell.Tag, INFRecordAdminParams);
                        if (DateTime.LessThan(objINFRecordAdminParams.ScheduledDTTM , oClickedINFRecordAdminParams.ScheduledDTTM) && (objINFRecordAdminParams.SlotStatus == SlotStatus.INPROGRESS || objINFRecordAdminParams.SlotStatus == SlotStatus.PAUSED)) {
                            IsPreviousInprogressInfusionFound = true;
                            this.InProgressScheduledDTTM = objINFRecordAdminParams.ScheduledDTTM;
                            break;
                        }
                    }
                }
                else {
                    for (let i: number = 0; i < CurrentSlotDetail.Count(); i++) {
                        let oInfusionChartCell = CurrentSlotDetail[i];
                        let objINFRecordAdminParams: INFRecordAdminParams = ObjectHelper.CreateType<INFRecordAdminParams>(oInfusionChartCell.Tag, INFRecordAdminParams);
                        if (oInfusionChartCell.ColIndex < TagObject.oChartCell.ColIndex && (objINFRecordAdminParams.SlotStatus == SlotStatus.INPROGRESS || objINFRecordAdminParams.SlotStatus == SlotStatus.PAUSED)) {
                            IsPreviousInprogressInfusionFound = true;
                            this.InProgressScheduledDTTM = objINFRecordAdminParams.ScheduledDTTM;
                            break;
                        }
                    }
                }
            }
        }
        if (!IsPreviousInprogressInfusionFound) {
            let oSelectedItem = this.oResponseInfusionChart.InfusionChatView.DrugDetail.Where(oItem => oItem.DrugHeader.PrescriptionItemOID == oTagDrugHeaderDetail.PrescriptionItemOID).Select(oItem => oItem);
            if (oSelectedItem != null && oSelectedItem.Count() > 0) {
                let objDrugDetail: DrugDetail = oSelectedItem.First();
                if (oClickedINFRecordAdminParams != null) {
                    let objSlotDetail = objDrugDetail.SlotDetails.Where(oItem => oItem.ScheduledDTTM != oClickedINFRecordAdminParams.ScheduledDTTM && (oItem.Status == SlotStatus.INPROGRESS || oItem.Status == SlotStatus.PAUSED)).Select(oItem => oItem);
                    if (objSlotDetail != null && objSlotDetail.Count() > 0) {
                        IsPreviousInprogressInfusionFound = true;
                        this.InProgressScheduledDTTM = objSlotDetail.First().ScheduledDTTM;
                    }
                }
                else { 
                    let objSlotDetail = objDrugDetail.SlotDetails.Where(oItem => oItem.Status == SlotStatus.INPROGRESS || oItem.Status == SlotStatus.PAUSED).Select(oItem => oItem);
                    if (objSlotDetail != null && objSlotDetail.Count() > 0) {
                        IsPreviousInprogressInfusionFound = true;
                        this.InProgressScheduledDTTM = objSlotDetail.First().ScheduledDTTM;
                    }
                }
            }
        }
        return IsPreviousInprogressInfusionFound;
    }
    private LaunchMezzanine(TagObject: InfusionTagObject): void {
        if (TagObject != null && TagObject.oDrugItem != null && TagObject.oDrugItem.Tag != null) {
            let oTagDrugHeaderDetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(TagObject.oDrugItem.Tag, TagDrugHeaderDetail);
            this.oInfRecAdminTypeCode = new InfRecAdminTypeCode();
            this.oInfusionRecAdminHelper = new InfusionRecAdminHelper();
            this.oInfusionRecAdminHelper.oIChartSlot = TagObject;
            this.oInfChartAlerts = new ArrayOfString();
            this.PrescItemOID = oTagDrugHeaderDetail.PrescriptionItemOID > 0 ? oTagDrugHeaderDetail.PrescriptionItemOID : 0;
            this.OnInfRecordAdminFinishCallback = (s, e) => { this.OnInfRecordAdminFinish(s, e) };
            if (TagObject != null && TagObject.oChartCell != null && TagObject.oChartCell.Tag != null && oTagDrugHeaderDetail != null || (oTagDrugHeaderDetail.IsPRN && TagObject.oChartCell.Tag != null)) {
                this.objINFRecAdminParams = ObjectHelper.CreateType<INFRecordAdminParams>(TagObject.oChartCell.Tag, INFRecordAdminParams);
                if (oTagDrugHeaderDetail != null && this.objINFRecAdminParams != null) {
                    if (oTagDrugHeaderDetail.InfChartAlerts != null && oTagDrugHeaderDetail.InfChartAlerts.Count > 0) {
                        this.oInfChartAlerts = oTagDrugHeaderDetail.InfChartAlerts;
                    }
                    this.oInfRecAdminTypeCode.TypeCode = oTagDrugHeaderDetail.InfusionRecordAdminTypeCode;
                    this.oInfRecAdminTypeCode.NextPrescOID = oTagDrugHeaderDetail.AmendedParentPrescriptionItemOID > 0 ? oTagDrugHeaderDetail.AmendedParentPrescriptionItemOID : 0;
                    this.InfCALaunch = CALaunch.InfusionChart;
                    let RowIndex = this.InfusionChartControl.ChartRows.Where(c => c.DrugItem.Key == TagObject.oDrugItem.Key).Select(s => s.RowIndex).FirstOrDefault();
                    let NextHomeLeaveSlotExists = this.oResponseInfusionChart.InfusionChatView.DrugDetail[RowIndex].SlotDetails.Where(x => x.ScheduledDTTM > this.objINFRecAdminParams.ScheduledDTTM && x.Status.Equals(SlotStatus.HOMELEAVE, StringComparison.InvariantCultureIgnoreCase)).ToList();
                    let NextAdministerSlotExists = this.oResponseInfusionChart.InfusionChatView.DrugDetail[RowIndex].SlotDetails.Where(x => x.ScheduledDTTM > this.objINFRecAdminParams.ScheduledDTTM && x.AdministrationDetail != null && x.AdministrationDetail.AdministeredDate != DateTime.MinValue && x.AdministrationDetail.AdministeredDate <= CommonBB.GetServerDateTime()).ToList();
                    if ((NextHomeLeaveSlotExists != null && NextHomeLeaveSlotExists.Count > 0) || (NextAdministerSlotExists != null && NextAdministerSlotExists.Count > 0)) {
                        this.oInfusionRecAdminHelper.IsNextHomeLeaveSlotExists = true;
                    }
                    if ((String.Equals(oTagDrugHeaderDetail.INFTYCODE, InfusionTypesCode.CONTINUOUS) || String.Equals(oTagDrugHeaderDetail.INFTYCODE, InfusionTypesCode.SINGLEDOSEVOLUME) || String.Equals(oTagDrugHeaderDetail.INFTYCODE, InfusionTypesCode.FLUID)) && this.oResponseInfusionChart.InfusionChatView.DrugDetail != null && this.oResponseInfusionChart.InfusionChatView.DrugDetail.Count > 0 && this.oResponseInfusionChart.InfusionChatView.DrugDetail[RowIndex].DrugHeader.FormViewParameters.IntravenousInfusionData.SequenceParentPrescItemOID > 0 && this.oResponseInfusionChart.InfusionChatView.DrugDetail[RowIndex].DrugHeader.FormViewParameters.IntravenousInfusionData.SeqInfOrderForPervImmediateItm > 0) {
                        let _ParentPrescriptionOID = this.oResponseInfusionChart.InfusionChatView.DrugDetail[RowIndex].DrugHeader.FormViewParameters.IntravenousInfusionData.SequenceParentPrescItemOID;
                        let _CurrentPrescriptionItemOID: number = this.oResponseInfusionChart.InfusionChatView.DrugDetail[RowIndex].DrugHeader.PrescriptionItemOID;
                        let _CurrentItemSequenceOrder: number = this.oResponseInfusionChart.InfusionChatView.DrugDetail[RowIndex].DrugHeader.FormViewParameters.IntravenousInfusionData.SeqInfOrderForPervImmediateItm;
                        let _InfusionsPartOfSequence = this.oResponseInfusionChart.InfusionChatView.DrugDetail.Where(x => x.DrugHeader.FormViewParameters.IntravenousInfusionData.SequenceParentPrescItemOID == _ParentPrescriptionOID);
                        let _IsAllowStrikeout: boolean = false;
                        if (oTagDrugHeaderDetail.PrescriptionItemOID > 0 && !String.IsNullOrEmpty(oTagDrugHeaderDetail.PrescriptionItemStatus) && (String.Equals(oTagDrugHeaderDetail.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) || String.Equals(oTagDrugHeaderDetail.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase) || String.Equals(oTagDrugHeaderDetail.PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.InvariantCultureIgnoreCase))) {
                            _IsAllowStrikeout = _InfusionsPartOfSequence.Any(c => c.DrugHeader.AmendedPrescriptionItemOID > 0 && c.DrugHeader.AmendedPrescriptionItemOID == oTagDrugHeaderDetail.PrescriptionItemOID);
                        }
                        let _NextImmediateItem: DrugDetail = _InfusionsPartOfSequence.Where(x => !String.Equals(x.DrugHeader.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(x.DrugHeader.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(x.DrugHeader.PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.InvariantCultureIgnoreCase) && x.DrugHeader.FormViewParameters.IntravenousInfusionData.SeqInfOrderForPervImmediateItm > _CurrentItemSequenceOrder).FirstOrDefault();
                        let _canBeStruckThorugh: boolean = false;
                        if (!_IsAllowStrikeout && _NextImmediateItem != null && _NextImmediateItem.SlotDetails != null && _NextImmediateItem.SlotDetails.Count > 0) {
                            let IsNonPlannedSlotExist: boolean = _NextImmediateItem.SlotDetails.Any(_SlotStatus => (_SlotStatus.Status != null) && (_SlotStatus.Status != SlotStatus.PLANNED) && (_SlotStatus.Status != SlotStatus.OVERDUE) && (_SlotStatus.Status != SlotStatus.DUENOW) && (_SlotStatus.Status != SlotStatus.NOTYETRECORDED) && (_SlotStatus.Status != SlotStatus.NOTKNOWN));
                            _canBeStruckThorugh = (IsNonPlannedSlotExist ? false : true);
                        }
                        else {
                            _canBeStruckThorugh = true;
                        }
                        if (_NextImmediateItem != null) {
                            oTagDrugHeaderDetail.SequentialPrescriptionItemOID = _NextImmediateItem.DrugHeader.PrescriptionItemOID;
                            oTagDrugHeaderDetail.InfusionRecordAdminTypeCode = InfusionRecordAdminTypeCodes.ContinuousSequentialAdministration;
                        }
                        if (oTagDrugHeaderDetail.InfusionRecordAdminTypeCode > 0) {
                            this.oInfRecAdminTypeCode.TypeCode = oTagDrugHeaderDetail.InfusionRecordAdminTypeCode;
                            this.oInfRecAdminTypeCode.NextPrescOID = oTagDrugHeaderDetail.SequentialPrescriptionItemOID > 0 ? oTagDrugHeaderDetail.SequentialPrescriptionItemOID : 0;
                        }
                        this.oInfusionRecAdminHelper.LaunchRecordadmininfusion(this.objINFRecAdminParams, 0, this.PrescItemOID, this.oInfChartAlerts, this.OnInfRecordAdminFinishCallback, this.IsAlertShown, _canBeStruckThorugh, this.oInfRecAdminTypeCode, this.InfCALaunch);
                        this.IsAlertShown = true;
                    }
                    else {
                        this._canBeStruckThorugh = true;
                        if (this.IsRestrosPRN && oTagDrugHeaderDetail.IsPRNWithSchedule)
                            this.oInfRecAdminTypeCode.TypeCode = InfusionRecordAdminTypeCodes.IsRetrospectivePRN;
                        this.oInfusionRecAdminHelper.LaunchRecordadmininfusion(this.objINFRecAdminParams, 0, this.PrescItemOID, this.oInfChartAlerts, this.OnInfRecordAdminFinishCallback, this.IsAlertShown, this._canBeStruckThorugh, this.oInfRecAdminTypeCode, this.InfCALaunch);
                        this.IsAlertShown = true;
                    }
                }
            }
            else {
                this._canBeStruckThorugh = true;
                this.objINFRecAdminParams = null;
                if (oTagDrugHeaderDetail != null && oTagDrugHeaderDetail.IsPRN) {
                    oTagDrugHeaderDetail.InfusionRecordAdminTypeCode = InfusionRecordAdminTypeCodes.AsRequiredAdministration;
                    if (!this.IsRestrosPRN)
                        this.oInfRecAdminTypeCode.TypeCode = InfusionRecordAdminTypeCodes.AsRequiredAdministration;
                    else this.oInfRecAdminTypeCode.TypeCode = InfusionRecordAdminTypeCodes.IsRetrospectivePRN;
                    this.oInfRecAdminTypeCode.NextPrescOID = 0;
                    this.InfCALaunch = CALaunch.InfusionChart;
                    this.oInfusionRecAdminHelper.LaunchRecordadmininfusion(this.objINFRecAdminParams, 0, this.PrescItemOID, this.oInfChartAlerts, this.OnInfRecordAdminFinishCallback, this.IsAlertShown, this._canBeStruckThorugh, this.oInfRecAdminTypeCode, this.InfCALaunch);
                    this.IsAlertShown = true;
                }
            }
        }
    }
    cmdShowLegend_Click(): void {
        // this.cmdShowLegend.IsHitTestVisible = false;
        // let btnLegend: iButton = ObjectHelper.CreateType<iButton>(sender, iButton);
        // let btnTop: number;
        // if (btnLegend != null && this.LgndClickCount % 2 == 0) {
        // this.SeedCanvas.Visibility = Visibility.Visible;
        // TransformToVisual not supported : as discussed with Shiva. might revisit once it see actual screen
        // let gt: GeneralTransform = btnLegend.TransformToVisual(this);
        // let btnOffset: Point =  gt.Transform(new Point(0, 0));
        // btnTop = btnOffset.y;
        // let height: number = btnTop - 338;
        // this.SeedCanvas.Margin = new Thickness(150, height, 0, 0);

        // this.LegendsLayoutRoot.Visibility = Visibility.Visible;
        // this.NotGivenReasonsLayoutRoot.Visibility = Visibility.Collapsed;
        this.LegendsVisibility = true;
        this.NotGivenReasonsVisibility = false;
        this.showPopup = !this.showPopup;
        //  }
    }
    LegendsVisibility: boolean = false;
    NotGivenReasonsVisibility: boolean = false;
    popupcan_Opened(sender: Object, e: EventArgs): void {
        this._PopupParent = InfusionChartView.FindHighestAncestor(this.popup);
        if (this._PopupParent == null) {
            return
        }
        this.LgndClickCount++;
        //this._PopupParent.AddHandler(PopUp.MouseLeftButtonDownEvent, (s,e) => {this.popup_MouseLeftButtonDown(s,e);}, true);
    }
    popupcan_Closed(sender: Object, e: EventArgs): void {
        if (this._PopupParent == null) {
            return
        }
        this.LgndClickCount--;
        //this._PopupParent.RemoveHandler(PopUp.MouseLeftButtonDownEvent, this.popup_MouseLeftButtonDown);
        this.cmdShowLegend.IsHitTestVisible = true;
    }
    popup_MouseLeftButtonDown(sender: Object, e: MouseButtonEventArgs): void {
        //as discussed with shiva not required. Still need to revisit if it really required
        // let storyboard = ObjectHelper.CreateObject(new Storyboard(), { Duration: TimeSpan.Zero });
        //   let objectAnimation = ObjectHelper.CreateObject(new ObjectAnimationUsingKeyFrames(), { Duration: TimeSpan.Zero });
        //   objectAnimation.KeyFrames.Add(ObjectHelper.CreateObject(new DiscreteObjectKeyFrame(), { KeyTime: KeyTime.FromTimeSpan(TimeSpan.Zero), Value: false }));
        //   Storyboard.SetTarget(objectAnimation, this.popup);
        //   Storyboard.SetTargetProperty(objectAnimation, new PropertyPath("IsOpen"));
        //   storyboard.Children.Add(objectAnimation);
        //   storyboard.Begin();
    }
    private static FindHighestAncestor(popup: any): FrameworkElement {
        let ancestor = <FrameworkElement>popup;
        while (true) {
            let parent = ObjectHelper.CreateType<FrameworkElement>(VisualTreeHelper.GetParent(ancestor), FrameworkElement);
            if (parent == null) {
                return ancestor;
            }
            ancestor = parent;
        }
    }
    ispopuplinkClicked: boolean= false;
    notGivenLegendIcon_Click(): void {
        // this.LegendsLayoutRoot.Visibility = Visibility.Collapsed;
        // this.NotGivenReasonsLayoutRoot.Visibility = Visibility.Visible;
        this.LegendsVisibility = false;
        this.NotGivenReasonsVisibility = true;
        this.ispopuplinkClicked = true;
    }
    LegendsIcon_Click(): void {
        // this.LegendsLayoutRoot.Visibility = Visibility.Visible;
        // this.NotGivenReasonsLayoutRoot.Visibility = Visibility.Collapsed;
        this.LegendsVisibility = true;
        this.NotGivenReasonsVisibility = false;
        this.ispopuplinkClicked = true;
    }
    @HostListener("document:keydown", ["$event"])
  public keydown(event: KeyboardEvent): void {
    if (event.code === "Escape") {
        this.showPopup = false;
        this.ispopuplinkClicked = false;
    }
  }

  @HostListener("document:click", ["$event"])
  public documentClick(event: KeyboardEvent): void {
    if (!(this.cmdShowLegend.searchElement.nativeElement.contains(event.target) ||
       (this.popup ? this.popup.contentContainer.nativeElement.contains(event.target) : false))) {
        if(this.ispopuplinkClicked)
            this.ispopuplinkClicked = false;
        else            
            this.showPopup = false;
    }
  }
    txtBarcode_KeyDown(e): void {
                let oManageBarcodeHelper: ManageBarcodeHelper = new ManageBarcodeHelper();
            let lnPrescriptionItemScheduleOID: number = 0;
            oManageBarcodeHelper.GetPatientQuickSearchDetails(e.target.value, lnPrescriptionItemScheduleOID);
            setTimeout(() => {
                e.target.value = String.Empty;
            }, 400);
    }
    public cmdWristbandScan_Click(): void {
        this.txtBarcode.nativeElement.focus();        
    }
    public barcodeStyleFocus = false;
    public txtBarcode_LostFocus(e): void {
        e.target.value = String.Empty;
        this.barcodeStyleFocus = false;
  }
  public txtBarcode_GotFocus(e): void {
    e.target.value = String.Empty;
    this.barcodeStyleFocus = true;
}
    public DisposeObjectsOnFinish(): void {
        this.DisposeFormEvents();
        this.DisposeFormObjects();
    }
    private DisposeFormEvents(): void {
        if (this.objInfusionChartHelper != null) {
            this.objInfusionChartHelper.OnInfusionChartLoadCompleted = null;
        }
        if (this.objInfusionChartVM != null) {
            this.objInfusionChartVM.OnPropertyChanged = null;
            this.objInfusionChartVM.OnGetInfusionChartData = null;
            if (this.objInfusionChartVM.MedicationAdminBaseVM != null && this.objInfusionChartVM.MedicationAdminBaseVM.CumulativeParacetamol != null) {
                this.objInfusionChartVM.MedicationAdminBaseVM.CumulativeParacetamol.RefreshCumulativeWarningEvent = null;
            }
        }
        if (this.objpgdadminstrationvm != null) {
            this.objpgdadminstrationvm.IsPGDListAvailableEvent = null;
            this.objpgdadminstrationvm.CheckRecordPGDEvent = null;
        }
        if (this.InfusionChartControl != null) {
            this.InfusionChartControl.OnChartHotSpotClick = null;
            this.InfusionChartControl.OnDrugHotSpotClick = null;
            this.InfusionChartControl.OnPreviousClick = null;
            this.InfusionChartControl.OnNextClick = null;
            this.InfusionChartControl.OnNextClickComplete = null;
            this.InfusionChartControl.OnPreviousClickComplete = null;
            this.InfusionChartControl.OnErrorLog = null;
        }
        if (this.iMsgBox != null) {
            this.iMsgBox.MessageBoxClose = (s, e) => { this.iMsgBox_MessageBoxClose(s, e); };
        }
    }
    public DisposeFormObjects(): void {
        this._PopupParent = null;
        this.objInfusionChartHelper = null;
        this.objInfusionChartVM = null;
        this._previousAlertStatus = null;
        this.InfusionChartControl = null;
        this.oResponseInfusionChart = null;
        this.oSlotVM = null;
        this.oClickedSlotTagObject = null;
        this.oHdrRecordAdmin = null;
        this.oInfusionRecAdminHelper = null;
        this.objINFRecAdminParams = null;
        this.oInfChartAlerts = null;
        this.ParaChangedEvent = null;
        this.PropertyChanged = null;
        this.oInfRecAdminTypeCode = null;
        this.OnGetInfusionChartDataEvent = null;
        this.OnChartHotSpotClickEvent = null;
        this.OnDrugHotSpotClickEvent = null;
        this.OnPreviousClickEvent = null;
        this.OnNextClickEvent = null;
        this.OnNextClickCompleteEvent = null;
        this.OnPreviousClickCompleteEvent = null;
        this.OnErrorEvent = null;
        this.iMsgBox = null;
    }
    openRecordAdmin() {

        //revisit

        this.oInfusionRecAdminHelper = new InfusionRecAdminHelper();

        let objINFRecAdminParams: INFRecordAdminParams = {

            "SlotOID": 700002462869,

            "SlotStatus": "CC_DUE",

            "ScheduledDTTM": new DateTime(2023, 6, 15, 14, 4),

            "IsAnyParacetamolAdministeredInGivenPeriod": false

        };

        let PrescItemOID = 1000000043139;

        let oInfChartAlerts: ArrayOfString = new ArrayOfString([]);

        let oInfRecAdminTypeCode: InfRecAdminTypeCode = new InfRecAdminTypeCode();

        oInfRecAdminTypeCode.NextPrescOID = 0;

        oInfRecAdminTypeCode.TypeCode = 0;




        this.oInfusionRecAdminHelper.LaunchRecordadmininfusion(objINFRecAdminParams, 0, PrescItemOID, oInfChartAlerts, null, true, true, oInfRecAdminTypeCode, CALaunch.InfusionChart);




    }
}
