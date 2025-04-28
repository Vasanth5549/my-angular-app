import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, ProcessRTE, iBusyIndicator } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, CListItem, Visibility, List, RelayCommand, RTEEventargs, HtmlPage } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { CConstants, ValueDomain } from '../utilities/constants';
import { Dictionary } from 'epma-platform/dictionary';
import { DCOverridereasonConceptCodes, DCReqDoseSecondUOMConceptCodes, MedicationCommonProfileData } from '../utilities/profiledata';
import { CommonDomainValues } from '../utilities/globalvariable';
import { AppSessionInfo, ContextInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import * as IPPMAManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS'
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { Resource } from '../resource';
import { MedicationCommonBB } from '../utilities/medicationcommonbb';
import * as Application from 'src/app/lorappcommonbb/amshelper';
import { CReqMsgGetAllOptions, CResMsgGetAllOptions, GetAllOptionsCompletedEventArgs, ManagePrescriptionWSSoapClient } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { CConstants as CommonBBConstant} from 'src/app/lorappcommonbb/utilities/cconstants';
import { Color, Colors, SolidColorBrush } from 'src/app/shared/epma-platform/controls/Control';
import { CValuesetTerm } from 'src/app/shared/epma-platform/soap-client/CReferenceWS';
import 'epma-platform/booleanextension';
import 'epma-platform/numberextension';
import 'epma-platform/stringextension';
import {iMath as Math} from 'epma-platform/mathextension';
import 'epma-platform/arrayextension';

    export class DoseCalcVM extends ViewModelBase {
        //static FocusEventArgs: any;
        constructor(RTEResult?:any) {
            super();
            if(RTEResult){
                this.OnRTEResult(RTEResult);
            } else{
            	this.GetDomainCombo();
            }
        }
        public oDoseCalcDefault: DoseCalcDefault;
        //public delegate void FocusEventArgs(string ContronID);
        public OnFocusEvent: Function;
        public AdjfactorAdjBWcalc: number = 0;
        public IdealBodyWeightPercentageExceeds: number = 0;
        private oBSAFormulaList: ObservableCollection<CListItem>;
        public get BSAFormulaList(): ObservableCollection<CListItem> {
            return this.oBSAFormulaList;
        }
        public set BSAFormulaList(value: ObservableCollection<CListItem>) {
            if (this.oBSAFormulaList != value) {
                this.oBSAFormulaList = value;
               //NotifyPropertyChanged("BSAFormulaList");
            }
        }
        private lstBSAFormula: CListItem;
        public get BSAFormula(): CListItem {
            return this.lstBSAFormula;
        }
        public set BSAFormula(value: CListItem) {
            if (!ObjectHelper.ReferenceEquals(this.lstBSAFormula, value)) {
                this.lstBSAFormula = value;
               //super.NotifyPropertyChanged("BSAFormula");
            }
            if (this.CanPerformDoseCalc && this.BSAFormula != null && !String.IsNullOrEmpty(this.BSAFormula.Value)) {
                this.PerformDoseCalculation(true);
            }
        }
        private dRequestedDose: string;
        public get RequestedDose(): string {
            return this.dRequestedDose;
        }
        public set RequestedDose(value: string) {
            if (this.dRequestedDose != value) {
                this.dRequestedDose = value;
               //NotifyPropertyChanged("RequestedDose");
                this.IsOnLoad = false;
            }
            if (this.CanPerformDoseCalc) {
                this.PerformDoseCalculation(false);
            }
        }
        private _IsAuthorise: boolean = false;
        public get IsAuthorise(): boolean {
            return this._IsAuthorise;
        }
        public set IsAuthorise(value: boolean) {
            if (value != this._IsAuthorise) {
                this._IsAuthorise = value;
               //super.NotifyPropertyChanged("IsAuthorise");
            }
        }
        private oReqDoseSecondUOMList: ObservableCollection<CListItem>;
        public get ReqDoseSecondUOMList(): ObservableCollection<CListItem> {
            return this.oReqDoseSecondUOMList;
        }
        public set ReqDoseSecondUOMList(value: ObservableCollection<CListItem>) {
            if (this.oReqDoseSecondUOMList != value) {
                this.oReqDoseSecondUOMList = value;
               //NotifyPropertyChanged("ReqDoseSecondUOMList");
            }
        }
        private lstReqDoseSecondUOM: CListItem;
        public get ReqDoseSecondUOM(): CListItem {
            return this.lstReqDoseSecondUOM;
        }
        public set ReqDoseSecondUOM(value: CListItem) {
            if (!ObjectHelper.ReferenceEquals(this.lstReqDoseSecondUOM, value)) {
                this.lstReqDoseSecondUOM = value;
               //super.NotifyPropertyChanged("ReqDoseSecondUOM");
                this.IsOnLoad = false;
                if (this.CanPerformDoseCalc && this.ReqDoseSecondUOM != null && !String.IsNullOrEmpty(this.ReqDoseSecondUOM.Value)) {
                    this.PerformDoseCalculation(true);
                }
            }
        }
        private oRequestedDoseFirstUOMList: ObservableCollection<CListItem>;
        public get RequestedDoseFirstUOMList(): ObservableCollection<CListItem> {
            return this.oRequestedDoseFirstUOMList;
        }
        public set RequestedDoseFirstUOMList(value: ObservableCollection<CListItem>) {
            if (this.oRequestedDoseFirstUOMList != value) {
                this.oRequestedDoseFirstUOMList = value;
               //NotifyPropertyChanged("RequestedDoseFirstUOMList");
            }
        }
        private lstRequestedDoseFirstUOM: CListItem;
        public get RequestedDoseFirstUOM(): CListItem {
            return this.lstRequestedDoseFirstUOM;
        }
        public set RequestedDoseFirstUOM(value: CListItem) {
            {
                let isMoreOptionNotClicked: boolean = true;
                if (value != null && value.DisplayText != null && value.DisplayText == "More") {
                  isMoreOptionNotClicked = false;
                  this.lstRequestedDoseFirstUOM = null;
                    this.DoseCalCommonFieldVisibility = Visibility.Collapsed;
                    this.MoreOptionCode = CConstants.DoseUOMOptionCode;
                    this.GetMoreComboOption();
            }
                else {
                  this.lstRequestedDoseFirstUOM = value;
                }              
                this.IsOnLoad = false;
               //super.NotifyPropertyChanged("RequestedDoseFirstUOM");
                if (this.CanPerformDoseCalc && isMoreOptionNotClicked) {
                    this.PerformDoseCalculation(true);
                }
            }
        }
        private oReqDoseThirdUOMList: ObservableCollection<CListItem>;
        public get ReqDoseThirdUOMList(): ObservableCollection<CListItem> {
            return this.oReqDoseThirdUOMList;
        }
        public set ReqDoseThirdUOMList(value: ObservableCollection<CListItem>) {
            if (this.oReqDoseThirdUOMList != value) {
                this.oReqDoseThirdUOMList = value;
               //NotifyPropertyChanged("ReqDoseThirdUOMList");
            }
        }
        private lstReqDoseThirdUOM: CListItem;
        public get ReqDoseThirdUOM(): CListItem {
            return this.lstReqDoseThirdUOM;
        }
        public set ReqDoseThirdUOM(value: CListItem) {
            if (!ObjectHelper.ReferenceEquals(this.lstReqDoseThirdUOM, value)) {
                this.lstReqDoseThirdUOM = value;
               //super.NotifyPropertyChanged("ReqDoseThirdUOM");
                this.IsOnLoad = false;
                if (this.CanPerformDoseCalc && this.ReqDoseThirdUOM != null && !String.IsNullOrEmpty(this.ReqDoseThirdUOM.Value)) {
                    this.PerformDoseCalculation(true);
                }
            }
        }
        private dPatientHeight: number = 0;
        public get PatientHeight(): number {
            return this.dPatientHeight;
        }
        public set PatientHeight(value: number) {
            if (this.dPatientHeight != value) {
                this.dPatientHeight = value;
               //NotifyPropertyChanged("PatientHeight");
            }
        }
        private dPatientWeight: number = 0;
        public get PatientWeight(): number {
            return this.dPatientWeight;
        }
        public set PatientWeight(value: number) {
            if (this.dPatientWeight != value) {
                this.dPatientWeight = value;
               //NotifyPropertyChanged("PatientWeight");
            }
        }
        private sPatientHeightUOM: string;
        public get PatientHeightUOM(): string {
            return this.sPatientHeightUOM;
        }
        public set PatientHeightUOM(value: string) {
            if (this.sPatientHeightUOM != value) {
                this.sPatientHeightUOM = value;
               //NotifyPropertyChanged("PatientHeightUOM");
            }
        }
        private sPatientWeightUOM: string;
        public get PatientWeightUOM(): string {
            return this.sPatientWeightUOM;
        }
        public set PatientWeightUOM(value: string) {
            if (this.sPatientWeightUOM != value) {
                this.sPatientWeightUOM = value;
               //NotifyPropertyChanged("PatientWeightUOM");
            }
        }
        private PatientCurrentWeight: number = 0;
        private PatientCurrentHeight: number = 0;
        private PatientCurrnetWeightUOM: string;
        private PatientCurrnetHeightUOM: string;
        private _bIsProcessingDetail: boolean = false;
        public get IsProcessingDetail(): boolean {
            return this._bIsProcessingDetail;
        }
        public set IsProcessingDetail(value: boolean) {
            this._bIsProcessingDetail = value;
           //NotifyPropertyChanged("IsProcessingDetail");
        }
        private _bIsContineousInfusion: boolean = false;
        public get IsContineousInfusion(): boolean {
            return this._bIsContineousInfusion;
        }
        public set IsContineousInfusion(value: boolean) {
            this._bIsContineousInfusion = value;
           //NotifyPropertyChanged("IsContineousInfusion");
        }
        private _bIsValid: boolean = false;
        public get bIsValid(): boolean {
            return this._bIsValid;
        }
        public set bIsValid(value: boolean) {
            this._bIsValid = value;
           //NotifyPropertyChanged("bIsValid");
        }
        private _IsHeightOutOfDate: boolean = false;
        public get IsHeightOutOfDate(): boolean {
            return this._IsHeightOutOfDate;
        }
        public set IsHeightOutOfDate(value: boolean) {
            this._IsHeightOutOfDate = value;
           //NotifyPropertyChanged("IsHeightOutOfDate");
        }
        private _IsWeighttOutOfDate: boolean = false;
        public get IsWeighttOutOfDate(): boolean {
            return this._IsWeighttOutOfDate;
        }
        public set IsWeighttOutOfDate(value: boolean) {
            this._IsWeighttOutOfDate = value;
           //NotifyPropertyChanged("IsWeighttOutOfDate");
        }
        private sCalculatedBSA: string;
        public get CalculatedBSA(): string {
            return this.sCalculatedBSA;
        }
        public set CalculatedBSA(value: string) {
            if (this.sCalculatedBSA != value) {
                this.sCalculatedBSA = value;
               //NotifyPropertyChanged("CalculatedBSA");
            }
        }
        private sCalculatedBSADisplay: string;
        public get CalculatedBSADisplay(): string {
            return this.sCalculatedBSADisplay;
        }
        public set CalculatedBSADisplay(value: string) {
            if (this.sCalculatedBSADisplay != value) {
                this.sCalculatedBSADisplay = value;
               //NotifyPropertyChanged("CalculatedBSADisplay");
            }
        }
        private oBtnClearClick: RelayCommand;
        public get BtnClearClick(): RelayCommand {
            if (this.oBtnClearClick == null) {
                this.oBtnClearClick = new RelayCommand((s,e) => {this.DefaultAction()});
            }
            return this.oBtnClearClick;
        }
        private oBtnRecalculate: RelayCommand;
        public get BtnRecalculate(): RelayCommand {
            if (this.oBtnRecalculate == null) {
                this.oBtnRecalculate = new RelayCommand((s,e) => {this.PerformRecalculate()});
            }
            return this.oBtnRecalculate;
        }
        private sCalculateDose: string;
        public get CalculateDose(): string {
            return this.sCalculateDose;
        }
        public set CalculateDose(value: string) {
            if (this.sCalculateDose != value) {
                this.sCalculateDose = value;
               //NotifyPropertyChanged("CalculateDose");
            }
        }
        private _IBWWeight: number = 0;
        public get IBWWeight(): number {
            return this._IBWWeight;
        }
        public set IBWWeight(value: number) {
            if (this._IBWWeight != value) {
                this._IBWWeight = value;
               //NotifyPropertyChanged("IBWWeight");
            }
        }
        private _ABWWeight: number = 0;
        public get ABWWeight(): number {
            return this._ABWWeight;
        }
        public set ABWWeight(value: number) {
            if (this._ABWWeight != value) {
                this._ABWWeight = value;
               //NotifyPropertyChanged("ABWWeight");
            }
        }
        private _IsRecordedWeight: boolean = false;
        public get IsRecordedWeight(): boolean {
            return this._IsRecordedWeight;
        }
        public set IsRecordedWeight(value: boolean) {
            if (this._IsRecordedWeight != value) {
                this._IsRecordedWeight = value;
               //NotifyPropertyChanged("IsRecordedWeight");
            }
            if (this.CanPerformDoseCalc && this.IsRecordedWeight) {
                this.PerformDoseCalculation(true);
            }
        }
        private _CalculatedContextText: string;
        public get CalculatedContextText(): string {
            return this._CalculatedContextText;
        }
        public set CalculatedContextText(value: string) {
            if (this._CalculatedContextText != value) {
                this._CalculatedContextText = value;
               //NotifyPropertyChanged("CalculatedContextText");
            }
        }
        private _BasedOnOptText: string;
        public get BasedOnOptText(): string {
            return this._BasedOnOptText;
        }
        public set BasedOnOptText(value: string) {
            if (this._BasedOnOptText != value) {
                this._BasedOnOptText = value;
               //NotifyPropertyChanged("BasedOnOptText");
            }
        }
        private _HeightValue: string;
        public get HeightValue(): string {
            return this._HeightValue;
        }
        public set HeightValue(value: string) {
            if (this._HeightValue != value) {
                this._HeightValue = value;
               //NotifyPropertyChanged("HeightValue");
            }
        }
        private _GestationValue: string;
        public get GestationValue(): string {
            return this._GestationValue;
        }
        public set GestationValue(value: string) {
            if (this._GestationValue != value) {
                this._GestationValue = value;
               //NotifyPropertyChanged("GestationValue");
            }
        }
        private _WeightErrorText: string;
        public get WeightErrorText(): string {
            return this._WeightErrorText;
        }
        public set WeightErrorText(value: string) {
            if (this._WeightErrorText != value) {
                this._WeightErrorText = value;
               //NotifyPropertyChanged("WeightErrorText");
            }
        }
        private _HeightErrorText: string;
        public get HeightErrorText(): string {
            return this._HeightErrorText;
        }
        public set HeightErrorText(value: string) {
            if (this._HeightErrorText != value) {
                this._HeightErrorText = value;
               //NotifyPropertyChanged("HeightErrorText");
            }
        }
        private _GestationErrorText: string;
        public get GestationErrorText(): string {
            return this._GestationErrorText;
        }
        public set GestationErrorText(value: string) {
            if (this._GestationErrorText != value) {
                this._GestationErrorText = value;
               //NotifyPropertyChanged("GestationErrorText");
            }
        }
        private _WeightValue: string;
        public get WeightValue(): string {
            return this._WeightValue;
        }
        public set WeightValue(value: string) {
            if (this._WeightValue != value) {
                this._WeightValue = value;
               //NotifyPropertyChanged("WeightValue");
            }
        }
        private _IsWeight: boolean = false;
        public get IsWeight(): boolean {
            return this._IsWeight;
        }
        public set IsWeight(value: boolean) {
            if (this._IsWeight != value) {
                this._IsWeight = value;
               //NotifyPropertyChanged("IsWeight");
            }
            if (this.CanPerformDoseCalc && this.IsWeight) {
                this.PerformDoseCalculation(true);
            }
        }
        private _IsBSA: boolean = false;
        public get IsBSA(): boolean {
            return this._IsBSA;
        }
        public set IsBSA(value: boolean) {
            if (this._IsBSA != value) {
                this._IsBSA = value;
               //NotifyPropertyChanged("IsBSA");
                if (this.IsBSA) {
                    this.DCCalculatedDisplayFor = Resource.DoseCalculator.CalculatedBSA_Text;
                    this.AdjBWWarningVisibility = Visibility.Collapsed;
                }
            }
            if (this.CanPerformDoseCalc && this.IsBSA) {
                this.PerformDoseCalculation(true);
            }
        }
        private _IsBSAOptMandatory: boolean = false;
        public get IsBSAOptMandatory(): boolean {
            return this._IsBSAOptMandatory;
        }
        public set IsBSAOptMandatory(value: boolean) {
            if (this._IsBSAOptMandatory != value) {
                this._IsBSAOptMandatory = value;
               //NotifyPropertyChanged("IsBSAOptMandatory");
            }
        }
        public IsOnLoad: boolean = false;
        public IsHeightWeightRecordedInDoseCalc: boolean = false;
        public IsHeightEstimated: boolean = false;
        public IsWeightEstimated: boolean = false;
        private _CanPerformDoseCalc: boolean = false;
        public get CanPerformDoseCalc(): boolean {
            return this._CanPerformDoseCalc;
        }
        public set CanPerformDoseCalc(value: boolean) {
            if (this._CanPerformDoseCalc != value) {
                this._CanPerformDoseCalc = value;
            }
        }
        private _IsOrderOverride: boolean = false;
        public get IsOrderOverride(): boolean {
            return this._IsOrderOverride;
        }
        public set IsOrderOverride(value: boolean) {
            if (this._IsOrderOverride != value) {
                this._IsOrderOverride = value;
               //NotifyPropertyChanged("IsOrderOverride");
            }
        }
        public IsClinicalNote: string = String.Empty;
        private _OrdDoseUOMDisplay: string;
        public get OrdDoseUOMDisplay(): string {
            return this._OrdDoseUOMDisplay;
        }
        public set OrdDoseUOMDisplay(value: string) {
            if (this._OrdDoseUOMDisplay != value) {
                this._OrdDoseUOMDisplay = value;
               //NotifyPropertyChanged("OrdDoseUOMDisplay");
            }
        }
        private _SelectedNotQualifiedFreq: string;
        public get SelectedNotQualifiedFreq(): string {
            return this._SelectedNotQualifiedFreq;
        }
        public set SelectedNotQualifiedFreq(value: string) {
            this._SelectedNotQualifiedFreq = value;
            if(!String.IsNullOrEmpty(value))
            { this.Frequency= null; }
        }
        private _DCCalculatedValue: string;
        public get DCCalculatedValue(): string {
            return this._DCCalculatedValue;
        }
        public set DCCalculatedValue(value: string) {
            if (this._DCCalculatedValue != value) {
                this._DCCalculatedValue = value;
               //NotifyPropertyChanged("DCCalculatedValue");
            }
        }
        private _DCCalculatedDisplayFor: string;
        public get DCCalculatedDisplayFor(): string {
            return this._DCCalculatedDisplayFor;
        }
        public set DCCalculatedDisplayFor(value: string) {
            if (this._DCCalculatedDisplayFor != value) {
                this._DCCalculatedDisplayFor = value;
               //NotifyPropertyChanged("DCCalculatedDisplayFor");
            }
        }
        private _DisplyDoseCalculationDetail: string;
        public get DisplayDoseCalculationDetail(): string {
            return this._DisplyDoseCalculationDetail;
        }
        public set DisplayDoseCalculationDetail(value: string) {
            if (this._DisplyDoseCalculationDetail != value) {
                this._DisplyDoseCalculationDetail = value;
               //NotifyPropertyChanged("DisplayDoseCalculationDetail");
            }
        }
        private _PerUOMDisplay: string;
        public get PerUOMDisplay(): string {
            return this._PerUOMDisplay;
        }
        public set PerUOMDisplay(value: string) {
            if (this._PerUOMDisplay != value) {
                this._PerUOMDisplay = value;
               //NotifyPropertyChanged("PerUOMDisplay");
            }
        }
        private _DoseCalcError: string;
        public get DoseCalcError(): string {
            return this._DoseCalcError;
        }
        public set DoseCalcError(value: string) {
            if (this._DoseCalcError != value) {
                this._DoseCalcError = value;
               //NotifyPropertyChanged("DoseCalcError");
            }
        }
        private _OrdDoseUOMDisplayError: string;
        public get OrdDoseUOMDisplayError(): string {
            return this._OrdDoseUOMDisplayError;
        }
        public set OrdDoseUOMDisplayError(value: string) {
            if (this._OrdDoseUOMDisplayError != value) {
                this._OrdDoseUOMDisplayError = value;
               //NotifyPropertyChanged("OrdDoseUOMDisplayError");
            }
        }
        private _CalAmtDecimalDisplayError: string;
        public get CalAmtDecimalDisplayError(): string {
            return this._CalAmtDecimalDisplayError;
        }
        public set CalAmtDecimalDisplayError(value: string) {
            if (this._CalAmtDecimalDisplayError != value) {
                this._CalAmtDecimalDisplayError = value;
               //NotifyPropertyChanged("CalAmtDecimalDisplayError");
            }
        }
        private _IsSecondUOMEnabled: boolean = false;
        public get IsSecondUOMEnabled(): boolean {
            return this._IsSecondUOMEnabled;
        }
        public set IsSecondUOMEnabled(value: boolean) {
            if (this._IsSecondUOMEnabled != value) {
                this._IsSecondUOMEnabled = value;
               //NotifyPropertyChanged("IsSecondUOMEnabled");
            }
        }
        private _RecalculateErrorMsg: string;
        public get RecalculateErrorMsg(): string {
            return this._RecalculateErrorMsg;
        }
        public set RecalculateErrorMsg(value: string) {
            if (this._RecalculateErrorMsg != value) {
                this._RecalculateErrorMsg = value;
               //NotifyPropertyChanged("RecalculateErrorMsg");
            }
        }
        private _FrequencyErrorMsg: string;
        public get FrequencyErrorMsg(): string {
            return this._FrequencyErrorMsg;
        }
        public set FrequencyErrorMsg(value: string) {
            if (this._FrequencyErrorMsg != value) {
                this._FrequencyErrorMsg = value;
               //NotifyPropertyChanged("FrequencyErrorMsg");
            }
        }
        private _AdjBWWarningMsg: string;
        public get AdjBWWarningMsg(): string {
            return this._AdjBWWarningMsg;
        }
        public set AdjBWWarningMsg(value: string) {
            if (this._AdjBWWarningMsg != value) {
                this._AdjBWWarningMsg = value;
               //NotifyPropertyChanged("AdjBWWarningMsg");
            }
        }
        private _IsIdealBodyWeight: boolean = false;
        public get IsIdealBodyWeight(): boolean {
            return this._IsIdealBodyWeight;
        }
        public set IsIdealBodyWeight(value: boolean) {
            if (this._IsIdealBodyWeight != value) {
                this._IsIdealBodyWeight = value;
               //NotifyPropertyChanged("IsIdealBodyWeight");
                if (this.IsIdealBodyWeight) {
                    this.DCCalculatedDisplayFor = Resource.DoseCalculator.CalculatedIBW_Text;
                }
            }
            if (this.CanPerformDoseCalc && this.IsIdealBodyWeight) {
                this.PerformDoseCalculation(true);
            }
        }
        private _IsAdjustedBodyWeight: boolean = false;
        public get IsAdjustedBodyWeight(): boolean {
            return this._IsAdjustedBodyWeight;
        }
        public set IsAdjustedBodyWeight(value: boolean) {
            if (this._IsAdjustedBodyWeight != value) {
                this._IsAdjustedBodyWeight = value;
               //NotifyPropertyChanged("IsAdjustedBodyWeight");
                if (this.IsAdjustedBodyWeight) {
                    this.AdjBWWarningVisibility = Visibility.Collapsed;
                    this.AdjBWWarningMsg = String.Empty;
                    this.DCCalculatedDisplayFor = Resource.DoseCalculator.CalculatedABW_Text;
                }
            }
            if (this.CanPerformDoseCalc && this.IsAdjustedBodyWeight) {
                this.PerformDoseCalculation(true);
            }
        }
        private _IBWValue: string;
        public get IBWValue(): string {
            return this._IBWValue;
        }
        public set IBWValue(value: string) {
            if (this._IBWValue != value) {
                this._IBWValue = value;
               //NotifyPropertyChanged("IBWValue");
            }
        }
        private _ABWValue: string;
        public get ABWValue(): string {
            return this._ABWValue;
        }
        public set ABWValue(value: string) {
            if (this._ABWValue != value) {
                this._ABWValue = value;
               //NotifyPropertyChanged("ABWValue");
            }
        }
        private _IsABWEnabled: boolean = false;
        public get IsABWEnabled(): boolean {
            return this._IsABWEnabled;
        }
        public set IsABWEnabled(value: boolean) {
            if (this._IsABWEnabled != value) {
                this._IsABWEnabled = value;
               //NotifyPropertyChanged("IsABWEnabled");
            }
        }
        private _IsClearEnabled: boolean = false;
        public get IsClearEnabled(): boolean {
            return this._IsClearEnabled;
        }
        public set IsClearEnabled(value: boolean) {
            if (this._IsClearEnabled != value) {
                    this._IsClearEnabled = value;
               //NotifyPropertyChanged("IsClearEnabled");
           }
        }
        private _IsDailyDoseEnabled: boolean = false;
        public get IsDailyDoseEnabled(): boolean {
            return this._IsDailyDoseEnabled;
        }
        public set IsDailyDoseEnabled(value: boolean) {
            if (this._IsDailyDoseEnabled != value) {
                this._IsDailyDoseEnabled = value;
               //NotifyPropertyChanged("IsDailyDoseEnabled");
            }
        }
        private _IsDoseCalcPerformed: boolean = false;
        public get IsDoseCalcPerformed(): boolean {
            return this._IsDoseCalcPerformed;
        }
        public set IsDoseCalcPerformed(value: boolean) {
            if (this._IsDoseCalcPerformed != value) {
                this._IsDoseCalcPerformed = value;
               //NotifyPropertyChanged("IsDoseCalcPerformed");
            }
        }
        private _IsDoseReCalculated: boolean = false;
        public get IsDoseReCalculated(): boolean {
            return this._IsDoseReCalculated;
        }
        public set IsDoseReCalculated(value: boolean) {
            if (this._IsDoseReCalculated != value) {
                this._IsDoseReCalculated = value;
               //NotifyPropertyChanged("IsDoseReCalculated");
            }
        }
        private _CalculatedAmountPerDose: number = 0;
        public get CalculatedAmountPerDose(): number {
            return this._CalculatedAmountPerDose;
        }
        public set CalculatedAmountPerDose(value: number) {
            if (this._CalculatedAmountPerDose != value) {
                this._CalculatedAmountPerDose = value;
               //NotifyPropertyChanged("CalculatedAmountPerDose");
            }
        }
        private _CalculatedAmountPerDoseDisplay: string;
        public get CalculatedAmountPerDoseDisplay(): string {
            return this._CalculatedAmountPerDoseDisplay;
        }
        public set CalculatedAmountPerDoseDisplay(value: string) {
            if (this._CalculatedAmountPerDoseDisplay != value) {
                this._CalculatedAmountPerDoseDisplay = value;
               //NotifyPropertyChanged("CalculatedAmountPerDoseDisplay");
            }
        }
        private _TotalDailyDoseValueDisplay: string;
        public get TotalDailyDoseValueDisplay(): string {
            return this._TotalDailyDoseValueDisplay;
        }
        public set TotalDailyDoseValueDisplay(value: string) {
            if (this._TotalDailyDoseValueDisplay != value) {
                this._TotalDailyDoseValueDisplay = value;
               //NotifyPropertyChanged("TotalDailyDoseValueDisplay");
            }
        }
        public IsOrderAmountUpdated: boolean = false;
        private _OrderedAmountPerDose: string;
        public get OrderedAmountPerDose(): string {
            return this._OrderedAmountPerDose;
        }
        public set OrderedAmountPerDose(value: string) {
            let dOrdAmt: number = 0;
            {
                this._OrderedAmountPerDose = value;
               //NotifyPropertyChanged("OrderedAmountPerDose");
                this.IsOrderAmountUpdated = true;
                this.OrdDoseUOMDisplayError = String.Empty;
                this.RecalculateVisibility = Visibility.Collapsed;
                if (!String.IsNullOrEmpty(this.OrderedAmountPerDose)) {
                    {
                        dOrdAmt = Convert.ToDouble(this.OrderedAmountPerDose);
                        if (dOrdAmt > 0) {
                            if (dOrdAmt != this.CalculatedAmountPerDose) {
                                if (!this.IsOrderOverride) {
                                    this.Overridereason = null;
                                }
                                this.IsOrderOverride = true;
                            }
                            else {
                                this.IsOrderOverride = false;
                                this.Overridereason = null;
                                this.DCOrdOverideValue = String.Empty;
                                this.DCOverdoseErroVisibility = Visibility.Collapsed;
                            }
                            if (dOrdAmt % 1 > 0) {
                                this.CalAmtDecimalVisibility = Visibility.Visible;
                                this.CalAmtDecimalDisplayError = Resource.DoseCalculator.ErrMsg_DecimalRoundingRequired;
                            }
                            else {
                                this.CalAmtDecimalVisibility = Visibility.Collapsed;
                                this.CalAmtDecimalDisplayError = String.Empty;
                            }
                        }
                        else {
                            this.OrdDoseUOMDisplayError = Resource.DoseCalculator.OrdAmtZeroErrorMsg;
                            if (this.CalculatedAmountPerDose % 1 > 0) {
                                this.CalAmtDecimalVisibility = Visibility.Visible;
                                this.CalAmtDecimalDisplayError = Resource.DoseCalculator.ErrMsg_DecimalRoundingRequired;
                            }
                            else {
                                this.CalAmtDecimalVisibility = Visibility.Collapsed;
                                this.CalAmtDecimalDisplayError = String.Empty;
                            }
                        }
                    }
                }
                else {
                    this.OrdDoseUOMDisplayError = Resource.DoseCalculator.OrdAmtZeroErrorMsg;
                    this.IsOrderOverride = true;
                }
            }
            if (dOrdAmt > 0) {
                this.DCDisplayDetailtVisibility = Visibility.Collapsed;
                this.GetDoseCalculationDisplayDetails();
                this.DCDisplayDetailtVisibility = Visibility.Visible;
            }
        }
        public MoreOptionCode: string;
        private lstFrequency: CListItem;
        public get Frequency(): CListItem {
            return this.lstFrequency;
        }
        public set Frequency(value: CListItem) {
            if (!ObjectHelper.ReferenceEquals(this.lstFrequency, value)) {
                let isMoreOptionNotClicked: boolean = true;
                if (value != null && value.DisplayText == "More") {
                    this.MoreOptionCode = CConstants.FrequencyOptionCode;
                    this.lstFrequency = null;
                    this.GetMoreComboOption();
                    isMoreOptionNotClicked = false;
                }
                else {
                    this.lstFrequency = value;
                    this.IsOnLoad = false;
                    {
                        if(value != null){ this.SelectedNotQualifiedFreq = String.Empty;}
                        this.DCFrequencyErrorVisibility = Visibility.Collapsed;
                        if (this.CanPerformDoseCalc && isMoreOptionNotClicked) {
                            this.PerformDoseCalculation(true);
                        }
                    }
                }
               //super.NotifyPropertyChanged("Frequency");
            }
        }
        private _DailyDoseFieldVisibility: Visibility;
        public get DailyDoseFieldVisibility(): Visibility {
            return this._DailyDoseFieldVisibility;
        }
        public set DailyDoseFieldVisibility(value: Visibility) {
            this._DailyDoseFieldVisibility = value;
           //NotifyPropertyChanged("DailyDoseFieldVisibility");
        }
        private frequencys: ObservableCollection<CListItem>;
        public get Frequencys(): ObservableCollection<CListItem> {
            return this.frequencys;
        }
        public set Frequencys(value: ObservableCollection<CListItem>) {
            this.frequencys = value;
           //super.NotifyPropertyChanged("Frequencys");
        }
        private _OptDailyDose: boolean = false;
        public get OptDailyDose(): boolean {
            return this._OptDailyDose;
        }
        public set OptDailyDose(value: boolean) {
            if (this._OptDailyDose != value) {
                this._OptDailyDose = value;
               //NotifyPropertyChanged("OptDailyDose");
            }
            if (this.OptDailyDose) {
                this.DailyDoseFieldVisibility = Visibility.Visible;
                this.PerUOMDisplay = Resource.DoseCalculator.PerDayText;
                this.IsOnLoad = false;
                if (!this.IsQualifiedFrequency && !String.IsNullOrEmpty(this.SelectedNotQualifiedFreq)) {
                    this.FrequencyErrorMsg = this.SelectedNotQualifiedFreq + " " + Resource.DoseCalculator.ErrMsg_ChkQualifiedFrequency;
                  this.DCFrequencyErrorVisibility = Visibility.Visible;
                }
                this.RequestedDose = String.Empty;
                if (this.CanPerformDoseCalc) {
                    this.PerformDoseCalculation(true);
                }
            }
        }
        private _OptIndividualDose: boolean = false;
        public get OptIndividualDose(): boolean {
            return this._OptIndividualDose;
        }
        public set OptIndividualDose(value: boolean) {
            if (this._OptIndividualDose != value) {
                this._OptIndividualDose = value;
               //NotifyPropertyChanged("OptIndividualDose");
            }
            if (this.OptIndividualDose) {
                this.DailyDoseFieldVisibility = Visibility.Collapsed;
                this.TotalDoseValueVisibility = Visibility.Collapsed;
                this.DCFrequencyErrorVisibility = Visibility.Collapsed;
                this.PerUOMDisplay = Resource.DoseCalculator.PerDoseText;
                this.RequestedDose = String.Empty;
                if (this.CanPerformDoseCalc) {
                    this.PerformDoseCalculation(true);
                }
            }
        }
        private oOverridereasonList: ObservableCollection<CListItem>;
        public get OverridereasonList(): ObservableCollection<CListItem> {
            return this.oOverridereasonList;
        }
        public set OverridereasonList(value: ObservableCollection<CListItem>) {
            if (this.oOverridereasonList != value) {
                this.oOverridereasonList = value;
               //NotifyPropertyChanged("OverridereasonList");
            }
        }
        private lstOverridereason: CListItem;
        public get Overridereason(): CListItem {
            return this.lstOverridereason;
        }
        public set Overridereason(value: CListItem) {
            if (!ObjectHelper.ReferenceEquals(this.lstOverridereason, value)) {
                this.lstOverridereason = value;
               //super.NotifyPropertyChanged("Overridereason");
                this.RecalculateVisibility = Visibility.Collapsed;
                if (this.CanPerformDoseCalc && this.Overridereason != null && !String.IsNullOrEmpty(this.Overridereason.Value)) {
                    this.DCOverdoseErroVisibility = Visibility.Collapsed;
                    this.DCDisplayDetailtVisibility = Visibility.Collapsed;
                    this.SetDefaultBorderBrushColor();
                    this.GetDoseCalculationDisplayDetails();
                    this.DCDisplayDetailtVisibility = Visibility.Visible;
                }
            }
        }
        private bOverridereasonEnabled: boolean = false;
        public get OverridereasonEnabled(): boolean {
            return this.bOverridereasonEnabled;
        }
        public set OverridereasonEnabled(value: boolean) {
            if (!ObjectHelper.ReferenceEquals(this.bOverridereasonEnabled, value)) {
                this.bOverridereasonEnabled = value;
               //NotifyPropertyChanged("OverridereasonEnabled");
            }
        }
        private bOverridereasonMandatory: boolean = false;
        public get OverridereasonMandatory(): boolean {
            return this.bOverridereasonMandatory;
        }
        public set OverridereasonMandatory(value: boolean) {
            if (!ObjectHelper.ReferenceEquals(this.bOverridereasonMandatory, value)) {
                this.bOverridereasonMandatory = value;
               //NotifyPropertyChanged("OverridereasonMandatory");
            }
        }
        public EnableOrDisableOverridereason(): boolean {
            let bEnable: boolean = false;
            return bEnable;
        }
        private _WeightOption: string;
        public get WeightOption(): string {
            return this._WeightOption;
        }
        public set WeightOption(value: string) {
            if (this._WeightOption != value) {
                this._WeightOption = value;
               //NotifyPropertyChanged("WeightOption");
            }
        }
        private _TotalDailyDose: number = 0;
        public get TotalDailyDose(): number {
            return this._TotalDailyDose;
        }
        public set TotalDailyDose(value: number) {
            if (this._TotalDailyDose != value) {
                this._TotalDailyDose = value;
               //NotifyPropertyChanged("TotalDailyDose");
            }
        }
        private bIsQualifiedFrequency: boolean = false;
        public get IsQualifiedFrequency(): boolean {
            return this.bIsQualifiedFrequency;
        }
        public set IsQualifiedFrequency(value: boolean) {
            if (!ObjectHelper.ReferenceEquals(this.bIsQualifiedFrequency, value)) {
                this.bIsQualifiedFrequency = value;
               //NotifyPropertyChanged("IsQualifiedFrequency");
            }
        }
        private lnIdentifyingOID: number = 0;
        public get IdentifyingOID(): number {
            return this.lnIdentifyingOID;
        }
        public set IdentifyingOID(value: number) {
            if (this.lnIdentifyingOID != value) {
                this.lnIdentifyingOID = value;
               //NotifyPropertyChanged("IdentifyingOID");
            }
        }
        private sIdentifyingType: string;
        public get IdentifyingType(): string {
            return this.sIdentifyingType;
        }
        public set IdentifyingType(value: string) {
            if (this.sIdentifyingType != value) {
                this.sIdentifyingType = value;
               //NotifyPropertyChanged("IdentifyingType");
            }
        }
        private _DCCalcDisplay: string;
        public get DCCalcDisplay(): string {
            return this._DCCalcDisplay;
        }
        public set DCCalcDisplay(value: string) {
            if (this._DCCalcDisplay != value) {
                this._DCCalcDisplay = value;
               //NotifyPropertyChanged("DCCalcDisplay");
            }
        }
        private _DCCalcDisplayValue: string;
        public get DCCalcDisplayValue(): string {
            return this._DCCalcDisplayValue;
        }
        public set DCCalcDisplayValue(value: string) {
            if (this._DCCalcDisplayValue != value) {
                this._DCCalcDisplayValue = value;
               //NotifyPropertyChanged("DCCalcDisplayValue");
            }
        }
        private _DCTotalDoseDisplayValue: string;
        public get DCTotalDoseDisplayValue(): string {
            return this._DCTotalDoseDisplayValue;
        }
        public set DCTotalDoseDisplayValue(value: string) {
            if (this._DCTotalDoseDisplayValue != value) {
                this._DCTotalDoseDisplayValue = value;
               //NotifyPropertyChanged("DCTotalDoseDisplayValue");
            }
        }
        private _DCTotalDoseDisplayValueTot: string;
        public get DCTotalDoseDisplayValueTot(): string {
            return this._DCTotalDoseDisplayValueTot;
        }
        public set DCTotalDoseDisplayValueTot(value: string) {
            if (this._DCTotalDoseDisplayValueTot != value) {
                this._DCTotalDoseDisplayValueTot = value;
               //NotifyPropertyChanged("DCTotalDoseDisplayValueTot");
            }
        }
        private _DCFrequencyDisplayValue: string;
        public get DCFrequencyDisplayValue(): string {
            return this._DCFrequencyDisplayValue;
        }
        public set DCFrequencyDisplayValue(value: string) {
            if (this._DCFrequencyDisplayValue != value) {
                this._DCFrequencyDisplayValue = value;
               //NotifyPropertyChanged("DCFrequencyDisplayValue");
            }
        }
        private _DCCalPerDoseDisplayValue: string;
        public get DCCalPerDoseDisplayValue(): string {
            return this._DCCalPerDoseDisplayValue;
        }
        public set DCCalPerDoseDisplayValue(value: string) {
            if (this._DCCalPerDoseDisplayValue != value) {
                this._DCCalPerDoseDisplayValue = value;
               //NotifyPropertyChanged("DCCalPerDoseDisplayValue");
            }
        }
        private _DCCalPerDoseDisplayValueTot: string;
        public get DCCalPerDoseDisplayValueTot(): string {
            return this._DCCalPerDoseDisplayValueTot;
        }
        public set DCCalPerDoseDisplayValueTot(value: string) {
            if (this._DCCalPerDoseDisplayValueTot != value) {
                this._DCCalPerDoseDisplayValueTot = value;
               //NotifyPropertyChanged("DCCalPerDoseDisplayValueTot");
            }
        }
        private _DCOrdPerDoseDisplayValue: string;
        public get DCOrdPerDoseDisplayValue(): string {
            return this._DCOrdPerDoseDisplayValue;
        }
        public set DCOrdPerDoseDisplayValue(value: string) {
            if (this._DCOrdPerDoseDisplayValue != value) {
                this._DCOrdPerDoseDisplayValue = value;
               //NotifyPropertyChanged("DCOrdPerDoseDisplayValue");
            }
        }
        private _DCOrdOverideValue: string;
        public get DCOrdOverideValue(): string {
            return this._DCOrdOverideValue;
        }
        public set DCOrdOverideValue(value: string) {
            if (this._DCOrdOverideValue != value) {
                this._DCOrdOverideValue = value;
               //NotifyPropertyChanged("DCOrdOverideValue");
            }
        }
        private _CalculationFor: string;
        public get CalculationFor(): string {
            return this._CalculationFor;
        }
        public set CalculationFor(value: string) {
            if (this._CalculationFor != value) {
                this._CalculationFor = value;
               //NotifyPropertyChanged("CalculationFor");
            }
        }
        private _BSAFieldVisibility: Visibility;
        public get BSAFieldVisibility(): Visibility {
            return this._BSAFieldVisibility;
        }
        public set BSAFieldVisibility(value: Visibility) {
            this._BSAFieldVisibility = value;
           //NotifyPropertyChanged("BSAFieldVisibility");
        }
        private _BSAWeightVisibility: Visibility;
        public get BSAWeightVisibility(): Visibility {
            return this._BSAWeightVisibility;
        }
        public set BSAWeightVisibility(value: Visibility) {
            this._BSAWeightVisibility = value;
           //NotifyPropertyChanged("BSAWeightVisibility");
        }
        private _BSAWeightOutputVisibility: Visibility;
        public get BSAWeightOutputVisibility(): Visibility {
            return this._BSAWeightOutputVisibility;
        }
        public set BSAWeightOutputVisibility(value: Visibility) {
            this._BSAWeightOutputVisibility = value;
           //NotifyPropertyChanged("BSAWeightOutputVisibility");
        }
        private _DCDisplayDetailtVisibility: Visibility;
        public get DCDisplayDetailtVisibility(): Visibility {
            return this._DCDisplayDetailtVisibility;
        }
        public set DCDisplayDetailtVisibility(value: Visibility) {
            this._DCDisplayDetailtVisibility = value;
           //NotifyPropertyChanged("DCDisplayDetailtVisibility");
        }
        private _TotalDoseValueVisibility: Visibility;
        public get TotalDoseValueVisibility(): Visibility {
            return this._TotalDoseValueVisibility;
        }
        public set TotalDoseValueVisibility(value: Visibility) {
            this._TotalDoseValueVisibility = value;
           //NotifyPropertyChanged("TotalDoseValueVisibility");
        }
        private _DoseCalCommonFieldVisibility: Visibility;
        public get DoseCalCommonFieldVisibility(): Visibility {
            return this._DoseCalCommonFieldVisibility;
        }
        public set DoseCalCommonFieldVisibility(value: Visibility) {
            this._DoseCalCommonFieldVisibility = value;
           //NotifyPropertyChanged("DoseCalCommonFieldVisibility");
        }
        private _WeightFieldVisibility: Visibility;
        public get WeightFieldVisibility(): Visibility {
            return this._WeightFieldVisibility;
        }
        public set WeightFieldVisibility(value: Visibility) {
            this._WeightFieldVisibility = value;
           //NotifyPropertyChanged("WeightFieldVisibility");
        }
        private _DoseCalErroVisibility: Visibility;
        public get DoseCalErroVisibility(): Visibility {
            return this._DoseCalErroVisibility;
        }
        public set DoseCalErroVisibility(value: Visibility) {
            this._DoseCalErroVisibility = value;
           //NotifyPropertyChanged("DoseCalErroVisibility");
        }
        private _DCFirstUOMErroVisibility: Visibility;
        public get DCFirstUOMErroVisibility(): Visibility {
            return this._DCFirstUOMErroVisibility;
        }
        public set DCFirstUOMErroVisibility(value: Visibility) {
            this._DCFirstUOMErroVisibility = value;
           //NotifyPropertyChanged("DCFirstUOMErroVisibility");
        }
        private _DCThirdUOMErroVisibility: Visibility;
        public get DCThirdUOMErroVisibility(): Visibility {
            return this._DCThirdUOMErroVisibility;
        }
        public set DCThirdUOMErroVisibility(value: Visibility) {
            this._DCThirdUOMErroVisibility = value;
           //NotifyPropertyChanged("DCThirdUOMErroVisibility");
        }
        private _DCFrequencyErroVisibility: Visibility;
        public get DCFrequencyErroVisibility(): Visibility {
            return this._DCFrequencyErroVisibility;
        }
        public set DCFrequencyErroVisibility(value: Visibility) {
            this._DCFrequencyErroVisibility = value;
           //NotifyPropertyChanged("DCFrequencyErroVisibility");
        }
        private _DCBSAFormulaErroVisibility: Visibility;
        public get DCBSAFormulaErroVisibility(): Visibility {
            return this._DCBSAFormulaErroVisibility;
        }
        public set DCBSAFormulaErroVisibility(value: Visibility) {
            this._DCBSAFormulaErroVisibility = value;
           //NotifyPropertyChanged("DCBSAFormulaErroVisibility");
        }
        private _DCOverdoseErroVisibility: Visibility;
        public get DCOverdoseErroVisibility(): Visibility {
            return this._DCOverdoseErroVisibility;
        }
        public set DCOverdoseErroVisibility(value: Visibility) {
            this._DCOverdoseErroVisibility = value;
           //NotifyPropertyChanged("DCOverdoseErroVisibility");
        }
        private _DCSecondUOMErroVisibility: Visibility;
        public get DCSecondUOMErroVisibility(): Visibility {
            return this._DCSecondUOMErroVisibility;
        }
        public set DCSecondUOMErroVisibility(value: Visibility) {
            this._DCSecondUOMErroVisibility = value;
           //NotifyPropertyChanged("DCSecondUOMErroVisibility");
        }
        private _DCBOnWeightErroVisibility: Visibility;
        public get DCBOnWeightErroVisibility(): Visibility {
            return this._DCBOnWeightErroVisibility;
        }
        public set DCBOnWeightErroVisibility(value: Visibility) {
            this._DCBOnWeightErroVisibility = value;
           //NotifyPropertyChanged("DCBOnWeightErroVisibility");
        }
        private _RecalculateVisibility: Visibility;
        public get RecalculateVisibility(): Visibility {
            return this._RecalculateVisibility;
        }
        public set RecalculateVisibility(value: Visibility) {
            this._RecalculateVisibility = value;
           //NotifyPropertyChanged("RecalculateVisibility");
        }
        private _CalAmtDecimalVisibility: Visibility;
        public get CalAmtDecimalVisibility(): Visibility {
            return this._CalAmtDecimalVisibility;
        }
        public set CalAmtDecimalVisibility(value: Visibility) {
            this._CalAmtDecimalVisibility = value;
           //NotifyPropertyChanged("CalAmtDecimalVisibility");
        }
        private _AdjBWWarningVisibility: Visibility;
        public get AdjBWWarningVisibility(): Visibility {
            return this._AdjBWWarningVisibility;
        }
        public set AdjBWWarningVisibility(value: Visibility) {
            this._AdjBWWarningVisibility = value;
           //NotifyPropertyChanged("AdjBWWarningVisibility");
        }
        private _DCFrequencyErrorVisibility: Visibility;
        public get DCFrequencyErrorVisibility(): Visibility {
            return this._DCFrequencyErrorVisibility;
        }
        public set DCFrequencyErrorVisibility(value: Visibility) {
            this._DCFrequencyErrorVisibility = value;
           //NotifyPropertyChanged("DCFrequencyErrorVisibility");
        }
        private _WarningColor: SolidColorBrush;
        public get WarningColor(): SolidColorBrush {
            return this._WarningColor;
        }
        public set WarningColor(value: SolidColorBrush) {
            if (this._WarningColor != value) {
                this._WarningColor = value;
               //NotifyPropertyChanged("WarningColor");
            }
        }
        private _NormalColor: SolidColorBrush;
        public get NormalColor(): SolidColorBrush {
            return this._NormalColor;
        }
        public set NormalColor(value: SolidColorBrush) {
            if (this._NormalColor != value) {
                this._NormalColor = value;
               //NotifyPropertyChanged("NormalColor");
            }
        }
        private _BorderBCRegDose: SolidColorBrush;
        public get BorderBCRegDose(): SolidColorBrush {
            return this._BorderBCRegDose;
        }
        public set BorderBCRegDose(value: SolidColorBrush) {
            if (this._BorderBCRegDose != value) {
                this._BorderBCRegDose = value;
               //NotifyPropertyChanged("BorderBCRegDose");
            }
        }
        private _BorderBCRegDoseUOM: SolidColorBrush;
        public get BorderBCRegDoseUOM(): SolidColorBrush {
            return this._BorderBCRegDoseUOM;
        }
        public set BorderBCRegDoseUOM(value: SolidColorBrush) {
            if (this._BorderBCRegDoseUOM != value) {
                this._BorderBCRegDoseUOM = value;
               //NotifyPropertyChanged("BorderBCRegDoseUOM");
            }
        }
        private _BorderBCThirdUOM: SolidColorBrush;
        public get BorderBCThirdUOM(): SolidColorBrush {
            return this._BorderBCThirdUOM;
        }
        public set BorderBCThirdUOM(value: SolidColorBrush) {
            if (this._BorderBCThirdUOM != value) {
                this._BorderBCThirdUOM = value;
               //NotifyPropertyChanged("BorderBCThirdUOM");
            }
        }
        private _BorderBCSecondUOM: SolidColorBrush;
        public get BorderBCSecondUOM(): SolidColorBrush {
            return this._BorderBCSecondUOM;
        }
        public set BorderBCSecondUOM(value: SolidColorBrush) {
            if (this._BorderBCSecondUOM != value) {
                this._BorderBCSecondUOM = value;
               //NotifyPropertyChanged("BorderBCSecondUOM");
            }
        }
        private _BorderBCFrequency: SolidColorBrush;
        public get BorderBCFrequency(): SolidColorBrush {
            return this._BorderBCFrequency;
        }
        public set BorderBCFrequency(value: SolidColorBrush) {
            if (this._BorderBCFrequency != value) {
                this._BorderBCFrequency = value;
               //NotifyPropertyChanged("BorderBCFrequency");
            }
        }
        private _BorderBCBSAFormula: SolidColorBrush;
        public get BorderBCBSAFormula(): SolidColorBrush {
            return this._BorderBCBSAFormula;
        }
        public set BorderBCBSAFormula(value: SolidColorBrush) {
            if (this._BorderBCBSAFormula != value) {
                this._BorderBCBSAFormula = value;
               //NotifyPropertyChanged("BorderBCBSAFormula");
            }
        }
        private _BorderBCOverDose: SolidColorBrush;
        public get BorderBCOverDose(): SolidColorBrush {
            return this._BorderBCOverDose;
        }
        public set BorderBCOverDose(value: SolidColorBrush) {
            if (this._BorderBCOverDose != value) {
                this._BorderBCOverDose = value;
               //NotifyPropertyChanged("BorderBCOverDose");
            }
        }
        private _BorderBCOrderAmt: SolidColorBrush;
        public get BorderBCOrderAmt(): SolidColorBrush {
            return this._BorderBCOrderAmt;
        }
        public set BorderBCOrderAmt(value: SolidColorBrush) {
            if (this._BorderBCOrderAmt != value) {
                this._BorderBCOrderAmt = value;
               //NotifyPropertyChanged("BorderBCOrderAmt");
            }
        }
        public GetDomainCombo(): void {
            let DomainCodes: string = ValueDomain.ReqDosePerUOM + "," + ValueDomain.ConDose + "," + ValueDomain.DCACKREASON + "," + ValueDomain.RoundedDoseValue;
            ProcessRTE.GetHierarchicalValuesByDomains(CConstants.CodingSchemeName, CConstants.Version, CConstants.FilterType, ContextInfo.Culture, DomainCodes, (s,e) => {this.OnRTEResult(s);});
        }
        OnRTEResult(args: RTEEventargs): void {
            if (String.IsNullOrEmpty(args.Request) || args.Result == null)
                return
            if (args.Result instanceof Dictionary) {
                let objResult: Dictionary<string, List<CListItem>> = <Dictionary<string, List<CListItem>>>args.Result;
                objResult.forEach( (objDomainDetail)=> {
                    switch (objDomainDetail.Key) {
                        case ValueDomain.ReqDosePerUOM:
                            {
                                this.ReqDoseSecondUOMList = new ObservableCollection<CListItem>();
                                if (DCReqDoseSecondUOMConceptCodes.ConceptCodes == null) {
                                    DCReqDoseSecondUOMConceptCodes.ConceptCodes = new ObservableCollection<CValuesetTerm>();
                                    if (objDomainDetail.Value != null && objDomainDetail.Value.Count > 0) {
                                        objDomainDetail.Value.forEach( (oCListItem)=> {
                                            DCReqDoseSecondUOMConceptCodes.ConceptCodes.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                            this.ReqDoseSecondUOMList.Add(oCListItem);
                                        });
                                    }
                                }
                                else if (DCReqDoseSecondUOMConceptCodes.ConceptCodes.Count > 0) {
                                    DCReqDoseSecondUOMConceptCodes.ConceptCodes.forEach( (oCValListItem)=> {
                                        this.ReqDoseSecondUOMList.Add(ObjectHelper.CreateObject(new CListItem(), { Value: oCValListItem.csCode, DisplayText: oCValListItem.csDescription }));
                                    });
                                }
                                break;
                            }
                        case ValueDomain.ConDose:
                            {
                                this.BSAFormulaList = new ObservableCollection<CListItem>();
                                if (CommonDomainValues.BSAFormula == null) {
                                    CommonDomainValues.BSAFormula = new ObservableCollection<CValuesetTerm>();
                                    if (objDomainDetail.Value != null && objDomainDetail.Value.Count > 0) {
                                        objDomainDetail.Value.forEach( (oCListItem)=> {
                                            CommonDomainValues.BSAFormula.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                            this.BSAFormulaList.Add(oCListItem);
                                        });
                                    }
                                }
                                else if (CommonDomainValues.BSAFormula.Count > 0) {
                                    CommonDomainValues.BSAFormula.forEach( (oCValListItem)=> {
                                        this.BSAFormulaList.Add(ObjectHelper.CreateObject(new CListItem(), { Value: oCValListItem.csCode, DisplayText: oCValListItem.csDescription }));
                                    });
                                }
                                if (!String.IsNullOrEmpty(PatientContext.BSAFormulaCode)) {
                                    this.BSAFormula = this.GetSelectedBSAFormula(PatientContext.BSAFormulaCode);
                                }
                                break;
                            }
                        case ValueDomain.DCACKREASON:
                            {
                                this.OverridereasonList = new ObservableCollection<CListItem>();
                                if (DCOverridereasonConceptCodes.ConceptCodes == null) {
                                    DCOverridereasonConceptCodes.ConceptCodes = new ObservableCollection<CValuesetTerm>();
                                    if (objDomainDetail.Value != null && objDomainDetail.Value.Count > 0) {
                                        objDomainDetail.Value.forEach( (oCListItem)=> {
                                            DCOverridereasonConceptCodes.ConceptCodes.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                            this.OverridereasonList.Add(oCListItem);
                                        });
                                    }
                                }
                                else if (DCOverridereasonConceptCodes.ConceptCodes.Count > 0) {
                                    DCOverridereasonConceptCodes.ConceptCodes.forEach( (oCValListItem)=> {
                                        this.OverridereasonList.Add(ObjectHelper.CreateObject(new CListItem(), { Value: oCValListItem.csCode, DisplayText: oCValListItem.csDescription }));
                                    });
                                }
                                break;
                            }
                    }
                });
            }
            this.LoadDefaultValue();
        }
        public LoadDefaultValue(): void {
            this.DoseCalCommonFieldVisibility = Visibility.Collapsed;
            this.BSAFieldVisibility = Visibility.Collapsed;
            this.WeightFieldVisibility = Visibility.Collapsed;
            this.TotalDoseValueVisibility = Visibility.Collapsed;
            this.RecalculateVisibility = Visibility.Collapsed;
            this.AdjBWWarningVisibility = Visibility.Collapsed;
            this.DoseCalErroVisibility = Visibility.Collapsed;
            this.BSAWeightOutputVisibility = Visibility.Collapsed;
            this.DCDisplayDetailtVisibility = Visibility.Collapsed;
            this.NormalColor = new SolidColorBrush(Color.FromArgb(255, 113, 177, 179));
            this.WarningColor = new SolidColorBrush(Colors.Red);
            this.SetDefaultBorderBrushColor();
            this.IsSecondUOMEnabled = true;
            this.IsClearEnabled = false;
            if (!this.IsProcessingDetail) {
                if (this.BSAFormulaList != null && this.BSAFormulaList.Count > 0) {
                    let DefaultBSAFormula = this.BSAFormulaList.Where(x => String.Equals(x.Value, PatientContext.BSAFormulaCode));
                    if (DefaultBSAFormula != null && DefaultBSAFormula.Count() > 0) {
                        this.BSAFormula = DefaultBSAFormula.First();
                    }
                }
            }
            else {
                if (this.oDoseCalcDefault != null) {
                    if (this.BSAFormulaList != null && this.BSAFormulaList.Count > 0 && this.oDoseCalcDefault.BSAFormula != null && !String.IsNullOrEmpty(this.oDoseCalcDefault.BSAFormula.Value)) {
                        let DefaultBSAFormula = this.BSAFormulaList.Where(x => String.Equals(x.Value, this.oDoseCalcDefault.BSAFormula.Value));
                        if (DefaultBSAFormula != null && DefaultBSAFormula.Count() > 0) {
                            this.BSAFormula = DefaultBSAFormula.First();
                        }
                    }
                    if (String.Equals(this.oDoseCalcDefault.CalculationFor, CConstants.DailyDose)) {
                        this.OptDailyDose = true;
                        this.OptIndividualDose = false;
                        if (this.oDoseCalcDefault.Frequency != null && this.oDoseCalcDefault.Frequency.Tag != null) {
                            if (!(this.oDoseCalcDefault.Frequency.Tag instanceof Array)) {
                                this.oDoseCalcDefault.Frequency.Tag = this.oDoseCalcDefault.Frequency.Tag.ToString().Split('~');
                            }
                            if (((this.oDoseCalcDefault.Frequency.Tag instanceof Array) && ((<string[]>(this.oDoseCalcDefault.Frequency.Tag)).length > 3) && (String.Equals((<string[]>(this.oDoseCalcDefault.Frequency.Tag))[3], "1")))) {
                                let DefaultFrequency = this.Frequencys.Where(x => String.Equals(x.Value, this.oDoseCalcDefault.Frequency.Value));
                                if (DefaultFrequency != null && DefaultFrequency.Count() > 0) {
                                    this.Frequency = DefaultFrequency.First();
                                }
                                else {
                                    this.Frequencys.Add(this.oDoseCalcDefault.Frequency);
                                    this.Frequency = this.oDoseCalcDefault.Frequency;
                                }
                            }
                            else {
                                this.IsQualifiedFrequency = false;
                                this.SelectedNotQualifiedFreq = this.oDoseCalcDefault.Frequency.DisplayText;
                                this.Frequency = null;
                            }
                        }
                        else if (this.oDoseCalcDefault.Frequency != null && !String.IsNullOrEmpty(this.oDoseCalcDefault.Frequency.Value)) {
                            this.Frequency = this.GetFrequencyByOID(Convert.ToInt64(this.oDoseCalcDefault.Frequency.Value));
                            if (this.Frequency == null) {
                                this.IsQualifiedFrequency = false;
                                this.SelectedNotQualifiedFreq = this.oDoseCalcDefault.Frequency.DisplayText;
                            }
                        }
                        if (!this.IsQualifiedFrequency && !String.IsNullOrEmpty(this.SelectedNotQualifiedFreq)) {
                            this.FrequencyErrorMsg = this.SelectedNotQualifiedFreq + " " + Resource.DoseCalculator.ErrMsg_ChkQualifiedFrequency;
                            this.DCFrequencyErrorVisibility = Visibility.Visible;
                            if (this.OnFocusEvent != null) {
                                this.OnFocusEvent("cboFrequency");
                            }
                        }
                    }
                    else {
                        this.OptDailyDose = false;
                        this.OptIndividualDose = true;
                    }
                    if (!String.IsNullOrEmpty(this.oDoseCalcDefault.DoseCalcBasedOn)) {
                        if (this.oDoseCalcDefault.DoseCalcBasedOn.Equals(CConstants.BSACode)) {
                            this.IsBSA = true;
                            this.IsWeight = false;
                        }
                        else if (this.oDoseCalcDefault.DoseCalcBasedOn.Equals(CConstants.WeightCode)) {
                            this.IsBSA = false;
                            this.IsWeight = true;
                        }
                        if (!String.IsNullOrEmpty(this.oDoseCalcDefault.DefaultWeightType)) {
                            if (this.oDoseCalcDefault.DefaultWeightType == CConstants.RecordedWeightConceptCode) {
                                this.IsRecordedWeight = true;
                            }
                            else if (this.oDoseCalcDefault.DefaultWeightType == CConstants.IBWConceptCode) {
                                this.IsIdealBodyWeight = true;
                            }
                            else if (this.oDoseCalcDefault.DefaultWeightType == CConstants.ABWConceptCode) {
                                this.IsAdjustedBodyWeight = true;
                            }
                        }
                    }
                    if (!String.IsNullOrEmpty(this.oDoseCalcDefault.RequestedDose))
                        this.RequestedDose = this.oDoseCalcDefault.RequestedDose;
                    if (this.RequestedDoseFirstUOMList != null && this.oDoseCalcDefault.RequestedDoseUOM != null) {
                        let DefaultRequestedDoseFirstUOM = this.RequestedDoseFirstUOMList.Where(x => String.Equals(x.Value, this.oDoseCalcDefault.RequestedDoseUOM.Value));
                        if (DefaultRequestedDoseFirstUOM != null && DefaultRequestedDoseFirstUOM.Count() > 0) {
                            this.RequestedDoseFirstUOM = DefaultRequestedDoseFirstUOM.First();
                        }
                        else {
                            this.RequestedDoseFirstUOMList.Add(this.oDoseCalcDefault.RequestedDoseUOM);
                            this.RequestedDoseFirstUOM = this.oDoseCalcDefault.RequestedDoseUOM;
                        }
                        if (this.RequestedDoseFirstUOMList.Where(x => String.Equals(x.Value, "CC_More", StringComparison.InvariantCultureIgnoreCase)).Count() == 0) {
                            this.RequestedDoseFirstUOMList.Add(ObjectHelper.CreateObject(new CListItem(), { DisplayText: "More", Value: "CC_More" }));
                        }
                        if (this.RequestedDoseFirstUOMList != null && this.RequestedDoseFirstUOMList.Count > 0) {
                            this.RequestedDoseFirstUOMList = this.GetDoseCalciSortedListitems(this.RequestedDoseFirstUOMList);
                        }
                    }
                    if (this.oDoseCalcDefault.RequestDosePerUOM != null && !String.IsNullOrEmpty(this.oDoseCalcDefault.RequestDosePerUOM.Value)) {
                        if (this.ReqDoseSecondUOMList != null && this.ReqDoseSecondUOMList.Count > 0) {
                            let DefaultReqDoseSecondUOM = this.ReqDoseSecondUOMList.Where(x => String.Equals(x.Value, this.oDoseCalcDefault.RequestDosePerUOM.Value));
                            if (DefaultReqDoseSecondUOM != null && DefaultReqDoseSecondUOM.Count() > 0) {
                                this.ReqDoseSecondUOM = DefaultReqDoseSecondUOM.First();
                            }
                            else {
                                this.ReqDoseSecondUOMList.Add(this.oDoseCalcDefault.RequestDosePerUOM);
                                this.ReqDoseSecondUOM = this.oDoseCalcDefault.RequestDosePerUOM;
                            }
                        }
                    }
                    if (!String.IsNullOrEmpty(this.oDoseCalcDefault.RequestDosePer2UOMLzoID)) {
                        this.ReqDoseThirdUOM = this.GetListItemInfUOM(this.oDoseCalcDefault.RequestDosePer2UOMLzoID);
                    }
                }
                else {
                    this.DefaultAction();
                }
            }
        }
        public GetMoreComboOption(): void {
            if (String.Compare(CConstants.FrequencyOptionCode, this.MoreOptionCode) == 0) {
                let oReq: IPPMAManagePrescSer.CReqMsgGetIPPFrequency = new IPPMAManagePrescSer.CReqMsgGetIPPFrequency();
                oReq.MCVersionBC = AppSessionInfo.AMCV;
                oReq.cIsDefaultBC = '0';
                oReq.oContextInformation = CommonBB.FillContext();
                let serviceProxy: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
                serviceProxy.GetIPPFrequencyCompleted  = (s,e) => { this.serviceProxy_GetIPPFrequencyCompleted(s,e); } ;
                serviceProxy.GetIPPFrequencyAsync(oReq);
            }
            else {
                let objService: ManagePrescriptionWSSoapClient = new ManagePrescriptionWSSoapClient();
                objService.GetAllOptionsCompleted  = (s,e) => { this.objService_GetAllOptionsCompleted(s,e); } ;
                let objAllRequest: CReqMsgGetAllOptions = new CReqMsgGetAllOptions();
                objAllRequest.IdentifyingOIDBC = this.IdentifyingOID;
                objAllRequest.IdentifyingTypeBC = this.IdentifyingType;
                objAllRequest.sOptionCodeBC = this.MoreOptionCode;
                objAllRequest.MCVersionNoBC = AppSessionInfo.AMCV;
                objAllRequest.oContextInformation = CommonBB.FillContext();
                objService.GetAllOptionsAsync(objAllRequest);
            }
        }
        serviceProxy_GetIPPFrequencyCompleted(sender: Object, e: IPPMAManagePrescSer.GetIPPFrequencyCompletedEventArgs): void {
            this.Frequencys = new ObservableCollection<CListItem>();
            if (e.Error != null)
                return
            let oRes: IPPMAManagePrescSer.CResMsgGetIPPFrequency = e.Result;
            if (oRes == null || oRes.objFrequencyDetails == null || oRes.objFrequencyDetails.Count == 0)
                return
            let nFreqCnt: number = oRes.objFrequencyDetails.Count;
            for (let i: number = 0; i < nFreqCnt; i++) {
                if (!String.IsNullOrEmpty(oRes.objFrequencyDetails[i].Name)) {
                    let sQualifiedFreqTag: string[] = null;
                    sQualifiedFreqTag = (!String.IsNullOrEmpty(oRes.objFrequencyDetails[i].Code) ? oRes.objFrequencyDetails[i].Code : "0~").Split('~');
                    if (sQualifiedFreqTag.Count() > 3 && sQualifiedFreqTag[3] != null && String.Equals(sQualifiedFreqTag[3], "1")) {
                        this.Frequencys.Add(ObjectHelper.CreateObject(new CListItem(), {
                            DisplayText: oRes.objFrequencyDetails[i].Name,
                            Value: Convert.ToString(oRes.objFrequencyDetails[i].OID),
                            Tag: oRes.objFrequencyDetails[i].Code
                        }));
                    }
                }
            }
        }
        objService_GetAllOptionsCompleted(sender: Object, e: GetAllOptionsCompletedEventArgs): void {
            if (e.Error == null) {
                let objResponse: CResMsgGetAllOptions = e.Result;
                if (objResponse != null && objResponse.oValues != null && objResponse.oValues.Count > 0) {
                    switch (this.MoreOptionCode) {
                        case CConstants.DoseUOMOptionCode:
                            this.RequestedDoseFirstUOMList = new ObservableCollection<CListItem>();
                            for (let i: number = 0; i < objResponse.oValues.Count; i++) {
                                if (!String.Equals(objResponse.oValues[i].SealImageList, CConstants.CompositeUOM) && !String.IsNullOrEmpty(objResponse.oValues[i].Name)) {
                                    this.RequestedDoseFirstUOMList.Add(ObjectHelper.CreateObject(new CListItem(), {
                                        DisplayText: objResponse.oValues[i].Name,
                                        Value: Convert.ToString(objResponse.oValues[i].Code),
                                        Tag: Convert.ToString(objResponse.oValues[i].OperationMode)
                                    }));
                                }
                            }
                            break;
                    }
                }
                if (this.RequestedDoseFirstUOMList != null && this.RequestedDoseFirstUOMList.Count > 0) {
                    this.RequestedDoseFirstUOMList = this.GetDoseCalciSortedListitems(this.RequestedDoseFirstUOMList);
                }
            }
        }
        public GetDoseCalciSortedListitems(oDoseCalciItems: ObservableCollection<CListItem>): ObservableCollection<CListItem> {
            let oSortedDoseCalciItems: ObservableCollection<CListItem> = null;
            if (oDoseCalciItems != null && oDoseCalciItems.Count > 0) {
                let sortedItems = oDoseCalciItems.Where(item =>!String.Equals(item.Value,"cc_more",StringComparison.CurrentCultureIgnoreCase)).OrderBy(item=>item.DisplayText).Select(item => item);
                if (sortedItems != null && sortedItems.Count() > 0) {
                    let sortedItemList: ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
                    sortedItems.forEach( (item)=> {
                        sortedItemList.Add(item);
                    });
                    if (oDoseCalciItems.Where(c => String.Equals(c.Value, "cc_more", StringComparison.CurrentCultureIgnoreCase)).Count() > 0) {
                        sortedItemList.Add(ObjectHelper.CreateObject(new CListItem(), { DisplayText: "More", Value: "CC_More" }));
                    }
                    oSortedDoseCalciItems = sortedItemList;
                }
                else {
                    oSortedDoseCalciItems = oDoseCalciItems;
                }
            }
            return oSortedDoseCalciItems;
        }
        private CalculateBSA(): void {
            if (this.BSAValidation()) {
                if (this.BSAFormula != null && !String.IsNullOrEmpty(this.BSAFormula.Value)) {
                    if ((String.Equals(this.BSAFormula.Value, CConstants.IsBoydWeightFormula) && this.PatientWeight > 0) || (!String.Equals(this.BSAFormula.Value, CConstants.IsBoydWeightFormula) && this.PatientHeight > 0 && this.PatientWeight > 0)) {
                        CommonBB.CalculatePatientBSA(this.PatientHeight, this.PatientHeightUOM, this.PatientWeight, this.PatientWeightUOM, this.BSAFormula.Value);
                    }
                    this.CalculatedBSA = Convert.ToString(PatientContext.CalculatedBSA);
                    this.CalculatedBSADisplay = Convert.ToString(PatientContext.CalculatedBSA) + " " + (this.ReqDoseSecondUOM != null ? this.ReqDoseSecondUOM.DisplayText : String.Empty);
                    this.DCCalculatedValue = this.CalculatedBSADisplay;
                    this.BSAWeightOutputVisibility = Visibility.Visible;
                    this.DoseCalculate(true);
                }
            }
        }
        public DefaultAction(): void {
            if(this.IsBSA)
            this.BSAFormula = null;
            this.IsWeight = this.IsBSA = false;
            this.IsRecordedWeight = this.IsIdealBodyWeight = this.IsAdjustedBodyWeight = false;
            this.ClearAllCalculatedValues();
            this.RequestedDose = String.Empty;
            this.RequestedDoseFirstUOM = null;
            this.ReqDoseSecondUOM = null;
            this.ReqDoseThirdUOM = null;
            this.Frequency = null;
            this.DefaultVisibility();
            this.CanPerformDoseCalc = false;
            this.OptIndividualDose = true;
            this.CanPerformDoseCalc = true;
            this.IsDoseReCalculated = false;
            this.IsBSAOptMandatory = false;
            this.IsClearEnabled = false;
        }
        private DefaultVisibility(): void {
            if (this.OptDailyDose) {
                this.DailyDoseFieldVisibility = Visibility.Visible;
                this.CalculationFor = CConstants.DailyDose;
            }
            else if (this.OptIndividualDose) {
                this.DailyDoseFieldVisibility = Visibility.Collapsed;
                this.CalculationFor = CConstants.PerDose;
            }
            this.DoseCalErroVisibility = Visibility.Collapsed;
            this.DoseCalCommonFieldVisibility = Visibility.Collapsed;
            this.BSAWeightVisibility = Visibility.Collapsed;
            this.BSAFieldVisibility = Visibility.Collapsed;
            this.WeightFieldVisibility = Visibility.Collapsed;
            this.TotalDoseValueVisibility = Visibility.Collapsed;
            this.IsSecondUOMEnabled = true;
            this.BSAWeightOutputVisibility = Visibility.Collapsed;
            this.RecalculateVisibility = Visibility.Collapsed;
            this.AdjBWWarningVisibility = Visibility.Collapsed;
            this.DCFrequencyErrorVisibility = Visibility.Collapsed;
            this.DCBOnWeightErroVisibility = Visibility.Collapsed;
            this.SelectedNotQualifiedFreq = String.Empty;
        }
        private PerformRecalculate(): void {
            this.PerformDoseCalculation(true);
        }
        public BSAValidation(): boolean {
            this.bIsValid = true;
            if (this.BSAFormula == null || (this.BSAFormula != null && String.IsNullOrEmpty(this.BSAFormula.Value))) {
                this.DCBSAFormulaErroVisibility = Visibility.Visible;
                this.BorderBCBSAFormula = this.WarningColor;
                if (this.OnFocusEvent != null) {
                    this.OnFocusEvent("cboBSAFormula");
                }
                this.bIsValid = false;
            }
            return this.bIsValid;
        }
        public CheckHeightOutOfDate(): boolean {
            let IsHeightOutdated: boolean = false;
            if (MedicationCommonProfileData.PrescribeConfig != null && MedicationCommonProfileData.PrescribeConfig.HghtWghtPromptCriteria != null && MedicationCommonProfileData.PrescribeConfig.HghtWghtPromptCriteria.Count > 0) {
                let dtPatientHeightRecordedOn: DateTime= DateTime.MinValue;
                if (!String.IsNullOrEmpty(PatientContext.PatientHeightRecordedOn)) {
                    dtPatientHeightRecordedOn = Convert.ToDateTime(PatientContext.PatientHeightRecordedOn);
                }
                let dtCurrentDate: DateTime= CommonBB.GetServerDateTime();
                let LatUpdateDayDiffForHeight: number = dtCurrentDate.Subtract(dtPatientHeightRecordedOn).Days;
                let PatientAgeInDays: number = 0;
                if (!String.IsNullOrEmpty(PatientContext.DOB)) {
                    PatientAgeInDays = dtCurrentDate.Subtract(Convert.ToDateTime(PatientContext.DOB)).Days;
                }
                MedicationCommonProfileData.PrescribeConfig.HghtWghtPromptCriteria.Where(x => String.Equals(x.HeightWeightCode, CConstants.HeightCode)).ForEach(x => {
                    if (((String.Equals(x.AgeRangeUOMCode, CConstants.DayCode) && (PatientAgeInDays >= (Convert.ToInt64(x.AgeRangeValue.Split('-')[0])) && PatientAgeInDays <= (Convert.ToInt64(x.AgeRangeValue.Split('-')[1])))) || (String.Equals(x.AgeRangeUOMCode, CConstants.MonthCode) && (PatientAgeInDays >= (dtCurrentDate.Subtract(dtCurrentDate.AddMonths(-Convert.ToInt32(x.AgeRangeValue.Split('-')[0]))).Days) && PatientAgeInDays <= (dtCurrentDate.Subtract(dtCurrentDate.AddMonths(-(Convert.ToInt32(x.AgeRangeValue.Split('-')[1]) + 1))).Days - 1))) || (String.Equals(x.AgeRangeUOMCode, CConstants.YearCode) && (PatientAgeInDays >= ((dtCurrentDate.Subtract(dtCurrentDate.AddYears(-Convert.ToInt32(x.AgeRangeValue.Split('-')[0]))).Days)) && PatientAgeInDays <= ((dtCurrentDate.Subtract(dtCurrentDate.AddYears(-(Convert.ToInt32(x.AgeRangeValue.Split('-')[1]) + 1))).Days) - 1))) || (String.Equals(x.AgeRangeUOMCode, CConstants.WeekCode) && (PatientAgeInDays >= ((dtCurrentDate.Subtract(dtCurrentDate.AddDays(-Convert.ToInt32(x.AgeRangeValue.Split('-')[0]) * CConstants.WeekDuration)).Days)) && PatientAgeInDays <= ((dtCurrentDate.Subtract(dtCurrentDate.AddDays(-(Convert.ToInt32(x.AgeRangeValue.Split('-')[1]) + 1) * CConstants.WeekDuration)).Days) - 1)))) && (((String.Equals(x.DurationCode, CConstants.DayCode) && LatUpdateDayDiffForHeight >= x.Duration) || (String.Equals(x.DurationCode, CConstants.MonthCode) && ((LatUpdateDayDiffForHeight >= (x.Duration * CConstants.MonthDuration)))) || (String.Equals(x.DurationCode, CConstants.YearCode) && ((LatUpdateDayDiffForHeight >= (x.Duration * CConstants.YearDuration)))) || (String.Equals(x.DurationCode, CConstants.WeekCode) && ((LatUpdateDayDiffForHeight >= (x.Duration * CConstants.WeekDuration))))))) {
                        IsHeightOutdated = true;
                        return
                    }
                });
                return IsHeightOutdated;
            }
            else return IsHeightOutdated;
        }
        public CheckWeightOutOfDate(): boolean {
            let IsWeightOutdated: boolean = false;
            if (MedicationCommonProfileData.PrescribeConfig != null && MedicationCommonProfileData.PrescribeConfig.HghtWghtPromptCriteria != null && MedicationCommonProfileData.PrescribeConfig.HghtWghtPromptCriteria.Count > 0) {
                let dtPatientWeightRecordedOn: DateTime= DateTime.MinValue;
                if (!String.IsNullOrEmpty(PatientContext.PatientWeightRecordedOn)) {
                    dtPatientWeightRecordedOn = Convert.ToDateTime(PatientContext.PatientWeightRecordedOn);
                }
                let dtCurrentDate: DateTime= CommonBB.GetServerDateTime();
                let LatUpdateDayDiffForWeight: number = dtCurrentDate.Subtract(dtPatientWeightRecordedOn).Days;
                let PatientAgeInDays: number = 0;
                if (!String.IsNullOrEmpty(PatientContext.DOB)) {
                    PatientAgeInDays = dtCurrentDate.Subtract(Convert.ToDateTime(PatientContext.DOB)).Days;
                }
                let OutDatedWeightAvailable = MedicationCommonProfileData.PrescribeConfig.HghtWghtPromptCriteria.Where(x => String.Equals(x.HeightWeightCode, CConstants.WeightCode)).ForEach(x => {
                    if (((String.Equals(x.AgeRangeUOMCode, CConstants.DayCode) && (PatientAgeInDays >= (Convert.ToInt64(x.AgeRangeValue.Split('-')[0])) && PatientAgeInDays <= (Convert.ToInt64(x.AgeRangeValue.Split('-')[1])))) || (String.Equals(x.AgeRangeUOMCode, CConstants.MonthCode) && (PatientAgeInDays >= (dtCurrentDate.Subtract(dtCurrentDate.AddMonths(-Convert.ToInt32(x.AgeRangeValue.Split('-')[0]))).Days) && PatientAgeInDays <= (dtCurrentDate.Subtract(dtCurrentDate.AddMonths(-(Convert.ToInt32(x.AgeRangeValue.Split('-')[1]) + 1))).Days - 1))) || (String.Equals(x.AgeRangeUOMCode, CConstants.YearCode) && (PatientAgeInDays >= ((dtCurrentDate.Subtract(dtCurrentDate.AddYears(-Convert.ToInt32(x.AgeRangeValue.Split('-')[0]))).Days)) && PatientAgeInDays <= ((dtCurrentDate.Subtract(dtCurrentDate.AddYears(-(Convert.ToInt32(x.AgeRangeValue.Split('-')[1]) + 1))).Days) - 1))) || (String.Equals(x.AgeRangeUOMCode, CConstants.WeekCode) && (PatientAgeInDays >= ((dtCurrentDate.Subtract(dtCurrentDate.AddDays(-Convert.ToInt32(x.AgeRangeValue.Split('-')[0]) * CConstants.WeekDuration)).Days)) && PatientAgeInDays <= ((dtCurrentDate.Subtract(dtCurrentDate.AddDays(-(Convert.ToInt32(x.AgeRangeValue.Split('-')[1]) + 1) * CConstants.WeekDuration)).Days) - 1)))) && (((String.Equals(x.DurationCode, CConstants.DayCode) && LatUpdateDayDiffForWeight >= x.Duration) || (String.Equals(x.DurationCode, CConstants.MonthCode) && ((LatUpdateDayDiffForWeight >= (x.Duration * CConstants.MonthDuration)))) || (String.Equals(x.DurationCode, CConstants.YearCode) && ((LatUpdateDayDiffForWeight >= (x.Duration * CConstants.YearDuration)))) || (String.Equals(x.DurationCode, CConstants.WeekCode) && ((LatUpdateDayDiffForWeight >= (x.Duration * CConstants.WeekDuration))))))) {
                        IsWeightOutdated = true;
                        return
                    }
                });
                return IsWeightOutdated;
            }
            else return IsWeightOutdated;
        }
        public ValidateHeightandWeight(dPatientHeight: number, dPatientWeight: number): boolean {
            this.bIsValid = true;
            this.IsHeightOutOfDate = this.CheckHeightOutOfDate();
            this.IsWeighttOutOfDate = this.CheckWeightOutOfDate();
            if (dPatientHeight == 0) {
                this.HeightErrorText = Resource.DoseCalculator.ErrMsg_Height_not_available;
                this.bIsValid = false;
            }
            else if (this.IsHeightOutOfDate) {
                this.HeightErrorText = Resource.DoseCalculator.HeightOutOfDate;
                this.bIsValid = false;
            }
            if (dPatientWeight == 0) {
                this.WeightErrorText = Resource.DoseCalculator.ErrMsg_Weight_not_available;
                this.bIsValid = false;
            }
            else if (this.IsWeighttOutOfDate) {
                this.WeightErrorText = Resource.DoseCalculator.WeightOutOfDate;
                this.bIsValid = false;
            }
            return this.bIsValid;
        }
        public CheckBSAHeightWeight(): boolean {
            let isValid: boolean = true;
            if (this.BSAFormula != null && !String.IsNullOrEmpty(this.BSAFormula.Value)) {
                if (String.Equals(this.BSAFormula.Value, CConstants.IsBoydWeightFormula)) {
                    if (this.PatientWeight == 0) {
                        this.DoseCalcError = Resource.DoseCalculator.ErrMsg_ValidateBSAHW_NotAvailable;
                        isValid = false;
                    }
                    else if (this.IsWeighttOutOfDate) {
                        this.DoseCalcError = Resource.DoseCalculator.ErrMsg_ValidateWeight;
                        isValid = false;
                    }
                }
                else if (!String.Equals(this.BSAFormula.Value, CConstants.IsBoydWeightFormula)) {
                    let bBothHeightWeightCheck: boolean = true;
                    if ((this.PatientWeight == 0 && this.PatientHeight == 0)) {
                        this.DoseCalcError = Resource.DoseCalculator.ErrMsg_ValidateBSAHW_NotAvailable;
                        isValid = false;
                        bBothHeightWeightCheck = false;
                    }
                    else if (this.IsWeighttOutOfDate && this.IsHeightOutOfDate) {
                        this.DoseCalcError = Resource.DoseCalculator.ErrMsg_ValidateBSAHW_outdate;
                        isValid = false;
                        bBothHeightWeightCheck = false;
                    }
                    if (bBothHeightWeightCheck) {
                        if (this.PatientHeight == 0) {
                            this.DoseCalcError = Resource.DoseCalculator.ErrMsg_ValidateBSAHeight_NotAvailable;
                            isValid = false;
                        }
                        else if (this.IsHeightOutOfDate) {
                            this.DoseCalcError = Resource.DoseCalculator.ErrMsg_ValidateBSAHeight_outdate;
                            isValid = false;
                        }
                        if (this.PatientWeight == 0) {
                            this.DoseCalcError = Resource.DoseCalculator.ErrMsg_ValidateBSAWeight_NotAvailable;
                            isValid = false;
                        }
                        else if (this.IsWeighttOutOfDate) {
                            this.DoseCalcError = Resource.DoseCalculator.ErrMsg_ValidateBSAWeight_Outdate;
                            isValid = false;
                        }
                    }
                }
            }
            return isValid;
        }
        private DoseCalculate(doFocus: boolean): void {
            if (this.DoseCalcValidation(doFocus)) {
                this.DoseCalErroVisibility = Visibility.Collapsed;
                let CalculatedDoseValue: number = 0;
                let CalculatedDoseDispaly: string = String.Empty;
                if (this.ReqDoseSecondUOM != null && !String.IsNullOrEmpty(this.ReqDoseSecondUOM.DisplayText)) {
                    CalculatedDoseValue = this.CalculateTotalDose();
                    let MaxDoseValue: number = 9999999.999;
                    if (CalculatedDoseValue > 0) {
                        if (CalculatedDoseValue <= MaxDoseValue) {
                            if (this.OptDailyDose) {
                                let dCalculatedAmtPerDose: number = this.GetAmountPerDoseBasedonFrequency(CalculatedDoseValue);
                                this.TotalDailyDose = Math.Round(CalculatedDoseValue, 3);
                                this.TotalDailyDoseValueDisplay = Convert.ToString(this.TotalDailyDose) + " " + this.UOMDisplayFormat();
                                if (dCalculatedAmtPerDose > 0) {
                                    CalculatedDoseValue = dCalculatedAmtPerDose;
                                }
                            }
                            this.CalculatedAmountPerDose = Math.Round(CalculatedDoseValue, 3);
                            this.CalculatedAmountPerDoseDisplay = Convert.ToString(this.CalculatedAmountPerDose) + " " + this.UOMDisplayFormat();
                            this.OrderedAmountPerDose = Convert.ToString(this.CalculatedAmountPerDose);
                            this.OrdDoseUOMDisplay = this.UOMDisplayFormat();
                            this.GetDoseCalculationDisplayDetails();
                            this.IsDoseReCalculated = true;
                            this.DoseCalcOutputVisibilityCheck();
                        }
                        else {
                            this.DoseCalcError = Resource.DoseCalculator.DoseCalMaxValueErrorMsg;
                            this.HandleErrorVisibility();
                        }
                    }
                }
            }
        }
        public FreqLowEvent: number = 0;
        private GetAmountPerDoseBasedonFrequency(TotalCalculatedDose: number): number {
            let iCalculatedAmtPerDose: number = 0;
            if (TotalCalculatedDose > 0 && this.Frequency != null && this.Frequency.Tag != null) {
                this.FreqLowEvent = this.GetLowEvent(this.Frequency.Tag);
                if (this.FreqLowEvent > 0) {
                    iCalculatedAmtPerDose = TotalCalculatedDose / this.FreqLowEvent;
                }
            }
            return iCalculatedAmtPerDose;
        }
        public GetLowEvent(objFreqTag: Object): number {
            let FrqLowEvent: number = 0;
            if (objFreqTag != null) {
                let FreqTagdetail: string[];
                if (objFreqTag instanceof Array) {
                    FreqTagdetail = ObjectHelper.CreateType<string[]>(objFreqTag, "string[]");
                }
                else {
                    FreqTagdetail = objFreqTag.ToString().Split('~');
                }
                if (FreqTagdetail != null && FreqTagdetail.length > 0 && FreqTagdetail.length > 6) {
                    Number.TryParse(FreqTagdetail[6], (o) => { FrqLowEvent = o; });
                }
            }
            return FrqLowEvent;
        }
        public PatWeightInKg: number = 0;
        public PatHeightInCM: number = 0;
        private CalculateTotalDose(): number {
            let CalculatedDoseValue: number = 0;
            if (String.Equals(this.ReqDoseSecondUOM.Value, CConstants.M2Code)) {
                CalculatedDoseValue = Convert.ToDouble(this.RequestedDose) * PatientContext.CalculatedBSA;
            }
            else if (String.Equals(this.ReqDoseSecondUOM.Value, CConstants.KgCode)) {
                this.PatWeightInKg = CommonBB.ConvertWeightIntoKg(this.PatientWeightUOM, this.PatientWeight);
                if (this.IsRecordedWeight) {
                    CalculatedDoseValue = Convert.ToDouble(this.RequestedDose) * (this.PatWeightInKg);
                }
                else if (this.IsIdealBodyWeight) {
                    CalculatedDoseValue = Convert.ToDouble(this.RequestedDose) * (this.IBWWeight);
                }
                else if (this.IsAdjustedBodyWeight) {
                    CalculatedDoseValue = Convert.ToDouble(this.RequestedDose) * (this.ABWWeight);
                }
            }
            return CalculatedDoseValue;
        }
        public UOMDisplayFormat(): string {
            let sUOMDisplayFormat: string = String.Empty;
            if (this.RequestedDoseFirstUOM != null && !String.IsNullOrEmpty(this.RequestedDoseFirstUOM.DisplayText)) {
                if (this.IsContineousInfusion && this.ReqDoseThirdUOM != null && !String.IsNullOrEmpty(this.ReqDoseThirdUOM.DisplayText)) {
                    sUOMDisplayFormat = this.RequestedDoseFirstUOM.DisplayText + "/" + this.ReqDoseThirdUOM.DisplayText;
                }
                else {
                    sUOMDisplayFormat = this.RequestedDoseFirstUOM.DisplayText;
                }
            }
            return sUOMDisplayFormat;
        }
        public DoseCalcValidation(doFocus: boolean): boolean {
            this.bIsValid = true;
            let dOrdAmount: number = 0, dReqDose = 0;
            if (!String.IsNullOrEmpty(this.OrderedAmountPerDose)) {
                dOrdAmount = Convert.ToDouble(this.OrderedAmountPerDose);
            }
            if (!String.IsNullOrEmpty(this.RequestedDose)) {
                dReqDose = Convert.ToDouble(this.RequestedDose);
            }
            if (!String.IsNullOrEmpty(this.DoseCalcError)) {
                this.bIsValid = false;
            }
            else if (String.IsNullOrEmpty(this.RequestedDose) || dReqDose == 0.0) {
                this.RequestedDose = String.Empty;
                this.BorderBCRegDose = this.WarningColor;
                if (this.OnFocusEvent != null) {
                    this.OnFocusEvent("txtRequestedDose");
                }
                this.bIsValid = false;
            }
            else if (this.RequestedDoseFirstUOM == null || (this.RequestedDoseFirstUOM != null && String.IsNullOrEmpty(this.RequestedDoseFirstUOM.DisplayText))) {
                this.BorderBCRegDoseUOM = this.WarningColor;
                this.DCFirstUOMErroVisibility = Visibility.Visible;
                if (doFocus && this.OnFocusEvent != null) {
                    this.OnFocusEvent("cboReqDoseUOM");
                }
                this.bIsValid = false;
            }
            else if (this.ReqDoseSecondUOM == null || (this.ReqDoseSecondUOM != null && String.IsNullOrEmpty(this.ReqDoseSecondUOM.DisplayText))) {
                this.BorderBCSecondUOM = this.WarningColor;
                this.DCSecondUOMErroVisibility = Visibility.Visible;
                if (this.OnFocusEvent != null) {
                    this.OnFocusEvent("cboReqDoseSecondUOM");
                }
                this.bIsValid = false;
            }
            else if (this.IsContineousInfusion && (this.ReqDoseThirdUOM == null || (this.ReqDoseThirdUOM != null && String.IsNullOrEmpty(this.ReqDoseThirdUOM.DisplayText)))) {
                this.BorderBCThirdUOM = this.WarningColor;
                this.DCThirdUOMErroVisibility = Visibility.Visible;
                if (this.OnFocusEvent != null) {
                    this.OnFocusEvent("cboReqDoseThirdUOM");
                }
                this.bIsValid = false;
            }
            else if (this.OptDailyDose && (this.Frequency == null || (this.Frequency != null && String.IsNullOrEmpty(this.Frequency.Value)))) {
                this.BorderBCFrequency = this.WarningColor;
                this.DCFrequencyErroVisibility = Visibility.Visible;
                if (this.OnFocusEvent != null) {
                    this.OnFocusEvent("cboFrequency");
                }
                this.bIsValid = false;
            }
            else if (this.ReqDoseSecondUOM != null && !String.IsNullOrEmpty(this.ReqDoseSecondUOM.DisplayText) && String.Equals(this.ReqDoseSecondUOM.Value, CConstants.M2Code) && (this.BSAFormula == null || (this.BSAFormula != null && String.IsNullOrEmpty(this.BSAFormula.DisplayText)))) {
                this.BorderBCBSAFormula = this.WarningColor;
                this.DCBSAFormulaErroVisibility = Visibility.Visible;
                if (this.OnFocusEvent != null) {
                    this.OnFocusEvent("cboBSAFormula");
                }
                this.bIsValid = false;
            }
            else if (this.DoseCalCommonFieldVisibility == Visibility.Visible && dOrdAmount == 0) {
                this.OrderedAmountPerDose = String.Empty;
                this.OrdDoseUOMDisplayError = Resource.DoseCalculator.OrdAmtZeroErrorMsg;
                this.bIsValid = false;
                if (!this.bIsValid && this.OnFocusEvent != null) {
                    this.OnFocusEvent("txtOrderedAmtDose");
                }
            }
            else if (this.IsOrderOverride && (this.Overridereason == null || (this.Overridereason != null && String.IsNullOrEmpty(this.Overridereason.Value)))) {
                this.BorderBCOverDose = this.WarningColor;
                this.DCOverdoseErroVisibility = Visibility.Visible;
                if (this.OnFocusEvent != null) {
                    this.OnFocusEvent("cboOverrideReason");
                }
                this.bIsValid = false;
            }
            else if (this.IsBSA == false && this.IsWeight == false) {
                this.DCBOnWeightErroVisibility = Visibility.Visible;
                if (this.OnFocusEvent != null) {
                    this.OnFocusEvent("OptWeight");
                }
                this.bIsValid = false;
            }
            return this.bIsValid;
        }
        private IsWeightNotEqualsWithConfigPercent(dIBWWeight: number, RequiredValidation: boolean): boolean {
            let IsABWEligible: boolean = false;
            let dbWeightAfterIBWPlusConfiguredPercentUpper: number = 0.0, dbWeightAfterIBWPlusConfiguredPercentLower = 0.0;
            dbWeightAfterIBWPlusConfiguredPercentLower = Math.Round(dIBWWeight - ((this.IdealBodyWeightPercentageExceeds / CConstants.dbPercentageCalc) * dIBWWeight), 2);
            dbWeightAfterIBWPlusConfiguredPercentUpper = Math.Round(dIBWWeight + ((this.IdealBodyWeightPercentageExceeds / CConstants.dbPercentageCalc) * dIBWWeight), 2);
            let PatWeightInKg: number = this.PatientWeight;
            if (String.Equals(this.PatientWeightUOM, CommonBBConstant.WeightGram)) {
                PatWeightInKg = this.PatientWeight / CConstants.ConGrmToKg;
            }
            else if (String.Equals(this.PatientWeightUOM, CommonBBConstant.WeightPound)) {
                PatWeightInKg = this.PatientWeight / CConstants.ConPoundToKg;
            }
            if (this.IdealBodyWeightPercentageExceeds > 0 && this.AdjfactorAdjBWcalc > 0.0 && (!(PatWeightInKg > dbWeightAfterIBWPlusConfiguredPercentLower && PatWeightInKg <= dbWeightAfterIBWPlusConfiguredPercentUpper))) {
                IsABWEligible = true;
                this.AdjBWWarningMsg = Resource.DoseCalculator.ErrMsg_ABWAdvisablePart1 + " " + this.IdealBodyWeightPercentageExceeds + Resource.DoseCalculator.ErrMsg_ABWAdvisablePart2;
                if (this.IsIdealBodyWeight) {
                    this.AdjBWWarningVisibility = Visibility.Visible;
                }
                else {
                    this.AdjBWWarningVisibility = Visibility.Collapsed;
                }
            }
            return IsABWEligible;
        }
        public DoseCalInprogress: boolean = false;
        private CalculateIBW(): void {
            if (this.ValidateIBW(true)) {
                this.IBWWeight = this.GetCalculatedIBW();
            }
            if (this.IBWWeight > 0.0) {
                this.DCCalculatedValue = this.IBWValue;
                this.BSAWeightOutputVisibility = Visibility.Visible;
                this.DoseCalculate(true);
            }
        }
        public GetCalculatedIBW(): number {
            this.IBWWeight = 0;
            let PatHeightInInches: number = 0;
            PatHeightInInches = this.IsHeightLessthan60Inches(this.PatientHeight, this.PatientHeightUOM);
            if (PatientContext.Sex == CConstants.MaleSexConceptCode) {
                if (PatHeightInInches > CConstants.dbPatientHeightLimit) {
                    this.IBWWeight = 50 + (2.3 * Math.Abs(60 - PatHeightInInches));
                    if (this.IBWWeight > 0.0) {
                        this.IBWValue = Math.Round(this.IBWWeight, 3) + " " + (this.ReqDoseSecondUOM != null ? this.ReqDoseSecondUOM.DisplayText : String.Empty);
                        ;
                    }
                }
            }
            else if (PatientContext.Sex == CConstants.FemaleSexConceptCode) {
                if (PatHeightInInches > CConstants.dbPatientHeightLimit) {
                    this.IBWWeight = 45.5 + (2.3 * Math.Abs(60 - PatHeightInInches));
                    if (this.IBWWeight > 0.0) {
                        this.IBWValue = Math.Round(this.IBWWeight, 3) + " " + (this.ReqDoseSecondUOM != null ? this.ReqDoseSecondUOM.DisplayText : String.Empty);
                    }
                }
            }
            return this.IBWWeight;
        }
        public ValidateRBW(): boolean {
            let IsValid: boolean = true;
            if (this.PatientWeight == 0) {
                this.DoseCalcError = Resource.DoseCalculator.ErrMsg_ValidateRBWWeight_NotAvailable;
                IsValid = false;
            }
            else if (this.IsWeighttOutOfDate) {
                this.DoseCalcError = Resource.DoseCalculator.ErrMsg_ValidateRBWWeight_Outdate;
                IsValid = false;
            }
            return IsValid;
        }
        public ValidateIBW(isRequiredErrordisplay: boolean): boolean {
            let IsValid: boolean = true;
            let PatHeightInInches: number = 0;
            if (!String.IsNullOrEmpty(PatientContext.Sex) && (PatientContext.Sex.Equals(CConstants.MaleSexConceptCode) || PatientContext.Sex.Equals(CConstants.FemaleSexConceptCode))) {
                if ((this.PatientHeight == 0)) {
                    IsValid = false;
                    if (isRequiredErrordisplay) {
                        this.DoseCalcError = Resource.DoseCalculator.ErrMsg_ValidateHeightIBW_NotAvailable;
                    }
                }
                else if (this.CheckHeightOutOfDate()) {
                    IsValid = false;
                    if (isRequiredErrordisplay) {
                        this.DoseCalcError = Resource.DoseCalculator.ErrMsg_ValidateHeightIBW_outdate;
                    }
                }
                else {
                    PatHeightInInches = this.IsHeightLessthan60Inches(this.PatientHeight, this.PatientHeightUOM);
                    if (PatHeightInInches < CConstants.dbPatientHeightLimit) {
                        if (isRequiredErrordisplay) {
                            this.DoseCalcError = Resource.DoseCalculator.ErrMsg_ValidateHeightOver60;
                        }
                        IsValid = false;
                    }
                }
            }
            else {
                if (isRequiredErrordisplay) {
                    this.DoseCalcError = Resource.DoseCalculator.ErrMsg_GenderNotCompatible;
                }
                IsValid = false;
            }
            return IsValid;
        }
        public CheckABWEligibility(): void {
            this.AdjBWWarningVisibility = Visibility.Collapsed;
            if (this.IdealBodyWeightPercentageExceeds > 0 && this.AdjfactorAdjBWcalc > 0.0 && this.PatientWeight > 0.0 && this.ValidateIBW(false)) {
                this.IBWWeight = this.GetCalculatedIBW();
                if (this.IBWWeight > 0 && this.IsWeightNotEqualsWithConfigPercent(this.IBWWeight, false)) {
                    this.IsABWEnabled = true;
                }
                else {
                    this.IsABWEnabled = false;
                }
            }
            else {
                this.IsABWEnabled = false;
            }
        }
        public CalculateABW(): void {
            this.ABWWeight = this.IBWWeight + (this.AdjfactorAdjBWcalc * (this.PatWeightInKg - this.IBWWeight));
            if (this.ABWWeight > 0.0) {
                this.ABWValue = Math.Round(this.ABWWeight, 3) + " " + "kg";
                this.DCCalculatedValue = this.ABWValue;
                this.BSAWeightOutputVisibility = Visibility.Visible;
                this.DoseCalculate(true);
            }
        }
        private IsHeightLessthan60Inches(dbPatientHeight: number, sPatHeightUOM: string): number {
            let PatHeightInCM: number = 0;
            let PatHeightInInches: number = 0;
            if (dbPatientHeight > 0) {
                if (!String.IsNullOrEmpty(sPatHeightUOM)) {
                    if (String.Equals(sPatHeightUOM, CommonBBConstant.HeightCM)) {
                        PatHeightInCM = dbPatientHeight;
                    }
                    else if (!String.IsNullOrEmpty(sPatHeightUOM) && String.Equals(sPatHeightUOM, CommonBBConstant.HeightFeet)) {
                        PatHeightInCM = dbPatientHeight / CommonBBConstant.HeightCMConvertValue;
                    }
                    else if (!String.IsNullOrEmpty(sPatHeightUOM) && String.Equals(sPatHeightUOM, CommonBBConstant.HeightMetre)) {
                        PatHeightInCM = dbPatientHeight / CommonBBConstant.ConvertFromMetreToCM;
                    }
                    PatHeightInInches = PatHeightInCM * CommonBBConstant.HeightCMToInchConvVal;
                }
            }
            return PatHeightInInches;
        }
        public GetSelectedBSAFormula(sBSAFormula: string): CListItem {
            let oBSAFormula: CListItem = null;
            if (this.BSAFormulaList != null && this.BSAFormulaList.Count > 0) {
                let objBSAFormula = this.BSAFormulaList.Where(x => String.Equals(x.Value, sBSAFormula));
                if (objBSAFormula != null && objBSAFormula.Count() > 0) {
                    oBSAFormula = objBSAFormula.First();
                }
            }
            return oBSAFormula;
        }
        public GetDoseUOMItemByOID(lReqUOMOID: number): CListItem {
            let oReqDoseUOM: CListItem = null;
            if (lReqUOMOID > 0 && this.RequestedDoseFirstUOMList != null && this.RequestedDoseFirstUOMList.Count > 0) {
                let oRequestedDoseFirstUOM = this.RequestedDoseFirstUOMList.Where(x => x.Value == Convert.ToString(lReqUOMOID));
                if (oRequestedDoseFirstUOM != null && oRequestedDoseFirstUOM.Count() > 0) {
                    oReqDoseUOM = oRequestedDoseFirstUOM.First();
                }
            }
            return oReqDoseUOM;
        }
        public GetListItemInfUOM(sInfusionUOM: string): CListItem {
            let oInfusionUOM: CListItem = null;
            if (!String.IsNullOrEmpty(sInfusionUOM) && this.ReqDoseThirdUOMList != null && this.ReqDoseThirdUOMList.Count > 0) {
                let oReqThirdUOM = this.ReqDoseThirdUOMList.Where(x => String.Equals(x.Value, sInfusionUOM));
                if (oReqThirdUOM != null && oReqThirdUOM.Count() > 0) {
                    oInfusionUOM = oReqThirdUOM.First();
                }
            }
            return oInfusionUOM;
        }
        public GetFrequencyByOID(lFrequencyOID: number): CListItem {
            let oFrequency: CListItem = null;
            if (lFrequencyOID > 0 && this.Frequencys != null && this.Frequencys.Count > 0) {
                let objFrequency = this.Frequencys.Where(x => x.Value == Convert.ToString(lFrequencyOID));
                if (objFrequency != null && objFrequency.Count() > 0) {
                    oFrequency = objFrequency.First();
                }
            }
            return oFrequency;
        }
        public GetOverrideReasonItem(sOverrideReason: string): CListItem {
            let oOverrideReason: CListItem = null;
            if (!String.IsNullOrEmpty(sOverrideReason) && this.OverridereasonList != null && this.OverridereasonList.Count > 0) {
                let ObjOverrideReason = this.OverridereasonList.Where(x => String.Equals(x.Value, sOverrideReason));
                if (ObjOverrideReason != null && ObjOverrideReason.Count() > 0) {
                    oOverrideReason = ObjOverrideReason.First();
                }
            }
            return oOverrideReason;
        }
        public GetSecondUOMDisplayText(sCode: string): string {
            let sDispText: string = String.Empty;
            if (this.ReqDoseSecondUOMList != null && this.ReqDoseSecondUOMList.Count > 0) {
                sDispText = this.ReqDoseSecondUOMList.Where(x => x.Value == sCode).Select(x => x.DisplayText).FirstOrDefault();
            }
            return sDispText;
        }
        private GetLatestHeightWeight(): void {
            this.PatientHeight = this.PatientCurrentHeight;
            this.PatientHeightUOM = this.PatientCurrnetHeightUOM;
            this.PatientWeight = this.PatientCurrentWeight;
            this.PatientWeightUOM = this.PatientCurrnetWeightUOM;
        }
        private oLaunchPresConsideration: RelayCommand;
        public get LaunchPresConsideration(): RelayCommand {
            if (this.oLaunchPresConsideration == null) {
                this.oLaunchPresConsideration = new RelayCommand((s,e) => {this.LaunchPresConsiderationWizard()});
            }
            return this.oLaunchPresConsideration;
        }
        async LaunchPresConsiderationWizard() {
            if (!this.IsAuthorise) {
                let oReturn = await HtmlPage.Window.InvokeAsync("ActivityConsideration", this.IsClinicalNote, PatientContext.PatientOID);
                iBusyIndicator.Start("CDCGETVALUE", true);
                let IsClearEnabled = this.IsClearEnabled;
                // Revisit - String extension need to expose .Length to .length
                if (oReturn != null && typeof oReturn === "string" && oReturn.ToString().length > 0) {
                    this.IsHeightWeightRecordedInDoseCalc = true;
                    this.GetPrescribeConsiderationDetail(oReturn);
                    if (this.CanPerformDoseCalc) {
                        this.PerformDoseCalculation(true);
                    }
                }
                this.IsClearEnabled = IsClearEnabled;
                iBusyIndicator.Stop("CDCGETVALUE");
            }
        }
        public GetPatientConsideration4DC(): void {
            iBusyIndicator.Start("CDCGETVALUE", true);
            let oReturn: Object = HtmlPage.Window.Invoke("GetDataItemRecordedDate", null);
            if (oReturn != null && typeof oReturn === "string" && oReturn.ToString().length > 0) {
                this.GetPrescribeConsiderationDetail(oReturn);
                if (this.CanPerformDoseCalc) {
                    this.PerformDoseCalculation(true);
                }
                this.CanPerformDoseCalc = true;
                if (!this.IsDoseCalcPerformed && this.oDoseCalcDefault == null) {
                    this.IsClearEnabled = false;
                    this.IsOnLoad = true;
                }
                else if (this.IsDoseCalcPerformed || this.oDoseCalcDefault != null) {
                    this.IsClearEnabled = true;
                    if (this.IsDoseCalcPerformed) {
                        this.AdjBWWarningVisibility = Visibility.Collapsed;
                        this.ValidateHeightandWeight(this.PatientCurrentHeight, this.PatientCurrentWeight);
                    }
                }
            }
            iBusyIndicator.Stop("CDCGETVALUE");
        }
        private CurrentHeightUpdatedOn: DateTime= DateTime.MinValue;
        private CurrentWeightUpdatedOn: DateTime= DateTime.MinValue;
        public DCRecordedHeightUpdatedOn: DateTime= DateTime.MinValue;
        public DCREcordedWeightUpdatedOn: DateTime= DateTime.MinValue;
        public CalculatedDTTM: DateTime= DateTime.MinValue;
        public IsRecordDTTMchangedDueToObselete: boolean = false;
        private GetPrescribeConsiderationDetail(oReturn: Object): void {
            let sGestationAgeValue: string = String.Empty;
            let sHValue: string = "NOT RECORDED";
            let sWValue: string = "NOT RECORDED";
            let sWeight: string = String.Empty;
            let sHeight: string = String.Empty;
            let sPatValueType: string = String.Empty;
            if (oReturn != null && typeof oReturn === "string" && oReturn.ToString().length > 0) {
                let arrValues: string[] = oReturn.ToString().Split(',');
                if (arrValues.length > 0 && !String.IsNullOrEmpty(arrValues[0])) {
                    sWValue = arrValues[0].Replace("  ", " ");
                }
                if (arrValues.length > 1 && !String.IsNullOrEmpty(arrValues[1])) {
                    sHValue = arrValues[1].Replace("  ", " ");
                }
                if (arrValues.length > 2 && !String.IsNullOrEmpty(arrValues[2])) {
                    sGestationAgeValue = arrValues[2].Replace("  ", " ");
                }
                sWValue = sWValue.Replace(":Recorded on :", " on ");
                sHValue = sHValue.Replace(":Recorded on :", " on ");
                sWeight = (arrValues.length > 3 && !String.IsNullOrEmpty(arrValues[3])) ? arrValues[3].Trim() : String.Empty;
                sHeight = (arrValues.length > 4 && !String.IsNullOrEmpty(arrValues[4])) ? arrValues[4].Trim() : String.Empty;
                if (!String.IsNullOrEmpty(sHeight) || !String.IsNullOrEmpty(sHValue)) {
                    let sHeightRecordedOn: string = String.Empty;
                    sPatValueType = "Height";
                    if (arrValues != null && arrValues.length > 1) {
                        let sHeightRecordedOnWithTime: string = String.Empty;
                        if (!String.IsNullOrEmpty(arrValues[1]) && arrValues[1].Contains(':')) {
                            let obsValues: string[] = arrValues[1].Split(':');
                            if (obsValues != null) {
                                if (obsValues.length > 1) {
                                    sHeightRecordedOn = obsValues[2];
                                }
                                if (obsValues.length > 2) {
                                    sHeightRecordedOn = sHeightRecordedOn + ":" + obsValues[3];
                                }
                            }
                            if (!String.IsNullOrEmpty(sHeightRecordedOn)) {
                                this.CurrentHeightUpdatedOn = DateTime.Parse(sHeightRecordedOn);
                                sHeightRecordedOn = sHeightRecordedOn.Trim().Substring(0, 11);
                                sHeightRecordedOnWithTime = arrValues[1].Split(':')[2] + ":" + arrValues[1].Split(':')[3];
                                PatientContext.PatientHeightDTTM = Convert.ToDateTime(sHeightRecordedOnWithTime);
                            }
                        }
                        if (arrValues[1].Contains("Estimated")) {
                            PatientContext.isEstimatedHeight = true;
                            this.IsHeightEstimated = true;
                        }
                        else {
                            PatientContext.isEstimatedHeight = false;
                            this.IsHeightEstimated = false;
                        }
                    }
                    PatientContext.PatientHeightRecordedOn = sHeightRecordedOn;
                }
                else {
                    PatientContext.PatientHEIGHT = String.Empty;
                    PatientContext.PatientHeightRecordedOn = String.Empty;
                }
                if (!String.IsNullOrEmpty(sWeight) || !String.IsNullOrEmpty(sWValue)) {
                    let sWeightRecordedOn: string = String.Empty;
                    sPatValueType = "Weight";
                    if (arrValues != null && arrValues.length > 0) {
                        if (!String.IsNullOrEmpty(arrValues[0]) && arrValues[0].Contains(':')) {
                            let sWeightRecordedOnWithTime: string = String.Empty;
                            let obsValues: string[] = arrValues[0].Split(':');
                            if (obsValues != null) {
                                if (obsValues.length > 1) {
                                    sWeightRecordedOn = obsValues[2];
                                }
                                if (obsValues.length > 2) {
                                    sWeightRecordedOn = sWeightRecordedOn + ":" + obsValues[3];
                                }
                            }
                            if (!String.IsNullOrEmpty(sWeightRecordedOn)) {
                                this.CurrentWeightUpdatedOn = DateTime.Parse(sWeightRecordedOn);
                                sWeightRecordedOn = sWeightRecordedOn.Trim().Substring(0, 11);
                                sWeightRecordedOnWithTime = arrValues[0].Split(':')[2] + ":" + arrValues[0].Split(':')[3];
                                PatientContext.PatientWeightDTTM = Convert.ToDateTime(sWeightRecordedOnWithTime);
                            }
                        }
                        if (arrValues[0].Contains("Estimated")) {
                            PatientContext.isEstimatedWeight = true;
                            this.IsWeightEstimated = true;
                        }
                        else {
                            PatientContext.isEstimatedWeight = false;
                            this.IsWeightEstimated = false;
                        }
                    }
                    PatientContext.PatientWeightRecordedOn = sWeightRecordedOn;
                }
                else {
                    PatientContext.PatientWEIGHT = String.Empty;
                    PatientContext.PatientWeightRecordedOn = String.Empty;
                }
            }
            if (!String.IsNullOrEmpty(sHeight)) {
                this.HeightValue = sHeight + " on " + PatientContext.PatientHeightDTTM.ToString(CConstants.LongDateWithoutSecs);
            }
            else if (!String.IsNullOrEmpty(sHValue) && !sHValue.Equals("NOT RECORDED")) {
                let hgtArr: string[] = sHValue.Split(':');
                if (hgtArr != null && hgtArr.length > 0) {
                    sHeight = hgtArr[0];
                    this.HeightValue = sHeight + " on " + PatientContext.PatientHeightDTTM.ToString(CConstants.LongDateWithoutSecs);
                }
            }
            else {
                this.HeightValue = sHValue;
            }
            if (!String.IsNullOrEmpty(sWeight)) {
                this.WeightValue = sWeight + " on " + PatientContext.PatientWeightDTTM.ToString(CConstants.LongDateWithoutSecs);
            }
            else if (!String.IsNullOrEmpty(sWValue) && !sWValue.Equals("NOT RECORDED")) {
                let WgtArr: string[] = sWValue.Split(':');
                if (WgtArr != null && WgtArr.length > 0) {
                    sWeight = WgtArr[0];
                    this.WeightValue = sWeight + " on " + PatientContext.PatientWeightDTTM.ToString(CConstants.LongDateWithoutSecs);
                }
            }
            else {
                this.WeightValue = sWValue;
            }
            this.GetUnitDetail(sHeight, sWeight);
            if (!this.IsDoseCalcPerformed) {
                this.GetLatestHeightWeight();
                this.CanPerformDoseCalc = true;
            }
            else if (!(!String.IsNullOrEmpty(PatientContext.EncounterStatusCode) && String.Equals(PatientContext.EncounterStatusCode, CConstants.ClosedEncounterCode, StringComparison.InvariantCultureIgnoreCase))) {
                if ((DateTime.GreaterThan(this.CurrentHeightUpdatedOn, this.CalculatedDTTM) || DateTime.GreaterThan(this.CurrentWeightUpdatedOn, this.CalculatedDTTM))) {
                    this.RecalculateErrorMsg = Resource.DoseCalculator.RecalculateErrMsg;
                    this.RecalculateVisibility = Visibility.Visible;
                }
            }
        }
        private GetUnitDetail(sHeight: string, sWeight: string): void {
            let Arrval: string[];
            let sUnit: string = String.Empty, sValue = String.Empty;
            if (!String.IsNullOrEmpty(sHeight)) {
                Arrval = sHeight.Split(' ');
                if (Arrval != null && Arrval.length > 0) {
                    if (Arrval.length > 0) {
                        sValue = Arrval[0];
                        this.PatientCurrentHeight = Convert.ToDouble(sValue);
                    }
                    if (Arrval.length > 1) {
                        sUnit = Arrval[1];
                        this.PatientCurrnetHeightUOM = this.GetUnitValue(sUnit);
                    }
                }
            }
            sUnit = String.Empty;
            sValue = String.Empty;
            if (!String.IsNullOrEmpty(sWeight)) {
                Arrval = sWeight.Split(' ');
                if (Arrval != null && Arrval.length > 0) {
                    if (Arrval.length > 0) {
                        sValue = Arrval[0];
                        this.PatientCurrentWeight = Convert.ToDouble(sValue);
                    }
                    if (Arrval.length > 1) {
                        sUnit = Arrval[1];
                        this.PatientCurrnetWeightUOM = this.GetUnitValue(sUnit);
                    }
                }
            }
        }
        private GetUnitValue(sUnit: string): string {
            let UnitConceptCode: string = String.Empty;
            switch (sUnit) {
                case "m":
                    {
                        UnitConceptCode = CommonBBConstant.HeightMetre;
                        break;
                    }
                case "cm":
                    {
                        UnitConceptCode = CommonBBConstant.HeightCM;
                        break;
                    }
                case "kg":
                    {
                        UnitConceptCode = CommonBBConstant.WeightKg;
                        break;
                    }
                case "g":
                    {
                        UnitConceptCode = CommonBBConstant.WeightGram;
                        break;
                    }
            }
            return UnitConceptCode;
        }
        private CheckHightWeightUpdated(sHeight: string, sWeight: string): boolean {
            let IsHWupdated: boolean = false;
            if (this.PatientCurrentHeight != this.PatientHeight || !this.PatientCurrnetHeightUOM.Equals(this.PatientHeightUOM) || this.PatientCurrentWeight != this.PatientWeight || !this.PatientCurrnetWeightUOM.Equals(this.PatientWeightUOM)) {
                IsHWupdated = true;
            }
            return IsHWupdated;
        }
        CalculationInprogress: boolean = false;
        public PerformDoseCalculation(doFocus: boolean): void {
            if (!this.CalculationInprogress) {
                this.GetLatestHeightWeight();
                if (this.IsAdjustedBodyWeight) {
                    this.CheckABWEligibility();
                    if (!this.IsABWEnabled) {
                        this.IsAdjustedBodyWeight = false;
                        this.IsIdealBodyWeight = true;
                    }
                    else {
                        this.PerformDoseCalcMain(doFocus);
                    }
                }
                else {
                    this.PerformDoseCalcMain(doFocus);
                }
                this.CalculationInprogress = false;
            }
        }
        public PerformDoseCalcMain(doFocus: boolean): void {
            this.ClearAllCalculatedValues();
            this.SetDefaultBorderBrushColor();
            this.CalculationInprogress = true;
            this.IsDoseReCalculated = false;
            this.IsBSAOptMandatory = false;
            this.DoseCalErroVisibility = Visibility.Collapsed;
            this.RecalculateVisibility = Visibility.Collapsed;
            this.ValidateHeightandWeight(this.PatientHeight, this.PatientWeight);
            if (!String.IsNullOrEmpty(this.DoseCalcError)) {
                if (!String.IsNullOrEmpty(this.DoseCalcError)) {
                    this.DoseCalErroVisibility = Visibility.Visible;
                }
                this.DoseCalCommonFieldVisibility = Visibility.Collapsed;
                this.BSAWeightVisibility = Visibility.Collapsed;
                this.BSAFieldVisibility = Visibility.Collapsed;
                this.WeightFieldVisibility = Visibility.Collapsed;
                this.TotalDoseValueVisibility = Visibility.Collapsed;
                this.BSAWeightOutputVisibility = Visibility.Collapsed;
            }
            else if (this.CanPerformDoseCalc) {
                this.DoseCalErroVisibility = Visibility.Collapsed;
                this.CheckDoseCalcVisibility();
                this.DefaultSecondDoseUOM();
                this.DoDoseCalculation(doFocus);
                this.IsClearEnabled = true;
            }
        }
        public GetDoseCalculationDisplayDetails(): void {
            this.DCCalcDisplay = String.Empty;
            this.DCCalcDisplayValue = String.Empty;
            this.DCTotalDoseDisplayValue = String.Empty;
            this.DCFrequencyDisplayValue = String.Empty;
            this.DCCalPerDoseDisplayValue = String.Empty;
            this.DCOrdPerDoseDisplayValue = String.Empty;
            this.DCOrdOverideValue = String.Empty;
            let DoseCalValue: string = String.Empty;
            let SecoundUOMDispText: string = String.Empty;
            SecoundUOMDispText = (this.ReqDoseSecondUOM != null ? this.ReqDoseSecondUOM.DisplayText : String.Empty);
            let dReqDoseValue: number = !String.IsNullOrEmpty(this.RequestedDose) ? Convert.ToDouble(this.RequestedDose) : 0;
            if (this.IsRecordedWeight) {
                this.DCCalcDisplay = Resource.DoseCalculator.OptRecordedWeight_Text;
                DoseCalValue = this.PatWeightInKg + " " + SecoundUOMDispText;
            }
            else if (this.IsIdealBodyWeight) {
                this.DCCalcDisplay = Resource.DoseCalculator.CalculatedIBW_Text;
                DoseCalValue = Math.Round(this.IBWWeight, 3) + " " + SecoundUOMDispText;
            }
            else if (this.IsAdjustedBodyWeight) {
                this.DCCalcDisplay = Resource.DoseCalculator.CalculatedABW_Text;
                DoseCalValue = Math.Round(this.ABWWeight, 3) + " " + (this.ReqDoseSecondUOM != null ? this.ReqDoseSecondUOM.DisplayText : String.Empty);
            }
            else if (this.IsBSA && this.BSAFormula != null && !String.IsNullOrEmpty(this.BSAFormula.Value)) {
                this.DCCalcDisplay = this.BSAFormula.DisplayText + " BSA(" + SecoundUOMDispText + ")";
                DoseCalValue = this.CalculatedBSA + " " + SecoundUOMDispText;
            }
            if (this.IsRecordedWeight && this.IsWeightEstimated) {
                this.DCCalcDisplayValue = " = " + DoseCalValue + " " + "(Estimated)";
            }
            else {
                this.DCCalcDisplayValue = " = " + DoseCalValue;
            }
            if (this.OptIndividualDose) {
                this.DCCalPerDoseDisplayValue = " = " + dReqDoseValue + " " + this.UOMDisplayFormat() + " x " + DoseCalValue;
                this.DCCalPerDoseDisplayValueTot = " = " + this.CalculatedAmountPerDoseDisplay;
            }
            else {
                this.DCTotalDoseDisplayValue = " = " + dReqDoseValue + " " + this.UOMDisplayFormat() + " x " + DoseCalValue;
                this.DCTotalDoseDisplayValueTot = " = " + this.TotalDailyDoseValueDisplay;
                if (this.Frequency != null) {
                    this.DCFrequencyDisplayValue = " = " + this.Frequency.DisplayText;
                }
                this.DCCalPerDoseDisplayValue = " = " + this.TotalDailyDoseValueDisplay + "/" + this.FreqLowEvent;
                this.DCCalPerDoseDisplayValueTot = " = " + this.CalculatedAmountPerDoseDisplay;
            }
            let dOrdAmt: number = !String.IsNullOrEmpty(this.OrderedAmountPerDose) ? Convert.ToDouble(this.OrderedAmountPerDose) : 0;
            this.DCOrdPerDoseDisplayValue = " = " + dOrdAmt + "  " + this.OrdDoseUOMDisplay;
            if (this.Overridereason != null) {
                this.DCOrdOverideValue = "(" + this.Overridereason.DisplayText + ")";
            }
        }
        private SetDefaultBorderBrushColor(): void {
            this.BorderBCRegDose = this.BorderBCRegDoseUOM = this.BorderBCFrequency = this.BorderBCThirdUOM = this.BorderBCBSAFormula = this.BorderBCOverDose = this.BorderBCSecondUOM = this.BorderBCOrderAmt = this.NormalColor;
            this.DCFirstUOMErroVisibility = Visibility.Collapsed;
            this.DCThirdUOMErroVisibility = Visibility.Collapsed;
            this.DCFrequencyErroVisibility = Visibility.Collapsed;
            this.DCBSAFormulaErroVisibility = Visibility.Collapsed;
            this.DCOverdoseErroVisibility = Visibility.Collapsed;
            this.DCSecondUOMErroVisibility = Visibility.Collapsed;
            this.DCBOnWeightErroVisibility = Visibility.Collapsed;
        }
        private DoDoseCalculation(doFocus: boolean): void {
            if (this.IsBSA || this.IsWeight) {
                if (this.PatientHeight > 0 && !String.IsNullOrEmpty(this.PatientHeightUOM)) {
                    this.PatHeightInCM = CommonBB.ConvertHeightIntoCM(this.PatientHeightUOM, this.PatientHeight);
                }
                if (this.PatientWeight > 0 && !String.IsNullOrEmpty(this.PatientWeightUOM)) {
                    this.PatWeightInKg = CommonBB.ConvertWeightIntoKg(this.PatientWeightUOM, this.PatientWeight);
                }
                if (this.IsBSA) {
                    if (!this.CheckBSAHeightWeight()) {
                        this.HandleErrorVisibility();
                    }
                    else {
                        this.CalculateBSA();
                    }
                }
                else if (this.IsWeight) {
                    if (this.IsRecordedWeight) {
                        if (!this.ValidateRBW()) {
                            this.HandleErrorVisibility();
                        }
                        else {
                            this.DoseCalculate(doFocus);
                        }
                    }
                    else if (this.IsIdealBodyWeight) {
                        if (!this.ValidateIBW(true)) {
                            this.HandleErrorVisibility();
                        }
                        else {
                            this.CalculateIBW();
                        }
                    }
                    else if (this.IsAdjustedBodyWeight) {
                        if (!this.ValidateIBW(true)) {
                            this.HandleErrorVisibility();
                        }
                        else {
                            this.IBWWeight = this.GetCalculatedIBW();
                            this.CalculateABW();
                        }
                    }
                }
                this.IsOnLoad = false;
            }
        }
        private HandleErrorVisibility(): void {
            this.DoseCalErroVisibility = Visibility.Visible;
            this.DoseCalCommonFieldVisibility = Visibility.Collapsed;
            if (this.IsWeight) {
                this.WeightFieldVisibility = Visibility.Visible;
            }
            else if (this.IsBSA) {
                this.BSAFieldVisibility = Visibility.Visible;
            }
            else {
                this.BSAFieldVisibility = Visibility.Collapsed;
            }
        }
        public CheckDoseCalcVisibility(): void {
            this.TotalDoseValueVisibility = Visibility.Collapsed;
            if (this.OptDailyDose) {
                this.DailyDoseFieldVisibility = Visibility.Visible;
                this.CalculationFor = CConstants.DailyDose;
            }
            else {
                this.DailyDoseFieldVisibility = Visibility.Collapsed;
                this.CalculationFor = CConstants.PerDose;
            }
            if (this.OptIndividualDose) {
                this.DailyDoseFieldVisibility = Visibility.Collapsed;
                this.CalculationFor = CConstants.PerDose;
            }
            else {
                this.DailyDoseFieldVisibility = Visibility.Visible;
                this.CalculationFor = CConstants.DailyDose;
            }
            if (this.IsBSA || this.IsWeight) {
                this.BSAWeightVisibility = Visibility.Visible;
                this.BSAWeightOutputVisibility = Visibility.Collapsed;
                this.DoseCalCommonFieldVisibility = Visibility.Collapsed;
                if (this.IsBSA) {
                    this.BSAFieldVisibility = Visibility.Visible;
                    this.WeightFieldVisibility = Visibility.Collapsed;
                    this.BasedOnOptText = Resource.DoseCalculator.lblBSAFormula_Text;
                    this.IsBSAOptMandatory = true;
                    this.IsRecordedWeight = false;
                    this.IsIdealBodyWeight = false;
                    this.IsAdjustedBodyWeight = false;
                }
                else if (this.IsWeight) {
                    this.BSAFieldVisibility = Visibility.Collapsed;
                    this.WeightFieldVisibility = Visibility.Visible;
                    this.BasedOnOptText = Resource.DoseCalculator.lblWeightOption_Text;
                    this.IsBSAOptMandatory = false;
                    if (!(this.IsRecordedWeight || this.IsIdealBodyWeight || this.IsAdjustedBodyWeight)) {
                        this.IsRecordedWeight = true;
                    }
                    if (!this.IsAdjustedBodyWeight) {
                        this.CheckABWEligibility();
                    }
                }
            }
            else {
                this.DoseCalCommonFieldVisibility = Visibility.Collapsed;
                this.BSAWeightVisibility = Visibility.Collapsed;
                this.BSAFieldVisibility = Visibility.Collapsed;
                this.WeightFieldVisibility = Visibility.Collapsed;
                this.TotalDoseValueVisibility = Visibility.Collapsed;
                this.IsSecondUOMEnabled = true;
                this.BSAWeightOutputVisibility = Visibility.Collapsed;
            }
        }
        public DoseCalcOutputVisibilityCheck(): void {
            if (this.OptDailyDose) {
                this.TotalDoseValueVisibility = Visibility.Visible;
            }
            else {
                this.TotalDoseValueVisibility = Visibility.Collapsed;
            }
            if ((this.IsBSA || this.IsIdealBodyWeight || this.IsAdjustedBodyWeight)) {
                this.BSAWeightOutputVisibility = Visibility.Visible;
            }
            this.DoseCalCommonFieldVisibility = Visibility.Visible;
            this.DCDisplayDetailtVisibility = Visibility.Visible;
        }
        public DefaultSecondDoseUOM(): void {
            if (this.IsBSA) {
                if (this.ReqDoseSecondUOMList != null && this.ReqDoseSecondUOMList.Count > 0) {
                    this.ReqDoseSecondUOM = this.ReqDoseSecondUOMList.Where(x => x.Value == CConstants.M2Code).FirstOrDefault();
                    this.IsSecondUOMEnabled = false;
                }
            }
            else if (this.IsWeight) {
                if (this.ReqDoseSecondUOMList != null && this.ReqDoseSecondUOMList.Count > 0) {
                    this.ReqDoseSecondUOM = this.ReqDoseSecondUOMList.Where(x => x.Value == CConstants.KgCode).FirstOrDefault();
                    this.IsSecondUOMEnabled = false;
                }
            }
        }
        private ClearAllCalculatedValues(): void {
            this.DoseCalcError = String.Empty;
            this.OrdDoseUOMDisplayError = String.Empty;
            this.CalculatedBSADisplay = String.Empty;
            this.IBWValue = String.Empty;
            this.ABWValue = String.Empty;
            this.CalculatedAmountPerDoseDisplay = String.Empty;
            this.OrdDoseUOMDisplay = String.Empty;
            this.TotalDailyDoseValueDisplay = String.Empty;
            this.OrderedAmountPerDose = String.Empty;
            this.CalculatedAmountPerDose = 0;
            this.TotalDailyDose = 0;
            this.DisplayDoseCalculationDetail = String.Empty;
            if (!(this.IsBSA || this.IsIdealBodyWeight || this.IsAdjustedBodyWeight)) {
                this.DCCalculatedDisplayFor = String.Empty;
            }
            this.DCCalculatedValue = String.Empty;
            this.IsOrderOverride = false;
            this.Overridereason = null;
            this.HeightErrorText = String.Empty;
            this.WeightErrorText = String.Empty;
            this.DCDisplayDetailtVisibility = Visibility.Collapsed;
        }
    }
    export class DoseCalcDefault extends ViewModelBase {
        public BSAFormula: CListItem;
        public DoseCalcBasedOn: string;
        public CalculationFor: string;
        public RequestedDose: string;
        public RequestedDoseUOM: CListItem;
        public RequestDosePerUOM: CListItem;
        public RoundOffDose: string;
        public IsDoseCalcAlwaysUse: string;
        public MCVersion: string;
        public RequestDosePer2UOMLzoID: string;
        public DefaultWeightType: string;
        public MinDoseCap: Double;
        public MaxDoseCap: Double;
        public DoseCapUOM: CListItem;
        public ProductLzoID: string;
        public ProductName: string;
        public DosageFormType: string;
        public AdjfactorAdjBWcalc: number = 0;
        public ConfigDateDuration: number = 0;
        public ConfigDateDurationType: string;
        public IdealBodyWeightPercentageExceeds: number = 0;
        public Frequency: CListItem;
    }
