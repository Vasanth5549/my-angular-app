import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { iAppDialogWindow } from "src/app/shared/epma-platform/controls/iAppDialogWindow";
import { CConstants, ValueDomain } from "../utilities/constants";
import { SelectionMode, iCheckedListbox } from "src/app/shared/epma-platform/controls/epma-icheckedlistbox/epma-icheckedlistbox.component";
import { Grid, iLabel, iTextBox } from "epma-platform/controls";
import { RoutedEventArgs } from "src/app/shared/epma-platform/controls/FrameworkElement";
import { MessageBoxButton, MessageBoxResult, MessageBoxType, MessageEventArgs, ObjectHelper, ProcessRTE, iMessageBox } from "epma-platform/services";
import { CListItem, ContextInfo, List, RTEEventargs, Visibility } from "epma-platform/models";
import { Dictionary } from "epma-platform/dictionary";
import { OnSelectEventArgs, OnUnSelectEventArgs } from "src/app/shared/epma-platform/controls/Control";
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { Resource } from '../resource';

@Component({
  selector: 'multiSelectListWindow',
  templateUrl: './multiSelectListWindow.html',
  styleUrls: ['./multiSelectListWindow.css']
})
export class MultiSelectListWindow extends iAppDialogWindow implements AfterViewInit {

  public ValueDomainCode: string;
    public SelectedConceptCodes: string;
    public SelectedConceptText: string;
    bIsLoaded: boolean;
    public Styles = ControlStyles;
    public mulsel = Resource.multilist;
    
    private LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    private lblInstructions: iLabel;
    @ViewChild("lblInstructionsTempRef", { read: iLabel, static: false }) set _lblInstructions(c: iLabel) {
        if (c) { this.lblInstructions = c; }
    };
    private chkInstructions: iCheckedListbox;
    @ViewChild("chkInstructionsTempRef", { read: iCheckedListbox, static: false }) set _chkInstructions(c: iCheckedListbox) {
        if (c) { this.chkInstructions = c; }
    };
    private lblOtherInstructions: iLabel;
    @ViewChild("lblOtherInstructionsTempRef", { read: iLabel, static: false }) set _lblOtherInstructions(c: iLabel) {
        if (c) { this.lblOtherInstructions = c; }
    };
    private txtOtherInstructions: iTextBox;
    @ViewChild("txtOtherInstructionsTempRef", { read: iTextBox, static: false }) set _txtOtherInstructions(c: iTextBox) {
        if (c) { this.txtOtherInstructions = c; }
    };
    
    constructor() {
        super();
        // InitializeComponent();   
    }
    ngAfterViewInit(): void {
        this.bIsLoaded = false;
        this.Loaded = (s, e) => { this.MultiSelectListWindow_Loaded(s, e); };
    }
    constructorImpl(sDomainCode: string, sSelectedConceptCodes: string, sSelectedText: string, isMultiSelectEnabled: boolean){
        this.ValueDomainCode = sDomainCode;
        this.SelectedConceptCodes = sSelectedConceptCodes;
        this.SelectedConceptText = sSelectedText;
        if (String.Equals(this.ValueDomainCode, ValueDomain.SupplyInstruction, StringComparison.CurrentCultureIgnoreCase)) {
            this.chkInstructions.SelectionMode = SelectionMode.Multiple;
        }
    }

    MultiSelectListWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
        if (!this.bIsLoaded) {
            this.bIsLoaded = true;
            this.lblOtherInstructions.IsEnabled = false;
        }
    }
    public OKButton_Click(): boolean {
        this.DataContext = this.chkInstructions.SelectedItems;
        return true;
    }
    iMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        this.txtOtherInstructions.Focus();
    }
    public CancelButton_Click(): void {
        let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
            Title: "LORENZO",
            Message: "You are about to cancel this activity, are you sure?",
            MessageButton: MessageBoxButton.YesNo,
            IconType: MessageBoxType.Question
        });
        iMsgBox.MessageBoxClose = (s, e) => { this.iMsgBox_MessageBoxClosed(s, e); };
        iMsgBox.Show();
    }
    iMsgBox_MessageBoxClosed(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.Yes || e.MessageBoxResult == MessageBoxResult.OK) {
            this.DataContext = null;
            this.appDialog.DialogResult = false;
        }
    }
    private ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
        if (!String.IsNullOrEmpty(this.ValueDomainCode)) {
            if (String.Compare(this.ValueDomainCode, ValueDomain.SupplyInstruction, StringComparison.CurrentCultureIgnoreCase) == 0) {
                this.lblInstructions.Text = "Select supply instruction(s)";
                this.lblOtherInstructions.Visibility = Visibility.Collapsed;
                this.txtOtherInstructions.Visibility = Visibility.Collapsed;
                ProcessRTE.GetHierarchicalValuesByDomains(CConstants.CodingSchemeName, CConstants.Version, CConstants.FilterType, ContextInfo.Culture, ValueDomain.SupplyInstruction, this.OnRTEResultForHierarchicalDomain);
            }
            else if (String.Compare(this.ValueDomainCode, ValueDomain.MedicationClerking, StringComparison.CurrentCultureIgnoreCase) == 0) {
                this.lblInstructions.Text = "Select medication clerking source(s)";
                ProcessRTE.GetValuesByDomainCode(ValueDomain.MedicationClerking, this.OnRTEResult);
            }
            else {
                this.lblInstructions.Text = String.Empty;
            }
        }
    }
    OnRTEResult(args: RTEEventargs): void {
        if (String.IsNullOrEmpty(args.Request) || args.Result == null)
            return
        if ((String.Compare(args.Request, ValueDomain.DispensingInstruction, StringComparison.CurrentCultureIgnoreCase) == 0) && this.SelectedConceptCodes.length > 0) {
            let arrValue: string[] = this.SelectedConceptCodes.IndexOf(',') != -1 ? this.SelectedConceptCodes.Split(',') : this.SelectedConceptCodes.Split(';');
            let arrText: string[] = this.SelectedConceptText.IndexOf(',') != -1 ? this.SelectedConceptText.Split(',') : this.SelectedConceptText.Split(';');
            if (arrValue.length > 0) {
                for (let i: number = 0; i < arrValue.length; i++) {
                    if (arrValue[i].IndexOf("CC_OTHER") != -1) {
                        this.txtOtherInstructions.Text = arrText[i];
                        break;
                    }
                }
            }
        }
        if (args.Result != null && args.Result instanceof List) {
            (args.Result as List<CListItem>).forEach((oCListItem) => {
                let bIsSelected: boolean = false;
                bIsSelected = (!String.IsNullOrEmpty(this.SelectedConceptCodes) ? this.SelectedConceptCodes.Contains(oCListItem.Value) : false);
                this.chkInstructions.AddItem(ObjectHelper.CreateObject(new CListItem(), {
                    DisplayText: oCListItem.DisplayText,
                    Value: oCListItem.Value,
                    IsSelected: bIsSelected
                }));
            });
        }
    }
    OnRTEResultForHierarchicalDomain(args: RTEEventargs): void {
        if (String.IsNullOrEmpty(args.Request) || args.Result == null)
            return
        if (args.Result != null && args.Result instanceof Dictionary) {
            let objResult: Dictionary<string, List<CListItem>> = <Dictionary<string, List<CListItem>>>args.Result;
            objResult.forEach((oCListItem) => {
                oCListItem.Value.forEach((oCListItems) => {
                    let bIsSelected: boolean = false;
                    if ((String.Compare(args.Request, ValueDomain.DispensingInstruction, StringComparison.CurrentCultureIgnoreCase) == 0) && (String.Compare(oCListItems.Value, "CC_OTHER", StringComparison.CurrentCultureIgnoreCase) == 0) && !String.IsNullOrEmpty(this.txtOtherInstructions.Text)) {
                        bIsSelected = true;
                    }
                    else {
                        if (!String.IsNullOrEmpty(this.SelectedConceptCodes)) {
                            bIsSelected = this.SelectedConceptCodes.Contains(oCListItems.Value);
                            if (!bIsSelected) {
                                bIsSelected = this.SelectedConceptCodes.Contains(oCListItems.DisplayText);
                            }
                        }
                    }
                    this.chkInstructions.AddItem(ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: oCListItems.DisplayText,
                        Value: oCListItems.Value,
                        IsSelected: bIsSelected
                    }));
                });
            });
        }
    }
    private chkInstructions_OnSelect(sender: Object, e: OnSelectEventArgs): void {
        if ((String.Compare(this.ValueDomainCode, ValueDomain.DispensingInstruction, StringComparison.CurrentCultureIgnoreCase) == 0) && (String.Compare(e.Value, "CC_OTHER", StringComparison.CurrentCultureIgnoreCase) == 0)) {
            this.lblOtherInstructions.Mandatory = this.lblOtherInstructions.IsEnabled = true;
            this.txtOtherInstructions.IsEnabled = true;
        }
    }
    private chkInstructions_OnUnSelect(sender: Object, e: OnUnSelectEventArgs): void {
        if ((String.Compare(this.ValueDomainCode, ValueDomain.DispensingInstruction, StringComparison.CurrentCultureIgnoreCase) == 0) && (String.Compare(e.Value, "CC_OTHER", StringComparison.CurrentCultureIgnoreCase) == 0)) {
            this.lblOtherInstructions.Mandatory = this.lblOtherInstructions.IsEnabled = false;
            this.txtOtherInstructions.IsEnabled = false;
            this.txtOtherInstructions.Text = String.Empty;
        }
    }

}
