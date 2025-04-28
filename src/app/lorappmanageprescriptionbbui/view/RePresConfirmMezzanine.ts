import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
//import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
//import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow } from 'epma-platform/models';
import { DataTemplate, Grid, iButton, iCheckBox, iLabel } from 'epma-platform/controls';
//import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
//import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { GridComponent } from '@progress/kendo-angular-grid';
import { ObjectHelper } from 'epma-platform/helper';
import { iAppDialogWindow } from 'epma-platform/models';
import { Visibility } from 'src/app/shared/epma-platform/controls-model/Visibility';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { GridExtension, RowLoadedEventArgs, SelectionChangeEventArgs, SelectionChangingEventArgs } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { Resource } from '../resource';
import { CAActivity } from '../utilities/constants';
import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import { IPPMABaseVM } from '../viewmodel/ippmabasevm';
import { PrescriptionItemAssociations } from '../viewmodel/ordersetsecmezzanineVM';

var that;
@Component({
    selector: 'RePresConfirmMezzanine',
    templateUrl: './RePresConfirmMezzanine.html',
    // styleUrls: ['./RePresConfirmMezzanine.css'],
})
export class RePresConfirmMezzanine extends iAppDialogWindow implements OnInit, AfterViewInit {
    // <local:prescribedrugs x:Key="resKey"/>        
    public resKey = Resource.prescribedrugs;
    //<ConClass:DisplayPrescriptionLineItem x:Key="MedLineDisplay" /> 
    // public MedLineDisplay: DisplayPrescriptionLineItem;

    public Styles = ControlStyles;
    @ViewChildren(DataTemplate) dataTemplates: QueryList<DataTemplate>;
    grdData: GridExtension = new GridExtension();
    objVM: IPPMABaseVM;
    RepresResolve: PrescriptionItemVM = new PrescriptionItemVM();

    public LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };

    public grdPresSelect: GridExtension = new GridExtension();
    @ViewChild('grdPresSelectTempRef', { read: GridComponent, static: false }) set _grdPresSelect(c: GridComponent) {
        if (c) {
            this.grdPresSelect.grid = c;
            this.grdPresSelect.columns = c.columns;
        }
    };

    lblHeaderText: iLabel;
    @ViewChild("lblHeaderTextTempRef", { read: iLabel, static: false }) set _lblHeaderText(c: iLabel) {
        if (c) { this.lblHeaderText = c; }
    };

    _contentLoaded: Boolean;
    @ViewChild("_contentLoadedTempRef", { read: Boolean, static: false }) set __contentLoaded(c: Boolean) {
        if (c) { this._contentLoaded = c; }
    };
    SelectCheckbox: QueryList<iCheckBox>;
    @ViewChildren('SelectCheckboxTempRef', { read: iCheckBox })
    set _SelectCheckbox(c: QueryList<iCheckBox>) {
        if (c) {
            this.SelectCheckbox = c;
        }
    }
    @ViewChildren('temp', { read: DataTemplate })
    set _dataTemplates(v: QueryList<DataTemplate>) {
        if (v) {
            this.dataTemplates = v;
            this.grdPresSelect.dataTemplates = v;
        }
    }

    private _chkGridSelectionRef: QueryList<iCheckBox>;
    @ViewChildren("chkGridSelectionRef", { read: iCheckBox }) set __chkGridSelectionRef(c: QueryList<iCheckBox>) {
        if (c) { this._chkGridSelectionRef = c; }
    };
    private _chkHeaderRowCheckbox: iCheckBox;
    @ViewChild("chkGridHeaderSelectionRef", { read: iCheckBox }) set ___chkRowCheckbox(c: iCheckBox) {
        if (c) { this._chkHeaderRowCheckbox = c; }
    };

    constructor() {
        super();
        that = this;
    }

    ngOnInit(): void {
        this.grdPresSelect.GridSelectionChange = (s, e) => { this.grdPresSelect_SelectionChanged(s, e) };
        this.grdPresSelect.RowIndicatorVisibility = Visibility.Collapsed;
    }

    ngAfterViewInit() {

        //this.grdPresSelect.SetBinding("data", this.objVM.RepresResolve);
        this.grdPresSelect.GenerateColumns();
        if (this.DataContext.RepresResolve != null) {
            this.grdPresSelect.SetBinding("data", this.DataContext.RepresResolve);
        }
        this.ChildWindow_Loaded({}, {});

    }

    GridHeaderCheckboxChange_Func = (s, e) => {
        Object.keys(that).forEach((prop) => (this[prop] = that[prop])); this.GridHeaderCheckboxChange(s, e);
    }
    GridHeaderCheckboxChange(s, e) {
        this.grdData.UpdateCheckBoxSelection(this._chkHeaderRowCheckbox, this._chkGridSelectionRef, true, this.DataContext.RepresResolve, this.grdPresSelect);
        // this.grdData.UpdateCheckBoxSelection(this._chkHeaderRowCheckbox, this._chkGridSelectionRef, true);
        // if (this._chkHeaderRowCheckbox.IsChecked) {
        //     this.btnOk.IsEnabled = true;
        // } else {
        //     this.btnOk.IsEnabled = false;
        // }

        // Set the isEnabled property of btnOk based on the state of the _chkHeaderRowCheckbox
        this.btnOk.IsEnabled = this._chkHeaderRowCheckbox.IsChecked;
    }
    GridRowCheckboxChange_Func = (s, e) => {
        Object.keys(that).forEach((prop) => (this[prop] = that[prop])); this.GridRowCheckboxChange(s, e);
    }
    GridRowCheckboxChange(s, e) {
        this.grdData.UpdateCheckBoxSelection(this._chkHeaderRowCheckbox, this._chkGridSelectionRef, false);
        // Check if any of the checkboxes in _chkGridSelectionRef array are selected
        const anyCheckboxSelected = this._chkGridSelectionRef.some(checkbox => checkbox.IsChecked);
        // Enable the btnOk button if any checkbox is selected, otherwise disable it
        this.btnOk.IsEnabled = anyCheckboxSelected;
    }

    ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.grdPresSelect.RowIndicatorVisibility = Visibility.Collapsed;
        this.OKButtonEnableDisable();

    }
    grdPatientSelect_SelectionChanging(sender: Object, e: SelectionChangingEventArgs): void {

    }

    rowLoaded(context: any) {
        let rowEventArgs = this.grdData.GetRowEventArgs(
            this.dataTemplates,
            context
        );
        this.grdPatientSelect_RowLoaded({}, rowEventArgs);
    }
    private grdPatientSelect_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
        if (e.Row != null && e.Row.Item != null) {
            let objlist: PrescriptionItemAssociations = ObjectHelper.CreateType<PrescriptionItemAssociations>(e.Row.Item, PrescriptionItemAssociations);
            if (objlist != null) {
                if (String.Compare(objlist.ActivityType, CAActivity.CA_PRESCRIBE) == 0) {
                    if (String.Compare(objlist.Default, "yes", StringComparison.OrdinalIgnoreCase) == 0) {
                        e.Row.IsSelected = true;
                    }
                }
                else if (String.Compare(objlist.ActivityType, CAActivity.CA_REORDER) == 0) {
                    if (objlist.PrescrptionItem.PrescriptionItemOID != 0) {
                        e.Row.IsSelected = true;
                    }
                }
            }
        }
    }
    private DisposeFormEvents(): void {

    }
    private iAppDialogWindow_Unloaded(sender: Object, e: RoutedEventArgs): void {

    }

    btnOk: iButton = this.GetOkButton(this);
    public OKButtonEnableDisable(): void {
        if (this.btnOk != null) {
            if (this.grdPresSelect != null && this.grdPresSelect.GetSelectedRowCount() > 0) {
                this.btnOk.IsEnabled = true;
            }
            else {
                this.btnOk.IsEnabled = false;
            }
        }
    }
    grdPresSelect_SelectionChanged(sender: Object, e: SelectionChangeEventArgs): void {
        this.OKButtonEnableDisable();
    }
}
