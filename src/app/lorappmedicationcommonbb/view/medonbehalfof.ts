import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity, ScriptObject, ProcessRTE } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow, AppContextInfo, List, CListItem, ContextInfo, RTEEventargs, HtmlPage, ObservableCollection } from 'epma-platform/models';
import { AppDialog, Grid, iComboBox, iLabel } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { iSFS } from 'src/app/shared/epma-platform/controls/epma-isfs/epma-isfs.component';
import { onbehalfof } from 'src/app/lorappmanageprescriptionbbui/resource/onbehalfof.designer';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { CConstants } from '../utilities/constants';
import { Dictionary } from 'epma-platform/dictionary';
import { Resource } from 'src/app/lorappmanageprescriptionbbui/resource';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
var that;

@Component({
    selector: 'medonbehalfof',
    templateUrl: './medonbehalfof.html',
})
export class medonbehalfof extends iAppDialogWindow implements  AfterViewInit {
    public LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    public lblOnBehalfOf: iLabel;
    @ViewChild("lblOnBehalfOfTempRef", { read: iLabel, static: false }) set _lblOnBehalfOf(c: iLabel) {
        if (c) { this.lblOnBehalfOf = c; }
    };
    public SFSOnBehalfOf: iSFS = new iSFS();
    @ViewChild("SFSOnBehalfOfTempRef", { read: iSFS, static: false }) set _SFSOnBehalfOf(c: iSFS) {
        if (c) { this.SFSOnBehalfOf = c; }
    };
    public lblReason: iLabel;
    @ViewChild("lblReasonTempRef", { read: iLabel, static: false }) set _lblReason(c: iLabel) {
        if (c) { this.lblReason = c; }
    };
    public cboReason: iComboBox;
    @ViewChild("cboReasonTempRef", { read: iComboBox, static: false }) set _cboReason(c: iComboBox) {
        if (c) { this.cboReason = c; }
    };
    public lblCommunicationMode: iLabel;
    @ViewChild("lblCommunicationModeTempRef", { read: iLabel, static: false }) set _lblCommunicationMode(c: iLabel) {
        if (c) { this.lblCommunicationMode = c; }
    };
    public cboCommunicationMode: iComboBox ;
    @ViewChild("cboCommunicationModeTempRef", { read: iComboBox, static: false }) set _cboCommunicationMode(c: iComboBox) {
        if (c) { this.cboCommunicationMode = c; }
    };

    public onbof = Resource.onbehalfof;
    public Styles = ControlStyles;
    public PrescriberName: string = String.Empty;
    public PrescriberOID: string = String.Empty;
    public OnBehalfOfReasonValue : string = String.Empty;
    public CommunicationModeValue : string = String.Empty;
    public OnBehalfOfReason : string = String.Empty;
    public CommunicationMode : string = String.Empty;

    constructor() {
        super();
        // InitializeComponent();
        that = this;
    }

    ngAfterViewInit(): void {
        this.ChildWindow_Loaded({}, null);
    }
    
    public OKButtonClick(): boolean {
        Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
        let returnValue: boolean = false;
        if (!String.IsNullOrEmpty(this.SFSOnBehalfOf.SelectedValue) && !String.IsNullOrEmpty(this.SFSOnBehalfOf.SelectedText)) {
            returnValue = true;
        }
        else {
            let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                Title: "LORENZO",
                Message: onbehalfof.On_behalf_Mandatory_Message,
                MessageButton: MessageBoxButton.OK,
                IconType: MessageBoxType.Information
            });
            iMsgBox.MessageBoxClose = (s, e) => { this.iMsgBox_MessageBoxClose(s, e); };
            iMsgBox.Show();
        }
        return returnValue;
    }
    iMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
        if (e.MessageBoxResult == MessageBoxResult.OK) {
        this.SFSOnBehalfOf.Focus();
        }
    }
    public CancelButtonClick(): void {
        Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
        this.DataContext = "";
        this.appDialog.DialogRef.close();
    }

    async SFSOnBehalfOf_SFSOpen_Func(){
        Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
        await this.SFSOnBehalfOf_OnSFSOpen();
    }
    async SFSOnBehalfOf_OnSFSOpen(): Promise<void>{        
        let oParam: string[] = new Array(1);
        oParam[0] = AppContextInfo.OrganisationName;
        let returnValue: ScriptObject = <ScriptObject>(await HtmlPage.Window.InvokeAsync("SFSCareProvider", oParam) as ScriptObject);        
        if (returnValue != null && returnValue.GetProperty("length") != null) {
            let nSelectCnt: number = Convert.ToInt32(returnValue.GetProperty("length"));
            let oSelectedItems: List<CListItem> = new List<CListItem>();
            for (let i: number = 0; i < nSelectCnt; i++) {
                let selectedValue: ScriptObject = ObjectHelper.CreateType<ScriptObject>(returnValue.GetProperty(i), ScriptObject);
                let oItem: CListItem = new CListItem();
                if (!String.IsNullOrEmpty(selectedValue["ForeName"]as string)) {
                    oItem.DisplayText = selectedValue["SurName"] + " " + selectedValue["ForeName"];
                }
                else {
                    oItem.DisplayText = selectedValue["SurName"]as string;
                }
                oItem.Value = ObjectHelper.CreateType<string>(selectedValue["OId"], String);
                oSelectedItems.Add(oItem);
            }
            this.SFSOnBehalfOf.ItemsSource = oSelectedItems;
            if (oSelectedItems != null && oSelectedItems.Count > 0) {
                
                this.SFSOnBehalfOf.SelectedValue = oSelectedItems[0].Value;
            }
        }
    }
    private ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
        if (!String.IsNullOrEmpty(this.PrescriberName) && !String.IsNullOrEmpty(this.PrescriberOID)) {
            let OnbehalfSelectedItems: List<CListItem> = new List<CListItem>();
            let OnbehalfItem: CListItem = new CListItem();
            OnbehalfItem.DisplayText = this.PrescriberName;
            OnbehalfItem.Value = this.PrescriberOID;
            OnbehalfSelectedItems.Add(OnbehalfItem);
            this.SFSOnBehalfOf.ItemsSource = OnbehalfSelectedItems;
            if (OnbehalfSelectedItems != null) {
                this.SFSOnBehalfOf.SelectedValue = OnbehalfSelectedItems[0].Value;
            }
        }        
        ProcessRTE.GetHierarchicalValuesByDomains(CConstants.CodingSchemeName, CConstants.Version, CConstants.FilterType, ContextInfo.Culture, "MEDONBHFRSN,COMMNMODE", (s, e) => {this.OnRTEResult(s);});
    }
    OnRTEResult(args: RTEEventargs): void {
        if (String.IsNullOrEmpty(args.Request) || args.Result == null)
            return
        if (String.Compare(args.Request, "MEDONBHFRSN,COMMNMODE") == 0) {
            if (args.Result instanceof Dictionary) {
                let objResult: Dictionary<string, List<CListItem>> = <Dictionary<string, List<CListItem>>>args.Result;
                objResult.forEach((objDomainDetail) => {
                    switch (objDomainDetail.Key) {
                        case "MEDONBHFRSN":
                            this.cboReason.ItemsSource = <List<CListItem>>objDomainDetail.Value;
                            if (!String.IsNullOrEmpty(this.OnBehalfOfReasonValue)) {
                                this.cboReason.SelectedValue = this.OnBehalfOfReasonValue;
                            }
                            break;
                        case "COMMNMODE":
                            this.cboCommunicationMode.ItemsSource = <List<CListItem>>objDomainDetail.Value;
                            if (!String.IsNullOrEmpty(this.CommunicationModeValue)) {
                                this.cboCommunicationMode.SelectedValue = this.CommunicationModeValue;
                            }
                            break;
                    }
                });
            }
        }
    }
}
