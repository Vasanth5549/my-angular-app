import { Component, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow, AppSessionInfo, HtmlPage, Visibility } from 'epma-platform/models';
import { AppDialog, Grid } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { GridExtension } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { GridComponent } from '@progress/kendo-angular-grid';
import { OrderSetSecMezzanineVM } from '../viewmodel/ordersetsecmezzanineVM';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { GridViewCellClickEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { Resource } from "../resource";

@Component({
    selector: 'OrderSetsLinks',
    templateUrl: './OrderSetsLinks.html'
})

export class OrderSetsLinks extends iAppDialogWindow {

    public LayoutRoot: Grid;
    public resKey = Resource.ORSSecMezzanine;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    public grdLinks: GridExtension = new GridExtension();
    @ViewChild("grdLinksTempRef", { read: GridComponent, static: false }) set _grdLinks(c: GridComponent) {
        if (c) { 
            this.grdLinks.grid = c;
            this.grdLinks.columns = c.columns;
        }
    };

    objOrderSetSecMezzanineVM: OrderSetSecMezzanineVM = null;

    constructor() {
        // InitializeComponent();
        super();
        this.grdLinks.onCellClick = (s, e) => { this.grdLinks_onCellClick(s, e); };
    }

    ngOnInit(): void {
        this.grdLinks.RowIndicatorVisibility = Visibility.Collapsed;
        this.ChildWindow_Loaded({}, {});
    }

    ngAfterViewInit(): void {
        this.grdLinks.GenerateColumns();
    }

    grdLinks_onCellClick(sender: Object, args: GridViewCellClickEventArgs): void {
        if (this.grdLinks.GetColumnIndexByName("Description") == args.ColumnIndex) {
            let GrdCellValue: Object = this.grdLinks.GetRowData(args.RowIndex);
            if (!(String.IsNullOrEmpty(GrdCellValue.ToString()))) {
                let argsobj: Object[] = new Array(5);
                argsobj[0] = 0;
                argsobj[1] = "orderset";
                argsobj[2] = AppSessionInfo.AMCV;
                argsobj[3] = 0;
                if (GrdCellValue != null) {
                    argsobj[4] = "http://" + GrdCellValue.ToString();
                }
                else {
                    argsobj[4] = String.Empty;
                }
                let returnValue: Object = HtmlPage.Window.Invoke("LaunchLink", argsobj[0], argsobj[1], argsobj[2], argsobj[3], argsobj[4]);
            }
        }
    }
    private ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.objOrderSetSecMezzanineVM = ObjectHelper.CreateType<OrderSetSecMezzanineVM>(this.DataContext, OrderSetSecMezzanineVM);
        this.grdLinks.onCellClick = (s,e) => this.grdLinks_onCellClick(s, e);
        this.grdLinks.SetBinding('data', this.DataContext.sLink);
    }
    private ChildWindow_UnLoaded(sender: Object, e: RoutedEventArgs): void {
        // this.grdLinks.onCellClick -= grdLinks_onCellClick;
        this.grdLinks.onCellClick = (s,e) => this.grdLinks_onCellClick(s, e);
    }
}
