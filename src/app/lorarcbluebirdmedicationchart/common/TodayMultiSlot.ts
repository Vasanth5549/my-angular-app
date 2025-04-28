import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection } from 'epma-platform/models';
import { AppDialog, Colors, FontWeights, SolidColorBrush } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { IChartSlot } from './IChartSlot';
import { ChartIcon } from './ChartIcon';
import { ChartStringIcon } from './ChartStringIcon';
import { FontWeight } from 'src/app/shared/epma-platform/controls/Control';
  ﻿
    export class TodayMultiSlot implements IChartSlot {
        private _Key: string;
        private _BackGroundColor: SolidColorBrush = new SolidColorBrush(Colors.Transparent);
        private _LastGivenTime: string;
        private _SlotStatus: string;
        private _MultiIcon: ChartIcon = new ChartIcon();
        private _AdminSummary: ObservableCollection<ChartStringIcon> = new ObservableCollection<ChartStringIcon>();
        private _SlotHeight: number;
        private _Tag: Object;
        private _EnableSlotSelect: boolean = true;
        private _EnableSlotClick: boolean = true;
        private _HighlightReviewSlot: boolean;
        private _FontWeightTime: FontWeight = FontWeights.Normal;
        private _FontWeightStatus: FontWeight = FontWeights.Normal;
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
        public get LastGivenTime(): string {
            return this._LastGivenTime;
        }
        public set LastGivenTime(value: string) {
            this._LastGivenTime = value;
            //NotifyPropertyChanged("LastGivenTime");
        }
        public get FontWeightTime(): FontWeight {
            return this._FontWeightTime;
        }
        public set FontWeightTime(value: FontWeight) {
            this._FontWeightTime = value;
            //NotifyPropertyChanged("FontWeightTime");
        }
        public get SlotStatus(): string {
            return this._SlotStatus;
        }
        public set SlotStatus(value: string) {
            this._SlotStatus = value;
            //NotifyPropertyChanged("SlotStatus");
        }
        public get EnableSlotSelect(): boolean {
            return this._EnableSlotSelect;
        }
        public set EnableSlotSelect(value: boolean) {
            this._EnableSlotSelect = value;
        }
        public get FontWeightStatus(): FontWeight {
            return this._FontWeightStatus;
        }
        public set FontWeightStatus(value: FontWeight) {
            this._FontWeightStatus = value;
            //NotifyPropertyChanged("FontWeightStatus");
        }
        public get MultiIcon(): ChartIcon {
            return this._MultiIcon;
        }
        public set MultiIcon(value: ChartIcon) {
            this._MultiIcon = value;
            if (!this.EnableSlotClick) {
                this.MultiIcon.EnableOnHotSpotClick = false;
            }
            // NotifyPropertyChanged("MultiIcon");
        }
        public get AdminSummary(): ObservableCollection<ChartStringIcon> {
            return this._AdminSummary;
        }
        public set AdminSummary(value: ObservableCollection<ChartStringIcon>) {
            this._AdminSummary = value;
            if (!this.EnableSlotClick) {
                this.AdminSummary.forEach( (oCSr)=> {
                    oCSr.EnableOnHotSpotClick = false;
                });
            }
            // NotifyPropertyChanged("AdminSummary");
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
            if (!this.EnableSlotClick) {
                this.AdminSummary.forEach( (oCStr)=> {
                    oCStr.EnableOnHotSpotClick = false;
                });
                this.MultiIcon.EnableOnHotSpotClick = false;
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
        public get HighlightReviewSlot(): boolean {
            return this._HighlightReviewSlot;
        }
        public set HighlightReviewSlot(value: boolean) {
            this._HighlightReviewSlot = value;
        }

        _IsChartTodayMultiSlotLastColumn: boolean = false;
        public get IsChartTodayMultiSlotLastColumn(): boolean {
            return this._IsChartTodayMultiSlotLastColumn;
        }
        public set IsChartTodayMultiSlotLastColumn(value: boolean) {
            this._IsChartTodayMultiSlotLastColumn = value;
           //NotifyPropertyChanged("HomeLeaveIcon");
        }
    }
