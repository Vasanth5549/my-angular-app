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
import { ChartIcon } from './ChartIcon';
import { IChartSlot } from './IChartSlot';
import { FontWeight } from 'src/app/shared/epma-platform/controls/Control';
  ﻿
    export class AdministratedSlot implements IChartSlot {
        public _Key: string;
        private _BackGroundColor: SolidColorBrush = new SolidColorBrush(Colors.Transparent);
        private _Time: DateTime;
        private _AdministratedTmFrmt: string = String.Empty;
        private _HistoryIcon: ChartIcon = new ChartIcon();
        private _StatusIcon: ChartIcon = new ChartIcon();
        private _OmittedMessage: string = String.Empty;
        private _OmittedMessageWeight: string = FontWeights.Bold.ToString();
        private _HighlightReviewSlot: boolean;
        private _SlotHeight: number;
        private _EnableSlotSelect: boolean = true;
        private _Tag: Object;
        private _EnableSlotClick: boolean = true;
        private _FontWeightTime: FontWeight = FontWeights.Normal;
        private _StatusToolTip: Object = null;
        private _ConflictIcon: ChartIcon = new ChartIcon();
        private _CumulativeIcon: ChartIcon = new ChartIcon();
        private _AdministrationIcon: ChartIcon = new ChartIcon();
        private _HomeLeaveIcon: ChartIcon = new ChartIcon();
        private _ReasonForNotGiven: string;
        private _ReasonFontSize: string = "9";
        private _ReasonFontColor: string = Color.FromArgb(255, 255, 0, 0).ToString();
        private _ReasonFontWeight: string = FontWeights.Bold.ToString();
        private _ReasonToolTip: string;
        public get Key(): string {
            return this._Key;
        }
        public set Key(value: string) {
            this._Key = value;
            // NotifyPropertyChanged("Key");
        }
        public get BackGroundColor(): SolidColorBrush {
            return this._BackGroundColor;
        }
        public set BackGroundColor(value: SolidColorBrush) {
            this._BackGroundColor = value;
            // NotifyPropertyChanged("BackGroundColor");
        }
        public get Time(): DateTime{
            return this._Time;
        }
        public set Time(value: DateTime) {
            this._Time = value;
            // NotifyPropertyChanged("Time");
        }
        public get FontWeightTime(): FontWeight {
            return this._FontWeightTime;
        }
        public set FontWeightTime(value: FontWeight) {
            this._FontWeightTime = value;
            // NotifyPropertyChanged("FontWeightTime");
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
        public get HistoryIcon(): ChartIcon {
            return this._HistoryIcon;
        }
        public set HistoryIcon(value: ChartIcon) {
            this._HistoryIcon = value;
            if (!this.EnableSlotClick) {
                this.HistoryIcon.EnableOnHotSpotClick = false;
            }
            // NotifyPropertyChanged("HistoryIcon");
        }
        public get StatusIcon(): ChartIcon {
            return this._StatusIcon;
        }
        public set StatusIcon(value: ChartIcon) {
            this._StatusIcon = value;
            if (!this.EnableSlotClick) {
                this.StatusIcon.EnableOnHotSpotClick = false;
            }
            // NotifyPropertyChanged("StatusIcon");
        }
        public get ReasonForNotGiven(): string {
            return this._ReasonForNotGiven;
        }
        public set ReasonForNotGiven(value: string) {
            this._ReasonForNotGiven = value;
            // NotifyPropertyChanged("ReasonForNotGiven");
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
        public get OmittedMessage(): string {
            return this._OmittedMessage;
        }
        public set OmittedMessage(value: string) {
            this._OmittedMessage = value;
            //NotifyPropertyChanged("OmittedMessage");
        }
        public get OmittedMessageWeight(): string {
            return this._OmittedMessageWeight;
        }
        public set OmittedMessageWeight(value: string) {
            this._OmittedMessageWeight = value;
            //NotifyPropertyChanged("OmittedMessageWeight");
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
                this.HistoryIcon.EnableOnHotSpotClick = false;
                this.ConflictIcon.EnableOnHotSpotClick = false;
                this.CumulativeIcon.EnableOnHotSpotClick = false;
                this.HomeLeaveIcon.EnableOnHotSpotClick = false;
            }
            // NotifyPropertyChanged("EnableSlotClick");
        }
        public get StatusToolTip(): Object {
            return this._StatusToolTip;
        }
        public set StatusToolTip(value: Object) {
            this._StatusToolTip = value;
            // NotifyPropertyChanged("StatusToolTip");
        }
        public IsSelected: boolean;
        public get AdministrationIcon(): ChartIcon {
            return this._AdministrationIcon;
        }
        public set AdministrationIcon(value: ChartIcon) {
            this._AdministrationIcon = value;
            //NotifyPropertyChanged("AdministrationIcon");
        }
        public get AdministratedTmFrmt(): string {
            return this._AdministratedTmFrmt;
        }
        public set AdministratedTmFrmt(value: string) {
            this._AdministratedTmFrmt = value;
        }

        _IsChartAdminSlotLastColumn: boolean = false;
        public get IsChartAdminSlotLastColumn(): boolean {
            return this._IsChartAdminSlotLastColumn;
        }
        public set IsChartAdminSlotLastColumn(value: boolean) {
            this._IsChartAdminSlotLastColumn = value;
           //NotifyPropertyChanged("HomeLeaveIcon");
        }
    }
