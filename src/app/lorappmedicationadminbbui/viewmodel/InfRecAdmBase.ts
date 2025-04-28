import { Component, OnInit } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, Visibility, AppContextInfo, PatientContext, CListItem } from 'epma-platform/models';
import { AppDialog, Colors, EventArgs, SolidColorBrush } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { AdministrationDetail, AlertsInfo, CALaunch, CMedBarcodeScanOverrideDetail, CReqMsgRecordInfusionAdministration, CResMsgRecordInfusionAdministration, InfusionAdminDetail, InfusionBagDetail, MedicationAdministrationWSSoapClient, MedsScanProductDetails, RecordInfusionAdministrationCompletedEventArgs, SlotDetail, UOM } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { CConstants, DoseTypeCode, InfChartAlert, InfusionRecordAdminTypeCodes, InfusionTypesCode, MedicationAction, PrescriptionTypes, SlotStatus, ValueDomain } from '../utilities/CConstants';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { InfusionTypeCode } from 'src/app/product/shared/models/medcommonbbconstant';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { ChartContext, MedChartData } from '../utilities/globalvariable';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { OverrideBarcodeScan as Resource_OverrideBarcodeScan } from '../resource/OverrideBarcodeScan.Designer';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import { MedicationAdministrator } from '../resource/medicationadministrator.designer';
import { CInfusionHelper } from 'src/app/lorappmedicationcommonbb/utilities/csinfusionhelper';
import { MedsAdminChartToolTip } from '../resource/medsadmincharttooltip.designer';
import { ActivityCode, Common } from '../utilities/common';
import { ManageBarcodeHelper } from '../common/ManageBarcodeHelper';
import { AdministrationDetailVM, SlotDetailVM } from './MedicationChartVM';
import { OverrideBarcodeScanVM } from './OverrideBarcodeScanVM';
import { MedScanRecAdmVM } from './MedScanRecAdmVM';
import { Resource } from '../resource';
import { OverrideBarcodeScan as OverrideBarcodeScan } from '../child/OverrideBarcodeScan';
import { InfrecordadminVM } from './InfrecordadminVM';
import { MedsAdminDoseDiscrepancyReason } from '../child/medsadmindosediscrepancyreason';
import {iMath as Math} from 'epma-platform/mathextension';
import { InfusionChartVM } from './InfusionChartVM';
import { Call } from '@angular/compiler';
import { SLDateUtility } from 'src/app/shared/epma-platform/services/sLDateUtility.service';
var that;

export class InfRecAdmBase extends ViewModelBase  {
    public oRecAdminVM: InfrecordadminVM;
    objInfusionChartVM: InfusionChartVM;
    //public delegate void ValidationFailed(string ResourceKey, string Fieldname, params string[] ValidationMsgParams);
    public OnValidationFailed: Function;
    protected objReq: CReqMsgRecordInfusionAdministration;
    objDoseDis: MedsAdminDoseDiscrepancyReason;
    protected objVm: SlotDetailVM;
    protected PreBagVolume: number;
    VolumeInfused: number;
    protected PreBagVolumeUOM: string;
    VolumeInfusedUOM: string;
    DoseDiscrepancy: boolean = false;
    oOverrideBarcodeScan: OverrideBarcodeScan;
    public lstCMedBarcodeScanOverrideDetail: ObservableCollection<CMedBarcodeScanOverrideDetail>;
    oMedScanRecAdmVM: MedScanRecAdmVM;
    Currentdttm: DateTime;
      constructor(){
        super();
        that = this;
      }
    public ValidateForBegun(): boolean { throw new Error('not implemented'); }
    public ValidateForChangeBag(): boolean {
        return true;
    }
    public ValidateForChangeFlowRate(): boolean { throw new Error('not implemented'); }
    public ValidateForStop(): boolean {
        return true;
    }
    public ValidateForComplete(): boolean { throw new Error('not implemented'); }
    public FillRequestForBegun(): void { throw new Error('not implemented'); }
    public FillRequestForChangeBag(): void {

    }
    public FillRequestForChangeFlowRate(): void { throw new Error('not implemented'); }
    public FillRequestForStop(): void {

    }
    public FillRequestForComplete(): void { throw new Error('not implemented'); }
    public ValidateAndSubmitForm(): boolean {
        let bResult: boolean = false;
        bResult = this.ValidateForm();
        if (bResult) {
            bResult = this.ShowDoseDiscrepancy();
            if (bResult) {
                this.ValidatePatientWBScanAndSubmitRecordAdministration();
            }
        }
        return bResult;
    }
    private ValidateForm(): boolean {
        let bResult: boolean = true;
        switch (this.oRecAdminVM.InfusionAction) {
            case MedicationAction.BEGUN:
                bResult = this.ValidateForBegun();
                if (bResult) {
                    bResult = this.oRecAdminVM.CheckWarningMessages(String.Empty, MessageBoxResult.None);
                }
                break;
            case SlotStatus.DEFERADMIN:
                bResult = this.ValidateForDefer();
                break;
            case SlotStatus.NOTGIVEN:
                bResult = this.ValidateForNotGiven();
                break;
            case MedicationAction.PAUSE:
                bResult = this.ValidateForPause();
                break;
            case MedicationAction.RESUME:
                bResult = this.ValidateForResume();
                break;
            case MedicationAction.CHANGEBAG:
                bResult = this.ValidateForChangeBag();
                break;
            case MedicationAction.CHANGEFLOWRATE:
                bResult = this.ValidateForChangeFlowRate();
                break;
            case MedicationAction.STOP:
                bResult = this.ValidateForStop();
                break;
            case MedicationAction.COMPLETE:
                bResult = this.ValidateForComplete();
                break;
        }
        return bResult;
    }
    private FillRequestObject(objReq: CReqMsgRecordInfusionAdministration): void {
        if (this.oRecAdminVM.InfusionAction == SlotStatus.DEFERADMIN) {
            this.FillRequestForDefer();
        }
        else if (this.oRecAdminVM.InfusionAction == SlotStatus.NOTGIVEN) {
            this.FillRequestForNotGiven();
        }
        else if (this.oRecAdminVM.InfusionAction == MedicationAction.BEGUN) {
            this.FillRequestForBegun();
        }
        else if (this.oRecAdminVM.InfusionAction == MedicationAction.PAUSE) {
            this.FillRequestForPause();
        }
        else if (this.oRecAdminVM.InfusionAction == MedicationAction.RESUME) {
            this.FillRequestForResume();
        }
        else if (this.oRecAdminVM.InfusionAction == MedicationAction.CHANGEBAG) {
            this.FillRequestForChangeBag();
        }
        else if (this.oRecAdminVM.InfusionAction == MedicationAction.CHANGEFLOWRATE) {
            this.FillRequestForChangeFlowRate();
        }
        else if (this.oRecAdminVM.InfusionAction == MedicationAction.STOP) {
            this.FillRequestForStop();
        }
        else if (this.oRecAdminVM.InfusionAction == MedicationAction.COMPLETE) {
            this.FillRequestForComplete();
        }
        this.FillRecalculateEstCompletionTime();
    }
    ValidateScanRecordAdminDose(): boolean {
        let objiMessageBox: iMessageBox = new iMessageBox();
        objiMessageBox.Closed = (s, e) => { this.objiMessageBox_Closed(s, e); };
        return true;
    }
    objiMessageBox_Closed(sender: Object, e: EventArgs): void {

    }
    protected RaisedValidationFailed(ResourceKey: string, Fieldname: string, ...ValidationMsgParams: string[]): void {
        if (this.OnValidationFailed != null) {
            this.oRecAdminVM.IsSubmitInProgress = false;
            Busyindicator.SetStatusIdle("InfRecAdminSubmit");
            this.OnValidationFailed(ResourceKey, Fieldname, ValidationMsgParams);
        }
    }
    public ValidateInfusionRate(): boolean {
        let dInfuedRate: number = 0.0;
        if (this.oRecAdminVM.IsMandatoryInfusionrate && String.IsNullOrEmpty(this.oRecAdminVM.InfusionRate)) {
            this.RaisedValidationFailed("InfRecErrMsg_InfusionRate", "txtinfusionrate", null);
            return false;
        }
        else if (!String.IsNullOrEmpty(this.oRecAdminVM.InfusionRate) && (Number.TryParse(this.oRecAdminVM.InfusionRate, (o) => { dInfuedRate = o; }) && dInfuedRate <= 0)) {
            this.RaisedValidationFailed("InfRecErrMsg_InfusionRateValue", "txtinfusionrate", null);
            return false;
        }
        else if (this.oRecAdminVM.IsMandatoryInfusionrate && ((this.oRecAdminVM.InfusionRateUOMNumerator == null || this.oRecAdminVM.InfusionRateUOMDenominator == null) || ((this.oRecAdminVM.InfusionRateUOMNumerator != null && String.IsNullOrEmpty(this.oRecAdminVM.InfusionRateUOMNumerator.Value)) || (this.oRecAdminVM.InfusionRateUOMDenominator != null && String.IsNullOrEmpty(this.oRecAdminVM.InfusionRateUOMDenominator.Value))))) {
            this.RaisedValidationFailed("InfRecErrMsg_InfusionRateUOM", "txtinfusionrate", null);
            return false;
        }
        return true;
    }
    public ValidationInfusionPeriod(): boolean {
        if ((String.IsNullOrEmpty(this.oRecAdminVM.InfusionPeriodMedAdmin) || String.Compare(this.oRecAdminVM.InfusionPeriodMedAdmin, "0") == 0) && this.oRecAdminVM.InfusionPeriodMedAdminUOM != null) {
            this.RaisedValidationFailed("InfRecErrMsg_InfusionPeriod", "Infusionperiodtext", null);
            return false;
        }
        else if (!String.IsNullOrEmpty(this.oRecAdminVM.InfusionPeriodMedAdmin) && (this.oRecAdminVM.InfusionPeriodMedAdminUOM == null || String.IsNullOrEmpty(this.oRecAdminVM.InfusionPeriodMedAdminUOM.Value))) {
            this.RaisedValidationFailed("InfRecErrMsg_InfusionPeriodUOM", "cboInfusionperiodUoMValue", null);
            return false;
        }
        return true;
    }
    public ValidateBagVolume(): boolean {
        let dInfuedRate: number = 0.0;
        if (String.IsNullOrEmpty(this.oRecAdminVM.BagVolume)) {
            this.RaisedValidationFailed("InfRecMandMsg_BagVolume", "bagvolumetext", null);
            return false;
        }
        else if (!String.IsNullOrEmpty(this.oRecAdminVM.BagVolume) && (Number.TryParse(this.oRecAdminVM.BagVolume, (o) => { dInfuedRate = o; }) && dInfuedRate <= 0)) {
            this.RaisedValidationFailed("InfRecErrMsg_BagVolume", "bagvolumetext", null);
            return false;
        }
        else if (this.oRecAdminVM.BagVolumeUOM == null || (this.oRecAdminVM.BagVolumeUOM != null && String.IsNullOrEmpty(this.oRecAdminVM.BagVolumeUOM.Value))) {
            this.RaisedValidationFailed("InfRecMandMsg_BagVolUom", "cboDoseUoMValue", null);
            return false;
        }
        return true;
    }
    public ValidationAdministeredBy(): boolean {
        if (String.IsNullOrEmpty(this.oRecAdminVM.AdministeredByOID)) {
            this.RaisedValidationFailed("InfRecMandMsg_AdminBy", "sfsAdministeredby", null);
            return false;
        }
        return true;
    }
    public ValidationWitnessMandatory(): boolean {
        if (this.oRecAdminVM.WitnessMandatory && (String.IsNullOrEmpty(this.oRecAdminVM.WitnessBy))) {
            this.RaisedValidationFailed("InfRecMandMsg_witnesBy", "sfsWitnessedby", null);
            return false;
        }
        return true;
    }
    public ValidationVolumeInfused(): boolean {
        let dInfuedRate: number = 0.0;
        if (String.IsNullOrEmpty(this.oRecAdminVM.VolumeInfused)) {
            this.RaisedValidationFailed("InfRecMandMsg_InfVol", "txtvolumeinfused1", null);
            return false;
        }
        else if (!String.IsNullOrEmpty(this.oRecAdminVM.VolumeInfused) && (Number.TryParse(this.oRecAdminVM.VolumeInfused, (o) => { dInfuedRate = o; }) && dInfuedRate <= 0)) {
            this.RaisedValidationFailed("InfRecErrMsg_InfVolume", "txtvolumeinfused1", null);
            return false;
        }
        else if (this.oRecAdminVM.VolumeInfusedUOM == null || (this.oRecAdminVM.VolumeInfusedUOM != null && String.IsNullOrEmpty(this.oRecAdminVM.VolumeInfusedUOM.Value))) {
            this.RaisedValidationFailed("InfRecMandMsg_InfVolUOM", "cboUoM1", null);
            return false;
        }
        else if (!this.oRecAdminVM.IsNextBagEnabled) {
            this.oRecAdminVM.IsVisibleVolumeExceedsPrescriptionVolumeAlert = Visibility.Visible;
            this.oRecAdminVM.IsSubmitInProgress = false;
            Busyindicator.SetStatusIdle("InfRecAdminSubmit");
            return false;
        }
        return true;
    }
    public ValidateForVolumeInfusedCompleteness(): boolean {
        let dInfuedRate: number = 0.0;
        if (this.oRecAdminVM.IsVolumeMadatory && (String.IsNullOrEmpty(this.oRecAdminVM.VolumeInfused) || this.oRecAdminVM.VolumeInfusedUOM == null)) {
            this.RaisedValidationFailed("InfRecMandMsg_InfVol", "txtvolumeinfused1", null);
            return false;
        }
        else if (String.IsNullOrEmpty(this.oRecAdminVM.VolumeInfused) && this.oRecAdminVM.VolumeInfusedUOM != null) {
            this.RaisedValidationFailed("InfRecMandMsg_InfVol", "txtvolumeinfused1", null);
            return false;
        }
        else if (!String.IsNullOrEmpty(this.oRecAdminVM.VolumeInfused) && (Number.TryParse(this.oRecAdminVM.VolumeInfused, (o) => { dInfuedRate = o; }) && dInfuedRate <= 0)) {
            this.RaisedValidationFailed("InfRecErrMsg_InfVolume", "txtvolumeinfused1", null);
            return false;
        }
        else if (!String.IsNullOrEmpty(this.oRecAdminVM.VolumeInfused) && this.oRecAdminVM.VolumeInfusedUOM == null) {
            this.RaisedValidationFailed("InfRecMandMsg_InfVolUOM", "cbovolUOM", null);
            return false;
        }
        return true;
    }
    public ValidateForInfusedvolume(): boolean {
        if (this.ConvertToLeastUOM() && this.VolumeInfused > this.PreBagVolume) {
            this.RaisedValidationFailed("InfRecMsg_VolumeInfused", "txtvolumeinfused1", null);
            return false;
        }
        return true;
    }
    public ValidationConcentrationAllFieldsAvailable(): boolean {
        let _AtLeastOneValueAvailable: boolean = false, _AtLeastOneValueNotAvailable = false;
        if ((!String.IsNullOrEmpty(this.oRecAdminVM.ConcentrationStrength) && !String.Equals(this.oRecAdminVM.ConcentrationStrength, "0")) || (this.oRecAdminVM.ConcentrationStrengthUOM != null && !String.IsNullOrEmpty(this.oRecAdminVM.ConcentrationStrengthUOM.Value)) || (!String.IsNullOrEmpty(this.oRecAdminVM.ConcentrationVolume) && !String.Equals(this.oRecAdminVM.ConcentrationVolume, "0")) || (this.oRecAdminVM.ConcentrationVolumeUOM != null && !String.IsNullOrEmpty(this.oRecAdminVM.ConcentrationVolumeUOM.Value)))
            _AtLeastOneValueAvailable = true;
        if ((String.IsNullOrEmpty(this.oRecAdminVM.ConcentrationStrength)) || (!String.IsNullOrEmpty(this.oRecAdminVM.ConcentrationStrength) && String.Equals(this.oRecAdminVM.ConcentrationStrength, "0")) || this.oRecAdminVM.ConcentrationStrengthUOM == null || (this.oRecAdminVM.ConcentrationStrengthUOM != null && String.IsNullOrEmpty(this.oRecAdminVM.ConcentrationStrengthUOM.Value)) || (String.IsNullOrEmpty(this.oRecAdminVM.ConcentrationVolume)) || (!String.IsNullOrEmpty(this.oRecAdminVM.ConcentrationVolume) && String.Equals(this.oRecAdminVM.ConcentrationVolume, "0")) || this.oRecAdminVM.ConcentrationVolumeUOM == null || (this.oRecAdminVM.ConcentrationVolumeUOM != null && String.IsNullOrEmpty(this.oRecAdminVM.ConcentrationVolumeUOM.Value)))
            _AtLeastOneValueNotAvailable = true;
        if (_AtLeastOneValueAvailable && _AtLeastOneValueNotAvailable) {
            this.RaisedValidationFailed("InfRecMsg_EnterAllConcentrationFields", "txtConStrengthValue", null);
            return false;
        }
        return true;
    }
    public ValidateDoseInfRate(): boolean {
        if (String.Compare(this.oRecAdminVM.InfusionType.Value, InfusionTypeCode.CONTINUOUS) == 0 && String.Compare(this.oRecAdminVM.DoseType, DoseTypeCode.CONDITIONAL) == 0) {
            if (String.IsNullOrEmpty(this.oRecAdminVM.InfusionRate) || (this.oRecAdminVM.InfusionRateUOMNumerator == null) || (this.oRecAdminVM.InfusionRateUOMNumerator != null && String.IsNullOrEmpty(this.oRecAdminVM.InfusionRateUOMNumerator.Value)) || (this.oRecAdminVM.InfusionRateUOMDenominator == null) || (this.oRecAdminVM.InfusionRateUOMDenominator != null && String.IsNullOrEmpty(this.oRecAdminVM.InfusionRateUOMDenominator.Value))) {
                this.RaisedValidationFailed("DoseOrInfRate_EmptyMsg", "txtDoseValue", null);
                return false;
            }
        }
        else if (String.Compare(this.oRecAdminVM.InfusionType.Value, InfusionTypeCode.INTERMITTENT) == 0 && String.Compare(this.oRecAdminVM.DoseType, DoseTypeCode.CONDITIONAL) == 0) {
            if ((String.IsNullOrEmpty(this.oRecAdminVM.Dose) || this.oRecAdminVM.DoseUOMOID == 0) || (String.IsNullOrEmpty(this.oRecAdminVM.InfusionRate) || (this.oRecAdminVM.InfusionRateUOMNumerator == null) || (this.oRecAdminVM.InfusionRateUOMNumerator != null && String.IsNullOrEmpty(this.oRecAdminVM.InfusionRateUOMNumerator.Value)) || (this.oRecAdminVM.InfusionRateUOMDenominator == null) || (this.oRecAdminVM.InfusionRateUOMDenominator != null && String.IsNullOrEmpty(this.oRecAdminVM.InfusionRateUOMDenominator.Value)))) {
                this.RaisedValidationFailed("DoseOrInfRate_EmptyMsg", "txtDoseValue", null);
                return false;
            }
        }
        return true;
    }
    public validateForStartAdminTime(AdministeredDate: DateTime, AdministeredDateTime: DateTime): boolean {
        let oGivenDTTM: DateTime = AdministeredDate.DateTime.AddHours(AdministeredDateTime.Hour).AddMinutes(AdministeredDateTime.Minute);
        if (this.oRecAdminVM.IsPRN && this.oRecAdminVM.IsRetrospective) {
            if (this.oRecAdminVM.InfusionPastAction != null && this.StartTimeValidation(AdministeredDate, AdministeredDateTime) || DateTime.LessThan(oGivenDTTM , this.oRecAdminVM.PrescriptionStartDate) || DateTime.GreaterThanOrEqualTo(oGivenDTTM , this.oRecAdminVM.Currentdttm)) {
                this.RaisedValidationFailed("InfRecMsg_BegunEndtimeoverlap", "timeDateTimeGivenText", null);
                return false;
            }
            if (DateTime.NotEquals(this.oRecAdminVM.PrescriptionEndDate , DateTime.MinValue) && ((String.Compare(this.oRecAdminVM.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase) == 0 || DateTime.LessThanOrEqualTo(this.oRecAdminVM.PrescriptionEndDate , this.oRecAdminVM.Currentdttm) && DateTime.GreaterThanOrEqualTo(oGivenDTTM , this.oRecAdminVM.PrescriptionEndDate)))) {
                this.RaisedValidationFailed("InfRecMsg_BegunENDDateTime", "timeDateTimeGivenText", null);
                return false;
            }
        }
        return true;
    }
    public validateForEndAdminTime(AdministeredDate: DateTime, AdministeredDateTime: DateTime): boolean {
        let oENDDTTM: DateTime = AdministeredDate.DateTime.AddHours(AdministeredDateTime.Hour).AddMinutes(AdministeredDateTime.Minute);
        if ((this.oRecAdminVM.IsPRN || String.Equals(this.oRecAdminVM.InfusionType.Value, InfusionTypesCode.INTERMITTENT, StringComparison.OrdinalIgnoreCase)) && this.oRecAdminVM.IsRetrospective)
            if (this.oRecAdminVM.InfusionPastAction != null && !this.EndTimeValidation(AdministeredDate, AdministeredDateTime)) {
                this.RaisedValidationFailed("InfRecMsg_BegunEndtimeoverlap", "iTimedendTime", null);
                return false;
            }
        return true;
    }
    public ValidateForPrescDTTM(FieldName: string): boolean {
        if (DateTime.NotEquals(this.oRecAdminVM.ValidStartDTTM , DateTime.MinValue) && DateTime.NotEquals(this.oRecAdminVM.AdministeredDateTime , DateTime.MinValue) && DateTime.LessThan(this.oRecAdminVM.AdministeredDateTime , this.oRecAdminVM.ValidStartDTTM)) {
            this.RaisedValidationFailed("InfRecMsg_BegunDateTime", FieldName, null);
            return false;
        }
        else if (!this.ValidateForCurrentDTTM(FieldName, this.oRecAdminVM.AdministeredDateTime))
            return false;
        return true;
    }
    public ValidateForCurrentDTTM(FieldName: string, GivenDTTM: DateTime): boolean {
        let _CurrentDTTM: DateTime = SLDateUtility.GetLocalServerDateTime();
        this.Currentdttm = new DateTime(_CurrentDTTM.Year, _CurrentDTTM.Month, _CurrentDTTM.Day, _CurrentDTTM.Hour, _CurrentDTTM.Minute, 0);
        if (DateTime.NotEquals(this.Currentdttm , DateTime.MinValue) && DateTime.NotEquals(GivenDTTM , DateTime.MinValue) && (DateTime.GreaterThan(GivenDTTM , this.Currentdttm))) {
            this.RaisedValidationFailed("InfRecMsg_FurtureDateTime", FieldName, null);
            return false;
        }
        return true;
    }
    public ValidateForLastDTTM(FieldName: string, GivenDTTM: DateTime, ResoureName: string): boolean {
        if (DateTime.NotEquals(this.oRecAdminVM.LastActionDateTime , DateTime.MinValue) && DateTime.NotEquals(this.oRecAdminVM.Currentdttm , DateTime.MinValue) && (DateTime.LessThan(GivenDTTM , this.oRecAdminVM.LastActionDateTime))) {
            this.RaisedValidationFailed(ResoureName, FieldName, null);
            return false;
        }
        else if ((this.oRecAdminVM.IsRetrospective && (DateTime.NotEquals(this.oRecAdminVM.AdministeredDateTime , DateTime.MinValue) && DateTime.NotEquals(this.oRecAdminVM.Currentdttm , DateTime.MinValue) && (DateTime.LessThan(GivenDTTM , this.oRecAdminVM.AdministeredDateTime))))) {
            this.RaisedValidationFailed(ResoureName, FieldName, null);
            return false;
        }
        else if (!this.ValidateForCurrentDTTM(FieldName, GivenDTTM))
            return false;
        return true;
    }
    public ValidateForNextChngBagDTTM(FieldName: string): boolean {
        if (DateTime.NotEquals(this.oRecAdminVM.EnddateTime , DateTime.MinValue) && DateTime.NotEquals(this.oRecAdminVM.AdministeredDateTime , DateTime.MinValue) && (DateTime.LessThan(this.oRecAdminVM.AdministeredDateTime , this.oRecAdminVM.EnddateTime))) {
            this.RaisedValidationFailed("InfRecMsg_ChangeBagStartDateTime", FieldName, null);
            return false;
        }
        else if (!this.ValidateForCurrentDTTM(FieldName, this.oRecAdminVM.AdministeredDateTime))
            return false;
        return true;
    }
    public ValidateConcentrationRatio(): boolean {
        if (String.Equals(this.oRecAdminVM.InfusionType.Value, InfusionTypeCode.SINGLEDOSEVOLUME, StringComparison.InvariantCultureIgnoreCase)) {
            if (!String.IsNullOrEmpty(this.oRecAdminVM.ConcentrationStrength) && this.oRecAdminVM.ConcentrationStrengthUOM != null && !String.IsNullOrEmpty(this.oRecAdminVM.ConcentrationStrengthUOM.Value) && !String.IsNullOrEmpty(this.oRecAdminVM.ConcentrationVolume) && this.oRecAdminVM.ConcentrationVolumeUOM != null && !String.IsNullOrEmpty(this.oRecAdminVM.ConcentrationVolumeUOM.Value) && !String.IsNullOrEmpty(this.oRecAdminVM.Dose) && !String.IsNullOrEmpty(this.oRecAdminVM.DoseUOMName) && !String.IsNullOrEmpty(this.oRecAdminVM.DoseUomLorenzoID) && !String.IsNullOrEmpty(this.oRecAdminVM.PresVolme) && !String.IsNullOrEmpty(this.oRecAdminVM.PresVolmeUOM)) {
                if (String.Equals(this.oRecAdminVM.ConcentrationStrengthUOM.DisplayText, this.oRecAdminVM.DoseUOMName, StringComparison.InvariantCultureIgnoreCase) && String.Equals(this.oRecAdminVM.ConcentrationVolumeUOM.DisplayText, this.oRecAdminVM.PresVolmeUOM, StringComparison.InvariantCultureIgnoreCase)) {
                    let _Dose: number = 0, _ConcenStrength = 0, _Volume = 0, _ConcenVol = 0, _DoseVolumeRatio = 0, _ConcentRatio = 0;
                    Number.TryParse(this.oRecAdminVM.ConcentrationStrength, (o) => { _ConcenStrength = o; });
                    Number.TryParse(this.oRecAdminVM.Dose, (o) => { _Dose = o; });
                    Number.TryParse(this.oRecAdminVM.ConcentrationVolume, (o) => { _ConcenVol = o; });
                    Number.TryParse(this.oRecAdminVM.PresVolme, (o) => { _Volume = o; });
                    _DoseVolumeRatio = Math.Round(_Volume / _Dose);
                    _ConcentRatio = Math.Round(_ConcenVol / _ConcenStrength);
                    if (_DoseVolumeRatio != _ConcentRatio) {
                        this.RaisedValidationFailed("ConcentrationRatio_Msg", "txtConStrengthValue", null);
                        return false;
                    }
                }
                else if (!String.Equals(this.oRecAdminVM.ConcentrationStrengthUOM.DisplayText, this.oRecAdminVM.DoseUOMName, StringComparison.InvariantCultureIgnoreCase) || !String.Equals(this.oRecAdminVM.ConcentrationVolumeUOM.DisplayText, this.oRecAdminVM.PresVolmeUOM, StringComparison.InvariantCultureIgnoreCase)) {
                    this.RaisedValidationFailed("ConcentrationRatio_Msg", "txtConStrengthValue", null);
                    return false;
                }
            }
        }
        return true;
    }
    public ValidateConcentrationAndInfrateUOMs(): boolean {
        if ((String.Equals(this.oRecAdminVM.InfusionType.Value, InfusionTypeCode.SINGLEDOSEVOLUME, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.oRecAdminVM.InfusionType.Value, InfusionTypeCode.CONTINUOUS, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.oRecAdminVM.InfusionType.Value, InfusionTypeCode.FLUID, StringComparison.InvariantCultureIgnoreCase)) && !this.oRecAdminVM.IsInfRateVolBased && !this.oRecAdminVM.bConcentrationInfRateInDoseAlert) {
            if (!String.IsNullOrEmpty(this.oRecAdminVM.ConcentrationStrength) && this.oRecAdminVM.ConcentrationStrengthUOM != null && !String.IsNullOrEmpty(this.oRecAdminVM.ConcentrationStrengthUOM.Value) && !String.IsNullOrEmpty(this.oRecAdminVM.ConcentrationVolume) && this.oRecAdminVM.ConcentrationVolumeUOM != null && !String.IsNullOrEmpty(this.oRecAdminVM.ConcentrationVolumeUOM.Value) && !String.IsNullOrEmpty(this.oRecAdminVM.InfusionDose) && !String.IsNullOrEmpty(this.oRecAdminVM.InfusionDoseUOM) && !String.IsNullOrEmpty(this.oRecAdminVM.InfusionRate) && this.oRecAdminVM.InfusionRateUOMNumerator != null && this.oRecAdminVM.InfusionRateUOMDenominator != null && !String.IsNullOrEmpty(this.oRecAdminVM.InfusionRateUOMNumerator.DisplayText) && !String.IsNullOrEmpty(this.oRecAdminVM.InfusionRateUOMDenominator.DisplayText)) {
                let sConStrength: string = this.oRecAdminVM.ConcentrationStrengthUOM.DisplayText;
                let sConVolume: string = this.oRecAdminVM.ConcentrationVolumeUOM.DisplayText;
                let sInfRateDoseUOM: string = String.Empty;
                let sInfRateDosePerUOM: string = String.Empty;
                let sInfDose: string[] = this.oRecAdminVM.InfusionDoseUOM.Split('/');
                if (sInfDose != null) {
                    if (sInfDose.length == 2) {
                        sInfRateDoseUOM = sInfDose[0];
                        sInfRateDosePerUOM = sInfDose[1];
                    }
                    else if (sInfDose.length == 3) {
                        sInfRateDoseUOM = sInfDose[0] + "/" + sInfDose[1];
                        sInfRateDosePerUOM = sInfDose[2];
                    }
                }
                let dTempInfConcentration: number = 0.0;
                let dTempInfStrength: number = 0.0;
                let dTempInfDose: number = 0.0;
                let dEstiInfRateInVolume: number = 0.0;
                let sEstiInfRateInVolumeUOM: string = String.Empty;
                let sEstiInfRateInVolumePerUOM: string = String.Empty;
                let sConStrengthBaseUOM: string = String.Empty;
                let sInfRateDoseBaseUOM: string = String.Empty;
                if (String.Equals(sConStrength, sInfRateDoseUOM, StringComparison.InvariantCultureIgnoreCase)) {
                    dTempInfConcentration = Math.Round(Convert.ToDouble(this.oRecAdminVM.ConcentrationStrength) / Convert.ToDouble(this.oRecAdminVM.ConcentrationVolume), 2);
                     if(this.oRecAdminVM.InfusionDose !== undefined && this.oRecAdminVM.InfusionDose != '0' ){
                    dTempInfDose = Math.Round(Convert.ToDouble(this.oRecAdminVM.InfusionDose), 2);}
                }
                else if (!String.Equals(sConStrength, sInfRateDoseUOM, StringComparison.InvariantCultureIgnoreCase)) {
                    this.ConvertToLeastInfUOM(sConStrength, Convert.ToDouble(this.oRecAdminVM.ConcentrationStrength), dTempInfStrength, sConStrengthBaseUOM);
                    this.ConvertToLeastInfUOM(sInfRateDoseUOM, Convert.ToDouble(this.oRecAdminVM.ConcentrationStrength), dTempInfDose, sInfRateDoseBaseUOM);
                    if ((String.IsNullOrEmpty(sConStrengthBaseUOM) || String.IsNullOrEmpty(sInfRateDoseBaseUOM)) || (!String.IsNullOrEmpty(sConStrengthBaseUOM) && !String.IsNullOrEmpty(sInfRateDoseBaseUOM) && !String.Equals(sConStrengthBaseUOM, sInfRateDoseBaseUOM, StringComparison.InvariantCultureIgnoreCase))) {
                        this.RaisedValidationFailed("Concentration_InfRateMismatch_Msg", "txtAdminComments", null);
                        this.oRecAdminVM.IsClinicalRSNMand = true;
                        this.oRecAdminVM.bConcentrationInfRateInDoseAlert = true;
                        return false;
                    }
                    dTempInfConcentration = Math.Round(dTempInfStrength / Convert.ToDouble(this.oRecAdminVM.ConcentrationVolume), 2);
                }
                if (dTempInfDose > 0 && dTempInfConcentration > 0 && !String.IsNullOrEmpty(sInfRateDoseUOM) && !String.IsNullOrEmpty(sInfRateDosePerUOM)) {
                    let dTempInfRateInVolume: number = 0.0;
                    dTempInfRateInVolume = dTempInfDose / dTempInfConcentration;
                    if (!String.Equals(this.oRecAdminVM.InfusionRateUOMDenominator.DisplayText, sInfRateDosePerUOM, StringComparison.InvariantCultureIgnoreCase)) {
                        if (String.Equals(sInfRateDosePerUOM, "hour", StringComparison.InvariantCultureIgnoreCase) && String.Equals(this.oRecAdminVM.InfusionRateUOMDenominator.DisplayText, "minute", StringComparison.InvariantCultureIgnoreCase)) {
                            dTempInfRateInVolume = dTempInfRateInVolume / 60;
                        }
                        else if (String.Equals(sInfRateDosePerUOM, "minute", StringComparison.InvariantCultureIgnoreCase) && String.Equals(this.oRecAdminVM.InfusionRateUOMDenominator.DisplayText, "hour", StringComparison.InvariantCultureIgnoreCase)) {
                            dTempInfRateInVolume = dTempInfRateInVolume * 60;
                        }
                    }
                    dEstiInfRateInVolume = Math.Round(Convert.ToDouble(dTempInfRateInVolume), 2);
                }
                if (dEstiInfRateInVolume != 0.0 && !String.IsNullOrEmpty(this.oRecAdminVM.InfusionRate)) {
                    let dActualInfRate: number = 0.0;
                    Number.TryParse(this.oRecAdminVM.InfusionRate, (o) => { dActualInfRate = o; });
                    if (dEstiInfRateInVolume != dActualInfRate) {
                        this.RaisedValidationFailed("Concentration_InfRateMismatch_Msg", "txtAdminComments", null);
                        this.oRecAdminVM.IsClinicalRSNMand = true;
                        this.oRecAdminVM.bConcentrationInfRateInDoseAlert = true;
                        return false;
                    }
                }
            }
        }
        return true;
    }
    public ConvertToLeastInfUOM(sUOM: string, sValue: number, sBaseValue: number, sBaseUOM: string): void {
        sBaseValue = 0.0;
        sBaseUOM = String.Empty;
        if (String.Equals(sUOM, "mg Calcium (OBSOLETE)", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "pound", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "kg", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "mg", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "mg Iodine (OBSOLETE)", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "mg MCHC (OBSOLETE)", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "microgram", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "nanogram", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "g", StringComparison.InvariantCultureIgnoreCase)) {
            sBaseUOM = "mg";
            if (String.Equals(sUOM, "mg Calcium (OBSOLETE)", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "mg", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "mg Iodine (OBSOLETE)", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "mg MCHC (OBSOLETE)", StringComparison.InvariantCultureIgnoreCase)) {
                sBaseValue = sValue;
            }
            else if (String.Equals(sUOM, "pound", StringComparison.InvariantCultureIgnoreCase)) {
                sBaseValue = sValue * 453592;
            }
            else if (String.Equals(sUOM, "kg", StringComparison.InvariantCultureIgnoreCase)) {
                sBaseValue = sValue * 1000000;
            }
            else if (String.Equals(sUOM, "microgram", StringComparison.InvariantCultureIgnoreCase)) {
                sBaseValue = sValue * 0.001;
            }
            else if (String.Equals(sUOM, "nanogram", StringComparison.InvariantCultureIgnoreCase)) {
                sBaseValue = sValue * 0.000001;
            }
            else if (String.Equals(sUOM, "g", StringComparison.InvariantCultureIgnoreCase)) {
                sBaseValue = sValue * 1000;
            }
        }
        else if (String.Equals(sUOM, "cell", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "million cells", StringComparison.InvariantCultureIgnoreCase)) {
            sBaseUOM = "cell";
            if (String.Equals(sUOM, "cell", StringComparison.InvariantCultureIgnoreCase)) {
                sBaseValue = sValue;
            }
            else if (String.Equals(sUOM, "million cells", StringComparison.InvariantCultureIgnoreCase)) {
                sBaseValue = sValue * 1000000;
            }
        }
        else if (String.Equals(sUOM, "micromol", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "mmol", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "mmol Calcium (OBSOLETE)", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "mmol Magnesium (OBSOLETE)", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "mmol Phosphate (OBSOLETE)", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "mmol Potassium Chloride (OBSOLETE)", StringComparison.InvariantCultureIgnoreCase)) {
            sBaseUOM = "mmol";
            if (String.Equals(sUOM, "mmol", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "mmol Calcium (OBSOLETE)", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "mmol Magnesium (OBSOLETE)", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "mmol Phosphate (OBSOLETE)", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "mmol Potassium Chloride (OBSOLETE)", StringComparison.InvariantCultureIgnoreCase)) {
                sBaseValue = sValue;
            }
            else if (String.Equals(sUOM, "micromol", StringComparison.InvariantCultureIgnoreCase)) {
                sBaseValue = sValue * .001;
            }
        }
        else if (String.Equals(sUOM, "i.u. (OBSOLETE)", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "Kallikrein inactivator unit (OBSOLETE)", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "million units", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "unit", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "USP unit (OBSOLETE)", StringComparison.InvariantCultureIgnoreCase)) {
            sBaseUOM = "unit";
            if (String.Equals(sUOM, "i.u. (OBSOLETE)", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "Kallikrein inactivator unit (OBSOLETE)", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "unit", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "USP unit (OBSOLETE)", StringComparison.InvariantCultureIgnoreCase)) {
                sBaseValue = sValue;
            }
            else if (String.Equals(sUOM, "million units", StringComparison.InvariantCultureIgnoreCase)) {
                sBaseValue = sValue * 1000000;
            }
        }
        else if (String.Equals(sUOM, "m2", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "cm2", StringComparison.InvariantCultureIgnoreCase)) {
            sBaseUOM = "m2";
            if (String.Equals(sUOM, "m2", StringComparison.InvariantCultureIgnoreCase)) {
                sBaseValue = sValue;
            }
            else if (String.Equals(sUOM, "cm2", StringComparison.InvariantCultureIgnoreCase)) {
                sBaseValue = sValue * .0001;
            }
        }
        else if (String.Equals(sUOM, "metre", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "cm", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "inch", StringComparison.InvariantCultureIgnoreCase)) {
            sBaseUOM = "metre";
            if (String.Equals(sUOM, "metre", StringComparison.InvariantCultureIgnoreCase)) {
                sBaseValue = sValue;
            }
            else if (String.Equals(sUOM, "cm", StringComparison.InvariantCultureIgnoreCase)) {
                sBaseValue = sValue * .01;
            }
            else if (String.Equals(sUOM, "inch", StringComparison.InvariantCultureIgnoreCase)) {
                sBaseValue = sValue * .0254;
            }
        }
        else if (String.Equals(sUOM, "second", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "minute", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "hour", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "day", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "week", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "month", StringComparison.InvariantCultureIgnoreCase) || String.Equals(sUOM, "year", StringComparison.InvariantCultureIgnoreCase)) {
            sBaseUOM = "second";
            if (String.Equals(sUOM, "second", StringComparison.InvariantCultureIgnoreCase)) {
                sBaseValue = sValue;
            }
            else if (String.Equals(sUOM, "minute", StringComparison.InvariantCultureIgnoreCase)) {
                sBaseValue = sValue * 60;
            }
            else if (String.Equals(sUOM, "kg", StringComparison.InvariantCultureIgnoreCase)) {
                sBaseValue = sValue * 3600;
            }
            else if (String.Equals(sUOM, "hour", StringComparison.InvariantCultureIgnoreCase)) {
                sBaseValue = sValue * 86400;
            }
            else if (String.Equals(sUOM, "day", StringComparison.InvariantCultureIgnoreCase)) {
                sBaseValue = sValue * 604800;
            }
            else if (String.Equals(sUOM, "week", StringComparison.InvariantCultureIgnoreCase)) {
                sBaseValue = sValue * 2628000;
            }
            else if (String.Equals(sUOM, "month", StringComparison.InvariantCultureIgnoreCase)) {
                sBaseValue = sValue * 0.000001;
            }
            else if (String.Equals(sUOM, "year", StringComparison.InvariantCultureIgnoreCase)) {
                sBaseValue = sValue * 31536000;
            }
        }
    }
    private ValidateForDefer(): boolean {
        if (String.Compare(this.oRecAdminVM.InfusionAction, SlotStatus.DEFERADMIN, StringComparison.CurrentCultureIgnoreCase) == 0) {
            if (this.oRecAdminVM.ReasonForNotDefer == null) {
                this.RaisedValidationFailed("InfRecMandMsg_RsnDefer", "cboreason", null);
                return false;
            }
            else if (this.oRecAdminVM.IsClinicalRSNMand && String.IsNullOrEmpty(this.oRecAdminVM.Comments)) {
                this.RaisedValidationFailed("InfRecMandMsg_Comments", "txtComments", null);
                return false;
            }
        }
        return true;
    }
    private ValidateForNotGiven(): boolean {
        if (String.Compare(this.oRecAdminVM.InfusionAction, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) == 0) {
            //revisitmeyasik
              if (this.oRecAdminVM.ReasonNotGiven == null) {
            // if (this.oRecAdminVM.ReasonForNotDefer == null) {
                this.RaisedValidationFailed("InfRecMandMsg_RsnNotgvn", "cboreason", null);
                return false;
            }
            else if (this.oRecAdminVM.IsClinicalRSNMand && String.IsNullOrEmpty(this.oRecAdminVM.Comments)) {
                this.RaisedValidationFailed("InfRecMandMsg_Comments", "txtComments", null);
                return false;
            }
        }
        return true;
    }
    private ValidateForPause(): boolean {
        if (String.Compare(this.oRecAdminVM.InfusionAction, MedicationAction.PAUSE, StringComparison.CurrentCultureIgnoreCase) == 0) {
            if (DateTime.Equals(this.oRecAdminVM.AdministeredDate.Date , DateTime.MinValue)) {
                this.RaisedValidationFailed("InfRecMandMsg_PausDate", "dtpDate", null);
                return false;
            }
            else if (!this.ValidateForLastDTTM("idatetime", this.oRecAdminVM.AdministeredDateTime, "InfRecMsg_PauseDateTime"))
                return false;
            //revisitmeyasik
              else if (this.oRecAdminVM.ReasonforPause == null) {
            // else if (this.oRecAdminVM.ReasonForNotDefer == null) {
                this.RaisedValidationFailed("InfRecMandMsg_RsnPause", "cboreason", null);
                return false;
            }
            else if (this.oRecAdminVM.IsClinicalRSNMand && String.IsNullOrEmpty(this.oRecAdminVM.Comments)) {
                this.RaisedValidationFailed("InfRecMandMsg_Comments", "txtComments", null);
                return false;
            }
        }
        return true;
    }
    private ValidateForResume(): boolean {
        if (String.Compare(this.oRecAdminVM.InfusionAction, MedicationAction.RESUME, StringComparison.CurrentCultureIgnoreCase) == 0 && DateTime.Equals(this.oRecAdminVM.AdministeredDate.Date , DateTime.MinValue)) {
            this.RaisedValidationFailed("InfRecMandMsg_RsnResum", "dtpDate", null);
            return false;
        }
        else if (!this.ValidateForLastDTTM("idatetime", this.oRecAdminVM.AdministeredDateTime, "InfRecMsg_ResumeDateTime"))
            return false;
        else if (this.oRecAdminVM.IsClinicalRSNMand && String.IsNullOrEmpty(this.oRecAdminVM.Comments)) {
            this.RaisedValidationFailed("InfRecMandMsg_Comments", "txtComments", null);
            return false;
        }
        else if (this.oRecAdminVM.SelectedRoute == null || (String.IsNullOrEmpty(this.oRecAdminVM.SelectedRoute.DisplayText) && String.IsNullOrEmpty(this.oRecAdminVM.SelectedRoute.Value))) {
            this.RaisedValidationFailed("InfRecMandMsg_Route", "cboRoute", null);
            return false;
        }
        else if (!String.Equals(this.oRecAdminVM.ItemSubType, InfusionTypesCode.SUBTYPE_GAS)) {
            if (!this.ValidationConcentrationAllFieldsAvailable())
                return false;
            if (!this.ValidateInfusionRate())
                return false;
        }
        return true;
    }
    private FillRequestForDefer(): void {
        if (this.oRecAdminVM.InfusionAction != null && String.Compare(this.oRecAdminVM.InfusionAction, SlotStatus.DEFERADMIN, StringComparison.InvariantCultureIgnoreCase) == 0) {
            this.objReq.objSlotDetailBC = new SlotDetail();
            this.objReq.objSlotDetailBC.AdministrationDetail = new AdministrationDetail();
            this.objReq.objSlotDetailBC.AdministrationDetail.MedicationAction = SlotStatus.DEFERADMIN;
            if (!String.IsNullOrEmpty(AppContextInfo.UserOID))
                this.objReq.objSlotDetailBC.AdministrationDetail.AdministeredByOID = Convert.ToInt64(AppContextInfo.UserOID);
            this.objReq.objSlotDetailBC.PrescriptionItemOID = this.oRecAdminVM.PrescriptionItemOID;
            this.objReq.objSlotDetailBC.OID = this.oRecAdminVM.PresScheduleOID;
            this.objReq.objSlotDetailBC.Status = SlotStatus.DEFERADMIN;
            if (!String.IsNullOrEmpty(this.oRecAdminVM.ReasonForNotDefer.Value))
                this.objReq.objSlotDetailBC.AdministrationDetail.AmendReasonCode = this.oRecAdminVM.ReasonForNotDefer.Value;
            if (!String.IsNullOrEmpty(this.oRecAdminVM.Comments))
                this.objReq.objSlotDetailBC.AdministrationDetail.AdminComments = this.oRecAdminVM.Comments;
        }
    }
    private FillRequestForNotGiven(): void {
        if (this.oRecAdminVM.InfusionAction != null && String.Compare(this.oRecAdminVM.InfusionAction, SlotStatus.NOTGIVEN, StringComparison.InvariantCultureIgnoreCase) == 0) {
            this.objReq.objSlotDetailBC = new SlotDetail();
            this.objReq.objSlotDetailBC.AdministrationDetail = new AdministrationDetail();
            if (this.oRecAdminVM.InfusionRecordAdminTypeCode == InfusionRecordAdminTypeCodes.AmendmentAlertAdministration) {
                this.objReq.objSlotDetailBC.ScheduleGenerationPresItemOID = this.oRecAdminVM.AmendedPrescriptionItemOID;
                this.objReq.objSlotDetailBC.InfusionRecordAdminTypeCode = this.oRecAdminVM.InfusionRecordAdminTypeCode;
            }
            else if (this.oRecAdminVM.InfusionRecordAdminTypeCode == InfusionRecordAdminTypeCodes.ContinuousSequentialAdministration) {
                this.objReq.objSlotDetailBC.ScheduleGenerationPresItemOID = this.oRecAdminVM.SequentialPrescItemOID;
                this.objReq.objSlotDetailBC.InfusionRecordAdminTypeCode = this.oRecAdminVM.InfusionRecordAdminTypeCode;
            }
            this.objReq.objSlotDetailBC.PrescriptionItemOID = this.oRecAdminVM.PrescriptionItemOID;
            this.objReq.objSlotDetailBC.OID = this.oRecAdminVM.PresScheduleOID;
            this.objReq.objSlotDetailBC.Status = SlotStatus.NOTGIVEN;
            this.objReq.objSlotDetailBC.MCVersion = this.oRecAdminVM.MCVersionNo;
            this.objReq.objSlotDetailBC.PrescriptionType = (PatientContext.PrescriptionType != null && PatientContext.PrescriptionType.Trim().length > 0) ? PatientContext.PrescriptionType : PrescriptionTypes.ForAdministration;
            this.objReq.objSlotDetailBC.AdministrationDetail = new AdministrationDetail();
            let objInfusionAdminDetail: InfusionAdminDetail = new InfusionAdminDetail();
            objInfusionAdminDetail.oInfusionBagDetail = new InfusionBagDetail();
            this.objReq.objSlotDetailBC.AdministrationDetail.oInfusionAdminDetail = new ObservableCollection<InfusionAdminDetail>();
            this.objReq.objSlotDetailBC.AdministrationDetail.MedAdminOID = this.oRecAdminVM.MedAdminOID;
            this.objReq.objSlotDetailBC.AdministrationDetail.MedicationAction = SlotStatus.NOTGIVEN;
            objInfusionAdminDetail.INFTYCode = this.oRecAdminVM.InfusionType.Value;
            objInfusionAdminDetail.ActionCode = this.oRecAdminVM.InfusionAction;
            let dtTemp: DateTime = CommonBB.GetServerDateTime();
            objInfusionAdminDetail.ActionStartDate = dtTemp.AddTicks(-(dtTemp.Ticks % TimeSpan.TicksPerMinute));
            this.objReq.objSlotDetailBC.AdministrationDetail.AdministeredDate = objInfusionAdminDetail.ActionStartDate;
            //revisitmeyasik
              if (!String.IsNullOrEmpty(this.oRecAdminVM.ReasonNotGiven.Value))
            // if (!String.IsNullOrEmpty(this.oRecAdminVM.ReasonForNotDefer.Value))
                this.objReq.objSlotDetailBC.AdministrationDetail.AmendReasonCode = this.oRecAdminVM.ReasonNotGiven.Value;
            if (!String.IsNullOrEmpty(this.oRecAdminVM.Comments))
                this.objReq.objSlotDetailBC.AdministrationDetail.AdminComments = this.oRecAdminVM.Comments;
            this.objReq.objSlotDetailBC.AdministrationDetail.oInfusionAdminDetail.Add(objInfusionAdminDetail);
        }
    }
    private FillRequestForPause(): void {
        if (String.Compare(this.oRecAdminVM.InfusionAction, MedicationAction.PAUSE, StringComparison.InvariantCultureIgnoreCase) == 0) {
            if ((String.Compare(this.oRecAdminVM.InfusionType.Value, InfusionTypesCode.PCA, StringComparison.InvariantCultureIgnoreCase) == 0) || (String.Compare(this.oRecAdminVM.InfusionType.Value, InfusionTypesCode.CONTINUOUS, StringComparison.InvariantCultureIgnoreCase) == 0) || (String.Compare(this.oRecAdminVM.InfusionType.Value, InfusionTypesCode.SINGLEDOSEVOLUME, StringComparison.InvariantCultureIgnoreCase) == 0) || (String.Compare(this.oRecAdminVM.InfusionType.Value, InfusionTypesCode.FLUID, StringComparison.InvariantCultureIgnoreCase) == 0) || (String.Compare(this.oRecAdminVM.InfusionType.Value, InfusionTypesCode.INTERMITTENT, StringComparison.InvariantCultureIgnoreCase) == 0) || (String.Equals(this.oRecAdminVM.ItemSubType, InfusionTypesCode.SUBTYPE_GAS, StringComparison.InvariantCultureIgnoreCase))) {
                this.objReq.objSlotDetailBC = new SlotDetail();
                this.objReq.objSlotDetailBC.AdministrationDetail = new AdministrationDetail();
                let objInfusionAdminDetail: InfusionAdminDetail = new InfusionAdminDetail();
                objInfusionAdminDetail.oInfusionBagDetail = new InfusionBagDetail();
                this.objReq.objSlotDetailBC.AdministrationDetail.oInfusionAdminDetail = new ObservableCollection<InfusionAdminDetail>();
                this.objReq.objSlotDetailBC.AdministrationDetail.MedicationAction = this.oRecAdminVM.InfusionAction;
                this.objReq.objSlotDetailBC.AdministrationDetail.MedAdminOID = this.oRecAdminVM.MedAdminOID;
                objInfusionAdminDetail.INFTYCode = this.oRecAdminVM.InfusionType.Value;
                objInfusionAdminDetail.ActionCode = this.oRecAdminVM.InfusionAction;
                objInfusionAdminDetail.ActionStartDate = this.oRecAdminVM.AdministeredDate.AddTime(this.oRecAdminVM.AdministeredDateTime);
                objInfusionAdminDetail.oInfusionBagDetail.AdminStartTime = this.oRecAdminVM.AdministeredDate.AddTime(this.oRecAdminVM.AdministeredDateTime);
                if (!String.IsNullOrEmpty(this.oRecAdminVM.Comments))
                    this.objReq.objSlotDetailBC.AdministrationDetail.AdminComments = this.oRecAdminVM.Comments;
                objInfusionAdminDetail.oInfusionBagDetail.BagSequence = 0;
                //revisitmeyasik
                  if (!String.IsNullOrEmpty(this.oRecAdminVM.ReasonforPause.Value))
                // if (!String.IsNullOrEmpty(this.oRecAdminVM.ReasonForNotDefer.Value))
                    this.objReq.objSlotDetailBC.AdministrationDetail.AdminReasonCode = this.oRecAdminVM.ReasonforPause.Value;
                this.objReq.objSlotDetailBC.AdministrationDetail.oInfusionAdminDetail.Add(objInfusionAdminDetail);
            }
        }
    }
    private FillRequestForResume(): void {
        if (String.Compare(this.oRecAdminVM.InfusionAction, MedicationAction.RESUME, StringComparison.InvariantCultureIgnoreCase) == 0) {
            if ((String.Compare(this.oRecAdminVM.InfusionType.Value, InfusionTypesCode.PCA, StringComparison.InvariantCultureIgnoreCase) == 0) || (String.Compare(this.oRecAdminVM.InfusionType.Value, InfusionTypesCode.CONTINUOUS, StringComparison.InvariantCultureIgnoreCase) == 0) || (String.Compare(this.oRecAdminVM.InfusionType.Value, InfusionTypesCode.SINGLEDOSEVOLUME, StringComparison.InvariantCultureIgnoreCase) == 0) || (String.Compare(this.oRecAdminVM.InfusionType.Value, InfusionTypesCode.FLUID, StringComparison.InvariantCultureIgnoreCase) == 0) || (String.Compare(this.oRecAdminVM.InfusionType.Value, InfusionTypesCode.INTERMITTENT, StringComparison.InvariantCultureIgnoreCase) == 0) || (String.Equals(this.oRecAdminVM.ItemSubType, InfusionTypesCode.SUBTYPE_GAS, StringComparison.InvariantCultureIgnoreCase))) {
                this.objReq.objSlotDetailBC = new SlotDetail();
                this.objReq.objSlotDetailBC.AdministrationDetail = new AdministrationDetail();
                let objInfusionAdminDetail: InfusionAdminDetail = new InfusionAdminDetail();
                objInfusionAdminDetail.oInfusionBagDetail = new InfusionBagDetail();
                this.objReq.objSlotDetailBC.AdministrationDetail.oInfusionAdminDetail = new ObservableCollection<InfusionAdminDetail>();
                this.objReq.objSlotDetailBC.AdministrationDetail.MedAdminOID = this.oRecAdminVM.MedAdminOID;
                this.objReq.objSlotDetailBC.AdministrationDetail.MedicationAction = this.oRecAdminVM.InfusionAction;
                objInfusionAdminDetail.INFTYCode = this.oRecAdminVM.InfusionType.Value;
                this.objReq.objSlotDetailBC.AdministrationDetail.RouteOID = this.oRecAdminVM.SelectedRoute.Value;
                objInfusionAdminDetail.ActionCode = this.oRecAdminVM.InfusionAction;
                objInfusionAdminDetail.ActionStartDate = this.oRecAdminVM.AdministeredDate.AddTime(this.oRecAdminVM.AdministeredDateTime);
                objInfusionAdminDetail.oInfusionBagDetail.AdminStartTime = this.oRecAdminVM.AdministeredDate.AddTime(this.oRecAdminVM.AdministeredDateTime);
                if (!String.IsNullOrEmpty(this.oRecAdminVM.Comments))
                    this.objReq.objSlotDetailBC.AdministrationDetail.AdminComments = this.oRecAdminVM.Comments;
                objInfusionAdminDetail.oInfusionBagDetail.BagSequence = 0;
                this.FillCommonInfusionDetails(objInfusionAdminDetail);
                objInfusionAdminDetail.DripRate = this.oRecAdminVM.DripRate;
                objInfusionAdminDetail.DripRateUOM = new UOM();
                objInfusionAdminDetail.DripRateUOM.UOMId = this.oRecAdminVM.DripRateUOMID;
                objInfusionAdminDetail.DripRatePerUOM = new UOM();
                objInfusionAdminDetail.DripRatePerUOM.UOMId = this.oRecAdminVM.DripRatePerUOMID;
                this.objReq.objSlotDetailBC.AdministrationDetail.oInfusionAdminDetail.Add(objInfusionAdminDetail);
            }
        }
    }
    public LaunchOverrideScan(): void {
        if (this.oRecAdminVM != null && !this.oRecAdminVM.IsAvoidDoubleClick) {
            this.oRecAdminVM.IsAvoidDoubleClick = true;
            this.oOverrideBarcodeScan = new OverrideBarcodeScan();
            this.oOverrideBarcodeScan.DataContext = new OverrideBarcodeScanVM(ValueDomain.SCANPATWBD, Resource_OverrideBarcodeScan.BarcodeMsgTxt, this.oRecAdminVM.PresScheduleOID);
            this.oOverrideBarcodeScan.onDialogClose = this.oOverrideBarcodeScan_Closed;
            let Callback = (s, e) => {
                if (s != null && e != null) {
                    this.oOverrideBarcodeScan = s;
                }
            }
            AppActivity.OpenWindow(CConstants.OVERRIDESCANTITLE, this.oOverrideBarcodeScan, (s) => { this.oOverrideBarcodeScan_Closed(s); }, String.Empty, false, 300, 420, false, WindowButtonType.OkCancel, Callback);
        }
    }
    LaunchMedicationOverrideScan(): void {
        this.oOverrideBarcodeScan = new OverrideBarcodeScan();
        this.oOverrideBarcodeScan.DataContext = new OverrideBarcodeScanVM(ValueDomain.SCANMEDS, Resource_OverrideBarcodeScan.BarcodeMedicationMsgTxt, this.oRecAdminVM.PresScheduleOID);
        this.oOverrideBarcodeScan.onDialogClose = this.oOverrideMedBarcodeScan_Closed;
        let Callback = (s, e) => {
            if (s != null && e != null) {
                this.oOverrideBarcodeScan = s;
            }
        }
        AppActivity.OpenWindow(CConstants.OVERRIDESCANTITLE, this.oOverrideBarcodeScan, (s) => { this.oOverrideMedBarcodeScan_Closed(s); }, String.Empty, false, 300, 420, false, WindowButtonType.OkCancel, Callback);
    }
    ValidatePatientWBScanAndSubmitRecordAdministration(): void {
        if (String.Equals(this.oRecAdminVM.CACode, CALaunch.FluidBalnce.ToString())) {
            this.SubmitForm();
        }
        else if (!MedChartData.IsPatWBBarcodeScanOverriden && !MedChartData.IsMedBarcodeScanOverriden && !this.oRecAdminVM.IsPatWristBandOverridden && MedChartData.IsPatWBScanMandatory && !MedChartData.IsPatWBScanSuccess && (String.Equals(this.oRecAdminVM.InfusionAction, MedicationAction.BEGUN) || String.Equals(this.oRecAdminVM.InfusionAction, MedicationAction.CHANGEBAG))) {
           this.LaunchOverrideScan();
       }
        else if (this.oRecAdminVM != null && !this.oRecAdminVM.IsCustomiseMedScan && !this.oRecAdminVM.IsMedScanExcluded && !MedChartData.IsMedBarcodeScanOverriden && MedChartData.IsMedScanMandatory && !MedChartData.IsMedScanSuccess && (String.Equals(this.oRecAdminVM.InfusionAction, MedicationAction.BEGUN) || String.Equals(this.oRecAdminVM.InfusionAction, MedicationAction.CHANGEBAG))) {
            this.AddPatientWBOverrideReasonFromContext();
            this.LaunchMedicationOverrideScan();
       }
       else {
            if (MedChartData.IsMedBarcodeScanOverriden) {
                let oManageBarcodeHelper: ManageBarcodeHelper = new ManageBarcodeHelper();
                if (!this.oRecAdminVM.IsPatWristBandOverridden && MedChartData.IsPatWBScanMandatory && !MedChartData.IsPatWBScanSuccess && (String.Equals(this.oRecAdminVM.InfusionAction, MedicationAction.BEGUN) || String.Equals(this.oRecAdminVM.InfusionAction, MedicationAction.CHANGEBAG))) {
                    if (this.lstCMedBarcodeScanOverrideDetail == null)
                        this.lstCMedBarcodeScanOverrideDetail = new ObservableCollection<CMedBarcodeScanOverrideDetail>();
                    this.lstCMedBarcodeScanOverrideDetail.Add(oManageBarcodeHelper.SetOverrideReason(ValueDomain.SCANPATWBD, MedChartData.MedScanOverrideReason, MedChartData.MedScanOverrideComments));
                }
                if (this.oRecAdminVM != null && !this.oRecAdminVM.IsCustomiseMedScan && !this.oRecAdminVM.IsMedScanExcluded && MedChartData.IsMedScanMandatory && !MedChartData.IsMedScanSuccess && (String.Equals(this.oRecAdminVM.InfusionAction, MedicationAction.BEGUN) || String.Equals(this.oRecAdminVM.InfusionAction, MedicationAction.CHANGEBAG))) {
                    if (this.lstCMedBarcodeScanOverrideDetail == null)
                        this.lstCMedBarcodeScanOverrideDetail = new ObservableCollection<CMedBarcodeScanOverrideDetail>();
                    this.lstCMedBarcodeScanOverrideDetail.Add(oManageBarcodeHelper.SetOverrideReason(ValueDomain.SCANMEDS, MedChartData.MedScanOverrideReason, MedChartData.MedScanOverrideComments));
                }
            }
           else {
               this.AddPatientWBOverrideReasonFromContext();
           }
           this.SubmitForm();
      }
    }
    AddPatientWBOverrideReasonFromContext(): void {
        if (MedChartData.IsPatWBBarcodeScanOverriden) {
            let oManageBarcodeHelper: ManageBarcodeHelper = new ManageBarcodeHelper();
            if (!this.oRecAdminVM.IsPatWristBandOverridden && MedChartData.IsPatWBScanMandatory && !MedChartData.IsPatWBScanSuccess && (String.Equals(this.oRecAdminVM.InfusionAction, MedicationAction.BEGUN) || String.Equals(this.oRecAdminVM.InfusionAction, MedicationAction.CHANGEBAG))) {
                if (this.lstCMedBarcodeScanOverrideDetail == null)
                    this.lstCMedBarcodeScanOverrideDetail = new ObservableCollection<CMedBarcodeScanOverrideDetail>();
                this.lstCMedBarcodeScanOverrideDetail.Add(oManageBarcodeHelper.SetOverrideReason(ValueDomain.SCANPATWBD, MedChartData.PatWBScanOverrideReason, MedChartData.PatWBScanOverrideComments));
            }
        }
    }
    oOverrideBarcodeScan_Closed(args: AppDialogEventargs): void {
        that.oRecAdminVM.IsAvoidDoubleClick = false;
        if (args.Result == AppDialogResult.Ok) {
            this.oOverrideBarcodeScan = ObjectHelper.CreateType<OverrideBarcodeScan>(args.Content.Component?args.Content.Component:args.Content, OverrideBarcodeScan);
            let bdialogresult: boolean = this.oOverrideBarcodeScan.cmdOk_Click();
            let bIsOverrideReason: boolean = false;
            let obj: OverrideBarcodeScan = ObjectHelper.CreateType<OverrideBarcodeScan>(args.Content.Component?args.Content.Component:args.Content, OverrideBarcodeScan);
            bIsOverrideReason = (obj != null && obj.oOverrideBarcodeScanVM != null && obj.oOverrideBarcodeScanVM.IsOverrideScan) ? true : false;
            if (bdialogresult && bIsOverrideReason && obj != null && obj.oOverrideBarcodeScanVM != null && obj.oOverrideBarcodeScanVM.OverrideScanSelected != null && !String.IsNullOrEmpty(obj.oOverrideBarcodeScanVM.OverrideScanSelected.Value)) {
                if (this.lstCMedBarcodeScanOverrideDetail == null)
                    this.lstCMedBarcodeScanOverrideDetail = new ObservableCollection<CMedBarcodeScanOverrideDetail>();
                let oManageBarcodeHelper: ManageBarcodeHelper = new ManageBarcodeHelper();
                this.lstCMedBarcodeScanOverrideDetail.Add(oManageBarcodeHelper.SetOverrideReason(ValueDomain.SCANPATWBD, obj.oOverrideBarcodeScanVM.OverrideScanSelected.Value, obj.oOverrideBarcodeScanVM.OverrideComments));
                oManageBarcodeHelper.SetOverrideBarcodeScanReasonContext(ValueDomain.SCANPATWBD, obj.oOverrideBarcodeScanVM.OverrideComments, obj.oOverrideBarcodeScanVM.OverrideScanSelected.Value);
                that.oRecAdminVM.IsPatWristBandOverridden = true;
            }
            if (bdialogresult || MedChartData.IsPatWBScanSuccess) {
                args.AppChildWindow.DialogResult = true;
                if (that.oRecAdminVM.IsLaunchedFromScanMedlink) {
                    that.oRecAdminVM.IsLaunchedFromScanMedlink = false;
                    that.oRecAdminVM.IsMedExclude = true;
                    that.oRecAdminVM.LaunchScanRecordMedication();
                }
                else if (that.oRecAdminVM != null && !that.oRecAdminVM.IsCustomiseMedScan && !that.oRecAdminVM.IsMedScanExcluded && MedChartData.IsMedScanMandatory && !MedChartData.IsMedScanSuccess) {
                    if (!MedChartData.IsMedBarcodeScanOverriden) {
                        that.LaunchMedicationOverrideScan();
                    }
                    else if (MedChartData.IsMedBarcodeScanOverriden) {
                        if (this.lstCMedBarcodeScanOverrideDetail == null)
                            this.lstCMedBarcodeScanOverrideDetail = new ObservableCollection<CMedBarcodeScanOverrideDetail>();
                        let oManageBarcodeHelper: ManageBarcodeHelper = new ManageBarcodeHelper();
                        this.lstCMedBarcodeScanOverrideDetail.Add(oManageBarcodeHelper.SetOverrideReason(ValueDomain.SCANMEDS, MedChartData.MedScanOverrideReason, MedChartData.MedScanOverrideComments));
                        that.SubmitForm();
                    }
                }
                else {
                    that.SubmitForm();
                }
            }
        }
        else if (args.Result == AppDialogResult.Cancel) {
            that.oRecAdminVM.IsLaunchedFromScanMedlink = false;
            args.AppChildWindow.DialogResult = true;
            that.oRecAdminVM.IsSubmitInProgress = false;
            Busyindicator.SetStatusIdle("LaunchInfRecAdmin");
            Busyindicator.SetStatusIdle("InfRecAdminSubmit");
        }
    }
    oOverrideMedBarcodeScan_Closed(args: AppDialogEventargs): void {
        if (args.Result == AppDialogResult.Ok) {
            this.oOverrideBarcodeScan = ObjectHelper.CreateType<OverrideBarcodeScan>(args.Content.Component, OverrideBarcodeScan);
            let bdialogresult: boolean = this.oOverrideBarcodeScan.cmdOk_Click();
            let bIsOverrideReason: boolean = false;
            let obj: OverrideBarcodeScan = ObjectHelper.CreateType<OverrideBarcodeScan>(args.Content, OverrideBarcodeScan);
            bIsOverrideReason = (obj != null && obj.oOverrideBarcodeScanVM != null && obj.oOverrideBarcodeScanVM.IsOverrideScan) ? true : false;
            if (bdialogresult && bIsOverrideReason && obj != null && obj.oOverrideBarcodeScanVM != null && obj.oOverrideBarcodeScanVM.OverrideScanSelected != null && !String.IsNullOrEmpty(obj.oOverrideBarcodeScanVM.OverrideScanSelected.Value)) {
                if (this.lstCMedBarcodeScanOverrideDetail == null)
                    this.lstCMedBarcodeScanOverrideDetail = new ObservableCollection<CMedBarcodeScanOverrideDetail>();
                let oManageBarcodeHelper: ManageBarcodeHelper = new ManageBarcodeHelper();
                this.lstCMedBarcodeScanOverrideDetail.Add(oManageBarcodeHelper.SetOverrideReason(ValueDomain.SCANMEDS, obj.oOverrideBarcodeScanVM.OverrideScanSelected.Value, obj.oOverrideBarcodeScanVM.OverrideComments));
                oManageBarcodeHelper.SetOverrideBarcodeScanReasonContext(ValueDomain.SCANMEDS, obj.oOverrideBarcodeScanVM.OverrideComments, obj.oOverrideBarcodeScanVM.OverrideScanSelected.Value);
            }
            if (bdialogresult || MedChartData.IsMedScanSuccess) {
                args.AppChildWindow.DialogResult = true;
                that.SubmitForm();
            }
        }
        else if (args.Result == AppDialogResult.Cancel) {
            args.AppChildWindow.DialogResult = true;
           
            that.oRecAdminVM.IsSubmitInProgress = false;

        //    args.AppChildWindow.DialogRef.close();
            Busyindicator.SetStatusIdle("LaunchInfRecAdmin");
            Busyindicator.SetStatusIdle("InfRecAdminSubmit");
            
           // that.oOverrideBarcodeScan.appDialog.DialogResult = false;
            //this.objInfusionChartVM.CurrentActivityCode = ActivityCode.None;
            

        }
    }

    public SubmitForm(): void {
        MedChartData.IsMedScanSuccess = false;
        this.oRecAdminVM.IsPatWristBandOverridden = false;
        let objService: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
        this.objReq = new CReqMsgRecordInfusionAdministration();
        this.objReq.oContextInformation = CommonBB.FillContext();
        this.objReq.oContextInformation.PageInfo = PatientContext.EncounterOid.ToString();
        this.objReq.nPatientOIDBC = ChartContext.PatientOID;
        this.FillRequestObject(this.objReq);
        if (ChartContext.EncounterOID > 0 && this.objReq.objSlotDetailBC != null) {
            this.objReq.objSlotDetailBC.EncounterOID = ChartContext.EncounterOID;
        }
        if (this.objReq != null && this.objReq.objSlotDetailBC != null && this.objReq.objSlotDetailBC.AdministrationDetail != null) {
            this.objReq.bIsPRNBC = (this.oRecAdminVM.IsPRN || this.oRecAdminVM.InfusionRecordAdminTypeCode == InfusionRecordAdminTypeCodes.AsRequiredAdministration) ? true : false;
            this.objReq.objSlotDetailBC.PrescriptionItemOID = this.oRecAdminVM.PrescriptionItemOID;
            this.objReq.objSlotDetailBC.AdministrationDetail.IsAlertRequired = this.oRecAdminVM.bIsAlertRequired;
            this.objReq.objSlotDetailBC.OID = this.oRecAdminVM.PresScheduleOID;
            if (!String.IsNullOrEmpty(this.oRecAdminVM.RecordOneMoreAction) && this.oRecAdminVM.RecordOneMoreAction.length > 0) {
                this.objReq.objSlotDetailBC.AdministrationDetail.RecordOneMoreAction = this.oRecAdminVM.RecordOneMoreAction;
                this.objReq.objSlotDetailBC.AdministrationDetail.RecordOMASequence = this.oRecAdminVM.RecordOMASequence;
            }
            if (this.objReq.bIsPRNBC && !this.oRecAdminVM.IsPRNWithSchedule && String.Equals(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.InvariantCultureIgnoreCase)) {
                this.objReq.objSlotDetailBC.AdministrationDetail.IsDuringHomeLeave = true;
            }
            else {
                this.objReq.objSlotDetailBC.AdministrationDetail.IsDuringHomeLeave = String.Equals(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.InvariantCultureIgnoreCase) && !Common.IsRetrospectiveSlot(this.oRecAdminVM.ScheduledDTTM, this.oRecAdminVM.InfSlotStatus) ? true : false;
            }
            this.objReq.objSlotDetailBC.IsUpdatePIStatusToCompleted = false;
            this.objReq.objSlotDetailBC.IsLastSlotCheckRequired = false;
            this.objReq.objSlotDetailBC.ScheduledDTTM = this.oRecAdminVM.ScheduledDTTM;
            if (!String.Equals(this.oRecAdminVM.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) && !String.Equals(this.oRecAdminVM.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase)) {
                let InfusionTypeCode: string = this.oRecAdminVM.InfusionType != null ? this.oRecAdminVM.InfusionType.Value : String.Empty;
                if ((String.Equals(this.objReq.objSlotDetailBC.AdministrationDetail.MedicationAction, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.objReq.objSlotDetailBC.AdministrationDetail.MedicationAction, MedicationAction.STOP, StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.objReq.objSlotDetailBC.AdministrationDetail.MedicationAction, MedicationAction.COMPLETE, StringComparison.CurrentCultureIgnoreCase)) || (String.Equals(this.objReq.objSlotDetailBC.AdministrationDetail.MedicationAction, MedicationAction.BEGUN, StringComparison.CurrentCultureIgnoreCase) && (this.objReq.objSlotDetailBC.AdministrationDetail.oInfusionAdminDetail != null && this.objReq.objSlotDetailBC.AdministrationDetail.oInfusionAdminDetail.Count > 1 && (String.Equals(this.objReq.objSlotDetailBC.AdministrationDetail.oInfusionAdminDetail[1].ActionCode, MedicationAction.STOP, StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.objReq.objSlotDetailBC.AdministrationDetail.oInfusionAdminDetail[1].ActionCode, MedicationAction.COMPLETE, StringComparison.CurrentCultureIgnoreCase))))) {
                    this.objReq.objSlotDetailBC.PresItemENDTTM = this.oRecAdminVM.PrescriptionEndDate;
                    if (String.Equals(InfusionTypeCode, InfusionTypesCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase)) {
                        let _isStatFreq: boolean = (this.oRecAdminVM != null && !String.IsNullOrEmpty(this.oRecAdminVM.FreqPerodCode) && String.Equals(this.oRecAdminVM.FreqPerodCode, CConstants.OnceOnlyPerodCode, StringComparison.InvariantCultureIgnoreCase) && !String.IsNullOrEmpty(this.oRecAdminVM.DoseType) && !String.Equals(this.oRecAdminVM.DoseType, DoseTypeCode.STEPPED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(this.oRecAdminVM.DoseType, DoseTypeCode.STEPPEDVARIABLE, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(this.oRecAdminVM.DoseType, DoseTypeCode.VARIABLE, StringComparison.InvariantCultureIgnoreCase));
                        if (DateTime.NotEquals(this.oRecAdminVM.PrescriptionEndDate , DateTime.MinValue) || _isStatFreq) {
                            this.objReq.objSlotDetailBC.IsUpdatePIStatusToCompleted = true;
                            if (_isStatFreq) {
                                this.objReq.objSlotDetailBC.IsLastSlotCheckRequired = false;
                                this.objReq.objSlotDetailBC.IsOnceOnlyFrequency = _isStatFreq;
                            }
                            else {
                                this.objReq.objSlotDetailBC.IsLastSlotCheckRequired = true;
                            }
                            if (this.oRecAdminVM.IsPRN && !this.oRecAdminVM.IsPRNWithSchedule) {
                                this.objReq.objSlotDetailBC.IsUpdatePIStatusToCompleted = false;
                                this.objReq.objSlotDetailBC.IsLastSlotCheckRequired = false;
                            }
                        }
                    }
                    else {
                        this.objReq.objSlotDetailBC.IsUpdatePIStatusToCompleted = true;
                        this.objReq.objSlotDetailBC.IsLastSlotCheckRequired = false;
                        if (String.Equals(this.oRecAdminVM.ItemSubType, InfusionTypesCode.SUBTYPE_GAS, StringComparison.CurrentCultureIgnoreCase) && this.oRecAdminVM.IsPRN) {
                            this.objReq.objSlotDetailBC.IsUpdatePIStatusToCompleted = false;
                        }
                    }
                }
            }
        }
        if (this.objReq != null && this.objReq.objSlotDetailBC != null && this.objReq.objSlotDetailBC.AdministrationDetail != null)
            this.objReq.objSlotDetailBC.AdministrationDetail.MedBarCodeOverrideDetails = this.lstCMedBarcodeScanOverrideDetail;
        let lstMedProddet: ObservableCollection<MedsScanProductDetails> = new ObservableCollection<MedsScanProductDetails>();
        this.oMedScanRecAdmVM = this.oRecAdminVM.MedScanRecadminDetail;
        let objManageBarcodeHelper: ManageBarcodeHelper = new ManageBarcodeHelper();
        if (this.oMedScanRecAdmVM != null && this.oMedScanRecAdmVM.oProductDetailsInfo != null && this.oMedScanRecAdmVM.oProductDetailsInfo.Count > 0) {
            this.oMedScanRecAdmVM.TotaldoseadministeredAmt = !String.IsNullOrEmpty(this.oRecAdminVM.Dose) ? this.oRecAdminVM.Dose : null;
            this.oMedScanRecAdmVM.TotalDoseAdministeredUOMLZOID = !String.IsNullOrEmpty(this.oRecAdminVM.DoseUomLorenzoID) ? this.oRecAdminVM.DoseUomLorenzoID : null;
            lstMedProddet = objManageBarcodeHelper.FillScanedProductDetails(this.oMedScanRecAdmVM);
            this.objReq.objSlotDetailBC.AdministrationDetail.MedProductDetails = lstMedProddet;
        }
        objService.RecordInfusionAdministrationCompleted = (s, e) => { this.OnWebServiceCompleted(s, e); };
        objService.RecordInfusionAdministrationAsync(this.objReq);
    }
    protected OnWebServiceCompleted(sender: Object, e: RecordInfusionAdministrationCompletedEventArgs): void {
        if (e.Error != null) {
            let _ErrorID: number = 80000023;
            let _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:InfRecAdmBase, Method:SubmitForm()";
            let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
        }
        if (e.Result != null) {
            let objRes: CResMsgRecordInfusionAdministration = e.Result;
            if (objRes.oContextInformation != null && objRes.oContextInformation.Errors.Count <= 0) {
                if (objRes.oAlertInfo != null) {
                    this.ShowAlertMessage(objRes.oAlertInfo);
                }
                else if (objRes.MedAdminOid > 0) {
                    this.oRecAdminVM.MedAdminOID = objRes.MedAdminOid;
                    if (objRes.oSlotDetail != null && objRes.oSlotDetail.AdministrationDetail != null) {
                        let isPRN: boolean = (this.oRecAdminVM.IsPRN || this.oRecAdminVM.InfusionRecordAdminTypeCode == InfusionRecordAdminTypeCodes.AsRequiredAdministration) ? true : false;
                        if (isPRN && !this.oRecAdminVM.IsPRNWithSchedule && String.Equals(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.InvariantCultureIgnoreCase) && DateTime.NotEquals(this.oRecAdminVM.AdministeredDate , DateTime.MinValue) && DateTime.NotEquals(MedChartData.SuspendedOn , DateTime.MinValue) && DateTime.GreaterThanOrEqualTo(this.oRecAdminVM.AdministeredDate.Date , MedChartData.SuspendedOn.Date)) {
                            objRes.oSlotDetail.AdministrationDetail.IsDuringHomeLeave = true;
                        }
                        else if (String.Equals(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.InvariantCultureIgnoreCase) && String.Equals(this.oRecAdminVM.InfSlotStatus, SlotStatus.HOMELEAVE, StringComparison.InvariantCultureIgnoreCase) && (this.oRecAdminVM.InfusionAction.Equals(MedicationAction.BEGUN) || this.oRecAdminVM.InfusionAction.Equals(SlotStatus.NOTGIVEN))) {
                            objRes.oSlotDetail.AdministrationDetail.IsDuringHomeLeave = true;
                        }
                        else {
                            objRes.oSlotDetail.AdministrationDetail.IsDuringHomeLeave = this.oRecAdminVM.IsDuringHomeLeave;
                        }
                    }
                    if (this.oRecAdminVM != null) {
                        this.oRecAdminVM.RaiseInfRecordAdminServiceCompleted(objRes.oSlotDetail);
                    }
                }
            }
        }
    }
    private ShowDoseDiscrepancy(): boolean {
        let sIntendedDose: string = String.Empty;
        let sIntendedVolume: string = String.Empty;
        let sActualDose: string = String.Empty;
        let sActualVolume: string = String.Empty;
        let sDoseFontWeight: string = String.Empty;
        let sDoseForeColor: string = String.Empty;
        let sVolFontWeight: string = String.Empty;
        let sVolForeColor: string = String.Empty;
        if ((!String.IsNullOrEmpty(this.oRecAdminVM.InfusionAction) && (String.Equals(this.oRecAdminVM.InfusionAction, MedicationAction.COMPLETE, StringComparison.OrdinalIgnoreCase))) || ((!String.IsNullOrEmpty(this.oRecAdminVM.InfusionPastAction) && (String.Equals(this.oRecAdminVM.InfusionPastAction, MedicationAction.STOP, StringComparison.OrdinalIgnoreCase) || String.Equals(this.oRecAdminVM.InfusionPastAction, MedicationAction.COMPLETE, StringComparison.OrdinalIgnoreCase))))) {
            if ((!String.IsNullOrEmpty(this.oRecAdminVM.DoseAdministered) && !String.IsNullOrEmpty(this.oRecAdminVM.DoseType))) {
                if (((String.Compare(this.oRecAdminVM.DoseType, "MEDDOSE17", StringComparison.OrdinalIgnoreCase) == 0 || String.Compare(this.oRecAdminVM.DoseType, DoseTypeCode.STEPPEDVARIABLE, StringComparison.OrdinalIgnoreCase) == 0) && !String.IsNullOrEmpty(this.oRecAdminVM.LowerDose) && !String.IsNullOrEmpty(this.oRecAdminVM.UpperDose))) {
                    let _AdminDose: number = 0, _LowerDose = 0, _UpperDose = 0;
                    let _TmpParseResult: boolean = Number.TryParse(this.oRecAdminVM.DoseAdministered, (o) => { _AdminDose = o; }) && Number.TryParse(this.oRecAdminVM.LowerDose, (o) => { _LowerDose = o; }) && Number.TryParse(this.oRecAdminVM.UpperDose, (o) => { _UpperDose = o; });
                    if (_TmpParseResult) {
                        sIntendedDose = _LowerDose.ToString() + CConstants.sHyphen + _UpperDose.ToString() + CConstants.sSpace + this.oRecAdminVM.DoseUOMName;
                        if (_AdminDose < _LowerDose || _AdminDose > _UpperDose) {
                            this.DoseDiscrepancy = true;
                            sActualDose = this.oRecAdminVM.DoseAdministered + CConstants.sSpace + this.oRecAdminVM.DoseUOMName + CConstants.sSpace + CConstants.sExclamatary;
                            sDoseFontWeight = CConstants.sBold;
                            sDoseForeColor = CConstants.sBrown;
                        }
                        else {
                            sActualDose = this.oRecAdminVM.DoseAdministered + CConstants.sSpace + this.oRecAdminVM.DoseUOMName;
                            sDoseFontWeight = CConstants.sNormal;
                            sDoseForeColor = CConstants.sBlack;
                        }
                    }
                }
                else if (!String.IsNullOrEmpty(this.oRecAdminVM.Dose) && (String.Compare(this.oRecAdminVM.DoseType, "CC_MEDDOSE4", StringComparison.OrdinalIgnoreCase) == 0 || String.Compare(this.oRecAdminVM.DoseType, DoseTypeCode.STEPPEDVARIABLE, StringComparison.OrdinalIgnoreCase) == 0) && !String.IsNullOrEmpty(this.oRecAdminVM.DoseAdministered)) {
                    let _AdminDose: number = 0, _Dose = 0;
                    Number.TryParse(this.oRecAdminVM.Dose, (o) => { _Dose = o; });
                    Number.TryParse(this.oRecAdminVM.DoseAdministered, (o) => { _AdminDose = o; });
                    if (_Dose != _AdminDose) {
                        this.DoseDiscrepancy = true;
                        sIntendedDose = this.oRecAdminVM.Dose + CConstants.sSpace + this.oRecAdminVM.DoseUOMName;
                        sActualDose = this.oRecAdminVM.DoseAdministered + CConstants.sSpace + this.oRecAdminVM.DoseUOMName + CConstants.sSpace + CConstants.sExclamatary;
                        sDoseFontWeight = CConstants.sBold;
                        sDoseForeColor = CConstants.sBrown;
                    }
                    else {
                        sIntendedDose = this.oRecAdminVM.Dose + CConstants.sSpace + this.oRecAdminVM.DoseUOMName;
                        sActualDose = this.oRecAdminVM.DoseAdministered + CConstants.sSpace + this.oRecAdminVM.DoseUOMName;
                        sDoseFontWeight = CConstants.sNormal;
                        sDoseForeColor = CConstants.sBlack;
                    }
                }
                else {
                    sIntendedDose = this.oRecAdminVM.Dose + CConstants.sSpace + this.oRecAdminVM.DoseUOMName;
                    sActualDose = this.oRecAdminVM.DoseAdministered + CConstants.sSpace + this.oRecAdminVM.DoseUOMName;
                    sDoseFontWeight = CConstants.sNormal;
                    sDoseForeColor = CConstants.sBlack;
                }
            }
            if (!String.IsNullOrEmpty(this.oRecAdminVM.TotalVolumeToBeInfused)) {
                let bVolDesrp: boolean = false;
                sIntendedVolume = this.oRecAdminVM.TotalVolumeToBeInfused;
                let dTolVolInfused: number = 0, dVolInfused = 0, dToBeInfused = 0, dVolInf = 0;
                Number.TryParse(this.oRecAdminVM.InfusedTotalVolume, (o) => { dTolVolInfused = o; });
                Number.TryParse(this.oRecAdminVM.VolumeInfused, (o) => { dVolInfused = o; });
                dTolVolInfused += dVolInfused;
                if (dTolVolInfused > 0 && this.oRecAdminVM.VolumeInfusedUOM != null) {
                    sActualVolume = dTolVolInfused.ToString() + CConstants.sSpace + this.oRecAdminVM.VolumeInfusedUOM.DisplayText;
                }
                if (Number.TryParse(this.oRecAdminVM.VolumeInfused, (o) => { dVolInf = o; }) && dVolInf > 0 && this.VolumeInfusedUOM != null && this.oRecAdminVM.VolumeInfusedUOM.Tag != null && String.Equals(this.oRecAdminVM.VolumeInfusedUOM.Tag.ToString(), CConstants.ml, StringComparison.CurrentCultureIgnoreCase)) {
                    dToBeInfused = this.oRecAdminVM.TotalVolumeToBeInfusedValue - dVolInf;
                    dVolInf = 0;
                    Number.TryParse(this.oRecAdminVM.InfusedTotalVolume, (o) => { dVolInf = o; });
                    dToBeInfused = dToBeInfused - dVolInf;
                    if (dToBeInfused != 0) {
                        bVolDesrp = true;
                        this.DoseDiscrepancy = true;
                        sActualVolume += CConstants.sSpace + CConstants.sExclamatary;
                        sVolFontWeight = CConstants.sBold;
                        sVolForeColor = CConstants.sBrown;
                    }
                }
                if (!bVolDesrp) {
                    sVolFontWeight = CConstants.sNormal;
                    sVolForeColor = CConstants.sNormal;
                }
            }
            if (this.DoseDiscrepancy) {
                this.objVm = new SlotDetailVM();
                this.objVm.AdministrationDetail = new AdministrationDetailVM();
                this.objDoseDis = new MedsAdminDoseDiscrepancyReason();
                this.objDoseDis.constructorImpl(this.objVm);
                this.objDoseDis.HelpCode ="MED_REC_RSN_DISCRPNC";
                this.objVm.IsReasonDoseDisForInfusion = true;
                this.objVm.DoseVolumeShow = Visibility.Visible;
                this.objVm.DoseVolumeTitle = Resource.MedicationAdministrator.lbldosevolumetitle_text;
                this.objVm.DoseDescreIntendedDose = String.Format(MedicationAdministrator.lblintendeddosevalue_text, sIntendedDose);
                if (!String.IsNullOrEmpty(sIntendedDose)) {
                    this.objVm.DoseDescreActualDose = sActualDose;
                    this.objVm.DoseFontWeight = sDoseFontWeight;
                    this.objVm.DoseForeColor = sDoseForeColor;
                }
                this.objVm.DoseDescreIntendedVolume = String.Format(MedicationAdministrator.lblintendedvolvalue_text, sIntendedVolume);
                if (!String.IsNullOrEmpty(sIntendedVolume) && !String.IsNullOrEmpty(sActualVolume)) {
                    this.objVm.DoseDescreActualVolume = sActualVolume;
                    this.objVm.VolFontWeight = sVolFontWeight;
                    this.objVm.VolForeColor = sVolForeColor;
                }
                let Callback = (s, e) => {
                    if (s != null && e != null) {
                        this.objVm = s;
                    }
                }
                AppActivity.OpenWindow("Dose/Volume discrepancy reason", this.objDoseDis,(s) => { this.objDoseDis_Closed(s); } , "Record reason for discrepancy", true, 379, 355, true, WindowButtonType.OkCancel, Callback);
                this.DoseDiscrepancy = false;
                return false;
            }
        }
        return true;
    }
    objDoseDis_Closed(args: AppDialogEventargs): void {
        if (args.Result == AppDialogResult.Ok) {
            let objDoseDis:MedsAdminDoseDiscrepancyReason = args.Content.Component;
            let bdialogresult: boolean = objDoseDis.cmdOkClick();
            if (bdialogresult) {
                this.ValidatePatientWBScanAndSubmitRecordAdministration();
                args.AppChildWindow.DialogResult = true;
            }
        }
        else if (args.Result == AppDialogResult.Cancel) {
            this.oRecAdminVM.IsSubmitInProgress = false;
            args.AppChildWindow.DialogResult = true;
            Busyindicator.SetStatusIdle("InfRecAdminSubmit");
        }
    }
    protected ConvertToLeastUOM(): boolean {
        if (!String.IsNullOrEmpty(this.oRecAdminVM.PrevBagVolume) && !String.IsNullOrEmpty(this.oRecAdminVM.VolumeInfused)) {
            this.PreBagVolume = Convert.ToDouble(this.oRecAdminVM.PrevBagVolume);
            this.PreBagVolumeUOM = this.oRecAdminVM.PrevBagVolumeUom.Tag.ToString();
            this.VolumeInfused = Convert.ToDouble(this.oRecAdminVM.VolumeInfused);
            this.VolumeInfusedUOM = this.oRecAdminVM.VolumeInfusedUOM.Tag.ToString();
            CInfusionHelper.ConvertToLeastUOM(this.PreBagVolume, this.PreBagVolumeUOM, this.VolumeInfused, this.VolumeInfusedUOM);
            return true;
        }
        return false;
    }
    iMsgBox: iMessageBox;
    ShowErrorMessage(sErrorMsg: string, oMessageBoxButton: MessageBoxButton, oMessageBoxType: MessageBoxType, MsgBoxTag: Object = null, MsgBoxHeight: number = null, MsgBoxWidth: number = null): void {
        if (!String.IsNullOrEmpty(sErrorMsg)) {
            this.iMsgBox = ObjectHelper.CreateObject(new iMessageBox(), {
                Title: "LORENZO",
                Message: sErrorMsg,
                MessageButton: oMessageBoxButton,
                IconType: oMessageBoxType
            });
            if (MsgBoxTag != null)
                this.iMsgBox.Tag = MsgBoxTag;
            if (MsgBoxHeight.HasValue)
                this.iMsgBox.Height = MsgBoxHeight.Value;
            if (MsgBoxWidth.HasValue)
                this.iMsgBox.Width = MsgBoxWidth.Value;
            this.iMsgBox.OverlayBrush = new SolidColorBrush(Colors.Transparent);
            this.iMsgBox.MessageBoxClose = (s, e) => { this.iMsgBox_MessageBoxClose(s, e); };
            this.iMsgBox.Show();
        }
    }
    iMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.OK) {
            let objService: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
            if (this.objReq != null && this.objReq.objSlotDetailBC != null && this.objReq.objSlotDetailBC.AdministrationDetail != null)
                this.objReq.objSlotDetailBC.AdministrationDetail.IsAlertRequired = false;
            objService.RecordInfusionAdministrationCompleted = (s, e) => { this.OnWebServiceCompleted(s, e); };
            objService.RecordInfusionAdministrationAsync(this.objReq);
        }
        else if (e.MessageBoxResult == MessageBoxResult.Cancel) {

        }
    }
    public FillRequestForPastRecAdmin(oAdministrationDetail: AdministrationDetail): InfusionAdminDetail {
        let objInfusionAdminDetail: InfusionAdminDetail = new InfusionAdminDetail();
        if (String.Compare(this.oRecAdminVM.InfusionPastAction, MedicationAction.STOP, StringComparison.InvariantCultureIgnoreCase) == 0 || String.Compare(this.oRecAdminVM.InfusionPastAction, MedicationAction.COMPLETE, StringComparison.InvariantCultureIgnoreCase) == 0) {
            oAdministrationDetail.MedicationPastAction = this.oRecAdminVM.InfusionPastAction;
            if ((this.oRecAdminVM.ReasonforStop != null && !String.IsNullOrEmpty(this.oRecAdminVM.ReasonforStop.Value)) && this.oRecAdminVM.InfusionPastAction != null && String.Compare(this.oRecAdminVM.InfusionPastAction, MedicationAction.STOP, StringComparison.InvariantCultureIgnoreCase) == 0)
                oAdministrationDetail.AdminReasonCode = this.oRecAdminVM.ReasonforStop.Value;
            if (!String.IsNullOrEmpty(this.oRecAdminVM.DoseAdministered)) {
                oAdministrationDetail.Dose = this.oRecAdminVM.DoseAdministered;
                if (this.oRecAdminVM.IsVisibleDoseUOM == Visibility.Visible)
                    oAdministrationDetail.DoseUOMOID = this.oRecAdminVM.lstStopDoseUOM != null ? Convert.ToInt64(this.oRecAdminVM.lstStopDoseUOM.Value) : 0;
                else oAdministrationDetail.DoseUOMOID = this.oRecAdminVM.DoseUOMOID;
                if (this.objVm != null && this.objVm.AdministrationDetail != null && this.objVm.AdministrationDetail.DoseDiscReasonCode != null && this.objVm.AdministrationDetail.DoseDiscReasonCode.Value != null && !String.IsNullOrEmpty(this.oRecAdminVM.Dose) && (this.oRecAdminVM.DoseAdministered != this.oRecAdminVM.Dose)) {
                    oAdministrationDetail.DoseDiscReasonCode = this.objVm.AdministrationDetail.DoseDiscReasonCode.Value;
                    oAdministrationDetail.DoseDiscComments = this.objVm.AdministrationDetail.DoseDiscComments;
                }
            }
            objInfusionAdminDetail.Dose = this.oRecAdminVM.DoseAdministered;
            objInfusionAdminDetail.DoseUOMOID = this.oRecAdminVM.lstStopDoseUOM != null ? Convert.ToInt64(this.oRecAdminVM.lstStopDoseUOM.Value) : 0;
            objInfusionAdminDetail.INFTYCode = this.oRecAdminVM.InfusionType.Value;
            objInfusionAdminDetail.ActionCode = this.oRecAdminVM.InfusionPastAction;
            objInfusionAdminDetail.ActionStartDate = this.oRecAdminVM.AdministeredstopDate.AddTime(this.oRecAdminVM.AdministeredstopDateTime);
            if (!String.IsNullOrEmpty(this.oRecAdminVM.StopComments))
                objInfusionAdminDetail.AdminComments = this.oRecAdminVM.StopComments;
            objInfusionAdminDetail.oInfusionBagDetail = new InfusionBagDetail();
            objInfusionAdminDetail.oInfusionBagDetail.PrevBagSequence = this.oRecAdminVM.prevBagSeqNumber;
            objInfusionAdminDetail.oInfusionBagDetail.InfusedVolume = !String.IsNullOrEmpty(this.oRecAdminVM.VolumeInfused) ? this.oRecAdminVM.VolumeInfused : String.Empty;
            objInfusionAdminDetail.oInfusionBagDetail.InfusedVolumeUOM = new UOM();
            let VolumeInfusedUOM: number;
            if(this.oRecAdminVM.VolumeInfusedUOM){
            Number.TryParse(this.oRecAdminVM.VolumeInfusedUOM.Value, (o) => { VolumeInfusedUOM = o; })
            }
            //Number.TryParse(this.oRecAdminVM.VolumeInfusedUOM.Value, (o) => { VolumeInfusedUOM = o; })
            objInfusionAdminDetail.oInfusionBagDetail.InfusedVolumeUOM.UOMId = (this.oRecAdminVM.VolumeInfusedUOM != null && !String.IsNullOrEmpty(this.oRecAdminVM.VolumeInfusedUOM.Value)) ? VolumeInfusedUOM : 0;
            objInfusionAdminDetail.oInfusionBagDetail.Wastage = !String.IsNullOrEmpty(this.oRecAdminVM.Wastage) ? this.oRecAdminVM.Wastage : String.Empty;
            objInfusionAdminDetail.oInfusionBagDetail.WastageUOM = new UOM();
            let WastageUOM: number;
            if (this.oRecAdminVM.WastageUOM) {
            Number.TryParse(this.oRecAdminVM.WastageUOM.Value, (o) => { WastageUOM = o; })                
            }
            //Number.TryParse(this.oRecAdminVM.WastageUOM.Value, (o) => { WastageUOM = o; })
            objInfusionAdminDetail.oInfusionBagDetail.WastageUOM.UOMId = (this.oRecAdminVM.WastageUOM != null && !String.IsNullOrEmpty(this.oRecAdminVM.WastageUOM.Value)) ? WastageUOM : 0;
            if (this.oRecAdminVM.VolumeInfusedUOM != null && !String.IsNullOrEmpty(this.oRecAdminVM.VolumeInfused) && this.oRecAdminVM.VolumeInfusedUOM.Tag != null)
                oAdministrationDetail.TotalVolumeInfused = Convert.ToString(CInfusionHelper.Convertml(Number.Parse(this.oRecAdminVM.VolumeInfused), this.oRecAdminVM.VolumeInfusedUOM.Tag.ToString()));
            oAdministrationDetail.TotalVolumeInfusedUOMName = this.UOMValue();
            objInfusionAdminDetail.oInfusionBagDetail.AdminEndTime = this.oRecAdminVM.AdministeredstopDate.AddTime(this.oRecAdminVM.AdministeredstopDateTime);
        }
        return objInfusionAdminDetail;
    }
    public UOMValue(): string {
        let UomValue: CListItem = new CListItem();
        if (this.oRecAdminVM.VolumeInfusedUOMList != null)
            UomValue = this.oRecAdminVM.VolumeInfusedUOMList.Where(c => c.Tag.ToString() == "UOM-25").Select(s => s).FirstOrDefault();
        return UomValue.Value.ToString();
    }
    public TimeBaseUOMCode(OID: string): string {
        let UomOID: CListItem = new CListItem();
        if (this.oRecAdminVM.InfusionPeriodMedAdminUOMList != null)
            UomOID = this.oRecAdminVM.InfusionPeriodMedAdminUOMList.Where(c => c.Value == OID).Select(s => s).FirstOrDefault();
        return UomOID.Tag.ToString();
    }
    public ShowAlertMessage(oAlertInfo: AlertsInfo): void {
        let sErrorMsg: string = String.Empty;
        if (oAlertInfo != null && (!String.IsNullOrEmpty(oAlertInfo.Alert))) {
            switch (oAlertInfo.Alert) {
                case InfChartAlert.STEP_DOSE_FLOW_RATE_ALERT:
                case InfChartAlert.FLOW_RATE_CHANGE_ALERT:
                    sErrorMsg = String.Format(MedsAdminChartToolTip.InfChartRateChngAlert_MsgText, oAlertInfo.PreInfRate, oAlertInfo.InfRate);
                    break;
                case InfChartAlert.AMENDMENT_ALERT:
                    sErrorMsg = "Drug that is being recorded has been amended by user " + oAlertInfo.ModifiedBy + ", " + oAlertInfo.ModifiedAt.ToString(CConstants.DateTimeFormat);
                    sErrorMsg = sErrorMsg + "\r\n";
                    sErrorMsg = sErrorMsg + "Please mark this  as not given or stop this infusion if in progress and  proceed with the new prescription.";
                    break;
                case InfChartAlert.DISCONTINUATION_ALERT:
                    sErrorMsg = String.Format(MedsAdminChartToolTip.InfChartDisCntdAlert_MsgText1, oAlertInfo.ModifiedBy, oAlertInfo.ModifiedAt.ToString(CConstants.DateTimeFormat));
                    sErrorMsg = sErrorMsg + "\r\n";
                    sErrorMsg = sErrorMsg + "\r\n" + MedsAdminChartToolTip.InfChartDisCntdAlert_MsgText2;
                    break;
            }
            if (!String.IsNullOrEmpty(sErrorMsg)) {
                this.ShowErrorMessage(sErrorMsg, MessageBoxButton.OKCancel, MessageBoxType.Exclamation,/*MsgBoxTag:*/CConstants.InfusionWarning,/*MsgBoxHeight:*/160,/*MsgBoxWidth:*/410);
            }
        }
    }
    public StartTimeValidation(AdministeredDate: DateTime, AdministeredDateTime: DateTime): boolean {
        if (DateTime.NotEquals(AdministeredDate , DateTime.MinValue) && DateTime.NotEquals(AdministeredDateTime , DateTime.MinValue) && this.oRecAdminVM.InfAdministeredTimes != null && this.oRecAdminVM.InfAdministeredTimes.Count > 0) {
            let GivenDTTM: DateTime = AdministeredDate.DateTime.AddHours(AdministeredDateTime.Hour).AddMinutes(AdministeredDateTime.Minute);
            let InfAdminTime = this.oRecAdminVM.InfAdministeredTimes.Where(c => GivenDTTM >= c.InfusionStartDTTM && GivenDTTM <= c.InfusionEndDTTM).Select(c => c);
            if (InfAdminTime != null && InfAdminTime.Count() > 0) {
                return true;
            }
        }
        return false;
    }
    public EndTimeValidation(AdministeredDate: DateTime, AdministeredDateTime: DateTime): boolean {
        let EndDTTM: DateTime = AdministeredDate.DateTime.AddHours(AdministeredDateTime.Hour).AddMinutes(AdministeredDateTime.Minute);
        if (this.oRecAdminVM != null && this.oRecAdminVM.InfAdministeredTimes != null && this.oRecAdminVM.InfAdministeredTimes.Count > 0) {
            let ncount: number = this.oRecAdminVM.InfAdministeredTimes.Count;
            let INFEndDTTM: DateTime = DateTime.MinValue;
            let INFStartDTTM: DateTime = DateTime.MinValue;
            let oTempAdminDTTM = this.oRecAdminVM.InfAdministeredTimes.Where(oAdminDTTM => (DateTime.GreaterThanOrEqualTo(oAdminDTTM.InfusionStartDTTM , this.oRecAdminVM.AdministeredDateTime))).OrderBy(o => o.InfusionStartDTTM).Select(oAdminDTTM => oAdminDTTM).ToList();
            if (oTempAdminDTTM != null && oTempAdminDTTM.Count > 0 && DateTime.GreaterThanOrEqualTo(EndDTTM, oTempAdminDTTM[0].InfusionStartDTTM)) {
                return false;
            }
        }
        return true;
    }
    protected FillCommonInfusionDetails(refInfusionAdminDetail: InfusionAdminDetail): void {
        if (refInfusionAdminDetail == null)
            return
        if (this.oRecAdminVM.InfusionAction != MedicationAction.CHANGEFLOWRATE) {
            refInfusionAdminDetail.InfusionRate = this.oRecAdminVM.InfusionRate;
            let InfRateNumOID: number = 0, InfRateDenomOID = 0;
            refInfusionAdminDetail.InfusionRateUOM = new UOM();
            if (this.oRecAdminVM.InfusionRateUOMNumerator != null && Number.TryParse(this.oRecAdminVM.InfusionRateUOMNumerator.Value, (o) => { InfRateNumOID = o; })) {
                refInfusionAdminDetail.InfusionRateUOM.UOMId = InfRateNumOID;
                refInfusionAdminDetail.InfusionRateUOM.UOMCode = this.oRecAdminVM.InfusionRateUOMNumerator.Tag.ToString();
            }
            refInfusionAdminDetail.InfusionRatePerUOM = new UOM();
            if (this.oRecAdminVM.InfusionRateUOMNumerator != null && Number.TryParse(this.oRecAdminVM.InfusionRateUOMDenominator.Value, (o) => { InfRateDenomOID = o; })) {
                refInfusionAdminDetail.InfusionRatePerUOM.UOMId = InfRateDenomOID;
                refInfusionAdminDetail.InfusionRatePerUOM.UOMCode = this.oRecAdminVM.InfusionRateUOMDenominator.Tag.ToString();
            }
        }
        if (!String.IsNullOrEmpty(this.oRecAdminVM.ConcentrationStrength) && !String.Equals(this.oRecAdminVM.ConcentrationStrength, "0") && !String.IsNullOrEmpty(this.oRecAdminVM.ConcentrationVolume) && !String.Equals(this.oRecAdminVM.ConcentrationVolume, "0") && this.oRecAdminVM.ConcentrationStrengthUOM != null && !String.IsNullOrEmpty(this.oRecAdminVM.ConcentrationStrengthUOM.Value) && this.oRecAdminVM.ConcentrationVolumeUOM != null && !String.IsNullOrEmpty(this.oRecAdminVM.ConcentrationVolumeUOM.Value)) {
            refInfusionAdminDetail.ConcentrationStrength = this.oRecAdminVM.ConcentrationStrength;
            refInfusionAdminDetail.ConcentrationStrengthUOM = new UOM();
            let ConStrengthOID: number = 0, ConVolOID = 0;
            if (this.oRecAdminVM.ConcentrationStrengthUOM != null && Number.TryParse(this.oRecAdminVM.ConcentrationStrengthUOM.Value, (o) => { ConStrengthOID = o; })) {
                refInfusionAdminDetail.ConcentrationStrengthUOM.UOMId = ConStrengthOID;
            }
            refInfusionAdminDetail.ConcentrationVolume = this.oRecAdminVM.ConcentrationVolume;
            refInfusionAdminDetail.ConcentrationVolumeUOM = new UOM();
            if (this.oRecAdminVM.ConcentrationVolumeUOM != null && Number.TryParse(this.oRecAdminVM.ConcentrationVolumeUOM.Value, (o) => { ConVolOID = o; })) {
                refInfusionAdminDetail.ConcentrationVolumeUOM.UOMId = ConVolOID;
            }
        }
        if (!String.IsNullOrEmpty(this.oRecAdminVM.InfusionDose) && this.oRecAdminVM.InfusionDoseNumeratorUOMID > 0 && this.oRecAdminVM.InfusionDoseNumeratorUOMID > 0) {
            refInfusionAdminDetail.InfusionDose = this.oRecAdminVM.InfusionDose;
            refInfusionAdminDetail.InfusionDoseUOMNumerator = new UOM();
            refInfusionAdminDetail.InfusionDoseUOMNumerator.UOMId = this.oRecAdminVM.InfusionDoseNumeratorUOMID;
            refInfusionAdminDetail.InfusionDoseUOMDenominator = new UOM();
            refInfusionAdminDetail.InfusionDoseUOMDenominator.UOMId = this.oRecAdminVM.InfusionDoseDenominatorUOMID;
        }
    }
    protected FillRecalculateEstCompletionTime(): void {
        if (this.objReq != null && this.objReq.objSlotDetailBC != null && this.objReq.objSlotDetailBC.AdministrationDetail != null && this.objReq.objSlotDetailBC.AdministrationDetail.oInfusionAdminDetail != null && this.objReq.objSlotDetailBC.AdministrationDetail.oInfusionAdminDetail.Count > 0) {
            this.objReq.objSlotDetailBC.AdministrationDetail.oInfusionAdminDetail[0].IsEndTimeRecalculated = this.oRecAdminVM.IsRecalculateEstCompletionTime;
        }
    }
}
