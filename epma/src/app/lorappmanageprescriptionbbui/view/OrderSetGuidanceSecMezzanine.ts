import { Component, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow } from 'epma-platform/models';
import { AppDialog, Grid } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { OrderSetSecMezzanineVM } from '../viewmodel/ordersetsecmezzanineVM';
import { GridComponent } from '@progress/kendo-angular-grid';
import { GridExtension } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";

@Component({
    selector: 'OrderSetGuidanceSecMezzanine',
    templateUrl: './OrderSetGuidanceSecMezzanine.html'
})

export class OrderSetGuidanceSecMezzanine extends iAppDialogWindow {

    objOrderSetSecMezzanineVM: OrderSetSecMezzanineVM = null;
    public Styles = ControlStyles;

    private LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    private grdLinks: GridExtension = new GridExtension();
    @ViewChild("grdLinksTempRef", { read: GridComponent, static: false }) set _grdLinks(c: GridComponent) {
        if (c) { this.grdLinks.grid = c; }
    };

    constructor() {
        // InitializeComponent();
        super();
    }
    ngOnInit() {
        this.ChildWindow_Loaded({}, {});
    }
    private ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.objOrderSetSecMezzanineVM = ObjectHelper.CreateType<OrderSetSecMezzanineVM>(this.DataContext, OrderSetSecMezzanineVM);
    }
}
