
import { ProfileFactoryType, ContextManager, Convert, AppActivity, ProcessRTE, AppLoadService} from 'epma-platform/services';
import { Byte, Int64, StringComparison, AppDialogEventargs, AppDialogResult, WindowButtonType, List, AppContextInfo, ObservableCollection, CListItem, Visibility, InfusDeliveryDevice, OxygenMasks, RTEEventargs, RelayCommand, ChildWindow, AppSessionInfo, ChildWizardCloseEventargs, ContextInfo, int64 } from 'epma-platform/models';
import { Colors, EventArgs, SolidColorBrush } from 'epma-platform/controls';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ChartContext, MedChartData, TagDrugHeaderDetail } from '../utilities/globalvariable';
import { MedAdminViewHelper } from '../utilities/MedAdminViewHelper';
import { Dictionary } from 'epma-platform/dictionary';
import { MedScanRecAdmVM, ProductDetailsGrid } from './MedScanRecAdmVM';
//import { AdministrationField, CConstants, DoseTypeCode, InfChartAlert, InfStrikeOutType, InfusionRecordAdminTypeCodes, InfusionTypesCode, MedicationAction, MultiRouteType, SlotStatus, ValueDomain, ValueSet } from '../utilities/constants';
import { InfRecAdmBase } from './InfRecAdmBase';
import { DrugItem } from 'src/app/product/shared/models/drugItem';
import { Common } from '../utilities/common';
import { Resource } from '../resource';
import { AdministrationDetailVM, SlotDetailVM } from './MedicationChartVM';
import { MedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { CDrugHeader } from '../common/drugheader';
import { SLDateUtility } from 'src/app/shared/epma-platform/services/sLDateUtility.service';
import { InfRecAdmPCA } from './InfRecAdmPCA';
import { InfRecAdmContinuous } from './InfRecAdmContinuous';
import { InfRecAdmGas } from './InfRecAdmGas';
import { CReqMsgGetUser, CResMsgGetUser, CSecurityManagementServiceWSSoapClient, GetUserCompletedEventArgs } from 'src/app/shared/epma-platform/soap-client/CSecurityManagementServiceWS';
import { WitnessCriteriaresult } from 'src/app/shared/epma-platform/soap-client/IPPMAPrescribableDefnWS';
import { InfusionTypeCode } from 'src/app/product/shared/models/medcommonbbconstant';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { AdministrationDetail, AlertsInfo, CALaunch, CMedBarcodeScanOverrideDetail, CReqMsgGetAllBagDetails, CReqMsgRecordInfusionAdministration, CReqMsgStrikeThroughInfusionAdmin, CResMsgGetAllBagDetails, CResMsgStrikeThroughInfusionAdmin, CStrikethroughAdmin, GetAllBagDetailsCompletedEventArgs, InfAdministeredTimes, InfusionBagDetail, MedicationAdministrationWSSoapClient, SlotDetail } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { ProfileData } from '../utilities/ProfileData';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import { AppChildDialogAction, DripRateCommon, DripRateParams } from 'src/app/lorappmedicationcommonbb/utilities/common';
import { DripRateCalcVM } from 'src/app/lorappmedicationcommonbb/viewmodel/dripratecalcvm';
import { ArrayOfLong, CReqMsgGetAllOptions, CResMsgGetAllOptions, CResMsgGetDrugBasicInfo, GetAllOptionsCompletedEventArgs, GetDrugBasicInfoCompletedEventArgs, ManagePrescriptionWSSoapClient } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { MedicationPrescriptionHelper } from 'src/app/lorappmedicationcommonbb/utilities/medicationprescriptionhelper';

import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { ManageBarcodeHelper } from '../common/ManageBarcodeHelper';
import { SelectedUserType } from 'src/app/lorappmedicationcommonbb/utilities/witnesshelper';
import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { LaunchWizard } from 'src/app/shared/epma-platform/models/launchwizard';
import { ConditionalDoseVM, RequestSource } from 'src/app/lorappmedicationcommonbb/viewmodel/ConditionalDoseVM';
import { LzoWizardVmbaseService as LzoWizardVmbase } from 'src/app/shared/epma-platform/services/lzo-wizard-vmbase.service';
import { iDateTimePicker } from 'src/app/shared/epma-platform/controls/epma-datetimepicker/epma-datetimepicker.component';
import { iTimeBox } from 'src/app/shared/epma-platform/controls/epma-timebox/epma-timebox.component';
import { MedicationAdministrator } from '../resource/medicationadministrator.designer';
import { MedsAdminChartToolTip } from '../resource/medsadmincharttooltip.designer';
import { SlotAdministrationHelper } from '../common/slotadministrationhelper';
import { InfusionTagObject } from 'src/app/lorarcbluebirdmedicationchart/common/InfusionTagObject';
import { InfRecAdmStrikeThrough } from '../child/InfRecAdmStrikeThrough';
import {  MedScanRecordAdministration } from '../child/MedScanRecordadministration';
import { ConditionalDoseChildView } from '../child/ConditionalDoseChildView';
import { AdministrationField, CConstants, DoseTypeCode, InfChartAlert, InfStrikeOutType, InfusionRecordAdminTypeCodes, InfusionTypesCode, MedicationAction, MultiRouteType, SlotStatus, ValueDomain, ValueSet } from '../utilities/CConstants';
import { Injectable } from '@angular/core';

import {iMath as Math} from 'epma-platform/mathextension';
import { RecalcEstCompTimeConverter } from '../converter/medadminconverter';
var that;
@Injectable({ providedIn : 'root'})
export class InfrecordadminVM extends LzoWizardVmbase {
    //public delegate void InfRecordShowErrorMsgCompleted(string Ctlr);
    public OnInfRecordShowErrorMsgCompleted: Function;
    //public delegate void CheckWarningMessage(string ResourceKey, string Fieldname);
    public OnCheckWarningMessage: Function;
    //public delegate void InfStrikethruValidationErrorMsgCompleted();
    public OnInfStrikethruValidationErrorMsgCompleted: Function;
    //public delegate void InfRecordAdminServiceCompleted(SlotDetail oSlotDetail);
    public OnInfRecordAdminServiceCompleted: Function;
    //public delegate void InfStrikethruCompleted(SlotDetail oSlotDetail);
    public OnInfStrikethruCompleted: Function;
    //public delegate void InfLastCallBackCompleted();
    public OnInfLastCallBackCompleted: Function;
    public objReq: CReqMsgRecordInfusionAdministration;
    public objReqStrikeThru: CReqMsgStrikeThroughInfusionAdmin;
    public ocurrentSlotDetail: SlotDetail = null;
    public oTagDrugHeaderDetail: TagDrugHeaderDetail = null;
    public prevBagSeqNumber: number;
    public bIsAlertRequired: boolean = true;
    public bConcentrationInfRateInDoseAlert: boolean = false;
    oMedAdminViewHelper: MedAdminViewHelper;
    public ConditionalVM: ConditionalDoseVM;
    ConditionalChildView: ConditionalDoseChildView;
    sObsDrugName: string = String.Empty;
    //public delegate void InfMovetoNotGiven();
    public OnInfMovetoNotGiven: Function;
    public CanBeStruckThrough: boolean;
    public Currentdttm: DateTime;
    public _IsSFSValueSetFromOnGetSFSItems: boolean = false;
    public oIChartSlot: InfusionTagObject;
    public IsNextHomeLeaveSlotExists: boolean = false;
    public ShowLastActionStrikeThrough: boolean;
    public IsAnyParacetamolAdministeredInGivenPeriod: boolean = false;
    public IsParacetamolIngredient: boolean = false;
    public sParacetamolRecentlyAdministered: number = -1;
    public IsSubmitInProgress: boolean = false;
    public PrescriptionDuration: number = 0;
    public MoreOptionKey: string = String.Empty;
    public lstPrevAction: Dictionary<string, PreviousActionValues> = new Dictionary<string, PreviousActionValues>();
    private _LstWarningMsgFields: List<string>;
    public IsRouteDefaultValueSetInProgress: boolean;
    public IsCriticalMed: boolean = false;
    public CriticalMedsRoutes: string;
    public CriticalMedsMsg: string;
    public CriticalMedsURL: string;
    public bDriprateCalcLaunchedOnce: boolean = false;
    public cmdRequestvisible: Visibility;
    oMedScanRecordadministration: MedScanRecordAdministration;
    oMedScanRecAdmVM: MedScanRecAdmVM;
    oMsg: iMessageBox = new iMessageBox();
    public IsAvoidDoubleClick: boolean;
    val: number;
    public InitialiseVM(sInfType: string): void {
        AppContextInfo.UserOID = ContextManager.Instance['UserOID'].toString();
        PatientContext.EncounterOid =  ContextManager.Instance["EncounterOID"];
        let _CurrentDTTM: DateTime = SLDateUtility.GetLocalServerDateTime();
        this.Currentdttm = new DateTime(_CurrentDTTM.Year, _CurrentDTTM.Month, _CurrentDTTM.Day, _CurrentDTTM.Hour, _CurrentDTTM.Minute, 0);
        this._LstWarningMsgFields = new List<string>();
        if (sInfType != null) {
            this.SetDefaultValues();
            this.SetFormVM(sInfType);
            this.GetDomainvalues();
            this.FillDeliveryDevice(sInfType);
            if (String.Compare(sInfType, InfusionTypesCode.SUBTYPE_GAS) == 0) {
                this.ItemSubType = sInfType;
            }
        }
    }

    constructor() {
        super();
     that = this;
     }

    private SetDefaultValues(): void {
        this.SetDefForAdministeredBy();
        if (ProfileData.ClinicalIncidentConfig != null && ProfileData.ClinicalIncidentConfig.isRecordAdminWitnessOverride) {
            this.ClinicalIncidentForm = ProfileData.ClinicalIncidentConfig.LinkTextToDisplay;
        }
        if ((String.Compare(this.InfSlotStatus, SlotStatus.PLANNED) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.DUENOW) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.DEFERADMIN) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.DEFEROVERDUE) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.DEFERDUENOW) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.OVERDUE) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.NOTYETRECORDED) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.NOTKNOWN) == 0)) {
            this.GetWitnessRequired();
        }
    }
    private SetDefForAdministeredBy(): void {
        if (String.IsNullOrEmpty(ChartContext.CurrentUserName)) {
            this.GetCurrentUserName();
        }
        else {
            this.AdministeredBy = ChartContext.CurrentUserName;
            this.AdministeredByOID = AppContextInfo.UserOID;
        }
    }
    private GetCurrentUserName(): void {
        let objService: CSecurityManagementServiceWSSoapClient = new CSecurityManagementServiceWSSoapClient();
        objService.GetUserCompleted = (s, e) => { this.objService_GetUserCompleted(s, e); };
        let objReq: CReqMsgGetUser = new CReqMsgGetUser();
        objReq.oContextInformation = CommonBB.FillContext();
        objReq.lUserOIDBC = Convert.ToInt64(AppContextInfo.UserOID);
        objService.GetUserAsync(objReq);
    }
    objService_GetUserCompleted(sender: Object, e: GetUserCompletedEventArgs): void {
        let strUserName: string;
        if (e.Result != null) {
            let objRes: CResMsgGetUser = e.Result;
            if (objRes != null && objRes.objEnterpriseObject != null && !String.IsNullOrEmpty(objRes.objEnterpriseObject.SurName)) {
                ChartContext.CurrentUserName = objRes.objEnterpriseObject.SurName;
                if (!String.IsNullOrEmpty(objRes.objEnterpriseObject.ForeName)) {
                    ChartContext.CurrentUserName += " ";
                    ChartContext.CurrentUserName += objRes.objEnterpriseObject.ForeName;
                }
                this.AdministeredByList = new ObservableCollection<CListItem>();
                let oItem: CListItem = new CListItem();
                oItem.DisplayText = ChartContext.CurrentUserName;
                oItem.Value = AppContextInfo.UserOID;
                this.AdministeredByList.Add(oItem);
                this.AdministeredBy = ChartContext.CurrentUserName;
                this.AdministeredByOID = AppContextInfo.UserOID;
            }
        }
    }
    private GetWitnessRequired(): void {
        if (this.oMedAdminViewHelper == null) {
            this.oMedAdminViewHelper = new MedAdminViewHelper();
        }
        let cb = (s)=> {
            this.GetWitnessRequired_Completed(s);
        }
        this.oMedAdminViewHelper.IsWitnessRequired(this.PrescriptionItemOID, this.PresLorenzoID, this.RouteOID, this.IsControlledDrug, cb);
    }
    
    public GetWitnessRequired_Completed(oWitnessCriteriaresult: WitnessCriteriaresult): void {
        
        if (oWitnessCriteriaresult != null) {
            if (oWitnessCriteriaresult.Flag) {
                this.bIsWitnessReqd = true;
            }
            else {
                this.bIsWitnessReqd = this.IsNoWitnessAvialable =false;
                this.IsEnableChkWitness = false;
                this.IsEnableWitnessedBy = false;
                
            }
            if (oWitnessCriteriaresult.Isnowitnessoverride) {
                this.VisichkNoWitness = Visibility.Collapsed;
            }
            else {
                this.VisichkNoWitness = Visibility.Visible;
            }
        }
        this.WitnessMandatory = this.bIsWitnessReqd;
        if (this.OnInfLastCallBackCompleted != null)
            this.OnInfLastCallBackCompleted();
    }
    private _ChkNoWitness: boolean = false;
    private _visichkNoWitness: Visibility = Visibility.Visible;
    public get VisichkNoWitness(): Visibility {
        return this._visichkNoWitness;
    }
    public set VisichkNoWitness(value: Visibility) {
        if (this._visichkNoWitness != value) {
            this._visichkNoWitness = value;
            // OnPropertyChanged("VisichkNoWitness");
        }
    }
    public get ChkNoWitness(): boolean {
        return this._ChkNoWitness;
    }
    public set ChkNoWitness(value: boolean) {
        if (this._ChkNoWitness != value) {
            this._ChkNoWitness = value;
            // // OnPropertyChanged("ChkNoWitness");
        }
    }
    private SetFormVM(sInfType: string): void {
        switch (sInfType) {
            case InfusionTypesCode.CONTINUOUS:
            case InfusionTypesCode.INTERMITTENT:
            case InfusionTypesCode.SINGLEDOSEVOLUME:
            case InfusionTypesCode.FLUID:
                this.FormVM = new InfRecAdmContinuous();
                break;
            case InfusionTypeCode.PCA:
                this.FormVM = new InfRecAdmPCA();
                break;
            case InfusionTypesCode.SUBTYPE_GAS:
                this.FormVM = new InfRecAdmGas();
                break;
        }
        if (this.FormVM != null) {
            this.FormVM.oRecAdminVM = this;
        }
    }
    private _InfusionType: CListItem;
    public get InfusionType(): CListItem {
        return this._InfusionType;
    }
    public set InfusionType(value: CListItem) {
        this._InfusionType = value;
        // OnPropertyChanged("InfusionType");
    }
    public FreqPerodCode: string;
    private _InfusionRecordAdminTypeCode: number;
    public get InfusionRecordAdminTypeCode(): number {
        return this._InfusionRecordAdminTypeCode;
    }
    public set InfusionRecordAdminTypeCode(value: number) {
        this._InfusionRecordAdminTypeCode = value;
        // OnPropertyChanged("InfusionRecordAdminTypeCode");
    }
    private _AmendedPrescriptionItemOID: number;
    public get AmendedPrescriptionItemOID(): number {
        return this._AmendedPrescriptionItemOID;
    }
    public set AmendedPrescriptionItemOID(value: number) {
        this._AmendedPrescriptionItemOID = value;
        // OnPropertyChanged("AmendedPrescriptionItemOID");
    }
    private _IsOngoing: boolean;
    public get IsOngoing(): boolean {
        return this._IsOngoing;
    }
    public set IsOngoing(value: boolean) {
        this._IsOngoing = value;
        // OnPropertyChanged("IsOngoing");
    }
    private _DrugName: string;
    public get DrugName(): string {
        return this._DrugName;
    }
    public set DrugName(value: string) {
        this._DrugName = value;
        // OnPropertyChanged("DrugName");
    }
    private _FluidName: string;
    public get FluidName(): string {
        return this._FluidName;
    }
    public set FluidName(value: string) {
        this._FluidName = value;
        // OnPropertyChanged("FluidName");
    }
    private _IsCDDrug: boolean;
    public get IsCDDrug(): boolean {
        return this._IsCDDrug;
    }
    public set IsCDDrug(value: boolean) {
        this._IsCDDrug = value;
        // OnPropertyChanged("IsCDDrug");
    }
    private _IsFluidCDDrug: boolean;
    public get IsFluidCDDrug(): boolean {
        return this._IsFluidCDDrug;
    }
    public set IsFluidCDDrug(value: boolean) {
        this._IsFluidCDDrug = value;
        // OnPropertyChanged("IsFluidCDDrug");
    }
    private _DoseType: string;
    public get DoseType(): string {
        return this._DoseType;
    }
    public set DoseType(value: string) {
        this._DoseType = value;
        // OnPropertyChanged("DoseType");
    }
    private _PresVolme: string;
    public get PresVolme(): string {
        return this._PresVolme;
    }
    public set PresVolme(value: string) {
        this._PresVolme = value;
        // OnPropertyChanged("PresVolme");
    }
    private _PresVolmeUOM: string;
    public get PresVolmeUOM(): string {
        return this._PresVolmeUOM;
    }
    public set PresVolmeUOM(value: string) {
        this._PresVolmeUOM = value;
        // OnPropertyChanged("PresVolmeUOM");
    }
    private _PresVolmeUOMOID: number;
    public get PresVolmeUOMOID(): number {
        return this._PresVolmeUOMOID;
    }
    public set PresVolmeUOMOID(value: number) {
        this._PresVolmeUOMOID = value;
        // OnPropertyChanged("PresVolmeUOMOID");
    }
    private _IsBagDetailsEnable: boolean;
    public get IsBagDetailsEnable(): boolean {
        return this._IsBagDetailsEnable;
    }
    public set IsBagDetailsEnable(value: boolean) {
        this._IsBagDetailsEnable = value;
        // OnPropertyChanged("IsBagDetailsEnable");
    }
    private _IsBagDetailsVisible: Visibility = Visibility.Visible;
    public get IsBagDetailsVisible(): Visibility {
        return this._IsBagDetailsVisible;
    }
    public set IsBagDetailsVisible(value: Visibility) {
        if (this._IsBagDetailsVisible != value) {
            this._IsBagDetailsVisible = value;
            // OnPropertyChanged("IsBagDetailsVisible");
        }
    }
    private _CondDose: Visibility = Visibility.Collapsed;
    public get CondDose(): Visibility {
        return this._CondDose;
    }
    public set CondDose(value: Visibility) {
        if (this._CondDose != value) {
            this._CondDose = value;
            // OnPropertyChanged("CondDose");
        }
    }
    private _CondInfRate: Visibility = Visibility.Collapsed;
    public get CondInfRate(): Visibility {
        return this._CondInfRate;
    }
    public set CondInfRate(value: Visibility) {
        if (this._CondInfRate != value) {
            this._CondInfRate = value;
            // OnPropertyChanged("CondInfRate");
        }
    }
    private _CondDoseStopComplete: Visibility = Visibility.Collapsed;
    public get CondDoseStopComplete(): Visibility {
        return this._CondDoseStopComplete;
    }
    public set CondDoseStopComplete(value: Visibility) {
        if (this._CondDoseStopComplete != value) {
            this._CondDoseStopComplete = value;
            // OnPropertyChanged("CondDoseStopComplete");
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
    private _IsInfRateMandatory: boolean;
    public get IsInfRateMandatory(): boolean {
        return this._IsInfRateMandatory;
    }
    public set IsInfRateMandatory(value: boolean) {
        this._IsInfRateMandatory = value;
        // OnPropertyChanged("IsInfRateMandatory");
    }
    private _IsEnableDripCal: boolean = true;
    public get IsEnableDripCal(): boolean {
        return this._IsEnableDripCal;
    }
    public set IsEnableDripCal(value: boolean) {
        this._IsEnableDripCal = value;
        // OnPropertyChanged("IsEnableDripCal");
    }
    private _IsInfusionFluid: boolean = false;
    public get IsInfusionFluid(): boolean {
        return this._IsInfusionFluid;
    }
    public set IsInfusionFluid(value: boolean) {
        this._IsInfusionFluid = value;
    }
    private reasonNotGivens: ObservableCollection<CListItem>;
    private reasonNotGiven: CListItem;
    private _ReasonForNotDefers: ObservableCollection<CListItem>;
    private reasonForNotDefer: CListItem;
    private _AdministeredDateTime: DateTime;
    private _AdministeredDate: DateTime = SLDateUtility.GetLocalServerDateTime();
    private _IsClinicalRSNMand: boolean;
    private _IsStopClinicalRSNMand: boolean;
    public get ReasonForNotDefers(): ObservableCollection<CListItem> {
        return this._ReasonForNotDefers;
    }
    public set ReasonForNotDefers(value: ObservableCollection<CListItem>) {
        if (this._ReasonForNotDefers != value) {
            this._ReasonForNotDefers = value;
            // OnPropertyChanged("ReasonForNotDefers");
        }
    }
    public get ReasonForNotDefer(): CListItem {
        return this.reasonForNotDefer;
    }
    public set ReasonForNotDefer(value: CListItem) {
        if (this.reasonForNotDefer != value) {
            if (value != null && !String.IsNullOrEmpty(value.Value) && String.Compare(value.Value, "CC_CLNCLRSN") == 0) {
                this.IsClinicalRSNMand = true;
            }
            else {
                this.IsClinicalRSNMand = false;
            }
            this.reasonForNotDefer = value;
            // OnPropertyChanged("ReasonForNotDefer");
        }
    }
    public get ReasonNotGiven(): CListItem {
        return this.reasonNotGiven;
    }
    public set ReasonNotGiven(value: CListItem) {
        if (!ObjectHelper.ReferenceEquals(this.reasonNotGiven, value)) {
            if (value != null && !String.IsNullOrEmpty(value.Value) && String.Compare(value.Value, "CC_CLNCLRSN") == 0) {
                this.IsClinicalRSNMand = true;
            }
            else {
                this.IsClinicalRSNMand = false;
            }
            this.reasonNotGiven = value;
            // OnPropertyChanged("ReasonNotGiven");
        }
    }
    public get ReasonNotGivens(): ObservableCollection<CListItem> {
        return this.reasonNotGivens;
    }
    public set ReasonNotGivens(value: ObservableCollection<CListItem>) {
        if (this.reasonNotGivens != value) {
            this.reasonNotGivens = value;
            // OnPropertyChanged("ReasonNotGivens");
        }
    }
    private _RangeStartDate: DateTime;
    public get RangeStartDate(): DateTime {
        return this._RangeStartDate;
    }
    public set RangeStartDate(value: DateTime) {
        if (value != this._RangeStartDate) {
            this._RangeStartDate = value;
            // OnPropertyChanged("RangeStartDate");
        }
    }
    private _RangeEndDate: DateTime;
    public get RangeEndDate(): DateTime {
        return this._RangeEndDate;
    }
    public set RangeEndDate(value: DateTime) {
        if (value != this._RangeEndDate) {
            this._RangeEndDate = value;
            // OnPropertyChanged("RangeEndDate");
        }
    }
    private _CurrentChangeBagRangeStartDate: DateTime;
    public get CurrentChangeBagRangeStartDate(): DateTime {
        return this._CurrentChangeBagRangeStartDate;
    }
    public set CurrentChangeBagRangeStartDate(value: DateTime) {
        if (value != this._CurrentChangeBagRangeStartDate) {
            this._CurrentChangeBagRangeStartDate = value;
            // OnPropertyChanged("CurrentChangeBagRangeStartDate");
        }
    }
    private _CurrentChangeBagRangeEndDate: DateTime;
    public get CurrentChangeBagRangeEndDate(): DateTime {
        return this._CurrentChangeBagRangeEndDate;
    }
    public set CurrentChangeBagRangeEndDate(value: DateTime) {
        if (value != this._CurrentChangeBagRangeEndDate) {
            this._CurrentChangeBagRangeEndDate = value;
            // OnPropertyChanged("CurrentChangeBagRangeEndDate");
        }
    }
    private _EndRangeStartDate: DateTime;
    public get EndRangeStartDate(): DateTime {
        return this._EndRangeStartDate;
    }
    public set EndRangeStartDate(value: DateTime) {
        if (value != this._EndRangeStartDate) {
            this._EndRangeStartDate = value;
            // OnPropertyChanged("EndRangeStartDate");
        }
    }
    private _EndRangeEndDate: DateTime;
    public get EndRangeEndDate(): DateTime {
        return this._EndRangeEndDate;
    }
    public set EndRangeEndDate(value: DateTime) {
        if (value != this._EndRangeEndDate) {
            this._EndRangeEndDate = value;
            // OnPropertyChanged("EndRangeEndDate");
        }
    }
    public get AdministeredDate(): DateTime {
        return this._AdministeredDate;
    }
    public set AdministeredDate(value: DateTime) {
        if (value != this._AdministeredDate) {
            this._AdministeredDate = value;
            if (this.AdministeredDateTime)
                //revisitme yasik
                if (value != DateTime.MinValue) {
                    this.AdministeredDateTime = value.DateTime.AddTime(this.AdministeredDateTime);
                }
               // this.AdministeredDateTime = value.DateTime.AddTime(this.AdministeredDateTime);
            // OnPropertyChanged("AdministeredDate");
        }
    }
    public get AdministeredDateTime(): DateTime {
        return this._AdministeredDateTime;
    }
    public set AdministeredDateTime(value: DateTime) {
        if (value != this._AdministeredDateTime) {
            // if (this._AdministeredDate)
                // this._AdministeredDateTime = this._AdministeredDate.DateTime.AddTime(value);
            // else
                this._AdministeredDateTime = value;
            // OnPropertyChanged("AdministeredDateTime");
        }
    }
    public FindPastAdminTime(AdministeredDate: DateTime, AdministeredDateTime: DateTime): boolean {
        let InfPastAction: boolean = false;
        if (DateTime.NotEquals(AdministeredDate , DateTime.MinValue) && DateTime.NotEquals(AdministeredDateTime , DateTime.MinValue) && this.InfAdministeredTimes != null && this.InfAdministeredTimes.Count > 0) {
            let GivenDTTM: DateTime = AdministeredDate.DateTime.AddHours(AdministeredDateTime.Hour).AddMinutes(AdministeredDateTime.Minute);
            let InfAdminTime = this.InfAdministeredTimes.Where(c => GivenDTTM >= c.InfusionStartDTTM && GivenDTTM <= c.InfusionEndDTTM).Select(c => c);
            if (InfAdminTime != null && InfAdminTime.Count() > 0) {
                InfPastAction = false;
            }
            else {
                let LastAction = this.InfAdministeredTimes.Select(s => s).LastOrDefault();
                if (DateTime.GreaterThanOrEqualTo(GivenDTTM , LastAction.InfusionEndDTTM))
                    InfPastAction = false;
                else InfPastAction = true;
            }
        }
        return InfPastAction;
    }
    public get IsClinicalRSNMand(): boolean {
        if ((!String.IsNullOrEmpty(this.InfusionAction) && this.InfusionAction == MedicationAction.CHANGEFLOWRATE) && (!this.IsRecalculateEstCompletionTime) && this.IsEnableReCalcEstComp && ((String.IsNullOrEmpty(this.ItemSubType)) || (!String.IsNullOrEmpty(this.ItemSubType) && !String.Equals(this.ItemSubType, "CC_MEDGAS")))) {
            return true;
        }
        else if ((!String.IsNullOrEmpty(this.InfusionAction) && this.InfusionAction == MedicationAction.CHANGEBAG) && this.IsVisibleInfusionPeriodReachedAlert == Visibility.Visible && this.InfusionPeriodCompletedAlert) {
            return true;
        }
        else {
            return this._IsClinicalRSNMand;
        }
    }
    public set IsClinicalRSNMand(value: boolean) {
        if (!ObjectHelper.ReferenceEquals(this._IsClinicalRSNMand, value)) {
            this._IsClinicalRSNMand = value;
            // OnPropertyChanged("IsClinicalRSNMand");
        }
    }
    public get IsStopClinicalRSNMand(): boolean {
        return this._IsStopClinicalRSNMand;
    }
    public set IsStopClinicalRSNMand(value: boolean) {
        if (!ObjectHelper.ReferenceEquals(this._IsStopClinicalRSNMand, value)) {
            this._IsStopClinicalRSNMand = value;
            // OnPropertyChanged("IsStopClinicalRSNMand");
        }
    }
    private _Reason: string;
    private _ReasonComments: string;
    private _ReasonList: ObservableCollection<CListItem>;
    private _PauseStopResumeDate: DateTime = CommonBB.GetServerDateTime();
    private _PauseStopResumeDateTime: DateTime = CommonBB.GetServerDateTime();
    public get Reason(): string {
        return this._Reason;
    }
    public set Reason(value: string) {
        if (!ObjectHelper.ReferenceEquals(this._Reason, value)) {
            this._Reason = value;
            // super.OnPropertyChanged("Reason");
        }
    }
    public get ReasonComments(): string {
        return this._ReasonComments;
    }
    public set ReasonComments(value: string) {
        if (!ObjectHelper.ReferenceEquals(this._ReasonComments, value)) {
            this._ReasonComments = value;
            // super.OnPropertyChanged("ReasonComments");
        }
    }
    public get ReasonList(): ObservableCollection<CListItem> {
        return this._ReasonList;
    }
    public set ReasonList(value: ObservableCollection<CListItem>) {
        if (this._ReasonList != value) {
            this._ReasonList = value;
            // super.OnPropertyChanged("ReasonList");
        }
    }
    public get PauseStopResumeDate(): DateTime {
        return this._PauseStopResumeDate;
    }
    public set PauseStopResumeDate(value: DateTime) {
        if (!ObjectHelper.ReferenceEquals(this._PauseStopResumeDate, value)) {
            this._PauseStopResumeDate = value;
            // super.OnPropertyChanged("PauseStopResumeDate");
        }
    }
    public get PauseStopResumeDateTime(): DateTime {
        return this._PauseStopResumeDateTime;
    }
    public set PauseStopResumeDateTime(value: DateTime) {
        if (!ObjectHelper.ReferenceEquals(this._PauseStopResumeDateTime, value)) {
            this._PauseStopResumeDateTime = value;
            // super.OnPropertyChanged("PauseStopResumeDateTime");
        }
    }
    private _VolumeInfused: string;
    private _VolumeInfusedUOM: CListItem;
    private _VolumeInfusedUOMList: ObservableCollection<CListItem>;
    public get VolumeInfused(): string {
        return this._VolumeInfused;
    }
    public set VolumeInfused(value: string) {
        if (!ObjectHelper.ReferenceEquals(this._VolumeInfused, value)) {
            this._VolumeInfused = value;
            // super.OnPropertyChanged("VolumeInfused");
            if (this.TotalVolumeToBeInfusedValue > 0) {
                this.CalculateVolumePendingToBeInfused();
            }
        }
    }
    private CalculateVolumePendingToBeInfused(): void {
        let dToBeInfused: number = 0, dVolInf = 0;
        if (Number.TryParse(this.VolumeInfused, (o) => { dVolInf = o }) && dVolInf > 0 && this.VolumeInfusedUOM != null && this.VolumeInfusedUOM.Tag != null && String.Equals(this.VolumeInfusedUOM.Tag.ToString(), CConstants.ml, StringComparison.CurrentCultureIgnoreCase)) {
            dToBeInfused = this.TotalVolumeToBeInfusedValue - dVolInf;
            dVolInf = 0;
            Number.TryParse(this.InfusedTotalVolume, (o) => { dVolInf = o });
            dToBeInfused = dToBeInfused - dVolInf;
            if (dToBeInfused > 0) {
                this.VolumePendingToInfuse = String.Format("{0} {1}", dToBeInfused, this.VolumeInfusedUOM.DisplayText);
                this.IsVisibleVolumeExceedsPrescriptionVolumeAlert = Visibility.Collapsed;
                this.IsNextBagEnabled = true;
                this.IsEnableDripCal = true;
            }
            else {
                this.VolumePendingToInfuse = String.Empty;
                this.IsVisibleVolumeExceedsPrescriptionVolumeAlert = Visibility.Visible;
                this.IsNextBagEnabled = false;
            }
        }
        else {
            this.VolumePendingToInfuse = String.Empty;
            this.IsVisibleVolumeExceedsPrescriptionVolumeAlert = Visibility.Collapsed;
            this.IsNextBagEnabled = true;
            this.IsEnableDripCal = true;
        }
    }
    public get VolumeInfusedUOM(): CListItem {
        return this._VolumeInfusedUOM;
    }
    public set VolumeInfusedUOM(value: CListItem) {
        if (!ObjectHelper.ReferenceEquals(this._VolumeInfusedUOM, value)) {
            this._VolumeInfusedUOM = value;
            // super.OnPropertyChanged("VolumeInfusedUOM");
            if (this.TotalVolumeToBeInfusedValue > 0) {
                this.CalculateVolumePendingToBeInfused();
            }
        }
    }
    public get VolumeInfusedUOMList(): ObservableCollection<CListItem> {
        return this._VolumeInfusedUOMList;
    }
    public set VolumeInfusedUOMList(value: ObservableCollection<CListItem>) {
        if (!ObjectHelper.ReferenceEquals(this._VolumeInfusedUOMList, value)) {
            this._VolumeInfusedUOMList = value;
            // super.OnPropertyChanged("VolumeInfusedUOMList");
        }
    }
    private _FormVM: InfRecAdmBase;
    public get FormVM(): InfRecAdmBase {
        return this._FormVM;
    }
    public set FormVM(value: InfRecAdmBase) {
        if (!ObjectHelper.ReferenceEquals(this._FormVM, value)) {
            this._FormVM = value;
            // OnPropertyChanged("FormVM");
        }
    }
    private _MedAdminOID: number;
    private _Dose: string;
    private _lnDoseUOMOID: number;
    private _DoseMandatory: boolean;
    private _SiteOID: number;
    private _ExpiryDate: DateTime;
    private _WitnessBy: string;
    private _AdministeredDateText: string;
    private _EndDate: DateTime;
    private _EndDateTime: DateTime;
    private profile: ProfileFactoryType = new ProfileFactoryType();
    private _Bolus: string;
    private _BackRoundInfusionRate: string;
    private _Wastage: string;
    private _InfusionRate: string;
    private _InfusionRateUOM: string;
    private _DripRate: string;
    private _DripRateUOM: string;
    private _BagVolume: string;
    private _BatchNumber: string;
    private _Comments: string;
    private _Lumen: string;
    private _BagVolumeUOM: CListItem;
    private _WastageUOM: CListItem;
    private _DeliveryDevice: CListItem;
    private _DoseUOM: CListItem;
    private _site: CListItem;
    private _DoseUOMOID: number;
    private _DeliveryDeviceList: ObservableCollection<CListItem>;
    private _SiteList: ObservableCollection<CListItem>;
    private _BagVolumeUOMList: ObservableCollection<CListItem>;
    private __WastageUOMList: ObservableCollection<CListItem>;
    private _DoseUOMs: ObservableCollection<CListItem>;
    public _AdministeredByList: ObservableCollection<CListItem>;
    public _WitnessByList: ObservableCollection<CListItem>;
    private _AdministeredByOID: string;
    private _AdministeredBy: string;
    private _AdministeredTime: string;
    private _IsNoWitnessAvialable: boolean;
    private _WitnessByOID: string;
    private _WitnessMandatory: boolean = false;
    private _UserName: string;
    private _PasswordText: string;
    private _PasswordMandShow: Visibility = Visibility.Collapsed;
    //public delegate void WitnessUserSelectedDlgt(SelectedUserType _SelectedUserType);
    public OnWitnessUserSelected: Function;
    private _CurrentServerDate: DateTime = CommonBB.GetServerDateTime();
    private _DoseUOMName: string;
    private _InfusionRateUOMID: number;
    private _InfusionRateUOMLorezoID: string;
    private _InfusionRatePerUOMID: number;
    private _InfusionRatePerLorezoID: string;
    private _DripRateUOMID: number;
    private _DripRatePerUOMID: number;
    private _InfusionAction: string;
    private _MedicationActionBegun: boolean;
    private _ItemSubType: string;
    private _InfusedTotalVolume: string;
    private _InfusedTotalVolUOM: CListItem;
    private _PrevBagSeqNo: number;
    private _PrescribedRoutes: ObservableCollection<CListItem>;
    private _StopDoseUOM: CListItem;
    private _StopDoseUOMs: ObservableCollection<CListItem>;
    public get PrevBagSeqNo(): number {
        return this._PrevBagSeqNo;
    }
    public set PrevBagSeqNo(value: number) {
        this._PrevBagSeqNo = value;
        // OnPropertyChanged("PrevBagSeqNo");
    }
    private _IsVisibleInfusionPeriodReachedAlert: Visibility = Visibility.Collapsed;
    public get IsVisibleInfusionPeriodReachedAlert(): Visibility {
        return this._IsVisibleInfusionPeriodReachedAlert;
    }
    public set IsVisibleInfusionPeriodReachedAlert(value: Visibility) {
        if (value != this._IsVisibleInfusionPeriodReachedAlert) {
            this._IsVisibleInfusionPeriodReachedAlert = value;
            // OnPropertyChanged("IsVisibleInfusionPeriodReachedAlert");
            // OnPropertyChanged("InfusionPeriodReachedAlertValue");
            // OnPropertyChanged("IsClinicalRSNMand");
        }
    }
    public get InfusionPeriodReachedAlertValue(): string {
        if (this.IsVisibleInfusionPeriodReachedAlert == Visibility.Visible) {
            if (String.Equals(this.InfusionAction, MedicationAction.CHANGEBAG, StringComparison.CurrentCultureIgnoreCase)) {
                return String.Format(MedicationAdministrator.txtInfusionPeriodReachedAlert, (this.InfAdministeredTimes != null && this.InfAdministeredTimes.Count > 0 && this.InfAdministeredTimes[0].InfusionOriginalEndDTTM != DateTime.MinValue) ? this.InfAdministeredTimes[0].InfusionOriginalEndDTTM.ToString(CConstants.DateTimeFormat) : String.Empty);
            }
            else {
                return String.Format(MedicationAdministrator.txtInfusionPeriodReachedCBandResumeAlert, (this.InfAdministeredTimes != null && this.InfAdministeredTimes.Count > 0 && this.InfAdministeredTimes[0].InfusionOriginalEndDTTM != DateTime.MinValue) ? this.InfAdministeredTimes[0].InfusionOriginalEndDTTM.ToString(CConstants.DateTimeFormat) : String.Empty);
            }
        }
        else {
            return String.Empty;
        }
    }
    private _IsVisibleVolumeExceedsPrescriptionVolumeAlert: Visibility = Visibility.Collapsed;
    public get IsVisibleVolumeExceedsPrescriptionVolumeAlert(): Visibility {
        return this._IsVisibleVolumeExceedsPrescriptionVolumeAlert;
    }
    public set IsVisibleVolumeExceedsPrescriptionVolumeAlert(value: Visibility) {
        if (value != this._IsVisibleVolumeExceedsPrescriptionVolumeAlert) {
            this._IsVisibleVolumeExceedsPrescriptionVolumeAlert = value;
            // OnPropertyChanged("IsVisibleVolumeExceedsPrescriptionVolumeAlert");
        }
    }
    public get IsDoseVisible(): Visibility {
        if (this.InfusionType != null && (this.InfusionType.Value == InfusionTypeCode.CONTINUOUS || this.InfusionType.Value == InfusionTypeCode.FLUID)) {
            return Visibility.Collapsed;
        }
        else {
            return Visibility.Visible;
        }
    }
    public get IsInfusionDoseVisible(): Visibility {
        if (this.InfusionType != null && this.InfusionType.Value == InfusionTypeCode.FLUID) {
            return Visibility.Collapsed;
        }
        else {
            return Visibility.Visible;
        }
    }
    public get IsConcentrationVisible(): Visibility {
        if (this.InfusionType != null && (this.InfusionType.Value == InfusionTypeCode.FLUID) || (String.Equals(this.InfusionType.Value, InfusionTypeCode.CONTINUOUS) && this.lblConcentrationVisi == Visibility.Collapsed)) {
            return Visibility.Collapsed;
        }
        else {
            return Visibility.Visible;
        }
    }
    private _TotalVolumeToBeInfused: string;
    public get TotalVolumeToBeInfused(): string {
        if (this.InfusionType != null && this.InfusionType.Value == InfusionTypeCode.CONTINUOUS) {
            return String.Empty;
        }
        else {
            return this._TotalVolumeToBeInfused;
        }
    }
    public set TotalVolumeToBeInfused(value: string) {
        if (value != this._TotalVolumeToBeInfused) {
            this._TotalVolumeToBeInfused = value;
            // OnPropertyChanged("TotalVolumeToBeInfused");
        }
    }
    private _TotalVolumeToBeInfusedValue: number;
    public get TotalVolumeToBeInfusedValue(): number {
        return this._TotalVolumeToBeInfusedValue;
    }
    public set TotalVolumeToBeInfusedValue(value: number) {
        if (value != this._TotalVolumeToBeInfusedValue) {
            this._TotalVolumeToBeInfusedValue = value;
        }
    }
    private _TotalVolumeToBeInfusedUOM: string;
    public get TotalVolumeToBeInfusedUOM(): string {
        return this._TotalVolumeToBeInfusedUOM;
    }
    public set TotalVolumeToBeInfusedUOM(value: string) {
        if (value != this._TotalVolumeToBeInfusedUOM) {
            this._TotalVolumeToBeInfusedUOM = value;
        }
    }
    private _CummulativeVolumeInfused: string;
    public get CummulativeVolumeInfused(): string {
        return this._CummulativeVolumeInfused;
    }
    public set CummulativeVolumeInfused(value: string) {
        if (value != this._CummulativeVolumeInfused) {
            this._CummulativeVolumeInfused = value;
            // OnPropertyChanged("CummulativeVolumeInfused");
        }
    }
    private _VolumePendingToInfuse: string;
    public get VolumePendingToInfuse(): string {
        if (this.InfusionType != null && this.InfusionType.Value == InfusionTypeCode.CONTINUOUS) {
            return String.Empty;
        }
        else {
            return this._VolumePendingToInfuse;
        }
    }
    public set VolumePendingToInfuse(value: string) {
        if (value != this._VolumePendingToInfuse) {
            this._VolumePendingToInfuse = value;
            // OnPropertyChanged("VolumePendingToInfuse");
        }
    }
    private _EstVolumeInfusedInProgress: string;
    public get EstVolumeInfusedInProgress(): string {
        return this._EstVolumeInfusedInProgress;
    }
    public set EstVolumeInfusedInProgress(value: string) {
        if (value != this._EstVolumeInfusedInProgress) {
            this._EstVolumeInfusedInProgress = value;
            // OnPropertyChanged("EstVolumeInfusedInProgress");
        }
    }
    private _IsNextBagEnabled: boolean = true;
    public get IsNextBagEnabled(): boolean {
        return this._IsNextBagEnabled;
    }
    public set IsNextBagEnabled(value: boolean) {
        if (value != this._IsNextBagEnabled) {
            this._IsNextBagEnabled = value;
            // OnPropertyChanged("IsNextBagEnabled");
        }
    }
    private _BackgrdInfRateVisi: Visibility = Visibility.Visible;
    public get BackgrdInfRateVisi(): Visibility {
        return this._BackgrdInfRateVisi;
    }
    public set BackgrdInfRateVisi(value: Visibility) {
        if (value != this._BackgrdInfRateVisi) {
            this._BackgrdInfRateVisi = value;
            // OnPropertyChanged("BackgrdInfRateVisi");
        }
    }
    public get InfusedTotalVolUOM(): CListItem {
        return this._InfusedTotalVolUOM;
    }
    public set InfusedTotalVolUOM(value: CListItem) {
        this._InfusedTotalVolUOM = value;
        // OnPropertyChanged("InfusedTotalVolUOM");
    }
    public get InfusedTotalVolume(): string {
        return this._InfusedTotalVolume;
    }
    public set InfusedTotalVolume(value: string) {
        this._InfusedTotalVolume = value;
        // OnPropertyChanged("InfusedTotalVolume");
    }
    public get MedicationActionBegun(): boolean {
        return this._MedicationActionBegun;
    }
    public set MedicationActionBegun(value: boolean) {
        this._MedicationActionBegun = value;
        // OnPropertyChanged("MedicationActionBegun");
    }
    public get ItemSubType(): string {
        return this._ItemSubType;
    }
    public set ItemSubType(value: string) {
        this._ItemSubType = value;
    }
    public get InfusionAction(): string {
        return this._InfusionAction;
    }
    public set InfusionAction(value: string) {
        this._InfusionAction = value;
        // OnPropertyChanged("InfusionAction");
    }
    private _RecordOneMoreAction: string;
    public get RecordOneMoreAction(): string {
        return this._RecordOneMoreAction;
    }
    public set RecordOneMoreAction(value: string) {
        this._RecordOneMoreAction = value;
    }
    private _RecordOMASequence: string;
    public get RecordOMASequence(): string {
        return this._RecordOMASequence;
    }
    public set RecordOMASequence(value: string) {
        this._RecordOMASequence = value;
    }
    private _PrevInfusionAction: string;
    public get PrevInfusionAction(): string {
        return this._PrevInfusionAction;
    }
    public set PrevInfusionAction(value: string) {
        this._PrevInfusionAction = value;
        // OnPropertyChanged("PrevInfusionAction");
    }
    private _PrevInfusionActionCode: string;
    public get PrevInfusionActionCode(): string {
        return this._PrevInfusionActionCode;
    }
    public set PrevInfusionActionCode(value: string) {
        this._PrevInfusionActionCode = value;
        // OnPropertyChanged("PrevInfusionActionCode");
    }
    private _ChangeFlowRateAlert: boolean;
    public get ChangeFlowRateAlert(): boolean {
        return this._ChangeFlowRateAlert;
    }
    public set ChangeFlowRateAlert(value: boolean) {
        this._ChangeFlowRateAlert = value;
        // OnPropertyChanged("ChangeFlowRateAlert");
    }
    private _IsDuringHomeLeave: boolean;
    public get IsDuringHomeLeave(): boolean {
        return this._IsDuringHomeLeave;
    }
    public set IsDuringHomeLeave(value: boolean) {
        this._IsDuringHomeLeave = value;
        // OnPropertyChanged("IsDuringHomeLeave");
    }
    private _ChangeConcentrationAlert: boolean;
    public get ChangeConcentrationAlert(): boolean {
        return this._ChangeConcentrationAlert;
    }
    public set ChangeConcentrationAlert(value: boolean) {
        this._ChangeConcentrationAlert = value;
        if (this._ChangeConcentrationAlert || this._ChangeRateAndConcentrationAlert)
            this.PrevConcentrationVisible = Visibility.Visible;
        else this.PrevConcentrationVisible = Visibility.Collapsed;
        // OnPropertyChanged("ChangeConcentrationAlert");
    }
    private _ChangeRateAndConcentrationAlert: boolean;
    public get ChangeRateAndConcentrationAlert(): boolean {
        return this._ChangeRateAndConcentrationAlert;
    }
    public set ChangeRateAndConcentrationAlert(value: boolean) {
        this._ChangeRateAndConcentrationAlert = value;
        if (this._ChangeConcentrationAlert || this._ChangeRateAndConcentrationAlert)
            this.PrevConcentrationVisible = Visibility.Visible;
        else this.PrevConcentrationVisible = Visibility.Collapsed;
        // OnPropertyChanged("ChangeRateAndConcentrationAlert");
    }
    private _AmendmentAlert: boolean;
    public get AmendmentAlert(): boolean {
        return this._AmendmentAlert;
    }
    public set AmendmentAlert(value: boolean) {
        this._AmendmentAlert = value;
        // OnPropertyChanged("AmendmentAlert");
    }
    private _DiscontinueAlert: boolean;
    public get DiscontinueAlert(): boolean {
        return this._DiscontinueAlert;
    }
    public set DiscontinueAlert(value: boolean) {
        this._DiscontinueAlert = value;
        // OnPropertyChanged("DiscontinueAlert");
    }
    private _DueAlert: boolean;
    public get DueAlert(): boolean {
        return this._DueAlert;
    }
    public set DueAlert(value: boolean) {
        this._DueAlert = value;
        // OnPropertyChanged("DueAlert");
    }
    private _OverDueAlert: boolean;
    public get OverDueAlert(): boolean {
        return this._OverDueAlert;
    }
    public set OverDueAlert(value: boolean) {
        this._OverDueAlert = value;
        // OnPropertyChanged("OverDueAlert");
    }
    private _InfusionPeriodCompletedAlert: boolean;
    public get InfusionPeriodCompletedAlert(): boolean {
        return this._InfusionPeriodCompletedAlert;
    }
    public set InfusionPeriodCompletedAlert(value: boolean) {
        this._InfusionPeriodCompletedAlert = value;
        // OnPropertyChanged("InfusionPeriodCompletedAlert");
    }
    private _CondDoseMonitoringPeriodAlert: boolean;
    public get CondDoseMonitoringPeriodAlert(): boolean {
        return this._CondDoseMonitoringPeriodAlert;
    }
    public set CondDoseMonitoringPeriodAlert(value: boolean) {
        this._CondDoseMonitoringPeriodAlert = value;
        // OnPropertyChanged("CondDoseMonitoringPeriodAlert");
    }
    public get InfusionRateUOMLorenzoID(): string {
        return this._InfusionRateUOMLorezoID;
    }
    public set InfusionRateUOMLorenzoID(value: string) {
        this._InfusionRateUOMLorezoID = value;
    }
    public get InfusionRatePerLorezoID(): string {
        return this._InfusionRatePerLorezoID;
    }
    public set InfusionRatePerLorezoID(value: string) {
        this._InfusionRatePerLorezoID = value;
    }
    public get DripRateUOMID(): number {
        return this._DripRateUOMID;
    }
    public set DripRateUOMID(value: number) {
        this._DripRateUOMID = value;
    }
    public get DripRatePerUOMID(): number {
        return this._DripRatePerUOMID;
    }
    public set DripRatePerUOMID(value: number) {
        this._DripRatePerUOMID = value;
    }
    public get DoseUOMName(): string {
        return this._DoseUOMName;
    }
    public set DoseUOMName(value: string) {
        if (!ObjectHelper.ReferenceEquals(this._DoseUOMName, value)) {
            this._DoseUOMName = value;
            // OnPropertyChanged("DoseUOMName");
        }
    }
    public get CurrentServerDate(): DateTime {
        return this._CurrentServerDate;
    }
    public set CurrentServerDate(value: DateTime) {
        if (this._CurrentServerDate != value) {
            this._CurrentServerDate = value;
            // OnPropertyChanged("CurrentServerDate");
        }
    }
    private drugDetail: DrugItem;
    public get DrugDetail(): DrugItem {
        return this.drugDetail;
    }
    public set DrugDetail(value: DrugItem) {
        if (!ObjectHelper.ReferenceEquals(this.drugDetail, value)) {
            this.drugDetail = value;
            // OnPropertyChanged("DrugDetail");
        }
    }
    private _PrescriptionItemOID: number;
    public get PrescriptionItemOID(): number {
        return this._PrescriptionItemOID;
    }
    public set PrescriptionItemOID(value: number) {
        if (this._PrescriptionItemOID != value) {
            this._PrescriptionItemOID = value;
            // OnPropertyChanged("PrescriptionItemOID");
        }
    }
    private _PresScheduleOID: number;
    public get PresScheduleOID(): number {
        return this._PresScheduleOID;
    }
    public set PresScheduleOID(value: number) {
        if (this._PresScheduleOID != value) {
            this._PresScheduleOID = value;
            // OnPropertyChanged("PresScheduleOID");
        }
    }
    private _PatientOID: number;
    public get PatientOID(): number {
        return this._PatientOID;
    }
    public set PatientOID(value: number) {
        if (this._PatientOID != value) {
            this._PatientOID = value;
            // OnPropertyChanged("PatientOID");
        }
    }
    private _InfusionAdministrationDetail: AdministrationDetailVM;
    public get InfusionAdministrationDetail(): AdministrationDetailVM {
        return this._InfusionAdministrationDetail;
    }
    public set InfusionAdministrationDetail(value: AdministrationDetailVM) {
        this._InfusionAdministrationDetail = value;
        // super.OnPropertyChanged("InfusionAdministrationDetail");
    }
    public IdentifyingOID: number;
    public IdentifyingType: string;
    public MCVersionNo: string;
    public Lorenzoid: string;
    public Multicomponentitem: string;
    public PrescriptionItemStatus: string;
    public PrescriptionStartDate: DateTime;
    public PrescriptionEndDate: DateTime;
    public IsPRN: boolean;
    public LastActionDateTime: DateTime;
    public isWitnessBySelected: boolean;

    public get DoseUOMs(): ObservableCollection<CListItem> {
        return this._DoseUOMs;
    }
    public set DoseUOMs(value: ObservableCollection<CListItem>) {
        this._DoseUOMs = value;
        // super.OnPropertyChanged("DoseUOMs");
    }
    public get Dose(): string {
        return this._Dose;
    }
    public set Dose(value: string) {
        if (!ObjectHelper.ReferenceEquals(this._Dose, value)) {
            this._Dose = value;
            // super.OnPropertyChanged("Dose");
        }
        if (this.IsRetrospective) {
            this.DoseAdministered = this.Dose;
        }
    }
    public get DoseUOMOID(): number {
        return this._DoseUOMOID;
    }
    public set DoseUOMOID(value: number) {
        this._DoseUOMOID = value;
        // OnPropertyChanged("DoseUOMOID");
    }
    public get lstDoseUOM(): CListItem {
        return this._DoseUOM;
    }
    public set lstDoseUOM(value: CListItem) {
        if (!ObjectHelper.ReferenceEquals(this._DoseUOM, value)) {
            if (value != null && value.DisplayText == "More") {
                this._DoseUOM = null;
                this.GetMoreComboOption(CConstants.DoseUOMOptionCode);
            }
            else {
                this._DoseUOM = value;
                this.DoseUOMOID = Convert.ToInt64(this._DoseUOM.Value);
                // OnPropertyChanged("lstDoseUOM");
            }
        }
    }
    public get StopDoseUOMs(): ObservableCollection<CListItem> {
        return this._StopDoseUOMs;
    }
    public set StopDoseUOMs(value: ObservableCollection<CListItem>) {
        this._StopDoseUOMs = value;
        // super.OnPropertyChanged("StopDoseUOMs");
    }
    public get lstStopDoseUOM(): CListItem {
        return this._StopDoseUOM;
    }
    public set lstStopDoseUOM(value: CListItem) {
        if (!ObjectHelper.ReferenceEquals(this._StopDoseUOM, value)) {
            if (value != null && value.DisplayText == "More") {
                this._StopDoseUOM = null;
                this.GetMoreComboOption(CConstants.StopDoseUOM);
            }
            else {
                this._StopDoseUOM = value;
                if (value != null && value instanceof CListItem) {
                    let _tmpDoseUOMOID: number;
                    if (Number.TryParse(value.Value, (o) => { _tmpDoseUOMOID = o })) {
                        this.DoseUOMOID = _tmpDoseUOMOID;
                    }
                }
                // OnPropertyChanged("lstStopDoseUOM");
            }
        }
    }
    public get AdministeredByList(): ObservableCollection<CListItem> {
        return this._AdministeredByList;
    }
    public set AdministeredByList(value: ObservableCollection<CListItem>) {
        {
            this._AdministeredByList = value;
            // OnPropertyChanged("AdministeredByList");
        }
    }
    public get AdministeredByOID(): string {
        return this._AdministeredByOID;
    }
    public set AdministeredByOID(value: string) {
        if (this._AdministeredByOID != value) {
            this._AdministeredByOID = value;
            if (!String.IsNullOrEmpty(value) && this.OnWitnessUserSelected != null && !this._IsSFSValueSetFromOnGetSFSItems) {
                this.OnWitnessUserSelected(SelectedUserType.AdministeringUser);
            }
            // OnPropertyChanged("AdministeredByOID");
        }
    }
    public get WitnessByList(): ObservableCollection<CListItem> {
        return this._WitnessByList;
    }
    public set WitnessByList(value: ObservableCollection<CListItem>) {
        if (!ObjectHelper.ReferenceEquals(this._WitnessByList, value)) {
            this._WitnessByList = value;
            // OnPropertyChanged("WitnessByList");
        }
    }
    public get AdministeredBy(): string {
        return this._AdministeredBy;
    }
    public set AdministeredBy(value: string) {
        if (this._AdministeredBy != value) {
            this._AdministeredBy = value;
            if (String.IsNullOrEmpty(this._AdministeredBy)) {
                this.AdministeredByOID = String.Empty;
            }
            // OnPropertyChanged("AdministeredBy");
        }
    }
    public get WitnessByOID(): string {
        return this._WitnessByOID;
    }
    public set WitnessByOID(value: string) {
        if (this._WitnessByOID != value) {
            this._WitnessByOID = value;
            if (!String.IsNullOrEmpty(this._WitnessByOID) && this.OnWitnessUserSelected != null && !this._IsSFSValueSetFromOnGetSFSItems) {
                this.OnWitnessUserSelected(SelectedUserType.WitnessingUser);
            }
            // OnPropertyChanged("WitnessByOID");
        }
    }
    public get WitnessBy(): string {
        return this._WitnessBy;
    }
    public set WitnessBy(value: string) {
        if (this._WitnessBy != value) {
            this._WitnessBy = value;
            if (String.IsNullOrEmpty(this._WitnessBy)) {
                this.WitnessByOID = String.Empty;
            }
            // OnPropertyChanged("WitnessBy");
        }
    }
    public get IsNoWitnessAvialable(): boolean {
        return this._IsNoWitnessAvialable;
    }
    public set IsNoWitnessAvialable(value: boolean) {
        if (!ObjectHelper.ReferenceEquals(this._IsNoWitnessAvialable, value)) {
            this._IsNoWitnessAvialable = value;
            // OnPropertyChanged("IsNoWitnessAvialable");
        }
    }
    public get UserName(): string {
        return this._UserName;
    }
    public set UserName(value: string) {
        if (this._UserName != value) {
            this._UserName = value;
            // OnPropertyChanged("UserName");
        }
    }
    public get PasswordText(): string {
        return this._PasswordText;
    }
    public set PasswordText(value: string) {
        if (this._PasswordText != value) {
            this._PasswordText = value;
            // OnPropertyChanged("PasswordText");
        }
    }
    public get PasswordMandShow(): Visibility {
        return this._PasswordMandShow;
    }
    public set PasswordMandShow(value: Visibility) {
        if (this._PasswordMandShow != value) {
            this._PasswordMandShow = value;
            // OnPropertyChanged("PasswordMandShow");
        }
    }
    public get WitnessMandatory(): boolean {
        return this._WitnessMandatory;
    }
    public set WitnessMandatory(value: boolean) {
        if (this._WitnessMandatory != value) {
            this._WitnessMandatory = value;
            // super.OnPropertyChanged("WitnessMandatory");
        }
    }
    public PasswordSuccess: boolean;
    public get ExpiryDate(): DateTime {
        return this._ExpiryDate;
    }
    public set ExpiryDate(value: DateTime) {
        if (!ObjectHelper.ReferenceEquals(this._ExpiryDate, value)) {
            if (value.Date >= CommonBB.GetServerDateTime().Date) {
                this._ExpiryDate = value;
            }
          /*   else {
                this._ExpiryDate = DateTime.MinValue;
            } */
            if (String.Equals(this.InfusionAction, MedicationAction.BEGUN, StringComparison.InvariantCultureIgnoreCase) || (String.Equals(this.InfusionAction, MedicationAction.CHANGEBAG, StringComparison.InvariantCultureIgnoreCase) && this.IsExists == 'N')) {
                if ((this._ExpiryDate != null && this._ExpiryDate != DateTime.MinValue) || !String.IsNullOrEmpty(this.BatchNumber)) {
                    this.IsScanInfrecadminlinkenabled = false;
                }
                else {
                    this.IsScanInfrecadminlinkenabled = true;
                }
            }
            // OnPropertyChanged("ExpiryDate");
        }
    }
    public get EndDate(): DateTime {
        return this._EndDate;
    }
    public set EndDate(value: DateTime) {
        if (!ObjectHelper.ReferenceEquals(this._EndDate, value)) {
            this._EndDate = value;
            if (this.EnddateTime)
            if(value != DateTime.MinValue){
                this.EnddateTime = value.DateTime.AddTime(this.EnddateTime);
            }

            // OnPropertyChanged("EndDate");
        }
    }
    public get EnddateTime(): DateTime {
        return this._EndDateTime;
    }
    public set EnddateTime(value: DateTime) {
        if (value != this._EndDateTime) {
            // if (this._EndDate)
            //     this._EndDateTime = this._EndDate.DateTime.AddTime(value);
            // else
                this._EndDateTime = value;
            // OnPropertyChanged("EnddateTime");
            if (this.InfusionType != null && String.Equals(this.InfusionType.Value, InfusionTypeCode.CONTINUOUS, StringComparison.CurrentCultureIgnoreCase) && this.InfusionPeriodCompletedAlert && this.InfAdministeredTimes != null && this.InfAdministeredTimes.Count > 0 && this.InfAdministeredTimes[0].InfusionOriginalEndDTTM != DateTime.MinValue && this.InfAdministeredTimes[0].InfusionOriginalEndDTTM <= this._EndDateTime) {
                this.IsVisibleInfusionPeriodReachedAlert = Visibility.Visible;
            }
            else {
                this.IsVisibleInfusionPeriodReachedAlert = Visibility.Collapsed;
            }
        }
    }
    public get MedAdminOID(): number {
        return this._MedAdminOID;
    }
    public set MedAdminOID(value: number) {
        if (this._MedAdminOID != value) {
            this._MedAdminOID = value;
            // OnPropertyChanged("MedAdminOID");
        }
    }
    private _InfSlotStatus: string;
    public get InfSlotStatus(): string {
        return this._InfSlotStatus;
    }
    public set InfSlotStatus(value: string) {
        if (!ObjectHelper.ReferenceEquals(this._InfSlotStatus, value)) {
            this._InfSlotStatus = value;
            // OnPropertyChanged("InfSlotStatus");
        }
    }
    public get Lumen(): string {
        return this._Lumen;
    }
    public set Lumen(value: string) {
        if (this._Lumen != value) {
            this._Lumen = value;
            // OnPropertyChanged("Lumen");
        }
    }
    public get DoseMandatory(): boolean {
        return this._DoseMandatory;
    }
    public set DoseMandatory(value: boolean) {
        if (this._DoseMandatory != value) {
            this._DoseMandatory = value;
            // OnPropertyChanged("DoseMandatory");
        }
    }
    public get lnDoseUOMOID(): number {
        return this._lnDoseUOMOID;
    }
    public set lnDoseUOMOID(value: number) {
        if (this._lnDoseUOMOID != value) {
            this._lnDoseUOMOID = value;
            // OnPropertyChanged("lnDoseUOMOID");
        }
    }
    public identifyingOID: number;
    public identifyingType: string;
    private _slotdate: DateTime = CommonBB.GetServerDateTime();
    public get SlotDate(): DateTime {
        return this._slotdate;
    }
    public set SlotDate(value: DateTime) {
        if (!ObjectHelper.ReferenceEquals(this._slotdate, value)) {
            this._slotdate = value;
            // OnPropertyChanged("SlotDate");
        }
    }
    public get AdministeredDateText(): string {
        return this._AdministeredDateText;
    }
    public set AdministeredDateText(value: string) {
        if (!ObjectHelper.ReferenceEquals(this._AdministeredDateText, value)) {
            this._AdministeredDateText = value;
            // OnPropertyChanged("AdministeredDateText");
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
            let d: DateTime = DateTime.Parse(value);
            if (d.TimeOfDay != this._AdministeredTimeSpan) {
                this._AdministeredTimeSpan = d.TimeOfDay;
                this._AdministeredTime = String.Empty;
                // OnPropertyChanged("AdministeredTime");
            }
        }
        else {
            if (!ObjectHelper.ReferenceEquals(this.AdministeredTime, value)) {
                this.AdministeredTime = value;
                // OnPropertyChanged("AdministeredTime");
            }
        }
    }
    private _InfBagDetails: ObservableCollection<InfusionBagDetail>;
    public get InfBagDetails(): ObservableCollection<InfusionBagDetail> {
        return this._InfBagDetails;
    }
    public set InfBagDetails(value: ObservableCollection<InfusionBagDetail>) {
        if (!ObjectHelper.ReferenceEquals(this._InfBagDetails, value)) {
            this._InfBagDetails = value;
            // OnPropertyChanged("InfBagDetails");
        }
    }
    public canLanchUserAuth: boolean = true;
    public get Bolus(): string {
        return this._Bolus;
    }
    public set Bolus(value: string) {
        if (!ObjectHelper.ReferenceEquals(this._Bolus, value)) {
            this._Bolus = value;
            // super.OnPropertyChanged("Bolus");
        }
    }
    public get BackRoundInfusionRate(): string {
        return this._BackRoundInfusionRate;
    }
    public set BackRoundInfusionRate(value: string) {
        if (!ObjectHelper.ReferenceEquals(this._BackRoundInfusionRate, value)) {
            this._BackRoundInfusionRate = value;
            // super.OnPropertyChanged("BackRoundInfusionRate");
        }
    }
    public get Wastage(): string {
        return this._Wastage;
    }
    public set Wastage(value: string) {
        if (!ObjectHelper.ReferenceEquals(this._Wastage, value)) {
            this._Wastage = value;
            // super.OnPropertyChanged("Wastage");
        }
    }
    public get InfusionRate(): string {
        return this._InfusionRate;
    }
    public set InfusionRate(value: string) {
        if (!ObjectHelper.ReferenceEquals(this._InfusionRate, value)) {
            this._InfusionRate = value;
            this.DripInfusionRate = value;
            if (!(String.Equals(this.InfusionAction, MedicationAction.BEGUN) && (String.IsNullOrEmpty(this.DontChangeInfRateDefValue) || (String.Equals(this.DontChangeInfRateDefValue, "0")))))
                this.IsClinicalRSNMand = true;
            // super.OnPropertyChanged("InfusionRate");
        }
    }
    public get InfusionRateUOM(): string {
        return this._InfusionRateUOM;
    }
    public set InfusionRateUOM(value: string) {
        if (!ObjectHelper.ReferenceEquals(this._InfusionRateUOM, value)) {
            this._InfusionRateUOM = value;
            // super.OnPropertyChanged("InfusionRateUOM");
        }
    }
    public get DripRate(): string {
        return this._DripRate;
    }
    public set DripRate(value: string) {
        if (!ObjectHelper.ReferenceEquals(this._DripRate, value)) {
            this._DripRate = value;
            this.IsClinicalRSNMand = true;
            // super.OnPropertyChanged("DripRate");
        }
    }
    public get DripRateUOM(): string {
        return this._DripRateUOM;
    }
    public set DripRateUOM(value: string) {
        if (!ObjectHelper.ReferenceEquals(this._DripRateUOM, value)) {
            this._DripRateUOM = value;
            this.IsClinicalRSNMand = true;
            // super.OnPropertyChanged("DripRateUOM");
        }
    }

    private _isDriprateChage: boolean;
    public get isDriprateChage(): boolean {
        return this._isDriprateChage;
    }
    public set isDriprateChage(value: boolean) {
        if (!ObjectHelper.ReferenceEquals(this._isDriprateChage, value)) {
            this._isDriprateChage = value;
        }
    }

    public get BagVolume(): string {
        return this._BagVolume;
    }
    public set BagVolume(value: string) {
        if (!ObjectHelper.ReferenceEquals(this._BagVolume, value)) {
            this._BagVolume = value;
            // super.OnPropertyChanged("BagVolume");
        }
    }
    public get BagVolumeUOM(): CListItem {
        return this._BagVolumeUOM;
    }
    public set BagVolumeUOM(value: CListItem) {
        if (!ObjectHelper.ReferenceEquals(this._BagVolumeUOM, value)) {
            this._BagVolumeUOM = value;
            // super.OnPropertyChanged("BagVolumeUOM");
        }
    }
    public get BagVolumeUOMList(): ObservableCollection<CListItem> {
        return this._BagVolumeUOMList;
    }
    public set BagVolumeUOMList(value: ObservableCollection<CListItem>) {
        if (!ObjectHelper.ReferenceEquals(this._BagVolumeUOMList, value)) {
            this._BagVolumeUOMList = value;
            // super.OnPropertyChanged("BagVolumeUOMList");
        }
    }
    public get WastageUOM(): CListItem {
        return this._WastageUOM;
    }
    public set WastageUOM(value: CListItem) {
        if (!ObjectHelper.ReferenceEquals(this._WastageUOM, value)) {
            this._WastageUOM = value;
            // super.OnPropertyChanged("WastageUOM");
        }
    }
    public get WastageUOMList(): ObservableCollection<CListItem> {
        return this.__WastageUOMList;
    }
    public set WastageUOMList(value: ObservableCollection<CListItem>) {
        if (!ObjectHelper.ReferenceEquals(this.__WastageUOMList, value)) {
            this.__WastageUOMList = value;
            // super.OnPropertyChanged("WastageUOMList");
        }
    }
    public get BatchNumber(): string {
        return this._BatchNumber;
    }
    public set BatchNumber(value: string) {
        if (!ObjectHelper.ReferenceEquals(this._BatchNumber, value)) {
            this._BatchNumber = value;
            if (String.Equals(this.InfusionAction, MedicationAction.BEGUN, StringComparison.InvariantCultureIgnoreCase) || (String.Equals(this.InfusionAction, MedicationAction.CHANGEBAG, StringComparison.InvariantCultureIgnoreCase) && this.IsExists == 'N')) {
                if (!String.IsNullOrEmpty(this._BatchNumber) || (this.ExpiryDate != null && this.ExpiryDate != DateTime.MinValue)) {
                    this.IsScanInfrecadminlinkenabled = false;
                }
                else {
                    this.IsScanInfrecadminlinkenabled = true;
                }
            }
            // super.OnPropertyChanged("BatchNumber");
        }
    }
    public get SiteList(): ObservableCollection<CListItem> {
        return this._SiteList;
    }
    public set SiteList(value: ObservableCollection<CListItem>) {
        if (this._SiteList != value) {
            this._SiteList = value;
            // super.OnPropertyChanged("SiteList");
        }
    }
    public get Site(): CListItem {
        return this._site;
    }
    public set Site(value: CListItem) {
        if (value != null && value.DisplayText == "More") {
            this.GetMoreComboOption(CConstants.SiteOptionCode);
            this._site = value;
        }
        else {
            this._site = value;
            // super.OnPropertyChanged("Site");
        }
    }
    public get SiteOID(): number {
        return this._SiteOID;
    }
    public set SiteOID(value: number) {
        if (!ObjectHelper.ReferenceEquals(this._SiteOID, value)) {
            this._SiteOID = value;
            // OnPropertyChanged("SiteOID");
        }
    }
    public get PrescribedRoutes(): ObservableCollection<CListItem> {
        return this._PrescribedRoutes;
    }
    public set PrescribedRoutes(value: ObservableCollection<CListItem>) {
        if (this._PrescribedRoutes != value) {
            this._PrescribedRoutes = value;
            // OnPropertyChanged("PrescribedRoutes");
        }
    }
    private _SelectedRoute: CListItem;
    public get SelectedRoute(): CListItem {
        return this._SelectedRoute;
    }
    public set SelectedRoute(value: CListItem) {
        if (this._SelectedRoute != value) {
            this._SelectedRoute = value;
            // OnPropertyChanged("SelectedRoute");
        }
    }
    public get DeliveryDevice(): CListItem {
        return this._DeliveryDevice;
    }
    public set DeliveryDevice(value: CListItem) {
        if (!ObjectHelper.ReferenceEquals(this._DeliveryDevice, value)) {
            this._DeliveryDevice = value;
            // OnPropertyChanged("DeliveryDevice");
        }
    }
    private _DeliveryDeviceText: string;
    public get DeliveryDeviceText(): string {
        return this._DeliveryDeviceText;
    }
    public set DeliveryDeviceText(value: string) {
        if (value != this._DeliveryDeviceText) {
            this._DeliveryDeviceText = value;
            // OnPropertyChanged("DeliveryDeviceText");
        }
    }
    private _IsEnabledDeliveryDevice: boolean;
    public get IsEnabledDeliveryDevice(): boolean {
        return this._IsEnabledDeliveryDevice;
    }
    public set IsEnabledDeliveryDevice(value: boolean) {
        if (!ObjectHelper.ReferenceEquals(this._IsEnabledDeliveryDevice, value)) {
            this._IsEnabledDeliveryDevice = value;
            // OnPropertyChanged("IsEnabledDeliveryDevice");
        }
    }
    public get DeliveryDeviceList(): ObservableCollection<CListItem> {
        return this._DeliveryDeviceList;
    }
    public set DeliveryDeviceList(value: ObservableCollection<CListItem>) {
        if (!ObjectHelper.ReferenceEquals(this._DeliveryDeviceList, value)) {
            this._DeliveryDeviceList = value;
            // OnPropertyChanged("DeliveryDeviceList");
        }
    }
    public get Comments(): string {
        return this._Comments;
    }
    public set Comments(value: string) {
        if (!ObjectHelper.ReferenceEquals(this._Comments, value)) {
            this._Comments = value;
            // super.OnPropertyChanged("Comments");
        }
    }
    private _PreviousConcentration: string = String.Empty;
    private _ConcentrationStrength: string = String.Empty;
    private _ConcentrationStrengthUOM: CListItem;
    private _ConcentrationStrengthUOMList: ObservableCollection<CListItem>;
    private _ConcentrationVolume: string = String.Empty;
    private _ConcentrationVolumeUOM: CListItem;
    private _ConcentrationVolumeUOMList: ObservableCollection<CListItem>;
    private _EnableConcentration: boolean = true;
    private _IsMandatoryConcentration: boolean = false;
    private _PrevConcentrationVisible: Visibility = Visibility.Collapsed;
    private _ConcentrationLabel: string = "Concentration";
    private _InfusionDose: string = "0";
    private _InfusionDoseNumeratorUOMID: number = 0;
    private _InfusionDoseDenominatorUOMID: number = 0;
    private _InfusionDoseUOM: string = String.Empty;
    private _EnableInfusionDose: boolean = false;
    private _InfusionPeriodMedAdmin: string = String.Empty;
    private _InfusionPeriodMedAdminUOM: CListItem;
    private _InfusionPeriodMedAdminUOMList: ObservableCollection<CListItem>;
    private _EnableInfusionPeriodMedAdmin: boolean = false;
    public get ConcentrationStrength(): string {
        return this._ConcentrationStrength;
    }
    public set ConcentrationStrength(value: string) {
        if (!ObjectHelper.ReferenceEquals(this._ConcentrationStrength, value)) {
            this._ConcentrationStrength = value;
            // super.OnPropertyChanged("ConcentrationStrength");
        }
    }
    public get ConcentrationStrengthUOM(): CListItem {
        return this._ConcentrationStrengthUOM;
    }
    public set ConcentrationStrengthUOM(value: CListItem) {
        if (!ObjectHelper.ReferenceEquals(this._ConcentrationStrengthUOM, value)) {
            if (value != null && value.Value != null && value.Value == "CC_More") {
                this.GetMoreComboOption(CConstants.ConcentrationDoseUOM);
            }
            this._ConcentrationStrengthUOM = value;
            // super.OnPropertyChanged("ConcentrationStrengthUOM");
        }
    }
    public get ConcentrationStrengthUOMList(): ObservableCollection<CListItem> {
        return this._ConcentrationStrengthUOMList;
    }
    public set ConcentrationStrengthUOMList(value: ObservableCollection<CListItem>) {
        if (!ObjectHelper.ReferenceEquals(this._ConcentrationStrengthUOMList, value)) {
            this._ConcentrationStrengthUOMList = value;
            // super.OnPropertyChanged("ConcentrationStrengthUOMList");
        }
    }
    public get ConcentrationVolume(): string {
        return this._ConcentrationVolume;
    }
    public set ConcentrationVolume(value: string) {
        if (!ObjectHelper.ReferenceEquals(this._ConcentrationVolume, value)) {
            this._ConcentrationVolume = value;
            // super.OnPropertyChanged("ConcentrationVolume");
        }
    }
    public get PreviousConcentration(): string {
        return this._PreviousConcentration;
    }
    public set PreviousConcentration(value: string) {
        if (!ObjectHelper.ReferenceEquals(this._PreviousConcentration, value)) {
            this._PreviousConcentration = value;
            // super.OnPropertyChanged("PreviousConcentration");
        }
    }
    public get ConcentrationVolumeUOM(): CListItem {
        return this._ConcentrationVolumeUOM;
    }
    public set ConcentrationVolumeUOM(value: CListItem) {
        if (!ObjectHelper.ReferenceEquals(this._ConcentrationVolumeUOM, value)) {
            this._ConcentrationVolumeUOM = value;
            // super.OnPropertyChanged("ConcentrationVolumeUOM");
        }
    }
    public get ConcentrationVolumeUOMList(): ObservableCollection<CListItem> {
        return this._ConcentrationVolumeUOMList;
    }
    public set ConcentrationVolumeUOMList(value: ObservableCollection<CListItem>) {
        if (!ObjectHelper.ReferenceEquals(this._ConcentrationVolumeUOMList, value)) {
            this._ConcentrationVolumeUOMList = value;
            // super.OnPropertyChanged("ConcentrationVolumeUOMList");
        }
    }
    public get EnableConcentration(): boolean {
        return this._EnableConcentration;
    }
    public set EnableConcentration(value: boolean) {
        if (!ObjectHelper.ReferenceEquals(this._EnableConcentration, value)) {
            this._EnableConcentration = value;
            // super.OnPropertyChanged("EnableConcentration");
        }
    }
    public get ConcentrationLabel(): string {
        return this._ConcentrationLabel;
    }
    public set ConcentrationLabel(value: string) {
        if (!ObjectHelper.ReferenceEquals(this._ConcentrationLabel, value)) {
            this._ConcentrationLabel = value;
            // super.OnPropertyChanged("ConcentrationLabel");
        }
    }
    public get PrevConcentrationVisible(): Visibility {
        return this._PrevConcentrationVisible;
    }
    public set PrevConcentrationVisible(value: Visibility) {
        if (!ObjectHelper.ReferenceEquals(this._PrevConcentrationVisible, value)) {
            this._PrevConcentrationVisible = value;
            if (this._PrevConcentrationVisible == Visibility.Visible) {
                this.ConcentrationLabel = "Changed concentration";
                this.IsMandatoryConcentration = true;
            }
            else {
                this.ConcentrationLabel = "Concentration";
                this.IsMandatoryConcentration = false;
            }
            // super.OnPropertyChanged("PrevConcentrationVisible");
        }
    }
    public get IsMandatoryConcentration(): boolean {
        return this._IsMandatoryConcentration;
    }
    public set IsMandatoryConcentration(value: boolean) {
        if (!ObjectHelper.ReferenceEquals(this._IsMandatoryConcentration, value)) {
            this._IsMandatoryConcentration = value;
            // super.OnPropertyChanged("IsMandatoryConcentration");
        }
    }
    public get InfusionDose(): string {
        return this._InfusionDose;
    }
    public set InfusionDose(value: string) {
        if (!ObjectHelper.ReferenceEquals(this._InfusionDose, value)) {
            this._InfusionDose = value;
            this.IsClinicalRSNMand = true;
            // super.OnPropertyChanged("InfusionDose");
        }
    }
    public get InfusionDoseUOM(): string {
        return this._InfusionDoseUOM;
    }
    public set InfusionDoseUOM(value: string) {
        if (!ObjectHelper.ReferenceEquals(this._InfusionDoseUOM, value)) {
            this._InfusionDoseUOM = value;
            // super.OnPropertyChanged("InfusionDoseUOM");
        }
    }
    public get InfusionDoseNumeratorUOMID(): number {
        return this._InfusionDoseNumeratorUOMID;
    }
    public set InfusionDoseNumeratorUOMID(value: number) {
        if (!ObjectHelper.ReferenceEquals(this._InfusionDoseNumeratorUOMID, value)) {
            this._InfusionDoseNumeratorUOMID = value;
            // super.OnPropertyChanged("InfusionDoseNumeratorUOMID");
        }
    }
    public get InfusionDoseDenominatorUOMID(): number {
        return this._InfusionDoseDenominatorUOMID;
    }
    public set InfusionDoseDenominatorUOMID(value: number) {
        if (!ObjectHelper.ReferenceEquals(this._InfusionDoseDenominatorUOMID, value)) {
            this._InfusionDoseDenominatorUOMID = value;
            // super.OnPropertyChanged("InfusionDoseDenominatorUOMID");
        }
    }
    public get EnableInfusionDose(): boolean {
        return this._EnableInfusionDose;
    }
    public set EnableInfusionDose(value: boolean) {
        if (!ObjectHelper.ReferenceEquals(this._EnableInfusionDose, value)) {
            this._EnableInfusionDose = value;
            // super.OnPropertyChanged("EnableInfusionDose");
        }
    }
    public get EnableInfusionPeriodMedAdmin(): boolean {
        return this._EnableInfusionPeriodMedAdmin;
    }
    public set EnableInfusionPeriodMedAdmin(value: boolean) {
        if (!ObjectHelper.ReferenceEquals(this._EnableInfusionPeriodMedAdmin, value)) {
            this._EnableInfusionPeriodMedAdmin = value;
            // super.OnPropertyChanged("EnableInfusionPeriodMedAdmin");
        }
    }
    public get InfusionPeriodMedAdmin(): string {
        return this._InfusionPeriodMedAdmin;
    }
    public set InfusionPeriodMedAdmin(value: string) {
        if (!ObjectHelper.ReferenceEquals(this._InfusionPeriodMedAdmin, value)) {
            this._InfusionPeriodMedAdmin = value;
            // super.OnPropertyChanged("InfusionPeriodMedAdmin");
        }
    }
    public get InfusionPeriodMedAdminSummary(): string {
        let InfPeriodSummary: string = String.Empty;
        if ((String.Equals(this.InfSlotStatus, SlotStatus.DEFERADMIN, StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.InfSlotStatus, SlotStatus.DEFERDUENOW, StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.InfSlotStatus, SlotStatus.DEFEROVERDUE, StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.InfSlotStatus, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase))) {
            return String.Empty;
        }
        else if ((!String.IsNullOrEmpty(this._InfusionPeriodMedAdmin) && !String.Equals(this._InfusionPeriodMedAdmin, "0")) && (this._InfusionPeriodMedAdminUOM != null) && !String.IsNullOrEmpty(this._InfusionPeriodMedAdminUOM.DisplayText)) {
            InfPeriodSummary = String.Format("{0} {1}", this._InfusionPeriodMedAdmin, this._InfusionPeriodMedAdminUOM.DisplayText);
        }
        return InfPeriodSummary;
    }
    public get InfusionPeriodMedAdminUOM(): CListItem {
        return this._InfusionPeriodMedAdminUOM;
    }
    public set InfusionPeriodMedAdminUOM(value: CListItem) {
        if (!ObjectHelper.ReferenceEquals(this._InfusionPeriodMedAdminUOM, value)) {
            this._InfusionPeriodMedAdminUOM = value;
            // super.OnPropertyChanged("InfusionPeriodMedAdminUOM");
        }
    }
    public get InfusionPeriodMedAdminUOMList(): ObservableCollection<CListItem> {
        return this._InfusionPeriodMedAdminUOMList;
    }
    public set InfusionPeriodMedAdminUOMList(value: ObservableCollection<CListItem>) {
        if (!ObjectHelper.ReferenceEquals(this._InfusionPeriodMedAdminUOMList, value)) {
            this._InfusionPeriodMedAdminUOMList = value;
            // super.OnPropertyChanged("InfusionPeriodMedAdminUOMList");
        }
    }
    private _ChangedInfusionRate: string;
    private _InfusionRateUOMNumerator: CListItem;
    private _InfusionRateUOMNumeratorList: ObservableCollection<CListItem>;
    private _InfusionRateUOMDenominator: CListItem;
    private _InfusionRateUOMDenominatorList: ObservableCollection<CListItem>;
    private _ChangeFlowrateDate: DateTime = CommonBB.GetServerDateTime();
    private _ChangeFlowrateDateTime: DateTime = CommonBB.GetServerDateTime();
    private _ChangedFloWRateComments: string;
    private _CondInfrateFR: Visibility = Visibility.Collapsed;
    public get ChangedInfusionRate(): string {
        return this._ChangedInfusionRate;
    }
    public set ChangedInfusionRate(value: string) {
        if (!ObjectHelper.ReferenceEquals(this._ChangedInfusionRate, value)) {
            this._ChangedInfusionRate = value;
            this.DripInfusionRate = value;
            if (!String.Equals(this.InfusionAction, MedicationAction.BEGUN))
                this.IsClinicalRSNMand = true;
            // super.OnPropertyChanged("ChangedInfusionRate");
        }
    }
    public get InfusionRateUOMNumerator(): CListItem {
        return this._InfusionRateUOMNumerator;
    }
    public set InfusionRateUOMNumerator(value: CListItem) {
        if (!ObjectHelper.ReferenceEquals(this._InfusionRateUOMNumerator, value)) {
            this._InfusionRateUOMNumerator = value;
            if (!(String.Equals(this.InfusionAction, MedicationAction.BEGUN) && (this.DontChangeInfRateDefUOMOID <= 0)))
                this.IsClinicalRSNMand = true;
            // super.OnPropertyChanged("InfusionRateUOMNumerator");
        }
    }
    public get InfusionRateUOMNumeratorList(): ObservableCollection<CListItem> {
        return this._InfusionRateUOMNumeratorList;
    }
    public set InfusionRateUOMNumeratorList(value: ObservableCollection<CListItem>) {
        if (!ObjectHelper.ReferenceEquals(this._InfusionRateUOMNumeratorList, value)) {
            this._InfusionRateUOMNumeratorList = value;
            // super.OnPropertyChanged("InfusionRateUOMNumeratorList");
        }
    }
    public get InfusionRateUOMDenominator(): CListItem {
        return this._InfusionRateUOMDenominator;
    }
    public set InfusionRateUOMDenominator(value: CListItem) {
        if (!ObjectHelper.ReferenceEquals(this._InfusionRateUOMDenominator, value)) {
            this._InfusionRateUOMDenominator = value;
            if (!(String.Equals(this.InfusionAction, MedicationAction.BEGUN) && (this.DontChangeInfRateDefPerUOMOID <= 0)))
                this.IsClinicalRSNMand = true;
            // super.OnPropertyChanged("InfusionRateUOMDenominator");
        }
    }
    public get InfusionRateUOMDenominatorList(): ObservableCollection<CListItem> {
        return this._InfusionRateUOMDenominatorList;
    }
    public set InfusionRateUOMDenominatorList(value: ObservableCollection<CListItem>) {
        if (!ObjectHelper.ReferenceEquals(this._InfusionRateUOMDenominatorList, value)) {
            this._InfusionRateUOMDenominatorList = value;
            // super.OnPropertyChanged("InfusionRateUOMDenominatorList");
        }
    }
    public get ChangeFlowrateDate(): DateTime {
        return this._ChangeFlowrateDate;
    }
    public set ChangeFlowrateDate(value: DateTime) {
        if (!ObjectHelper.ReferenceEquals(this._ChangeFlowrateDate, value)) {
            this._ChangeFlowrateDate = value;
            // super.OnPropertyChanged("ChangeFlowrateDate");
        }
    }
    public get ChangeFlowrateDateTime(): DateTime {
        return this._ChangeFlowrateDateTime;
    }
    public set ChangeFlowrateDateTime(value: DateTime) {
        if (!ObjectHelper.ReferenceEquals(this._ChangeFlowrateDateTime, value)) {
            this._ChangeFlowrateDateTime = value;
            // super.OnPropertyChanged("ChangeFlowrateDateTime");
        }
    }
    public get ChangedFloWRateComments(): string {
        return this._ChangedFloWRateComments;
    }
    public set ChangedFloWRateComments(value: string) {
        if (!ObjectHelper.ReferenceEquals(this._ChangedFloWRateComments, value)) {
            this._ChangedFloWRateComments = value;
            // super.OnPropertyChanged("ChangedFloWRateComments");
        }
    }
    public get CondInfrateFR(): Visibility {
        return this._CondInfrateFR;
    }
    public set CondInfrateFR(value: Visibility) {
        if (this._CondInfrateFR != value) {
            this._CondInfrateFR = value;
            // OnPropertyChanged("CondInfrateFR");
        }
    }
    private _IsRecalculateEstCompletionTime: boolean = true;
    public get IsRecalculateEstCompletionTime(): boolean {
        return this._IsRecalculateEstCompletionTime;
    }
    public set IsRecalculateEstCompletionTime(value: boolean) {
        if (!ObjectHelper.ReferenceEquals(this._IsRecalculateEstCompletionTime, value)) {
            this._IsRecalculateEstCompletionTime = value;
            // super.OnPropertyChanged("IsRecalculateEstCompletionTime");
            // super.OnPropertyChanged("IsClinicalRSNMand");
        }
    }
    private _IsEnableReCalcEstComp: boolean = true;
    public get IsEnableReCalcEstComp(): boolean {
        return this._IsEnableReCalcEstComp;
    }
    public set IsEnableReCalcEstComp(value: boolean) {
        if (!ObjectHelper.ReferenceEquals(this._IsEnableReCalcEstComp, value)) {
            this._IsEnableReCalcEstComp = value;
            // super.OnPropertyChanged("IsEnableReCalcEstComp");
        }
    }
    private _DontChangeInfRateVisi: Visibility = Visibility.Collapsed;
    public get DontChangeInfRateVisi(): Visibility {
        return this._DontChangeInfRateVisi;
    }
    public set DontChangeInfRateVisi(value: Visibility) {
        if (!ObjectHelper.ReferenceEquals(this._DontChangeInfRateVisi, value)) {
            this._DontChangeInfRateVisi = value;
            // super.OnPropertyChanged("DontChangeInfRateVisi");
        }
    }
    private _IsDontChangeInfusionRate: boolean = false;
    public get IsDontChangeInfusionRate(): boolean {
        return this._IsDontChangeInfusionRate;
    }
    public set IsDontChangeInfusionRate(value: boolean) {
        if (!ObjectHelper.ReferenceEquals(this._IsDontChangeInfusionRate, value)) {
            let tmpCommentsMandatoryStatus: boolean;
            tmpCommentsMandatoryStatus = this._IsClinicalRSNMand;
            this._IsDontChangeInfusionRate = value;
            if (this.InfusionType != null && !String.IsNullOrEmpty(this.InfusionType.Value)) {
                if (String.Equals(this.InfusionType.Value, InfusionTypeCode.SINGLEDOSEVOLUME) || String.Equals(this.InfusionType.Value, InfusionTypeCode.FLUID)) {
                    this.IsRecalculateEstCompletionTime = true;
                    (new RecalcEstCompTimeConverter().Convert(this.IsRecalculateEstCompletionTime,null,null,null))
                    this.IsEnableReCalcEstComp = false;
                }
                else if (!String.IsNullOrEmpty(this.InfusionPeriod) && !String.Equals(this.InfusionPeriod, "0") && String.Equals(this.InfusionType.Value, InfusionTypeCode.CONTINUOUS)) {
                    this.IsRecalculateEstCompletionTime = false;
                    (new RecalcEstCompTimeConverter().Convert(this.IsRecalculateEstCompletionTime,null,null,null))
                    this.IsEnableReCalcEstComp = false;
                }
                else {
                    this.IsRecalculateEstCompletionTime = !value;
                    (new RecalcEstCompTimeConverter().Convert(this.IsRecalculateEstCompletionTime,null,null,null))
                    this.IsEnableReCalcEstComp = !value;
                }
            }
            else {
                this.IsRecalculateEstCompletionTime = !value;
                (new RecalcEstCompTimeConverter().Convert(this.IsRecalculateEstCompletionTime,null,null,null))
                this.IsEnableReCalcEstComp = !value;
            }
            this.IsEnableInfusionrate = !value;
            this.IsEnableDripCal = !value;
            this.IsMandatoryInfusionrate = !value;
            if (value) {
                this.DripRateUOM = String.Empty;
                this.DripRate = String.Empty;
                this.ChangedInfusionRate = String.Empty;
                this.ChangedInfRateNumUOM = null;
                this.ChangedInfRateDinUOM = null;
            }
            else if (this.DontChangeInfRateVisi == Visibility.Visible) {
                this.DripRate = this.DontChangeDripRateDefValue;
                this.DripRateUOM = this.DontChangeDripRateDefUOM;
            }
            this.IsClinicalRSNMand = tmpCommentsMandatoryStatus;
            // super.OnPropertyChanged("IsDontChangeInfusionRate");
        }
    }
    private _DontChangeInfRateDefUOMOID: number = 0;
    public get DontChangeInfRateDefUOMOID(): number {
        return this._DontChangeInfRateDefUOMOID;
    }
    public set DontChangeInfRateDefUOMOID(value: number) {
        if (!ObjectHelper.ReferenceEquals(this._DontChangeInfRateDefUOMOID, value)) {
            this._DontChangeInfRateDefUOMOID = value;
        }
    }
    private _DontChangeInfRateDefPerUOMOID: number = 0;
    public get DontChangeInfRateDefPerUOMOID(): number {
        return this._DontChangeInfRateDefPerUOMOID;
    }
    public set DontChangeInfRateDefPerUOMOID(value: number) {
        if (!ObjectHelper.ReferenceEquals(this._DontChangeInfRateDefPerUOMOID, value)) {
            this._DontChangeInfRateDefPerUOMOID = value;
        }
    }
    private _DontChangeInfRateDefValue: string;
    public get DontChangeInfRateDefValue(): string {
        return this._DontChangeInfRateDefValue;
    }
    public set DontChangeInfRateDefValue(value: string) {
        if (!ObjectHelper.ReferenceEquals(this._DontChangeInfRateDefValue, value)) {
            this._DontChangeInfRateDefValue = value;
        }
    }
    private _DontChangeDripRateDefUOMOID: number = 0;
    public get DontChangeDripRateDefUOMOID(): number {
        return this._DontChangeDripRateDefUOMOID;
    }
    public set DontChangeDripRateDefUOMOID(value: number) {
        if (!ObjectHelper.ReferenceEquals(this._DontChangeDripRateDefUOMOID, value)) {
            this._DontChangeDripRateDefUOMOID = value;
        }
    }
    private _DontChangeDripRateDefPerUOMOID: number = 0;
    public get DontChangeDripRateDefPerUOMOID(): number {
        return this._DontChangeDripRateDefPerUOMOID;
    }
    public set DontChangeDripRateDefPerUOMOID(value: number) {
        if (!ObjectHelper.ReferenceEquals(this._DontChangeDripRateDefPerUOMOID, value)) {
            this._DontChangeDripRateDefPerUOMOID = value;
        }
    }
    private _DontChangeDripRateDefValue: string;
    public get DontChangeDripRateDefValue(): string {
        return this._DontChangeDripRateDefValue;
    }
    public set DontChangeDripRateDefValue(value: string) {
        if (!ObjectHelper.ReferenceEquals(this._DontChangeDripRateDefValue, value)) {
            this._DontChangeDripRateDefValue = value;
        }
    }
    private _DontChangeDripRateDefUOM: string;
    public get DontChangeDripRateDefUOM(): string {
        return this._DontChangeDripRateDefUOM;
    }
    public set DontChangeDripRateDefUOM(value: string) {
        if (!ObjectHelper.ReferenceEquals(this._DontChangeDripRateDefUOM, value)) {
            this._DontChangeDripRateDefUOM = value;
        }
    }
    private FillDeliveryDevice(Inftype: string): void {
        if (String.Compare(Inftype, "CC_MEDGAS", StringComparison.CurrentCultureIgnoreCase) != 0) {
            if (ProfileData.InfusionPresConfig != null && ProfileData.InfusionPresConfig.objInfusDeliveryDevice != null && ProfileData.InfusionPresConfig.objInfusDeliveryDevice.Count > 0 && this.DeliveryDeviceList == null) {
                this.DeliveryDeviceList = new ObservableCollection<CListItem>();
                let nCount: number = ProfileData.InfusionPresConfig.objInfusDeliveryDevice.Count;
                let oInfDelDevice: InfusDeliveryDevice;
                for (let i: number = 0; i < nCount; i++) {
                    oInfDelDevice = ProfileData.InfusionPresConfig.objInfusDeliveryDevice[i];
                    this.DeliveryDeviceList.Add(ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: oInfDelDevice.DeviceName,
                        Value: oInfDelDevice.DeviceName,
                        Tag: oInfDelDevice.IsAllowBoosterDose
                    }));
                }
                this.IsEnabledDeliveryDevice = true;
            }
        }
        else {
            if (ProfileData.InfusionPresConfig != null && ProfileData.InfusionPresConfig.objOxygenMasks != null && ProfileData.InfusionPresConfig.objOxygenMasks.Count > 0 && this.DeliveryDeviceList == null) {
                this.DeliveryDeviceList = new ObservableCollection<CListItem>();
                let nCount: number = ProfileData.InfusionPresConfig.objOxygenMasks.Count;
                let objOxygenMasks: OxygenMasks;
                for (let i: number = 0; i < ProfileData.InfusionPresConfig.objOxygenMasks.Count; i++) {
                    objOxygenMasks = ProfileData.InfusionPresConfig.objOxygenMasks[i];
                    this.DeliveryDeviceList.Add(ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: objOxygenMasks.OxyDeviceName,
                        Value: objOxygenMasks.OxyDeviceName,
                        Tag: objOxygenMasks.Concentration
                    }));
                }
                this.IsEnabledDeliveryDevice = true;
            }
        }
    }
    // public GetDomainvalues(): void {
    //     let ConceptCodeValues: string = ValueDomain.ReasonforRecord + "," + ValueDomain.ReasonForNotDefer + "," + ValueDomain.ReasonforPause + "," + ValueDomain.ReasonforStop + "," + ValueDomain.Humidification;
    //     ProcessRTE.GetValuesByDomainCodes(ConceptCodeValues, this.OnRTEResult);
    //     ProcessRTE.GetAllReferenceCodesByDomain(ValueDomain.StrikethruReason, ValueSet.StrikethruReason, this.OnRTEResultStrikeThruReason);
    // }

    public GetDomainvalues(): void {
        let ConceptCodeValues: string = ValueDomain.ReasonforRecord + "," + ValueDomain.ReasonForNotDefer + "," + ValueDomain.ReasonforPause + "," + ValueDomain.ReasonforStop + "," + ValueDomain.Humidification;
        ProcessRTE.GetValuesByDomainCodes(ConceptCodeValues, (s, e) => { this.OnRTEResult(s) });
        ProcessRTE.GetAllReferenceCodesByDomain(ValueDomain.StrikethruReason, ValueSet.StrikethruReason, (s,e) => { this.OnRTEResultStrikeThruReason(s) ;});
    }
    OnRTEResultStrikeThruReason(args: RTEEventargs): void {
        if (String.IsNullOrEmpty(args.Request) || args.Result == null)
            return
        if (String.Equals(args.Request, (ValueDomain.StrikethruReason + "," + ValueSet.StrikethruReason))) {
            if (args.Result instanceof Dictionary) {
                let objResult: Dictionary<string, List<CListItem>> = <Dictionary<string, List<CListItem>>>args.Result;
                objResult.forEach((objDomainDetail) => {
                    if (String.Equals(objDomainDetail.Key, ValueDomain.StrikethruReason)) {
                        this.StrikethroughReason = new ObservableCollection<CListItem>();
                        if (objDomainDetail.Value != null) {
                            objDomainDetail.Value.forEach((oCListItem) => {
                                this.StrikethroughReason.Add(oCListItem);
                            });
                        }
                    }
                });
            }
        }
    }
    OnRTEResult(args: RTEEventargs): void {
        if (String.IsNullOrEmpty(args.Request) || args.Result == null)
            return
        if (String.Compare(args.Request, ValueDomain.ReasonforRecord + "," + ValueDomain.ReasonForNotDefer + "," + ValueDomain.ReasonforPause + "," + ValueDomain.ReasonforStop + "," + ValueDomain.Humidification) == 0) {
            if (args.Result instanceof Dictionary) {
                let objResult: Dictionary<string, List<CListItem>> = <Dictionary<string, List<CListItem>>>args.Result;
                objResult.forEach((objDomainDetail) => {
                    switch (objDomainDetail.Key) {
                        case ValueDomain.ReasonforRecord:
                            {
                                this.ReasonNotGivens = new ObservableCollection<CListItem>();
                                if (objDomainDetail.Value.Count > 0) {
                                    objDomainDetail.Value.forEach((oCListItem) => {
                                        this.ReasonNotGivens.Add(oCListItem);
                                    });
                                }
                                break;
                            }
                        case ValueDomain.ReasonForNotDefer:
                            {
                                this.ReasonForNotDefers = new ObservableCollection<CListItem>();
                                if (objDomainDetail.Value.Count > 0) {
                                    objDomainDetail.Value.forEach((oCListItem) => {
                                        this.ReasonForNotDefers.Add(oCListItem);
                                    });
                                }
                                break;
                            }
                        case ValueDomain.ReasonforPause:
                            {
                                this.ReasonforPauselist = new ObservableCollection<CListItem>();
                                if (objDomainDetail.Value.Count > 0) {
                                    objDomainDetail.Value.forEach((oCListItem) => {
                                        this.ReasonforPauselist.Add(oCListItem);
                                    });
                                }
                                break;
                            }
                        case ValueDomain.ReasonforStop:
                            {
                                this.ReasonforStoplist = new ObservableCollection<CListItem>();
                                if (objDomainDetail.Value.Count > 0) {
                                    objDomainDetail.Value.forEach((oCListItem) => {
                                        if (oCListItem.Value != CConstants.sRSNPatientDeparted && oCListItem.Value != CConstants.sRSNPatientDNA && oCListItem.Value != CConstants.sRSNPatientHomeLeave && oCListItem.Value != CConstants.sRSNPatTransNonEPresWard)
                                            this.ReasonforStoplist.Add(oCListItem);
                                    });
                                }
                                break;
                            }
                        case ValueDomain.Humidification:
                            {
                                this.HumidificationList = new ObservableCollection<CListItem>();
                                if (objDomainDetail.Value.Count > 0) {
                                    objDomainDetail.Value.forEach((oCListItem) => {
                                        this.HumidificationList.Add(oCListItem);
                                    });
                                }
                                break;
                            }
                    }
                });
            }
        }
        this.ReasonValue = this.GetTermtextForReason(this.ReasonforMedicationAction, this.ReasonforAdminReasonCode);
        if (!String.IsNullOrEmpty(this.Humicode) && this.HumidificationList != null) {
            let HumidiCode: CListItem = Common.GetSelectedItem(this.Humicode, this.HumidificationList);
            if (HumidiCode != null)
                this.Humidification = HumidiCode;
        }
        if (!String.IsNullOrEmpty(this.HumidificationValue) && this.HumidificationList != null) {
            let Humidtext: CListItem = Common.GetSelectedItem(this.HumidificationValue, this.HumidificationList);
            if (Humidtext != null)
                this.HumidificationValue = Humidtext.DisplayText;
        }
    }
    private GetTermtextForReason(_SlotStatus: string, Reasoncode: string): string {
        let _ReasonTermText: string = String.Empty;
        if (!String.IsNullOrEmpty(_SlotStatus) && !String.IsNullOrEmpty(Reasoncode)) {
            let _ReasonList: ObservableCollection<CListItem> = null;
            switch (_SlotStatus) {
                case SlotStatus.DEFERADMIN:
                case SlotStatus.DEFERDUENOW:
                case SlotStatus.DEFEROVERDUE:
                    _ReasonList = this.ReasonForNotDefers;
                    break;
                case SlotStatus.NOTGIVEN:
                    _ReasonList = this.ReasonNotGivens;
                    break;
                case MedicationAction.PAUSE:
                    _ReasonList = this.ReasonforPauselist;
                    break;
                case MedicationAction.STOP:
                    _ReasonList = this.ReasonforStoplist;
                    break;
            }
            if (_ReasonList != null) {
                let SelectedTermText = _ReasonList.Where(oItem => String.Compare(Reasoncode, oItem.Value, StringComparison.CurrentCultureIgnoreCase) == 0).Select(oItem => oItem);
                if (SelectedTermText != null && SelectedTermText.Count() > 0) {
                    _ReasonTermText = SelectedTermText.First().DisplayText;
                }
                else {
                    SelectedTermText = this.ReasonforStoplist.Where(oItem => String.Compare(Reasoncode, oItem.Value, StringComparison.CurrentCultureIgnoreCase) == 0).Select(oItem => oItem);
                    if (SelectedTermText != null && SelectedTermText.Count() > 0) {
                        _ReasonTermText = SelectedTermText.First().DisplayText;
                    }
                }
            }
        }
        return _ReasonTermText;
    }
    iMsgBox: iMessageBox;
    ShowErrorMessage(sErrorMsg: string, oMessageBoxButton: MessageBoxButton, oMessageBoxType: MessageBoxType, MsgBoxTag: Object = null, MsgBoxHeight: number = null, MsgBoxWidth: number = null): void {
        if (!String.IsNullOrEmpty(sErrorMsg)) {
            this.iMsgBox = ObjectHelper.CreateObject(new iMessageBox(), {
                Title: "LORENZO",
                Message: sErrorMsg,
                MessageButton: oMessageBoxButton,
                IconType: oMessageBoxType
            });
            if (MsgBoxTag != null)
                this.iMsgBox.Tag = MsgBoxTag;
            if (MsgBoxHeight.HasValue)
                this.iMsgBox.Height = MsgBoxHeight.Value;
            if (MsgBoxWidth.HasValue)
                this.iMsgBox.Width = MsgBoxWidth.Value;
            this.iMsgBox.OverlayBrush = new SolidColorBrush(Colors.Transparent);
            this.iMsgBox.MessageBoxClose = (s, e) => { this.iMsgBox_MessageBoxClose(s, e); };
            this.iMsgBox.Show();
        }
    }
    iMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.OK) {
            this.bIsAlertRequired = false;
        }
    }
    public ShowAlertMessage(oAlertInfo: AlertsInfo): void {
        let sErrorMsg: string = String.Empty;
        if (oAlertInfo != null && (!String.IsNullOrEmpty(oAlertInfo.Alert))) {
            switch (oAlertInfo.Alert) {
                case InfChartAlert.STEP_DOSE_FLOW_RATE_ALERT:
                case InfChartAlert.FLOW_RATE_CHANGE_ALERT:
                    let sCurrentRate: string = String.Empty;
                    if (!String.IsNullOrEmpty(this.InfusionRateValue)) {
                        let infrate: string[] = this.InfusionRateValue.Split(' ');
                        sCurrentRate = oAlertInfo.PreInfRate + " " + infrate[1];
                    }
                    sErrorMsg = String.Format(MedsAdminChartToolTip.InfChartRateChngAlert_MsgText, this.InfusionRateValue, sCurrentRate);
                    break;
                case InfChartAlert.AMENDMENT_ALERT:
                    sErrorMsg = "Drug that is being recorded has been amended by user " + oAlertInfo.ModifiedBy + ", " + oAlertInfo.ModifiedAt.ToString(CConstants.DateTimeFormat);
                    sErrorMsg = sErrorMsg + "\r\n";
                    sErrorMsg = sErrorMsg + "Please mark this  as not given or stop this infusion if in progress and  proceed with the new prescription.";
                    break;
                case InfChartAlert.DISCONTINUATION_ALERT:
                    sErrorMsg = String.Format(MedsAdminChartToolTip.InfChartDisCntdAlert_MsgText1, oAlertInfo.ModifiedBy, oAlertInfo.ModifiedAt.ToString(CConstants.DateTimeFormat));
                    sErrorMsg = sErrorMsg + "\r\n";
                    sErrorMsg = sErrorMsg + "\r\n" + MedsAdminChartToolTip.InfChartDisCntdAlert_MsgText2;
                    break;
            }
            if (!String.IsNullOrEmpty(sErrorMsg)) {
                this.ShowErrorMessage(sErrorMsg, MessageBoxButton.OK, MessageBoxType.Exclamation,/*MsgBoxTag:*/CConstants.InfusionWarning,/*MsgBoxHeight:*/170,/*MsgBoxWidth:*/430);
            }
        }
    }
    public GetInfBagDetails(MedadminOid: number, MCVersion: string): void {
        let objService: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
        let objReq: CReqMsgGetAllBagDetails = new CReqMsgGetAllBagDetails();
        objReq.oContextInformation = CommonBB.FillContext();
        objReq.MedAdminOIDBC = MedadminOid;
        objReq.MCVersionNumberBC = MCVersion;
        if (objService != null) {
            objService.GetAllBagDetailsCompleted = (s, e) => { this.objService_GetAllBagDetailsCompleted(s, e); };
            objService.GetAllBagDetailsAsync(objReq);
        }
    }
    objService_GetAllBagDetailsCompleted(sender: Object, e: GetAllBagDetailsCompletedEventArgs): void {
        let _ErrorID: number = 80000084;
        let _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:InfrecordadminVM, Method:objService_GetAllBagDetailsCompleted()";
        if (e.Error == null) {
            try {
                let objResponse: CResMsgGetAllBagDetails = e.Result;
                if (objResponse != null && objResponse.oInfusionBagDetail != null && objResponse.oInfusionBagDetail.Count > 0) {
                    this.InfBagDetails = objResponse.oInfusionBagDetail;
                    for (let idx: number = 0; idx < objResponse.oInfusionBagDetail.Count; idx++) {
                        this.InfBagDetails[idx].BagVolume = objResponse.oInfusionBagDetail[idx].BagVolume;
                        ;
                        if (objResponse.oInfusionBagDetail[idx].BagVolumeUOM != null && !String.IsNullOrEmpty(objResponse.oInfusionBagDetail[idx].BagVolumeUOM.UOMName)) {
                            this.InfBagDetails[idx].BagVolume = this.InfBagDetails[idx].BagVolume + " " + objResponse.oInfusionBagDetail[idx].BagVolumeUOM.UOMName;
                        }
                        this.InfBagDetails[idx].BatchNumber = objResponse.oInfusionBagDetail[idx].BatchNumber;
                        this.InfBagDetails[idx].ExpiryDate = objResponse.oInfusionBagDetail[idx].ExpiryDate;
                        this.InfBagDetails[idx].AdminStartTime = objResponse.oInfusionBagDetail[idx].AdminStartTime;
                        this.InfBagDetails[idx].AdminEndTime = objResponse.oInfusionBagDetail[idx].AdminEndTime;
                        this.InfBagDetails[idx].AdministeredBy.Name = objResponse.oInfusionBagDetail[idx].AdministeredBy.Name;
                        this.InfBagDetails[idx].InfusedVolume = objResponse.oInfusionBagDetail[idx].InfusedVolume;
                        if (objResponse.oInfusionBagDetail[idx].InfusedVolumeUOM != null && !String.IsNullOrEmpty(objResponse.oInfusionBagDetail[idx].InfusedVolumeUOM.UOMName)) {
                            this.InfBagDetails[idx].InfusedVolume = this.InfBagDetails[idx].InfusedVolume + " " + objResponse.oInfusionBagDetail[idx].InfusedVolumeUOM.UOMName;
                        }
                    }
                }
            }
            catch (ex: any) {
                let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
            }

        }
        else {
            let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
        }
    }
    private _GivenDateTime: string;
    private _DoseValue: string;
    private _RecordedAtValue: string;
    private _RecordedByValue: string;
    private _RecordedBy: string;
    private _InfusionRateValue: string;
    private _DripRateValue: string;
    private _InfusedVolumeValue: string;
    private _CurrentBagValue: string;
    private _AdministeredByValue: string;
    private _WitnessedByValue: string;
    private _ReasonValue: string;
    private _CommentsValue: string;
    private _HumidificationValue: string;
    public get GivenDateTime(): string {
        return this._GivenDateTime;
    }
    public set GivenDateTime(value: string) {
        this._GivenDateTime = value;
        // OnPropertyChanged("GivenDateTime");
    }
    public get DoseValue(): string {
        return this._DoseValue;
    }
    public set DoseValue(value: string) {
        this._DoseValue = value;
        // OnPropertyChanged("DoseValue");
    }
    public get RecordedAtValue(): string {
        return this._RecordedAtValue;
    }
    public set RecordedAtValue(value: string) {
        this._RecordedAtValue = value;
        // OnPropertyChanged("RecordedAtValue");
    }
    public get RecordedByValue(): string {
        return this._RecordedByValue;
    }
    public set RecordedByValue(value: string) {
        this._RecordedByValue = value;
        // OnPropertyChanged("RecordedByValue");
    }
    public get RecordedBy(): string {
        return this._RecordedBy;
    }
    public set RecordedBy(value: string) {
        this._RecordedBy = value;
        // OnPropertyChanged("RecordedBy");
    }
    public get InfusionRateValue(): string {
        return this._InfusionRateValue;
    }
    public set InfusionRateValue(value: string) {
        this._InfusionRateValue = value;
        // OnPropertyChanged("InfusionRateValue");
    }
    public get DripRateValue(): string {
        return this._DripRateValue;
    }
    public set DripRateValue(value: string) {
        this._DripRateValue = value;
        // OnPropertyChanged("DripRateValue");
    }
    public get InfusedVolumeValue(): string {
        return this._InfusedVolumeValue;
    }
    public set InfusedVolumeValue(value: string) {
        this._InfusedVolumeValue = value;
        // OnPropertyChanged("InfusedVolumeValue");
    }
    public get CurrentBagValue(): string {
        return this._CurrentBagValue;
    }
    public set CurrentBagValue(value: string) {
        this._CurrentBagValue = value;
        // OnPropertyChanged("CurrentBagValue");
    }
    public get AdministeredByValue(): string {
        return this._AdministeredByValue;
    }
    public set AdministeredByValue(value: string) {
        this._AdministeredByValue = value;
        // OnPropertyChanged("AdministeredByValue");
    }
    public get WitnessedByValue(): string {
        return this._WitnessedByValue;
    }
    public set WitnessedByValue(value: string) {
        this._WitnessedByValue = value;
        // OnPropertyChanged("WitnessedByValue");
    }
    public get ReasonValue(): string {
        return this._ReasonValue;
    }
    public set ReasonValue(value: string) {
        this._ReasonValue = value;
        // OnPropertyChanged("ReasonValue");
    }
    public get CommentsValue(): string {
        return this._CommentsValue;
    }
    public set CommentsValue(value: string) {
        this._CommentsValue = value;
        // OnPropertyChanged("CommentsValue");
    }
    _summaryViewAdmisnisteredBy: string;
    public get SummaryViewAdministeredBy(): string {
        return this._summaryViewAdmisnisteredBy;
    }
    public set SummaryViewAdministeredBy(value: string) {
        this._summaryViewAdmisnisteredBy = value;
        // OnPropertyChanged("SummaryViewAdministeredBy");
    }
    _summaryViewAdmisnisteredByOID: string;
    public get SummaryViewAdministeredByOID(): string {
        return this._summaryViewAdmisnisteredByOID;
    }
    public set SummaryViewAdministeredByOID(value: string) {
        this._summaryViewAdmisnisteredByOID = value;
        // OnPropertyChanged("SummaryViewAdministeredByOID");
    }
    private _ReasonforMedicationAction: string;
    public get ReasonforMedicationAction(): string {
        return this._ReasonforMedicationAction;
    }
    public set ReasonforMedicationAction(value: string) {
        this._ReasonforMedicationAction = value;
        // OnPropertyChanged("ReasonforMedicationAction");
    }
    private _ReasonforAdminReasonCode: string;
    public get ReasonforAdminReasonCode(): string {
        return this._ReasonforAdminReasonCode;
    }
    public set ReasonforAdminReasonCode(value: string) {
        this._ReasonforAdminReasonCode = value;
        // OnPropertyChanged("ReasonforAdminReasonCode");
    }
    public get HumidificationValue(): string {
        return this._HumidificationValue;
    }
    public set HumidificationValue(value: string) {
        this._HumidificationValue = value;
        // OnPropertyChanged("HumidificationValue");
    }
    private _SequentialPresItemOID: number;
    public get SequentialPrescItemOID(): number {
        return this._SequentialPresItemOID;
    }
    public set SequentialPrescItemOID(value: number) {
        this._SequentialPresItemOID = value;
        // OnPropertyChanged("SequentialPrescItemOID");
    }
    private strikethroughReason: ObservableCollection<CListItem>= new ObservableCollection<CListItem>();
    private reasonforStrikethrough: CListItem;
    private _StrikeThruAction: string;
    private _StrikeThruActionCode: string;
    private _IsStrikeThruEnable: boolean;
    private _IsEntireAdminStrikeThruEnable: boolean;
    public get ReasonforStrikethrough(): CListItem {
        return this.reasonforStrikethrough;
    }
    public set ReasonforStrikethrough(value: CListItem) {
        if (!ObjectHelper.ReferenceEquals(this.reasonforStrikethrough, value)) {
            this.reasonforStrikethrough = value;
            // OnPropertyChanged("ReasonforStrikethrough");
        }
    }
    public get StrikethroughReason(): ObservableCollection<CListItem> {
        return this.strikethroughReason;
    }
    public set StrikethroughReason(value: ObservableCollection<CListItem>) {
        if (!ObjectHelper.ReferenceEquals(this.strikethroughReason, value)) {
            this.strikethroughReason = value;
            // OnPropertyChanged("StrikethroughReason");
        }
    }
    public get StrikeThruAction(): string {
        return this._StrikeThruAction;
    }
    public set StrikeThruAction(value: string) {
        if (!String.IsNullOrEmpty(value) && (String.Compare(this.StrikeThruActionCode, InfStrikeOutType.EntireAdmin, StringComparison.CurrentCultureIgnoreCase) != 0 || !CConstants.IsAllowEntireAdminStrikeThru)) {
            value = "Action - " + this.PrevInfusionAction;
        }
        this._StrikeThruAction = value;
        // OnPropertyChanged("StrikeThruAction");
    }
    public get StrikeThruActionCode(): string {
        return this._StrikeThruActionCode;
    }
    public set StrikeThruActionCode(value: string) {
        if (this._StrikeThruActionCode != value) {
            this._StrikeThruActionCode = value;
            // OnPropertyChanged("StrikeThruActionCode");
        }
    }
    public get IsStrikeThruEnable(): boolean {
        return this._IsStrikeThruEnable;
    }
    public set IsStrikeThruEnable(value: boolean) {
        this._IsStrikeThruEnable = value;
        // OnPropertyChanged("IsStrikeThruEnable");
    }
    public get IsEntireAdminStrikeThruEnable(): boolean {
        return this._IsEntireAdminStrikeThruEnable;
    }
    public set IsEntireAdminStrikeThruEnable(value: boolean) {
        this._IsEntireAdminStrikeThruEnable = value;
        // OnPropertyChanged("IsEntireAdminStrikeThruEnable");
    }
    private _isStrikeThruVisible: Visibility;
    public get IsStrikeThruVisible(): Visibility {
        return this._isStrikeThruVisible;
    }
    public set IsStrikeThruVisible(value: Visibility) {
        this._isStrikeThruVisible = value;
        // OnPropertyChanged("IsStrikeThruVisible");
    }
    private _isEntireAdminStrikeThruVisible: Visibility = Visibility.Collapsed;
    public get IsEntireAdminStrikeThruVisible(): Visibility {
        return this._isEntireAdminStrikeThruVisible;
    }
    public set IsEntireAdminStrikeThruVisible(value: Visibility) {
        this._isEntireAdminStrikeThruVisible = value;
        // OnPropertyChanged("IsEntireAdminStrikeThruVisible");
    }
    private _strikeThroughAmdinCmd: RelayCommand;
    public get StrikeThroughAmdinCmd(): RelayCommand {
        if (this._strikeThroughAmdinCmd == null) {
            this._strikeThroughAmdinCmd = new RelayCommand(()=>this.OnStrikeThroughAdminClick());
        }
        return this._strikeThroughAmdinCmd;
    }
    private _strikeThroughCmd: RelayCommand;
    public get StrikeThroughCmd(): RelayCommand {
        if (this._strikeThroughCmd == null) {
            this._strikeThroughCmd = new RelayCommand(()=>{this.OnStrikeThroughClick();}, this.GetCanBeStruckThrough);
        }
        return this._strikeThroughCmd;
    }
    public GetCanBeStruckThrough(): boolean {
        return this.CanBeStruckThrough;
    }
   
    public OnStrikeThroughAdminClick(): void {
        this.LaunchInfusionStrikeOut(InfStrikeOutType.EntireAdmin);
    }
    public OnStrikeThroughClick(): void {
        this.LaunchInfusionStrikeOut(InfStrikeOutType.LastAction);
    }
    objStrikeThrough: InfRecAdmStrikeThrough;
    public LaunchInfusionStrikeOut(StrikeoutType: string): void {
        let dtInfusionRecordDttm: DateTime = DateTime.MinValue;
        if (!String.IsNullOrEmpty(this.RecordedAtValue)) {
            let bParseResult: boolean = DateTime.TryParse(this.RecordedAtValue, (o) => { dtInfusionRecordDttm = o });
            let DrugName: string = this.DrugName;
            let _nNumberOfDays: number = 0;
            if (ProfileData.SlotCharacteristicsConfig != null) {
                _nNumberOfDays = ProfileData.SlotCharacteristicsConfig.SlotModificationTime;
            }
            if (bParseResult && DateTime.NotEquals(dtInfusionRecordDttm , DateTime.MinValue) && _nNumberOfDays > 0 && DateTime.LessThan(dtInfusionRecordDttm.AddDays(_nNumberOfDays) , CommonBB.GetServerDateTime())) {
                let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                    Title: "LORENZO",
                    Message: String.Format("The slot selected for {0} is outside the allowed modification time window.",
                        DrugName),
                    MessageButton: MessageBoxButton.OK,
                    IconType: MessageBoxType.Information,
                    Width: 400
                });
                //iMsgBox.MessageBoxClose += new EventHandler<MessageEventArgs>((sender1: Object, e1: MessageEventArgs) => {
                //     return
                // });
                iMsgBox.Show();
                return
            }
        }
        if (!this.CanBeStruckThrough) {
            let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                Title: "LORENZO",
                Message: Resource.Strikethrough.SequentialItems,
                MessageButton: MessageBoxButton.OK,
                IconType: MessageBoxType.Information,
                Width: 400
            });
            // iMsgBox.MessageBoxClose += (s, ea) => {
            //     return
            // };
            iMsgBox.Show();
            return
        }
        this.objStrikeThrough = new InfRecAdmStrikeThrough(this);
        if (CConstants.IsAllowEntireAdminStrikeThru && String.Equals(StrikeoutType, InfStrikeOutType.EntireAdmin, StringComparison.InvariantCultureIgnoreCase)) {
            this.StrikeThruActionCode = StrikeoutType;
            this.StrikeThruAction = Resource.InfRecAdministartion.StrikeThruEntireAdmin_Text;
        }
        else {
            if (!CConstants.IsAllowEntireAdminStrikeThru && (String.Equals(this.PrevInfusionActionCode, MedicationAction.BEGUN, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.PrevInfusionActionCode, SlotStatus.NOTGIVEN, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.PrevInfusionActionCode, SlotStatus.DEFERADMIN, StringComparison.InvariantCultureIgnoreCase))) {
                this.StrikeThruActionCode = InfStrikeOutType.EntireAdmin;
                this.StrikeThruAction = this.PrevInfusionAction;
            }
            else {
                this.StrikeThruActionCode = this.PrevInfusionActionCode;
                this.StrikeThruAction = this.PrevInfusionAction;
            }
        }
        this.objStrikeThrough.DataContext = this;
        this.objStrikeThrough.HelpCode = "FM_MED_INFSTRIKEADMIN";
        Common.LaunchStrikeThroughWindow(this.objStrikeThrough, (s,e)=>this.OnStrikeThrough_Closed(s), 220, 440, this.RecordedAtValue, this.DrugName);
    }
    iAppdialog: ChildWindow;
    public OnStrikeThrough_Closed(args: AppDialogEventargs): void {
        if (!this.IsSubmitInProgress) {
            this.iAppdialog = args.AppChildWindow;
            if (args.Result == AppDialogResult.Ok) {
                if (!Common.CheckIfLockingDurationElapsed((o, e)  => { this.iMsgBox_MessageBoxClose(o, e) })) {
                    if (!this.InfStrikethruValidation()) {
                        this.IsSubmitInProgress = true;
                        Busyindicator.SetStatusBusy("InfRecAdminSubmit");
                        this.SubmitInfStrikethruAdmin(ObjectHelper.CreateType<InfRecAdmStrikeThrough>(args.Content, InfRecAdmStrikeThrough));
                    }
                }
            }
            else if (args.Result == AppDialogResult.Cancel) {
                args.AppChildWindow.DialogResult = true;
                this.ReasonforStrikethrough = null;
            }
        }
    }
    oMsgBox_InfStrikethroughClose(sender: Object, e: MessageEventArgs): void {
        this.iAppdialog.DialogResult = true;
        this.ReasonforStrikethrough = null;
    }
    public InfStrikethruValidation(): boolean {
        if (this.ReasonforStrikethrough == null || (this.ReasonforStrikethrough != null && String.IsNullOrEmpty(this.ReasonforStrikethrough.Value))) {
            let objiMessageBox: iMessageBox = new iMessageBox();
            objiMessageBox.Closed = (s, e) => { this.InfStrikethruValidation_Closed(s, e); };
            objiMessageBox.Message = Resource.Strikethrough.ReasonforStrikethruValidation;
            objiMessageBox.IconType = MessageBoxType.Information;
            objiMessageBox.MessageButton = MessageBoxButton.OK;
            objiMessageBox.Title = "LORENZO";
            objiMessageBox.Show();
            return true;
        }
        return false;
    }
    InfStrikethruValidation_Closed(sender: Object, e: EventArgs): void {
        if (this.OnInfStrikethruValidationErrorMsgCompleted != null) {
            this.OnInfStrikethruValidationErrorMsgCompleted();
        }
        this.IsSubmitInProgress = false;
        Busyindicator.SetStatusIdle("InfRecAdminSubmit");
    }
    public SubmitInfStrikethruAdmin(objStrikeThru: InfRecAdmStrikeThrough): boolean {
        let objSlotDetailVm: SlotDetailVM = new SlotDetailVM();
        let objService: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
        objService.StrikeThroughInfusionAdminCompleted = (s, ea) => {
            if (ea.Error == null) {
                let objRes: CResMsgStrikeThroughInfusionAdmin = ea.Result;
                if (objRes != null) {
                    objStrikeThru.appDialog.DialogResult = true;
                    this.objStrikeThrough = null;
                    if (objRes.objSlotDetail.AdministrationDetail == null)
                        objRes.objSlotDetail.AdministrationDetail = new AdministrationDetail();
                    objRes.objSlotDetail.AdministrationDetail.StrikeoutAction = this.StrikeThruActionCode;
                    objRes.objSlotDetail.AdministrationDetail.IsDuringHomeLeave = this.IsDuringHomeLeave;
                    if (this.OnInfStrikethruCompleted != null)
                        this.OnInfStrikethruCompleted(objRes.objSlotDetail);
                }
            }
        };
        this.objReqStrikeThru = new CReqMsgStrikeThroughInfusionAdmin();
        this.objReqStrikeThru.oContextInformation = CommonBB.FillContext();
        this.objReqStrikeThru.oContextInformation.PageInfo = PatientContext.EncounterOid.ToString();
        this.objReqStrikeThru.oStrikethroughAdminBC = new CStrikethroughAdmin();
        this.objReqStrikeThru.oStrikethroughAdminBC.PatientOID = ChartContext.PatientOID;
        if (ChartContext.EncounterOID > 0) {
            this.objReqStrikeThru.oStrikethroughAdminBC.EncounterOID = ChartContext.EncounterOID;
        }
        this.objReqStrikeThru.oStrikethroughAdminBC.PrescriptionItemScheduleOID = this.PresScheduleOID;
        this.objReqStrikeThru.oStrikethroughAdminBC.MedAdminOID = this.MedAdminOID;
        this.objReqStrikeThru.oStrikethroughAdminBC.PrescriptionItemOID = this.PrescriptionItemOID;
        if (!String.IsNullOrEmpty(this.InfusionType.Value)) {
            this.objReqStrikeThru.oStrikethroughAdminBC.InfusionType = this.InfusionType.Value;
        }
        else {
            this.objReqStrikeThru.oStrikethroughAdminBC.InfusionType = this.ItemSubType;
        }
        let InfusionTypeCode: string = this.InfusionType != null ? this.InfusionType.Value : String.Empty;
        if ((String.Equals(this.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase)) && (String.Equals(this.StrikeThruActionCode, InfStrikeOutType.EntireAdmin, StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.StrikeThruActionCode, MedicationAction.STOP, StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.StrikeThruActionCode, MedicationAction.COMPLETE, StringComparison.CurrentCultureIgnoreCase))) {
            if (String.Equals(InfusionTypeCode, InfusionTypesCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase)) {
                this.objReqStrikeThru.oStrikethroughAdminBC.PresItemENDTTM = this.PrescriptionEndDate;
                let _isStatFreq: boolean = (!String.IsNullOrEmpty(this.FreqPerodCode) && String.Equals(this.FreqPerodCode, CConstants.OnceOnlyPerodCode, StringComparison.InvariantCultureIgnoreCase) && !String.IsNullOrEmpty(this.DoseType) && !String.Equals(this.DoseType, DoseTypeCode.STEPPED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(this.DoseType, DoseTypeCode.STEPPEDVARIABLE, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(this.DoseType, DoseTypeCode.VARIABLE, StringComparison.InvariantCultureIgnoreCase));
                if (DateTime.NotEquals(this.PrescriptionEndDate , DateTime.MinValue) || _isStatFreq) {
                    this.objReqStrikeThru.oStrikethroughAdminBC.IsUpdatePIStatusToCompleted = true;
                    if (_isStatFreq) {
                        this.objReqStrikeThru.oStrikethroughAdminBC.IsOnceOnlySlot = true;
                        this.objReqStrikeThru.oStrikethroughAdminBC.IsLastSlotCheckRequired = false;
                    }
                    else {
                        this.objReqStrikeThru.oStrikethroughAdminBC.IsLastSlotCheckRequired = true;
                    }
                    if (this.IsPRN && !this.IsPRNWithSchedule) {
                        this.objReqStrikeThru.oStrikethroughAdminBC.IsUpdatePIStatusToCompleted = false;
                        this.objReqStrikeThru.oStrikethroughAdminBC.IsLastSlotCheckRequired = false;
                    }
                }
            }
            else {
                this.objReqStrikeThru.oStrikethroughAdminBC.IsUpdatePIStatusToCompleted = true;
                this.objReqStrikeThru.oStrikethroughAdminBC.IsLastSlotCheckRequired = false;
                this.objReqStrikeThru.oStrikethroughAdminBC.IsOnceOnlySlot = true;
                if (String.Equals(this.ItemSubType, InfusionTypesCode.SUBTYPE_GAS, StringComparison.CurrentCultureIgnoreCase) && this.IsPRN) {
                    this.objReqStrikeThru.oStrikethroughAdminBC.IsUpdatePIStatusToCompleted = false;
                    this.objReqStrikeThru.oStrikethroughAdminBC.IsOnceOnlySlot = false;
                }
            }
        }
        if (this.ReasonforStrikethrough != null && !String.IsNullOrEmpty(this.ReasonforStrikethrough.Value))
            this.objReqStrikeThru.oStrikethroughAdminBC.ReasonCode = this.ReasonforStrikethrough.Value;
        if (String.Equals(InfusionTypeCode, InfusionTypesCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase)) {
            this.objReqStrikeThru.oStrikethroughAdminBC.ScheduledDTTM = this.ScheduledDTTM;
        }
        this.objReqStrikeThru.oStrikethroughAdminBC.ActionCode = this.StrikeThruActionCode;
        this.objReqStrikeThru.oContextInformation.PageInfo = PatientContext.EncounterOid.ToString();
        this.objReqStrikeThru.oStrikethroughAdminBC.IsAllowEntireStrikeThru = CConstants.IsAllowEntireAdminStrikeThru;
        objService.StrikeThroughInfusionAdminAsync(this.objReqStrikeThru);
        return true;
    }
    private _isEnableBegun: boolean;
    private _isEnableNotGiven: boolean;
    private _isEnableDefered: boolean;
    private _isEnablePause: boolean;
    private _isEnableResume: boolean;
    private _isEnableStop: boolean;
    private _isEnableComplete: boolean;
    private _isEnableChangebag: boolean;
    private _isEnableChgflowrate: boolean;
    private _isStrikethroughadmin: Visibility;
    private _isdoseadministered: boolean;
    private _isvolumemandatory: boolean;
    private _isEstiEndDateMsg: Visibility = Visibility.Collapsed;
    private _EstimatedEndTime: string;
    private doseadministered: string;
    private _isDose: Visibility = Visibility.Visible;
    private _isEnableDose: boolean = true;
    private doseUomLorenzoID: string;
    private _isInfusionrateCal: Visibility = Visibility.Collapsed;
    private _isInfDripnrateCal: Visibility = Visibility.Visible;
    private _NextBagVolume: string;
    private _PrevBagVolumeUom: CListItem;
    private _PrevBagVolume: string;
    private _isVisiblePause: Visibility = Visibility.Visible;
    private _isVisibleResume: Visibility = Visibility.Visible;
    private _isVisibleStop: Visibility = Visibility.Visible;
    private _isVisibleChangebag: Visibility = Visibility.Visible;
    private _isEnableLumen: boolean = true;
    private _ReasonforPause: CListItem;
    private _ReasonforPauselist: ObservableCollection<CListItem>;
    private _ReasonforStop: CListItem;
    private _ReasonforStoplist: ObservableCollection<CListItem>;
    private _RouteOID: number;
    private _IsControlledDrug: boolean;
    private _PresLorenzoID: string;
    private _bIsWitnessReqd: boolean = false;
    private _lblcliniIncFrm: Visibility = Visibility.Collapsed;
    private _isEnablelblcliniIncFrmValue: boolean;
    private _ClinicalIncidentForm: string;
    private _isMandatoryInfusionrate: boolean = false;
    public CareproviderOID: number;
    public CareproviderName: string;
    public Careproviders: ObservableCollection<CListItem>;
    public IsCanComplete: boolean = false;
    private _CInfRate: string;
    private _ChangedInfRateDinUOM: CListItem;
    private _ChangedInfRateDinUOMOID: string;
    private _ChangedInfRateNumUOMOID: string;
    private _ChangedInfRateNumUOM: CListItem;
    private _weightInfusedUOMList: ObservableCollection<CListItem>;
    private _CompoundInfusedUOMList: ObservableCollection<CListItem>;
    private _dripInfusionRate: string;
    private _dripInfusionRateUom: string;
    private _dripInfRateUomOID: number;
    private _dripInfRatePerUomOID: number;
    private _IsInfRateVolBased: boolean = false;
    private _IsSelectChangeFlowrate: boolean = false;
    private _IsEnableSite: boolean = true;
    private _IsMandatoryExpiryDTTM: boolean = false;
    private _IsMandatoryBatchNumber: boolean = false;
    private _InfusionPeriod: string;
    private _InfusionPeriodUOM: string;
    private _InfusionPeriodUomOID: number;
    private _LowerDose: string;
    private _UpperDose: string;
    private _isVisibleRestrostopcomplete: Visibility = Visibility.Collapsed;
    private _RetrospectiveInfEndDTTM: DateTime;
    private _AdministeredstopDate: DateTime;
    private _AdministeredstopDateTime: DateTime;
    private _IsRetrospective: boolean = false;
    private _StopComment: string;
    private _InfusionPastAction: string = null;
    private _InfAdministeredTimes: ObservableCollection<InfAdministeredTimes>;
    private _ScheduledDTTM: DateTime;
    private _IsEnableInfusionrate: boolean = true;
    private _PCABolus: string;
    private _IsCALaunch: string;
    private _IsVisibleRestrospectivegas: Visibility = Visibility.Collapsed;
    private _IsChkReStop: boolean = false;
    private _isrdlInfusionrate: boolean = false;
    private _isrdlDose: boolean = false;
    private summaryViewDeliverydevice: string;
    private summaryviewLumen: string;
    private summaryviewSite: string;
    private _isEnableChkWitness: boolean = true;
    public _isEnableWitnessedBy: boolean = true;
    private _isEnableChngBagWitnessedBy: boolean = true;
    private _HumidificationList: ObservableCollection<CListItem>;
    private _Humicode: string;
    private _IsEnableHumidification: boolean = true;
    private _Humidification: CListItem;
    private _FlowrateNumUOM: CListItem;
    private _FlowrateDenUOM: CListItem;
    private _IsEnableFlowrate: boolean = true;
    private _AmendedAsRequired: string;
    private _summaryviewRoute: string;
    private _IsPRNWithSchedule: boolean = false;
    private _IsConditionalExists: boolean;
    private _IsVisibleDoseUOM: Visibility = Visibility.Collapsed;
    private _DoseLblShow: Visibility = Visibility.Visible;
    private _isMandatoryForBegunConcentration: boolean = false;
    private _isEnableConcentration: boolean = true;
    private _isBackgrdRouteVisible: Visibility = Visibility.Visible;
    private _islblDoseValueVisible: Visibility = Visibility.Collapsed;
    private _IslblDoseVisible: Visibility = Visibility.Visible;
    private _islblDoseValue: string;
    private _isCtrlConcentration: Visibility = Visibility.Visible;
    private _islblConcentrationValueVisi: Visibility = Visibility.Collapsed;
    private _lblConcentrationValue: string;
    private _lblConcentrationVisi: Visibility = Visibility.Visible;
    private _lblExpiryDt: Visibility = Visibility.Visible;
    private _lblBatchNum: Visibility = Visibility.Visible;
    private _IsChkReComplete: boolean;
    public get IsChkReComplete(): boolean {
        return this._IsChkReComplete;
    }
    public set IsChkReComplete(value: boolean) {
        this._IsChkReComplete = value;
        this.IsChkReStop = !value;
    }
    public get IsChkReStop(): boolean {
        return this._IsChkReStop;
    }
    public set IsChkReStop(value: boolean) {
        if (this._IsChkReStop != value) {
            this._IsChkReStop = value;
            this.IsChkReComplete = !value;
            // OnPropertyChanged("IsChkReStop");
        }
    }
    public get IsVisibleRestrospectivegas(): Visibility {
        return this._IsVisibleRestrospectivegas;
    }
    public set IsVisibleRestrospectivegas(value: Visibility) {
        if (this._IsVisibleRestrospectivegas != value) {
            this._IsVisibleRestrospectivegas = value;
            // OnPropertyChanged("IsVisibleRestrospectivegas");
        }
    }
    public get IsCALaunchCode(): string {
        return this._IsCALaunch;
    }
    public set IsCALaunchCode(value: string) {
        if (this._IsCALaunch != value) {
            this._IsCALaunch = value;
            // OnPropertyChanged("IsCALaunchCode");
        }
    }
    public get IsEnableBegun(): boolean {
        return this._isEnableBegun;
    }
    public set IsEnableBegun(value: boolean) {
        if (this._isEnableBegun != value) {
            this._isEnableBegun = value;
            // OnPropertyChanged("IsEnableBegun");
        }
    }
    public get IsEnableNotGiven(): boolean {
        return this._isEnableNotGiven;
    }
    public set IsEnableNotGiven(value: boolean) {
        if (this._isEnableNotGiven != value) {
            this._isEnableNotGiven = value;
            // OnPropertyChanged("IsEnableNotGiven");
        }
    }
    public get IsEnableDefered(): boolean {
        return this._isEnableDefered;
    }
    public set IsEnableDefered(value: boolean) {
        if (this._isEnableDefered != value) {
            this._isEnableDefered = value;
            // OnPropertyChanged("IsEnableDefered");
        }
    }
    public get IsEnablePause(): boolean {
        return this._isEnablePause;
    }
    public set IsEnablePause(value: boolean) {
        if (this._isEnablePause != value) {
            this._isEnablePause = value;
            // OnPropertyChanged("IsEnablePause");
        }
    }
    public get IsEnableResume(): boolean {
        return this._isEnableResume;
    }
    public set IsEnableResume(value: boolean) {
        if (this._isEnableResume != value) {
            this._isEnableResume = value;
            // OnPropertyChanged("IsEnableResume");
        }
    }
    public get IsEnableStop(): boolean {
        return this._isEnableStop;
    }
    public set IsEnableStop(value: boolean) {
        if (this._isEnableStop != value) {
            this._isEnableStop = value;
            // OnPropertyChanged("IsEnableStop");
        }
    }
    public get IsEnableComplete(): boolean {
        return this._isEnableComplete;
    }
    public set IsEnableComplete(value: boolean) {
        if (this._isEnableComplete != value) {
            this._isEnableComplete = value;
            // OnPropertyChanged("IsEnableComplete");
        }
    }
    public get IsEnableChangebag(): boolean {
        return this._isEnableChangebag;
    }
    public set IsEnableChangebag(value: boolean) {
        if (this._isEnableChangebag != value) {
            this._isEnableChangebag = value;
            // OnPropertyChanged("IsEnableChangebag");
        }
    }
    public get IsEnableChgflowrate(): boolean {
        return this._isEnableChgflowrate;
    }
    public set IsEnableChgflowrate(value: boolean) {
        if (this._isEnableChgflowrate != value) {
            this._isEnableChgflowrate = value;
            // OnPropertyChanged("IsEnableChgflowrate");
        }
    }
    public get IsStrikethroughadmin(): Visibility {
        return this._isStrikethroughadmin;
    }
    public set IsStrikethroughadmin(value: Visibility) {
        if (this._isStrikethroughadmin != value) {
            this._isStrikethroughadmin = value;
            // OnPropertyChanged("IsStrikethroughadmin");
        }
    }
    public get Isdoseadministered(): boolean {
        return this._isdoseadministered;
    }
    public set Isdoseadministered(value: boolean) {
        if (this._isdoseadministered != value) {
            this._isdoseadministered = value;
            // OnPropertyChanged("Isdoseadministered");
        }
    }
    public get IsVolumeMadatory(): boolean {
        return this._isvolumemandatory;
    }
    public set IsVolumeMadatory(value: boolean) {
        if (this._isvolumemandatory != value) {
            this._isvolumemandatory = value;
            // OnPropertyChanged("IsVolumeMadatory");
        }
    }
    public get IsEstiEndDateMsg(): Visibility {
        return this._isEstiEndDateMsg;
    }
    public set IsEstiEndDateMsg(value: Visibility) {
        if (this._isEstiEndDateMsg != value) {
            this._isEstiEndDateMsg = value;
            // OnPropertyChanged("IsEstiEndDateMsg");
        }
    }
    public get EstimatedEndTime(): string {
        return this._EstimatedEndTime;
    }
    public set EstimatedEndTime(value: string) {
        if (this._EstimatedEndTime != value) {
            this._EstimatedEndTime = value;
            // OnPropertyChanged("EstimatedEndTime");
        }
    }
    public get DoseAdministered(): string {
        return this.doseadministered;
    }
    public set DoseAdministered(value: string) {
        if (this.doseadministered != value) {
            this.doseadministered = value;
            // OnPropertyChanged("DoseAdministered");
        }
    }
    public get IsDose(): Visibility {
        return this._isDose;
    }
    public set IsDose(value: Visibility) {
        if (this._isDose != value) {
            this._isDose = value;
            // OnPropertyChanged("IsDose");
        }
    }
    public get IsEnableDose(): boolean {
        return this._isEnableDose;
    }
    public set IsEnableDose(value: boolean) {
        if (this._isEnableDose != value) {
            this._isEnableDose = value;
            // OnPropertyChanged("IsEnableDose");
        }
    }
    private _IsEnableStopDose: boolean = true;
    public get IsEnableStopDose(): boolean {
        return this._IsEnableStopDose;
    }
    public set IsEnableStopDose(value: boolean) {
        if (this._IsEnableStopDose != value) {
            this._IsEnableStopDose = value;
            // OnPropertyChanged("IsEnableStopDose");
        }
    }
    public get DoseUomLorenzoID(): string {
        return this.doseUomLorenzoID;
    }
    public set DoseUomLorenzoID(value: string) {
        if (this.doseUomLorenzoID != value) {
            this.doseUomLorenzoID = value;
            // OnPropertyChanged("DoseUomLorenzoID");
        }
    }
    public get IsInfusionrateCal(): Visibility {
        return this._isInfusionrateCal;
    }
    public set IsInfusionrateCal(value: Visibility) {
        if (this._isInfusionrateCal != value) {
            this._isInfusionrateCal = value;
            // OnPropertyChanged("IsInfusionrateCal");
        }
    }
    public get IsInfDripnrateCal(): Visibility {
        return this._isInfDripnrateCal;
    }
    public set IsInfDripnrateCal(value: Visibility) {
        if (this._isInfDripnrateCal != value) {
            this._isInfDripnrateCal = value;
            // OnPropertyChanged("IsInfDripnrateCal");
        }
    }
    public get NextBagVolume(): string {
        return this._NextBagVolume;
    }
    public set NextBagVolume(value: string) {
        if (this._NextBagVolume != value) {
            this._NextBagVolume = value;
            // OnPropertyChanged("NextBagVolume");
        }
    }
    public get PrevBagVolumeUom(): CListItem {
        return this._PrevBagVolumeUom;
    }
    public set PrevBagVolumeUom(value: CListItem) {
        if (this._PrevBagVolumeUom != value) {
            this._PrevBagVolumeUom = value;
            // OnPropertyChanged("PrevBagVolumeUom");
        }
    }
    public get PrevBagVolume(): string {
        return this._PrevBagVolume;
    }
    public set PrevBagVolume(value: string) {
        if (this._PrevBagVolume != value) {
            this._PrevBagVolume = value;
            // OnPropertyChanged("PrevBagVolume");
        }
    }
    public get IsVisiblePause(): Visibility {
        return this._isVisiblePause;
    }
    public set IsVisiblePause(value: Visibility) {
        if (this._isVisiblePause != value) {
            this._isVisiblePause = value;
            // OnPropertyChanged("IsVisiblePause");
        }
    }
    public get IsVisibleStop(): Visibility {
        return this._isVisibleStop;
    }
    public set IsVisibleStop(value: Visibility) {
        if (this._isVisibleStop != value) {
            this._isVisibleStop = value;
            // OnPropertyChanged("IsVisibleStop");
        }
    }
    public get IsVisibleResume(): Visibility {
        return this._isVisibleResume;
    }
    public set IsVisibleResume(value: Visibility) {
        if (this._isVisibleResume != value) {
            this._isVisibleResume = value;
            // OnPropertyChanged("IsVisibleResume");
        }
    }
    public get IsVisibleChangebag(): Visibility {
        return this._isVisibleChangebag;
    }
    public set IsVisibleChangebag(value: Visibility) {
        if (this._isVisibleChangebag != value) {
            this._isVisibleChangebag = value;
            // OnPropertyChanged("IsVisibleChangebag");
        }
    }
    public get IsEnableLumen(): boolean {
        return this._isEnableLumen;
    }
    public set IsEnableLumen(value: boolean) {
        if (this._isEnableLumen != value) {
            this._isEnableLumen = value;
            // OnPropertyChanged("IsEnableLumen");
        }
    }
    public get ReasonforPause(): CListItem {
        return this._ReasonforPause;
    }
    public set ReasonforPause(value: CListItem) {
        if (this._ReasonforPause != value) {
            if (value != null && !String.IsNullOrEmpty(value.Value) && String.Compare(value.Value, "CC_CLNCLRSN") == 0) {
                this.IsClinicalRSNMand = true;
            }
            else {
                this.IsClinicalRSNMand = false;
            }
            this._ReasonforPause = value;
            // OnPropertyChanged("ReasonforPause");
        }
    }
    public get ReasonforPauselist(): ObservableCollection<CListItem> {
        return this._ReasonforPauselist;
    }
    public set ReasonforPauselist(value: ObservableCollection<CListItem>) {
        if (this._ReasonforPauselist != value) {
            this._ReasonforPauselist = value;
            // OnPropertyChanged("ReasonforPauselist");
        }
    }
    public get ReasonforStop(): CListItem {
        return this._ReasonforStop;
    }
    public set ReasonforStop(value: CListItem) {
        if (this._ReasonforStop != value) {
            if (value != null && !String.IsNullOrEmpty(value.Value) && String.Compare(value.Value, "CC_CLNCLRSN") == 0) {
                this.IsStopClinicalRSNMand = true;
            }
            else {
                this.IsStopClinicalRSNMand = false;
            }
            this._ReasonforStop = value;
            // OnPropertyChanged("ReasonforStop");
        }
    }
    public get ReasonforStoplist(): ObservableCollection<CListItem> {
        return this._ReasonforStoplist;
    }
    public set ReasonforStoplist(value: ObservableCollection<CListItem>) {
        if (this._ReasonforStoplist != value) {
            this._ReasonforStoplist = value;
            // OnPropertyChanged("ReasonforStoplist");
        }
    }
    public get RouteOID(): number {
        return this._RouteOID;
    }
    public set RouteOID(value: number) {
        if (this._RouteOID != value) {
            this._RouteOID = value;
            // OnPropertyChanged("RouteOID");
        }
    }
    public get IsControlledDrug(): boolean {
        return this._IsControlledDrug;
    }
    public set IsControlledDrug(value: boolean) {
        if (this._IsControlledDrug != value) {
            this._IsControlledDrug = value;
            // OnPropertyChanged("IsControlledDrug");
        }
    }
    public get PresLorenzoID(): string {
        return this._PresLorenzoID;
    }
    public set PresLorenzoID(value: string) {
        if (this._PresLorenzoID != value) {
            this._PresLorenzoID = value;
            // OnPropertyChanged("PresLorenzoID");
        }
    }
    public get bIsWitnessReqd(): boolean {
        return this._bIsWitnessReqd;
    }
    public set bIsWitnessReqd(value: boolean) {
        if (this._bIsWitnessReqd != value) {
            this._bIsWitnessReqd = value;
            // OnPropertyChanged("bIsWitnessReqd");
        }
    }
    public get lblcliniIncFrm(): Visibility {
        return this._lblcliniIncFrm;
    }
    public set lblcliniIncFrm(value: Visibility) {
        if (this._lblcliniIncFrm != value) {
            this._lblcliniIncFrm = value;
            // OnPropertyChanged("lblcliniIncFrm");
        }
    }
    public get IsEnablelblcliniIncFrmValue(): boolean {
        return this._isEnablelblcliniIncFrmValue;
    }
    public set IsEnablelblcliniIncFrmValue(value: boolean) {
        if (this._isEnablelblcliniIncFrmValue != value) {
            this._isEnablelblcliniIncFrmValue = value;
            // OnPropertyChanged("IsEnablelblcliniIncFrmValue");
        }
    }
    public get ClinicalIncidentForm(): string {
        return this._ClinicalIncidentForm;
    }
    public set ClinicalIncidentForm(value: string) {
        if (this._ClinicalIncidentForm != value) {
            this._ClinicalIncidentForm = value;
            // OnPropertyChanged("ClinicalIncidentForm");
        }
    }
    public get IsMandatoryInfusionrate(): boolean {
        return this._isMandatoryInfusionrate;
    }
    public set IsMandatoryInfusionrate(value: boolean) {
        if (this._isMandatoryInfusionrate != value) {
            this._isMandatoryInfusionrate = value;
            // OnPropertyChanged("IsMandatoryInfusionrate");
        }
    }
    public get CInfRate(): string {
        return this._CInfRate;
    }
    public set CInfRate(value: string) {
        if (this._CInfRate != value) {
            this._CInfRate = value;
            // OnPropertyChanged("CInfRate");
        }
    }
    public get ChangedInfRateDinUOM(): CListItem {
        return this._ChangedInfRateDinUOM;
    }
    public set ChangedInfRateDinUOM(value: CListItem) {
        if (this._ChangedInfRateDinUOM != value) {
            this._ChangedInfRateDinUOM = value;
            if (!String.Equals(this.InfusionAction, MedicationAction.BEGUN))
                this.IsClinicalRSNMand = true;
            // OnPropertyChanged("ChangedInfRateDinUOM");
        }
    }
    public get ChangedInfRateNumUOM(): CListItem {
        return this._ChangedInfRateNumUOM;
    }
    public set ChangedInfRateNumUOM(value: CListItem) {
        if (this._ChangedInfRateNumUOM != value) {
            this._ChangedInfRateNumUOM = value;
            if (!String.Equals(this.InfusionAction, MedicationAction.BEGUN))
                this.IsClinicalRSNMand = true;
            // OnPropertyChanged("ChangedInfRateNumUOM");
        }
    }
    public get WeightInfusedUOMList(): ObservableCollection<CListItem> {
        return this._weightInfusedUOMList;
    }
    public set WeightInfusedUOMList(value: ObservableCollection<CListItem>) {
        if (this._weightInfusedUOMList != value) {
            this._weightInfusedUOMList = value;
            // OnPropertyChanged("WeightInfusedUOMList");
        }
    }
    public get CompoundInfusedUOMList(): ObservableCollection<CListItem> {
        return this._CompoundInfusedUOMList;
    }
    public set CompoundInfusedUOMList(value: ObservableCollection<CListItem>) {
        if (this._CompoundInfusedUOMList != value) {
            this._CompoundInfusedUOMList = value;
            // OnPropertyChanged("CompoundInfusedUOMList");
        }
    }
    public get DripInfusionRate(): string {
        return this._dripInfusionRate;
    }
    public set DripInfusionRate(value: string) {
        if (this._dripInfusionRate != value) {
            this._dripInfusionRate = value;
            // OnPropertyChanged("DripInfusionRate");
        }
    }
    public get DripInfusionRateUom(): string {
        return this._dripInfusionRateUom;
    }
    public set DripInfusionRateUom(value: string) {
        if (this._dripInfusionRateUom != value) {
            this._dripInfusionRateUom = value;
            // OnPropertyChanged("DripInfusionRateUom");
        }
    }
    public get DripInfRateUomOID(): number {
        return this._dripInfRateUomOID;
    }
    public set DripInfRateUomOID(value: number) {
        if (this._dripInfRateUomOID != value) {
            this._dripInfRateUomOID = value;
            // OnPropertyChanged("DripInfRateUomOID");
        }
    }
    public get DripInfRatePerUomOID(): number {
        return this._dripInfRatePerUomOID;
    }
    public set DripInfRatePerUomOID(value: number) {
        if (this._dripInfRatePerUomOID != value) {
            this._dripInfRatePerUomOID = value;
            // OnPropertyChanged("DripInfRatePerUomOID");
        }
    }
    public get IsInfRateVolBased(): boolean {
        return this._IsInfRateVolBased;
    }
    public set IsInfRateVolBased(value: boolean) {
        this._IsInfRateVolBased = value;
        // OnPropertyChanged("IsInfRateVolBased");
    }
    public get IsSelectChangeFlowrate(): boolean {
        return this._IsSelectChangeFlowrate;
    }
    public set IsSelectChangeFlowrate(value: boolean) {
        if (this._IsSelectChangeFlowrate != value) {
            this._IsSelectChangeFlowrate = value;
            // OnPropertyChanged("IsSelectChangeFlowrate");
        }
    }
    public get IsEnableSite(): boolean {
        return this._IsEnableSite;
    }
    public set IsEnableSite(value: boolean) {
        if (this._IsEnableSite != value) {
            this._IsEnableSite = value;
            // OnPropertyChanged("IsEnableSite");
        }
    }
    public get IsMandatoryExpiryDTTM(): boolean {
        return this._IsMandatoryExpiryDTTM;
    }
    public set IsMandatoryExpiryDTTM(value: boolean) {
        if (this._IsMandatoryExpiryDTTM != value) {
            this._IsMandatoryExpiryDTTM = value;
            // OnPropertyChanged("IsMandatoryExpiryDTTM");
        }
    }
    public get IsMandatoryBatchNumber(): boolean {
        return this._IsMandatoryBatchNumber;
    }
    public set IsMandatoryBatchNumber(value: boolean) {
        if (this._IsMandatoryBatchNumber != value) {
            this._IsMandatoryBatchNumber = value;
            // OnPropertyChanged("IsMandatoryBatchNumber");
        }
    }
    public get InfusionPeriod(): string {
        return this._InfusionPeriod;
    }
    public set InfusionPeriod(value: string) {
        if (this._InfusionPeriod != value) {
            this._InfusionPeriod = value;
        }
    }
    public get InfusionPeriodUOM(): string {
        return this._InfusionPeriodUOM;
    }
    public set InfusionPeriodUOM(value: string) {
        if (this._InfusionPeriodUOM != value) {
            this._InfusionPeriodUOM = value;
        }
    }
    public get InfusionPeriodUomOID(): number {
        return this._InfusionPeriodUomOID;
    }
    public set InfusionPeriodUomOID(value: number) {
        if (this._InfusionPeriodUomOID != value) {
            this._InfusionPeriodUomOID = value;
        }
    }
    public get LowerDose(): string {
        return this._LowerDose;
    }
    public set LowerDose(value: string) {
        if (this._LowerDose != value) {
            this._LowerDose = value;
            // OnPropertyChanged("LowerDose");
        }
    }
    public get UpperDose(): string {
        return this._UpperDose;
    }
    public set UpperDose(value: string) {
        if (this._UpperDose != value) {
            this._UpperDose = value;
            // OnPropertyChanged("UpperDose");
        }
    }
    public get IsVisibleRestrostopcomplete(): Visibility {
        return this._isVisibleRestrostopcomplete;
    }
    public set IsVisibleRestrostopcomplete(value: Visibility) {
        if (this._isVisibleRestrostopcomplete != value) {
            this._isVisibleRestrostopcomplete = value;
            // OnPropertyChanged("IsVisibleRestrostopcomplete");
        }
    }
    public get RetrospectiveInfEndDTTM(): DateTime {
        return this._RetrospectiveInfEndDTTM;
    }
    public set RetrospectiveInfEndDTTM(value: DateTime) {
        if (this._RetrospectiveInfEndDTTM != value) {
            this._RetrospectiveInfEndDTTM = value;
            // OnPropertyChanged("RetrospectiveInfEndDTTM");
        }
    }
    public get AdministeredstopDate(): DateTime {
        return this._AdministeredstopDate;
    }
    public set AdministeredstopDate(value: DateTime) {
        if (this._AdministeredstopDate != value) {
            this._AdministeredstopDate = value;
            //revisitme yasik
            if (value != DateTime.MinValue) {
                this.AdministeredstopDateTime = value.DateTime.AddTime(this.AdministeredstopDateTime);
            }
            //this.AdministeredstopDateTime = value.DateTime.AddTime(this.AdministeredstopDateTime);
            // OnPropertyChanged("AdministeredstopDate");
        }
    }
    public get AdministeredstopDateTime(): DateTime {
        return this._AdministeredstopDateTime;
    }
    // public set AdministeredstopDateTime(value: DateTime) {
    //     if (this._AdministeredstopDateTime != value) {
    //         this._AdministeredstopDateTime = this._AdministeredstopDate.DateTime.AddTime(value);
    //         // OnPropertyChanged("AdministeredstopDateTime");
    //     }
    // }

    public set AdministeredstopDateTime(value: DateTime) {
        // if (value != this._AdministeredstopDateTime) {
        //     if (this._AdministeredstopDate)
        //         this._AdministeredstopDateTime = this._AdministeredstopDate.DateTime.AddTime(value);
        //     else
                this._AdministeredstopDateTime = value;
            // OnPropertyChanged("AdministeredstopDateTime");
        // }

    }

    public get IsRetrospective(): boolean {
        return this._IsRetrospective;
    }
    public set IsRetrospective(value: boolean) {
        if (this._IsRetrospective != value) {
            this._IsRetrospective = value;
            // OnPropertyChanged("IsRetrospective");
        }
    }
    public get StopComments(): string {
        return this._StopComment;
    }
    public set StopComments(value: string) {
        if (this._StopComment != value) {
            this._StopComment = value;
            // OnPropertyChanged("StopComments");
        }
    }
    public get InfusionPastAction(): string {
        return this._InfusionPastAction;
    }
    public set InfusionPastAction(value: string) {
        if (this._InfusionPastAction != value) {
            this._InfusionPastAction = value;
            // OnPropertyChanged("InfusionPastAction");
        }
    }
    public get InfAdministeredTimes(): ObservableCollection<InfAdministeredTimes> {
        return this._InfAdministeredTimes;
    }
    public set InfAdministeredTimes(value: ObservableCollection<InfAdministeredTimes>) {
        if (this._InfAdministeredTimes != value) {
            this._InfAdministeredTimes = value;
            // OnPropertyChanged("InfAdministeredTimes");
        }
    }
    public get ScheduledDTTM(): DateTime {
        return this._ScheduledDTTM;
    }
    public set ScheduledDTTM(value: DateTime) {
        if (this._ScheduledDTTM != value) {
            this._ScheduledDTTM = value;
            // OnPropertyChanged("ScheduledDTTM");
        }
    }
    public get IsEnableInfusionrate(): boolean {
        return this._IsEnableInfusionrate;
    }
    public set IsEnableInfusionrate(value: boolean) {
        if (this._IsEnableInfusionrate != value) {
            this._IsEnableInfusionrate = value;
            // OnPropertyChanged("IsEnableInfusionrate");
        }
    }
    public get PCABolus(): string {
        return this._PCABolus;
    }
    public set PCABolus(value: string) {
        if (this._PCABolus != value) {
            this._PCABolus = value;
            // OnPropertyChanged("PCABolus");
        }
    }
    public get IsrdlInfusionrate(): boolean {
        return this._isrdlInfusionrate;
    }
    public set IsrdlInfusionrate(value: boolean) {
        if (this._isrdlInfusionrate != value) {
            this._isrdlInfusionrate = value;
            // OnPropertyChanged("IsrdlInfusionrate");
        }
    }
    public get IsrdlDose(): boolean {
        return this._isrdlDose;
    }
    public set IsrdlDose(value: boolean) {
        if (this._isrdlDose != value) {
            this._isrdlDose = value;
            // OnPropertyChanged("IsrdlDose");
        }
    }
    public get SummaryViewDeliverydevice(): string {
        return this.summaryViewDeliverydevice;
    }
    public set SummaryViewDeliverydevice(value: string) {
        if (this.summaryViewDeliverydevice != value) {
            this.summaryViewDeliverydevice = value;
            // OnPropertyChanged("SummaryViewDeliverydevice");
        }
    }
    public get SummaryviewLumen(): string {
        return this.summaryviewLumen;
    }
    public set SummaryviewLumen(value: string) {
        if (this.summaryviewLumen != value) {
            this.summaryviewLumen = value;
            // OnPropertyChanged("SummaryviewLumen");
        }
    }
    public get SummaryviewSite(): string {
        return this.summaryviewSite;
    }
    public set SummaryviewSite(value: string) {
        if (this.summaryviewSite != value) {
            this.summaryviewSite = value;
            // OnPropertyChanged("SummaryviewSite");
        }
    }
    public get IsEnableChkWitness(): boolean {
        return this._isEnableChkWitness;
    }
    public set IsEnableChkWitness(value: boolean) {
        if (this._isEnableChkWitness != value) {
            this._isEnableChkWitness = value;
            // OnPropertyChanged("IsEnableChkWitness");
        }
    }
    public get IsEnableWitnessedBy(): boolean {
        return this._isEnableWitnessedBy;
    }

    public set IsEnableWitnessedBy(value: boolean) {
        if (this._isEnableWitnessedBy != value) {
            this._isEnableWitnessedBy = value;
            // OnPropertyChanged("IsEnableWitnessedBy");
        }
    }
    public get IsEnableChngBagWitnessedBy(): boolean {
        return this._isEnableChngBagWitnessedBy;
    }
    public set IsEnableChngBagWitnessedBy(value: boolean) {
        if (this._isEnableChngBagWitnessedBy != value) {
            this._isEnableChngBagWitnessedBy = value;
            // OnPropertyChanged("IsEnableChngBagWitnessedBy");
        }
    }
    public get HumidificationList(): ObservableCollection<CListItem> {
        return this._HumidificationList;
    }
    public set HumidificationList(value: ObservableCollection<CListItem>) {
        if (this._HumidificationList != value) {
            this._HumidificationList = value;
            // OnPropertyChanged("HumidificationList");
        }
    }
    public get Humidification(): CListItem {
        return this._Humidification;
    }
    public set Humidification(value: CListItem) {
        if (this._Humidification != value) {
            this._Humidification = value;
            // OnPropertyChanged("Humidification");
        }
    }
    public get Humicode(): string {
        return this._Humicode;
    }
    public set Humicode(value: string) {
        this._Humicode = value;
    }
    public get IsEnableHumidification(): boolean {
        return this._IsEnableHumidification;
    }
    public set IsEnableHumidification(value: boolean) {
        if (this._IsEnableHumidification != value) {
            this._IsEnableHumidification = value;
            // OnPropertyChanged("IsEnableHumidification");
        }
    }
    public get FlowrateNumUOM(): CListItem {
        return this._FlowrateNumUOM;
    }
    public set FlowrateNumUOM(value: CListItem) {
        if (this._FlowrateNumUOM != value) {
            this._FlowrateNumUOM = value;
            // OnPropertyChanged("FlowrateNumUOM");
        }
    }
    public get FlowrateDenUOM(): CListItem {
        return this._FlowrateDenUOM;
    }
    public set FlowrateDenUOM(value: CListItem) {
        if (this._FlowrateDenUOM != value) {
            this._FlowrateDenUOM = value;
            // OnPropertyChanged("FlowrateDenUOM");
        }
    }
    public get IsEnableFlowrate(): boolean {
        return this._IsEnableFlowrate;
    }
    public set IsEnableFlowrate(value: boolean) {
        if (this._IsEnableFlowrate != value) {
            this._IsEnableFlowrate = value;
            // OnPropertyChanged("IsEnableFlowrate");
        }
    }
    public get summaryviewRoute(): string {
        return this._summaryviewRoute;
    }
    public set summaryviewRoute(value: string) {
        if (this._summaryviewRoute != value) {
            this._summaryviewRoute = value;
            // OnPropertyChanged("summaryviewRoute");
        }
    }
    public get AmendedAsRequired(): string {
        return this._AmendedAsRequired;
    }
    public set AmendedAsRequired(value: string) {
        if (this._AmendedAsRequired != value) {
            this._AmendedAsRequired = value;
            // OnPropertyChanged("AmendedAsRequired");
        }
    }
    public get IsPRNWithSchedule(): boolean {
        return this._IsPRNWithSchedule;
    }
    public set IsPRNWithSchedule(value: boolean) {
        if (this._IsPRNWithSchedule != value) {
            this._IsPRNWithSchedule = value;
            // OnPropertyChanged("IsPRNWithSchedule");
        }
    }
    public get IsConditionalExists(): boolean {
        return this._IsConditionalExists;
    }
    public set IsConditionalExists(value: boolean) {
        if (this._IsConditionalExists != value) {
            this._IsConditionalExists = value;
            // OnPropertyChanged("IsConditionalExists");
        }
    }
    public get IsVisibleDoseUOM(): Visibility {
        return this._IsVisibleDoseUOM;
    }
    public set IsVisibleDoseUOM(value: Visibility) {
        if (this._IsVisibleDoseUOM != value) {
            this._IsVisibleDoseUOM = value;
            // OnPropertyChanged("IsVisibleDoseUOM");
        }
    }
    public get DoseLblShow(): Visibility {
        return this._DoseLblShow;
    }
    public set DoseLblShow(value: Visibility) {
        if (this._DoseLblShow != value) {
            this._DoseLblShow = value;
            // OnPropertyChanged("DoseLblShow");
        }
    }
    public get IsMandatoryForBegunConcentration(): boolean {
        return this._isMandatoryForBegunConcentration;
    }
    public set IsMandatoryForBegunConcentration(value: boolean) {
        if (this._isMandatoryForBegunConcentration != value) {
            this._isMandatoryForBegunConcentration = value;
            // OnPropertyChanged("IsMandatoryForBegunConcentration");
        }
    }
    public get IsEnableConcentration(): boolean {
        return this._isEnableConcentration;
    }
    public set IsEnableConcentration(value: boolean) {
        if (this._isEnableConcentration != value) {
            this._isEnableConcentration = value;
            // OnPropertyChanged("IsEnableConcentration");
        }
    }
    public get IsBackgrdRouteVisible(): Visibility {
        return this._isBackgrdRouteVisible;
    }
    public set IsBackgrdRouteVisible(value: Visibility) {
        if (this._isBackgrdRouteVisible != value) {
            this._isBackgrdRouteVisible = value;
            // OnPropertyChanged("IsBackgrdRouteVisible");
        }
    }
    public get IsDoseValueVisible(): Visibility {
        return this._islblDoseValueVisible;
    }
    public set IsDoseValueVisible(value: Visibility) {
        if (this._islblDoseValueVisible != value) {
            this._islblDoseValueVisible = value;
            // OnPropertyChanged("IsDoseValueVisible");
        }
    }
    public get IslblDoseVisible(): Visibility {
        return this._IslblDoseVisible;
    }
    public set IslblDoseVisible(value: Visibility) {
        if (this._IslblDoseVisible != value) {
            this._IslblDoseVisible = value;
            // OnPropertyChanged("IslblDoseVisible");
        }
    }
    public get IslblDoseValue(): string {
        return this._islblDoseValue;
    }
    public set IslblDoseValue(value: string) {
        if (this._islblDoseValue != value) {
            this._islblDoseValue = value;
            // OnPropertyChanged("IslblDoseValue");
        }
    }
    public get IsCtrlConcentration(): Visibility {
        return this._isCtrlConcentration;
    }
    public set IsCtrlConcentration(value: Visibility) {
        if (this._isCtrlConcentration != value) {
            this._isCtrlConcentration = value;
            // OnPropertyChanged("IsCtrlConcentration");
        }
    }
    public get IslblConcentrationValueVisi(): Visibility {
        return this._islblConcentrationValueVisi;
    }
    public set IslblConcentrationValueVisi(value: Visibility) {
        if (this._islblConcentrationValueVisi != value) {
            this._islblConcentrationValueVisi = value;
            // OnPropertyChanged("IslblConcentrationValueVisi");
        }
    }
    public get lblConcentrationValue(): string {
        return this._lblConcentrationValue;
    }
    public set lblConcentrationValue(value: string) {
        if (this._lblConcentrationValue != value) {
            this._lblConcentrationValue = value;
            // OnPropertyChanged("lblConcentrationValue");
        }
    }
    public get lblConcentrationVisi(): Visibility {
        return this._lblConcentrationVisi;
    }
    public set lblConcentrationVisi(value: Visibility) {
        if (this._lblConcentrationVisi != value) {
            this._lblConcentrationVisi = value;
            // OnPropertyChanged("lblConcentrationVisi");
        }
    }
    private _IsBackgrdConcentrationVisible: Visibility;
    public get IsBackgrdConcentrationVisible(): Visibility {
        return this._IsBackgrdConcentrationVisible;
    }
    public set IsBackgrdConcentrationVisible(value: Visibility) {
        if (this._IsBackgrdConcentrationVisible != value) {
            this._IsBackgrdConcentrationVisible = value;
            // OnPropertyChanged("IsBackgrdConcentrationVisible");
        }
    }
    public get lblExpiryDt(): Visibility {
        return this._lblExpiryDt;
    }
    public set lblExpiryDt(value: Visibility) {
        if (this._lblExpiryDt != value) {
            this._lblExpiryDt = value;
            // OnPropertyChanged("lblExpiryDt");
        }
    }
    public get lblBatchNum(): Visibility {
        return this._lblBatchNum;
    }
    public set lblBatchNum(value: Visibility) {
        if (this._lblBatchNum != value) {
            this._lblBatchNum = value;
            // OnPropertyChanged("lblBatchNum");
        }
    }
    public SetInfusionActions(): void {
        let InfusionTypeCode: string = String.Empty;
        if ((!String.IsNullOrEmpty(this.InfSlotStatus) && this.InfusionType != null && !String.IsNullOrEmpty(this.InfusionType.Value)) || !String.IsNullOrEmpty(this.ItemSubType)) {
            InfusionTypeCode = (this.InfusionType.Value != null && this.InfusionType.Value.length > 0) ? this.InfusionType.Value : (this.ItemSubType != null && this.ItemSubType.length > 0 ? this.ItemSubType : String.Empty);
            this.IsBagDetailsEnable = true;
            this.IsBagDetailsVisible = Visibility.Visible;
            switch (InfusionTypeCode) {
                case InfusionTypesCode.CONTINUOUS:
                case InfusionTypesCode.SINGLEDOSEVOLUME:
                case InfusionTypesCode.FLUID:
                    if ((String.Compare(this.InfSlotStatus, SlotStatus.NOTYETRECORDED) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.OVERDUE) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.DUENOW) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.PLANNED) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.NOTKNOWN) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.HOMELEAVE) == 0)) {
                        if (this.AmendmentAlert || this.DiscontinueAlert || String.Compare(this.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.InfSlotStatus, SlotStatus.NOTYETRECORDED) == 0) {
                            this.IsEnableDefered = false;
                        }
                        else {
                            this.IsEnableDefered = (String.Equals(this.InfSlotStatus, SlotStatus.OVERDUE) || String.Equals(this.InfSlotStatus, SlotStatus.DUENOW));
                            if (String.Equals(this.InfSlotStatus, SlotStatus.HOMELEAVE, StringComparison.InvariantCultureIgnoreCase) && !this.IsNextHomeLeaveSlotExists) {
                                this.IsEnableDefered = true;
                            }
                        }
                        this.IsEnableBegun = true;
                        this.IsEnableNotGiven = true;
                        this.IsEnablePause = false;
                        this.IsEnableResume = false;
                        this.IsEnableStop = false;
                        this.IsEnableComplete = false;
                        this.IsEnableChangebag = false;
                        this.IsEnableChgflowrate = false;
                        this.IsMandatoryInfusionrate = this.IsEnableInfusionrate;
                        this.IsDoseMandatory = false;
                        this.CondDose = Visibility.Collapsed;
                        this.IsVisibleDoseUOM = Visibility.Collapsed;
                        this.IsStrikethroughadmin = Visibility.Collapsed;
                        if (!String.IsNullOrEmpty(this.ItemSubType) && (String.Compare(this.ItemSubType, InfusionTypesCode.BLOOD_PRODUCT) == 0)) {
                            this.IsMandatoryExpiryDTTM = true;
                            this.IsMandatoryBatchNumber = true;
                        }
                        else {
                            this.IsMandatoryExpiryDTTM = false;
                            this.IsMandatoryBatchNumber = false;
                        }
                        if (String.Compare(this.DoseType, DoseTypeCode.CONDITIONAL) == 0 && this.IsConditionalExists) {
                            this.IsInfRateMandatory = true;
                            this.IsrdlDose = true;
                            this.IsEnableDose = false;
                            this.CondInfRate = Visibility.Visible;
                            this.IsVisibleDoseUOM = Visibility.Collapsed;
                        }
                        else {
                            this.IsInfRateMandatory = false;
                            this.IsrdlDose = false;
                            this.IsrdlInfusionrate = false;
                            this.CondInfRate = Visibility.Collapsed;
                            if (String.Compare(this.DoseType, DoseTypeCode.CONDITIONAL) == 0 && !this.IsConditionalExists) {
                                this.IsVisibleDoseUOM = Visibility.Visible;
                                this.IsEnableDose = true;
                            }
                        }
                        if (((String.Compare(this.IsCALaunchCode, CALaunch.OverviewChart.ToString()) == 0) && (String.Compare(this.InfSlotStatus, SlotStatus.NOTYETRECORDED) == 0 || String.Compare(this.InfSlotStatus, SlotStatus.NOTKNOWN) == 0)) || ((String.Equals(this.IsCALaunchCode, CALaunch.InfusionChart.ToString(), StringComparison.CurrentCultureIgnoreCase)) && String.Compare(this.InfSlotStatus, SlotStatus.NOTKNOWN) == 0 && (String.Equals(this.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase)))) {
                            this.IsRetrospective = true;
                            this.IsEnableDefered = false;
                            this.IsVisibleRestrostopcomplete = Visibility.Visible;
                            this.InfusionPastAction = MedicationAction.STOP;
                        }
                        else {
                            this.IsRetrospective = false;
                            this.IsEnableDefered = (this.AmendmentAlert || this.DiscontinueAlert || String.Equals(this.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase)) ? false : (String.Equals(this.InfSlotStatus, SlotStatus.OVERDUE) || String.Equals(this.InfSlotStatus, SlotStatus.DUENOW));
                            if (String.Equals(this.InfSlotStatus, SlotStatus.HOMELEAVE, StringComparison.InvariantCultureIgnoreCase) && !this.IsNextHomeLeaveSlotExists) {
                                this.IsEnableDefered = true;
                            }
                            this.IsVisibleRestrostopcomplete = Visibility.Collapsed;
                        }
                    }
                    else if (String.Compare(this.InfSlotStatus, SlotStatus.NOTGIVEN) == 0) {
                        this.IsEnableBegun = false;
                        this.IsEnableNotGiven = false;
                        this.IsEnableDefered = false;
                        this.IsEnablePause = false;
                        this.IsEnableResume = false;
                        this.IsEnableStop = false;
                        this.IsEnableComplete = false;
                        this.IsEnableChangebag = false;
                        this.IsEnableChgflowrate = false;
                        this.IsStrikethroughadmin = Visibility.Visible;
                        this.IsBagDetailsEnable = false;
                    }
                    else if ((String.Compare(this.InfSlotStatus, SlotStatus.DEFERADMIN) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.DEFEROVERDUE) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.DEFERDUENOW) == 0)) {
                        this.IsStrikethroughadmin = Visibility.Collapsed;
                        this.IsEnableBegun = true;
                        this.IsEnableNotGiven = true;
                        this.IsEnableDefered = false;
                        this.IsEnablePause = false;
                        this.IsEnableResume = false;
                        this.IsEnableStop = false;
                        this.IsEnableComplete = false;
                        this.IsEnableChangebag = false;
                        this.IsEnableChgflowrate = false;
                        this.IsBagDetailsEnable = false;
                        this.IsVisibleDoseUOM = Visibility.Collapsed;
                        this.IsMandatoryInfusionrate = this.IsEnableInfusionrate;
                        if (!String.IsNullOrEmpty(this.ItemSubType) && (String.Compare(this.ItemSubType, InfusionTypesCode.BLOOD_PRODUCT) == 0)) {
                            this.IsMandatoryExpiryDTTM = true;
                            this.IsMandatoryBatchNumber = true;
                        }
                        if (String.Compare(this.DoseType, DoseTypeCode.CONDITIONAL) == 0 && this.IsConditionalExists) {
                            this.IsInfRateMandatory = true;
                            this.IsrdlDose = true;
                            this.IsEnableDose = false;
                            this.CondInfRate = Visibility.Visible;
                            this.IsVisibleDoseUOM = Visibility.Collapsed;
                        }
                        else {
                            this.IsInfRateMandatory = false;
                            this.IsrdlDose = false;
                            this.IsrdlInfusionrate = false;
                            this.CondInfRate = Visibility.Collapsed;
                            if (String.Compare(this.DoseType, DoseTypeCode.CONDITIONAL) == 0 && !this.IsConditionalExists) {
                                this.IsVisibleDoseUOM = Visibility.Visible;
                                this.IsEnableDose = true;
                            }
                        }
                    }
                    else if (String.Compare(this.InfSlotStatus, SlotStatus.INPROGRESS) == 0) {
                        if (this.AmendmentAlert || this.DiscontinueAlert || String.Compare(this.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase) == 0) {
                            this.IsEnableBegun = false;
                            this.IsEnableNotGiven = false;
                            this.IsEnableDefered = false;
                            this.IsEnablePause = false;
                            this.IsEnableResume = false;
                            this.IsEnableStop = true;
                            this.IsEnableComplete = true;
                            this.IsEnableChangebag = false;
                            this.IsEnableChgflowrate = false;
                        }
                        else {
                            this.IsEnableComplete = true;
                            if (this.ChangeFlowRateAlert || this.CondDoseMonitoringPeriodAlert || this.ChangeConcentrationAlert || this.ChangeRateAndConcentrationAlert) {
                                this.IsEnableChgflowrate = true;
                                this.IsSelectChangeFlowrate = true;
                            }
                            else if (ProfileData.ChartSettingsConfig.IsChangeFlowRateEnabled)
                                this.IsEnableChgflowrate = true;
                            else this.IsEnableChgflowrate = false;
                            this.IsEnablePause = true;
                            this.IsEnableStop = true;
                            this.IsEnableChangebag = true;
                            this.IsEnableBegun = false;
                            this.IsEnableNotGiven = false;
                            this.IsEnableDefered = false;
                            this.IsEnableResume = true;
                            if (String.Compare(this.InfusionAction, MedicationAction.BEGUN) == 0) {
                                this.IsStrikeThruEnable = false;
                                this.IsStrikeThruVisible = Visibility.Collapsed;
                            }
                            if (!String.IsNullOrEmpty(this.ItemSubType) && (String.Compare(this.ItemSubType, InfusionTypesCode.BLOOD_PRODUCT) == 0)) {
                                this.IsMandatoryExpiryDTTM = true;
                                this.IsMandatoryBatchNumber = true;
                            }
                            else {
                                this.IsMandatoryExpiryDTTM = false;
                                this.IsMandatoryBatchNumber = false;
                            }
                            if ((String.Compare(this.InfusionAction, MedicationAction.CHANGEFLOWRATE) == 0) && (String.Compare(this.DoseType, DoseTypeCode.CONDITIONAL) == 0) && this.IsConditionalExists) {
                                this.CondInfrateFR = Visibility.Visible;
                            }
                            else {
                                this.CondInfrateFR = Visibility.Collapsed;
                            }
                        }
                    }
                    else if (String.Compare(this.InfSlotStatus, SlotStatus.PAUSED) == 0) {
                        this.IsEnableResume = true;
                        this.IsEnableStop = true;
                        this.IsEnableChangebag = true;
                        this.IsEnableBegun = false;
                        this.IsEnableNotGiven = false;
                        this.IsEnableDefered = false;
                        this.IsEnablePause = false;
                        if (this.ChangeFlowRateAlert || this.CondDoseMonitoringPeriodAlert || this.ChangeConcentrationAlert || this.ChangeRateAndConcentrationAlert) {
                            this.IsEnableChgflowrate = true;
                            this.IsSelectChangeFlowrate = true;
                        }
                        else if (ProfileData.ChartSettingsConfig.IsChangeFlowRateEnabled)
                            this.IsEnableChgflowrate = true;
                        else this.IsEnableChgflowrate = false;
                        this.IsStrikethroughadmin = Visibility.Visible;
                        this.IsEnableComplete = true;
                    }
                    else if (String.Compare(this.InfSlotStatus, SlotStatus.STOPPED) == 0 || String.Compare(this.InfSlotStatus, SlotStatus.COMPLETED) == 0) {
                        this.IsEnableResume = false;
                        this.IsEnableStop = false;
                        this.IsEnableComplete = false;
                        this.IsEnableChangebag = false;
                        this.IsEnableBegun = false;
                        this.IsEnableNotGiven = false;
                        this.IsEnableDefered = false;
                        this.IsEnablePause = false;
                        this.IsEnableChgflowrate = false;
                        this.IsStrikethroughadmin = Visibility.Visible;
                    }
                    if (String.Equals(this.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) && String.Equals(InfusionTypeCode, InfusionTypesCode.CONTINUOUS, StringComparison.InvariantCultureIgnoreCase)) {
                        this.IsEnableComplete = false;
                    }
                    break;
                case InfusionTypesCode.INTERMITTENT:
                    if ((String.Compare(this.InfSlotStatus, SlotStatus.NOTYETRECORDED) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.OVERDUE) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.DUENOW) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.PLANNED) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.NOTKNOWN) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.HOMELEAVE) == 0)) {
                        if (this.AmendmentAlert || this.DiscontinueAlert || String.Compare(this.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.InfSlotStatus, SlotStatus.NOTYETRECORDED) == 0) {
                            this.IsEnableDefered = false;
                        }
                        else {
                            this.IsEnableDefered = (String.Equals(this.InfSlotStatus, SlotStatus.OVERDUE) || String.Equals(this.InfSlotStatus, SlotStatus.DUENOW));
                            if (String.Equals(this.InfSlotStatus, SlotStatus.HOMELEAVE, StringComparison.InvariantCultureIgnoreCase) && !this.IsNextHomeLeaveSlotExists) {
                                this.IsEnableDefered = true;
                            }
                        }
                        this.IsEnableBegun = true;
                        this.IsEnableNotGiven = true;
                        this.IsEnablePause = false;
                        this.IsEnableResume = false;
                        this.IsEnableStop = false;
                        this.IsEnableComplete = false;
                        this.IsEnableChangebag = false;
                        this.IsEnableChgflowrate = false;
                        this.IsMandatoryInfusionrate = this.IsEnableInfusionrate;
                        this.IsDoseMandatory = true;
                        this.CondInfRate = Visibility.Collapsed;
                        this.IsStrikethroughadmin = Visibility.Collapsed;
                        this.IsVisibleDoseUOM = Visibility.Collapsed;
                        if (!String.IsNullOrEmpty(this.ItemSubType) && (String.Compare(this.ItemSubType, InfusionTypesCode.BLOOD_PRODUCT) == 0)) {
                            this.IsMandatoryExpiryDTTM = true;
                            this.IsMandatoryBatchNumber = true;
                        }
                        else {
                            this.IsMandatoryExpiryDTTM = false;
                            this.IsMandatoryBatchNumber = false;
                        }
                        if (String.Compare(this.DoseType, DoseTypeCode.CONDITIONAL) == 0 && this.IsConditionalExists) {
                            this.IsrdlDose = true;
                            this.IsEnableDose = true;
                            this.CondDose = Visibility.Visible;
                            this.IsVisibleDoseUOM = Visibility.Collapsed;
                        }
                        else {
                            this.IsrdlDose = false;
                            this.IsrdlInfusionrate = false;
                            this.CondDose = Visibility.Collapsed;
                            if (String.Compare(this.DoseType, DoseTypeCode.CONDITIONAL) == 0 && !this.IsConditionalExists) {
                                this.IsVisibleDoseUOM = Visibility.Visible;
                                this.IsEnableDose = true;
                            }
                        }
                        if (this.IsPRN) {
                            this.Isdoseadministered = false;
                        }
                        if ((String.Compare(this.IsCALaunchCode, CALaunch.OverviewChart.ToString()) == 0) || (String.Compare(this.IsCALaunchCode, CALaunch.InfusionChart.ToString()) == 0) && (this.IsPRN && this.InfusionRecordAdminTypeCode == InfusionRecordAdminTypeCodes.IsRetrospectivePRN) || (String.Compare(this.InfSlotStatus, SlotStatus.NOTYETRECORDED) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.NOTKNOWN) == 0)) {
                            this.IsRetrospective = true;
                            this.IsVisibleRestrostopcomplete = Visibility.Visible;
                            this.InfusionPastAction = MedicationAction.STOP;
                            this.IsEnableDefered = false;
                            this.Isdoseadministered = false;
                        }
                        else {
                            this.IsRetrospective = false;
                            this.IsVisibleRestrostopcomplete = Visibility.Collapsed;
                            this.IsEnableDefered = (this.AmendmentAlert || this.DiscontinueAlert || String.Equals(this.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase)) ? false : (String.Equals(this.InfSlotStatus, SlotStatus.OVERDUE) || String.Equals(this.InfSlotStatus, SlotStatus.DUENOW));
                            if (String.Equals(this.InfSlotStatus, SlotStatus.HOMELEAVE, StringComparison.InvariantCultureIgnoreCase) && !this.IsNextHomeLeaveSlotExists) {
                                this.IsEnableDefered = true;
                            }
                            this.Isdoseadministered = false;
                        }
                    }
                    else if (String.Compare(this.InfSlotStatus, SlotStatus.NOTGIVEN) == 0) {
                        this.IsEnableBegun = false;
                        this.IsEnableNotGiven = false;
                        this.IsEnableDefered = false;
                        this.IsEnablePause = false;
                        this.IsEnableResume = false;
                        this.IsEnableStop = false;
                        this.IsEnableComplete = false;
                        this.IsEnableChangebag = false;
                        this.IsEnableChgflowrate = false;
                        this.IsStrikethroughadmin = Visibility.Visible;
                        this.IsBagDetailsEnable = false;
                    }
                    else if ((String.Compare(this.InfSlotStatus, SlotStatus.DEFERADMIN) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.DEFEROVERDUE) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.DEFERDUENOW) == 0)) {
                        this.IsStrikethroughadmin = Visibility.Collapsed;
                        this.IsEnableBegun = true;
                        this.IsEnableNotGiven = true;
                        this.IsEnableDefered = false;
                        this.IsEnablePause = false;
                        this.IsEnableResume = false;
                        this.IsEnableStop = false;
                        this.IsEnableComplete = false;
                        this.IsEnableChangebag = false;
                        this.IsEnableChgflowrate = false;
                        this.IsBagDetailsEnable = false;
                        this.IsMandatoryInfusionrate = this.IsEnableInfusionrate;
                        this.IsDoseMandatory = true;
                        this.IsVisibleDoseUOM = Visibility.Collapsed;
                        if (!String.IsNullOrEmpty(this.ItemSubType) && (String.Compare(this.ItemSubType, InfusionTypesCode.BLOOD_PRODUCT) == 0)) {
                            this.IsMandatoryExpiryDTTM = true;
                            this.IsMandatoryBatchNumber = true;
                        }
                        if (String.Compare(this.DoseType, DoseTypeCode.CONDITIONAL) == 0 && this.IsConditionalExists) {
                            this.IsrdlDose = true;
                            this.IsEnableDose = true;
                            this.CondDose = Visibility.Visible;
                            this.IsVisibleDoseUOM = Visibility.Collapsed;
                        }
                        else {
                            this.IsrdlDose = false;
                            this.IsrdlInfusionrate = false;
                            this.CondDose = Visibility.Collapsed;
                            if (String.Compare(this.DoseType, DoseTypeCode.CONDITIONAL) == 0 && !this.IsConditionalExists) {
                                this.IsVisibleDoseUOM = Visibility.Visible;
                                this.IsEnableDose = true;
                            }
                        }
                    }
                    else if (String.Compare(this.InfSlotStatus, SlotStatus.INPROGRESS) == 0) {
                        if (this.AmendmentAlert || this.DiscontinueAlert || String.Compare(this.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase) == 0) {
                            this.IsEnableBegun = false;
                            this.IsEnableNotGiven = false;
                            this.IsEnableDefered = false;
                            this.IsEnablePause = false;
                            this.IsEnableResume = false;
                            this.IsEnableStop = true;
                            this.IsEnableComplete = true;
                            this.IsEnableChangebag = false;
                            this.IsEnableChgflowrate = false;
                        }
                        else {
                            this.IsEnableComplete = true;
                            if (this.ChangeFlowRateAlert || this.CondDoseMonitoringPeriodAlert || this.ChangeConcentrationAlert || this.ChangeRateAndConcentrationAlert) {
                                this.IsEnableChgflowrate = true;
                                this.IsSelectChangeFlowrate = true;
                            }
                            else if (ProfileData.ChartSettingsConfig.IsChangeFlowRateEnabled)
                                this.IsEnableChgflowrate = true;
                            else this.IsEnableChgflowrate = false;
                            this.IsEnablePause = true;
                            this.IsEnableStop = true;
                            this.IsEnableChangebag = true;
                            this.IsEnableBegun = false;
                            this.IsEnableNotGiven = false;
                            this.IsEnableDefered = false;
                            this.IsEnableResume = true;
                            this.IsDoseMandatory = true;
                            this.Isdoseadministered = false;
                            this.IsEnableDose = true;
                            if (String.Compare(this.InfusionAction, MedicationAction.BEGUN) == 0) {
                                this.IsStrikeThruEnable = false;
                                this.IsStrikeThruVisible = Visibility.Collapsed;
                            }
                            if (!String.IsNullOrEmpty(this.ItemSubType) && (String.Compare(this.ItemSubType, InfusionTypesCode.BLOOD_PRODUCT) == 0)) {
                                this.IsMandatoryExpiryDTTM = true;
                                this.IsMandatoryBatchNumber = true;
                            }
                            else {
                                this.IsMandatoryExpiryDTTM = false;
                                this.IsMandatoryBatchNumber = false;
                            }
                            if ((String.Compare(this.InfusionAction, MedicationAction.CHANGEFLOWRATE) == 0) && (String.Compare(this.DoseType, DoseTypeCode.CONDITIONAL) == 0) && this.IsConditionalExists) {
                                this.CondInfrateFR = Visibility.Visible;
                            }
                            else {
                                this.CondInfrateFR = Visibility.Collapsed;
                            }
                            if (String.Compare(this.DoseType, DoseTypeCode.CONDITIONAL) == 0) {
                                this.CondDose = Visibility.Visible;
                            }
                            else {
                                this.CondDose = Visibility.Collapsed;
                            }
                        }
                    }
                    else if (String.Compare(this.InfSlotStatus, SlotStatus.PAUSED) == 0) {
                        this.IsEnableResume = true;
                        this.IsEnableStop = true;
                        this.IsEnableChangebag = true;
                        this.IsEnableBegun = false;
                        this.IsEnableNotGiven = false;
                        this.IsEnableDefered = false;
                        this.IsEnablePause = false;
                        if (this.ChangeFlowRateAlert || this.CondDoseMonitoringPeriodAlert || this.ChangeConcentrationAlert || this.ChangeRateAndConcentrationAlert) {
                            this.IsEnableChgflowrate = true;
                            this.IsSelectChangeFlowrate = true;
                        }
                        else if (ProfileData.ChartSettingsConfig.IsChangeFlowRateEnabled)
                            this.IsEnableChgflowrate = true;
                        else this.IsEnableChgflowrate = false;
                        this.IsStrikethroughadmin = Visibility.Visible;
                        this.IsEnableComplete = true;
                    }
                    else if (String.Compare(this.InfSlotStatus, SlotStatus.STOPPED) == 0 || String.Compare(this.InfSlotStatus, SlotStatus.COMPLETED) == 0) {
                        this.IsEnableResume = false;
                        this.IsEnableStop = false;
                        this.IsEnableComplete = false;
                        this.IsEnableChangebag = false;
                        this.IsEnableBegun = false;
                        this.IsEnableNotGiven = false;
                        this.IsEnableDefered = false;
                        this.IsEnablePause = false;
                        this.IsEnableChgflowrate = false;
                        this.IsStrikethroughadmin = Visibility.Visible;
                    }
                    break;
                case InfusionTypesCode.PCA:
                    this.DoseLblShow = Visibility.Collapsed;
                    if ((String.Compare(this.InfSlotStatus, SlotStatus.NOTYETRECORDED) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.OVERDUE) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.DUENOW) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.PLANNED) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.NOTKNOWN) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.HOMELEAVE) == 0)) {
                        if (this.AmendmentAlert) {
                            this.IsEnableDefered = false;
                        }
                        else {
                            this.IsEnableDefered = (this.AmendmentAlert || this.DiscontinueAlert || String.Equals(this.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase)) ? false : (String.Equals(this.InfSlotStatus, SlotStatus.OVERDUE) || String.Equals(this.InfSlotStatus, SlotStatus.DUENOW));
                            if (String.Equals(this.InfSlotStatus, SlotStatus.HOMELEAVE, StringComparison.InvariantCultureIgnoreCase) && !this.IsNextHomeLeaveSlotExists) {
                                this.IsEnableDefered = true;
                            }
                            this.IsStrikethroughadmin = Visibility.Collapsed;
                        }
                        if ((String.Compare(this.IsCALaunchCode, CALaunch.OverviewChart.ToString()) == 0) && (String.Compare(this.InfSlotStatus, SlotStatus.NOTYETRECORDED) == 0 || String.Compare(this.InfSlotStatus, SlotStatus.NOTKNOWN) == 0)) {
                            this.IsRetrospective = true;
                            this.IsVisibleRestrostopcomplete = Visibility.Visible;
                            this.InfusionPastAction = MedicationAction.STOP;
                            this.IsEnableDefered = false;
                        }
                        else {
                            this.IsRetrospective = false;
                            this.IsVisibleRestrostopcomplete = Visibility.Collapsed;
                            this.IsEnableDefered = (this.AmendmentAlert || this.DiscontinueAlert || String.Equals(this.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase)) ? false : (String.Equals(this.InfSlotStatus, SlotStatus.OVERDUE) || String.Equals(this.InfSlotStatus, SlotStatus.DUENOW));
                        }
                        this.IsEnableBegun = true;
                        this.IsEnableNotGiven = true;
                        this.IsEnablePause = false;
                        this.IsEnableResume = false;
                        this.IsEnableStop = false;
                        this.IsEnableComplete = false;
                        this.IsEnableChangebag = false;
                        this.IsDoseMandatory = true;
                        if (((String.Compare(this.IsCALaunchCode, CALaunch.OverviewChart.ToString()) == 0 && (String.Compare(this.InfSlotStatus, SlotStatus.NOTYETRECORDED) == 0 || String.Compare(this.InfSlotStatus, SlotStatus.NOTKNOWN) == 0)) || (String.Equals(this.IsCALaunchCode, CALaunch.InfusionChart.ToString(), StringComparison.CurrentCultureIgnoreCase)) && String.Compare(this.InfSlotStatus, SlotStatus.NOTKNOWN) == 0 && String.Equals(this.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase))) {
                            this.IsRetrospective = true;
                            this.IsEnableDefered = false;
                            this.IsVisibleRestrostopcomplete = Visibility.Visible;
                            this.InfusionPastAction = MedicationAction.STOP;
                        }
                        else {
                            this.IsRetrospective = false;
                            this.IsEnableDefered = (this.AmendmentAlert || this.DiscontinueAlert || String.Equals(this.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase)) ? false : (String.Equals(this.InfSlotStatus, SlotStatus.OVERDUE) || String.Equals(this.InfSlotStatus, SlotStatus.DUENOW));
                            if (String.Equals(this.InfSlotStatus, SlotStatus.HOMELEAVE, StringComparison.InvariantCultureIgnoreCase) && !this.IsNextHomeLeaveSlotExists) {
                                this.IsEnableDefered = true;
                            }
                            this.IsVisibleRestrostopcomplete = Visibility.Collapsed;
                        }
                    }
                    else if (String.Compare(this.InfSlotStatus, SlotStatus.NOTGIVEN) == 0) {
                        this.IsEnableBegun = false;
                        this.IsEnableNotGiven = false;
                        this.IsEnableDefered = false;
                        this.IsEnablePause = false;
                        this.IsEnableResume = false;
                        this.IsEnableStop = false;
                        this.IsEnableComplete = false;
                        this.IsEnableChangebag = false;
                        this.IsEnableChgflowrate = false;
                        this.IsStrikethroughadmin = Visibility.Visible;
                        this.IsBagDetailsEnable = false;
                    }
                    else if ((String.Compare(this.InfSlotStatus, SlotStatus.DEFERADMIN) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.DEFEROVERDUE) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.DEFERDUENOW) == 0)) {
                        this.IsStrikethroughadmin = Visibility.Collapsed;
                        this.IsEnableBegun = true;
                        this.IsEnableNotGiven = true;
                        this.IsEnableDefered = false;
                        this.IsEnablePause = false;
                        this.IsEnableResume = false;
                        this.IsEnableStop = false;
                        this.IsEnableComplete = false;
                        this.IsEnableChangebag = false;
                        this.IsEnableChgflowrate = false;
                        this.IsBagDetailsEnable = false;
                        this.IsDoseMandatory = true;
                    }
                    else if (String.Compare(this.InfSlotStatus, SlotStatus.INPROGRESS) == 0) {
                        if (this.AmendmentAlert || this.DiscontinueAlert || String.Equals(this.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase)) {
                            this.IsEnableBegun = false;
                            this.IsEnableNotGiven = false;
                            this.IsEnableDefered = false;
                            this.IsEnablePause = false;
                            this.IsEnableResume = false;
                            this.IsEnableStop = true;
                            this.IsEnableComplete = true;
                            this.IsEnableChangebag = false;
                            this.IsEnableChgflowrate = false;
                        }
                        else {
                            this.IsEnablePause = true;
                            this.IsEnableStop = true;
                            this.IsEnableChangebag = true;
                            this.IsEnableBegun = false;
                            this.IsEnableNotGiven = false;
                            this.IsEnableDefered = false;
                            this.IsEnableResume = true;
                            this.IsDoseMandatory = true;
                            this.IsEnableComplete = true;
                            if (this.ChangeFlowRateAlert || this.CondDoseMonitoringPeriodAlert || this.ChangeConcentrationAlert || this.ChangeRateAndConcentrationAlert) {
                                this.IsEnableChgflowrate = true;
                                this.IsSelectChangeFlowrate = true;
                            }
                            else if (ProfileData.ChartSettingsConfig.IsChangeFlowRateEnabled)
                                this.IsEnableChgflowrate = true;
                            else this.IsEnableChgflowrate = false;
                            if (String.Compare(this.InfusionAction, MedicationAction.BEGUN) == 0) {
                                this.IsStrikeThruEnable = false;
                                this.IsStrikeThruVisible = Visibility.Collapsed;
                            }
                            if ((String.Compare(this.InfusionAction, MedicationAction.CHANGEFLOWRATE) == 0) && (String.Compare(this.DoseType, DoseTypeCode.CONDITIONAL) == 0)) {
                                this.CondInfrateFR = Visibility.Visible;
                            }
                            else {
                                this.CondInfrateFR = Visibility.Collapsed;
                            }
                        }
                    }
                    else if (String.Compare(this.InfSlotStatus, SlotStatus.PAUSED) == 0) {
                        this.IsEnableResume = true;
                        this.IsEnableStop = true;
                        this.IsEnableChangebag = true;
                        this.IsEnableBegun = false;
                        this.IsEnableNotGiven = false;
                        this.IsEnableDefered = false;
                        this.IsEnablePause = false;
                        this.IsStrikethroughadmin = Visibility.Visible;
                        this.IsEnableComplete = true;
                        if (this.ChangeFlowRateAlert || this.CondDoseMonitoringPeriodAlert || this.ChangeConcentrationAlert || this.ChangeRateAndConcentrationAlert) {
                            this.IsEnableChgflowrate = true;
                            this.IsSelectChangeFlowrate = true;
                        }
                        else if (ProfileData.ChartSettingsConfig.IsChangeFlowRateEnabled)
                            this.IsEnableChgflowrate = true;
                        else this.IsEnableChgflowrate = false;
                    }
                    else if (String.Compare(this.InfSlotStatus, SlotStatus.STOPPED) == 0 || String.Compare(this.InfSlotStatus, SlotStatus.COMPLETED) == 0) {
                        this.IsEnableResume = false;
                        this.IsEnableComplete = false;
                        this.IsEnableStop = false;
                        this.IsEnableChangebag = false;
                        this.IsEnableBegun = false;
                        this.IsEnableNotGiven = false;
                        this.IsEnableDefered = false;
                        this.IsEnablePause = false;
                        this.IsEnableChgflowrate = false;
                        this.IsStrikethroughadmin = Visibility.Visible;
                    }
                    break;
                case InfusionTypesCode.SUBTYPE_GAS:
                    this.DoseLblShow = Visibility.Collapsed;
                    this.IsBagDetailsVisible = Visibility.Collapsed;
                    if ((String.Compare(this.InfSlotStatus, SlotStatus.NOTYETRECORDED) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.OVERDUE) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.DUENOW) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.PLANNED) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.NOTKNOWN) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.HOMELEAVE) == 0)) {
                        if (this.AmendmentAlert || this.DiscontinueAlert || String.Compare(this.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase) == 0) {
                            this.IsEnableDefered = false;
                        }
                        else {
                            this.IsEnableDefered = (String.Equals(this.InfSlotStatus, SlotStatus.OVERDUE) || String.Equals(this.InfSlotStatus, SlotStatus.DUENOW));
                            if (String.Equals(this.InfSlotStatus, SlotStatus.HOMELEAVE, StringComparison.InvariantCultureIgnoreCase) && !this.IsNextHomeLeaveSlotExists) {
                                this.IsEnableDefered = true;
                            }
                        }
                        this.IsEnableBegun = true;
                        this.IsEnableNotGiven = true;
                        this.IsEnableComplete = false;
                        this.IsEnableChgflowrate = false;
                        this.IsMandatoryInfusionrate = true;
                        this.IsVisibleChangebag = Visibility.Collapsed;
                        this.IsStrikethroughadmin = Visibility.Collapsed;
                        if ((String.Equals(this.IsCALaunchCode, CALaunch.OverviewChart.ToString()) && (String.Equals(this.InfSlotStatus, SlotStatus.NOTYETRECORDED, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.InfSlotStatus, SlotStatus.NOTKNOWN, StringComparison.InvariantCultureIgnoreCase))) || (String.Equals(this.IsCALaunchCode, CALaunch.InfusionChart.ToString()) && String.Equals(this.InfSlotStatus, SlotStatus.NOTKNOWN, StringComparison.InvariantCultureIgnoreCase)) || (this.IsPRN && this.InfusionRecordAdminTypeCode == InfusionRecordAdminTypeCodes.IsRetrospectivePRN)) {
                            this.IsRetrospective = true;
                            this.IsVisibleRestrostopcomplete = Visibility.Visible;
                            this.InfusionPastAction = MedicationAction.STOP;
                            this.IsEnableDefered = false;
                            this.IsEnableNotGiven = false;
                        }
                        else {
                            this.IsRetrospective = false;
                            this.IsVisibleRestrospectivegas = Visibility.Collapsed;
                            this.IsVisibleRestrostopcomplete = Visibility.Collapsed;
                            this.IsEnableDefered = (this.AmendmentAlert || this.DiscontinueAlert || String.Equals(this.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase)) ? false : (String.Equals(this.InfSlotStatus, SlotStatus.OVERDUE) || String.Equals(this.InfSlotStatus, SlotStatus.DUENOW));
                        }
                        if (this.IsPRN) {
                            this.IsEnableDefered = false;
                            this.IsEnableNotGiven = false;
                        }
                        else {
                            this.IsEnableNotGiven = true;
                        }
                        if (String.Equals(this.InfSlotStatus, SlotStatus.HOMELEAVE, StringComparison.InvariantCultureIgnoreCase) && !this.IsNextHomeLeaveSlotExists) {
                            this.IsEnableDefered = true;
                        }
                    }
                    else if (String.Compare(this.InfSlotStatus, SlotStatus.NOTGIVEN) == 0) {
                        this.IsEnableBegun = false;
                        this.IsEnableNotGiven = false;
                        this.IsEnableDefered = false;
                        this.IsEnableComplete = false;
                        this.IsEnableChgflowrate = false;
                        this.IsStrikethroughadmin = Visibility.Visible;
                        this.IsBagDetailsEnable = false;
                    }
                    else if ((String.Compare(this.InfSlotStatus, SlotStatus.DEFERADMIN) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.DEFEROVERDUE) == 0) || (String.Compare(this.InfSlotStatus, SlotStatus.DEFERDUENOW) == 0)) {
                        this.IsStrikethroughadmin = Visibility.Collapsed;
                        this.IsEnableBegun = true;
                        this.IsEnableNotGiven = true;
                        this.IsEnableDefered = false;
                        this.IsEnableComplete = false;
                        this.IsEnableChgflowrate = false;
                        this.IsBagDetailsEnable = false;
                    }
                    else if (String.Compare(this.InfSlotStatus, SlotStatus.INPROGRESS) == 0) {
                        if (this.AmendmentAlert || this.DiscontinueAlert || String.Compare(this.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase) == 0) {
                            this.IsEnableBegun = false;
                            this.IsEnableNotGiven = false;
                            this.IsEnableDefered = false;
                            this.IsEnableComplete = true;
                            this.IsEnableChgflowrate = false;
                            this.IsEnableStop = true;
                        }
                        else {
                            this.IsEnableComplete = true;
                            if (this.ChangeFlowRateAlert || this.ChangeRateAndConcentrationAlert || this.ChangeConcentrationAlert) {
                                this.IsSelectChangeFlowrate = true;
                                this.IsEnableChgflowrate = true;
                                this.CondInfrateFR = Visibility.Collapsed;
                                this.IsInfDripnrateCal = Visibility.Collapsed;
                            }
                            else if (ProfileData.ChartSettingsConfig.IsChangeFlowRateEnabled) {
                                this.CondInfrateFR = Visibility.Collapsed;
                                this.IsInfDripnrateCal = Visibility.Collapsed;
                                this.IsEnableChgflowrate = true;
                            }
                            else this.IsEnableChgflowrate = false;
                            this.IsEnableBegun = false;
                            this.IsEnableNotGiven = false;
                            this.IsEnableDefered = false;
                            this.IsEnablePause = true;
                            this.IsEnableResume = true;
                            this.IsEnableStop = true;
                            if (String.Compare(this.InfusionAction, MedicationAction.BEGUN) == 0) {
                                this.IsStrikeThruEnable = false;
                                this.IsStrikeThruVisible = Visibility.Collapsed;
                            }
                        }
                    }
                    else if (String.Compare(this.InfSlotStatus, SlotStatus.PAUSED) == 0) {
                        this.IsEnableResume = true;
                        this.IsEnableStop = true;
                        this.IsEnableComplete = true;
                        this.IsEnableBegun = false;
                        this.IsEnableNotGiven = false;
                        this.IsEnableDefered = false;
                        this.IsEnablePause = false;
                        if (this.ChangeFlowRateAlert || this.ChangeRateAndConcentrationAlert || this.ChangeConcentrationAlert) {
                            this.IsSelectChangeFlowrate = true;
                            this.IsEnableChgflowrate = true;
                            this.CondInfrateFR = Visibility.Collapsed;
                            this.IsInfDripnrateCal = Visibility.Collapsed;
                        }
                        else if (ProfileData.ChartSettingsConfig.IsChangeFlowRateEnabled) {
                            this.CondInfrateFR = Visibility.Collapsed;
                            this.IsInfDripnrateCal = Visibility.Collapsed;
                            this.IsEnableChgflowrate = true;
                        }
                        else this.IsEnableChgflowrate = false;
                        this.IsStrikethroughadmin = Visibility.Visible;
                    }
                    else if (String.Compare(this.InfSlotStatus, SlotStatus.COMPLETED) == 0) {
                        this.IsEnableBegun = false;
                        this.IsEnableNotGiven = false;
                        this.IsEnableDefered = false;
                        this.IsEnableChgflowrate = false;
                        this.IsEnableComplete = false;
                        this.IsStrikethroughadmin = Visibility.Visible;
                    }
                    break;
                case InfusionTypesCode.BLOOD_PRODUCT:
                    break;
            }
        }
    }
    // private oBtnDriprateClick: RelayCommand;
    // public get BtnDriprateClick(): RelayCommand {
    //     if (this.oBtnDriprateClick == null) {
    //         this.oBtnDriprateClick = new RelayCommand(this.LaunchDriprateCalculator, this.CanClickDripRateCalc);
    //     }
    //     return this.oBtnDriprateClick;
    // }

    private oBtnDriprateClick: RelayCommand;
    public get BtnDriprateClick(): RelayCommand {
        if (this.oBtnDriprateClick == null) {
            let DriprateCalculatorLauncher = () => { this.LaunchDriprateCalculator(); };
            let ClickDripRateCalc = () => { this.CanClickDripRateCalc(); };
            this.oBtnDriprateClick = new RelayCommand(DriprateCalculatorLauncher, ClickDripRateCalc);
        }
        return this.oBtnDriprateClick;
    }

    private CanClickDripRateCalc(): boolean {
        return this.IsEnableDripCal;
    }
    private DefDripCalc_InfRateInDose: string = null;
    DefDripCalc_InfRateInDoseUOM: string = null;
    DefDripCalc_InfVolume: string = null
    DefDripCalc_InfVolumeUOM: string = null;
    private DefDripCalc_InfRateInDoseUOMOID: number = null;
    DefDripCalc_InfRateInDosePerUOMOID: number = null;
    private DefDripCalc_DropFactor: number = null;
    private DefDripCalc_InfStrength: number = null;
    DefDripCalc_InfConcentration: number = null;
    private DefDripCalc_InfStrengthUOM: CListItem = null;
    DefDripCalc_InfConcentrationUOM: CListItem = null;
    DefDripCalc_InfConcentrationPerUOM: CListItem;
    private SetDripRateCalculatorDefaults(oDripCalVM: DripRateCalcVM): void {
        if ((oDripCalVM == null) && (String.IsNullOrEmpty(this.InfusionRate)) && (String.Compare(this.InfusionAction, MedicationAction.BEGUN) == 0)) {
            if (!String.IsNullOrEmpty(this.InfusionDose))
                this.DefDripCalc_InfRateInDose = this.InfusionDose;
            if (!String.IsNullOrEmpty(this.InfusionDoseUOM))
                this.DefDripCalc_InfRateInDoseUOM = this.InfusionDoseUOM;
            if (this.InfusionDoseNumeratorUOMID > 0)
                this.DefDripCalc_InfRateInDoseUOMOID = this.InfusionDoseNumeratorUOMID;
            if (this.InfusionDoseDenominatorUOMID > 0)
                this.DefDripCalc_InfRateInDosePerUOMOID = this.InfusionDoseDenominatorUOMID;
            if (!String.IsNullOrEmpty(this.ConcentrationStrength) && this.ConcentrationStrengthUOM != null && !String.IsNullOrEmpty(this.ConcentrationStrengthUOM.Value) && !String.IsNullOrEmpty(this.ConcentrationVolume) && this.ConcentrationVolumeUOM != null && !String.IsNullOrEmpty(this.ConcentrationVolumeUOM.Value)) {
                if (!String.IsNullOrEmpty(this.ConcentrationVolume))
                    this.DefDripCalc_InfVolume = this.ConcentrationVolume;
                if (this.ConcentrationVolumeUOM != null && !String.IsNullOrEmpty(this.ConcentrationVolumeUOM.Value))
                    this.DefDripCalc_InfVolumeUOM = this.ConcentrationVolumeUOM.DisplayText;
                if (!String.IsNullOrEmpty(this.ConcentrationStrength))
                    this.DefDripCalc_InfStrength = Convert.ToDouble(this.ConcentrationStrength);
                if (this.ConcentrationStrengthUOM != null && !String.IsNullOrEmpty(this.ConcentrationStrengthUOM.Value)) {
                    this.DefDripCalc_InfStrengthUOM = ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: this.ConcentrationStrengthUOM.DisplayText,
                        Value: this.ConcentrationStrengthUOM.Value
                    });
                }
            }
        }
        else if (oDripCalVM != null) {
            this.DefDripCalc_InfRateInDose = (oDripCalVM.InfRateInDose != null) ? oDripCalVM.InfRateInDose.ToString() : null;
            this.DefDripCalc_InfRateInDoseUOM = (oDripCalVM.InfRateInDoseUOM != null && oDripCalVM.InfRateInDosePerUOM != null) ? oDripCalVM.InfRateInDoseUOM.DisplayText + "/" + oDripCalVM.InfRateInDosePerUOM.DisplayText : null;
            this.DefDripCalc_InfRateInDoseUOMOID = (oDripCalVM.InfRateInDoseUOM != null && !String.IsNullOrEmpty(oDripCalVM.InfRateInDoseUOM.Value)) ? Convert.ToInt64(oDripCalVM.InfRateInDoseUOM.Value) : 0;
            this.DefDripCalc_InfRateInDosePerUOMOID = (oDripCalVM.InfRateInDosePerUOM != null && !String.IsNullOrEmpty(oDripCalVM.InfRateInDosePerUOM.Value)) ? Convert.ToInt64(oDripCalVM.InfRateInDosePerUOM.Value) : 0;
            this.DefDripCalc_InfVolume = (oDripCalVM.InfVolume != null) ? oDripCalVM.InfVolume.ToString() : null;
            this.DefDripCalc_InfVolumeUOM = (oDripCalVM.InfVolumeUOM != null && !String.IsNullOrEmpty(oDripCalVM.InfVolumeUOM.DisplayText)) ? oDripCalVM.InfVolumeUOM.DisplayText : null;
            if (oDripCalVM.InfStrength != null && oDripCalVM.InfStrengthUOM != null && oDripCalVM.InfConcentration != null && oDripCalVM.InfConcentrationUOM != null && oDripCalVM.InfConcentrationPerUOM != null) {
                this.DefDripCalc_InfStrength = (oDripCalVM.InfStrength != null) ? oDripCalVM.InfStrength : null;
                this.DefDripCalc_InfStrengthUOM = (oDripCalVM.InfStrengthUOM != null) ? oDripCalVM.InfStrengthUOM : null;
                this.DefDripCalc_InfConcentration = (oDripCalVM.InfConcentration != null) ? oDripCalVM.InfConcentration : null;
                this.DefDripCalc_InfConcentrationUOM = (oDripCalVM.InfConcentrationUOM != null) ? oDripCalVM.InfConcentrationUOM : null;
                this.DefDripCalc_InfConcentrationPerUOM = (oDripCalVM.InfConcentrationPerUOM != null) ? oDripCalVM.InfConcentrationPerUOM : null;
            }

            if(Number.isInteger(oDripCalVM.DropFactor)){
            this.val = oDripCalVM.DropFactor;
            }
            this.DefDripCalc_DropFactor = (this.val != null) ? this.val : null;
        }
        else if (!String.Equals(this.DefDripCalc_InfRateInDose, this.InfusionDose)) {
            this.DefDripCalc_InfRateInDose = this.InfusionDose;
            if (!String.IsNullOrEmpty(this.InfusionDoseUOM))
                this.DefDripCalc_InfRateInDoseUOM = this.InfusionDoseUOM;
            if (this.InfusionDoseNumeratorUOMID > 0)
                this.DefDripCalc_InfRateInDoseUOMOID = this.InfusionDoseNumeratorUOMID;
            if (this.InfusionDoseDenominatorUOMID > 0)
                this.DefDripCalc_InfRateInDosePerUOMOID = this.InfusionDoseDenominatorUOMID;
        }
    }
    public LaunchDriprateCalculator(): void {
        let oCommonBB: DripRateCommon = new DripRateCommon();
        let dInfRate: number = 0;
        let dVolume: number = 0;
        let dDose: number = 0;
        let sVolumeUOM: string = String.Empty;
        let liInfRateUOM: CListItem = new CListItem();
        let liInfRatePerUOM: CListItem = new CListItem();
        let liInfDoseUOM: CListItem = new CListItem();
        let sHeader: string = String.Empty;
        sHeader = this.DrugName;
        this.SetDripInfRateValues();
        if (!String.IsNullOrEmpty(this.FluidName))
            sHeader = sHeader + " " + String.Format(Resource.InfusionChart.InFluid_text, this.FluidName);
        this.SetDripRateCalculatorDefaults(null);
        if ((String.Compare(this.InfusionAction, MedicationAction.BEGUN) == 0) && (!this.IsInfRateVolBased)) {
            dInfRate = !String.IsNullOrEmpty(this.DefDripCalc_InfRateInDose) ? parseFloat(this.DefDripCalc_InfRateInDose) : 0;
            dVolume = Convert.ToDouble(this.DefDripCalc_InfVolume);
            sVolumeUOM = this.DefDripCalc_InfVolumeUOM;
            dDose = (this.DefDripCalc_InfStrength != null) ? Convert.ToDouble(this.DefDripCalc_InfStrength) : 0;
            if (this.DefDripCalc_InfRateInDoseUOM != null) {
                let arrInfRateUOM: string[] = this.DefDripCalc_InfRateInDoseUOM.Split('/');
                if (arrInfRateUOM.Count() == 2 && this.DefDripCalc_InfRateInDoseUOMOID > 0 && this.DefDripCalc_InfRateInDosePerUOMOID > 0) {
                    liInfRateUOM = ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: arrInfRateUOM[0],
                        Value: this.DefDripCalc_InfRateInDoseUOMOID.ToString()
                    });
                    liInfRatePerUOM = ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: arrInfRateUOM[1],
                        Value: this.DefDripCalc_InfRateInDosePerUOMOID.ToString()
                    });
                }
                else if (arrInfRateUOM.Count() == 3 && this.DefDripCalc_InfRateInDoseUOMOID > 0 && this.DefDripCalc_InfRateInDosePerUOMOID > 0) {
                    liInfRateUOM = ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: arrInfRateUOM[0] + "/" + arrInfRateUOM[1],
                        Value: this.DefDripCalc_InfRateInDoseUOMOID.ToString()
                    });
                    liInfRatePerUOM = ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: arrInfRateUOM[2],
                        Value: this.DefDripCalc_InfRateInDosePerUOMOID.ToString()
                    });
                }
            }
            else {
                let dInfPeriod: number = 0.0;
                if (dDose > 0 && this.DoseUOMName != null && this.DoseUOMOID > 0 && !String.IsNullOrEmpty(this.InfusionPeriod) && this.InfusionPeriodUomOID > 0) {
                    dInfPeriod = Convert.ToDouble(this.InfusionPeriod);
                    dInfRate = Math.Round(dDose / dInfPeriod, 2);
                    liInfRateUOM = ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: this.DoseUOMName,
                        Value: this.DoseUOMOID.ToString()
                    });
                    liInfRatePerUOM = ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: this.InfusionPeriodUOM,
                        Value: this.InfusionPeriodUomOID.ToString()
                    });
                }
                else if (!String.IsNullOrEmpty(this.LowerDose) && this.DoseUOMName != null && this.DoseUOMOID > 0 && !String.IsNullOrEmpty(this.InfusionPeriod) && this.InfusionPeriodUomOID > 0) {
                    let dLowerlDose: number = 0;
                    dLowerlDose = Convert.ToDouble(this.LowerDose);
                    dInfPeriod = Convert.ToDouble(this.InfusionPeriod);
                    dInfRate = Math.Round(dLowerlDose / dInfPeriod, 2);
                    liInfRateUOM = ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: this.DoseUOMName,
                        Value: this.DoseUOMOID.ToString()
                    });
                    liInfRatePerUOM = ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: this.InfusionPeriodUOM,
                        Value: this.InfusionPeriodUomOID.ToString()
                    });
                }
            }
            liInfDoseUOM = this.DefDripCalc_InfStrengthUOM;
            oCommonBB.DefaultDropFactor = (this.DefDripCalc_DropFactor != null) ? Convert.ToInt32(this.DefDripCalc_DropFactor) : 0;
            oCommonBB.DefaultInfConcentration = (this.DefDripCalc_InfConcentration != null) ? Convert.ToDouble(this.DefDripCalc_InfConcentration) : 0;
            oCommonBB.DefaultInfConcentrationUOM = (this.DefDripCalc_InfConcentrationUOM != null) ? this.DefDripCalc_InfConcentrationUOM : null;
            oCommonBB.DefaultInfConcentrationPerUOM = (this.DefDripCalc_InfConcentrationPerUOM != null) ? this.DefDripCalc_InfConcentrationPerUOM : null;
            if (!String.IsNullOrEmpty(this.InfusionRate)) {
                oCommonBB.DefaultInfRateInVol = !String.IsNullOrEmpty(this.DripInfusionRate) ? Convert.ToDouble(this.DripInfusionRate) : 0;
                oCommonBB.DefaultDripRate = this.DripRate;
                if (this.DripInfusionRateUom != null) {
                    let arrInfRateUOM: string[] = this.DripInfusionRateUom.Split('/');
                    if (arrInfRateUOM.Count() == 2 && this.DripInfRateUomOID > 0 && this.DripInfRatePerUomOID > 0) {
                        oCommonBB.DefaultInfRateInVolUOM = ObjectHelper.CreateObject(new CListItem(), {
                            DisplayText: arrInfRateUOM[0],
                            Value: this.DripInfRateUomOID.ToString()
                        });
                        oCommonBB.DefaultInfRateInVolPerUOM = ObjectHelper.CreateObject(new CListItem(), {
                            DisplayText: arrInfRateUOM[1],
                            Value: this.DripInfRatePerUomOID.ToString()
                        });
                    }
                    else if (arrInfRateUOM.Count() == 3 && this.DripInfRateUomOID > 0 && this.DripInfRatePerUomOID > 0) {
                        oCommonBB.DefaultInfRateInVolUOM = ObjectHelper.CreateObject(new CListItem(), {
                            DisplayText: arrInfRateUOM[0] + "/" + arrInfRateUOM[1],
                            Value: this.DripInfRateUomOID.ToString()
                        });
                        oCommonBB.DefaultInfRateInVolPerUOM = ObjectHelper.CreateObject(new CListItem(), {
                            DisplayText: arrInfRateUOM[2],
                            Value: this.DripInfRatePerUomOID.ToString()
                        });
                    }
                }
            }
            oCommonBB.IsMedicationActionBegun = true;
        }
        else {
            if (String.Equals(this.InfusionAction, MedicationAction.CHANGEFLOWRATE) && !this.bDriprateCalcLaunchedOnce && this.EnableInfusionDose) {
                dInfRate = !String.IsNullOrEmpty(this.DefDripCalc_InfRateInDose) ? parseFloat(this.DefDripCalc_InfRateInDose) : 0;
            }
            else {
                dInfRate = !String.IsNullOrEmpty(this.DripInfusionRate) ? parseFloat(this.DripInfusionRate) : 0;
            }
            if (!String.IsNullOrEmpty(this.ConcentrationVolume))
                dVolume = Convert.ToDouble(this.ConcentrationVolume);
            if (this.ConcentrationVolumeUOM != null && !String.IsNullOrEmpty(this.ConcentrationVolumeUOM.Value))
                sVolumeUOM = this.ConcentrationVolumeUOM.DisplayText;
            if (!String.IsNullOrEmpty(this.ConcentrationStrength))
                dDose = Convert.ToDouble(this.ConcentrationStrength);
            if (this.ConcentrationStrengthUOM != null && !String.IsNullOrEmpty(this.ConcentrationStrengthUOM.Value)) {
                this.DefDripCalc_InfStrengthUOM = ObjectHelper.CreateObject(new CListItem(), {
                    DisplayText: this.ConcentrationStrengthUOM.DisplayText,
                    Value: this.ConcentrationStrengthUOM.Value
                });
            }
            if (this.DripInfusionRateUom != null) {
                let arrInfRateUOM: string[] = this.DripInfusionRateUom.Split('/');
                if (arrInfRateUOM.Count() == 2 && this.DripInfRateUomOID > 0 && this.DripInfRatePerUomOID > 0) {
                    liInfRateUOM = ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: arrInfRateUOM[0],
                        Value: this.DripInfRateUomOID.ToString()
                    });
                    liInfRatePerUOM = ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: arrInfRateUOM[1],
                        Value: this.DripInfRatePerUomOID.ToString()
                    });
                }
                else if (arrInfRateUOM.Count() == 3 && this.DripInfRateUomOID > 0 && this.DripInfRatePerUomOID > 0) {
                    liInfRateUOM = ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: arrInfRateUOM[0] + "/" + arrInfRateUOM[1],
                        Value: this.DripInfRateUomOID.ToString()
                    });
                    liInfRatePerUOM = ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: arrInfRateUOM[2],
                        Value: this.DripInfRatePerUomOID.ToString()
                    });
                }
            }
            else if (this.DripInfusionRateUom == null) {
                let dInfPeriod: number = 0.0;
                if (dDose > 0 && this.DoseUOMName != null && this.DoseUOMOID > 0 && !String.IsNullOrEmpty(this.InfusionPeriod) && this.InfusionPeriodUomOID > 0) {
                    dInfPeriod = Convert.ToDouble(this.InfusionPeriod);
                    dInfRate = Math.Round(dDose / dInfPeriod, 2);
                    liInfRateUOM = ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: this.DoseUOMName,
                        Value: this.DoseUOMOID.ToString()
                    });
                    liInfRatePerUOM = ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: this.InfusionPeriodUOM,
                        Value: this.InfusionPeriodUomOID.ToString()
                    });
                }
                else if (!String.IsNullOrEmpty(this.LowerDose) && this.DoseUOMName != null && this.DoseUOMOID > 0 && !String.IsNullOrEmpty(this.InfusionPeriod) && this.InfusionPeriodUomOID > 0) {
                    let dLowerlDose: number = 0;
                    dLowerlDose = Convert.ToDouble(this.LowerDose);
                    dInfPeriod = Convert.ToDouble(this.InfusionPeriod);
                    dInfRate = Math.Round(dLowerlDose / dInfPeriod, 2);
                    liInfRateUOM = ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: this.DoseUOMName,
                        Value: this.DoseUOMOID.ToString()
                    });
                    liInfRatePerUOM = ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: this.InfusionPeriodUOM,
                        Value: this.InfusionPeriodUomOID.ToString()
                    });
                }
            }
            if (this.ConcentrationStrengthUOM != null && !String.IsNullOrEmpty(this.ConcentrationStrengthUOM.Value)) {
                liInfDoseUOM = ObjectHelper.CreateObject(new CListItem(), {
                    DisplayText: this.ConcentrationStrengthUOM.DisplayText,
                    Value: this.ConcentrationStrengthUOM.Value
                });
            }
            oCommonBB.DefaultDropFactor = (this.DefDripCalc_DropFactor != null) ? Convert.ToInt32(this.DefDripCalc_DropFactor) : 0;
            oCommonBB.DefaultDripRate = this.DripRate;
        }
        oCommonBB.oDripRateParams = new DripRateParams();
        oCommonBB.oDripRateParams.sDrugname = sHeader;
        oCommonBB.oDripRateParams.PrescInfRate = dInfRate;
        oCommonBB.oDripRateParams.PrescInfRateUOM = liInfRateUOM;
        oCommonBB.oDripRateParams.PrescInfRatePerUOM = liInfRatePerUOM;
        if (!String.IsNullOrEmpty(this.ConcentrationStrength) && this.ConcentrationStrengthUOM != null && !String.IsNullOrEmpty(this.ConcentrationStrengthUOM.Value) && !String.IsNullOrEmpty(this.ConcentrationVolume) && this.ConcentrationVolumeUOM != null && !String.IsNullOrEmpty(this.ConcentrationVolumeUOM.Value)) {
            oCommonBB.oDripRateParams.PrescVolume = Convert.ToDouble(this.ConcentrationVolume);
            oCommonBB.oDripRateParams.PrescVolumeUOM = this.ConcentrationVolumeUOM.DisplayText;
            oCommonBB.oDripRateParams.Dose = String.IsNullOrEmpty(this.ConcentrationStrength) ? 0 : Number.Parse(this.ConcentrationStrength);
            oCommonBB.oDripRateParams.PrescDoseUOM = this.ConcentrationStrengthUOM;
        }
        oCommonBB.oDripRateParams.IdentifyingOID = this.IdentifyingOID;
        oCommonBB.oDripRateParams.IdentifyingType = this.IdentifyingType;
        oCommonBB.oDripRateParams.PrscItemOID = this.PrescriptionItemOID;
        oCommonBB.oDripRateParams.DoseType = this.DoseValue;
        oCommonBB.oDripRateParams.ConcentrationsStrengthUOMlst = this.ConcentrationStrengthUOMList;
        oCommonBB.oDripRateParams.ConcentrationVolumeUOMlst = this.ConcentrationVolumeUOMList;
        oCommonBB.oDripRateParams.InfusionRateNumlist = this.InfusionRateUOMNumeratorList;
        oCommonBB.oDripRateParams.EnableInfusionrate = String.Equals(this.InfusionAction, MedicationAction.CHANGEFLOWRATE) ? true : ProfileData.ChartSettingsConfig.IsChangeFlowRateEnabled;
        let cb = (s, e) => {
            this._oCallBacksource(s, e)
        }
        oCommonBB.LaunchDripRateCalculator(oCommonBB.oDripRateParams, cb);
//        oCommonBB.LaunchDripRateCalculator(oCommonBB.oDripRateParams, this._oCallBacksource);
    }
    _oCallBacksource(oDlgAction: AppChildDialogAction, oResult: Object): void {
        if (oDlgAction == AppChildDialogAction.Ok) {
            if (oResult != null) {
                let tmpIsClinicalRSNMand: boolean = this.IsClinicalRSNMand;
                let oDripCalVM: DripRateCalcVM = ObjectHelper.CreateType<DripRateCalcVM>(oResult, DripRateCalcVM);
                if (oDripCalVM != null && oDripCalVM.InfRateInVolume != null && !String.Equals(this.InfusionRate, oDripCalVM.InfRateInVolume.ToString())) {
                    this.InfusionRate = oDripCalVM.InfRateInVolume.ToString();
                }
                this.ChangedInfusionRate = oDripCalVM.InfRateInVolume.ToString();
                this.SetDripRateCalculatorDefaults(oDripCalVM);
                //{
                if (this.InfusionRateUOMNumerator == null || (this.InfusionRateUOMNumerator != null && oDripCalVM.InfRateInVolumeUOM != null && !String.Equals(this.InfusionRateUOMNumerator.Value, oDripCalVM.InfRateInVolumeUOM.Value))) {
                    this.InfusionRateUOMNumerator = oDripCalVM.InfRateInVolumeUOM;
                }
                if (this.InfusionRateUOMDenominator == null || (this.InfusionRateUOMDenominator != null && oDripCalVM.InfRateInVolumePerUOM != null && !String.Equals(this.InfusionRateUOMDenominator.Value, oDripCalVM.InfRateInVolumePerUOM.Value))) {
                    this.InfusionRateUOMDenominator = oDripCalVM.InfRateInVolumePerUOM;
                }
                if (this.InfusionRateUOMDenominator != null && !String.IsNullOrEmpty(this.InfusionRateUOMDenominator.Value) && this.InfusionRateUOMDenominatorList != null && this.InfusionRateUOMDenominatorList.Count > 0) {
                    this.InfusionRateUOMDenominator = Common.GetSelectedItem(this.InfusionRateUOMDenominator.Value, this.InfusionRateUOMDenominatorList);
                }
                if (this.InfusionRateUOMNumerator != null && this.InfusionRateUOMDenominator != null) {
                    this.InfusionRateUOM = this.InfusionRateUOMNumerator.DisplayText + "/" + this.InfusionRateUOMDenominator.DisplayText;
                    let oRateNumUOM: CListItem = Common.GetSelectedItem(this.InfusionRateUOMNumerator.Value, this.InfusionRateUOMNumeratorList);
                    let oRateDinUOM: CListItem = Common.GetSelectedItem(this.InfusionRateUOMDenominator.Value, this.InfusionRateUOMDenominatorList);
                    {
                        this.InfusionRateUOMNumerator = oRateNumUOM;
                    }
                    {
                        this.InfusionRateUOMDenominator = oRateDinUOM;
                    }
                    if (oRateNumUOM != null && oRateDinUOM != null) {
                        this.ChangedInfRateNumUOM = oRateNumUOM;
                        this.ChangedInfRateDinUOM = oRateDinUOM;
                    }
                }
                if (!ProfileData.ChartSettingsConfig.IsChangeFlowRateEnabled) {
                    this.IsClinicalRSNMand = tmpIsClinicalRSNMand;
                }
                if (this.EnableInfusionDose && (oDripCalVM.InfRateInDose != null) && (oDripCalVM.InfRateInDose > 0) && (oDripCalVM.InfRateInDose.ToString() != this.InfusionDose))
                    this.InfusionDose = Convert.ToString(oDripCalVM.InfRateInDose);
                if (oDripCalVM.InfStrength > 0 && oDripCalVM.InfStrength != null && oDripCalVM.InfVolume > 0 && oDripCalVM.InfVolume != null && oDripCalVM.InfStrengthUOM != null && !String.IsNullOrEmpty(oDripCalVM.InfStrengthUOM.Value) && oDripCalVM.InfVolumeUOM != null && !String.IsNullOrEmpty(oDripCalVM.InfVolumeUOM.Value)) {
                    if (oDripCalVM.InfStrength > 0 && oDripCalVM.InfStrength != null && !String.Equals(this.ConcentrationStrength, oDripCalVM.InfStrength.ToString()))
                        this.ConcentrationStrength = oDripCalVM.InfStrength.ToString();
                    if (oDripCalVM.InfVolume > 0 && oDripCalVM.InfVolume != null && !String.Equals(this.ConcentrationVolume, oDripCalVM.InfVolume.ToString()))
                        this.ConcentrationVolume = oDripCalVM.InfVolume.ToString();
                    if (oDripCalVM.InfStrengthUOM != null && !String.IsNullOrEmpty(oDripCalVM.InfStrengthUOM.Value)) {
                        let OConStrenght = this.ConcentrationStrengthUOMList.Where(OStngth => OStngth.Value == oDripCalVM.InfStrengthUOM.Value).Select(OStngth => OStngth);
                        if (OConStrenght != null && OConStrenght.Count() > 0) {
                            this.ConcentrationStrengthUOM = OConStrenght.FirstOrDefault();
                        }
                    }
                    if (oDripCalVM.InfVolumeUOM != null && !String.IsNullOrEmpty(oDripCalVM.InfVolumeUOM.Value)) {
                        let OConVolume = this.ConcentrationVolumeUOMList.Where(OVolume => OVolume.Value == oDripCalVM.InfVolumeUOM.Value).Select(OVolume => OVolume);
                        if (OConVolume != null && OConVolume.Count() > 0) {
                            this.ConcentrationVolumeUOM = OConVolume.FirstOrDefault();
                        }
                    }
                }
                //}
                if (oDripCalVM.DripRate != null && oDripCalVM.DripRateUOM != null && oDripCalVM.DripRatePerUOM != null) {
                    this.DripRate = oDripCalVM.DripRate.ToString();
                    this.DripRateUOM = oDripCalVM.DripRateUOM.DisplayText + "/" + oDripCalVM.DripRatePerUOM.DisplayText;
                    this.DripRateUOMID = Convert.ToInt64(oDripCalVM.DripRateUOM.Value);
                    this.DripRatePerUOMID = Convert.ToInt64(oDripCalVM.DripRatePerUOM.Value);
                    this.isDriprateChage=true;
                }
                this.bDriprateCalcLaunchedOnce = true;
            }
        }
    }
    private GetMoreComboOption(MoreOptionCode: string): void {
        this.MoreOptionKey = MoreOptionCode;
        let objService: ManagePrescriptionWSSoapClient = new ManagePrescriptionWSSoapClient();
        objService.GetAllOptionsCompleted = (s, e) => { this.objService_GetAllOptionsCompleted(s, e); };
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
            case CConstants.StopDoseUOM:
                objAllRequest.sOptionCodeBC = CConstants.DoseUOMOptionCode;
                break;
        }
        objAllRequest.MCVersionNoBC = this.MCVersionNo;// AppSessionInfo.AMCV;
        objAllRequest.oContextInformation = Common.FillContext();
        objAllRequest.oContextInformation.PageInfo = MoreOptionCode;
        objService.GetAllOptionsAsync(objAllRequest);
    }
    objService_GetAllOptionsCompleted(sender: Object, e: GetAllOptionsCompletedEventArgs): void {
        let _ErrorID: number = 80000087;
        let _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:InfusionRecordAdminVM, Method:objService_GetAllOptionsCompleted()";
        if (e.Error == null) {
            try {
                let objResponse: CResMsgGetAllOptions = e.Result;
                if (objResponse != null && objResponse.oValues != null && objResponse.oValues.Count > 0) {
                    let nCount: number = objResponse.oValues.Count;
                    switch (objResponse.oContextInformation.PageInfo) {
                        case CConstants.SiteOptionCode:
                            this.SiteList.Clear();
                            if(this.Site.DisplayText?.toLowerCase() == 'more'){
                                this.Site.DisplayText = ''
                                }
                            for (let i: number = 0; i < nCount; i++) {
                                if (!String.IsNullOrEmpty(objResponse.oValues[i].Name)) {
                                    this.SiteList.Add(ObjectHelper.CreateObject(new CListItem(), {
                                        DisplayText: objResponse.oValues[i].Name,
                                        Value: objResponse.oValues[i].Code
                                    }));
                                }
                            }
                            break;
                        case CConstants.ConcentrationDoseUOM:
                            this.ConcentrationStrengthUOMList = new ObservableCollection<CListItem>();
                            if(this.ConcentrationStrengthUOM.DisplayText?.toLowerCase() == 'more'){
                                this.ConcentrationStrengthUOM.DisplayText = ''
                                }
                            for (let i: number = 0; i < nCount; i++) {
                                if (!String.IsNullOrEmpty(objResponse.oValues[i].Name) && !String.Equals(objResponse.oValues[i].SealImageList, CConstants.CompositeUOM)) {
                                    this.ConcentrationStrengthUOMList.Add(ObjectHelper.CreateObject(new CListItem(), {
                                        DisplayText: objResponse.oValues[i].Name,
                                        Value: objResponse.oValues[i].Code
                                    }));
                                }
                            }
                            break;
                        case CConstants.DoseUOMOptionCode:
                            this.DoseUOMs = new ObservableCollection<CListItem>();
                            for (let i: number = 0; i < nCount; i++) {
                                if (!String.IsNullOrEmpty(objResponse.oValues[i].Name)) {
                                    this.DoseUOMs.Add(ObjectHelper.CreateObject(new CListItem(), {
                                        DisplayText: objResponse.oValues[i].Name,
                                        Value: objResponse.oValues[i].Code
                                    }));
                                }
                            }
                            break;
                        case CConstants.StopDoseUOM:
                            this.StopDoseUOMs = new ObservableCollection<CListItem>();
                            for (let i: number = 0; i < nCount; i++) {
                                if (!String.IsNullOrEmpty(objResponse.oValues[i].Name)) {
                                    this.StopDoseUOMs.Add(ObjectHelper.CreateObject(new CListItem(), {
                                        DisplayText: objResponse.oValues[i].Name,
                                        Value: objResponse.oValues[i].Code
                                    }));
                                }
                            }
                            break;
                    }
                }
            }
            catch (ex: any) {
                let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
            }

        }
        else {
            let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
        }
    }
    public ValidateURL(url: string): boolean {
        let RgxUrl: RegExp = new RegExp("^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$");
        return RgxUrl.test(url);
    }
    private oBtnConditionalMazClick: RelayCommand;
    public get BtnConditionalMazzClick(): RelayCommand {
        if (this.oBtnConditionalMazClick == null) {
            this.oBtnConditionalMazClick = new RelayCommand((s)=>this.LaunchConditionalMazzanine(s));
        }
        return this.oBtnConditionalMazClick;
    }
    bIsCondViewOpen: boolean = false;
    public LaunchConditionalMazzanine(oSource: Object): void {
        let sCallingFrom: string = oSource != null ? ObjectHelper.CreateType<string>(oSource, String) : String.Empty;
        sCallingFrom = String.IsNullOrEmpty(sCallingFrom) && String.IsNullOrEmpty(this.InfusionPastAction) ? this.InfusionAction : sCallingFrom;
        if (String.Compare(this.DoseType, DoseTypeCode.CONDITIONAL, StringComparison.InvariantCultureIgnoreCase) == 0 && !this.bIsCondViewOpen) {
            if (this.ConditionalVM == null) {
                this.ConditionalVM = ObjectHelper.CreateObject(new ConditionalDoseVM(RequestSource.RecordAdmin, this.PrescriptionItemOID, false, true), { DrugName: this.DrugName });
            }
            else {
                this.ConditionalVM.CloneConditionalDose();
            }
            this.bIsCondViewOpen = true;
            this.ConditionalChildView = new ConditionalDoseChildView();
            this.ConditionalChildView.conditionalDoseRegimeView1.bIsPRN = this.IsPRN;
            this.ConditionalChildView.conditionalDoseRegimeView1.IdentifyingOID = this.IdentifyingOID;
            this.ConditionalChildView.conditionalDoseRegimeView1.IdentifyingType = this.IdentifyingType;
            this.ConditionalChildView.conditionalDoseRegimeView1.PrescriptionItemOID = this.PrescriptionItemOID;
            this.ConditionalChildView.conditionalDoseRegimeView1.MCVersionNo = this.MCVersionNo;
            this.ConditionalChildView.conditionalDoseRegimeView1.sObsDrugName = !String.IsNullOrEmpty(this.sObsDrugName) ? this.sObsDrugName : this.DrugName;
            if (!String.IsNullOrEmpty(sCallingFrom) && (String.Equals(sCallingFrom, MedicationAction.BEGUN) || (this.InfusionType != null && !String.IsNullOrEmpty(this.InfusionType.Value) && String.Equals(this.InfusionType.Value, InfusionTypesCode.CONTINUOUS, StringComparison.InvariantCultureIgnoreCase) && String.Equals(sCallingFrom, MedicationAction.CHANGEFLOWRATE, StringComparison.InvariantCultureIgnoreCase)))) {
                this.ConditionalVM.IsVisibleOtherDose = Visibility.Collapsed;
            }
            else {
                this.ConditionalVM.IsVisibleOtherDose = Visibility.Visible;
            }
            this.ConditionalVM.CallingPage = sCallingFrom;
            this.ConditionalChildView.DataContext = this.ConditionalVM;
            this.ConditionalChildView.onDialogClose = this.ConditionalChildView_Closed;
            let Callback = (s, e) => {
                if (s != null && e != null) {
                    this.ConditionalChildView = s;
                }
            }
            AppActivity.OpenWindow("Select dose", this.ConditionalChildView, (s, e) =>{this.ConditionalChildView_Closed(s)}, this.DrugName, false, 500, 400, true, WindowButtonType.OkCancel, Callback);
        }
    }
    ConditionalChildView_Closed(args: AppDialogEventargs): void {
        this.bIsCondViewOpen = false;
        let bdialogresult: boolean = false;
        if (args.Result == AppDialogResult.Ok) {
            if (that.ConditionalChildView != null) {
                bdialogresult = that.ConditionalChildView.OKButtonClick();
                if (bdialogresult) {
                    let ConditionalVM: ConditionalDoseVM = ObjectHelper.CreateType<ConditionalDoseVM>(that.ConditionalChildView.DataContext, ConditionalDoseVM);
                    this.FillSelectedConditionalDose(ConditionalVM);
                    that.ConditionalChildView.appDialog.DialogResult = bdialogresult;
                }
            }
        }
        else if (args.Result == AppDialogResult.Cancel) {
            that.ConditionalChildView.CancelButtonClick();
           // this.ConditionalChildView.appDialog.DialogResult = true;
           that.ConditionalChildView.appDialog.DialogRef.close();
        }
    }
    private FillSelectedConditionalDose(ConditionalVM: ConditionalDoseVM): void {
        if (ConditionalVM == null)
            return
        if (ConditionalVM.SelectedConditionalDose != null) {
            if (!String.Equals(ConditionalVM.CallingPage, MedicationAction.CHANGEFLOWRATE)) {
                if (!String.IsNullOrEmpty(ConditionalVM.SelectedConditionalDose.Dose)) {
                    if (String.Equals(ConditionalVM.CallingPage, MedicationAction.STOP) || String.Equals(ConditionalVM.CallingPage, MedicationAction.COMPLETE))
                        this.DoseAdministered = ConditionalVM.SelectedConditionalDose.Dose;
                    else {
                        if (String.IsNullOrEmpty(ConditionalVM.SelectedConditionalDose.UpperDose)) {
                            this.Dose = ConditionalVM.SelectedConditionalDose.Dose;
                            this.IsEnableDose = false;
                        }
                        else {
                            this.Dose = String.Empty;
                            this.IsEnableDose = true;
                            this.IsrdlDose = false;
                        }
                    }
                    this.DoseUOMName = ConditionalVM.SelectedConditionalDose.DoseUoM;
                    this.DoseUOMOID = ConditionalVM.SelectedConditionalDose.DoseUoMOID;
                }
                else {
                    this.Dose = String.Empty;
                    this.DoseUOMName = String.Empty;
                    this.DoseUOMOID = 0;
                    this.IsEnableDose = false;
                }
            }
            if (!String.IsNullOrEmpty(ConditionalVM.SelectedConditionalDose.InfRate) && !String.Equals(ConditionalVM.CallingPage, MedicationAction.COMPLETE) && !String.Equals(ConditionalVM.CallingPage, MedicationAction.STOP)) {
                let checkVolumebasedIfusedUom = (this.VolumeInfusedUOMList != null) ? this.VolumeInfusedUOMList.Where(c => c.Value == ConditionalVM.SelectedConditionalDose.InfNumUoMOID.ToString()).Select(s => s).ToList() : null;
                if (checkVolumebasedIfusedUom != null && checkVolumebasedIfusedUom.Count > 0) {
                    if (String.Compare(this.InfusionAction, MedicationAction.CHANGEFLOWRATE) == 0) {
                        this.ChangedInfusionRate = ConditionalVM.SelectedConditionalDose.InfRate;
                        this.ChangedInfRateNumUOM = (ObjectHelper.CreateObject(new CListItem(), {
                            DisplayText: ConditionalVM.SelectedConditionalDose.InfNumUOM,
                            Value: ConditionalVM.SelectedConditionalDose.InfNumUoMOID.ToString()
                        }));
                        this.ChangedInfRateNumUOM = Common.GetSelectedItem(this.ChangedInfRateNumUOM.Value.ToString(), this.InfusionRateUOMNumeratorList);
                        this.ChangedInfRateDinUOM = (ObjectHelper.CreateObject(new CListItem(), {
                            DisplayText: ConditionalVM.SelectedConditionalDose.InfDenumUOM,
                            Value: ConditionalVM.SelectedConditionalDose.InfDenumUMOID.ToString()
                        }));
                        this.ChangedInfRateDinUOM = Common.GetSelectedItem(this.ChangedInfRateDinUOM.Value.ToString(), this.InfusionRateUOMDenominatorList);
                        this.DripInfusionRate = this.ChangedInfusionRate;
                        this.DripInfRateUomOID = ConditionalVM.SelectedConditionalDose.InfNumUoMOID;
                        this.DripInfRatePerUomOID = ConditionalVM.SelectedConditionalDose.InfDenumUMOID;
                        this.DripInfusionRateUom = ConditionalVM.SelectedConditionalDose.InfNumUOM + "/" + ConditionalVM.SelectedConditionalDose.InfDenumUOM;
                    }
                    else if (String.Compare(ConditionalVM.CallingPage, MedicationAction.BEGUN) == 0) {
                        this.InfusionRate = ConditionalVM.SelectedConditionalDose.InfRate;
                        this.InfusionRateUOM = ConditionalVM.SelectedConditionalDose.InfNumUOM + "/" + ConditionalVM.SelectedConditionalDose.InfDenumUOM;
                        this.InfusionRateUOMNumerator = Common.GetSelectedItem(ConditionalVM.SelectedConditionalDose.InfNumUoMOID.ToString(), this.InfusionRateUOMNumeratorList);
                        this.InfusionRateUOMDenominator = Common.GetSelectedItem(ConditionalVM.SelectedConditionalDose.InfDenumUMOID.ToString(), this.InfusionRateUOMDenominatorList);
                        this.DripInfusionRate = this.InfusionRate;
                        this.DripInfusionRateUom = this.InfusionRateUOM;
                        this.DripInfRateUomOID = (!String.IsNullOrEmpty(this.InfusionRateUOMNumerator.Value)) ? Convert.ToInt64(this.InfusionRateUOMNumerator.Value) : 0;
                        this.DripInfRatePerUomOID = (!String.IsNullOrEmpty(this.InfusionRateUOMDenominator.Value)) ? Convert.ToInt64(this.InfusionRateUOMDenominator.Value) : 0;
                    }
                    if (!String.IsNullOrEmpty(ConditionalVM.SelectedConditionalDose.InfUpperRate) && !String.IsNullOrEmpty(ConditionalVM.SelectedConditionalDose.InfRate)) {
                        this.InfusionRate = String.Empty;
                        this.ChangedInfusionRate = String.Empty;
                        this.DripInfusionRate = String.Empty;
                        this.InfusionDose = String.Empty;
                    }
                    this.InfusionDose = String.Empty;
                    this.InfusionDoseUOM = String.Empty;
                    this.InfusionDoseNumeratorUOMID = 0;
                    this.InfusionDoseDenominatorUOMID = 0;
                }
                else {
                    this.InfusionRate = String.Empty;
                    this.InfusionRateUOM = String.Empty;
                    this.InfusionRateUOMNumerator = null;
                    this.InfusionRateUOMDenominator = null;
                    this.ChangedInfusionRate = String.Empty;
                    this.ChangedInfRateNumUOM = null;
                    this.ChangedInfRateDinUOM = null;
                    this.DripInfusionRate = String.Empty;
                    this.DripInfusionRateUom = String.Empty;
                    this.DripInfRateUomOID = 0;
                    this.DripInfRatePerUomOID = 0;
                    this.InfusionDose = ConditionalVM.SelectedConditionalDose.InfRate;
                    this.InfusionDoseUOM = ConditionalVM.SelectedConditionalDose.InfNumUOM + "/" + ConditionalVM.SelectedConditionalDose.InfDenumUOM;
                    this.InfusionDoseNumeratorUOMID = ConditionalVM.SelectedConditionalDose.InfNumUoMOID;
                    this.InfusionDoseDenominatorUOMID = ConditionalVM.SelectedConditionalDose.InfDenumUMOID;
                    if (!String.IsNullOrEmpty(ConditionalVM.SelectedConditionalDose.InfUpperRate) && !String.IsNullOrEmpty(ConditionalVM.SelectedConditionalDose.InfRate)) {
                        this.InfusionRate = String.Empty;
                        this.ChangedInfusionRate = String.Empty;
                        this.DripInfusionRate = String.Empty;
                        this.InfusionDose = String.Empty;
                    }
                }
            }
            else {
                if (!String.Equals(ConditionalVM.CallingPage, MedicationAction.COMPLETE) && !String.Equals(ConditionalVM.CallingPage, MedicationAction.STOP)) {
                    this.InfusionRate = String.Empty;
                    this.InfusionRateUOM = String.Empty;
                    this.InfusionRateUOMNumerator = null;
                    this.InfusionRateUOMDenominator = null;
                    if (String.Equals(this.InfusionAction, MedicationAction.CHANGEFLOWRATE, StringComparison.InvariantCultureIgnoreCase)) {
                        this.ChangedInfusionRate = String.Empty;
                        this.ChangedInfRateNumUOM = null;
                        this.ChangedInfRateDinUOM = null;
                        this.DripInfusionRate = String.Empty;
                        this.DripInfRateUomOID = 0;
                        this.DripInfRatePerUomOID = 0;
                        this.DripInfusionRateUom = String.Empty;
                    }
                }
            }
        }
        else if (ConditionalVM.IsOtherDose) {
            if (String.Compare(ConditionalVM.CallingPage, MedicationAction.STOP) == 0 || String.Compare(ConditionalVM.CallingPage, MedicationAction.COMPLETE) == 0)
                this.DoseAdministered = ConditionalVM.OtherDoseValue;
            else {
                this.Dose = ConditionalVM.OtherDoseValue;
                this.IsEnableDose = true;
            }
            this.DoseUOMName = ConditionalVM.OtherDoseUoM;
            this.DoseUOMOID = ConditionalVM.OtherDoseUoMOID;
        }
    }
    public SetDripInfRateValues(): void {
        if (String.Compare(this.InfusionAction, MedicationAction.CHANGEFLOWRATE) == 0) {
            if (this.IsInfRateVolBased)
                this.DripInfusionRate = this.ChangedInfusionRate;
            if (this.ChangedInfRateNumUOM != null && this.ChangedInfRateDinUOM != null) {
                this.DripInfRateUomOID = Convert.ToInt64(this.ChangedInfRateNumUOM.Value);
                this.DripInfRatePerUomOID = Convert.ToInt64(this.ChangedInfRateDinUOM.Value);
                this.DripInfusionRateUom = this.ChangedInfRateNumUOM.DisplayText + "/" + this.ChangedInfRateDinUOM.DisplayText;
            }
        }
        else if (String.Compare(this.InfusionAction, MedicationAction.BEGUN) == 0 || String.Compare(this.InfusionAction, MedicationAction.CHANGEBAG) == 0) {
            this.DripInfusionRate = !String.IsNullOrEmpty(this.InfusionRate) ? this.InfusionRate : this.DripInfusionRate;
            if (this.InfusionRateUOMNumerator != null && this.InfusionRateUOMDenominator != null) {
                this.DripInfRateUomOID = Convert.ToInt64(this.InfusionRateUOMNumerator.Value);
                this.DripInfRatePerUomOID = Convert.ToInt64(this.InfusionRateUOMDenominator.Value);
                this.DripInfusionRateUom = this.InfusionRateUOMNumerator.DisplayText + "/" + this.InfusionRateUOMDenominator.DisplayText;
            }
        }
    }
    public RaiseInfRecordAdminServiceCompleted(oSlotDetail: SlotDetail): void {
        if (this.OnInfRecordAdminServiceCompleted != null)
            this.OnInfRecordAdminServiceCompleted(oSlotDetail);
    }
    public SetDateTimevalue(iDateTimePicker: iDateTimePicker, iTime: iTimeBox): void {
        let CurrentDt: DateTime = CommonBB.GetServerDateTime();
        switch (this.InfSlotStatus) {
            case SlotStatus.PLANNED:
            case SlotStatus.DUENOW:
            case SlotStatus.OVERDUE:
            case SlotStatus.DEFERADMIN:
            case SlotStatus.DEFERDUENOW:
            case SlotStatus.DEFEROVERDUE:
                if (String.Compare(this.InfusionType.Value, InfusionTypesCode.INTERMITTENT) == 0 && this.IsPRN && this.IsRetrospective && !String.IsNullOrEmpty(this.InfusionPastAction)) {
                    iDateTimePicker.RangeStartDate = this.PrescriptionStartDate;
                    iDateTimePicker.RangeEndDate = CurrentDt;
                    iTime.Value = DateTime.MinValue;
                }
                else if (String.Compare(this.InfusionType.Value, InfusionTypesCode.INTERMITTENT) == 0 && DateTime.NotEquals(this.LastscheduleDTTM() , DateTime.MinValue)) {
                    this.SetMinMaxDTTMValues(this.LastscheduleDTTM(), this.ScheduledDTTM, iDateTimePicker, iTime);
                }
                else {
                    this.SetMinMaxDTTMValues(this.PrescriptionStartDate, CurrentDt, iDateTimePicker, iTime);
                    this.AdministeredDateTime = iTime.Maximum.GetValueOrDefault(CurrentDt);
                }
                break;
            case SlotStatus.INPROGRESS:
            case SlotStatus.PAUSED:
                this.SetMinMaxDTTMValues(this.LastActionDateTime, CurrentDt, iDateTimePicker, iTime);
                if (String.Compare(this.InfusionAction, MedicationAction.CHANGEBAG, StringComparison.CurrentCultureIgnoreCase) == 0) {
                    this.EndDate = this.LastActionDateTime;
                    this.EnddateTime = iTime.Maximum.GetValueOrDefault(CurrentDt);
                }
                else {
                    this.AdministeredstopDate = this.LastActionDateTime;
                    this.AdministeredstopDateTime = iTime.Maximum.GetValueOrDefault(CurrentDt);
                }
                this.AdministeredDateTime = iTime.Maximum.GetValueOrDefault(CurrentDt);
                break;
            case SlotStatus.NOTYETRECORDED:
            case SlotStatus.NOTKNOWN:
                this.SetMinMaxDTTMValues(this.ScheduledDTTM, CurrentDt, iDateTimePicker, iTime);
                if (DateTime.Equals(iDateTimePicker.SelectedDateTime , DateTime.MinValue))
                    this.AdministeredDate = this.ScheduledDTTM;
                this.AdministeredDateTime = iTime.Minimum.GetValueOrDefault(this.ScheduledDTTM);
                break;
        }
    }
    private SetMinMaxDTTMValues(StartTime: DateTime, EndTime: DateTime, dtpGivenDate: iDateTimePicker, iTime: iTimeBox): void {
        let CurrentDt: DateTime = CommonBB.GetServerDateTime();
        dtpGivenDate.RangeStartDate = StartTime;
        dtpGivenDate.RangeEndDate = EndTime;
        if (DateTime.NotEquals(StartTime , DateTime.MinValue) && DateTime.NotEquals(EndTime , DateTime.MinValue) && DateTime.NotEquals(StartTime.Date , EndTime.Date)) {
            if (DateTime.LessThan(StartTime.Date , EndTime.Date )&& DateTime.LessThan(StartTime.Date , CurrentDt.Date) && DateTime.Equals(StartTime.Date , CurrentDt.Date) && DateTime.Equals(EndTime.Date , CurrentDt.Date) && DateTime.Equals(StartTime.Date , EndTime.Date)) {
                iTime.Minimum = new DateTime(StartTime.Year, StartTime.Month, StartTime.Day, StartTime.Hour, StartTime.Minute, 0);
                iTime.Maximum = new DateTime(EndTime.Year, EndTime.Month, EndTime.Day, EndTime.Hour, EndTime.Minute, 0);
            }
            else if(DateTime.NotEquals(StartTime.Date , EndTime.Date) && DateTime.LessThan(StartTime.Date , EndTime.Date) && DateTime.LessThan(StartTime.Date , CurrentDt.Date) && DateTime.Equals(EndTime.Date , CurrentDt.Date) && DateTime.NotEquals(StartTime.Date , CurrentDt.Date) && DateTime.Equals(CurrentDt.Date , dtpGivenDate.SelectedDateTime.Date)) {
                iTime.Minimum = new DateTime(EndTime.Year, EndTime.Month, EndTime.Day, 0, 0, 0);
                iTime.Maximum = EndTime;
            }
            else {
                iTime.Minimum = StartTime;
                iTime.Maximum = new DateTime(StartTime.Year, StartTime.Month, StartTime.Day, 23, 59, 0);
            }
        }
        else {
            iTime.Minimum = DateTime.NotEquals(StartTime , DateTime.MinValue) ? StartTime : CurrentDt;
            iTime.Maximum = DateTime.NotEquals(EndTime , DateTime.MinValue) ? new DateTime(EndTime.Year, EndTime.Month, EndTime.Day, EndTime.Hour, EndTime.Minute, 0) : CurrentDt;
        }
    }
    private LastscheduleDTTM(): DateTime {
        let LastscheduleDTTM: DateTime = DateTime.MinValue;
        if (this.InfAdministeredTimes != null && this.InfAdministeredTimes.Count > 0) {
            LastscheduleDTTM = this.InfAdministeredTimes.Where(c => DateTime.LessThanOrEqualTo(c.InfusionEndDTTM , this.ScheduledDTTM)).Select(s => s.InfusionEndDTTM).LastOrDefault();
        }
        return LastscheduleDTTM;
    }
    public SetDateTimeForChangebag(iTime: iTimeBox): void {
        let CurrentDt: DateTime = CommonBB.GetServerDateTime();
        iTime.Minimum = new DateTime(this.EnddateTime.Year, this.EnddateTime.Month, this.EnddateTime.Day, this.EnddateTime.Hour, this.EnddateTime.Minute, 0);
        iTime.Maximum = new DateTime(CurrentDt.Year, CurrentDt.Month, CurrentDt.Day, CurrentDt.Hour, CurrentDt.Minute, 0);
    }
    private FindScheduleTimeForIntermitent(): void {
        if (this.InfAdministeredTimes != null && this.InfAdministeredTimes.Count > 0) {
            let LastscheduleDTTM = this.InfAdministeredTimes.Where(c => DateTime.LessThanOrEqualTo(c.InfusionEndDTTM , this.ScheduledDTTM)).Select(s => s).ToList();
        }
    }
    public SetExpiryDate(dtp: iDateTimePicker): void {
        if (dtp.SelectedDateTime == null) {
            dtp.SelectedDateTime = DateTime.MinValue;
        }
        dtp.IsConstrainEntry = true;
        dtp.RangeStartDate = CommonBB.GetServerDateTime().Date;
        dtp.RangeEndDate = DateTime.MaxValue.DateTime.AddDays(-1);
    }
    public override OnInitialize(): void {
        super.OnInitialize();
    }
      public override OnInitComplete(): void {
    if(super.AppContext != null && !String.IsNullOrEmpty(super.AppContext.CACode) && String.Compare(super.AppContext.CACode, "MN_INF_RECADMIN") == 0) {
    let lnPatOID: number, lnMedAdminOID;
    if (Number.TryParse(super.WizardContext["PATIENTOID"].ToString(), (o) => { lnPatOID = o }))
        ContextManager.Instance.Add("PATIENTOID", lnPatOID.ToString());
    if (Number.TryParse(super.WizardContext["MEDADMINOID"].ToString(), lnMedAdminOID))
        ContextManager.Instance.Add("MEDADMINOID", lnMedAdminOID);
    this.CACode = CALaunch.FluidBalnce.ToString();
    //To be revisited
    let objUserOid: int64;
    Int64.TryParse(super.AppContext.UserOID, (o) => { objUserOid = o });
    ContextInfo.UserOID = objUserOid;

    let objReleaseVer: Byte;
    Byte.TryParse(super.AppContext.ReleaseVersion, (o) => { objReleaseVer = o });
    ContextInfo.ReleaseVersion = objReleaseVer.toString();

    ContextInfo.SecurityToken = super.AppContext.SecurityToken;
    AppContextInfo.OrganisationOID = super.AppContext.OrganisationOID;
}
      }
      public override OnFinish(): void {
    if(this != null && this.FormVM != null && !String.IsNullOrEmpty(this.InfusionAction)) {
    this.IsSubmitInProgress = true;
    Busyindicator.SetStatusBusy("InfRecAdminSubmit");
    this.FormVM.ValidateAndSubmitForm();
}
      }
      public CloseInfRecAdminWizard(): void {
    super.OnFinish();
}
      public ValidStartDTTM: DateTime;
      private _InfusionGroupSequenceNo: number;
      public get InfusionGroupSequenceNo(): number {
    return this._InfusionGroupSequenceNo;
}
      public set InfusionGroupSequenceNo(value: number) {
    this._InfusionGroupSequenceNo = value;
}
      private _InfusionSequentialItemNo: number;
      public get InfusionSequentialItemNo(): number {
    return this._InfusionSequentialItemNo;
}
      public set InfusionSequentialItemNo(value: number) {
    this._InfusionSequentialItemNo = value;
}
      private _ParentPrescriptionItemOID: number;
      public get ParentPrescriptionItemOID(): number {
    return this._ParentPrescriptionItemOID;
}
      public set ParentPrescriptionItemOID(value: number) {
    this._ParentPrescriptionItemOID = value;
}
      public InitFormValuesAfterFormLoad(): void {
    this.SetDefaultDTTM();
    this.RestoreCommentsMandatoryStatus(this.InfusionAction);
    this.SetConditionalDoseIcon();
    this.SetDefaultValuesAfterFormLoad();
}
RestoreCommentsMandatoryStatus(_InfusionAction: string): void {
    if(this.lstPrevAction != null && this.lstPrevAction.Count() > 0) {
    for (const key in this.lstPrevAction.Keys) {
        if (String.Equals(key, _InfusionAction, StringComparison.InvariantCultureIgnoreCase)) {
            this.IsClinicalRSNMand = this.lstPrevAction[key].Value.IsClinicalRSNMand;
            this.IsStopClinicalRSNMand = this.lstPrevAction[key].Value.IsStopClinicalRSNMand;
            break;
        }
    }
    // this.lstPrevAction.forEach( (objActionCode)=> {
    //     if (String.Equals(objActionCode.Key, _InfusionAction, StringComparison.InvariantCultureIgnoreCase)) {
    //         this.IsClinicalRSNMand = objActionCode.Value.IsClinicalRSNMand;
    //         this.IsStopClinicalRSNMand = objActionCode.Value.IsStopClinicalRSNMand;
    //         break;
    //     }
    // });
}
      }
SetDefaultDTTM(): void {
    switch(this.InfSlotStatus) {
              case SlotStatus.PLANNED:
              case SlotStatus.DUENOW:
              case SlotStatus.OVERDUE:
              case SlotStatus.DEFERADMIN:
              case SlotStatus.DEFERDUENOW:
              case SlotStatus.DEFEROVERDUE:
    if ((String.Equals(this.InfusionType.Value, InfusionTypesCode.INTERMITTENT, StringComparison.OrdinalIgnoreCase) || String.Equals(this.InfusionType.Value, InfusionTypesCode.SUBTYPE_GAS, StringComparison.OrdinalIgnoreCase)) && this.IsPRN && this.IsRetrospective && !String.IsNullOrEmpty(this.InfusionPastAction) && !this.IsPRNWithSchedule) {
        this.RangeStartDate = this.PrescriptionStartDate;
        this.RangeEndDate = this.Currentdttm;
        this.AdministeredDate = this.AdministeredDateTime = DateTime.MinValue;
        if (!String.IsNullOrEmpty(this.InfusionPastAction) && this.IsRetrospective && String.Equals(this.InfusionPastAction, MedicationAction.STOP, StringComparison.OrdinalIgnoreCase) || String.Equals(this.InfusionPastAction, MedicationAction.COMPLETE, StringComparison.OrdinalIgnoreCase)) {
            this.EndRangeStartDate = this.PrescriptionStartDate;
            this.EndRangeEndDate = this.Currentdttm;
            this.AdministeredstopDate = this.AdministeredstopDateTime = DateTime.MinValue;
        }
    }
    else if (String.Equals(this.InfusionType.Value, InfusionTypesCode.INTERMITTENT, StringComparison.OrdinalIgnoreCase) && DateTime.NotEquals(this.LastscheduleDTTM() , DateTime.MinValue) && !this.IsPRNWithSchedule) {
        this.RangeStartDate = this.LastscheduleDTTM();
        this.RangeEndDate = this.Currentdttm;
        this.AdministeredDate = this.AdministeredDateTime = this.Currentdttm;
    }
    else if (String.Equals(this.InfusionType.Value, InfusionTypesCode.INTERMITTENT, StringComparison.OrdinalIgnoreCase) && this.IsPRN && this.IsRetrospective && !String.IsNullOrEmpty(this.InfusionPastAction) && this.IsPRNWithSchedule) {
        this.RangeStartDate = this.PrescriptionStartDate;
        this.RangeEndDate = this.Currentdttm;
        this.AdministeredDate = this.AdministeredDateTime = DateTime.MinValue;
        if (String.Equals(this.InfusionPastAction, MedicationAction.STOP, StringComparison.OrdinalIgnoreCase) || String.Equals(this.InfusionPastAction, MedicationAction.COMPLETE, StringComparison.OrdinalIgnoreCase)) {
            this.EndRangeStartDate = this.AdministeredDate;
            this.EndRangeEndDate = this.Currentdttm;
            this.AdministeredstopDate = this.AdministeredstopDateTime = DateTime.MinValue;
        }
    }
    else {
        this.RangeStartDate = this.PrescriptionStartDate;
        this.RangeEndDate = this.Currentdttm;
        this.AdministeredDate = this.AdministeredDateTime = this.Currentdttm;
    }
    if (DateTime.GreaterThan(this.PrescriptionStartDate , this.Currentdttm)) {
        this.RangeStartDate = this.Currentdttm;
        this.ValidStartDTTM = this.Currentdttm;
    }
    else {
        this.ValidStartDTTM = this.PrescriptionStartDate;
    }
    break;
              case SlotStatus.INPROGRESS:
              case SlotStatus.PAUSED:
    this.RangeStartDate = this.LastActionDateTime;
    this.RangeEndDate = this.Currentdttm;
    if (!String.IsNullOrEmpty(this.InfusionAction) && !String.Equals(this.InfusionAction, MedicationAction.STOP, StringComparison.OrdinalIgnoreCase) && !String.Equals(this.InfusionAction, MedicationAction.COMPLETE, StringComparison.OrdinalIgnoreCase)) {
        this.AdministeredDate = this.AdministeredDateTime = this.Currentdttm;
    }
    if (String.Equals(this.InfusionAction, MedicationAction.CHANGEBAG, StringComparison.OrdinalIgnoreCase) || String.Equals(this.InfusionAction, MedicationAction.RESUME, StringComparison.OrdinalIgnoreCase) || String.Equals(this.InfusionAction, MedicationAction.CHANGEFLOWRATE, StringComparison.OrdinalIgnoreCase)) {
        if (String.Equals(this.InfusionAction, MedicationAction.CHANGEBAG, StringComparison.OrdinalIgnoreCase)) {
            this.CurrentChangeBagRangeStartDate = this.LastActionDateTime;
            this.CurrentChangeBagRangeEndDate = this.Currentdttm;
        }
        this.EndDate = this.EnddateTime = this.Currentdttm;
    }
    else if (!String.IsNullOrEmpty(this.InfusionAction) && String.Equals(this.InfusionAction, MedicationAction.STOP, StringComparison.OrdinalIgnoreCase) || String.Equals(this.InfusionAction, MedicationAction.COMPLETE, StringComparison.OrdinalIgnoreCase)) {
        this.EndRangeStartDate = this.LastActionDateTime;
        this.EndRangeEndDate = this.Currentdttm;
        this.AdministeredstopDate = this.AdministeredstopDateTime = this.Currentdttm;
    }
    break;
              case SlotStatus.NOTYETRECORDED:
              case SlotStatus.NOTKNOWN:
              case SlotStatus.HOMELEAVE:
    this.RangeStartDate = this.PrescriptionStartDate;
    this.RangeEndDate = this.Currentdttm;
    this.ValidStartDTTM = this.PrescriptionStartDate;
    if (this.IsRetrospective) {
        if (this.IsPRN) {
            this.AdministeredDate = DateTime.MinValue;
        }
        else {
            this.AdministeredDate = this.ScheduledDTTM;
        }
        //this.AdministeredDateTime = DateTime.MinValue;
    }
    else {
        this.AdministeredDate = this.AdministeredDateTime = this.ScheduledDTTM;
    }
    if (!String.IsNullOrEmpty(this.InfusionPastAction) && this.IsRetrospective && String.Equals(this.InfusionPastAction, MedicationAction.STOP, StringComparison.OrdinalIgnoreCase) || String.Equals(this.InfusionPastAction, MedicationAction.COMPLETE, StringComparison.OrdinalIgnoreCase)) {
        this.EndRangeStartDate = this.AdministeredDate;
        this.EndRangeEndDate = this.Currentdttm;
        this.AdministeredstopDate = this.AdministeredstopDateTime = DateTime.MinValue;
    }
    break;
}
      }
nDrugOID: ArrayOfLong = new ArrayOfLong();
      public GetDrugBasicSnomedcodeInfo(OIDs: number): void {
    if(!this.nDrugOID.Contains(OIDs))
this.nDrugOID.Add(OIDs);
MedicationPrescriptionHelper.GetDrugBasicInfo(this.getSelectedManagePrescItemOIDs(OIDs), (s, e) => { this.objService_GetDrugBasicInfoCompleted(s, e); });
      }
objService_GetDrugBasicInfoCompleted(sender: Object, e: GetDrugBasicInfoCompletedEventArgs): void {
    let _ErrorID: number = 80000049;
    let _ErrorSource: string = "LorAppManagePrescriptionBBUi.dll, Class:IPPMABaseVM, Method:objService_GetDrugBasicInfoCompleted()";
    let objResponse: CResMsgGetDrugBasicInfo = e.Result;
    if(objResponse != null && e.Error == null) {
        try {
            if (objResponse.ItemDetail != null) {
                let SNOMEDCode: string = String.Empty;
                for (let nCnt: number = 0; nCnt < objResponse.ItemDetail.Count; nCnt++) {
                    SNOMEDCode = objResponse.ItemDetail[nCnt].SNOMEDCode;
                }
                let SNOMEDTerm: string = MedicationCommonBB.GetSnomedTerm(SNOMEDCode);
                let AllergyType = "CC_ALGDA";
                let sArgs = "&AllergenText=" + SNOMEDTerm + "&ALLERGYTYPE=" + AllergyType + "&AllergenCode=" + SNOMEDCode + "&MenuCodeForAllergy=MN_RECALRGY";
                //revisitmeyasik
                // LaunchWizard(this.OnChildWizardClose, "MN_HI_RECALRGY", sArgs);
                AppLoadService.LaunchWizard(this.OnChildWizardClose, "MN_HI_RECALRGY", sArgs);
            }
        }
        catch (ex: any) {
            let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
        }

    }
          else {
        let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
    }
}
getSelectedManagePrescItemOIDs(OID: number): ArrayOfLong {
    let PRESCRIPTIONITEMOIDS: string = String.Empty;
    let sDrugOID: string[] = null;
    PRESCRIPTIONITEMOIDS = OID.ToString();
    if (String.IsNullOrEmpty(PRESCRIPTIONITEMOIDS))
        return null;
    PRESCRIPTIONITEMOIDS = PRESCRIPTIONITEMOIDS.TrimEnd(',');
    if (!String.IsNullOrEmpty(PRESCRIPTIONITEMOIDS))
        sDrugOID = PRESCRIPTIONITEMOIDS.Split(',');
    if (sDrugOID.length > 0) {
        let nValidOID: number = 0;
        this.nDrugOID.Clear();
        sDrugOID.forEach((sOID) => {
            Number.TryParse(sOID, (o) => { nValidOID = o });
            if (!this.nDrugOID.Contains(nValidOID))
                this.nDrugOID.Add(nValidOID);
        });
    }
    return this.nDrugOID;
}
      public LaunchRecordallergy(recordadminVM: InfrecordadminVM, Message: boolean): void {
    recordadminVM.GetDrugBasicSnomedcodeInfo(recordadminVM.PrescriptionItemOID);
}
      public OnChildWizardClose(args: ChildWizardCloseEventargs): void {

}
      private SetConditionalDoseIcon(): void {
    if(String.Equals(this.InfusionAction, MedicationAction.CHANGEFLOWRATE) && String.Equals(this.DoseType, DoseTypeCode.CONDITIONAL) && this.IsConditionalExists) {
        this.CondInfrateFR = Visibility.Visible;
    }
          else {
        this.CondInfrateFR = Visibility.Collapsed;
    }
          if (this.IsRetrospective && String.Equals(this.DoseType, DoseTypeCode.CONDITIONAL) && this.IsConditionalExists) {
    this.CondDoseStopComplete = Visibility.Visible;
    this.IsEnableStopDose = true;
}
          else if (this.IsRetrospective && String.Equals(this.DoseType, DoseTypeCode.CONDITIONAL) && !this.IsConditionalExists) {
    this.CondDoseStopComplete = Visibility.Collapsed;
    this.IsEnableStopDose = true;
}
      }
      private SetDefaultValuesAfterFormLoad(): void {
    if(!this.IsRetrospective || (this.IsRetrospective && !this.IsChkReStop && !this.IsChkReComplete)) {
    if (!String.IsNullOrEmpty(this.ItemSubType) && String.Equals(this.ItemSubType, InfusionTypesCode.SUBTYPE_GAS, StringComparison.CurrentCultureIgnoreCase) && this.IsEnableInfusionrate) {
        if (String.Equals(this.InfusionAction, MedicationAction.BEGUN, StringComparison.InvariantCultureIgnoreCase) && this.FlowrateNumUOM == null && this.FlowrateDenUOM == null) {
            if (this.InfusionRateUOMNumeratorList != null && this.InfusionRateUOMNumeratorList.Count == 1) {
                this.FlowrateNumUOM = this.InfusionRateUOMNumeratorList.First();
            }
            if (this.InfusionRateUOMDenominatorList != null && this.InfusionRateUOMDenominatorList.Count == 1) {
                this.FlowrateDenUOM = this.InfusionRateUOMDenominatorList.First();
            }
        }
        else if (String.Equals(this.InfusionAction, MedicationAction.CHANGEFLOWRATE, StringComparison.InvariantCultureIgnoreCase) && this.ChangedInfRateNumUOM == null && this.ChangedInfRateDinUOM == null) {
            if (this.InfusionRateUOMNumeratorList != null && this.InfusionRateUOMNumeratorList.Count == 1) {
                this.ChangedInfRateNumUOM = this.InfusionRateUOMNumeratorList.First();
            }
            if (this.InfusionRateUOMDenominatorList != null && this.InfusionRateUOMDenominatorList.Count == 1) {
                this.ChangedInfRateDinUOM = this.InfusionRateUOMDenominatorList.First();
            }
        }
    }
    else {
        if (String.Equals(this.InfusionAction, MedicationAction.BEGUN, StringComparison.InvariantCultureIgnoreCase)) {
            if (!String.IsNullOrEmpty(this.PresVolme) && this.BagVolumeUOMList != null && this.BagVolumeUOMList.Count > 0) {
                if (this.BagVolumeUOMList[0] != null && !String.IsNullOrEmpty(this.BagVolumeUOMList[0].DisplayText) && !String.IsNullOrEmpty(this.PresVolmeUOM) && String.Equals(this.PresVolmeUOM, this.BagVolumeUOMList[0].DisplayText, StringComparison.InvariantCultureIgnoreCase)) {
                    this.BagVolume = this.PresVolme;
                    this.BagVolumeUOM = this.BagVolumeUOMList.FirstOrDefault();
                }
            }
            else {
                this.BagVolumeUOM = this.BagVolumeUOMList.FirstOrDefault();
            }
        }
    }
}
if (!String.IsNullOrEmpty(this.InfusionAction) && String.Equals(this.InfusionAction, MedicationAction.CHANGEBAG, StringComparison.InvariantCultureIgnoreCase)) {
    if (this.IsExists == 'B') {
        this.IsScanInfrecadminlinkenabled = false;
    }
    else if (this.IsExists == 'S') {
        this.IsBatchenabled = false;
        this.IsExpiryenabled = false;
    }
}
      }
      public CheckWarningMessages(sFieldName: string, eMsgBoxResult: MessageBoxResult): boolean {
    if (!String.IsNullOrEmpty(sFieldName)) {
        if (this._LstWarningMsgFields.Contains(sFieldName)) {
            if (eMsgBoxResult == MessageBoxResult.No) {
                this._LstWarningMsgFields.Remove(sFieldName);
            }
        }
        else {
            if (eMsgBoxResult == MessageBoxResult.Yes) {
                this._LstWarningMsgFields.Add(sFieldName);
            }
        }
    }
    if (eMsgBoxResult == MessageBoxResult.No)
        return false;
    if (this.IsRetrospective) {
        if (!this._LstWarningMsgFields.Contains(AdministrationField.BeginTime) && this.AdministeredDateTime.ToString("HH:mm").Equals("00:00", StringComparison.InvariantCultureIgnoreCase)) {
            this.OnCheckWarningMessage(Resource.InfRecAdministartion.InfRecMsg_AdminTime, AdministrationField.BeginTime);
            return false;
        }
        if (!this._LstWarningMsgFields.Contains(AdministrationField.Endtime) && this.AdministeredstopDateTime.ToString("HH:mm").Equals("00:00", StringComparison.InvariantCultureIgnoreCase)) {
            this.OnCheckWarningMessage(Resource.InfRecAdministartion.InfRecMsg_EndTime, AdministrationField.Endtime);
            return false;
        }
    }
    let _dblPrescribedVolume: number = 0.0, _dblBagVolume = 0.0;
    if (!this._LstWarningMsgFields.Contains(AdministrationField.BagVolume) && !String.IsNullOrEmpty(this.PresVolme) && !String.IsNullOrEmpty(this.PresVolmeUOM) && !String.IsNullOrEmpty(this.BagVolume) && this.BagVolumeUOM != null && String.Equals(this.PresVolmeUOM, this.BagVolumeUOM.DisplayText, StringComparison.InvariantCultureIgnoreCase) && Number.TryParse(this.PresVolme, (o) => { _dblPrescribedVolume = o }) && Number.TryParse(this.BagVolume, (o) => { _dblBagVolume = o }) && _dblBagVolume != _dblPrescribedVolume) {
        this.OnCheckWarningMessage(Resource.InfRecAdministartion.InfRecMsg_BagVolume_vs_PrescribedVolume, AdministrationField.BagVolume);
        return false;
    }
    if (!this.IsAnyParacetamolAdministeredInGivenPeriod && this.InfusionAction.Equals(MedicationAction.BEGUN, StringComparison.InvariantCultureIgnoreCase) && this.IsParacetamolIngredient && DateTime.NotEquals(this.AdministeredDateTime , DateTime.MinValue) && this.sParacetamolRecentlyAdministered <= 0) {
        if (this.sParacetamolRecentlyAdministered == -1) {
            let oSlotHelper: SlotAdministrationHelper = new SlotAdministrationHelper();
            // oSlotHelper.TriggerParacetamolWarningEvent -= oSlotHelper_TriggerParacetamolWarningEvent;
            oSlotHelper.TriggerParacetamolWarningEvent = (s, e) => { this.oSlotHelper_TriggerParacetamolWarningEvent(false); };
            oSlotHelper.IsAnyParacetamolAdministered(this.AdministeredDateTime, this.PresScheduleOID);
            Busyindicator.SetStatusBusy("CheckParaAdministered");
            this.sParacetamolRecentlyAdministered = 0;
        }
        return false;
    }
    if (eMsgBoxResult == MessageBoxResult.None) {
        return true;
    }
    else {
        this.FormVM.ValidateAndSubmitForm();
        return false;
    }
}
oSlotHelper_TriggerParacetamolWarningEvent(bParacetamolAdministered: boolean): void {
    Busyindicator.SetStatusIdle("CheckParaAdministered");
    if(bParacetamolAdministered) {
        this.OnCheckWarningMessage(MedicationAdministrator.ParacetamolAdministration_WarningMsg, CConstants.ParacetamolRecentlyAdministered);
    }
          else {
        this.sParacetamolRecentlyAdministered = 1;
        this.CheckWarningMessages(AdministrationField.BeginTime, MessageBoxResult.Yes);
    }
}
      private _MedScanRecadminDetail: MedScanRecAdmVM;
      public get MedScanRecadminDetail(): MedScanRecAdmVM {
    return this._MedScanRecadminDetail;
}
      public set MedScanRecadminDetail(value: MedScanRecAdmVM) {
    this._MedScanRecadminDetail = value;
    // OnPropertyChanged("MedScanRecadminDetail");
}
      private _IsScanRecMedVisible: Visibility = Visibility.Collapsed;
      public get IsScanRecMedVisible(): Visibility {
    return this._IsScanRecMedVisible;
}
      public set IsScanRecMedVisible(value: Visibility) {
    if (this._IsScanRecMedVisible != value) {
        this._IsScanRecMedVisible = value;
        // OnPropertyChanged("IsScanRecMedVisible");
    }
}
      private _ItemType: string;
      public get ItemType(): string {
    return this._ItemType;
}
      public set ItemType(value: string) {
    this._ItemType = value;
    // OnPropertyChanged("ItemType");
}
      private _AdminMethod: string;
      public get AdminMethod(): string {
    return this._AdminMethod;
}
      public set AdminMethod(value: string) {
    this._AdminMethod = value;
    // OnPropertyChanged("AdminMethod");
}
      private _MultiRouteType: MultiRouteType;
      public get MultiRouteType(): MultiRouteType {
    return this._MultiRouteType;
}
      public set MultiRouteType(value: MultiRouteType) {
    this._MultiRouteType = value;
    // OnPropertyChanged("MultiRouteType");
}
      private _IsPatWristBandOverridden: boolean;
      public get IsPatWristBandOverridden(): boolean {
    return this._IsPatWristBandOverridden;
}
      public set IsPatWristBandOverridden(value: boolean) {
    this._IsPatWristBandOverridden = value;
    // OnPropertyChanged("IsPatWristBandOverridden");
}
      private _oDrugHeader: CDrugHeader;
      public get oDrugHeader(): CDrugHeader {
    return this._oDrugHeader;
}
      public set oDrugHeader(value: CDrugHeader) {
    this._oDrugHeader = value;
}
      private _ScanRecMedMultiRoute: MultiRouteType;
      public ScanRecMedMultiRoute: MultiRouteType;
      public IsCustomiseMedScan: boolean;
      public IsMedScanExcluded: boolean;
      private _IsMedExclude: boolean;
      public get IsMedExclude(): boolean {
    return this._IsMedExclude;
}
      public set IsMedExclude(value: boolean) {
    this._IsMedExclude = value;
}
      private _IsLaunchedFromScanMedlink: boolean;
      public get IsLaunchedFromScanMedlink(): boolean {
    return this._IsLaunchedFromScanMedlink;
}
      public set IsLaunchedFromScanMedlink(value: boolean) {
    this._IsLaunchedFromScanMedlink = value;
}
CopyProductDetailsInfo(source: ObservableCollection<ProductDetailsGrid>): ObservableCollection<ProductDetailsGrid>{
    let target = new ObservableCollection<ProductDetailsGrid>();
    for(let i = 0; i < source.Count; i++) {
        //target.Add(source[i]);
        var objProductdetailgrd: ProductDetailsGrid = new ProductDetailsGrid();
        objProductdetailgrd.Productscanned = source[i].Productscanned;
        objProductdetailgrd.Productcode = source[i].Productcode;
        objProductdetailgrd.Expirydate = source[i].Expirydate;
        objProductdetailgrd.Batchnumber = source[i].Batchnumber;
        objProductdetailgrd.Serialnumber = source[i].Serialnumber;
        objProductdetailgrd.Comments = source[i].Comments;
        objProductdetailgrd.IsPresFluidProduct = source[i].IsPresFluidProduct;
        objProductdetailgrd.IsExpiryDateEnabled = source[i].IsExpiryDateEnabled;
        objProductdetailgrd.IsBatchNumberEnabled = source[i].IsBatchNumberEnabled;
        objProductdetailgrd.IsSerialNumberEnabled = source[i].IsSerialNumberEnabled;
        objProductdetailgrd.PackageUOM = source[i].PackageUOM;
        objProductdetailgrd.PacKageUOMLZOID = source[i].PacKageUOMLZOID;
        objProductdetailgrd.PresItemStrengthUOM = source[i].PresItemStrengthUOM;
        objProductdetailgrd.PresItemStrengthValue = source[i].PresItemStrengthValue;
        objProductdetailgrd.PresItemDoseMultiplier = source[i].PresItemDoseMultiplier;
        objProductdetailgrd.PresItemDoseDivider = source[i].PresItemDoseDivider;
        objProductdetailgrd.IsProductEnabled = source[i].IsProductEnabled;
        objProductdetailgrd.ScanProductLZOID = source[i].ScanProductLZOID;
        objProductdetailgrd.UniqueID = source[i].UniqueID;
        target.Add(objProductdetailgrd);
    }
    return target;
  }
    public LaunchScanRecordMedication(): void {
    if(!this.CheckMandatoryBeforeScan() && !this.IsAvoidDoubleClick) {
    Busyindicator.SetStatusBusy("ScanRecordMed");
    this.IsAvoidDoubleClick = true;
    this.oMedScanRecAdmVM = new MedScanRecAdmVM();
    this.oMedScanRecordadministration = new MedScanRecordAdministration();
    //this.oMedScanRecordadministration.OnCloseMedScanMezEvent -= oMedScanRecordadministration_OnCloseMedScanMezEvent;
    this.SetVMProperties(this);
    //this.oMedScanRecAdmVM.OldProductDetailsInfo = ManageBarcodeHelper.DeepCopy<ObservableCollection<ProductDetailsGrid>>(this.oMedScanRecAdmVM.oProductDetailsInfo);
    this.oMedScanRecAdmVM.OldProductDetailsInfo = this.CopyProductDetailsInfo(this.oMedScanRecAdmVM.oProductDetailsInfo);

    this.oMedScanRecordadministration.oMedScanRecAdmVM = this.oMedScanRecAdmVM; 
    this.oMedScanRecordadministration.OnCloseMedScanMezEvent = () => { this.oMedScanRecordadministration_OnCloseMedScanMezEvent(); };
    this.oMedScanRecordadministration.onDialogClose = this.oMedScanRecordadministration_Closed;
    let Callback = (s, e) => {
        if (s != null && e != null) {
            this.oMedScanRecordadministration = s;
        }
    }
    AppActivity.OpenWindow(Resource.MedScanRecAdmin.Mez_Title, this.oMedScanRecordadministration, (s, e) => { this.oMedScanRecordadministration_Closed(s); }, Resource.MedScanRecAdmin.Mez_Title, false, 470, 1100, false, WindowButtonType.OkCancel, Callback);
}
      }
      private SetVMProperties(recordadminVM: InfrecordadminVM): void {
    this.oMedScanRecAdmVM.oDrugHeader = this.oDrugHeader;
    this.oMedScanRecAdmVM.MCVersion = recordadminVM.MCVersionNo;
    this.oMedScanRecAdmVM.lnPrescriptionOID = recordadminVM.PrescriptionItemOID;
    this.oMedScanRecAdmVM.SlotDose = !String.IsNullOrEmpty(recordadminVM.Dose) ? Convert.ToDouble(recordadminVM.Dose) : 0;
    this.oMedScanRecAdmVM.sDoseValUOM = !String.IsNullOrEmpty(recordadminVM.DoseUOMName) ? recordadminVM.DoseUOMName : String.Empty;
    this.oMedScanRecAdmVM.sDoseUOMLzoID = !String.IsNullOrEmpty(recordadminVM.doseUomLorenzoID) ? recordadminVM.doseUomLorenzoID : String.Empty;
    this.oMedScanRecAdmVM.TotaldoseUOM = !String.IsNullOrEmpty(recordadminVM.DoseUOMName) ? recordadminVM.DoseUOMName : String.Empty;
    this.oMedScanRecAdmVM.IsInfusionDrug = true;
    if(!String.IsNullOrEmpty(recordadminVM.FluidName) && recordadminVM.FluidName.length > 0) {
    this.oMedScanRecAdmVM.IsInfPrescribeWithFluid = true;
}
this.oMedScanRecAdmVM.PresScheduleOID = recordadminVM.PresScheduleOID;
this.oMedScanRecAdmVM.TotaldoseadministeredAmt = !String.IsNullOrEmpty(recordadminVM.Dose) ? recordadminVM.Dose : String.Empty;
if (recordadminVM.InfusionType != null && !String.IsNullOrEmpty(recordadminVM.InfusionType.Value) && String.Equals(recordadminVM.InfusionType.Value, InfusionTypeCode.SINGLEDOSEVOLUME, StringComparison.CurrentCultureIgnoreCase)) {
    this.oMedScanRecAdmVM.IsEnableTotalDoseValueAdmin = false;
}
else {
    this.oMedScanRecAdmVM.IsEnableTotalDoseValueAdmin = recordadminVM.IsEnableDose;
}
if (!String.IsNullOrEmpty(recordadminVM.AdminMethod) || (recordadminVM.InfusionType != null && !String.IsNullOrEmpty(recordadminVM.InfusionType.Value) && (String.Equals(recordadminVM.InfusionType.Value, InfusionTypeCode.CONTINUOUS, StringComparison.CurrentCultureIgnoreCase) || String.Equals(recordadminVM.InfusionType.Value, InfusionTypeCode.FLUID, StringComparison.CurrentCultureIgnoreCase))) || (!String.IsNullOrEmpty(recordadminVM.ItemType) && String.Equals(recordadminVM.ItemType, CConstants.Appliance, StringComparison.CurrentCultureIgnoreCase) && String.IsNullOrEmpty(recordadminVM.Dose) && String.IsNullOrEmpty(recordadminVM.DoseUOMName)) || String.Equals(recordadminVM.InfusionType.Value, InfusionTypeCode.PCA, StringComparison.CurrentCultureIgnoreCase)) {
    this.oMedScanRecAdmVM.IsVisibleTotalDoseValueAdmin = Visibility.Collapsed;
}
if (recordadminVM != null && recordadminVM.SelectedRoute != null && !String.IsNullOrEmpty(recordadminVM.SelectedRoute.Value)) {
    this.oMedScanRecAdmVM.RecMedRouteOID = Convert.ToInt64(recordadminVM.SelectedRoute.Value);
}
if (this.oMedScanRecAdmVM.oProductDetailsInfo == null) {
    this.oMedScanRecAdmVM.oProductDetailsInfo = new ObservableCollection<ProductDetailsGrid>();
}
if (recordadminVM.MedScanRecadminDetail != null) {
    this.oMedScanRecAdmVM.oProductDetailsInfo = recordadminVM.MedScanRecadminDetail.oProductDetailsInfo;
    this.oMedScanRecAdmVM.IsProductScanned = recordadminVM.MedScanRecadminDetail.IsProductScanned;
}
      }
oMedScanRecordadministration_Closed(args: AppDialogEventargs): void {
    Busyindicator.SetStatusIdle("ScanRecordMed");
    this.IsAvoidDoubleClick = false;
    if(args.Result == AppDialogResult.Ok) {
    	// this.oMedScanRecordadministration = ObjectHelper.CreateType<MedScanRecordAdministration>(args.Content.Component, MedScanRecordAdministration);
        this.oMedScanRecordadministration = args.Content.Component;
        //this.oMedScanRecAdmVM = ObjectHelper.CreateType<MedScanRecAdmVM>(this.oMedScanRecordadministration.DataContext, MedScanRecAdmVM);

        if (this.oMedScanRecAdmVM != null) {
            if (this.oMedScanRecAdmVM.IsProductScanned.Equals('M')) {
                //let lstProductDetailInfo: ObservableCollection<ProductDetailsGrid> = new ObservableCollection<ProductDetailsGrid>(this.oMedScanRecAdmVM.oProductDetailsInfo.Where(c => ((!String.IsNullOrEmpty(c.Productcode) && !String.IsNullOrWhiteSpace(c.Productcode)) || (c.Expirydate != DateTime.MinValue) || (!String.IsNullOrEmpty(c.Batchnumber) && !String.IsNullOrWhiteSpace(c.Batchnumber)) || (!String.IsNullOrEmpty(c.Serialnumber) && !String.IsNullOrWhiteSpace(c.Serialnumber)) || (!String.IsNullOrEmpty(c.Comments) && !String.IsNullOrWhiteSpace(c.Comments)))).Select(s => s));
                let lstProductDetailInfo: ObservableCollection<ProductDetailsGrid> = new ObservableCollection<ProductDetailsGrid>(this.oMedScanRecAdmVM.oProductDetailsInfo.Where(c => ((!String.IsNullOrEmpty(c.Productcode) && !String.IsNullOrWhiteSpace(c.Productcode)) || !(c.Expirydate == DateTime.MinValue || c.Expirydate == null) || (!String.IsNullOrEmpty(c.Batchnumber) && !String.IsNullOrWhiteSpace(c.Batchnumber)) || (!String.IsNullOrEmpty(c.Serialnumber) && !String.IsNullOrWhiteSpace(c.Serialnumber)) || (!String.IsNullOrEmpty(c.Comments) && !String.IsNullOrWhiteSpace(c.Comments)))).Select(s => s));
                this.oMedScanRecAdmVM.oProductDetailsInfo = lstProductDetailInfo;
            }
            this.MedScanRecadminDetail = this.oMedScanRecAdmVM;
            this.Dose = !String.IsNullOrEmpty(this.MedScanRecadminDetail.TotaldoseadministeredAmt) ? this.MedScanRecadminDetail.TotaldoseadministeredAmt : String.Empty;
            if (this.MedScanRecadminDetail != null && this.MedScanRecadminDetail.IsProductScanned == 'S' && this.MedScanRecadminDetail.oProductDetailsInfo != null && this.MedScanRecadminDetail.oProductDetailsInfo.Count > 0)
                MedChartData.IsMedScanSuccess = true;
            if (String.Equals(this.InfusionAction, MedicationAction.BEGUN, StringComparison.InvariantCultureIgnoreCase) || (String.Equals(this.InfusionAction, MedicationAction.CHANGEBAG, StringComparison.InvariantCultureIgnoreCase) && this.IsExists == 'N')) {
                if (this.MedScanRecadminDetail != null
                     && this.MedScanRecadminDetail.oProductDetailsInfo != null 
                     && this.MedScanRecadminDetail.oProductDetailsInfo.ContainObj( x=>x.Productscanned)
                    && this.MedScanRecadminDetail.oProductDetailsInfo.Count > 0) {
                    this.IsBatchenabled = false;
                    this.IsExpiryenabled = false;
                }
                else {
                    this.IsBatchenabled = true;
                    this.IsExpiryenabled = true;
                }
            }
            this.oMedScanRecordadministration.appDialog.DialogRef.close();
            this.oMedScanRecordadministration.dupDialogRef.close();
        }
    }
          else if (args.Result == AppDialogResult.Cancel) {
        this.oMedScanRecordadministration = args.Content.Component;
        this.CancelButtonClick();
    }
}
      public CancelButtonClick(): void {
    if(!this.oMedScanRecAdmVM.IsExpiryDTMsgShown) {
    let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
        Title: CConstants.MSGTitleName,
        Message: Resource.MedScanRecAdmin.Cancel_Msg,
        MessageButton: MessageBoxButton.YesNo,
        IconType: MessageBoxType.Question
    });
    iMsgBox.MessageBoxClose = (s, e) => { this.iCancelMsgBox_MessageBoxClose(s, e); };
    iMsgBox.Show();
}
      }
iCancelMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
    let IsProdScanned: boolean;
    if(e.MessageBoxResult == MessageBoxResult.Yes) {
        this.oMedScanRecAdmVM.oProductDetailsInfo = this.oMedScanRecAdmVM.OldProductDetailsInfo;
        if (this.oMedScanRecAdmVM.oProductDetailsInfo != null && this.oMedScanRecAdmVM.oProductDetailsInfo.Count == 0) {
            this.oMedScanRecAdmVM.IsProductScanned = 'N';
        }
        else if (this.oMedScanRecAdmVM.oProductDetailsInfo != null && this.oMedScanRecAdmVM.oProductDetailsInfo.Count > 0) {
            IsProdScanned = this.oMedScanRecAdmVM.oProductDetailsInfo.Any(x => !String.IsNullOrEmpty(x.Productscanned));
            if (IsProdScanned)
                this.oMedScanRecAdmVM.IsProductScanned = 'S';
            else this.oMedScanRecAdmVM.IsProductScanned = 'M';
        }
        this.MedScanRecadminDetail = this.oMedScanRecAdmVM;
        this.oMedScanRecordadministration.appDialog.DialogRef.close();
        this.oMedScanRecordadministration.dupDialogRef.close();
    }
          else {
        if(this.oMedScanRecordadministration != null) {
    this.oMedScanRecordadministration.txtMedBarcode.Focus();
}
          }
      }
      public CheckMandatoryBeforeScan(): boolean {
    let InfusionDose: number;
    Number.TryParse(this.Dose, (o) => { InfusionDose = o });
    if ((this.ScanRecMedMultiRoute != MultiRouteType.Single_Route) && this.SelectedRoute == null) {
        this.oMsg.Message = Resource.MedScanRecAdmin.MultiRoute_Msg;
        this.oMsg.IconType = MessageBoxType.Information;
        this.oMsg.Title = CConstants.MSGTitleName;
        this.oMsg.Tag = "route";
        this.oMsg.MessageButton = MessageBoxButton.OK;
        this.oMsg.MessageBoxClose = (s, e) => { this.oMsg_RouteORDoseMessageBoxClosed(s, e); };
        this.oMsg.Show();
        return true;
    }
    else if ((String.IsNullOrEmpty(this.AdminMethod) && !String.Equals(this.ItemType, CConstants.Appliance, StringComparison.CurrentCultureIgnoreCase)) && this.InfusionType != null && (String.Equals(this.InfusionType.Value, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.InfusionType.Value, InfusionTypeCode.SINGLEDOSEVOLUME, StringComparison.CurrentCultureIgnoreCase)) && InfusionDose == 0) {
        this.oMsg.Message = Resource.MedScanRecAdmin.DoseMand_Msg;
        this.oMsg.IconType = MessageBoxType.Information;
        this.oMsg.Title = CConstants.MSGTitleName;
        this.oMsg.Tag = "dose";
        this.oMsg.MessageBoxClose = (s, e) => { this.oMsg_RouteORDoseMessageBoxClosed(s, e); };
        this.oMsg.Show();
        return true;
    }
    else if (!this.IsMedExclude && this.IsCustomiseMedScan) {
        this.oMsg.Message = Resource.MedScanRecAdmin.ExcludedMed_Msg;
        this.oMsg.IconType = MessageBoxType.Information;
        this.oMsg.Title = CConstants.MSGTitleName;
        this.oMsg.Tag = "exclude";
        this.oMsg.MessageButton = MessageBoxButton.YesNo;
        this.oMsg.MessageBoxClose = (s, e) => { this.iExcludedMedMsgBox_MessageBoxClose(s, e); };
        this.oMsg.Show();
        this.IsMedExclude = true;
        return true;
    }
    else if (!MedChartData.IsPatWBBarcodeScanOverriden && !MedChartData.IsMedBarcodeScanOverriden && MedChartData.IsPatWBScanMandatory && !MedChartData.IsPatWBScanSuccess && !this.IsPatWristBandOverridden && (String.Equals(this.InfusionAction, MedicationAction.BEGUN) || String.Equals(this.InfusionAction, MedicationAction.CHANGEBAG))) {
        if (this.FormVM != null) {
            this.IsLaunchedFromScanMedlink = true;
            this.FormVM.LaunchOverrideScan();
        }
        return true;
    }
    return false;
}
oMsg_RouteORDoseMessageBoxClosed(sender: Object, e: EventArgs): void {

}
oMedScanRecordadministration_OnCloseMedScanMezEvent(): void {
    Busyindicator.SetStatusIdle("ScanRecordMed");
    this.IsAvoidDoubleClick = false;
    if(this.FormVM != null) {
    if (this.FormVM.lstCMedBarcodeScanOverrideDetail == null)
        this.FormVM.lstCMedBarcodeScanOverrideDetail = new ObservableCollection<CMedBarcodeScanOverrideDetail>();
    if (this.oMedScanRecAdmVM != null && this.oMedScanRecAdmVM.oMedBarScanOverideForInvalidORNotMatchProd != null) {
        this.FormVM.lstCMedBarcodeScanOverrideDetail.Add(this.oMedScanRecAdmVM.oMedBarScanOverideForInvalidORNotMatchProd);
        this.oMedScanRecAdmVM = null;
        this.MedScanRecadminDetail = null;
    }
}
      }
iExcludedMedMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
    if(e.MessageBoxResult == MessageBoxResult.Yes) {
        this.LaunchScanRecordMedication();
    }
          this.IsMedExclude = false;
}
      private _IsScanInfrecadminlinkenabled: boolean = true;
      public get IsScanInfrecadminlinkenabled(): boolean {
    return this._IsScanInfrecadminlinkenabled;
}
      public set IsScanInfrecadminlinkenabled(value: boolean) {
    if (this._IsScanInfrecadminlinkenabled != value) {
        this._IsScanInfrecadminlinkenabled = value;
        // OnPropertyChanged("IsScanInfrecadminlinkenabled");
    }
}
      private _IsBatchenabled: boolean = true;
      public get IsBatchenabled(): boolean {
    return this._IsBatchenabled;
}
      public set IsBatchenabled(value: boolean) {
    this._IsBatchenabled = value;
    // OnPropertyChanged("IsBatchenabled");
}
      private _IsExpiryenabled: boolean = true;
      public get IsExpiryenabled(): boolean {
    return this._IsExpiryenabled;
}
      public set IsExpiryenabled(value: boolean) {
    this._IsExpiryenabled = value;
    // OnPropertyChanged("IsExpiryenabled");
}
      private _IsExists: string = 'N';
      public get IsExists(): string {
    return this._IsExists;
}
      public set IsExists(value: string) {
    this._IsExists = value;
    // OnPropertyChanged("IsExists");
}
  }
export class PreviousActionValues {
    public IsClinicalRSNMand: boolean;
    public IsStopClinicalRSNMand: boolean;
}
