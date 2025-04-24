import { Component, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow } from 'epma-platform/models';
import { AppDialog, Grid, iButton, iCheckBox, iLabel } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';

@Component({
    template: ''
})

export class PGDConflictsChild extends iAppDialogWindow {
    private LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    private lblPGDConfilictsMsg: iLabel;
    @ViewChild("lblPGDConfilictsMsgTempRef", { read: iLabel, static: false }) set _lblPGDConfilictsMsg(c: iLabel) {
        if (c) { this.lblPGDConfilictsMsg = c; }
    };
    private lblPGDAlreadyAdministeredMsg: iLabel;
    @ViewChild("lblPGDAlreadyAdministeredMsgTempRef", { read: iLabel, static: false }) set _lblPGDAlreadyAdministeredMsg(c: iLabel) {
        if (c) { this.lblPGDAlreadyAdministeredMsg = c; }
    };

    private chkAlreadyAdministered: iCheckBox;
    @ViewChild("chkAlreadyAdministeredTempRef", { read: iCheckBox, static: false }) set _chkAlreadyAdministered(c: iCheckBox) {
        if (c) { this.chkAlreadyAdministered = c; }
    };
    constructor() {
        //InitializeComponent();
        super();
        this.chkAlreadyAdministered.Click = (s, e) => { this.chkAlreadyAdministered_Checked(s, e); };
    }
    chkAlreadyAdministered_Checked(sender: Object, e: RoutedEventArgs): void {
        let blnResult: boolean = this.chkAlreadyAdministered.IsChecked;
        let btnOk: iButton = this.GetOkButton(this);
        if (blnResult != null && blnResult == true) {
            this.appDialog.IsEnabled = true;
        }
        if (this.chkAlreadyAdministered.IsChecked == true) {
            if (btnOk != null)
                btnOk.IsEnabled = true;
        }
        else {
            if (btnOk != null)
                btnOk.IsEnabled = false;
        }
    }
    private ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.chkAlreadyAdministered.IsChecked = false;
        let btnOk: iButton = this.GetOkButton(this);
        if (btnOk != null)
            btnOk.IsEnabled = false;
    }
}
