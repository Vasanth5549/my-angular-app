import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, base, MediatorDataService} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow } from 'epma-platform/models';
import { AppDialog, Grid } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { medddetails } from '../view/medddetails';
  

    @Component({
        selector: 'medddetailsChild',
        templateUrl: './medddetailsChild.html',
        //styleUrls: ['./medddetailsChild.css'],
    })
    export class medddetailsChild extends iAppDialogWindow {

        private LayoutRoot: Grid;
        @ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid){
        if(c){ this.LayoutRoot  = c; }
        };
        public medddetails1: medddetails = new medddetails();
        @ViewChild("medddetails1TempRef", {read:medddetails, static: false }) set _medddetails1(c: medddetails){
            if(c){
                this.medddetails1  = c;
            }
        };
        constructor() {
            super();
        }

        public get MedDetailsUserControl(): medddetails {
            return this.medddetails1;
        }
        @Input() public set MedDetailsUserControl(value: medddetails) {
            this.medddetails1 = value;
        }
    }
