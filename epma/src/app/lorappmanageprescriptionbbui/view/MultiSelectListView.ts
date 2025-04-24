import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { StringComparison, iAppDialogWindow, ObservableCollection, CListItem, List } from 'epma-platform/models';
import { iLabel, iTextBox, } from 'epma-platform/controls';
import { iCheckedListbox } from 'src/app/shared/epma-platform/controls/epma-icheckedlistbox/epma-icheckedlistbox.component';
import 'epma-platform/stringextension';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxType, MessageBoxButton } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { MultiSelectListVM } from '../viewmodel/MultiSelectListVM';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { Visibility } from 'src/app/shared/epma-platform/controls-model/Visibility';
import { Grid } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { ValueDomain } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { OnSelectEventArgs, OnUnSelectEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { CConstants } from '../utilities/constants';
import { Resource } from '../resource';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";

@Component({
    selector: 'MultiSelectListView',
    templateUrl: './MultiSelectListView.html',
    styleUrls: ['./multiselectlistview.css'],
})

export class MultiSelectListView extends iAppDialogWindow implements AfterViewInit {
    @HostListener("document:keyup", ["$event"])
    public keydown(event: KeyboardEvent): void {
      if (event.code === "Tab") {
        console.log("multiselectview.tab",event.target);
        try{
          if (this.DataContext.ValueDomainCollection && (event.target as any).value == this.DataContext.ValueDomainCollection[0].DisplayText){
            (event.target as any).parentElement.parentElement.parentElement.parentElement.className += " focuscheckbox " 
        }
          if (this.DataContext.ValueDomainCollection && this.DataContext.ValueDomainCollection.Length > 1  && (event.target as any).value == this.DataContext.ValueDomainCollection[1].DisplayText){
            (event.target as any).parentElement.parentElement.parentElement.parentElement.previousElementSibling.className =(event.target as any).parentElement.parentElement.parentElement.parentElement.previousElementSibling.className.replace("focuscheckbox",''); 
            (document.getElementsByClassName("img-ok_symbol")[0] as any).focus()
        }
      }catch(e){
        console.log(e);
      }
    }
    }
    LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    lblInstructions: iLabel;
    @ViewChild("lblInstructionsTempRef", { read: iLabel, static: false }) set _lblInstructions(c: iLabel) {
        if (c) { this.lblInstructions = c; }
    };
    chkInstructions: iCheckedListbox;
    @ViewChild("chkInstructionsTempRef", { read: iCheckedListbox, static: false }) set _chkInstructions(c: iCheckedListbox) {
        if (c) { this.chkInstructions = c; }
    };
    lblComments: iLabel;
    @ViewChild("lblCommentsTempRef", { read: iLabel, static: false }) set _lblComments(c: iLabel) {
        if (c) { this.lblComments = c; }
    };
    txtComments: iTextBox;
    @ViewChild("txtCommentsTempRef", { read: iTextBox, static: false }) set _txtComments(c: iTextBox) {
        if (c) { this.txtComments = c; }
    };
    lblDisclaimerText: iLabel;
    @ViewChild("lblDisclaimerTextTempRef", { read: iLabel, static: false }) set _lblDisclaimerText(c: iLabel) {
        if (c) { this.lblDisclaimerText = c; }
    };
    lblOtherInstructions: iLabel;
    @ViewChild("lblOtherInstructionsTempRef", { read: iLabel, static: false }) set _lblOtherInstructions(c: iLabel) {
        if (c) { this.lblOtherInstructions = c; }
    };
    txtOtherInstructions: iTextBox;
    @ViewChild("txtOtherInstructionsTempRef", { read: iTextBox, static: false }) set _txtOtherInstructions(c: iTextBox) {
        if (c) { this.txtOtherInstructions = c; }
    };
    _contentLoaded: Boolean;
    @ViewChild("_contentLoadedTempRef", { read: Boolean, static: false }) set __contentLoaded(c: Boolean) {
        if (c) { this._contentLoaded = c; }
    };
    // <local:ResMedRelatedOption x:Key="objResMedRelatedOption"></local:ResMedRelatedOption>
    // public objResMedRelatedOption = Resource.ResMedRelatedOption;
    // <local:multilist x:Key="mulsel"/>
    public mulsel = Resource.multilist;
    oVM: MultiSelectListVM=new MultiSelectListVM();
    oDefaultValue: ObservableCollection<CListItem>;
    DomainCode: string = "";
    Comments: string = "";
    IsCommentsVisible: boolean = false;
    public Styles = ControlStyles;
    constructor() {
        super();
    }
    public maxScrollHeight;
    ngAfterViewInit(): void {
        if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
            this.maxScrollHeight = 238;
        }else{
            this.maxScrollHeight = (window.devicePixelRatio == 1) ? 410 :(410/window.devicePixelRatio)-45;
        }
        this.lblComments.Visibility = Visibility.Collapsed;
        this.txtComments.Visibility = Visibility.Collapsed;
        this.ChildWindow_Loaded(null, null);
        this.chkInstructions.OnSelect = (s, e) => { this.chkInstructions_OnSelect(s, e) };
        this.chkInstructions.OnUnSelect = (s, e) => { this.chkInstructions_OnUnSelect(s, e) };
    }
    constructorImpl(ValueDomainCode: string, oSelectedItem: List)
    // to be revisited as IList --->is not there only List is there
    {
        switch (arguments.length) {
            case 1: {
                this.oVM = new MultiSelectListVM(ValueDomainCode);
                console.log(this.oVM);
                this.oDefaultValue = new ObservableCollection<CListItem>;
                this.DataContext = this.oVM;
                this.DomainCode = ValueDomainCode;
                break;
            }
            case 2: {
                this.oDefaultValue = this.PopulateDefaultValues(oSelectedItem);
                this.oVM = new MultiSelectListVM(ValueDomainCode, this.oDefaultValue ? this.oDefaultValue.ToList() : null);
                this.DataContext = this.oVM;
                console.log('this.oVM==>', this.oVM);
                console.log(' this.DataContext==>', this.DataContext);
                this.DomainCode = ValueDomainCode;
                break;
            }
        }
    }
    PopulateDefaultValues(oSelectedItem: List): ObservableCollection<CListItem> {
        let oDefaultValue: ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
        if (oSelectedItem != null && oSelectedItem.Count > 0) {
            let oCListItem: CListItem = null;
            oSelectedItem.forEach((oItem: any) => {
                console.log(oItem);
                oCListItem = ObjectHelper.CreateObject(new CListItem(), {
                    DisplayText: oItem.DisplayText,
                    Value: oItem.Value,
                    IsSelected: oItem.IsSelected,
                    Tag: oItem.Tag
                });
                oDefaultValue.Add(oCListItem);
                if (String.Compare(oCListItem.Value, "CC_OTHER_FREETEXT", StringComparison.CurrentCultureIgnoreCase) == 0) {
                    if (this.oVM != null && this.lblOtherInstructions) {
                        this.oVM.OtherInstructionsEnable = true;
                        if (this.lblOtherInstructions) {
                            this.lblOtherInstructions.Mandatory = this.lblOtherInstructions.IsEnabled = true;
                        }
                    }
                    else {
                        this.oVM = new MultiSelectListVM();
                        if (oItem.DisplayText == "Other") {
                            if (oItem.IsSelected) {
                                this.oVM.IsOtherSelected = true;
                                if (oItem.Tag != null) {
                                    this.Comments = oItem.Tag.ToString();
                                    this.IsCommentsVisible = true;
                                    this.oVM.IsCommentsEntered = true;
                                    this.oVM.Comments = oItem.Tag.ToString();                                
                                  /*  
                                   if(this.txtComments != null)
                                    {
                                        this.txtComments.Visibility = Visibility.Visible;
                                        this.lblComments.Visibility = Visibility.Visible;
                                    } */
                                }
                                else {
                                    this.Comments = "";
                                    this.txtComments.Visibility = Visibility.Visible;
                                    this.oVM.IsCommentsEntered = true;
                                    this.oVM.Comments = "";
                                    this.IsCommentsVisible = true;
                                    this.lblComments.Visibility = Visibility.Visible;
                                }
                               // this.lblComments.Mandatory = true;
                            }
                            else {
                                this.oVM.IsOtherSelected = false;
                                this.oVM.IsCommentsEntered = false;
                                this.IsCommentsVisible = false;
                                if(this.txtComments != null)
                                {
                                    this.txtComments.Visibility = Visibility.Collapsed;
                                    this.oVM.Comments = "";
                                    this.lblComments.Mandatory = false;
                                    this.lblComments.Visibility = Visibility.Collapsed;
                                }
                            }
                        }
                        else {
                            this.oVM.IsOtherSelected = false;
                            this.txtComments.Visibility = Visibility.Collapsed;
                            this.oVM.IsCommentsEntered = false;
                            this.oVM.Comments = "";
                            this.lblComments.Mandatory = false;
                            this.IsCommentsVisible = false;
                            this.lblComments.Visibility = Visibility.Collapsed;
                        }
                    }
                }
            });
        }
        return oDefaultValue;
    }
    public okButtonClick(): boolean {
        if (this.oVM.VerifySelection()) {
            // ObjectHelper.stopFinishAndCancelEvent(false);
            this.appDialog.DialogResult = true;
            return true;
        }
        else {
            if (this.oVM != null && this.oVM.isEntercommentsMsgToBeShown) {
                this.oVM.isEntercommentsMsgToBeShown = false;
                let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                    Title: "LORENZO",
                    Message: "Please enter comments",
                    MessageButton: MessageBoxButton.OK,
                    IconType: MessageBoxType.Information
                });
                iMsgBox.MessageBoxClose = (s, e) => { this.iMsgBox_MessageBoxClosed(s, e); };
                iMsgBox.Show();
            }
            return false;
        }
    }
    public CancelButtonClick(): void {
        let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
            Title: "LORENZO",
            Message: "You are about to cancel this activity, are you sure?",
            MessageButton: MessageBoxButton.YesNo,
            IconType: MessageBoxType.Question
        });
        iMsgBox.MessageBoxClose = (s, e) => { this.iMsgBox_MessageBoxClose(s, e); };
        iMsgBox.Show();
    }
    iMsgBox_MessageBoxClosed(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.OK) {
            this.txtComments.Focus();
        }
    }
    iMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.Yes) {
            // commented out for null check error in lblInstructions.Text error 15-06
            // ObjectHelper.stopFinishAndCancelEvent(false);
            this.DataContext = this.oVM = null;
            this.appDialog.DialogResult = false;
           // let objbase: IPPMABaseVM = ObjectHelper.CreateType<IPPMABaseVM>(this.oResolveItem.ParentbaseVM, IPPMABaseVM);
        }// added else to check the flow 15-06
        else {
            return;
        }
    }
    chkInstructions_OnSelect(sender: Object, e: OnSelectEventArgs): void {
        console.log('OnSelect Change event Detected', e);
        this.oVM = this.DataContext;// added as oVM is coming undefined 9-6
        //   let list=this.oVM.SelectedListItems;// added to get the sel ele 09-06
        //  let selEle=this.DataContext._listItems.filter(ele=>ele.IsSelected);
        //  console.log('selEle',selEle);
        if ((String.Compare(this.oVM.ValueDomainCode, ValueDomain.DispensingInstruction, StringComparison.CurrentCultureIgnoreCase) == 0)) {
            this.oVM.OtherInstructionsEnable = true;
            this.lblOtherInstructions.Mandatory = this.lblOtherInstructions.IsEnabled = true;
        }
        if (e.Value == "CC_OTHER_FREETEXT") {
            this.oVM.OtherInstructionsEnable = true;
            this.oVM.IsCommentsEntered = true;
            this.txtComments.Visibility = Visibility.Visible;
            this.lblComments.Visibility = Visibility.Visible;
            this.lblOtherInstructions.Mandatory = this.lblOtherInstructions.IsEnabled = true;
            this.lblComments.Mandatory = true;
            this.txtComments.Text = "";
        }
    }
    chkInstructions_OnUnSelect(sender: Object, e: OnUnSelectEventArgs): void {

        if ((String.Compare(this.oVM.ValueDomainCode, ValueDomain.DispensingInstruction, StringComparison.CurrentCultureIgnoreCase) == 0)) {
            this.txtOtherInstructions.Text = String.Empty;
            this.oVM.OtherInstructionsEnable = false;
            this.lblOtherInstructions.Mandatory = this.lblOtherInstructions.IsEnabled = false;
        }
        if (e.Value == "CC_OTHER_FREETEXT") {
            this.txtOtherInstructions.Text = String.Empty;
            this.oVM.OtherInstructionsEnable = false;
            this.oVM.IsCommentsEntered = true;
            this.oVM.Comments = "";
            this.IsCommentsVisible = true;
            this.lblComments.Visibility = Visibility.Collapsed;
            this.lblOtherInstructions.Mandatory = this.lblOtherInstructions.IsEnabled = false;
            this.txtComments.Visibility = Visibility.Collapsed;
            this.txtComments.Text = "";
            this.lblComments.Mandatory = false;
        }
    }
  public  ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.DataContext = this.oVM;
        this.chkInstructions.DataContext = this.DataContext;
        if (this.chkInstructions.DataContext != null) {
            let oMultiSelectListVM: MultiSelectListVM = <MultiSelectListVM>this.chkInstructions.DataContext;
            if (oMultiSelectListVM.SelectedListItems != null) {
                let nSelectedItems: number = oMultiSelectListVM.SelectedListItems.Count;
                for (let nCounter: number = 0; nCounter < nSelectedItems; nCounter++) {
                    let oCListItem: CListItem = <CListItem>oMultiSelectListVM.SelectedListItems[nCounter];
                    if (oCListItem.DisplayText == "Other") {
                        oMultiSelectListVM.SelectedListItems[nCounter].Tag = this.Comments;
                        oMultiSelectListVM.Comments = this.Comments;
                        oMultiSelectListVM.IsCommentsEntered = true;
                        oMultiSelectListVM.IsCommentsVisible = Visibility.Visible;
                        this.lblComments.Visibility = Visibility.Visible;
                        this.txtComments.Visibility = Visibility.Visible;
                        this.lblComments.Mandatory = true;
                        this.IsCommentsVisible = true;
                    }
                    else {
                        oMultiSelectListVM.SelectedListItems[nCounter].Tag = this.Comments;
                        oMultiSelectListVM.Comments = this.Comments;
                        oMultiSelectListVM.IsCommentsEntered = false;
                        oMultiSelectListVM.IsCommentsVisible = Visibility.Collapsed;
                        this.lblComments.Visibility = Visibility.Collapsed;
                        this.txtComments.Visibility = Visibility.Collapsed;
                        this.lblComments.Mandatory = true;
                        this.IsCommentsVisible = false;
                    }
                    if (String.Compare(this.oVM.ValueDomainCode, ValueDomain.DispensingInstruction, StringComparison.CurrentCultureIgnoreCase) == 0 && String.Compare(oCListItem.Value, CConstants.Other, StringComparison.CurrentCultureIgnoreCase) == 0) {

                    }
                }
            }
        }
    }
}



