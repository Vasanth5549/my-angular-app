import { Component, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow, ObservableCollection, List } from 'epma-platform/models';
import { AppDialog, Grid } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { GridExtension } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { GridComponent } from '@progress/kendo-angular-grid';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { OrderSetSecMezzanineVM, PrescriptionItemAssociations } from '../viewmodel/ordersetsecmezzanineVM';
import { Resource } from "../resource";

@Component({
    selector: 'PopUpGridForOrderset',
    templateUrl: './PopUpGridForOrderset.html'
})

export class PopUpGridForOrderset extends iAppDialogWindow {

    private LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    grdOrderSetList: GridExtension = new GridExtension();
    @ViewChild("grdOrderSetListTempRef", { read: GridComponent, static: false }) set _grdOrderSetList(c: GridComponent) {
        if (c) { this.grdOrderSetList.grid = c; this.grdOrderSetList.columns = c.columns;}
    };
    private _contentLoaded: Boolean;
    @ViewChild("_contentLoadedTempRef", { read: Boolean, static: false }) set __contentLoaded(c: Boolean) {
        if (c) { this._contentLoaded = c; }
    };

    public resKey = Resource.ORSSecMezzanine;

    constructor() {
        // InitializeComponent();
        super();
    }
    private iAppDialogWindow_Loaded(sender: Object, e: RoutedEventArgs): void {

    }
    ngAfterViewInit() {
        console.log('ngAfterViewInit', this.DataContext);
        console.log('grdOrderSetList', this.grdOrderSetList)
        this.grdOrderSetList.SetBinding('data', this.DataContext.PrescriptionItemList)
    }
    // onClosed: OnAppDialogClose
    public static GetOrdersetRecordsFromVM(PrescriptionItemList: ObservableCollection<PrescriptionItemAssociations>, onClosed: Function): void {
        if (PrescriptionItemList != null) {
            let __LstItemsInSequence: List<PrescriptionItemAssociations> = PrescriptionItemList.Where(x => x != null && x.PrescrptionItem != null && x.PrescrptionItem.OsInstance != null && x.PrescrptionItem.OsInstance.OsIsSequential).OrderBy(x => x.PrescrptionItem.OsInstance.OsDisplayOrder).ToList();
            let vm: OrderSetSecMezzanineVM = ObjectHelper.CreateObject(new OrderSetSecMezzanineVM(), { PrescriptionItemList: new ObservableCollection<PrescriptionItemAssociations>(__LstItemsInSequence) });
            let objPopUpGridForOrderset: PopUpGridForOrderset = new PopUpGridForOrderset();
            objPopUpGridForOrderset.DataContext = vm;
            AppActivity.OpenWindow("Sequential prescription", objPopUpGridForOrderset, (s, e) => {onClosed(s)}, "", false, 350, 750, false, WindowButtonType.Close, null, null);
        }
    }
}
