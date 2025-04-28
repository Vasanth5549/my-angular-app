import { Component, OnInit, EventEmitter } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, CommonBB, ProcessRTE } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, CListItem, Visibility, RTEEventargs, List } from 'epma-platform/models';
import { AppDialog, GridLength } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ClonableViewModelBase } from '../model/cloneviewmodel';
import { ConditionalDose } from '../model/conditionaldose';
import * as IPPManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS'
import { CReqMsgGetConditionalDoseRegime, CResMsgGetConditionalDoseRegime, GetConditionalDoseRegimeCompletedEventArgs, MedicationAdministrationWSSoapClient } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { CConstants, ValueDomain } from '../utilities/constants';
import { WebServiceURLMedicationCommonBB } from '../utilities/globalvariable';
import { PrescriptionLineItemVM } from '../utilities/lineitemconstructor';
import { Resource } from '../resource';
import 'epma-platform/booleanextension';
import 'epma-platform/numberextension';
import 'epma-platform/stringextension';
import {iMath} from 'epma-platform/mathextension';
import 'epma-platform/arrayextension';

    export class ConditionalDoseVM extends ClonableViewModelBase {
        public CallingPage: string;
        private RequestedCA: RequestSource;
        private _definedConditions: ObservableCollection<ConditionalDose> = new ObservableCollection<ConditionalDose>();
        private _selectedCondition: ConditionalDose;
        public lnPrescriptionItemOID: number = 0;
        private _doseDiscrepancyReasons: ObservableCollection<CListItem>;
        private _selectedDoseDiscrepancy: CListItem = null;
        //public delegate void ErrorEventArgs(long ErrorNumber, string ErrorMessage, string ContronID);
        public OnErrorEvent: Function;
        private _drugName: string;
        private _clinicalIncidentLinkText: string;
        private bIsParallelAmend: boolean = false;
        private _isVisibleOtherDose: Visibility = Visibility.Visible;
        public get IsVisibleOtherDose(): Visibility {
            return this._isVisibleOtherDose;
        }
        public set IsVisibleOtherDose(value: Visibility) {
            if (this._isVisibleOtherDose != value) {
                this._isVisibleOtherDose = value;
               //NotifyPropertyChanged("IsVisibleOtherDose");
            }
        }
        private _MonitoringPerid: string;
        public RangeOperators: ObservableCollection<CListItem>;
        public get MonitorigPerid(): string {
            return this._MonitoringPerid;
        }
        public set MonitorigPerid(value: string) {
            this._MonitoringPerid = value;
           //NotifyPropertyChanged("MonitorigPerid");
        }
        private _IsMonitoringPeriodvisible: Visibility = Visibility.Collapsed;
        public get IsMonitoringPeriodvisible(): Visibility {
            return this._IsMonitoringPeriodvisible;
        }
        public set IsMonitoringPeriodvisible(value: Visibility) {
            this._IsMonitoringPeriodvisible = value;
           //NotifyPropertyChanged("IsMonitoringPeriodvisible");
        }
        GetConditionalDoseRegimeCompleted=new EventEmitter();
        constructor(oVM ?: any|RequestSource);
        constructor(Source?: any|RequestSource, PrescriptionItemOID?: number, LatestObsResValReq?: boolean);
        constructor(Source?: any|RequestSource, PrescriptionItemOID?: number, isAmend?: boolean, LatestObsResValReq?: boolean);
        constructor(Source?: any|RequestSource, PrescriptionItemOID?: number, isAmend?: boolean, LatestObsResValReq: boolean = false){
            super();            
            switch (arguments.length) {
                case 1:
                    let oVM: any = Source as any
                    let oLineItemVM: PrescriptionLineItemVM = ObjectHelper.CreateType<PrescriptionLineItemVM>(oVM, PrescriptionLineItemVM);
                    this.FillCondDoseRegime(oLineItemVM.oDoseRegime);
                    break;
                case 2:
                    this.RequestedCA = <RequestSource>Source;
                    this.lnPrescriptionItemOID = PrescriptionItemOID;
                    this.LatestObsResDetailsReq = LatestObsResValReq;
                    this.FillConditionalDoseaRegime();
                    if (this.RequestedCA == RequestSource.RecordAdmin || this.RequestedCA == RequestSource.ModifyAdmin)
                        ProcessRTE.GetValuesByDomainCode(ValueDomain.DoseDiscrepancyValueDomainCode, (s, e) => { this.OnRTEResult(s); });
                    break;
                case 3:
                    this.RequestedCA = <RequestSource>Source;
                    this.lnPrescriptionItemOID = PrescriptionItemOID;
                    this.LatestObsResDetailsReq = LatestObsResValReq;
                    this.FillConditionalDoseaRegime();
                    if (this.RequestedCA == RequestSource.RecordAdmin || this.RequestedCA == RequestSource.ModifyAdmin)
                        ProcessRTE.GetValuesByDomainCode(ValueDomain.DoseDiscrepancyValueDomainCode, (s, e) => { this.OnRTEResult(s); });
                    break;
                case 4:
                    this.RequestedCA = Source as RequestSource;
                    this.lnPrescriptionItemOID = PrescriptionItemOID;
                    this.LatestObsResDetailsReq = LatestObsResValReq;
                    this.FillConditionalDoseaRegime();
                    this.bIsParallelAmend = isAmend;
                    if (this.RequestedCA == RequestSource.RecordAdmin || this.RequestedCA == RequestSource.ModifyAdmin)
                        ProcessRTE.GetValuesByDomainCode(ValueDomain.DoseDiscrepancyValueDomainCode, (s, e) => { this.OnRTEResult(s); });
                    break;
            }
        }
        // constructor(oVM: Object) {
        //     let oLineItemVM: PrescriptionLineItemVM = ObjectHelper.CreateType<PrescriptionLineItemVM>(oVM, PrescriptionLineItemVM);
        //     FillCondDoseRegime(oLineItemVM.oDoseRegime);
        // }
        // constructor(Source: RequestSource, PrescriptionItemOID: number, LatestObsResValReq: boolean = false) {
        //     this.RequestedCA = Source;
        //     this.lnPrescriptionItemOID = PrescriptionItemOID;
        //     this.LatestObsResDetailsReq = LatestObsResValReq;
        //     this.FillConditionalDoseaRegime();
        //     if (this.RequestedCA == RequestSource.RecordAdmin || this.RequestedCA == RequestSource.ModifyAdmin)
        //         ProcessRTE.GetValuesByDomainCode(ValueDomain.DoseDiscrepancyValueDomainCode, (s,e) => {OnRTEResult(s);});
        // }
        // constructor(Source: RequestSource, PrescriptionItemOID: number, isAmend: boolean, LatestObsResValReq: boolean = false) {
        //     this.RequestedCA = Source;
        //     this.lnPrescriptionItemOID = PrescriptionItemOID;
        //     this.LatestObsResDetailsReq = LatestObsResValReq;
        //     this.FillConditionalDoseaRegime();
        //     this.bIsParallelAmend = isAmend;
        //     if (this.RequestedCA == RequestSource.RecordAdmin || this.RequestedCA == RequestSource.ModifyAdmin)
        //         ProcessRTE.GetValuesByDomainCode(ValueDomain.DoseDiscrepancyValueDomainCode, (s,e) => {OnRTEResult(s);});
        // }
        OnRTEResult(args: RTEEventargs): void {
            if (String.IsNullOrEmpty(args.Request) || args.Result == null)
                return;
            if (String.Compare(args.Request, ValueDomain.DoseDiscrepancyValueDomainCode) == 0) {
                this.DoseDiscrepancyReasons = new ObservableCollection<CListItem>();
                //TH
                let argResult: List<CListItem> = (<List<CListItem>>args.Result);
                let nCount: number = argResult.Count;
                for (let i: number = 0; i < nCount; i++) 
                {
                    if (!this.bIsParallelAmend && String.Compare(argResult[i].Value, "CC_AMENDPRESRSN", StringComparison.OrdinalIgnoreCase) == 0)
                        continue;
                    this.DoseDiscrepancyReasons.Add(argResult[i]);
                    if (this.bIsParallelAmend && String.Compare(argResult[i].Value, "CC_AMENDPRESRSN", StringComparison.OrdinalIgnoreCase) == 0) {
                        this.DoseDiscrepancyReasons.forEach( (oRsnCode)=> {
                            if (argResult[i].Value == oRsnCode.Value)
                                this.SelectedDoseDiscrepancy = oRsnCode;
                        });
                    }
                 }
                 /*
                (<List<CListItem>>args.Result).forEach( (oCListItem)=> {
                    if (!this.bIsParallelAmend && String.Compare(oCListItem.Value, "CC_AMENDPRESRSN", StringComparison.OrdinalIgnoreCase) == 0)
                        continue;
                    this.DoseDiscrepancyReasons.Add(oCListItem);
                    if (this.bIsParallelAmend && String.Compare(oCListItem.Value, "CC_AMENDPRESRSN", StringComparison.OrdinalIgnoreCase) == 0) {
                        this.DoseDiscrepancyReasons.forEach( (oRsnCode)=> {
                            if (oCListItem.Value == oRsnCode.Value)
                                this.SelectedDoseDiscrepancy = oRsnCode;
                        });
                    }
                });
                */
                this.CloneConditionalDose();
            }
        }
        public get DrugName(): string {
            return this._drugName;
        }
        public set DrugName(value: string) {
            this._drugName = value;
           //NotifyPropertyChanged("DrugName");
        }
        public get DefinedConditions(): ObservableCollection<ConditionalDose> {
            return this._definedConditions;
        }
        public set DefinedConditions(value: ObservableCollection<ConditionalDose>) {
            //if (value != this._definedConditions) {
                //this._definedConditions = value;
                this._definedConditions.CopyFrom(value);
            //NotifyPropertyChanged("DefinedConditions");
            //}
        }
        public get SelectedConditionalDose(): ConditionalDose {
            return this._selectedCondition;
        }
        public set SelectedConditionalDose(value: ConditionalDose) {
            this._selectedCondition = value;
           //NotifyPropertyChanged("SelectedConditionalDose");
        }
        private _isOtherDose: boolean = false;
        private _otherDoseValue: string ="";
        private _isClinicalIncidentVisible: Visibility = Visibility.Collapsed;
        private _clinicalIncidentRowHeight: GridLength;
        private _otherDoseUoM: string;
        private _otherDoseUoMOID: number = 0;
        private _observationResult: string;
        public get ObservationResult(): string {
            return this._observationResult;
        }
        public set ObservationResult(value: string) {
            if (String.Compare(this._observationResult, value) != 0) {
                this._observationResult = value;
               //NotifyPropertyChanged("ObservationResult");
            }
        }
        public get IsGridEnable(): boolean {
            if (this.IsVisibleOtherDose == Visibility.Collapsed) {
                return true;
            }
            else {
                return !this._isOtherDose;
            }
        }
        public set IsGridEnable(value: boolean) {
            this._isOtherDose = !value;
        }
        public get IsOtherDose(): boolean {
            return this._isOtherDose;
        }
        public set IsOtherDose(value: boolean) {
            if (this._isOtherDose != value) {
                this._isOtherDose = value;
               //NotifyPropertyChanged("IsOtherDose");
               //NotifyPropertyChanged("IsGridEnable");
                if (!this._isOtherDose) {
                    this.OtherDoseValue = String.Empty;
                    this.SelectedDoseDiscrepancy = null;
                }
                else {
                    this.SelectedConditionalDose = null;
                }
            }
        }
        public get OtherDoseValue(): string {
            return this._otherDoseValue;
        }
        public set OtherDoseValue(value: string) {
            if (String.Compare(value, this._otherDoseValue) != 0) {
                this._otherDoseValue = value;
               //NotifyPropertyChanged("OtherDoseValue");
            }
        }
        public get OtherDoseUoM(): string {
            return this._otherDoseUoM;
        }
        public set OtherDoseUoM(value: string) {
            if (String.Compare(value, this._otherDoseUoM) != 0) {
                this._otherDoseUoM = value;
               //NotifyPropertyChanged("OtherDoseUoM");
            }
        }
        public get OtherDoseUoMOID(): number {
            return this._otherDoseUoMOID;
        }
        public set OtherDoseUoMOID(value: number) {
            this._otherDoseUoMOID = value;
           //NotifyPropertyChanged("OtherDoseUoMOID");
        }
        public get IsClinicalIncidentVisible(): Visibility {
            return this._isClinicalIncidentVisible;
        }
        public set IsClinicalIncidentVisible(value: Visibility) {
            this._isClinicalIncidentVisible = value;
           //NotifyPropertyChanged("IsClinicalIncidentVisible");
            if (this._isClinicalIncidentVisible == Visibility.Visible) {
                this.ClinicalIncidentRowHeight = new GridLength(30);
            }
            else {
                this.ClinicalIncidentRowHeight = new GridLength(0);
            }
        }
        public get ClinicalIncidentLinkText(): string {
            return this._clinicalIncidentLinkText;
        }
        public set ClinicalIncidentLinkText(value: string) {
            if (String.Compare(this._clinicalIncidentLinkText, value) != 0) {
                this._clinicalIncidentLinkText = value;
               //NotifyPropertyChanged("ClinicalIncidentLinkText");
            }
        }
        public get ClinicalIncidentRowHeight(): GridLength {
            return this._clinicalIncidentRowHeight;
        }
        public set ClinicalIncidentRowHeight(value: GridLength) {
            this._clinicalIncidentRowHeight = value;
           //NotifyPropertyChanged("ClinicalIncidentRowHeight");
        }
        public get DoseDiscrepancyReasons(): ObservableCollection<CListItem> {
            return this._doseDiscrepancyReasons;
        }
        public set DoseDiscrepancyReasons(value: ObservableCollection<CListItem>) {
            this._doseDiscrepancyReasons = value;
           //NotifyPropertyChanged("DoseDiscrepancyReasons");
        }
        public get SelectedDoseDiscrepancy(): CListItem {
            return this._selectedDoseDiscrepancy;
        }
        public set SelectedDoseDiscrepancy(value: CListItem) {
            if (value != null)
                this._selectedDoseDiscrepancy = this.GetComboValue(value, this.DoseDiscrepancyReasons);
            else this._selectedDoseDiscrepancy = value;
           //NotifyPropertyChanged("SelectedDoseDiscrepancy");
        }
        public GetComboValue(oListItem: CListItem, oListCollection: ObservableCollection<CListItem>): CListItem {
            if (oListItem != null && oListCollection != null) {
                let selectedVal: CListItem = null;
                for(let i=0;i<oListCollection.Count; i++){
                    let oItem: CListItem = oListCollection[i];
              
                    if (oItem.Value == oListItem.Value) {
                        selectedVal = oItem;
                        break;
                    }
                }
                if (selectedVal != null) {
                    oListItem = selectedVal;
                }
                else if (!String.IsNullOrEmpty(oListItem.DisplayText)) {
                    oListCollection.Add(oListItem);
                }
            }
            return oListItem;
        }
        private _latestobservationResult: string;
        public get LatestObservationResult(): string {
            return this._latestobservationResult;
        }
        public set LatestObservationResult(value: string) {
            if (String.Compare(this._latestobservationResult, value) != 0) {
                this._latestobservationResult = value;
               //NotifyPropertyChanged("LatestObservationResult");
            }
        }
        private _latestobservationResultDetails: string;
        public get LatestObservationResultDetails(): string {
            return this._latestobservationResultDetails;
        }
        public set LatestObservationResultDetails(value: string) {
            if (String.Compare(this._latestobservationResultDetails, value) != 0) {
                this._latestobservationResultDetails = value;
               //NotifyPropertyChanged("LatestObservationResultDetails");
            }
        }
        private _EntityCode: string;
        public get EntityCode(): string {
            return this._EntityCode;
        }
        public set EntityCode(value: string) {
            if (String.Compare(this._EntityCode, value) != 0) {
                this._EntityCode = value;
               //NotifyPropertyChanged("EntityCode");
            }
        }
        private _PresItemStartDTTM: DateTime = DateTime.MinValue;
        public get PresItemStartDTTM(): DateTime{
            return this._PresItemStartDTTM;
        }
        public set PresItemStartDTTM(value: DateTime) {
            if (this._PresItemStartDTTM != value) {
                this._PresItemStartDTTM = value;
               //NotifyPropertyChanged("PresItemStartDTTM");
            }
        }
        private _ItmType: string;
        public get ItmType(): string {
            return this._ItmType;
        }
        public set ItmType(value: string) {
            if (String.Compare(this._ItmType, value) != 0) {
                this._ItmType = value;
               //NotifyPropertyChanged("ItmType");
            }
        }
        private _LatestObsResDetailsReq: boolean = false;
        public get LatestObsResDetailsReq(): boolean {
            return this._LatestObsResDetailsReq;
        }
        public set LatestObsResDetailsReq(value: boolean) {
            this._LatestObsResDetailsReq = value;
           //NotifyPropertyChanged("LatestObsResDetailsReq");
        }
        public CloneConditionalDose(): void {
            if (this.CareTaker.Memento != null && this.CareTaker.Memento.Count > 0)
                this.CareTaker.Memento.Clear();
            this.CareTaker.Memento.Add(this.Clone);
        }
        public RestoreConditionalDose(): void {
            if (this != null && this.CareTaker.Memento != null && this.CareTaker.Memento.Count != 0)
                this.Restore(this.CareTaker.Memento[0]);
        }
        public FillCondDoseRegime(oDoseRegime: ObservableCollection<IPPManagePrescSer.DoseRegime>): void {
            this.DefinedConditions = new ObservableCollection<ConditionalDose>();
            if (oDoseRegime != null && oDoseRegime.Count > 0) {
                (oDoseRegime as ObservableCollection<IPPManagePrescSer.IPPDoseRegime>).forEach( (oDoseDet)=> {
                    if (oDoseDet != null && oDoseDet.oConditionalDoseRegime != null) {
                        let nLen: number = oDoseDet.oConditionalDoseRegime.Count;
                        let Cond: ConditionalDose;
                        let dDose: number;
                        let dUDose: number;
                        for (let i: number = 0; i < nLen; i++) {
                            if (oDoseDet.oConditionalDoseRegime[i] == null)
                                continue;
                            Cond = ObjectHelper.CreateObject(new ConditionalDose(), {
                                RangeOperator: !String.IsNullOrEmpty(oDoseDet.oConditionalDoseRegime[i].ValueRangeOpratorText) ? oDoseDet.oConditionalDoseRegime[i].ValueRangeOpratorText : oDoseDet.oConditionalDoseRegime[i].ValueRange,
                                ObservationResult: oDoseDet.oConditionalDoseRegime[i].AddlItemName,
                                LowerRange: oDoseDet.oConditionalDoseRegime[i].LowerValue,
                                UpperRange: oDoseDet.oConditionalDoseRegime[i].UpperValue,
                                Instruction: oDoseDet.oConditionalDoseRegime[i].Instruction,
                                InfRate: oDoseDet.InfusionRate,
                                InfUpperRate: (!String.IsNullOrEmpty(oDoseDet.UpperRate)) ? oDoseDet.UpperRate : String.Empty,
                                InfNumUOM: (oDoseDet.InfusionRateNumUOM != null ? oDoseDet.InfusionRateNumUOM.UOMName : String.Empty),
                                InfDenumUOM: (oDoseDet.InfusionRateDenUOM != null ? oDoseDet.InfusionRateDenUOM.UOMName : String.Empty)
                            });
                            this.ObservationResult = Cond.ObservationResult;
                            if (Number.TryParse(oDoseDet.oConditionalDoseRegime[i].Dose, (o)=>{dDose=o;}) && (dDose > 0 || (!String.IsNullOrEmpty(oDoseDet.oConditionalDoseRegime[i].UpperDose) && dDose >= 0)))
                                Cond.Dose = dDose.ToString();
                            if (Number.TryParse(oDoseDet.oConditionalDoseRegime[i].UpperDose, (o)=>{dUDose=o;}) && dUDose > 0)
                                Cond.UpperDose = dUDose.ToString();
                            if (oDoseDet.oConditionalDoseRegime[i].ValueUOM != null && !String.IsNullOrEmpty(oDoseDet.oConditionalDoseRegime[i].ValueUOM.UOMName)) {
                                Cond.RangeUoM = oDoseDet.oConditionalDoseRegime[i].ValueUOM.UOMName;
                            }
                            if (oDoseDet.oConditionalDoseRegime[i].DoseUOM != null) {
                                if (!String.IsNullOrEmpty(oDoseDet.oConditionalDoseRegime[i].DoseUOM.UOMName)) {
                                    this.OtherDoseUoM = Cond.DoseUoM = oDoseDet.oConditionalDoseRegime[i].DoseUOM.UOMName;
                                    this.OtherDoseUoMOID = Cond.DoseUoMOID = oDoseDet.oConditionalDoseRegime[i].DoseUOM.UOMId;
                                }
                            }
                            if (!String.IsNullOrEmpty(oDoseDet.oConditionalDoseRegime[i].Rate)) {
                                Cond.InfRate = oDoseDet.oConditionalDoseRegime[i].Rate;
                            }
                            if (!String.IsNullOrEmpty(oDoseDet.oConditionalDoseRegime[i].UpperRate)) {
                                Cond.InfUpperRate = oDoseDet.oConditionalDoseRegime[i].UpperRate;
                            }
                            if (oDoseDet.oConditionalDoseRegime[i].RateUOMOID != null) {
                                if (!String.IsNullOrEmpty(oDoseDet.oConditionalDoseRegime[i].RateUOMOID.UOMName)) {
                                    Cond.InfNumUOM = oDoseDet.oConditionalDoseRegime[i].RateUOMOID.UOMName;
                                    Cond.InfNumUoMOID = oDoseDet.oConditionalDoseRegime[i].RateUOMOID.UOMId;
                                }
                            }
                            if (oDoseDet.oConditionalDoseRegime[i].RateDenaminatorUOMOID != null) {
                                if (!String.IsNullOrEmpty(oDoseDet.oConditionalDoseRegime[i].RateDenaminatorUOMOID.UOMName)) {
                                    Cond.InfDenumUOM = oDoseDet.oConditionalDoseRegime[i].RateDenaminatorUOMOID.UOMName;
                                    Cond.InfDenumUMOID = oDoseDet.oConditionalDoseRegime[i].RateDenaminatorUOMOID.UOMId;
                                }
                            }
                            if (oDoseDet.Quantity != null && !String.IsNullOrEmpty(oDoseDet.Quantity.UOMCode)) {
                                this.MonitorigPerid = oDoseDet.Quantity.UOMCode + " " + oDoseDet.Quantity.UOMName;
                            }
                            this.DefinedConditions.Add(Cond);
                        }
                    }
                });
            }
            this.CloneConditionalDose();
        }
        public FillConditionalDoseaRegime(): void {
            let oReq: CReqMsgGetConditionalDoseRegime = ObjectHelper.CreateObject(new CReqMsgGetConditionalDoseRegime(), {
                oContextInformation: CommonBB.FillContext(),
                PrescriptionItemOIDBC: this.lnPrescriptionItemOID,
                PatientOIDBC: PatientContext.PatientOID,
                EncounterOIDBC: PatientContext.EncounterOid,
                LatestObsResValueReqBC: this.LatestObsResDetailsReq
            });
            let serviceProxy: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
            serviceProxy.GetConditionalDoseRegimeCompleted  = (s,e) => { this.serviceProxy_GetConditionalDoseRegimeCompleted(s,e); } ;
            serviceProxy.GetConditionalDoseRegimeAsync(oReq);
        }
        serviceProxy_GetConditionalDoseRegimeCompleted(sender: Object, e: GetConditionalDoseRegimeCompletedEventArgs): void {
            this.DefinedConditions = new ObservableCollection<ConditionalDose>();
            if (e.Error != null || e.Result == null)
                return
            let oRes: CResMsgGetConditionalDoseRegime = e.Result;
            if (oRes.CondDoseRegime != null && oRes.CondDoseRegime.ConditionalDoseRegimeDet != null && oRes.CondDoseRegime.ConditionalDoseRegimeDet.Count > 0) {
                let nLen: number = oRes.CondDoseRegime.ConditionalDoseRegimeDet.Count;
                let Cond: ConditionalDose;
                let dDose: number;
                let dUDose: number;
                if (oRes.CondDoseRegime.PatLatestObsResValue != null && !String.IsNullOrEmpty(oRes.CondDoseRegime.PatLatestObsResValue.EntityDetails) && DateTime.NotEquals(oRes.CondDoseRegime.PatLatestObsResValue.RecordedDate, DateTime.MinValue) && DateTime.GreaterThanOrEqualTo(oRes.CondDoseRegime.PatLatestObsResValue.RecordedDate, oRes.CondDoseRegime.PresItemStatDTTM))
                    this.LatestObservationResultDetails = oRes.CondDoseRegime.PatLatestObsResValue.EntityDetails + " on " + oRes.CondDoseRegime.PatLatestObsResValue.RecordedDate.ToString(CConstants.LongDateWithoutSecs);
                else this.LatestObservationResultDetails = Resource.steppeddose.NotYetRecorded_Text;
                this.PresItemStartDTTM = oRes.CondDoseRegime.PresItemStatDTTM;
                if (oRes.CondDoseRegime.PatLatestObsResValue != null) {
                    this.EntityCode = oRes.CondDoseRegime.PatLatestObsResValue.EntityCode;
                    this.ItmType = oRes.CondDoseRegime.PatLatestObsResValue.EntityType;
                }
                for (let i: number = 0; i < nLen; i++) {
                    if (oRes.CondDoseRegime.ConditionalDoseRegimeDet[i] == null)
                        continue;
                    Cond = ObjectHelper.CreateObject(new ConditionalDose(), {
                        RangeOperator: oRes.CondDoseRegime.ConditionalDoseRegimeDet[i].ValueRange,
                        ObservationResult: oRes.CondDoseRegime.ConditionalDoseRegimeDet[i].AddlItemName,
                        LowerRange: oRes.CondDoseRegime.ConditionalDoseRegimeDet[i].LowerValue,
                        UpperRange: oRes.CondDoseRegime.ConditionalDoseRegimeDet[i].UpperValue,
                        Instruction: oRes.CondDoseRegime.ConditionalDoseRegimeDet[i].Instruction
                    });
                    this.ObservationResult = Cond.ObservationResult;
                    this.LatestObservationResult = Resource.steppeddose.Patient + " " + Cond.ObservationResult + " : ";
                    if (Number.TryParse(oRes.CondDoseRegime.ConditionalDoseRegimeDet[i].UpperDose, (o)=>{dUDose=o;}) && dUDose > 0) {
                        if (Number.TryParse(oRes.CondDoseRegime.ConditionalDoseRegimeDet[i].Dose, (o)=>{dDose=o;}) && dDose >= 0)
                            Cond.Dose = dDose.ToString();
                        Cond.UpperDose = dUDose.ToString();
                    }
                    else if (Number.TryParse(oRes.CondDoseRegime.ConditionalDoseRegimeDet[i].Dose, (o)=>{dDose=o;}) && dDose > 0)
                        Cond.Dose = dDose.ToString();
                    if (oRes.CondDoseRegime.ConditionalDoseRegimeDet[i].ValueUOM != null && !String.IsNullOrEmpty(oRes.CondDoseRegime.ConditionalDoseRegimeDet[i].ValueUOM.UOMName)) {
                        Cond.RangeUoM = oRes.CondDoseRegime.ConditionalDoseRegimeDet[i].ValueUOM.UOMName;
                    }
                    if (oRes.CondDoseRegime.ConditionalDoseRegimeDet[i].DoseUOM != null) {
                        if (!String.IsNullOrEmpty(oRes.CondDoseRegime.ConditionalDoseRegimeDet[i].DoseUOM.UOMName)) {
                            this.OtherDoseUoM = Cond.DoseUoM = oRes.CondDoseRegime.ConditionalDoseRegimeDet[i].DoseUOM.UOMName;
                            this.OtherDoseUoMOID = Cond.DoseUoMOID = oRes.CondDoseRegime.ConditionalDoseRegimeDet[i].DoseUOM.UOMId;
                        }
                    }
                    if (!String.IsNullOrEmpty(oRes.CondDoseRegime.ConditionalDoseRegimeDet[i].Rate)) {
                        Cond.InfRate = oRes.CondDoseRegime.ConditionalDoseRegimeDet[i].Rate;
                    }
                    if (!String.IsNullOrEmpty(oRes.CondDoseRegime.ConditionalDoseRegimeDet[i].UpperRate)) {
                        Cond.InfUpperRate = oRes.CondDoseRegime.ConditionalDoseRegimeDet[i].UpperRate;
                    }
                    if (oRes.CondDoseRegime.ConditionalDoseRegimeDet[i].RateUOMOID != null) {
                        if (!String.IsNullOrEmpty(oRes.CondDoseRegime.ConditionalDoseRegimeDet[i].RateUOMOID.UOMName)) {
                            Cond.InfNumUOM = oRes.CondDoseRegime.ConditionalDoseRegimeDet[i].RateUOMOID.UOMName;
                            Cond.InfNumUoMOID = oRes.CondDoseRegime.ConditionalDoseRegimeDet[i].RateUOMOID.UOMId;
                        }
                    }
                    if (oRes.CondDoseRegime.ConditionalDoseRegimeDet[i].RateDenaminatorUOMOID != null) {
                        if (!String.IsNullOrEmpty(oRes.CondDoseRegime.ConditionalDoseRegimeDet[i].RateDenaminatorUOMOID.UOMName)) {
                            Cond.InfDenumUOM = oRes.CondDoseRegime.ConditionalDoseRegimeDet[i].RateDenaminatorUOMOID.UOMName;
                            Cond.InfDenumUMOID = oRes.CondDoseRegime.ConditionalDoseRegimeDet[i].RateDenaminatorUOMOID.UOMId;
                        }
                    }
                    if (!String.IsNullOrEmpty(oRes.CondDoseRegime.ConditionalDoseRegimeDet[i].SealType)) {
                        this.MonitorigPerid = oRes.CondDoseRegime.ConditionalDoseRegimeDet[i].SealType;
                    }
                    this.DefinedConditions.Add(Cond);
                }
            }
            this.CloneConditionalDose();
            this.GetConditionalDoseRegimeCompleted.emit(true);
        }
        public Validate(): boolean {
            let bReturnValue: boolean = false;
            let lnErrorID: number = -1;
            let sErrorMsg: string = String.Empty;
            let sCtrlName: string = String.Empty;
            if (this.IsOtherDose) {
                let dDose: number;
                Number.TryParse(this.OtherDoseValue, (o)=>{dDose=o;});
                if (dDose == 0) {
                    lnErrorID = 1;
                    sErrorMsg = "Dose value cannot be zero or empty.";
                    sCtrlName = "txtOtherDoseValue";
                    bReturnValue = false;
                }
                else if (this.SelectedDoseDiscrepancy == null || String.IsNullOrEmpty(this.SelectedDoseDiscrepancy.Value)) {
                    lnErrorID = 2;
                    sErrorMsg = "Select dose discrepancy reason, this field is mandatory";
                    sCtrlName = "cboDiscrepancyReason";
                    bReturnValue = false;
                }
                else {
                    bReturnValue = true;
                }
            }
            else if (this.SelectedConditionalDose == null) {
                lnErrorID = 3;
                sErrorMsg = "Dose has not been specified. Please select or specify a dose value in order to proceed.";
                sCtrlName = "grdConditionalDose";
                bReturnValue = false;
            }
            else {
                bReturnValue = true;
            }
            if (!bReturnValue && this.OnErrorEvent != null)
                this.OnErrorEvent(lnErrorID, sErrorMsg, sCtrlName);
            return bReturnValue;
        }
    }

        export enum RequestSource {
            ViewDrugDetails="ViewDrugDetails",

            RecordAdmin="RecordAdmin",

            ModifyAdmin="ModifyAdmin"
        }
    