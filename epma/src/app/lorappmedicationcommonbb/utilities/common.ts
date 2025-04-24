import { Component, OnInit } from '@angular/core';
import {
    StringBuilder,
    ProfileFactoryType,
    ContextManager,
    Convert,
    AppActivity,
    DayOfWeek,
    ScriptObject,
    LzoWizard,
} from 'epma-platform/services';
import {
    Level,
    ProfileContext,
    OnProfileResult,
    IProfileProp,
    Byte,
    Decimal,
    decimal,
    Double,
    Float,
    Int64,
    long,
    Long,
    StringComparison,
    AppDialogEventargs,
    AppDialogResult,
    DelegateArgs,
    DialogComponentArgs,
    WindowButtonType,
    CListItem,
    ObservableCollection,
    CContextInformation,
    List,
    HtmlPage,
    StringSplitOptions
} from 'epma-platform/models';
import { AppDialog, iComboBox, iLabel, iTextBox } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { Resource } from '../resource';
import {
    MessageEventArgs,
    MessageBoxResult,
    iMessageBox,
    MessageBoxButton,
    MessageBoxType,
    MessageBoxDelegate,
} from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import {
    AppContextInfo,
    ContextInfo,
    PatientContext,
} from 'src/app/lorappcommonbb/utilities/globalvariable';
import { DripRateCalcVM } from '../viewmodel/dripratecalcvm';
import { GrdAdminstrativeTimesCols } from '../viewmodel/prescriptionitemdetailsvm';
import { AdminstrativeTimesVM } from '../viewmodel/adminstrativetimesvm';
import { MedicationCommonConceptCodeData } from './profiledata';
import { IPPFrequency } from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { ConstDurationUOM } from './constants';
import { CValuesetTerm } from 'src/app/shared/epma-platform/soap-client/CReferenceWS';
import { EventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { DispatcherTimer } from 'src/app/shared/epma-platform/services/DispatcherTimer.service';
import { InfDripRateCalculator } from '../child/InfDripRateCalculator';
export enum eActivityTypes {
    Prescribe = "Prescribe",

    Reorder = "Reorder",

    Amend = "Amend",

    Authorise = "Authorise",

    ClinicallyVerify = "ClinicallyVerify",

    UpdateWarning = "UpdateWarning",

    UnHold = "UnHold",

    ConflictUpdate = "ConflictUpdate",

    Reconcile = "Reconcile",

    DRCConflictUpdate = "DRCConflictUpdate",

    None = "None",
}
export class DripRateCommon {
    objMsgBox: iMessageBox;
    txtInfusionRatevol: iTextBox;
    txtdropfac: iTextBox;
    cboInfustionRatevolUOM: iComboBox;
    cboInfusionRatevolUOM: iComboBox;
    lblcalcdripratevalue: iLabel;
    fieldname: string = String.Empty;
    res: string = String.Empty;
    public oDripRateParams: DripRateParams;
    public static FillContext(): CContextInformation {
        let obj: CContextInformation = new CContextInformation();
        obj.ReleaseVersion = ContextInfo.ReleaseVersion;
        obj.UserID = ContextInfo.UserOID;
        obj.SecurityToken = ContextInfo.SecurityToken;
        obj.PatientID = PatientContext.PatientOID.ToString();
        obj.OrganizationID = AppContextInfo.OrganisationOID;
        return obj;
    }
    public DefaultInfConcentration: number;
    public DefaultInfConcentrationUOM: CListItem;
    public DefaultInfConcentrationPerUOM: CListItem;
    public DefaultInfRateInVol: number;
    public DefaultInfRateInVolUOM: CListItem;
    public DefaultInfRateInVolPerUOM: CListItem;
    public DefaultDropFactor: number;
    public DefaultDripRate: string;
    public IsMedicationActionBegun: boolean;
    _oCallBack: Function;
    public LaunchDripRateCalculator(
        oDripRateParams: DripRateParams,
        oCallBack: Function
    ): void {
        let objDripRateCalcVM: DripRateCalcVM = new DripRateCalcVM();
        objDripRateCalcVM.Drugname = oDripRateParams.sDrugname;
        if (oDripRateParams.PrescInfRate > 0)
            objDripRateCalcVM.InfRateInDose = oDripRateParams.PrescInfRate;
            if(oDripRateParams.PrescInfRateUOM){
                if (oDripRateParams.PrescInfRateUOM.Value) {
                    objDripRateCalcVM.InfRateInDoseUOM = oDripRateParams.PrescInfRateUOM;
                }
            }
        // objDripRateCalcVM.InfRateInDoseUOM = oDripRateParams.PrescInfRateUOM;
        if(oDripRateParams.PrescInfRatePerUOM){
            if (oDripRateParams.PrescInfRatePerUOM.Value) {
                objDripRateCalcVM.InfRateInDosePerUOM = oDripRateParams.PrescInfRatePerUOM;
            }
        }
        // objDripRateCalcVM.InfRateInDosePerUOM = oDripRateParams.PrescInfRatePerUOM;
        if (oDripRateParams.PrescVolume > 0)
            objDripRateCalcVM.InfVolume = oDripRateParams.PrescVolume;
        objDripRateCalcVM.temVolumeUOM = oDripRateParams.PrescVolumeUOM;
        if (oDripRateParams.Dose > 0)
            objDripRateCalcVM.InfStrength = oDripRateParams.Dose;
        objDripRateCalcVM.InfStrengthUOM = oDripRateParams.PrescDoseUOM;
        objDripRateCalcVM.IdentifyingOID = oDripRateParams.IdentifyingOID;
        objDripRateCalcVM.IdentifyingType = oDripRateParams.IdentifyingType;
        objDripRateCalcVM.PresItemOID = oDripRateParams.PrscItemOID;
        objDripRateCalcVM.DoseTypeValue = oDripRateParams.DoseType;
        objDripRateCalcVM.IsEnabledInfusionrate =
            oDripRateParams.EnableInfusionrate;
        objDripRateCalcVM.InfStrengthUOMList =
            oDripRateParams.ConcentrationsStrengthUOMlst;
        objDripRateCalcVM.InfVolumeUOMList =
            oDripRateParams.ConcentrationVolumeUOMlst;
        if (this.DefaultDropFactor > 0)
            objDripRateCalcVM.DropFactor = this.DefaultDropFactor;
        if (!String.IsNullOrEmpty(this.DefaultDripRate))
            objDripRateCalcVM.DripRate = Convert.ToDouble(this.DefaultDripRate);
        if (this.IsMedicationActionBegun) {
            objDripRateCalcVM.InfConcentration = this.DefaultInfConcentration;
            objDripRateCalcVM.InfConcentrationUOM =
                this.DefaultInfConcentrationUOM != null
                    ? this.DefaultInfConcentrationUOM
                    : null;
            objDripRateCalcVM.InfConcentrationPerUOM =
                this.DefaultInfConcentrationPerUOM != null
                    ? this.DefaultInfConcentrationPerUOM
                    : null;
            if (this.DefaultInfRateInVol > 0)
                objDripRateCalcVM.InfRateInVolume = this.DefaultInfRateInVol;
            objDripRateCalcVM.InfRateInVolumeUOM = this.DefaultInfRateInVolUOM;
            objDripRateCalcVM.InfRateInVolumePerUOM = this.DefaultInfRateInVolPerUOM;
        }
        //Not Required for LHS. To be Re-Visited.

        let DripCalculatorView: InfDripRateCalculator = new InfDripRateCalculator(objDripRateCalcVM);
        DripCalculatorView.DataContext = objDripRateCalcVM;
        this._oCallBack = oCallBack;
        // setTimeout(() => {
            AppActivity.OpenWindow("Infusion rate/Drip rate calculator", DripCalculatorView, (s, e) => { this.OnDripRateCalculatorView_Closed(s); }, oDripRateParams.sDrugname, false, 620, 570, true, WindowButtonType.OkCancel, null);           
        // }, 0);

    }
    OnDripRateCalculatorView_Closed(args: AppDialogEventargs): void {
        if (args.Result == AppDialogResult.Ok) {
            if (this._oCallBack != null) {
                //Not Required for LHS. To be Re-Visited.

                let objDripRateCalcVM: DripRateCalcVM = ObjectHelper.CreateType<DripRateCalcVM>((ObjectHelper.CreateType<InfDripRateCalculator>(args.Content.Component, InfDripRateCalculator)).DataContext, DripRateCalcVM);
                this.txtInfusionRatevol = ObjectHelper.CreateType<iTextBox>((ObjectHelper.CreateType<InfDripRateCalculator>(args.Content.Component, InfDripRateCalculator)).txtInfusionRatevol, iTextBox);
                this.cboInfustionRatevolUOM = ObjectHelper.CreateType<iComboBox>((ObjectHelper.CreateType<InfDripRateCalculator>(args.Content.Component, InfDripRateCalculator)).cboInfustionRatevolUOM, iComboBox);
                this.cboInfusionRatevolUOM = ObjectHelper.CreateType<iComboBox>((ObjectHelper.CreateType<InfDripRateCalculator>(args.Content.Component, InfDripRateCalculator)).cboInfusionRatevolUOM, iComboBox);
                this.txtdropfac = ObjectHelper.CreateType<iTextBox>((ObjectHelper.CreateType<InfDripRateCalculator>(args.Content.Component, InfDripRateCalculator)).txtdropfac, iTextBox);
                this.lblcalcdripratevalue = ObjectHelper.CreateType<iLabel>((ObjectHelper.CreateType<InfDripRateCalculator>(args.Content.Component, InfDripRateCalculator)).lblcalcdripratevalue, iLabel);
                if (objDripRateCalcVM != null) {
                    if (this.InfusionRate(objDripRateCalcVM)) {
                        this._oCallBack(AppChildDialogAction.Ok, objDripRateCalcVM);
                        args.AppChildWindow.DialogResult = true;
                    }
                }

            }
        } else {
            this._oCallBack(AppChildDialogAction.Cancel, null);
            args.AppChildWindow.DialogResult = true;
        }
    }
    //public delegate void OnAppChildDialogClose(AppChildDialogAction oDlgAction, object oResult);
    objMsgBox_Closed(sender: Object, e: EventArgs): void {
        switch (this.fieldname) {
            case 'txtInfusionRatevol':
                this.txtInfusionRatevol.Focus();
                break;
            case 'cboInfustionRatevolUOM':
                this.cboInfustionRatevolUOM.Focus();
                break;
            case 'cboInfusionRatevolUOM':
                this.cboInfusionRatevolUOM.Focus();
                break;
            case 'txtdropfac':
                this.txtdropfac.Focus();
                break;
        }
    }
    public InfusionRate(objDripRateCalcVM: DripRateCalcVM): boolean {
        let msgbox: boolean = true;
        this.objMsgBox = ObjectHelper.CreateObject(new iMessageBox(), {
            Title: Resource.InfusionChart.Lorenzo_Title,
            Message: Resource.InfusionChart.InfRateInDose_Empty_Msg,
            MessageButton: MessageBoxButton.OK,
            IconType: MessageBoxType.Question,
        });
        this.objMsgBox.Closed = (s, e) => {
            this.objMsgBox_Closed(s, e);
        };
        if (
            (this.txtInfusionRatevol != null &&
                String.IsNullOrEmpty(this.txtInfusionRatevol.Text)) ||
            Convert.ToDecimal(objDripRateCalcVM.InfRateInVolume) == 0
        ) {
            msgbox = false;
            if (this.objMsgBox != null) {
                this.objMsgBox.Message = Resource.InfusionChart.InfRateMan_Msg;
                this.objMsgBox.Show();
                objDripRateCalcVM.InfRateInVolume = null;
                this.fieldname = 'txtInfusionRatevol';
            }
        } else if (
            objDripRateCalcVM.InfRateInVolume != null &&
            Convert.ToDecimal(objDripRateCalcVM.InfRateInVolume) != 0 &&
            (objDripRateCalcVM.InfRateInVolumeUOM == null ||
                String.IsNullOrEmpty(objDripRateCalcVM.InfRateInVolumeUOM.Value))
        ) {
            msgbox = false;
            if (this.objMsgBox != null) {
                this.objMsgBox.Message = Resource.InfusionChart.InfRateUOMMan_Msg;
                this.objMsgBox.Show();
                this.fieldname = 'cboInfustionRatevolUOM';
            }
        } else if (
            objDripRateCalcVM.InfRateInVolume != null &&
            Convert.ToDecimal(objDripRateCalcVM.InfRateInVolume) != 0 &&
            objDripRateCalcVM.InfRateInVolumeUOM != null &&
            !String.IsNullOrEmpty(objDripRateCalcVM.InfRateInVolumeUOM.Value) &&
            (objDripRateCalcVM.InfRateInVolumePerUOM == null ||
                String.IsNullOrEmpty(objDripRateCalcVM.InfRateInVolumePerUOM.Value))
        ) {
            msgbox = false;
            if (this.objMsgBox != null) {
                this.objMsgBox.Message = Resource.InfusionChart.InfRateUOMMan_Msg;
                this.objMsgBox.Show();
                this.fieldname = 'cboInfusionRatevolUOM';
            }
        } else if (
            this.txtdropfac != null &&
            !String.IsNullOrEmpty(this.txtdropfac.Text) &&
            Convert.ToDecimal(this.txtdropfac.Text) == 0
        ) {
            msgbox = false;
            if (this.objMsgBox != null) {
                this.objMsgBox.Message = Resource.InfusionChart.DropFactorZero_Msg;
                this.objMsgBox.Show();
                this.fieldname = 'txtdropfac';
            }
        } else if (
            this.lblcalcdripratevalue != null &&
            !String.IsNullOrEmpty(this.lblcalcdripratevalue.Text) &&
            Convert.ToDecimal(this.lblcalcdripratevalue.Text) == 0
        ) {
            msgbox = false;
            if (this.objMsgBox != null) {
                this.objMsgBox.Message = Resource.InfusionChart.DropFactorZero_Msg;
                this.objMsgBox.Show();
                this.fieldname = 'txtdropfac';
            }
        }
        return msgbox;
    }
}
export class DrugName {
    public IdentifyingName(VMVPIDTName: string, IdentifyingName: string): string {
        let sVMVPIdentName: string = String.Empty;
        if (
            !String.IsNullOrEmpty(VMVPIDTName) &&
            !String.IsNullOrEmpty(IdentifyingName)
        ) {
            sVMVPIdentName = VMVPIDTName + ' - ' + IdentifyingName;
        } else if (!String.IsNullOrEmpty(IdentifyingName)) {
            sVMVPIdentName = IdentifyingName;
        }
        return sVMVPIdentName;
    }
}
export class MCommonBB {
    public static CalculateEndDTTMForDaysDuration(
        oAdminTimesGrdData: ObservableCollection<GrdAdminstrativeTimesCols>,
        StartDate: DateTime,
        StartTime: DateTime,
        IsFixedTime: boolean,
        NoOfDays: number,
        out1: (StartDTTM: DateTime) => void,
        out2: (StopDTTM: DateTime) => void
    ): void {
        let StartDTTM: DateTime;
        let StopDTTM: DateTime;

        StartDTTM = StartDate;
        StopDTTM = DateTime.MinValue;
        let _IsPartiallyCrossedStartDate: boolean, _IsDayCrossedStartDate;
    if (DateTime.NotEquals(StartDate, DateTime.MinValue) && NoOfDays > 0) {
            if (oAdminTimesGrdData != null) {
                if (
                    oAdminTimesGrdData.Count > 0 &&
                    oAdminTimesGrdData[0].oFrequency != null &&
                    String.Equals(
                        oAdminTimesGrdData[0].oFrequency.UOM,
                        ConstDurationUOM.Weeks,
                        StringComparison.InvariantCultureIgnoreCase
                    )
                ) {
                    StopDTTM = StartDate.DateTime.AddDays(NoOfDays).AddMinutes(-1);
                } else {
                    MCommonBB.CheckPartiallyorDayCrossed(
                        oAdminTimesGrdData,
                        StartDate,
                        StartTime,
                        IsFixedTime,
                        (o1) => {
                            _IsPartiallyCrossedStartDate = o1;
                        },
                        (o2) => {
                            _IsDayCrossedStartDate = o2;
                        }
                    );
                    if (_IsDayCrossedStartDate) {
                        StartDTTM = StartDate.DateTime.AddDays(1);
                        StopDTTM = StartDTTM.DateTime.AddDays(NoOfDays).AddMinutes(-1);
                    } else {
                        StopDTTM = StartDate.DateTime.AddDays(NoOfDays).AddMinutes(-1);
                    }
                }
            } else {
                StopDTTM = StartDate.AddDays(NoOfDays).AddMinutes(-1);
            }
        }

        out1(StartDTTM);
        out2(StopDTTM);
    }

    public static CheckPartiallyorDayCrossed(
        oAdminTimesGrdData: ObservableCollection<GrdAdminstrativeTimesCols>,
        StartDate: DateTime,
        StartTime: DateTime,
        IsFixedTime: boolean,
        out1: (_IsPartiallyCrossedStartDate: boolean) => void,
        out2: (_IsDayCrossedStartDate: boolean) => void
    ): void {
        let _IsPartiallyCrossedStartDate: boolean;
        let _IsDayCrossedStartDate: boolean;

        _IsPartiallyCrossedStartDate = false;
        _IsDayCrossedStartDate = false;
        let _PartiallyCrossedStartDateCount: number = 0;
        let dTempScheduleDTTM: DateTime;
        if (oAdminTimesGrdData != null && oAdminTimesGrdData.Count > 0) {
            let nAdminTimeCount: number = oAdminTimesGrdData.Count;
            let IsDrugroundTimeNotExists: boolean = true;
            let IsFixedTimeNotExists: boolean = false;
            if (
                nAdminTimeCount == 1 &&
                String.IsNullOrEmpty(oAdminTimesGrdData[0].DruRoundTimes)
            ) {
                IsDrugroundTimeNotExists = true;
            } else if (nAdminTimeCount > 1) {
                IsDrugroundTimeNotExists = oAdminTimesGrdData.All(
                    (x) =>
                        String.IsNullOrEmpty(x.DruRoundTimes) ||
                        String.Equals(x.DruRoundTimes, '00:00')
                );
            }
            if (IsDrugroundTimeNotExists) {
                IsFixedTimeNotExists =
                    nAdminTimeCount > 1 &&
                    oAdminTimesGrdData.All(
                        (x) =>
                            String.IsNullOrEmpty(x.FixedTimes) ||
                            String.Equals(x.FixedTimes, '00:00')
                    );
            }
            let _PresItemStartDTTM: DateTime;
      if (DateTime.NotEquals(StartTime, DateTime.MinValue)) {
                _PresItemStartDTTM = StartDate.DateTime.AddTime(StartTime);
            } else {
                _PresItemStartDTTM = StartDate;
            }
            let _IsFixedTime: boolean = IsFixedTime;
            if (!IsDrugroundTimeNotExists || !IsFixedTimeNotExists) {
                for (let i: number = 0; i < nAdminTimeCount; i++) {
                    let ts: TimeSpan = new TimeSpan();
                    let bResult: boolean = false;
                    if (
                        _IsFixedTime &&
                        !String.IsNullOrEmpty(oAdminTimesGrdData[i].FixedTimes)
                    ) {
                        bResult = TimeSpan.TryParse(
                            oAdminTimesGrdData[i].FixedTimes,
                            (o) => {
                                ts = o;
                            }
                        );
                    } else if (
                        !String.IsNullOrEmpty(oAdminTimesGrdData[i].DruRoundTimes)
                    ) {
                        bResult = TimeSpan.TryParse(
                            oAdminTimesGrdData[i].DruRoundTimes,
                            (o) => {
                                ts = o;
                            }
                        );
                    }
                    if (bResult) {
                        dTempScheduleDTTM = StartDate.DateTime.Add(ts);
            if (DateTime.LessThan(dTempScheduleDTTM, _PresItemStartDTTM)) {
                            _PartiallyCrossedStartDateCount++;
                        }
                    }
                }
                if (_PartiallyCrossedStartDateCount == 0) {
                    _IsDayCrossedStartDate = false;
                    _IsPartiallyCrossedStartDate = false;
                } else if (_PartiallyCrossedStartDateCount == nAdminTimeCount) {
                    _IsDayCrossedStartDate = true;
                    _IsPartiallyCrossedStartDate = false;
                } else {
                    _IsDayCrossedStartDate = false;
                    _IsPartiallyCrossedStartDate = true;
                }
            }
        }

        out1(_IsPartiallyCrossedStartDate);
        out2(_IsDayCrossedStartDate);
    }

    public static GetFirstDateOfweek(
        dtDOWStartDTTM: DateTime,
        EndDTTM: DateTime,
        oIPPFrequency: IPPFrequency,
        oAdminTimeVM: AdminstrativeTimesVM
    ): DateTime {
        let FirstDateOfWeek: DateTime = DateTime.MinValue;
        if (oAdminTimeVM != null || oIPPFrequency != null) {
            let _IsSun: boolean, _IsMon, _IsTue, _IsWed, _IsThu, _IsFri, _IsSat;
            _IsSun = _IsMon = _IsTue = _IsWed = _IsThu = _IsFri = _IsSat = false;
            let nSelectedDayCnt: number = 0;
            if (oAdminTimeVM != null) {
                _IsSun = oAdminTimeVM.IsSun;
                _IsMon = oAdminTimeVM.IsMon;
                _IsTue = oAdminTimeVM.IsTue;
                _IsWed = oAdminTimeVM.IsWed;
                _IsThu = oAdminTimeVM.IsThu;
                _IsFri = oAdminTimeVM.IsFri;
                _IsSat = oAdminTimeVM.IsSat;
                nSelectedDayCnt =
                    (_IsSun ? 1 : 0) +
                    (_IsMon ? 1 : 0) +
                    (_IsTue ? 1 : 0) +
                    (_IsWed ? 1 : 0) +
                    (_IsThu ? 1 : 0) +
                    (_IsFri ? 1 : 0) +
                    (_IsSat ? 1 : 0);
            }
            if (oIPPFrequency != null && nSelectedDayCnt == 0) {
                _IsSun = oIPPFrequency.IsSunday;
                _IsMon = oIPPFrequency.IsMonday;
                _IsTue = oIPPFrequency.IsTuesday;
                _IsWed = oIPPFrequency.IsWednesday;
                _IsThu = oIPPFrequency.IsThursday;
                _IsFri = oIPPFrequency.IsFriday;
                _IsSat = oIPPFrequency.IsSaturday;
                nSelectedDayCnt =
                    (_IsSun ? 1 : 0) +
                    (_IsMon ? 1 : 0) +
                    (_IsTue ? 1 : 0) +
                    (_IsWed ? 1 : 0) +
                    (_IsThu ? 1 : 0) +
                    (_IsFri ? 1 : 0) +
                    (_IsSat ? 1 : 0);
            }
      if (DateTime.NotEquals(dtDOWStartDTTM, DateTime.MinValue) && nSelectedDayCnt > 0) {
        if (DateTime.Equals(EndDTTM, DateTime.MinValue)) {
                    EndDTTM = dtDOWStartDTTM.DateTime.AddDays(6);
                }
        while (DateTime.LessThanOrEqualTo(dtDOWStartDTTM, EndDTTM)) {
                    if (
                        (dtDOWStartDTTM.DayOfWeek == DayOfWeek.Sunday && _IsSun) ||
                        (dtDOWStartDTTM.DayOfWeek == DayOfWeek.Monday && _IsMon) ||
                        (dtDOWStartDTTM.DayOfWeek == DayOfWeek.Tuesday && _IsTue) ||
                        (dtDOWStartDTTM.DayOfWeek == DayOfWeek.Wednesday && _IsWed) ||
                        (dtDOWStartDTTM.DayOfWeek == DayOfWeek.Thursday && _IsThu) ||
                        (dtDOWStartDTTM.DayOfWeek == DayOfWeek.Friday && _IsFri) ||
                        (dtDOWStartDTTM.DayOfWeek == DayOfWeek.Saturday && _IsSat)
                    ) {
                        FirstDateOfWeek = dtDOWStartDTTM;
                        break;
                    } else {
                        dtDOWStartDTTM = dtDOWStartDTTM.DateTime.AddDays(1);
                    }
                }
            }
        }
        return FirstDateOfWeek;
    }
    public static GetSupplyInstructionTermText(
        UnresolvedSupplyInstConceptCode: StringBuilder,
        SourceForSupplyInstTermText: StringBuilder
    ): StringBuilder {
        let oSupplyInstLst: List<CListItem> = null;
        let sbTempSupplyInst: StringBuilder = null;
        if (
            UnresolvedSupplyInstConceptCode != null &&
            UnresolvedSupplyInstConceptCode.Length > 0 &&
            SourceForSupplyInstTermText != null &&
            SourceForSupplyInstTermText.Length > 0
        ) {
            oSupplyInstLst = MCommonBB.GetResolvedSupplyInstTermText(
                UnresolvedSupplyInstConceptCode
            );
            if (oSupplyInstLst != null && oSupplyInstLst.Count > 0) {
                sbTempSupplyInst = new StringBuilder();
                let oTempSupplyInst: string[] =
                    SourceForSupplyInstTermText.ToString().Split(
                        ';',
                        StringSplitOptions.None
                    );
                let nSupplyInstCount: number = oTempSupplyInst.Count();
                for (let k: number = 0; k < nSupplyInstCount; k++) {
                    let sTermText: string = oSupplyInstLst
                        .Where((c) =>
                            String.Equals(
                                c.Value,
                                oTempSupplyInst[k],
                                StringComparison.InvariantCultureIgnoreCase
                            )
                        )
                        .Select((s) => s.DisplayText)
                        .FirstOrDefault();
                    if (!String.IsNullOrEmpty(sTermText)) {
                        sbTempSupplyInst.Append(sTermText);
                        sbTempSupplyInst.Append(';');
                    } else {
                        sbTempSupplyInst.Append(oTempSupplyInst[k]);
                        sbTempSupplyInst.Append(';');
                    }
                }
            }
        }
        return sbTempSupplyInst;
    }
    public static GetResolvedSupplyInstTermText(
        UnresolvedSupInst: StringBuilder
    ): List<CListItem> {
        let oSupplyInstLst: List<CListItem> = null;
        if (UnresolvedSupInst != null && UnresolvedSupInst.Length > 0) {
            let oResultValue: ScriptObject = ObjectHelper.CreateType<ScriptObject>(
                HtmlPage.Window.Invoke(
                    'GetResolveTermText',
                    UnresolvedSupInst.ToString()
                ),
                'ScriptObject'
            );
            oSupplyInstLst = new List<CListItem>();
            let oClistItem: CListItem;
            if (oResultValue != null) {
                let oSupplyConceptCode: string[] = UnresolvedSupInst.ToString().Split(
                    '~^~',
                    StringSplitOptions.None
                );
                if (oSupplyConceptCode != null) {
                    let nKeyCount: number = oSupplyConceptCode.length;
                    for (let i: number = 0; i < nKeyCount; i++) {
                        if (!String.IsNullOrEmpty(oSupplyConceptCode[i])) {
                            oClistItem = new CListItem();
                            oClistItem.Value = oSupplyConceptCode[i];
                            let objSupplyTermText: Object = oResultValue[oSupplyConceptCode[i]];
                            oClistItem.DisplayText =
                                objSupplyTermText != null
                                    ? objSupplyTermText.ToString()
                                    : oSupplyConceptCode[i];
                            oSupplyInstLst.Add(oClistItem);
                            if (oSupplyInstLst.Count > 0) {
                                if (
                                    MedicationCommonConceptCodeData.ViewConceptCodes.Any(
                                        (c) =>
                                            !String.IsNullOrEmpty(c.csCode) &&
                                            !String.Equals(
                                                c.csCode,
                                                oClistItem.Value,
                                                StringComparison.InvariantCultureIgnoreCase
                                            )
                                    )
                                ) {
                                    MedicationCommonConceptCodeData.ViewConceptCodes.Add(
                                        ObjectHelper.CreateObject(new CValuesetTerm(), {
                                            csCode: oClistItem.Value,
                                            csDescription: oClistItem.DisplayText,
                                        })
                                    );
                                }
                            }
                        }
                    }
                }
            }
        }
        return oSupplyInstLst;
    }
}
export class SchedDayOfWeek {
    public oDayofweek: DayOfWeek;
    public SelectedDay: boolean;
}
export class LockingWarningTimer {
    oParam: string = String.Empty;
    public static TimerCount: number = 0;
    public static TimerInterval: number = 25;
    myTimer: DispatcherTimer = new DispatcherTimer();
    public StartWizardTimer(): void {
        this.myTimer.Interval = new TimeSpan(
            0,
            0,
            LockingWarningTimer.TimerInterval,
            0,
            0
        );
        this.myTimer.Tick = (s, e) => {
            this.Each_MinTick(s, e);
        };
        this.myTimer.Start();
    }
    private Each_MinTick(sender: Object, e: EventArgs): void {
        LockingWarningTimer.TimerCount =
            LockingWarningTimer.TimerCount + LockingWarningTimer.TimerInterval;
        if (LockingWarningTimer.TimerCount == LockingWarningTimer.TimerInterval) {
            let LockingMsg: string = Resource.prescribedrugs.LockingWarningMsg;
            // let returnValue: ScriptObject = ObjectHelper.CreateType<ScriptObject>(
            //     await HtmlPage.Window.InvokeAsync('ShowErrorMessage', '300008', LockingMsg),
            //     'ScriptObject'
            // );
            // console.log("medicationcommbonbb.returnValue",returnValue);
            LzoWizard.ShowErrorMessage('300008', LockingMsg);
        }
        //  else if (LockingWarningTimer.TimerCount > LockingWarningTimer.TimerInterval) {
        //this.myTimer.Tick -= this.Each_MinTick;
        // }
    }
    public StopWizardTimer(): void {
        if (this.myTimer != null) {
            //this.myTimer.Tick -= this.Each_MinTick;
            this.myTimer = null;
            if (LockingWarningTimer.TimerCount > 0) {
                LockingWarningTimer.TimerCount = 0;
            }
        }
    }
    private lockingTimerMsg_Closed(args: AppDialogEventargs): void {
        args.AppChildWindow.DialogResult = true;
    }
}
//export module DripRateCommon {
export enum AppChildDialogAction {
    Ok,

    Cancel,
}
//}
//export module DripRateCommon {
export class DripRateParams {
    public sDrugname: string;
    public PrescInfRate: number;
    public PrescInfRateUOM: CListItem;
    public PrescInfRatePerUOM: CListItem;
    public PrescVolume: number;
    public PrescVolumeUOM: string;
    public Dose: number;
    public PrescDoseUOM: CListItem;
    public IdentifyingOID: number;
    public IdentifyingType: string;
    public PrscItemOID: number;
    public DoseType: string;
    public oCallBack: Function;
    public ConcentrationsStrength: string;
    public ConcentrationVolume: string;
    public ConcentrationsStrengthUOM: CListItem;
    public ConcentrationVolumeUOM: CListItem;
    public ConcentrationsStrengthUOMlst: ObservableCollection<CListItem>;
    public ConcentrationVolumeUOMlst: ObservableCollection<CListItem>;
    public InfusionRateNumlist: ObservableCollection<CListItem>;
    public EnableInfusionrate: boolean;
    //  }
}
