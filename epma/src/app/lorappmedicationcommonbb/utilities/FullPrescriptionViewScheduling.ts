import { Component, OnInit } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, ObservableCollection, List } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService } from '../../shared/epma-platform/soap-client/helper.service';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { MultipleDoseDetail } from 'src/app/lorappmanageprescriptionbbui/viewmodel/MultipleDoseDetail';
import { ConstDurationUOM } from './constants';
import { MezzanineSize, ScheduleDetailsSteppedVM } from '../viewmodel/scheduledetailsvm';
import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { GrdAdminstrativeTimesCols, ScheduleDetailsCols } from '../viewmodel/prescriptionitemdetailsvm';

export class FullPrescriptionViewScheduling {
    private FlattenScheduleDetailCols(objMultiDoseDtls: ObservableCollection<MultipleDoseDetail>, dtFromDate: DateTime, dtToDate: DateTime): List<DateTime> {
        let nRowCount: number = objMultiDoseDtls.Count;
        let dtMinValue: DateTime = DateTime.MinValue;
        let tmpslotDatesColl: List<DateTime> = new List<DateTime>();
        for (let nRow: number = 0; nRow < nRowCount; nRow++) {
            let objMultipleDoseDetail: MultipleDoseDetail = objMultiDoseDtls[nRow];
            dtMinValue = (DateTime.NotEquals(dtMinValue, DateTime.MinValue) && DateTime.LessThan(dtMinValue, objMultipleDoseDetail.StartDTTM)) ? dtMinValue : objMultipleDoseDetail.StartDTTM;
            let durationUOM: string = String.Empty;
            if (objMultipleDoseDetail.DurationUOM != null) {
                durationUOM = objMultipleDoseDetail.DurationUOM.Value;
            }
            if (objMultipleDoseDetail.Duration == 0 && DateTime.NotEquals(objMultipleDoseDetail.EndDTTM, DateTime.MinValue)) {
                objMultipleDoseDetail.Duration = objMultipleDoseDetail.EndDTTM.Subtract(objMultipleDoseDetail.StartDTTM).TotalMinutes + 1;
                durationUOM = ConstDurationUOM.Minutes;
            }
            else if (objMultipleDoseDetail.Duration == 0 && DateTime.Equals(objMultipleDoseDetail.EndDTTM, DateTime.MinValue)) {
                objMultipleDoseDetail.EndDTTM = (DateTime.Equals(objMultipleDoseDetail.EndDTTM, DateTime.MinValue)) ? dtToDate : objMultipleDoseDetail.EndDTTM;
            }
            if (objMultipleDoseDetail.AdminTimesData == null && objMultipleDoseDetail.oAdminTimesVM != null && objMultipleDoseDetail.oAdminTimesVM.GrdData != null) {
                objMultipleDoseDetail.AdminTimesData = objMultipleDoseDetail.oAdminTimesVM.GrdData;
            }
            if (objMultipleDoseDetail.FreqDetails == null && objMultipleDoseDetail.oAdminTimesVM != null && objMultipleDoseDetail.oAdminTimesVM.FreqDetails != null) {
                objMultipleDoseDetail.FreqDetails = objMultipleDoseDetail.oAdminTimesVM.FreqDetails;
            }
            if (!objMultipleDoseDetail.IsDaywiseView) {
                let ScheduleDetails: ScheduleDetailsSteppedVM = null;
                if (objMultipleDoseDetail.ScheduleDetailsData != null && objMultipleDoseDetail.ScheduleDetailsData.Count > 0 && objMultipleDoseDetail.LowerDose <= 0 && objMultipleDoseDetail.UpperDose <= 0) {
                    ScheduleDetails = ObjectHelper.CreateObject(new ScheduleDetailsSteppedVM(), {
                        GrdData: objMultipleDoseDetail.ScheduleDetailsData,
                        DurationValue: objMultipleDoseDetail.Duration,
                        DurationUOM: durationUOM,
                        StartDate: objMultipleDoseDetail.StartDTTM,
                        EndDate: objMultipleDoseDetail.EndDTTM,
                        IsDaywiseView: objMultipleDoseDetail.IsDaywiseView,
                        FreqDetails: objMultipleDoseDetail.FreqDetails != null ? objMultipleDoseDetail.FreqDetails : null,
                        AdminTimeGrdData: objMultipleDoseDetail.AdminTimesData,
                        IsReadOnly: true,
                        IsGridLinkClicked: true,
                        PresType: PatientContext.PrescriptionType,
                        IsFixedTime: objMultipleDoseDetail.IsfixedTime,
                        ChangingDoseMezzanineSize: MezzanineSize.Expanded,
                        IsClearEnabled: false
                    });
                }
                else {
                    ScheduleDetails = ObjectHelper.CreateObject(new ScheduleDetailsSteppedVM(), {
                        DoseUOM: (objMultipleDoseDetail.DoseUOM != null) ? objMultipleDoseDetail.DoseUOM.DisplayText : String.Empty,
                        DoseValue: objMultipleDoseDetail.DoseValueDisplay,
                        StartDate: objMultipleDoseDetail.StartDTTM,
                        DurationValue: objMultipleDoseDetail.Duration,
                        DurationUOM: durationUOM,
                        EndDate: objMultipleDoseDetail.EndDTTM,
                        AdminTimeGrdData: objMultipleDoseDetail.AdminTimesData,
                        FreqDetails: objMultipleDoseDetail.FreqDetails != null ? objMultipleDoseDetail.FreqDetails : null,
                        IsFixedTime: (objMultipleDoseDetail.AdminTimesData != null && objMultipleDoseDetail.AdminTimesData.Count > 0 && String.Equals(objMultipleDoseDetail.AdminTimesData[0].FrequencyType, "CC_PERIOD")) ? (String.Equals(objMultipleDoseDetail.SlotTimeMode, 'F') ? true : false) : true,
                        IsDaywiseView: objMultipleDoseDetail.IsDaywiseView,
                        PresType: PatientContext.PrescriptionType
                    });
                }
                ScheduleDetails.LoadData();
                ScheduleDetails.IsDaywiseViewClicked = true;
                ScheduleDetails.FillDatesForGridColumnsFromExistingData();
                ScheduleDetails.AssignDosesFromFirstToNextDays();
                objMultipleDoseDetail.ScheduleDetailsData = new ObservableCollection<ScheduleDetailsCols>(ScheduleDetails.GrdData.OrderBy(oItem => oItem.ScheduleDTTM));
            }
        }
        let dtTmpDate: DateTime = dtFromDate.Date;
        while (DateTime.LessThanOrEqualTo(dtTmpDate.Date, dtToDate.Date)) {
            tmpslotDatesColl.Add(dtTmpDate);
            dtTmpDate = dtTmpDate.AddDays(1);
        }
        return tmpslotDatesColl.OrderBy(x => x).ToList();
    }
    private DeepCopyMultiDoseDtlObject(objRowData: MultipleDoseDetail): MultipleDoseDetail {
        let objMultiDoseDtl: MultipleDoseDetail = ObjectHelper.CreateObject(new MultipleDoseDetail(), {
            AdministrationTimes: objRowData.AdministrationTimes,
            AdminTimesData: (objRowData.AdminTimesData != null) ? new ObservableCollection<GrdAdminstrativeTimesCols>(objRowData.AdminTimesData) : null,
            DaysOfWeek: objRowData.DaysOfWeek,
            Direction: objRowData.Direction,
            DoseInstructions: objRowData.DoseInstructions,
            DoseUOM: objRowData.DoseUOM,
            DoseValueDisplay: objRowData.DoseValueDisplay,
            Duration: objRowData.Duration,
            DurationUOM: objRowData.DurationUOM,
            DurationValueDisplay: objRowData.DurationValueDisplay,
            EndDTTM: objRowData.EndDTTM,
            FreqDetails: objRowData.FreqDetails,
            Frequency: objRowData.Frequency,
            HyperlinkText: objRowData.HyperlinkText,
            InfrateDenominatoruom: objRowData.InfrateDenominatoruom,
            Infratenumeratoruom: objRowData.Infratenumeratoruom,
            InfusionRate: objRowData.InfusionRate,
            InfusionUpperrate: objRowData.InfusionUpperrate,
            IsDaywiseView: objRowData.IsDaywiseView,
            IsfixedTime: String.Equals(objRowData.SlotTimeMode, 'F') ? true : false,
            IsHyperLink: objRowData.IsHyperLink,
            IsPRN: objRowData.IsPRN,
            LowerDose: objRowData.LowerDose,
            oAdminTimesVM: objRowData.oAdminTimesVM,
            PresType: objRowData.PresType,
            sceduledTimelst: (objRowData.sceduledTimelst != null) ? new List<string>(objRowData.sceduledTimelst) : null,
            ScheduleDetailsData: (objRowData.ScheduleDetailsData != null) ? new ObservableCollection<ScheduleDetailsCols>(objRowData.ScheduleDetailsData) : null,
            SlotTimeMode: objRowData.SlotTimeMode,
            StartDTTM: objRowData.StartDTTM,
            TotalCols: objRowData.TotalCols,
            UpperDose: objRowData.UpperDose
        });
        if (objMultiDoseDtl != null && objMultiDoseDtl.ScheduleDetailsData != null && objMultiDoseDtl.ScheduleDetailsData.Count > 0) {
            for (let dtCount: number = 0; dtCount < objMultiDoseDtl.ScheduleDetailsData.Count; dtCount++) {
                objMultiDoseDtl.ScheduleDetailsData[dtCount] = objRowData.ScheduleDetailsData[dtCount].GetCloneObject();
            }
        }
        return objMultiDoseDtl;
    }
    public ExtractCombinedScheduleDetails(dtFromDt: DateTime, dtToDate: DateTime, objMultipleDoseDtls: ObservableCollection<MultipleDoseDetail>): ObservableCollection<ScheduleDetailsCols> {
        let objCombinedSchedules: ObservableCollection<ScheduleDetailsCols> = new ObservableCollection<ScheduleDetailsCols>();
        if (objMultipleDoseDtls != null && objMultipleDoseDtls.Count > 0) {
            let objMultiDoseDtls: ObservableCollection<MultipleDoseDetail> = new ObservableCollection<MultipleDoseDetail>();
            let nRowCount: number = objMultipleDoseDtls.Count;
            let flg=false;
            for (let nRow: number = 0; nRow < nRowCount; nRow++) {
                let objRowData: MultipleDoseDetail = objMultipleDoseDtls[nRow];
                let objMultipleDoseDetail: MultipleDoseDetail = this.DeepCopyMultiDoseDtlObject(objRowData);
                if (DateTime.NotEquals(dtFromDt, DateTime.MinValue) && DateTime.NotEquals(dtToDate, DateTime.MinValue)) {
                    if (DateTime.LessThanOrEqualTo(objMultipleDoseDetail.StartDTTM.Date, dtToDate) && (DateTime.GreaterThanOrEqualTo(objMultipleDoseDetail.EndDTTM.Date, dtFromDt.Date) || DateTime.Equals(objMultipleDoseDetail.EndDTTM, DateTime.MinValue))) {
                        objMultiDoseDtls.Add(objMultipleDoseDetail);
                    }
                }
                else {
                    objMultiDoseDtls.Add(objMultipleDoseDetail);
                }
            }

            let OverAllSchedules: ScheduleDetailsSteppedVM = new ScheduleDetailsSteppedVM();
            let slotDatesCollection: List<DateTime> = this.FlattenScheduleDetailCols(objMultiDoseDtls, dtFromDt, dtToDate);
            nRowCount = objMultiDoseDtls.Count;
            for (let nRow: number = 0; nRow < nRowCount; (nRow++)) {
                let objMultipleDoseDetail: MultipleDoseDetail = objMultiDoseDtls[nRow];
                let durationUOM: string = String.Empty;
                if (objMultipleDoseDetail.DurationUOM != null) {
                    durationUOM = objMultipleDoseDetail.DurationUOM.Value;
                }
                if (objMultipleDoseDetail != null && objMultipleDoseDetail.ScheduleDetailsData != null && objMultipleDoseDetail.ScheduleDetailsData.Count > 0) {
                    for (let dtCount: number = 0; dtCount < objMultipleDoseDetail.ScheduleDetailsData.Count; (dtCount++)) {
                        let dtArray: List<DateTime> = new List<DateTime>();
                        let stArray: List<string> = new List<string>();
                        let blArray: List<boolean> = new List<boolean>();
                        let doseUomArray: List<string> = new List<string>();
                        flg=true;
                        let objMatchingSchedule = (OverAllSchedules.GrdData != null) ? OverAllSchedules.GrdData.Where(x => DateTime.Equals(x.ScheduleTime, objMultipleDoseDetail.ScheduleDetailsData[dtCount].ScheduleTime)).FirstOrDefault() : null;
                        slotDatesCollection.forEach((dtCurr) => {
                            let index: number = Array.IndexOf(objMultipleDoseDetail.ScheduleDetailsData[dtCount].ScheduleDate, objMultipleDoseDetail.ScheduleDetailsData[dtCount].ScheduleDate.Where(x => DateTime.Equals(x?.Date, dtCurr)).FirstOrDefault());
			    //54539 fix
                             if( objMultipleDoseDetail.ScheduleDetailsData[dtCount].ScheduleDate[index] != null)
                             {
                            if (index >= 0 && DateTime.Equals(objMultipleDoseDetail.ScheduleDetailsData[dtCount].ScheduleDate[index].Date, dtCurr.Date)) {
                                dtArray.Add(objMultipleDoseDetail.ScheduleDetailsData[dtCount].ScheduleDate[index]);
                            }
                                if (objMultipleDoseDetail.ScheduleDetailsData[dtCount].ScheduleDoseValue[index] != null && objMultipleDoseDetail.ScheduleDetailsData[dtCount].ScheduleDoseValue[index].toString().length > 0) {
                                    //Below fix of 51114 reverted for 54788 fix
									//if(Number(objMultipleDoseDetail.ScheduleDetailsData[dtCount].ScheduleDoseValue[index])&& !String.IsNullOrEmpty(objMultipleDoseDetail.ScheduleDetailsData[dtCount].ScheduleDoseValue[index]) && objMultipleDoseDetail.ScheduleDetailsData[dtCount].ScheduleDoseUOMs != null) {
                                     //   objMultipleDoseDetail.ScheduleDetailsData[dtCount].ScheduleDoseValue[index] =  Convert.ToString(objMultipleDoseDetail.ScheduleDetailsData[dtCount].ScheduleDoseValue[index]) +
                                    //    ' ' + objMultipleDoseDetail.ScheduleDetailsData[dtCount].ScheduleDoseUOMs[index];
                                    //}
                                    stArray.Add(objMultipleDoseDetail.ScheduleDetailsData[dtCount].ScheduleDoseValue[index]);
                                    if (objMultipleDoseDetail.ScheduleDetailsData[dtCount].ScheduleDoseUOMs != null && objMultipleDoseDetail.ScheduleDetailsData[dtCount].ScheduleDoseUOMs.length > (index) && objMultipleDoseDetail.ScheduleDetailsData[dtCount].ScheduleDoseUOMs[index] != null && objMultipleDoseDetail.ScheduleDetailsData[dtCount].ScheduleDoseUOMs[index].toString().length > 0) {
                                        if (!(objMultipleDoseDetail.ScheduleDetailsData[dtCount].ScheduleDoseValue[index].toString().indexOf(objMultipleDoseDetail.ScheduleDetailsData[dtCount].ScheduleDoseUOMs[index].trim()) > 0))
                                            doseUomArray.Add(objMultipleDoseDetail.ScheduleDetailsData[dtCount].ScheduleDoseUOMs[index]);
                                        //54626 to show UOM
                                        else 
                                            doseUomArray.Add("");
                                        
                                    }
                                    else {
                                        if (typeof objMultipleDoseDetail.ScheduleDetailsData[dtCount].ScheduleDoseUOM !== 'undefined') {
                                            if (!(objMultipleDoseDetail.ScheduleDetailsData[dtCount].ScheduleDoseValue[index].toString().indexOf(objMultipleDoseDetail.ScheduleDetailsData[dtCount].ScheduleDoseUOM.trim()) > 0))
                                                doseUomArray.Add(objMultipleDoseDetail.ScheduleDetailsData[dtCount].ScheduleDoseUOM);
                                        }
                                        else {
                                            doseUomArray.Add("");
                                        }
                                    }
                                    if (objMultipleDoseDetail.ScheduleDetailsData[dtCount].Scheduledoseflag != null && objMultipleDoseDetail.ScheduleDetailsData[dtCount].Scheduledoseflag.length > (index) && objMultipleDoseDetail.ScheduleDetailsData[dtCount].Scheduledoseflag[index] != null) {
                                        blArray.Add(objMultipleDoseDetail.ScheduleDetailsData[dtCount].Scheduledoseflag[index]);
                                    }
                                    else {
                                        blArray.Add(true);
                                    }
                                }
                                else {
                                    if (objMatchingSchedule != null) {
                                        let indxExisting: number = Array.IndexOf(objMatchingSchedule.ScheduleDate, objMatchingSchedule.ScheduleDate.Where(x => DateTime.Equals(x.Date, dtCurr)).FirstOrDefault());
                                        if (indxExisting >= 0) {
                                            blArray.Add(objMatchingSchedule.Scheduledoseflag[indxExisting]);
                                            stArray.Add(objMatchingSchedule.ScheduleDoseValue[indxExisting]);
                                            doseUomArray.Add(objMatchingSchedule.ScheduleDoseUOMs[indxExisting]);
                                        }
                                        else {
                                            doseUomArray.Add("");
                                            stArray.Add("");
                                            blArray.Add(false);
                                        }
                                    }
                                    else {
                                        doseUomArray.Add("");
                                        stArray.Add("");
                                        blArray.Add(false);
                                    }
                                }
                            }
                            else {
                                if (objMatchingSchedule != null) {
                                    let indxExisting: number = Array.IndexOf(objMatchingSchedule.ScheduleDate, objMatchingSchedule.ScheduleDate.Where(x => DateTime.Equals(x.Date, dtCurr)).FirstOrDefault());
                                    if (indxExisting >= 0) {
                                        blArray.Add(objMatchingSchedule.Scheduledoseflag[indxExisting]);
                                        dtArray.Add(objMatchingSchedule.ScheduleDate[indxExisting]);
                                        stArray.Add(objMatchingSchedule.ScheduleDoseValue[indxExisting]);
                                        doseUomArray.Add(objMatchingSchedule.ScheduleDoseUOMs[indxExisting]);
                                    }
                                }
                                else {
                                    blArray.Add(false);
                                    dtArray.Add(dtCurr);
                                    stArray.Add(String.Empty);
                                    doseUomArray.Add(String.Empty);
                                }
                            }
                        });
                        if (objMatchingSchedule != null) {
                            objMatchingSchedule.ScheduleDate = dtArray.ToArray();
                            objMatchingSchedule.ScheduleDoseValue = stArray.ToArray();
                            objMatchingSchedule.Scheduledoseflag = blArray.ToArray();
                            objMatchingSchedule.ScheduleDoseUOMs = doseUomArray.ToArray();
                        }
                        else {
                            objMultipleDoseDetail.ScheduleDetailsData[dtCount].ScheduleDate = dtArray.ToArray();
                            objMultipleDoseDetail.ScheduleDetailsData[dtCount].ScheduleDoseValue = stArray.ToArray();
                            objMultipleDoseDetail.ScheduleDetailsData[dtCount].Scheduledoseflag = blArray.ToArray();
                            objMultipleDoseDetail.ScheduleDetailsData[dtCount].ScheduleDoseUOMs = doseUomArray.ToArray();
                        }
                    }
                    if (nRow == 0 && flg==false) {
                        OverAllSchedules.GrdData = objMultipleDoseDetail.ScheduleDetailsData;
                        OverAllSchedules.DurationValue = objMultipleDoseDetail.Duration;
                        OverAllSchedules.DurationUOM = durationUOM;
                        OverAllSchedules.StartDate = objMultipleDoseDetail.StartDTTM;
                        OverAllSchedules.EndDate = objMultipleDoseDetail.EndDTTM;
                        OverAllSchedules.IsDaywiseView = true;
                        OverAllSchedules.FreqDetails = objMultipleDoseDetail.FreqDetails != null ? objMultipleDoseDetail.FreqDetails : null;
                        OverAllSchedules.AdminTimeGrdData = objMultipleDoseDetail.AdminTimesData;
                        OverAllSchedules.IsReadOnly = true;
                        OverAllSchedules.IsGridLinkClicked = false;
                        OverAllSchedules.PresType = PatientContext.PrescriptionType;
                        OverAllSchedules.IsFixedTime = objMultipleDoseDetail.IsfixedTime;
                    }
                    else {
                        OverAllSchedules.EndDate = objMultipleDoseDetail.EndDTTM;
                        for (let iSchCnt: number = 0; iSchCnt < objMultipleDoseDetail.ScheduleDetailsData.Count; iSchCnt++) {
                            let objMatchingSchedule = OverAllSchedules.GrdData.Where(x => x.ScheduleTime == objMultipleDoseDetail.ScheduleDetailsData[iSchCnt].ScheduleTime).FirstOrDefault();
                            if (objMatchingSchedule == null) {
                                OverAllSchedules.GrdData.Add(objMultipleDoseDetail.ScheduleDetailsData[iSchCnt]);
                            }
                        }
                    }
                }
            }
            if (OverAllSchedules.GrdData != null)
                objCombinedSchedules = new ObservableCollection<ScheduleDetailsCols>(OverAllSchedules.GrdData.OrderBy(x => x.ScheduleTime));
        }
        return objCombinedSchedules;
    }
}
