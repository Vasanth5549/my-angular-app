import { AfterViewInit, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType } from 'epma-platform/models';
import { AppDialog, Grid, UserControl, iButton } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { Resource } from "../resource";
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';

@Component({
    selector: 'OrderSetChildFooter',
    templateUrl: './OrderSetChildFooter.html'
})

export class OrderSetChildfooter extends UserControl implements AfterViewInit {

    public Styles = ControlStyles;
    public resKey = Resource.MedicationForm;
    public LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    public cmdLinks: iButton;
    @ViewChild("cmdLinksTempRef", { read: iButton, static: false }) set _cmdLinks(c: iButton) {
        if (c) { this.cmdLinks = c; }
    };
    public cmdSetSequence: iButton;
    @ViewChild("cmdSetSequenceTempRef", { read: iButton, static: false }) set _cmdSetSequence(c: iButton) {
        if (c) { this.cmdSetSequence = c; }
    };
    public cmdClearSequence: iButton;
    @ViewChild("cmdClearSequenceTempRef", { read: iButton, static: false }) set _cmdClearSequence(c: iButton) {
        if (c) { this.cmdClearSequence = c; }
    };
    public cmdSequenceLink: iButton;
    @ViewChild("cmdSequenceLinkTempRef", { read: iButton, static: false }) set _cmdSequenceLink(c: iButton) {
        if (c) { this.cmdSequenceLink = c; }
    };
    public cmdMoveDown: iButton;
    @ViewChild("cmdMoveDownTempRef", { read: iButton, static: false }) set _cmdMoveDown(c: iButton) {
        if (c) { this.cmdMoveDown = c; }
    };
    public cmdMoveUp: iButton;
    @ViewChild("cmdMoveUpTempRef", { read: iButton, static: false }) set _cmdMoveUp(c: iButton) {
        if (c) { this.cmdMoveUp = c; }
    };
    public OrderSetChildFooterLoadedEvent = new EventEmitter();
    constructor() {
        // InitializeComponent();
        super();
    }
    ngAfterViewInit(): void {
        this.ChildWindow_Loaded(null,null);
    }
    private ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.OrderSetChildFooterLoadedEvent.emit();
    }

    getOutput() {
        console.log(this.DataContext)
    }
}
