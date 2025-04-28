import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType } from 'epma-platform/models';
import { AppDialog, EventArgs, Grid, UserControl, iCheckBox, iLabel } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
// import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
// import { AdminScheduleTimeVM } from '../viewmodel/adminscheduletimevm';
// import { Resource } from 'src/app/lorappmedicationcommonbb/resource';
import { PrescriptionItemVM } from 'src/app/lorappmanageprescriptionbbui/viewmodel/PrescriptionItemVM';
import { Resource } from '../resource';
@Component({
    selector: 'frmWeekdays',
    templateUrl: './frmWeekdays.html',
    styles: [
        `
          .lineHeightNormal{
            line-height: Normal; 
          }  
        `
    ], 
})
export class frmWeekdays extends UserControl {
    private LayoutRoot: Grid;
    public resKey = Resource.MedicationForm;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    private lblDaysOfWeek: iLabel;
    @ViewChild("lblDaysOfWeekTempRef", { read: iLabel, static: false }) set _lblDaysOfWeek(c: iLabel) {
        if (c) { this.lblDaysOfWeek = c; }
    };
    private chkSunday: iCheckBox;
    @ViewChild("chkSundayTempRef", { read: iCheckBox, static: false }) set _chkSunday(c: iCheckBox) {
        if (c) { this.chkSunday = c; }
    };
    private chkMonday: iCheckBox;
    @ViewChild("chkMondayTempRef", { read: iCheckBox, static: false }) set _chkMonday(c: iCheckBox) {
        if (c) { this.chkMonday = c; }
    };
    private chkTuesday: iCheckBox;
    @ViewChild("chkTuesdayTempRef", { read: iCheckBox, static: false }) set _chkTuesday(c: iCheckBox) {
        if (c) { this.chkTuesday = c; }
    };
    private chkWednesday: iCheckBox;
    @ViewChild("chkWednesdayTempRef", { read: iCheckBox, static: false }) set _chkWednesday(c: iCheckBox) {
        if (c) { this.chkWednesday = c; }
    };
    private chkThursday: iCheckBox;
    @ViewChild("chkThursdayTempRef", { read: iCheckBox, static: false }) set _chkThursday(c: iCheckBox) {
        if (c) { this.chkThursday = c; }
    };
    private chkFriday: iCheckBox;
    @ViewChild("chkFridayTempRef", { read: iCheckBox, static: false }) set _chkFriday(c: iCheckBox) {
        if (c) { this.chkFriday = c; }
    };
    private chkSaturday: iCheckBox;
    @ViewChild("chkSaturdayTempRef", { read: iCheckBox, static: false }) set _chkSaturday(c: iCheckBox) {
        if (c) { this.chkSaturday = c; }
    };

    override _DataContext: PrescriptionItemVM;
    override get DataContext() {
        return this._DataContext;
    }
    @Input() override set DataContext(value: PrescriptionItemVM) {
        this._DataContext = value;
        //console.log("FrqAdmminTimes",value.FormViewerDetails.BasicDetails.AdminTimes.AdministrationScheduleTimes,(new Date()).getTime().toString());
    }

    public oPrescriptionItemVM: PrescriptionItemVM;
    // private FreqTypeChangedEvent: AdminScheduleTimeVM.FrequrncyTypeChangedEventArgs;
    // private SlotModeChangedEvent: AdminScheduleTimeVM.SlotModeChangedEventArgs;
    private FreqTypeChangedEvent: Function;
    private SlotModeChangedEvent: Function;
    constructor() {
        super();
        //InitializeComponent();
        // this.FreqTypeChangedEvent = new AdminScheduleTimeVM.FrequrncyTypeChangedEventArgs(BasicDetails_FrequrncyTypeChanged);
        // this.SlotModeChangedEvent = new AdminScheduleTimeVM.SlotModeChangedEventArgs(AdminTimes_SlotModeChanged);
        this.FreqTypeChangedEvent = (s, e) => { this.BasicDetails_FrequrncyTypeChanged(s) };
        this.SlotModeChangedEvent = (s, e) => { this.AdminTimes_SlotModeChanged() };
    }
    sDupliTimeDet: string = String.Empty;
    iTimeScheduled_LostFocus(sender: Object, e: RoutedEventArgs): void {

    }
    objMsg_Closed(sender: Object, e: EventArgs): void {
        this.sDupliTimeDet = String.Empty;
    }
    frmWeekdays_Loaded(sender: Object, e: RoutedEventArgs): void {

    }
    AdminTimes_SlotModeChanged(): void {

    }
    frmWeekdays_Unloaded(sender: Object, e: RoutedEventArgs): void {
        this.DisposeFormEvents();
        if (this.oPrescriptionItemVM != null) {
            this.oPrescriptionItemVM.DoCleanUP();
        }
        this.DisposeFormObjects();
    }
    BasicDetails_FrequrncyTypeChanged(FrequrncyType: string): void {

    }
    private DisposeFormObjects(): void {
        this.oPrescriptionItemVM = null;
    }
    private DisposeFormEvents(): void {
        if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.FormViewerDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes != null) {
            // this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.FrequrncyTypeChanged -= BasicDetails_FrequrncyTypeChanged;
            // this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes.SlotModeChanged -= AdminTimes_SlotModeChanged;
        }
    }
    private iTimeScheduled_Unloaded(sender: Object, e: RoutedEventArgs): void {
        // (ObjectHelper.CreateType<iTimeBox>((sender), iTimeBox)).LostFocus -= iTimeScheduled_LostFocus;
        // (ObjectHelper.CreateType<iTimeBox>((sender), iTimeBox)).Unloaded -= iTimeScheduled_Unloaded;
    }
}
