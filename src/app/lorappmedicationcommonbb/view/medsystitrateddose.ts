import { Component, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, iAppDialogWindow } from 'epma-platform/models';
import { AppDialog, ContentControl, Grid, iLabel } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
@Component({
    selector: 'medsystitrateddose',
    templateUrl: './medsystitrateddose.html'
})
export class medsystitrateddose extends iAppDialogWindow {
    public LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    public lblCancellation: iLabel;
    @ViewChild("lblCancellationTempRef", { read: iLabel, static: false }) set _lblCancellation(c: iLabel) {
        if (c) { this.lblCancellation = c; }
    };
    public Cancellation: Grid;
    @ViewChild("CancellationTempRef", { read: Grid, static: false }) set _Cancellation(c: Grid) {
        if (c) { this.Cancellation = c; }
    };
    public lblFirstDose: iLabel;
    @ViewChild("lblFirstDoseTempRef", { read: iLabel, static: false }) set _lblFirstDose(c: iLabel) {
        if (c) { this.lblFirstDose = c; }
    };
    public lblFirstDoseVal: iLabel;
    @ViewChild("lblFirstDoseValTempRef", { read: iLabel, static: false }) set _lblFirstDoseVal(c: iLabel) {
        if (c) { this.lblFirstDoseVal = c; }
    };
    constructor() {
        super();

    }

    public FirstDoseVal: string;
    constructorimpl(sDose: string) {
        this.FirstDoseVal = sDose;
    }



    public Styles = ControlStyles;

}