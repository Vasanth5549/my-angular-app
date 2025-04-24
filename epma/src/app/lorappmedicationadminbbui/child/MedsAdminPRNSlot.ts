import { AfterViewInit, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow, Visibility } from 'epma-platform/models';
import { AppDialog, Colors, SolidColorBrush, iLabel, StackPanel, DataTemplate, ScrollViewer, ContentPresenter } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { GridExtension, GridViewCellClickEventArgs, RowLoadedEventArgs } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { GridComponent, RowClassArgs } from '@progress/kendo-angular-grid';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { ModifyStrikethroughLink } from './ModifyStrikethroughLink';
import { CumulativeAdministration } from '../model/cumulativeadministration';
import { MedsAdminMultiSlotVM } from '../viewmodel/MedsAdminVM';
import { MedsAdminModifyOrStrikethrough } from './MedsAdminModifyOrStrikethrough';
import { Resource } from '../resource';
import { DisplayMultiSlotDetailPipe } from 'src/app/lorarcbluebirdmedicationchart/converter/MedChartConverter.pipe';
import { CDrugHdrAddnlInfo, CDrugHeader, DrugHeader } from '../common/drugheader';
import { CConstants, MultiRouteType, RecordAdminType, SlotStatus } from '../utilities/CConstants';
import { Common } from '../utilities/common';
import { SlotDetailVM } from '../viewmodel/MedicationChartVM';
import { MedChartData, TagDrugHeaderDetail } from '../utilities/globalvariable';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { DisplayPrescriptionLineItem, DoseWrapConverter, HumidificationConverter, RouteWrapConverter, TargetsatrangeConverter } from '../converter/medadminconverter';
import { MedsRecordAdminstrator } from './medsadminrecordadmin';
var that;

@Component({
  selector: 'medsadminprnslot',
  templateUrl: './medsadminprnslot.html',
  styleUrls: ['./medsadminprnslot.css']
})
export class MedsAdminPRNSlot extends iAppDialogWindow implements OnInit, AfterViewInit {

  public oMedsAdminSlotVM: MedsAdminMultiSlotVM = new MedsAdminMultiSlotVM();
  oMAModorST: MedsAdminModifyOrStrikethrough;
  oSlotDetail: SlotDetailVM;
  public IsPatientSelfAdmin: boolean;
  CumulativeParaAdmin: CumulativeAdministration;
  public IsDiscontinued: boolean = false;
  dtServerDate: DateTime = CommonBB.GetServerDateTime();
  isPageLoadedForFirstTime: boolean = false;
  private LayoutRoot: StackPanel;
  public Styles = ControlStyles;
  //oMedsAdminChartToolTip: MedsAdminChartToolTip;
  public MedChartView = Resource.MedsAdminChartToolTip;
  //oAddnlInfo: CDrugHdrAddnlInfo; 
  //public objSlotVM: SlotDetailVM;
  //public oSlotVM: SlotDetailVM;
   //public IsPGDItem: boolean = false;
  @ViewChild("LayoutRootTempRef", { read: StackPanel, static: false }) set _LayoutRoot(c: StackPanel) {
    if (c) { this.LayoutRoot = c; }
  };
  drgHeader: DrugHeader;
  @ViewChild("drgHeaderTempRef", { read: DrugHeader, static: false }) set _drgHeader(c: DrugHeader) {
    if (c) { this.drgHeader = c; }
  };
  public lblDrugName: iLabel;
  @ViewChild("lblDrugNameTempRef", { read: iLabel, static: false }) set _lblDrugName(c: iLabel) {
    if (c) { this.lblDrugName = c; }
  };
  // private grdMultiSlot: iGrid; //controls Grid    
  // @ViewChild("grdMultiSlotTempRef", { read: iGrid, static: false }) set _grdMultiSlot(c: iGrid) {
  //     if (c) { this.grdMultiSlot = c; }
  // };

  grdMultiSlot: GridExtension = new GridExtension();
  @ViewChild("grdMultiSlotTempRef", { read: GridComponent, static: false }) set _grdMultiSlot(c: GridComponent) {
    if (c) {
      //this.grdMultiSlot.ItemsSource = c.data;
      this.grdMultiSlot.grid = c;
      this.grdMultiSlot.columns = c.columns;
      // this.grdMultiSlot.ItemsSourceData = c.data;
    }
  };

  @ViewChildren('temp', { read: DataTemplate }) dataTemplates: QueryList<DataTemplate>;

  MultislotDisplay: DisplayMultiSlotDetailPipe;

  constructor(private changeDetectorRef?: ChangeDetectorRef) {
    super();
    this.CumulativeParaAdmin = new CumulativeAdministration();
    this.CumulativeParaAdmin.WarningChangeEvent = (s, e) => { this.CumulativeParaAdmin_WarningChangeEvent(s, e); };
    that = this;
  }
  MedsAdminPRNSlot_Loaded(): void {
    this.oMedsAdminSlotVM = ObjectHelper.CreateType<MedsAdminMultiSlotVM>(this.DataContext, MedsAdminMultiSlotVM);
    this.oMedsAdminSlotVM.IsPatientSelfAdmin = this.IsPatientSelfAdmin;
    this.oMedsAdminSlotVM.GetMultiSlotDetail(true, false, this.oMedsAdminSlotVM.IsLaunchedPRNFromPresChart);
    this.oMedsAdminSlotVM.MedsAdminMultiSlotCompleted = (s, e) => { this.oMedsAdminSlotVM_MedsAdminMultiSlotCompleted(); };
    Busyindicator.SetStatusIdle("MedChart");
  }
  oMedsAdminSlotVM_MedsAdminMultiSlotCompleted(): void {
    if (!this.isPageLoadedForFirstTime) {
      //this.grdMultiSlot.SetBinding(iGrid.ItemsSourceProperty, ObjectHelper.CreateObject(new System.Windows.Data.Binding("MultiSlot"), { Mode: System.Windows.Data.BindingMode.OneWay }));     
      this.grdMultiSlot.SetBinding('data', this.oMedsAdminSlotVM.MultiSlot);
    }
    else {
     // this.grdMultiSlot.Rebind();   
     //94294 fix
     this.grdMultiSlot.ItemsSource.Clear(); 
    setTimeout(() => {
      this.grdMultiSlot.ItemsSource = this.oMedsAdminSlotVM.MultiSlot;
    }, 0);
      
    }
    this.isPageLoadedForFirstTime = true;
  }
  ngOnInit(): void {
    this.grdMultiSlot.RowIndicatorVisibility = Visibility.Collapsed;
    this.grdMultiSlot.onCellClick = (s, e) => { this.grdMultiSlot_onCellClick(s, e); };
  }
  public screenResolutionFlag = false;
  ngAfterViewInit(): void {
    this.grdMultiSlot.GenerateColumns();
    this.MedsAdminPRNSlot_Loaded();
    this.grdMultiSlot.changeDetectionRef = this.changeDetectorRef;
    if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
      this.screenResolutionFlag = true;
  }else{
    this.screenResolutionFlag = false;
  }
    // this.CumulativeParaAdmin = new CumulativeAdministration();
    // this.CumulativeParaAdmin.WarningChangeEvent = (s, e) => { this.CumulativeParaAdmin_WarningChangeEvent(s, e); };
  }

  grdMultiSlot_onCellClick(sender: Object, args: GridViewCellClickEventArgs): void {
    if (!this.oMedsAdminSlotVM.IsLaunchedPRNFromPresChart) {
      Busyindicator.SetStatusBusy("MedChart");
      this.oSlotDetail = ObjectHelper.CreateType<SlotDetailVM>(this.grdMultiSlot.GetRowData(args.RowIndex), SlotDetailVM);
      if ((String.Compare(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0) && (this.oSlotDetail != null && this.oSlotDetail.AdministrationDetail != null && !String.Equals(this.oSlotDetail.Status, SlotStatus.GIVEN, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(this.oSlotDetail.Status, SlotStatus.SELFADMINISTERED, StringComparison.InvariantCultureIgnoreCase) && !Common.IsRetrospectiveSlot(this.oSlotDetail.AdministrationDetail.AdministeredDate, this.oSlotDetail.Status))) {
        this.ShowErrorMessage(Resource.MedsAdminChartToolTip.SuspendedStatusErrorMsg, MessageBoxButton.OK, MessageBoxType.Critical);
      }
      else {
        let sSlotStatus: string = String.Empty;
        this.oSlotDetail = ObjectHelper.CreateType<SlotDetailVM>(this.grdMultiSlot.GetRowData(args.RowIndex), SlotDetailVM);
        if (this.oSlotDetail instanceof SlotDetailVM) {
          if (this.oSlotDetail.IsIconClick == false) {
            Busyindicator.SetStatusIdle("MedChart");
          }
          if (this.oSlotDetail.IsIconClick) {
            Busyindicator.SetStatusIdle("MedChart");
            this.oSlotDetail.IsIconClick = false;
            return
          }
          if (this.oSlotDetail != null && this.oSlotDetail.MultiRoute_Type == MultiRouteType.Mixed_Routes) {
            if (this.oSlotDetail.AdministrationDetail != null && this.oSlotDetail.AdministrationDetail.IsAdministeredOnInfusionChart == true && (String.Equals(this.oSlotDetail.Status, SlotStatus.COMPLETED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.oSlotDetail.Status, SlotStatus.INPROGRESS, StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.oSlotDetail.Status, SlotStatus.PAUSED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.oSlotDetail.Status, SlotStatus.STOPPED, StringComparison.CurrentCultureIgnoreCase)))
              return
          }
          if (this.oSlotDetail.AdministrationDetail != null && this.oSlotDetail.AdministrationDetail.MedAdminOID > 0) {
            this.oSlotDetail.IsModifyWindow = true;
            if (this.oSlotDetail.CheckValidation()) {
              this.LaunchModifyAdmin();
            }
            else {
              //this.oSlotDetail.ModifyAdminErrorMsgEventCompleted -= new SlotDetailVM.ModifyAdminErrorMsgDelegate(this.oSlotDetail_ModifyAdminErrorMsgEventCompleted);
              this.oSlotDetail.ModifyAdminErrorMsgEventCompleted = (s, e) => { this.oSlotDetail_ModifyAdminErrorMsgEventCompleted(); };
            }
          }
        }
      }
    }
  }
  LaunchModifyAdmin(): void {
    let oDrugHeader: CDrugHeader = new CDrugHeader();
    //  ObjectHelper.CreateType<CDrugHeader>(this.drgHeader.DataContext, CDrugHeader);
    oDrugHeader.oDrugHdrBasicInfo = this.drgHeader.DataContext.oDrugHdrBasicInfo;
    oDrugHeader.oDrugHdrAddnlInfo = new CDrugHdrAddnlInfo();
    if (this.oSlotDetail.DrugDetail != null && this.oSlotDetail.DrugDetail.Tag != null) {
      let oTagDrugHeaderDetail: TagDrugHeaderDetail = <TagDrugHeaderDetail>(this.oSlotDetail.DrugDetail.Tag);
      this.oSlotDetail.IdentifyingOID = oTagDrugHeaderDetail.DrugIdentifyingOID;
      this.oSlotDetail.IdentifyingType = oTagDrugHeaderDetail.DrugIdentifyingType;
      this.oSlotDetail.MCVersionNo = oTagDrugHeaderDetail.MCVersionNo;
      this.oSlotDetail.AdminMethod = oTagDrugHeaderDetail.AdminMethod;
      this.oSlotDetail.LDose = this.oSlotDetail.Dose = oTagDrugHeaderDetail.LowerDose;
      this.oSlotDetail.UDose = oTagDrugHeaderDetail.UpperDose;
      this.oSlotDetail.DoseType = oTagDrugHeaderDetail.DoseType;
      this.oSlotDetail.RouteOID = oTagDrugHeaderDetail.RouteOID;
      this.oSlotDetail.IsControlledDrug = oTagDrugHeaderDetail.IsControlDrug;
      this.oSlotDetail.IsFluidControlledDrug = oTagDrugHeaderDetail.IsFluidControlDrug;
      this.oSlotDetail.LorenzoID = oTagDrugHeaderDetail.LorenzoID;
      this.oSlotDetail.PrescriptionStartDate = oTagDrugHeaderDetail.StartDate;
      this.oSlotDetail.PrescriptionEndDate = oTagDrugHeaderDetail.EndDate;
      this.oSlotDetail.PrescriptionItemStatus = oTagDrugHeaderDetail.PrescriptionItemStatus;
      this.oSlotDetail.DoseUOM = !(String.IsNullOrEmpty(oTagDrugHeaderDetail.DoseUOM)) ? oTagDrugHeaderDetail.DoseUOM : String.Empty;
      if (DateTime.NotEquals(oTagDrugHeaderDetail.ReviewDTTM , DateTime.MinValue)) {
        oDrugHeader.oDrugHdrAddnlInfo.ReviewAt = oTagDrugHeaderDetail.ReviewDTTM.ToUserDateTimeString(CConstants.DateTimeFormat);
        if (DateTime.LessThanOrEqualTo(oTagDrugHeaderDetail.ReviewDTTM.Date , CommonBB.GetServerDateTime().Date)) {
          oDrugHeader.oDrugHdrAddnlInfo.ReviewAtVisibility = Visibility.Visible;
          oDrugHeader.oDrugHdrAddnlInfo.ReviewIconTooltip = Common.GetReviewIconTooltip(oTagDrugHeaderDetail.ReviewType, oTagDrugHeaderDetail.ReviewDTTM, oTagDrugHeaderDetail.ReviewRequestedComments, oTagDrugHeaderDetail.ReviewRequestedby);
        }
      }
    }
    if (this.oSlotDetail != null && this.oSlotDetail.AdministrationDetail != null && DateTime.NotEquals(this.oSlotDetail.AdministrationDetail.RecordedAt , DateTime.MinValue)) {
      oDrugHeader.oDrugHdrAddnlInfo.RecordedAt = this.oSlotDetail.AdministrationDetail.RecordedAt.ToString(CConstants.ShortDateFormat) + " " + this.oSlotDetail.AdministrationDetail.RecordedAt.ToUserDateTimeString(CConstants.Timeformat);
    }
    if (this.oMedsAdminSlotVM != null) {
      this.oSlotDetail.IsParacetamolIngredient = this.oMedsAdminSlotVM.IsParacetamolIngredient;
      this.oSlotDetail.ParacetamolAdminCount = this.oMedsAdminSlotVM.ParacetamolAdminCount;
    }
    this.oSlotDetail.IsLastPRN = this.oMedsAdminSlotVM.IsPRN;
    oDrugHeader.oDrugHdrAddnlInfo.RecordAdminViewed = RecordAdminType.RecordAdmin;
    
    this.oMAModorST = new MedsAdminModifyOrStrikethrough();
    this.oMAModorST.constructorImpl(this.oSlotDetail, oDrugHeader.oDrugHdrAddnlInfo);
    this.oMAModorST.objDrugHeader = new DrugHeader();
    this.oMAModorST.objDrugHeader.DataContext = oDrugHeader;
    this.oMAModorST.objlinkButtons = new ModifyStrikethroughLink();
    if (this.oSlotDetail != null && oDrugHeader != null && this.oMAModorST != null) {
      this.oMAModorST.objlinkButtons.DataContext = Common.SetDrugHeaderContent(this.oSlotDetail.DrugDetail, oDrugHeader.oDrugHdrAddnlInfo, this.oMAModorST.objDrugHeader);
    }
    else {
      this.oMAModorST.objlinkButtons.DataContext = super.DataContext;
    }
    if (this.oSlotDetail.Status == SlotStatus.NOTKNOWN && this.oSlotDetail.MultiRoute_Type == MultiRouteType.Mixed_Routes) {
      this.oMAModorST.IsModifyLaunchedDirectly = true;
      this.oMAModorST._Parent = this;
      Busyindicator.SetStatusIdle("MedChart");
      this.oMAModorST.cmdModify_Click(this, new RoutedEventArgs());
    }

    else AppActivity.OpenWindow("Choose Modify or Strikethrough", this.oMAModorST, (s) => { this.MedsAdminPRNSlot_Closed(s); }, "", true, 210, 440, false, WindowButtonType.Close, this.oMAModorST.objlinkButtons);
  }
  public _oMedsAdmin_OnSubmitModAdminEvent = (s, e) => { this.oMedsAdmin_OnSubmitModAdminEvent(); };
  public oMedsAdmin_OnSubmitModAdminEvent(): void {
    this.ModifyStrikeThroughClosed();
    Busyindicator.SetStatusIdle("MedChart");
    Busyindicator.SetStatusIdle("Administration");
  }
  ModifyStrikeThroughClosed(): void {
    Busyindicator.SetStatusIdle("MedChart");
    if (this.oMedsAdminSlotVM != null && this.oMedsAdminSlotVM.MultiSlot != null) {
      this.oMedsAdminSlotVM.GetMultiSlotDetail(true, false, false);
    }
    if (this.oMedsAdminSlotVM.IsParacetamolIngredient)
      this.CumulativeParaAdmin.GetCumulativeParacetamol();
  }
  oSlotDetail_ModifyAdminErrorMsgEventCompleted(): void {
    if (this.oSlotDetail.IsDialogResult) {
      this.LaunchModifyAdmin();
    }
  }
  MedsAdminPRNSlot_Closed(args: AppDialogEventargs): void {
    if (this.oMAModorST.cmdCloseClick()) {
      this.ModifyStrikeThroughClosed();
      args.AppChildWindow.DialogResult = true;
    }
  }

  rowCallback = (context: RowClassArgs) => {
    let rowStyles = this.grdMultiSlot.getRowStyles(context);
    return rowStyles;
  };

  rowLoaded(context: any) {
    let rowEventArgs = this.grdMultiSlot.GetRowEventArgs(this.dataTemplates, context);
    this.grdMultiSlot_RowLoaded({}, rowEventArgs);
  }

  private grdMultiSlot_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
    if (e.Row != null && e.Row.Item != null) {
      if ((ObjectHelper.CreateType<SlotDetailVM>(e.Row.Item, SlotDetailVM)).MultiRoute_Type == MultiRouteType.Mixed_Routes && (ObjectHelper.CreateType<SlotDetailVM>(e.Row.Item, SlotDetailVM)).AdministrationDetail != null && (ObjectHelper.CreateType<SlotDetailVM>(e.Row.Item, SlotDetailVM)).AdministrationDetail.IsAdministeredOnInfusionChart == true && (String.Equals((ObjectHelper.CreateType<SlotDetailVM>(e.Row.Item, SlotDetailVM)).Status, SlotStatus.COMPLETED, StringComparison.CurrentCultureIgnoreCase) || String.Equals((ObjectHelper.CreateType<SlotDetailVM>(e.Row.Item, SlotDetailVM)).Status, SlotStatus.INPROGRESS, StringComparison.CurrentCultureIgnoreCase) || String.Equals((ObjectHelper.CreateType<SlotDetailVM>(e.Row.Item, SlotDetailVM)).Status, SlotStatus.PAUSED, StringComparison.CurrentCultureIgnoreCase) || String.Equals((ObjectHelper.CreateType<SlotDetailVM>(e.Row.Item, SlotDetailVM)).Status, SlotStatus.STOPPED, StringComparison.CurrentCultureIgnoreCase))) {
        e.Row.Background = Common.SetSlotColorWithStripedLines(0.009, 0.003);
      }
      else if (!this.IsDiscontinued) {
        //e.Row.Background = new SolidColorBrush(MedChartData.AsRequiredSlotsColor);
        // e.dataItem['RowStyles'].push('AsRequiredSlotsColor');
        this.grdMultiSlot.SetRowStyle( e, MedChartData.AsRequiredSlotsColor.color,'Background')
      }
      else {
        //e.Row.Background = new SolidColorBrush(Colors.Grey);
        e.dataItem['RowStyles'].push("Background_Grey");
      }
      let oRow: SlotDetailVM = ObjectHelper.CreateType<SlotDetailVM>(e.DataElement, SlotDetailVM);
      if (oRow instanceof SlotDetailVM && oRow.AdministrationDetail == null) {
        //oRow.AdminCompletedEvent -= new SlotDetailVM.AdminCompleted(this.oMedsAdminRec_Closed);
        oRow.AdminCompletedEvent = (s, e) => { this.oMedsAdminRec_Closed(s); };
      }
    }
  }
  private CopyEmptySlotObject(SourceSlotDetailVM: SlotDetailVM, DestinationSlotDetailVM: SlotDetailVM): void {
    DestinationSlotDetailVM.AdminMethod = SourceSlotDetailVM.AdminMethod;
    DestinationSlotDetailVM.AdminReason = SourceSlotDetailVM.AdminReason;
    DestinationSlotDetailVM.Dose = SourceSlotDetailVM.Dose;
    DestinationSlotDetailVM.DoseType = SourceSlotDetailVM.DoseType;
    DestinationSlotDetailVM.DoseUOM = SourceSlotDetailVM.DoseUOM;
    DestinationSlotDetailVM.DoseUOMOID = SourceSlotDetailVM.DoseUOMOID;
    DestinationSlotDetailVM.DrugDetail = SourceSlotDetailVM.DrugDetail;
    DestinationSlotDetailVM.IdentifyingOID = SourceSlotDetailVM.IdentifyingOID;
    DestinationSlotDetailVM.IdentifyingType = SourceSlotDetailVM.IdentifyingType;
    DestinationSlotDetailVM.IsControlledDrug = SourceSlotDetailVM.IsControlledDrug;
    DestinationSlotDetailVM.IsFluidControlledDrug = SourceSlotDetailVM.IsFluidControlledDrug;
    DestinationSlotDetailVM.IsDialogResult = SourceSlotDetailVM.IsDialogResult;
    DestinationSlotDetailVM.IsDoseEnabled = SourceSlotDetailVM.IsDoseEnabled;
    DestinationSlotDetailVM.IsIconClick = SourceSlotDetailVM.IsIconClick;
    DestinationSlotDetailVM.IsLastPRN = SourceSlotDetailVM.IsLastPRN;
    DestinationSlotDetailVM.IsModifyWindow = SourceSlotDetailVM.IsModifyWindow;
    DestinationSlotDetailVM.IsNextDueSlotExists = SourceSlotDetailVM.IsNextDueSlotExists;
    DestinationSlotDetailVM.IsNextPRNAllowed = SourceSlotDetailVM.IsNextPRNAllowed;
    DestinationSlotDetailVM.IsPatientSelfAdmin = SourceSlotDetailVM.IsPatientSelfAdmin;
    DestinationSlotDetailVM.LastModifiedAt = SourceSlotDetailVM.LastModifiedAt;
    DestinationSlotDetailVM.LDose = SourceSlotDetailVM.LDose;
    DestinationSlotDetailVM.LorenzoID = SourceSlotDetailVM.LorenzoID;
    DestinationSlotDetailVM.MCVersionNo = SourceSlotDetailVM.MCVersionNo;
    DestinationSlotDetailVM.MinTimeInterval = SourceSlotDetailVM.MinTimeInterval;
    DestinationSlotDetailVM.PatientOID = SourceSlotDetailVM.PatientOID;
    DestinationSlotDetailVM.PrescriptionItemOID = SourceSlotDetailVM.PrescriptionItemOID;
    DestinationSlotDetailVM.PresScheduleOID = SourceSlotDetailVM.PresScheduleOID;
    DestinationSlotDetailVM.RouteOID = SourceSlotDetailVM.RouteOID;
    DestinationSlotDetailVM.TodaySlotDate = SourceSlotDetailVM.TodaySlotDate;
    DestinationSlotDetailVM.CurrentServerDate = this.dtServerDate;
    DestinationSlotDetailVM.Status = SourceSlotDetailVM.Status;
    DestinationSlotDetailVM.UDose = SourceSlotDetailVM.UDose;
    DestinationSlotDetailVM.IsParacetamolIngredient = SourceSlotDetailVM.IsParacetamolIngredient;
    DestinationSlotDetailVM.ParacetamolAdminCount = SourceSlotDetailVM.ParacetamolAdminCount;
    DestinationSlotDetailVM.InProgressInfusionMultiRouteDTTM = SourceSlotDetailVM.InProgressInfusionMultiRouteDTTM;
    DestinationSlotDetailVM.isInfusionInProgressForMultiRouteItem = SourceSlotDetailVM.isInfusionInProgressForMultiRouteItem;
  }
  oMedsAdminRec_Closed(oRecordAdmin: MedsRecordAdminstrator): void {
    if (this.oMedsAdminSlotVM != null && this.oMedsAdminSlotVM.MultiSlot != null) {
      if (this.grdMultiSlot != null && this.grdMultiSlot.GetRowData(this.grdMultiSlot.GetLastRowIndex()) != null && this.grdMultiSlot.GetRowData(this.grdMultiSlot.GetLastRowIndex()) instanceof SlotDetailVM && (ObjectHelper.CreateType<SlotDetailVM>(this.grdMultiSlot.GetRowData(this.grdMultiSlot.GetLastRowIndex()), SlotDetailVM)).IsPICompOrDiscAndScheduleDTTMBeyondPIStopDTTM) {
        this.oMedsAdminSlotVM.IsPICompOrDiscAndScheduleDTTMBeyondPIStopDTTM = true;
        Busyindicator.SetStatusIdle("Administration");
        Busyindicator.SetStatusIdle("MedChart");
        super.onDialogClose(ObjectHelper.CreateObject(new AppDialogEventargs(), { Content: this, Result: AppDialogResult.Cancel, AppChildWindow: super.appDialog }));
      }
      else {
        this.oMedsAdminSlotVM.GetMultiSlotDetail(true, false, false);
      }
    }
    Busyindicator.SetStatusIdle("Administration");
    if (this.oMedsAdminSlotVM.IsParacetamolIngredient)
      this.CumulativeParaAdmin.GetCumulativeParacetamol();
  }
  CumulativeParaAdmin_WarningChangeEvent(OldParacetamolAdminCount: number, NewParacetamolAdminCount: number): void {
    let nOldValue: number = this.oMedsAdminSlotVM.ParacetamolAdminCount;
    let nNewValue: number = NewParacetamolAdminCount.Value;
    that.oMedsAdminSlotVM.ParacetamolAdminCount = NewParacetamolAdminCount.Value;
    that.oMedsAdminSlotVM.MultiSlot.forEach((slot) => {
      slot.ParacetamolAdminCount = nNewValue;
    });
    this.grdMultiSlot.Rebind();
  }
  ShowErrorMessage(sErrorMsg: string, oMessageBoxButton: MessageBoxButton, oMessageBoxType: MessageBoxType): void {
    if (!String.IsNullOrEmpty(sErrorMsg)) {
      let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
        Title: "LORENZO",
        Message: sErrorMsg,
        MessageButton: oMessageBoxButton,
        IconType: oMessageBoxType
      });
      iMsgBox.Show();
    }
    Busyindicator.SetStatusIdle("MedChart");
  }
}