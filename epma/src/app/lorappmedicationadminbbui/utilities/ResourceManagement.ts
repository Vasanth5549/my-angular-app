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
import { MedicationAdministrator } from '../resource/medicationadministrator.designer';
  
    export class ResourceManagement {
        private _resourceRecdAdmin: MedicationAdministrator;
        public get ResourceRecdAdmin(): MedicationAdministrator {
            if (this._resourceRecdAdmin == null) {
                this._resourceRecdAdmin = new MedicationAdministrator();
            }
            return this._resourceRecdAdmin;
        }
    }
