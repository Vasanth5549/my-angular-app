import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow, IEnumerable, Visibility } from 'epma-platform/models';
import { Border, EventArgs, Grid, MouseButtonEventArgs, iLabel } from 'epma-platform/controls';
import 'epma-platform/stringextension';
import { ObjectHelper } from 'epma-platform/helper';
import { GridExtension, SelectionChangeEventArgs } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { GridComponent } from '@progress/kendo-angular-grid';
import { AdminHistoryList, MedsScanProductDetailVM, PrescriptionItemDetailsVM } from '../viewmodel/prescriptionitemdetailsvm';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import * as ControlStyles from '../../shared/epma-platform/controls/ControlStyles'
import { ScanRecMedicationMezzanineCa } from './ScanRecMedicationMezzanine';
import { CustomDatePipe } from 'epma-platform/convertor-pipes';
@Component({
    selector: 'MedsAdminSlotHistory',
    templateUrl: './medsadminslothistory.html',
    styleUrls: ['./medsadminslothistory.css']

})
export class MedsAdminSlotHistory extends iAppDialogWindow implements AfterViewInit {
    public LayoutRoot: Grid;
    Styles = ControlStyles;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    
    public grdAdminHistoryList: GridExtension = new GridExtension();
    @ViewChild("grdAdminHistoryListTempRef", { read: GridComponent, static: false })
    set _grdAdminHistoryList(c: GridComponent) {
        if (c) {
            this.grdAdminHistoryList.grid = c;
            this.grdAdminHistoryList.columns = c.columns;
        }
    };
    tooltipText : string ="";
    public brdSTA: Border;
    @ViewChild("brdSTATempRef", { read: Border, static: false }) set _brdSTA(c: Border) {
        if (c) { this.brdSTA = c; }
    };
    public TitleLbl: iLabel;
    @ViewChild("TitleLblTempRef", { read: iLabel, static: false }) set _TitleLbl(c: iLabel) {
        if (c) { this.TitleLbl = c; }
    };
    public showTooltip(tooltipstr: string): void {
      this.tooltipText = tooltipstr;

      }

    public grdModifydata: GridExtension = new GridExtension();
    @ViewChild("grdModifydataTempRef", { read: GridComponent, static: false })
    set _grdModifydata(c: GridComponent) {
        if (c) {
            this.grdModifydata.grid = c;
            this.grdModifydata.columns = c.columns;
        }
    };
    public lblviewrecordmedication: iLabel;
    @ViewChild("lblviewrecordmedicationTempRef", { read: iLabel, static: false }) set _lblviewrecordmedication(c: iLabel) {
        if (c) { this.lblviewrecordmedication = c; }
    };
    public objPrescriptionItemDetailsVM: PrescriptionItemDetailsVM;
    oAdminHistoryList: AdminHistoryList; 
    lblviewrecordmedication_MouseLeftButtonUp_Func : Function;
    constructor() {
        super();
        this.oAdminHistoryList = new AdminHistoryList();
    }
    ngOnInit(): void {
        this.grdAdminHistoryList.GridSelectionChange = (s, e) => { this.grdAdminHistoryList_SelectionChanged(s, e); };
        this.MedAdminHistory_Loaded({}, {});
    }

    ngAfterViewInit(): void {
        this.grdAdminHistoryList.GenerateColumns();
        console.log(this.DataContext);
        this.lblviewrecordmedication_MouseLeftButtonUp_Func = (s, e) =>{this.lblviewrecordmedication_MouseLeftButtonUp(s, e)};
    }

    MedAdminHistory_Loaded(sender: Object, e: RoutedEventArgs): void {
        if (this.MedAdminOID != 0 || this.PresSchOID != 0) {
            this.oAdminHistoryList.GetAdminHistoryList(this.MedAdminOID, this.PresSchOID);
            this.DataContext = this.oAdminHistoryList;
            this.oAdminHistoryList.medadminslotservicedata.subscribe(x => {
                this.grdAdminHistoryList.SetBinding("data", this.oAdminHistoryList.AdminHistList);
                if (this.grdAdminHistoryList.GetRowCount() > 0) {
                    let _Index = this.grdAdminHistoryList.GetRowCount()-1;
                    this.grdAdminHistoryList.setSelectedItemByIndex(_Index);
                    if (this.grdAdminHistoryList.SelectedItem != null) {
                        this.grdAdminHistoryList_SelectionChanged(null, null);
                        this.grdAdminHistoryList.ScrollIntoView(this.grdAdminHistoryList.SelectedItem);
                    }
                }
            })
        }
        Busyindicator.SetStatusIdle("MedChart");
    }

    private cmdCloseButton_Click(sender: Object, e: EventArgs): void {
        this.appDialog.DialogResult = false;
    }

    public MedAdminOID: number;
    public PresSchOID: number;
    public PrescriptionItemOID: number;
    public MCVersion: string;

    public grdAdminHistoryList_SelectionChanged(sender: Object, e: SelectionChangeEventArgs): void {
        if (this.grdAdminHistoryList.GetSelectedRows().Count > 0 && this.grdAdminHistoryList.SelectedItem != null) {
            let oAdminListItem: AdminHistoryList = ObjectHelper.CreateType<AdminHistoryList>(this.grdAdminHistoryList.SelectedItem, AdminHistoryList);
            if (this.DataContext != null) {
                this.DataContext = this.oAdminHistoryList;
                this.oAdminHistoryList.GetAdminHistoryListDetails(oAdminListItem.MedAdminHistoryOID, oAdminListItem.ActionCode, oAdminListItem.SlotStatus, oAdminListItem.ActionCodeValue, this.PrescriptionItemOID, this.MCVersion);
                let lstAdminListItem: IEnumerable<AdminHistoryList> = this.grdAdminHistoryList.SelectedItems.Cast<AdminHistoryList>();
                let nSelectedRowCount: number = lstAdminListItem.Where(x => ((String.Equals(x.SlotStatus, "Given") || String.Equals(x.SlotStatus, "Self administered")) && (x.IsMedScannedProduct == '1'))).Count();
                if (nSelectedRowCount == lstAdminListItem.Count()) {
                    this.oAdminHistoryList.IsViewRecMedLinkExists = Visibility.Visible;
                }
                else {
                    this.oAdminHistoryList.IsViewRecMedLinkExists = Visibility.Collapsed;
                }
            }
            this.oAdminHistoryList.medadminslotdetailservicedata.subscribe(x => {
                this.grdModifydata.SetBinding("data", this.oAdminHistoryList.AdminHistListDet);
            })
        }
    }
    private grdAdminHistoryList_DataLoaded(sender: Object, e: EventArgs): void {
        if (this.grdAdminHistoryList.GetRowCount() > 0) {
            this.grdAdminHistoryList.setSelectedItemByIndex(this.grdAdminHistoryList.GetRowCount() - 1);
        }
    }
    public lblviewrecordmedication_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
        if (this.DataContext != null) {
            let MedsScanProductlinkDetails: MedsScanProductDetailVM;
           let oViewRecMed: AdminHistoryList = ObjectHelper.CreateType<AdminHistoryList>(this.DataContext, AdminHistoryList);
            let oScanRecMedicationMezzanine: ScanRecMedicationMezzanineCa = new ScanRecMedicationMezzanineCa();
            MedsScanProductlinkDetails = new MedsScanProductDetailVM();
            if (this.grdAdminHistoryList.GetSelectedRows().Count > 0 && this.grdAdminHistoryList.SelectedItem != null) {
                let oAdminListItem: AdminHistoryList = ObjectHelper.CreateType<AdminHistoryList>(this.grdAdminHistoryList.SelectedItem, AdminHistoryList);
                MedsScanProductlinkDetails.MedAdminHistoryOID = oAdminListItem.MedAdminHistoryOID;
            }
            if (oViewRecMed != null) {
                MedsScanProductlinkDetails.MedAdminOID = oViewRecMed.MedsAdminOID;
                MedsScanProductlinkDetails.PrescriptionItemScheduleOID = oViewRecMed.PresSchOID;
            }
            MedsScanProductlinkDetails.GetScanRecordDetails();

        }
    }
}
