import { Component, OnInit } from '@angular/core';
import { MedChartData, ChartContext, TagSlotDetail, TagDrugHeaderDetail } from "../utilities/globalvariable";
import { RecordAdminType, ChartType, MedAction, CConstants } from "../utilities/CConstants";
import { MedsRecordAdminstrator } from "src/app/lorappmedicationadminbbui/child/medsadminrecordadmin";
import { AppActivity, base, ContextManager } from 'epma-platform/services';
import { WindowButtonType, AppDialogEventargs, AppDialogResult, Visibility, CListItem } from 'epma-platform/models';
import { Common, MedsAdminCommonData } from '../utilities/common';
import { DrugHeader, CDrugHeader, DrugHeaderItem, CDrugHdrAddnlInfo } from '../common/drugheader';
import { AdministrationDetail, Encounter } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { AdministrationDetailVM, SlotDetailVM } from '../viewmodel/MedicationChartVM';
import { TextBlock } from 'epma-platform/controls';
import { GetMedsChartData } from '../common/getmedschartdata';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import DateTime from 'epma-platform/DateTime';
import { AppContextInfo, AppSessionInfo, ContextInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { Resource } from 'src/app/lorappmedicationcommonbb/resource';
import { Busyindicator } from "src/app/lorappcommonbb/busyindicator";
import { SlotAdministrationHelper } from '../common/slotadministrationhelper';
import { TagObject } from 'src/app/lorarcbluebirdmedicationchart/common/TagObject'
import { DefaultSlot } from 'src/app/lorarcbluebirdmedicationchart/common/DefaultSlot';
import { AsRequiredSlot } from 'src/app/lorarcbluebirdmedicationchart/common/AsRequiredSlot';
import { BlankSlot } from 'src/app/lorarcbluebirdmedicationchart/common/BlankSlot';
import { InfRecAdmMainView } from '../child/InfRecAdmMainView';
import { InfrecordadminVM } from '../viewmodel/InfrecordadminVM';
import { InfusionTypeCode } from 'src/app/lorappmedicationcommonbb/utilities/constants';

@Component({
  selector: 'TestInfRecAdmin-ManiView',
  templateUrl: './TestInfRecAdmin-ManiView.html',
  styleUrls: ['TestInfRecAdmin-ManiView.css']
})
export class TestInfRecAdminManiView implements OnInit {

  oMedsAdminRec: InfRecAdmMainView;
  oHdrRecordAdmin: CDrugHdrAddnlInfo;
  objMedsAdminCommonData: MedsAdminCommonData;

  private LgndClickCount: number = 0;
  lGroupSeqNo: number;
  // objCommPrescriptionItemViewVM: CommPrescriptionItemViewVM;
  TextBlockControl: TextBlock;
  public _isActivityLaunchedInSlot: boolean;
  public get IsActivityLaunchedInSlot(): boolean
  {
      return this._isActivityLaunchedInSlot;
  }
  public set IsActivityLaunchedInSlot(value: boolean)
  {
      this._isActivityLaunchedInSlot = value;
      if (this.TextBlockControl != null) {
        this.TextBlockControl.Visibility = this._isActivityLaunchedInSlot ? Visibility.Visible : Visibility.Collapsed;
      }
  }
  // oGetMedsChartData: GetMedsChartData;
  // dtCurrentDateTime: Date = CommonBB.GetServerDateTime();
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
  // objpgdadminstrationvm: PGDAdminstrationVM;
  // objpgdadminvm: PGDAdminstrationVM;
  // objrecordadmininfsuion: InfRecAdmContDefer;
  // objRecordPGD: RecordPGD;
  // objMedsAdminSelfAdmin: MedsAdminManageSelfAdminChild;
  // msg: iMessageBox;
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
  isPrescribeLinkClicked: boolean = false;
  bIsAlrDefOverview: boolean = false;
  sPreviousSlotStatus: string = String.Empty;
  IsReqMedicationLaunched: boolean = false;
  IsTitratedIconClicked: boolean = false;
  isCloseToMidNightAlertForPRNShown: boolean;
  // objPrescitemdetvm: PrescriptionItemDetailsVM;
  sParacetamolRecentlyAdministered: number = -1;
  _ISCanWithoutClerkPrompt: boolean = false;

  oGetMedsChartData: GetMedsChartData;
  dtCurrentDateTime: DateTime = CommonBB.GetServerDateTime();


  constructor() { }

  ngOnInit(): void {

    /**** HARD CODED ********/
    //this.LoadMedicationChart();
  }

  public cmdRecordAdmin_Click(){
    this.LaunchRecordAdmin();
  }

  LaunchRecordAdmin(): void {
    /***********************/
    this.oSlotVM = new SlotDetailVM();
    this.oTagDrugHeaderDetail = this.oGetMedsChartData.oChartRowList[0].DrugItem.Tag;
    this.oTagSlotDetail = ((this.oGetMedsChartData.oChartRowList[0].ChartCells[2].Slots[0] as DefaultSlot).Tag as TagSlotDetail);
    /********************* */
    this.oHdrRecordAdmin = new CDrugHdrAddnlInfo();
    //this.oHdrRecordAdmin.DueAt = this.oTagSlotDetail.SlotDateTime.ToUserDateTimeString(CConstants.DateTimeFormat)
    this.oHdrRecordAdmin.DueAt = this.oSlotVM.CurrentServerDate.ToUserDateTimeString(CConstants.DateTimeFormat);
    this.oSlotVM.IdentifyingOID = this.oTagDrugHeaderDetail.DrugIdentifyingOID;
    this.oSlotVM.IdentifyingType = this.oTagDrugHeaderDetail.DrugIdentifyingType.toString();
    this.oSlotVM.MCVersionNo = this.oTagDrugHeaderDetail.MCVersionNo.toString();
    this.oSlotVM.AdminMethod = this.oTagDrugHeaderDetail.AdminMethod.toString();
    this.oSlotVM.RouteOID = this.oTagDrugHeaderDetail.RouteOID;
    this.oSlotVM.IsControlledDrug = this.oTagDrugHeaderDetail.IsControlDrug;
    this.oSlotVM.IsFluidControlledDrug = this.oTagDrugHeaderDetail.IsFluidControlDrug;
    this.oSlotVM.LorenzoID = this.oTagDrugHeaderDetail.LorenzoID.toString();
    this.oSlotVM.PrescriptionStartDate = this.oTagDrugHeaderDetail.StartDate;
    this.oSlotVM.DoseType = this.oTagDrugHeaderDetail.DoseType.toString();
    //this.oSlotVM.ScheduledDTTM = this.oTagSlotDetail.SlotDateTime;
    this.oSlotVM.ScheduledDTTM = this.oSlotVM.CurrentServerDate;
    this.oSlotVM.DoseUOM = this.oTagDrugHeaderDetail.DoseUOM.toString();
    this.oSlotVM.DoseUOMOID = this.oTagDrugHeaderDetail.DoseUOMOID;
    this.oSlotVM.DoseUOMLzoID = this.oTagDrugHeaderDetail.DoseUOMLzoID.toString();
    //this.oSlotVM.PresScheduleOID = this.oTagSlotDetail.SlotOID;
    this.oSlotVM.SlotsTimeIntervalAvg = this.oTagDrugHeaderDetail.SlotsTimeIntervalAvg;
    this.oSlotVM.PrescriptionItemStatus = this.oTagDrugHeaderDetail.PrescriptionItemStatus.toString();
    this.oSlotVM.MultiRoute_Type = this.oTagDrugHeaderDetail.MultiRoute_Type;
    if (this.oTagDrugHeaderDetail.ReviewDTTM != DateTime.MinValue)
    {
        this.oHdrRecordAdmin.ReviewAt = this.oTagDrugHeaderDetail.ReviewDTTM.ToUserDateTimeString(CConstants.DateTimeFormat);
        if (this.oTagDrugHeaderDetail.ReviewDTTM.Date <= CommonBB.GetServerDateTime().Date)
        {
            this.oHdrRecordAdmin.ReviewAtVisibility = Visibility.Visible;
            this.oHdrRecordAdmin.ReviewIconTooltip = Common.GetReviewIconTooltip(this.oTagDrugHeaderDetail.ReviewType, this.oTagDrugHeaderDetail.ReviewDTTM, this.oTagDrugHeaderDetail.ReviewRequestedComments, this.oTagDrugHeaderDetail.ReviewRequestedby);
        }
    }
    this.oSlotVM.PrescriptionEndDate = this.oTagDrugHeaderDetail.EndDate;
    this.oSlotVM.FreqPerodCode = this.oTagDrugHeaderDetail.FreqPerodcode.toString();
    //this.oSlotVM.IsLastSlotinCurrentView = this.oTagSlotDetail.IsLastSlotInView;
    this.oSlotVM.CACode = MedAction.RecordAdministration;
    this.oSlotVM.IsParacetamolIngredient = this.oTagDrugHeaderDetail.IsParacetamolIngredient;
    //
    this.oSlotVM.PrescriptionItemOID = 1000000043081;
    this.oSlotVM.PresScheduleOID = 700002462124;
    this.oSlotVM.Dose = "12";
    this.oSlotVM.DrugDetail = this.oGetMedsChartData.oChartRowList[0].DrugItem;
    //
    this.oSlotVM.AdministrationDetail = new AdministrationDetailVM();
    this.oSlotVM.AdministrationDetail.Dose = this.oGetMedsChartData.oChartRowList[0].DrugItem.Dose;
    this.oSlotVM.AdministrationDetail.DoseMandatory = this.oGetMedsChartData.oChartRowList[0].DoseMandatory;
    //
    let oSlotHelper: SlotAdministrationHelper = new SlotAdministrationHelper();
    oSlotHelper.LaunchRecordAdminEvent = (s,e) => { this.oSlotHelper_LaunchRecordAdminEvent(s) };
    oSlotHelper.GetSlotDetails(this.oSlotVM);
  }
  oSlotHelper_LaunchRecordAdminEvent(objAdminDetail: AdministrationDetail): void {
      if (this.oSlotVM != null && this.oSlotVM.IsPICompOrDiscAndScheduleDTTMBeyondPIStopDTTM) {
          Busyindicator.SetStatusIdle("MedChart");
            //this.RefreshMedChart();
      }
      else
      {
          // this.OpenRecordAdminScreen(objAdminDetail);
      }
  }
  fillInfrecordadminVM() {
   var  recordadminVM = new InfrecordadminVM();
    var oclictItem = new CListItem();
oclictItem.Value = InfusionTypeCode.INTERMITTENT;
recordadminVM.InfusionType = oclictItem;
recordadminVM.RangeStartDate = DateTime.Now;
recordadminVM.RangeEndDate = DateTime.Now.AddDays(2);
recordadminVM.AdministeredDateTime= DateTime.Now;
recordadminVM.AdministeredDate= DateTime.Now;
recordadminVM.CurrentBagValue="10 ml";
recordadminVM.CummulativeVolumeInfused="10 ml";
recordadminVM.TotalVolumeToBeInfused="10 ml";
recordadminVM.DoseUOMName="10 ml";
//recordadminVM.EnddateTime= DateTime.Now;
recordadminVM.PrevInfusionAction= "INTERMITTENT";
recordadminVM.GivenDateTime = DateTime.Now.toDateString();
recordadminVM.RecordedAtValue=DateTime.Now.toDateString();

recordadminVM.CurrentChangeBagRangeStartDate = DateTime.Now;
recordadminVM.CurrentChangeBagRangeEndDate = DateTime.Now.AddDays(2);

recordadminVM.EnddateTime= DateTime.Now;
recordadminVM.EndDate= DateTime.Now;

recordadminVM.RecordedBy = "Gaurav";
recordadminVM.InfusionRateValue = "40 liter/min";
recordadminVM.HumidificationValue = "Cold Humidification";
recordadminVM.summaryviewRoute = "Intradetrusor";
recordadminVM.SummaryViewDeliverydevice="Test";
recordadminVM.SummaryViewAdministeredBy="Gaurav";
recordadminVM.WitnessBy = "Deepak";
recordadminVM.ReasonValue = "test";
recordadminVM.CommentsValue="testcomment";
recordadminVM.IsBagDetailsEnable = true;
    this.oMedsAdminRec.recordadminVM =recordadminVM;

  }
  public OpenRecordAdminScreen(): void {
      MedChartData.IsReloadChartReqFromReqMedCA = false;
      this.oMedsAdminRec  = new InfRecAdmMainView();
      this.fillInfrecordadminVM();
      this.oMedsAdminRec.onDialogClose = this.oMedsAdminRec_Closed;
      AppActivity.OpenWindow("Record administration",
                        this.oMedsAdminRec,
                        (s, e) => { this.oMedsAdminRec_Closed(s); },
                        "Record administration", true, 700, 850, true,
                        WindowButtonType.OkCancel, null);
      this.IsActivityLaunchedInSlot = false;
  }
  oMedsAdminRec_OnRecAdminFinishEvent(): void {

  }
  oMedsAdminRec_Closed(args: AppDialogEventargs): void {
      this.IsActivityLaunchedInSlot = false;
      if (!this.oSlotVM.IsSubmitInProgress) {
          if (this.oMedsAdminRec != null && args.Result == AppDialogResult.Ok) {
                  Busyindicator.SetStatusBusy("Administration", true);
          }
          else if (args.Result == AppDialogResult.Cancel) {
              this.oMedsAdminRec.appDialog.DialogResult = true;
          }
      }
  }

  public DisposeObjectsOnFinish() {

  }

  /************************************ */

  LoadMedicationChart(IPlock: boolean = false): void {
    //IsActivityLaunchedInSlot = false;
    if (MedChartData.MedChartOID == 0) {
        if (this.objMedsAdminCommonData == null) {
          this.objMedsAdminCommonData = new MedsAdminCommonData();
        }
        this.objMedsAdminCommonData.GetMedChartOID((IPlock != null && IPlock.HasValue && IPlock.Value) ? true : false);
        this.objMedsAdminCommonData.MedsAdminCommonDataCompleted = (s, e) => { this.objMedsAdminCommonData_MedsAdminCommonDataCompleted };
    }
    else {
        this.LoadMedChart();
    }
  }
  private objMedsAdminCommonData_MedsAdminCommonDataCompleted(): void {
      this.LoadMedChart();
  }
  LoadMedChart(): void {
      var Startdate: DateTime = this.dtCurrentDateTime.Date.AddDays(-2);
      var Enddate: DateTime = this.dtCurrentDateTime.Date.AddDays(1);
      this.oGetMedsChartData = new GetMedsChartData(ChartContext.PatientOID, ChartContext.EncounterOID, this.dtCurrentDateTime, Startdate, Enddate, ChartType.Medication_Chart, String.Empty, MedChartData.MedChartOID, false, false);
      // this.oGetMedsChartData.MedsAdminChartDataCompleted -= oGetMedsChartData_MedsAdminChartDataCompleted;
      // this.oGetMedsChartData.MedsAdminChartDataCompleted += new GetMedsChartData.MedsAdminChartDataDelegate(oGetMedsChartData_MedsAdminChartDataCompleted);
     // this.oGetMedsChartData.GetMedsAdminChartData();
      // Grid.SetColumn(MedicationChartControl, 0);
      // Grid.SetColumnSpan(MedicationChartControl, 2);
      // Grid.SetRow(MedicationChartControl, 3);
      // if(!LayoutRoot.Children.Contains(MedicationChartControl))
      //     LayoutRoot.Children.Add(MedicationChartControl);
      // Grid.SetColumn(TextBlockControl, 0);
      // Grid.SetColumnSpan(TextBlockControl, 2);
      // Grid.SetRow(TextBlockControl, 3);
      // TextBlockControl.Visibility = _isActivityLaunchedInSlot ? System.Windows.Visibility.Visible : System.Windows.Visibility.Collapsed;
      // if (!LayoutRoot.Children.Contains(TextBlockControl)) {
      //     LayoutRoot.Children.Add(TextBlockControl);
      // }
      // var DSTDatetime: Date = Common.DSTTimeInChart(Startdate, Enddate, ChartType.Medication_Chart);
      // if (DSTDatetime != Date.MinValue) {
      //     lblDSTClockNotifier.Visibility = Visibility.Visible;
      //     lblDSTClockNotifier.Text = String.Format(MedicationAdministrator.DSTTimeClockChange_text, DSTDatetime.ToString(CConstants.ShortDateFormat));
      // }
      // else {
      //     lblDSTClockNotifier.Visibility = Visibility.Collapsed;
      // }
  }


}


