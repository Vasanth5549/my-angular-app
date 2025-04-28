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
import { ClinicalVerificationHistoryDetails } from '../viewmodel/prescriptionitemdetailsvm';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
@Component({
    selector: 'ClinicalVerhislink',
    templateUrl: './ClinicalVerhislink.html',
    styles: []
})
export class ClinicalVerhislink extends iAppDialogWindow {
    public NoRecordsText_Text:string = "No Records Text"
    private LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };

    public grdAdminHistoryList: GridExtension = new GridExtension();
    @ViewChild("grdAdminHistoryListTempRef", { read: GridComponent, static: false }) set _grdAdminHistoryList(c: GridComponent) {
        if (c) {
            this.grdAdminHistoryList.grid = c;
        }
    };

    constructor() {
        super();
    }

    ngAfterViewInit(): void {        
        this.ClinicalHistoryDetails_Loaded({},null);
    }

    ClinicalHistoryDetails: ClinicalVerificationHistoryDetails;
    constructorImpl(prescriptionItemOid: number, MCVersion: string) {
        this.Loaded = (s, e) => { this.ClinicalHistoryDetails_Loaded(s, e); };
        this.ClinicalHistoryDetails = new ClinicalVerificationHistoryDetails();
        this.ClinicalHistoryDetails.PrescriptionItemOid = prescriptionItemOid;
        this.ClinicalHistoryDetails.MCVersion = MCVersion;
    }

    ClinicalHistoryDetails_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.ClinicalHistoryDetails.GetClinicalVerHistory();
        this.DataContext = this.ClinicalHistoryDetails;
        this.grdAdminHistoryList.ItemsSource =this.ClinicalHistoryDetails.ClinicalVHistoryLink;
        this.grdAdminHistoryList.SetBinding('data', this.ClinicalHistoryDetails.ClinicalVHistoryLink);
    }
}
