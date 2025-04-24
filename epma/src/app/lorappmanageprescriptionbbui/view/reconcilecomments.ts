import { Component, OnInit, ViewChild } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow } from 'epma-platform/models';
import { AppDialog, Grid, iLabel, iTextBox } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { Resource } from '../resource';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";

@Component({
    selector: 'ReconcileComments',
    templateUrl: './reconcilecomments.html',
    styles:[`::ng-deep .textareahe .k-input-md .k-input-inner, .k-picker-md .k-input-inner{
        height: 89px !important;
        }`]
     
})

export class ReconcileComments extends iAppDialogWindow {
recon = Resource.reconcile;
public Styles = ControlStyles;

private LayoutRoot1: Grid;
@ViewChild("LayoutRoot1TempRef", {read:Grid, static: false }) set _LayoutRoot1(c: Grid){
    if(c){ this.LayoutRoot1  = c; }
};
private lblComments: iLabel;
@ViewChild("lblCommentsTempRef", {read:iLabel, static: false }) set _lblComments(c: iLabel){
    if(c){ this.lblComments  = c; }
};
private txtComments: iTextBox;
@ViewChild("txtCommentsTempRef", {read:iTextBox, static: false }) set _txtComments(c: iTextBox){
    if(c){ this.txtComments  = c; }
};


        constructor() {
            super();
            //Busyindicator.SetStatusIdle("Reconcile");
           // InitializeComponent();
        }
        ngAfterViewInit(): void { 
                Busyindicator.SetStatusIdle("Reconcile");
                this.txtComments.Focus();
        }     
    }
