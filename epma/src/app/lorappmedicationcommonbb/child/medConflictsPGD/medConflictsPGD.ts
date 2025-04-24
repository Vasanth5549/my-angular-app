import { Component, OnInit, ViewChild } from '@angular/core';
import { AppDialog, Grid, UserControl } from 'epma-platform/controls';
import 'epma-platform/stringextension';
import { ContentControl } from 'src/app/shared/epma-platform/controls/ContentControl';

@Component({
    selector: 'medConflictsPGD',
    templateUrl: './medConflictsPGD.html',
    styleUrls: ['./medConflictsPGD.css'],
})

export class medConflictsPGD extends UserControl {
    private LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    private ContentCtrlMedConflicts: ContentControl;
    @ViewChild("ContentCtrlMedConflictsTempRef", { read: ContentControl, static: false }) set _ContentCtrlMedConflicts(c: ContentControl) {
        if (c) { this.ContentCtrlMedConflicts = c; }
    };

    // public medlistdetails: Resource

    constructor() {
        super();
        // InitializeComponent();
        //this.ContentCtrlMedConflicts.Content = obj;
    }
}
