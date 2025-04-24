import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DataTemplate, Grid, iCheckBox, iLabel } from 'epma-platform/controls';
import { ObjectHelper } from 'epma-platform/helper';
import { AppDialogEventargs, AppDialogResult, CListItem, ChildWindow, List, ObservableCollection, StringComparison, Visibility, WindowButtonType, iAppDialogWindow } from 'epma-platform/models';
import { AppActivity, MessageBoxButton, MessageBoxResult, MessageBoxType, MessageEventArgs, iMessageBox } from 'epma-platform/services';
import 'epma-platform/stringextension';
import { IPPMABaseVM } from '../viewmodel/ippmabasevm';
// import { resource } from 'selenium-webdriver/http';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { GridExtension, GridViewCell, GridViewCellClickEventArgs, RowLoadedEventArgs, SelectionChangeEventArgs, iGridViewDataColumn } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
//import { MedChartData } from 'src/app/lorappmedicationadminbbui/utilities/globalvariable';
import { GridComponent, RowClassArgs } from '@progress/kendo-angular-grid';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { MedChartData } from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import { DisplayPrescriptionLineItem } from 'src/app/product/shared/convertor/medicationconverters.service';
import { Resource } from '../resource';
import { disconcan1 } from '../resource/disconcan1.designer';
import { reconcile } from '../resource/reconcile.designer';
import { CConstants } from '../utilities/constants';
import { ProfileData } from '../utilities/profiledata';
import { ReconcileComments } from './reconcilecomments';

var that;

@Component({
    selector: 'MedReconcileChild',
    templateUrl: './medreconcilechild.html',
    styleUrls: ['./medreconcilechild.css'],
    styles: [
        `
          .chkboxcolumn {
            width :14px;
          }  
      
          .Mandatoryfieldalignment{
          margin: 12px 0px 4px 0px;
          }
          .gridheight{
            height: 250px;
          }
        `
    ]
})

export class MedReconcileChild extends iAppDialogWindow {
    recon = Resource.reconcile;
    MedLineDisplay: DisplayPrescriptionLineItem;
    private LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    // private grdData: iGrid;
    // @ViewChild("grdDataTempRef", {read:iGrid, static: false }) set _grdData(c: iGrid){
    //     if(c){ this.grdData  = c; }
    // };

    public grdData: GridExtension = new GridExtension();
    @ViewChild("grdDataTempRef", { read: GridComponent, static: false }) set _grdData(c: GridComponent) {
        if (c) {
            this.grdData.grid = c;
            this.grdData.columns = c.columns;
        }
    };
    private PrescriptionItemID: iGridViewDataColumn;
    @ViewChild("PrescriptionItemIDTempRef", { read: iGridViewDataColumn, static: false }) set _PrescriptionItemID(c: iGridViewDataColumn) {
        if (c) { this.PrescriptionItemID = c; }
    };
    private UniqueRowID: iGridViewDataColumn;
    @ViewChild("UniqueRowIDTempRef", { read: iGridViewDataColumn, static: false }) set _UniqueRowID(c: iGridViewDataColumn) {
        if (c) { this.UniqueRowID = c; }
    };
    private Mode: iGridViewDataColumn;
    @ViewChild("ModeTempRef", { read: iGridViewDataColumn, static: false }) set _Mode(c: iGridViewDataColumn) {
        if (c) { this.Mode = c; }
    };
    private Reconciletype: iGridViewDataColumn;
    @ViewChild("ReconciletypeTempRef", { read: iGridViewDataColumn, static: false }) set _Reconciletype(c: iGridViewDataColumn) {
        if (c) { this.Reconciletype = c; }
    };
    private ReconcileComments: iGridViewDataColumn;
    @ViewChild("ReconcileCommentsTempRef", { read: iGridViewDataColumn, static: false }) set _ReconcileComments(c: iGridViewDataColumn) {
        if (c) { this.ReconcileComments = c; }
    };
    private _contentLoaded: Boolean;
    @ViewChild("_contentLoadedTempRef", { read: Boolean, static: false }) set __contentLoaded(c: Boolean) {
        if (c) { this._contentLoaded = c; }
    };

    private _chkGridSelectionRef: QueryList<iCheckBox>;
    @ViewChildren("chkGridSelectionRef", { read: iCheckBox }) set __chkGridSelectionRef(c: QueryList<iCheckBox>) {
        if (c) { this._chkGridSelectionRef = c; }
    };
    private _chkHeaderRowCheckbox: iCheckBox;
    @ViewChild("chkGridHeaderSelectionRef", { read: iCheckBox }) set ___chkRowCheckbox(c: iCheckBox) {
        if (c) { this._chkHeaderRowCheckbox = c; }
    };



    public oReconcileSelReason: List<CListItem>;
    oIPPVM: IPPMABaseVM;
    private oReconcileComments: ReconcileComments;
    private oChildWindow: ChildWindow;
    public get ReconcileReason(): ObservableCollection<CListItem> {
        return this.ReconcileReason;
    }
    public set ReconcileReason(value: ObservableCollection<CListItem>) {
        this.ReconcileReason = value;
    }
    @ViewChildren(DataTemplate) dataTemplates: QueryList<DataTemplate>;
    grdDataMedreconcile: GridExtension = new GridExtension();
    public comobBoxInstance;
    public gridsLastItem: any = null;
    public gridLastItemClicked: any = null;

    constructor() {
        super();
        that = this;
    }
    public constructorIMPL(oVM: IPPMABaseVM) {
        this.DataContext = this.oIPPVM = oVM;
        this.oIPPVM.OnSelectedReconcileReason = (s, e) => { this.oVM_OnSelectedReconcileReason(s, e); };
    }

    ngAfterViewInit(): void {
        this.grdData.GenerateColumns();
        this.MedReconcileSelReason_loaded(null, null);
    }
    ContentScrollEvent(e) {
        if (this.gridsLastItem != null && this.gridLastItemClicked != null && (this.gridsLastItem - 1) == this.gridLastItemClicked) {
            this.gridLastItemClicked = null;
            this.comobBoxInstance.toggle(true);
        } else {
            this.comobBoxInstance.toggle(false);
        }
    }
    getCombo(e) {
        this.comobBoxInstance = e;
    }
    onLastItemClicked(rowIndex) {
        this.gridLastItemClicked = rowIndex;
    }
    GridHeaderCheckboxChange_Func = (s, e) => {
        Object.keys(that).forEach((prop) => (this[prop] = that[prop])); this.GridHeaderCheckboxChange(s, e);
    }
    GridHeaderCheckboxChange(s, e) {
        this.grdData.UpdateCheckBoxSelection(this._chkHeaderRowCheckbox, this._chkGridSelectionRef, true);
    }
    GridRowCheckboxChange_Func = (s, e) => {
        Object.keys(that).forEach((prop) => (this[prop] = that[prop])); this.GridRowCheckboxChange(s, e);
    }
    GridRowCheckboxChange(s, e) {
        this.grdData.UpdateCheckBoxSelection(this._chkHeaderRowCheckbox, this._chkGridSelectionRef, false);
    }


    private MedReconcileSelReason_loaded(sender: Object, e: RoutedEventArgs): void {
        this.oReconcileSelReason = new List<CListItem>();
        if (this.oIPPVM != null && this.oIPPVM.MedsReconcile != null && this.oIPPVM.MedsReconcile.Count > 0) {
            this.grdData.RowIndicatorVisibility = Visibility.Collapsed;
            this.oIPPVM.MedsReconcile.forEach((oPrescriptionItemVM) => {
                if (oPrescriptionItemVM.FormViewerDetails.BasicDetails.ReasonforModification != null) {
                    this.oReconcileSelReason.Add(ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: oPrescriptionItemVM.FormViewerDetails.BasicDetails.ReasonforModification.DisplayText,
                        Value: oPrescriptionItemVM.FormViewerDetails.BasicDetails.ReasonforModification.Value,
                        IsSelected: true
                    }));
                    if (oPrescriptionItemVM.FormViewerDetails.BasicDetails.ReasonforModification.DisplayText == "Select reason" && ProfileData.AdditionalPrescConfig != null && ProfileData.AdditionalPrescConfig.ReconcileMandatory) {
                        oPrescriptionItemVM.FormViewerDetails.BasicDetails.ReasonMandatory = true;
                    }
                    else {
                        oPrescriptionItemVM.FormViewerDetails.BasicDetails.ReasonMandatory = false;
                    }
                }
            });
        }
        this.grdData.SetBinding('data', this.oIPPVM.MedsReconcile);
        this.grdData.UpdateColumns();
        let itemsource: any = this.grdData.ItemsSource.array;
        this.gridsLastItem = itemsource.length;
    }
    ngOnInit(): void {
        this.grdData.onCellClick = (s, e) => { this.grdData_onCellClick(s, e); };
        this.grdData.RowIndicatorVisibility = Visibility.Collapsed;
    }
    oVM_OnSelectedReconcileReason(sender: Object, e: SelectionChangeEventArgs): void {
        let grdvwCell: GridViewCell = null;
        let lblreason: iLabel = null;
        let cnt: number = this.grdData.Rows.Count;
        for (let i: number = 1; i < cnt; i++) {
            grdvwCell = ObjectHelper.CreateType<GridViewCell>(this.grdData.Rows[i].Cells[this.grdData.GetColumnIndexByName("Reason")], GridViewCell);
            lblreason = ObjectHelper.CreateType<iLabel>((this.grdData.Rows[i].Cells[this.grdData.GetColumnIndexByName("Reason")].Content), iLabel);
            if (lblreason != null && (String.IsNullOrEmpty(lblreason.Text) || String.Compare(lblreason.Text, "Select reason", StringComparison.CurrentCultureIgnoreCase) == 0)) {
                grdvwCell['BeginEdit']();
                break;
            }
        }
    }
    public CancelButtonClick(): void {
        let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
            Title: "LORENZO",
            Message: reconcile.Cancel_Error_Message,
            MessageButton: MessageBoxButton.YesNo,
            IconType: MessageBoxType.Question
        });
        iMsgBox.MessageBoxClose = (s, e) => { this.iMsgBox_MessageBoxClose(s, e); };
        iMsgBox.Show();
    }
    iMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.Yes) {
            Busyindicator.SetStatusIdle('FINISH');
            this.oIPPVM.IsFinishClicked = false;
            this.oIPPVM.IsreconcileClick = false;
            this.onDialogClose(ObjectHelper.CreateObject(new AppDialogEventargs(), { Content: this, Result: AppDialogResult.Close, AppChildWindow: super.appDialog }));
        }
    }
    private iHyperlinkButton_Click(sender: Object, e: any): void {
        this.grdData_onCellClick(null, null);
    }
    private grdData_onCellClick(sender: Object, args: GridViewCellClickEventArgs): void {
        let sCurrCol: string = args.ColumnCell.Column.UniqueName;
        if (this.grdData.GetColumnIndexByName("Comments") == args.ColumnIndex) {
            // if (String.Compare(sCurrCol, "Comments", StringComparison.CurrentCultureIgnoreCase) == 0) {
            let oItem: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.grdData.GetRowData(args.RowIndex), PrescriptionItemVM);
            this.oReconcileComments = new ReconcileComments();
            this.oReconcileComments.DataContext = oItem;

            AppActivity.OpenWindow("Comments-LORENZO--Webpage Dialog", this.oReconcileComments, (s, e) => { this.ReconcileComments_Close(s); }, "Comments for stopping", false, 200, 380, false, WindowButtonType.OkCancel, null);

        }
    }

    public chkGridSelection: Array<iCheckBox>;
    @ViewChildren("chkGridSelectionRef", { read: iCheckBox }) set _chkGridSelection(c: Array<iCheckBox>) {
        if (c) { this.chkGridSelection = c; }
    };
    checkboxTrigger(index) {
        this.chkGridSelection.forEach((selection, i) => {
            if (index == i) {
                selection.IsChecked = true;
            }
        })
        this.grdData.UpdateCheckBoxSelection(this._chkHeaderRowCheckbox, this._chkGridSelectionRef, false);
    }
    ReconcileComments_Close(args: AppDialogEventargs): void {
        this.oChildWindow = args.AppChildWindow;
        if (args.Result == AppDialogResult.Cancel || args.Result == AppDialogResult.Close) {
            let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                Title: "LORENZO",
                //Message: resource.disconcan1.Cancel_Error_Message, 
                Message: disconcan1.Cancel_Error_Message,
                MessageButton: MessageBoxButton.YesNo,
                IconType: MessageBoxType.Question
            });
            iMsgBox.MessageBoxClose = (s, e) => { this.iMsgBox_MessageBoxClose_App(s, e); };
            iMsgBox.Show();
        }
        else {
            this.oChildWindow.DialogResult = true;
        }
    }
    iMsgBox_MessageBoxClose_App(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.Yes || e.MessageBoxResult == MessageBoxResult.OK) {
            this.oChildWindow.DialogResult = true;
        }
    }
    private iAppDialogWindow_Loaded(sender: Object, e: RoutedEventArgs): void {

    }
    public DisposeFormObjects(): void {
        this.oIPPVM = null;
        this.oReconcileComments = null;
        this.oChildWindow = null;
    }
    private iAppDialogWindow_Unloaded(sender: Object, e: RoutedEventArgs): void {
        if (this.oIPPVM != null) {

        }
        this.DisposeFormObjects();
    }
    rowLoaded(context: any) {
        let rowEventArgs = this.grdDataMedreconcile.GetRowEventArgs(
            this.dataTemplates,
            context
        );
        this.grdData_RowLoaded({}, rowEventArgs);
    }

    private grdData_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
        if (e.Row != null && e.DataElement != null) {
            let oItem: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(e.DataElement, PrescriptionItemVM);
            if (oItem != null && oItem.FormViewerDetails != null && oItem.FormViewerDetails.BasicDetails != null && !String.IsNullOrEmpty(oItem.FormViewerDetails.BasicDetails.Direction) && String.Equals(oItem.FormViewerDetails.BasicDetails.Direction, CConstants.AsNeeded, StringComparison.InvariantCultureIgnoreCase)) {
                //  e.dataItem['RowStyles'].push('AsRequiredSlotsColor');
                // e.Row.Background = new SolidColorBrush(Colors.Red);
                // e.Row.Background =  new SolidColorBrush(MedChartData.AsRequiredSlotsColor);
                this.grdData.SetRowStyle(e, MedChartData.AsRequiredSlotsColor.color, 'Background');
                e.Row.IsAlternating = false;
            }
        }
    }

    rowCallback = (context: RowClassArgs) => {
        let rowStyles = this.grdData.getRowStyles(context);
        return rowStyles;
    };
}


