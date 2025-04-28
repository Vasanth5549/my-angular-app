import { Component, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow } from 'epma-platform/models';
import { AppDialog, iLabel } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import '../../shared/epma-platform/models/string.extensions';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { Grid } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { DoseDetailsdata } from '../viewmodel/prescriptionitemdetailsvm';
import { Resource } from '../resource';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
@Component({
    selector: 'MedDoseDetails',
    templateUrl: './MedDoseDetails.html',
    styles:[`
        .bottoms{
            padding-bottom: 7.1%;
        }
        .bottoms1{
            padding-bottom: 9%;
        }
        .firstBottom{
            padding-bottom: 2.5%;
        }
        .frequencyBottom{
            padding-bottom: 2%;
        }
        .orderBottom{
            padding-bottom: 1%;
        }
        .colors{
            background: #c2e2e3;
        }
        @media screen and (max-device-width: 1400px) {
            .meddoseheight{
              height: 345px !important;
            }
            .meddosedtlLayout{
                position:absolute;
            }
          }
    `]
})

export class MedDoseDetails extends iAppDialogWindow {
    private MedDosecalc: Grid;
    public ResKey = Resource.DoseCalculator;
    public Styles = ControlStyles;
    @ViewChild("MedDosecalcTempRef", { read: Grid, static: false }) set _MedDosecalc(c: Grid) {
        if (c) { this.MedDosecalc = c; }
    };
    private lblDosecalculation: iLabel;
    @ViewChild("lblDosecalculationTempRef", { read: iLabel, static: false }) set _lblDosecalculation(c: iLabel) {
        if (c) { this.lblDosecalculation = c; }
    };
    private LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    private lblHeight: iLabel;
    @ViewChild("lblHeightTempRef", { read: iLabel, static: false }) set _lblHeight(c: iLabel) {
        if (c) { this.lblHeight = c; }
    };
    private lblHeightVal: iLabel;
    @ViewChild("lblHeightValTempRef", { read: iLabel, static: false }) set _lblHeightVal(c: iLabel) {
        if (c) { this.lblHeightVal = c; }
    };
    private lblFrequency: iLabel;
    @ViewChild("lblFrequencyTempRef", { read: iLabel, static: false }) set _lblFrequency(c: iLabel) {
        if (c) { this.lblFrequency = c; }
    };
    private lblFrequencyVal: iLabel;
    @ViewChild("lblFrequencyValTempRef", { read: iLabel, static: false }) set _lblFrequencyVal(c: iLabel) {
        if (c) { this.lblFrequencyVal = c; }
    };
    private lblRecWeight: iLabel;
    @ViewChild("lblRecWeightTempRef", { read: iLabel, static: false }) set _lblRecWeight(c: iLabel) {
        if (c) { this.lblRecWeight = c; }
    };
    private lblRecWeightVal: iLabel;
    @ViewChild("lblRecWeightValTempRef", { read: iLabel, static: false }) set _lblRecWeightVal(c: iLabel) {
        if (c) { this.lblRecWeightVal = c; }
    };
    private lblCalcDose: iLabel;
    @ViewChild("lblCalcDoseTempRef", { read: iLabel, static: false }) set _lblCalcDose(c: iLabel) {
        if (c) { this.lblCalcDose = c; }
    };
    private lblCalcDoseVal: iLabel;
    @ViewChild("lblCalcDoseValTempRef", { read: iLabel, static: false }) set _lblCalcDoseVal(c: iLabel) {
        if (c) { this.lblCalcDoseVal = c; }
    };
    private lblIdealWeight: iLabel;
    @ViewChild("lblIdealWeightTempRef", { read: iLabel, static: false }) set _lblIdealWeight(c: iLabel) {
        if (c) { this.lblIdealWeight = c; }
    };
    private lblIdealWeightVal: iLabel;
    @ViewChild("lblIdealWeightValTempRef", { read: iLabel, static: false }) set _lblIdealWeightVal(c: iLabel) {
        if (c) { this.lblIdealWeightVal = c; }
    };
    private lblTotDailyDose: iLabel;
    @ViewChild("lblTotDailyDoseTempRef", { read: iLabel, static: false }) set _lblTotDailyDose(c: iLabel) {
        if (c) { this.lblTotDailyDose = c; }
    };
    private lblTotDailyDoseVal: iLabel;
    @ViewChild("lblTotDailyDoseValTempRef", { read: iLabel, static: false }) set _lblTotDailyDoseVal(c: iLabel) {
        if (c) { this.lblTotDailyDoseVal = c; }
    };
    private lblAdjBdyWeight: iLabel;
    @ViewChild("lblAdjBdyWeightTempRef", { read: iLabel, static: false }) set _lblAdjBdyWeight(c: iLabel) {
        if (c) { this.lblAdjBdyWeight = c; }
    };
    private lblAdjBdyWeightVal: iLabel;
    @ViewChild("lblAdjBdyWeightValTempRef", { read: iLabel, static: false }) set _lblAdjBdyWeightVal(c: iLabel) {
        if (c) { this.lblAdjBdyWeightVal = c; }
    };
    private lblOrderedAmtPerDose: iLabel;
    @ViewChild("lblOrderedAmtPerDoseTempRef", { read: iLabel, static: false }) set _lblOrderedAmtPerDose(c: iLabel) {
        if (c) { this.lblOrderedAmtPerDose = c; }
    };
    private lblOrderedAmtPerDoseVal: iLabel;
    @ViewChild("lblOrderedAmtPerDoseValTempRef", { read: iLabel, static: false }) set _lblOrderedAmtPerDoseVal(c: iLabel) {
        if (c) { this.lblOrderedAmtPerDoseVal = c; }
    };
    private lblReqDose: iLabel;
    @ViewChild("lblReqDoseTempRef", { read: iLabel, static: false }) set _lblReqDose(c: iLabel) {
        if (c) { this.lblReqDose = c; }
    };
    private lblReqDoseVal: iLabel;
    @ViewChild("lblReqDoseValTempRef", { read: iLabel, static: false }) set _lblReqDoseVal(c: iLabel) {
        if (c) { this.lblReqDoseVal = c; }
    };
    private lblBSA: iLabel;
    @ViewChild("lblBSATempRef", { read: iLabel, static: false }) set _lblBSA(c: iLabel) {
        if (c) { this.lblBSA = c; }
    };
    private lblBSAVal: iLabel;
    @ViewChild("lblBSAValTempRef", { read: iLabel, static: false }) set _lblBSAVal(c: iLabel) {
        if (c) { this.lblBSAVal = c; }
    };
    private lbReasForOver: iLabel;
    @ViewChild("lbReasForOverTempRef", { read: iLabel, static: false }) set _lbReasForOver(c: iLabel) {
        if (c) { this.lbReasForOver = c; }
    };
    private lbReasForOverVal: iLabel;
    @ViewChild("lbReasForOverValTempRef", { read: iLabel, static: false }) set _lbReasForOverVal(c: iLabel) {
        if (c) { this.lbReasForOverVal = c; }
    };
    private lblIndDose: iLabel;
    @ViewChild("lblIndDoseTempRef", { read: iLabel, static: false }) set _lblIndDose(c: iLabel) {
        if (c) { this.lblIndDose = c; }
    };
    private lblIndDoseVal: iLabel;
    @ViewChild("lblIndDoseValTempRef", { read: iLabel, static: false }) set _lblIndDoseVal(c: iLabel) {
        if (c) { this.lblIndDoseVal = c; }
    };
    private lblDoseCalDetails: iLabel;
    @ViewChild("lblDoseCalDetailsTempRef", { read: iLabel, static: false }) set _lblDoseCalDetails(c: iLabel) {
        if (c) { this.lblDoseCalDetails = c; }
    };
    private grdchild: Grid;
    @ViewChild("grdchildTempRef", { read: Grid, static: false }) set _grdchild(c: Grid) {
        if (c) { this.grdchild = c; }
    };
    private lblDoseCalcTxt1: iLabel;
    @ViewChild("lblDoseCalcTxt1TempRef", { read: iLabel, static: false }) set _lblDoseCalcTxt1(c: iLabel) {
        if (c) { this.lblDoseCalcTxt1 = c; }
    };
    private lblDoseCalcTxtVal1: iLabel;
    @ViewChild("lblDoseCalcTxtVal1TempRef", { read: iLabel, static: false }) set _lblDoseCalcTxtVal1(c: iLabel) {
        if (c) { this.lblDoseCalcTxtVal1 = c; }
    };
    private lblDoseCalcTxt2: iLabel;
    @ViewChild("lblDoseCalcTxt2TempRef", { read: iLabel, static: false }) set _lblDoseCalcTxt2(c: iLabel) {
        if (c) { this.lblDoseCalcTxt2 = c; }
    };
    private lblDoseCalcTxtVal2: iLabel;
    @ViewChild("lblDoseCalcTxtVal2TempRef", { read: iLabel, static: false }) set _lblDoseCalcTxtVal2(c: iLabel) {
        if (c) { this.lblDoseCalcTxtVal2 = c; }
    };
    private lblDoseCalcTxt3: iLabel;
    @ViewChild("lblDoseCalcTxt3TempRef", { read: iLabel, static: false }) set _lblDoseCalcTxt3(c: iLabel) {
        if (c) { this.lblDoseCalcTxt3 = c; }
    };
    private lblDoseCalcTxtVal3: iLabel;
    @ViewChild("lblDoseCalcTxtVal3TempRef", { read: iLabel, static: false }) set _lblDoseCalcTxtVal3(c: iLabel) {
        if (c) { this.lblDoseCalcTxtVal3 = c; }
    };
    private lblDoseCalcTxt4: iLabel;
    @ViewChild("lblDoseCalcTxt4TempRef", { read: iLabel, static: false }) set _lblDoseCalcTxt4(c: iLabel) {
        if (c) { this.lblDoseCalcTxt4 = c; }
    };
    private lblDoseCalcTxtVal4: iLabel;
    @ViewChild("lblDoseCalcTxtVal4TempRef", { read: iLabel, static: false }) set _lblDoseCalcTxtVal4(c: iLabel) {
        if (c) { this.lblDoseCalcTxtVal4 = c; }
    };
    private lblDoseCalcTxt5: iLabel;
    @ViewChild("lblDoseCalcTxt5TempRef", { read: iLabel, static: false }) set _lblDoseCalcTxt5(c: iLabel) {
        if (c) { this.lblDoseCalcTxt5 = c; }
    };
    private lblDoseCalcTxtVal5: iLabel;
    @ViewChild("lblDoseCalcTxtVal5TempRef", { read: iLabel, static: false }) set _lblDoseCalcTxtVal5(c: iLabel) {
        if (c) { this.lblDoseCalcTxtVal5 = c; }
    };
    public mezmaxheight = (window.devicePixelRatio==1) ? 470 : (470-30);
    public PrescriptionItemOID: number = 0;
    public MCVersion: string;
    constructor() {
        super();
        this.DataContext = DoseDetailsdata;
        // InitializeComponent();
    }
}