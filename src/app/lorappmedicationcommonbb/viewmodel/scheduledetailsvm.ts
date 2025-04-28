import { Convert, DayOfWeek } from 'epma-platform/services';
import {
  StringComparison,
  ObservableCollection,
  Visibility,
  List,
  TimeZoneInfo,
} from 'epma-platform/models';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { ObjectHelper } from 'epma-platform/helper';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { Dictionary } from 'epma-platform/dictionary';
import {
  GrdAdminstrativeTimesCols,
  MultipleDoseDetail,
  ScheduleDetailsCols,
} from './prescriptionitemdetailsvm';
import {
  CResMsgGetAdministrationTimes,
  IPPFrequency,
  IPPScheduledetails,
  Scheduledetails,
} from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import {
  CConstants,
  ConstDurationUOM,
  DaysOfWeek,
  PrescriptionTypes,
} from '../utilities/constants';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import {
  eActivityTypes,
  MCommonBB,
} from 'src/app/lorappmedicationcommonbb/utilities/common';
import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import 'epma-platform/booleanextension';
import 'epma-platform/numberextension';
import 'epma-platform/stringextension';
import { iMath } from 'epma-platform/mathextension';
import 'epma-platform/arrayextension';

export class ScheduleDetailsVM extends ViewModelBase {
  private startDate: DateTime = DateTime.MinValue;
  private durationValue: number = 0;
  private durationUOM: string;
  private _grdData: ObservableCollection<ScheduleDetailsCols>;
  public get GrdData(): ObservableCollection<ScheduleDetailsCols> {
    return this._grdData;
  }
  public set GrdData(value: ObservableCollection<ScheduleDetailsCols>) {
    this._grdData = value;
    //NotifyPropertyChanged("GrdData");
  }
  public CheckDuration(): number {
    let nDurationInDays: number = 1;
    if (!String.IsNullOrEmpty(this.DurationUOM) && this.DurationValue > 0) {
      let nDuration: number = 0;
      nDuration = <number>this.DurationValue;
      switch (this.DurationUOM) {
        case 'CC_MEDDRSN1':
          nDurationInDays = nDuration;
          break;
        case 'CC_MEDDRSN2':
          nDurationInDays = 7 * nDuration;
          break;
        case 'CC_MEDRSN3':
          nDurationInDays = 28 * nDuration;
          break;
        case 'CC_MEDRSN4':
          nDurationInDays = 365 * nDuration;
          break;
        case 'CC_MINUTES':
          nDurationInDays = nDuration / 1440;
          if (nDuration % 1440 != 0) {
            nDurationInDays += 1;
          }
          break;
        case 'CC_HOURS':
          nDurationInDays = nDuration / 24;
          if (nDuration % 24 != 0) {
            nDurationInDays += 1;
          }
          break;
        case 'CC_DOSES':
          if (
            DateTime.NotEquals(this.StartDate, DateTime.MinValue) &&
            DateTime.NotEquals(this.EndDate, DateTime.MinValue)
          )
            nDurationInDays = Convert.ToInt32(
              iMath.Ceiling(this.EndDate.Subtract(this.StartDate).TotalDays)
            );
          else {
            let nDays: number = 0;
            if (
              this.GrdData != null &&
              this.GrdData.Count > 0 &&
              this.DurationValue > 0
            ) {
              nDays = this.DurationValue / this.GrdData.Count;
              nDurationInDays = Convert.ToInt32(iMath.Ceiling(nDays));
            }
          }
          break;
        default:
          nDurationInDays = 1;
          break;
      }
    }
    return nDurationInDays;
  }
  public DoseValue: string;
  public DoseUOM: string;
  public get StartDate(): DateTime {
    return this.startDate;
  }
  public set StartDate(value: DateTime) {
    this.startDate = value;
  }
  public EndDate: DateTime = DateTime.MinValue;
  public AdminTimeGrdData: ObservableCollection<GrdAdminstrativeTimesCols>;
  public IsFixedTime: boolean = false;
  public get DurationValue(): number {
    return this.durationValue;
  }
  public set DurationValue(value: number) {
    this.durationValue = value;
  }
  public get DurationUOM(): string {
    return this.durationUOM;
  }
  public set DurationUOM(value: string) {
    this.durationUOM = value;
  }
  public IsDaywiseView: boolean = false;
  public IsSysDoseDetail: boolean = false;
  constructor() {
    super();
  }
  public IsReadOnly: boolean = false;
  private daywiseVisibility: Visibility = Visibility.Collapsed;
  public get DaywiseVisibility(): Visibility {
    return this.daywiseVisibility;
  }
  public set DaywiseVisibility(value: Visibility) {
    this.daywiseVisibility = value;
    //NotifyPropertyChanged("DaywiseVisibility");
  }
}
export enum MezzanineSize {
  Normal = "Normal",

  Expanded = "Expanded",
}
export enum eDoseValuesKind {
  AllValuesEmpty = "AllValuesEmpty",

  AllValuesSame = "AllValuesSame",

  DifferentValues = "DifferentValues",
}
export class ScheduleDetailsSteppedVM extends ViewModelBase {
  private _EndDate: DateTime = DateTime.MinValue;
  private startDate: DateTime = DateTime.MinValue;
  private durationValue: number = 0;
  private durationUOM: string;
  public IsScheduleTimesLoadedFromFreqDetail: boolean = false;
  public IsModifiedChangeDoseDetail: boolean = true;
  private _grdData: ObservableCollection<ScheduleDetailsCols> = new ObservableCollection<ScheduleDetailsCols>();
  public get GrdData(): ObservableCollection<ScheduleDetailsCols> {
    return this._grdData;
  }
  public set GrdData(value: ObservableCollection<ScheduleDetailsCols>) {
    //this._grdData = value;
    if (value != null) {
      this._grdData.CopyFrom(value);
    }
    //NotifyPropertyChanged("GrdData");
  }
  public _IsDataModified: boolean = false;
  public get IsDataModified(): boolean {
    return this._IsDataModified;
  }
  public set IsDataModified(value: boolean) {
    this._IsDataModified = value;
  }
  private _isGridLinkClicked: boolean = false;
  public get IsGridLinkClicked(): boolean {
    return this._isGridLinkClicked;
  }
  public set IsGridLinkClicked(value: boolean) {
    this._isGridLinkClicked = value;
  }
  private _PresType: string;
  public get PresType(): string {
    return this._PresType;
  }
  public set PresType(value: string) {
    this._PresType = value;
  }
  private _lstofNonDaywiseDoses: List<string>;
  public get lstofNonDaywiseDoses(): List<string> {
    return this._lstofNonDaywiseDoses;
  }
  public set lstofNonDaywiseDoses(value: List<string>) {
    this._lstofNonDaywiseDoses = value;
    //NotifyPropertyChanged("lstofNonDaywiseDoses");
  }
  public DoseValue: string;
  public DoseUOM: string;
  public DoseUOMValue: string;
  public get StartDate(): DateTime {
    return this.startDate;
  }
  public set StartDate(value: DateTime) {
    this.startDate = value;
  }
  public get EndDate(): DateTime {
    return this._EndDate;
  }
  public set EndDate(value: DateTime) {
    this._EndDate = value;
  }
  public AdminTimeGrdData: ObservableCollection<GrdAdminstrativeTimesCols>;
  public IsFixedTime: boolean = false;
  public get DurationValue(): number {
    return this.durationValue;
  }
  public set DurationValue(value: number) {
    this.durationValue = value;
  }
  public get DurationUOM(): string {
    return this.durationUOM;
  }
  public set DurationUOM(value: string) {
    this.durationUOM = value;
  }
  public IsDaywiseView: boolean = false;
  public MessDuplicate: boolean = false;
  private _freqDetails: CResMsgGetAdministrationTimes;
  public get FreqDetails(): CResMsgGetAdministrationTimes {
    return this._freqDetails;
  }
  public set FreqDetails(value: CResMsgGetAdministrationTimes) {
    if (this._freqDetails != value) {
      this._freqDetails = value;
    }
  }
  public IsReadOnly: boolean = false;
  private _IsDayWiseEnabled: boolean = false;
  public get IsDayWiseEnabled(): boolean {
    return this._IsDayWiseEnabled;
  }
  public set IsDayWiseEnabled(value: boolean) {
    this._IsDayWiseEnabled = value;
    //NotifyPropertyChanged("IsDayWiseEnabled");
  }
  private _IsChangingDoseEnabled: boolean = false;
  public get IsChangingDoseEnabled(): boolean {
    return this._IsChangingDoseEnabled;
  }
  public set IsChangingDoseEnabled(value: boolean) {
    this._IsChangingDoseEnabled = value;
    //NotifyPropertyChanged("IsChangingDoseEnabled");
  }
  private _IsClearEnabled: boolean = false;
  public get IsClearEnabled(): boolean {
    return this._IsClearEnabled;
  }
  public set IsClearEnabled(value: boolean) {
    this._IsClearEnabled = value;
    //NotifyPropertyChanged("IsClearEnabled");
  }
  private _IsDaywiseViewClicked: boolean = false;
  public get IsDaywiseViewClicked(): boolean {
    return this._IsDaywiseViewClicked;
  }
  public set IsDaywiseViewClicked(value: boolean) {
    this._IsDaywiseViewClicked = value;
    //NotifyPropertyChanged("IsDaywiseViewClicked");
  }
  private _IsChangingDoseVisible: Visibility = Visibility.Visible;
  public get IsChangingDoseVisible(): Visibility {
    return this._IsChangingDoseVisible;
  }
  public set IsChangingDoseVisible(value: Visibility) {
    this._IsChangingDoseVisible = value;
    //NotifyPropertyChanged("IsChangingDoseVisible");
  }
  private _IsClearVisible: Visibility = Visibility.Visible;
  public get IsClearVisible(): Visibility {
    return this._IsClearVisible;
  }
  public set IsClearVisible(value: Visibility) {
    this._IsClearVisible = value;
    //NotifyPropertyChanged("IsClearVisible");
  }
  public DoseValuesKind: eDoseValuesKind;
  public ActionCode: string;
  public GridStartDTTM: DateTime = DateTime.MinValue;
  public GridEndDTTM: DateTime = DateTime.MinValue;
  public LstGridColumnsDates: List<DateTime>;
  private _IsStartDateGiven: boolean = false;
  public get IsStartDateGiven(): boolean {
    return this._IsStartDateGiven;
  }
  public set IsStartDateGiven(value: boolean) {
    this._IsStartDateGiven = value;
  }
  public ChangingDoseMezzanineSize: MezzanineSize;
  public LstElaspedDoses: List<string>;
  public StepSequenceNo: number = 0;
  public LstOriginalDoseValues: List<string>;
  constructor() {
    super();
  }
  public LoadData(): void {
    this.CalculateStartAndEndDTTM();
    this.FillGridData();
  }
  public duplicatecheck(dupliflag: boolean): string {
    let dictionary: Dictionary<string, string> = null;
    let dictionary1: Dictionary<string, string> = null;
    let sDuplicateTime: string = String.Empty;
    let nCount: number = 0;
    if (this.GrdData != null && this.GrdData.Count > 0)
      nCount = this.GrdData.Count;
    for (let i: number = 0; i < nCount; i++) {
      if (dictionary == null) dictionary = new Dictionary<string, string>();
      let s: string =
        this.GrdData[i].ScheduleDTTM.ToUserDateTimeString('HH:mm');
      if (
        !String.IsNullOrEmpty(s) &&
        String.Compare(s, '00:00', StringComparison.CurrentCultureIgnoreCase) !=
        0 &&
        dupliflag == false
      ) {
        if (!dictionary.ContainsKey(s)) {
          dictionary.Add(s, s);
        } else {
          if (dictionary1 == null)
            dictionary1 = new Dictionary<string, string>();
          if (!dictionary1.ContainsKey(s)) {
            dictionary1.Add(s, s);
            sDuplicateTime +=
              (String.IsNullOrEmpty(sDuplicateTime) ? '' : ',') +
              dictionary1[s];
          }
        }
      } else if (!String.IsNullOrEmpty(s) && dupliflag == true) {
        if (!dictionary.ContainsKey(s)) {
          dictionary.Add(s, s);
        } else {
          if (dictionary1 == null)
            dictionary1 = new Dictionary<string, string>();
          if (!dictionary1.ContainsKey(s)) {
            dictionary1.Add(s, s);
            sDuplicateTime +=
              (String.IsNullOrEmpty(sDuplicateTime) ? '' : ',') +
              dictionary1[s];
          }
        }
      }
    }
    return sDuplicateTime;
  }
  public static EndDTTMforDurationDose(
    objgrddata: MultipleDoseDetail,
    oScheduleDetailsVM: ScheduleDetailsSteppedVM
  ): DateTime {
    let oEndDTTM: DateTime = new DateTime();
    let lstScheduleDates: List<DateTime> =
      ScheduleDetailsSteppedVM.GetScheduleDatesForDoseDuration(
        objgrddata,
        oScheduleDetailsVM
      );
    if (lstScheduleDates != null && lstScheduleDates.Count > 0) {
      let tmpEndDateTime: DateTime = lstScheduleDates.Max((o) => o);
      oEndDTTM = tmpEndDateTime.AddMinutes(1);
    }
    return oEndDTTM;
  }
  public static GetTimeInMinutes(time: string): number {
    let nMins: number = 0;
    let nHrs: number = 0;
    if (!String.IsNullOrEmpty(time)) {
      let arrTime: string[] = time.Split(':');
      if (arrTime instanceof Array && arrTime.length > 0) {
        Number.TryParse(arrTime[0], (o) => {
          nHrs = o;
        });
      }
      if (arrTime.length > 1) {
        Number.TryParse(arrTime[1], (o) => {
          nMins = o;
        });
      }
    }
    nMins += nHrs * 60;
    return nMins;
  }
  public static GetScheduleDatesForDoseDuration(
    oMultipleDoseDetail: MultipleDoseDetail,
    oScheduleDetailsVM: ScheduleDetailsSteppedVM
  ): List<DateTime> {
    let lstScheduleDate: List<DateTime> = new List<DateTime>();
    let StartDTTM: DateTime = DateTime.MinValue;
    let EndDTTM: DateTime = DateTime.MinValue;
    let oIPPFrequency: IPPFrequency = new IPPFrequency();
    let NoOfSchedules: number = 0;
    let bIsFixed: boolean = false;
    if (oMultipleDoseDetail != null) {
      StartDTTM = oMultipleDoseDetail.StartDTTM;
      EndDTTM = oMultipleDoseDetail.EndDTTM;
      if (oMultipleDoseDetail.FreqDetails != null)
        oIPPFrequency = oMultipleDoseDetail.FreqDetails.oFrequency;
      else if (
        oMultipleDoseDetail.AdminTimesData != null &&
        oMultipleDoseDetail.AdminTimesData.Count > 0 &&
        oMultipleDoseDetail.AdminTimesData[0].oFrequency != null
      )
        oIPPFrequency = oMultipleDoseDetail.AdminTimesData[0].oFrequency;
      NoOfSchedules = oMultipleDoseDetail.Duration;
      if (String.Equals(oMultipleDoseDetail.SlotTimeMode, 'F')) bIsFixed = true;
      else if (String.Equals(oMultipleDoseDetail.SlotTimeMode, 'D'))
        bIsFixed = false;
    } else if (oScheduleDetailsVM != null) {
      StartDTTM = oScheduleDetailsVM.StartDate;
      EndDTTM = oScheduleDetailsVM.EndDate;
      if (oScheduleDetailsVM.FreqDetails != null)
        oIPPFrequency = oScheduleDetailsVM.FreqDetails.oFrequency;
      NoOfSchedules = oScheduleDetailsVM.DurationValue;
      bIsFixed = oScheduleDetailsVM.IsFixedTime;
    }
    let LowPeriod: number = oIPPFrequency.LowPeriod;
    let HighPeriod: number = oIPPFrequency.HighPeriod;
    let HighEvent: number = oIPPFrequency.HighEvent;
    let LowEvent: number = oIPPFrequency.LowEvent;
    let EventToConsider: number = HighEvent > 0 ? HighEvent : LowEvent;
    let PeriodToConsider: number = HighPeriod > 0 ? HighPeriod : LowPeriod;
    let MinTimeToPrescribe: number = 0;
    if (DateTime.NotEquals(StartDTTM, DateTime.MinValue)) {
      if (
        String.Compare(
          oIPPFrequency.Type,
          'CC_INTERVAL',
          StringComparison.CurrentCultureIgnoreCase
        ) == 0
      ) {
        switch (oIPPFrequency.UOM) {
          case 'CC_MINUTES':
            MinTimeToPrescribe = PeriodToConsider;
            break;
          case 'CC_HOURS':
            MinTimeToPrescribe = PeriodToConsider * 60;
            break;
          case 'CC_MEDDRSN1':
            MinTimeToPrescribe = (PeriodToConsider * 1440) / EventToConsider;
            break;
          case 'CC_MEDDRSN2':
            MinTimeToPrescribe =
              (PeriodToConsider * 1440 * 7) / EventToConsider;
            break;
          case 'CC_MEDRSN3':
            MinTimeToPrescribe =
              (PeriodToConsider * 1440 * 28) / EventToConsider;
            break;
          case 'CC_MEDRSN4':
            MinTimeToPrescribe =
              (PeriodToConsider * 1440 * 365) / EventToConsider;
            break;
          case 'CC_IPONCENLY':
            EndDTTM = StartDTTM;
            break;
        }
        if (DateTime.Equals(StartDTTM, EndDTTM)) {
          lstScheduleDate.Add(StartDTTM);
        } else {
          if (NoOfSchedules > 0) {
            let nCount: number = 0;
            while (nCount < NoOfSchedules) {
              lstScheduleDate.Add(StartDTTM);
              StartDTTM = StartDTTM.AddMinutes(MinTimeToPrescribe);
              nCount++;
            }
          }
        }
      } else {
        if (NoOfSchedules > 0) {
          let _TmpSceduleCount: number = 0;
          let oTempStartDttm: DateTime = StartDTTM;
          let oTempEndDttm: DateTime = EndDTTM;
          let sSlotTime: string = String.Empty;
          let oAdminTimesData: ObservableCollection<GrdAdminstrativeTimesCols> =
            null;
          let oScheduleDetailsData: ObservableCollection<ScheduleDetailsCols> =
            null;
          let oScheduleDetails: ObservableCollection<IPPScheduledetails> = null;
          if (
            oMultipleDoseDetail != null &&
            oMultipleDoseDetail.AdminTimesData != null &&
            oMultipleDoseDetail.AdminTimesData.Count > 0
          ) {
            if (bIsFixed) {
              oAdminTimesData =
                new ObservableCollection<GrdAdminstrativeTimesCols>(
                  oMultipleDoseDetail.AdminTimesData.OrderBy(
                    (x) => x.FixedTimes
                  )
                );
              if (
                oIPPFrequency != null &&
                NoOfSchedules < oIPPFrequency.LowEvent &&
                oMultipleDoseDetail.oAdminTimesVM != null &&
                oMultipleDoseDetail.oAdminTimesVM.GrdData != null &&
                oMultipleDoseDetail.oAdminTimesVM.GrdData.Count > 0
              ) {
                let _UniqueAdminTimes =
                  oMultipleDoseDetail.oAdminTimesVM.GrdData.Where(
                    (x) => x.FixedTimes != '00:00'
                  );
                if (_UniqueAdminTimes != null) {
                  let _UniqueTimesCount: number = _UniqueAdminTimes.Count();
                  if (_UniqueAdminTimes.Count() > 0) {
                    oAdminTimesData.Clear();
                    _UniqueAdminTimes.forEach((oTmp) => {
                      oAdminTimesData.Add(
                        ObjectHelper.CreateObject(
                          new GrdAdminstrativeTimesCols(),
                          { FixedTimes: oTmp.FixedTimes }
                        )
                      );
                    });
                    if (_UniqueTimesCount + 1 == NoOfSchedules) {
                      oAdminTimesData.Insert(
                        0,
                        ObjectHelper.CreateObject(
                          new GrdAdminstrativeTimesCols(),
                          { FixedTimes: '00:00' }
                        )
                      );
                    }
                  }
                }
              }
            } else {
              oAdminTimesData =
                new ObservableCollection<GrdAdminstrativeTimesCols>(
                  oMultipleDoseDetail.AdminTimesData.OrderBy(
                    (x) => x.DruRoundTimes
                  )
                );
            }
          } else if (
            oScheduleDetailsVM != null &&
            oScheduleDetailsVM.AdminTimeGrdData != null &&
            oScheduleDetailsVM.AdminTimeGrdData.Count > 0
          ) {
            if (bIsFixed)
              oAdminTimesData =
                new ObservableCollection<GrdAdminstrativeTimesCols>(
                  oScheduleDetailsVM.AdminTimeGrdData.OrderBy(
                    (x) => x.FixedTimes
                  )
                );
            else
              oAdminTimesData =
                new ObservableCollection<GrdAdminstrativeTimesCols>(
                  oScheduleDetailsVM.AdminTimeGrdData.OrderBy(
                    (x) => x.DruRoundTimes
                  )
                );
          } else if (
            oMultipleDoseDetail != null &&
            oMultipleDoseDetail.ScheduleDetailsData != null &&
            oMultipleDoseDetail.ScheduleDetailsData.Count > 0
          ) {
            oScheduleDetailsData =
              new ObservableCollection<ScheduleDetailsCols>(
                oMultipleDoseDetail.ScheduleDetailsData.OrderBy(
                  (x) => x.ScheduleTime
                )
              );
          } else if (
            oScheduleDetailsVM != null &&
            oScheduleDetailsVM.GrdData != null &&
            oScheduleDetailsVM.GrdData.Count > 0
          ) {
            oScheduleDetailsData =
              new ObservableCollection<ScheduleDetailsCols>(
                oScheduleDetailsVM.GrdData.OrderBy((x) => x.ScheduleTime)
              );
          } else if (
            oMultipleDoseDetail != null &&
            oMultipleDoseDetail.FreqDetails != null
          ) {
            if (bIsFixed && oMultipleDoseDetail.FreqDetails.oFixedTimes != null)
              oScheduleDetails = new ObservableCollection<IPPScheduledetails>(
                oMultipleDoseDetail.FreqDetails.oFixedTimes
              );
            else if (oMultipleDoseDetail.FreqDetails.oDrugRoundTimes != null)
              oScheduleDetails = new ObservableCollection<IPPScheduledetails>(
                oMultipleDoseDetail.FreqDetails.oDrugRoundTimes
              );
          } else if (
            oScheduleDetailsVM != null &&
            oScheduleDetailsVM.FreqDetails != null
          ) {
            if (bIsFixed && oScheduleDetailsVM.FreqDetails.oFixedTimes != null)
              oScheduleDetails = new ObservableCollection<IPPScheduledetails>(
                oScheduleDetailsVM.FreqDetails.oFixedTimes
              );
            else if (oScheduleDetailsVM.FreqDetails.oDrugRoundTimes != null)
              oScheduleDetails = new ObservableCollection<IPPScheduledetails>(
                oScheduleDetailsVM.FreqDetails.oDrugRoundTimes
              );
          }
          if (oAdminTimesData != null) {
            while (_TmpSceduleCount < NoOfSchedules) {
              if (oAdminTimesData != null && oAdminTimesData.Count > 0) {
                for (let i: number = 0; i < oAdminTimesData.Count; i++) {
                  if (bIsFixed) sSlotTime = oAdminTimesData[i].FixedTimes;
                  else sSlotTime = oAdminTimesData[i].DruRoundTimes;
                  if (!String.IsNullOrEmpty(sSlotTime)) {
                    if (
                      oIPPFrequency != null &&
                      String.Equals(oIPPFrequency.UOM, 'CC_MEDDRSN2')
                    ) {
                      if (
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Sunday &&
                          oIPPFrequency.IsSunday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Monday &&
                          oIPPFrequency.IsMonday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Tuesday &&
                          oIPPFrequency.IsTuesday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Wednesday &&
                          oIPPFrequency.IsWednesday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Thursday &&
                          oIPPFrequency.IsThursday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Friday &&
                          oIPPFrequency.IsFriday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Saturday &&
                          oIPPFrequency.IsSaturday)
                      ) {
                        let oSlotDTTM: DateTime =
                          oTempStartDttm.DateTime.AddMinutes(
                            ScheduleDetailsSteppedVM.GetTimeInMinutes(sSlotTime)
                          );
                        if (
                          DateTime.GreaterThanOrEqualTo(oSlotDTTM, StartDTTM) &&
                          _TmpSceduleCount < NoOfSchedules
                        ) {
                          lstScheduleDate.Add(oSlotDTTM);
                          _TmpSceduleCount++;
                        }
                      } else if (
                        !oIPPFrequency.IsSunday &&
                        !oIPPFrequency.IsMonday &&
                        !oIPPFrequency.IsTuesday &&
                        !oIPPFrequency.IsWednesday &&
                        !oIPPFrequency.IsThursday &&
                        !oIPPFrequency.IsFriday &&
                        !oIPPFrequency.IsSaturday
                      ) {
                        let oSlotDTTM: DateTime =
                          oTempStartDttm.DateTime.AddMinutes(
                            ScheduleDetailsSteppedVM.GetTimeInMinutes(sSlotTime)
                          );
                        if (
                          DateTime.GreaterThanOrEqualTo(oSlotDTTM, StartDTTM) &&
                          _TmpSceduleCount < NoOfSchedules
                        ) {
                          lstScheduleDate.Add(oSlotDTTM);
                          _TmpSceduleCount++;
                        }
                      } else if (
                        oIPPFrequency != null &&
                        oIPPFrequency.LowPeriod > oIPPFrequency.LowEvent
                      ) {
                        if (
                          lstScheduleDate != null &&
                          lstScheduleDate.Count == 0
                        ) {
                          let FirstDateOfweek: DateTime =
                            MCommonBB.GetFirstDateOfweek(
                              oTempStartDttm,
                              oTempEndDttm,
                              oIPPFrequency,
                              null
                            );
                          if (DateTime.Equals(FirstDateOfweek, DateTime.MinValue)) {
                            break;
                          }
                          oTempStartDttm = FirstDateOfweek;
                        }
                        let oSlotDTTM: DateTime =
                          oTempStartDttm.DateTime.AddMinutes(
                            ScheduleDetailsSteppedVM.GetTimeInMinutes(sSlotTime)
                          );
                        if (
                          DateTime.GreaterThanOrEqualTo(oSlotDTTM, StartDTTM) &&
                          _TmpSceduleCount < NoOfSchedules
                        ) {
                          lstScheduleDate.Add(oSlotDTTM);
                          _TmpSceduleCount++;
                        }
                      }
                    } else {
                      let oSlotDTTM: DateTime =
                        oTempStartDttm.DateTime.AddMinutes(
                          ScheduleDetailsSteppedVM.GetTimeInMinutes(sSlotTime)
                        );
                      if (
                        DateTime.GreaterThanOrEqualTo(oSlotDTTM, StartDTTM) &&
                        _TmpSceduleCount < NoOfSchedules
                      ) {
                        lstScheduleDate.Add(oSlotDTTM);
                        _TmpSceduleCount++;
                      }
                    }
                  }
                }
                if (
                  oIPPFrequency != null &&
                  oIPPFrequency.LowPeriod > oIPPFrequency.LowEvent
                ) {
                  switch (oIPPFrequency.UOM) {
                    case 'CC_MEDDRSN1':
                      oTempStartDttm = oTempStartDttm.AddDays(
                        oIPPFrequency.LowPeriod
                      );
                      break;
                    case 'CC_MEDDRSN2':
                      oTempStartDttm = oTempStartDttm.AddDays(
                        7 * oIPPFrequency.LowPeriod
                      );
                      break;
                    case 'CC_MEDRSN3':
                      oTempStartDttm = oTempStartDttm.AddDays(
                        28 * oIPPFrequency.LowPeriod
                      );
                      break;
                  }
                } else {
                  if (
                    oIPPFrequency != null &&
                    String.Equals(oIPPFrequency.UOM, 'CC_MEDRSN3')
                  ) {
                    oTempStartDttm = oTempStartDttm.AddDays(28);
                  } else {
                    oTempStartDttm = oTempStartDttm.AddDays(1);
                  }
                }
              }
            }
          } else if (oScheduleDetailsData != null) {
            while (_TmpSceduleCount < NoOfSchedules) {
              if (
                oScheduleDetailsData != null &&
                oScheduleDetailsData.Count > 0
              ) {
                for (let i: number = 0; i < oScheduleDetailsData.Count; i++) {
                  sSlotTime = oScheduleDetailsData[i].ScheduleTime;
                  if (!String.IsNullOrEmpty(sSlotTime)) {
                    if (
                      oIPPFrequency != null &&
                      String.Equals(oIPPFrequency.UOM, 'CC_MEDDRSN2')
                    ) {
                      if (
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Sunday &&
                          oIPPFrequency.IsSunday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Monday &&
                          oIPPFrequency.IsMonday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Tuesday &&
                          oIPPFrequency.IsTuesday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Wednesday &&
                          oIPPFrequency.IsWednesday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Thursday &&
                          oIPPFrequency.IsThursday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Friday &&
                          oIPPFrequency.IsFriday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Saturday &&
                          oIPPFrequency.IsSaturday)
                      ) {
                        let oSlotDTTM: DateTime =
                          oTempStartDttm.DateTime.AddMinutes(
                            ScheduleDetailsSteppedVM.GetTimeInMinutes(sSlotTime)
                          );
                        if (
                          DateTime.GreaterThanOrEqualTo(oSlotDTTM, StartDTTM) &&
                          _TmpSceduleCount < NoOfSchedules
                        ) {
                          lstScheduleDate.Add(oSlotDTTM);
                          _TmpSceduleCount++;
                        }
                      } else if (
                        !oIPPFrequency.IsSunday &&
                        !oIPPFrequency.IsMonday &&
                        !oIPPFrequency.IsTuesday &&
                        !oIPPFrequency.IsWednesday &&
                        !oIPPFrequency.IsThursday &&
                        !oIPPFrequency.IsFriday &&
                        !oIPPFrequency.IsSaturday
                      ) {
                        let oSlotDTTM: DateTime =
                          oTempStartDttm.DateTime.AddMinutes(
                            ScheduleDetailsSteppedVM.GetTimeInMinutes(sSlotTime)
                          );
                        if (
                          DateTime.GreaterThanOrEqualTo(oSlotDTTM, StartDTTM) &&
                          _TmpSceduleCount < NoOfSchedules
                        ) {
                          lstScheduleDate.Add(oSlotDTTM);
                          _TmpSceduleCount++;
                        }
                      } else if (
                        oIPPFrequency != null &&
                        oIPPFrequency.LowPeriod > oIPPFrequency.LowEvent
                      ) {
                        let oSlotDTTM: DateTime =
                          oTempStartDttm.DateTime.AddMinutes(
                            ScheduleDetailsSteppedVM.GetTimeInMinutes(sSlotTime)
                          );
                        if (
                          DateTime.GreaterThanOrEqualTo(oSlotDTTM, StartDTTM) &&
                          _TmpSceduleCount < NoOfSchedules
                        ) {
                          lstScheduleDate.Add(oSlotDTTM);
                          _TmpSceduleCount++;
                        }
                      }
                    } else {
                      let oSlotDTTM: DateTime =
                        oTempStartDttm.DateTime.AddMinutes(
                          ScheduleDetailsSteppedVM.GetTimeInMinutes(sSlotTime)
                        );
                      if (
                        DateTime.GreaterThanOrEqualTo(oSlotDTTM, StartDTTM) &&
                        _TmpSceduleCount < NoOfSchedules
                      ) {
                        lstScheduleDate.Add(oSlotDTTM);
                        _TmpSceduleCount++;
                      }
                    }
                  }
                }
                if (
                  oIPPFrequency != null &&
                  oIPPFrequency.LowPeriod > oIPPFrequency.LowEvent
                ) {
                  switch (oIPPFrequency.UOM) {
                    case 'CC_MEDDRSN1':
                      oTempStartDttm = oTempStartDttm.AddDays(
                        oIPPFrequency.LowPeriod
                      );
                      break;
                    case 'CC_MEDDRSN2':
                      oTempStartDttm = oTempStartDttm.AddDays(
                        7 * oIPPFrequency.LowPeriod
                      );
                      break;
                    case 'CC_MEDRSN3':
                      oTempStartDttm = oTempStartDttm.AddDays(
                        28 * oIPPFrequency.LowPeriod
                      );
                      break;
                  }
                } else {
                  if (
                    oIPPFrequency != null &&
                    String.Equals(oIPPFrequency.UOM, 'CC_MEDRSN3')
                  ) {
                    oTempStartDttm = oTempStartDttm.AddDays(28);
                  } else {
                    oTempStartDttm = oTempStartDttm.AddDays(1);
                  }
                }
              }
            }
          } else if (oScheduleDetails != null) {
            while (_TmpSceduleCount < NoOfSchedules) {
              if (oScheduleDetails != null && oScheduleDetails.Count > 0) {
                for (let i: number = 0; i < oScheduleDetails.Count; i++) {
                  if (bIsFixed) sSlotTime = oScheduleDetails[i].ScheduledTime;
                  else sSlotTime = oScheduleDetails[i].ScheduledTime;
                  if (!String.IsNullOrEmpty(sSlotTime)) {
                    if (
                      oIPPFrequency != null &&
                      String.Equals(oIPPFrequency.UOM, 'CC_MEDDRSN2')
                    ) {
                      if (
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Sunday &&
                          oIPPFrequency.IsSunday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Monday &&
                          oIPPFrequency.IsMonday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Tuesday &&
                          oIPPFrequency.IsTuesday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Wednesday &&
                          oIPPFrequency.IsWednesday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Thursday &&
                          oIPPFrequency.IsThursday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Friday &&
                          oIPPFrequency.IsFriday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Saturday &&
                          oIPPFrequency.IsSaturday)
                      ) {
                        let oSlotDTTM: DateTime =
                          oTempStartDttm.DateTime.AddMinutes(
                            Convert.ToInt32(sSlotTime)
                          );
                        if (
                          DateTime.GreaterThanOrEqualTo(oSlotDTTM, StartDTTM) &&
                          _TmpSceduleCount < NoOfSchedules
                        ) {
                          lstScheduleDate.Add(oSlotDTTM);
                          _TmpSceduleCount++;
                        }
                      } else if (
                        !oIPPFrequency.IsSunday &&
                        !oIPPFrequency.IsMonday &&
                        !oIPPFrequency.IsTuesday &&
                        !oIPPFrequency.IsWednesday &&
                        !oIPPFrequency.IsThursday &&
                        !oIPPFrequency.IsFriday &&
                        !oIPPFrequency.IsSaturday
                      ) {
                        let oSlotDTTM: DateTime =
                          oTempStartDttm.DateTime.AddMinutes(
                            Convert.ToInt32(sSlotTime)
                          );
                        if (
                          DateTime.GreaterThanOrEqualTo(oSlotDTTM, StartDTTM) &&
                          _TmpSceduleCount < NoOfSchedules
                        ) {
                          lstScheduleDate.Add(oSlotDTTM);
                          _TmpSceduleCount++;
                        }
                      } else if (
                        oIPPFrequency != null &&
                        oIPPFrequency.LowPeriod > oIPPFrequency.LowEvent
                      ) {
                        let oSlotDTTM: DateTime =
                          oTempStartDttm.DateTime.AddMinutes(
                            ScheduleDetailsSteppedVM.GetTimeInMinutes(sSlotTime)
                          );
                        if (
                          DateTime.GreaterThanOrEqualTo(oSlotDTTM, StartDTTM) &&
                          _TmpSceduleCount < NoOfSchedules
                        ) {
                          lstScheduleDate.Add(oSlotDTTM);
                          _TmpSceduleCount++;
                        }
                      }
                    } else {
                      let oSlotDTTM: DateTime =
                        oTempStartDttm.DateTime.AddMinutes(
                          Convert.ToInt32(sSlotTime)
                        );
                      if (
                        DateTime.GreaterThanOrEqualTo(oSlotDTTM, StartDTTM) &&
                        _TmpSceduleCount < NoOfSchedules
                      ) {
                        lstScheduleDate.Add(oSlotDTTM);
                        _TmpSceduleCount++;
                      }
                    }
                  }
                }
                if (
                  oIPPFrequency != null &&
                  oIPPFrequency.LowPeriod > oIPPFrequency.LowEvent
                ) {
                  switch (oIPPFrequency.UOM) {
                    case 'CC_MEDDRSN1':
                      oTempStartDttm = oTempStartDttm.AddDays(
                        oIPPFrequency.LowPeriod
                      );
                      break;
                    case 'CC_MEDDRSN2':
                      oTempStartDttm = oTempStartDttm.AddDays(
                        7 * oIPPFrequency.LowPeriod
                      );
                      break;
                    case 'CC_MEDRSN3':
                      oTempStartDttm = oTempStartDttm.AddDays(
                        28 * oIPPFrequency.LowPeriod
                      );
                      break;
                  }
                } else {
                  if (
                    oIPPFrequency != null &&
                    String.Equals(oIPPFrequency.UOM, 'CC_MEDRSN3')
                  ) {
                    oTempStartDttm = oTempStartDttm.AddDays(28);
                  } else {
                    oTempStartDttm = oTempStartDttm.AddDays(1);
                  }
                }
              }
            }
          }
        }
      }
    }
    return lstScheduleDate;
  }
  private CalculateStartAndEndDTTM(): void {
    let dtCurrentTime: DateTime = CommonBB.GetServerDateTime();
    this.IsStartDateGiven = true;
    if (DateTime.Equals(this.StartDate, DateTime.MinValue)) {
      if (this.PresType != PrescriptionTypes.Clerking) {
        this.StartDate = dtCurrentTime;
      } else {
        this.StartDate = dtCurrentTime.Date;
      }
      this.IsStartDateGiven = false;
    }
    let IsDurationGiven: boolean = false;
    let nDurationInMinutes: number = CConstants.NO_OF_MINUTESPER_DAY;
    if (this.DurationValue > 0 && !String.IsNullOrEmpty(this.DurationUOM)) {
      IsDurationGiven = true;
      if (
        !String.Equals(
          this.DurationUOM,
          ConstDurationUOM.Doses,
          StringComparison.InvariantCultureIgnoreCase
        )
      ) {
        nDurationInMinutes = this.ConvertDurationToMinutes(
          this.DurationUOM,
          this.DurationValue
        );
        if (nDurationInMinutes == 0) {
          nDurationInMinutes = CConstants.NO_OF_MINUTESPER_DAY;
          IsDurationGiven = false;
        }
      }
    }
    if (IsDurationGiven) {
      if (
        String.Equals(
          this.DurationUOM,
          ConstDurationUOM.Doses,
          StringComparison.InvariantCultureIgnoreCase
        )
      ) {
        if (
          DateTime.NotEquals(this.StartDate, DateTime.MinValue) &&
          ((this.AdminTimeGrdData != null && this.AdminTimeGrdData.Count > 0) ||
            (this.GrdData != null && this.GrdData.Count > 0) ||
            this.FreqDetails != null)
        ) {
          if (this.IsStartDateGiven) {
            this.EndDate = ScheduleDetailsSteppedVM.EndDTTMforDurationDose(
              null,
              this
            );
          }
        }
      } else {
        if (
          String.Equals(
            this.DurationUOM,
            ConstDurationUOM.Days,
            StringComparison.InvariantCultureIgnoreCase
          )
        ) {
          let StartDTTM: DateTime = DateTime.MinValue;
          let StopDTTM: DateTime = DateTime.MinValue;
          MCommonBB.CalculateEndDTTMForDaysDuration(
            this.AdminTimeGrdData,
            this.StartDate,
            DateTime.MinValue,
            this.IsFixedTime,
            Convert.ToInt32(this.DurationValue),
            (o1) => {
              StartDTTM = o1;
            },
            (o2) => {
              StopDTTM = o2;
            }
          );
          this.EndDate = StopDTTM;
        } else {
          this.EndDate = this.StartDate.AddMinutes(nDurationInMinutes - 1);
        }
      }
    } else {
      this.SetEndDTTMWhenDurationNotGiven();
    }
    if (
      IsDurationGiven &&
      DateTime.NotEquals(this.StartDate, DateTime.MinValue) &&
      DateTime.NotEquals(this.EndDate, DateTime.MinValue) &&
      DateTime.GreaterThan(this.EndDate, this.startDate.AddDays(1))
    ) {
      this.IsDayWiseEnabled = true;
    } else {
      this.IsDayWiseEnabled = false;
    }
  }
  private SetEndDTTMWhenDurationNotGiven(): void {
    let NumberOfDaysToAdd: number = 3;
    if (
      this.FreqDetails != null &&
      this.FreqDetails.oFrequency != null &&
      !String.IsNullOrEmpty(this.FreqDetails.oFrequency.UOM) &&
      String.Equals(
        this.FreqDetails.oFrequency.UOM,
        ConstDurationUOM.Weeks,
        StringComparison.CurrentCultureIgnoreCase
      )
    ) {
      NumberOfDaysToAdd = 6;
    }
    let dtCurrentTime: DateTime = CommonBB.GetServerDateTime();
    let dtTempEndDate: DateTime = this.StartDate.DateTime.AddDays(
      NumberOfDaysToAdd
    )
      .AddHours(23)
      .AddMinutes(59)
      .AddSeconds(59);
    let dtCurrentDatePlus3: DateTime = dtCurrentTime.DateTime.AddDays(
      NumberOfDaysToAdd
    )
      .AddHours(23)
      .AddMinutes(59)
      .AddSeconds(59);
    if (DateTime.GreaterThan(dtTempEndDate, dtCurrentDatePlus3)) this.EndDate = dtTempEndDate;
    else this.EndDate = dtCurrentDatePlus3;
  }
  public ConvertDurationToMinutes(
    DurationUOM: string,
    Duration: number
  ): number {
    let _TmpDuration: number = 0;
    switch (DurationUOM) {
      case ConstDurationUOM.Days:
        _TmpDuration = TimeSpan.FromDays(Duration).TotalMinutes;
        break;
      case ConstDurationUOM.Weeks:
        _TmpDuration = TimeSpan.FromDays(Duration * 7).TotalMinutes;
        break;
      case ConstDurationUOM.Months:
        _TmpDuration = TimeSpan.FromDays(Duration * 28).TotalMinutes;
        break;
      case ConstDurationUOM.Years:
        _TmpDuration = TimeSpan.FromDays(Duration * 365).TotalMinutes;
        break;
      case ConstDurationUOM.Hours:
        _TmpDuration = TimeSpan.FromHours(Duration).TotalMinutes;
        break;
      case ConstDurationUOM.Minutes:
        _TmpDuration = Duration;
        break;
    }
    return _TmpDuration;
  }
  public IsDurationIsOneDayOrLesser(
    DurationUOM: string,
    Duration: number
  ): boolean {
    let bResult: boolean = false;
    if (Duration > 0 && !String.IsNullOrEmpty(DurationUOM)) {
      if (
        String.Equals(
          DurationUOM,
          ConstDurationUOM.Doses,
          StringComparison.InvariantCultureIgnoreCase
        )
      ) {
        if (
          DateTime.NotEquals(this.StartDate, DateTime.MinValue) &&
          DateTime.NotEquals(this.EndDate, DateTime.MinValue)
        ) {
          bResult =
            this.EndDate.Subtract(this.StartDate).TotalMinutes <=
            CConstants.NO_OF_MINUTESPER_DAY;
        }
      } else {
        let _DurationInMintues: number = this.ConvertDurationToMinutes(
          DurationUOM,
          Duration
        );
        bResult = _DurationInMintues <= CConstants.NO_OF_MINUTESPER_DAY;
      }
    }
    return bResult;
  }
  private CheckPartiallyorDayCrossed(): void {
    let _IsPartiallyCrossedStartDate: boolean = false;
    let _IsDayCrossedStartDate: boolean = false;
    let _PartiallyCrossedStartDateCount: number = 0;
    let _IsPartiallyCrossedEndDate: boolean = false;
    let _IsDayCrossedEndDate: boolean = false;
    let _PartiallyCrossedEndDateCount: number = 0;
    let dTempScheduleDTTM: DateTime = DateTime.MinValue;
    if (DateTime.Equals(this.EndDate, DateTime.MinValue)) {
      this.SetEndDTTMWhenDurationNotGiven();
    }
    if (this.AdminTimeGrdData != null && this.AdminTimeGrdData.Count > 0) {
      let nAdminTimeCount: number = this.AdminTimeGrdData.Count;
      let IsDrugroundTimeNotExists: boolean = true;
      if (
        nAdminTimeCount == 1 &&
        String.IsNullOrEmpty(this.AdminTimeGrdData[0].DruRoundTimes)
      ) {
        IsDrugroundTimeNotExists = true;
      } else if (nAdminTimeCount > 1) {
        IsDrugroundTimeNotExists = this.AdminTimeGrdData.All(
          (x) =>
            String.IsNullOrEmpty(x.DruRoundTimes) ||
            String.Equals(x.DruRoundTimes, '00:00')
        );
      }
      let IsFixedTimeNotExists: boolean = false;
      if (IsDrugroundTimeNotExists) {
        IsFixedTimeNotExists =
          nAdminTimeCount > 1 &&
          this.AdminTimeGrdData.All(
            (x) =>
              String.IsNullOrEmpty(x.FixedTimes) ||
              String.Equals(x.FixedTimes, '00:00')
          );
      }
      if (!IsDrugroundTimeNotExists || !IsFixedTimeNotExists) {
        for (let i: number = 0; i < nAdminTimeCount; i++) {
          let ts: TimeSpan = new TimeSpan();
          let bResult: boolean = false;
          if (
            this.IsFixedTime &&
            !String.IsNullOrEmpty(this.AdminTimeGrdData[i].FixedTimes)
          ) {
            bResult = TimeSpan.TryParse(
              this.AdminTimeGrdData[i].FixedTimes,
              (o) => {
                ts = o;
              }
            );
          } else if (
            !String.IsNullOrEmpty(this.AdminTimeGrdData[i].DruRoundTimes)
          ) {
            bResult = TimeSpan.TryParse(
              this.AdminTimeGrdData[i].DruRoundTimes,
              (o) => {
                ts = o;
              }
            );
          }
          if (bResult) {
            dTempScheduleDTTM = this.StartDate.DateTime.Add(ts);
            if (DateTime.LessThan(dTempScheduleDTTM, this.StartDate)) {
              _PartiallyCrossedStartDateCount++;
            }
            if (DateTime.NotEquals(this.EndDate, DateTime.MinValue)) {
              dTempScheduleDTTM = this.EndDate.DateTime.Add(ts);
              if (DateTime.GreaterThan(dTempScheduleDTTM, this.EndDate)) {
                _PartiallyCrossedEndDateCount++;
              }
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
        if (_PartiallyCrossedEndDateCount == 0) {
          _IsDayCrossedEndDate = false;
          _IsPartiallyCrossedEndDate = false;
        } else if (_PartiallyCrossedEndDateCount == nAdminTimeCount) {
          _IsDayCrossedEndDate = true;
          _IsPartiallyCrossedEndDate = false;
        } else {
          _IsDayCrossedEndDate = false;
          _IsPartiallyCrossedEndDate = true;
        }
      }
      let _IsMonthlyFrequency: boolean = false;
      let _IsWeeklyFrequency: boolean = false;
      let _IsDailyFrequency: boolean = false;
      let iLowPeriod: number = 1;
      if (this.FreqDetails != null && this.FreqDetails.oFrequency != null) {
        if (!String.IsNullOrEmpty(this.FreqDetails.oFrequency.UOM)) {
          if (
            String.Equals(
              this.FreqDetails.oFrequency.UOM,
              ConstDurationUOM.Months,
              StringComparison.CurrentCultureIgnoreCase
            )
          ) {
            _IsMonthlyFrequency = true;
          } else if (
            String.Equals(
              this.FreqDetails.oFrequency.UOM,
              ConstDurationUOM.Weeks,
              StringComparison.CurrentCultureIgnoreCase
            )
          ) {
            _IsWeeklyFrequency = true;
          } else if (
            String.Equals(
              this.FreqDetails.oFrequency.UOM,
              ConstDurationUOM.Days,
              StringComparison.CurrentCultureIgnoreCase
            )
          ) {
            _IsDailyFrequency = true;
          }
        }
        iLowPeriod =
          this.FreqDetails.oFrequency.LowPeriod > 0
            ? this.FreqDetails.oFrequency.LowPeriod
            : 1;
      }
      this.GridStartDTTM = this.StartDate;
      if (_IsDayCrossedStartDate && DateTime.NotEquals(this.EndDate, DateTime.MinValue)) {
        if (
          _IsDailyFrequency &&
          DateTime.LessThanOrEqualTo(this.StartDate.DateTime.AddDays(iLowPeriod), this.EndDate)
        ) {
          this.GridStartDTTM = this.StartDate.DateTime.AddDays(iLowPeriod);
        } else if (
          _IsWeeklyFrequency &&
          iLowPeriod == 1 &&
          DateTime.LessThanOrEqualTo(this.StartDate.DateTime.AddDays(1), this.EndDate)
        ) {
          this.GridStartDTTM = this.StartDate.DateTime.AddDays(1);
        } else if (_IsWeeklyFrequency && iLowPeriod > 1) {
          if (
            (this.StartDate.DayOfWeek == DayOfWeek.Sunday &&
              this.FreqDetails.oFrequency.IsSunday) ||
            (this.StartDate.DayOfWeek == DayOfWeek.Monday &&
              this.FreqDetails.oFrequency.IsMonday) ||
            (this.StartDate.DayOfWeek == DayOfWeek.Tuesday &&
              this.FreqDetails.oFrequency.IsTuesday) ||
            (this.StartDate.DayOfWeek == DayOfWeek.Wednesday &&
              this.FreqDetails.oFrequency.IsWednesday) ||
            (this.StartDate.DayOfWeek == DayOfWeek.Thursday &&
              this.FreqDetails.oFrequency.IsThursday) ||
            (this.StartDate.DayOfWeek == DayOfWeek.Friday &&
              this.FreqDetails.oFrequency.IsFriday) ||
            (this.StartDate.DayOfWeek == DayOfWeek.Saturday &&
              this.FreqDetails.oFrequency.IsSaturday)
          ) {
            let tmpStartDate: DateTime = this.StartDate.AddDays(iLowPeriod * 7);
            if (
              DateTime.NotEquals(tmpStartDate, DateTime.MinValue) &&
              DateTime.LessThanOrEqualTo(tmpStartDate, this.EndDate)
            ) {
              this.GridStartDTTM = tmpStartDate;
            }
          } else {
            let tmpStartDate: DateTime = MCommonBB.GetFirstDateOfweek(
              this.StartDate,
              this.EndDate.Date,
              this.FreqDetails.oFrequency,
              null
            );
            if (
              DateTime.NotEquals(tmpStartDate, DateTime.MinValue) &&
              DateTime.LessThanOrEqualTo(tmpStartDate, this.EndDate)
            ) {
              this.GridStartDTTM = tmpStartDate;
            }
          }
        } else if (
          _IsMonthlyFrequency &&
          iLowPeriod == 1 &&
          DateTime.LessThanOrEqualTo(this.StartDate.DateTime.AddDays(CConstants.NoOfDaysInMonth),
            this.EndDate)
        ) {
          this.GridStartDTTM = this.StartDate.DateTime.AddDays(
            CConstants.NoOfDaysInMonth
          );
        } else if (_IsMonthlyFrequency && iLowPeriod > 1) {
          let tmpStartDate: DateTime = this.StartDate.DateTime.AddDays(
            iLowPeriod * CConstants.NoOfDaysInMonth
          );
          if (
            DateTime.NotEquals(tmpStartDate, DateTime.MinValue) &&
            DateTime.LessThanOrEqualTo(tmpStartDate, this.EndDate)
          ) {
            this.GridStartDTTM = tmpStartDate;
          }
        } else if (
          !_IsDailyFrequency &&
          !_IsMonthlyFrequency &&
          !_IsWeeklyFrequency &&
          DateTime.LessThanOrEqualTo(this.StartDate.DateTime.AddDays(1), this.EndDate)
        ) {
          this.GridStartDTTM = this.StartDate.DateTime.AddDays(1);
        }
      }
      if (
        _IsDayCrossedEndDate &&
        DateTime.NotEquals(this.EndDate, DateTime.MinValue) &&
        DateTime.GreaterThanOrEqualTo(this.EndDate.DateTime.AddMinutes(-1), this.GridStartDTTM)
      ) {
        this.GridEndDTTM = this.EndDate.DateTime.AddMinutes(-1);
      } else {
        this.GridEndDTTM = this.EndDate;
      }
    } else {
      this.GridStartDTTM = this.StartDate;
      this.GridEndDTTM = this.EndDate;
    }
  }
  public IntializeScheduleDetailsCols(): void {
    if (this.GrdData == null || this.GrdData.Count == 0) {
      this.GrdData = new ObservableCollection<ScheduleDetailsCols>();
      let _LowEventCount: number = 0;
      if (this.FreqDetails != null && this.FreqDetails.oFrequency != null) {
        if (
          !String.IsNullOrEmpty(this.FreqDetails.oFrequency.UOM) &&
          String.Equals(
            this.FreqDetails.oFrequency.UOM,
            ConstDurationUOM.Weeks,
            StringComparison.InvariantCultureIgnoreCase
          )
        ) {
          _LowEventCount =
            this.FreqDetails.oFrequency.NoOfEventsPerDay > 0
              ? this.FreqDetails.oFrequency.NoOfEventsPerDay
              : 1;
        } else {
          _LowEventCount =
            String.Compare(
              this.FreqDetails.oFrequency.UOM,
              'CC_MEDRSN3',
              StringComparison.CurrentCultureIgnoreCase
            ) == 0 ||
              String.Compare(
                this.FreqDetails.oFrequency.UOM,
                'CC_MEDRSN4',
                StringComparison.CurrentCultureIgnoreCase
              ) == 0
              ? 1
              : this.FreqDetails.oFrequency.LowEvent;
        }
      }
      if (this.AdminTimeGrdData == null) {
        if (this.FreqDetails != null && this.FreqDetails.oFrequency != null) {
          for (let i: number = 0; i < _LowEventCount; i++) {
            this.GrdData.Add(this.AddScheduleDetailsCols('00:00'));
          }
        }
      } else {
        {
          let nCount: number = this.AdminTimeGrdData.Count;
          for (let i: number = 0; i < nCount; i++) {
            if (this.IsFixedTime) {
              this.GrdData.Add(
                this.AddScheduleDetailsCols(this.AdminTimeGrdData[i].FixedTimes)
              );
            } else {
              this.GrdData.Add(
                this.AddScheduleDetailsCols(
                  this.AdminTimeGrdData[i].DruRoundTimes
                )
              );
            }
          }
        }
      }
      this.IsScheduleTimesLoadedFromFreqDetail = true;
    } else if (this.AdminTimeGrdData != null) {
      let nCount: number =
        this.GrdData.Count < this.AdminTimeGrdData.Count
          ? this.GrdData.Count
          : this.AdminTimeGrdData.Count;
      {
        for (let i: number = 0; i < nCount; i++) {
          if (this.IsFixedTime) {
            this.GrdData[i].ScheduleTime = this.AdminTimeGrdData[i].FixedTimes;
          } else {
            this.GrdData[i].ScheduleTime =
              this.AdminTimeGrdData[i].DruRoundTimes;
          }
        }
        let nDurationInDays: number = this.LstGridColumnsDates.Count;
        let _AvailableDaysCount: number =
          this.GrdData[0].ScheduleDate != null
            ? this.GrdData[0].ScheduleDate.length
            : 0;
        if (_AvailableDaysCount > nDurationInDays) {
          for (let i: number = 0; i < this.GrdData.Count; i++) {
            let arScheduleDate: DateTime[] = this.GrdData[i].ScheduleDate;
            Array.Resize<DateTime>(arScheduleDate, nDurationInDays);
            this.GrdData[i].ScheduleDate = arScheduleDate;
            let arScheduleDoseValue: string[] =
              this.GrdData[i].ScheduleDoseValue;
            Array.Resize<string>(arScheduleDoseValue, nDurationInDays);
            this.GrdData[i].ScheduleDoseValue = arScheduleDoseValue;
            let arScheduledoseflag: boolean[] =
              this.GrdData[i].Scheduledoseflag;
            Array.Resize<boolean>(arScheduledoseflag, nDurationInDays);
            this.GrdData[i].Scheduledoseflag = arScheduledoseflag;
            if (
              this.GrdData[i].ScheduleDoseUOMs != null &&
              this.GrdData[i].ScheduleDoseUOMs.Count() > 0
            ) {
              let arScheduleDoseUOMs: string[] =
                this.GrdData[i].ScheduleDoseUOMs;
              Array.Resize<string>(arScheduleDoseUOMs, nDurationInDays);
              this.GrdData[i].ScheduleDoseUOMs = arScheduleDoseUOMs;
            }
          }
        } else {
          while (nDurationInDays > _AvailableDaysCount) {
            for (let i: number = 0; i < this.GrdData.Count; i++) {
              // Concat Alternate 
              this.GrdData[i].ScheduleDate = [...this.GrdData[i].ScheduleDate, DateTime.MinValue];
              this.GrdData[i].ScheduleDoseValue = [...this.GrdData[i].ScheduleDoseValue, ""];
              this.GrdData[i].Scheduledoseflag = [...this.GrdData[i].Scheduledoseflag, false];

              if (this.GrdData[i].ScheduleDoseUOMs != null && this.GrdData[i].ScheduleDoseUOMs.Count() > 0)
                this.GrdData[i].ScheduleDoseUOMs = [...this.GrdData[i].ScheduleDoseUOMs, ""];
            }
            _AvailableDaysCount++;
          }
        }
      }
    }
    if (
      !String.Equals(
        this.ActionCode,
        eActivityTypes.Reorder.ToString(),
        StringComparison.InvariantCultureIgnoreCase
      ) &&
      !this.IsDaywiseView &&
      this.GrdData != null &&
      this.GrdData.Count > 0 &&
      this.GrdData[0] != null &&
      this.GrdData[0].ScheduleDate != null
    ) {
      this.IsDaywiseView = this.IsDurationIsOneDayOrLesser(
        this.DurationUOM,
        this.DurationValue
      );
      this.IsDayWiseEnabled =
        !this.IsDaywiseView &&
        !String.IsNullOrEmpty(this.DurationUOM) &&
        this.DurationValue > 0 &&
        this.GrdData[0].ScheduleDate.length > 1;
    }
    if (
      this.GrdData != null &&
      this.GrdData.Count > 0 &&
      this.LstGridColumnsDates != null &&
      this.LstGridColumnsDates.Count > 0
    ) {
      let _AdminTimesCount: number = this.GrdData.Count;
      for (
        let _AdminTimeIndex: number = 0;
        _AdminTimeIndex < _AdminTimesCount;
        _AdminTimeIndex++
      ) {
        if (
          this.GrdData[_AdminTimeIndex].ScheduleDate != null &&
          this.GrdData[_AdminTimeIndex].ScheduleDate.length ==
          this.LstGridColumnsDates.Count
        ) {
          let _DaysCount: number =
            this.GrdData[_AdminTimeIndex].ScheduleDate.length;
          for (let _DayIndex: number = 0; _DayIndex < _DaysCount; _DayIndex++) {
            this.GrdData[_AdminTimeIndex].ScheduleDate[_DayIndex] =
              this.LstGridColumnsDates[_DayIndex];
          }
        }
      }
    }
  }
  public FillGridData(): void {
    this.CheckPartiallyorDayCrossed();
    this.FillDatesForGridColumns();
    this.IntializeScheduleDetailsCols();
  }
  AddScheduleDetailsCols(ScheduleTime: string): ScheduleDetailsCols {
    let oScheduleDetailsCols: ScheduleDetailsCols = new ScheduleDetailsCols();
    oScheduleDetailsCols.ScheduleTime = ScheduleTime;
    oScheduleDetailsCols.PresType = PatientContext.PrescriptionType;
    let nDurationInDays: number = this.LstGridColumnsDates.Count;
    if (nDurationInDays > 0) {
      oScheduleDetailsCols.ScheduleDoseValue = new Array(nDurationInDays);
      oScheduleDetailsCols.ScheduleDoseUOMs = new Array(nDurationInDays);
      oScheduleDetailsCols.ScheduleDate = new Array(nDurationInDays);
      oScheduleDetailsCols.Scheduledoseflag = new Array(nDurationInDays);
    } else {
      oScheduleDetailsCols.ScheduleDoseValue = new Array(1);
      oScheduleDetailsCols.ScheduleDoseUOMs = new Array(1);
      oScheduleDetailsCols.ScheduleDate = new Array(1);
      oScheduleDetailsCols.Scheduledoseflag = new Array(1);
    }
    oScheduleDetailsCols.ScheduleDoseValue[0] = this.DoseValue;
    oScheduleDetailsCols.ScheduleDoseUOMs[0] = ' ' + this.DoseUOM.Trim();
    oScheduleDetailsCols.Scheduledoseflag[0] = true;
    oScheduleDetailsCols.ScheduleDoseUOM = this.DoseUOM;
    return oScheduleDetailsCols;
  }
  private FillDatesForGridColumns(): void {
    this.LstGridColumnsDates = new List<DateTime>();
    if (
      this.FreqDetails != null &&
      this.FreqDetails.oFrequency != null &&
      !String.IsNullOrEmpty(this.FreqDetails.oFrequency.UOM) &&
      DateTime.NotEquals(this.GridStartDTTM, DateTime.MinValue) &&
      DateTime.NotEquals(this.GridEndDTTM, DateTime.MinValue)
    ) {
      let iLowPeriod: number =
        this.FreqDetails.oFrequency.LowPeriod > 0
          ? this.FreqDetails.oFrequency.LowPeriod
          : 1;
      let _tmpStartDate: DateTime = this.GridStartDTTM;
      if (
        String.Equals(
          this.FreqDetails.oFrequency.UOM,
          'CC_MEDDRSN2',
          StringComparison.InvariantCultureIgnoreCase
        )
      ) {
        let IsDaysOfWeekSelected: boolean =
          this.FreqDetails.oFrequency.IsSunday ||
          this.FreqDetails.oFrequency.IsMonday ||
          this.FreqDetails.oFrequency.IsTuesday ||
          this.FreqDetails.oFrequency.IsWednesday ||
          this.FreqDetails.oFrequency.IsThursday ||
          this.FreqDetails.oFrequency.IsFriday ||
          this.FreqDetails.oFrequency.IsSaturday;
        if (IsDaysOfWeekSelected) {
          while (DateTime.LessThanOrEqualTo(_tmpStartDate.Date, this.GridEndDTTM.Date)) {
            if (
              (_tmpStartDate.DayOfWeek == DayOfWeek.Sunday &&
                this.FreqDetails.oFrequency.IsSunday) ||
              (_tmpStartDate.DayOfWeek == DayOfWeek.Monday &&
                this.FreqDetails.oFrequency.IsMonday) ||
              (_tmpStartDate.DayOfWeek == DayOfWeek.Tuesday &&
                this.FreqDetails.oFrequency.IsTuesday) ||
              (_tmpStartDate.DayOfWeek == DayOfWeek.Wednesday &&
                this.FreqDetails.oFrequency.IsWednesday) ||
              (_tmpStartDate.DayOfWeek == DayOfWeek.Thursday &&
                this.FreqDetails.oFrequency.IsThursday) ||
              (_tmpStartDate.DayOfWeek == DayOfWeek.Friday &&
                this.FreqDetails.oFrequency.IsFriday) ||
              (_tmpStartDate.DayOfWeek == DayOfWeek.Saturday &&
                this.FreqDetails.oFrequency.IsSaturday)
            ) {
              this.LstGridColumnsDates.Add(_tmpStartDate.Date);
            }
            if (iLowPeriod > 1) {
              if (
                this.LstGridColumnsDates != null &&
                this.LstGridColumnsDates.Count == 0
              ) {
                _tmpStartDate = MCommonBB.GetFirstDateOfweek(
                  _tmpStartDate,
                  this.GridEndDTTM.Date,
                  this.FreqDetails.oFrequency,
                  null
                );
                if (DateTime.Equals(_tmpStartDate, DateTime.MinValue)) {
                  break;
                }
              } else {
                _tmpStartDate = _tmpStartDate.AddDays(iLowPeriod * 7);
              }
            } else {
              _tmpStartDate = _tmpStartDate.AddDays(1);
            }
          }
        }
      } else if (
        String.Equals(
          this.FreqDetails.oFrequency.UOM,
          CConstants.MonthCode,
          StringComparison.InvariantCultureIgnoreCase
        )
      ) {
        while (DateTime.LessThanOrEqualTo(_tmpStartDate.Date, this.GridEndDTTM.Date)) {
          this.LstGridColumnsDates.Add(_tmpStartDate.Date);
          _tmpStartDate = _tmpStartDate.AddDays(
            iLowPeriod * CConstants.NoOfDaysInMonth
          );
        }
      } else if (
        String.Equals(
          this.FreqDetails.oFrequency.UOM,
          CConstants.YearCode,
          StringComparison.InvariantCultureIgnoreCase
        )
      ) {
        while (DateTime.LessThanOrEqualTo(_tmpStartDate.Date, this.GridEndDTTM.Date)) {
          this.LstGridColumnsDates.Add(_tmpStartDate.Date);
          _tmpStartDate = _tmpStartDate.AddYears(iLowPeriod);
        }
      } else {
        while (DateTime.LessThanOrEqualTo(_tmpStartDate.Date, this.GridEndDTTM.Date)) {
          this.LstGridColumnsDates.Add(_tmpStartDate.Date);
          _tmpStartDate = _tmpStartDate.AddDays(iLowPeriod);
        }
      }
    }
  }
  public FillDatesForGridColumnsFromExistingData(): void {
    if (
      this.LstGridColumnsDates == null &&
      this.GrdData != null &&
      this.GrdData.Count > 0 &&
      this.GrdData[0].ScheduleDate != null &&
      this.GrdData[0].ScheduleDate.length > 0
    ) {
      this.LstGridColumnsDates = new List<DateTime>();
      this.LstGridColumnsDates = this.GrdData[0].ScheduleDate.ToList();
    }
  }
  public AssignDosesFromFirstToNextDays(): void {
    this.IsDayWiseEnabled = false;
    this.IsDaywiseView = true;
    let dtDoseStartDttm: DateTime = this.StartDate.ToUserDateTime();
    let dtDoseEndDttm: DateTime = this.EndDate.ToUserDateTime();
    if (
      this.GrdData != null &&
      this.GrdData.Count > 0 &&
      this.LstGridColumnsDates != null &&
      this.LstGridColumnsDates.Count > 0
    ) {
      let IsScheduleTimeEntryExists: boolean = false;
      if (this.GrdData.Count == 1) {
        IsScheduleTimeEntryExists = true;
      } else if (this.GrdData.Count > 1) {
        IsScheduleTimeEntryExists = !this.GrdData.All(
          (oItem) =>
            String.IsNullOrEmpty(oItem.ScheduleTime) ||
            String.Equals(oItem.ScheduleTime, '00:00')
        );
      }
      let _AdminTimesCount: number = this.GrdData.Count;
      let sFirstColumnDose: string = String.Empty;
      let sFirstColumnUOM: string = String.Empty;
      for (
        let _AdminTimeIndex: number = 0;
        _AdminTimeIndex < _AdminTimesCount;
        _AdminTimeIndex++
      ) {
        let ts: TimeSpan = new TimeSpan();
        let bResult: boolean = false;
        let _GridDaysCount: number = this.LstGridColumnsDates.Count;
        sFirstColumnDose =
          this.GrdData[_AdminTimeIndex].ScheduleDoseValue.First();
         
          if(this.GrdData[_AdminTimeIndex].ScheduleDoseUOMs!= 'undefined' && this.GrdData[_AdminTimeIndex].ScheduleDoseUOMs!=null  )
          sFirstColumnUOM =  this.GrdData[_AdminTimeIndex].ScheduleDoseUOMs.First();
 


        if (!String.IsNullOrEmpty(this.GrdData[_AdminTimeIndex].ScheduleTime)) {
          bResult = TimeSpan.TryParse(
            this.GrdData[_AdminTimeIndex].ScheduleTime,
            (o) => {
              ts = o;
            }
          );
        }
        for (
          let _GridDayIndex: number = 0;
          _GridDayIndex < _GridDaysCount;
          _GridDayIndex++
        ) {
          let dtTempScheduleDTTM: DateTime = DateTime.MinValue;
          if (bResult && ts != TimeSpan.Zero) {
            dtTempScheduleDTTM = this.LstGridColumnsDates[_GridDayIndex]
              .ToUserDateTime()
              .DateTime.Add(ts);
          } else {
            dtTempScheduleDTTM =
              this.LstGridColumnsDates[_GridDayIndex].ToUserDateTime();
          }
          if (
            _GridDayIndex <
            this.GrdData[_AdminTimeIndex].Scheduledoseflag.Count() &&
            _GridDayIndex <
            this.GrdData[_AdminTimeIndex].ScheduleDoseValue.Count() &&
            _GridDayIndex < this.GrdData[_AdminTimeIndex].ScheduleDate.Count()
          ) {
            if (
              (!IsScheduleTimeEntryExists &&
                DateTime.GreaterThanOrEqualTo(dtTempScheduleDTTM.Date, dtDoseStartDttm.Date) &&
                DateTime.LessThanOrEqualTo(dtTempScheduleDTTM.Date, dtDoseEndDttm.Date)) ||
              (IsScheduleTimeEntryExists &&
                DateTime.GreaterThanOrEqualTo(dtTempScheduleDTTM, dtDoseStartDttm) &&
                DateTime.LessThanOrEqualTo(dtTempScheduleDTTM, dtDoseEndDttm))
            ) {
              if (!TimeZoneInfo.Local.IsInvalidTime(dtTempScheduleDTTM)) {
                this.GrdData[_AdminTimeIndex].ScheduleDoseValue[_GridDayIndex] =
                  sFirstColumnDose;
                 
                  if(!String.IsNullOrEmpty(sFirstColumnUOM))
                  this.GrdData[_AdminTimeIndex].ScheduleDoseUOMs[_GridDayIndex] = sFirstColumnUOM; 
                this.GrdData[_AdminTimeIndex].Scheduledoseflag[_GridDayIndex] =
                  true;
              }
            } else {
              this.GrdData[_AdminTimeIndex].ScheduleDoseValue[_GridDayIndex] =
                String.Empty;
              if (this.GrdData[_AdminTimeIndex].ScheduleDoseUOMs !== undefined) 
                this.GrdData[_AdminTimeIndex].ScheduleDoseUOMs[_GridDayIndex] = String.Empty;
                
              this.GrdData[_AdminTimeIndex].Scheduledoseflag[_GridDayIndex] =
                false;
            }
            this.GrdData[_AdminTimeIndex].ScheduleDate[_GridDayIndex] =
              dtTempScheduleDTTM.ToLocalDateTime();
          }
        }
      }
    }
  }
  private ReassignDosesFromSource(
    SourceData: List<string>,
    IsEliminateElapsedDoses?: boolean
  ) {
    if (arguments.length == 1) {
      this.ReassignDosesFromSource1(SourceData);
    } else {
      this.ReassignDosesFromSource2(SourceData, IsEliminateElapsedDoses);
    }
  }
  private ReassignDosesFromSource2(
    SourceData: List<string>,
    IsEliminateElapsedDoses: boolean
  ): void {
    if (
      SourceData != null &&
      SourceData.Count > 0 &&
      this.GrdData != null &&
      this.GrdData.Count > 0 &&
      this.LstGridColumnsDates != null &&
      this.LstGridColumnsDates.Count > 0
    ) {
      let IsScheduleTimeEntryExists: boolean = false;
      if (this.GrdData.Count == 1) {
        IsScheduleTimeEntryExists = true;
      } else if (this.GrdData.Count > 1) {
        IsScheduleTimeEntryExists = !this.GrdData.All(
          (oItem) =>
            String.IsNullOrEmpty(oItem.ScheduleTime) ||
            String.Equals(oItem.ScheduleTime, '00:00')
        );
      }
      let dtDoseStartDttm: DateTime = this.StartDate.ToUserDateTime();
      let dtDoseEndDttm: DateTime = this.EndDate.ToUserDateTime();
      let _AdminTimesCount: number = this.GrdData.Count;
      let _GridDaysCount: number = 0;
      if (
        this.GrdData[0].ScheduleDoseValue != null &&
        this.GrdData[0].Scheduledoseflag != null
      ) {
        _GridDaysCount =
          this.GrdData[0].ScheduleDoseValue.length <
            this.LstGridColumnsDates.Count
            ? this.GrdData[0].ScheduleDoseValue.length
            : this.LstGridColumnsDates.Count;
      }
      let nDoseIndex: number = 0,
        nDoseCount = SourceData.Count;
      if (this.IsDaywiseView) {
        for (
          let _GridDayIndex: number = 0;
          _GridDayIndex < _GridDaysCount;
          _GridDayIndex++
        ) {
          for (
            let _AdminTimeIndex: number = 0;
            _AdminTimeIndex < _AdminTimesCount;
            _AdminTimeIndex++
          ) {
            let ts: TimeSpan = new TimeSpan();
            let bResult: boolean = false;
            if (
              !String.IsNullOrEmpty(this.GrdData[_AdminTimeIndex].ScheduleTime)
            ) {
              bResult = TimeSpan.TryParse(
                this.GrdData[_AdminTimeIndex].ScheduleTime,
                (o) => {
                  ts = o;
                }
              );
            }
            let dtTempScheduleDTTM: DateTime = DateTime.MinValue;
            if (bResult && ts != TimeSpan.Zero) {
              dtTempScheduleDTTM = this.LstGridColumnsDates[_GridDayIndex]
                .ToUserDateTime()
                .DateTime.Add(ts);
            } else {
              dtTempScheduleDTTM =
                this.LstGridColumnsDates[_GridDayIndex].ToUserDateTime();
            }
            if (
              (!IsScheduleTimeEntryExists &&
                DateTime.GreaterThanOrEqualTo(dtTempScheduleDTTM.Date, dtDoseStartDttm.Date) &&
                DateTime.LessThanOrEqualTo(dtTempScheduleDTTM.Date, dtDoseEndDttm.Date)) ||
              (IsScheduleTimeEntryExists &&
                DateTime.GreaterThanOrEqualTo(dtTempScheduleDTTM, dtDoseStartDttm) &&
                DateTime.LessThanOrEqualTo(dtTempScheduleDTTM, dtDoseEndDttm))
            ) {
              if (!TimeZoneInfo.Local.IsInvalidTime(dtTempScheduleDTTM)) {
                if (nDoseIndex < nDoseCount) {
                  this.GrdData[_AdminTimeIndex].ScheduleDoseValue[
                    _GridDayIndex
                  ] = SourceData[nDoseIndex];
                } else {
                  this.GrdData[_AdminTimeIndex].ScheduleDoseValue[
                    _GridDayIndex
                  ] = String.Empty;
                }
                this.GrdData[_AdminTimeIndex].Scheduledoseflag[_GridDayIndex] =
                  true;
                nDoseIndex++;
              } else {
                this.GrdData[_AdminTimeIndex].ScheduleDoseValue[_GridDayIndex] =
                  String.Empty;
                this.GrdData[_AdminTimeIndex].Scheduledoseflag[_GridDayIndex] =
                  false;
              }
            } else {
              this.GrdData[_AdminTimeIndex].ScheduleDoseValue[_GridDayIndex] =
                String.Empty;
              this.GrdData[_AdminTimeIndex].Scheduledoseflag[_GridDayIndex] =
                false;
              if (IsEliminateElapsedDoses) {
                nDoseIndex++;
              }
            }
            this.GrdData[_AdminTimeIndex].ScheduleDate[_GridDayIndex] =
              dtTempScheduleDTTM.ToLocalDateTime();
          }
        }
      } else {
        for (
          let _AdminTimeIndex: number = 0;
          _AdminTimeIndex < _AdminTimesCount;
          _AdminTimeIndex++
        ) {
          if (
            nDoseIndex < nDoseCount &&
            this.GrdData[_AdminTimeIndex].ScheduleDoseValue != null &&
            this.GrdData[_AdminTimeIndex].ScheduleDoseValue.length > 0 &&
            this.GrdData[_AdminTimeIndex].Scheduledoseflag != null &&
            this.GrdData[_AdminTimeIndex].Scheduledoseflag.length > 0
          ) {
            this.GrdData[_AdminTimeIndex].ScheduleDoseValue[0] =
              SourceData[nDoseIndex];
            this.GrdData[_AdminTimeIndex].Scheduledoseflag[0] = true;
            nDoseIndex++;
          }
        }
      }
    }
  }
  private ReassignDosesFromSource1(SourceData: List<string>): void {
    if (
      SourceData != null &&
      SourceData.Count > 0 &&
      this.GrdData != null &&
      this.GrdData.Count > 0 &&
      this.LstGridColumnsDates != null &&
      this.LstGridColumnsDates.Count > 0
    ) {
      this.LstElaspedDoses = new List<string>();
      let IsScheduleTimeEntryExists: boolean = false;
      if (this.GrdData.Count == 1) {
        IsScheduleTimeEntryExists = true;
      } else if (this.GrdData.Count > 1) {
        IsScheduleTimeEntryExists = !this.GrdData.All(
          (oItem) =>
            String.IsNullOrEmpty(oItem.ScheduleTime) ||
            String.Equals(oItem.ScheduleTime, '00:00')
        );
      }
      let dtDoseStartDttm: DateTime = this.StartDate.ToUserDateTime();
      let dtDoseEndDttm: DateTime = this.EndDate.ToUserDateTime();
      let _AdminTimesCount: number = this.GrdData.Count;
      let _GridDaysCount: number = 0;
      if (
        this.GrdData[0].ScheduleDoseValue != null &&
        this.GrdData[0].Scheduledoseflag != null
      ) {
        _GridDaysCount =
          this.GrdData[0].ScheduleDoseValue.length <
            this.LstGridColumnsDates.Count
            ? this.GrdData[0].ScheduleDoseValue.length
            : this.LstGridColumnsDates.Count;
      }
      let nDoseIndex: number = 0,
        nDoseCount = SourceData.Count;
      if (this.IsDaywiseView) {
        for (
          let _GridDayIndex: number = 0;
          _GridDayIndex < _GridDaysCount;
          _GridDayIndex++
        ) {
          for (
            let _AdminTimeIndex: number = 0;
            _AdminTimeIndex < _AdminTimesCount;
            _AdminTimeIndex++
          ) {
            let ts: TimeSpan = new TimeSpan();
            let bResult: boolean = false;
            if (
              !String.IsNullOrEmpty(this.GrdData[_AdminTimeIndex].ScheduleTime)
            ) {
              bResult = TimeSpan.TryParse(
                this.GrdData[_AdminTimeIndex].ScheduleTime,
                (o) => {
                  ts = o;
                }
              );
            }
            let dtTempScheduleDTTM: DateTime = DateTime.MinValue;
            if (bResult && ts != TimeSpan.Zero) {
              dtTempScheduleDTTM = this.LstGridColumnsDates[_GridDayIndex]
                .ToUserDateTime()
                .DateTime.Add(ts);
            } else {
              dtTempScheduleDTTM =
                this.LstGridColumnsDates[_GridDayIndex].ToUserDateTime();
            }
            if (
              (!IsScheduleTimeEntryExists &&
                DateTime.GreaterThanOrEqualTo(dtTempScheduleDTTM.Date, dtDoseStartDttm.Date) &&
                DateTime.LessThanOrEqualTo(dtTempScheduleDTTM.Date, dtDoseEndDttm.Date)) ||
              (IsScheduleTimeEntryExists &&
                DateTime.GreaterThanOrEqualTo(dtTempScheduleDTTM, dtDoseStartDttm) &&
                DateTime.LessThanOrEqualTo(dtTempScheduleDTTM, dtDoseEndDttm))
            ) {
              if (!TimeZoneInfo.Local.IsInvalidTime(dtTempScheduleDTTM)) {
                if (
                  nDoseIndex < nDoseCount &&
                  !String.Equals(
                    SourceData[nDoseIndex],
                    '-1',
                    StringComparison.InvariantCultureIgnoreCase
                  ) &&
                  !String.Equals(
                    SourceData[nDoseIndex],
                    '-2',
                    StringComparison.InvariantCultureIgnoreCase
                  )
                ) {
                  this.GrdData[_AdminTimeIndex].ScheduleDoseValue[
                    _GridDayIndex
                  ] = !String.Equals(SourceData[nDoseIndex], '0')
                      ? SourceData[nDoseIndex]
                      : String.Empty;
                } else {
                  this.GrdData[_AdminTimeIndex].ScheduleDoseValue[
                    _GridDayIndex
                  ] = String.Empty;
                }
                this.GrdData[_AdminTimeIndex].Scheduledoseflag[_GridDayIndex] =
                  true;
                nDoseIndex++;
              } else {
                this.GrdData[_AdminTimeIndex].ScheduleDoseValue[_GridDayIndex] =
                  String.Empty;
                this.GrdData[_AdminTimeIndex].Scheduledoseflag[_GridDayIndex] =
                  false;
              }
            } else {
              if (
                ((!IsScheduleTimeEntryExists &&
                  DateTime.LessThan(dtTempScheduleDTTM.Date, dtDoseStartDttm.Date)) ||
                  (IsScheduleTimeEntryExists &&
                    DateTime.LessThan(dtTempScheduleDTTM, dtDoseStartDttm)) ||
                  TimeZoneInfo.Local.IsInvalidTime(dtTempScheduleDTTM)) &&
                nDoseIndex < nDoseCount &&
                !String.IsNullOrEmpty(SourceData[nDoseIndex])
              ) {
                this.LstElaspedDoses.Add(
                  !String.Equals(
                    SourceData[nDoseIndex],
                    '-1',
                    StringComparison.InvariantCultureIgnoreCase
                  )
                    ? SourceData[nDoseIndex]
                    : String.Empty
                );
              }
              this.GrdData[_AdminTimeIndex].ScheduleDoseValue[_GridDayIndex] =
                String.Empty;
              this.GrdData[_AdminTimeIndex].Scheduledoseflag[_GridDayIndex] =
                false;
              nDoseIndex++;
            }
            this.GrdData[_AdminTimeIndex].ScheduleDate[_GridDayIndex] =
              dtTempScheduleDTTM.ToLocalDateTime();
          }
        }
      } else {
        for (
          let _AdminTimeIndex: number = 0;
          _AdminTimeIndex < _AdminTimesCount;
          _AdminTimeIndex++
        ) {
          if (
            nDoseIndex < nDoseCount &&
            this.GrdData[_AdminTimeIndex].ScheduleDoseValue != null &&
            this.GrdData[_AdminTimeIndex].ScheduleDoseValue.length > 0 &&
            this.GrdData[_AdminTimeIndex].Scheduledoseflag != null &&
            this.GrdData[_AdminTimeIndex].Scheduledoseflag.length > 0
          ) {
            this.GrdData[_AdminTimeIndex].ScheduleDoseValue[0] = !String.Equals(
              SourceData[nDoseIndex],
              '0'
            )
              ? SourceData[nDoseIndex]
              : String.Empty;
            this.GrdData[_AdminTimeIndex].Scheduledoseflag[0] = true;
            nDoseIndex++;
          }
        }
      }
    }
  }
  private FetchDoseValuesFromDOSorReorder(
    SourceData: List<IPPScheduledetails>
  ): List<string> {
    let lstDoses: List<string> = new List<string>();
    if (SourceData != null && SourceData.Count > 0) {
      let IsDOS: boolean = SourceData[0].Day > 0;
      let SourceDataSorted: List<IPPScheduledetails> =
        new List<IPPScheduledetails>();
      let nDoseCount: number = 0;
      if (!IsDOS) {
        SourceDataSorted = SourceData.OrderBy((x) => x.ScheduleDate).ToList();
        nDoseCount = SourceDataSorted.Count;
        if (this.IsDaywiseView) {
          for (
            let nDoseIndex: number = 0;
            nDoseIndex < nDoseCount;
            nDoseIndex++
          ) {
            if (SourceData[nDoseIndex] != null) {
              if (
                SourceData[nDoseIndex].Dose > 0 ||
                SourceData[nDoseIndex].Dose == -1
              ) {
                lstDoses.Add(SourceData[nDoseIndex].Dose.ToString());
              }
            }
          }
          if (
            SourceDataSorted != null &&
            SourceDataSorted.Count > 0 &&
            DateTime.NotEquals(SourceDataSorted[0].ScheduleDate, DateTime.MinValue)
          ) {
            let IsAllowValidDose: boolean = SourceDataSorted.Any(
              (c) => c.Dose == -2
            );
            this.FlattenDoseList(
              this.StartDate,
              this.EndDate,
              IsAllowValidDose,
              lstDoses
            );
          }
        } else {
          if (
            this.lstofNonDaywiseDoses != null &&
            this.lstofNonDaywiseDoses.Count > 0
          ) {
            lstDoses = this.lstofNonDaywiseDoses;
          } else {
            let _GrpData = SourceData.GroupBy((s) => s.ScheduleDate.TimeOfDay)
              .OrderBy((a) => a.Key)
              .Select((g) => {
                return { AdminTime: g.Key, Schedules: g };
              });
            _GrpData.forEach((oItem) => {
              oItem.Schedules.forEach((_IppScheduleDet) => {
                lstDoses.Add(_IppScheduleDet.Dose.ToString());
                return;
              });
            });
          }
        }
      } else {
        SourceDataSorted = SourceData;
        nDoseCount = SourceData.Count;
        if (this.IsDaywiseView) {
          for (
            let nDoseIndex: number = 0;
            nDoseIndex < nDoseCount;
            nDoseIndex++
          ) {
            if (
              SourceData[nDoseIndex] != null &&
              SourceData[nDoseIndex].Dose > 0
            ) {
              lstDoses.Add(SourceData[nDoseIndex].Dose.ToString());
            }
          }
        } else {
          let _FirstDayDoses = SourceData.Where((i) => i.Day == 1);
          if (_FirstDayDoses != null && _FirstDayDoses.Count() > 0) {
            lstDoses = _FirstDayDoses.Select((s) => s.Dose.ToString()).ToList();
          }
        }
      }
    }
    return lstDoses;
  }
  private FlattenDoseList(
    startDTTM: DateTime,
    endDTTM: DateTime,
    IsAllowValidDose: boolean,
    lstDoses: List<String>
  ): void {
    if (
      lstDoses != null &&
      this.AdminTimeGrdData != null &&
      this.AdminTimeGrdData.Count > 1 &&
      DateTime.NotEquals(startDTTM, DateTime.MinValue) &&
      (IsAllowValidDose || lstDoses.Count < this.AdminTimeGrdData.Count)
    ) {
      let nAdminTimeCount: number = this.AdminTimeGrdData.Count;
      let lstTimeSpan: List<TimeSpan> = new List<TimeSpan>();
      for (let i: number = 0; i < nAdminTimeCount; i++) {
        let ts: TimeSpan = new TimeSpan();
        let bResult: boolean = false;
        if (
          this.IsFixedTime &&
          !String.IsNullOrEmpty(this.AdminTimeGrdData[i].FixedTimes)
        ) {
          bResult = TimeSpan.TryParse(
            this.AdminTimeGrdData[i].FixedTimes,
            (o) => {
              ts = o;
            }
          );
        } else if (
          !String.IsNullOrEmpty(this.AdminTimeGrdData[i].DruRoundTimes)
        ) {
          bResult = TimeSpan.TryParse(
            this.AdminTimeGrdData[i].DruRoundTimes,
            (o) => {
              ts = o;
            }
          );
        }
        if (bResult) {
          lstTimeSpan.Add(ts);
        }
      }
      if (lstTimeSpan.Count > 0) {
        lstTimeSpan.Sort();
        let tsTimeOfDay: TimeSpan = startDTTM.TimeOfDay;
        let _NoOfElapsedDoses: number = lstTimeSpan
          .Where((x) => x.TotalMilliseconds < tsTimeOfDay.TotalMilliseconds)
          .Count();
        if (_NoOfElapsedDoses > 0 && _NoOfElapsedDoses < lstTimeSpan.Count) {
          for (let i: number = 0; i < _NoOfElapsedDoses; i++) {
            lstDoses.Insert(0, String.Empty);
          }
        }
        if (
          DateTime.NotEquals(this.EndDate, DateTime.MinValue) &&
          DateTime.Equals(startDTTM.Date, endDTTM.Date)
        ) {
          _NoOfElapsedDoses = lstTimeSpan.Where((x) => x.TotalMilliseconds > tsTimeOfDay.TotalMilliseconds).Count();
          for (let i: number = 0; i < _NoOfElapsedDoses; i++) {
            lstDoses.Add(String.Empty);
          }
        }
      }
    }
  }
  public FetchDoseValuesFromExistChangingDose(
    SourceData: ObservableCollection<ScheduleDetailsCols>
  ): List<string> {
    let lstDoses: List<string> = new List<string>();
    if (SourceData != null && SourceData.Count > 0) {
      let _GridDaysCount: number =
        SourceData[0].ScheduleDate != null
          ? SourceData[0].ScheduleDate.length
          : 0;
      let _AdminTimesCount: number = SourceData.Count;
      if (this.IsDaywiseView) {
        for (
          let _GridDayIndex: number = 0;
          _GridDayIndex < _GridDaysCount;
          _GridDayIndex++
        ) {
          for (
            let _AdminTimeIndex: number = 0;
            _AdminTimeIndex < _AdminTimesCount;
            _AdminTimeIndex++
          ) {
            let _TmpDose: string =
              SourceData[_AdminTimeIndex].ScheduleDoseValue[_GridDayIndex];
            lstDoses.Add(_TmpDose);
          }
        }
      } else {
        for (
          let _AdminTimeIndex: number = 0;
          _AdminTimeIndex < _AdminTimesCount;
          _AdminTimeIndex++
        ) {
          let _TmpDose: string =
            SourceData[_AdminTimeIndex].ScheduleDoseValue[0];
          if (!String.IsNullOrEmpty(_TmpDose)) {
            lstDoses.Add(_TmpDose);
          }
        }
      }
    }
    return lstDoses;
  }
  public ReassignDosesForDOSorReorderOrAmend(
    ChangingDoseDetailSource: List<IPPScheduledetails>,
    lstDoses: List<string>
  ): void {
    if (
      ChangingDoseDetailSource != null &&
      ChangingDoseDetailSource.Count > 0
    ) {
      this.CheckPartiallyorDayCrossed();
      this.FillDatesForGridColumns();
      this.IntializeScheduleDetailsCols();
      lstDoses = this.FetchDoseValuesFromDOSorReorder(ChangingDoseDetailSource);
    //  this.ExistingReassignDosesFromSource(lstDoses,false);
    this.ReassignDosesFromSource(lstDoses);
      ChangingDoseDetailSource = null;
    }
  }

  private ExistingReassignDosesFromSource(SourceData: List<string>, IsEliminateElapsedDoses: boolean): void 
  {
    if (SourceData != null && SourceData.Count > 0 && this.GrdData != null && this.GrdData.Count > 0 && this.LstGridColumnsDates != null && this.LstGridColumnsDates.Count > 0) {
      var IsScheduleTimeEntryExists: boolean = false;
      if (this.GrdData.Count == 1) {
        IsScheduleTimeEntryExists = true;
      }
      else if (this.GrdData.Count > 1) {
        IsScheduleTimeEntryExists = !(this.GrdData.All(oItem => String.IsNullOrEmpty(oItem.ScheduleTime) || String.Equals(oItem.ScheduleTime, "00:00")));
      }

      let dtDoseStartDttm: DateTime = this.StartDate.ToUserDateTime();
      let dtDoseEndDttm: DateTime = this.EndDate.ToUserDateTime();
      let _AdminTimesCount: number = this.GrdData.Count;
      let _GridDaysCount: number = 0;
      if (
        this.GrdData[0].ScheduleDoseValue != null && this.GrdData[0].Scheduledoseflag != null) {
        _GridDaysCount = this.GrdData[0].ScheduleDoseValue.Length < this.LstGridColumnsDates.Count ? this.GrdData[0].ScheduleDoseValue.Length : this.LstGridColumnsDates.Count;
      }

      var nDoseIndex: number = 0, nDoseCount = SourceData.Count;
      if (this.IsDaywiseView) {
        for (var _GridDayIndex: number = 0; _GridDayIndex < _GridDaysCount; _GridDayIndex++) {
          for (var _AdminTimeIndex: number = 0; _AdminTimeIndex < _AdminTimesCount; _AdminTimeIndex++) {
            var ts: TimeSpan = new TimeSpan();
            var bResult: boolean = false;
            if (!String.IsNullOrEmpty(this.GrdData[_AdminTimeIndex].ScheduleTime)) {
              // bResult = TimeSpan.TryParse(this.GrdData[_AdminTimeIndex].ScheduleTime, ts);
              bResult = TimeSpan.TryParse(
                this.GrdData[_AdminTimeIndex].ScheduleTime,
                (o) => {
                  ts = o;
                }
              );
            }

            var dtTempScheduleDTTM: DateTime;
            if (bResult && ts != TimeSpan.Zero) {
              dtTempScheduleDTTM = this.LstGridColumnsDates[_GridDayIndex].ToUserDateTime().Date.Add(ts);
            }
            else {
              dtTempScheduleDTTM = this.LstGridColumnsDates[_GridDayIndex].ToUserDateTime();
            }

            if ((!IsScheduleTimeEntryExists
              && DateTime.GreaterThanOrEqualTo(dtTempScheduleDTTM.Date, dtDoseStartDttm.Date) &&
              DateTime.LessThanOrEqualTo(dtTempScheduleDTTM.Date, dtDoseEndDttm.Date)) ||
              (IsScheduleTimeEntryExists &&
                DateTime.GreaterThanOrEqualTo(dtTempScheduleDTTM, dtDoseStartDttm)
                && DateTime.LessThanOrEqualTo(dtTempScheduleDTTM, dtDoseEndDttm))) {
              if (!TimeZoneInfo.Local.IsInvalidTime(dtTempScheduleDTTM)) {
                if (nDoseIndex < nDoseCount) {
                  this.GrdData[_AdminTimeIndex].ScheduleDoseValue[_GridDayIndex] = SourceData[nDoseIndex];
                }
                else {
                  this.GrdData[_AdminTimeIndex].ScheduleDoseValue[_GridDayIndex] = String.Empty;
                }

                this.GrdData[_AdminTimeIndex].Scheduledoseflag[_GridDayIndex] = 
                  this.GrdData[_AdminTimeIndex].ScheduleDoseValue[_GridDayIndex] && this.GrdData[_AdminTimeIndex].ScheduleDoseValue[_GridDayIndex] != '';

                nDoseIndex++;
              }
              else {
                this.GrdData[_AdminTimeIndex].ScheduleDoseValue[_GridDayIndex] = String.Empty;
                this.GrdData[_AdminTimeIndex].Scheduledoseflag[_GridDayIndex] = false;
              }
            }
            else {
              this.GrdData[_AdminTimeIndex].ScheduleDoseValue[_GridDayIndex] = String.Empty;
              this.GrdData[_AdminTimeIndex].Scheduledoseflag[_GridDayIndex] = false;
              if (IsEliminateElapsedDoses) {
                nDoseIndex++;
              }
            }
            this.GrdData[_AdminTimeIndex].ScheduleDate[_GridDayIndex] = dtTempScheduleDTTM.ToLocalDateTime();
          }
        }
      }
      else {
        for (var _AdminTimeIndex: number = 0; _AdminTimeIndex < _AdminTimesCount; _AdminTimeIndex++) {
          if (nDoseIndex < nDoseCount && this.GrdData[_AdminTimeIndex].ScheduleDoseValue != null && this.GrdData[_AdminTimeIndex].ScheduleDoseValue.Length > 0 && this.GrdData[_AdminTimeIndex].Scheduledoseflag != null && this.GrdData[_AdminTimeIndex].Scheduledoseflag.Length > 0) {
            this.GrdData[_AdminTimeIndex].ScheduleDoseValue[0] = SourceData[nDoseIndex];
            this.GrdData[_AdminTimeIndex].Scheduledoseflag[0] = true;
            nDoseIndex++;
          }
        }
      }
    }
  }
  public ReassignDosesForStartDTTMChange(
    ChangingDoseDetailSource: ObservableCollection<ScheduleDetailsCols>,
    pDoseList: List<string>
  ): void {
    if (
      ChangingDoseDetailSource != null &&
      ChangingDoseDetailSource.Count > 0
    ) {
      this.CheckPartiallyorDayCrossed();
      this.FillDatesForGridColumns();
      this.IntializeScheduleDetailsCols();
      let lstDoses: List<string>;
      if (pDoseList != null && pDoseList.Count > 0) {
        lstDoses = pDoseList;
      } else {
        lstDoses = this.FetchDoseValuesFromExistChangingDose(
          ChangingDoseDetailSource
        );
      }
      this.ReassignDosesFromSource(lstDoses);
    }
  }
  public ReassignDosesFromSourceWithoutElapsedDoses(
    SourceData: List<string>
  ): void {
    if (
      SourceData != null &&
      SourceData.Count > 0 &&
      this.GrdData != null &&
      this.GrdData.Count > 0 &&
      this.LstGridColumnsDates != null &&
      this.LstGridColumnsDates.Count > 0
    ) {
      this.LstElaspedDoses = new List<string>();
      let IsScheduleTimeEntryExists: boolean = false;
      if (this.GrdData.Count == 1) {
        IsScheduleTimeEntryExists = true;
      } else if (this.GrdData.Count > 1) {
        IsScheduleTimeEntryExists = !this.GrdData.All(
          (oItem) =>
            String.IsNullOrEmpty(oItem.ScheduleTime) ||
            String.Equals(oItem.ScheduleTime, '00:00')
        );
      }
      let dtDoseStartDttm: DateTime = this.StartDate.ToUserDateTime();
      let dtDoseEndDttm: DateTime = this.EndDate.ToUserDateTime();
      let _AdminTimesCount: number = this.GrdData.Count;
      let _GridDaysCount: number = 0;
      if (
        this.GrdData[0].ScheduleDoseValue != null &&
        this.GrdData[0].Scheduledoseflag != null
      ) {
        _GridDaysCount =
          this.GrdData[0].ScheduleDoseValue.length <
            this.LstGridColumnsDates.Count
            ? this.GrdData[0].ScheduleDoseValue.length
            : this.LstGridColumnsDates.Count;
      }
      let nDoseIndex: number = 0,
        nDoseCount = SourceData.Count;
      if (this.IsDaywiseView) {
        for (
          let _GridDayIndex: number = 0;
          _GridDayIndex < _GridDaysCount;
          _GridDayIndex++
        ) {
          for (
            let _AdminTimeIndex: number = 0;
            _AdminTimeIndex < _AdminTimesCount;
            _AdminTimeIndex++
          ) {
            let ts: TimeSpan = new TimeSpan();
            let bResult: boolean = false;
            if (
              !String.IsNullOrEmpty(this.GrdData[_AdminTimeIndex].ScheduleTime)
            ) {
              bResult = TimeSpan.TryParse(
                this.GrdData[_AdminTimeIndex].ScheduleTime,
                (o) => {
                  ts = o;
                }
              );
            }
            let dtTempScheduleDTTM: DateTime = DateTime.MinValue;
            if (bResult && ts != TimeSpan.Zero) {
              dtTempScheduleDTTM = this.LstGridColumnsDates[_GridDayIndex]
                .ToUserDateTime()
                .DateTime.Add(ts);
            } else {
              dtTempScheduleDTTM =
                this.LstGridColumnsDates[_GridDayIndex].ToUserDateTime();
            }
            if (
              (!IsScheduleTimeEntryExists &&
                DateTime.GreaterThanOrEqualTo(dtTempScheduleDTTM.Date, dtDoseStartDttm.Date) &&
                DateTime.LessThanOrEqualTo(dtTempScheduleDTTM.Date, dtDoseEndDttm.Date)) ||
              (IsScheduleTimeEntryExists &&
                DateTime.GreaterThanOrEqualTo(dtTempScheduleDTTM, dtDoseStartDttm) &&
                DateTime.LessThanOrEqualTo(dtTempScheduleDTTM, dtDoseEndDttm))
            ) {
              if (
                !TimeZoneInfo.Local.IsInvalidTime(dtTempScheduleDTTM) &&
                nDoseIndex < nDoseCount
              ) {
                this.GrdData[_AdminTimeIndex].ScheduleDoseValue[_GridDayIndex] =
                  SourceData[nDoseIndex];
                this.GrdData[_AdminTimeIndex].Scheduledoseflag[_GridDayIndex] =
                  true;
              } else {
                this.GrdData[_AdminTimeIndex].ScheduleDoseValue[_GridDayIndex] =
                  String.Empty;
                this.GrdData[_AdminTimeIndex].Scheduledoseflag[_GridDayIndex] =
                  false;
              }
            } else {
              if (
                ((!IsScheduleTimeEntryExists &&
                  DateTime.LessThan(dtTempScheduleDTTM.Date, dtDoseStartDttm.Date)) ||
                  (IsScheduleTimeEntryExists &&
                    DateTime.LessThan(dtTempScheduleDTTM, dtDoseStartDttm)) ||
                  TimeZoneInfo.Local.IsInvalidTime(dtTempScheduleDTTM)) &&
                nDoseIndex < nDoseCount
              ) {
                this.LstElaspedDoses.Add(SourceData[nDoseIndex]);
              }
              this.GrdData[_AdminTimeIndex].ScheduleDoseValue[_GridDayIndex] =
                String.Empty;
              this.GrdData[_AdminTimeIndex].Scheduledoseflag[_GridDayIndex] =
                false;
            }
            this.GrdData[_AdminTimeIndex].ScheduleDate[_GridDayIndex] =
              dtTempScheduleDTTM.ToLocalDateTime();
            nDoseIndex++;
          }
        }
      } else {
        for (
          let _AdminTimeIndex: number = 0;
          _AdminTimeIndex < _AdminTimesCount;
          _AdminTimeIndex++
        ) {
          if (
            nDoseIndex < nDoseCount &&
            this.GrdData[_AdminTimeIndex].ScheduleDoseValue != null &&
            this.GrdData[_AdminTimeIndex].ScheduleDoseValue.length > 0 &&
            this.GrdData[_AdminTimeIndex].Scheduledoseflag != null &&
            this.GrdData[_AdminTimeIndex].Scheduledoseflag.length > 0
          ) {
            this.GrdData[_AdminTimeIndex].ScheduleDoseValue[0] =
              SourceData[nDoseIndex];
            this.GrdData[_AdminTimeIndex].Scheduledoseflag[0] = true;
            nDoseIndex++;
          }
        }
      }
    }
  }
  public GetChangingDoseDataForWSCall(
    IsFinishClicked: boolean
  ): ObservableCollection<Scheduledetails> {
    let _lstIPPScheduledetails: ObservableCollection<Scheduledetails> =
      new ObservableCollection<Scheduledetails>();
    if (IsFinishClicked) {
      if (DateTime.Equals(this.EndDate, DateTime.MinValue)) {
        this.SetEndDTTMWhenDurationNotGiven();
      }
      this.FillDatesForGridColumnsFromExistingData();
      if (!this.IsDaywiseView) {
        this.AssignDosesFromFirstToNextDays();
      }
    }
    if (this.GrdData != null && this.GrdData.Count > 0) {
      let _AdminTimesCount: number = this.GrdData.Count;
      let lstAdminTimes: List<string> = this.GrdData.Select(
        (S) => S.ScheduleTime
      )
        .Distinct()
        .ToList();
      let lstSchAdminTimes: List<string> = new List<string>();
      for (
        let _AdminTimeIndex: number = 0;
        _AdminTimeIndex < _AdminTimesCount;
        _AdminTimeIndex++
      ) {
        let _GridDaysCount: number =
          this.GrdData[_AdminTimeIndex].ScheduleDate != null
            ? this.GrdData[0].ScheduleDate.length
            : 0;
        for (
          let _GridDayIndex: number = 0;
          _GridDayIndex < _GridDaysCount;
          _GridDayIndex++
        ) {
          if (
            !String.IsNullOrEmpty(this.GrdData[_AdminTimeIndex].ScheduleTime) &&
            !String.IsNullOrEmpty(
              this.GrdData[_AdminTimeIndex].ScheduleDoseValue[_GridDayIndex]
            )
          ) {
            let nDose: number = 0;
            Number.TryParse(
              this.GrdData[_AdminTimeIndex].ScheduleDoseValue[_GridDayIndex],
              (o) => {
                nDose = o;
              }
            );
            _lstIPPScheduledetails.Add(
              ObjectHelper.CreateObject(new IPPScheduledetails(), {
                ScheduleDate:
                  this.GrdData[0].ScheduleDate[
                    _GridDayIndex
                  ].DateTime.ToUserDateTime(),
                ScheduledTime: this.GrdData[_AdminTimeIndex].ScheduleTime,
                Dose: nDose,
                DosewithUOM: this.DoseUOMValue,
              })
            );
          }
        }
      }
      if (_lstIPPScheduledetails != null && _lstIPPScheduledetails.Count > 0) {
        lstSchAdminTimes = _lstIPPScheduledetails
          .Select((C) => C.ScheduledTime)
          .Distinct()
          .ToList();
        if (
          lstAdminTimes != null &&
          lstAdminTimes.Count > 0 &&
          lstSchAdminTimes != null &&
          lstSchAdminTimes.Count > 0 &&
          lstAdminTimes.Count != lstSchAdminTimes.Count
        ) {
          let SchdleDateTime: DateTime = _lstIPPScheduledetails
            .Select(
              (D) =>
                ObjectHelper.CreateType<IPPScheduledetails>(
                  D,
                  IPPScheduledetails
                ).ScheduleDate
            )
            .FirstOrDefault();
          let lstExcludeAdminTimes: List<string> = lstAdminTimes
            .Except(lstSchAdminTimes)
            .ToList();
          lstExcludeAdminTimes.forEach((Str) => {
            _lstIPPScheduledetails.Add(
              ObjectHelper.CreateObject(new IPPScheduledetails(), {
                ScheduleDate: SchdleDateTime,
                ScheduledTime: Str,
                Dose: 0,
                DosewithUOM: String.Empty,
              })
            );
          });
        }
      }
    }
    return _lstIPPScheduledetails;
  }
  public IsAllDoseValuesSame(out1: (FirstDose: string) => void): boolean {
    let FirstDose: string;

    let bReturnValue: boolean = true;
    FirstDose = String.Empty;
    if (this.GrdData != null && this.GrdData.Count > 0) {
      if (this.IsDaywiseView) {
        let AdminTimeCount: number = this.GrdData.Count;
        for (
          let AdminTimeIdx: number = 0;
          AdminTimeIdx < AdminTimeCount;
          AdminTimeIdx++
        ) {
          if (
            this.GrdData[AdminTimeIdx].ScheduleDoseValue != null &&
            this.GrdData[AdminTimeIdx].ScheduleDoseValue.length > 0
          ) {
            let DoseCount: number =
              this.GrdData[AdminTimeIdx].ScheduleDoseValue.length;
            for (let DoseIdx: number = 0; DoseIdx < DoseCount; DoseIdx++) {
              if (
                !String.IsNullOrEmpty(
                  this.GrdData[AdminTimeIdx].ScheduleDoseValue[DoseIdx]
                )
              ) {
                if (String.IsNullOrEmpty(FirstDose)) {
                  FirstDose =
                    this.GrdData[AdminTimeIdx].ScheduleDoseValue[DoseIdx];
                  if (
                    AdminTimeCount > 1 &&
                    DoseCount > 1 &&
                    AdminTimeIdx == AdminTimeCount - 1 &&
                    DoseIdx == DoseCount - 1
                  ) {
                    bReturnValue = false;
                  }
                } else if (
                  !String.Equals(
                    FirstDose,
                    this.GrdData[AdminTimeIdx].ScheduleDoseValue[DoseIdx],
                    StringComparison.InvariantCultureIgnoreCase
                  )
                ) {
                  bReturnValue = false;
                  break;
                }
              } else if (
                !String.IsNullOrEmpty(FirstDose) &&
                this.GrdData[AdminTimeIdx].Scheduledoseflag[DoseIdx]
              ) {
                bReturnValue = false;
                break;
              }
            }
          }
          if (!bReturnValue) break;
        }
      } else {
        let _AdminTimesCount: number = this.GrdData.Count;
        for (
          let _AdminTimeIndex: number = 0;
          _AdminTimeIndex < _AdminTimesCount;
          _AdminTimeIndex++
        ) {
          if (
            this.GrdData[_AdminTimeIndex].ScheduleDoseValue != null &&
            this.GrdData[_AdminTimeIndex].ScheduleDoseValue.length > 0
          ) {
            if (
              !String.IsNullOrEmpty(
                this.GrdData[_AdminTimeIndex].ScheduleDoseValue[0]
              )
            ) {
              if (String.IsNullOrEmpty(FirstDose)) {
                FirstDose = this.GrdData[_AdminTimeIndex].ScheduleDoseValue[0];
              } else if (
                !String.Equals(
                  FirstDose,
                  this.GrdData[_AdminTimeIndex].ScheduleDoseValue[0],
                  StringComparison.InvariantCultureIgnoreCase
                )
              ) {
                bReturnValue = false;
                break;
              }
            }
          }
        }
      }
    }
    if (String.IsNullOrEmpty(FirstDose)) {
      this.DoseValuesKind = eDoseValuesKind.AllValuesEmpty;
    } else if (bReturnValue) {
      this.DoseValuesKind = eDoseValuesKind.AllValuesSame;
    } else {
      this.DoseValuesKind = eDoseValuesKind.DifferentValues;
    }
    out1(FirstDose);
    return bReturnValue;
  }
}
