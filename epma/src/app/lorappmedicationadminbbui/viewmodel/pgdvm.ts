import { Component, EventEmitter, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, MediatorDataService} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, CListItem, Visibility, AppContextInfo, List, Random, IEnumerable, CValuesetTerm, int64, byte, ArrayOfString } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import { ObjectHelper as Helper, ObjectHelper } from 'epma-platform/helper';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { ChartContext, MedChartData } from '../utilities/globalvariable';
import { Resource } from '../resource';
import { CConstants, SlotStatus } from '../utilities/CConstants';
import { AdministrationDetailVM } from './MedicationChartVM';
import { SelectedUserType } from 'src/app/lorappmedicationcommonbb/utilities/witnesshelper';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { CReqMsgGetAssociatedPGDListItem, CReqMsgIsPGDListsAvailable, CReqMsgRecordPGD, CResMsgGetAssociatedPGDListItem, CResMsgRecordPGD, DrugPrepDetail, GetAssociatedPGDListItemCompletedEventArgs, IPPMCPresctiptionItem, IsPGDListsAvailableCompletedEventArgs, MedicationAdministrationWSSoapClient, ObjectInfo, PGDAdministration, PGDList, PGDListDetail, RecordPGDCompletedEventArgs } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { ProfileData } from '../utilities/ProfileData';
import { Common } from '../utilities/common';
import { ConflictAcknowledge } from 'src/app/lorappmedicationcommonbb/utilities/ConflictsHelper';
import * as IPPManagePrescSer from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { WebServiceURLMedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import { InfusionTypeConceptCodeData, MedicationCommonProfileData, WarningConceptCode } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { WarningDetails } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import * as IPPMAManagePrescSer from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { Environment } from 'src/app/product/shared/models/Common';
import { InfusionLineItemVM } from 'src/app/lorappmedicationcommonbb/utilities/lineitemconstructor';
import { LzoWizardVmbaseService as LzoWizardVMBase } from 'src/app/shared/epma-platform/services/lzo-wizard-vmbase.service'
import { DecisionSupportBasicCriteria } from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { CResMsgGetValuesByDomains, GetValuesByDomainsCompletedEventArgs } from 'src/app/shared/epma-platform/soap-client/CReferenceWS';
import { ContextInfo, PatientContext, AppSessionInfo } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { InjectorInstance } from 'src/app/app.module';

    export class PGDListVM extends ViewModelBase {
        private _PrescribableItem: string;
        public get PrescribableItem(): string {
            return this._PrescribableItem;
        }
        public set PrescribableItem(value: string) {
            this._PrescribableItem = value;
            // NotifyPropertyChanged("PrescribableItem");
        }
        private _DoseTye: string;
        public get DoseTye(): string {
            return this._DoseTye;
        }
        public set DoseTye(value: string) {
            this._DoseTye = value;
            // NotifyPropertyChanged("DoseTye");
        }
        private _DoseValue: string;
        public get DoseValue(): string {
            return this._DoseValue;
        }
        public set DoseValue(value: string) {
            this._DoseValue = value;
            // NotifyPropertyChanged("DoseValue");
        }
        private _UpperDose: string;
        public get UpperDose(): string {
            return this._UpperDose;
        }
        public set UpperDose(value: string) {
            this._UpperDose = value;
            // NotifyPropertyChanged("DoseValue");
        }
        private _DoseUOM: ObjectInfo;
        public get DoseUOM(): ObjectInfo {
            return this._DoseUOM;
        }
        public set DoseUOM(value: ObjectInfo) {
            this._DoseUOM = value;
            // NotifyPropertyChanged("DoseUOM");
        }
        private _Route: string;
        public get Route(): string {
            return this._Route;
        }
        public set Route(value: string) {
            this._Route = value;
            // NotifyPropertyChanged("Route");
        }
        private _IsControlledDrug: string;
        public get IsControlledDrug(): string {
            return this._IsControlledDrug;
        }
        public set IsControlledDrug(value: string) {
            this._IsControlledDrug = value;
            // NotifyPropertyChanged("IsControlledDrug");
        }
        private _ItemSubType: string;
        public get ItemSubType(): string {
            return this._ItemSubType;
        }
        public set ItemSubType(value: string) {
            this._ItemSubType = value;
            // NotifyPropertyChanged("ItemSubType");
        }
        private _MultiComponentItems: ArrayOfString;
        public get MultiComponentItems(): ArrayOfString {
            return this._MultiComponentItems;
        }
        public set MultiComponentItems(value: ArrayOfString) {
            this._MultiComponentItems = value;
            // NotifyPropertyChanged("MultiComponentItems");
        }
        private _Frequency: string;
        public get Frequency(): string {
            return this._Frequency;
        }
        public set Frequency(value: string) {
            this._Frequency = value;
            // NotifyPropertyChanged("Frequency");
        }
        private _frequrncyOID: number;
        public get FrequencyOID(): number {
            return this._frequrncyOID;
        }
        public set FrequencyOID(value: number) {
            this._frequrncyOID = value;
        }
        private _objDosageForm: ObjectInfo;
        public get ObjDosageForm(): ObjectInfo {
            return this._objDosageForm;
        }
        public set ObjDosageForm(value: ObjectInfo) {
            this._objDosageForm = value;
            // NotifyPropertyChanged("ObjDosageForm");
        }
        private _objAdminMethod: ObjectInfo;
        public get ObjAdminMethod(): ObjectInfo {
            return this._objAdminMethod;
        }
        public set ObjAdminMethod(value: ObjectInfo) {
            this._objAdminMethod = value;
            // NotifyPropertyChanged("ObjAdminMethod");
        }
        private _DosageForm: string;
        public get DosageForm(): string {
            return this._DosageForm;
        }
        public set DosageForm(value: string) {
            this._DosageForm = value;
            // NotifyPropertyChanged("DosageForm");
        }
        private _Comments: string;
        public get Comments(): string {
            return this._Comments;
        }
        public set Comments(value: string) {
            this._Comments = value;
            // NotifyPropertyChanged("Comments");
        }
        private _PGDListName: string;
        public get PGDListName(): string {
            return this._PGDListName;
        }
        public set PGDListName(value: string) {
            this._PGDListName = value;
            // NotifyPropertyChanged("PGDListName");
        }
        private _PGDListOID: number;
        public get PGDListOID(): number {
            return this._PGDListOID;
        }
        public set PGDListOID(value: number) {
            this._PGDListOID = value;
            // NotifyPropertyChanged("PGDListOID");
        }
        private _PDGListItemOID: number;
        public get PDGListItemOID(): number {
            return this._PDGListItemOID;
        }
        public set PDGListItemOID(value: number) {
            this._PDGListItemOID = value;
            // NotifyPropertyChanged("PDGListItemOID");
        }
        private _IdentifyingType: string;
        public get IdentifyingType(): string {
            return this._IdentifyingType;
        }
        public set IdentifyingType(value: string) {
            this._IdentifyingType = value;
        }
        private _IdentifyingOID: number;
        public get IdentifyingOID(): number {
            return this._IdentifyingOID;
        }
        public set IdentifyingOID(value: number) {
            this._IdentifyingOID = value;
        }
        private _LorenzoID: string;
        public get LorenzoID(): string {
            return this._LorenzoID;
        }
        public set LorenzoID(value: string) {
            this._LorenzoID = value;
            // NotifyPropertyChanged("LorenzoID");
        }
        private _RouteOID: number;
        public get RouteOID(): number {
            return this._RouteOID;
        }
        public set RouteOID(value: number) {
            this._RouteOID = value;
            // NotifyPropertyChanged("RouteOID");
        }
        private _ItemType: string;
        public get ItemType(): string {
            return this._ItemType;
        }
        public set ItemType(value: string) {
            this._ItemType = value;
            // NotifyPropertyChanged("ItemType");
        }
        private _IsParacetamolIngredient: boolean;
        public get IsParacetamolIngredient(): boolean {
            return this._IsParacetamolIngredient;
        }
        public set IsParacetamolIngredient(value: boolean) {
            this._IsParacetamolIngredient = value;
            // NotifyPropertyChanged("IsParacetamolIngredient");
        }
        private _ParacetamolAdministeredCount: number;
        public get ParacetamolAdministeredCount(): number {
            return this._ParacetamolAdministeredCount;
        }
        public set ParacetamolAdministeredCount(value: number) {
            this._ParacetamolAdministeredCount = value;
            // NotifyPropertyChanged("ParacetamolAdministeredCount");
        }
        private _McVersionNo: string;
        public get McVersionNo(): string {
            return this._McVersionNo;
        }
        public set McVersionNo(value: string) {
            this._McVersionNo = value;
            // NotifyPropertyChanged("McVersionNo");
        }
        private _IngredientWarning: ArrayOfString;
        public get IngredientWarning(): ArrayOfString {
            return this._IngredientWarning;
        }
        public set IngredientWarning(value: ArrayOfString) {
            this._IngredientWarning = value;
            // NotifyPropertyChanged("IngredientWarning");
        }
        private _infusionDetails: InfusionLineItemVM;
        public get InfusionDetails(): InfusionLineItemVM {
            return this._infusionDetails;
        }
        public set InfusionDetails(value: InfusionLineItemVM) {
            if (this._infusionDetails != value) {
                this._infusionDetails = value;
                // NotifyPropertyChanged("InfusionDetails");
            }
        }
        private _MCchilditem: string;
        public get MCChilditem(): string {
            return this._MCchilditem;
        }
        public set MCChilditem(value: string) {
            this._MCchilditem = value;
            // NotifyPropertyChanged("MCChilditem");
        }
        private _PreparationStatus: string;
        public get PreparationStatus(): string {
            return this._PreparationStatus;
        }
        public set PreparationStatus(value: string) {
            this._PreparationStatus = value;
            // NotifyPropertyChanged("PreparationStatus");
        }
        private _Multicompoentndetails: ObservableCollection<IPPMCPresctiptionItem>;
        public get Multicompoentndetails(): ObservableCollection<IPPMCPresctiptionItem> {
            return this._Multicompoentndetails;
        }
        public set Multicompoentndetails(value: ObservableCollection<IPPMCPresctiptionItem>) {
            this._Multicompoentndetails = value;
            // NotifyPropertyChanged("Multicompoentndetails");
        }
        private _PgdListDetailOID: number;
        public get PgdListDetailOID(): number {
            return this._PgdListDetailOID;
        }
        public set PgdListDetailOID(value: number) {
            this._PgdListDetailOID = value;
            // NotifyPropertyChanged("PgdListDetailOID");
        }
        private _ParentLorenzoID: string;
        public get ParentLorenzoID(): string {
            return this._ParentLorenzoID;
        }
        public set ParentLorenzoID(value: string) {
            this._ParentLorenzoID = value;
            // NotifyPropertyChanged("ParentLorenzoID");
        }
        private _IsAuthorise: boolean;
        public get IsAuthorise(): boolean {
            return this._IsAuthorise;
        }
        public set IsAuthorise(value: boolean) {
            this._IsAuthorise = value;
            // NotifyPropertyChanged("IsAuthorise");
        }
        private _MaxNoOfAdministration: number;
        public get MaxNoOfAdministration(): number {
            return this._MaxNoOfAdministration;
        }
        public set MaxNoOfAdministration(value: number) {
            this._MaxNoOfAdministration = value;
            // NotifyPropertyChanged("MaxNoOfAdministration");
        }
        private _PGDAdministrationCount: number;
        public get PGDAdministrationCount(): number {
            return this._PGDAdministrationCount;
        }
        public set PGDAdministrationCount(value: number) {
            this._PGDAdministrationCount = value;
            // NotifyPropertyChanged("PGDAdministrationCount");
        }
        private _IsCopyAcross: boolean;
        public get IsCopyAcross(): boolean {
            return this._IsCopyAcross;
        }
        public set IsCopyAcross(value: boolean) {
            this._IsCopyAcross = value;
            // NotifyPropertyChanged("IsCopyAcross");
        }
        private _CopyAcrossTooltip: string;
        public get CopyAcrossTooltip(): string {
            return this._CopyAcrossTooltip;
        }
        public set CopyAcrossTooltip(value: string) {
            this._CopyAcrossTooltip = value;
            // NotifyPropertyChanged("CopyAcrossTooltip");
        }
        private _PGDLorenzoID: string;
        public get PGDLorenzoID(): string {
            return this._PGDLorenzoID;
        }
        public set PGDLorenzoID(value: string) {
            this._PGDLorenzoID = value;
            // NotifyPropertyChanged("PGDLorenzoID");
        }
        private _PGDUsed: string;
        public get PGDUsed(): string {
            return this._PGDUsed;
        }
        public set PGDUsed(value: string) {
            this._PGDUsed = value;
            // NotifyPropertyChanged("PGDUsed");
        }
        private _PGDUsedTooltip: string;
        public get PGDUsedTooltip(): string {
            return this._PGDUsedTooltip;
        }
        public set PGDUsedTooltip(value: string) {
            this._PGDUsedTooltip = value;
            // NotifyPropertyChanged("PGDUsedTooltip");
        }
        private _IsMaxAdministrationReached: boolean = false;
        public get IsMaxAdministrationReached(): boolean {
            return this._IsMaxAdministrationReached;
        }
        public set IsMaxAdministrationReached(value: boolean) {
            this._IsMaxAdministrationReached = value;
            // NotifyPropertyChanged("IsMaxAdministrationReached");
        }
        private _IsSingleActionMedChart: boolean = true;
        public get IsSingleActionMedChart(): boolean {
            return this._IsSingleActionMedChart;
        }
        public set IsSingleActionMedChart(value: boolean) {
            this._IsSingleActionMedChart = value;
        }
    }
    export class PGDAdminstrationVM extends LzoWizardVMBase {  
        public dataLoadEvent = new EventEmitter();
        private _nPrescriptionOID: number;
        public get nPrescriptionOID(): number {
            return this._nPrescriptionOID;
        }
        public set nPrescriptionOID(value: number) {
            this._nPrescriptionOID = value;
        }
        public IsWizardRecordPGD: boolean;
        private _AdminDateIsOpenError: boolean;
        public get AdminDateIsOpenError(): boolean {
            return this._AdminDateIsOpenError;
        }
        public set AdminDateIsOpenError(value: boolean) {
            this._AdminDateIsOpenError = value;
            // OnPropertyChanged("AdminDateIsOpenError");
        }

        //RR PAN 215 --START
        private _ReTryCount: number = 0;
        public get ReTryCount(): number {
            return this._ReTryCount;
        }
        public set ReTryCount(value: number) {
            this._ReTryCount = value;
        }
        public SubmitDrugsDone: boolean = false;
        public TempOID: number = 0;
        //RR PAN 215 --END

        private _ExpiryDateIsOpenError: boolean;
        public get ExpiryDateIsOpenError(): boolean {
            return this._ExpiryDateIsOpenError;
        }
        public set ExpiryDateIsOpenError(value: boolean) {
            this._ExpiryDateIsOpenError = value;
            // OnPropertyChanged("ExpiryDateIsOpenError");
        }
        private _oDrugPreparationReqObject: DrugPrepDetail;
        public get oDrugPreparationReqObject(): DrugPrepDetail {
            return this._oDrugPreparationReqObject;
        }
        public set oDrugPreparationReqObject(value: DrugPrepDetail) {
            if (this._oDrugPreparationReqObject != value) {
                this._oDrugPreparationReqObject = value;
                // OnPropertyChanged("AdminDateIsOpenError");
            }
        }
        private _IsDrugPreStrikeOut: boolean;
        public get IsDrugPreStrikeOut(): boolean {
            return this._IsDrugPreStrikeOut;
        }
        public set IsDrugPreStrikeOut(value: boolean) {
            this._IsDrugPreStrikeOut = value;
            // OnPropertyChanged("IsDrugPreStrikeOut");
        }
        private _IsUpdatedWarning: boolean;
        public get IsUpdatedWarning(): boolean {
            return this._IsUpdatedWarning;
        }
        public set IsUpdatedWarning(value: boolean) {
            this._IsUpdatedWarning = value;
            // OnPropertyChanged("IsUpdatedWarning");
        }
        public IsFinishClicked: boolean = false;
        public override OnInitialize(): void {
            super.OnInitialize();
        }
        public override OnInitComplete(): void {
            super.OnInitComplete();
            if (super.AppContext != null && !String.IsNullOrEmpty(super.AppContext.CACode) && String.Compare(super.AppContext.CACode, "MN_RECORDPGD_P2") == 0) {
                let lnPatOID: number, lnEncOID, lnChartOID, lnServiceOID, lnMergePatOID;
                let sDOB: DateTime= DateTime.MinValue;
                if (Number.TryParse(ContextManager.Instance["PatientID"].ToString(), (o) => {
                    lnPatOID = o;
                  }))
                    PatientContext.PatientOID = lnPatOID;
                if (Number.TryParse(ContextManager.Instance["EncounterOID"].ToString(), (o) => {
                    lnEncOID = o;
                }))
                    PatientContext.EncounterOid = ChartContext.EncounterOID = lnEncOID;
                if (Number.TryParse(ContextManager.Instance["MergedPatientOID"].ToString(), (o) => {
                    lnMergePatOID = o;
                }))
                    PatientContext.MergedPatientOID = lnMergePatOID;
                if (ContextManager.Instance["MedChartOID"] != null && Number.TryParse(ContextManager.Instance["MedChartOID"].ToString(), (o) => {
                    lnChartOID = o;
                    }))
                    MedChartData.MedChartOID = lnChartOID;
                if (ContextManager.Instance["ServiceOID"] != null && Number.TryParse(ContextManager.Instance["ServiceOID"].ToString(), (o) => {
                     lnServiceOID = o;
                }))
                    MedChartData.ServiceOID = lnServiceOID;
                if (ContextManager.Instance["DOB"] != null && DateTime.TryParse(ContextManager.Instance["DOB"].ToString(),(o) => {
                    sDOB = o;
                  }))
                    PatientContext.DOB = (DateTime.NotEquals(sDOB , DateTime.MinValue)) ? sDOB.ToString() : String.Empty;
                else PatientContext.DOB = String.Empty;
                if (this.WizardContext != null && !String.IsNullOrEmpty(this.WizardContext["PatientAge"]) && !String.Equals(this.WizardContext["PatientAge"], CConstants.NaN, StringComparison.CurrentCultureIgnoreCase)) {
                    PatientContext.PatientAge = this.WizardContext["PatientAge"].ToString();
                }
                else if (ContextManager.Instance["PatientAge"] != null && !String.IsNullOrEmpty(ContextManager.Instance["PatientAge"].ToString())) {
                    PatientContext.PatientAge = ContextManager.Instance["PatientAge"].ToString();
                }
                if (ContextManager.Instance["Sex"] != null && !String.IsNullOrEmpty(ContextManager.Instance["Sex"].ToString())) {
                    PatientContext.Sex = ContextManager.Instance["Sex"].ToString();
                }
                AppContextInfo.OrganisationName = ContextManager.Instance["OrganisationName"].ToString();
                AppContextInfo.JobRoleOID = ContextManager.Instance["JobRoleOID"].ToString();
                AppContextInfo.RoleProfileName = ContextManager.Instance["RoleProfileName"].ToString();
                AppSessionInfo.AMCV = ContextManager.Instance["AMCV"].ToString();
                ContextInfo.SecurityToken = super.AppContext.SecurityToken;
                AppContextInfo.JobRoleName = ContextManager.Instance["JobRoleName"].ToString();
                AppContextInfo.UserName = ContextManager.Instance["UserName"].ToString();
                AppContextInfo.UserOID = ContextManager.Instance["UserOID"].ToString();
                let objUserOid: int64;
                Int64.TryParse(super.AppContext.UserOID, (o) => {
                    objUserOid = o;
                  });
                ContextInfo.UserOID = objUserOid;
                AppContextInfo.OrganisationOID = super.AppContext.OrganisationOID;
                let objReleaseVer: byte;
                Byte.TryParse(super.AppContext.ReleaseVersion, (o) => {
                    objReleaseVer = o;
                  });
                ContextInfo.ReleaseVersion = objReleaseVer;
                this.IsWizardRecordPGD = true;
            }
            else {
                this.IsWizardRecordPGD = false;
            }
        }
        CtrlName: string = String.Empty;
        private CheckMandatoryFields(): boolean {
            this.CtrlName = String.Empty;
            let objiMessageBox: iMessageBox = new iMessageBox();
            objiMessageBox.Title = "Lorenzo";
            objiMessageBox.IconType = MessageBoxType.Information;
            let UDose: number = 0;
            let LDose: number = 0;
            let EnteredDose: number = 0;
            if (!String.IsNullOrEmpty(this.UpperDose)) {
                Number.TryParse(this.UpperDose, (o) => {
                    UDose = o;
                  });
            }
            if (!String.IsNullOrEmpty(this.LowerDose)) {
                Number.TryParse(this.LowerDose, (o) => {
                    LDose = o;
                  });
            }
            if (!String.IsNullOrEmpty(this.Dose)) {
                Number.TryParse(this.Dose,(o) => {
                    EnteredDose = o;
                  });
            }
            if (UDose > 0 && this.IsDoseMandatory) {
                this.CtrlName = "txtDose";
                if (String.IsNullOrEmpty(this.Dose) || String.Compare(this.Dose, "0", StringComparison.InvariantCultureIgnoreCase) == 0 || (!String.IsNullOrEmpty(this.Dose) && Convert.ToDecimal(this.Dose) <= 0)) {
                    objiMessageBox.Message = "Enter Dose value. This field is mandatory";
                    objiMessageBox.MessageBoxClose = (s, e) => {
                        this.objiMessageBox_MessageBoxClose(s, e);
                    };
                    objiMessageBox.MessageButton = MessageBoxButton.OK;
                    objiMessageBox.Show();
                    return true;
                }
                else if (!String.IsNullOrEmpty(this.Dose) && this.Dose.ToString().StartsWith(".")) {
                    objiMessageBox.Message = "Please enter an appropriate dose in its entirety without a leading decimal point.";
                    objiMessageBox.MessageBoxClose = (s, e) => {
                        this.objiMessageBox_MessageBoxClose(s, e);
                    };
                    objiMessageBox.MessageButton = MessageBoxButton.OK;
                    objiMessageBox.Show();
                    return true;
                }
                else if (EnteredDose < LDose || EnteredDose > UDose) {
                    objiMessageBox.Message = "The Dose value you have entered is outside the prescribed Dose range. Please enter an appropriate Dose";
                    objiMessageBox.MessageBoxClose = (s, e) => {
                        this.objiMessageBox_MessageBoxClose(s, e);
                    };
                    objiMessageBox.MessageButton = MessageBoxButton.OK;
                    objiMessageBox.Show();
                    return true;
                }
            }
            if (DateTime.Equals(this.AdministrationDate , DateTime.MinValue)) {
                objiMessageBox.Message = Resource.RecordPGD.ErrMsg_EnterGivenDate;
                objiMessageBox.IconType = MessageBoxType.Information;
                objiMessageBox.Title = "LORENZO";
                objiMessageBox.Tag = CConstants.CONTS_DATETIMEGIVEN;
                this.CtrlName = "dtpGivenDate";
                objiMessageBox.MessageBoxClose = (s, e) => {
                    this.objiMessageBox_MessageBoxClose(s, e);
                };
                objiMessageBox.MessageButton = MessageBoxButton.OK;
                objiMessageBox.Show();
                return true;
            }
            if (String.IsNullOrEmpty(this.AdministeredBy)) {
                objiMessageBox.Message = Resource.RecordPGD.ErrMsg_AdministeredBy;
                this.CtrlName = "iSFSAdministeredby";
                objiMessageBox.MessageBoxClose = (s, e) => {
                    this.objiMessageBox_MessageBoxClose(s, e);
                };
                objiMessageBox.MessageButton = MessageBoxButton.OK;
                objiMessageBox.Show();
                return true;
            }
            if (this.IsWitnessMandatory && (String.IsNullOrEmpty(this.WitnessByOID) || String.Equals(this.WitnessByOID, "0", StringComparison.CurrentCultureIgnoreCase)) && String.IsNullOrEmpty(this.WitnessBy)) {
                objiMessageBox.Message = "Please enter the witness for PGD administered.";
                this.CtrlName = "sfsWitnessedby";
                objiMessageBox.MessageBoxClose = (s, e) => {
                    this.objiMessageBox_MessageBoxClose(s, e);
                };
                objiMessageBox.MessageButton = MessageBoxButton.OK;
                objiMessageBox.Show();
                return true;
            }
            return false;
        }
        objiMessageBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
            if (this.OnErrorEvent != null)
                this.OnErrorEvent(this.CtrlName);
            
        }
        public override OnFinish(): void {
            if (!this.CheckMandatoryFields()) {
                if (!this.IsFinishClicked) {
                    this.IsFinishClicked = true;
                    this.RecordPGD(this.nPrescriptionOID);
                }
            }
            else {
                if (HelperService.windowCloseFlag == "Finish" || HelperService.windowCloseFlag == 'FinishNow') {
                    ObjectHelper.stopScreenFreezeEvent(true);
                }
            }
        }
        public _mediatorDataService: MediatorDataService;
        constructor(_IsDialog?: boolean) {
            super(_IsDialog);

            this._mediatorDataService = InjectorInstance.get<MediatorDataService>(MediatorDataService);
            if (this.AppContext.CACode == "MN_RECORDPGD_P2") {
                this._mediatorDataService.listenFor(6).subscribe((data: any) => {
                    if (data) {
                        let contextData = data.context;
                        switch (contextData.context.event) {
                            case 'Discard_Click': this.OnCancel();
                                break;
                            case 'Finish_Click':
                                HelperService.windowCloseFlag = "Finish";
                                this.OnFinish();
                                break;
                            case 'FinishNow_Click':
                                HelperService.windowCloseFlag = "FinishNow";
                                this.OnFinishNow();
                                break;
                        }
                    }
                });
            }
            this.OnInitialize();
            this.OnInitComplete();
        }
        public static PGDLISTPREFIX: string = "PGD list - ";
        public _AdministeredByList: ObservableCollection<CListItem>;
        public _AdministeredList: ObservableCollection<CListItem>;
        //public delegate void WitnessUserSelectedDlgt(SelectedUserType _SelectedUserType);
        public OnWitnessUserSelected: Function;
        //public delegate void AdministratedUserSelectedDelgt(SelectedUserType _SelectedUserType);
        public OnAdministratedUserSelectedEvent: Function;
        private _WitnessByList: ObservableCollection<CListItem>;
        public get WitnessByList(): ObservableCollection<CListItem> {
            return this._WitnessByList;
        }
        public set WitnessByList(value: ObservableCollection<CListItem>) {
            if (!Helper.ReferenceEquals(this._WitnessByList, value)) {
                this._WitnessByList = value;
                // OnPropertyChanged("WitnessByList");
            }
        }
        private _BatchNo: string;
        public get BatchNo(): string {
            return this._BatchNo;
        }
        public set BatchNo(value: string) {
            this._BatchNo = value;
            // OnPropertyChanged("BatchNo");
        }
        private _ExpiryDate: DateTime;
        public get ExpiryDate(): DateTime{
            return this._ExpiryDate;
        }
        public set ExpiryDate(value: DateTime) {
            this._ExpiryDate = value;
            if (this._ExpiryDate == DateTime.MinValue) {
                this.ExpiryDateIsOpenError = true;
            }
            else {
                this.ExpiryDateIsOpenError = false;
            }
            // OnPropertyChanged("ExpiryDate");
        }
        private _AdministrationDetail: AdministrationDetailVM;
        public get AdministrationDetail(): AdministrationDetailVM {
            return this._AdministrationDetail;
        }
        public set AdministrationDetail(value: AdministrationDetailVM) {
            this._AdministrationDetail = value;
            // OnPropertyChanged("AdministrationDetail");
        }
        public canLanchUserAuth: boolean = true;
        public _IsSFSValueSetFromOnGetSFSItems: boolean = false;
        private _WitnessByOID: string;
        public get WitnessByOID(): string {
            return this._WitnessByOID;
        }
        public set WitnessByOID(value: string) {
            if (String.Compare(this._WitnessByOID, value, StringComparison.InvariantCultureIgnoreCase) != 0) {
                this._WitnessByOID = value;
                if (!String.IsNullOrEmpty(value) && value != "-1" && value != "0" && this.OnWitnessUserSelected != null && this.canLanchUserAuth && !this._IsSFSValueSetFromOnGetSFSItems)
                    this.OnWitnessUserSelected(SelectedUserType.WitnessingUser);
                // OnPropertyChanged("WitnessByOID");
            }
        }
        private _WitnessBy: string;
        public get WitnessBy(): string {
            return this._WitnessBy;
        }
        public set WitnessBy(value: string) {
            if (!Helper.ReferenceEquals(this._WitnessBy, value)) {
                this._WitnessBy = value;
                // OnPropertyChanged("WitnessBy");
            }
        }
        private _IsNoWitnessAvailable: boolean;
        public get blnIsNoWitnessAvailable(): boolean {
            return this._IsNoWitnessAvailable;
        }
        public set blnIsNoWitnessAvailable(value: boolean) {
            this._IsNoWitnessAvailable = value;
            // OnPropertyChanged("blnIsNoWitnessAvailable");
        }
        private _MedicationAction: string;
        public get MedicationAction(): string {
            return this._MedicationAction;
        }
        public set MedicationAction(value: string) {
            this._MedicationAction = value;
            // OnPropertyChanged("MedicationAction");
        }
        private _AdministrationDate: DateTime = DateTime.MinValue;
        public get AdministrationDate(): DateTime{
            return this._AdministrationDate;
        }
        public set AdministrationDate(value: DateTime) {
            if (!Helper.ReferenceEquals(this._AdministrationDate, value)) {
                this._AdministrationDate = value;
                this.AdministrationTime = this._AdministrationDate.DateTime.AddTime(this._AdministrationTime);
                if (this._AdministrationDate == DateTime.MinValue) {
                    this.AdminDateIsOpenError = true;
                }
                else {
                    this.AdminDateIsOpenError = false;
                }
                // OnPropertyChanged("AdministrationDate");
            }
        }
        private _AdministrationTime: DateTime = new DateTime();
        public get AdministrationTime(): DateTime{
            return this._AdministrationTime;
        }
        public set AdministrationTime(value: DateTime) {
            if (!Helper.ReferenceEquals(this._AdministrationTime, value)) {
                if (this._AdministrationDate != DateTime.MinValue) {
                    this._AdministrationTime = this._AdministrationDate.DateTime.AddTime(value);
                    let CurrentDTTM: DateTime= CommonBB.GetServerDateTime();
                    if (this._AdministrationTime > CurrentDTTM) {
                        this._AdministrationTime = CurrentDTTM;
                    }
                    // OnPropertyChanged("AdministrationTime");
                }
            }
        }
        private _IsDoseMandatory: boolean;
        public get IsDoseMandatory(): boolean {
            return this._IsDoseMandatory;
        }
        public set IsDoseMandatory(value: boolean) {
            this._IsDoseMandatory = value;
            // OnPropertyChanged("IsDoseMandatory");
        }
        private _IsDoseEnabled: boolean;
        public get IsDoseEnabled(): boolean {
            return this._IsDoseEnabled;
        }
        public set IsDoseEnabled(value: boolean) {
            this._IsDoseEnabled = value;
            // OnPropertyChanged("IsDoseEnabled");
        }
        private _IsRateMandatory: boolean;
        public get IsRateMandatory(): boolean {
            return this._IsRateMandatory;
        }
        public set IsRateMandatory(value: boolean) {
            this._IsRateMandatory = value;
            // OnPropertyChanged("IsRateMandatory");
        }
        private _IsRateEnabled: boolean;
        public get IsRateEnabled(): boolean {
            return this._IsRateEnabled;
        }
        public set IsRateEnabled(value: boolean) {
            this._IsRateEnabled = value;
            // OnPropertyChanged("IsRateEnabled");
        }
        private _IsWitnessMandatory: boolean;
        public get IsWitnessMandatory(): boolean {
            return this._IsWitnessMandatory;
        }
        public set IsWitnessMandatory(value: boolean) {
            this._IsWitnessMandatory = value;
            // OnPropertyChanged("IsWitnessMandatory");
        }
        private _AdministeredBy: string;
        public get AdministeredBy(): string {
            return this._AdministeredBy;
        }
        public set AdministeredBy(value: string) {
            this._AdministeredBy = value;
            // OnPropertyChanged("AdministeredBy");
        }
        private _AdministeredByOID: string;
        public get AdministeredByOID(): string {
            return this._AdministeredByOID;
        }
        public set AdministeredByOID(value: string) {
            if (String.Compare(this._AdministeredByOID, value, StringComparison.InvariantCultureIgnoreCase) != 0) {
                this._AdministeredByOID = value;
                if (!String.IsNullOrEmpty(value) && value != "-1" && value != "0" && this.OnAdministratedUserSelectedEvent != null && this.canLanchUserAuth && !this._IsSFSValueSetFromOnGetSFSItems)
                    this.OnAdministratedUserSelectedEvent(SelectedUserType.AdministeringUser);
                // OnPropertyChanged("AdministeredByOID");
            }
        }
        private _DoseUOM: string;
        public get DoseUOM(): string {
            return this._DoseUOM;
        }
        public set DoseUOM(value: string) {
            this._DoseUOM = value;
            // OnPropertyChanged("DoseUOM");
        }
        private _Dose: string;
        public get Dose(): string {
            return this._Dose;
        }
        public set Dose(value: string) {
            this._Dose = value;
            // OnPropertyChanged("Dose");
        }
        private _Rate: string;
        public get Rate(): string {
            return this._Rate;
        }
        public set Rate(value: string) {
            this._Rate = value;
            // OnPropertyChanged("Rate");
        }
        private _RateUOM: string;
        public get RateUOM(): string {
            return this._RateUOM;
        }
        public set RateUOM(value: string) {
            this._RateUOM = value;
            // OnPropertyChanged("RateUOM");
        }
        private _LowerDose: string;
        public get LowerDose(): string {
            return this._LowerDose;
        }
        public set LowerDose(value: string) {
            this._LowerDose = value;
            // OnPropertyChanged("LowerDose");
        }
        private _UpperDose: string;
        public get UpperDose(): string {
            return this._UpperDose;
        }
        public set UpperDose(value: string) {
            this._UpperDose = value;
            // OnPropertyChanged("UpperDose");
        }
        private _Comments: string;
        public get Comments(): string {
            return this._Comments;
        }
        public set Comments(value: string) {
            this._Comments = value;
            // OnPropertyChanged("Comments");
        }
        private _isType: boolean;
        public get IsType(): boolean {
            return this._isType;
        }
        public set IsType(value: boolean) {
            this._isType = value;
            // OnPropertyChanged("IsType");
        }
        private _PGDList: PGDListVM;
        public get PGDList(): PGDListVM {
            return this._PGDList;
        }
        public set PGDList(value: PGDListVM) {
            this._PGDList = value;
            // OnPropertyChanged("PGDList");
        }
        private _IsPGDListsAvailable: boolean;
        public get blnIsPGDListsAvailable(): boolean {
            return this._IsPGDListsAvailable;
        }
        public set blnIsPGDListsAvailable(value: boolean) {
            this._IsPGDListsAvailable = value;
            // OnPropertyChanged("blnIsPGDListsAvailable");
        }
        private _PGDListNameServicePoint: string;
        public get PGDListNameServicePoint(): string {
            return this._PGDListNameServicePoint;
        }
        public set PGDListNameServicePoint(value: string) {
            this._PGDListNameServicePoint = value;
            // OnPropertyChanged("PGDListNameServicePoint");
        }
        private _PGDListNameRole: string;
        public get PGDListNameRole(): string {
            return this._PGDListNameRole;
        }
        public set PGDListNameRole(value: string) {
            this._PGDListNameRole = value;
            // OnPropertyChanged("PGDListNameRole");
        }
        private _IsPGDListEnabledServicePoint: boolean;
        public get IsPGDListEnabledServicePoint(): boolean {
            return this._IsPGDListEnabledServicePoint;
        }
        public set IsPGDListEnabledServicePoint(value: boolean) {
            this._IsPGDListEnabledServicePoint = value;
            // OnPropertyChanged("IsPGDListEnabledServicePoint");
        }
        private _IsPGDListEnabledRole: boolean;
        public get IsPGDListEnabledRole(): boolean {
            return this._IsPGDListEnabledRole;
        }
        public set IsPGDListEnabledRole(value: boolean) {
            this._IsPGDListEnabledRole = value;
            // OnPropertyChanged("IsPGDListEnabledRole");
        }
        public get AdministeredByList(): ObservableCollection<CListItem> {
            return this._AdministeredByList;
        }
        public set AdministeredByList(value: ObservableCollection<CListItem>) {
            if (!Helper.ReferenceEquals(this._AdministeredByList, value)) {
                this._AdministeredByList = value;
                // OnPropertyChanged("AdministeredByList");
            }
        }
        public get AdministeredList(): ObservableCollection<CListItem> {
            return this._AdministeredList;
        }
        public set AdministeredList(value: ObservableCollection<CListItem>) {
            if (!Helper.ReferenceEquals(this._AdministeredByList, value)) {
                this._AdministeredList = value;
                // OnPropertyChanged("AdministeredByList");
            }
        }
        private _IsSPExpanded: boolean;
        public get IsSPExpanded(): boolean {
            return this._IsSPExpanded;
        }
        public set IsSPExpanded(value: boolean) {
            if (!Helper.ReferenceEquals(this._IsSPExpanded, value)) {
                this._IsSPExpanded = value;
                // OnPropertyChanged("IsSPExpanded");
            }
        }
        private _IsRoleExpanded: boolean;
        public get IsRoleExpanded(): boolean {
            return this._IsRoleExpanded;
        }
        public set IsRoleExpanded(value: boolean) {
            if (!Helper.ReferenceEquals(this._IsRoleExpanded, value)) {
                this._IsRoleExpanded = value;
                // OnPropertyChanged("IsRoleExpanded");
            }
        }
        private _ParacetamolAdministeredCount: number;
        public get ParacetamolAdministeredCount(): number {
            return this._ParacetamolAdministeredCount;
        }
        public set ParacetamolAdministeredCount(value: number) {
            this._ParacetamolAdministeredCount = value;
            // OnPropertyChanged("ParacetamolAdministeredCount");
        }
        private _isPatientTransferd: Visibility = Visibility.Collapsed;
        public get IsPatientTransferd(): Visibility {
            return this._isPatientTransferd;
        }
        public set IsPatientTransferd(value: Visibility) {
            this._isPatientTransferd = value;
            // OnPropertyChanged("IsPatientTransferd");
        }
        private _isRateVisible: Visibility = Visibility.Collapsed;
        public get RateVisible(): Visibility {
            return this._isRateVisible;
        }
        public set RateVisible(value: Visibility) {
            this._isRateVisible = value;
            // OnPropertyChanged("RateVisible");
        }
        private _IsSingleActionChecked: boolean = true;
        public get IsSingleActionChecked(): boolean {
            return this._IsSingleActionChecked;
        }
        public set IsSingleActionChecked(value: boolean) {
            this._IsSingleActionChecked = value;
            // OnPropertyChanged("IsSingleActionChecked");
        }
        //public delegate void IsPGDListAvailableDelegate(bool IsPGDListAvailable);
        public IsPGDListAvailableEvent: Function;
        //public delegate void CheckRecordPGD(bool IsRecorded, CResMsgRecordPGD oCResMsgRecordPGD, bool IsSingleActionChecked);
        public CheckRecordPGDEvent: Function;
        public IsPGDListsAvailable(lRoleOID: number, lServicePointOID: number, lMedCharOID: number): void {
            let objService: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
            objService.IsPGDListsAvailableCompleted  = (s,e) => { this.objService_IsPGDListsAvailableCompleted(s,e); } ;
            let objReq: CReqMsgIsPGDListsAvailable = new CReqMsgIsPGDListsAvailable();
            objReq.oContextInformation = CommonBB.FillContext();
            objReq.roleOIDBC = lRoleOID;
            if (ContextManager.Instance["ServiceOID"] != null) {
                Number.TryParse(ContextManager.Instance["ServiceOID"].ToString(), (o) => {
                    lServicePointOID = o;
                  });
            }
            objReq.servicePointOIDBC = lServicePointOID;
            objReq.medChartOIDBC = lMedCharOID;
            objService.IsPGDListsAvailableAsync(objReq);
        }
        objService_IsPGDListsAvailableCompleted(sender: Object, e: IsPGDListsAvailableCompletedEventArgs): void {
            let _ErrorID: number = 80000078;
            let _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:pgdvm, Method:objService_IsPGDListsAvailableCompleted()";
            if (e.Error == null && e.Result != null) {
                try {
                    if (this.IsPGDListAvailableEvent != null) {
                        this.IsPGDListAvailableEvent(e.Result.isExist);
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
        private _pgdListDetailsServicePoint: ObservableCollection<PGDListVM>;
        public get PgdListDetailsServicePoint(): ObservableCollection<PGDListVM> {
            return this._pgdListDetailsServicePoint;
        }
        public set PgdListDetailsServicePoint(value: ObservableCollection<PGDListVM>) {
            this._pgdListDetailsServicePoint = value;
            // OnPropertyChanged("PgdListDetailsServicePoint");
        }
        private _pgdListDetailsRole: ObservableCollection<PGDListVM>;
        public get PgdListDetailsRole(): ObservableCollection<PGDListVM> {
            return this._pgdListDetailsRole;
        }
        public set PgdListDetailsRole(value: ObservableCollection<PGDListVM>) {
            this._pgdListDetailsRole = value;
            // OnPropertyChanged("PgdListDetailsRole");
        }
        public GetAssociatedPGDListItem(): void {
            let lnServiceOID: number = 0;
            let objSerive: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
            objSerive.GetAssociatedPGDListItemCompleted  = (s,e) => { this.objSerive_GetAssociatedPGDListItemCompleted(s,e); } ;
            let objReq: CReqMsgGetAssociatedPGDListItem = new CReqMsgGetAssociatedPGDListItem();
            objReq.oContextInformation = CommonBB.FillContext();
            objReq.roleOIDBC = Convert.ToInt64(AppContextInfo.JobRoleOID);
            if (ContextManager.Instance["ServiceOID"] != null) {
                Number.TryParse(ContextManager.Instance["ServiceOID"].ToString(), (o) => {
                    lnServiceOID = o;
                  });
            }
            objReq.servicePointOIDBC = lnServiceOID;
            objReq.MCVersionBC = AppSessionInfo.AMCV;
            objReq.medChartOIDBC = MedChartData.MedChartOID;
            objReq.patientOIDBC = PatientContext.PatientOID;
            objReq.EncounterOIDBC = PatientContext.EncounterOid;
            objReq.DuenessWindowTimeMinutesBC = MedChartData.DuenessThreshold;
            objSerive.GetAssociatedPGDListItemAsync(objReq);
        }
        objSerive_GetAssociatedPGDListItemCompleted(sender: Object, e: GetAssociatedPGDListItemCompletedEventArgs): void {
            let _ErrorID: number = 80000077;
            let _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:pgdvm, Method:objSerive_GetAssociatedPGDListItemCompleted()";
            let objRes: CResMsgGetAssociatedPGDListItem = e.Result;
            if (e.Error == null) {
                try {
                    if (objRes != null) {
                        this.ParacetamolAdministeredCount = e.Result.ParacetamolAdministeredCount;
                        if (objRes.oPGDList != null && objRes.oPGDList.Count > 0) {
                            let objPGDListDetail: ObservableCollection<PGDListVM> = new ObservableCollection<PGDListVM>();
                            let lngcount: number = objRes.oPGDList.Count;
                            for (let i: number = 0; i < lngcount; i++) {
                                let obj: PGDListVM = new PGDListVM();
                                let str: string = String.Empty;
                                if (objRes.oPGDList[i].MedicationSentences != null) {
                                    if ((objRes.oPGDList[i].MedicationSentences[0].PrescribableItem != null) && (objRes.oPGDList[i].MedicationSentences[0].PrescribableItem.Name != null)) {
                                        obj.PrescribableItem = objRes.oPGDList[i].MedicationSentences[0].PrescribableItem.Name;
                                    }
                                    let oDoseUOM: ObjectInfo = new ObjectInfo();
                                    if (objRes.oPGDList[i].MedicationSentences[0].DoseUOM != null && (objRes.oPGDList[i].MedicationSentences[0].DoseUOM.Name != null)) {
                                        oDoseUOM.Name = objRes.oPGDList[i].MedicationSentences[0].DoseUOM.Name;
                                    }
                                    if (objRes.oPGDList[i].MedicationSentences[0].DoseUOM != null && objRes.oPGDList[i].MedicationSentences[0].DoseUOM.OID > 0) {
                                        oDoseUOM.OID = (objRes.oPGDList[i].MedicationSentences[0].DoseUOM.OID > 0) ? objRes.oPGDList[i].MedicationSentences[0].DoseUOM.OID : 0;
                                    }
                                    obj.DoseUOM = oDoseUOM;
                                    let oAdminMethod: ObjectInfo = new ObjectInfo();
                                    if (objRes.oPGDList[i].MedicationSentences[0].AdminMethod != null && (objRes.oPGDList[i].MedicationSentences[0].AdminMethod.Name != null)) {
                                        oAdminMethod.Name = objRes.oPGDList[i].MedicationSentences[0].AdminMethod.Name;
                                    }
                                    if (objRes.oPGDList[i].MedicationSentences[0].AdminMethod != null && objRes.oPGDList[i].MedicationSentences[0].AdminMethod.OID > 0) {
                                        oAdminMethod.OID = (objRes.oPGDList[i].MedicationSentences[0].AdminMethod.OID > 0) ? objRes.oPGDList[i].MedicationSentences[0].AdminMethod.OID : 0;
                                    }
                                    obj.ObjAdminMethod = oAdminMethod;
                                    if (objRes.oPGDList[i].IsAuthorise == "1") {
                                        obj.IsAuthorise = false;
                                    }
                                    else {
                                        obj.IsAuthorise = true;
                                    }
                                    let oDosageForm: ObjectInfo = new ObjectInfo();
                                    if (objRes.oPGDList[i].MedicationSentences[0].DosageForm != null && (objRes.oPGDList[i].MedicationSentences[0].DosageForm.Name != null)) {
                                        oDosageForm.Name = objRes.oPGDList[i].MedicationSentences[0].DosageForm.Name;
                                    }
                                    if (objRes.oPGDList[i].MedicationSentences[0].DosageForm != null && objRes.oPGDList[i].MedicationSentences[0].DosageForm.OID > 0) {
                                        oDosageForm.OID = (objRes.oPGDList[i].MedicationSentences[0].DosageForm.OID > 0) ? objRes.oPGDList[i].MedicationSentences[0].DosageForm.OID : 0;
                                    }
                                    obj.ObjDosageForm = oDosageForm;
                                    if (objRes.oPGDList[i].MedicationSentences[0].DosageForm != null && (objRes.oPGDList[i].MedicationSentences[0].DosageForm.Name != null)) {
                                        obj.DosageForm = objRes.oPGDList[i].MedicationSentences[0].DosageForm.Name;
                                    }
                                    if (objRes.oPGDList[i].MedicationSentences[0].DoseType != null && (objRes.oPGDList[i].MedicationSentences[0].DoseType.Name != null)) {
                                        obj.DoseTye = objRes.oPGDList[i].MedicationSentences[0].DoseType.Name;
                                    }
                                    obj.DoseValue = objRes.oPGDList[i].MedicationSentences[0].DoseValue >= 0 ? objRes.oPGDList[i].MedicationSentences[0].DoseValue.ToString() : String.Empty;
                                    obj.UpperDose = objRes.oPGDList[i].MedicationSentences[0].UpperDose > 0 ? objRes.oPGDList[i].MedicationSentences[0].UpperDose.ToString() : "0";
                                    obj.Comments = objRes.oPGDList[i].MedicationSentences[0].Comments != null ? objRes.oPGDList[i].MedicationSentences[0].Comments : String.Empty;
                                    if ((objRes.oPGDList[i].MedicationSentences[0].Frequnecy != null) && (objRes.oPGDList[i].MedicationSentences[0].Frequnecy.Name != null)) {
                                        obj.Frequency = objRes.oPGDList[i].MedicationSentences[0].Frequnecy.Name;
                                        obj.FrequencyOID = objRes.oPGDList[i].MedicationSentences[0].Frequnecy.OID;
                                    }
                                    obj.PGDListName = (objRes.oPGDList[i].Name != null) ? PGDAdminstrationVM.PGDLISTPREFIX + objRes.oPGDList[i].Name : String.Empty;
                                    if ((objRes.oPGDList[i].MedicationSentences[0].Route != null) && (objRes.oPGDList[i].MedicationSentences[0].Route.Name != null)) {
                                        obj.Route = objRes.oPGDList[i].MedicationSentences[0].Route.Name;
                                        obj.RouteOID = objRes.oPGDList[i].MedicationSentences[0].Route.OID;
                                    }
                                    obj.IsParacetamolIngredient = objRes.oPGDList[i].MedicationSentences[0].IsParacetamolIngredient;
                                    if (objRes.oPGDList[i].MedicationSentences[0].IngredientWarning != null)
                                        obj.IngredientWarning = objRes.oPGDList[i].MedicationSentences[0].IngredientWarning;
                                    else obj.IngredientWarning = new ArrayOfString();
                                    obj.MaxNoOfAdministration = objRes.oPGDList[i].MedicationSentences[0].MaxNoOfAdministration;
                                    obj.PGDAdministrationCount = objRes.oPGDList[i].MedicationSentences[0].PGDAdministrationCount;
                                    obj.PGDLorenzoID = objRes.oPGDList[i].MedicationSentences[0].PGDLorenzoID;
                                    if (!String.IsNullOrEmpty(objRes.oPGDList[i].MedicationSentences[0].IsBolus)) {
                                        obj.IsSingleActionMedChart = objRes.oPGDList[i].MedicationSentences[0].IsBolus.Equals("0") ? false : true;
                                    }
                                }
                                obj.ParacetamolAdministeredCount = this.ParacetamolAdministeredCount;
                                obj.LorenzoID = (objRes.oPGDList[i].LorenzoID != null) ? objRes.oPGDList[i].LorenzoID : String.Empty;
                                obj.ParentLorenzoID = (objRes.oPGDList[i].ParentLorenzoID != null) ? objRes.oPGDList[i].ParentLorenzoID : String.Empty;
                                obj.IdentifyingOID = objRes.oPGDList[i].IdentifyingOID > 0 ? objRes.oPGDList[i].IdentifyingOID : 0;
                                obj.IdentifyingType = (!String.IsNullOrEmpty(objRes.oPGDList[i].IdentifyingType)) ? objRes.oPGDList[i].IdentifyingType : String.Empty;
                                obj.McVersionNo = (!String.IsNullOrEmpty(objRes.oPGDList[i].MCVersion)) ? objRes.oPGDList[i].MCVersion : String.Empty;
                                obj.ItemType = (!String.IsNullOrEmpty(objRes.oPGDList[i].ItemType)) ? objRes.oPGDList[i].ItemType : String.Empty;
                                obj.IsControlledDrug = (!String.IsNullOrEmpty(objRes.oPGDList[i].IsControlledDrug)) ? objRes.oPGDList[i].IsControlledDrug : String.Empty;
                                obj.ItemSubType = (!String.IsNullOrEmpty(objRes.oPGDList[i].ItemSubType)) ? objRes.oPGDList[i].ItemSubType : String.Empty;
                                obj.MultiComponentItems = objRes.oPGDList[i].MultiComponentItems;
                                obj.MCChilditem = objRes.oPGDList[i].MCchildItem;
                                obj.PgdListDetailOID = objRes.oPGDList[i].PgdListDetailOID;
                                if (objRes.oPGDList[i].FormViewParameters != null) {
                                    obj.InfusionDetails = new InfusionLineItemVM();
                                    obj.InfusionDetails.InfusionType = new CListItem();
                                    obj.InfusionDetails.InfusionType.Value = objRes.oPGDList[i].FormViewParameters.INFTYCODE;
                                    obj.InfusionDetails.InfusionType.DisplayText = CommonBB.GetText(objRes.oPGDList[i].FormViewParameters.INFTYCODE, InfusionTypeConceptCodeData.ConceptCodes);
                                    obj.InfusionDetails.DeliveryDeviceFreetext = objRes.oPGDList[i].FormViewParameters.AdminDevice;
                                    obj.InfusionDetails.Reviewafter = objRes.oPGDList[i].FormViewParameters.ReviewAfterDTTM.ToString();
                                    if (objRes.oPGDList[i].FormViewParameters.AdminDeviceData != null) {
                                        obj.InfusionDetails.BackgroundRate = objRes.oPGDList[i].FormViewParameters.AdminDeviceData.BackgroundRate;
                                        if (objRes.oPGDList[i].FormViewParameters.AdminDeviceData.BackgroundRateUOM != null && !String.IsNullOrEmpty(objRes.oPGDList[i].FormViewParameters.AdminDeviceData.BackgroundRateUOM.UOMName)) {
                                            obj.InfusionDetails.BackgroundRateNumeratorUom = ObjectHelper.CreateObject(new CListItem(), {
                                                DisplayText: objRes.oPGDList[i].FormViewParameters.AdminDeviceData.BackgroundRateUOM.UOMName,
                                                Value: objRes.oPGDList[i].FormViewParameters.AdminDeviceData.BackgroundRateUOM.UOMId.ToString()
                                            });
                                        }
                                        if (objRes.oPGDList[i].FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOM != null && !String.IsNullOrEmpty(objRes.oPGDList[i].FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOM.UOMName)) {
                                            obj.InfusionDetails.BackgroundRateDinominatorUom = ObjectHelper.CreateObject(new CListItem(), {
                                                DisplayText: objRes.oPGDList[i].FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOM.UOMName.ToString(),
                                                Value: objRes.oPGDList[i].FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOM.UOMId.ToString()
                                            });
                                        }
                                        obj.InfusionDetails.Bolus = objRes.oPGDList[i].FormViewParameters.AdminDeviceData.TopUpDose;
                                        obj.InfusionDetails.BolusUOM = ObjectHelper.CreateObject(new CListItem(), {
                                            DisplayText: objRes.oPGDList[i].FormViewParameters.AdminDeviceData.TopUpDoseUOM.UOMName,
                                            Value: objRes.oPGDList[i].FormViewParameters.AdminDeviceData.TopUpDoseUOM.UOMId.ToString()
                                        });
                                        obj.InfusionDetails.LockOutPeriod = objRes.oPGDList[i].FormViewParameters.AdminDeviceData.LockOutPeriod;
                                        obj.InfusionDetails.LockoutDuration = ObjectHelper.CreateObject(new CListItem(), {
                                            DisplayText: objRes.oPGDList[i].FormViewParameters.AdminDeviceData.LockOutPeriodUOM.UOMName,
                                            Value: objRes.oPGDList[i].FormViewParameters.AdminDeviceData.LockOutPeriodUOM.UOMId.ToString()
                                        });
                                    }
                                    if (objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData != null) {
                                        obj.InfusionDetails.TargetUpperSatRange = objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.TargetSaturationUpper;
                                        obj.InfusionDetails.TargetLowerSatRange = objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.TargetSaturationLower;
                                        obj.InfusionDetails.MaxDose = objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.MaxDose;
                                        obj.InfusionDetails.Lumen = objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.Lumen;
                                        if (objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.IsOxygen == '1')
                                            obj.InfusionDetails.IsOxygen = true;
                                        else obj.InfusionDetails.IsOxygen = false;
                                        if (!String.IsNullOrEmpty(objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.IsOnGoing))
                                            obj.InfusionDetails.IsOnGoing = objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.IsOnGoing;
                                        else obj.InfusionDetails.IsOnGoing = String.Empty;
                                        obj.InfusionDetails.Reviewafter = objRes.oPGDList[i].FormViewParameters.ReviewAfterDTTM.ToString();
                                        obj.InfusionDetails.ConcentrationFreeText = objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.Concentration.ToString();
                                        if (ProfileData.InfusionPresConfig != null && ProfileData.InfusionPresConfig.IsEnablePrescInfus) {
                                            obj.InfusionDetails.Rate = objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.Rate;
                                            if (objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.RateUOM != null && !String.IsNullOrEmpty(objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.RateUOM.UOMName)) {
                                                obj.InfusionDetails.InfRateNumeratorUom = ObjectHelper.CreateObject(new CListItem(), {
                                                    DisplayText: objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.RateUOM.UOMName,
                                                    Value: objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.RateUOM.UOMId.ToString()
                                                });
                                            }
                                            if (objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.RateDenominatorUOM != null && !String.IsNullOrEmpty(objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMName)) {
                                                obj.InfusionDetails.InfRateDinominatorUom = ObjectHelper.CreateObject(new CListItem(), {
                                                    DisplayText: objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMName.ToString(),
                                                    Value: objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMId.ToString()
                                                });
                                            }
                                        }
                                        if (!String.IsNullOrEmpty(objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.InfusionPeriod))
                                            obj.InfusionDetails.InfusionPeriod = Convert.ToInt64(objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.InfusionPeriod);
                                        if (objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM != null && !String.IsNullOrEmpty(objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM.UOMName)) {
                                            obj.InfusionDetails.InfusionPeriodUom = ObjectHelper.CreateObject(new CListItem(), {
                                                DisplayText: objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM.UOMName,
                                                Value: objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM.UOMId.ToString()
                                            });
                                        }
                                        if (objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.Fluid != null && objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.Fluid.OID > 0) {
                                            obj.InfusionDetails.FluidSelectvalue = ObjectHelper.CreateObject(new CListItem(), {
                                                DisplayText: objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.Fluid.Name,
                                                Value: objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.Fluid.OID.ToString()
                                            });
                                        }
                                        else {
                                            obj.InfusionDetails.FluidFreetext = objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.Fluid.Name;
                                        }
                                        obj.InfusionDetails.FluidVolume = objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.Volume;
                                        if (objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.VolumeUOM != null && !String.IsNullOrEmpty(objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.VolumeUOM.UOMName)) {
                                            obj.InfusionDetails.VolumeUOM = ObjectHelper.CreateObject(new CListItem(), {
                                                DisplayText: objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.VolumeUOM.UOMName,
                                                Value: objRes.oPGDList[i].FormViewParameters.IntravenousInfusionData.VolumeUOM.UOMId.ToString()
                                            });
                                        }
                                    }
                                    obj.InfusionDetails.IsInfusion = objRes.oPGDList[i].MedicationSentences[0].IsInfusion;
                                }
                                if (!String.IsNullOrEmpty(objRes.oPGDList[i].MCchildItem)) {
                                    obj.Multicompoentndetails = new ObservableCollection<IPPMCPresctiptionItem>();
                                    let UniqueID: Random = new Random();
                                    obj.MCChilditem = objRes.oPGDList[i].MCchildItem;
                                    let sMCitemSerialize: string[] = obj.MCChilditem.Split('^');
                                    if (sMCitemSerialize != null && sMCitemSerialize.length > 0) {
                                        let sProblemDetails: StringBuilder = new StringBuilder();
                                        let sProblemName: StringBuilder = new StringBuilder();
                                        for (let ncount: number = 0; ncount <= sMCitemSerialize.length - 1; ncount++) {
                                            let objMulti: IPPMCPresctiptionItem = new IPPMCPresctiptionItem();
                                            let stmp: string[] = sMCitemSerialize[ncount].Split('~');
                                            let lnPrescribableItemListOID: number = 0;
                                            Number.TryParse(stmp[0], (o) => {
                                                lnPrescribableItemListOID = o;
                                              });
                                            objMulti.PrescribableItemListOID = lnPrescribableItemListOID;
                                            let lnidentifyingoid: number = 0;
                                            Number.TryParse(stmp[1], (o) => {
                                                lnidentifyingoid = o;
                                              });
                                            objMulti.IdentifyingOID = lnidentifyingoid;
                                            objMulti.IdentifyingType = stmp[2];
                                            objMulti.ComponentName = stmp[3];
                                            objMulti.LorenzoID = stmp[8];
                                            objMulti.Quantity = stmp[4];
                                            let lnQuantityuomoid: number = 0;
                                            Number.TryParse(stmp[5], (o) => {
                                                lnQuantityuomoid = o;
                                              });
                                            objMulti.QuantityUOMOID = lnQuantityuomoid;
                                            if (stmp[6] == "1")
                                                objMulti.IsUpto = true;
                                            else objMulti.IsUpto = false;
                                            if (stmp[9] == "1")
                                                objMulti.IsNonFormulary = true;
                                            else objMulti.IsNonFormulary = false;
                                            objMulti.UniqueMCRowID = UniqueID.Next();
                                            obj.Multicompoentndetails.Add(objMulti);
                                        }
                                    }
                                }
                                obj.IsCopyAcross = true;
                                let AllowPGDAdministration: boolean = (obj.MaxNoOfAdministration == 0 || (obj.MaxNoOfAdministration > 0 && obj.PGDAdministrationCount < obj.MaxNoOfAdministration));
                                if (!AllowPGDAdministration) {
                                    obj.IsCopyAcross = false;
                                    obj.CopyAcrossTooltip = Resource.RecordPGD.MaxNoOfAdministration_Warning;
                                }
                                else if (!obj.IsAuthorise) {
                                    obj.IsCopyAcross = false;
                                    obj.CopyAcrossTooltip = Resource.RecordPGD.PGD_List_Disable;
                                }
                                obj.PGDUsed = String.Empty;
                                if (obj.MaxNoOfAdministration > 0) {
                                    obj.PGDUsed = obj.PGDAdministrationCount + " of " + obj.MaxNoOfAdministration;
                                }
                                else if (obj.MaxNoOfAdministration == 0 && obj.PGDAdministrationCount > 0) {
                                    obj.PGDUsed = Convert.ToString(obj.PGDAdministrationCount);
                                }
                                if (obj.MaxNoOfAdministration > 0 && obj.PGDAdministrationCount > 0 && obj.PGDAdministrationCount >= obj.MaxNoOfAdministration) {
                                    obj.IsMaxAdministrationReached = true;
                                }
                                if (obj.PGDAdministrationCount > 0 && !String.IsNullOrEmpty(obj.PGDUsed)) {
                                    obj.PGDUsedTooltip = obj.PGDUsed + Resource.RecordPGD.PGDUsed_Tooltip;
                                }
                                objPGDListDetail.Add(obj);
                            }
                            this.PgdListDetailsServicePoint = objPGDListDetail;
                            if (this.PgdListDetailsServicePoint != null && this.PgdListDetailsServicePoint.Count > 0) {
                                this.PGDListNameServicePoint = this.PgdListDetailsServicePoint[0].PGDListName;
                                this.IsSPExpanded = true;
                                this.IsPGDListEnabledServicePoint = true;
                            }
                            else {
                                this.IsPGDListEnabledServicePoint = false;
                                this.IsSPExpanded = false;
                            }
                        }
                        if (objRes != null && objRes.IsPatTransAct || objRes.IsClinicalEncouter) {
                            this.IsPatientTransferd = Visibility.Visible;
                        }
                        else {
                            this.IsPatientTransferd = Visibility.Collapsed;
                        }
                        this.dataLoadEvent.emit(true);

                        if (objRes.oPGDListRole != null && objRes.oPGDListRole.Count > 0) {
                            let objPGDListDetailRole: ObservableCollection<PGDListVM> = new ObservableCollection<PGDListVM>();
                            let lngcount: number = objRes.oPGDListRole.Count;
                            for (let i: number = 0; i < lngcount; i++) {
                                let obj: PGDListVM = new PGDListVM();
                                let str: string = String.Empty;
                                if (objRes.oPGDListRole[i].MedicationSentences != null) {
                                    if ((objRes.oPGDListRole[i].MedicationSentences[0].PrescribableItem != null) && (objRes.oPGDListRole[i].MedicationSentences[0].PrescribableItem.Name != null)) {
                                        obj.PrescribableItem = objRes.oPGDListRole[i].MedicationSentences[0].PrescribableItem.Name;
                                    }
                                    let oDoseUOM: ObjectInfo = new ObjectInfo();
                                    if (objRes.oPGDListRole[i].MedicationSentences[0].DoseUOM != null && (objRes.oPGDListRole[i].MedicationSentences[0].DoseUOM.Name != null)) {
                                        oDoseUOM.Name = objRes.oPGDListRole[i].MedicationSentences[0].DoseUOM.Name;
                                    }
                                    if (objRes.oPGDListRole[i].MedicationSentences[0].DoseUOM != null && objRes.oPGDListRole[i].MedicationSentences[0].DoseUOM.OID > 0) {
                                        oDoseUOM.OID = (objRes.oPGDListRole[i].MedicationSentences[0].DoseUOM.OID > 0) ? objRes.oPGDListRole[i].MedicationSentences[0].DoseUOM.OID : 0;
                                    }
                                    obj.DoseUOM = oDoseUOM;
                                    let oDosageForm: ObjectInfo = new ObjectInfo();
                                    if (objRes.oPGDListRole[i].MedicationSentences[0].DosageForm != null && (objRes.oPGDListRole[i].MedicationSentences[0].DosageForm.Name != null)) {
                                        oDosageForm.Name = objRes.oPGDListRole[i].MedicationSentences[0].DosageForm.Name;
                                    }
                                    if (objRes.oPGDListRole[i].MedicationSentences[0].DosageForm != null && objRes.oPGDListRole[i].MedicationSentences[0].DosageForm.OID > 0) {
                                        oDosageForm.OID = (objRes.oPGDListRole[i].MedicationSentences[0].DosageForm.OID > 0) ? objRes.oPGDListRole[i].MedicationSentences[0].DosageForm.OID : 0;
                                    }
                                    obj.ObjDosageForm = oDosageForm;
                                    let oAdminMethod: ObjectInfo = new ObjectInfo();
                                    if (objRes.oPGDListRole[i].MedicationSentences[0].AdminMethod != null && (objRes.oPGDListRole[i].MedicationSentences[0].AdminMethod.Name != null)) {
                                        oAdminMethod.Name = objRes.oPGDListRole[i].MedicationSentences[0].AdminMethod.Name;
                                    }
                                    if (objRes.oPGDListRole[i].MedicationSentences[0].AdminMethod != null && objRes.oPGDListRole[i].MedicationSentences[0].AdminMethod.OID > 0) {
                                        oAdminMethod.OID = (objRes.oPGDListRole[i].MedicationSentences[0].AdminMethod.OID > 0) ? objRes.oPGDListRole[i].MedicationSentences[0].AdminMethod.OID : 0;
                                    }
                                    obj.ObjAdminMethod = oAdminMethod;
                                    if (objRes.oPGDListRole[i].MedicationSentences[0].DosageForm != null && (objRes.oPGDListRole[i].MedicationSentences[0].DosageForm.Name != null)) {
                                        obj.DosageForm = objRes.oPGDListRole[i].MedicationSentences[0].DosageForm.Name;
                                    }
                                    if (objRes.oPGDListRole[i].MedicationSentences[0].DoseType != null && (objRes.oPGDListRole[i].MedicationSentences[0].DoseType.Name != null)) {
                                        obj.DoseTye = objRes.oPGDListRole[i].MedicationSentences[0].DoseType.Name;
                                    }
                                    obj.DoseValue = objRes.oPGDListRole[i].MedicationSentences[0].DoseValue > 0 ? objRes.oPGDListRole[i].MedicationSentences[0].DoseValue.ToString() : String.Empty;
                                    obj.UpperDose = objRes.oPGDList[i].MedicationSentences[0].UpperDose > 0 ? objRes.oPGDList[i].MedicationSentences[0].UpperDose.ToString() : "0";
                                    obj.Comments = objRes.oPGDListRole[i].MedicationSentences[0].Comments != null ? objRes.oPGDListRole[i].MedicationSentences[0].Comments : String.Empty;
                                    if ((objRes.oPGDListRole[i].MedicationSentences[0].Frequnecy != null) && (objRes.oPGDListRole[i].MedicationSentences[0].Frequnecy.Name != null)) {
                                        obj.Frequency = objRes.oPGDListRole[i].MedicationSentences[0].Frequnecy.Name;
                                        obj.FrequencyOID = objRes.oPGDListRole[i].MedicationSentences[0].Frequnecy.OID;
                                    }
                                    obj.PGDListName = (objRes.oPGDListRole[i].Name != null) ? PGDAdminstrationVM.PGDLISTPREFIX + objRes.oPGDListRole[i].Name : String.Empty;
                                    if ((objRes.oPGDListRole[i].MedicationSentences[0].Route != null) && (objRes.oPGDListRole[i].MedicationSentences[0].Route.Name != null)) {
                                        obj.Route = objRes.oPGDListRole[i].MedicationSentences[0].Route.Name;
                                        obj.RouteOID = objRes.oPGDListRole[i].MedicationSentences[0].Route.OID;
                                    }
                                    obj.IsParacetamolIngredient = objRes.oPGDListRole[i].MedicationSentences[0].IsParacetamolIngredient;
                                    if (objRes.oPGDListRole[i].MedicationSentences[0].IngredientWarning != null)
                                        obj.IngredientWarning = objRes.oPGDListRole[i].MedicationSentences[0].IngredientWarning;
                                    else obj.IngredientWarning = new ArrayOfString();
                                    obj.ParacetamolAdministeredCount = this.ParacetamolAdministeredCount;
                                    obj.LorenzoID = (objRes.oPGDListRole[i].LorenzoID != null) ? objRes.oPGDListRole[i].LorenzoID : String.Empty;
                                    obj.ParentLorenzoID = (objRes.oPGDListRole[i].ParentLorenzoID != null) ? objRes.oPGDListRole[i].ParentLorenzoID : String.Empty;
                                    obj.IdentifyingOID = objRes.oPGDListRole[i].IdentifyingOID > 0 ? objRes.oPGDListRole[i].IdentifyingOID : 0;
                                    obj.IdentifyingType = (!String.IsNullOrEmpty(objRes.oPGDListRole[i].IdentifyingType)) ? objRes.oPGDListRole[i].IdentifyingType : String.Empty;
                                    obj.McVersionNo = (!String.IsNullOrEmpty(objRes.oPGDListRole[i].MCVersion)) ? objRes.oPGDListRole[i].MCVersion : String.Empty;
                                    obj.ItemType = (!String.IsNullOrEmpty(objRes.oPGDListRole[i].ItemType)) ? objRes.oPGDListRole[i].ItemType : String.Empty;
                                    obj.IsControlledDrug = (!String.IsNullOrEmpty(objRes.oPGDListRole[i].IsControlledDrug)) ? objRes.oPGDListRole[i].IsControlledDrug : String.Empty;
                                    obj.ItemSubType = (!String.IsNullOrEmpty(objRes.oPGDListRole[i].ItemSubType)) ? objRes.oPGDListRole[i].ItemSubType : String.Empty;
                                    obj.MultiComponentItems = objRes.oPGDListRole[i].MultiComponentItems;
                                    obj.PgdListDetailOID = objRes.oPGDListRole[i].PgdListDetailOID;
                                    if (!String.IsNullOrEmpty(objRes.oPGDListRole[i].MCchildItem)) {
                                        obj.Multicompoentndetails = new ObservableCollection<IPPMCPresctiptionItem>();
                                        let UniqueID: Random = new Random();
                                        obj.MCChilditem = objRes.oPGDListRole[i].MCchildItem;
                                        let sMCitemSerialize: string[] = obj.MCChilditem.Split('^');
                                        if (sMCitemSerialize != null && sMCitemSerialize.length > 0) {
                                            let sProblemDetails: StringBuilder = new StringBuilder();
                                            let sProblemName: StringBuilder = new StringBuilder();
                                            for (let ncount: number = 0; ncount <= sMCitemSerialize.length - 1; ncount++) {
                                                let objMulti: IPPMCPresctiptionItem = new IPPMCPresctiptionItem();
                                                let stmp: string[] = sMCitemSerialize[ncount].Split('~');
                                                let lnPrescribableItemListOID: number = 0;
                                                Number.TryParse(stmp[0],  (o) => {
                                                    lnPrescribableItemListOID = o;
                                                  });
                                                objMulti.PrescribableItemListOID = lnPrescribableItemListOID;
                                                let lnidentifyingoid: number = 0;
                                                Number.TryParse(stmp[1], (o) => {
                                                    lnidentifyingoid = o;
                                                  });
                                                objMulti.IdentifyingOID = lnidentifyingoid;
                                                objMulti.IdentifyingType = stmp[2];
                                                objMulti.ComponentName = stmp[3];
                                                objMulti.LorenzoID = stmp[8];
                                                objMulti.Quantity = stmp[4];
                                                let lnQuantityuomoid: number = 0;
                                                Number.TryParse(stmp[5], (o) => {
                                                    lnQuantityuomoid = o;
                                                  });
                                                objMulti.QuantityUOMOID = lnQuantityuomoid;
                                                if (stmp[6] == "1")
                                                    objMulti.IsUpto = true;
                                                else objMulti.IsUpto = false;
                                                if (stmp[9] == "1")
                                                    objMulti.IsNonFormulary = true;
                                                else objMulti.IsNonFormulary = false;
                                                objMulti.UniqueMCRowID = UniqueID.Next();
                                                obj.Multicompoentndetails.Add(objMulti);
                                            }
                                        }
                                    }
                                    if (objRes.oPGDListRole[i].FormViewParameters != null) {
                                        obj.InfusionDetails = new InfusionLineItemVM();
                                        obj.InfusionDetails.InfusionType = new CListItem();
                                        obj.InfusionDetails.InfusionType.Value = objRes.oPGDListRole[i].FormViewParameters.INFTYCODE;
                                        obj.InfusionDetails.InfusionType.DisplayText = CommonBB.GetText(objRes.oPGDListRole[i].FormViewParameters.INFTYCODE, InfusionTypeConceptCodeData.ConceptCodes);
                                        obj.InfusionDetails.DeliveryDeviceFreetext = objRes.oPGDListRole[i].FormViewParameters.AdminDevice;
                                        obj.InfusionDetails.Reviewafter = objRes.oPGDListRole[i].FormViewParameters.ReviewAfterDTTM.ToString();
                                        if (objRes.oPGDListRole[i].FormViewParameters.AdminDeviceData != null) {
                                            obj.InfusionDetails.BackgroundRate = objRes.oPGDListRole[i].FormViewParameters.AdminDeviceData.BackgroundRate;
                                            if (objRes.oPGDListRole[i].FormViewParameters.AdminDeviceData.BackgroundRateUOM != null && !String.IsNullOrEmpty(objRes.oPGDListRole[i].FormViewParameters.AdminDeviceData.BackgroundRateUOM.UOMName)) {
                                                obj.InfusionDetails.BackgroundRateNumeratorUom = ObjectHelper.CreateObject(new CListItem(), {
                                                    DisplayText: objRes.oPGDListRole[i].FormViewParameters.AdminDeviceData.BackgroundRateUOM.UOMName,
                                                    Value: objRes.oPGDListRole[i].FormViewParameters.AdminDeviceData.BackgroundRateUOM.UOMId.ToString()
                                                });
                                            }
                                            if (objRes.oPGDListRole[i].FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOM != null && !String.IsNullOrEmpty(objRes.oPGDListRole[i].FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOM.UOMName)) {
                                                obj.InfusionDetails.BackgroundRateDinominatorUom = ObjectHelper.CreateObject(new CListItem(), {
                                                    DisplayText: objRes.oPGDListRole[i].FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOM.UOMName.ToString(),
                                                    Value: objRes.oPGDListRole[i].FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOM.UOMId.ToString()
                                                });
                                            }
                                            obj.InfusionDetails.Bolus = objRes.oPGDListRole[i].FormViewParameters.AdminDeviceData.TopUpDose;
                                            obj.InfusionDetails.BolusUOM = ObjectHelper.CreateObject(new CListItem(), {
                                                DisplayText: objRes.oPGDListRole[i].FormViewParameters.AdminDeviceData.TopUpDoseUOM.UOMName,
                                                Value: objRes.oPGDListRole[i].FormViewParameters.AdminDeviceData.TopUpDoseUOM.UOMId.ToString()
                                            });
                                            obj.InfusionDetails.LockOutPeriod = objRes.oPGDListRole[i].FormViewParameters.AdminDeviceData.LockOutPeriod;
                                            obj.InfusionDetails.LockoutDuration = ObjectHelper.CreateObject(new CListItem(), {
                                                DisplayText: objRes.oPGDListRole[i].FormViewParameters.AdminDeviceData.LockOutPeriodUOM.UOMName,
                                                Value: objRes.oPGDListRole[i].FormViewParameters.AdminDeviceData.LockOutPeriodUOM.UOMId.ToString()
                                            });
                                            obj.InfusionDetails.IsInfusion = objRes.oPGDListRole[i].MedicationSentences[0].IsInfusion;
                                        }
                                        if (objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData != null) {
                                            obj.InfusionDetails.TargetUpperSatRange = objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.TargetSaturationUpper;
                                            obj.InfusionDetails.TargetLowerSatRange = objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.TargetSaturationLower;
                                            obj.InfusionDetails.MaxDose = objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.MaxDose;
                                            obj.InfusionDetails.Lumen = objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.Lumen;
                                            if (objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.IsOxygen == '1')
                                                obj.InfusionDetails.IsOxygen = true;
                                            else obj.InfusionDetails.IsOxygen = false;
                                            if (!String.IsNullOrEmpty(objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.IsOnGoing))
                                                obj.InfusionDetails.IsOnGoing = objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.IsOnGoing;
                                            else obj.InfusionDetails.IsOnGoing = String.Empty;
                                            obj.InfusionDetails.Reviewafter = objRes.oPGDListRole[i].FormViewParameters.ReviewAfterDTTM.ToString();
                                            obj.InfusionDetails.ConcentrationFreeText = objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.Concentration.ToString();
                                            obj.InfusionDetails.Rate = objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.Rate;
                                            if (objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.RateUOM != null && !String.IsNullOrEmpty(objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.RateUOM.UOMName)) {
                                                obj.InfusionDetails.InfRateNumeratorUom = ObjectHelper.CreateObject(new CListItem(), {
                                                    DisplayText: objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.RateUOM.UOMName,
                                                    Value: objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.RateUOM.UOMId.ToString()
                                                });
                                            }
                                            if (objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.RateDenominatorUOM != null && !String.IsNullOrEmpty(objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMName)) {
                                                obj.InfusionDetails.InfRateDinominatorUom = ObjectHelper.CreateObject(new CListItem(), {
                                                    DisplayText: objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMName.ToString(),
                                                    Value: objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMId.ToString()
                                                });
                                            }
                                            if (!String.IsNullOrEmpty(objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.InfusionPeriod))
                                                obj.InfusionDetails.InfusionPeriod = Convert.ToInt64(objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.InfusionPeriod);
                                            if (objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM != null && !String.IsNullOrEmpty(objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM.UOMName)) {
                                                obj.InfusionDetails.InfusionPeriodUom = ObjectHelper.CreateObject(new CListItem(), {
                                                    DisplayText: objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM.UOMName,
                                                    Value: objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM.UOMId.ToString()
                                                });
                                            }
                                            if (objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.Fluid != null && objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.Fluid.OID > 0) {
                                                obj.InfusionDetails.FluidSelectvalue = ObjectHelper.CreateObject(new CListItem(), {
                                                    DisplayText: objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.Fluid.Name,
                                                    Value: objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.Fluid.OID.ToString()
                                                });
                                            }
                                            else {
                                                obj.InfusionDetails.FluidFreetext = objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.Fluid.Name;
                                            }
                                            obj.InfusionDetails.FluidVolume = objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.Volume;
                                            if (objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.VolumeUOM != null && !String.IsNullOrEmpty(objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.VolumeUOM.UOMName)) {
                                                obj.InfusionDetails.VolumeUOM = ObjectHelper.CreateObject(new CListItem(), {
                                                    DisplayText: objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.VolumeUOM.UOMName,
                                                    Value: objRes.oPGDListRole[i].FormViewParameters.IntravenousInfusionData.VolumeUOM.UOMId.ToString()
                                                });
                                            }
                                        }
                                    }
                                    objPGDListDetailRole.Add(obj);
                                }
                            }
                            this.PgdListDetailsRole = objPGDListDetailRole;
                            if (this.PgdListDetailsRole != null && this.PgdListDetailsRole.Count > 0) {
                                this.PGDListNameRole = this.PgdListDetailsRole[0].PGDListName;
                                if (!this.IsSPExpanded) {
                                    this.IsRoleExpanded = true;
                                }
                                this.IsPGDListEnabledRole = true;
                            }
                            else {
                                this.IsPGDListEnabledRole = false;
                                this.IsRoleExpanded = false;
                            }
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
            Busyindicator.SetStatusIdle("MN_RECORDPGD_P2");
            Busyindicator.SetStatusIdle("RecordPgd");
        }
        public RecordPGD(OID: number): void {
            if (this == null)
                return;

            //PAN 215 Fix
            this.ReTryCount++;
           
            let objSerive: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
            objSerive.RecordPGDCompleted  = (s,e) => { this.objSerive_RecordPGDCompleted(s,e); } ;
            let req: CReqMsgRecordPGD = new CReqMsgRecordPGD();
            req.oContextInformation = CommonBB.FillContext();
            let oPGDAdministration: PGDAdministration = new PGDAdministration();
            req.oPGDAdministrationBC = oPGDAdministration;
            req.sRoleNameBC = AppContextInfo.RoleProfileName;
            req.nEncounterOIDBC = ChartContext.EncounterOID;
            req.oPGDAdministrationBC.AdministeredBy = new ObservableCollection<ObjectInfo>();
            if (!String.IsNullOrEmpty(this.Dose)) {
                req.oPGDAdministrationBC.AdministeredDose = Convert.ToDouble(this.Dose);
            }
            if (!String.IsNullOrEmpty(this.AdministeredByOID)) {
                req.oPGDAdministrationBC.AdministeredBy.Add(ObjectHelper.CreateObject(new ObjectInfo(), { OID: (Convert.ToInt64(this.AdministeredByOID) > 0) ? Convert.ToInt64(this.AdministeredByOID) : 0, Name: (this.AdministeredBy != null) ? this.AdministeredBy : String.Empty }));
            }
            req.oPGDAdministrationBC.AdministrationDate = this.AdministrationDate.AddDateAdjustment();
            req.oPGDAdministrationBC.AdministrationTime = this.AdministrationTime;
            req.oPGDAdministrationBC.BatchNo = (!String.IsNullOrEmpty(this.BatchNo)) ? this.BatchNo : String.Empty;
            req.oPGDAdministrationBC.Comments = this.Comments;
            req.oPGDAdministrationBC.ExpiryDate = this.ExpiryDate;
            req.oPGDAdministrationBC.LastModifiedAt = this.AdministrationTime;
            req.oPGDAdministrationBC.MedicationAction = SlotStatus.GIVEN;
            req.oPGDAdministrationBC.IsMergedPatient = (PatientContext.PatientOID > 0 && PatientContext.MergedPatientOID > 0 && PatientContext.PatientOID != PatientContext.MergedPatientOID) ? "1" : "0";
            req.oPGDAdministrationBC.PGDList = new PGDList();
            req.oPGDAdministrationBC.PGDList.MCVersion = AppSessionInfo.AMCV;
            let oWarngDetail: ObservableCollection<WarningDetails> = new ObservableCollection<WarningDetails>(this.WarngDetail.OrderBy(x => x.WarningBehaviourType).ThenBy(y => y.DisplaySequenceNumber));
            req.oPGDAdministrationBC.PGDList.Warningdetails = oWarngDetail;
            req.oPGDAdministrationBC.PGDList.IsNoWitnessAvailable = this.blnIsNoWitnessAvailable;
            if (this.blnIsNoWitnessAvailable == true) {
                req.oPGDAdministrationBC.PGDList.WitnessBy = "";
                req.oPGDAdministrationBC.PGDList.WitnessByOID = "0";
            }
            else {
                req.oPGDAdministrationBC.PGDList.WitnessBy = this.WitnessBy;
                req.oPGDAdministrationBC.PGDList.WitnessByOID = this.WitnessByOID;
            }
            req.oPGDAdministrationBC.PGDList.MedicationSentences = new ObservableCollection<PGDListDetail>();
            let oPGDListDetail: PGDListDetail = new PGDListDetail();
            if (OID > 0) {
                let selectedInfo:IEnumerable<PGDListVM> = null;
                if (this.PgdListDetailsServicePoint != null) {
                    selectedInfo = this.PgdListDetailsServicePoint.Where(lnqPGDList =>lnqPGDList.PgdListDetailOID==OID).Select(lnqPGDList => lnqPGDList);
                }
                if ((selectedInfo == null || selectedInfo.Count() == 0) && this.PgdListDetailsRole != null) {
                    selectedInfo = this.PgdListDetailsRole.Where(lnqPGDList =>lnqPGDList.IdentifyingOID==OID).Select(lnqPGDList => lnqPGDList);
                }
                if (selectedInfo != null) {
                    selectedInfo.forEach( (lnqPGDList)=> {
                        req.oPGDAdministrationBC.PGDList.LorenzoID = (!String.IsNullOrEmpty(lnqPGDList.LorenzoID)) ? lnqPGDList.LorenzoID : String.Empty;
                        req.oPGDAdministrationBC.PGDList.IdentifyingOID = (lnqPGDList.IdentifyingOID > 0 ? lnqPGDList.IdentifyingOID : 0);
                        req.oPGDAdministrationBC.PGDList.IdentifyingType = (!String.IsNullOrEmpty(lnqPGDList.IdentifyingType) ? lnqPGDList.IdentifyingType : String.Empty);
                        req.oPGDAdministrationBC.PGDList.ItemSubType = (!String.IsNullOrEmpty(lnqPGDList.ItemSubType) ? lnqPGDList.ItemSubType : String.Empty);
                        if (!String.IsNullOrEmpty(lnqPGDList.PrescribableItem)) {
                            let oPrescribableItem: ObjectInfo = new ObjectInfo();
                            oPrescribableItem.Name = lnqPGDList.PrescribableItem;
                            oPGDListDetail.PrescribableItem = oPrescribableItem;
                        }
                        if ((lnqPGDList.DoseUOM != null) && (lnqPGDList.DoseUOM.Name != null)) {
                            let oDoseUOM: ObjectInfo = new ObjectInfo();
                            oDoseUOM.Name = lnqPGDList.DoseUOM.Name;
                            oDoseUOM.OID = (lnqPGDList.DoseUOM.OID > 0) ? lnqPGDList.DoseUOM.OID : 0;
                            oPGDListDetail.DoseUOM = oDoseUOM;
                        }
                        if ((lnqPGDList.ObjAdminMethod != null) && (lnqPGDList.ObjAdminMethod.Name != null)) {
                            let oAdminMethod: ObjectInfo = new ObjectInfo();
                            oAdminMethod.Name = lnqPGDList.ObjAdminMethod.Name;
                            oAdminMethod.OID = (lnqPGDList.ObjAdminMethod.OID > 0) ? lnqPGDList.ObjAdminMethod.OID : 0;
                            oPGDListDetail.AdminMethod = oAdminMethod;
                        }
                        if ((lnqPGDList.ObjDosageForm != null) && (lnqPGDList.ObjDosageForm.Name != null)) {
                            let oObjDosageForm: ObjectInfo = new ObjectInfo();
                            oObjDosageForm.Name = lnqPGDList.ObjDosageForm.Name;
                            oObjDosageForm.OID = (lnqPGDList.ObjDosageForm.OID > 0) ? lnqPGDList.ObjDosageForm.OID : 0;
                            oPGDListDetail.DosageForm = oObjDosageForm;
                        }
                        if (!String.IsNullOrEmpty(lnqPGDList.DoseValue)) {
                            oPGDListDetail.DoseValue = Convert.ToDouble(lnqPGDList.DoseValue);
                        }
                        if (!String.IsNullOrEmpty(lnqPGDList.UpperDose)) {
                            oPGDListDetail.UpperDose = Convert.ToDouble(lnqPGDList.UpperDose);
                        }
                        if (!String.IsNullOrEmpty(lnqPGDList.Frequency) && lnqPGDList.FrequencyOID > 0) {
                            oPGDListDetail.Frequnecy = ObjectHelper.CreateObject(new ObjectInfo(), { Name: lnqPGDList.Frequency, OID: lnqPGDList.FrequencyOID });
                        }
                        if (!String.IsNullOrEmpty(lnqPGDList.Route) && lnqPGDList.RouteOID > 0) {
                            oPGDListDetail.Route = ObjectHelper.CreateObject(new ObjectInfo(), { Name: lnqPGDList.Route, OID: lnqPGDList.RouteOID });
                        }
                        if (!String.IsNullOrEmpty(lnqPGDList.IsControlledDrug) && lnqPGDList.IsControlledDrug == "1")
                            req.oPGDAdministrationBC.PGDList.IsControlledDrug = (!String.IsNullOrEmpty(lnqPGDList.IsControlledDrug)) ? lnqPGDList.IsControlledDrug : String.Empty;
                        else req.oPGDAdministrationBC.PGDList.IsControlledDrug = String.Empty;
                        if (!String.IsNullOrEmpty(lnqPGDList.ParentLorenzoID)) {
                            req.oPGDAdministrationBC.PGDList.ParentLorenzoID = lnqPGDList.ParentLorenzoID;
                        }
                        if (lnqPGDList.Multicompoentndetails != null && lnqPGDList.Multicompoentndetails.Count > 0) {
                            req.oPGDAdministrationBC.PGDList.MultiComponentDetails = new ObservableCollection<IPPMCPresctiptionItem>();
                            let nPresCount: number = lnqPGDList.Multicompoentndetails.Count;
                            for (let ncount: number = 0; ncount < nPresCount; ncount++) {
                                let objMulti: IPPMCPresctiptionItem = new IPPMCPresctiptionItem();
                                objMulti.ComponentName = lnqPGDList.Multicompoentndetails[ncount].ComponentName;
                                objMulti.IdentifyingOID = lnqPGDList.Multicompoentndetails[ncount].IdentifyingOID;
                                objMulti.IdentifyingType = lnqPGDList.Multicompoentndetails[ncount].IdentifyingType;
                                objMulti.Quantity = lnqPGDList.Multicompoentndetails[ncount].Quantity;
                                objMulti.QuantityUOM = lnqPGDList.Multicompoentndetails[ncount].QuantityUOM;
                                objMulti.IsUpto = lnqPGDList.Multicompoentndetails[ncount].IsUpto;
                                objMulti.IsNonFormulary = lnqPGDList.Multicompoentndetails[ncount].IsNonFormulary;
                                objMulti.isEditable = lnqPGDList.Multicompoentndetails[ncount].isEditable;
                                objMulti.DisplayOrder = lnqPGDList.Multicompoentndetails[ncount].DisplayOrder;
                                objMulti.PrescribableItemListOID = lnqPGDList.Multicompoentndetails[ncount].PrescribableItemListOID;
                                objMulti.UniqueMCRowID = lnqPGDList.Multicompoentndetails[ncount].UniqueMCRowID;
                                objMulti.ConflictsExist = lnqPGDList.Multicompoentndetails[ncount].ConflictsExist;
                                if (lnqPGDList.Multicompoentndetails[ncount].QuantityUOMOID > 0)
                                    objMulti.QuantityUOMOID = lnqPGDList.Multicompoentndetails[ncount].QuantityUOMOID;
                                req.oPGDAdministrationBC.PGDList.MultiComponentDetails.Add(objMulti);
                            }
                        }
                        oPGDListDetail.MaxNoOfAdministration = lnqPGDList.MaxNoOfAdministration;
                        oPGDListDetail.PGDLorenzoID = lnqPGDList.PGDLorenzoID;
                        let lServicePointOID: number = MedChartData.ServiceOID;
                        if (lServicePointOID == 0 && ContextManager.Instance["ServiceOID"] != null) {
                            Number.TryParse(ContextManager.Instance["ServiceOID"].ToString(), (o)=>{
                                lServicePointOID = o;
                            });
                        }
                        req.oPGDAdministrationBC.PGDList.ServiceOID = lServicePointOID;
                        oPGDListDetail.IsInfusion = lnqPGDList.InfusionDetails != null ? lnqPGDList.InfusionDetails.IsInfusion : false;
                        if (oPGDListDetail.IsInfusion) {
                            oPGDListDetail.IsBolus = lnqPGDList.IsSingleActionMedChart ? "1" : "0";
                        }
                        oPGDListDetail.InfusionRate = lnqPGDList.InfusionDetails.Rate;
                        if (lnqPGDList.InfusionDetails.InfRateNumeratorUom != null) {
                            let InfusionRateUOM: ObjectInfo = new ObjectInfo();
                            InfusionRateUOM.Name = lnqPGDList.InfusionDetails.InfRateNumeratorUom.DisplayText;
                            InfusionRateUOM.OID = Convert.ToInt64(lnqPGDList.InfusionDetails.InfRateNumeratorUom.Value);
                            oPGDListDetail.InfusionRateNumUOM = InfusionRateUOM;
                        }
                        if (lnqPGDList.InfusionDetails.InfRateDinominatorUom != null) {
                            let InfusionRateDenUOM: ObjectInfo = new ObjectInfo();
                            InfusionRateDenUOM.Name = lnqPGDList.InfusionDetails.InfRateDinominatorUom.DisplayText;
                            InfusionRateDenUOM.OID = Convert.ToInt64(lnqPGDList.InfusionDetails.InfRateDinominatorUom.Value);
                            oPGDListDetail.InfusionRateDenoUOM = InfusionRateDenUOM;
                        }
                    });
                }
                req.oPGDAdministrationBC.PGDList.MedicationSentences.Add(oPGDListDetail);
                if (this.ConflictAck != null && oPGDAdministration != null && oPGDAdministration.PGDList != null && oPGDAdministration.PGDList.Warningdetails != null) {
                    for (let i: number = 0; i < this.ConflictAck.length; i++) {
                        let details = oPGDAdministration.PGDList.Warningdetails.Where(x => x.UniqueMCRowID == this.ConflictAck[i].RowId).FirstOrDefault();
                        if (details != null) {
                            details.AcknowledgeStatus = this.ConflictAck[i].IsAcknowledged ? "Acknowledged" : "UnAcknowledged";
                            details.PrescriberComments = this.ConflictAck[i].Reason;
                        }
                    }
                }
                objSerive.RecordPGDAsync(req);
            }
        }
        objSerive_RecordPGDCompleted(sender: Object, e: RecordPGDCompletedEventArgs): void {
            let _ErrorID: number = 80000076;
            let _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:pgdvm, Method:objSerive_RecordPGDCompleted()";
            let objResRecordPGD: CResMsgRecordPGD;
            //RF PAN 215
            this.SubmitDrugsDone = true;

            if (e.Error == null) {
                try {
                    objResRecordPGD = e.Result;
                    if (objResRecordPGD != null && objResRecordPGD.oContextInformation != null && objResRecordPGD.oContextInformation.Errors != null && objResRecordPGD.oContextInformation.Errors.Count > 0 && objResRecordPGD.oContextInformation.Errors[0] != null
                        && (objResRecordPGD.oContextInformation.Errors[0].ErrorID > 0 || objResRecordPGD.oContextInformation.Errors[0].ErrorID == -1)) {
                        let oMsgBox: iMessageBox = new iMessageBox();
                        oMsgBox.MessageBoxClose  = (s,e) => { this.oMsgBox_MessageBoxClose(s,e); } ;
                        oMsgBox.Title = "Error - Lorenzo";
                        oMsgBox.MessageButton = MessageBoxButton.OK;
                        oMsgBox.IconType = MessageBoxType.Critical;
                        if (objResRecordPGD.oContextInformation.Errors[0].ErrorID == 123451) {
                            oMsgBox.Height = 170;
                            oMsgBox.Width = 350;
                            oMsgBox.Message = Resource.RecordPGD._123451_Msg;
                        }
                        else if (objResRecordPGD.oContextInformation.Errors[0].ErrorID == 123452) {
                            oMsgBox.Height = 170;
                            oMsgBox.Width = 350;
                            oMsgBox.Message = Resource.RecordPGD.CancelledEncounter1_Msg + Environment.NewLine + Resource.RecordPGD.CancelledEncounter2_Msg;
                        }
                        //PAN 215 --START
                        else if (objResRecordPGD.oContextInformation.Errors[0].ErrorID == -1)
                        {
                            this.SubmitDrugsDone = false;
                            if (this.ReTryCount == 3)
                            {
                                this.SubmitDrugsDone = true;
                                oMsgBox.Message = '** System Error ** \r\n ** Prescription not saved ** \r\n ** RE-PRESCRIBE **';
                            }
                            else
                            {                                
                                this.RecordPGD(this.TempOID);                               
                            }
                        }
                        if (this.SubmitDrugsDone) {
                            oMsgBox.Show();
                        }
                         //PAN 215 --END
                    }
                    else {
                        if (this.IsWizardRecordPGD) {
                            super.OnFinish();
                        }
                        else {
                            if (objResRecordPGD != null) {
                                if (this.CheckRecordPGDEvent != null) {
                                    this.CheckRecordPGDEvent(true, objResRecordPGD, this.IsSingleActionChecked);
                                }
                            }
                        }
                    }
                }
                catch (ex: any) {
                    //PAN 215
                    this.SubmitDrugsDone = true;
                    let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                //PAN 215
                this.SubmitDrugsDone = true;
                let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
        }
        oMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
            super.OnFinish();
        }
        WarngDetail: ObservableCollection<WarningDetails>;
        private conflictDetails: ObservableCollection<WarningDetails>;
        public get ConflictDetails(): ObservableCollection<WarningDetails> {
            return this.conflictDetails;
        }
        public set ConflictDetails(value: ObservableCollection<WarningDetails>) {
            if (this.conflictDetails != value) {
                this.conflictDetails = value;
                // OnPropertyChanged("ConflictDetails");
            }
        }
        objWarningItem: IPPManagePrescSer.WarningItems = null;
        //public delegate void delgCurrentMedication();
        public CurrentMedicationCompleted: Function;
        public oCurrentMedcation: ObservableCollection<IPPManagePrescSer.DecisionSupportBasicCriteria>;
        public GetCurrentMedication(): void {
            let objService: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
            let objReqMedications: IPPMAManagePrescSer.CReqMsgGetMedicationsForInpatient = new IPPMAManagePrescSer.CReqMsgGetMedicationsForInpatient();
            objReqMedications.oContextInformation = Common.FillContext();
            objReqMedications.PatientOIDBC = Convert.ToInt64(PatientContext.PatientOID);
            objReqMedications.PresStartDateBC = CommonBB.GetServerDateTime();
            objReqMedications.EncounterOIDBC = PatientContext.EncounterOid;
            //Both N-1 and LBM in medchart this parameter going as blank. 
            //Since in LBM this is pass with clerking from EC . hence conflict not working properly commented as agreed. 
            //objReqMedications.PRTYPCODEBC = PatientContext.PrescriptionType;
            objService.GetMedicationsForInpatientCompleted  = (s,e) => { this.objService_GetMedicationsForInpatientCompleted(s,e); } ;
            objService.GetMedicationsForInpatientAsync(objReqMedications);
        }
        objService_GetMedicationsForInpatientCompleted(sender: Object, e: IPPMAManagePrescSer.GetMedicationsForInpatientCompletedEventArgs): void {
            let _ErrorID: number = 80000075;
            let _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:pgdvm, Method:objService_GetMedicationsForInpatientCompleted()";
            if (e.Error == null) {
                try {
                    let oCResMsgGetActiveMedications: IPPMAManagePrescSer.CResMsgGetMedicationsForInpatient = e.Result;
                    if ((oCResMsgGetActiveMedications.objItems != null) && (oCResMsgGetActiveMedications.objItems.Count > 0)) {
                        this.oCurrentMedcation = new ObservableCollection<IPPManagePrescSer.DecisionSupportBasicCriteria>();
                        let oDecisionSupportBasicCriteria: IPPManagePrescSer.DecisionSupportBasicCriteria;
                        for (let i: number = 0; i < oCResMsgGetActiveMedications.objItems.Count; i++) {
                            if (oCResMsgGetActiveMedications.objItems[i].DrugItem != null) {
                                oDecisionSupportBasicCriteria = new IPPManagePrescSer.DecisionSupportBasicCriteria();
                                oDecisionSupportBasicCriteria.DrugItem = new IPPManagePrescSer.DrugBasicData();
                                if ((oCResMsgGetActiveMedications.objItems[i].DrugItem != null) && oCResMsgGetActiveMedications.objItems[i].DrugItem.IdentifyingName != null) {
                                    oDecisionSupportBasicCriteria.DrugItem.IdentifyingName = oCResMsgGetActiveMedications.objItems[i].DrugItem.IdentifyingName;
                                }
                                if ((oCResMsgGetActiveMedications.objItems[i].DrugItem != null) && oCResMsgGetActiveMedications.objItems[i].DrugItem.IdentifyingOID > 0) {
                                    oDecisionSupportBasicCriteria.DrugItem.IdentifyingOID = oCResMsgGetActiveMedications.objItems[i].DrugItem.IdentifyingOID;
                                }
                                if ((oCResMsgGetActiveMedications.objItems[i].DrugItem != null) && oCResMsgGetActiveMedications.objItems[i].DrugItem.IdentifyingType != null) {
                                    oDecisionSupportBasicCriteria.DrugItem.IdentifyingType = oCResMsgGetActiveMedications.objItems[i].DrugItem.IdentifyingType;
                                }
                                if ((oCResMsgGetActiveMedications.objItems[i].DrugItem != null) && oCResMsgGetActiveMedications.objItems[i].DrugItem.ItemType != null) {
                                    oDecisionSupportBasicCriteria.DrugItem.ItemType = oCResMsgGetActiveMedications.objItems[i].DrugItem.ItemType;
                                }
                                if ((oCResMsgGetActiveMedications.objItems[i].DrugItem != null) && oCResMsgGetActiveMedications.objItems[i].DrugItem.LorenzoID != null) {
                                    oDecisionSupportBasicCriteria.DrugItem.LorenzoID = oCResMsgGetActiveMedications.objItems[i].DrugItem.LorenzoID;
                                }
                                if (oCResMsgGetActiveMedications.objItems[i].StartDate != null) {
                                    oDecisionSupportBasicCriteria.StartDate = oCResMsgGetActiveMedications.objItems[i].StartDate;
                                }
                                if (oCResMsgGetActiveMedications.objItems[i].EndDate != null) {
                                    oDecisionSupportBasicCriteria.EndDate = oCResMsgGetActiveMedications.objItems[i].EndDate;
                                }
                                if (oCResMsgGetActiveMedications.objItems[i].PrescriptionType != null) {
                                    oDecisionSupportBasicCriteria.PrescriptionType = oCResMsgGetActiveMedications.objItems[i].PrescriptionType;
                                }
                                if (oCResMsgGetActiveMedications.objItems[i].PrescriptionDTTM != null) {
                                    oDecisionSupportBasicCriteria.PrescriptionDTTM = oCResMsgGetActiveMedications.objItems[i].PrescriptionDTTM;
                                }
                                if (!String.IsNullOrEmpty(oCResMsgGetActiveMedications.objItems[i].MCVersionNo)) {
                                    oDecisionSupportBasicCriteria.MCVersionNo = oCResMsgGetActiveMedications.objItems[i].MCVersionNo;
                                }
                                if (oDecisionSupportBasicCriteria.PrescriptionDTTM != null && DateTime.NotEquals(oDecisionSupportBasicCriteria.PrescriptionDTTM.Date , DateTime.MinValue.Date)) {
                                    oDecisionSupportBasicCriteria.DrugItem.PrescriptionItemId = oCResMsgGetActiveMedications.objItems[i].DrugItem.PrescriptionItemId.ToString();
                                    oDecisionSupportBasicCriteria.DrugItem.ConflictUniqueId = "CC_PCPRES";
                                }
                                else {
                                    oDecisionSupportBasicCriteria.DrugItem.ConflictUniqueId = "CC_UNIQUEID";
                                }
                                if (!String.IsNullOrEmpty(oCResMsgGetActiveMedications.objItems[i].DrugItem.ITMSUBTYP)) {
                                    oDecisionSupportBasicCriteria.DrugItem.ITMSUBTYP = oCResMsgGetActiveMedications.objItems[i].DrugItem.ITMSUBTYP;
                                }
                                this.oCurrentMedcation.Add(oDecisionSupportBasicCriteria);
                                if ((String.Compare(oCResMsgGetActiveMedications.objItems[i].DrugItem.ITMSUBTYP, CConstants.ItemSubType, StringComparison.OrdinalIgnoreCase) == 0) && oCResMsgGetActiveMedications.objItems[i].PrescriptionDTTM != null && DateTime.NotEquals(oCResMsgGetActiveMedications.objItems[i].PrescriptionDTTM.Date , DateTime.MinValue.Date)) {
                                    if (!String.IsNullOrEmpty(oCResMsgGetActiveMedications.objItems[i].DrugItem.MCIItem)) {
                                        let sMCitem: string = oCResMsgGetActiveMedications.objItems[i].DrugItem.MCIItem;
                                        let sMCitemSerialize: string[] = sMCitem.Split('^');
                                        if (sMCitemSerialize != null && sMCitemSerialize.length > 0) {
                                            let dsCurrItems: IPPManagePrescSer.DecisionSupportBasicCriteria;
                                            let sProblemDetails: StringBuilder = new StringBuilder();
                                            let sProblemName: StringBuilder = new StringBuilder();
                                            for (let ncount: number = 0; ncount <= sMCitemSerialize.length - 1; ncount++) {
                                                dsCurrItems = new DecisionSupportBasicCriteria();
                                                dsCurrItems.DrugItem = new IPPManagePrescSer.DrugBasicData();
                                                let stmp: string[] = sMCitemSerialize[ncount].Split('~');
                                                let lnIdentifyingOID: number = 0;
                                                Number.TryParse(stmp[0], (o) =>{
                                                    lnIdentifyingOID = o
                                                });
                                                dsCurrItems.DrugItem.IdentifyingOID = lnIdentifyingOID;
                                                dsCurrItems.DrugItem.IdentifyingType = stmp[1];
                                                dsCurrItems.DrugItem.IdentifyingName = stmp[2];
                                                if (stmp.length > 3)
                                                    dsCurrItems.DrugItem.LorenzoID = stmp[3];
                                                dsCurrItems.StartDate = oCResMsgGetActiveMedications.objItems[i].StartDate;
                                                dsCurrItems.EndDate = oCResMsgGetActiveMedications.objItems[i].EndDate;
                                                dsCurrItems.PrescriptionType = oCResMsgGetActiveMedications.objItems[i].PrescriptionType;
                                                dsCurrItems.PrescriptionDTTM = oCResMsgGetActiveMedications.objItems[i].PrescriptionDTTM;
                                                dsCurrItems.DrugItem.PrescriptionItemId = oCResMsgGetActiveMedications.objItems[i].DrugItem.PrescriptionItemId.ToString();
                                                dsCurrItems.DrugItem.ITMSUBTYP = oCResMsgGetActiveMedications.objItems[i].DrugItem.ITMSUBTYP;
                                                dsCurrItems.DrugItem.ConflictUniqueId = "CC_PCPRES";
                                                dsCurrItems.DrugItem.NonCatItemReason = oCResMsgGetActiveMedications.objItems[i].DrugItem.IdentifyingName;
                                                this.oCurrentMedcation.Add(dsCurrItems);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (this.CurrentMedicationCompleted != null)
                        this.CurrentMedicationCompleted();
                }
               catch(ex:any)  {
                    let lnReturn: number =  AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number =  AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
        }
        public GetWarningsForCurrentItem(oAddedMedication: ObservableCollection<IPPManagePrescSer.DecisionSupportBasicCriteria>): void {
            let objSer: IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
            let objReqDecSupp: IPPManagePrescSer.CReqMsgGetIPPDecisionSupport = new IPPManagePrescSer.CReqMsgGetIPPDecisionSupport();
            objReqDecSupp.objDecisionSuppCriteriaBC = new IPPManagePrescSer.DecisionSupportCriteria();
            objReqDecSupp.oContextInformation = CommonBB.FillContext();
            objReqDecSupp.objDecisionSuppCriteriaBC.PatientOID = Convert.ToInt64(PatientContext.PatientOID);
            objReqDecSupp.objDecisionSuppCriteriaBC.PatientSex = PatientContext.Sex;
            objReqDecSupp.objDecisionSuppCriteriaBC.PatientDOB = PatientContext.DOB;
            objReqDecSupp.objDecisionSuppCriteriaBC.MCVersionNo = AppSessionInfo.AMCV;
            objReqDecSupp.objDecisionSuppCriteriaBC.AddedMedication = (oAddedMedication != null ? oAddedMedication : null);
            objReqDecSupp.objDecisionSuppCriteriaBC.CurrentMedication = (this.oCurrentMedcation != null ? this.oCurrentMedcation : null);
            objReqDecSupp.objDecisionSuppCriteriaBC.DrugExpiryDuration = PatientContext.EncounterOid;
            objReqDecSupp.objDecisionSuppCriteriaBC.CheckMandatory = true;
            objReqDecSupp.objDecisionSuppCriteriaBC.CACode = IPPManagePrescSer.CACode.PGD;
            objReqDecSupp.objDecisionSuppCriteriaBC.IsAllergenCheckNeed = true;
            objReqDecSupp.oContextInformation = CommonBB.FillContext();
            objSer.GetIPPDecisionSupportCompleted  = (s,e) => { this.objSer_GetIPPDecisionSupportCompleted(s,e); } ;
            objSer.GetIPPDecisionSupportAsync(objReqDecSupp);
        }
        objSer_GetIPPDecisionSupportCompleted(sender: Object, e: IPPManagePrescSer.GetIPPDecisionSupportCompletedEventArgs): void {
            let _ErrorID: number = 80000074;
            let _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:pgdvm, Method:objSer_GetIPPDecisionSupportCompleted()";
            if (e.Error == null && (e.Result != null)) {
                try {
                    let objResponse: IPPManagePrescSer.CResMsgGetIPPDecisionSupport = e.Result;
                    if (objResponse != null && objResponse.objDrugWarnings != null) {
                        if (!this.IsUpdatedWarning) {
                            this.objWarningItem = objResponse.objDrugWarnings;
                            this.UpdateWarningSubType();
                            this.IsUpdatedWarning = true;
                        }
                    }
                }
               catch(ex:any)  {
                    let lnReturn: number =   AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number =   AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
        }
        private ShowWarnings(objWarningDetails: ObservableCollection<IPPManagePrescSer.WarningDetails>): void {
            objWarningDetails.forEach( (oDetails)=> {
                if (oDetails != null && (oDetails.TypeColorCode != null && !String.IsNullOrEmpty(oDetails.TypeColorCode) && !String.Equals(oDetails.TypeColorCode, "0"))) {
                    let oVM: WarningDetails = new WarningDetails();
                    oVM.TypeColorCode = oDetails.TypeColorCode;
                    oVM.WarningBehaviourType = oDetails.WarningBehaviourType;
                    oVM.WarningType = oDetails.WarningType;
                    if (!String.Equals(oDetails.WarningType, CConstants.sWarning, StringComparison.InvariantCultureIgnoreCase)) {
                        oVM.WarningType = oDetails.WarningType + "-" + oDetails.WarningSubType;
                    }
                    oVM.WarningSubType = oDetails.WarningSubType;
                    oVM.AcknowledgeStatus = "0";
                    let sWarMsg: string = oDetails.WarningMessage;
                    if (!String.IsNullOrEmpty(sWarMsg) && sWarMsg.Contains('~')) {
                        sWarMsg = String.Join(String.Empty, sWarMsg.Split('~'));
                    }
                    oVM.WarningMessage = sWarMsg;
                    oVM.ConflictMessage = oDetails.ConflictMessage;
                    oVM.WarningOID = oDetails.WarningOID;
                    oVM.WarningSeverity = oDetails.WarningSeverity;
                    oVM.UniqueMCRowID = oDetails.UniqueMCRowID;
                    oVM.DisplaySequenceNumber = oDetails.DisplaySequenceNumber;
                    oVM.Code = oDetails.Code;
                    oVM.ConflictType = oDetails.ConflictType;
                    if (String.Compare(oVM.WarningBehaviourType, "Type 1", StringComparison.InvariantCultureIgnoreCase) == 0 || String.Compare(oVM.WarningBehaviourType, "Type 2", StringComparison.InvariantCultureIgnoreCase) == 0 || String.Compare(oVM.WarningBehaviourType, "Type 3", StringComparison.InvariantCultureIgnoreCase) == 0 || String.Compare(oVM.WarningBehaviourType, "Type 4", StringComparison.InvariantCultureIgnoreCase) == 0 || String.Compare(oVM.WarningBehaviourType, "Type 5", StringComparison.InvariantCultureIgnoreCase) == 0) {
                        this.IsType = true;
                    }
                    this.WarngDetail.Add(oVM);
                }
            });
        }
        //public delegate void WarningsGenerated(IPPManagePrescSer.WarningItems objWarningItem, ObservableCollection < WarningDetails > obj);
        public WarningsGenerationCompleted: Function;
        //public delegate void ErrorEventArgs(string ContronID);
        public OnErrorEvent: Function;
        private UpdateWarnings_Completed(sender: Object, e: GetValuesByDomainsCompletedEventArgs): void {
            let _ErrorID: number = 80000073;
            let _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:pgdvm, Method:UpdateWarnings_Completed()";
            if (e.Error == null) {
                try {
                    let objResponse: CResMsgGetValuesByDomains = e.Result;
                    if (objResponse != null && objResponse.arrValSetCollection != null && objResponse.arrValSetCollection.Count > 0) {
                        let lstCValuesetTerm: ObservableCollection<CValuesetTerm> = new ObservableCollection<CValuesetTerm>();
                        objResponse.arrValSetCollection.forEach( (objCValuesetCollection)=> {
                            if (objCValuesetCollection.arrValuesetTerm != null) {
                                objCValuesetCollection.arrValuesetTerm.forEach( (objCValuesetTerm)=> {
                                    lstCValuesetTerm.Add(objCValuesetTerm);
                                });
                            }
                        });
                        WarningConceptCode.ConceptData = lstCValuesetTerm;
                    }
                }
               catch(ex:any)  {
                    let lnReturn: number =   AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number =   AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
            this.UpdateWarningSubType();
            if (this.WarningsGenerationCompleted != null)
                this.WarningsGenerationCompleted(null, null);
        }
        public GetConflictConfig(): void {
            if (WebServiceURLMedicationCommonBB.IPPMAManagePrescriptionWS != null) {
                let objService: IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
                let objReqConfig: IPPManagePrescSer.CReqMsgGetMedicationConfilictConfig = new IPPManagePrescSer.CReqMsgGetMedicationConfilictConfig();
                objReqConfig.IsMainAppConflictsBC = '1';
                objReqConfig.oContextInformation = CommonBB.FillContext();
                objService.GetMedicationConfilictConfigCompleted  = (s,e) => { this.ConflictsConfig_Completed(s,e); } ;
                objService.GetMedicationConfilictConfigAsync(objReqConfig);
            }
        }
        ConflictsConfig_Completed(sender: Object, e: IPPManagePrescSer.GetMedicationConfilictConfigCompletedEventArgs): void {
            if (e.Error != null)
                return
            let objResConfig: IPPManagePrescSer.CResMsgGetMedicationConfilictConfig = e.Result;
            if (objResConfig != null) {
                MedicationCommonProfileData.MedConflictConfig = e.Result.oMedicationConflictConfig;
            }
            this.UpdateWarningSubType();
        }
        private UpdateWarningSubType(): void {
            this.IsType = false;
            this.WarngDetail = new ObservableCollection<WarningDetails>();
            if (this.objWarningItem.DrugInteraction != null && this.objWarningItem.DrugInteraction.Count > 0) {
                this.ShowWarnings(this.objWarningItem.DrugInteraction);
            }
            if (this.objWarningItem.DrugDoubling != null && this.objWarningItem.DrugDoubling.Count > 0) {
                this.ShowWarnings(this.objWarningItem.DrugDoubling);
            }
            if (this.objWarningItem.DrugAllergy != null && this.objWarningItem.DrugAllergy.Count > 0) {
                this.ShowWarnings(this.objWarningItem.DrugAllergy);
            }
            if (this.objWarningItem.DrugContraIndication != null && this.objWarningItem.DrugContraIndication.Count > 0) {
                this.ShowWarnings(this.objWarningItem.DrugContraIndication);
            }
            if (this.objWarningItem.DrugCrossReaction != null && this.objWarningItem.DrugCrossReaction.Count > 0) {
                this.ShowWarnings(this.objWarningItem.DrugCrossReaction);
            }
            if (this.objWarningItem.DrugAllergenNotIncluded != null && this.objWarningItem.DrugAllergenNotIncluded.Count > 0) {
                this.ShowWarnings(this.objWarningItem.DrugAllergenNotIncluded);
            }
            if (this.WarningsGenerationCompleted != null)
                this.WarningsGenerationCompleted(this.objWarningItem, this.WarngDetail);
        }
        public ConflictAck: ConflictAcknowledge[];
    }
    export module PGDAdminstrationVM {
        export class ConflictsVM extends ViewModelBase {
            private _warnType: string;
            public get WarningType(): string {
                return this._warnType;
            }
            public set WarningType(value: string) {
                if (this._warnType != value) {
                    this._warnType = value;
                    // NotifyPropertyChanged("WarningType");
                }
            }
            private _warnSubType: string;
            public get WarningSubType(): string {
                return this._warnSubType;
            }
            public set WarningSubType(value: string) {
                if (this._warnSubType != value) {
                    this._warnSubType = value;
                    // NotifyPropertyChanged("WarningSubType");
                }
            }
            private _warnMsg: string;
            public get WarningMessage(): string {
                return this._warnMsg;
            }
            public set WarningMessage(value: string) {
                if (this._warnMsg != value) {
                    this._warnMsg = value;
                    // NotifyPropertyChanged("WarningMessage");
                }
            }
            private _warnbehType: string;
            public get WarningBehaviourType(): string {
                return this._warnbehType;
            }
            public set WarningBehaviourType(value: string) {
                if (this._warnbehType != value) {
                    this._warnbehType = value;
                    // NotifyPropertyChanged("WarningBehaviourType");
                }
            }
            private _ackStatus: boolean;
            public get AcknowledgeStatus(): boolean {
                return this._ackStatus;
            }
            public set AcknowledgeStatus(value: boolean) {
                if (this._ackStatus != value) {
                    this._ackStatus = value;
                    // NotifyPropertyChanged("AcknowledgeStatus");
                }
            }
            private __clinReasoncmb: ObservableCollection<CListItem>;
            public get ClinicalReasonCombo(): ObservableCollection<CListItem> {
                return this.__clinReasoncmb;
            }
            public set ClinicalReasonCombo(value: ObservableCollection<CListItem>) {
                if (this.__clinReasoncmb != value) {
                    this.__clinReasoncmb = value;
                    // NotifyPropertyChanged("ClinicalReasonCombo");
                }
            }
            private _clinReason: CListItem;
            public get ClinicalVerfierReason(): CListItem {
                return this._clinReason;
            }
            public set ClinicalVerfierReason(value: CListItem) {
                if (value != null) {
                    this._clinReason = value;
                }
                // NotifyPropertyChanged("ClinicalVerfierReason");
            }
            public ConflictMessage: string;
            public WarningOID: number;
            public WarningSeverity: string;
            public DrugName: string;
            public DrugType: string;
            public WarningConfType: string;
            public MessageFormat: IPPManagePrescSer.MessageFormat;
        }
    }
