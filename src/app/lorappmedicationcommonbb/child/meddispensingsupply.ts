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
import { GridExtension } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { GridComponent } from '@progress/kendo-angular-grid';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { Resource } from '../resource';
import { PrescriptionItemDetails } from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { PrescriptionItemDetailsVM } from '../viewmodel/prescriptionitemdetailsvm';
@Component({
    selector: 'meddispensingsupply',
    templateUrl: './meddispensingsupply.html',
    styleUrls: ['./meddispensingsupply.css']
})
export class meddispensingsupply extends iAppDialogWindow {
    public dccl = Resource.dispensingsupply;

    public Drugprepdetails: Grid;
    @ViewChild("DrugprepdetailsTempRef", { read: Grid, static: false }) set _Drugprepdetails(c: Grid) {
        if (c) { this.Drugprepdetails = c; }
    };
    public grdDrugprepdetails: GridExtension = new GridExtension();
    @ViewChild("grdDrugprepdetailsTempRef", { read: GridComponent, static: false }) set _grdDrugprepdetails(c: GridComponent) {
        if (c) { this.grdDrugprepdetails.grid = c; }
    };
    public oVM: PrescriptionItemDetailsVM;
    constructor() {
        super();
        // InitializeComponent();
    }
    ngAfterViewInit(): void {
        this.meddispensingsupply_Loaded({},null);
    }
    constructorImpl(PrescriptionItemOID:number) {
        this.Loaded = (s, e) => { this.meddispensingsupply_Loaded(s, e); };
        this.oVM = new PrescriptionItemDetailsVM();
        this.oVM.PrescriptionItemOID = PrescriptionItemOID;
    }
    meddispensingsupply_Loaded(sender?: Object, e?: RoutedEventArgs): void {
        this.oVM.GetSupDispInst(this.oVM.PrescriptionItemOID);
        this.grdDrugprepdetails.SetBinding("data", this.oVM.SupDispInst);
    }
}
