import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, ProcessRTE } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, CListItem, RTEEventargs, List, ObservableCollection, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { ValueDomain } from '../utilities/constants';
    export class MedDoseReason extends ViewModelBase {
        private _overrideReason: ObservableCollection<CListItem>;
        private _overrideReasonValue: CListItem;
        constructor() {
            super()
            ProcessRTE.GetValuesByDomainCode(ValueDomain.CONST_OVERRIDE_REASON, (s,e) => {this.OnRTEResult(s);});
        }
        OnRTEResult(args: RTEEventargs): void {
            if (String.IsNullOrEmpty(args.Request) || args.Result == null)
                return
            if ((String.Compare(args.Request, ValueDomain.CONST_OVERRIDE_REASON, StringComparison.CurrentCultureIgnoreCase) == 0)) {
                this.OverrideReason = new ObservableCollection<CListItem>();
                (args.Result as List<CListItem>).forEach( (oCListItem)=> {
                    this.OverrideReason.Add(oCListItem);
                });
            }
        }
        public get OverrideReason(): ObservableCollection<CListItem> {
            return this._overrideReason;
        }
        public set OverrideReason(value: ObservableCollection<CListItem>) {
            this._overrideReason = value;
           //super.NotifyPropertyChanged("");
        }
        public get OverrideReasonValue(): CListItem {
            return this._overrideReasonValue;
        }
        public set OverrideReasonValue(value: CListItem) {
            this._overrideReasonValue = value;
           //super.NotifyPropertyChanged("OverrideReasonValue");
        }
    }