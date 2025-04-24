import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow } from 'epma-platform/models';
import { AppDialog, Grid } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ConditionalDoseVM } from 'src/app/lorappmedicationcommonbb/viewmodel/ConditionalDoseVM';
import { GridViewCellClickEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { GridExtension } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { ConditionalDoseRegimeView } from '../view/ConditionalDoseRegimeView';
@Component({
  selector: 'ConditionalDoseChildView',
  templateUrl: './ConditionalDoseChildView.html'
})
export class ConditionalDoseChildView extends iAppDialogWindow {

  CondVM: ConditionalDoseVM = null;

  private LayoutRoot: Grid;
  @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
    if (c) { this.LayoutRoot = c; }
  };
  conditionalDoseRegimeView1: ConditionalDoseRegimeView = new ConditionalDoseRegimeView();

  override _DataContext: ConditionalDoseVM;
  override get DataContext() {
    console.log(this._DataContext);
    return this._DataContext;
  }
  @Input() override set DataContext(value: ConditionalDoseVM) {
    this._DataContext = value;
    this.CondVM = value;
  }
  constructor() {
    super();
    // InitializeComponent();
  }
  ngOnInit(): void {
    this.ChildWindow_Loaded(null, null);
    this.DataContext.IsOtherDose = this.DataContext && this.DataContext.IsOtherDose ? this.DataContext.IsOtherDose : false;
  }
  ngAfterViewInit(): void {
    let grdConditionalDose: GridExtension = ObjectHelper.CreateType<GridExtension>(this.conditionalDoseRegimeView1.FindName("grdConditionalDose"), GridExtension);
    if (grdConditionalDose != null) {
      this.conditionalDoseRegimeView1.CellClick = (s, e) => { this.grdConditionalDose_onCellClick(s, e); };
    }
  }
  grdConditionalDose_onCellClick(sender: Object, args: GridViewCellClickEventArgs): void {
    if (String.Compare(args.ColumnCell.Column.UniqueName, "DoseInstruction") == 0) {
      this.CondVM.IsOtherDose = false;
      this.appDialog.DialogResult = true;
      if (super.onDialogClose != null)
        super.onDialogClose(ObjectHelper.CreateObject(new AppDialogEventargs(), { Content: this, Result: AppDialogResult.Ok, AppChildWindow: super.appDialog }));
    }
  }
  public OKButtonClick(): boolean {
    return (this.CondVM.Validate());
  }
  public CancelButtonClick(): void {
    this.CondVM.RestoreConditionalDose();
  }
  ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void {

    this.CondVM = ObjectHelper.CreateType<ConditionalDoseVM>(this.DataContext, ConditionalDoseVM);
  }
}
