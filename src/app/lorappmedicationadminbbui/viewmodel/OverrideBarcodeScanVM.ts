import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, CListItem } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper, ObjectHelper as Helper  } from 'epma-platform/helper';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { ValueDomain } from '../utilities/CConstants';
import { ValueDomainValues } from '../utilities/globalvariable';
  
    export class OverrideBarcodeScanVM extends ViewModelBase {
        _PrescriptionItemScheduleOID: number;
        public get PrescriptionItemScheduleOID(): number {
            return this._PrescriptionItemScheduleOID;
        }
        public set PrescriptionItemScheduleOID(value: number) {
            this._PrescriptionItemScheduleOID = value;
        }
        _IsOverrideScan: boolean;
        public get IsOverrideScan(): boolean {
            return this._IsOverrideScan;
        }
        public set IsOverrideScan(value: boolean) {
            this._IsOverrideScan = value;
            // NotifyPropertyChanged("IsOverrideScan");
        }
        _OverrideDomain: string;
        public get OverrideDomain(): string {
            return this._OverrideDomain;
        }
        public set OverrideDomain(value: string) {
            this._OverrideDomain = value;
            // NotifyPropertyChanged("OverrideDomain");
        }
        _MessageText: string;
        public get MessageText(): string {
            return this._MessageText;
        }
        public set MessageText(value: string) {
            this._MessageText = value;
            // NotifyPropertyChanged("MessageText");
        }
        _AuditText: string;
        public get AuditText(): string {
            return this._AuditText;
        }
        public set AuditText(value: string) {
            this._AuditText = value;
            // NotifyPropertyChanged("AuditText");
        }
        private _OverrideScanSelected: CListItem;
        public get OverrideScanSelected(): CListItem {
            return this._OverrideScanSelected;
        }
        public set OverrideScanSelected(value: CListItem) {
            if (this._OverrideScanSelected != value) {
                this._OverrideScanSelected = value;
                // NotifyPropertyChanged("OverrideScanSelected");
            }
        }
        _OverrideComments: string;
        public get OverrideComments(): string {
            return this._OverrideComments;
        }
        public set OverrideComments(value: string) {
            this._OverrideComments = value;
            // NotifyPropertyChanged("OverrideComments");
        }
        private _OverrideScan: ObservableCollection<CListItem>;
        public get OverrideScan(): ObservableCollection<CListItem> {
            return this._OverrideScan;
        }
        public set OverrideScan(value: ObservableCollection<CListItem>) {
            if (!Helper.ReferenceEquals(this._OverrideScan, value)) {
                this._OverrideScan = value;
                // NotifyPropertyChanged("OverrideScan");
            }
        }
        constructor(DomainCode: string, sMessageText: string, PrescriptionItemScheduleOID: number) {
            super();
            this._MessageText = sMessageText;
            this._OverrideDomain = DomainCode;
            this._PrescriptionItemScheduleOID = PrescriptionItemScheduleOID;
            if (String.Equals(ValueDomain.SCANPATWBD, DomainCode)) {
                if (ValueDomainValues.ScanPatWBOverrideReasons != null && ValueDomainValues.ScanPatWBOverrideReasons.Count > 0) {
                    this.OverrideScan = new ObservableCollection<CListItem>();
                    ValueDomainValues.ScanPatWBOverrideReasons.forEach( (oCListItem)=> {
                        this.OverrideScan.Add(ObjectHelper.CreateObject(new CListItem(), {
                            DisplayText: oCListItem.DisplayText,
                            Value: oCListItem.Value,
                            ConceptProperties: oCListItem.ConceptProperties
                        }));
                    });
                }
            }
            else if (String.Equals(ValueDomain.SCANMEDS, DomainCode) && ValueDomainValues.ScanMedOverrideReasons != null && ValueDomainValues.ScanMedOverrideReasons.Count > 0) {
                if (ValueDomainValues.ScanMedOverrideReasons != null && ValueDomainValues.ScanMedOverrideReasons.Count > 0) {
                    this.OverrideScan = new ObservableCollection<CListItem>();
                    ValueDomainValues.ScanMedOverrideReasons.forEach( (oCListItem)=> {
                        this.OverrideScan.Add(ObjectHelper.CreateObject(new CListItem(), {
                            DisplayText: oCListItem.DisplayText,
                            Value: oCListItem.Value,
                            ConceptProperties: oCListItem.ConceptProperties
                        }));
                    });
                }
            }
        }
    }
