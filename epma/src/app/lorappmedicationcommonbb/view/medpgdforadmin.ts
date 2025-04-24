import { Component, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ContentControl } from 'epma-platform/models';
import { AppDialog, Grid, UserControl, iLabel } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { PrescriptionItemDetailsVM } from '../viewmodel/prescriptionitemdetailsvm';
import { DrugDetails } from '../resource/drugdetails.designer';
import { Resource } from '../resource';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
//Re-Visit
//import {DisplayDrugOrderDetails} from '../converter/medicationconverters';

   @Component({
        selector: 'MedPGDforAdmin',
        templateUrl: './medpgdforadmin.html',
        styles: [
            `
            @media screen and (max-device-width: 1400px) {
                .medpgdLayout{
                  height: 148px;
                }
                .pgdLayout{
                    height:305px;
                }
                .medcancellation{
                    height:128px;
                }
                .medpgdheader{
                    height:20px;
                }
              }
            `]
    })

export class MedPGDforAdmin extends UserControl {
    private lblPrescDetails: iLabel;
    @ViewChild("lblPrescDetailsTempRef", { read: iLabel, static: false }) set _lblPrescDetails(c: iLabel) {
        if (c) { this.lblPrescDetails = c; }
    };
    private LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    private lblPrescribedBy: iLabel;
    @ViewChild("lblPrescribedByTempRef", { read: iLabel, static: false }) set _lblPrescribedBy(c: iLabel) {
        if (c) { this.lblPrescribedBy = c; }
    };
    private lblPrescribedByTxt: iLabel;
    @ViewChild("lblPrescribedByTxtTempRef", { read: iLabel, static: false }) set _lblPrescribedByTxt(c: iLabel) {
        if (c) { this.lblPrescribedByTxt = c; }
    };
    private lblPrescribedOn: iLabel;
    @ViewChild("lblPrescribedOnTempRef", { read: iLabel, static: false }) set _lblPrescribedOn(c: iLabel) {
        if (c) { this.lblPrescribedOn = c; }
    };
    private lblPrescribedOnTxt: iLabel;
    @ViewChild("lblPrescribedOnTxtTempRef", { read: iLabel, static: false }) set _lblPrescribedOnTxt(c: iLabel) {
        if (c) { this.lblPrescribedOnTxt = c; }
    };
    private lblStartDateName: iLabel;
    @ViewChild("lblStartDateNameTempRef", { read: iLabel, static: false }) set _lblStartDateName(c: iLabel) {
        if (c) { this.lblStartDateName = c; }
    };
    private lblStartDate: iLabel;
    @ViewChild("lblStartDateTempRef", { read: iLabel, static: false }) set _lblStartDate(c: iLabel) {
        if (c) { this.lblStartDate = c; }
    };
    private lblStatusName: iLabel;
    @ViewChild("lblStatusNameTempRef", { read: iLabel, static: false }) set _lblStatusName(c: iLabel) {
        if (c) { this.lblStatusName = c; }
    };
    private lblStatus: iLabel;
    @ViewChild("lblStatusTempRef", { read: iLabel, static: false }) set _lblStatus(c: iLabel) {
        if (c) { this.lblStatus = c; }
    };
    private lblAddComments: iLabel;
    @ViewChild("lblAddCommentsTempRef", { read: iLabel, static: false }) set _lblAddComments(c: iLabel) {
        if (c) { this.lblAddComments = c; }
    };
    private lblAddCommentsVal: iLabel;
    @ViewChild("lblAddCommentsValTempRef", { read: iLabel, static: false }) set _lblAddCommentsVal(c: iLabel) {
        if (c) { this.lblAddCommentsVal = c; }
    };
    private lblModification: iLabel;
    @ViewChild("lblModificationTempRef", { read: iLabel, static: false }) set _lblModification(c: iLabel) {
        if (c) { this.lblModification = c; }
    };
    private ModificationDetails: Grid;
    @ViewChild("ModificationDetailsTempRef", { read: Grid, static: false }) set _ModificationDetails(c: Grid) {
        if (c) { this.ModificationDetails = c; }
    };
    private lblCancellation: iLabel;
    @ViewChild("lblCancellationTempRef", { read: iLabel, static: false }) set _lblCancellation(c: iLabel) {
        if (c) { this.lblCancellation = c; }
    };
    private Cancellation: Grid;
    @ViewChild("CancellationTempRef", { read: Grid, static: false }) set _Cancellation(c: Grid) {
        if (c) { this.Cancellation = c; }
    };
    private lblCancelBy: iLabel;
    @ViewChild("lblCancelByTempRef", { read: iLabel, static: false }) set _lblCancelBy(c: iLabel) {
        if (c) { this.lblCancelBy = c; }
    };
    private lblCancelByVal: ContentControl;
    @ViewChild("lblCancelByValTempRef", { read: ContentControl, static: false }) set _lblCancelByVal(c: ContentControl) {
        if (c) { this.lblCancelByVal = c; }
    };
    private lblCancelDttm: iLabel;
    @ViewChild("lblCancelDttmTempRef", { read: iLabel, static: false }) set _lblCancelDttm(c: iLabel) {
        if (c) { this.lblCancelDttm = c; }
    };
    private lblCancelDttmVal: iLabel;
    @ViewChild("lblCancelDttmValTempRef", { read: iLabel, static: false }) set _lblCancelDttmVal(c: iLabel) {
        if (c) { this.lblCancelDttmVal = c; }
    };
    private lblCancelRsn: iLabel;
    @ViewChild("lblCancelRsnTempRef", { read: iLabel, static: false }) set _lblCancelRsn(c: iLabel) {
        if (c) { this.lblCancelRsn = c; }
    };
    private lblCancelRsnVal: iLabel;
    @ViewChild("lblCancelRsnValTempRef", { read: iLabel, static: false }) set _lblCancelRsnVal(c: iLabel) {
        if (c) { this.lblCancelRsnVal = c; }
    };

    //Re-visit
    //public DrugOrderDisplay: DisplayDrugOrderDetails;
    public ddkey= Resource.DrugDetails;
    public Styles = ControlStyles;
    objPrescriptionItemDetailsVM: PrescriptionItemDetailsVM;
    constructor() {
        super();
    }
}
