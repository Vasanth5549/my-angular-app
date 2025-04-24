import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType } from 'epma-platform/models';
import { AppDialog, Colors, SolidColorBrush } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { IChartSlot } from './IChartSlot';
  ﻿
export class BlankSlot implements IChartSlot {
    private _Key: string;
    private _BackGroundColor: SolidColorBrush = new SolidColorBrush(Colors.Transparent);
    private _SlotHeight: number;
    private _Tag: Object;
    private _EnableSlotClick: boolean = true;
    private _StatusToolTip: string = null;
    private _IsSelected: boolean = false;
    private _EnableSlotSelect: boolean = true;
    private _HighlightReviewSlot: boolean;
    public get Key(): string {
        return this._Key;
    }
    public set Key(value: string) {
        this._Key = value;
        //NotifyPropertyChanged("Key");
    }
    public get BackGroundColor(): SolidColorBrush {
        return this._BackGroundColor;
    }
    public set BackGroundColor(value: SolidColorBrush) {
        this._BackGroundColor = value;
        //NotifyPropertyChanged("BackGroundColor");
    }
    public get SlotHeight(): number {
        return this._SlotHeight;
    }
    public set SlotHeight(value: number) {
        this._SlotHeight = value;
        //NotifyPropertyChanged("SlotHeight");
    }
    public get Tag(): Object {
        return this._Tag;
    }
    public set Tag(value: Object) {
        this._Tag = value;
        //NotifyPropertyChanged("Tag");
    }
    public get EnableSlotClick(): boolean {
        return this._EnableSlotClick;
    }
    public set EnableSlotClick(value: boolean) {
        this._EnableSlotClick = value;
        //NotifyPropertyChanged("EnableSlotClick");
    }
    public get StatusToolTip(): string {
        return this._StatusToolTip;
    }
    public set StatusToolTip(value: string) {
        this._StatusToolTip = value;
        //NotifyPropertyChanged("StatusToolTip");
    }
    public get IsSelected(): boolean {
        return this._IsSelected;
    }
    public set IsSelected(value: boolean) {
        this._IsSelected = value;
    }
    public get EnableSlotSelect(): boolean {
        return this._EnableSlotSelect;
    }
    public set EnableSlotSelect(value: boolean) {
        this._EnableSlotSelect = value;
    }
    public get HighlightReviewSlot(): boolean {
        return this._HighlightReviewSlot;
    }
    public set HighlightReviewSlot(value: boolean) {
        this._HighlightReviewSlot = value;
    }
}