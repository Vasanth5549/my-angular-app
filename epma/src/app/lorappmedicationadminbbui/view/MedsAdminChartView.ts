import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity, ScriptObject, iBusyIndicator, AppLoadService, BusyIndicator } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, Visibility, ChildWindow, List, ObservableCollection, HtmlPage, IEnumerable, Random } from 'epma-platform/models';
import { AppDialog, Border, Colors, EventArgs, FontWeights, FrameworkElement, Grid, HeaderImageAlignment, HeaderImageListItem, HorizontalAlignment, KeyEventArgs, MouseButtonEventArgs, SolidColorBrush, StackPanel, TextBlock, UserControl, VerticalAlignment, iButton, iLabel, iTab, iTabItem, iTextBox } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime, { DateTimeKind, DateTimeStyles } from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { Common, EventsWithNotKnownStatus, MedsAdminCommonData } from '../utilities/common';
import { iMedicationChart } from 'src/app/lorarcbluebirdmedicationchart/iMedicationChart/iMedicationChart.component';
import { CommPrescriptionItemViewVM } from 'src/app/lorappmedicationcommonbb/viewmodel/prescriptionitemviewvm';
import { GetMedsChartData } from '../common/getmedschartdata';
import { ChartContext, MedChartData, TagDrugHeaderDetail, TagSlotDetail, ValueDomainValues } from '../utilities/globalvariable';
import { TagObject } from 'src/app/lorarcbluebirdmedicationchart/common/TagObject';
import { PGDAdminstrationVM } from '../viewmodel/pgdvm';
import { InfRecAdmContDefer } from '../child/InfRecAdmContDefer';
import {
    Align,
    AnimationDirection,
    AnimationType,
    Offset,
    PopupAnimation,
    PopupComponent,
} from '@progress/kendo-angular-popup';
import { MedsAdminManageSelfAdminChild } from '../child/MedsAdminManageSelfAdminChild';
import { AdministrationDetailVM, SlotDetailVM } from '../viewmodel/MedicationChartVM';
import { MedicationAdminVM } from '../ca/medicationadmin/medicationadminvm';
import { MedTitratedDose } from 'src/app/lorappmedicationcommonbb/view/medtitrateddose';
//import { MedsAdminStrikethrough } from '../child/MedsAdminStrikethrough';
//import { MedsAdminModifyOrStrikethrough } from '../child/MedsAdminModifyOrStrikethrough';
import { MedsAdminMultiSlot } from '../child/MedsAdminMultiSlot';
import { MedsAdminPRNSlot } from '../child/MedsAdminPRNSlot';
import { MedsRecordAdminstrator } from '../child/medsadminrecordadmin';
import { InfRecAdmGasBegun } from '../child/InfRecAdmGasBegun';
import { medMCItems } from 'src/app/lorappmedicationcommonbb/view/medmcitems';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
//import { MedsAdminSlotHistory } from 'src/app/lorappmedicationcommonbb/child/MedsAdminSlotHistory';
// import { MedRequestCA } from '../MedRequestCA';
import { RowDefinition } from 'src/app/shared/epma-platform/controls/epma-grid/epma-grid.component';
import { ProfileData, UserPermissions } from '../utilities/ProfileData';
import { CConstants, ChartType, DoseTypeCode, LaunchAdminType, MedAction, MedImage, MedImages, MultiRouteType, PrescriptionTypes, PrescriptionTypesMenuCode, RecordAdminType, SlotStatus, SlotStatusText } from '../utilities/CConstants';
import { AppContextInfo, AppSessionInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { MultipleDoseDetail, PrescriptionItemDetailsVM } from 'src/app/lorappmedicationcommonbb/viewmodel/prescriptionitemdetailsvm';
import { MedicationAdministrator } from '../resource/medicationadministrator.designer';
import { RoutedEventArgs, Thickness } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { MedicationCommonProfileData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { ChartRow } from 'src/app/lorarcbluebirdmedicationchart/common/ChartRow';
import { ChartIcon } from 'src/app/lorarcbluebirdmedicationchart/common/ChartIcon';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { MedDoseDetails } from 'src/app/lorappmedicationcommonbb/view/meddosedetails';
import { AdministratedSlot } from 'src/app/lorarcbluebirdmedicationchart/common/AdministratedSlot';
import { TodayAsRequiredSlot } from 'src/app/lorarcbluebirdmedicationchart/common/TodayAsRequiredSlot';
import * as ResourceCommonBB from 'src/app/lorappmedicationcommonbb/resource/dosecalculator.designer';
import { Resource } from '../resource';
import { TodayMultiSlot } from 'src/app/lorarcbluebirdmedicationchart/common/TodayMultiSlot';
import { DefaultSlot } from 'src/app/lorarcbluebirdmedicationchart/common/DefaultSlot';
import { MedsAdminChartToolTip } from '../resource/medsadmincharttooltip.designer';
import { MedsAdminMainView } from './MedsAdminMainView';
import { AdministrationDetail, CResMsgRecordPGD, Encounter } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { PrescriptionItemViewVM } from '../viewmodel/PrescriptionItemViewVM';
import { AsRequiredSlot } from 'src/app/lorarcbluebirdmedicationchart/common/AsRequiredSlot';
import { SlotAdministrationHelper } from '../common/slotadministrationhelper';
import { BlankSlot } from 'src/app/lorarcbluebirdmedicationchart/common/BlankSlot';
import { SVIconLaunchFrom } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { ConditionalDoseVM, RequestSource } from 'src/app/lorappmedicationcommonbb/viewmodel/ConditionalDoseVM';
import { CDrugHdrAddnlInfo, CDrugHeader, DrugHeader, DrugHeaderItem } from '../common/drugheader';
//import { ModifyStrikethroughLink } from '../child/ModifyStrikethroughLink';
import { IChartSlot } from 'src/app/lorarcbluebirdmedicationchart/common/IChartSlot';
import { MedsAdminMultiSlotVM, SelfAdminDrugDetailVM } from '../viewmodel/MedsAdminVM';
import { ChartStringIcon } from 'src/app/lorarcbluebirdmedicationchart/common/ChartStringIcon';
import * as Application from '../../lorappcommonbb/amshelper';
import { RecordPGD } from '../child/recordpgd';
import { CReqMsgGetClinicalEncountersDetail, GetClinicalEncountersDetailCompletedEventArgs, IPPMAManagePrescriptionWSSoapClient } from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { LockedUsersDetails, MedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { MedConditionalDose } from 'src/app/lorappmedicationcommonbb/view/medconditionaldose';
import { CCommSequentialHelper } from 'src/app/lorappmedicationcommonbb/utilities/CSequentialHelper';
import { CultureInfo, IFormatProvider, VisualTreeHelper, WizardType } from 'src/app/shared/epma-platform/models/eppma-common-types';
import { ManageBarcodeHelper } from '../common/ManageBarcodeHelper';
import { PropertyChangedEventArgs } from 'src/app/shared/epma-platform/controls/epma-tab/epma-tab.component';
// import { MedsadminModifyorstrikethroughComponent } from '../child/medsadmin-modifyorstrikethrough/medsadmin-modifyorstrikethrough.component';
// import { MedsadminStrikethroughComponent } from '../child/medsadmin-strikethrough/medsadmin-strikethrough.component';
// import { ModifyStrikethroughlinkComponent } from '../child/modify-strikethroughlink/modify-strikethroughlink.component';
import { Button } from '@progress/kendo-angular-buttons';
import { Canvas } from 'src/app/shared/epma-platform/controls/epma-canvas/epma-canvas.component';
import { ChartCell } from 'src/app/lorarcbluebirdmedicationchart/common/ChartCell';
import * as _ from 'lodash';
import { MedRequestCA } from './MedRequestCA';
import { MedsAdminSlotHistory } from 'src/app/lorappmedicationcommonbb/child/medsadminslothistory';
import { MedsAdminModifyOrStrikethrough } from '../child/MedsAdminModifyOrStrikethrough';
import { MedsAdminStrikethrough } from '../child/MedsAdminStrikethrough';
import { ModifyStrikethroughLink } from '../child/ModifyStrikethroughLink';
import { medddetailsChild } from 'src/app/lorappmedicationcommonbb/child/medddetailschild';
import { GridExtension } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { GridComponent } from '@progress/kendo-angular-grid';
import { MedsAdminDischgPrescriptions } from '../child/medsadmindischgprescriptions.component';
import { DrugItem } from 'src/app/lorarcbluebirdmedicationchart/common/DrugItem';
import { MedSteppedFullPrescriptionVW } from 'src/app/lorappmedicationcommonbb/view/medSteppedFullPrescriptionVW';
var that;

@Component({
    selector: 'MedsAdminChartView',
    templateUrl: './MedsAdminChartView.html',
    styleUrls: ['./MedsAdminChartView.css']
})
export class MedsAdminChartView extends UserControl implements AfterViewInit, OnDestroy {

    @Input() get isChildWizard(){
        return AppLoadService.isChildWizard;
    }

    CurrentSlotDate: string = "";
    medicationControlLoaded: boolean = false;
    override _DataContext: MedicationAdminVM;
    override get DataContext() {
        return this._DataContext;
    }
    @Input() override set DataContext(value: MedicationAdminVM) {
        this._DataContext = value;
    }

    public objTagcon: TagObject;
    oChartSlotType: IChartSlot
    oDefaultSlot: DefaultSlot;
    public oMedsAdminChart = Resource.MedsAdminChartToolTip;
    public oMedicationRequest = Resource.MedicationRequest;
    private LgndClickCount: number = 0;
    private _PopupParent: FrameworkElement;
    objStepped: MedSteppedFullPrescriptionVW;
    objMedsAdminCommonData: MedsAdminCommonData = null;
    lGroupSeqNo: number;
    objCommPrescriptionItemViewVM: CommPrescriptionItemViewVM;
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
    oGetMedsChartData: GetMedsChartData;
    dtCurrentDateTime: DateTime = CommonBB.GetServerDateTime();
    oTagSlotDetail: TagSlotDetail;
    oClickedSlotTagObject: TagObject;
    oTagDrugHeaderDetail: TagDrugHeaderDetail;
    static sDrugHeader: string = "Prescription item";
    static sDrugHeaderFormat: string = "dd-MMM-yyyy";
    static sDrugHdrFormatwithTime: string = "dd-MMM-yyyy HH:mm";
    static sDateFormat: string = "dd/MM/yyyy";
    static dTodayColWidth: number = 197;
    static dColWidth: number = 185;
    static dChartWidth: number = 970;
    static dChartHeight: number = 410;
    objpgdadminstrationvm: PGDAdminstrationVM;
    objpgdadminvm: PGDAdminstrationVM;
    objrecordadmininfsuion: InfRecAdmContDefer;
    objRecordPGD: RecordPGD;
    objMedsAdminSelfAdmin: MedsAdminManageSelfAdminChild;
    msg: iMessageBox;
    isClinEncMesToBeLaunchd: boolean = false;
    IsNextDueSlotExists: boolean = false;
    IsNextAdminSlotExists: boolean = false;
    sSlotStatus: string = String.Empty;
    sDose: string = String.Empty;
    sDoseUOM: string = String.Empty;
    sDoseUOMLzoID: string = String.Empty;
    lnDoseUOMOID: number = 0;
    sDurgName: string = String.Empty;
    oSlotVM: SlotDetailVM = null;
    IsTBDSlot: boolean = false;
    SlotTagObject: TagObject;
    dtSlotDateTime: DateTime = DateTime.MinValue;
    IsConflictsErrorMsgExists: boolean = false;
    IsSelfAdministeredErrorMsgExists: boolean = false;
    IsDiscontinuedErrorMsgExists: boolean = false;
    IsTitratedDoseEmptyErrMsgExists: boolean = false;
    IsOutsideAdminTimeErrMsgExists: boolean = false;
    IsAnotherAdminDueErrMsgExists: boolean = false;
    IsNotAllNotYetRecordedExists: boolean = false;
    IsCumulativeWarningAcknowledged: boolean;
    private IsSelectedSlotPGD: boolean = false;
    bIsOpenSecExists: boolean = false;
    //  ParaChangedEvent: Model.CumulativeAdministration.RefreshCumulativeWarning;
    ParaChangedEvent: Function;
    // InfAlertUnNoticedMsgEvent: MedicationAdminVM.InfAlertUnNoticedMsgDelegate;
    InfAlertUnNoticedMsgEvent: Function;
    oMedicationAdminVM: MedicationAdminVM;
    //#36484 below code is commented
    ddetChild: medddetailsChild;
    objTitrated: MedTitratedDose;
    oMAST: MedsAdminStrikethrough;
    oMAModorST: MedsAdminModifyOrStrikethrough;
    oChildWindow: ChildWindow;
    oMedsAdminMS: MedsAdminMultiSlot;
    oMedsAdminPRN: MedsAdminPRNSlot;
    oMedsAdminRec: MedsRecordAdminstrator;
    oMedsAdminRecinfusion: InfRecAdmContDefer;
    oMedsAdminSlotHistory: MedsAdminSlotHistory;
    objadmininmedicalgas: InfRecAdmGasBegun;
    oMedMCItems: medMCItems;
    MedRequestMed: MedRequestCA;
    isPrescribeLinkClicked: boolean = false;
    bIsAlrDefOverview: boolean = false;
    sPreviousSlotStatus: string = String.Empty;
    IsReqMedicationLaunched: boolean = false;
    IsTitratedIconClicked: boolean = false;
    isCloseToMidNightAlertForPRNShown: boolean;
    objPrescitemdetvm: PrescriptionItemDetailsVM;
    sParacetamolRecentlyAdministered: number = -1;
    _ISCanWithoutClerkPrompt: boolean = false;
    showPopup: boolean;
    oAddnlInfo: CDrugHdrAddnlInfo;

    public LayoutRoot: Grid = new Grid();
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    private RowChart: RowDefinition;
    @ViewChild("RowChartTempRef", { read: RowDefinition, static: false }) set _RowChart(c: RowDefinition) {
        if (c) { this.RowChart = c; }
    };
    private SeedCanvas: Canvas = new Canvas();
    @ViewChild("SeedCanvasTempRef", { read: Canvas, static: false }) set _SeedCanvas(c: Canvas) {
        if (c) { this.SeedCanvas = c; }
    };
    // private popup: PopupComponent;
    // @ViewChild("popupTempRef", { read: PopupComponent, static: false }) set _popup(c: PopupComponent) {
    //     if (c) { this.popup = c; }
    // };
    @ViewChild("popupTempRef", { read: ElementRef }) public popup: ElementRef;
    private Brd: Border;
    @ViewChild("BrdTempRef", { read: Border, static: false }) set _Brd(c: Border) {
        if (c) { this.Brd = c; }
    };
    private LayoutRoot1: Grid;
    @ViewChild("LayoutRoot1TempRef", { read: Grid, static: false }) set _LayoutRoot1(c: Grid) {
        if (c) { this.LayoutRoot1 = c; }
    };
    LegendsLayoutRoot: Grid = new Grid();
    @ViewChild("LegendsLayoutRootTempRef", { read: Grid, static: false }) set _LegendsLayoutRoot(c: Grid) {
        if (c) { this.LegendsLayoutRoot = c; }
    };
    private btnNotGivenReason: iButton;
    @ViewChild("btnNotGivenReasonTempRef", { read: iButton, static: false }) set _btnNotGivenReason(c: iButton) {
        if (c) { this.btnNotGivenReason = c; }
    };
    private cmdGiven: iButton;
    @ViewChild("cmdGivenTempRef", { read: iButton, static: false }) set _cmdGiven(c: iButton) {
        if (c) { this.cmdGiven = c; }
    };
    private cmdNotGiven: iButton;
    @ViewChild("cmdNotGivenTempRef", { read: iButton, static: false }) set _cmdNotGiven(c: iButton) {
        if (c) { this.cmdNotGiven = c; }
    };
    private cmdDiscontinue: iButton;
    @ViewChild("cmdDiscontinueTempRef", { read: iButton, static: false }) set _cmdDiscontinue(c: iButton) {
        if (c) { this.cmdDiscontinue = c; }
    };
    private cmdDiscrepancy: iButton;
    @ViewChild("cmdDiscrepancyTempRef", { read: iButton, static: false }) set _cmdDiscrepancy(c: iButton) {
        if (c) { this.cmdDiscrepancy = c; }
    };
    private cmdSelfAdmin: iButton;
    @ViewChild("cmdSelfAdminTempRef", { read: iButton, static: false }) set _cmdSelfAdmin(c: iButton) {
        if (c) { this.cmdSelfAdmin = c; }
    };
    private cmdPatientSelfAdmin: iButton;
    @ViewChild("cmdPatientSelfAdminTempRef", { read: iButton, static: false }) set _cmdPatientSelfAdmin(c: iButton) {
        if (c) { this.cmdPatientSelfAdmin = c; }
    };
    private cmdEarlyAdmin: iButton;
    @ViewChild("cmdEarlyAdminTempRef", { read: iButton, static: false }) set _cmdEarlyAdmin(c: iButton) {
        if (c) { this.cmdEarlyAdmin = c; }
    };
    private cmdLateAdmin: iButton;
    @ViewChild("cmdLateAdminTempRef", { read: iButton, static: false }) set _cmdLateAdmin(c: iButton) {
        if (c) { this.cmdLateAdmin = c; }
    };
    private cmdModify: iButton;
    @ViewChild("cmdModifyTempRef", { read: iButton, static: false }) set _cmdModify(c: iButton) {
        if (c) { this.cmdModify = c; }
    };
    private cmdMci: iButton;
    @ViewChild("cmdMciTempRef", { read: iButton, static: false }) set _cmdMci(c: iButton) {
        if (c) { this.cmdMci = c; }
    };
    private cmdPendingAdmin: iButton;
    @ViewChild("cmdPendingAdminTempRef", { read: iButton, static: false }) set _cmdPendingAdmin(c: iButton) {
        if (c) { this.cmdPendingAdmin = c; }
    };
    private cmdLegendRequestMedication: iButton;
    @ViewChild("cmdLegendRequestMedicationTempRef", { read: iButton, static: false }) set _cmdLegendRequestMedication(c: iButton) {
        if (c) { this.cmdLegendRequestMedication = c; }
    };
    private cmdLegendHomeLeave: iButton;
    @ViewChild("cmdLegendHomeLeaveTempRef", { read: iButton, static: false }) set _cmdLegendHomeLeave(c: iButton) {
        if (c) { this.cmdLegendHomeLeave = c; }
    };
    private cmdLegendMultiRoute: iButton;
    @ViewChild("cmdLegendMultiRouteTempRef", { read: iButton, static: false }) set _cmdLegendMultiRoute(c: iButton) {
        if (c) { this.cmdLegendMultiRoute = c; }
    };
    private cmdLegendUnacknowledgedConflicts: iButton;
    @ViewChild("cmdLegendUnacknowledgedConflictsTempRef", { read: iButton, static: false }) set _cmdLegendUnacknowledgedConflicts(c: iButton) {
        if (c) { this.cmdLegendUnacknowledgedConflicts = c; }
    };
    private cmdLegendDoseCalculator: iButton;
    @ViewChild("cmdLegendDoseCalculatorTempRef", { read: iButton, static: false }) set _cmdLegendDoseCalculator(c: iButton) {
        if (c) { this.cmdLegendDoseCalculator = c; }
    };
    private cmdLegendOmitted: iButton;
    @ViewChild("cmdLegendOmittedTempRef", { read: iButton, static: false }) set _cmdLegendOmitted(c: iButton) {
        if (c) { this.cmdLegendOmitted = c; }
    };
    private cmdLegendDoseDetails: iButton;
    @ViewChild("cmdLegendDoseDetailsTempRef", { read: iButton, static: false }) set _cmdLegendDoseDetails(c: iButton) {
        if (c) { this.cmdLegendHomeLeave = c; }
    };
    private cmdLegendOnAdmission: iButton;
    @ViewChild("cmdLegendOnAdmissionTempRef", { read: iButton, static: false }) set _cmdLegendOnAdmission(c: iButton) {
        if (c) { this.cmdLegendOnAdmission = c; }
    };
    private cmdLegendAmended: iButton;
    @ViewChild("cmdLegendAmendedTempRef", { read: iButton, static: false }) set _cmdLegendAmended(c: iButton) {
        if (c) { this.cmdLegendAmended = c; }
    };
    private cmdLegendprescriptiondetails: iButton;
    @ViewChild("cmdLegendprescriptiondetailsTempRef", { read: iButton, static: false }) set _cmdLegendprescriptiondetails(c: iButton) {
        if (c) { this.cmdLegendprescriptiondetails = c; }
    };
    private cmdLegendSupplyInstruction: iButton;
    @ViewChild("cmdLegendSupplyInstructionTempRef", { read: iButton, static: false }) set _cmdLegendSupplyInstruction(c: iButton) {
        if (c) { this.cmdLegendSupplyInstruction = c; }
    };
    private cmdLegendCriticalMeds: iButton;
    @ViewChild("cmdLegendCriticalMedsTempRef", { read: iButton, static: false }) set _cmdLegendCriticalMeds(c: iButton) {
        if (c) { this.cmdLegendCriticalMeds = c; }
    };
    public anchorAlign: Align = { horizontal: "right", vertical: "top" };
    public popupAlign: Align = { horizontal: "left", vertical: "bottom" };
    private cmdSelfAdminEarly: iButton;
    @ViewChild("cmdSelfAdminEarlyTempRef", { read: iButton, static: false }) set _cmdSelfAdminEarly(c: iButton) {
        if (c) { this.cmdSelfAdminEarly = c; }
    };
    private cmdSelfAdminLate: iButton;
    @ViewChild("cmdSelfAdminLateTempRef", { read: iButton, static: false }) set _cmdSelfAdminLate(c: iButton) {
        if (c) { this.cmdSelfAdminLate = c; }
    };
    private cmdMultipleSlot: iButton;
    @ViewChild("cmdMultipleSlotTempRef", { read: iButton, static: false }) set _cmdMultipleSlot(c: iButton) {
        if (c) { this.cmdMultipleSlot = c; }
    };
    private cmdControlledDrug: iButton;
    @ViewChild("cmdControlledDrugTempRef", { read: iButton, static: false }) set _cmdControlledDrug(c: iButton) {
        if (c) { this.cmdControlledDrug = c; }
    };
    private cmdConflits: iButton;
    @ViewChild("cmdConflitsTempRef", { read: iButton, static: false }) set _cmdConflits(c: iButton) {
        if (c) { this.cmdConflits = c; }
    };
    private cmdPGDPresc: iButton;
    @ViewChild("cmdPGDPrescTempRef", { read: iButton, static: false }) set _cmdPGDPresc(c: iButton) {
        if (c) { this.cmdPGDPresc = c; }
    };
    private cmdClinicalVrfy: iButton;
    @ViewChild("cmdClinicalVrfyTempRef", { read: iButton, static: false }) set _cmdClinicalVrfy(c: iButton) {
        if (c) { this.cmdClinicalVrfy = c; }
    };
    private cmdCompleted: iButton;
    @ViewChild("cmdCompletedTempRef", { read: iButton, static: false }) set _cmdCompleted(c: iButton) {
        if (c) { this.cmdCompleted = c; }
    };
    private cmdCumlativeDose: iButton;
    @ViewChild("cmdCumlativeDoseTempRef", { read: iButton, static: false }) set _cmdCumlativeDose(c: iButton) {
        if (c) { this.cmdCumlativeDose = c; }
    };
    private cmdOrderSet: iButton;
    @ViewChild("cmdOrderSetTempRef", { read: iButton, static: false }) set _cmdOrderSet(c: iButton) {
        if (c) { this.cmdOrderSet = c; }
    };
    private cmdReview: iButton;
    @ViewChild("cmdReviewTempRef", { read: iButton, static: false }) set _cmdReview(c: iButton) {
        if (c) { this.cmdReview = c; }
    };
    NotGivenReasonsLayoutRoot: Grid = new Grid();
    @ViewChild("NotGivenReasonsLayoutRootTempRef", { read: Grid, static: false }) set _NotGivenReasonsLayoutRoot(c: Grid) {
        if (c) { this.NotGivenReasonsLayoutRoot = c; }
    };
    private btnLegends: iButton;
    @ViewChild("btnLegendsTempRef", { read: iButton, static: false }) set _btnLegends(c: iButton) {
        if (c) { this.btnLegends = c; }
    };
    private btnRsnHeader: iLabel;
    @ViewChild("btnRsnHeaderTempRef", { read: iLabel, static: false }) set _btnRsnHeader(c: iLabel) {
        if (c) { this.btnRsnHeader = c; }
    };
    private btnPatientUnavailable: iLabel;
    @ViewChild("btnPatientUnavailableTempRef", { read: iLabel, static: false }) set _btnPatientUnavailable(c: iLabel) {
        if (c) { this.btnPatientUnavailable = c; }
    };
    private btnPatientRefuseddoseWC: iLabel;
    @ViewChild("btnPatientRefuseddoseWCTempRef", { read: iLabel, static: false }) set _btnPatientRefuseddoseWC(c: iLabel) {
        if (c) { this.btnPatientRefuseddoseWC = c; }
    };
    private btnPatientRefuseddoseWOC: iLabel;
    @ViewChild("btnPatientRefuseddoseWOCTempRef", { read: iLabel, static: false }) set _btnPatientRefuseddoseWOC(c: iLabel) {
        if (c) { this.btnPatientRefuseddoseWOC = c; }
    };
    private btnMedicationUnavailable: iLabel;
    @ViewChild("btnMedicationUnavailableTempRef", { read: iLabel, static: false }) set _btnMedicationUnavailable(c: iLabel) {
        if (c) { this.btnMedicationUnavailable = c; }
    };
    private btnNilbyMouth: iLabel;
    @ViewChild("btnNilbyMouthTempRef", { read: iLabel, static: false }) set _btnNilbyMouth(c: iLabel) {
        if (c) { this.btnNilbyMouth = c; }
    };
    private btnRouteNotAvailable: iLabel;
    @ViewChild("btnRouteNotAvailableTempRef", { read: iLabel, static: false }) set _btnRouteNotAvailable(c: iLabel) {
        if (c) { this.btnRouteNotAvailable = c; }
    };
    private btnMedicinefreeInterval: iLabel;
    @ViewChild("btnMedicinefreeIntervalTempRef", { read: iLabel, static: false }) set _btnMedicinefreeInterval(c: iLabel) {
        if (c) { this.btnMedicinefreeInterval = c; }
    };
    private btnPrescriptionIncorrect: iLabel;
    @ViewChild("btnPrescriptionIncorrectTempRef", { read: iLabel, static: false }) set _btnPrescriptionIncorrect(c: iLabel) {
        if (c) { this.btnPrescriptionIncorrect = c; }
    };
    private btnPatientUnableToTake: iLabel;
    @ViewChild("btnPatientUnableToTakeTempRef", { read: iLabel, static: false }) set _btnPatientUnableToTake(c: iLabel) {
        if (c) { this.btnPatientUnableToTake = c; }
    };
    private btnClinicalReason: iLabel;
    @ViewChild("btnClinicalReasonTempRef", { read: iLabel, static: false }) set _btnClinicalReason(c: iLabel) {
        if (c) { this.btnClinicalReason = c; }
    };
    private btnDosenotspecified: iLabel;
    @ViewChild("btnDosenotspecifiedTempRef", { read: iLabel, static: false }) set _btnDosenotspecified(c: iLabel) {
        if (c) { this.btnDosenotspecified = c; }
    };
    private btnNumbers: iLabel;
    @ViewChild("btnNumbersTempRef", { read: iLabel, static: false }) set _btnNumbers(c: iLabel) {
        if (c) { this.btnNumbers = c; }
    };
    private btnNo1: iLabel;
    @ViewChild("btnNo1TempRef", { read: iLabel, static: false }) set _btnNo1(c: iLabel) {
        if (c) { this.btnNo1 = c; }
    };
    private btnNo2: iLabel;
    @ViewChild("btnNo2TempRef", { read: iLabel, static: false }) set _btnNo2(c: iLabel) {
        if (c) { this.btnNo2 = c; }
    };
    private btnNo3: iLabel;
    @ViewChild("btnNo3TempRef", { read: iLabel, static: false }) set _btnNo3(c: iLabel) {
        if (c) { this.btnNo3 = c; }
    };
    private btnNo4: iLabel;
    @ViewChild("btnNo4TempRef", { read: iLabel, static: false }) set _btnNo4(c: iLabel) {
        if (c) { this.btnNo4 = c; }
    };
    private btnNo5: iLabel;
    @ViewChild("btnNo5TempRef", { read: iLabel, static: false }) set _btnNo5(c: iLabel) {
        if (c) { this.btnNo5 = c; }
    };
    private btnNo6: iLabel;
    @ViewChild("btnNo6TempRef", { read: iLabel, static: false }) set _btnNo6(c: iLabel) {
        if (c) { this.btnNo6 = c; }
    };
    private btnNo7: iLabel;
    @ViewChild("btnNo7TempRef", { read: iLabel, static: false }) set _btnNo7(c: iLabel) {
        if (c) { this.btnNo7 = c; }
    };
    private btnNo8: iLabel;
    @ViewChild("btnNo8TempRef", { read: iLabel, static: false }) set _btnNo8(c: iLabel) {
        if (c) { this.btnNo8 = c; }
    };
    private btnNo9: iLabel;
    @ViewChild("btnNo9TempRef", { read: iLabel, static: false }) set _btnNo9(c: iLabel) {
        if (c) { this.btnNo9 = c; }
    };
    private btnNo10: iLabel;
    @ViewChild("btnNo10TempRef", { read: iLabel, static: false }) set _btnNo10(c: iLabel) {
        if (c) { this.btnNo10 = c; }
    };
    private btnNo11: iLabel;
    @ViewChild("btnNo10TempRef", { read: iLabel, static: false }) set _btnNo11(c: iLabel) {
        if (c) { this.btnNo11 = c; }
    };
    private btnDischargePrescriptions: iButton;
    @ViewChild("btnDischargePrescriptionsTempRef", { read: iButton, static: false }) set _btnDischargePrescriptions(c: iButton) {
        if (c) { this.btnDischargePrescriptions = c; }
    };
    private btnHeightweightPopUp: iButton;
    @ViewChild("btnHeightweightPopUpTempRef", { read: iButton, static: false }) set _btnHeightweightPopUp(c: iButton) {
        if (c) { this.btnHeightweightPopUp = c; }
    };
    private lblPatientHtWtBSA: iLabel;
    @ViewChild("lblPatientHtWtBSATempRef", { read: iLabel, static: false }) set _lblPatientHtWtBSA(c: iLabel) {
        if (c) { this.lblPatientHtWtBSA = c; }
    };
    private lblChatStatus: iLabel;
    @ViewChild("lblChatStatusTempRef", { read: iLabel, static: false }) set _lblChatStatus(c: iLabel) {
        if (c) { this.lblChatStatus = c; }
    };
    public lblChatStatusValue: iLabel;
    @ViewChild("lblChatStatusValueTempRef", { read: iLabel, static: false }) set _lblChatStatusValue(c: iLabel) {
        if (c) { this.lblChatStatusValue = c; }
    };
    private lblDSTClockNotifier: iLabel;
    @ViewChild("lblDSTClockNotifierTempRef", { read: iLabel, static: false }) set _lblDSTClockNotifier(c: iLabel) {
        if (c) { this.lblDSTClockNotifier = c; }
    };
    public lblAuthoriseNotifier: iLabel;
    @ViewChild("lblAuthoriseNotifierTempRef", { read: iLabel, static: false }) set _lblAuthoriseNotifier(c: iLabel) {
        if (c) { this.lblAuthoriseNotifier = c; }
    };
    private ChartLegand: StackPanel;
    @ViewChild("ChartLegandTempRef", { read: StackPanel, static: false }) set _ChartLegand(c: StackPanel) {
        if (c) { this.ChartLegand = c; }
    };
    private RectOverdueColor: Border;
    @ViewChild("RectOverdueColorTempRef", { read: Border, static: false }) set _RectOverdueColor(c: Border) {
        if (c) { this.RectOverdueColor = c; }
    };
    private lblOverdueNumber: iLabel;
    @ViewChild("lblOverdueNumberTempRef", { read: iLabel, static: false }) set _lblOverdueNumber(c: iLabel) {
        if (c) { this.lblOverdueNumber = c; }
    };
    private lblOverdue: iLabel;
    @ViewChild("lblOverdueTempRef", { read: iLabel, static: false }) set _lblOverdue(c: iLabel) {
        if (c) { this.lblOverdue = c; }
    };
    private RectDueColor: Border;
    @ViewChild("RectDueColorTempRef", { read: Border, static: false }) set _RectDueColor(c: Border) {
        if (c) { this.RectDueColor = c; }
    };
    private lblDueNumber: iLabel;
    @ViewChild("lblDueNumberTempRef", { read: iLabel, static: false }) set _lblDueNumber(c: iLabel) {
        if (c) { this.lblDueNumber = c; }
    };
    private lblDue: iLabel;
    @ViewChild("lblDueTempRef", { read: iLabel, static: false }) set _lblDue(c: iLabel) {
        if (c) { this.lblDue = c; }
    };
    private RectAsRequiredColor: Border;
    @ViewChild("RectAsRequiredColorTempRef", { read: Border, static: false }) set _RectAsRequiredColor(c: Border) {
        if (c) { this.RectAsRequiredColor = c; }
    };
    private lblAsRequiredNumber: iLabel;
    @ViewChild("lblAsRequiredNumberTempRef", { read: iLabel, static: false }) set _lblAsRequiredNumber(c: iLabel) {
        if (c) { this.lblAsRequiredNumber = c; }
    };
    private lblAsRequired: iLabel;
    @ViewChild("lblAsRequiredTempRef", { read: iLabel, static: false }) set _lblAsRequired(c: iLabel) {
        if (c) { this.lblAsRequired = c; }
    };
    private cmdRecordPGDLinks: iButton;
    @ViewChild("cmdRecordPGDLinksTempRef", { read: iButton, static: false }) set _cmdRecordPGDLinks(c: iButton) {
        if (c) { this.cmdRecordPGDLinks = c; }
    };
    private cmdPrescribe: iButton;
    @ViewChild("cmdPrescribeTempRef", { read: iButton, static: false }) set _cmdPrescribe(c: iButton) {
        if (c) { this.cmdPrescribe = c; }
    };
    private cmdManageSelfAdminstration: iButton;
    @ViewChild("cmdManageSelfAdminstrationTempRef", { read: iButton, static: false }) set _cmdManageSelfAdminstration(c: iButton) {
        if (c) { this.cmdManageSelfAdminstration = c; }
    };
    private cmdPrintMedChart: iButton;
    @ViewChild("cmdPrintMedChartTempRef", { read: iButton, static: false }) set _cmdPrintMedChart(c: iButton) {
        if (c) { this.cmdPrintMedChart = c; }
    };
    // private cmdFluidBalance: iButton;
    // @ViewChild("cmdFluidBalanceTempRef", { read: iButton, static: false }) set _cmdFluidBalance(c: iButton) {
    //     if (c) { this.cmdFluidBalance = c; }
    // };
    private cmdRequestMedication: iButton;
    @ViewChild("cmdRequestMedicationTempRef", { read: iButton, static: false }) set _cmdRequestMedication(c: iButton) {
        if (c) { this.cmdRequestMedication = c; }
    };
    private cmdTechValidate: iButton;
    @ViewChild("cmdTechValidateTempRef", { read: iButton, static: false }) set _cmdTechValidate(c: iButton) {
        if (c) { this.cmdTechValidate = c; }
    };
    showIcon: iButton = new iButton();
    @ViewChild("showIconTempRef", { read: iButton, static: false }) set _showIcon(c: iButton) {
        if (c) { this.showIcon = c; }
    };
    private cmdWristbandScan: iButton;
    @ViewChild("cmdWristbandScanTempRef", { read: iButton, static: false }) set _cmdWristbandScan(c: iButton) {
        if (c) { this.cmdWristbandScan = c; }
    };
    private lblEmpty: iLabel;
    @ViewChild("lblEmptyTempRef", { read: iLabel, static: false }) set _lblEmpty(c: iLabel) {
        if (c) { this.lblEmpty = c; }
    };
    // private txtBarcode: iTextBox;
    // @ViewChild("txtBarcodeTempRef", { read: iTextBox, static: false }) set _txtBarcode(c: iTextBox) {
    //     if (c) { this.txtBarcode = c; }
    // };
    @ViewChild('txtBarcodeTempRef', { static: false }) txtBarcode: ElementRef;

    private MedicationChartControl: iMedicationChart = new iMedicationChart();
    @ViewChild("MedicationChartControlTempRef", { read: iMedicationChart, static: false }) set _MedicationChartControl(c: iMedicationChart) {
        if (c) { this.MedicationChartControl = c; }
    };
    ngAfterViewInit(): void {
        let MedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
        if (MedAdminVM.isCheckAccess_OnCompleted == true) {
            this.LoadConstructorImplement();
            this.UserControl_Loaded(null, null);
        }
        else {
            MedAdminVM.CheckAccessCompleted = () => {
                this.LoadConstructorImplement()
                this.UserControl_Loaded(null, null);
            }
        }
        this.lblPatientHtWtBSA.style.whiteSpace='pre';
        this.lblChatStatus.style.whiteSpace='pre';
        this.lblOverdue.style.whiteSpace='pre';
        this.lblDue.style.whiteSpace='pre';
        this.lblAsRequired.style.whiteSpace='pre';
        // this.LoadConstructorImplement();
        // this.UserControl_Loaded(null, null);
    }
    ngOnDestroy(): void {
        this.medicationControlLoaded = false;
    }
    constructor() {
        super();
        that = this;
    }

    LoadConstructorImplement() {
        // InitializeComponent();
        if (MedChartData.IsLaunchFrmPrescribe) {
            this.cmdPrescribe.Visibility = Visibility.Collapsed;
            this.cmdPrintMedChart.Visibility = Visibility.Collapsed;
            this.cmdRecordPGDLinks.Visibility = Visibility.Collapsed;
            this.cmdManageSelfAdminstration.Visibility = Visibility.Collapsed;
            // this.cmdFluidBalance.Visibility = Visibility.Collapsed;
        }
        else {
            if (UserPermissions.CanPrescribe) {
                this.cmdPrescribe.Visibility = Visibility.Visible;
            }
            if (UserPermissions.CanPrintMedChart) {
                this.cmdPrintMedChart.Visibility = Visibility.Visible;
            }
            if (UserPermissions.CanmanageSelfadministration) {
                this.cmdManageSelfAdminstration.Visibility = Visibility.Visible;
            }
            if (UserPermissions.CanRecordPGD) {
                this.cmdRecordPGDLinks.Visibility = Visibility.Visible;
            }
            // if (UserPermissions.CanViewFBChart) {
            //     this.cmdFluidBalance.Visibility = Visibility.Visible;
            //     this.cmdFluidBalance.IsEnabled = UserPermissions.CanEnableFBChart;
            // }
        }
        if (UserPermissions.CanTechnicallyValidate) {
            this.cmdTechValidate.Visibility = Visibility.Visible;
        }
        if (UserPermissions.CanRequestMedication && MedChartData.bAllowStockRequestByNurse) {
            this.cmdRequestMedication.Visibility = Visibility.Visible;
            this.cmdRequestMedication.IsEnabled = false;
            MedChartData.bRequestMedicationVisible = true;
            MedChartData.bRequestMedicationEnable = false;
            if (!MedChartData.IsMedChartReadOnly) {
                this.cmdRequestMedication.IsEnabled = true;
                MedChartData.bRequestMedicationEnable = true;
            }
        }
        else {
            this.cmdRequestMedication.Visibility = Visibility.Collapsed;
            MedChartData.bRequestMedicationVisible = false;
            MedChartData.bRequestMedicationEnable = false;
        }
        if ((MedChartData.IsMedChartReadOnly && !MedChartData.IsLaunchFrmPrescribe) || MedChartData.IsLaunchFrmPrescribe) {
            this.LaunchMedChartReadOnlyMode();
        }

        //this.ParaChangedEvent = new Model.CumulativeAdministration.RefreshCumulativeWarning(CumulativeParacetamol_WarningChangeEvent);
        this.ParaChangedEvent = (s) => { this.CumulativeParacetamol_WarningChangeEvent(s) };
        //  this.InfAlertUnNoticedMsgEvent = new MedicationAdminVM.InfAlertUnNoticedMsgDelegate(MedAdminVM_InfAlertUnNoticedMsgEventCompleted);//TODO check
        this.InfAlertUnNoticedMsgEvent = (s, e) => { this.MedAdminVM_InfAlertUnNoticedMsgEventCompleted() };
        if (!MedChartData.IsMedChartReadOnly) {
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
    }
    EnableDisableLinks(): void {
        this.cmdPrescribe.IsEnabled = true;
        this.cmdPrintMedChart.IsEnabled = true;
        this.cmdRecordPGDLinks.IsEnabled = true;
        this.cmdManageSelfAdminstration.IsEnabled = true;
        this.cmdTechValidate.IsEnabled = true;
        this.cmdRequestMedication.IsEnabled = true;
        // this.cmdFluidBalance.IsEnabled = true;
        this.showIcon.IsEnabled = true;
        if (MedChartData.IsMedChartReadOnly) {
            this.cmdPrescribe.IsEnabled = false;
            this.cmdPrintMedChart.IsEnabled = false;
            this.cmdRecordPGDLinks.IsEnabled = false;
            this.cmdManageSelfAdminstration.IsEnabled = false;
            this.cmdTechValidate.IsEnabled = false;
            this.cmdRequestMedication.IsEnabled = false;
        }
        else if (String.Compare(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0) {
            this.cmdPrescribe.IsEnabled = true;
            this.cmdRecordPGDLinks.IsEnabled = true;
            this.cmdManageSelfAdminstration.IsEnabled = false;
            this.cmdRequestMedication.IsEnabled = false;
        }
        else if (String.IsNullOrEmpty(PatientContext.EncounterCode) || String.Compare(PatientContext.EncounterCode, CConstants.ENCstatus, StringComparison.CurrentCultureIgnoreCase) == 0) {
            this.cmdPrescribe.IsEnabled = false;
            this.cmdRecordPGDLinks.IsEnabled = false;
        }
        if (String.IsNullOrEmpty(MedChartData.ChartStatus)) {
            this.cmdPrescribe.IsEnabled = true;
            this.cmdPrintMedChart.IsEnabled = false;
            this.cmdRecordPGDLinks.IsEnabled = true;
            this.cmdManageSelfAdminstration.IsEnabled = false;
            this.cmdTechValidate.IsEnabled = false;
            this.cmdRequestMedication.IsEnabled = false;
            // this.cmdFluidBalance.IsEnabled = false;
            this.showIcon.IsEnabled = false;
        }
    }

    InitializeMedicationChart(): void {
        this.IsActivityLaunchedInSlot = false;
        //#36617
        if (this.MedicationChartControl != null && this.LayoutRoot.Children.Contains(this.MedicationChartControl))
            this.LayoutRoot.Children.Remove(this.MedicationChartControl);
        if (this.TextBlockControl != null && this.LayoutRoot.Children.Contains(this.TextBlockControl)) {
            this.LayoutRoot.Children.Remove(this.TextBlockControl);
        }
        this.LayoutRoot.Children.Clear();
        // this.MedicationChartControl = new iMedicationChart();
        this.TextBlockControl = new TextBlock();
        this.EnableDisableLinks();
        // this.MedicationChartControl.Width = this.LayoutRoot.ActualWidth;
        // this.MedicationChartControl.Height = this.RowChart.ActualHeight - 5;
        this.MedicationChartControl.AutoGenerateColumn = true;
        this.MedicationChartControl.DrugHeader = MedsAdminChartView.sDrugHeader;
        this.MedicationChartControl.Format = MedsAdminChartView.sDrugHeaderFormat;
        this.MedicationChartControl.StartDate = this.dtCurrentDateTime.AddDays(-2);
        this.MedicationChartControl.EndDate = this.dtCurrentDateTime.AddDays(1);
        // this.MedicationChartControl.TodayDate = new DateTime(this.dtCurrentDateTime.DateTime.Ticks, DateTimeKind.Unspecified);
        this.MedicationChartControl.TodayDate = this.dtCurrentDateTime;
        this.TextBlockControl.HorizontalAlignment = HorizontalAlignment.Stretch;
        this.TextBlockControl.VerticalAlignment = VerticalAlignment.Stretch;
        let DSTDatetime: DateTime = Common.DSTTimeInChart(this.dtCurrentDateTime.DateTime.AddDays(-2), this.dtCurrentDateTime.DateTime.AddDays(1), ChartType.Medication_Chart);
        if (DateTime.NotEquals(DSTDatetime, DateTime.MinValue)) {
            this.MedicationChartControl.DSTDateTime = DSTDatetime.ToString(MedsAdminChartView.sDrugHeaderFormat);
        }
        this.MedicationChartControl.TimeFormat = CConstants.Timeformat;
        this.MedicationChartControl.TodayColWidth = MedsAdminChartView.dTodayColWidth;
        this.MedicationChartControl.ColWidth = MedsAdminChartView.dColWidth;
        this.MedicationChartControl.NoRecordsDisplayText = String.Empty;
        this.MedicationChartControl.TodayBorderColor = new SolidColorBrush(MedChartData.TodayOutlineColor);
        this.MedicationChartControl.ShowSlotTiminings = true;
        this.MedicationChartControl.SlotTimeWidth = 50.0;
        this.MedicationChartControl.SlotTimeHeader = String.Empty;
    }
    private LaunchMedChartReadOnlyMode(): void {
        this.cmdPrescribe.Visibility = Visibility.Collapsed;
        this.cmdPrintMedChart.Visibility = Visibility.Collapsed;
        this.cmdRecordPGDLinks.Visibility = Visibility.Collapsed;
        this.cmdManageSelfAdminstration.Visibility = Visibility.Collapsed;
        // this.cmdFluidBalance.Visibility = Visibility.Collapsed;
        this.cmdTechValidate.Visibility = Visibility.Collapsed;
        this.cmdRequestMedication.Visibility = Visibility.Collapsed;
    }
    LoadMedicationChart(IPlock: boolean = false): void {
        this.IsActivityLaunchedInSlot = false;
        if (MedChartData.MedChartOID == 0) {
            if (this.objMedsAdminCommonData == null) {
                this.objMedsAdminCommonData = new MedsAdminCommonData();
            }
            this.objMedsAdminCommonData.GetMedChartOID((IPlock != null && IPlock.HasValue && IPlock.Value) ? true : false);
            // this.objMedsAdminCommonData.MedsAdminCommonDataCompleted -= objMedsAdminCommonData_MedsAdminCommonDataCompleted;
            this.objMedsAdminCommonData.MedsAdminCommonDataCompleted = (s, e) => { this.objMedsAdminCommonData_MedsAdminCommonDataCompleted(); };
        }
        else {
            this.LoadMedChart();
        }
    }
    private objMedsAdminCommonData_MedsAdminCommonDataCompleted(): void {
        this.LoadMedChart();
    }
    LoadMedChart(): void {
        Busyindicator.SetStatusBusy("MedsChartView");
        let Startdate: DateTime = this.dtCurrentDateTime.DateTime.AddDays(-2);
        let Enddate: DateTime = this.dtCurrentDateTime.DateTime.AddDays(1);
        this.oGetMedsChartData = new GetMedsChartData(ChartContext.PatientOID, ChartContext.EncounterOID, this.dtCurrentDateTime, Startdate, Enddate, ChartType.Medication_Chart, String.Empty, MedChartData.MedChartOID, false, false);
        // this.oGetMedsChartData.MedsAdminChartDataCompleted -= oGetMedsChartData_MedsAdminChartDataCompleted;
        // this.oGetMedsChartData.MedsAdminChartDataCompleted = (s, e) => { this.oGetMedsChartData_MedsAdminChartDataCompleted(); };
        this.oGetMedsChartData.GetMedsAdminChartData();
        this.oGetMedsChartData.medChartCallCompleted.subscribe(() => {
            this.oGetMedsChartData_MedsAdminChartDataCompleted();
            Grid.SetColumn(this.MedicationChartControl, 0);

            if (!this.LayoutRoot.Children.Contains(this.MedicationChartControl)) {
                this.LayoutRoot.Children.Clear();
                this.LayoutRoot.Children.Add(this.MedicationChartControl);
            }
            this.LayoutRoot.SetColumnSpan(this.MedicationChartControl, 2);//Stub #36487
            Grid.SetRow(this.MedicationChartControl, 3);
            Grid.SetColumn(this.TextBlockControl, 0);

            if (!this.LayoutRoot.Children.Contains(this.TextBlockControl)) {
                this.LayoutRoot.Children.Add(this.TextBlockControl);
            }
            this.LayoutRoot.SetColumnSpan(this.TextBlockControl, 2);
            Grid.SetRow(this.TextBlockControl, 3);
            this.TextBlockControl.Visibility = this._isActivityLaunchedInSlot ? Visibility.Visible : Visibility.Collapsed;
            let DSTDatetime: DateTime = Common.DSTTimeInChart(Startdate, Enddate, ChartType.Medication_Chart);
            if (DateTime.NotEquals(DSTDatetime, DateTime.MinValue)) {
                this.lblDSTClockNotifier.Visibility = Visibility.Visible;
                this.lblDSTClockNotifier.Text = String.Format(MedicationAdministrator.DSTTimeClockChange_text, DSTDatetime.ToString(CConstants.ShortDateFormat));
            }
            else {
                this.lblDSTClockNotifier.Visibility = Visibility.Collapsed;
            }
        });
    }
    LoadMedChartData(oncomplete:Function): void {

        let Startdate: DateTime = this.dtCurrentDateTime.DateTime.AddDays(-2);
        let Enddate: DateTime = this.dtCurrentDateTime.DateTime.AddDays(1);
        this.oGetMedsChartData = new GetMedsChartData(ChartContext.PatientOID, ChartContext.EncounterOID, this.dtCurrentDateTime, Startdate, Enddate, ChartType.Medication_Chart, String.Empty, MedChartData.MedChartOID, false, false);
        this.oGetMedsChartData.GetMedsAdminChartData();
        this.oGetMedsChartData.medChartCallCompleted.subscribe(() => {
            let MedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
            MedAdminVM.OnInitComplete();
            if (MedAdminVM != null && (MedChartData.PatinetInfo != null && !String.IsNullOrEmpty(MedChartData.PatinetInfo.Observation))) {
                let MedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
                let sHtWtBSA: string = MedChartData.PatinetInfo.Observation;
                if (!String.IsNullOrEmpty(PatientContext.BSA))
                    sHtWtBSA += " " + PatientContext.BSA + MedsAdminChartToolTip.PatientBSAUOMText;
                MedAdminVM.PatientHtWtBSAText = sHtWtBSA;
                oncomplete(this.DataContext); 
            }
        });
    }
    private UserControl_Loaded(sender: Object, e: RoutedEventArgs): void {
        MedChartData.PatinetInfo = Common.GetPatientInfo();
        ChartContext.CurrentChartTab = CConstants.sTabChartKey;
        if (this.MedicationChartControl != null && this.MedicationChartControl.ChartRows != null && this.MedicationChartControl.ChartRows.Count > 0)
            this.MedicationChartControl.ChartRows.Clear();
        this.InitializeMedicationChart();
        this.MedicationChartControl.ChartRows = null;
        this.LoadMedicationChart();
        let MedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
        Common.CADataContext = MedAdminVM;
        if (MedAdminVM != null) {
            // MedAdminVM.CumulativeParacetamol.RefreshCumulativeWarningEvent -= this.ParaChangedEvent;
            MedAdminVM.CumulativeParacetamol.RefreshCumulativeWarningEvent = this.ParaChangedEvent;
            // MedAdminVM.InfAlertUnNoticedMsgEventCompleted -= this.InfAlertUnNoticedMsgEvent;
            MedAdminVM.InfAlertUnNoticedMsgEventCompleted = this.InfAlertUnNoticedMsgEvent;
        }
        //Below Check is commented , overview default done for IsLaunchFrmPrescribe at medsmain page 
        // if (String.Compare(MedChartData.ChartStatus, CConstants.sChartInActiveStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0 || (MedChartData.IsLaunchFrmPrescribe && !this.bIsAlrDefOverview)) {
        //     this.SetDefaultTabByKey(CConstants.sTabChartOverViewKey);
        //     this.bIsAlrDefOverview = true;
        // }
        if (String.Compare(MedChartData.ChartStatus, CConstants.sChartInActiveStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0) {
            this.SetDefaultTabByKey(CConstants.sTabChartOverViewKey);
        }
        if (String.IsNullOrEmpty(MedChartData.ChartStatus)) {
            this.SetDefaultTabByKey(CConstants.sTabChartKey);
            this.EnableDisableTabItemByKey(CConstants.sTabInfusionKey, false);
            this.EnableDisableTabItemByKey(CConstants.sTabChartOverViewKey, false);
        }
        // MedAdminVM.OnRecordPGDlaunch -= new MedicationAdminVM.LaunchRecordPGDafterAllchk(RecordPGDLaunch);
        MedAdminVM.OnRecordPGDlaunch = (s, e) => { this.RecordPGDLaunch(); };
        // MedAdminVM.OnInpatientlaunch -= new MedicationAdminVM.LaunchInpatientAfterClerk(OnInpatientlaunch);
        MedAdminVM.OnInpatientlaunch = (s, e) => { this.OnInpatientlaunch(); };
        //  MedAdminVM.OnClerkSourceLaunch -= new MedicationAdminVM.LaunchClerkSourceafterAllergy(LaunchPrescribeCareActivity);
        MedAdminVM.OnClerkSourceLaunch = (s, e) => { this.LaunchPrescribeCareActivity(s, e); };
        MedAdminVM.SetHeightweightPopUp();
        if (this.DataContext instanceof MedicationAdminVM) {
            if (MedicationCommonProfileData.PrescribeConfig != null && MedicationCommonProfileData.PrescribeConfig.EnableDoseCalc) {
                // (ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM)).ActivityConsiderationUpdatedCompleted -= MedsAdminChartView_ActivityConsiderationUpdatedCompleted;
                (ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM)).ActivityConsiderationUpdatedCompleted = (s, e) => { this.MedsAdminChartView_ActivityConsiderationUpdatedCompleted() };
            }
        }
        let length = iBusyIndicator.arrDialogRef.length;
        if (length > 0) {
            for(let i = 0; i < length; i++) {
                BusyIndicator.SetStatusIdle("InfusionChart");
            }
        }
    }
    private RefreshDCAlertIcon(): void {
        if (String.Equals(ChartContext.CurrentChartTab, CConstants.sTabChartKey, StringComparison.InvariantCultureIgnoreCase) && this.MedicationChartControl != null && this.MedicationChartControl.ChartRows != null && this.MedicationChartControl.ChartRows.Count > 0 && MedicationCommonProfileData.PrescribeConfig != null && MedicationCommonProfileData.PrescribeConfig.EnableDoseCalc && MedicationCommonProfileData.PrescribeConfig.HeightWeightChangeAlert) {
            let dtRecordHWDTTM: DateTime = DateTime.MinValue;
            if (MedChartData.PatinetInfo != null) {
                dtRecordHWDTTM = DateTime.GreaterThanOrEqualTo(MedChartData.PatinetInfo.DCHTRecordDTTM, MedChartData.PatinetInfo.DCWTRecordDTTM) ? MedChartData.PatinetInfo.DCHTRecordDTTM : MedChartData.PatinetInfo.DCWTRecordDTTM;
            }
            let oPresItem: List<number> = this.oGetMedsChartData.LstDrugDetail.Where(C => C.DrugHeader != null && C.DrugHeader.IsDoseCalculatedByDC && DateTime.NotEquals(dtRecordHWDTTM, DateTime.MinValue) && C.DrugHeader.DCalcDTTM < dtRecordHWDTTM && !String.Equals(C.DrugHeader.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) && !String.Equals(C.DrugHeader.PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.CurrentCultureIgnoreCase) && !String.Equals(C.DrugHeader.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase)).Select(S => S.DrugHeader.PrescriptionItemOID).ToList();
            if (oPresItem != null && oPresItem.Count > 0) {
                oPresItem.forEach((PresItem) => {
                    let oSelectChartRow: ChartRow = this.MedicationChartControl.ChartRows.Where(C => C.Key.Equals("Row-" + PresItem.ToString())).FirstOrDefault();
                    if (oSelectChartRow != null && oSelectChartRow.DrugItem != null && oSelectChartRow.DrugItem.Tag != null) {
                        let oTagObj: TagObject = new TagObject();
                        let oEmptyTagObj: TagObject = new TagObject();
                        oTagObj.oChartCell = oSelectChartRow.ChartCells.FirstOrDefault();
                        oSelectChartRow.DrugItem.DoseCalcIcon = this.LoadImage("IsDoseCalculatedByDC", MedImage.GetPath(MedImages.DoseCalculatorWithAlert));
                        oSelectChartRow.DrugItem.DoseCalcIcon.Tooltip = ResourceCommonBB.DoseCalculator.DoseCalci_Tooltip;
                        this.MedicationChartControl.RefreshRow(oSelectChartRow, oEmptyTagObj);
                        this.MedicationChartControl.RefreshRow(oSelectChartRow, oTagObj);
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
        // ObjectHelper.stopFinishAndCancelEvent(true);
        Busyindicator.SetStatusBusy("DCIconClicked");
        let objDosecalc: MedDoseDetails = new MedDoseDetails();
        this.objPrescitemdetvm = new PrescriptionItemDetailsVM();
        objDosecalc.PrescriptionItemOID = PrescriptionItemOId;
        this.objPrescitemdetvm.GetDoseDeatils(PrescriptionItemOId);
        this.objPrescitemdetvm.DoseDetailEvent = (s) => { this.PrescriptionItemDetailsVM_DoseDetailEvent(s); };
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
        // ObjectHelper.stopFinishAndCancelEvent(false);
        args.AppChildWindow.DialogResult = true;
    }
    private EnableDisableTabItemByKey(sKey: string, IsEnabled: boolean): void {

        let oFauxTab: iTab = ObjectHelper.CreateType<iTab>((ObjectHelper.CreateType<iTabItem>(this.Parent, iTabItem)).Parent, iTab);
        let oFauxTabItem: iTabItem = oFauxTab.GetItem(sKey);
        if (oFauxTabItem instanceof iTabItem && oFauxTabItem.Key == sKey) {
            oFauxTabItem.IsEnabled = IsEnabled;
        }
    }
    private SetDefaultTabByKey(sKey: string): void {

        let oFauxTab: iTab = ObjectHelper.CreateType<iTab>((ObjectHelper.CreateType<iTabItem>(this.Parent, iTabItem)).Parent, iTab);
        if (oFauxTab.SelectedKey != sKey) {
            let oFauxTabItem: iTabItem = oFauxTab.GetItem(sKey);
            if (oFauxTabItem != null) {
                oFauxTab.Click(oFauxTabItem.Key, true);
            }
        }
    }
    MedAdminVM_InfAlertUnNoticedMsgEventCompleted(): void {
        let iInfusionAlertMsgBox: iMessageBox = new iMessageBox();
        iInfusionAlertMsgBox.Title = "LORENZO";
        iInfusionAlertMsgBox.Message = Resource.MedicationChart.InfusionAlertsNotReviewedMsg;
        iInfusionAlertMsgBox.IconType = MessageBoxType.Exclamation;
        iInfusionAlertMsgBox.MessageButton = MessageBoxButton.OK;
        iInfusionAlertMsgBox.MessageBoxClose = (s, e) => { this.iInfusionAlertMsgBox_MessageBoxClose(s, e); };
        iInfusionAlertMsgBox.Show();
        // ObjectHelper.stopFinishAndCancelEvent(true);
        let top: any = window.top;
        if (HelperService.windowCloseFlag == "Finish" || HelperService.windowCloseFlag == 'FinishNow') {
            top.oScreen.UnFreeze();
        }
    }
    iInfusionAlertMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        // ObjectHelper.stopFinishAndCancelEvent(false);
        this.InfusionTabSwitch();
    }
    CumulativeParacetamol_WarningChangeEvent(ParacetamolAdminCount: number): void {
        if (ChartContext.CurrentChartTab == CConstants.sTabChartKey) {
            let dtParaWarningDTTM: DateTime = CommonBB.GetServerDateTime().AddHours(-24);
            let drug: IEnumerable<ChartRow> = this.MedicationChartControl.ChartRows.Where(drug => (<TagDrugHeaderDetail>drug.DrugItem.Tag).IsParacetamolIngredient);
            let cumulativeSlots: ObservableCollection<IChartSlot> = new ObservableCollection<IChartSlot>();
            drug.forEach(odrug => {
                odrug.ChartCells.forEach(drugSlots => {
                    drugSlots.Slots.forEach(slot => {
                        if (((slot instanceof DefaultSlot) &&
                            (String.Compare((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus, SlotStatus.DUENOW) == 0
                                || String.Compare((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus, SlotStatus.OVERDUE) == 0
                                || String.Compare((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus, SlotStatus.DEFERDUENOW) == 0
                                || String.Compare((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus, SlotStatus.DEFEROVERDUE) == 0
                                || String.Compare((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus, SlotStatus.NOTYETRECORDED) == 0))
                            || ((slot instanceof TodayMultiSlot) &&
                                (String.Compare((<TodayMultiSlot>slot).Tag.ToString(), SlotStatus.DUENOW) == 0
                                    || String.Compare((<TodayMultiSlot>slot).Tag.ToString(), SlotStatus.OVERDUE) == 0
                                    || String.Compare((<TodayMultiSlot>slot).Tag.ToString(), SlotStatus.DEFERDUENOW) == 0
                                    || String.Compare((<TodayMultiSlot>slot).Tag.ToString(), SlotStatus.DEFEROVERDUE) == 0
                                    || String.Compare((<TodayMultiSlot>slot).Tag.ToString(), SlotStatus.NOTYETRECORDED) == 0))
                            || (slot instanceof TodayAsRequiredSlot)
                            || ((slot instanceof AdministratedSlot) && String.Compare((<TagSlotDetail>(<AdministratedSlot>slot).Tag).SlotStatus, SlotStatus.PATIENTSELFADMIN) == 0
                                && DateTime.GreaterThanOrEqualTo((<TagSlotDetail>(<AdministratedSlot>slot).Tag).SlotDateTime, (dtParaWarningDTTM)))) {
                            cumulativeSlots.Add(slot);
                        }

                    });
                })

            });
            if (ParacetamolAdminCount <= 3) {
                if (cumulativeSlots != null && cumulativeSlots.Count > 0) {
                    cumulativeSlots.forEach((slot) => {
                        if (slot instanceof DefaultSlot) {
                            (<DefaultSlot>slot).CumulativeIcon.UriString = String.Empty;
                            this.MedicationChartControl.RefreshCell(this.SetTagObjectCumulativeIcon(slot));
                        }
                        else if (slot instanceof TodayMultiSlot) {
                            (<TodayMultiSlot>slot).CumulativeIcon.UriString = String.Empty;
                            this.MedicationChartControl.RefreshIndividualSlot(this.SetTagObjectCumulativeIcon(slot));
                        }
                        else if (slot instanceof TodayAsRequiredSlot) {
                            (<TodayAsRequiredSlot>slot).CumulativeIcon.UriString = String.Empty;
                            this.MedicationChartControl.RefreshIndividualSlot(this.SetTagObjectCumulativeIcon(slot));
                        }
                        else if (slot instanceof AdministratedSlot) {
                            (<AdministratedSlot>slot).CumulativeIcon.UriString = String.Empty;
                            this.MedicationChartControl.RefreshCell(this.SetTagObjectCumulativeIcon(slot));
                        }
                    });
                }
            }
            else if (ParacetamolAdminCount >= 4) {
                if (cumulativeSlots != null && cumulativeSlots.Count > 0) {
                    cumulativeSlots.forEach((slot) => {
                        if (slot instanceof DefaultSlot) {
                            this.SetCumulativeIcon((<DefaultSlot>slot).CumulativeIcon);
                            this.MedicationChartControl.RefreshCell(this.SetTagObjectCumulativeIcon(slot));
                        }
                        else if (slot instanceof TodayMultiSlot) {
                            this.SetCumulativeIcon((<TodayMultiSlot>slot).CumulativeIcon);
                            this.MedicationChartControl.RefreshIndividualSlot(this.SetTagObjectCumulativeIcon(slot));
                        }
                        else if (slot instanceof TodayAsRequiredSlot) {
                            let SlotKey: string = String.Empty;
                            if (!String.IsNullOrEmpty(slot.Key.Split(' ')[1])) {
                                SlotKey = slot.Key.Split(' ')[1].Substring(0, slot.Key.Split(' ')[1].length - 1);
                            }
                            let IsTodayAsReqSlotMatchFound: boolean = false;
                            let SlotRows = this.MedicationChartControl.ChartRows.Where(slotRow => slotRow.Key.Split('-')[1] == SlotKey).Select(slotRow => slotRow);
                            if (SlotRows != null && SlotRows.Count() > 0) {
                                var SlotRow = SlotRows.First();
                                //MedicationChartControl.ChartColumns not available
                                if (this.MedicationChartControl.ChartColumns) {
                                    let list = this.MedicationChartControl.ChartColumns.Where(colIndx => colIndx.Caption == this.dtCurrentDateTime.ToString(CConstants.ShortDateFormat)).Select(colIndx => colIndx.Index);
                                    // var colIndex = list.Count() < 1 ? -1 : list.First().colIndex;
                                    var colIndex = list.First();
                                    let SlotsColl = SlotRow.ChartCells.Where(slotColls => slotColls.ColIndex == colIndex);
                                    if (SlotsColl.Count() > 0) {
                                        let cCell: ChartCell = SlotsColl.First();
                                        let oAsReqSlots = cCell.Slots.Where(oAsReqSlot => (oAsReqSlot instanceof TodayAsRequiredSlot)).Select(oAsReqSlot => oAsReqSlot);
                                        if (oAsReqSlots != null && oAsReqSlots.Count() > 0) {
                                            if (oAsReqSlots.First().Key == slot.Key)
                                                IsTodayAsReqSlotMatchFound = true;
                                        }
                                    }
                                }
                            }

                            if (IsTodayAsReqSlotMatchFound) {
                                this.SetCumulativeIcon((<TodayAsRequiredSlot>slot).CumulativeIcon);
                                this.MedicationChartControl.RefreshIndividualSlot(this.SetTagObjectCumulativeIcon(slot));
                            }
                        }
                        else if (slot instanceof AdministratedSlot) {
                            this.SetCumulativeIcon((<AdministratedSlot>slot).CumulativeIcon);
                            this.MedicationChartControl.RefreshCell(this.SetTagObjectCumulativeIcon(slot));
                        }
                    });
                }
            }
        }
    }
    private SetCumulativeIcon(iconCumulative: ChartIcon): ChartIcon {
        iconCumulative.Key = CConstants.CumulativeWarning;
        iconCumulative.UriString = MedImage.GetPath(MedImages.CumulativeWarningIcon);
        iconCumulative.EnableOnHotSpotClick = false;
        iconCumulative.Tooltip = ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.CumulativeIcon, MaxWidth: 250, IsWordwrap: true });
        return iconCumulative;
    }

    private SetTagObjectCumulativeIcon(oChartSlot: any): TagObject {
        let oTagObject: TagObject = new TagObject();
        if (oChartSlot != null && oChartSlot.Key != null && this.MedicationChartControl.ChartRows != null
            && this.MedicationChartControl.ChartRows.Count > 0 && this.MedicationChartControl.ChartColumns != null) {
            let nCount = this.MedicationChartControl.ChartRows.Count;
            var oChartRow = null;
            let ColIndx: number = 0;
            for (let i: number = 0; i < nCount; i++) {
                if (this.MedicationChartControl.ChartRows[i].ChartCells != null && this.MedicationChartControl.ChartRows[i].ChartCells.Count > 0) {
                    let nChartCellCnt = this.MedicationChartControl.ChartRows[i].ChartCells;
                    for (let j: number = 0; j < nChartCellCnt.Count; j++) {
                        if (this.MedicationChartControl.ChartRows[i].ChartCells[j].Slots != null && this.MedicationChartControl.ChartRows[i].ChartCells[j].Slots.Count > 0) {
                            let nSlotCnt = this.MedicationChartControl.ChartRows[i].ChartCells[j].Slots.Count;
                            for (let k: number = 0; k < nSlotCnt; k++) {
                                if (this.MedicationChartControl.ChartRows[i].ChartCells[j].Slots[k].Key == oChartSlot.Key) {
                                    ColIndx = this.MedicationChartControl.ChartRows[i].ChartCells[j].ColIndex;
                                    oChartRow = this.MedicationChartControl.ChartRows[i];
                                    break;
                                }
                            }
                        }
                    }
                }
                if (ColIndx > 0 && oChartRow != null) {
                    oTagObject.oChartColumn = this.MedicationChartControl.ChartColumns.Where(c => c.Index == ColIndx).Select(s => s).FirstOrDefault();
                    oTagObject.oDrugItem = oChartRow.DrugItem;
                    oTagObject.oChartCell = oChartRow.ChartCells.Where(c => c.ColIndex == ColIndx).Select(s => s).FirstOrDefault();
                    oTagObject.oIChartSlot = oChartRow.ChartCells.Where(c => c.ColIndex == ColIndx).Select(s => s.Slots[0]).FirstOrDefault();
                    oTagObject.IsSelected = true;
                    break;
                }
            }

        }
        return oTagObject;
    }

    oGetMedsChartData_MedsAdminChartDataCompleted(): void {
        let MedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
        if (!String.IsNullOrEmpty(MedChartData.ChartStatus) && (String.Compare(MedChartData.ChartStatus, CConstants.sChartActiveStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0)) {
            this.lblChatStatus.Visibility = Visibility.Visible;
            this.lblChatStatusValue.Text = CommonBB.GetText(MedChartData.ChartStatus, ValueDomainValues.oChartStatus);
        }
        if (MedAdminVM != null && (MedChartData.PatinetInfo != null && !String.IsNullOrEmpty(MedChartData.PatinetInfo.Observation))) {
            let MedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
            let sHtWtBSA: string = MedChartData.PatinetInfo.Observation;
            if (!String.IsNullOrEmpty(PatientContext.BSA))
                sHtWtBSA += " " + PatientContext.BSA + MedsAdminChartToolTip.PatientBSAUOMText;
            MedAdminVM.PatientHtWtBSAText = sHtWtBSA;
            CommonBB.PatientBSADataCompletedEvent_chart= (s, e) => { this.CommonBB_PatientBSADataCompletedEvent_chart(s, e); };
        }
        if (MedChartData.IsAuthoriseDrugAval) {
            this.lblAuthoriseNotifier.Visibility = Visibility.Visible;
        }
        else {
            this.lblAuthoriseNotifier.Visibility = Visibility.Collapsed;
        }
        if (this.ChartLegand.Visibility == Visibility.Collapsed) {
            this.RectOverdueColor.Background = new SolidColorBrush(MedChartData.OverDueSlotsColor);
            this.RectDueColor.Background = new SolidColorBrush(MedChartData.DueSlotsColor);
            this.RectAsRequiredColor.Background = new SolidColorBrush(MedChartData.AsRequiredSlotsColor);
            this.ChartLegand.Visibility = Visibility.Visible;
        }
        this.lblOverdueNumber.Text = this.oGetMedsChartData.nOverDueCount.ToString();
        this.lblDueNumber.Text = this.oGetMedsChartData.nDueCount.ToString();
        this.lblAsRequiredNumber.Text = this.oGetMedsChartData.nAsRequiredCount.ToString();
        if (MedChartData.IsDischargePrescriptionExists) {
            this.btnDischargePrescriptions.Visibility = Visibility.Visible;
        }
        else {
            this.btnDischargePrescriptions.Visibility = Visibility.Collapsed;
        }
        if (this.oGetMedsChartData.oChartRowList.Count > 0) {
            this.MedicationChartControl.NoRecordsDisplayText = String.Empty;
            this.MedicationChartControl.ChartRows = this.oGetMedsChartData.oChartRowList;
            // this.MedicationChartControl.OnHotSpotClick -= MedicationChartControl_OnHotSpotClick;
            // this.MedicationChartControl.OnDrugHotSpotClick -= MedicationChartControl_OnDrugHotSpotClick;
            //this.MedicationChartControl.OnSlotHotSpotClick -= MedicationChartControl_OnSlotHotSpotClick;
            this.MedicationChartControl.OnHotSpotClick = (s, e) => { this.MedicationChartControl_OnHotSpotClick(s, e); };
            this.MedicationChartControl.OnDrugHotSpotClick = (s, e) => { this.MedicationChartControl_OnDrugHotSpotClick(s, e); };
            this.MedicationChartControl.OnSlotHotSpotClick = (s, e, t) => { this.MedicationChartControl_OnSlotHotSpotClick(s, e, t); };
            if (MedAdminVM != null && this.oGetMedsChartData.ParacetamolAdminCount > 0) {
                MedAdminVM.CumulativeParacetamol.ParacetamolAdministeredCount = this.oGetMedsChartData.ParacetamolAdminCount;
            }
        }
        else {
            this.MedicationChartControl.NoRecordsDisplayText = "No records found";
        }
        if (ProfileData.InfusionPresConfig != null && ProfileData.InfusionPresConfig.IsEnablePrescInfus && (String.Compare(MedChartData.ChartStatus, CConstants.sChartActiveStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0)) {
            if (MedChartData.NonInfusionItemCount > 0 || MedChartData.InfusionItemCount > 0) {
                this.EnableDisableTabItemByKey(CConstants.sTabChartOverViewKey, true);
            }
            if (MedChartData.NonInfusionItemCount > 0) {
                this.EnableDisableLinks();
            }
            if (MedChartData.NonInfusionItemCount <= 0 && MedChartData.InfusionItemCount <= 0) {
                this.EnableDisableTabItemByKey(CConstants.sTabChartKey, true);
                this.EnableDisableTabItemByKey(CConstants.sTabInfusionKey, false);
                this.EnableDisableTabItemByKey(CConstants.sTabChartOverViewKey, false);
                this.cmdPrescribe.IsEnabled = true;
                this.cmdPrintMedChart.IsEnabled = false;
                this.cmdRecordPGDLinks.IsEnabled = true;
                this.cmdManageSelfAdminstration.IsEnabled = false;
                this.cmdTechValidate.IsEnabled = false;
                this.cmdRequestMedication.IsEnabled = false;
                // this.cmdFluidBalance.IsEnabled = false;
                this.showIcon.IsEnabled = false;
                if (!MedChartData.IsLaunchFrmPrescribe)
                    this.SetDefaultTabByKey(CConstants.sTabChartKey);
                else MedChartData.IsLaunchFrmPrescribe = false;
            }
            else if (MedChartData.NonInfusionItemCount > 0 && MedChartData.InfusionItemCount <= 0) {
                this.EnableDisableTabItemByKey(CConstants.sTabInfusionKey, false);
                this.EnableDisableTabItemByKey(CConstants.sTabChartKey, true);
                if (!MedChartData.IsLaunchFrmPrescribe)
                    this.SetDefaultTabByKey(CConstants.sTabChartKey);
                else MedChartData.IsLaunchFrmPrescribe = false;
            }
            else if (MedChartData.NonInfusionItemCount <= 0 && MedChartData.InfusionItemCount > 0) {
                this.EnableDisableTabItemByKey(CConstants.sTabChartKey, false);
                this.EnableDisableTabItemByKey(CConstants.sTabInfusionKey, true);
                if (!MedChartData.IsLaunchFrmPrescribe)
                    this.SetDefaultTabByKey(CConstants.sTabInfusionKey);
                else MedChartData.IsLaunchFrmPrescribe = false;
            }
            else if (MedChartData.NonInfusionItemCount > 0 && MedChartData.InfusionItemCount > 0) {
                this.EnableDisableTabItemByKey(CConstants.sTabChartKey, true);
                this.EnableDisableTabItemByKey(CConstants.sTabInfusionKey, true);
                if (!this.isPrescribeLinkClicked && !MedChartData.IsLaunchFrmPrescribe) {
                    this.SetDefaultTabByKey(CConstants.sTabChartKey);
                }
                else {
                    MedChartData.IsLaunchFrmPrescribe = false;
                }
                if (ContextManager.Instance["FromFB"] != null && String.Compare(ContextManager.Instance["FromFB"].ToString(), "true") == 0 && MedAdminVM.bFirstTime) {
                    MedAdminVM.bFirstTime = false;
                    this.SetDefaultTabByKey(CConstants.sTabInfusionKey);
                }
            }

            let oFauxTab: iTab = ObjectHelper.CreateType<iTab>((ObjectHelper.CreateType<iTabItem>(this.Parent, iTabItem)).Parent, iTab);
            let oFauxTabItem: iTabItem = oFauxTab.GetItem(CConstants.sTabInfusionKey);
            if (oFauxTabItem instanceof iTabItem && oFauxTabItem.Key == CConstants.sTabInfusionKey) {
                let isDueOverdueSlotExist: boolean = (MedChartData.InfusionChartAlertInfo != null && (String.Compare(MedChartData.InfusionChartAlertInfo.DueStatus, SlotStatus.DUENOW, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(MedChartData.InfusionChartAlertInfo.DueStatus, SlotStatus.OVERDUE, StringComparison.CurrentCultureIgnoreCase) == 0));
                oFauxTabItem.HeaderImageList = new List<HeaderImageListItem>();
                if (MedChartData.InfusionChartAlertInfo != null && MedChartData.InfusionChartAlertInfo.InfusionAlertExist && isDueOverdueSlotExist) {
                    oFauxTabItem.HeaderImageList.Add(ObjectHelper.CreateObject(new HeaderImageListItem(), { HeaderImage: MedImage.GetPath(MedImages.InfDuenessAlertIcon), HeaderImageAlignment: HeaderImageAlignment.Right, HeaderImgToolTip: Resource.InfusionChart.infDuenessAlert_Tooltip }));
                    oFauxTabItem.HeaderImageList.Add(ObjectHelper.CreateObject(new HeaderImageListItem(), { HeaderImage: MedImage.GetPath(MedImages.InfChartAlertIcon), HeaderImageAlignment: HeaderImageAlignment.Right, HeaderImgToolTip: Resource.InfusionChart.infNotifyAlert_Tooltip }));
                    ChartContext.IsInfusionAlertsNotReviewed = true;
                }
                else if (MedChartData.InfusionChartAlertInfo != null && MedChartData.InfusionChartAlertInfo.InfusionAlertExist) {
                    oFauxTabItem.HeaderImageList.Add(ObjectHelper.CreateObject(new HeaderImageListItem(), { HeaderImage: MedImage.GetPath(MedImages.InfChartAlertIcon), HeaderImageAlignment: HeaderImageAlignment.Right, HeaderImgToolTip: Resource.InfusionChart.infNotifyAlert_Tooltip }));
                    ChartContext.IsInfusionAlertsNotReviewed = true;
                }
                else if (isDueOverdueSlotExist) {
                    oFauxTabItem.HeaderImageList.Add(ObjectHelper.CreateObject(new HeaderImageListItem(), { HeaderImage: MedImage.GetPath(MedImages.InfDuenessAlertIcon), HeaderImageAlignment: HeaderImageAlignment.Right, HeaderImgToolTip: Resource.InfusionChart.infDuenessAlert_Tooltip }));
                    ChartContext.IsInfusionAlertsNotReviewed = true;
                }
                oFauxTabItem.UpdateHeaderForChart();
            }
        }
        this.isPrescribeLinkClicked = false;
        if (!MedChartData.IsMedChartReadOnly && MedChartData.bRequestMedicationVisible) {
            if (!String.IsNullOrEmpty(MedChartData.RefreshTriggeredCACode) && (String.Equals(MedChartData.RefreshTriggeredCACode, "MN_MEDINPATSL_P2", StringComparison.InvariantCultureIgnoreCase) || String.Equals(MedChartData.RefreshTriggeredCACode, "MN_MED_VALIDATE_S_P2", StringComparison.InvariantCultureIgnoreCase) || String.Equals(MedChartData.RefreshTriggeredCACode, "MN_MED_REQUEST", StringComparison.InvariantCultureIgnoreCase))) {
                if (String.Equals(MedChartData.RefreshTriggeredCACode, "MN_MEDINPATSL_P2", StringComparison.InvariantCultureIgnoreCase)) {
                    let oMedsAdminMainView: MedsAdminMainView = GetMedsChartData.GetMedAdminMainViewTab(this);
                    if (oMedsAdminMainView != null) {
                        oMedsAdminMainView.DrawAlertIconNextToOverviewTab();
                    }
                }
                MedChartData.RefreshTriggeredCACode = String.Empty;
            }
        }
        this.medicationControlLoaded = true;
        Busyindicator.SetStatusIdle("MedsChartView");
    }

    CommonBB_PatientBSADataCompletedEvent_chart(Formula: string, BSA: string) {
        let MedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
        let sHtWtBSA: string = MedChartData.PatinetInfo.Observation;
        if (!String.IsNullOrEmpty(PatientContext.BSA))
            sHtWtBSA += " " + PatientContext.BSA + MedsAdminChartToolTip.PatientBSAUOMText;
        MedAdminVM.PatientHtWtBSAText = sHtWtBSA;
    }
    public btnDischargePrescriptions_Click(event: any): void {
        this.FillDischgPrescriptions(MedChartData.MedEncounter);
    }


    public FillDischgPrescriptions(lstEncounter: ObservableCollection<Encounter>): void {
        // ObjectHelper.stopFinishAndCancelEvent(true);
        let oMedsAdminDischgPrescriptions: MedsAdminDischgPrescriptions = new MedsAdminDischgPrescriptions();
        //oMedsAdminDischgPrescriptions.nDialogClose = this.oMedsAdminRec_Closed;
        if (lstEncounter != null && lstEncounter.Count > 0) {
            var oOrderedEncList = lstEncounter.OrderByDescending(oItem => oItem.EncounterOID);
            var oCurrentEnc = oOrderedEncList.Where(oItem => oItem.Current == '1');
            let nCurrentEncounterOID: number = (oCurrentEnc != null && oCurrentEnc.Count() > 0) ? oCurrentEnc.First().EncounterOID : oOrderedEncList.First().EncounterOID;

            MedChartData.oPrescriptionItemViewVM = new PrescriptionItemViewVM();
            MedChartData.oPrescriptionItemViewVM.GetPatientMedications("CC_DSCHRG", '7', ChartContext.EncounterOID > 0 ? ChartContext.EncounterOID : nCurrentEncounterOID, MedChartData.oPrescriptionItemViewVM.Resolve_GetPatientMedicationListCompleted);
            MedChartData.oPrescriptionItemViewVM.GetPatientMedicationListCompleted.subscribe(data => {
                AppActivity.OpenWindow("Discharge prescriptions - LORENZO -- Webpage Dialog", oMedsAdminDischgPrescriptions, (s, e) => { this.oMedsAdminDischgPrescriptions_Closed(s) }, "", false, 305, 720, false, WindowButtonType.Close, null);
            })
        }
    }
    oMedsAdminDischgPrescriptions_Closed(args: AppDialogEventargs): void {
        // ObjectHelper.stopFinishAndCancelEvent(false);
        this.oChildWindow = args.AppChildWindow;
        this.oChildWindow.DialogRef.close();
    }
    CheckValidation(TagObject: TagObject): boolean {
        let sErrorMsg: string = String.Empty;
        let dtCurrentDate: DateTime = CommonBB.GetServerDateTime();
        if (!UserPermissions.CanManageMedAdministration && !(TagObject.oIChartSlot instanceof TodayMultiSlot) && !(TagObject.oIChartSlot instanceof TodayAsRequiredSlot)) {
            this.ShowErrorMessage(Resource.MedsAdminChartOverview.CanManageMedAdministration, MessageBoxButton.OK, MessageBoxType.Critical);
            return false;
        }
        if (!(TagObject.oIChartSlot instanceof TodayMultiSlot)) {
            let IsPreviousActiveSequentialItem: boolean = false;
            let oTagDrugHeaderDetail: TagDrugHeaderDetail = <TagDrugHeaderDetail>(this.oClickedSlotTagObject.oDrugItem).Tag;
            IsPreviousActiveSequentialItem = this.oGetMedsChartData.oChartRowList.Any(c => (c.DrugItem != null) && (c.DrugItem.Tag != null) && (c.DrugItem.Tag instanceof TagDrugHeaderDetail) && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).ParentPrescriptionItemOID > 0 && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).ParentPrescriptionItemOID == oTagDrugHeaderDetail.ParentPrescriptionItemOID && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).InfusionSeqOrder < oTagDrugHeaderDetail.InfusionSeqOrder && !String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.InvariantCultureIgnoreCase));
            if (!IsPreviousActiveSequentialItem && oTagDrugHeaderDetail.ParentPrescriptionItemOID > 0 && oTagDrugHeaderDetail.InfusionSeqOrder > 1) {
                let oParam: string[] = new Array(4);
                oParam[0] = oTagDrugHeaderDetail.ParentPrescriptionItemOID.ToString();
                oParam[1] = oTagDrugHeaderDetail.InfusionSeqOrder.ToString();
                oParam[2] = "0";
                oParam[3] = ChartContext.PatientOID.ToString();
                let IsPreviousSeqItemActive: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("GetPreviousSeqItemActive", oParam), 'string');
                IsPreviousActiveSequentialItem = String.Equals(IsPreviousSeqItemActive, "1", StringComparison.InvariantCultureIgnoreCase) ? true : false;
            }
            if (IsPreviousActiveSequentialItem) {
                sErrorMsg = String.Empty;
                sErrorMsg = String.Format(Resource.InfusionChart.PreviousContSeqInProgress, oTagDrugHeaderDetail.DrugName);
                this.ShowErrorMessage(sErrorMsg, MessageBoxButton.OK, MessageBoxType.Critical);
                return false;
            }
        }
        if (!String.IsNullOrEmpty((ObjectHelper.CreateType<TagDrugHeaderDetail>(TagObject.oDrugItem.Tag, TagDrugHeaderDetail)).DrugName)) {
            this.sDurgName = (ObjectHelper.CreateType<TagDrugHeaderDetail>(TagObject.oDrugItem.Tag, TagDrugHeaderDetail)).DrugName;
        }
        let IsUnackConflictExists: string = (ObjectHelper.CreateType<TagDrugHeaderDetail>(TagObject.oDrugItem.Tag, TagDrugHeaderDetail)).UnackIsConflictExists;
        let oTmpTagDrugHeaderDetail: TagDrugHeaderDetail = (ObjectHelper.CreateType<TagDrugHeaderDetail>(TagObject.oDrugItem.Tag, TagDrugHeaderDetail));
        let bTmpIsPRN: boolean = oTmpTagDrugHeaderDetail != null ? oTmpTagDrugHeaderDetail.IsPRN : false;
        let bTmpPRNWithSchedule: boolean = oTmpTagDrugHeaderDetail != null ? oTmpTagDrugHeaderDetail.IsPRNWithSchedule : false;
        if (!this.isCloseToMidNightAlertForPRNShown && bTmpIsPRN && !bTmpPRNWithSchedule) {
            let dtChartColumnDate: DateTime;            
	                if (((dtCurrentDate.TimeOfDay.TotalMinutes) < (new TimeSpan(0, 0, 30, 59).TotalMinutes) || (dtCurrentDate.TimeOfDay.TotalMinutes) >= (new TimeSpan(0, 23, 30, 0).TotalMinutes)) && TagObject != null && TagObject.oChartColumn != null && !String.IsNullOrEmpty(TagObject.oChartColumn.Caption) && DateTime.TryParse(TagObject.oChartColumn.Caption, (o) => { dtChartColumnDate = o; }) && DateTime.LessThanOrEqualTo(dtChartColumnDate.Date,(dtCurrentDate.Date))) 
			{
                this.isCloseToMidNightAlertForPRNShown = true;
                sErrorMsg = Resource.MedicationAdministrator.CloseToMidNightAlertForPRN;
                this.ShowErrorMessage(sErrorMsg, MessageBoxButton.OK, MessageBoxType.Information);
                return false;
            }
        }
        if (!bTmpIsPRN && !this.IsDiscontinuedErrorMsgExists && TagObject.oDrugItem.PStatusIcon != null && !String.IsNullOrEmpty(TagObject.oDrugItem.PStatusIcon.Key) && String.Compare(TagObject.oDrugItem.PStatusIcon.Key, "DISCONTINUED", StringComparison.CurrentCultureIgnoreCase) == 0) {
            this.IsDiscontinuedErrorMsgExists = true;
            sErrorMsg = MedsAdminChartToolTip.DiscontinuedErrorMsg;
            this.ShowErrorMessage(sErrorMsg, MessageBoxButton.YesNo, MessageBoxType.Question);
            return false;
        }
        if (!this.IsConflictsErrorMsgExists && this.IsNotAllNotYetRecordedExists && TagObject != null && TagObject.oDrugItem != null && (String.Compare(this.sSlotStatus, SlotStatus.NOTYETRECORDED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.sSlotStatus, SlotStatus.DUENOW, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.sSlotStatus, SlotStatus.OVERDUE, StringComparison.CurrentCultureIgnoreCase) == 0 || (TagObject.oIChartSlot instanceof TodayAsRequiredSlot) || (TagObject.oIChartSlot instanceof TodayMultiSlot)) && IsUnackConflictExists == 'R' && TagObject.oDrugItem.DrugnameIcon1 != null && !String.IsNullOrEmpty(TagObject.oDrugItem.DrugnameIcon1.Key) && String.Compare(TagObject.oDrugItem.DrugnameIcon1.Key, "Conflicts", StringComparison.CurrentCultureIgnoreCase) == 0) {
            this.IsConflictsErrorMsgExists = true;
            sErrorMsg = MedsAdminChartToolTip.UnacknowledgedConflictsErrorMsg;
            this.ShowErrorMessage(sErrorMsg, MessageBoxButton.YesNo, MessageBoxType.Question);
            return false;
        }
        let lnMedAdminOID: number = 0;
        if (TagObject.oIChartSlot instanceof AdministratedSlot) {
            this.oTagSlotDetail = <TagSlotDetail>(<AdministratedSlot>TagObject.oIChartSlot).Tag;
            lnMedAdminOID = this.oTagSlotDetail.MedsAdminOID;
        }
        else if (TagObject.oIChartSlot instanceof DefaultSlot) {
            this.oTagSlotDetail = <TagSlotDetail>(<DefaultSlot>TagObject.oIChartSlot).Tag;
            lnMedAdminOID = this.oTagSlotDetail.MedsAdminOID;
        }
        else if (TagObject.oIChartSlot instanceof AsRequiredSlot) {
            this.oTagSlotDetail = <TagSlotDetail>(<AsRequiredSlot>TagObject.oIChartSlot).Tag;
            lnMedAdminOID = this.oTagSlotDetail.MedsAdminOID;
        }
        let MedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
        let nParaAdminCnt: number = 0;
        let bIsParaDrug: boolean = false;
        if (!this.IsAnotherAdminDueErrMsgExists && this.IsNextDueSlotExists) {
            this.IsAnotherAdminDueErrMsgExists = true;
            sErrorMsg = "Another administration is due later than the selected slot for " + this.sDurgName + ". Do you wish to proceed?";
            this.ShowErrorMessage(sErrorMsg, MessageBoxButton.YesNo, MessageBoxType.Question);
            return false;
        }
        else if (!this.IsOutsideAdminTimeErrMsgExists && (String.Compare(this.sSlotStatus, SlotStatus.PLANNED, StringComparison.CurrentCultureIgnoreCase) == 0 || (String.Equals(this.sSlotStatus, SlotStatus.PATIENTSELFADMIN, StringComparison.CurrentCultureIgnoreCase))) && DateTime.NotEquals(this.dtSlotDateTime, DateTime.MinValue) && MedChartData.AdvDurationForRecording > 0) {
            let sDrugName: string = String.Empty;
            sDrugName = (ObjectHelper.CreateType<TagDrugHeaderDetail>(this.oSlotVM.DrugDetail.Tag, TagDrugHeaderDetail)).DrugName;
            let TimeDifference: number = Convert.ToInt32(this.dtSlotDateTime.Subtract(this.dtCurrentDateTime).TotalMinutes);
            if (TimeDifference > 0 && TimeDifference > MedChartData.DuenessThreshold && TimeDifference <= MedChartData.AdvDurationForRecording) {
                this.IsOutsideAdminTimeErrMsgExists = true;
                sErrorMsg = "The slot selected for " + this.sDurgName + " is outside the administration time allowed. Do you wish to continue?";
                this.ShowErrorMessage(sErrorMsg, MessageBoxButton.YesNo, MessageBoxType.Question);
                return false;
            }
            else if (TimeDifference > MedChartData.AdvDurationForRecording) {
                this.IsOutsideAdminTimeErrMsgExists = true;
                sErrorMsg = "The slot selected for " + this.sDurgName + " is outside the administration time allowed.";
                this.ShowErrorMessage(sErrorMsg, MessageBoxButton.OK, MessageBoxType.Critical);
                return false;
            }
        }
        if (MedAdminVM != null && MedAdminVM.CumulativeParacetamol.ParacetamolAdministeredCount.HasValue) {
            nParaAdminCnt = MedAdminVM.CumulativeParacetamol.ParacetamolAdministeredCount.Value;
        }
        let oDrugTag: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(TagObject.oDrugItem.Tag, TagDrugHeaderDetail);
        if (oDrugTag != null) {
            bIsParaDrug = oDrugTag.IsParacetamolIngredient;
        }
        if (bIsParaDrug && this.oTagSlotDetail != null && DateTime.NotEquals(this.oTagSlotDetail.SlotDateTime, DateTime.MinValue) && this.sParacetamolRecentlyAdministered == -1 && ((String.Compare(this.sSlotStatus, SlotStatus.PLANNED, StringComparison.CurrentCultureIgnoreCase) == 0) || (String.Compare(this.sSlotStatus, SlotStatus.OVERDUE, StringComparison.CurrentCultureIgnoreCase) == 0) || (String.Compare(this.sSlotStatus, SlotStatus.DUENOW, StringComparison.CurrentCultureIgnoreCase) == 0) || (String.Compare(this.sSlotStatus, SlotStatus.DEFERDUENOW, StringComparison.CurrentCultureIgnoreCase) == 0) || (String.Compare(this.sSlotStatus, SlotStatus.DEFEROVERDUE, StringComparison.CurrentCultureIgnoreCase) == 0) || (String.Compare(this.sSlotStatus, SlotStatus.PATIENTSELFADMIN, StringComparison.CurrentCultureIgnoreCase) == 0) || (String.Compare(this.sSlotStatus, SlotStatus.HOMELEAVE, StringComparison.CurrentCultureIgnoreCase) == 0) || (String.Compare(this.sSlotStatus, SlotStatus.NOTYETRECORDED, StringComparison.CurrentCultureIgnoreCase) == 0))) {
            {
                let oSlotHelper: SlotAdministrationHelper = new SlotAdministrationHelper();
                //oSlotHelper.TriggerParacetamolWarningEvent -= oSlotHelper_TriggerParacetamolWarningEvent;
                oSlotHelper.TriggerParacetamolWarningEvent = (s, e) => { this.oSlotHelper_TriggerParacetamolWarningEvent(s); };
                oSlotHelper.IsAnyParacetamolAdministered(dtCurrentDate, this.oTagSlotDetail.SlotOID);
                Busyindicator.SetStatusBusy("CheckParaAdministered");
                this.sParacetamolRecentlyAdministered = 0;
            }
            return false;
        }
        if (((String.Compare(this.sSlotStatus, SlotStatus.OVERDUE, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.sSlotStatus, SlotStatus.DUENOW, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.sSlotStatus, SlotStatus.DEFERDUENOW, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.sSlotStatus, SlotStatus.NOTYETRECORDED, StringComparison.CurrentCultureIgnoreCase) == 0) && lnMedAdminOID == 0) || String.Compare(this.sSlotStatus, SlotStatus.DEFEROVERDUE, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.sSlotStatus, SlotStatus.PATIENTSELFADMIN, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.sSlotStatus, SlotStatus.PLANNED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.sSlotStatus, SlotStatus.HOMELEAVE, StringComparison.CurrentCultureIgnoreCase) == 0) {
            if (bIsParaDrug && nParaAdminCnt > 3 && (this.IsCumulativeWarningAcknowledged == null || (this.IsCumulativeWarningAcknowledged.HasValue && !this.IsCumulativeWarningAcknowledged.Value))) {
                this.IsCumulativeWarningAcknowledged = false;
                sErrorMsg = String.Format(MedsAdminChartToolTip.CumulativeWarningMsg, nParaAdminCnt);
                this.ShowErrorMessage(sErrorMsg, MessageBoxButton.YesNo, MessageBoxType.Question,/*MsgBoxTag:*/CConstants.CumulativeWarning,/*MsgBoxHeight:*/160,/*MsgBoxWidth:*/410);
                return false;
            }
        }
        if (!(TagObject.oIChartSlot instanceof TodayMultiSlot) && !this.IsSelfAdministeredErrorMsgExists && (String.Compare(this.sSlotStatus, SlotStatus.NOTYETRECORDED, StringComparison.CurrentCultureIgnoreCase) != 0 || String.Compare(this.sSlotStatus, SlotStatus.OVERDUE, StringComparison.CurrentCultureIgnoreCase) != 0 || String.Compare(this.sSlotStatus, SlotStatus.DEFEROVERDUE, StringComparison.CurrentCultureIgnoreCase) != 0 || String.Compare(this.sSlotStatus, SlotStatus.DUENOW, StringComparison.CurrentCultureIgnoreCase) != 0 || String.Compare(this.sSlotStatus, SlotStatus.DEFERDUENOW, StringComparison.CurrentCultureIgnoreCase) != 0) && this.oTagSlotDetail != null && this.oTagSlotDetail.IsSelfAdministered == true) {
            this.IsSelfAdministeredErrorMsgExists = true;
            sErrorMsg = MedsAdminChartToolTip.SelfAdministeredErrorMsg;
            this.ShowErrorMessage(sErrorMsg, MessageBoxButton.YesNo, MessageBoxType.Question);
            return false;
        }
        else if (!this.IsTitratedDoseEmptyErrMsgExists && this.IsTBDSlot) {
            this.IsTitratedDoseEmptyErrMsgExists = true;
            sErrorMsg = MedsAdminChartToolTip.TitratedDoseEmptyErrMsg;
            this.ShowErrorMessage(sErrorMsg, MessageBoxButton.YesNo, MessageBoxType.Question);
            return false;
        }
        if (TagObject != null && !(TagObject.oIChartSlot instanceof TodayMultiSlot) && !(TagObject.oIChartSlot instanceof TodayAsRequiredSlot) && oTmpTagDrugHeaderDetail != null && oTmpTagDrugHeaderDetail.MultiRoute_Type == MultiRouteType.Mixed_Routes) {
            if (TagObject.oDrugItem != null && this.oTagSlotDetail != null) {
                if (_.get(oTmpTagDrugHeaderDetail, 'InfInProgressSlotDTTM') && DateTime.NotEquals(oTmpTagDrugHeaderDetail.InfInProgressSlotDTTM, DateTime.MinValue)) {
                    sErrorMsg = String.Format(MedsAdminChartToolTip.MixedMultiRouteInProgress_ErrorMsg, oTmpTagDrugHeaderDetail.InfInProgressSlotDTTM.ToString(CConstants.DateTimeFormat), this.sDurgName);
                    this.ShowErrorMessage(sErrorMsg, MessageBoxButton.OK, MessageBoxType.Information, null, 160, 410);
                    return false;
                }
                let tempInProgressSlot: ObservableCollection<IChartSlot> = new ObservableCollection<IChartSlot>();
                let drug: IEnumerable<ChartRow> = this.MedicationChartControl.ChartRows.Where(drg => String.Compare(drg.Key.Split('-')[1], TagObject.oDrugItem.Key) == 0);
                drug.forEach(odrug => {
                    odrug.ChartCells.forEach(drugSlots => {
                        drugSlots.Slots.forEach(slot => {
                            if ((slot instanceof BlankSlot) && ((<TagSlotDetail>(<BlankSlot>slot).Tag) != null) &&
                                ((<TagSlotDetail>(<BlankSlot>slot).Tag).SlotStatus == SlotStatus.INPROGRESS || (<TagSlotDetail>(<BlankSlot>slot).Tag).SlotStatus == SlotStatus.PAUSED) &&
                                DateTime.LessThanOrEqualTo((<TagSlotDetail>(<BlankSlot>slot).Tag).SlotDateTime, this.oTagSlotDetail.SlotDateTime)) {
                                tempInProgressSlot.Add(slot);
                            }
                        })
                    })
                });
                let InProgressSlot = tempInProgressSlot.FirstOrDefault();

                if (InProgressSlot != null) {
                    let oDefSlot: BlankSlot = ObjectHelper.CreateType<BlankSlot>(InProgressSlot, BlankSlot);
                    if (oDefSlot != null) {
                        let tmpTagSlotDtl: TagSlotDetail = ObjectHelper.CreateType<TagSlotDetail>(oDefSlot.Tag, TagSlotDetail);
                        if (tmpTagSlotDtl != null)
                            sErrorMsg = String.Format(MedsAdminChartToolTip.MixedMultiRouteInProgress_ErrorMsg, tmpTagSlotDtl.SlotDateTime.ToString(CConstants.DateTimeFormat), this.sDurgName);
                        else sErrorMsg = String.Format(MedsAdminChartToolTip.MixedMultiRouteInProgress_ErrorMsg, DateTime.Now.ToString(CConstants.DateTimeFormat), this.sDurgName);
                    }
                    this.ShowErrorMessage(sErrorMsg, MessageBoxButton.OK, MessageBoxType.Information, null, 160, 410);
                    return false;
                }
            }
        }
        return true;
    }
    oSlotHelper_TriggerParacetamolWarningEvent(bParacetamolAdministered: boolean): void {
        Busyindicator.SetStatusIdle("CheckParaAdministered");
        if (bParacetamolAdministered) {
            this.ShowErrorMessage(Resource.MedicationAdministrator.ParacetamolAdministration_WarningMsg, MessageBoxButton.YesNo, MessageBoxType.Question,/*MsgBoxTag:*/CConstants.ParacetamolRecentlyAdministered,/*MsgBoxHeight:*/180,/*MsgBoxWidth:*/400);
            this.oSlotVM.IsAnyParacetamolAdministeredInGivenPeriod = bParacetamolAdministered;
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
            Busyindicator.SetStatusIdle("MedChart");
            this.iMsgBox = ObjectHelper.CreateObject(new iMessageBox(), {
                Title: "LORENZO",
                Message: sErrorMsg,
                MessageButton: oMessageBoxButton,
                IconType: oMessageBoxType
            });
            if (MsgBoxTag != null)
                this.iMsgBox.Tag = MsgBoxTag;
            if (MsgBoxHeight != null && MsgBoxHeight.HasValue)
                this.iMsgBox.Height = MsgBoxHeight.Value;
            if (MsgBoxWidth != null && MsgBoxWidth.HasValue)
                this.iMsgBox.Width = MsgBoxWidth.Value;
            this.iMsgBox.OverlayBrush = new SolidColorBrush(Colors.Transparent);
            this.iMsgBox.MessageBoxClose = (s, e) => { this.iMsgBox_MessageBoxClose(s, e); };
            this.iMsgBox.Show();
            // ObjectHelper.stopFinishAndCancelEvent(true);
        }
    }
    iMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        // ObjectHelper.stopFinishAndCancelEvent(false);
        this.IsActivityLaunchedInSlot = false;
        let isParacetamolGivenMsg: boolean = this.iMsgBox != null && typeof this.iMsgBox.Tag === "string" && String.Compare(this.iMsgBox.Tag.ToString(), CConstants.ParacetamolRecentlyAdministered) == 0;
        if (e.MessageBoxResult == MessageBoxResult.Yes || (this.isCloseToMidNightAlertForPRNShown && e.MessageBoxResult == MessageBoxResult.OK)) {
            this.IsActivityLaunchedInSlot = true;
            let isCumulativeMsg: boolean = this.iMsgBox != null && typeof this.iMsgBox.Tag === "string" && String.Compare(this.iMsgBox.Tag.ToString(), CConstants.CumulativeWarning) == 0;
            if (isCumulativeMsg) {
                this.IsCumulativeWarningAcknowledged = true;
            }
            if (isParacetamolGivenMsg) {
                this.sParacetamolRecentlyAdministered = 1;
            }
            if (this.oClickedSlotTagObject != null && this.oTagSlotDetail != null) {
                if (this.oClickedSlotTagObject.oDrugItem != null && this.CheckValidation(this.oClickedSlotTagObject)) {
                    let oTagDefaultSlotDtl: TagSlotDetail = null;
                    if (this.oClickedSlotTagObject.oIChartSlot instanceof DefaultSlot) {
                        oTagDefaultSlotDtl = ObjectHelper.CreateType<TagSlotDetail>((ObjectHelper.CreateType<DefaultSlot>(this.oClickedSlotTagObject.oIChartSlot, DefaultSlot)).Tag, TagSlotDetail);
                        let oSlotHelper: SlotAdministrationHelper = new SlotAdministrationHelper();
                        // oSlotHelper.WarningBeforeAdministrationCompletedEvent -= oSlotHelper_WarningBeforeAdministrationCompleted;
                        oSlotHelper.WarningBeforeAdministrationCompletedEvent = (s, e) => { this.oSlotHelper_WarningBeforeAdministrationCompleted(s, e); };
                        oSlotHelper.CheckDuplicateSlotWarningExists(this.oTagDrugHeaderDetail, oTagDefaultSlotDtl.SlotOID, oTagDefaultSlotDtl.SlotStatus, this.oTagDrugHeaderDetail.IsPGD, LaunchAdminType.LaunchRecordAdmin);
                        this.IsDiscontinuedErrorMsgExists = false;
                    }
                    else if ((this.oClickedSlotTagObject.oIChartSlot instanceof AdministratedSlot)) {
                        if (this.oTagSlotDetail.MedsAdminOID > 0 || (this.oTagSlotDetail.SlotStatus == "CC_NOTKNOWN" && this.oTagSlotDetail.MedsAdminOID == 0)) {
                            let oTagAdministratedSlotDtl: TagSlotDetail = ObjectHelper.CreateType<TagSlotDetail>((ObjectHelper.CreateType<AdministratedSlot>(this.oClickedSlotTagObject.oIChartSlot, AdministratedSlot)).Tag, TagSlotDetail);
                            let oSlotHelper: SlotAdministrationHelper = new SlotAdministrationHelper();
                            //oSlotHelper.WarningBeforeAdministrationCompletedEvent -= oSlotHelper_WarningBeforeAdministrationCompleted;
                            oSlotHelper.WarningBeforeAdministrationCompletedEvent = (s, e) => { this.oSlotHelper_WarningBeforeAdministrationCompleted(s, e); };
                            oSlotHelper.CheckDuplicateSlotWarningExists(this.oTagDrugHeaderDetail, oTagAdministratedSlotDtl.SlotOID, oTagAdministratedSlotDtl.SlotStatus, this.oTagDrugHeaderDetail.IsPGD, LaunchAdminType.LaunchModifyAdmin);
                        }
                        else {
                            let oSlotHelper: SlotAdministrationHelper = new SlotAdministrationHelper();
                            //oSlotHelper.WarningBeforeAdministrationCompletedEvent -= oSlotHelper_WarningBeforeAdministrationCompleted;
                            oSlotHelper.WarningBeforeAdministrationCompletedEvent = (s, e) => { this.oSlotHelper_WarningBeforeAdministrationCompleted(s, e); };
                            oSlotHelper.CheckDuplicateSlotWarningExists(this.oTagDrugHeaderDetail, oTagDefaultSlotDtl.SlotOID, oTagDefaultSlotDtl.SlotStatus, this.oTagDrugHeaderDetail.IsPGD, LaunchAdminType.LaunchRecordAdmin);
                        }
                        this.IsDiscontinuedErrorMsgExists = false;
                    }
                    else if (this.oClickedSlotTagObject.oIChartSlot instanceof TodayAsRequiredSlot) {
                        this.LaunchPRNSlot(this.oClickedSlotTagObject);
                        this.IsDiscontinuedErrorMsgExists = false;
                    }
                    else if (this.oClickedSlotTagObject.oIChartSlot instanceof TodayMultiSlot) {
                        this.LaunchMultiSlot(this.oClickedSlotTagObject);
                        this.IsDiscontinuedErrorMsgExists = false;
                    }
                }
            }
            else if (this.oClickedSlotTagObject != null) {
                if (this.oClickedSlotTagObject.oDrugItem != null && this.CheckValidation(this.oClickedSlotTagObject)) {
                    if (this.oClickedSlotTagObject.oIChartSlot instanceof TodayAsRequiredSlot) {
                        this.LaunchPRNSlot(this.oClickedSlotTagObject);
                        this.IsDiscontinuedErrorMsgExists = false;
                    }
                    else if (this.oClickedSlotTagObject.oIChartSlot instanceof TodayMultiSlot) {
                        this.LaunchMultiSlot(this.oClickedSlotTagObject);
                        this.IsDiscontinuedErrorMsgExists = false;
                    }
                }
            }
        }
        else {
            if (isParacetamolGivenMsg) {
                this.sParacetamolRecentlyAdministered = -1;
            }
        }
    }
    LaunchPrescriptionDetails(PrescriptionItemOID: number, sDrugName: string, sHeight: string, sDefaulttab: string, sItemSubType: string, LorenzoID: string, MCVersionNo: string, DoseCalcExist: string): void {
        // ObjectHelper.stopFinishAndCancelEvent(true);
        this.ddetChild = new medddetailsChild();
        this.ddetChild.MedDetailsUserControl.PrescriptionItemOID = PrescriptionItemOID;
        this.ddetChild.MedDetailsUserControl.MCVersion = !String.IsNullOrEmpty(MCVersionNo) ? MCVersionNo : AppSessionInfo.AMCV;
        this.ddetChild.MedDetailsUserControl.LorenzoID = LorenzoID;
        this.ddetChild.MedDetailsUserControl.DoseCalcExist = DoseCalcExist;
        this.ddetChild.MedDetailsUserControl.ServiceOID = MedChartData.ServiceOID;
        this.ddetChild.MedDetailsUserControl.LocationOID = MedChartData.LocationOID;
        if (!String.IsNullOrEmpty(sDefaulttab))
            this.ddetChild.MedDetailsUserControl.sDefaultTab = sDefaulttab;
        this.ddetChild.MedDetailsUserControl.oLaunchFrom = SVIconLaunchFrom.MedChart;
        this.ddetChild.MedDetailsUserControl.PresType = PrescriptionTypes.ForAdministration;
        if (sDefaulttab == "SupplyInstructions")
            this.ddetChild.MedDetailsUserControl.TechValDef = true;
        if (String.Compare(sItemSubType, CConstants.ItemSubType, StringComparison.InvariantCultureIgnoreCase) == 0) {
            sDrugName = MedsAdminChartToolTip.AdhocItemCaption;
        }
        this.ddetChild.onDialogClose = (e) => this.ddetChild_Closed(e);
        let dialogWindowHeight = (Convert.ToInt64(sHeight)/window.devicePixelRatio); 
        AppActivity.OpenWindow(sDrugName, this.ddetChild, (e) => this.ddetChild_Closed(e), "", false, dialogWindowHeight, 930, false, WindowButtonType.Close, null);
    }
    private ddetChild_Closed(args: AppDialogEventargs): void {
        // this.ddetChild.appDialog.DialogResult = true;
        // ObjectHelper.stopFinishAndCancelEvent(false);
        args.AppChildWindow.DialogResult = true;
    }

    private ConditionalVM: ConditionalDoseVM;
    private MultiDoseDetailVM: MultipleDoseDetail;
    private sTitle: string = String.Empty;
    LaunchDoseTypeScreen(PrescriptionItemOID: number, sDrugName: string, sDoseType: string, sInfusiontype: string): void {
        // ObjectHelper.stopFinishAndCancelEvent(true);
        if (String.Compare(sDoseType, DoseTypeCode.CONDITIONAL, StringComparison.OrdinalIgnoreCase) == 0) {
            if (this.ConditionalVM == null || (this.ConditionalVM != null && this.ConditionalVM.lnPrescriptionItemOID != PrescriptionItemOID)) {
                this.ConditionalVM = ObjectHelper.CreateObject(new ConditionalDoseVM(RequestSource.ViewDrugDetails, PrescriptionItemOID, false), { DrugName: sDrugName });
            }
            let objConditional: MedConditionalDose = new MedConditionalDose();
            objConditional.DataContext = this.ConditionalVM;
            objConditional.DoseType = sDoseType.Trim();
            objConditional.InfusionType = sInfusiontype;
            objConditional.onDialogClose = (s) => { this.omedobjConditional1_Closed(s); }
            AppActivity.OpenWindow((sDrugName + " - LORENZO -- Webpage Dialog"), objConditional, (s) => { this.omedobjConditional1_Closed(s); }, "", false, 250, 460, false, WindowButtonType.Close, null);
        }
        else if (String.Compare(sDoseType, DoseTypeCode.TITRATED, StringComparison.OrdinalIgnoreCase) == 0) {
            if (!this.IsTitratedIconClicked) {
                this.IsTitratedIconClicked = true;
                this.objTitrated = new MedTitratedDose();
                this.MultiDoseDetailVM = new MultipleDoseDetail(PrescriptionItemOID, AppSessionInfo.AMCV, DoseTypeCode.TITRATED, "EPR", PatientContext.PrescriptionType);
                this.MultiDoseDetailVM.TitratedDoseCompleted = (s, e) => { this.MultiDoseDetailVM_TitratedDoseCompleted(); };
                this.sTitle = sDrugName;
            }
        }
        else {
            this.objStepped = new MedSteppedFullPrescriptionVW();
            this.objStepped.oLaunchFrom = SVIconLaunchFrom.MedChart;
            this.objStepped.sPrescriptionTypeCode = PrescriptionTypes.ForAdministration;
            Busyindicator.SetStatusBusy("SteppenFullPrescription");
            this.MultiDoseDetailVM = new MultipleDoseDetail(PrescriptionItemOID, AppSessionInfo.AMCV, sDoseType, "EPR", PatientContext.PrescriptionType);
            let temp =  this.MultiDoseDetailVM.PresItemDoseInfoServicedata.subscribe(()=> {
                this.objStepped.DataContext = this.MultiDoseDetailVM;
                this.objStepped.sInfusionType = sInfusiontype;
                this.objStepped.onDialogClose = this.MedSteppedDose_Closed;
                AppActivity.OpenWindow(sDrugName + " - LORENZO -- Webpage Dialog", this.objStepped, this.MedSteppedDose_Closed, "", false, 600, 950, false, WindowButtonType.Close, null);
                temp.unsubscribe(); 
            });
        }
    }
    omedobjConditional1_Closed(args: AppDialogEventargs): void {
        // ObjectHelper.stopFinishAndCancelEvent(false);
        args.AppChildWindow.DialogResult = true;
    }
    MultiDoseDetailVM_TitratedDoseCompleted(): void {
        this.objTitrated = new MedTitratedDose();
        this.objTitrated.DataContext = this.MultiDoseDetailVM;
        this.objTitrated.onDialogClose = (e) => { this.objTitrated_Closed(e); }
        AppActivity.OpenWindow(this.sTitle, this.objTitrated, (e) => { this.objTitrated_Closed(e); }, "", false, 350, 480, false, WindowButtonType.Close, null);
    }
    private objTitrated_Closed(args: AppDialogEventargs): void {
        // ObjectHelper.stopFinishAndCancelEvent(false);
        this.IsTitratedIconClicked = false;
        args.AppChildWindow.DialogResult = true;
    }
    private MedSteppedDose_Closed(args: AppDialogEventargs): void {
        // ObjectHelper.stopFinishAndCancelEvent(false);
        args.AppChildWindow.DialogResult = true;
    }
    MedicationChartControl_OnDrugHotSpotClick(sender: Object, TagObject: TagObject): void {
        let oChartIcon: ChartIcon = (<ChartIcon>((<FrameworkElement>(sender)).Tag));//#36609 
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
                        this.LaunchPrescriptionDetails(Convert.ToInt64(TagObject.oDrugItem.Key), TagObject.oDrugItem.Drugname, sHeight, oChartIcon.Key, oTagDrugDetail.ItemSubType, oTagDrugDetail.LorenzoID, oTagDrugDetail.MCVersionNo, DoseCalcExist);
                    }
                    else if (String.Compare(oChartIcon.Key, "VariableDose", StringComparison.CurrentCultureIgnoreCase) == 0) {
                        if (TagObject.oDrugItem.Tag != null && TagObject.oDrugItem.Tag instanceof TagDrugHeaderDetail) {
                            DoseTypeCode = (<TagDrugHeaderDetail>(TagObject.oDrugItem.Tag)).DoseType;
                            let oTagDrugDetail: TagDrugHeaderDetail = <TagDrugHeaderDetail>TagObject.oDrugItem.Tag;
                            this.LaunchDoseTypeScreen(Convert.ToInt64(TagObject.oDrugItem.Key), TagObject.oDrugItem.Drugname, DoseTypeCode, oTagDrugDetail.INFTYCODE);
                        }
                    }
                    else if (String.Compare(oChartIcon.Key, "MultiComponent Drug", StringComparison.CurrentCultureIgnoreCase) == 0) {
                        if (!String.IsNullOrEmpty(TagObject.oDrugItem.Key)) {
                            let oTagDrugHeaderDetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(TagObject.oDrugItem.Tag, TagDrugHeaderDetail);
                            this.LaunchMultiComponentItemDetails(Convert.ToInt64(TagObject.oDrugItem.Key), oTagDrugHeaderDetail.DrugName);
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
        // ObjectHelper.stopFinishAndCancelEvent(true);
        Busyindicator.SetStatusBusy("LaunchSeqMez");
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
            CCommSequentialHelper.LaunchItemsInSequenceMezzanine(PresItemDetails.MedsResolve, this.lGroupSeqNo, this.OnSequentialMezzanineClosed);
            return
        }
        else{
            // ObjectHelper.stopFinishAndCancelEvent(false);
            return
        }
    }
    OnSequentialMezzanineClosed(args: AppDialogEventargs): void {
        // ObjectHelper.stopFinishAndCancelEvent(false);
        if (this!=undefined && typeof(this?.lGroupSeqNo)=="number") {
            this.lGroupSeqNo = 0;
        }
        //  this.objCommPrescriptionItemViewVM.GetMedicationsEvent -= new CommPrescriptionItemViewVM.GetMedicationsDelegate(this.CommPrescriptionItemViewVM_GetMedicationsEvent);
        Busyindicator.SetStatusIdle("LaunchSeqMez");
        if (args != null && args.AppChildWindow != null)
            args.AppChildWindow.DialogResult = true;
    }
    LaunchMultiComponentItemDetails(nMedCharOId: number, sItemName: string): void {
        // ObjectHelper.stopFinishAndCancelEvent(true);
        this.oMedMCItems = new medMCItems();
        this.oMedMCItems.constructorimpl(nMedCharOId, sItemName, String.Empty);
        this.oMedMCItems.onDialogClose = (s) => { this.oMedMCItems_Closed(s); }
        AppActivity.OpenWindow(sItemName, this.oMedMCItems, (s) => { this.oMedMCItems_Closed(s); }, sItemName, false, 400, 600, false, WindowButtonType.Close, null);
    }
    oMedMCItems_Closed(args: AppDialogEventargs): void {
        // ObjectHelper.stopFinishAndCancelEvent(false);
        this.oChildWindow = args.AppChildWindow;
        if (this.oChildWindow != null) {
            this.oChildWindow.DialogResult = true;
        }
    }
    HomeLeavemsgbox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.Yes) {
            let Tagobject: TagObject = ObjectHelper.CreateType<TagObject>(this.msg.Tag, TagObject);
            this.SlotClick(Tagobject);
        }
    }
    MedicationChartControl_OnSlotHotSpotClick(sender: Object, TagObject: TagObject, GridControl: GridExtension): void {
        if (!MedChartData.IsMedChartReadOnly) {
            this.MedicationChartControl.GridControl = GridControl;
            if (Common.CheckIfLockingDurationElapsed()) {
                return
            }
            let isDeferSlot: boolean = false;
            if (TagObject != null && TagObject.oIChartSlot != null && TagObject.oIChartSlot instanceof DefaultSlot && (<DefaultSlot>TagObject.oIChartSlot).Tag != null && (<DefaultSlot>TagObject.oIChartSlot).Tag instanceof TagSlotDetail) {
                let deferslotstatus: string = (<TagSlotDetail>(<DefaultSlot>TagObject.oIChartSlot).Tag).SlotStatus;
                if (deferslotstatus.Equals(SlotStatus.DEFERADMIN, StringComparison.InvariantCultureIgnoreCase) || deferslotstatus.Equals(SlotStatus.DEFERDUENOW, StringComparison.InvariantCultureIgnoreCase) || deferslotstatus.Equals(SlotStatus.DEFEROVERDUE, StringComparison.InvariantCultureIgnoreCase)) {
                    isDeferSlot = true;
                }
            }
            if (String.Compare(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0 && !(TagObject.oIChartSlot instanceof AdministratedSlot) && !isDeferSlot && !Common.IsRetrospectiveSlot(TagObject.oIChartSlot)) {
                if (this.CheckIsSlotOutside(TagObject)) {
                    this.msg = new iMessageBox();
                    this.msg.Title = "Lorenzo";
                    this.msg.MessageButton = MessageBoxButton.YesNo;
                    this.msg.IconType = MessageBoxType.Question;
                    this.msg.Tag = TagObject;
                    //this.msg.MessageBoxClose -= HomeLeavemsgbox_MessageBoxClose;
                    this.msg.MessageBoxClose = (s, e) => { this.HomeLeavemsgbox_MessageBoxClose(s, e); };
                    this.msg.Message = Resource.MedicationChart.HomeLeaveMsg;
                    this.msg.Show();
                }
            }
            else {
                this.SlotClick(TagObject);
            }
        }
    }
    CheckIsSlotOutside(TagObject: TagObject): boolean {
        this.oTagSlotDetail = <TagSlotDetail>(<DefaultSlot>TagObject.oIChartSlot).Tag;
        this.dtSlotDateTime = this.oTagSlotDetail.SlotDateTime;
        if ((String.Equals(this.oTagSlotDetail.SlotStatus, SlotStatus.PLANNED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.oTagSlotDetail.SlotStatus, SlotStatus.PATIENTSELFADMIN, StringComparison.CurrentCultureIgnoreCase)) && DateTime.NotEquals(this.dtSlotDateTime, DateTime.MinValue) && MedChartData.AdvDurationForRecording > 0) {
            let TimeDifference: number = Convert.ToInt32(this.dtSlotDateTime.Subtract(this.dtCurrentDateTime).TotalMinutes);
            if (TimeDifference > MedChartData.AdvDurationForRecording) {
                let sErrorMsg: string = String.Empty;
                this.IsOutsideAdminTimeErrMsgExists = true;
                sErrorMsg = "The slot selected for " + (ObjectHelper.CreateType<TagDrugHeaderDetail>(TagObject.oDrugItem.Tag, TagDrugHeaderDetail)).DrugName + " is outside the administration time allowed.";
                this.ShowErrorMessage(sErrorMsg, MessageBoxButton.OK, MessageBoxType.Critical);
                return false;
            }
        }
        return true;
    }
    private SlotClick(TagObject: TagObject): void {
        Busyindicator.SetStatusBusy("MedChart");
        this.IsActivityLaunchedInSlot = true;
        let IsDefaultSlot: boolean = false;
        let IsAdminSlot: boolean = false;
        let IsTitratedDose: boolean = false;
        this.IsNextDueSlotExists = false;
        this.IsNextAdminSlotExists = false;
        this.sSlotStatus = String.Empty;
        let IsPGD: boolean = false;
        let DoseType: string = String.Empty;
        let lnMedAdminOID: number = 0;
        this.SlotTagObject = TagObject;
        this.IsConflictsErrorMsgExists = false;
        this.IsSelfAdministeredErrorMsgExists = false;
        this.IsDiscontinuedErrorMsgExists = false;
        this.IsTitratedDoseEmptyErrMsgExists = false;
        this.IsOutsideAdminTimeErrMsgExists = false;
        this.IsAnotherAdminDueErrMsgExists = false;
        this.IsNotAllNotYetRecordedExists = false;
        this.IsCumulativeWarningAcknowledged = null;
        this.isCloseToMidNightAlertForPRNShown = false;
        this.sParacetamolRecentlyAdministered = -1; // SYED - skipped this validation - to Review
        this.IsTBDSlot = false;
        if (TagObject != null) {
            this.oClickedSlotTagObject = TagObject;
            if ((TagObject.oIChartSlot instanceof DefaultSlot || TagObject.oIChartSlot instanceof AdministratedSlot || TagObject.oIChartSlot instanceof AsRequiredSlot || TagObject.oIChartSlot instanceof TodayMultiSlot)) {
                this.oTagDrugHeaderDetail = <TagDrugHeaderDetail>(TagObject.oDrugItem).Tag;
                if (TagObject.oIChartSlot instanceof DefaultSlot) {
                    IsDefaultSlot = true;
                    this.DefaultSlotVM(TagObject, IsTitratedDose, this.IsTBDSlot, IsPGD, DoseType, this.dtSlotDateTime);
                }
                else if (TagObject.oIChartSlot instanceof AdministratedSlot) {
                    this.oTagSlotDetail = <TagSlotDetail>(<AdministratedSlot>TagObject.oIChartSlot).Tag;
                    if (this.oTagSlotDetail != null) {
                        this.sDose = !(String.IsNullOrEmpty(this.oTagSlotDetail.Dose)) ? this.oTagSlotDetail.Dose : String.Empty;
                        this.sDoseUOM = !(String.IsNullOrEmpty(this.oTagSlotDetail.DoseUOM)) ? this.oTagSlotDetail.DoseUOM : String.Empty;
                        this.sDoseUOMLzoID = !(String.IsNullOrEmpty(this.oTagSlotDetail.DoseUOMLzoID)) ? this.oTagSlotDetail.DoseUOMLzoID : String.Empty;
                        this.lnDoseUOMOID = this.oTagSlotDetail.DoseUOMOID;
                        this.sSlotStatus = this.oTagSlotDetail.SlotStatus;
                        this.oSlotVM = new SlotDetailVM();
                        if (DateTime.NotEquals(this.oTagSlotDetail.SlotDateTime, DateTime.MinValue)) {
                            this.dtSlotDateTime = this.oTagSlotDetail.SlotDateTime;
                            this.oSlotVM.ScheduledDTTM = this.dtSlotDateTime;
                        }
                        this.oSlotVM.CurrentServerDate = this.dtCurrentDateTime;
                        this.oSlotVM.PrescriptionItemOID = Number.Parse(TagObject.oDrugItem.Key);
                        this.oSlotVM.DrugDetail = TagObject.oDrugItem;
                        this.oSlotVM.PresScheduleOID = this.oTagSlotDetail.SlotOID;
                        this.oSlotVM.DoseType = this.oTagDrugHeaderDetail.DoseType;
                        this.oSlotVM.IsConditionalExists = this.oTagDrugHeaderDetail.IsConditionalExists;
                        if ((String.Compare(this.oSlotVM.DoseType, DoseTypeCode.DOSAGERANGE, StringComparison.InvariantCultureIgnoreCase) == 0) || (String.Compare(this.oSlotVM.DoseType, DoseTypeCode.CONDITIONAL, StringComparison.InvariantCultureIgnoreCase) == 0)) {
                            this.oSlotVM.Dose = String.Empty;
                        }
                        else {
                            this.oSlotVM.Dose = this.sDose;
                        }
                        this.oSlotVM.DoseUOM = this.sDoseUOM;
                        this.oSlotVM.DoseUOMOID = this.lnDoseUOMOID;
                        this.oSlotVM.DoseUOMLzoID = this.sDoseUOMLzoID;
                        this.oSlotVM.LDose = this.oTagSlotDetail.LowerDose;
                        this.oSlotVM.UDose = this.oTagSlotDetail.UpperDose;
                        this.oSlotVM.Status = this.sSlotStatus;
                        this.oSlotVM.AdministrationDetail = new AdministrationDetailVM();
                        lnMedAdminOID = this.oTagSlotDetail.MedsAdminOID;
                        this.oSlotVM.AdministrationDetail.MedAdminOID = lnMedAdminOID;
                        if (this.oTagSlotDetail.SlotStatus == SlotStatus.NOTGIVEN && DateTime.NotEquals(this.oTagSlotDetail.RecordedAt, DateTime.MinValue) && this.oTagSlotDetail.RecordedBy != null) {
                            this.oSlotVM.AdministrationDetail.RecordedBy = this.oTagSlotDetail.RecordedBy;
                            this.oSlotVM.AdministrationDetail.RecordedAt = this.oTagSlotDetail.RecordedAt;
                        }
                        else if (DateTime.NotEquals(this.oTagSlotDetail.LastModifiedAt, DateTime.MinValue))
                            this.oSlotVM.AdministrationDetail.RecordedAt = this.oTagSlotDetail.LastModifiedAt;
                        this.dtSlotDateTime = this.oTagSlotDetail.SlotDateTime;
                        IsPGD = this.oTagDrugHeaderDetail.IsPGD;
                        this.IsSelectedSlotPGD = IsPGD;
                        IsAdminSlot = true;
                        this.sPreviousSlotStatus = this.sSlotStatus;
                    }
                }
            }
            let AllSlots: ObservableCollection<IChartSlot> = new ObservableCollection<IChartSlot>();
            let drug: IEnumerable<ChartRow> = this.MedicationChartControl.ChartRows.Where(drg => String.Compare(drg.Key.Split('-')[1], this.oClickedSlotTagObject.oDrugItem.Key) == 0);
            drug.forEach(odrug => {
                odrug.ChartCells.forEach(drugSlots => {
                    drugSlots.Slots.forEach((slot) => {
                        if ((slot instanceof DefaultSlot) && ((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus == SlotStatus.DUENOW || (<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus == SlotStatus.OVERDUE)) {
                            AllSlots.Add(slot);
                        }
                    });
                });
            })

            if (AllSlots != null) {
                this.IsNotAllNotYetRecordedExists = true;
            }
            if (TagObject.oDrugItem != null && IsDefaultSlot) {
                if (this.CheckValidation(TagObject)) {
                    let oSlotHelper: SlotAdministrationHelper = new SlotAdministrationHelper();
                    // oSlotHelper.WarningBeforeAdministrationCompletedEvent -= oSlotHelper_WarningBeforeAdministrationCompleted;
                    oSlotHelper.WarningBeforeAdministrationCompletedEvent = (s, e) => { this.oSlotHelper_WarningBeforeAdministrationCompleted(s, e); };
                    oSlotHelper.CheckDuplicateSlotWarningExists(this.oTagDrugHeaderDetail, this.oTagSlotDetail.SlotOID, this.oTagSlotDetail.SlotStatus, IsPGD, LaunchAdminType.LaunchRecordAdmin);
                }
            }
            else if (IsAdminSlot && (this.oSlotVM != null && (lnMedAdminOID > 0 || (this.oSlotVM.Status == "CC_NOTKNOWN" && lnMedAdminOID == 0)))) {
                if (this.CheckValidation(TagObject)) {
                    let oSlotHelper: SlotAdministrationHelper = new SlotAdministrationHelper();
                    //oSlotHelper.WarningBeforeAdministrationCompletedEvent -= oSlotHelper_WarningBeforeAdministrationCompleted;
                    oSlotHelper.WarningBeforeAdministrationCompletedEvent = (s, e) => { this.oSlotHelper_WarningBeforeAdministrationCompleted(s, e); };
                    oSlotHelper.CheckDuplicateSlotWarningExists(this.oTagDrugHeaderDetail, this.oTagSlotDetail.SlotOID, this.oTagSlotDetail.SlotStatus, IsPGD, LaunchAdminType.LaunchModifyAdmin);
                }
            }
            else if (TagObject.oIChartSlot instanceof TodayMultiSlot) {
                if (this.CheckValidation(TagObject))
                    this.LaunchMultiSlot(TagObject);
            }
            else if (TagObject.oIChartSlot instanceof AsRequiredSlot) {
                if (this.CheckValidation(TagObject))
                    this.LaunchPRNSlot(TagObject);
            }
            if (this.oSlotVM != null)
                this.oSlotVM.IsInfusionItem = this.oTagDrugHeaderDetail.IsInfusion;
        }
    }
    oSlotHelper_WarningBeforeAdministrationCompleted(IsPGD: boolean, eWhatToLaunch: LaunchAdminType): void {
        switch (eWhatToLaunch) {
            case LaunchAdminType.LaunchRecordAdmin:
                this.LaunchRecordAdmin();
                break;
            case LaunchAdminType.LaunchModifyAdmin:
                this.LaunchModifyAdmin(this.oClickedSlotTagObject, IsPGD);
                break;
        }
    }
    private LaunchModifyAdmin(TagObject: TagObject, IsPGD: boolean): void {
        if (DateTime.NotEquals(this.dtSlotDateTime, DateTime.MinValue)) {
            let dtWithModTimeWindow: DateTime = this.dtSlotDateTime.AddMinutes(MedChartData.SlotModificationTime);
            if (DateTime.LessThan(CommonBB.GetServerDateTime(), dtWithModTimeWindow)) {
                this.oSlotVM.Status = String.Empty;
                if (TagObject.oChartIcon != null && TagObject.oChartIcon instanceof ChartIcon) {
                    let oChartIcon: ChartIcon = ObjectHelper.CreateType<ChartIcon>(TagObject.oChartIcon, ChartIcon);
                    if (oChartIcon != null && !String.IsNullOrEmpty(oChartIcon.Key)) {
                        this.oSlotVM.Status = oChartIcon.Key;
                    }
                }
                else {
                    let oAdministratedSlot: AdministratedSlot = ObjectHelper.CreateType<AdministratedSlot>(TagObject.oIChartSlot, AdministratedSlot);
                    if (oAdministratedSlot != null && oAdministratedSlot.StatusIcon != null && !String.IsNullOrEmpty(oAdministratedSlot.StatusIcon.Key)) {
                        this.oSlotVM.Status = oAdministratedSlot.StatusIcon.Key;
                    }
                }
                this.oSlotVM.ScheduledDTTM = this.oTagSlotDetail.SlotDateTime;
                this.oSlotVM.PrescriptionItemStatus = this.oTagDrugHeaderDetail.PrescriptionItemStatus;
                this.oSlotVM.PrescriptionEndDate = this.oTagDrugHeaderDetail.EndDate;
                this.oSlotVM.FreqPerodCode = this.oTagDrugHeaderDetail.FreqPerodcode;
                this.oSlotVM.CACode = MedAction.StrikethorughAdmin;
                this.oSlotVM.IsLastSlotinCurrentView = this.oTagSlotDetail.IsLastSlotInView;
                this.oSlotVM.MultiRoute_Type = this.oTagDrugHeaderDetail.MultiRoute_Type;
                this.oSlotVM.IsParacetamolIngredient = this.oTagDrugHeaderDetail.IsParacetamolIngredient;
                if (IsPGD) {
                    this.LaunchMedsAdminStrikethrough(this.oSlotVM, IsPGD);
                }
                else {
                    this.IsLastSlotExist(this.oSlotVM);
                    this.LaunchMedsAdminModifyOrStrikethrough(this.oSlotVM, IsPGD);
                }
            }
            else {
                let sDrugname: string = String.Empty;
                sDrugname = (ObjectHelper.CreateType<TagDrugHeaderDetail>(TagObject.oDrugItem.Tag, TagDrugHeaderDetail)).DrugName;
                this.ShowErrorMessage("The slot selected for " + sDrugname + " is outside the allowed modification time window.", MessageBoxButton.OK, MessageBoxType.Critical);
            }
        }
    }
    iMsgBox_MultiSlotDiscontinuedMessageBoxClose(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.Yes) {
            this.LaunchMultiSlot(this.SlotTagObject);
        }
    }
    iMsgBox_PRNDiscontinuedMessageBoxClose(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.Yes) {
            this.LaunchMultiSlot(this.SlotTagObject);
        }
    }
    private DefaultSlotVM(TagObject: TagObject, IsTitratedDose: boolean, IsTBDSlot: boolean, IsPGD: boolean, DoseType: string, dtSlotDateTime: DateTime): void {
        if (this.oTagDrugHeaderDetail != null) {
            DoseType = this.oTagDrugHeaderDetail.DoseType;
            if (DoseType == DoseTypeCode.TITRATED) {
                IsTitratedDose = true;
            }
            IsPGD = this.oTagDrugHeaderDetail.IsPGD;
        }
        if (TagObject.oIChartSlot instanceof DefaultSlot) {
            this.oTagSlotDetail = <TagSlotDetail>(<DefaultSlot>TagObject.oIChartSlot).Tag;
        }
        else if (TagObject.oIChartSlot instanceof AdministratedSlot) {
            this.oTagSlotDetail = <TagSlotDetail>(<AdministratedSlot>TagObject.oIChartSlot).Tag;
        }
        if (this.oTagSlotDetail != null) {
            this.sDose = !(String.IsNullOrEmpty(this.oTagSlotDetail.Dose)) ? this.oTagSlotDetail.Dose : String.Empty;
            this.sDoseUOM = !(String.IsNullOrEmpty(this.oTagSlotDetail.DoseUOM)) ? this.oTagSlotDetail.DoseUOM : String.Empty;
            this.lnDoseUOMOID = this.oTagSlotDetail.DoseUOMOID;
            this.sSlotStatus = !(String.IsNullOrEmpty(this.oTagSlotDetail.SlotStatus)) ? this.oTagSlotDetail.SlotStatus : String.Empty;
            if (DateTime.NotEquals(this.oTagSlotDetail.SlotDateTime, DateTime.MinValue)) {
                this.dtSlotDateTime = this.oTagSlotDetail.SlotDateTime;
            }
            this.oSlotVM = new SlotDetailVM();
            this.oSlotVM.CurrentServerDate = this.dtCurrentDateTime;
            this.oSlotVM.PrescriptionItemOID = Number.Parse(TagObject.oDrugItem.Key);
            this.oSlotVM.DrugDetail = TagObject.oDrugItem;
            this.oSlotVM.PresScheduleOID = this.oTagSlotDetail.SlotOID;
            this.oSlotVM.DoseType = this.oTagDrugHeaderDetail.DoseType;
            this.oSlotVM.AdminReason = this.oTagSlotDetail.AdminReasonCode;
            if ((String.Compare(this.oSlotVM.DoseType, DoseTypeCode.DOSAGERANGE, StringComparison.InvariantCultureIgnoreCase) == 0) || (String.Compare(this.oSlotVM.DoseType, DoseTypeCode.CONDITIONAL, StringComparison.InvariantCultureIgnoreCase) == 0) || ((String.Compare(this.oSlotVM.DoseType, DoseTypeCode.STEPPEDVARIABLE, StringComparison.InvariantCultureIgnoreCase) == 0) && !String.IsNullOrEmpty(this.oTagDrugHeaderDetail.LowerDose) && !String.IsNullOrEmpty(this.oTagDrugHeaderDetail.UpperDose))) {
                this.oSlotVM.Dose = "";
            }
            else {
                this.oSlotVM.Dose = this.sDose;
            }
            this.oSlotVM.LDose = this.oTagSlotDetail.LowerDose;
            this.oSlotVM.UDose = this.oTagSlotDetail.UpperDose;
            this.oSlotVM.DoseUOM = this.sDoseUOM;
            this.oSlotVM.DoseUOMOID = this.lnDoseUOMOID;
            this.oSlotVM.SlotsTimeIntervalAvg = this.oTagDrugHeaderDetail.SlotsTimeIntervalAvg;
            if (TagObject.oIChartSlot instanceof DefaultSlot) {
                this.oSlotVM.AdministrationDetail = new AdministrationDetailVM();
                this.oSlotVM.AdministrationDetail.MedAdminOID = this.oTagSlotDetail.MedsAdminOID;
                this.oSlotVM.AdministrationDetail.AdminComments = this.oTagSlotDetail.Comments;
                this.oSlotVM.AdministrationDetail.IsDuringHomeLeave = this.oTagSlotDetail.IsDuringHomeLeave;
            }
            this.oSlotVM.Status = this.sSlotStatus;
            this.sPreviousSlotStatus = this.sSlotStatus;
            dtSlotDateTime = this.oTagSlotDetail.SlotDateTime;
            if (TagObject.oIChartSlot instanceof DefaultSlot && IsTitratedDose && (String.IsNullOrEmpty(this.oTagSlotDetail.Dose) || String.Compare(this.oTagSlotDetail.Dose, "0", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.oTagSlotDetail.Dose, CConstants.DoseTBD, StringComparison.CurrentCultureIgnoreCase) == 0)) {
                this.IsTBDSlot = true;
            }
            else {
                this.IsTBDSlot = false;
            }
            let ChartRowKey: string = "Row-" + TagObject.oDrugItem.Key;
            let dtSlotDate: DateTime = dtSlotDateTime;
            let NextAdminSlotExists: ObservableCollection<IChartSlot> = new ObservableCollection<IChartSlot>();
            let drug: IEnumerable<ChartRow> = this.MedicationChartControl.ChartRows.Where(drg => (String.Compare(drg.Key, ChartRowKey) == 0));
            drug.forEach(odrug => {
                odrug.ChartCells.forEach(drugSlots => {
                    drugSlots.Slots.forEach(slot => {
                        if ((slot instanceof AdministratedSlot) && (DateTime.GreaterThan((<TagSlotDetail>(<AdministratedSlot>slot).Tag).SlotDateTime,(dtSlotDate))) &&
                            String.Compare((<TagSlotDetail>(<AdministratedSlot>slot).Tag).SlotStatus, SlotStatus.OMITTED) != 0) {
                            NextAdminSlotExists.Add(slot);
                        }
                    })
                })
            })

            if (NextAdminSlotExists != null && NextAdminSlotExists.Count > 0) {
                this.IsNextAdminSlotExists = true;
            }
            this.oSlotVM.IsNextAdminSlotExists = this.IsNextAdminSlotExists;
            if (DateTime.GreaterThan(CommonBB.GetServerDateTime(), dtSlotDateTime)) {
                let NextDueSlotExists: ObservableCollection<IChartSlot> = new ObservableCollection<IChartSlot>();
                let drug: IEnumerable<ChartRow> = this.MedicationChartControl.ChartRows.Where(drg => (String.Compare(drg.Key, ChartRowKey) == 0));
                drug.forEach(odrug => {
                    odrug.ChartCells.forEach(drugSlots => {
                        drugSlots.Slots.forEach(slot => {
                            if (((slot instanceof DefaultSlot && DateTime.GreaterThan((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotDateTime,(dtSlotDate))) && (String.Compare((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus, SlotStatus.DUENOW) == 0
                                || String.Compare((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus, SlotStatus.OVERDUE) == 0
                                || String.Compare((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus, SlotStatus.DEFERDUENOW) == 0
                                || String.Compare((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus, SlotStatus.DEFEROVERDUE) == 0
                                || String.Compare((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus, SlotStatus.NOTYETRECORDED) == 0))
                                || (slot instanceof TodayMultiSlot && (String.Compare((<TodayMultiSlot>slot).Tag.ToString(), SlotStatus.DUENOW) == 0
                                    || String.Compare((<TodayMultiSlot>slot).Tag.ToString(), SlotStatus.OVERDUE) == 0
                                    || String.Compare((<TodayMultiSlot>slot).Tag.ToString(), SlotStatus.DEFERDUENOW) == 0
                                    || String.Compare((<TodayMultiSlot>slot).Tag.ToString(), SlotStatus.DEFEROVERDUE) == 0
                                    || String.Compare((<TodayMultiSlot>slot).Tag.ToString(), SlotStatus.NOTYETRECORDED) == 0))) {
                                NextDueSlotExists.Add(slot);
                            }
                        });
                    })
                });
                if (NextDueSlotExists != null && NextDueSlotExists.Count > 0) {
                    this.IsNextDueSlotExists = true;
                }
                let NextHomeLeaveSlotExists: ObservableCollection<IChartSlot> = new ObservableCollection<IChartSlot>();
                drug.forEach(odrug => {
                    odrug.ChartCells.forEach(drugSlots => {
                        drugSlots.Slots.forEach(slot => {
                            if ((slot instanceof DefaultSlot && DateTime.GreaterThan((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotDateTime,(dtSlotDate))) && (String.Compare((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus, SlotStatus.HOMELEAVE) == 0)) {
                                NextHomeLeaveSlotExists.Add(slot);
                            }
                        });
                    });
                });
                let NextHomeLeaveadminSlotExists: ObservableCollection<IChartSlot> = new ObservableCollection<IChartSlot>();
                drug.forEach(odrug => {
                    odrug.ChartCells.forEach(drugSlots => {
                        drugSlots.Slots.forEach(slot => {
                            if (((slot instanceof AdministratedSlot && DateTime.GreaterThan((<TagSlotDetail>(<AdministratedSlot>slot).Tag).SlotDateTime,(dtSlotDate))) && (<TagSlotDetail>(<AdministratedSlot>slot).Tag).AdministeredAt != DateTime.MinValue && (<TagSlotDetail>(<AdministratedSlot>slot).Tag).AdministeredAt <= CommonBB.GetServerDateTime())) {
                                NextHomeLeaveadminSlotExists.Add(slot);
                            }
                        });
                    });
                });

                if ((NextHomeLeaveSlotExists != null && NextHomeLeaveSlotExists.Count > 0) || (NextHomeLeaveadminSlotExists != null && NextHomeLeaveadminSlotExists.Count > 0)) {
                    this.oSlotVM.IsNextHomeLeaveSlotExists = true;
                }
                else {
                    this.oSlotVM.IsNextHomeLeaveSlotExists = false;
                }
            }
            if (!String.IsNullOrEmpty(this.sSlotStatus) && this.sSlotStatus == SlotStatus.OVERDUE && TagObject.oChartCell != null && TagObject.oChartCell.Slots != null && TagObject.oChartCell.Slots.Count > 0) {
                let iSlotIndex: number = TagObject.oChartCell.Slots.IndexOf(TagObject.oIChartSlot);
                for (let i: number = iSlotIndex + 1; i < TagObject.oChartCell.Slots.Count; i++) {
                    if (TagObject.oChartCell.Slots[i] instanceof DefaultSlot) {
                        let sStatus: string = (<DefaultSlot>TagObject.oChartCell.Slots[i]).SlotStatus;
                        if (sStatus == SlotStatusText.DUENOW || sStatus == SlotStatusText.OVERDUE || sStatus == SlotStatusText.NOTYETRECORDED || sStatus == SlotStatusText.DEFERRED) {
                            this.IsNextDueSlotExists = true;
                            break;
                        }
                    }
                }
            }
            this.oSlotVM.IsNextDueSlotExists = this.IsNextDueSlotExists;
        }
    }
    LaunchMedsAdminStrikethrough(oSlotVM: SlotDetailVM, IsPGD: boolean): void {
        // ObjectHelper.stopFinishAndCancelEvent(true);
        let oHdrAddnlInfo: CDrugHdrAddnlInfo = new CDrugHdrAddnlInfo();
        oHdrAddnlInfo.RecordedAt = oSlotVM.AdministrationDetail.RecordedAt.ToUserDateTimeString(CConstants.DateTimeFormat) + " (Due at " + this.oTagSlotDetail.SlotDateTime.ToUserDateTimeString(CConstants.Timeformat) + ")";
        if (DateTime.NotEquals(this.oTagDrugHeaderDetail.ReviewDTTM, DateTime.MinValue)) {
            this.oHdrRecordAdmin.ReviewAt = this.oTagDrugHeaderDetail.ReviewDTTM.ToUserDateTimeString(CConstants.DateTimeFormat);
            if (DateTime.LessThanOrEqualTo(this.oTagDrugHeaderDetail.ReviewDTTM.Date, CommonBB.GetServerDateTime().Date)) {
                this.oHdrRecordAdmin.ReviewAtVisibility = Visibility.Visible;
                this.oHdrRecordAdmin.ReviewIconTooltip = Common.GetReviewIconTooltip(this.oTagDrugHeaderDetail.ReviewType, this.oTagDrugHeaderDetail.ReviewDTTM, this.oTagDrugHeaderDetail.ReviewRequestedComments, this.oTagDrugHeaderDetail.ReviewRequestedby);
            }
        }
        this.oMAST = new MedsAdminStrikethrough();
        this.oMAST.constructorImpl(oSlotVM, IsPGD);
        // this.oMAST.IsSlotUpdatedEvent -= new MedsAdminStrikethrough.IsSlotUpdatedDelegate(oMAST_IsSlotUpdatedEvent);
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
        this.oMAST.drgHeader.DataContext = Common.SetDrugHeaderContent(this.oClickedSlotTagObject.oDrugItem, oHdrAddnlInfo, this.oMAST.drgHeader);
        this.oMAST.HelpCode = "MN_STRIKEADMIN";
        let Callback = (s, e) => {
            if (s != null && e != null) {
                this.oMAST = s;
            }
        }
        AppActivity.OpenWindow("Strikethrough", this.oMAST, (s) => { this.oMAST_Closed(s); }, "Strikethrough administration", true, 775, 420, true, WindowButtonType.OkCancel, null, null, null, Callback);
        this.IsActivityLaunchedInSlot = false;
    }
    oMAST_IsSlotUpdatedEvent(): void {
        Busyindicator.SetStatusIdle("Administration");
        this.IsActivityLaunchedInSlot = false;
        this.ReloadMedChart();
    }
    iAppDialogResult: ChildWindow;
    oMAST_Closed(args: AppDialogEventargs): void {
        if (args != null && args.Content != null) {
            this.oMAST = args.Content.Component;
            if (this.oSlotVM != null && !this.oSlotVM.IsSubmitInProgress) {
                // ObjectHelper.stopFinishAndCancelEvent(false);
                if (this.oMAST != null && args.Result == AppDialogResult.Ok) {
                    this.iAppDialogResult = args.AppChildWindow;
                    //if (!Common.CheckIfLockingDurationElapsed(new EventHandler<MessageEventArgs>(this.oMsgBox_StrikeThroughClose)))
                    if (!Common.CheckIfLockingDurationElapsed((o, e) => ((sender: any, e: MessageEventArgs) => { this.oMsgBox_StrikeThroughClose(o, e) }))) {
                        this.oSlotVM.IsSubmitInProgress = true;
                        Busyindicator.SetStatusBusy("Administration", true);
                        let bdialogresult: boolean = this.oMAST.cmdOkClick();
                        if (bdialogresult) {
                            let oSlotVMdet: SlotDetailVM = ObjectHelper.CreateType<SlotDetailVM>(this.oMAST.DataContext, SlotDetailVM);
                            if (this.IsSelectedSlotPGD) {
                                return
                            }
                            if (oSlotVMdet != null) {
                                this.RefreshStrikethroughAdminSlot(oSlotVMdet);
                            }
                            args.AppChildWindow.DialogResult = true;
                        }
                    }
                }
                else if (args.Result == AppDialogResult.Cancel) {
                    //args.AppChildWindow.DialogResult = false;
                    args.AppChildWindow.DialogRef.close();
                }
            }
        }
    }
    oMsgBox_StrikeThroughClose(sender: Object, e: MessageEventArgs): void {
        this.iAppDialogResult.DialogResult = false;
    }
    RefreshCreateAdminSlot(oSlotVM: SlotDetailVM): void {
        if (oSlotVM != null && this.oClickedSlotTagObject != null) {
            if (this.oClickedSlotTagObject.oDrugItem != null) {
                let oTagDrugHeaderDetail: TagDrugHeaderDetail = <TagDrugHeaderDetail>(this.oClickedSlotTagObject.oDrugItem).Tag;
                if (oTagDrugHeaderDetail != null) {
                    this.oGetMedsChartData.IsGreyedOut = this.oGetMedsChartData.IsCompleted = false;
                    if (oTagDrugHeaderDetail.PrescriptionItemStatus == CConstants.DISCONTINUED || oTagDrugHeaderDetail.PrescriptionItemStatus == CConstants.CANCELLED) {
                        this.oGetMedsChartData.IsGreyedOut = true;
                    }
                    else if (oTagDrugHeaderDetail.PrescriptionItemStatus == CConstants.COMPLETED) {
                        this.oGetMedsChartData.IsCompleted = true;
                    }
                }
            }
            if (this.oClickedSlotTagObject.oIChartSlot != null && this.oClickedSlotTagObject.oIChartSlot instanceof DefaultSlot) {
                let oDefaultSlot: DefaultSlot = <DefaultSlot>this.oClickedSlotTagObject.oIChartSlot;
                let sDefaultSlotStatus: string = String.Empty;
                let sHistoryToolTip: string = String.Empty;
                let sDiscrepancyReason: string = String.Empty;
                let sAdminOnTimeMode: string = '\0';
                let sAdminOnTimeDiffValue: string = String.Empty;
                let sToolTip: string = String.Empty;
                let sDoseValue: string = String.Empty;
                let IsHistoryExists: boolean = false;
                let sAdminComments: string = oSlotVM.AdministrationDetail != null ? oSlotVM.AdministrationDetail.AdminComments : String.Empty;
                let oAdminTagSlotDetail: TagSlotDetail = null;
                let SlotDTTM: DateTime = DateTime.MinValue;
                let AdminSlotDTTM: DateTime = DateTime.MinValue;
                if (oDefaultSlot.Tag != null) {
                    oAdminTagSlotDetail = <TagSlotDetail>oDefaultSlot.Tag;
                    SlotDTTM = oAdminTagSlotDetail.SlotDateTime;
                    sDefaultSlotStatus = oAdminTagSlotDetail.SlotStatus;
                }
                this.SlotPreviousStatus(oAdminTagSlotDetail.SlotDateTime, this.oClickedSlotTagObject.oDrugItem.Key);
                if (oSlotVM.AdministrationDetail != null) {
                    sToolTip = this.getTootTip(oDefaultSlot.Time, oSlotVM, (o1) => { sHistoryToolTip = o1; }, (o2) => { sDiscrepancyReason = o2; });
                    IsHistoryExists = oSlotVM.AdministrationDetail.IsHistoryExists;
                    if (oSlotVM.AdministrationDetail.AdministeredOnTimeMode != '\0') {
                        sAdminOnTimeMode = oSlotVM.AdministrationDetail.AdministeredOnTimeMode;
                    }
                    if (DateTime.NotEquals(oSlotVM.AdministrationDetail.AdministeredDate, DateTime.MinValue)) {
                        AdminSlotDTTM = oSlotVM.AdministrationDetail.AdministeredDate;
                    }
                    if (DateTime.NotEquals(SlotDTTM, DateTime.MinValue) && DateTime.NotEquals(oSlotVM.AdministrationDetail.AdministeredDate, DateTime.MinValue))
                        sAdminOnTimeDiffValue = Common.AdminDiffValue(SlotDTTM, AdminSlotDTTM, oSlotVM.AdministrationDetail.AdministeredOnTimeMode);
                }
                if (oSlotVM != null && oSlotVM.AdministrationDetail != null && oAdminTagSlotDetail != null) {
                    oAdminTagSlotDetail.IsDuringHomeLeave = oSlotVM.AdministrationDetail.IsDuringHomeLeave;
                }
                this.oGetMedsChartData.UpdateTagSlotObject(oAdminTagSlotDetail, oSlotVM);
                let sTimeFormatAdminSlot: string = this.MedicationChartControl.TimeFormat;
                if (((AdminSlotDTTM != null && DateTime.GreaterThan(AdminSlotDTTM.Date, DateTime.MinValue) && DateTime.NotEquals(oSlotVM.ScheduledDTTM.Date, AdminSlotDTTM.Date)) && ((String.Equals(oSlotVM.Status, SlotStatus.GIVEN)) || String.Equals(oSlotVM.Status, SlotStatus.SELFADMINISTERED)))) {
                    sTimeFormatAdminSlot = CConstants.DateTimeFormat;
                }
                let oAdministratedSlot: AdministratedSlot = this.oGetMedsChartData.CreateAdministratedSlot(oDefaultSlot.Key,
                    (DateTime.NotEquals(AdminSlotDTTM, DateTime.MinValue) ? AdminSlotDTTM : oDefaultSlot.Time),
                    sAdminOnTimeMode,
                    sAdminOnTimeDiffValue,
                    IsHistoryExists,
                    oSlotVM.Status, oAdminTagSlotDetail, sToolTip, sHistoryToolTip,
                    sDiscrepancyReason, true, sAdminComments, sTimeFormatAdminSlot);
                oAdministratedSlot.SlotHeight = oDefaultSlot.SlotHeight;
                if (ValueDomainValues.oReasonForNotGiven != null && ValueDomainValues.oReasonForNotGiven.Count() > 0 && oSlotVM.AdministrationDetail != null && oSlotVM.AdministrationDetail.ReasonNotGiven != null) {
                    oAdministratedSlot.ReasonForNotGiven = !String.IsNullOrEmpty(oSlotVM.AdministrationDetail.ReasonNotGiven.Value) ? ValueDomainValues.oReasonForNotGiven.FirstOrDefault(a => a.Key == oSlotVM.AdministrationDetail.ReasonNotGiven.Value).Value.ToString() : String.Empty;
                    oAdministratedSlot.ReasonToolTip = MedsAdminChartToolTip.ReasonToolTip + ": " + oSlotVM.AdministrationDetail.ReasonNotGiven.DisplayText;
                    oAdministratedSlot.ReasonToolTip += !String.IsNullOrEmpty(oSlotVM.AdministrationDetail.AdminComments) ? "\n" + MedsAdminChartToolTip.CommentsToolTip + ": " + oSlotVM.AdministrationDetail.AdminComments : String.Empty;
                    oAdministratedSlot.ReasonFontSize = CConstants.Thirteen;
                }
                this.oClickedSlotTagObject.oIChartSlot = oAdministratedSlot;
                this.MedicationChartControl.RefreshCell(this.oClickedSlotTagObject);
                if (oSlotVM != null && !String.IsNullOrEmpty(oSlotVM.CurrentPrescriptionItemStatus)) {
                    this.RefreshMedChartForPresItemStatusChange(oSlotVM.CurrentPrescriptionItemStatus);
                }
                if (!String.IsNullOrEmpty(sDefaultSlotStatus)) {
                    this.UpdateChartSummaryBar(sDefaultSlotStatus, 1);
                }
            }
        }
    }
    RefreshModifyAdminSlot(oSlotVM: SlotDetailVM): void {
        if (oSlotVM != null && this.oClickedSlotTagObject != null && this.oClickedSlotTagObject.oIChartSlot != null) {
            if (this.oClickedSlotTagObject.oIChartSlot instanceof AdministratedSlot) {
                let oAdministratedSlot: AdministratedSlot = <AdministratedSlot>this.oClickedSlotTagObject.oIChartSlot;
                if (oAdministratedSlot != null) {
                    let sAdminOnTimeDiffValue: string = String.Empty;
                    let sAdminOnTimeMode: string = '\0';
                    let sHistoryToolTip: string = String.Empty;
                    let sDiscrepancyReason: string = String.Empty;
                    let sToolTip: string = String.Empty;
                    let sDoseValue: string = String.Empty;
                    let DoseDisc: boolean = false;
                    let sAdminComments: string = oSlotVM.AdministrationDetail != null ? oSlotVM.AdministrationDetail.AdminComments : String.Empty;
                    let oAdminTagSlotDetail: TagSlotDetail = null;
                    let ScheduleDTTM: DateTime = DateTime.MinValue;
                    if (oAdministratedSlot.Tag != null) {
                        oAdminTagSlotDetail = <TagSlotDetail>oAdministratedSlot.Tag;
                        ScheduleDTTM = oAdminTagSlotDetail.SlotDateTime;
                        oSlotVM.ScheduledDTTM = ScheduleDTTM;
                        if (oSlotVM.AdministrationDetail != null && oAdminTagSlotDetail.MedsAdminOID == 0 && oAdminTagSlotDetail.SlotStatus == SlotStatus.NOTKNOWN)
                            oAdminTagSlotDetail.MedsAdminOID = oSlotVM.AdministrationDetail.MedAdminOID;
                    }
                    if (oSlotVM.AdministrationDetail != null) {
                        if (DateTime.NotEquals(oSlotVM.AdministrationDetail.AdministeredDate, DateTime.MinValue)) {
                            oAdministratedSlot.Time = oSlotVM.AdministrationDetail.AdministeredDate;
                        }
                        else {
                            oAdministratedSlot.Time = ScheduleDTTM;
                        }
                        if (oSlotVM.AdministrationDetail.DoseDiscReasonCode != null && oSlotVM.AdministrationDetail.DoseDiscReasonCode.Value != null) {
                            sToolTip = this.getTootTip(ScheduleDTTM, oSlotVM, (o1) => { sHistoryToolTip = o1; }, (o2) => { sDiscrepancyReason = o2; });
                        }
                        else {
                            sToolTip = this.getTootTip(oAdministratedSlot.Time, oSlotVM, (o1) => { sHistoryToolTip = o1; }, (o2) => { sDiscrepancyReason = o2; });
                        }
                        if (oSlotVM.AdministrationDetail.AdministeredOnTimeMode != '\0') {
                            sAdminOnTimeMode = oSlotVM.AdministrationDetail.AdministeredOnTimeMode;
                        }
                        if (DateTime.NotEquals(oSlotVM.ScheduledDTTM, DateTime.MinValue) && DateTime.NotEquals(oSlotVM.AdministrationDetail.AdministeredDate, DateTime.MinValue)) {
                            sAdminOnTimeDiffValue = Common.AdminDiffValue(ScheduleDTTM, oSlotVM.AdministrationDetail.AdministeredDate, sAdminOnTimeMode);
                        }
                    }
                    if (!String.IsNullOrEmpty(oSlotVM.AdministrationDetail.Dose) && !String.IsNullOrEmpty(oAdminTagSlotDetail.Dose) && (Number.Parse(oSlotVM.AdministrationDetail.Dose) > (Number.Parse(oAdminTagSlotDetail.Dose)) || Number.Parse(oSlotVM.AdministrationDetail.Dose) < (Number.Parse(oAdminTagSlotDetail.Dose)))) {
                        if (!String.IsNullOrEmpty(oSlotVM.LDose) && !String.IsNullOrEmpty(oSlotVM.UDose) && ((Number.Parse(oSlotVM.LDose) > Number.Parse(oSlotVM.Dose)) && (Number.Parse(oSlotVM.UDose) < Number.Parse(oSlotVM.Dose)))) {
                            DoseDisc = true;
                        }
                    }
                    if (DateTime.NotEquals(oSlotVM.AdministrationDetail.RecordedAt, DateTime.MinValue)) {
                        oAdminTagSlotDetail.LastModifiedAt = oSlotVM.AdministrationDetail.RecordedAt;
                    }
                    if (!String.IsNullOrEmpty(oSlotVM.Status) && !String.IsNullOrEmpty(oAdminTagSlotDetail.SlotStatus)) {
                        oAdminTagSlotDetail.SlotStatus = oSlotVM.Status;
                    }
                    if (ValueDomainValues.oReasonForNotGiven != null && ValueDomainValues.oReasonForNotGiven.Count() > 0 && oSlotVM.AdministrationDetail != null && oSlotVM.AdministrationDetail.ReasonNotGiven != null) {
                        oAdministratedSlot.ReasonForNotGiven = !String.IsNullOrEmpty(oSlotVM.AdministrationDetail.ReasonNotGiven.Value) ? ValueDomainValues.oReasonForNotGiven.FirstOrDefault(a => a.Key == oSlotVM.AdministrationDetail.ReasonNotGiven.Value).Value.ToString() : String.Empty;
                        oAdministratedSlot.ReasonToolTip = MedsAdminChartToolTip.ReasonToolTip + ": " + oSlotVM.AdministrationDetail.ReasonNotGiven.DisplayText;
                        oAdministratedSlot.ReasonToolTip += !String.IsNullOrEmpty(oSlotVM.AdministrationDetail.AdminComments) ? "\n" + MedsAdminChartToolTip.CommentsToolTip + ": " + oSlotVM.AdministrationDetail.AdminComments : String.Empty;
                        oAdministratedSlot.ReasonFontSize = CConstants.Thirteen;
                    }
                    this.oGetMedsChartData.SetAdministratedSlotIcon(oAdministratedSlot, sAdminOnTimeMode, sAdminOnTimeDiffValue, true,
                        oSlotVM.Status, sToolTip, sHistoryToolTip, sDiscrepancyReason, DoseDisc, sAdminComments);
                    let sTimeFormatAdminSlot: string = this.MedicationChartControl.TimeFormat;
                    if ((DateTime.NotEquals(oSlotVM.ScheduledDTTM, DateTime.MinValue) && oSlotVM.AdministrationDetail != null && DateTime.NotEquals(oSlotVM.AdministrationDetail.AdministeredDate, DateTime.MinValue) && DateTime.NotEquals(oSlotVM.ScheduledDTTM.Date, oSlotVM.AdministrationDetail.AdministeredDate.Date)) && (String.Equals(oSlotVM.Status, SlotStatus.GIVEN) || String.Equals(oSlotVM.Status, SlotStatus.SELFADMINISTERED))) {
                        sTimeFormatAdminSlot = CConstants.DateTimeFormat;
                    }
                    oAdministratedSlot.AdministratedTmFrmt = sTimeFormatAdminSlot;
                    this.oClickedSlotTagObject.oIChartSlot = oAdministratedSlot;
                    this.MedicationChartControl.RefreshCell(this.oClickedSlotTagObject);
                    if (!String.IsNullOrEmpty(this.sPreviousSlotStatus) && !String.IsNullOrEmpty(oSlotVM.Status) && this.oTagDrugHeaderDetail != null && this.oTagDrugHeaderDetail.PrescriptionItemOID > 0 && MedChartData.ListOfEventsWithNotKnownStatus != null) {
                        let ToCheckPrescItem = MedChartData.ListOfEventsWithNotKnownStatus.Where(c => c != null && c.PrescriptionItemOID == this.oTagDrugHeaderDetail.PrescriptionItemOID).FirstOrDefault();
                        if (ToCheckPrescItem == null) {
                            let oEventsWithNotKnownStatus: EventsWithNotKnownStatus = new EventsWithNotKnownStatus(this.oTagDrugHeaderDetail.PrescriptionItemOID, 0, String.Empty);
                            MedChartData.ListOfEventsWithNotKnownStatus.Add(oEventsWithNotKnownStatus);
                        }
                        GetMedsChartData.UpdateOverviewIcon(this.sPreviousSlotStatus, oSlotVM.Status, this.oTagDrugHeaderDetail.PrescriptionItemOID, this);
                    }
                }
            }
        }
    }
    RefreshStrikethroughAdminSlot(oSlotVM: SlotDetailVM): void {
        if (oSlotVM != null && oSlotVM.IsDialogResult && this.oClickedSlotTagObject != null && this.oClickedSlotTagObject.oIChartSlot != null) {
            if (this.oClickedSlotTagObject.oIChartSlot instanceof AdministratedSlot) {
                let oAdministratedSlot: AdministratedSlot = <AdministratedSlot>this.oClickedSlotTagObject.oIChartSlot;
                if (oAdministratedSlot != null) {
                    this.oGetMedsChartData.IsGreyedOut = false;
                    this.oGetMedsChartData.IsCompleted = false;
                    let sDoseType: string = String.Empty;
                    let sSlotStatus: string = String.Empty;
                    let oTagDrugHeaderDetail: TagDrugHeaderDetail = <TagDrugHeaderDetail>(this.oClickedSlotTagObject.oDrugItem).Tag;
                    if (oTagDrugHeaderDetail != null) {
                        sDoseType = oTagDrugHeaderDetail.DoseType;
                        if (oTagDrugHeaderDetail.PrescriptionItemStatus == CConstants.DISCONTINUED || oTagDrugHeaderDetail.PrescriptionItemStatus == CConstants.CANCELLED) {
                            this.oGetMedsChartData.IsGreyedOut = true;
                        }
                        else if (oTagDrugHeaderDetail.PrescriptionItemStatus == CConstants.COMPLETED)
                            this.oGetMedsChartData.IsCompleted = true;
                    }
                    let oAdminTagSlotDetail: TagSlotDetail = null;
                    if (oAdministratedSlot.Tag != null) {
                        oAdminTagSlotDetail = <TagSlotDetail>oAdministratedSlot.Tag;
                        if (oSlotVM.AdministrationDetail != null && oAdminTagSlotDetail.MedsAdminOID == 0 && oAdminTagSlotDetail.SlotStatus == SlotStatus.NOTKNOWN)
                            oAdminTagSlotDetail.MedsAdminOID = oSlotVM.AdministrationDetail.MedAdminOID;
                    }
                    if (oAdminTagSlotDetail != null && !String.IsNullOrEmpty(oAdminTagSlotDetail.SlotStatus) && oTagDrugHeaderDetail != null && !String.IsNullOrEmpty(oTagDrugHeaderDetail.PrescriptionItemStatus) && ((String.Equals(oTagDrugHeaderDetail.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase)) || (String.Equals(oTagDrugHeaderDetail.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase)))) {
                        oAdminTagSlotDetail.SlotStatus = SlotStatus.NOTKNOWN;
                        oSlotVM.Status = SlotStatus.NOTKNOWN;
                    }
                    if (oTagDrugHeaderDetail.DoseType == DoseTypeCode.TITRATED) {
                        let lnDose: number = 0;
                        Number.TryParse(oAdminTagSlotDetail.Dose, (o) => { lnDose = o; });
                        if (lnDose == 0) {
                            oAdminTagSlotDetail.Dose = CConstants.DoseTBD;
                        }
                    }
                    if (String.Compare(oSlotVM.Status, SlotStatus.NOTKNOWN) != 0) {
                        let nDuenessThreshold: number = MedChartData.DuenessThreshold;
                        if (oTagDrugHeaderDetail.SlotsTimeIntervalAvg < MedChartData.DuenessThreshold)
                            nDuenessThreshold = oTagDrugHeaderDetail.SlotsTimeIntervalAvg;
                        if (oSlotVM.AdministrationDetail.IsDuringHomeLeave && String.Equals(oSlotVM.Status, SlotStatus.HOMELEAVE, StringComparison.InvariantCultureIgnoreCase)) {
                            sSlotStatus = SlotStatus.HOMELEAVE;
                        }
                        else if (!oTagDrugHeaderDetail.IsPRNWithSchedule) {
                            sSlotStatus = this.SlotCurrentStatus(nDuenessThreshold, CConstants.OverdueToNotknownTime, oAdminTagSlotDetail.SlotDateTime, this.oClickedSlotTagObject.oDrugItem.Key, "S");
                        }
                        else {
                            sSlotStatus = SlotStatus.PLANNED;
                        }
                        if ((String.Equals(sSlotStatus, SlotStatus.DUENOW) || String.Equals(sSlotStatus, SlotStatus.OVERDUE)) && oTagDrugHeaderDetail.IsPatientSelfAdmin) {
                            sSlotStatus = SlotStatus.NOTYETRECORDED;
                        }
                        if ((String.Equals(sSlotStatus, SlotStatus.PLANNED) || String.Equals(sSlotStatus, SlotStatus.DUENOW) || String.Equals(sSlotStatus, SlotStatus.OVERDUE)) && oAdminTagSlotDetail.IsSelfAdministered) {
                            sSlotStatus = SlotStatus.PATIENTSELFADMIN;
                            oAdminTagSlotDetail.SlotStatus = SlotStatus.PATIENTSELFADMIN;
                        }
                        else if (String.Compare(sSlotStatus, SlotStatus.PLANNED) == 0) {
                            oAdminTagSlotDetail.SlotStatus = sSlotStatus;
                            sSlotStatus = "";
                        }
                        else oAdminTagSlotDetail.SlotStatus = sSlotStatus;
                        let dtSlotDateTimeTime: DateTime = (oAdminTagSlotDetail != null) ? oAdminTagSlotDetail.SlotDateTime : oAdministratedSlot.Time;
                        let oDefSlot: DefaultSlot;
                        if (oTagDrugHeaderDetail != null && !String.IsNullOrEmpty(oTagDrugHeaderDetail.DoseType) && oTagDrugHeaderDetail.DoseType == DoseTypeCode.TITRATED) {
                            oDefSlot = this.oGetMedsChartData.CreateDefaultSlot(oAdministratedSlot.Key, dtSlotDateTimeTime, sSlotStatus, oAdminTagSlotDetail.Dose + " " + oAdminTagSlotDetail.DoseUOM, String.Empty, oAdminTagSlotDetail, sDoseType, true, 'N');
                        }
                        else {
                            let sDose: string = String.Empty;
                            let sUDose: string = String.Empty;
                            if (oAdminTagSlotDetail != null && !String.IsNullOrEmpty(oAdminTagSlotDetail.Dose) && !String.IsNullOrEmpty(oAdminTagSlotDetail.DoseUOM) && (String.Equals(sSlotStatus, SlotStatus.DUENOW) || String.Equals(sSlotStatus, SlotStatus.DEFERADMIN) || String.Equals(sSlotStatus, SlotStatus.DEFERDUENOW) || String.Equals(sSlotStatus, SlotStatus.DEFEROVERDUE) || String.Equals(sSlotStatus, SlotStatus.NOTGIVEN) || String.Equals(sSlotStatus, SlotStatus.NOTYETRECORDED) || String.Equals(sSlotStatus, SlotStatus.OVERDUE) || String.Equals(sSlotStatus, SlotStatus.OMITTED) || String.Equals(sSlotStatus, SlotStatus.PLANNED) || String.IsNullOrEmpty(sSlotStatus))) {
                                sDose = oAdminTagSlotDetail.Dose + " " + oAdminTagSlotDetail.DoseUOM;
                                sUDose = oAdminTagSlotDetail.UpperDose;
                            }
                            else {
                                sDose = oSlotVM.AdministrationDetail.Dose;
                                sUDose = String.Empty;
                            }
                            oDefSlot = this.oGetMedsChartData.CreateDefaultSlot(oAdministratedSlot.Key, dtSlotDateTimeTime, sSlotStatus, sDose, sUDose, oAdminTagSlotDetail, sDoseType, true, 'N');
                        }
                        if (String.Compare(sSlotStatus, SlotStatus.NOTKNOWN) == 0) {
                            oDefSlot.Time = oAdminTagSlotDetail.SlotDateTime;
                            oDefSlot.SlotStatus = String.Empty;
                            oDefSlot.StatusToolTip = MedsAdminChartToolTip.PlannedToolTip;
                            ;
                        }
                        oDefSlot.SlotHeight = oAdministratedSlot.SlotHeight;
                        let MedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
                        if (oTagDrugHeaderDetail.IsParacetamolIngredient && ((String.Compare(sSlotStatus, SlotStatus.DUENOW) == 0 || String.Compare(sSlotStatus, SlotStatus.OVERDUE) == 0 || String.Compare(sSlotStatus, SlotStatus.DEFERDUENOW) == 0 || String.Compare(sSlotStatus, SlotStatus.DEFEROVERDUE) == 0 || String.Compare(sSlotStatus, SlotStatus.NOTYETRECORDED) == 0)) && MedAdminVM != null && MedAdminVM.CumulativeParacetamol.ParacetamolAdministeredCount.HasValue && MedAdminVM.CumulativeParacetamol.ParacetamolAdministeredCount.Value > 3) {
                            oDefSlot.CumulativeIcon.Key = CConstants.CumulativeWarning;
                            oDefSlot.CumulativeIcon.UriString = MedImage.GetPath(MedImages.CumulativeWarningIcon);
                            oDefSlot.CumulativeIcon.EnableOnHotSpotClick = false;
                            oDefSlot.CumulativeIcon.Tooltip = ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.CumulativeIcon, MaxWidth: 250, IsWordwrap: true });
                        }
                        if (String.Compare(oAdminTagSlotDetail.SlotStatus, SlotStatus.NOTYETRECORDED) == 0 || String.Compare(oAdminTagSlotDetail.SlotStatus, SlotStatus.OVERDUE) == 0 || String.Compare(oAdminTagSlotDetail.SlotStatus, SlotStatus.DUENOW) == 0) {
                            oDefSlot.FontWeightTime = FontWeights.Bold;
                            oDefSlot.FontWeightStatus = FontWeights.Bold;
                        }
                        this.oClickedSlotTagObject.oIChartSlot = oDefSlot;
                    }
                    else {
                        let sAdminComments: string = (oSlotVM.AdministrationDetail != null) ? oSlotVM.AdministrationDetail.AdminComments : String.Empty;
                        if (String.Equals(oSlotVM.Status, SlotStatus.NOTKNOWN, StringComparison.InvariantCultureIgnoreCase)) {
                            sAdminComments = String.Empty;
                        }
                        let sToolTip: string = String.Empty;
                        let sHistoryToolTip: string = String.Empty;
                        let sDiscrepancyReason: string = String.Empty;
                        sToolTip = this.getTootTip(oAdministratedSlot.Time, oSlotVM, (o1) => { sHistoryToolTip = o1; }, (o2) => { sDiscrepancyReason = o2; });
                        let sTimeFormatAdminSlot: string = this.MedicationChartControl.TimeFormat;
                        if ((oAdministratedSlot != null && DateTime.GreaterThan(oAdministratedSlot.Time, DateTime.MinValue) && DateTime.NotEquals(oSlotVM.ScheduledDTTM.Date, oAdministratedSlot.Time.Date)) && (String.Equals(oSlotVM.Status, SlotStatus.GIVEN) || String.Equals(oSlotVM.Status, SlotStatus.SELFADMINISTERED))) {
                            sTimeFormatAdminSlot = CConstants.DateTimeFormat;
                        }
                        let oAdminSlot: AdministratedSlot = this.oGetMedsChartData.CreateAdministratedSlot(oAdministratedSlot.Key, oAdministratedSlot.Time, String.MinValue, String.Empty, true,
                            oSlotVM.Status, oAdminTagSlotDetail, sToolTip, sHistoryToolTip, String.Empty, true, sAdminComments, sTimeFormatAdminSlot);
                        oAdminSlot.SlotHeight = oAdministratedSlot.SlotHeight;
                        this.oClickedSlotTagObject.oIChartSlot = oAdminSlot;
                    }
                    this.MedicationChartControl.RefreshCell(this.oClickedSlotTagObject);
                    this.UpdateChartSummaryBar(sSlotStatus, -1);
                    if (oSlotVM != null && !String.IsNullOrEmpty(oSlotVM.CurrentPrescriptionItemStatus)) {
                        this.RefreshMedChartForPresItemStatusChange(oSlotVM.CurrentPrescriptionItemStatus);
                    }
                }
            }
        }
    }
    private SlotCurrentStatus(DuenessWindowTime: number, OverdueThresholdTime: number, SlotScheduleDTTM: DateTime, DrugItemKey: string, sCA: string): string {
        let sSlotStatus: string = String.Empty;
        let dtCurrentDate: DateTime = CommonBB.GetServerDateTime();
        if (DateTime.LessThan(dtCurrentDate, SlotScheduleDTTM.AddMinutes(-DuenessWindowTime)))
            sSlotStatus = SlotStatus.PLANNED;
        else if (DateTime.GreaterThanOrEqualTo(dtCurrentDate, SlotScheduleDTTM.AddMinutes(-DuenessWindowTime)) && DateTime.LessThanOrEqualTo(dtCurrentDate, SlotScheduleDTTM.AddMinutes(DuenessWindowTime)))
            sSlotStatus = String.Compare(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0 ? SlotStatus.PLANNED : SlotStatus.DUENOW;
        else if (DateTime.GreaterThan(dtCurrentDate, SlotScheduleDTTM.AddMinutes(DuenessWindowTime)) && DateTime.LessThan(dtCurrentDate, SlotScheduleDTTM.DateTime.AddHours(OverdueThresholdTime)))
            sSlotStatus = String.Compare(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0 ? SlotStatus.PLANNED : SlotStatus.OVERDUE;
        else sSlotStatus = SlotStatus.NOTKNOWN;
        var drug: IEnumerable<ChartRow> = this.MedicationChartControl.ChartRows.Where(drg => (String.Compare(drg.Key.Split('-')[1], DrugItemKey) == 0));
        let tempNextSlot: ObservableCollection<IChartSlot> = new ObservableCollection<IChartSlot>();
        drug.forEach(odrug => {
            odrug.ChartCells.forEach(drugSlots => {
                // drugSlots.Slots.forEach(slot => {
                //     if ((slot instanceof DefaultSlot && DateTime.GreaterThan((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotDateTime, SlotScheduleDTTM))
                //         || (slot instanceof AdministratedSlot && DateTime.GreaterThan((<TagSlotDetail>(<AdministratedSlot>slot).Tag).SlotDateTime, SlotScheduleDTTM))) {
                //         tempNextSlot.Add(slot);
                //     }
                // });
		
                if (drugSlots.Slots.Count > 0) {
                    let nCount: number = drugSlots.Slots.Count;
                    for (let k: number = 0; k < nCount; k++) {
                        var slot = drugSlots.Slots[k];
                        if ((slot instanceof DefaultSlot && DateTime.GreaterThan((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotDateTime, SlotScheduleDTTM))
                            || (slot instanceof AdministratedSlot && DateTime.GreaterThan((<TagSlotDetail>(<AdministratedSlot>slot).Tag).SlotDateTime, SlotScheduleDTTM))) {
                            tempNextSlot.Add(drugSlots.Slots[k]);
                        }
                    }
                }
            });
        });
        let NextSlot = tempNextSlot.FirstOrDefault();
        if (NextSlot != null) {
            if (NextSlot instanceof DefaultSlot) {
                let sTmpSlotStatus: string = (<TagSlotDetail>(<DefaultSlot>NextSlot).Tag).SlotStatus;
                if (String.Compare(sTmpSlotStatus, SlotStatus.DUENOW) == 0 || String.Compare(sTmpSlotStatus, SlotStatus.OVERDUE) == 0 || String.Compare(sTmpSlotStatus, SlotStatus.NOTYETRECORDED) == 0 || String.Compare(sTmpSlotStatus, SlotStatus.NOTKNOWN) == 0 || String.Compare(sTmpSlotStatus, SlotStatus.HOMELEAVE) == 0) {
                    if (String.Compare(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0) {
                        if (String.Compare(sTmpSlotStatus, SlotStatus.HOMELEAVE) == 0 || (MedChartData.SuspendedOn != DateTime.MinValue && DateTime.LessThanOrEqualTo(SlotScheduleDTTM, MedChartData.SuspendedOn)))
                            sSlotStatus = SlotStatus.NOTYETRECORDED;
                        else sSlotStatus = SlotStatus.PLANNED;
                    }
                    else {
                        sSlotStatus = SlotStatus.NOTYETRECORDED;
                    }
                }
            }
            else if (NextSlot instanceof AdministratedSlot) {
                sSlotStatus = SlotStatus.NOTYETRECORDED;
            }
        }
        if (String.Compare(sSlotStatus, SlotStatus.PLANNED) == 0) {
            let tempPrevSlot: ObservableCollection<IChartSlot> = new ObservableCollection<IChartSlot>();
            drug.forEach(odrug => {
                odrug.ChartCells.forEach(drugSlots => {
                    drugSlots.Slots.forEach(slot => {
                        if (DateTime.LessThan(slot instanceof DefaultSlot && (<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotDateTime, SlotScheduleDTTM) &&
                            ((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus == SlotStatus.NOTYETRECORDED || (<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus == SlotStatus.DUENOW || (<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus == SlotStatus.OVERDUE)) {
                            tempPrevSlot.Add(slot);
                        }
                    });
                });
            });
            let PrevSlot = tempPrevSlot.LastOrDefault();
            if (!String.IsNullOrEmpty(PrevSlot)) {
                let PrevSlotDTTM: DateTime = (<TagSlotDetail>(<DefaultSlot>PrevSlot).Tag).SlotDateTime;
                let InBetweenSlots: ObservableCollection<IChartSlot> = new ObservableCollection<IChartSlot>();
                drug.forEach(odrug => {
                    odrug.ChartCells.forEach(drugSlots => {
                        drugSlots.Slots.forEach(slot => {
                            if (slot instanceof DefaultSlot && DateTime.GreaterThan((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotDateTime, PrevSlotDTTM) &&
                                DateTime.LessThan((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotDateTime, SlotScheduleDTTM) &&
                                ((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus == SlotStatus.DEFERDUENOW ||
                                    (<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus == SlotStatus.DEFEROVERDUE ||
                                    (<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus == SlotStatus.GIVEN ||
                                    (<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus == SlotStatus.HOMELEAVE ||
                                    (<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus == SlotStatus.NOTGIVEN ||
                                    (<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus == SlotStatus.NOTKNOWN ||
                                    (<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus == SlotStatus.PATIENTSELFADMIN ||
                                    (<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus == SlotStatus.SELFADMINISTERED
                                )) {
                                InBetweenSlots.Add(slot);
                            }
                        });
                    });
                });
                if (InBetweenSlots != null && InBetweenSlots.Count == 0) {
                    let dtPrevSlotScheduleTime: DateTime = (<TagSlotDetail>(<DefaultSlot>PrevSlot).Tag).SlotDateTime;
                    if (!String.Equals(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.CurrentCultureIgnoreCase)) {
                        if (DateTime.GreaterThanOrEqualTo(dtCurrentDate,dtPrevSlotScheduleTime.AddMinutes(-DuenessWindowTime)) && DateTime.LessThanOrEqualTo(dtCurrentDate,dtPrevSlotScheduleTime.AddMinutes(DuenessWindowTime)))
                        {
                            (<DefaultSlot>PrevSlot).SlotStatus = SlotStatusText.DUENOW;
                        }
                        else if (DateTime.GreaterThan(dtCurrentDate,dtPrevSlotScheduleTime.AddMinutes(DuenessWindowTime)) && DateTime.LessThan(dtCurrentDate,dtPrevSlotScheduleTime.DateTime.AddHours(OverdueThresholdTime)))
                        {
                            (<DefaultSlot>PrevSlot).SlotStatus = SlotStatusText.OVERDUE;
                        }
                    }
                    if (String.Compare((<DefaultSlot>PrevSlot).SlotStatus, SlotStatusText.DUENOW, StringComparison.InvariantCultureIgnoreCase) == 0) {
                        (<TagSlotDetail>(<DefaultSlot>PrevSlot).Tag).SlotStatus = SlotStatus.DUENOW;
                        (<DefaultSlot>PrevSlot).BackGroundColor = new SolidColorBrush(MedChartData.DueSlotsColor);
                        (<DefaultSlot>PrevSlot).StatusToolTip = MedsAdminChartToolTip.DueNowToolTip;
                    }
                    else if (String.Compare((<DefaultSlot>PrevSlot).SlotStatus, SlotStatusText.OVERDUE, StringComparison.InvariantCultureIgnoreCase) == 0) {
                        (<TagSlotDetail>(<DefaultSlot>PrevSlot).Tag).SlotStatus = SlotStatus.OVERDUE;
                        (<DefaultSlot>PrevSlot).BackGroundColor = new SolidColorBrush(MedChartData.OverDueSlotsColor);
                        (<DefaultSlot>PrevSlot).StatusToolTip = MedsAdminChartToolTip.AdminOverDueToolTip + this.oSlotVM.ScheduledDTTM.ToString(CConstants.ShortDateFormat) + " " + this.oSlotVM.ScheduledDTTM.ToString(CConstants.Timeformat) + " hours";
                    }
                }
            }
        }
        return sSlotStatus;
    }
    SlotPreviousStatus(SlotScheduleDTTM: DateTime, DrugItemKey: string): void {
        let PrevSlot: ObservableCollection<IChartSlot> = new ObservableCollection<IChartSlot>();
        let drug: IEnumerable<ChartRow> = this.MedicationChartControl.ChartRows.Where(drg => (String.Compare(drg.Key.Split('-')[1], DrugItemKey) == 0));
        drug.forEach(odrug => {
            odrug.ChartCells.forEach(drugSlots => {
                drugSlots.Slots.forEach(slot => {
                    if (slot instanceof DefaultSlot && DateTime.LessThan((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotDateTime, SlotScheduleDTTM) &&
                        ((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus == SlotStatus.DUENOW || (<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus == SlotStatus.OVERDUE)) {
                        PrevSlot.Add(slot);
                    }
                });
            });
        });

        if (PrevSlot != null && PrevSlot.Count > 0) {
            PrevSlot.forEach((oslot) => {
                let sTmpSlotStatus: string = (<DefaultSlot>oslot).SlotStatus;
                if (String.Compare(sTmpSlotStatus, SlotStatusText.DUENOW) == 0 || String.Compare(sTmpSlotStatus, SlotStatusText.OVERDUE) == 0) {
                    (<DefaultSlot>oslot).SlotStatus = SlotStatusText.NOTYETRECORDED;
                    (<TagSlotDetail>(<DefaultSlot>oslot).Tag).SlotStatus = SlotStatus.NOTYETRECORDED;
                    (<DefaultSlot>oslot).BackGroundColor = new SolidColorBrush(MedChartData.OverDueSlotsColor);
                    (<DefaultSlot>oslot).StatusToolTip = MedsAdminChartToolTip.AdminNotyetRecordToolTip + this.oSlotVM.ScheduledDTTM.ToString(CConstants.ShortDateFormat) + " " + this.oSlotVM.ScheduledDTTM.ToString(CConstants.Timeformat) + " hours";
                }
            });
        }
    }
    LaunchMedsAdminModifyOrStrikethrough(oSlotVM: SlotDetailVM, IsPGD: boolean): void {
        let oHdrAddnlInfo: CDrugHdrAddnlInfo = new CDrugHdrAddnlInfo();
        oHdrAddnlInfo.RecordedAt = oSlotVM.AdministrationDetail.RecordedAt.ToUserDateTimeString(CConstants.DateTimeFormat) + " (Due at " + this.oTagSlotDetail.SlotDateTime.ToUserDateTimeString(CConstants.Timeformat) + ")";
        if (DateTime.NotEquals(this.oTagDrugHeaderDetail.ReviewDTTM, DateTime.MinValue)) {
            oHdrAddnlInfo.ReviewAt = this.oTagDrugHeaderDetail.ReviewDTTM.ToUserDateTimeString(CConstants.DateTimeFormat);
            if (DateTime.LessThanOrEqualTo(this.oTagDrugHeaderDetail.ReviewDTTM.Date, CommonBB.GetServerDateTime().Date)) {
                oHdrAddnlInfo.ReviewAtVisibility = Visibility.Visible;
                oHdrAddnlInfo.ReviewIconTooltip = Common.GetReviewIconTooltip(this.oTagDrugHeaderDetail.ReviewType, this.oTagDrugHeaderDetail.ReviewDTTM, this.oTagDrugHeaderDetail.ReviewRequestedComments, this.oTagDrugHeaderDetail.ReviewRequestedby);
            }
        }
        oSlotVM.IdentifyingOID = this.oTagDrugHeaderDetail.DrugIdentifyingOID;
        oSlotVM.IdentifyingType = this.oTagDrugHeaderDetail.DrugIdentifyingType;
        oSlotVM.MCVersionNo = this.oTagDrugHeaderDetail.MCVersionNo;
        oSlotVM.RouteOID = this.oTagDrugHeaderDetail.RouteOID;
        oSlotVM.IsControlledDrug = this.oTagDrugHeaderDetail.IsControlDrug;
        oSlotVM.IsFluidControlledDrug = this.oTagDrugHeaderDetail.IsFluidControlDrug;
        oSlotVM.ScheduledDTTM = this.oTagSlotDetail.SlotDateTime;
        oSlotVM.AdminMethod = this.oTagDrugHeaderDetail.AdminMethod;
        oSlotVM.LorenzoID = this.oTagDrugHeaderDetail.LorenzoID;
        oSlotVM.PrescriptionStartDate = this.oTagDrugHeaderDetail.StartDate;
        oSlotVM.DoseType = this.oTagDrugHeaderDetail.DoseType;
        oSlotVM.IsParacetamolIngredient = this.oTagDrugHeaderDetail.IsParacetamolIngredient;
        oSlotVM.SlotsTimeIntervalAvg = this.oTagDrugHeaderDetail.SlotsTimeIntervalAvg;
        oSlotVM.PrescriptionItemStatus = this.oTagDrugHeaderDetail.PrescriptionItemStatus;
        oSlotVM.IsAmendCompletedStatus = this.oTagDrugHeaderDetail.IsAmendCompletedStatus;
        let IsNextSlotAdmSlot: boolean = false;
        if (this.oTagDrugHeaderDetail.SequenceParentPrescItemOID > 0 && this.oTagDrugHeaderDetail.SeqInfOrderForPervImmediateItm > 0 && String.Equals(this.oTagDrugHeaderDetail.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase)) {
            let NextCompletedItm: number = this.oGetMedsChartData.oChartRowList.Where(c => (c.DrugItem != null) && (c.DrugItem.Tag != null) && (c.DrugItem.Tag instanceof TagDrugHeaderDetail) && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).SequenceParentPrescItemOID > 0 && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).SequenceParentPrescItemOID == this.oTagDrugHeaderDetail.SequenceParentPrescItemOID && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).SeqInfOrderForPervImmediateItm > this.oTagDrugHeaderDetail.SeqInfOrderForPervImmediateItm && String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase)).Select(s => (ObjectHelper.CreateType<TagDrugHeaderDetail>(s.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemOID).FirstOrDefault();
            IsNextSlotAdmSlot = NextCompletedItm > 0 ? true : false;
            if (IsNextSlotAdmSlot) {
                let PresOID: number = this.oGetMedsChartData.oChartRowList.Where(c => (c.DrugItem != null) && (c.DrugItem.Tag != null) && (c.DrugItem.Tag instanceof TagDrugHeaderDetail) && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).SequenceParentPrescItemOID > 0 && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).SequenceParentPrescItemOID == this.oTagDrugHeaderDetail.SequenceParentPrescItemOID && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).SeqInfOrderForPervImmediateItm > this.oTagDrugHeaderDetail.SeqInfOrderForPervImmediateItm && String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase)).Select(s => (ObjectHelper.CreateType<TagDrugHeaderDetail>(s.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemOID).FirstOrDefault();
                if (PresOID > 0) {
                    IsNextSlotAdmSlot = !this.oGetMedsChartData.oChartRowList.Any(c => (c.DrugItem != null) && (c.DrugItem.Tag != null) && (c.DrugItem.Tag instanceof TagDrugHeaderDetail) && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).AmendedPrescriptionItemOID == PresOID && !String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.InvariantCultureIgnoreCase));
                }
            }
            if (!IsNextSlotAdmSlot) {
                let NextSeqDrugSlots: ObservableCollection<IChartSlot> = new ObservableCollection<IChartSlot>();
                let drug: IEnumerable<ChartRow> = this.MedicationChartControl.ChartRows.Where((drg) => (drg.DrugItem.Tag != null) && (drg.DrugItem.Tag instanceof TagDrugHeaderDetail)
                    && (drg.DrugItem.Tag as TagDrugHeaderDetail).SequenceParentPrescItemOID > 0
                    && (drg.DrugItem.Tag as TagDrugHeaderDetail).SequenceParentPrescItemOID == this.oTagDrugHeaderDetail.SequenceParentPrescItemOID
                    && (drg.DrugItem.Tag as TagDrugHeaderDetail).SeqInfOrderForPervImmediateItm == this.oTagDrugHeaderDetail.SeqInfOrderForPervImmediateItm + 1
                    && !String.Equals((drg.DrugItem.Tag as TagDrugHeaderDetail).PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase)
                    && !String.Equals((drg.DrugItem.Tag as TagDrugHeaderDetail).PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.InvariantCultureIgnoreCase));
                drug.forEach(odrug => {
                    odrug.ChartCells.forEach(drugSlots => {
                        drugSlots.Slots.forEach(slot => {
                            NextSeqDrugSlots.Add(slot);
                        });
                    });
                });

                IsNextSlotAdmSlot = NextSeqDrugSlots.Any(x => x instanceof AdministratedSlot);
                if (!IsNextSlotAdmSlot && NextSeqDrugSlots.Any(x => x instanceof TodayMultiSlot)) {
                    let cnt: number = NextSeqDrugSlots.Count;
                    for (let j: number = 0; j < cnt; j++) {
                        if ((<TodayMultiSlot>NextSeqDrugSlots[j]).AdminSummary != null && (<TodayMultiSlot>NextSeqDrugSlots[j]).AdminSummary.Count > 0 && (<TodayMultiSlot>NextSeqDrugSlots[j]).AdminSummary.Any(x => !String.IsNullOrEmpty(x.StringData))) {
                            IsNextSlotAdmSlot = true;
                            break;
                        }
                    }
                }
            }
        }
        if (!IsNextSlotAdmSlot && this.oTagDrugHeaderDetail.SequenceParentPrescItemOID > 0 && this.oTagDrugHeaderDetail.SeqInfOrderForPervImmediateItm > 0) {
            let oParam: string[] = new Array(4);
            oParam[0] = this.oTagDrugHeaderDetail.SequenceParentPrescItemOID.ToString();
            oParam[1] = this.oTagDrugHeaderDetail.SeqInfOrderForPervImmediateItm.ToString();
            oParam[2] = "1";
            oParam[3] = ChartContext.PatientOID.ToString();
            let IsPreviousSeqItemActive: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("GetPreviousSeqItemActive", oParam), 'string');
            IsNextSlotAdmSlot = String.Equals(IsPreviousSeqItemActive, "1", StringComparison.InvariantCultureIgnoreCase) ? true : false;
        }
        oSlotVM.IsStrikethroughDisable = IsNextSlotAdmSlot;
        let MedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
        if (MedAdminVM != null && MedAdminVM.CumulativeParacetamol.ParacetamolAdministeredCount.HasValue) {
            oSlotVM.ParacetamolAdminCount = MedAdminVM.CumulativeParacetamol.ParacetamolAdministeredCount.Value;
        }
        this.oMAModorST = new MedsAdminModifyOrStrikethrough();
        this.oMAModorST.constructorImpl(oSlotVM, oHdrAddnlInfo)

        this.oMAModorST.isPGD = IsPGD;
        this.oMAModorST.objDrugHeader = new DrugHeader();
        this.oMAModorST.objDrugHeader.oDrugHeader = new CDrugHeader();
        this.oMAModorST.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo = new DrugHeaderItem();
        this.oMAModorST.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowFrequency = false;
        this.oMAModorST.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowSite = false;
        this.oMAModorST.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowAsrequired = false;
        this.oMAModorST.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.SlotStatus = oSlotVM.Status;
        oHdrAddnlInfo.SteppedDoseUOM = oSlotVM.DoseUOM;
        oHdrAddnlInfo.SteppedLowerDose = oSlotVM.LDose;
        oHdrAddnlInfo.SteppedUpperDose = oSlotVM.UDose;
        oHdrAddnlInfo.RecordAdminViewed = RecordAdminType.RecordAdmin;
        this.oMAModorST.objDrugHeader.DataContext = Common.SetDrugHeaderContent(this.oClickedSlotTagObject.oDrugItem, oHdrAddnlInfo, this.oMAModorST.objDrugHeader);
        this.oMAModorST.onDialogClose = this.oMAModorST_ModifyOrStrikethroughClosed;
        this.oMAModorST.objlinkButtons = new ModifyStrikethroughLink();
        this.oMAModorST.objlinkButtons.DataContext = this.oMAModorST.DataContext;
        if (oSlotVM != null && oSlotVM.Status == "CC_NOTKNOWN" && oSlotVM.AdministrationDetail.MedAdminOID == 0) {
            this.oMAModorST.IsSlotInPastDateAndStatusUnknown = true;
        }
        if (oSlotVM.Status == SlotStatus.NOTKNOWN && oSlotVM.MultiRoute_Type == MultiRouteType.Mixed_Routes) {
            this.oMAModorST.IsModifyLaunchedDirectly = true;
            this.oMAModorST._Parent = this;
            Busyindicator.SetStatusIdle("MedChart");
            this.IsActivityLaunchedInSlot = false;
            this.oMAModorST.cmdModify_Click(this, new RoutedEventArgs());
        }
        else {
            // ObjectHelper.stopFinishAndCancelEvent(true);
            AppActivity.OpenWindow("Choose Modify or Strikethrough ", this.oMAModorST, (s) => { this.oMAModorST_ModifyOrStrikethroughClosed(s); }, "", false, 220, 440, false, WindowButtonType.Close, this.oMAModorST.objlinkButtons);
            this.IsActivityLaunchedInSlot = false;
        }
    }
    public _oMedsAdmin_OnSubmitModAdminEvent = (s, e) => { this.oMedsAdmin_OnSubmitModAdminEvent(); };
    public oMedsAdmin_OnSubmitModAdminEvent(): void {
        this.ModifyStrikeThroughClosed();

        this.IsActivityLaunchedInSlot = false;
    }

    ModifyStrikeThroughClosed(): void {
        let MedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
        if (MedAdminVM != null) {
            MedAdminVM.CumulativeParacetamol.GetCumulativeParacetamol();
        }
        Busyindicator.SetStatusIdle("MedChart");
        this.IsActivityLaunchedInSlot = false;
        let oSlotVM: SlotDetailVM = ObjectHelper.CreateType<SlotDetailVM>(this.oMAModorST.DataContext, SlotDetailVM);
        if (oSlotVM != null) {
            if (oSlotVM.IsDialogResult) {
                if (oSlotVM.IsModifyWindow) {
                    this.RefreshModifyAdminSlot(oSlotVM);
                }
                else {
                    this.RefreshStrikethroughAdminSlot(oSlotVM);
                }
                if (MedAdminVM != null) {
                    MedAdminVM.CumulativeParacetamol.GetCumulativeParacetamol();
                }
                if (!String.IsNullOrEmpty(this.sPreviousSlotStatus) && !String.IsNullOrEmpty(oSlotVM.Status) && oSlotVM.PrescriptionItemOID > 0 && MedChartData.ListOfEventsWithNotKnownStatus != null) {
                    let ToCheckPrescItem = MedChartData.ListOfEventsWithNotKnownStatus.Where(c => c != null && c.PrescriptionItemOID == oSlotVM.PrescriptionItemOID).FirstOrDefault();
                    if (ToCheckPrescItem == null) {
                        let oEventsWithNotKnownStatus: EventsWithNotKnownStatus = new EventsWithNotKnownStatus(oSlotVM.PrescriptionItemOID, 0, String.Empty);
                        MedChartData.ListOfEventsWithNotKnownStatus.Add(oEventsWithNotKnownStatus);
                    }
                    GetMedsChartData.UpdateOverviewIcon(this.sPreviousSlotStatus, oSlotVM.Status, oSlotVM.PrescriptionItemOID, this);
                }
            }
        }
    }
    oMAModorST_ModifyOrStrikethroughClosed(args: AppDialogEventargs): void {
        if (this.oMAModorST.cmdCloseClick()) {
            if (args != null && args.Result == AppDialogResult.Close && args.Content != null) {
                this.oMAModorST.DataContext = args.Content.DataContext;
                this.ModifyStrikeThroughClosed();

            }
            Busyindicator.SetStatusIdle("MedChart");
            Busyindicator.SetStatusIdle("Administration");
            // ObjectHelper.stopFinishAndCancelEvent(false);
            args.AppChildWindow.DialogResult = true;
        }
    }
    oHdrRecordAdmin: CDrugHdrAddnlInfo;
    LaunchRecordAdmin(): void {
        let IsPreviousActiveSequentialItem: boolean = false;
        let oTagDrugHeaderDetail: TagDrugHeaderDetail = <TagDrugHeaderDetail>(this.oClickedSlotTagObject.oDrugItem).Tag;
        IsPreviousActiveSequentialItem = this.oGetMedsChartData.oChartRowList.Any(c => (c.DrugItem != null) && (c.DrugItem.Tag != null) && (c.DrugItem.Tag instanceof TagDrugHeaderDetail) && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).ParentPrescriptionItemOID > 0 && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).ParentPrescriptionItemOID == oTagDrugHeaderDetail.ParentPrescriptionItemOID && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).InfusionSeqOrder < oTagDrugHeaderDetail.InfusionSeqOrder && !String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.InvariantCultureIgnoreCase));
        if (IsPreviousActiveSequentialItem) {
            let sErrorMsg: string = String.Empty;
            sErrorMsg = String.Format(Resource.InfusionChart.PreviousContSeqInProgress, oTagDrugHeaderDetail.DrugName);
            this.ShowErrorMessage(sErrorMsg, MessageBoxButton.OK, MessageBoxType.Critical);
        }
        else {
            this.oHdrRecordAdmin = new CDrugHdrAddnlInfo();
            this.oHdrRecordAdmin.DueAt = this.oTagSlotDetail.SlotDateTime.ToUserDateTimeString(CConstants.DateTimeFormat);
            this.oSlotVM.IdentifyingOID = oTagDrugHeaderDetail.DrugIdentifyingOID;
            this.oSlotVM.IdentifyingType = oTagDrugHeaderDetail.DrugIdentifyingType;
            this.oSlotVM.MCVersionNo = oTagDrugHeaderDetail.MCVersionNo;
            this.oSlotVM.AdminMethod = oTagDrugHeaderDetail.AdminMethod;
            this.oSlotVM.RouteOID = oTagDrugHeaderDetail.RouteOID;
            this.oSlotVM.IsControlledDrug = oTagDrugHeaderDetail.IsControlDrug;
            this.oSlotVM.IsFluidControlledDrug = oTagDrugHeaderDetail.IsFluidControlDrug;
            this.oSlotVM.LorenzoID = oTagDrugHeaderDetail.LorenzoID;
            this.oSlotVM.PrescriptionStartDate = oTagDrugHeaderDetail.StartDate;
            this.oSlotVM.DoseType = oTagDrugHeaderDetail.DoseType;
            this.oSlotVM.ScheduledDTTM = this.oTagSlotDetail.SlotDateTime;
            this.oSlotVM.DoseUOM = this.oTagSlotDetail.DoseUOM;
            this.oSlotVM.DoseUOMOID = this.oTagSlotDetail.DoseUOMOID;
            this.oSlotVM.DoseUOMLzoID = this.oTagSlotDetail.DoseUOMLzoID;
            this.oSlotVM.PresScheduleOID = this.oTagSlotDetail.SlotOID;
            this.oSlotVM.SlotsTimeIntervalAvg = oTagDrugHeaderDetail.SlotsTimeIntervalAvg;
            this.oSlotVM.PrescriptionItemStatus = oTagDrugHeaderDetail.PrescriptionItemStatus;
            this.oSlotVM.MultiRoute_Type = oTagDrugHeaderDetail.MultiRoute_Type;
            if (oTagDrugHeaderDetail.ReviewDTTM.NotEquals(DateTime.MinValue)) {
                this.oHdrRecordAdmin.ReviewAt = oTagDrugHeaderDetail.ReviewDTTM.ToUserDateTimeString(CConstants.DateTimeFormat);
                if (DateTime.LessThanOrEqualTo(oTagDrugHeaderDetail.ReviewDTTM.Date, CommonBB.GetServerDateTime().Date)) {
                    this.oHdrRecordAdmin.ReviewAtVisibility = Visibility.Visible;
                    this.oHdrRecordAdmin.ReviewIconTooltip = Common.GetReviewIconTooltip(oTagDrugHeaderDetail.ReviewType, oTagDrugHeaderDetail.ReviewDTTM, oTagDrugHeaderDetail.ReviewRequestedComments, oTagDrugHeaderDetail.ReviewRequestedby);
                }
            }
            this.oSlotVM.PrescriptionEndDate = oTagDrugHeaderDetail.EndDate;
            this.oSlotVM.FreqPerodCode = oTagDrugHeaderDetail.FreqPerodcode;
            this.oSlotVM.IsLastSlotinCurrentView = this.oTagSlotDetail.IsLastSlotInView;
            this.oSlotVM.CACode = MedAction.RecordAdministration;
            this.oSlotVM.IsParacetamolIngredient = oTagDrugHeaderDetail.IsParacetamolIngredient;
            this.IsLastSlotExist(this.oSlotVM);
            let oSlotHelper: SlotAdministrationHelper = new SlotAdministrationHelper();
            oSlotHelper.LaunchRecordAdminEvent = (s, e) => { this.oSlotHelper_LaunchRecordAdminEvent(s); };
            oSlotHelper.GetSlotDetails(this.oSlotVM);
        }
    }
    public IsLastSlotExist(oSlotDet: SlotDetailVM): void {
        oSlotDet.IsLastSlotCheckRequired = false;
        oSlotDet.IsUpdatePIStatusToCompleted = false;
        if (DateTime.NotEquals(oSlotDet.PrescriptionEndDate, DateTime.MinValue) || (!String.IsNullOrEmpty(oSlotDet.FreqPerodCode) && String.Equals(oSlotDet.FreqPerodCode, CConstants.OnceOnlyPerodCode, StringComparison.InvariantCultureIgnoreCase))) {
            if (oSlotDet.CACode == MedAction.RecordAdministration) {
                if (!String.Equals(oSlotDet.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) && !String.Equals(oSlotDet.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase)) {
                    if (oSlotDet.FreqPerodCode == CConstants.OnceOnlyPerodCode) {
                        oSlotDet.IsLastSlotCheckRequired = false;
                        oSlotDet.IsUpdatePIStatusToCompleted = true;
                    }
                    else if (String.Equals(oSlotDet.FreqPerodCode, CConstants.sWeeklyFreqUOMCode, StringComparison.InvariantCultureIgnoreCase) || String.Equals(oSlotDet.FreqPerodCode, CConstants.sMonthFreqUOMCode, StringComparison.InvariantCultureIgnoreCase) || String.Equals(oSlotDet.FreqPerodCode, CConstants.sYearsFreqUOMCode, StringComparison.InvariantCultureIgnoreCase)) {
                        oSlotDet.IsUpdatePIStatusToCompleted = true;
                        oSlotDet.IsLastSlotCheckRequired = true;
                    }
                    else {
                        if (oSlotDet.IsLastSlotinCurrentView == true) {
                            oSlotDet.IsUpdatePIStatusToCompleted = true;
                            oSlotDet.IsLastSlotCheckRequired = true;
                        }
                        else {
                            let AllSlots = this.ChklastandBeyondSlots(oSlotDet.ScheduledDTTM);
                            if (AllSlots != null && AllSlots.Count() > 0) {
                                oSlotDet.IsUpdatePIStatusToCompleted = false;
                                oSlotDet.IsLastSlotCheckRequired = false;
                            }
                            else {
                                oSlotDet.IsUpdatePIStatusToCompleted = true;
                                oSlotDet.IsLastSlotCheckRequired = true;
                            }
                        }
                    }
                }
            }
            else if (oSlotDet.CACode == MedAction.StrikethorughAdmin) {
                let oTempTagDrugHeaderDetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(this.oClickedSlotTagObject.oDrugItem.Tag, TagDrugHeaderDetail);
                let bAllowSelfAdminReActivate: boolean = true, bAllowPRNWithoutScheduleReActivate = true;
                if (oTempTagDrugHeaderDetail != null && oTempTagDrugHeaderDetail.IsPatientSelfAdmin && DateTime.NotEquals(oTempTagDrugHeaderDetail.EndDate, DateTime.MinValue) && DateTime.LessThan(oTempTagDrugHeaderDetail.EndDate, CommonBB.GetServerDateTime())) {
                    bAllowSelfAdminReActivate = false;
                }
                if (oTempTagDrugHeaderDetail.IsPRN && !oTempTagDrugHeaderDetail.IsPRNWithSchedule && DateTime.NotEquals(oTempTagDrugHeaderDetail.EndDate, DateTime.MinValue) && DateTime.LessThan(oTempTagDrugHeaderDetail.EndDate, CommonBB.GetServerDateTime())) {
                    bAllowPRNWithoutScheduleReActivate = false;
                }
                if (String.Equals(oSlotDet.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase) && bAllowSelfAdminReActivate && bAllowPRNWithoutScheduleReActivate) {
                    if (oSlotDet.FreqPerodCode == CConstants.OnceOnlyPerodCode) {
                        oSlotDet.IsUpdatePIStatusToCompleted = true;
                        oSlotDet.IsLastSlotCheckRequired = false;
                    }
                    else if (String.Equals(oSlotDet.FreqPerodCode, CConstants.sWeeklyFreqUOMCode, StringComparison.InvariantCultureIgnoreCase) || String.Equals(oSlotDet.FreqPerodCode, CConstants.sMonthFreqUOMCode, StringComparison.InvariantCultureIgnoreCase) || String.Equals(oSlotDet.FreqPerodCode, CConstants.sYearsFreqUOMCode, StringComparison.InvariantCultureIgnoreCase)) {
                        oSlotDet.IsUpdatePIStatusToCompleted = true;
                        oSlotDet.IsLastSlotCheckRequired = true;
                    }
                    else if (oSlotDet.IsLastSlotinCurrentView == true) {
                        oSlotDet.IsUpdatePIStatusToCompleted = true;
                        oSlotDet.IsLastSlotCheckRequired = true;
                    }
                    else {
                        let Allslts: ObservableCollection<IChartSlot> = new ObservableCollection<IChartSlot>();
                        let drug: IEnumerable<ChartRow> = this.MedicationChartControl.ChartRows.Where(drg => String.Compare(drg.Key.Split('-')[1], this.oClickedSlotTagObject.oDrugItem.Key) == 0);
                        drug.forEach(odrug => {
                            odrug.ChartCells.forEach(drugSlots => {
                                drugSlots.Slots.forEach(slot => {
                                    if (slot instanceof AdministratedSlot && !String.Equals((<TagSlotDetail>(<AdministratedSlot>slot).Tag).SlotStatus, SlotStatus.OMITTED, StringComparison.InvariantCultureIgnoreCase)
                                        && DateTime.GreaterThan((<TagSlotDetail>(<AdministratedSlot>slot).Tag).SlotDateTime,(oSlotDet.ScheduledDTTM))) {
                                        Allslts.Add(slot);
                                    }
                                });
                            });
                        });
                        if (Allslts != null && Allslts.Count > 0) {
                            oSlotDet.IsUpdatePIStatusToCompleted = false;
                            oSlotDet.IsLastSlotCheckRequired = false;
                        }
                        else {
                            oSlotDet.IsUpdatePIStatusToCompleted = true;
                            oSlotDet.IsLastSlotCheckRequired = true;
                        }
                    }
                }
            }
        }
    }
    public ChklastandBeyondSlots(ScheduleDttm: DateTime): IEnumerable<IChartSlot> {
        let AllSlots: ObservableCollection<IChartSlot> = new ObservableCollection<IChartSlot>();
        let drug: IEnumerable<ChartRow> = this.MedicationChartControl.ChartRows.Where(drg => String.Compare(drg.Key.Split('-')[1], this.oClickedSlotTagObject.oDrugItem.Key) == 0);
        drug.forEach(odrug => {
            odrug.ChartCells.forEach(drugSlots => {
                drugSlots.Slots.forEach(slot => {
                    if ((slot instanceof DefaultSlot) && DateTime.GreaterThan((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotDateTime,ScheduleDttm) &&
                        (
                            String.Equals((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus, SlotStatus.PLANNED, StringComparison.InvariantCultureIgnoreCase) ||
                            String.Equals((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus, SlotStatus.DUENOW, StringComparison.InvariantCultureIgnoreCase) ||
                            String.Equals((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus, SlotStatus.OVERDUE, StringComparison.InvariantCultureIgnoreCase) ||
                            String.Equals((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus, SlotStatus.NOTYETRECORDED, StringComparison.InvariantCultureIgnoreCase) ||
                            String.Equals((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus, SlotStatus.DEFERADMIN, StringComparison.InvariantCultureIgnoreCase) ||
                            String.Equals((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus, SlotStatus.DEFERDUENOW, StringComparison.InvariantCultureIgnoreCase) ||
                            String.Equals((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus, SlotStatus.DEFEROVERDUE, StringComparison.InvariantCultureIgnoreCase) ||
                            (String.Equals((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotStatus, SlotStatus.PATIENTSELFADMIN, StringComparison.InvariantCultureIgnoreCase) &&
                             DateTime.GreaterThan((<TagSlotDetail>(<DefaultSlot>slot).Tag).SlotDateTime,this.dtCurrentDateTime))
                        )) {
                        AllSlots.Add(slot);
                    }
                });
            });
        });
        return AllSlots.AsEnumerable();
    }
    oSlotHelper_LaunchRecordAdminEvent(objAdminDetail: AdministrationDetail): void {
        if (this.oSlotVM != null && this.oSlotVM.IsPICompOrDiscAndScheduleDTTMBeyondPIStopDTTM) {
            Busyindicator.SetStatusIdle("MedChart");
            this.IsActivityLaunchedInSlot = false;
            this.RefreshMedChart();
        }
        else {
            this.OpenRecordAdminScreen(objAdminDetail);
        }
    }
    private OpenRecordAdminScreen(objAdminDetail: AdministrationDetail): void {
        MedChartData.IsReloadChartReqFromReqMedCA = false;
        this.oMedsAdminRec = new MedsRecordAdminstrator();
        this.oMedsAdminRec.constructorImpl(this.oSlotVM);
        this.oMedsAdminRec.objDrugHeader = new DrugHeader();
        this.oMedsAdminRec.objDrugHeader.oDrugHeader = new CDrugHeader();
        this.oMedsAdminRec.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo = new DrugHeaderItem();
        this.oMedsAdminRec.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowFrequency = false;
        this.oMedsAdminRec.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowSite = false;
        this.oMedsAdminRec.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowAsrequired = false;
        this.oHdrRecordAdmin.SteppedDoseUOM = this.oSlotVM.DoseUOM;
        this.oHdrRecordAdmin.SteppedLowerDose = this.oSlotVM.LDose;
        this.oHdrRecordAdmin.SteppedUpperDose = this.oSlotVM.UDose;
        this.oHdrRecordAdmin.RecordAdminViewed = RecordAdminType.RecordAdmin;
        this.oMedsAdminRec.objDrugHeader.DataContext = Common.SetDrugHeaderContent(this.oClickedSlotTagObject.oDrugItem, this.oHdrRecordAdmin, this.oMedsAdminRec.objDrugHeader);
        this.oMedsAdminRec.objDrugHeader.oDrugHeader = this.oMedsAdminRec.objDrugHeader.DataContext;
        this.oMedsAdminRec.objAdminDetail = objAdminDetail;
        // ObjectHelper.stopFinishAndCancelEvent(true);
        objAdminDetail = null;
        this.oMedsAdminRec.OnRecAdminFinishEvent = (s) => { this.oMedsAdminRec_OnRecAdminFinishEvent(s); };
        this.oMedsAdminRec.onDialogClose = this.oMedsAdminRec_Closed;
        let Callback = (s, e) => {
            if (s != null && e != null) {
                this.oMedsAdminRec = s;
            }
        }
        
        let dialogWindowHeight = (window.devicePixelRatio == 1) ? 775:(775/window.devicePixelRatio) - 40; 
        AppActivity.OpenWindow("Record administration", this.oMedsAdminRec, (s) => { this.oMedsAdminRec_Closed(s); }, "Record administration", true, dialogWindowHeight, 450, false, WindowButtonType.OkCancel, null, null, null, Callback);
        this.IsActivityLaunchedInSlot = false;
    }

    getTootTip(SlotDateTime: DateTime, oSlotVM: SlotDetailVM, out1: (sHistoryToolTip: string) => void, out2: (sDiscrepancyReason: string) => void): string {
        let sHistoryToolTip: string;
        let sDiscrepancyReason: string;
        let sToolTip: string = String.Empty;
        let sDoseValue: string = String.Empty;
        sHistoryToolTip = String.Empty;
        sDiscrepancyReason = String.Empty;
        if (oSlotVM.AdministrationDetail != null) {
            if (String.Equals(oSlotVM.DoseType, DoseTypeCode.CONDITIONAL) && !oSlotVM.IsConditionalExists && !String.IsNullOrEmpty(oSlotVM.AdministrationDetail.Dose) && oSlotVM.AdministrationDetail.DoseUOMOID != null && !String.IsNullOrEmpty(oSlotVM.AdministrationDetail.DoseUOMOID.DisplayText)) {
                sDoseValue = oSlotVM.AdministrationDetail.Dose + " " + oSlotVM.AdministrationDetail.DoseUOMOID.DisplayText;
            }
            else if (!String.IsNullOrEmpty(oSlotVM.AdministrationDetail.Dose) && !String.IsNullOrEmpty(oSlotVM.AdministrationDetail.strDoseUOM)) {
                sDoseValue = oSlotVM.AdministrationDetail.Dose + " " + oSlotVM.AdministrationDetail.strDoseUOM;
            }
            else if (!String.IsNullOrEmpty(oSlotVM.AdministrationDetail.Dose)) {
                sDoseValue = oSlotVM.AdministrationDetail.Dose;
            }
            else if (!String.IsNullOrEmpty(oSlotVM.AdministrationDetail.Dose)) {
                sDoseValue = oSlotVM.AdministrationDetail.strDoseUOM;
            }
            sToolTip = this.oGetMedsChartData.CreateTooltipForRecordAdmin(oSlotVM, SlotDateTime, sDoseValue, (o1) => { sHistoryToolTip = o1; }, (o2) => { sDiscrepancyReason = o2; });
        }
        out1(sHistoryToolTip);
        out2(sDiscrepancyReason);
        return sToolTip;
    }
    oMedsAdminRec_OnRecAdminFinishEvent(params?: any): void {
        if (!this.oMedsAdminRec.DataContext) {
            this.oMedsAdminRec.DataContext = params.objVm;
        }
        let CDRegisterItemOID: number = 0;
        let bLaunchWizard: boolean = false;
        let sQuery: string = String.Empty;
        if (this.oMedsAdminRec != null) {
            let MedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
            if (MedAdminVM != null) {
                MedAdminVM.CumulativeParacetamol.GetCumulativeParacetamol();
            }
            if (this.oSlotVM != null && this.oSlotVM.IsPICompOrDiscAndScheduleDTTMBeyondPIStopDTTM) {
                this.RefreshMedChart();
            }
            else if (MedChartData.IsReloadChartReqFromReqMedCA) {
                this.RefreshMedChartForReqMedCA();
            }
            else {
                let _oSlotVM: SlotDetailVM = ObjectHelper.CreateType<SlotDetailVM>(this.oMedsAdminRec.DataContext, SlotDetailVM);
                if (_oSlotVM != null) {
                    if (_oSlotVM.Status == SlotStatus.PLANNED || _oSlotVM.Status == SlotStatus.DUENOW || _oSlotVM.Status == SlotStatus.OVERDUE || _oSlotVM.Status == SlotStatus.NOTYETRECORDED) {
                        if (this.oClickedSlotTagObject.oIChartSlot != null && this.oClickedSlotTagObject.oIChartSlot instanceof DefaultSlot && _oSlotVM.Status != null) {
                            let oDefaultSlot: DefaultSlot = ObjectHelper.CreateType<DefaultSlot>(this.oClickedSlotTagObject.oIChartSlot, DefaultSlot);
                            let oTagSlotDetail: TagSlotDetail = ObjectHelper.CreateType<TagSlotDetail>(oDefaultSlot.Tag, TagSlotDetail);
                            oDefaultSlot.SlotStatus = CommonBB.GetText(_oSlotVM.Status, ValueDomainValues.oSlotStatus);
                            if (_oSlotVM.Status == SlotStatus.OVERDUE) {
                                oDefaultSlot.StatusToolTip = "Drug overdue now - due at " + _oSlotVM.ScheduledDTTM.ToString(CConstants.ShortDateFormat) + " " + _oSlotVM.ScheduledDTTM.ToString(CConstants.Timeformat) + " hours";
                            }
                            else if (_oSlotVM.Status == SlotStatus.NOTYETRECORDED) {
                                oDefaultSlot.StatusToolTip = MedsAdminChartToolTip.AdminNotyetRecordToolTip + _oSlotVM.ScheduledDTTM.ToString(CConstants.ShortDateFormat) + " " + _oSlotVM.ScheduledDTTM.ToString(CConstants.Timeformat) + " hours";
                            }
                            else {
                                oDefaultSlot.StatusToolTip = MedsAdminChartToolTip.DueNowToolTip;
                            }
                            if (oTagSlotDetail != null) {
                                oTagSlotDetail.SlotStatus = _oSlotVM.Status;
                                oTagSlotDetail.AdminReasonCode = _oSlotVM.AdministrationDetail.ReasonForNotDefer != null && !String.IsNullOrEmpty(_oSlotVM.AdministrationDetail.ReasonForNotDefer.Value) ? _oSlotVM.AdministrationDetail.ReasonForNotDefer.Value : String.Empty;
                                oTagSlotDetail.Comments = String.Empty;
                                if (oTagSlotDetail.MedsAdminOID == 0) {
                                    oTagSlotDetail.MedsAdminOID = _oSlotVM.AdministrationDetail.MedAdminOID;
                                }
                            }
                            oDefaultSlot.AdministrationIcon = null;
                            this.MedicationChartControl.RefreshCell(this.oClickedSlotTagObject);
                        }
                    }
                    else if (_oSlotVM.Status == SlotStatus.HOMELEAVE) {
                        if (this.oClickedSlotTagObject.oIChartSlot != null && this.oClickedSlotTagObject.oIChartSlot instanceof DefaultSlot && _oSlotVM.Status != null) {
                            let oDefaultSlot: DefaultSlot = ObjectHelper.CreateType<DefaultSlot>(this.oClickedSlotTagObject.oIChartSlot, DefaultSlot);
                            let oTagSlotDtl: TagSlotDetail = ObjectHelper.CreateType<TagSlotDetail>(oDefaultSlot.Tag, TagSlotDetail);
                            oDefaultSlot.SlotStatus = String.Empty;
                            oDefaultSlot.StatusToolTip = String.Empty;
                            if (oTagSlotDtl != null) {
                                oTagSlotDtl.SlotStatus = _oSlotVM.Status;
                                oTagSlotDtl.Comments = String.Empty;
                            }
                            oDefaultSlot.BackGroundColor = Common.SetSlotColor(_oSlotVM.Status, false);
                            this.oClickedSlotTagObject.oIChartSlot = oDefaultSlot;
                        }
                    }
                    else if (_oSlotVM.Status == SlotStatus.DEFERDUENOW || _oSlotVM.Status == SlotStatus.DEFEROVERDUE) {
                        if (this.oClickedSlotTagObject != null && this.oClickedSlotTagObject.oIChartSlot != null) {
                            let sAdminComments: string = _oSlotVM.AdministrationDetail != null ? _oSlotVM.AdministrationDetail.AdminComments : String.Empty;
                            for (let i: number = 0; i < this.oClickedSlotTagObject.oChartCell.Slots.Count; i++) {
                                if (this.oClickedSlotTagObject.oChartCell.Slots[i] instanceof DefaultSlot) {
                                    let sStatus: string = (<DefaultSlot>this.oClickedSlotTagObject.oChartCell.Slots[i]).SlotStatus;
                                    if (sStatus == SlotStatusText.DEFERRED) {
                                        let oDefaultSlot: DefaultSlot = <DefaultSlot>this.oClickedSlotTagObject.oChartCell.Slots[i];
                                        let oTagSlotDetail: TagSlotDetail = ObjectHelper.CreateType<TagSlotDetail>(oDefaultSlot.Tag, TagSlotDetail);
                                        let sToolTip: string = MedsAdminChartToolTip.NotGivenStatusToolTip + "\n";
                                        if (!String.IsNullOrEmpty(oTagSlotDetail.AdminReasonCode))
                                            sToolTip += MedsAdminChartToolTip.ReasonToolTip + ": " + CommonBB.GetText(oTagSlotDetail.AdminReasonCode, ValueDomainValues.oRecordAdminReasons) + "\n";
                                        if (!String.IsNullOrEmpty(oTagSlotDetail.SlotDateTime.ToString()))
                                            sToolTip += MedsAdminChartToolTip.DueAtTooltip + ": " + oTagSlotDetail.SlotDateTime.ToString("dd-MMM-yyyy HH:mm") + "\n";
                                        if (!String.IsNullOrEmpty(oDefaultSlot.Time.ToString(CConstants.Timeformat)))
                                            sToolTip += MedsAdminChartToolTip.RecordedAtToolTip + ": " + oDefaultSlot.Time + "\n";
                                        let sStatusToolTip: string = String.Empty;
                                        if (typeof oDefaultSlot.StatusToolTip === "string")
                                            sStatusToolTip = ObjectHelper.CreateType<string>(oDefaultSlot.StatusToolTip, 'string');
                                        else if (oDefaultSlot.StatusToolTip instanceof StackPanel) {
                                            let oStackPanel: StackPanel = ObjectHelper.CreateType<StackPanel>(oDefaultSlot.StatusToolTip, StackPanel);
                                            if (oStackPanel.Children.Count > 0) {
                                                let objLabel: iLabel = ObjectHelper.CreateType<iLabel>(oStackPanel.Children[0], iLabel);
                                                if (objLabel != null)
                                                    sStatusToolTip = objLabel.Text;
                                            }
                                        }
                                        if (!String.IsNullOrEmpty(sStatusToolTip)) {
                                            let arrtooltip: string[] = sStatusToolTip.Split('\n');
                                            if (arrtooltip.Count() > 0) {
                                                for (let idx: number = 0; idx < arrtooltip.Count(); idx++) {
                                                    if (arrtooltip[idx].Contains("Deferred by:")) {
                                                        let arrStatus: string[] = arrtooltip[idx].Split(':');
                                                        if (arrStatus.Count() > 0) {
                                                            sToolTip += MedsAdminChartToolTip.RecordedByToolTip + ": " + arrStatus[1].Trim();
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        let oAdministratedSlot: AdministratedSlot = new AdministratedSlot();
                                        oAdministratedSlot.StatusIcon = ObjectHelper.CreateObject(new ChartIcon(), { Key: SlotStatus.NOTGIVEN, UriString: MedImage.GetPath(MedImages.NotGivenSlotIcon) });
                                        if (ValueDomainValues.oReasonForNotGiven != null && ValueDomainValues.oReasonForNotGiven.Count() > 0 && oTagSlotDetail != null) {
                                            oAdministratedSlot.ReasonForNotGiven = !String.IsNullOrEmpty(oTagSlotDetail.AdminReasonCode) ? ValueDomainValues.oReasonForNotGiven.FirstOrDefault(a => a.Key == oTagSlotDetail.AdminReasonCode).Value.ToString() : String.Empty;
                                            oAdministratedSlot.ReasonToolTip = MedsAdminChartToolTip.ReasonToolTip + ": " + CommonBB.GetText(oTagSlotDetail.AdminReasonCode, ValueDomainValues.oRecordAdminReasons);
                                            oAdministratedSlot.ReasonToolTip += !String.IsNullOrEmpty(oTagSlotDetail.Comments) ? "\n" + MedsAdminChartToolTip.CommentsToolTip + ": " + oTagSlotDetail.Comments : String.Empty;
                                            oAdministratedSlot.ReasonFontSize = CConstants.Thirteen;
                                        }
                                        if (!String.IsNullOrEmpty(sAdminComments)) {
                                            oAdministratedSlot.StatusToolTip = Common.GetWrappedToolTipContent(sToolTip, sAdminComments);
                                            oAdministratedSlot.AdministrationIcon = Common.GetAdminCommentsIcon(MedsAdminChartToolTip.CommentsToolTip + ": " + sAdminComments);
                                        }
                                        else {
                                            oAdministratedSlot.StatusToolTip = sToolTip;
                                            oAdministratedSlot.AdministrationIcon = null;
                                        }
                                        oAdministratedSlot.Tag = oTagSlotDetail;
                                        oAdministratedSlot.Time = oDefaultSlot.Time;
                                        if (!String.IsNullOrEmpty(oDefaultSlot.Key)) {
                                            let temp: string[] = oDefaultSlot.Key.Split('-');
                                            if (temp.Count() > 0) {
                                                oAdministratedSlot.Key = "AdminSlot-" + temp[1];
                                                this.oClickedSlotTagObject.oChartCell.Slots[i].Key = oAdministratedSlot.Key;
                                            }
                                        }
                                        this.oClickedSlotTagObject.oChartCell.Slots[i] = oAdministratedSlot;
                                        break;
                                    }
                                }
                            }
                            if (this.oClickedSlotTagObject.oIChartSlot instanceof DefaultSlot) {
                                let sDoseValue: string = String.Empty;
                                let sToolTip: string = String.Empty;
                                let sHistoryToolTip: string = String.Empty;
                                let sDiscrepancyReason: string = String.Empty;
                                let oDefaultSlot: DefaultSlot = <DefaultSlot>this.oClickedSlotTagObject.oIChartSlot;
                                oDefaultSlot.SlotStatus = SlotStatusText.DEFERRED;
                                if (!String.IsNullOrEmpty(this.sPreviousSlotStatus) && String.Equals(this.sPreviousSlotStatus, SlotStatus.HOMELEAVE, StringComparison.InvariantCultureIgnoreCase)) {
                                    oDefaultSlot.BackGroundColor = Common.SetSlotColor(_oSlotVM.Status, false);
                                }
                                if (_oSlotVM.AdministrationDetail != null) {
                                    sToolTip = this.getTootTip(oDefaultSlot.Time, _oSlotVM, (o1) => { sHistoryToolTip = o1; }, (o2) => { sDiscrepancyReason = o2; });
                                    if (!String.IsNullOrEmpty(sToolTip)) {
                                        if (!String.IsNullOrEmpty(sAdminComments)) {
                                            oDefaultSlot.StatusToolTip = Common.GetWrappedToolTipContent(sToolTip, sAdminComments);
                                            oDefaultSlot.AdministrationIcon = Common.GetAdminCommentsIcon(MedsAdminChartToolTip.CommentsToolTip + ": " + sAdminComments);
                                        }
                                        else {
                                            oDefaultSlot.AdministrationIcon = null;
                                            oDefaultSlot.StatusToolTip = sToolTip;
                                        }
                                    }
                                }
                                if (oDefaultSlot.Tag != null) {
                                    (<TagSlotDetail>oDefaultSlot.Tag).SlotStatus = _oSlotVM.Status;
                                    (<TagSlotDetail>oDefaultSlot.Tag).AdminReasonCode = _oSlotVM.AdministrationDetail.ReasonForNotDefer.Value;
                                    (<TagSlotDetail>oDefaultSlot.Tag).IsDuringHomeLeave = _oSlotVM.AdministrationDetail.IsDuringHomeLeave;
                                    (<TagSlotDetail>oDefaultSlot.Tag).Comments = _oSlotVM.AdministrationDetail.AdminComments;
                                    if ((<TagSlotDetail>oDefaultSlot.Tag).MedsAdminOID == 0) {
                                        (<TagSlotDetail>oDefaultSlot.Tag).MedsAdminOID = _oSlotVM.AdministrationDetail.MedAdminOID;
                                    }
                                }
                                this.oClickedSlotTagObject.oIChartSlot = oDefaultSlot;
                            }
                            this.MedicationChartControl.RefreshCell(this.oClickedSlotTagObject);
                        }
                    }
                    else {
                        this.RefreshCreateAdminSlot(_oSlotVM);
                    }
                    if (!String.IsNullOrEmpty(this.sPreviousSlotStatus) && !String.IsNullOrEmpty(_oSlotVM.Status) && _oSlotVM.PrescriptionItemOID > 0 && MedChartData.ListOfEventsWithNotKnownStatus != null) {
                        let ToCheckPrescItem = MedChartData.ListOfEventsWithNotKnownStatus.Where(c => c != null && c.PrescriptionItemOID == _oSlotVM.PrescriptionItemOID).FirstOrDefault();
                        if (ToCheckPrescItem == null) {
                            let oEventsWithNotKnownStatus: EventsWithNotKnownStatus = new EventsWithNotKnownStatus(_oSlotVM.PrescriptionItemOID, 0, String.Empty);
                            MedChartData.ListOfEventsWithNotKnownStatus.Add(oEventsWithNotKnownStatus);
                        }
                        GetMedsChartData.UpdateOverviewIcon(this.sPreviousSlotStatus, _oSlotVM.Status, _oSlotVM.PrescriptionItemOID, this);
                    }
                    CDRegisterItemOID = _oSlotVM.CDWardRegItemOID;
                    if (_oSlotVM.Status == SlotStatus.GIVEN || _oSlotVM.Status == SlotStatus.SELFADMINISTERED) {
                        let sMenuCode: string = PrescriptionTypesMenuCode.CDTransaction;
                        if (_oSlotVM.CDWardRegItemOID > 0 || _oSlotVM.CDPatientRegItemOID > 0) {
                            sQuery = "&MenuCode=" + sMenuCode;
                            sQuery += "&IsLaunchFromChart=True";
                            sQuery += "&IsWard=1";
                            sQuery += "&DrugName=" + _oSlotVM.DrugDetail.Drugname;
                        }
                        if (_oSlotVM.CDWardRegItemOID > 0 && (_oSlotVM.AdministrableQtyView == null || _oSlotVM.AdministrableQtyView.WardStockQuantityToAdmin == 0 && _oSlotVM.AdministrableQtyView.PatientStockQuantityToAdmin == 0 && !_oSlotVM.AdministrableQtyView.IsUpdateStockRegister)) {
                            sQuery += "&RegisterItemOID=" + CDRegisterItemOID;
                            sQuery += "&RecordAdminDTTM=" + _oSlotVM.AdministrationDetail.AdministeredDateTime;
                            sQuery += "&DefaultUserName=" + _oSlotVM.AdministrationDetail.AdministeredBy;
                            sQuery += "&DefaultUserOID=" + _oSlotVM.AdministrationDetail.AdministeredByOID;
                            sQuery += "&WitnessByName=" + _oSlotVM.AdministrationDetail.WitnessBy;
                            sQuery += "&WitnessByOID=" + _oSlotVM.AdministrationDetail.WitnessByOID;
                            sQuery += "&sPatientOID=" + _oSlotVM.PatientOID;
                            sQuery += "&PatientName=" + _oSlotVM.PatientName;
                            sQuery += "&PatientID=" + _oSlotVM.PatientPASID;
                            sQuery += "&UOM=" + _oSlotVM.AdministrationDetail.strDoseUOM;
                            sQuery += "&MedAdminOID=" + _oSlotVM.AdministrationDetail.MedAdminOID;
                        }
                        else if (_oSlotVM.AdministrableQtyView != null) {
                            if ((_oSlotVM.CDWardRegItemOID > 0 || _oSlotVM.CDPatientRegItemOID > 0) && (_oSlotVM.AdministrableQtyView.WardStockQuantityToAdmin > 0 || _oSlotVM.AdministrableQtyView.PatientStockQuantityToAdmin > 0)) {
                                bLaunchWizard = true;
                                if (_oSlotVM.AdministrableQtyView.IsUpdateStockRegister) {
                                    if (_oSlotVM.AdministrableQtyView.WardStockQuantityToAdmin > 0) {
                                        sQuery += "&RegisterItemOID=" + _oSlotVM.CDWardRegItemOID;
                                        sQuery += "&BarCodeScan=True";
                                        this.oMedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
                                        this.oMedicationAdminVM.sLastCACode = sMenuCode;
                                        this.oMedicationAdminVM.LaunchWizard(sMenuCode, sQuery);
                                    }
                                    if (_oSlotVM.AdministrableQtyView.PatientStockQuantityToAdmin > 0) {
                                        sQuery += "&RegisterItemOID=" + _oSlotVM.CDPatientRegItemOID;
                                        sQuery += "&BarCodeScan=True";
                                        this.oMedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
                                        this.oMedicationAdminVM.sLastCACode = sMenuCode;
                                        this.oMedicationAdminVM.LaunchWizard(sMenuCode, sQuery);
                                    }
                                }
                            }
                        }
                    }
                    else {
                        bLaunchWizard = true;
                    }
                }
            }
        }
        this.oMedsAdminRec.dupDialogRef.close();
        Busyindicator.SetStatusIdle("MedChart");
        Busyindicator.SetStatusIdle("Administration");
        this.IsActivityLaunchedInSlot = false;
        if (CDRegisterItemOID > 0 && !bLaunchWizard) {
            if (sQuery.Contains("RegisterItemOID")) {
                let sMenuCode: string = PrescriptionTypesMenuCode.CDTransaction;
                this.oMedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
                this.oMedicationAdminVM.sLastCACode = sMenuCode;
                this.oMedicationAdminVM.LaunchWizard(sMenuCode, sQuery);
            }
        }
    }
    oMedsAdminRec_Closed(args: AppDialogEventargs): void {
        if (args != null && args.Content != null) {
            this.oMedsAdminRec = args.Content.Component;
            this.oSlotVM = ObjectHelper.CreateType<SlotDetailVM>(this.oMedsAdminRec.objslotVM, SlotDetailVM);
            this.IsActivityLaunchedInSlot = false;
            if (this.oSlotVM != null && !this.oSlotVM.IsSubmitInProgress) {
                if (this.oMedsAdminRec != null && args.Result == AppDialogResult.Ok) {
                    //if (!Common.CheckIfLockingDurationElapsed(this.oMsgBox_RecAdminClose)) 
                    if (!Common.CheckIfLockingDurationElapsed((o, e) => ((sender: any, e: MessageEventArgs) => { this.oMsgBox_RecAdminClose(o, e) }))) {
                        this.oSlotVM.IsSubmitInProgress = true;
                        Busyindicator.SetStatusBusy("Administration", true);
                        this.oMedsAdminRec.cmdOk_Click(true);
                    }
                }
                else if (args.Result == AppDialogResult.Cancel) {
                    // ObjectHelper.stopFinishAndCancelEvent(false);
                    Busyindicator.SetStatusIdle("MedChart");
                    this.oMedsAdminRec.dupDialogRef.close();
                    this.RefreshMedChartForReqMedCA();
                }
            }
        }
    }
    oMsgBox_RecAdminClose(sender: Object, e: MessageEventArgs): void {
        this.oMedsAdminRec.dupDialogRef.close();
    }
    public RefreshMedChartForReqMedCA(): void {
        if (MedChartData.IsReloadChartReqFromReqMedCA) {
            this.MedicationChartControl.ChartRows = null;
            this.MedicationChartControl.NoRecordsDisplayText = "Loading";
            this.lblOverdueNumber.Text = String.Empty;
            this.lblDueNumber.Text = String.Empty;
            this.lblAsRequiredNumber.Text = String.Empty;
            MedChartData.PatinetInfo = Common.GetPatientInfo();
            this.LoadMedicationChart();
        }
    }
    UpdateChartSummaryBar(sSlotStatus: string, nAdminCount: number): void {
        let nCount: number = 0;
        if (String.Compare(sSlotStatus, SlotStatus.OVERDUE, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(sSlotStatus, SlotStatus.DEFEROVERDUE, StringComparison.CurrentCultureIgnoreCase) == 0) {
            if (!String.IsNullOrEmpty(this.lblOverdueNumber.Text)) {
                nCount = Convert.ToInt32(this.lblOverdueNumber.Text) - nAdminCount;
                this.lblOverdueNumber.Text = (nCount >= 0) ? nCount.ToString() : "0";
            }
        }
        else if (String.Compare(sSlotStatus, SlotStatus.DUENOW, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(sSlotStatus, SlotStatus.DEFERDUENOW, StringComparison.CurrentCultureIgnoreCase) == 0) {
            if (!String.IsNullOrEmpty(this.lblDueNumber.Text)) {
                nCount = Convert.ToInt32(this.lblDueNumber.Text) - nAdminCount;
                this.lblDueNumber.Text = (nCount >= 0) ? nCount.ToString() : "0";
            }
        }
    }
    private UpdateDueSummary(nOldValue: number, nNewValue: number): void {
        let nCount: number = 0;
        if (nOldValue > nNewValue) {
            if (!String.IsNullOrEmpty(this.lblDueNumber.Text)) {
                let dDiffCount: number = nOldValue - nNewValue;
                nCount = Convert.ToInt32(this.lblDueNumber.Text) - dDiffCount;
                this.lblDueNumber.Text = (nCount >= 0) ? nCount.ToString() : "0";
            }
        }
        else if (nOldValue < nNewValue) {
            if (!String.IsNullOrEmpty(this.lblDueNumber.Text)) {
                let dDiffCount: number = nNewValue - nOldValue;
                nCount = Convert.ToInt32(this.lblDueNumber.Text) + dDiffCount;
                this.lblDueNumber.Text = (nCount >= 0) ? nCount.ToString() : "0";
            }
        }
    }
    private UpdateOverdueSummary(nOldValue: number, nNewValue: number): void {
        let nCount: number = 0;
        if (nOldValue > nNewValue) {
            if (!String.IsNullOrEmpty(this.lblOverdueNumber.Text)) {
                let dDiffCount: number = nOldValue - nNewValue;
                nCount = Convert.ToInt32(this.lblOverdueNumber.Text) - dDiffCount;
                this.lblOverdueNumber.Text = (nCount >= 0) ? nCount.ToString() : "0";
            }
        }
        else if (nOldValue < nNewValue) {
            if (!String.IsNullOrEmpty(this.lblOverdueNumber.Text)) {
                let dDiffCount: number = nNewValue - nOldValue;
                nCount = Convert.ToInt32(this.lblOverdueNumber.Text) + dDiffCount;
                this.lblOverdueNumber.Text = (nCount >= 0) ? nCount.ToString() : "0";
            }
        }
    }
    LaunchPRNSlot(TagObject: TagObject): void {
        // ObjectHelper.stopFinishAndCancelEvent(true);
        MedChartData.IsReloadChartReqFromReqMedCA = false;
        let oMedsAdminVM: MedsAdminMultiSlotVM = new MedsAdminMultiSlotVM();
        oMedsAdminVM.CurrentDateTime = this.dtCurrentDateTime;
        oMedsAdminVM.MedchartOID = MedChartData.MedChartOID;
        oMedsAdminVM.PrescriptionItemOID = Convert.ToInt64(TagObject.oDrugItem.Key);
        oMedsAdminVM.DrugDetail = TagObject.oDrugItem;
        let MedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
        if (MedAdminVM != null && MedAdminVM.CumulativeParacetamol.ParacetamolAdministeredCount.HasValue) {
            oMedsAdminVM.ParacetamolAdminCount = MedAdminVM.CumulativeParacetamol.ParacetamolAdministeredCount.Value;
        }
        let oDrugTag: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(TagObject.oDrugItem.Tag, TagDrugHeaderDetail);
        if (oDrugTag != null) {
            oMedsAdminVM.IsParacetamolIngredient = oDrugTag.IsParacetamolIngredient;
        }
        //let oMedsAdminPRN: MedsAdminPRNSlot = new MedsAdminPRNSlot();
        this.oMedsAdminPRN = new MedsAdminPRNSlot();
        //let oAddnlInfo: CDrugHdrAddnlInfo = null;       
        this.oAddnlInfo = new CDrugHdrAddnlInfo();
        if (!String.IsNullOrEmpty(TagObject.oDrugItem.AdminWarningMessage))
            this.oAddnlInfo = ObjectHelper.CreateObject(new CDrugHdrAddnlInfo(), { IngredientAdminWarning: TagObject.oDrugItem.AdminWarningMessage });
        this.oMedsAdminPRN.drgHeader = new DrugHeader();
        this.oMedsAdminPRN.drgHeader.oDrugHeader = new CDrugHeader();
        this.oMedsAdminPRN.drgHeader.oDrugHeader.oDrugHdrBasicInfo = new DrugHeaderItem();
        this.oMedsAdminPRN.drgHeader.oDrugHeader.oDrugHdrBasicInfo.bShowFrequency = true;
        this.oMedsAdminPRN.drgHeader.oDrugHeader.oDrugHdrBasicInfo.bShowSite = true;
        this.oMedsAdminPRN.drgHeader.oDrugHeader.oDrugHdrBasicInfo.bShowAsrequired = true;
        if (this.oAddnlInfo == null)
            this.oAddnlInfo = new CDrugHdrAddnlInfo();
        this.oAddnlInfo.RecordAdminViewed = RecordAdminType.RecordAdmin;
        if (oDrugTag != null && DateTime.NotEquals(oDrugTag.ReviewDTTM, DateTime.MinValue)) {
            this.oAddnlInfo.ReviewAt = oDrugTag.ReviewDTTM.ToUserDateTimeString(CConstants.DateTimeFormat);
            if (DateTime.LessThanOrEqualTo(oDrugTag.ReviewDTTM.Date, CommonBB.GetServerDateTime().Date)) {
                this.oAddnlInfo.ReviewAtVisibility = Visibility.Visible;
                this.oAddnlInfo.ReviewIconTooltip = Common.GetReviewIconTooltip(oDrugTag.ReviewType, oDrugTag.ReviewDTTM, oDrugTag.ReviewRequestedComments, oDrugTag.ReviewRequestedby);
            }
        }
        this.oMedsAdminPRN.drgHeader.DataContext = Common.SetDrugHeaderContent(TagObject.oDrugItem, this.oAddnlInfo, this.oMedsAdminPRN.drgHeader);
        this.oMedsAdminPRN.drgHeader.lblInstructions.Visibility = Visibility.Visible;
        this.oMedsAdminPRN.DataContext = oMedsAdminVM;
        this.oMedsAdminPRN.IsDiscontinued = String.Compare(TagObject.oDrugItem.PrescriptionStatus, "Discontinued", StringComparison.CurrentCultureIgnoreCase) == 0 ? true : false;
        if (TagObject.oDrugItem.AdminPRNIcon2 != null)
            this.oMedsAdminPRN.IsPatientSelfAdmin = (String.Compare(TagObject.oDrugItem.AdminPRNIcon2.Key, CConstants.SelfAdminText) == 0);
        else this.oMedsAdminPRN.IsPatientSelfAdmin = false;
        oMedsAdminVM.SlotDate = Convert.ToDateTime(TagObject.oChartColumn.Caption);
        //oMedsAdminVM.SlotDate = this.dtCurrentDateTime;
        // let dtResult: DateTime = DateTime.MinValue;
        // let oFormat: IFormatProvider = new CultureInfo('en-GB');       
        // DateTime.TryParseExact(this.CurrentSlotDate, MedsAdminChartView.sDateFormat, oFormat, DateTimeStyles.None, (o) => { dtResult = o; });
        // oMedsAdminVM.SlotDate = dtResult;
        oMedsAdminVM.IsPRN = true;
        this.oTagSlotDetail = <TagSlotDetail>(<AsRequiredSlot>TagObject.oIChartSlot).Tag;
        oMedsAdminVM.IsNextPRNAllow = this.oTagSlotDetail.IsNextDoseAllowedForPRN;
        oMedsAdminVM.MinimumTime = this.oTagSlotDetail.MinimumIntervalForPRN;
        oMedsAdminVM.LastRecordedAtForPRN = this.oTagSlotDetail.LastAdministeredAtForPRN;
        this.oMedsAdminPRN.onDialogClose = this.oMedsAdminPRN_Closed;
        let dCurrSvradate: DateTime = CommonBB.GetServerDateTime();
        if (DateTime.LessThanOrEqualTo(oMedsAdminVM.SlotDate.Date, dCurrSvradate.Date)) {
            //let dtOpenSlotDate = dtResult.ToString(CConstants.ShortDateFormat);
            let Callback = (s, e) => {
                if (s != null && e != null) {
                    this.oMedsAdminPRN = s;
                }
            }
            //ObjectHelper.DoubleOpenWindowMode = true;
            if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
                AppActivity.OpenWindow(TagObject.oChartColumn.Caption, this.oMedsAdminPRN, (s) => { this.oMedsAdminPRN_Closed(s); }, "", false, 470, 462, false, WindowButtonType.Close, null, null, null, Callback);
            }else{
                AppActivity.OpenWindow(TagObject.oChartColumn.Caption, this.oMedsAdminPRN, (s) => { this.oMedsAdminPRN_Closed(s); }, "", false, 550, 462, false, WindowButtonType.Close, null, null, null, Callback);
            }
            this.IsActivityLaunchedInSlot = false;
        }
        else {
            Busyindicator.SetStatusIdle("MedChart");
            this.IsActivityLaunchedInSlot = false;
            // ObjectHelper.stopFinishAndCancelEvent(false);
        }
    }
    oMedsAdminPRN_Closed(args: AppDialogEventargs): void {
        Busyindicator.SetStatusIdle("MedChart");
        let oPRNSlotDetail: TodayAsRequiredSlot = null;
        let oTagSlotDetail: TagSlotDetail;
        let dtLastGiven: DateTime;
        let dtNextDue: DateTime;
        let dtPreSlot: DateTime;
        let dtCurSlot: DateTime;
        this.oChildWindow = args.AppChildWindow;
        let oMedsAdminPRNSlot: MedsAdminPRNSlot = ObjectHelper.CreateType<MedsAdminPRNSlot>(args.Content.Component, MedsAdminPRNSlot);
        let _ErrorID: number = 80000085;
        let _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:medsadminchartview.xaml.cs, Method:oMedsAdminPRN_Closed()";
        //ObjectHelper.DoubleOpenWindowMode = false;
        try {
            if (oMedsAdminPRNSlot != null) {
                if (oMedsAdminPRNSlot.oMedsAdminSlotVM != null) {
                    if (oMedsAdminPRNSlot.oMedsAdminSlotVM.IsParacetamolIngredient) {
                        let MedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
                        if (MedAdminVM != null) {
                            MedAdminVM.CumulativeParacetamol.ParacetamolAdministeredCount = oMedsAdminPRNSlot.oMedsAdminSlotVM.ParacetamolAdminCount;
                        }
                    }
                    let oMultiSlotVM: ObservableCollection<SlotDetailVM> = ObjectHelper.CreateType<ObservableCollection<SlotDetailVM>>(oMedsAdminPRNSlot.oMedsAdminSlotVM.MultiSlot, ObservableCollection<SlotDetailVM>);
                    if (oMultiSlotVM != null && oMultiSlotVM.Count > 0 && this.oClickedSlotTagObject != null) {
                        if (oMedsAdminPRNSlot.oMedsAdminSlotVM.IsPICompOrDiscAndScheduleDTTMBeyondPIStopDTTM) {
                            Busyindicator.SetStatusIdle("MedChart");
                            this.RefreshMedChart();
                        }
                        else if (!MedChartData.IsReloadChartReqFromReqMedCA) {
                            if (this.oClickedSlotTagObject.oDrugItem != null) {
                                let oTagDrugHeaderDetail: TagDrugHeaderDetail = <TagDrugHeaderDetail>(this.oClickedSlotTagObject.oDrugItem).Tag;
                                if (oTagDrugHeaderDetail != null) {
                                    if (oTagDrugHeaderDetail.PrescriptionItemStatus == CConstants.DISCONTINUED || oTagDrugHeaderDetail.PrescriptionItemStatus == CConstants.CANCELLED) {
                                        this.oGetMedsChartData.IsGreyedOut = true;
                                    }
                                    else {
                                        this.oGetMedsChartData.IsGreyedOut = false;
                                    }
                                }
                            }
                            if (this.oClickedSlotTagObject.oIChartSlot != null && this.oClickedSlotTagObject.oIChartSlot instanceof TodayAsRequiredSlot) {
                                let oPRNMultiSlotRow = this.MedicationChartControl.ChartRows.Where(oPRNRow => oPRNRow.Key.Split('-')[1] == this.oClickedSlotTagObject.oDrugItem.Key).Select(oPRNRow => oPRNRow);
                                if (oPRNMultiSlotRow != null) {
                                    let oGroupedListMultiSlotVM = oMultiSlotVM.Where(oPRNSlotVM => oPRNSlotVM.AdministrationDetail != null).GroupBy((oPRNSlotVM) => oPRNSlotVM.AdministrationDetail.AdministeredDate.DateTime).OrderBy((OrderedMultiSlotVM) => OrderedMultiSlotVM.Key).Select(OrderedMultiSlotVM => OrderedMultiSlotVM);
                                    if (oGroupedListMultiSlotVM != null && oGroupedListMultiSlotVM.Count() > 0) {
                                        oGroupedListMultiSlotVM.forEach((oGroupMultiSlotVM) => {
                                            let groupSlotDate: DateTime = new DateTime(oGroupMultiSlotVM.key);
                                            let list = this.MedicationChartControl.ChartColumns.Where((colIndx) => (colIndx.Caption == groupSlotDate.ToString("dd-MMM-yyyy"))).Select(colIndx => colIndx.Index);
                                            let colIndex = list.Count() < 1 ? -1 : list[0];
                                            let SlotsColl = oPRNMultiSlotRow.First().ChartCells.Where(slotColls => slotColls.ColIndex == colIndex);

                                            if (SlotsColl != null) {
                                                if (SlotsColl.Count() > 0)
                                                    oPRNSlotDetail = ObjectHelper.CreateType<TodayAsRequiredSlot>(SlotsColl.First().Slots[0], TodayAsRequiredSlot);
                                                if (oPRNSlotDetail != null) {
                                                    let lstCollSlotDetailVM: ObservableCollection<SlotDetailVM> = new ObservableCollection<SlotDetailVM>(oGroupMultiSlotVM.OrderBy(oItem => oItem.AdministrationDetail.AdministeredDate));
                                                    dtLastGiven = this.oGetMedsChartData.GetLastGivenAt(lstCollSlotDetailVM);
                                                    dtNextDue = this.oGetMedsChartData.GetNextDueAt(lstCollSlotDetailVM);
                                                    dtCurSlot = oMedsAdminPRNSlot.oMedsAdminSlotVM.SlotDate;
                                                    dtPreSlot = Convert.ToDateTime(groupSlotDate.ToString("dd-MMM-yyyy"));
                                                    if (DateTime.NotEquals(dtLastGiven, DateTime.MinValue)) {
                                                        oPRNSlotDetail.LastGivenTime = MedsAdminChartToolTip.PRNGivenatToolTip + dtLastGiven.ToUserDateTimeString(CConstants.Timeformat);
                                                    }
                                                    else {
                                                        oPRNSlotDetail.LastGivenTime = "";
                                                    }
                                                    let sOverDueStatus: string = String.Empty;
                                                    let sDueStatus: string = String.Empty;
                                                    let sMultiSlotNetYetRecStatus: string = String.Empty;
                                                    let nMultiSlotDueCount: number = 0;
                                                    let nMultiSlotOverdueCount: number = 0;
                                                    let oAdminSummaryList: ObservableCollection<ChartStringIcon> = this.oGetMedsChartData.CreateAdminSummary(Convert.ToInt64(this.oClickedSlotTagObject.oDrugItem.Key), Number.Parse(groupSlotDate.ToString("dd")), lstCollSlotDetailVM, true, (o1) => { sOverDueStatus = o1; }, (o2) => { sDueStatus = o2; }, (o3) => { sMultiSlotNetYetRecStatus = o3; }, (o4) => { nMultiSlotDueCount = o4; }, (o5) => { nMultiSlotOverdueCount = o5; });
                                                    if (this.oGetMedsChartData.IsGreyedOut) {
                                                        oPRNSlotDetail.BackGroundColor = new SolidColorBrush(Colors.Grey);
                                                    }
                                                    else if (this.oTagDrugHeaderDetail != null && this.oTagDrugHeaderDetail.IsPRN && !(this.oTagDrugHeaderDetail.PrescriptionItemStatus == CConstants.DISCONTINUED || this.oTagDrugHeaderDetail.PrescriptionItemStatus == CConstants.COMPLETED || this.oTagDrugHeaderDetail.PrescriptionItemStatus == CConstants.CANCELLED)) {
                                                        oPRNSlotDetail.BackGroundColor = new SolidColorBrush(MedChartData.AsRequiredSlotsColor);
                                                    }
                                                    if (DateTime.NotEquals(dtCurSlot, dtPreSlot)) {
                                                        let objChartStringIcon: ObservableCollection<ChartStringIcon> = oPRNSlotDetail.AdminSummary;
                                                        let objChartStringIcon1: ObservableCollection<ChartStringIcon> = oAdminSummaryList;
                                                        let iCount: number = oAdminSummaryList.Count;
                                                        let isExist: boolean = false;
                                                        let isDuplicate: boolean = false;
                                                        for (let cnt: number = 0; cnt < iCount; cnt++) {
                                                            if (objChartStringIcon && objChartStringIcon.Count > 0) {
                                                                objChartStringIcon.forEach((iCon) => {
                                                                    let iStdata1: number = Convert.ToInt32(iCon.StringData.Trim());
                                                                    let iStdata2: number = Convert.ToInt32(objChartStringIcon1[cnt].StringData.Trim());
                                                                    if (String.Compare(iCon.UriString, objChartStringIcon1[cnt].UriString, StringComparison.CurrentCultureIgnoreCase) == 0) {
                                                                        iStdata1++;
                                                                        iCon.StringData = iStdata1.ToString();
                                                                        isExist = true;
                                                                    }
                                                                    if (String.Compare(iCon.UriString, objChartStringIcon1[cnt].UriString, StringComparison.CurrentCultureIgnoreCase) == 0)
                                                                        isDuplicate = true;
                                                                });
                                                                if (iCount == 1 && !isExist && !isDuplicate) {
                                                                    oPRNSlotDetail.AdminSummary.Add(objChartStringIcon1[cnt]);
                                                                    isExist = true;
                                                                }
                                                            }
                                                        }
                                                        if (!isExist)
                                                            oPRNSlotDetail.AdminSummary = oAdminSummaryList;
                                                    }
                                                    else oPRNSlotDetail.AdminSummary = oAdminSummaryList;
                                                    oTagSlotDetail = new TagSlotDetail();
                                                    if (lstCollSlotDetailVM.Count > 0) {
                                                        let nlastItemCount: number = lstCollSlotDetailVM.Count - 1;
                                                        oTagSlotDetail.IsNextDoseAllowedForPRN = lstCollSlotDetailVM[nlastItemCount].IsNextPRNAllowed;
                                                        oTagSlotDetail.MinimumIntervalForPRN = oMedsAdminPRNSlot.oMedsAdminSlotVM.MinimumTime;
                                                        oTagSlotDetail.LastAdministeredAtForPRN = oMedsAdminPRNSlot.oMedsAdminSlotVM.LastRecordedAtForPRN;
                                                        if (DateTime.Equals(dtCurSlot, dtPreSlot)) {
                                                            if (DateTime.Equals(lstCollSlotDetailVM[nlastItemCount].CurrentServerDate.Date, lstCollSlotDetailVM[nlastItemCount].TodaySlotDate.Date) && !lstCollSlotDetailVM[nlastItemCount].IsNextPRNAllowed)
                                                                oPRNSlotDetail.AsRequired = this.LoadStringIcon("ChartStringIcon-" + oPRNSlotDetail.Key, MedImage.GetPath(MedImages.PRNAdminTimeIcon), MedsAdminChartToolTip.Asrequired);
                                                            else oPRNSlotDetail.AsRequired = this.LoadStringIcon("ChartStringIcon-" + oPRNSlotDetail.Key, null, MedsAdminChartToolTip.Asrequired);
                                                        }
                                                    }
                                                    oPRNSlotDetail.Tag = oTagSlotDetail;
                                                }
                                            }
                                        });
                                    }
                                    else {
                                        oPRNSlotDetail = ObjectHelper.CreateType<TodayAsRequiredSlot>((this.oClickedSlotTagObject.oIChartSlot), TodayAsRequiredSlot);
                                        oTagSlotDetail = new TagSlotDetail();
                                        oTagSlotDetail.IsNextDoseAllowedForPRN = oMedsAdminPRNSlot.oMedsAdminSlotVM.IsNextPRNAllow;
                                        oTagSlotDetail.MinimumIntervalForPRN = oMedsAdminPRNSlot.oMedsAdminSlotVM.MinimumTime;
                                        oTagSlotDetail.LastAdministeredAtForPRN = oMedsAdminPRNSlot.oMedsAdminSlotVM.LastRecordedAtForPRN;
                                        oPRNSlotDetail.LastGivenTime = String.Empty;
                                        if (this.oGetMedsChartData.IsGreyedOut)
                                            oPRNSlotDetail.BackGroundColor = new SolidColorBrush(Colors.Grey);
                                        else if (this.oTagDrugHeaderDetail != null && this.oTagDrugHeaderDetail.IsPRN && !(this.oTagDrugHeaderDetail.PrescriptionItemStatus == CConstants.DISCONTINUED || this.oTagDrugHeaderDetail.PrescriptionItemStatus == CConstants.COMPLETED || this.oTagDrugHeaderDetail.PrescriptionItemStatus == CConstants.CANCELLED)) {
                                            oPRNSlotDetail.BackGroundColor = new SolidColorBrush(MedChartData.AsRequiredSlotsColor);
                                        }
                                        oPRNSlotDetail.AdminSummary = null;
                                        if (DateTime.Equals(oMedsAdminPRNSlot.oMedsAdminSlotVM.SlotDate.Date, this.dtCurrentDateTime.Date) && !oMedsAdminPRNSlot.oMedsAdminSlotVM.IsNextPRNAllow)
                                            oPRNSlotDetail.AsRequired = this.LoadStringIcon("ChartStringIcon-" + oPRNSlotDetail.Key, MedImage.GetPath(MedImages.PRNAdminTimeIcon), MedsAdminChartToolTip.Asrequired);
                                        else oPRNSlotDetail.AsRequired = this.LoadStringIcon("ChartStringIcon-" + oPRNSlotDetail.Key, null, MedsAdminChartToolTip.Asrequired);
                                        oPRNSlotDetail.Tag = oTagSlotDetail;
                                    }
                                    this.oClickedSlotTagObject.oIChartSlot = oPRNSlotDetail;
                                    this.MedicationChartControl.RefreshIndividualSlot(this.oClickedSlotTagObject);
                                }
                            }
                        }
                        else {
                            this.RefreshMedChartForReqMedCA();
                        }
                    }
                }
            }
        }
        catch (ex: any) {
            let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
        }
        //this.oChildWindow.DialogResult = false;
        // ObjectHelper.stopFinishAndCancelEvent(false);
        this.oChildWindow.DialogRef.close();
    }
    LoadStringIcon(key: string, Uri: string, StringData: string): ChartStringIcon {
        let oChartIcon: ChartStringIcon = new ChartStringIcon();
        oChartIcon.Key = key;
        oChartIcon.UriString = Uri;
        oChartIcon.StringData = StringData;
        return oChartIcon;
    }
    LaunchMultiSlot(TagObject: TagObject): void {
        // ObjectHelper.stopFinishAndCancelEvent(true);
        MedChartData.IsReloadChartReqFromReqMedCA = false;
        let oMedsAdminVM: MedsAdminMultiSlotVM = new MedsAdminMultiSlotVM();
        oMedsAdminVM.CurrentDateTime = this.dtCurrentDateTime;
        oMedsAdminVM.MedchartOID = MedChartData.MedChartOID;
        oMedsAdminVM.PrescriptionItemOID = Convert.ToInt64(TagObject.oDrugItem.Key);
        oMedsAdminVM.DrugDetail = TagObject.oDrugItem;
        let MedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
        if (MedAdminVM != null && MedAdminVM.CumulativeParacetamol.ParacetamolAdministeredCount.HasValue) {
            oMedsAdminVM.ParacetamolAdminCount = MedAdminVM.CumulativeParacetamol.ParacetamolAdministeredCount.Value;
        }
        let oDrugTag: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(TagObject.oDrugItem.Tag, TagDrugHeaderDetail);
        if (oDrugTag != null) {
            oMedsAdminVM.IsParacetamolIngredient = oDrugTag.IsParacetamolIngredient;
        }
        let oAddnlInfo: CDrugHdrAddnlInfo = null;
        if (!String.IsNullOrEmpty(TagObject.oDrugItem.AdminWarningMessage))
            oAddnlInfo = ObjectHelper.CreateObject(new CDrugHdrAddnlInfo(), { IngredientAdminWarning: TagObject.oDrugItem.AdminWarningMessage });
        this.oMedsAdminMS = new MedsAdminMultiSlot();
        this.oMedsAdminMS.drgHeader = new DrugHeader();
        this.oMedsAdminMS.drgHeader.oDrugHeader = new CDrugHeader();
        this.oMedsAdminMS.drgHeader.oDrugHeader.oDrugHdrBasicInfo = new DrugHeaderItem();
        this.oMedsAdminMS.drgHeader.oDrugHeader.oDrugHdrBasicInfo.bShowFrequency = true;
        this.oMedsAdminMS.drgHeader.oDrugHeader.oDrugHdrBasicInfo.bShowSite = true;
        this.oMedsAdminMS.drgHeader.oDrugHeader.oDrugHdrBasicInfo.bShowAsrequired = true;
        if (oAddnlInfo == null)
            oAddnlInfo = new CDrugHdrAddnlInfo();
        oAddnlInfo.RecordAdminViewed = RecordAdminType.RecordAdmin;
        oMedsAdminVM.DrugDetail = TagObject.oDrugItem;
        if (TagObject.oDrugItem.Tag != null) {
            oMedsAdminVM.IsPRNWithSchedule = (<TagDrugHeaderDetail>(TagObject.oDrugItem.Tag)).IsPRN;
        }
        if (oDrugTag.SequenceParentPrescItemOID > 0 && oDrugTag.SeqInfOrderForPervImmediateItm > 0) {
            this.oMedsAdminMS.IsPreviousActiveSeqItem = this.oGetMedsChartData.oChartRowList.Any(c => (c.DrugItem != null) && (c.DrugItem.Tag != null) && (c.DrugItem.Tag instanceof TagDrugHeaderDetail) && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).ParentPrescriptionItemOID > 0 && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).ParentPrescriptionItemOID == oDrugTag.ParentPrescriptionItemOID && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).InfusionSeqOrder < oDrugTag.InfusionSeqOrder && !String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.InvariantCultureIgnoreCase));
            if (!this.oMedsAdminMS.IsPreviousActiveSeqItem && oDrugTag.ParentPrescriptionItemOID > 0 && oDrugTag.InfusionSeqOrder > 1) {
                let oParam: string[] = new Array(4);
                oParam[0] = oDrugTag.ParentPrescriptionItemOID.ToString();
                oParam[1] = oDrugTag.InfusionSeqOrder.ToString();
                oParam[2] = "0";
                oParam[3] = ChartContext.PatientOID.ToString();
                let IsPreviousSeqItemActive: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("GetPreviousSeqItemActive", oParam), 'string');
                this.oMedsAdminMS.IsPreviousActiveSeqItem = String.Equals(IsPreviousSeqItemActive, "1", StringComparison.InvariantCultureIgnoreCase) ? true : false;
            }
            let IsNextSlotAdmSlot: boolean = false;
            if (String.Equals(oDrugTag.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase)) {
                let NextCompletedItm: number = this.oGetMedsChartData.oChartRowList.Where(c => (c.DrugItem != null) && (c.DrugItem.Tag != null) && (c.DrugItem.Tag instanceof TagDrugHeaderDetail) && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).SequenceParentPrescItemOID > 0 && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).SequenceParentPrescItemOID == oDrugTag.SequenceParentPrescItemOID && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).SeqInfOrderForPervImmediateItm > oDrugTag.SeqInfOrderForPervImmediateItm && String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase)).Select(s => (ObjectHelper.CreateType<TagDrugHeaderDetail>(s.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemOID).FirstOrDefault();
                IsNextSlotAdmSlot = NextCompletedItm > 0 ? true : false;
                if (IsNextSlotAdmSlot) {
                    let PresOID: number = this.oGetMedsChartData.oChartRowList.Where(c => (c.DrugItem != null) && (c.DrugItem.Tag != null) && (c.DrugItem.Tag instanceof TagDrugHeaderDetail) && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).SequenceParentPrescItemOID > 0 && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).SequenceParentPrescItemOID == oDrugTag.SequenceParentPrescItemOID && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).SeqInfOrderForPervImmediateItm > oDrugTag.SeqInfOrderForPervImmediateItm && String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase)).Select(s => (ObjectHelper.CreateType<TagDrugHeaderDetail>(s.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemOID).FirstOrDefault();
                    if (PresOID > 0) {
                        IsNextSlotAdmSlot = !this.oGetMedsChartData.oChartRowList.Any(c => (c.DrugItem != null) && (c.DrugItem.Tag != null) && (c.DrugItem.Tag instanceof TagDrugHeaderDetail) && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).AmendedPrescriptionItemOID == PresOID && !String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.InvariantCultureIgnoreCase));
                    }
                }
                if (!IsNextSlotAdmSlot) {
                    let NextSeqDrugSlots: ObservableCollection<IChartSlot> = new ObservableCollection<IChartSlot>();
                    let drug: IEnumerable<ChartRow> = this.MedicationChartControl.ChartRows.Where(drug => (drug.DrugItem.Tag != null) && (drug.DrugItem.Tag instanceof TagDrugHeaderDetail)
                        && (drug.DrugItem.Tag as TagDrugHeaderDetail).SequenceParentPrescItemOID > 0
                        && (drug.DrugItem.Tag as TagDrugHeaderDetail).SequenceParentPrescItemOID == oDrugTag.SequenceParentPrescItemOID
                        && (drug.DrugItem.Tag as TagDrugHeaderDetail).SeqInfOrderForPervImmediateItm == oDrugTag.SeqInfOrderForPervImmediateItm + 1
                        && !String.Equals((drug.DrugItem.Tag as TagDrugHeaderDetail).PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase)
                        && !String.Equals((drug.DrugItem.Tag as TagDrugHeaderDetail).PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.InvariantCultureIgnoreCase));
                    drug.forEach(odrug => {
                        odrug.ChartCells.forEach(drugSlots => {
                            drugSlots.Slots.forEach(slot => {
                                NextSeqDrugSlots.Add(slot);
                            });
                        });
                    });
                    if (NextSeqDrugSlots != null && NextSeqDrugSlots.Any(x => x instanceof TodayMultiSlot)) {
                        let cnt: number = NextSeqDrugSlots.Count;
                        for (let j: number = 0; j < cnt; j++) {
                            if ((<TodayMultiSlot>NextSeqDrugSlots[j]).AdminSummary != null && (<TodayMultiSlot>NextSeqDrugSlots[j]).AdminSummary.Count > 0 && (<TodayMultiSlot>NextSeqDrugSlots[j]).AdminSummary.Any(x => !String.IsNullOrEmpty(x.StringData))) {
                                IsNextSlotAdmSlot = true;
                                break;
                            }
                        }
                    }
                }
                if (!IsNextSlotAdmSlot && oDrugTag.SequenceParentPrescItemOID > 0 && oDrugTag.SeqInfOrderForPervImmediateItm > 0) {
                    let oParam: string[] = new Array(4);
                    oParam[0] = oDrugTag.SequenceParentPrescItemOID.ToString();
                    oParam[1] = oDrugTag.SeqInfOrderForPervImmediateItm.ToString();
                    oParam[2] = "1";
                    oParam[3] = ChartContext.PatientOID.ToString();
                    let IsPreviousSeqItemActive: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("GetPreviousSeqItemActive", oParam), 'string');
                    IsNextSlotAdmSlot = String.Equals(IsPreviousSeqItemActive, "1", StringComparison.InvariantCultureIgnoreCase) ? true : false;
                }
                oMedsAdminVM.IsStrikethroughDisable = IsNextSlotAdmSlot;
            }
        }
        this.oMedsAdminMS.drgHeader.DataContext = Common.SetDrugHeaderContent(TagObject.oDrugItem, oAddnlInfo, this.oMedsAdminMS.drgHeader);
        this.oMedsAdminMS.drgHeader.lblInstructions.Visibility = Visibility.Visible;
        this.oMedsAdminMS.DataContext = oMedsAdminVM;
        // let dtResult: DateTime = DateTime.MinValue;
        // TagObject.oChartColumn.Caption
        // let oFormat: IFormatProvider = new CultureInfo('en-GB');
        // DateTime.TryParseExact(this.CurrentSlotDate, MedsAdminChartView.sDateFormat, oFormat, DateTimeStyles.None, (o) => { dtResult = o; });
        oMedsAdminVM.SlotDate = Convert.ToDateTime(TagObject.oChartColumn.Caption);;
        oMedsAdminVM.IsPRN = false;
        this.oMedsAdminMS.onDialogClose = this.oMedsAdminMS_Closed;
        this.oMedsAdminMS.oTagDrugHeaderDetail = oDrugTag;
        //let dtOpenSlotDate = dtResult.ToString(CConstants.ShortDateFormat);
        let Callback = (s, e) => {
            if (s != null && e != null) {
                this.oMedsAdminMS = s;
            }
        }
        AppActivity.OpenWindow(MedsAdminChartToolTip.AdministeredOnToolTip + " " + TagObject.oChartColumn.Caption, this.oMedsAdminMS, (s, e) => { this.oMedsAdminMS_Closed(s) }, "", false, 550, 462, false, WindowButtonType.Close, null, null, null, Callback);
        this.IsActivityLaunchedInSlot = false;
    }
    oMedsAdminMS_Closed(args: AppDialogEventargs): void {
        this.oChildWindow = args.AppChildWindow;
        Busyindicator.SetStatusIdle("MedChart");
        if (args.Result == AppDialogResult.Close || args.Result == AppDialogResult.Cancel) {
            let oMedsAdminMultiSlot: MedsAdminMultiSlot = ObjectHelper.CreateType<MedsAdminMultiSlot>(args.Content.Component, MedsAdminMultiSlot);
            if (oMedsAdminMultiSlot != null) {
                if (oMedsAdminMultiSlot.oMedsAdminSlotVM != null) {
                    if (oMedsAdminMultiSlot.oMedsAdminSlotVM.IsParacetamolIngredient) {
                        let MedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
                        if (MedAdminVM != null) {
                            MedAdminVM.CumulativeParacetamol.ParacetamolAdministeredCount = oMedsAdminMultiSlot.oMedsAdminSlotVM.ParacetamolAdminCount;
                        }
                    }
                    let oMultiSlotVM: ObservableCollection<SlotDetailVM> = ObjectHelper.CreateType<ObservableCollection<SlotDetailVM>>(oMedsAdminMultiSlot.oMedsAdminSlotVM.MultiSlot, ObservableCollection<SlotDetailVM>);
                    if (oMultiSlotVM != null && oMultiSlotVM.Count > 0 && this.oClickedSlotTagObject != null && this.oClickedSlotTagObject.oIChartSlot != null) {
                        if (!MedChartData.IsReloadChartReqFromReqMedCA) {
                            let nOldDueCount: number = 0;
                            let nOldOverdueCount: number = 0;
                            let oTagDrugHeaderDetail: TagDrugHeaderDetail = null;
                            if (this.oClickedSlotTagObject.oDrugItem != null) {
                                oTagDrugHeaderDetail = <TagDrugHeaderDetail>(this.oClickedSlotTagObject.oDrugItem).Tag;
                                if (oTagDrugHeaderDetail != null) {
                                    nOldDueCount = oTagDrugHeaderDetail.DueSlotCount;
                                    nOldOverdueCount = oTagDrugHeaderDetail.OverdueSlotCount;
                                    if (oTagDrugHeaderDetail.PrescriptionItemStatus == CConstants.DISCONTINUED || oTagDrugHeaderDetail.PrescriptionItemStatus == CConstants.CANCELLED) {
                                        this.oGetMedsChartData.IsGreyedOut = true;
                                    }
                                    else {
                                        this.oGetMedsChartData.IsGreyedOut = false;
                                    }
                                }
                            }
                            if (this.oClickedSlotTagObject.oIChartSlot instanceof TodayMultiSlot) {
                                let oMultiSlotDetail: TodayMultiSlot = <TodayMultiSlot>this.oClickedSlotTagObject.oIChartSlot;
                                let dtLastGiven: DateTime = this.oGetMedsChartData.GetLastGivenAt(oMultiSlotVM);
                                let dtNextDue: DateTime = DateTime.MinValue;
                                if ((MedChartData.ChartStatus == CConstants.sChartActiveStatusCode) && oTagDrugHeaderDetail != null && !oTagDrugHeaderDetail.IsPRN && !oTagDrugHeaderDetail.IsPRNWithSchedule) {
                                    dtNextDue = this.oGetMedsChartData.GetNextDueAt(oMultiSlotVM);
                                }
                                if (DateTime.NotEquals(dtLastGiven, DateTime.MinValue)) {
                                    let sFormattedDateTime: string = dtLastGiven.ToUserDateTimeString(CConstants.Timeformat);
                                    if (oMultiSlotVM != null && oMultiSlotVM.Count > 0 && DateTime.GreaterThan(oMultiSlotVM[0].ScheduledDTTM, DateTime.MinValue) && DateTime.GreaterThan(dtLastGiven.Date, DateTime.MinValue) && DateTime.NotEquals(dtLastGiven.Date, oMultiSlotVM[0].ScheduledDTTM.Date))
                                        sFormattedDateTime = dtLastGiven.ToUserDateTimeString(CConstants.DateTimeFormat);
                                    oMultiSlotDetail.LastGivenTime = MedsAdminChartToolTip.LastGivenAt + sFormattedDateTime;
                                }
                                else {
                                    oMultiSlotDetail.LastGivenTime = String.Empty;
                                }
                                let sOverDueStatus: string = String.Empty;
                                let sDueStatus: string = String.Empty;
                                let sNextDueAt: string = String.Empty;
                                let sMultiSlotNetYetRecStatus: string = String.Empty;
                                let nNewDueCount: number = 0;
                                let nNewOverdueCount: number = 0;
                                let oAdminSummaryList: ObservableCollection<ChartStringIcon> = this.oGetMedsChartData.CreateAdminSummary(Convert.ToInt64(this.oClickedSlotTagObject.oDrugItem.Key), 0, oMultiSlotVM, false, (o1) => { sOverDueStatus = o1; }, (o2) => { sDueStatus = o2; }, (o3) => { sMultiSlotNetYetRecStatus = o3; }, (o4) => { nNewDueCount = o4; }, (o5) => { nNewOverdueCount = o5; });
                                oMultiSlotDetail.AdminSummary = oAdminSummaryList;
                                let sMultiSlotStatus: string = String.Empty;
                                if (!String.IsNullOrEmpty(sOverDueStatus) && sOverDueStatus == SlotStatus.OVERDUE) {
                                    sMultiSlotStatus = SlotStatus.OVERDUE;
                                }
                                else if (!String.IsNullOrEmpty(sDueStatus) && sDueStatus == SlotStatus.DUENOW) {
                                    sMultiSlotStatus = SlotStatus.DUENOW;
                                }
                                else if (!String.IsNullOrEmpty(sDueStatus) && sDueStatus == SlotStatus.DEFERDUENOW) {
                                    sMultiSlotStatus = SlotStatus.DEFERDUENOW;
                                }
                                else if (!String.IsNullOrEmpty(sMultiSlotNetYetRecStatus) && sMultiSlotNetYetRecStatus == SlotStatus.NOTYETRECORDED) {
                                    sMultiSlotStatus = SlotStatus.NOTYETRECORDED;
                                }
                                else {
                                    if (DateTime.NotEquals(dtNextDue, DateTime.MinValue)) {
                                        sNextDueAt = MedsAdminChartToolTip.NextDueAt + " " + dtNextDue.ToUserDateTimeString(CConstants.Timeformat);
                                    }
                                }
                                if (!String.IsNullOrEmpty(sMultiSlotStatus) && oTagDrugHeaderDetail != null && oTagDrugHeaderDetail.UnackIsConflictExists != 'R') {
                                    if (String.Equals(sMultiSlotStatus, SlotStatus.DEFERDUENOW)) {
                                        oMultiSlotDetail.SlotStatus = String.Empty;
                                    }
                                    else {
                                        oMultiSlotDetail.SlotStatus = CommonBB.GetText(sMultiSlotStatus, ValueDomainValues.oSlotStatus);
                                    }
                                    oMultiSlotDetail.FontWeightStatus = FontWeights.Bold;
                                    oMultiSlotDetail.BackGroundColor = Common.SetSlotColor(sMultiSlotStatus, this.oGetMedsChartData.IsGreyedOut);
                                }
                                else if (!String.IsNullOrEmpty(sNextDueAt)) {
                                    oMultiSlotDetail.SlotStatus = sNextDueAt;
                                }
                                else if (String.IsNullOrEmpty(sNextDueAt) && String.IsNullOrEmpty(sMultiSlotStatus)) {
                                    oMultiSlotDetail.SlotStatus = String.Empty;
                                }
                                if (String.IsNullOrEmpty(sMultiSlotStatus)) {
                                    oMultiSlotDetail.FontWeightStatus = FontWeights.Normal;
                                    oMultiSlotDetail.BackGroundColor = Common.SetSlotColor(sMultiSlotStatus, this.oGetMedsChartData.IsGreyedOut);
                                }
                                this.oClickedSlotTagObject.oIChartSlot = oMultiSlotDetail;
                                this.MedicationChartControl.RefreshIndividualSlot(this.oClickedSlotTagObject);
                                this.UpdateDueSummary(nOldDueCount, nNewDueCount);
                                this.UpdateOverdueSummary(nOldOverdueCount, nNewOverdueCount);
                                if (oTagDrugHeaderDetail != null) {
                                    oTagDrugHeaderDetail.DueSlotCount = nNewDueCount;
                                    oTagDrugHeaderDetail.OverdueSlotCount = nNewOverdueCount;
                                }
                                this.oChildWindow.DialogResult = true;
                            }
                        }
                        else {
                            // ObjectHelper.stopFinishAndCancelEvent(false);
                            this.oChildWindow.DialogResult = true;
                            this.RefreshMedChartForReqMedCA();
                        }
                    }
                    else {
                        // ObjectHelper.stopFinishAndCancelEvent(false);
                        this.oChildWindow.DialogResult = false;
                    }
                    if (oMultiSlotVM != null && oMultiSlotVM.Count > 0) {
                        let sPrescrItemOID: number = oMultiSlotVM[0].PrescriptionItemOID;
                        let IsExist: boolean = false;
                        let NOTKNOWNSTATUSCOUNT = oMultiSlotVM.Where(c => c.Status == SlotStatus.NOTKNOWN).Select(s => s).Count();
                        if (NOTKNOWNSTATUSCOUNT > 0 && MedChartData.ListOfEventsWithNotKnownStatus != null) {
                            let ToCheckPrescItem = MedChartData.ListOfEventsWithNotKnownStatus.Where(c => c != null && c.PrescriptionItemOID == sPrescrItemOID).FirstOrDefault();
                            if (ToCheckPrescItem == null) {
                                let oEventsWithNotKnownStatus: EventsWithNotKnownStatus = new EventsWithNotKnownStatus(sPrescrItemOID, NOTKNOWNSTATUSCOUNT, String.Empty);
                                MedChartData.ListOfEventsWithNotKnownStatus.Add(oEventsWithNotKnownStatus);
                                IsExist = true;
                            }
                        }
                        if (!IsExist && MedChartData.ListOfEventsWithNotKnownStatus != null && MedChartData.ListOfEventsWithNotKnownStatus.Count > 0) {
                            MedChartData.ListOfEventsWithNotKnownStatus.ForEach(ReInsert => {
                                if (ReInsert.PrescriptionItemOID == sPrescrItemOID) {
                                    ReInsert.STCode = NOTKNOWNSTATUSCOUNT;
                                }
                            });
                        }
                        let oMedsAdminMainView: MedsAdminMainView = GetMedsChartData.GetMedAdminMainViewTab(this);
                        if (oMedsAdminMainView != null) {
                            oMedsAdminMainView.DrawAlertIconNextToOverviewTab();
                        }
                    }
                    if (oMedsAdminMultiSlot != null && oMedsAdminMultiSlot.oMedsAdminSlotVM != null) {
                        if (oMedsAdminMultiSlot.oMedsAdminSlotVM.IsPICompOrDiscAndScheduleDTTMBeyondPIStopDTTM) {
                            this.RefreshMedChart();
                        }
                        else if (!String.IsNullOrEmpty(oMedsAdminMultiSlot.oMedsAdminSlotVM.PrescriptionItemStatus)) {
                            this.RefreshMedChartForPresItemStatusChange(oMedsAdminMultiSlot.oMedsAdminSlotVM.PrescriptionItemStatus);
                        }
                    }
                    // need to remove
                    // ObjectHelper.stopFinishAndCancelEvent(false);
                    this.oChildWindow.DialogRef.close();
                }
            }
        }
        // ObjectHelper.stopFinishAndCancelEvent(false);
        this.oChildWindow.DialogRef.close();
    }
    MedicationChartControl_OnHotSpotClick(sender: Object, TagObject: TagObject): void {
        this.sSlotStatus = String.Empty;
        if (Common.CheckIfLockingDurationElapsed(null)) {
            return
        }
        let PrescriptionItemOID: number = 0;
        let MCVersion: string = String.Empty;
        if (TagObject != null && TagObject.oIChartSlot != null) {
            if (TagObject != null) {
                this.oClickedSlotTagObject = TagObject;
                if (this.oClickedSlotTagObject != null && this.oClickedSlotTagObject.oDrugItem != null && this.oClickedSlotTagObject.oDrugItem.Tag != null) {
                    let Obj: TagDrugHeaderDetail = (ObjectHelper.CreateType<TagDrugHeaderDetail>(this.oClickedSlotTagObject.oDrugItem.Tag, TagDrugHeaderDetail));
                    if (Obj != null && !String.IsNullOrEmpty(Obj.MCVersionNo)) {
                        MCVersion = Obj.MCVersionNo;
                        PrescriptionItemOID = Obj.PrescriptionItemOID;
                    }
                }
            }
            if (TagObject.oIChartSlot instanceof AdministratedSlot && (<AdministratedSlot>TagObject.oIChartSlot).Tag != null && (<ChartIcon>((<FrameworkElement>(sender)).Tag) != null)) {
                let HistoryChartIcon: ChartIcon = (<ChartIcon>((<FrameworkElement>(sender)).Tag));
                if (HistoryChartIcon != null && !String.IsNullOrEmpty(HistoryChartIcon.Key) && String.Compare(HistoryChartIcon.Key, "HistoryIcon", StringComparison.CurrentCultureIgnoreCase) == 0) {
                    let oTagAdminSlotDetail: TagSlotDetail = <TagSlotDetail>(<AdministratedSlot>TagObject.oIChartSlot).Tag;
                    if (oTagAdminSlotDetail != null && (oTagAdminSlotDetail.MedsAdminOID > 0 || oTagAdminSlotDetail.SlotOID > 0)) {
                        // ObjectHelper.stopFinishAndCancelEvent(true);
                        this.oMedsAdminSlotHistory = new MedsAdminSlotHistory();
                        this.oMedsAdminSlotHistory.onDialogClose = this.omedsadmin_Closed;
                        this.oMedsAdminSlotHistory.MedAdminOID = oTagAdminSlotDetail.MedsAdminOID;
                        this.oMedsAdminSlotHistory.PresSchOID = oTagAdminSlotDetail.SlotOID;
                        this.oMedsAdminSlotHistory.MCVersion = MCVersion;
                        this.oMedsAdminSlotHistory.PrescriptionItemOID = PrescriptionItemOID > 0 ? PrescriptionItemOID : 0;
                        AppActivity.OpenWindow("Administration modification history", this.oMedsAdminSlotHistory, this.omedsadmin_Closed, "Administration modification history", false, 600, 630, false, WindowButtonType.Close, null);
                        this.IsActivityLaunchedInSlot = false;
                    }
                }
            }
            else if (TagObject.oIChartSlot instanceof TodayMultiSlot && !MedChartData.IsMedChartReadOnly) {
                let Allslots: ObservableCollection<IChartSlot> = new ObservableCollection<IChartSlot>();
                let drug: IEnumerable<ChartRow> = this.MedicationChartControl.ChartRows.Where(drg => String.Compare(drg.Key.Split('-')[1], this.oClickedSlotTagObject.oDrugItem.Key) == 0);
                drug.forEach(odrug => {
                    odrug.ChartCells.forEach(drugSlots => {
                        drugSlots.Slots.forEach(slot => {
                            if (slot instanceof TodayMultiSlot && ((<TodayMultiSlot>(TagObject.oIChartSlot)).SlotStatus == SlotStatusText.DUENOW || (<TodayMultiSlot>(TagObject.oIChartSlot)).SlotStatus == SlotStatusText.OVERDUE)) {
                                Allslots.Add(slot);
                            }
                        });
                    });
                });
                if (Allslots != null) {
                    this.IsNotAllNotYetRecordedExists = true;
                }
                this.IsConflictsErrorMsgExists = false;
                if (TagObject != null && this.CheckValidation(TagObject))
                    this.LaunchMultiSlot(TagObject);
            }
            else if (TagObject.oIChartSlot instanceof TodayAsRequiredSlot && !MedChartData.IsMedChartReadOnly) {
                this.IsConflictsErrorMsgExists = false;
                if (TagObject != null && this.CheckValidation(TagObject))
                    this.LaunchPRNSlot(TagObject);
            }
        }
    }
    omedsadmin_Closed(args: AppDialogEventargs): void {
        // ObjectHelper.stopFinishAndCancelEvent(false);
        args.AppChildWindow.DialogResult = true;
    }
    cmdPrintMedChart_Click(e): void {
        let oReturn: Object = HtmlPage.Window.Invoke("isIEAboveSeven", null);
        if (oReturn != null && String.Compare(oReturn.ToString(), "True") != 0) {
            this.msg = new iMessageBox();
            this.msg.Title = "Lorenzo";
            this.msg.MessageButton = MessageBoxButton.OK;
            this.msg.MessageBoxClose = (s, e) => { this.PrintChart_MessageBoxClose(s, e); };
            this.msg.Message = "Printing of a prescription using this version of Internet Explorer may print a prescription item across pages, please ensure that the all pages are printed and that all prescription items are present.";
            ;
            this.msg.Height = 170;
            this.msg.Width = 350;
            this.msg.Show();
        }
        else this.PrintMedChart();
    }
    PrintChart_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        this.PrintMedChart();
    }
    PrintMedChart(): void {
        let oRandom: Random = new Random();
        this.oMedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
        this.oMedicationAdminVM.sLastCACode = "MN_PrintMedChart_P2";
        let sQuery: string = String.Empty;
        let ISFIRSTCLICK: string = "Yes";
        sQuery += "&MEDICATIONCHARTOID=" + MedChartData.MedChartOID.ToString();
        sQuery += "&CHARTSTATUS=" + MedChartData.ChartStatus;
        sQuery += "&CHARTSTARTDTTM=" + MedChartData.ActiveFrom.ToString("dd-MMM-yyyy HH:mm");
        if (DateTime.NotEquals(MedChartData.ActiveTo.Date, DateTime.MinValue.Date)) {
            sQuery += "&CHARTENDDTTM=" + MedChartData.ActiveTo.ToString("dd-MMM-yyyy HH:mm");
        }
        else {
            sQuery += "&CHARTENDDTTM=" + DateTime.MinValue.DateTime.ToString("dd-MMM-yyyy HH:mm");
        }
        sQuery += "&PATIENTOID=" + ChartContext.PatientOID.ToString();
        sQuery += "&SRVCPOINTOID=" + MedChartData.ServiceOID.ToString();
        sQuery += "&RNDMOID=" + oRandom.Next().ToString();
        sQuery += "&ISFIRSTCLICK=" + ISFIRSTCLICK;
        this.oMedicationAdminVM.LaunchWizard("MN_PrintMedChart_P2", sQuery, WizardType.WIZARD);//#35915
    }
    cmdRecordPGDLinks_Click(e): void {
        Busyindicator.SetStatusBusy("RecordPgd");
        this.IsActivityLaunchedInSlot = true;
        this.objpgdadminstrationvm = new PGDAdminstrationVM(true);
        this.objpgdadminstrationvm.IsPGDListsAvailable(Convert.ToInt64(AppContextInfo.JobRoleOID), 0, MedChartData.MedChartOID);
        this.objpgdadminstrationvm.IsPGDListAvailableEvent = (s, e) => { this.objpgdadminstrationvm_IsPGDListAvailableEvent(s); };
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
        //     Allergylaunch = ObjectHelper.CreateType<ScriptObject>(HtmlPage.Window.Invoke("LaunchAllergyCheckedforChart", menucode, Enctype, IsPatContextEncAvlb, EncOID), ScriptObject);
        //     if (Allergylaunch != null && Allergylaunch.GetProperty("LaunchCA") != null && !String.IsNullOrEmpty(Allergylaunch.GetProperty("LaunchCA").ToString())) {
        //         Launch = Allergylaunch.GetProperty("LaunchCA").ToString();
        //         if (Launch == CONFALRGY) {
        //             this.LaunchAllergy(CONFALRGY, menucode);
        //         }
        //         else if (Launch == menucode) {
        //             this.RecordPGDLaunch();
        //         }
        //     }
        //     else {
        //         this.RecordPGDLaunch();
        //       //  Busyindicator.SetStatusIdle("RecordPgd");
        //     }
        // }
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
    public LaunchAllergy(code: string, menucode: string): void {
        let sArgs: string = "&ENCOUNTEROID=" + PatientContext.EncounterOid.ToString();
        this.oMedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
        this.oMedicationAdminVM.sLastCACode = code;
        this.oMedicationAdminVM.IsRecordPGDLaunchedFromInfusionChart = false;
        this.oMedicationAdminVM.Menucodeallergy = menucode;
        this.oMedicationAdminVM.LaunchWizard(code, sArgs);
        if (String.Equals(menucode, "MN_RECORDPGD_P2", StringComparison.CurrentCultureIgnoreCase)) {
            Busyindicator.SetStatusIdle("RecordPgd");
            this.IsActivityLaunchedInSlot = false;
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
        // ObjectHelper.stopFinishAndCancelEvent(true);
        let dialogWindowHeight = (700/window.devicePixelRatio); 
        AppActivity.OpenWindow("Record PGD administration", this.objRecordPGD, (s, e) => { this.objRecordPGD_Closed(s); }, "Record patient group directive administration", true, dialogWindowHeight, 1050, true, WindowButtonType.OkCancel, null);
    }
    public async OnPrescribelaunch(sMenuCode: string, EncounterType: string, EncounterOid: string): Promise<void> {
        let MedclerkPrompt: string = "YES";
        let clerkingsource: string = String.Empty;
        let sQuery: string = "&MENUCODE=" + sMenuCode;
        sQuery += "&ENCID=" + ChartContext.EncounterOID.ToString();
        sQuery += "&ENCTYPE=" + ChartContext.EncounterType.ToString();
        sQuery += "&IsAllergyPrompted=True";
        sQuery += "&IsLaunchFromChart=True";
        sQuery += "&RequestLockOID=";
        if (MedChartData.MedChartOID > 0 && (String.Equals(sMenuCode, PrescriptionTypesMenuCode.ForAdministration, StringComparison.InvariantCultureIgnoreCase) || String.Equals(sMenuCode, PrescriptionTypesMenuCode.Inpatient, StringComparison.InvariantCultureIgnoreCase))) {
            sQuery += MedChartData.MedChartOID.ToString();
        }
        else {
            sQuery += ChartContext.EncounterOID.ToString();
        }
        //RR PAN 216 Fix
        sQuery += "&MedChartPatientOID=" + PatientContext.PatientOID;

        this.oMedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
        this.oMedicationAdminVM.sLastCACode = sMenuCode;
        // this.oMedicationAdminVM.PropertyChanged -= new System.ComponentModel.PropertyChangedEventHandler(obj_PropertyChanged);
        this.oMedicationAdminVM.PropertyChanged = (s, e) => { this.obj_PropertyChanged(s, e); };
        if (!this._ISCanWithoutClerkPrompt && String.Compare(sMenuCode, PrescriptionTypesMenuCode.sclerking, StringComparison.OrdinalIgnoreCase) == 0) {
            sQuery += "&MedclerkPrompt=" + MedclerkPrompt;
            clerkingsource = ObjectHelper.CreateType<string>(await HtmlPage.Window.InvokeAsync("LaunchMedClerkSourceChartMedication", PatientContext.PatientOID, EncounterOid, MedclerkPrompt), 'string');
            if (clerkingsource != null) {
                sQuery += "&CLRKSRC=" + clerkingsource;
                sQuery += "&GPCConsentStatus=" + Common.GPCConsentVerifyStatus;
                sQuery += "&sOrgMenucode=" + Common.GetInpatientMedMenucode();
                ChartContext.IsPrescribeLaunchFromChart = true;
                this.oMedicationAdminVM.LaunchWizard(sMenuCode, sQuery, 2);
            }
            else {
                Common.IsCanLaunchIPFromClerkPrompt = false;
                let _sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", PatientContext.EncounterOid, "MedPrescribeClerking", Common.nLockDuration), 'string');
                Common.GPCConsentVerifyStatus = String.Empty;
            }
        }
        else {
            let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", (MedChartData.MedChartOID > 0) ? MedChartData.MedChartOID : ChartContext.EncounterOID, "MedPrescribeInpatient", Common.nLockDuration), 'string');
            sQuery += "&CLRKSRC=";
            sQuery += "&GPAutoSaveClerk=true";
            sQuery += "&GPCConsentStatus=" + Common.GPCConsentVerifyStatus;
            ChartContext.IsPrescribeLaunchFromChart = true;
            this.oMedicationAdminVM.LaunchWizard(sMenuCode, sQuery, 2);
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
    public GetLatestActiveEncounter(): Encounter {
        let oEnc = this.oGetMedsChartData.oEncList.Where(x => x.EndDate == DateTime.MinValue).OrderByDescending((x) => x.StartDate).Select(x => x);
        let oLatestEnc: Encounter = null;
        if (oEnc != null && oEnc.Count() > 0) {
            oLatestEnc = oEnc.FirstOrDefault();
        }
        return oLatestEnc;
    }
    objpgdadminstrationvm_IsPGDListAvailableEvent(IsPGDListAvailable: boolean): void {
        this.IsActivityLaunchedInSlot = false;
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
            iBusyIndicator.Start("Administration", true);
            let bdialogresult: boolean = this.objRecordPGD.cmdOkClick();
            if (bdialogresult) {
                // ObjectHelper.stopFinishAndCancelEvent(false);
                args.AppChildWindow.DialogResult = true;
            }
        }
        else if (args.Result == AppDialogResult.Cancel) {
            // ObjectHelper.stopFinishAndCancelEvent(false);
            args.AppChildWindow.DialogResult = false;
            this.objRecordPGD.dupDialogRef.close();
        }
        Busyindicator.SetStatusIdle("RecordPgd");
        this.IsActivityLaunchedInSlot = false;
        // this.objpgdadminstrationvm.CheckRecordPGDEvent -= new PGDAdminstrationVM.CheckRecordPGD(objpgdadminstrationvm_CheckRecordPGDEvent);
        this.objpgdadminstrationvm.CheckRecordPGDEvent = (s, e, y) => { this.objpgdadminstrationvm_CheckRecordPGDEvent(s, e, y); };
    }
    objpgdadminstrationvm_CheckRecordPGDEvent(IsRecorded: boolean, oCResMsgRecordPGD: CResMsgRecordPGD, IsSingleActionChecked: boolean): void {
        Busyindicator.SetStatusIdle("Administration");
        this.IsActivityLaunchedInSlot = false;
        if (IsRecorded) {
            if (!IsSingleActionChecked) {
                this.InfusionTabSwitch();
            }
            else {
                this.ReloadMedChart();
            }
        }
    }
    cmdManageSelfAdminstration_Click(e): void {
        let objSelfAdminDrugDetailVM: SelfAdminDrugDetailVM = new SelfAdminDrugDetailVM();
        this.objMedsAdminSelfAdmin = new MedsAdminManageSelfAdminChild();
        this.objMedsAdminSelfAdmin.DataContext = objSelfAdminDrugDetailVM;
        this.objMedsAdminSelfAdmin.MedCharOIDBC = MedChartData.MedChartOID;
        objSelfAdminDrugDetailVM.IsDataUpdatedEvent = (s, e) => { this.objSelfAdminDrugDetailVM_IsDataUpdatedEvent(s); };
        this.objMedsAdminSelfAdmin.HelpCode = "MN_SELFADMIN";
        let dialogWindowHeight;
        if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
            dialogWindowHeight = 495;
        }else{
            dialogWindowHeight = (620/window.devicePixelRatio);

        }
        // objSelfAdminDrugDetailVM.GetSelfAdminDetailsCompleted.subscribe(data=>{
        // ObjectHelper.stopFinishAndCancelEvent(true);
        AppActivity.OpenWindow("Manage self administration",
            this.objMedsAdminSelfAdmin,
            (s, e) => { this.objMedsAdminSelfAdmin_Closed(s); },
            "Manage self administration", true, dialogWindowHeight, 655, true,
            WindowButtonType.OkCancel, null);
    }
    objSelfAdminDrugDetailVM_IsDataUpdatedEvent(args: AppDialogEventargs): void {
        // ObjectHelper.stopFinishAndCancelEvent(false);
        this.objMedsAdminSelfAdmin.appDialog.DialogResult = true;
        Busyindicator.SetStatusIdle("MedChart");
        Busyindicator.SetStatusIdle("Administration");
        this.ReloadMedChart();
    }
    objMedsAdminSelfAdmin_Closed(args: AppDialogEventargs): void {
        this.objMedsAdminSelfAdmin = args.Content.Component;
        this.oSlotVM = ObjectHelper.CreateType<SlotDetailVM>(this.objMedsAdminSelfAdmin.DataContext, SlotDetailVM);
        //this.IsActivityLaunchedInSlot = false;
        //if (!this.oSlotVM.IsSubmitInProgress) {
            if (args.Result == AppDialogResult.Ok) {
                //this.oSlotVM.IsSubmitInProgress = true;
                Busyindicator.SetStatusBusy("Administration", true);
                this.objMedsAdminSelfAdmin.OKButton_Click();
                // ObjectHelper.stopFinishAndCancelEvent(false);
                args.AppChildWindow.DialogResult = true;
            }
            else if (args.Result == AppDialogResult.Cancel) {
                Busyindicator.SetStatusIdle("MedChart");
                // ObjectHelper.stopFinishAndCancelEvent(false);
                this.objMedsAdminSelfAdmin.dupDialogRef.close();
            }
        //}
    }
    SelectEncounter(bIsCancel: boolean): void {
        bIsCancel = false;
        let oParam: string[] = new Array(1);
        oParam[0] = PatientContext.PatientOID.ToString();
        let returnValue: Object = HtmlPage.Window.Invoke("LaunchSelectEncounter", oParam);
        if (returnValue != null && ObjectHelper.ToString(returnValue).length > 0) {
            let arrEncounter: string[] = ObjectHelper.ToString(returnValue).Split(',');
            let lnEncOID: number;
            for (let i: number = 0; i < arrEncounter.length; i++) {
                if (Number.TryParse(arrEncounter[0], (o) => { lnEncOID = o; }))
                    PatientContext.EncounterOid = lnEncOID;
                PatientContext.EncounterType = arrEncounter[1].Trim();
            }
        }
        else bIsCancel = true;
    }
    private cmdPrescribeClick(): void {
        let objService1: IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescriptionWSSoapClient();
        objService1.GetClinicalEncountersDetailCompleted = (s, e) => { this.objService1_GetClinicalEncountersDetailCompleted(s, e); };
        let objReq1: CReqMsgGetClinicalEncountersDetail = new CReqMsgGetClinicalEncountersDetail();
        objReq1.oContextInformation = CommonBB.FillContext();
        objReq1.lnEncounterOIDBC = ChartContext.EncounterOID;
        objReq1.lnPatientOIDBC = ChartContext.PatientOID;
        objService1.GetClinicalEncountersDetailAsync(objReq1);
    }
    objService1_GetClinicalEncountersDetailCompleted(sender: Object, e: GetClinicalEncountersDetailCompletedEventArgs): void {
        if (e.Error == null && e.Result != null && !String.IsNullOrEmpty(e.Result.sClinicalEncDet)) {
            let sMessage: string = "There are active for administration prescriptions for this patient from " + e.Result.sClinicalEncDet + ", Please review and remove any that are no longer relevant";
            this.msg = new iMessageBox();
            this.msg.Title = "Lorenzo";
            this.msg.MessageButton = MessageBoxButton.OK;
            this.msg.IconType = MessageBoxType.Exclamation;
            this.msg.Height = 160;
            this.msg.Width = 410;
            this.msg.OverlayBrush = new SolidColorBrush(Colors.Transparent);
            this.msg.MessageBoxClose = (s, e) => { this.ClinicalEncounterAlert_MessageBoxClose(s, e); };
            this.msg.Message = sMessage;
            this.msg.Show();
        }
        else this.cmdPrescribeClickPrimary();
    }
    ClinicalEncounterAlert_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        this.cmdPrescribeClickPrimary();
    }
    private async cmdPrescribeClickPrimary(): Promise<void> {
        this.isClinEncMesToBeLaunchd = false;
        let bIscancel: boolean = false;
        if (!String.IsNullOrEmpty(ChartContext.MedchartLaunchLoc) && ChartContext.MedchartLaunchLoc.Equals("VW_PTLST")) {
            if (PatientContext.EncounterOid <= 0) {
                this.SelectEncounter(bIscancel);
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
    private async LaunchPrescribeCareActivity(EncounterOid: string, EncounterType: string): Promise<void> {
        let oParam: string[] = new Array(3);
        let sMenuCode: string = String.Empty;
        let sprompt: string = "CAlaunch";
        if ((String.Compare(EncounterType, CConstants.InpatientEncValue) == 0) || (String.Compare(EncounterType, CConstants.InaptientEncText) == 0)) {
            sMenuCode = PrescriptionTypesMenuCode.Inpatient;
            EncounterType = CConstants.InpatientEncValue;
            let sLockingMessage: string = String.Empty;
            let IsLock: boolean = false;
            let clerkcheck: string = String.Empty;
            clerkcheck = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("GetMedclerkPromptValue", sMenuCode, PatientContext.PatientOID, EncounterOid, "EPR", ""), 'string');
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
                    let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", PatientContext.EncounterOid, "MedPrescribeClerking", Common.nLockDuration), 'string');
                    sprompt = ObjectHelper.CreateType<string>(await HtmlPage.Window.InvokeAsync("LaunchClerkPrmptFromChartMedication", sMenuCode, EncounterType, PatientContext.PatientOID, EncounterOid), 'string');
                }
            }
        }
        else {
            sMenuCode = PrescriptionTypesMenuCode.ForAdministration;
            EncounterType = CConstants.OutpatientEncValue;
        }
        if (sprompt != null && (String.Compare(sprompt.toString(), CConstants.sCNFRECCLRK, StringComparison.OrdinalIgnoreCase) == 0)) {
            let sMenuclerk: string = PrescriptionTypesMenuCode.sclerking;
            Common.IsCanLaunchIPFromClerkPrompt = true;
            this.OnPrescribelaunch(sMenuclerk, EncounterType, EncounterOid);
        }
        else if (!String.IsNullOrEmpty(sprompt)) {
            let _sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", PatientContext.EncounterOid, "MedPrescribeClerking", Common.nLockDuration), 'string');
            let _LockedUsersDetails: LockedUsersDetails;
            let IsLocked: boolean = MedicationCommonBB.IsLockedByAnotherUser(sMenuCode, true, (o) => { _LockedUsersDetails = o; });
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
                    this.msg.MessageBoxClose = (s, e) => { this.InpatientClickWarning_MessageBoxClose(s, e); };
                    this.msg.Message = _LockedUsersDetails.WarningMessage;
                    this.msg.Show();
                }
            }
            else {
                let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", MedChartData.MedChartOID, "MedPrescribeInpatient", Common.nLockDuration), 'string');
                this.OnPrescribelaunch(sMenuCode, EncounterType, EncounterOid);
            }
        }
        else {
            let _sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", PatientContext.EncounterOid, "MedPrescribeClerking", Common.nLockDuration), 'string');
        }
    }
    InpatientClickWarning_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        this.isClinEncMesToBeLaunchd = false;
        if (e.MessageBoxResult == MessageBoxResult.Yes) {
            let sMenuCode: string = String.Empty;
            let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", MedChartData.MedChartOID, "MedPrescribeInpatient", Common.nLockDuration), 'string');
            if (String.Equals(PatientContext.EncounterType, CConstants.InaptientEncText, StringComparison.InvariantCultureIgnoreCase) || String.Equals(PatientContext.EncounterType, CConstants.InpatientEncValue, StringComparison.InvariantCultureIgnoreCase)) {
                sMenuCode = PrescriptionTypesMenuCode.Inpatient;
            }
            else {
                sMenuCode = PrescriptionTypesMenuCode.ForAdministration;
            }
            this.OnPrescribelaunch(PrescriptionTypesMenuCode.Inpatient, PatientContext.EncounterType, PatientContext.EncounterOid.ToString());
        }
    }
    async RecordAllergyforInpatientPrescribe(EncounterOid: string, EncounterType: string): Promise<void> {
        let menucode: string = String.Empty;
        let IsPatContextEncAvlb: boolean = false;
        if (String.Equals(EncounterType, CConstants.InpatientEncValue, StringComparison.CurrentCultureIgnoreCase) || String.Equals(EncounterType, CConstants.InaptientEncText, StringComparison.InvariantCultureIgnoreCase)) {
            menucode = PrescriptionTypesMenuCode.Inpatient;
        }
        else {
            menucode = PrescriptionTypesMenuCode.ForAdministration;
        }
        Common.GPCConsentVerifyStatus = String.Empty;
        let CONFALRGY: string = "MN_HI_CONFALRGY";
        let Allergylaunch: ScriptObject = null;
        if (PatientContext.EncounterOid > 0)
            IsPatContextEncAvlb = true;
        let result_sp = null;
        result_sp = ObjectHelper.CreateType<ScriptObject>(await HtmlPage.Window.InvokeAsync("LaunchAllergyCheckedforChartMedication", menucode, EncounterType, IsPatContextEncAvlb, EncounterOid), ScriptObject);
        if (result_sp.returnData) {
            let result = { Response: result_sp.GetProperty("result").Response };
            let oReturn_sp = result_sp.GetProperty("oReturn");

            if (result.Response != null && result.Response.AllergyPromptRequired != null && result.Response.AllergyPromptRequired != "" && result.Response.AllergyPromptRequired == "True") {
                let callbackResult = (sender: Object, e: MessageEventArgs) => {
                    // ObjectHelper.stopFinishAndCancelEvent(false);
                    if (e.MessageBoxResult == MessageBoxResult.Cancel) {
                        return;
                    }
                    if (e.MessageBoxResult == MessageBoxResult.OK) {
                        let oReturn = [];
                        oReturn["LaunchCA"] = "MN_HI_CONFALRGY";
                        let returnScriptObject: ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = oReturn;
                        this.GetAllergylaunch(returnScriptObject, menucode, EncounterOid, EncounterType);
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
                // ObjectHelper.stopFinishAndCancelEvent(true);
            }
            else {
                let oReturn = [];
                oReturn["LaunchCA"] = oReturn_sp['LaunchCA'];
                let returnScriptObject: ScriptObject = new ScriptObject();
                returnScriptObject.returnData = oReturn;
                this.GetAllergylaunch(returnScriptObject, menucode, EncounterOid, EncounterType);
            }

        }
        else {
            let oReturn = [];
            oReturn["LaunchCA"] = menucode;
            let returnScriptObject: ScriptObject = new ScriptObject();
            returnScriptObject.returnData = oReturn;
            this.GetAllergylaunch(returnScriptObject, menucode, EncounterOid, EncounterType);
        }
    }
    GetAllergylaunch(resData, MenuCode, EncounterOid, EncounterType) {
        let Allergylaunch = ObjectHelper.CreateType<ScriptObject>(resData, ScriptObject);
        let CONFALRGY: string = "MN_HI_CONFALRGY";
        if (Allergylaunch != null && Allergylaunch.GetProperty("LaunchCA") != null && !String.IsNullOrEmpty(Allergylaunch.GetProperty("LaunchCA").ToString())) {
            let Launch: string = String.Empty;
            Launch = Allergylaunch.GetProperty("LaunchCA").ToString();
            if (Launch == CONFALRGY) {
                this.LaunchAllergy(CONFALRGY, MenuCode);
            }
            else if (Launch == MenuCode) {
                this.LaunchPrescribeCareActivity(EncounterOid, EncounterType);
            }
        }
    }
    msg_Closed(sender: Object, e: EventArgs): void {
        let oiMessageBox: iMessageBox = ObjectHelper.CreateType<iMessageBox>(sender, iMessageBox);
        if (oiMessageBox != null && oiMessageBox.Tag != null) {
            let sMessageBoxTag: string = oiMessageBox.Tag.ToString();
            if (!String.IsNullOrEmpty(sMessageBoxTag)) {
                let _ArrMsgBoxTag: string[] = sMessageBoxTag.Split('~');
                if (_ArrMsgBoxTag != null && _ArrMsgBoxTag.length == 3) {
                    let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", MedChartData.MedChartOID, "MedPrescribeInpatient", Common.nLockDuration), 'string');
                    this.OnPrescribelaunch(_ArrMsgBoxTag[0], _ArrMsgBoxTag[1], _ArrMsgBoxTag[2]);
                }
            }
        }
    }
    IsLock: boolean = false;
    cmdPrescribe_Click(e): void {
        let sLockingMessage: string = String.Empty;
        if (!this.isClinEncMesToBeLaunchd) {
            this.isClinEncMesToBeLaunchd = true;
            this.CheckOpenSectionExists();
            // Common.CADataContext.OnClosePrescribeCareActivity -= OnClosePrescribeCareActivityEventCompleted;
            Common.CADataContext.OnClosePrescribeCareActivity = (s, e, y) => { this.OnClosePrescribeCareActivityEventCompleted(s, e, y); };
        }
    }
    CheckOpenSectionExists(): void {
        let sSecMessage: string = String.Empty;
        Common.CheckOpenSectionExists((o1) => { this.bIsOpenSecExists = o1; }, (o2) => { sSecMessage = o2; });
        if (this.bIsOpenSecExists) {
            sSecMessage = String.Format(Resource.MedsAdminChartToolTip.IsOpenSectionToolTip, this.bIsOpenSecExists);
            this.msg = new iMessageBox();
            this.msg.Title = "Lorenzo";
            this.msg.MessageButton = MessageBoxButton.OK;
            this.msg.MessageBoxClose = (s, e) => { this.MedPrescribeOpenSec_MessageBoxClose(s, e); };
            this.msg.Message = sSecMessage;
            this.msg.Show();
        }
        else {
            this.bIsOpenSecExists = false;
            this.cmdPrescribeClick();
        }
    }
    MedPrescribeOpenSec_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        this.cmdPrescribeClick();
    }
    obj_PropertyChanged(sender: Object, e: PropertyChangedEventArgs): void {
        let sResult: string = String.Empty;
        if (e.PropertyName == "MedsAdminChartViewClosed" || (((e.PropertyName == "RequestMedicationClosed" && !MedChartData.IsReloadChartReqFromReqMedCA) || (e.PropertyName == "MedsAdminTVClosed")) && String.Equals(MedChartData.CalledFrom, CConstants.sTabChartKey))) {
            if (e.PropertyName == "MedsAdminChartViewClosed") {
                this.isPrescribeLinkClicked = true;
                sResult = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", MedChartData.MedChartOID > 0 ? MedChartData.MedChartOID : PatientContext.EncounterOid, "MedPrescribeInpatient", Common.nLockDuration), 'string');
            }
            else if (e.PropertyName == "MedsAdminTVClosed") {
                sResult = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", PatientContext.EncounterOid, "MedTVInpatient", Common.nLockDuration), 'string');
            }
            this.MedicationChartControl.ChartRows = null;
            this.MedicationChartControl.NoRecordsDisplayText = "Loading";
            this.lblOverdueNumber.Text = String.Empty;
            this.lblDueNumber.Text = String.Empty;
            this.lblAsRequiredNumber.Text = String.Empty;
            MedChartData.PatinetInfo = Common.GetPatientInfo();
            this.LoadMedicationChart(true);
            let objMedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
            if (objMedAdminVM != null) {
                objMedAdminVM.SetHeightweightPopUp();
            }
        }
        else if (e.PropertyName == "MedsAdminChartViewClosedCancel") {
            sResult = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", MedChartData.MedChartOID, "MedPrescribeInpatient", Common.nLockDuration), 'string');
            MedChartData.PatinetInfo = Common.GetPatientInfo();
            let objMedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
            if (objMedAdminVM != null) {
                objMedAdminVM.SetHeightweightPopUp();
            }
        }
        else if (e.PropertyName == "MedsAdminTVClosedCancel") {
            sResult = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", PatientContext.EncounterOid, "MedTVInpatient", Common.nLockDuration), 'string');
        }
        if (e.PropertyName == "RequestMedicationClosedCancel" || e.PropertyName == "RequestMedicationClosed") {
            this.IsReqMedicationLaunched = false;
        }
        let MedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
        if (MedAdminVM != null) {
            //  MedAdminVM.PropertyChanged -= obj_PropertyChanged;
            MedAdminVM.PropertyChanged = null;
        }
    }
    private ReloadMedChart(): void {
        if (this.MedicationChartControl != null && this.MedicationChartControl.ChartRows != null && this.MedicationChartControl.ChartRows.Count > 0)
            this.MedicationChartControl.ChartRows.Clear();
        this.LoadMedicationChart();
    }
    // cmdFluidBalance_Click(e): void {
    //     Common.LaunchFBChart();
    // }
    cmdTechValidate_Click(e): void {
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
        sQuery += "&CallingFrom=" + CConstants.sTabChartKey;
        sQuery += "&ENCTYPE=" + PatientContext.EncounterType;
        if (PatientContext.EncounterOid > 0)
            sQuery += "&RequestLockOID=" + PatientContext.EncounterOid;
        else sQuery += "&RequestLockOID=" + ChartContext.EncounterOID;
        let bIsLocked: boolean = false;
        let MedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
        MedAdminVM.CheckPessimisticLock((o) => { bIsLocked = o; });
        if (!bIsLocked) {
            let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", PatientContext.EncounterOid, "MedTVInpatient", Common.nLockDuration), 'string');
            MedAdminVM.sLastCACode = sMenuCode;
            //  MedAdminVM.PropertyChanged -= obj_PropertyChanged;
            MedAdminVM.PropertyChanged = (s, e) => { this.obj_PropertyChanged(s, e); };
            MedAdminVM.LaunchWizard(sMenuCode, sQuery, 2, 950, 1920);
        }
    }
    cmdRequestMedication_Click(e): void {
        //MedRequest
        // if (!this.IsReqMedicationLaunched)
        {
            let pHeight = 809;
            let pWidth = 1920;
            this.IsReqMedicationLaunched = true;
            let sMenuCode: string = String.Empty;
            let CACode: string = String.Empty;
            MedChartData.CalledFrom = String.Empty;
            CACode = "MN_MEDCHART";
            sMenuCode = CConstants.RequestMedication;
            let sQuery: string = "&MenuCode=" + sMenuCode;
            sQuery += "&PATIENTOID=" + PatientContext.PatientOID;
            if (PatientContext.EncounterOid > 0)
                sQuery += "&EncounterOID=" + PatientContext.EncounterOid;
            else sQuery += "&EncounterOID=" + ChartContext.EncounterOID;
            sQuery += "&ChartPatientOID=" + ChartContext.PatientOID;
            sQuery += "&PrescType=" + PrescriptionTypes.ForAdministration;
            sQuery += "&PRESCRIPTIONOID=" + "";
            sQuery += "&LaunchFrom=" + CACode;
            sQuery += "&CallingFrom=" + CConstants.sTabChartKey;
            sQuery += "&ENCTYPE=" + PatientContext.EncounterType;
            sQuery += "&SRVCPOINTOID=" + MedChartData.ServiceOID.ToString();
            sQuery += "&LocationOID=" + MedChartData.LocationOID.ToString();
            if (!String.IsNullOrEmpty(AppContextInfo.JobRoleOID)) {
                sQuery += "&JobRoleOID=" + AppContextInfo.JobRoleOID;
            }
            let MedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
            MedAdminVM.sLastCACode = sMenuCode;
            // MedAdminVM.PropertyChanged -= obj_PropertyChanged;
            MedAdminVM.PropertyChanged = (s, e) => { this.obj_PropertyChanged(s, e); };
            MedAdminVM.LaunchWizard(sMenuCode, sQuery, 2, pHeight, pWidth);
        }
    }
    showIcon_Click(sender: Object): void {
        this.showPopup = !this.showPopup;
        this.showIcon.IsHitTestVisible = false;
        let btnLegend: Button = ObjectHelper.CreateType<Button>(sender, Button);
        let btnTop: number;
        if(this.showPopup)
        ObjectHelper.stopFinishAndCancelEvent(true);
        else
        ObjectHelper.stopFinishAndCancelEvent(false);
        if (btnLegend != null && this.LgndClickCount % 2 == 0) {
            this.SeedCanvas.Visibility = Visibility.Visible;
            //Below code are commented, we are not going to support TransformToVisual and animation #36610
            // let gt: GeneralTransform = btnLegend.TransformToVisual(this);
            // let btnOffset: Point = gt.Transform(new Point(0, 0));
            //btnTop = btnOffset.Y;
            let height: number = btnTop - 370;
            this.SeedCanvas.Margin = new Thickness(235, height, 0, 0);
            this.LegendsLayoutRoot.Visibility = Visibility.Visible;
            this.NotGivenReasonsLayoutRoot.Visibility = Visibility.Collapsed;
        }
    }
    @HostListener("document:click", ["$event"])
    public documentClick(event: KeyboardEvent): void {
        if (!this.contains(event.target)) {
            if(this.showPopup)
            ObjectHelper.stopFinishAndCancelEvent(false);
            this.showPopup = false;
        }
    }
    private contains(target: EventTarget): boolean {
        return (
            this.showIcon.searchElement.nativeElement.contains(target) ||
            (this.popup ? this.popup.nativeElement.contains(target) : false)
        );
    }
    popup_Opened(): void {
        this._PopupParent = MedsAdminChartView.FindHighestAncestor(this.popup);
        if (this._PopupParent == null) {
            return
        }
        this.LgndClickCount++;
        //  this._PopupParent.AddHandler(Popup.MouseLeftButtonDownEvent, this.popup_MouseLeftButtonDown, true);
    }
    popup_Closed(): void {
        if (this._PopupParent == null) {
            return
        }
        this.LgndClickCount--;
        // this._PopupParent.RemoveHandler(Popup.MouseLeftButtonDownEvent, this.popup_MouseLeftButtonDown);
        this.showIcon.IsHitTestVisible = true;
    }
    popup_MouseLeftButtonDown(): void {
        //Shiva said Below code is commented because we are not going to do storyboard and animation 
        // let storyboard = ObjectHelper.CreateObject(new Storyboard(), { Duration: TimeSpan.Zero });
        // let objectAnimation = ObjectHelper.CreateObject(new ObjectAnimationUsingKeyFrames(), { Duration: TimeSpan.Zero });
        // objectAnimation.KeyFrames.Add(ObjectHelper.CreateObject(new DiscreteObjectKeyFrame(), { KeyTime: KeyTime.FromTimeSpan(TimeSpan.Zero), Value: false }));
        // Storyboard.SetTarget(objectAnimation, this.popup);
        // Storyboard.SetTargetProperty(objectAnimation, new PropertyPath("IsOpen"));
        // storyboard.Children.Add(objectAnimation);
        // storyboard.Begin();
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
    notGivenLegendIcon_Click(e): void {
        this.LegendsLayoutRoot.Visibility = Visibility.Collapsed;
        this.NotGivenReasonsLayoutRoot.Visibility = Visibility.Visible;
    }
    LegendsIcon_Click(e): void {
        this.LegendsLayoutRoot.Visibility = Visibility.Visible;
        this.NotGivenReasonsLayoutRoot.Visibility = Visibility.Collapsed;
    }
    private RefreshMedChartForPresItemStatusChange(CurrentPrescriptionItemStatus: string): void {
        if (this.oClickedSlotTagObject != null && this.oClickedSlotTagObject.oDrugItem != null && this.oClickedSlotTagObject.oDrugItem.Tag != null) {
            let oTagDrugHeaderDetails: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(this.oClickedSlotTagObject.oDrugItem.Tag, TagDrugHeaderDetail);
            if (oTagDrugHeaderDetails != null && !String.IsNullOrEmpty(CurrentPrescriptionItemStatus) && !String.IsNullOrEmpty(oTagDrugHeaderDetails.PrescriptionItemStatus)) {
                let _itemPreviousStatus: string = oTagDrugHeaderDetails.PrescriptionItemStatus;
                let _itemNewStatus: string = CurrentPrescriptionItemStatus;
                if ((!String.Equals(_itemPreviousStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) && String.Equals(_itemNewStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase)) || (String.Equals(_itemPreviousStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(_itemNewStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase))) {
                    this.RefreshMedChart();
                }
            }
        }
    }
    private RefreshMedChart(): void {
        this.MedicationChartControl.ChartRows.Clear();
        this.MedicationChartControl.NoRecordsDisplayText = "Loading";
        this.lblOverdueNumber.Text = String.Empty;
        this.lblDueNumber.Text = String.Empty;
        this.lblAsRequiredNumber.Text = String.Empty;
        MedChartData.PatinetInfo = Common.GetPatientInfo();
        Busyindicator.SetStatusBusy("MedChart");
        this.LoadMedicationChart();
        let MedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
        if (MedAdminVM != null) {
            MedAdminVM.SetHeightweightPopUp();
        }
    }
    private LaunchWithOutClerkPromptCA(): void {
        if (!Common.IsLockedByAnyUser()) {
            let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", PatientContext.EncounterOid, "MedPrescribeClerking", Common.nLockDuration), 'string');
            if (!String.Equals(sResult, "false", StringComparison.InvariantCultureIgnoreCase)) {
                this.OnPrescribelaunch(PrescriptionTypesMenuCode.Clerking, PatientContext.EncounterOid.ToString(), PatientContext.EncounterType);
            }
            this._ISCanWithoutClerkPrompt = false;
        }
    }
    public OnClosePrescribeCareActivityEventCompleted(LastLaunchCA: string, CurrentlaunchCA: string, IsAutoSaveGPC: boolean): void {
        this._ISCanWithoutClerkPrompt = IsAutoSaveGPC;
        this.LaunchWithOutClerkPromptCA();
    }
    public barcodeStyleFocus = false;
	public barCodeVisibilityFlag = true;
    public barCodeReadOnlyFlag = false;
    txtBarcode_KeyDown(e): void {
        let oManageBarcodeHelper: ManageBarcodeHelper = new ManageBarcodeHelper();
        let lnPrescriptionItemScheduleOID: number = 0;
        oManageBarcodeHelper.GetPatientQuickSearchDetails(e.target.value, lnPrescriptionItemScheduleOID);
        setTimeout(() => {
            e.target.value = String.Empty;
        }, 400); 
    }
    cmdWristbandScan_Click(e): void {
        this.txtBarcode.nativeElement.focus();
    }
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
        let oMedicationAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
        if (oMedicationAdminVM != null) {
            if (oMedicationAdminVM.CumulativeParacetamol != null) {
                //   oMedicationAdminVM.CumulativeParacetamol.RefreshCumulativeWarningEvent -= this.ParaChangedEvent;
            }
            // oMedicationAdminVM.InfAlertUnNoticedMsgEventCompleted -= this.InfAlertUnNoticedMsgEvent;
            // oMedicationAdminVM.OnRecordPGDlaunch -= RecordPGDLaunch;
            // oMedicationAdminVM.OnInpatientlaunch -= OnInpatientlaunch;
            // oMedicationAdminVM.OnClerkSourceLaunch -= LaunchPrescribeCareActivity;
            // oMedicationAdminVM.PropertyChanged -= obj_PropertyChanged;       
        }
        if (this.objMedsAdminCommonData != null)
            //  this.objMedsAdminCommonData.MedsAdminCommonDataCompleted -= objMedsAdminCommonData_MedsAdminCommonDataCompleted;
            if (this.oGetMedsChartData != null)
                //   this.oGetMedsChartData.MedsAdminChartDataCompleted -= oGetMedsChartData_MedsAdminChartDataCompleted;
                if (this.MedicationChartControl != null) {
                    // this.MedicationChartControl.OnHotSpotClick -= MedicationChartControl_OnHotSpotClick;
                    // this.MedicationChartControl.OnDrugHotSpotClick -= MedicationChartControl_OnDrugHotSpotClick;
                    // this.MedicationChartControl.OnSlotHotSpotClick -= MedicationChartControl_OnSlotHotSpotClick;
                }
        if (this.iMsgBox != null)
            // this.iMsgBox.MessageBoxClose -= iMsgBox_MessageBoxClose;
            if (this.MultiDoseDetailVM != null)
                //   this.MultiDoseDetailVM.TitratedDoseCompleted -= MultiDoseDetailVM_TitratedDoseCompleted;
                if (this.oMAST != null)
                    // this.oMAST.IsSlotUpdatedEvent -= oMAST_IsSlotUpdatedEvent;
                    if (this.oMedsAdminRec != null)
                        // this.oMedsAdminRec.OnRecAdminFinishEvent -= oMedsAdminRec_OnRecAdminFinishEvent;
                        if (this.objpgdadminstrationvm != null) {
                            // this.objpgdadminstrationvm.IsPGDListAvailableEvent -= objpgdadminstrationvm_IsPGDListAvailableEvent;
                            // this.objpgdadminstrationvm.CheckRecordPGDEvent -= objpgdadminstrationvm_CheckRecordPGDEvent;
                        }
        if (this.msg != null) {
            // this.msg.MessageBoxClose -= PrintChart_MessageBoxClose;
            // this.msg.MessageBoxClose -= RecordPgdLaunch_MessageBoxClose;
            // this.msg.MessageBoxClose -= ClinicalEncounterAlert_MessageBoxClose;
            // this.msg.MessageBoxClose -= InpatientClickWarning_MessageBoxClose;
            // this.msg.MessageBoxClose -= MedPrescribeOpenSec_MessageBoxClose;
        }
    }
    public InfusionTabSwitch(): void {
        let oFauxTab: iTab = (ObjectHelper.CreateType<iTabItem>(this.Parent, iTabItem)) != null ? ObjectHelper.CreateType<iTab>((ObjectHelper.CreateType<iTabItem>(this.Parent, iTabItem)).Parent, iTab) : null;
        if (oFauxTab != null) {
            let oFauxTabItem: iTabItem = oFauxTab.GetItem(CConstants.sTabInfusionKey);
            if (oFauxTabItem instanceof iTabItem && oFauxTabItem.Key == CConstants.sTabInfusionKey) {
                oFauxTab.Click(oFauxTabItem.Key, true);
            }
        }
    }
    public DisposeFormObjects(): void {
        this._PopupParent = null;
        this.objStepped = null;
        this.objMedsAdminCommonData = null;
        this.MedicationChartControl = null;
        this.oGetMedsChartData = null;
        this.oTagSlotDetail = null;
        this.oClickedSlotTagObject = null;
        this.oTagDrugHeaderDetail = null;
        this.objpgdadminstrationvm = null;
        this.objpgdadminvm = null;
        this.objrecordadmininfsuion = null;
        this.objRecordPGD = null;
        this.objMedsAdminSelfAdmin = null;
        this.msg = null;
        this.oSlotVM = null;
        this.SlotTagObject = null;
        this.ParaChangedEvent = null;
        this.InfAlertUnNoticedMsgEvent = null;
        this.oMedicationAdminVM = null;
        this.ddetChild = null;
        this.objTitrated = null;
        this.oMAST = null;
        this.oMAModorST = null;
        this.oChildWindow = null;
        this.oMedsAdminMS = null;
        this.oMedsAdminPRN = null;
        this.oMedsAdminRec = null;
        this.oMedsAdminRecinfusion = null;
        this.oMedsAdminSlotHistory = null;
        this.objadmininmedicalgas = null;
        this.oMedMCItems = null;
        this.MedRequestMed = null;
    }
}
