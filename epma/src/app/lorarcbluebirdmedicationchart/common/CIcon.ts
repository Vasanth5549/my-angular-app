import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';

  ﻿
    export class CIcon {
        private _Key: string;
        private _UriString: string;
        private _Tooltip: Object;
        private _EnableOnHotSpotClick: boolean = false;
        private _Tag: Object;
        private _IsImageInvisible: boolean = false;
        public get EnableOnHotSpotClick(): boolean {
            return this._EnableOnHotSpotClick;
        }
        public set EnableOnHotSpotClick(value: boolean) {
            this._EnableOnHotSpotClick = value;
            //NotifyPropertyChanged("EnableOnHotSpotClick");
        }
        public get UriString(): string {
            return this._UriString;
        }
        public set UriString(value: string) {
            this._UriString = value;
            //NotifyPropertyChanged("UriString");
        }
        public get IconToolTip(): Object {
            return this._Tooltip;
        }
        public set IconToolTip(value: Object) {
            this._Tooltip = value;
            //NotifyPropertyChanged("Tooltip");
        }
        public get IsImageInvisible(): boolean {
            return this._IsImageInvisible;
        }
        public set IsImageInvisible(value: boolean) {
            this._IsImageInvisible = value;
        }
    }