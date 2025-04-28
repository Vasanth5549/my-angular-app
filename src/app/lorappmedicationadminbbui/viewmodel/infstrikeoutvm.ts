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
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';

    export class InfStrikeoutVM extends ViewModelBase {
        private _MedAdminOID: number;
        public get MedAdminOID(): number {
            return this._MedAdminOID;
        }
        public set MedAdminOID(value: number) {
            if (this._MedAdminOID != value) {
                this._MedAdminOID = value;
                // NotifyPropertyChanged("MedAdminOID");
            }
        }
        private _StrikeoutType: string;
        public get StrikeoutType(): string {
            return this._StrikeoutType;
        }
        public set StrikeoutType(value: string) {
            if (this._StrikeoutType != value) {
                this._StrikeoutType = value;
                // NotifyPropertyChanged("StrikeoutType");
            }
        }
    }
