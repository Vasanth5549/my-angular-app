import { AfterViewInit, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { StringComparison, Visibility } from 'epma-platform/models';
import { Color, DataTemplate, SolidColorBrush } from 'epma-platform/controls';
import 'epma-platform/stringextension';
import { ObjectHelper } from 'epma-platform/helper';
import { Grid, GridExtension, GridViewRow, RowLoadedEventArgs } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { GridComponent, RowClassArgs } from '@progress/kendo-angular-grid';
import { iLabel } from 'epma-platform/controls';
import { iAppDialogWindow } from 'epma-platform/models';
import { CConstants, PrescriptionTypes } from '../utilities/constants';
import { RoutedEventArgs } from '../../shared/epma-platform/controls/FrameworkElement';
import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { CommSequentialItem, CommSequentialItemsVM } from '../viewmodel/SequentialItemsVM';
import { Resource } from "../resource";
import { DisplayPrescriptionLineItemPipe } from 'epma-platform/convertor-pipes';
import { DisplayOtherInformationLineItemPipe } from 'src/app/product/shared/pipes/medicationconverters.pipe';

@Component({
    selector: 'medsequentialprescription',
    templateUrl: './medsequentialprescription.html'
})

export class ManageSquenceLink extends iAppDialogWindow implements AfterViewInit {
    public LayoutRoot: Grid;
    public presdrugs = Resource.prescribedrugs;
    public MedLineDisplay = DisplayPrescriptionLineItemPipe;
    public MedOtherDisplay = DisplayOtherInformationLineItemPipe;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };

    public grdsequentialPrescription: GridExtension = new GridExtension();
    @ViewChild('grdsequentialPrescriptionTempRef', { read: GridComponent, static: false })
    set _grdsequentialPrescription(c: GridComponent) {
        if (c) {
            this.grdsequentialPrescription.grid = c;
            this.grdsequentialPrescription.columns = c.columns;
        }
    }

    public lblDisclaimer: iLabel;
    @ViewChild("lblDisclaimerTempRef", { read: iLabel, static: false }) set _lblDisclaimer(c: iLabel) {
        if (c) { this.lblDisclaimer = c; }
    };

    @ViewChildren(DataTemplate) dataTemplates: QueryList<DataTemplate>;

    objSequentialItemsVM: CommSequentialItemsVM;
    oItemVM: CommSequentialItem;
    sPresType: string = PatientContext.PrescriptionType;

    constructor() {
        super();
    }

    ngAfterViewInit(): void {
        this.objSequentialItemsVM = ObjectHelper.CreateType<CommSequentialItemsVM>(this.DataContext, CommSequentialItemsVM);
        this.grdsequentialPrescription.GenerateColumns();
        this.grdsequentialPrescription.SetBinding('data', this.objSequentialItemsVM.MedsSequentialResolve);
        this.iAppDialogWindow_Loaded({}, null);
    }

    private iAppDialogWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
        if (this.objSequentialItemsVM != null && this.objSequentialItemsVM.MedsResolve != null && this.objSequentialItemsVM.MedsResolve.Count > 0) {
            this.sPresType = !String.IsNullOrEmpty(this.objSequentialItemsVM.MedsResolve[0].PrescriptionType) ? this.objSequentialItemsVM.MedsResolve[0].PrescriptionType : PatientContext.PrescriptionType;
        }
        this.grdsequentialPrescription.Columns["StartDTTMVWR"].IsVisible = !this.sPresType.Equals(PrescriptionTypes.ForAdministration, StringComparison.OrdinalIgnoreCase);
        this.grdsequentialPrescription.Columns["SeqAdminStartDateTime"].IsVisible = this.sPresType.Equals(PrescriptionTypes.ForAdministration, StringComparison.OrdinalIgnoreCase);
        this.grdsequentialPrescription.Columns["SeqAdminState"].IsVisible = this.sPresType.Equals(PrescriptionTypes.ForAdministration, StringComparison.OrdinalIgnoreCase);
        this.lblDisclaimer.Visibility = this.sPresType.Equals(PrescriptionTypes.ForAdministration, StringComparison.OrdinalIgnoreCase) ? Visibility.Visible : Visibility.Collapsed;
        this.grdsequentialPrescription.UpdateColumns();
    }

    rowLoaded(context: any) {
        let rowEventArgs = this.grdsequentialPrescription.GetRowEventArgs(
            this.dataTemplates,
            context
        );
        this.grdsequentialPrescription_RowLoaded({}, rowEventArgs);
    }
    rowCallback = (context: RowClassArgs) => {
        let rowStyles = this.grdsequentialPrescription.getRowStyles(context);
        return rowStyles;
    };

    private grdsequentialPrescription_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
        let dataGridRow: GridViewRow;
        if (e.Row != null && e.Row.Item != null) {
            this.oItemVM = ObjectHelper.CreateType<CommSequentialItem>(e.Row.Item, CommSequentialItem);
            if (this.oItemVM instanceof CommSequentialItem) {
                dataGridRow = ObjectHelper.CreateType<GridViewRow>(e.Row, GridViewRow);
                if (this.oItemVM != null && this.oItemVM.PrescriptionItem != null && String.Equals(this.oItemVM.PrescriptionItem.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.OrdinalIgnoreCase)) {
                    dataGridRow = ObjectHelper.CreateType<GridViewRow>(e.Row, GridViewRow);
                    if (dataGridRow != null) {
                       // dataGridRow.Background = new SolidColorBrush(Color.FromArgb(255, 185, 251, 114));
                        e.dataItem['RowStyles'].push('Background_COMPLETED');
                        dataGridRow.IsAlternating = false;
                    }
                }
            }
        }
    }
}