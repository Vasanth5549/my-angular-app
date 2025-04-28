import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity  } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from '../../shared/epma-platform/soap-client/helper.service';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
  
    export class EncounterVM extends ViewModelBase {
        private a: string;
        private b: string;
        private c: string;
        private d: string;
        public get Encounter(): string {
            return this.a;
        }
        public set Encounter(value: string) {
            this.a = value;
           //NotifyPropertyChanged("Encounter");
        }
        public get EncounterID(): string {
            return this.b;
        }
        public set EncounterID(value: string) {
            this.b = value;
        }
        public get EncounterType(): string {
            return this.c;
        }
        public set EncounterType(value: string) {
            this.c = value;
        }
        public get EncounterStatus(): string {
            return this.d;
        }
        public set EncounterStatus(value: string) {
            this.d = value;
        }
    }