import { AfterViewInit, Component, OnInit, ViewChild,EventEmitter } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType } from 'epma-platform/models';
import { AppDialog, Grid, UserControl, iButton } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { Resource } from '../resource';

@Component({
    selector: 'ModifyStrikethroughLink',
    templateUrl: './ModifyStrikethroughLink.html',
    styleUrls: ['./ModifyStrikethroughLink.css']
  })
export class ModifyStrikethroughLink extends UserControl {
    public objStrikethrough=Resource.Strikethrough;
    public cmdModify_Click = new EventEmitter();
    public cmdStrikethrough_Click = new EventEmitter();

    public LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    public cmdModify: iButton;
    @ViewChild("cmdModifyTempRef", { read: iButton, static: false }) set _cmdModify(c: iButton) {
        if (c) { this.cmdModify = c; }
    };
    public cmdStrikethrough: iButton;
    @ViewChild("cmdStrikethroughTempRef", { read: iButton, static: false }) set _cmdStrikethrough(c: iButton) {
        if (c) { this.cmdStrikethrough = c; }
    };

    constructor() {
        super();
        //InitializeComponent();
    }
    cmdModify_Click_Func(e) {
        this.cmdModify_Click.emit();
    }
    cmdStrikethrough_Click_Func(e) {
        this.cmdStrikethrough_Click.emit();
    }
}
