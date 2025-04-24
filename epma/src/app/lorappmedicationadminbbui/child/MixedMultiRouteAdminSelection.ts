import { Component, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow } from 'epma-platform/models';
import { AppDialog, iRadioButton } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { StackPanel } from 'src/app/shared/epma-platform/controls-model/StackPanel';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { Resource } from '../resource';


@Component({
  selector: 'app-mixedmultirouteadminselection',
  templateUrl: './mixedmultirouteadminselection.html',
  styleUrls: ['./mixedmultirouteadminselection.css']
})
export class MixedMultiRouteAdminSelection extends iAppDialogWindow {
  public oMedsAdminOverview = Resource.MedsAdminChartOverview;
  public Styles = ControlStyles;
  public LayoutRoot: StackPanel;
  @ViewChild("LayoutRootTempRef", { read: StackPanel, static: false }) set _LayoutRoot(c: StackPanel) {
      if (c) { this.LayoutRoot = c; }
  };
  public iRdbMedAdmin: iRadioButton = new iRadioButton();
  @ViewChild("iRdbMedAdminTempRef", { read: iRadioButton, static: false }) set _iRdbMedAdmin(c: iRadioButton) {
      if (c) { this.iRdbMedAdmin = c; }
  };
  public iRdbInfusionAdmin: iRadioButton = new iRadioButton();
  @ViewChild("iRdbInfusionAdminTempRef", { read: iRadioButton, static: false }) set _iRdbInfusionAdmin(c: iRadioButton) {
      if (c) { this.iRdbInfusionAdmin = c; }
  };

  constructor() {
      super();
  }

  ngOnInit(): void {
  }

}
