import { AfterViewInit, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { AppDialog, iButton, iCheckBox, iTab, iTabItem, UserControl } from 'epma-platform/controls';
import '../../shared/epma-platform/models/string.extensions';
import { Grid } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { Resource } from '../resource';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
var frmFVFooter_that;
@Component({
    selector: 'frmFVFooter',
    templateUrl: './frmFVFooter.html'
})

export class frmFVFooter extends UserControl implements AfterViewInit {

    public resKey = Resource.MedicationForm;
    public LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    public cmdLink: iButton;
    @ViewChild("cmdLinkTempRef", { read: iButton, static: false }) set _cmdLink(c: iButton) {
        if (c) { this.cmdLink = c; }
    };
    public cmdOnbehalfOf: iButton;
    @ViewChild("cmdOnbehalfOfTempRef", { read: iButton, static: false }) set _cmdOnbehalfOf(c: iButton) {
        if (c) { this.cmdOnbehalfOf = c; }
    };
    public cmdObservationResults: iButton;
    @ViewChild("cmdObservationResultsTempRef", { read: iButton, static: false }) set _cmdObservationResults(c: iButton) {
        if (c) { this.cmdObservationResults = c; }
    };
    // public cmdFBChart: iButton;
    // @ViewChild("cmdFBChartTempRef", { read: iButton, static: false }) set _cmdFBChart(c: iButton) {
    //     if (c) { this.cmdFBChart = c; }
    // };
    public cmdDoseCal: iButton;
    @ViewChild("cmdDoseCalTempRef", { read: iButton, static: false }) set _cmdDoseCal(c: iButton) {
        if (c) { this.cmdDoseCal = c; }
    };
    public cmdRemove: iButton;
    @ViewChild("cmdRemoveTempRef", { read: iButton, static: false }) set _cmdRemove(c: iButton) {
        if (c) { this.cmdRemove = c; }
    };

    constructor() {
        super();
        // InitializeComponent();
        frmFVFooter_that = this;
    }
    ngAfterViewInit(): void {
        Object.keys(frmFVFooter_that).forEach((prop) => (this[prop] = frmFVFooter_that[prop]));
        if(this.cmdRemove != null)
        this.ChildWindow_Loaded(null,null);
    }
    public FrmViewerFooterLoaded = new EventEmitter();

 private ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void { 

  this.FrmViewerFooterLoaded.emit();  

 }

}
