import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, ProcessRTE } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, CListItem, Visibility, List, RTEEventargs } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import * as IPPMAManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS'
import { MedicationCommonProfileData, ReviewAfterUOMListConceptCodeData } from '../utilities/profiledata';
import { CConstants, DoseTypeCode, InfusionTypeCode, PrescriptionTypes, ValueDomain, ValueSet } from '../utilities/constants';
import { ClerkFormViewDeftBehaviour, ContextInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { Dictionary } from 'epma-platform/dictionary';
import { AdminstrativeTimesVM } from './adminstrativetimesvm';
import { GrdDiscontinueCancelCols } from './discontinuecancelvm';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { MedicationCommonBB } from '../utilities/medicationcommonbb';
 import { PrescribingConfigData } from 'src/app/lorappslprofiletypes/medication';
import { ObjectInfo } from '../../shared/epma-platform/soap-client/ManagePrescriptionWS'; 
import { CValuesetTerm } from 'src/app/shared/epma-platform/soap-client/CReferenceWS';

    export class ReviewOutcomeVM extends ViewModelBase {
        //public delegate void ErrorEventArgs(string ErrorMessage, string ContronID);        
        // discanc: meddiscontinuecancelChild; //Not Required for LHS. To be Re-Visited.
        public oAdminTimesVM: AdminstrativeTimesVM;
        public oAdminDataforFreqDetails: ObservableCollection<IPPMAManagePrescSer.IPPScheduledetails>;
        public oFrequecydetails: IPPMAManagePrescSer.IPPFrequency;
        public ReviewAfterConceptcodes: ObservableCollection<CValuesetTerm>;
        private ManageReviewDetail: IPPMAManagePrescSer.ManageReviewPeriod;
        count: number = 0;
        //public delegate void RTECompleted();
        public RTECompletedevent: Function;
    constructor() {
        super();
        this.RTECompletedevent = (s, e) => { this.RTEResultCompleted(); };

    }

    constructorImpl(oManageReviewPeriod: IPPMAManagePrescSer.ManageReviewPeriod) {
            this.ManageReviewDetail = oManageReviewPeriod;
            this.GetDomainCombo();
        }
        private RTEResultCompleted(): void {
            this.LoadDefaultValue();
        }
        private _ReviewTypeText: string;
        public get ReviewTypeText(): string {
            return this._ReviewTypeText;
        }
        public set ReviewTypeText(value: string) {
            if (this._ReviewTypeText != value) {
                this._ReviewTypeText = value;
               //NotifyPropertyChanged("ReviewTypeText");
            }
        }
        private _ReviewTypeTextCode: string;
        public get ReviewTypeTextCode(): string {
            return this._ReviewTypeTextCode;
        }
        public set ReviewTypeTextCode(value: string) {
            if (this._ReviewTypeTextCode != value) {
                this._ReviewTypeTextCode = value;
               //NotifyPropertyChanged("ReviewTypeTextCode");
            }
        }
        private _ReviewType: ObjectInfo;
        public get ReviewType(): ObjectInfo {
            return this._ReviewType;
        }
        public set ReviewType(value: ObjectInfo) {
            if (this._ReviewType != value) {
                this._ReviewType = value;
               //NotifyPropertyChanged("ReviewType");
            }
        }
        private _ReviewRequestComments: string;
        public get ReviewRequestComments(): string {
            return this._ReviewRequestComments;
        }
        public set ReviewRequestComments(value: string) {
            if (this._ReviewRequestComments != value) {
                this._ReviewRequestComments = value;
               //NotifyPropertyChanged("ReviewRequestComments");
            }
        }
        private _ReviewRequestedBy: string;
        public get ReviewRequestedBy(): string {
            return this._ReviewRequestedBy;
        }
        public set ReviewRequestedBy(value: string) {
            if (this._ReviewRequestedBy != value) {
                this._ReviewRequestedBy = value;
               //NotifyPropertyChanged("ReviewRequestedBy");
            }
        }
        private _ReviewRequestedDTTM: DateTime = DateTime.MinValue;
        public get ReviewRequestedDTTM(): DateTime{
            return this._ReviewRequestedDTTM;
        }
        public set ReviewRequestedDTTM(value: DateTime) {
            if (this._ReviewRequestedDTTM != value) {
                this._ReviewRequestedDTTM = value;
               //NotifyPropertyChanged("ReviewRequestedDTTM");
            }
        }
        private _ReviewRequestedDTTMlabel: string;
        public get ReviewRequestedDTTMlabel(): string {
            return this._ReviewRequestedDTTMlabel;
        }
        public set ReviewRequestedDTTMlabel(value: string) {
            if (this._ReviewRequestedDTTMlabel != value) {
                this._ReviewRequestedDTTMlabel = value;
               //NotifyPropertyChanged("ReviewRequestedDTTMlabel");
            }
        }
        private _ReviewDTTM: DateTime = DateTime.MinValue;
        public get ReviewDTTM(): DateTime{
            return this._ReviewDTTM;
        }
        public set ReviewDTTM(value: DateTime) {
            if (this._ReviewDTTM != value) {
                this._ReviewDTTM = value;
               //NotifyPropertyChanged("ReviewDTTM");
            }
        }
        private _ReviewDTTMlabel: string;
        public get ReviewDTTMlabel(): string {
            return this._ReviewDTTMlabel;
        }
        public set ReviewDTTMlabel(value: string) {
            if (this._ReviewDTTMlabel != value) {
                this._ReviewDTTMlabel = value;
               //NotifyPropertyChanged("ReviewDTTMlabel");
            }
        }
        private _ReviewOutcomeComments: string;
        public get ReviewOutcomeComments(): string {
            return this._ReviewOutcomeComments;
        }
        public set ReviewOutcomeComments(value: string) {
            if (this._ReviewOutcomeComments != value) {
                this._ReviewOutcomeComments = value;
               //NotifyPropertyChanged("ReviewOutcomeComments");
            }
        }
        private _ReinstateReason: string;
        public get ReinstateReason(): string {
            return this._ReinstateReason;
        }
        public set ReinstateReason(value: string) {
            if (this._ReinstateReason != value) {
                this._ReinstateReason = value;
               //NotifyPropertyChanged("ReinstateReason");
            }
        }
        private bReinstateReasonMandatory: boolean = false;
        public get ReinstateReasonMandatory(): boolean {
            return this.bReinstateReasonMandatory;
        }
        public set ReinstateReasonMandatory(value: boolean) {
            if (!ObjectHelper.ReferenceEquals(this.bReinstateReasonMandatory, value)) {
                this.bReinstateReasonMandatory = value;
               //NotifyPropertyChanged("ReinstateReasonMandatory");
            }
        }
        private _ReinstateReasonFieldVisibility: Visibility = Visibility.Collapsed;
        public get ReinstateReasonFieldVisibility(): Visibility {
            return this._ReinstateReasonFieldVisibility;
        }
        public set ReinstateReasonFieldVisibility(value: Visibility) {
            this._ReinstateReasonFieldVisibility = value;
           //NotifyPropertyChanged("ReinstateReasonFieldVisibility");
        }
        private _NewReviewRequestComments: string;
        public get NewReviewRequestComments(): string {
            return this._NewReviewRequestComments;
        }
        public set NewReviewRequestComments(value: string) {
            if (this._NewReviewRequestComments != value) {
                this._NewReviewRequestComments = value;
               //NotifyPropertyChanged("NewReviewRequestComments");
            }
        }
        private _NewReviewRequestCommentsFieldVisibility: Visibility = Visibility.Visible;
        public get NewReviewRequestCommentsFieldVisibility(): Visibility {
            return this._NewReviewRequestCommentsFieldVisibility;
        }
        public set NewReviewRequestCommentsFieldVisibility(value: Visibility) {
            this._NewReviewRequestCommentsFieldVisibility = value;
           //NotifyPropertyChanged("NewReviewRequestCommentsFieldVisibility");
        }
        public ReviewOutcomeConceptCodes: ObservableCollection<CValuesetTerm>;
        private oReviewOutcomeListOriginal: ObservableCollection<CListItem>;
        public get ReviewOutcomeListOriginal(): ObservableCollection<CListItem> {
            return this.oReviewOutcomeListOriginal;
        }
        public set ReviewOutcomeListOriginal(value: ObservableCollection<CListItem>) {
            if (this.ReviewOutcomeListOriginal != value) {
                this.oReviewOutcomeListOriginal = value;
               //NotifyPropertyChanged("ReviewOutcomeListOriginal");
            }
        }
        private oReviewOutcomeList: ObservableCollection<CListItem>;
        public get ReviewOutcomeList(): ObservableCollection<CListItem> {
            return this.oReviewOutcomeList;
        }
        public set ReviewOutcomeList(value: ObservableCollection<CListItem>) {
            if (this.oReviewOutcomeList != value) {
                this.oReviewOutcomeList = value;
               //NotifyPropertyChanged("ReviewOutcomeList");
            }
        }
        private lstReviewOutcome: CListItem;
        public get ReviewOutcome(): CListItem {
            return this.lstReviewOutcome;
        }
        public set ReviewOutcome(value: CListItem) {
            if (!ObjectHelper.ReferenceEquals(this.lstReviewOutcome, value)) {
                this.lstReviewOutcome = value;
               //super.NotifyPropertyChanged("ReviewOutcome");
                this.ReviewOutcomeValidations();
            }
        }
        private bReviewOutcomeMandatory: boolean = false;
        public get ReviewOutcomeMandatory(): boolean {
            return this.bReviewOutcomeMandatory;
        }
        public set ReviewOutcomeMandatory(value: boolean) {
            if (!ObjectHelper.ReferenceEquals(this.bReviewOutcomeMandatory, value)) {
                this.bReviewOutcomeMandatory = value;
               //NotifyPropertyChanged("ReviewOutcomeMandatory");
            }
        }
        private bReviewOutcomeListEnabled: boolean = true;
        public get ReviewOutcomeListEnabled(): boolean {
            return this.bReviewOutcomeListEnabled;
        }
        public set ReviewOutcomeListEnabled(value: boolean) {
            if (!ObjectHelper.ReferenceEquals(this.bReviewOutcomeListEnabled, value)) {
                this.bReviewOutcomeListEnabled = value;
               //NotifyPropertyChanged("ReviewOutcomeListEnabled");
            }
        }
        public DiscontinueReasonConceptCodes: ObservableCollection<CValuesetTerm>;
        private oDiscontinueReasonList: ObservableCollection<CListItem>;
        public get DiscontinueReasonList(): ObservableCollection<CListItem> {
            return this.oDiscontinueReasonList;
        }
        public set DiscontinueReasonList(value: ObservableCollection<CListItem>) {
            if (this.oDiscontinueReasonList != value) {
                this.oDiscontinueReasonList = value;
               //NotifyPropertyChanged("DiscontinueReasonList");
            }
        }
        private lstDiscontinueReason: CListItem;
        public get DiscontinueReason(): CListItem {
            return this.lstDiscontinueReason;
        }
        public set DiscontinueReason(value: CListItem) {
            if (!ObjectHelper.ReferenceEquals(this.lstDiscontinueReason, value)) {
                this.lstDiscontinueReason = value;
               //super.NotifyPropertyChanged("DiscontinueReason");
            }
        }
        private bDiscontinueReasonMandatory: boolean = false;
        public get DiscontinueReasonMandatory(): boolean {
            return this.bDiscontinueReasonMandatory;
        }
        public set DiscontinueReasonMandatory(value: boolean) {
            if (!ObjectHelper.ReferenceEquals(this.bDiscontinueReasonMandatory, value)) {
                this.bDiscontinueReasonMandatory = value;
               //NotifyPropertyChanged("DiscontinueReasonMandatory");
            }
        }
        private _DiscontinueReasonFieldVisibility: Visibility = Visibility.Collapsed;
        public get DiscontinueReasonFieldVisibility(): Visibility {
            return this._DiscontinueReasonFieldVisibility;
        }
        public set DiscontinueReasonFieldVisibility(value: Visibility) {
            this._DiscontinueReasonFieldVisibility = value;
           //NotifyPropertyChanged("DiscontinueReasonFieldVisibility");
        }
        private _ReviewAfterUOMListCombo: ObservableCollection<CListItem>;
        public get ReviewAfterUOMListCombo(): ObservableCollection<CListItem> {
            return this._ReviewAfterUOMListCombo;
        }
        public set ReviewAfterUOMListCombo(value: ObservableCollection<CListItem>) {
            if (this._ReviewAfterUOMListCombo != value) {
                this._ReviewAfterUOMListCombo = value;
               //super.NotifyPropertyChanged("ReviewAfterUOMListCombo");
            }
        }
        private _lstReviewAfterUOMCombo: CListItem;
        public get lstReviewAfterUOMCombo(): CListItem {
            return this._lstReviewAfterUOMCombo;
        }
        public set lstReviewAfterUOMCombo(value: CListItem) {
            if (!ObjectHelper.ObjReferenceEquals(this._lstReviewAfterUOMCombo, value)) {
                this._lstReviewAfterUOMCombo = value;
               //super.NotifyPropertyChanged("lstReviewAfterUOMCombo");
                this.GetreviewDate();
            }
        }
        private _ReviewPeriod: string;
        public get ReviewPeriod(): string {
            return this._ReviewPeriod;
        }
        public set ReviewPeriod(value: string) {
            if (this._ReviewPeriod != value) {
                this._ReviewPeriod = value;
               //NotifyPropertyChanged("ReviewPeriod");
                this.GetreviewDate();
            }
        }
        public ReviewAfterDTTM: DateTime = DateTime.MinValue;
        private _ReviewPeriodDTTM: string;
        public get ReviewPeriodDTTM(): string {
            return this._ReviewPeriodDTTM;
        }
        public set ReviewPeriodDTTM(value: string) {
            if (this._ReviewPeriodDTTM != value) {
                this._ReviewPeriodDTTM = value;
               //NotifyPropertyChanged("ReviewPeriodDTTM");
            }
        }
        private bReviewAfterMandatory: boolean = true;
        public get ReviewAfterMandatory(): boolean {
            return this.bReviewAfterMandatory;
        }
        public set ReviewAfterMandatory(value: boolean) {
            if (this.bReviewAfterMandatory != value) {
                this.bReviewAfterMandatory = value;
               //NotifyPropertyChanged("ReviewAfterMandatory");
            }
        }
        private _ReviewAfterFieldVisibility: Visibility = Visibility.Visible;
        public get ReviewAfterFieldVisibility(): Visibility {
            return this._ReviewAfterFieldVisibility;
        }
        public set ReviewAfterFieldVisibility(value: Visibility) {
            this._ReviewAfterFieldVisibility = value;
           //NotifyPropertyChanged("ReviewAfterFieldVisibility");
        }
        private lnPrescriptionItemOID: number = 0;
        public get PrescriptionItemOID(): number {
            return this.lnPrescriptionItemOID;
        }
        public set PrescriptionItemOID(value: number) {
            if (this.lnPrescriptionItemOID != value) {
                this.lnPrescriptionItemOID = value;
               //NotifyPropertyChanged("PrescriptionItemOID");
            }
        }
        private _StopDTTM: DateTime = DateTime.MinValue;
        public get StopDTTM(): DateTime{
            return this._StopDTTM;
        }
        public set StopDTTM(value: DateTime) {
            if (this._StopDTTM != value) {
                this._StopDTTM = value;
               //NotifyPropertyChanged("StopDTTM");
            }
        }
        private bReviewAfterMandatoryConfig: boolean = false;
        public get ReviewAfterMandatoryConfig(): boolean {
            return this.bReviewAfterMandatoryConfig;
        }
        public set ReviewAfterMandatoryConfig(value: boolean) {
            if (this.bReviewAfterMandatoryConfig != value) {
                this.bReviewAfterMandatoryConfig = value;
               //NotifyPropertyChanged("ReviewAfterMandatoryConfig");
            }
        }
        private bReasonMandatory: boolean = false;
        public get ReasonMandatory(): boolean {
            return this.bReasonMandatory;
        }
        public set ReasonMandatory(value: boolean) {
            if (this.bReasonMandatory != value) {
                this.bReasonMandatory = value;
               //NotifyPropertyChanged("ReasonMandatory");
            }
        }
        private _InfusionPeriod: string;
        public get InfusionPeriod(): string {
            return this._InfusionPeriod;
        }
        public set InfusionPeriod(value: string) {
            if (this._InfusionPeriod != value) {
                this._InfusionPeriod = value;
               //NotifyPropertyChanged("InfusionPeriod");
            }
        }
        private _InfusionPeriodUOM: string;
        public get InfusionPeriodUOM(): string {
            return this._InfusionPeriodUOM;
        }
        public set InfusionPeriodUOM(value: string) {
            if (this._InfusionPeriodUOM != value) {
                this._InfusionPeriodUOM = value;
               //NotifyPropertyChanged("InfusionPeriodUOM");
            }
        }
        public localInfusionPeriodDTTM: DateTime = DateTime.MinValue;
        private _Duration: string;
        public get Duration(): string {
            return this._Duration;
        }
        public set Duration(value: string) {
            if (this._Duration != value) {
                this._Duration = value;
               //NotifyPropertyChanged("Duration");
            }
        }
        private _DurationUOM: string;
        public get DurationUOM(): string {
            return this._DurationUOM;
        }
        public set DurationUOM(value: string) {
            if (this._DurationUOM != value) {
                this._DurationUOM = value;
               //NotifyPropertyChanged("DurationUOM");
            }
        }
        public localDurationDTTM: DateTime = DateTime.MinValue;
        private _StartDTTM: DateTime = DateTime.MinValue;;
        public get StartDTTM(): DateTime{
            return this._StartDTTM;
        }
        public set StartDTTM(value: DateTime) {
            if (this._StartDTTM != value) {
                this._StartDTTM = value;
               //NotifyPropertyChanged("StartDTTM");
            }
        }
        private _grdData: ObservableCollection<GrdDiscontinueCancelCols>;
        public get GrdData(): ObservableCollection<GrdDiscontinueCancelCols> {
            return this._grdData;
        }
        public set GrdData(value: ObservableCollection<GrdDiscontinueCancelCols>) {
            this._grdData = value;
           //NotifyPropertyChanged("GrdData");
        }
        private _CurrentDTTM: DateTime = DateTime.MinValue;;
        public get CurrentDateTime(): DateTime{
            return this._CurrentDTTM;
        }
        public set CurrentDateTime(value: DateTime) {
            if (this._CurrentDTTM != value) {
                this._CurrentDTTM = value;
               //NotifyPropertyChanged("CurrentDateTime");
            }
        }
        public FrequencyOID: number = 0;
        public InfusionType: string;
        public DoseType: string;
        public IsPRN: boolean = false;
        public FrequencyType: string;
        private dtCurrentDateTime: DateTime = DateTime.MinValue;
        public GetDomainCombo(): void {
            let DomainCodes: string = ValueDomain.ReviewOutcome;
            ProcessRTE.GetHierarchicalValuesByDomains(CConstants.CodingSchemeName, CConstants.Version, CConstants.FilterType, ContextInfo.Culture, DomainCodes, (s,e) => {this.OnRTEResult(s);});
            ProcessRTE.GetAllReferenceCodesByDomain(ValueDomain.ReviewPeriodDomain, ValueSet.ReviewPeriodValueset, (s,e) => {this.OnRTEResultReviewPeriodUOM(s);});
            ProcessRTE.GetValuesByDomainCode("MEDCANDISCNTRSN", (s,e) => {this.OnRTEResultDiscontinue(s);});
            this.SetProfileData();
            //this.RTECompletedevent -= new RTECompleted(this.RTEResultCompleted);
            this.RTECompletedevent  = (s,e) => { this.RTEResultCompleted(); } ;
        }
        OnRTEResult(args: RTEEventargs): void {
            if (String.IsNullOrEmpty(args.Request) || args.Result == null)
                return
            if (args.Result instanceof Dictionary) {
                let objResult: Dictionary<string, List<CListItem>> = <Dictionary<string, List<CListItem>>>args.Result;
                objResult.forEach( (objDomainDetail)=> {
                    switch (objDomainDetail.Key) {
                        case ValueDomain.ReviewOutcome:
                            {
                                this.ReviewOutcomeConceptCodes = new ObservableCollection<CValuesetTerm>();
                                this.ReviewOutcomeListOriginal = new ObservableCollection<CListItem>();
                                if (objDomainDetail.Value != null && objDomainDetail.Value.Count > 0) {
                                    // objDomainDetail.Value.forEach( (oCListItem)=> {
                                    //     this.ReviewOutcomeConceptCodes.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                    //     this.ReviewOutcomeListOriginal.Add(oCListItem);
                                    //     if (this.ReviewOutcomeListOriginal.Count == 4)
                                    //     return;
                                    // });
                                    for(let i: number=0; i < objDomainDetail.Value.Count; i++){
                                        this.ReviewOutcomeConceptCodes.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: objDomainDetail.Value[i].Value, csDescription: objDomainDetail.Value[i].DisplayText }));
                                        this.ReviewOutcomeListOriginal.Add(objDomainDetail.Value[i]);
                                        if (this.ReviewOutcomeListOriginal.Count == 4){
                                            break;
                                        }
                                    }
                                }
                                break;
                            }
                    }
                });
            }
            this.count++;
            if (this.count == 3) {
                this.RTECompletedevent();
            }
        }
        OnRTEResultDiscontinue(args: RTEEventargs): void {
            if (String.IsNullOrEmpty(args.Request) || args.Result == null)
                return
            this.GrdData = new ObservableCollection<GrdDiscontinueCancelCols>();
            let objDiscontinueReason: ObservableCollection<CListItem> = null;
            let objCancelReason: ObservableCollection<CListItem> = null;
            let objDiscontinueCancelReason: ObservableCollection<CListItem> = null;
            this.getDomainComboValues(<List<CListItem>>args.Result, objDiscontinueReason, objCancelReason, objDiscontinueCancelReason);
            this.count++;
            if (this.count == 3) {
                this.RTECompletedevent();
            }
        }
        OnRTEResultReviewPeriodUOM(args: RTEEventargs): void {
            if (String.IsNullOrEmpty(args.Request) || args.Result == null)
                return
            if (args.Result instanceof Dictionary) {
                let objResult: Dictionary<string, List<CListItem>> = <Dictionary<string, List<CListItem>>>args.Result;
                if (String.Compare(args.Request, (ValueDomain.ReviewPeriodDomain + "," + ValueSet.ReviewPeriodValueset)) == 0) {
                    if (this.ReviewAfterConceptcodes == null)
                        this.ReviewAfterConceptcodes = new ObservableCollection<CValuesetTerm>();
                    objResult.forEach( (objDomainDetail)=> {
                        ReviewAfterUOMListConceptCodeData.ConceptCodes = null;
                        ReviewAfterUOMListConceptCodeData.ConceptCodes = new ObservableCollection<CValuesetTerm>();
                        this.ReviewAfterConceptcodes = new ObservableCollection<CValuesetTerm>();
                      // re-visit for the length property
                      let newdata: any = objDomainDetail.Value
                      if (objDomainDetail.Value != null && newdata.length > 0) {
                        objDomainDetail.Value.forEach((oCListItem) => {
                          this.ReviewAfterConceptcodes.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                          ReviewAfterUOMListConceptCodeData.ConceptCodes.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                        });
                      }
                        // if (objDomainDetail.Value != null && objDomainDetail.Value.Count > 0) {
                        //     objDomainDetail.Value.forEach((oCListItem) => {
                        //         this.ReviewAfterConceptcodes.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                        //         ReviewAfterUOMListConceptCodeData.ConceptCodes.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                        //     });
                        // }
                    });
                }
            }
            this.LoadReviewAfterUom();
            this.count++;
            if (this.count == 3) {
                this.RTECompletedevent();
            }
        }
        private getDomainComboValues(oResponseoObject: List<CListItem>, objDiscontinueReason: ObservableCollection<CListItem>, objCancelReason: ObservableCollection<CListItem>, objDiscontinueCancelReason: ObservableCollection<CListItem>): void {
            objDiscontinueReason = new ObservableCollection<CListItem>();
            objCancelReason = new ObservableCollection<CListItem>();
            objDiscontinueCancelReason = new ObservableCollection<CListItem>();
            try {
                oResponseoObject.forEach((oCListItem) => {
                    if ((PatientContext.ClerkFormViewDefaultBehavior.toString() != ClerkFormViewDeftBehaviour.LaunchFormMandatory.toString() && String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.OrdinalIgnoreCase) == 0) || String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Outpatient, StringComparison.OrdinalIgnoreCase) == 0 || (PatientContext.ClerkFormViewDefaultBehavior.toString() != ClerkFormViewDeftBehaviour.LaunchFormMandatory.toString() && String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Inpatient, StringComparison.OrdinalIgnoreCase) == 0) || String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Leave, StringComparison.OrdinalIgnoreCase) == 0) {
                        if (String.Compare(oCListItem.Value, "CC_WTHOLDUNTLDSCHRG", StringComparison.OrdinalIgnoreCase) != 0 && String.Compare(oCListItem.Value, "CC_MEDTEMPLYSUSPEND", StringComparison.OrdinalIgnoreCase) != 0 && String.Compare(oCListItem.Value, "CC_MEDPATDIFFICULTY", StringComparison.OrdinalIgnoreCase) != 0)
                            objDiscontinueCancelReason.Add(oCListItem);
                    }
                    if (String.Compare(oCListItem.Value, "CC_PRESINERR", StringComparison.InvariantCultureIgnoreCase) == 0 || String.Compare(oCListItem.Value, "CC_MEDENTEREDINERROR", StringComparison.InvariantCultureIgnoreCase) == 0) {
                        if (String.Compare(oCListItem.Value, "CC_WTHOLDUNTLDSCHRG", StringComparison.OrdinalIgnoreCase) != 0 && String.Compare(oCListItem.Value, "CC_MEDTEMPLYSUSPEND", StringComparison.OrdinalIgnoreCase) != 0 && String.Compare(oCListItem.Value, "CC_MEDPATDIFFICULTY", StringComparison.OrdinalIgnoreCase) != 0)
                            objCancelReason.Add(oCListItem);
                        if (PatientContext.ClerkFormViewDefaultBehavior.toString() == ClerkFormViewDeftBehaviour.LaunchFormMandatory.toString() || (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.OrdinalIgnoreCase) == 0) || String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Discharge, StringComparison.OrdinalIgnoreCase) == 0) {
                            if (String.Compare(oCListItem.Value, "CC_WTHOLDUNTLDSCHRG", StringComparison.OrdinalIgnoreCase) != 0 && String.Compare(oCListItem.Value, "CC_MEDTEMPLYSUSPEND", StringComparison.OrdinalIgnoreCase) != 0 && String.Compare(oCListItem.Value, "CC_MEDPATDIFFICULTY", StringComparison.OrdinalIgnoreCase) != 0)
                                objDiscontinueCancelReason.Add(oCListItem);
                        }
                    }
                    else {
                        console.log("ReviewOutcomeCheck",PatientContext.ClerkFormViewDefaultBehavior.toString())
                        /*From formviewer for all the options in sysconfig the outcome of PatientContext.ClerkFormViewDefaultBehavior is "DoNotLaunchForm" only,
                        hence the dropdown for DiscontinueReason is getting filled by default. But its having issue incase from Prescription chart and the discontinuereason dropdown is 
                        not getting filled for LaunchFormMandatory as the condition applied to it in such way and the behaviour is same as Passive env 6042a and it fectches same list items for all 
                        the 3 options of sysconfig (clerking form viewer default behaviour).hence commenting out the below line from the condition check. 
                        "PatientContext.ClerkFormViewDefaultBehavior.toString() != ClerkFormViewDeftBehaviour.LaunchFormMandatory.toString() && "
                        this is fixed against the bug id: 52288.
                        */
                        // PatientContext.ClerkFormViewDefaultBehavior.toString() != ClerkFormViewDeftBehaviour.LaunchFormMandatory.toString() && 
                        if ((String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.OrdinalIgnoreCase) == 0)
                            || String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Outpatient, StringComparison.OrdinalIgnoreCase) == 0 ||
                            (PatientContext.ClerkFormViewDefaultBehavior.toString() != ClerkFormViewDeftBehaviour.LaunchFormMandatory.toString() && String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Inpatient, StringComparison.OrdinalIgnoreCase) == 0) || String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Leave, StringComparison.OrdinalIgnoreCase) == 0)
                            if (String.Compare(oCListItem.Value, "CC_WTHOLDUNTLDSCHRG", StringComparison.OrdinalIgnoreCase) != 0 && String.Compare(oCListItem.Value, "CC_MEDTEMPLYSUSPEND", StringComparison.OrdinalIgnoreCase) != 0 && String.Compare(oCListItem.Value, "CC_MEDPATDIFFICULTY", StringComparison.OrdinalIgnoreCase) != 0)
                                objDiscontinueReason.Add(oCListItem);
                    }
                });
            }
            catch (e) {

            }
            this.DiscontinueReasonList = objDiscontinueReason;
        }
        private LoadReviewAfterUom(): void {
            if (ReviewAfterUOMListConceptCodeData.ConceptCodes != null && ReviewAfterUOMListConceptCodeData.ConceptCodes.Count > 0) {
                if (this.ReviewAfterUOMListCombo == null) {
                    this.ReviewAfterUOMListCombo = new ObservableCollection<CListItem>();
                }
                ReviewAfterUOMListConceptCodeData.ConceptCodes.forEach( (oCListItem)=> {
                    this.ReviewAfterUOMListCombo.Add(ObjectHelper.CreateObject(new CListItem(), { Value: oCListItem.csCode, DisplayText: oCListItem.csDescription }));
                });
                if ((!String.IsNullOrEmpty(this.InfusionType) && !String.Equals(this.InfusionType, InfusionTypeCode.INTERMITTENT)) || ((!String.IsNullOrEmpty(this.InfusionType) && String.Equals(this.InfusionType, InfusionTypeCode.INTERMITTENT) && String.Equals(this.DoseType, DoseTypeCode.STEPPEDVARIABLE))) || this.IsPRN || String.Equals(this.FrequencyType, CConstants.OnceOnlyFrequency) || String.Equals(this.DoseType, DoseTypeCode.STEPPEDVARIABLE)) {
                    let ObjReviewAfterUOMList = this.ReviewAfterUOMListCombo.Where(x => x.Value == CConstants.Doses);
                    if (ObjReviewAfterUOMList != null && ObjReviewAfterUOMList.Count() > 0) {
                        this.ReviewAfterUOMListCombo.Remove(ObjReviewAfterUOMList.First());
                    }
                }
            }
        }
        public LoadDefaultValue(): void {
            if (this.ManageReviewDetail != null) {
                let IsDST: boolean, IsAmbiguous, IsInvalid;
                this.ReviewType = new ObjectInfo();
                if (this.ManageReviewDetail.oReviewAfterDetail != null) {
                    if (this.ManageReviewDetail.oReviewAfterDetail.ReviewType != null) {
                        this.ReviewTypeText = this.ManageReviewDetail.oReviewAfterDetail.ReviewType.Name;
                        this.ReviewTypeTextCode = this.ManageReviewDetail.oReviewAfterDetail.ReviewType.Code;
                    }
                    this.ReviewRequestComments = this.ManageReviewDetail.oReviewAfterDetail.ReviewRequestComments;
                    this.ReviewRequestedBy = this.ManageReviewDetail.oReviewAfterDetail.ReviewRequestedBy;
                    this.ReviewRequestedDTTM = this.ManageReviewDetail.oReviewAfterDetail.ReviewRequestedDTTM;
                    this.ReviewDTTM = this.ManageReviewDetail.oReviewAfterDetail.ReviewDueDTTM;
                }
                this.PrescriptionItemOID = this.ManageReviewDetail.PrescriptionItemOID;
                if (DateTime.NotEquals(this.ReviewDTTM, DateTime.MinValue))
                this.ReviewDTTMlabel = this.ReviewDTTM.ConvertToUser(
                    (o1) => {
                        IsDST = o1;
                    },
                    (o2) => {
                        IsAmbiguous = o2;
                    },
                    (o3) => {
                        IsInvalid = o3;
                    }
                ).ToDateTimeString(IsDST, IsAmbiguous, CConstants.LongDateWithoutSecs);
                if (DateTime.NotEquals(this.ReviewRequestedDTTM, DateTime.MinValue))
                this.ReviewRequestedDTTMlabel = this.ReviewRequestedDTTM.ConvertToUser((o1) => {
                    IsDST = o1;
                },
                    (o2) => {
                        IsAmbiguous = o2;
                    },
                    (o3) => {
                        IsInvalid = o3;
                    }
                ).ToDateTimeString(IsDST, IsAmbiguous, CConstants.LongDateWithoutSecs);
                this.CheckDurationandInfusion();
                if (this.ReviewOutcomeListOriginal != null && this.ReviewOutcomeListOriginal.Count > 0) {
                    switch (this.ReviewTypeTextCode) {
                        case CConstants.GeneralReview:
                            {
                                if (this.ReviewAfterMandatoryConfig == true) {
                                    let Fduration: number = 0;
                                    Number.TryParse(this.Duration, (o) => Fduration = o);
                                    if (Fduration <= 0 && DateTime.Equals(this.StopDTTM, DateTime.MinValue)) {
                                        let _liNoFurther: CListItem = this.ReviewOutcomeListOriginal.Where(x => String.Equals(x.Value, CConstants.Nofurtherreviewrequired, StringComparison.InvariantCultureIgnoreCase)).FirstOrDefault();
                                        if (_liNoFurther != null && !String.IsNullOrEmpty(_liNoFurther.Value)) {
                                            this.ReviewOutcomeListOriginal.Remove(_liNoFurther);
                                        }
                                        let _liNoReinstae: CListItem = this.ReviewOutcomeListOriginal.Where(x => String.Equals(x.Value, CConstants.Reinstatemedication, StringComparison.InvariantCultureIgnoreCase)).FirstOrDefault();
                                        if (_liNoReinstae != null && !String.IsNullOrEmpty(_liNoReinstae.Value)) {
                                            this.ReviewOutcomeListOriginal.Remove(_liNoReinstae);
                                        }
                                    }
                                    else {
                                        let _liNoReinstae: CListItem = this.ReviewOutcomeListOriginal.Where(x => String.Equals(x.Value, CConstants.Reinstatemedication, StringComparison.InvariantCultureIgnoreCase)).FirstOrDefault();
                                        if (_liNoReinstae != null && !String.IsNullOrEmpty(_liNoReinstae.Value)) {
                                            this.ReviewOutcomeListOriginal.Remove(_liNoReinstae);
                                        }
                                    }
                                }
                                else {
                                    let ReviewOutcomeListforGeneral = this.ReviewOutcomeListOriginal.Where(x => x.Value == CConstants.Reinstatemedication);
                                    if (ReviewOutcomeListforGeneral != null && ReviewOutcomeListforGeneral.Count() > 0) {
                                        this.ReviewOutcomeListOriginal.Remove(ReviewOutcomeListforGeneral.First());
                                    }
                                }
                                break;
                            }
                        case CConstants.OmitReview:
                            {
                                if (this.ReviewAfterMandatoryConfig == true || this.ReviewAfterMandatoryConfig == false) {
                                    let ReviewOutcomeListforOmit = this.ReviewOutcomeListOriginal.Where(x => x.Value == CConstants.Nofurtherreviewrequired);
                                    if (ReviewOutcomeListforOmit != null && ReviewOutcomeListforOmit.Count() > 0) {
                                        this.ReviewOutcomeListOriginal.Remove(ReviewOutcomeListforOmit.First());
                                    }
                                }
                                break;
                            }
                    }
                    this.ReviewOutcomeList = this.ReviewOutcomeListOriginal;
                }
                if (this.oAdminTimesVM != null && this.oAdminTimesVM.FreqDetails != null) {
                    if (this.oAdminDataforFreqDetails != null && this.oAdminDataforFreqDetails.Count > 0) {
                        this.oAdminTimesVM.FreqDetails.oFixedTimes = this.oAdminDataforFreqDetails;
                    }
                    if (this.oFrequecydetails != null) {
                        if (String.IsNullOrEmpty(this.oFrequecydetails.Type) && String.IsNullOrEmpty(this.oFrequecydetails.UOM)) {
                            this.oAdminTimesVM.FreqDetails.oFrequency.IsSunday = this.oFrequecydetails.IsSunday;
                            this.oAdminTimesVM.FreqDetails.oFrequency.IsMonday = this.oFrequecydetails.IsMonday;
                            this.oAdminTimesVM.FreqDetails.oFrequency.IsTuesday = this.oFrequecydetails.IsTuesday;
                            this.oAdminTimesVM.FreqDetails.oFrequency.IsWednesday = this.oFrequecydetails.IsWednesday;
                            this.oAdminTimesVM.FreqDetails.oFrequency.IsThursday = this.oFrequecydetails.IsThursday;
                            this.oAdminTimesVM.FreqDetails.oFrequency.IsFriday = this.oFrequecydetails.IsFriday;
                            this.oAdminTimesVM.FreqDetails.oFrequency.IsSaturday = this.oFrequecydetails.IsSaturday;
                        }
                        else {
                            this.oAdminTimesVM.FreqDetails.oFrequency = this.oFrequecydetails;
                        }
                    }
                }
                if (DateTime.NotEquals(this.CurrentDateTime, DateTime.MinValue)) {
                    this.dtCurrentDateTime = this.CurrentDateTime;
                }
                else {
                    this.dtCurrentDateTime = CommonBB.GetServerDateTime();
                }
                if (this.ManageReviewDetail.oReviewAfterDetail.ReviewOutcome != null) {
                    if (this.ReviewOutcome == null)
                        this.ReviewOutcome = new CListItem();
                    this.ReviewOutcome.Value = this.ManageReviewDetail.oReviewAfterDetail.ReviewOutcome.Code;
                    if (this.ReviewOutcomeList != null && this.ReviewOutcomeList.Count > 0) {
                        for (let i: number = 0; i < this.ReviewOutcomeList.Count; i++) {
                            if (this.ReviewOutcome.Value == this.ReviewOutcomeList[i].Value) {
                                this.ReviewOutcome.DisplayText = this.ReviewOutcomeList[i].DisplayText;
                                break;
                            }
                        }
                    }
                }
                this.ReviewOutcome = this.GetComboValue(this.ReviewOutcome, this.ReviewOutcomeList);
                if (this.ManageReviewDetail.oReviewAfterDetail.ReviewOutcomeComments != null) {
                    this.ReviewOutcomeComments = this.ManageReviewDetail.oReviewAfterDetail.ReviewOutcomeComments;
                }
                if (this.ManageReviewDetail.NewReviewAfter != null) {
                    this.ReviewPeriod = this.ManageReviewDetail.NewReviewAfter;
                    if (this.ManageReviewDetail.NewReviewAfterUOM != null) {
                        if (this.lstReviewAfterUOMCombo == null)
                            this.lstReviewAfterUOMCombo = new CListItem();
                        this.lstReviewAfterUOMCombo.Value = this.ManageReviewDetail.NewReviewAfterUOM.Code;
                        this.lstReviewAfterUOMCombo.DisplayText = this.ManageReviewDetail.NewReviewAfterUOM.Name;
                    }
                }
                this.lstReviewAfterUOMCombo = this.GetComboValue(this.lstReviewAfterUOMCombo, this.ReviewAfterUOMListCombo);
                if (DateTime.NotEquals(this.ManageReviewDetail.NewReviewAfterDTTM, DateTime.MinValue)) {
                    this.ReviewAfterDTTM = this.ManageReviewDetail.NewReviewAfterDTTM;
                }
                if (!String.IsNullOrEmpty(this.ManageReviewDetail.NewReviewRequestComments)) {
                    this.NewReviewRequestComments = this.ManageReviewDetail.NewReviewRequestComments;
                }
                if (!String.IsNullOrEmpty(this.ManageReviewDetail.oReviewAfterDetail.ReinstateReason)) {
                    this.ReinstateReason = this.ManageReviewDetail.oReviewAfterDetail.ReinstateReason;
                }
                if (!String.IsNullOrEmpty(this.ManageReviewDetail.oReviewAfterDetail.DiscontinueReason)) {
                    this.DiscontinueReason.DisplayText = this.ManageReviewDetail.oReviewAfterDetail.DiscontinueReason;
                }
            }
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
        SetProfileData(): void {
            MedicationCommonProfileData.PrescribeConfig = new PrescribingConfigData();
            if (MedicationCommonProfileData.PrescribeConfig.ReasonMandatory) {
                this.ReasonMandatory = true;
            }
            else {
                this.ReasonMandatory = true;
            }
        }
        private ReviewOutcomeValidations(): void {
            if (this.lstReviewOutcome.Value && this.lstReviewOutcome.Value != null) {
                switch (this.lstReviewOutcome.Value) {
                    case CConstants.Schedulefurtherreview:
                        {
                            this.ReviewAfterFieldVisibility = Visibility.Visible;
                            this.ReviewAfterMandatory = true;
                            this.DiscontinueReasonFieldVisibility = Visibility.Collapsed;
                            this.ReinstateReasonFieldVisibility = Visibility.Collapsed;
                            this.NewReviewRequestCommentsFieldVisibility = Visibility.Visible;
                            break;
                        }
                    case CConstants.Nofurtherreviewrequired:
                        {
                            this.ReviewAfterFieldVisibility = Visibility.Collapsed;
                            this.NewReviewRequestCommentsFieldVisibility = Visibility.Collapsed;
                            this.DiscontinueReasonFieldVisibility = Visibility.Collapsed;
                            this.ReinstateReasonFieldVisibility = Visibility.Collapsed;
                            break;
                        }
                    case CConstants.Discontinueprescriptionitem:
                        {
                            this.DiscontinueReasonFieldVisibility = Visibility.Visible;
                            if (this.ReasonMandatory == true) {
                                this.DiscontinueReasonMandatory = true;
                            }
                            else {
                                this.DiscontinueReasonMandatory = false;
                            }
                            this.ReviewAfterFieldVisibility = Visibility.Collapsed;
                            this.NewReviewRequestCommentsFieldVisibility = Visibility.Collapsed;
                            this.ReinstateReasonFieldVisibility = Visibility.Collapsed;
                            break;
                        }
                    case CConstants.Reinstatemedication:
                        {
                            this.ReinstateReasonFieldVisibility = Visibility.Visible;
                            this.ReinstateReasonMandatory = true;
                            this.ReviewAfterFieldVisibility = Visibility.Visible;
                            if (this.ReviewAfterMandatoryConfig == true) {
                                this.ReviewAfterMandatory = true;
                            }
                            else {
                                this.ReviewAfterMandatory = false;
                            }
                            if (String.Equals(this.IdentifyingType, CConstants.NONCATALOGUEITEM, StringComparison.OrdinalIgnoreCase) || String.Equals(this.IdentifyingType, CConstants.Precatalog, StringComparison.OrdinalIgnoreCase)) {
                                this.ReviewAfterMandatory = false;
                            }
                            this.DiscontinueReasonFieldVisibility = Visibility.Collapsed;
                            this.NewReviewRequestCommentsFieldVisibility = Visibility.Visible;
                            break;
                        }
                }
                this.ClearControls();
            }
        }
        ClearControls(): void {
            this.ReviewPeriod = (this.ReviewAfterFieldVisibility == Visibility.Collapsed) ? null : this.ReviewPeriod;
            this.lstReviewAfterUOMCombo = (this.ReviewAfterFieldVisibility == Visibility.Collapsed) ? null : this.lstReviewAfterUOMCombo;
            this.ReinstateReason = (this.ReinstateReasonFieldVisibility == Visibility.Collapsed) ? String.Empty : this.ReinstateReason;
            this.DiscontinueReason = (this.DiscontinueReasonFieldVisibility == Visibility.Collapsed) ? null : this.DiscontinueReason;
            this.NewReviewRequestComments = (this.NewReviewRequestCommentsFieldVisibility == Visibility.Collapsed) ? String.Empty : this.NewReviewRequestComments;
        }
        public GetreviewDate(): void {
            let dtReviewAfterdttm: DateTime= DateTime.MinValue;
            //!String.IsNullOrEmpty(this.lstReviewAfterUOMCombo.Value)
            if (!String.IsNullOrEmpty(this.ReviewPeriod) && (String.Compare(this.ReviewPeriod, "-1.79769313486232E+308") != 0) && (String.Compare(this.ReviewPeriod, "-2147483648.0") != 0) && (String.Compare(this.ReviewPeriod, "-2147483648") != 0) && (Convert.ToDouble(this.ReviewPeriod) != Number.MinValue) && this.lstReviewAfterUOMCombo != null && !String.IsNullOrEmpty(this.lstReviewAfterUOMCombo.Value)) {
                let dtStartDttm: DateTime= DateTime.MinValue;
                if (DateTime.NotEquals(this.StartDTTM, DateTime.MinValue)) {
                    dtStartDttm = this.StartDTTM;
                    if (DateTime.NotEquals(this.StartDTTM, DateTime.MinValue)) {
                        dtStartDttm = dtStartDttm.DateTime.AddTime(this.StartDTTM);
                    }
                    if (DateTime.LessThan(dtStartDttm, this.dtCurrentDateTime) && !this.lstReviewAfterUOMCombo.Value.Equals("CC_DOSES")) {
                        dtStartDttm = this.dtCurrentDateTime;
                    }
                }
                else dtStartDttm = this.dtCurrentDateTime;
                let lReviewAfter: number = Convert.ToDouble(this.ReviewPeriod);
                switch (this.lstReviewAfterUOMCombo.Value) {
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
                        let listOfDTTM: List<DateTime> = MedicationCommonBB.GetScheduleDatesForDoseDuration(dtStartDttm, this.dtCurrentDateTime, lReviewAfter, (this.oAdminTimesVM != null && this.oAdminTimesVM.FreqDetails != null) ? this.oAdminTimesVM.FreqDetails : null);
                        if (listOfDTTM != null && listOfDTTM.Count > 0) {
                            dtReviewAfterdttm = listOfDTTM.Max(o=>o);
                        }
                        break;
                }
            }
            if (DateTime.NotEquals(dtReviewAfterdttm, DateTime.MinValue)) {
                let IsDST: boolean, IsAmbiguous, IsInvalid;
                this.ReviewAfterDTTM = dtReviewAfterdttm;
            this.ReviewPeriodDTTM = dtReviewAfterdttm.ConvertToUser((o1) => {
                IsDST = o1;
            },
                (o2) => {
                    IsAmbiguous = o2;
                },
                (o3) => {
                    IsInvalid = o3;
                }).ToDateTimeString(IsDST, IsAmbiguous, CConstants.LongDateWithoutSecs);
            }
            else {
                this.ReviewAfterDTTM = DateTime.MinValue;
                this.ReviewPeriodDTTM = String.Empty;
            }
        }
        private CheckDurationandInfusion(): void {
            this.localDurationDTTM = DateTime.MinValue;
            this.localInfusionPeriodDTTM = DateTime.MinValue;
            if (this.Duration != null && !String.IsNullOrEmpty(this.DurationUOM) && !String.Equals(this.Duration, "0") && DateTime.NotEquals(this.StartDTTM, DateTime.MinValue)) {
                switch (this.DurationUOM) {
                    case "CC_MINUTES":
                        this.localDurationDTTM = this.StartDTTM.AddMinutes(Convert.ToDouble(this.Duration));
                        break;
                    case "CC_HOURS":
                        this.localDurationDTTM = this.StartDTTM.AddHours(Convert.ToDouble(this.Duration));
                        break;
                    case "CC_MEDDRSN1":
                        this.localDurationDTTM = this.StartDTTM.AddDays(Convert.ToDouble(this.Duration));
                        break;
                    case "CC_MEDDRSN2":
                        this.localDurationDTTM = this.StartDTTM.AddDays(Convert.ToDouble(this.Duration) * 7);
                        break;
                    case "CC_MEDRSN3":
                        this.localDurationDTTM = this.StartDTTM.AddMonths(Convert.ToInt32(this.Duration));
                        break;
                    case "CC_MEDRSN4":
                        this.localDurationDTTM = this.StartDTTM.AddYears(Convert.ToInt32(this.Duration));
                        break;
                }
            }
            let FInfusion: number = 0;
            Number.TryParse(this.InfusionPeriod,(o) => FInfusion = o );
            if (FInfusion > 0 && !String.IsNullOrEmpty(this.InfusionPeriodUOM) && DateTime.NotEquals(this.StartDTTM, DateTime.MinValue)) {
                switch (this.InfusionPeriodUOM) {
                    case "minute":
                        this.localInfusionPeriodDTTM = this.StartDTTM.AddMinutes(Convert.ToDouble(this.InfusionPeriod));
                        break;
                    case "hour":
                        this.localInfusionPeriodDTTM = this.StartDTTM.AddHours(Convert.ToDouble(this.InfusionPeriod));
                        break;
                    case "day":
                        this.localInfusionPeriodDTTM = this.StartDTTM.AddDays(Convert.ToDouble(this.InfusionPeriod));
                        break;
                    case "week":
                        this.localInfusionPeriodDTTM = this.StartDTTM.AddDays(Convert.ToDouble(this.InfusionPeriod) * 7);
                        break;
                    case "month":
                        this.localInfusionPeriodDTTM = this.StartDTTM.AddMonths(Convert.ToInt32(this.InfusionPeriod));
                        break;
                    case "year":
                        this.localInfusionPeriodDTTM = this.StartDTTM.AddYears(Convert.ToInt32(this.InfusionPeriod));
                        break;
                }
            }
        }
        public ReviewOutcomeValue(): IPPMAManagePrescSer.ManageReviewPeriod {
            this.ManageReviewDetail.NewReviewAfter = null;
            this.ManageReviewDetail.NewReviewAfterDTTM = DateTime.MinValue;
            this.ManageReviewDetail.NewReviewAfterUOM = null;
            this.ManageReviewDetail.NewReviewRequestComments = String.Empty;
            this.ManageReviewDetail.NewReviewType = null;
            this.ManageReviewDetail.oReviewAfterDetail.DiscontinueReason = String.Empty;
            this.ManageReviewDetail.oReviewAfterDetail.ReinstateReason = null;
            if (this.ReviewOutcome != null) {
                this.ManageReviewDetail.oReviewAfterDetail.ReviewOutcome = new IPPMAManagePrescSer.ObjectInfo();
                this.ManageReviewDetail.oReviewAfterDetail.ReviewOutcome.Name = this.ReviewOutcome.DisplayText;
                this.ManageReviewDetail.oReviewAfterDetail.ReviewOutcome.Code = this.ReviewOutcome.Value;
            }
            this.ManageReviewDetail.oReviewAfterDetail.ReviewOutcomeComments = this.ReviewOutcomeComments;
            if (String.Equals(this.ReviewOutcome.Value, CConstants.Schedulefurtherreview) || String.Equals(this.ReviewOutcome.Value, CConstants.Reinstatemedication)) {
                this.ManageReviewDetail.NewReviewAfter = this.ReviewPeriod;
                if (this.lstReviewAfterUOMCombo != null) {
                    this.ManageReviewDetail.NewReviewAfterUOM = new IPPMAManagePrescSer.ObjectInfo();
                    this.ManageReviewDetail.NewReviewAfterUOM.Name = this.lstReviewAfterUOMCombo.DisplayText;
                    this.ManageReviewDetail.NewReviewAfterUOM.Code = this.lstReviewAfterUOMCombo.Value;
                }
                this.ManageReviewDetail.NewReviewAfterDTTM = this.ReviewAfterDTTM;
                this.ManageReviewDetail.NewReviewRequestComments = this.NewReviewRequestComments;
            }
            if (String.Equals(this.ReviewOutcome.Value, CConstants.Reinstatemedication)) {
                if (this.ReinstateReason != null) {
                    this.ManageReviewDetail.oReviewAfterDetail.ReinstateReason = this.ReinstateReason;
                }
            }
            if (String.Equals(this.ReviewOutcome.Value, CConstants.Discontinueprescriptionitem)) {
                if (this.DiscontinueReason != null) {
                    this.ManageReviewDetail.oReviewAfterDetail.DiscontinueReason = this.DiscontinueReason.DisplayText;
                }
            }
            if (this.ReviewType != null) {
                this.ManageReviewDetail.NewReviewType = new IPPMAManagePrescSer.ObjectInfo();
                if (this.ReviewOutcome != null && !String.IsNullOrEmpty(this.ReviewOutcome.Value) && String.Equals(this.ReviewOutcome.Value, CConstants.Reinstatemedication, StringComparison.InvariantCultureIgnoreCase) && this.ReviewPeriod != null && DateTime.NotEquals(this.ReviewAfterDTTM, DateTime.MinValue)) {
                    this.ManageReviewDetail.NewReviewType.Name = "General review";
                    this.ManageReviewDetail.NewReviewType.Code = CConstants.GeneralReview;
                }
                else {
                    this.ManageReviewDetail.NewReviewType.Name = this.ManageReviewDetail.oReviewAfterDetail.ReviewType.Name;
                    this.ManageReviewDetail.NewReviewType.Code = this.ManageReviewDetail.oReviewAfterDetail.ReviewType.Code;
                }
            }
            if (this.PrescriptionItemOID > 0) {
                this.ManageReviewDetail.oReviewAfterDetail.PrescriptionItemOID = this.PrescriptionItemOID;
                this.ManageReviewDetail.PrescriptionItemOID = this.PrescriptionItemOID;
            }
            return this.ManageReviewDetail;
        }
        public IdentifyingType: string;
    }
