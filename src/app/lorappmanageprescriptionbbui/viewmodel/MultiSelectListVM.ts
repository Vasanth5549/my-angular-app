import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, ProcessRTE } from 'epma-platform/services';
import { Level, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, CListItem, RTEEventargs, List} from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper as helper, ObjectHelper } from 'epma-platform/helper';
import { HelperService} from '../../shared/epma-platform/soap-client/helper.service'; 
import { Visibility } from 'src/app/shared/epma-platform/controls-model/Visibility';
// import { List } from 'src/app/shared/epma-platform/controls/epma-tab/epma-tab.component';
import { CConstants, ValueDomain } from '../utilities/constants';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';

    export class MultiSelectListVM extends ViewModelBase {
        private _listItems: ObservableCollection<CListItem>;
        private _selectedListItems: ObservableCollection<CListItem>;
        private _header: string;
        private _valueDomainCode: string;
        private _instructionsText: string;
        private _otherInstructionsVisibility: Visibility = Visibility.Collapsed;
        private _listBoxHeight: number = 275;
        //public delegate void ValueDomainCollectionLoaded();
        public ValueDomainCollectionLoadedEvent: Function;
        public OtherComments: string;
        public isEntercommentsMsgToBeShown: boolean = false;
        constructor();
        constructor(DomainCode?: string);
        constructor(ValueDomainCode?: string, oSelectedItem?: List);
        constructor(ValueDomainCode?: string, oSelectedItem?: List)
		{
            super();
    switch (arguments.length) {
	case 1:
	this.ValueDomainCode = ValueDomainCode;
            ProcessRTE.GetValuesByDomainCode(ValueDomainCode, (s,e) => {this.OnRTEResult(s);});
			break;
			case 2:
			this.ValueDomainCode = ValueDomainCode;
            this.ValueDomainCollection = new ObservableCollection<CListItem>();
            this.SelectedListItems = new ObservableCollection<CListItem>();
            oSelectedItem.forEach( (oItem)=> {
                this.ValueDomainCollection.Add(oItem);
                let bIsSelected: boolean = oItem['IsSelected'];
                if (oItem['IsSelected'])
                    this.SelectedListItems.Add(oItem);
                if (oItem['DisplayText'] == "Other") {
                    if (oItem['IsSelected']) {
                        this.IsOtherSelected = true;
                        if (oItem['Tag'] != null) {
                            this.IsCommentsEntered = true;
                            this.Comments = oItem['Tag'].ToString();
                        }
                    }
                }
            });
			break;
	}
        }
       
        OnRTEResult(args: RTEEventargs): void {
            if (String.IsNullOrEmpty(args.Request) || args.Result == null)
                return
            if ((String.Compare(args.Request, this.ValueDomainCode, StringComparison.CurrentCultureIgnoreCase) == 0)) {
                this.ValueDomainCollection = new ObservableCollection<CListItem>();
                (args.Result as List<CListItem>).forEach( (oCListItem)=> {
                    this.ValueDomainCollection.Add(oCListItem);
                });
                if (this.ValueDomainCollectionLoadedEvent != null) {
                    this.ValueDomainCollectionLoadedEvent();
                }
            }
        }
     
        public get ListBoxHeight(): number {
            return this._listBoxHeight;
        }
        public set ListBoxHeight(value: number) {
            this._listBoxHeight = value;
           //NotifyPropertyChanged("ListBoxHeight");
        }
        public get ValueDomainCollection(): ObservableCollection<CListItem> {
            return this._listItems;
        }
        public set ValueDomainCollection(value: ObservableCollection<CListItem>) {
            this._listItems = value;
           //NotifyPropertyChanged("ValueDomainCollection");
        }
        public get SelectedListItems(): ObservableCollection<CListItem> {
            return this._selectedListItems;
        }
        public set SelectedListItems(value: ObservableCollection<CListItem>) {
            this._selectedListItems = value;
           //NotifyPropertyChanged("SelectedListItems");
        }
        public get Header(): string {
            return this._header;
        }
        public set Header(value: string) {
            this._header = value;
           //NotifyPropertyChanged("Title");
        }
        public get ValueDomainCode(): string {
            return this._valueDomainCode;
        }
        public set ValueDomainCode(value: string) {
            this._valueDomainCode = value;
           //NotifyPropertyChanged("ValueDomainCode");
            if (!String.IsNullOrEmpty(this._valueDomainCode)) {
                if (String.Compare(this._valueDomainCode, ValueDomain.SupplyInstruction, StringComparison.CurrentCultureIgnoreCase) == 0) {
                    this.Header = "Supply instructions";
                    this.InstructionsText = "Select supply instruction(s)";
                    this.OtherInstructionsVisibility = Visibility.Collapsed;
                }
                else if (String.Compare(this._valueDomainCode, ValueDomain.DispensingInstruction, StringComparison.CurrentCultureIgnoreCase) == 0) {
                    this.Header = "Dispensing instructions";
                    this.InstructionsText = "Select dispensing instruction(s)";
                    this.OtherInstructionsVisibility = Visibility.Visible;
                }
                else if (String.Compare(this._valueDomainCode, ValueDomain.MedicationClerking, StringComparison.CurrentCultureIgnoreCase) == 0) {
                    this.Header = "Medication clerking source";
                    this.Mandatorylbl = true;
                    this.InstructionsText = "Select medication clerking source(s)";
                }
                else if (String.Compare(this._valueDomainCode, ValueDomain.EndorsementProperties, StringComparison.CurrentCultureIgnoreCase) == 0) {
                    this.Header = "Endorsement properties";
                    this.InstructionsText = "Select endorsement property(ies)";
                }
                else if (String.Compare(this._valueDomainCode, ValueDomain.InstallIns, StringComparison.CurrentCultureIgnoreCase) == 0) {
                    this.Header = "Instalment instructions";
                    this.InstructionsText = "Select instalment instruction(s)";
                }
                else {
                    this.Header = this.InstructionsText = String.Empty;
                }
            }
        }
        public get InstructionsText(): string {
            return this._instructionsText;
        }
        public set InstructionsText(value: string) {
            this._instructionsText = value;
           //NotifyPropertyChanged("InstructionsText");
        }
        private _mandatorylbl: boolean = false;
        public get Mandatorylbl(): boolean {
            return this._mandatorylbl;
        }
        public set Mandatorylbl(value: boolean) {
            this._mandatorylbl = value;
           //NotifyPropertyChanged("Mandatorylbl");
        }
        private _otherInstructions: string;
        public get OtherInstructions(): string {
            return this._otherInstructions;
        }
        public set OtherInstructions(value: string) {
            this._otherInstructions = value;
           //NotifyPropertyChanged("OtherInstructions");
        }
        private _otherInstructionsEnable: boolean = false;
        public get OtherInstructionsEnable(): boolean {
            return this._otherInstructionsEnable;
        }
        public set OtherInstructionsEnable(value: boolean) {
            this._otherInstructionsEnable = value;
           //NotifyPropertyChanged("OtherInstructionsEnable");
        }
        public get OtherInstructionsVisibility(): Visibility {
            return this._otherInstructionsVisibility;
        }
        public set OtherInstructionsVisibility(value: Visibility) {
            this._otherInstructionsVisibility = value;
           //NotifyPropertyChanged("OtherInstructionsVisibility");
        }
        private _isCommentsVisible: Visibility;
        public get IsCommentsVisible(): Visibility {
            return this._isCommentsVisible;
        }
        public set IsCommentsVisible(value: Visibility) {
            this._isCommentsVisible = value;
           //NotifyPropertyChanged("IsCommentsVisible");
        }
        private _comments: string;
        public get Comments(): string {
            return this._comments;
        }
        public set Comments(value: string) {
            this._comments = value;
           //NotifyPropertyChanged("Comments");
        }
        private _isCommentsEntered: boolean = false;
        public get IsCommentsEntered(): boolean {
            return this._isCommentsEntered;
        }
        public set IsCommentsEntered(value: boolean) {
            this._isCommentsEntered = value;
           //NotifyPropertyChanged("IsCommentsEntered");
        }
        private _isOtherSelected: boolean = false;
        public get IsOtherSelected(): boolean {
            return this._isOtherSelected;
        }
        public set IsOtherSelected(value: boolean) {
            this._isOtherSelected = value;
           //NotifyPropertyChanged("IsOtherSelected");
        }
        public VerifySelection(): boolean {
            this.SelectedListItems = new ObservableCollection<CListItem>();
            let nCount:number =  this.ValueDomainCollection.Count;
            for (let i: number = 0; i < nCount; i++) {
                let oListItem: CListItem = this.ValueDomainCollection[i];
                //this.ValueDomainCollection.forEach( (oListItem)=> {
                if (oListItem == null)
                    continue;
                if (String.Compare(oListItem.Value, CConstants.OtherFreeText, StringComparison.InvariantCultureIgnoreCase) == 0) {
                    oListItem.Tag = this.Comments;
                    if (oListItem.IsSelected && String.IsNullOrEmpty(this.Comments)) {
                        this.isEntercommentsMsgToBeShown = true;
                        return false;
                    }
                }
                if (oListItem.IsSelected) {
                    this.SelectedListItems.Add(oListItem);
                }
                // });
            }
            if (this.SelectedListItems.Count <= 0 && String.Compare(this.ValueDomainCode, ValueDomain.MedicationClerking, StringComparison.OrdinalIgnoreCase) == 0) {
                iMessageBox.Show("Lorenzo", "Select a " + this.Header.ToLower() + " to proceed.", MessageBoxType.Information, MessageBoxButton.OK);
                return false;
            }
            else {
                return true;
            }
        }
    }