import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType } from 'epma-platform/models';
import { AppDialog, SolidColorBrush } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { CIcon } from './CIcon';
import { InfusionProcessIcon } from './InfusionProcessIcon';
  ﻿
    export class CLine  {
        private _startDTTM: DateTime;
        private _endDTTDM: DateTime;
        private _startIcon: CIcon;
        private _endIcon: CIcon;
        private _lineType: InfusionProcessIcon.LineTypes;
        private _lineColour: SolidColorBrush;
        private _rowIndex: number;
        private _StopAtTimeline: boolean = false;
        constructor() {
        }
        public get StartDTTM(): DateTime{
            return this._startDTTM;
        }
        public set StartDTTM(value: DateTime) {
            if (value != this._startDTTM) {
                this._startDTTM = Convert.ToDateTime(value);
                //this.NotifyPropertyChanged("StartDTTM");
            }
        }
        public get EndDTTDM(): DateTime{
            return this._endDTTDM;
        }
        public set EndDTTDM(value: DateTime) {
            if (value != this._endDTTDM) {
                this._endDTTDM = Convert.ToDateTime(value);
                //this.NotifyPropertyChanged("EndDTTDM");
            }
        }
        public get StartIcon(): CIcon {
            return this._startIcon;
        }
        public set StartIcon(value: CIcon) {
            if (value != this._startIcon) {
                this._startIcon = value;
                //this.NotifyPropertyChanged("StartIcon");
            }
        }
        public get EndIcon(): CIcon {
            return this._endIcon;
        }
        public set EndIcon(value: CIcon) {
            if (value != this._endIcon) {
                this._endIcon = value;
                //this.NotifyPropertyChanged("EndIcon");
            }
        }
        public get LineType(): InfusionProcessIcon.LineTypes {
            return this._lineType;
        }
        public set LineType(value: InfusionProcessIcon.LineTypes) {
            if (value != this._lineType) {
                this._lineType = value;
                //this.NotifyPropertyChanged("LineType");
            }
        }
        public get LineColour(): SolidColorBrush {
            return this._lineColour;
        }
        public set LineColour(value: SolidColorBrush) {
            if (value != this._lineColour) {
                this._lineColour = value;
                //this.NotifyPropertyChanged("LineColour");
            }
        }
        public get RowIndex(): number {
            return this._rowIndex;
        }
        public set RowIndex(value: number) {
            if (value != this._rowIndex) {
                this._rowIndex = value;
                //this.NotifyPropertyChanged("RowIndex");
            }
        }
        public OrderIndex: number;
        public get StopAtTimeline(): boolean {
            return this._StopAtTimeline;
        }
        public set StopAtTimeline(value: boolean) {
            this._StopAtTimeline = value;
        }
        public Key: string;
    }
