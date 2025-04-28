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
import { ChartIcon } from './ChartIcon';
  ﻿
    export class OverviewSlot implements IChartSlot {
        private _Key: string;
        private _BackGroundColor: SolidColorBrush = new SolidColorBrush(Colors.Transparent);
        private _StatusIcon: ChartIcon = new ChartIcon();
        private _Tooltip: Object;
        private _SlotHeight: number;
        private _Tag: Object;
        private _EnableSlotClick: boolean = true;
        private _IsSelected: boolean = false;
        private _AdministrationIcon: ChartIcon = new ChartIcon();
        private _HistoryIcon: ChartIcon = new ChartIcon();
        private _height: number;
        private _width: number;
        private _HighlightReviewSlot: boolean;
        private _EnableSlotSelect: boolean = true;
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
            this._BackGroundColor = <SolidColorBrush>value;
            //NotifyPropertyChanged("BackGroundColor");
        }
        public get StatusIcon(): ChartIcon {
            return this._StatusIcon;
        }
        public set StatusIcon(value: ChartIcon) {
            this._StatusIcon = value;
            if (!this.EnableSlotClick) {
                this.StatusIcon.EnableOnHotSpotClick = false;
            }
            //NotifyPropertyChanged("StatusIcon");
        }
        public get Tooltip(): Object {
            return this._Tooltip;
        }
        public set Tooltip(value: Object) {
            this._Tooltip = value;
            //NotifyPropertyChanged("Tooltip");
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
                this.StatusIcon.EnableOnHotSpotClick = false;
                this.HomeLeaveIcon.EnableOnHotSpotClick = false;
            }
            //NotifyPropertyChanged("EnableSlotClick");
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
        public get AdministrationIcon(): ChartIcon {
            return this._AdministrationIcon;
        }
        public set AdministrationIcon(value: ChartIcon) {
            this._AdministrationIcon = value;
            //NotifyPropertyChanged("AdministrationIcon");
        }
        public get HistoryIcon(): ChartIcon {
            return this._HistoryIcon;
        }
        public set HistoryIcon(value: ChartIcon) {
            this._HistoryIcon = value;
            if (!this.EnableSlotClick) {
                this.HistoryIcon.EnableOnHotSpotClick = false;
            }
            if (!String.IsNullOrEmpty(this._HistoryIcon.UriString)) {
                this.HistoryIconHght = 16;
                this.HistoryIconWdth = 16;
            }
            //NotifyPropertyChanged("HistoryIcon");
        }
        public get HistoryIconHght(): number {
            return this._height;
        }
        public set HistoryIconHght(value: number) {
            this._height = value;
            //NotifyPropertyChanged("HistoryIconHght");
        }
        public get HistoryIconWdth(): number {
            return this._width;
        }
        public set HistoryIconWdth(value: number) {
            this._width = value;
            //NotifyPropertyChanged("HistoryIconWdth");
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
    }
