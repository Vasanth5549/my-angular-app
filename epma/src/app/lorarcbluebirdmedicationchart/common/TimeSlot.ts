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
  ﻿
    export class TimeSlot implements IChartSlot {
        private _FontWeightTime: FontWeight = FontWeights.Normal;
        private _SlotHeight: number;
        private _Tag: Object;
        public _Key: string;
        private _EnableSlotClick: boolean = true;
        private _BackGroundColor: SolidColorBrush = new SolidColorBrush(Colors.Transparent);
        private _SlotDate: DateTime= null;
        private _SlotTime: string = String.Empty;
        private _IsSelected: boolean = false;
        private _EnableSlotSelect: boolean = true;
        private _HighlightReviewSlot: boolean;
        public get SlotDate(): DateTime{
            return this._SlotDate;
        }
        public set SlotDate(value: DateTime) {
            this._SlotDate = value;
           // NotifyPropertyChanged("SlotDate");
        }
        public get SlotTime(): string {
            return this._SlotTime;
        }
        public set SlotTime(value: string) {
            this._SlotTime = value;
            //NotifyPropertyChanged("SlotTime");
        }
        public get FontWeightTime(): FontWeight {
            return this._FontWeightTime;
        }
        public set FontWeightTime(value: FontWeight) {
            this._FontWeightTime = value;
            //NotifyPropertyChanged("FontWeightTime");
        }
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
           // NotifyPropertyChanged("Tag");
        }
        public get EnableSlotClick(): boolean {
            return this._EnableSlotClick;
        }
        public set EnableSlotClick(value: boolean) {
            this._EnableSlotClick = value;
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
        public get HighlightReviewSlot(): boolean {
            return this._HighlightReviewSlot;
        }
        public set HighlightReviewSlot(value: boolean) {
            this._HighlightReviewSlot = value;
        }
    }
