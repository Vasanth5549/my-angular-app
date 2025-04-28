import { Component, ViewChild } from '@angular/core';
import { GridComponent } from '@progress/kendo-angular-grid';
import { Grid, ScrollViewer, iLabel } from 'epma-platform/controls';
import { ObjectHelper } from 'epma-platform/helper';
import { Visibility, iAppDialogWindow } from 'epma-platform/models';
import 'epma-platform/stringextension';
import { MedScanProdDisplayIconPipe } from 'src/app/product/shared/pipes/medicationconverters.pipe';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { GridExtension, SelectionChangeEventArgs, SelectionMode } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { ScanRecMedicationMezzanine } from '../resource/ScanRecMedicationMezzanine.Designer';
import { MedsScanProductDetailVM, ScannedProductdetailInfo } from '../viewmodel/prescriptionitemdetailsvm';

@Component({
    selector: 'ScanRecMedicationMezzanineCa',
    templateUrl: 'ScanRecMedicationMezzanine.html',
    styleUrls: ['ScanRecMedicationMezzanine.css']
})

export class ScanRecMedicationMezzanineCa extends iAppDialogWindow {
    MedsScanProductlinkDetails: MedsScanProductDetailVM;
    scanRecordMed: ScanRecMedicationMezzanine;
    public MedScanProdDisplayIconPipe: MedScanProdDisplayIconPipe;
    ProdScanBackColor: string = "Transparent";
    nSelectedRowIndex: number;

    private LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    private brdHeader: ScrollViewer;
    @ViewChild("brdHeaderTempRef", { read: ScrollViewer, static: false }) set _brdHeader(c: ScrollViewer) {
        if (c) { this.brdHeader = c; }
    };
    private lblProductScannedhdr: iLabel;
    @ViewChild("lblProductScannedhdrTempRef", { read: iLabel, static: false }) set _lblProductScannedhdr(c: iLabel) {
        if (c) { this.lblProductScannedhdr = c; }
    };
    private lblProductScannedhdrValue: iLabel;
    @ViewChild("lblProductScannedhdrValueTempRef", { read: iLabel, static: false }) set _lblProductScannedhdrValue(c: iLabel) {
        if (c) { this.lblProductScannedhdrValue = c; }
    };
    private lblMedicationprescribed: iLabel;
    @ViewChild("lblMedicationprescribedTempRef", { read: iLabel, static: false }) set _lblMedicationprescribed(c: iLabel) {
        if (c) { this.lblMedicationprescribed = c; }
    };
    grdProductDetailList: GridExtension = new GridExtension();
    @ViewChild("grdProductDetailListTempRef", { read: GridComponent, static: false }) set _grdProductDetailList(c: GridComponent) {
        if (c) {
            this.grdProductDetailList.grid = c;
            this.grdProductDetailList.columns = c.columns;
        }
    };
    private lblTotalDoseAdministered: iLabel;
    @ViewChild("lblTotalDoseAdministeredTempRef", { read: iLabel, static: false }) set _lblTotalDoseAdministered(c: iLabel) {
        if (c) { this.lblTotalDoseAdministered = c; }
    };
    private lblTotalDoseValueAdmin: iLabel;
    @ViewChild("lblTotalDoseValueAdminTempRef", { read: iLabel, static: false }) set _lblTotalDoseValueAdmin(c: iLabel) {
        if (c) { this.lblTotalDoseValueAdmin = c; }
    };

    constructor() {
        super();
        this.DataContext = new MedsScanProductDetailVM();
    }
    ngOnInit(): void {
        this.Loaded = (s, e) => { this.FillMedsScanProductDetails_Loaded(s, e); };
    }

    ngAfterViewInit(): void {
        this.grdProductDetailList.RowIndicatorVisibility = Visibility.Visible;
        this.grdProductDetailList.SelectionMode = SelectionMode.Single;
        this.FillMedsScanProductDetails_Loaded(null, null);
        this.DataContext = this.MedsScanProductlinkDetails
    }

    GetResourceString(sKey: string) {
        this.scanRecordMed = new ScanRecMedicationMezzanine();
        return this.scanRecordMed.GetResourceString(sKey);
    }
    FillMedsScanProductDetails_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.MedsScanProductlinkDetails = ObjectHelper.CreateType<MedsScanProductDetailVM>(this.DataContext, MedsScanProductDetailVM);
        if (this.MedsScanProductlinkDetails != null && this.MedsScanProductlinkDetails.oScannedProductdetailInfo != null && this.MedsScanProductlinkDetails.oScannedProductdetailInfo.Count > 0) {
            if (this.MedsScanProductlinkDetails.IsProductScanned == 'M') {
                this.ProdScanBackColor = "Grey";
            }
        }
        this.grdProductDetailList.ItemsSource = this.MedsScanProductlinkDetails.oScannedProductdetailInfo;
        this.nSelectedRowIndex = 0;
        this.grdProductDetailList.setSelectedItemByIndex(this.nSelectedRowIndex);
        let oSelectPrescItem: ScannedProductdetailInfo = ObjectHelper.CreateType<ScannedProductdetailInfo>(this.grdProductDetailList.SelectedItem, ScannedProductdetailInfo);
        if (oSelectPrescItem != null && this.grdProductDetailList.GetSelectedRowCount() > 0) {
            this.MedsScanProductlinkDetails.ProductScannedhdrValue = oSelectPrescItem.Productscanned;
        }

    }
    grdProductDetailList_SelectionChanged(e: SelectionChangeEventArgs): void {
        let oSelectPrescItem: ScannedProductdetailInfo = ObjectHelper.CreateType<ScannedProductdetailInfo>(this.grdProductDetailList.SelectedItem, ScannedProductdetailInfo);
        if (oSelectPrescItem != null && this.grdProductDetailList.GetSelectedRowCount() > 0) {
            this.MedsScanProductlinkDetails.ProductScannedhdrValue = oSelectPrescItem.Productscanned;
        }
    }
}
