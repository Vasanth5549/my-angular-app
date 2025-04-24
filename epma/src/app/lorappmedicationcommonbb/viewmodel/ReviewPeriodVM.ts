import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, ProcessRTE} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, ObservableCollection ,CListItem, List, RTEEventargs} from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { CConstants, DoseTypeCode, InfusionTypeCode, ValueDomain, ValueSet } from '../utilities/constants';
import * as IPPMAManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { CValuesetTerm } from 'src/app/shared/epma-platform/soap-client/CReferenceWS';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { AdminstrativeTimesVM } from './adminstrativetimesvm';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { MedicationCommonBB } from '../utilities/medicationcommonbb';
import { ReviewAfterUOMListConceptCodeData } from '../utilities/profiledata';
import { Dictionary } from 'epma-platform/dictionary';
    export class ReviewPeriodVM extends ViewModelBase {
        public oAdminTimesVM: AdminstrativeTimesVM;
        oManageReviewPeriod: IPPMAManagePrescSer.ManageReviewPeriod;
        oReviewAfterDetail: IPPMAManagePrescSer.ReviewAfterDetail;
        public oFrequencyDetails: IPPMAManagePrescSer.IPPFrequency;
        public scheduletimes: ObservableCollection<IPPMAManagePrescSer.IPPScheduledetails>;
        public ReviewAfterConceptcodes: ObservableCollection<CValuesetTerm>;
        constructor() {
            super();
            this.GetDomainCombo();
        }
        private _ParentDTTM: DateTime = DateTime.MinValue;
        public get ParentDTTM(): DateTime{
            return this._ParentDTTM;
        }
        public set ParentDTTM(value: DateTime) {
            if (value != this._ParentDTTM) {
                this._ParentDTTM = value;
               //NotifyPropertyChanged("ParentDTTM");
            }
        }
        private _ReviewafterUOM: CListItem;
        public get ReviewafterUOM(): CListItem {
            return this._ReviewafterUOM;
        }
        public set ReviewafterUOM(value: CListItem) {
            if (value != this._ReviewafterUOM) {
                this._ReviewafterUOM = value;
               //NotifyPropertyChanged("ReviewafterUOM");
                this.GetreviewDate();
            }
        }
        private _TempReviewafterUOM: CListItem;
        public get TempReviewafterUOM(): CListItem {
            return this._TempReviewafterUOM;
        }
        public set TempReviewafterUOM(value: CListItem) {
            if (value != this._TempReviewafterUOM) {
                this._TempReviewafterUOM = value;
               //NotifyPropertyChanged("TempReviewafterUOM");
            }
        }
        private _reviewafter: string;
        public get ReviewAfter(): string {
            return this._reviewafter;
        }
        public set ReviewAfter(value: string) {
            if (!String.Equals(this._reviewafter, value)) {
                this._reviewafter = value;
               //NotifyPropertyChanged("ReviewAfter");
                this.GetreviewDate();
            }
        }
        private _revieComments: string;
        public get Reviewcomments(): string {
            return this._revieComments;
        }
        public set Reviewcomments(value: string) {
            if (!String.Equals(this._revieComments, value)) {
                this._revieComments = value;
               //NotifyPropertyChanged("Reviewcomments");
                this.GetreviewDate();
            }
        }
        public ReviewAfterDTTM: DateTime = DateTime.MinValue;
        private _ReviewAfterDateTime: string;
        public get ReviewAfterDateTime(): string {
            return this._ReviewAfterDateTime;
        }
        public set ReviewAfterDateTime(value: string) {
            if (!String.Equals(this._ReviewAfterDateTime, value)) {
                this._ReviewAfterDateTime = value;
            }
           //NotifyPropertyChanged("ReviewAfterDateTime");
        }
        public FrequencyOID: number = 0;
        public PrescriptionItemOID: number = 0;
        public PrescriptionItemStatus: string;
        public CACode: string;
        private _StartPrescriptionTime: DateTime = DateTime.MinValue;
        public get StartPrescriptionTime(): DateTime{
            return this._StartPrescriptionTime;
        }
        public set StartPrescriptionTime(value: DateTime) {
            if (value != this._StartPrescriptionTime) {
                this._StartPrescriptionTime = value;
               //NotifyPropertyChanged("StartPrescriptionTime");
            }
        }
        private _PrescriptionEndTime: DateTime = DateTime.MinValue;
        public get PrescriptionEndTime(): DateTime{
            return this._PrescriptionEndTime;
        }
        public set PrescriptionEndTime(value: DateTime) {
            if (value != this._PrescriptionEndTime) {
                this._PrescriptionEndTime = value;
               //NotifyPropertyChanged("PrescriptionEndTime");
            }
        }
        private _StopDTTMThruDuration: DateTime = DateTime.MinValue;
        public get StopDTTMThruDuration(): DateTime{
            return this._StopDTTMThruDuration;
        }
        public set StopDTTMThruDuration(value: DateTime) {
            if (value != this._StopDTTMThruDuration) {
                this._StopDTTMThruDuration = value;
               //NotifyPropertyChanged("StopDTTMThruDuration");
            }
        }
        private _StopDTTMThruInfusionPeriod: DateTime = DateTime.MinValue;
        public get StopDTTMThruInfusionPeriod(): DateTime{
            return this._StopDTTMThruInfusionPeriod;
        }
        public set StopDTTMThruInfusionPeriod(value: DateTime) {
            if (value != this._StopDTTMThruInfusionPeriod) {
                this._StopDTTMThruInfusionPeriod = value;
               //NotifyPropertyChanged("StopDTTMThruInfusionPeriod");
            }
        }
        public GetStopDTTMThruInfusionPeriod(): void {
            let localInfusionPeriodDTTM: DateTime= DateTime.MinValue;
            this.StopDTTMThruInfusionPeriod = DateTime.MinValue;
            let FInfusion: number = 0;
            Number.TryParse(this.InfusionPeriod, (o) => FInfusion = o );
            if (DateTime.NotEquals(this.StartPrescriptionTime, DateTime.MinValue) && FInfusion > 0 && !String.IsNullOrEmpty(this.InfusionPeriodUOM)) {
                switch (this.InfusionPeriodUOM) {
                    case "minute":
                        localInfusionPeriodDTTM = this.StartPrescriptionTime.AddMinutes(Convert.ToDouble(this.InfusionPeriod));
                        break;
                    case "hour":
                        localInfusionPeriodDTTM = this.StartPrescriptionTime.AddHours(Convert.ToDouble(this.InfusionPeriod));
                        break;
                    case "day":
                        localInfusionPeriodDTTM = this.StartPrescriptionTime.AddDays(Convert.ToDouble(this.InfusionPeriod));
                        break;
                    case "week":
                        localInfusionPeriodDTTM = this.StartPrescriptionTime.AddDays(Convert.ToDouble(this.InfusionPeriod) * 7);
                        break;
                    case "month":
                        localInfusionPeriodDTTM = this.StartPrescriptionTime.AddMonths(Convert.ToInt32(this.InfusionPeriod));
                        break;
                    case "year":
                        localInfusionPeriodDTTM = this.StartPrescriptionTime.AddYears(Convert.ToInt32(this.InfusionPeriod));
                        break;
                }
                this.StopDTTMThruInfusionPeriod = localInfusionPeriodDTTM;
            }
        }
        public GetStopDTTMThruDuration(): void {
            let localDurationDTTM: DateTime= DateTime.MinValue;
            this.StopDTTMThruDuration = DateTime.MinValue;
            if (DateTime.NotEquals(this.StartPrescriptionTime, DateTime.MinValue) && this.Duration != 0) {
                switch (this.DurationUOM) {
                    case "CC_MINUTES":
                        localDurationDTTM = this.StartPrescriptionTime.AddMinutes(Convert.ToDouble(this.Duration));
                        break;
                }
                this.StopDTTMThruDuration = localDurationDTTM;
            }
        }
        private _ReviewAfterUOMList: ObservableCollection<CListItem>;
        public get ReviewAfterUOMList(): ObservableCollection<CListItem> {
            return this._ReviewAfterUOMList;
        }
        public set ReviewAfterUOMList(value: ObservableCollection<CListItem>) {
            if (this._ReviewAfterUOMList != value) {
                this._ReviewAfterUOMList = value;
               //super.NotifyPropertyChanged("ReviewAfterUOMList");
            }
        }
        private _focusControl: string;
        public get FocusControl(): string {
            return this._focusControl;
        }
        public set FocusControl(value: string) {
            if (this._focusControl != value) {
                this._focusControl = value;
               //super.NotifyPropertyChanged("FocusControl");
            }
        }
        private _Duration: number = 0;
        public get Duration(): number {
            return this._Duration;
        }
        public set Duration(value: number) {
            if (this._Duration != value) {
                this._Duration = value;
               //super.NotifyPropertyChanged("Duration");
            }
        }
        private _DurationUOM: string;
        public get DurationUOM(): string {
            return this._DurationUOM;
        }
        public set DurationUOM(value: string) {
            if (this._DurationUOM != value) {
                this._DurationUOM = value;
               //super.NotifyPropertyChanged("DurationUOM");
            }
        }
        private _InfusionPeriod: string;
        public get InfusionPeriod(): string {
            return this._InfusionPeriod;
        }
        public set InfusionPeriod(value: string) {
            if (this._InfusionPeriod != value) {
                this._InfusionPeriod = value;
               //super.NotifyPropertyChanged("InfusionPeriod");
            }
        }
        private _InfusionPeriodUOM: string;
        public get InfusionPeriodUOM(): string {
            return this._InfusionPeriodUOM;
        }
        public set InfusionPeriodUOM(value: string) {
            if (this._InfusionPeriodUOM != value) {
                this._InfusionPeriodUOM = value;
               //super.NotifyPropertyChanged("InfusionPeriodUOM");
            }
        }
        private _DoseType: string;
        public get DoseType(): string {
            return this._DoseType;
        }
        public set DoseType(value: string) {
            if (this._DoseType != value) {
                this._DoseType = value;
               //super.NotifyPropertyChanged("DoseType");
            }
        }
        private _IsInfusion: boolean = false;
        public get IsInfusion(): boolean {
            return this._IsInfusion;
        }
        public set IsInfusion(value: boolean) {
            if (this._IsInfusion != value) {
                this._IsInfusion = value;
               //super.NotifyPropertyChanged("IsInfusion");
            }
        }
        private _Route: string;
        public get Route(): string {
            return this._Route;
        }
        public set Route(value: string) {
            if (this._Route != value) {
                this._Route = value;
               //super.NotifyPropertyChanged("Route");
            }
        }
        private _IsPRN: boolean = false;
        public get IsPRN(): boolean {
            return this._IsPRN;
        }
        public set IsPRN(value: boolean) {
            if (this._IsPRN != value) {
                this._IsPRN = value;
               //super.NotifyPropertyChanged("IsPRN");
            }
        }
        private _InfusionType: string;
        public get InfusionType(): string {
            return this._InfusionType;
        }
        public set InfusionType(value: string) {
            if (this._InfusionType != value) {
                this._InfusionType = value;
               //super.NotifyPropertyChanged("InfusionType");
            }
        }
        private _FrequencyType: string;
        public get FrequencyType(): string {
            return this._FrequencyType;
        }
        public set FrequencyType(value: string) {
            if (this._FrequencyType != value) {
                this._FrequencyType = value;
               //super.NotifyPropertyChanged("FrequencyType");
            }
        }
        private _IsReviewMandatory: boolean = false;
        public get IsReviewMandatory(): boolean {
            return this._IsReviewMandatory;
        }
        public set IsReviewMandatory(value: boolean) {
            if (this._IsReviewMandatory != value) {
                this._IsReviewMandatory = value;
               //super.NotifyPropertyChanged("IsReviewMandatory");
            }
        }
        private GetreviewDate(): void {
            let dtReviewAfterdttm: DateTime= DateTime.MinValue;
            if (!String.IsNullOrEmpty(this.ReviewAfter) && (String.Compare(this.ReviewAfter, "-1.79769313486232E+308") != 0) && (String.Compare(this.ReviewAfter, "-2147483648.0") != 0) && (String.Compare(this.ReviewAfter, "-2147483648") != 0) && (Convert.ToDouble(this.ReviewAfter) != Number.MinValue) && this.ReviewafterUOM != null) {
                let dtStartDttm: DateTime= DateTime.MinValue;
                let dtCurrentDateTime: DateTime= DateTime.MinValue;
                if (DateTime.NotEquals(this.ParentDTTM, DateTime.MinValue)) {
                    dtCurrentDateTime = this.ParentDTTM;
                }
                else {
                    dtCurrentDateTime = CommonBB.GetServerDateTime();
                }
                if (DateTime.NotEquals(this.StartPrescriptionTime, DateTime.MinValue)) {
                    dtStartDttm = this.StartPrescriptionTime;
                    if (DateTime.NotEquals(this.StartPrescriptionTime, DateTime.MinValue)) {
                        dtStartDttm = dtStartDttm.DateTime.AddTime(this.StartPrescriptionTime);
                    }
                    if (DateTime.LessThan(dtStartDttm, dtCurrentDateTime) && this.ReviewafterUOM != null && !String.IsNullOrEmpty(this.ReviewafterUOM.Value) && !this.ReviewafterUOM.Value.Equals("CC_DOSES")) {
                        dtStartDttm = dtCurrentDateTime;
                    }
                }
                else dtStartDttm = dtCurrentDateTime;
                let lReviewAfter: number = Convert.ToDouble(this.ReviewAfter);
                switch (this.ReviewafterUOM.Value) {
                    case "CC_HOURS":
                        dtReviewAfterdttm = dtStartDttm.AddHours(lReviewAfter);
                        break;
                    case "CC_MEDDRSN1":
                        dtReviewAfterdttm = dtStartDttm.AddDays(lReviewAfter);
                        break;
                    case "CC_MEDDRSN2":
                        dtReviewAfterdttm = dtStartDttm.AddDays(lReviewAfter * 7);
                        break;
                    case "CC_DOSES":
                        if (this.oAdminTimesVM != null && this.oAdminTimesVM.FreqDetails != null) {
                            if (this.scheduletimes != null && this.scheduletimes.Count > 0) {
                                this.oAdminTimesVM.FreqDetails.oFixedTimes = this.scheduletimes;
                            }
                            if (this.oFrequencyDetails != null) {
                                this.oAdminTimesVM.FreqDetails.oFrequency.IsSunday = this.oFrequencyDetails.IsSunday;
                                this.oAdminTimesVM.FreqDetails.oFrequency.IsMonday = this.oFrequencyDetails.IsMonday;
                                this.oAdminTimesVM.FreqDetails.oFrequency.IsTuesday = this.oFrequencyDetails.IsTuesday;
                                this.oAdminTimesVM.FreqDetails.oFrequency.IsWednesday = this.oFrequencyDetails.IsWednesday;
                                this.oAdminTimesVM.FreqDetails.oFrequency.IsThursday = this.oFrequencyDetails.IsThursday;
                                this.oAdminTimesVM.FreqDetails.oFrequency.IsFriday = this.oFrequencyDetails.IsFriday;
                                this.oAdminTimesVM.FreqDetails.oFrequency.IsSaturday = this.oFrequencyDetails.IsSaturday;
                            }
                        }
                        let listOfDTTM: List<DateTime> = MedicationCommonBB.GetScheduleDatesForDoseDuration(dtStartDttm, dtCurrentDateTime, lReviewAfter, this.oAdminTimesVM.FreqDetails != null ? this.oAdminTimesVM.FreqDetails : null);
                        if (listOfDTTM != null && listOfDTTM.Count > 0) {
                            dtReviewAfterdttm = listOfDTTM.Max(o=>o);
                        }
                        break;
                }
            }
            if (DateTime.NotEquals(dtReviewAfterdttm, DateTime.MinValue)) {
                let IsDST: boolean, IsAmbiguous, IsInvalid;
                this.ReviewAfterDTTM = dtReviewAfterdttm;
                this.ReviewAfterDateTime = dtReviewAfterdttm.ConvertToUser(_IsDST => {IsDST= _IsDST;}, (_IsAmbiguous) => {IsAmbiguous = _IsAmbiguous;},( _IsInvalid) => {IsInvalid = _IsInvalid; }).ToDateTimeString(IsDST, IsAmbiguous, CConstants.LongDateWithoutSecs);
            }
            else {
                this.ReviewAfterDTTM = DateTime.MinValue;
                this.ReviewAfterDateTime = String.Empty;
            }
        }
        public FillReviewPeriodDetails(): IPPMAManagePrescSer.ManageReviewPeriod {
            this.oManageReviewPeriod = new IPPMAManagePrescSer.ManageReviewPeriod();
            this.oManageReviewPeriod.NewReviewAfter = this.ReviewAfter;
            this.oManageReviewPeriod.NewReviewAfterDTTM = this.ReviewAfterDTTM;
            this.oManageReviewPeriod.NewReviewAfterUOM = new IPPMAManagePrescSer.ObjectInfo();
            this.oManageReviewPeriod.NewReviewAfterUOM.Name = this.ReviewafterUOM.DisplayText;
            ;
            this.oManageReviewPeriod.NewReviewAfterUOM.Code = this.ReviewafterUOM.Value;
            this.oManageReviewPeriod.NewReviewRequestComments = this.Reviewcomments;
            this.oManageReviewPeriod.NewReviewType = new IPPMAManagePrescSer.ObjectInfo();
            this.oManageReviewPeriod.NewReviewType.Name = CConstants.GeneralText;
            this.oManageReviewPeriod.NewReviewType.Code = CConstants.ReviewGeneralType;
            this.oManageReviewPeriod.PrescriptionItemOID = this.PrescriptionItemOID;
            this.oManageReviewPeriod.oReviewAfterDetail = new IPPMAManagePrescSer.ReviewAfterDetail();
            this.oManageReviewPeriod.oReviewAfterDetail.PrescriptionItemOID = this.PrescriptionItemOID;
            return this.oManageReviewPeriod;
        }
        public GetComboValue(oListItem: CListItem, oListCollection: ObservableCollection<CListItem>): CListItem {
            if (oListItem != null && oListCollection != null) {
                let selectedVal: CListItem = null;
                for(let i=0; i< oListCollection.Count; i++){
                    let oItem: CListItem = oListCollection[i];                
                    if (oItem.Value == oListItem.Value) {
                        selectedVal = oItem;
                        break;
                    }
                }
                if (!String.IsNullOrEmpty(oListItem.DisplayText)) {
                    if (selectedVal != null) {
                        oListItem = selectedVal;
                    }
                }
            }
            return oListItem;
        }
        public GetDomainCombo(): void {
            ProcessRTE.GetAllReferenceCodesByDomain(ValueDomain.ReviewPeriodDomain, ValueSet.ReviewPeriodValueset, (s,e) => {this.OnRTEResultReviewPeriodUOM(s);});
        }
        OnRTEResultReviewPeriodUOM(args: RTEEventargs): void {
            if (String.IsNullOrEmpty(args.Request) || args.Result == null)
                return
            if (args.Result instanceof Dictionary) {
                let objResult: Dictionary<string, List<CListItem>> = <Dictionary<string, List<CListItem>>>args.Result;
                if (String.Compare(args.Request, (ValueDomain.ReviewPeriodDomain + "," + ValueSet.ReviewPeriodValueset)) == 0) {
                    if (this.ReviewAfterConceptcodes == null) {
                        this.ReviewAfterConceptcodes = new ObservableCollection<CValuesetTerm>();
                    }
                    objResult.forEach( (objDomainDetail)=> {
                        ReviewAfterUOMListConceptCodeData.ConceptCodes = null;
                        ReviewAfterUOMListConceptCodeData.ConceptCodes = new ObservableCollection<CValuesetTerm>();
                        let newdata: any = objDomainDetail.Value
                        if (objDomainDetail.Value != null && newdata.length > 0 ) {
                            objDomainDetail.Value.forEach( (oCListItem)=> {
                                this.ReviewAfterConceptcodes.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                ReviewAfterUOMListConceptCodeData.ConceptCodes.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                            });
                        }
                    });
                }
            }
            this.LoadDefaultValues();
        }
        private LoadDefaultValues(): void {
            if (ReviewAfterUOMListConceptCodeData.ConceptCodes != null && ReviewAfterUOMListConceptCodeData.ConceptCodes.Count > 0) {
                if (this.ReviewAfterUOMList == null) {
                    this.ReviewAfterUOMList = new ObservableCollection<CListItem>();
                }
                ReviewAfterUOMListConceptCodeData.ConceptCodes.forEach( (oCListItem)=> {
                    this.ReviewAfterUOMList.Add(ObjectHelper.CreateObject(new CListItem(), { Value: oCListItem.csCode, DisplayText: oCListItem.csDescription }));
                });
                if ((this.IsInfusion && !String.Equals(this.InfusionType, InfusionTypeCode.INTERMITTENT)) || (this.IsInfusion && String.Equals(this.InfusionType, InfusionTypeCode.INTERMITTENT) && String.Equals(this.DoseType, DoseTypeCode.STEPPEDVARIABLE)) || this.IsPRN || String.Equals(this.FrequencyType, CConstants.OnceOnlyFrequency) || String.Equals(this.DoseType, DoseTypeCode.STEPPEDVARIABLE)) {
                    let ObjReviewAfterUOMList = this.ReviewAfterUOMList.Where(x => x.Value == CConstants.Doses);
                    if (ObjReviewAfterUOMList != null && ObjReviewAfterUOMList.Count() > 0) {
                        this.ReviewAfterUOMList.Remove(ObjReviewAfterUOMList.First());
                    }
                }
            }
            if (this.TempReviewafterUOM != null && !String.IsNullOrEmpty(this.TempReviewafterUOM.DisplayText) && !String.IsNullOrEmpty(this.TempReviewafterUOM.Value)) {
                this.ReviewafterUOM = this.GetComboValue(this.TempReviewafterUOM, this.ReviewAfterUOMList);
            }
        }
    }