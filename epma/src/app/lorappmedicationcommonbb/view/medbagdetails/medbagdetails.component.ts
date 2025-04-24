import { Component, Input, ViewChild } from '@angular/core';
import { GridComponent } from '@progress/kendo-angular-grid';
import DateTime from 'epma-platform/DateTime';
import { Grid, UserControl } from 'epma-platform/controls';
import 'epma-platform/stringextension';
import * as ControlStyles from "src/app/shared/epma-platform/controls/ControlStyles";
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { GridExtension } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { BagDetailsVM } from '../../viewmodel/BagDetailsVM';


@Component({
  selector: 'app-medbagdetails',
  templateUrl: './medbagdetails.component.html',
  styleUrls: ['./medbagdetails.component.css']

})

export class medbagdetails extends UserControl {
  isRx: boolean = false;
  public Styles = ControlStyles;
  private LayoutRoot: Grid;
  // public BagDTTMDisplay: DTTMDisplay;
  @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
    if (c) { this.LayoutRoot = c; }
  };

  grdbagdetails: GridExtension = new GridExtension();
  @ViewChild('grdbagdetailsTempRef', { read: GridComponent, static: false }) set _grdBag(
    c: GridComponent
  ) {
    if (c) {
      this.grdbagdetails.grid = c;
      this.grdbagdetails.columns = c.columns;
    }
  }


  override _DataContext: BagDetailsVM;
  override get DataContext() {
    return this._DataContext;
  }
  @Input() override set DataContext(value: BagDetailsVM) {
    this._DataContext = value;

  }

  constructor() {
    super();

    this.Loaded = (s, e) => { this.ChildWindow_Loaded(s, e); };
  }
  private ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void { }


  ngOnInit(): void { }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.DataContext.InfBagDetails)
        this.grdbagdetails.SetBinding("data", this.DataContext.InfBagDetails);
    }, 950);

  }


  ExpiryDateDisplayValue(expval?: DateTime) {
    if (expval != DateTime.MinValue) {
      return expval.ToString("dd-MMM-yyyy")
    }
    return '';
  }

  EndDateDisplayValue(expval?: DateTime) {
    if (expval != DateTime.MinValue) {
      return expval.ToString("dd-MMM-yyyy HH:mm")
    }
    return '';
  }
}
