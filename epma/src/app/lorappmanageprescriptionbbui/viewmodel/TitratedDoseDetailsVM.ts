import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, RelayCommand, IEnumerable } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from '../../shared/epma-platform/soap-client/helper.service';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper as Helper, ObjectHelper } from 'epma-platform/helper';
import { ClonableViewModelBase } from 'src/app/lorappmedicationcommonbb/model/cloneviewmodel';
import { IViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { AdminstrativeTimesVM } from 'src/app/lorappmedicationcommonbb/viewmodel/adminstrativetimesvm';
import { CConstants, PrescriptionTypes } from '../utilities/constants';
import { Resource } from '../resource';
import { GrdAdminstrativeTimesCols } from 'src/app/lorappmedicationcommonbb/viewmodel/prescriptionitemdetailsvm';
import { ProfileData } from '../utilities/profiledata';
import { BasicDetailsVM } from './BasicDetailsVM';
import { AppSessionInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { Common } from '../utilities/common';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import * as IPPMAManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS'
import { ActivityTypes } from '../model/common';
import { ScheduleConfig } from 'src/app/lorappslprofiletypes/medication';



export class TitratedDoseVM extends ClonableViewModelBase implements IViewModelBase {
    public IsLoaded: boolean = false;
    public isFormCancel: boolean = false;
    public isMessageTriggered: boolean = false;
    public ActionCode: ActivityTypes;
    //public delegate void ReBindTitratedGRID();
    public ReBindTitratedGRIDEvent: Function;
    //public delegate void ReBindTitratedHeader();
    public ReBindTitratedHeaderEvent: Function;
    public oAdminTimesVM: AdminstrativeTimesVM;
    public FreqDetail: IPPMAManagePrescSer.CResMsgGetAdministrationTimes;
    public FreqOnChange: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient;
    private _grdTitrated: ObservableCollection<TitratedScheduleDetails>;
    //public delegate void OnUpdateTitratedDosedetails();
    public OnUpdateTitratedDosedetailsEvent: Function;
    private _IsTitClearEnabled: boolean = false;
    public TitratedUOMCancel: boolean = false;
    public get IsTitClearEnabled(): boolean {
        return this._IsTitClearEnabled;
    }
    public set IsTitClearEnabled(value: boolean) {
        this._IsTitClearEnabled = value;
       //super.NotifyPropertyChanged("IsTitClearEnabled");
    }
    private _isenablefrequency: boolean = true;
    public get isenablefrequency(): boolean {
        return this._isenablefrequency;
    }
    public set isenablefrequency(value: boolean) {
        this._isenablefrequency = value;
       //super.NotifyPropertyChanged("isenablefrequency");
    }
    private oClearTitrate: RelayCommand;
    public get ClearTitrate(): RelayCommand {
        if (this.oClearTitrate == null) {
            let functionClear = () => {this.ClearTitratedData();};
            this.oClearTitrate = new RelayCommand(functionClear);
            // this.oClearTitrate = new RelayCommand(this.ClearTitratedData);
        }
        return this.oClearTitrate;
    }
    public ClearTitratedData(): void {
        if (this._grdTitrated != null && this._grdTitrated.Count > 0) {
            this._grdTitrated.ForEach(ReInsert => {
                ReInsert.ScheduleDoseValue = new Array(CConstants.TitratedgridSize);
            });
            if (this.ReBindTitratedGRIDEvent != null)
                this.ReBindTitratedGRIDEvent();
        }
    }
    public get GrdTitrated(): ObservableCollection<TitratedScheduleDetails> {
        return this._grdTitrated;
    }
    public set GrdTitrated(value: ObservableCollection<TitratedScheduleDetails>) {
        this._grdTitrated = value;
       //NotifyPropertyChanged("GrdTitrated");
    }
    private _TempGrdTitrated: ObservableCollection<TitratedScheduleDetails>;
    public get TempGrdTitrated(): ObservableCollection<TitratedScheduleDetails> {
        return this._TempGrdTitrated;
    }
    public set TempGrdTitrated(value: ObservableCollection<TitratedScheduleDetails>) {
        this._TempGrdTitrated = value;
    }
    private _PresType: string;
    public get PresType(): string {
        return this._PresType;
    }
    public set PresType(value: string) {
        this._PresType = value;
    }
    private _Freq: string;
    public get Frequencytext(): string {
        return this._Freq;
    }
    public set Frequencytext(value: string) {
        this._Freq = value;
    }
    private _startdate: DateTime = DateTime.MinValue;
    public get Stardate(): DateTime{
        return this._startdate;
    }
    public set Stardate(value: DateTime) {
        if (this._startdate != DateTime.MinValue && this._startdate?.Date?.toISOString() != value.Date?.toISOString() && this._grdTitrated != null && this._grdTitrated.Count > 0) {
            this._grdTitrated.ForEach(ReInsert => {
                ReInsert.ScheduleDoseValue = new Array(CConstants.TitratedgridSize);
            });
            this._startdate = value;
            if (this.ReBindTitratedHeaderEvent != null)
                this.ReBindTitratedHeaderEvent();
        }
        else this._startdate = value;
    }
    private _IsCancelTitratedDoseUom: boolean = false;
    public IsDefaultFixedTime: boolean = false;
    public get IsCancelTitratedDoseUom(): boolean {
        return this._IsCancelTitratedDoseUom;
    }
    public set IsCancelTitratedDoseUom(value: boolean) {
        this._IsCancelTitratedDoseUom = value;
    }
    private oTempDoseUom: string;
    private _DoseUOM: string;
    public get DoseUOM(): string {
        return this._DoseUOM;
    }
    public set DoseUOM(value: string) {
        if (this._DoseUOM != null && this._DoseUOM != value) {
            if (this._grdTitrated != null && this._grdTitrated.Count > 0) {
                let ScheduleDoseValues = this._grdTitrated.Select(s => s.ScheduleDoseValue);
                let ToFindNotNullDosevalue: boolean = false;
                if (ScheduleDoseValues != null && ScheduleDoseValues.Count() > 0) {
                    // ScheduleDoseValues.forEach( (SchedDoseValue)=> {
                    //     ToFindNotNullDosevalue = !SchedDoseValue.every(m => String.IsNullOrEmpty(m));
                    //     if (ToFindNotNullDosevalue) {
                    //         return;
                    //     }
                    // });
                    for(let i=0 ; i< ScheduleDoseValues.Count() ;i++ ){
                        ToFindNotNullDosevalue = !ScheduleDoseValues[i].every(m => String.IsNullOrEmpty(m));
                        if (ToFindNotNullDosevalue) {
                            break;
                        }
                    }
                }
                if (ToFindNotNullDosevalue && !this.IsCancelTitratedDoseUom && !this.isMessageTriggered && !String.IsNullOrEmpty(this._DoseUOM) && !this.isFormCancel) {
                    this.isMessageTriggered = true;
                    let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                        Title: Resource.medConditionalDoseRes.TitratedUomMessageBox_Title,
                        MessageButton: MessageBoxButton.OKCancel,
                        IconType: MessageBoxType.Exclamation,
                        Message: Resource.medConditionalDoseRes.TitratedUomMessage
                    });
                    iMsgBox.MessageBoxClose  = (s,e) => { this.Titrated_Validation(s,e); } ;
                    iMsgBox.Show();
                    this.oTempDoseUom = this._DoseUOM;
                }
            }
        }
        if (this._DoseUOM == null && this._grdTitrated != null && this._grdTitrated.Count > 0 && (String.IsNullOrEmpty(this._grdTitrated[0].ScheduleDoseUOM) || this._grdTitrated[0].ScheduleDoseUOM == " ")) {
            this._grdTitrated.ForEach(ReInsert => {
                ReInsert.ScheduleDoseUOM = value;
            });
            if (this.ReBindTitratedGRIDEvent != null)
                this.ReBindTitratedGRIDEvent();
        }
        if (this._DoseUOM != null && this._grdTitrated != null && this._grdTitrated.Count > 0 && (this.ActionCode == ActivityTypes.Prescribe || this.ActionCode == ActivityTypes.Reorder || this.ActionCode == ActivityTypes.UnHold) && this._DoseUOM != value && !this.isMessageTriggered) {
            this._grdTitrated.ForEach(ReInsert => {
                ReInsert.ScheduleDoseUOM = value;
            });
            if (this.ReBindTitratedGRIDEvent != null)
                this.ReBindTitratedGRIDEvent();
        }
        if (this._DoseUOM != null && this._grdTitrated != null && this._grdTitrated.Count > 0 && this.ActionCode == ActivityTypes.Amend && !this.isMessageTriggered) {
            this._grdTitrated.ForEach(ReInsert => {
                ReInsert.ScheduleDoseUOM = value;
            });
            if (this.ReBindTitratedGRIDEvent != null)
                this.ReBindTitratedGRIDEvent();
        }
        this._DoseUOM = value;
    }
    Titrated_Validation(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.OK) {
            this.isMessageTriggered = false;
            this._grdTitrated.ForEach(ReInsert => {
                ReInsert.ScheduleDoseValue = new Array(CConstants.TitratedgridSize);
                ReInsert.ScheduleDoseUOM = this.DoseUOM;
            });
            if (this.ReBindTitratedGRIDEvent != null)
                this.ReBindTitratedGRIDEvent();
        }
        else if (e.MessageBoxResult == MessageBoxResult.Cancel) {
            if (this.OnUpdateTitratedDosedetailsEvent != null) {
                this.TitratedUOMCancel = true;
                this.IsCancelTitratedDoseUom = true;
                this.isMessageTriggered = false;
                let grdcount: number = this._grdTitrated.Count;
                if (grdcount > 0 && this._grdTitrated[0] != null && this._grdTitrated[0].ScheduleDoseUOM != null) {
                    if (String.Compare(this.oTempDoseUom, this._grdTitrated[0].ScheduleDoseUOM.Trim(), StringComparison.OrdinalIgnoreCase) == 0) {
                        this.DoseUOM = this.oTempDoseUom;
                    }
                    else {
                        this.DoseUOM = this._grdTitrated[0].ScheduleDoseUOM.Trim();
                    }
                }
                else {
                    this.DoseUOM = this.oTempDoseUom;
                }
                this.OnUpdateTitratedDosedetailsEvent();
            }
        }
        return
    }
    public IsHavingAdminTime: string;
    private _freqDetails: IPPMAManagePrescSer.CResMsgGetAdministrationTimes;
    public get FreqDetails(): IPPMAManagePrescSer.CResMsgGetAdministrationTimes {
        return this._freqDetails;
    }
    public set FreqDetails(value: IPPMAManagePrescSer.CResMsgGetAdministrationTimes) {
        if (this._freqDetails != value) {
            this._freqDetails = value;
        }
    }
    public AdminTimeGrdData: ObservableCollection<GrdAdminstrativeTimesCols>;
    constructor() {
        super();
        this.isFormCancel = false;
        if (ProfileData.ScheduleConfig == null) {
            let profile: ProfileFactoryType = new ProfileFactoryType();
            profile.OnProfileLoaded  = (s,e) => { this.profile_OnProfileLoaded(s,e); } ;
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
    public LoadData(StartDate: DateTime, DoseUOM: string): void {
        if (DoseUOM != null) {
            this.DoseUOM = DoseUOM;
        }
        if (this.GrdTitrated == null || (this.GrdTitrated != null && this.GrdTitrated.Count == 0)) {
            this.GrdTitrated = new ObservableCollection<TitratedScheduleDetails>();
            this.FillGridData(this.GrdTitrated, StartDate);
            this.TempGrdTitrated = new ObservableCollection<TitratedScheduleDetails>();
            if (this.GrdTitrated != null) {
                let cnt: number = this.GrdTitrated.Count;
                for (let i: number = 0; i < cnt; i++) {
                    let oNewItem: TitratedScheduleDetails = new TitratedScheduleDetails();
                    oNewItem.ScheduleTime = this.GrdTitrated[i].ScheduleTime;
                    oNewItem.ScheduleDTTM = this.GrdTitrated[i].ScheduleDTTM;
                    oNewItem.ScheduleDoseValue = this.GrdTitrated[i].ScheduleDoseValue;
                    oNewItem.ScheduleDoseUOM = this.GrdTitrated[i].ScheduleDoseUOM;
                    this.TempGrdTitrated.Add(oNewItem);
                }
            }
        }
    }

    public CalculateDates (StartDate: DateTime, oVM ?: BasicDetailsVM | TitratedScheduleDetails) : any
    {
        if(oVM instanceof BasicDetailsVM)
        {
            this.CalculateDates2(StartDate,oVM);
        }
        else if (oVM instanceof TitratedScheduleDetails)
        {
            this.CalculateDates22(StartDate,oVM);
        }
        else
        {
            return this.CalculateDates1(StartDate)
        }
    }

    private CalculateDates2(StartDate: DateTime, oVM: BasicDetailsVM): void {
        if (oVM != null && oVM.TitratedDoseDetails != null && oVM.TitratedDoseDetails.GrdTitrated != null && oVM.TitratedDoseDetails.GrdTitrated.Count > 0) {
            for (let i: number = 0; i < oVM.TitratedDoseDetails.GrdTitrated.Count; i++) {
                if (DateTime.NotEquals(oVM.TitratedDoseDetails.Stardate, StartDate)) {
                    oVM.TitratedDoseDetails.GrdTitrated[i].ScheduledDate = new Array(CConstants.TitratedgridSize);
                    oVM.TitratedDoseDetails.GrdTitrated[i].ScheduledDate = this.CalculateDates(StartDate);
                    oVM.TitratedDoseDetails.GrdTitrated[i].ScheduleDoseValue = new Array(CConstants.TitratedgridSize);
                }
                this.CalculateDates(StartDate, oVM.TitratedDoseDetails.GrdTitrated[i]);
            }
            if (DateTime.NotEquals(oVM.TitratedDoseDetails.Stardate, StartDate)) {
                if (this.ReBindTitratedHeaderEvent != null)
                    this.ReBindTitratedHeaderEvent();
            }
        }
        else if (oVM != null && oVM.TitratedDoseDetails != null) {
            if (DateTime.NotEquals(oVM.TitratedDoseDetails.Stardate, StartDate)) {
                if (DateTime.NotEquals(oVM.TitratedDoseDetails.Stardate, StartDate)) {
                    if (this.ReBindTitratedHeaderEvent != null)
                        this.ReBindTitratedHeaderEvent();
                }
            }
        }
    }
    private CalculateDates22(StartDate: DateTime, oTitratedScheduleDetails: TitratedScheduleDetails): void {
        if (oTitratedScheduleDetails.ScheduledDate == null) {
            oTitratedScheduleDetails.ScheduledDate = new Array(CConstants.TitratedgridSize);
            oTitratedScheduleDetails.ScheduledDate = this.CalculateDates(StartDate);
        }
        else if (oTitratedScheduleDetails.ScheduledDate != null && oTitratedScheduleDetails.ScheduledDate.length > 0 && DateTime.Equals(oTitratedScheduleDetails.ScheduledDate[0], DateTime.MinValue)) {
            oTitratedScheduleDetails.ScheduledDate = this.CalculateDates(StartDate);
        }
    }
    private CalculateDates1(StartDate: DateTime): DateTime[] {
        let dt: DateTime[] = new Array(CConstants.TitratedgridSize);
        let basedate: DateTime= DateTime.MinValue;
        if (PatientContext.PrescriptionType == PrescriptionTypes.Clerking) {
            if (DateTime.NotEquals(StartDate, DateTime.MinValue)) {
                basedate = StartDate;
            }
            else {
                basedate = CommonBB.GetServerDateTime();
            }
            dt[6] = basedate;
            dt[5] = basedate.AddDays(-1);
            dt[4] = basedate.AddDays(-2);
            dt[3] = basedate.AddDays(-3);
            dt[2] = basedate.AddDays(-4);
            dt[1] = basedate.AddDays(-5);
            dt[0] = basedate.AddDays(-6);
        }
        if (PatientContext.PrescriptionType == PrescriptionTypes.Discharge || PatientContext.PrescriptionType == PrescriptionTypes.Outpatient || PatientContext.PrescriptionType == PrescriptionTypes.Leave) {
            basedate = StartDate;
            dt[6] = basedate.AddDays(6);
            dt[5] = basedate.AddDays(5);
            dt[4] = basedate.AddDays(4);
            dt[3] = basedate.AddDays(3);
            dt[2] = basedate.AddDays(2);
            dt[1] = basedate.AddDays(1);
            dt[0] = basedate;
        }
        return dt;
    }
    public FillGridData(GrdTitrated: ObservableCollection<TitratedScheduleDetails>, StartDate: DateTime): void {
        if (GrdTitrated == null || GrdTitrated.Count == 0) {
            if (!String.IsNullOrEmpty(this.Frequencytext) && this.oAdminTimesVM != null && this.oAdminTimesVM.FreqDetails != null) {
                let nLowEvent: number = this.oAdminTimesVM.FreqDetails.oFrequency.LowEvent;
                let sUOM: string = this.oAdminTimesVM.FreqDetails.oFrequency.UOM;
                let time: DateTime= DateTime.MinValue;
                if (String.Equals(this.oAdminTimesVM.FreqDetails.oFrequency.Type, CConstants.PeriodFrequency)) {
                    let bDrugRound: boolean = false;
                    let SlotTimeMode: string;
                    if ((this.oAdminTimesVM.FreqDetails.oDrugRoundTimes != null && this.oAdminTimesVM.FreqDetails.oDrugRoundTimes.Count > 0)) {
                        bDrugRound = true;
                    }
                    if (this.IsDefaultFixedTime) {
                        SlotTimeMode = 'F';
                    }
                    else {
                        if (bDrugRound) {
                            SlotTimeMode = 'D';
                        }
                        else {
                            SlotTimeMode = 'F';
                        }
                    }
                    if (this.oAdminTimesVM.FreqDetails != null && (this.oAdminTimesVM.FreqDetails.oFixedTimes == null || this.oAdminTimesVM.FreqDetails.oFixedTimes.Count == 0) && (this.oAdminTimesVM.FreqDetails.oDrugRoundTimes == null || this.oAdminTimesVM.FreqDetails.oDrugRoundTimes.Count == 0)) {
                        this.IsHavingAdminTime = CConstants.sIsHavingtimeZero;
                        if (String.Equals(sUOM, CConstants.UOMType2, StringComparison.CurrentCultureIgnoreCase) || String.Equals(sUOM, CConstants.UOMType3, StringComparison.CurrentCultureIgnoreCase) || String.Equals(sUOM, CConstants.UOMType4, StringComparison.CurrentCultureIgnoreCase)) {
                            nLowEvent = 1;
                        }
                        time = DateTime.MinValue;
                        for (let i: number = 0; i < nLowEvent; i++) {
                            if (PatientContext.PrescriptionType == PrescriptionTypes.Clerking) {
                                StartDate = CommonBB.GetServerDateTime();
                            }
                            if (DateTime.NotEquals(StartDate, DateTime.MinValue)) {
                                let oTitratedScheduleDetails: TitratedScheduleDetails = new TitratedScheduleDetails();
                                oTitratedScheduleDetails.ScheduleTime = CConstants.sDose + (i + 1);
                                oTitratedScheduleDetails.DupScheduleTime = time.AddMinutes(i).TimeOfDay.ToString();
                                oTitratedScheduleDetails.ScheduleDTTM = DateTime.Today;
                                oTitratedScheduleDetails.ScheduleDoseValue = new Array(CConstants.TitratedgridSize);
                                oTitratedScheduleDetails.ScheduleDoseUOM = this.DoseUOM;
                                this.CalculateDates(StartDate, oTitratedScheduleDetails);
                                this.GrdTitrated.Add(oTitratedScheduleDetails);
                            }
                        }
                    }
                    else if (SlotTimeMode == 'D' && ((this.oAdminTimesVM.FreqDetails.oDrugRoundTimes != null && this.oAdminTimesVM.FreqDetails.oDrugRoundTimes.Count > 0))) {
                        this.IsHavingAdminTime = CConstants.sIsHavingtime;
                        let nCount: number = this.AdminTimeGrdData.Count;
                        for (let i: number = 0; i < nCount; i++) {
                            let oTitratedScheduleDetails1: TitratedScheduleDetails = new TitratedScheduleDetails();
                            oTitratedScheduleDetails1.ScheduleTime = this.AdminTimeGrdData[i].DruRoundTimes;
                            oTitratedScheduleDetails1.ScheduleDTTM = DateTime.Today;
                            oTitratedScheduleDetails1.ScheduleDoseValue = new Array(CConstants.TitratedgridSize);
                            oTitratedScheduleDetails1.ScheduleDoseUOM = this.DoseUOM;
                            this.CalculateDates(StartDate, oTitratedScheduleDetails1);
                            this.GrdTitrated.Add(oTitratedScheduleDetails1);
                        }
                    }
                    else if (SlotTimeMode == 'F' && ((this.oAdminTimesVM.FreqDetails.oFixedTimes != null && this.oAdminTimesVM.FreqDetails.oFixedTimes.Count > 0))) {
                        let nCount: number = this.AdminTimeGrdData.Count;
                        this.IsHavingAdminTime = CConstants.sIsHavingtime;
                        for (let i: number = 0; i < nCount; i++) {
                            let oTitratedScheduleDetails1: TitratedScheduleDetails = new TitratedScheduleDetails();
                            oTitratedScheduleDetails1.ScheduleTime = this.AdminTimeGrdData[i].FixedTimes;
                            oTitratedScheduleDetails1.ScheduleDTTM = DateTime.Today;
                            oTitratedScheduleDetails1.ScheduleDoseValue = new Array(CConstants.TitratedgridSize);
                            oTitratedScheduleDetails1.ScheduleDoseUOM = this.DoseUOM;
                            this.CalculateDates(StartDate, oTitratedScheduleDetails1);
                            this.GrdTitrated.Add(oTitratedScheduleDetails1);
                        }
                    }
                    else if (SlotTimeMode == 'F') {
                        time = DateTime.MinValue;
                        for (let i: number = 0; i < nLowEvent; i++) {
                            if (PatientContext.PrescriptionType == PrescriptionTypes.Clerking) {
                                StartDate = CommonBB.GetServerDateTime();
                            }
                            if (DateTime.NotEquals(StartDate, DateTime.MinValue)) {
                                let oTitratedScheduleDetails: TitratedScheduleDetails = new TitratedScheduleDetails();
                                oTitratedScheduleDetails.ScheduleTime = CConstants.sDose + (i + 1);
                                oTitratedScheduleDetails.DupScheduleTime = time.AddMinutes(i).TimeOfDay.ToString();
                                oTitratedScheduleDetails.ScheduleDTTM = DateTime.Today;
                                oTitratedScheduleDetails.ScheduleDoseValue = new Array(CConstants.TitratedgridSize);
                                oTitratedScheduleDetails.ScheduleDoseUOM = this.DoseUOM;
                                this.CalculateDates(StartDate, oTitratedScheduleDetails);
                                this.GrdTitrated.Add(oTitratedScheduleDetails);
                            }
                        }
                    }
                }
                else {
                    if (PatientContext.PrescriptionType == PrescriptionTypes.Clerking) {
                        StartDate = CommonBB.GetServerDateTime();
                    }
                    this.IsHavingAdminTime = CConstants.sIsHavingtimeZero;
                    let iteration: number = 0;
                    let lowPeriod: number = this.oAdminTimesVM.FreqDetails.oFrequency.LowPeriod;
                    let Mintues: number = 60;
                    let TotalMintues: number = 1440;
                    let TotalHours: number = 24;
                    let Hours: number = 24;
                    let Day: number = 1;
                    let i: number = 0;
                    let startTime: DateTime= StartDate;
                    let endTime: DateTime= DateTime.MinValue;
                    time = DateTime.MinValue;
                    if (String.Equals(sUOM, CConstants.UOMType5, StringComparison.CurrentCultureIgnoreCase)) {
                        iteration = (lowPeriod * Mintues * Hours) < TotalMintues ? (lowPeriod * Mintues * Hours) : TotalMintues;
                        endTime = startTime.AddMinutes(iteration);
                    }
                    else if (String.Equals(sUOM, CConstants.UOMType6, StringComparison.CurrentCultureIgnoreCase)) {
                        iteration = (lowPeriod * Hours) < TotalHours ? (lowPeriod * Hours) : TotalHours;
                        endTime = startTime.AddHours(iteration);
                    }
                    else if (String.Equals(sUOM, CConstants.OnceOnlyFrequency, StringComparison.CurrentCultureIgnoreCase)) {
                        endTime = startTime;
                    }
                    else if (String.Equals(sUOM, CConstants.UOMType1, StringComparison.CurrentCultureIgnoreCase) || String.Equals(sUOM, CConstants.UOMType2, StringComparison.CurrentCultureIgnoreCase) || String.Equals(sUOM, CConstants.UOMType3, StringComparison.CurrentCultureIgnoreCase) || String.Equals(sUOM, CConstants.UOMType4, StringComparison.CurrentCultureIgnoreCase)) {
                        endTime = startTime.AddDays(Day);
                    }
                    let DoFillAdminTimes: boolean = false;
                    if (PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration && !String.IsNullOrEmpty(this.FreqDetails.oFrequency.Type) && String.Equals(this.FreqDetails.oFrequency.Type, CConstants.IntervalFreq) && StartDate.Year > CConstants.DateTimeMinYear) {
                        DoFillAdminTimes = true;
                    }
                    if (DoFillAdminTimes || StartDate.Year > CConstants.DateTimeMinYear) {
                        startTime = startTime.ToUniversalTime();
                        endTime = endTime.ToUniversalTime();
                        while (DateTime.NotEquals(endTime, DateTime.MinValue) && DateTime.LessThan(startTime, endTime)) {
                            let oTitratedScheduleDetails1: TitratedScheduleDetails = new TitratedScheduleDetails();
                            oTitratedScheduleDetails1.ScheduleTime = CConstants.sDose + (i + 1);
                            oTitratedScheduleDetails1.DupScheduleTime = time.AddMinutes(i).TimeOfDay.ToString();
                            oTitratedScheduleDetails1.ScheduleDTTM = DateTime.Today;
                            oTitratedScheduleDetails1.ScheduleDoseValue = new Array(CConstants.TitratedgridSize);
                            oTitratedScheduleDetails1.ScheduleDoseUOM = this.DoseUOM;
                            this.CalculateDates(StartDate, oTitratedScheduleDetails1);
                            this.GrdTitrated.Add(oTitratedScheduleDetails1);
                            if (String.Equals(sUOM, CConstants.UOMType5, StringComparison.CurrentCultureIgnoreCase)) {
                                startTime = startTime.AddMinutes(lowPeriod);
                            }
                            else if (String.Equals(sUOM, CConstants.UOMType6, StringComparison.CurrentCultureIgnoreCase)) {
                                startTime = startTime.AddHours(lowPeriod);
                            }
                            else {
                                startTime = startTime.AddDays(lowPeriod);
                            }
                            i++;
                        }
                    }
                }
                if (this.ReBindTitratedGRIDEvent != null)
                    this.ReBindTitratedGRIDEvent();
            }
        }
    }
    AddScheduleDetailsCols(ScheduleTime: string, nDurationInDays: number): TitratedScheduleDetails {
        let oTitratedScheduleDetails: TitratedScheduleDetails = new TitratedScheduleDetails();
        oTitratedScheduleDetails.ScheduleTime = ScheduleTime;
        if (nDurationInDays > 0) {
            oTitratedScheduleDetails.ScheduleDoseValue = new Array(CConstants.TitratedgridSize);
            oTitratedScheduleDetails.ScheduledDate = new Array(nDurationInDays);
        }
        else {
            oTitratedScheduleDetails.ScheduleDoseValue = new Array(CConstants.TitratedgridSize);
            oTitratedScheduleDetails.ScheduledDate = new Array(CConstants.TitratedgridSize);
        }
        oTitratedScheduleDetails.ScheduleDoseUOM = this.DoseUOM;
        return oTitratedScheduleDetails;
    }
    public UpdateHeader(oBasicVM: BasicDetailsVM, TitratedStartDate: DateTime): void {
        if (DateTime.NotEquals(TitratedStartDate, DateTime.MinValue) && oBasicVM != null && oBasicVM.TitratedDoseDetails != null && oBasicVM.TitratedDoseDetails.GrdTitrated != null && oBasicVM.TitratedDoseDetails.GrdTitrated.Count > 0) {
            oBasicVM.TitratedDoseDetails.GrdTitrated.ForEach(reinsert => reinsert.ScheduledDate = this.CalculateDates(TitratedStartDate));
        }
    }
    public getAdministrationtimes(lnFreqOID: number): void {
        let oReq: IPPMAManagePrescSer.CReqMsgGetAdministrationTimes = ObjectHelper.CreateObject(new IPPMAManagePrescSer.CReqMsgGetAdministrationTimes(), {
            oContextInformation: Common.FillContext(),
            lnFrequencyOIDBC: lnFreqOID,
            sMCVersionBC: AppSessionInfo.AMCV,
            lnEncounterOIDBC: PatientContext.EncounterOid
        });
        this.FreqOnChange = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
        this.FreqOnChange.GetAdministrationTimesCompleted  = (s,e) => { this.FreqOnChange_GetAdministrationTimesCompleted(s,e); } ;
        this.FreqOnChange.GetAdministrationTimesAsync(oReq);
    }
    FreqOnChange_GetAdministrationTimesCompleted(sender: Object, e: IPPMAManagePrescSer.GetAdministrationTimesCompletedEventArgs): void {
        if (e.Error != null || e.Result == null)
            return
        let oRes: IPPMAManagePrescSer.CResMsgGetAdministrationTimes = e.Result;
        if (oRes.oFrequency == null)
            return
        let nNumberOfColumns: number = 0;
        this.FreqDetails = oRes;
        if (this.FreqDetails != null) {
            this.oAdminTimesVM = new AdminstrativeTimesVM();
            this.oAdminTimesVM.FreqDetails = this.FreqDetails;
            if (this.FreqDetails.oFixedTimes != null) {
                this.oAdminTimesVM.CheckSortTimes(this.FreqDetails.oFixedTimes, 'F');
                nNumberOfColumns = this.oAdminTimesVM.FreqDetails.oFixedTimes.Count;
            }
            if (this.FreqDetails.oDrugRoundTimes != null) {
                this.oAdminTimesVM.CheckSortTimes(this.FreqDetails.oDrugRoundTimes, 'D');
                nNumberOfColumns = this.oAdminTimesVM.FreqDetails.oDrugRoundTimes.Count;
            }
            this.oAdminTimesVM.sFrequencyType = this.FreqDetails.oFrequency.Type;
            this.oAdminTimesVM.sFrequencyUOM = this.FreqDetails.oFrequency.UOM;
            this.oAdminTimesVM.sFreqLowEvent = this.FreqDetails.oFrequency.LowEvent;
            let bDrugRound: boolean = false;
            let SlotTimeMode: string;
            if ((this.oAdminTimesVM.FreqDetails.oDrugRoundTimes != null && this.oAdminTimesVM.FreqDetails.oDrugRoundTimes.Count > 0)) {
                bDrugRound = true;
            }
            if (this.IsDefaultFixedTime) {
                SlotTimeMode = 'F';
            }
            else {
                if (bDrugRound) {
                    SlotTimeMode = 'D';
                }
                else {
                    SlotTimeMode = 'F';
                }
            }
            this.oAdminTimesVM.GrdData = new ObservableCollection<GrdAdminstrativeTimesCols>();
            if (this.FreqDetails != null && this.FreqDetails.oDrugRoundTimes != null && SlotTimeMode == 'D') {
                this.oAdminTimesVM.FillGrid(this.FreqDetails.oDrugRoundTimes, this.oAdminTimesVM.GrdData, CConstants.sDrugrndtime, this.FreqDetails.oFrequency.UOM, this.FreqDetails.oFrequency.LowEvent);
                this.AdminTimeGrdData = this.oAdminTimesVM.GrdData;
            }
            if (this.FreqDetails != null && this.FreqDetails.oFixedTimes != null && SlotTimeMode == 'F') {
                this.oAdminTimesVM.FillGrid(this.FreqDetails.oFixedTimes, this.oAdminTimesVM.GrdData, CConstants.sFixedTime, this.FreqDetails.oFrequency.UOM, this.FreqDetails.oFrequency.LowEvent);
                this.AdminTimeGrdData = this.oAdminTimesVM.GrdData;
            }
            this.GrdTitrated = new ObservableCollection<TitratedScheduleDetails>();
            this.LoadData(this.Stardate, this.DoseUOM);
        }
    }
    public FillExistingTitratedSchDtl(oGrdTitrated: ObservableCollection<TitratedScheduleDetails>): void {
        this.TempGrdTitrated = new ObservableCollection<TitratedScheduleDetails>();
        if (oGrdTitrated != null && oGrdTitrated.Count > 0) {
            let nCount: number = oGrdTitrated.Count;
            for (let i: number = 0; i < nCount; i++) {
                let oTitratedSchdtl: TitratedScheduleDetails = new TitratedScheduleDetails();
                let SchlDosevalue: string[] = new Array(CConstants.TitratedgridSize);
                SchlDosevalue = oGrdTitrated[i].ScheduleDoseValue;
                oTitratedSchdtl.ScheduleDoseValue = new Array(CConstants.TitratedgridSize);
                oTitratedSchdtl.ScheduleDoseValue = SchlDosevalue;
                oTitratedSchdtl.ScheduleTime = oGrdTitrated[i].ScheduleTime;
                this.TempGrdTitrated.Add(oTitratedSchdtl);
            }
        }
    }
    public DoCleanUP(): void {
        //Not Required for LHS. To be Re-Visited.
        // throw new NotImplementedException();
    }
}
export class TitratedScheduleDetails extends ClonableViewModelBase implements IViewModelBase {
    private _scheduleTime: string;
    public get ScheduleTime(): string {
        return this._scheduleTime;
    }
    public set ScheduleTime(value: string) {
        this._scheduleTime = value;
       //NotifyPropertyChanged("ScheduleTime");
    }
    private _dupscheduleTime: string;
    public get DupScheduleTime(): string {
        return this._dupscheduleTime;
    }
    public set DupScheduleTime(value: string) {
        this._dupscheduleTime = value;
       //NotifyPropertyChanged("DupScheduleTime");
    }
    private _scheduleDoseValue: string[];
    public get ScheduleDoseValue(): string[] {
        return this._scheduleDoseValue;
    }
    public set ScheduleDoseValue(value: string[]) {
        if (!Helper.ReferenceEquals(this._scheduleDoseValue, value)) {
            this._scheduleDoseValue = value;
           //NotifyPropertyChanged("ScheduleDoseValue");
        }
    }
    private _scheduledDate: DateTime[];
    public get ScheduledDate(): DateTime[] {
        return this._scheduledDate;
    }
    public set ScheduledDate(value: DateTime[]) {
        this._scheduledDate = value;
    }
    private _scheduleDoseUOM: string;
    public get ScheduleDoseUOM(): string {
        return this._scheduleDoseUOM;
    }
    public set ScheduleDoseUOM(value: string) {
        this._scheduleDoseUOM = " " + value;
    }
    private _ScheduleDTTM: DateTime = DateTime.MinValue;
    public get ScheduleDTTM(): DateTime{
        return this._ScheduleDTTM;
    }
    public set ScheduleDTTM(value: DateTime) {
        this._ScheduleDTTM = value;
       //NotifyPropertyChanged("ScheduleDTTM");
    }
    public DoCleanUP(): void {

    }
}