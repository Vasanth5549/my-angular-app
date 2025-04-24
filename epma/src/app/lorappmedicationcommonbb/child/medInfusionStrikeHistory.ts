import { AfterViewInit, Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity, CommonBB } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow, IEnumerable } from 'epma-platform/models';
import { AppDialog, DataTemplate, EventArgs, MouseButtonEventArgs, iLabel } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { infstrikethroughVM } from '../viewmodel/infstrikethroughvm';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { GridExtension, GridViewRow, RowEventArgs, RowLoadedEventArgs, SelectionChangeEventArgs, iGridViewHeaderRow } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { MedsScanProductDetailVM } from '../viewmodel/prescriptionitemdetailsvm';
import { InfusionStrikeOutConceptcodes } from '../utilities/constants';
import { InfStrikethroughConceptCodeData } from '../utilities/profiledata';
import { GridComponent } from '@progress/kendo-angular-grid';
import { ScanRecMedicationMezzanineCa } from './ScanRecMedicationMezzanine';

import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";

//revisitmeyasik visibillity imported by me
import { Visibility } from 'src/app/shared/epma-platform/controls-model/Visibility';

@Component({
    selector: 'medinfusionstrikehistory',
    templateUrl: './medinfusionstrikehistory.html',
})

export class medinfusionstrikehistory extends iAppDialogWindow implements AfterViewInit,OnInit {
    ovm: infstrikethroughVM;
    lblviewrecordmedication_MouseLeftButtonUp_func: Function;

    public Styles = ControlStyles;

    override _DataContext: infstrikethroughVM;
    override get DataContext() {
        return this._DataContext;
    }
    @Input() override set DataContext(value: infstrikethroughVM) {
        this._DataContext = value;
    }

    public grdinfusionHistoryList: GridExtension = new GridExtension();
    @ViewChild("grdinfusionHistoryListTempRef", { read: GridComponent, static: false }) set _grdinfusionHistoryList(c: GridComponent) {
        if (c) {
            this.grdinfusionHistoryList.grid = c;
            this.grdinfusionHistoryList.columns = c.columns;
        }
    };

    //revisitmeyasik
    // private childgrid: iGridViewTableDefinition;
    // @ViewChild("childgridTempRef", {read:iGridViewTableDefinition, static: false }) set _childgrid(c: iGridViewTableDefinition){
    //     if(c){ this.childgrid  = c; }
    // };

    private lblviewrecordmedication: iLabel;
    @ViewChild("lblviewrecordmedicationTempRef", { read: iLabel, static: false }) set _lblviewrecordmedication(c: iLabel) {
        if (c) { this.lblviewrecordmedication = c; }
    };
    private _contentLoaded: Boolean;
    @ViewChild("_contentLoadedTempRef", { read: Boolean, static: false }) set __contentLoaded(c: Boolean) {
        if (c) { this._contentLoaded = c; }
    };


    constructor() {
        super();
        //   InitializeComponent();
        this.Loaded = (s, e) => { this.medinfusionstrikehistory_Loaded(s, e); };
    }
    ngOnInit(): void {
        this.grdinfusionHistoryList.ItemsSource = this.DataContext.Ostrikethrinfhistory;
        this.grdinfusionHistoryList_DataLoaded({}, {})
        // this.grdinfusionHistoryList.GridSelectionChange = (s, e) => { this.grdinfusionHistoryList_SelectionChanged(s, e) };
    }
    ngAfterViewInit(): void {
        // this.grdinfusionHistoryList.SetBinding("data", this.DataContext.Ostrikethrinfhistory);
        this.grdinfusionHistoryList.RowIndicatorVisibility = Visibility.Visible
        this.lblviewrecordmedication_MouseLeftButtonUp_func = (s, e) => {this.lblviewrecordmedication_MouseLeftButtonUp(s, e)};

    }

    @ViewChildren(DataTemplate) dataTemplates: QueryList<DataTemplate>;
    grdData: GridExtension = new GridExtension();

    rowLoaded(context: any) {
        let rowEventArgs = this.grdData.GetRowEventArgs(
            this.dataTemplates,
            context
        );
        this.grdinfusionHistoryList_RowLoaded({}, rowEventArgs);
    }


    medinfusionstrikehistory_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.DataContext = ObjectHelper.CreateType<infstrikethroughVM>(this.DataContext, infstrikethroughVM);
    }
    private grdinfusionHistoryList_DataLoaded(sender: Object, e: EventArgs): void {
        if (this.grdinfusionHistoryList.GetRowCount() > 0) {
            this.grdinfusionHistoryList.setSelectedItemByIndex(this.grdinfusionHistoryList.GetRowCount() - 1);
        }
    }

    //revisitmeyasik
    //   private grdstrikehistorychld_RowIsExpandedChanging(sender: Object, e: Windows.Controls.GridView.RowCancelEventArgs): void {
    private grdstrikehistorychld_RowIsExpandedChanging(sender: Object, e: any): void {
        if (e.Row != null) {
            let oGridRow: GridViewRow = ObjectHelper.CreateType<GridViewRow>(e.Row, GridViewRow);
            if (e.Row.IsSelected == false)
                e.Row.IsSelected = true;
            if (oGridRow != null) {
                let oAdminListItem: infstrikethroughVM.strikethrinfhistory = ObjectHelper.CreateType<infstrikethroughVM.strikethrinfhistory>(this.grdinfusionHistoryList.SelectedItem, infstrikethroughVM.strikethrinfhistory);
                if (this.DataContext != null) {
                    this.DataContext.strikethrinfhis = ObjectHelper.CreateType<infstrikethroughVM.strikethrinfhistory>(oGridRow.Item, infstrikethroughVM.strikethrinfhistory);
                }
                if (oAdminListItem != null && this.DataContext != null && oGridRow.IsExpanded) {
                    oAdminListItem.IsStrikeHistoryRowExpanded = true;
                    this.DataContext.GetStrikeinfchldDetl(oAdminListItem.MedAdminHistoryOID);
                }
                else {
                    oAdminListItem.IsStrikeHistoryRowExpanded = false;
                }
            }
        }
    }
    private grdstrikehistorychld_RowIsExpandedChanged(sender: Object, e: RowEventArgs): void {
        if (e.Row.IsSelected == false)
            e.Row.IsSelected = true;
    }
    private grdstrikehistorychld_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {

    }
    private grdstrikehistorychld_Loaded(sender: Object, e: RoutedEventArgs): void {

    }
    private grdinfusionHistoryList_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
        if (this.grdinfusionHistoryList.GetRowCount() > 0) {
            //revisitmeyasik
            // let t: Type = typeof(iGridViewHeaderRow);
            let t: any = typeof (iGridViewHeaderRow);
            //revisitmeyasik
            //   if (e.Row.GetType() != t) {
            if (t) {
                let EntireAdminText: string = CommonBB.GetText(InfusionStrikeOutConceptcodes.StrikeOutEntireAdmin, InfStrikethroughConceptCodeData.ConceptCodes);
                let row: GridViewRow = ObjectHelper.CreateType<GridViewRow>(e.Row, GridViewRow);
                if (row != null) {
                    let oAdminListItem1: infstrikethroughVM.strikethrinfhistory = ObjectHelper.CreateType<infstrikethroughVM.strikethrinfhistory>(row.Item, infstrikethroughVM.strikethrinfhistory);
                    if (oAdminListItem1 != null) {
                        if (!String.Equals(oAdminListItem1.ActonCode, EntireAdminText, StringComparison.CurrentCultureIgnoreCase)) {
                            row.IsExpandable = false;
                            //revisitmeyasik
                            //this.grdinfusionHistoryList.HideHierarchyButton = true;
                        }
                        else {
                            row.IsExpandable = true;
                        }
                    }
                }
            }
        }
    }
    private lblviewrecordmedication_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
        if (this.DataContext != null) {
            let MedsScanProductlinkDetails: MedsScanProductDetailVM;
            let oViewRecMed: infstrikethroughVM = ObjectHelper.CreateType<infstrikethroughVM>(this.DataContext, infstrikethroughVM);
            let oScanRecMedicationMezzanine: ScanRecMedicationMezzanineCa = new ScanRecMedicationMezzanineCa();
            MedsScanProductlinkDetails = new MedsScanProductDetailVM();
            if (this.grdinfusionHistoryList.GetSelectedRows().Count > 0 && this.grdinfusionHistoryList.SelectedItem != null) {
                let oAdminListItem: infstrikethroughVM.strikethrinfhistory = ObjectHelper.CreateType<infstrikethroughVM.strikethrinfhistory>(this.grdinfusionHistoryList.SelectedItem, infstrikethroughVM.strikethrinfhistory);
                MedsScanProductlinkDetails.MedAdminHistoryOID = oAdminListItem.MedAdminHistoryOID;
                MedsScanProductlinkDetails.MedAdminOID = oAdminListItem.MedAdminOID;
            }
            MedsScanProductlinkDetails.GetScanRecordDetails();
        }
    }
     grdinfusionHistoryList_SelectionChanged(sender: Object, e: SelectionChangeEventArgs): void {
        if (this.grdinfusionHistoryList.GetSelectedRows().Count > 0 && this.grdinfusionHistoryList.SelectedItem != null) {
            let Ostrikethrinfhistory: infstrikethroughVM.strikethrinfhistory = ObjectHelper.CreateType<infstrikethroughVM.strikethrinfhistory>(this.grdinfusionHistoryList.SelectedItem, infstrikethroughVM.strikethrinfhistory);
            let lstAdminListItem: IEnumerable<infstrikethroughVM.strikethrinfhistory> = this.grdinfusionHistoryList.SelectedItems.Cast<infstrikethroughVM.strikethrinfhistory>();
            let nSelectedRowCount: number = lstAdminListItem.Where(x => ((String.Equals(x.ActonCode, "Begun") || String.Equals(x.ActonCode, "Change bag")) && (x.IsMedScannedProduct == '1'))).Count();
            if (nSelectedRowCount == lstAdminListItem.Count()) {
                //revisitmeyasik Visibility I imported
                this.lblviewrecordmedication.Visibility = Visibility.Visible;
            }
            else {
                this.lblviewrecordmedication.Visibility = Visibility.Collapsed;
            }
        }
    }
}
