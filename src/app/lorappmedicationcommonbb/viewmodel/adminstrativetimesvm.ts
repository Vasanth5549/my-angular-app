import { StringComparison, ObservableCollection, List, IEnumerable, CContextInformation } from 'epma-platform/models';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { ObjectHelper } from 'epma-platform/helper';
import { GrdAdminstrativeTimesCols } from './prescriptionitemdetailsvm';
import * as IPPMAManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { AppContextInfo, AppSessionInfo, ContextInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { ConstDurationUOM } from '../utilities/constants';
import { Dictionary } from 'epma-platform/dictionary';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import { Convert } from 'epma-platform/services';
import 'epma-platform/booleanextension';
import 'epma-platform/numberextension';
import 'epma-platform/stringextension';
import {iMath} from 'epma-platform/mathextension';
import 'epma-platform/arrayextension';

    export class AdminstrativeTimesVM extends ViewModelBase {
        public fixedTimelst: List<string>;
        public sFrequencyType: string = String.Empty;
        public sFrequencyUOM: string = String.Empty;
        public sFreqLowEvent: number = 0;
        public dtStartDate: DateTime = DateTime.MinValue;
        public dtEndDate: DateTime = DateTime.MinValue;
        //public delegate void FreqDetailsDelegate();
        public FreqDetailsCompleted: Function;
        //public delegate void AdminstrativeTimesDelegate();
        public AdminstrativeTimesCompleted: Function;
        //public delegate void PRNCheckedDelegate();
        public PRNCheckedEvent: Function;
        private _grdData: ObservableCollection<GrdAdminstrativeTimesCols> = new ObservableCollection<GrdAdminstrativeTimesCols>();
        public get GrdData(): ObservableCollection<GrdAdminstrativeTimesCols> {
            return this._grdData;
        }
        public set GrdData(value: ObservableCollection<GrdAdminstrativeTimesCols>) {
            //this._grdData = value;
            if(value != null)
            {
                this._grdData.CopyFrom(value);
            }
           //NotifyPropertyChanged("GrdData");
        }
        private _SlotTimeMode: string = '';
        public get SlotTimeMode(): string {
            return this._SlotTimeMode;
        }
        public set SlotTimeMode(value: string) {
            this._SlotTimeMode = value;
        }
        private _IsSlotModeEnabled: Boolean = true;
        public get IsSlotModeEnabled(): Boolean {
            return this._IsSlotModeEnabled;
        }
        public set IsSlotModeEnabled(value: Boolean) {
            this._IsSlotModeEnabled = value;
        }
        private _IsTimesEnabled: Boolean = true;
        public get IsTimesEnabled(): Boolean {
            return this._IsTimesEnabled;
        }
        public set IsTimesEnabled(value: Boolean) {
            this._IsTimesEnabled = value;
            if (this.PRNCheckedEvent != null)
                this.PRNCheckedEvent();
           //NotifyPropertyChanged("IsTimesEnabled");
        }
        private _FrequencyLowEvent: number = 0;
        public get FrequencyLowEvent(): number {
            return this._FrequencyLowEvent;
        }
        public set FrequencyLowEvent(value: number) {
            this._FrequencyLowEvent = value;
        }
        private _isSun: boolean = false;
        private _isSunEnable: boolean = true;
        private _isMon: boolean  = false;
        private _isMonEnable: boolean = true;
        private _isTue: boolean  = false;
        private _isTueEnable: boolean = true;
        private _isWed: boolean  = false;
        private _isWedEnable: boolean = true;
        private _isThu: boolean  = false;
        private _isThuEnable: boolean = true;
        private _isFri: boolean  = false;
        private _isFriEnable: boolean = true;
        private _isSat: boolean  = false;
        private _isSatEnable: boolean = true;
        public get IsSun(): boolean {
            return this._isSun;
        }
        public set IsSun(value: boolean) {
            if (this._isSun != value) {
                this._isSun = value;
               //NotifyPropertyChanged("IsSun");
            }
            this.CheckAndSetDaysOfWeekState();
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
            }
            this.CheckAndSetDaysOfWeekState();
        }
        public get IsThuEnable(): boolean {
            return this._isThuEnable;
        }
        public set IsThuEnable(value: boolean) {
            if (this._isThuEnable != value) {
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
            }
            this.CheckAndSetDaysOfWeekState();
        }
        public get IsFriEnable(): boolean {
            return this._isFriEnable;
        }
        public set IsFriEnable(value: boolean) {
            if (this._isFriEnable != value) {
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
        private CheckAndSetDaysOfWeekState(): void {
            let nCheckedCount: number = 0;
            let nLowEvent: number = this.FrequencyLowEvent;
            if (this.IsSun)
                nCheckedCount++;
            if (this.IsMon)
                nCheckedCount++;
            if (this.IsTue)
                nCheckedCount++;
            if (this.IsWed)
                nCheckedCount++;
            if (this.IsThu)
                nCheckedCount++;
            if (this.IsFri)
                nCheckedCount++;
            if (this.IsSat)
                nCheckedCount++;
            this.EnableDisableDaysOfWeek(nCheckedCount, nLowEvent);
        }
        private EnableDisableDaysOfWeek(nCheckedCount: number, nLowEvent: number): void {
            if (nCheckedCount >= nLowEvent) {
                if (!this.IsSun)
                    this.IsSunEnable = false;
                else this.IsSunEnable = true;
                if (!this.IsMon)
                    this.IsMonEnable = false;
                else this.IsMonEnable = true;
                if (!this.IsTue)
                    this.IsTueEnable = false;
                else this.IsTueEnable = true;
                if (!this.IsWed)
                    this.IsWedEnable = false;
                else this.IsWedEnable = true;
                if (!this.IsThu)
                    this.IsThuEnable = false;
                else this.IsThuEnable = true;
                if (!this.IsFri)
                    this.IsFriEnable = false;
                else this.IsFriEnable = true;
                if (!this.IsSat)
                    this.IsSatEnable = false;
                else this.IsSatEnable = true;
            }
            else {
                this.IsSunEnable = this.IsMonEnable = this.IsTueEnable = this.IsWedEnable = this.IsThuEnable = this.IsFriEnable = this.IsSatEnable = true;
            }
        }
        private _freqDetails: IPPMAManagePrescSer.CResMsgGetAdministrationTimes;
        public get FreqDetails(): IPPMAManagePrescSer.CResMsgGetAdministrationTimes {
            return this._freqDetails;
        }
        public set FreqDetails(value: IPPMAManagePrescSer.CResMsgGetAdministrationTimes) {
            if (this._freqDetails != value) {
                this._freqDetails = value;
            }
        }
        constructor();
        constructor(lnFrequencyOID?: number | DateTime);
        constructor(lnFrequencyOID?: number | DateTime, sceduledTimelst?: List<string> | DateTime);
        constructor(lnFrequencyOID?: number | DateTime, sceduledTimelst?: List<string> | DateTime, cSlotTimeMode?: string);
        constructor(lnFrequencyOID?: number | DateTime, sceduledTimelst?: List<string> | DateTime, cSlotTimeMode?: string) {
            super();
            let dtPrescriptionStartDate: DateTime = null;
            let dtPrescriptionEndDate: DateTime = null;
            if (lnFrequencyOID && lnFrequencyOID instanceof DateTime) {
                dtPrescriptionStartDate = lnFrequencyOID;
                dtPrescriptionEndDate = <DateTime>sceduledTimelst;
            }
            switch(arguments.length) {
                case 1:
                    let oReq: IPPMAManagePrescSer.CReqMsgGetAdministrationTimes = ObjectHelper.CreateObject(new IPPMAManagePrescSer.CReqMsgGetAdministrationTimes(), {
                    oContextInformation: ObjectHelper.CreateObject(new CContextInformation(), {
                        ReleaseVersion: ContextInfo.ReleaseVersion,
                        UserID: ContextInfo.UserOID,
                        SecurityToken: ContextInfo.SecurityToken,
                        PatientID: PatientContext.PatientOID.ToString(),
                        OrganizationID: AppContextInfo.OrganisationOID
                    }),
                    lnFrequencyOIDBC: lnFrequencyOID,
                    sMCVersionBC: AppSessionInfo.AMCV,
                    lnEncounterOIDBC: PatientContext.EncounterOid
                    });
                    let FreqOnChange: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
                    FreqOnChange.GetAdministrationTimesCompleted  = (s,e) => { this.FreqOnChange_GetAdministrationTimesCompleted(s,e); } ;
                    FreqOnChange.GetAdministrationTimesAsync(oReq);
                break;
                case 2:
                    this.dtStartDate = dtPrescriptionStartDate;
                    this.dtEndDate = dtPrescriptionEndDate;
                break;
                case 3:
                    if (cSlotTimeMode == String.MinValue || cSlotTimeMode == 'F')
                        this.fixedTimelst = <List<string>>sceduledTimelst;
                    let objServiceProxy: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
                    objServiceProxy.GetAdministrationTimesCompleted  = (s,e) => { this.objServiceProxy_GetAdministrationTimesCompleted(s,e); } ;
                    let objReqList: IPPMAManagePrescSer.CReqMsgGetAdministrationTimes = new IPPMAManagePrescSer.CReqMsgGetAdministrationTimes();
                    objReqList.lnFrequencyOIDBC = <number>lnFrequencyOID;
                    objReqList.lnEncounterOIDBC = PatientContext.EncounterOid;
                    objReqList.sMCVersionBC = AppSessionInfo.AMCV;
                    objReqList.oContextInformation = ObjectHelper.CreateObject(new CContextInformation(), {
                        ReleaseVersion: ContextInfo.ReleaseVersion,
                        UserID: ContextInfo.UserOID,
                        SecurityToken: ContextInfo.SecurityToken,
                        PatientID: PatientContext.PatientOID.ToString(),
                        OrganizationID: AppContextInfo.OrganisationOID
                    });
                    objServiceProxy.GetAdministrationTimesAsync(objReqList);
                break;
            }
        }

        FreqOnChange_GetAdministrationTimesCompleted(sender: Object, e: IPPMAManagePrescSer.GetAdministrationTimesCompletedEventArgs): void {
            if (e.Error == null && e.Result != null) {
                this.FreqDetails = e.Result;
            }
            if (this.FreqDetails != null) {
                if (this.FreqDetails.oFixedTimes != null) {
                    this.CheckSortTimes(this.FreqDetails.oFixedTimes, 'F');
                }
                if (this.FreqDetails.oDrugRoundTimes != null) {
                    this.CheckSortTimes(this.FreqDetails.oDrugRoundTimes, 'D');
                }
            }
            if (this.FreqDetailsCompleted != null)
                this.FreqDetailsCompleted();
        }

        public FillAdministrationTimes(
            param1: List<string> | IPPMAManagePrescSer.CResMsgGetAdministrationTimes | boolean,
            param2?: string | ObservableCollection<GrdAdminstrativeTimesCols>
        ) {
            if (arguments.length == 1) {
                this.FillAdministrationTimes2(<IPPMAManagePrescSer.CResMsgGetAdministrationTimes>param1);
            }
            else {
                if (param1 instanceof List && typeof(param2) == 'string') {
                    this.FillAdministrationTimes1(<List<string>>param1, param2)
                }
                else if (typeof(param1) == 'boolean' && (param2 instanceof ObservableCollection || param2 == null)) {
                    this.FillAdministrationTimes3(param1, param2 = null);
                }
            }
        }
        private FillAdministrationTimes1(sceduledTimelst: List<string>, SlotTimeMode: string): void {
            this.GrdData = new ObservableCollection<GrdAdminstrativeTimesCols>();
            this.sFrequencyType = this.FreqDetails.oFrequency.Type;
            this.sFrequencyUOM = this.FreqDetails.oFrequency.UOM;
            this.sFreqLowEvent = this.FreqDetails.oFrequency.LowEvent;
            if (String.Compare(this.sFrequencyType, "CC_PERIOD", StringComparison.CurrentCultureIgnoreCase) == 0) {
                this.FillGrid(sceduledTimelst, this.GrdData, SlotTimeMode, this.sFrequencyUOM, this.sFreqLowEvent);
            }
            else {
                if (!String.IsNullOrEmpty(this.FreqDetails.oFrequency.UOM) && this.FreqDetails.oFrequency.LowPeriod > 0) {
                    let iteration: number = 0;
                    let lowPeriod: number = this.FreqDetails.oFrequency.LowPeriod;
                    let Mintues: number = 60;
                    let TotalMintues: number = 1440;
                    let TotalHours: number = 24;
                    let Hours: number = 24;
                    let Day: number = 1;
                    let IsSTAT: boolean = false;
                    if (DateTime.Equals(this.dtStartDate, DateTime.MinValue))
                        this.dtStartDate = CommonBB.GetServerDateTime().Date;
                    let startTime: DateTime= this.dtStartDate;
                    let endTime: DateTime= DateTime.MinValue;
                    if (String.Compare(this.FreqDetails.oFrequency.UOM, "CC_MINUTES", StringComparison.CurrentCultureIgnoreCase) == 0) {
                        iteration = (lowPeriod * Mintues * Hours) < TotalMintues ? (lowPeriod * Mintues * Hours) : TotalMintues;
                        endTime = this.dtStartDate.AddMinutes(iteration);
                    }
                    else if (String.Compare(this.FreqDetails.oFrequency.UOM, "CC_HOURS", StringComparison.CurrentCultureIgnoreCase) == 0) {
                        iteration = (lowPeriod * Hours) < TotalHours ? (lowPeriod * Hours) : TotalHours;
                        endTime = this.dtStartDate.AddHours(iteration);
                    }
                    else if (String.Compare(this.FreqDetails.oFrequency.UOM, "CC_IPONCENLY", StringComparison.CurrentCultureIgnoreCase) == 0) {
                        endTime = this.dtStartDate;
                        IsSTAT = true;
                    }
                    else if (String.Compare(this.FreqDetails.oFrequency.UOM, "CC_MEDDRSN1", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.FreqDetails.oFrequency.UOM, "CC_MEDDRSN2", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.FreqDetails.oFrequency.UOM, "CC_MEDRSN3", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.FreqDetails.oFrequency.UOM, "CC_MEDRSN4", StringComparison.CurrentCultureIgnoreCase) == 0) {
                        endTime = this.dtStartDate.AddDays(Day);
                    }
                    if (DateTime.NotEquals(this.dtEndDate, DateTime.MinValue) && DateTime.LessThan(this.dtEndDate, endTime))
                        endTime = this.dtEndDate;
                    if (IsSTAT && DateTime.Equals(startTime.Date, endTime.Date) && DateTime.NotEquals(endTime, DateTime.MinValue)) {
                        startTime = this.AddminstrativeTimesRow(startTime, lowPeriod, this.FreqDetails.oFrequency.UOM);
                    }
                    else {
                        while (DateTime.NotEquals(endTime, DateTime.MinValue) && DateTime.LessThan(startTime, endTime)) {
                            startTime = this.AddminstrativeTimesRow(startTime, lowPeriod, this.FreqDetails.oFrequency.UOM);
                        }
                    }
                }
            }
            if (this.AdminstrativeTimesCompleted != null)
                this.AdminstrativeTimesCompleted();
        }
        private FillAdministrationTimes2(FreqDetails: IPPMAManagePrescSer.CResMsgGetAdministrationTimes): void {
            this.GrdData = new ObservableCollection<GrdAdminstrativeTimesCols>();
            this.sFrequencyType = FreqDetails.oFrequency.Type;
            this.sFrequencyUOM = FreqDetails.oFrequency.UOM;
            this.sFreqLowEvent = FreqDetails.oFrequency.LowEvent;
            if (String.Compare(this.sFrequencyType, "CC_PERIOD", StringComparison.CurrentCultureIgnoreCase) == 0) {
                if (String.Compare(this.sFrequencyUOM, "CC_MEDDRSN2", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.sFrequencyUOM, "CC_MEDRSN3", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.sFrequencyUOM, "CC_MEDRSN4", StringComparison.CurrentCultureIgnoreCase) == 0) {
                    this.FrequencyLowEvent = FreqDetails.oFrequency.LowEvent;
                    this.IsSun = FreqDetails.oFrequency.IsSunday;
                    this.IsMon = FreqDetails.oFrequency.IsMonday;
                    this.IsTue = FreqDetails.oFrequency.IsTuesday;
                    this.IsWed = FreqDetails.oFrequency.IsWednesday;
                    this.IsThu = FreqDetails.oFrequency.IsThursday;
                    this.IsFri = FreqDetails.oFrequency.IsFriday;
                    this.IsSat = FreqDetails.oFrequency.IsSaturday;
                }
                if (FreqDetails.oFixedTimes == null && FreqDetails.oDrugRoundTimes == null) {
                    this.FillGrid(String.Compare(this.sFrequencyUOM, "CC_MEDDRSN2", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.sFrequencyUOM, "CC_MEDRSN3", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.sFrequencyUOM, "CC_MEDRSN4", StringComparison.CurrentCultureIgnoreCase) == 0 ? 1 : FreqDetails.oFrequency.LowEvent, this.GrdData, "FixedTime", this.sFrequencyUOM, this.sFreqLowEvent);
                }
                else {
                    if (FreqDetails.oFixedTimes != null && FreqDetails.oDrugRoundTimes != null) {
                        this.FillGrid(FreqDetails.oFixedTimes, FreqDetails.oDrugRoundTimes, this.GrdData, this.sFrequencyUOM, this.sFreqLowEvent);
                    }
                    else {
                        if (FreqDetails.oFixedTimes != null) {
                            this.FillGrid(FreqDetails.oFixedTimes, this.GrdData, "FixedTime", this.sFrequencyUOM, this.sFreqLowEvent);
                        }
                        if (FreqDetails.oDrugRoundTimes != null) {
                            this.FillGrid(FreqDetails.oDrugRoundTimes, this.GrdData, "DrugRoundTime", this.sFrequencyUOM, this.sFreqLowEvent);
                        }
                    }
                }
            }
            else {
                if (!String.IsNullOrEmpty(FreqDetails.oFrequency.UOM) && FreqDetails.oFrequency.LowPeriod > 0) {
                    let iteration: number = 0;
                    let lowPeriod: number = FreqDetails.oFrequency.LowPeriod;
                    let Mintues: number = 60;
                    let TotalMintues: number = 1440;
                    let TotalHours: number = 24;
                    let Hours: number = 24;
                    let Day: number = 1;
                    let IsSTAT: boolean = false;
                    if (DateTime.Equals(this.dtStartDate, DateTime.MinValue))
                        this.dtStartDate = CommonBB.GetServerDateTime().Date;
                    let startTime: DateTime= this.dtStartDate;
                    let endTime: DateTime= DateTime.MinValue;
                    if (String.Compare(FreqDetails.oFrequency.UOM, "CC_MINUTES", StringComparison.CurrentCultureIgnoreCase) == 0) {
                        iteration = (lowPeriod * Mintues * Hours) < TotalMintues ? (lowPeriod * Mintues * Hours) : TotalMintues;
                        endTime = this.dtStartDate.AddMinutes(iteration);
                    }
                    else if (String.Compare(FreqDetails.oFrequency.UOM, "CC_HOURS", StringComparison.CurrentCultureIgnoreCase) == 0) {
                        iteration = (lowPeriod * Hours) < TotalHours ? (lowPeriod * Hours) : TotalHours;
                        endTime = this.dtStartDate.AddHours(iteration);
                    }
                    else if (String.Compare(FreqDetails.oFrequency.UOM, "CC_IPONCENLY", StringComparison.CurrentCultureIgnoreCase) == 0) {
                        endTime = this.dtStartDate;
                        IsSTAT = true;
                    }
                    else if (String.Compare(FreqDetails.oFrequency.UOM, "CC_MEDDRSN1", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(FreqDetails.oFrequency.UOM, "CC_MEDDRSN2", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(FreqDetails.oFrequency.UOM, "CC_MEDRSN3", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(FreqDetails.oFrequency.UOM, "CC_MEDRSN4", StringComparison.CurrentCultureIgnoreCase) == 0) {
                        endTime = this.dtStartDate.AddDays(Day);
                    }
                    if (DateTime.NotEquals(this.dtEndDate, DateTime.MinValue) && DateTime.LessThan(this.dtEndDate, endTime))
                        endTime = this.dtEndDate;
                    if (IsSTAT && DateTime.Equals(startTime.Date, endTime.Date) && DateTime.NotEquals(endTime, DateTime.MinValue)) {
                        startTime = this.AddminstrativeTimesRow(startTime, lowPeriod, FreqDetails.oFrequency.UOM);
                    }
                    else {
                        while (DateTime.NotEquals(endTime, DateTime.MinValue) && DateTime.LessThan(startTime, endTime)) {
                            startTime = this.AddminstrativeTimesRow(startTime, lowPeriod, FreqDetails.oFrequency.UOM);
                        }
                    }
                }
            }
            if (this.AdminstrativeTimesCompleted != null)
                this.AdminstrativeTimesCompleted();
        }
        private FillAdministrationTimes3(isStartDTTMModified: boolean = false, oMultiDoseDtl_AdminTimesData: ObservableCollection<GrdAdminstrativeTimesCols> = null): void {
            this.GrdData = new ObservableCollection<GrdAdminstrativeTimesCols>();
            this.sFrequencyType = this.FreqDetails.oFrequency.Type;
            this.sFrequencyUOM = this.FreqDetails.oFrequency.UOM;
            this.sFreqLowEvent = this.FreqDetails.oFrequency.LowEvent;
            if (String.Compare(this.sFrequencyType, "CC_PERIOD", StringComparison.CurrentCultureIgnoreCase) == 0) {
                if (String.Compare(this.sFrequencyUOM, "CC_MEDDRSN2", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.sFrequencyUOM, "CC_MEDRSN3", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.sFrequencyUOM, "CC_MEDRSN4", StringComparison.CurrentCultureIgnoreCase) == 0) {
                    this.FrequencyLowEvent = this.FreqDetails.oFrequency.LowEvent;
                    this.IsSun = this.FreqDetails.oFrequency.IsSunday;
                    this.IsMon = this.FreqDetails.oFrequency.IsMonday;
                    this.IsTue = this.FreqDetails.oFrequency.IsTuesday;
                    this.IsWed = this.FreqDetails.oFrequency.IsWednesday;
                    this.IsThu = this.FreqDetails.oFrequency.IsThursday;
                    this.IsFri = this.FreqDetails.oFrequency.IsFriday;
                    this.IsSat = this.FreqDetails.oFrequency.IsSaturday;
                }
                if (this.FreqDetails != null && this.FreqDetails.oFrequency != null && this.FreqDetails.oFixedTimes == null && this.FreqDetails.oDrugRoundTimes == null) {
                    let LowEvent: number;
                    if (String.Equals(this.sFrequencyUOM, ConstDurationUOM.Weeks, StringComparison.InvariantCultureIgnoreCase)) {
                        LowEvent = this.FreqDetails.oFrequency.NoOfEventsPerDay > 0 ? this.FreqDetails.oFrequency.NoOfEventsPerDay : 1;
                    }
                    else {
                        LowEvent = (String.Equals(this.sFrequencyUOM, "CC_MEDRSN3", StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.sFrequencyUOM, "CC_MEDRSN4", StringComparison.InvariantCultureIgnoreCase)) ? 1 : this.FreqDetails.oFrequency.LowEvent;
                    }
                    this.FillGrid(LowEvent, this.GrdData, "FixedTime", this.sFrequencyUOM, this.sFreqLowEvent);
                }
                else {
                    if (this.FreqDetails.oFixedTimes != null && this.FreqDetails.oDrugRoundTimes != null) {
                        this.FillGrid(this.FreqDetails.oFixedTimes, this.FreqDetails.oDrugRoundTimes, this.GrdData, this.sFrequencyUOM, this.sFreqLowEvent);
                    }
                    else {
                        if (this.FreqDetails.oFixedTimes != null) {
                            this.FillGrid(this.FreqDetails.oFixedTimes, this.GrdData, "FixedTime", this.sFrequencyUOM, this.sFreqLowEvent);
                        }
                        if (this.FreqDetails.oDrugRoundTimes != null) {
                            this.FillGrid(this.FreqDetails.oDrugRoundTimes, this.GrdData, "DrugRoundTime", this.sFrequencyUOM, this.sFreqLowEvent);
                        }
                    }
                }
            }
            else {
                if (!String.IsNullOrEmpty(this.FreqDetails.oFrequency.UOM) && this.FreqDetails.oFrequency.LowPeriod > 0) {
                    let iteration: number = 0;
                    let lowPeriod: number = this.FreqDetails.oFrequency.LowPeriod;
                    let Mintues: number = 60;
                    let TotalMintues: number = 1440;
                    let TotalHours: number = 24;
                    let Hours: number = 24;
                    let Day: number = 1;
                    let IsSTAT: boolean = false;
                    if (DateTime.Equals(this.dtStartDate, DateTime.MinValue))
                        this.dtStartDate = CommonBB.GetServerDateTime().Date;
                    let startTime: DateTime= this.dtStartDate;
                    let endTime: DateTime= DateTime.MinValue;
                    if (String.Compare(this.FreqDetails.oFrequency.UOM, "CC_MINUTES", StringComparison.CurrentCultureIgnoreCase) == 0) {
                        iteration = (lowPeriod * Mintues * Hours) < TotalMintues ? (lowPeriod * Mintues * Hours) : TotalMintues;
                        endTime = this.dtStartDate.AddMinutes(iteration);
                    }
                    else if (String.Compare(this.FreqDetails.oFrequency.UOM, "CC_HOURS", StringComparison.CurrentCultureIgnoreCase) == 0) {
                        iteration = (lowPeriod * Hours) < TotalHours ? (lowPeriod * Hours) : TotalHours;
                        endTime = this.dtStartDate.AddHours(iteration);
                    }
                    else if (String.Compare(this.FreqDetails.oFrequency.UOM, "CC_IPONCENLY", StringComparison.CurrentCultureIgnoreCase) == 0) {
                        endTime = this.dtStartDate;
                        IsSTAT = true;
                    }
                    else if (String.Compare(this.FreqDetails.oFrequency.UOM, "CC_MEDDRSN1", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.FreqDetails.oFrequency.UOM, "CC_MEDDRSN2", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.FreqDetails.oFrequency.UOM, "CC_MEDRSN3", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.FreqDetails.oFrequency.UOM, "CC_MEDRSN4", StringComparison.CurrentCultureIgnoreCase) == 0) {
                        endTime = this.dtStartDate.AddDays(Day);
                    }
                    if (DateTime.NotEquals(this.dtEndDate, DateTime.MinValue) && DateTime.LessThan(this.dtEndDate, endTime))
                        endTime = this.dtEndDate;
                    if (IsSTAT && DateTime.Equals(startTime.Date, endTime.Date) && DateTime.NotEquals(endTime, DateTime.MinValue)) {
                        startTime = (isStartDTTMModified && oMultiDoseDtl_AdminTimesData != null) ? this.AddminstrativeTimesRow(startTime, lowPeriod, this.FreqDetails.oFrequency.UOM, isStartDTTMModified, oMultiDoseDtl_AdminTimesData) : this.AddminstrativeTimesRow(startTime, lowPeriod, this.FreqDetails.oFrequency.UOM);
                    }
                    else {
                        while (DateTime.NotEquals(endTime, DateTime.MinValue) && DateTime.LessThan(startTime, endTime)) {
                            startTime = (isStartDTTMModified && oMultiDoseDtl_AdminTimesData != null) ? this.AddminstrativeTimesRow(startTime, lowPeriod, this.FreqDetails.oFrequency.UOM, isStartDTTMModified, oMultiDoseDtl_AdminTimesData) : this.AddminstrativeTimesRow(startTime, lowPeriod, this.FreqDetails.oFrequency.UOM);
                        }
                    }
                }
            }
            if (!isStartDTTMModified && oMultiDoseDtl_AdminTimesData == null && this.AdminstrativeTimesCompleted != null)
                this.AdminstrativeTimesCompleted();
        }
        public Clear(): void {
            this.GrdData = new ObservableCollection<GrdAdminstrativeTimesCols>();
            this.IsSunEnable = this.IsMonEnable = this.IsTueEnable = this.IsWedEnable = this.IsThuEnable = this.IsFriEnable = this.IsSatEnable = true;
            this.IsSun = this.IsMon = this.IsTue = this.IsWed = this.IsThu = this.IsFri = this.IsSat = false;
        }
        
        objServiceProxy_GetAdministrationTimesCompleted(sender: Object, e: IPPMAManagePrescSer.GetAdministrationTimesCompletedEventArgs): void {
            let _ErrorID: number = 80000045;
            let _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:Adminstrativetimesvm.cs, Method:objServiceProxy_GetAdministrationTimesCompleted()";
            this.GrdData = new ObservableCollection<GrdAdminstrativeTimesCols>();
            if (e.Error == null) {
                try {
                    if (e.Result.oFrequency != null && !String.IsNullOrEmpty(e.Result.oFrequency.Type)) {
                        this.sFrequencyType = e.Result.oFrequency.Type;
                        this.sFrequencyUOM = e.Result.oFrequency.UOM;
                        this.sFreqLowEvent = e.Result.oFrequency.LowEvent;
                        if (String.Compare(e.Result.oFrequency.Type, "CC_PERIOD", StringComparison.CurrentCultureIgnoreCase) == 0) {
                            if (this.fixedTimelst != null && this.fixedTimelst.Count > 0 && e.Result.oDrugRoundTimes != null && e.Result.oDrugRoundTimes.Count > 0) {
                                this.FillGrid(this.GrdData, this.sFrequencyUOM, this.sFreqLowEvent, e.Result.oDrugRoundTimes);
                            }
                            else {
                                if (this.fixedTimelst != null && this.fixedTimelst.Count > 0) {
                                    this.FillGrid(this.GrdData, this.sFrequencyUOM, this.sFreqLowEvent);
                                }
                                if (e.Result.oDrugRoundTimes != null && e.Result.oDrugRoundTimes.Count > 0) {
                                    this.FillGrid(e.Result.oDrugRoundTimes, this.GrdData, "DrugRoundTime", this.sFrequencyUOM, this.sFreqLowEvent);
                                }
                            }
                        }
                    }
                }
               catch(ex:any)  {
                    let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
            if (this.AdminstrativeTimesCompleted != null)
                this.AdminstrativeTimesCompleted();
        }
        AddminstrativeTimesRow(startTime: DateTime, lowPeriod: number, sUOM: string, isStartDTTMModified: boolean = false, oMultiDoseDtl_AdminTimesData: ObservableCollection<GrdAdminstrativeTimesCols> = null): DateTime{
            let oAdminstrativeTimesCols: GrdAdminstrativeTimesCols = new GrdAdminstrativeTimesCols();
            oAdminstrativeTimesCols.FrequencyType = "CC_INTERVAL";
            oAdminstrativeTimesCols.FrequencyUOM = sUOM;
            oAdminstrativeTimesCols.FixedTimes = startTime.ToUserDateTimeString("dd-MMM-yyyy");
            oAdminstrativeTimesCols.DruRoundTimes = startTime.ToUserDateTimeString("HH:mm");
            if (String.Compare(sUOM, "CC_MINUTES", StringComparison.CurrentCultureIgnoreCase) == 0) {
                startTime = startTime.AddMinutes(lowPeriod);
                oAdminstrativeTimesCols.LowPreiodInMinitus = lowPeriod;
            }
            else if (String.Compare(sUOM, "CC_HOURS", StringComparison.CurrentCultureIgnoreCase) == 0) {
                startTime = startTime.AddHours(lowPeriod);
                oAdminstrativeTimesCols.LowPreiodInMinitus = lowPeriod * 60;
            }
            else {
                startTime = startTime.AddDays(lowPeriod);
                oAdminstrativeTimesCols.LowPreiodInMinitus = lowPeriod * 1440;
            }
            if (this.FreqDetails != null)
                oAdminstrativeTimesCols.oFrequency = this.FreqDetails.oFrequency;
            if (isStartDTTMModified && oMultiDoseDtl_AdminTimesData != null) {
                oMultiDoseDtl_AdminTimesData.Add(oAdminstrativeTimesCols);
            }
            else {
                this.GrdData.Add(oAdminstrativeTimesCols);
            }
            return startTime;
        }
        formatHoursMintues(value: number): string {
            let rValue: string = "00";
            if (value > 0) {
                rValue = value.ToString("00");
            }
            return rValue;
        }
        FillGrid5(LowEvent: number, oGrdData: ObservableCollection<GrdAdminstrativeTimesCols>, sType: string, sFrequencyUOM: string, sFreqLowEvent: number): void {
            for (let i: number = 0; i < LowEvent; i++) {
                let oAdminstrativeTimesCols: GrdAdminstrativeTimesCols = new GrdAdminstrativeTimesCols();
                oAdminstrativeTimesCols.FrequencyType = "CC_PERIOD";
                oAdminstrativeTimesCols.FrequencyUOM = sFrequencyUOM;
                oAdminstrativeTimesCols.FixedTimes = String.Empty;
                oAdminstrativeTimesCols.FreqLowEvent = sFreqLowEvent;
                if (this.FreqDetails != null)
                    oAdminstrativeTimesCols.oFrequency = this.FreqDetails.oFrequency;
                oGrdData.Add(oAdminstrativeTimesCols);
            }
        }
        public FillGrid(
            param1?: List<string> | ObservableCollection<IPPMAManagePrescSer.IPPScheduledetails> | ObservableCollection<GrdAdminstrativeTimesCols> | number,
            param2?: ObservableCollection<GrdAdminstrativeTimesCols> | ObservableCollection<IPPMAManagePrescSer.IPPScheduledetails> |  string,
            param3?: string | ObservableCollection<GrdAdminstrativeTimesCols> | number,
            param4?: string | ObservableCollection<IPPMAManagePrescSer.IPPScheduledetails>,
            param5?: number
        ) {
            if (
                param1 instanceof List &&
                param2 instanceof ObservableCollection &&
                typeof(param3) == 'string' && typeof(param4) == 'string' &&
                typeof(param5) == 'number'
            ) {
                this.FillGrid1(param1, <ObservableCollection<GrdAdminstrativeTimesCols>>param2, param3, param4, param5);
            }
            else if (
                param1 instanceof ObservableCollection &&
                param2 instanceof ObservableCollection &&
                typeof(param3) == 'string' && typeof(param4) == 'string' &&
                typeof(param5) == 'number'
            ) {
                this.FillGrid2(<ObservableCollection<IPPMAManagePrescSer.IPPScheduledetails>>param1, <ObservableCollection<GrdAdminstrativeTimesCols>>param2, param3, param4, param5);
            }
            else if (
                param1 instanceof ObservableCollection &&
                param2 instanceof ObservableCollection &&
                param3 instanceof ObservableCollection &&
                typeof(param4) == 'string' && typeof(param5) == 'number'
            ) {
                this.FillGrid3(<ObservableCollection<IPPMAManagePrescSer.IPPScheduledetails>>param1, <ObservableCollection<IPPMAManagePrescSer.IPPScheduledetails>>param2, param3, param4, param5);
            }
            else if (
                arguments.length == 4 &&
                param1 instanceof ObservableCollection &&
                typeof(param2) == 'string' && typeof(param3) == 'number' &&
                param4 instanceof ObservableCollection
            ) {
                this.FillGrid4(<ObservableCollection<GrdAdminstrativeTimesCols>>param1, param2, param3, param4 = null)
            }
            else if (
                typeof(param1) == 'number' && 
                param2 instanceof ObservableCollection &&
                typeof(param3) == 'string' && typeof(param4) == 'string' &&
                typeof(param5) == 'number'
            ) {
                this.FillGrid5(param1, <ObservableCollection<GrdAdminstrativeTimesCols>>param2, param3, param4, param5);
            }
        }
        public FillGrid1(oScheduleTimeDetails: List<string>, oGrdData: ObservableCollection<GrdAdminstrativeTimesCols>, cSlotTimeMode: string, sFrequencyUOM: string, sFreqLowEvent: number): void {
            if (oScheduleTimeDetails != null && oScheduleTimeDetails.Count > 0) {
                let nCount: number = oScheduleTimeDetails.Count;
                let sScheduleTime: string[] = null;
                for (let i: number = 0; i < nCount; i++) {
                    let oAdminstrativeTimesCols: GrdAdminstrativeTimesCols = new GrdAdminstrativeTimesCols();
                    oAdminstrativeTimesCols.FrequencyType = "CC_PERIOD";
                    oAdminstrativeTimesCols.FrequencyUOM = sFrequencyUOM;
                    oAdminstrativeTimesCols.FreqLowEvent = sFreqLowEvent;
                    if (!String.IsNullOrEmpty(oScheduleTimeDetails[i])) {
                        sScheduleTime = oScheduleTimeDetails[i].Split(':');
                        if (sScheduleTime != null && sScheduleTime.length > 1) {
                            if (cSlotTimeMode == 'F') {
                                oAdminstrativeTimesCols.FixedTimes = this.formatHoursMintues(TimeSpan.FromHours(Convert.ToInt16(sScheduleTime[0])).Hours) + ":" + this.formatHoursMintues(TimeSpan.FromMinutes(Convert.ToInt16(sScheduleTime[1])).Minutes);
                            }
                            else if (cSlotTimeMode == 'D') {
                                oAdminstrativeTimesCols.DruRoundTimes = this.formatHoursMintues(TimeSpan.FromHours(Convert.ToInt16(sScheduleTime[0])).Hours) + ":" + this.formatHoursMintues(TimeSpan.FromMinutes(Convert.ToInt16(sScheduleTime[1])).Minutes);
                            }
                        }
                    }
                    if (this.FreqDetails != null)
                        oAdminstrativeTimesCols.oFrequency = this.FreqDetails.oFrequency;
                    oGrdData.Add(oAdminstrativeTimesCols);
                }
            }
        }
        public FillGrid2(oScheduledetails: ObservableCollection<IPPMAManagePrescSer.IPPScheduledetails>, oGrdData: ObservableCollection<GrdAdminstrativeTimesCols>, sType: string, sFrequencyUOM: string, sFreqLowEvent: number): void {
            let nCount: number = oScheduledetails.Count;
            for (let i: number = 0; i < nCount; i++) {
                let oAdminstrativeTimesCols: GrdAdminstrativeTimesCols = new GrdAdminstrativeTimesCols();
                oAdminstrativeTimesCols.FrequencyType = "CC_PERIOD";
                oAdminstrativeTimesCols.FrequencyUOM = sFrequencyUOM;
                oAdminstrativeTimesCols.FreqLowEvent = sFreqLowEvent;
                if (!String.IsNullOrEmpty(oScheduledetails[i].ScheduledTime)) {
                    if (String.Compare(sType, "FixedTime", StringComparison.CurrentCultureIgnoreCase) == 0) {
                        oAdminstrativeTimesCols.FixedTimes = this.formatHoursMintues(TimeSpan.FromMinutes(Convert.ToInt16(oScheduledetails[i].ScheduledTime)).Hours) + ":" + this.formatHoursMintues(TimeSpan.FromMinutes(Convert.ToInt16(oScheduledetails[i].ScheduledTime)).Minutes);
                    }
                    else {
                        oAdminstrativeTimesCols.DruRoundTimes = this.formatHoursMintues(TimeSpan.FromMinutes(Convert.ToInt16(oScheduledetails[i].ScheduledTime)).Hours) + ":" + this.formatHoursMintues(TimeSpan.FromMinutes(Convert.ToInt16(oScheduledetails[i].ScheduledTime)).Minutes);
                    }
                }
                if (this.FreqDetails != null)
                    oAdminstrativeTimesCols.oFrequency = this.FreqDetails.oFrequency;
                oGrdData.Add(oAdminstrativeTimesCols);
            }
        }
        FillGrid3(oFixedTimes: ObservableCollection<IPPMAManagePrescSer.IPPScheduledetails>, oDruRoundTimes: ObservableCollection<IPPMAManagePrescSer.IPPScheduledetails>, oGrdData: ObservableCollection<GrdAdminstrativeTimesCols>, sFrequencyUOM: string, sFreqLowEvent: number): void {
            let nCount: number = 0;
            if (oFixedTimes.Count > oDruRoundTimes.Count) {
                nCount = oFixedTimes.Count;
            }
            else {
                nCount = oDruRoundTimes.Count;
            }
            for (let i: number = 0; i < nCount; i++) {
                let oAdminstrativeTimesCols: GrdAdminstrativeTimesCols = new GrdAdminstrativeTimesCols();
                oAdminstrativeTimesCols.FrequencyType = "CC_PERIOD";
                oAdminstrativeTimesCols.FrequencyUOM = sFrequencyUOM;
                oAdminstrativeTimesCols.FreqLowEvent = sFreqLowEvent;
                if (i < oFixedTimes.Count) {
                    if (oFixedTimes[i] != null && !String.IsNullOrEmpty(oFixedTimes[i].ScheduledTime)) {
                        oAdminstrativeTimesCols.FixedTimes = this.formatHoursMintues(TimeSpan.FromMinutes(Convert.ToInt16(oFixedTimes[i].ScheduledTime)).Hours) + ":" + this.formatHoursMintues(TimeSpan.FromMinutes(Convert.ToInt16(oFixedTimes[i].ScheduledTime)).Minutes);
                    }
                }
                if (i < oDruRoundTimes.Count) {
                    if (oDruRoundTimes[i] != null && !String.IsNullOrEmpty(oDruRoundTimes[i].ScheduledTime)) {
                        oAdminstrativeTimesCols.DruRoundTimes = this.formatHoursMintues(TimeSpan.FromMinutes(Convert.ToInt16(oDruRoundTimes[i].ScheduledTime)).Hours) + ":" + this.formatHoursMintues(TimeSpan.FromMinutes(Convert.ToInt16(oDruRoundTimes[i].ScheduledTime)).Minutes);
                    }
                }
                if (this.FreqDetails != null)
                    oAdminstrativeTimesCols.oFrequency = this.FreqDetails.oFrequency;
                oGrdData.Add(oAdminstrativeTimesCols);
            }
        }
        FillGrid4(oGrdData: ObservableCollection<GrdAdminstrativeTimesCols>, sFrequencyUOM: string, sFreqLowEvent: number, oDruRoundTimes: ObservableCollection<IPPMAManagePrescSer.IPPScheduledetails> = null): void {
            let nFixedCount: number = this.fixedTimelst != null && this.fixedTimelst.Count > 0 ? this.fixedTimelst.Count : 0;
            let nDrugRoundCount: number = oDruRoundTimes != null && oDruRoundTimes.Count > 0 ? oDruRoundTimes.Count : 0;
            let nCount: number;
            if (!String.IsNullOrEmpty(sFrequencyUOM) && String.Equals(sFrequencyUOM, "CC_MEDDRSN1", StringComparison.InvariantCultureIgnoreCase) && sFreqLowEvent > 0) {
                nCount = sFreqLowEvent;
            }
            else {
                nCount = nFixedCount > nDrugRoundCount ? nFixedCount : nDrugRoundCount;
            }
            for (let i: number = 0; i < nCount; i++) {
                let oAdminstrativeTimesCols: GrdAdminstrativeTimesCols = new GrdAdminstrativeTimesCols();
                oAdminstrativeTimesCols.FrequencyType = "CC_PERIOD";
                oAdminstrativeTimesCols.FrequencyUOM = sFrequencyUOM;
                oAdminstrativeTimesCols.FreqLowEvent = sFreqLowEvent;
                if (i < nFixedCount) {
                    if (this.fixedTimelst[i] != null && !String.IsNullOrEmpty(this.fixedTimelst[i])) {
                        oAdminstrativeTimesCols.FixedTimes = this.fixedTimelst[i];
                    }
                }
                if (i < nDrugRoundCount) {
                    if (oDruRoundTimes[i] != null && !String.IsNullOrEmpty(oDruRoundTimes[i].ScheduledTime)) {
                        oAdminstrativeTimesCols.DruRoundTimes = this.formatHoursMintues(TimeSpan.FromMinutes(Convert.ToInt16(oDruRoundTimes[i].ScheduledTime)).Hours) + ":" + this.formatHoursMintues(TimeSpan.FromMinutes(Convert.ToInt16(oDruRoundTimes[i].ScheduledTime)).Minutes);
                    }
                }
                if (this.FreqDetails != null)
                    oAdminstrativeTimesCols.oFrequency = this.FreqDetails.oFrequency;
                oGrdData.Add(oAdminstrativeTimesCols);
            }
        }
        public EnableDisableAdminTimes(AdminType: string): void {
            if (this.GrdData != null && this.GrdData.Count > 0) {
                for (let i: number = 0; i < this.GrdData.Count; i++) {
                    if (AdminType == 'F') {
                        this.GrdData[i].IsFixedMandatory = true;
                        this.GrdData[i].IsDrugRoundEnabled = false;
                    }
                    else {
                        this.GrdData[i].IsFixedMandatory = false;
                        this.GrdData[i].IsDrugRoundEnabled = true;
                    }
                    if (AdminType == 'D') {
                        this.GrdData[i].IsDrugRoundMandatory = true;
                        this.GrdData[i].IsFixedEnabled = false;
                    }
                    else {
                        this.GrdData[i].IsDrugRoundMandatory = false;
                        this.GrdData[i].IsFixedEnabled = true;
                    }
                }
            }
        }
        public duplicatecheck(): string {
            let dictionary: Dictionary<string, string> = null;
            let dictionary1: Dictionary<string, string> = null;
            let sDuplicateTime: string = String.Empty;
            let nCount: number = this.GrdData.Count;
            for (let i: number = 0; i < nCount; i++) {
                if (dictionary == null)
                    dictionary = new Dictionary<string, string>();
                let s: string = this.GrdData[i].FixedTimes;
                if (this.GrdData[i].IsFixedEnabled && this.GrdData[i].IsFixedMandatory && !String.IsNullOrEmpty(s) && String.Compare(s, "00:00", StringComparison.CurrentCultureIgnoreCase) != 0) {
                    if (!dictionary.ContainsKey(this.GrdData[i].FixedTimes)) {
                        dictionary.Add((this.GrdData[i].FixedTimes), (this.GrdData[i].FixedTimes));
                    }
                    else {
                        if (dictionary1 == null)
                            dictionary1 = new Dictionary<string, string>();
                        if (!dictionary1.ContainsKey(this.GrdData[i].FixedTimes)) {
                            dictionary1.Add((this.GrdData[i].FixedTimes), (this.GrdData[i].FixedTimes));
                            sDuplicateTime = sDuplicateTime + dictionary1[this.GrdData[i].FixedTimes] + ",";
                        }
                    }
                }
            }
            return sDuplicateTime;
        }
        public CheckSortTimes(ScheduleTimes: ObservableCollection<IPPMAManagePrescSer.IPPScheduledetails>, isFixed: string): void {
            let nCount: number = ScheduleTimes.Count;
            let Times: List<number> = new List<number>();
            for (let i: number = 0; i < nCount; i++) {
                Times.Add(Convert.ToInt32(ScheduleTimes[i].ScheduledTime));
            }
            let sortedSchdTime: IEnumerable<number> = Times.OrderBy(x => x).AsEnumerable();
            let lstDTTM: List<number> = new List<number>(sortedSchdTime.AsEnumerable());
            for (let i: number = 0; i < nCount; i++) {
                if (isFixed == 'F')
                    this.FreqDetails.oFixedTimes[i].ScheduledTime = Convert.ToString(lstDTTM[i]);
                else if (isFixed == 'D')
                    this.FreqDetails.oDrugRoundTimes[i].ScheduledTime = Convert.ToString(lstDTTM[i]);
            }
        }
    }