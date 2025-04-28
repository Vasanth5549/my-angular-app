import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, ProcessRTE} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, List, Visibility, CListItem, RTEEventargs } from 'epma-platform/models';
import { AppDialog, MouseButtonEventArgs } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper as Helper, ObjectHelper } from 'epma-platform/helper';
import { IViewModelBase, ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { AdministrableQtyViewVM } from './AdministrableQtyViewVM';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { Dictionary } from 'epma-platform/dictionary';
import { MedScanRecAdmVM } from './MedScanRecAdmVM';
import { Image } from 'src/app/shared/epma-platform/controls/epma-image/epma-image.component';
import { SlotAdministrationHelper } from '../common/slotadministrationhelper';
import { CDrugHdrAddnlInfo, CDrugHeader, DrugHeader, DrugHeaderItem } from '../common/drugheader';
import { Resource } from '../resource';
import { MedsAdminChartToolTip } from '../resource/medsadmincharttooltip.designer';
import { CReqMsgGetAllOptions, CResMsgGetAllOptions, GetAllOptionsCompletedEventArgs, ManagePrescriptionWSSoapClient } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { AdministrationDetail, Encounter } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { CConstants, DoseTypeCode, MedAction, MultiRouteType, RecordAdminType, SlotStatus, ValueDomain } from '../utilities/CConstants';
import { MedChartData, TagDrugHeaderDetail } from '../utilities/globalvariable';
import { UserPermissions } from '../utilities/ProfileData';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { Common } from '../utilities/common';
import { MedicationChart } from '../resource/medicationchart.designer';
import { SelectedUserType } from 'src/app/lorappmedicationcommonbb/utilities/witnesshelper';
import { AppSessionInfo } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import { MedsAdminMultiSlotVM } from './MedsAdminVM';
import { MedsAdminModifyOrStrikethrough } from '../child/MedsAdminModifyOrStrikethrough';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { DrugItem } from 'src/app/lorarcbluebirdmedicationchart/common/DrugItem';
import { MedsAdminMultiSlot } from '../child/MedsAdminMultiSlot';
import { ModifyStrikethroughLink } from '../child/ModifyStrikethroughLink';
import { MedsAdminSlotHistory } from 'src/app/lorappmedicationcommonbb/child/medsadminslothistory';
import { MedsRecordAdminstrator } from '../child/medsadminrecordadmin';

    export class MedicationChartVM extends ViewModelBase {
        private _MedChartOID: number;
        oMedAdminSlotHistory: MedsAdminSlotHistory;        // xaml file
        public get MedChartOID(): number {
            return this._MedChartOID;
        }
        public set MedChartOID(value: number) {
            if (!Helper.ReferenceEquals(this._MedChartOID, value)) {
                this._MedChartOID = value;
               // // NotifyPropertyChanged("MedChartOID");
            }
        }
        private _PatientOID: number;
        public get PatientOID(): number {
            return this._PatientOID;
        }
        public set PatientOID(value: number) {
            if (!Helper.ReferenceEquals(this._PatientOID, value)) {
                this._PatientOID = value;
                // // NotifyPropertyChanged("PatientOID");
            }
        }
        private _ChartStatus: string;
        public get ChartStatus(): string {
            return this._ChartStatus;
        }
        public set ChartStatus(value: string) {
            if (!Helper.ReferenceEquals(this._ChartStatus, value)) {
                this._ChartStatus = value;
                // // NotifyPropertyChanged("ChartStatus");
            }
        }
        private _ActiveFrom: DateTime;
        public get ActiveFrom(): DateTime{
            return this._ActiveFrom;
        }
        public set ActiveFrom(value: DateTime) {
            if (!Helper.ReferenceEquals(this._ActiveFrom, value)) {
                this._ActiveFrom = value;
                //// NotifyPropertyChanged("ActiveFrom");
            }
        }
        private _ActiveTo: DateTime;
        public get ActiveTo(): DateTime{
            return this._ActiveTo;
        }
        public set ActiveTo(value: DateTime) {
            if (!Helper.ReferenceEquals(this._ActiveTo, value)) {
                this._ActiveTo = value;
               // // NotifyPropertyChanged("ActiveTo");
            }
        }
        private _DrugDetail: ObservableCollection<DrugDetailVM>;
        public get DrugDetail(): ObservableCollection<DrugDetailVM> {
            return this._DrugDetail;
        }
        public set DrugDetail(value: ObservableCollection<DrugDetailVM>) {
            this._DrugDetail = value;
           // // NotifyPropertyChanged("DrugDetail");
        }
        private _EventsInNotKnownStatus: List<string>;
        public get EventsInNotKnownStatus(): List<string> {
            return this._EventsInNotKnownStatus;
        }
        public set EventsInNotKnownStatus(value: List<string>) {
            this._EventsInNotKnownStatus = value;
        }
    }
    export class DrugDetailVM extends ViewModelBase {
        private _DrugItem: DrugItem;
        public get DrugItem(): DrugItem {
            return this._DrugItem;
        }
        public set DrugItem(value: DrugItem) {
            this._DrugItem = value;
           // // NotifyPropertyChanged("DrugItem");
        }
        private _SlotDetail: ObservableCollection<SlotDetailVM>;
        public get SlotDetail(): ObservableCollection<SlotDetailVM> {
            return this._SlotDetail;
        }
        public set SlotDetail(value: ObservableCollection<SlotDetailVM>) {
            this._SlotDetail = value;
           // // NotifyPropertyChanged("SlotDetail");
        }
        private _SteppedVariableDoseInfo: ObservableCollection<SteppedVariableDoseInfoVM>;
        public get SteppedVariableDoseInfo(): ObservableCollection<SteppedVariableDoseInfoVM> {
            return this._SteppedVariableDoseInfo;
        }
        public set SteppedVariableDoseInfo(value: ObservableCollection<SteppedVariableDoseInfoVM>) {
            this._SteppedVariableDoseInfo = value;
           // // NotifyPropertyChanged("SteppedVariableDoseInfo");
        }
    }
    export class SlotDetailVM extends ViewModelBase {
        //public delegate void ModifyStrikeThroughClosedDelegate();
        public ModifyStrikeThroughClosedCompleted: Function;
        public oMedsAdminMultiSlot: MedsAdminMultiSlot;             // xaml file
        oMedsAdminRec: MedsRecordAdminstrator;                      // xaml file
        public IsPatientSelfAdmin: boolean = false;
        public IsPatientSelfAdminErrorMsgExists: boolean = false;
        public IsDiscontinuedErrorMsgExists: boolean = false;
        public IsAmend: boolean = false;
        IsLockIconMsgExists: boolean = false;
        IsLockIconExists: boolean = false;
        //public delegate void ModifyAdminErrorMsgDelegate();
        public ModifyAdminErrorMsgEventCompleted: Function;
        private _isDoseEnabled: boolean;
        public PreviousAdministeredDate: DateTime;
        public TodaySlotDate: DateTime;
        public PrescriptionStartDate: DateTime;
        public PrescriptionEndDate: DateTime;
        //public delegate void PasswordDel(bool IsSuccess);
        public PasswordDelEvent: Function;
        public PrescriptionItemStatus: string;
        private _CurrentServerDate: DateTime= CommonBB.GetServerDateTime();
        public AmendedPresOID: number;
        private _isRecordAdmin: boolean = false;
        public IsRecordAdmin: boolean;
        public CurrentPrescriptionItemStatus: string;
        public IsLaunchprnFromPresChart: boolean = false;
        public IsAnyParacetamolAdministeredInGivenPeriod: boolean = false;
        sParacetamolRecentlyAdministered: number = -1;
        public AmendedDoseUOMOID: number;
        public AmendedDoseVal: string;
        public isInfusionInProgressForMultiRouteItem: boolean;
        public InProgressInfusionMultiRouteDTTM: DateTime;
        public IsStrikethroughDisable: boolean;
        private _IsWardStock: boolean = false;
        public get IsWardStock(): boolean {
            return this._IsWardStock;
        }
        public set IsWardStock(value: boolean) {
            this._IsWardStock = value;
           // // NotifyPropertyChanged("IsWardStock");
        }
        private _isSubmitInProgress: boolean = false;
        public get IsSubmitInProgress(): boolean {
            return this._isSubmitInProgress;
        }
        public set IsSubmitInProgress(value: boolean) {
            this._isSubmitInProgress = value;
           // // NotifyPropertyChanged("IsSubmitInProgress");
        }
        private _DoseVolumeShow: Visibility = Visibility.Collapsed;
        public get DoseVolumeShow(): Visibility {
            return this._DoseVolumeShow;
        }
        public set DoseVolumeShow(value: Visibility) {
            if (this._DoseVolumeShow != value) {
                this._DoseVolumeShow = value;
                // // NotifyPropertyChanged("DoseVolumeShow");
            }
        }
        public DoseVolumeTitle: string;
        public DoseFontWeight: string;
        public DoseForeColor: string;
        public VolFontWeight: string;
        public VolForeColor: string;
        public DoseDescreIntendedDose: string;
        public DoseDescreIntendedVolume: string;
        public DoseDescreActualDose: string;
        public DoseDescreActualVolume: string;
        public IsLastSlotCheckRequired: boolean = false;
        private _IsUpdatePIStatusToCompleted: boolean = false;
        public get IsUpdatePIStatusToCompleted(): boolean {
            return this._IsUpdatePIStatusToCompleted;
        }
        public set IsUpdatePIStatusToCompleted(value: boolean) {
            this._IsUpdatePIStatusToCompleted = value;
        }
        private _IsOVUpdtPIStsToCompletedNotkwn: boolean;
        public get IsOVUpdtPIStsToCompletedNotkwn(): boolean {
            return this._IsOVUpdtPIStsToCompletedNotkwn;
        }
        public set IsOVUpdtPIStsToCompletedNotkwn(value: boolean) {
            this._IsOVUpdtPIStsToCompletedNotkwn = value;
        }
        public FreqPerodCode: string;
        public IsReloadChartRequired: boolean = false;
        public CACode: string;
        public IsLastSlotinCurrentView: boolean = false;
        _AlreadyRequestedDetails: string = String.Empty;
        public get AlreadyRequestedDetails(): string {
            return this._AlreadyRequestedDetails;
        }
        public set AlreadyRequestedDetails(value: string) {
            if (this._AlreadyRequestedDetails != value) {
                this._AlreadyRequestedDetails = value;
                // // NotifyPropertyChanged("AlreadyRequestedDetails");
            }
        }
        public get CurrentServerDate(): DateTime{
            return this._CurrentServerDate;
        }
        public set CurrentServerDate(value: DateTime) {
            if (this._CurrentServerDate != value) {
                this._CurrentServerDate = value;
                // // NotifyPropertyChanged("CurrentServerDate");
            }
        }
        private _PasswordSuccess: boolean = false;
        public get PasswordSuccess(): boolean {
            return this._PasswordSuccess;
        }
        public set PasswordSuccess(value: boolean) {
            this._PasswordSuccess = value;
            if (this.PasswordDelEvent != null)
                this.PasswordDelEvent(this._PasswordSuccess);
        }
        public get IsDoseEnabled(): boolean {
            return this._isDoseEnabled;
        }
        public set IsDoseEnabled(value: boolean) {
            if (this._isDoseEnabled != value) {
                this._isDoseEnabled = value;
               // // NotifyPropertyChanged("IsDoseEnabled");
            }
        }
        private _TxtBarcode: string;
        public get TxtBarcode(): string {
            return this._TxtBarcode;
        }
        public set TxtBarcode(value: string) {
            if (this._TxtBarcode != value) {
                this._TxtBarcode = value;
               // // NotifyPropertyChanged("TxtBarcode");
            }
        }
        private _EnableBarcode: string;
        public get EnableBarcode(): string {
            return this._EnableBarcode;
        }
        public set EnableBarcode(value: string) {
            if (this._EnableBarcode != value) {
                this._EnableBarcode = value;
               // // NotifyPropertyChanged("EnableBarcode");
            }
        }
        private _adminmethod: string;
        public get AdminMethod(): string {
            return this._adminmethod;
        }
        public set AdminMethod(value: string) {
            if (this._adminmethod != value) {
                this._adminmethod = value;
                // // NotifyPropertyChanged("AdminMethod");
                this.SetDoseState();
            }
        }
        private SetDoseState(): void {
            if (String.Compare(this._DoseType, DoseTypeCode.CONDITIONAL) == 0) {
                this.IsDoseEnabled = false;
            }
            else if (String.IsNullOrEmpty(this._adminmethod)) {
                this.IsDoseEnabled = true;
            }
            else {
                this.IsDoseEnabled = false;
            }
        }
        private _paracetamolAdminCount: number;
        private _isParacetamolIngredient: boolean;
        public get ParacetamolAdminCount(): number {
            return this._paracetamolAdminCount;
        }
        public set ParacetamolAdminCount(value: number) {
            this._paracetamolAdminCount = value;
            // // NotifyPropertyChanged("ParacetamolAdminCount");
        }
        public get IsParacetamolIngredient(): boolean {
            return this._isParacetamolIngredient;
        }
        public set IsParacetamolIngredient(value: boolean) {
            this._isParacetamolIngredient = value;
            // // NotifyPropertyChanged("IsParacetamolIngredient");
        }
        private _IsAmendCompletedStatus: boolean;
        public get IsAmendCompletedStatus(): boolean {
            return this._IsAmendCompletedStatus;
        }
        public set IsAmendCompletedStatus(value: boolean) {
            this._IsAmendCompletedStatus = value;
            // // NotifyPropertyChanged("_IsAmendCompletedStatus");
        }
        private _slotsTimeIntervalAvg: number = 0;
        public get SlotsTimeIntervalAvg(): number {
            return this._slotsTimeIntervalAvg;
        }
        public set SlotsTimeIntervalAvg(value: number) {
            this._slotsTimeIntervalAvg = value;
            // // NotifyPropertyChanged("SlotsTimeIntervalAvg");
        }
        private _MultiRoute_Type: MultiRouteType = MultiRouteType.Single_Route;
        public get MultiRoute_Type(): MultiRouteType {
            return this._MultiRoute_Type;
        }
        public set MultiRoute_Type(value: MultiRouteType) {
            this._MultiRoute_Type = value;
        }
        public IsDialogResult: boolean;
        public IsModifyWindow: boolean;
        public IsIconClick: boolean = false;
        public IsNextPRNAllowed: boolean;
        public MinTimeInterval: number;
        public IsNextDueSlotExists: boolean;
        public IsNextHomeLeaveSlotExists: boolean;
        public IsNextAdminSlotExists: boolean;
        public RouteOID: number;
        public IsControlledDrug: boolean;
        public IsFluidControlledDrug: boolean;
        public LorenzoID: string;
        private _IsInfusionItem: boolean = false;
        public get IsInfusionItem(): boolean {
            return this._IsInfusionItem;
        }
        public set IsInfusionItem(value: boolean) {
            this._IsInfusionItem = value;
        }
        private isLastPRN: boolean = false;
        public get IsLastPRN(): boolean {
            return this.isLastPRN;
        }
        public set IsLastPRN(value: boolean) {
            if (this.isLastPRN != value) {
                this.isLastPRN = value;
                // // NotifyPropertyChanged("IsLastPRN");
            }
        }
        private drugDetail: DrugItem;
        public get DrugDetail(): DrugItem {
            return this.drugDetail;
        }
        public set DrugDetail(value: DrugItem) {
            if (!Helper.ReferenceEquals(this.drugDetail, value)) {
                this.drugDetail = value;
                // // NotifyPropertyChanged("DrugDetail");
            }
        }
        public IdentifyingOID: number;
        public IdentifyingType: string;
        public MCVersionNo: string;
        public AdminReason: string;
        private _Dose: string;
        public get Dose(): string {
            return this._Dose;
        }
        public set Dose(value: string) {
            if (this._Dose != value) {
                this._Dose = value;
                // // NotifyPropertyChanged("Dose");
            }
        }
        private _DoseType: string;
        public get DoseType(): string {
            return this._DoseType;
        }
        public set DoseType(value: string) {
            if (this._DoseType != value) {
                this._DoseType = value;
                // // NotifyPropertyChanged("DoseType");
                this.SetDoseState();
            }
        }
        private _LDose: string;
        public get LDose(): string {
            return this._LDose;
        }
        public set LDose(value: string) {
            if (this._LDose != value) {
                this._LDose = value;
               // // NotifyPropertyChanged("LDose");
            }
        }
        private _UDose: string;
        public get UDose(): string {
            return this._UDose;
        }
        public set UDose(value: string) {
            if (this._UDose != value) {
                this._UDose = value;
                // // NotifyPropertyChanged("UDose");
            }
        }
        private _DoseUOM: string;
        public get DoseUOM(): string {
            return this._DoseUOM;
        }
        public set DoseUOM(value: string) {
            if (this._DoseUOM != value) {
                this._DoseUOM = value;
                // // NotifyPropertyChanged("DoseUOM");
            }
        }
        _AdministeredRoute: string = String.Empty;
        public get AdministeredRoute(): string {
            return this._AdministeredRoute;
        }
        public set AdministeredRoute(value: string) {
            if (this._AdministeredRoute != value) {
                this._AdministeredRoute = value;
                // // NotifyPropertyChanged("AdministeredRoute");
            }
        }
        private _ScheduledDTTM: DateTime;
        public get ScheduledDTTM(): DateTime{
            return this._ScheduledDTTM;
        }
        public set ScheduledDTTM(value: DateTime) {
            if (!Helper.ReferenceEquals(this._ScheduledDTTM, value)) {
                this._ScheduledDTTM = value;
                this.ScheduledDTTMDisplay = value.ToUserDateTimeString(CConstants.Timeformat);
                // // NotifyPropertyChanged("ScheduledDTTM");
            }
        }
        private _ScheduledDTTMDisplay: string;
        public get ScheduledDTTMDisplay(): string {
            return this._ScheduledDTTMDisplay;
        }
        public set ScheduledDTTMDisplay(value: string) {
            if (!Helper.ReferenceEquals(this._ScheduledDTTM, value)) {
                this._ScheduledDTTMDisplay = value;
                // // NotifyPropertyChanged("ScheduledDTTMDisplay");
            }
        }
        private _LastModifiedAt: DateTime;
        public get LastModifiedAt(): DateTime{
            return this._LastModifiedAt;
        }
        public set LastModifiedAt(value: DateTime) {
            if (!Helper.ReferenceEquals(this._LastModifiedAt, value)) {
                this._LastModifiedAt = value;
                // // NotifyPropertyChanged("LastModifiedAt");
            }
        }
        private _AdministrationDetail: AdministrationDetailVM;
        public get AdministrationDetail(): AdministrationDetailVM {
            return this._AdministrationDetail;
        }
        public set AdministrationDetail(value: AdministrationDetailVM) {
            this._AdministrationDetail = value;
            // // NotifyPropertyChanged("AdministrationDetail");
        }
        private routes: ObservableCollection<CListItem>;
        public get Routes(): ObservableCollection<CListItem> {
            return this.routes;
        }
        public set Routes(value: ObservableCollection<CListItem>) {
            this.routes = value;
            // super.// NotifyPropertyChanged("Routes");
        }
        private _Status: string;
        public get Status(): string {
            return this._Status;
        }
        public set Status(value: string) {
            if (this._Status != value) {
                this._Status = value;
                // // NotifyPropertyChanged("Status");
            }
        }
        private _PresScheduleOID: number;
        public get PresScheduleOID(): number {
            return this._PresScheduleOID;
        }
        public set PresScheduleOID(value: number) {
            if (this._PresScheduleOID != value) {
                this._PresScheduleOID = value;
                // // NotifyPropertyChanged("PresScheduleOID");
            }
        }
        private _PatientOID: number;
        public get PatientOID(): number {
            return this._PatientOID;
        }
        public set PatientOID(value: number) {
            if (this._PatientOID != value) {
                this._PatientOID = value;
                // // NotifyPropertyChanged("PatientOID");
            }
        }
        private _PrescriptionItemOID: number;
        public get PrescriptionItemOID(): number {
            return this._PrescriptionItemOID;
        }
        public set PrescriptionItemOID(value: number) {
            if (this._PrescriptionItemOID != value) {
                this._PrescriptionItemOID = value;
                // // NotifyPropertyChanged("PrescriptionItemOID");
            }
        }
        private _DoseUOMOID: number;
        public get DoseUOMOID(): number {
            return this._DoseUOMOID;
        }
        public set DoseUOMOID(value: number) {
            if (this._DoseUOMOID != value) {
                this._DoseUOMOID = value;
                // // NotifyPropertyChanged("DoseUOMOID");
            }
        }
        private _DoseUOMLzoID: string;
        public get DoseUOMLzoID(): string {
            return this._DoseUOMLzoID;
        }
        public set DoseUOMLzoID(value: string) {
            if (this._DoseUOMLzoID != value) {
                this._DoseUOMLzoID = value;
                // // NotifyPropertyChanged("DoseUOMLzoID");
            }
        }
        private _IsNextSlotMultiSlotAdmin: boolean;
        public get IsNextSlotMultiSlotAdmin(): boolean {
            return this._IsNextSlotMultiSlotAdmin;
        }
        public set IsNextSlotMultiSlotAdmin(value: boolean) {
            if (this._IsNextSlotMultiSlotAdmin != value) {
                this._IsNextSlotMultiSlotAdmin = value;
                // // NotifyPropertyChanged("IsNextSlotMultiSlotAdmin");
            }
        }
        private _CDWardRegItemOID: number;
        public get CDWardRegItemOID(): number {
            return this._CDWardRegItemOID;
        }
        public set CDWardRegItemOID(value: number) {
            if (this._CDWardRegItemOID != value) {
                this._CDWardRegItemOID = value;
                // // NotifyPropertyChanged("CDWardRegItemOID");
            }
        }
        private _CDPatientRegItemOID: number;
        public get CDPatientRegItemOID(): number {
            return this._CDPatientRegItemOID;
        }
        public set CDPatientRegItemOID(value: number) {
            if (this._CDPatientRegItemOID != value) {
                this._CDPatientRegItemOID = value;
                // // NotifyPropertyChanged("CDPatientRegItemOID");
            }
        }
        private _PatientName: string;
        public get PatientName(): string {
            return this._PatientName;
        }
        public set PatientName(value: string) {
            if (this._PatientName != value) {
                this._PatientName = value;
                // // NotifyPropertyChanged("PatientName");
            }
        }
        private _PatientPASID: string;
        public get PatientPASID(): string {
            return this._PatientPASID;
        }
        public set PatientPASID(value: string) {
            if (this._PatientPASID != value) {
                this._PatientPASID = value;
                // // NotifyPropertyChanged("PatientPASID");
            }
        }
        private _PatientCurrentStock: string;
        public get PatientCurrentStock(): string {
            return this._PatientCurrentStock;
        }
        public set PatientCurrentStock(value: string) {
            if (this._PatientCurrentStock != value) {
                this._PatientCurrentStock = value;
                // // NotifyPropertyChanged("PatientCurrentStock");
            }
        }
        private _WardCurrentStock: string;
        public get WardCurrentStock(): string {
            return this._WardCurrentStock;
        }
        public set WardCurrentStock(value: string) {
            if (this._WardCurrentStock != value) {
                this._WardCurrentStock = value;
                // // NotifyPropertyChanged("WardCurrentStock");
            }
        }
        private _AdministrableQtyView: AdministrableQtyViewVM;
        public get AdministrableQtyView(): AdministrableQtyViewVM {
            return this._AdministrableQtyView;
        }
        public set AdministrableQtyView(value: AdministrableQtyViewVM) {
            this._AdministrableQtyView = value;
            // // NotifyPropertyChanged("AdministrableQtyView");
        }
        public IsConditionalExists: boolean;
        //public delegate void AdminCompleted(MedsRecordAdminstrator objMedsRecordAdminstrator);
        public AdminCompletedEvent: Function;
        public IsPICompOrDiscAndScheduleDTTMBeyondPIStopDTTM: boolean;
        private _PGDLorenzoID: string;
        public get PGDLorenzoID(): string {
            return this._PGDLorenzoID;
        }
        public set PGDLorenzoID(value: string) {
            this._PGDLorenzoID = value;
        }
        private _EncounterOID: number;
        public get EncounterOID(): number {
            return this._EncounterOID;
        }
        public set EncounterOID(value: number) {
            this._EncounterOID = value;
        }
        private _ServiceOID: number;
        public get ServiceOID(): number {
            return this._ServiceOID;
        }
        public set ServiceOID(value: number) {
            this._ServiceOID = value;
        }
        public SubscribeAddClickEvent(img1: Image): void {
            img1.MouseLeftButtonDown  = (s,e) => { this.img1_MouseLeftButtonDown(s,e); } ;
            //img1.MouseLeftButtonUp  = (s,e) => { this.img1_MouseLeftButtonDown(s,e); } ;
        }
        IsCumulativeWarningAcknowledged: boolean;
        IsPRN: boolean = false;
        public CheckValidation(): boolean {
            let sErrorMsg: string = String.Empty;
            let oTagDrugHeaderDetail: TagDrugHeaderDetail = null;
            if (!UserPermissions.CanManageMedAdministration) {
                this.ShowErrorMessage(Resource.MedsAdminChartOverview.CanManageMedAdministration, MessageBoxButton.OK, MessageBoxType.Critical);
                return false;
            }
            if (this.DrugDetail != null && this.DrugDetail.Tag != null) {
                oTagDrugHeaderDetail = <TagDrugHeaderDetail>(this.DrugDetail.Tag);
                this.IsPRN = oTagDrugHeaderDetail != null && oTagDrugHeaderDetail.IsPRN;
            }
            if (!this.IsDiscontinuedErrorMsgExists && oTagDrugHeaderDetail != null && !String.IsNullOrEmpty(oTagDrugHeaderDetail.PrescriptionItemStatus) && String.Compare(oTagDrugHeaderDetail.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) == 0) {
                this.IsDiscontinuedErrorMsgExists = true;
                sErrorMsg = MedsAdminChartToolTip.DiscontinuedErrorMsg;
                this.ShowErrorMessage(sErrorMsg, MessageBoxButton.YesNo);
                return false;
            }
            if (!this.IsLockIconMsgExists && this.IsLockIconExists) {
                this.IsLockIconMsgExists = true;
                let sAdminDate: string = String.Empty;
                if (this.AdministrationDetail != null)
                    sAdminDate = this.AdministrationDetail.AdministeredDate.ToString();
                else sAdminDate = this.PreviousAdministeredDate.ToString("dd-MMM-yyyy HH:mm");
                let sTimetoPrescribe: string = String.Empty;
                if (this.MinTimeInterval < 60)
                    sTimetoPrescribe = this.MinTimeInterval + " minute(s).";
                else if (this.MinTimeInterval >= 60)
                    sTimetoPrescribe = Number.isInteger(Convert.ToDouble(this.MinTimeInterval / Convert.ToDouble(60))) ? Convert.ToDouble(this.MinTimeInterval / Convert.ToDouble(60)) + " hour(s)." : Convert.ToDouble(this.MinTimeInterval / Convert.ToDouble(60)).toFixed(2) + " hour(s).";
                    sErrorMsg = oTagDrugHeaderDetail.DrugName + MedsAdminChartToolTip.LockIconToolTip + sAdminDate + MedsAdminChartToolTip.LockIconTimeToolTip + sTimetoPrescribe + MedsAdminChartToolTip.LockIconContinueToolTip;
               this.ShowErrorMessage(sErrorMsg, MessageBoxButton.YesNo,/*MsgBoxHeight:*/160,/*MsgBoxWidth:*/400);
                return false;
            }
            if (!this.IsPatientSelfAdminErrorMsgExists && this.IsPatientSelfAdmin) {
                this.IsPatientSelfAdminErrorMsgExists = true;
                sErrorMsg = MedsAdminChartToolTip.SelfAdministeredErrorMsg;
               this.ShowErrorMessage(sErrorMsg, MessageBoxButton.YesNo);
                return false;
            }
            if (this.IsLastPRN && this.AdministrationDetail == null) {
                let bIsToday: boolean = (this.TodaySlotDate.Date < CommonBB.GetServerDateTime().Date);
                if (this.IsParacetamolIngredient && this.sParacetamolRecentlyAdministered <= 0) {
                    if (this.sParacetamolRecentlyAdministered == -1) {
                        let oSlotHelper: SlotAdministrationHelper = new SlotAdministrationHelper();
                       // oSlotHelper.TriggerParacetamolWarningEvent -= oSlotHelper_TriggerParacetamolWarningEvent;
                        oSlotHelper.TriggerParacetamolWarningEvent  = (s) => {
                            this.oSlotHelper_TriggerParacetamolWarningEvent(s);
                          };
                        let dtAdminDTTM: DateTime= bIsToday ? this.TodaySlotDate.Date : CommonBB.GetServerDateTime();
                        oSlotHelper.IsAnyParacetamolAdministered(dtAdminDTTM, 0);
                        Busyindicator.SetStatusBusy("CheckParaAdministered");
                        this.sParacetamolRecentlyAdministered = 0;
                    }
                    return false;
                }
                if (this.IsParacetamolIngredient && this.ParacetamolAdminCount > 3 && !bIsToday && (this.IsCumulativeWarningAcknowledged == null || (this.IsCumulativeWarningAcknowledged.HasValue && !this.IsCumulativeWarningAcknowledged.Value))) {
                    this.IsCumulativeWarningAcknowledged = false;
                    sErrorMsg = String.Format(MedsAdminChartToolTip.CumulativeWarningMsg, this.ParacetamolAdminCount);
                    this.ShowErrorMessage(sErrorMsg, MessageBoxButton.YesNo,/*MsgBoxHeight:*/160,/*MsgBoxWidth:*/410,/*MsgBoxTag:*/CConstants.CumulativeWarning);
                    return false;
                }
            }
            if (oTagDrugHeaderDetail != null && oTagDrugHeaderDetail.MultiRoute_Type == MultiRouteType.Mixed_Routes && (oTagDrugHeaderDetail.IsPRN && String.IsNullOrEmpty(this.Status))) {
                if (this.isInfusionInProgressForMultiRouteItem) {
                    sErrorMsg = String.Format(MedsAdminChartToolTip.MixedMultiRouteInProgress_ErrorMsg, this.InProgressInfusionMultiRouteDTTM.ToString(CConstants.DateTimeFormat), oTagDrugHeaderDetail.DrugName);
                    this.ShowErrorMessage(sErrorMsg, MessageBoxButton.OK,/*MsgBoxHeight:*/160,/*MsgBoxWidth:*/410,/*oMsgBoxType:*/MessageBoxType.Information);
                    return false;
                }
            }
            return true;
        }
        oSlotHelper_TriggerParacetamolWarningEvent(bParacetamolAdministered: boolean): void {
            Busyindicator.SetStatusIdle("CheckParaAdministered");
            if (bParacetamolAdministered) {
                this.ShowErrorMessage(Resource.MedicationAdministrator.ParacetamolAdministration_WarningMsg, MessageBoxButton.YesNo,/*MsgBoxHeight:*/180,/*MsgBoxWidth:*/420,/*MsgBoxTag:*/CConstants.ParacetamolRecentlyAdministered);
                this.IsAnyParacetamolAdministeredInGivenPeriod = bParacetamolAdministered;
            }
            else {
                this.sParacetamolRecentlyAdministered = 1;
                if (this.iMsgBox == null) {
                    this.iMsgBox = new iMessageBox();
                }
                this.iMsgBox.Tag = CConstants.ParacetamolRecentlyAdministered;
                this.iMsgBox_MessageBoxClose(null, new MessageEventArgs(MessageBoxResult.Yes));
            }
        }
        public LaunchModifyAdmin(sPrevStatus: string, oDrugHeader: CDrugHeader, oTagDrugHeaderDetail: TagDrugHeaderDetail, oMedsAdminSlotVM: MedsAdminMultiSlotVM, oMAModorST: MedsAdminModifyOrStrikethrough, bDataContext: Object, oMedsAdminMultiSlotVM: MedsAdminMultiSlot): void {
            this.CACode = MedAction.StrikethorughAdmin;
            oMedsAdminMultiSlotVM.IsLastSlotExist(this);
            sPrevStatus = this.Status;
            oDrugHeader.oDrugHdrAddnlInfo.RecordedAt = this.AdministrationDetail.RecordedAt.ToString(CConstants.DateTimeFormat) + " (Due at " + this.ScheduledDTTM.ToUserDateTimeString(CConstants.Timeformat) + ")";
            let IsDSTReview: boolean = false;
            let IsAmbiguousReview: boolean = false;
            let IsInvalidReview: boolean = false;
            if (oTagDrugHeaderDetail.ReviewDTTM != DateTime.MinValue) {
                oDrugHeader.oDrugHdrAddnlInfo.ReviewAt = oTagDrugHeaderDetail.ReviewDTTM.ConvertToUser(
                    (o1) => {
                        IsDSTReview = o1;
                      },
                      (o2) => {
                        IsAmbiguousReview = o2;
                      },
                      (o3) => {
                        IsInvalidReview = o3;
                      }).ToDateTimeString(IsDSTReview, IsAmbiguousReview, CConstants.DateTimeFormat);
                if (oTagDrugHeaderDetail.ReviewDTTM.Date <= CommonBB.GetServerDateTime().Date) {
                    oDrugHeader.oDrugHdrAddnlInfo.ReviewAtVisibility = Visibility.Visible;
                    oDrugHeader.oDrugHdrAddnlInfo.ReviewIconTooltip = Common.GetReviewIconTooltip(oTagDrugHeaderDetail.ReviewType, oTagDrugHeaderDetail.ReviewDTTM, oTagDrugHeaderDetail.ReviewRequestedComments, oTagDrugHeaderDetail.ReviewRequestedby);
                }
            }
            this.IdentifyingOID = oTagDrugHeaderDetail.DrugIdentifyingOID;
            this.IdentifyingType = oTagDrugHeaderDetail.DrugIdentifyingType;
            this.MCVersionNo = oTagDrugHeaderDetail.MCVersionNo;
            this.AdminMethod = oTagDrugHeaderDetail.AdminMethod;
            this.RouteOID = oTagDrugHeaderDetail.RouteOID;
            this.IsControlledDrug = oTagDrugHeaderDetail.IsControlDrug;
            this.IsFluidControlledDrug = oTagDrugHeaderDetail.IsFluidControlDrug;
            this.LorenzoID = oTagDrugHeaderDetail.LorenzoID;
            this.PrescriptionStartDate = oTagDrugHeaderDetail.StartDate;
            this.DoseType = oTagDrugHeaderDetail.DoseType;
            this.SlotsTimeIntervalAvg = oTagDrugHeaderDetail.SlotsTimeIntervalAvg;
            if (oMedsAdminSlotVM != null) {
                this.IsParacetamolIngredient = oMedsAdminSlotVM.IsParacetamolIngredient;
                this.ParacetamolAdminCount = oMedsAdminSlotVM.ParacetamolAdminCount;
            }
            this.IsStrikethroughDisable = oMedsAdminSlotVM.IsStrikethroughDisable;
            oDrugHeader.oDrugHdrAddnlInfo.RecordAdminViewed = RecordAdminType.RecordAdmin;
            oMAModorST = new MedsAdminModifyOrStrikethrough();
            oMAModorST.constructorImpl(this, oDrugHeader.oDrugHdrAddnlInfo);
            oMAModorST.objDrugHeader = new DrugHeader();
            oMAModorST.objDrugHeader.DataContext = Common.SetDrugHeaderContent(this.DrugDetail, oDrugHeader.oDrugHdrAddnlInfo, oMAModorST.objDrugHeader);
            oMAModorST.objlinkButtons = new ModifyStrikethroughLink();
            oMAModorST.objlinkButtons.DataContext = bDataContext;
            if (!String.IsNullOrEmpty(this.Status) && String.Equals(this.Status, "CC_NOTKNOWN", StringComparison.InvariantCultureIgnoreCase) && this.AdministrationDetail.MedAdminOID == 0) {
                oMAModorST.IsSlotInPastDateAndStatusUnknown = true;
            }
            if (this.Status == SlotStatus.NOTKNOWN && this.MultiRoute_Type == MultiRouteType.Mixed_Routes) {
                oMAModorST.IsModifyLaunchedDirectly = true;
		
                oMAModorST._Parent = oMedsAdminMultiSlotVM;
                Busyindicator.SetStatusIdle("MedChart");
                oMAModorST.cmdModify_Click(this, new RoutedEventArgs());
            } 
            else AppActivity.OpenWindow("Choose Modify or Strikethrough", oMAModorST, (s) => {this.MedsAdminMultiSlot_Closed (s); }, "", true, 210, 440, false, WindowButtonType.Close, oMAModorST.objlinkButtons);
        }
        MedsAdminMultiSlot_Closed(args: AppDialogEventargs): void {
            if (args != null && args.Content instanceof MedsAdminModifyOrStrikethrough) {
                let oMAModorST: MedsAdminModifyOrStrikethrough = ObjectHelper.CreateType<MedsAdminModifyOrStrikethrough>(args.Content, MedsAdminModifyOrStrikethrough);
                if (oMAModorST != null && oMAModorST.cmdCloseClick()) {
                    if (this.ModifyStrikeThroughClosedCompleted != null)
                        this.ModifyStrikeThroughClosedCompleted(oMAModorST);
                }
            }
            args.AppChildWindow.DialogResult = true;
        }
        LaunchRecordAdmin(): void {
            let oHdrAddnlInfo: CDrugHdrAddnlInfo = new CDrugHdrAddnlInfo();
            oHdrAddnlInfo.RecordedAt = CommonBB.GetServerDateTime().ToUserDateTimeString(CConstants.DateTimeFormat);
            this.PrescriptionItemOID = Number.Parse(this.DrugDetail.Key);
            this.IsNextDueSlotExists = false;
            let oTagDrugHeaderDetail: TagDrugHeaderDetail = <TagDrugHeaderDetail>(this.DrugDetail.Tag);
            if (oTagDrugHeaderDetail != null) {
                this.Dose = (!String.IsNullOrEmpty(oTagDrugHeaderDetail.LowerDose) && String.IsNullOrEmpty(oTagDrugHeaderDetail.UpperDose)) ? oTagDrugHeaderDetail.LowerDose : "0";
                this.LDose = !(String.IsNullOrEmpty(oTagDrugHeaderDetail.LowerDose)) ? oTagDrugHeaderDetail.LowerDose : "0";
                this.DoseUOM = !(String.IsNullOrEmpty(oTagDrugHeaderDetail.DoseUOM)) ? oTagDrugHeaderDetail.DoseUOM : String.Empty;
                this.DoseUOMOID = oTagDrugHeaderDetail.DoseUOMOID;
                this.DoseUOMLzoID = !(String.IsNullOrEmpty(oTagDrugHeaderDetail.DoseUOMLzoID)) ? oTagDrugHeaderDetail.DoseUOMLzoID : String.Empty;
                this.UDose = !(String.IsNullOrEmpty(oTagDrugHeaderDetail.UpperDose)) ? oTagDrugHeaderDetail.UpperDose : String.Empty;
            }
            this.PresScheduleOID = this.PresScheduleOID;
            this.IdentifyingOID = oTagDrugHeaderDetail.DrugIdentifyingOID;
            this.IdentifyingType = oTagDrugHeaderDetail.DrugIdentifyingType;
            this.MCVersionNo = oTagDrugHeaderDetail.MCVersionNo;
            this.AdminMethod = oTagDrugHeaderDetail.AdminMethod;
            this.DoseType = oTagDrugHeaderDetail.DoseType;
            this.RouteOID = oTagDrugHeaderDetail.RouteOID;
            this.SlotsTimeIntervalAvg = oTagDrugHeaderDetail.SlotsTimeIntervalAvg;
            this.IsControlledDrug = oTagDrugHeaderDetail.IsControlDrug;
            this.IsFluidControlledDrug = oTagDrugHeaderDetail.IsFluidControlDrug;
            this.LorenzoID = oTagDrugHeaderDetail.LorenzoID;
            this.PrescriptionStartDate = oTagDrugHeaderDetail.StartDate;
            this.PrescriptionEndDate = oTagDrugHeaderDetail.EndDate;
            this.PrescriptionItemStatus = oTagDrugHeaderDetail.PrescriptionItemStatus;
            let oSlotHelper: SlotAdministrationHelper = new SlotAdministrationHelper();
            let IsDSTReview: boolean = false;
            let IsAmbiguousReview: boolean = false;
            let IsInvalidReview: boolean = false;
            if (oTagDrugHeaderDetail.ReviewDTTM != DateTime.MinValue) {
                oHdrAddnlInfo.ReviewAt = oTagDrugHeaderDetail.ReviewDTTM.ConvertToUser(
                    (o1) => {
                        IsDSTReview = o1;
                      },
                      (o2) => {
                        IsAmbiguousReview = o2;
                      },
                      (o3) => {
                        IsInvalidReview = o3;
                      }).ToDateTimeString(IsDSTReview, IsAmbiguousReview, CConstants.DateTimeFormat);
                if (oTagDrugHeaderDetail.ReviewDTTM.Date <= CommonBB.GetServerDateTime().Date) {
                    oHdrAddnlInfo.ReviewAtVisibility = Visibility.Visible;
                    oHdrAddnlInfo.ReviewIconTooltip = Common.GetReviewIconTooltip(oTagDrugHeaderDetail.ReviewType, oTagDrugHeaderDetail.ReviewDTTM, oTagDrugHeaderDetail.ReviewRequestedComments, oTagDrugHeaderDetail.ReviewRequestedby);
                }
            }
            oSlotHelper.LaunchRecordAdminEvent  = (s) => { this.oSlotHelper_LaunchRecordAdminEvent(s); } ;
            oSlotHelper.GetSlotDetails(this);
        }
        oSlotHelper_LaunchRecordAdminEvent(objAdminDetail: AdministrationDetail): void {
            this.oMedsAdminRec = new MedsRecordAdminstrator();    
            this.oMedsAdminRec.constructorImpl(this);                    // xaml.cs
            this.oMedsAdminRec.objDrugHeader = new DrugHeader();
            this.oMedsAdminRec.objDrugHeader.oDrugHeader = new CDrugHeader();
            this.oMedsAdminRec.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo = new DrugHeaderItem();
            this.oMedsAdminRec.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowFrequency = false;
            this.oMedsAdminRec.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowSite = false;
            this.oMedsAdminRec.objDrugHeader.oDrugHeader.oDrugHdrBasicInfo.bShowAsrequired = false;
            let HdrAddlInfo: CDrugHdrAddnlInfo = new CDrugHdrAddnlInfo();
            HdrAddlInfo.RecordAdminViewed = RecordAdminType.RecordAdmin;
            let IsDSTReview: boolean = false;
            let IsAmbiguousReview: boolean = false;
            let IsInvalidReview: boolean = false;
            if (this.DrugDetail != null && this.DrugDetail.Tag != null) {
                let oTagDrugHeaderDetail: TagDrugHeaderDetail = <TagDrugHeaderDetail>(this.DrugDetail.Tag);
                if (oTagDrugHeaderDetail != null) {
                    if (DateTime.NotEquals(oTagDrugHeaderDetail.ReviewDTTM , DateTime.MinValue)) {
                        HdrAddlInfo.ReviewAt = oTagDrugHeaderDetail.ReviewDTTM.ConvertToUser(
                            (o1) => {
                                IsDSTReview = o1;
                              },
                              (o2) => {
                                IsAmbiguousReview = o2;
                              },
                              (o3) => {
                                IsInvalidReview = o3;
                              }).ToDateTimeString(IsDSTReview, IsAmbiguousReview, CConstants.DateTimeFormat);
                        if (DateTime.LessThanOrEqualTo(oTagDrugHeaderDetail.ReviewDTTM.Date , CommonBB.GetServerDateTime().Date)) {
                            HdrAddlInfo.ReviewAtVisibility = Visibility.Visible;
                            HdrAddlInfo.ReviewIconTooltip = Common.GetReviewIconTooltip(oTagDrugHeaderDetail.ReviewType, oTagDrugHeaderDetail.ReviewDTTM, oTagDrugHeaderDetail.ReviewRequestedComments, oTagDrugHeaderDetail.ReviewRequestedby);
                        }
                    }
                }
            }
            this.oMedsAdminRec.objDrugHeader.DataContext = Common.SetDrugHeaderContent(this.DrugDetail, HdrAddlInfo, this.oMedsAdminRec.objDrugHeader);
            this.oMedsAdminRec.objAdminDetail = objAdminDetail;
            this.oMedsAdminRec.OnRecAdminFinishEvent  = (s) => { this.oMedsAdminRec_OnRecAdminFinishEvent(s); } ;
            this.oMedsAdminRec.onDialogClose = this.oMedsAdminRec_Closed;
            let Callback = (s, e) => {
                if (s != null && e != null) {
                    this.oMedsAdminRec = s;
                }
            }
            let dialogWindowHeight = (window.devicePixelRatio == 1) ? 775:(775/window.devicePixelRatio) - 40; 
            AppActivity.OpenWindow("Record administration", this.oMedsAdminRec, (s) => { this.oMedsAdminRec_Closed(s); }, "Record administration", true, dialogWindowHeight, 450, false, WindowButtonType.OkCancel, null, null, null, Callback);
        }
        oMedsAdminRec_OnRecAdminFinishEvent(sender: Object): void {
            if (this.AdminCompletedEvent != null)
                this.AdminCompletedEvent(this.oMedsAdminRec);
            this.oMedsAdminRec.dupDialogRef.close();
        }
        HomeLeavemsgbox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
            if (e.MessageBoxResult == MessageBoxResult.Yes) {
                this.SlotClick();
            }
            else if (e.MessageBoxResult == MessageBoxResult.No) {
                Busyindicator.SetStatusIdle("MedChart");
            }
        }
        img1_MouseLeftButtonDown(sender: Object, e: MouseButtonEventArgs): void {
            if (String.Compare(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0 && DateTime.NotEquals(MedChartData.SuspendedOn , DateTime.MinValue) && DateTime.GreaterThanOrEqualTo(this.TodaySlotDate.Date , MedChartData.SuspendedOn.Date)) {
                this.iMsgBox = new iMessageBox();
                this.iMsgBox.Title = "Lorenzo";
                this.iMsgBox.MessageButton = MessageBoxButton.YesNo;
                this.iMsgBox.IconType = MessageBoxType.Question;
                // this.iMsgBox.MessageBoxClose -= HomeLeavemsgbox_MessageBoxClose;
                this.iMsgBox.MessageBoxClose  = (s, e) => {
                    this.HomeLeavemsgbox_MessageBoxClose(s, e);
                  };
                this.iMsgBox.Message = MedicationChart.HomeLeaveMsg;
                this.iMsgBox.Show();
            }
            else {
                this.SlotClick();
            }
        }
        private SlotClick(): void {
            if (!this.IsSubmitInProgress) {
                this.IsSubmitInProgress = true;
                Busyindicator.SetStatusBusy("MedChart");
                this.IsIconClick = true;
                this.IsPatientSelfAdminErrorMsgExists = false;
                this.IsDiscontinuedErrorMsgExists = false;
                this.IsLockIconMsgExists = false;
                this.IsLockIconExists = false;
                this.sParacetamolRecentlyAdministered = -1; 
                if (this.CheckValidation()) {
                    this.LaunchRecordAdmin();
                }
                else {
                    this.IsSubmitInProgress = false;
                    Busyindicator.SetStatusIdle("MedChart");
                }
            }
        }
        oMedsAdminRec_Closed(args: AppDialogEventargs): void {
            if (args != null && args.Content != null) {
                this.oMedsAdminRec = args.Content.Component;
                let oSlotVM = ObjectHelper.CreateType<SlotDetailVM>(this.oMedsAdminRec.objslotVM, SlotDetailVM);
                if (oSlotVM != null && !oSlotVM.IsSubmitInProgress) {
                    if (oSlotVM.IsPatientSelfAdmin) {
                        this.IsPatientSelfAdminErrorMsgExists = false;
                    }
                    if (this.oMedsAdminRec != null && args.Result == AppDialogResult.Ok) {
                        //if (!Common.CheckIfLockingDurationElapsed(new EventHandler<MessageEventArgs>(this.iMsgBox_PRNRecAdminClose))) {
                        if (!Common.CheckIfLockingDurationElapsed((o,e)=>((sender: any, e: MessageEventArgs)=>{this.iMsgBox_PRNRecAdminClose(o,e)}))){
                            this.IsSubmitInProgress = true;
                            Busyindicator.SetStatusBusy("Administration", true);
                            this.oMedsAdminRec.cmdOk_Click();
                        }
                    }
                    else if (args.Result == AppDialogResult.Cancel)
                        this.oMedsAdminRec.dupDialogRef.close();
                }
            }
        }
        iMsgBox_PRNRecAdminClose(sender: Object, e: MessageEventArgs): void {
            this.oMedsAdminRec.dupDialogRef.close();
        }
        public SubscribeHistoryClickEvent(HistoryIcon: Image): void {           
            HistoryIcon.MouseLeftButtonDown  = (s,e) => { this.HistoryIcon_MouseLeftButtonDown(s,e); } ;
             //HistoryIcon.MouseLeftButtonUp  = (s,e) => { this.HistoryIcon_MouseLeftButtonDown(s,e); } ;
        }
        HistoryIcon_MouseLeftButtonDown(sender: Object, e: MouseButtonEventArgs): void {
            this.IsIconClick = true;
            let MCVersionNo: string = String.Empty;
            let PrescriptionItemOID: number = 0;
            if (this.DrugDetail != null && this.DrugDetail.Tag != null) {
                let ObjTagDrugHeaderDetail: TagDrugHeaderDetail = (ObjectHelper.CreateType<TagDrugHeaderDetail>(this.DrugDetail.Tag, TagDrugHeaderDetail));
                if (ObjTagDrugHeaderDetail != null) {
                    MCVersionNo = ObjTagDrugHeaderDetail.MCVersionNo;
                    PrescriptionItemOID = ObjTagDrugHeaderDetail.PrescriptionItemOID;
                }
            }
            let oMedAdminSlotHistory: MedsAdminSlotHistory = new MedsAdminSlotHistory();  // xaml file
            let img: Image = ObjectHelper.CreateType<Image>(sender, Image);
            let nMedAdminOID: number;
            let nScheduleOID: number;
            nMedAdminOID = Convert.ToInt64(img.Tag);
            nScheduleOID = 0;
            oMedAdminSlotHistory.MedAdminOID = nMedAdminOID;
            oMedAdminSlotHistory.PresSchOID = nScheduleOID;
            oMedAdminSlotHistory.PrescriptionItemOID = PrescriptionItemOID;
            oMedAdminSlotHistory.MCVersion = MCVersionNo;
            oMedAdminSlotHistory.onDialogClose = this.omedsadmin_Closed;
            // ObjectHelper.stopFinishAndCancelEvent(true);
            AppActivity.OpenWindow("Administration modification history", oMedAdminSlotHistory, this.omedsadmin_Closed, "Administration modification history", false, 600, 610, false, WindowButtonType.Close, null);
        }
        omedsadmin_Closed(args: AppDialogEventargs): void {
            args.AppChildWindow.DialogResult = true;
        }
        public SubscribeLockIconClickEvent(LockIcon: Image): void {
            LockIcon.MouseLeftButtonDown  = (s,e) => { this.LockIcon_MouseLeftButtonDown(s,e); } ;
            //LockIcon.MouseLeftButtonUp  = (s,e) => { this.LockIcon_MouseLeftButtonDown(s,e); } ;
        }
        HomeLeavePRNmesgbox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
            if (e.MessageBoxResult == MessageBoxResult.Yes) {
                this.PRNSlotClick();
            }
        }
        LockIcon_MouseLeftButtonDown(sender: Object, e: MouseButtonEventArgs): void {
            if (String.Compare(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0 && DateTime.NotEquals(MedChartData.SuspendedOn , DateTime.MinValue) && DateTime.GreaterThanOrEqualTo(this.TodaySlotDate.Date , MedChartData.SuspendedOn.Date)) {
                this.iMsgBox = new iMessageBox();
                this.iMsgBox.Title = "Lorenzo";
                this.iMsgBox.MessageButton = MessageBoxButton.YesNo;
                this.iMsgBox.IconType = MessageBoxType.Question;
                // this.iMsgBox.MessageBoxClose -= HomeLeavePRNmesgbox_MessageBoxClose;
                this.iMsgBox.MessageBoxClose  = (s, e) => {
                    this.HomeLeavePRNmesgbox_MessageBoxClose(s, e);
                  };
                this.iMsgBox.Message = MedicationChart.HomeLeaveMsg;
                this.iMsgBox.Show();
            }
            else {
                this.PRNSlotClick();
            }
        }
        private PRNSlotClick(): void {
            if (!this.IsSubmitInProgress) {
                this.IsSubmitInProgress = true;
                Busyindicator.SetStatusBusy("MedChart");
                this.IsDiscontinuedErrorMsgExists = false;
                this.IsLockIconMsgExists = false;
                this.IsLockIconExists = true;
                this.sParacetamolRecentlyAdministered = -1;
                if (this.CheckValidation()) {
                    this.LaunchRecordAdmin();
                }
                else {
                    this.IsSubmitInProgress = false;
                    Busyindicator.SetStatusIdle("MedChart");
                }
            }
        }
        iMsgBox: iMessageBox;
        ShowErrorMessage(sErrorMsg: string, oMessageBoxButton: MessageBoxButton, MsgBoxHeight: number = null, MsgBoxWidth: number = null, MsgBoxTag: Object = null, oMsgBoxType: MessageBoxType = MessageBoxType.Question): void {
            if (!String.IsNullOrEmpty(sErrorMsg)) {
                this.iMsgBox = ObjectHelper.CreateObject(new iMessageBox(), {
                    Title: "LORENZO",
                    Message: sErrorMsg,
                    MessageButton: oMessageBoxButton,
                    IconType: oMsgBoxType
                });
                if (MsgBoxTag != null)
                    this.iMsgBox.Tag = MsgBoxTag;
                if (MsgBoxHeight != null && MsgBoxHeight.HasValue)
                    this.iMsgBox.Height = MsgBoxHeight.Value;
                if (MsgBoxWidth != null && MsgBoxWidth.HasValue)
                    this.iMsgBox.Width = MsgBoxWidth.Value;
                this.iMsgBox.MessageBoxClose  = (s,e) => { this.iMsgBox_MessageBoxClose(s,e); } ;
                this.iMsgBox.Show();
            }
        }
        iMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
            Busyindicator.SetStatusIdle("MedChart");
            let isParacetamolGivenMsg: boolean = this.iMsgBox != null && typeof this.iMsgBox.Tag === "string" && String.Compare(this.iMsgBox.Tag.ToString(), CConstants.ParacetamolRecentlyAdministered) == 0;
            if (e.MessageBoxResult == MessageBoxResult.Yes) {
                Busyindicator.SetStatusBusy("MedChart");
                let isCumulativeMsg: boolean = this.iMsgBox != null && typeof this.iMsgBox.Tag === "string" && String.Compare(this.iMsgBox.Tag.ToString(), CConstants.CumulativeWarning) == 0;
                if (isCumulativeMsg)
                    this.IsCumulativeWarningAcknowledged = true;
                if (isParacetamolGivenMsg) {
                    this.sParacetamolRecentlyAdministered = 1;
                }
                this.IsDialogResult = true;
                if (!this.IsModifyWindow && this.CheckValidation() &&
                (String.Compare(this.Status, SlotStatus.PLANNED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.Status, SlotStatus.OVERDUE, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.Status, SlotStatus.DUENOW, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.Status, SlotStatus.DEFERDUENOW, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.Status, SlotStatus.DEFEROVERDUE, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.Status, SlotStatus.PATIENTSELFADMIN, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.Status, SlotStatus.HOMELEAVE, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.Status, SlotStatus.NOTYETRECORDED, StringComparison.CurrentCultureIgnoreCase) == 0 || (this.IsPRN && String.IsNullOrEmpty(this.Status)))) {
                    this.LaunchRecordAdmin();
                    this.IsCumulativeWarningAcknowledged = null;
                }
                else {
                    if (this.oMedsAdminMultiSlot != null) {
                        this.oMedsAdminMultiSlot.FillModifyAdminDetails();
                        this.LaunchModifyAdmin(this.oMedsAdminMultiSlot.sPrevStatus, this.oMedsAdminMultiSlot.oDrugHeader, this.oMedsAdminMultiSlot.oTagDrugHeaderDetail, this.oMedsAdminMultiSlot.oMedsAdminSlotVM, this.oMedsAdminMultiSlot.oMAModorST, this.oMedsAdminMultiSlot.bDataContext, this.oMedsAdminMultiSlot.oTempMedsAdminMultiSlotVM);
                    }
                }
            }
            else {
                this.IsDialogResult = false;
                if (this.IsPatientSelfAdmin) {
                    this.IsPatientSelfAdminErrorMsgExists = false;
                }
                if (isParacetamolGivenMsg) {
                    this.sParacetamolRecentlyAdministered = -1;
                }
            }
            if (this.ModifyAdminErrorMsgEventCompleted != null)
                this.ModifyAdminErrorMsgEventCompleted();
        }
        public GetDomainCombo0(): void {
            let ConceptCodeValues: string = ValueDomain.ReasonforRecord + "," + ValueDomain.ReasonForNotDefer + "," + ValueDomain.ReasonforDiscrepancy + "," + ValueDomain.ReasonforModification;
            ProcessRTE.GetValuesByDomainCodes(ConceptCodeValues, (s, e) => {
                this.OnRTEResult(s);
              });
        }
        public GetDomainCombo(sDomainCodes?: string, IsPGD?: boolean) {
            if(sDomainCodes && IsPGD){
                this.GetDomainCombo1(sDomainCodes,IsPGD);
            }
            else {
                this.GetDomainCombo0();
            }
        }
        OnRTEResult(args: RTEEventargs): void {
            if (String.IsNullOrEmpty(args.Request) || args.Result == null)
                return;
            if (args.Request.Contains(ValueDomain.ReasonforRecord + "," + ValueDomain.ReasonForNotDefer + "," + ValueDomain.ReasonforDiscrepancy + "," + ValueDomain.ReasonforModification)) {
                if (args.Result instanceof Dictionary) {
                    if (this == null) {
                        this.AdministrationDetail = new AdministrationDetailVM();
                    }
                    let objResult: Dictionary<string, List<CListItem>> = <Dictionary<string, List<CListItem>>>args.Result;
                    objResult.forEach( (objDomainDetail)=> {
                        switch (objDomainDetail.Key) {
                            case ValueDomain.ReasonforRecord:
                                {
                                    this.AdministrationDetail.ReasonNotGivens = new ObservableCollection<CListItem>();
                                    this.AdministrationDetail.DisplayOrderforReasonNotGivens = new Dictionary<string, number>();
                                    let displayCount: number = 0;
                                    if (objDomainDetail.Value.Count != null && objDomainDetail.Value.Count > 0) {
                                        (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                            this.AdministrationDetail.ReasonNotGivens.Add(oCListItem);
                                            this.AdministrationDetail.DisplayOrderforReasonNotGivens.Add(oCListItem.DisplayText, displayCount++);
                                        });
                                    }
                                    break;
                                }
                            case ValueDomain.ReasonForNotDefer:
                                {
                                    this.AdministrationDetail.ReasonForNotDefers = new ObservableCollection<CListItem>();
                                    if (objDomainDetail.Value.Count != null && objDomainDetail.Value.Count > 0) {
                                        (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                            this.AdministrationDetail.ReasonForNotDefers.Add(oCListItem);
                                        });
                                    }
                                    break;
                                }
                            case ValueDomain.ReasonforDiscrepancy:
                                {
                                    this.AdministrationDetail.DoseDiscReasonCodes = new ObservableCollection<CListItem>();
                                    if (objDomainDetail.Value.Count != null && objDomainDetail.Value.Count > 0) {
                                        (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                            this.AdministrationDetail.DoseDiscReasonCodes.Add(oCListItem);
                                        });
                                    }
                                    break;
                                }
                            case ValueDomain.ReasonforModification:
                                {
                                    this.AdministrationDetail.AmendReasonCodes = new ObservableCollection<CListItem>();
                                    if (objDomainDetail.Value.Count != null && objDomainDetail.Value.Count > 0) {
                                        (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                            this.AdministrationDetail.AmendReasonCodes.Add(oCListItem);
                                        });
                                    }
                                    break;
                                }
                        }
                    });
                }
            }
            else if (args.Request.Contains(ValueDomain.StrikethruReason)) {
                this.AdministrationDetail.StrikethroughReason = new ObservableCollection<CListItem>();
                (<List<CListItem>>args.Result).forEach( (oCListItem)=> {
                    if (!this.IsPGDItem) {
                        this.AdministrationDetail.StrikethroughReason.Add(oCListItem);
                    }
                    else {
                        if (String.Compare(oCListItem.Value, CConstants.StrikeThruWronSlotSelectedValue, StringComparison.CurrentCultureIgnoreCase) != 0) {
                            this.AdministrationDetail.StrikethroughReason.Add(oCListItem);
                        }
                    }
                });
            }
            else if (args.Request.Contains(ValueDomain.ReasonforRecord)) {
                (<List<CListItem>>args.Result).forEach( (oCListItem)=> {
                    if (String.Compare(oCListItem.Value, this.AdministrationDetail.NotGivenReasonCode, StringComparison.CurrentCultureIgnoreCase) == 0) {
                        this.AdministrationDetail.NotGivenReasonText = oCListItem.DisplayText;
                    }
                });
            }
            else if (args.Request.Contains(ValueDomain.ReasonForNotDefer)) {
                (<List<CListItem>>args.Result).forEach( (oCListItem)=> {
                    if (String.Compare(oCListItem.Value, this.AdministrationDetail.AdministeredReason, StringComparison.CurrentCultureIgnoreCase) == 0) {
                        this.AdministrationDetail.AdminComments = oCListItem.DisplayText;
                    }
                });
            }
        }
        IsPGDItem: boolean = false;
        public GetDomainCombo1(sDomainCodes: string, IsPGD: boolean): void {
            this.IsPGDItem = IsPGD;
            switch (sDomainCodes) {
                case ValueDomain.StrikethruReason:
                    ProcessRTE.GetValuesByDomainCode(sDomainCodes, (s,e) => { this.OnRTEResult(s) });
                    break;
                case ValueDomain.ReasonforRecord:
                    ProcessRTE.GetValuesByDomainCode(sDomainCodes, (s,e) => { this.OnRTEResult(s) });
                    break;
                case "DeferReasonAsComment":
                    ProcessRTE.GetValuesByDomainCode(ValueDomain.ReasonForNotDefer, (s,e) => { this.OnRTEResult(s) });
                    break;
            }
        }
        public IsReasonDoseDisForInfusion: boolean;
        private _MedScanRecadminDetail: MedScanRecAdmVM;
        public get MedScanRecadminDetail(): MedScanRecAdmVM {
            return this._MedScanRecadminDetail;
        }
        public set MedScanRecadminDetail(value: MedScanRecAdmVM) {
            this._MedScanRecadminDetail = value;
            // // NotifyPropertyChanged("MedScanRecadminDetail");
        }
        public IsCustomiseMedScan: boolean;
        public IsMedScanExcluded: boolean;
        public ScanRecMedMultiRoute: MultiRouteType;
    }
    export class AdministrationDetailVM extends ViewModelBase {
        private _MedAdminOID: number;
        private _AdministeredByOID: string;
        private _AdministeredBy: string;
        private _PersonalCarerRelationship: string;
        private _AdministratorType: string;
        private _AdminByPersonalCarerOID: number;
        public _AdministeredByList: ObservableCollection<CListItem>;
        public _ParentCarerList: ObservableCollection<CListItem>;
        public _WitnessByList: ObservableCollection<CListItem>;
        private _OldDose: string;
        private _Dose: string;
        private _strDoseUOM: string;
        private _lnDoseUOMOID: number;
        private _DoseMandatory: boolean;
        private _IsDuringHomeLeave: boolean;
        private _DoseUOM: CListItem;
        private _DoseUOMOID: CListItem;
        private _RouteOID: CListItem;
        private _Route: CListItem;
        private _site: CListItem;
        private _SiteOID: number;
        private _IsHistoryExists: boolean;
        private _ExpiryDate: DateTime;
        private _WitnessBy: string;
        private _AdministeredDate: DateTime= CommonBB.GetServerDateTime();
        private _administeredDateTime: DateTime= CommonBB.GetServerDateTime();
        private CurrentDate: DateTime= CommonBB.GetServerDateTime();
        private _AdministeredDateText: string;
        private _EndDate: DateTime;
        private amendReasonCode: CListItem;
        private _AmendReasonCodes: ObservableCollection<CListItem>;
        private _IsNoWitnessAvialable: boolean;
        private _IsPersonalCarerNotListed: boolean;
        private _WitnessByOID: string;
        private _AdminComments: string;
        private _AdminReasonCode: ObservableCollection<CListItem>;
        private _DoseDiscReasonCodes: ObservableCollection<CListItem>;
        private doseDiscReasonCode: CListItem;
        private _SelectedAdminReasonCode: CListItem;
        private doseUOMs: ObservableCollection<CListItem>;
        private sites: ObservableCollection<CListItem>;
        private reasonNotGivens: ObservableCollection<CListItem>;
        private _displayOrderforReasonNotGivens: Dictionary<string, number>;
        private reasonNotGiven: CListItem;
        private adminByPersonalCarer: CListItem;
        private reason: ObservableCollection<CListItem>;
        private _ReasonForNotDefers: ObservableCollection<CListItem>;
        private reasonForNotDefer: CListItem;
        private batchNo: string;
        private recordedBy: string;
        private recordedByOID: number;
        private recordedAtText: string;
        private reasonforStrikethrough: CListItem;
        private strikethroughReason: ObservableCollection<CListItem>;
        private administeredOnTimeMode: string;
        private _ClinicalIncidentForm: string;
        private _AdministeredTime: string;
        private _WitnessMandatory: boolean;
        private _UserName: string;
        private _PasswordText: string;
        private _PasswordMandShow: Visibility = Visibility.Collapsed;
        private _NotGivenReasonCode: string;
        private _NotGivenReasonText: string;
        private _IsAdminDoseChanged: boolean;
        //public delegate void WitnessUserSelectedDlgt(SelectedUserType _SelectedUserType);
        public OnWitnessUserSelected: Function;
        public _IsSFSValueSetFromOnGetSFSItems: boolean = false;
        private _IsAdministeredInAdvance: boolean;
        private MoreOptionKey: string;
        _IsWardStock: boolean = false;
        private _DoseDiscComments: string;
        private _strDoseUOMLzoID: string;
        private _DoseUOMShow: Visibility = Visibility.Collapsed;
        private _DoseLblShow: Visibility = Visibility.Collapsed;
        public IsAdministeredOnInfusionChart: boolean;
        private _LastAdministeredAt: DateTime;
        public get LastAdministeredAt(): DateTime{
            return this._LastAdministeredAt;
        }
        public set LastAdministeredAt(value: DateTime) {
            if (!Helper.ReferenceEquals(this._LastAdministeredAt, value)) {
                this._LastAdministeredAt = value;
                // // NotifyPropertyChanged("LastAdministeredAt");
            }
        }
        _LastAdministeredBy: string = String.Empty;
        public get LastAdministeredBy(): string {
            return this._LastAdministeredBy;
        }
        public set LastAdministeredBy(value: string) {
            if (this._LastAdministeredBy != value) {
                this._LastAdministeredBy = value;
                // // NotifyPropertyChanged("LastAdministeredBy");
            }
        }
        public get strDoseUOMLzoID(): string {
            return this._strDoseUOMLzoID;
        }
        public set strDoseUOMLzoID(value: string) {
            this._strDoseUOMLzoID = value;
            // super.// NotifyPropertyChanged("strDoseUOMLzoID");
        }
        public get DoseDiscComments(): string {
            return this._DoseDiscComments;
        }
        public set DoseDiscComments(value: string) {
            this._DoseDiscComments = value;
            // super.// NotifyPropertyChanged("DoseDiscComments");
        }
        public get IsWardStock(): boolean {
            return this._IsWardStock;
        }
        public set IsWardStock(value: boolean) {
            this._IsWardStock = value;
            // super.// NotifyPropertyChanged("IsWardStock");
        }
        _IsSupplyRequested: string;
        public get IsSupplyRequested(): string {
            return this._IsSupplyRequested;
        }
        public set IsSupplyRequested(value: string) {
            this._IsSupplyRequested = value;
            // super.// NotifyPropertyChanged("IsSupplyRequested");
        }
        public get DoseUOMs(): ObservableCollection<CListItem> {
            return this.doseUOMs;
        }
        public set DoseUOMs(value: ObservableCollection<CListItem>) {
            this.doseUOMs = value;
            // super.// NotifyPropertyChanged("DoseUOMs");
        }
        public get lstDoseUOM(): CListItem {
            return this._DoseUOM;
        }
        public set lstDoseUOM(value: CListItem) {
            if (!Helper.ReferenceEquals(this._DoseUOM, value)) {
                this._DoseUOM = value;
                // // NotifyPropertyChanged("DoseUOM");
            }
        }
        public get DoseUOMOID(): CListItem {
            return this._DoseUOMOID;
        }
        public set DoseUOMOID(value: CListItem) {
            if (!Helper.ReferenceEquals(this._DoseUOMOID, value)) {
                if (value != null && value.DisplayText == "More") {
                    value.DisplayText = '';
                    this.GetMoreComboOption(CConstants.DoseUOMOptionCode);
                }
                else {
                    this._DoseUOMOID = value;
                    this.lnDoseUOMOID = Convert.ToInt64(this._DoseUOMOID.Value);
                    // // NotifyPropertyChanged("DoseUOMOID");
                }
            }
        }
        public get DoseUOMShow(): Visibility {
            return this._DoseUOMShow;
        }
        public set DoseUOMShow(value: Visibility) {
            if (this._DoseUOMShow != value) {
                this._DoseUOMShow = value;
                // // NotifyPropertyChanged("DoseUOMShow");
            }
        }
        public get DoseLblShow(): Visibility {
            return this._DoseLblShow;
        }
        public set DoseLblShow(value: Visibility) {
            if (this._DoseLblShow != value) {
                this._DoseLblShow = value;
                // // NotifyPropertyChanged("DoseLblShow");
            }
        }
        public get IsAdminDoseChanged(): boolean {
            return this._IsAdminDoseChanged;
        }
        public set IsAdminDoseChanged(value: boolean) {
            if (!Helper.ReferenceEquals(this._IsAdminDoseChanged, value)) {
                this._IsAdminDoseChanged = value;
                // // NotifyPropertyChanged("IsAdminDoseChanged");
            }
        }
        public get IsAdministeredInAdvance(): boolean {
            return this._IsAdministeredInAdvance;
        }
        public set IsAdministeredInAdvance(value: boolean) {
            if (!Helper.ReferenceEquals(this._IsAdministeredInAdvance, value)) {
                this._IsAdministeredInAdvance = value;
                // // NotifyPropertyChanged("IsAdministeredInAdvance");
            }
        }
        public get NotGivenReasonCode(): string {
            return this._NotGivenReasonCode;
        }
        public set NotGivenReasonCode(value: string) {
            if (this._NotGivenReasonCode != value) {
                this._NotGivenReasonCode = value;
                // // NotifyPropertyChanged("NotGivenReasonCode");
            }
        }
        public get NotGivenReasonText(): string {
            return this._NotGivenReasonText;
        }
        public set NotGivenReasonText(value: string) {
            if (this._NotGivenReasonText != value) {
                this._NotGivenReasonText = value;
                // // NotifyPropertyChanged("NotGivenReasonText");
            }
        }
        public get UserName(): string {
            return this._UserName;
        }
        public set UserName(value: string) {
            if (this._UserName != value) {
                this._UserName = value;
                // // NotifyPropertyChanged("UserName");
            }
        }
        public get PasswordText(): string {
            return this._PasswordText;
        }
        public set PasswordText(value: string) {
            if (this._PasswordText != value) {
                this._PasswordText = value;
                // // NotifyPropertyChanged("PasswordText");
            }
        }
        public get PasswordMandShow(): Visibility {
            return this._PasswordMandShow;
        }
        public set PasswordMandShow(value: Visibility) {
            if (this._PasswordMandShow != value) {
                this._PasswordMandShow = value;
                // // NotifyPropertyChanged("PasswordMandShow");
            }
        }
        public get WitnessMandatory(): boolean {
            return this._WitnessMandatory;
        }
        public set WitnessMandatory(value: boolean) {
            if (this._WitnessMandatory != value) {
                this._WitnessMandatory = value;
                // super.// NotifyPropertyChanged("WitnessMandatory");
            }
        }
        public get ClinicalIncidentForm(): string {
            return this._ClinicalIncidentForm;
        }
        public set ClinicalIncidentForm(value: string) {
            if (this._ClinicalIncidentForm != value) {
                this._ClinicalIncidentForm = value;
                // super.// NotifyPropertyChanged("ClinicalIncidentForm");
            }
        }
        public get AdministeredOnTimeMode(): string {
            return this.administeredOnTimeMode;
        }
        public set AdministeredOnTimeMode(value: string) {
            if (this.administeredOnTimeMode != value) {
                this.administeredOnTimeMode = value;
                // super.// NotifyPropertyChanged("AdministeredOnTimeMode");
            }
        }
        public get MedAdminOID(): number {
            return this._MedAdminOID;
        }
        public set MedAdminOID(value: number) {
            if (!Helper.ReferenceEquals(this._MedAdminOID, value)) {
                this._MedAdminOID = value;
                // // NotifyPropertyChanged("MedAdminOID");
            }
        }
        public get AdministeredByOID(): string {
            return this._AdministeredByOID;
        }
        public set AdministeredByOID(value: string) {
            if (String.Compare(this._AdministeredByOID, value) != 0) {
                this._AdministeredByOID = value;
                // // NotifyPropertyChanged("AdministeredByOID");
                if (!String.IsNullOrEmpty(value) && value != "-1" && value != "0" && this.OnWitnessUserSelected != null && this.canLanchUserAuth && !this._IsSFSValueSetFromOnGetSFSItems)
                    this.OnWitnessUserSelected(SelectedUserType.AdministeringUser);
            }
        }
        public get AdministeredByList(): ObservableCollection<CListItem> {
            return this._AdministeredByList;
        }
        public set AdministeredByList(value: ObservableCollection<CListItem>) {
            if (!Helper.ReferenceEquals(this._AdministeredByList, value)) {
                this._AdministeredByList = value;
                // // NotifyPropertyChanged("AdministeredByList");
            }
        }
        public get AdminByPersonalCarerOID(): number {
            return this._AdminByPersonalCarerOID;
        }
        public set AdminByPersonalCarerOID(value: number) {
            if (!Helper.ReferenceEquals(this._AdminByPersonalCarerOID, value)) {
                this._AdminByPersonalCarerOID = value;
                // // NotifyPropertyChanged("AdminByPersonalCarerOID");
            }
        }
        public get AdminByPersonalCarer(): CListItem {
            return this.adminByPersonalCarer;
        }
        public set AdminByPersonalCarer(value: CListItem) {
            if (this.adminByPersonalCarer != value) {
                this.adminByPersonalCarer = value;
                // // NotifyPropertyChanged("AdminByPersonalCarer");
            }
        }
        public get PersonalCarerRelationship(): string {
            return this._PersonalCarerRelationship;
        }
        public set PersonalCarerRelationship(value: string) {
            if (String.Compare(this._PersonalCarerRelationship, value) != 0) {
                this._PersonalCarerRelationship = value;
                // // NotifyPropertyChanged("PersonalCarerRelationship");
            }
        }
        public get AdministratorType(): string {
            return this._AdministratorType;
        }
        public set AdministratorType(value: string) {
            if (String.Compare(this._AdministratorType, value) != 0) {
                this._AdministratorType = value;
                // // NotifyPropertyChanged("AdministratorType");
            }
        }
        public get ParentCarerList(): ObservableCollection<CListItem> {
            return this._ParentCarerList;
        }
        public set ParentCarerList(value: ObservableCollection<CListItem>) {
            if (this._ParentCarerList != value) {
                this._ParentCarerList = value;
                // // NotifyPropertyChanged("ParentCarerList");
            }
        }
        public get WitnessByList(): ObservableCollection<CListItem> {
            return this._WitnessByList;
        }
        public set WitnessByList(value: ObservableCollection<CListItem>) {
            if (!Helper.ReferenceEquals(this._WitnessByList, value)) {
                this._WitnessByList = value;
                // // NotifyPropertyChanged("WitnessByList");
            }
        }
        public get AdministeredBy(): string {
            return this._AdministeredBy;
        }
        public set AdministeredBy(value: string) {
            if (!Helper.ReferenceEquals(this._AdministeredBy, value)) {
                this._AdministeredBy = value;
                // // NotifyPropertyChanged("AdministeredBy");
            }
        }
        private _Recordedat: DateTime= CommonBB.GetServerDateTime();
        public get RecordedAt(): DateTime{
            return this._Recordedat;
        }
        public set RecordedAt(value: DateTime) {
            if (!Helper.ReferenceEquals(this._Recordedat, value)) {
                this._Recordedat = value;
                // // NotifyPropertyChanged("RecordedAt");
            }
        }
        public get OldDose(): string {
            return this._OldDose;
        }
        public set OldDose(value: string) {
            if (!Helper.ReferenceEquals(this._OldDose, value)) {
                this._OldDose = value;
                // // NotifyPropertyChanged("OldDose");
            }
        }
        private _DoseValidationNotRequired: boolean;
        public get DoseValidationNotRequired(): boolean {
            return this._DoseValidationNotRequired;
        }
        public set DoseValidationNotRequired(value: boolean) {
            this._DoseValidationNotRequired = value;
        }
        public get Dose(): string {
            return this._Dose;
        }
        public set Dose(value: string) {
            if (!Helper.ReferenceEquals(this._Dose, value)) {
                if (!this.DoseValidationNotRequired) {
                    this.OldDose = this._Dose;
                    let objRegDigits: RegExp = new RegExp("^([0-9]{1,7})$");
                    let objRegDecimals: RegExp = new RegExp("^([0-9]{1,7})(\.[0-9]{1,3})$");
                    let objRegDecimalsAlone: RegExp = new RegExp("^(\.[0-9]{1,3})$");
                    if (objRegDigits.test(value) || objRegDecimals.test(value) || objRegDecimalsAlone.test(value)) {
                        this._Dose = value;
                    }
                    else {
                        this._Dose = String.Empty;
                    }
                    // // NotifyPropertyChanged("Dose");
                }
                else {
                    this._Dose = value;
                    // // NotifyPropertyChanged("Dose");
                }
            }
        }
        public get DoseMandatory(): boolean {
            return this._DoseMandatory;
        }
        public set DoseMandatory(value: boolean) {
            if (!Helper.ReferenceEquals(this._DoseMandatory, value)) {
                this._DoseMandatory = value;
                // // NotifyPropertyChanged("DoseMandatory");
            }
        }
        public get strDoseUOM(): string {
            return this._strDoseUOM;
        }
        public set strDoseUOM(value: string) {
            if (!Helper.ReferenceEquals(this._strDoseUOM, value)) {
                this._strDoseUOM = value;
                // // NotifyPropertyChanged("strDoseUOM");
            }
        }
        public get IsDuringHomeLeave(): boolean {
            return this._IsDuringHomeLeave;
        }
        public set IsDuringHomeLeave(value: boolean) {
            if (!Helper.ReferenceEquals(this._IsDuringHomeLeave, value)) {
                this._IsDuringHomeLeave = value;
                // // NotifyPropertyChanged("IsDuringHomeLeave");
            }
        }
        public get lnDoseUOMOID(): number {
            return this._lnDoseUOMOID;
        }
        public set lnDoseUOMOID(value: number) {
            if (!Helper.ReferenceEquals(this._lnDoseUOMOID, value)) {
                this._lnDoseUOMOID = value;
                // // NotifyPropertyChanged("lnDoseUOMOID");
            }
        }
        public get Route(): CListItem {
            return this._Route;
        }
        public set Route(value: CListItem) {
            if (!Helper.ReferenceEquals(this._Route, value)) {
                this._Route = value;
                // // NotifyPropertyChanged("Route");
            }
        }
        public get RouteOID(): CListItem {
            return this._RouteOID;
        }
        public set RouteOID(value: CListItem) {
            if (!Helper.ReferenceEquals(this._RouteOID, value)) {
                this._RouteOID = value;
                // // NotifyPropertyChanged("RouteOID");
            }
        }
        public get Sites(): ObservableCollection<CListItem> {
            return this.sites;
        }
        public set Sites(value: ObservableCollection<CListItem>) {
            if (this.sites != value) {
                this.sites = value;
                // super.// NotifyPropertyChanged("Sites");
            }
        }
        public get Site(): CListItem {
            return this._site;
        }
        public set Site(value: CListItem) {
            if (value != null && value.DisplayText == "More") {
                this.GetMoreComboOption(CConstants.SiteOptionCode);
            }
            else {
                this._site = value;
                // super.// NotifyPropertyChanged("Site");
            }
        }
        public identifyingOID: number;
        public identifyingType: string;
        private _Wastage: string;
        public get Wastage(): string {
            return this._Wastage;
        }
        public set Wastage(value: string) {
            if (!Helper.ReferenceEquals(this._Wastage, value)) {
                this._Wastage = value;
                // // NotifyPropertyChanged("Wastage");
            }
        }
        private GetMoreComboOption(MoreOptionCode: string): void {
            this.MoreOptionKey = MoreOptionCode;
            let objService: ManagePrescriptionWSSoapClient = new ManagePrescriptionWSSoapClient();
            objService.GetAllOptionsCompleted  = (s,e) => { this.objService_GetAllOptionsCompleted(s,e); } ;
            let objAllRequest: CReqMsgGetAllOptions = new CReqMsgGetAllOptions();
            objAllRequest.IdentifyingOIDBC = this.identifyingOID;
            objAllRequest.IdentifyingTypeBC = this.identifyingType;
            switch (this.MoreOptionKey) {
                case CConstants.ConcentrationDoseUOM:
                    objAllRequest.sOptionCodeBC = CConstants.DoseUOMOptionCode;
                    break;
                case CConstants.SiteOptionCode:
                    objAllRequest.sOptionCodeBC = CConstants.SiteOptionCode;
                    break;
                case CConstants.DoseUOMOptionCode:
                    objAllRequest.sOptionCodeBC = CConstants.DoseUOMOptionCode;
                    break;
            }
            objAllRequest.MCVersionNoBC = AppSessionInfo.AMCV;
            objAllRequest.oContextInformation = Common.FillContext();
            objService.GetAllOptionsAsync(objAllRequest);
        }
        objService_GetAllOptionsCompleted(sender: Object, e: GetAllOptionsCompletedEventArgs): void {
            let _ErrorID: number = 80000087;
            let _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:MedicationChartVM, Method:objService_GetAllOptionsCompleted()";
            if (e.Error == null) {
                try {
                    let objResponse: CResMsgGetAllOptions = e.Result;
                    if (objResponse != null && objResponse.oValues != null && objResponse.oValues.Count > 0) {
                        switch (this.MoreOptionKey) {
                            case CConstants.SiteOptionCode:
                                this.Sites.Clear();
                                for (let i: number = 0; i < objResponse.oValues.Count; i++) {
                                    if (!String.IsNullOrEmpty(objResponse.oValues[i].Name)) {
                                        this.Sites.Add(ObjectHelper.CreateObject(new CListItem(), {
                                            DisplayText: objResponse.oValues[i].Name,
                                            Value: objResponse.oValues[i].Code.ToString()
                                        }));
                                    }
                                }
                                break;
                            case CConstants.ConcentrationDoseUOM:
                                this.ConcentrationStrengthUOMs = new ObservableCollection<CListItem>();
                                for (let i: number = 0; i < objResponse.oValues.Count; i++) {
                                    if (!String.IsNullOrEmpty(objResponse.oValues[i].Name) && !String.Equals(objResponse.oValues[i].SealImageList, CConstants.CompositeUOM)) {
                                        this.ConcentrationStrengthUOMs.Add(ObjectHelper.CreateObject(new CListItem(), {
                                            DisplayText: objResponse.oValues[i].Name,
                                            Value: objResponse.oValues[i].Code.ToString()
                                        }));
                                    }
                                }
                                break;
                            case CConstants.DoseUOMOptionCode:
                                this.DoseUOMs = new ObservableCollection<CListItem>();
                                for (let i: number = 0; i < objResponse.oValues.Count; i++) {
                                    if (!String.IsNullOrEmpty(objResponse.oValues[i].Name)) {
                                        this.DoseUOMs.Add(ObjectHelper.CreateObject(new CListItem(), {
                                            DisplayText: objResponse.oValues[i].Name,
                                            Value: objResponse.oValues[i].Code.ToString()
                                        }));
                                    }
                                }
                                break;
                        }
                    }
                }
               catch(ex:any)  {
                    let lnReturn: number =  AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number =  AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
        }
        public get SiteOID(): number {
            return this._SiteOID;
        }
        public set SiteOID(value: number) {
            if (!Helper.ReferenceEquals(this._SiteOID, value)) {
                this._SiteOID = value;
                // // NotifyPropertyChanged("SiteOID");
            }
        }
        public get ExpiryDate(): DateTime{
            return this._ExpiryDate;
        }
        public set ExpiryDate(value: DateTime) {
            if (!Helper.ReferenceEquals(this._ExpiryDate, value)) {
                if (value == DateTime.MinValue || value.Date >= CommonBB.GetServerDateTime().Date) {
                    this._ExpiryDate = value;
                }
                if ((this._ExpiryDate != null && this._ExpiryDate != DateTime.MinValue) || !String.IsNullOrEmpty(this.BatchNo)) {
                    this.IsScanrecadminlinkenabled = false;
                }
                else {
                    this.IsScanrecadminlinkenabled = true;
                }
                // // NotifyPropertyChanged("ExpiryDate");
            }
        }
        private _slotdate: DateTime= CommonBB.GetServerDateTime();
        public get SlotDate(): DateTime{
            return this._slotdate;
        }
        public set SlotDate(value: DateTime) {
            if (!Helper.ReferenceEquals(this._slotdate, value)) {
                this._slotdate = value;
                // // NotifyPropertyChanged("SlotDate");
            }
        }
        public get AdministeredDate(): DateTime{
            return this._AdministeredDate;
        }
        public set AdministeredDate(value: DateTime) {
            if (!Helper.ReferenceEquals(this._AdministeredDate, value)) {
                this._AdministeredDate = value;
                if (value != DateTime.MinValue) {
                    if (this.AdministeredDateTime != DateTime.MinValue) {
                        this.AdministeredDateTime = value.DateTime.AddTime(this.AdministeredDateTime);
                    }
                    else {
                        this.AdministeredDateTime = value.Date;
                    }
                }
                // // NotifyPropertyChanged("AdministeredDate");
            }
        }
        public get AdministeredDateTime(): DateTime{
            return this._administeredDateTime;
        }
        public set AdministeredDateTime(value: DateTime) {
            if (!Helper.ReferenceEquals(this._administeredDateTime, value)) {
                if ((value > this.CurrentDate) && (value.Date.ToString() == this.CurrentDate.Date.ToString()))
                    this._administeredDateTime = this.AdministeredDate.DateTime.AddTime(this.CurrentDate);
                else if (value != DateTime.MinValue)
                    this._administeredDateTime = this.AdministeredDate.DateTime.AddTime(value);
                else this._administeredDateTime = value;
                // // NotifyPropertyChanged("AdministeredDateTime");
            }
        }
        public get AdministeredDateText(): string {
            return this._AdministeredDateText;
        }
        public set AdministeredDateText(value: string) {
            if (!Helper.ReferenceEquals(this._AdministeredDateText, value)) {
                this._AdministeredDateText = value;
                // // NotifyPropertyChanged("AdministeredDateText");
            }
        }
        private _AdministeredTimeSpan: TimeSpan;
        public get AdministeredTime(): string {
            if (!String.IsNullOrEmpty(this._AdministeredTime)) {
                return this._AdministeredTime;
            }
            else {
                return (this._AdministeredTimeSpan.Hours.ToString("00") + ":" + this._AdministeredTimeSpan.Minutes.ToString("00"));
            }
        }
        public set AdministeredTime(value: string) {
            if (!String.IsNullOrEmpty(value)) {
                let d: DateTime= DateTime.Parse(value);
                if (d.TimeOfDay != this._AdministeredTimeSpan) {
                    this._AdministeredTimeSpan = d.TimeOfDay;
                    this._AdministeredTime = String.Empty;
                    // // NotifyPropertyChanged("AdministeredTime");
                }
            }
            else {
                if (!Helper.ReferenceEquals(this.AdministeredTime, value)) {
                    this.AdministeredTime = value;
                    // // NotifyPropertyChanged("AdministeredTime");
                }
            }
        }
        public get IsNoWitnessAvialable(): boolean {
            return this._IsNoWitnessAvialable;
        }
        public set IsNoWitnessAvialable(value: boolean) {
            if (!Helper.ReferenceEquals(this._IsNoWitnessAvialable, value)) {
                this._IsNoWitnessAvialable = value;
                // // NotifyPropertyChanged("IsNoWitnessAvialable");
            }
        }
        public canLanchUserAuth: boolean = true;
        public get WitnessByOID(): string {
            return this._WitnessByOID;
        }
        public set WitnessByOID(value: string) {
            if (String.Compare(this._WitnessByOID, value, StringComparison.InvariantCultureIgnoreCase) != 0) {
                this._WitnessByOID = value;
                if (!String.IsNullOrEmpty(value) && value != "-1" && value != "0" && this.OnWitnessUserSelected != null && this.canLanchUserAuth && !this._IsSFSValueSetFromOnGetSFSItems)
                    this.OnWitnessUserSelected(SelectedUserType.WitnessingUser);
                // // NotifyPropertyChanged("WitnessByOID");
            }
        }
        public get WitnessBy(): string {
            return this._WitnessBy;
        }
        public set WitnessBy(value: string) {
            if (!Helper.ReferenceEquals(this._WitnessBy, value)) {
                this._WitnessBy = value;
                // // NotifyPropertyChanged("WitnessBy");
            }
        }
        public get AdminComments(): string {
            return this._AdminComments;
        }
        public set AdminComments(value: string) {
            if (!Helper.ReferenceEquals(this._AdminComments, value)) {
                this._AdminComments = value;
                // // NotifyPropertyChanged("AdminComments");
            }
        }
        public get AmendReasonCode(): CListItem {
            return this.amendReasonCode;
        }
        public set AmendReasonCode(value: CListItem) {
            if (!Helper.ReferenceEquals(this.amendReasonCode, value)) {
                this.amendReasonCode = value;
                // // NotifyPropertyChanged("AmendReasonCode");
            }
        }
        public get AdminReasonCode(): ObservableCollection<CListItem> {
            return this._AdminReasonCode;
        }
        public set AdminReasonCode(value: ObservableCollection<CListItem>) {
            if (!Helper.ReferenceEquals(this._AdminReasonCode, value)) {
                this._AdminReasonCode = value;
                // // NotifyPropertyChanged("AdminReasonCode");
            }
        }
        public get DoseDiscReasonCodes(): ObservableCollection<CListItem> {
            return this._DoseDiscReasonCodes;
        }
        public set DoseDiscReasonCodes(value: ObservableCollection<CListItem>) {
            if (!Helper.ReferenceEquals(this._DoseDiscReasonCodes, value)) {
                this._DoseDiscReasonCodes = value;
                // // NotifyPropertyChanged("DoseDiscReasonCodes");
            }
        }
        public get AmendReasonCodes(): ObservableCollection<CListItem> {
            return this._AmendReasonCodes;
        }
        public set AmendReasonCodes(value: ObservableCollection<CListItem>) {
            if (!Helper.ReferenceEquals(this._AmendReasonCodes, value)) {
                this._AmendReasonCodes = value;
                // NotifyPropertyChanged("AmendReasonCodes");
            }
        }
        public get IsHistoryExists(): boolean {
            return this._IsHistoryExists;
        }
        public set IsHistoryExists(value: boolean) {
            if (!Helper.ReferenceEquals(this._IsHistoryExists, value)) {
                this._IsHistoryExists = value;
                // // NotifyPropertyChanged("IsHistoryExists");
            }
        }
        public get ReasonNotGiven(): CListItem {
            return this.reasonNotGiven;
        }
        public set ReasonNotGiven(value: CListItem) {
            if (!Helper.ReferenceEquals(this.reasonNotGiven, value)) {
                this.reasonNotGiven = value;
                // NotifyPropertyChanged("ReasonNotGiven");
            }
        }
        public get ReasonNotGivens(): ObservableCollection<CListItem> {
            return this.reasonNotGivens;
        }
        public set ReasonNotGivens(value: ObservableCollection<CListItem>) {
            if (this.reasonNotGivens != value) {
                this.reasonNotGivens = value;
                // NotifyPropertyChanged("ReasonNotGivens");
            }
        }
        public get DisplayOrderforReasonNotGivens(): Dictionary<string, number> {
            return this._displayOrderforReasonNotGivens;
        }
        public set DisplayOrderforReasonNotGivens(value: Dictionary<string, number>) {
            if (this._displayOrderforReasonNotGivens != value) {
                this._displayOrderforReasonNotGivens = value;
            }
        }
        public get Reason(): ObservableCollection<CListItem> {
            return this.reason;
        }
        public set Reason(value: ObservableCollection<CListItem>) {
            if (this.reason != value) {
                this.reason = value;
                // NotifyPropertyChanged("Reason");
            }
        }
        public get BatchNo(): string {
            return this.batchNo;
        }
        public set BatchNo(value: string) {
            if (this.batchNo != value) {
                this.batchNo = value;
                if (!String.IsNullOrEmpty(this.batchNo) || (this.ExpiryDate != null && this.ExpiryDate != DateTime.MinValue)) {
                    this.IsScanrecadminlinkenabled = false;
                }
                else {
                    this.IsScanrecadminlinkenabled = true;
                }
                // NotifyPropertyChanged("BatchNo");
            }
        }
        public get DoseDiscReasonCode(): CListItem {
            return this.doseDiscReasonCode;
        }
        public set DoseDiscReasonCode(value: CListItem) {
            if (this.doseDiscReasonCode != value) {
                this.doseDiscReasonCode = value;
                // NotifyPropertyChanged("DoseDiscReasonCode");
            }
        }
        public get SelectedAdminReasonCode(): CListItem {
            return this._SelectedAdminReasonCode;
        }
        public set SelectedAdminReasonCode(value: CListItem) {
            if (this._SelectedAdminReasonCode != value) {
                this._SelectedAdminReasonCode = value;
                // NotifyPropertyChanged("SelectedAdminReasonCode");
            }
        }
        public get ReasonForNotDefers(): ObservableCollection<CListItem> {
            return this._ReasonForNotDefers;
        }
        public set ReasonForNotDefers(value: ObservableCollection<CListItem>) {
            if (this._ReasonForNotDefers != value) {
                this._ReasonForNotDefers = value;
                // NotifyPropertyChanged("ReasonForNotDefers");
            }
        }
        public get ReasonForNotDefer(): CListItem {
            return this.reasonForNotDefer;
        }
        public set ReasonForNotDefer(value: CListItem) {
            if (this.reasonForNotDefer != value) {
                this.reasonForNotDefer = value;
                // NotifyPropertyChanged("ReasonForNotDefer");
            }
        }
        public get RecordedBy(): string {
            return this.recordedBy;
        }
        public set RecordedBy(value: string) {
            if (!Helper.ReferenceEquals(this.recordedBy, value)) {
                this.recordedBy = value;
                // NotifyPropertyChanged("RecordedBy");
            }
        }
        public get RecordedByOID(): number {
            return this.recordedByOID;
        }
        public set RecordedByOID(value: number) {
            if (!Helper.ReferenceEquals(this.recordedByOID, value)) {
                this.recordedByOID = value;
                // NotifyPropertyChanged("RecordedByOID");
            }
        }
        public get RecordedAtText(): string {
            return this.recordedAtText;
        }
        public set RecordedAtText(value: string) {
            if (!Helper.ReferenceEquals(this.recordedAtText, value)) {
                this.recordedAtText = value;
                // NotifyPropertyChanged("RecordedAtText");
            }
        }
        public get ReasonforStrikethrough(): CListItem {
            return this.reasonforStrikethrough;
        }
        public set ReasonforStrikethrough(value: CListItem) {
            if (!Helper.ReferenceEquals(this.reasonforStrikethrough, value)) {
                this.reasonforStrikethrough = value;
                // NotifyPropertyChanged("ReasonforStrikethrough");
            }
        }
        public get StrikethroughReason(): ObservableCollection<CListItem> {
            return this.strikethroughReason;
        }
        public set StrikethroughReason(value: ObservableCollection<CListItem>) {
            if (!Helper.ReferenceEquals(this.strikethroughReason, value)) {
                this.strikethroughReason = value;
                // NotifyPropertyChanged("StrikethroughReason");
            }
        }
        public AdministeredReason: string;
        public AdministeredAction: string;
        private _ConcentrationStrength: any;
        public get ConcentrationStrength(): any {
            return this._ConcentrationStrength;
        }
        public set ConcentrationStrength(value: any) {
            if (this._ConcentrationStrength != value) {
                this._ConcentrationStrength = value;
                // NotifyPropertyChanged("ConcentrationStrength");
            }
        }
        private _ConcentrationStrengthUOM: CListItem;
        public get ConcentrationStrengthUOM(): CListItem {
            return this._ConcentrationStrengthUOM;
        }
        public set ConcentrationStrengthUOM(value: CListItem) {
            if (!Helper.ReferenceEquals(this._ConcentrationStrengthUOM, value)) {
                if (value != null && value.Value != null && value.Value == "CC_More") {
                    this.GetMoreComboOption(CConstants.ConcentrationDoseUOM);
                }
                this._ConcentrationStrengthUOM = value;
                // NotifyPropertyChanged("ConcentrationStrengthUOM");
            }
        }
        private _ConcentrationVolume: any;
        public get ConcentrationVolume(): any {
            return this._ConcentrationVolume;
        }
        public set ConcentrationVolume(value: any) {
            if (this._ConcentrationVolume != value) {
                this._ConcentrationVolume = value;
                // NotifyPropertyChanged("ConcentrationVolume");
            }
        }
        private _ConcentrationVolumeUOM: CListItem;
        public get ConcentrationVolumeUOM(): CListItem {
            return this._ConcentrationVolumeUOM;
        }
        public set ConcentrationVolumeUOM(value: CListItem) {
            if (!Helper.ReferenceEquals(this._ConcentrationVolumeUOM, value)) {
                this._ConcentrationVolumeUOM = value;
                // NotifyPropertyChanged("ConcentrationVolumeUOM");
            }
        }
        private _InfusionPeriodforMedAdmin: string;
        public get InfusionPeriodforMedAdmin(): string {
            return this._InfusionPeriodforMedAdmin;
        }
        public set InfusionPeriodforMedAdmin(value: string) {
            if (this._InfusionPeriodforMedAdmin != value) {
                this._InfusionPeriodforMedAdmin = value;
                // NotifyPropertyChanged("InfusionPeriodforMedAdmin");
            }
        }
        private _InfusionPeriodUOMforMedAdmin: CListItem;
        public get InfusionPeriodUOMforMedAdmin(): CListItem {
            return this._InfusionPeriodUOMforMedAdmin;
        }
        public set InfusionPeriodUOMforMedAdmin(value: CListItem) {
            if (!Helper.ReferenceEquals(this._InfusionPeriodUOMforMedAdmin, value)) {
                this._InfusionPeriodUOMforMedAdmin = value;
                // NotifyPropertyChanged("InfusionPeriodUOMforMedAdmin");
            }
        }
        private _ConcentrationVolumeUOMs: ObservableCollection<CListItem>;
        public get ConcentrationVolumeUOMs(): ObservableCollection<CListItem> {
            return this._ConcentrationVolumeUOMs;
        }
        public set ConcentrationVolumeUOMs(value: ObservableCollection<CListItem>) {
            this._ConcentrationVolumeUOMs = value;
        }
        private _ConcentrationStrengthUOMs: ObservableCollection<CListItem>;
        public get ConcentrationStrengthUOMs(): ObservableCollection<CListItem> {
            return this._ConcentrationStrengthUOMs;
        }
        public set ConcentrationStrengthUOMs(value: ObservableCollection<CListItem>) {
            this._ConcentrationStrengthUOMs = value;
        }
        private _InfusionPeriodUOMs: ObservableCollection<CListItem>;
        public get InfusionPeriodUOMs(): ObservableCollection<CListItem> {
            return this._InfusionPeriodUOMs;
        }
        public set InfusionPeriodUOMs(value: ObservableCollection<CListItem>) {
            this._InfusionPeriodUOMs = value;
        }
        public get IsPersonalCarerNotListed(): boolean {
            return this._IsPersonalCarerNotListed;
        }
        public set IsPersonalCarerNotListed(value: boolean) {
            if (!Helper.ReferenceEquals(this._IsPersonalCarerNotListed, value)) {
                this._IsPersonalCarerNotListed = value;
                // NotifyPropertyChanged("IsPersonalCarerNotListed");
            }
        }
        private _IsCriticalMedField: boolean;
        public get IsCriticalMed(): boolean {
            return this._IsCriticalMedField;
        }
        public set IsCriticalMed(value: boolean) {
            if (!Helper.ReferenceEquals(this._IsCriticalMedField, value)) {
                this._IsCriticalMedField = value;
                // NotifyPropertyChanged("IsCriticalMed");
            }
        }
        private _CriticalMedsRoutes: string;
        public get CriticalMedsRoutes(): string {
            return this._CriticalMedsRoutes;
        }
        public set CriticalMedsRoutes(value: string) {
            if (this._CriticalMedsRoutes != value) {
                this._CriticalMedsRoutes = value;
                // NotifyPropertyChanged("CriticalMedsRoutes");
            }
        }
        private _CriticalMedsMsg: string;
        public get CriticalMedsMsg(): string {
            return this._CriticalMedsMsg;
        }
        public set CriticalMedsMsg(value: string) {
            if (this._CriticalMedsMsg != value) {
                this._CriticalMedsMsg = value;
                // NotifyPropertyChanged("CriticalMedsMsg");
            }
        }
        private _CriticalMedsURL: string;
        public get CriticalMedsURL(): string {
            return this._CriticalMedsURL;
        }
        public set CriticalMedsURL(value: string) {
            if (this._CriticalMedsURL != value) {
                this._CriticalMedsURL = value;
                // NotifyPropertyChanged("CriticalMedsURL");
            }
        }
        private _IsDoseCalculatedByDC: boolean;
        public get IsDoseCalculatedByDC(): boolean {
            return this._IsDoseCalculatedByDC;
        }
        public set IsDoseCalculatedByDC(value: boolean) {
            if (!Helper.ReferenceEquals(this._IsDoseCalculatedByDC, value)) {
                this._IsDoseCalculatedByDC = value;
                // NotifyPropertyChanged("IsDoseCalculatedByDC");
            }
        }
        private _PIsWitnessByMandatory: boolean;
        public get PIsWitnessByMandatory(): boolean {
            return this._PIsWitnessByMandatory;
        }
        public set PIsWitnessByMandatory(value: boolean) {
            this._PIsWitnessByMandatory = value;
        }
        private _IsMedScanReadonly: boolean;
        public get IsMedScanReadonly(): boolean {
            return this._IsMedScanReadonly;
        }
        public set IsMedScanReadonly(value: boolean) {
            this._IsMedScanReadonly = value;
        }
        private _MedScannedHistoryOID: number;
        public get MedScannedHistoryOID(): number {
            return this._MedScannedHistoryOID;
        }
        public set MedScannedHistoryOID(value: number) {
            this._MedScannedHistoryOID = value;
        }
        private _IsScanrecadminlinkenabled: boolean = true;
        public get IsScanrecadminlinkenabled(): boolean {
            return this._IsScanrecadminlinkenabled;
        }
        public set IsScanrecadminlinkenabled(value: boolean) {
            if (this._IsScanrecadminlinkenabled != value) {
                this._IsScanrecadminlinkenabled = value;
                // NotifyPropertyChanged("IsScanrecadminlinkenabled");
            }
        }
        private _IsBatchenabled: boolean = true;
        public get IsBatchenabled(): boolean {
            return this._IsBatchenabled;
        }
        public set IsBatchenabled(value: boolean) {
            this._IsBatchenabled = value;
            // NotifyPropertyChanged("IsBatchenabled");
        }
        private _IsExpiryenabled: boolean = true;
        public get IsExpiryenabled(): boolean {
            return this._IsExpiryenabled;
        }
        public set IsExpiryenabled(value: boolean) {
            this._IsExpiryenabled = value;
            // NotifyPropertyChanged("IsExpiryenabled");
        }
    }
    export class SteppedVariableDoseInfoVM extends ViewModelBase {
        private _Frequency: string;
        public get Frequency(): string {
            return this._Frequency;
        }
        public set Frequency(value: string) {
            if (!Helper.ReferenceEquals(this._Frequency, value)) {
                this._Frequency = value;
                // NotifyPropertyChanged("Frequency");
            }
        }
        private _StartDate: DateTime;
        public get StartDate(): DateTime{
            return this._StartDate;
        }
        public set StartDate(value: DateTime) {
            if (!Helper.ReferenceEquals(this._StartDate, value)) {
                this._StartDate = value;
                // NotifyPropertyChanged("StartDate");
            }
        }
        private _EndDate: DateTime;
        public get EndDate(): DateTime{
            return this._EndDate;
        }
        public set EndDate(value: DateTime) {
            if (!Helper.ReferenceEquals(this._EndDate, value)) {
                this._EndDate = value;
                // NotifyPropertyChanged("EndDate");
            }
        }
        private _Dose: string;
        public get Dose(): string {
            return this._Dose;
        }
        public set Dose(value: string) {
            if (!Helper.ReferenceEquals(this._Dose, value)) {
                this._Dose = value;
                // NotifyPropertyChanged("Dose");
            }
        }
        private _DoseUOM: string;
        public get DoseUOM(): string {
            return this._DoseUOM;
        }
        public set DoseUOM(value: string) {
            if (!Helper.ReferenceEquals(this._DoseUOM, value)) {
                this._DoseUOM = value;
                // NotifyPropertyChanged("DoseUOM");
            }
        }
        private _DoseScheduleType: string;
        public get DoseScheduleType(): string {
            return this._DoseScheduleType;
        }
        public set DoseScheduleType(value: string) {
            if (!Helper.ReferenceEquals(this._DoseScheduleType, value)) {
                this._DoseScheduleType = value;
                // NotifyPropertyChanged("DoseScheduleType");
            }
        }
        private _DoseSchedule: ObservableCollection<DoseScheduleVM>;
        public get DoseSchedule(): ObservableCollection<DoseScheduleVM> {
            return this._DoseSchedule;
        }
        public set DoseSchedule(value: ObservableCollection<DoseScheduleVM>) {
            this._DoseSchedule = value;
            // NotifyPropertyChanged("DoseSchedule");
        }
    }
    export class DoseScheduleVM extends ViewModelBase {
        private _ScheduleDTTM: DateTime;
        public get ScheduleDTTM(): DateTime{
            return this._ScheduleDTTM;
        }
        public set ScheduleDTTM(value: DateTime) {
            if (!Helper.ReferenceEquals(this._ScheduleDTTM, value)) {
                this._ScheduleDTTM = value;
                // NotifyPropertyChanged("ScheduleDTTM");
            }
        }
        private _Dose: string;
        public get Dose(): string {
            return this._Dose;
        }
        public set Dose(value: string) {
            if (!Helper.ReferenceEquals(this._Dose, value)) {
                this._Dose = value;
                // NotifyPropertyChanged("Dose");
            }
        }
        private _DoseUOM: string;
        public get DoseUOM(): string {
            return this._DoseUOM;
        }
        public set DoseUOM(value: string) {
            if (!Helper.ReferenceEquals(this._DoseUOM, value)) {
                this._DoseUOM = value;
                // NotifyPropertyChanged("DoseUOM");
            }
        }
    }
    export class OverViewChartData extends ViewModelBase {
        private medChartOID: number = 0;
        private chartStatus: string = String.Empty;
        private activeFrom: DateTime;
        private activeTo: DateTime;
        private validateDate: DateTime;
        private sortByValue: CListItem;
        private sortByStatus: ObservableCollection<CListItem>;
        private isDiscontinueChecked: boolean = true;
        private isCancelChecked: boolean = false;
        public Encounters: ObservableCollection<Encounter>;
        private minDateValue: DateTime= DateTime.MinValue;
        private maxDateValue: DateTime= DateTime.MaxValue;
        private _SortRangeStartDate: DateTime;
        public get SortRangeStartDate(): DateTime{
            return this._SortRangeStartDate;
        }
        public set SortRangeStartDate(value: DateTime) {
            if (!Helper.ReferenceEquals(this._SortRangeStartDate, value)) {
                this._SortRangeStartDate = value;
                // NotifyPropertyChanged("SortRangeStartDate");
            }
        }
        private _SortRangeEndDate: DateTime;
        public get SortRangeEndDate(): DateTime{
            return this._SortRangeEndDate;
        }
        public set SortRangeEndDate(value: DateTime) {
            if (!Helper.ReferenceEquals(this._SortRangeEndDate, value)) {
                this._SortRangeEndDate = value;
                // NotifyPropertyChanged("SortRangeEndDate");
            }
        }
        private encMainID: string = String.Empty;
        public get EncMainID(): string {
            return this.encMainID;
        }
        public set EncMainID(value: string) {
            if (!Helper.ReferenceEquals(this.encMainID, value)) {
                if (value != this.encMainID) {
                    this.encMainID = value;
                    // NotifyPropertyChanged("EncMainID");
                }
            }
        }
        private encType: string = String.Empty;
        public get EncType(): string {
            return this.encType;
        }
        public set EncType(value: string) {
            if (!Helper.ReferenceEquals(this.encType, value)) {
                if (value != this.encType) {
                    this.encType = value;
                    // NotifyPropertyChanged("EncType");
                }
            }
        }
        private encounterOID: number = 0;
        public get EncounterOID(): number {
            return this.encounterOID;
        }
        public set EncounterOID(value: number) {
            if (!Helper.ReferenceEquals(this.encounterOID, value)) {
                if (value != this.encounterOID) {
                    this.encounterOID = value;
                    // NotifyPropertyChanged("EncounterOID");
                }
            }
        }
        private medChartPatOID: number = 0;
        public get MedChartPatOID(): number {
            return this.medChartPatOID;
        }
        public set MedChartPatOID(value: number) {
            if (!Helper.ReferenceEquals(this.medChartPatOID, value)) {
                if (value != this.medChartPatOID) {
                    this.medChartPatOID = value;
                    // NotifyPropertyChanged("MedChartPatOID");
                }
            }
        }
        private medChartserviceOID: number = 0;
        public get MedChartServiceOID(): number {
            return this.medChartserviceOID;
        }
        public set MedChartServiceOID(value: number) {
            if (!Helper.ReferenceEquals(this.medChartserviceOID, value)) {
                if (value != this.medChartserviceOID) {
                    this.medChartserviceOID = value;
                    // NotifyPropertyChanged("MedChartServiceOID");
                }
            }
        }
        private isCurrentEncounterSelected: boolean = false;
        public get IsCurrentEncounterSelected(): boolean {
            return this.isCurrentEncounterSelected;
        }
        public set IsCurrentEncounterSelected(value: boolean) {
            if (!Helper.ReferenceEquals(this.isCurrentEncounterSelected, value)) {
                if (value != this.isCurrentEncounterSelected) {
                    this.isCurrentEncounterSelected = value;
                    // NotifyPropertyChanged("IsCurrentEncounterSelected");
                }
            }
        }
        public get MinDateValue(): DateTime{
            return this.minDateValue;
        }
        public set MinDateValue(value: DateTime) {
            if (!Helper.ReferenceEquals(this.minDateValue, value)) {
                if (value != this.minDateValue) {
                    this.minDateValue = value;
                    // NotifyPropertyChanged("MinDateValue");
                }
            }
        }
        public get MaxDateValue(): DateTime{
            return this.maxDateValue;
        }
        public set MaxDateValue(value: DateTime) {
            if (!Helper.ReferenceEquals(this.maxDateValue, value)) {
                if (value != this.maxDateValue) {
                    this.maxDateValue = value;
                    // NotifyPropertyChanged("MaxDateValue");
                }
            }
        }
        public get MedChartOID(): number {
            return this.medChartOID;
        }
        public set MedChartOID(value: number) {
            if (!Helper.ReferenceEquals(this.medChartOID, value)) {
                if (value != this.medChartOID) {
                    this.medChartOID = value;
                    // NotifyPropertyChanged("MedChartOID");
                }
            }
        }
        public get ChartStatus(): string {
            return this.chartStatus;
        }
        public set ChartStatus(value: string) {
            if (!Helper.ReferenceEquals(this.chartStatus, value)) {
                if (value != this.chartStatus) {
                    this.chartStatus = value;
                    // // NotifyPropertyChanged("ChartStatus");
                }
            }
        }
        public get ActiveFrom(): DateTime{
            return this.activeFrom;
        }
        public set ActiveFrom(value: DateTime) {
            if (!Helper.ReferenceEquals(this.activeFrom, value)) {
                if (value != this.activeFrom) {
                    this.activeFrom = value;
                    // NotifyPropertyChanged("ActiveFrom");
                }
            }
        }
        public get ValidateDate(): DateTime{
            return this.validateDate;
        }
        public set ValidateDate(value: DateTime) {
            if (!Helper.ReferenceEquals(this.validateDate, value)) {
                this.validateDate = value;
                // NotifyPropertyChanged("ValidateDate");
            }
        }
        public get ActiveTo(): DateTime{
            return this.activeTo;
        }
        public set ActiveTo(value: DateTime) {
            if (!Helper.ReferenceEquals(this.activeTo, value)) {
                if (value != this.activeTo) {
                    this.activeTo = value;
                    // NotifyPropertyChanged("ActiveTo");
                }
            }
        }
        public get SortByStatus(): ObservableCollection<CListItem> {
            return this.sortByStatus;
        }
        public set SortByStatus(value: ObservableCollection<CListItem>) {
            if (!Helper.ReferenceEquals(this.sortByStatus, value)) {
                if (value != this.sortByStatus) {
                    this.sortByStatus = value;
                    // NotifyPropertyChanged("SortByStatus");
                }
            }
        }
        public get SortByValue(): CListItem {
            return this.sortByValue;
        }
        public set SortByValue(value: CListItem) {
            if (!Helper.ReferenceEquals(this.sortByValue, value)) {
                if (value != this.sortByValue) {
                    this.sortByValue = value;
                    // NotifyPropertyChanged("SortByValue");
                }
            }
        }
        private _MedViewOptionList: ObservableCollection<CListItem>;
        public get MedViewOptionList(): ObservableCollection<CListItem> {
            return this._MedViewOptionList;
        }
        public set MedViewOptionList(value: ObservableCollection<CListItem>) {
            if (!Helper.ReferenceEquals(this._MedViewOptionList, value)) {
                if (value != this._MedViewOptionList) {
                    this._MedViewOptionList = value;
                    // NotifyPropertyChanged("MedViewOptionList");
                }
            }
        }
        private _MedViewOptionValue: CListItem;
        public get MedViewOptionValue(): CListItem {
            return this._MedViewOptionValue;
        }
        public set MedViewOptionValue(value: CListItem) {
            if (!Helper.ReferenceEquals(this._MedViewOptionValue, value)) {
                if (value != this._MedViewOptionValue) {
                    this._MedViewOptionValue = value;
                    MedChartData.Is7DayView = (this._MedViewOptionValue != null && String.Compare(this._MedViewOptionValue.Value, "CC_7DAYVIEW") == 0) ? true : false;
                    // NotifyPropertyChanged("MedViewOptionValue");
                }
            }
        }
        public get IsDiscontinueChecked(): boolean {
            return this.isDiscontinueChecked;
        }
        public set IsDiscontinueChecked(value: boolean) {
            if (!Helper.ReferenceEquals(this.isDiscontinueChecked, value)) {
                if (value != this.isDiscontinueChecked) {
                    this.isDiscontinueChecked = value;
                    // NotifyPropertyChanged("IsDiscontinueChecked");
                }
            }
        }
        public get IsCancelChecked(): boolean {
            return this.isCancelChecked;
        }
        public set IsCancelChecked(value: boolean) {
            if (!Helper.ReferenceEquals(this.isCancelChecked, value)) {
                if (value != this.isCancelChecked) {
                    this.isCancelChecked = value;
                    // NotifyPropertyChanged("IsCancelChecked");
                }
            }
        }
        public GetDomainCombo(sDomainCodes: string): void {
           //let sDomainCodes: string = ValueDomain.SortByStatus + "," + ValueDomain.MedicationView;
            ProcessRTE.GetValuesByDomainCodes(sDomainCodes, (s, e) => {
                this.OnRTEResult(s);
              });
              
            }
     
        public GetDomainComboCompletedEvent: Function;
        OnRTEResult(args: RTEEventargs): void {
            if (String.IsNullOrEmpty(args.Request) || args.Result == null)
                return
            if (String.Compare(args.Request, ValueDomain.SortByStatus + "," + ValueDomain.MedicationView, StringComparison.CurrentCultureIgnoreCase) == 0) {
                if (args.Result instanceof Dictionary) {
                    let objResult: Dictionary<string, List<CListItem>> = <Dictionary<string, List<CListItem>>>args.Result;
                    objResult.forEach( (objDomainDetail)=> {
                        switch (objDomainDetail.Key) {
                            case ValueDomain.SortByStatus:
                                {
                                    if (objDomainDetail.Value.Count != null && objDomainDetail.Value.Count > 0) {
                                        this.SortByStatus = new ObservableCollection<CListItem>();
                                        (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                            this.SortByStatus.Add(ObjectHelper.CreateObject(new CListItem(), {
                                                DisplayText: oCListItem.DisplayText,
                                                Value: oCListItem.Value,
                                                IsSelected: oCListItem.DisplayText == "By Status" ? true : false
                                            }));
                                        });
                                    }
                                }
                                break;
                            case ValueDomain.MedicationView:
                                {
                                    if (objDomainDetail.Value.Count != null && objDomainDetail.Value.Count > 0) {
                                        this.MedViewOptionList = new ObservableCollection<CListItem>();
                                        (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                            this.MedViewOptionList.Add(ObjectHelper.CreateObject(new CListItem(), {
                                                DisplayText: oCListItem.DisplayText,
                                                Value: oCListItem.Value
                                            }));
                                        });
                                    }
                                }
                                break;
                        }
                    });
                }
                if (this.GetDomainComboCompletedEvent != null)
                    this.GetDomainComboCompletedEvent();
            }
        }
    }
    export class MedAmendMessageVM extends ViewModelBase {
        private a: string;
        private b: string;
        private c: string;
        public get AmendMsg(): string {
            return this.a;
        }
        public set AmendMsg(value: string) {
            if (this.a != value) {
                this.a = value;
                // NotifyPropertyChanged("AmendMsg");
            }
        }
        public get AmendMsgOkCancel(): string {
            return this.c;
        }
        public set AmendMsgOkCancel(value: string) {
            if (this.c != value) {
                this.c = value;
                // NotifyPropertyChanged("AmendMsgOkCancel");
            }
        }
        public get DoseType(): string {
            return this.b;
        }
        public set DoseType(value: string) {
            if (this.b != value) {
                this.b = value;
                // NotifyPropertyChanged("DoseType");
            }
        }
        public MCVersion: string;
        public IdentifyingName: string;
        public PrescriptionitemOID: number;
        public AmendedPresOID: number;
        public UserName: string;
    }
