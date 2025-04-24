import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity, ProcessRTE, MessageBox } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow, RTEEventargs, ObservableCollection, CListItem, List, Visibility, SelectionChangedEventArgs, HtmlPage } from 'epma-platform/models';
import { AppDialog, Grid, MouseButtonEventArgs, StackPanel, iComboBox, iLabel, iTextBox } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { SlotDetailVM } from '../viewmodel/MedicationChartVM';
import { MedicationAdministrator } from '../resource/medicationadministrator.designer';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { ValueDomain } from '../utilities/CConstants';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { ProfileData } from '../utilities/ProfileData';
import { Resource } from '../resource';

@Component({
    selector: 'MedsAdminDoseDiscrepancyReason',
    templateUrl: './MedsAdminDoseDiscrepancyReason.html',
    styleUrls: ['./MedsAdminDoseDiscrepancyReason.css']
})

export class MedsAdminDoseDiscrepancyReason extends iAppDialogWindow {
    objVm: SlotDetailVM;
    public objRecordAdmin = Resource.MedicationAdministrator;
    lblCIFValue_MouseLeftButtonUp_Func: Function;
    cboDoseDiscReason_SelectionChanged_Func: Function;
    iMsgBox: iMessageBox = new iMessageBox();

    private LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    private splblintended: StackPanel;
    @ViewChild("splblintendedTempRef", { read: StackPanel, static: false }) set _splblintended(c: StackPanel) {
        if (c) { this.splblintended = c; }
    };
    private lblintended: iLabel;
    @ViewChild("lblintendedTempRef", { read: iLabel, static: false }) set _lblintended(c: iLabel) {
        if (c) { this.lblintended = c; }
    };
    private lbldosevolume1: iLabel;
    @ViewChild("lbldosevolume1TempRef", { read: iLabel, static: false }) set _lbldosevolume1(c: iLabel) {
        if (c) { this.lbldosevolume1 = c; }
    };
    private spacutal: StackPanel;
    @ViewChild("spacutalTempRef", { read: StackPanel, static: false }) set _spacutal(c: StackPanel) {
        if (c) { this.spacutal = c; }
    };
    private lblactual: iLabel;
    @ViewChild("lblactualTempRef", { read: iLabel, static: false }) set _lblactual(c: iLabel) {
        if (c) { this.lblactual = c; }
    };
    private lbldosevolume2: iLabel;
    @ViewChild("lbldosevolume2TempRef", { read: iLabel, static: false }) set _lbldosevolume2(c: iLabel) {
        if (c) { this.lbldosevolume2 = c; }
    };
    private lblintendeddosevalue: iLabel;
    @ViewChild("lblintendeddosevalueTempRef", { read: iLabel, static: false }) set _lblintendeddosevalue(c: iLabel) {
        if (c) { this.lblintendeddosevalue = c; }
    };
    private lblactualdosevalue: iLabel;
    @ViewChild("lblactualdosevalueTempRef", { read: iLabel, static: false }) set _lblactualdosevalue(c: iLabel) {
        if (c) { this.lblactualdosevalue = c; }
    };
    private lblintendedvolvalue: iLabel;
    @ViewChild("lblintendedvolvalueTempRef", { read: iLabel, static: false }) set _lblintendedvolvalue(c: iLabel) {
        if (c) { this.lblintendedvolvalue = c; }
    };
    private lblactualvolvalue: iLabel;
    @ViewChild("lblactualvolvalueTempRef", { read: iLabel, static: false }) set _lblactualvolvalue(c: iLabel) {
        if (c) { this.lblactualvolvalue = c; }
    };
    private cboDoseDiscReason: iComboBox;
    @ViewChild("cboDoseDiscReasonTempRef", { read: iComboBox, static: false }) set _cboDoseDiscReason(c: iComboBox) {
        if (c) { this.cboDoseDiscReason = c; }
    };
     lblcliniIncFrm: iLabel = new iLabel();
    @ViewChild("lblcliniIncFrmTempRef", { read: iLabel, static: false }) set _lblcliniIncFrm(c: iLabel) {
        if (c) { this.lblcliniIncFrm = c; }
    };
     lblcliniIncFrmValue: iLabel = new iLabel();
    @ViewChild("lblcliniIncFrmValueTempRef", { read: iLabel, static: false }) set _lblcliniIncFrmValue(c: iLabel) {
        if (c) { this.lblcliniIncFrmValue = c; }
    };
    private lblComments: iLabel;
    @ViewChild("lblCommentsTempRef", { read: iLabel, static: false }) set _lblComments(c: iLabel) {
        if (c) { this.lblComments = c; }
    };
    private txtComments: iTextBox;
    @ViewChild("txtCommentsTempRef", { read: iTextBox, static: false }) set _txtComments(c: iTextBox) {
        if (c) { this.txtComments = c; }
    };


    constructor() {
        super();
    }

    constructorImpl(oVM: SlotDetailVM) {
        this.objVm = oVM;
        this.objVm.IsReasonDoseDisForInfusion = false;
    }
    override _DataContext: SlotDetailVM;
    override get DataContext() {
        return this._DataContext;
    }
    @Input() override set DataContext(value: SlotDetailVM) {
        this._DataContext = value;
        this.objVm = value;
    }
    ngOnInit() {
        this.lblCIFValue_MouseLeftButtonUp_Func = (s, e) => { this.lblCIFValue_MouseLeftButtonUp(s, e) };
        this.cboDoseDiscReason_SelectionChanged_Func = (s, e) => { this.cboDoseDiscReason_SelectionChanged(s, e) };
        this.ChildWindow_Loaded(null, null);
    }

    ngAfterViewInit(){
        this.cboDoseDiscReason.Focus();
        if (this.objVm.AdministrationDetail.DoseDiscReasonCode) {
            this.objVm.AdministrationDetail.DoseDiscReasonCode = null;
        }
    }
    public cmdOkClick(): boolean {
       this.iMsgBox.MessageBoxClose = (s, e) => { this.iMsgBox_MessageBoxClose(s, e); };
        if (String.IsNullOrEmpty(this.cboDoseDiscReason.GetText())) {
            Busyindicator.SetStatusIdle("Administration");
            this.iMsgBox.Title = "LORENZO";
            this.iMsgBox.Message = MedicationAdministrator.cboDoseDiscReason_Mandatory_Error;
            this.iMsgBox.MessageButton = MessageBoxButton.OK;
            this.iMsgBox.IconType = MessageBoxType.Information;
            this.iMsgBox.Tag = "Reason";
            this.iMsgBox.Show();
        }
        else if (this.lblComments.Mandatory == true && String.IsNullOrEmpty(this.txtComments.Text)) {
            Busyindicator.SetStatusIdle("Administration");
            this.iMsgBox.Title = "LORENZO";
            this.iMsgBox.Message = "Enter comments, this field is mandatory.";
            this.iMsgBox.MessageButton = MessageBoxButton.OK;
            this.iMsgBox.IconType = MessageBoxType.Information;
            this.iMsgBox.Tag = "Comments";
            this.iMsgBox.Show();
        }
        else {
            return true;
        }
        return false;
    }
    iMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        this.objVm.IsSubmitInProgress = false;
        Busyindicator.SetStatusIdle("Administration");
        if (String.Compare(this.iMsgBox.Tag.ToString(), "Reason", StringComparison.InvariantCultureIgnoreCase) == 0)
            this.cboDoseDiscReason.Focus();
        else if (String.Compare(this.iMsgBox.Tag.ToString(), "Comments", StringComparison.InvariantCultureIgnoreCase) == 0)
            this.txtComments.Focus();
    }
    public GetDomainCombo(Domain: string): void {
        switch (Domain) {
            case ValueDomain.ReasonforDiscrepancy:
                ProcessRTE.GetValuesByDomainCode(Domain, (s, e) => { this.OnRTEResult(s) });
                break;
        }
    }
    OnRTEResult(args: RTEEventargs): void {
        if (String.IsNullOrEmpty(args.Request) || args.Result == null)
            return
        if (String.Compare(args.Request, ValueDomain.ReasonforDiscrepancy, StringComparison.CurrentCultureIgnoreCase) == 0) {
            if (this.objVm != null && this.objVm.AdministrationDetail != null) {
                this.objVm.AdministrationDetail.DoseDiscReasonCodes = new ObservableCollection<CListItem>();
                let nCount: number = (<List<CListItem>>args.Result).Count;
                for (let i: number = 0; i < nCount; i++) {
                    let oCListItem: CListItem = (<List<CListItem>>args.Result)[i];
                    if (!this.objVm.IsAmend && String.Compare(oCListItem.Value, "CC_AMENDPRESRSN", StringComparison.OrdinalIgnoreCase) == 0)
                        continue;
                    if (this.objVm.IsReasonDoseDisForInfusion && String.Compare(oCListItem.Value, "CC_SELFADMINERROR", StringComparison.OrdinalIgnoreCase) != 0)
                        this.objVm.AdministrationDetail.DoseDiscReasonCodes.Add(oCListItem);
                    else if (!this.objVm.IsReasonDoseDisForInfusion)
                        this.objVm.AdministrationDetail.DoseDiscReasonCodes.Add(oCListItem);
                    if (this.objVm.IsAmend && String.Compare(oCListItem.Value, "CC_AMENDPRESRSN", StringComparison.OrdinalIgnoreCase) == 0) {
                        this.objVm.AdministrationDetail.DoseDiscReasonCodes.forEach((oRsnCode) => {
                            if (oCListItem.Value == oRsnCode.Value)
                                this.objVm.AdministrationDetail.DoseDiscReasonCode = oRsnCode;
                        });
                    }
                }
            }
        }
    }
    ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.DataContext = this.objVm;
        this.objVm = ObjectHelper.CreateType<SlotDetailVM>(this.DataContext, SlotDetailVM);
        let Domaincode: string = "MEDRSNFRDISCP";
        this.GetCliniicalIncidentFormConfig();
        this.GetDomainCombo(Domaincode);
    }
    GetCliniicalIncidentFormConfig(): void {
        if (ProfileData.ClinicalIncidentConfig != null && ProfileData.ClinicalIncidentConfig.isRecordAdminDoseDiscrepancy) {
            this.lblcliniIncFrm.Visibility = Visibility.Visible;
            this.lblcliniIncFrmValue.Visibility = Visibility.Visible;
            if (ProfileData.ClinicalIncidentConfig != null && this.ValidateURL(ProfileData.ClinicalIncidentConfig.Address)) {
                this.lblcliniIncFrmValue.IsEnabled = true;
                this.objVm.AdministrationDetail.ClinicalIncidentForm = ProfileData.ClinicalIncidentConfig.LinkTextToDisplay;
            }
            else {
                this.lblcliniIncFrmValue.IsEnabled = false;
            }
        }
        else {
            this.lblcliniIncFrm.Visibility = Visibility.Collapsed;
            this.lblcliniIncFrmValue.Visibility = Visibility.Collapsed;
        }
    }
    public ValidateURL(url: string): boolean {
        let RgxUrl: RegExp = new RegExp("^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$");
        return RgxUrl.test(url);
    }
    lblCIFValue_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
        if (ProfileData.ClinicalIncidentConfig != null && !String.IsNullOrEmpty(ProfileData.ClinicalIncidentConfig.Address) && this.ValidateURL(ProfileData.ClinicalIncidentConfig.Address)){
            HtmlPage.Window.Invoke("LaunchClinicalIncidentForm", ProfileData.ClinicalIncidentConfig.Address);
        }
    }
    cboDoseDiscReason_SelectionChanged(sender: Object, e: SelectionChangedEventArgs): void {
        if (this.cboDoseDiscReason.SelectedValue != null && (<CListItem>(this.cboDoseDiscReason.SelectedValue)).Value == "CC_CLNCLRSN")
            this.lblComments.Mandatory = true;
        else this.lblComments.Mandatory = false;
    }
}
