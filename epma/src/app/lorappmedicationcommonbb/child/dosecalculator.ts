import { Component, Input, OnInit, Type, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity, ProcessRTE } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow, Visibility } from 'epma-platform/models';
import { AppDialog, Border, Colors, Control, Grid, ScrollViewer, SolidColorBrush, StackPanel, iButton, iComboBox, iLabel, iRadioButton, iTextBox } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { DoseCalcVM } from '../viewmodel/DoseCalcVM';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { Resource } from '../resource';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { CConstants, ValueDomain } from '../utilities/constants';
import { QueryStringInfo } from 'src/app/lorappmanageprescriptionbbui/utilities/globalvariable';
// import { timeStamp } from 'console';

@Component({
    selector: 'app-dosecalculator',
    templateUrl: './dosecalculator.html',
    styleUrls: ['./dosecalculator.css']
})
export class DoseCalculator extends iAppDialogWindow {
    objDoseCalcVM: DoseCalcVM;
    public Styles = ControlStyles;
    //public DoseCalcVMFocusEvent: any = DoseCalcVM.FocusEventArgs;
    public oMsgBox: iMessageBox;
    override _DataContext;
    override get DataContext() {
        return this._DataContext;
    }
    @Input() override set DataContext(value: any) {
        this._DataContext = value;
    }

    public svwFormViewer: ScrollViewer;
    @ViewChild("svwFormViewerTempRef", { read: ScrollViewer, static: false }) set _svwFormViewer(c: ScrollViewer) {
        if (c) { this.svwFormViewer = c; }
    };
    public LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    public brdCDCForm: Border;
    @ViewChild("brdCDCFormTempRef", { read: Border, static: false }) set _brdCDCForm(c: Border) {
        if (c) { this.brdCDCForm = c; }
    };
    public lblHeader: iLabel;
    @ViewChild("lblHeaderTempRef", { read: iLabel, static: false }) set _lblHeader(c: iLabel) {
        if (c) { this.lblHeader = c; }
    };
    public lblWeight: iLabel;
    @ViewChild("lblWeightTempRef", { read: iLabel, static: false }) set _lblWeight(c: iLabel) {
        if (c) { this.lblWeight = c; }
    };
    public cmdWeightValue: iButton;
    @ViewChild("cmdWeightValueTempRef", { read: iButton, static: false }) set _cmdWeightValue(c: iButton) {
        if (c) { this.cmdWeightValue = c; }
    };
    public lblWeightError: iLabel;
    @ViewChild("lblWeightErrorTempRef", { read: iLabel, static: false }) set _lblWeightError(c: iLabel) {
        if (c) { this.lblWeightError = c; }
    };
    public lblHeight: iLabel;
    @ViewChild("lblHeightTempRef", { read: iLabel, static: false }) set _lblHeight(c: iLabel) {
        if (c) { this.lblHeight = c; }
    };
    public cmdHeightValue: iButton;
    @ViewChild("cmdHeightValueTempRef", { read: iButton, static: false }) set _cmdHeightValue(c: iButton) {
        if (c) { this.cmdHeightValue = c; }
    };
    public lblHeightError: iLabel;
    @ViewChild("lblHeightErrorTempRef", { read: iLabel, static: false }) set _lblHeightError(c: iLabel) {
        if (c) { this.lblHeightError = c; }
    };
    public brdcalcdose: Border;
    @ViewChild("brdcalcdoseTempRef", { read: Border, static: false }) set _brdcalcdose(c: Border) {
        if (c) { this.brdcalcdose = c; }
    };
    public lblcalcdose: iLabel;
    @ViewChild("lblcalcdoseTempRef", { read: iLabel, static: false }) set _lblcalcdose(c: iLabel) {
        if (c) { this.lblcalcdose = c; }
    };
    public lblBasedOn: iLabel;
    @ViewChild("lblBasedOnTempRef", { read: iLabel, static: false }) set _lblBasedOn(c: iLabel) {
        if (c) { this.lblBasedOn = c; }
    };
    public OptIndividualDoseReq: iRadioButton;
    @ViewChild("OptIndividualDoseReqTempRef", { read: iRadioButton, static: false }) set _OptIndividualDoseReq(c: iRadioButton) {
        if (c) { this.OptIndividualDoseReq = c; }
    };
    public OptDailyDoseReq: iRadioButton;
    @ViewChild("OptDailyDoseReqTempRef", { read: iRadioButton, static: false }) set _OptDailyDoseReq(c: iRadioButton) {
        if (c) { this.OptDailyDoseReq = c; }
    };
    public lblRequestedDose: iLabel;
    @ViewChild("lblRequestedDoseTempRef", { read: iLabel, static: false }) set _lblRequestedDose(c: iLabel) {
        if (c) { this.lblRequestedDose = c; }
    };
    public txtRequestedDose: iTextBox;
    @ViewChild("txtRequestedDoseTempRef", { read: iTextBox, static: false }) set _txtRequestedDose(c: iTextBox) {
        if (c) { this.txtRequestedDose = c; }
    };
    public lblUOM: iLabel;
    @ViewChild("lblUOMTempRef", { read: iLabel, static: false }) set _lblUOM(c: iLabel) {
        if (c) { this.lblUOM = c; }
    };
    public brdUOMErr: Border;
    @ViewChild("brdUOMErrTempRef", { read: Border, static: false }) set _brdUOMErr(c: Border) {
        if (c) { this.brdUOMErr = c; }
    };
    public cboReqDoseUOM: iComboBox;
    @ViewChild("cboReqDoseUOMTempRef", { read: iComboBox, static: false }) set _cboReqDoseUOM(c: iComboBox) {
        if (c) { this.cboReqDoseUOM = c; }
    };
    public lblPerUOM: iLabel;
    @ViewChild("lblPerUOMTempRef", { read: iLabel, static: false }) set _lblPerUOM(c: iLabel) {
        if (c) { this.lblPerUOM = c; }
    };
    public brdPerDoseErr: Border;
    @ViewChild("brdPerDoseErrTempRef", { read: Border, static: false }) set _brdPerDoseErr(c: Border) {
        if (c) { this.brdPerDoseErr = c; }
    };
    public cboReqDoseSecondUOM: iComboBox;
    @ViewChild("cboReqDoseSecondUOMTempRef", { read: iComboBox, static: false }) set _cboReqDoseSecondUOM(c: iComboBox) {
        if (c) { this.cboReqDoseSecondUOM = c; }
    };
    public lblPer2UOM: iLabel;
    @ViewChild("lblPer2UOMTempRef", { read: iLabel, static: false }) set _lblPer2UOM(c: iLabel) {
        if (c) { this.lblPer2UOM = c; }
    };
    public brdInfUOMErr: Border;
    @ViewChild("brdInfUOMErrTempRef", { read: Border, static: false }) set _brdInfUOMErr(c: Border) {
        if (c) { this.brdInfUOMErr = c; }
    };
    public cboReqDoseThirdUOM: iComboBox;
    @ViewChild("cboReqDoseThirdUOMTempRef", { read: iComboBox, static: false }) set _cboReqDoseThirdUOM(c: iComboBox) {
        if (c) { this.cboReqDoseThirdUOM = c; }
    };
    public lblPerDose: iLabel;
    @ViewChild("lblPerDoseTempRef", { read: iLabel, static: false }) set _lblPerDose(c: iLabel) {
        if (c) { this.lblPerDose = c; }
    };
    public lblFrequency: iLabel;
    @ViewChild("lblFrequencyTempRef", { read: iLabel, static: false }) set _lblFrequency(c: iLabel) {
        if (c) { this.lblFrequency = c; }
    };
    public brdFreqErr: Border;
    @ViewChild("brdFreqErrTempRef", { read: Border, static: false }) set _brdFreqErr(c: Border) {
        if (c) { this.brdFreqErr = c; }
    };
    public cboFrequency: iComboBox;
    @ViewChild("cboFrequencyTempRef", { read: iComboBox, static: false }) set _cboFrequency(c: iComboBox) {
        if (c) { this.cboFrequency = c; }
    };
    public lblFreqErr: iLabel;
    @ViewChild("lblFreqErrTempRef", { read: iLabel, static: false }) set _lblFreqErr(c: iLabel) {
        if (c) { this.lblFreqErr = c; }
    };
    public lblBasedon: iLabel;
    @ViewChild("lblBasedonTempRef", { read: iLabel, static: false }) set _lblBasedon(c: iLabel) {
        if (c) { this.lblBasedon = c; }
    };
    public brdBOnWeightErr: Border;
    @ViewChild("brdBOnWeightErrTempRef", { read: Border, static: false }) set _brdBOnWeightErr(c: Border) {
        if (c) { this.brdBOnWeightErr = c; }
    };
    public OptWeight: iRadioButton;
    @ViewChild("OptWeightTempRef", { read: iRadioButton, static: false }) set _OptWeight(c: iRadioButton) {
        if (c) { this.OptWeight = c; }
    };
    public OptBSA: iRadioButton;
    @ViewChild("OptBSATempRef", { read: iRadioButton, static: false }) set _OptBSA(c: iRadioButton) {
        if (c) { this.OptBSA = c; }
    };
    public lblWeightOption: iLabel;
    @ViewChild("lblWeightOptionTempRef", { read: iLabel, static: false }) set _lblWeightOption(c: iLabel) {
        if (c) { this.lblWeightOption = c; }
    };
    public OptRecordedWeight: iRadioButton;
    @ViewChild("OptRecordedWeightTempRef", { read: iRadioButton, static: false }) set _OptRecordedWeight(c: iRadioButton) {
        if (c) { this.OptRecordedWeight = c; }
    };
    public OptIBW: iRadioButton;
    @ViewChild("OptIBWTempRef", { read: iRadioButton, static: false }) set _OptIBW(c: iRadioButton) {
        if (c) { this.OptIBW = c; }
    };
    public OptABW: iRadioButton;
    @ViewChild("OptABWTempRef", { read: iRadioButton, static: false }) set _OptABW(c: iRadioButton) {
        if (c) { this.OptABW = c; }
    };
    public brdBSACboErr: Border;
    @ViewChild("brdBSACboErrTempRef", { read: Border, static: false }) set _brdBSACboErr(c: Border) {
        if (c) { this.brdBSACboErr = c; }
    };
    public cboBSAFormula: iComboBox;
    @ViewChild("cboBSAFormulaTempRef", { read: iComboBox, static: false }) set _cboBSAFormula(c: iComboBox) {
        if (c) { this.cboBSAFormula = c; }
    };
    public lblRecalErr: iLabel;
    @ViewChild("lblRecalErrTempRef", { read: iLabel, static: false }) set _lblRecalErr(c: iLabel) {
        if (c) { this.lblRecalErr = c; }
    };
    public cmdRecalculate: iButton;
    @ViewChild("cmdRecalculateTempRef", { read: iButton, static: false }) set _cmdRecalculate(c: iButton) {
        if (c) { this.cmdRecalculate = c; }
    };
    public lblBSAWgtDisplay: iLabel;
    @ViewChild("lblBSAWgtDisplayTempRef", { read: iLabel, static: false }) set _lblBSAWgtDisplay(c: iLabel) {
        if (c) { this.lblBSAWgtDisplay = c; }
    };
    public lblCalBSAWgtDisply: iLabel;
    @ViewChild("lblCalBSAWgtDisplyTempRef", { read: iLabel, static: false }) set _lblCalBSAWgtDisply(c: iLabel) {
        if (c) { this.lblCalBSAWgtDisply = c; }
    };
    public lblTotalDoseDisplay: iLabel;
    @ViewChild("lblTotalDoseDisplayTempRef", { read: iLabel, static: false }) set _lblTotalDoseDisplay(c: iLabel) {
        if (c) { this.lblTotalDoseDisplay = c; }
    };
    public lblCalOptValue: iLabel;
    @ViewChild("lblCalOptValueTempRef", { read: iLabel, static: false }) set _lblCalOptValue(c: iLabel) {
        if (c) { this.lblCalOptValue = c; }
    };
    public brdAdjBWWarning: Border;
    @ViewChild("brdAdjBWWarningTempRef", { read: Border, static: false }) set _brdAdjBWWarning(c: Border) {
        if (c) { this.brdAdjBWWarning = c; }
    };
    public spnalAdjBWWarning: StackPanel;
    @ViewChild("spnalAdjBWWarningTempRef", { read: StackPanel, static: false }) set _spnalAdjBWWarning(c: StackPanel) {
        if (c) { this.spnalAdjBWWarning = c; }
    };
    public cmdAdjWarning: iButton;
    @ViewChild("cmdAdjWarningTempRef", { read: iButton, static: false }) set _cmdAdjWarning(c: iButton) {
        if (c) { this.cmdAdjWarning = c; }
    };
    public lblAdjWarning: iLabel;
    @ViewChild("lblAdjWarningTempRef", { read: iLabel, static: false }) set _lblAdjWarning(c: iLabel) {
        if (c) { this.lblAdjWarning = c; }
    };
    public brdcalculateddose: Border;
    @ViewChild("brdcalculateddoseTempRef", { read: Border, static: false }) set _brdcalculateddose(c: Border) {
        if (c) { this.brdcalculateddose = c; }
    };
    public lblcalculateddose: iLabel;
    @ViewChild("lblcalculateddoseTempRef", { read: iLabel, static: false }) set _lblcalculateddose(c: iLabel) {
        if (c) { this.lblcalculateddose = c; }
    };
    public lblCalcAmtPerDose: iLabel;
    @ViewChild("lblCalcAmtPerDoseTempRef", { read: iLabel, static: false }) set _lblCalcAmtPerDose(c: iLabel) {
        if (c) { this.lblCalcAmtPerDose = c; }
    };
    public lblCalcAmtPerDoseValue: iLabel;
    @ViewChild("lblCalcAmtPerDoseValueTempRef", { read: iLabel, static: false }) set _lblCalcAmtPerDoseValue(c: iLabel) {
        if (c) { this.lblCalcAmtPerDoseValue = c; }
    };
    public brdCalDecimalErr: Border;
    @ViewChild("brdCalDecimalErrTempRef", { read: Border, static: false }) set _brdCalDecimalErr(c: Border) {
        if (c) { this.brdCalDecimalErr = c; }
    };
    public lblCalAmtError: iLabel;
    @ViewChild("lblCalAmtErrorTempRef", { read: iLabel, static: false }) set _lblCalAmtError(c: iLabel) {
        if (c) { this.lblCalAmtError = c; }
    };
    public lblOrderedAmtPerDose: iLabel;
    @ViewChild("lblOrderedAmtPerDoseTempRef", { read: iLabel, static: false }) set _lblOrderedAmtPerDose(c: iLabel) {
        if (c) { this.lblOrderedAmtPerDose = c; }
    };
    public txtOrderedAmtDose: iTextBox;
    @ViewChild("txtOrderedAmtDoseTempRef", { read: iTextBox, static: false }) set _txtOrderedAmtDose(c: iTextBox) {
        if (c) { this.txtOrderedAmtDose = c; }
    };
    public lblOrderDoseUOM: iLabel;
    @ViewChild("lblOrderDoseUOMTempRef", { read: iLabel, static: false }) set _lblOrderDoseUOM(c: iLabel) {
        if (c) { this.lblOrderDoseUOM = c; }
    };
    public lblOrderDoseError: iLabel;
    @ViewChild("lblOrderDoseErrorTempRef", { read: iLabel, static: false }) set _lblOrderDoseError(c: iLabel) {
        if (c) { this.lblOrderDoseError = c; }
    };
    public lblOverrideReason: iLabel;
    @ViewChild("lblOverrideReasonTempRef", { read: iLabel, static: false }) set _lblOverrideReason(c: iLabel) {
        if (c) { this.lblOverrideReason = c; }
    };
    public brdOverdoseCboErr: Border;
    @ViewChild("brdOverdoseCboErrTempRef", { read: Border, static: false }) set _brdOverdoseCboErr(c: Border) {
        if (c) { this.brdOverdoseCboErr = c; }
    };
    public cboOverrideReason: iComboBox;
    @ViewChild("cboOverrideReasonTempRef", { read: iComboBox, static: false }) set _cboOverrideReason(c: iComboBox) {
        if (c) { this.cboOverrideReason = c; }
    };
    public lblDoseCalcDetails: iLabel;
    @ViewChild("lblDoseCalcDetailsTempRef", { read: iLabel, static: false }) set _lblDoseCalcDetails(c: iLabel) {
        if (c) { this.lblDoseCalcDetails = c; }
    };
    public lblDCCalculatedDisplay: iLabel;
    @ViewChild("lblDCCalculatedDisplayTempRef", { read: iLabel, static: false }) set _lblDCCalculatedDisplay(c: iLabel) {
        if (c) { this.lblDCCalculatedDisplay = c; }
    };
    public lblDCCalculatedDisplayValue: iLabel;
    @ViewChild("lblDCCalculatedDisplayValueTempRef", { read: iLabel, static: false }) set _lblDCCalculatedDisplayValue(c: iLabel) {
        if (c) { this.lblDCCalculatedDisplayValue = c; }
    };
    public lblDCTotalDoseDisplay: iLabel;
    @ViewChild("lblDCTotalDoseDisplayTempRef", { read: iLabel, static: false }) set _lblDCTotalDoseDisplay(c: iLabel) {
        if (c) { this.lblDCTotalDoseDisplay = c; }
    };
    public lblDCTotalDoseDisplayValue: iLabel;
    @ViewChild("lblDCTotalDoseDisplayValueTempRef", { read: iLabel, static: false }) set _lblDCTotalDoseDisplayValue(c: iLabel) {
        if (c) { this.lblDCTotalDoseDisplayValue = c; }
    };
    public lblDCTotalDoseDisplayValueTot: iLabel;
    @ViewChild("lblDCTotalDoseDisplayValueTotTempRef", { read: iLabel, static: false }) set _lblDCTotalDoseDisplayValueTot(c: iLabel) {
        if (c) { this.lblDCTotalDoseDisplayValueTot = c; }
    };
    public lblDCFrequencyDisplay: iLabel;
    @ViewChild("lblDCFrequencyDisplayTempRef", { read: iLabel, static: false }) set _lblDCFrequencyDisplay(c: iLabel) {
        if (c) { this.lblDCFrequencyDisplay = c; }
    };
    public lblDCFrequencyDisplayValue: iLabel;
    @ViewChild("lblDCFrequencyDisplayValueTempRef", { read: iLabel, static: false }) set _lblDCFrequencyDisplayValue(c: iLabel) {
        if (c) { this.lblDCFrequencyDisplayValue = c; }
    };
    public lblDCCalPerDoseDisplay: iLabel;
    @ViewChild("lblDCCalPerDoseDisplayTempRef", { read: iLabel, static: false }) set _lblDCCalPerDoseDisplay(c: iLabel) {
        if (c) { this.lblDCCalPerDoseDisplay = c; }
    };
    public lblDCCalPerDoseDisplayValue: iLabel;
    @ViewChild("lblDCCalPerDoseDisplayValueTempRef", { read: iLabel, static: false }) set _lblDCCalPerDoseDisplayValue(c: iLabel) {
        if (c) { this.lblDCCalPerDoseDisplayValue = c; }
    };
    public lblDCCalPerDoseDisplayValueTot: iLabel;
    @ViewChild("lblDCCalPerDoseDisplayValueTotTempRef", { read: iLabel, static: false }) set _lblDCCalPerDoseDisplayValueTot(c: iLabel) {
        if (c) { this.lblDCCalPerDoseDisplayValueTot = c; }
    };
    public lblDCOrdPerDoseDisplay: iLabel;
    @ViewChild("lblDCOrdPerDoseDisplayTempRef", { read: iLabel, static: false }) set _lblDCOrdPerDoseDisplay(c: iLabel) {
        if (c) { this.lblDCOrdPerDoseDisplay = c; }
    };
    public lblDCOrdPerDoseDisplayValue: iLabel;
    @ViewChild("lblDCOrdPerDoseDisplayValueTempRef", { read: iLabel, static: false }) set _lblDCOrdPerDoseDisplayValue(c: iLabel) {
        if (c) { this.lblDCOrdPerDoseDisplayValue = c; }
    };
    public lblDCOrdOverideValue: iLabel;
    @ViewChild("lblDCOrdOverideValueTempRef", { read: iLabel, static: false }) set _lblDCOrdOverideValue(c: iLabel) {
        if (c) { this.lblDCOrdOverideValue = c; }
    };
    public brdError: Border;
    @ViewChild("brdErrorTempRef", { read: Border, static: false }) set _brdError(c: Border) {
        if (c) { this.brdError = c; }
    };
    public lblError: iLabel;
    @ViewChild("lblErrorTempRef", { read: iLabel, static: false }) set _lblError(c: iLabel) {
        if (c) { this.lblError = c; }
    };
    public cmdClear: iButton;
    @ViewChild("cmdClearTempRef", { read: iButton, static: false }) set _cmdClear(c: iButton) {
        if (c) { this.cmdClear = c; }
    };

    @Input() set RTEResultArgs(value:any){
        this.objDoseCalcVM = new DoseCalcVM(value);
        this.DataContext = this.objDoseCalcVM;
    };
    public resKey = Resource.DoseCalculator;
    public comboBoxDropdownBroder:SolidColorBrush = new SolidColorBrush(Colors.Red)

    constructor() {
        super();
        //InitializeComponent();
        //this.DoseCalcVMFocusEvent = new DoseCalcVM.FocusEventArgs(this.DoseCalcVM_OnFocusEvent);
    }
    public maxScrollContentHeight;
    ngAfterViewInit(): void {
        this.maxScrollContentHeight = 610; //(window.devicePixelRatio == 1) ? 610 : ((610/window.devicePixelRatio)+10);
        if((!String.IsNullOrEmpty(QueryStringInfo.IsLaunchformMedchart) &&
        String.Equals(
          QueryStringInfo.IsLaunchformMedchart,
          'True',
          StringComparison.InvariantCultureIgnoreCase
        )) || (!String.IsNullOrEmpty(QueryStringInfo.IsClinicalNote) &&
          String.Equals(
            QueryStringInfo.IsClinicalNote,
            'Yes',
            StringComparison.InvariantCultureIgnoreCase
          )) || (!String.IsNullOrEmpty(QueryStringInfo.FromPreschart) &&
          String.Equals(
            QueryStringInfo.FromPreschart,
            'True',
            StringComparison.InvariantCultureIgnoreCase
          )) || (!String.IsNullOrEmpty(QueryStringInfo.IsLaunchformPreschartReview) &&
          String.Equals(
            QueryStringInfo.IsLaunchformPreschartReview,
            'True',
            StringComparison.InvariantCultureIgnoreCase
          ))){
        this.maxScrollContentHeight =(window.devicePixelRatio == 1) ? 610 : ((610/window.devicePixelRatio)-38);
     }
     else if(window.devicePixelRatio == 1.25){
        this.maxScrollContentHeight = 500;
     }
        this.DoseCalculator_Loaded(null, null);
        if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
            this.maxScrollContentHeight = 385;
        };
        //this.DoseCalcVMFocusEvent = new DoseCalcVM.FocusEventArgs(this.DoseCalcVM_OnFocusEvent);
        this.objDoseCalcVM.OnFocusEvent = (s,e) => {this.DoseCalcVM_OnFocusEvent(s);}
        //super.AfterViewInit();
    }

    private DoseCalcVM_OnFocusEvent(sCtrlID: string): void {
        if (String.IsNullOrEmpty(sCtrlID))
            return
        let ctrlToSetFocus: Object = this.FindName(sCtrlID);
        if (ctrlToSetFocus != null) {
            //let ctrlType: Type = ctrlToSetFocus.GetType();
            let ctrlType: string = ObjectHelper.GetType(ctrlToSetFocus);
            if (ctrlType.Equals(/*typeof*/"iComboBox")) {
                (ObjectHelper.CreateType<iComboBox>(ctrlToSetFocus, iComboBox)).Focus();
            }
            //  else if (ctrlType.Equals(/*typeof*/CDCUtility)) {
            //      (ObjectHelper.CreateType<CDCUtility>(ctrlToSetFocus, CDCUtility)).Focus();
            //  }
            else if (ctrlType.Equals(/*typeof*/"iTextBox")) {
                (ObjectHelper.CreateType<iTextBox>(ctrlToSetFocus, iTextBox)).Focus();
            }
            else if (ctrlType.Equals(/*typeof*/"iButton")) {
                (ObjectHelper.CreateType<iButton>(ctrlToSetFocus, iButton)).Focus();
            }
            else {
                (ObjectHelper.CreateType<Control>(ctrlToSetFocus, Control)).Focus();
            }
        }
    }
    private oMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        let sCtrlID: string = ObjectHelper.CreateType<string>(this.oMsgBox.Tag, String);
        if (String.IsNullOrEmpty(sCtrlID))
            return
        let ctrlToSetFocus: Object = this.FindName(sCtrlID);
        if (ctrlToSetFocus != null) {
            //let ctrlType: Type = ctrlToSetFocus.GetType();
            let ctrlType: string = ObjectHelper.GetType(ctrlToSetFocus);
            if (ctrlType.Equals(/*typeof*/"iComboBox")) {
                (ObjectHelper.CreateType<iComboBox>(ctrlToSetFocus, iComboBox)).Focus();
            }
            // else if (ctrlType.Equals(/*typeof*/CDCUtility)) {
            //     (ObjectHelper.CreateType<CDCUtility>(ctrlToSetFocus, CDCUtility)).Focus();
            // }
            else if (ctrlType.Equals(/*typeof*/"iTextBox")) {
                (ObjectHelper.CreateType<iTextBox>(ctrlToSetFocus, iTextBox)).Focus();
            }
            else if (ctrlType.Equals(/*typeof*/"iButton")) {
                (ObjectHelper.CreateType<iButton>(ctrlToSetFocus, iButton)).Focus();
            }
            else {
                (ObjectHelper.CreateType<Control>(ctrlToSetFocus, Control)).Focus();
            }
        }
    }

    public onRequestedDoseBlur(e:any) {
        if (e.Text == 0){
        e.Text = String.Empty;
        this.txtRequestedDose.Focus();
        }
    }


    private DoseCalculator_Loaded(sender: Object, e: RoutedEventArgs): void {
        //this.objDoseCalcVM.OnFocusEvent += this.DoseCalcVM_OnFocusEvent;
        this.objDoseCalcVM.OnFocusEvent = (s, e) => { this.DoseCalcVM_OnFocusEvent(s); };
        //this.objDoseCalcVM.OnFocusEvent = null;
        this.objDoseCalcVM.GetPatientConsideration4DC();
    }
    private DoseCalculator_UnLoaded(sender: Object, e: RoutedEventArgs): void {
        this.DisposeFormEvents();
    }
    private DisposeFormEvents(): void {
        //this.objDoseCalcVM.OnFocusEvent -= DoseCalcVM_OnFocusEvent;
    }

    public FocusWeight()
    {
        this.cmdWeightValue.setFocus();
        if(this.objDoseCalcVM != null)
        this.objDoseCalcVM.IsClearEnabled = false;
    }

}

