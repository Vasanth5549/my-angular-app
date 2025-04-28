import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, CListItem, ObservableCollection, List } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from '../../shared/epma-platform/soap-client/helper.service';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper as Helper,ObjectHelper } from 'epma-platform/helper';
import * as IPPMAManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { ClonableViewModelBase } from 'src/app/lorappmedicationcommonbb/model/cloneviewmodel';
import { GrdAdminstrativeTimesCols, ScheduleDetailsCols } from 'src/app/lorappmedicationcommonbb/viewmodel/prescriptionitemdetailsvm';
import { AdminstrativeTimesVM } from 'src/app/lorappmedicationcommonbb/viewmodel/adminstrativetimesvm';
import { ActivityTypes } from '../model/common';
import { ProfileData } from '../utilities/profiledata';
import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { ScheduleDetailsSteppedVM } from 'src/app/lorappmedicationcommonbb/viewmodel/scheduledetailsvm';
import { CConstants, PrescriptionTypes } from '../utilities/constants';
import { ScheduleConfig } from 'src/app/lorappslprofiletypes/medication';

    export class MultipleDoseDetail extends ClonableViewModelBase {
        private _lowerDose: number = 0;
        private _upperDose: number = 0;
        private _doseUOM: CListItem;
        private _durationUOM: CListItem;
        private _durationValue: number = 0;
        private _frequency: CListItem;
        private _isPRN: boolean = false;
        private _doseInstructions: string;
        private _startDTTM: DateTime = DateTime.MinValue;
        private _endDTTM: DateTime = DateTime.MinValue;
        private _doseValueDisplay: string;
        private _durationValueDisplay: string;
        private _slotTimeMode: string = String.MinValue;
        private _adminTimes: string;
        private _adminTimesData: ObservableCollection<GrdAdminstrativeTimesCols>;
        private _daysofweek: string[];
        private _hyperlinkText: string;
        private _isHyperLink: boolean = false;
        private _scheduleDetailsData: ObservableCollection<ScheduleDetailsCols>;
        private _totalCols: number = 0;
        private _isDaywiseView: boolean = false;
        public DueDTTM: DateTime = DateTime.MinValue;
        public DueDose: number = 0;
        public DueDoseUOM: CListItem;
        public sceduledTimelst: List<string>;
        public PrescriptionItemDosageOID: number = 0;
        public PresItemInfusionDetailOID: number = 0;
        public OperationMode: string;
        private _infusionrate: string;
        private _infusionUpperrate: string;
        private _infratenumeratoruom: CListItem;
        private _infrateDenominatoruom: CListItem;
        private _infratenumeratorUOMList: ObservableCollection<CListItem>;
        public oAdminTimesVM: AdminstrativeTimesVM;
        private _FrequencyType: string;
        public ChangingDoseDetailSource: List<IPPMAManagePrescSer.IPPScheduledetails>;
        //public delegate void EndDTTMCalcRequiredDelegate();
        public EndDTTMCalcRequiredCompleted: Function;
        public IsAnyStepContainsDosesDuration: boolean = false;
        public ActionCode: ActivityTypes;
        public IsScheduleTimeLoaded: boolean = false;
        public SourcePrescriptionType: string = String.Empty;
        public LstElaspedDoses: List<string>;
        public OriginalLowerDose: string;
        public OriginalUpperDose: string;
        private _IsStartFromNextDay: boolean = false;
        public get IsStartFromNextDay(): boolean {
            return this._IsStartFromNextDay;
        }
        public set IsStartFromNextDay(value: boolean) {
            this._IsStartFromNextDay = value;
        }
        public StepSequenceNo: number = 0;
        public LstOriginalDoseValues: List<string>;
        public get IsReorderAndRetainSourceAdminTimes(): boolean {
            return (this.ActionCode == ActivityTypes.Reorder);
        }
        public IsAdditionalDose: boolean = false;
        constructor() {
            super();
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
        public IsDefaultFixedTime: boolean = false;
        public get InfratenumeratorUOMList(): ObservableCollection<CListItem> {
            return this._infratenumeratorUOMList;
        }
        public set InfratenumeratorUOMList(value: ObservableCollection<CListItem>) {
            if (this._infratenumeratorUOMList != value) {
                this._infratenumeratorUOMList = value;
               //NotifyPropertyChanged("InfratenumeratorUOMList");
            }
        }
        public get IsDaywiseView(): boolean {
            return this._isDaywiseView;
        }
        public set IsDaywiseView(value: boolean) {
            this._isDaywiseView = value;
           //NotifyPropertyChanged("IsDaywiseView");
        }
        private _lstofNonDaywiseDoses: List<string>;
        public get lstofNonDaywiseDoses(): List<string> {
            return this._lstofNonDaywiseDoses;
        }
        public set lstofNonDaywiseDoses(value: List<string>) {
            if (this._lstofNonDaywiseDoses != value) {
                this._lstofNonDaywiseDoses = value;
               //NotifyPropertyChanged("lstofNonDaywiseDoses");
            }
        }
        public get DoseValueDisplay(): string {
            return this._doseValueDisplay;
        }
        public set DoseValueDisplay(value: string) {
            this._doseValueDisplay = value;
           //NotifyPropertyChanged("DoseValueDisplay");
        }
        public get DurationValueDisplay(): string {
            return this._durationValueDisplay;
        }
        public set DurationValueDisplay(value: string) {
            this._durationValueDisplay = value;
           //NotifyPropertyChanged("DurationValueDisplay");
        }
        public get LowerDose(): number {
            return this._lowerDose;
        }
        public set LowerDose(value: number) {
            if (!Helper.ReferenceEquals(this._lowerDose, value)) {
                this._lowerDose = value;
               //NotifyPropertyChanged("LowerDose");
                this.SetDoseValueDisplay();
            }
        }
        private SetDoseValueDisplay(): void {
            let strBuild: StringBuilder = new StringBuilder();
            if (this.LowerDose >= 0)
                strBuild.Append(this.LowerDose);
            if (this.UpperDose > 0) {
                if (this.LowerDose >= 0) {
                    strBuild.Append(Convert.ToChar(160));
                    strBuild.Append("-");
                }
                strBuild.Append(Convert.ToChar(160));
                strBuild.Append(this.UpperDose);
            }
            if (this.DoseUOM != null && !String.IsNullOrEmpty(this.DoseUOM.DisplayText)) {
                strBuild.Append(Convert.ToChar(160));
                strBuild.Append(this.DoseUOM.DisplayText);
            }
            this.DoseValueDisplay = strBuild.ToString();
        }
        public get UpperDose(): number {
            return this._upperDose;
        }
        public set UpperDose(value: number) {
            if (!Helper.ReferenceEquals(this._upperDose, value)) {
                this._upperDose = value;
               //NotifyPropertyChanged("UpperDose");
                this.SetDoseValueDisplay();
            }
        }
        public get DoseUOM(): CListItem {
            return this._doseUOM;
        }
        public set DoseUOM(value: CListItem) {
            if (Helper.ReferenceEquals(this._doseUOM, value) != true) {
                this._doseUOM = value;
               //super.NotifyPropertyChanged("DoseUOM");
                this.SetDoseValueDisplay();
            }
        }
        public get Duration(): number {
            return this._durationValue;
        }
        public set Duration(value: number) {
            if (!Helper.ReferenceEquals(this._durationValue, value)) {
                this._durationValue = value;
               //NotifyPropertyChanged("Duration");
                this.SetDurationValueDisplay();
            }
        }
        private SetDurationValueDisplay(): void {
            let strBuild: StringBuilder = new StringBuilder();
            if (this.Duration > 0) {
                strBuild.Append(this.Duration);
            }
            if (this.DurationUOM != null && !String.IsNullOrEmpty(this.DurationUOM.DisplayText)) {
                strBuild.Append(Convert.ToChar(160));
                strBuild.Append(this.DurationUOM.DisplayText);
            }
            this.DurationValueDisplay = strBuild.ToString();
        }
        public get DurationUOM(): CListItem {
            return this._durationUOM;
        }
        public set DurationUOM(value: CListItem) {
            if (value != this._durationUOM) {
                this._durationUOM = value;
               //super.NotifyPropertyChanged("DurationUOM");
                this.SetDurationValueDisplay();
            }
        }
        public get Frequency(): CListItem {
            return this._frequency;
        }
        public set Frequency(value: CListItem) {
            this._frequency = value;
           //NotifyPropertyChanged("Frequency");
        }
        private direction: string;
        public get Direction(): string {
            return this.direction;
        }
        public set Direction(value: string) {
            if (this.direction != value) {
                this.direction = value;
               //NotifyPropertyChanged("Direction");
            }
        }
        public get IsPRN(): boolean {
            return this._isPRN;
        }
        public set IsPRN(value: boolean) {
            this._isPRN = value;
            if (this._isPRN) {
                this.Direction = "As needed";
            }
            else {
                this.Direction = String.Empty;
            }
           //NotifyPropertyChanged("IsPRN");
        }
        public get StartDTTM(): DateTime{
            return this._startDTTM;
        }
        public set StartDTTM(value: DateTime) {
            if (!Helper.ReferenceEquals(this._startDTTM, value)) {
                this._startDTTM = value;
               //NotifyPropertyChanged("StartDTTM");
            }
        }
        public _ReorderStartDTTM: DateTime= DateTime.MinValue;
        public get ReorderStartDTTM(): DateTime{
            return this._ReorderStartDTTM;
        }
        public set ReorderStartDTTM(value: DateTime) {
            if (!Helper.ReferenceEquals(this._ReorderStartDTTM, value)) {
                this._ReorderStartDTTM = value;
            }
        }
        public get EndDTTM(): DateTime{
            return this._endDTTM;
        }
        public set EndDTTM(value: DateTime) {
            if (!Helper.ReferenceEquals(this._endDTTM, value)) {
                this._endDTTM = value;
               //NotifyPropertyChanged("EndDTTM");
            }
        }
        public get DoseInstructions(): string {
            return this._doseInstructions;
        }
        public set DoseInstructions(value: string) {
            if (!Helper.ReferenceEquals(this._doseInstructions, value)) {
                this._doseInstructions = value;
               //NotifyPropertyChanged("DoseInstructions");
            }
        }
        public get AdministrationTimes(): string {
            return this._adminTimes;
        }
        public set AdministrationTimes(value: string) {
            if (!Helper.ReferenceEquals(this._adminTimes, value)) {
                this._adminTimes = value;
               //NotifyPropertyChanged("AdministrationTimes");
            }
        }
        public get AdminTimesData(): ObservableCollection<GrdAdminstrativeTimesCols> {
            return this._adminTimesData;
        }
        public set AdminTimesData(value: ObservableCollection<GrdAdminstrativeTimesCols>) {
            this._adminTimesData = value;
           //NotifyPropertyChanged("AdminTimesData");
        }
        public get ScheduleDetailsData(): ObservableCollection<ScheduleDetailsCols> {
            return this._scheduleDetailsData;
        }
        public set ScheduleDetailsData(value: ObservableCollection<ScheduleDetailsCols>) {
            if (!Helper.ReferenceEquals(this._scheduleDetailsData, value)) {
                this._scheduleDetailsData = value;
               //NotifyPropertyChanged("ScheduleDetailsData");
            }
        }
        public get DaysOfWeek(): string[] {
            return this._daysofweek;
        }
        public set DaysOfWeek(value: string[]) {
            if (!Helper.ReferenceEquals(this._adminTimes, value)) {
                this._daysofweek = value;
               //NotifyPropertyChanged("DaysOfWeek");
            }
        }
        public get SlotTimeMode(): string {
            return this._slotTimeMode;
        }
        public set SlotTimeMode(value: string) {
            if (!Helper.ReferenceEquals(this._slotTimeMode, value)) {
                this._slotTimeMode = value;
               //NotifyPropertyChanged("SlotTimeMode");
            }
        }
        public get HyperlinkText(): string {
            return this._hyperlinkText;
        }
        public set HyperlinkText(value: string) {
            if (!Helper.ReferenceEquals(this._hyperlinkText, value)) {
                this._hyperlinkText = value;
               //NotifyPropertyChanged("HyperlinkText");
            }
        }
        public get IsHyperLink(): boolean {
            return this._isHyperLink;
        }
        public set IsHyperLink(value: boolean) {
            if (!Helper.ReferenceEquals(this._isHyperLink, value)) {
                this._isHyperLink = value;
               //NotifyPropertyChanged("IsHyperLink");
            }
        }
        public get TotalCols(): number {
            return this._totalCols;
        }
        public set TotalCols(value: number) {
            if (!Helper.ReferenceEquals(this._totalCols, value)) {
                this._totalCols = value;
               //NotifyPropertyChanged("TotalCols");
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
        public get InfusionRate(): string {
            return this._infusionrate;
        }
        public set InfusionRate(value: string) {
            if (!Helper.ReferenceEquals(this._infusionrate, value)) {
                this._infusionrate = value;
               //NotifyPropertyChanged("InfusionRate");
            }
        }
        public get InfusionUpperrate(): string {
            return this._infusionUpperrate;
        }
        public set InfusionUpperrate(value: string) {
            if (!Helper.ReferenceEquals(this._infusionUpperrate, value)) {
                this._infusionUpperrate = value;
               //NotifyPropertyChanged("InfusionUpperrate");
            }
        }
        public get InfrateDenominatoruom(): CListItem {
            return this._infrateDenominatoruom;
        }
        public set InfrateDenominatoruom(value: CListItem) {
            if (value != this._infrateDenominatoruom) {
                this._infrateDenominatoruom = value;
               //NotifyPropertyChanged("InfrateDenominatoruom");
                this.SetDoseValueDisplay();
            }
        }
        public get Infratenumeratoruom(): CListItem {
            return this._infratenumeratoruom;
        }
        public set Infratenumeratoruom(value: CListItem) {
            if (value != this._infratenumeratoruom) {
                this._infratenumeratoruom = value;
               //NotifyPropertyChanged("Infratenumeratoruom");
                this.SetDoseValueDisplay();
            }
        }
        private _IsInfusionData: boolean = false;
        public get IsInfusionData(): boolean {
            return this._IsInfusionData;
        }
        public set IsInfusionData(value: boolean) {
            if (value != this._IsInfusionData) {
                this._IsInfusionData = value;
               //NotifyPropertyChanged("IsInfusionData");
            }
        }
        public get FrequencyType(): string {
            return this._FrequencyType;
        }
        public set FrequencyType(value: string) {
            this._FrequencyType = value;
        }
        public PresType: string;
        public IsfixedTime: boolean = false;
        public oAdminTimesVM_FreqDetailsCompleted(): void {
            if (this.oAdminTimesVM != null && this.oAdminTimesVM.FreqDetails != null) {
                if (this.ActionCode != ActivityTypes.Prescribe && this.FreqDetails != null && this.FreqDetails.oFrequency != null && !String.IsNullOrEmpty(this.FreqDetails.oFrequency.UOM) && String.Equals(this.FreqDetails.oFrequency.UOM, "CC_MEDDRSN2")) {
                    this.oAdminTimesVM.FreqDetails.oFrequency.IsSunday = this.FreqDetails.oFrequency.IsSunday;
                    this.oAdminTimesVM.FreqDetails.oFrequency.IsMonday = this.FreqDetails.oFrequency.IsMonday;
                    this.oAdminTimesVM.FreqDetails.oFrequency.IsTuesday = this.FreqDetails.oFrequency.IsTuesday;
                    this.oAdminTimesVM.FreqDetails.oFrequency.IsWednesday = this.FreqDetails.oFrequency.IsWednesday;
                    this.oAdminTimesVM.FreqDetails.oFrequency.IsThursday = this.FreqDetails.oFrequency.IsThursday;
                    this.oAdminTimesVM.FreqDetails.oFrequency.IsFriday = this.FreqDetails.oFrequency.IsFriday;
                    this.oAdminTimesVM.FreqDetails.oFrequency.IsSaturday = this.FreqDetails.oFrequency.IsSaturday;
                }
                if (this.DaysOfWeek == null && this.ActionCode == ActivityTypes.Prescribe && this.oAdminTimesVM.FreqDetails != null && this.oAdminTimesVM.FreqDetails.oFrequency != null && this.CheckFrequencyHavingDaysOfWeeks(this.oAdminTimesVM.FreqDetails.oFrequency)) {
                    this.DaysOfWeek = new Array(7);
                    this.DaysOfWeek[0] = this.oAdminTimesVM.FreqDetails.oFrequency.IsSunday.ToString();
                    this.DaysOfWeek[1] = this.oAdminTimesVM.FreqDetails.oFrequency.IsMonday.ToString();
                    this.DaysOfWeek[2] = this.oAdminTimesVM.FreqDetails.oFrequency.IsTuesday.ToString();
                    this.DaysOfWeek[3] = this.oAdminTimesVM.FreqDetails.oFrequency.IsWednesday.ToString();
                    this.DaysOfWeek[4] = this.oAdminTimesVM.FreqDetails.oFrequency.IsThursday.ToString();
                    this.DaysOfWeek[5] = this.oAdminTimesVM.FreqDetails.oFrequency.IsFriday.ToString();
                    this.DaysOfWeek[6] = this.oAdminTimesVM.FreqDetails.oFrequency.IsSaturday.ToString();
                }
                this.FreqDetails = this.oAdminTimesVM.FreqDetails;
                if (this.oAdminTimesVM.FreqDetails.oFixedTimes != null || this.oAdminTimesVM.FreqDetails.oDrugRoundTimes != null || this.oAdminTimesVM.FreqDetails.oFrequency != null) {
                    this.oAdminTimesVM.FillAdministrationTimes(this.oAdminTimesVM.FreqDetails);
                    if (this.oAdminTimesVM.GrdData != null) {
                        this.AdminTimesData = this.oAdminTimesVM.GrdData;
                        if (this.IsReorderAndRetainSourceAdminTimes && this.oAdminTimesVM.fixedTimelst != null && this.oAdminTimesVM.fixedTimelst.Count > 0) {
                            this.ReplaceAdminTimesWithSourceTimes();
                            this.IsScheduleTimeLoaded = true;
                        }
                        if ((this.ActionCode == ActivityTypes.Amend || this.ActionCode == ActivityTypes.Reorder) && this.SlotTimeMode == 'F' && this.oAdminTimesVM.fixedTimelst != null && this.oAdminTimesVM.fixedTimelst.Count > 0) {
                            this.FillAdminTimeFromSourceToDest();
                            this.oAdminTimesVM.EnableDisableAdminTimes(this.SlotTimeMode);
                            this.UpdateAdministrationTimesText();
                        }
                        if (this.oAdminTimesVM.FreqDetails.oFrequency != null && this.oAdminTimesVM.FreqDetails.oFrequency.Type == "CC_INTERVAL") {
                            let nLen: number = this.AdminTimesData.Count;
                            let _PreviousSlotTime: DateTime= DateTime.MinValue;
                            for (let i: number = 0; i < nLen; i++) {
                                if (i == 0) {
                                    this.AdminTimesData[i].FixedTimes = this.StartDTTM.ToString("dd-MMM-yyyy");
                                    this.AdminTimesData[i].DruRoundTimes = this.StartDTTM.ToString("HH:mm");
                                    _PreviousSlotTime = this.StartDTTM;
                                }
                                else {
                                    _PreviousSlotTime = _PreviousSlotTime.AddMinutes(this.AdminTimesData[i - 1].LowPreiodInMinitus);
                                    this.AdminTimesData[i].FixedTimes = _PreviousSlotTime.ToString("dd-MMM-yyyy");
                                    this.AdminTimesData[i].DruRoundTimes = _PreviousSlotTime.ToString("HH:mm");
                                }
                            }
                        }
                        if (this.ActionCode != ActivityTypes.Amend && !this.IsReorderAndRetainSourceAdminTimes) {
                            this.EnablelDrugOrFixedTimes(this.oAdminTimesVM.GrdData);
                        }
                    }
                }
            }
            this.ReplaceFrequencyFixedTimes();
            if (this.EndDTTMCalcRequiredCompleted != null)
                this.EndDTTMCalcRequiredCompleted();
        }
        private CheckFrequencyHavingDaysOfWeeks(oFrequency: IPPMAManagePrescSer.IPPFrequency): boolean {
            if (oFrequency != null) {
                if (oFrequency.IsSunday) {
                    return true;
                }
                else if (oFrequency.IsMonday) {
                    return true;
                }
                else if (oFrequency.IsTuesday) {
                    return true;
                }
                else if (oFrequency.IsWednesday) {
                    return true;
                }
                else if (oFrequency.IsThursday) {
                    return true;
                }
                else if (oFrequency.IsFriday) {
                    return true;
                }
                else if (oFrequency.IsSaturday) {
                    return true;
                }
            }
            return false;
        }
        public AssignChangingDoseDetailFromSource(): void {
            if (this.HyperlinkText == "Changing dose" && this.oAdminTimesVM != null && this.oAdminTimesVM.GrdData != null) {
                let oScheduleDetVM: ScheduleDetailsSteppedVM = ObjectHelper.CreateObject(new ScheduleDetailsSteppedVM(), {
                    DoseValue: Convert.ToString(this.DueDose),
                    DoseUOM: this.DoseUOM != null ? this.DoseUOM.DisplayText : String.Empty,
                    StartDate: this.StartDTTM,
                    EndDate: this.EndDTTM,
                    DurationUOM: this.DurationUOM != null ? this.DurationUOM.Value : String.Empty,
                    DurationValue: this.Duration,
                    FreqDetails: this.oAdminTimesVM.FreqDetails,
                    IsFixedTime: this.IsfixedTime,
                    AdminTimeGrdData: this.oAdminTimesVM.GrdData,
                    IsDaywiseView: this.IsDaywiseView,
                    PresType: PatientContext.PrescriptionType,
                    ActionCode: this.ActionCode.ToString(),
                    StepSequenceNo: this.StepSequenceNo,
                    lstofNonDaywiseDoses: this.lstofNonDaywiseDoses
                });
                if (this.ChangingDoseDetailSource != null && this.ChangingDoseDetailSource.Count > 0) {
                    oScheduleDetVM.PresType = this.PresType;
                    oScheduleDetVM.ReassignDosesForDOSorReorderOrAmend(this.ChangingDoseDetailSource, this.LstOriginalDoseValues);
                    this.ScheduleDetailsData = new ObservableCollection<ScheduleDetailsCols>(oScheduleDetVM.GrdData);
                    this.LstElaspedDoses = new List<string>((oScheduleDetVM.LstElaspedDoses != null) ? oScheduleDetVM.LstElaspedDoses : new List<string>());
                }
                oScheduleDetVM = null;
            }
        }
        private ReplaceFrequencyFixedTimes(): void {
            if ((this.ActionCode == ActivityTypes.Amend || this.ActionCode == ActivityTypes.Reorder) && this.oAdminTimesVM != null && this.oAdminTimesVM.FreqDetails != null && this.oAdminTimesVM.FreqDetails.oFrequency != null && String.Equals(this.oAdminTimesVM.FreqDetails.oFrequency.Type, CConstants.PeriodFrequency)) {
                let oFixedTimes: List<TimeSpan> = null;
                if (this.ChangingDoseDetailSource != null && this.ChangingDoseDetailSource.Count > 0 && this.IsfixedTime && this.oAdminTimesVM.GrdData != null && this.oAdminTimesVM.GrdData.Count > 0) {
                    oFixedTimes = this.ChangingDoseDetailSource.Select(i => i.ScheduleDate.TimeOfDay).Distinct().OrderBy(s => s).ToList<TimeSpan>();
                }
                if (oFixedTimes != null && oFixedTimes.Count > 0 && this.sceduledTimelst != null && this.sceduledTimelst.Count > 0 && oFixedTimes.Count != this.sceduledTimelst.Count) {
                    oFixedTimes = new List<TimeSpan>();
                    this.sceduledTimelst.forEach( (sTime)=> {
                        let _ts: TimeSpan;
                        if (TimeSpan.TryParse(sTime, (o) => { _ts = o})) {
                            oFixedTimes.Add(_ts);
                        }
                    });
                }
                if (oFixedTimes != null && oFixedTimes.Count > 0) {
                    let nIndex: number = 0;
                    oFixedTimes.forEach( (oTS)=> {
                        if (nIndex < this.oAdminTimesVM.GrdData.Count) {
                            this.oAdminTimesVM.GrdData[nIndex].FixedTimes = oTS.ToString("HH:mm");
                    if (!String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration)) {
                        this.oAdminTimesVM.GrdData[nIndex].DruRoundTimes = String.Empty;
                    }
                    nIndex++;
                }
            });
        }
this.UpdateAdministrationTimesText();
}
}
public EnablelDrugOrFixedTimes(GrdData:ObservableCollection<GrdAdminstrativeTimesCols> ): void
    {
        let bDrugRound:boolean = false;
        let IsPeriodFreq:boolean = false;
        if(GrdData != null && GrdData.Count > 0) {
            if (GrdData.Count > 0 && GrdData[0].FrequencyType == "CC_PERIOD") {
                IsPeriodFreq = true;
            }
            if (!String.IsNullOrEmpty(GrdData[0].DruRoundTimes)) {
                bDrugRound = true;
            }
            if (this.IsDefaultFixedTime) {
                if (bDrugRound) {
                    this.SlotTimeMode = 'F';
                    this.IsfixedTime = true;
                }
                else {
                    this.SlotTimeMode = 'F';
                    this.IsfixedTime = true;
                }
            }
            else {
                if (bDrugRound) {
                    this.SlotTimeMode = 'D';
                    this.IsfixedTime = false;
                }
                else {
                    this.SlotTimeMode = 'F';
                    this.IsfixedTime = true;
                }
            }
        }
if(String.IsNullOrEmpty(this.AdministrationTimes)) {
            if (this.SlotTimeMode != String.MinValue)
                this.AdministrationTimes = this.IsfixedTime ? "Fixed - " : "Drug round - ";
            for (let nCnt: number = 0; nCnt < GrdData.Count; nCnt++) {
                if (IsPeriodFreq) {
                    if (this.SlotTimeMode == 'F') {
                        if (!String.IsNullOrEmpty(GrdData[nCnt].FixedTimes)) {
                            if (nCnt == GrdData.Count - 1)
                                this.AdministrationTimes += GrdData[nCnt].FixedTimes;
                            else this.AdministrationTimes += GrdData[nCnt].FixedTimes + "/";
                        }
                    }
                    else {
                        if (!String.IsNullOrEmpty(GrdData[nCnt].DruRoundTimes)) {
                            if (nCnt == GrdData.Count - 1)
                                this.AdministrationTimes += GrdData[nCnt].DruRoundTimes;
                            else this.AdministrationTimes += GrdData[nCnt].DruRoundTimes + "/";
                        }
                    }
                }
                else {
                    this.AdministrationTimes = GrdData[0].FixedTimes + " " + GrdData[0].DruRoundTimes + " repeats ";
                    if (!String.IsNullOrEmpty(this.oAdminTimesVM.FreqDetails.oFrequency.FrequencyName)) {
                        this.AdministrationTimes += this.oAdminTimesVM.FreqDetails.oFrequency.FrequencyName;
                    }
                    else if (this.Frequency != null) {
                        this.AdministrationTimes += this.Frequency.DisplayText;
                    }
                }
            }
        }
    }
public ChangeDoseLogic (oScheduleDetVM:ScheduleDetailsSteppedVM): void
    {
        let IsDayCrossed:boolean = true;
        let IsPartiallyCrossed:boolean = false;
        let count:number = oScheduleDetVM.GrdData.Count;
        let dtEndTemp:DateTime = oScheduleDetVM.EndDate.ToUserDateTime();
        let bIsDurationDose:boolean = false;
        let _AllTimesAreZero:boolean = true;
        for(let nCnt:number = 0;nCnt<count;nCnt++)
{
    if (oScheduleDetVM.GrdData != null && oScheduleDetVM.GrdData[nCnt].ScheduleTime != null) {
        if (!oScheduleDetVM.GrdData[nCnt].ScheduleTime.Equals("00:00"))
            _AllTimesAreZero = false;
        let dtTempCrossedDate: DateTime= oScheduleDetVM.StartDate.ToUserDateTime().DateTime.AddHours(Convert.ToDouble(oScheduleDetVM.GrdData[nCnt].ScheduleTime.Split(':')[0])).AddMinutes(Convert.ToDouble(oScheduleDetVM.GrdData[nCnt].ScheduleTime.Split(':')[1]));
        if (DateTime.LessThan(oScheduleDetVM.StartDate.ToUserDateTime(), dtTempCrossedDate)) {
            IsDayCrossed = false;
        }
        else {
            IsPartiallyCrossed = true;
        }
    }
}
if (_AllTimesAreZero) {
    IsDayCrossed = false;
    IsPartiallyCrossed = false;
}
if (IsDayCrossed) {
    oScheduleDetVM.StartDate = oScheduleDetVM.StartDate.AddDays(1);
}
else {
    if (this.DurationUOM != null && !String.IsNullOrEmpty(this.DurationUOM.Value) && String.Equals(this.DurationUOM.Value, "CC_DOSES"))
        bIsDurationDose = true;
    if (PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration && !IsPartiallyCrossed && !bIsDurationDose) {
        dtEndTemp = oScheduleDetVM.EndDate.ToUserDateTime().DateTime.AddDays(-1).AddHours(23).AddMinutes(59);
        oScheduleDetVM.EndDate = oScheduleDetVM.EndDate.DateTime.AddDays(-1).AddHours(23).AddMinutes(59);
    }
}
for (let iCntr: number = 0; iCntr < count; iCntr++) {
    if (oScheduleDetVM.GrdData != null && oScheduleDetVM.GrdData[iCntr].ScheduleTime != null) {
        let dtTemp: DateTime= oScheduleDetVM.StartDate.ToUserDateTime().DateTime.AddHours(Convert.ToDouble(oScheduleDetVM.GrdData[iCntr].ScheduleTime.Split(':')[0])).AddMinutes(Convert.ToDouble(oScheduleDetVM.GrdData[iCntr].ScheduleTime.Split(':')[1]));
        let sSceduleValue: string = oScheduleDetVM.GrdData[iCntr].ScheduleDoseValue.First();
        let iTot: number = oScheduleDetVM.GrdData[iCntr].ScheduleDoseValue.Length;
        let IsNormalChangeDose: boolean = false;
        if (PatientContext.PrescriptionType != PrescriptionTypes.ForAdministration && !oScheduleDetVM.IsDaywiseView) {
            IsNormalChangeDose = true;
        }
        for (let iCnt: number = 0; iCnt < iTot; iCnt++) {
            if (iCnt == 0 && this.FreqDetails != null && this.FreqDetails.oFrequency != null && String.Equals(this.FreqDetails.oFrequency.UOM, "CC_MEDDRSN2")) {
                dtTemp = oScheduleDetVM.GrdData[iCntr].ScheduleDate[iCnt].DateTime.AddHours(Convert.ToDouble(oScheduleDetVM.GrdData[iCntr].ScheduleTime.Split(':')[0])).AddMinutes(Convert.ToDouble(oScheduleDetVM.GrdData[iCntr].ScheduleTime.Split(':')[1]));
            }
            if (((DateTime.GreaterThanOrEqualTo(dtTemp, oScheduleDetVM.StartDate.ToUserDateTime()) || IsNormalChangeDose) && DateTime.LessThan(dtTemp, dtEndTemp)) || _AllTimesAreZero) {
                if (String.IsNullOrEmpty(oScheduleDetVM.GrdData[iCntr].ScheduleDoseValue[iCnt])) {
                    oScheduleDetVM.GrdData[iCntr].ScheduleDoseValue[iCnt] = sSceduleValue;
                }
                else {
                    oScheduleDetVM.GrdData[iCntr].ScheduleDoseValue[iCnt] = oScheduleDetVM.GrdData[iCntr].ScheduleDoseValue[iCnt];
                }
            }
            else {
                oScheduleDetVM.GrdData[iCntr].ScheduleDoseValue[iCnt] = String.Empty;
            }
            if (this.FreqDetails != null && this.FreqDetails.oFrequency != null && String.Compare(this.FreqDetails.oFrequency.UOM, "CC_MEDDRSN2", StringComparison.InvariantCultureIgnoreCase) != 0) {
                oScheduleDetVM.GrdData[iCntr].ScheduleDate[iCnt] = dtTemp.ToLocalDateTime();
            }
            if (this.FreqDetails != null && this.FreqDetails.oFrequency != null && String.Equals(this.FreqDetails.oFrequency.UOM, "CC_MEDDRSN2") && iCnt < iTot - 1) {
                dtTemp = oScheduleDetVM.GrdData[iCntr].ScheduleDate[iCnt + 1].DateTime.AddTime(dtTemp.ToLocalTime());
            }
            else dtTemp = dtTemp.AddDays(1);
        }
    }
}
}
private ReplaceAdminTimesWithSourceTimes(): void
    {
        if(this.oAdminTimesVM != null && this.oAdminTimesVM.GrdData != null && this.oAdminTimesVM.GrdData.Count > 0 && this.oAdminTimesVM.fixedTimelst != null && this.oAdminTimesVM.fixedTimelst.Count > 0)
 {
    let GrdDataCount: number = this.oAdminTimesVM.GrdData.Count;
    let SourceDataCount: number = this.oAdminTimesVM.fixedTimelst.Count;
    let DrugRoundTimelst: List<string> = new List<string>();
    if (GrdDataCount == SourceDataCount) {
        this.FillAdminTimeFromSourceToDest();
        this.oAdminTimesVM.EnableDisableAdminTimes(this.SlotTimeMode);
        this.UpdateAdministrationTimesText();
    }
}
}
private UpdateAdministrationTimesText(): void
    {
        if(this.oAdminTimesVM.GrdData != null)
 {
    let GrdDataCount: number = this.oAdminTimesVM.GrdData.Count;
    let _IsDrugroundTime: boolean = (this.SlotTimeMode == 'D');
    let _AdminTimesText: StringBuilder = new StringBuilder();
    if (_IsDrugroundTime) {
        _AdminTimesText.Append("Druground - ");
    }
    else {
        _AdminTimesText.Append("Fixed - ");
    }
    for (let i: number = 0; i < GrdDataCount; i++) {
        if (i != 0) {
            _AdminTimesText.Append("/");
        }
        if (_IsDrugroundTime) {
            _AdminTimesText.Append(this.oAdminTimesVM.GrdData[i].DruRoundTimes);
        }
        else {
            _AdminTimesText.Append(this.oAdminTimesVM.GrdData[i].FixedTimes);
        }
    }
    this.AdministrationTimes = _AdminTimesText.ToString();
}
}
private FillAdminTimeFromSourceToDest(): void
    {
        if(this.oAdminTimesVM != null && this.oAdminTimesVM.GrdData != null && this.oAdminTimesVM.fixedTimelst != null && this.oAdminTimesVM.GrdData.Count == this.oAdminTimesVM.fixedTimelst.Count)
 {
    let GrdDataCount: number = this.oAdminTimesVM.GrdData.Count;
    for (let i: number = 0; i < GrdDataCount; i++) {
        this.oAdminTimesVM.GrdData[i].FixedTimes = this.oAdminTimesVM.fixedTimelst[i];
    }
    this.SlotTimeMode = 'F';
    this.IsfixedTime = true;
}
} 
                }