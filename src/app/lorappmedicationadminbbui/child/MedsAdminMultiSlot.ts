import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow } from 'epma-platform/models';
import { AppDialog, Binding, DataTemplate, SolidColorBrush, StackPanel, iButton } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { Resource } from '../resource';
import { GridComponent, RowClassArgs } from '@progress/kendo-angular-grid';
import { GridExtension, RowLoadedEventArgs } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { CDrugHdrAddnlInfo, CDrugHeader, DrugHeader } from '../common/drugheader';
import { CumulativeAdministration } from '../model/cumulativeadministration';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { MedsAdminMultiSlotVM } from '../viewmodel/MedsAdminVM';
import { GridViewCellClickEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { CConstants, LaunchAdminType, MedAction, MultiRouteType, RecordAdminType, SlotStatus } from '../utilities/CConstants';
import { MedsAdminChartToolTip } from '../resource/medsadmincharttooltip.designer';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { SlotAdministrationHelper } from '../common/slotadministrationhelper';
import { SlotDetailVM } from '../viewmodel/MedicationChartVM';
import { MedChartData, TagDrugHeaderDetail } from '../utilities/globalvariable';
import { MedicationChart } from '../resource/medicationchart.designer';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { UserPermissions } from '../utilities/ProfileData';
import { Visibility } from 'src/app/shared/epma-platform/controls-model/Visibility';
import { Common } from '../utilities/common';
import { AdministrationDetail } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { MedsRecordAdminstrator } from './medsadminrecordadmin';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { MedsAdminModifyOrStrikethrough } from './MedsAdminModifyOrStrikethrough';
import { DisplayMultiSlotDetail, DisplayPrescriptionLineItem } from '../converter/medadminconverter';
import { DoseWrapConverter } from '../converter/medadminconverter';
import { RouteWrapConverter } from '../converter/medadminconverter';
import { TargetsatrangeConverter } from '../converter/medadminconverter';
import { HumidificationConverter } from '../converter/medadminconverter';
import { DisplayMultiSlotDetailPipe, FontWeightConvPipe } from 'src/app/lorarcbluebirdmedicationchart/converter/MedChartConverter.pipe';
var that;

@Component({
  selector: 'medsadminmultislot',
  templateUrl: './MedsAdminMultiSlot.html',
  styleUrls: ['./MedsAdminMultiSlot.css'],
})

export class MedsAdminMultiSlot extends iAppDialogWindow implements OnInit, AfterViewInit {
  public oMedsAdminSlotVM: MedsAdminMultiSlotVM = new MedsAdminMultiSlotVM();
  public oMAModorST: MedsAdminModifyOrStrikethrough=new MedsAdminModifyOrStrikethrough();
  oSlotDetail: SlotDetailVM;
  IsNextDueSlotExists: boolean = false;
  IsNextAdminSlotExists: boolean = false;
  sCurrentSlotStatus: string = String.Empty;
  public sPrevStatus: string = String.Empty;
  private ShowPatientSelfAdminMsg: boolean = false;
  private sCurrentSchDTTM: DateTime;
  CumulativeParaAdmin: CumulativeAdministration;
  iMsgBox: iMessageBox;
  // from MedsRecordAdminstrator file
  oMedsAdminRec: MedsRecordAdminstrator;
  overDueCount: number = 0;
  dueCount: number = 0;
  IsCumulativeWarningAcknowledged: boolean;
  IsLessAdmOutErrorMsgExists: boolean = false;
  IsGrtAdmOutErrorMsgExists: boolean = false;
  IsNextDueErrMsgExists: boolean = false;
  IsTitratedDoseEmptyErrMsgExists: boolean = false;
  IsRecordAmin: boolean = false;
  public oDrugHeader: CDrugHeader = new CDrugHeader();
  public oTagDrugHeaderDetail: TagDrugHeaderDetail;
  public bDataContext: Object;
  public oTempMedsAdminMultiSlotVM: MedsAdminMultiSlot;
  dtCurrentDateTime: DateTime = CommonBB.GetServerDateTime();
  public isInfusionInProgressForMultiRouteItem: boolean;
  IsDST: boolean;
  IsAmbiguous: boolean;
  IsInvalid: boolean;
  IsParacetamolWarningMsgShown: number = -1;
  public IsPreviousActiveSeqItem: boolean;
  private LayoutRoot: StackPanel;
  public Styles = ControlStyles;
  oMsg: iMessageBox = new iMessageBox();
  ScheduledDTTMDisplay: string;
  public MedChartView = Resource.MedsAdminChartToolTip;
  objSlotDetailVM: SlotDetailVM;
  oDrugHeaderAddnlInfo: CDrugHdrAddnlInfo;
  AlreadyRequestedDetails: string = String.Empty;
  grdMultiSlot: GridExtension = new GridExtension();
  MultislotDisplay: DisplayMultiSlotDetailPipe;
  FontWeightConv: FontWeightConvPipe;
  ChangeDetectorRef: any;  
  // isErrorLaunched: boolean = false;
  // isHomeLeavemsgboxLaunched: boolean = false;

  @ViewChild('LayoutRootTempRef', { read: StackPanel, static: false })
  set _LayoutRoot(c: StackPanel) {
    if (c) {
      this.LayoutRoot = c;
    }
  }

  drgHeader: DrugHeader;
  @ViewChild('drgHeaderTempRef', { read: DrugHeader, static: false })
  set _drgHeader(c: DrugHeader) {
    if (c) {
      this.drgHeader = c;
    }
  }

  // name attribute
  @ViewChild('grdMultiSlotTempRef', { read: GridComponent }) set _gridTest(
    comp: GridComponent
  ) {
    if (comp) {
      // this.grdResolve.ItemsSource = comp.data;
      this.grdMultiSlot.grid = comp;
      this.grdMultiSlot.columns = comp.columns;
    }
  }

  columnCount: number = 2;
  dataTemplates: QueryList<DataTemplate>;
  @ViewChildren('temp', { read: DataTemplate })
  set _dataTemplates(v: QueryList<DataTemplate>) {
    if (v) {
      this.dataTemplates = v;
      this.grdMultiSlot.dataTemplates = v;
    }
  }

  rowLoaded(context: any) {
    // let rowEventArgs = this.grdMultiSlot.GetRowEventArgs(
    //   this.dataTemplates,
    //   context
    // );
    // this.grdMultiSlot_RowLoaded({}, rowEventArgs);
  }

  rowCallback = (context: RowClassArgs) => {
    let rowStyles = this.grdMultiSlot.getRowStyles(context);
    return rowStyles;
  };

  constructor() {
    super();
    // InitializeComponent();
    this.DataContext = new MedsAdminMultiSlotVM();
    this.CumulativeParaAdmin = new CumulativeAdministration();
    this.CumulativeParaAdmin.WarningChangeEvent = (s, e) => {
      this.CumulativeParaAdmin_WarningChangeEvent(s, e);
    };
    that = this;
  }
//   constructor() {
//     InitializeComponent();
//     this.Loaded += new RoutedEventHandler(MedsAdminMultiSlot_Loaded);
//     this.CumulativeParaAdmin = new CumulativeAdministration();
//     this.CumulativeParaAdmin.WarningChangeEvent += new CumulativeAdministration.WarningChange(CumulativeParaAdmin_WarningChangeEvent);
// }

  ngOnInit(): void {
    this.grdMultiSlot.onCellClick = (s, e) => {
      this.grdMultiSlot_onCellClick(s, e);
    };
  }

  entire_rowload(){
    for(let i = 0; i < this.rowCount; i++) {
      let context:{index:any,dataItem:any}={index:0,dataItem:{}};
      context.index = i;
      context.dataItem = this.oMedsAdminSlotVM.MultiSlot[i];
      let rowEventArgs = this.grdMultiSlot.GetRowEventArgs(this.dataTemplates, context);
      this.grdMultiSlot_RowLoaded({}, rowEventArgs);
    }
   }

  ngAfterViewInit(): void {
    this.drgHeader.lblInstructions.Visibility = Visibility.Visible;
    this.grdMultiSlot.GenerateColumns();
    this.grdMultiSlot.changeDetectionRef = this.ChangeDetectorRef;
    this.MedsAdminMultiSlot_Loaded(null, null);
    this.dataTemplates.changes.subscribe((dts) => {
      if (dts.length > 0) {
       this.rowCount = dts.length / this.columnCount;
       this.entire_rowload();
      }
    })
  }
  MedsAdminMultiSlot_Loaded(sender: Object, e: RoutedEventArgs): void {
    this.bDataContext = super.DataContext;
    this.oTempMedsAdminMultiSlotVM = this;
    this.oMedsAdminSlotVM = ObjectHelper.CreateType<MedsAdminMultiSlotVM>(
      this.DataContext,
      MedsAdminMultiSlotVM
    );
    this.oMedsAdminSlotVM.GetMultiSlotDetail(false, false, false);
    this.oMedsAdminSlotVM.GetAdminMultiSlotCompleted.subscribe(x => {
      if (x == true) {
        this.grdMultiSlot.SetBinding(
          'data', this.oMedsAdminSlotVM.MultiSlot
        );
      }
    })

    Busyindicator.SetStatusIdle('MedChart');
    // MultiSlot need to find where is coming from / context
  }
  ValidateMultiRouteItem(): boolean {
    let bRetVal: boolean = true;
    if (
      this.oSlotDetail != null &&
      this.oSlotDetail.MultiRoute_Type == MultiRouteType.Mixed_Routes
    ) {
      if (
        this.oMedsAdminSlotVM != null &&
        this.oMedsAdminSlotVM.MultiSlot != null &&
        this.oSlotDetail != null &&
        this.oMedsAdminSlotVM.MultiSlot.Any(
          (x) =>
           (DateTime.LessThan(x.ScheduledDTTM , this.oSlotDetail.ScheduledDTTM)) &&
            (x.Status == SlotStatus.INPROGRESS || x.Status == SlotStatus.PAUSED)
        )
      ) {
        let prevSlot = this.oMedsAdminSlotVM.MultiSlot.Where(
          (x) =>
            DateTime.LessThan(x.ScheduledDTTM , this.oSlotDetail.ScheduledDTTM) &&
            (x.Status == SlotStatus.INPROGRESS || x.Status == SlotStatus.PAUSED)
        ).FirstOrDefault();
        let sErrorMsg: string = String.Format(
          MedsAdminChartToolTip.MixedMultiRouteInProgress_ErrorMsg,
          prevSlot.ScheduledDTTM.ToString(CConstants.DateTimeFormat),
          this.oSlotDetail.DrugDetail.Drugname
        );
        this.ShowMultiRouteAlertMessage(
          sErrorMsg,
          MessageBoxButton.OK,
          MessageBoxType.Information,
          (s, e) => {
            this.MultiRouteError_MessageBoxClose(s, e);
          },
          160,
          410
        );
        bRetVal = false;
      } else if (this.oSlotDetail.isInfusionInProgressForMultiRouteItem) {
        let sErrorMsg: string = String.Format(
          MedsAdminChartToolTip.MixedMultiRouteInProgress_ErrorMsg,
          this.oSlotDetail.InProgressInfusionMultiRouteDTTM.ToString(
            CConstants.DateTimeFormat
          ),
          this.oSlotDetail.DrugDetail.Drugname
        );
        this.ShowMultiRouteAlertMessage(
          sErrorMsg,
          MessageBoxButton.OK,
          MessageBoxType.Information,
          (s, e) => {
            this.MultiRouteError_MessageBoxClose(s, e);
          },
          160,
          410
        );
        bRetVal = false;
      }
      let sSlotStatus: string = this.oSlotDetail.Status;
    }
    return bRetVal;
  }
  ShowMultiRouteAlertMessage(
    sErrorMsg: string,
    oMessageBoxButton: MessageBoxButton,
    oMessageBoxType: MessageBoxType,
    targetHandler: Function,
    MsgBoxHeight: number,
    MsgBoxWidth: number
  ): void {
    if (!String.IsNullOrEmpty(sErrorMsg)) {
      this.iMsgBox = ObjectHelper.CreateObject(new iMessageBox(), {
        Title: 'LORENZO',
        Message: sErrorMsg,
        MessageButton: oMessageBoxButton,
        IconType: oMessageBoxType,
      });
      this.iMsgBox.Height = MsgBoxHeight;
      this.iMsgBox.Width = MsgBoxWidth;
      this.iMsgBox.MessageBoxClose = () => {
        targetHandler;
      };
      this.iMsgBox.Show();
    }
  }
  MultiRouteAlert_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
    Busyindicator.SetStatusIdle('MedChart');
    if (e.MessageBoxResult == MessageBoxResult.OK) {
      Busyindicator.SetStatusBusy('MedChart');
      if (String.IsNullOrEmpty(this.Validate())) {
        let oSlotHelper: SlotAdministrationHelper =
          new SlotAdministrationHelper();
        // oSlotHelper.WarningBeforeAdministrationCompletedEvent -= this.oSlotHelper_WarningBeforeAdministrationCompleted;
        oSlotHelper.WarningBeforeAdministrationCompletedEvent = (s, e) => {
          this.oSlotHelper_WarningBeforeAdministrationCompleted(s, e);
        };
        oSlotHelper.CheckDuplicateSlotWarningExists(
          this.oTagDrugHeaderDetail,
          this.oSlotDetail.PresScheduleOID,
          this.oSlotDetail.Status,
          this.oTagDrugHeaderDetail.IsPGD,
          LaunchAdminType.LaunchMultiSlot
        );
      }
    }
  }
  MultiRouteError_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
    Busyindicator.SetStatusIdle('MedChart');
    if (e.MessageBoxResult == MessageBoxResult.OK) {
    }
  }
  ShowErrorMessage_1(
    sErrorMsg: string,
    oMessageBoxButton: MessageBoxButton,
    oMessageBoxType: MessageBoxType
  ): void {
    if (!String.IsNullOrEmpty(sErrorMsg)) {
      this.iMsgBox = ObjectHelper.CreateObject(new iMessageBox(), {
        Title: 'LORENZO',
        Message: sErrorMsg,
        MessageButton: oMessageBoxButton,
        IconType: oMessageBoxType,
      });
      this.iMsgBox.MessageBoxClose = (s, e) => {
        this.iMsgBox_MessageBoxClose(s, e);
      };
      this.iMsgBox.Show();
    }
  }
  iMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
    Busyindicator.SetStatusIdle('MedChart');
    if (e.MessageBoxResult == MessageBoxResult.Yes) {
      // this.isErrorLaunched = false;
      // this.IsNextDueErrMsgExists = true;
      Busyindicator.SetStatusBusy('MedChart');
      let isCumulativeMsg: boolean =
        this.iMsgBox != null &&
        typeof this.iMsgBox.Tag === 'string' &&
        String.Compare(
          this.iMsgBox.Tag.ToString(),
          CConstants.CumulativeWarning
        ) == 0;
      if (isCumulativeMsg) this.IsCumulativeWarningAcknowledged = true;
      if (String.IsNullOrEmpty(this.Validate())) {
        let oSlotHelper: SlotAdministrationHelper =
          new SlotAdministrationHelper();
        // oSlotHelper.WarningBeforeAdministrationCompletedEvent -= this.oSlotHelper_WarningBeforeAdministrationCompleted;
        oSlotHelper.WarningBeforeAdministrationCompletedEvent = (s, e) => {
          this.oSlotHelper_WarningBeforeAdministrationCompleted(s, e);
        };
        oSlotHelper.CheckDuplicateSlotWarningExists(
          this.oTagDrugHeaderDetail,
          this.oSlotDetail.PresScheduleOID,
          this.oSlotDetail.Status,
          this.oTagDrugHeaderDetail.IsPGD,
          LaunchAdminType.LaunchMultiSlot
        );
      }
    } else {
      this.IsLessAdmOutErrorMsgExists = false;
      this.IsGrtAdmOutErrorMsgExists = false;
      this.IsNextDueErrMsgExists = false;
      this.IsTitratedDoseEmptyErrMsgExists = false;
      this.IsNextAdminSlotExists = false;
      this.IsNextDueSlotExists = false;
      this.ShowPatientSelfAdminMsg = false;
      // this.isErrorLaunched = false;
    }
  }
  ShowErrorMessage_2(
    sErrorMsg: string,
    oMessageBoxButton: MessageBoxButton,
    oMessageBoxType: MessageBoxType,
    MsgBoxTag: Object,
    MsgBoxHeight: number,
    MsgBoxWidth: number
  ): void {
    if (!String.IsNullOrEmpty(sErrorMsg)) {
      this.iMsgBox = ObjectHelper.CreateObject(new iMessageBox(), {
        Title: 'LORENZO',
        Message: sErrorMsg,
        MessageButton: oMessageBoxButton,
        IconType: oMessageBoxType,
      });
      this.iMsgBox.Tag = MsgBoxTag;
      this.iMsgBox.Height = MsgBoxHeight;
      this.iMsgBox.Width = MsgBoxWidth;
      this.iMsgBox.MessageBoxClose = (s, e) => {
        this.CumulativeWarning_MessageBoxClose(s, e);
      };
      this.iMsgBox.Show();
    }
  }
  CumulativeWarning_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
    Busyindicator.SetStatusIdle('MedChart');
    let isParacetamolGivenMsg: boolean =
      this.iMsgBox != null &&
      typeof this.iMsgBox.Tag === 'string' &&
      String.Compare(
        this.iMsgBox.Tag.ToString(),
        CConstants.ParacetamolRecentlyAdministered
      ) == 0;
    let isCumulativeMsg: boolean =
      this.iMsgBox != null &&
      typeof this.iMsgBox.Tag === 'string' &&
      String.Compare(
        this.iMsgBox.Tag.ToString(),
        CConstants.CumulativeWarning
      ) == 0;
    if (isCumulativeMsg) {
      this.IsCumulativeWarningAcknowledged = true;
    }
    if (e.MessageBoxResult == MessageBoxResult.Yes) {
      Busyindicator.SetStatusBusy('MedChart');
      if (
        isParacetamolGivenMsg &&
        this.oMedsAdminSlotVM.IsParacetamolIngredient &&
        this.oMedsAdminSlotVM.ParacetamolAdminCount > 3 &&
        (this.IsCumulativeWarningAcknowledged == null ||
          (this.IsCumulativeWarningAcknowledged.HasValue &&
            !this.IsCumulativeWarningAcknowledged.Value)) &&
        (String.Compare(
          this.sCurrentSlotStatus,
          SlotStatus.OVERDUE,
          StringComparison.CurrentCultureIgnoreCase
        ) == 0 ||
          String.Compare(
            this.sCurrentSlotStatus,
            SlotStatus.DEFEROVERDUE,
            StringComparison.CurrentCultureIgnoreCase
          ) == 0 ||
          String.Compare(
            this.sCurrentSlotStatus,
            SlotStatus.DUENOW,
            StringComparison.CurrentCultureIgnoreCase
          ) == 0 ||
          String.Compare(
            this.sCurrentSlotStatus,
            SlotStatus.DEFERDUENOW,
            StringComparison.CurrentCultureIgnoreCase
          ) == 0 ||
          String.Compare(
            this.sCurrentSlotStatus,
            SlotStatus.NOTYETRECORDED,
            StringComparison.CurrentCultureIgnoreCase
          ) == 0 ||
          String.Compare(
            this.sCurrentSlotStatus,
            SlotStatus.PLANNED,
            StringComparison.CurrentCultureIgnoreCase
          ) == 0 ||
          String.Compare(
            this.sCurrentSlotStatus,
            SlotStatus.HOMELEAVE,
            StringComparison.CurrentCultureIgnoreCase
          ) == 0)
      ) {
        let sErrorMsg: string = String.Format(
          MedsAdminChartToolTip.CumulativeWarningMsg,
          this.oMedsAdminSlotVM.ParacetamolAdminCount
        );
        this.ShowErrorMessage_2(
          sErrorMsg,
          MessageBoxButton.YesNo,
          MessageBoxType.Question,
          /*MsgBoxTag:*/ CConstants.CumulativeWarning,
          /*MsgBoxHeight:*/ 160,
          /*MsgBoxWidth:*/ 410
        );
        return;
      }
      if (String.IsNullOrEmpty(this.Validate())) {
        let oSlotHelper: SlotAdministrationHelper =
          new SlotAdministrationHelper();
        // oSlotHelper.WarningBeforeAdministrationCompletedEvent -= this.oSlotHelper_WarningBeforeAdministrationCompleted;
        oSlotHelper.WarningBeforeAdministrationCompletedEvent = (s, e) => {
          this.oSlotHelper_WarningBeforeAdministrationCompleted(s, e);
        };
        oSlotHelper.CheckDuplicateSlotWarningExists(
          this.oTagDrugHeaderDetail,
          this.oSlotDetail.PresScheduleOID,
          this.oSlotDetail.Status,
          this.oTagDrugHeaderDetail.IsPGD,
          LaunchAdminType.LaunchMultiSlot
        );
      }
    }
  }
  HomeLeavemsgbox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
    if (e.MessageBoxResult == MessageBoxResult.Yes) {
      let Tagobject: SlotDetailVM = ObjectHelper.CreateType<SlotDetailVM>(
        this.iMsgBox.Tag,
        SlotDetailVM
      );
      this.SlotClick(Tagobject);
    }
  }
  grdMultiSlot_onCellClick(
    sender: Object,
    args: GridViewCellClickEventArgs
  ): void {
    if (this.grdMultiSlot.GetColumnIndexByName('Status') == args.ColumnIndex) {
      this.oSlotDetail = ObjectHelper.CreateType<SlotDetailVM>(
        this.grdMultiSlot.GetRowData(args.RowIndex),
        SlotDetailVM
      );
      this.oSlotDetail.oMedsAdminMultiSlot = this;
      if (this.oSlotDetail.IsIconClick) {
        this.oSlotDetail.IsIconClick = false;
        return;
      }
      if (
        String.Compare(
          MedChartData.ChartStatus,
          CConstants.sChartSuspendedStatusCode,
          StringComparison.CurrentCultureIgnoreCase
        ) == 0 &&
        !String.Equals(
          this.oSlotDetail.Status,
          SlotStatus.GIVEN,
          StringComparison.InvariantCultureIgnoreCase
        ) &&
        !String.Equals(
          this.oSlotDetail.Status,
          SlotStatus.NOTGIVEN,
          StringComparison.InvariantCultureIgnoreCase
        ) &&
        !String.Equals(
          this.oSlotDetail.Status,
          SlotStatus.SELFADMINISTERED,
          StringComparison.InvariantCultureIgnoreCase
        ) &&
        !String.Equals(
          this.oSlotDetail.Status,
          SlotStatus.NOTKNOWN,
          StringComparison.InvariantCultureIgnoreCase
        ) &&
        !String.Equals(
          this.oSlotDetail.Status,
          SlotStatus.DEFEROVERDUE,
          StringComparison.InvariantCultureIgnoreCase
        ) &&
        !String.Equals(
          this.oSlotDetail.Status,
          SlotStatus.DEFERDUENOW,
          StringComparison.InvariantCultureIgnoreCase
        ) &&
        !String.Equals(
          this.oSlotDetail.Status,
          SlotStatus.DEFERADMIN,
          StringComparison.InvariantCultureIgnoreCase
        ) &&
        !Common.IsRetrospectiveSlot(
          this.oSlotDetail.ScheduledDTTM,
          this.oSlotDetail.Status
        ) &&
        this.oSlotDetail.Status != SlotStatus.OMITTED
      ) {
        if (this.CheckIsSlotOutside(this.oSlotDetail)) {
          this.iMsgBox = new iMessageBox();
          this.iMsgBox.Title = 'Lorenzo';
          this.iMsgBox.MessageButton = MessageBoxButton.YesNo;
          this.iMsgBox.IconType = MessageBoxType.Question;
          this.iMsgBox.Tag = this.oSlotDetail;
          this.iMsgBox.MessageBoxClose = this.HomeLeavemsgbox_MessageBoxClose;
          this.iMsgBox.MessageBoxClose = (s, e) => {
            this.HomeLeavemsgbox_MessageBoxClose(s, e);
          };
          this.iMsgBox.Message = MedicationChart.HomeLeaveMsg;
          this.iMsgBox.Show();
        }
      } else {
        this.SlotClick(this.oSlotDetail);
      }
    }
  }
  CheckIsSlotOutside(oSlotDetail: SlotDetailVM): boolean {
    let dtSlotDateTime: DateTime = DateTime.MinValue;
    dtSlotDateTime = oSlotDetail.ScheduledDTTM;
    if (
      (String.Equals(
        oSlotDetail.Status,
        SlotStatus.PLANNED,
        StringComparison.CurrentCultureIgnoreCase
      ) ||
        String.Equals(
          oSlotDetail.Status,
          SlotStatus.PATIENTSELFADMIN,
          StringComparison.CurrentCultureIgnoreCase
        )) &&
      (DateTime.NotEquals(dtSlotDateTime , DateTime.MinValue)) &&
      MedChartData.AdvDurationForRecording > 0
    ) {
      let TimeDifference: number = Convert.ToInt32(
        dtSlotDateTime.Subtract(this.dtCurrentDateTime).TotalMinutes
      );
      if (TimeDifference > MedChartData.AdvDurationForRecording) {
        let sErrorMsg: string = String.Empty;
        sErrorMsg =
          'The slot selected for ' +
          this.oMedsAdminSlotVM.DrugDetail.Drugname +
          ' is outside the administration time allowed.';
        this.ShowErrorMessage_1(
          sErrorMsg,
          MessageBoxButton.OK,
          MessageBoxType.Critical
        );
        return false;
      }
    }
    return true;
  }
  private SlotClick(oSlotDetail: SlotDetailVM): void {
    // Busyindicator.SetStatusBusy('MedChart');
    this.ShowPatientSelfAdminMsg = false;
    this.sCurrentSlotStatus = String.Empty;
    this.IsParacetamolWarningMsgShown = -1;
    this.IsCumulativeWarningAcknowledged = null;
    if (oSlotDetail instanceof SlotDetailVM) {
      if (oSlotDetail.IsIconClick) {
        oSlotDetail.IsIconClick = false;
        return;
      }
      this.sCurrentSlotStatus = oSlotDetail.Status;
      this.sCurrentSchDTTM = oSlotDetail.ScheduledDTTM;
      if (
        String.Compare(
          this.sCurrentSlotStatus,
          SlotStatus.OMITTED,
          StringComparison.CurrentCultureIgnoreCase
        ) == 0
      ) {
        Busyindicator.SetStatusIdle('MedChart');
        return;
      }
      if (
        oSlotDetail != null &&
        oSlotDetail.MultiRoute_Type == MultiRouteType.Mixed_Routes
      ) {
        if (
          oSlotDetail.AdministrationDetail != null &&
          oSlotDetail.AdministrationDetail.IsAdministeredOnInfusionChart ==
          true &&
          (String.Equals(
            oSlotDetail.Status,
            SlotStatus.COMPLETED,
            StringComparison.CurrentCultureIgnoreCase
          ) ||
            String.Equals(
              oSlotDetail.Status,
              SlotStatus.INPROGRESS,
              StringComparison.CurrentCultureIgnoreCase
            ) ||
            String.Equals(
              oSlotDetail.Status,
              SlotStatus.PAUSED,
              StringComparison.CurrentCultureIgnoreCase
            ) ||
            String.Equals(
              oSlotDetail.Status,
              SlotStatus.STOPPED,
              StringComparison.CurrentCultureIgnoreCase
            ))
        ) {
          Busyindicator.SetStatusIdle('MedChart');
          return;
        }
      }
      let NextHomeLeaveSlotExists = this.oMedsAdminSlotVM.MultiSlot.Where(
        (x) =>
          x.ScheduledDTTM > oSlotDetail.ScheduledDTTM &&
          String.Equals(
            x.Status,
            SlotStatus.HOMELEAVE,
            StringComparison.InvariantCultureIgnoreCase
          )
      );
      let NextadministeredSlotExists = this.oMedsAdminSlotVM.MultiSlot.Where(
        (x) =>
          x.ScheduledDTTM > oSlotDetail.ScheduledDTTM &&
          (x.Status.Equals(SlotStatus.DEFERADMIN) ||
            x.Status.Equals(SlotStatus.DEFERDUENOW) ||
            x.Status.Equals(SlotStatus.DEFEROVERDUE) ||
            x.Status.Equals(SlotStatus.SELFADMINISTERED) ||
            x.Status.Equals(SlotStatus.PATIENTSELFADMIN) ||
            x.Status.Equals(SlotStatus.GIVEN) ||
            x.Status.Equals(SlotStatus.NOTGIVEN) ||
            x.Status.Equals(SlotStatus.NOTKNOWN))
      );
      if (
        (NextHomeLeaveSlotExists != null &&
          NextHomeLeaveSlotExists.Count() > 0) ||
        (NextadministeredSlotExists != null &&
          NextadministeredSlotExists.Count() > 0) ||
        oSlotDetail.IsNextSlotMultiSlotAdmin
      ) {
        oSlotDetail.IsNextHomeLeaveSlotExists = true;
      }
      if (String.IsNullOrEmpty(this.Validate())) {
        let oSlotHelper: SlotAdministrationHelper =
          new SlotAdministrationHelper();
        // oSlotHelper.WarningBeforeAdministrationCompletedEvent -= this.oSlotHelper_WarningBeforeAdministrationCompleted;
        oSlotHelper.WarningBeforeAdministrationCompletedEvent = (s, e) => {
          this.oSlotHelper_WarningBeforeAdministrationCompleted(s, e);
        };
        oSlotHelper.CheckDuplicateSlotWarningExists(
          this.oTagDrugHeaderDetail,
          oSlotDetail.PresScheduleOID,
          oSlotDetail.Status,
          this.oTagDrugHeaderDetail.IsPGD,
          LaunchAdminType.LaunchMultiSlot
        );
      }
    }
  }
  oSlotHelper_TriggerParacetamolWarningEvent(
    bParacetamolAdministered: boolean
  ): void {
    Busyindicator.SetStatusIdle('CheckParaAdministered');
    if (bParacetamolAdministered) {
      this.ShowErrorMessage_2(
        Resource.MedicationAdministrator.ParacetamolAdministration_WarningMsg,
        MessageBoxButton.YesNo,
        MessageBoxType.Question,
        /*MsgBoxTag:*/ CConstants.ParacetamolRecentlyAdministered,
        /*MsgBoxHeight:*/ 180,
        /*MsgBoxWidth:*/ 420
      );
      this.oSlotDetail.IsAnyParacetamolAdministeredInGivenPeriod =
        bParacetamolAdministered;
    } else {
      if (
        this.oMedsAdminSlotVM.IsParacetamolIngredient &&
        this.oMedsAdminSlotVM.ParacetamolAdminCount > 3 &&
        (this.IsCumulativeWarningAcknowledged == null ||
          (this.IsCumulativeWarningAcknowledged.HasValue &&
            !this.IsCumulativeWarningAcknowledged.Value)) &&
        (String.Compare(
          this.sCurrentSlotStatus,
          SlotStatus.OVERDUE,
          StringComparison.CurrentCultureIgnoreCase
        ) == 0 ||
          String.Compare(
            this.sCurrentSlotStatus,
            SlotStatus.DEFEROVERDUE,
            StringComparison.CurrentCultureIgnoreCase
          ) == 0 ||
          String.Compare(
            this.sCurrentSlotStatus,
            SlotStatus.DUENOW,
            StringComparison.CurrentCultureIgnoreCase
          ) == 0 ||
          String.Compare(
            this.sCurrentSlotStatus,
            SlotStatus.DEFERDUENOW,
            StringComparison.CurrentCultureIgnoreCase
          ) == 0 ||
          String.Compare(
            this.sCurrentSlotStatus,
            SlotStatus.NOTYETRECORDED,
            StringComparison.CurrentCultureIgnoreCase
          ) == 0 ||
          String.Compare(
            this.sCurrentSlotStatus,
            SlotStatus.PLANNED,
            StringComparison.CurrentCultureIgnoreCase
          ) == 0 ||
          String.Compare(
            this.sCurrentSlotStatus,
            SlotStatus.HOMELEAVE,
            StringComparison.CurrentCultureIgnoreCase
          ) == 0)
      ) {
        let sErrorMsg: string = String.Format(
          MedsAdminChartToolTip.CumulativeWarningMsg,
          this.oMedsAdminSlotVM.ParacetamolAdminCount
        );
        this.ShowErrorMessage_2(
          sErrorMsg,
          MessageBoxButton.YesNo,
          MessageBoxType.Question,
          /*MsgBoxTag:*/ CConstants.CumulativeWarning,
          /*MsgBoxHeight:*/ 160,
          /*MsgBoxWidth:*/ 410
        );
      } else {
        if (this.iMsgBox == null) {
          this.iMsgBox = new iMessageBox();
        }
        this.iMsgBox.Tag = CConstants.ParacetamolRecentlyAdministered;
        this.CumulativeWarning_MessageBoxClose(
          null,
          new MessageEventArgs(MessageBoxResult.Yes)
        );
      }
    }
  }
  oSlotHelper_WarningBeforeAdministrationCompleted(
    IsPGD: boolean,
    eWhatToLaunch: LaunchAdminType
  ): void {
    // if (!this.isErrorLaunched) {
      switch (eWhatToLaunch) {
        case LaunchAdminType.LaunchMultiSlot:
          this.LaunchAdministration(this.oSlotDetail);
          break;
      }
    // }
  }
  private Validate(): string {
    let sErrorMsg: string = String.Empty;
    let sDrugName: string = this.oMedsAdminSlotVM.DrugDetail.Drugname;
    let sDoseType: string = this.oMedsAdminSlotVM.DrugDetail.Dose;
    let dtCurrentDateTime: DateTime = CommonBB.GetServerDateTime();
    let dtSlotDateTime: DateTime = DateTime.MinValue;
    if (!UserPermissions.CanManageMedAdministration) {
      sErrorMsg = Resource.MedsAdminChartOverview.CanManageMedAdministration;
      this.ShowErrorMessage_1(
        sErrorMsg,
        MessageBoxButton.OK,
        MessageBoxType.Critical
      );
      return sErrorMsg;
    }
    if (!String.IsNullOrEmpty(this.oSlotDetail.Status)) {
      this.sCurrentSlotStatus = this.oSlotDetail.Status;
    }
    if (DateTime.NotEquals(this.oSlotDetail.ScheduledDTTM , DateTime.MinValue)) {
      dtSlotDateTime = this.oSlotDetail.ScheduledDTTM;
    }
    if (this.IsPreviousActiveSeqItem) {
      sErrorMsg = String.Empty;
      sErrorMsg = String.Format(
        Resource.InfusionChart.PreviousContSeqInProgress,
        this.oTagDrugHeaderDetail.DrugName
      );
      this.ShowErrorMessage_1(
        sErrorMsg,
        MessageBoxButton.OK,
        MessageBoxType.Critical
      );
      return sErrorMsg;
    }
    if (
      (String.Compare(
        this.sCurrentSlotStatus,
        SlotStatus.PLANNED,
        StringComparison.CurrentCultureIgnoreCase
      ) == 0 ||
        String.Equals(
          this.sCurrentSlotStatus,
          SlotStatus.PATIENTSELFADMIN,
          StringComparison.CurrentCultureIgnoreCase
        )) &&
      DateTime.NotEquals(dtSlotDateTime , DateTime.MinValue) &&
      MedChartData.AdvDurationForRecording > 0
    ) {
      let TimeDifference: number = Convert.ToInt32(
        dtSlotDateTime.Subtract(dtCurrentDateTime).TotalMinutes
      );
      if (
        !this.IsLessAdmOutErrorMsgExists &&
        TimeDifference <= MedChartData.AdvDurationForRecording
      ) {
        this.IsLessAdmOutErrorMsgExists = true;
        sErrorMsg =
          'The slot selected for ' +
          sDrugName +
          ' is outside the administration time allowed. Do you wish to continue?';
        this.ShowErrorMessage_1(
          sErrorMsg,
          MessageBoxButton.YesNo,
          MessageBoxType.Question
        );
        return sErrorMsg;
      }
      if (
        !this.IsGrtAdmOutErrorMsgExists &&
        TimeDifference > MedChartData.AdvDurationForRecording
      ) {
        this.IsGrtAdmOutErrorMsgExists = true;
        sErrorMsg =
          'The slot selected for ' +
          sDrugName +
          ' is outside the administration time allowed.';
        this.ShowErrorMessage_1(
          sErrorMsg,
          MessageBoxButton.OK,
          MessageBoxType.Critical
        );
        return sErrorMsg;
      }
    }
    let nTotalCount: number =
      this.oMedsAdminSlotVM.MultiSlot != null
        ? this.oMedsAdminSlotVM.MultiSlot.Count
        : 0;
    if (nTotalCount > 0) {
      this.IsNextAdminSlotExists = false;
      for (let i: number = 0; i < nTotalCount; i++) {
        if (
         DateTime.GreaterThan(this.oMedsAdminSlotVM.MultiSlot[i].ScheduledDTTM ,
          this.sCurrentSchDTTM)
        ) {
          if (
            String.Compare(
              this.oMedsAdminSlotVM.MultiSlot[i].Status,
              SlotStatus.GIVEN
            ) == 0 ||
            String.Compare(
              this.oMedsAdminSlotVM.MultiSlot[i].Status,
              SlotStatus.NOTGIVEN
            ) == 0 ||
            String.Compare(
              this.oMedsAdminSlotVM.MultiSlot[i].Status,
              SlotStatus.SELFADMINISTERED
            ) == 0 ||
            String.Compare(
              this.oMedsAdminSlotVM.MultiSlot[i].Status,
              SlotStatus.NOTKNOWN
            ) == 0
          ) {
            this.IsNextAdminSlotExists = true;
            break;
          }
        }
      }
    }
    if (
      nTotalCount > 0 &&
      (String.Compare(this.sCurrentSlotStatus, SlotStatus.OVERDUE) == 0 ||
        String.Compare(this.sCurrentSlotStatus, SlotStatus.DEFEROVERDUE) == 0 ||
        String.Compare(this.sCurrentSlotStatus, SlotStatus.NOTYETRECORDED) == 0)
    ) {
      this.IsNextDueSlotExists = false;
      for (let i: number = 0; i < nTotalCount; i++) {
        if (
          DateTime.GreaterThan(this.oMedsAdminSlotVM.MultiSlot[i].ScheduledDTTM ,
          this.sCurrentSchDTTM)
        ) {
          if (
            String.Compare(
              this.oMedsAdminSlotVM.MultiSlot[i].Status,
              SlotStatus.DUENOW
            ) == 0 ||
            String.Compare(
              this.oMedsAdminSlotVM.MultiSlot[i].Status,
              SlotStatus.OVERDUE
            ) == 0 ||
            String.Compare(
              this.oMedsAdminSlotVM.MultiSlot[i].Status,
              SlotStatus.DEFERDUENOW
            ) == 0 ||
            String.Compare(
              this.oMedsAdminSlotVM.MultiSlot[i].Status,
              SlotStatus.DEFEROVERDUE
            ) == 0 ||
            String.Compare(
              this.oMedsAdminSlotVM.MultiSlot[i].Status,
              SlotStatus.NOTYETRECORDED
            ) == 0
          ) {
            this.IsNextDueSlotExists = true;
            break;
          }
        }
      }
      if (!this.IsNextDueErrMsgExists && this.IsNextDueSlotExists) {
        this.IsNextDueErrMsgExists = true;
        sErrorMsg =
          MedsAdminChartToolTip.OverDueMsgText +" "+
          sDrugName +
          MedsAdminChartToolTip.ContinueAdminText;
        this.ShowErrorMessage_1(
          sErrorMsg,
          MessageBoxButton.YesNo,
          MessageBoxType.Question
        );
        // this.isErrorLaunched = true;
        return sErrorMsg;
      }
    }
    if (
      this.oMedsAdminSlotVM.IsParacetamolIngredient &&
      this.oSlotDetail != null &&
      (DateTime.NotEquals(this.oSlotDetail.ScheduledDTTM , DateTime.MinValue)) &&
      this.IsParacetamolWarningMsgShown == -1 &&
      (String.Compare(
        this.oSlotDetail.Status,
        SlotStatus.PLANNED,
        StringComparison.CurrentCultureIgnoreCase
      ) == 0 ||
        String.Compare(
          this.oSlotDetail.Status,
          SlotStatus.OVERDUE,
          StringComparison.CurrentCultureIgnoreCase
        ) == 0 ||
        String.Compare(
          this.oSlotDetail.Status,
          SlotStatus.DUENOW,
          StringComparison.CurrentCultureIgnoreCase
        ) == 0 ||
        String.Compare(
          this.oSlotDetail.Status,
          SlotStatus.DEFERDUENOW,
          StringComparison.CurrentCultureIgnoreCase
        ) == 0 ||
        String.Compare(
          this.oSlotDetail.Status,
          SlotStatus.DEFEROVERDUE,
          StringComparison.CurrentCultureIgnoreCase
        ) == 0 ||
        String.Compare(
          this.oSlotDetail.Status,
          SlotStatus.PATIENTSELFADMIN,
          StringComparison.CurrentCultureIgnoreCase
        ) == 0 ||
        String.Compare(
          this.oSlotDetail.Status,
          SlotStatus.HOMELEAVE,
          StringComparison.CurrentCultureIgnoreCase
        ) == 0 ||
        String.Compare(
          this.oSlotDetail.Status,
          SlotStatus.NOTYETRECORDED,
          StringComparison.CurrentCultureIgnoreCase
        ) == 0)
    ) {
      let oSlotHelper: SlotAdministrationHelper =
        new SlotAdministrationHelper();
      oSlotHelper.TriggerParacetamolWarningEvent =
        this.oSlotHelper_TriggerParacetamolWarningEvent;
      oSlotHelper.TriggerParacetamolWarningEvent = (s) => {
        this.oSlotHelper_TriggerParacetamolWarningEvent(s);
      };
      oSlotHelper.IsAnyParacetamolAdministered(
        CommonBB.GetServerDateTime(),
        this.oSlotDetail.PresScheduleOID
      );
      Busyindicator.SetStatusBusy('CheckParaAdministered');
      this.IsParacetamolWarningMsgShown = 0;
      return 'CheckParaAdministered';
    } else if (
      this.oMedsAdminSlotVM.IsParacetamolIngredient &&
      this.oMedsAdminSlotVM.ParacetamolAdminCount > 3 &&
      (this.IsCumulativeWarningAcknowledged == null ||
        (this.IsCumulativeWarningAcknowledged.HasValue &&
          !this.IsCumulativeWarningAcknowledged.Value)) &&
      (String.Compare(
        this.sCurrentSlotStatus,
        SlotStatus.OVERDUE,
        StringComparison.CurrentCultureIgnoreCase
      ) == 0 ||
        String.Compare(
          this.sCurrentSlotStatus,
          SlotStatus.DEFEROVERDUE,
          StringComparison.CurrentCultureIgnoreCase
        ) == 0 ||
        String.Compare(
          this.sCurrentSlotStatus,
          SlotStatus.DUENOW,
          StringComparison.CurrentCultureIgnoreCase
        ) == 0 ||
        String.Compare(
          this.sCurrentSlotStatus,
          SlotStatus.DEFERDUENOW,
          StringComparison.CurrentCultureIgnoreCase
        ) == 0 ||
        String.Compare(
          this.sCurrentSlotStatus,
          SlotStatus.NOTYETRECORDED,
          StringComparison.CurrentCultureIgnoreCase
        ) == 0 ||
        String.Compare(
          this.sCurrentSlotStatus,
          SlotStatus.PLANNED,
          StringComparison.CurrentCultureIgnoreCase
        ) == 0 ||
        String.Compare(
          this.sCurrentSlotStatus,
          SlotStatus.HOMELEAVE,
          StringComparison.CurrentCultureIgnoreCase
        ) == 0)
    ) {
      this.IsCumulativeWarningAcknowledged = false;
      sErrorMsg = String.Format(
        MedsAdminChartToolTip.CumulativeWarningMsg,
        this.oMedsAdminSlotVM.ParacetamolAdminCount
      );
      this.ShowErrorMessage_2(
        sErrorMsg,
        MessageBoxButton.YesNo,
        MessageBoxType.Question,
        /*MsgBoxTag:*/ CConstants.CumulativeWarning,
        /*MsgBoxHeight:*/ 160,
        /*MsgBoxWidth:*/ 410
      );
      return sErrorMsg;
    }
    if (
      !this.IsTitratedDoseEmptyErrMsgExists &&
      String.Compare(
        sDoseType,
        'Titrated',
        StringComparison.CurrentCultureIgnoreCase
      ) == 0 &&
      (String.IsNullOrEmpty(this.oSlotDetail.Dose) ||
        String.Compare(
          this.oSlotDetail.Dose,
          '0',
          StringComparison.CurrentCultureIgnoreCase
        ) == 0 ||
        String.Compare(
          this.oSlotDetail.Dose,
          CConstants.DoseTBD,
          StringComparison.CurrentCultureIgnoreCase
        ) == 0) &&
      (String.Compare(
        this.sCurrentSlotStatus,
        SlotStatus.OVERDUE,
        StringComparison.CurrentCultureIgnoreCase
      ) == 0 ||
        String.Compare(
          this.sCurrentSlotStatus,
          SlotStatus.DUENOW,
          StringComparison.CurrentCultureIgnoreCase
        ) == 0 ||
        String.Compare(
          this.sCurrentSlotStatus,
          SlotStatus.PLANNED,
          StringComparison.CurrentCultureIgnoreCase
        ) == 0 ||
        String.Compare(
          this.sCurrentSlotStatus,
          SlotStatus.NOTYETRECORDED,
          StringComparison.CurrentCultureIgnoreCase
        ) == 0)
    ) {
      this.IsTitratedDoseEmptyErrMsgExists = true;
      sErrorMsg = MedsAdminChartToolTip.TitratedDoseEmptyErrMsg;
      this.ShowErrorMessage_1(
        sErrorMsg,
        MessageBoxButton.YesNo,
        MessageBoxType.Question
      );
      return sErrorMsg;
    }
    if (!this.ValidateMultiRouteItem()) return MedsAdminChartToolTip.MultiRoute;
    if (
      !this.ShowPatientSelfAdminMsg &&
      String.Compare(this.oSlotDetail.Status, SlotStatus.PATIENTSELFADMIN) == 0
    ) {
      this.ShowPatientSelfAdminMsg = true;
      sErrorMsg = MedsAdminChartToolTip.SelfAdministeredErrorMsg;
      this.ShowErrorMessage_1(
        sErrorMsg,
        MessageBoxButton.YesNo,
        MessageBoxType.Question
      );
      return sErrorMsg;
    }
    return sErrorMsg;
  }
  public FillModifyAdminDetails(): void {

    // this.oDrugHeader = ObjectHelper.CreateType<CDrugHeader>(
    //   this.drgHeader.DataContext,
    //   CDrugHeader
    // );
    
    this.oDrugHeader.oDrugHdrAddnlInfo = new CDrugHdrAddnlInfo();
    this.oDrugHeader.oDrugHdrAddnlInfo.SteppedDoseUOM =
      this.oSlotDetail.DoseUOM;
    this.oDrugHeader.oDrugHdrAddnlInfo.SteppedLowerDose =
      this.oSlotDetail.LDose;
    this.oDrugHeader.oDrugHdrAddnlInfo.SteppedUpperDose =
      this.oSlotDetail.UDose;
    this.oSlotDetail.PrescriptionItemOID = Number.Parse(
      this.oSlotDetail.DrugDetail.Key
    );
    this.oTagDrugHeaderDetail = <TagDrugHeaderDetail>(
      this.oSlotDetail.DrugDetail.Tag
    );
    this.oSlotDetail.IsNextDueSlotExists = this.IsNextDueSlotExists;
    this.oSlotDetail.IsNextAdminSlotExists = this.IsNextAdminSlotExists;
    if (this.oTagDrugHeaderDetail != null) {
      this.oSlotDetail.DoseType = !String.IsNullOrEmpty(
        this.oTagDrugHeaderDetail.DoseType
      )
        ? this.oTagDrugHeaderDetail.DoseType
        : String.Empty;
    }
    if (
      this.oMedsAdminSlotVM != null &&
      this.oMedsAdminSlotVM.PrescriptionItemStatus != null
    )
      this.oSlotDetail.PrescriptionItemStatus =
        this.oMedsAdminSlotVM.PrescriptionItemStatus;
    else
      this.oSlotDetail.PrescriptionItemStatus =
        this.oTagDrugHeaderDetail.PrescriptionItemStatus;
    this.oSlotDetail.PrescriptionEndDate = this.oTagDrugHeaderDetail.EndDate;
    this.oSlotDetail.FreqPerodCode = this.oTagDrugHeaderDetail.FreqPerodcode;
  }
  LaunchAdministration(oSlotDetail: SlotDetailVM): void {
    if (oSlotDetail != null) {
      oSlotDetail.ModifyStrikeThroughClosedCompleted =(s,e)=>{this.oSlotDetail_ModifyStrikeThroughClosedCompleted(s);};

    }
    if (!oSlotDetail.CheckValidation()) return;
    let sSlotStatus: string = String.Empty;
    this.FillModifyAdminDetails();
    oSlotDetail.IsConditionalExists =
      this.oTagDrugHeaderDetail.IsConditionalExists;
    if (
      String.Compare(
        oSlotDetail.Status,
        SlotStatus.PLANNED,
        StringComparison.CurrentCultureIgnoreCase
      ) == 0 ||
      String.Compare(
        oSlotDetail.Status,
        SlotStatus.OVERDUE,
        StringComparison.CurrentCultureIgnoreCase
      ) == 0 ||
      String.Compare(
        oSlotDetail.Status,
        SlotStatus.DUENOW,
        StringComparison.CurrentCultureIgnoreCase
      ) == 0 ||
      String.Compare(
        oSlotDetail.Status,
        SlotStatus.DEFERDUENOW,
        StringComparison.CurrentCultureIgnoreCase
      ) == 0 ||
      String.Compare(
        oSlotDetail.Status,
        SlotStatus.DEFEROVERDUE,
        StringComparison.CurrentCultureIgnoreCase
      ) == 0 ||
      String.Compare(
        oSlotDetail.Status,
        SlotStatus.PATIENTSELFADMIN,
        StringComparison.CurrentCultureIgnoreCase
      ) == 0 ||
      String.Compare(
        oSlotDetail.Status,
        SlotStatus.HOMELEAVE,
        StringComparison.CurrentCultureIgnoreCase
      ) == 0 ||
      String.Compare(
        oSlotDetail.Status,
        SlotStatus.NOTYETRECORDED,
        StringComparison.CurrentCultureIgnoreCase
      ) == 0
    ) {
      oSlotDetail.CACode = MedAction.RecordAdministration;
      this.IsLastSlotExist(oSlotDetail);
      this.sPrevStatus = oSlotDetail.Status;
      // this.oDrugHeader.oDrugHdrAddnlInfo.DueAt = oSlotDetail.ScheduledDTTM.ConvertToUser(this.IsDST, this.IsAmbiguous, this.IsInvalid).ToDateTimeString(this.IsDST, this.IsAmbiguous, CConstants.DateTimeFormat);
      // this.oDrugHeader.oDrugHdrAddnlInfo.DueAt =
      //     oSlotDetail.ScheduledDTTM.ConvertToUser(
      //         (o1) => {
      //             this.IsDST = o1;
      //         },
      //         (o2) => {
      //             this.IsAmbiguous = o2;
      //         },
      //         (o3) => {
      //             this.IsInvalid = o3;
      //         },
      //         // this.IsInvalid
      //     ).ToDateTimeString(
      //         this.IsDST,
      //         (o2) => {
      //             this.IsAmbiguous = o2;

      //         },
      //         CConstants.DateTimeFormat
      //     );
      this.oDrugHeader.oDrugHdrAddnlInfo.DueAt =
        oSlotDetail.ScheduledDTTM.ConvertToUser(
          (o1) => {
            this.IsDST = o1;
          },
          (o2) => {
            this.IsAmbiguous = o2;
          },
          (o3) => {
            this.IsInvalid = o3;
          }
        ).ToDateTimeString(
          this.IsDST,
          this.IsAmbiguous,
          CConstants.DateTimeFormat
        );

      // .ToDateTimeString(
      //     this.IsDST,
      //     (o2) => {
      //         this.IsAmbiguous = o2;
      //     },
      //     CConstants.DateTimeFormat
      // );
      if (DateTime.NotEquals(this.oTagDrugHeaderDetail.ReviewDTTM , DateTime.MinValue)) {
        this.oDrugHeader.oDrugHdrAddnlInfo.ReviewAt =
          this.oTagDrugHeaderDetail.ReviewDTTM.ToUserDateTimeString(
            CConstants.DateTimeFormat
          );
        if (
          DateTime.LessThanOrEqualTo(this.oTagDrugHeaderDetail.ReviewDTTM.Date ,
          CommonBB.GetServerDateTime().Date
        )) {
          this.oDrugHeader.oDrugHdrAddnlInfo.ReviewAtVisibility =
            Visibility.Visible;
          this.oDrugHeader.oDrugHdrAddnlInfo.ReviewIconTooltip =
            Common.GetReviewIconTooltip(
              this.oTagDrugHeaderDetail.ReviewType,
              this.oTagDrugHeaderDetail.ReviewDTTM,
              this.oTagDrugHeaderDetail.ReviewRequestedComments,
              this.oTagDrugHeaderDetail.ReviewRequestedby
            );
        }
      }
      oSlotDetail.IdentifyingOID = this.oTagDrugHeaderDetail.DrugIdentifyingOID;
      oSlotDetail.IdentifyingType =
        this.oTagDrugHeaderDetail.DrugIdentifyingType;
      oSlotDetail.MCVersionNo = this.oTagDrugHeaderDetail.MCVersionNo;
      oSlotDetail.AdminMethod = this.oTagDrugHeaderDetail.AdminMethod;
      oSlotDetail.RouteOID = this.oTagDrugHeaderDetail.RouteOID;
      oSlotDetail.IsControlledDrug = this.oTagDrugHeaderDetail.IsControlDrug;
      oSlotDetail.IsFluidControlledDrug =
        this.oTagDrugHeaderDetail.IsFluidControlDrug;
      oSlotDetail.LorenzoID = this.oTagDrugHeaderDetail.LorenzoID;
      oSlotDetail.PrescriptionStartDate = this.oTagDrugHeaderDetail.StartDate;
      oSlotDetail.DoseType = this.oTagDrugHeaderDetail.DoseType;
      oSlotDetail.SlotsTimeIntervalAvg =
        this.oTagDrugHeaderDetail.SlotsTimeIntervalAvg;
      oSlotDetail.IsLastPRN = this.oMedsAdminSlotVM.IsPRN;
      let oSlotHelper: SlotAdministrationHelper =
        new SlotAdministrationHelper();
      oSlotHelper.LaunchRecordAdminEvent = (s) => {
        this.oSlotHelper_LaunchRecordAdminEvent(s);
      };
      oSlotHelper.GetSlotDetails(oSlotDetail);
    } else {
      oSlotDetail.LaunchModifyAdmin(
        this.sPrevStatus,
        this.oDrugHeader,
        this.oTagDrugHeaderDetail,
        this.oMedsAdminSlotVM,
        this.oMAModorST,
        this.bDataContext,
        this.oTempMedsAdminMultiSlotVM
      );
    }
  }
  oSlotDetail_ModifyStrikeThroughClosedCompleted(s): void {
    this.oMAModorST = s;
    this.ModifyStrikeThroughClosed();
  }
  public _oMedsAdmin_OnSubmitModAdminEvent = (s, e) => { this.oMedsAdmin_OnSubmitModAdminEvent(); };
  public oMedsAdmin_OnSubmitModAdminEvent(): void {
    Busyindicator.SetStatusIdle('MedChart');
    Busyindicator.SetStatusIdle('Administration');
    this.ModifyStrikeThroughClosed();
  }
  ModifyStrikeThroughClosed(): void {
    this.IsRecordAmin = false;
    this.UpdateGridData();
    if (
      this.oMedsAdminSlotVM != null &&
      !this.oMedsAdminSlotVM.IsReloadChartRequired
    ) {
      this.oMedsAdminSlotVM.IsReloadChartRequired = this.oMAModorST.oSlotVM.IsReloadChartRequired;
      if (this.oMAModorST.oSlotVM.IsReloadChartRequired)
        this.oMedsAdminSlotVM.PrescriptionItemStatus = this.oMAModorST.oSlotVM.CurrentPrescriptionItemStatus;
    }
  }
  public IsLastSlotExist(oSlotDet: SlotDetailVM): void {
    oSlotDet.IsLastSlotCheckRequired = false;
    oSlotDet.IsUpdatePIStatusToCompleted = false;
    if (DateTime.NotEquals(oSlotDet.PrescriptionEndDate , DateTime.MinValue)) {
      if (oSlotDet.CACode == MedAction.RecordAdministration) {
        if (
          !String.Equals(
            oSlotDet.PrescriptionItemStatus,
            CConstants.DISCONTINUED,
            StringComparison.CurrentCultureIgnoreCase
          ) &&
          !String.Equals(
            oSlotDet.PrescriptionItemStatus,
            CConstants.COMPLETED,
            StringComparison.CurrentCultureIgnoreCase
          )
        ) {
          if (oSlotDet.FreqPerodCode == CConstants.OnceOnlyPerodCode) {
            oSlotDet.IsLastSlotCheckRequired = false;
            oSlotDet.IsUpdatePIStatusToCompleted = true;
          } else if (
            String.Equals(
              oSlotDet.FreqPerodCode,
              CConstants.sWeeklyFreqUOMCode,
              StringComparison.InvariantCultureIgnoreCase
            ) ||
            String.Equals(
              oSlotDet.FreqPerodCode,
              CConstants.sMonthFreqUOMCode,
              StringComparison.InvariantCultureIgnoreCase
            ) ||
            String.Equals(
              oSlotDet.FreqPerodCode,
              CConstants.sYearsFreqUOMCode,
              StringComparison.InvariantCultureIgnoreCase
            )
          ) {
            oSlotDet.IsUpdatePIStatusToCompleted = true;
            oSlotDet.IsLastSlotCheckRequired = true;
          } else {
            if (oSlotDet.IsLastSlotinCurrentView == true) {
              oSlotDet.IsUpdatePIStatusToCompleted = true;
              oSlotDet.IsLastSlotCheckRequired = true;
            } else {
              var AllSlots = this.oMedsAdminSlotVM.MultiSlot.Where(
                (slot) =>
                  DateTime.GreaterThan(slot.ScheduledDTTM , oSlotDet.ScheduledDTTM) &&
                  (String.Equals(
                    slot.Status,
                    SlotStatus.PLANNED,
                    StringComparison.InvariantCultureIgnoreCase
                  ) ||
                    String.Equals(
                      slot.Status,
                      SlotStatus.DUENOW,
                      StringComparison.InvariantCultureIgnoreCase
                    ) ||
                    String.Equals(
                      slot.Status,
                      SlotStatus.OVERDUE,
                      StringComparison.InvariantCultureIgnoreCase
                    ) ||
                    String.Equals(
                      slot.Status,
                      SlotStatus.NOTYETRECORDED,
                      StringComparison.InvariantCultureIgnoreCase
                    ) ||
                    String.Equals(
                      slot.Status,
                      SlotStatus.DEFERADMIN,
                      StringComparison.InvariantCultureIgnoreCase
                    ) ||
                    String.Equals(
                      slot.Status,
                      SlotStatus.DEFERDUENOW,
                      StringComparison.InvariantCultureIgnoreCase
                    ) ||
                    String.Equals(
                      slot.Status,
                      SlotStatus.DEFEROVERDUE,
                      StringComparison.InvariantCultureIgnoreCase
                    ) ||
                    (String.Equals(
                      slot.Status,
                      SlotStatus.PATIENTSELFADMIN,
                      StringComparison.InvariantCultureIgnoreCase
                    ) &&
                      DateTime.GreaterThan(slot.ScheduledDTTM , this.dtCurrentDateTime)))
              ).Select((slot) => slot);
              if (AllSlots != null && AllSlots.Count() > 0) {
                oSlotDet.IsUpdatePIStatusToCompleted = false;
                oSlotDet.IsLastSlotCheckRequired = false;
              } else {
                oSlotDet.IsUpdatePIStatusToCompleted = true;
                oSlotDet.IsLastSlotCheckRequired = true;
              }
            }
          }
        }
      } else if (oSlotDet.CACode == MedAction.StrikethorughAdmin) {
        let bAllowSelfAdminReActivate: boolean = true,
          bAllowPRNWithoutScheduleReActivate = true;
        if (
          this.oTagDrugHeaderDetail != null &&
          this.oTagDrugHeaderDetail.IsPatientSelfAdmin &&
          DateTime.NotEquals(oSlotDet.PrescriptionEndDate , DateTime.MinValue)&&
          DateTime.LessThan(oSlotDet.PrescriptionEndDate , CommonBB.GetServerDateTime()
        )) {
          bAllowSelfAdminReActivate = false;
        }
        if (
          this.oMedsAdminSlotVM.IsPRN &&
          !this.oMedsAdminSlotVM.IsPRNWithSchedule &&
         DateTime.NotEquals( oSlotDet.PrescriptionEndDate , DateTime.MinValue )&&
          DateTime.LessThan(oSlotDet.PrescriptionEndDate , CommonBB.GetServerDateTime()
        )) {
          bAllowPRNWithoutScheduleReActivate = false;
        }
        if (
          String.Equals(
            oSlotDet.PrescriptionItemStatus,
            CConstants.COMPLETED,
            StringComparison.CurrentCultureIgnoreCase
          ) &&
          bAllowPRNWithoutScheduleReActivate &&
          bAllowSelfAdminReActivate
        ) {
          if (oSlotDet.IsLastSlotinCurrentView == true) {
            oSlotDet.IsUpdatePIStatusToCompleted = true;
            oSlotDet.IsLastSlotCheckRequired = true;
          } else if (
            String.Equals(
              oSlotDet.FreqPerodCode,
              CConstants.sWeeklyFreqUOMCode,
              StringComparison.InvariantCultureIgnoreCase
            ) ||
            String.Equals(
              oSlotDet.FreqPerodCode,
              CConstants.sMonthFreqUOMCode,
              StringComparison.InvariantCultureIgnoreCase
            ) ||
            String.Equals(
              oSlotDet.FreqPerodCode,
              CConstants.sYearsFreqUOMCode,
              StringComparison.InvariantCultureIgnoreCase
            )
          ) {
            oSlotDet.IsUpdatePIStatusToCompleted = true;
            oSlotDet.IsLastSlotCheckRequired = true;
          } else {
            // let AllSlots = (from slot in oMedsAdminSlotVM.MultiSlot
            //     where slot.ScheduledDTTM > oSlotDet.ScheduledDTTM && !String.Equals(slot.Status, SlotStatus.OMITTED, StringComparison.InvariantCultureIgnoreCase)
            //     select slot);
            let AllSlots = this.oMedsAdminSlotVM.MultiSlot.Where(
              (slot) =>
                DateTime.GreaterThan(slot.ScheduledDTTM , oSlotDet.ScheduledDTTM) &&
                !String.Equals(
                  slot.Status,
                  SlotStatus.OMITTED,
                  StringComparison.InvariantCultureIgnoreCase
                )
            ).Select((slot) => slot);
            if (AllSlots != null && AllSlots.Count() > 0) {
              oSlotDet.IsUpdatePIStatusToCompleted = false;
              oSlotDet.IsLastSlotCheckRequired = false;
            } else {
              oSlotDet.IsUpdatePIStatusToCompleted = true;
              oSlotDet.IsLastSlotCheckRequired = true;
            }
          }
        }
      }
    }
  }
  oSlotHelper_LaunchRecordAdminEvent(
    objAdminDetail: AdministrationDetail
  ): void {
    if (
      this.oSlotDetail != null &&
      this.oSlotDetail.IsPICompOrDiscAndScheduleDTTMBeyondPIStopDTTM
    ) {
      this.oMedsAdminSlotVM.IsPICompOrDiscAndScheduleDTTMBeyondPIStopDTTM =
        true;
      Busyindicator.SetStatusIdle('MedChart');
      super.onDialogClose(
        ObjectHelper.CreateObject(new AppDialogEventargs(), {
          Content: this,
          Result: AppDialogResult.Cancel,
          AppChildWindow: super.appDialog,
        })
      );
    } else {
      this.oMedsAdminRec = new MedsRecordAdminstrator();
      this.oMedsAdminRec.constructorImpl(this.oSlotDetail);
      this.oMedsAdminRec.objDrugHeader = new DrugHeader();
      this.oDrugHeader.oDrugHdrAddnlInfo.SteppedDoseUOM =
        this.oSlotDetail.DoseUOM;
      this.oDrugHeader.oDrugHdrAddnlInfo.SteppedLowerDose =
        this.oSlotDetail.LDose;
      this.oDrugHeader.oDrugHdrAddnlInfo.SteppedUpperDose =
        this.oSlotDetail.UDose;
      this.oDrugHeader.oDrugHdrAddnlInfo.RecordAdminViewed =
        RecordAdminType.RecordAdmin;
      this.oMedsAdminRec.objDrugHeader.DataContext =
        Common.SetDrugHeaderContent(
          this.oSlotDetail.DrugDetail,
          this.oDrugHeader.oDrugHdrAddnlInfo,
          this.oMedsAdminRec.objDrugHeader
        );
      this.oMedsAdminRec.onDialogClose = this.oMedsAdminRec_Closed;
      this.oMedsAdminRec.objAdminDetail = objAdminDetail;
      this.oMedsAdminRec.OnRecAdminFinishEvent = (s) => {
        this.oMedsAdminRec_OnRecAdminFinishEvent();
      };
      let dialogWindowHeight = (window.devicePixelRatio == 1) ? 775:(775/window.devicePixelRatio) - 40; 
      AppActivity.OpenWindow("Record administration", this.oMedsAdminRec, (s) => { this.oMedsAdminRec_Closed(s); }, "Record administration", true, dialogWindowHeight, 450, false, WindowButtonType.OkCancel, null, null, null);
      
      // AppActivity.OpenWindow(
      //   'Record administration',
      //   this.oMedsAdminRec,
      //   this.oMedsAdminRec_Closed,
      //   'Record administration',
      //   true,
      //   775,
      //   450,
      //   true,
      //   WindowButtonType.OkCancel,
      //   null
      // );
    }
  }
  oMedsAdminRec_OnRecAdminFinishEvent(): void {
    if (
      this.oSlotDetail != null &&
      this.oSlotDetail.IsPICompOrDiscAndScheduleDTTMBeyondPIStopDTTM
    ) {
      this.oMedsAdminSlotVM.IsPICompOrDiscAndScheduleDTTMBeyondPIStopDTTM =
        this.oSlotDetail.IsPICompOrDiscAndScheduleDTTMBeyondPIStopDTTM;
      super.onDialogClose(
        ObjectHelper.CreateObject(new AppDialogEventargs(), {
          Content: this,
          Result: AppDialogResult.Cancel,
          AppChildWindow: super.appDialog,
        })
      );
    } else {
      Busyindicator.SetStatusIdle('Administration');
      if(this.oMedsAdminRec && this.oMedsAdminRec.dupDialogRef){
        this.oMedsAdminRec.dupDialogRef.close();
      }
      this.UpdateGridData();
      // this.oMedsAdminRec.appDialog.DialogResult = true;
      if (!this.oMedsAdminSlotVM.IsReloadChartRequired) {
        this.oMedsAdminSlotVM.IsReloadChartRequired =
          this.oMedsAdminRec.IsReloadChartReq;
        if (this.oMedsAdminRec.IsReloadChartReq)
          this.oMedsAdminSlotVM.PrescriptionItemStatus =
            this.oMedsAdminRec.PrescriptionItemStatus;
      }
    }
    Busyindicator.SetStatusIdle('Administration');
  }
  oMedsAdminRec_Closed(args: AppDialogEventargs): void {
    this.oMedsAdminRec = args?.Content.Component;
    this.oSlotDetail = ObjectHelper.CreateType<SlotDetailVM>(this.oMedsAdminRec.objslotVM, SlotDetailVM);
    this.IsLessAdmOutErrorMsgExists = false;
    this.IsGrtAdmOutErrorMsgExists = false;
    this.IsNextDueErrMsgExists = false; //when row double click this is true
    this.IsTitratedDoseEmptyErrMsgExists = false;
    if (!this.oSlotDetail.IsSubmitInProgress) {
      if (args.Result == AppDialogResult.Ok) {
        if (
          !Common.CheckIfLockingDurationElapsed((s, e) => {
            this.oMsgBox_MultiSlotRecAdminClose(s, e);
          })
        ) {
          this.oSlotDetail.IsSubmitInProgress = true;
          Busyindicator.SetStatusBusy('Administration', true);
          this.oMedsAdminRec.cmdOk_Click();
          if (this.sPrevStatus == SlotStatus.OVERDUE) {
            this.overDueCount += 1;
            this.oMedsAdminSlotVM.OverDueCount = this.overDueCount;
          } else if (this.sPrevStatus == SlotStatus.DUENOW) {
            this.dueCount += 1;
            this.oMedsAdminSlotVM.DueCount = this.dueCount;
          }
          this.IsRecordAmin = true;
        }
      } else if (args.Result == AppDialogResult.Cancel)
        this.oMedsAdminRec.dupDialogRef.close();
    }
    if (this.IsNextDueSlotExists) {
      this.IsNextDueSlotExists = false;
    }
    if (this.IsNextAdminSlotExists) {
      this.IsNextAdminSlotExists = false;
    }
  }
  oMsgBox_MultiSlotRecAdminClose(sender: Object, e: MessageEventArgs): void {
    this.oMedsAdminRec.appDialog.DialogResult = false;
  }
  private UpdateGridData(): void {
    this.oMedsAdminSlotVM.GetMultiSlotDetail(false, this.IsRecordAmin, false);
    this.oMedsAdminSlotVM.GetAdminMultiSlotCompleted.subscribe(x => {
      if(x==true)
      this.entire_rowload();
    // this.oMedsAdminSlotVM.GetAdminMultiSlotCompleted.emit(false);
    });
    if (this.oMedsAdminSlotVM.IsParacetamolIngredient)
      this.CumulativeParaAdmin.GetCumulativeParacetamol();
  }
  CumulativeParaAdmin_WarningChangeEvent(
    OldParacetamolAdminCount: number,
    NewParacetamolAdminCount: number
  ): void {
    let nOldValue: number = that.oMedsAdminSlotVM.ParacetamolAdminCount;
    let nNewValue: number = NewParacetamolAdminCount.Value;
    that.oMedsAdminSlotVM.ParacetamolAdminCount =
      NewParacetamolAdminCount.Value;
    if (
      that.oMedsAdminSlotVM.IsParacetamolIngredient &&
      ((nOldValue <= 3 && nNewValue >= 4) || (nNewValue <= 3 && nOldValue >= 4))
    ) {
      that.oMedsAdminSlotVM.MultiSlot.forEach((slot) => {
        slot.ParacetamolAdminCount = nNewValue;
      });
      this.grdMultiSlot.Rebind();
    }
  }
  
  private rowCount: number = 0;
  private grdMultiSlot_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
    if (e.Row != null && e.Row.Item != null) {
      const rows = document.querySelectorAll('.k-grid tr');
      this.rowCount = rows.length;
      rows.forEach((row, index) => {
        if (index % 2 !== 0) {
          row.classList.add('k-alt');
        }
      });
      if (
        ObjectHelper.CreateType<SlotDetailVM>(e.Row.Item, SlotDetailVM)
          .MultiRoute_Type == MultiRouteType.Mixed_Routes &&
        ObjectHelper.CreateType<SlotDetailVM>(e.Row.Item, SlotDetailVM)
          .AdministrationDetail != null &&
        ObjectHelper.CreateType<SlotDetailVM>(e.Row.Item, SlotDetailVM)
          .AdministrationDetail.IsAdministeredOnInfusionChart == true &&
        (String.Equals(
          ObjectHelper.CreateType<SlotDetailVM>(e.Row.Item, SlotDetailVM)
            .Status,
          SlotStatus.COMPLETED,
          StringComparison.CurrentCultureIgnoreCase
        ) ||
          String.Equals(
            ObjectHelper.CreateType<SlotDetailVM>(e.Row.Item, SlotDetailVM)
              .Status,
            SlotStatus.INPROGRESS,
            StringComparison.CurrentCultureIgnoreCase
          ) ||
          String.Equals(
            ObjectHelper.CreateType<SlotDetailVM>(e.Row.Item, SlotDetailVM)
              .Status,
            SlotStatus.PAUSED,
            StringComparison.CurrentCultureIgnoreCase
          ) ||
          String.Equals(
            ObjectHelper.CreateType<SlotDetailVM>(e.Row.Item, SlotDetailVM)
              .Status,
            SlotStatus.STOPPED,
            StringComparison.CurrentCultureIgnoreCase
          ))
      ) {
        // e.Row.Background = Common.SetSlotColorWithStripedLines(0.009, 0.003);// lines commented in common.ts
      } else if (
        this.oMedsAdminSlotVM != null &&
        this.oMedsAdminSlotVM.IsPRNWithSchedule
      ) {
        // e.Row.Background = new SolidColorBrush(
        //   MedChartData.AsRequiredSlotsColor
        // );
        //e.dataItem['RowStyles'].push('AsRequiredSlotsColor');
        this.grdMultiSlot.SetRowStyle( e, MedChartData.AsRequiredSlotsColor.color,'Background')
      } else if (
        String.Compare(
          ObjectHelper.CreateType<SlotDetailVM>(e.Row.Item, SlotDetailVM)
            .Status,
          SlotStatus.OVERDUE,
          StringComparison.InvariantCultureIgnoreCase
        ) == 0 ||
        String.Compare(
          ObjectHelper.CreateType<SlotDetailVM>(e.Row.Item, SlotDetailVM)
            .Status,
          SlotStatus.DEFEROVERDUE,
          StringComparison.InvariantCultureIgnoreCase
        ) == 0 ||
        String.Compare(
          ObjectHelper.CreateType<SlotDetailVM>(e.Row.Item, SlotDetailVM)
            .Status,
          SlotStatus.NOTYETRECORDED,
          StringComparison.InvariantCultureIgnoreCase
        ) == 0
      ) {
        // e.Row.Background = new SolidColorBrush(MedChartData.OverDueSlotsColor);
        // e.dataItem['RowStyles'].push('OverDueSlotsColor');
        this.grdMultiSlot.SetRowStyle( e, MedChartData.OverDueSlotsColor.color,'Background')
      } else if (
        String.Compare(
          ObjectHelper.CreateType<SlotDetailVM>(e.Row.Item, SlotDetailVM)
            .Status,
          SlotStatus.DUENOW,
          StringComparison.InvariantCultureIgnoreCase
        ) == 0 ||
        String.Compare(
          ObjectHelper.CreateType<SlotDetailVM>(e.Row.Item, SlotDetailVM)
            .Status,
          SlotStatus.DEFERDUENOW,
          StringComparison.InvariantCultureIgnoreCase
        ) == 0
      ) {
        // e.Row.Background = new SolidColorBrush(MedChartData.DueSlotsColor);
        // e.dataItem['RowStyles'].push('DueSlotsColor');
        this.grdMultiSlot.SetRowStyle( e, MedChartData.DueSlotsColor.color,'Background')
      } else if (
        String.Compare(
          ObjectHelper.CreateType<SlotDetailVM>(e.Row.Item, SlotDetailVM)
            .Status,
          SlotStatus.OMITTED,
          StringComparison.InvariantCultureIgnoreCase
        ) == 0
      ) {
        // e.Row.Background = new SolidColorBrush(MedChartData.OmittedSlotsColor);
        // e.dataItem['RowStyles'].push('OmittedSlotsColor');
        this.grdMultiSlot.SetRowStyle( e, MedChartData.OmittedSlotsColor.color,'Background')
      } 
      else {
        this.grdMultiSlot.SetRowStyle( e, '#d1e6fd','Background')
      }
    }
  }
  public cmdOk_Click(): void {
    this.oMsg.Message = 'Administrator record has been recorded.';
    this.oMsg.IconType = MessageBoxType.Information;
    this.oMsg.Title = CConstants.MSGTitleName;
    this.oMsg.Tag = 'exclude';
    this.oMsg.MessageButton = MessageBoxButton.OK;
    this.oMsg.Show();
    this.appDialog.DialogResult = true;
  }

}

