import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,  AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, CListItem} from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from '../../shared/epma-platform/soap-client/helper.service';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ClonableViewModelBase } from 'src/app/lorappmedicationcommonbb/model/cloneviewmodel';

    export class FormViewerDefaultsVM extends ClonableViewModelBase {
        private route: ObservableCollection<CListItem>;
        private routebc: ObservableCollection<CListItem>;
        private multiroute: ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
        private multiroute2: ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
        private strength: ObservableCollection<CListItem>;
        private masterFrequencys: ObservableCollection<CListItem>;
        private frequencys: ObservableCollection<CListItem>;
        private forms: ObservableCollection<CListItem>;
        private oldForms: ObservableCollection<CListItem>;
        private oldstrength: ObservableCollection<CListItem>;
        private oldroutes: ObservableCollection<CListItem>;
        private quantitys: ObservableCollection<CListItem>;
        private uoms: ObservableCollection<CListItem>;
        private stationarys: ObservableCollection<CListItem>;
        private treatToContinue: ObservableCollection<CListItem>;
        private reasonforModification: ObservableCollection<CListItem>;
        private medClerkingModificationReason: ObservableCollection<CListItem>;
        private clerkingReasonforModification: ObservableCollection<CListItem>;
        private duration: ObservableCollection<CListItem>;
        private DurationStep: ObservableCollection<CListItem>;
        private month: ObservableCollection<CListItem>;
        private supplyInstructions: ObservableCollection<CListItem>;
        private adminInstructions: ObservableCollection<CListItem>;
        private sites: ObservableCollection<CListItem>;
        private adminMethods: ObservableCollection<CListItem>;
        private _intervalInstalmentsUoM: ObservableCollection<CListItem>;
        private _prnInstructions: ObservableCollection<CListItem>;
        private _nonCatalogueReasons: ObservableCollection<CListItem>;
        private _infusiontypes: ObservableCollection<CListItem>;
        private distinctforms: ObservableCollection<CListItem>;
        private durationoriginal: ObservableCollection<CListItem>;
        private _ReviewAfterUOMListOriginal: ObservableCollection<CListItem>;
        private _OriginalUOM: ObservableCollection<CListItem>;
        private _OriginalInfUOM: ObservableCollection<CListItem>;
        private _bParamsDefaulted: boolean = false;
        public get ParamsDefaulted(): boolean {
            return this._bParamsDefaulted;
        }
        public set ParamsDefaulted(value: boolean) {
            this._bParamsDefaulted = value;
        }
        public get SupplyInstructions(): ObservableCollection<CListItem> {
            return this.supplyInstructions;
        }
        public set SupplyInstructions(value: ObservableCollection<CListItem>) {
            if (value != this.supplyInstructions) {
                this.supplyInstructions = value;
               //super.NotifyPropertyChanged("SupplyInstructions");
            }
        }
        private dispensingInstructiontext: string = "Select dispensing instructions to enter value(s)";
        private dispensingInstructionVal: string = String.Empty;
        public get Month(): ObservableCollection<CListItem> {
            return this.month;
        }
        public set Month(value: ObservableCollection<CListItem>) {
            if (this.month != value) {
                this.month = value;
               //super.NotifyPropertyChanged("Month");
            }
        }
        private doseType: ObservableCollection<CListItem>;
        public get Stationarys(): ObservableCollection<CListItem> {
            return this.stationarys;
        }
        public set Stationarys(value: ObservableCollection<CListItem>) {
            this.stationarys = value;
           //super.NotifyPropertyChanged("Stationarys");
        }
        public get AdminMethods(): ObservableCollection<CListItem> {
            return this.adminMethods;
        }
        public set AdminMethods(value: ObservableCollection<CListItem>) {
            this.adminMethods = value;
           //super.NotifyPropertyChanged("AdminMethods");
        }
        public get OriginalUOM(): ObservableCollection<CListItem> {
            return this._OriginalUOM;
        }
        public set OriginalUOM(value: ObservableCollection<CListItem>) {
            if (value != null) {
                this._OriginalUOM = value;
            }
           //super.NotifyPropertyChanged("OriginalUOM");
        }
        public get OriginalInfUOM(): ObservableCollection<CListItem> {
            return this._OriginalInfUOM;
        }
        public set OriginalInfUOM(value: ObservableCollection<CListItem>) {
            if (value != null) {
                this._OriginalInfUOM = value;
            }
           //super.NotifyPropertyChanged("OriginalInfUOM");
        }
        public get Uoms(): ObservableCollection<CListItem> {
            return this.uoms;
        }
        public set Uoms(value: ObservableCollection<CListItem>) {
            if (value != null) {
                let sorteduoms = value.Where(item =>!String.Equals(item.Value,"cc_more",StringComparison.CurrentCultureIgnoreCase)).OrderBy(item=>item.DisplayText).Select(item => item); 
		if (sorteduoms != null && sorteduoms.Count() > 0) {
                    let sortedUOMList: ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
                    sorteduoms.forEach( (item)=> {
                        sortedUOMList.Add(item);
                    });
                    if (value.Where(c => String.Equals(c.Value, "cc_more", StringComparison.CurrentCultureIgnoreCase)).Count() > 0) {
                        sortedUOMList.Add(ObjectHelper.CreateObject(new CListItem, { DisplayText: "More", Value: "CC_More" }));
                    }
                    this.uoms = sortedUOMList;
                }
                else {
                    this.uoms = value;
                }
            }
            else {
                this.uoms = value;
            }
           //super.NotifyPropertyChanged("Uoms");
        }
        public get Routes(): ObservableCollection<CListItem> {
            return this.route;
        }
        public set Routes(value: ObservableCollection<CListItem>) {
            this.route = value;
           //super.NotifyPropertyChanged("Routes");
        }
        public get RoutesBC(): ObservableCollection<CListItem> {
            return this.routebc;
        }
        public set RoutesBC(value: ObservableCollection<CListItem>) {
            this.routebc = value;
           //super.NotifyPropertyChanged("RoutesBC");
        }
        public get MultiRoutes(): ObservableCollection<CListItem> {
            return this.multiroute;
        }
        public set MultiRoutes(value: ObservableCollection<CListItem>) {
            this.multiroute = value;
           //super.NotifyPropertyChanged("MultiRoutes");
        }
        public get MultiRoute2(): ObservableCollection<CListItem> {
            return this.multiroute2;
        }
        public set MultiRoute2(value: ObservableCollection<CListItem>) {
            this.multiroute2 = value;
           //super.NotifyPropertyChanged("MultiRoutes");
        }
        public get Strengths(): ObservableCollection<CListItem> {
            return this.strength;
        }
        public set Strengths(value: ObservableCollection<CListItem>) {
            this.strength = value;
           //super.NotifyPropertyChanged("Strengths");
        }
        public get PreviousStrengths(): ObservableCollection<CListItem> {
            return this.oldstrength;
        }
        public set PreviousStrengths(value: ObservableCollection<CListItem>) {
            this.oldstrength = value;
           //super.NotifyPropertyChanged("PreviousStrengths");
        }
        public get PreviousRoutes(): ObservableCollection<CListItem> {
            return this.oldroutes;
        }
        public set PreviousRoutes(value: ObservableCollection<CListItem>) {
            this.oldroutes = value;
           //super.NotifyPropertyChanged("PreviousRoutes");
        }
        public get Frequencys(): ObservableCollection<CListItem> {
            return this.frequencys;
        }
        public set Frequencys(value: ObservableCollection<CListItem>) {
            this.frequencys = value;
           //super.NotifyPropertyChanged("Frequencys");
        }
        private _NonPRNFrequencies: ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
        public get NonPRNFrequencies(): ObservableCollection<CListItem> {
            return this._NonPRNFrequencies;
        }
        public set NonPRNFrequencies(value: ObservableCollection<CListItem>) {
            this._NonPRNFrequencies = value;
           //super.NotifyPropertyChanged("NonPRNFrequencies");
        }
        private _SteppedFrequencies: ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
        public get SteppedFrequencies(): ObservableCollection<CListItem> {
            return this._SteppedFrequencies;
        }
        public set SteppedFrequencies(value: ObservableCollection<CListItem>) {
            this._SteppedFrequencies = value;
           //super.NotifyPropertyChanged("SteppedFrequencies");
        }
        private _QualifiedFrequencies: ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
        public get QualifiedFrequencies(): ObservableCollection<CListItem> {
            return this._QualifiedFrequencies;
        }
        public set QualifiedFrequencies(value: ObservableCollection<CListItem>) {
            this._QualifiedFrequencies = value;
           //super.NotifyPropertyChanged("QualifiedFrequencies");
        }
        private _DoseCalciQualifiedUOMs: ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
        public get DoseCalciQualifiedUOMs(): ObservableCollection<CListItem> {
            return this._DoseCalciQualifiedUOMs;
        }
        public set DoseCalciQualifiedUOMs(value: ObservableCollection<CListItem>) {
            this._DoseCalciQualifiedUOMs = value;
           //super.NotifyPropertyChanged("DoseCalciQualifiedUOMs");
        }
        public get MasterFrequencys(): ObservableCollection<CListItem> {
            return this.masterFrequencys;
        }
        public set MasterFrequencys(value: ObservableCollection<CListItem>) {
            this.masterFrequencys = value;
           //super.NotifyPropertyChanged("MasterFrequencys");
        }
        public get Forms(): ObservableCollection<CListItem> {
            return this.forms;
        }
        public set Forms(value: ObservableCollection<CListItem>) {
            this.forms = value;
           //super.NotifyPropertyChanged("Forms");
        }
        public get PreviousForms(): ObservableCollection<CListItem> {
            return this.oldForms;
        }
        public set PreviousForms(value: ObservableCollection<CListItem>) {
            this.oldForms = value;
           //super.NotifyPropertyChanged("PreviousForms");
        }
        public get DistinctForms(): ObservableCollection<CListItem> {
            return this.distinctforms;
        }
        public set DistinctForms(value: ObservableCollection<CListItem>) {
            this.distinctforms = value;
           //super.NotifyPropertyChanged("DistinctForms");
        }
        public get Quantitys(): ObservableCollection<CListItem> {
            return this.quantitys;
        }
        public set Quantitys(value: ObservableCollection<CListItem>) {
            this.quantitys = value;
           //super.NotifyPropertyChanged("Quantitys");
        }
        public get TreatToContinue(): ObservableCollection<CListItem> {
            return this.treatToContinue;
        }
        public set TreatToContinue(value: ObservableCollection<CListItem>) {
            if (this.treatToContinue != value) {
                this.treatToContinue = value;
               //super.NotifyPropertyChanged("TreatToContinue");
            }
        }
        public get ReasonforModification(): ObservableCollection<CListItem> {
            return this.reasonforModification;
        }
        public set ReasonforModification(value: ObservableCollection<CListItem>) {
            if (this.reasonforModification != value) {
                this.reasonforModification = value;
               //super.NotifyPropertyChanged("ReasonforModification");
            }
        }
        public get MedClerkingModificationReason(): ObservableCollection<CListItem> {
            return this.medClerkingModificationReason;
        }
        public set MedClerkingModificationReason(value: ObservableCollection<CListItem>) {
            if (this.medClerkingModificationReason != value) {
                this.medClerkingModificationReason = value;
               //super.NotifyPropertyChanged("MedClerkingModificationReason");
            }
        }
        public get ClerkingReasonforModification(): ObservableCollection<CListItem> {
            return this.clerkingReasonforModification;
        }
        public set ClerkingReasonforModification(value: ObservableCollection<CListItem>) {
            if (this.clerkingReasonforModification != value) {
                this.clerkingReasonforModification = value;
               //super.NotifyPropertyChanged("ClerkingReasonforModification");
            }
        }
        public get Duration(): ObservableCollection<CListItem> {
            return this.duration;
        }
        public set Duration(value: ObservableCollection<CListItem>) {
            if (this.duration != value) {
                this.duration = value;
               //super.NotifyPropertyChanged("Duration");
            }
        }
        public get DurationStepped(): ObservableCollection<CListItem> {
            return this.DurationStep;
        }
        public set DurationStepped(value: ObservableCollection<CListItem>) {
            if (this.DurationStep != value) {
                this.DurationStep = value;
               //super.NotifyPropertyChanged("DurationStepped");
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
        public get ReviewAfterUOMListOriginal(): ObservableCollection<CListItem> {
            return this._ReviewAfterUOMListOriginal;
        }
        public set ReviewAfterUOMListOriginal(value: ObservableCollection<CListItem>) {
            if (this._ReviewAfterUOMListOriginal != value) {
                this._ReviewAfterUOMListOriginal = value;
               //super.NotifyPropertyChanged("ReviewAfterUOMListOriginal");
            }
        }
        public get DoseType(): ObservableCollection<CListItem> {
            return this.doseType;
        }
        public set DoseType(value: ObservableCollection<CListItem>) {
            if (this.doseType != value) {
                this.doseType = value;
               //super.NotifyPropertyChanged("DoseType");
            }
        }
        public get InfusionTypeList(): ObservableCollection<CListItem> {
            return this._infusiontypes;
        }
        public set InfusionTypeList(value: ObservableCollection<CListItem>) {
            this._infusiontypes = value;
           //NotifyPropertyChanged("InfusionTypeList");
        }
        private _infuInterDoseType: ObservableCollection<CListItem>;
        public get InfuInterDoseType(): ObservableCollection<CListItem> {
            return this._infuInterDoseType;
        }
        public set InfuInterDoseType(value: ObservableCollection<CListItem>) {
            if (this._infuInterDoseType != value) {
                this._infuInterDoseType = value;
               //super.NotifyPropertyChanged("InfuInterDoseType");
            }
        }
        private _infuContDoseType: ObservableCollection<CListItem>;
        public get InfuContDoseType(): ObservableCollection<CListItem> {
            return this._infuContDoseType;
        }
        public set InfuContDoseType(value: ObservableCollection<CListItem>) {
            if (this._infuContDoseType != value) {
                this._infuContDoseType = value;
               //super.NotifyPropertyChanged("InfuContDoseType");
            }
        }
        public get AdminInstructions(): ObservableCollection<CListItem> {
            return this.adminInstructions;
        }
        public set AdminInstructions(value: ObservableCollection<CListItem>) {
            if (this.adminInstructions != value) {
                this.adminInstructions = value;
               //super.NotifyPropertyChanged("AdminInstructions");
            }
        }
        public get Sites(): ObservableCollection<CListItem> {
            return this.sites;
        }
        public set Sites(value: ObservableCollection<CListItem>) {
            if (this.sites != value) {
                this.sites = value;
               //super.NotifyPropertyChanged("Sites");
            }
        }
        public get IntervalInstalmentsUoM(): ObservableCollection<CListItem> {
            return this._intervalInstalmentsUoM;
        }
        public set IntervalInstalmentsUoM(value: ObservableCollection<CListItem>) {
            if (value != this._intervalInstalmentsUoM) {
                this._intervalInstalmentsUoM = value;
               //super.NotifyPropertyChanged("IntervalInstalmentsUoM");
            }
        }
        public get PRNInstructions(): ObservableCollection<CListItem> {
            return this._prnInstructions;
        }
        public set PRNInstructions(value: ObservableCollection<CListItem>) {
            this._prnInstructions = value;
           //super.NotifyPropertyChanged("PRNInstructions");
        }
        public get NONCatalogueReasons(): ObservableCollection<CListItem> {
            return this._nonCatalogueReasons;
        }
        public set NONCatalogueReasons(value: ObservableCollection<CListItem>) {
            this._nonCatalogueReasons = value;
           //super.NotifyPropertyChanged("NONCatalogueReasons");
        }
        public get DurationOriginal(): ObservableCollection<CListItem> {
            return this.durationoriginal;
        }
        public set DurationOriginal(value: ObservableCollection<CListItem>) {
            if (this.durationoriginal != value) {
                this.durationoriginal = value;
               //super.NotifyPropertyChanged("DurationOriginal");
            }
        }
        private istitrated: boolean = false;
        public get IsTitrated(): boolean {
            return this.istitrated;
        }
        public set IsTitrated(value: boolean) {
            if (this.istitrated != value) {
                this.istitrated = value;
               //super.NotifyPropertyChanged("IsTitrated");
            }
        }
        private _DRCDoseTypes: ObservableCollection<CListItem>;
        public get DRCDoseTypes(): ObservableCollection<CListItem> {
            return this._DRCDoseTypes;
        }
        public set DRCDoseTypes(value: ObservableCollection<CListItem>) {
            if (this.DRCDoseTypes != value) {
                this._DRCDoseTypes = value;
               //super.NotifyPropertyChanged("DRCDoseTypes");
            }
        }
    }