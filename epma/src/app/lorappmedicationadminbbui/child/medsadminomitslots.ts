
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity, MessageBoxButton } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType } from 'epma-platform/models';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import TimeSpan from 'epma-platform/TimeSpan';
import { ObjectHelper } from 'epma-platform/helper';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { iAppDialogWindow } from 'src/app/shared/epma-platform/controls/iAppDialogWindow';
import { CDrugHdrAddnlInfo, DrugHeader } from 'src/app/lorappmedicationadminbbui/common/drugheader';
import { AppDialog, Border, Colors, EventArgs, SolidColorBrush, StackPanel, iCheckBox, iLabel, iRadioButton, iTextBox, iTreeViewControl } from 'epma-platform/controls';
import { ContentControl } from 'src/app/shared/epma-platform/controls/ContentControl';
import { DrugItem } from 'src/app/lorarcbluebirdmedicationchart/common/DrugItem';
import { OmitSlotsParams } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';

import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';

import { MessageBoxType, iMessageBox } from 'epma-platform/services';
import DateTime from 'epma-platform/DateTime';
import { OmitSlotsVM } from '../viewmodel/MedsAdminVM';
import { OmitSelectedSlots } from './OmitSelectedSlots';
import { OmitUntil } from './OmitUntil';
import { OmitIndefinite } from './OmitIndefinite';
import { ResDrugHeader } from '../common/resdrugheader.designer';
import { Common } from '../utilities/common';
import { ChartContext } from '../utilities/globalvariable';

import { Resource } from '../resource';
import { OmitAction } from '../utilities/CConstants';
import { iRadioButtonService } from 'src/app/shared/epma-platform/controls/iradiobutton';
import { MedsAdminPrescChartView } from '../view/medsadminprescchartview';

@Component({
  selector: 'app-medsadmin-omitslots',
  templateUrl: './medsadminomitslots.html',
  //styleUrls: ['./medsadmin-omitslots.component.css']
})
export class MedsadminOmitslots extends iAppDialogWindow implements AfterViewInit {
  private LayoutRoot: StackPanel;
  public objOmitSlots = Resource.MedsAdminOmitSlots;

  @ViewChild("LayoutRootTempRef", { read: StackPanel, static: false }) set _LayoutRoot(c: StackPanel) {
    if (c) { this.LayoutRoot = c; }
  };
  objDrugHeader: DrugHeader = new DrugHeader();
  @ViewChild("objDrugHeaderTempRef", { read: DrugHeader, static: false }) set _objDrugHeader(c: DrugHeader) {
    if (c) { this.objDrugHeader = c; }
  };
  private spOmitActions: StackPanel;
  @ViewChild("spOmitActionsTempRef", { read: StackPanel, static: false }) set _spOmitActions(c: StackPanel) {
    if (c) { this.spOmitActions = c; }
  };
  // private iRdbSelectedSlot: iRadioButton;
  public iRadioButtonService: iRadioButtonService = new iRadioButtonService;
  private iRdbSelectedSlot: iRadioButton = new iRadioButton(this.iRadioButtonService);
  @ViewChild("iRdbSelectedSlotTempRef", { read: iRadioButton, static: false }) set _iRdbSelectedSlot(c: iRadioButton) {
    if (c) { this.iRdbSelectedSlot = c; }
  };
  // private iRdbUntil: iRadioButton;
  private iRdbUntil: iRadioButton = new iRadioButton(this.iRadioButtonService);
  @ViewChild("iRdbUntilTempRef", { read: iRadioButton, static: false }) set _iRdbUntil(c: iRadioButton) {
    if (c) { this.iRdbUntil = c; }
  };
  // private iRdbIndefinite: iRadioButton;
  private iRdbIndefinite: iRadioButton = new iRadioButton(this.iRadioButtonService);
  @ViewChild("iRdbIndefiniteTempRef", { read: iRadioButton, static: false }) set _iRdbIndefinite(c: iRadioButton) {
    if (c) { this.iRdbIndefinite = c; }
  };
  private lblOmitReason: iLabel;
  @ViewChild("lblOmitReasonTempRef", { read: iLabel, static: false }) set _lblOmitReason(c: iLabel) {
    if (c) { this.lblOmitReason = c; }
  };
  private txtOmitReason: iTextBox;
  @ViewChild("txtOmitReasonTempRef", { read: iTextBox, static: false }) set _txtOmitReason(c: iTextBox) {
    if (c) { this.txtOmitReason = c; }
  };
  //  private ContentCtrlOmit: ContentControl;
  public ContentCtrlOmit: ContentControl = new ContentControl;
  @ViewChild("ContentCtrlOmitTempRef", { read: ContentControl, static: false }) set _ContentCtrlOmit(c: ContentControl) {
    if (c) { this.ContentCtrlOmit = c; }
  };
  ngOnInit(): void {
  }
  public static CONTS_DURATION: string = "Duration";
  public static CONTS_OMITREASONS: string = "Omitreasons";
  public static CONTS_ENDDATE: string = "EndDate";
  public static CONTS_CC_MEDDRSN1: string = "CC_MEDDRSN1";
  public static CONTS_DURATIONUOM_HOURS: string = "HOURS";
  public static CONTS_DURATIONUOM_DAY: string = "DAY";
  public static CONTS_DURATIONS: string = "Duration&EndDate";
  public static CONTS_OMITFROM: string = "Omitfrom";
  public static CONTS_OMITFROMEMPTY: string = "Omitfromempty";
  public static CONST_OMITUNTILDURATIONUOM: string = "OmitUntilDurationUOM";
  public static CONST_INDEFINITEREVIEWPERIOD: string = "Indefinitereviewperiod";
  public static CONST_EMPTYREVIEWPERIOD: string = "ReviewperiodEmpty";
  public static CONST_OMITFROMPRES: string = "Omitfrompres";
  oDrugItem: DrugItem;
  oHdrAddnlInfo: CDrugHdrAddnlInfo;
  public oOmitSlotsVM: OmitSlotsVM;
  oLocalOmitSlotsParams: OmitSlotsParams;
  bNotToEmptyDUR: boolean;
  oOmitSelectedSlots: OmitSelectedSlots;
  oOmitUntil: OmitUntil;
  oOmitIndefinite: OmitIndefinite;
  dtCurrentDateTime: DateTime = CommonBB.GetServerDateTime();
  constructor(oOmitSlotParams: OmitSlotsVM) {
    super();
    this.oLocalOmitSlotsParams = oOmitSlotParams.OmittedSlots;
    //InitializeComponent();
    this.oDrugItem = new DrugItem();
    this.oHdrAddnlInfo = new CDrugHdrAddnlInfo();
    this.oDrugItem.DoseLabel = ResDrugHeader.drugItem_DoseLabelText;
    this.oDrugItem.RouteLabel = ResDrugHeader.drugItem_RouteLabelText;
    //revisitme
    // this.objDrugHeader.DataContext = Common.SetDrugHeaderContent(this.oDrugItem, this.oHdrAddnlInfo, this.objDrugHeader);
    this.DataContext = this.oOmitSlotsVM = oOmitSlotParams;
  }
  public maxScrollContentHeight;
  ngAfterViewInit(): void {
    if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
      this.maxScrollContentHeight = 359;
    }else{
      this.maxScrollContentHeight = (window.devicePixelRatio == 1) ? "auto" :(660/window.devicePixelRatio)-124;
    }
//this.oOmitSlotsVM.IsSlotUpdatedEvent = (s, e) => { this.oOmitSlotsVM_IsSlotUpdatedEvent(); };
//this.oOmitSlotsVM_IsSlotUpdatedEvent();
//this.oOmitSlotsVM.IsSlotUpdatedEvent();


    //revisitme
    let IsPastSlotAvailable: boolean = this.oOmitSlotsVM.OmittedSlots.OSlotData.Where(d => d.ScheduleDTTM.Date < CommonBB.GetServerDateTime().Date).Count() > 0 ? true : false;
    // let IsPastSlotAvailable: boolean = false;

    if (this.oOmitSlotsVM.MedicationSelected) {
      this.oOmitSlotsVM.IsEnableSelectedSlot = false;
      this.iRdbUntil.IsChecked = true;
      this.iRdbUntil_Checked(null,null);
    }
    else {
      if (this.oOmitSlotsVM.IsPastSlotSelected || IsPastSlotAvailable) {
        this.oOmitSlotsVM.IsEnableSelectedSlot = true;
        this.oOmitSlotsVM.IsEnableUntil = false;
        this.oOmitSlotsVM.IsEnableIndefinite = false;
        this.iRdbSelectedSlot.IsChecked = true;
        this.iRdbSelectedSlot_Checked(null,null)
      }
      else {
        this.oOmitSlotsVM.IsEnableSelectedSlot = true;
        this.oOmitSlotsVM.IsEnableUntil = true;
        this.oOmitSlotsVM.IsEnableIndefinite = true;
        this.iRdbSelectedSlot.IsChecked = true;
        this.iRdbSelectedSlot_Checked(null,null)
      }
    }
    this.oOmitSlotsVM.OmittedBy = ChartContext.CurrentUserName;
    this.oOmitSlotsVM.ParentDTTM = this.dtCurrentDateTime;
  }
  iRdbSelectedSlot_Checked(sender: Object, e: RoutedEventArgs): void {
    this.oOmitSlotsVM.Until = false;
    this.oOmitSlotsVM.Indefinite = false;
    this.LoadOmitType(OmitAction.SelectedSlot);
  }
  iRdbUntil_Checked(sender: Object, e: RoutedEventArgs): void {
    this.oOmitSlotsVM.Until = true;
    this.oOmitSlotsVM.Indefinite = false;
    this.LoadOmitType(OmitAction.Until);
    let oOmitUntil: OmitUntil = ObjectHelper.CreateType<OmitUntil>(this.ContentCtrlOmit.Content, OmitUntil);
  }
  iRdbIndefinite_Checked(sender: Object, e: RoutedEventArgs): void {
    this.oOmitSlotsVM.Until = false;
    this.oOmitSlotsVM.Indefinite = true;
    this.LoadOmitType(OmitAction.Indefinite);
    let oOmitIndefinite: OmitIndefinite = ObjectHelper.CreateType<OmitIndefinite>(this.ContentCtrlOmit.Content, OmitIndefinite);
    //let oOmitIndefinite:OmitIndefinite=(this.ContentCtrlOmit.Content) as OmitIndefinite;
  }

  private LoadOmitType(_OmitAction: string): void {
    switch (_OmitAction) {
      case OmitAction.SelectedSlot:
        if (this.oOmitSlotsVM != null) {
          if (this.oOmitSelectedSlots == null) {
              this.oOmitSelectedSlots = new OmitSelectedSlots(this.oOmitSlotsVM);
              this.oOmitSelectedSlots.DataContext = this.oOmitSlotsVM;
          }
          this.ContentCtrlOmit.Content = this.oOmitSelectedSlots;
        }
        break;
      case OmitAction.Until:
        if (this.oOmitSlotsVM != null) {
          if (this.oOmitUntil == null) {
              this.oOmitUntil = new OmitUntil();
              this.oOmitUntil.DataContext = this.oOmitSlotsVM;
          }
          this.ContentCtrlOmit.Content = this.oOmitUntil;
        }
        break;
      case OmitAction.Indefinite:
        if (this.oOmitSlotsVM != null) {
          if (this.oOmitIndefinite == null) {
              this.oOmitIndefinite = new OmitIndefinite(this.oOmitSlotsVM);
          }
          this.ContentCtrlOmit.Content = this.oOmitIndefinite;
        }
        break;
    }
  }
  oOmitSlotsVM_IsSlotUpdatedEvent(): void {
    //this.oOmitSlotsVM.IsSlotUpdatedEvent();
    this.appDialog.DialogResult = true;

  }
  public cmdOkClick(): boolean {
    let bRerturn: boolean = false;
    this.bNotToEmptyDUR = true;
    if (this.CheckMandatory()) {
      if (this.oOmitSlotsVM.IsInfusion && String.Compare(this.oOmitSlotsVM.InfusionTypeCode, "CC_IPPINFTYPINTE", StringComparison.CurrentCultureIgnoreCase) == 0)
        this.oOmitSlotsVM.IsInfusion = true;
      else this.oOmitSlotsVM.IsInfusion = false;
      this.oOmitSlotsVM.OmitSlots(this.oLocalOmitSlotsParams);
      bRerturn = true;
    }
    //this.oOmitSlotsVM.IsSlotUpdatedEvent = (s, e) => { this.oOmitSlotsVM_IsSlotUpdatedEvent(); };
    return bRerturn;
  }
  private CheckMandatory(): boolean {
    let bResult: boolean = true;
    let oiMessageBox: iMessageBox = new iMessageBox();
    oiMessageBox.Closed = (s, e) => { this.oiMessageBox_Closed(s, e) };
    oiMessageBox.Title = "Lorenzo";
    oiMessageBox.IconType = MessageBoxType.Information;
    if (String.IsNullOrEmpty(this.oOmitSlotsVM.OmitReason)) {
      oiMessageBox.Message = Resource.MedsAdminOmitSlots.ErrMsg_OmitReasons;
      oiMessageBox.MessageButton = MessageBoxButton.OK;
      oiMessageBox.Show();
      return false;
    }
    if (this.oOmitSlotsVM.Until || this.oOmitSlotsVM.Indefinite) {
      if (this.oOmitSlotsVM.Until && DateTime.NotEquals(this.oOmitSlotsVM.EndDateValue,DateTime.MinValue) && DateTime.NotEquals(this.oOmitSlotsVM.OmitFromDate,DateTime.MinValue)) {
        this.oOmitSlotsVM.EndDate = this.oOmitSlotsVM.EndDateValue.DateTime.AddTime(this.oOmitSlotsVM.EndDateTime);
        this.oOmitSlotsVM.FromDate = this.oOmitSlotsVM.OmitFromDate.DateTime.AddTime(this.oOmitSlotsVM.OmittedFromDateTime.Value);
      }
      if (this.oOmitSlotsVM.Indefinite && DateTime.NotEquals(this.oOmitSlotsVM.OmitFromDate,DateTime.MinValue)) {
        this.oOmitSlotsVM.FromDate = this.oOmitSlotsVM.OmitFromDate.DateTime.AddTime(this.oOmitSlotsVM.OmittedFromDateTime.Value);
      }
      if (DateTime.Equals(this.oOmitSlotsVM.OmitFromDate,DateTime.MinValue)) {
        oiMessageBox.Message = Resource.MedsAdminOmitSlots.ErrMsg_OmitFromEmpty;
        oiMessageBox.Tag = MedsadminOmitslots.CONTS_OMITFROMEMPTY;
        oiMessageBox.MessageButton = MessageBoxButton.OK;
        oiMessageBox.Show();
        return false;
      }
      if (DateTime.NotEquals(this.oOmitSlotsVM.FromDate,DateTime.MinValue)) {
        if ((DateTime.LessThan(this.oOmitSlotsVM.FromDate,this.dtCurrentDateTime)) || (DateTime.NotEquals(this.oOmitSlotsVM.PrescriptionItemEndDate,DateTime.MinValue) && DateTime.GreaterThan(this.oOmitSlotsVM.FromDate,this.oOmitSlotsVM.PrescriptionItemEndDate))) {
          oiMessageBox.Message = Resource.MedsAdminOmitSlots.ErrMsg_OmitFrom;
          oiMessageBox.Tag = MedsadminOmitslots.CONTS_OMITFROM;
          oiMessageBox.MessageButton = MessageBoxButton.OK;
          oiMessageBox.Show();
          return false;
        }
        if ((DateTime.NotEquals(this.oOmitSlotsVM.PrescriptionItemStartDate,DateTime.MinValue) && DateTime.LessThan(this.oOmitSlotsVM.FromDate,this.oOmitSlotsVM.PrescriptionItemStartDate)) || (DateTime.NotEquals(this.oOmitSlotsVM.PrescriptionItemEndDate,DateTime.MinValue) && DateTime.GreaterThan(this.oOmitSlotsVM.FromDate,this.oOmitSlotsVM.PrescriptionItemEndDate))) {
          oiMessageBox.Message = Resource.MedsAdminOmitSlots.ErrMsg_OmitFromPres;
          oiMessageBox.Tag = MedsadminOmitslots.CONST_OMITFROMPRES;
          oiMessageBox.MessageButton = MessageBoxButton.OK;
          oiMessageBox.Show();
          return false;
        }
      }
    }
    else {
      this.oOmitSlotsVM.EndDate = DateTime.MinValue;
    }
    if (this.oOmitSlotsVM.Until) {
    //this.oOmitSlotsVM.DurationValue <= 0 changed in below line
      if (DateTime.Equals(this.oOmitSlotsVM.EndDate,DateTime.MinValue) && (!String.IsNullOrEmpty(this.oOmitSlotsVM.OmitReason)) && ((!this.oOmitSlotsVM.DurationValue?.HasValue && this.oOmitSlotsVM.DurationValue == null) || (this.oOmitSlotsVM.DurationValue?.HasValue && this.oOmitSlotsVM.DurationValue <= 0) && this.oOmitSlotsVM.DurationUOMValue == null)) {
        oiMessageBox.Message = Resource.MedsAdminOmitSlots.ErrMsg_DurationDate;
        oiMessageBox.Tag = MedsadminOmitslots.CONTS_DURATIONS;
        oiMessageBox.MessageButton = MessageBoxButton.OK;
        oiMessageBox.Show();
        return false;
      }
      if (DateTime.Equals(this.oOmitSlotsVM.EndDate,DateTime.MinValue) && (!String.IsNullOrEmpty(this.oOmitSlotsVM.OmitReason))) {
        if (((!this.oOmitSlotsVM.DurationValue?.HasValue) || (this.oOmitSlotsVM.DurationValue == 0) || (this.oOmitSlotsVM.DurationValue < 0)) && this.oOmitSlotsVM.DurationUOM != null && this.oOmitSlotsVM.DurationUOMValue != null) {
          oiMessageBox.Message = Resource.MedsAdminOmitSlots.ErrMsg_Duration;

          oiMessageBox.Tag = MedsadminOmitslots.CONTS_DURATION;
          oiMessageBox.MessageButton = MessageBoxButton.OK;
          oiMessageBox.Show();
          return false;
        }
        if (this.oOmitSlotsVM.DurationUOMValue == null && (this.oOmitSlotsVM.DurationValue?.HasValue && this.oOmitSlotsVM.DurationValue > 0)) {
          oiMessageBox.Message = Resource.MedsAdminOmitSlots.ErrMsg_DurationUOM;
          oiMessageBox.Tag = MedsadminOmitslots.CONST_OMITUNTILDURATIONUOM;
          oiMessageBox.MessageButton = MessageBoxButton.OK;
          oiMessageBox.Show();
          return false;
        }
      }
      if (DateTime.NotEquals(this.oOmitSlotsVM.EndDate,DateTime.MinValue)) {
        if (((DateTime.NotEquals(this.oOmitSlotsVM.PrescriptionItemEndDate,DateTime.MinValue) && DateTime.GreaterThan(this.oOmitSlotsVM.EndDate,this.oOmitSlotsVM.PrescriptionItemEndDate)) || DateTime.LessThan(this.oOmitSlotsVM.EndDate,this.dtCurrentDateTime))) {
          oiMessageBox.Message = Resource.MedsAdminOmitSlots.ErrMsg_EndDate;
          oiMessageBox.Tag = MedsadminOmitslots.CONTS_ENDDATE;
          oiMessageBox.MessageButton = MessageBoxButton.OK;
          oiMessageBox.Show();
          return false;
        }
        else if ((DateTime.NotEquals(this.oOmitSlotsVM.FromDate,DateTime.MinValue) && DateTime.LessThan(this.oOmitSlotsVM.EndDate,this.oOmitSlotsVM.FromDate))) {
          oiMessageBox.Message = Resource.MedsAdminOmitSlots.ErrMsg_EndDateLTFromDate;
          oiMessageBox.Tag = MedsadminOmitslots.CONTS_ENDDATE;
          oiMessageBox.MessageButton = MessageBoxButton.OK;
          oiMessageBox.Show();
          return false;
        }
      }
    }
    else if (this.oOmitSlotsVM.Indefinite) {
      if (DateTime.Equals(this.oOmitSlotsVM.ReviewDTTM,DateTime.MinValue) || (this.oOmitSlotsVM.ReviewAfterValue < 0 || this.oOmitSlotsVM.ReviewAfterValue == 0 || this.oOmitSlotsVM.ReviewAfterValue == null || this.oOmitSlotsVM.ReviewAfterValue == undefined) || this.oOmitSlotsVM.ReviewAfterUOMValue == null) {
        oiMessageBox.Message = Resource.MedsAdminOmitSlots.ErrMsg_IndefiniteReviewPeriod;
        oiMessageBox.Tag = MedsadminOmitslots.CONST_INDEFINITEREVIEWPERIOD;
        oiMessageBox.MessageButton = MessageBoxButton.OK;
        oiMessageBox.Show();
        return false;
      }
      if (DateTime.NotEquals(this.oOmitSlotsVM.ReviewDTTM,DateTime.MinValue) && DateTime.NotEquals(this.oOmitSlotsVM.PrescriptionItemEndDate,DateTime.MinValue) && (DateTime.Compare(this.oOmitSlotsVM.ReviewDTTM, this.oOmitSlotsVM.PrescriptionItemEndDate) > 0)) {
        oiMessageBox.Message = Resource.MedsAdminOmitSlots.ErrMsg_ReviewPeriodEmpty;
        oiMessageBox.Tag = MedsadminOmitslots.CONST_EMPTYREVIEWPERIOD;
        oiMessageBox.MessageButton = MessageBoxButton.OK;
        oiMessageBox.Show();
        return false;
      }
    }
    return bResult;
  }
  oiMessageBox_Closed(sender: Object, e: EventArgs): void {
    this.bNotToEmptyDUR = false;
    let oiMessageBox: iMessageBox = ObjectHelper.CreateType<iMessageBox>(sender, iMessageBox);
    if (oiMessageBox != null) {
      switch (oiMessageBox.Tag.ToString()) {
        case MedsadminOmitslots.CONTS_DURATION:
          this.oOmitUntil.udDuration.Focus();
          break;
        case MedsadminOmitslots.CONTS_ENDDATE:
          this.oOmitUntil.dpEndDate.Focus();
          break;
        case MedsadminOmitslots.CONTS_OMITREASONS:
          this.txtOmitReason.Focus();
          break;
        case MedsadminOmitslots.CONTS_DURATIONS:
          this.oOmitUntil.udDuration.Focus();
          break;
        case MedsadminOmitslots.CONST_INDEFINITEREVIEWPERIOD:
        case MedsadminOmitslots.CONST_EMPTYREVIEWPERIOD:
          this.oOmitIndefinite.udReviewAfter.Focus();
          break;
        case MedsadminOmitslots.CONTS_OMITFROMEMPTY:
        case MedsadminOmitslots.CONST_OMITFROMPRES:
        case MedsadminOmitslots.CONTS_OMITFROM:
          if (this.oOmitSlotsVM.Until) {
            this.oOmitUntil.dpOmitFrom.Focus();
          }
          else if (this.oOmitSlotsVM.Indefinite) {
            this.oOmitIndefinite.dpOmitFrom.Focus();
          }
          break;
        case MedsadminOmitslots.CONST_OMITUNTILDURATIONUOM:
          this.oOmitUntil.cboDuration.Focus();
          break;
      }
    }
  }
}