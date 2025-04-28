import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType } from 'epma-platform/models';
import { AppDialog, Color, Colors, ImageSource, SolidColorBrush } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ChartIcon } from './ChartIcon';
import { Visibility } from 'src/app/shared/epma-platform/controls-model/Visibility';
  ﻿
    export class DrugItem  {
        private _Drugname: string;
        private _GroupName: string;
        private _ParentGroupName: string;
        private _Fluidname: string;
        private _Infusiontype: string;
        private _Key: string;
        private _AllowSelect: boolean;
        private _IsInfusion: boolean;
        private _MultiComponentIcon: ChartIcon;
        private _CriticalIcon: ChartIcon;
        private _DrugPropertyIcon: ChartIcon;
        private _ComponenetPropertyIcon1: ChartIcon;
        private _ComponenetPropertyIcon2: ChartIcon;
        private _ComponenetPropertyIcon3: ChartIcon;
        private _ComponenetPropertyIcon4: ChartIcon;
        private _MultiComponentIcon1: ChartIcon;
        private _MultiComponentIcon2: ChartIcon;
        private _MultiComponentIcon3: ChartIcon;
        private _MultiComponentIcon4: ChartIcon;
        private _Dosageform: string;
        private _Componentname1: string;
        private _Componentname2: string;
        private _Componentname3: string;
        private _Componentname4: string;
        private _FrequencyWeeklyLabel: string;
        private _FrequencyWeeklyValue: string;
        private _FluidDrugPropertyIcon: ChartIcon;
        private _DrugnameIcon1: ChartIcon;
        private _RouteIcon: ChartIcon;
        private _DrugnameIcon2: ChartIcon;
        private _DoseLabel: string;
        private _Dose: string;
        private _FrequencyText: string;
        private _AsRequiredText: string;
        private _AmendIcon: ChartIcon;
        private _DoseIcon1: ChartIcon;
        private _DoseIcon2: ChartIcon;
        private _RouteLabel: string;
        private _Route: string;
        private _OmitIcon: ChartIcon;
        private _DoseCalcIcon: ChartIcon;
        private _OmitLabel: string;
        private _ReviewIcon: ChartIcon;
        private _ReviewLabel: string;
        private _ReviewVal: string;
        private _SiteLabel: string;
        private _StrengthLabel: string;
        private _Strength: string;
        private _Site: string;
        private _AdministrationInst: string;
        private _PRNInst: string;
        private _SupplyInstIcon: ChartIcon;
        private _AdminPRNIcon2: ChartIcon;
        private _PrescriptionStatus: string;
        private _PStatusIcon: ChartIcon;
        private _MRequestIcon: ChartIcon;
        private _DRSForecolor: SolidColorBrush = new SolidColorBrush(Color.FromArgb(255, 31, 73, 125));
        private _Tag: Object;
        private _AdminWarningMessage: string;
        private _IVAlertMessage: string;
        private _IVAlertForeColor: SolidColorBrush = new SolidColorBrush(Color.FromArgb(255, 143, 3, 3));
        private _OrderSetIcon: ChartIcon;
        private _Humidificationlbl: string;
        private _Humidification: string;
        private _TargetSaturationlbl: string;
        private _TargetSaturation: string;
        private _GroupVisibility: Visibility = Visibility.Collapsed;
        private _ParentGroupVisibility: Visibility = Visibility.Collapsed;
        private _GroupForecolor: SolidColorBrush = new SolidColorBrush(Color.FromArgb(255, 139, 0, 0));
        private _GroupBackground: SolidColorBrush = new SolidColorBrush(Colors.Transparent);
        private _GroupFontSize: number = 13;
        private _OnAdmissionIcon: ChartIcon;
        private _StartDTLbl: string;
        private _StartDTVal: string;
        private _StopDTLbl: string;
        private _StopDTVal: string;
        private _PrescribedByLbl: string;
        private _PrescribedByVal: string;
        private _ActionByLbl: string;
        private _ActionByVal: string;
        private _ReasonLbl: string;
        private _ReasonVal: string;
        private _CommentsLbl: string;
        private _CommentsVal: string;
        private _NotesData: string;
        private _NotesIcon: ImageSource;
        private _NotesColor: SolidColorBrush;
        private _NotesToolTip: string;
        public get OnAdmissionIcon(): ChartIcon {
            return this._OnAdmissionIcon;
        }
        public set OnAdmissionIcon(value: ChartIcon) {
            this._OnAdmissionIcon = value;
            //NotifyPropertyChanged("OnAdmissionIcon");
        }
        public get StartDTLbl(): string {
            return this._StartDTLbl;
        }
        public set StartDTLbl(value: string) {
            this._StartDTLbl = value;
            //NotifyPropertyChanged("StartDTLbl");
        }
        public get StartDTVal(): string {
            return this._StartDTVal;
        }
        public set StartDTVal(value: string) {
            this._StartDTVal = value;
            //NotifyPropertyChanged("StartDTVal");
        }
        public get StopDTLbl(): string {
            return this._StopDTLbl;
        }
        public set StopDTLbl(value: string) {
            this._StopDTLbl = value;
            //NotifyPropertyChanged("StopDTLbl");
        }
        public get StopDTVal(): string {
            return this._StopDTVal;
        }
        public set StopDTVal(value: string) {
            this._StopDTVal = value;
            //NotifyPropertyChanged("StopDTVal");
        }
        public get PrescribedByLbl(): string {
            return this._PrescribedByLbl;
        }
        public set PrescribedByLbl(value: string) {
            this._PrescribedByLbl = value;
            //NotifyPropertyChanged("PrescribedByLbl");
        }
        public get PrescribedByVal(): string {
            return this._PrescribedByVal;
        }
        public set PrescribedByVal(value: string) {
            this._PrescribedByVal = value;
            //NotifyPropertyChanged("PrescribedByVal");
        }
        public get ActionByLbl(): string {
            return this._ActionByLbl;
        }
        public set ActionByLbl(value: string) {
            this._ActionByLbl = value;
            //NotifyPropertyChanged("ActionByLbl");
        }
        public get ActionByVal(): string {
            return this._ActionByVal;
        }
        public set ActionByVal(value: string) {
            this._ActionByVal = value;
            //NotifyPropertyChanged("ActionByVal");
        }
        public get ReasonLbl(): string {
            return this._ReasonLbl;
        }
        public set ReasonLbl(value: string) {
            this._ReasonLbl = value;
            //NotifyPropertyChanged("ReasonLbl");
        }
        public get ReasonVal(): string {
            return this._ReasonVal;
        }
        public set ReasonVal(value: string) {
            this._ReasonVal = value;
            //NotifyPropertyChanged("ReasonVal");
        }
        public get CommentsLbl(): string {
            return this._CommentsLbl;
        }
        public set CommentsLbl(value: string) {
            this._CommentsLbl = value;
            //NotifyPropertyChanged("CommentsLbl");
        }
        public get CommentsVal(): string {
            return this._CommentsVal;
        }
        public set CommentsVal(value: string) {
            this._CommentsVal = value;
            //NotifyPropertyChanged("CommentsVal");
        }
        public get Key(): string {
            return this._Key;
        }
        public set Key(value: string) {
            this._Key = value;
            //NotifyPropertyChanged("Key");
        }
        public get AllowSelect(): boolean {
            return this._AllowSelect;
        }
        public set AllowSelect(value: boolean) {
            this._AllowSelect = value;
            //NotifyPropertyChanged("AllowSelect");
        }
        public get IsInfusion(): boolean {
            return this._IsInfusion;
        }
        public set IsInfusion(value: boolean) {
            this._IsInfusion = value;
            //NotifyPropertyChanged("IsInfusion");
        }
        public get Drugname(): string {
            return this._Drugname;
        }
        public set Drugname(value: string) {
            this._Drugname = value;
            //NotifyPropertyChanged("Drugname");
        }
        public get GroupVisibility(): Visibility {
            return this._GroupVisibility;
        }
        public set GroupVisibility(value: Visibility) {
            this._GroupVisibility = value;
            //NotifyPropertyChanged("GroupVisibility");
        }
        public get ParentGroupVisibility(): Visibility {
            return this._ParentGroupVisibility;
        }
        public set ParentGroupVisibility(value: Visibility) {
            this._ParentGroupVisibility = value;
            //NotifyPropertyChanged("ParentGroupVisibility");
        }
        public get ParentGroupName(): string {
            return this._ParentGroupName;
        }
        public set ParentGroupName(value: string) {
            this._ParentGroupName = value;
            if (!String.IsNullOrEmpty(this._ParentGroupName)) {
                this.ParentGroupVisibility = Visibility.Visible;
            }
            //NotifyPropertyChanged("ParentGroupName");
        }
        public get GroupName(): string {
            return this._GroupName;
        }
        public set GroupName(value: string) {
            this._GroupName = value;
            if (!String.IsNullOrEmpty(this._GroupName)) {
                this.GroupVisibility = Visibility.Visible;
            }
            //NotifyPropertyChanged("GroupName");
        }
        public get Dosageform(): string {
            if (!String.IsNullOrEmpty(this._Dosageform))
                return " - " + this._Dosageform;
            else return this._Dosageform;
        }
        public set Dosageform(value: string) {
            this._Dosageform = value;
            //NotifyPropertyChanged("_Dosageform");
        }
        public get Componentname1(): string {
            if (!String.IsNullOrEmpty(this._Componentname1))
                return "\n" + this._Componentname1;
            else return this._Componentname1;
        }
        public set Componentname1(value: string) {
            this._Componentname1 = value;
            //NotifyPropertyChanged("_Componentname1");
        }
        public get Componentname2(): string {
            if (!String.IsNullOrEmpty(this._Componentname2))
                return "\n" + this._Componentname2;
            else return this._Componentname2;
        }
        public set Componentname2(value: string) {
            this._Componentname2 = value;
            //NotifyPropertyChanged("Componentname2");
        }
        public get Componentname3(): string {
            if (!String.IsNullOrEmpty(this._Componentname3))
                return "\n" + this._Componentname3;
            else return this._Componentname3;
        }
        public set Componentname3(value: string) {
            this._Componentname3 = value;
            //NotifyPropertyChanged("Componentname3");
        }
        public get Componentname4(): string {
            if (!String.IsNullOrEmpty(this._Componentname4))
                return "\n" + this._Componentname4;
            else return this._Componentname4;
        }
        public set Componentname4(value: string) {
            this._Componentname4 = value;
            //NotifyPropertyChanged("Componentname4");
        }
        public get Fluidname(): string {
            if (!String.IsNullOrEmpty(this._Fluidname))
                return " in " + this._Fluidname;
            else return this._Fluidname;
        }
        public set Fluidname(value: string) {
            this._Fluidname = value;
            //NotifyPropertyChanged("Fluidname");
        }
        public get Infusiontype(): string {
            if (!String.IsNullOrEmpty(this._Infusiontype))
                return " - " + this._Infusiontype;
            else return this._Infusiontype;
        }
        public set Infusiontype(value: string) {
            this._Infusiontype = value;
            //NotifyPropertyChanged("Infusiontype");
        }
        private _Concentration: string;
        public get Concentration(): string {
            if (!String.IsNullOrEmpty(this._Concentration))
                return " - " + this._Concentration;
            else return this._Concentration;
        }
        public set Concentration(value: string) {
            this._Concentration = value;
            //NotifyPropertyChanged("Concentration");
        }
        public get MultiComponentIcon(): ChartIcon {
            return this._MultiComponentIcon;
        }
        public set MultiComponentIcon(value: ChartIcon) {
            this._MultiComponentIcon = value;
            //NotifyPropertyChanged("MultiComponentIcon");
        }
        public get MultiComponentIcon4(): ChartIcon {
            return this._MultiComponentIcon4;
        }
        public set MultiComponentIcon4(value: ChartIcon) {
            this._MultiComponentIcon4 = value;
            //NotifyPropertyChanged("MultiComponentIcon4");
        }
        public get MultiComponentIcon1(): ChartIcon {
            return this._MultiComponentIcon1;
        }
        public set MultiComponentIcon1(value: ChartIcon) {
            this._MultiComponentIcon1 = value;
            //NotifyPropertyChanged("MultiComponentIcon1");
        }
        public get MultiComponentIcon2(): ChartIcon {
            return this._MultiComponentIcon2;
        }
        public set MultiComponentIcon2(value: ChartIcon) {
            this._MultiComponentIcon2 = value;
            //NotifyPropertyChanged("MultiComponentIcon2");
        }
        public get MultiComponentIcon3(): ChartIcon {
            return this._MultiComponentIcon3;
        }
        public set MultiComponentIcon3(value: ChartIcon) {
            this._MultiComponentIcon3 = value;
            //NotifyPropertyChanged("MultiComponentIcon3");
        }
        public get CriticalIcon(): ChartIcon {
            return this._CriticalIcon;
        }
        public set CriticalIcon(value: ChartIcon) {
            this._CriticalIcon = value;
            //NotifyPropertyChanged("CriticalIcon");
        }
        public get DrugPropertyIcon(): ChartIcon {
            return this._DrugPropertyIcon;
        }
        public set DrugPropertyIcon(value: ChartIcon) {
            this._DrugPropertyIcon = value;
            //NotifyPropertyChanged("DrugPropertyIcon");
        }
        public get FluidDrugPropertyIcon(): ChartIcon {
            return this._FluidDrugPropertyIcon;
        }
        public set FluidDrugPropertyIcon(value: ChartIcon) {
            this._FluidDrugPropertyIcon = value;
            //NotifyPropertyChanged("FluidDrugPropertyIcon");
        }
        public get ComponenetPropertyIcon1(): ChartIcon {
            return this._ComponenetPropertyIcon1;
        }
        public set ComponenetPropertyIcon1(value: ChartIcon) {
            this._ComponenetPropertyIcon1 = value;
            //NotifyPropertyChanged("ComponenetPropertyIcon1");
        }
        public get ComponenetPropertyIcon2(): ChartIcon {
            return this._ComponenetPropertyIcon2;
        }
        public set ComponenetPropertyIcon2(value: ChartIcon) {
            this._ComponenetPropertyIcon2 = value;
            //NotifyPropertyChanged("ComponenetPropertyIcon2");
        }
        public get ComponenetPropertyIcon3(): ChartIcon {
            return this._ComponenetPropertyIcon3;
        }
        public set ComponenetPropertyIcon3(value: ChartIcon) {
            this._ComponenetPropertyIcon3 = value;
            //NotifyPropertyChanged("ComponenetPropertyIcon3");
        }
        public get ComponenetPropertyIcon4(): ChartIcon {
            return this._ComponenetPropertyIcon4;
        }
        public set ComponenetPropertyIcon4(value: ChartIcon) {
            this._ComponenetPropertyIcon4 = value;
            //NotifyPropertyChanged("ComponenetPropertyIcon4");
        }
        public get DrugnameIcon1(): ChartIcon {
            return this._DrugnameIcon1;
        }
        public set DrugnameIcon1(value: ChartIcon) {
            this._DrugnameIcon1 = value;
            //NotifyPropertyChanged("DrugnameIcon1");
        }
        public get RouteIcon(): ChartIcon {
            return this._RouteIcon;
        }
        public set RouteIcon(value: ChartIcon) {
            this._RouteIcon = value;
            //NotifyPropertyChanged("RouteIcon");
        }
        public get DrugnameIcon2(): ChartIcon {
            return this._DrugnameIcon2;
        }
        public set DrugnameIcon2(value: ChartIcon) {
            this._DrugnameIcon2 = value;
            //NotifyPropertyChanged("DrugnameIcon2");
        }
        public get DoseLabel(): string {
            return this._DoseLabel;
        }
        public set DoseLabel(value: string) {
            this._DoseLabel = value;
            //NotifyPropertyChanged("DoseLabel");
        }
        private _BoosterDoseLabel: string;
        public get BoosterDoseLabel(): string {
            return this._BoosterDoseLabel;
        }
        public set BoosterDoseLabel(value: string) {
            this._BoosterDoseLabel = value;
            //NotifyPropertyChanged("BoosterDoseLabel");
        }
        private _VolumeLabel: string;
        public get VolumeLabel(): string {
            return this._VolumeLabel;
        }
        public set VolumeLabel(value: string) {
            this._VolumeLabel = value;
            //NotifyPropertyChanged("VolumeLabel");
        }
        private _ConcentrationLabel: string;
        public get ConcentrationLabel(): string {
            return this._ConcentrationLabel;
        }
        public set ConcentrationLabel(value: string) {
            this._ConcentrationLabel = value;
            //NotifyPropertyChanged("ConcentrationLabel");
        }
        private _RateLabel: string;
        public get RateLabel(): string {
            return this._RateLabel;
        }
        public set RateLabel(value: string) {
            this._RateLabel = value;
            //NotifyPropertyChanged("RateLabel");
        }
        private _BolusLabel: string;
        public get BolusLabel(): string {
            return this._BolusLabel;
        }
        public set BolusLabel(value: string) {
            this._BolusLabel = value;
            //NotifyPropertyChanged("BolusLabel");
        }
        private _LockoutLabel: string;
        public get LockoutLabel(): string {
            return this._LockoutLabel;
        }
        public set LockoutLabel(value: string) {
            this._LockoutLabel = value;
            //NotifyPropertyChanged("LockoutLabel");
        }
        private _MaxdoseLabel: string;
        public get MaxdoseLabel(): string {
            return this._MaxdoseLabel;
        }
        public set MaxdoseLabel(value: string) {
            this._MaxdoseLabel = value;
            //NotifyPropertyChanged("MaxdoseLabel");
        }
        public get Humidificationlbl(): string {
            return this._Humidificationlbl;
        }
        public set Humidificationlbl(value: string) {
            this._Humidificationlbl = value;
            //NotifyPropertyChanged("Humidificationlbl");
        }
        public get TargetSaturationlbl(): string {
            return this._TargetSaturationlbl;
        }
        public set TargetSaturationlbl(value: string) {
            this._TargetSaturationlbl = value;
            //NotifyPropertyChanged("TargetSaturationlbl");
        }
        public get Dose(): string {
            return this._Dose;
        }
        public set Dose(value: string) {
            this._Dose = value;
            //NotifyPropertyChanged("Dose");
        }
        private _BoosterDose: string;
        public get BoosterDose(): string {
            return this._BoosterDose;
        }
        public set BoosterDose(value: string) {
            this._BoosterDose = value;
            //NotifyPropertyChanged("BoosterDose");
        }
        private _Volume: string;
        public get Volume(): string {
            return this._Volume;
        }
        public set Volume(value: string) {
            this._Volume = value;
            //NotifyPropertyChanged("Volume");
        }
        private _InfusionPeriod: string;
        public get InfusionPeriod(): string {
            return this._InfusionPeriod;
        }
        public set InfusionPeriod(value: string) {
            this._InfusionPeriod = value;
            //NotifyPropertyChanged("InfusionPeriod");
        }
        private _Rate: string;
        public get Rate(): string {
            return this._Rate;
        }
        public set Rate(value: string) {
            this._Rate = value;
            //NotifyPropertyChanged("Rate");
        }
        private _Bolus: string;
        public get Bolus(): string {
            return this._Bolus;
        }
        public set Bolus(value: string) {
            this._Bolus = value;
            //NotifyPropertyChanged("Bolus");
        }
        private _DrugConcentration: string;
        public get DrugConcentration(): string {
            return this._DrugConcentration;
        }
        public set DrugConcentration(value: string) {
            this._DrugConcentration = value;
            //NotifyPropertyChanged("DrugConcentration");
        }
        private _Lockout: string;
        public get Lockout(): string {
            return this._Lockout;
        }
        public set Lockout(value: string) {
            this._Lockout = value;
            //NotifyPropertyChanged("Lockout");
        }
        private _Maxdose: string;
        public get Maxdose(): string {
            return this._Maxdose;
        }
        public set Maxdose(value: string) {
            this._Maxdose = value;
            //NotifyPropertyChanged("Maxdose");
        }
        private _Duration: string;
        public get Duration(): string {
            return this._Duration;
        }
        public set Duration(value: string) {
            this._Duration = value;
            //NotifyPropertyChanged("Duration");
        }
        public get FrequencyText(): string {
            return this._FrequencyText;
        }
        public set FrequencyText(value: string) {
            this._FrequencyText = value;
            //NotifyPropertyChanged("FrequencyText");
        }
        public get AsRequiredText(): string {
            return this._AsRequiredText;
        }
        public set AsRequiredText(value: string) {
            this._AsRequiredText = value;
            //NotifyPropertyChanged("AsRequiredText");
        }
        public get FrequencyWeeklyLabel(): string {
            return this._FrequencyWeeklyLabel;
        }
        public set FrequencyWeeklyLabel(value: string) {
            this._FrequencyWeeklyLabel = value;
            //NotifyPropertyChanged("FrequencyWeeklyLabel");
        }
        public get FrequencyWeeklyValue(): string {
            return this._FrequencyWeeklyValue;
        }
        public set FrequencyWeeklyValue(value: string) {
            this._FrequencyWeeklyValue = value;
            //NotifyPropertyChanged("FrequencyWeeklyValue");
        }
        public get DoseIcon1(): ChartIcon {
            return this._DoseIcon1;
        }
        public set DoseIcon1(value: ChartIcon) {
            this._DoseIcon1 = value;
            //NotifyPropertyChanged("DoseIcon1");
        }
        public get AmendIcon(): ChartIcon {
            return this._AmendIcon;
        }
        public set AmendIcon(value: ChartIcon) {
            this._AmendIcon = value;
            //NotifyPropertyChanged("AmendIcon");
        }
        public get DoseIcon2(): ChartIcon {
            return this._DoseIcon2;
        }
        public set DoseIcon2(value: ChartIcon) {
            this._DoseIcon2 = value;
            //NotifyPropertyChanged("DoseIcon2");
        }
        public get RouteLabel(): string {
            return this._RouteLabel;
        }
        public set RouteLabel(value: string) {
            this._RouteLabel = value;
            //NotifyPropertyChanged("RouteLabel");
        }
        public get Route(): string {
            return this._Route;
        }
        public set Route(value: string) {
            this._Route = value;
            //NotifyPropertyChanged("Route");
        }
        public get SiteLabel(): string {
            return this._SiteLabel;
        }
        public set SiteLabel(value: string) {
            this._SiteLabel = value;
            //NotifyPropertyChanged("SiteLabel");
        }
        public get Site(): string {
            return this._Site;
        }
        public set Site(value: string) {
            this._Site = value;
            //NotifyPropertyChanged("Site");
        }
        public get StrengthLabel(): string {
            return this._StrengthLabel;
        }
        public set StrengthLabel(value: string) {
            this._StrengthLabel = value;
            //NotifyPropertyChanged("StrengthLabel");
        }
        public get Strength(): string {
            return this._Strength;
        }
        public set Strength(value: string) {
            this._Strength = value;
            //NotifyPropertyChanged("Strength");
        }
        private _Lumen: string;
        public get Lumen(): string {
            return this._Lumen;
        }
        public set Lumen(value: string) {
            this._Lumen = value;
            //NotifyPropertyChanged("Lumen");
        }
        private _Deliverydevice: string;
        public get Deliverydevice(): string {
            return this._Deliverydevice;
        }
        public set Deliverydevice(value: string) {
            this._Deliverydevice = value;
            //NotifyPropertyChanged("Deliverydevice");
        }
        public get AdministrationInst(): string {
            return this._AdministrationInst;
        }
        public set AdministrationInst(value: string) {
            this._AdministrationInst = value;
            //NotifyPropertyChanged("AdministrationInst");
        }
        public get Humidification(): string {
            if (!String.IsNullOrEmpty(this._Humidification))
                return " " + this._Humidification;
            else return this._Humidification;
        }
        public set Humidification(value: string) {
            this._Humidification = value;
            //NotifyPropertyChanged("Humidification");
        }
        public get TargetSaturation(): string {
            if (!String.IsNullOrEmpty(this._TargetSaturation))
                return " " + this._TargetSaturation;
            else return this._TargetSaturation;
        }
        public set TargetSaturation(value: string) {
            this._TargetSaturation = value;
            //NotifyPropertyChanged("TargetSaturation");
        }
        public get PRNInst(): string {
            if (!String.IsNullOrEmpty(this.AdministrationInst))
                return " " + this._PRNInst;
            else return this._PRNInst;
        }
        public set PRNInst(value: string) {
            this._PRNInst = value;
            //NotifyPropertyChanged("PRNInst");
        }
        private _AdditionalInst: string;
        public get AdditionalInst(): string {
            if (!String.IsNullOrEmpty(this.AdministrationInst)){
                return " " + (this._AdditionalInst != undefined) ? this._AdditionalInst:'';
            }
            else return this._AdditionalInst;
        }
        public set AdditionalInst(value: string) {
            this._AdditionalInst = value;
            //NotifyPropertyChanged("AdditionalInst");
        }
        private _Targetrange: string;
        public get Targetrange(): string {
            if (!String.IsNullOrEmpty(this._Targetrange))
                return "Target saturation range - " + this._Targetrange;
            else return this._Targetrange;
        }
        public set Targetrange(value: string) {
            this._Targetrange = value;
            //NotifyPropertyChanged("Targetrange");
        }
        public get SupplyInstIcon(): ChartIcon {
            return this._SupplyInstIcon;
        }
        public set SupplyInstIcon(value: ChartIcon) {
            this._SupplyInstIcon = value;
            //NotifyPropertyChanged("SupplyInstIcon");
        }
        public get AdminPRNIcon2(): ChartIcon {
            return this._AdminPRNIcon2;
        }
        public set AdminPRNIcon2(value: ChartIcon) {
            this._AdminPRNIcon2 = value;
            //NotifyPropertyChanged("AdminPRNIcon2");
        }
        public get PrescriptionStatus(): string {
            return this._PrescriptionStatus;
        }
        public set PrescriptionStatus(value: string) {
            this._PrescriptionStatus = value;
            //NotifyPropertyChanged("PrescriptionStatus");
        }
        public get PStatusIcon(): ChartIcon {
            return this._PStatusIcon;
        }
        public set PStatusIcon(value: ChartIcon) {
            this._PStatusIcon = value;
            //NotifyPropertyChanged("PStatusIcon");
        }
        public get MRequestIcon(): ChartIcon {
            return this._MRequestIcon;
        }
        public set MRequestIcon(value: ChartIcon) {
            this._MRequestIcon = value;
            //NotifyPropertyChanged("MRequestIcon");
        }
        public get DRSForecolor(): SolidColorBrush {
            return this._DRSForecolor;
        }
        public set DRSForecolor(value: SolidColorBrush) {
            this._DRSForecolor = value;
            //NotifyPropertyChanged("DRSForecolor");
        }
        public get Tag(): Object {
            return this._Tag;
        }
        public set Tag(value: Object) {
            this._Tag = value;
            //NotifyPropertyChanged("Tag");
        }
        public get AdminWarningMessage(): string {
            return this._AdminWarningMessage;
        }
        public set AdminWarningMessage(value: string) {
            this._AdminWarningMessage = value;
            //NotifyPropertyChanged("AdminWaringMessage");
        }
        public get IVAlertMessage(): string {
            return this._IVAlertMessage;
        }
        public set IVAlertMessage(value: string) {
            this._IVAlertMessage = value;
            //NotifyPropertyChanged("IVAlertMessage");
        }
        private _IsSequentail: boolean;
        public get IsSequentail(): boolean {
            return this._IsSequentail;
        }
        public set IsSequentail(value: boolean) {
            this._IsSequentail = value;
            //NotifyPropertyChanged("IsSequentail");
        }
        private _Ongoing: boolean;
        public get Ongoing(): boolean {
            return this._Ongoing;
        }
        public set Ongoing(value: boolean) {
            this._Ongoing = value;
            //NotifyPropertyChanged("Ongoing");
        }
        public get IVAlertForeColor(): SolidColorBrush {
            return this._IVAlertForeColor;
        }
        public set IVAlertForeColor(value: SolidColorBrush) {
            this._IVAlertForeColor = value;
            //NotifyPropertyChanged("IVAlertForeColor");
        }
        public get OrderSetIcon(): ChartIcon {
            return this._OrderSetIcon;
        }
        public set OrderSetIcon(value: ChartIcon) {
            this._OrderSetIcon = value;
            //NotifyPropertyChanged("OrderSetIcon");
        }
        public get GroupBackground(): SolidColorBrush {
            return this._GroupBackground;
        }
        public set GroupBackground(value: SolidColorBrush) {
            this._GroupBackground = value;
            //NotifyPropertyChanged("GroupBackground");
        }
        public get GroupForecolor(): SolidColorBrush {
            return this._GroupForecolor;
        }
        public set GroupForecolor(value: SolidColorBrush) {
            this._GroupForecolor = value;
            //NotifyPropertyChanged("GroupForecolor");
        }
        public get GroupFontSize(): number {
            return this._GroupFontSize;
        }
        public set GroupFontSize(value: number) {
            this._GroupFontSize = value;
            //NotifyPropertyChanged("GroupFontSize");
        }
        public get OmitIcon(): ChartIcon {
            return this._OmitIcon;
        }
        public set OmitIcon(value: ChartIcon) {
            this._OmitIcon = value;
            //NotifyPropertyChanged("OmitIcon");
        }
        public get DoseCalcIcon(): ChartIcon {
            return this._DoseCalcIcon;
        }
        public set DoseCalcIcon(value: ChartIcon) {
            this._DoseCalcIcon = value;
            //NotifyPropertyChanged("DoseCalcIcon");
        }
        public get OmitLabel(): string {
            return this._OmitLabel;
        }
        public set OmitLabel(value: string) {
            this._OmitLabel = value;
            //NotifyPropertyChanged("OmitLabel");
        }
        public get ReviewIcon(): ChartIcon {
            return this._ReviewIcon;
        }
        public set ReviewIcon(value: ChartIcon) {
            this._ReviewIcon = value;
            //NotifyPropertyChanged("ReviewIcon");
        }
        public get ReviewLabel(): string {
            return this._ReviewLabel;
        }
        public set ReviewLabel(value: string) {
            this._ReviewLabel = value;
            //NotifyPropertyChanged("ReviewLabel");
        }
        public get ReviewVal(): string {
            return this._ReviewVal;
        }
        public set ReviewVal(value: string) {
            this._ReviewVal = value;
            //NotifyPropertyChanged("ReviewVal");
        }
        public get NotesIcon(): ImageSource {
            return this._NotesIcon;
        }
        public set NotesIcon(value: ImageSource) {
            this._NotesIcon = value;
            //NotifyPropertyChanged("NotesIcon");
        }
        public get NotesData(): string {
            return this._NotesData;
        }
        public set NotesData(value: string) {
            this._NotesData = value;
            //NotifyPropertyChanged("NotesData");
        }
        public get NotesColor(): SolidColorBrush {
            return this._NotesColor;
        }
        public set NotesColor(value: SolidColorBrush) {
            this._NotesColor = value;
            //NotifyPropertyChanged("NotesColor");
        }
        public get NotesToolTip(): string {
            return this._NotesToolTip;
        }
        public set NotesToolTip(value: string) {
            this._NotesToolTip = value;
            //NotifyPropertyChanged("NotesToolTip");
        }
    }
