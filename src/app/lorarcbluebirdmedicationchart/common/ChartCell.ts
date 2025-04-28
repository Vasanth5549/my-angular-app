import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { IChartSlot } from './IChartSlot';
  ﻿export class ChartCell  {
    private _Slots: ObservableCollection<IChartSlot>;
    private _Key: string;
    public ColIndex: number;
    public get Key(): string {
        return this._Key;
    }
    public set Key(value: string) {
        this._Key = value;
    }
    public get Slots(): ObservableCollection<IChartSlot> {
        return this._Slots;
    }
    public set Slots(value: ObservableCollection<IChartSlot>) {
        this._Slots = value;
        //NotifyPropertyChanged("Slots");
    }
}