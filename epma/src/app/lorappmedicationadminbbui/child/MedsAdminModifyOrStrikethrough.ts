import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow, ChildWindow } from 'epma-platform/models';
import { AppDialog, Colors, SolidColorBrush, ToolTipService, UserControl, iButton } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { DrugItem } from 'src/app/lorarcbluebirdmedicationchart/common/DrugItem';
import { CDrugHdrAddnlInfo, CDrugHeader, DrugHeader, DrugHeaderItem } from '../common/drugheader';
import { SlotDetailVM } from '../viewmodel/MedicationChartVM';
import { StackPanel } from 'src/app/shared/epma-platform/controls-model/StackPanel';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { CConstants, MedAction, RecordAdminType, SlotStatus } from '../utilities/CConstants';
import { Resource } from '../resource';
import { MedsAdminChartToolTip } from '../resource/medsadmincharttooltip.designer';
import { Common } from '../utilities/common';
import { Strikethrough } from '../resource/strikethrough.designer';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { MedsAdminModifyAdministration } from './MedsAdminModifyAdministration';
//import { MedsAdminChartView } from '../view/MedsAdminChartView';
//import { MedsAdminMultiSlot } from './MedsAdminMultiSlot';
//import { MedsAdminPRNSlot } from './MedsAdminPRNSlot';
//import { MedsAdminChartOverView } from '../view/MedsAdminChartOverView';
import * as ControlStyles from "src/app/shared/epma-platform/controls/ControlStyles";
import { MedsAdminStrikethrough } from './MedsAdminStrikethrough';
import { ModifyStrikethroughLink } from './ModifyStrikethroughLink';
import { MedsAdminChartOverView } from '../view/MedsAdminChartOverView';
import { MedsAdminChartView } from '../view/MedsAdminChartView';
import { MedsAdminMultiSlot } from './MedsAdminMultiSlot';
import { MedsAdminPRNSlot } from './MedsAdminPRNSlot';
@Component({
    selector: 'MedsAdminModifyOrStrikethrough',
    templateUrl: './MedsAdminModifyOrStrikethrough.html',
    styleUrls:  ['./MedsAdminModifyOrStrikethrough.css']
})
  
    export class MedsAdminModifyOrStrikethrough extends iAppDialogWindow implements AfterViewInit {
        public Styles = ControlStyles;
        oDrugDetails: DrugItem;
        oMedsAdminST: MedsAdminStrikethrough;
        public objlinkButtons: ModifyStrikethroughLink;
        private oChildWindow: ChildWindow;
        oDrugHdrAddnlInfo: CDrugHdrAddnlInfo;
        public oSlotVM: SlotDetailVM;
        public isPGD: boolean;
        oMedsAdminModify: MedsAdminModifyAdministration;
        //public delegate void ModifyOrStrikethroughClosedDelegate(SlotDetailVM sender);
        AppDialogWindow: ChildWindow;
        public IsReloadChartReq: boolean = false;
        public PrescriptionItemStatus: string = String.Empty;
        public IsSlotInPastDateAndStatusUnknown: boolean = false;
        public IsModifyLaunchedDirectly: boolean;
        public _Parent: UserControl;
        public IsAmendCompleteWarnMsg: boolean;
        private LayoutRoot: StackPanel;
        @ViewChild("LayoutRootTempRef", {read:StackPanel, static: false }) set _LayoutRoot(c: StackPanel){
            if(c){ this.LayoutRoot  = c; }
        };
        public objDrugHeader: DrugHeader;
        @ViewChild("objDrugHeaderTempRef", {read:DrugHeader, static: false }) set _objDrugHeader(c: DrugHeader){
            if(c){ this.objDrugHeader  = c; }
        };
    constructor() {
            super();
    }
    constructorImpl(oSlotDetailVM: SlotDetailVM, oHdrAddnlInfo: CDrugHdrAddnlInfo) {
        this.oDrugDetails = oSlotDetailVM.DrugDetail;
        this.oDrugHdrAddnlInfo = oHdrAddnlInfo;
        this.oSlotVM = oSlotDetailVM;
        //this.Loaded  = (s,e) => { this.ChildWindow_Loaded(s,e); } ;
    }
    ngAfterViewInit(): void {
        let tempModify = this.objlinkButtons.cmdModify_Click.subscribe(data => {
            this.cmdModify_Click({}, null);
            tempModify.unsubscribe();
        })
        let tempStrikeThrough = this.objlinkButtons.cmdStrikethrough_Click.subscribe(data => {
            this.cmdStrikethrough_Click({}, null);
            tempStrikeThrough.unsubscribe();
        })
        this.ChildWindow_Loaded(null, null);
    }
    cmdModify_Click(sender: Object, e: RoutedEventArgs): void {
        Busyindicator.SetStatusBusy("MedChart");
        this.IsAmendCompleteWarnMsg = false;
        if (this.oSlotVM != null && this.oSlotVM.IsAmendCompletedStatus && !String.IsNullOrEmpty(this.oSlotVM.PrescriptionItemStatus) && String.Equals(this.oSlotVM.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase) && !String.IsNullOrEmpty(this.oSlotVM.Status) && String.Equals(this.oSlotVM.Status, SlotStatus.NOTKNOWN, StringComparison.CurrentCultureIgnoreCase)) {
            this.IsAmendCompleteWarnMsg = true;
            let oMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                Title: "Lorenzo",
                Message: Resource.MedicationChart.AmendedCompletedWarningMsg,
                MessageButton: MessageBoxButton.OK,
                IconType: MessageBoxType.Information,
                Height: 160,
                Width: 410
            });
            oMsgBox.OverlayBrush = new SolidColorBrush(Colors.Transparent);
            oMsgBox.MessageBoxClose = (s, e) => { this.AmendCompleteWarnMsg_MessageBoxClose(s, e); };
            oMsgBox.Show();
        }
        if (!this.IsAmendCompleteWarnMsg && this.oSlotVM != null && this.oSlotVM.IsParacetamolIngredient && this.oSlotVM.ParacetamolAdminCount > 3) {
            this.LaunchParacetamolWarnMsg();
        }
        else {
            if (!this.IsAmendCompleteWarnMsg) {
                this.ShowModifyAdmin();
            }
        }
    }
    oMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        Busyindicator.SetStatusIdle("MedChart");
        if (e.MessageBoxResult == MessageBoxResult.Yes) {
            Busyindicator.SetStatusBusy("MedChart");
            this.ShowModifyAdmin();
        }
    }
    AmendCompleteWarnMsg_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        Busyindicator.SetStatusIdle("MedChart");
        this.IsAmendCompleteWarnMsg = false;
        if (e.MessageBoxResult == MessageBoxResult.OK) {
            if (this.oSlotVM != null && this.oSlotVM.IsParacetamolIngredient && this.oSlotVM.ParacetamolAdminCount > 3) {
                this.LaunchParacetamolWarnMsg();
                return
            }
            Busyindicator.SetStatusBusy("MedChart");
            this.ShowModifyAdmin();
        }
    }
    private LaunchParacetamolWarnMsg(): void {
        let oMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
            Title: "Lorenzo",
            Message: String.Format(MedsAdminChartToolTip.CumulativeWarningMsg, this.oSlotVM.ParacetamolAdminCount),
            MessageButton: MessageBoxButton.YesNo,
            IconType: MessageBoxType.Question,
            Height: 160,
            Width: 410,
            Tag: CConstants.CumulativeWarning
        });
        oMsgBox.OverlayBrush = new SolidColorBrush(Colors.Transparent);
        oMsgBox.MessageBoxClose = (s, e) => { this.oMsgBox_MessageBoxClose(s, e); };
        oMsgBox.Show();
    }
    private ShowModifyAdmin(): void {
        this.temp = this;
        if (this.oSlotVM.FreqPerodCode == CConstants.OnceOnlyPerodCode && !String.Equals(this.oSlotVM.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase)) {
            this.oSlotVM.IsUpdatePIStatusToCompleted = true;
        }
        else if (this.oSlotVM.IsLastSlotinCurrentView && !String.Equals(this.oSlotVM.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase)) {
            this.oSlotVM.IsUpdatePIStatusToCompleted = true;
            this.oSlotVM.IsLastSlotCheckRequired = true;
        }
        else if (!this.oSlotVM.IsOVUpdtPIStsToCompletedNotkwn) {
            this.oSlotVM.IsUpdatePIStatusToCompleted = false;
        }
        this.oMedsAdminModify = new MedsAdminModifyAdministration();
        this.oMedsAdminModify.constructorImpl(this.oSlotVM);
        this.oMedsAdminModify.objDrugHeader = new DrugHeader();
        this.oMedsAdminModify.objDrugHeader.oDrugHeader = new CDrugHeader();
        this.oMedsAdminModify.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo = new DrugHeaderItem();
        this.oMedsAdminModify.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowFrequency = false;
        this.oMedsAdminModify.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowSite = false;
        this.oDrugHdrAddnlInfo.SteppedDoseUOM = this.oSlotVM.DoseUOM;
        this.oDrugHdrAddnlInfo.SteppedLowerDose = (String.IsNullOrEmpty(this.oSlotVM.LDose)) ? this.oSlotVM.Dose : this.oSlotVM.LDose;
        this.oDrugHdrAddnlInfo.SteppedUpperDose = this.oSlotVM.UDose;
        this.oDrugHdrAddnlInfo.RecordAdminViewed = RecordAdminType.RecordAdmin;
        this.oMedsAdminModify.objDrugHeader.DataContext = Common.SetDrugHeaderContent(this.oDrugDetails, this.oDrugHdrAddnlInfo, this.oMedsAdminModify.objDrugHeader);
        this.oMedsAdminModify.OnSubmitModAdminEvent =(s,e)=>{this.oMedsAdminModify.OnSubmitModAdminEvent(this.oMedsAdminModify_OnSubmitModAdminEvent());}
        if (this._Parent != null && this.IsModifyLaunchedDirectly) {
            
            if (this._Parent instanceof MedsAdminChartOverView) 
                this.oMedsAdminModify.OnSubmitModAdminOverviewEvent =(s,e)=>{(this._Parent as MedsAdminChartOverView).oMedsAdmin_OnSubmitModAdminEvent()};
            //   this.oMedsAdminModify.OnSubmitModAdminEvent = (s, e) => { (this._Parent as MedsAdminChartOverView)._oMedsAdmin_OnSubmitModAdminEvent(s, e); };
             if (this._Parent instanceof MedsAdminChartView)
                //this.oMedsAdminModify.OnSubmitModAdminEvent = (s, e) => { (this._Parent as MedsAdminChartView)._oMedsAdmin_OnSubmitModAdminEvent(s, e); };
                this.oMedsAdminModify.OnSubmitModAdminChartviewEvent = (s, e) => { (this._Parent as MedsAdminChartView).oMedsAdmin_OnSubmitModAdminEvent(); };
            if (this._Parent instanceof MedsAdminMultiSlot)
                this.oMedsAdminModify.OnSubmitModAdminChartviewEvent = (s, e) => { (this._Parent as MedsAdminMultiSlot).oMedsAdmin_OnSubmitModAdminEvent(); };
            if (this._Parent instanceof MedsAdminPRNSlot)
                this.oMedsAdminModify.OnSubmitModAdminChartviewEvent= (s, e) => { (this._Parent as MedsAdminPRNSlot).oMedsAdmin_OnSubmitModAdminEvent(); };
        }
        this.oMedsAdminModify.onDialogClose = this.oMedsAdminST_Closed;
        this.oMedsAdminModify.IsSlotInPastDateAndStatusUnknown = this.IsSlotInPastDateAndStatusUnknown;
        this.oMedsAdminModify.HelpCode = MedAction.ModifyAdministration;
        // ObjectHelper.stopFinishAndCancelEvent(true);
        let dialogWindowHeight = (window.devicePixelRatio == 1) ? 775 :(775/window.devicePixelRatio)-40; //(775/window.devicePixelRatio);
        AppActivity.OpenWindow("Modify administration", this.oMedsAdminModify, (s, e) => { this.oMedsAdminModify_Closed(s) }, "Modify administration", true, dialogWindowHeight, 450, false, WindowButtonType.OkCancel, null);
    }
    private oMedsAdminModify_Closed(args: AppDialogEventargs): void {
        if (args != null && args.Content != null) {
            this.oMedsAdminModify = args.Content.Component;
            this.oSlotVM = ObjectHelper.CreateType<SlotDetailVM>(this.oMedsAdminModify.objVmsltDoseDis, SlotDetailVM);

            if (this.oSlotVM != null && !this.oSlotVM.IsSubmitInProgress) {
                //if(ObjectHelper.DoubleOpenWindowMode == false)
                // ObjectHelper.stopFinishAndCancelEvent(false);
                if (this.oMedsAdminModify != null && args.Result == AppDialogResult.Ok) {
                    if (!Common.CheckIfLockingDurationElapsed((o, e) => ((sender: any, e: MessageEventArgs) => { this.oMsgBox_ModifyAdminClose(o, e) }))) {
                        this.oSlotVM.IsSubmitInProgress = true;
                        Busyindicator.SetStatusBusy("Administration", true);
                        this.oMedsAdminModify.cmdOk_Click();
                    }
                }
                else if (args.Result == AppDialogResult.Cancel) {
                    if (this.temp != null && !this.IsModifyLaunchedDirectly)
                        this.temp.dupDialogRef.close();
                    this.oMedsAdminModify.dupDialogRef.close();
                }
                Busyindicator.SetStatusIdle("MedChart");
            }
        }
    }
    oMsgBox_ModifyAdminClose(sender: Object, e: MessageEventArgs): void {
        if (this.temp != null && !this.IsModifyLaunchedDirectly)
            this.temp.dupDialogRef.close();
        this.oMedsAdminModify.dupDialogRef.close();
    }
    oMedsAdminModify_OnSubmitModAdminEvent(): void {
        this.oSlotVM = ObjectHelper.CreateType<SlotDetailVM>(this.oMedsAdminModify.DataContext, SlotDetailVM);
        if (this.oSlotVM != null) {
            this.oSlotVM.IsModifyWindow = true;
            if (this.temp != null && !this.IsModifyLaunchedDirectly)
                this.temp.dupDialogRef.close();
            this.oMedsAdminModify.dupDialogRef.close();
            this.oSlotVM.IsDialogResult = true;
            this.DataContext = this.oSlotVM;
            if (super.onDialogClose != null && !this.IsModifyLaunchedDirectly)
                super.onDialogClose(ObjectHelper.CreateObject(new AppDialogEventargs(), { Content: this, Result: AppDialogResult.Close, AppChildWindow: super.appDialog }));
        }
        Busyindicator.SetStatusIdle("Administration");

        if (this.oMedsAdminModify_OnSubmitModAdminEvent != null) {
            this.oMedsAdminModify_OnSubmitModAdminEvent = null;
        }
        if (this._Parent instanceof MedsAdminChartOverView) {
            this.oMedsAdminModify.OnSubmitModAdminOverviewEvent();
        }
        if ((this._Parent instanceof MedsAdminChartView)|| (this._Parent instanceof MedsAdminMultiSlot)|| (this._Parent instanceof MedsAdminPRNSlot)) {
           this.oMedsAdminModify.OnSubmitModAdminChartviewEvent();
        }

    }
    temp: iAppDialogWindow;
    cmdStrikethrough_Click(sender: Object, e: RoutedEventArgs): void {
        Busyindicator.SetStatusBusy("MedChart");
        this.temp = this;
        //this.oMedsAdminST = new MedsadminStrikethroughComponent(this.oSlotVM, this.isPGD);
        this.oMedsAdminST = new MedsAdminStrikethrough();
        this.oMedsAdminST.constructorImpl(this.oSlotVM, this.isPGD);
        this.oMedsAdminST.IsSlotUpdatedEvent = (s, e) => { this.oMedsAdminST_IsSlotUpdatedEvent(); };
        this.oMedsAdminST.drgHeader = new DrugHeader();
        this.oMedsAdminST.drgHeader.oDrugHeader = new CDrugHeader();
        this.oMedsAdminST.drgHeader.oDrugHeader.oDrugHdrBasicInfo = new DrugHeaderItem();
        this.oMedsAdminST.drgHeader.oDrugHeader.oDrugHdrBasicInfo.bShowFrequency = false;
        this.oMedsAdminST.drgHeader.oDrugHeader.oDrugHdrBasicInfo.bShowSite = false;
        this.oDrugHdrAddnlInfo.SteppedDoseUOM = this.oSlotVM.DoseUOM;
        this.oDrugHdrAddnlInfo.SteppedLowerDose = (String.IsNullOrEmpty(this.oSlotVM.LDose)) ? this.oSlotVM.Dose : this.oSlotVM.LDose;
        this.oDrugHdrAddnlInfo.SteppedUpperDose = this.oSlotVM.UDose;
        this.oDrugHdrAddnlInfo.RecordAdminViewed = RecordAdminType.RecordAdmin;
        this.oMedsAdminST.drgHeader.DataContext = Common.SetDrugHeaderContent(this.oDrugDetails, this.oDrugHdrAddnlInfo, this.oMedsAdminST.drgHeader);
        this.oMedsAdminST.IsSlotInPastDateAndStatusUnknown = this.IsSlotInPastDateAndStatusUnknown;
        this.oMedsAdminST.HelpCode = "MN_STRIKEADMIN";

        this.dupDialogRef.close();
        let Callback = (s, e) => {
            if (s != null && e != null) {
                this.oMedsAdminST = s;
            }
        }
        Common.LaunchStrikeThroughWindow(this.oMedsAdminST, (s, e) => { this.oMedsAdminST_Closed(s) }, 775, 420, null, this.oSlotVM.DrugDetail.Drugname, Callback);
    }
    oMedsAdminST_Closed(args: AppDialogEventargs): void {
        if (args != null && args.Content != null) {
            this.oMedsAdminST = args.Content.Component;
            this.oSlotVM = ObjectHelper.CreateType<SlotDetailVM>(this.oMedsAdminST.objSlotVM, SlotDetailVM);
            this.AppDialogWindow = args.AppChildWindow;
            if (this.oSlotVM != null && !this.oSlotVM.IsSubmitInProgress) {
                // ObjectHelper.stopFinishAndCancelEvent(false);
                if (this.oMedsAdminST != null && args.Result == AppDialogResult.Ok) {
                    if (!Common.CheckIfLockingDurationElapsed((o, e) => ((sender: any, e: MessageEventArgs) => { this.oMsgBox_StrikethroughClose(o, e) }))) {
                        this.oSlotVM.IsSubmitInProgress = true;
                        Busyindicator.SetStatusBusy("Administration", true);
                        let bdialogresult: boolean = this.oMedsAdminST.cmdOkClick();
                    }
                }
                else if (args.Result == AppDialogResult.Cancel) {
                    if (this.temp != null && !this.IsModifyLaunchedDirectly)
                        this.temp.dupDialogRef.close();
                    this.oMedsAdminST.dupDialogRef.close();
                }
            }
        }
    }
    oMsgBox_StrikethroughClose(sender: Object, e: MessageEventArgs): void {
        if (this.temp != null && !this.IsModifyLaunchedDirectly)
            this.temp.appDialog.DialogResult = false;
        this.oMedsAdminST.appDialog.DialogResult = false;
    }
    oMedsAdminST_IsSlotUpdatedEvent(): void {
        this.oSlotVM = ObjectHelper.CreateType<SlotDetailVM>(this.oMedsAdminST.DataContext, SlotDetailVM);
        if (this.oSlotVM != null) {
            this.oSlotVM.IsDialogResult = true;
            this.oSlotVM.IsModifyWindow = false;
        }
        if (!this.IsReloadChartReq) {
            this.oSlotVM.IsReloadChartRequired = this.IsReloadChartReq = this.oMedsAdminST.IsReloadChartReq;
            if (this.oMedsAdminST.IsReloadChartReq)
                this.PrescriptionItemStatus = this.oMedsAdminST.PrescriptionItemStatus;
        }
        this.DataContext = this.oSlotVM;
        this.AppDialogWindow.DialogResult = true;
        if (super.onDialogClose != null)
            super.onDialogClose(ObjectHelper.CreateObject(new AppDialogEventargs(), { Content: this, Result: AppDialogResult.Close, AppChildWindow: super.appDialog }));
        Busyindicator.SetStatusIdle("Administration");
    }
    public cmdCloseClick(): boolean {
        return true;
    }
    obj_Closed(args: AppDialogEventargs): void {
        this.oChildWindow = args.AppChildWindow;
        this.oChildWindow.DialogResult = false;
    }
    public ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void {

        Busyindicator.SetStatusIdle("MedChart");
        this.IsModifyLaunchedDirectly = false;
        
    }

}
