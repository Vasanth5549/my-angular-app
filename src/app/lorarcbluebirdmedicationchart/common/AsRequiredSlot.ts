import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection } from 'epma-platform/models';
import { AppDialog, Colors, SolidColorBrush } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { IChartSlot } from './IChartSlot';
import { ChartStringIcon } from './ChartStringIcon';
import { ChartIcon } from './ChartIcon';
  ﻿
export class AsRequiredSlot implements IChartSlot {
    private _Key: string;
    private _BackGroundColor: SolidColorBrush = new SolidColorBrush(Colors.Transparent);
    private _AsRequired: ChartStringIcon = new ChartStringIcon();
    private _AdminSummary: ObservableCollection<ChartStringIcon> = new ObservableCollection<ChartStringIcon>();
    private _SlotHeight: number;
    private _Tag: Object;
    private _EnableSlotClick: boolean = true;
    private _EnableSlotSelect: boolean = true;
    private _HighlightReviewSlot: boolean;
    private _StatusToolTip: string = null;
    private _IsSelected: boolean = false;
    private _ConflictIcon: ChartIcon = new ChartIcon();
    private _CumulativeIcon: ChartIcon = new ChartIcon();
    private _HomeLeaveIcon: ChartIcon = new ChartIcon();
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
    public get AsRequired(): ChartStringIcon {
        return this._AsRequired;
    }
    public set AsRequired(value: ChartStringIcon) {
        this._AsRequired = value;
        if (!this.EnableSlotClick) {
            this.AsRequired.EnableOnHotSpotClick = false;
        }
        //NotifyPropertyChanged("AsRequired");
    }
    public get AdminSummary(): ObservableCollection<ChartStringIcon> {
        return this._AdminSummary;
    }
    public set AdminSummary(value: ObservableCollection<ChartStringIcon>) {
        this._AdminSummary = value;
        if (!this.EnableSlotClick) {
            this.AdminSummary.forEach( (oCStr)=> {
                oCStr.EnableOnHotSpotClick = false;
            });
        }
        //NotifyPropertyChanged("AdminSummary");
    }
    public get SlotHeight(): number {
        return this._SlotHeight;
    }
    public set SlotHeight(value: number) {
        this._SlotHeight = value;
        //NotifyPropertyChanged("SlotHeight");
    }
    public get EnableSlotSelect(): boolean {
        return this._EnableSlotSelect;
    }
    public set EnableSlotSelect(value: boolean) {
        this._EnableSlotSelect = value;
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
        if (!this.EnableSlotClick) {
            this.AdminSummary.forEach( (oCStr)=> {
                oCStr.EnableOnHotSpotClick = false;
            });
            this.AsRequired.EnableOnHotSpotClick = false;
            this.CumulativeIcon.EnableOnHotSpotClick = false;
            this.ConflictIcon.EnableOnHotSpotClick = false;
            this.HomeLeaveIcon.EnableOnHotSpotClick = false;
        }
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
    public get CumulativeIcon(): ChartIcon {
        return this._CumulativeIcon;
    }
    public set CumulativeIcon(value: ChartIcon) {
        this._CumulativeIcon = value;
        if (!this.EnableSlotClick) {
            this.CumulativeIcon.EnableOnHotSpotClick = false;
        }
        //NotifyPropertyChanged("CummulativeIcon");
    }
    public get ConflictIcon(): ChartIcon {
        return this._ConflictIcon;
    }
    public set ConflictIcon(value: ChartIcon) {
        this._ConflictIcon = value;
        if (!this.EnableSlotClick) {
            this.ConflictIcon.EnableOnHotSpotClick = false;
        }
        //NotifyPropertyChanged("ConflictIcon");
    }
    public get HighlightReviewSlot(): boolean {
        return this._HighlightReviewSlot;
    }
    public set HighlightReviewSlot(value: boolean) {
        this._HighlightReviewSlot = value;
    }
    public get HomeLeaveIcon(): ChartIcon {
        return this._HomeLeaveIcon;
    }
    public set HomeLeaveIcon(value: ChartIcon) {
        this._HomeLeaveIcon = value;
        if (!this.EnableSlotClick) {
            this.HomeLeaveIcon.EnableOnHotSpotClick = false;
        }
        //NotifyPropertyChanged("HomeLeaveIcon");
    }

    _IsChartAsRequiredSlotLastColumn: boolean = false;
    public get IsChartAsRequiredSlotLastColumn(): boolean {
        return this._IsChartAsRequiredSlotLastColumn;
    }
    public set IsChartAsRequiredSlotLastColumn(value: boolean) {
        this._IsChartAsRequiredSlotLastColumn = value;
       //NotifyPropertyChanged("HomeLeaveIcon");
    }
}