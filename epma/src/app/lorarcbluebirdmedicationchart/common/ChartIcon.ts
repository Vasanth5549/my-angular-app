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

export class ChartIcon {
    public MouseLeftButtonDown:Function|string;
    private _Key: string;
    private _UriString: string;
    private _Tooltip: any;
    private _EnableOnHotSpotClick: boolean = true;
    private _Tag: Object;
    private _ImageVisiblity: boolean = false;
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
    public get Tooltip(): any {
        return this._Tooltip;
    }
    public set Tooltip(value: any) {
        this._Tooltip = value;
        // NotifyPropertyChanged("Tooltip");
    }
    public get EnableOnHotSpotClick(): boolean {
        return this._EnableOnHotSpotClick;
    }
    public set EnableOnHotSpotClick(value: boolean) {
        this._EnableOnHotSpotClick = value;
        //NotifyPropertyChanged("EnableOnHotSpotClick");
    }
    public get ImageVisiblity(): boolean {
        return this._ImageVisiblity;
    }
    public set ImageVisiblity(value: boolean) {
        this._ImageVisiblity = value;
        //NotifyPropertyChanged("ImageVisiblity");
    }
    public get Tag(): Object {
        return this._Tag;
    }
    public set Tag(value: Object) {
        this._Tag = value;
        //NotifyPropertyChanged("Tag");
    }
        
}
