import { AfterViewInit, Component,Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Visibility } from 'epma-platform/models';
import { Grid, UserControl, iComboBox, iLabel } from 'epma-platform/controls';
import 'epma-platform/stringextension';
import { ObjectHelper } from 'epma-platform/helper';
import { IPPMABaseVM } from '../viewmodel/ippmabasevm';
import { Common } from '../utilities/common';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { GridComponent } from '@progress/kendo-angular-grid';
import { GridExtension } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";

@Component({
    selector: 'medreprint',
    templateUrl: './medreprint.html',
})
export class medreprint extends UserControl implements AfterViewInit, OnDestroy {
    oVM: IPPMABaseVM;
    public Styles = ControlStyles;
    public LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    public lblstationary: iLabel;
    @ViewChild("lblstationaryTempRef", { read: iLabel, static: false }) set _lblstationary(c: iLabel) {
        if (c) { this.lblstationary = c; }
    };

    public grid2: GridExtension = new GridExtension();
    @ViewChild('grid2TempRef', { read: GridComponent, static: false })

    set _grid2(c: GridComponent) {
        if (c) {
            this.grid2.grid = c;
            this.grid2.columns = c.columns;
        }
    }
    public cboStaType: iComboBox;

    @ViewChild("cboStaTypeTempRef", { read: iComboBox, static: false }) set _cboStaType(c: iComboBox) {

        if (c) { this.cboStaType = c; }

    };

    constructor() {
        super();
    }

    ngAfterViewInit(): void {
        this.grid2.RowIndicatorVisibility = Visibility.Collapsed;
        this.UserControl_Loaded({}, null);
        this.grid2.SetBinding('data', this.oVM.MedsPrint);
    }

    ngOnDestroy(): void {
        this.Medreprint_Unloaded({}, null);
    }

    private UserControl_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.oVM = ObjectHelper.CreateType<IPPMABaseVM>(this.DataContext, IPPMABaseVM);
        this.oVM.FillActivityConsideration();
        this.oVM.PopulatePrintStntyTyCbo();
    }

    private Medreprint_Unloaded(sender: Object, e: RoutedEventArgs): void {
        this.DisposeFormObjects();
    }

    public DisposeFormObjects(): void {
        if (this.oVM != null && this.oVM.MedsResolve != null && (this.oVM.IsFinish || this.oVM.IsFinishNow)) {
            Common.LHSiTab = null;
            Common.oIPPMABaseVM = null;
            Common.ConceptCodes = null;
        }
    }
}
