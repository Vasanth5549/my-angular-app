import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MedAmendMessageVM } from '../viewmodel/MedicationChartVM';
import { iAppDialogWindow, WindowButtonType, AppDialogEventargs } from 'epma-platform/models';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { ObjectHelper, StringBuilder } from 'epma-platform/services';
import { ConditionalDoseVM, RequestSource } from 'src/app/lorappmedicationcommonbb/viewmodel/ConditionalDoseVM';
import { MultipleDoseDetail } from 'src/app/lorappmedicationcommonbb/viewmodel/prescriptionitemdetailsvm';
import { MedTitratedDose } from 'src/app/lorappmedicationcommonbb/view/medtitrateddose';
import { Resource } from '../resource';
import { Control, Cursors, FontStyles, FontWeights, Grid, GridLength, HorizontalAlignment, Thickness, ToolTipService, VerticalAlignment, iButton, iLabel } from 'epma-platform/controls';
import { LzoWizardVmbaseService as LzoWizardVMBase } from '../../shared/epma-platform/services/lzo-wizard-vmbase.service';
import { MedConditionalDose } from 'src/app/lorappmedicationcommonbb/view/medconditionaldose';
import { DoseTypeCode } from '../utilities/CConstants';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { ColumnDefinition, RowDefinition } from 'src/app/shared/epma-platform/controls/epma-grid/epma-grid.component';
import { MedSteppedFullPrescriptionVW } from 'src/app/lorappmedicationcommonbb/view/medSteppedFullPrescriptionVW';

@Component({
    selector: 'MedAmendMessage',
    templateUrl: './MedAmendMessage.html',
    styleUrls: ['./MedAmendMessage.css']
})

export class MedAmendMessage extends iAppDialogWindow implements AfterViewInit {

    AmendDetails: Grid;
    @ViewChild('AmendDetailsTempRef', { read: Grid, static: false }) set _grid1(c: Grid) { if (c) { this.AmendDetails = c; } }

    bCtrlsIsLoaded: boolean = false;
    public strAmendedMsg: string[];
    nTabIdx: number = 0;
    oMedAmendMessageVM: MedAmendMessageVM;
    private ConditionalVM: ConditionalDoseVM;
    private MultiDoseDetailVM: MultipleDoseDetail;
    private objTitrated: MedTitratedDose;
    strAmendMessage: StringBuilder = new StringBuilder();
    lnPrescriptionOID: number = 0;
    lnAmendedPresOID: number = 0;
    MCVersion: string = String.Empty;
    sIdentifyingName: string = String.Empty;
    sDoseType: string = String.Empty;
    lbl: Control;
    ctrl: Control

    constructor(oMedAmendVM: MedAmendMessageVM) {
        super();
        this.oMedAmendMessageVM = oMedAmendVM;
        this.DataContext = this.oMedAmendMessageVM;
    }
    ngAfterViewInit(): void {
        this.lnPrescriptionOID = this.oMedAmendMessageVM.PrescriptionitemOID;
        this.lnAmendedPresOID = this.oMedAmendMessageVM.AmendedPresOID;
        this.MCVersion = this.oMedAmendMessageVM.MCVersion;
        this.sDoseType = this.oMedAmendMessageVM.DoseType;
        this.strAmendMessage.Append(Resource.MedAmendMessage.lblAmendMessage_Text);
        this.strAmendMessage.Append("\n");
        this.strAmendMessage.Append(Resource.MedAmendMessage.lblAmendMsg_Text);
        this.strAmendedMsg = this.oMedAmendMessageVM.AmendMsg.Split('\n');
        this.oMedAmendMessageVM.AmendMsg = this.strAmendMessage.ToString();
        this.oMedAmendMessageVM.AmendMsgOkCancel = this.oMedAmendMessageVM.AmendMsgOkCancel;
        this.DataContext = this.oMedAmendMessageVM;

        this.BindControls();
    }
    public BindControls(): void {
        if (!this.bCtrlsIsLoaded) {
            this.AmendDetails.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: "2*" }));
            this.AmendDetails.ColumnDefinitions.Add(ObjectHelper.CreateObject(new ColumnDefinition(), { Width: "3*" }));

            var nCtrlsCnt: number = this.strAmendedMsg.length - 1;
            for (var i: number = 0; i < nCtrlsCnt; i++)
                this.AmendDetails.RowDefinitions.Add(ObjectHelper.CreateObject(new RowDefinition(), { Height: GridLength.Auto }));
            var nLblColumn: number = 0;
            var nCtrlColumn: number = 2;
            for (var i: number = 0; i < nCtrlsCnt; i++) {
                this.lbl = null;
                this.ctrl = null;
                var sCtrl: string[];
                sCtrl = this.strAmendedMsg[i].Split('~');
                this.nTabIdx++;
                if (sCtrl[0] == "Route" && sCtrl.Count() > 1) {
                    this.GetControlsToBind(sCtrl[0], sCtrl[2]);
                }
                else {
                    this.GetControlsToBind(sCtrl[0], sCtrl[1]);
                }
                if (this.lbl != null) {
                    this.AmendDetails.Children.Add(this.lbl);
                    Grid.SetRow(this.lbl, i);
                    Grid.SetColumn(this.lbl, nLblColumn);
                }
                if (this.ctrl != null) {
                    this.AmendDetails.Children.Add(this.ctrl);
                    Grid.SetRow(this.ctrl, i);
                    Grid.SetColumn(this.ctrl, nCtrlColumn);
                }
            }
            this.bCtrlsIsLoaded = true;
        }
    }
    private GetControlsToBind(sCtrl: string, sCtrlVal: string): void {
        var lblTempVal: iLabel;
        var lblTemp: iLabel;
        var btnTemp: iButton;
        try {
            if (String.Compare(sCtrl, "Dose") == 0) {
                if (String.Compare(sCtrlVal, "ICON") == 0) {
                    lblTemp = this.GetiLabel("lblDose", "Dose Regime details - ");
                    btnTemp = this.GetiButton("btnDoseVal");
                    this.ctrl = btnTemp;
                }
                else {
                    lblTemp = this.GetiLabel("lblDose", "Dose - ");
                    lblTempVal = this.GetiLabel("lblValDose", sCtrlVal);
                    this.ctrl = lblTempVal;
                }
                this.lbl = lblTemp;
            }
            else {
                lblTemp = this.GetiLabel("lbl" + sCtrl, sCtrl + " - ");
                lblTempVal = this.GetiLabel("lblVal" + sCtrl, sCtrlVal);
                this.lbl = lblTemp;
                this.ctrl = lblTempVal;
            }
        }
        catch (exp: any) {
            var objLzoWizardVMBase: LzoWizardVMBase = new LzoWizardVMBase();
            objLzoWizardVMBase.ErrorID = 60013;
            objLzoWizardVMBase.ErrorMessage = exp.Message;
            objLzoWizardVMBase.StackTrace = exp.StackTrace;
            objLzoWizardVMBase.LogError();
        }

    }
    private GetiLabel(Name: string, Text: string): iLabel {
        return ObjectHelper.CreateObject(new iLabel(), {
            Name: Name,
            Text: Text,
            Margin: new Thickness(0, 5, 10, 0),
            HorizontalAlignment: HorizontalAlignment.Left,
            VerticalAlignment: VerticalAlignment.Top,
            Width: 194,
            FontStyle: FontStyles.Normal,
            FontWeight: FontWeights.Bold,
            IsWordwrap: true
        });
    }
    private GetiButton(Name: string): iButton {
        var ibtnDose: iButton = new iButton();
        ibtnDose.Name = Name;
        ibtnDose.Cursor = Cursors.Hand;
        ibtnDose.Width = 50;
        ibtnDose.ImageSource = "./assets/images/idosetypenor16.PNG";
        ibtnDose.DisabledImageSource = "./images/idosetypedis16.PNG";
        ibtnDose.ActiveImageSource = "./assets/images/idosetypehot16.PNG";
        ibtnDose.SelectedImageSource = "./assets/images/idosetypenor16.PNG";
        ToolTipService.SetToolTip(ibtnDose, ObjectHelper.CreateObject(new iLabel(), { MaxWidth: 250, IsWordwrap: true, Text: "Select to view dosing information" }));
        ibtnDose.Click = (s, e) => { this.ibtnDose_Click(s, e) };
        return ibtnDose;
    }
    ibtnDose_Click(sender: Object, e: RoutedEventArgs): void {
        if (this.sDoseType != null) {
            if ((String.Compare(this.sDoseType, DoseTypeCode.STEPPEDVARIABLE) == 0) || (String.Compare(this.sDoseType, DoseTypeCode.STEPPED) == 0) || (String.Compare(this.sDoseType, DoseTypeCode.VARIABLE) == 0)) {
                this.MultiDoseDetailVM = new MultipleDoseDetail(this.lnAmendedPresOID, this.MCVersion, this.sDoseType, "EPR", String.Empty);
                Busyindicator.SetStatusBusy("SteppenFullPrescription");

                var objStepped: MedSteppedFullPrescriptionVW = new MedSteppedFullPrescriptionVW();

                let temp =  this.MultiDoseDetailVM.PresItemDoseInfoServicedata.subscribe(()=> {                
                    objStepped.DataContext = this.MultiDoseDetailVM;
                    objStepped.onDialogClose = this.objDoseType_Closed;
                    AppActivity.OpenWindow(this.oMedAmendMessageVM.IdentifyingName, objStepped, (s, e) => { this.objDoseType_Closed(s) }, "", false, 600, 950, false, WindowButtonType.Close, null);
                    temp.unsubscribe(); 
                });
            }
            else if (String.Compare(this.sDoseType, DoseTypeCode.TITRATED) == 0) {
                this.objTitrated = new MedTitratedDose();
                this.MultiDoseDetailVM = new MultipleDoseDetail(this.lnAmendedPresOID, this.MCVersion, this.sDoseType, "EPR", String.Empty);
                this.MultiDoseDetailVM.TitratedDoseCompleted = (s, e) => { this.MultiDoseDetailVM_TitratedDoseCompleted() };
            }
            else if (String.Compare(this.sDoseType.Trim(), DoseTypeCode.CONDITIONAL) == 0) {
                if (this.ConditionalVM == null) {
                    this.ConditionalVM = ObjectHelper.CreateObject(new ConditionalDoseVM(RequestSource.ViewDrugDetails, this.lnAmendedPresOID), { DrugName: this.oMedAmendMessageVM.IdentifyingName });
                }
                var objConditional: MedConditionalDose = new MedConditionalDose();
                objConditional.DataContext = this.ConditionalVM;
                AppActivity.OpenWindow(this.oMedAmendMessageVM.IdentifyingName, objConditional, (s, e) => { this.objDoseType_Closed(s) }, "", false, 250, 460, false, WindowButtonType.Close, null);
            }
        }
    }
    MultiDoseDetailVM_TitratedDoseCompleted(): void {
        this.objTitrated = new MedTitratedDose();
        this.objTitrated.DataContext = this.MultiDoseDetailVM;
        this.objTitrated.onDialogClose = this.objDoseType_Closed;
        AppActivity.OpenWindow(this.oMedAmendMessageVM.IdentifyingName, this.objTitrated, (s, e) => { this.objDoseType_Closed(s) }, "", false, 350, 480, false, WindowButtonType.Close, null);
    }
    private objDoseType_Closed(args: AppDialogEventargs): void {
        args.AppChildWindow.DialogResult = true;
    }
}
