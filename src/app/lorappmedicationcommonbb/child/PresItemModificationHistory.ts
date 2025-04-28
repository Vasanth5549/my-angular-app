import { Component, Inject, InjectionToken, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow } from 'epma-platform/models';
import { AppDialog, Grid } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { PresItemModifyHistoryDetails, PrescriptionItemDetailsVM } from '../viewmodel/prescriptionitemdetailsvm';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { GridExtension } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { GridComponent } from '@progress/kendo-angular-grid';
@Component({
    selector: 'PresItemModificationHistory',
    templateUrl: './PresItemModificationHistory.html',
    styleUrls: ['./PresItemModificationHistory.css']
})
export class PresItemModificationHistory extends iAppDialogWindow {
    private LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };

    public afterViewInitColumnLoaded = false;
    public grdAdminHistoryList: GridExtension = new GridExtension();
    @ViewChild("grdTitratedDoseTempRef", { read: GridComponent, static: false }) set _grdAdminHistoryList(c: GridComponent) {
        if (c) {
            this.grdAdminHistoryList.grid = c;
            this.grdAdminHistoryList.columns = c.columns;
            
        }
    };

    ngAfterViewInit(): void {        
        this.PresItemModificationHistory_Loaded({},null);
    }

    presItemModifyHistoryDetails: PresItemModifyHistoryDetails;

    constructorImpl(prescriptionItemOid: number, itemDetail: PrescriptionItemDetailsVM) {
        this.Loaded = (s, e) => { this.PresItemModificationHistory_Loaded(s, e); };
        this.presItemModifyHistoryDetails = new PresItemModifyHistoryDetails(prescriptionItemOid, itemDetail);
    }

    constructor() {
        super();
    }

    PresItemModificationHistory_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.presItemModifyHistoryDetails.UpdateHistory();
        this.DataContext = this.presItemModifyHistoryDetails;
        this.grdAdminHistoryList.SetBinding('data', this.presItemModifyHistoryDetails.ModificationHistory);
    }
}
