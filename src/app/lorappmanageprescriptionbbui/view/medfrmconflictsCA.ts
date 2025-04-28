import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, Visibility } from 'epma-platform/models';
import { DataTemplate, Grid, iComboBox, iLabel } from 'epma-platform/controls';
import 'epma-platform/stringextension';
import { ObjectHelper } from 'epma-platform/helper';
import { AppActivityBB } from 'src/app/lorappcommonbb/appactivitybb';
import { ConflictContainerVM } from 'src/app/lorappmedicationcommonbb/utilities/ConflictsHelper';
import { ConflictsVM } from 'src/app/lorappmedicationcommonbb/viewmodel/conflictsvm';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { GridExtension, RowLoadedEventArgs } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { CConstants } from '../utilities/constants';
import * as ControlStyles from '../../shared/epma-platform/controls/ControlStyles';
import { GridComponent } from '@progress/kendo-angular-grid';
import { Resource } from '../resource';
import { CellStyle } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/cell-style.component';
import { ResolveConflictVM } from '../ca/conflicts/ResolveConflictsVM';

@Component({
    selector: 'medfrmconflictsCA',
    templateUrl: './medfrmconflictsCA.html',
    styleUrls: ['./medfrmconflictsCA.css'],
})

export class medfrmconflictsCA extends AppActivityBB implements AfterViewInit {
    public LayoutRoot: Grid;
    medfrmconflictsCA: ResolveConflictVM;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    private cboReason: QueryList<iComboBox>;
    @ViewChildren('cboReasonTempRef', { read: iComboBox })
    set _cboReason(c: QueryList<iComboBox>) {
        if (c) {
            this.cboReason = c;
        }
    };
    public grdConflicts: GridExtension = new GridExtension();
    @ViewChild('grdConflictsTempRef', { read: GridComponent }) set _grdConflicts(
        comp: GridComponent
    ) {
        if (comp) {
            this.grdConflicts.grid = comp;
            this.grdConflicts.columns = comp.columns;
        }
    }
    public grdMandatoryfields: Grid;
    @ViewChild("grdMandatoryfieldsTempRef", { read: Grid, static: false }) set _grdMandatoryfields(c: Grid) {
        if (c) { this.grdMandatoryfields = c; }
    };
    public ilblStar: iLabel;
    @ViewChild("ilblStarTempRef", { read: iLabel, static: false }) set _ilblStar(c: iLabel) {
        if (c) { this.ilblStar = c; }
    };
    public iLabel1: iLabel;
    @ViewChild("iLabel1TempRef", { read: iLabel, static: false }) set _iLabel1(c: iLabel) {
        if (c) { this.iLabel1 = c; }
    };
    public _contentLoaded: Boolean;
    @ViewChild("_contentLoadedTempRef", { read: Boolean, static: false }) set __contentLoaded(c: Boolean) {
        if (c) { this._contentLoaded = c; }
    };
    cellStyle = {};
    @ViewChild('CellTemplateStyle', { read: CellStyle, static: false })
    set cellTemplateStyle(value: CellStyle) {
        this.cellStyle = this.grdConflicts.setCellStyle(
            value,
            this.grdConflicts.columns
        );
    }
    override _DataContext: any;
    override get DataContext() {
        return this._DataContext;
    }
    @Input() override set DataContext(value: any) {
        this._DataContext = value;
    }
    @ViewChildren('medConflictsDataTemplate') dataTemplates: QueryList<DataTemplate>;
    public Styles = ControlStyles;
    public conflicts = Resource.conflicts;
    public presdrugs = Resource.prescribedrugs;
    public comobBoxInstance;

    constructor(private changeDetectorRef?: ChangeDetectorRef) {
        super();

    }

    public windowpx ;
    ngAfterViewInit(): void {
        this.windowpx =(window.devicePixelRatio == 1) ? true : false
        this.grdConflicts.GenerateColumns();
        this.medfrmconflictsCA_Loaded({}, null);        
        this.grdConflicts.changeDetectionRef = this.changeDetectorRef;
        this.grdConflicts.IsSynchronizedWithCurrentItem = true;
    }
    ContentScrollEvent(e) {
        this.comobBoxInstance.toggle(false);
    }
    getCombo(e) {
        this.comobBoxInstance = e;
    }
    public rowLoaded(context: any) {
        let rowEventArgs = this.grdConflicts.GetRowEventArgs(
            this.dataTemplates,
            context
        );
        this.grdConflicts_RowLoaded({}, rowEventArgs);
    }

    public medfrmconflictsCA_Loaded(sender: Object, e: RoutedEventArgs): void {    
        //if (this.DataContext && this.DataContext.CACode == 'MN_RSLV_CONFLICTS') 
        if(this.DataContext instanceof ResolveConflictVM){
            let oIPVM: ResolveConflictVM = (ObjectHelper.CreateType<ResolveConflictVM>(this.DataContext, ResolveConflictVM));
            if (oIPVM != null) {
                this.grdConflicts.ItemsSource = oIPVM.ConflictDetails;
                this.grdConflicts.SetBinding('data', oIPVM.ConflictDetails);
                this.grdConflicts['RowLoaded'] = (s, e) => { this.grdConflicts_RowLoaded(s, e); };
                this.grdConflicts.RowIndicatorVisibility = Visibility.Visible;
            }
        }
        else {
            let vm: ConflictContainerVM = (ObjectHelper.CreateType<ConflictContainerVM>(this.DataContext, ConflictContainerVM));
            if (vm != null) {
                this.grdConflicts['Columns']["PrescriptionItem"].IsVisible = this.grdConflicts['Columns']["PrescriptionType"].IsVisible = false;                                               
                this.grdConflicts.UpdateColumns();
                this.DataContext = vm;
                this.grdConflicts.SetBinding('data', vm);
                this.grdConflicts['RowLoaded'] = (s, e) => { this.grdConflicts_RowLoaded(s, e); };
                this.grdConflicts.RowIndicatorVisibility = Visibility.Visible;
                // revisit required 
                // this.grdConflicts.['Columns']["WarningMessage"].Width = new Telerik.Windows.Controls.GridViewLength(400);
            }
        }
    }

    public grdConflicts_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
        if (e.Row != null && e.Row.Item != null) {
            let oVM: ConflictsVM = ObjectHelper.CreateType<ConflictsVM>(e.Row.Item, ConflictsVM);
            if (oVM instanceof ConflictsVM) {
                if (oVM != null && !String.IsNullOrEmpty(oVM.WarningBehaviourType) && String.Equals(oVM.WarningBehaviourType, CConstants.Type1, StringComparison.OrdinalIgnoreCase)) {
                    e.Row.IsEnabled = false;
                }
            }
        }
    }

    public iCheckBox_OnChange(sender: any, rowIndex): void {
        this.cboReason.forEach((combobox: iComboBox, i:number) => {
            if(rowIndex==i){
              combobox.SelectedValue = null;
              combobox.inputSelector.value=null;
              combobox.text="";
            }
        });
    }
}
