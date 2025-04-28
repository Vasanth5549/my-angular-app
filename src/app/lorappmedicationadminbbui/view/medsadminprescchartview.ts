import { AfterViewInit, Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, ScriptObject, SLQueryCollection} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, Visibility, List, ChildWindow, ObservableCollection, HtmlPage, ChildWizardCloseEventargs, CListItem, IEnumerable } from 'epma-platform/models';
import { AppDialog, Border, EventArgs, Grid, MouseButtonEventArgs, Run, ScrollViewer, SolidColorBrush, TextBlock, UserControl, iButton, iCheckBox, iLabel, iRadioButton, Colors } from 'epma-platform/controls';
import { StackPanel } from 'src/app/shared/epma-platform/controls-model/StackPanel';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime, { DateTimeKind } from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate, AppLoadService } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { Common, MedsAdminCommonData } from '../utilities/common';
import { medddetailsChild } from 'src/app/lorappmedicationcommonbb/child/medddetailschild';
import { iMedicationChart } from 'src/app/lorarcbluebirdmedicationchart/iMedicationChart/iMedicationChart.component';
import { GetMedsChartData } from '../common/getmedschartdata';
import { ReviewPeriodVM } from 'src/app/lorappmedicationcommonbb/viewmodel/ReviewPeriodVM';
import { FrameworkElement, RoutedEventArgs, Thickness } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { RowDefinition } from 'src/app/shared/epma-platform/controls/epma-grid/epma-grid.component';
import { ProfileData, UserPermissions } from '../utilities/ProfileData';
import { PrescriptionChartVM } from '../ca/prescriptionchart/prescriptionchartvm';
import { ChartRow } from 'src/app/lorarcbluebirdmedicationchart/common/ChartRow';
import { TagObject } from 'src/app/lorarcbluebirdmedicationchart/common/TagObject';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { ReviewOutcomeVM } from 'src/app/lorappmedicationcommonbb/viewmodel/reviewoutcomevm';
//import { MedChartData as commonMedChartData} from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import { ChartContext, MedChartData, MedChartDefaultData, TagDrugHeaderDetail, TagSlotDetail, ValueDomainValues } from '../utilities/globalvariable';
//import {MedChartData as commonMedChartData} from 'src/app/lorappmedicationcommonbb/utilities/globalvariable.ts';
import { OverViewChartData, SlotDetailVM } from '../viewmodel/MedicationChartVM';
import { MedTitratedDose } from 'src/app/lorappmedicationcommonbb/view/medtitrateddose';
//import { EnterTitratedDose } from '../resource/entertitrateddose.designer';
import { MedsAdminSlotHistory } from 'src/app/lorappmedicationcommonbb/child/medsadminslothistory';
import { medMCItems } from 'src/app/lorappmedicationcommonbb/view/medmcitems';
import { ChartCell } from 'src/app/lorarcbluebirdmedicationchart/common/ChartCell';
import { MedsAdminMultiSlotVM, OmitSlotsVM, ReinstateVM, TitratedDoseVM } from '../viewmodel/MedsAdminVM';
import { CReqMsgWhenOmitLaunch, CResMsgWhenOmitLaunch, Encounter, MedicationAdministrationWSSoapClient, OmitLaunchParams, OmitSlotsParams, SlotData, WhenOmitLaunchCompletedEventArgs } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { AdminstrativeTimesVM } from 'src/app/lorappmedicationcommonbb/viewmodel/adminstrativetimesvm';
import { MedDoseDetails } from 'src/app/lorappmedicationcommonbb/view/meddosedetails';
import { MultipleDoseDetail, PrescriptionItemDetailsVM } from 'src/app/lorappmedicationcommonbb/viewmodel/prescriptionitemdetailsvm';
import { CommPrescriptionItemViewVM } from 'src/app/lorappmedicationcommonbb/viewmodel/prescriptionitemviewvm';
import { Canvas } from 'src/app/shared/epma-platform/controls/epma-canvas/epma-canvas.component';
import { Align, PopupComponent } from '@progress/kendo-angular-popup';
import { CommonBB, LzoWizardAction } from 'src/app/lorappcommonbb/utilities/common';
import { AppContextInfo, AppSessionInfo, ClerkFormViewDeftBehaviour, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { CConstants, ChartType, DoseTypeCode, InfusionTypesCode, MedAction, MedImage, MedImages, PrescriptionTypes, PrescriptionTypesMenuCode, SlotStatus, SlotStatusText } from '../utilities/CConstants';
import { MedicationCommonProfileData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { LineBreak } from 'src/app/shared/epma-platform/controls/Control';
import { MedsAdminChartToolTip } from '../resource/medsadmincharttooltip.designer';
import { ChartIcon } from 'src/app/lorarcbluebirdmedicationchart/common/ChartIcon';
import { DoseOverviewSlot } from 'src/app/lorarcbluebirdmedicationchart/common/DoseOverViewSlot';
import { InfusionTypeCode, SVIconLaunchFrom } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { ConditionalDoseVM, RequestSource } from 'src/app/lorappmedicationcommonbb/viewmodel/ConditionalDoseVM';
// import { MultipleDoseDetail } from 'src/app/lorappmanageprescriptionbbui/viewmodel/MultipleDoseDetail';
import { MedConditionalDose } from 'src/app/lorappmedicationcommonbb/view/medconditionaldose';
import { Resource } from '../resource';
import { MedicationAdministrator } from '../resource/medicationadministrator.designer';
import { CCommSequentialHelper } from 'src/app/lorappmedicationcommonbb/utilities/CSequentialHelper';
import { MedsAdminPRNSlot } from '../child/MedsAdminPRNSlot';
import { CDrugHdrAddnlInfo, CDrugHeader, DrugHeader, DrugHeaderItem } from '../common/drugheader';
import { LockedUsersDetails, MedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { Environment } from 'src/app/product/shared/models/Common';
import { DrugItem } from 'src/app/lorarcbluebirdmedicationchart/common/DrugItem';
import { GrdDiscontinueCancelCols, SelectedPrescriptionItemVM } from 'src/app/lorappmedicationcommonbb/viewmodel/discontinuecancelvm';
import { CReqMsgGetFormViewControls, CResMsgGetFormViewControls, FormViewCriteria, GetFormViewControlsCompletedEventArgs, ManagePrescriptionWSSoapClient } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import { ArrayOfLong, CReqMsgGetScheduleTimeAndFreq, GetScheduleTimeAndFreqCompletedEventArgs, IPPFrequency, IPPScheduledetails, ManageReviewPeriod } from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { IChartSlot } from 'src/app/lorarcbluebirdmedicationchart/common/IChartSlot';
//import { LaunchWizard } from 'src/app/shared/epma-platform/models/launchwizard';
import * as IPPManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import * as IPPMAManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { medReviewChild } from 'src/app/lorappmedicationcommonbb/child/medReviewChild';
import { ReviewOutcome } from 'src/app/lorappmedicationcommonbb/child/reviewoutcome';
import { MedsAdminReinstateslots } from '../child/MedsAdminReinstateslots';
import { MedSortFilterbyOptions } from '../child/MedSortFilterbyOptions';
import { AdministratedSlot } from 'src/app/lorarcbluebirdmedicationchart/common/AdministratedSlot';
import { VisualTreeHelper } from 'src/app/shared/epma-platform/models/eppma-common-types';
import { MedSteppedFullPrescriptionVW } from 'src/app/lorappmedicationcommonbb/view/medSteppedFullPrescriptionVW';
import { MedsadminOmitslots } from '../child/medsadminomitslots';
import { EnterTitratedDose } from '../child/EnterTitratedDose';
import { Button } from '@progress/kendo-angular-buttons';
import { ContextInfo } from 'src/app/product/shared/models/Commonbbglobalvariable';
import { WebServiceURLMedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import { meddiscontinuecancelChild } from 'src/app/lorappmedicationcommonbb/child/meddiscontinuecancelchild';
import { GridExtension } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { ClerkFormViewDefault } from 'src/app/lorappmanageprescriptionbbui/utilities/constants';
import { CReqMsgGetClinicalEncountersDetail, GetClinicalEncountersDetailCompletedEventArgs, IPPMAManagePrescriptionWSSoapClient } from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';

@Component({
  selector: 'medsadminprescchartview',
  templateUrl: './medsadminprescchartview.html',
  styleUrls: ['./medsadminprescchartview.css'],
})
export class MedsAdminPrescChartView extends UserControl implements OnInit,AfterViewInit {
  public oMedsAdminPrescChartView = Resource.MedsAdminPrescChartView;
  public CondRes = Resource.ConditionalRegime;

        objStepped: MedSteppedFullPrescriptionVW; //34284 revisit // temp file got assiged person(Kannan)
        objMedsAdminCommonData: MedsAdminCommonData = null;
        omedsadminOmitSlots: MedsadminOmitslots; 
        omedsadminReinstateslots: MedsAdminReinstateslots; //35490 file got from Athulya
        ddetChild: medddetailsChild;
        //medChartOverview: iMedicationChart = new iMedicationChart();
        medChartOverview: iMedicationChart = null;
        msg: iMessageBox;
        oGetMedsChartData: GetMedsChartData;
        oSortFilterOpt: MedSortFilterbyOptions; 
        StartDate: DateTime;
        EndDate: DateTime;
        omedReviewChild: medReviewChild; //35300  D stub created by suresh
        oreviewvm: ReviewPeriodVM;
        oManageReviewPeriod: ManageReviewPeriod;
        oReviewOutcome: ReviewOutcome; //34431 stub created by suresh
        oReviewOutcomeVM: ReviewOutcomeVM;
        oChartRow: ChartRow;
        sPrescriptionItemName: string = String.Empty;
        objtagheader: TagDrugHeaderDetail;
        IsReviewPeriodMandatory: boolean = false;
        DynamicFormReviewMandatoryFetched: boolean = false;
        objFrequencyDetails:IPPFrequency;
        objScheduletimes: ObservableCollection<IPPScheduledetails>;
        IsReviewIntiateOKClick: boolean = false;
        sPrescritionOIDs: StringBuilder;
        sMultipleIdentifyingOid: StringBuilder;
        sMultipleIdentifyingType: StringBuilder;
        SupplyComments: String = String.Empty;
        SupplyInstructions: String = String.Empty;
        SupplyRouteOID: String = String.Empty;
        SupplyFormOID: String = String.Empty;
        SupplyLorenzoID: String = String.Empty;
        SupplyIdentifyingOID: String = String.Empty;
        SupplyIdentifyingName: String = String.Empty;
        SupplyIdentifyingType: String = String.Empty;
        sDrugHeaderFormat: string = "dd MMM";
        static sDateFormat: String = "dd/MM/yyyy";
        static sEncDateFormat: String = "dd-MMM-yyyy";
        static dTodayColWidth: number = 50;
        static dColWidth: number = 43;
        static d7DayColWidth: number = 84;
        static d7DayTodayColWidth: number = 92;
        oOverViewChartData: OverViewChartData = new OverViewChartData(); // To be Revisit
        oRefreshTagObject: TagObject = null;
        sp: StackPanel = null;
        oSDVM: SlotDetailVM = null;
        objTitrated: MedTitratedDose;
        nSlotSelectedCountForOmit: number = 0;
        nSlotSelectedCountForReinstate: number = 0;
        nSlotSelectedCountForEnterDose: number = 0;
        nInvalidSlotSelectedCount: number = 0;
        private static CONTS_OMITSLOTS: String = "OMITSLOTS";
        private static CONTS_REINSTATESLOTS: String = "REINSTATESLOTS";
        private static CONTS_TITRATEDSLOTS: String = "TITRATEDSLOT";
        dtServerDate: DateTime;
        doseType: string = String.Empty;
        private oChildWindow: ChildWindow;
        private oEnterTitratedDose: EnterTitratedDose;  
        private isClearPreviousSelection: boolean = false;
        oPrescriptionChartVM: PrescriptionChartVM;
        oMedsAdminSlotHistory: MedsAdminSlotHistory;
        oMedMCItems: medMCItems;
        sMedViewOptionValue: string = String.Empty;
        dtCurrentDateTime: DateTime= CommonBB.GetServerDateTime();
        private LgndClickCount: number = 0;
        private _PopupParent: FrameworkElement;
        sLockingMessage: String = String.Empty;
        sKeyCodeValues: String = String.Empty;
        IsHistoryChartIconClicked: boolean = false;
        IsMedicationSelected: boolean = false;
        IsPastSelected: boolean = false;
        IsFutureSlotOmitted: boolean = false;
        IsPastOmitSlotSelected: boolean = false;
        nSlotsActiveCount: number = 0;
        StartDateTime: DateTime= DateTime.MinValue;
        EndDateTime: DateTime= DateTime.MinValue;
        PresItemStatus: string = String.Empty;
        FrqPerCode: string = String.Empty;
        DrugKey: String = String.Empty;
        oChartCellCall: ChartCell;
        SelectedRow: number = 0;
        oChartRowForDoseCal: ChartRow;
        IsReviewHighlighted: boolean = false;
        IsFutslotsomittedIndef: boolean = false;
        public SelectedReinstateRow: ChartRow;
        public SelectedOmittedRow: ChartRow;
        reinst: ReinstateVM;
        IsOmitReinstateReviewClicked: boolean = false;
        IsTitratedIconClicked: boolean = false;
        olstSlotDat: ObservableCollection<SlotData>;
        AdminTimeVM: AdminstrativeTimesVM;
        IsCanLaunchClerk: boolean = false;
        SupplyStrengthText: String = String.Empty;
        SupplyRouteOIDs: string = String.Empty;
        objDosecalc: MedDoseDetails;
        objPrescitemdetvm: PrescriptionItemDetailsVM;
        lGroupSeqNo: number;
        objCommPrescriptionItemViewVM: CommPrescriptionItemViewVM;
        bIsInfDiscontinue: boolean = false;
        bIsOrdDiscontinue: boolean = false;

        LayoutRoot: Grid = new Grid();

        medicationControlLoaded: boolean = false; // added new to be revisit
        IsDiscontinueChecked:boolean = true; // added new to be revisit
@ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid){
    if(c){ this.LayoutRoot  = c; }
};
private SeedCanvas: Canvas;
@ViewChild("SeedCanvasTempRef", {read:Canvas, static: false }) set _SeedCanvas(c: Canvas){
    if(c){ this.SeedCanvas  = c; }
};
//private popup: Popup;
// @ViewChild("popupTempRef", {read:Popup, static: false }) set _popup(c: Popup){
//   if(c){ this.popup  = c; }
// };
private popup:PopupComponent
@ViewChild("popupTempRef", {read:PopupComponent, static: false }) set _popup(c: PopupComponent){
    if(c){ this.popup  = c; }
};

private mc:iMedicationChart
@ViewChild("medChartOverviewTempRef", {read:iMedicationChart, static: false }) set _mc(c: iMedicationChart){    
    if(c){
    this.mc  = c; 
    this.medChartOverview = c;
    }
};

private Brd: Border;
@ViewChild("BrdTempRef", {read:Border, static: false }) set _Brd(c: Border){
    if(c){ this.Brd  = c; }
};
private LayoutRoot1: Grid;
@ViewChild("LayoutRoot1TempRef", {read:Grid, static: false }) set _LayoutRoot1(c: Grid){
    if(c){ this.LayoutRoot1  = c; }
};
cmdDischarge: iButton = new iButton;
@ViewChild("cmdDischargeTempRef", {read:iButton, static: false }) set _cmdDischarge(c: iButton){
    if(c){ this.cmdDischarge  = c; }
};
cmdClinicallyVerfiy: iButton = new iButton;
@ViewChild("cmdClinicallyVerfiyTempRef", {read:iButton, static: false }) set _cmdClinicallyVerfiy(c: iButton){
    if(c){ this.cmdClinicallyVerfiy  = c; }
};
cmdTechValidate: iButton = new iButton;
@ViewChild("cmdTechValidateTempRef", {read:iButton, static: false }) set _cmdTechValidate(c: iButton){
    if(c){ this.cmdTechValidate  = c; }
};
cmdSupplyInstructions: iButton = new iButton;
@ViewChild("cmdSupplyInstructionsTempRef", {read:iButton, static: false }) set _cmdSupplyInstructions(c: iButton){
    if(c){ this.cmdSupplyInstructions  = c; }
};
// cmdFluidBalance: iButton = new iButton;
// @ViewChild("cmdFluidBalanceTempRef", {read:iButton, static: false }) set _cmdFluidBalance(c: iButton){
//     if(c){ this.cmdFluidBalance  = c; }
// };
public InnerGrid: Grid;
@ViewChild("InnerGridTempRef", {read:Grid, static: false }) set _InnerGrid(c: Grid){
    if(c){ this.InnerGrid  = c; }
};
private RowChart: RowDefinition;
@ViewChild("RowChartTempRef", {read:RowDefinition, static: false }) set _RowChart(c: RowDefinition){
    if(c){ this.RowChart  = c; }
};
private InnerGrid1: Grid;
@ViewChild("InnerGrid1TempRef", {read:Grid, static: false }) set _InnerGrid1(c: Grid){
    if(c){ this.InnerGrid1  = c; }
};
private btnHeightweightPopUp: iButton;
@ViewChild("btnHeightweightPopUpTempRef", {read:iButton, static: false }) set _btnHeightweightPopUp(c: iButton){
    if(c){ this.btnHeightweightPopUp  = c; }
};
private lblDSTClockNotifier: iLabel;
@ViewChild("lblDSTClockNotifierTempRef", {read:iLabel, static: false }) set _lblDSTClockNotifier(c: iLabel){
    if(c){ this.lblDSTClockNotifier  = c; }
};
public lblAuthoriseNotifier: iLabel;
@ViewChild("lblAuthoriseNotifierTempRef", {read:iLabel, static: false }) set _lblAuthoriseNotifier(c: iLabel){
    if(c){ this.lblAuthoriseNotifier  = c; }
};
private Brda: Border;
@ViewChild("BrdaTempRef", {read:Border, static: false }) set _Brda(c: Border){
    if(c){ this.Brda  = c; }
};
private lblPatientHtWtBSA: iLabel;
@ViewChild("lblPatientHtWtBSATempRef", {read:iLabel, static: false }) set _lblPatientHtWtBSA(c: iLabel){
    if(c){ this.lblPatientHtWtBSA  = c; }
};
private svwEncounterInfo: ScrollViewer;
@ViewChild("svwEncounterInfoTempRef", {read:ScrollViewer, static: false }) set _svwEncounterInfo(c: ScrollViewer){
    if(c){ this.svwEncounterInfo  = c; }
};
private lblEncounterInfo: TextBlock;
@ViewChild("lblEncounterInfoTempRef", {read:TextBlock, static: false }) set _lblEncounterInfo(c: TextBlock){
    if(c){ this.lblEncounterInfo  = c; }
};
private lblSortFilter: iButton;
@ViewChild("lblSortFilterTempRef", {read:iButton, static: false }) set _lblSortFilter(c: iButton){
    if(c){ this.lblSortFilter  = c; }
};
private iRdb7day: iRadioButton;
@ViewChild("iRdb7dayTempRef", {read:iRadioButton, static: false }) set _iRdb7day(c: iRadioButton){
    if(c){ this.iRdb7day  = c; }
};
private iRdb14day: iRadioButton;
@ViewChild("iRdb14dayTempRef", {read:iRadioButton, static: false }) set _iRdb14day(c: iRadioButton){
    if(c){ this.iRdb14day  = c; }
};
private chkIncludeDiscontinue: iCheckBox;
@ViewChild("chkIncludeDiscontinueTempRef", {read:iCheckBox, static: false }) set _chkIncludeDiscontinue(c: iCheckBox){
    if(c){ this.chkIncludeDiscontinue  = c; }
};
cmdToday: iButton;
@ViewChild("cmdTodayTempRef", {read:iButton, static: false }) set _cmdToday(c: iButton){
    if(c){ this.cmdToday  = c; }
};
cmdPrevWeek: iButton;
@ViewChild("cmdPrevWeekTempRef", {read:iButton, static: false }) set _cmdPrevWeek(c: iButton){
    if(c){ this.cmdPrevWeek  = c; }
};
cmdPrevDay: iButton;
@ViewChild("cmdPrevDayTempRef", {read:iButton, static: false }) set _cmdPrevDay(c: iButton){
    if(c){ this.cmdPrevDay  = c; }
};
cmdNextDay: iButton;
@ViewChild("cmdNextDayTempRef", {read:iButton, static: false }) set _cmdNextDay(c: iButton){
    if(c){ this.cmdNextDay  = c; }
};
cmdNextWeek: iButton;
@ViewChild("cmdNextWeekTempRef", {read:iButton, static: false }) set _cmdNextWeek(c: iButton){
    if(c){ this.cmdNextWeek  = c; }
};
cmdOmit: iButton;
@ViewChild("cmdOmitTempRef", {read:iButton, static: false }) set _cmdOmit(c: iButton){
    if(c){ this.cmdOmit  = c; }
};
 cmdReinstate: iButton;
@ViewChild("cmdReinstateTempRef", {read:iButton, static: false }) set _cmdReinstate(c: iButton){
    if(c){ this.cmdReinstate  = c; }
};
cmdEnterDose: iButton;
@ViewChild("cmdEnterDoseTempRef", {read:iButton, static: false }) set _cmdEnterDose(c: iButton){
    if(c){ this.cmdEnterDose  = c; }
};
cmdClearSelection: iButton;
@ViewChild("cmdClearSelectionTempRef", {read:iButton, static: false }) set _cmdClearSelection(c: iButton){
    if(c){ this.cmdClearSelection  = c; }
};
cmdAmend: iButton;
@ViewChild("cmdAmendTempRef", {read:iButton, static: false }) set _cmdAmend(c: iButton){
    if(c){ this.cmdAmend  = c; }
};
 cmdDiscontinueCancel: iButton;
@ViewChild("cmdDiscontinueCancelTempRef", {read:iButton, static: false }) set _cmdDiscontinueCancel(c: iButton){
    if(c){ this.cmdDiscontinueCancel  = c; }
};
private cmdInpatient: iButton;
@ViewChild("cmdInpatientTempRef", {read:iButton, static: false }) set _cmdInpatient(c: iButton){
    if(c){ this.cmdInpatient  = c; }
};
cmdReview: iButton;
@ViewChild("cmdReviewTempRef", {read:iButton, static: false }) set _cmdReview(c: iButton){
    if(c){ this.cmdReview  = c; }
};
private cmdObservationsResults: iButton;
@ViewChild("cmdObservationsResultsTempRef", {read:iButton, static: false }) set _cmdObservationsResults(c: iButton){
    if(c){ this.cmdObservationsResults  = c; }
};
private MoreActions: iButton;
@ViewChild("MoreActionsTempRef", {read:iButton, static: false }) set _MoreActions(c: iButton){
    if(c){ this.MoreActions  = c; }
};
public doubletrigger: boolean = false;
// Popup initialzation code
// private cmdShowLegend: iButton = new iButton();
// @ViewChild("cmdShowLegendTempRef", { read: iButton, static: false }) set _cmdShowLegend(c: iButton) {
//   if (c) { this.cmdShowLegend = c; }
// };
showPopup: boolean;
public anchorAlign: Align = { horizontal: "right", vertical: "top" };
public popupAlign: Align = { horizontal: "left", vertical: "bottom" };
// End
override _DataContext: PrescriptionChartVM;
    override get DataContext() {
        return this._DataContext;
    }
    @Input() override set DataContext(value: PrescriptionChartVM) {
        this._DataContext = value;
    }

  constructor() {
    console.log("prescchartview constructor onload");
    super();
  }
  ngOnInit() {
    console.log("prescchartview oninit onload");
  }
  
  @HostListener("document:click", ["$event"])
  public documentClick(event: KeyboardEvent): void {
      if (!this.contains(event.target)) {
          this.showPopup = false;
      }
  }
 
  private contains(target: EventTarget): boolean {
    return (
        this.MoreActions.searchElement.nativeElement.contains(target) ||
        (this.popup ? this.popup.contentContainer.nativeElement.contains(target) : false)
    );
}
  ngAfterViewInit(): void {
    this.objMedsAdminCommonData = new MedsAdminCommonData();
    this.objMedsAdminCommonData.CAMenucode = SLQueryCollection.GetQueryStringValue("MenuCode"); 
    this.objMedsAdminCommonData.MedsAdminCommonDataCompleted = (s,e)=>{
        this.UserControl_Loaded({}, null);
    } // To be Revisit bcoz GetProfileConfigData is not available in cs file
        this.objMedsAdminCommonData.GetProfileConfigData();
}
UserControl_Loaded(sender: Object, e: RoutedEventArgs) { 
            MedChartData.PatinetInfo = Common.GetPatientInfo();  
            this.sMedViewOptionValue = "CC_14DAYVIEW";
            this.iRdb14day.IsChecked = true;
            if (MedChartData.IsPresChartReadOnly) {
                this.LaunchPresChartReadOnlyMode();
            }
            else {
                if (UserPermissions.CanOmitSlots) {
                    this.cmdOmit.Visibility = Visibility.Visible;
                }
                if (UserPermissions.CanReinstateSlots) {
                    this.cmdReinstate.Visibility = Visibility.Visible;
                }
                if (UserPermissions.CanEnterTitratedDose) {
                    this.cmdEnterDose.Visibility = Visibility.Visible;
                }
                if (UserPermissions.CanPrescribeInpatient) {
                    this.cmdInpatient.Visibility = Visibility.Visible;
                }
                
                
                if (UserPermissions.CanAmend) {
                    this.cmdAmend.Visibility = Visibility.Visible;
                }
                if (UserPermissions.Cancanceldiscontinuedrugs || UserPermissions.CancanceldiscontinuedOwnrugs) {
                    this.cmdDiscontinueCancel.Visibility = Visibility.Visible;
                }
                if (UserPermissions.CanPrescribeDischarge) {
                    this.cmdDischarge.Visibility = Visibility.Visible;
                }
                // if (UserPermissions.CanViewFBChart) {
                //     this.cmdFluidBalance.Visibility = Visibility.Visible;
                // }
                if (UserPermissions.CanTechnicallyValidate) {
                    this.cmdTechValidate.Visibility = Visibility.Visible;
                    this.cmdSupplyInstructions.Visibility = Visibility.Visible;
                }
                if (UserPermissions.CanClinicallyVerfiy) {
                    this.cmdClinicallyVerfiy.Visibility = Visibility.Visible;
                }
                if (UserPermissions.CanReview) {
                    this.cmdReview.Visibility = Visibility.Visible;
                }
            }
            this.cmdObservationsResults.IsEnabled = false;
            if (this.medChartOverview == null) {
                if (this.chkIncludeDiscontinue != null && this.chkIncludeDiscontinue.IsChecked == true) {
                    this.dtServerDate = CommonBB.GetServerDateTime();
                    this.SetOverViewDateRange(this.dtServerDate);
                    this.FillMedChartBasicData(this.dtServerDate);
                    this.GetChartData(String.Empty, this.dtServerDate);
                }
                else this.chkIncludeDiscontinue.IsChecked = true;
            }
            this.ClearAllSelection();
            //System.Windows.Browser.HtmlPage.Plugin.Focus();
            //HtmlPage.Plugin.Focus();
            this.lblSortFilter.Focus();
            if ((String.Compare(PatientContext.EncounterType, CConstants.InpatientEncValue) == 0) || (String.Compare(PatientContext.EncounterType, CConstants.InaptientEncText) == 0)) {
                this.cmdInpatient.Text = Resource.MedsAdminPrescChartView.Inpatient_Medication;
            }
            else {
                this.cmdInpatient.Text = Resource.MedsAdminPrescChartView.For_Admin_Medication;
                this.cmdDischarge.Visibility = Visibility.Collapsed;
            }
            if ((String.IsNullOrEmpty(PatientContext.EncounterCode) || String.Compare(PatientContext.EncounterCode, CConstants.ENCstatus, StringComparison.CurrentCultureIgnoreCase) == 0)) {
                this.cmdInpatient.IsEnabled = false;
                if(this.cmdDischarge!=null)
                this.cmdDischarge.IsEnabled = false;
                this.cmdAmend.IsEnabled = false;
                this.cmdDiscontinueCancel.IsEnabled = false;
                this.cmdReview.IsEnabled = false;
            }
            if (this.DataContext instanceof PrescriptionChartVM) {
                (ObjectHelper.CreateType<PrescriptionChartVM>(this.DataContext, PrescriptionChartVM)).FillActivityConsideration();
            }
            if (this.DataContext instanceof PrescriptionChartVM) {
                (ObjectHelper.CreateType<PrescriptionChartVM>(this.DataContext, PrescriptionChartVM)).SetHeightweightPopUp();
                if (MedicationCommonProfileData.PrescribeConfig != null && MedicationCommonProfileData.PrescribeConfig.EnableDoseCalc) {
                    //(ObjectHelper.CreateType<PrescriptionChartVM>(this.DataContext, PrescriptionChartVM)).ActivityConsiderationUpdatedCompleted -= this.MedsAdminPrescChartView_ActivityConsiderationUpdatedCompleted;
                    (ObjectHelper.CreateType<PrescriptionChartVM>(this.DataContext, PrescriptionChartVM)).ActivityConsiderationUpdatedCompleted = (s, e) => {this.MedsAdminPrescChartView_ActivityConsiderationUpdatedCompleted()};
                   
                  }
            }

            this.SetClerkDefaultCode();

        }

        SetClerkDefaultCode()
        {
            if (MedicationCommonProfileData.PrescribeConfig != null &&
                !String.IsNullOrEmpty(MedicationCommonProfileData.PrescribeConfig.ClerkFormViewDefautCode)
            ) {
                if (String.Equals(MedicationCommonProfileData.PrescribeConfig.ClerkFormViewDefautCode,
                    ClerkFormViewDefault.LaunchFormMandatory)
                ) {
                    PatientContext.ClerkFormViewDefaultBehavior =
                    ClerkFormViewDeftBehaviour.LaunchFormMandatory;
                    PatientContext.PrescriptionType = PrescriptionTypes.ForAdministration;
                } else if (
                    String.Equals(
                        MedicationCommonProfileData.PrescribeConfig.ClerkFormViewDefautCode,
                        ClerkFormViewDefault.LaunchFormNoMandatory
                    )
                ) {
                    PatientContext.ClerkFormViewDefaultBehavior =
                        ClerkFormViewDeftBehaviour.LaunchFormNoMandatory;
                } else if (
                    String.Equals(
                        MedicationCommonProfileData.PrescribeConfig.ClerkFormViewDefautCode,
                        ClerkFormViewDefault.DoNotLaunchForm
                    )
                ) {
                    PatientContext.ClerkFormViewDefaultBehavior =
                        ClerkFormViewDeftBehaviour.DoNotLaunchForm;
                }
            }

        }
        private RefreshDCAlertIcon(): void {
            if (this.medChartOverview != null && this.medChartOverview.ChartRows != null && this.medChartOverview.ChartRows.Count > 0 && MedicationCommonProfileData.PrescribeConfig != null && MedicationCommonProfileData.PrescribeConfig.EnableDoseCalc && MedicationCommonProfileData.PrescribeConfig.HeightWeightChangeAlert) {
                let dtRecordHWDTTM: DateTime= DateTime.MinValue;
                if (MedChartData.PatinetInfo != null) {
                    dtRecordHWDTTM = MedChartData.PatinetInfo.DCHTRecordDTTM >= MedChartData.PatinetInfo.DCWTRecordDTTM ? MedChartData.PatinetInfo.DCHTRecordDTTM : MedChartData.PatinetInfo.DCWTRecordDTTM;
                }
                let oPresItem: List<number> = this.oGetMedsChartData.LstDrugDetail.Where(C => C.DrugHeader != null && C.DrugHeader.IsDoseCalculatedByDC && dtRecordHWDTTM.NotEquals(DateTime.MinValue) && C.DrugHeader.DCalcDTTM < dtRecordHWDTTM && !String.Equals(C.DrugHeader.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) && !String.Equals(C.DrugHeader.PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.CurrentCultureIgnoreCase) && !String.Equals(C.DrugHeader.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase)).Select(S => S.DrugHeader.PrescriptionItemOID).ToList();
                if (oPresItem != null && oPresItem.Count > 0) {
                    oPresItem.forEach( (PresItem)=> {
                        let oSelectChartRow: ChartRow = this.medChartOverview.ChartRows.Where(C => C.Key.Equals("Row-" + PresItem.ToString())).FirstOrDefault();
                        if (oSelectChartRow != null && oSelectChartRow.DrugItem != null && oSelectChartRow.DrugItem.Tag != null) {
                            let oTagObj: TagObject = new TagObject();
                            let oEmptyTagObj: TagObject = new TagObject();
                            oTagObj.oChartCell = oSelectChartRow.ChartCells.FirstOrDefault();
                            oSelectChartRow.DrugItem.DoseCalcIcon = this.LoadImage("IsDoseCalculatedByDC", MedImage.GetPath(MedImages.DoseCalculatorWithAlert));
                            this.medChartOverview.RefreshRow(oSelectChartRow, oEmptyTagObj);
                            this.medChartOverview.RefreshRow(oSelectChartRow, oTagObj);
                           // this.GetChartData(String.Empty, this.dtServerDate);
                        }
                    });
                }
            }
        }
        MedsAdminPrescChartView_ActivityConsiderationUpdatedCompleted() {
            this.RefreshDCAlertIcon();
        }
        iRdb7day_Checked(sender?: Object, e?: RoutedEventArgs): void {
            MedChartData.Is7DayView = true;
            this.dtServerDate = CommonBB.GetServerDateTime();
            if (this.StartDate.NotEquals(DateTime.MinValue)) {
                this.sMedViewOptionValue = "CC_7DAYVIEW";
                if (String.Equals(MedChartData.ChartStatus, CConstants.sChartActiveStatusCode, StringComparison.InvariantCultureIgnoreCase) || String.Equals(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.InvariantCultureIgnoreCase)) {
                    let tsCompareStartDate: TimeSpan = this.dtServerDate.Subtract(MedChartData.ActiveFrom);
                    if (tsCompareStartDate.Days > 3)
                        this.StartDate = this.dtServerDate.DateTime.AddDays(-3);
                    else this.StartDate = MedChartData.ActiveFrom.Date;
                    this.EndDate = this.StartDate.AddDays(6);
                }
                else {
                    this.StartDate = MedChartData.ActiveFrom.Date;
                    let tsCompareEndDate: TimeSpan = MedChartData.ActiveTo.Date.Subtract(this.StartDate.Date);
                    if (tsCompareEndDate.Days < 7)
                        this.oOverViewChartData.ActiveTo = this.EndDate = MedChartData.ActiveTo;
                    else this.oOverViewChartData.ActiveTo = this.EndDate = this.StartDate.AddDays(6);
                }
                this.ClearAllSelection();
                this.FillMedChartBasicData(this.dtServerDate);
                this.GetChartData(String.Empty, this.dtServerDate);
            }
        }
         iRdb14day_Checked(sender?: Object, e?: RoutedEventArgs): void {
            MedChartData.Is7DayView = false;
            if (this.StartDate.NotEquals(DateTime.MinValue)) {
                this.sMedViewOptionValue = "CC_14DAYVIEW";
                this.dtServerDate = CommonBB.GetServerDateTime();
                if (String.Equals(MedChartData.ChartStatus, CConstants.sChartActiveStatusCode, StringComparison.InvariantCultureIgnoreCase) || String.Equals(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.InvariantCultureIgnoreCase)) {
                    let tsCompareStartDate: TimeSpan = this.dtServerDate.Subtract(MedChartData.ActiveFrom);
                    if (tsCompareStartDate.Days < 7)
                        this.StartDate = MedChartData.ActiveFrom.Date;
                    else this.StartDate = this.dtServerDate.DateTime.AddDays(-6);
                    this.EndDate = this.StartDate.AddDays(13);
                }
                else {
                    this.StartDate = MedChartData.ActiveFrom.Date;
                    let tsCompareEndDate: TimeSpan = MedChartData.ActiveTo.Date.Subtract(this.StartDate.Date);
                    if (tsCompareEndDate.Days < 14)
                        this.EndDate = MedChartData.ActiveTo;
                    else this.EndDate = this.StartDate.AddDays(13);
                }
                this.ClearAllSelection();
                this.FillMedChartBasicData(this.dtServerDate);
                this.GetChartData(String.Empty, this.dtServerDate);
            }
        }
        private SetOverViewDateRange(ServerDate: DateTime): void {
            console.log("ContextManager.Instance:",ContextManager.Instance)
            let IsActiveMedChartExists: boolean = false;
            this.oOverViewChartData = new OverViewChartData();
            this.oOverViewChartData.MedChartOID = MedChartData.MedChartOID;
            this.oOverViewChartData.ChartStatus = MedChartData.ChartStatus;
            this.oOverViewChartData.IsDiscontinueChecked = true;
            this.oOverViewChartData.IsCancelChecked = false;
             this.oOverViewChartData.MedChartPatOID = ChartContext.PatientOID; // To be revisit
            //this.oOverViewChartData.MedChartPatOID = 1000000078383;
            this.iRdb14day.IsChecked = true;
            if (String.Equals(MedChartData.ChartStatus, CConstants.sChartActiveStatusCode, StringComparison.CurrentCultureIgnoreCase) || String.Equals(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.CurrentCultureIgnoreCase)) {
                IsActiveMedChartExists = true;
                let tsCompareStartDate: TimeSpan = ServerDate.Subtract(MedChartData.ActiveFrom);
                if (!String.IsNullOrEmpty(this.sMedViewOptionValue) && String.Compare(this.sMedViewOptionValue, "CC_14DAYVIEW") == 0) {
                    if (tsCompareStartDate.Days < 7)
                        this.oOverViewChartData.ActiveFrom = this.StartDate = MedChartData.ActiveFrom.Date;
                    else this.oOverViewChartData.ActiveFrom = this.StartDate = ServerDate.DateTime.AddDays(-6);
                    this.oOverViewChartData.ActiveTo = this.EndDate = this.StartDate.AddDays(13);
                }
                else {
                    if (tsCompareStartDate.Days > 3)
                        this.oOverViewChartData.ActiveFrom = this.StartDate = ServerDate.DateTime.AddDays(-3);
                    else this.oOverViewChartData.ActiveFrom = this.StartDate = MedChartData.ActiveFrom.Date;
                    this.oOverViewChartData.ActiveTo = this.EndDate = this.StartDate.AddDays(6);
                }
            }
            else if (String.Equals(MedChartData.ChartStatus, CConstants.sChartInActiveStatusCode, StringComparison.CurrentCultureIgnoreCase)) {
                if (!String.IsNullOrEmpty(this.sMedViewOptionValue) && String.Compare(this.sMedViewOptionValue, "CC_14DAYVIEW") == 0) {
                    this.oOverViewChartData.ActiveFrom = this.StartDate = MedChartData.ActiveFrom.Date;
                    let tsCompareEndDate: TimeSpan = MedChartData.ActiveTo.Subtract(MedChartData.ActiveFrom);
                    if (tsCompareEndDate.Days < 14)
                        this.oOverViewChartData.ActiveTo = this.EndDate = MedChartData.ActiveTo;
                    else this.oOverViewChartData.ActiveTo = this.EndDate = this.StartDate.AddDays(13);
                }
                else {
                    this.oOverViewChartData.ActiveFrom = this.StartDate = MedChartData.ActiveFrom.Date;
                    let tsCompareEndDate: TimeSpan = MedChartData.ActiveTo.Subtract(MedChartData.ActiveFrom);
                    if (tsCompareEndDate.Days < 7)
                        this.oOverViewChartData.ActiveTo = this.EndDate = MedChartData.ActiveTo;
                    else this.oOverViewChartData.ActiveTo = this.EndDate = this.StartDate.AddDays(6);
                }
            }
            else {
                if (!String.IsNullOrEmpty(this.sMedViewOptionValue) && String.Compare(this.sMedViewOptionValue, "CC_14DAYVIEW") == 0) {
                    MedChartData.ActiveFrom = this.oOverViewChartData.ActiveFrom = this.StartDate = ServerDate.DateTime.AddDays(-6);
                    MedChartData.ActiveTo = this.oOverViewChartData.ActiveTo = this.EndDate = this.StartDate.AddDays(13);
                }
                else {
                    MedChartData.ActiveFrom = this.oOverViewChartData.ActiveFrom = this.StartDate = ServerDate.DateTime.AddDays(-3);
                    MedChartData.ActiveTo = this.oOverViewChartData.ActiveTo = this.EndDate = this.StartDate.AddDays(6);
                }
            }
            this.cmdToday.IsEnabled = IsActiveMedChartExists;
        }
        private FillMedChartBasicData(ServerDate: DateTime): void {
            let CurrentDT: DateTime = CommonBB.GetServerDateTime();
            Busyindicator.SetStatusBusy("PrescriptionChart");
            this.cmdDiscontinueCancel.IsEnabled = false;
            this.cmdReview.IsEnabled = false;
            this.cmdAmend.IsEnabled = false;
            if (this.medChartOverview != null && this.medChartOverview.ChartRows != null)
                this.medChartOverview.ChartRows.Clear();
            if (String.Compare(MedChartData.ChartStatus, CConstants.sChartInActiveStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0) {
                //let tsCompareEndDate: TimeSpan = this.EndDate.Subtract(this.StartDate);
                let tsCompareEndDate: TimeSpan = this.EndDate.DateTime.Diff(this.StartDate);
                if (String.Compare(this.sMedViewOptionValue, "CC_14DAYVIEW") == 0) {
                    if (tsCompareEndDate.Days < 14)
                        this.EndDate = this.StartDate.AddDays(13);
                }
                else {
                    if (tsCompareEndDate.Days < 7)
                        this.EndDate = this.StartDate.AddDays(6);
                }
            }
            if (this.medChartOverview != null && this.LayoutRoot.Children.Contains(this.medChartOverview))
                this.LayoutRoot.Children.Remove(this.medChartOverview);
            this.medChartOverview = new iMedicationChart();
            this.medChartOverview.AutoGenerateColumn = true;
            // this.medChartOverview.DrugHeader = Resource.MedsAdminChartOverview.ChartDrugItemColumnHeader;
            this.medChartOverview.DrugHeader = 'Prescription item';
            this.medChartOverview.Format = this.sDrugHeaderFormat;
            this.medChartOverview.StartDate = new DateTime(this.StartDate.DateTime.Ticks, DateTimeKind.Unspecified);
            this.medChartOverview.EndDate = new DateTime(this.EndDate.DateTime.Ticks, DateTimeKind.Unspecified);
            this.medChartOverview.TodayDate = new DateTime(CurrentDT.DateTime.Ticks, DateTimeKind.Unspecified);
            // this.medChartOverview.StartDate = this.StartDate;
            // this.medChartOverview.EndDate = this.EndDate;
            // this.medChartOverview.TodayDate = this.dtCurrentDateTime;
            let DSTDatetime: DateTime= Common.DSTTimeInChart(this.StartDate, this.EndDate, ChartType.Prescription_Chart);
            if (DSTDatetime.NotEquals(DateTime.MinValue)) {
                this.medChartOverview.DSTDateTime = DSTDatetime.ToString(this.sDrugHeaderFormat);
            }
            this.medChartOverview.TimeFormat = CConstants.Timeformat;
            if (!String.IsNullOrEmpty(this.sMedViewOptionValue) && String.Compare(this.sMedViewOptionValue, "CC_14DAYVIEW") == 0) {
                this.medChartOverview.ColWidth = MedsAdminPrescChartView.dColWidth;
                MedChartData.Is7DayView = false;
                this.medChartOverview.TodayColWidth = MedsAdminPrescChartView.dTodayColWidth;
            }
            else {
                this.medChartOverview.ColWidth = MedsAdminPrescChartView.d7DayColWidth;
                this.medChartOverview.TodayColWidth = MedsAdminPrescChartView.d7DayTodayColWidth;
                MedChartData.Is7DayView = true;
            }
            this.medChartOverview.TabIndex = 7;
            this.medChartOverview.AllowSlotMultiselect = true;
            this.medChartOverview.ShowSlotTiminings = true;
            this.medChartOverview.SlotTimeWidth = 50.0;
            this.medChartOverview.SlotTimeHeader = String.Empty;
            this.medChartOverview.CheckBoxColumn = true;
            this.medChartOverview.OnRowSelectionChanged  = (s,e) => { this.medChartOverview_OnRowSelectionChanged(s,e); } ;
            this.medChartOverview.ChartRows = null;
            this.medChartOverview.NoRecordsDisplayText = String.Empty;
           this.LayoutRoot.Children.Clear();
            this.LayoutRoot.Children.Add(this.medChartOverview); // newly added
            console.log("LayoutRoot.ChildrenArr",this.LayoutRoot.ChildrenArr);
           this.LayoutRoot.UpdateLayout(); // To be revisit
           //this.medChartOverview.Width = this.LayoutRoot.ActualWidth; // To be revisit
           //this.medChartOverview.Height = this.RowChart.ActualHeight - 5; // To be revisit
        }
        nSelectedItemCount: number = 0;
        sEcounterOID: string = String.Empty;
        sEcounterType: string = String.Empty;
        GridControl: GridExtension = new GridExtension();
        medChartOverview_OnRowSelectionChanged(sender: Object, SelectedItem: ChartRow[], UnselectedItem?: ChartRow[]): void {
            this.disableClick = false;
            this.sEcounterOID = String.Empty;
            this.sEcounterType = String.Empty;
            if(SelectedItem.Count() != undefined){
            this.nSelectedItemCount = SelectedItem.Count(); // To be Revisit
            }else{
                this.nSelectedItemCount = 0;
            }
            //this.medChartOverview.DicSelectedItems
            this.cmdObservationsResults.IsEnabled = false;
           
            
            let getrowselected1 = this.medChartOverview.GetSelectedRows();
            console.log(getrowselected1);
            if (SelectedItem.Count() > 0) { 
            //if(SelectedItem['Key']!=undefined){
                //this.nSelectedItemCount = 1; // for temp fix to b revisit the selectedItem.count() in above 
                this.cmdDiscontinueCancel.IsEnabled = true;
                if (SelectedItem.Count() == 1) { 
               // if (this.nSelectedItemCount == 1) {
                    this.cmdObservationsResults.IsEnabled = true;
                }
                else {
                    this.cmdObservationsResults.IsEnabled = false;
                }
                this.cmdAmend.IsEnabled = this.nSelectedItemCount == 1 ? true : false;
                if (this.cmdAmend.IsEnabled) {
                    this.sEcounterOID = PatientContext.EncounterOid.ToString();
                    this.sEcounterType = PatientContext.EncounterType;
                }
                let oTagDrugHeaderDetails: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(SelectedItem[0].DrugItem.Tag, TagDrugHeaderDetail); // To be revisit SelectedItem[0].DrugItem.Tag
                this.medChartOverview.ClearAllSlotSelection();
                this.cmdClearSelection.IsEnabled = false;
                let prescriptionstatus: string = (ObjectHelper.CreateType<TagDrugHeaderDetail>(SelectedItem[0].DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus.ToString();
                let IdentifyingType: string = (ObjectHelper.CreateType<TagDrugHeaderDetail>(SelectedItem[0].DrugItem.Tag, TagDrugHeaderDetail)).DrugIdentifyingType.ToString();
                let ParentPrescriptionOID: number = (ObjectHelper.CreateType<TagDrugHeaderDetail>(SelectedItem[0].DrugItem.Tag, TagDrugHeaderDetail)).ParentPrescriptionItemOID;
                if (String.Equals(prescriptionstatus, CConstants.DISCONTINUED) || String.Equals(prescriptionstatus, CConstants.COMPLETED) || String.Equals(prescriptionstatus, CConstants.CANCELLED) || ParentPrescriptionOID > 0) {
                    this.cmdReview.IsEnabled = false;
                }
                else {
                    this.cmdReview.IsEnabled = this.nSelectedItemCount == 1 ? true : false;
                }
                if (SelectedItem.Count() == 1 && this.medChartOverview.SelectedSlots.Count == 0) { // tobe revist SelectedItem.Count()
                    if ((!oTagDrugHeaderDetails.IsInfusion && (!String.Equals(oTagDrugHeaderDetails.ItemSubType, InfusionTypesCode.SUBTYPE_GAS, StringComparison.InvariantCultureIgnoreCase))) || (oTagDrugHeaderDetails.IsInfusion && String.Equals(oTagDrugHeaderDetails.INFTYCODE, InfusionTypesCode.INTERMITTENT, StringComparison.InvariantCultureIgnoreCase))) {
                        if ((oTagDrugHeaderDetails.IsPRN && !oTagDrugHeaderDetails.IsPRNWithSchedule))
                            return
                        this.IsMedicationSelected = true;
                        this.DrugKey = (SelectedItem[0].DrugItem.Key);
                        this.StartDateTime = (ObjectHelper.CreateType<TagDrugHeaderDetail>(SelectedItem[0].DrugItem.Tag, TagDrugHeaderDetail)).StartDate;
                        this.EndDateTime = (ObjectHelper.CreateType<TagDrugHeaderDetail>(SelectedItem[0].DrugItem.Tag, TagDrugHeaderDetail)).EndDate;
                        this.PresItemStatus = (ObjectHelper.CreateType<TagDrugHeaderDetail>(SelectedItem[0].DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus;
                        this.FrqPerCode = (ObjectHelper.CreateType<TagDrugHeaderDetail>(SelectedItem[0].DrugItem.Tag, TagDrugHeaderDetail)).FreqPerodcode;
                       
                        this.SelectedReinstateRow = SelectedItem[0]; // Tobe revisit SelectedItem[0]
                        if (oTagDrugHeaderDetails.IsIndefiniteOmit || String.Equals(SelectedItem[0].DrugItem.OmitLabel, CConstants.OmitIndefinite, StringComparison.InvariantCultureIgnoreCase)) {
                            this.cmdReinstate.IsEnabled = true;
                            this.cmdOmit.IsEnabled = false;
                        }
                        else if (!String.IsNullOrEmpty(oTagDrugHeaderDetails.OmitComments) || String.Equals(SelectedItem[0].DrugItem.OmitLabel, CConstants.OmitDefinite, StringComparison.InvariantCultureIgnoreCase)) {
                            this.cmdReinstate.IsEnabled = true;
                            this.cmdOmit.IsEnabled = true;
                        }
                        else {
                            if (oTagDrugHeaderDetails.EndDate.Equals(DateTime.MinValue) || (oTagDrugHeaderDetails.EndDate >= this.dtCurrentDateTime)) {
                                this.cmdReinstate.IsEnabled = false;
                                this.cmdOmit.IsEnabled = true;
                            }
                        }
                    }
                }
                else {
                    this.cmdReinstate.IsEnabled = false;
                    this.cmdOmit.IsEnabled = false;
                }
                this.cmdEnterDose.IsEnabled = false;
               let getrowselected = this.medChartOverview.GetSelectedRows();
               console.log("getrowselected",getrowselected);
            }
            else {
                this.cmdEnterDose.IsEnabled = false;
                this.nSlotSelectedCountForEnterDose = 0;
                this.cmdDiscontinueCancel.IsEnabled = false;
                this.cmdAmend.IsEnabled = false;
                this.IsMedicationSelected = false;
                if (this.medChartOverview.SelectedSlots.Count == 0) {
                    this.cmdReinstate.IsEnabled = false;
                    this.cmdOmit.IsEnabled = false;
                }
                this.cmdReview.IsEnabled = false;
            }
        }
        // GetChartData(sSortBy: string, dtServerDate: DateTime): void {
        //     console.log("****ChartContext***");
        //     console.log("PatientOID:",ChartContext.PatientOID, "EncounterOID: ",ChartContext.EncounterOID);
        //     this.oGetMedsChartData = new GetMedsChartData(ChartContext.PatientOID, ChartContext.EncounterOID, dtServerDate, this.StartDate, this.EndDate, ChartType.Medication_Overview_Chart, sSortBy, this.oOverViewChartData.MedChartOID, this.oOverViewChartData.IsDiscontinueChecked, false);
        //     //this.oGetMedsChartData = new GetMedsChartData(ChartContext.PatientOID, ChartContext.EncounterOID, dtServerDate, this.StartDate, this.EndDate, ChartType.Prescription_Chart, sSortBy, this.oOverViewChartData.MedChartOID, this.oOverViewChartData.IsDiscontinueChecked, this.oOverViewChartData.IsCancelChecked);
           
        //     // this.oGetMedsChartData.MedsAdminChartDataCompleted -= new GetMedsChartData.MedsAdminChartDataDelegate(this.oGetMedsChartData_MedsAdminChartDataCompleted);
        //     // this.oGetMedsChartData.MedsAdminChartDataCompleted = new GetMedsChartData.MedsAdminChartDataDelegate(this.oGetMedsChartData_MedsAdminChartDataCompleted);
        //     // this.oGetMedsChartData.MedsAdminChartDataCompleted = () => { this.oGetMedsChartData_MedsAdminChartDataCompleted(); };
        //     this.oGetMedsChartData.GetMedsAdminChartData();
        //     this.oGetMedsChartData.medChartCallCompleted.subscribe(() => {
        //       this.oGetMedsChartData_MedsAdminChartDataCompleted();
        //     this.medChartOverview.TodayBorderColor = new SolidColorBrush(MedChartData.TodayOutlineColor);
        //     // Grid.SetColumn(this.medChartOverview, 0); no need, columns loading via html
        //     // Grid.SetColumnSpan(this.medChartOverview, 4);
        //     if (!this.LayoutRoot.Children.Contains(this.medChartOverview)) {
        //       this.LayoutRoot.Children.Add(this.medChartOverview);
        //       console.log("LayoutRoot.ChildrenArr1",this.LayoutRoot.ChildrenArr);
        //       this.LayoutRoot.SetColumnSpan(this.medChartOverview, 2);
        //     }
        //     Grid.SetRow(this.medChartOverview, 1);
        //     let DSTDatetime: DateTime = Common.DSTTimeInChart(this.StartDate, this.EndDate, ChartType.Prescription_Chart);
        //     if (DSTDatetime.NotEquals(DateTime.MinValue)) {
        //       this.lblDSTClockNotifier.Visibility = Visibility.Visible;
        //       this.lblDSTClockNotifier.Text = String.Format(MedicationAdministrator.DSTTimeClockChange_text, DSTDatetime.ToString(CConstants.ShortDateFormat));
        //     }
        //     else {
        //       this.lblDSTClockNotifier.Visibility = Visibility.Collapsed;
        //     }
        //     // to enable grid
        //     this.medicationControlLoaded = true;
        
        //   });
        //   }
        private GetChartData(sSortBy: string, dtServerDate: DateTime): void {
            //let grdTemp: Grid;
            //let grdTemp : Grid= new Grid();
            this.disableClick = false;
            this.oGetMedsChartData = new GetMedsChartData(ChartContext.PatientOID, ChartContext.EncounterOID, dtServerDate, this.StartDate, this.EndDate, ChartType.Prescription_Chart, sSortBy, this.oOverViewChartData.MedChartOID, this.oOverViewChartData.IsDiscontinueChecked, this.oOverViewChartData.IsCancelChecked);
            //this.oGetMedsChartData.MedsAdminChartDataCompleted -= new GetMedsChartData.MedsAdminChartDataDelegate(this.oGetMedsChartData_MedsAdminChartDataCompleted);
            this.oGetMedsChartData.MedsAdminChartDataCompleted  = (s,e) => { this.oGetMedsChartData_MedsAdminChartDataCompleted(s,e); } ;
            this.oGetMedsChartData.GetMedsAdminChartData();
            this.oGetMedsChartData.medChartCallCompleted.subscribe(() => {
                this.oGetMedsChartData_MedsAdminChartDataCompleted();
            this.medChartOverview.TodayBorderColor = new SolidColorBrush(MedChartData.TodayOutlineColor);
           // Grid.SetColumn(this.medChartOverview, 0); 
           if (!this.LayoutRoot.Children.Contains(this.medChartOverview)) {
            this.LayoutRoot.Children.Clear();
            this.LayoutRoot.Children.Add(this.medChartOverview);
            this.LayoutRoot.SetColumnSpan(this.medChartOverview, 4) 
           }  
           // Grid.SetColumnSpan(this.medChartOverview, 4); // Grid.SetColumnSpan(this.medChartOverview, 4)
            Grid.SetRow(this.medChartOverview, 1);
            let DSTDatetime: DateTime= Common.DSTTimeInChart(this.StartDate, this.EndDate, ChartType.Prescription_Chart);
            if (DSTDatetime.NotEquals(DateTime.MinValue)) {
                this.lblDSTClockNotifier.Visibility = Visibility.Visible;
                this.lblDSTClockNotifier.Text = String.Format(MedicationAdministrator.DSTTimeClockChange_text, DSTDatetime.ToString(CConstants.ShortDateFormat));
            }
            else {
                this.lblDSTClockNotifier.Visibility = Visibility.Collapsed;
            }
            this.medicationControlLoaded = true;
        });
        }
        oGetMedsChartData_MedsAdminChartDataCompleted(s?,e?): void {
            //let PrescriptionChartVM: PrescriptionChartVM = ObjectHelper.CreateType<PrescriptionChartVM>(this.DataContext, PrescriptionChartVM);
            let PrescriptionChartVM: PrescriptionChartVM;
            PrescriptionChartVM = ObjectHelper.CreateType<PrescriptionChartVM>(this.DataContext,PrescriptionChartVM);
            if (MedChartData.IsAuthoriseDrugAval) {
                this.lblAuthoriseNotifier.Visibility = Visibility.Visible;
            }
            else {
                this.lblAuthoriseNotifier.Visibility = Visibility.Collapsed;
            }
            if (this.oGetMedsChartData.oChartRowList.Count > 0) {
                this.medChartOverview.NoRecordsDisplayText = String.Empty;
                this.lblEncounterInfo.Text = String.Empty;
                let r: Run;
                let nCount: number = this.oGetMedsChartData.oEncList.Count;
                let isEncounterContextSet: boolean = false;
                this.lblEncounterInfo.Inlines.Clear();
                for (let nCnt: number = 0; nCnt < nCount; nCnt++) {
                    if (String.Equals(this.oGetMedsChartData.oEncList[nCnt].StatusCode, "CC_ENCCLOSED", StringComparison.OrdinalIgnoreCase) && this.oGetMedsChartData.oEncList[nCnt].EndDate.NotEquals(DateTime.MinValue)) {
                        r = new Run();
                        r.Text = this.oGetMedsChartData.oEncList[nCnt].Type + " " + this.oGetMedsChartData.oEncList[nCnt].StartDate.ToString(MedsAdminPrescChartView.sEncDateFormat) + " to " + this.oGetMedsChartData.oEncList[nCnt].EndDate.ToString("dd-MMM-yyyy");
                        this.lblEncounterInfo.Inlines.Add(r);
                        if (nCnt < nCount - 1)
                            this.lblEncounterInfo.Inlines.Add(new LineBreak());
                    }
                    else {
                        r = new Run();
                        r.Text = this.oGetMedsChartData.oEncList[nCnt].Type + " " + this.oGetMedsChartData.oEncList[nCnt].StartDate.ToString(MedsAdminPrescChartView.sEncDateFormat) + " onwards";
                        this.lblEncounterInfo.Inlines.Add(r);
                        if (nCnt < nCount - 1)
                            this.lblEncounterInfo.Inlines.Add(new LineBreak());
                    }
                    if (this.oGetMedsChartData.oEncList[nCnt].EncounterOID == ChartContext.EncounterOID) {
                        isEncounterContextSet = true;
                        this.oOverViewChartData.EncounterOID = this.oGetMedsChartData.oEncList[nCnt].EncounterOID;
                        this.oOverViewChartData.EncType = this.oGetMedsChartData.oEncList[nCnt].Type;
                        this.oOverViewChartData.EncMainID = this.oGetMedsChartData.oEncList[nCnt].MainId;
                    }
                }
                if (!isEncounterContextSet) {
                    if (this.oGetMedsChartData.oEncList != null) {
                        let oEncOrderedList = this.oGetMedsChartData.oEncList.OrderBy(oEnc => oEnc.EncounterOID);
                        if (oEncOrderedList != null && oEncOrderedList.Count() > 0) {
                            //let oLatestEncounter: Encounter = oEncOrderedList.Last();
                           // this.oOverViewChartData.EncounterOID = oLatestEncounter.EncounterOID;

                            let oLatestEncounter: Encounter = oEncOrderedList[0];
                            this.oOverViewChartData.EncounterOID = oLatestEncounter.EncounterOID;
                            
                            this.oOverViewChartData.EncType = oLatestEncounter.Type;
                            this.oOverViewChartData.EncMainID = oLatestEncounter.MainId;
                        }
                    }
                }
                this.oOverViewChartData.Encounters = this.oGetMedsChartData.oEncList;
                if (!this.oOverViewChartData.IsDiscontinueChecked) {
                    let TempSource: ObservableCollection<ChartRow> = new ObservableCollection<ChartRow>(this.oGetMedsChartData.oChartRowList.Where(c => c.DrugItem != null && c.DrugItem.Tag != null && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)) != null && !String.IsNullOrEmpty((ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus) && (!String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus, CConstants.DISCONTINUED) && !String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus, CConstants.COMPLETED))).Select(s => s));
                    if (TempSource != null && TempSource.Count > 0) {
                        this.oGetMedsChartData.oChartRowList = TempSource;
                    }
                    else {
                        this.oGetMedsChartData.oChartRowList = new ObservableCollection<ChartRow>();
                        this.medChartOverview.NoRecordsDisplayText = "No records found";
                        this.cmdPrevDay.IsEnabled = false;
                        this.cmdPrevWeek.IsEnabled = false;
                        this.cmdNextDay.IsEnabled = false;
                        this.cmdNextWeek.IsEnabled = false;
                        Busyindicator.SetStatusIdle("PrescriptionChart");
                    }
                }
                this.medChartOverview.ChartRows = this.oGetMedsChartData.oChartRowList;
                //this.medChartOverview.OnHotSpotClick -= new iMedicationChart.OnHotSpotClickhandler(this.medChartOverview_OnHotSpotClick);
                //this.medChartOverview.OnDrugHotSpotClick -= new iMedicationChart.OnDrugHotSpotClickhandler(this.medChartOverview_OnDrugHotSpotClick);
                this.medChartOverview.OnDrugHotSpotClick  = (s,e) => { this.medChartOverview_OnDrugHotSpotClick(s,e); } ;
                //this.medChartOverview.OnSlotHotSpotClick -= new iMedicationChart.OnSlotHotSpotClickhandler(this.medChartOverview_OnSlotHotSpotClick);
                this.medChartOverview.OnSlotHotSpotClick  = (s,e) => { 
                    this.doubletrigger = true;
                    this.medChartOverview_OnSlotHotSpotClick(s,e); 
                } ;
                this.medChartOverview.OnHotSpotClick  = (s,e,t) => { this.medChartOverview_OnHotSpotClick(s,e,t); } ;
                let dtServerDate: DateTime= CommonBB.GetServerDateTime();
                if (this.StartDate > MedChartData.ActiveFrom)
                    this.cmdPrevDay.IsEnabled = true;
                else this.cmdPrevDay.IsEnabled = false;
                if (this.StartDate.AddDays(-7) >= MedChartData.ActiveFrom)
                    this.cmdPrevWeek.IsEnabled = true;
                else this.cmdPrevWeek.IsEnabled = false;
                if ((this.EndDate.Date == MedChartData.ActiveTo.Date && MedChartData.ActiveTo.NotEquals(DateTime.MinValue)) || (this.EndDate.Date > dtServerDate.DateTime.AddDays(27)) || (String.Compare(MedChartData.ChartStatus, CConstants.sChartInActiveStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0 && this.EndDate.Date >= MedChartData.ActiveTo.Date))
                    this.cmdNextDay.IsEnabled = false;
                else this.cmdNextDay.IsEnabled = true;
                if ((String.Equals(MedChartData.ChartStatus, CConstants.sChartActiveStatusCode, StringComparison.CurrentCultureIgnoreCase) || String.Equals(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.CurrentCultureIgnoreCase))) {
                    if (this.EndDate.DateTime.AddDays(7) <= CommonBB.GetServerDateTime().DateTime.AddDays(28))
                        this.cmdNextWeek.IsEnabled = true;
                    else this.cmdNextWeek.IsEnabled = false;
                    if (!this.cmdToday.IsEnabled) {
                        this.cmdToday.IsEnabled = true;
                    }
                }
                else if (String.Equals(MedChartData.ChartStatus, CConstants.sChartInActiveStatusCode, StringComparison.CurrentCultureIgnoreCase)) {
                    if (this.EndDate.DateTime.AddDays(7) <= MedChartData.ActiveTo.Date)
                        this.cmdNextWeek.IsEnabled = true;
                    else this.cmdNextWeek.IsEnabled = false;
                }
                else this.cmdNextWeek.IsEnabled = false;
                Busyindicator.SetStatusIdle("PrescriptionChart");
            }
            else {
                this.medChartOverview.NoRecordsDisplayText = "No records found";
                this.cmdPrevDay.IsEnabled = false;
                this.cmdPrevWeek.IsEnabled = false;
                this.cmdNextDay.IsEnabled = false;
                this.cmdNextWeek.IsEnabled = false;
                this.cmdToday.IsEnabled = false;
                this.cmdInpatient.IsEnabled = true;
                //this.cmdDischarge.IsEnabled = true; To be revisit
                if ((String.IsNullOrEmpty(PatientContext.EncounterCode) || String.Compare(PatientContext.EncounterCode, CConstants.ENCstatus, StringComparison.CurrentCultureIgnoreCase) == 0)) {
                    this.cmdInpatient.IsEnabled = false;
                }
                Busyindicator.SetStatusIdle("PrescriptionChart");
            }
            if (PrescriptionChartVM != null && (MedChartData.PatinetInfo != null && !String.IsNullOrEmpty(MedChartData.PatinetInfo.Observation))) {
                let sHtWtBSA: string = MedChartData.PatinetInfo.Observation;
                if (!String.IsNullOrEmpty(PatientContext.BSA))
                    sHtWtBSA += " " + PatientContext.BSA + MedsAdminChartToolTip.PatientBSAUOMText;
                PrescriptionChartVM.PatientHtWtBSAText = sHtWtBSA;
                CommonBB.PatientBSADataCompletedEvent_chart= (s, e) => { this.CommonBB_PatientBSADataCompletedEvent_chart(s, e); };
            }
        }
        CommonBB_PatientBSADataCompletedEvent_chart(Formula: string, BSA: string) {
            let objPrescriptionChartVM = ObjectHelper.CreateType<PrescriptionChartVM>(this.DataContext,PrescriptionChartVM);
            let sHtWtBSA: string = MedChartData.PatinetInfo.Observation;
            if (!String.IsNullOrEmpty(PatientContext.BSA))
                sHtWtBSA += " " + PatientContext.BSA + MedsAdminChartToolTip.PatientBSAUOMText;
            objPrescriptionChartVM.PatientHtWtBSAText = sHtWtBSA;
        }
        medChartOverview_OnHotSpotClick(sender: Object, TagObject: TagObject,GridControl:any): void {  //LORENZO.BlueBird.Controls.TagObject
            this.disableClick = false;
            if (TagObject != null && TagObject.oIChartSlot != null) {
                this.medChartOverview.GridControl = GridControl;
                let PrescriptionItemOID: number = 0;
                let MCVersion: string = String.Empty;
                if (TagObject != null && TagObject.oDrugItem != null && TagObject.oDrugItem.Tag != null) {
                    let Obj: TagDrugHeaderDetail = (ObjectHelper.CreateType<TagDrugHeaderDetail>(TagObject.oDrugItem.Tag, TagDrugHeaderDetail));
                    if (Obj != null && !String.IsNullOrEmpty(Obj.MCVersionNo)) {
                        MCVersion = Obj.MCVersionNo;
                        PrescriptionItemOID = Obj.PrescriptionItemOID;
                    }
                }
                if (TagObject.oIChartSlot instanceof DoseOverviewSlot && (<DoseOverviewSlot>TagObject.oIChartSlot).Tag != null && (<ChartIcon>((<FrameworkElement>(sender)).Tag) != null)) {
                    let HistoryChartIcon: ChartIcon = (<ChartIcon>((<FrameworkElement>(sender)).Tag));
                    if (HistoryChartIcon != null && !String.IsNullOrEmpty(HistoryChartIcon.Key) && String.Compare(HistoryChartIcon.Key, "HistoryIcon", StringComparison.CurrentCultureIgnoreCase) == 0) {
                        let oTagAdminSlotDetail: TagSlotDetail = <TagSlotDetail>(<DoseOverviewSlot>TagObject.oIChartSlot).Tag;
                        if (oTagAdminSlotDetail != null && (oTagAdminSlotDetail.MedsAdminOID > 0 || oTagAdminSlotDetail.SlotOID > 0)) {
                            this.oMedsAdminSlotHistory = new MedsAdminSlotHistory();
                            this.oMedsAdminSlotHistory.onDialogClose = this.omedsadmin_Closed;
                            this.oMedsAdminSlotHistory.MedAdminOID = oTagAdminSlotDetail.MedsAdminOID;
                            this.oMedsAdminSlotHistory.PresSchOID = oTagAdminSlotDetail.SlotOID;
                            this.oMedsAdminSlotHistory.PrescriptionItemOID = PrescriptionItemOID;
                            this.oMedsAdminSlotHistory.MCVersion = MCVersion;
                            let oTagDrugHeaderDetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>((TagObject.oDrugItem.Tag), TagDrugHeaderDetail);
                            if (oTagDrugHeaderDetail != null && oTagDrugHeaderDetail.IsPRN && !oTagDrugHeaderDetail.IsPRNWithSchedule) {
                                this.IsHistoryChartIconClicked = true;
                            }
                            // ObjectHelper.stopFinishAndCancelEvent(true);
                            AppActivity.OpenWindow("Administration modification history", this.oMedsAdminSlotHistory, (s, e) => { this.omedsadmin_Closed(s); }, "Administration modification history", false, 600, 630, false, WindowButtonType.Close, null);
                        }
                        if(this.doubletrigger != true) {
                            this.medChartOverviewOnSlotHotSpotClick(sender,TagObject);
                        }
                    } else {
                        this.medChartOverviewOnSlotHotSpotClick(sender,TagObject);
                    }
                    this.doubletrigger = false;
                }
            }
        }
        omedsadmin_Closed(args: AppDialogEventargs): void {
            // ObjectHelper.stopFinishAndCancelEvent(false);
            if (this.medChartOverview != null && this.medChartOverview.SelectedSlots != null && this.medChartOverview.SelectedSlots.Count > 0 && this.IsHistoryChartIconClicked) {
                this.medChartOverview.ClearAllSlotSelection();
            }
            this.IsHistoryChartIconClicked = false;
            args.AppChildWindow.DialogResult = true;
        }
        LaunchPrescriptionDetails(PrescriptionItemOID: number, sDrugName: string, sHeight: string, sDefaulttab: string, sItemSubType: string, sLorenzoID: string, MCVersionNo: string, DoseCalcExist: string): void {
            this.ddetChild = new medddetailsChild();
            this.ddetChild.MedDetailsUserControl.PrescriptionItemOID = PrescriptionItemOID;
            this.ddetChild.MedDetailsUserControl.MCVersion = !String.IsNullOrEmpty(MCVersionNo) ? MCVersionNo : AppSessionInfo.AMCV;
            this.ddetChild.MedDetailsUserControl.DoseCalcExist = DoseCalcExist;
            this.ddetChild.MedDetailsUserControl.ServiceOID = MedChartData.ServiceOID;
            this.ddetChild.MedDetailsUserControl.LocationOID = MedChartData.LocationOID;
            this.ddetChild.Height = Convert.ToInt64(sHeight);
            if (!String.IsNullOrEmpty(sDefaulttab))
                this.ddetChild.MedDetailsUserControl.sDefaultTab = sDefaulttab;
            this.ddetChild.MedDetailsUserControl.LorenzoID = sLorenzoID;
            if (sDefaulttab == "SupplyInstructions")
                this.ddetChild.MedDetailsUserControl.TechValDef = true;
            this.ddetChild.MedDetailsUserControl.oLaunchFrom = SVIconLaunchFrom.PresChart;
            if (String.Compare(sItemSubType, CConstants.ItemSubType, StringComparison.InvariantCultureIgnoreCase) == 0) {
                sDrugName = MedsAdminChartToolTip.AdhocItemCaption;
            }
            this.ddetChild.onDialogClose = this.ddetChild_Closed;
            let dialogWindowHeight = (Convert.ToInt64(sHeight)/window.devicePixelRatio);
            // ObjectHelper.stopFinishAndCancelEvent(true);
            AppActivity.OpenWindow(sDrugName, this.ddetChild, (s)=>{this.ddetChild_Closed(s)}, "", false, dialogWindowHeight, 930, false, WindowButtonType.Close, null);
        }
        private ddetChild_Closed(args: AppDialogEventargs): void {
            // ObjectHelper.stopFinishAndCancelEvent(false);
            if (args != null && args.AppChildWindow != null)
                args.AppChildWindow.DialogResult = true;
            //this.ddetChild.appDialog.DialogResult = true;
        }
        private ConditionalVM: ConditionalDoseVM;
        private MultiDoseDetailVM: MultipleDoseDetail;
        private sTitle: string = String.Empty;
        LaunchDoseTypeScreen(PrescriptionItemOID: number, sDrugName: string, sDoseType: string, sInfusiontype: string): void {
            if (String.Compare(sDoseType, DoseTypeCode.CONDITIONAL, StringComparison.OrdinalIgnoreCase) == 0) {
                if (this.ConditionalVM == null || (this.ConditionalVM != null && this.ConditionalVM.lnPrescriptionItemOID != PrescriptionItemOID)) {
                this.ConditionalVM = ObjectHelper.CreateObject(new ConditionalDoseVM(RequestSource.ViewDrugDetails, PrescriptionItemOID), { DrugName: sDrugName });
                }
                let objConditional: MedConditionalDose = new MedConditionalDose();                
                objConditional.DataContext = this.ConditionalVM;
                objConditional.InfusionType = sInfusiontype;
                objConditional.DoseType = sDoseType.Trim();
                AppActivity.OpenWindow((sDrugName + " - LORENZO -- Webpage Dialog"), objConditional, this.omedobjConditional1_Closed, "", false, 250, 460, false, WindowButtonType.Close, null);
            }
            else if (String.Compare(sDoseType, DoseTypeCode.TITRATED, StringComparison.OrdinalIgnoreCase) == 0) {
                if (!this.IsTitratedIconClicked) {
                    this.IsTitratedIconClicked = true;
                    this.objTitrated = new MedTitratedDose();
                    this.MultiDoseDetailVM = new MultipleDoseDetail(PrescriptionItemOID, AppSessionInfo.AMCV, DoseTypeCode.TITRATED, "EPR", PatientContext.PrescriptionType);
                    this.MultiDoseDetailVM.TitratedDoseCompleted  = (s,e) => { this.MultiDoseDetailVM_TitratedDoseCompleted(); } ;
                    this.sTitle = sDrugName;
                }
            }
            else {
                this.objStepped = new MedSteppedFullPrescriptionVW();
                this.objStepped.oLaunchFrom = SVIconLaunchFrom.PresChart;
                Busyindicator.SetStatusBusy("SteppenFullPrescription");
                this.MultiDoseDetailVM = new MultipleDoseDetail(PrescriptionItemOID, AppSessionInfo.AMCV, sDoseType, "EPR", PatientContext.PrescriptionType);
               let temp =  this.MultiDoseDetailVM.PresItemDoseInfoServicedata.subscribe(()=> { 
                    this.objStepped.DataContext = this.MultiDoseDetailVM; // To be Re-Visited
                    this.objStepped.sInfusionType = sInfusiontype;
                    this.objStepped.onDialogClose = this.MedSteppedDose_Closed;
                    AppActivity.OpenWindow(sDrugName + " - LORENZO -- Webpage Dialog", this.objStepped, this.MedSteppedDose_Closed, "", false, 600, 950, false, WindowButtonType.Close, null);
                    temp.unsubscribe(); 
                });
                
              }
          
        }
        private MedSteppedDose_Closed(args: AppDialogEventargs): void {
            Busyindicator.SetStatusIdle("DCIconClicked");
            args.AppChildWindow.DialogResult = true;
        }
        MultiDoseDetailVM_TitratedDoseCompleted(): void {
            this.objTitrated = new MedTitratedDose();
            this.objTitrated.DataContext = this.MultiDoseDetailVM;
            this.objTitrated.onDialogClose = this.objTitrated_Closed;
            AppActivity.OpenWindow(this.sTitle, this.objTitrated, (s)=>{this.objTitrated_Closed(s)}, "", false, 350, 480, false, WindowButtonType.Close, null);
        }
        private objTitrated_Closed(args: AppDialogEventargs): void {
            this.IsTitratedIconClicked = false;
            args.AppChildWindow.DialogRef.close();
            //args.AppChildWindow.DialogResult = true;
        }
        omedobjConditional1_Closed(args: AppDialogEventargs): void {
            args.AppChildWindow.DialogResult = true;
        }
        DrugHotspotKey: string = String.Empty;
        medChartOverview_OnDrugHotSpotClick(sender: Object, TagObject: TagObject): void {
            this.disableClick = false;
            this.DrugHotspotKey = String.Empty;
            let oChartIcon: ChartIcon = (<ChartIcon>((<FrameworkElement>(sender)).Tag));
            let DoseTypeCode: string = String.Empty;
            if (TagObject.oDrugItem != null && oChartIcon != null) {
                if (!String.IsNullOrEmpty(TagObject.oDrugItem.Key) && !String.IsNullOrEmpty(TagObject.oDrugItem.Drugname)) {
                    this.DrugHotspotKey = TagObject.oDrugItem.Key;
                    if (!String.IsNullOrEmpty(oChartIcon.Key)) {
                        if (String.Compare(oChartIcon.Key, "Conflicts", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oChartIcon.Key, "SupplyInstructions", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oChartIcon.Key, "Conflict", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oChartIcon.Key, "Prescription", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oChartIcon.Key, CConstants.PGDDrug, StringComparison.CurrentCultureIgnoreCase) == 0) {
                            let sHeight: string = String.Empty;
                            if (String.Compare(oChartIcon.Key, CConstants.PGDDrug, StringComparison.CurrentCultureIgnoreCase) == 0)
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
                            let oTagDrugDetail: TagDrugHeaderDetail = <TagDrugHeaderDetail>TagObject.oDrugItem.Tag;
                            if (TagObject.oDrugItem.Tag != null && TagObject.oDrugItem.Tag instanceof TagDrugHeaderDetail) {
                                DoseTypeCode = (<TagDrugHeaderDetail>(TagObject.oDrugItem.Tag)).DoseType;
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
                        else if (String.Compare(oChartIcon.Key, CConstants.ReviewKey, StringComparison.CurrentCultureIgnoreCase) == 0) {
                            if (!String.IsNullOrEmpty(TagObject.oDrugItem.Key)) {
                                this.objtagheader = ObjectHelper.CreateType<TagDrugHeaderDetail>(TagObject.oDrugItem.Tag, TagDrugHeaderDetail);
                                if (!MedChartData.IsPresChartReadOnly) {
                                    if (this.objtagheader != null && !this.objtagheader.IsAllowedToPerform) {
                                        let oMsgBox: iMessageBox = new iMessageBox();
                                        oMsgBox.Title = "Information - Lorenzo";
                                        oMsgBox.Height = 140;
                                        oMsgBox.Width = 350;
                                        oMsgBox.MessageButton = MessageBoxButton.OK;//LORENZO.BlueBird.Controls.
                                        oMsgBox.IconType = MessageBoxType.Information;
                                        oMsgBox.Message = Resource.MedsAdminPrescChartView.IsReviewAllowed;
                                        oMsgBox.Show();
                                    }
                                    else {
                                        let RowKey: string = "Row-" + TagObject.oDrugItem.Key;
                                        let oCurrentChartRow: List<ChartRow> = new List<ChartRow>();
                                        oCurrentChartRow = this.medChartOverview.ChartRows.Where(c => c.Key == RowKey).Select(s => s).ToList<ChartRow>();
                                        if (oCurrentChartRow != null && oCurrentChartRow.Count > 0) {
                                            this.SelectedReinstateRow = oCurrentChartRow.FirstOrDefault();
                                        }
                                        this.PresCheckPessimisticLock("MedPrescribeInpatient~MedDiscontinueCancel~MAOmit~MAReinstate~MedCVInpatient~MEDAuthInpatient~MAReview~MAEnterTitratedDose", "", "MedPrescribeDischarge~MedCVDischarge~MedPrescribeLeave~MedCVLeave~MAMedChart", this.IsLock , (s,e) => { this.ReviewIconWarning_MessageBoxClose(s,e); } );
                                        if (!this.IsLock && !this.IsOmitReinstateReviewClicked) {
                                            this.LaunchReviewOutcome(TagObject.oDrugItem.Key, this.objtagheader.DrugName);
                                        }
                                    }
                                }
                            }
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
            this.lGroupSeqNo = GroupSeqNo;
            this.FillPrescriptions();
        }
        public FillPrescriptions(): void {
            if (PatientContext.EncounterOid > 0) {
                let nCurrentEncounterOID: number = PatientContext.EncounterOid;
                this.objCommPrescriptionItemViewVM = new CommPrescriptionItemViewVM();
                this.objCommPrescriptionItemViewVM.GetPatientMedications(PrescriptionTypes.ForAdministration, '7', ChartContext.EncounterOID > 0 ? ChartContext.EncounterOID : nCurrentEncounterOID);
                this.objCommPrescriptionItemViewVM.GetMedicationsEvent  = (s,e) => { this.CommPrescriptionItemViewVM_GetMedicationsEvent(s); } ;
            }
        }
        CommPrescriptionItemViewVM_GetMedicationsEvent(PresItemDetails: CommPrescriptionItemViewVM): void {
            if (PresItemDetails != null && PresItemDetails.MedsResolve != null && this.lGroupSeqNo > 0) {
              //to be reVisit 33655
                CCommSequentialHelper.LaunchItemsInSequenceMezzanine(PresItemDetails.MedsResolve, this.lGroupSeqNo, (s) => {this.OnSequentialMezzanineClosed(s)});
                return
            }
        }
        OnSequentialMezzanineClosed(args: AppDialogEventargs): void {
            this.lGroupSeqNo = 0;
            //this.objCommPrescriptionItemViewVM.GetMedicationsEvent -= new CommPrescriptionItemViewVM.GetMedicationsDelegate(this.CommPrescriptionItemViewVM_GetMedicationsEvent);
            Busyindicator.SetStatusIdle("LaunchSeqMez");
            if (args != null && args.AppChildWindow != null)
            args.AppChildWindow.DialogRef.close();
                //args.AppChildWindow.DialogResult = false;
        }
        ReviewIconWarning_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
          //LORENZO.BlueBird.Controls.MessageBoxResult.Yes
            if (e.MessageBoxResult == MessageBoxResult.Yes) {
                this.LaunchReviewOutcome(this.DrugHotspotKey, this.objtagheader.DrugName);
            }
            else {
                this.IsOmitReinstateReviewClicked = false;
            }
        }
        private LaunchReviewOutcome(Key: string, DrugName: string): void {
            let sResult: String = String.Empty;
            sResult = ObjectHelper.CreateType<String>(HtmlPage.Window.Invoke("CreatePessimisticLock", MedChartData.MedChartOID, "MAReview", Common.nLockDuration), String);
            this.sPrescriptionItemName = DrugName;
            let PrescriptionOID: number = Convert.ToInt64(Key);
            let RowKey: String = "Row-" + Key;
            this.oChartRow = this.medChartOverview.ChartRows.Where(c => c.Key == RowKey).Select(s => s).ToList<ChartRow>().FirstOrDefault();
            this.IsOmitReinstateReviewClicked = true;
            this.objFrequencyDetails = null;
            this.objScheduletimes = null;
            this.AdminTimeVM = null;
            if (this.objtagheader.DrugFrequencyOID > 0) {
                this.AdminTimeVM = new AdminstrativeTimesVM(this.objtagheader.DrugFrequencyOID);
            }
            if (this.oChartRow != null) {
                if ((this.oChartRow.TimeSlots != null && this.oChartRow.TimeSlots.Count > 0 && String.IsNullOrEmpty(this.oChartRow.TimeSlots[0].SlotTime)) || (this.oChartRow.TimeSlots == null) || (this.oChartRow.TimeSlots != null && this.oChartRow.TimeSlots.Count == 0)) {
                    if (!((this.objtagheader.IsInfusion && !String.Equals(this.objtagheader.INFTYCODE, InfusionTypeCode.INTERMITTENT)) || (this.objtagheader.IsInfusion && String.Equals(this.objtagheader.INFTYCODE, InfusionTypeCode.INTERMITTENT) && String.Equals(this.objtagheader.DoseType, DoseTypeCode.STEPPEDVARIABLE)) || this.objtagheader.IsPRN || String.Equals(this.objtagheader.FreqPerodcode, CConstants.OnceOnlyPerodCode) || String.Equals(this.objtagheader.DoseType, DoseTypeCode.STEPPEDVARIABLE))) {
                        let objServiceProxy: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
                        objServiceProxy.GetScheduleTimeAndFreqCompleted  = (s,e) => { this.objService_GetScheduleTimeAndFreqCompleted(s,e); } ;
                        let objReq: IPPMAManagePrescSer.CReqMsgGetScheduleTimeAndFreq = new IPPMAManagePrescSer.CReqMsgGetScheduleTimeAndFreq();
                        objReq.PatientOIDBC = PatientContext.PatientOID;
                        objReq.PrescriptionItemOIDBC = PrescriptionOID;
                        objReq.PrescriptionStartDateBC = this.objtagheader.StartDate;
                        if (this.objtagheader.EndDate.Equals(DateTime.MinValue)) {
                            objReq.PrescriptionEndDateBC = CommonBB.GetServerDateTime();
                        }
                        else {
                            objReq.PrescriptionEndDateBC = this.objtagheader.EndDate;
                        }
                        objReq.oContextInformation = CommonBB.FillContext();
                        objServiceProxy.GetScheduleTimeAndFreqAsync(objReq);
                    }
                    else {
                        let objServiceProxy: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
                        objServiceProxy.GetReviewHistoryCompleted  = (s,e) => { this.objService_GetReviewHistoryCompleted(s,e); } ;
                        let objReq: IPPMAManagePrescSer.CReqMsgGetReviewHistory = new IPPMAManagePrescSer.CReqMsgGetReviewHistory();
                        objReq.lnPatientoidBC = PatientContext.PatientOID;
                        objReq.lnPrescriptionItemOIDBC = PrescriptionOID;
                        objReq.IsCurrentRequiredBC = true;
                        objReq.oContextInformation = CommonBB.FillContext();
                        objServiceProxy.GetReviewHistoryAsync(objReq);
                    }
                }
                else {
                    let objServiceProxy: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
                    objServiceProxy.GetReviewHistoryCompleted  = (s,e) => { this.objService_GetReviewHistoryCompleted(s,e); } ;
                    let objReq: IPPMAManagePrescSer.CReqMsgGetReviewHistory = new IPPMAManagePrescSer.CReqMsgGetReviewHistory();
                    objReq.lnPatientoidBC = PatientContext.PatientOID;
                    objReq.lnPrescriptionItemOIDBC = PrescriptionOID;
                    objReq.IsCurrentRequiredBC = true;
                    objReq.oContextInformation = CommonBB.FillContext();
                    objServiceProxy.GetReviewHistoryAsync(objReq);
                }
            }
        }
        LaunchMultiComponentItemDetails(nMedCharOId: number, sItemName: string): void {
            this.oMedMCItems = new medMCItems();
            this.oMedMCItems.constructorimpl(nMedCharOId, sItemName, String.Empty);
            this.oMedMCItems.onDialogClose = (s) => { this.oMedMCItems_Closed(s); }
            // ObjectHelper.stopFinishAndCancelEvent(true);
            AppActivity.OpenWindow(sItemName, this.oMedMCItems, (s) => { this.oMedMCItems_Closed(s); }, sItemName, false, 400, 600, false, WindowButtonType.Close, null);
        }
        oMedMCItems_Closed(args: AppDialogEventargs): void {
            this.oChildWindow = args.AppChildWindow;
            if (this.oChildWindow != null) {
                // ObjectHelper.stopFinishAndCancelEvent(false);
                this.oChildWindow.DialogResult = true;
            }
        }
        LaunchDosecalciDetails(PrescriptionItemOId: number, sDrugName: string): void {
            Busyindicator.SetStatusBusy("DCIconClicked");
            let objDosecalc: MedDoseDetails = new MedDoseDetails();
            this.objPrescitemdetvm = new PrescriptionItemDetailsVM();
            objDosecalc.PrescriptionItemOID = PrescriptionItemOId;
            this.objPrescitemdetvm.GetDoseDeatils(PrescriptionItemOId);
            this.objPrescitemdetvm.DoseDetailEvent  = (s,e) => { this.PrescriptionItemDetailsVM_DoseDetailEvent(s); } ;
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
            // ObjectHelper.stopFinishAndCancelEvent(true);
            AppActivity.OpenWindow(stitle, objDoseCalc, this.omedDoseDetails_Closed, "", false, dialogWindowHeight, 820, false, WindowButtonType.Close, null);
        }
        omedDoseDetails_Closed(args: AppDialogEventargs): void {
            Busyindicator.SetStatusIdle("DCIconClicked");
            // ObjectHelper.stopFinishAndCancelEvent(false);
            args.AppChildWindow.DialogResult = true;
        }
        medChartOverview_OnSlotHotSpotClick(sender: Object, TagObject: TagObject): void {
            //this.medChartOverview.DicSelectedSlots = d;
            this.disableClick = false;
            this.medChartOverviewOnSlotHotSpotClick(sender,TagObject);
        }
        public medChartOverviewOnSlotHotSpotClick(sender:Object,TagObject: TagObject): void {
            this.IsMedicationSelected = false;
            let oTagDrugHeaderDetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>((TagObject.oDrugItem.Tag), TagDrugHeaderDetail);
            if (oTagDrugHeaderDetail != null && oTagDrugHeaderDetail.IsPRN && !oTagDrugHeaderDetail.IsPRNWithSchedule) {
                this.cmdClearSelection.IsEnabled = false;
            }
            else {
                this.cmdClearSelection.IsEnabled = (this.medChartOverview.SelectedSlots != null && this.medChartOverview.SelectedSlots.Count > 0) ? true : false;
            }
            this.nSlotsActiveCount = this.medChartOverview.SelectedSlots.Count;
            this.medChartOverview.IsHitTestVisible = false;
            if (this.medChartOverview.SelectedSlots != null && this.medChartOverview.SelectedSlots.Count > 0) {
                if (TagObject != null) {
                    this.oRefreshTagObject = TagObject;
                    let SelectedItems = this.medChartOverview.SelectedSlots.GroupBy(g => g.oDrugItem.Key).Count();
                    if (SelectedItems > 1) {
                        this.medChartOverview.ClearAllSlotSelection();
                        //this.medChartOverview.SelectSlot(TagObject.oIChartSlot.Key); //tobe revisit by suresh
                        this.medChartOverview.SelectSlot(sender);
                        this.GetSelectionCount(TagObject, true);
                        this.isClearPreviousSelection = false;
                    }
                    else {
                        if (this.isClearPreviousSelection) {
                            this.medChartOverview.ClearAllSlotSelection();
                            //this.medChartOverview.SelectSlot(TagObject.oIChartSlot.Key);//tobe revisit by suresh
                            this.medChartOverview.SelectSlot(sender);
                            this.GetSelectionCount(TagObject, true);
                            this.isClearPreviousSelection = false;
                        }
                        else {
                            this.GetSelectionCount(TagObject, false);
                        }
                    }
                }
                this.EnableDisableLinks();
                if (this.medChartOverview.SelectedSlots != null && this.medChartOverview.SelectedSlots.Count == 1) {
                    if (this.medChartOverview.GetSelectedRows().Count > 0) {
                        this.medChartOverview.ClearAllSelectedRows();
                        this.medChartOverview.SelectSlot(TagObject.oIChartSlot.Key);
                        if (this.medChartOverview.SelectedSlots.Count == 1) {
                            this.GetSelectionCount(TagObject, true);
                            this.EnableDisableLinks();
                        }
                    }
                    let IsAdminisatrtionAvaialble: boolean = false;
                    if (oTagDrugHeaderDetail != null && oTagDrugHeaderDetail.IsPRN && !oTagDrugHeaderDetail.IsPRNWithSchedule && this.oGetMedsChartData != null && this.oGetMedsChartData.LstDrugDetail != null) {
                        let nDrugCount: number = this.oGetMedsChartData.LstDrugDetail.Count;
                        if (nDrugCount > 0) {
                            for (let jCnt: number = 0; jCnt < nDrugCount; jCnt++) {
                                if (this.oGetMedsChartData.LstDrugDetail[jCnt].DrugHeader.PrescriptionItemOID == oTagDrugHeaderDetail.PrescriptionItemOID) {
                                    if (this.oGetMedsChartData.LstDrugDetail[jCnt].SlotDetails.Where(x => x.AdministrationDetail != null && TagObject != null && TagObject.oChartColumn != null && !String.IsNullOrEmpty(TagObject.oChartColumn.Caption) && x.ScheduledDTTM.Date == Convert.ToDateTime(TagObject.oChartColumn.Caption).Date).Count() > 0) {
                                        IsAdminisatrtionAvaialble = true;
                                        break;
                                    }
                                }
                            }
                        }
                        if (IsAdminisatrtionAvaialble && !this.IsHistoryChartIconClicked) {
                            this.LaunchPRNSlot(TagObject);
                        }
                    }
                }
            }
            else {
                this.ClearAllSelection();
            }
            this.medChartOverview.IsHitTestVisible = true;
        }
        LaunchPRNSlot(TagObject: TagObject): void { //LORENZO.BlueBird.Controls.TagObject
            let oMedsAdminVM: MedsAdminMultiSlotVM = new MedsAdminMultiSlotVM();
            oMedsAdminVM.IsLaunchedPRNFromPresChart = true;
            oMedsAdminVM.CurrentDateTime = this.dtCurrentDateTime;
            oMedsAdminVM.MedchartOID = MedChartData.MedChartOID;
            oMedsAdminVM.PrescriptionItemOID = Convert.ToInt64(TagObject.oDrugItem.Key);
            oMedsAdminVM.DrugDetail = TagObject.oDrugItem;
            oMedsAdminVM.SlotDate = Convert.ToDateTime(TagObject.oChartColumn.Caption);
            oMedsAdminVM.IsPRN = true;
            let oMedsAdminPRN: MedsAdminPRNSlot = new MedsAdminPRNSlot();
            let oAddnlInfo: CDrugHdrAddnlInfo = null;
            if (!String.IsNullOrEmpty(TagObject.oDrugItem.AdminWarningMessage))
                oAddnlInfo = ObjectHelper.CreateObject(new CDrugHdrAddnlInfo(), { IngredientAdminWarning: TagObject.oDrugItem.AdminWarningMessage });
            oMedsAdminPRN.drgHeader.oDrugHeader = new CDrugHeader();
            oMedsAdminPRN.drgHeader.oDrugHeader.oDrugHdrBasicInfo = new DrugHeaderItem();
            oMedsAdminPRN.drgHeader.oDrugHeader.oDrugHdrBasicInfo.bShowFrequency = true;
            oMedsAdminPRN.drgHeader.oDrugHeader.oDrugHdrBasicInfo.bShowSite = true;
            oMedsAdminPRN.drgHeader.oDrugHeader.oDrugHdrBasicInfo.bShowAsrequired = true;
            oMedsAdminPRN.drgHeader.DataContext = Common.SetDrugHeaderContent(TagObject.oDrugItem, oAddnlInfo, oMedsAdminPRN.drgHeader);
            oMedsAdminPRN.drgHeader.lblInstructions.Visibility =Visibility.Visible;
            oMedsAdminPRN.DataContext = oMedsAdminVM;
            oMedsAdminPRN.IsDiscontinued = String.Compare(TagObject.oDrugItem.PrescriptionStatus, "Discontinued", StringComparison.CurrentCultureIgnoreCase) == 0 ? true : false;
            if (TagObject.oDrugItem.AdminPRNIcon2 != null)
                oMedsAdminPRN.IsPatientSelfAdmin = (String.Compare(TagObject.oDrugItem.AdminPRNIcon2.Key, CConstants.SelfAdminText) == 0);
            else oMedsAdminPRN.IsPatientSelfAdmin = false;
            Busyindicator.SetStatusBusy("PRNMezzanine");
            AppActivity.OpenWindow(TagObject.oChartColumn.Caption, oMedsAdminPRN, this.oMedsAdminPRN_Closed, "", false, 550, 462, false, WindowButtonType.Close, null);
        }
        oMedsAdminPRN_Closed(args: AppDialogEventargs): void {
            Busyindicator.SetStatusIdle("PRNMezzanine");
            if (this.medChartOverview != null && this.medChartOverview.SelectedSlots != null && this.medChartOverview.SelectedSlots.Count > 0) {
                this.medChartOverview.ClearAllSlotSelection();
            }
            args.AppChildWindow.DialogResult = false;
        }
        private EnableDisableLinks(): void {
            let bInfusionSelected: boolean = false;
            let bIndefiniteOmittedSelected: boolean = false;
            let oOmitSlotsVM: OmitSlotsVM = new OmitSlotsVM();
            if (this.medChartOverview.SelectedSlots.Count == 0 || this.nInvalidSlotSelectedCount > 0) {
                this.cmdOmit.IsEnabled = false;
                this.cmdReinstate.IsEnabled = false;
                this.cmdEnterDose.IsEnabled = false;
            }
            else {
                if ((this.nSlotSelectedCountForOmit > 0 && this.medChartOverview.SelectedSlots.Count == this.nSlotSelectedCountForOmit) || this.IsPastSelected) {
                    this.cmdOmit.IsEnabled = true;
                }
                else {
                    this.cmdOmit.IsEnabled = false;
                }
                if (this.nSlotSelectedCountForEnterDose == 1 && this.medChartOverview.SelectedSlots.Count == this.nSlotSelectedCountForEnterDose) {
                    this.cmdEnterDose.IsEnabled = true;
                }
                else {
                    this.cmdEnterDose.IsEnabled = false;
                }
                if ((this.nSlotSelectedCountForReinstate > 0 && this.medChartOverview.SelectedSlots.Count == this.nSlotSelectedCountForReinstate) || this.IsPastOmitSlotSelected) {
                    this.cmdReinstate.IsEnabled = this.medChartOverview.SelectedSlots.Any(x => x.oDrugItem != null && x.oDrugItem.Tag != null && (ObjectHelper.CreateType<TagDrugHeaderDetail>((x.oDrugItem.Tag), TagDrugHeaderDetail)) != null && !String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>((x.oDrugItem.Tag), TagDrugHeaderDetail)).PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase) && !String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>((x.oDrugItem.Tag), TagDrugHeaderDetail)).PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) && !String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>((x.oDrugItem.Tag), TagDrugHeaderDetail)).PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.CurrentCultureIgnoreCase));
                }
                else {
                    this.cmdReinstate.IsEnabled = false;
                }
                bInfusionSelected = this.medChartOverview.SelectedSlots.Any(x => x.oDrugItem.IsInfusion && (ObjectHelper.CreateType<TagDrugHeaderDetail>((x.oDrugItem.Tag), TagDrugHeaderDetail)) != null && (!String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>((x.oDrugItem.Tag), TagDrugHeaderDetail)).INFTYCODE, InfusionTypesCode.INTERMITTENT) || ((ObjectHelper.CreateType<DoseOverviewSlot>(x.oIChartSlot, DoseOverviewSlot)) != null && (ObjectHelper.CreateType<TagSlotDetail>((ObjectHelper.CreateType<DoseOverviewSlot>(x.oIChartSlot, DoseOverviewSlot)).Tag, TagSlotDetail)) != null && !(ObjectHelper.CreateType<TagSlotDetail>((ObjectHelper.CreateType<DoseOverviewSlot>(x.oIChartSlot, DoseOverviewSlot)).Tag, TagSlotDetail)).IsBolus && String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>((x.oDrugItem.Tag), TagDrugHeaderDetail)).INFTYCODE, InfusionTypesCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) && (String.Equals((ObjectHelper.CreateType<TagSlotDetail>((ObjectHelper.CreateType<DoseOverviewSlot>(x.oIChartSlot, DoseOverviewSlot)).Tag, TagSlotDetail)).SlotStatus, SlotStatus.INPROGRESS, StringComparison.CurrentCultureIgnoreCase) || String.Equals((ObjectHelper.CreateType<TagSlotDetail>((ObjectHelper.CreateType<DoseOverviewSlot>(x.oIChartSlot, DoseOverviewSlot)).Tag, TagSlotDetail)).SlotStatus, SlotStatus.PAUSED, StringComparison.CurrentCultureIgnoreCase) || String.Equals((ObjectHelper.CreateType<TagSlotDetail>((ObjectHelper.CreateType<DoseOverviewSlot>(x.oIChartSlot, DoseOverviewSlot)).Tag, TagSlotDetail)).SlotStatus, SlotStatus.COMPLETED, StringComparison.CurrentCultureIgnoreCase) || String.Equals((ObjectHelper.CreateType<TagSlotDetail>((ObjectHelper.CreateType<DoseOverviewSlot>(x.oIChartSlot, DoseOverviewSlot)).Tag, TagSlotDetail)).SlotStatus, SlotStatus.STOPPED, StringComparison.CurrentCultureIgnoreCase)))));
                if (bInfusionSelected) {
                    this.cmdOmit.IsEnabled = false;
                }
                if (this.medChartOverview.SelectedSlots != null && this.medChartOverview.SelectedSlots.Count > 0) {
                    bIndefiniteOmittedSelected = this.medChartOverview.SelectedSlots.Any(x => x.oDrugItem != null && (String.Equals(x.oDrugItem.OmitLabel, CConstants.OmitIndefinite, StringComparison.CurrentCultureIgnoreCase)) && (ObjectHelper.CreateType<TagDrugHeaderDetail>((x.oDrugItem.Tag), TagDrugHeaderDetail)) != null && ((ObjectHelper.CreateType<TagDrugHeaderDetail>((x.oDrugItem.Tag), TagDrugHeaderDetail)).IsIndefiniteOmit));
                    if (bIndefiniteOmittedSelected) {

                        // let AscendingSlotDTTM = from oslot in medChartOverview.SelectedSlots
                        // let oDoseOvwSlot = oslot.oIChartSlot as DoseOverviewSlot
                        // let oTagDoseOvwSlot = oDoseOvwSlot.Tag as TagSlotDetail
                        // where  !String.IsNullOrEmpty(oTagDoseOvwSlot.SlotStatus)
                        //     && String.Equals(oTagDoseOvwSlot.SlotStatus, SlotStatus.OMITTED, StringComparison.CurrentCultureIgnoreCase)
                        // orderby oTagDoseOvwSlot.SlotDateTime
                        // select oTagDoseOvwSlot;

                        // need to change by suresh
                        let oTagDoseOvwSlotArr = [];
                        this.medChartOverview.SelectedSlots.forEach(oslot => {
                        let oDoseOvwSlot = oslot.oIChartSlot as DoseOverviewSlot;
                        let oTagDoseOvwSlot = oDoseOvwSlot.Tag as TagSlotDetail;
                        
                          if(!String.IsNullOrEmpty(oTagDoseOvwSlot.SlotStatus)
                           && String.Equals(oTagDoseOvwSlot.SlotStatus, SlotStatus.OMITTED, StringComparison.CurrentCultureIgnoreCase)){
                            //return oTagDoseOvwSlot;
                            oTagDoseOvwSlotArr.push(oTagDoseOvwSlot);
                           }
                        });
                         let AscendingSlotDTTM = oTagDoseOvwSlotArr.sort((a,b) => a.SlotDateTime - b.SlotDateTime); 
                        // let oslot = this.medChartOverview.SelectedSlots;
                        //  let oDoseOvwSlot = oslot.oIChartSlot as DoseOverviewSlot
                        //  let oTagDoseOvwSlot = oDoseOvwSlot.Tag as TagSlotDetail
                        // let AscendingSlotDTTM = this.medChartOverview.SelectedSlots.Where(oslot =>!String.IsNullOrEmpty(oTagDoseOvwSlot.SlotStatus)&&String.Equals(oTagDoseOvwSlot.SlotStatus,SlotStatus.OMITTED,StringComparison.CurrentCultureIgnoreCase)).orderby(oTagDoseOvwSlot=>oTagDoseOvwSlot.SlotDateTime).Select(oTagDoseOvwSlot=>oTagDoseOvwSlot);
                        if (AscendingSlotDTTM != null && AscendingSlotDTTM.Count() > 0) {
                            AscendingSlotDTTM.forEach( (item)=> {
                                if (item.SlotDateTime.NotEquals(DateTime.MinValue) && item.SlotDateTime < this.dtCurrentDateTime) {
                                    this.cmdReinstate.IsEnabled = false;
                                }
                                //break;
                                return;
                            });
                        }
                    }
                }
            }
        }
        private GetSelectionCount(oTagObject: TagObject, isAllCleared: boolean): void {
            let oTagSlotDetail: TagSlotDetail = ObjectHelper.CreateType<TagSlotDetail>((ObjectHelper.CreateType<DoseOverviewSlot>(oTagObject.oIChartSlot, DoseOverviewSlot)).Tag, TagSlotDetail);
            let oTagDrugHeaderDetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>((oTagObject.oDrugItem.Tag), TagDrugHeaderDetail);
            let IsItermittent: boolean = true;
            if (isAllCleared) {
                this.nSlotSelectedCountForOmit = 0;
                this.nSlotSelectedCountForReinstate = 0;
                this.nSlotSelectedCountForEnterDose = 0;
                this.nInvalidSlotSelectedCount = 0;
            }
            this.doseType = oTagDrugHeaderDetail.DoseType;
            let isTitrated: boolean = String.Compare(this.doseType, DoseTypeCode.TITRATED, StringComparison.CurrentCultureIgnoreCase) == 0;
            if (String.Compare(oTagDrugHeaderDetail.INFTYCODE, InfusionTypesCode.CONTINUOUS, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oTagDrugHeaderDetail.INFTYCODE, InfusionTypesCode.PCA, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oTagDrugHeaderDetail.ItemSubType, InfusionTypesCode.SUBTYPE_GAS, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oTagDrugHeaderDetail.INFTYCODE, InfusionTypesCode.SINGLEDOSEVOLUME, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oTagDrugHeaderDetail.INFTYCODE, InfusionTypesCode.FLUID, StringComparison.CurrentCultureIgnoreCase) == 0) {
                IsItermittent = false;
            }
            if (!String.Equals(oTagSlotDetail.SlotStatus, SlotStatus.GIVEN, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oTagSlotDetail.SlotStatus, SlotStatus.INPROGRESS, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oTagSlotDetail.SlotStatus, SlotStatus.COMPLETED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oTagSlotDetail.SlotStatus, SlotStatus.STOPPED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oTagSlotDetail.SlotStatus, SlotStatus.PAUSED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oTagSlotDetail.SlotStatus, SlotStatus.OMITTED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oTagDrugHeaderDetail.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oTagDrugHeaderDetail.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oTagDrugHeaderDetail.PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.InvariantCultureIgnoreCase)) {
                this.IsPastSelected = false;
                this.IsPastOmitSlotSelected = false;
                if ((this.medChartOverview.SelectedSlots != null && this.medChartOverview.SelectedSlots.Count > 0)) {
                    this.medChartOverview.SelectedSlots.forEach( (oTagObjects)=> {
                        let oOverViewSlot: DoseOverviewSlot = ObjectHelper.CreateType<DoseOverviewSlot>(oTagObjects.oIChartSlot, DoseOverviewSlot);
                        let oTagSlotDetails: TagSlotDetail = ObjectHelper.CreateType<TagSlotDetail>(oOverViewSlot.Tag, TagSlotDetail);
                        if (oTagSlotDetails.SlotDateTime < CommonBB.GetServerDateTime()) {
                            if (!String.Equals(oTagSlotDetails.SlotStatus, SlotStatus.OMITTED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oTagSlotDetails.SlotStatus, SlotStatus.GIVEN, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oTagSlotDetail.SlotStatus, SlotStatus.INPROGRESS, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oTagSlotDetail.SlotStatus, SlotStatus.COMPLETED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oTagSlotDetail.SlotStatus, SlotStatus.STOPPED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oTagSlotDetail.SlotStatus, SlotStatus.PAUSED, StringComparison.InvariantCultureIgnoreCase)) {
                                this.IsPastSelected = true;
                                //break;
                               return;
                            }
                        }
                    });
                }
                if (isTitrated) {
                    this.nSlotSelectedCountForEnterDose = this.GetNumericUpDownValues(this.nSlotSelectedCountForEnterDose, oTagObject.IsSelected);
                    this.nSlotSelectedCountForOmit = this.GetNumericUpDownValues(this.nSlotSelectedCountForOmit, oTagObject.IsSelected);
                }
                else if (IsItermittent)
                    this.nSlotSelectedCountForOmit = this.GetNumericUpDownValues(this.nSlotSelectedCountForOmit, oTagObject.IsSelected);
            }
            else if (String.Compare(oTagSlotDetail.SlotStatus, SlotStatus.OMITTED, StringComparison.CurrentCultureIgnoreCase) == 0) {
                if ((this.medChartOverview.SelectedSlots != null && this.medChartOverview.SelectedSlots.Count > 0)) {
                    this.IsPastSelected = false;

                    this.IsPastOmitSlotSelected = this.medChartOverview.SelectedSlots.Any(oTagObjects => ObjectHelper.CreateType<TagSlotDetail>(ObjectHelper.CreateType<DoseOverviewSlot>(oTagObjects.oIChartSlot, DoseOverviewSlot), TagSlotDetail).SlotDateTime < CommonBB.GetServerDateTime() && String.Equals(ObjectHelper.CreateType<TagSlotDetail>(ObjectHelper.CreateType<DoseOverviewSlot>(oTagObjects.oIChartSlot, DoseOverviewSlot), TagSlotDetail).SlotStatus, SlotStatus.OMITTED, StringComparison.InvariantCultureIgnoreCase)
                        || String.Equals(ObjectHelper.CreateType<TagSlotDetail>(ObjectHelper.CreateType<DoseOverviewSlot>(oTagObjects.oIChartSlot, DoseOverviewSlot), TagSlotDetail).SlotStatus, SlotStatus.OMITTED, StringComparison.InvariantCultureIgnoreCase))

                }
                this.nSlotSelectedCountForReinstate = this.GetNumericUpDownValues(this.nSlotSelectedCountForReinstate, oTagObject.IsSelected);
            }
            else {
                this.nInvalidSlotSelectedCount = this.GetNumericUpDownValues(this.nInvalidSlotSelectedCount, oTagObject.IsSelected);
            }
        }
        private GetNumericUpDownValues(nValue: number, isSlotSelected: boolean): number {
            if (isSlotSelected) {
                nValue++;
            }
            else if (nValue > 0) {
                nValue--;
            }
            return nValue;
        }
         lblSortFilter_Click(sender?: Object, e?: RoutedEventArgs): void {
            if (this.oOverViewChartData.MedChartOID <= 0) {
                this.oOverViewChartData.SortRangeStartDate = MedChartData.ActiveFrom.Date;
                this.oOverViewChartData.SortRangeEndDate = MedChartData.ActiveTo.DateTime.AddSeconds(86399);
                this.oOverViewChartData.ValidateDate = MedChartData.ActiveFrom;
            }
            this.oOverViewChartData.ActiveFrom = this.medChartOverview.StartDate;
            this.oOverViewChartData.ActiveTo = this.medChartOverview.EndDate;
            if (this.oOverViewChartData != null && this.oOverViewChartData.MedViewOptionList != null && this.oOverViewChartData.MedViewOptionList.Count > 0 && this.oOverViewChartData.MedViewOptionList.Any(x => String.Equals(x.Value, this.sMedViewOptionValue, StringComparison.InvariantCultureIgnoreCase))) {
                this.oOverViewChartData.MedViewOptionValue = this.oOverViewChartData.MedViewOptionList.Where(x => String.Equals(x.Value, this.sMedViewOptionValue, StringComparison.InvariantCultureIgnoreCase)).FirstOrDefault();
            }
            //this.oSortFilterOpt = new MedSortFilterbyOptions(this.oOverViewChartData, true);
            this.oSortFilterOpt = new MedSortFilterbyOptions();
            this.oSortFilterOpt.constructorImpl(this.oOverViewChartData, true);
            this.oSortFilterOpt.onDialogClose = this.oSortFilterOpt_Closed;
            // ObjectHelper.stopFinishAndCancelEvent(true);
            AppActivity.OpenWindow("Prescription chart -Filter by options", this.oSortFilterOpt, (s)=>{this.oSortFilterOpt_Closed(s)}, "", false, 250, 380, false, WindowButtonType.OkCancel, null);
        }
        oSortFilterOpt_Closed(args: AppDialogEventargs): void {
            let bdialogresult: boolean = false;
            // this.oSortFilterOpt = ObjectHelper.CreateType<MedSortFilterbyOptions>(args.Content, MedSortFilterbyOptions);
            this.oSortFilterOpt = args.Content.Component;
            if (args.Result == AppDialogResult.Ok) {
                bdialogresult = this.oSortFilterOpt.cmdOK_Click();
                this.oOverViewChartData = ObjectHelper.CreateType<OverViewChartData>(this.oSortFilterOpt.DataContext, OverViewChartData);
                if (bdialogresult) {
                    if (this.oSortFilterOpt != null) {
                        this.ClearAllSelection();
                        if (this.oSortFilterOpt.DataContext != null && this.oSortFilterOpt.DataContext instanceof OverViewChartData) {
                            if (this.oOverViewChartData.ChartStatus == CConstants.sChartInActiveStatusCode)
                                this.medChartOverview.IsEnabled = false;
                            else this.medChartOverview.IsEnabled = true;
                            if (this.oOverViewChartData.MedChartPatOID > 0) {
                                ChartContext.PatientOID = this.oOverViewChartData.MedChartPatOID;
                                ChartContext.EncounterOID = this.oOverViewChartData.EncounterOID;
                                ChartContext.EncounterType = Common.GetConceptCode(this.oOverViewChartData.EncType, ValueDomainValues.oEncTyp);
                            }
                            this.sMedViewOptionValue = this.oOverViewChartData.MedViewOptionValue != null && !String.IsNullOrEmpty(this.oOverViewChartData.MedViewOptionValue.Value) ? this.oOverViewChartData.MedViewOptionValue.Value : String.Empty;
                            if (!String.IsNullOrEmpty(this.sMedViewOptionValue) && String.Compare(this.sMedViewOptionValue, "CC_14DAYVIEW") == 0) {
                                this.iRdb14day.IsChecked = true;
                            }
                            else {
                                this.iRdb7day.IsChecked = true;
                            }
                            this.SetSortFilterData();
                        }
                    }
                    this.oSortFilterOpt.appDialog.DialogResult = bdialogresult;
                }
                // ObjectHelper.stopFinishAndCancelEvent(false);
            }
            else if (args.Result == AppDialogResult.Cancel) {
                // ObjectHelper.stopFinishAndCancelEvent(false);
                this.oSortFilterOpt.cmdCancel_Click();
            }
        }
        private SetSortFilterData(): void {
            this.StartDate = this.oOverViewChartData.ActiveFrom;
            if (this.oOverViewChartData.ActiveTo.Equals(DateTime.MinValue)) {
                if (!String.IsNullOrEmpty(this.sMedViewOptionValue) && String.Compare(this.sMedViewOptionValue, "CC_14DAYVIEW") == 0)
                    this.EndDate = this.StartDate.AddDays(13);
                else this.EndDate = this.StartDate.AddDays(6);
            }
            else this.EndDate = this.oOverViewChartData.ActiveTo;
            let dtCurrent: DateTime= CommonBB.GetServerDateTime();
            this.FillMedChartBasicData(dtCurrent);
            if (this.oOverViewChartData.SortByValue != null) {
                if (String.Compare(this.oOverViewChartData.SortByValue.Value, CConstants.SortByChronological, StringComparison.CurrentCultureIgnoreCase) == 0)
                    this.GetChartData(this.oOverViewChartData.SortByValue.Value, dtCurrent);
                else if (String.Compare(this.oOverViewChartData.SortByValue.Value, CConstants.SortByRevChronological, StringComparison.CurrentCultureIgnoreCase) == 0)
                    this.GetChartData(this.oOverViewChartData.SortByValue.Value, dtCurrent);
                else this.GetChartData(String.Empty, dtCurrent);
            }
        }
        cmdPrevDay_Click(sender?: Object, e?: RoutedEventArgs): void {
            this.ClearAllSelection();
            this.StartDate = this.StartDate.AddDays(-1);
            this.EndDate = this.EndDate.AddDays(-1);
            let dtServerDate: DateTime= CommonBB.GetServerDateTime();
            this.FillMedChartBasicData(dtServerDate);
            this.GetChartData(String.Empty, dtServerDate);
        }
        chkDiscontiueCompleted_Checked(sender?, e?: RoutedEventArgs): void {
            if (sender.target.checked) {
            let dtServerDate: DateTime= CommonBB.GetServerDateTime();
            if (this.oOverViewChartData == null) {
                this.SetOverViewDateRange(dtServerDate);
            }
            this.oOverViewChartData.IsDiscontinueChecked = true;
            this.FillMedChartBasicData(dtServerDate);
            this.GetChartData(String.Empty, dtServerDate);
        }else{
            this.chkDiscontiueCompleted_Unchecked()
        }
        }
         chkDiscontiueCompleted_Unchecked(sender?: Object, e?: RoutedEventArgs): void {
            this.oOverViewChartData.IsDiscontinueChecked = false;
            let dtServerDate: DateTime= CommonBB.GetServerDateTime();
            this.FillMedChartBasicData(dtServerDate);
            this.GetChartData(String.Empty, dtServerDate);
        }
         cmdPrevWeek_Click(sender?: Object, e?: RoutedEventArgs): void {
            this.ClearAllSelection();
            this.StartDate = this.StartDate.AddDays(-7);
            this.EndDate = this.EndDate.AddDays(-7);
            let dtServerDate: DateTime= CommonBB.GetServerDateTime();
            this.FillMedChartBasicData(dtServerDate);
            this.GetChartData(String.Empty, dtServerDate);
        }
         cmdNextDay_Click(sender?: Object, e?: RoutedEventArgs): void {
            this.ClearAllSelection();
            this.StartDate = this.StartDate.AddDays(1);
            this.EndDate = this.EndDate.AddDays(1);
            let dtServerDate: DateTime= CommonBB.GetServerDateTime();
            this.FillMedChartBasicData(dtServerDate);
            this.GetChartData(String.Empty, dtServerDate);
        }
        cmdNextWeek_Click(sender?: Object, e?: RoutedEventArgs): void {
            this.ClearAllSelection();
            this.StartDate = this.StartDate.AddDays(7);
            this.EndDate = this.EndDate.AddDays(7);
            let dtServerDate: DateTime= CommonBB.GetServerDateTime();
            this.FillMedChartBasicData(dtServerDate);
            this.GetChartData(String.Empty, dtServerDate);
        }
        cmdToday_Click(sender?: Object, e?: RoutedEventArgs): void {
            this.ClearAllSelection();
            let dtServerDate: DateTime= CommonBB.GetServerDateTime();
            let bIsDiscontinueChecked: boolean = false;
            if (this.oOverViewChartData != null) {
                bIsDiscontinueChecked = this.oOverViewChartData.IsDiscontinueChecked;
            }
            this.oOverViewChartData = new OverViewChartData();
            MedChartData.MedChartOID = this.oOverViewChartData.MedChartOID = MedChartDefaultData.MedChartOID;
            MedChartData.ChartStatus = this.oOverViewChartData.ChartStatus = MedChartDefaultData.ChartStatus;
            this.oOverViewChartData.IsDiscontinueChecked = bIsDiscontinueChecked;
            if (!String.IsNullOrEmpty(this.sMedViewOptionValue) && String.Compare(this.sMedViewOptionValue, "CC_14DAYVIEW") == 0) {
                if ((String.Compare(MedChartDefaultData.ChartStatus, CConstants.sChartActiveStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(MedChartDefaultData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0)) {
                    let tsCompareStartDate: TimeSpan = dtServerDate.Subtract(MedChartDefaultData.ActiveFrom);
                    if (tsCompareStartDate.Days < 7)
                        this.oOverViewChartData.ActiveFrom = this.StartDate = MedChartDefaultData.ActiveFrom.Date;
                    else this.oOverViewChartData.ActiveFrom = this.StartDate = dtServerDate.DateTime.AddDays(-6);
                    this.oOverViewChartData.ActiveTo = this.EndDate = this.StartDate.AddDays(13);
                }
                else {
                    this.oOverViewChartData.ActiveFrom = this.StartDate = MedChartDefaultData.ActiveFrom.Date;
                    let tsCompareEndDate: TimeSpan = MedChartDefaultData.ActiveTo.Subtract(MedChartDefaultData.ActiveFrom);
                    if (tsCompareEndDate.Days < 14)
                        this.oOverViewChartData.ActiveTo = this.EndDate = MedChartDefaultData.ActiveTo;
                    else this.oOverViewChartData.ActiveTo = this.EndDate = this.StartDate.AddDays(13);
                }
            }
            else {
                if ((String.Compare(MedChartDefaultData.ChartStatus, CConstants.sChartActiveStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(MedChartDefaultData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0)) {
                    let tsCompareStartDate: TimeSpan = dtServerDate.Subtract(MedChartDefaultData.ActiveFrom);
                    if (tsCompareStartDate.Days < 4)
                        this.oOverViewChartData.ActiveFrom = this.StartDate = MedChartDefaultData.ActiveFrom.Date;
                    else this.oOverViewChartData.ActiveFrom = this.StartDate = dtServerDate.DateTime.AddDays(-3);
                    this.oOverViewChartData.ActiveTo = this.EndDate = this.StartDate.AddDays(6);
                }
                else {
                    this.oOverViewChartData.ActiveFrom = this.StartDate = MedChartDefaultData.ActiveFrom.Date;
                    let tsCompareEndDate: TimeSpan = MedChartDefaultData.ActiveTo.Subtract(MedChartDefaultData.ActiveFrom);
                    if (tsCompareEndDate.Days < 7)
                        this.oOverViewChartData.ActiveTo = this.EndDate = MedChartDefaultData.ActiveTo;
                    else this.oOverViewChartData.ActiveTo = this.EndDate = this.StartDate.AddDays(6);
                }
            }
            MedChartData.SuspendedOn = MedChartDefaultData.SuspendedOn;
            MedChartData.ServiceOID = MedChartDefaultData.ServiceOID;
            MedChartData.LocationOID = MedChartDefaultData.LocationOID;
            PatientContext.MergedPatientOID = MedChartDefaultData.MergedPatientOID;
            this.oOverViewChartData.MedChartPatOID = ChartContext.PatientOID = ChartContext.DefaultDataPatientOID;
            ChartContext.EncounterOID = ChartContext.DefaultDataEncounterOID;
            ChartContext.EncounterType = ChartContext.DefaultDataEncounterType;
            this.FillMedChartBasicData(dtServerDate);
            this.GetChartData(String.Empty, dtServerDate);
        }
        private cmdOmitClick(): void {
            let sResult: String = String.Empty;
            sResult = ObjectHelper.CreateType<String>(HtmlPage.Window.Invoke("CreatePessimisticLock", MedChartData.MedChartOID, "MAOmit", Common.nLockDuration), String);
            let isInfusion: boolean = false;
            let isBolus: boolean = false;
            let infusionType: string = String.Empty;
            let dPrescriptionItemEndDate: DateTime= DateTime.MinValue;
            let OmitPrescriptionItemOID: number = 0;
            let IslastSlotincurrentview: boolean = false;
            let Slotdatetime: DateTime= DateTime.MinValue;
            let isPRN: boolean = false;
            let oHdrAddnlInfo: CDrugHdrAddnlInfo = new CDrugHdrAddnlInfo();
            if ((this.medChartOverview.SelectedSlots != null && this.medChartOverview.SelectedSlots.Count > 0 && !this.IsMedicationSelected)) {
                this.IsOmitReinstateReviewClicked = true;
                let olstSlotData: ObservableCollection<SlotData> = new ObservableCollection<SlotData>();
                this.medChartOverview.SelectedSlots.forEach( (oTagObject)=> {
                    let oOverViewSlot: DoseOverviewSlot = ObjectHelper.CreateType<DoseOverviewSlot>(oTagObject.oIChartSlot, DoseOverviewSlot);
                    let oTagSlotDetail: TagSlotDetail = ObjectHelper.CreateType<TagSlotDetail>(oOverViewSlot.Tag, TagSlotDetail);
                    let oSlotData: SlotData = new SlotData();
                    oSlotData.PrescriptionItemScheduleOID = oTagSlotDetail.SlotOID;
                    oSlotData.ScheduleDTTM = Slotdatetime = oTagSlotDetail.SlotDateTime;
                    IslastSlotincurrentview = oTagSlotDetail.IsLastSlotInView;
                    isInfusion = oTagSlotDetail.IsInfusion;
                    infusionType = oTagSlotDetail.INFTYCODE;
                    olstSlotData.Add(oSlotData);
                    isBolus = oTagSlotDetail.IsBolus;
                    isPRN = oTagSlotDetail.IsPRN as boolean; // to be revist as boolean by suresh
                });
                let oOmitTagObject: TagObject = ObjectHelper.CreateType<TagObject>(this.medChartOverview.SelectedSlots[0], TagObject);
                if (oOmitTagObject != null && oOmitTagObject.oDrugItem != null) {
                    OmitPrescriptionItemOID = (!String.IsNullOrEmpty(oOmitTagObject.oDrugItem.Key) && oOmitTagObject.oDrugItem.Key.length > 0) ? Convert.ToInt64(oOmitTagObject.oDrugItem.Key) : 0;
                    if (!String.IsNullOrEmpty(oOmitTagObject.oDrugItem.AdminWarningMessage))
                        oHdrAddnlInfo.IngredientAdminWarning = oOmitTagObject.oDrugItem.AdminWarningMessage;
                }
                let oTagDrugHeaderDetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(oOmitTagObject.oDrugItem.Tag, TagDrugHeaderDetail);
                let SelectedRow: ChartRow = new ChartRow();
                let RowKey: String = "Row-" + this.medChartOverview.SelectedSlots[0].oDrugItem.Key;
                let TagSlotOID: number = this.medChartOverview.SelectedSlots.Count > 0 ? (<TagSlotDetail>((<DoseOverviewSlot>(this.medChartOverview.SelectedSlots[0].oIChartSlot)).Tag)).SlotOID : Int64.MinValue;
                let oCurrentChartRow: List<ChartRow> = new List<ChartRow>();
                oCurrentChartRow = this.medChartOverview.ChartRows.Where(c => c.Key == RowKey).Select(s => s).ToList<ChartRow>();
                if (oCurrentChartRow != null && oCurrentChartRow.Count > 0) {
                    SelectedRow = oCurrentChartRow.FirstOrDefault();
                }
                if (this.medChartOverview.SelectedSlots.Count > 0) {
                    this.medChartOverview.SelectedSlots.forEach( (oTagObjects)=> {
                        let oOverViewSlot: DoseOverviewSlot = ObjectHelper.CreateType<DoseOverviewSlot>(oTagObjects.oIChartSlot, DoseOverviewSlot);
                        let oTagSlotDetails: TagSlotDetail = ObjectHelper.CreateType<TagSlotDetail>(oOverViewSlot.Tag, TagSlotDetail);
                        if (oTagSlotDetails.SlotDateTime > CommonBB.GetServerDateTime()) {
                            this.IsFutureSlotOmitted = true;
                            //break;
                            return;
                        }
                        else {
                            this.IsFutureSlotOmitted = false;
                        }
                    });
                }
                let oOmitSlotsVM: OmitSlotsVM = new OmitSlotsVM();
                // ObjectHelper.stopFinishAndCancelEvent(true);
                oOmitSlotsVM.OmittedSlots = new OmitSlotsParams();
                oOmitSlotsVM.IsBolus = isBolus;
                oOmitSlotsVM.oAdminTimesVM = new AdminstrativeTimesVM(oTagDrugHeaderDetail.DrugFrequencyOID);
                oOmitSlotsVM.freqCode = oTagDrugHeaderDetail.FreqPerodcode;
                oOmitSlotsVM.DoseType = oTagDrugHeaderDetail.DoseType;
                if (oTagDrugHeaderDetail != null && !String.IsNullOrEmpty(oTagDrugHeaderDetail.DoseType)) {
                    oOmitSlotsVM._DoseTypeCode = oTagDrugHeaderDetail.DoseType;
                }
                if (this.objFrequencyDetails != null) {
                    oOmitSlotsVM.oFrequencyDetails = this.objFrequencyDetails;
                }
                if (this.objScheduletimes != null && this.objScheduletimes.Count > 0) {
                    if (!String.IsNullOrEmpty(this.objScheduletimes[0].ScheduledTime)) {
                        oOmitSlotsVM.scheduletimes = this.objScheduletimes;
                    }
                }
                oOmitSlotsVM = this.CalculateDoseWhenTimeslotPresent(SelectedRow, oOmitSlotsVM);
                oOmitSlotsVM.IsPastSlotSelected = this.IsPastSelected;
                oOmitSlotsVM.MedicationSelected = this.IsMedicationSelected;
                oOmitSlotsVM.Indefinite = oTagDrugHeaderDetail.IsIndefiniteOmit;
                oOmitSlotsVM.InfusionTypeCode = infusionType;
                oOmitSlotsVM.IsInfusion = isInfusion;
                oOmitSlotsVM.IsPRN = isPRN;
                oOmitSlotsVM.OmittedSlots.PrescriptionItemOID = OmitPrescriptionItemOID;
                oOmitSlotsVM.OmittedSlots.OSlotData = new ObservableCollection<SlotData>();
                oOmitSlotsVM.OmittedSlots.OSlotData = olstSlotData;
                oOmitSlotsVM.IsSlotUpdatedEvent  = (s,e) => { this.oOmitSlotsVM_IsSlotUpdatedEvent(); } ;
                if (oTagDrugHeaderDetail != null) {
                    oOmitSlotsVM.PrescriptionItemEndDate = (oTagDrugHeaderDetail.EndDate.NotEquals(DateTime.MinValue)) ? oTagDrugHeaderDetail.EndDate : DateTime.MinValue;
                    oOmitSlotsVM.PrescriptionItemStartDate = (oTagDrugHeaderDetail.StartDate.NotEquals(DateTime.MinValue)) ? oTagDrugHeaderDetail.StartDate : DateTime.MinValue;
                    oOmitSlotsVM.PrescriptionItemStatus = oTagDrugHeaderDetail.PrescriptionItemStatus;
                    oOmitSlotsVM.FreqPerodCode = oTagDrugHeaderDetail.FreqPerodcode;
                }
                oOmitSlotsVM.CACode = MedAction.OmitSlot;
                oOmitSlotsVM.ScheduleDTTM = Slotdatetime;
                oOmitSlotsVM.IslastSlotincurrentview = IslastSlotincurrentview;
                if (oTagDrugHeaderDetail != null && !String.IsNullOrEmpty(oTagDrugHeaderDetail.PrescriptionItemStatus) && !String.Equals(oTagDrugHeaderDetail.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oTagDrugHeaderDetail.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase)) {
                    this.IsLastSlotExist(oOmitSlotsVM); // OmitSlotsVM
                }
                this.omedsadminOmitSlots = new MedsadminOmitslots(oOmitSlotsVM);
                this.omedsadminOmitSlots.objDrugHeader.oDrugHeader = new CDrugHeader();
                this.omedsadminOmitSlots.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo = new DrugHeaderItem();
                this.omedsadminOmitSlots.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowFrequency = true;
                this.omedsadminOmitSlots.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowSite = true;
                this.omedsadminOmitSlots.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowAsrequired = true;
                if (!String.IsNullOrEmpty(this.medChartOverview.SelectedSlots[0].oDrugItem.AdministrationInst)) {
                    this.omedsadminOmitSlots.objDrugHeader.lblInstructions.Visibility = Visibility.Visible;
                    this.omedsadminOmitSlots.objDrugHeader.lblInstructions.Text = this.medChartOverview.SelectedSlots[0].oDrugItem.AdministrationInst;
                }
                this.omedsadminOmitSlots.objDrugHeader.DataContext = Common.SetDrugHeaderContent(this.medChartOverview.SelectedSlots[0].oDrugItem, oHdrAddnlInfo, this.omedsadminOmitSlots.objDrugHeader);
                this.omedsadminOmitSlots.HelpCode = "VW_OMITSLOT";
                let dialogWindowHeight = (660/window.devicePixelRatio); 
                AppActivity.OpenWindow("Omit selected slot(s)", this.omedsadminOmitSlots, (s) => { this.omedsadminOmitSlots_Closed(s); }, "Omit slots", true, dialogWindowHeight, 430, true, WindowButtonType.OkCancel, null);
            }
            else if (this.IsMedicationSelected) {
                this.IsOmitReinstateReviewClicked = true;
                this.IsFutureSlotOmitted = true;
                let olstSlotData: ObservableCollection<SlotData> = new ObservableCollection<SlotData>();
                let oOmitChartObject: ChartRow = new ChartRow();
                let oSlotData: SlotData = new SlotData();
                if (this.medChartOverview.ChartRows.Count > 0) {
                    for (let i: number = 0; i < this.medChartOverview.ChartRows.Count; i++) {
                        if (this.medChartOverview.ChartRows[i].DrugItem.Key == this.DrugKey) {
                            this.SelectedRow = i;
                            this.medChartOverview.ChartRows[i].ChartCells.forEach( (oChartCell)=> {
                                this.oChartRowForDoseCal = this.medChartOverview.ChartRows[i];
                                this.oChartCellCall = oChartCell;
                                let SlotData = oChartCell.Slots.Where(x => x.Key.StartsWith("Overview"));
                                SlotData.forEach( (oSlots)=> {
                                    let oTagSlotDetail: TagSlotDetail = ObjectHelper.CreateType<TagSlotDetail>(oSlots.Tag, TagSlotDetail);
                                    if (oTagSlotDetail != null && !String.Equals(oTagSlotDetail.SlotStatus, SlotStatus.OMITTED, StringComparison.InvariantCultureIgnoreCase) && oTagSlotDetail.SlotDateTime >= this.dtCurrentDateTime) {
                                        oSlotData.PrescriptionItemScheduleOID = oTagSlotDetail.SlotOID;
                                        oSlotData.ScheduleDTTM = Slotdatetime = oTagSlotDetail.SlotDateTime;
                                        oSlotData.SlotStatus = oTagSlotDetail.SlotStatus;
                                        IslastSlotincurrentview = oTagSlotDetail.IsLastSlotInView;
                                        isInfusion = oTagSlotDetail.IsInfusion;
                                        infusionType = oTagSlotDetail.INFTYCODE;
                                        isBolus = oTagSlotDetail.IsBolus;
                                        isPRN = oTagSlotDetail.IsPRN as boolean;// to be revist as boolean by suresh
                                        olstSlotData.Add(oSlotData);
                                    }
                                });
                            });
                            oOmitChartObject = ObjectHelper.CreateType<ChartRow>(this.medChartOverview.ChartRows[i], ChartRow);
                            if (oOmitChartObject != null && oOmitChartObject.DrugItem != null) {
                                OmitPrescriptionItemOID = (!String.IsNullOrEmpty(oOmitChartObject.DrugItem.Key) && oOmitChartObject.DrugItem.Key.length > 0) ? Convert.ToInt64(oOmitChartObject.DrugItem.Key) : 0;
                                if (!String.IsNullOrEmpty(oOmitChartObject.DrugItem.AdminWarningMessage))
                                    oHdrAddnlInfo.IngredientAdminWarning = oOmitChartObject.DrugItem.AdminWarningMessage;
                            }
                            break;
                        }
                    }
                }
                let oTagDrugHeaderDetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(oOmitChartObject.DrugItem.Tag, TagDrugHeaderDetail);
                let oOmitSlotsVM: OmitSlotsVM = new OmitSlotsVM();
                oOmitSlotsVM.OmittedSlots = new OmitSlotsParams();
                oOmitSlotsVM.IsBolus = isBolus;
                oOmitSlotsVM.InfusionTypeCode = infusionType;
                oOmitSlotsVM.IsInfusion = isInfusion;
                oOmitSlotsVM.IsPRN = isPRN;
                oOmitSlotsVM.MedicationSelected = this.IsMedicationSelected;
                oOmitSlotsVM.OmittedSlots.PrescriptionItemOID = OmitPrescriptionItemOID;
                oOmitSlotsVM.OmittedSlots.OSlotData = new ObservableCollection<SlotData>();
                oOmitSlotsVM.OmittedSlots.OSlotData = olstSlotData;
                oOmitSlotsVM.IsSlotUpdatedEvent  = (s,e) => { this.oOmitSlotsVM_IsSlotUpdatedEvent(); } ;
                if (oTagDrugHeaderDetail != null) {
                    oOmitSlotsVM.PrescriptionItemEndDate = this.EndDateTime.NotEquals(DateTime.MinValue) ? this.EndDateTime : DateTime.MinValue;
                    oOmitSlotsVM.PrescriptionItemStartDate = this.StartDateTime.NotEquals(DateTime.MinValue) ? this.StartDateTime : DateTime.MinValue;
                    oOmitSlotsVM.PrescriptionItemStatus = this.PresItemStatus;
                    oOmitSlotsVM.FreqPerodCode = this.FrqPerCode;
                }
                oOmitSlotsVM.CACode = MedAction.OmitSlot;
                oOmitSlotsVM.ScheduleDTTM = Slotdatetime;
                oOmitSlotsVM.IslastSlotincurrentview = IslastSlotincurrentview;
                oOmitSlotsVM.oAdminTimesVM = new AdminstrativeTimesVM(oTagDrugHeaderDetail.DrugFrequencyOID);
                oOmitSlotsVM.freqCode = oTagDrugHeaderDetail.FreqPerodcode;
                oOmitSlotsVM.DoseType = oTagDrugHeaderDetail.DoseType;
                if (this.objFrequencyDetails != null) {
                    oOmitSlotsVM.oFrequencyDetails = this.objFrequencyDetails;
                }
                if (this.objScheduletimes != null && this.objScheduletimes.Count > 0) {
                    if (!String.IsNullOrEmpty(this.objScheduletimes[0].ScheduledTime)) {
                        oOmitSlotsVM.scheduletimes = this.objScheduletimes;
                    }
                }
                if (oTagDrugHeaderDetail != null && !String.IsNullOrEmpty(oTagDrugHeaderDetail.DoseType)) {
                    oOmitSlotsVM._DoseTypeCode = oTagDrugHeaderDetail.DoseType;
                }
                oOmitSlotsVM = this.CalculateDoseWhenTimeslotPresent(this.oChartRowForDoseCal, oOmitSlotsVM);
                this.omedsadminOmitSlots = new MedsadminOmitslots(oOmitSlotsVM);
                this.omedsadminOmitSlots.objDrugHeader.oDrugHeader = new CDrugHeader();
                this.omedsadminOmitSlots.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo = new DrugHeaderItem();
                this.omedsadminOmitSlots.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowFrequency = true;
                this.omedsadminOmitSlots.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowSite = true;
                this.omedsadminOmitSlots.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowAsrequired = true;
                this.omedsadminOmitSlots.objDrugHeader.DataContext = Common.SetDrugHeaderContent(this.medChartOverview.ChartRows[this.SelectedRow].DrugItem, oHdrAddnlInfo, this.omedsadminOmitSlots.objDrugHeader);
                this.omedsadminOmitSlots.HelpCode = "VW_OMITSLOT";
                let dialogWindowHeight = (660/window.devicePixelRatio); 
                // ObjectHelper.stopFinishAndCancelEvent(true);
                AppActivity.OpenWindow("Omit selected slot(s)", this.omedsadminOmitSlots, (s) => { this.omedsadminOmitSlots_Closed(s); }, "Omit slots", true, dialogWindowHeight, 430, true, WindowButtonType.OkCancel, null);
            }
        }
        private CalculateDoseWhenTimeslotPresent(SelectedRow: ChartRow, oOmitSlotsVM: OmitSlotsVM): OmitSlotsVM {
            if (SelectedRow != null && SelectedRow.TimeSlots != null && SelectedRow.TimeSlots.Count > 0) {
                if (!String.IsNullOrEmpty(SelectedRow.TimeSlots[0].SlotTime)) {
                    if (SelectedRow.DrugItem != null && SelectedRow.DrugItem.Tag != null && SelectedRow.DrugItem.Tag instanceof TagDrugHeaderDetail) {
                        let otag: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(SelectedRow.DrugItem.Tag, TagDrugHeaderDetail);
                        if (otag != null) {
                            if (!((otag.IsInfusion && !String.Equals(otag.INFTYCODE, InfusionTypeCode.INTERMITTENT)) || (otag.IsInfusion && String.Equals(otag.INFTYCODE, InfusionTypeCode.INTERMITTENT) && String.Equals(otag.DoseType, DoseTypeCode.STEPPEDVARIABLE)) || otag.IsPRN || String.Equals(otag.FreqPerodcode, CConstants.OnceOnlyPerodCode) || String.Equals(otag.DoseType, DoseTypeCode.STEPPEDVARIABLE))) {
                                if (oOmitSlotsVM != null) {
                                    if (this.DoseCalculationByScheduleTimes(SelectedRow) != null) {
                                        oOmitSlotsVM.scheduletimes = this.DoseCalculationByScheduleTimes(SelectedRow);
                                    }
                                    if (this.DoseCalculationByFrequency(SelectedRow) != null) {
                                        oOmitSlotsVM.oFrequencyDetails = this.DoseCalculationByFrequency(SelectedRow);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return oOmitSlotsVM;
        }
        disableClick:boolean = false;
        disabledClick(){
            this.disableClick = true;
        }
        cmdOmit_Click(sender?: Object, e?: RoutedEventArgs): void {
            this.IsFutureSlotOmitted = false;
            this.disableClick = false;
            let oTagDrugHeaderDetail: TagDrugHeaderDetail = null;
            let items = this.medChartOverview.GetSelectedRows();
            if (this.medChartOverview.SelectedSlots != null && this.medChartOverview.SelectedSlots.Count > 0 && !this.IsMedicationSelected) {
                let OTagObject: TagObject = ObjectHelper.CreateType<TagObject>(this.medChartOverview.SelectedSlots[0], TagObject);
                if (OTagObject != null && OTagObject.oDrugItem != null && OTagObject.oDrugItem.Tag != null) {
                    oTagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(OTagObject.oDrugItem.Tag, TagDrugHeaderDetail);
                }
            }
            if (items.Count > 0 && items[0] != null && items[0].DrugItem != null && items[0].DrugItem.Tag != null && (<TagDrugHeaderDetail>(items[0].DrugItem.Tag)) != null && !(<TagDrugHeaderDetail>(items[0].DrugItem.Tag)).IsAllowedToPerform || (oTagDrugHeaderDetail != null && !oTagDrugHeaderDetail.IsAllowedToPerform)) {
                let oMsgBox: iMessageBox = new iMessageBox();
                oMsgBox.Title = "Information - Lorenzo";
                oMsgBox.Height = 140;
                oMsgBox.Width = 350;
                oMsgBox.MessageButton = MessageBoxButton.OK; //LORENZO.BlueBird.Controls.MessageBoxButton.OK
                oMsgBox.IconType = MessageBoxType.Information;
                oMsgBox.Message = Resource.MedsAdminPrescChartView.IsOmitAllowed;
                oMsgBox.Show();
            }
            else {
                if (this.IsMedicationSelected) {
                    if (this.medChartOverview.GetSelectedRows().Count == 1) {
                        let RowSelected: ChartRow = this.medChartOverview.GetSelectedRows()[0];
                        if (RowSelected != null && RowSelected.DrugItem != null && RowSelected.DrugItem.Tag != null && (RowSelected.DrugItem.Tag instanceof TagDrugHeaderDetail) && (ObjectHelper.CreateType<TagDrugHeaderDetail>(RowSelected.DrugItem.Tag, TagDrugHeaderDetail)) != null) {
                            this.WhenOmitLaunch((ObjectHelper.CreateType<TagDrugHeaderDetail>(RowSelected.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemOID);
                        }
                    }
                }
                else {
                    this.PreOmitLaunch();
                }
            }
        }
        public WhenOmitLaunch(SelectedRowPrescriptionItemOID: number): void {
            let objMedicationAdministrationWSSoapClient: MedicationAdministrationWSSoapClient;
            objMedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
            objMedicationAdministrationWSSoapClient.WhenOmitLaunchCompleted  = (s,e) => { this.objMedicationAdministrationWSSoapClient_WhenOmitLaunch(s,e); } ;
            let oCReqMsgWhenOmitLaunch: CReqMsgWhenOmitLaunch = new CReqMsgWhenOmitLaunch();
            oCReqMsgWhenOmitLaunch.oOmitLaunchParamsBC = new OmitLaunchParams();
            oCReqMsgWhenOmitLaunch.oOmitLaunchParamsBC.PatientOID = ChartContext.PatientOID;
            oCReqMsgWhenOmitLaunch.oOmitLaunchParamsBC.PrescriptionItemOID = SelectedRowPrescriptionItemOID;
            oCReqMsgWhenOmitLaunch.oContextInformation = CommonBB.FillContext();
            objMedicationAdministrationWSSoapClient.WhenOmitLaunchAsync(oCReqMsgWhenOmitLaunch);
        }
        objMedicationAdministrationWSSoapClient_WhenOmitLaunch(sender: Object, e: WhenOmitLaunchCompletedEventArgs): void {
            let _ErrorID: number = 80000099;
            let _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:MedsadminVM, Method:objMedicationAdministrationWSSoapClient_WhenOmitLaunch()";
            if (e.Error == null) {
                try {
                    let oCResMsgWhenOmitLaunch: CResMsgWhenOmitLaunch = e.Result;
                    if (oCResMsgWhenOmitLaunch != null && oCResMsgWhenOmitLaunch.oContextInformation != null && oCResMsgWhenOmitLaunch.oContextInformation.Errors != null && oCResMsgWhenOmitLaunch.oContextInformation.Errors.Count <= 0) {
                        if (oCResMsgWhenOmitLaunch.IsFutureSlotAdministered) {
                            let msgbox: iMessageBox = new iMessageBox();
                            msgbox.Title = "Lorenzo";
                            msgbox.MessageButton = MessageBoxButton.YesNo; //LORENZO.BlueBird.Controls.
                            msgbox.MessageBoxClose  = (s,e) => { this.GivenYesNo(s,e); } ;
                            msgbox.Message = (Resource.MedsAdminPrescChartView.FutureSlotGiven);
                            msgbox.Show();
                            msgbox.Width = 400;
                            msgbox.Height = 160;
                        }
                        else {
                            this.PreOmitLaunch();
                        }
                    }
                }
               catch(ex:any)  {
                    let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
        }
        GivenYesNo(sender: Object, e: MessageEventArgs): void {
            if (e.MessageBoxResult == MessageBoxResult.Yes) { //LORENZO.BlueBird.Controls.
                this.PreOmitLaunch();
            }
        }
        PreOmitLaunch(): void {
            this.IsLock = false;
            this.PresCheckPessimisticLock("MedPrescribeInpatient~MedDiscontinueCancel~MAOmit~MAReinstate~MedCVInpatient~MEDAuthInpatient~MAReview~MAEnterTitratedDose", "", "MedPrescribeDischarge~MedCVDischarge~MedPrescribeLeave~MedCVLeave~MAMedChart", this.IsLock , (s,e) => { this.OmitWarning_MessageBoxClose(s,e); } );
            if (!this.IsLock && !this.IsOmitReinstateReviewClicked) {
                let RowSelected: ChartRow = null;
                if (this.medChartOverview.SelectedSlots != null && this.medChartOverview.SelectedSlots.Count > 0 && !this.IsMedicationSelected) {
                    let RowKey: string = "Row-" + this.medChartOverview.SelectedSlots[0].oDrugItem.Key;
                    RowSelected = this.medChartOverview.ChartRows.Where(c => c.Key == RowKey).Select(s => s).FirstOrDefault();
                }
                else if (this.IsMedicationSelected) {
                    if (this.medChartOverview.GetSelectedRows().Count == 1) {
                        RowSelected = this.medChartOverview.GetSelectedRows()[0];
                    }
                }
                this.GetSlotDetailsBasedOnTimeSlots(RowSelected);
            }
        }
        OmitWarning_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
            if (e.MessageBoxResult == MessageBoxResult.Yes) {
                let RowSelected: ChartRow = null;
                if (this.medChartOverview.SelectedSlots != null && this.medChartOverview.SelectedSlots.Count > 0 && !this.IsMedicationSelected) {
                    let RowKey: string = "Row-" + this.medChartOverview.SelectedSlots[0].oDrugItem.Key;
                    RowSelected = this.medChartOverview.ChartRows.Where(c => c.Key == RowKey).Select(s => s).FirstOrDefault();
                }
                else if (this.IsMedicationSelected) {
                    if (this.medChartOverview.GetSelectedRows().Count == 1) {
                        RowSelected = this.medChartOverview.GetSelectedRows()[0];
                    }
                }
                this.GetSlotDetailsBasedOnTimeSlots(RowSelected);
            }
            else {
                this.IsOmitReinstateReviewClicked = false;
            }
        }
        private GetSlotDetailsBasedOnTimeSlots(RowSelected: ChartRow): void {
            this.objFrequencyDetails = null;
            this.objScheduletimes = null;
            if ((RowSelected != null && RowSelected.TimeSlots != null && RowSelected.TimeSlots.Count > 0 && String.IsNullOrEmpty(RowSelected.TimeSlots[0].SlotTime)) || (RowSelected.TimeSlots == null) || (RowSelected.TimeSlots != null && RowSelected.TimeSlots.Count == 0)) {
                if (RowSelected.DrugItem != null && RowSelected.DrugItem.Tag != null && RowSelected.DrugItem.Tag instanceof TagDrugHeaderDetail) {
                    let otag: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(RowSelected.DrugItem.Tag, TagDrugHeaderDetail);
                    if (otag != null) {
                        if (!((otag.IsInfusion && !String.Equals(otag.InfusionType, InfusionTypeCode.INTERMITTENT)) || (otag.IsInfusion && String.Equals(otag.InfusionType, InfusionTypeCode.INTERMITTENT) && String.Equals(otag.DoseType, DoseTypeCode.STEPPEDVARIABLE)) || otag.IsPRN || String.Equals(otag.FreqPerodcode, CConstants.OnceOnlyPerodCode) || String.Equals(otag.DoseType, DoseTypeCode.STEPPEDVARIABLE))) {
                            let objServiceProxy: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
                            objServiceProxy.GetScheduleTimeAndFreqCompleted  = (s,e) => { this.objService_GetScheduleTimeAndFreqCompletedForOmit(s,e); } ;
                            //let objReq: IPPMAManagePrescSer.CReqMsgGetScheduleTimeAndFreq = new IPPMAManagePrescSer.CReqMsgGetScheduleTimeAndFreq();
                            let objReq: CReqMsgGetScheduleTimeAndFreq = new CReqMsgGetScheduleTimeAndFreq();
                            objReq.PatientOIDBC = PatientContext.PatientOID;
                            objReq.PrescriptionItemOIDBC = otag.PrescriptionItemOID;
                            objReq.PrescriptionStartDateBC = otag.StartDate;
                            if (otag.EndDate.Equals(DateTime.MinValue)) {
                                objReq.PrescriptionEndDateBC = CommonBB.GetServerDateTime();
                            }
                            else {
                                objReq.PrescriptionEndDateBC = otag.EndDate;
                            }
                            objReq.oContextInformation = CommonBB.FillContext();
                            objServiceProxy.GetScheduleTimeAndFreqAsync(objReq);
                        }
                        else {
                            this.cmdOmitClick();
                        }
                    }
                }
                else {
                    this.cmdOmitClick();
                }
            }
            else {
                this.cmdOmitClick();
            }
        }
        private objService_GetScheduleTimeAndFreqCompletedForOmit(sender: Object, e: GetScheduleTimeAndFreqCompletedEventArgs): void {
            let _ErrorID: number = 80000113;
            let ReviewText: string = String.Empty;
            let ReviewTextCode: string = String.Empty;
            let _ErrorSource: string = "LorAppMedicationAdmin_P2.dll, Class:MedsAdminPrescChartView, Method:objService_GetScheduleTimeAndFreqCompletedForOmit()";
            if (e.Error == null && e.Result != null) {
                try {
                    let objres: IPPMAManagePrescSer.CResMsgGetScheduleTimeAndFreq = e.Result;
                    if (objres != null) {
                        if (objres.freq != null) {
                            this.objFrequencyDetails = new IPPMAManagePrescSer.IPPFrequency();
                            this.objFrequencyDetails.IsSunday = objres.freq.IsSunday;
                            this.objFrequencyDetails.IsMonday = objres.freq.IsMonday;
                            this.objFrequencyDetails.IsTuesday = objres.freq.IsTuesday;
                            this.objFrequencyDetails.IsWednesday = objres.freq.IsWednesday;
                            this.objFrequencyDetails.IsThursday = objres.freq.IsThursday;
                            this.objFrequencyDetails.IsFriday = objres.freq.IsFriday;
                            this.objFrequencyDetails.IsSaturday = objres.freq.IsSaturday;
                        }
                        if (objres.lstscheduletimes != null && objres.lstscheduletimes.Count > 0) {
                            let oIPPSchDetail: IPPMAManagePrescSer.IPPScheduledetails = new IPPMAManagePrescSer.IPPScheduledetails();
                            let oAdminData: ObservableCollection<IPPMAManagePrescSer.IPPScheduledetails> = new ObservableCollection<IPPMAManagePrescSer.IPPScheduledetails>();
                            objres.lstscheduletimes.forEach( (item)=> {
                                oIPPSchDetail = new IPPMAManagePrescSer.IPPScheduledetails();
                                oIPPSchDetail.ScheduledTime = (<IPPManagePrescSer.Scheduledetails>(item)).ScheduleTime.ToString();
                                oAdminData.Add(oIPPSchDetail);
                            });
                            this.objScheduletimes = oAdminData;
                        }
                    }
                    this.cmdOmitClick();
                }
               catch(ex:any)  {
                    let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
        }
        AppDialogWindow: ChildWindow;
        public omedsadminOmitSlots_Closed(args: AppDialogEventargs): void {
            let sResult: string = String.Empty;
            this.IsOmitReinstateReviewClicked = false;
            this.AppDialogWindow = args.AppChildWindow;
            this.isClearPreviousSelection = true;
            if (args.Result == AppDialogResult.Ok) {
                let _lockedUserDetails: LockedUsersDetails;
                //if (!MedicationCommonBB.IsLockStillValid(MedChartData.MedChartOID, "MAOmit", _lockedUserDetails)) {                  
                  if (!MedicationCommonBB.IsLockStillValid(MedChartData.MedChartOID, "MAOmit", (o) => {_lockedUserDetails = o})) {
                    let oMsgBox: iMessageBox = new iMessageBox();
                    oMsgBox.MessageBoxClose  = (s,e) => { this.oMsgBox_OmitClose(s,e); } ;
                    oMsgBox.Title = "Information - Lorenzo";
                    oMsgBox.Height = 160;
                    oMsgBox.MessageButton =MessageBoxButton.OK; // LORENZO.BlueBird.Controls.
                    oMsgBox.IconType = MessageBoxType.Information;
                    if (!String.IsNullOrEmpty(_lockedUserDetails.LockedUserName)) {
                        oMsgBox.Message = String.Format(Resource.MedsAdminPrescChartView.LockMsg_Commenced, _lockedUserDetails.LockedUserName);
                    }
                    else {
                        oMsgBox.Message = String.Format(Resource.MedsAdminPrescChartView.LockMsg_Abort);
                    }
                    oMsgBox.Show();
                }
                else {
                    if (this.omedsadminOmitSlots.cmdOkClick()) {
                        // ObjectHelper.stopFinishAndCancelEvent(false);
                        sResult = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", MedChartData.MedChartOID, "MAOmit", Common.nLockDuration), String);
                    }
                }
            }
            else if (args.Result == AppDialogResult.Cancel) {
                // ObjectHelper.stopFinishAndCancelEvent(false);
                args.AppChildWindow.DialogResult = false;
                args.AppChildWindow.DialogRef.close();
                sResult = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", MedChartData.MedChartOID, "MAOmit", Common.nLockDuration), String);
            }
        }
        oOmitSlotsVM_IsSlotUpdatedEvent(): void {
            this.IsFutslotsomittedIndef = false;
            this.IsReviewHighlighted = false;
            this.AppDialogWindow.DialogResult = true;
            let oOmitSlotsVM: OmitSlotsVM = ObjectHelper.CreateType<OmitSlotsVM>(this.omedsadminOmitSlots.DataContext, OmitSlotsVM);
            if (!this.IsMedicationSelected) {
                let RowKey: string = "Row-" + this.medChartOverview.SelectedSlots[0].oDrugItem.Key;
                (ObjectHelper.CreateType<TagDrugHeaderDetail>((this.medChartOverview.SelectedSlots[0].oDrugItem.Tag), TagDrugHeaderDetail)).LastOmittedSlotDTTM = oOmitSlotsVM.LastOmittedSlotDTTM;
                let TagSlotOID: number = this.medChartOverview.SelectedSlots.Count > 0 ? (<TagSlotDetail>((<DoseOverviewSlot>(this.medChartOverview.SelectedSlots[0].oIChartSlot)).Tag)).SlotOID : Int64.MinValue;
                let oCurrentChartRow: List<ChartRow> = new List<ChartRow>();
                oCurrentChartRow = this.medChartOverview.ChartRows.Where(c => c.Key == RowKey).Select(s => s).ToList<ChartRow>();
                if (oCurrentChartRow != null && oCurrentChartRow.Count > 0) {
                    this.SelectedOmittedRow = oCurrentChartRow.FirstOrDefault();
                }
            }
            else {
                let sPrscItemOID: string = this.medChartOverview.GetSelectedRows().Count == 1 ? this.medChartOverview.ChartRows[this.SelectedRow].DrugItem.Key : String.Empty;
                if (String.IsNullOrEmpty(sPrscItemOID))
                    return
                if (this.medChartOverview.GetSelectedRows().Count > 0 && this.medChartOverview.GetSelectedRows().Count == 1) {
                    this.SelectedOmittedRow = this.medChartOverview.ChartRows[this.SelectedRow];
                    (ObjectHelper.CreateType<TagDrugHeaderDetail>((this.SelectedOmittedRow.DrugItem.Tag), TagDrugHeaderDetail)).LastOmittedSlotDTTM = oOmitSlotsVM.LastOmittedSlotDTTM;
                }
            }
            if (oOmitSlotsVM.Indefinite) {
                let olstSlotDat: ObservableCollection<SlotData> = new ObservableCollection<SlotData>();
                let daycount: number = this.SelectedOmittedRow.ChartCells.Count;
                for (let i: number = 0; i < daycount; i++) {
                    let slotcount: number = this.SelectedOmittedRow.ChartCells[i].Slots.Count;
                    for (let j: number = 0; j < slotcount; j++) {
                        if ((this.SelectedOmittedRow.ChartCells[i].Slots[j]) instanceof DoseOverviewSlot) {
                            let oTagSlotDetail: TagSlotDetail = ObjectHelper.CreateType<TagSlotDetail>((<DoseOverviewSlot>(this.SelectedOmittedRow.ChartCells[i].Slots[j])).Tag, TagSlotDetail);
                            if (oTagSlotDetail.SlotDateTime >= oOmitSlotsVM.FromDate && !String.Equals(oTagSlotDetail.SlotStatus, SlotStatus.GIVEN, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oTagSlotDetail.SlotStatus, SlotStatus.INPROGRESS, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oTagSlotDetail.SlotStatus, SlotStatus.COMPLETED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oTagSlotDetail.SlotStatus, SlotStatus.STOPPED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oTagSlotDetail.SlotStatus, SlotStatus.PAUSED, StringComparison.InvariantCultureIgnoreCase)) {
                                let oOmittedSlotData: SlotData = new SlotData();
                                oOmittedSlotData.ScheduleDTTM = oTagSlotDetail.SlotDateTime;
                                if (oOmitSlotsVM.UpdatedSlotsData != null && oOmitSlotsVM.UpdatedSlotsData.Count > 0) {
                                    if (oTagSlotDetail.MedsAdminOID == 0) {
                                        let UpdSlotFromDB = oOmitSlotsVM.UpdatedSlotsData.FirstOrDefault(x => x.ScheduleDTTM == oTagSlotDetail.SlotDateTime);
                                        if (UpdSlotFromDB != null) {
                                            oTagSlotDetail.MedsAdminOID = UpdSlotFromDB.MedAdminOID;
                                        }
                                    }
                                }
                                oOmittedSlotData.MedAdminOID = oTagSlotDetail.MedsAdminOID;
                                oOmittedSlotData.SlotStatus = SlotStatus.OMITTED;
                                olstSlotDat.Add(oOmittedSlotData);
                            }
                        }
                    }
                }
                if (olstSlotDat != null && olstSlotDat.Count > 0) {
                    if (oOmitSlotsVM.UpdatedSlotsData != null && oOmitSlotsVM.UpdatedSlotsData.Count > 0) {
                        for (let i = 0; i < oOmitSlotsVM.UpdatedSlotsData.Length; i++) {
                            for (let j = 0; j < olstSlotDat.Length; j++) {
                                if (oOmitSlotsVM.UpdatedSlotsData[i].MedAdminOID == olstSlotDat[j].MedAdminOID) {
                                    if (oOmitSlotsVM.UpdatedSlotsData[i].SlotStatus == "CC_OMITTED") {
                                        olstSlotDat[j].SlotStatus = "CC_OMITTED"
                                    } else {
                                        olstSlotDat[j].SlotStatus = SlotStatus.OMITTED
                                    }

                                }
                            }
                        }
                    }
                    oOmitSlotsVM.UpdatedSlotsData = olstSlotDat;
                }
            }
            if (oOmitSlotsVM != null && oOmitSlotsVM.IsOmitSuccess && (oOmitSlotsVM.UpdatedSlotsData != null && oOmitSlotsVM.UpdatedSlotsData.Count > 0)) {
                if (oOmitSlotsVM.Until) {
                    this.IsFutureSlotOmitted = oOmitSlotsVM.UpdatedSlotsData.Any(x => String.Equals(x.SlotStatus, SlotStatus.OMITTED, StringComparison.InvariantCultureIgnoreCase));
                }
                if (!this.IsMedicationSelected) {
                    let oSelectedChartRow: ChartRow = new ChartRow();
                    let RowKey: string = "Row-" + this.medChartOverview.SelectedSlots[0].oDrugItem.Key;
                    let TagSlotOID: number = this.medChartOverview.SelectedSlots.Count > 0 ? (<TagSlotDetail>((<DoseOverviewSlot>(this.medChartOverview.SelectedSlots[0].oIChartSlot)).Tag)).SlotOID : Int64.MinValue;
                    let oCurrentChartRow: List<ChartRow> = new List<ChartRow>();
                    oCurrentChartRow = this.medChartOverview.ChartRows.Where(c => c.Key == RowKey).Select(s => s).ToList<ChartRow>();
                    if (oCurrentChartRow != null && oCurrentChartRow.Count > 0) {
                        oSelectedChartRow = oCurrentChartRow.FirstOrDefault();
                    }
                    let sPrescItemOID: string = this.medChartOverview.SelectedSlots.Count > 0 ? this.medChartOverview.SelectedSlots[0].oDrugItem.Key : String.Empty;
                    if (String.IsNullOrEmpty(sPrescItemOID))
                        return
                    this.OmitUpdateSlot(oOmitSlotsVM, sPrescItemOID);
                    if (oSelectedChartRow != null && oOmitSlotsVM != null && oOmitSlotsVM.Indefinite) {
                        this.HighlightCellsWithRed(oSelectedChartRow, oOmitSlotsVM.ReviewDTTM);
                    }
                    this.OmitRefreshRow(oSelectedChartRow);
                }
                else {
                    let iSelectedChartRow: ChartRow = new ChartRow();
                    let sPrscItemOID: string = this.medChartOverview.GetSelectedRows().Count == 1 ? this.medChartOverview.ChartRows[this.SelectedRow].DrugItem.Key : String.Empty;
                    if (String.IsNullOrEmpty(sPrscItemOID))
                        return
                    if (this.medChartOverview.GetSelectedRows().Count > 0 && this.medChartOverview.GetSelectedRows().Count == 1) {
                        iSelectedChartRow = this.medChartOverview.ChartRows[this.SelectedRow];
                    }
                    this.OmitUpdateSlot(oOmitSlotsVM, sPrscItemOID);
                    if (iSelectedChartRow != null && oOmitSlotsVM != null && oOmitSlotsVM.Indefinite) {
                        this.HighlightCellsWithRed(iSelectedChartRow, oOmitSlotsVM.ReviewDTTM);
                    }
                    this.OmitRefreshRow(iSelectedChartRow);
                }
                this.nSlotSelectedCountForOmit = 0;
                this.nSlotSelectedCountForEnterDose = 0;
                if (!this.IsMedicationSelected) {
                    this.cmdOmit.IsEnabled = false;
                }
                else {
                    this.cmdReinstate.IsEnabled = true;
                    if (oOmitSlotsVM.Indefinite) {
                        this.cmdOmit.IsEnabled = false;
                    }
                    else {
                        this.cmdOmit.IsEnabled = true;
                    }
                }
            }
            this.RefreshPrescriptionChart(oOmitSlotsVM.PrescriptionItemStatus, oOmitSlotsVM.CurrentPrescriptionItemStatus);
            if (this.DataContext instanceof PrescriptionChartVM && (ObjectHelper.CreateType<PrescriptionChartVM>(this.DataContext, PrescriptionChartVM)) != null) {
                (ObjectHelper.CreateType<PrescriptionChartVM>(this.DataContext, PrescriptionChartVM)).SetHeightweightPopUp();
            }
        }
        private RefreshPrescriptionChart(_previousItemStatus: string, _currentItemStatus: string): void {
            let isPreviousCompleted: boolean = String.Equals(_previousItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase);
            let isCurrentCompleted: boolean = String.Equals(_currentItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase);
            if ((isPreviousCompleted && !isCurrentCompleted) || (!isPreviousCompleted && isCurrentCompleted)) {
                this.RefreshChart();
            }
        }
        HighlightCellsWithRed(CurrentRow: ChartRow, ReviewDTTM: DateTime): void {
            if (CurrentRow.ChartCells != null && CurrentRow.ChartCells.Count > 0) {
                CurrentRow.ChartCells.forEach( (ChartCell)=> {
                    if (ChartCell.Slots != null && ChartCell.Slots.Count > 0) {
                        // let OAllSlotItems = from oAllSlot in ChartCell.Slots
                        // where oAllSlot is DoseOverviewSlot
                        // select oAllSlot;

                        let OAllSlotItems = ChartCell.Slots.Where(oAllSlot =>oAllSlot instanceof DoseOverviewSlot).Select(oAllSlot => oAllSlot);
                        if (OAllSlotItems != null && OAllSlotItems.Count() > 0) {
                            OAllSlotItems.forEach( (dos)=> {
                                if (dos.Tag != null) {
                                    let tag: TagSlotDetail = <TagSlotDetail>dos.Tag;
                                    if ((!this.IsReviewHighlighted) && (tag != null) && (DateTime.NotEquals(ReviewDTTM,DateTime.MinValue)) && (tag.SlotDateTime.ToUniversalTime() >= ReviewDTTM.ToUniversalTime())) {
                                        dos.HighlightReviewSlot = true;
                                        this.IsReviewHighlighted = true;
                                    }
                                    else {
                                        dos.HighlightReviewSlot = false;
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
  OmitUpdateSlot(oOmitSlotsVM: OmitSlotsVM, PresItemOID: string): void {
    if (oOmitSlotsVM != null && oOmitSlotsVM.UpdatedSlotsData.Count > 0) {
      oOmitSlotsVM.UpdatedSlotsData.forEach((oSlotData) => {
        if (!String.Equals(oSlotData.SlotStatus, SlotStatus.GIVEN, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oSlotData.SlotStatus, SlotStatus.INPROGRESS, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oSlotData.SlotStatus, SlotStatus.COMPLETED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oSlotData.SlotStatus, SlotStatus.STOPPED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oSlotData.SlotStatus, SlotStatus.PAUSED, StringComparison.InvariantCultureIgnoreCase)) {
          let strCaption: string = oSlotData.ScheduleDTTM.ToString(this.sDrugHeaderFormat);
          // let SlotRows = from slotRow in oGetMedsChartData.oChartRowList
          //               where slotRow.Key.Split('-')[1] == PresItemOID
          //               select slotRow;
          let SlotRows = this.oGetMedsChartData.oChartRowList.Where(slotRow =>slotRow.Key.Split('-')[1]==PresItemOID).Select(slotRow => slotRow);
          if (SlotRows != null && SlotRows.Count() > 0) {
            let SlotRow = SlotRows.First();
            let list = this.medChartOverview.ChartColumns.Where(colIndx =>colIndx.Caption==strCaption).Select(colIndx => colIndx.Index);
            //let colIndex = list.Count() < 1 ? -1 :list.First().colIndex; // to be revisit
            let colIndex = list.Count() < 1 ? -1 :list[0];
            // let SlotsColl = (from slotColls in SlotRow.ChartCells
            //  let list = (from colIndx in medChartOverview.ChartColumns
            //  where colIndx.Caption == strCaption select new { colIndex = colIndx.Index })

              // let colIndex = list.Count() < 1 ? -1 :
              //list.First().colIndex
              // where slotColls.ColIndex == colIndex
              // select slotColls);
            let SlotsColl = SlotRow.ChartCells.Where(slotColls =>slotColls.ColIndex==colIndex).Select(slotColls => slotColls);
      
      // let SlotsColl = SlotRow.ChartCells;
      // let list=(fromcolIndxinmedChartOverview.ChartColumns.Where(slotColls =>colIndx.Caption==strCaption).Select(slotColls => new{colIndex=colIndx.Index}));
      // let colIndex=list.Count()<1?-1:list.First().colIndex.Where(slotColls =>slotColls.ColIndex==colIndex).Select(slotColls => slotColls);
      if (SlotsColl.Count() > 0) {
        let cCell: ChartCell = SlotsColl.First();
        // let OAllSlotItems = from oAllSlot in cCell.Slots
        //             where oAllSlot is DoseOverviewSlot
        //             select oAllSlot;
        let OAllSlotItems = cCell.Slots.Where(oAllSlot =>oAllSlot instanceof DoseOverviewSlot).Select(oAllSlot => oAllSlot);
        if (OAllSlotItems != null && OAllSlotItems.Count() > 0) {
          // let OSlotItems = from oSlot in OAllSlotItems where DateTime.Compare(((TagSlotDetail)((DoseOverviewSlot)oSlot).Tag).SlotDateTime, oSlotData.ScheduleDTTM) == 0
          //               select oSlot;

         // To be reVisit by suresh
         let OSlotItems:any=[];
         OAllSlotItems.forEach(oSlot => {
          let oDoseOvwSlot = oSlot as DoseOverviewSlot;
          let oTagDoseOvwSlot = oDoseOvwSlot.Tag as TagSlotDetail;         
          if(DateTime.Compare(oTagDoseOvwSlot.SlotDateTime,oSlotData.ScheduleDTTM)==0){
            OSlotItems.push(oSlot);
          }
         });
      //let OSlotItems = OAllSlotItems.Where(oSlot =>DateTime.Compare(((TagSlotDetail)((DoseOverviewSlot)oSlot).Tag).SlotDateTime,oSlotData.ScheduleDTTM)==0).Select(oSlot => oSlot);
          //let OSlotItems:any;
          if (OSlotItems.Count() > 0) {
            let oOverViewSlot: DoseOverviewSlot = <DoseOverviewSlot>OSlotItems.First();
            this.UpdateOmittSlotData(oOverViewSlot, oSlotData, oOmitSlotsVM.OmitReason, oOmitSlotsVM.IsInfusion, oOmitSlotsVM.FromDate, oOmitSlotsVM.NoOfPhysicalDays, oOmitSlotsVM.Indefinite);
          }
        }
      }
    }
  }
});
}
}
OmitRefreshRow(oSelectChartRow:ChartRow): void
    {
        let oOmitSlotsVM:OmitSlotsVM = (ObjectHelper.CreateType<OmitSlotsVM>(this.omedsadminOmitSlots.DataContext, OmitSlotsVM));
        let OmitToolTip:string = String.Empty;
        let oTagDrugHeaderDetail:TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(oSelectChartRow.DrugItem.Tag, TagDrugHeaderDetail);
        if(oOmitSlotsVM.Indefinite) {
            oTagDrugHeaderDetail.IndefiniteOmitFromDTTM = oOmitSlotsVM.FromDate;
        }
if(this.IsFutureSlotOmitted)
 {
    oSelectChartRow.DrugItem.OmitIcon = this.LoadImage(CConstants.OmitKey, MedImage.GetPath(MedImages.OmittedSlotIcon));
    if (oOmitSlotsVM.Indefinite) {
        oSelectChartRow.DrugItem.OmitLabel = CConstants.OmitIndefinite;
        OmitToolTip = CConstants.OmitIndefinite + Environment.NewLine;
        oTagDrugHeaderDetail.IsIndefiniteOmit = true;
        if ((oOmitSlotsVM.FromDate.NotEquals(DateTime.MinValue))) {
            OmitToolTip += CConstants.From + ": " + oOmitSlotsVM.FromDate.ToString() + Environment.NewLine;
        }
    }
    else {
        oTagDrugHeaderDetail.IsIndefiniteOmit = false;
        oSelectChartRow.DrugItem.OmitLabel = CConstants.OmitDefinite;
        OmitToolTip = CConstants.OmitDefinite + Environment.NewLine;
    }
    if (!String.IsNullOrEmpty(oOmitSlotsVM.OmittedBy)) {
        OmitToolTip += CConstants.Comments_tooltip + ": " + oOmitSlotsVM.OmitReason + Environment.NewLine + CConstants.Omittedby_tooltip + ": " + oOmitSlotsVM.OmittedBy;
    }
    else if (!String.IsNullOrEmpty(ChartContext.CurrentUserName)) {
        OmitToolTip += CConstants.Comments_tooltip + ": " + oOmitSlotsVM.OmitReason + Environment.NewLine + CConstants.Omittedby_tooltip + ": " + ChartContext.CurrentUserName;
    }
    oSelectChartRow.DrugItem.OmitIcon.Tooltip = OmitToolTip;
    if (oOmitSlotsVM.Indefinite && oOmitSlotsVM.ReviewDTTM.NotEquals(DateTime.MinValue)) {
        let Reviewtooltip: string = String.Empty;
        oTagDrugHeaderDetail.ReviewDTTM = oOmitSlotsVM.ReviewDTTM;
        oSelectChartRow.DrugItem.ReviewLabel = CConstants.ReviewDue;
        oSelectChartRow.DrugItem.ReviewVal = oOmitSlotsVM.ReviewDTTM.ToString(CConstants.DateTimeFormat);
        if (oOmitSlotsVM.ReviewDTTM.Date <= this.dtCurrentDateTime.Date) {
            oSelectChartRow.DrugItem.ReviewIcon = this.LoadImage(CConstants.ReviewKey, MedImage.GetPath(MedImages.ReviewIcon));
            Reviewtooltip = Resource.MedsAdminPrescChartView.ReviewOmittedIcon_Tooltip;
            Reviewtooltip += oOmitSlotsVM.ReviewDTTM.ToString(CConstants.DateTimeFormat) + Environment.NewLine;
            if (!String.IsNullOrEmpty(oOmitSlotsVM.ReviewComments)) {
                Reviewtooltip += oOmitSlotsVM.ReviewComments + Environment.NewLine;
            }
            if (!String.IsNullOrEmpty(ChartContext.CurrentUserName)) {
                Reviewtooltip += CConstants.ReviewReqby + ": " + ChartContext.CurrentUserName + Environment.NewLine;
            }
            Reviewtooltip += Resource.MedicationChart.UpdateReview_Tooltip;
            oSelectChartRow.DrugItem.ReviewIcon.Tooltip = Reviewtooltip;
        }
        else {
            oSelectChartRow.DrugItem.ReviewIcon = null;
        }
    }
    else {
        if (this.oRefreshTagObject != null && this.oRefreshTagObject.oDrugItem != null && (ObjectHelper.CreateType<TagDrugHeaderDetail>(oSelectChartRow.DrugItem.Tag, TagDrugHeaderDetail)).ReviewDTTM.Equals(DateTime.MinValue)) {
            this.oRefreshTagObject.oDrugItem.ReviewIcon = null;
            this.oRefreshTagObject.oDrugItem.ReviewLabel = String.Empty;
            this.oRefreshTagObject.oDrugItem.ReviewVal = String.Empty;
        }
    }
}
if (oSelectChartRow != null && oSelectChartRow.DrugItem != null && oSelectChartRow.DrugItem.Tag != null) {
    let oTagObj: TagObject = new TagObject();
    let oEmptyTagObj: TagObject = new TagObject();
    oTagObj.oChartCell = oSelectChartRow.ChartCells.FirstOrDefault();
    //this.GetChartData(String.Empty, this.dtServerDate);
    if(oSelectChartRow.DrugItem.OmitIcon != null)
        this.medChartOverview.RowRefreshCellOmitUpdate = true;
     this.medChartOverview.RefreshRow(oSelectChartRow, oEmptyTagObj);
     this.medChartOverview.RefreshRow(oSelectChartRow, oTagObj);
}
}
public IsLastSlotExist(oSlotDet:OmitSlotsVM): void
    {
        if((!String.Equals(oSlotDet.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oSlotDet.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase)) || (oSlotDet.PrescriptionItemEndDate.NotEquals(DateTime.MinValue) || oSlotDet.FreqPerodCode == CConstants.OnceOnlyPerodCode))
{
    if (oSlotDet.FreqPerodCode == CConstants.OnceOnlyPerodCode) {
        oSlotDet.IsLastSlotCheckRequired = false;
        oSlotDet.IsUpdatePIStatusToCompleted = true;
    }
    else {
        oSlotDet.IsUpdatePIStatusToCompleted = true;
        oSlotDet.IsLastSlotCheckRequired = true;
    }
}
}
public ChklastandBeyondSlots(ScheduleDttm:DateTime): IEnumerable < IChartSlot >
    {
        // let AllSlots = (from drug in medChartOverview.ChartRows
        //                     from oCell in drug.ChartCells
        //                     from slot in oCell.Slots
        //                     where (String.Compare(drug.Key.Split('-')[1], this.oRefreshTagObject.oDrugItem.Key) == 0 && slot instanceof DoseOverviewSlot &&
        //     ((((TagSlotDetail)((DoseOverviewSlot)slot).Tag).SlotDateTime > ScheduleDttm &&
        //         ((TagSlotDetail)((DoseOverviewSlot)slot).Tag).SlotStatus == SlotStatus.PLANNED ||
        //         ((TagSlotDetail)((DoseOverviewSlot)slot).Tag).SlotStatus == SlotStatus.DUENOW ||
        //         ((TagSlotDetail)((DoseOverviewSlot)slot).Tag).SlotStatus == SlotStatus.DEFERADMIN ||
        //         ((TagSlotDetail)((DoseOverviewSlot)slot).Tag).SlotStatus == SlotStatus.DEFERDUENOW ||
        //         ((TagSlotDetail)((DoseOverviewSlot)slot).Tag).SlotStatus == SlotStatus.DEFEROVERDUE) || //1st OR
        //         ((TagSlotDetail)((DoseOverviewSlot)slot).Tag).SlotDateTime < ScheduleDttm &&
        //         (((TagSlotDetail)((DoseOverviewSlot)slot).Tag).SlotStatus == SlotStatus.PLANNED ||
        //             ((TagSlotDetail)((DoseOverviewSlot)slot).Tag).SlotStatus == SlotStatus.DUENOW ||
        //             ((TagSlotDetail)((DoseOverviewSlot)slot).Tag).SlotStatus == SlotStatus.DEFERADMIN ||
        //             ((TagSlotDetail)((DoseOverviewSlot)slot).Tag).SlotStatus == SlotStatus.DEFERDUENOW ||
        //             ((TagSlotDetail)((DoseOverviewSlot)slot).Tag).SlotStatus == SlotStatus.DEFEROVERDUE)))//2nd OR
        //                     select slot);

        // To be revisit once data comes by suresh
                let AllSlots:any = [];          
  this.medChartOverview.ChartRows.forEach(drug => {
    drug.ChartCells.forEach(oCell => {
      oCell.Slots.forEach(slot => {
        let oDoseOvwSlot = slot as DoseOverviewSlot;
        let oTagDoseOvwSlot = oDoseOvwSlot.Tag as TagSlotDetail;
        if (String.Compare(drug.Key.Split('-')[1], this.oRefreshTagObject.oDrugItem.Key) == 0 && slot instanceof DoseOverviewSlot &&
          ((oTagDoseOvwSlot.SlotDateTime > ScheduleDttm &&
            oTagDoseOvwSlot.SlotStatus == SlotStatus.PLANNED ||
            oTagDoseOvwSlot.SlotStatus == SlotStatus.DUENOW ||
            oTagDoseOvwSlot.SlotStatus == SlotStatus.DEFERADMIN ||
            oTagDoseOvwSlot.SlotStatus == SlotStatus.DEFERDUENOW ||
            oTagDoseOvwSlot.SlotStatus == SlotStatus.DEFEROVERDUE) || //1st OR
            oTagDoseOvwSlot.SlotDateTime < ScheduleDttm &&
            (oTagDoseOvwSlot.SlotStatus == SlotStatus.PLANNED ||
              oTagDoseOvwSlot.SlotStatus == SlotStatus.DUENOW ||
              oTagDoseOvwSlot.SlotStatus == SlotStatus.DEFERADMIN ||
              oTagDoseOvwSlot.SlotStatus == SlotStatus.DEFERDUENOW ||
              oTagDoseOvwSlot.SlotStatus == SlotStatus.DEFEROVERDUE)) //2nd OR                     
        ) {
          AllSlots.push(slot);
        }
      });

    });
  });
            
        return AllSlots;
    }
private UpdateOmittSlotData(oOverViewSlot:DoseOverviewSlot, OmitSlotData:SlotData, OmitReason:string, IsInfusion:boolean, LastPhysicalDate:DateTime, PhysicalDays:number, IsIndefinite:boolean): void
    {
        let s:StackPanel = new StackPanel();
        let oOmitTagSlotDetail:TagSlotDetail = <TagSlotDetail>oOverViewSlot.Tag;
        let sToolTip:string = String.Empty;
        let objtooltip:Object = null;
        if(LastPhysicalDate){
        LastPhysicalDate = LastPhysicalDate.AddDays(PhysicalDays);
        }
        oOverViewSlot.ReasonForNotGiven = String.Empty;
        if(oOverViewSlot.AdministrationIcon != null) {
            oOverViewSlot.AdministrationIcon = new ChartIcon();
        }
if(IsInfusion && !oOmitTagSlotDetail.IsBolus) {
            oOverViewSlot.StatusIcon.UriString = MedImage.GetPath(MedImages.InfOmittedIcon);
        }
 else {
            oOverViewSlot.StatusIcon.UriString = MedImage.GetPath(MedImages.OmittedSlotIcon);
            if(IsIndefinite) {
                if (LastPhysicalDate.NotEquals(DateTime.MinValue) && oOmitTagSlotDetail.SlotDateTime.NotEquals(DateTime.MinValue) && LastPhysicalDate.Date >= oOmitTagSlotDetail.SlotDateTime.Date) {
                    oOverViewSlot.HistoryIcon = this.LoadImage("HistoryIcon", MedImage.GetPath(MedImages.HistoryIcon));
                }
            }
 else {
                oOverViewSlot.HistoryIcon = this.LoadImage("HistoryIcon", MedImage.GetPath(MedImages.HistoryIcon));
            }
        }
if(MedChartData.Is7DayView) {
            oOverViewSlot.Dose = SlotStatusText.OMITTED;
        }
        if(OmitSlotData.SlotStatus != SlotStatus.OMITTED){
        s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: Resource.MedsAdminChartToolTip.OmittedStatusToolTip }));
        s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: ChartContext.CurrentUserName }));
        s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: Resource.MedsAdminChartToolTip.ReasonToolTip + ": " + OmitReason, IsWordwrap: true, Width: 200 }));
        objtooltip = s;
        oOverViewSlot.StatusIcon.Tooltip = objtooltip;
        }
        oOverViewSlot.BackGroundColor = new SolidColorBrush(MedChartData.OmittedSlotsColor);
        oOmitTagSlotDetail.MedsAdminOID = OmitSlotData.MedAdminOID;
        oOmitTagSlotDetail.SlotOID = OmitSlotData.PrescriptionItemScheduleOID;
        oOmitTagSlotDetail.SlotStatus = OmitSlotData.SlotStatus;
        if(!oOverViewSlot.IsSelected)
this.medChartOverview.SelectSlot(oOverViewSlot.Key);
}
private UpdateReinstateSlotData(oOverViewSlot:DoseOverviewSlot, OmitSlotData:SlotData, IsInfusion:boolean, OmitReason:string): void
    {
        let isTitrated:boolean = String.Compare(this.doseType, DoseTypeCode.TITRATED, StringComparison.CurrentCultureIgnoreCase) == 0;
        let isStepTitrated:boolean = (String.Equals(this.doseType, DoseTypeCode.TITRATED, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.doseType, DoseTypeCode.STEPPEDVARIABLE, StringComparison.InvariantCultureIgnoreCase));
        let oTagSlotDetail:TagSlotDetail = null;
        if(oOverViewSlot.Tag != null && oOverViewSlot.Tag instanceof TagSlotDetail) {
            oTagSlotDetail = ObjectHelper.CreateType<TagSlotDetail>(oOverViewSlot.Tag, TagSlotDetail);
        }
let sToolTip:string = String.Empty;
        sToolTip = Resource.MedsAdminChartToolTip.PlannedToolTip + "\n" + Resource.MedsAdminChartToolTip.DueAtTooltip + ": " + (<TagSlotDetail>oOverViewSlot.Tag).SlotDateTime.ToString("dd-MMM-yyyy HH:mm");
        if(IsInfusion && !oTagSlotDetail.IsBolus) {
            oOverViewSlot.StatusIcon.UriString = MedImage.GetPath(MedImages.InfPlannedDeferredIcon);
        }
 else {
            if(String.Equals(OmitSlotData.SlotStatus, SlotStatus.OMITTED, StringComparison.InvariantCultureIgnoreCase)) {
                oOverViewSlot.StatusIcon.UriString = MedImage.GetPath(MedImages.OmittedSlotIcon);
            }
 else {
                oOverViewSlot.StatusIcon.UriString = MedImage.GetPath(MedImages.PlannedIcon);
            }
if(OmitSlotData.MedAdminOID > 0) {
                oOverViewSlot.HistoryIcon = this.LoadImage("HistoryIcon", MedImage.GetPath(MedImages.HistoryIcon));
            }
        }
if(MedChartData.Is7DayView && !isStepTitrated) {
            oOverViewSlot.Dose = String.Empty;
            if (String.Equals(OmitSlotData.SlotStatus, SlotStatus.OMITTED, StringComparison.InvariantCultureIgnoreCase)) {
                oOverViewSlot.Dose = SlotStatusText.OMITTED;
            }
        }
 else if(MedChartData.Is7DayView && isStepTitrated) {
            if (oTagSlotDetail != null) {
                if (!isTitrated) {
                    if (!String.IsNullOrEmpty(oTagSlotDetail.Dose)) {
                        oOverViewSlot.Dose = oTagSlotDetail.Dose;
                    }
                    if (!String.IsNullOrEmpty(oTagSlotDetail.UpperDose)) {
                        oOverViewSlot.Dose += "-" + oTagSlotDetail.UpperDose;
                    }
                    if (!String.IsNullOrEmpty(oTagSlotDetail.DoseUOM)) {
                        oOverViewSlot.Dose += " " + oTagSlotDetail.DoseUOM;
                    }
                    if (!String.IsNullOrEmpty(oTagSlotDetail.InfusionRate)) {
                        oOverViewSlot.Dose += "\n" + oTagSlotDetail.InfusionRate;
                        if (!String.IsNullOrEmpty(oTagSlotDetail.InfusionUpperRate)) {
                            oOverViewSlot.Dose += "-" + oTagSlotDetail.InfusionUpperRate;
                        }
                        if (!String.IsNullOrEmpty(oTagSlotDetail.InfusionRateUOM)) {
                            oOverViewSlot.Dose += " " + oTagSlotDetail.InfusionRateUOM;
                            if (!String.IsNullOrEmpty(oTagSlotDetail.InfusionRatePerUOM)) {
                                oOverViewSlot.Dose += "/" + oTagSlotDetail.InfusionRatePerUOM;
                            }
                        }
                    }
                }
                else {
                    if (!String.IsNullOrEmpty(oTagSlotDetail.Dose) && !String.Equals(oTagSlotDetail.Dose, CConstants.DoseTBD, StringComparison.InvariantCultureIgnoreCase)) {
                        oOverViewSlot.Dose = oTagSlotDetail.Dose;
                        if (oTagSlotDetail.DoseUOM != "") {
                            oOverViewSlot.Dose += " " + oTagSlotDetail.DoseUOM;
                        }
                    }
                    else {
                        oOverViewSlot.Dose = CConstants.DoseTBD;
                    }
                }
            }
        }
if(String.Equals((<TagSlotDetail>oOverViewSlot.Tag).Dose, CConstants.DoseTBD, StringComparison.InvariantCultureIgnoreCase) || (String.IsNullOrEmpty((<TagSlotDetail>oOverViewSlot.Tag).Dose) && isTitrated)) {
            sToolTip += "\n" + Resource.MedsAdminChartToolTip.DosePrescribedToolTip;
            oOverViewSlot.StatusIcon.UriString = MedImage.GetPath(MedImages.DoseTBDIcon);
        }
 else if(isTitrated) {
            sToolTip += "\n" + Resource.MedsAdminChartToolTip.PrescribedDoseToolTip + ": " + (<TagSlotDetail>oOverViewSlot.Tag).Dose + " " + (<TagSlotDetail>oOverViewSlot.Tag).DoseUOM;
            if (!String.IsNullOrEmpty((<TagSlotDetail>oOverViewSlot.Tag).Dose)) {
                sToolTip += Environment.NewLine + Environment.NewLine + MedsAdminChartToolTip.Enteredby + ChartContext.CurrentUserName;
            }
            oOverViewSlot.StatusIcon.UriString = MedImage.GetPath(MedImages.PlannedIcon);
        }
if((<TagSlotDetail>oOverViewSlot.Tag).IsSelfAdministered)
{
    sToolTip = Resource.MedsAdminChartToolTip.PatientSelfAdministering;
    oOverViewSlot.StatusIcon.UriString = MedImage.GetPath(MedImages.PatSelfAdmin);
}
if (String.Equals(OmitSlotData.SlotStatus, SlotStatus.PLANNED, StringComparison.InvariantCultureIgnoreCase)) {
    oOverViewSlot.StatusIcon.Tooltip = sToolTip;
    oOverViewSlot.BackGroundColor = new SolidColorBrush();
}
else if (String.Equals(OmitSlotData.SlotStatus, SlotStatus.OMITTED, StringComparison.InvariantCultureIgnoreCase)) {
    let s: StackPanel = new StackPanel();
    s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: Resource.MedsAdminChartToolTip.OmittedStatusToolTip }));
    s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: ChartContext.CurrentUserName }));
    s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: Resource.MedsAdminChartToolTip.ReasonToolTip + ": " + OmitReason, IsWordwrap: true, Width: 200 }));
    oOverViewSlot.StatusIcon.Tooltip = s;
    oOverViewSlot.BackGroundColor = new SolidColorBrush(MedChartData.OmittedSlotsColor);
}
let oReinstateTagSlotDetail: TagSlotDetail = <TagSlotDetail>oOverViewSlot.Tag;
oReinstateTagSlotDetail.MedsAdminOID = OmitSlotData.MedAdminOID;
oReinstateTagSlotDetail.SlotStatus = OmitSlotData.SlotStatus;
if (!oOverViewSlot.IsSelected)
    this.medChartOverview.SelectSlot(oOverViewSlot.Key);
}
private UpdateEnterTitratedSlotData(oOverViewSlot:DoseOverviewSlot, Dose:string, DoseUOM:string, DoseUOMOID:string): void
    {
        let sToolTip:string = String.Empty;
        let oSlotColor:SolidColorBrush = null;
        sToolTip = Resource.MedsAdminChartToolTip.PlannedToolTip + "\n" + Resource.MedsAdminChartToolTip.DueAtTooltip + ": " + (<TagSlotDetail>oOverViewSlot.Tag).SlotDateTime.ToString("dd-MMM-yyyy HH:mm") + "\n";
        if(String.Compare(Dose, CConstants.DoseTBD, StringComparison.CurrentCultureIgnoreCase) == 0) {
            sToolTip += Resource.MedsAdminChartToolTip.DosePrescribedToolTip;
            oOverViewSlot.StatusIcon.UriString = MedImage.GetPath(MedImages.DoseTBDIcon);
            if (MedChartData.Is7DayView) {
                oOverViewSlot.Dose = CConstants.DoseTBD;
            }
        }
 else {
            sToolTip += Resource.MedsAdminChartToolTip.PrescribedDoseToolTip + ": " + Dose + " " + DoseUOM;
            oOverViewSlot.StatusIcon.UriString = MedImage.GetPath(MedImages.PlannedIcon);
            if(MedChartData.Is7DayView) {
                oOverViewSlot.Dose = Dose + " " + DoseUOM;
            }
if(!String.IsNullOrEmpty(Dose))
{
    sToolTip += Environment.NewLine + Environment.NewLine + MedsAdminChartToolTip.Enteredby + ChartContext.CurrentUserName;
}
}

//Bug id :53541
    let _doseUOMOID: String = "0";
    if (!String.Equals((<TagSlotDetail>oOverViewSlot.Tag).Dose, "TBD")) {
        _doseUOMOID = (<TagSlotDetail>oOverViewSlot.Tag).DoseUOMOID.ToString();
    }

    if ((!String.Equals((<TagSlotDetail>oOverViewSlot.Tag).Dose, Dose)) || (!String.Equals(_doseUOMOID, DoseUOMOID))) {
        oOverViewSlot.HistoryIcon = this.LoadImage("HistoryIcon", MedImage.GetPath(MedImages.HistoryIcon));
    }
// if ((!String.Equals((<TagSlotDetail>oOverViewSlot.Tag).Dose, Dose)) && (!String.Equals((<TagSlotDetail>oOverViewSlot.Tag).DoseUOMOID, DoseUOMOID))) {
//     oOverViewSlot.HistoryIcon = this.LoadImage("HistoryIcon", MedImage.GetPath(MedImages.HistoryIcon));
// }
oOverViewSlot.StatusIcon.Tooltip = sToolTip;
oOverViewSlot.BackGroundColor = new SolidColorBrush();
let oEbterTitraredTagSlotDetail: TagSlotDetail = <TagSlotDetail>oOverViewSlot.Tag;
oEbterTitraredTagSlotDetail.Dose = Dose;
oEbterTitraredTagSlotDetail.DoseUOM = DoseUOM;
if (!String.IsNullOrEmpty(DoseUOMOID))
    oEbterTitraredTagSlotDetail.DoseUOMOID = Convert.ToInt64(DoseUOMOID);
if (!oOverViewSlot.IsSelected)
    this.medChartOverview.SelectSlot(oOverViewSlot.Key);
if (oEbterTitraredTagSlotDetail.SlotOID == 0 && MedChartData.PrescriptionItemScheduleOID > 0) {
    oEbterTitraredTagSlotDetail.SlotOID = MedChartData.PrescriptionItemScheduleOID;
}

}
public LoadImage(key:string, Uri:string): ChartIcon
{
    let oChartIcon: ChartIcon = new ChartIcon();
    oChartIcon.Key = key;
    oChartIcon.UriString = Uri;
    return oChartIcon;
}
private cmdReinstateClick(): void
    {
        let sResult:string = String.Empty;
        let Slotdatetime:DateTime = DateTime.MinValue;
        let isInfusion:boolean = false;
        let isBolus:boolean = false;
        sResult = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", MedChartData.MedChartOID, "MAReinstate", Common.nLockDuration), String);
        let oReinstateVM:ReinstateVM = new ReinstateVM();
        let oHdrAddnlInfo:CDrugHdrAddnlInfo = new CDrugHdrAddnlInfo();
        let olstSlotData:ObservableCollection<SlotData>  = new ObservableCollection<SlotData>();
        if((this.medChartOverview.SelectedSlots != null && this.medChartOverview.SelectedSlots.Count > 0) && !this.IsMedicationSelected)
{
    this.IsOmitReinstateReviewClicked = true;
    oReinstateVM.MedAdminOID = new ArrayOfLong(); 
    this.medChartOverview.SelectedSlots.forEach( (oTagObject)=> {
        let oOverViewSlot: DoseOverviewSlot = ObjectHelper.CreateType<DoseOverviewSlot>(oTagObject.oIChartSlot, DoseOverviewSlot);
        let oTagSlotDetail: TagSlotDetail = ObjectHelper.CreateType<TagSlotDetail>(oOverViewSlot.Tag, TagSlotDetail);
        isInfusion = oTagSlotDetail.IsInfusion;
        oReinstateVM.MedAdminOID.Add(oTagSlotDetail.MedsAdminOID);
        let oReinstateSlotData: SlotData = new SlotData();
        oReinstateSlotData.ScheduleDTTM = Slotdatetime = oTagSlotDetail.SlotDateTime;
        oReinstateVM.IsLastSlotinCurrentView = oTagSlotDetail.IsLastSlotInView;
        olstSlotData.Add(oReinstateSlotData);
        isBolus = oTagSlotDetail.IsBolus;
    });
    let RowKey: string = "Row-" + this.medChartOverview.SelectedSlots[0].oDrugItem.Key;
    let TagSlotOID: number = this.medChartOverview.SelectedSlots.Count > 0 ? (<TagSlotDetail>((<DoseOverviewSlot>(this.medChartOverview.SelectedSlots[0].oIChartSlot)).Tag)).SlotOID : Int64.MinValue;
    let oCurrentChartRow: List<ChartRow> = new List<ChartRow>();
    oCurrentChartRow = this.medChartOverview.ChartRows.Where(c => c.Key == RowKey).Select(s => s).ToList<ChartRow>();
    if (oCurrentChartRow != null && oCurrentChartRow.Count > 0) {
        this.SelectedReinstateRow = oCurrentChartRow.FirstOrDefault();
    }
    let FirstSelOmitSlotDTTM: DateTime= DateTime.MinValue;
    if (this.SelectedReinstateRow != null) {
        FirstSelOmitSlotDTTM = olstSlotData.Min(x => x.ScheduleDTTM).ScheduleDTTM;
        if ((ObjectHelper.CreateType<TagDrugHeaderDetail>(this.SelectedReinstateRow.DrugItem.Tag, TagDrugHeaderDetail)).IsIndefiniteOmit) {
            if (FirstSelOmitSlotDTTM < CommonBB.GetServerDateTime()) {
                FirstSelOmitSlotDTTM = CommonBB.GetServerDateTime();
            }
        }
        let olstSlotDat: ObservableCollection<SlotData> = new ObservableCollection<SlotData>();
        let daycount: number = this.SelectedReinstateRow.ChartCells.Count;
        for (let i: number = 0; i < daycount; i++) {
            let slotcount: number = this.SelectedReinstateRow.ChartCells[i].Slots.Count;// to be revisit count()
            for (let j: number = 0; j < slotcount; j++) {
                if ((this.SelectedReinstateRow.ChartCells[i].Slots[j]) instanceof DoseOverviewSlot) {
                    let oTagSlotDetail: TagSlotDetail = ObjectHelper.CreateType<TagSlotDetail>((<DoseOverviewSlot>(this.SelectedReinstateRow.ChartCells[i].Slots[j])).Tag, TagSlotDetail);
                    if (String.Equals(oTagSlotDetail.SlotStatus, SlotStatus.OMITTED, StringComparison.InvariantCultureIgnoreCase) && oTagSlotDetail.SlotDateTime >= FirstSelOmitSlotDTTM) {
                        let oReinstateSlotData: SlotData = new SlotData();
                        oReinstateSlotData.ScheduleDTTM = oTagSlotDetail.SlotDateTime;
                        oReinstateSlotData.SlotStatus = SlotStatus.PLANNED;
                        oReinstateSlotData.MedAdminOID = oTagSlotDetail.MedsAdminOID;
                        olstSlotDat.Add(oReinstateSlotData);
                    }
                }
            }
        }
        oReinstateVM.UpdatedSlotsData = olstSlotDat;
    }
    let oReinstateTagObject: TagObject = ObjectHelper.CreateType<TagObject>(this.medChartOverview.SelectedSlots[0], TagObject);
    if (oReinstateTagObject != null && oReinstateTagObject.oDrugItem != null) {
        oReinstateVM.PrescriptionItemOID = (!String.IsNullOrEmpty(oReinstateTagObject.oDrugItem.Key) && oReinstateTagObject.oDrugItem.Key.length > 0) ? Convert.ToInt64(oReinstateTagObject.oDrugItem.Key) : 0;
        let oTagDrugHeaderDetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(oReinstateTagObject.oDrugItem.Tag, TagDrugHeaderDetail);
        if (oTagDrugHeaderDetail != null) {
            oReinstateVM.PrescriptionItemEndDate = (oTagDrugHeaderDetail.EndDate.NotEquals(DateTime.MinValue)) ? oTagDrugHeaderDetail.EndDate : DateTime.MinValue;
            oReinstateVM.PrescriptionItemStatus = oTagDrugHeaderDetail.PrescriptionItemStatus;
            oReinstateVM.FreqPerodCode = oTagDrugHeaderDetail.FreqPerodcode;
            oReinstateVM.IsIndefiniteOmit = oTagDrugHeaderDetail.IsIndefiniteOmit;
            oReinstateVM._DoseTypeCode = oTagDrugHeaderDetail.DoseType;
        }
    }
    oReinstateVM.ScheduleDTTM = Slotdatetime;
    oReinstateVM.CACode = MedAction.ReinstateSlot;
    oReinstateVM.oChartRow = this.SelectedReinstateRow;
    if (this.objScheduletimes != null && this.objScheduletimes.Count > 0) {
        if (!String.IsNullOrEmpty(this.objScheduletimes[0].ScheduledTime)) {
            oReinstateVM.objScheduletimes = this.objScheduletimes;
        }
    }
    oReinstateVM.objFrequencyDetails = this.objFrequencyDetails;
    oReinstateVM.ReinstateSlotData = new ObservableCollection<SlotData>();
    oReinstateVM.ReinstateSlotData = olstSlotData;
    this.IsLastSlotExists(oReinstateVM);
    oReinstateVM.IsSlotUpdatedEvent  = (s,e) => { this.oReinstateVM_IsSlotUpdatedEvent(); } ;
    this.omedsadminReinstateslots = new MedsAdminReinstateslots();
    // ObjectHelper.stopFinishAndCancelEvent(true);
    if (this.SelectedReinstateRow != null && this.SelectedReinstateRow.DrugItem.Tag instanceof TagDrugHeaderDetail) {
        this.omedsadminReinstateslots.objtagheader = ObjectHelper.CreateType<TagDrugHeaderDetail>(this.SelectedReinstateRow.DrugItem.Tag, TagDrugHeaderDetail);
    }
    oReinstateVM.IsBolus = isBolus;
    oReinstateVM.IsPastSlotSelected = this.IsPastOmitSlotSelected;
    oReinstateVM.MedicationSelected = this.IsMedicationSelected;
    oReinstateVM.IsInfusion = isInfusion;
    this.omedsadminReinstateslots.DataContext = oReinstateVM;
    let oDrugItem: DrugItem = this.medChartOverview.SelectedSlots[0].oDrugItem;
    if (oDrugItem != null && !String.IsNullOrEmpty(oDrugItem.AdminWarningMessage))
        oHdrAddnlInfo.IngredientAdminWarning = oDrugItem.AdminWarningMessage;
            this.omedsadminReinstateslots.objDrugHeader = new DrugHeader();
    this.omedsadminReinstateslots.objDrugHeader.oDrugHeader = new CDrugHeader();
    this.omedsadminReinstateslots.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo = new DrugHeaderItem();
    this.omedsadminReinstateslots.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowFrequency = true;
    this.omedsadminReinstateslots.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowSite = true;
    this.omedsadminReinstateslots.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowAsrequired = true;
    if (!String.IsNullOrEmpty(this.medChartOverview.SelectedSlots[0].oDrugItem.AdministrationInst)) {
        this.omedsadminReinstateslots.objDrugHeader.lblInstructions.Visibility = Visibility.Visible;
        this.omedsadminReinstateslots.objDrugHeader.lblInstructions.Text = this.medChartOverview.SelectedSlots[0].oDrugItem.AdministrationInst;
    }
    this.omedsadminReinstateslots.objDrugHeader.DataContext = Common.SetDrugHeaderContent(oDrugItem, oHdrAddnlInfo, this.omedsadminReinstateslots.objDrugHeader);
    this.omedsadminReinstateslots.HelpCode = "VW_REINSSLOT";
            let Callback = (s, e) => {
                if (s != null && e != null) {
                    this.omedsadminReinstateslots = s;
                }
            }
            let dialogWindowHeight = (660/window.devicePixelRatio);  
            AppActivity.OpenWindow("Reinstate selected slot(s)", this.omedsadminReinstateslots, (s) => { this.omedsadminReinstateslots_Closed(s); }, "Reinstate slots", true, dialogWindowHeight, 430, true, WindowButtonType.OkCancel, null, null, null, Callback);
}
 else if (this.IsMedicationSelected) {
    this.IsOmitReinstateReviewClicked = true;
    let olstsSlotData: ObservableCollection<SlotData> = new ObservableCollection<SlotData>();
    let oReinstateChartObject: ChartRow = new ChartRow();
    if (this.medChartOverview.ChartRows.Count > 0) {
        for (let i: number = 0; i < this.medChartOverview.ChartRows.Count; i++) {
            if (this.medChartOverview.ChartRows[i].DrugItem.Key == this.DrugKey) {
                this.SelectedRow = i;
                oReinstateVM.MedAdminOID = new ArrayOfLong();
                this.medChartOverview.ChartRows[i].ChartCells.forEach( (oChartCell)=> {
                            let _SlotData = oChartCell.Slots.Where(x => x.Key.StartsWith("Overview"));
                            _SlotData.forEach((oSlots) => {
                        let oTagSlotDetail: TagSlotDetail = ObjectHelper.CreateType<TagSlotDetail>(oSlots.Tag, TagSlotDetail);
                        let oReinstateSlotData: SlotData = new SlotData();
                        if (oTagSlotDetail != null && String.Equals(oTagSlotDetail.SlotStatus, SlotStatus.OMITTED, StringComparison.InvariantCultureIgnoreCase) && (DateTime.GreaterThanOrEqualTo( oTagSlotDetail.SlotDateTime , this.dtCurrentDateTime))) {
                            isInfusion = oTagSlotDetail.IsInfusion;
                            oReinstateVM.MedAdminOID.Add(oTagSlotDetail.MedsAdminOID);
                            oReinstateSlotData.ScheduleDTTM = Slotdatetime = oTagSlotDetail.SlotDateTime;
                            oReinstateVM.IsLastSlotinCurrentView = oTagSlotDetail.IsLastSlotInView;
                            isBolus = oTagSlotDetail.IsBolus;
                            olstsSlotData.Add(oReinstateSlotData);
                        }
                    });
                });
                oReinstateChartObject = ObjectHelper.CreateType<ChartRow>(this.medChartOverview.ChartRows[i], ChartRow);
                if (oReinstateChartObject != null && oReinstateChartObject.DrugItem != null) {
                    oReinstateVM.PrescriptionItemOID = (!String.IsNullOrEmpty(oReinstateChartObject.DrugItem.Key) && oReinstateChartObject.DrugItem.Key.length > 0) ? Convert.ToInt64(oReinstateChartObject.DrugItem.Key) : 0;
                    let oTagDrugHeaderDetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(oReinstateChartObject.DrugItem.Tag, TagDrugHeaderDetail);
                    if (oTagDrugHeaderDetail != null) {
                        oReinstateVM.PrescriptionItemEndDate = (this.EndDateTime.NotEquals(DateTime.MinValue)) ? this.EndDateTime : DateTime.MinValue;
                        oReinstateVM.PrescriptionItemStatus = this.PresItemStatus;
                        oReinstateVM.FreqPerodCode = this.FrqPerCode;
                        oReinstateVM.IsIndefiniteOmit = oTagDrugHeaderDetail.IsIndefiniteOmit;
                        oReinstateVM.IsMedicationSelected = this.IsMedicationSelected;
                    }
                }
            }
        }
    }
    oReinstateVM.ScheduleDTTM = Slotdatetime;
    oReinstateVM.CACode = MedAction.ReinstateSlot;
    oReinstateVM.ReinstateSlotData = new ObservableCollection<SlotData>();
    if (!oReinstateVM.IsIndefiniteOmit) {
        oReinstateVM.ReinstateSlotData = olstsSlotData;
    }
    oReinstateVM.IsSlotUpdatedEvent  = (s,e) => { this.oReinstateVM_IsSlotUpdatedEvent(); } ;
    this.omedsadminReinstateslots = new MedsAdminReinstateslots;
    oReinstateVM.IsBolus = isBolus;
    oReinstateVM.MedicationSelected = this.IsMedicationSelected;
    oReinstateVM.IsInfusion = isInfusion;
    let oDrugItem: DrugItem = this.medChartOverview.ChartRows[0].DrugItem;
    if (oDrugItem != null && !String.IsNullOrEmpty(oDrugItem.AdminWarningMessage))
        oHdrAddnlInfo.IngredientAdminWarning = oDrugItem.AdminWarningMessage;
            this.omedsadminReinstateslots.objDrugHeader = new DrugHeader()
    this.omedsadminReinstateslots.objDrugHeader.oDrugHeader = new CDrugHeader();
    this.omedsadminReinstateslots.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo = new DrugHeaderItem();
    this.omedsadminReinstateslots.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowFrequency = true;
    this.omedsadminReinstateslots.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowSite = true;
    this.omedsadminReinstateslots.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowAsrequired = true;
    if (!String.IsNullOrEmpty(this.medChartOverview.ChartRows[this.SelectedRow].DrugItem.AdministrationInst)) {
        this.omedsadminReinstateslots.objDrugHeader.lblInstructions.Visibility = Visibility.Visible;
        this.omedsadminReinstateslots.objDrugHeader.lblInstructions.Text = this.medChartOverview.ChartRows[this.SelectedRow].DrugItem.AdministrationInst;
    }
    this.omedsadminReinstateslots.objDrugHeader.DataContext = Common.SetDrugHeaderContent(this.medChartOverview.ChartRows[this.SelectedRow].DrugItem, oHdrAddnlInfo, this.omedsadminReinstateslots.objDrugHeader);
    if (this.medChartOverview.ChartRows[this.SelectedRow].DrugItem.Tag instanceof TagDrugHeaderDetail) {
        this.omedsadminReinstateslots.objtagheader = ObjectHelper.CreateType<TagDrugHeaderDetail>(this.medChartOverview.ChartRows[this.SelectedRow].DrugItem.Tag, TagDrugHeaderDetail);
    }
    if (this.SelectedReinstateRow != null && this.SelectedReinstateRow != null) {
        let olstSlotDat: ObservableCollection<SlotData> = new ObservableCollection<SlotData>();
        let daycount: number = this.SelectedReinstateRow.ChartCells.Count;
        for (let i: number = 0; i < daycount; i++) {
            let slotcount: number = this.SelectedReinstateRow.ChartCells[i].Slots.Count;
            for (let j: number = 0; j < slotcount; j++) {
                if ((this.SelectedReinstateRow.ChartCells[i].Slots[j]) instanceof DoseOverviewSlot) {
                    let oTagSlotDetail: TagSlotDetail = ObjectHelper.CreateType<TagSlotDetail>((<DoseOverviewSlot>(this.SelectedReinstateRow.ChartCells[i].Slots[j])).Tag, TagSlotDetail);
                    if (String.Equals(oTagSlotDetail.SlotStatus, SlotStatus.OMITTED, StringComparison.InvariantCultureIgnoreCase) && oTagSlotDetail.SlotDateTime >= CommonBB.GetServerDateTime()) {
                        let oReinstateSlotData: SlotData = new SlotData();
                        oReinstateSlotData.ScheduleDTTM = oTagSlotDetail.SlotDateTime;
                        oReinstateSlotData.SlotStatus = SlotStatus.PLANNED;
                        oReinstateSlotData.MedAdminOID = oTagSlotDetail.MedsAdminOID;
                        olstSlotDat.Add(oReinstateSlotData);
                    }
                }
            }
        }
        oReinstateVM.UpdatedSlotsData = olstSlotDat;
    }
    oReinstateVM.oChartRow = this.SelectedReinstateRow;
    if (this.objScheduletimes != null && this.objScheduletimes.Count > 0) {
        if (!String.IsNullOrEmpty(this.objScheduletimes[0].ScheduledTime)) {
            oReinstateVM.objScheduletimes = this.objScheduletimes;
        }
    }
    oReinstateVM.objFrequencyDetails = this.objFrequencyDetails;
    this.omedsadminReinstateslots.DataContext = oReinstateVM;
    this.omedsadminReinstateslots.HelpCode = "VW_REINSSLOT";
            let Callback = (s, e) => {
                if (s != null && e != null) {
                    this.omedsadminReinstateslots = s;
                }
            }
            let dialogWindowHeight = (660/window.devicePixelRatio);
            AppActivity.OpenWindow("Reinstate selected slot(s)", this.omedsadminReinstateslots, (s) => { this.omedsadminReinstateslots_Closed(s); }, "Reinstate slots", true, dialogWindowHeight, 430, true, WindowButtonType.OkCancel, null, null, null, Callback);
}
}
cmdReinstate_Click(sender?:Object, e?:RoutedEventArgs): void
    {
        this.IsLock = false;
        this.disableClick = false;
        let oTagDrugHeaderDetail:TagDrugHeaderDetail = null;
        let items = this.medChartOverview.GetSelectedRows();
        // ObjectHelper.stopFinishAndCancelEvent(false);
        if(this.medChartOverview.SelectedSlots != null && this.medChartOverview.SelectedSlots.Count > 0 && !this.IsMedicationSelected)
 {
    let OTagObject: TagObject = ObjectHelper.CreateType<TagObject>(this.medChartOverview.SelectedSlots[0], TagObject);
    if (OTagObject != null && OTagObject.oDrugItem != null && OTagObject.oDrugItem.Tag != null) {
        oTagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(OTagObject.oDrugItem.Tag, TagDrugHeaderDetail);
    }
}
if (items.Count > 0 && items[0] != null && items[0].DrugItem != null && items[0].DrugItem.Tag != null && (<TagDrugHeaderDetail>(items[0].DrugItem.Tag)) != null && !(<TagDrugHeaderDetail>(items[0].DrugItem.Tag)).IsAllowedToPerform || (oTagDrugHeaderDetail != null && !oTagDrugHeaderDetail.IsAllowedToPerform)) {
    let oMsgBox: iMessageBox = new iMessageBox();
    oMsgBox.Title = "Information - Lorenzo";
    oMsgBox.Height = 140;
    oMsgBox.Width = 350;
    oMsgBox.MessageButton = MessageBoxButton.OK; //LORENZO.BlueBird.Controls.
    oMsgBox.IconType = MessageBoxType.Information;
    oMsgBox.Message = Resource.MedsAdminPrescChartView.IsReinstateAllowed;
    oMsgBox.Show();
}
else {
    this.PresCheckPessimisticLock("MedPrescribeInpatient~MedDiscontinueCancel~MAOmit~MAReinstate~MedCVInpatient~MEDAuthInpatient~MAReview~MAEnterTitratedDose", "", "MedPrescribeDischarge~MedCVDischarge~MedPrescribeLeave~MedCVLeave~MAMedChart", this.IsLock , (s,e) => { this.ReinstateWarning_MessageBoxClose(s,e); } );
    if (!this.IsLock && !this.IsOmitReinstateReviewClicked) {
        this.cmdReinstateClick();
    }
}
}
ReinstateWarning_MessageBoxClose(sender:Object, e:MessageEventArgs): void
    {
        if(e.MessageBoxResult == MessageBoxResult.Yes) { //LORENZO.BlueBird.Controls.
            this.cmdReinstateClick();
        }
 else {
            this.IsOmitReinstateReviewClicked = false;
        }
    }
oReinstateVM_IsSlotUpdatedEvent(): void
    {
        this.IsReviewHighlighted = false;
        let oReinstateVM:ReinstateVM = ObjectHelper.CreateType<ReinstateVM>(this.omedsadminReinstateslots.DataContext, ReinstateVM);
        if(oReinstateVM != null && oReinstateVM.IsReinstateSuccess && oReinstateVM.UpdatedSlotsData != null && oReinstateVM.UpdatedSlotsData.Count > 0) {
            let sPrescItemOID: string = String.Empty;
            sPrescItemOID = this.medChartOverview.SelectedSlots.Count > 0 ? this.medChartOverview.SelectedSlots[0].oDrugItem.Key : String.Empty;
            if (String.IsNullOrEmpty(sPrescItemOID)) {
                sPrescItemOID = this.medChartOverview.GetSelectedRows().Count == 1 ? this.medChartOverview.ChartRows[this.SelectedRow].DrugItem.Key : String.Empty;
                if (!String.IsNullOrEmpty(sPrescItemOID))
                    this.SelectedReinstateRow = this.medChartOverview.ChartRows[this.SelectedRow];
            }
            else {
                this.nInvalidSlotSelectedCount = 1;
            }
            if (String.IsNullOrEmpty(sPrescItemOID) && this.SelectedReinstateRow != null) {
                sPrescItemOID = this.SelectedReinstateRow.DrugItem.Key;
            }
            if (String.IsNullOrEmpty(sPrescItemOID)) {
                return
            }
            this.olstSlotDat = new ObservableCollection<SlotData>();
            let daycount: number = this.SelectedReinstateRow.ChartCells.Count;
            for (let i: number = 0; i < daycount; i++) {
                let slotcount: number = this.SelectedReinstateRow.ChartCells[i].Slots.Count;
                for (let j: number = 0; j < slotcount; j++) {
                    if ((this.SelectedReinstateRow.ChartCells[i].Slots[j]) instanceof DoseOverviewSlot) {
                        let oTagSlotDetail: TagSlotDetail = ObjectHelper.CreateType<TagSlotDetail>((<DoseOverviewSlot>(this.SelectedReinstateRow.ChartCells[i].Slots[j])).Tag, TagSlotDetail);
                        if (String.Equals(oTagSlotDetail.SlotStatus, SlotStatus.OMITTED, StringComparison.InvariantCultureIgnoreCase) && oTagSlotDetail.SlotDateTime >= this.dtCurrentDateTime) {
                            let FutureOmitSlot: SlotData = new SlotData();
                            FutureOmitSlot.ScheduleDTTM = oTagSlotDetail.SlotDateTime;
                            this.olstSlotDat.Add(FutureOmitSlot);
                        }
                    }
                }
            }
            oReinstateVM.UpdatedSlotsData.forEach( (oSlotData)=> {
                let strCaption: string = oSlotData.ScheduleDTTM.ToString(this.sDrugHeaderFormat);
                // let SlotRows = from slotRow in oGetMedsChartData.oChartRowList
                // where slotRow.Key.Split('-')[1] == sPrescItemOID
                // select slotRow;
                let SlotRows = this.oGetMedsChartData.oChartRowList.Where(slotRow =>slotRow.Key.Split('-')[1]==sPrescItemOID).Select(slotRow => slotRow);
                if (SlotRows != null && SlotRows.Count() > 0) {
                    let SlotRow = SlotRows.First();
            //         let SlotsColl = (from slotColls in SlotRow.ChartCells
            //         let list = (from colIndx in medChartOverview.ChartColumns
            //         where colIndx.Caption == strCaption
            //         select new { colIndex = colIndx.Index })
            // let colIndex = list.Count() < 1 ? -1 :
            //     list.First().colIndex
            // where slotColls.ColIndex == colIndex
            // select slotColls);

            // need to revesit by suresh
                    let list = this.medChartOverview.ChartColumns.Where(colIndx => colIndx.Caption == strCaption).Select(colIndx => colIndx.Index);
                    let colIndex = list.Count() < 1 ? -1 : list.First();
            let SlotsColl = SlotRow.ChartCells.Where(slotColls =>slotColls.ColIndex==colIndex).Select(slotColls => slotColls);

           // let SlotsColl = SlotRow.ChartCellsletlist=(fromcolIndxinmedChartOverview.ChartColumns.Where(slotColls =>colIndx.Caption==strCaption).Select(slotColls => new{colIndex=colIndx.Index})letcolIndex=list.Count()<1?-1:list.First().colIndex.Where(slotColls =>slotColls.ColIndex==colIndex).Select(slotColls => slotColls));
            
            if (SlotsColl.Count() > 0) {
                let cCell: ChartCell = SlotsColl.First();
                // let OAllSlotItems = from oAllSlot in cCell.Slots
                // where oAllSlot is DoseOverviewSlot
                // select oAllSlot;
                let OAllSlotItems = cCell.Slots.Where(oAllSlot =>oAllSlot as DoseOverviewSlot).Select(oAllSlot => oAllSlot);
                if (OAllSlotItems != null && OAllSlotItems.Count() > 0) {
                    //let OSlotItems = from oSlot in OAllSlotItems where DateTime.Compare(((TagSlotDetail)((DoseOverviewSlot)oSlot).Tag).SlotDateTime, oSlotData.ScheduleDTTM) == 0 select oSlot;
                   // To be Revisit below commented code by suresh
                    // let OSlotItems = OAllSlotItems.Where(oSlot =>DateTime.Compare(((TagSlotDetail)((DoseOverviewSlot)oSlot).Tag).SlotDateTime,oSlotData.ScheduleDTTM)==0).Select(oSlot => oSlot);
                    //Athulya --START
                    // let OSlotItems = OAllSlotItems.Where(oSlot => String.Equals((<TagSlotDetail>(<DoseOverviewSlot>oSlot).Tag).SlotDateTime, oSlotData.ScheduleDTTM)).Select(oSlot => oSlot);
                            // let OSlotItems: any = '';
                    let OSlotItems: any = [];
                    OAllSlotItems.forEach(oSlot => {
                        if(oSlot instanceof DoseOverviewSlot){
                        let oDoseOvwSlot = oSlot as DoseOverviewSlot;
                        let oTagDoseOvwSlot = oDoseOvwSlot.Tag as TagSlotDetail;
                        if (DateTime.Compare(oTagDoseOvwSlot.SlotDateTime, oSlotData.ScheduleDTTM) == 0) {
                            OSlotItems.push(oSlot);
                        }
                    }
                    });
                    //Athulya--END
                    if (OSlotItems.Count() > 0) {
                        let oOverViewSlot: DoseOverviewSlot = <DoseOverviewSlot>OSlotItems.First();
                        if (this.medChartOverview.GetSelectedRows().Count == 1) {
                            oOverViewSlot.IsSelected = false;
                            this.nInvalidSlotSelectedCount = 0;
                        }
                        if ((<TagSlotDetail>oOverViewSlot.Tag).IsSelfAdministered)
                            oSlotData.SlotStatus = SlotStatus.PATIENTSELFADMIN;
                        this.UpdateReinstateSlotData(oOverViewSlot, oSlotData, oReinstateVM.IsInfusion, (ObjectHelper.CreateType<TagDrugHeaderDetail>(this.SelectedReinstateRow.DrugItem.Tag, TagDrugHeaderDetail)).OmitComments);
                    }
                }
            }
        }
    });
this.nSlotSelectedCountForReinstate = 0;
if (this.medChartOverview.SelectedSlots.Count > 0 && String.Compare((ObjectHelper.CreateType<TagDrugHeaderDetail>(this.medChartOverview.SelectedSlots[0].oDrugItem.Tag, TagDrugHeaderDetail)).DoseType, DoseTypeCode.TITRATED, StringComparison.CurrentCultureIgnoreCase) == 0) {
    this.nSlotSelectedCountForEnterDose = oReinstateVM.UpdatedSlotsData.Count;
}
else {
    this.nSlotSelectedCountForEnterDose = 0;
}
}
 else if (this.IsMedicationSelected && oReinstateVM.IsChkReinstateAll) {
    this.SelectedReinstateRow.DrugItem.ReviewLabel = String.Empty;
    this.SelectedReinstateRow.DrugItem.ReviewVal = String.Empty;
    this.SelectedReinstateRow.DrugItem.ReviewIcon = null;
    (ObjectHelper.CreateType<TagDrugHeaderDetail>(this.SelectedReinstateRow.DrugItem.Tag, TagDrugHeaderDetail)).ReviewDTTM = DateTime.MinValue;
    this.SelectedReinstateRow.DrugItem.OmitLabel = String.Empty;
    this.SelectedReinstateRow.DrugItem.OmitIcon = null;
}
if (!this.IsMedicationSelected) {
    this.cmdReinstate.IsEnabled = false;
}
else {
    this.cmdOmit.IsEnabled = true;
    this.cmdReinstate.IsEnabled = false;
}
if (oReinstateVM != null && oReinstateVM.oManageReviewPeriod != null) {
    if (this.SelectedReinstateRow != null) {
        oReinstateVM.oManageReviewPeriod.NewReviewAfterDTTM = DateTime.MinValue;
      this.HighlightCellsWithRed(this.SelectedReinstateRow, oReinstateVM.oManageReviewPeriod.NewReviewAfterDTTM);
    }
    this.ReInstateRefresh(oReinstateVM.oManageReviewPeriod);
}
else if (this.oManageReviewPeriod != null) {
    if (this.SelectedReinstateRow != null) {
      this.HighlightCellsWithRed(this.SelectedReinstateRow, this.oManageReviewPeriod.NewReviewAfterDTTM);
    }
    this.ReInstateRefresh(this.oManageReviewPeriod);
}
else if (oReinstateVM != null) {
    this.ReInstateRefresh(oReinstateVM.oManageReviewPeriod);
}
this.AppDialogWindow.DialogResult = true;
}
private ReInstateRefresh(objManageRevPer:IPPMAManagePrescSer.ManageReviewPeriod): void
    {
        let oTagDrugHeaderDetail:TagDrugHeaderDetail = null;
        let oReinstateVM:ReinstateVM = ObjectHelper.CreateType<ReinstateVM>(this.omedsadminReinstateslots.DataContext, ReinstateVM);
        if(this.SelectedReinstateRow != null && this.SelectedReinstateRow.DrugItem != null && this.SelectedReinstateRow.DrugItem.Tag != null)
 {
    oTagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(this.SelectedReinstateRow.DrugItem.Tag, TagDrugHeaderDetail);
    oTagDrugHeaderDetail.LastOmittedSlotDTTM = oReinstateVM.LastOmittedSlotDTTM;
}
if (objManageRevPer != null && objManageRevPer.NewReviewAfterDTTM.NotEquals(DateTime.MinValue)) {
    let Tooltip: string = String.Empty;
    oTagDrugHeaderDetail.ReviewDTTM = objManageRevPer.NewReviewAfterDTTM;
    this.SelectedReinstateRow.DrugItem.ReviewLabel = CConstants.ReviewDue;
    this.SelectedReinstateRow.DrugItem.ReviewVal = objManageRevPer.NewReviewAfterDTTM.ToString(CConstants.DateTimeFormat);
    if (objManageRevPer.NewReviewAfterDTTM.Date <= this.dtCurrentDateTime.Date) {
        this.SelectedReinstateRow.DrugItem.ReviewIcon = this.LoadImage(CConstants.ReviewKey, MedImage.GetPath(MedImages.ReviewIcon));
        if (String.Equals(objManageRevPer.NewReviewType.Code, CConstants.ReviewGeneralType)) {
            Tooltip = Resource.MedsAdminPrescChartView.ReviewGeneralIcon_Tooltip;
        }
        else {
            Tooltip = Resource.MedsAdminPrescChartView.ReviewOmittedIcon_Tooltip;
        }
        Tooltip += objManageRevPer.NewReviewAfterDTTM.ToString(CConstants.DateTimeFormat) + Environment.NewLine;
        if (!String.IsNullOrEmpty(objManageRevPer.NewReviewRequestComments)) {
            Tooltip += objManageRevPer.NewReviewRequestComments + Environment.NewLine;
        }
        Tooltip += CConstants.TooltipReviewRequestedBy;
        if (!String.IsNullOrEmpty(objManageRevPer.oReviewAfterDetail.ReviewRequestedBy)) {
            Tooltip += objManageRevPer.oReviewAfterDetail.ReviewRequestedBy + Environment.NewLine;
        }
        else {
            if (ContextManager.Instance["UserName"] != null) {
                Tooltip += ContextManager.Instance["UserName"].ToString() + Environment.NewLine;
            }
        }
        Tooltip += Resource.MedicationChart.UpdateReview_Tooltip;
        this.SelectedReinstateRow.DrugItem.ReviewIcon.Tooltip = Tooltip;
    }
    else {
        this.SelectedReinstateRow.DrugItem.ReviewIcon = null;
    }
    if (oTagDrugHeaderDetail != null && oTagDrugHeaderDetail.IsIndefiniteOmit && oReinstateVM.IsChkReinstateAll && !this.IsMedicationSelected) {
        this.SelectedReinstateRow.DrugItem.OmitLabel = CConstants.OmitDefinite;
        this.SelectedReinstateRow.DrugItem.OmitIcon.Tooltip = this.SelectedReinstateRow.DrugItem.OmitIcon.Tooltip.ToString().Replace(CConstants.OmitIndefinite, CConstants.OmitDefinite);
    }
}
else if (oTagDrugHeaderDetail != null && oTagDrugHeaderDetail.IsIndefiniteOmit && oReinstateVM.IsChkReinstateAll) {
    this.SelectedReinstateRow.DrugItem.ReviewLabel = String.Empty;
    this.SelectedReinstateRow.DrugItem.ReviewVal = String.Empty;
    this.SelectedReinstateRow.DrugItem.ReviewIcon = null;
    oTagDrugHeaderDetail.ReviewDTTM = DateTime.MinValue;
    if (this.IsMedicationSelected) {
        this.SelectedReinstateRow.DrugItem.OmitLabel = String.Empty;
        this.SelectedReinstateRow.DrugItem.OmitIcon = null;
        oTagDrugHeaderDetail.OmitComments = String.Empty;
    }
    else {
        this.SelectedReinstateRow.DrugItem.OmitLabel = CConstants.OmitDefinite;
        this.SelectedReinstateRow.DrugItem.OmitIcon.Tooltip = this.SelectedReinstateRow.DrugItem.OmitIcon.Tooltip.ToString().Replace(CConstants.OmitIndefinite, CConstants.OmitDefinite);
    }
}
let futureReinstatecount: number = 0;
if (oReinstateVM.UpdatedSlotsData != null)
    for (let k: number = 0; k < oReinstateVM.UpdatedSlotsData.Count; k++) {
        if (oReinstateVM.UpdatedSlotsData[k].ScheduleDTTM >= this.dtCurrentDateTime && !String.Equals(oReinstateVM.UpdatedSlotsData[k].SlotStatus, SlotStatus.OMITTED, StringComparison.InvariantCultureIgnoreCase)) {
            futureReinstatecount++;
        }
    }
if (this.SelectedReinstateRow != null && this.SelectedReinstateRow.DrugItem != null && oTagDrugHeaderDetail != null) {
    if ((this.IsMedicationSelected && this.olstSlotDat == null) || (oReinstateVM != null && oReinstateVM.UpdatedSlotsData != null && oReinstateVM.UpdatedSlotsData.Count > 0 && this.olstSlotDat != null && this.olstSlotDat.Count > 0 && this.olstSlotDat.Count <= futureReinstatecount && oTagDrugHeaderDetail.LastOmittedSlotDTTM <= CommonBB.GetServerDateTime())) {
        this.SelectedReinstateRow.DrugItem.OmitLabel = String.Empty;
        this.SelectedReinstateRow.DrugItem.OmitIcon = null;
        oTagDrugHeaderDetail.OmitComments = String.Empty;
    }
    if (oReinstateVM.IsChkReinstateAll) {
        oTagDrugHeaderDetail.IsIndefiniteOmit = false;
    }
    let oTagObj: TagObject = new TagObject();
    let oEmptyTagObj: TagObject = new TagObject();
    oTagObj.oChartCell = this.SelectedReinstateRow.ChartCells.FirstOrDefault();
    if(this.SelectedReinstateRow.DrugItem.OmitIcon == null)
        this.medChartOverview.RowRefreshCellReInstateUpdate = true;
    this.medChartOverview.RefreshRow(this.SelectedReinstateRow, oEmptyTagObj);
    this.medChartOverview.RefreshRow(this.SelectedReinstateRow, oTagObj);
}
}
    omedsadminReinstateslots_Closed(args: AppDialogEventargs): void {
        if (args != null && args.Content != null) {
            this.omedsadminReinstateslots = args.Content.Component;
        this.IsOmitReinstateReviewClicked = false;
        let sResult:string = String.Empty;
        this.AppDialogWindow = args.AppChildWindow;
        this.isClearPreviousSelection = true;
        if(args.Result == AppDialogResult.Ok) {
            // ObjectHelper.stopFinishAndCancelEvent(false);
            let _lockedUserDetails: LockedUsersDetails;
            if (!MedicationCommonBB.IsLockStillValid(MedChartData.MedChartOID, "MAReinstate", (o) => {_lockedUserDetails = o})) {
                let oMsgBox: iMessageBox = new iMessageBox();
                oMsgBox.MessageBoxClose  = (s,e) => { this.oMsgBox_ReInstateClose(s,e); } ;
                oMsgBox.Title = "Information - Lorenzo";
                oMsgBox.Height = 160;
                oMsgBox.MessageButton = MessageBoxButton.OK;//LORENZO.BlueBird.Controls.
                oMsgBox.IconType = MessageBoxType.Information;
                if (!String.IsNullOrEmpty(_lockedUserDetails.LockedUserName)) {
                    oMsgBox.Message = String.Format(Resource.MedsAdminPrescChartView.LockMsg_Commenced, _lockedUserDetails.LockedUserName);
                }
                else {
                    oMsgBox.Message = String.Format(Resource.MedsAdminPrescChartView.LockMsg_Abort);
                }
                oMsgBox.Show();
            }
            else {
                if (this.omedsadminReinstateslots.cmdOkClick()) {
                    sResult = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", MedChartData.MedChartOID, "MAReinstate", Common.nLockDuration), String);
                    args.AppChildWindow.DialogResult = true;
                }
            }
        }
 else if(args.Result == AppDialogResult.Cancel) {
                // args.AppChildWindow.DialogResult = false;
                args.AppChildWindow.DialogRef.close();
            sResult = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", MedChartData.MedChartOID, "MAReinstate", Common.nLockDuration), String);
            }
        }
    }
public IsLastSlotExists(oSlotDet:ReinstateVM): void
    {
        let oTempTagDrugHeaderDetail:TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(this.oRefreshTagObject.oDrugItem.Tag, TagDrugHeaderDetail);
        let bAllowSelfAdminReActivate:boolean = true;
        if(oTempTagDrugHeaderDetail != null && oTempTagDrugHeaderDetail.IsPatientSelfAdmin && oTempTagDrugHeaderDetail.EndDate.NotEquals(DateTime.MinValue) && oTempTagDrugHeaderDetail.EndDate < CommonBB.GetServerDateTime()) {
            bAllowSelfAdminReActivate = false;
        }
if((oSlotDet.CACode == MedAction.ReinstateSlot && String.Equals(oSlotDet.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) && bAllowSelfAdminReActivate) && (oSlotDet.PrescriptionItemEndDate.NotEquals(DateTime.MinValue) || oSlotDet.FreqPerodCode == CConstants.OnceOnlyPerodCode))
{
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
        else if (oSlotDet != null && oSlotDet.ReinstateSlotData != null && oSlotDet.ReinstateSlotData.Count > 1) {
            oSlotDet.IsUpdatePIStatusToCompleted = true;
            oSlotDet.IsLastSlotCheckRequired = true;
        }
        else {
            // let Allslts = (from drug in medChartOverview.ChartRows
            // from drugSlots in drug.ChartCells
            // from slot in drugSlots.Slots
            // where String.Compare(drug.Key.Split('-')[1], oRefreshTagObject.oDrugItem.Key) == 0 &&
            //     (slot is AdministratedSlot && !String.Equals(((TagSlotDetail)((AdministratedSlot)slot).Tag).SlotStatus, SlotStatus.OMITTED)
            //         && ((TagSlotDetail)((AdministratedSlot)slot).Tag).SlotDateTime > oSlotDet.ScheduleDTTM)
            // select slot);
            let Allslts = [];
            this.medChartOverview.ChartRows.forEach(drug => {
              drug.ChartCells.forEach(drugSlots => {
                drugSlots.Slots.forEach(slot => {
                  let oDoseOvwSlot = slot as AdministratedSlot;
                  let oTagDoseOvwSlot = oDoseOvwSlot.Tag as TagSlotDetail;

                  if(String.Compare(drug.Key.Split('-')[1], this.oRefreshTagObject.oDrugItem.Key) == 0 &&
                (slot instanceof AdministratedSlot && !String.Equals(oTagDoseOvwSlot.SlotStatus,SlotStatus.OMITTED)
                    && (DateTime.GreaterThan(oTagDoseOvwSlot.SlotDateTime, oSlotDet.ScheduleDTTM)))){
                      Allslts.push(slot);
                    }
                });
             });
              
           });
            //let Allslts = medChartOverview.ChartRowsfromdrugSlotsindrug.ChartCellsfromslotindrugSlots.Slots.Where(drug =>String.Compare(drug.Key.Split('-')[1],oRefreshTagObject.oDrugItem.Key)==0&&(slotisAdministratedSlot&&!String.Equals(((TagSlotDetail)((AdministratedSlot)slot).Tag).SlotStatus,SlotStatus.OMITTED)&&((TagSlotDetail)((AdministratedSlot)slot).Tag).SlotDateTime>oSlotDet.ScheduleDTTM)).Select(drug => slot));
            if (Allslts != null && Allslts.Count() > 0) {
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
private cmdEnterDoseClick(): void
    {
        let sResult:string = String.Empty;
        sResult = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", MedChartData.MedChartOID, "MAEnterTitratedDose", Common.nLockDuration), String);
        let sDefaultTitratedDose:string = String.Empty;
        let lDefaultTitratedDoseUOM:number = 0;
        let lPrescriptionItemOID:number = 0;
        let sItemSubType:string = String.Empty;
        let sMCitemname:string = String.Empty;
        let slorenzoid:string = String.Empty;
        let oHdrAddnlInfo:CDrugHdrAddnlInfo = new CDrugHdrAddnlInfo();
        let oSlotData:SlotData = null;
        let oTitratedDoseVM:TitratedDoseVM = new TitratedDoseVM();
        if(this.medChartOverview.SelectedSlots != null && this.medChartOverview.SelectedSlots.Count > 0)
 {
    let oTagObject: TagObject = this.medChartOverview.SelectedSlots[0];
    let oOverViewSlot: DoseOverviewSlot = ObjectHelper.CreateType<DoseOverviewSlot>(oTagObject.oIChartSlot, DoseOverviewSlot);
    let oTagSlotDetail: TagSlotDetail = ObjectHelper.CreateType<TagSlotDetail>(oOverViewSlot.Tag, TagSlotDetail);
    oSlotData = new SlotData();
    oSlotData.PrescriptionItemScheduleOID = oTagSlotDetail.SlotOID;
    oSlotData.ScheduleDTTM = oTagSlotDetail.SlotDateTime;
    oTitratedDoseVM.SlotDttm = oTagSlotDetail.SlotDateTime.ToString("dd-MMM-yyyy");
    oTitratedDoseVM.SlotTime = oTagSlotDetail.SlotDateTime.ToString("HH:mm");
    oTitratedDoseVM.PrescriptionItemScheduleOID = oTagSlotDetail.SlotOID;
    let oTagDrugHeaderDetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(oTagObject.oDrugItem.Tag, TagDrugHeaderDetail);
    oTitratedDoseVM.IdentifyingOID = oTagDrugHeaderDetail.DrugIdentifyingOID;
    oTitratedDoseVM.IdentifyingType = oTagDrugHeaderDetail.DrugIdentifyingType;
    oTitratedDoseVM.MCVersion = oTagDrugHeaderDetail.MCVersionNo;
    oTitratedDoseVM.RouteOID = oTagDrugHeaderDetail.RouteOID;
    oTitratedDoseVM.RouteOIDs = oTagDrugHeaderDetail.Routeoids;
    oTitratedDoseVM.DosageFormOID = oTagDrugHeaderDetail.DosageFormOID;
    oTitratedDoseVM.ObsDrugname = oTagDrugHeaderDetail.DrugName;
    lPrescriptionItemOID = (!String.IsNullOrEmpty(oTagObject.oDrugItem.Key) && oTagObject.oDrugItem.Key.length > 0) ? Convert.ToInt64(oTagObject.oDrugItem.Key) : 0;
    oTitratedDoseVM.PrescriptionItemOID = lPrescriptionItemOID;
    if ((String.Compare(oTagSlotDetail.Dose, "TBD", StringComparison.InvariantCultureIgnoreCase) == 0) || (String.Compare(oTagSlotDetail.Dose, "0") == 0)) {
        oTitratedDoseVM.SlotDose = sDefaultTitratedDose;
        oTitratedDoseVM.SlotDoseUOM = lDefaultTitratedDoseUOM;
        oTitratedDoseVM.SlotDoseUOMOrphan = oTagDrugHeaderDetail.DoseUOMOID;
        oTitratedDoseVM.SlotDoseUOMNameOrphan = oTagDrugHeaderDetail.DoseUOM;
    }
    else {
        oTitratedDoseVM.SlotDose = oTagSlotDetail.Dose;
        oTitratedDoseVM.SlotDoseUOM = oTagSlotDetail.DoseUOMOID;
        oTitratedDoseVM.SlotDoseUOMName = oTagSlotDetail.DoseUOM;
        oTitratedDoseVM.SlotDoseUOMOrphan = oTagDrugHeaderDetail.DoseUOMOID;
        oTitratedDoseVM.SlotDoseUOMNameOrphan = oTagDrugHeaderDetail.DoseUOM;
    }
}
oTitratedDoseVM.TritdatedSlotData = oSlotData;
oTitratedDoseVM.IsTitratedUpdatedEvent  = (s,e) => { this.oTitratedDoseVM_IsTitratedUpdatedEvent(); } ;
let oEnterTitratedDose: EnterTitratedDose = new EnterTitratedDose();
oEnterTitratedDose.DataContext = oTitratedDoseVM;
let oDrugItem: DrugItem = this.medChartOverview.SelectedSlots[0].oDrugItem;
sItemSubType = (<TagDrugHeaderDetail>(oDrugItem.Tag)).ItemSubType;
sMCitemname = String.Join("^", (<TagDrugHeaderDetail>(oDrugItem.Tag)).MultiComponentItems.ToArray());
slorenzoid = (<TagDrugHeaderDetail>(oDrugItem.Tag)).LorenzoID;
oTitratedDoseVM.SItemsubtype = sItemSubType;
oTitratedDoseVM.smulticompnames = sMCitemname;
oTitratedDoseVM.slorenzoID = slorenzoid;
if (oDrugItem != null && !String.IsNullOrEmpty(oDrugItem.AdminWarningMessage))
    oHdrAddnlInfo.IngredientAdminWarning = oDrugItem.AdminWarningMessage;
oEnterTitratedDose.objDrugHeader.oDrugHeader = new CDrugHeader();
oEnterTitratedDose.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo = new DrugHeaderItem();
oEnterTitratedDose.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowFrequency = true;
oEnterTitratedDose.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowSite = true;
oEnterTitratedDose.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowAsrequired = true;
if (!String.IsNullOrEmpty(this.medChartOverview.SelectedSlots[0].oDrugItem.AdministrationInst)) {
    oEnterTitratedDose.objDrugHeader.lblInstructions.Visibility = Visibility.Visible;
    oEnterTitratedDose.objDrugHeader.lblInstructions.Text = this.medChartOverview.SelectedSlots[0].oDrugItem.AdministrationInst;
}
oEnterTitratedDose.objDrugHeader.DataContext = Common.SetDrugHeaderContent(oDrugItem, oHdrAddnlInfo, oEnterTitratedDose.objDrugHeader);
this.IsOmitReinstateReviewClicked = true;
oEnterTitratedDose.HelpCode = "VW_TITRATEDDOSE";
// ObjectHelper.stopFinishAndCancelEvent(true);
AppActivity.OpenWindow("Enter dose", oEnterTitratedDose, (s)=>{this.oEnterTitratedDose_Closed(s)}, "Enter dose", true, 450, 435, true, WindowButtonType.OkCancel, null);
}
private PresCheckPessimisticLock(sEntityName:string, sReadonlyKeyName:string, sWarningKeyName:string, IsLock:boolean, Msg_Close:any ): void // this param to be revisit Msg_Close:EventHandler<MessageEventArgs>
    {
        IsLock = false;
        this.IsLock = false;
        let sLockingMessage:string = String.Empty;
        let sErrorCode:string = String.Empty;
        let objLockedUsersDet:ScriptObject = ObjectHelper.CreateType<ScriptObject>(HtmlPage.Window.Invoke("GetLockedUsersDetails", PatientContext.PatientOID, PatientContext.EncounterOid, MedChartData.MedChartOID, "0", sEntityName, sReadonlyKeyName, sWarningKeyName), ScriptObject);
        if(objLockedUsersDet.GetProperty("WarningMessage") != null)
 sLockingMessage = objLockedUsersDet.GetProperty("WarningMessage").ToString();
        if(objLockedUsersDet.GetProperty("ErrorCode") != null)
 sErrorCode = objLockedUsersDet.GetProperty("ErrorCode").ToString();
        if(!String.IsNullOrEmpty(sErrorCode))
{
    if (String.Equals(sErrorCode, CConstants.LockErrorcode, StringComparison.InvariantCultureIgnoreCase)) {
        IsLock = true;
        this.IsLock = true;
        this.msg = new iMessageBox();
        this.msg.Title = "Lorenzo";
        this.msg.MessageButton = MessageBoxButton.OK;//LORENZO.BlueBird.Controls.
        this.msg.Message = sLockingMessage;
        this.msg.Show();
    }
    if (String.Equals(sErrorCode, CConstants.WarningErrorcode, StringComparison.InvariantCultureIgnoreCase)) {
        IsLock = true;
        this.IsLock = true;
        this.msg = new iMessageBox();
        this.msg.Title = "Lorenzo";
        this.msg.MessageButton = MessageBoxButton.YesNo; //LORENZO.BlueBird.Controls.
        this.msg.Message = sLockingMessage;
        this.msg.MessageBoxClose = (s,e)=>{ Msg_Close(s,e) };
        this.msg.Show();
    }
}
}
 cmdEnterDose_Click(sender?:Object, e?:RoutedEventArgs): void
    {
        let oTagDrugHeaderDetail:TagDrugHeaderDetail = null;
        if(this.medChartOverview.SelectedSlots.Count > 0)
 {
    let oTagObject: TagObject = this.medChartOverview.SelectedSlots[0];
    if (oTagObject != null && oTagObject.oDrugItem != null && oTagObject.oDrugItem.Tag != null) {
        oTagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(oTagObject.oDrugItem.Tag, TagDrugHeaderDetail);
    }
}
if (oTagDrugHeaderDetail != null && !oTagDrugHeaderDetail.IsAllowedToPerform) {
    let oMsgBox: iMessageBox = new iMessageBox();
    oMsgBox.Title = "Information - Lorenzo";
    oMsgBox.Height = 140;
    oMsgBox.Width = 350;
    oMsgBox.MessageButton = MessageBoxButton.OK; //LORENZO.BlueBird.Controls.
    oMsgBox.IconType = MessageBoxType.Information;
    oMsgBox.Message = Resource.EnterTitratedDose.IsEnterDoseAllowed;
    oMsgBox.Show();
}
else {
    this.IsLock = false;
    this.PresCheckPessimisticLock("MedPrescribeInpatient~MedDiscontinueCancel~MAOmit~MAReinstate~MAEnterTitratedDose~MAReview~MedCVInpatient~MEDAuthInpatient", "", "MedPrescribeDischarge~MedCVDischarge~MedPrescribeLeave~MedCVLeave~MAMedChart", this.IsLock , (s,e) => { this.EnterDoseWarning_MessageBoxClose(s,e); } );
    if (!this.IsLock && !this.IsOmitReinstateReviewClicked) {
        this.cmdEnterDoseClick();
    }
}
}
EnterDoseWarning_MessageBoxClose(sender:Object, e:MessageEventArgs): void
    {
        if(e.MessageBoxResult == MessageBoxResult.Yes) {
            this.cmdEnterDoseClick();
        }
 else {
            this.IsOmitReinstateReviewClicked = false;
        }
    }
oTitratedDoseVM_IsTitratedUpdatedEvent(): void
    {
      //  this.AppDialogWindow.DialogResult = true;
        let oTitratedDoseVM:TitratedDoseVM = ObjectHelper.CreateType<TitratedDoseVM>(this.oEnterTitratedDose.DataContext, TitratedDoseVM);
        if(oTitratedDoseVM != null && oTitratedDoseVM.IsTitratedSuccess && oTitratedDoseVM.TritdatedSlotData != null) {
            if (this.medChartOverview.SelectedSlots.Count > 0) {
                let key = this.medChartOverview.SelectedSlots[0]?.oDrugItem.Key;
                let RowKey = "Row-" + key;
                this.oChartRow = this.medChartOverview.ChartRows.Where(c => c.Key == RowKey).Select(s => s).ToList<ChartRow>().FirstOrDefault();
                let oOverViewSlot: DoseOverviewSlot = <DoseOverviewSlot>this.medChartOverview.SelectedSlots[0].oIChartSlot;
                let sDoseUOM: string = oTitratedDoseVM.DoseUOM == null ? String.Empty : oTitratedDoseVM.DoseUOM.DisplayText;
                let sDoseUOMOID: string = oTitratedDoseVM.DoseUOM == null ? String.Empty : oTitratedDoseVM.DoseUOM.Value;
                this.UpdateEnterTitratedSlotData(oOverViewSlot, oTitratedDoseVM.Dose, sDoseUOM, sDoseUOMOID);
                this.nSlotSelectedCountForEnterDose = this.medChartOverview.SelectedSlots.Count;
                this.EnableDisableLinks();
                if (this.oChartRow != null && this.oChartRow.DrugItem != null && this.oChartRow.DrugItem.Tag != null) {
                    //this.medChartOverview.enterDoseChartRow = this.oChartRow;
                    this.medChartOverview.enterDoseKey = oOverViewSlot.Key;
                    let oTagObj: TagObject = new TagObject();
                    oTagObj.oChartCell = this.oChartRow.ChartCells.FirstOrDefault();
                    let oEmptyTagObj: TagObject = new TagObject();
                     this.medChartOverview.RefreshRow(this.oChartRow, oEmptyTagObj);
                     this.medChartOverview.RefreshRow(this.oChartRow, oTagObj);
                }
            }
        }
    }
oEnterTitratedDose_Closed(args:AppDialogEventargs): void
    {
        this.IsOmitReinstateReviewClicked = false;
        let sResult:string = String.Empty;
        this.oChildWindow = args.AppChildWindow;
        //this.oEnterTitratedDose = ObjectHelper.CreateType<EnterTitratedDose>(args.Content, EnterTitratedDose);
        this.oEnterTitratedDose = args.Content.Component;
        this.isClearPreviousSelection = true;
        if(this.oEnterTitratedDose == null)
 {
    sResult = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", MedChartData.MedChartOID, "MAEnterTitratedDose", Common.nLockDuration), String);
    return
}
if (args.Result == AppDialogResult.Ok && this.oEnterTitratedDose != null) {
    let _lockedUserDetails: LockedUsersDetails;
    if (!MedicationCommonBB.IsLockStillValid(MedChartData.MedChartOID, "MAEnterTitratedDose", (o) => {_lockedUserDetails = o})) {
        let oMsgBox: iMessageBox = new iMessageBox();
        oMsgBox.MessageBoxClose  = (s,e) => { this.oMsgBox_EnterdoseClose(s,e); } ;
        oMsgBox.Title = "Information - Lorenzo";
        oMsgBox.Height = 160;
        oMsgBox.MessageButton = MessageBoxButton.OK;
        oMsgBox.IconType = MessageBoxType.Information;
        if (!String.IsNullOrEmpty(_lockedUserDetails.LockedUserName)) {
            oMsgBox.Message = String.Format(Resource.MedsAdminPrescChartView.LockMsg_Commenced, _lockedUserDetails.LockedUserName);
        }
        else {
            oMsgBox.Message = String.Format(Resource.MedsAdminPrescChartView.LockMsg_Abort);
        }
        oMsgBox.Show();
    }
    else {
        if (this.oEnterTitratedDose.cmdOk_Click()) {
            // ObjectHelper.stopFinishAndCancelEvent(false);
            this.oChildWindow.DialogResult = false;
            this.oChildWindow.DialogRef.close();
            sResult = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", MedChartData.MedChartOID, "MAEnterTitratedDose", Common.nLockDuration), String);
        }
    }
}
else {
    sResult = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", MedChartData.MedChartOID, "MAEnterTitratedDose", Common.nLockDuration), String);
    this.oChildWindow.DialogResult = false;
    // ObjectHelper.stopFinishAndCancelEvent(false);
    this.oChildWindow.DialogRef.close();
}
}
private LaunchPresChartReadOnlyMode(): void
    {
        this.cmdInpatient.Visibility = Visibility.Collapsed;
        this.cmdEnterDose.Visibility = Visibility.Collapsed;
        this.cmdOmit.Visibility = Visibility.Collapsed;
        this.cmdReinstate.Visibility = Visibility.Collapsed;
        this.cmdReview.Visibility = Visibility.Collapsed;
        this.cmdAmend.Visibility = Visibility.Collapsed;
        this.cmdDiscontinueCancel.Visibility = Visibility.Collapsed;
        this.MoreActions.Visibility = Visibility.Collapsed;
    }
cmdClearSelection_Click(sender?:Object, e?:RoutedEventArgs): void
    {
        this.ClearAllSelection();
        this.isClearPreviousSelection = false;
    }
ClearAllSelection(): void
    {
        if(this.medChartOverview != null && this.medChartOverview.SelectedSlots != null && this.medChartOverview.SelectedSlots.Count > 0)
 {
    this.medChartOverview.ClearAllSlotSelection();
}
this.disableClick = false;
this.nSlotSelectedCountForOmit = 0;
this.nSlotSelectedCountForReinstate = 0;
this.nSlotSelectedCountForEnterDose = 0;
this.nInvalidSlotSelectedCount = 0;
this.cmdOmit.IsEnabled = false;
this.cmdReinstate.IsEnabled = false;
this.cmdEnterDose.IsEnabled = false;
this.cmdClearSelection.IsEnabled = false;
this.cmdObservationsResults.IsEnabled = false;
}
IsChartRefreshedRequired: boolean = false;
IsLock: boolean = false;
bIsOpenSecExists: boolean = false;
IsAmendClicked: boolean = false;
IsDischargeClicked: boolean = false;
IsInpatientClicked: boolean = false;
IsCVClicked: boolean = false;
IsDiscontinueCancelClicked: boolean = false;
IsReviewClicked: boolean = false;
public GetMenuCode(): string
{
    let sMenuCode: string = String.Empty;
    if ((String.Equals(PatientContext.EncounterType, CConstants.WardAttendEncValue)) || (String.Equals(PatientContext.EncounterType, CConstants.DaycareEncValue) || String.Compare(PatientContext.EncounterType, CConstants.OutpatientEncValue) == 0 || String.Compare(PatientContext.EncounterType, CConstants.AccAndEmerEncValue) == 0 || String.Compare(PatientContext.EncounterType, CConstants.ContactEncValue) == 0) || (String.Compare(PatientContext.EncounterType, CConstants.OutpatientEncText) == 0 || String.Compare(PatientContext.EncounterType, CConstants.AccAndEmerEncText) == 0 || String.Compare(PatientContext.EncounterType, CConstants.ContactEncText) == 0)) {
        sMenuCode = PrescriptionTypesMenuCode.ForAdministration;
    }
    else if ((String.Compare(PatientContext.EncounterType, CConstants.InpatientEncValue) == 0) || (String.Compare(PatientContext.EncounterType, CConstants.InaptientEncText) == 0)) {
        sMenuCode = PrescriptionTypesMenuCode.Inpatient;
    }
    return sMenuCode;
}
RefreshChart(IPlock:boolean = false): void
    {
        this.medChartOverview.ChartRows = null;
        this.medChartOverview.NoRecordsDisplayText = "Loading";
        MedChartData.PatinetInfo = Common.GetPatientInfo();
        let dtServerDate:DateTime = CommonBB.GetServerDateTime();
        if(this.oOverViewChartData != null && this.oOverViewChartData.MedChartOID == 0)
 {
    if (this.objMedsAdminCommonData == null) {
        this.objMedsAdminCommonData = new MedsAdminCommonData();
    }
    this.objMedsAdminCommonData.GetMedChartOID((IPlock != null && IPlock.HasValue && IPlock.Value) ? true : false);
    //this.objMedsAdminCommonData.MedsAdminCommonDataCompleted -= this.objMedsAdminCommonData_MedsAdminCommonDataCompleted;
    this.objMedsAdminCommonData.MedsAdminCommonDataCompleted  = (s,e) => { this.objMedsAdminCommonData_MedsAdminCommonDataCompleted(); } ;
}
 else {
    this.FillMedChartBasicData(dtServerDate);
    this.GetChartData(String.Empty, dtServerDate);
}
}
private objMedsAdminCommonData_MedsAdminCommonDataCompleted(): void
    {
        let dtServerDate:DateTime = CommonBB.GetServerDateTime();
        this.SetOverViewDateRange(dtServerDate);
        this.FillMedChartBasicData(dtServerDate);
        this.GetChartData(String.Empty, dtServerDate);
    }
CheckLock(): void
    {
        let sKeyCodeValues:string = String.Empty;
        let sMenuCode:string = String.Empty;
        if(this.IsInpatientClicked || this.IsAmendClicked || this.IsDiscontinueCancelClicked)
 {
    sMenuCode = PrescriptionTypesMenuCode.Inpatient;
}
 else if (this.IsCVClicked) {
    sMenuCode = PrescriptionTypesMenuCode.ClicallyVerifyMenuCode;
}
else if (this.IsReviewClicked) {
    sMenuCode = PrescriptionTypesMenuCode.Review;
}
else if (this.IsDischargeClicked) {
    sMenuCode = PrescriptionTypesMenuCode.Discharge;
}
let _LockedUsersDetails: LockedUsersDetails;
//this.IsLock = MedicationCommonBB.IsLockedByAnotherUser(sMenuCode, true, _LockedUsersDetails);
this.IsLock = MedicationCommonBB.IsLockedByAnotherUser(sMenuCode, true, (o) => { _LockedUsersDetails = o; });
if (_LockedUsersDetails != null && !String.IsNullOrEmpty(_LockedUsersDetails.WarningMessage)) {
    if (!String.IsNullOrEmpty(_LockedUsersDetails.ErrorCode) && String.Equals(_LockedUsersDetails.ErrorCode, CConstants.LockErrorcode, StringComparison.InvariantCultureIgnoreCase)) {
        this.msg = new iMessageBox();
        this.msg.Title = "Lorenzo";
        this.msg.MessageButton = MessageBoxButton.OK; //LORENZO.BlueBird.Controls.
        this.msg.MessageBoxClose  = (s,e) => { this.MedChartlockWarning_MessageBoxClose(s,e); } ;
        this.msg.Message = _LockedUsersDetails.WarningMessage;
        this.msg.Show();
    }
    else if (!String.IsNullOrEmpty(_LockedUsersDetails.ErrorCode) && String.Equals(_LockedUsersDetails.ErrorCode, CConstants.ReadOnlyErrorcode, StringComparison.InvariantCultureIgnoreCase)) {

    }
    else if (!String.IsNullOrEmpty(_LockedUsersDetails.ErrorCode) && String.Equals(_LockedUsersDetails.ErrorCode, CConstants.WarningErrorcode, StringComparison.InvariantCultureIgnoreCase)) {
        this.msg = new iMessageBox();
        this.msg.Title = "Lorenzo";
        this.msg.MessageButton = MessageBoxButton.YesNo; //LORENZO.BlueBird.Controls.
        this.msg.MessageBoxClose  = (s,e) => { this.MedChartWarning_MessageBoxClose(s,e); } ;
        this.msg.Message = _LockedUsersDetails.WarningMessage;
        this.msg.Show();
    }
}
else {
    if (this.IsDischargeClicked || this.IsCVClicked) {
        this.OnCAlaunch(sMenuCode);
    }
    else if (this.IsInpatientClicked) {
        this.OnCAlaunch(this.GetMenuCode());
    }
    else {
        this.CheckOpenSectionExists();
    }
}
}
MedChartlockWarning_MessageBoxClose(sender:Object, e:MessageEventArgs): void
    {
        HtmlPage.Window.Invoke("DeactivatePessimisticLock", PatientContext.EncounterOid, "MedPrescribeClerking", Common.nLockDuration);
        this.IsDiscontinueCancelLinkClicked = false;
    }
MedChartWarning_MessageBoxClose(sender:Object, e:MessageEventArgs): void
    {
        if(e.MessageBoxResult == MessageBoxResult.Yes) { //LORENZO.BlueBird.Controls.
            if (this.IsDischargeClicked) {
                this.OnCAlaunch(PrescriptionTypesMenuCode.Discharge);
            }
            else if (this.IsCVClicked) {
                this.OnCAlaunch(PrescriptionTypesMenuCode.ClicallyVerifyMenuCode);
            }
            else if (this.IsInpatientClicked) {
                this.OnCAlaunch(this.GetMenuCode());
            }
            else {
                this.CheckOpenSectionExists();
            }
        }
 else {
            HtmlPage.Window.Invoke("DeactivatePessimisticLock", PatientContext.EncounterOid, "MedPrescribeClerking", Common.nLockDuration);
            this.IsDiscontinueCancelLinkClicked = false;
        }
    }
cmdObservationsResults_Click(sender?:Object, e?:RoutedEventArgs): void
    {
        let objtagHD:TagDrugHeaderDetail ;
        let items = this.medChartOverview.GetSelectedRows();
        if(this.medChartOverview.GetSelectedRows().Count == 1)
 {
    this.medChartOverview.GetSelectedRows().forEach( (obj)=> {
        if (obj != null && obj.DrugItem != null && obj.DrugItem.Tag != null && obj.DrugItem.Tag instanceof TagDrugHeaderDetail) {
            objtagHD = ObjectHelper.CreateType<TagDrugHeaderDetail>(obj.DrugItem.Tag, TagDrugHeaderDetail);
            if (objtagHD != null) {
                let bResult: boolean = Common.LaunchObservation(objtagHD.PrescriptionItemOID,
                    objtagHD.DrugIdentifyingType,
                    objtagHD.DrugIdentifyingOID,
                    objtagHD.MCVersionNo, objtagHD.DrugName, objtagHD.ItemSubType, objtagHD.MultiComponentItems.ToString(), objtagHD.LorenzoID);
            }
        }
    });
}
}
async CheckOpenSectionExists(): Promise<void>
    {
        let sSecMessage:string = String.Empty;

        
        Common.CheckOpenSectionExists((o1) => { this.bIsOpenSecExists = o1; }, (o2) => { sSecMessage = o2; });
       //Common.CheckOpenSectionExists(this.bIsOpenSecExists, sSecMessage);
        if(this.bIsOpenSecExists)
 {
    //sSecMessage = String.Format(Resource.MedsAdminChartToolTip.IsOpenSectionToolTip, this.bIsOpenSecExists);
    sSecMessage = Resource.MedsAdminChartToolTip.IsOpenSectionToolTip; // To be revisit
    this.msg = new iMessageBox();
    this.msg.Title = "Lorenzo";
    this.msg.MessageButton = MessageBoxButton.OK;
    this.msg.MessageBoxClose  = (s,e) => { this.MedPrescribeOpenSec_MessageBoxClose(s,e); } ;
    this.msg.Message = sSecMessage;
    this.msg.Show();
}
 else {
    this.bIsOpenSecExists = false;
    this.cmdPrescribeClick();
}
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
    }else{
        if (this.IsDiscontinueCancelClicked)
            this.CheckInfInprogressReachStartDTTM();
        else{
            this.LanchWizard();
        } 
    }
}

async ClinicalEncounterAlert_MessageBoxClose(sender: Object, e: MessageEventArgs) {
    await this.LanchWizard();
}

async MedPrescribeOpenSec_MessageBoxClose(sender:Object, e:MessageEventArgs)
    {
        if(this.IsDiscontinueCancelClicked)
        this.CheckInfInprogressReachStartDTTM();
        else await this.LanchWizard();
    }
    sMenuCode:string;
    result_sp;
async LanchWizard()
    {
        let bIscancel:boolean = false;
        let sMenuCode:string = String.Empty;
        let sprompt:any = "CAlaunch";
        let sKeyCodeName:string = String.Empty;
        let nKeyCodeOID:number = 0;
        if(this.IsInpatientClicked)
 {
    this.IsChartRefreshedRequired = true;
    sKeyCodeName = "MedPrescribeInpatient";
    nKeyCodeOID = (MedChartData.MedChartOID > 0) ? MedChartData.MedChartOID : PatientContext.EncounterOid;
}
 else if (this.IsDischargeClicked) {
    this.IsChartRefreshedRequired = false;
    sMenuCode = PrescriptionTypesMenuCode.Discharge;
    sKeyCodeName = "MedPrescribeDischarge";
    nKeyCodeOID = PatientContext.EncounterOid;
}
else if (this.IsAmendClicked) {
    this.IsChartRefreshedRequired = true;
    sKeyCodeName = "MedPrescribeInpatient";
    nKeyCodeOID = MedChartData.MedChartOID;
}
else if (this.IsCVClicked) {
    this.IsChartRefreshedRequired = true;
    sKeyCodeName = "MedCVInpatient";
    nKeyCodeOID = MedChartData.MedChartOID;
    sMenuCode = PrescriptionTypesMenuCode.ClicallyVerify;
}
else if (this.IsReviewClicked) {
    this.IsChartRefreshedRequired = true;
    sKeyCodeName = "MedReviewInpatient";
    nKeyCodeOID = MedChartData.MedChartOID;
    sMenuCode = PrescriptionTypesMenuCode.Review;
}
if (!bIscancel && PatientContext.EncounterOid > 0 && !String.IsNullOrEmpty(PatientContext.EncounterType)) {
    let oParam: string[] = new Array(3);
    if (String.IsNullOrEmpty(sMenuCode)) {
        sMenuCode = this.GetMenuCode();
    }
    let sQuery: string = String.Empty;
    if (this.IsAmendClicked && !String.IsNullOrEmpty(this.sEcounterType)) {
        if (String.Compare(this.sEcounterType, CConstants.InpatientEncValue) == 0) {
            sMenuCode = PrescriptionTypesMenuCode.Inpatient;
        }
        else {
            sMenuCode = PrescriptionTypesMenuCode.ForAdministration;
        }
    }
    let IsAllergyCAlaunched: boolean = false;
    if (this.IsInpatientClicked) {
        let EncounterOid: string = PatientContext.EncounterOid.ToString();
        let EncounterType: string = PatientContext.EncounterType;
        let CONFALRGY: string = "MN_HI_CONFALRGY";
        let Allergylaunch: ScriptObject = null;  
        let result_sp = null; 
        result_sp = ObjectHelper.CreateType<ScriptObject>(await HtmlPage.Window.InvokeAsync("LaunchAllergyCheckedforChartMedication", sMenuCode, EncounterType, PatientContext.EncounterOid > 0 ? true : false, EncounterOid), ScriptObject);     
       // this.result_sp = await ObjectHelper.CreateType<ScriptObject>(HtmlPage.Window.InvokeAsync("LaunchAllergyCheckedforChartMedication", sMenuCode, EncounterType, PatientContext.EncounterOid > 0 ? true : false, EncounterOid), ScriptObject);
        this.sMenuCode = sMenuCode;
        if(result_sp.returnData){ 
        let result =  {Response:result_sp.GetProperty("result").Response};
        let oReturn_sp = result_sp.GetProperty("oReturn");
        if (result.Response != null && result.Response.AllergyPromptRequired != null && result.Response.AllergyPromptRequired != "" && result.Response.AllergyPromptRequired == "True") {
                IsAllergyCAlaunched = true;
                let callbackResult = (sender: Object, e: MessageEventArgs) => {
                    if (e.MessageBoxResult == MessageBoxResult.Cancel) {
                        return;
                    }
                    if (e.MessageBoxResult == MessageBoxResult.OK) {
                        let oReturn = [];
                        oReturn["LaunchCA"] = "MN_HI_CONFALRGY";
                        let returnScriptObject: ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = oReturn;
                        this.GetAllergylaunch(returnScriptObject);
                    }
                };
                let msg: iMessageBox = new iMessageBox();
                msg.Title = 'Information - LORENZO';        
                msg.Message = 'Please review medication related allergies/ADRs and update if necessary before proceeding.';
                msg.Width = 410,        
                msg.Height = 160,        
                msg.MessageButton = MessageBoxButton.OKCancel;        
                msg.IconType = MessageBoxType.Information;
                msg.MessageBoxClose  = callbackResult;//(s,e) => { this.messageBoxClose(s,e); } ;
                msg.Show();         
        }
        else {
            let oReturn = [];
            oReturn["LaunchCA"] = oReturn_sp['LaunchCA'];
            let returnScriptObject:ScriptObject = new ScriptObject();
            returnScriptObject.returnData = oReturn;  
                let GetAllergyRes = await this.GetAllergylaunch(returnScriptObject);
                if (!String.IsNullOrEmpty(GetAllergyRes)) {
                sprompt = GetAllergyRes;
                }
        }        
    }
        else {
            let oReturn = [];
            //IsAllergyCAlaunched = true;
            oReturn["LaunchCA"] = this.sMenuCode;//oReturn_sp['LaunchCA'];
            let returnScriptObject:ScriptObject = new ScriptObject();
            returnScriptObject.returnData = oReturn;  
            let GetAllergyRes = await this.GetAllergylaunch(returnScriptObject);
            if (String.IsNullOrEmpty(GetAllergyRes)) {
                IsAllergyCAlaunched = true;
            }
        }        
    }
    else if (!this.IsAmendClicked && ((String.Equals(PatientContext.EncounterType, CConstants.InpatientEncValue)) || (String.Equals(PatientContext.EncounterType, CConstants.InaptientEncText)))) {
        sprompt = await this.ClerkSourceAfterAllergyCheck(sMenuCode);
    }
    if (!IsAllergyCAlaunched) {  
        if (String.Compare(sprompt.toString(), "CNFRECCLRK", StringComparison.OrdinalIgnoreCase) == 0) {
            if (this.IsDischargeClicked) {
                Common.GPCConsentVerifyStatus = String.Empty;
            }
            this.OnCAlaunch(PrescriptionTypesMenuCode.sclerking);
            Common.IsCanLaunchIPFromClerkPrompt = true;
        }
        else if (!String.IsNullOrEmpty(sprompt)) {
            if (this.IsInpatientClicked || this.IsDischargeClicked || this.IsCVClicked) {
                this.CheckLock();
            }
            else {
                this.OnCAlaunch(sMenuCode);
            }
        }
        else {
            let _sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", PatientContext.EncounterOid, "MedPrescribeClerking", Common.nLockDuration), String);
        }
    }
}
}
 
private async GetAllergylaunch(resData){
    let Allergylaunch = ObjectHelper.CreateType<ScriptObject>(resData,ScriptObject);
    let CONFALRGY: string = "MN_HI_CONFALRGY";
    if (Allergylaunch != null && Allergylaunch.GetProperty("LaunchCA") != null && !String.IsNullOrEmpty(Allergylaunch.GetProperty("LaunchCA").ToString()))
         {
           let sprompt = Allergylaunch.GetProperty("LaunchCA").ToString();
            if (sprompt == CONFALRGY) {
                //IsAllergyCAlaunched = true;
                this.OnCAlaunch(PrescriptionTypesMenuCode.AllergyChecked);
            }
            else if (sprompt == this.sMenuCode) {
                if ((String.Compare(PatientContext.EncounterType, CConstants.InpatientEncValue) == 0) || (String.Compare(PatientContext.EncounterType, CConstants.InaptientEncText) == 0)) {
                    if (!this.IsAmendClicked) {
                        sprompt = await this.ClerkSourceAfterAllergyCheck(this.sMenuCode);
                    }
                }
                if (String.IsNullOrEmpty(sprompt)) {
                    HtmlPage.Window.Invoke("DeactivatePessimisticLock", PatientContext.EncounterOid, "MedPrescribeClerking", Common.nLockDuration);
                    return
                }else{
                    return sprompt;
                }
            }
        }        
        else {
            return
        }
}
messageBoxClose(sender:object, e: MessageEventArgs) {
    //console.log("messageEventArgs callback ", e, e.MessageBoxResult);
    if (e.MessageBoxResult == MessageBoxResult.No) {
        return;
    }
    if (e.MessageBoxResult == MessageBoxResult.Yes) {
        let oReturn = [];
        oReturn["LaunchCA"] = "MN_HI_CONFALRGY";
        let returnScriptObject:ScriptObject = new ScriptObject();
        returnScriptObject.returnData = oReturn;
        this.GetAllergylaunch(returnScriptObject);
    }
}

async ClerkSourceAfterAllergyCheck(sMenuCode:string):Promise<string>
{
    let sLockingMessage: string = String.Empty;
    let sprompt: string = "CAlaunch";
    let clerkcheck: string = String.Empty;
    clerkcheck = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("GetMedclerkPromptValue", sMenuCode, PatientContext.PatientOID, PatientContext.EncounterOid, "EPR", ""), String);
    if (!String.IsNullOrEmpty(clerkcheck) && String.Equals(clerkcheck, "true")) {
        let _LockedUsersDetails: LockedUsersDetails;
        //let IsLocked: boolean = MedicationCommonBB.IsLockedByAnotherUser(PrescriptionTypesMenuCode.Clerking, true, _LockedUsersDetails);
        let IsLocked: boolean = MedicationCommonBB.IsLockedByAnotherUser(PrescriptionTypesMenuCode.Clerking, true, (o) => { _LockedUsersDetails = o; });
        if (_LockedUsersDetails != null && !String.IsNullOrEmpty(_LockedUsersDetails.WarningMessage)) {
            if (!String.IsNullOrEmpty(_LockedUsersDetails.ErrorCode) && String.Equals(_LockedUsersDetails.ErrorCode, CConstants.LockErrorcode, StringComparison.InvariantCultureIgnoreCase)) {
                this.msg = new iMessageBox();
                this.msg.Title = "Lorenzo";
                this.msg.MessageButton = MessageBoxButton.OK; //LORENZO.BlueBird.Controls.
                this.msg.Message = _LockedUsersDetails.WarningMessage;
                this.msg.Show();
                return String.Empty;
            }
            else if (!String.IsNullOrEmpty(_LockedUsersDetails.ErrorCode) && String.Equals(_LockedUsersDetails.ErrorCode, CConstants.ReadOnlyErrorcode, StringComparison.InvariantCultureIgnoreCase)) {

            }
            else if (!String.IsNullOrEmpty(_LockedUsersDetails.ErrorCode) && String.Equals(_LockedUsersDetails.ErrorCode, CConstants.WarningErrorcode, StringComparison.InvariantCultureIgnoreCase)) {

            }
        }
        else {
            let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", PatientContext.EncounterOid, "MedPrescribeClerking", Common.nLockDuration), String);
            sprompt = ObjectHelper.CreateType<string>(await HtmlPage.Window.InvokeAsync("LaunchClerkPrmptFromChartMedication", sMenuCode, PatientContext.EncounterType, PatientContext.PatientOID, PatientContext.EncounterOid), String);
        }
    }
    return sprompt;
}
msg_Closed(sender:Object, e:EventArgs): void
    {
        let oiMessageBox:iMessageBox = ObjectHelper.CreateType<iMessageBox>(sender, iMessageBox);
        if(oiMessageBox != null && oiMessageBox.Tag != null) {
            let sMenuCode: string = oiMessageBox.Tag.ToString();
            if (!String.IsNullOrEmpty(sMenuCode)) {
                this.OnCAlaunch(sMenuCode);
            }
        }
    }
public async OnChildWizardClose(args:ChildWizardCloseEventargs): Promise<void>
    {
        this.oPrescriptionChartVM=  ObjectHelper.CreateType<PrescriptionChartVM>(this.DataContext, PrescriptionChartVM);
            console.log(this.oPrescriptionChartVM);
        this.oPrescriptionChartVM.sWizardData = args.ContextData;
        let sResult:string = String.Empty;
        this.SupplyComments = String.Empty;
        this.SupplyInstructions = String.Empty;
        let IsAllergyChecked:boolean = false;
        let eWizardAction:LzoWizardAction = CommonBB.GetWizardAction(args.ContextData);
        let _tmpRecAllergy:string = CommonBB.GetValueFromWizardContext(args.ContextData, "RecAllergy");
        if(!String.IsNullOrEmpty(_tmpRecAllergy))
{
  //commonMedChartData.IsAllergyRecorded = String.Equals(_tmpRecAllergy, "True", StringComparison.InvariantCultureIgnoreCase);
}
if (!String.IsNullOrEmpty(this.oPrescriptionChartVM.sLastCACode) && (String.Compare(this.oPrescriptionChartVM.sLastCACode, PrescriptionTypesMenuCode.Inpatient) == 0 || String.Compare(this.oPrescriptionChartVM.sLastCACode, PrescriptionTypesMenuCode.ForAdministration) == 0 || String.Compare(this.oPrescriptionChartVM.sLastCACode, PrescriptionTypesMenuCode.Discharge) == 0 || String.Compare(this.oPrescriptionChartVM.sLastCACode, PrescriptionTypesMenuCode.TechValidate) == 0 || String.Compare(this.oPrescriptionChartVM.sLastCACode, PrescriptionTypesMenuCode.ClicallyVerify) == 0 || String.Compare(this.oPrescriptionChartVM.sLastCACode, PrescriptionTypesMenuCode.AllergyChecked) == 0) && !String.IsNullOrEmpty(args.ContextData)) {
    let nDeactivateOID: number = 0;
    let sDeactivateKey: string = String.Empty;
    if (String.Equals(this.oPrescriptionChartVM.sLastCACode, PrescriptionTypesMenuCode.Discharge)) {
        nDeactivateOID = PatientContext.EncounterOid;
        sDeactivateKey = "MedPrescribeDischarge";
    }
    else if (String.Equals(this.oPrescriptionChartVM.sLastCACode, PrescriptionTypesMenuCode.TechValidate)) {
        nDeactivateOID = PatientContext.EncounterOid;
        sDeactivateKey = "MedTVInpatient";
    }
    else if (String.Equals(this.oPrescriptionChartVM.sLastCACode, PrescriptionTypesMenuCode.ClicallyVerify)) {
        nDeactivateOID = MedChartData.MedChartOID;
        sDeactivateKey = "MedCVInpatient";
    }
    else {
        nDeactivateOID = (MedChartData.MedChartOID > 0) ? MedChartData.MedChartOID : PatientContext.EncounterOid;
        sDeactivateKey = "MedPrescribeInpatient";
    }
    if (!String.IsNullOrEmpty(this.oPrescriptionChartVM.sLastCACode) && (String.Equals(this.oPrescriptionChartVM.sLastCACode, PrescriptionTypesMenuCode.AllergyChecked, StringComparison.CurrentCultureIgnoreCase))) {
        IsAllergyChecked = true;
    }
    if ((eWizardAction == LzoWizardAction.Finish || eWizardAction == LzoWizardAction.FinishNow) && !IsAllergyChecked) {
        this.cmdClearSelection.IsEnabled = false;
        sResult = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", nDeactivateOID, sDeactivateKey, Common.nLockDuration), String);
        if (this.oPrescriptionChartVM != null && this.oPrescriptionChartVM.sWizardData != null) {
            let _tempCanlaunchClerkChk: string = CommonBB.GetValueFromWizardContext(this.oPrescriptionChartVM.sWizardData, "CanLaunchClerkingPrescription");
            this.IsCanLaunchClerk = (!String.IsNullOrEmpty(_tempCanlaunchClerkChk) && String.Equals(_tempCanlaunchClerkChk, "true", StringComparison.InvariantCultureIgnoreCase)) ? true : false;
        }
        if (this.IsCanLaunchClerk && !Common.IsLockedByAnyUser() && (String.Equals(this.oPrescriptionChartVM.sLastCACode, PrescriptionTypesMenuCode.Inpatient, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.oPrescriptionChartVM.sLastCACode, PrescriptionTypesMenuCode.ClicallyVerify, StringComparison.InvariantCultureIgnoreCase))) {
            sResult = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", PatientContext.EncounterOid, "MedPrescribeClerking", Common.nLockDuration), String);
            if (!String.Equals(sResult, "false", StringComparison.InvariantCultureIgnoreCase)) {
                this.OnCAlaunch(PrescriptionTypesMenuCode.Clerking);
            }
        }
        if (this.IsDischargeClicked) {
            this.DisplayDischargeSummaryMessage();
        }
        else if (this.IsChartRefreshedRequired) {
            this.RefreshChart(true);
        }
    }
    else if (eWizardAction == LzoWizardAction.Cancel) {
        if (this.medChartOverview.SelectedSlots.Count > 0) {
            this.medChartOverview.ClearAllSlotSelection();
        }
        this.cmdClearSelection.IsEnabled = false;
        sResult = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", nDeactivateOID, sDeactivateKey, Common.nLockDuration), String);
        let _IsPatientHTWTUpdated: string = CommonBB.GetValueFromWizardContext(this.oPrescriptionChartVM.sWizardData, "IsPatientHTWTUpdated");
        if (!String.IsNullOrEmpty(_IsPatientHTWTUpdated) && _IsPatientHTWTUpdated.Equals("1")) {
            MedChartData.PatinetInfo = Common.GetPatientInfo();
            this.RefreshDCAlertIcon();
        }
    }
    if (!String.IsNullOrEmpty(this.oPrescriptionChartVM.sLastCACode) && (String.Equals(this.oPrescriptionChartVM.sLastCACode, PrescriptionTypesMenuCode.AllergyChecked, StringComparison.CurrentCultureIgnoreCase))) {
        let SetAppsession: ScriptObject = null;
        let sprompt: any = "CAlaunch";
        let sMenuCode: string = String.Empty;
        if (eWizardAction == LzoWizardAction.Finish || eWizardAction == LzoWizardAction.FinishNow) {
            if (this.oPrescriptionChartVM.WizardContext != null) {
                this.oPrescriptionChartVM.WizardContext["IsAllergyPrompted"] = "True";
                this.oPrescriptionChartVM.WizardContext["IsLaunched"] = "true";
            }
            this.oPrescriptionChartVM.RenderBanner(this.oPrescriptionChartVM.objTaskInfo);
            SetAppsession = ObjectHelper.CreateType<ScriptObject>(HtmlPage.Window.Invoke("SetAppsession", "True", PatientContext.EncounterOid, PatientContext.PatientOID), ScriptObject);
            if (!String.IsNullOrEmpty(this.oPrescriptionChartVM.sLastCACode)) {
                if (String.Compare(PatientContext.EncounterType, CConstants.InpatientEncValue) == 0) {
                    sMenuCode = PrescriptionTypesMenuCode.Inpatient;
                }
                else {
                    sMenuCode = PrescriptionTypesMenuCode.ForAdministration;
                }
                if ((String.Compare(PatientContext.EncounterType, CConstants.InpatientEncValue) == 0) || (String.Compare(PatientContext.EncounterType, CConstants.InaptientEncText) == 0)) {
                    sprompt = await this.ClerkSourceAfterAllergyCheck(sMenuCode);
                }
                if (String.IsNullOrEmpty(sprompt)) {
                    HtmlPage.Window.Invoke("DeactivatePessimisticLock", PatientContext.EncounterOid, "MedPrescribeClerking", Common.nLockDuration);
                    return
                }
            }
            if (String.Compare(sprompt, "CNFRECCLRK", StringComparison.OrdinalIgnoreCase) == 0) {
                this.OnCAlaunch(PrescriptionTypesMenuCode.sclerking);
                Common.IsCanLaunchIPFromClerkPrompt = true;
            }
            else if (!String.IsNullOrEmpty(sprompt)) {
                this.CheckLock();
            }
            else {
                let _sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", PatientContext.EncounterOid, "MedPrescribeClerking", Common.nLockDuration), String);
            }
        }
    }
}
else if (!String.IsNullOrEmpty(this.oPrescriptionChartVM.sLastCACode) && (String.Compare(this.oPrescriptionChartVM.sLastCACode, PrescriptionTypesMenuCode.sclerking, StringComparison.OrdinalIgnoreCase) == 0) && !String.IsNullOrEmpty(this.oPrescriptionChartVM.sWizardData)) {
    let _IsCanlaunchInPatientChk: string = CommonBB.GetValueFromWizardContext(this.oPrescriptionChartVM.sWizardData, "CanLaunchForadminPrescription");
    let _CanShownDIConPrmptInGPCTAB: string = CommonBB.GetValueFromWizardContext(this.oPrescriptionChartVM.sWizardData, "CanShownDIConPrmptInGPCTAB");
    if (String.Equals(_CanShownDIConPrmptInGPCTAB, "true", StringComparison.InvariantCultureIgnoreCase)) {
        Common.GPCConsentVerifyStatus = "1";
    }
    else {
        Common.GPCConsentVerifyStatus = "0";
    }
    if ((eWizardAction == LzoWizardAction.Finish || eWizardAction == LzoWizardAction.FinishNow) && (Common.IsCanLaunchIPFromClerkPrompt || (!String.IsNullOrEmpty(_IsCanlaunchInPatientChk) && String.Equals(_IsCanlaunchInPatientChk, "true", StringComparison.InvariantCultureIgnoreCase)))) {
        this.OninpatDisCAlaunch();
    }
    else {
        HtmlPage.Window.Invoke("DeactivatePessimisticLock", PatientContext.EncounterOid, "MedPrescribeClerking", Common.nLockDuration);
    }
    Common.IsCanLaunchIPFromClerkPrompt = false;
}
else if (!String.IsNullOrEmpty(this.oPrescriptionChartVM.sLastCACode) && (String.Compare(this.oPrescriptionChartVM.sLastCACode, CConstants.SupplyInstr_Menucode, StringComparison.OrdinalIgnoreCase) == 0) && !String.IsNullOrEmpty(this.oPrescriptionChartVM.sWizardData)) {
    if ((eWizardAction == LzoWizardAction.Finish || eWizardAction == LzoWizardAction.FinishNow) && this.IsChartRefreshedRequired) {
        this.RefreshChart();
    }
}
this.oPrescriptionChartVM.SetHeightweightPopUp();
}
private OninpatDisCAlaunch(): void
    {
        let sMenuCode:string = String.Empty;
        if(this.IsDischargeClicked)
 {
    sMenuCode = PrescriptionTypesMenuCode.Discharge;
}
 else if (this.IsCVClicked) {
    sMenuCode = PrescriptionTypesMenuCode.ClicallyVerify;
}
else {
    sMenuCode = this.GetMenuCode();
}
this.CheckLock();
}
private async OnCAlaunch(sMenuCode:string):Promise<void>
    {
        let sQuery:string = "&MENUCODE=" + sMenuCode;
        let MedclerkPrompt:string = "YES";
        let clerkingsource:string = String.Empty;
        let sSelectedPrescriptionOIDs:string = String.Empty;
        if(this.IsAmendClicked && this.medChartOverview != null && this.medChartOverview.GetSelectedRows() != null && this.medChartOverview.GetSelectedRows().Count > 0 && this.medChartOverview.GetSelectedRows()[0] != null && this.medChartOverview.GetSelectedRows()[0].DrugItem != null && !String.IsNullOrEmpty(this.medChartOverview.GetSelectedRows()[0].DrugItem.Key))
 {
    sSelectedPrescriptionOIDs = this.medChartOverview.GetSelectedRows()[0].DrugItem.Key;
}
if (String.Equals(sMenuCode, PrescriptionTypesMenuCode.ClicallyVerify)) {
    let CACode: string = "MN_PRESCCHART_P2";
    sQuery += "&PATIENTOID=" + PatientContext.PatientOID;
    sQuery += "&CrctPatientOID=" + PatientContext.PatientOID;
    if (PatientContext.EncounterOid > 0) {
        sQuery += "&EncounterOID=" + PatientContext.EncounterOid;
        sQuery += "&ENCID=" + PatientContext.EncounterOid;
    }
    else {
        sQuery += "&EncounterOID=" + ChartContext.EncounterOID;
        sQuery += "&ENCID=" + ChartContext.EncounterOID;
    }
    sQuery += "&PrescType=" + PrescriptionTypes.ForAdministration;
    sQuery += "&PRESCRIPTIONOID=" + "";
    sQuery += "&LaunchFrom=" + CACode;
    sQuery += "&CallingFrom=" + CACode;
    sQuery += "&ENCTYPE=" + PatientContext.EncounterType;
    sQuery += "&IsSupplyReq=" + "1";
    sQuery += "&IsLaunchFromChart=True";
    sQuery += "&IsLaunchFromPresChart=True";
}
else {
    sQuery = "&MENUCODE=" + sMenuCode;
    sQuery += "&ENCID=" + (this.IsAmendClicked ? this.sEcounterOID : PatientContext.EncounterOid.ToString());
    sQuery += "&ENCTYPE=" + (this.IsAmendClicked ? this.sEcounterType : PatientContext.EncounterType);
    sQuery += "&IsAllergyPrompted=True";
    sQuery += "&IsDischargeClicked=" + this.IsDischargeClicked;
    sQuery += "&IsLaunchFromChart=True";
    sQuery += "&IsLaunchFromPresChart=True";
}
sQuery += "&MedChartPatientOID=" + PatientContext.PatientOID;
sQuery += "&RequestLockOID=";
if (String.Equals(sMenuCode, PrescriptionTypesMenuCode.Inpatient, StringComparison.InvariantCultureIgnoreCase) || String.Equals(sMenuCode, PrescriptionTypesMenuCode.ForAdministration, StringComparison.InvariantCultureIgnoreCase) || String.Equals(sMenuCode, PrescriptionTypesMenuCode.ClicallyVerify)) {
    sQuery += (MedChartData.MedChartOID > 0) ? MedChartData.MedChartOID : PatientContext.EncounterOid;
    sQuery += "&GPCConsentStatus=" + Common.GPCConsentVerifyStatus;
}
else {
    sQuery += PatientContext.EncounterOid;
    if (String.Equals(sMenuCode, PrescriptionTypesMenuCode.Discharge, StringComparison.InvariantCultureIgnoreCase)) {
        sQuery += "&GPCConsentStatus=" + Common.GPCConsentVerifyStatus;
    }
}
if (!String.IsNullOrEmpty(sSelectedPrescriptionOIDs))
    sQuery += "&SelPIOID=" + sSelectedPrescriptionOIDs;
this.oPrescriptionChartVM = ObjectHelper.CreateType<PrescriptionChartVM>(this.DataContext, PrescriptionChartVM);
this.oPrescriptionChartVM.sLastCACode = sMenuCode;
if (!this.IsCanLaunchClerk && sMenuCode == "MN_MEDCLERKSL_P2") {
    sQuery += "&MedclerkPrompt=" + MedclerkPrompt;
    clerkingsource = ObjectHelper.CreateType<string>(await HtmlPage.Window.InvokeAsync("LaunchMedClerkSourceChartMedication", PatientContext.PatientOID, PatientContext.EncounterOid, MedclerkPrompt), String);
    sQuery += "&CLRKSRC=" + clerkingsource;
    if (clerkingsource != null) {
        sQuery += "&CLRKSRC=" + clerkingsource;
        sQuery += "&GPCConsentStatus=" + Common.GPCConsentVerifyStatus;
        sQuery += "&sOrgMenucode=" + Common.GetInpatientMedMenucode();
        AppLoadService.LaunchWizard((args)=>this.OnChildWizardClose(args), sMenuCode, sQuery);//To be Re-Visited Suresh removed App.(App.LaunchWizard)
    }
    else {
        Common.IsCanLaunchIPFromClerkPrompt = false;
        let _sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", PatientContext.EncounterOid, "MedPrescribeClerking", Common.nLockDuration), String);
        Common.GPCConsentVerifyStatus = String.Empty;
    }
}
else if (sMenuCode == "MN_HI_CONFALRGY") {
    sQuery = "&MENUCODE=" + sMenuCode;
    sQuery += "&ENCOUNTEROID=" + PatientContext.EncounterOid.ToString();
    sQuery += "&ENCTYPE=" + PatientContext.EncounterType;
    sQuery += "&IsAllergyPrompted=True";
    sQuery += "&IsLaunchFromPresChart=True";
    sQuery += "&GPCConsentStatus=" + Common.GPCConsentVerifyStatus;
    this.oPrescriptionChartVM.sLastCACode = sMenuCode;
    AppLoadService.LaunchWizard((args)=>this.OnChildWizardClose(args), sMenuCode, sQuery); //To be Re-Visited Suresh removed App.(App.LaunchWizard)
}
else if (this.IsCanLaunchClerk) {
    this.IsCanLaunchClerk = false;
    sQuery += "&CLRKSRC=";
    sQuery += "&GPAutoSaveClerk=true";
    sQuery += "&GPCConsentStatus=" + Common.GPCConsentVerifyStatus;
    AppLoadService.LaunchWizard((args)=>this.OnChildWizardClose(args), sMenuCode, sQuery); //To be Re-Visited Suresh removed App.(App.LaunchWizard)
}
else {

    //Extract existing wizardcontext keys and append with the sQuery - 88472 Fix - BNS
    let wizardcontextStr = '';
    let exclusionList = ["WIZ_TaskOID","WIZ_InstanceOID","WIZ_CAOID","WIZ_CACode","WIZ_TaskStatus","MENUCODE","RequestLockOID","WIZ_Size","MenuCode","WIZ_TaskCode","TaskOID","WIZ_Lvl"];
   if(this.oPrescriptionChartVM != null && this.oPrescriptionChartVM.WizardContext!=null )
    {
        Object.keys(this.oPrescriptionChartVM.WizardContext).forEach((key,i)=>{
            if(key != 'objWizardContext' && !sQuery.includes(key) && !exclusionList.includes(key)){
            {
            if(key == 'sWizardContext' && this.oPrescriptionChartVM.WizardContext['sWizardContext'] != ''){
                wizardcontextStr = wizardcontextStr + '&' + key + '=' + this.oPrescriptionChartVM.WizardContext[key];
            }else if(key != 'sWizardContext'){
                wizardcontextStr = wizardcontextStr + '&' + key + '=' + this.oPrescriptionChartVM.WizardContext[key];
            }
            if(i== Object.keys(this.oPrescriptionChartVM.WizardContext).length - 1)
            wizardcontextStr = wizardcontextStr + '&';
            }
            }
        });
        sQuery = sQuery + wizardcontextStr;
    }
   
    let _sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", PatientContext.EncounterOid, "MedPrescribeClerking", Common.nLockDuration), String);
    if (this.IsInpatientClicked) {
        let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", (MedChartData.MedChartOID > 0) ? MedChartData.MedChartOID : PatientContext.EncounterOid, "MedPrescribeInpatient", Common.nLockDuration), String);
    }
    else if (this.IsReviewClicked) {
        let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", MedChartData.MedChartOID, "MedReviewInpatient", Common.nLockDuration), String);
    }
    else if (this.IsDischargeClicked) {
        let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", PatientContext.EncounterOid, "MedPrescribeDischarge", Common.nLockDuration), String);
    }
    else if (this.IsAmendClicked) {
        let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", MedChartData.MedChartOID, "MedPrescribeInpatient", Common.nLockDuration), String);
    }
    else if (this.IsCVClicked) {
        let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", MedChartData.MedChartOID, "MedCVInpatient", Common.nLockDuration), String);
    }
    sQuery += "&CLRKSRC=";
    AppLoadService.LaunchWizard((args)=>this.OnChildWizardClose(args), sMenuCode, sQuery); //To be Re-Visited Suresh removed App.(App.LaunchWizard)
}
}
cmdInpatient_Click(sender?:Object, e?:RoutedEventArgs): void
    {
        if(this.medChartOverview.GetSelectedRows().Count != 1)
 {
    this.cmdOmit.IsEnabled = false;
    this.cmdReinstate.IsEnabled = false;
}
this.nSlotSelectedCountForOmit = 0;
this.IsInpatientClicked = true;
this.IsDischargeClicked = false;
this.IsAmendClicked = false;
this.IsDiscontinueCancelClicked = false;
this.IsCVClicked = false;
this.IsReviewClicked = false;
Common.GPCConsentVerifyStatus = String.Empty;
this.CheckOpenSectionExists();
this.showPopup=false;
//this.popup.IsOpen = false; // to be revisit by suresh
}
cmdDischarge_Click(sender?:Object, e?:RoutedEventArgs): void
    {
        this.IsInpatientClicked = false;
        this.IsDischargeClicked = true;
        this.IsAmendClicked = false;
        this.IsDiscontinueCancelClicked = false;
        this.IsCVClicked = false;
        this.IsReviewClicked = false;
        this.CheckOpenSectionExists();
        this.showPopup=false;
        //this.popup.IsOpen = false; // to be revisit by suresh
    }
cmdAmend_Click(sender?:Object, e?:RoutedEventArgs): void
    {
        let items = this.medChartOverview.GetSelectedRows();
        if(items.Count > 0 && items[0] != null && items[0].DrugItem != null && items[0].DrugItem.Tag != null && (<TagDrugHeaderDetail>(items[0].DrugItem.Tag)) != null && !(<TagDrugHeaderDetail>(items[0].DrugItem.Tag)).IsAllowedToPerform) {
            let oMsgBox: iMessageBox = new iMessageBox();
            oMsgBox.Title = "Information - Lorenzo";
            oMsgBox.Height = 140;
            oMsgBox.Width = 350;
            oMsgBox.MessageButton = MessageBoxButton.OK;
            oMsgBox.IconType = MessageBoxType.Information;
            oMsgBox.Message = Resource.MedsAdminPrescChartView.IsAmendAllowed;
            oMsgBox.Show();
        }
 else {
            this.IsInpatientClicked = false;
            this.IsDischargeClicked = false;
            this.IsAmendClicked = true;
            this.IsDiscontinueCancelClicked = false;
            this.IsCVClicked = false;
            this.IsReviewClicked = false;
            Common.GPCConsentVerifyStatus = String.Empty;
            this.CheckLock();
            this.showPopup=false;
           // this.popup.IsOpen = false; // to be revisit by suresh
        }
    }
discanc: meddiscontinuecancelChild; 
IsDiscontinueCancelLinkClicked: boolean = false;
cmdDiscontinueCancel_Click(sender?:Object, e?:RoutedEventArgs): void
    {
        if(!this.IsDiscontinueCancelLinkClicked)
{
    this.IsDiscontinueCancelLinkClicked = true;
    this.IsInpatientClicked = false;
    this.IsDischargeClicked = false;
    this.IsAmendClicked = false;
    this.IsDiscontinueCancelClicked = true;
    this.IsCVClicked = false;
    this.IsReviewClicked = false;
    this.CheckLock();
    this.showPopup=false;
    //this.popup.IsOpen = false; // to be revisit by suresh
}
}
lstOrderSet: List<string>  ;
CheckInfInprogressReachStartDTTM(): void
    {
        let InfusionType:string ;
        let ItemSubType:string ;
        let StartDTTM:DateTime ;
        let bContainInfusionItem:boolean = false;
        let OrderSetName:string ;
        this.bIsInfDiscontinue = false;
        this.bIsOrdDiscontinue = false;
        let InfusionGroupSequenceNo:number ;
        this.lstOrderSet = new List<string>();
        this.medChartOverview.GetSelectedRows().forEach( (obj)=> {
            if (obj.DrugItem.Tag != null && obj.DrugItem.Tag instanceof TagDrugHeaderDetail) {
                ItemSubType = (<TagDrugHeaderDetail>(obj.DrugItem.Tag)).ItemSubType;
                InfusionType = (<TagDrugHeaderDetail>(obj.DrugItem.Tag)).INFTYCODE;
                StartDTTM = (<TagDrugHeaderDetail>(obj.DrugItem.Tag)).StartDate;
                InfusionGroupSequenceNo = (<TagDrugHeaderDetail>(obj.DrugItem.Tag)).InfusionGroupSequenceNo;
                if (ProfileData.InfusionPresConfig != null && ProfileData.InfusionPresConfig.IsEnablePrescInfus && (InfusionType != null && (!String.IsNullOrEmpty(InfusionType) && String.Compare(InfusionType, InfusionTypesCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) != 0) || String.Compare(ItemSubType, InfusionTypesCode.SUBTYPE_GAS, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(ItemSubType, InfusionTypesCode.BLOOD_PRODUCT, StringComparison.CurrentCultureIgnoreCase) == 0) && (StartDTTM.NotEquals(DateTime.MinValue) && (StartDTTM <= CommonBB.GetServerDateTime() || StartDTTM.AddMinutes(-MedChartData.DuenessThreshold) <= CommonBB.GetServerDateTime() || CommonBB.GetServerDateTime() >= StartDTTM.AddMinutes(MedChartData.DuenessThreshold)))) {
                    bContainInfusionItem = true;
                    this.bIsInfDiscontinue = true;
                }
                else if (ProfileData.InfusionPresConfig != null && ProfileData.InfusionPresConfig.IsEnablePrescInfus && (String.Compare(InfusionType, InfusionTypesCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) == 0) && (StartDTTM.NotEquals(DateTime.MinValue) && StartDTTM <= CommonBB.GetServerDateTime())) {
                    bContainInfusionItem = true;
                    this.bIsInfDiscontinue = true;
                }
            }
            if (obj.DrugItem.Tag != null && obj.DrugItem.Tag instanceof TagDrugHeaderDetail) {
                OrderSetName = (<TagDrugHeaderDetail>(obj.DrugItem.Tag)).OrderSetName;
                InfusionGroupSequenceNo = (<TagDrugHeaderDetail>(obj.DrugItem.Tag)).InfusionGroupSequenceNo;
                if (OrderSetName != null && !String.IsNullOrEmpty(OrderSetName) && !(InfusionGroupSequenceNo > 0)) {
                    if (!this.lstOrderSet.Contains(OrderSetName))
                        this.lstOrderSet.Add(OrderSetName);
                }
            }
        });
        let iMsgBox:iMessageBox = new iMessageBox();
        if(this.bIsInfDiscontinue && bContainInfusionItem)
 {
    iMsgBox.Title = "LORENZO";
    iMsgBox.Message = Resource.MedsAdminPrescChartView.Infusion_DiscontinueCancel;
    iMsgBox.MessageButton = MessageBoxButton.OK;//LORENZO.BlueBird.Controls.
    iMsgBox.IconType = MessageBoxType.Question;
    iMsgBox.Height = 150;
    iMsgBox.Width = 400;
    iMsgBox.MessageBoxClose  = (s,e) => { this.DiscontinueCancel_MessageBoxClose(s,e); } ;
    iMsgBox.Show();
    return
}
if (this.lstOrderSet.Count > 0) {
    iMsgBox.Title = "LORENZO";
    iMsgBox.Message = String.Format(Resource.MedsAdminChartToolTip.DiscontinueMsg, String.Join(",", this.lstOrderSet.ToArray()));
    iMsgBox.MessageButton = MessageBoxButton.OK;//LORENZO.BlueBird.Controls.
    iMsgBox.IconType = MessageBoxType.Question;
    iMsgBox.Height = 150;
    iMsgBox.Width = 450;
    iMsgBox.MessageBoxClose  = (s,e) => { this.DiscontinueCancelOrderSet_MessageBoxClose(s,e); } ;
    iMsgBox.Show();
    // ObjectHelper.stopFinishAndCancelEvent(true);
    this.bIsOrdDiscontinue = true;
    return
}
if (!bContainInfusionItem) {
    this.LanchDiscontinueCancel();
}
}
DiscontinueCancelOrderSet_MessageBoxClose(sender:Object, e:MessageEventArgs): void
    {
        // ObjectHelper.stopFinishAndCancelEvent(false);
        if(this.bIsInfDiscontinue && this.bIsOrdDiscontinue)
 {
    this.bIsOrdDiscontinue = false;
}
 else if (this.bIsInfDiscontinue && !this.bIsOrdDiscontinue) {
    this.LanchDiscontinueCancel();
}
else if (!this.bIsInfDiscontinue && this.bIsOrdDiscontinue) {
    this.LanchDiscontinueCancel();
}
}
DiscontinueCancel_MessageBoxClose(sender:Object, e:MessageEventArgs): void
    {
        if(this.bIsInfDiscontinue && this.bIsOrdDiscontinue)
 {
    this.bIsOrdDiscontinue = false;
}
 else if (this.bIsInfDiscontinue && !this.bIsOrdDiscontinue) {
    if (this.lstOrderSet != null && this.lstOrderSet.Count > 0) {
        let iMsgBox: iMessageBox = new iMessageBox();
        iMsgBox.Title = "LORENZO";
        iMsgBox.Message = String.Format(Resource.MedsAdminChartToolTip.DiscontinueMsg, String.Join(",", this.lstOrderSet.ToArray()));
        iMsgBox.MessageButton = MessageBoxButton.OK;
        iMsgBox.IconType = MessageBoxType.Question;
        iMsgBox.Height = 150;
        iMsgBox.Width = 450;
        iMsgBox.MessageBoxClose  = (s,e) => { this.DiscontinueCancelOrderSet_MessageBoxClose(s,e); } ;
        iMsgBox.Show();
    }
    else {
        this.LanchDiscontinueCancel();
    }
}
else if (!this.bIsInfDiscontinue && this.bIsOrdDiscontinue) {
    this.LanchDiscontinueCancel();
}
}
LanchDiscontinueCancel(): void
    {
        let sMenuCode:string = this.GetMenuCode();
        PatientContext.PrescriptionType = MedicationCommonBB.GetPrescriptionTypeCode(sMenuCode);
        this.IsChartRefreshedRequired = true;
        this.discanc = new meddiscontinuecancelChild();
        this.discanc.objSelectedData = new ObservableCollection<SelectedPrescriptionItemVM>();
        let sDrugNames:StringBuilder = new StringBuilder();
        if(!String.IsNullOrEmpty(SLQueryCollection.GetQueryStringValue("MenuCode")))
{
    this.discanc.SLMenuCode = SLQueryCollection.GetQueryStringValue("MenuCode");
}
this.medChartOverview.GetSelectedRows().forEach( (obj)=> {
    let sMCIComponent: string[] = null;
    let sPrescriptionItem: string = String.Empty;
    let sMCIToolTip: string = String.Empty;
    let nLength: number = 0;
    let sADHOCMCIComponents: StringBuilder = new StringBuilder();
    let otag: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(obj.DrugItem.Tag, TagDrugHeaderDetail);
    if ((<TagDrugHeaderDetail>(obj.DrugItem.Tag)).MultiComponentItems != null && String.Equals((<TagDrugHeaderDetail>(obj.DrugItem.Tag)).ItemSubType, CConstants.ItemSubType)) {
        nLength = (<TagDrugHeaderDetail>(obj.DrugItem.Tag)).MultiComponentItems.Count;
        for (let i: number = 0; i < nLength; i++) {
            let sComponentName: string = (<TagDrugHeaderDetail>(obj.DrugItem.Tag)).MultiComponentItems[i];
            if (!String.IsNullOrEmpty(sComponentName)) {
                sMCIComponent = sComponentName.Split('~');
                if (!String.IsNullOrEmpty(sMCIComponent[0])) {
                    sADHOCMCIComponents.Append(sMCIComponent[0]);
                    if (i != nLength - 1)
                        sADHOCMCIComponents.Append(Environment.NewLine);
                }
            }
        }
        if (!String.IsNullOrEmpty((<TagDrugHeaderDetail>(obj.DrugItem.Tag)).LorenzoID) && String.Equals((<TagDrugHeaderDetail>(obj.DrugItem.Tag)).LorenzoID, CConstants.ADHOC_ITEM_LORENZOID) && nLength <= 5) {
            sPrescriptionItem = Convert.ToString(sADHOCMCIComponents);
            sMCIToolTip = sPrescriptionItem;
        }
        else {
            sPrescriptionItem = (<TagDrugHeaderDetail>(obj.DrugItem.Tag)).DrugName;
            sMCIToolTip = Convert.ToString(sADHOCMCIComponents);
        }
    }
    else sPrescriptionItem = obj.DrugItem.Drugname;
    if (otag != null && otag.IsAllowedToPerform) {
        let oTagDrugHeaderDetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(obj.DrugItem.Tag, TagDrugHeaderDetail);
        this.discanc.objSelectedData.Add(ObjectHelper.CreateObject(new SelectedPrescriptionItemVM(), {
            IsHold: false,
            IsSeqInfusion: oTagDrugHeaderDetail.ParentPrescriptionItemOID > 0 ? true : false,
            PrescriptionItemOID: Convert.ToInt64(obj.DrugItem.Key),
            PrescriptionItem: sPrescriptionItem,
            mCIItemDisplay: sMCIToolTip,
            InfusionType: oTagDrugHeaderDetail.INFTYCODE,
            ItemSubType: oTagDrugHeaderDetail.ItemSubType,
            StartDTTM: oTagDrugHeaderDetail.StartDate,
            ParentprescriptionItemOID: oTagDrugHeaderDetail.ParentPrescriptionItemOID,
            InfusionItemSeqNo: oTagDrugHeaderDetail.InfusionSeqOrder,
            NonIVGroupSequenceNo: oTagDrugHeaderDetail.InfusionGroupSequenceNo,
            NonIVItemSequenceNo: oTagDrugHeaderDetail.InfusionSeqOrder
        }));
    }
    else {
        if (sDrugNames.Length > 0) {
            sDrugNames.Append("?!+`");
        }
        if (!String.IsNullOrEmpty(sPrescriptionItem)) {
            sDrugNames.Append(sPrescriptionItem);
        }
    }
});
if (sDrugNames.Length > 0) {
    let Msg: string = String.Empty;
    let lDrugNames: string = String.Empty;
    lDrugNames = sDrugNames.ToString();
    if (!sDrugNames.ToString().Contains("?!+`")) {
        lDrugNames = "\n\n- " + lDrugNames;
        Msg = String.Format(Resource.MedsAdminPrescChartView.IsDiscontinueCancelAllowed, lDrugNames);
    }
    else {
        lDrugNames = String.Join("\n- ", lDrugNames.Split("?!+`", StringSplitOptions.None).ToList());
        lDrugNames = "\n\n- " + lDrugNames;
        Msg = String.Format(Resource.MedsAdminPrescChartView.AreDiscontinueCancelAllowed, lDrugNames);
    }
    let oMsgBox: iMessageBox = new iMessageBox();
    oMsgBox.MessageBoxClose  = (s,e) => { this.oMsgBox_IsAllowDiscontinueCancelMessageBoxClose(s,e); } ;
    oMsgBox.Title = "Information - Lorenzo";
    oMsgBox.Height = 160;
    oMsgBox.Width = 600;
    oMsgBox.MessageButton = MessageBoxButton.OK; //LORENZO.BlueBird.Controls.
    oMsgBox.IconType = MessageBoxType.Information;
    oMsgBox.Message = Msg;
    oMsgBox.Show();
}
else {
    let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", MedChartData.MedChartOID, "MedDiscontinueCancel", Common.nLockDuration), String);
    this.discanc.OnAllergyClosedEvent  = (s,e) => { this.discanc_OnAllergyClosedEvent(); } ;
    this.discanc.onDialogClose = this.discanc_Closed;
    this.discanc.HelpCode = "DiscontinueCancel";
    this.discanc.CALanchFrom = CConstants.CADisCancelPresChart;
    // ObjectHelper.stopFinishAndCancelEvent(true);
    AppActivity.OpenDialog("Discontinue/Cancel", this.discanc, (s)=>{this.discanc_Closed(s)}, "Discontinue/Cancel", false, 500, 750);
}
}
private oMsgBox_IsAllowDiscontinueCancelMessageBoxClose(sender:Object, e:MessageEventArgs): void
    {
        if(this.discanc.objSelectedData.Count > 0)
 {
    let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", MedChartData.MedChartOID, "MedDiscontinueCancel", Common.nLockDuration), String);
    this.discanc.OnAllergyClosedEvent  = (s,e) => { this.discanc_OnAllergyClosedEvent(); } ;
    this.discanc.onDialogClose = this.discanc_Closed;
    this.discanc.HelpCode = "DiscontinueCancel";
    this.discanc.CALanchFrom = CConstants.CADisCancelPresChart;
    AppActivity.OpenDialog("Discontinue/Cancel", this.discanc, (s)=>{this.discanc_Closed(s)}, "Discontinue/Cancel", false, 500, 750);
}
 else {
    this.IsDiscontinueCancelLinkClicked = false;
}
}
discanc_OnAllergyClosedEvent(): void
    {
        //let oDeletedItemsInfo:ObservableCollection<IPPMAManagePrescSer.DeletedItemsInfo>  = new ObservableCollection<ManagePrescription.BlueBird.WebUI.IPPMAManagePrescSer.DeletedItemsInfo>(); // To be revist
        let oDeletedItemsInfo:ObservableCollection<IPPMAManagePrescSer.DeletedItemsInfo>  = new ObservableCollection<IPPMAManagePrescSer.DeletedItemsInfo>(); 
        let oAllGrdRows:ObservableCollection<GrdDiscontinueCancelCols>  = <ObservableCollection < GrdDiscontinueCancelCols > >this.discanc.grdDisCancelData1.ItemsSource;
let oSelRowbyindex: GrdDiscontinueCancelCols;
let dtCurrent: DateTime= CommonBB.GetServerDateTime();
for (let index: number = 0; index < oAllGrdRows.Count; index++) {
    oSelRowbyindex = <GrdDiscontinueCancelCols>this.discanc.grdDisCancelData1.GetRowData(index);
    let info: IPPMAManagePrescSer.DeletedItemsInfo = new IPPMAManagePrescSer.DeletedItemsInfo();
    info.PrescriptionItemData = new IPPMAManagePrescSer.PrescriptionItemInputData();
    info.PrescriptionItemData.OID = oSelRowbyindex.PrescriptionItemOID;
    //info.PrescriptionItemData.PrescriptionItemStatus = (String.Compare(oSelRowbyindex.() => void,"Cancel", StringComparison.CurrentCultureIgnoreCase) == 0) ? CConstants.CANCELLED : CConstants.DISCONTINUED;
    info.PrescriptionItemData.PrescriptionItemStatus = (String.Compare(oSelRowbyindex.Action, "Cancel", StringComparison.CurrentCultureIgnoreCase) == 0) ? CConstants.CANCELLED : CConstants.DISCONTINUED;
                
    info.PrescriptionItemData.PrescriptionType = PatientContext.PrescriptionType;
    info.DeletedInfo = new IPPMAManagePrescSer.PrescriptionItemAction();
    //info.DeletedInfo.ActionCode = (String.Compare(oSelRowbyindex.Action() => void,"Cancel", StringComparison.CurrentCultureIgnoreCase) == 0) ? CConstants.CANCELLED : CConstants.DISCONTINUED;
    info.DeletedInfo.ActionCode = (String.Compare(oSelRowbyindex.Action, "Cancel", StringComparison.CurrentCultureIgnoreCase) == 0) ? CConstants.CANCELLED : CConstants.DISCONTINUED;
                
    info.DeletedInfo.DirectDiscontinueReason = (ObjectHelper.CreateType<CListItem>(oSelRowbyindex.SelectedReason, CListItem)).DisplayText;
    info.PrescriptionItemData.ParentPrescriptionItemOID = oSelRowbyindex.ParentPrescriptionItemOID > 0 ? oSelRowbyindex.ParentPrescriptionItemOID : 0;
    info.PrescriptionItemData.InfusionSeqOrder = oSelRowbyindex.InfusionItemsequenceNo > 0 ? oSelRowbyindex.InfusionItemsequenceNo : 0;
    let dtStartDTTM: DateTime= oSelRowbyindex.StartDTTM;
    if (info.PrescriptionItemData.ParentPrescriptionItemOID > 0 && info.PrescriptionItemData.InfusionSeqOrder > 0) {
        if (!oSelRowbyindex.IsAdminiStrated && (dtStartDTTM > dtCurrent && (dtStartDTTM.AddMinutes(-MedChartData.DuenessThreshold) >= dtCurrent) && (dtStartDTTM.AddMinutes(MedChartData.DuenessThreshold) >= dtCurrent))) {
            info.PrescriptionItemData.PrescriptionItemStatus = CConstants.CANCELLED;
            info.DeletedInfo.ActionCode = CConstants.CANCELLED;
        }
        else {
            info.PrescriptionItemData.PrescriptionItemStatus = CConstants.DISCONTINUED;
            info.DeletedInfo.ActionCode = CConstants.DISCONTINUED;
        }
    }
    info.IsPatMerged = PatientContext.PatientOID != PatientContext.MergedPatientOID ? "1" : "0";
    oDeletedItemsInfo.Add(info);
}
this.DiscontinueCancelDrugs(oDeletedItemsInfo);
}
discanc_Closed(args:AppDialogEventargs): void
    {
        // ObjectHelper.stopFinishAndCancelEvent(false);
        if(args.Result == AppDialogResult.Ok) {
            let _lockedUserDetails: LockedUsersDetails;
            if (!MedicationCommonBB.IsLockStillValid(MedChartData.MedChartOID, "MedDiscontinueCancel", (o) => {_lockedUserDetails = o})) {
                let oMsgBox: iMessageBox = new iMessageBox();
                oMsgBox.MessageBoxClose  = (s,e) => { this.oMsgBox_DiscontinueCancelClose(s,e); } ;
                oMsgBox.Title = "Information - Lorenzo";
                oMsgBox.Height = 160;
                oMsgBox.MessageButton = MessageBoxButton.OK;
                oMsgBox.IconType = MessageBoxType.Information;
                if (String.IsNullOrEmpty(_lockedUserDetails.LockedUserName)) {
                    oMsgBox.Message = Resource.MedsAdminPrescChartView.LockMsg_Abort;
                }
                else {
                    oMsgBox.Message = String.Format(Resource.MedsAdminPrescChartView.LockMsg, _lockedUserDetails.LockedUserName);
                }
                oMsgBox.Show();
            }
            else {
                //revisitme
                this.discanc = args.Content.Component;
                this.discanc.OKButtonClick();
            }
        }
 else if(args.Result == AppDialogResult.Cancel) {
            this.discanc = args.Content.Component;
            this.discanc.CancelButtonClick();
            let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", MedChartData.MedChartOID, "MedDiscontinueCancel", Common.nLockDuration), String);
        }
this.IsDiscontinueCancelLinkClicked = false;
    }
oMsgBox_DiscontinueCancelClose(sender:Object, e:MessageEventArgs): void
    {
        this.IsDiscontinueCancelLinkClicked = false;
        this.discanc.appDialog.DialogResult = true;
    }
oMsgBox_OmitClose(sender:Object, e:MessageEventArgs): void
    {
        // ObjectHelper.stopFinishAndCancelEvent(false);
        this.AppDialogWindow.DialogResult = false;
    }
oMsgBox_ReviewInitiateClose(sender:Object, e:MessageEventArgs): void
    {
        this.AppDialogWindow.DialogResult = false;
    }
oMsgBox_ReviewOutcomeClose(sender:Object, e:MessageEventArgs): void
    {
        this.AppDialogWindow.DialogResult = false;
    }
oMsgBox_ReInstateClose(sender:Object, e:MessageEventArgs): void
    {
        this.AppDialogWindow.DialogResult = false;
    }
oMsgBox_EnterdoseClose(sender:Object, e:MessageEventArgs): void
    {
        // ObjectHelper.stopFinishAndCancelEvent(false);
        this.oChildWindow.DialogResult = false;
    }
IsReviewLinkClicked: boolean = false;
cmdReview_Click(sender?:Object, e?:RoutedEventArgs): void
    {
        let items = this.medChartOverview.GetSelectedRows();
        if(items.Count > 0 && items[0] != null && items[0].DrugItem != null && items[0].DrugItem.Tag != null && (<TagDrugHeaderDetail>(items[0].DrugItem.Tag)) != null && !(<TagDrugHeaderDetail>(items[0].DrugItem.Tag)).IsAllowedToPerform) {
            let oMsgBox: iMessageBox = new iMessageBox();
            oMsgBox.Title = "Information - Lorenzo";
            oMsgBox.Height = 140;
            oMsgBox.Width = 350;
            oMsgBox.MessageButton = MessageBoxButton.OK;
            oMsgBox.IconType = MessageBoxType.Information;
            oMsgBox.Message = Resource.MedsAdminPrescChartView.IsReviewAllowed;
            oMsgBox.Show();
        }
 else {
            if(!this.IsReviewLinkClicked)
{
    this.IsReviewLinkClicked = false;
    this.IsInpatientClicked = false;
    this.IsDischargeClicked = false;
    this.IsAmendClicked = false;
    this.IsDiscontinueCancelClicked = false;
    this.IsReviewClicked = true;
    this.IsCVClicked = false;
    this.PresCheckPessimisticLock("MedPrescribeInpatient~MedDiscontinueCancel~MAOmit~MAReinstate~MedCVInpatient~MEDAuthInpatient~MAReview~MAEnterTitratedDose", "", "MedPrescribeDischarge~MedCVDischarge~MedPrescribeLeave~MedCVLeave~MAMedChart", false , (s,e) => { this.ReviewWarning_MessageBoxClose(s,e); } );
    if (!this.IsLock && !this.IsOmitReinstateReviewClicked) {
        this.cmdReviewClick();
    }
    this.showPopup=false;
    //this.popup.IsOpen = false; // to be revisit by suresh
}
}
}
ReviewWarning_MessageBoxClose(sender:Object, e:MessageEventArgs): void
    {
        if(e.MessageBoxResult == MessageBoxResult.Yes) {
            this.cmdReviewClick();
        }
 else {
            this.IsOmitReinstateReviewClicked = false;
        }
    }
private cmdReviewClick(): void
    {
        let sResult:string = String.Empty;
        sResult = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", MedChartData.MedChartOID, "MAReview", Common.nLockDuration), String);
        if(this.medChartOverview.GetSelectedRows().Count == 1)
 {
    this.IsOmitReinstateReviewClicked = true;
    this.medChartOverview.GetSelectedRows().forEach( (obj)=> {
        this.oChartRow = obj;
        if (obj != null && obj.DrugItem != null && obj.DrugItem.Tag != null && obj.DrugItem.Tag instanceof TagDrugHeaderDetail) {
            this.objtagheader = ObjectHelper.CreateType<TagDrugHeaderDetail>(obj.DrugItem.Tag, TagDrugHeaderDetail);
        }
        if (!String.IsNullOrEmpty(this.objtagheader.DrugName)) {
            this.sPrescriptionItemName = this.objtagheader.DrugName;
        }
        let objServiceProxy: ManagePrescriptionWSSoapClient = new ManagePrescriptionWSSoapClient();
        objServiceProxy.GetFormViewControlsCompleted  = (s,e) => { this.objService_GetFormViewControlsCompleted(s,e); } ;
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
        objServiceProxy.GetFormViewControlsAsync(objReqForm);
    });
}
}
private DoseCalculationByScheduleTimes(oChartRow:ChartRow): ObservableCollection < IPPMAManagePrescSer.IPPScheduledetails >
    {
        let oAdminData:ObservableCollection<IPPMAManagePrescSer.IPPScheduledetails>  = null;
        let oIPPSchDetail:IPPMAManagePrescSer.IPPScheduledetails = null;
        if(oChartRow != null) {
            if (oChartRow.TimeSlots != null && oChartRow.TimeSlots.Count > 0) {
                oAdminData = new ObservableCollection<IPPMAManagePrescSer.IPPScheduledetails>();
                oChartRow.TimeSlots.forEach( (item)=> {
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
                       // break;
                       return;
                    }
                });
            }
        }
return oAdminData;
    }
private objService_GetFormViewControlsCompleted(sender:Object, e:GetFormViewControlsCompletedEventArgs): void
    {
        let _ErrorID:number = 80000113;
        let ReviewText:string = String.Empty;
        let ReviewTextCode:string = String.Empty;
        this.AdminTimeVM = null;
        if(this.objtagheader.DrugFrequencyOID > 0)
 {
    this.AdminTimeVM = new AdminstrativeTimesVM(this.objtagheader.DrugFrequencyOID);
}
let _ErrorSource: string = "LorAppMedicationAdmin_P2.dll, Class:MedsAdminPrescChartView, Method:objService_GetFormViewControlsCompleted()";
if (e.Error == null && e.Result != null) {
    try {
        let objres: CResMsgGetFormViewControls = e.Result;
        if (objres != null && objres.oFormViewControls != null && objres.oFormViewControls.Columns != null && objres.oFormViewControls.Mandatory != null && objres.oFormViewControls.Columns.Count > 0 && objres.oFormViewControls.Mandatory.Count > 0) {
            let columnsArray: string[] = objres.oFormViewControls.Columns.ToArray();
            let mandatoryArray: string[] = objres.oFormViewControls.Mandatory.ToArray();
            let indexsupply: number = Array.IndexOf(columnsArray, CConstants.ReviewConceptCode);
            if (indexsupply != -1) {
                this.DynamicFormReviewMandatoryFetched = true;
                this.IsReviewPeriodMandatory = String.Equals(mandatoryArray[indexsupply], "1");
            }
            else {
                this.DynamicFormReviewMandatoryFetched = false;
            }
        }
        this.objFrequencyDetails = null;
        this.objScheduletimes = null;
        if (this.oChartRow != null) {
            if ((this.oChartRow.TimeSlots != null && this.oChartRow.TimeSlots.Count > 0 && String.IsNullOrEmpty(this.oChartRow.TimeSlots[0].SlotTime)) || (this.oChartRow.TimeSlots == null) || (this.oChartRow.TimeSlots != null && this.oChartRow.TimeSlots.Count == 0)) {
                if (!((this.objtagheader.IsInfusion && !String.Equals(this.objtagheader.INFTYCODE, InfusionTypeCode.INTERMITTENT)) || (this.objtagheader.IsInfusion && String.Equals(this.objtagheader.INFTYCODE, InfusionTypeCode.INTERMITTENT) && String.Equals(this.objtagheader.DoseType, DoseTypeCode.STEPPEDVARIABLE)) || this.objtagheader.IsPRN || String.Equals(this.objtagheader.FreqPerodcode, CConstants.OnceOnlyPerodCode) || String.Equals(this.objtagheader.DoseType, DoseTypeCode.STEPPEDVARIABLE))) {
                    let objServiceProxy: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
                    objServiceProxy.GetScheduleTimeAndFreqCompleted  = (s,e) => { this.objService_GetScheduleTimeAndFreqCompleted(s,e); } ;
                    let objReq: IPPMAManagePrescSer.CReqMsgGetScheduleTimeAndFreq = new IPPMAManagePrescSer.CReqMsgGetScheduleTimeAndFreq();
                    objReq.PatientOIDBC = PatientContext.PatientOID;
                    objReq.PrescriptionItemOIDBC = this.objtagheader.PrescriptionItemOID;
                    objReq.PrescriptionStartDateBC = this.objtagheader.StartDate;
                    if (this.objtagheader.EndDate.Equals(DateTime.MinValue)) {
                        objReq.PrescriptionEndDateBC = CommonBB.GetServerDateTime();
                    }
                    else {
                        objReq.PrescriptionEndDateBC = this.objtagheader.EndDate;
                    }
                    objReq.oContextInformation = CommonBB.FillContext();
                    objServiceProxy.GetScheduleTimeAndFreqAsync(objReq);
                }
                else {
                    let objServiceProxy: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
                    objServiceProxy.GetReviewHistoryCompleted  = (s,e) => { this.objService_GetReviewHistoryCompleted(s,e); } ;
                    let objReq: IPPMAManagePrescSer.CReqMsgGetReviewHistory = new IPPMAManagePrescSer.CReqMsgGetReviewHistory();
                    objReq.lnPatientoidBC = PatientContext.PatientOID;
                    objReq.lnPrescriptionItemOIDBC = this.objtagheader.PrescriptionItemOID;
                    objReq.IsCurrentRequiredBC = true;
                    objReq.oContextInformation = CommonBB.FillContext();
                    objServiceProxy.GetReviewHistoryAsync(objReq);
                }
            }
            else {
                let objServiceProxy: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
                objServiceProxy.GetReviewHistoryCompleted  = (s,e) => { this.objService_GetReviewHistoryCompleted(s,e); } ;
                let objReq: IPPMAManagePrescSer.CReqMsgGetReviewHistory = new IPPMAManagePrescSer.CReqMsgGetReviewHistory();
                objReq.lnPatientoidBC = PatientContext.PatientOID;
                objReq.lnPrescriptionItemOIDBC = this.objtagheader.PrescriptionItemOID;
                objReq.IsCurrentRequiredBC = true;
                objReq.oContextInformation = CommonBB.FillContext();
                objServiceProxy.GetReviewHistoryAsync(objReq);
            }
        }
    }
   catch(ex:any)  {
        let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
    }

}
else {
    let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
}
}
private objService_GetScheduleTimeAndFreqCompleted(sender:Object, e:IPPMAManagePrescSer.GetScheduleTimeAndFreqCompletedEventArgs): void
    {
        let _ErrorID:number = 80000113;
        let ReviewText:string = String.Empty;
        let ReviewTextCode:string = String.Empty;
        let _ErrorSource:string = "LorAppMedicationAdmin_P2.dll, Class:MedsAdminPrescChartView, Method:objService_GetScheduleTimeAndFreqCompleted()";
        if(e.Error == null && e.Result != null) {
            try {
                let objres: IPPMAManagePrescSer.CResMsgGetScheduleTimeAndFreq = e.Result;
                if (objres != null) {
                    if (objres.freq != null) {
                        this.objFrequencyDetails = new IPPMAManagePrescSer.IPPFrequency();
                        this.objFrequencyDetails.IsSunday = objres.freq.IsSunday;
                        this.objFrequencyDetails.IsMonday = objres.freq.IsMonday;
                        this.objFrequencyDetails.IsTuesday = objres.freq.IsTuesday;
                        this.objFrequencyDetails.IsWednesday = objres.freq.IsWednesday;
                        this.objFrequencyDetails.IsThursday = objres.freq.IsThursday;
                        this.objFrequencyDetails.IsFriday = objres.freq.IsFriday;
                        this.objFrequencyDetails.IsSaturday = objres.freq.IsSaturday;
                    }
                    if (objres.lstscheduletimes != null && objres.lstscheduletimes.Count > 0) {
                        let oIPPSchDetail: IPPMAManagePrescSer.IPPScheduledetails = new IPPMAManagePrescSer.IPPScheduledetails();
                        let oAdminData: ObservableCollection<IPPMAManagePrescSer.IPPScheduledetails> = new ObservableCollection<IPPMAManagePrescSer.IPPScheduledetails>();
                        objres.lstscheduletimes.forEach( (item)=> {
                            oIPPSchDetail = new IPPMAManagePrescSer.IPPScheduledetails();
                            oIPPSchDetail.ScheduledTime = (<IPPManagePrescSer.Scheduledetails>(item)).ScheduleTime.ToString();
                            oAdminData.Add(oIPPSchDetail);
                        });
                        this.objScheduletimes = oAdminData;
                    }
                }
                let objServiceProxy: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
                objServiceProxy.GetReviewHistoryCompleted  = (s,e) => { this.objService_GetReviewHistoryCompleted(s,e); } ;
                let objReq: IPPMAManagePrescSer.CReqMsgGetReviewHistory = new IPPMAManagePrescSer.CReqMsgGetReviewHistory();
                objReq.lnPatientoidBC = PatientContext.PatientOID;
                objReq.lnPrescriptionItemOIDBC = this.objtagheader.PrescriptionItemOID;
                objReq.IsCurrentRequiredBC = true;
                objReq.oContextInformation = CommonBB.FillContext();
                objServiceProxy.GetReviewHistoryAsync(objReq);
            }
           catch(ex:any)  {
                let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
            }

        }
 else {
            let lnReturn:number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
        }
    }
private objService_GetReviewHistoryCompleted(sender:Object, e:IPPMAManagePrescSer.GetReviewHistoryCompletedEventArgs): void
    {
        let _ErrorID:number = 80000113;
        let ReviewText:string = String.Empty;
        let ReviewTextCode:string = String.Empty;
        let _ErrorSource:string = "LorAppMedicationAdmin_P2.dll, Class:MedsAdminPrescChartView, Method:objService_GetReviewHistoryCompleted()";
        if(e.Error == null && e.Result != null) {
            try {
                let objManageReviewPeriod: IPPMAManagePrescSer.ManageReviewPeriod = new IPPMAManagePrescSer.ManageReviewPeriod();
                objManageReviewPeriod.oReviewAfterDetail = new IPPMAManagePrescSer.ReviewAfterDetail();
                let objres: IPPMAManagePrescSer.CResMsgGetReviewHistory = e.Result;
                if (objres != null && objres.ReviewAfterDetails != null && objres.ReviewAfterDetails.Count > 0 && objres.ReviewAfterDetails[0].IsCurrent == "1") {
                    objManageReviewPeriod.oReviewAfterDetail.ReviewAfter = objres.ReviewAfterDetails[0].ReviewAfter;
                    objManageReviewPeriod.oReviewAfterDetail.ReviewAfterUOM = objres.ReviewAfterDetails[0].ReviewAfterUOM;
                    objManageReviewPeriod.oReviewAfterDetail.ReviewedDTTM = objres.ReviewAfterDetails[0].ReviewedDTTM;
                    objManageReviewPeriod.oReviewAfterDetail.ReviewDueDTTM = objres.ReviewAfterDetails[0].ReviewDueDTTM;
                    objManageReviewPeriod.oReviewAfterDetail.ReviewType = new IPPManagePrescSer.ObjectInfo();
                    objManageReviewPeriod.oReviewAfterDetail.ReviewType = objres.ReviewAfterDetails[0].ReviewType;
                    objManageReviewPeriod.oReviewAfterDetail.ReviewRequestedDTTM = objres.ReviewAfterDetails[0].ReviewRequestedDTTM;
                    objManageReviewPeriod.oReviewAfterDetail.ReviewRequestedBy = objres.ReviewAfterDetails[0].ReviewRequestedBy;
                    objManageReviewPeriod.oReviewAfterDetail.ReviewRequestComments = objres.ReviewAfterDetails[0].ReviewRequestComments;
                    objManageReviewPeriod.oReviewAfterDetail.PrescriptionItemOID = objres.ReviewAfterDetails[0].PrescriptionItemOID;
                    objManageReviewPeriod.oReviewAfterDetail.ReviewPeriod = objres.ReviewAfterDetails[0].ReviewPeriod;
                    objManageReviewPeriod.oReviewAfterDetail.ReviewOutcome = objres.ReviewAfterDetails[0].ReviewOutcome;
                    objManageReviewPeriod.oReviewAfterDetail.ReviewOutcomeComments = objres.ReviewAfterDetails[0].ReviewOutcomeComments;
                    objManageReviewPeriod.oReviewAfterDetail.Reviewer = objres.ReviewAfterDetails[0].Reviewer;
                    objManageReviewPeriod.oReviewAfterDetail.ReinstateReason = objres.ReviewAfterDetails[0].ReinstateReason;
                    objManageReviewPeriod.oReviewAfterDetail.DiscontinueReason = objres.ReviewAfterDetails[0].DiscontinueReason;
                }
                if (!this.DynamicFormReviewMandatoryFetched) {
                    this.IsReviewPeriodMandatory = objres.IsReviewMandatory;
                }
                if (this.objtagheader != null && this.objtagheader.ReviewDTTM.Equals(DateTime.MinValue)) {
                    this.oreviewvm = new ReviewPeriodVM();
                    this.oreviewvm.IsReviewMandatory = this.IsReviewPeriodMandatory;
                    if (!String.IsNullOrEmpty(objres.IsReviewPeriodAvailable)) {
                        this.oreviewvm.ReviewAfter = objres.IsReviewPeriodAvailable;
                    }
                    if (objres.IsReviewUOMCodeAvailable != null) {
                        let otemp: CListItem = new CListItem();
                        if (objres.IsReviewUOMCodeAvailable.Name != null) {
                            otemp.DisplayText = objres.IsReviewUOMCodeAvailable.Name;
                        }
                        if (!String.IsNullOrEmpty(objres.IsReviewUOMCodeAvailable.Code)) {
                            otemp.Value = objres.IsReviewUOMCodeAvailable.Code;
                        }
                        this.oreviewvm.TempReviewafterUOM = otemp;
                    }
                    this.oreviewvm.StartPrescriptionTime = this.objtagheader.StartDate;
                    if (this.objtagheader.PrescriptionItemOID > 0) {
                        this.oreviewvm.PrescriptionItemOID = this.objtagheader.PrescriptionItemOID;
                    }
                    if (this.objtagheader.EndDate.NotEquals(DateTime.MinValue)) {
                        this.oreviewvm.PrescriptionEndTime = this.objtagheader.EndDate;
                    }
                    this.oreviewvm.PrescriptionItemStatus = this.objtagheader.PrescriptionItemStatus;
                    if (this.objtagheader.DrugFrequencyOID > 0) {
                        this.oreviewvm.FrequencyOID = this.objtagheader.DrugFrequencyOID;
                    }
                    if (this.objtagheader.Duration != 0) {
                        this.oreviewvm.Duration = this.objtagheader.Duration;
                        this.oreviewvm.DurationUOM = CConstants.MinuteConceptCode;
                    }
                    if (!String.IsNullOrEmpty(this.objtagheader.InfusionPeriod)) {
                        this.oreviewvm.InfusionPeriod = this.objtagheader.InfusionPeriod;
                    }
                    if (!String.IsNullOrEmpty(this.objtagheader.InfusionPeriodUOM)) {
                        this.oreviewvm.InfusionPeriodUOM = this.objtagheader.InfusionPeriodUOM;
                    }
                    if (!String.IsNullOrEmpty(this.objtagheader.DoseType)) {
                        this.oreviewvm.DoseType = this.objtagheader.DoseType;
                    }
                    if (!String.IsNullOrEmpty(this.objtagheader.INFTYCODE)) {
                        this.oreviewvm.InfusionType = this.objtagheader.INFTYCODE;
                    }
                    this.oreviewvm.ParentDTTM = CommonBB.GetServerDateTime();
                    if (!String.IsNullOrEmpty(this.objtagheader.FreqPerodcode)) {
                        this.oreviewvm.FrequencyType = this.objtagheader.FreqPerodcode;
                    }
                    this.oreviewvm.CACode = MedAction.Review;
                    if (this.objtagheader.ReviewDTTM.NotEquals(DateTime.MinValue)) {
                        this.oreviewvm.ReviewAfterDTTM = this.objtagheader.ReviewDTTM;
                    }
                    this.oreviewvm.Route = this.objtagheader.Route;
                    this.oreviewvm.IsInfusion = this.objtagheader.IsInfusion;
                    //this.oreviewvm.IsPRN = this.objtagheader.IsPRN
                    this.oreviewvm.IsPRN = this.objtagheader.IsPRN as boolean; // To be Revisit
                    if (this.AdminTimeVM != null) {
                        this.oreviewvm.oAdminTimesVM = this.AdminTimeVM;
                    }
                    if (this.objFrequencyDetails != null) {
                        this.oreviewvm.oFrequencyDetails = this.objFrequencyDetails;
                    }
                    if (this.objScheduletimes != null && this.objScheduletimes.Count > 0) {
                        if (!String.IsNullOrEmpty(this.objScheduletimes[0].ScheduledTime)) {
                            this.oreviewvm.scheduletimes = this.objScheduletimes;
                        }
                    }
                    if (this.oChartRow != null && this.oChartRow.TimeSlots != null && this.oChartRow.TimeSlots.Count > 0) {
                        if (!String.IsNullOrEmpty(this.oChartRow.TimeSlots[0].SlotTime)) {
                            if (!((this.objtagheader.IsInfusion && !String.Equals(this.objtagheader.INFTYCODE, InfusionTypeCode.INTERMITTENT)) || (this.objtagheader.IsInfusion && String.Equals(this.objtagheader.INFTYCODE, InfusionTypeCode.INTERMITTENT) && String.Equals(this.objtagheader.DoseType, DoseTypeCode.STEPPEDVARIABLE)) || this.objtagheader.IsPRN || String.Equals(this.objtagheader.FreqPerodcode, CConstants.OnceOnlyPerodCode) || String.Equals(this.objtagheader.DoseType, DoseTypeCode.STEPPEDVARIABLE))) {
                                if (this.DoseCalculationByScheduleTimes(this.oChartRow) != null) {
                                    this.oreviewvm.scheduletimes = this.DoseCalculationByScheduleTimes(this.oChartRow);
                                }
                                if (this.DoseCalculationByFrequency(this.oChartRow) != null) {
                                    this.oreviewvm.oFrequencyDetails = this.DoseCalculationByFrequency(this.oChartRow);
                                }
                            }
                        }
                    }
                    if (this.oreviewvm != null && String.Equals(this.objtagheader.DrugIdentifyingType, CConstants.NONCATALOGUEITEM, StringComparison.OrdinalIgnoreCase) || String.Equals(this.objtagheader.DrugIdentifyingType, CConstants.Precatalog, StringComparison.OrdinalIgnoreCase)) {
                        this.oreviewvm.IsReviewMandatory = false;
                        this.oreviewvm.ReviewAfter = String.Empty;
                        this.oreviewvm.TempReviewafterUOM = null;
                        this.oreviewvm.ReviewAfterDTTM = DateTime.MinValue;
                    }
                    this.IsReviewIntiateOKClick = false;
                    this.omedReviewChild = new medReviewChild();
                    this.omedReviewChild.DataContext = this.oreviewvm;
                    this.omedReviewChild.onDialogClose = this.omedReviewChild_Closed;
                    this.omedReviewChild.HelpCode = "MN_PRESCCHART_P2";
                    // ObjectHelper.stopFinishAndCancelEvent(true);
                    AppActivity.OpenDialog("Initiate Review", this.omedReviewChild, (s)=>{this.omedReviewChild_Closed(s)}, this.sPrescriptionItemName, true, 300, 500);
                }
                else {
                    let oReviewOutcomeVM: ReviewOutcomeVM;
                    this.oReviewOutcome = new ReviewOutcome();
                    this.oReviewOutcome.constructorImpl(objManageReviewPeriod);
                   
                    oReviewOutcomeVM = ObjectHelper.CreateType<ReviewOutcomeVM>(this.oReviewOutcome.DataContext, ReviewOutcomeVM);
                    oReviewOutcomeVM.ReviewAfterMandatoryConfig = this.IsReviewPeriodMandatory;
                    if (this.objtagheader.StartDate.NotEquals(DateTime.MinValue)) {
                        oReviewOutcomeVM.StartDTTM = this.objtagheader.StartDate;
                    }
                    if (!String.IsNullOrEmpty(this.objtagheader.DoseType)) {
                        oReviewOutcomeVM.DoseType = this.objtagheader.DoseType;
                    }
                    if (!String.IsNullOrEmpty(this.objtagheader.INFTYCODE)) {
                        oReviewOutcomeVM.InfusionType = this.objtagheader.INFTYCODE;
                    }
                    if (!String.IsNullOrEmpty(this.objtagheader.FreqPerodcode)) {
                        oReviewOutcomeVM.FrequencyType = this.objtagheader.FreqPerodcode;
                    }
                    if (!String.IsNullOrEmpty(this.objtagheader.DrugIdentifyingType)) {
                        oReviewOutcomeVM.IdentifyingType = this.objtagheader.DrugIdentifyingType;
                    }
                    if (!String.Equals(this.objtagheader.Duration, 0)) {
                        oReviewOutcomeVM.Duration = this.objtagheader.Duration.ToString();
                        oReviewOutcomeVM.DurationUOM = CConstants.MinuteConceptCode;
                    }
                    if (!String.IsNullOrEmpty(this.objtagheader.InfusionPeriodUOM)) {
                        oReviewOutcomeVM.InfusionPeriodUOM = this.objtagheader.InfusionPeriodUOM;
                    }
                    if (!String.IsNullOrEmpty(this.objtagheader.InfusionPeriod)) {
                        oReviewOutcomeVM.InfusionPeriod = this.objtagheader.InfusionPeriod;
                    }
                    if (this.objtagheader.EndDate.NotEquals(DateTime.MinValue)) {
                        oReviewOutcomeVM.StopDTTM = this.objtagheader.EndDate;
                    }
                    oReviewOutcomeVM.IsPRN = this.objtagheader.IsPRN;
                    oReviewOutcomeVM.CurrentDateTime = CommonBB.GetServerDateTime();
                    if (this.AdminTimeVM != null) {
                        oReviewOutcomeVM.oAdminTimesVM = this.AdminTimeVM;
                    }
                    if (this.objFrequencyDetails != null) {
                        oReviewOutcomeVM.oFrequecydetails = this.objFrequencyDetails;
                    }
                    if (this.objScheduletimes != null && this.objScheduletimes.Count > 0) {
                        if (!String.IsNullOrEmpty(this.objScheduletimes[0].ScheduledTime)) {
                            oReviewOutcomeVM.oAdminDataforFreqDetails = this.objScheduletimes;
                        }
                    }
                    if (this.oChartRow != null && this.oChartRow.TimeSlots != null && this.oChartRow.TimeSlots.Count > 0) {
                        if (!String.IsNullOrEmpty(this.oChartRow.TimeSlots[0].SlotTime)) {
                            if (!((this.objtagheader.IsInfusion && !String.Equals(this.objtagheader.INFTYCODE, InfusionTypeCode.INTERMITTENT)) || (this.objtagheader.IsInfusion && String.Equals(this.objtagheader.INFTYCODE, InfusionTypeCode.INTERMITTENT) && String.Equals(this.objtagheader.DoseType, DoseTypeCode.STEPPEDVARIABLE)) || this.objtagheader.IsPRN || String.Equals(this.objtagheader.FreqPerodcode, CConstants.OnceOnlyPerodCode) || String.Equals(this.objtagheader.DoseType, DoseTypeCode.STEPPEDVARIABLE))) {
                                if (this.DoseCalculationByScheduleTimes(this.oChartRow) != null) {
                                    oReviewOutcomeVM.oAdminDataforFreqDetails = this.DoseCalculationByScheduleTimes(this.oChartRow);
                                }
                                if (this.DoseCalculationByFrequency(this.oChartRow) != null) {
                                    oReviewOutcomeVM.oFrequecydetails = this.DoseCalculationByFrequency(this.oChartRow);
                                }
                            }
                        }
                    }
                    this.oReviewOutcome.onDialogClose = this.oReviewOutcomeChild_Closed;
                    let Callback = (s, e) => {
                        if (s != null && e != null) {
                            this.oReviewOutcome = s;
                        }
                    }
                    this.oReviewOutcome.HelpCode = "MN_PRESCCHART_P2";
                    // ObjectHelper.stopFinishAndCancelEvent(true);
                    AppActivity.OpenWindow("Review prescription item", this.oReviewOutcome, (s)=>{this.oReviewOutcomeChild_Closed(s)}, this.sPrescriptionItemName, true, 640, 520, true, WindowButtonType.OkCancel, null, null, null, Callback);
                }
            }
           catch(ex:any)  {
                let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
            }

        }
 else {
            let lnReturn:number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
        }
    }
private DoseCalculationByFrequency(oChartRow:ChartRow): IPPMAManagePrescSer.IPPFrequency
{
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
                        FrequencyValue.forEach( (item)=> {
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
private oReviewOutcomeChild_Closed(args:AppDialogEventargs): void
    {
        // ObjectHelper.stopFinishAndCancelEvent(false);
        let sResult:string = String.Empty;
        this.IsOmitReinstateReviewClicked = false;
        this.AppDialogWindow = args.AppChildWindow;
        if(args.Result == AppDialogResult.Ok) {
            let _lockedUserDetails: LockedUsersDetails;
            if (!MedicationCommonBB.IsLockStillValid(MedChartData.MedChartOID, "MAReview", (o) => {_lockedUserDetails = o})) {
                let oMsgBox: iMessageBox = new iMessageBox();
                oMsgBox.MessageBoxClose  = (s,e) => { this.oMsgBox_ReviewOutcomeClose(s,e); } ;
                oMsgBox.Title = "Information - Lorenzo";
                oMsgBox.Height = 160;
                oMsgBox.MessageButton = MessageBoxButton.OK;
                oMsgBox.IconType = MessageBoxType.Information;
                if (!String.IsNullOrEmpty(_lockedUserDetails.LockedUserName)) {
                    oMsgBox.Message = String.Format(Resource.MedsAdminPrescChartView.LockMsg_Commenced, _lockedUserDetails.LockedUserName);
                }
                else {
                    oMsgBox.Message = String.Format(Resource.MedsAdminPrescChartView.LockMsg_Abort);
                }
                oMsgBox.Show();
            }
            else {
                let objreviewOutcome: ReviewOutcome = (ObjectHelper.CreateType<ReviewOutcome>(args.Content.Component, ReviewOutcome));
                this.oManageReviewPeriod = null;
                //if (objreviewOutcome.cmdOkClick(this.oManageReviewPeriod)) {
                if (objreviewOutcome.cmdOkClick((o) => { this.oManageReviewPeriod = o; })) {
                    this.oPrescriptionChartVM = new PrescriptionChartVM();
                    //this.oPrescriptionChartVM.ReviewInitiateOutcomeCompleted -= new PrescriptionChartVM.ReviewInitiateOutcomeDelegate(this.oPrescriptionChartVM_ReviewInitiateOutcomeCompleted);
                    this.oPrescriptionChartVM.ReviewInitiateOutcomeCompleted  = (s,e) => { this.oPrescriptionChartVM_ReviewInitiateOutcomeCompleted(); } ;
                    if (this.oManageReviewPeriod != null && this.oManageReviewPeriod.oReviewAfterDetail != null && this.oManageReviewPeriod.oReviewAfterDetail.ReviewOutcome != null && !String.IsNullOrEmpty(this.oManageReviewPeriod.oReviewAfterDetail.ReviewOutcome.Code) && String.Equals(this.oManageReviewPeriod.oReviewAfterDetail.ReviewOutcome.Code, CConstants.ReviewDiscontinue, StringComparison.InvariantCultureIgnoreCase)) {
                        let sMenuCode: string = this.GetMenuCode();
                        PatientContext.PrescriptionType = MedicationCommonBB.GetPrescriptionTypeCode(sMenuCode);
                        //let oDeletedItemsInfo: ObservableCollection<IPPMAManagePrescSer.DeletedItemsInfo> = new ObservableCollection<ManagePrescription.BlueBird.WebUI.IPPMAManagePrescSer.DeletedItemsInfo>();
                        let oDeletedItemsInfo: ObservableCollection<IPPMAManagePrescSer.DeletedItemsInfo> = new ObservableCollection<IPPMAManagePrescSer.DeletedItemsInfo>(); // To be revisit above line
                        
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
                        this.DiscontinueCancelDrugs(oDeletedItemsInfo);
                    }
                    else {
                        this.oPrescriptionChartVM.ReviewAndOutcomeDetails(this.oManageReviewPeriod);
                    }
                    args.AppChildWindow.DialogResult = true;
                }
            }
        }
 else if(args.Result == AppDialogResult.Cancel) {
            sResult = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", MedChartData.MedChartOID, "MAReview", Common.nLockDuration), String);
            args.AppChildWindow.DialogResult = false;
            args.AppChildWindow.DialogRef.close();
            this.oManageReviewPeriod = null;
        }
    }
public omedReviewChild_Closed(args:AppDialogEventargs): void
    {
        // ObjectHelper.stopFinishAndCancelEvent(false);
        if(this.IsReviewIntiateOKClick)
 {
    return
}
let sResult: string = String.Empty;
this.IsOmitReinstateReviewClicked = false;
this.AppDialogWindow = args.AppChildWindow;
if (args.Result == AppDialogResult.Ok) {
    let _lockedUserDetails: LockedUsersDetails;
    if (!MedicationCommonBB.IsLockStillValid(MedChartData.MedChartOID, "MAReview", (o) => {_lockedUserDetails = o})) {
        let oMsgBox: iMessageBox = new iMessageBox();
        oMsgBox.MessageBoxClose  = (s,e) => { this.oMsgBox_ReviewInitiateClose(s,e); } ;
        oMsgBox.Title = "Information - Lorenzo";
        oMsgBox.Height = 160;
        oMsgBox.MessageButton = MessageBoxButton.OK;
        oMsgBox.IconType = MessageBoxType.Information;
        if (!String.IsNullOrEmpty(_lockedUserDetails.LockedUserName)) {
            oMsgBox.Message = String.Format(Resource.MedsAdminPrescChartView.LockMsg_Commenced, _lockedUserDetails.LockedUserName);
        }
        else {
            oMsgBox.Message = String.Format(Resource.MedsAdminPrescChartView.LockMsg_Abort);
        }
        oMsgBox.Show();
    }
    else {
       //let oreview: medReviewChild = (ObjectHelper.CreateType<medReviewChild>(args.Content, medReviewChild));
       this.omedReviewChild = args.Content.Component;

        this.oManageReviewPeriod = null;
      if (this.omedReviewChild.oKClick((o) => { this.oManageReviewPeriod = o; })) {
            this.oPrescriptionChartVM = new PrescriptionChartVM();
            this.oPrescriptionChartVM.ReviewInitiateOutcomeCompleted  = (s,e) => { this.oPrescriptionChartVM_ReviewInitiateOutcomeCompleted(); } ;
            this.oPrescriptionChartVM.ReviewAndOutcomeDetails(this.oManageReviewPeriod);
            this.IsReviewIntiateOKClick = true;
            args.AppChildWindow.DialogResult = true;
        }
    }
}
else if (args.Result == AppDialogResult.Cancel) {
    sResult = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", MedChartData.MedChartOID, "MAReview", Common.nLockDuration), String);
    args.AppChildWindow.DialogResult = false;
    args.AppChildWindow.DialogRef.close();
    this.oManageReviewPeriod = null;
}
}
private oPrescriptionChartVM_ReviewInitiateOutcomeCompleted(): void
    {
        let sResult:string = String.Empty;
        let oTagDrugHeaderDetail:TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(this.oChartRow.DrugItem.Tag, TagDrugHeaderDetail);
        this.IsReviewHighlighted = false;
        if(this.oManageReviewPeriod.NewReviewAfterDTTM.NotEquals(DateTime.MinValue))
 {
    let Tooltip: string = String.Empty;
    oTagDrugHeaderDetail.ReviewDTTM = this.oManageReviewPeriod.NewReviewAfterDTTM;
    this.oChartRow.DrugItem.ReviewLabel = CConstants.ReviewDue;
    this.oChartRow.DrugItem.ReviewVal = this.oManageReviewPeriod.NewReviewAfterDTTM.ToString(CConstants.DateTimeFormat);
    if (this.oManageReviewPeriod.NewReviewAfterDTTM.Date <= this.dtCurrentDateTime.Date) {
        this.oChartRow.DrugItem.ReviewIcon = this.LoadImage(CConstants.ReviewKey, MedImage.GetPath(MedImages.ReviewIcon));
        if (String.Equals(this.oManageReviewPeriod.NewReviewType.Code, CConstants.ReviewGeneralType)) {
            Tooltip = Resource.MedsAdminPrescChartView.ReviewGeneralIcon_Tooltip;
        }
        else {
            Tooltip = Resource.MedsAdminPrescChartView.ReviewOmittedIcon_Tooltip;
        }
        Tooltip += this.oManageReviewPeriod.NewReviewAfterDTTM.ToString(CConstants.DateTimeFormat) + Environment.NewLine;
        if (!String.IsNullOrEmpty(this.oManageReviewPeriod.NewReviewRequestComments)) {
            Tooltip += this.oManageReviewPeriod.NewReviewRequestComments + Environment.NewLine;
        }
        Tooltip += CConstants.TooltipReviewRequestedBy;
        if (ContextManager.Instance["UserName"] != null) {
            let UserName: String = ContextManager.Instance["UserName"].ToString().Split(',')[0] + " " + ContextManager.Instance["UserName"].ToString().Split(',')[1];
            Tooltip += UserName + Environment.NewLine;
        }
        Tooltip += Resource.MedicationChart.UpdateReview_Tooltip;
        this.oChartRow.DrugItem.ReviewIcon.Tooltip = Tooltip;
    }
    else {
        this.oChartRow.DrugItem.ReviewIcon = null;
    }
    if (this.oChartRow != null && this.oManageReviewPeriod != null) {
        this.HighlightCellsWithRed(this.oChartRow, this.oManageReviewPeriod.NewReviewAfterDTTM);
    }
}
 else {
    this.oChartRow.DrugItem.ReviewLabel = String.Empty;
    this.oChartRow.DrugItem.ReviewVal = String.Empty;
    this.oChartRow.DrugItem.ReviewIcon = null;
    oTagDrugHeaderDetail.ReviewDTTM = DateTime.MinValue;
    this.HighlightCellsWithRed(this.oChartRow, oTagDrugHeaderDetail.ReviewDTTM);
}
if (this.oManageReviewPeriod != null && this.oManageReviewPeriod.oReviewAfterDetail != null && this.oManageReviewPeriod.oReviewAfterDetail.ReviewOutcome != null && !String.IsNullOrEmpty(this.oManageReviewPeriod.oReviewAfterDetail.ReviewOutcome.Code) && String.Equals(this.oManageReviewPeriod.oReviewAfterDetail.ReviewOutcome.Code, CConstants.ReviewReinstate, StringComparison.InvariantCultureIgnoreCase)) {
    if (this.SelectedReinstateRow != null) {
        let olstSlotDat: ObservableCollection<SlotData> = new ObservableCollection<SlotData>();
        let daycount: number = this.SelectedReinstateRow.ChartCells.Count;
        for (let i: number = 0; i < daycount; i++) {
            let slotcount: number = this.SelectedReinstateRow.ChartCells[i].Slots.Count();
            for (let j: number = 0; j < slotcount; j++) {
                if ((this.SelectedReinstateRow.ChartCells[i].Slots[j]) instanceof DoseOverviewSlot) {
                    let oTagSlotDetail: TagSlotDetail = ObjectHelper.CreateType<TagSlotDetail>((<DoseOverviewSlot>(this.SelectedReinstateRow.ChartCells[i].Slots[j])).Tag, TagSlotDetail);
                    if (String.Equals(oTagSlotDetail.SlotStatus, SlotStatus.OMITTED, StringComparison.InvariantCultureIgnoreCase) && oTagSlotDetail.SlotDateTime >= this.dtCurrentDateTime) {
                        let oReinstateSlotData: SlotData = new SlotData();
                        oReinstateSlotData.ScheduleDTTM = oTagSlotDetail.SlotDateTime;
                        oReinstateSlotData.SlotStatus = SlotStatus.PLANNED;
                        oReinstateSlotData.MedAdminOID = oTagSlotDetail.MedsAdminOID;
                        olstSlotDat.Add(oReinstateSlotData);
                    }
                }
            }
        }
        let oReinstateVM: ReinstateVM = new ReinstateVM();
        oReinstateVM.UpdatedSlotsData = olstSlotDat;
        oReinstateVM.IsReinstateSuccess = true;
        oReinstateVM.IsChkReinstateAll = true;
        this.omedsadminReinstateslots = new MedsAdminReinstateslots();
        // ObjectHelper.stopFinishAndCancelEvent(true);
        this.omedsadminReinstateslots.DataContext = oReinstateVM;
        if (this.medChartOverview.GetSelectedRows().Count == 1) {
            for (let i: number = 0; i < this.medChartOverview.ChartRows.Count; i++) {
                if (this.medChartOverview.ChartRows[i].DrugItem.Key == this.DrugKey) {
                    this.SelectedRow = i;
                    break;
                }
            }
        }
        this.oReinstateVM_IsSlotUpdatedEvent();
    }
}
else {
    let olstSlotDat: ObservableCollection<SlotData> = new ObservableCollection<SlotData>();
    let daycount: number = this.oChartRow.ChartCells.Count;
    for (let i: number = 0; i < daycount; i++) {
        let slotcount: number = this.oChartRow.ChartCells[i].Slots.Count;
        for (let j: number = 0; j < slotcount; j++) {
            if ((this.oChartRow.ChartCells[i].Slots[j]) instanceof DoseOverviewSlot) {
                let oTagSlotDetail: TagSlotDetail = ObjectHelper.CreateType<TagSlotDetail>((<DoseOverviewSlot>(this.oChartRow.ChartCells[i].Slots[j])).Tag, TagSlotDetail);
                let oReinstateSlotData: SlotData = new SlotData();
                oReinstateSlotData.ScheduleDTTM = oTagSlotDetail.SlotDateTime;
                oReinstateSlotData.MedAdminOID = oTagSlotDetail.MedsAdminOID;
                olstSlotDat.Add(oReinstateSlotData);
            }
        }
    }
    let oReinstateVM: ReinstateVM = new ReinstateVM();
    oReinstateVM.UpdatedSlotsData = olstSlotDat;
    if (this.oChartRow != null && this.oChartRow.DrugItem != null && this.oChartRow.DrugItem.Tag != null) {
        let oTagObj: TagObject = new TagObject();
        oTagObj.oChartCell = this.oChartRow.ChartCells.FirstOrDefault();
        let oEmptyTagObj: TagObject = new TagObject();
         this.medChartOverview.RefreshRow(this.oChartRow, oEmptyTagObj);
         this.medChartOverview.RefreshRow(this.oChartRow, oTagObj);
         //this.iRdb14day_Checked();
        //this.GetChartData(String.Empty, this.dtServerDate);

    }
}
sResult = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", MedChartData.MedChartOID, "MAReview", Common.nLockDuration), String);
}
public DiscontinueCancelDrugs(oDeletedItemsInfo:ObservableCollection<IPPMAManagePrescSer.DeletedItemsInfo> ): void
    {
        let objReqFill:IPPMAManagePrescSer.CReqMsgSubmitDrugs = new IPPMAManagePrescSer.CReqMsgSubmitDrugs();
        objReqFill.oContextInformation = Common.FillContext();
        objReqFill.oMedicationBC = new IPPMAManagePrescSer.Medication(); // revist ManagePrescription.BlueBird.WebUI. removed this
        objReqFill.oMedicationBC.EncounterType = PatientContext.EncounterType;
        this.FillPatientPrescription(objReqFill.oMedicationBC);
let IsSequenceDisCancel:boolean = oDeletedItemsInfo.Any(c => c.PrescriptionItemData != null && c.PrescriptionItemData.ParentPrescriptionItemOID > 0 && c.PrescriptionItemData.InfusionSeqOrder > 0);
        if(IsSequenceDisCancel) {
            objReqFill.oMedicationBC.CACode = "CA_DisCancelPresChart";
        }
objReqFill.oMedicationBC.PatientPrescription.PrescriptionItems = new ObservableCollection<IPPMAManagePrescSer.PrescriptionItemDetails>();

if(objReqFill.oMedicationBC.PatientPrescription.PrescriptionItems.Count==0){
  // objReqFill.oMedicationBC.PatientPrescription.PrescriptionItems = null;
  ObjectHelper.SetNullforArray(objReqFill.oMedicationBC.PatientPrescription.PrescriptionItems);
}
        if(objReqFill.oMedicationBC.CancelledDrugs == null)
 objReqFill.oMedicationBC.CancelledDrugs = new ObservableCollection<IPPMAManagePrescSer.DeletedItemsInfo>();
        objReqFill.oMedicationBC.CancelledDrugs = oDeletedItemsInfo;
       // let objServiceProxy:IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient(BindingObject.GetBasicHttpBindingObject(), new EndpointAddress(WebServiceURLMedicationCommonBB.IPPMAManagePrescriptionWS));
       // To be revisit by suresh 
       let objServiceProxy:IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
  
        objServiceProxy.SubmitDrugsCompleted  = (s,e) => { this.objServiceProxy_SubmitDrugsCompleted(s,e); } ;
        objServiceProxy.SubmitDrugsAsync(objReqFill);
    }
public FillPatientPrescription (SubmitDrug:IPPMAManagePrescSer.Medication): void
    {
        SubmitDrug.PatientPrescription = new IPPMAManagePrescSer.Prescription();
        SubmitDrug.PatientPrescription.PatientOID = Convert.ToInt64(PatientContext.PatientOID);
        SubmitDrug.PatientPrescription.EncounterOID = Convert.ToInt64(ChartContext.EncounterOID);
        SubmitDrug.PatientPrescription.HealthOrganisation = ObjectHelper.CreateObject(new IPPMAManagePrescSer.ObjectInfo(), {
            Name: AppContextInfo.OrganisationName,
            OID: Convert.ToInt64(AppContextInfo.OrganisationOID)
        });
        SubmitDrug.PatientPrescription.PrescriberRole = ObjectHelper.CreateObject(new IPPMAManagePrescSer.ObjectInfo(), {
            OID: Convert.ToInt64(AppContextInfo.JobRoleOID),
            Name: AppContextInfo.RoleProfileName
        });
        SubmitDrug.PatientPrescription.Specialty = ObjectHelper.CreateObject(new IPPMAManagePrescSer.ObjectInfo(), { OID: Convert.ToInt64(AppContextInfo.SpecialtyOID) });
        SubmitDrug.PatientPrescription.PrescriptionType = PatientContext.PrescriptionType;
        SubmitDrug.PatientPrescription.PrintStatus = "N";
        //SubmitDrug.PatientPrescription.PrescriberDetails = ObjectHelper.CreateObject(new IPPMAManagePrescSer.ObjectInfo(), { OID: ContextInfo.UserOID });
        SubmitDrug.PatientPrescription.PrescriberDetails = ObjectHelper.CreateObject(new IPPMAManagePrescSer.ObjectInfo(), { OID: ContextManager.Instance['UserOID'] });
        SubmitDrug.PatientPrescription.IsMergedPatient = PatientContext.PatientOID != PatientContext.MergedPatientOID ? "1" : "0";
        SubmitDrug.PatientPrescription.MCVersionNo = AppSessionInfo.AMCV;
    }
 objServiceProxy_SubmitDrugsCompleted (sender:Object, e:IPPMAManagePrescSer.SubmitDrugsCompletedEventArgs): void
    {
        if(this.discanc != null)
{
    this.discanc.appDialog.DialogResult = true;
}
let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", MedChartData.MedChartOID, "MedDiscontinueCancel", Common.nLockDuration), String);
sResult = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", MedChartData.MedChartOID, "MAReview", Common.nLockDuration), String);
this.RefreshChart();
if (this.DataContext instanceof PrescriptionChartVM && (ObjectHelper.CreateType<PrescriptionChartVM>(this.DataContext, PrescriptionChartVM)) != null) {
    (ObjectHelper.CreateType<PrescriptionChartVM>(this.DataContext, PrescriptionChartVM)).SetHeightweightPopUp();
}
}
public DisplayDischargeSummaryMessage(): void
    {
        this.oPrescriptionChartVM.GetDischargeWizardData();
        MedChartData.PatinetInfo = Common.GetPatientInfo();
        if(this.oPrescriptionChartVM != null && (MedChartData.PatinetInfo != null && !String.IsNullOrEmpty(MedChartData.PatinetInfo.Observation)))
 {
    let sHtWtBSA: string = MedChartData.PatinetInfo.Observation;
    if (!String.IsNullOrEmpty(PatientContext.BSA))
        sHtWtBSA += " " + PatientContext.BSA + MedsAdminChartToolTip.PatientBSAUOMText;
    this.oPrescriptionChartVM.PatientHtWtBSAText = sHtWtBSA;
}
if (String.Compare(this.oPrescriptionChartVM.sTypeExist, "true", StringComparison.CurrentCultureIgnoreCase) == 0) {
    let oDischargeSummaryMsg: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
        Title: "Lorenzo - Manage prescription",
        MessageButton: MessageBoxButton.OK,
        IconType: MessageBoxType.Information,
        Message: "One or more discharge summaries exist for the patient for the current encounter. Please update the discharge summary accordingly."
    });
    oDischargeSummaryMsg.MessageBoxClose  = (s,e) => { this.oDischargeSummaryMsg_MessageBoxClose(s,e); } ;
    oDischargeSummaryMsg.Show();
}
else {
    this.oPrescriptionChartVM.nPatTotCount = 0;
    this.oPrescriptionChartVM.iIndex = 1;
}
}
oDischargeSummaryMsg_MessageBoxClose(sender:Object, e:MessageEventArgs): void
    {
        if(e.MessageBoxResult == MessageBoxResult.OK) {
            this.oPrescriptionChartVM.nPatTotCount = 0;
            this.oPrescriptionChartVM.iIndex = 1;
        }
    }
// cmdFluidBalance_Click(sender?:Object, e?:RoutedEventArgs): void
//     {
//         Common.LaunchFBChart();
//         this.showPopup=false;
//         //this.popup.IsOpen = false; // to be revisit by suresh
//     }
 MoreActions_Click(sender:Object, e?:RoutedEventArgs): void
    {
        this.disableClick = false;
        this.showPopup=!this.showPopup;        
        this.MoreActions.IsHitTestVisible = false;
        let btnLegend:Button = ObjectHelper.CreateType<Button>(sender, Button);
        let btnTop:number, btnLeft ;
        if(btnLegend != null && this.LgndClickCount % 2 == 0) {
            //this.SeedCanvas.Visibility = Visibility.Visible;
             //Below code are commented, we are not going to support TransformToVisual and animation #36610
            // let gt: GeneralTransform = btnLegend.TransformToVisual(this);
            // let btnOffset: Point = gt.Transform(new Point(0, 0));
            //btnTop = btnOffset.Y;
            //btnLeft = btnOffset.X;
            // let height: number = btnTop - 160;
            // let width: number = btnLeft - 60;
            // this.SeedCanvas.Margin = new Thickness(width, height, 0, 0);
           // this.showPopup=!this.showPopup;
            //this.popup.IsOpen = true; // to be revisit by suresh
        }
    }
private popup_Opened(sender:Object, e:EventArgs): void
    {
        this._PopupParent = this.FindHighestAncestor(this.popup);
        if(this._PopupParent == null)
 {
    return
}
this.LgndClickCount++;
//To be Revisit
//this._PopupParent.AddHandler(Popup.MouseLeftButtonDownEvent, <MouseButtonEventHandler>this.popup_MouseLeftButtonDown, true);
}
private popup_Closed(sender:Object, e:EventArgs): void
    {
        if(this._PopupParent == null)
 {
    return
}
this.LgndClickCount--;
// To be revisit : refer MedsAdminChartView.ts
//this._PopupParent.RemoveHandler(Popup.MouseLeftButtonDownEvent, <MouseButtonEventHandler>this.popup_MouseLeftButtonDown);
  this.MoreActions.IsHitTestVisible = true;
}
private popup_MouseLeftButtonDown(sender:Object, e:MouseButtonEventArgs): void
    {
      //Shiva said Below code is commented because we are not going to do storyboard and animation 
      //refer MedsAdminChartView.ts - same function commented in this file also.

        // let storyboard = ObjectHelper.CreateObject(new Storyboard(), { Duration: TimeSpan.Zero });
        // let objectAnimation = ObjectHelper.CreateObject(new ObjectAnimationUsingKeyFrames(), { Duration: TimeSpan.Zero });
        // objectAnimation.KeyFrames.Add(ObjectHelper.CreateObject(new DiscreteObjectKeyFrame(), { KeyTime: KeyTime.FromTimeSpan(TimeSpan.Zero), Value: false }));
        // Storyboard.SetTarget(objectAnimation, this.popup);
        // Storyboard.SetTargetProperty(objectAnimation, new PropertyPath("IsOpen"));
        // storyboard.Children.Add(objectAnimation);
        // storyboard.Begin();
    }
private FindHighestAncestor(popup:any): FrameworkElement
{
    let ancestor = <FrameworkElement>popup;
    while (true) {
        let parent = ObjectHelper.CreateType<FrameworkElement>(VisualTreeHelper.GetParent(ancestor), FrameworkElement);
        if (parent == null) {
            return ancestor;
        }
        ancestor = parent;
    }
}
cmdSupplyInstructions_Click(sender?:Object, e?:RoutedEventArgs): void
    {
      //let lstInvalidPrescriptionStatus:List < string >  =  ObjectHelper.CreateObject(new List<string>(),{CConstants.DISCONTINUED, CConstants.COMPLETED, CConstants.CANCELLED, CConstants.ONHOLD, CConstants.AWAITINGAUTHORISE, CConstants.NOTAUTHORISED });
        let lstInvalidPrescriptionStatus: string[]=[CConstants.DISCONTINUED, CConstants.COMPLETED, CConstants.CANCELLED, CConstants.ONHOLD, CConstants.AWAITINGAUTHORISE, CConstants.NOTAUTHORISED ];
this.SupplyIdentifyingType = String.Empty;
if (this.CheckStatus()) {
    let sMenuCode: string = String.Empty;
    let CACode: string = String.Empty;
    let SelectedCnt: number = this.medChartOverview.GetSelectedRows().Where(obj => (obj.DrugItem != null) && (obj.DrugItem.Tag != null) && (obj.DrugItem.Tag instanceof TagDrugHeaderDetail) && (lstInvalidPrescriptionStatus.Contains((ObjectHelper.CreateType<TagDrugHeaderDetail>(obj.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus) == false)).Count();
    let SuppliedSelectedCnt: number = this.medChartOverview.GetSelectedRows().Where(x => (x.DrugItem != null) && (x.DrugItem.Tag != null) && (x.DrugItem.Tag instanceof TagDrugHeaderDetail) && (lstInvalidPrescriptionStatus.Contains((ObjectHelper.CreateType<TagDrugHeaderDetail>(x.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus) == false) && ((!String.IsNullOrEmpty((ObjectHelper.CreateType<TagDrugHeaderDetail>(x.DrugItem.Tag, TagDrugHeaderDetail)).SupplyInstructions)) || (!String.IsNullOrEmpty((ObjectHelper.CreateType<TagDrugHeaderDetail>(x.DrugItem.Tag, TagDrugHeaderDetail)).SupplyComments)))).Count();
    let TotalCnt: number = this.medChartOverview.ChartRows.Where(x => (x.DrugItem != null) && (x.DrugItem.Tag != null) && (x.DrugItem.Tag instanceof TagDrugHeaderDetail) && (lstInvalidPrescriptionStatus.Contains((ObjectHelper.CreateType<TagDrugHeaderDetail>(x.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus) == false)).Count();
    let SuppliedTotalCnt: number = this.medChartOverview.ChartRows.Where(x => (x.DrugItem != null) && (x.DrugItem.Tag != null) && (x.DrugItem.Tag instanceof TagDrugHeaderDetail) && (lstInvalidPrescriptionStatus.Contains((ObjectHelper.CreateType<TagDrugHeaderDetail>(x.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus) == false) && ((!String.IsNullOrEmpty((ObjectHelper.CreateType<TagDrugHeaderDetail>(x.DrugItem.Tag, TagDrugHeaderDetail)).SupplyComments)) || (!String.IsNullOrEmpty((ObjectHelper.CreateType<TagDrugHeaderDetail>(x.DrugItem.Tag, TagDrugHeaderDetail)).SupplyInstructions)))).Count();
    if (SelectedCnt > 1) {
        this.sPrescritionOIDs = new StringBuilder();
        this.sMultipleIdentifyingOid = new StringBuilder();
        this.sMultipleIdentifyingType = new StringBuilder();
        let DrugHDDet: TagDrugHeaderDetail = new TagDrugHeaderDetail();
        this.medChartOverview.GetSelectedRows().forEach( (obj)=> {
            DrugHDDet = (<TagDrugHeaderDetail>(obj.DrugItem.Tag));
            let sPrescriptionItemOID: string = String.Empty;
            if (DrugHDDet.PrescriptionItemOID != 0 && lstInvalidPrescriptionStatus.Contains(DrugHDDet.PrescriptionItemStatus) == false) {
                if (!String.IsNullOrEmpty(this.sPrescritionOIDs.ToString())) {
                    this.sPrescritionOIDs.Append("," + DrugHDDet.PrescriptionItemOID);
                    this.sMultipleIdentifyingOid.Append("," + DrugHDDet.DrugIdentifyingOID);
                    this.sMultipleIdentifyingType.Append("," + DrugHDDet.DrugIdentifyingType);
                }
                else {
                    this.sPrescritionOIDs.Append(DrugHDDet.PrescriptionItemOID);
                    this.sMultipleIdentifyingOid.Append(DrugHDDet.DrugIdentifyingOID);
                    this.sMultipleIdentifyingType.Append(DrugHDDet.DrugIdentifyingType);
                }
            }
        });
        if (SuppliedSelectedCnt > 0) {
            this.msg = new iMessageBox();
            this.msg.Title = "Lorenzo";
            this.msg.MessageButton = MessageBoxButton.YesNo;
            this.msg.MessageBoxClose  = (s,e) => { this.SupplyInstructionsWizardOpen(s,e); } ;
            this.msg.Message = String.Format(Resource.MedsAdminPrescChartView.SupplyInstructionMessage, SuppliedSelectedCnt, SelectedCnt);
            this.msg.Show();
            this.msg.Width = 400;
            this.msg.Height = 160;
            this.showPopup=false;
           // this.popup.IsOpen = false; // to be revisit by suresh
        }
        else {
            this.LaunchSupplyWizard();
        }
    }
    else if (SelectedCnt == 0) {
        this.sPrescritionOIDs = new StringBuilder();
        this.sMultipleIdentifyingOid = new StringBuilder();
        this.sMultipleIdentifyingType = new StringBuilder();
        let DrugHDDet: TagDrugHeaderDetail = new TagDrugHeaderDetail();
        this.medChartOverview.ChartRows.forEach( (obj)=> {
            let sPrescriptionItemOID: string = String.Empty;
            DrugHDDet = (<TagDrugHeaderDetail>(obj.DrugItem.Tag));
            if (DrugHDDet.PrescriptionItemOID != 0 && lstInvalidPrescriptionStatus.Contains(DrugHDDet.PrescriptionItemStatus) == false) {
                if (!String.IsNullOrEmpty(this.sPrescritionOIDs.ToString())) {
                    this.sPrescritionOIDs.Append("," + DrugHDDet.PrescriptionItemOID);
                    this.sMultipleIdentifyingOid.Append("," + DrugHDDet.DrugIdentifyingOID);
                    this.sMultipleIdentifyingType.Append("," + DrugHDDet.DrugIdentifyingType);
                }
                else {
                    this.sPrescritionOIDs.Append(DrugHDDet.PrescriptionItemOID);
                    this.sMultipleIdentifyingOid.Append(DrugHDDet.DrugIdentifyingOID);
                    this.sMultipleIdentifyingType.Append(DrugHDDet.DrugIdentifyingType);
                }
            }
        });
        if (SuppliedTotalCnt > 0) {
            this.msg = new iMessageBox();
            this.msg.Title = "Lorenzo";
            this.msg.MessageButton = MessageBoxButton.YesNo;
            this.msg.MessageBoxClose  = (s,e) => { this.SupplyInstructionsWizardOpen(s,e); } ;
            this.msg.Message = String.Format(Resource.MedsAdminPrescChartView.SupplyInstructionMessage, SuppliedTotalCnt, TotalCnt);
            this.msg.Show();
            this.msg.Width = 400;
            this.msg.Height = 160;
            this.showPopup=false;
            //this.popup.IsOpen = false; // to be revisit by suresh
        }
        else {
            this.LaunchSupplyWizard();
        }
    }
    else {
        this.sPrescritionOIDs = new StringBuilder();
        this.sMultipleIdentifyingOid = new StringBuilder();
        this.sMultipleIdentifyingType = new StringBuilder();
        let DrugHDDet: TagDrugHeaderDetail = new TagDrugHeaderDetail();
        this.medChartOverview.GetSelectedRows().forEach( (obj)=> {
            DrugHDDet = (<TagDrugHeaderDetail>(obj.DrugItem.Tag));
            this.sPrescritionOIDs.Append(DrugHDDet.PrescriptionItemOID);
            if (obj.DrugItem != null && obj.DrugItem.Tag != null) {
                this.sMultipleIdentifyingOid.Append(DrugHDDet.DrugIdentifyingOID);
                this.sMultipleIdentifyingType.Append(DrugHDDet.DrugIdentifyingType);
                if ((DrugHDDet.RouteOID != 0)) {
                    this.SupplyRouteOID = DrugHDDet.RouteOID.ToString();
                }
                if (!String.IsNullOrEmpty(DrugHDDet.DrugIdentifyingType)) {
                    this.SupplyIdentifyingType = (DrugHDDet.DrugIdentifyingType);
                }
                if (!String.IsNullOrEmpty(DrugHDDet.DrugName)) {
                    this.SupplyIdentifyingName = (DrugHDDet.DrugName);
                }
                if ((DrugHDDet.DosageFormOID != 0)) {
                    this.SupplyFormOID = DrugHDDet.DosageFormOID.ToString();
                }
                if (!String.IsNullOrEmpty(DrugHDDet.LorenzoID)) {
                    this.SupplyLorenzoID = (DrugHDDet.LorenzoID);
                }
                if (DrugHDDet.DrugIdentifyingOID != 0) {
                    this.SupplyIdentifyingOID = DrugHDDet.DrugIdentifyingOID.ToString();
                }
                if (!String.IsNullOrEmpty(DrugHDDet.SupplyComments)) {
                    this.SupplyComments = (DrugHDDet.SupplyComments);
                }
                if (!String.IsNullOrEmpty(DrugHDDet.SupplyInstructions)) {
                    let x: string[] = (DrugHDDet.SupplyInstructions).Split(';');
                    if (x.length > 0) {
                        for (let i: number = 0; i < x.length; i++) {
                            x[i] = Common.GetConceptCode(x[i], ValueDomainValues.oMedSupp);
                        }
                        this.SupplyInstructions = this.GetSupplyInstructionsString(x, x.length);
                    }
                }
                if (!String.IsNullOrEmpty(DrugHDDet.StrengthText)) {
                    this.SupplyStrengthText = (DrugHDDet.StrengthText);
                }
                if (!String.IsNullOrEmpty(DrugHDDet.Route)) {
                    let MultiRoutelst: string[] = DrugHDDet.Route.Split("|");
                    let MultiRouteOIDs: string[] = null;
                    if (MultiRoutelst.Count() > 0) {
                        MultiRouteOIDs = new Array(MultiRoutelst.Count());
                        for (let i = 0; i < MultiRoutelst.Count(); i++) {
                            let MultiRouteSPlit: string[] = MultiRoutelst[i].Split("~");
                            if (MultiRouteSPlit.Count() == 3) {
                                MultiRouteOIDs[i] = MultiRouteSPlit[0];
                            }
                        }
                        if (MultiRouteOIDs.Count() > 0) {
                            for (let j = 0; j < MultiRouteOIDs.Count(); j++) {
                                if (String.IsNullOrEmpty(this.SupplyRouteOIDs)) {
                                    this.SupplyRouteOIDs = MultiRouteOIDs[j];
                                }
                                else {
                                    this.SupplyRouteOIDs = this.SupplyRouteOIDs + "," + MultiRouteOIDs[j];
                                }
                            }
                        }
                    }
                }
            }
        });
        this.LaunchSupplyWizard();
    }
}
else {
    let oCV: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
        Title: "Lorenzo - Manage prescription",
        MessageButton: MessageBoxButton.OK,
        IconType: MessageBoxType.Information,
        Message: Resource.MedsAdminPrescChartView.SupplyNoItems_Message
    });
    oCV.Show();
}
}
SupplyInstructionsWizardOpen(sender:Object, e:MessageEventArgs): void
    {
        if(e.MessageBoxResult == MessageBoxResult.Yes) {
            this.LaunchSupplyWizard();
        }
    }
public GetSupplyInstructionsString(input:string[], count:number): string
{
    let SupplyInstructions: string = String.Empty;
    let oSupplyInstructions: StringBuilder = new StringBuilder();
    for (let i: number = 0; i < count; i++) {
        if (input != null && i > 0) {
            oSupplyInstructions.Append(";");
        }
        oSupplyInstructions.Append(input[i]);
    }
    if (oSupplyInstructions != null && oSupplyInstructions.Length > 0) {
        SupplyInstructions = oSupplyInstructions.ToString();
    }
    return SupplyInstructions;
}
public LaunchSupplyWizard(): void
    {
        this.IsChartRefreshedRequired = true;
        this.IsInpatientClicked = false;
        this.IsDischargeClicked = false;
        this.IsAmendClicked = false;
        this.IsDiscontinueCancelClicked = false;
        this.IsCVClicked = false;
        this.IsReviewClicked = false;
        let CACode:string = "MN_PRESCCHART_P2";
        let sMenuCode:string = CConstants.SupplyInstr_Menucode;
        let sQuery:string = "&MenuCode=" + sMenuCode;
        sQuery += "&PATIENTOID=" + PatientContext.PatientOID;
        if(PatientContext.EncounterOid > 0)
 sQuery += "&EncounterOID=" + PatientContext.EncounterOid;
        else sQuery += "&EncounterOID=" + ChartContext.EncounterOID;
        sQuery += "&PrescType=" + PrescriptionTypes.ForAdministration;
        if(!String.IsNullOrEmpty(this.sPrescritionOIDs.ToString()))
{
    sQuery += "&PRESCRIPTIONOID=" + this.sPrescritionOIDs.ToString();
}
 else sQuery += "&PRESCRIPTIONOID=" + "";
sQuery += "&LaunchFrom=" + CACode;
sQuery += "&CallingFrom=" + CACode;
sQuery += "&SupplyInstruction=" + this.SupplyInstructions;
if (this.SupplyComments.Contains('\n')) {
    this.SupplyComments = this.SupplyComments.Replace("\n", ";~@");
}
sQuery += "&SupplyComments=" + this.SupplyComments;
sQuery += "&ENCTYPE=" + PatientContext.EncounterType;
sQuery += "&IdentifyingOID=" + this.SupplyIdentifyingOID;
sQuery += "&RouteOID=" + this.SupplyRouteOID;
sQuery += "&DosageFormOID=" + this.SupplyFormOID;
sQuery += "&LorenzoId=" + this.SupplyLorenzoID;
sQuery += "&IdentifyingName=" + this.SupplyIdentifyingName;
sQuery += "&IdentifyingType=" + this.SupplyIdentifyingType;
sQuery += "&MultipleIdentifyingOID=" + this.sMultipleIdentifyingOid.ToString();
sQuery += "&MultipleIdentifyingType=" + this.sMultipleIdentifyingType.ToString();
sQuery += "&StrengthText=" + this.SupplyStrengthText;
sQuery += "&RouteOIDs=" + this.SupplyRouteOIDs;
sQuery += "&SuppInstrInvokedFromPresChart=TRUE";
this.oPrescriptionChartVM = ObjectHelper.CreateType<PrescriptionChartVM>(this.DataContext, PrescriptionChartVM);
this.oPrescriptionChartVM.sLastCACode = sMenuCode;
    AppLoadService.LaunchWizard((args) => this.OnChildWizardClose(args), sMenuCode, sQuery);
this.showPopup=false;
//this.popup.IsOpen = false; // to be revisit by suresh
}
cmdTechValidate_Click(sender?:Object, e?:RoutedEventArgs): void
    {
        if(this.CheckStatus())
 {
    this.sKeyCodeValues = "MedTVInpatient";
    let _LockedUsersDetails: LockedUsersDetails;
    //this.IsLock = MedicationCommonBB.IsLockedByAnotherUser(PrescriptionTypesMenuCode.TechValidate, true, _LockedUsersDetails);
    this.IsLock = MedicationCommonBB.IsLockedByAnotherUser(PrescriptionTypesMenuCode.TechValidate, true, (o) => { _LockedUsersDetails = o; });
    if (_LockedUsersDetails != null && !String.IsNullOrEmpty(_LockedUsersDetails.WarningMessage)) {
        if (!String.IsNullOrEmpty(_LockedUsersDetails.ErrorCode) && String.Equals(_LockedUsersDetails.ErrorCode, CConstants.LockErrorcode, StringComparison.InvariantCultureIgnoreCase)) {
            this.msg = new iMessageBox();
            this.msg.Title = "Lorenzo";
            this.msg.MessageButton = MessageBoxButton.OK;
            this.msg.MessageBoxClose  = (s,e) => { this.MedChartlockWarning_MessageBoxClose(s,e); } ;
            this.msg.Message = _LockedUsersDetails.WarningMessage;
            this.msg.Show();
            this.showPopup=false;
           // this.popup.IsOpen = false; // to be revisit by suresh
        }
        else if (!String.IsNullOrEmpty(_LockedUsersDetails.ErrorCode) && String.Equals(_LockedUsersDetails.ErrorCode, CConstants.ReadOnlyErrorcode, StringComparison.InvariantCultureIgnoreCase)) {

        }
        else if (!String.IsNullOrEmpty(_LockedUsersDetails.ErrorCode) && String.Equals(_LockedUsersDetails.ErrorCode, CConstants.WarningErrorcode, StringComparison.InvariantCultureIgnoreCase)) {

        }
    }
    else {
        this.IsChartRefreshedRequired = true;
        let sMenuCode: string = String.Empty;
        let CACode: string = String.Empty;
        MedChartData.CalledFrom = String.Empty;
        CACode = "MN_PRESCCHART_P2";
        sMenuCode = PrescriptionTypesMenuCode.TechValidate;
        let sQuery: string = "&MenuCode=" + sMenuCode;
        sQuery += "&PATIENTOID=" + PatientContext.PatientOID;
        if (PatientContext.EncounterOid > 0)
            sQuery += "&EncounterOID=" + PatientContext.EncounterOid;
        else sQuery += "&EncounterOID=" + ChartContext.EncounterOID;
        sQuery += "&PrescType=" + PrescriptionTypes.ForAdministration;
        sQuery += "&PRESCRIPTIONOID=" + "";
        sQuery += "&LaunchFrom=" + CACode;
        sQuery += "&CallingFrom=" + CACode;
        sQuery += "&ENCTYPE=" + PatientContext.EncounterType;
        if (PatientContext.EncounterOid > 0)
            sQuery += "&RequestLockOID=" + PatientContext.EncounterOid;
        else sQuery += "&RequestLockOID=" + ChartContext.EncounterOID;
        this.oPrescriptionChartVM = ObjectHelper.CreateType<PrescriptionChartVM>(this.DataContext, PrescriptionChartVM);
        this.oPrescriptionChartVM.sLastCACode = sMenuCode;
        let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", PatientContext.EncounterOid, "MedTVInpatient", Common.nLockDuration), String);
       // AppLoadService.LaunchWizard((args)=>this.OnChildWizardClose(args), sMenuCode, sQuery); //To be Re-Visited Suresh removed App.(App.LaunchWizard)
       AppLoadService.LaunchWizard((args)=>this.OnChildWizardClose(args), sMenuCode, sQuery); 
       this.showPopup=false;
        //this.popup.IsOpen = false; // to be revisit by suresh
    }
}
 else {
    let oTV: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
        Title: "Lorenzo - Manage prescription",
        MessageButton: MessageBoxButton.OK,
        IconType: MessageBoxType.Information,
        Message: Resource.MedsAdminPrescChartView.TVMsg_Prescribechart
    });
    oTV.Show();
}
}
public CheckStatus(): boolean
{
    let bValidStatusExist: boolean = false;
    //let lstInvalidPrescriptionStatus: List<string> = ObjectHelper.CreateObject(new List<string>(), { CConstants.DISCONTINUED CConstants.COMPLETED, CConstants.CANCELLED, CConstants.ONHOLD, CConstants.AWAITINGAUTHORISE, CConstants.NOTAUTHORISED });
    //let lstInvalidPrescriptionStatus: List<string> = ObjectHelper.CreateObject(new List<string>(), [CConstants.DISCONTINUED, CConstants.COMPLETED, CConstants.CANCELLED, CConstants.ONHOLD, CConstants.AWAITINGAUTHORISE, CConstants.NOTAUTHORISED] );
     let lstInvalidPrescriptionStatus: List<string> = new List<string>([CConstants.DISCONTINUED, CConstants.COMPLETED, CConstants.CANCELLED, CConstants.ONHOLD, CConstants.AWAITINGAUTHORISE, CConstants.NOTAUTHORISED]);
    
    if (this.medChartOverview != null && this.medChartOverview.ChartRows != null) {
        bValidStatusExist = this.medChartOverview.ChartRows.Any(x => (x.DrugItem != null) && (x.DrugItem.Tag != null) && (x.DrugItem.Tag instanceof TagDrugHeaderDetail) && lstInvalidPrescriptionStatus.Contains((ObjectHelper.CreateType<TagDrugHeaderDetail>(x.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus) == false);
    }
    return bValidStatusExist;
}
// closepopup(event){
//     let checkmorelink = [];
//     if((event.target.nodeName =='BUTTON' && event.target.innerText == 'More actions')|| (event.target.nodeName =='IMG' && event.target.parentNode.parentNode.innerText=='More actions')){
//         this.showPopup = true;
//     }else{
//         this.showPopup = false;
//     }
// }

    cmdClinicallyVerify_Click(sender?: Object, e?: RoutedEventArgs): void {
        if (this.CheckStatus()) {
            this.IsChartRefreshedRequired = true;
            this.IsInpatientClicked = false;
            this.IsDischargeClicked = false;
            this.IsAmendClicked = false;
            this.IsDiscontinueCancelClicked = false;
            this.IsCVClicked = true;
            this.IsReviewClicked = false;
            Common.GPCConsentVerifyStatus = String.Empty;
            this.CheckOpenSectionExists();
            this.showPopup = false;
            //this.popup.IsOpen = false; // to be revisit by suresh
        }
        else {
            let oCV: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                Title: "Lorenzo - Manage prescription",
                MessageButton: MessageBoxButton.OK,
                IconType: MessageBoxType.Information,
                Message: Resource.MedsAdminPrescChartView.CVMsg_Prescribechart
            });
            oCV.Show();
        }
    }
}
