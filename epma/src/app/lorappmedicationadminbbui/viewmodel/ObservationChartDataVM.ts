import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, Visibility } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
  
    export class ObservationResultText extends ViewModelBase {
        private _Title: string;
        private _Text: string;
        public get Title(): string {
            return this._Title;
        }
        public set Title(value: string) {
            if (this._Title != value) {
                this._Title = value;
            }
        }
        public get Text(): string {
            return this._Text;
        }
        public set Text(value: string) {
            if (this._Text != value) {
                this._Text = value;
            }
        }
    }
    export class Data extends ViewModelBase {
        private _timeStamp: DateTime;
        private _value: number;
        private _category: string;
        private _formOID: number;
        private _itemName: string;
        private _tooltip: string;
        private _canmodify: boolean;
        private _cancancel: boolean;
        private _type: string;
        private _RRlowerlimit: number;
        private _RRupperlimit: number;
        private _valuePrefix: string;
        private _ObsName: string;
        private _low: number;
        private _high: number;
        private _patientOID: number;
        private _encounterOID: number;
        static Binding: any;

        // constructor();
    //     constructor(type?: string, timeStamp?: DateTime, value?: number, valuePrefix?: string, formOID?: number, ItemName?: string, Tooltip?: string, CanModify?: boolean, CanCancel?: boolean, sObsName?: string, lPatientOID?: number, lEncounterOID?: number);
    //    constructor(type?: string, timeStamp?: DateTime, high?: number, low?: number, formOID?: number, ItemName?: string, Tooltip?: string, CanModify?: boolean, CanCancel?: boolean, sObsName?: string, lPatientOID?: number, lEncounterOID?: number);
    //     constructor(type?: string, dateTime?: DateTime, value?: number, high?: number, low?: number);
    //     constructor(type?: string, value?: number, high?: number, low?: number);
    //     constructor(type?: string, dateTime?: DateTime, value?: number, high?: number, low?: number, valuePrefix?: string, formOID?: number, ItemName?: string, Tooltip?: string, CanModify?: boolean, CanCancel?: boolean, sObsName?: string, lPatientOID?: number, lEncounterOID?: number);
        constructor(type?: string, dateTime?: DateTime, value?: number, high?: number, low?: number, valuePrefix?: string, formOID?: number, ItemName?: string, Tooltip?: string, CanModify?: boolean, CanCancel?: boolean, sObsName?: string, lPatientOID?: number, lEncounterOID?: number){
            super();
            switch (arguments.length) {
                case 12:
                    if(value || valuePrefix){
                        this.Type = type;
                        this._timeStamp = dateTime;
                        this._value = value;
                        this._valuePrefix = valuePrefix;
                        this._formOID = formOID;
                        this._itemName = ItemName;
                        this._tooltip = Tooltip;
                        this._canmodify = CanModify;
                        this._cancancel = CanCancel;
                        this._ObsName = sObsName;
                        this._patientOID = lPatientOID;
                        this._encounterOID = lEncounterOID;
                    }
                    if(high || low){
                        this.Type = type;
                        this._timeStamp = dateTime;
                        this._high = high;
                        this._low = low;
                        this._formOID = formOID;
                        this._itemName = ItemName;
                        this._tooltip = Tooltip;
                        this._canmodify = CanModify;
                        this._cancancel = CanCancel;
                        this._ObsName = sObsName;
                        this._patientOID = lPatientOID;
                        this._encounterOID = lEncounterOID;
                    }
                    break;
                case 5:
                    this.Type = type;
                    this.TimeStamp = dateTime;
                    this.Value = value;
                    this.High = high;
                    this.Low = low;
                    break;
                case 4:
                    this.Type = type;
                    this.Value = value;
                    this.High = high;
                    this.Low = low;
                    break;
               case 14:
                    this.Type = type;
                    this.TimeStamp = dateTime;
                    this.Value = value;
                    this.High = high;
                    this.Low = low;
                    this._formOID = formOID;
                    this._itemName = ItemName;
                    this._tooltip = Tooltip;
                    this._canmodify = CanModify;
                    this._cancancel = CanCancel;
                    this._ObsName = sObsName;
                    this._valuePrefix = valuePrefix;
                    this._patientOID = lPatientOID;
                    this._encounterOID = lEncounterOID;
                    break;
            }
        }
        public get ValuePrefix(): string {
            return this._valuePrefix;
        }
        public set ValuePrefix(value: string) {
            this._valuePrefix = value;
        }
        public get ObsName(): string {
            return this._ObsName;
        }
        public set ObsName(value: string) {
            if (this._ObsName != value) {
                this._ObsName = value;
            }
        }
        public get Type(): string {
            return this._type;
        }
        public set Type(value: string) {
            if (this._type != value) {
                this._type = value;
            }
        }
        public get TimeStamp(): DateTime{
            return this._timeStamp;
        }
        public set TimeStamp(value: DateTime) {
            if (this._timeStamp != value) {
                this._timeStamp = value;
            }
        }
        public get Category(): string {
            return this._category;
        }
        public set Category(value: string) {
            if (this._category != value) {
                this._category = value;
            }
        }
        public get Value(): number {
            return this._value;
        }
        public set Value(value: number) {
            if (this._value != value) {
                this._value = value;
            }
        }
        public get FormOID(): number {
            return this._formOID;
        }
        public set FormOID(value: number) {
            if (this._formOID != value) {
                this._formOID = value;
            }
        }
        public get ItemName(): string {
            return this._itemName;
        }
        public set ItemName(value: string) {
            if (this._itemName != value) {
                this._itemName = value;
            }
        }
        public get ToolTip(): string {
            return this._tooltip;
        }
        public set ToolTip(value: string) {
            if (this._tooltip != value) {
                this._tooltip = value;
            }
        }
        public get CanModifyObservation(): boolean {
            return this._canmodify;
        }
        public set CanModifyObservation(value: boolean) {
            if (this._canmodify != value) {
                this._canmodify = value;
            }
        }
        public get CanCancelObservation(): boolean {
            return this._cancancel;
        }
        public set CanCancelObservation(value: boolean) {
            if (this._cancancel != value) {
                this._cancancel = value;
            }
        }
        public get upperlimit(): number {
            return this._RRupperlimit;
        }
        public set upperlimit(value: number) {
            if (this._RRupperlimit != value) {
                this._RRupperlimit = value;
            }
        }
        public get lowerlimit(): number {
            return this._RRlowerlimit;
        }
        public set lowerlimit(value: number) {
            if (this._RRlowerlimit != value) {
                this._RRlowerlimit = value;
            }
        }
        public get High(): number {
            return this._high;
        }
        public set High(value: number) {
            if (this._high != value) {
                this._high = value;
            }
        }
        public get Low(): number {
            return this._low;
        }
        public set Low(value: number) {
            if (this._low != value) {
                this._low = value;
            }
        }
        public get PatientOID(): number {
            return this._patientOID;
        }
        public set PatientOID(value: number) {
            if (this._patientOID != value) {
                this._patientOID = value;
            }
        }
        public get EncounterOID(): number {
            return this._encounterOID;
        }
        public set EncounterOID(value: number) {
            if (this._encounterOID != value) {
                this._encounterOID = value;
            }
        }
    }
    export class CAxisY extends ViewModelBase {
        private _title: string = "Axis Title";
        private _minValue: number = 0;
        private _maxValue: number = 100;
        private _step: number = 10;
        private _axisName: string;
        private _plotAreaAxisVisibility: Visibility = Visibility.Collapsed;
        private _stripLinesVisibility: Visibility = Visibility.Collapsed;
        private _majorGridLinesVisibility: Visibility = Visibility.Collapsed;
        private _minorGridLinesVisibility: Visibility = Visibility.Collapsed;
        private _visibility: Visibility = Visibility.Collapsed;
        private _autoRange: boolean = false;
        private _isZeroBased: boolean = false;
        public get Title(): string {
            return this._title;
        }
        public set Title(value: string) {
            this._title = value;
            // NotifyPropertyChanged("Title");
        }
        public get AxisName(): string {
            return this._axisName;
        }
        public set AxisName(value: string) {
            this._axisName = value;
            // NotifyPropertyChanged("AxisName");
        }
        public get AutoRange(): boolean {
            return this._autoRange;
        }
        public set AutoRange(value: boolean) {
            this._autoRange = value;
            // NotifyPropertyChanged("AutoRange");
        }
        public get PlotAreaAxisVisibility(): Visibility {
            return this._plotAreaAxisVisibility;
        }
        public set PlotAreaAxisVisibility(value: Visibility) {
            this._plotAreaAxisVisibility = value;
            // NotifyPropertyChanged("PlotAreaAxisVisibility");
        }
        public get Visibility(): Visibility {
            return this._visibility;
        }
        public set Visibility(value: Visibility) {
            this._visibility = value;
            // NotifyPropertyChanged("Visibility");
        }
        public get StripLinesVisibility(): Visibility {
            return this._stripLinesVisibility;
        }
        public set StripLinesVisibility(value: Visibility) {
            this._stripLinesVisibility = value;
            // NotifyPropertyChanged("StripLinesVisibility");
        }
        public get MajorGridLinesVisibility(): Visibility {
            return this._majorGridLinesVisibility;
        }
        public set MajorGridLinesVisibility(value: Visibility) {
            this._majorGridLinesVisibility = value;
            // NotifyPropertyChanged("MajorGridLinesVisibility");
        }
        public get MinorGridLinesVisibility(): Visibility {
            return this._minorGridLinesVisibility;
        }
        public set MinorGridLinesVisibility(value: Visibility) {
            if (this._minorGridLinesVisibility != value) {
                this._minorGridLinesVisibility = value;
                // NotifyPropertyChanged("MinorGridLinesVisibility");
            }
        }
        public get IsZeroBased(): boolean {
            return this._isZeroBased;
        }
        public set IsZeroBased(value: boolean) {
            this._isZeroBased = value;
            // NotifyPropertyChanged("IsZeroBased");
        }
        public get MinValue(): number {
            return this._minValue;
        }
        public set MinValue(value: number) {
            if (this._minValue != value) {
                this._minValue = value;
            }
            // NotifyPropertyChanged("MinValue");
        }
        public get MaxValue(): number {
            return this._maxValue;
        }
        public set MaxValue(value: number) {
            if (this._maxValue != value) {
                this._maxValue = value;
            }
            // NotifyPropertyChanged("MaxValue");
        }
        public get Step(): number {
            return this._step;
        }
        public set Step(value: number) {
            if (this._step != value) {
                this._step = value;
            }
            // NotifyPropertyChanged("Step");
        }
    }
