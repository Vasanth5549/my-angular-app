import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType } from 'epma-platform/models';
import { AppDialog, Color, Colors, FontWeights, SolidColorBrush } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { IChartSlot } from './IChartSlot';
import { ChartIcon } from './ChartIcon';
  ﻿
    export class DoseOverviewSlot implements IChartSlot {
        private _Key: string;
        private _BackGroundColor: SolidColorBrush = new SolidColorBrush(Colors.Transparent);
        private _StatusIcon: ChartIcon = new ChartIcon();
        private _Tooltip: Object;
        private _SlotHeight: number;
        private _Tag: Object;
        private _EnableSlotClick: boolean = true;
        private _EnableSlotSelect: boolean = true;
        private _IsSelected: boolean = false;
        private _Dose: string;
        private _HistoryIcon: ChartIcon = new ChartIcon();
        private _height: number;
        private _width: number;
        private _ReasonForNotGiven: string;
        private _ReasonFontSize: string = "9";
        private _ReasonFontColor: string = Color.FromArgb(255, 255, 0, 0).ToString();
        private _ReasonFontWeight: string = FontWeights.Bold.ToString();
        private _ReasonToolTip: string;
        private _administerationCount: string;
        private _acFontSize: string = "11";
        private _acFontColor: string = Color.FromArgb(255, 0, 0, 0).ToString();
        private _acFontWeight: string = FontWeights.Medium.ToString();
        private _acToolTip: string;
        private _HighlightReviewSlot: boolean;
        private _AdministrationIcon: ChartIcon = new ChartIcon();
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
        public get ReasonForNotGiven(): string {
            return this._ReasonForNotGiven;
        }
        public set ReasonForNotGiven(value: string) {
            this._ReasonForNotGiven = value;
           //NotifyPropertyChanged("ReasonForNotGiven");
        }
        public get ReasonFontSize(): string {
            return this._ReasonFontSize;
        }
        public set ReasonFontSize(value: string) {
            this._ReasonFontSize = value;
           //NotifyPropertyChanged("ReasonFontSize");
        }
        public get ReasonFontColor(): string {
            return this._ReasonFontColor;
        }
        public set ReasonFontColor(value: string) {
            this._ReasonFontColor = value;
           //NotifyPropertyChanged("ReasonFontColor");
        }
        public get ReasonFontWeight(): string {
            return this._ReasonFontWeight;
        }
        public set ReasonFontWeight(value: string) {
            this._ReasonFontWeight = value;
           //NotifyPropertyChanged("ReasonFontWeight");
        }
        public get ReasonToolTip(): string {
            return this._ReasonToolTip;
        }
        public set ReasonToolTip(value: string) {
            this._ReasonToolTip = value;
           //NotifyPropertyChanged("ReasonToolTip");
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
        public get Tooltip(): Object {
            return this._Tooltip;
        }
        public set Tooltip(value: Object) {
            this._Tooltip = value;
           //NotifyPropertyChanged("Tooltip");
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
        public get Dose(): string {
            return this._Dose;
        }
        public set Dose(value: string) {
            this._Dose = value;
           //NotifyPropertyChanged("Dose");
        }
        public get AdministrationIcon(): ChartIcon {
            return this._AdministrationIcon;
        }
        public set AdministrationIcon(value: ChartIcon) {
            if (value != null) {
                if (!String.IsNullOrEmpty(value.UriString))
                    value.ImageVisiblity = true;
            }
            this._AdministrationIcon = value;
           //NotifyPropertyChanged("AdministrationIcon");
        }
        public get AdministerationCount(): string {
            return this._administerationCount;
        }
        public set AdministerationCount(value: string) {
            this._administerationCount = value;
           //NotifyPropertyChanged("AdministerationCount");
        }
        public get ACFontSize(): string {
            return this._acFontSize;
        }
        public set ACFontSize(value: string) {
            this._acFontSize = value;
           //NotifyPropertyChanged("ACFontSize");
        }
        public get ACFontColor(): string {
            return this._acFontColor;
        }
        public set ACFontColor(value: string) {
            this._acFontColor = value;
           //NotifyPropertyChanged("ACFontColor");
        }
        public get ACFontWeight(): string {
            return this._acFontWeight;
        }
        public set ACFontWeight(value: string) {
            this._acFontWeight = value;
           //NotifyPropertyChanged("ACFontWeight");
        }
        public get ACToolTip(): string {
            return this._acToolTip;
        }
        public set ACToolTip(value: string) {
            this._acToolTip = value;
           //NotifyPropertyChanged("ACToolTip");
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

        _IsLastColumn: boolean = false;
        public get IsLastColumn(): boolean {
            return this._IsLastColumn;
        }
        public set IsLastColumn(value: boolean) {
            this._IsLastColumn = value;
           //NotifyPropertyChanged("HomeLeaveIcon");
        }

    }
