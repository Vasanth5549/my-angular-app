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

    export class InfusionProcessIcon  {
        private _Key: string;
        private _UriString: string;
        private _Tooltip: Object;
        private _TimeTooltip: string;
        private _EnableOnHotSpotClick: boolean = true;
        private _Tag: Object;
        private _leftLineColor: SolidColorBrush = new SolidColorBrush(Colors.Transparent);
        private _rightLineColor: SolidColorBrush = new SolidColorBrush(Colors.Transparent);
        private _LineFlowDirection: LineFlowDirection;
        private _leftLineType: LineTypes = LineTypes.None;
        private _rightLineType: LineTypes = LineTypes.None;
        private _StopAtTimeline: boolean = false;
        private _IsImageInvisible: boolean = false;
        public get Key(): string {
            return this._Key;
        }
        public set Key(value: string) {
            this._Key = value;
            //NotifyPropertyChanged("Key");
        }
        public get UriString(): string {
            return this._UriString;
        }
        public set UriString(value: string) {
            this._UriString = value;
            //NotifyPropertyChanged("UriString");
        }
        public get Tooltip(): Object {
            return this._Tooltip;
        }
        public set Tooltip(value: Object) {
            this._Tooltip = value;
            //NotifyPropertyChanged("Tooltip");
        }
        public get TimeTooltip(): string {
            return this._TimeTooltip;
        }
        public set TimeTooltip(value: string) {
            this._TimeTooltip = value;
            //NotifyPropertyChanged("TimeTooltip");
        }
        public get EnableOnHotSpotClick(): boolean {
            return this._EnableOnHotSpotClick;
        }
        public set EnableOnHotSpotClick(value: boolean) {
            this._EnableOnHotSpotClick = value;
            //NotifyPropertyChanged("EnableOnHotSpotClick");
        }
        public get Tag(): Object {
            return this._Tag;
        }
        public set Tag(value: Object) {
            this._Tag = value;
            //NotifyPropertyChanged("Tag");
        }
        public get LineDirection(): LineFlowDirection {
            return this._LineFlowDirection;
        }
        public set LineDirection(value: LineFlowDirection) {
            this._LineFlowDirection = value;
            //NotifyPropertyChanged("LineDirection");
        }
        public get LeftLineType(): LineTypes {
            return this._leftLineType;
        }
        public set LeftLineType(value: LineTypes) {
            this._leftLineType = value;
            //NotifyPropertyChanged("LeftLineType");
        }
        public get RightLineType(): LineTypes {
            return this._rightLineType;
        }
        public set RightLineType(value: LineTypes) {
            this._rightLineType = value;
            //NotifyPropertyChanged("RightLineType");
        }
        public get LeftLineColor(): SolidColorBrush {
            return this._leftLineColor;
        }
        public set LeftLineColor(value: SolidColorBrush) {
            this._leftLineColor = value;
            //NotifyPropertyChanged("LeftLineColor");
        }
        public get RightLineColor(): SolidColorBrush {
            return this._rightLineColor;
        }
        public set RightLineColor(value: SolidColorBrush) {
            this._rightLineColor = value;
            //NotifyPropertyChanged("RightLineColor");
        }
        public get StopAtTimeline(): boolean {
            return this._StopAtTimeline;
        }
        public set StopAtTimeline(value: boolean) {
            this._StopAtTimeline = value;
        }
        public get IsImageInvisible(): boolean {
            return this._IsImageInvisible;
        }
        public set IsImageInvisible(value: boolean) {
            this._IsImageInvisible = value;
        }        
    }
    export enum LineFlowDirection {
        None = 0,

        Left = 1,

        Right = 2,

        Full = 3,

        Both = 4
    }
    export module InfusionProcessIcon {
        export enum LineTypes {
            Continuous = 0,

            Dotted = 1,

            None = 2
        }
    }

    export enum LineTypes {
        Continuous = 0,

        Dotted = 1,

        None = 2
    }