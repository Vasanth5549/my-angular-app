import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { iAppDialogWindow } from 'epma-platform/models';
import { ReviewPeriodVM } from '../viewmodel/ReviewPeriodVM';
import { ManageReviewPeriod } from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType } from 'epma-platform/models';
import { AppDialog, Grid, iComboBox, iUpDownBox } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { Resource } from '../resource';
import { InfusionTypeCode } from '../utilities/constants';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
@Component({
  selector: 'medReviewChild',
  templateUrl: './medReviewChild.html'
})

export class medReviewChild extends iAppDialogWindow {
  public prescribedrug = Resource.prescribedrugs;
  public Styles = ControlStyles;
  private LayoutRoot: Grid = new Grid();
  @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
    if (c) { this.LayoutRoot = c; }
  };

  private udReviewafter: iUpDownBox = new iUpDownBox();
  @ViewChild("udReviewafterTempRef", { read: iUpDownBox, static: false }) set _udReviewafter(c: iUpDownBox) {
    if (c) { this.udReviewafter = c; }
  };

  private cboreviewAfterUOM: iComboBox = new iComboBox();
  @ViewChild("cboreviewAfterUOMTempRef", { read: iComboBox, static: false }) set _cboreviewAfterUOM(c: iComboBox) {
    if (c) { this.cboreviewAfterUOM = c; }
  };

  override _DataContext: ReviewPeriodVM;
  override get DataContext() {
    return this._DataContext;
  }
  @Input() override set DataContext(value: ReviewPeriodVM) {
    this._DataContext = value;

  }

  ovm: ReviewPeriodVM;
  public objMsgBox: iMessageBox;
  constructor() {
    super();
   
  }

  ngAfterViewInit(): void {
    this.ovm = this.DataContext;
}
  private ChildWindow_UnLoaded(sender: Object, e: RoutedEventArgs): void {

  }
  private ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void {

  }
  public oKClick(out1: (objManageReviewPeriod: ManageReviewPeriod) => void): boolean {
    let objManageReviewPeriod: ManageReviewPeriod; 
    
        let bRetVal: boolean = true;
        objManageReviewPeriod = null;
        bRetVal = this.Validations();
        if (bRetVal) {
          objManageReviewPeriod = this.ovm.FillReviewPeriodDetails();
        }
     out1(objManageReviewPeriod); 
     return bRetVal;
    }
  private Validations(): boolean {
    this.objMsgBox = new iMessageBox();
    this.ovm.GetStopDTTMThruDuration();
    this.ovm.GetStopDTTMThruInfusionPeriod();
    let ReviewafterValid: boolean = String.IsNullOrEmpty(this.ovm.ReviewAfter) || String.Equals(this.ovm.ReviewAfter, "-1.79769313486232E+308") || String.Equals(this.ovm.ReviewAfter, "-2147483648.0") || String.Equals(this.ovm.ReviewAfter, "-2147483648");
    if (!ReviewafterValid && this.ovm.ReviewafterUOM == null && String.IsNullOrEmpty(this.ovm.ReviewAfterDateTime)) {
      if (this.objMsgBox != null) {
        this.ovm.FocusControl = "cboreviewAfterUOM";
        this.objMsgBox.Message = Resource.prescribedrugs.Errmsg_ReviewPeriodUOM;
        this.objMsgBox.MessageButton = MessageBoxButton.OK;
        this.objMsgBox.Show();
      }
      return false;
    }
    if (ReviewafterValid && this.ovm.ReviewafterUOM != null && !String.IsNullOrEmpty(this.ovm.ReviewafterUOM.DisplayText) && !String.IsNullOrEmpty(this.ovm.ReviewafterUOM.Value) && String.IsNullOrEmpty(this.ovm.ReviewAfterDateTime)) {
      if (this.objMsgBox != null) {
        this.ovm.FocusControl = "udReviewafter";
        this.objMsgBox.Message = Resource.prescribedrugs.Errmsg_ReviewPeriod;
        this.objMsgBox.MessageButton = MessageBoxButton.OK;
        this.objMsgBox.Show();
      }
      return false;
    }
    if (ReviewafterValid && this.ovm.ReviewafterUOM == null && String.IsNullOrEmpty(this.ovm.ReviewAfterDateTime)) {
      if (this.objMsgBox != null) {
        this.ovm.FocusControl = "udReviewafter";
        this.objMsgBox.Message = Resource.prescribedrugs.Errmsg_ReviewPeriod;
        this.objMsgBox.MessageButton = MessageBoxButton.OK;
        this.objMsgBox.Show();
      }
      return false;
    }
    if (this.ovm.PrescriptionEndTime.NotEquals(DateTime.MinValue) && this.ovm.ReviewAfterDTTM.NotEquals(DateTime.MinValue) && DateTime.LessThanOrEqualTo(this.ovm.PrescriptionEndTime , this.ovm.ReviewAfterDTTM)) {
      if (this.objMsgBox != null) {
        this.ovm.FocusControl = "udReviewafter";
        this.objMsgBox.Message = Resource.prescribedrugs.Errmsg_ReviewPeriodValueforStopDTTM;
        this.objMsgBox.MessageButton = MessageBoxButton.OK;
        this.objMsgBox.Show();
      }
      return false;
    }
    if (this.ovm.PrescriptionEndTime.Equals(DateTime.MinValue) && this.ovm.ReviewAfterDTTM.NotEquals(DateTime.MinValue) && this.ovm.StopDTTMThruDuration.NotEquals(DateTime.MinValue) && DateTime.GreaterThan(this.ovm.ReviewAfterDTTM , this.ovm.StopDTTMThruDuration)) {
      if (this.objMsgBox != null) {
        this.ovm.FocusControl = "udReviewafter";
        this.objMsgBox.Message = Resource.prescribedrugs.Errmsg_ReviewPeriodValueforDuration;
        this.objMsgBox.MessageButton = MessageBoxButton.OK;
        this.objMsgBox.Show();
      }
      return false;
    }
    if (!String.Equals(this.ovm.InfusionType, InfusionTypeCode.INTERMITTENT)) {
      if (this.ovm.PrescriptionEndTime.Equals(DateTime.MinValue) && this.ovm.ReviewAfterDTTM.NotEquals(DateTime.MinValue) && this.ovm.StopDTTMThruInfusionPeriod.NotEquals(DateTime.MinValue) && DateTime.GreaterThanOrEqualTo(this.ovm.ReviewAfterDTTM , this.ovm.StopDTTMThruInfusionPeriod)) {
        if (this.objMsgBox != null) {
          this.ovm.FocusControl = "udReviewafter";
          this.objMsgBox.Message = Resource.prescribedrugs.Errmsg_ReviewPeriodValueforInfusionPeriod;
          this.objMsgBox.MessageButton = MessageBoxButton.OK;
          this.objMsgBox.Show();
        }
        return false;
      }
    }
    return true;
  }
}
