import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType } from 'epma-platform/models';
import { AppDialog, FontWeights } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { AsRequiredSlot } from './AsRequiredSlot';
import { FontWeight } from 'src/app/shared/epma-platform/controls/Control';
  ﻿
    export class TodayAsRequiredSlot extends AsRequiredSlot {
        private _LastGivenTime: string;
        private _FontWeightTime: FontWeight = FontWeights.Normal;
        public get LastGivenTime(): string {
            return this._LastGivenTime;
        }
        public set LastGivenTime(value: string) {
            this._LastGivenTime = value;
           // NotifyPropertyChanged("LastGivenTime");
        }
        public get FontWeightTime(): FontWeight {
            return this._FontWeightTime;
        }
        public set FontWeightTime(value: FontWeight) {
            this._FontWeightTime = value;
           // NotifyPropertyChanged("FontWeightTime");
        }

        _IsChartTodayAsRequiredSlotLastColumn: boolean = false;
        public get IsChartTodayAsRequiredSlotLastColumn(): boolean {
            return this._IsChartTodayAsRequiredSlotLastColumn;
        }
        public set IsChartTodayAsRequiredSlotLastColumn(value: boolean) {
            this._IsChartTodayAsRequiredSlotLastColumn = value;
           //NotifyPropertyChanged("HomeLeaveIcon");
        }
    }
