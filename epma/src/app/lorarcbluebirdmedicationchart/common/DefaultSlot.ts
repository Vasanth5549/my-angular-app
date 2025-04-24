import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType } from 'epma-platform/models';
import { AppDialog, Colors, FontWeights, SolidColorBrush } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { IChartSlot } from './IChartSlot';
import { FontWeight } from 'src/app/shared/epma-platform/controls/Control';
import { ChartIcon } from './ChartIcon';
  ﻿
    export class DefaultSlot implements IChartSlot {
        private _Key: string;
        private _BackGroundColor: SolidColorBrush = new SolidColorBrush(Colors.Transparent);
        private _Time: DateTime;
        private _SlotStatus: string;
        private _Dose: string;
        private _SlotHeight: number;
        private _Tag: Object;
        private _EnableSlotClick: boolean = true;
        private _FontWeightTime: FontWeight = FontWeights.Normal;
        private _FontWeightStatus: FontWeight = FontWeights.Normal;
        private _StatusToolTip: Object = null;
        private _EnableSlotSelect: boolean = true;
        private _IsSelected: boolean = false;
        private _CumulativeIcon: ChartIcon = new ChartIcon();
        private _ConflictIcon: ChartIcon = new ChartIcon();
        private _PrescriptionStatusIcon: ChartIcon = new ChartIcon();
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
            this._BackGroundColor = value;
            //NotifyPropertyChanged("BackGroundColor");
        }
        public get Time(): DateTime{
            return this._Time;
        }
        public set Time(value: DateTime) {
            this._Time = value;
            //NotifyPropertyChanged("Time");
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
        public get FontWeightStatus(): FontWeight {
            return this._FontWeightStatus;
        }
        public set FontWeightStatus(value: FontWeight) {
            this._FontWeightStatus = value;
            //NotifyPropertyChanged("FontWeightStatus");
        }
        public get Dose(): string {
            return this._Dose;
        }
        public set Dose(value: string) {
            this._Dose = value;
            //NotifyPropertyChanged("Dose");
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
                this.CumulativeIcon.EnableOnHotSpotClick = false;
                this.ConflictIcon.EnableOnHotSpotClick = false;
                this.PrescriptionStatusIcon.EnableOnHotSpotClick = false;
                this.HomeLeaveIcon.EnableOnHotSpotClick = false;
            }
            //NotifyPropertyChanged("EnableSlotClick");
        }
        public get StatusToolTip(): Object {
            return this._StatusToolTip;
        }
        public set StatusToolTip(value: Object) {
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
        public get PrescriptionStatusIcon(): ChartIcon {
            return this._PrescriptionStatusIcon;
        }
        public set PrescriptionStatusIcon(value: ChartIcon) {
            if (value != null) {
                if (!String.IsNullOrEmpty(value.UriString))
                    value.ImageVisiblity = true;
            }
            this._PrescriptionStatusIcon = value;
            if (!this.EnableSlotClick) {
                this.PrescriptionStatusIcon.EnableOnHotSpotClick = false;
            }
            //NotifyPropertyChanged("PrescriptionStatusIcon");
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

        _IsChartDefaultSlotLastColumn: boolean = false;
        public get IsChartDefaultSlotLastColumn(): boolean {
            return this._IsChartDefaultSlotLastColumn;
        }
        public set IsChartDefaultSlotLastColumn(value: boolean) {
            this._IsChartDefaultSlotLastColumn = value;
           //NotifyPropertyChanged("HomeLeaveIcon");
        }
    }
