import { Component, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow, CListItem } from 'epma-platform/models';
import { AppDialog, Border, EventArgs, Grid, Key, KeyEventArgs, iButton, iComboBox, iLabel, iTextBox } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { CDrugHdrAddnlInfo, DrugHeader } from '../common/drugheader';
import { ObservationChartVM } from '../ca/observationchart/ObservationChartVM';
import { DrugItem } from 'src/app/lorarcbluebirdmedicationchart/common/DrugItem';
import { FormDefaults, TitratedDoseVM } from '../viewmodel/MedsAdminVM';
import { ResDrugHeader } from '../common/resdrugheader.designer';
import { Common } from '../utilities/common';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { CConstants } from '../utilities/CConstants';
import { Resource } from '../resource';
import { DoseSchedule } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
var EnterTitratedDose_that;
@Component({
    selector: 'EnterTitratedDose',
    templateUrl: './EnterTitratedDose.html'
  })

export class EnterTitratedDose extends iAppDialogWindow {
    public Styles = ControlStyles;
    public CondRes = Resource.ConditionalRegime;
    public objTitratedDose = Resource.EnterTitratedDose;

    public LayoutRoot: Grid;
    isShiftKeyPressed: boolean;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    public objDrugHeader: DrugHeader = new DrugHeader;
    @ViewChild("objDrugHeaderTempRef", { read: DrugHeader, static: false }) set _objDrugHeader(c: DrugHeader) {
        if (c) { this.objDrugHeader = c; }
    };
    public brdSTA: Border;
    @ViewChild("brdSTATempRef", { read: Border, static: false }) set _brdSTA(c: Border) {
        if (c) { this.brdSTA = c; }
    };
    public lblBorder: iLabel;
    @ViewChild("lblBorderTempRef", { read: iLabel, static: false }) set _lblBorder(c: iLabel) {
        if (c) { this.lblBorder = c; }
    };
    public lbldate: iLabel;
    @ViewChild("lbldateTempRef", { read: iLabel, static: false }) set _lbldate(c: iLabel) {
        if (c) { this.lbldate = c; }
    };
    public lbldatedata: iLabel;
    @ViewChild("lbldatedataTempRef", { read: iLabel, static: false }) set _lbldatedata(c: iLabel) {
        if (c) { this.lbldatedata = c; }
    };
    public lbltime: iLabel;
    @ViewChild("lbltimeTempRef", { read: iLabel, static: false }) set _lbltime(c: iLabel) {
        if (c) { this.lbltime = c; }
    };
    public lbltimedata: iLabel;
    @ViewChild("lbltimedataTempRef", { read: iLabel, static: false }) set _lbltimedata(c: iLabel) {
        if (c) { this.lbltimedata = c; }
    };
    public lbldose: iLabel;
    @ViewChild("lbldoseTempRef", { read: iLabel, static: false }) set _lbldose(c: iLabel) {
        if (c) { this.lbldose = c; }
    };
    public txtDose: iTextBox;
    @ViewChild("txtDoseTempRef", { read: iTextBox, static: false }) set _txtDose(c: iTextBox) {
        if (c) { this.txtDose = c; }
    };
    public lblUoM: iLabel;
    @ViewChild("lblUoMTempRef", { read: iLabel, static: false }) set _lblUoM(c: iLabel) {
        if (c) { this.lblUoM = c; }
    };
    public cboUoM: iComboBox;
    @ViewChild("cboUoMTempRef", { read: iComboBox, static: false }) set _cboUoM(c: iComboBox) {
        if (c) { this.cboUoM = c; }
    };
    public cmdObservationsResults: iButton;
    @ViewChild("cmdObservationsResultsTempRef", { read: iButton, static: false }) set _cmdObservationsResults(c: iButton) {
        if (c) { this.cmdObservationsResults = c; }
    };

    public static CONTS_DOSE: string = "Dose";
    public static CONTS_DOSEUOM: string = "Dose UoM";
    public objObsResultVM: ObservationChartVM;
    oDrugItem: DrugItem;
    Drugname: string = String.Empty;
    oHdrAddnlInfo: CDrugHdrAddnlInfo;
    oTitratedDoseVM: TitratedDoseVM;
    constructor() {
        //InitializeComponent();
        super();
        this.oDrugItem = new DrugItem();
        this.oHdrAddnlInfo = new CDrugHdrAddnlInfo();
        this.oDrugItem.DoseLabel = ResDrugHeader.drugItem_DoseLabelText;
        this.oDrugItem.RouteLabel = ResDrugHeader.drugItem_RouteLabelText;
        this.objDrugHeader.DataContext = Common.SetDrugHeaderContent(this.oDrugItem, this.oHdrAddnlInfo, this.objDrugHeader);
    }
    oTitratedDoseVM_IsTitratedUpdatedEvent(): void {
        this.appDialog.DialogResult = true;
    }
    ngOnInit() {
        this.EnterTitratedDose_Loaded(null,null);
    }
    ngAfterViewInit(): void {
        this.txtDose.Focus();
        EnterTitratedDose_that = this;
      }

    EnterTitratedDose_Loaded(sender: Object, e: RoutedEventArgs): void {
        if (this.DataContext != null)
            this.oTitratedDoseVM = ObjectHelper.CreateType<TitratedDoseVM>(this.DataContext, TitratedDoseVM);
        let sDosageFormOid: string;
        let sRouteOID: string;
        let nidentifyingoid: number = 0;
        let sIdentifyingtype: string;
        if (this.oTitratedDoseVM.DosageFormOID > 0)
            sDosageFormOid = this.oTitratedDoseVM.DosageFormOID.ToString();
        else sDosageFormOid = String.Empty;
        if (this.oTitratedDoseVM.RouteOID > 0) {
            sRouteOID = this.oTitratedDoseVM.RouteOID.ToString();
        }
        else {
            sRouteOID = this.oTitratedDoseVM.RouteOIDs;
        }
        if (String.Compare(this.oTitratedDoseVM.SItemsubtype, CConstants.ItemSubType, StringComparison.InvariantCultureIgnoreCase) == 0) {
            nidentifyingoid = this.oTitratedDoseVM.PrescriptionItemOID;
            sIdentifyingtype = "ENTERTITRATED";
        }
        else {
            nidentifyingoid = this.oTitratedDoseVM.IdentifyingOID;
            sIdentifyingtype = this.oTitratedDoseVM.IdentifyingType;
        }
        const enumValue = FormDefaults.DOSEUOM;
        const enumString = FormDefaults[enumValue];
        this.oTitratedDoseVM.GetFormDefaults(nidentifyingoid, sIdentifyingtype, sRouteOID, sDosageFormOid, this.oTitratedDoseVM.MCVersion, enumString);
        if (String.Compare(this.oTitratedDoseVM.SlotDose, "TBD", StringComparison.CurrentCultureIgnoreCase) == 0) {
            this.SetEnable(false);
            this.lblUoM.Mandatory = false;
        }
        this.Drugname = this.oTitratedDoseVM.ObsDrugname;
    }
    public cmdOk_Click(): boolean {
        if (this.CheckMandatory()) {
            let oDoseSchedule: DoseSchedule = new DoseSchedule();
            oDoseSchedule.PrescriptionItemScheduleOID = this.oTitratedDoseVM.PrescriptionItemScheduleOID;
            oDoseSchedule.Dose = this.oTitratedDoseVM.Dose;
            oDoseSchedule.DoseUOM = (this.oTitratedDoseVM.DoseUOM != null) ? this.oTitratedDoseVM.DoseUOM.DisplayText : String.Empty;
            oDoseSchedule.DoseUOMOID = (this.oTitratedDoseVM.DoseUOM != null) ? Convert.ToInt64(this.oTitratedDoseVM.DoseUOM.Value) : 0;
            ;
            oDoseSchedule.PrescriptionItemOID = this.oTitratedDoseVM.PrescriptionItemOID;
            oDoseSchedule.ScheduledDTTM = this.oTitratedDoseVM.TritdatedSlotData.ScheduleDTTM;
            this.oTitratedDoseVM.EnterTitratedDose(oDoseSchedule);
            return true;
        }
        else return false;
    }
    public CheckMandatory(): boolean {
        let bResult: boolean = true;
        let oiMessageBox: iMessageBox = new iMessageBox();
        oiMessageBox.Closed = (s, e) => { this.oiMessageBox_Closed(s, e); };
        oiMessageBox.Title = "Lorenzo";
        oiMessageBox.IconType = MessageBoxType.Information;
        oiMessageBox.sender = oiMessageBox;
        if (String.Compare(this.oTitratedDoseVM.Dose, "TBD", StringComparison.CurrentCultureIgnoreCase) != 0) {
            let iDoseValue: number = 0;
            let isDoseValueZero: boolean = Double.TryParse(this.oTitratedDoseVM.Dose, (o) => {iDoseValue = o;});
            if (iDoseValue > 0) {
                let sDoseInd: string = this.oTitratedDoseVM.Dose;
                let iNew: number = sDoseInd.IndexOf('.');
                if (iNew == -1) {
                    if (sDoseInd.length > 7) {
                        oiMessageBox.Message = Resource.EnterTitratedDose.ErrMsg_Dose;
                        oiMessageBox.Tag = EnterTitratedDose.CONTS_DOSE;
                        oiMessageBox.MessageButton = MessageBoxButton.OK;
                        oiMessageBox.Show();
                        return false;
                    }
                }
            }
            else {
                if (String.IsNullOrEmpty(this.oTitratedDoseVM.Dose) || isDoseValueZero) {
                    oiMessageBox.Message = Resource.EnterTitratedDose.ErrMsg_Dose;
                    oiMessageBox.Tag = EnterTitratedDose.CONTS_DOSE;
                    oiMessageBox.MessageButton = MessageBoxButton.OK;
                    oiMessageBox.Show();
                    return false;
                }
                else {
                    oiMessageBox.Message = Resource.EnterTitratedDose.ErrMsg_DoseProper;
                    oiMessageBox.Tag = EnterTitratedDose.CONTS_DOSE;
                    oiMessageBox.MessageButton = MessageBoxButton.OK;
                    oiMessageBox.Show();
                    return false;
                }
            }
            if (this.oTitratedDoseVM.DoseUOM == null) {
                oiMessageBox.Message = Resource.EnterTitratedDose.ErrMsg_DoseUoM;
                oiMessageBox.Tag = EnterTitratedDose.CONTS_DOSEUOM;
                oiMessageBox.MessageButton = MessageBoxButton.OK;
                oiMessageBox.Show();
                return false;
            }
        }
        else {
            let oDefValue: CListItem = null;
            this.oTitratedDoseVM.DoseUOM = oDefValue;
        }
        return bResult;
    }
    oiMessageBox_Closed(sender: Object, e: EventArgs): void {
        let oiMessageBox: iMessageBox = ObjectHelper.CreateType<iMessageBox>(sender, iMessageBox);
        if (oiMessageBox != null) {
            switch (oiMessageBox.Tag.ToString()) {
                case EnterTitratedDose.CONTS_DOSE:
                    this.txtDose.Focus();
                    break;
                case EnterTitratedDose.CONTS_DOSEUOM:
                    this.cboUoM.Focus();
                    break;
            }
        }
    }
    public SetEnable(bEnable: boolean): void {
        this.cboUoM.IsEnabled = bEnable;
    }
    txtDose_KeyUp_Func = (s, e) => {
        Object.keys(EnterTitratedDose_that).forEach((prop) => (this[prop] = EnterTitratedDose_that[prop]));
        this.txtDose_KeyUp(s, e)
    }
    
    public txtDose_KeyUp(sender: Object, e: KeyEventArgs): void {
        if (String.Compare(this.txtDose.Text, "TBD", StringComparison.InvariantCultureIgnoreCase) == 0) {
            this.cboUoM.SelectedIndex = -1;
            this.SetEnable(false);
            this.lblUoM.Mandatory = false;
        }
        else {
            this.SetEnable(true);
            this.lblUoM.Mandatory = true;
        }
    }
    txtDose_KeyDown_Func = (s, e) => {
        Object.keys(EnterTitratedDose_that).forEach((prop) => (this[prop] = EnterTitratedDose_that[prop]));
        this.txtDose_KeyDown(s, e)
    }
    public txtDose_KeyDown(sender: Object, e: KeyEventArgs): void {
        // let isShift: boolean = (Keyboard.Modifiers & ModifierKeys.Shift) != 0;
        if (e.Key == Key.Shift) {
            this.isShiftKeyPressed = true;
            return
        }
        let sDoselength: number = this.txtDose.Text.Length;
        if (!this.isShiftKeyPressed) {
            let s: string = this.txtDose.Text.ToString();
            let i: number = s.IndexOf('.');
            if (i >= 0) {
                if (!(e.PlatformKeyCode >= 48 && e.PlatformKeyCode <= 57) && !(e.PlatformKeyCode >= 96 && e.PlatformKeyCode <= 105)) {
                    e.Handled = true;
                }
                if (this.verifyTwoDecimalPlace(this.txtDose.Text.ToString()) == false) {
                    e.Handled = true;
                }
            }
            else if (sDoselength == 7) {
                if (e.PlatformKeyCode != 190 && e.PlatformKeyCode != 110) {
                    e.Handled = true;
                }
            }
        }
        else {
            e.Handled = true;
        }
    }
    public verifyTwoDecimalPlace(sDose: string): boolean {
        let result: boolean = false;
        let i: number = sDose.IndexOf('.');
        if (i == -1) {
            if (sDose.length <= 7) {
                result = true;
                return result;
            }
            {
                result = false;
                return result;
            }
        }
        else if (i == 0) {
            if (sDose.Substring(i).length <= 3) {
                result = true;
                return result;
            }
            else {
                result = false;
                return result;
            }
        }
        else if (i > 0) {
            if (sDose.Substring(i).length <= 3) {
                result = true;
                return result;
            }
        }
        return result;
    }
    public cmdObservationsResults_Click(): void {
        let bResult: boolean = Common.LaunchObservation(this.oTitratedDoseVM.PrescriptionItemOID,
            this.oTitratedDoseVM.IdentifyingType,
            this.oTitratedDoseVM.IdentifyingOID,
            this.oTitratedDoseVM.MCVersion, this.Drugname, this.oTitratedDoseVM.SItemsubtype, this.oTitratedDoseVM.smulticompnames, this.oTitratedDoseVM.slorenzoID);
    }
}
