import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, ProcessRTE } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, decimal, Double, Float, Int64, long, Long, StringComparison, ObservableCollection, CListItem, List, RTEEventargs } from 'epma-platform/models';
import { AppDialog, GridLength } from 'epma-platform/controls';
import { HelperService} from '../../shared/epma-platform/soap-client/helper.service';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';

    export class NonFormularyVM extends ViewModelBase {
        private _selectedRSN: CListItem;
        private _nFReasons: ObservableCollection<CListItem>;
        private _otherRSN: string;
        private _itemName: string;
        private _otherRSNRow: GridLength;
        constructor(FillReasonForPrescribing: boolean) {
            super();
            if (FillReasonForPrescribing)
                ProcessRTE.GetValuesByDomainCode("NFREASON", (s,e) => {this.OnRTEResult(s);});
            this.OtherRSNRowHeight = new GridLength(0);
        }
        public get ReasonForPrescribing(): CListItem {
            return this._selectedRSN;
        }
        public set ReasonForPrescribing(value: CListItem) {
            if (!ObjectHelper.ReferenceEquals(this._selectedRSN, value)) {
                this._selectedRSN = value;
               //NotifyPropertyChanged("ReasonForPrescribing");
                if (this._selectedRSN instanceof CListItem && String.Compare(this._selectedRSN.Value, "CC_OTHER") == 0) {
                    this.OtherRSNRowHeight = new GridLength(30);
                }
                else {
                    this.OtherRSNRowHeight = new GridLength(0);
                }
            }
        }
        public get NonFormularyReasons(): ObservableCollection<CListItem> {
            return this._nFReasons;
        }
        public set NonFormularyReasons(value: ObservableCollection<CListItem>) {
            if (!ObjectHelper.ReferenceEquals(this._nFReasons, value)) {
                this._nFReasons = value;
               //NotifyPropertyChanged("NonFormularyReasons");
            }
        }
        public get OtherReason(): string {
            return this._otherRSN;
        }
        public set OtherReason(value: string) {
            if (!ObjectHelper.ReferenceEquals(this._otherRSN, value)) {
                this._otherRSN = value;
               //NotifyPropertyChanged("OtherReason");
            }
        }
        public get ItemName(): string {
            return this._itemName;
        }
        public set ItemName(value: string) {
            this._itemName = value;
        }
        public get OtherRSNRowHeight(): GridLength {
            return this._otherRSNRow;
        }
        public set OtherRSNRowHeight(value: GridLength) {
            if (!ObjectHelper.ReferenceEquals(this._otherRSNRow, value)) {
                this._otherRSNRow = value;
               //NotifyPropertyChanged("OtherRSNRowHeight");
            }
        }
        OnRTEResult(args: RTEEventargs): void {
            if (String.IsNullOrEmpty(args.Request) || args.Result == null)
                return
            if ((String.Compare(args.Request, "NFREASON", StringComparison.CurrentCultureIgnoreCase) == 0)) {
                this.NonFormularyReasons = new ObservableCollection<CListItem>();
                (<List<CListItem>>args.Result).forEach( (oCListItem)=> {
                    this.NonFormularyReasons.Add(oCListItem);
                });
            }
        }
    }