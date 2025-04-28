import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity, AppLoadService } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ChildWindow, Visibility, List, ObservableCollection, Random, IEnumerable, HtmlPage } from 'epma-platform/models';
import { AppDialog, Color, Colors, FrameworkElement, HeaderImageAlignment, HeaderImageListItem, KeyEventArgs, Run, ScrollViewer, SolidColorBrush, TextBlock, iButton, iCheckBox, iLabel, iTab, iTabItem, iTextBox } from 'epma-platform/controls';
import 'epma-platform/stringextension';
import DateTime, { DateTimeKind } from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { UserControl } from 'epma-platform/controls';
import { MedsAdminStrikethrough } from '../child/MedsAdminStrikethrough';
import { MedsAdminModifyOrStrikethrough } from '../child/MedsAdminModifyOrStrikethrough';
import { medddetailsChild } from 'src/app/lorappmedicationcommonbb/child/medddetailschild';
import { GetMedsChartData } from '../common/getmedschartdata';
import { iMedicationChart } from 'src/app/lorarcbluebirdmedicationchart/iMedicationChart/iMedicationChart.component';
import { AdministrationDetailVM, OverViewChartData, SlotDetailVM } from '../viewmodel/MedicationChartVM';
import { TagObject } from 'src/app/lorarcbluebirdmedicationchart/common/TagObject';
import { DoseOverviewSlot } from 'src/app/lorarcbluebirdmedicationchart/common/DoseOverViewSlot';
import { MedTitratedDose } from 'src/app/lorappmedicationcommonbb/view/medtitrateddose';
import { medMCItems } from 'src/app/lorappmedicationcommonbb/view/medmcitems';
import { CConstants, ChartType, DoseTypeCode, InfusionRecordAdminTypeCodes, InfusionTypesCode, LaunchAdminType, MedAction, MedImage, MedImages, MedicationAction, MultiRouteType, PrescriptionTypes, RecordAdminType, SlotStatus } from '../utilities/CConstants';
import { CommPrescriptionItemViewVM } from 'src/app/lorappmedicationcommonbb/viewmodel/prescriptionitemviewvm';
import { MultipleDoseDetail, PrescriptionItemDetailsVM } from 'src/app/lorappmedicationcommonbb/viewmodel/prescriptionitemdetailsvm';
import { Grid, RowDefinition } from 'src/app/shared/epma-platform/controls/epma-grid/epma-grid.component';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { ChartContext, MedChartData, MedChartDefaultData, TagDrugHeaderDetail, TagSlotDetail, ValueDomainValues } from '../utilities/globalvariable';
import { AppSessionInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { MedicationAdminVM } from '../ca/medicationadmin/medicationadminvm';
import { MedicationCommonProfileData } from 'src/app/product/shared/models/MedCommonbbProfiledata';
import { ProfileData, UserPermissions } from '../utilities/ProfileData';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { ChartRow } from 'src/app/lorarcbluebirdmedicationchart/common/ChartRow';
import { Resource } from '../resource';
import { ChartIcon } from 'src/app/lorarcbluebirdmedicationchart/common/ChartIcon';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { MedDoseDetails } from 'src/app/lorappmedicationcommonbb/view/meddosedetails';
import { ActivityCode, Common, EventsWithNotKnownStatus } from '../utilities/common';
import { MedicationAdministrator } from '../resource/medicationadministrator.designer';
import { CCommSequentialHelper } from 'src/app/lorappmedicationcommonbb/utilities/CSequentialHelper';
import { ConditionalDoseVM, RequestSource } from 'src/app/lorappmedicationcommonbb/viewmodel/ConditionalDoseVM';
import { MedConditionalDose } from 'src/app/lorappmedicationcommonbb/view/medconditionaldose';
import { MedsAdminChartToolTip } from '../resource/medsadmincharttooltip.designer';
import { DrugItem } from 'src/app/lorarcbluebirdmedicationchart/common/DrugItem';
import { SlotAdministrationHelper } from '../common/slotadministrationhelper';
import { TodayMultiSlot } from 'src/app/lorarcbluebirdmedicationchart/common/TodayMultiSlot';
import { CDrugHdrAddnlInfo, CDrugHeader, DrugHeaderItem, DrugHeader as DrugHeader1 } from '../common/drugheader';
import { MedsRecordAdminstrator } from '../child/medsadminrecordadmin';
import { InfRecAdminTypeCode, InfusionRecAdminHelper } from '../utilities/InfusionRecAdminHelper';
import { AdministrationDetail, CALaunch, DrugDetail, DrugHeader, Encounter, InfusionAdminDetail, SlotDetail } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { AdministratedSlot } from 'src/app/lorarcbluebirdmedicationchart/common/AdministratedSlot';
import { INFRecordAdminParams } from '../utilities/InfusionChartHelper';
import { ChartCell } from 'src/app/lorarcbluebirdmedicationchart/common/ChartCell';
import { TimeSlot } from 'src/app/lorarcbluebirdmedicationchart/common/TimeSlot';
import { IChartSlot } from 'src/app/lorarcbluebirdmedicationchart/common/IChartSlot';
import { BlankSlot } from 'src/app/lorarcbluebirdmedicationchart/common/BlankSlot';
import { ModifyStrikethroughLink } from '../child/ModifyStrikethroughLink';
import { ManageBarcodeHelper } from '../common/ManageBarcodeHelper';
import { DefaultSlot } from 'src/app/lorarcbluebirdmedicationchart/common/DefaultSlot';
import { LineBreak } from 'src/app/shared/epma-platform/controls/Control';
import { InfusionTypeCode, SVIconLaunchFrom } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { PropertyChangedEventArgs } from 'src/app/shared/epma-platform/controls/epma-tab/epma-tab.component';
import { MixedMultiRouteAdminSelection } from '../child/MixedMultiRouteAdminSelection';
import { WizardType } from 'src/app/shared/epma-platform/models/eppma-common-types';
import { MedSortFilterbyOptions } from '../child/MedSortFilterbyOptions';
import { MedSteppedFullPrescriptionVW } from 'src/app/lorappmedicationcommonbb/view/medSteppedFullPrescriptionVW';
import { StackPanel } from 'src/app/shared/epma-platform/controls-model/StackPanel';
var that;

@Component({
  selector: 'medsadmin-chartoverview',
  templateUrl: './MedsAdminChartOverview.html',
  styleUrls: ['./MedsAdminChartOverview.css']
})

export class MedsAdminChartOverView extends UserControl implements AfterViewInit, OnInit, OnDestroy {

  @Input() get isChildWizard(){
    return AppLoadService.isChildWizard;
}

  oMixedMultiRouteSel: MixedMultiRouteAdminSelection;
  objStepped: MedSteppedFullPrescriptionVW; // #46230 - bug Now Implemented.  past => #36485 bug - not implemented
  oMAST: MedsAdminStrikethrough;
  oMAModorST: MedsAdminModifyOrStrikethrough;
  // medChartOverview: iMedicationChart = null;
  // medChartOverview: iMedicationChart = new iMedicationChart();
  private medChartOverview: iMedicationChart = new iMedicationChart();
  @ViewChild("MedicationChartControlTempRef", { read: iMedicationChart, static: false }) set _medChartOverview(c: iMedicationChart) {
      if (c) { this.medChartOverview = c; }
  };
  oSortFilterOpt: MedSortFilterbyOptions;
  ddetChild: medddetailsChild;
  oGetMedsChartData: GetMedsChartData;
  StartDate: DateTime;
  EndDate: DateTime;
  sDrugHeaderFormat: string = "dd" + Convert.ToChar(13).ToString() + "MMM";
  static sDateFormat: string = "dd/MM/yyyy";
  static sEncDateFormat: string = "dd-MMM-yyyy";
  static dTodayColWidth: number = 50;
  static dColWidth: number = 42;
  oOverViewChartData: OverViewChartData;
  oRefreshTagObject: TagObject = null;
  oOverviewSlot: DoseOverviewSlot = null;
  sp: StackPanel = null;
  dtServerDate: DateTime;
  oSDVM: SlotDetailVM = null;
  dtScheduledDTTM: DateTime = DateTime.MinValue;
  dtAdministeredAt: DateTime = DateTime.MinValue;
  isLoadedFlag: boolean = false;
  objTitrated: MedTitratedDose;
  IsPGD: boolean = false;
  oMedMCItems: medMCItems;
  oChildWindow: ChildWindow;
  dtCurrentDateTime: DateTime = CommonBB.GetServerDateTime();
  currentSelectedItemMultiRouteType: MultiRouteType = MultiRouteType.Single_Route;
  oTagObject: TagObject;
  msg: iMessageBox;
  sMedViewOptionValue: string = String.Empty;
  InfusionPreviousSlotStatus: string = String.Empty;
  bAdvanceAdminWarningDisplayed: boolean;
  IsSelfAdministeredErrorMsgExists: boolean;
  IsTitratedDoseEmptyErrMsgExists: boolean;
  IsTBD: boolean;
  IsSelfAdminister: boolean;
  isDataLoded:boolean = false;
  IsTitratedIconClicked: boolean = false;
  ParacetamolAlreadyAdministeredWarning_Displayed: boolean = false;
  lGroupSeqNo: number;
  objCommPrescriptionItemViewVM: CommPrescriptionItemViewVM;
  objPrescitemdetvm: PrescriptionItemDetailsVM;
  LgndClickCount: number = 0;
  _PopupParent1: FrameworkElement;
  public oMedsAdminOverview = Resource.MedsAdminChartOverview;
  medicationControlLoaded: boolean = false;
  TextBlockControl: TextBlock = new TextBlock();
  public _isActivityLaunchedInSlot: boolean;
  _IsActiveMedChartExists: boolean = false;
  public get IsActivityLaunchedInSlot(): boolean {
    return this._isActivityLaunchedInSlot;
  }
  public set IsActivityLaunchedInSlot(value: boolean) {
    this._isActivityLaunchedInSlot = value;
    if (this.TextBlockControl != null) {
      this.TextBlockControl.Visibility = this._isActivityLaunchedInSlot ? Visibility.Visible : Visibility.Collapsed;
    }
  }

  LayoutRoot: Grid = new Grid();
  @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
    if (c) { this.LayoutRoot = c; }
  };
  RowChart: RowDefinition;
  @ViewChild("RowChartTempRef", { read: RowDefinition, static: false }) set _RowChart(c: RowDefinition) {
    if (c) { this.RowChart = c; }
  };
  svwEncounterInfo: ScrollViewer;
  @ViewChild("svwEncounterInfoTempRef", { read: ScrollViewer, static: false }) set _svwEncounterInfo(c: ScrollViewer) {
    if (c) { this.svwEncounterInfo = c; }
  };
  lblEncounterInfo: TextBlock;
  @ViewChild("lblEncounterInfoTempRef", { read: TextBlock, static: false }) set _lblEncounterInfo(c: TextBlock) {
    if (c) { this.lblEncounterInfo = c; }
  };
  lblSortFilter: iButton = new iButton();
  @ViewChild("lblSortFilterTempRef", { read: iButton, static: false }) set _lblSortFilter(c: iButton) {
    if (c) { this.lblSortFilter = c; }
  };
  chkIncludeDiscontinue: iCheckBox = new iCheckBox();
  @ViewChild("chkIncludeDiscontinueTempRef", { read: iCheckBox, static: false }) set _chkIncludeDiscontinue(c: iCheckBox) {
    if (c) { this.chkIncludeDiscontinue = c; }
  };
  cmdToday: iButton = new iButton();
  @ViewChild("cmdTodayTempRef", { read: iButton, static: false }) set _cmdToday(c: iButton) {
    if (c) { this.cmdToday = c; }
  };
  cmdPrevWeek: iButton;
  @ViewChild("cmdPrevWeekTempRef", { read: iButton, static: false }) set _cmdPrevWeek(c: iButton) {
    if (c) { this.cmdPrevWeek = c; }
  };
  cmdPrevDay: iButton;
  @ViewChild("cmdPrevDayTempRef", { read: iButton, static: false }) set _cmdPrevDay(c: iButton) {
    if (c) { this.cmdPrevDay = c; }
  };
  cmdNextDay: iButton;
  @ViewChild("cmdNextDayTempRef", { read: iButton, static: false }) set _cmdNextDay(c: iButton) {
    if (c) { this.cmdNextDay = c; }
  };
  cmdNextWeek: iButton;
  @ViewChild("cmdNextWeekTempRef", { read: iButton, static: false }) set _cmdNextWeek(c: iButton) {
    if (c) { this.cmdNextWeek = c; }
  };
  btnHeightweightPopUp: iButton;
  @ViewChild("btnHeightweightPopUpTempRef", { read: iButton, static: false }) set _btnHeightweightPopUp(c: iButton) {
    if (c) { this.btnHeightweightPopUp = c; }
  };
  lblDSTClockNotifier: iLabel;
  @ViewChild("lblDSTClockNotifierTempRef", { read: iLabel, static: false }) set _lblDSTClockNotifier(c: iLabel) {
    if (c) { this.lblDSTClockNotifier = c; }
  };
  lblAuthoriseNotifier: iLabel;
  @ViewChild("lblAuthoriseNotifierTempRef", { read: iLabel, static: false }) set _lblAuthoriseNotifier(c: iLabel) {
    if (c) { this.lblAuthoriseNotifier = c; }
  };
  cmdPrintMedChart: iButton = new iButton();
  @ViewChild("cmdPrintMedChartTempRef", { read: iButton, static: false }) set _cmdPrintMedChart(c: iButton) {
    if (c) { this.cmdPrintMedChart = c; }
  };
  // cmdFluidBalance: iButton = new iButton();
  // @ViewChild("cmdFluidBalanceTempRef", { read: iButton, static: false }) set _cmdFluidBalance(c: iButton) {
  //   if (c) { this.cmdFluidBalance = c; }
  // };
  cmdTechValidate: iButton = new iButton();
  @ViewChild("cmdTechValidateTempRef", { read: iButton, static: false }) set _cmdTechValidate(c: iButton) {
    if (c) { this.cmdTechValidate = c; }
  };
  cmdWristbandScan: iButton = new iButton();
  @ViewChild("cmdWristbandScanTempRef", { read: iButton, static: false }) set _cmdWristbandScan(c: iButton) {
    if (c) { this.cmdWristbandScan = c; }
  };
  lblEmpty: iLabel;
  @ViewChild("lblEmptyTempRef", { read: iLabel, static: false }) set _lblEmpty(c: iLabel) {
    if (c) { this.lblEmpty = c; }
  };
  // txtBarcode: iTextBox = new iTextBox();
  // @ViewChild("txtBarcodeTempRef", { read: iTextBox, static: false }) set _txtBarcode(c: iTextBox) {
  //   if (c) { this.txtBarcode = c; }
  // };
  @ViewChild('txtBarcodeTempRef', { static: false }) txtBarcode: ElementRef;
  public barcodeStyleFocus = false;
  public barCodeVisibilityFlag = true;
  public barCodeReadOnlyFlag = false;

  constructor() {
    super();
    that = this;
  }

  ngOnInit(): void {
    // this.chkIncludeDiscontinue = new iCheckBox();
    this.dtServerDate = CommonBB.GetServerDateTime();
    this.SetOverViewDateRange(this.dtServerDate);
  }

  ngOnDestroy(): void {
    this.medicationControlLoaded = false;
  }

  ngAfterViewInit(): void {
    this.loadUserPermissions();
    this.UserControl_Loaded(null, null);
  }

  loadUserPermissions() {
    if (UserPermissions.CanTechnicallyValidate) { // refer from xaml.cs
      this.cmdTechValidate.Visibility = Visibility.Visible;
    }
    // if (UserPermissions.CanViewFBChart && !MedChartData.IsLaunchFrmPrescribe) {
    //   this.cmdFluidBalance.Visibility = Visibility.Visible;
    //   this.cmdFluidBalance.IsEnabled = UserPermissions.CanEnableFBChart;
    // }
    // else {
    //   this.cmdFluidBalance.Visibility = Visibility.Collapsed;
    //   this.cmdFluidBalance.IsEnabled = false;
    // }
    if (MedChartData.IsLaunchFrmPrescribe) {
      this.cmdPrintMedChart.Visibility = Visibility.Collapsed;
    }
    if (UserPermissions.CanPrintMedChart) {
      this.cmdPrintMedChart.Visibility = Visibility.Visible;
    }
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

  UserControl_Loaded(sender: Object, e: RoutedEventArgs): void {
    ChartContext.CurrentChartTab = CConstants.sTabChartOverViewKey;
    // this.dtServerDate = CommonBB.GetServerDateTime();
    // this.SetOverViewDateRange(this.dtServerDate);
    MedChartData.Is7DayView = false;
    this.sMedViewOptionValue = "CC_14DAYVIEW";
    if (this.chkIncludeDiscontinue != null && this.chkIncludeDiscontinue.IsChecked == true) {
      this.FillMedChartBasicData(this.dtServerDate);
      this.GetChartData(String.Empty, this.dtServerDate);
      this.isDataLoded = true;
    }
    else this.chkIncludeDiscontinue.IsChecked = true;


    // Browser.HtmlPage.Plugin.Focus(); // commented in other files having bug also
    // this.lblSortFilter.Focus();
    this.cmdTechValidate.IsEnabled = true;
    if (MedChartData.IsMedChartReadOnly || String.IsNullOrEmpty(MedChartData.ChartStatus) || String.Equals(MedChartData.ChartStatus, CConstants.sChartInActiveStatusCode) || String.IsNullOrEmpty(PatientContext.EncounterCode) || String.Equals(PatientContext.EncounterCode, CConstants.ENCstatus)) {
      this.cmdTechValidate.IsEnabled = false;
    }
    if ((MedChartData.IsMedChartReadOnly && !MedChartData.IsLaunchFrmPrescribe)|| MedChartData.IsLaunchFrmPrescribe) {
      // this.cmdFluidBalance.Visibility = Visibility.Collapsed;
      this.cmdTechValidate.Visibility = Visibility.Collapsed;
    }
    if (MedChartData.IsMedChartReadOnly || String.Equals(MedChartData.ChartStatus, CConstants.sChartInActiveStatusCode)) {
      this.cmdPrintMedChart.Visibility = Visibility.Visible;
    }
    else {
      this.cmdPrintMedChart.Visibility = Visibility.Collapsed;
    }
    let MedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
    if (MedAdminVM != null) {
      MedAdminVM.SetHeightweightPopUp();
    }
    if (this.DataContext instanceof MedicationAdminVM) {
      if (MedicationCommonProfileData.PrescribeConfig != null && MedicationCommonProfileData.PrescribeConfig.EnableDoseCalc) {
        // (ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM)).ActivityConsiderationUpdatedCompleted -= MedsAdminChartView_ActivityConsiderationUpdatedCompleted; for ref
        (ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM)).ActivityConsiderationUpdatedCompleted = this.MedsAdminChartView_ActivityConsiderationUpdatedCompleted;
        (ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM)).ActivityConsiderationUpdatedCompleted = (s, e) => this.MedsAdminChartView_ActivityConsiderationUpdatedCompleted;
      }
    }
  }
  RefreshDCAlertIcon(): void {
    if (String.Equals(ChartContext.CurrentChartTab, CConstants.sTabChartOverViewKey, StringComparison.InvariantCultureIgnoreCase) && this.medChartOverview != null && this.medChartOverview.ChartRows != null && this.medChartOverview.ChartRows.Count > 0 && MedicationCommonProfileData.PrescribeConfig != null && MedicationCommonProfileData.PrescribeConfig.EnableDoseCalc && MedicationCommonProfileData.PrescribeConfig.HeightWeightChangeAlert) {
      let dtRecordHWDTTM: DateTime = DateTime.MinValue;
      if (MedChartData.PatinetInfo != null) {
        dtRecordHWDTTM = MedChartData.PatinetInfo.DCHTRecordDTTM >= MedChartData.PatinetInfo.DCWTRecordDTTM ? MedChartData.PatinetInfo.DCHTRecordDTTM : MedChartData.PatinetInfo.DCWTRecordDTTM;
      }
      let oPresItem: List<number> = this.oGetMedsChartData.LstDrugDetail.Where(C => C.DrugHeader != null && C.DrugHeader.IsDoseCalculatedByDC && dtRecordHWDTTM.NotEquals(DateTime.MinValue) && DateTime.LessThan(C.DrugHeader.DCalcDTTM, dtRecordHWDTTM) && !String.Equals(C.DrugHeader.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) && !String.Equals(C.DrugHeader.PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.CurrentCultureIgnoreCase) && !String.Equals(C.DrugHeader.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase)).Select(S => S.DrugHeader.PrescriptionItemOID).ToList();
      if (oPresItem != null && oPresItem.Count > 0) {
        oPresItem.forEach((PresItem) => {
          let oSelectChartRow: ChartRow = this.medChartOverview.ChartRows.Where(C => C.Key.Equals("Row-" + PresItem.ToString())).FirstOrDefault();
          if (oSelectChartRow != null && oSelectChartRow.DrugItem != null && oSelectChartRow.DrugItem.Tag != null) {
            let oTagObj: TagObject = new TagObject();
            let oEmptyTagObj: TagObject = new TagObject();
            oTagObj.oChartCell = oSelectChartRow.ChartCells.FirstOrDefault();
            oSelectChartRow.DrugItem.DoseCalcIcon = this.LoadImage("IsDoseCalculatedByDC", MedImage.GetPath(MedImages.DoseCalculatorWithAlert));
            oSelectChartRow.DrugItem.DoseCalcIcon.Tooltip = Resource.DoseCalculator.DoseCalci_Tooltip;
            this.medChartOverview.RefreshRow(oSelectChartRow, oEmptyTagObj);
            this.medChartOverview.RefreshRow(oSelectChartRow, oTagObj);
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
    // ObjectHelper.stopFinishAndCancelEvent(true);
    let objDosecalc: MedDoseDetails = new MedDoseDetails();
    this.objPrescitemdetvm = new PrescriptionItemDetailsVM();
    objDosecalc.PrescriptionItemOID = PrescriptionItemOId;
    this.objPrescitemdetvm.GetDoseDeatils(PrescriptionItemOId);
    this.objPrescitemdetvm.DoseDetailEvent = (s, e) => { this.PrescriptionItemDetailsVM_DoseDetailEvent(s); };
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
  SetOverViewDateRange(ServerDate: DateTime): void {
    let IsActiveMedChartExists: boolean = false;
    this._IsActiveMedChartExists = false;
    this.oOverViewChartData = new OverViewChartData();
    this.oOverViewChartData.MedChartOID = MedChartData.MedChartOID;
    this.oOverViewChartData.ChartStatus = MedChartData.ChartStatus;
    this.oOverViewChartData.MedChartPatOID = ChartContext.PatientOID;
    this.oOverViewChartData.IsDiscontinueChecked = true;
    this.chkIncludeDiscontinue.IsChecked = true
    if (String.Equals(MedChartData.ChartStatus, CConstants.sChartActiveStatusCode, StringComparison.CurrentCultureIgnoreCase) || String.Equals(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.CurrentCultureIgnoreCase)) {
      IsActiveMedChartExists = true;
      this._IsActiveMedChartExists = true;
      // let tsCompareStartDate: TimeSpan = ServerDate - MedChartData.ActiveFrom;
      let tsCompareStartDate: TimeSpan = ServerDate.DateTime.Diff(MedChartData.ActiveFrom);
      if (tsCompareStartDate.Days < 7)
        this.oOverViewChartData.ActiveFrom = this.StartDate = MedChartData.ActiveFrom.Date;
      else this.oOverViewChartData.ActiveFrom = this.StartDate = ServerDate.DateTime.AddDays(-6);
      this.oOverViewChartData.ActiveTo = this.EndDate = this.StartDate.AddDays(13);
    }
    else if (String.Equals(MedChartData.ChartStatus, CConstants.sChartInActiveStatusCode, StringComparison.CurrentCultureIgnoreCase)) {
      this.oOverViewChartData.ActiveFrom = this.StartDate = MedChartData.ActiveFrom.Date;
      // let tsCompareEndDate: TimeSpan = MedChartData.ActiveTo - MedChartData.ActiveFrom;
      let tsCompareEndDate: TimeSpan = MedChartData.ActiveTo.DateTime.Diff(MedChartData.ActiveFrom);
      if (tsCompareEndDate.Days < 14)
        this.oOverViewChartData.ActiveTo = this.EndDate = MedChartData.ActiveTo;
      else this.oOverViewChartData.ActiveTo = this.EndDate = this.StartDate.AddDays(13);
    }
    else if (!String.IsNullOrEmpty(this.sMedViewOptionValue) && String.Equals(this.sMedViewOptionValue, MedChartData.Is7DayView)) {
      if ((String.Compare(MedChartDefaultData.ChartStatus, CConstants.sChartActiveStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(MedChartDefaultData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0)) {
        // let tsCompareStartDate: TimeSpan = this.dtServerDate - MedChartDefaultData.ActiveFrom;
        let tsCompareStartDate: TimeSpan = this.dtServerDate.DateTime.Diff(MedChartDefaultData.ActiveFrom);
        if (tsCompareStartDate.Days < 4)
          this.oOverViewChartData.ActiveFrom = this.StartDate = MedChartDefaultData.ActiveFrom.Date;
        else this.oOverViewChartData.ActiveFrom = this.StartDate = this.dtServerDate.DateTime.AddDays(-3);
        this.oOverViewChartData.ActiveTo = this.EndDate = this.StartDate.AddDays(6);
      }
      else {
        this.oOverViewChartData.ActiveFrom = this.StartDate = MedChartDefaultData.ActiveFrom.Date;
        // let tsCompareEndDate: TimeSpan = MedChartDefaultData.ActiveTo - MedChartDefaultData.ActiveFrom;
        let tsCompareEndDate: TimeSpan = MedChartDefaultData.ActiveTo.Diff(MedChartDefaultData.ActiveFrom);
        if (tsCompareEndDate.Days < 7)
          this.oOverViewChartData.ActiveTo = this.EndDate = MedChartDefaultData.ActiveTo;
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
    // this.cmdToday.IsEnabled = IsActiveMedChartExists;
  }
  FillMedChartBasicData(ServerDate: DateTime): void {
    Busyindicator.SetStatusBusy("MedChartOvwerView");
    if (this.medChartOverview != null && this.medChartOverview.ChartRows != null && this.medChartOverview.ChartRows.Count > 0)
      this.medChartOverview.ChartRows.Clear();
    if (String.Compare(MedChartData.ChartStatus, CConstants.sChartInActiveStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0) {
      // let tsCompareEndDate: TimeSpan = this.EndDate - this.StartDate;
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
    if (this.medChartOverview != null && this.LayoutRoot.Children.Contains(this.medChartOverview)) {
      this.LayoutRoot.Children.Remove(this.medChartOverview);
      this.LayoutRoot.Children.Clear();
    }
     this.medChartOverview = new iMedicationChart();
    // this.medChartOverview.Width = this.LayoutRoot.ActualWidth;
    // this.medChartOverview.Height = this.RowChart.ActualHeight - 15;
    this.medChartOverview.ShowSlotTiminings = true;
    this.medChartOverview.SlotTimeWidth = 50.0;
    this.medChartOverview.SlotTimeHeader = String.Empty;
    this.medChartOverview.AutoGenerateColumn = true;
    this.medChartOverview.DrugHeader = Resource.MedsAdminChartOverview.ChartDrugItemColumnHeader;
    this.medChartOverview.Format = this.sDrugHeaderFormat;
    // this.medChartOverview.StartDate = new DateTime(this.StartDate.DateTime.Ticks, DateTimeKind.Unspecified);
    // this.medChartOverview.EndDate = new DateTime(this.EndDate.DateTime.Ticks, DateTimeKind.Unspecified);
    // this.medChartOverview.TodayDate = new DateTime(ServerDate.DateTime.Ticks, DateTimeKind.Unspecified);
    this.medChartOverview.StartDate = this.StartDate;
    this.medChartOverview.EndDate = this.EndDate;
    this.medChartOverview.TodayDate = this.dtCurrentDateTime.Date;
    let DSTDatetime: DateTime = Common.DSTTimeInChart(this.StartDate, this.EndDate, ChartType.Medication_Overview_Chart);
    if (DSTDatetime.NotEquals(DateTime.MinValue)) {
      this.medChartOverview.DSTDateTime = DSTDatetime.ToString(this.sDrugHeaderFormat);
    }
    this.medChartOverview.TimeFormat = CConstants.Timeformat;
    this.medChartOverview.TodayColWidth = MedsAdminChartOverView.dTodayColWidth;
    this.medChartOverview.ColWidth = MedsAdminChartOverView.dColWidth;
    if (!String.IsNullOrEmpty(this.sMedViewOptionValue) && String.Equals(this.sMedViewOptionValue, "CC_7DAYVIEW")) {
      this.medChartOverview.ColWidth = CConstants.d7DayColWidth;
      this.medChartOverview.TodayColWidth = CConstants.d7DayTodayColWidth;
      MedChartData.Is7DayView = true;
    }
    this.medChartOverview.TabIndex = 7;
    this.medChartOverview.ChartRows = null;
    this.medChartOverview.NoRecordsDisplayText = String.Empty;
    this.LayoutRoot.Children.Clear();
    this.LayoutRoot.Children.Add(this.medChartOverview);

  }
  GetChartData(sSortBy: string, ServerDate: DateTime): void {
    this.oGetMedsChartData = new GetMedsChartData(ChartContext.PatientOID, ChartContext.EncounterOID, ServerDate, this.StartDate, this.EndDate, ChartType.Medication_Overview_Chart, sSortBy, this.oOverViewChartData.MedChartOID, this.oOverViewChartData.IsDiscontinueChecked, false);
    // this.oGetMedsChartData.MedsAdminChartDataCompleted -= new GetMedsChartData.MedsAdminChartDataDelegate(this.oGetMedsChartData_MedsAdminChartDataCompleted);
    // this.oGetMedsChartData.MedsAdminChartDataCompleted = new GetMedsChartData.MedsAdminChartDataDelegate(this.oGetMedsChartData_MedsAdminChartDataCompleted);
    // this.oGetMedsChartData.MedsAdminChartDataCompleted = () => { this.oGetMedsChartData_MedsAdminChartDataCompleted(); };
    this.oGetMedsChartData.GetMedsAdminChartData();
    this.oGetMedsChartData.medChartCallCompleted.subscribe(() => {
      this.oGetMedsChartData_MedsAdminChartDataCompleted();
      this.medChartOverview.TodayBorderColor = new SolidColorBrush(MedChartData.TodayOutlineColor);
      // Grid.SetColumn(this.medChartOverview, 0); no need, columns loading via html
      // Grid.SetColumnSpan(this.medChartOverview, 4);
      if (!this.LayoutRoot.Children.Contains(this.medChartOverview)) {
        this.LayoutRoot.Children.Clear();
        this.LayoutRoot.Children.Add(this.medChartOverview);
        this.LayoutRoot.SetColumnSpan(this.medChartOverview, 6);
      }
      Grid.SetRow(this.medChartOverview, 1);
      let DSTDatetime: DateTime = Common.DSTTimeInChart(this.StartDate, this.EndDate, ChartType.Medication_Overview_Chart);
      if (DSTDatetime.NotEquals(DateTime.MinValue)) {
        this.lblDSTClockNotifier.Visibility = Visibility.Visible;
        this.lblDSTClockNotifier.Text = String.Format(MedicationAdministrator.DSTTimeClockChange_text, DSTDatetime.ToString(CConstants.ShortDateFormat));
      }
      else {
        this.lblDSTClockNotifier.Visibility = Visibility.Collapsed;
      }
      // to enable grid
      this.medicationControlLoaded = true;

    });
  }
  SetDefaultTabByKey(sKey: string): void {
    let oFauxTab: iTab = ObjectHelper.CreateType<iTab>((ObjectHelper.CreateType<iTabItem>(this.Parent, iTabItem)).Parent, iTab);
    if (oFauxTab.SelectedKey != sKey) {
      let oFauxTabItem: iTabItem = oFauxTab.GetItem(sKey);
      if (oFauxTabItem != null) {
        oFauxTab.Click(oFauxTabItem.Key, true);
      }
    }
  }
  oGetMedsChartData_MedsAdminChartDataCompleted(): void {
    if (this.oGetMedsChartData.oChartRowList.Count > 0) {
      this.medChartOverview.NoRecordsDisplayText = "";
      this.lblEncounterInfo.Text = "";
      this.lblEncounterInfo.InlinesElements = [];
      let r: Run;
      let nCount: number = this.oGetMedsChartData.oEncList.Count;
      let isEncounterContextSet: boolean = false;
      for (let nCnt: number = 0; nCnt < nCount; nCnt++) {
        if (String.Equals(this.oGetMedsChartData.oEncList[nCnt].StatusCode, "CC_ENCCLOSED", StringComparison.OrdinalIgnoreCase) && this.oGetMedsChartData.oEncList[nCnt].EndDate.NotEquals(DateTime.MinValue)) {
          r = new Run();
          r.Text = this.oGetMedsChartData.oEncList[nCnt].Type + " " + this.oGetMedsChartData.oEncList[nCnt].StartDate.ToString(MedsAdminChartOverView.sEncDateFormat) + " to " + this.oGetMedsChartData.oEncList[nCnt].EndDate.ToString("dd-MMM-yyyy");
          this.lblEncounterInfo.Inlines.Add(r);
          if (nCnt < nCount - 1)
            this.lblEncounterInfo.Inlines.Add(new LineBreak());
        }
        else {
          r = new Run();
          r.Text = this.oGetMedsChartData.oEncList[nCnt].Type + " " + this.oGetMedsChartData.oEncList[nCnt].StartDate.ToString(MedsAdminChartOverView.sEncDateFormat) + " onwards";
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
      if (MedChartData.IsAuthoriseDrugAval) {
        this.lblAuthoriseNotifier.Visibility = Visibility.Visible;
      }
      else {
        this.lblAuthoriseNotifier.Visibility = Visibility.Collapsed;
      }
      if (!isEncounterContextSet) {
        if (this.oGetMedsChartData.oEncList != null) {
          let oEncOrderedList = this.oGetMedsChartData.oEncList.OrderBy(oEnc => oEnc.EncounterOID);
          if (oEncOrderedList != null && oEncOrderedList.Count() > 0) {
            let oLatestEncounter: Encounter = oEncOrderedList.Last();
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
      // this.medChartOverview.OnHotSpotClick -= new iMedicationChart.OnHotSpotClickhandler(medChartOverview_OnHotSpotClick); delegate function
      this.medChartOverview.OnHotSpotClick = (s, e, t) => { this.medChartOverview_OnHotSpotClick(s, e, t); };
      // this.medChartOverview.OnDrugHotSpotClick -= new iMedicationChart.OnDrugHotSpotClickhandler(medChartOverview_OnDrugHotSpotClick);  delegate function
      this.medChartOverview.OnDrugHotSpotClick = (s, e) => { this.medChartOverview_OnDrugHotSpotClick(s, e); };
      if (DateTime.GreaterThan(this.StartDate, MedChartData.ActiveFrom))
        this.cmdPrevDay.IsEnabled = true;
      else this.cmdPrevDay.IsEnabled = false;
      if (DateTime.GreaterThanOrEqualTo(this.StartDate.AddDays(-7), MedChartData.ActiveFrom))
        this.cmdPrevWeek.IsEnabled = true;
      else this.cmdPrevWeek.IsEnabled = false;
      if ((this.EndDate.Date == MedChartData.ActiveTo.Date && MedChartData.ActiveTo.NotEquals(DateTime.MinValue)) || (this.EndDate.Date > CommonBB.GetServerDateTime().DateTime.AddDays(27)) || (String.Compare(MedChartData.ChartStatus, CConstants.sChartInActiveStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0 && this.EndDate.Date >= MedChartData.ActiveTo.Date))
        this.cmdNextDay.IsEnabled = false;
      else this.cmdNextDay.IsEnabled = true;
      if ((String.Equals(MedChartData.ChartStatus, CConstants.sChartActiveStatusCode, StringComparison.CurrentCultureIgnoreCase) || String.Equals(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.CurrentCultureIgnoreCase))) {
        if (this.EndDate.DateTime.AddDays(7) <= CommonBB.GetServerDateTime().DateTime.AddDays(28))
          this.cmdNextWeek.IsEnabled = true;
        else this.cmdNextWeek.IsEnabled = false;
      }
      else if (String.Equals(MedChartData.ChartStatus, CConstants.sChartInActiveStatusCode, StringComparison.CurrentCultureIgnoreCase)) {
        if (this.EndDate.DateTime.AddDays(7) <= MedChartData.ActiveTo.Date)
          this.cmdNextWeek.IsEnabled = true;
        else this.cmdNextWeek.IsEnabled = false;
      }
      else this.cmdNextWeek.IsEnabled = false;
    }
    else {
      this.medChartOverview.NoRecordsDisplayText = "No records found";
      this.cmdPrevDay.IsEnabled = false;
      this.cmdPrevWeek.IsEnabled = false;
      this.cmdNextDay.IsEnabled = false;
      this.cmdNextWeek.IsEnabled = false;
    }
    if (ProfileData.InfusionPresConfig != null && ProfileData.InfusionPresConfig.IsEnablePrescInfus && (String.Compare(MedChartData.ChartStatus, CConstants.sChartActiveStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0)) {
      if (MedChartData.NonInfusionItemCount <= 0 && MedChartData.InfusionItemCount <= 0) {
        this.EnableDisableTabItemByKey(CConstants.sTabChartKey, true);
        this.EnableDisableTabItemByKey(CConstants.sTabInfusionKey, false);
        this.EnableDisableTabItemByKey(CConstants.sTabChartOverViewKey, false);
        this.SetDefaultTabByKey(CConstants.sTabChartKey);
      }
      else if (MedChartData.NonInfusionItemCount > 0 && MedChartData.InfusionItemCount <= 0) {
        this.EnableDisableTabItemByKey(CConstants.sTabInfusionKey, false);
        this.EnableDisableTabItemByKey(CConstants.sTabChartKey, true);
      }
      else if (MedChartData.NonInfusionItemCount <= 0 && MedChartData.InfusionItemCount > 0) {
        this.EnableDisableTabItemByKey(CConstants.sTabChartKey, false);
        this.EnableDisableTabItemByKey(CConstants.sTabInfusionKey, true);
      }
      else if (MedChartData.NonInfusionItemCount > 0 && MedChartData.InfusionItemCount > 0) {
        this.EnableDisableTabItemByKey(CConstants.sTabChartKey, true);
        this.EnableDisableTabItemByKey(CConstants.sTabInfusionKey, true);
      }
      let oFauxTab: iTab = ObjectHelper.CreateType<iTab>((ObjectHelper.CreateType<iTabItem>(this.Parent, iTabItem)).Parent, iTab);
      let oFauxTabItem: iTabItem = oFauxTab.GetItem(CConstants.sTabInfusionKey);
      if (oFauxTabItem instanceof iTabItem && oFauxTabItem.Key == CConstants.sTabInfusionKey) {
        let isDueOverdueSlotExist: boolean = (MedChartData.InfusionChartAlertInfo != null && (String.Compare(MedChartData.InfusionChartAlertInfo.DueStatus, SlotStatus.DUENOW, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(MedChartData.InfusionChartAlertInfo.DueStatus, SlotStatus.OVERDUE, StringComparison.CurrentCultureIgnoreCase) == 0));
        oFauxTabItem.HeaderImageList = new List<HeaderImageListItem>();
        if (MedChartData.InfusionChartAlertInfo != null && MedChartData.InfusionChartAlertInfo.InfusionAlertExist && isDueOverdueSlotExist) {
          oFauxTabItem.HeaderImageList.Add(ObjectHelper.CreateObject(new HeaderImageListItem(), {
            HeaderImage: MedImage.GetPath(MedImages.InfDuenessAlertIcon),
            HeaderImageAlignment: HeaderImageAlignment.Right, HeaderImgToolTip: Resource.InfusionChart.infDuenessAlert_Tooltip
          }));
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
        oFauxTabItem.UpdateHeader();
      }
    }
    if (this.oOverViewChartData.ChartStatus == CConstants.sChartActiveStatusCode || this.oOverViewChartData.ChartStatus == CConstants.sChartSuspendedStatusCode) {
      this.ShowTabItem(CConstants.sTabChartKey);
      if (ProfileData.InfusionPresConfig != null && ProfileData.InfusionPresConfig.IsEnablePrescInfus)
        this.ShowTabItem(CConstants.sTabInfusionKey);
    }
    else {
      this.HideTabItem(CConstants.sTabChartKey);
      if (ProfileData.InfusionPresConfig != null && ProfileData.InfusionPresConfig.IsEnablePrescInfus)
        this.HideTabItem(CConstants.sTabInfusionKey);
    }
    Busyindicator.SetStatusIdle("MedChartOvwerView");
    if((!GetMedsChartData.bInvokeWarningUnsubscribe) && (ChartContext.MedchartLaunchLoc?.toLowerCase() == 'authorise' || ChartContext.MedchartLaunchLoc?.toLowerCase() == 'technicallyvalidate' || ChartContext.MedchartLaunchLoc?.toLowerCase() == 'prescribe' ))
      GetMedsChartData.InvokeWarning.next(true);
  }
  EnableDisableTabItemByKey(sKey: string, IsEnabled: boolean): void {
    let oFauxTab: iTab = ObjectHelper.CreateType<iTab>((ObjectHelper.CreateType<iTabItem>(this.Parent, iTabItem)).Parent, iTab);
    let oFauxTabItem: iTabItem = oFauxTab.GetItem(sKey);
    if (oFauxTabItem instanceof iTabItem && oFauxTabItem.Key == sKey) {
      oFauxTabItem.IsEnabled = IsEnabled;
    }
  }
  ShowTabItem(sTabChartKey: string): void {
    let oFauxTab: iTab = ObjectHelper.CreateType<iTab>((ObjectHelper.CreateType<iTabItem>(this.Parent, iTabItem)).Parent, iTab);
    let oFauxTabItem: iTabItem = oFauxTab.GetItem(sTabChartKey);
    if (oFauxTabItem instanceof iTabItem && oFauxTabItem.Key == sTabChartKey) {
      oFauxTabItem.Visibility = Visibility.Visible;
    }
  }
  HideTabItem(sTabChartKey: string): void {
    let oFauxTab: iTab = ObjectHelper.CreateType<iTab>((ObjectHelper.CreateType<iTabItem>(this.Parent, iTabItem)).Parent, iTab);
    let oFauxTabItem: iTabItem = oFauxTab.GetItem(sTabChartKey);
    if (oFauxTabItem instanceof iTabItem && oFauxTabItem.Key == sTabChartKey) {
      oFauxTabItem.Visibility = Visibility.Collapsed;
    }
  }
  medChartOverview_OnDrugHotSpotClick(sender: Object, TagObject: TagObject): void {
    let oChartIcon: ChartIcon = (<ChartIcon>((<FrameworkElement>(sender)).Tag));
    let DoseTypeCode: string = String.Empty;
    if (TagObject.oDrugItem != null && oChartIcon != null) {
      if (!String.IsNullOrEmpty(TagObject.oDrugItem.Key) && !String.IsNullOrEmpty(TagObject.oDrugItem.Drugname)) {
        if (!String.IsNullOrEmpty(oChartIcon.Key)) {
          if (String.Compare(oChartIcon.Key, "Conflict", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oChartIcon.Key, "SupplyInstructions", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oChartIcon.Key, "Prescription", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oChartIcon.Key, CConstants.PGDDrug, StringComparison.CurrentCultureIgnoreCase) == 0) {
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
    // ObjectHelper.stopFinishAndCancelEvent(true);
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
      //#37084
      CCommSequentialHelper.LaunchItemsInSequenceMezzanine(PresItemDetails.MedsResolve, this.lGroupSeqNo, (s) => { this.OnSequentialMezzanineClosed(s) });
    }
    // else{
    //   ObjectHelper.stopFinishAndCancelEvent(false);
    // }
  }
  OnSequentialMezzanineClosed(args: AppDialogEventargs): void {
    this.lGroupSeqNo = 0;
    // delegate function
    // this.objCommPrescriptionItemViewVM.GetMedicationsEvent -= new CommPrescriptionItemViewVM.GetMedicationsDelegate(this.CommPrescriptionItemViewVM_GetMedicationsEvent); 
    Busyindicator.SetStatusIdle("LaunchSeqMez");
    if (args != null && args.AppChildWindow != null)
      // args.AppChildWindow.DialogResult = false;
      // ObjectHelper.stopFinishAndCancelEvent(false);
      args.AppChildWindow.DialogRef.close();
  }
  LaunchMultiComponentItemDetails(nMedCharOId: number, sItemName: string): void {
    this.oMedMCItems = new medMCItems();
    this.oMedMCItems.constructorimpl(nMedCharOId, sItemName, String.Empty);
    this.oMedMCItems.onDialogClose = (s) => { this.oMedMCItems_Closed(s); }
    AppActivity.OpenWindow(sItemName, this.oMedMCItems, (s) => { this.oMedMCItems_Closed(s); }, sItemName, false, 400, 600, false, WindowButtonType.Close, null);
  }
  oMedMCItems_Closed(args: AppDialogEventargs): void {
    this.oChildWindow = args.AppChildWindow;
    if (this.oChildWindow != null) {
      this.oChildWindow.DialogResult = true;
    }
  }
  cmdPrintMedChart_Click(e): void {
    let oReturn: Object = HtmlPage.Window.Invoke("isIEAboveSeven", null);
    if (oReturn != null && String.Compare(oReturn.ToString(), "True") != 0) {
      let imsg: iMessageBox;
      imsg = new iMessageBox();
      imsg.Title = "Lorenzo";
      imsg.MessageButton = MessageBoxButton.OK;
      imsg.MessageBoxClose = (s, e) => { this.PrintChart_MessageBoxClose(s, e); };
      imsg.Message = "Printing of a prescription�using this version of Internet Explorer may print a prescription item across pages, please ensure that the�all pages are�printed and that�all prescription�items are�present.";
      ;
      imsg.Height = 150;
      imsg.Width = 400;
      imsg.Show();
    }
    else this.PrintMedChart();
  }
  PrintChart_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
    this.PrintMedChart();
  }
  PrintMedChart(): void {
    let oMedicationAdminVM: MedicationAdminVM;
    let oRandom: Random = new Random();
    oMedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
    oMedicationAdminVM.sLastCACode = "MN_PrintMedChart_P2";
    let sQuery: string = String.Empty;
    let ISFIRSTCLICK: string = "Yes";
    sQuery += "&MEDICATIONCHARTOID=" + MedChartData.MedChartOID.ToString();
    sQuery += "&CHARTSTATUS=" + MedChartData.ChartStatus;
    sQuery += "&CHARTSTARTDTTM=" + MedChartData.ActiveFrom.ToString("dd-MMM-yyyy HH:mm");
    // if (MedChartData.ActiveTo.Date.NotEquals(DateTime.MinValue).Date) {
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
    oMedicationAdminVM.LaunchWizard("MN_PrintMedChart_P2", sQuery, WizardType.WIZARD);//#35915
  }
  ConditionalVM: ConditionalDoseVM;
  MultiDoseDetailVM: MultipleDoseDetail;
  sTitle: string = String.Empty;
  LaunchDoseTypeScreen(PrescriptionItemOID: number, sDrugName: string, sDoseType: string, sInfusionType: string): void {
    if (String.Compare(sDoseType, DoseTypeCode.CONDITIONAL, StringComparison.OrdinalIgnoreCase) == 0) {
      if (this.ConditionalVM == null || (this.ConditionalVM != null && this.ConditionalVM.lnPrescriptionItemOID != PrescriptionItemOID)) {
        this.ConditionalVM = ObjectHelper.CreateObject(new ConditionalDoseVM(RequestSource.ViewDrugDetails, PrescriptionItemOID, false), { DrugName: sDrugName });
      }
      let objConditional: MedConditionalDose = new MedConditionalDose();
      objConditional.DataContext = this.ConditionalVM;
      objConditional.DoseType = sDoseType.Trim();
      objConditional.InfusionType = sInfusionType;
      // ObjectHelper.stopFinishAndCancelEvent(true);
      objConditional.onAppDialogClose = (s) => { this.omedobjConditional1_Closed(s); }
      let dialogWindowHeight = (250/window.devicePixelRatio); 
      AppActivity.OpenWindow((sDrugName + " - LORENZO -- Webpage Dialog"), objConditional, (s) => { this.omedobjConditional1_Closed(s); }, "", false, dialogWindowHeight, 460, false, WindowButtonType.Close, null);
    }
    else if (String.Compare(sDoseType, DoseTypeCode.TITRATED, StringComparison.OrdinalIgnoreCase) == 0) {
      if (!this.IsTitratedIconClicked) {
        this.IsTitratedIconClicked = true;
        this.objTitrated = new MedTitratedDose();
        this.MultiDoseDetailVM = new MultipleDoseDetail(PrescriptionItemOID, AppSessionInfo.AMCV, DoseTypeCode.TITRATED, "EPR", PatientContext.PrescriptionType);
        this.MultiDoseDetailVM.TitratedDoseCompleted = () => { this.MultiDoseDetailVM_TitratedDoseCompleted(); };
        this.sTitle = sDrugName;
      }
    }
    else {
      this.objStepped = new MedSteppedFullPrescriptionVW();
      this.objStepped.sPrescriptionTypeCode = PrescriptionTypes.ForAdministration;
      this.objStepped.oLaunchFrom = SVIconLaunchFrom.MedChart;
      Busyindicator.SetStatusBusy("SteppenFullPrescription");
      this.MultiDoseDetailVM = new MultipleDoseDetail(PrescriptionItemOID, AppSessionInfo.AMCV, sDoseType, "EPR", !String.IsNullOrEmpty(PatientContext.PrescriptionType) ? PatientContext.PrescriptionType : PrescriptionTypes.ForAdministration);
      let temp =  this.MultiDoseDetailVM.PresItemDoseInfoServicedata.subscribe(()=> { 
        this.objStepped.DataContext = this.MultiDoseDetailVM;
        this.objStepped.sInfusionType = sInfusionType;
        this.objStepped.onDialogClose = this.MedSteppedDose_Closed;
        // ObjectHelper.stopFinishAndCancelEvent(true);
        let dialogWindowHeight = (600/window.devicePixelRatio); 
        AppActivity.OpenWindow(sDrugName + " - LORENZO -- Webpage Dialog", this.objStepped, this.MedSteppedDose_Closed, "", false, dialogWindowHeight, 950, false, WindowButtonType.Close, null);
        temp.unsubscribe(); 
      });
    }
  }
  MultiDoseDetailVM_TitratedDoseCompleted(): void {
    this.objTitrated = new MedTitratedDose();
    this.objTitrated.DataContext = this.MultiDoseDetailVM;
    this.objTitrated.onDialogClose = (s) => { this.objTitrated_Closed(s); };
    // ObjectHelper.stopFinishAndCancelEvent(true);
    AppActivity.OpenWindow(this.sTitle, this.objTitrated, (s) => { this.objTitrated_Closed(s); }, "", false, 350, 480, false, WindowButtonType.Close, null);
  }
  objTitrated_Closed(args: AppDialogEventargs): void {
    this.IsTitratedIconClicked = false;
    // ObjectHelper.stopFinishAndCancelEvent(false);
    args.AppChildWindow.DialogResult = true;
  }
  MedSteppedDose_Closed(args: AppDialogEventargs): void {
    // ObjectHelper.stopFinishAndCancelEvent(false);
    args.AppChildWindow.DialogResult = true;
  }
  omedobjConditional1_Closed(args: AppDialogEventargs): void {
    // ObjectHelper.stopFinishAndCancelEvent(false);
    args.AppChildWindow.DialogResult = true;
  }
  LaunchPrescriptionDetails(PrescriptionItemOID: number, sDrugName: string, sHeight: string, sDefaulttab: string, sItemSubType: string, sLorenzoID: string, MCVersionNo: string, DoseCalcExist: string): void {
    // ObjectHelper.stopFinishAndCancelEvent(true);
    this.ddetChild = new medddetailsChild();
    this.ddetChild.MedDetailsUserControl.PrescriptionItemOID = PrescriptionItemOID;
    this.ddetChild.MedDetailsUserControl.MCVersion = !String.IsNullOrEmpty(MCVersionNo) ? MCVersionNo : AppSessionInfo.AMCV;
    this.ddetChild.MedDetailsUserControl.LorenzoID = sLorenzoID;
    this.ddetChild.MedDetailsUserControl.DoseCalcExist = DoseCalcExist;
    this.ddetChild.MedDetailsUserControl.ServiceOID = MedChartData.ServiceOID;
    this.ddetChild.MedDetailsUserControl.LocationOID = MedChartData.LocationOID;
    if (!String.IsNullOrEmpty(sDefaulttab))
      this.ddetChild.MedDetailsUserControl.sDefaultTab = sDefaulttab;
    if (sDefaulttab == "SupplyInstructions")
      this.ddetChild.MedDetailsUserControl.TechValDef = true;
    if (String.Compare(sItemSubType, CConstants.ItemSubType, StringComparison.InvariantCultureIgnoreCase) == 0) {
      sDrugName = MedsAdminChartToolTip.AdhocItemCaption;
    }
    this.ddetChild.MedDetailsUserControl.oLaunchFrom = SVIconLaunchFrom.MedChart;
    this.ddetChild.MedDetailsUserControl.PresType = PrescriptionTypes.ForAdministration;
    this.ddetChild.onDialogClose = (e) => this.ddetChild_Closed(e);
    let dialogWindowHeight = (Convert.ToInt64(sHeight)/window.devicePixelRatio);
    AppActivity.OpenWindow(sDrugName, this.ddetChild, (e) => this.ddetChild_Closed(e), "", false, dialogWindowHeight, 930, false, WindowButtonType.Close, null);
  }
  ddetChild_Closed(args: AppDialogEventargs): void {
    // this.ddetChild.appDialog.DialogResult = true;
    // ObjectHelper.stopFinishAndCancelEvent(false);
    args.AppChildWindow.DialogResult = true;
  }
  
  HomeLeavemsgbox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
    if (e.MessageBoxResult == MessageBoxResult.Yes && this.msg != null && this.msg.Tag != null) {
      let Tagobject: TagObject = ObjectHelper.CreateType<TagObject>(this.msg.Tag, TagObject);
      this.SlotClick(Tagobject);
    }
  }
  medChartOverview_OnHotSpotClick(sender: Object, TagObject: TagObject, GridControl: any): void {
    if (!MedChartData.IsMedChartReadOnly) {
      this.medChartOverview.GridControl = GridControl;
      this.oTagObject = TagObject;
      if (Common.CheckIfLockingDurationElapsed()) {
        return
      }
      let isHomeleaveORPlannedSlot: boolean = false;
      if (TagObject != null && TagObject.oIChartSlot != null && TagObject.oIChartSlot instanceof DoseOverviewSlot) {
        let oTagSlotDetail: TagSlotDetail = null;
        let oOverviewSlots: DoseOverviewSlot = ObjectHelper.CreateType<DoseOverviewSlot>(TagObject.oIChartSlot, DoseOverviewSlot);
        oTagSlotDetail = (oOverviewSlots.Tag != null && oOverviewSlots.Tag instanceof TagSlotDetail) ? ObjectHelper.CreateType<TagSlotDetail>(oOverviewSlots.Tag, TagSlotDetail) : null;
        if (oOverviewSlots.StatusIcon != null && !String.IsNullOrEmpty(oOverviewSlots.StatusIcon.Key) && oTagSlotDetail != null && !String.IsNullOrEmpty(oTagSlotDetail.SlotStatus) && (String.Equals(oTagSlotDetail.SlotStatus, SlotStatus.PLANNED, StringComparison.InvariantCulture) || String.Equals(oTagSlotDetail.SlotStatus, SlotStatus.HOMELEAVE, StringComparison.InvariantCulture))) {
          isHomeleaveORPlannedSlot = true;
        }
      }
      if (String.Compare(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0 && isHomeleaveORPlannedSlot && !Common.IsRetrospectiveSlot(TagObject.oIChartSlot)) {
        this.msg = new iMessageBox();
        this.msg.Title = "Lorenzo";
        this.msg.MessageButton = MessageBoxButton.YesNo;
        this.msg.IconType = MessageBoxType.Question;
        this.msg.Tag = TagObject;
        // this.msg.MessageBoxClose -= this.HomeLeavemsgbox_MessageBoxClose;
        this.msg.MessageBoxClose = this.HomeLeavemsgbox_MessageBoxClose;
        this.msg.MessageBoxClose = (s, e) => { this.HomeLeavemsgbox_MessageBoxClose(s, e); };
        this.msg.Message = Resource.MedicationChart.HomeLeaveMsg;
        this.msg.Show();
      }
      else {
        this.SlotClick(TagObject);
      }
    }
  }
  SlotClick(TagObject: TagObject): void {
    let bIsBolus: boolean = false;
    if (!this.CheckSlotModificationTimeFrame(TagObject)) {
      let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
        Title: "LORENZO",
        Message: String.Format("The slot selected for {0} is outside the allowed modification time window.",
          TagObject.oDrugItem.Drugname),
        MessageButton: MessageBoxButton.OK,
        IconType: MessageBoxType.Information,
        Width: 400
      });
      iMsgBox.Show();
    }
    else {
      this.currentSelectedItemMultiRouteType = MultiRouteType.Single_Route;
      this.oRefreshTagObject = TagObject;
      let oSlotTagObject: TagSlotDetail = null;
      let tmpDoseOverVwSlot: DoseOverviewSlot = (TagObject != null) ? ObjectHelper.CreateType<DoseOverviewSlot>(TagObject.oIChartSlot, DoseOverviewSlot) : null;
      if (TagObject != null && TagObject.oIChartSlot != null && TagObject.oIChartSlot instanceof DoseOverviewSlot && tmpDoseOverVwSlot != null && tmpDoseOverVwSlot.Tag != null) {
        oSlotTagObject = ObjectHelper.CreateType<TagSlotDetail>(tmpDoseOverVwSlot.Tag, TagSlotDetail);
      }
      let tmpDrugHdrDtl: TagDrugHeaderDetail = (TagObject != null && TagObject.oDrugItem != null && (TagObject.oDrugItem instanceof DrugItem) && (ObjectHelper.CreateType<DrugItem>(TagObject.oDrugItem, DrugItem)) != null && (ObjectHelper.CreateType<DrugItem>(TagObject.oDrugItem, DrugItem)).Tag != null) ? ObjectHelper.CreateType<TagDrugHeaderDetail>((ObjectHelper.CreateType<DrugItem>(TagObject.oDrugItem, DrugItem)).Tag, TagDrugHeaderDetail) : null;
      this.oGetMedsChartData.IsCompleted = false;
      this.oGetMedsChartData.IsGreyedOut = false;
      if (tmpDrugHdrDtl != null) {
        switch (tmpDrugHdrDtl.PrescriptionItemStatus) {
          case CConstants.COMPLETED:
            this.oGetMedsChartData.IsCompleted = true;
            break;
          case CConstants.DISCONTINUED:
            this.oGetMedsChartData.IsGreyedOut = true;
            break;
          default:
            this.oGetMedsChartData.IsCompleted = false;
            this.oGetMedsChartData.IsGreyedOut = false;
            break;
        }
      }
      this.currentSelectedItemMultiRouteType = (tmpDrugHdrDtl != null) ? tmpDrugHdrDtl.MultiRoute_Type : MultiRouteType.Single_Route;
      if (ProfileData.InfusionPresConfig != null && ProfileData.InfusionPresConfig.IsEnablePrescInfus && tmpDrugHdrDtl != null && tmpDrugHdrDtl.MultiRoute_Type == MultiRouteType.Mixed_Routes && !String.Equals(oSlotTagObject.SlotStatus, SlotStatus.PATIENTSELFADMIN, StringComparison.CurrentCultureIgnoreCase) && !String.Equals(oSlotTagObject.SlotStatus, SlotStatus.PLANNED, StringComparison.CurrentCultureIgnoreCase) && (String.Equals(oSlotTagObject.SlotStatus, SlotStatus.NOTYETRECORDED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(oSlotTagObject.SlotStatus, SlotStatus.NOTKNOWN, StringComparison.CurrentCultureIgnoreCase))) {
        let oMixedMultiRouteSel: MixedMultiRouteAdminSelection = new MixedMultiRouteAdminSelection();
        if (this.CurrentActivityCode == ActivityCode.None) {
          this.CurrentActivityCode = ActivityCode.RecordAdmin;
          let Callback = (s, e) => {
            if (s != null && e != null) {
              oMixedMultiRouteSel = s;
            }
          }
          // ObjectHelper.stopFinishAndCancelEvent(true);
          AppActivity.OpenWindow("Information - LORENZO -- Webpage Dialog", oMixedMultiRouteSel, (s) => { this.oMixedMultiRouteSel_Closed(s); }, "Information", false, 200, 370, false, WindowButtonType.OkCancel, Callback);
          this.currentSelectedItemMultiRouteType = MultiRouteType.Mixed_Routes;
        }
      }
      else {
        let IsMixedMultiRouteNormallyAdministeredSlot: boolean;
        IsMixedMultiRouteNormallyAdministeredSlot = !((tmpDrugHdrDtl == null) || (oSlotTagObject == null) || (tmpDrugHdrDtl != null && tmpDrugHdrDtl.MultiRoute_Type != MultiRouteType.Mixed_Routes) || (tmpDrugHdrDtl != null && tmpDrugHdrDtl.MultiRoute_Type == MultiRouteType.Mixed_Routes && oSlotTagObject != null && oSlotTagObject.IsAdministeredOnInfusionChart));
        if (oSlotTagObject != null && tmpDrugHdrDtl != null && !String.IsNullOrEmpty(tmpDrugHdrDtl.INFTYCODE) && String.Equals(tmpDrugHdrDtl.INFTYCODE, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase)) {
          bIsBolus = oSlotTagObject.IsBolus;
        }
        if ((TagObject.oDrugItem.IsInfusion) && !IsMixedMultiRouteNormallyAdministeredSlot && (!bIsBolus || (oSlotTagObject != null && oSlotTagObject.IsAdministeredOnInfusionChart)) && (tmpDrugHdrDtl != null && !tmpDrugHdrDtl.IsPGD)) {
          if (this.CurrentActivityCode == ActivityCode.None) {
            let oTagDrugHeaderDetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(TagObject.oDrugItem.Tag, TagDrugHeaderDetail);
            if (oTagDrugHeaderDetail != null && this.oGetMedsChartData.LstDrugDetail != null && Common.IsPreviousSeqPresItemInprogress(oTagDrugHeaderDetail, this.oGetMedsChartData.LstDrugDetail)) {
              let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                Title: "LORENZO",
                Message: String.Format(Resource.InfusionChart.PreviousContSeqInProgress, TagObject.oDrugItem.Drugname),
                MessageButton: MessageBoxButton.OK,
                IconType: MessageBoxType.Critical
              });
              iMsgBox.Show();
            }
            else if (oTagDrugHeaderDetail != null && oTagDrugHeaderDetail.IsAmendCompletedStatus && !String.IsNullOrEmpty(oTagDrugHeaderDetail.PrescriptionItemStatus) && String.Equals(oTagDrugHeaderDetail.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase) && oSlotTagObject != null && !String.IsNullOrEmpty(oSlotTagObject.SlotStatus) && String.Equals(oSlotTagObject.SlotStatus, SlotStatus.NOTKNOWN, StringComparison.CurrentCultureIgnoreCase)) {
              this.msg = new iMessageBox();
              this.msg.Title = "Lorenzo";
              this.msg.MessageButton = MessageBoxButton.OK;
              this.msg.IconType = MessageBoxType.Information;
              this.msg.Tag = TagObject;
              // this.msg.MessageBoxClose -= this.oMsgBox_MessageBoxClose;
              this.msg.MessageBoxClose = this.oMsgBox_MessageBoxClose;
              this.msg.OverlayBrush = new SolidColorBrush(Colors.Transparent);
              this.msg.MessageBoxClose = (s, e) => { this.oMsgBox_MessageBoxClose(s, e); };
              this.msg.Message = Resource.MedicationChart.AmendedCompletedWarningMsg;
              this.msg.Show();
            }
            else {
              this.CurrentActivityCode = ActivityCode.RecordAdmin;
              this.LaunchRecordadmin(TagObject);
            }
          }
        }
        else {
          this.dtScheduledDTTM = oSlotTagObject.SlotDateTime;
          let TimeDifference: number = Convert.ToInt32(this.dtScheduledDTTM.Subtract(this.dtCurrentDateTime).TotalMinutes);
          let AdvanceDuration: DateTime = this.dtCurrentDateTime.AddHours(MedChartData.AllowAdvanceDuration);
          let oTagDrugHeaderDetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(TagObject.oDrugItem.Tag, TagDrugHeaderDetail);
          if (oTagDrugHeaderDetail != null && (oTagDrugHeaderDetail.IsAllowAdvanceAdmin || oSlotTagObject.IsAllowAdvanceAdminSlot) && TimeDifference > 0 && TimeDifference > MedChartData.DuenessThreshold && DateTime.LessThanOrEqualTo(this.dtScheduledDTTM, AdvanceDuration) && (!String.IsNullOrEmpty(oSlotTagObject.SlotStatus) && (String.Equals(oSlotTagObject.SlotStatus, SlotStatus.PLANNED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(oSlotTagObject.SlotStatus, SlotStatus.PATIENTSELFADMIN, StringComparison.CurrentCultureIgnoreCase) || String.Equals(oSlotTagObject.SlotStatus, SlotStatus.HOMELEAVE, StringComparison.CurrentCultureIgnoreCase)))) {
            this.bAdvanceAdminWarningDisplayed = false;
            this.IsSelfAdministeredErrorMsgExists = false;
            this.IsTitratedDoseEmptyErrMsgExists = false;
            this.ParacetamolAlreadyAdministeredWarning_Displayed = false;
            this.ValidateBeforeRecordAdminLaunch();
          }
          else {
            let oSlotHelper: SlotAdministrationHelper = new SlotAdministrationHelper();
            // oSlotHelper.WarningBeforeAdministrationCompletedEvent -= this.oSlotHelper_WarningBeforeAdministrationCompleted;
            oSlotHelper.WarningBeforeAdministrationCompletedEvent = this.oSlotHelper_WarningBeforeAdministrationCompleted;
            oSlotHelper.WarningBeforeAdministrationCompletedEvent = (s, e) => { this.oSlotHelper_WarningBeforeAdministrationCompleted(s, e); };
            if (oSlotTagObject != null && !String.IsNullOrEmpty(oSlotTagObject.SlotStatus) && String.Equals(oSlotTagObject.SlotStatus, SlotStatus.HOMELEAVE, StringComparison.InvariantCultureIgnoreCase)) {
              oSlotHelper.CheckDuplicateSlotWarningExists(tmpDrugHdrDtl, oSlotTagObject.SlotOID, oSlotTagObject.SlotStatus, this.IsPGD, LaunchAdminType.LaunchRecordAdmin);
            }
            else {
              oSlotHelper.CheckDuplicateSlotWarningExists(tmpDrugHdrDtl, oSlotTagObject.SlotOID, oSlotTagObject.SlotStatus, this.IsPGD, LaunchAdminType.LaunchModifyAdmin);
            }
          }
        }
      }
    }
  }
  oMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
    if (e.MessageBoxResult == MessageBoxResult.OK && this.msg != null && this.msg.Tag != null) {
      let Tagobject: TagObject = ObjectHelper.CreateType<TagObject>(this.msg.Tag, TagObject);
      this.CurrentActivityCode = ActivityCode.RecordAdmin;
      this.LaunchRecordadmin(Tagobject);
      ;
    }
  }
  ValidateBeforeRecordAdminLaunch(): void {
    let IsTitrated: boolean;
    let oSlotTagObject: TagSlotDetail = null;
    let tmpDoseOverVwSlot: DoseOverviewSlot = (this.oRefreshTagObject != null && this.oRefreshTagObject.oIChartSlot != null && this.oRefreshTagObject.oIChartSlot instanceof DoseOverviewSlot) ? ObjectHelper.CreateType<DoseOverviewSlot>(this.oRefreshTagObject.oIChartSlot, DoseOverviewSlot) : null;
    if (tmpDoseOverVwSlot != null && tmpDoseOverVwSlot.Tag != null) {
      oSlotTagObject = ObjectHelper.CreateType<TagSlotDetail>(tmpDoseOverVwSlot.Tag, TagSlotDetail);
    }
    let tmpDrugHdrDtl: TagDrugHeaderDetail = (this.oRefreshTagObject != null && this.oRefreshTagObject.oDrugItem != null && this.oRefreshTagObject.oDrugItem.Tag != null && this.oRefreshTagObject.oDrugItem.Tag instanceof TagDrugHeaderDetail) ? ObjectHelper.CreateType<TagDrugHeaderDetail>((ObjectHelper.CreateType<DrugItem>(this.oRefreshTagObject.oDrugItem, DrugItem)).Tag, TagDrugHeaderDetail) : null;
    if (tmpDrugHdrDtl.DoseType == DoseTypeCode.TITRATED) {
      IsTitrated = true;
    }
    else {
      IsTitrated = false;
    }
    if ((this.oRefreshTagObject != null && this.oRefreshTagObject.oIChartSlot != null && this.oRefreshTagObject.oIChartSlot instanceof DoseOverviewSlot && IsTitrated && (String.IsNullOrEmpty(oSlotTagObject.Dose) || String.Compare(oSlotTagObject.Dose, "0", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oSlotTagObject.Dose, CConstants.DoseTBD, StringComparison.CurrentCultureIgnoreCase) == 0))) {
      this.IsTBD = true;
    }
    else {
      this.IsTBD = false;
    }
    if (!(this.oRefreshTagObject.oIChartSlot instanceof TodayMultiSlot) && (String.Compare(oSlotTagObject.SlotStatus, SlotStatus.NOTYETRECORDED, StringComparison.CurrentCultureIgnoreCase) != 0 || String.Compare(oSlotTagObject.SlotStatus, SlotStatus.OVERDUE, StringComparison.CurrentCultureIgnoreCase) != 0 || String.Compare(oSlotTagObject.SlotStatus, SlotStatus.DEFEROVERDUE, StringComparison.CurrentCultureIgnoreCase) != 0 || String.Compare(oSlotTagObject.SlotStatus, SlotStatus.DUENOW, StringComparison.CurrentCultureIgnoreCase) != 0 || String.Compare(oSlotTagObject.SlotStatus, SlotStatus.DEFERDUENOW, StringComparison.CurrentCultureIgnoreCase) != 0) && oSlotTagObject != null && oSlotTagObject.IsSelfAdministered == true) {
      this.IsSelfAdminister = true;
    }
    else {
      this.IsSelfAdminister = false;
    }
    let IsPreviousActiveSequentialItem: boolean = false;
    let oTagDrugHeaderDetail: TagDrugHeaderDetail = <TagDrugHeaderDetail>(this.oRefreshTagObject.oDrugItem).Tag;
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
      let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
        Title: "LORENZO",
        Message: String.Format(Resource.InfusionChart.PreviousContSeqInProgress, oTagDrugHeaderDetail.DrugName),
        MessageButton: MessageBoxButton.OK,
        IconType: MessageBoxType.Critical,
        Width: 400
      });
      iMsgBox.Show();
    }
    else if (!this.bAdvanceAdminWarningDisplayed) {
      let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
        Title: "LORENZO",
        Message: String.Format(Resource.MedsAdminChartOverview.RecordAdmin_Msg, tmpDrugHdrDtl.DrugName),
        MessageButton: MessageBoxButton.YesNo,
        IconType: MessageBoxType.Question,
        Width: 400
      });
      iMsgBox.MessageBoxClose = (s, e) => { this.iMsgBox_YesNoAdminLaunch(s, e); };
      iMsgBox.Show();
    }
    else if (!this.IsTitratedDoseEmptyErrMsgExists && this.IsTBD) {
      let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
        Title: "LORENZO",
        Message: String.Format(Resource.MedsAdminChartToolTip.TitratedDoseEmptyErrMsg),
        MessageButton: MessageBoxButton.YesNo,
        IconType: MessageBoxType.Question,
        Width: 400
      });
      iMsgBox.Show();
      iMsgBox.MessageBoxClose = (s, e) => { this.iMsgBox_TitratedMsgClose(s, e); };
    }
    else if (!this.IsSelfAdministeredErrorMsgExists && this.IsSelfAdminister) {
      let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
        Title: "LORENZO",
        Message: String.Format(Resource.MedsAdminChartToolTip.SelfAdministeredErrorMsg),
        MessageButton: MessageBoxButton.YesNo,
        IconType: MessageBoxType.Question,
        Width: 400
      });
      iMsgBox.Show();
      iMsgBox.MessageBoxClose = (s, e) => { this.iMsgBox_SelfAdministeredMsgClose(s, e); };
    }
    else if (tmpDrugHdrDtl != null && tmpDrugHdrDtl.IsParacetamolIngredient && oSlotTagObject != null && oSlotTagObject.SlotDateTime.NotEquals(DateTime.MinValue) && !this.ParacetamolAlreadyAdministeredWarning_Displayed && ((String.Equals(oSlotTagObject.SlotStatus, SlotStatus.PLANNED, StringComparison.CurrentCultureIgnoreCase)) || (String.Equals(oSlotTagObject.SlotStatus, SlotStatus.OVERDUE, StringComparison.CurrentCultureIgnoreCase)) || (String.Equals(oSlotTagObject.SlotStatus, SlotStatus.DUENOW, StringComparison.CurrentCultureIgnoreCase)) || (String.Equals(oSlotTagObject.SlotStatus, SlotStatus.DEFERDUENOW, StringComparison.CurrentCultureIgnoreCase)) || (String.Equals(oSlotTagObject.SlotStatus, SlotStatus.DEFEROVERDUE, StringComparison.CurrentCultureIgnoreCase)) || (String.Equals(oSlotTagObject.SlotStatus, SlotStatus.PATIENTSELFADMIN, StringComparison.CurrentCultureIgnoreCase)) || (String.Equals(oSlotTagObject.SlotStatus, SlotStatus.HOMELEAVE, StringComparison.CurrentCultureIgnoreCase)) || (String.Equals(oSlotTagObject.SlotStatus, SlotStatus.NOTYETRECORDED, StringComparison.CurrentCultureIgnoreCase)))) {
      let oSlotHelper: SlotAdministrationHelper = new SlotAdministrationHelper();
      // oSlotHelper.TriggerParacetamolWarningEvent -= this.oSlotHelper_TriggerParacetamolWarningEvent;
      oSlotHelper.TriggerParacetamolWarningEvent = this.oSlotHelper_TriggerParacetamolWarningEvent;
      oSlotHelper.TriggerParacetamolWarningEvent = (s, e) => { this.oSlotHelper_TriggerParacetamolWarningEvent(e); };
      oSlotHelper.IsAnyParacetamolAdministered(CommonBB.GetServerDateTime(), 0);
      Busyindicator.SetStatusBusy("CheckParaAdministered");
    }
    else {
      let oSlotHelper: SlotAdministrationHelper = new SlotAdministrationHelper();
      // oSlotHelper.WarningBeforeAdministrationCompletedEvent -= this.oSlotHelper_WarningBeforeAdministrationCompleted;
      oSlotHelper.WarningBeforeAdministrationCompletedEvent = this.oSlotHelper_WarningBeforeAdministrationCompleted;
      oSlotHelper.WarningBeforeAdministrationCompletedEvent = (s, e) => { this.oSlotHelper_WarningBeforeAdministrationCompleted(s, e); };
      oSlotHelper.CheckDuplicateSlotWarningExists(tmpDrugHdrDtl, oSlotTagObject.SlotOID, oSlotTagObject.SlotStatus, this.IsPGD, LaunchAdminType.LaunchRecordAdmin);
    }
  }
  oSlotHelper_TriggerParacetamolWarningEvent(bDisplayWarning: boolean): void {
    Busyindicator.SetStatusIdle("CheckParaAdministered");
    if (bDisplayWarning) {
      let objDisplayParacetamolWarning: iMessageBox = new iMessageBox();
      objDisplayParacetamolWarning.Title = "Lorenzo";
      objDisplayParacetamolWarning.MessageButton = MessageBoxButton.YesNo;
      objDisplayParacetamolWarning.IconType = MessageBoxType.Question;
      objDisplayParacetamolWarning.Width = 420;
      objDisplayParacetamolWarning.Height = 180;
      // objDisplayParacetamolWarning.MessageBoxClose -= this.objDisplayParacetamolWarning_MessageBoxClose;
      objDisplayParacetamolWarning.MessageBoxClose = this.objDisplayParacetamolWarning_MessageBoxClose;
      objDisplayParacetamolWarning.MessageBoxClose = (s, e) => { this.objDisplayParacetamolWarning_MessageBoxClose(s, e); };
      objDisplayParacetamolWarning.Message = Resource.MedicationAdministrator.ParacetamolAdministration_WarningMsg;
      objDisplayParacetamolWarning.Tag = CConstants.ParacetamolRecentlyAdministered;
      objDisplayParacetamolWarning.Show();
    }
    else {
      this.objDisplayParacetamolWarning_MessageBoxClose(null, new MessageEventArgs(MessageBoxResult.Yes));
    }
  }
  objDisplayParacetamolWarning_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
    if (e.MessageBoxResult == MessageBoxResult.No) {
      this.ParacetamolAlreadyAdministeredWarning_Displayed = false;
    }
    else {
      this.ParacetamolAlreadyAdministeredWarning_Displayed = true;
      this.ValidateBeforeRecordAdminLaunch();
    }
  }
  iMsgBox_SelfAdministeredMsgClose(sender: Object, e: MessageEventArgs): void {
    let oMsgBox: iMessageBox = ObjectHelper.CreateType<iMessageBox>(sender, iMessageBox);
    if (oMsgBox != null) {
      if (e.MessageBoxResult == MessageBoxResult.Yes) {
        this.IsSelfAdministeredErrorMsgExists = true;
        this.ValidateBeforeRecordAdminLaunch();
      }
    }
  }
  iMsgBox_TitratedMsgClose(sender: Object, e: MessageEventArgs): void {
    let oMsgBox: iMessageBox = ObjectHelper.CreateType<iMessageBox>(sender, iMessageBox);
    if (oMsgBox != null) {
      if (e.MessageBoxResult == MessageBoxResult.Yes) {
        this.IsTitratedDoseEmptyErrMsgExists = true;
        this.ValidateBeforeRecordAdminLaunch();
      }
    }
  }
  iMsgBox_YesNoAdminLaunch(sender: Object, e: MessageEventArgs): void {
    // let oMsgBox: iMessageBox = ObjectHelper.CreateType<iMessageBox>(sender, iMessageBox);
    // if (oMsgBox != null) {
    if (e.MessageBoxResult == MessageBoxResult.Yes) {
      this.bAdvanceAdminWarningDisplayed = true;
      this.ValidateBeforeRecordAdminLaunch();
    }
    // }
  }
  oSlotHelper_WarningBeforeAdministrationCompleted(IsPGD: boolean, eWhatToLaunch: LaunchAdminType): void {
    if (this.oTagObject != null && this.oTagObject.oIChartSlot != null && this.oTagObject.oIChartSlot instanceof DoseOverviewSlot && (ObjectHelper.CreateType<DoseOverviewSlot>(this.oTagObject.oIChartSlot, DoseOverviewSlot)).Tag != null && (ObjectHelper.CreateType<DoseOverviewSlot>(this.oTagObject.oIChartSlot, DoseOverviewSlot)).Tag instanceof TagSlotDetail) {
      switch (eWhatToLaunch) {
        case LaunchAdminType.LaunchRecordAdmin:
          if (this.oTagObject.oDrugItem.IsInfusion && !(ObjectHelper.CreateType<TagSlotDetail>((ObjectHelper.CreateType<DoseOverviewSlot>(this.oTagObject.oIChartSlot, DoseOverviewSlot)).Tag, TagSlotDetail)).IsBolus) {
            this.LaunchRecordadmin(this.oTagObject);
          }
          else {
            this.LaunchNonInfRecordAdmin(this.oTagObject, ObjectHelper.CreateType<TagSlotDetail>((ObjectHelper.CreateType<DoseOverviewSlot>(this.oTagObject.oIChartSlot, DoseOverviewSlot)).Tag, TagSlotDetail));
          }
          break;
        case LaunchAdminType.LaunchModifyAdmin:
          let oDrugHeaderDetail: TagDrugHeaderDetail = null;
          if (this.oTagObject.oDrugItem != null && this.oTagObject.oDrugItem instanceof DrugItem) {
            oDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>((ObjectHelper.CreateType<DrugItem>(this.oTagObject.oDrugItem, DrugItem)).Tag, TagDrugHeaderDetail);
          }
          if (oDrugHeaderDetail != null && oDrugHeaderDetail.ParentPrescriptionItemOID > 0 && oDrugHeaderDetail.InfusionSeqOrder > 1 && this.ValidatePreviousActiveSequentialItem(oDrugHeaderDetail)) {
            let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
              Title: "LORENZO",
              Message: String.Format(Resource.InfusionChart.PreviousContSeqInProgress, oDrugHeaderDetail.DrugName),
              MessageButton: MessageBoxButton.OK,
              IconType: MessageBoxType.Critical,
              Width: 400
            });
            iMsgBox.Show();
          }
          else {
            this.ModifyStrikeThroughOpen(this.oTagObject);
          }
          break;
      }
    }
  }
  oMixedMultiRouteSel_Closed(args: AppDialogEventargs): void {
    if (args.Result == AppDialogResult.Ok) {
      let tmpMultiSel: MixedMultiRouteAdminSelection = ObjectHelper.CreateType<MixedMultiRouteAdminSelection>(args.Content.Component, MixedMultiRouteAdminSelection);
      let oTagDrugHeaderDetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(this.oRefreshTagObject.oDrugItem.Tag, TagDrugHeaderDetail);
      let oTagSlotDetail: TagSlotDetail = null;
      if (this.oRefreshTagObject.oIChartSlot != null && this.oRefreshTagObject.oIChartSlot instanceof DoseOverviewSlot) {
        oTagSlotDetail = ObjectHelper.CreateType<TagSlotDetail>((ObjectHelper.CreateType<DoseOverviewSlot>(this.oRefreshTagObject.oIChartSlot, DoseOverviewSlot)).Tag, TagSlotDetail);
      }
      if (args.Content.Component != null && tmpMultiSel != null && tmpMultiSel.iRdbInfusionAdmin.IsChecked == true) {
        if (oTagDrugHeaderDetail != null && Common.IsPreviousSeqPresItemInprogress(oTagDrugHeaderDetail, this.oGetMedsChartData.LstDrugDetail)) {
          let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
            Title: "LORENZO",
            Message: String.Format(Resource.InfusionChart.PreviousContSeqInProgress, this.oRefreshTagObject.oDrugItem.Drugname),
            MessageButton: MessageBoxButton.OK,
            IconType: MessageBoxType.Critical
          });
          iMsgBox.Show();
        }
        else {
          this.LaunchRecordadmin(this.oRefreshTagObject);
        }
      }
      else {
        let oSlotHelper: SlotAdministrationHelper = new SlotAdministrationHelper();
        // oSlotHelper.WarningBeforeAdministrationCompletedEvent -= this.oSlotHelper_WarningBeforeAdministrationCompleted;
        // oSlotHelper.WarningBeforeAdministrationCompletedEvent = this.oSlotHelper_WarningBeforeAdministrationCompleted;
        oSlotHelper.WarningBeforeAdministrationCompletedEvent = (s, e) => { this.oSlotHelper_WarningBeforeAdministrationCompleted(s, e); };
        if (oTagSlotDetail != null) {
          oSlotHelper.CheckDuplicateSlotWarningExists(oTagDrugHeaderDetail, oTagSlotDetail.SlotOID, oTagSlotDetail.SlotStatus, this.IsPGD, LaunchAdminType.LaunchModifyAdmin);
        }
        this.CurrentActivityCode = ActivityCode.None;
      }
      if(ObjectHelper.OpenWindowInst == false)
      // ObjectHelper.stopFinishAndCancelEvent(false);
      args.AppChildWindow.DialogResult = true;
    }
    else {
      this.CurrentActivityCode = ActivityCode.None;
      // ObjectHelper.stopFinishAndCancelEvent(false);
      args.AppChildWindow.DialogRef.close();
    }
  }
  ValidatePreviousActiveSequentialItem(oDrugHeaderDetail: TagDrugHeaderDetail): boolean {
    let IsPreviousActiveSeqItem: boolean = false;
    if (oDrugHeaderDetail.ParentPrescriptionItemOID > 0 && oDrugHeaderDetail.InfusionSeqOrder > 1) {
      let oParam: string[] = new Array(4);
      oParam[0] = oDrugHeaderDetail.ParentPrescriptionItemOID.ToString();
      oParam[1] = oDrugHeaderDetail.InfusionSeqOrder.ToString();
      oParam[2] = "0";
      oParam[3] = ChartContext.PatientOID.ToString();
      let IsPreviousSeqItemActive: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("GetPreviousSeqItemActive", oParam), 'string');
      IsPreviousActiveSeqItem = String.Equals(IsPreviousSeqItemActive, "1", StringComparison.InvariantCultureIgnoreCase) ? true : false;
    }
    return IsPreviousActiveSeqItem;
  }
  oHdrRecordAdmin: CDrugHdrAddnlInfo;
  oMedsAdminRec: MedsRecordAdminstrator;
  oNonInfSlotVM: SlotDetailVM;
  LaunchNonInfRecordAdmin(oTagObject: TagObject, oTagSlotDetail: TagSlotDetail): void {
    this.oHdrRecordAdmin = new CDrugHdrAddnlInfo();
    this.oHdrRecordAdmin.DueAt = oTagSlotDetail.SlotDateTime.ToUserDateTimeString(CConstants.DateTimeFormat);
    let oTagDrugHeaderDetail: TagDrugHeaderDetail = <TagDrugHeaderDetail>(oTagObject.oDrugItem).Tag;
    this.oNonInfSlotVM = new SlotDetailVM();
    this.oNonInfSlotVM.CurrentServerDate = this.dtServerDate;
    this.oNonInfSlotVM.ScheduledDTTM = oTagSlotDetail.SlotDateTime;
    this.oNonInfSlotVM.PrescriptionItemOID = Number.Parse(oTagObject.oDrugItem.Key);
    this.oNonInfSlotVM.DrugDetail = oTagObject.oDrugItem;
    this.oNonInfSlotVM.IsConditionalExists = oTagDrugHeaderDetail.IsConditionalExists;
    this.oNonInfSlotVM.IdentifyingOID = oTagDrugHeaderDetail.DrugIdentifyingOID;
    this.oNonInfSlotVM.IdentifyingType = oTagDrugHeaderDetail.DrugIdentifyingType;
    this.oNonInfSlotVM.MCVersionNo = oTagDrugHeaderDetail.MCVersionNo;
    this.oNonInfSlotVM.AdminMethod = oTagDrugHeaderDetail.AdminMethod;
    this.oNonInfSlotVM.RouteOID = oTagDrugHeaderDetail.RouteOID;
    this.oNonInfSlotVM.IsControlledDrug = oTagDrugHeaderDetail.IsControlDrug;
    this.oNonInfSlotVM.IsFluidControlledDrug = oTagDrugHeaderDetail.IsFluidControlDrug;
    this.oNonInfSlotVM.LorenzoID = oTagDrugHeaderDetail.LorenzoID;
    this.oNonInfSlotVM.PrescriptionStartDate = oTagDrugHeaderDetail.StartDate;
    this.oNonInfSlotVM.DoseType = oTagDrugHeaderDetail.DoseType;
    this.oNonInfSlotVM.ScheduledDTTM = oTagSlotDetail.SlotDateTime;
    if (oTagDrugHeaderDetail.ReviewDTTM.NotEquals(DateTime.MinValue)) {
      this.oHdrRecordAdmin.ReviewAt = oTagDrugHeaderDetail.ReviewDTTM.ToUserDateTimeString(CConstants.DateTimeFormat);
      if (DateTime.LessThanOrEqualTo(oTagDrugHeaderDetail.ReviewDTTM.Date, (CommonBB.GetServerDateTime().Date))) {
        this.oHdrRecordAdmin.ReviewAtVisibility = Visibility.Visible;
        this.oHdrRecordAdmin.ReviewIconTooltip = Common.GetReviewIconTooltip(oTagDrugHeaderDetail.ReviewType, oTagDrugHeaderDetail.ReviewDTTM, oTagDrugHeaderDetail.ReviewRequestedComments, oTagDrugHeaderDetail.ReviewRequestedby);
      }
    }
    if (String.Equals(this.oNonInfSlotVM.DoseType, DoseTypeCode.DOSAGERANGE, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.oNonInfSlotVM.DoseType, DoseTypeCode.CONDITIONAL, StringComparison.InvariantCultureIgnoreCase))
      this.oNonInfSlotVM.Dose = String.Empty;
    else this.oNonInfSlotVM.Dose = !(String.IsNullOrEmpty(oTagSlotDetail.Dose)) ? oTagSlotDetail.Dose : String.Empty;
    this.oNonInfSlotVM.DoseUOM = !(String.IsNullOrEmpty(oTagSlotDetail.DoseUOM)) ? oTagSlotDetail.DoseUOM : String.Empty;
    this.oNonInfSlotVM.DoseUOMOID = oTagSlotDetail.DoseUOMOID;
    this.oNonInfSlotVM.DoseUOMLzoID = !(String.IsNullOrEmpty(oTagSlotDetail.DoseUOMLzoID)) ? oTagSlotDetail.DoseUOMLzoID : String.Empty;
    this.oNonInfSlotVM.PresScheduleOID = oTagSlotDetail.SlotOID;
    this.oNonInfSlotVM.LDose = oTagSlotDetail.LowerDose;
    this.oNonInfSlotVM.UDose = oTagSlotDetail.UpperDose;
    this.oNonInfSlotVM.SlotsTimeIntervalAvg = oTagDrugHeaderDetail.SlotsTimeIntervalAvg;
    this.oNonInfSlotVM.IsNextHomeLeaveSlotExists = true;
    if (this.oNonInfSlotVM != null && oTagDrugHeaderDetail != null && !String.IsNullOrEmpty(this.oNonInfSlotVM.PrescriptionItemStatus)) {
      oTagDrugHeaderDetail.PreviousPrescriptionItemStatus = this.oNonInfSlotVM.PrescriptionItemStatus;
    }
    this.oNonInfSlotVM.PrescriptionItemStatus = oTagDrugHeaderDetail.PrescriptionItemStatus;
    this.oNonInfSlotVM.MultiRoute_Type = oTagDrugHeaderDetail.MultiRoute_Type;
    this.oNonInfSlotVM.PrescriptionEndDate = oTagDrugHeaderDetail.EndDate;
    this.oNonInfSlotVM.FreqPerodCode = oTagDrugHeaderDetail.FreqPerodcode;
    this.oNonInfSlotVM.IsLastSlotinCurrentView = oTagSlotDetail.IsLastSlotInView;
    this.oNonInfSlotVM.CACode = MedAction.RecordAdministration;
    this.oNonInfSlotVM.Status = oTagSlotDetail.SlotStatus;
    this.oNonInfSlotVM.AdministrationDetail = new AdministrationDetailVM();
    this.oNonInfSlotVM.AdministrationDetail.MedAdminOID = oTagSlotDetail.MedsAdminOID;
    if (oTagDrugHeaderDetail.IsAllowAdvanceAdmin || oTagSlotDetail.IsAllowAdvanceAdminSlot) {
      this.oNonInfSlotVM.AdministrationDetail.IsAdministeredInAdvance = true;
    }
    if (oTagSlotDetail.SlotStatus == SlotStatus.NOTGIVEN && oTagSlotDetail.RecordedAt.NotEquals(DateTime.MinValue) && oTagSlotDetail.RecordedBy != null) {
      this.oNonInfSlotVM.AdministrationDetail.RecordedBy = oTagSlotDetail.RecordedBy;
      this.oNonInfSlotVM.AdministrationDetail.RecordedAt = oTagSlotDetail.RecordedAt;
    }
    // else if (oTagSlotDetail.LastModifiedAt.NotEquals(DateTime.MinValue))
    else if (DateTime.NotEquals(oTagSlotDetail.LastModifiedAt, DateTime.MinValue))
      this.oNonInfSlotVM.AdministrationDetail.RecordedAt = oTagSlotDetail.LastModifiedAt;
    this.oNonInfSlotVM.IsInfusionItem = oTagDrugHeaderDetail.IsInfusion;
    this.IsLastSlotExist(this.oNonInfSlotVM);
    let oSlotHelper: SlotAdministrationHelper = new SlotAdministrationHelper();
    oSlotHelper.LaunchRecordAdminEvent = (s, e) => { this.oSlotHelper_LaunchNonInfRecordAdminEvent(s); };
    oSlotHelper.GetSlotDetails(this.oNonInfSlotVM);
    this.dtScheduledDTTM = oTagSlotDetail.SlotDateTime;
  }
  oSlotHelper_LaunchNonInfRecordAdminEvent(objAdminDetail: AdministrationDetail): void {
    if (this.oNonInfSlotVM != null && this.oNonInfSlotVM.IsPICompOrDiscAndScheduleDTTMBeyondPIStopDTTM) {
      this.ReloadMedChartOverview();
    }
    else {
      this.oMedsAdminRec = new MedsRecordAdminstrator();
      this.oMedsAdminRec.constructorImpl(this.oNonInfSlotVM);
      this.oMedsAdminRec.objDrugHeader = new DrugHeader1();
      this.oMedsAdminRec.objDrugHeader.oDrugHeader = new CDrugHeader();
      this.oMedsAdminRec.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo = new DrugHeaderItem();
      this.oMedsAdminRec.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowFrequency = false;
      this.oMedsAdminRec.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowSite = false;
      this.oMedsAdminRec.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowAsrequired = false;
      this.oHdrRecordAdmin.SteppedDoseUOM = this.oNonInfSlotVM.DoseUOM;
      this.oHdrRecordAdmin.SteppedLowerDose = this.oNonInfSlotVM.LDose;
      this.oHdrRecordAdmin.SteppedUpperDose = this.oNonInfSlotVM.UDose;
      this.oHdrRecordAdmin.RecordAdminViewed = RecordAdminType.RecordAdmin;
      this.oMedsAdminRec.objDrugHeader.DataContext = Common.SetDrugHeaderContent(this.oRefreshTagObject.oDrugItem, this.oHdrRecordAdmin, this.oMedsAdminRec.objDrugHeader);
      this.oMedsAdminRec.objAdminDetail = objAdminDetail;
      // objAdminDetail = null;
      this.oMedsAdminRec.OnRecAdminFinishEvent = () => { this.oMedsAdminRec_OnRecAdminFinishEvent(); };
      this.oMedsAdminRec.onDialogClose = this.oMedsAdminRec_Closed;
      // ObjectHelper.stopFinishAndCancelEvent(true);
      AppActivity.OpenWindow("Record administration", this.oMedsAdminRec, (s) => { this.oMedsAdminRec_Closed(s) }, "Record administration", true, 775, 450, false, WindowButtonType.OkCancel, null);
    }
  }
  oMedsAdminRec_Closed(args: AppDialogEventargs): void {
    if (this.oRefreshTagObject != null && this.oRefreshTagObject.oIChartSlot instanceof DoseOverviewSlot) {
      this.oMedsAdminRec = args.Content.Component;
      if (!this.oNonInfSlotVM.IsSubmitInProgress) {
        if (this.oMedsAdminRec != null && args.Result == AppDialogResult.Ok) {
          // if (!Common.CheckIfLockingDurationElapsed(new EventHandler<MessageEventArgs>(this.oMsgBox_RecAdminClose))) 
          if (!Common.CheckIfLockingDurationElapsed((o, e) => { this.oMsgBox_RecAdminClose(o, e) })) {
            this.oNonInfSlotVM.IsSubmitInProgress = true;
            Busyindicator.SetStatusBusy("Administration", true);
            // ObjectHelper.stopFinishAndCancelEvent(false);
            this.oMedsAdminRec.cmdOk_Click();
          }
        }
        else if (args.Result == AppDialogResult.Cancel) {
          // ObjectHelper.stopFinishAndCancelEvent(false);
          this.oMedsAdminRec.dupDialogRef.close();
          // this.oMedsAdminRec.appDialog.DialogResult = true;
          Busyindicator.SetStatusIdle("MedChart");
        }
      }
    }
  }
  oMsgBox_RecAdminClose(sender: Object, e: MessageEventArgs): void {
    // ObjectHelper.stopFinishAndCancelEvent(false);
    this.oMedsAdminRec.appDialog.DialogResult = true;
    Busyindicator.SetStatusIdle("MedChart");
  }
  oMedsAdminRec_OnRecAdminFinishEvent(): void {
    if (this.oMedsAdminRec != null) {
      let MedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
      if (MedAdminVM != null) {
        MedAdminVM.CumulativeParacetamol.GetCumulativeParacetamol();
      }
      this.oSDVM = ObjectHelper.CreateType<SlotDetailVM>(this.oMedsAdminRec.DataContext, SlotDetailVM);
      if (this.oNonInfSlotVM != null && this.oNonInfSlotVM.IsPICompOrDiscAndScheduleDTTMBeyondPIStopDTTM) {
        this.ReloadMedChartOverview();
      }
      else if (this.oSDVM != null) {
        this.RefreshModifyAdminSlot();
      }
    }
    // ObjectHelper.stopFinishAndCancelEvent(false);
    // this.oMedsAdminRec.appDialog.DialogResult = true;
    this.oMedsAdminRec.dupDialogRef.close();
    Busyindicator.SetStatusIdle("MedChart");
    Busyindicator.SetStatusIdle("Administration");
  }
  oCurrentOverviewSlotInf: DoseOverviewSlot = null;
  oSlotTagObjectInf: TagSlotDetail = null;
  oDrugHeaderDetailInf: TagDrugHeaderDetail = null;
  oClickedTagObjectInf: TagObject = null;
  LaunchRecordadmin(TagObject: TagObject): void {
    let oInfRecAdminTypeCode: InfRecAdminTypeCode = new InfRecAdminTypeCode();
    let oInfusionRecAdminHelper: InfusionRecAdminHelper = new InfusionRecAdminHelper();
    let oCAlaunch: CALaunch;
    this.oClickedTagObjectInf = TagObject;
    if (TagObject != null) {
      if (TagObject.oIChartSlot != null && TagObject.oIChartSlot instanceof DoseOverviewSlot) {
        this.oCurrentOverviewSlotInf = ObjectHelper.CreateType<DoseOverviewSlot>(TagObject.oIChartSlot, DoseOverviewSlot);
        this.oSlotTagObjectInf = ObjectHelper.CreateType<TagSlotDetail>(this.oCurrentOverviewSlotInf.Tag, TagSlotDetail);
      }
      else if (TagObject.oIChartSlot != null && TagObject.oIChartSlot instanceof AdministratedSlot) {
        this.oSlotTagObjectInf = ObjectHelper.CreateType<TagSlotDetail>((ObjectHelper.CreateType<AdministratedSlot>(TagObject.oIChartSlot, AdministratedSlot)).Tag, TagSlotDetail);
      }
      if (TagObject.oDrugItem != null && TagObject.oDrugItem instanceof DrugItem)
        this.oDrugHeaderDetailInf = ObjectHelper.CreateType<TagDrugHeaderDetail>((ObjectHelper.CreateType<DrugItem>(TagObject.oDrugItem, DrugItem)).Tag, TagDrugHeaderDetail);
    }
    if (this.oDrugHeaderDetailInf != null && oInfusionRecAdminHelper != null) {
      oInfusionRecAdminHelper.ScanRecMedMultiRoute = this.oDrugHeaderDetailInf.MultiRoute_Type;
    }
    let _canBeStruckThorugh: boolean = true;
    if ((String.Equals(this.oDrugHeaderDetailInf.INFTYCODE, InfusionTypesCode.CONTINUOUS) || String.Equals(this.oDrugHeaderDetailInf.INFTYCODE, InfusionTypesCode.SINGLEDOSEVOLUME) || String.Equals(this.oDrugHeaderDetailInf.INFTYCODE, InfusionTypesCode.FLUID)) && this.oDrugHeaderDetailInf.SequenceParentPrescItemOID > 0) {
      let _ParentPrescriptionOID = this.oDrugHeaderDetailInf.SequenceParentPrescItemOID;
      let _CurrentPrescriptionItemOID: number = this.oDrugHeaderDetailInf.PrescriptionItemOID;
      let _InfusionsPartOfSequence = this.oGetMedsChartData.LstDrugDetail.Where(x => x.DrugHeader.FormViewParameters.IntravenousInfusionData.SequenceParentPrescItemOID == _ParentPrescriptionOID);
      let _IsAllowStrikeout: boolean = false;
      if (this.oDrugHeaderDetailInf.PrescriptionItemOID > 0 && !String.IsNullOrEmpty(this.oDrugHeaderDetailInf.PrescriptionItemStatus) && (String.Equals(this.oDrugHeaderDetailInf.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.oDrugHeaderDetailInf.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.oDrugHeaderDetailInf.PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.InvariantCultureIgnoreCase))) {
        _IsAllowStrikeout = _InfusionsPartOfSequence.Any(c => c.DrugHeader.AmendedPrescriptionItemOID > 0 && c.DrugHeader.AmendedPrescriptionItemOID == this.oDrugHeaderDetailInf.PrescriptionItemOID);
      }
      let _CurrentItemSequenceOrder: number = _InfusionsPartOfSequence.Where(x => x.DrugHeader.PrescriptionItemOID == _CurrentPrescriptionItemOID).FirstOrDefault().DrugHeader.FormViewParameters.IntravenousInfusionData.SeqInfOrderForPervImmediateItm;
      let _NextImmediateItem: DrugDetail = _InfusionsPartOfSequence.Where(x => !String.Equals(x.DrugHeader.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(x.DrugHeader.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(x.DrugHeader.PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.InvariantCultureIgnoreCase) && x.DrugHeader.FormViewParameters.IntravenousInfusionData.SeqInfOrderForPervImmediateItm > _CurrentItemSequenceOrder).FirstOrDefault();
      if (!_IsAllowStrikeout && _NextImmediateItem != null && _NextImmediateItem.SlotDetails != null && _NextImmediateItem.SlotDetails.Count > 0) {
        let IsNonPlannedSlotExist: boolean = _NextImmediateItem.SlotDetails.Any(_SlotStatus => (_SlotStatus.Status != null) && (_SlotStatus.Status != SlotStatus.PLANNED) && (_SlotStatus.Status != SlotStatus.OVERDUE) && (_SlotStatus.Status != SlotStatus.DUENOW) && (_SlotStatus.Status != SlotStatus.NOTYETRECORDED) && (_SlotStatus.Status != SlotStatus.NOTKNOWN));
        _canBeStruckThorugh = (IsNonPlannedSlotExist ? false : true);
      }
      else {
        _canBeStruckThorugh = true;
      }
      if (_NextImmediateItem != null && this.oDrugHeaderDetailInf != null) {
        this.oDrugHeaderDetailInf.SequentialPrescriptionItemOID = _NextImmediateItem.DrugHeader.PrescriptionItemOID;
        this.oDrugHeaderDetailInf.InfusionRecordAdminTypeCode = InfusionRecordAdminTypeCodes.ContinuousSequentialAdministration;
      }
      if (this.oDrugHeaderDetailInf.InfusionRecordAdminTypeCode > 0) {
        oInfRecAdminTypeCode.TypeCode = this.oDrugHeaderDetailInf.InfusionRecordAdminTypeCode;
        oInfRecAdminTypeCode.NextPrescOID = this.oDrugHeaderDetailInf.SequentialPrescriptionItemOID > 0 ? this.oDrugHeaderDetailInf.SequentialPrescriptionItemOID : 0;
      }
    }
    let objINFRecAdmParams: INFRecordAdminParams = new INFRecordAdminParams();
    objINFRecAdmParams.SlotStatus = this.oSlotTagObjectInf.SlotStatus;
    objINFRecAdmParams.SlotOID = this.oSlotTagObjectInf.SlotOID;
    objINFRecAdmParams.ScheduledDTTM = this.oSlotTagObjectInf.SlotDateTime;
    if (String.Compare(objINFRecAdmParams.SlotStatus, SlotStatus.NOTYETRECORDED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(objINFRecAdmParams.SlotStatus, SlotStatus.NOTKNOWN, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(objINFRecAdmParams.SlotStatus, SlotStatus.STOPPED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(objINFRecAdmParams.SlotStatus, SlotStatus.COMPLETED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(objINFRecAdmParams.SlotStatus, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Equals(objINFRecAdmParams.SlotStatus, SlotStatus.HOMELEAVE, StringComparison.InvariantCultureIgnoreCase)) {
      oCAlaunch = CALaunch.OverviewChart;
      this.InfusionPreviousSlotStatus = objINFRecAdmParams.SlotStatus;
      oInfusionRecAdminHelper.LaunchRecordadmininfusion(objINFRecAdmParams, this.oSlotTagObjectInf.MedsAdminOID, Convert.ToInt64(TagObject.oDrugItem.Key), this.oDrugHeaderDetailInf.InfChartAlerts, (s, e) => { this.OnInfRecordAdminFinish(s, e) }, false, _canBeStruckThorugh, oInfRecAdminTypeCode, oCAlaunch);
    }
    else this.CurrentActivityCode = ActivityCode.None;
  }
  CheckSlotModificationTimeFrame(TagObject: TagObject): boolean {
    let _result: boolean = false;
    let oSlotTagObject: TagSlotDetail = null;
    let tmpDoseOverVwSlot: DoseOverviewSlot = (TagObject != null) ? ObjectHelper.CreateType<DoseOverviewSlot>(TagObject.oIChartSlot, DoseOverviewSlot) : null;
    if (TagObject != null && TagObject.oIChartSlot != null && TagObject.oIChartSlot instanceof DoseOverviewSlot && tmpDoseOverVwSlot != null && tmpDoseOverVwSlot.Tag != null) {
      oSlotTagObject = ObjectHelper.CreateType<TagSlotDetail>(tmpDoseOverVwSlot.Tag, TagSlotDetail);
      if (oSlotTagObject != null) {
        let dtWithModTimeWindow: DateTime = oSlotTagObject.SlotDateTime.AddMinutes(MedChartData.SlotModificationTime);
        if (DateTime.LessThan(CommonBB.GetServerDateTime(), dtWithModTimeWindow)) {
          _result = true;
        }
      }
    }
    return _result;
  }
  OnInfRecordAdminFinish(objRes: SlotDetail, eAppDialogResult: AppDialogResult): void {
    let oRowRefreshForChart: ChartRow = new ChartRow();
    let oCurrentChartRow: List<ChartRow> = new List<ChartRow>();
    if (objRes != null && objRes.AdministrationDetail != null && this.oClickedTagObjectInf != null) {
      let oDoseOverviewSlot: DoseOverviewSlot = ObjectHelper.CreateType<DoseOverviewSlot>(this.oClickedTagObjectInf.oIChartSlot, DoseOverviewSlot);
      if (oDoseOverviewSlot != null) {
        let oTagSlotDetail: TagSlotDetail = ObjectHelper.CreateType<TagSlotDetail>(oDoseOverviewSlot.Tag, TagSlotDetail);
        if (oTagSlotDetail != null) {
          oTagSlotDetail.MedsAdminOID = objRes.AdministrationDetail.MedAdminOID;
          oTagSlotDetail.IsAdministeredOnInfusionChart = objRes.AdministrationDetail.IsAdministeredOnInfusionChart;
        }
      }
    }
    if (eAppDialogResult == AppDialogResult.Ok && objRes != null) {
      if (this.oDrugHeaderDetailInf.ParentPrescriptionItemOID > 0) {
        this.ReloadMedChartOverview();
      }
      else {
        let chtStartDate: DateTime = this.medChartOverview.StartDate;
        let chtEndDate: DateTime = this.medChartOverview.EndDate;
        let nMultiSlotDueCount: number = 0;
        let nMultiSlotOverdueCount: number = 0;
        let oChartRow: ChartRow = new ChartRow();
        let oSlotDetail: ObservableCollection<SlotDetail> = new ObservableCollection<SlotDetail>();
        let oChartCells: ObservableCollection<ChartCell> = new ObservableCollection<ChartCell>();
        let oDrugdetail: DrugDetail = new DrugDetail();
        // oDrugdetail.DrugHeader = new Common.MedicationMgmt.MedicationAdmin.DrugHeader();
        oDrugdetail.DrugHeader = new DrugHeader();
        let oColkey: List<string> = new List<string>();
        let oChartCellslst: List<ChartCell>;
        this.oGetMedsChartData.IsCompleted = false;
        this.oGetMedsChartData.MinSlotHeight = 38;
        if (objRes.AdministrationDetail != null && objRes.AdministrationDetail.oInfusionAdminDetail != null) {
          let sBagVol = objRes.AdministrationDetail.oInfusionAdminDetail.Where(x => ((String.Compare(x.ActionCode, MedicationAction.BEGUN, StringComparison.CurrentCultureIgnoreCase) == 0) || (String.Compare(x.ActionCode, MedicationAction.CHANGEBAG, StringComparison.CurrentCultureIgnoreCase) == 0))).OrderByDescending(x => x.oInfusionBagDetail.BagSequence).Select(x => x).FirstOrDefault();
          if (sBagVol != null && sBagVol.oInfusionBagDetail != null) {
            objRes.AdministrationDetail.CurrentBagVolumeInfused = sBagVol.oInfusionBagDetail.BagVolume;
            if (sBagVol.oInfusionBagDetail.BagVolumeUOM != null) {
              objRes.AdministrationDetail.CurrentBagVolumeInfusedUOMName = sBagVol.oInfusionBagDetail.BagVolumeUOM.UOMName;
            }
          }
        }
        if (this.oGetMedsChartData.LstDrugDetail != null && this.oClickedTagObjectInf != null && this.oClickedTagObjectInf.oDrugItem != null) {
          let oTagDrugHeaderDetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(this.oClickedTagObjectInf.oDrugItem.Tag, TagDrugHeaderDetail);
          if (oTagDrugHeaderDetail != null) {
            for (let jCnt: number = 0; jCnt < this.oGetMedsChartData.LstDrugDetail.Count; jCnt++) {
              if (this.oGetMedsChartData.LstDrugDetail[jCnt].DrugHeader.PrescriptionItemOID == oTagDrugHeaderDetail.PrescriptionItemOID) {
                oDrugdetail.DrugHeader = this.oGetMedsChartData.LstDrugDetail[jCnt].DrugHeader;
                oSlotDetail = this.oGetMedsChartData.LstDrugDetail[jCnt].SlotDetails;
                for (let iCnt: number = 0; iCnt < oSlotDetail.Count; iCnt++) {
                  if (oSlotDetail[iCnt].OID == objRes.OID) {
                    oSlotDetail[iCnt] = objRes;
                    this.oGetMedsChartData.LstDrugDetail[jCnt].SlotDetails[iCnt] = objRes;
                    break;
                  }
                }
                if (String.Equals(objRes.Status, SlotStatus.DELETED, StringComparison.CurrentCultureIgnoreCase)) {
                  oSlotDetail.Remove(objRes);
                  this.oGetMedsChartData.LstDrugDetail[jCnt].SlotDetails.Remove(objRes);
                }
                break;
              }
            }
          }
        }
        oDrugdetail.SlotDetails = oSlotDetail;
        oDrugdetail.DrugHeader.IsInfusion = this.oDrugHeaderDetailInf.IsInfusion;
        oDrugdetail.DrugHeader.InfusionType = this.oDrugHeaderDetailInf.INFTYCODE;
        oDrugdetail.DrugHeader.ItemSubType = this.oDrugHeaderDetailInf.ItemSubType;
        if (oDrugdetail != null && this.oDrugHeaderDetailInf != null && oDrugdetail.DrugHeader != null && !String.IsNullOrEmpty(oDrugdetail.DrugHeader.PrescriptionItemStatus)) {
          this.oDrugHeaderDetailInf.PreviousPrescriptionItemStatus = oDrugdetail.DrugHeader.PrescriptionItemStatus;
        }
        oDrugdetail.DrugHeader.PrescriptionItemStatus = objRes.PrescriptionItemStatus;
        let nPrescriptionItemOID: number = this.oDrugHeaderDetailInf.PrescriptionItemOID;
        let Colkey: number = 2;
        if (oDrugdetail.DrugHeader.IsInfusion == true && oDrugdetail.DrugHeader.IsPRN == false && (String.Compare(oDrugdetail.DrugHeader.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oDrugdetail.DrugHeader.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) != 0)) {
          if (oDrugdetail.SlotDetails != null && oDrugdetail.SlotDetails.Count > 0) {
            if (String.Compare(oDrugdetail.DrugHeader.InfusionType, InfusionTypesCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) == 0) {
              if (oDrugdetail.DrugHeader.IsSelfAdministered && oDrugdetail.SlotDetails != null && oDrugdetail.SlotDetails.Count > 0) {
                /*let oInfActionCompleted = from oItem in oDrugdetail.SlotDetails
                                  where String.Compare(oItem.Status, SlotStatus.STOPPED, StringComparison.CurrentCultureIgnoreCase) != 0 &&
                  String.Compare(oItem.Status, SlotStatus.COMPLETED, StringComparison.CurrentCultureIgnoreCase) != 0 &&
                  String.Compare(oItem.Status, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) != 0
                                  select oItem;*/

                // correct
                let oInfActionCompleted = oDrugdetail.SlotDetails.Where(oItem => String.Compare(oItem.Status, SlotStatus.STOPPED, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.COMPLETED, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) != 0).Select(oItem => oItem);
                if (oInfActionCompleted != null && oInfActionCompleted.Count() == 0 && DateTime.NotEquals(oDrugdetail.DrugHeader.EndDate, DateTime.MinValue) && DateTime.LessThan(oDrugdetail.DrugHeader.EndDate, this.dtCurrentDateTime)) {
                  oDrugdetail.DrugHeader.PrescriptionItemStatus = CConstants.COMPLETED;
                }
              }
            }
            else {
              if (oDrugdetail.SlotDetails != null && oDrugdetail.SlotDetails.Count > 0) {

                /* let oInfActionCompleted = from oItem in oDrugdetail.SlotDetails
                                   where String.Compare(oItem.Status, SlotStatus.STOPPED, StringComparison.CurrentCultureIgnoreCase) == 0 ||
                   String.Compare(oItem.Status, SlotStatus.COMPLETED, StringComparison.CurrentCultureIgnoreCase) == 0 ||
                   String.Compare(oItem.Status, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) == 0
                                   select oItem;*/

                //  correct
                let oInfActionCompleted = oDrugdetail.SlotDetails.Where(oItem => String.Compare(oItem.Status, SlotStatus.STOPPED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oItem.Status, SlotStatus.COMPLETED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oItem.Status, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) == 0).Select(oItem => oItem);


                if (oInfActionCompleted != null && oInfActionCompleted.Count() > 0) {
                  oDrugdetail.DrugHeader.PrescriptionItemStatus = CConstants.COMPLETED;
                }
              }
            }
          }
        }
        let nAsRequiredCount: number = 0;
        let IsPRNWithSchedule: boolean = this.oDrugHeaderDetailInf.IsPRNWithSchedule;
        let IsPRN: boolean = this.oDrugHeaderDetailInf.IsPRN;
        if (String.Compare(oDrugdetail.DrugHeader.InfusionType, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) == 0) {
          if (String.Compare(oDrugdetail.DrugHeader.InfusionType, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) == 0) {
            oSlotDetail.forEach((oSlot) => {
              if (oSlot.AdministrationDetail != null && oSlot.AdministrationDetail.oInfusionAdminDetail != null && oSlot.AdministrationDetail.oInfusionAdminDetail.Count > 0) {
                oSlot.AdministrationDetail.InfusionStartDate = oSlot.ScheduledDTTM;
                oSlot.AdministrationDetail.InfusionEndDate = oSlot.ScheduledDTTM;
              }
            });
          }
          let sSlotStatus: string = String.Empty;
          let sReason: string = String.Empty;
          let oInfAction: InfusionAdminDetail = null;
          let sToolTip: string = String.Empty;
          let sSlotKey: string = String.Empty;
          this.oOverviewSlot = <DoseOverviewSlot>this.oClickedTagObjectInf.oIChartSlot;
          sSlotStatus = objRes.Status;
          let sReasonCode: string = String.Empty;
          if (objRes.AdministrationDetail != null && objRes.AdministrationDetail.oInfusionAdminDetail != null) {
            oInfAction = objRes.AdministrationDetail.oInfusionAdminDetail.Where(x => x.ActionStartDate.Date <= objRes.ScheduledDTTM.Date).OrderByDescending(x => x.MedAdminInfusionOID).FirstOrDefault();
          }
          if (String.Equals(sSlotStatus, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) && objRes.AdministrationDetail != null) {
            sReasonCode = objRes.AdministrationDetail.AdminReasonCode;
          }
          else if (String.Compare(sSlotStatus, SlotStatus.STOPPED, StringComparison.CurrentCultureIgnoreCase) == 0) {
            let sRsnCode = objRes.AdministrationDetail.oInfusionAdminDetail.OrderByDescending(x => x.MedAdminInfusionOID).Where(x => String.Compare(x.ActionCode, MedicationAction.STOP, StringComparison.CurrentCultureIgnoreCase) == 0).Select(x => x.infusionReasonCode).FirstOrDefault();
            sReasonCode = sRsnCode;
          }
          else if (String.Compare(sSlotStatus, SlotStatus.PAUSED, StringComparison.CurrentCultureIgnoreCase) == 0) {
            let sRsnCode = objRes.AdministrationDetail.oInfusionAdminDetail.OrderByDescending(x => x.MedAdminInfusionOID).Where(x => String.Compare(x.ActionCode, MedicationAction.PAUSE, StringComparison.CurrentCultureIgnoreCase) == 0).Select(x => x.infusionReasonCode).FirstOrDefault();
            sReasonCode = sRsnCode;
          }
          sReason = ValueDomainValues.oRecordAdminReasons.Count > 0 ? CommonBB.GetText(sReasonCode, ValueDomainValues.oRecordAdminReasons) : sReasonCode;
          this.oSlotTagObjectInf = this.oGetMedsChartData.CreateTagSlotObject(objRes);
          this.oOverviewSlot = this.oGetMedsChartData.CreateOverviewSlotForInfusion(this.oClickedTagObjectInf.oIChartSlot.Key, objRes.ScheduledDTTM, objRes.Status, objRes.Dose, this.oSlotTagObjectInf,
            sToolTip, sReason, this.oDrugHeaderDetailInf.DoseType, objRes, this.oDrugHeaderDetailInf.ItemSubType, oInfAction, '0', this.oDrugHeaderDetailInf.IsPRNWithSchedule, false, String.Empty);
          (<DoseOverviewSlot>(this.oClickedTagObjectInf.oIChartSlot)).AdministrationIcon = this.oOverviewSlot.AdministrationIcon;
          (<DoseOverviewSlot>(this.oClickedTagObjectInf.oIChartSlot)).BackGroundColor = this.oOverviewSlot.BackGroundColor;
          (<DoseOverviewSlot>(this.oClickedTagObjectInf.oIChartSlot)).StatusIcon = this.oOverviewSlot.StatusIcon;
          (<DoseOverviewSlot>(this.oClickedTagObjectInf.oIChartSlot)).Tag = this.oOverviewSlot.Tag;
          (<TagSlotDetail>((<DoseOverviewSlot>(this.oClickedTagObjectInf.oIChartSlot)).Tag)).SlotStatus = objRes.Status;
          (<TagSlotDetail>((<DoseOverviewSlot>(this.oClickedTagObjectInf.oIChartSlot)).Tag)).SlotOID = objRes.OID;
          (<TagSlotDetail>((<DoseOverviewSlot>(this.oClickedTagObjectInf.oIChartSlot)).Tag)).SlotDateTime = objRes.ScheduledDTTM;
          (<TagSlotDetail>((<DoseOverviewSlot>(this.oClickedTagObjectInf.oIChartSlot)).Tag)).MedsAdminOID = objRes.AdministrationDetail.MedAdminOID;
          ObjectHelper.stopFinishAndCancelEvent(false);
          this.medChartOverview.RefreshCell(this.oClickedTagObjectInf);
        }
        else {
          (<TagSlotDetail>((<DoseOverviewSlot>(this.oClickedTagObjectInf.oIChartSlot)).Tag)).SlotStatus = objRes.Status;
          (<TagSlotDetail>((<DoseOverviewSlot>(this.oClickedTagObjectInf.oIChartSlot)).Tag)).SlotOID = objRes.OID;
          (<TagSlotDetail>((<DoseOverviewSlot>(this.oClickedTagObjectInf.oIChartSlot)).Tag)).SlotDateTime = objRes.ScheduledDTTM;
          (<TagSlotDetail>((<DoseOverviewSlot>(this.oClickedTagObjectInf.oIChartSlot)).Tag)).MedsAdminOID = objRes.AdministrationDetail.MedAdminOID;
          if (oDrugdetail.DrugHeader.PrescriptionItemStatus == CConstants.DISCONTINUED || oDrugdetail.DrugHeader.PrescriptionItemStatus == CConstants.COMPLETED || oDrugdetail.DrugHeader.PrescriptionItemStatus == CConstants.CANCELLED) {
            if (oDrugdetail.SlotDetails != null && oDrugdetail.SlotDetails.Count > 0) {
              if (oDrugdetail.DrugHeader.PrescriptionItemStatus == CConstants.COMPLETED) {
                this.oGetMedsChartData.IsCompleted = true;
                this.oGetMedsChartData.IsGreyedOut = false;
                oChartRow.RowBackground = new SolidColorBrush(Color.FromArgb(255, 185, 251, 114));
              }
              if (oDrugdetail.DrugHeader.PrescriptionItemStatus == CConstants.DISCONTINUED) {
                this.oGetMedsChartData.IsGreyedOut = true;
                this.oGetMedsChartData.IsCompleted = false;
                oChartRow.RowBackground = Common.SetSlotColor(String.Empty, this.oGetMedsChartData.IsGreyedOut);
              }
              if (IsPRN) {
                nAsRequiredCount++;
                oChartRow.RowBackground = new SolidColorBrush(MedChartData.AsRequiredSlotsColor);
              }
            }
            else {
              if (oDrugdetail.DrugHeader.PrescriptionItemStatus == CConstants.COMPLETED) {
                this.oGetMedsChartData.IsCompleted = true;
                this.oGetMedsChartData.IsGreyedOut = false;
                oChartRow.RowBackground = new SolidColorBrush(Color.FromArgb(255, 185, 251, 114));
              }
              if (oDrugdetail.DrugHeader.PrescriptionItemStatus == CConstants.DISCONTINUED) {
                this.oGetMedsChartData.IsCompleted = false;
                this.oGetMedsChartData.IsGreyedOut = true;
                oChartRow.RowBackground = Common.SetSlotColor(String.Empty, this.oGetMedsChartData.IsGreyedOut);
              }
              if (IsPRN) {
                nAsRequiredCount++;
                oChartRow.RowBackground = new SolidColorBrush(MedChartData.AsRequiredSlotsColor);
              }
            }
          }
          else {
            if (IsPRN) {
              nAsRequiredCount++;
              oChartRow.RowBackground = new SolidColorBrush(MedChartData.AsRequiredSlotsColor);
            }
            else {
              this.oGetMedsChartData.IsCompleted = this.oGetMedsChartData.IsGreyedOut = false;
              oChartRow.RowBackground = new SolidColorBrush(Color.FromArgb(0, 255, 255, 255));
            }
          }
          oSlotDetail.forEach((oSlot) => {
            if (oSlot.AdministrationDetail != null && oSlot.AdministrationDetail.oInfusionAdminDetail != null && oSlot.AdministrationDetail.oInfusionAdminDetail.Count > 0) {
              oSlot.AdministrationDetail.InfusionStartDate = oSlot.AdministrationDetail.oInfusionAdminDetail.Min(x => x.ActionStartDate);
              if (oSlot.Status == SlotStatus.INPROGRESS || oSlot.Status == SlotStatus.PAUSED)
                oSlot.AdministrationDetail.InfusionEndDate = CommonBB.GetServerDateTime();
              else oSlot.AdministrationDetail.InfusionEndDate = oSlot.AdministrationDetail.oInfusionAdminDetail.Max(x => x.ActionStartDate);
            }
          });
          this.oGetMedsChartData.MaxRowDoseHeightValue = 0;
          this.oGetMedsChartData.nMaxSlotCount = this.oGetMedsChartData.GetMaximumSlotForRow(this.oGetMedsChartData.StartDate, this.oGetMedsChartData.EndDate, oDrugdetail);
          if (oDrugdetail.DrugHeader.IsPRN && !oDrugdetail.DrugHeader.IsPRNWithSchedule) {
            this.oGetMedsChartData.IsOverviewPRNSlot = true;
            if (DateTime.LessThanOrEqualTo(oDrugdetail.DrugHeader.StartDate.Date, this.oGetMedsChartData.StartDate.Date))
              this.oGetMedsChartData.dtOverviewPRNStartDate = this.oGetMedsChartData.StartDate;
            else this.oGetMedsChartData.dtOverviewPRNStartDate = oDrugdetail.DrugHeader.StartDate;
            if (DateTime.NotEquals(oDrugdetail.DrugHeader.EndDate.Date, (DateTime.MinValue)) && this.oGetMedsChartData.EndDate.Date >= oDrugdetail.DrugHeader.EndDate.Date)
              this.oGetMedsChartData.dtOverviewPRNEndDate = oDrugdetail.DrugHeader.EndDate;
            else this.oGetMedsChartData.dtOverviewPRNEndDate = this.oGetMedsChartData.EndDate;
          }
          else {
            this.oGetMedsChartData.IsOverviewPRNSlot = false;
            this.oGetMedsChartData.dtOverviewPRNStartDate = this.oGetMedsChartData.dtOverviewPRNEndDate = DateTime.MinValue;
          }
          let oTempTagDrugHeaderDetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(this.oClickedTagObjectInf.oDrugItem.Tag, TagDrugHeaderDetail);
          if (oTempTagDrugHeaderDetail != null) {
            while (DateTime.LessThanOrEqualTo(chtStartDate, chtEndDate)) {
              let tmpSlots1: IEnumerable<SlotDetail> = null, tmpSlots2 = null, InfSlots = null;
              let lstTimeSpanSortedDetails: List<TimeSlot> = null;
              // oChartRow.TimeSlots = this.oGetMedsChartData.CreateDrugItemTimeSlots(oDrugdetail, chtStartDate, this.medChartOverview.EndDate, oTempTagDrugHeaderDetail.IsPRN, oTempTagDrugHeaderDetail.PrescriptionItemOID, lstTimeSpanSortedDetails);
              oChartRow.TimeSlots = this.oGetMedsChartData.CreateDrugItemTimeSlots(oDrugdetail, chtStartDate, this.medChartOverview.EndDate, oTempTagDrugHeaderDetail.IsPRN, oTempTagDrugHeaderDetail.PrescriptionItemOID, (o1) => { lstTimeSpanSortedDetails = o1 });
              this.oGetMedsChartData.GetTempSlot(oSlotDetail, chtStartDate, (o1) => { tmpSlots1 = o1; }, (o2) => { tmpSlots2 = o2; });
              if (tmpSlots1 != null && tmpSlots2 != null)
                InfSlots = tmpSlots1.Concat(tmpSlots2).OrderBy(s => s.ScheduledDTTM);
              else if (tmpSlots1 != null)
                InfSlots = tmpSlots1;
              else InfSlots = tmpSlots2;
              if (InfSlots != null) {
                let nTempMultiSlotDueCount: number = 0;
                let nTempMultiSlotOverdueCount: number = 0;
                oChartCells.Add(this.oGetMedsChartData.CreateSlotForOneDay(nPrescriptionItemOID, Colkey, chtStartDate, InfSlots.ToList(), oTempTagDrugHeaderDetail.IsPRN, this.oDrugHeaderDetailInf.DoseType,
                  this.oDrugHeaderDetailInf.StartDate, this.oDrugHeaderDetailInf.EndDate, lstTimeSpanSortedDetails, this.oDrugHeaderDetailInf.UnackIsConflictExists, oDrugdetail.DrugHeader, oDrugdetail.DrugHeader.IsPRNWithSchedule,
                  (o1) => { nTempMultiSlotDueCount = o1; }, (o2) => { nTempMultiSlotOverdueCount = o2; }, false
                ));
                nMultiSlotDueCount = nMultiSlotDueCount + nTempMultiSlotDueCount;
                nMultiSlotOverdueCount = nMultiSlotOverdueCount + nTempMultiSlotOverdueCount;
              }
              oColkey.Add(Colkey.ToString());
              Colkey++;
              chtStartDate = chtStartDate.AddDays(1);
            }
          }
          oChartCellslst = new List<ChartCell>(oChartCells);
          if (this.oDrugHeaderDetailInf != null) {
            this.oDrugHeaderDetailInf.DueSlotCount = nMultiSlotDueCount;
            this.oDrugHeaderDetailInf.OverdueSlotCount = nMultiSlotOverdueCount;
          }
          let RowKey: string = "Row-" + this.oRefreshTagObject.oDrugItem.Key;
          let key: number = Convert.ToInt64(this.oRefreshTagObject.oDrugItem.Key);
          let TagslotOID: number = (<TagSlotDetail>((<DoseOverviewSlot>(this.oRefreshTagObject.oIChartSlot)).Tag)).SlotOID;
          let lstChartCells: List<ChartCell> = new List<ChartCell>();
          if (TagslotOID > 0) {
            oCurrentChartRow = this.medChartOverview.ChartRows.Where(c => c.Key == RowKey).Select(s => s).ToList<ChartRow>();
            if (oCurrentChartRow != null && oCurrentChartRow.Count > 0) {
              let Ochartcell = oCurrentChartRow.Select(s => s.ChartCells);
              let oCurrentChartCells = oCurrentChartRow.Select(s => s.ChartCells).ToList();
              // oCurrentChartCells[0].forEach((objChartCell) => {
              //   lstChartCells.AddRange(objChartCell);
              // });
              if (oCurrentChartCells != null && oCurrentChartCells[0] != null && oCurrentChartCells[0].Count > 0) {
                lstChartCells = oCurrentChartCells[0];
              }
            }
            for (let i: number = 0; i < lstChartCells.Count; i++) {
              let oDrugHeaderDetailInfqw: TagDrugHeaderDetail = null;
              let oSlots: ObservableCollection<IChartSlot> = null;
              let olstchrt: ObservableCollection<IChartSlot> = new ObservableCollection<IChartSlot>((lstChartCells[i].Slots));
              let Tocheckblankslot = olstchrt.Select(s => s).FirstOrDefault();
              if (!(Tocheckblankslot instanceof BlankSlot)) {

                /*let oSlotItem = from oSlot in lstChartCells[i].Slots
                                   where String.Equals(((TagSlotDetail)((DoseOverviewSlot)oSlot).Tag).SlotOID, TagslotOID)
                                   select oSlot;*/

                // correct
                let oSlotItem = lstChartCells[i].Slots.Where(oSlot => String.Equals((<TagSlotDetail>(<DoseOverviewSlot>oSlot).Tag).SlotOID, TagslotOID)).Select(oSlot => oSlot);

                oSlots = new ObservableCollection<IChartSlot>(oSlotItem);
                if (this.oRefreshTagObject.oDrugItem != null && this.oRefreshTagObject.oDrugItem instanceof DrugItem)
                  oDrugHeaderDetailInfqw = ObjectHelper.CreateType<TagDrugHeaderDetail>((ObjectHelper.CreateType<DrugItem>(this.oRefreshTagObject.oDrugItem, DrugItem)).Tag, TagDrugHeaderDetail);
                if (oSlots != null && oSlots.Count > 0) {
                  let oOverViewSlot: DoseOverviewSlot = <DoseOverviewSlot>oSlots.First();
                  let startDTTM: DateTime = (<TagSlotDetail>(oOverViewSlot.Tag)).SlotDateTime;
                  oSlots.RemoveAt(0);
                  this.oGetMedsChartData.AddBlankCellToSlots(key, lstChartCells[i].ColIndex, startDTTM, oSlots, oDrugHeaderDetailInfqw.DoseType.ToString(), IsPRN, IsPRNWithSchedule);
                  lstChartCells[i].Slots = oSlots;
                }
              }
            }
          }
          for (let i: number = 0; i < lstChartCells.Count; i++) {
            if (oChartCellslst[i].Key == lstChartCells[i].Key) {
              lstChartCells[i].Slots = new ObservableCollection<IChartSlot>();
              lstChartCells[i].Slots = oChartCellslst[i].Slots;
            }
          }
          oRowRefreshForChart = oCurrentChartRow.Select(s => s).FirstOrDefault();
          oRowRefreshForChart.ChartCells = new ObservableCollection<ChartCell>(lstChartCells);
          if (this.oDrugHeaderDetailInf != null && !String.IsNullOrEmpty(this.oDrugHeaderDetailInf.PrescriptionItemStatus)) {
            this.oDrugHeaderDetailInf.PreviousPrescriptionItemStatus = this.oDrugHeaderDetailInf.PrescriptionItemStatus;
          }
          this.oDrugHeaderDetailInf.PrescriptionItemStatus = oDrugdetail.DrugHeader.PrescriptionItemStatus;
          oRowRefreshForChart.TimeSlots = oChartRow.TimeSlots;
          oRowRefreshForChart.RowBackground = oChartRow.RowBackground;
          if ((oDrugdetail.DrugHeader.PrescriptionItemStatus == CConstants.COMPLETED) && (oRowRefreshForChart.DrugItem != null)) {
            oRowRefreshForChart.DrugItem.PrescriptionStatus = ValueDomainValues.oPrescriptionItemStatus.Count > 0 ? CommonBB.GetText(oDrugdetail.DrugHeader.PrescriptionItemStatus, ValueDomainValues.oPrescriptionItemStatus) : oDrugdetail.DrugHeader.PrescriptionItemStatus;
            (<TagDrugHeaderDetail>oRowRefreshForChart.DrugItem.Tag).PrescriptionItemStatus = oDrugdetail.DrugHeader.PrescriptionItemStatus;
            oRowRefreshForChart.DrugItem.PStatusIcon = ObjectHelper.CreateObject(new ChartIcon(), { Key: "COMPLETED", UriString: MedImage.GetPath(MedImages.CompletedIcon) });
            oRowRefreshForChart.DrugItem.PStatusIcon.Tooltip = MedsAdminChartToolTip.Completed;
            oRowRefreshForChart.DrugItem.PStatusIcon.EnableOnHotSpotClick = false;
          }
          else {
            let sStatus: string = ValueDomainValues.oPrescriptionItemStatus.Count > 0 ? CommonBB.GetText(CConstants.COMPLETED, ValueDomainValues.oPrescriptionItemStatus) : String.Empty;
            if (!String.IsNullOrEmpty(oRowRefreshForChart.DrugItem.PrescriptionStatus) && !String.IsNullOrEmpty(sStatus) && oRowRefreshForChart.DrugItem.PrescriptionStatus == sStatus) {
              oRowRefreshForChart.DrugItem.PrescriptionStatus = String.Empty;
              oRowRefreshForChart.DrugItem.PStatusIcon = null;
            }
          }
          ObjectHelper.stopFinishAndCancelEvent(false);
          this.medChartOverview.RefreshRow(oRowRefreshForChart, this.oClickedTagObjectInf);
        }
        if (oDrugdetail != null && oDrugdetail.DrugHeader != null && !String.IsNullOrEmpty(oDrugdetail.DrugHeader.PrescriptionItemStatus)) {
          this.RefreshOverviewChart(objRes.PrescriptionItemStatus);
          let MedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
          if (MedAdminVM != null) {
            MedAdminVM.SetHeightweightPopUp();
          }
        }
      }
      let nPrescItemOID: number = (this.oRefreshTagObject != null && this.oRefreshTagObject.oDrugItem != null && !String.IsNullOrEmpty(this.oRefreshTagObject.oDrugItem.Key)) ? Convert.ToInt64(this.oRefreshTagObject.oDrugItem.Key) : 0;
      if (MedChartData.ListOfEventsWithNotKnownStatus != null) {
        let ToCheckPrescItem = MedChartData.ListOfEventsWithNotKnownStatus.Where(c => c != null && c.PrescriptionItemOID == nPrescItemOID).FirstOrDefault();
        if (ToCheckPrescItem == null) {
          let oEventsWithNotKnownStatus: EventsWithNotKnownStatus = new EventsWithNotKnownStatus(nPrescItemOID, 0, String.Empty);
          MedChartData.ListOfEventsWithNotKnownStatus.Add(oEventsWithNotKnownStatus);
        }
      }
      GetMedsChartData.UpdateOverviewIcon(this.InfusionPreviousSlotStatus, objRes.Status, nPrescItemOID, this);
    }
    this.CurrentActivityCode = ActivityCode.None;
  }
  ModifyStrikeThroughOpen(TagObject: TagObject): void {
    let lnMedAdminOID: number = 0;
    let sSlotStatus: string = String.Empty;
    let oCurrentOverviewSlot: DoseOverviewSlot = null;
    let oSlotTagObject: TagSlotDetail = null;
    let oDrugHeaderDetail: TagDrugHeaderDetail = null;
    let sSlotTooltip: string = String.Empty;
    let dtSlotDate: DateTime = DateTime.MinValue;
    let oSlotVM: SlotDetailVM = new SlotDetailVM();
    oSlotVM.CurrentServerDate = this.dtServerDate;
    if (TagObject != null) {
      if (TagObject.oIChartSlot != null && TagObject.oIChartSlot instanceof DoseOverviewSlot) {
        oCurrentOverviewSlot = ObjectHelper.CreateType<DoseOverviewSlot>(TagObject.oIChartSlot, DoseOverviewSlot);
        oSlotTagObject = ObjectHelper.CreateType<TagSlotDetail>(oCurrentOverviewSlot.Tag, TagSlotDetail);
      }
      else if (TagObject.oIChartSlot != null && TagObject.oIChartSlot instanceof AdministratedSlot) {
        oSlotTagObject = ObjectHelper.CreateType<TagSlotDetail>((ObjectHelper.CreateType<AdministratedSlot>(TagObject.oIChartSlot, AdministratedSlot)).Tag, TagSlotDetail);
      }
      if (TagObject.oDrugItem != null && TagObject.oDrugItem instanceof DrugItem)
        oDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>((ObjectHelper.CreateType<DrugItem>(TagObject.oDrugItem, DrugItem)).Tag, TagDrugHeaderDetail);
    }
    if (oSlotTagObject == null) {
      this.CurrentActivityCode = ActivityCode.None;
      return
    }
    if (String.Compare(oSlotTagObject.SlotStatus, SlotStatus.PATIENTSELFADMIN) == 0 || String.Compare(oSlotTagObject.SlotStatus, SlotStatus.PLANNED) == 0 || String.Equals(oSlotTagObject.SlotStatus, SlotStatus.DEFERADMIN) || String.Equals(oSlotTagObject.SlotStatus, SlotStatus.DEFERDUENOW) || String.Equals(oSlotTagObject.SlotStatus, SlotStatus.DEFEROVERDUE)) {
      this.CurrentActivityCode = ActivityCode.None;
      return
    }
    if (String.Equals(oSlotTagObject.SlotStatus, SlotStatus.NOTYETRECORDED) && oDrugHeaderDetail != null && oDrugHeaderDetail.MultiRoute_Type == MultiRouteType.Mixed_Routes) {
      this.LaunchNonInfRecordAdmin(TagObject, oSlotTagObject);
      return
    }
    oSlotVM.DrugDetail = TagObject.oDrugItem;
    let oHdrAddnlInfo: CDrugHdrAddnlInfo = new CDrugHdrAddnlInfo();
    if (oSlotTagObject.LastModifiedAt && oSlotTagObject.LastModifiedAt.NotEquals(DateTime.MinValue))
      oHdrAddnlInfo.RecordedAt = oSlotTagObject.LastModifiedAt.ToUserDateTimeString(CConstants.DateTimeFormat);
    oHdrAddnlInfo.RecordedAt += " (Due at " + oSlotTagObject.SlotDateTime.ToUserDateTimeString(CConstants.Timeformat) + ")";
    oSlotVM.PrescriptionItemOID = Number.Parse(TagObject.oDrugItem.Key);
    if (oDrugHeaderDetail.ReviewDTTM.NotEquals(DateTime.MinValue)) {
      oHdrAddnlInfo.ReviewAt = oDrugHeaderDetail.ReviewDTTM.ToUserDateTimeString(CConstants.DateTimeFormat);
      if (DateTime.LessThanOrEqualTo(oDrugHeaderDetail.ReviewDTTM.Date, (CommonBB.GetServerDateTime().Date))) {
        oHdrAddnlInfo.ReviewAtVisibility = Visibility.Visible;
        oHdrAddnlInfo.ReviewIconTooltip = Common.GetReviewIconTooltip(oDrugHeaderDetail.ReviewType, oDrugHeaderDetail.ReviewDTTM, oDrugHeaderDetail.ReviewRequestedComments, oDrugHeaderDetail.ReviewRequestedby);
      }
    }
    oSlotVM.DoseUOM = "0";
    oSlotVM.PresScheduleOID = oSlotTagObject.SlotOID;
    oSlotVM.AdministrationDetail = new AdministrationDetailVM();
    oSlotVM.AdministrationDetail.MedAdminOID = oSlotTagObject.MedsAdminOID;
    oSlotVM.PrescriptionStartDate = oDrugHeaderDetail.StartDate;
    lnMedAdminOID = oSlotTagObject.MedsAdminOID;
    dtSlotDate = oSlotTagObject.SlotDateTime;
    this.dtScheduledDTTM = oSlotTagObject.SlotDateTime;
    this.dtAdministeredAt = oSlotTagObject.AdministeredAt;
    oSlotVM.AdministrationDetail.SlotDate = oSlotTagObject.SlotDateTime;
    oSlotVM.AdministrationDetail.IsDuringHomeLeave = oSlotTagObject.IsDuringHomeLeave;
    oSlotVM.IsAmendCompletedStatus = oDrugHeaderDetail.IsAmendCompletedStatus;
    let DuenessWindowTimeMinutes: number = MedChartData.DuenessThreshold;
    let nDiffMins: number = Convert.ToInt32(CommonBB.GetServerDateTime().Subtract(this.dtScheduledDTTM).TotalMinutes);
    if (nDiffMins >= -DuenessWindowTimeMinutes && nDiffMins <= DuenessWindowTimeMinutes)
      oSlotVM.AdministrationDetail.AdministeredOnTimeMode = 'N';
    else if (nDiffMins < -DuenessWindowTimeMinutes)
      oSlotVM.AdministrationDetail.AdministeredOnTimeMode = 'E';
    else oSlotVM.AdministrationDetail.AdministeredOnTimeMode = 'L';
    if (oDrugHeaderDetail != null) {
      this.IsPGD = oDrugHeaderDetail.IsPGD;
      if (oDrugHeaderDetail.IsPRN) {
        oSlotVM.PrescriptionStartDate = oDrugHeaderDetail.StartDate;
        oSlotVM.PrescriptionEndDate = oDrugHeaderDetail.EndDate;
        oSlotVM.PrescriptionItemStatus = oDrugHeaderDetail.PrescriptionItemStatus;
        oSlotVM.IsLastPRN = oDrugHeaderDetail.IsPRN;
        oSlotVM.TodaySlotDate = oSlotTagObject.SlotDateTime;
      }
      if (String.Compare(oDrugHeaderDetail.DoseType, DoseTypeCode.STEPPEDVARIABLE, StringComparison.InvariantCulture) == 0) {
        oSlotVM.DoseUOM = !(String.IsNullOrEmpty(oSlotTagObject.DoseUOM)) ? oSlotTagObject.DoseUOM : String.Empty;
        oSlotVM.DoseUOMOID = oSlotTagObject.DoseUOMOID > 0 ? oSlotTagObject.DoseUOMOID : 0;
      }
      else {
        oSlotVM.DoseUOM = !(String.IsNullOrEmpty(oDrugHeaderDetail.DoseUOM)) ? oDrugHeaderDetail.DoseUOM : String.Empty;
        oSlotVM.DoseUOMOID = oSlotTagObject.DoseUOMOID > 0 ? oSlotTagObject.DoseUOMOID : 0;
      }
      oSlotVM.DoseUOMLzoID = !String.IsNullOrEmpty(oSlotTagObject.DoseUOMLzoID) ? oSlotTagObject.DoseUOMLzoID : String.Empty;
      oSlotVM.MultiRoute_Type = oDrugHeaderDetail.MultiRoute_Type;
    }
    if (UserPermissions.CanManageMedAdministration) {
      if (oCurrentOverviewSlot != null && oCurrentOverviewSlot.StatusIcon != null && dtSlotDate.NotEquals(DateTime.MinValue) && DateTime.LessThan(CommonBB.GetServerDateTime(), dtSlotDate.AddMinutes(MedChartData.SlotModificationTime))) {
        if (TagObject.oChartIcon != null && TagObject.oChartIcon instanceof ChartIcon)
          oSlotVM.Status = (ObjectHelper.CreateType<ChartIcon>(TagObject.oChartIcon, ChartIcon)).Key != null ? (ObjectHelper.CreateType<ChartIcon>(TagObject.oChartIcon, ChartIcon)).Key : String.Empty;
        else oSlotVM.Status = (ObjectHelper.CreateType<AdministratedSlot>(TagObject.oIChartSlot, AdministratedSlot)).StatusIcon.Key != null ? (ObjectHelper.CreateType<AdministratedSlot>(TagObject.oIChartSlot, AdministratedSlot)).StatusIcon.Key : String.Empty;
        oSlotVM.ScheduledDTTM = oSlotTagObject.SlotDateTime;
        oSlotVM.PrescriptionItemStatus = oDrugHeaderDetail.PrescriptionItemStatus;
        oSlotVM.PrescriptionEndDate = oDrugHeaderDetail.EndDate;
        oSlotVM.FreqPerodCode = oDrugHeaderDetail.FreqPerodcode;
        oSlotVM.CACode = MedAction.StrikethorughAdmin;
        oSlotVM.IsLastSlotinCurrentView = oSlotTagObject.IsLastSlotInView;
        if (this.IsPGD) {
          //this.oMAST = new MedsAdminStrikethrough(oSlotVM, this.IsPGD);
          this.oMAST = new MedsAdminStrikethrough();
          this.oMAST.constructorImpl(oSlotVM, this.IsPGD);
          // this.oMAST.IsSlotUpdatedEvent = new MedsAdminStrikethrough.IsSlotUpdatedDelegate(this.oMAST_IsSlotUpdatedEvent); 
          // this.oMAST.IsSlotUpdatedEvent = new MedsAdminStrikethrough.IsSlotUpdatedDelegate(this.oMAST_IsSlotUpdatedEvent); 
          this.oMAST.IsSlotUpdatedEvent = () => { this.oMAST_IsSlotUpdatedEvent() };
          this.oMAST.drgHeader = new DrugHeader1();
          this.oMAST.drgHeader.oDrugHeader = new CDrugHeader();
          this.oMAST.drgHeader.oDrugHeader.oDrugHdrBasicInfo = new DrugHeaderItem();
          this.oMAST.drgHeader.oDrugHeader.oDrugHdrBasicInfo.bShowFrequency = false;
          this.oMAST.drgHeader.oDrugHeader.oDrugHdrBasicInfo.bShowSite = false;
          this.oMAST.drgHeader.oDrugHeader.oDrugHdrBasicInfo.bShowAsrequired = false;
          oHdrAddnlInfo.RecordAdminViewed = RecordAdminType.RecordAdmin;
          this.oMAST.drgHeader.DataContext = Common.SetDrugHeaderContent(oSlotVM.DrugDetail, oHdrAddnlInfo, this.oMAST.drgHeader);
          this.oMAST.HelpCode = "MN_STRIKEADMIN";
          let Callback = (s, e) => {
            if (s != null && e != null) {
              this.oMAST = s;
            }
          }
          // ObjectHelper.stopFinishAndCancelEvent(true);
          AppActivity.OpenWindow("Strikethrough", this.oMAST, (s) => { this.oMAST_Closed(s); }, "Strikethrough administration", true, 775, 420, true, WindowButtonType.OkCancel, null, null, null, Callback);
        }
        else {
          this.IsLastSlotExist(oSlotVM);
          oSlotVM.Dose = oSlotTagObject.Dose;
          oSlotVM.LDose = oSlotTagObject.LowerDose;
          oSlotVM.UDose = oSlotTagObject.UpperDose;
          oSlotVM.ScheduledDTTM = oSlotTagObject.SlotDateTime;
          oSlotVM.IdentifyingOID = oDrugHeaderDetail.DrugIdentifyingOID;
          oSlotVM.IdentifyingType = oDrugHeaderDetail.DrugIdentifyingType;
          oSlotVM.MCVersionNo = oDrugHeaderDetail.MCVersionNo;
          oSlotVM.AdminMethod = oDrugHeaderDetail.AdminMethod;
          oSlotVM.DoseType = oDrugHeaderDetail.DoseType;
          oSlotVM.LorenzoID = oDrugHeaderDetail.LorenzoID;
          oSlotVM.IsControlledDrug = oDrugHeaderDetail.IsControlDrug;
          oSlotVM.IsFluidControlledDrug = oDrugHeaderDetail.IsFluidControlDrug;
          oSlotVM.IsParacetamolIngredient = oDrugHeaderDetail.IsParacetamolIngredient;
          if (oSlotVM != null && oDrugHeaderDetail != null && !String.IsNullOrEmpty(oSlotVM.PrescriptionItemStatus)) {
            oDrugHeaderDetail.PreviousPrescriptionItemStatus = oSlotVM.PrescriptionItemStatus;
          }
          oSlotVM.PrescriptionItemStatus = oDrugHeaderDetail.PrescriptionItemStatus;
          let IsNextSlotAdmSlot: boolean = false;
          if (oDrugHeaderDetail.SequenceParentPrescItemOID > 0 && oDrugHeaderDetail.SeqInfOrderForPervImmediateItm > 0 && (!oDrugHeaderDetail.IsInfusion || (oDrugHeaderDetail.IsInfusion && !oDrugHeaderDetail.IsBolus)) && String.Equals(oDrugHeaderDetail.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase)) {
            let NextCompletedItm: number = this.oGetMedsChartData.oChartRowList.Where(c => (c.DrugItem != null) && (c.DrugItem.Tag != null) && (c.DrugItem.Tag instanceof TagDrugHeaderDetail) && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).SequenceParentPrescItemOID > 0 && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).SequenceParentPrescItemOID == oDrugHeaderDetail.SequenceParentPrescItemOID && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).SeqInfOrderForPervImmediateItm > oDrugHeaderDetail.SeqInfOrderForPervImmediateItm && String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase)).Select(s => (ObjectHelper.CreateType<TagDrugHeaderDetail>(s.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemOID).FirstOrDefault();
            IsNextSlotAdmSlot = NextCompletedItm > 0 ? true : false;
            if (IsNextSlotAdmSlot) {
              let PresOID: number = this.oGetMedsChartData.oChartRowList.Where(c => (c.DrugItem != null) && (c.DrugItem.Tag != null) && (c.DrugItem.Tag instanceof TagDrugHeaderDetail) && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).SequenceParentPrescItemOID > 0 && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).SequenceParentPrescItemOID == oDrugHeaderDetail.SequenceParentPrescItemOID && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).SeqInfOrderForPervImmediateItm > oDrugHeaderDetail.SeqInfOrderForPervImmediateItm && String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase)).Select(s => (ObjectHelper.CreateType<TagDrugHeaderDetail>(s.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemOID).FirstOrDefault();
              if (PresOID > 0) {
                IsNextSlotAdmSlot = !this.oGetMedsChartData.oChartRowList.Any(c => (c.DrugItem != null) && (c.DrugItem.Tag != null) && (c.DrugItem.Tag instanceof TagDrugHeaderDetail) && (ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).AmendedPrescriptionItemOID == PresOID && !String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals((ObjectHelper.CreateType<TagDrugHeaderDetail>(c.DrugItem.Tag, TagDrugHeaderDetail)).PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.InvariantCultureIgnoreCase));
              }
            }
          }
          if (!IsNextSlotAdmSlot && (!oDrugHeaderDetail.IsInfusion || (oDrugHeaderDetail.IsInfusion && !oDrugHeaderDetail.IsBolus)) && oDrugHeaderDetail.SequenceParentPrescItemOID > 0 && oDrugHeaderDetail.SeqInfOrderForPervImmediateItm > 0) {
            let oParam: string[] = new Array(4);
            oParam[0] = oDrugHeaderDetail.SequenceParentPrescItemOID.ToString();
            oParam[1] = oDrugHeaderDetail.SeqInfOrderForPervImmediateItm.ToString();
            oParam[2] = "1";
            oParam[3] = ChartContext.PatientOID.ToString();
            let IsPreviousSeqItemActive: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("GetPreviousSeqItemActive", oParam), 'string');
            IsNextSlotAdmSlot = String.Equals(IsPreviousSeqItemActive, "1", StringComparison.InvariantCultureIgnoreCase) ? true : false;
          }
          oSlotVM.IsStrikethroughDisable = IsNextSlotAdmSlot;
          let MedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
          // if (MedAdminVM != null && MedAdminVM.CumulativeParacetamol.ParacetamolAdministeredCount.HasValue) {
          if (MedAdminVM != null && ObjectHelper.HasValue(MedAdminVM.CumulativeParacetamol.ParacetamolAdministeredCount)) {
            oSlotVM.ParacetamolAdminCount = MedAdminVM.CumulativeParacetamol.ParacetamolAdministeredCount.Value;
          }
          // this.oMAModorST = new MedsAdminModifyOrStrikethrough(oSlotVM, oHdrAddnlInfo); //existing code
          this.oMAModorST = new MedsAdminModifyOrStrikethrough();
          this.oMAModorST.constructorImpl(oSlotVM, oHdrAddnlInfo)
          this.oMAModorST.objDrugHeader = new DrugHeader1();
          this.oMAModorST.objDrugHeader.oDrugHeader = new CDrugHeader();
          this.oMAModorST.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo = new DrugHeaderItem();
          this.oMAModorST.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowFrequency = false;
          this.oMAModorST.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowSite = false;
          this.oMAModorST.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowAsrequired = false;
          oHdrAddnlInfo.SteppedDoseUOM = oSlotVM.DoseUOM;
          oHdrAddnlInfo.SteppedLowerDose = oSlotVM.LDose;
          oHdrAddnlInfo.SteppedUpperDose = oSlotVM.UDose;
          oHdrAddnlInfo.RecordAdminViewed = RecordAdminType.RecordAdmin;
          this.oMAModorST.objDrugHeader.DataContext = Common.SetDrugHeaderContent(oSlotVM.DrugDetail, oHdrAddnlInfo, this.oMAModorST.objDrugHeader);
          this.oMAModorST.objlinkButtons = new ModifyStrikethroughLink();
          this.oMAModorST.objlinkButtons.DataContext = this.oMAModorST.DataContext;
          if (String.Equals(oSlotVM.Status, "CC_NOTKNOWN", StringComparison.CurrentCultureIgnoreCase) && lnMedAdminOID == 0) {
            this.oMAModorST.IsSlotInPastDateAndStatusUnknown = true;
          }
          if (oSlotVM.Status == SlotStatus.NOTKNOWN && oSlotVM.MultiRoute_Type == MultiRouteType.Mixed_Routes) {
            this.oMAModorST.IsModifyLaunchedDirectly = true;
            this.oMAModorST._Parent = this;
            Busyindicator.SetStatusIdle("MedChart");
            this.oMAModorST.cmdModify_Click(this, new RoutedEventArgs());
          }
          else {
            // ObjectHelper.stopFinishAndCancelEvent(true);
            AppActivity.OpenWindow("Choose Modify or Strikethrough", this.oMAModorST, (s) => { this.oMAModorST_ModifyOrStrikethroughClosed(s) }, "", true, 210, 440, false, WindowButtonType.Close, this.oMAModorST.objlinkButtons);
          }
        }
      }
      else {
        let sDrugName: string = String.Empty;
        sDrugName = (ObjectHelper.CreateType<TagDrugHeaderDetail>(oSlotVM.DrugDetail.Tag, TagDrugHeaderDetail)).DrugName;
        let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
          Title: "LORENZO",
          Message: "The slot selected for " + sDrugName + " is outside the allowed modification time window.",
          MessageButton: MessageBoxButton.OK,
          IconType: MessageBoxType.Critical
        });
        iMsgBox.Show();
        this.CurrentActivityCode = ActivityCode.None;
      }
    }
    else {
      if (!this.isLoadedFlag) {
        let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
          Title: "LORENZO",
          Message: Resource.MedsAdminChartOverview.CanManageMedAdministration,
          MessageButton: MessageBoxButton.OK,
          IconType: MessageBoxType.Critical
        });
        iMsgBox.MessageBoxClose = (s, e) => { this.iMsgBox_MessageBoxClose(s, e); };
        this.isLoadedFlag = true;
        iMsgBox.Show();
      }
      this.CurrentActivityCode = ActivityCode.None;
    }
  }
  public _oMedsAdmin_OnSubmitModAdminEvent = (s, e) => { this.oMedsAdmin_OnSubmitModAdminEvent(); };
  public oMedsAdmin_OnSubmitModAdminEvent(): void {
    this.ModifyStrikeThroughClosed();
    Busyindicator.SetStatusIdle("MedChart");
    Busyindicator.SetStatusIdle("Administration");
  }
  ModifyStrikeThroughClosed(args?): void {
    if (this.oRefreshTagObject != null && this.oRefreshTagObject.oIChartSlot instanceof DoseOverviewSlot) {
      this.oSDVM = ObjectHelper.CreateType<SlotDetailVM>(this.oMAModorST.DataContext, SlotDetailVM);
      if (this.oSDVM != null) {
        if (this.oSDVM.IsModifyWindow) {
          this.RefreshModifyAdminSlot();
        }
        else {
          this.RefreshStrikethroughAdminSlot();
        }
        let MedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
        if (MedAdminVM != null) {
          MedAdminVM.CumulativeParacetamol.GetCumulativeParacetamol();
        }
      }
    }
    this.CurrentActivityCode = ActivityCode.None;
  }
  public IsLastSlotExist(oSlotDet: SlotDetailVM): void {
    oSlotDet.IsLastSlotCheckRequired = false;
    oSlotDet.IsUpdatePIStatusToCompleted = false;
    if (oSlotDet.PrescriptionEndDate.NotEquals(DateTime.MinValue) || (!String.IsNullOrEmpty(oSlotDet.FreqPerodCode) && String.Equals(oSlotDet.FreqPerodCode, CConstants.OnceOnlyPerodCode, StringComparison.InvariantCultureIgnoreCase))) {
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
        let oTempTagDrugHeaderDetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(this.oRefreshTagObject.oDrugItem.Tag, TagDrugHeaderDetail);
        let bAllowSelfAdminReActivate: boolean = true, bAllowPRNWithoutScheduleReActivate = true;
        if (oTempTagDrugHeaderDetail != null && oTempTagDrugHeaderDetail.IsPatientSelfAdmin && DateTime.NotEquals(oTempTagDrugHeaderDetail.EndDate, (DateTime.MinValue)) && DateTime.LessThan(oTempTagDrugHeaderDetail.EndDate, (CommonBB.GetServerDateTime()))) {
          bAllowSelfAdminReActivate = false;
        }
        if (oTempTagDrugHeaderDetail.IsPRN && !oTempTagDrugHeaderDetail.IsPRNWithSchedule && DateTime.NotEquals(oTempTagDrugHeaderDetail.EndDate, (DateTime.MinValue)) && DateTime.LessThan(oTempTagDrugHeaderDetail.EndDate, (CommonBB.GetServerDateTime()))) {
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
            oSlotDet.IsOVUpdtPIStsToCompletedNotkwn = true;
          }
          else if (oSlotDet.IsLastSlotinCurrentView == true) {
            oSlotDet.IsUpdatePIStatusToCompleted = true;
            oSlotDet.IsLastSlotCheckRequired = true;
            oSlotDet.IsOVUpdtPIStsToCompletedNotkwn = true;
          }
          else {


            /* let Allslts = (from drug in medChartOverview.ChartRows
                           from drugSlots in drug.ChartCells
                           from slot in drugSlots.Slots
                           where String.Compare(drug.Key.Split('-')[1], oRefreshTagObject.oDrugItem.Key) == 0 &&
               (slot is DoseOverviewSlot && !String.Equals(((TagSlotDetail)((DoseOverviewSlot)slot).Tag).SlotStatus, SlotStatus.OMITTED, StringComparison.InvariantCultureIgnoreCase)
                 && ((TagSlotDetail)((DoseOverviewSlot)slot).Tag).SlotDateTime > oSlotDet.ScheduledDTTM)
                           select slot); */

            let drug: IEnumerable<ChartRow> = this.medChartOverview.ChartRows.Where(drug => String.Compare((drug.Key.Split('-')[1], this.oRefreshTagObject.oDrugItem.Key)) == 0);
            let Allslts: ObservableCollection<IChartSlot> = new ObservableCollection<IChartSlot>();
            drug.forEach(odrug => {
              odrug.ChartCells.forEach(drugSlots => {
                drugSlots.Slots.forEach(slot => {
                  if ((slot instanceof DoseOverviewSlot && !String.Equals((<TagSlotDetail>(<DoseOverviewSlot>slot).Tag).SlotStatus, SlotStatus.OMITTED, StringComparison.InvariantCultureIgnoreCase)
                    && DateTime.GreaterThan((<TagSlotDetail>(<DoseOverviewSlot>slot).Tag).SlotDateTime, (oSlotDet.ScheduledDTTM)))) {
                    Allslts.Add(slot)
                  }
                });
              })
            });


            if (Allslts != null && Allslts.Count > 0) {
              oSlotDet.IsUpdatePIStatusToCompleted = false;
              oSlotDet.IsLastSlotCheckRequired = false;
            }
            else {
              oSlotDet.IsUpdatePIStatusToCompleted = true;
              oSlotDet.IsLastSlotCheckRequired = true;
              oSlotDet.IsOVUpdtPIStsToCompletedNotkwn = true;
            }
          }
        }
      }
    }
  }


  /*public ChklastandBeyondSlots(ScheduleDttm: DateTime): IEnumerable<IChartSlot> {
    let AllSlots = (from drug in medChartOverview.ChartRows
          from oCell in drug.ChartCells
          from slot in oCell.Slots
    where(String.Compare(drug.Key.Split('-')[1], oRefreshTagObject.oDrugItem.Key) == 0 &&
      slot is DoseOverviewSlot &&
    (((TagSlotDetail)((DefaultSlot)slot).Tag).SlotDateTime > ScheduleDttm &&
      (
        String.Equals(((TagSlotDetail)((DefaultSlot)slot).Tag).SlotStatus, SlotStatus.PLANNED, StringComparison.InvariantCultureIgnoreCase) ||
        String.Equals(((TagSlotDetail)((DefaultSlot)slot).Tag).SlotStatus, SlotStatus.DUENOW, StringComparison.InvariantCultureIgnoreCase) ||
        String.Equals(((TagSlotDetail)((DefaultSlot)slot).Tag).SlotStatus, SlotStatus.OVERDUE, StringComparison.InvariantCultureIgnoreCase) ||
        String.Equals(((TagSlotDetail)((DefaultSlot)slot).Tag).SlotStatus, SlotStatus.NOTYETRECORDED, StringComparison.InvariantCultureIgnoreCase) ||
        String.Equals(((TagSlotDetail)((DefaultSlot)slot).Tag).SlotStatus, SlotStatus.DEFERADMIN, StringComparison.InvariantCultureIgnoreCase) ||
        String.Equals(((TagSlotDetail)((DefaultSlot)slot).Tag).SlotStatus, SlotStatus.DEFERDUENOW, StringComparison.InvariantCultureIgnoreCase) ||
        String.Equals(((TagSlotDetail)((DefaultSlot)slot).Tag).SlotStatus, SlotStatus.DEFEROVERDUE, StringComparison.InvariantCultureIgnoreCase) ||
        (String.Equals(((TagSlotDetail)((DefaultSlot)slot).Tag).SlotStatus, SlotStatus.PATIENTSELFADMIN, StringComparison.InvariantCultureIgnoreCase) && ((TagSlotDetail)((DefaultSlot)slot).Tag).SlotDateTime > dtCurrentDateTime)
      )

    )
    )//2nd OR
          select slot);
    return AllSlots;
  }*/


  public ChklastandBeyondSlots(ScheduleDttm: DateTime): IEnumerable<IChartSlot> {
    let drug: IEnumerable<ChartRow> = this.medChartOverview.ChartRows.Where(drug => String.Compare((drug.Key.Split('-')[1], this.oRefreshTagObject.oDrugItem.Key)) == 0);
    let Allslts: ObservableCollection<IChartSlot> = new ObservableCollection<IChartSlot>();
    drug.forEach(odrug => {
      odrug.ChartCells.forEach(oCell => {
        oCell.Slots.forEach(slot => {
          if (slot instanceof DoseOverviewSlot && /**<DefaultSlot>slot changed as  slot as any as DefaultSlot*/
            (DateTime.GreaterThan((<TagSlotDetail>(slot as any as DefaultSlot).Tag).SlotDateTime, ScheduleDttm) &&
              (
                String.Equals((<TagSlotDetail>(slot as any as DefaultSlot).Tag).SlotStatus, SlotStatus.PLANNED, StringComparison.InvariantCultureIgnoreCase) ||
                String.Equals((<TagSlotDetail>(slot as any as DefaultSlot).Tag).SlotStatus, SlotStatus.DUENOW, StringComparison.InvariantCultureIgnoreCase) ||
                String.Equals((<TagSlotDetail>(slot as any as DefaultSlot).Tag).SlotStatus, SlotStatus.OVERDUE, StringComparison.InvariantCultureIgnoreCase) ||
                String.Equals((<TagSlotDetail>(slot as any as DefaultSlot).Tag).SlotStatus, SlotStatus.NOTYETRECORDED, StringComparison.InvariantCultureIgnoreCase) ||
                String.Equals((<TagSlotDetail>(slot as any as DefaultSlot).Tag).SlotStatus, SlotStatus.DEFERADMIN, StringComparison.InvariantCultureIgnoreCase) ||
                String.Equals((<TagSlotDetail>(slot as any as DefaultSlot).Tag).SlotStatus, SlotStatus.DEFERDUENOW, StringComparison.InvariantCultureIgnoreCase) ||
                String.Equals((<TagSlotDetail>(slot as any as DefaultSlot).Tag).SlotStatus, SlotStatus.DEFEROVERDUE, StringComparison.InvariantCultureIgnoreCase) ||
                (String.Equals((<TagSlotDetail>(slot as any as DefaultSlot).Tag).SlotStatus, SlotStatus.PATIENTSELFADMIN, StringComparison.InvariantCultureIgnoreCase) && DateTime.GreaterThan((<TagSlotDetail>(slot as any as DefaultSlot).Tag).SlotDateTime, this.dtCurrentDateTime))
              )
            )
          ) {
            Allslts.Add(slot)
          }
        });
      })
    });
    return Allslts.AsEnumerable();
  }

  oMAST_IsSlotUpdatedEvent(): void {
    let CurrentDT: DateTime = CommonBB.GetServerDateTime();
    this.SetOverViewDateRange(CurrentDT);
    if (this.medChartOverview != null && this.medChartOverview.ChartRows != null && this.medChartOverview.ChartRows.Count > 0)
      this.medChartOverview.ChartRows.Clear();
    if (this.medChartOverview != null && this.LayoutRoot.Children.Contains(this.medChartOverview)) {
      this.LayoutRoot.Children.Remove(this.medChartOverview);
      this.LayoutRoot.Children.Clear();
    }

    this.medChartOverview = new iMedicationChart();
    //this.medChartOverview.Width = this.LayoutRoot.ActualWidth;
    //this.medChartOverview.Height = this.RowChart.ActualHeight - 15;
    this.medChartOverview.ShowSlotTiminings = true;
    this.medChartOverview.SlotTimeWidth = 50.0;
    this.medChartOverview.SlotTimeHeader = String.Empty;
    this.medChartOverview.AutoGenerateColumn = true;
    this.medChartOverview.DrugHeader = Resource.MedsAdminChartOverview.ChartDrugItemColumnHeader;
    this.medChartOverview.Format = this.sDrugHeaderFormat;
    this.medChartOverview.StartDate = new DateTime(this.StartDate.DateTime.Ticks, DateTimeKind.Unspecified);
    this.medChartOverview.EndDate = new DateTime(this.EndDate.Ticks, DateTimeKind.Unspecified);
    this.medChartOverview.TodayDate = new DateTime(CurrentDT.DateTime.Ticks, DateTimeKind.Unspecified);
    this.medChartOverview.TimeFormat = CConstants.Timeformat;
    this.medChartOverview.TodayColWidth = MedsAdminChartOverView.dTodayColWidth;
    this.medChartOverview.ColWidth = MedsAdminChartOverView.dColWidth;
    this.medChartOverview.TabIndex = 7;
    this.medChartOverview.NoRecordsDisplayText = String.Empty;
    this.LayoutRoot.Children.Remove(this.medChartOverview);
    this.LayoutRoot.Children.Clear();
    this.LayoutRoot.Children.Add(this.medChartOverview);
    this.GetChartData(String.Empty, CurrentDT);
    //error in Application and System so commented and raised bug advice by siva

    // System.Windows.Browser.HtmlPage.Plugin.Focus();
    // this.lblSortFilter.Focus();
    Busyindicator.SetStatusIdle("Administration");
  }
  iMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
    this.isLoadedFlag = false;
  }
  oMAModorST_ModifyOrStrikethroughClosed(args: AppDialogEventargs): void {
    if (this.oRefreshTagObject != null && this.oRefreshTagObject.oIChartSlot instanceof DoseOverviewSlot) {
      if (this.oMAModorST.cmdCloseClick()) {
        if (args != null && args.Result == AppDialogResult.Close && args.Content != null) {
          this.oMAModorST.DataContext = args.Content.DataContext;
          this.ModifyStrikeThroughClosed();

        }

      }
      // ObjectHelper.stopFinishAndCancelEvent(false);
      args.AppChildWindow.DialogResult = true;
    }
  }
  iAppChildWindow: ChildWindow;
  oMAST_Closed(args: AppDialogEventargs): void {
    if (args != null && args.Content != null) {
      this.oMAST = args.Content.Component;
      if (this.oRefreshTagObject != null && this.oMAST != null && this.oRefreshTagObject.oIChartSlot instanceof DoseOverviewSlot) {
        this.oSDVM = this.oMAST.objSlotVM;
        this.iAppChildWindow = args.AppChildWindow;
        if (this.oSDVM != null && !this.oSDVM.IsSubmitInProgress) {
          // ObjectHelper.stopFinishAndCancelEvent(false);
          if (args.Result == AppDialogResult.Ok) {
            // if (!Common.CheckIfLockingDurationElapsed(new EventHandler<MessageEventArgs>(this.oMsgBox_StrikeThroughClose)))
            if (!Common.CheckIfLockingDurationElapsed((o, e) => ((sender: any, e: MessageEventArgs) => { this.oMsgBox_RecAdminClose(o, e) }))) {
              this.oSDVM.IsSubmitInProgress = true;
              Busyindicator.SetStatusBusy("Administration", true);
              let bdialogresult: boolean = this.oMAST.cmdOkClick();
              if (bdialogresult) {
                if (this.IsPGD) {
                  return
                }
                this.RefreshStrikethroughAdminSlot();
                args.AppChildWindow.DialogResult = true;
              }
            }
          }
          else {
            //args.AppChildWindow.DialogResult = false;
            args.AppChildWindow.DialogRef.close();
          }
        }
      }
      this.CurrentActivityCode = ActivityCode.None;
    }
  }
  oMsgBox_StrikeThroughClose(obj: Object, e: MessageEventArgs): void {
    this.iAppChildWindow.DialogResult = false;
  }
  getToolTip(SlotDateTime: DateTime, oSlotVM: SlotDetailVM, sHistoryToolTip: string, sDiscrepancyReason: string): string {
    let sToolTip: string = String.Empty;
    let sDoseValue: string = String.Empty;
    sHistoryToolTip = String.Empty;
    sDiscrepancyReason = String.Empty;
    if (oSlotVM.AdministrationDetail != null) {
      if (!String.IsNullOrEmpty(oSlotVM.AdministrationDetail.Dose) && !String.IsNullOrEmpty(oSlotVM.AdministrationDetail.strDoseUOM)) {
        sDoseValue = oSlotVM.AdministrationDetail.Dose + " " + oSlotVM.AdministrationDetail.strDoseUOM;
      }
      else if (String.Equals(oSlotVM.DoseType, DoseTypeCode.CONDITIONAL) && !oSlotVM.IsConditionalExists && !String.IsNullOrEmpty(oSlotVM.AdministrationDetail.Dose) && oSlotVM.AdministrationDetail.DoseUOMOID != null && !String.IsNullOrEmpty(oSlotVM.AdministrationDetail.DoseUOMOID.DisplayText)) {
        sDoseValue = oSlotVM.AdministrationDetail.Dose + " " + oSlotVM.AdministrationDetail.DoseUOMOID.DisplayText;
      }
      else if (!String.IsNullOrEmpty(oSlotVM.AdministrationDetail.Dose)) {
        sDoseValue = oSlotVM.AdministrationDetail.Dose;
      }
      else if (!String.IsNullOrEmpty(oSlotVM.AdministrationDetail.Dose)) {
        sDoseValue = oSlotVM.AdministrationDetail.strDoseUOM;
      }
      if (String.Equals(oSlotVM.Status, SlotStatus.NOTGIVEN) && oSlotVM.AdministrationDetail != null) {
        if (oSlotVM.AdministrationDetail.AmendReasonCode != null)
          oSlotVM.AdministrationDetail.SelectedAdminReasonCode = oSlotVM.AdministrationDetail.AmendReasonCode;
      }
      sToolTip = this.oGetMedsChartData.CreateTooltipForRecordAdmin(oSlotVM, SlotDateTime, sDoseValue, (o1) => { sHistoryToolTip = o1; }, (o2) => { sDiscrepancyReason = o2; });
    }
    return sToolTip;
  }
  RefreshModifyAdminSlot(): void {
    if (this.oSDVM.AdministrationDetail != null) {
      let PreviousSlotStatus: string = String.Empty;
      this.oOverviewSlot = <DoseOverviewSlot>this.oRefreshTagObject.oIChartSlot;
      this.sp = new StackPanel();
      let sHistoryToolTip: string = String.Empty;
      let sDiscrepancyReason: string = String.Empty;
      let IsDosedis: boolean = false;
      let AdministratedSlotTime: DateTime = DateTime.MinValue;
      let sToolTip: string = String.Empty;
      let oAdminTagSlotDetail: TagSlotDetail = null;
      let ScheduleDTTM: DateTime = DateTime.MinValue;
      if (this.oOverviewSlot.Tag != null) {
        oAdminTagSlotDetail = <TagSlotDetail>this.oOverviewSlot.Tag;
        oAdminTagSlotDetail.MedsAdminOID = this.oSDVM.AdministrationDetail.MedAdminOID;
        this.oSDVM.ScheduledDTTM = ScheduleDTTM = oAdminTagSlotDetail.SlotDateTime;
        PreviousSlotStatus = oAdminTagSlotDetail.SlotStatus;
        oAdminTagSlotDetail.SlotStatus = this.oSDVM.Status;
      }
      let tmpSlotStatus: string = this.oSDVM.Status;
      if (this.oSDVM.AdministrationDetail != null) {
        if (oAdminTagSlotDetail != null)
          oAdminTagSlotDetail.LastModifiedAt = this.oSDVM.AdministrationDetail.RecordedAt;
        if (this.oSDVM.Status == SlotStatus.GIVEN || this.oSDVM.Status == SlotStatus.SELFADMINISTERED) {
          if (this.oSDVM.AdministrationDetail.AdministeredDate.NotEquals(DateTime.MinValue)) {
            AdministratedSlotTime = this.oSDVM.AdministrationDetail.AdministeredDate;
          }
        }
        else {
          AdministratedSlotTime = ScheduleDTTM;
        }
        if ((this.currentSelectedItemMultiRouteType == MultiRouteType.Mixed_Routes) && (String.Equals(this.oSDVM.Status, SlotStatus.SELFADMINISTERED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.oSDVM.Status, SlotStatus.PATIENTSELFADMIN, StringComparison.CurrentCultureIgnoreCase))) {
          this.oSDVM.Status = SlotStatus.GIVEN;
        }
        if (this.oSDVM.AdministrationDetail.DoseDiscReasonCode != null && this.oSDVM.AdministrationDetail.DoseDiscReasonCode.Value != null) {
          sToolTip = this.getToolTip(ScheduleDTTM, this.oSDVM, sHistoryToolTip, sDiscrepancyReason);
        }
        else {
          sToolTip = this.getToolTip(AdministratedSlotTime, this.oSDVM, sHistoryToolTip, sDiscrepancyReason);
        }
        if ((this.currentSelectedItemMultiRouteType == MultiRouteType.Mixed_Routes) && (String.Equals(tmpSlotStatus, SlotStatus.SELFADMINISTERED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(tmpSlotStatus, SlotStatus.PATIENTSELFADMIN, StringComparison.CurrentCultureIgnoreCase))) {
          this.oSDVM.Status = tmpSlotStatus;
        }
      }
      this.sp.Children.Clear();
      if (!String.IsNullOrEmpty(this.oSDVM.AdministrationDetail.AdminComments)) {
        this.sp = Common.GetWrappedToolTipContent(sToolTip, this.oSDVM.AdministrationDetail.AdminComments); //TO BE C
        this.oOverviewSlot.AdministrationIcon = Common.GetAdminCommentsIcon(MedsAdminChartToolTip.CommentsToolTip + ": " + this.oSDVM.AdministrationDetail.AdminComments);
      }
      else {
        this.sp.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: sToolTip }));
        this.oOverviewSlot.AdministrationIcon = null;
      }
      if (!String.IsNullOrEmpty(this.oSDVM.AdministrationDetail.Dose) && !String.IsNullOrEmpty(oAdminTagSlotDetail.Dose) && (Number.Parse(this.oSDVM.AdministrationDetail.Dose) > (Number.Parse(oAdminTagSlotDetail.Dose)) || Number.Parse(this.oSDVM.AdministrationDetail.Dose) < (Number.Parse(oAdminTagSlotDetail.Dose)))) {
        if (!String.IsNullOrEmpty(this.oSDVM.LDose) && !String.IsNullOrEmpty(this.oSDVM.UDose) && ((Number.Parse(this.oSDVM.LDose) > Number.Parse(this.oSDVM.Dose)) && (Number.Parse(this.oSDVM.UDose) < Number.Parse(this.oSDVM.Dose)))) {
          IsDosedis = true;
        }
      }
      if (!String.IsNullOrEmpty(this.oSDVM.AdministrationDetail.Dose) && !String.IsNullOrEmpty(oAdminTagSlotDetail.Dose) && (Number.Parse(this.oSDVM.AdministrationDetail.Dose) > Number.Parse(oAdminTagSlotDetail.Dose) || Number.Parse(this.oSDVM.AdministrationDetail.Dose) < Number.Parse(oAdminTagSlotDetail.Dose))) {
        IsDosedis = true;
      }
      if (this.currentSelectedItemMultiRouteType == MultiRouteType.Mixed_Routes && !String.Equals(this.oSDVM.Status, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) && !String.Equals(this.oSDVM.Status, SlotStatus.GIVEN, StringComparison.CurrentCultureIgnoreCase)) {
        if (String.Equals(this.oSDVM.Status, SlotStatus.SELFADMINISTERED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.oSDVM.Status, SlotStatus.PATIENTSELFADMIN, StringComparison.CurrentCultureIgnoreCase))
          this.oOverviewSlot.StatusIcon = ObjectHelper.CreateObject(new ChartIcon(), { Key: MedicationAction.COMPLETE, UriString: MedImage.GetPath(MedImages.InfCompletedIcon) });
        else if (String.Equals(this.oSDVM.Status, SlotStatus.NOTKNOWN, StringComparison.CurrentCultureIgnoreCase))
          this.oOverviewSlot.StatusIcon = ObjectHelper.CreateObject(new ChartIcon(), { Key: SlotStatus.NOTKNOWN, UriString: MedImage.GetPath(MedImages.InfNotKnownIcon) });
        this.oOverviewSlot.StatusIcon.Tooltip = this.sp;
      }
      else if (String.Compare(this.oSDVM.Status, SlotStatus.GIVEN, StringComparison.CurrentCultureIgnoreCase) == 0) {
        this.SetOverviewSlotIcon(sToolTip, SlotStatus.GIVEN, sDiscrepancyReason, IsDosedis, this.oSDVM.AdministrationDetail.AdminComments, this.sp);
      }
      else if (String.Compare(this.oSDVM.Status, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) == 0) {
        this.oOverviewSlot.StatusIcon = ObjectHelper.CreateObject(new ChartIcon(), { Key: SlotStatus.NOTGIVEN, UriString: MedImage.GetPath(MedImages.NotGivenSlotIcon) });
        this.oOverviewSlot.StatusIcon.Tooltip = this.sp;
      }
      else if (String.Compare(this.oSDVM.Status, SlotStatus.SELFADMINISTERED, StringComparison.CurrentCultureIgnoreCase) == 0) {
        this.SetOverviewSlotIcon(sToolTip, SlotStatus.SELFADMINISTERED, sDiscrepancyReason, IsDosedis, this.oSDVM.AdministrationDetail.AdminComments, this.sp);
      }
      else if (String.Compare(this.oSDVM.Status, SlotStatus.PATIENTSELFADMIN, StringComparison.CurrentCultureIgnoreCase) == 0) {
        this.oOverviewSlot.StatusIcon = ObjectHelper.CreateObject(new ChartIcon(), { Key: SlotStatus.PATIENTSELFADMIN, UriString: MedImage.GetPath(MedImages.PatSelfAdmin) });
        this.oOverviewSlot.StatusIcon.Tooltip = this.sp;
      }
      else if (String.Compare(this.oSDVM.Status, SlotStatus.NOTKNOWN, StringComparison.CurrentCultureIgnoreCase) == 0) {
        this.oOverviewSlot.StatusIcon = ObjectHelper.CreateObject(new ChartIcon(), { Key: SlotStatus.NOTKNOWN, UriString: MedImage.GetPath(MedImages.NotKnownSlotIcon) });
        this.oOverviewSlot.StatusIcon.Tooltip = this.sp;
      }
      else {
        this.oOverviewSlot.StatusIcon.Tooltip = this.sp;
      }
      this.oRefreshTagObject.oIChartSlot = this.oOverviewSlot;
      this.medChartOverview.RefreshCell(this.oRefreshTagObject);
      let oTagDrugHeaderDetail: TagDrugHeaderDetail = null;
      let oDrugItem: DrugItem = this.oRefreshTagObject.oDrugItem;
      if (oDrugItem != null && oDrugItem.Tag != null) {
        oTagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(oDrugItem.Tag, TagDrugHeaderDetail);
      }
      if (oTagDrugHeaderDetail != null && !String.IsNullOrEmpty(oTagDrugHeaderDetail.PrescriptionItemStatus)) {
        oTagDrugHeaderDetail.PreviousPrescriptionItemStatus = oTagDrugHeaderDetail.PrescriptionItemStatus;
      }
      if (oTagDrugHeaderDetail != null && !String.Equals(oTagDrugHeaderDetail.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase) && !String.Equals(oTagDrugHeaderDetail.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) && this.oSDVM.AdministrationDetail.MedAdminOID > 0 && this.oRefreshTagObject != null && this.oRefreshTagObject.oDrugItem != null && oTagDrugHeaderDetail.FreqPerodcode == CConstants.OnceOnlyPerodCode) {
        let RowKey: string = "Row-" + this.oRefreshTagObject.oDrugItem.Key;
        let oChartRow: ChartRow = this.medChartOverview.ChartRows.Where(c => c.Key == RowKey).Select(s => s).ToList<ChartRow>().FirstOrDefault();
        this.oGetMedsChartData.IsCompleted = true;
        if (oChartRow != null && oChartRow.DrugItem != null) {
          oChartRow.RowBackground = new SolidColorBrush(Color.FromArgb(255, 185, 251, 114));
          oChartRow.DrugItem.PrescriptionStatus = ValueDomainValues.oPrescriptionItemStatus.Count > 0 ? CommonBB.GetText(CConstants.COMPLETED, ValueDomainValues.oPrescriptionItemStatus) : CConstants.COMPLETED;
          oTagDrugHeaderDetail.PrescriptionItemStatus = CConstants.COMPLETED;
          oChartRow.DrugItem.PStatusIcon = ObjectHelper.CreateObject(new ChartIcon(), { Key: "COMPLETED", UriString: MedImage.GetPath(MedImages.CompletedIcon) });
          oChartRow.DrugItem.PStatusIcon.Tooltip = MedsAdminChartToolTip.Completed;
          oChartRow.DrugItem.PStatusIcon.EnableOnHotSpotClick = false;
          this.medChartOverview.RefreshRow(oChartRow, this.oRefreshTagObject);
        }
      }
      if (!String.IsNullOrEmpty(PreviousSlotStatus) && !String.IsNullOrEmpty(this.oSDVM.Status) && oTagDrugHeaderDetail != null && oTagDrugHeaderDetail.PrescriptionItemOID > 0 && MedChartData.ListOfEventsWithNotKnownStatus != null) {
        let ToCheckPrescItem = MedChartData.ListOfEventsWithNotKnownStatus.Where(c => c != null && c.PrescriptionItemOID == oTagDrugHeaderDetail.PrescriptionItemOID).FirstOrDefault();
        if (ToCheckPrescItem == null) {
          let oEventsWithNotKnownStatus: EventsWithNotKnownStatus = new EventsWithNotKnownStatus(oTagDrugHeaderDetail.PrescriptionItemOID, 0, String.Empty);
          MedChartData.ListOfEventsWithNotKnownStatus.Add(oEventsWithNotKnownStatus);
        }
        GetMedsChartData.UpdateOverviewIcon(PreviousSlotStatus, this.oSDVM.Status, oTagDrugHeaderDetail.PrescriptionItemOID, this);
      }
      if (this.oSDVM != null && !String.IsNullOrEmpty(this.oSDVM.CurrentPrescriptionItemStatus)) {
        this.RefreshOverviewChart(this.oSDVM.CurrentPrescriptionItemStatus);
      }
    }
  }
  SetOverviewSlotIcon(sToolTip: string, sAdministeredStatus: string, sDiscrepancyReason: string, IsDosedis: boolean, sAdminComments: string, oStackPanelTooltip: StackPanel): void {
    let DuenessWindowTimeMinutes: number = MedChartData.DuenessThreshold;
    let dtAdministeredDTTM: DateTime = this.oSDVM.AdministrationDetail.AdministeredDate;
    let nDiffMins: number = Convert.ToInt32(dtAdministeredDTTM.Subtract(this.dtScheduledDTTM).TotalMinutes);
    if (!String.IsNullOrEmpty(sDiscrepancyReason) || IsDosedis) {
      this.oOverviewSlot.StatusIcon = ObjectHelper.CreateObject(new ChartIcon(), { Key: sAdministeredStatus, UriString: MedImage.GetPath(MedImages.DoseDiscrepancy) });
      this.oOverviewSlot.StatusIcon.Tooltip = oStackPanelTooltip;
    }
    else if (nDiffMins < -DuenessWindowTimeMinutes) {
      if (nDiffMins == 0)
        sToolTip = sToolTip + "\n" + "Administration was " + Convert.ToString(Math.trunc(nDiffMins / -60)).padStart(2, '0') + ":" + Convert.ToString(Number((-nDiffMins % 60).toFixed(2))).padStart(2, '0') + " min(s)" + " early";
      else sToolTip = sToolTip + "\n" + "Administration was " + Convert.ToString(Math.trunc(nDiffMins / -60)).padStart(2, '0') + ":" + Convert.ToString(Number((-nDiffMins % 60).toFixed(2))).padStart(2, '0') + " hr(s)" + " early";
      if (String.Compare(sAdministeredStatus, SlotStatus.SELFADMINISTERED, StringComparison.CurrentCultureIgnoreCase) == 0)
        this.oOverviewSlot.StatusIcon = ObjectHelper.CreateObject(new ChartIcon(), { Key: sAdministeredStatus, UriString: MedImage.GetPath(MedImages.SelfAdminEarlyIcon) });
      else this.oOverviewSlot.StatusIcon = ObjectHelper.CreateObject(new ChartIcon(), { Key: sAdministeredStatus, UriString: MedImage.GetPath(MedImages.EarlyAdminIcon) });
      if (!String.IsNullOrEmpty(sAdminComments))
        this.oOverviewSlot.StatusIcon.Tooltip = Common.GetWrappedToolTipContent(sToolTip, sAdminComments);
      else this.oOverviewSlot.StatusIcon.Tooltip = sToolTip;
    }
    else if (nDiffMins > DuenessWindowTimeMinutes) {
      if (nDiffMins == 0)
        sToolTip = sToolTip + "\n" + "Administration was " + Convert.ToString(Math.trunc(nDiffMins / 60)).padStart(2, '0') + ":" + Convert.ToString(Number((nDiffMins % 60).toFixed(2))).padStart(2, '0') + " min(s)" + " late";
      else sToolTip = sToolTip + "\n" + "Administration was " + Convert.ToString(Math.trunc(nDiffMins / 60)).padStart(2, '0') + ":" + Convert.ToString(Number((nDiffMins % 60).toFixed(2))).padStart(2, '0') + " hr(s)" + " late";
      if (String.Compare(sAdministeredStatus, SlotStatus.SELFADMINISTERED, StringComparison.CurrentCultureIgnoreCase) == 0)
        this.oOverviewSlot.StatusIcon = ObjectHelper.CreateObject(new ChartIcon(), { Key: sAdministeredStatus, UriString: MedImage.GetPath(MedImages.SelfAdminLateIcon) });
      else this.oOverviewSlot.StatusIcon = ObjectHelper.CreateObject(new ChartIcon(), { Key: sAdministeredStatus, UriString: MedImage.GetPath(MedImages.LateAdminIcon) });
      if (!String.IsNullOrEmpty(sAdminComments))
        this.oOverviewSlot.StatusIcon.Tooltip = Common.GetWrappedToolTipContent(sToolTip, sAdminComments);
      else this.oOverviewSlot.StatusIcon.Tooltip = sToolTip;
    }
    else {
      if (String.Compare(sAdministeredStatus, SlotStatus.GIVEN, StringComparison.CurrentCultureIgnoreCase) == 0)
        this.oOverviewSlot.StatusIcon = ObjectHelper.CreateObject(new ChartIcon(), { Key: sAdministeredStatus, UriString: MedImage.GetPath(MedImages.GivenSlotIcon) });
      else if (String.Compare(sAdministeredStatus, SlotStatus.SELFADMINISTERED, StringComparison.CurrentCultureIgnoreCase) == 0)
        this.oOverviewSlot.StatusIcon = ObjectHelper.CreateObject(new ChartIcon(), { Key: sAdministeredStatus, UriString: MedImage.GetPath(MedImages.SelfAdministeredIcon) });
      this.oOverviewSlot.StatusIcon.Tooltip = oStackPanelTooltip;
    }
  }
  RefreshStrikethroughAdminSlot(): void {
    let bIsPRN: boolean = false;
    let PreviousSlotStatus: string = String.Empty;
    if (this.oRefreshTagObject != null && this.oRefreshTagObject.oDrugItem != null) {
      let oTempTagDrugHeaderDetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(this.oRefreshTagObject.oDrugItem.Tag, TagDrugHeaderDetail);
      let bIsPRNWithSchedule: boolean = (oTempTagDrugHeaderDetail != null) ? oTempTagDrugHeaderDetail.IsPRNWithSchedule : false;
      bIsPRN = bIsPRNWithSchedule ? false : oTempTagDrugHeaderDetail.IsPRN;
      let _oDoseOverviewSlot: DoseOverviewSlot = (ObjectHelper.CreateType<DoseOverviewSlot>(this.oRefreshTagObject.oIChartSlot, DoseOverviewSlot));
      if (_oDoseOverviewSlot != null && _oDoseOverviewSlot.Tag != null) {
        let oTagSlotDetailPrevious: TagSlotDetail = ObjectHelper.CreateType<TagSlotDetail>(_oDoseOverviewSlot.Tag, TagSlotDetail);
        PreviousSlotStatus = oTagSlotDetailPrevious.SlotStatus;
      }
      if (bIsPRN) {
        let oBlankSlot: BlankSlot = new BlankSlot();
        oBlankSlot.Key = (ObjectHelper.CreateType<DoseOverviewSlot>(this.oRefreshTagObject.oIChartSlot, DoseOverviewSlot)).Key;
        oBlankSlot.SlotHeight = (ObjectHelper.CreateType<DoseOverviewSlot>(this.oRefreshTagObject.oIChartSlot, DoseOverviewSlot)).SlotHeight;
        oBlankSlot.EnableSlotClick = false;
        oBlankSlot.BackGroundColor = this.oRefreshTagObject.oIChartSlot.BackGroundColor;
        this.oRefreshTagObject.oIChartSlot = oBlankSlot;
        this.medChartOverview.RefreshCell(this.oRefreshTagObject);
      }
      else if (this.oSDVM.AdministrationDetail != null && (this.oSDVM.AdministrationDetail.IsHistoryExists || (oTempTagDrugHeaderDetail != null && oTempTagDrugHeaderDetail.IsPRNWithSchedule))) {
        this.oOverviewSlot = new DoseOverviewSlot();
        this.sp = new StackPanel();
        this.oOverviewSlot.Key = (ObjectHelper.CreateType<DoseOverviewSlot>(this.oRefreshTagObject.oIChartSlot, DoseOverviewSlot)).Key;
        this.oOverviewSlot.SlotHeight = (ObjectHelper.CreateType<DoseOverviewSlot>(this.oRefreshTagObject.oIChartSlot, DoseOverviewSlot)).SlotHeight;
        this.oOverviewSlot.Tag = (ObjectHelper.CreateType<DoseOverviewSlot>(this.oRefreshTagObject.oIChartSlot, DoseOverviewSlot)).Tag;
        this.oOverviewSlot.BackGroundColor = this.oRefreshTagObject.oIChartSlot.BackGroundColor;
        let oTagSlotDetail: TagSlotDetail = ObjectHelper.CreateType<TagSlotDetail>(this.oOverviewSlot.Tag, TagSlotDetail);
        if (oTagSlotDetail != null && !String.IsNullOrEmpty(oTagSlotDetail.SlotStatus) && !String.IsNullOrEmpty(oTempTagDrugHeaderDetail.PrescriptionItemStatus) && (!oTempTagDrugHeaderDetail.IsInfusion) && ((String.Equals(oTempTagDrugHeaderDetail.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase)) || String.Equals(oTempTagDrugHeaderDetail.PrescriptionItemStatus, CConstants.DISCONTINUED))) {
          oTagSlotDetail.SlotStatus = SlotStatus.NOTKNOWN;
          this.oSDVM.Status = SlotStatus.NOTKNOWN;
        }
        else {
          oTagSlotDetail.SlotStatus = this.oSDVM.Status;
        }
        if (String.Compare(this.oSDVM.Status, SlotStatus.PLANNED, StringComparison.CurrentCultureIgnoreCase) == 0) {
          oTagSlotDetail.MedsAdminOID = this.oSDVM.AdministrationDetail.MedAdminOID;
          this.sp.Children.Clear();
          if (oTagSlotDetail.IsSelfAdministered) {
            this.sp.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.PatientSelfAdministering }));
          }
          else {
            this.sp.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.PlannedToolTip }));
            this.sp.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.DueAtTooltip + ": " + oTagSlotDetail.SlotDateTime.ToUserDateTimeString(CConstants.DateTimeFormat) }));
          }
          this.oOverviewSlot.EnableSlotClick = false;
          let TimeDifference: number = Convert.ToInt32(this.dtScheduledDTTM.Subtract(this.dtCurrentDateTime).TotalMinutes);
          let AdvanceDuration: DateTime = this.dtCurrentDateTime.AddHours(MedChartData.AllowAdvanceDuration);
          if (oTempTagDrugHeaderDetail.IsAllowAdvanceAdmin || oTagSlotDetail.IsAllowAdvanceAdminSlot) {
            if (this.dtScheduledDTTM.NotEquals(DateTime.MinValue) && MedChartData.AdvDurationForRecording > 0 && TimeDifference > 0 && TimeDifference > MedChartData.DuenessThreshold && TimeDifference <= MedChartData.AdvDurationForRecording) {
              this.oOverviewSlot.EnableSlotClick = false;
            }
            else {
              if (this.dtScheduledDTTM.NotEquals(DateTime.MinValue) && AdvanceDuration.NotEquals(DateTime.MinValue) && DateTime.LessThanOrEqualTo(this.dtScheduledDTTM, AdvanceDuration)) {
                this.oOverviewSlot.EnableSlotClick = true;
              }
              else {
                this.oOverviewSlot.EnableSlotClick = false;
              }
            }
          }
          if ((String.Equals(this.oSDVM.Status, SlotStatus.PLANNED) || String.Equals(this.oSDVM.Status, SlotStatus.DUENOW) || String.Equals(this.oSDVM.Status, SlotStatus.OVERDUE)) && oTagSlotDetail.IsSelfAdministered) {
            this.oSDVM.Status = SlotStatus.PATIENTSELFADMIN;
            oTagSlotDetail.SlotStatus = SlotStatus.PATIENTSELFADMIN;
            this.oOverviewSlot.StatusIcon = ObjectHelper.CreateObject(new ChartIcon(), { Key: SlotStatus.PATIENTSELFADMIN, UriString: MedImage.GetPath(MedImages.PatSelfAdmin) });
            this.oOverviewSlot.StatusIcon.Tooltip = this.sp;
          }
          else {
            this.oOverviewSlot.StatusIcon = ObjectHelper.CreateObject(new ChartIcon(), { Key: SlotStatus.PLANNED, UriString: (this.currentSelectedItemMultiRouteType == MultiRouteType.Mixed_Routes && !oTagSlotDetail.IsBolus) ? MedImage.GetPath(MedImages.InfPlannedDeferredIcon) : MedImage.GetPath(MedImages.PlannedIcon) });
            this.oOverviewSlot.StatusIcon.Tooltip = this.sp;
          }
        }
        else if (String.Equals(this.oSDVM.Status, SlotStatus.HOMELEAVE, StringComparison.InvariantCultureIgnoreCase)) {
          this.sp.Children.Clear();
          this.oOverviewSlot.StatusIcon = ObjectHelper.CreateObject(new ChartIcon(), { Key: SlotStatus.HOMELEAVE, UriString: MedImage.GetPath(MedImages.HomeLeaveIcon) });
          this.sp.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.HomeLeaveToolTip }));
          this.oOverviewSlot.StatusIcon.Tooltip = this.sp;
          this.oOverviewSlot.EnableSlotClick = true;
        }
        else {
          if (String.Equals(this.oSDVM.Status, SlotStatus.NOTKNOWN, StringComparison.CurrentCultureIgnoreCase)) {
            oTagSlotDetail.LastModifiedAt = this.oSDVM.AdministrationDetail.RecordedAt;
          }
          if (bIsPRNWithSchedule || !oTagSlotDetail.IsPRN) {
            this.sp.Children.Clear();
            if (this.currentSelectedItemMultiRouteType == MultiRouteType.Mixed_Routes)
              this.sp.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.StatusToolTip + ": " + MedsAdminChartToolTip.NotKnownToolTip }));
            else this.sp.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.NotKnownToolTip }));
            this.sp.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.DueAtTooltip + ": " + (this.oSDVM.ScheduledDTTM.NotEquals(DateTime.MinValue) ? this.oSDVM.ScheduledDTTM.ToUserDateTimeString(CConstants.DateTimeFormat) : String.Empty) }));
            this.sp.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.RecordedAtToolTip + ": " + (this.oSDVM.AdministrationDetail.RecordedAt.NotEquals(DateTime.MinValue) ? this.oSDVM.AdministrationDetail.RecordedAt.ToUserDateTimeString(CConstants.DateTimeFormat) : String.Empty) }));
            this.sp.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.RecordedByToolTip + ": " + (!String.IsNullOrEmpty(this.oSDVM.AdministrationDetail.RecordedBy) ? this.oSDVM.AdministrationDetail.RecordedBy : String.Empty) }));
            if (this.currentSelectedItemMultiRouteType == MultiRouteType.Mixed_Routes)
              this.oOverviewSlot.StatusIcon = ObjectHelper.CreateObject(new ChartIcon(), { Key: SlotStatus.NOTKNOWN, UriString: MedImage.GetPath(MedImages.InfNotKnownIcon) });
            else this.oOverviewSlot.StatusIcon = ObjectHelper.CreateObject(new ChartIcon(), { Key: SlotStatus.NOTKNOWN, UriString: MedImage.GetPath(MedImages.NotKnownSlotIcon) });
            if (String.Equals(this.oSDVM.Status, SlotStatus.NOTKNOWN, StringComparison.InvariantCultureIgnoreCase)) {
              this.oOverviewSlot.StatusIcon.Tooltip = this.sp;
            }
            else {
              if (!String.IsNullOrEmpty(this.oSDVM.AdministrationDetail.AdminComments)) {
                this.sp.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.CommentsToolTip + ": " + this.oSDVM.AdministrationDetail.AdminComments, IsWordwrap: true, Width: 200 }));
                this.oOverviewSlot.AdministrationIcon = Common.GetAdminCommentsIcon(MedsAdminChartToolTip.CommentsToolTip + ": " + this.oSDVM.AdministrationDetail.AdminComments);
              }
              this.oOverviewSlot.StatusIcon.Tooltip = this.sp;
            }
          }
          else {
            this.oOverviewSlot.BackGroundColor = new SolidColorBrush(MedChartData.AsRequiredSlotsColor);
          }
        }
        this.oRefreshTagObject.oIChartSlot = this.oOverviewSlot;
        this.medChartOverview.RefreshCell(this.oRefreshTagObject);
        if (oTempTagDrugHeaderDetail != null && String.Equals(oTempTagDrugHeaderDetail.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase) && this.oRefreshTagObject != null && this.oRefreshTagObject.oDrugItem != null && this.oRefreshTagObject.oDrugItem.Tag != null && oTempTagDrugHeaderDetail.FreqPerodcode == CConstants.OnceOnlyPerodCode) {
          let RowKey: string = "Row-" + this.oRefreshTagObject.oDrugItem.Key;
          let oChartRow: ChartRow = this.medChartOverview.ChartRows.Where(c => c.Key == RowKey).Select(s => s).ToList<ChartRow>().FirstOrDefault();
          this.oGetMedsChartData.IsCompleted = false;
          if (oChartRow != null && oChartRow.DrugItem != null) {
            oChartRow.RowBackground = Common.SetSlotColor(this.oSDVM.Status, this.oGetMedsChartData.IsGreyedOut);
            oChartRow.DrugItem.PrescriptionStatus = String.Empty;
            oTempTagDrugHeaderDetail.PrescriptionItemStatus = CConstants.SUBMITTED;
            oChartRow.DrugItem.PStatusIcon = null;
            this.medChartOverview.RefreshRow(oChartRow, this.oRefreshTagObject);
            let MedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
            if (MedAdminVM != null) {
              MedAdminVM.SetHeightweightPopUp();
            }
          }
        }
        if (!String.IsNullOrEmpty(PreviousSlotStatus) && !String.IsNullOrEmpty(this.oSDVM.Status) && oTempTagDrugHeaderDetail != null && oTempTagDrugHeaderDetail.PrescriptionItemOID > 0 && MedChartData.ListOfEventsWithNotKnownStatus != null) {
          let ToCheckPrescItem = MedChartData.ListOfEventsWithNotKnownStatus.Where(c => c != null && c.PrescriptionItemOID == oTempTagDrugHeaderDetail.PrescriptionItemOID).FirstOrDefault();
          if (ToCheckPrescItem == null) {
            let oEventsWithNotKnownStatus: EventsWithNotKnownStatus = new EventsWithNotKnownStatus(oTempTagDrugHeaderDetail.PrescriptionItemOID, 0, String.Empty);
            MedChartData.ListOfEventsWithNotKnownStatus.Add(oEventsWithNotKnownStatus);
          }
          GetMedsChartData.UpdateOverviewIcon(PreviousSlotStatus, this.oSDVM.Status, oTempTagDrugHeaderDetail.PrescriptionItemOID, this);
        }
      }
      if (oTempTagDrugHeaderDetail.PrescriptionItemStatus != null && this.oSDVM != null && !String.IsNullOrEmpty(this.oSDVM.CurrentPrescriptionItemStatus)) {
        this.RefreshOverviewChart(this.oSDVM.CurrentPrescriptionItemStatus);
        let MedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
        if (MedAdminVM != null) {
          MedAdminVM.SetHeightweightPopUp();
        }
      }
    }
  }
  lblSortFilter_Click(): void {
    if (this.oOverViewChartData.MedChartOID <= 0) {
      this.oOverViewChartData.SortRangeStartDate = MedChartData.ActiveFrom.Date;
      this.oOverViewChartData.SortRangeEndDate = MedChartData.ActiveTo.DateTime.AddSeconds(86399);
      this.oOverViewChartData.ValidateDate = MedChartData.ActiveFrom;
    }
    this.oOverViewChartData.ActiveFrom = this.medChartOverview.StartDate;
    this.oOverViewChartData.ActiveTo = this.medChartOverview.EndDate;
    // this.oSortFilterOpt = new MedSortFilterbyOptions(this.oOverViewChartData, false); // Existing code
    this.oSortFilterOpt = new MedSortFilterbyOptions();
    this.oSortFilterOpt.constructorImpl(this.oOverViewChartData, false);
    this.oSortFilterOpt.onDialogClose = this.oSortFilterOpt_Closed;
    let lblSortCallback = (s, e) => {
      if (s != null && e != null) {
        this.oSortFilterOpt = s;
      }
    }
    // ObjectHelper.stopFinishAndCancelEvent(true);
    AppActivity.OpenWindow("Medication chart overview - Options ",
      this.oSortFilterOpt,
      (s, e) => { this.oSortFilterOpt_Closed(s); }, "", false, 250, 380, false, WindowButtonType.OkCancel, null, null, null, lblSortCallback);
  }

  oSortFilterOpt_Closed(args: AppDialogEventargs): void {
    let bdialogresult: boolean = false;
    this.oSortFilterOpt = ObjectHelper.CreateType<MedSortFilterbyOptions>(args.Content.Component, MedSortFilterbyOptions);
    if (args.Result == AppDialogResult.Ok && args.Content != null && args.Content.Component != null) {

      bdialogresult = this.oSortFilterOpt.cmdOK_Click();
      this.oOverViewChartData = ObjectHelper.CreateType<OverViewChartData>(this.oSortFilterOpt.DataContext, OverViewChartData);

      if (bdialogresult) {
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
          this.SetSortFilterData(false);
        }
        // ObjectHelper.stopFinishAndCancelEvent(false);
        this.oSortFilterOpt.appDialog.DialogResult = bdialogresult;
      }
    }
    else if (args.Result == AppDialogResult.Cancel) {
      // ObjectHelper.stopFinishAndCancelEvent(false);
      this.oSortFilterOpt.cmdCancel_Click();
    }

  }

  SetSortFilterData(bRefreshFromOtherCA: boolean): void {
    this.StartDate = this.oOverViewChartData.ActiveFrom;
    if (this.oOverViewChartData.ActiveTo.Equals(DateTime.MinValue)) {
      if (!String.IsNullOrEmpty(this.sMedViewOptionValue) && String.Compare(this.sMedViewOptionValue, "CC_14DAYVIEW") == 0)
        this.EndDate = this.StartDate.AddDays(13);
      else this.EndDate = this.StartDate.AddDays(6);
    }
    else this.EndDate = this.oOverViewChartData.ActiveTo;
    this.dtServerDate = CommonBB.GetServerDateTime();
    this.FillMedChartBasicData(this.dtServerDate);
    if (this.oOverViewChartData.SortByValue != null) {
      if (String.Compare(this.oOverViewChartData.SortByValue.Value, CConstants.SortByChronological, StringComparison.CurrentCultureIgnoreCase) == 0)
        this.GetChartData(this.oOverViewChartData.SortByValue.Value, this.dtServerDate);
      else if (String.Compare(this.oOverViewChartData.SortByValue.Value, CConstants.SortByRevChronological, StringComparison.CurrentCultureIgnoreCase) == 0)
        this.GetChartData(this.oOverViewChartData.SortByValue.Value, this.dtServerDate);
      else this.GetChartData(String.Empty, this.dtServerDate);
    }
    else if (bRefreshFromOtherCA) {
      this.GetChartData(String.Empty, this.dtServerDate);
    }
  }
  chkDiscontiueCompleted_Checked() {
    this.oOverViewChartData = new OverViewChartData();
    this.oOverViewChartData.IsDiscontinueChecked = true;
    let dtServerDate: DateTime = CommonBB.GetServerDateTime();
    if(that.isDataLoded){
    that.FillMedChartBasicData(dtServerDate);
    that.GetChartData(String.Empty, dtServerDate);
    }
  }
  chkDiscontiueCompleted_Unchecked() {
    this.oOverViewChartData = new OverViewChartData();
    this.oOverViewChartData.IsDiscontinueChecked = false;
    let dtServerDate: DateTime = CommonBB.GetServerDateTime();
    if(that.isDataLoded){
    that.FillMedChartBasicData(dtServerDate);
    that.GetChartData(String.Empty, dtServerDate);
  }
  }
  cmdPrevDay_Click(e) {
    this.StartDate = this.StartDate.AddDays(-1);
    this.EndDate = this.EndDate.AddDays(-1);
    this.ReloadMedChartOverview();
  }
  cmdPrevWeek_Click(e) {
    this.StartDate = this.StartDate.AddDays(-7);
    this.EndDate = this.EndDate.AddDays(-7);
    this.ReloadMedChartOverview();
  }
  cmdNextDay_Click(e) {
    this.StartDate = this.StartDate.AddDays(1);
    this.EndDate = this.EndDate.AddDays(1);
    this.ReloadMedChartOverview();
  }
  cmdNextWeek_Click(e) {
    this.StartDate = this.StartDate.AddDays(7);
    this.EndDate = this.EndDate.AddDays(7);
    this.ReloadMedChartOverview();
  }
  cmdToday_Click(e) {
    let CurrentDT: DateTime = CommonBB.GetServerDateTime();
    let bIsDiscontinueChecked: boolean = false;
    if (this.oOverViewChartData != null) {
      bIsDiscontinueChecked = this.oOverViewChartData.IsDiscontinueChecked;
    }
    this.oOverViewChartData = new OverViewChartData();
    MedChartData.MedChartOID = this.oOverViewChartData.MedChartOID = MedChartDefaultData.MedChartOID;
    MedChartData.ChartStatus = this.oOverViewChartData.ChartStatus = MedChartDefaultData.ChartStatus;
    this.oOverViewChartData.IsDiscontinueChecked = bIsDiscontinueChecked;
    if (this.oOverViewChartData.ChartStatus == CConstants.sChartInActiveStatusCode)
      this.medChartOverview.IsEnabled = false;
    else this.medChartOverview.IsEnabled = true;
    if (!String.IsNullOrEmpty(this.sMedViewOptionValue) && String.Compare(this.sMedViewOptionValue, "CC_14DAYVIEW") == 0) {
      if ((String.Compare(MedChartDefaultData.ChartStatus, CConstants.sChartActiveStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(MedChartDefaultData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0)) {
        // let tsCompareStartDate: TimeSpan = CurrentDT - MedChartDefaultData.ActiveFrom;
        let tsCompareStartDate: TimeSpan = CurrentDT.DateTime.Diff(MedChartDefaultData.ActiveFrom);
        if (tsCompareStartDate.Days < 7)
          this.oOverViewChartData.ActiveFrom = this.StartDate = MedChartDefaultData.ActiveFrom.Date;
        else this.oOverViewChartData.ActiveFrom = this.StartDate = CurrentDT.DateTime.AddDays(-6);
        this.oOverViewChartData.ActiveTo = this.EndDate = this.StartDate.AddDays(13);
      }
      else {
        this.oOverViewChartData.ActiveFrom = this.StartDate = MedChartDefaultData.ActiveFrom.Date;
        // let tsCompareEndDate: TimeSpan = MedChartDefaultData.ActiveTo - MedChartDefaultData.ActiveFrom;
        let tsCompareEndDate: TimeSpan = MedChartDefaultData.ActiveTo.DateTime.Diff(MedChartDefaultData.ActiveFrom);
        if (tsCompareEndDate.Days < 14)
          this.oOverViewChartData.ActiveTo = this.EndDate = MedChartDefaultData.ActiveTo;
        else this.oOverViewChartData.ActiveTo = this.EndDate = this.StartDate.AddDays(13);
      }
    }
    else {
      if ((String.Compare(MedChartDefaultData.ChartStatus, CConstants.sChartActiveStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(MedChartDefaultData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0)) {
        // let tsCompareStartDate: TimeSpan = this.dtServerDate - MedChartDefaultData.ActiveFrom;
        let tsCompareStartDate: TimeSpan = this.dtServerDate.DateTime.Diff(MedChartDefaultData.ActiveFrom);
        if (tsCompareStartDate.Days < 4)
          this.oOverViewChartData.ActiveFrom = this.StartDate = MedChartDefaultData.ActiveFrom.Date;
        else this.oOverViewChartData.ActiveFrom = this.StartDate = this.dtServerDate.DateTime.AddDays(-3);
        this.oOverViewChartData.ActiveTo = this.EndDate = this.StartDate.AddDays(6);
      }
      else {
        this.oOverViewChartData.ActiveFrom = this.StartDate = MedChartDefaultData.ActiveFrom.Date;
        // let tsCompareEndDate: TimeSpan = MedChartDefaultData.ActiveTo - MedChartDefaultData.ActiveFrom;
        let tsCompareEndDate: TimeSpan = MedChartDefaultData.ActiveTo.DateTime.Diff(MedChartDefaultData.ActiveFrom);
        if (tsCompareEndDate.Days < 7)
          this.oOverViewChartData.ActiveTo = this.EndDate = MedChartDefaultData.ActiveTo;
        else this.oOverViewChartData.ActiveTo = this.EndDate = this.StartDate.AddDays(6);
      }
    }
    MedChartData.SuspendedOn = MedChartDefaultData.SuspendedOn;
    MedChartData.ServiceOID = MedChartDefaultData.ServiceOID;
    MedChartData.LocationOID = MedChartDefaultData.LocationOID;
    PatientContext.MergedPatientOID = MedChartDefaultData.MergedPatientOID;
    PatientContext.EncounterCode = MedChartDefaultData.EncounterStatus;
    this.oOverViewChartData.MedChartPatOID = ChartContext.PatientOID = ChartContext.DefaultDataPatientOID;
    ChartContext.EncounterOID = ChartContext.DefaultDataEncounterOID;
    ChartContext.EncounterType = ChartContext.DefaultDataEncounterType;
    this.ReloadMedChartOverview();
  }
  ReloadMedChartOverview(): void {
    let CurrentDT: DateTime = CommonBB.GetServerDateTime();
    this.FillMedChartBasicData(CurrentDT);
    this.GetChartData(String.Empty, CurrentDT);
  }
  // cmdFluidBalance_Click(e): void {
  //   Common.LaunchFBChart();
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
    sQuery += "&CallingFrom=" + CConstants.sTabChartOverViewKey;
    sQuery += "&ENCTYPE=" + PatientContext.EncounterType;
    sQuery += "&RequestLockOID=";
    sQuery += PatientContext.EncounterOid.ToString();
    let bIsLocked: boolean = false;
    let MedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
    MedAdminVM.CheckPessimisticLock((o) => { bIsLocked = o; });
    if (!bIsLocked) {
      let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", PatientContext.EncounterOid, "MedTVInpatient", Common.nLockDuration), 'string');
      MedAdminVM.sLastCACode = sMenuCode;
      // MedAdminVM.PropertyChanged -= this.obj_PropertyChanged;
      // MedAdminVM.PropertyChanged = this.obj_PropertyChanged;
      MedAdminVM.PropertyChanged = (s, e) => { this.obj_PropertyChanged(s, e); };
      MedAdminVM.LaunchWizard(sMenuCode, sQuery, 2);
    }
  }
  obj_PropertyChanged(sender: Object, e: PropertyChangedEventArgs): void {
    let sResult: string = String.Empty;
    if (e.PropertyName == "MedsAdminTVClosed") {
      sResult = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", PatientContext.EncounterOid, "MedTVInpatient", Common.nLockDuration), 'string');
      this.SetSortFilterData(true);
    }
    else if (e.PropertyName == "MedsAdminTVClosedCancel") {
      sResult = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", PatientContext.EncounterOid, "MedTVInpatient", Common.nLockDuration), 'string');
    }
  }
  CurrentActivityCode: ActivityCode = ActivityCode.None;
  txtBarcode_KeyDown(e) {
    if (String.Compare(e.key.toString(), CConstants.ENTER, StringComparison.InvariantCultureIgnoreCase) == 0) {
      let oManageBarcodeHelper: ManageBarcodeHelper = new ManageBarcodeHelper();
      let lnPrescriptionItemScheduleOID: number = 0;
      oManageBarcodeHelper.GetPatientQuickSearchDetails(e.target.value, lnPrescriptionItemScheduleOID);
      setTimeout(() => {
        e.target.value = String.Empty;
    }, 400)
    }
  }
  cmdWristbandScan_Click(e): void {
    this.txtBarcode.nativeElement.focus();
  }
  txtBarcode_LostFocus(e): void {
    e.target.value = String.Empty;
    this.barcodeStyleFocus = false;
  }
  txtBarcode_GotFocus(e): void {
    e.target.value = String.Empty;
    this.barcodeStyleFocus = true;
  }
  RefreshOverviewChart(CurrentPrescriptionItemStatus: string): void {
    if (this.oRefreshTagObject != null && this.oRefreshTagObject.oDrugItem != null && this.oRefreshTagObject.oDrugItem.Tag != null) {
      let oTagDrugHeaderDetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(this.oRefreshTagObject.oDrugItem.Tag, TagDrugHeaderDetail);
      if (oTagDrugHeaderDetail != null && !String.IsNullOrEmpty(CurrentPrescriptionItemStatus) && !String.IsNullOrEmpty(oTagDrugHeaderDetail.PreviousPrescriptionItemStatus)) {
        let _itemPreviousStatus: string = oTagDrugHeaderDetail.PreviousPrescriptionItemStatus;
        let _itemNewStatus: string = CurrentPrescriptionItemStatus;
        if ((!String.Equals(_itemPreviousStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) && String.Equals(_itemNewStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase)) || (String.Equals(_itemPreviousStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(_itemNewStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase))) {
          this.ReloadMedChartOverview();
        }
      }
    }
  }
  public DisposeObjectsOnFinish(): void {
    this.DisposeFormEvents();
    this.DisposeFormObjects();
  }
  DisposeFormEvents(): void {
    if (this.oGetMedsChartData != null) {
      // this.oGetMedsChartData.MedsAdminChartDataCompleted -= this.oGetMedsChartData_MedsAdminChartDataCompleted;
      this.oGetMedsChartData.MedsAdminChartDataCompleted = this.oGetMedsChartData_MedsAdminChartDataCompleted;
    }
    if (this.medChartOverview != null) {
      // this.medChartOverview.OnHotSpotClick -= this.medChartOverview_OnHotSpotClick;
      // this.medChartOverview.OnDrugHotSpotClick -= this.medChartOverview_OnDrugHotSpotClick;
      this.medChartOverview.OnHotSpotClick = this.medChartOverview_OnHotSpotClick;
      this.medChartOverview.OnDrugHotSpotClick = this.medChartOverview_OnDrugHotSpotClick;
    }
    if (this.MultiDoseDetailVM != null) {
      // this.MultiDoseDetailVM.TitratedDoseCompleted -= this.MultiDoseDetailVM_TitratedDoseCompleted;
      this.MultiDoseDetailVM.TitratedDoseCompleted = this.MultiDoseDetailVM_TitratedDoseCompleted;
    }
    if (this.oMedsAdminRec != null) {
      // this.oMedsAdminRec.OnRecAdminFinishEvent -= this.oMedsAdminRec_OnRecAdminFinishEvent;
      this.oMedsAdminRec.OnRecAdminFinishEvent = this.oMedsAdminRec_OnRecAdminFinishEvent;
    }
    if (this.oMAST != null) {
      // this.oMAST.IsSlotUpdatedEvent -= this.oMAST_IsSlotUpdatedEvent;
      this.oMAST.IsSlotUpdatedEvent = this.oMAST_IsSlotUpdatedEvent;
    }
    let MedAdminVM: MedicationAdminVM = ObjectHelper.CreateType<MedicationAdminVM>(this.DataContext, MedicationAdminVM);
    if (MedAdminVM != null) {
      // MedAdminVM.PropertyChanged -= this.obj_PropertyChanged;
      MedAdminVM.PropertyChanged = this.obj_PropertyChanged;
    }
  }
  public DisposeFormObjects(): void {
    this.objStepped = null;
    this.oMAST = null;
    this.oMAModorST = null;
    this.medChartOverview = null;
    this.oSortFilterOpt = null;
    this.ddetChild = null;
    this.oGetMedsChartData = null;
    this.oOverViewChartData = null;
    this.oRefreshTagObject = null;
    this.oOverviewSlot = null;
    this.sp = null;
    this.oSDVM = null;
    this.objTitrated = null;
    this.oMedMCItems = null;
    this.oChildWindow = null;
    this.oTagObject = null;
    this.ConditionalVM = null;
    this.MultiDoseDetailVM = null;
    this.oHdrRecordAdmin = null;
    this.oMedsAdminRec = null;
    this.oNonInfSlotVM = null;
    this.oCurrentOverviewSlotInf = null;
    this.oSlotTagObjectInf = null;
    this.oDrugHeaderDetailInf = null;
    this.oClickedTagObjectInf = null;
  }
}
