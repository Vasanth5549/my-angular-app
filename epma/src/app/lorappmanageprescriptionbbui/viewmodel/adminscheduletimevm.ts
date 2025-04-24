import { Component, EventEmitter, OnInit } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, ObservableCollection, IEnumerable, List, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, Visibility, Nullable, TimeZoneInfo } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService } from '../../shared/epma-platform/soap-client/helper.service';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ProfileData } from '../utilities/profiledata';
import { ActivityTypes } from '../model/common';
import { PrescriptionTypes } from '../utilities/constants';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { CConstants } from '../utilities/constants';
import { Dictionary } from 'epma-platform/dictionary';
import { ClonableViewModelBase } from 'src/app/lorappmedicationcommonbb/model/cloneviewmodel';
import { IViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import * as IPPMAManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { ScheduleConfig } from 'src/app/lorappslprofiletypes/medication';
import 'epma-platform/booleanextension';
import 'epma-platform/numberextension';
import 'epma-platform/stringextension';
import { iMath } from 'epma-platform/mathextension';
import 'epma-platform/arrayextension';
import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';

export class AdminScheduleTimeVM extends ClonableViewModelBase implements IViewModelBase {
    static DoNotGenerateDSTSlots: boolean = true;
    constructor() {
        super();
        if (ProfileData.ScheduleConfig == null) {
            let profile: ProfileFactoryType = new ProfileFactoryType();
            profile.OnProfileLoaded = (s, e) => { this.profile_OnProfileLoaded(s, e); };
            profile.GetProfile<ScheduleConfig>("VW_MEDICONFIG", "MEDSCHEDULECONFIG");
        }
        else {
            this.SetProfileData();
        }
    }
    profile_OnProfileLoaded(sender: Object, Result: IProfileProp): void {
        if (Result == null)
            return
        ProfileData.ScheduleConfig = ObjectHelper.CreateType<ScheduleConfig>(Result.Profile, ScheduleConfig);
        this.SetProfileData();
    }
    private SetProfileData(): void {
        if (ProfileData.ScheduleConfig instanceof ScheduleConfig && ProfileData.ScheduleConfig != null) {
            this.IsDefaultFixedTime = String.Compare(ProfileData.ScheduleConfig.SlotTimesTypeForAdmin, "Y", StringComparison.CurrentCultureIgnoreCase) == 0;
        }
    }
    //public delegate void FrequrncyTypeChangedEventArgs(string FrequrncyType);
    public FrequrncyTypeChanged: Function;
    //public delegate void SlotModeChangedEventArgs();
    public SlotModeChanged: Function;
    //public delegate void DaysoftheWeekChangedEventArgs();
    public DaysofWeekChanged: Function;
    private _isSlotTimeModeEnable: boolean = false;
    private _isfixedTime: boolean = true;
    private _isDrugroundTime: boolean = false;
    private _daysOfWeekVisibility: Visibility = Visibility.Collapsed;
    private _isAdminTimesEnabled: boolean = true;
    private _freqDetails: IPPMAManagePrescSer.CResMsgGetAdministrationTimes;
    private _startDate: DateTime = DateTime.MinValue;
    private _stopDate: DateTime = DateTime.MinValue;
    private IsDefaultFixedTime: boolean = true;
    private _asRequired: boolean = false;
    private _isSavedPrescription: boolean = false;
    private _adminType: string;
    oAdminSchdTime: AdminScheduleTime;
    private _bIsPRNFreq: boolean = false;
    private _IsDaysOfWeekMandatory: boolean = true;
    private _IsAdminTimelblEnable: boolean = true;
    private _isVaildORIsVaildTime: boolean = false;
    private oTempAdminType: string = String.Empty;
    public _IsMsgShownAlready: boolean = false;
    public get IsMsgShownAlready(): boolean {
        return this._IsMsgShownAlready;
    }
    public set IsMsgShownAlready(value: boolean) {
        this._IsMsgShownAlready = value;
        //NotifyPropertyChanged("IsMsgShownAlready");
    }
    public Actioncode: string;
    public OriginalFrequencyOID: number = 0;
    public OriginalAsRequired: boolean = false;
    public get IsVaildORInvaildTime(): boolean {
        return this._isVaildORIsVaildTime;
    }
    public set IsVaildORInvaildTime(value: boolean) {
        this._isVaildORIsVaildTime = value;
    }
    public IsDaylightSavingTime: boolean = false;
    public get IsSavedPrescription(): boolean {
        return this._isSavedPrescription;
    }
    public set IsSavedPrescription(value: boolean) {
        this._isSavedPrescription = value;
    }
    public get AdminType(): string {
        return this._adminType;
    }
    public set AdminType(value: string) {
        this._adminType = value;
    }
    public get StartDTTM(): DateTime {
        return this._startDate;
    }
    public set StartDTTM(value: DateTime) {
        if (DateTime.NotEquals(this._startDate, value)) {
            this._startDate = value;
            this.UpdateAdministrationTimes();
        }
    }
    public get StopDTTM(): DateTime {
        return this._stopDate;
    }
    public set StopDTTM(value: DateTime) {
        if (DateTime.NotEquals(this._stopDate, value)) {
            this._stopDate = value;
            this.UpdateAdministrationTimes();
        }
    }
    public get AsRequired(): boolean {
        return this._asRequired;
    }
    public set AsRequired(value: boolean) {
        this._asRequired = value;
        if (!this.bIsPRNFreq) {
            this.SetSlotTimeModeState(this._freqDetails != null && this._freqDetails.oFrequency != null ? this._freqDetails.oFrequency.Type : String.Empty);
        }
        else {
            this.Clear();
        }
        if (this._asRequired && this.AdministrationScheduleTimes != null && this.AdministrationScheduleTimes.Count > 0) {
            this.IsSlotTimeModeEnable = true;
        }
        this.IsAdminTimesEnabled = !this._asRequired;
    }
    public get bIsPRNFreq(): boolean {
        return this._bIsPRNFreq;
    }
    public set bIsPRNFreq(value: boolean) {
        if (this._bIsPRNFreq != value) {
            this._bIsPRNFreq = value;
        }
    }
    public get FreqDetails(): IPPMAManagePrescSer.CResMsgGetAdministrationTimes {
        return this._freqDetails;
    }
    public set FreqDetails(value: IPPMAManagePrescSer.CResMsgGetAdministrationTimes) {
        if (this._freqDetails != value) {
            this._freqDetails = value;
            if (this.FrequrncyTypeChanged != null) {
                this.FrequrncyTypeChanged(this._freqDetails != null && this._freqDetails.oFrequency != null ? this._freqDetails.oFrequency.Type : String.Empty);
            }
        }
    }
    public get IsAdminTimesEnabled(): boolean {
        return this._isAdminTimesEnabled;
    }
    public set IsAdminTimesEnabled(value: boolean) {
        this._isAdminTimesEnabled = value;
        //NotifyPropertyChanged("IsAdminTimesEnabled");
    }
    private _isDrugroundEnable: boolean = false;
    public get IsDrugroundEnable(): boolean {
        return this._isDrugroundEnable;
    }
    public set IsDrugroundEnable(value: boolean) {
        if (this._isDrugroundEnable != value) {
            this._isDrugroundEnable = value;
            //NotifyPropertyChanged("IsDrugroundEnable");
            if (!this._isDrugroundEnable) {
                this.IsFixedTime = true;
                this._isDrugroundTime = false;
                if (String.Equals(this.Actioncode, Convert.ToString(ActivityTypes.Amend))) {
                    if (this._freqDetails != null && this._freqDetails.oFrequency != null && this._freqDetails.oFrequency.FrequencyId != this.OriginalFrequencyOID) {
                        this.OriginalFrequencyOID = this._freqDetails.oFrequency.FrequencyId;
                    }
                    if (this.AsRequired != this.OriginalAsRequired) {
                        this.OriginalAsRequired = this.AsRequired;
                    }
                }
            }
            else {
                if (String.Equals(this.Actioncode, Convert.ToString(ActivityTypes.Prescribe)) || String.Equals(this.Actioncode, Convert.ToString(ActivityTypes.Reorder)) || String.Equals(this.Actioncode, Convert.ToString(ActivityTypes.Amend))) {
                    if (this.IsDefaultFixedTime) {
                        this.IsFixedTime = true;
                    }
                    else {
                        this.IsDrugroundTime = true;
                    }
                    if (this._freqDetails != null && this._freqDetails.oFrequency != null && this._freqDetails.oFrequency.FrequencyId != this.OriginalFrequencyOID) {
                        this.OriginalFrequencyOID = this._freqDetails.oFrequency.FrequencyId;
                    }
                    if (this.AsRequired != this.OriginalAsRequired) {
                        this.OriginalAsRequired = this.AsRequired;
                    }
                }
            }
        }
    }
    public get IsSlotTimeModeEnable(): boolean {
        return this._isSlotTimeModeEnable;
    }
    public set IsSlotTimeModeEnable(value: boolean) {
        if (this._isSlotTimeModeEnable != value) {
            this._isSlotTimeModeEnable = value;
            //NotifyPropertyChanged("IsSlotTimeModeEnable");
        }
    }
    public get IsFixedTime(): boolean {
        return this._isfixedTime;
    }
    public set IsFixedTime(value: boolean) {
        if (this._isfixedTime != value) {
            this._isfixedTime = value;
            this._isDrugroundTime = !value;
            //NotifyPropertyChanged("IsFixedTime");
            if (this._isfixedTime)
                this.AdminType = 'F';
            else this.AdminType = 'D';
            this.UpdateMandatory();
            if (this.SlotModeChanged != null)
                this.SlotModeChanged();
        }
    }
    public UpdateMandatory(): void {
        if (this.AdministrationScheduleTimes != null) {
            let nCount: number = this.AdministrationScheduleTimes.Count;
            for (let i: number = 0; i < nCount; i++) {
                this.AdministrationScheduleTimes[i].IsFixedMandatory = this.AsRequired ? false : this.IsFixedTime;
                this.AdministrationScheduleTimes[i].IsDrugroundMandatory = this.AsRequired ? false : this.IsDrugroundTime;
            }
        }
    }
    public UpdateMandatoryPRN(IsPRN: boolean): void {
        if (this.AdministrationScheduleTimes != null) {
            let nCount: number = this.AdministrationScheduleTimes.Count;
            for (let i: number = 0; i < nCount; i++) {
                this.AdministrationScheduleTimes[i].IsFixedMandatory = !IsPRN;
                this.AdministrationScheduleTimes[i].IsDrugroundMandatory = !IsPRN;
            }
        }
    }
    private _IsPRN: boolean = false;
    public get IsPRN(): boolean {
        return this._IsPRN;
    }
    public set IsPRN(value: boolean) {
        this._IsPRN = value;
    }
    public get IsDrugroundTime(): boolean {
        return this._isDrugroundTime;
    }
    public set IsDrugroundTime(value: boolean) {
        if (this._isDrugroundTime != value) {
            this._isDrugroundTime = value;
            this._isfixedTime = !value;
            //NotifyPropertyChanged("IsDrugroundTime");
            if (this._isDrugroundTime)
                this.AdminType = 'D';
            else this.AdminType = 'F';
            this.UpdateMandatory();
            if (this.SlotModeChanged != null)
                this.SlotModeChanged();
        }
    }
    public get DaysOfWeekVisibility(): Visibility {
        return this._daysOfWeekVisibility;
    }
    public set DaysOfWeekVisibility(value: Visibility) {
        if (this._daysOfWeekVisibility != value) {
            this._daysOfWeekVisibility = value;
            if (value == Visibility.Visible && this.isDayOfWeekEnable && !(String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.InvariantCultureIgnoreCase))) {
                this._IsDaysOfWeekMandatory = true;
            }
            else {
                this._IsDaysOfWeekMandatory = false;
            }
            //NotifyPropertyChanged("DaysOfWeekVisibility");
        }
    }
    public get IsDaysOfWeekMandatory(): boolean {
        return this._IsDaysOfWeekMandatory;
    }
    public set IsDaysOfWeekMandatory(value: boolean) {
        if (this._IsDaysOfWeekMandatory != value) {
            this._IsDaysOfWeekMandatory = value;
        }
        //NotifyPropertyChanged("IsDaysOfWeekMandatory");
    }
    public get IsAdminTimelblEnable(): boolean {
        return this._IsAdminTimelblEnable;
    }
    public set IsAdminTimelblEnable(value: boolean) {
        if (this._IsAdminTimelblEnable != value) {
            this._IsAdminTimelblEnable = value;
            //NotifyPropertyChanged("IsAdminTimelblEnable");
        }
    }

    private _administrationScheduleTimes: ObservableCollection<AdminScheduleTime> = new ObservableCollection<AdminScheduleTime>();
    public get AdministrationScheduleTimes(): ObservableCollection<AdminScheduleTime> {
        return this._administrationScheduleTimes;
    }
    public ChangeDetection = new EventEmitter();
    public set AdministrationScheduleTimes(value: ObservableCollection<AdminScheduleTime>) {
        console.log("FrqAdmminTimes.Set", value, (new Date()).getTime().toString());
        if (this._administrationScheduleTimes) {
            this._administrationScheduleTimes.Clear();
            if(value)
            {
                value.forEach(item => { this._administrationScheduleTimes.Add(item) })
            }
            this.ChangeDetection.emit()
        }
        //          if(this._administrationScheduleTimes != null){
        //  this._administrationScheduleTimes.CopyFrom(value);
        //         }
        //         else{
        //this._administrationScheduleTimes = value;
        // }

        //NotifyPropertyChanged("AdministrationScheduleTimes");
    }
    private _adminSchedule_time: ObservableCollection<AdminScheduleTime>;
    public get AdminSchedule_Time(): ObservableCollection<AdminScheduleTime> {
        return this._adminSchedule_time;
    }
    public set AdminSchedule_Time(value: ObservableCollection<AdminScheduleTime>) {
        this._adminSchedule_time = value;
    }
    private _isSun: boolean = false;
    private _isSunEnable: boolean = true;
    private _isMon: boolean = false;
    private _isMonEnable: boolean = true;
    private _isTue: boolean = false;
    private _isTueEnable: boolean = true;
    private _isWed: boolean = false;
    private _isWedEnable: boolean = true;
    private _isThu: boolean = false;
    private _isThuEnable: boolean = true;
    private _isFri: boolean = false;
    private _isFriEnable: boolean = true;
    private _isSat: boolean = false;
    private _isSatEnable: boolean = true;
    private _isDayOfWeekEnable: boolean = true;
    public get IsSun(): boolean {
        return this._isSun;
    }
    public set IsSun(value: boolean) {
        if (this._isSun != value) {
            this._isSun = value;
            //NotifyPropertyChanged("IsSun");
            if (this.DaysofWeekChanged != null)
                this.DaysofWeekChanged();
        }
        this.CheckAndSetDaysOfWeekState();
    }
    public CheckAndSetDaysOfWeekState(): void {
        let DOCheckState: boolean = false;
        if (ProfileData.ScheduleConfig != null && !ProfileData.ScheduleConfig.AdminTimeReqforPRN && !String.IsNullOrEmpty(this.Actioncode) && (this.Actioncode == ActivityTypes.Prescribe.ToString() || this.Actioncode == ActivityTypes.Reorder.ToString()) && this.AsRequired) {
            DOCheckState = true;
        }
        if (this._daysOfWeekVisibility == Visibility.Visible && this.FreqDetails != null && this.FreqDetails.oFrequency != null && !DOCheckState) {
            let nCheckedCount: number = 0;
            let nLowEvent: number = this.FreqDetails.oFrequency.LowEvent;
            if (this._isSun)
                nCheckedCount++;
            if (this._isMon)
                nCheckedCount++;
            if (this._isTue)
                nCheckedCount++;
            if (this._isWed)
                nCheckedCount++;
            if (this._isThu)
                nCheckedCount++;
            if (this._isFri)
                nCheckedCount++;
            if (this._isSat)
                nCheckedCount++;
            this.EnableDisableDaysOfWeek(nCheckedCount, nLowEvent);
        }
    }
    private EnableDisableDaysOfWeek(nCheckedCount: number, nLowEvent: number): void {
        if (nCheckedCount >= nLowEvent) {
            if (!this._isSun)
                this.IsSunEnable = false;
            else this.IsSunEnable = true;
            if (!this._isMon)
                this.IsMonEnable = false;
            else this.IsMonEnable = true;
            if (!this._isTue)
                this.IsTueEnable = false;
            else this.IsTueEnable = true;
            if (!this._isWed)
                this.IsWedEnable = false;
            else this.IsWedEnable = true;
            if (!this._isThu)
                this.IsThuEnable = false;
            else this.IsThuEnable = true;
            if (!this._isFri)
                this.IsFriEnable = false;
            else this.IsFriEnable = true;
            if (!this._isSat)
                this.IsSatEnable = false;
            else this.IsSatEnable = true;
        }
        else {
            this.IsSunEnable = this.IsMonEnable = this.IsTueEnable = this.IsWedEnable = this.IsThuEnable = this.IsFriEnable = this.IsSatEnable = true;
        }
    }
    public get IsSunEnable(): boolean {
        return this._isSunEnable;
    }
    public set IsSunEnable(value: boolean) {
        if (this._isSunEnable != value) {
            this._isSunEnable = value;
            //NotifyPropertyChanged("IsSunEnable");
        }
    }
    public get IsMon(): boolean {
        return this._isMon;
    }
    public set IsMon(value: boolean) {
        if (this._isMon != value) {
            this._isMon = value;
            //NotifyPropertyChanged("IsMon");
            if (this.DaysofWeekChanged != null)
                this.DaysofWeekChanged();
        }
        this.CheckAndSetDaysOfWeekState();
    }
    public get IsMonEnable(): boolean {
        return this._isMonEnable;
    }
    public set IsMonEnable(value: boolean) {
        if (this._isMonEnable != value) {
            this._isMonEnable = value;
            //NotifyPropertyChanged("IsMonEnable");
        }
    }
    public get IsTue(): boolean {
        return this._isTue;
    }
    public set IsTue(value: boolean) {
        if (this._isTue != value) {
            this._isTue = value;
            //NotifyPropertyChanged("IsTue");
            if (this.DaysofWeekChanged != null)
                this.DaysofWeekChanged();
        }
        this.CheckAndSetDaysOfWeekState();
    }
    public get IsTueEnable(): boolean {
        return this._isTueEnable;
    }
    public set IsTueEnable(value: boolean) {
        if (this._isTueEnable != value) {
            this._isTueEnable = value;
            //NotifyPropertyChanged("IsTueEnable");
        }
    }
    public get IsWed(): boolean {
        return this._isWed;
    }
    public set IsWed(value: boolean) {
        if (this._isWed != value) {
            this._isWed = value;
            //NotifyPropertyChanged("IsWed");
            if (this.DaysofWeekChanged != null)
                this.DaysofWeekChanged();
        }
        this.CheckAndSetDaysOfWeekState();
    }
    public get IsWedEnable(): boolean {
        return this._isWedEnable;
    }
    public set IsWedEnable(value: boolean) {
        if (this._isWedEnable != value) {
            this._isWedEnable = value;
            //NotifyPropertyChanged("IsWedEnable");
        }
    }
    public get IsThu(): boolean {
        return this._isThu;
    }
    public set IsThu(value: boolean) {
        if (this._isThu != value) {
            this._isThu = value;
            //NotifyPropertyChanged("IsThu");
            if (this.DaysofWeekChanged != null)
                this.DaysofWeekChanged();
        }
        this.CheckAndSetDaysOfWeekState();
    }
    public get IsThuEnable(): boolean {
        return this._isThuEnable;
    }
    public set IsThuEnable(value: boolean) {
        if (this._isThuEnable != value) {
            if (this.DaysofWeekChanged != null)
                this.DaysofWeekChanged();
            this._isThuEnable = value;
            //NotifyPropertyChanged("IsThuEnable");
        }
    }
    public get IsFri(): boolean {
        return this._isFri;
    }
    public set IsFri(value: boolean) {
        if (this._isFri != value) {
            this._isFri = value;
            //NotifyPropertyChanged("IsFri");
            if (this.DaysofWeekChanged != null)
                this.DaysofWeekChanged();
        }
        this.CheckAndSetDaysOfWeekState();
    }
    public get IsFriEnable(): boolean {
        return this._isFriEnable;
    }
    public set IsFriEnable(value: boolean) {
        if (this._isFriEnable != value) {
            if (this.DaysofWeekChanged != null)
                this.DaysofWeekChanged();
            this._isFriEnable = value;
            //NotifyPropertyChanged("IsFriEnable");
        }
    }
    public get IsSat(): boolean {
        return this._isSat;
    }
    public set IsSat(value: boolean) {
        if (this._isSat != value) {
            this._isSat = value;
            //NotifyPropertyChanged("IsSat");
            if (this.DaysofWeekChanged != null)
                this.DaysofWeekChanged();
        }
        this.CheckAndSetDaysOfWeekState();
    }
    public get IsSatEnable(): boolean {
        return this._isSatEnable;
    }
    public set IsSatEnable(value: boolean) {
        if (this._isSatEnable != value) {
            this._isSatEnable = value;
            //NotifyPropertyChanged("IsSatEnable");
        }
    }
    public get isDayOfWeekEnable(): boolean {
        return this._isDayOfWeekEnable;
    }
    public set isDayOfWeekEnable(value: boolean) {
        if (this._isDayOfWeekEnable != value) {
            this._isDayOfWeekEnable = value;
            //NotifyPropertyChanged("isDayOfWeekEnable");
        }
    }

    userclicked=false;

    public FillAdministrationTimes(StartPresTIme: DateTime | Nullable<DateTime> = null, bAmend: boolean | Nullable<boolean> = null, bisclrAmendlist: boolean | Nullable<boolean> = null, bDontOverrideOffsetDate: boolean | Nullable<boolean> = null): void {
       this.userclicked = false;

        this.AdministrationScheduleTimes = new ObservableCollection<AdminScheduleTime>();
        if (String.IsNullOrEmpty(this.oTempAdminType) || String.Equals(this.oTempAdminType, String.MinValue.ToString())) {
            this.oTempAdminType = Convert.ToString(this.AdminType);
        }
        if (this.FreqDetails == null || this.FreqDetails.oFrequency == null)
            return
        let sUOM: string = this.FreqDetails.oFrequency.UOM;
        if (String.Compare(this.FreqDetails.oFrequency.Type, "CC_PERIOD") == 0) {
            let oAdminSchdTime: AdminScheduleTime;
            if ((this.FreqDetails.oFixedTimes == null || this.FreqDetails.oFixedTimes.Count == 0) && (this.FreqDetails.oDrugRoundTimes == null || this.FreqDetails.oDrugRoundTimes.Count == 0)) {
                let nLowEvent: number = this.FreqDetails.oFrequency.LowEvent;
                if (String.Compare(sUOM, "CC_MEDDRSN2", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(sUOM, "CC_MEDRSN3", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(sUOM, "CC_MEDRSN4", StringComparison.CurrentCultureIgnoreCase) == 0) {
                    if (String.Equals(sUOM, "CC_MEDDRSN2", StringComparison.InvariantCultureIgnoreCase) && this.FreqDetails.oFrequency.NoOfEventsPerDay > 0) {
                        nLowEvent = this.FreqDetails.oFrequency.NoOfEventsPerDay;
                    }
                    else {
                        nLowEvent = 1;
                    }
                }
                let IsOverideOffsetDate: boolean = true;
                if (bisclrAmendlist != null && bisclrAmendlist.Value == false && bDontOverrideOffsetDate != null && bDontOverrideOffsetDate.Value == false) {
                    IsOverideOffsetDate = false;
                }
                let IsAmendUILoaded: boolean = true;
                if (bAmend != null && bAmend.Value == true && bisclrAmendlist != null && bisclrAmendlist.Value == false) {
                    IsAmendUILoaded = false;
                }
                for (let i: number = 0; i < nLowEvent; i++) {
                    if (DateTime.NotEquals(this.StartDTTM.Date, DateTime.MinValue)) {
                        if (IsOverideOffsetDate && !String.IsNullOrEmpty(sUOM) && String.Equals(sUOM, "CC_IPONCENLY", StringComparison.OrdinalIgnoreCase)) {
                            if (IsAmendUILoaded) {
                                oAdminSchdTime = ObjectHelper.CreateObject(new AdminScheduleTime(this), { ScheduleDTTM: (StartPresTIme != null && ObjectHelper.HasValue(StartPresTIme)) ? StartPresTIme.Value : this.StartDTTM });
                            }
                            else if (IsOverideOffsetDate) {
                                oAdminSchdTime = ObjectHelper.CreateObject(new AdminScheduleTime(this), { ScheduleDTTM: this.StartDTTM });
                            }
                            else {
                                oAdminSchdTime = ObjectHelper.CreateObject(new AdminScheduleTime(this), { ScheduleDTTM: this.StartDTTM.DateTime.AddDateAdjustment() });
                            }
                        }
                        else {
                            oAdminSchdTime = ObjectHelper.CreateObject(new AdminScheduleTime(this), { ScheduleDTTM: this.StartDTTM.DateTime.AddDateAdjustment() });
                        }
                        this.IsDrugroundEnable = false;
                        oAdminSchdTime.IsFixedMandatory = this.IsFixedTime;
                        oAdminSchdTime.IsDrugroundMandatory = this.IsDrugroundTime;
                        oAdminSchdTime.FixedSchDTTMChanged = (s, e) => { this.oAdminSchdTime_FixedSchDTTMChanged(); };
                        this.AdministrationScheduleTimes.Add(oAdminSchdTime);
                    }
                }
            }
            else {
                if (DateTime.NotEquals(this.StartDTTM, DateTime.MinValue)) {
                    let nFixedCnt: number = (this.FreqDetails.oFixedTimes != null) ? this.FreqDetails.oFixedTimes.Count : 0;
                    let nDrugroundCnt: number = (this.FreqDetails.oDrugRoundTimes != null) ? this.FreqDetails.oDrugRoundTimes.Count : 0;
                    let nCount: number = nFixedCnt > nDrugroundCnt ? nFixedCnt : nDrugroundCnt;
                    this.IsDrugroundEnable = nDrugroundCnt > 0;
                    let nMins: number = 0;
                    let IsAmendUILoaded: boolean = true;
                    if (bAmend != null && bAmend.Value == true && bisclrAmendlist != null && bisclrAmendlist.Value == false) {
                        IsAmendUILoaded = false;
                    }
                    for (let i: number = 0; i < nCount; i++) {
                        if (IsAmendUILoaded && !String.IsNullOrEmpty(sUOM) && String.Equals(sUOM, "CC_IPONCENLY", StringComparison.OrdinalIgnoreCase)) {
                            oAdminSchdTime = ObjectHelper.CreateObject(new AdminScheduleTime(this), { ScheduleDTTM: (StartPresTIme != null && ObjectHelper.HasValue(StartPresTIme)) ? StartPresTIme.Value : this.StartDTTM.DateTime.AddDateAdjustment() });
                        }
                        else {
                            oAdminSchdTime = ObjectHelper.CreateObject(new AdminScheduleTime(this), { ScheduleDTTM: this.StartDTTM.DateTime.AddDateAdjustment() });
                        }
                        if (this.FreqDetails.oFixedTimes != null && this.FreqDetails.oFixedTimes.Count > i && Number.TryParse(this.FreqDetails.oFixedTimes[i].ScheduledTime, (o) => { nMins = o; })) {
                            if (IsAmendUILoaded && !String.IsNullOrEmpty(sUOM) && String.Equals(sUOM, "CC_IPONCENLY", StringComparison.OrdinalIgnoreCase) && StartPresTIme != null) {
                                oAdminSchdTime.ScheduleDTTM = this.StartDTTM.DateTime.Add(StartPresTIme.Value.TimeOfDay);
                            }
                            else {
                                //oAdminSchdTime.ScheduleDTTM = this.StartDTTM.DateTime.AddDateTimeAdjustment(nMins);
                                oAdminSchdTime.ScheduleDTTM = DateTime.AddDateTimeAdjustment(this.StartDTTM.DateTime, nMins);
                            }
                        }
                        if (this.FreqDetails.oDrugRoundTimes != null && this.FreqDetails.oDrugRoundTimes.Count > i && Number.TryParse(this.FreqDetails.oDrugRoundTimes[i].ScheduledTime, (o) => { nMins = o })) {
                            if (DateTime.Equals(this.StartDTTM.Date, DateTime.MinValue.Date))
                                oAdminSchdTime.DrugroundDTTM = DateTime.AddDateTimeAdjustment(CommonBB.GetServerDateTime().DateTime, nMins);
                            else oAdminSchdTime.DrugroundDTTM = DateTime.AddDateTimeAdjustment(this.StartDTTM.DateTime, nMins);
                        }
                        oAdminSchdTime.IsFixedMandatory = this.IsFixedTime;
                        oAdminSchdTime.IsDrugroundMandatory = this.IsDrugroundEnable && this.IsDrugroundTime;
                        oAdminSchdTime.FixedSchDTTMChanged = (s, e) => { this.oAdminSchdTime_FixedSchDTTMChanged(); };
                        this.AdministrationScheduleTimes.Add(oAdminSchdTime);
                    }
                }
            }
            if (String.Compare(sUOM, "CC_MEDDRSN2", StringComparison.CurrentCultureIgnoreCase) == 0) {
                this.IsSunEnable = this.IsMonEnable = this.IsTueEnable = this.IsWedEnable = this.IsThuEnable = this.IsFriEnable = this.IsSatEnable = true;
                this.IsSun = this.IsMon = this.IsTue = this.IsWed = this.IsThu = this.IsFri = this.IsSat = true;
                this.IsSun = this.FreqDetails.oFrequency.IsSunday;
                this.IsMon = this.FreqDetails.oFrequency.IsMonday;
                this.IsTue = this.FreqDetails.oFrequency.IsTuesday;
                this.IsWed = this.FreqDetails.oFrequency.IsWednesday;
                this.IsThu = this.FreqDetails.oFrequency.IsThursday;
                this.IsFri = this.FreqDetails.oFrequency.IsFriday;
                this.IsSat = this.FreqDetails.oFrequency.IsSaturday;
            }
        }
        else {
            if (this.AsRequired) {
                this.Clear();
                this.IsDrugroundEnable = false;
            }
            else {
                let iteration: number = 0;
                let lowPeriod: number = this.FreqDetails.oFrequency.LowPeriod;
                let Mintues: number = 60;
                let TotalMintues: number = 1440;
                let TotalHours: number = 24;
                let Hours: number = 24;
                let Day: number = 1;
                let IsSTAT: boolean = false;
                let startTime: DateTime = this.StartDTTM;
                let endTime: DateTime = DateTime.MinValue;
                if (String.Compare(sUOM, "CC_MINUTES", StringComparison.CurrentCultureIgnoreCase) == 0) {
                    iteration = (lowPeriod * Mintues * Hours) < TotalMintues ? (lowPeriod * Mintues * Hours) : TotalMintues;
                    endTime = startTime.AddMinutes(iteration);
                }
                else if (String.Compare(sUOM, "CC_HOURS", StringComparison.CurrentCultureIgnoreCase) == 0) {
                    iteration = (lowPeriod * Hours) < TotalHours ? (lowPeriod * Hours) : TotalHours;
                    endTime = startTime.AddHours(iteration);
                }
                else if (String.Compare(sUOM, "CC_IPONCENLY", StringComparison.CurrentCultureIgnoreCase) == 0) {
                    endTime = startTime;
                    IsSTAT = true;
                }
                else if (String.Compare(sUOM, "CC_MEDDRSN1", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(sUOM, "CC_MEDDRSN2", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(sUOM, "CC_MEDRSN3", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(sUOM, "CC_MEDRSN4", StringComparison.CurrentCultureIgnoreCase) == 0) {
                    endTime = startTime.AddDays(Day);
                }
                if (this.StopDTTM.Year > CConstants.DateTimeMinYear && DateTime.LessThan(this.StopDTTM, endTime))
                    endTime = this.StopDTTM;
                let DoFillAdminTimes: boolean = false;
                if (PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration && !String.IsNullOrEmpty(this.FreqDetails.oFrequency.Type) && String.Equals(this.FreqDetails.oFrequency.Type, "CC_INTERVAL") && this.StartDTTM.Year > CConstants.DateTimeMinYear) {
                    DoFillAdminTimes = true;
                }
                if (DoFillAdminTimes || this.StartDTTM.Year > CConstants.DateTimeMinYear) {
                    if (IsSTAT && DateTime.Equals(startTime.Date, endTime.Date) && DateTime.NotEquals(endTime, DateTime.MinValue)) {
                        this.IsDrugroundEnable = false;
                        let oAdminSchTime: AdminScheduleTime = ObjectHelper.CreateObject(new AdminScheduleTime(this), { ScheduleDTTM: startTime });
                        oAdminSchTime.FixedSchDTTMChanged = (s, e) => { this.oAdminSchdTime_FixedSchDTTMChanged(); };
                        this.AdministrationScheduleTimes.Add(oAdminSchTime);
                    }
                    else {
                        startTime = startTime.ToUniversalTime();
                        endTime = endTime.ToUniversalTime();
                        let MinTimeToPrescribe: number = 0;
                        if (AdminScheduleTimeVM.DoNotGenerateDSTSlots) {
                            switch (sUOM) {
                                case CConstants.UOMType5:
                                    MinTimeToPrescribe = lowPeriod;
                                    break;
                                case CConstants.UOMType6:
                                    MinTimeToPrescribe = lowPeriod * Mintues;
                                    break;
                                default:
                                    MinTimeToPrescribe = lowPeriod * Mintues * Hours;
                                    break;
                            }
                        }
                        let IsInvalidSlotAdjusted: boolean = false;
                        let DSTOffsetInMinutes: number = TimeZoneInfo.Local.GetUtcOffset(startTime.ToLocalTime()).TotalMinutes - TimeZoneInfo.Local.BaseUtcOffset.TotalMinutes;
                        if (DSTOffsetInMinutes <= 0) {
                            DSTOffsetInMinutes = TimeZoneInfo.Local.GetUtcOffset(endTime.ToLocalTime()).TotalMinutes - TimeZoneInfo.Local.BaseUtcOffset.TotalMinutes;
                        }
                        while (DateTime.NotEquals(endTime, DateTime.MinValue) && DateTime.LessThan(startTime, endTime)) {
                            let oAdminSchTime: AdminScheduleTime = ObjectHelper.CreateObject(new AdminScheduleTime(this), { ScheduleDTTM: startTime.ToLocalTime() });
                            oAdminSchTime.FixedSchDTTMChanged = (s, e) => { this.oAdminSchdTime_FixedSchDTTMChanged(); };
                            this.AdministrationScheduleTimes.Add(oAdminSchTime);
                            if (AdminScheduleTimeVM.DoNotGenerateDSTSlots && DSTOffsetInMinutes > 0) {
                                let NextSlotLocalTime: DateTime = startTime.AddMinutes(MinTimeToPrescribe).ToLocalTime();
                                if (MinTimeToPrescribe <= DSTOffsetInMinutes) {
                                    while (TimeZoneInfo.Local.IsAmbiguousTime(NextSlotLocalTime) && TimeZoneInfo.Local.IsDaylightSavingTime(NextSlotLocalTime)) {
                                        startTime = startTime.AddMinutes(MinTimeToPrescribe);
                                        NextSlotLocalTime = startTime.AddMinutes(MinTimeToPrescribe).ToLocalTime();
                                    }
                                }
                                else {
                                    let SlotLocalDTTM: DateTime = startTime.ToLocalTime();
                                    let PrevHourDTTM: DateTime = SlotLocalDTTM.AddMinutes(-DSTOffsetInMinutes);
                                    if (TimeZoneInfo.Local.IsDaylightSavingTime(SlotLocalDTTM) != TimeZoneInfo.Local.IsDaylightSavingTime(NextSlotLocalTime)) {
                                        if (!TimeZoneInfo.Local.IsDaylightSavingTime(NextSlotLocalTime)) {
                                            startTime = startTime.AddMinutes(DSTOffsetInMinutes);
                                            NextSlotLocalTime = startTime.AddHours(MinTimeToPrescribe).ToLocalTime();
                                        }
                                        else {
                                            if (TimeZoneInfo.Local.IsDaylightSavingTime(NextSlotLocalTime.AddMinutes(-DSTOffsetInMinutes))) {
                                                startTime = startTime.AddMinutes(-DSTOffsetInMinutes);
                                                IsInvalidSlotAdjusted = true;
                                            }
                                        }
                                    }
                                    else if (!TimeZoneInfo.Local.IsDaylightSavingTime(PrevHourDTTM) && TimeZoneInfo.Local.IsDaylightSavingTime(SlotLocalDTTM) && !IsInvalidSlotAdjusted) {
                                        startTime = startTime.AddMinutes(-DSTOffsetInMinutes);
                                    }
                                    if (TimeZoneInfo.Local.IsAmbiguousTime(NextSlotLocalTime) && TimeZoneInfo.Local.IsDaylightSavingTime(NextSlotLocalTime)) {
                                        startTime = startTime.AddMinutes(DSTOffsetInMinutes);
                                    }
                                }
                            }
                            if (String.Compare(sUOM, CConstants.UOMType5, StringComparison.CurrentCultureIgnoreCase) == 0) {
                                startTime = startTime.AddMinutes(lowPeriod);
                            }
                            else if (String.Compare(sUOM, CConstants.UOMType6, StringComparison.CurrentCultureIgnoreCase) == 0) {
                                startTime = startTime.AddHours(lowPeriod);
                            }
                            else {
                                startTime = startTime.AddDays(lowPeriod);
                            }
                        }
                    }
                }
            }
        }
        if (this.AdministrationScheduleTimes != null && this.AdministrationScheduleTimes.Count > 0)
            this.IsSlotTimeModeEnable = true;
    }
    public oAdminSchdTime_FixedSchDTTMChanged(): void {
        if (this.SlotModeChanged != null)
            this.SlotModeChanged();
    }
    private UpdateAdministrationTimes(): void {
        if (this.FreqDetails == null || this.FreqDetails.oFrequency == null)
            return
        if (String.Compare(this.FreqDetails.oFrequency.Type, "CC_PERIOD") == 0) {
            if (this.AdministrationScheduleTimes == null || this.AdministrationScheduleTimes.Count == 0)
                return
            let nCount: number = this.AdministrationScheduleTimes.Count;
            for (let i: number = 0; i < nCount; i++) {
                if (DateTime.NotEquals(this.StartDTTM.Date, DateTime.MinValue)) {
                    this.AdministrationScheduleTimes[i].ScheduleDTTM = this.StartDTTM.DateTime.AddTime(this.AdministrationScheduleTimes[i].ScheduleDTTM);
                    if (this.AdministrationScheduleTimes[i].DrugroundDTTM.Year > CConstants.DateTimeMinYear)
                        this.AdministrationScheduleTimes[i].DrugroundDTTM = this.StartDTTM.DateTime.AddTime(this.AdministrationScheduleTimes[i].DrugroundDTTM);
                }
            }
        }
        else {
            if (!(this.FreqDetails != null && this.FreqDetails.oFrequency != null && String.Compare(this.FreqDetails.oFrequency.Type, "CC_INTERVAL") == 0 && this.bIsPRNFreq))
                this.FillAdministrationTimes();
        }
    }
    public SetAdminTimesState(IsPRN: boolean): void {
        this.IsAdminTimesEnabled = !IsPRN;
        if (this.AdministrationScheduleTimes == null || this.AdministrationScheduleTimes.Count == 0 || this.FreqDetails == null || this.FreqDetails.oFrequency == null)
            return
        let nCount: number = this.AdministrationScheduleTimes.Count;
        for (let i: number = 0; i < nCount; i++) {
            this.AdministrationScheduleTimes[i].IsDrugroundMandatory = this.AdministrationScheduleTimes[i].IsFixedMandatory = this.IsAdminTimesEnabled;
        }
    }
    public Clear(): void {
        this.SetSlotTimeModeState(String.Empty);
        this.DaysOfWeekVisibility = Visibility.Collapsed;
        this.AdministrationScheduleTimes = new ObservableCollection<AdminScheduleTime>();
        this.IsSunEnable = this.IsMonEnable = this.IsTueEnable = this.IsWedEnable = this.IsThuEnable = this.IsFriEnable = this.IsSatEnable = true;
        this.IsSun = this.IsMon = this.IsTue = this.IsWed = this.IsThu = this.IsFri = this.IsSat = false;
        this.IsSlotTimeModeEnable = false;
        this.IsDrugroundEnable = false;
    }
    public SetSlotTimeModeState(FreqType: string): void {
        if (String.Compare(FreqType, "CC_PERIOD", StringComparison.InvariantCultureIgnoreCase) == 0 && !this._asRequired) {
            this.IsSlotTimeModeEnable = true;
            let nDrugroundCnt: number = (this.FreqDetails != null && this.FreqDetails.oDrugRoundTimes != null) ? this.FreqDetails.oDrugRoundTimes.Count : 0;
            this.IsDrugroundEnable = nDrugroundCnt > 0;
        }
        else if (String.Compare(FreqType, "CC_INTERVAL", StringComparison.InvariantCultureIgnoreCase) == 0) {
            this.IsSlotTimeModeEnable = false;
            this.IsDrugroundEnable = false;
            this.IsFixedTime = true;
        }
    }
    public CheckAndSortScheduleTime(): void {
        if (this.AdministrationScheduleTimes != null && this.AdministrationScheduleTimes.Count > 0) {



            let sortedSchdTime: IEnumerable<DateTime> = this.AdministrationScheduleTimes.OrderBy(schd => schd.ScheduleDTTM.ToUniversalTime()).Select(schd => schd.ScheduleDTTM);



            let lstDTTM: List<DateTime> = new List<DateTime>(sortedSchdTime.AsEnumerable());
            let nCount: number = this.AdministrationScheduleTimes.Count;
            for (let i: number = 0; i < nCount; i++) {
                this.AdministrationScheduleTimes[i].ScheduleDTTM = lstDTTM[i];
            }
        }
    }
    public LastDuplicateobj: DateTime = DateTime.MinValue;
    public LastDuplicateIndex: number = 0;
    public duplicatecheck(IsValidateZeroTime: boolean): string {
        let dictionary: Dictionary<string, string> = null;
        let dictionary1: Dictionary<string, string> = null;
        let sDuplicateTime: string = String.Empty;
        let nCount: number = 0;
        if (this.AdministrationScheduleTimes != null && this.AdministrationScheduleTimes.Count > 0) {
            nCount = this.AdministrationScheduleTimes.Count;
            if (!(this.AdministrationScheduleTimes.Where(c => c.ScheduleDTTM.ToUserDateTime().ToString("HH:mm") == "00:00").Select(s => s).Count() == nCount))
                for (let i: number = 0; i < nCount; i++) {
                    if (dictionary == null)
                        dictionary = new Dictionary<string, string>();
                    let s: string = this.AdministrationScheduleTimes[i].ScheduleDTTM.ToUserDateTime().ToString("HH:mm");
                    if (this.AdministrationScheduleTimes[i].IsFixedEnable && ((this.AdministrationScheduleTimes[i].IsFixedMandatory && !String.IsNullOrEmpty(s) && !String.Equals(s, "00:00", StringComparison.InvariantCultureIgnoreCase)) || (this.AsRequired && this.IsAdminTimeReqORNonForPRN && (IsValidateZeroTime || (!IsValidateZeroTime && !String.IsNullOrEmpty(s) && !String.Equals(s, "00:00", StringComparison.InvariantCultureIgnoreCase)))))) {
                        if (!dictionary.ContainsKey((this.AdministrationScheduleTimes[i].ScheduleDTTM.ToUserDateTimeString("HH:mm")))) {
                            dictionary.Add((this.AdministrationScheduleTimes[i].ScheduleDTTM.ToUserDateTimeString("HH:mm")), (this.AdministrationScheduleTimes[i].ScheduleDTTM.ToUserDateTimeString("HH:mm")));
                        }
                        else {
                            if (dictionary1 == null)
                                dictionary1 = new Dictionary<string, string>();
                            if (!dictionary1.ContainsKey((this.AdministrationScheduleTimes[i].ScheduleDTTM.ToUserDateTimeString("HH:mm")))) {
                                dictionary1.Add((this.AdministrationScheduleTimes[i].ScheduleDTTM.ToUserDateTimeString("HH:mm")), (this.AdministrationScheduleTimes[i].ScheduleDTTM.ToUserDateTimeString("HH:mm")));
                                sDuplicateTime = sDuplicateTime + dictionary1[((this.AdministrationScheduleTimes[i].ScheduleDTTM.ToUserDateTimeString("HH:mm")))] + ",";
                                this.LastDuplicateobj = this.AdministrationScheduleTimes[i].ScheduleDTTM;
                                this.LastDuplicateIndex = i;
                            }
                        }
                    }
                }
        }
        return sDuplicateTime;
    }
    public ValidateDayOfWeek(): boolean {
        if (this._daysOfWeekVisibility == Visibility.Visible && this.FreqDetails != null && this.FreqDetails.oFrequency != null) {
            let nDayCnt: number = 0;
            if (this._isMon)
                nDayCnt++;
            if (this._isTue)
                nDayCnt++;
            if (this._isWed)
                nDayCnt++;
            if (this._isThu)
                nDayCnt++;
            if (this._isFri)
                nDayCnt++;
            if (this._isSat)
                nDayCnt++;
            if (this._isSun)
                nDayCnt++;
            if (nDayCnt < this.FreqDetails.oFrequency.LowEvent) {
                return false;
            }
        }
        return true;
    }
    private _IsAdminTimeReqORNonForPRN: boolean = false;
    public get IsAdminTimeReqORNonForPRN(): boolean {
        return this._IsAdminTimeReqORNonForPRN;
    }
    public set IsAdminTimeReqORNonForPRN(value: boolean) {
        this._IsAdminTimeReqORNonForPRN = value;
    }
    private DisposeVMEvents(): void {
        // this.oAdminSchdTime.FixedSchDTTMChanged -= this.oAdminSchdTime_FixedSchDTTMChanged;
        this.FrequrncyTypeChanged = null;
        this.SlotModeChanged = null;
    }
    private DisposeVMObjects(): void {
        this.oAdminSchdTime = null;
        this.AdministrationScheduleTimes = null;
        this.AdminSchedule_Time = null;
    }
    public DoCleanUP(): void {
        this.DisposeVMEvents();
        this.DisposeVMObjects();
    }
}
export class AdminScheduleTime extends ClonableViewModelBase {
    //public delegate void FixedSchDTTMChangedEventArgs();
    public FixedSchDTTMChanged: Function;
    private _scheduleTTM: DateTime = DateTime.MinValue;
    private _drugroundDTTM: DateTime = DateTime.MinValue;
    private _isFixedMandatory: boolean = false;
    private _isDrugroundMandatory: boolean = false;
    private _isFixedEnable: boolean = false;
    private _isDrugroundEnable: boolean = false;
    private _Parent: AdminScheduleTimeVM = null;
    constructor(param?: AdminScheduleTimeVM) {
        super();
        this._Parent = param;
    }
    public get IsFixedEnable(): boolean {
        return this._isFixedEnable;
    }
    public set IsFixedEnable(value: boolean) {
        this._isFixedEnable = value;
        //NotifyPropertyChanged("IsFixedEnable");
    }
    public get IsDrugroundEnable(): boolean {
        return this._isDrugroundEnable;
    }
    public set IsDrugroundEnable(value: boolean) {
        this._isDrugroundEnable = value;
        //NotifyPropertyChanged("IsDrugroundEnable");
    }
    private _tempIsfixed: boolean = false;
    private _tempIsdruground: boolean = false;
    public get IsFixedMandatory(): boolean {
        return this._isFixedMandatory;
    }
    public set IsFixedMandatory(value: boolean) {
        this._tempIsfixed = value;
        this._isFixedMandatory = this._Parent.AsRequired ? false : value;
        //NotifyPropertyChanged("IsFixedMandatory");
        this.IsFixedEnable = this._Parent.IsFixedTime;
    }
    public get IsDrugroundMandatory(): boolean {
        return this._isDrugroundMandatory;
    }
    public set IsDrugroundMandatory(value: boolean) {
        this._tempIsdruground = value;
        this._isDrugroundMandatory = this._Parent.AsRequired ? false : value;
        //NotifyPropertyChanged("IsDrugroundMandatory");
        this.IsDrugroundEnable = this._Parent.IsDrugroundTime;
    }
    public get ScheduleDTTM(): DateTime {
        return this._scheduleTTM;
    }
    public set ScheduleDTTM(value: DateTime) {
        if (DateTime.NotEquals(this._scheduleTTM, value)) {
            this._scheduleTTM = value;
            //NotifyPropertyChanged("ScheduleDTTM");
            if (this.FixedSchDTTMChanged != null)
                this.FixedSchDTTMChanged();
        }
    }
    public get DrugroundDTTM(): DateTime {
        return this._drugroundDTTM;
    }
    public set DrugroundDTTM(value: DateTime) {
        this._drugroundDTTM = value;
        //NotifyPropertyChanged("DrugroundDTTM");
    }
}