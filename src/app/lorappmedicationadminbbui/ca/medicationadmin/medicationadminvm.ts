import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, ScriptObject, OnCheckAccessEventArgs, SLSecurityAccess, MediatorDataService, AppLoadService} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, Visibility, HtmlPage, byte, int64 } from 'epma-platform/models';
import { AppDialog, EventArgs } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime, { DateTimeStyles } from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { LzoWizardVmbaseService as LzoWizardVMBase } from 'src/app/shared/epma-platform/services/lzo-wizard-vmbase.service';
import { AppContextInfo, AppSessionInfo, ContextInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { ChartContext, MedChartData } from '../../utilities/globalvariable';
import { Common } from '../../utilities/common';
import { UserPermissions } from '../../utilities/ProfileData';
import { CRole, GetRoleCompletedEventArgs } from 'src/app/shared/epma-platform/soap-client/CSecurityManagementServiceWS';
import { MedicationCommonProfileData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { Resource } from '../../resource';
import { CConstants, PrescriptionTypes, PrescriptionTypesMenuCode } from '../../utilities/CConstants';
import { MedicationPrescriptionHelper } from 'src/app/lorappmedicationcommonbb/utilities/medicationprescriptionhelper';
import { LockedUsersDetails, MedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { CommonDomainValues, WebServiceURLMedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import * as Application from '../../../lorappcommonbb/amshelper';
//import { ACNode } from 'src/app/shared/epma-platform/controls-model/iActivitityConsideration';
import { PrescriptionHelper } from '../../utilities/PrescriptionHelper';
import * as ManageAllergy from '../../../shared/epma-platform/soap-client/ManageAllergyWS';
import * as ManagePrescSer from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import * as ManageProblem from '../../../shared/epma-platform/soap-client/ManageProblemWS';
import * as QueryInpatient from 'src/app/shared/epma-platform/soap-client/QueryInpatientWS';
import { MedChartData as CommMedChartData } from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import{ LzoWizardAction} from 'src/app/lorappcommonbb/utilities/common';
import { CumulativeAdministration } from '../../model/cumulativeadministration';
import { ACNode } from 'src/app/shared/epma-platform/controls/epma-iactivityconsideration/epma-iactivityconsideration.component';
import { PropertyChangedEventArgs } from 'src/app/shared/epma-platform/controls/epma-tab/epma-tab.component';
import { IViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { InjectorInstance } from 'src/app/app.module';

    export class MedicationAdminVM extends LzoWizardVMBase implements IViewModelBase {

        private OnPropertyChanged(prop:string){
            let e:PropertyChangedEventArgs = { PropertyName:prop};
            this.PropertyChanged({},e);

        }
        //public delegate void InfAlertUnNoticedMsgDelegate();
        public InfAlertUnNoticedMsgEventCompleted: Function;
        IsActivityConsiderationOpened: boolean = false;
        private sDischargeDTTM: string;
        private sLeaveDTTM: string;
        private sPatientHtWtBSAText: string = String.Empty;
        public bFirstTime: boolean = true;
        //public delegate void ClosePrescribeCareActivityDelegate(string ClosedCA, string launchCA, bool IsAutoSaveGPC);
        public OnClosePrescribeCareActivity: Function;
        //public delegate void ActivityConsiderationUpdatedDelegate();
        public ActivityConsiderationUpdatedCompleted: Function;
        public _mediatorDataService: MediatorDataService;

        constructor(sTaskOID?: string);

        //constructor(sTaskOID?: string) {
          constructor() {
            super();
            this._mediatorDataService = InjectorInstance.get<MediatorDataService>(MediatorDataService);
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
            })
            this.CumulativeParacetamol = new CumulativeAdministration();
            switch (arguments.length) {
                case 1:
                    //super(sTaskOID);
                    this.CumulativeParacetamol = new CumulativeAdministration();
                  break;
              }
              this.OnInitialize();
              this.OnInitComplete();
        }
        public IsOpenReadOnly: boolean = false;
        private _sLastCACode: string = String.Empty;
        public get sLastCACode(): string {
            return this._sLastCACode;
        }
        public set sLastCACode(value: string) {
            this._sLastCACode = value;
        }
        private _MedsAdminChartViewClosed: string = String.Empty;
        public get MedsAdminChartViewClosed(): string {
            return this._MedsAdminChartViewClosed;
        }
        public set MedsAdminChartViewClosed(value: string) {
            this._MedsAdminChartViewClosed = value;
            this.OnPropertyChanged("MedsAdminChartViewClosed");
        }
        private _MedsAdminChartViewClosedCancel: string = String.Empty;
        public get MedsAdminChartViewClosedCancel(): string {
            return this._MedsAdminChartViewClosedCancel;
        }
        public set MedsAdminChartViewClosedCancel(value: string) {
            this._MedsAdminChartViewClosedCancel = value;
            this.OnPropertyChanged("MedsAdminChartViewClosedCancel");
        }
        private _MedsAdminTVClosed: string = String.Empty;
        public get MedsAdminTVClosed(): string {
            return this._MedsAdminTVClosed;
        }
        public set MedsAdminTVClosed(value: string) {
            this._MedsAdminTVClosed = value;
            this.OnPropertyChanged("MedsAdminTVClosed");
        }
        private _MedsAdminTVClosedCancel: string = String.Empty;
        public get MedsAdminTVClosedCancel(): string {
            return this._MedsAdminTVClosedCancel;
        }
        public set MedsAdminTVClosedCancel(value: string) {
            this._MedsAdminTVClosedCancel = value;
            this.OnPropertyChanged("MedsAdminTVClosedCancel");
        }
        private _RequestMedicationClosed: string = String.Empty;
        public get RequestMedicationClosed(): string {
            return this._RequestMedicationClosed;
        }
        public set RequestMedicationClosed(value: string) {
            this._RequestMedicationClosed = value;
            this.OnPropertyChanged("RequestMedicationClosed");
        }
        private _RequestMedicationClosedCancel: string = String.Empty;
        public get RequestMedicationClosedCancel(): string {
            return this._RequestMedicationClosedCancel;
        }
        public set RequestMedicationClosedCancel(value: string) {
            this._RequestMedicationClosedCancel = value;
            this.OnPropertyChanged("RequestMedicationClosedCancel");
        }
        private _Menucodeallergy: string = String.Empty;
        public get Menucodeallergy(): string {
            return this._Menucodeallergy;
        }
        public set Menucodeallergy(value: string) {
            this._Menucodeallergy = value;
        }
        //public delegate void LaunchRecordPGDafterAllchk();
        public OnRecordPGDlaunch: Function;
        //public delegate void LaunchInpatientAfterClerk();
        public OnInpatientlaunch: Function;
        //public delegate void LaunchClerkSourceafterAllergy(string EncID, string EncType);
        public OnClerkSourceLaunch: Function;
        public IsRecordPGDLaunchedFromInfusionChart: boolean;
        public RecAllergyCallback: () => void;
        public override GetChildWizardData(sData: string): void {
            let SetAppsession: ScriptObject = null;
            let eWizardAction: LzoWizardAction = CommonBB.GetWizardAction(sData);
            if (!String.IsNullOrEmpty(this.sLastCACode) && (String.Compare(this.sLastCACode, "MN_MEDINPATSL_P2") == 0 || String.Compare(this.sLastCACode, "MN_MEDADMINISTRAT_P2") == 0) && !String.IsNullOrEmpty(sData)) {
                HtmlPage.Window.Invoke("DeactivatePessimisticLock", MedChartData.MedChartOID, "MedPrescribeInpatient", Common.nLockDuration);
                if (eWizardAction == LzoWizardAction.Finish || eWizardAction == LzoWizardAction.FinishNow) {
                    if (String.Equals(this.sLastCACode, "MN_MEDINPATSL_P2", StringComparison.InvariantCultureIgnoreCase)) {
                        MedChartData.RefreshTriggeredCACode = "MN_MEDINPATSL_P2";
                        let _tmpRecAllergy: string = CommonBB.GetValueFromWizardContext(sData, "RecAllergy");
                        if (!String.IsNullOrEmpty(_tmpRecAllergy)) {
                            CommMedChartData.IsAllergyRecorded = String.Equals(_tmpRecAllergy, "True", StringComparison.InvariantCultureIgnoreCase);
                        }
                        if (!String.IsNullOrEmpty(sData)) {
                            let _CanLaunchClerkChk: string = CommonBB.GetValueFromWizardContext(sData, "CanLaunchClerkingPrescription");
                            if (!String.IsNullOrEmpty(_CanLaunchClerkChk) && String.Equals(_CanLaunchClerkChk, "true", StringComparison.InvariantCultureIgnoreCase) && this.OnClosePrescribeCareActivity != null) {
                                this.OnClosePrescribeCareActivity(this.sLastCACode, PrescriptionTypesMenuCode.Clerking, true);
                            }
                        }
                    }
                    this.MedsAdminChartViewClosed = sData;
                }
                else if (eWizardAction == LzoWizardAction.Cancel) {
                    this.MedsAdminChartViewClosedCancel = sData;
                    MedChartData.PatinetInfo = Common.GetPatientInfo();
                    this.SetHeightweightPopUp();
                    if (this.ActivityConsiderationUpdatedCompleted != null)
                        this.ActivityConsiderationUpdatedCompleted();
                }
                let _LockedUsersDetails: LockedUsersDetails;
                let IsLock: boolean = MedicationCommonBB.IsLockedByAnotherUser(CConstants.MedChart, true, (o) => { _LockedUsersDetails = o; });
                if (!String.IsNullOrEmpty(_LockedUsersDetails.ErrorCode) && !String.IsNullOrEmpty(_LockedUsersDetails.WarningMessage)) {
                    let _sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", MedChartData.MedChartOID, "MAMedChart", Common.nLockDuration), String);
                }
            }
            else if (!String.IsNullOrEmpty(this.sLastCACode) && String.Compare(this.sLastCACode, "MN_MED_VALIDATE_S_P2") == 0 && !String.IsNullOrEmpty(sData)) {
                if (eWizardAction == LzoWizardAction.Finish || eWizardAction == LzoWizardAction.FinishNow) {
                    MedChartData.RefreshTriggeredCACode = "MN_MED_VALIDATE_S_P2";
                    MedChartData.CalledFrom = CommonBB.GetValueFromWizardContext(sData, "CallingFrom");
                    this.MedsAdminTVClosed = sData;
                }
                else if (eWizardAction ==LzoWizardAction.Cancel) {
                    this.MedsAdminTVClosedCancel = sData;
                }
            }
            else if (!String.IsNullOrEmpty(this.sLastCACode) && String.Compare(this.sLastCACode, "MN_HI_CONFALRGY") == 0 && !String.IsNullOrEmpty(sData)) {
                if (eWizardAction == LzoWizardAction.Finish) {
                    let EncounterOID: string = String.Empty;
                    let EncounterType: string = String.Empty;
                    this.WizardContext["IsAllergyPrompted"] = "True";
                    this.WizardContext["IsLaunched"] = "true";
                    super.RenderBanner(super.objTaskInfo);
                    SetAppsession = ObjectHelper.CreateType<ScriptObject>(HtmlPage.Window.Invoke("SetAppsession", "True", PatientContext.EncounterOid, PatientContext.PatientOID), ScriptObject);
                    if (!String.IsNullOrEmpty(this.Menucodeallergy) && String.Equals(this.Menucodeallergy, "MN_RECORDPGD_P2", StringComparison.CurrentCultureIgnoreCase)) {
                        if (this.IsRecordPGDLaunchedFromInfusionChart && this.RecAllergyCallback != null) {
                            this.RecAllergyCallback();
                            this.IsRecordPGDLaunchedFromInfusionChart = false;
                            if (this.OnRecordPGDlaunch != null)
                                this.OnRecordPGDlaunch = null;
                        }
                        else if (this.OnRecordPGDlaunch != null) {
                            this.OnRecordPGDlaunch();
                        }
                    }
                    else {
                        if (PatientContext.EncounterOid > 0) {
                            EncounterOID = PatientContext.EncounterOid.ToString();
                        }
                        if (!String.IsNullOrEmpty(PatientContext.EncounterType)) {
                            EncounterType = PatientContext.EncounterType;
                        }
                        if (this.OnClerkSourceLaunch != null && !String.IsNullOrEmpty(EncounterOID) && !String.IsNullOrEmpty(EncounterType))
                            this.OnClerkSourceLaunch(EncounterOID, EncounterType);
                    }
                }
            }
            else if (!String.IsNullOrEmpty(this.sLastCACode) && (String.Compare(this.sLastCACode, "MN_MEDCLERKSL_P2") == 0) && !String.IsNullOrEmpty(sData)) {
                let _sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", PatientContext.EncounterOid, "MedPrescribeClerking", Common.nLockDuration), String);
                this.WizardContext["CanLaunchClerkingPrescription"] = "false";
                if (eWizardAction == LzoWizardAction.Finish || eWizardAction == LzoWizardAction.FinishNow) {
                    this.WizardContext["IsAllergyPrompted"] = "True";
                    this.WizardContext["IsLaunched"] = "true";
                   super.RenderBanner(super.objTaskInfo);
                    let _CanLaunchInpatientChk: string = CommonBB.GetValueFromWizardContext(sData, "CanLaunchForadminPrescription");
                    let _CanShownDIConPrmptInGPCTAB: string = CommonBB.GetValueFromWizardContext(sData, "CanShownDIConPrmptInGPCTAB");
                    if (String.Equals(_CanShownDIConPrmptInGPCTAB, "true", StringComparison.InvariantCultureIgnoreCase)) {
                        Common.GPCConsentVerifyStatus = "1";
                    }
                    else {
                        Common.GPCConsentVerifyStatus = "0";
                    }
                    if (this.OnInpatientlaunch != null && (Common.IsCanLaunchIPFromClerkPrompt || (!String.IsNullOrEmpty(_CanLaunchInpatientChk) && String.Equals(_CanLaunchInpatientChk, "true", StringComparison.InvariantCultureIgnoreCase)))) {
                        Common.IsCanLaunchIPFromClerkPrompt = false;
                        let _LockedUsersDetails: LockedUsersDetails;
                        let IsLocked: boolean = MedicationCommonBB.IsLockedByAnotherUser(PrescriptionTypesMenuCode.Inpatient, true, (o) => { _LockedUsersDetails = o; });
                        if (_LockedUsersDetails != null && !String.IsNullOrEmpty(_LockedUsersDetails.ErrorCode) && !String.IsNullOrEmpty(_LockedUsersDetails.WarningMessage)) {
                            let msg: iMessageBox;
                            if (!String.IsNullOrEmpty(_LockedUsersDetails.ErrorCode) && String.Equals(_LockedUsersDetails.ErrorCode, CConstants.LockErrorcode, StringComparison.InvariantCultureIgnoreCase)) {
                                msg = new iMessageBox();
                                msg.Title = "Lorenzo";
                                msg.MessageButton = MessageBoxButton.OK;
                                msg.Message = _LockedUsersDetails.WarningMessage;
                                msg.Show();
                                return
                            }
                            else if (!String.IsNullOrEmpty(_LockedUsersDetails.ErrorCode) && String.Equals(_LockedUsersDetails.ErrorCode, CConstants.ReadOnlyErrorcode, StringComparison.InvariantCultureIgnoreCase)) {

                            }
                            else if (!String.IsNullOrEmpty(_LockedUsersDetails.ErrorCode) && String.Equals(_LockedUsersDetails.ErrorCode, CConstants.WarningErrorcode, StringComparison.InvariantCultureIgnoreCase)) {
                                msg = new iMessageBox();
                                msg.Title = "Lorenzo";
                                msg.MessageButton = MessageBoxButton.YesNo;
                                msg.MessageBoxClose  = (s,e) => { this.InpatientClickWarning_MessageBoxClose(s,e); } ;
                                msg.Message = _LockedUsersDetails.WarningMessage;
                                msg.Show();
                            }
                        }
                        else {
                            let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", MedChartData.MedChartOID, "MedPrescribeInpatient", Common.nLockDuration), String);
                            this.OnInpatientlaunch();
                        }
                    }
                }
                else if (eWizardAction == LzoWizardAction.Cancel) {
                    Common.IsCanLaunchIPFromClerkPrompt = false;
                }
            }
            else if (!String.IsNullOrEmpty(sData) && ((!String.IsNullOrEmpty(this.sLastCACode) && String.Equals(this.sLastCACode, CConstants.RequestMedication)) || (String.Equals(CommonBB.GetValueFromWizardContext(sData, "MenuCode"), CConstants.RequestMedication)))) {
                if (eWizardAction == LzoWizardAction.Finish) {
                    MedChartData.RefreshTriggeredCACode = "MN_MED_REQUEST";
                    MedChartData.IsReloadChartReqFromReqMedCA = String.Equals(CommonBB.GetValueFromWizardContext(sData, "LaunchFrom"), CConstants.NonInfRecAdminCACode);
                    MedChartData.CalledFrom = CommonBB.GetValueFromWizardContext(sData, "CallingFrom");
                    this.RequestMedicationClosed = sData;
                }
                else if (eWizardAction == LzoWizardAction.Cancel) {
                    this.RequestMedicationClosedCancel = sData;
                }
                
                MedChartData.IsReqMedCAlaunched = false;
            }
        }
        InpatientClickWarning_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
            if (e.MessageBoxResult == MessageBoxResult.Yes) {
                let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", MedChartData.MedChartOID, "MedPrescribeInpatient", Common.nLockDuration), String);
                this.OnInpatientlaunch();
            }
        }
        private _cumulativeParacetamol: CumulativeAdministration;
        public get CumulativeParacetamol(): CumulativeAdministration {
            return this._cumulativeParacetamol;
        }
        public set CumulativeParacetamol(value: CumulativeAdministration) {
            if (this._cumulativeParacetamol != value) {
                this._cumulativeParacetamol = value;
                // OnPropertyChanged("CumulativeParacetamol");
            }
        }
        public isCheckAccess_OnCompleted :boolean = false;
        CheckAccessCompleted:Function;
        public override OnInitialize(): void {
            this.isCheckAccess_OnCompleted=false;
            let arrResourceNames: string[] = ["MED_RECORD_PGD_P2","MED_MNG_SELF_ADMI_P2", "MN_MEDADMIN_P2", "MN_PrintMedChart_P2", "MN_MGPRESCR_P2", "MN_MED_VALIDATE_S_P2", CConstants.RequestMedication];
            SLSecurityAccess.CheckAccess("CA", arrResourceNames, (s, e) => this.CheckAccess_OnCompleted(s, e));
            super.IsButtonCancelVisible = Visibility.Collapsed;
            super.OnInitialize();
            if (!String.IsNullOrEmpty(WebServiceURLMedicationCommonBB.ManageSecurityWS)) {
                MedicationPrescriptionHelper.GetRoleDetails(this.ProxyService_GetRoleCompleted);
            }
        }
        ProxyService_GetRoleCompleted(sender: Object, e: GetRoleCompletedEventArgs): void {
            if (e != null && e.Result != null && e.Result.objRoles != null && e.Result.objRoles.Count > 0) {
                let _Role: CRole = e.Result.objRoles.FirstOrDefault();
                if (_Role != null && _Role.OID > 0) {
                    AppContextInfo.JobRoleOID = _Role.OID.ToString();
                }
            }
        }
        private CheckAccess_OnCompleted(sender: Object, Result: OnCheckAccessEventArgs): void {
            if (Result.AccResources != null) {
                let nCount: number = Result.AccResources.length;
                for (let i: number = 0; i < nCount; i++) {
                    switch (Result.AccResources[i]) {
                        case "MED_RECORD_PGD_P2":
                            UserPermissions.CanRecordPGD = true;
                            break;
                        case "MED_MNG_SELF_ADMI_P2":
                            UserPermissions.CanmanageSelfadministration = true;
                            break;
                        case "MN_MEDADMIN_P2":
                            UserPermissions.CanManageMedAdministration = true;
                            break;
                        case "MN_PrintMedChart_P2":
                            UserPermissions.CanPrintMedChart = true;
                            break;
                        case "MN_MGPRESCR_P2":
                            UserPermissions.CanPrescribe = true;
                            break;
                        case "MN_MED_VALIDATE_S_P2":
                            UserPermissions.CanTechnicallyValidate = true;
                            break;
                        case CConstants.RequestMedication:
                            UserPermissions.CanRequestMedication = true;
                            break;
                    }
                }
            }
            this.isCheckAccess_OnCompleted=true;
            if( this.CheckAccessCompleted!=null)
                this.CheckAccessCompleted();
        }
        public override OnInitComplete(): void {
            super.OnInitComplete();
            if (ContextManager.Instance["FRC-001-CHILD"] != null)
                Common.Frc001Childs = ContextManager.Instance["FRC-001-CHILD"].ToString();
            if (ContextManager.Instance["FRC-002-CHILD"] != null)
                Common.Frc002Childs = ContextManager.Instance["FRC-002-CHILD"].ToString();
            if (ContextManager.Instance["FRC-003-CHILD"] != null)
                Common.Frc003Childs = ContextManager.Instance["FRC-003-CHILD"].ToString();
            if (ContextManager.Instance["FRQ-88-CHILD"] != null)
                Common.Frq88Childs = ContextManager.Instance["FRQ-88-CHILD"].ToString();
            let lnPatOID: number, lnEncOID, lnMergePatOID;
            let sDOB: DateTime= DateTime.MinValue;
            let bFBDUAvailable: boolean = false;
            if (!String.IsNullOrEmpty(this.WizardContext["IsOpenReadOnly"]) && (this.WizardContext["IsOpenReadOnly"] == "True" ||  this.WizardContext["IsOpenReadOnly"] == "true")) {
                MedChartData.IsMedChartReadOnly = true; 
            }
            else {
                MedChartData.IsMedChartReadOnly = false;
            }
            if (!String.IsNullOrEmpty(this.WizardContext["IsLaunchFrmPrescribe"]) && (this.WizardContext["IsLaunchFrmPrescribe"] == "True" || this.WizardContext["IsLaunchFrmPrescribe"] == "true")) {
                MedChartData.IsLaunchFrmPrescribe = true;
            }
            else {
                MedChartData.IsLaunchFrmPrescribe = false;
            }
            if (ContextManager.Instance["MedchartLaunchLoc"] != null && !String.IsNullOrEmpty(ContextManager.Instance["MedchartLaunchLoc"].ToString()))
                ChartContext.MedchartLaunchLoc = ContextManager.Instance["MedchartLaunchLoc"].ToString();
            if (ContextManager.Instance["PatientID"] != null && Number.TryParse(ContextManager.Instance["PatientID"].ToString(), (o) => { lnPatOID = o; }))
                PatientContext.PatientOID = lnPatOID;
            if (ContextManager.Instance["PatientPASID"] != null && !String.IsNullOrEmpty(ContextManager.Instance["PatientPASID"].ToString()))
                PatientContext.PatientPASID = ContextManager.Instance["PatientPASID"].ToString();
            if (ContextManager.Instance["IsPatWBScanSuccess"] != null && !String.IsNullOrEmpty(ContextManager.Instance["IsPatWBScanSuccess"].ToString()))
                MedChartData.IsPatWBScanSuccess = ContextManager.Instance["IsPatWBScanSuccess"].ToString() == "1" ? true : false;
            else MedChartData.IsPatWBScanSuccess = false;
            if (ContextManager.Instance["IsPatWBScanMandatory"] != null && !String.IsNullOrEmpty(ContextManager.Instance["IsPatWBScanMandatory"].ToString()))
                MedChartData.IsPatWBScanMandatory = ContextManager.Instance["IsPatWBScanMandatory"].ToString() == "1" ? true : false;
            else MedChartData.IsPatWBScanMandatory = false;
            if (ContextManager.Instance["IsMedScanMandatory"] != null && !String.IsNullOrEmpty(ContextManager.Instance["IsMedScanMandatory"].ToString()))
                MedChartData.IsMedScanMandatory = ContextManager.Instance["IsMedScanMandatory"].ToString() == "1" ? true : false;
            else MedChartData.IsMedScanMandatory = false;
            if (ContextManager.Instance["EncounterOID"] != null && Number.TryParse(ContextManager.Instance["EncounterOID"].ToString(), (o) => { lnEncOID = o; }))
                PatientContext.EncounterOid = lnEncOID;
            if (ContextManager.Instance["EncounterType"] != null && !String.IsNullOrEmpty(ContextManager.Instance["EncounterType"].ToString()))
                PatientContext.EncounterType = ContextManager.Instance["EncounterType"].ToString();
            if (!String.IsNullOrEmpty(this.WizardContext["PatientAge"])) {
                PatientContext.PatientAge = this.WizardContext["PatientAge"].ToString();
            }
            else if (ContextManager.Instance["PatientAge"] != null && !String.IsNullOrEmpty(ContextManager.Instance["PatientAge"].ToString())) {
                PatientContext.PatientAge = ContextManager.Instance["PatientAge"].ToString();
            }
            PatientContext.DOB = String.Empty;
            if (!String.IsNullOrEmpty(ChartContext.MedchartLaunchLoc) && String.Equals(ChartContext.MedchartLaunchLoc, "ClinicalIndicator", StringComparison.InvariantCultureIgnoreCase)) {
                if (!String.IsNullOrEmpty(this.WizardContext["PatientDOB"]) && DateTime.TryParse(this.WizardContext["PatientDOB"].ToString(), (o) => { sDOB = o; })) {
                    // PatientContext.DOB = (sDOB != DateTime.MinValue) ? sDOB.ToString() : String.Empty;
                    PatientContext.DOB = (DateTime.NotEquals(sDOB, DateTime.MinValue)) ? sDOB.ToString() : String.Empty;
                }
            }
            else if (!String.IsNullOrEmpty(this.WizardContext["PatientDOB"]) && DateTime.TryParse(this.WizardContext["PatientDOB"].ToString(), (o) => { sDOB = o; })) {
                // PatientContext.DOB = (sDOB != DateTime.MinValue) ? sDOB.ToString() : String.Empty;
                PatientContext.DOB = (DateTime.NotEquals(sDOB, DateTime.MinValue))? sDOB.ToString() : String.Empty;

            }
            else if (ContextManager.Instance["DOB"] != null && DateTime.TryParse(ContextManager.Instance["DOB"].ToString(), (o) => { sDOB = o; })) {
                // PatientContext.DOB = (sDOB != DateTime.MinValue) ? sDOB.ToString() : String.Empty;
                PatientContext.DOB = (DateTime.NotEquals(sDOB,DateTime.MinValue)) ? sDOB.ToString() : String.Empty;

            }
            if (ContextManager.Instance["MergedPatientOID"] != null && Number.TryParse(ContextManager.Instance["MergedPatientOID"].ToString(), (o) => { lnMergePatOID = o; }))
                PatientContext.MergedPatientOID = lnMergePatOID;
            if (ContextManager.Instance["FRC-001-CHILD"] != null)
                Common.Frc001Childs = ContextManager.Instance["FRC-001-CHILD"].ToString();
            if (ContextManager.Instance["FRC-002-CHILD"] != null)
                Common.Frc002Childs = ContextManager.Instance["FRC-002-CHILD"].ToString();
            if (ContextManager.Instance["FRC-003-CHILD"] != null)
                Common.Frc003Childs = ContextManager.Instance["FRC-003-CHILD"].ToString();
            if (ContextManager.Instance["FRQ-88-CHILD"] != null)
                Common.Frq88Childs = ContextManager.Instance["FRQ-88-CHILD"].ToString();
            PatientContext.Sex = ContextManager.Instance["Sex"].ToString();
            PatientContext.PrescriptionType = this.WizardContext["PrescType"];
            AppContextInfo.OrganisationName = ContextManager.Instance["OrganisationName"].ToString();
            AppContextInfo.JobRoleOID = ContextManager.Instance["JobRoleOID"].ToString();
            AppContextInfo.RoleProfileName = ContextManager.Instance["RoleProfileName"].ToString();
            AppSessionInfo.AMCV = ContextManager.Instance["AMCV"].ToString();
            if (ContextManager.Instance["TeamNames"] != null)
                AppContextInfo.TeamNames = ContextManager.Instance["TeamNames"].ToString();
            if (ContextManager.Instance["TeamOIDs"] != null)
                AppContextInfo.TeamOIDs = ContextManager.Instance["TeamOIDs"].ToString();
           // ContextInfo.SecurityToken = super.AppContext.SecurityToken;
            AppContextInfo.JobRoleName = ContextManager.Instance["JobRoleName"].ToString();
            AppContextInfo.UserName = ContextManager.Instance["UserName"].ToString();
            AppContextInfo.UserOID = ContextManager.Instance["UserOID"].ToString();
            let objUserOid: int64;
            Int64.TryParse(super.AppContext.UserOID, (o) => { objUserOid = o; });
            ContextInfo.UserOID = objUserOid;
            AppContextInfo.OrganisationOID = super.AppContext.OrganisationOID;
            let objReleaseVer: byte;
            Byte.TryParse(super.AppContext.ReleaseVersion, (o) => { objReleaseVer = o; });
            ContextInfo.ReleaseVersion = objReleaseVer;
            PatientContext.EncounterCode = this.WizardContext["EncStatus"];
            ContextManager.Instance.Add("FromFB", this.WizardContext["FromFB"]);
            if (String.Compare(this.WizardContext["FromFB"], "true") == 0) {
                bFBDUAvailable = true;
                UserPermissions.CanEnableFBChart = false;
            }
            else {
                UserPermissions.CanEnableFBChart = true;
            }
            if (ContextManager.Instance["FBDU"] != null && (String.Compare(ContextManager.Instance["FBDU"].ToString(), "TRUE") == 0))
                bFBDUAvailable = true;
            if (bFBDUAvailable && PrescriptionHelper.CheckPermission("OBS_FBView", "Can view fluid balance charts"))
                UserPermissions.CanViewFBChart = true;
            else UserPermissions.CanViewFBChart = false;
            MedChartData.ListOfEventsWithNotKnownStatus = null;
        }
        public override OnFinish(): void {
            ObjectHelper.stopScreenFreezeEvent(true);
            this.WizardContext["RequestLockOID"] = MedChartData.MedChartOID > 0 ? Convert.ToString(MedChartData.MedChartOID) : Convert.ToString(ChartContext.EncounterOID);
            if (MedChartData.MedChartOID != 0 && !String.IsNullOrEmpty(MedChartData.ChartStatus) && String.Compare(MedChartData.ChartStatus, CConstants.sChartInActiveStatusCode, StringComparison.CurrentCultureIgnoreCase) != 0 && ChartContext.IsInfusionAlertsNotReviewed) {
                if (!MedChartData.IsMedChartReadOnly) {
                    if (this.InfAlertUnNoticedMsgEventCompleted != null)
                        this.InfAlertUnNoticedMsgEventCompleted();
                    this.ContextPrep();
                }
                else {
                    if (CommMedChartData.IsAllergyRecorded) {
                        this.WizardContext["RecAllergy"] = Convert.ToString(CommMedChartData.IsAllergyRecorded);
                        CommMedChartData.IsAllergyRecorded = false;
                    }
                    this.ContextPrep();
                    super.OnCloseCA();
                }
            }
            else if (!MedChartData.IsMedChartReadOnly && !String.IsNullOrEmpty(ChartContext.MedchartLaunchLoc) && String.Equals(ChartContext.MedchartLaunchLoc, CConstants.ClinicalIndicator, StringComparison.InvariantCultureIgnoreCase)) {
                let oCommon: Common = new Common();
                oCommon.InvokeDueAndOverDueStatusForClIndicator(this.ClinicalIndicatorUpdateSvcCallback);
                this.ContextPrep();
            }
            else {
                if (CommMedChartData.IsAllergyRecorded) {
                    this.WizardContext["RecAllergy"] = Convert.ToString(CommMedChartData.IsAllergyRecorded);
                    // super.WizardContext["RecAllergy"] = Convert.ToString(CommMedChartData.IsAllergyRecorded);
                    CommMedChartData.IsAllergyRecorded = false;
                }
                this.ContextPrep();
                super.OnCloseCA();
            }
        }
        public ClinicalIndicatorUpdateSvcCallback(): void {
            super.OnFinish();
        }
        public DoCleanUP(): void {
            this.DisposeVMEvents();
            this.DisposeVMObjects();
        }
        private DisposeVMEvents(): void {
            // if (this.ActivityConsideration != null) {
            //     this.ActivityConsideration.OnPopupOpen -= ActivityConsideration_OnPopupOpen;
            //     this.ActivityConsideration.OnNodeItemClick -= ActivityConsideration_OnNodeItemClick;
            // }
            // Application.CommonBB.PatientBSADataCompletedEvent -= CommonBB_PatientBSADataCompletedEvent;
        }
        private DisposeVMObjects(): void {
            this.InfAlertUnNoticedMsgEventCompleted = null;
            MedChartData.PatinetInfo = null;
            MedChartData.oPrescriptionItemViewVM = null;
            MedChartData.MedEncounter = null;
            MedChartData.oMedAdminVM = null;
            MedChartData.ListOfEventsWithNotKnownStatus = null;
            MedChartData.IsPatWBScanSuccess = false;
            MedChartData.IsMedScanSuccess = false;
            MedChartData.IsPatWBScanMandatory = false;
            MedChartData.IsMedScanMandatory = false;
            MedChartData.IsPatWBBarcodeScanOverriden = false;
            MedChartData.IsMedBarcodeScanOverriden = false;
        }
        private _PatientHtWtBSAText: string;
        public get PatientHtWtBSAText(): string {
            return this._PatientHtWtBSAText;
        }
        public set PatientHtWtBSAText(value: string) {
            if (this._PatientHtWtBSAText != value) {
                this._PatientHtWtBSAText = value;
                // OnPropertyChanged("PatientHtWtBSAText");
            }
        }
        private _HeightWeightIndText: string;
        public get HeightWeightIndText(): string {
            return this._HeightWeightIndText;
        }
        public set HeightWeightIndText(value: string) {
            if (this._HeightWeightIndText != value) {
                this._HeightWeightIndText = value;
                // OnPropertyChanged("HeightWeightIndText");
            }
        }
        private _IsVisibleHWIndicator: Visibility = Visibility.Collapsed;
        public get IsVisibleHWIndicator(): Visibility {
            return this._IsVisibleHWIndicator;
        }
        public set IsVisibleHWIndicator(value: Visibility) {
            if (this._IsVisibleHWIndicator != value) {
                this._IsVisibleHWIndicator = value;
                // OnPropertyChanged("IsVisibleHWIndicator");
            }
        }
        public SetHeightweightPopUp(): void {
            if (MedicationCommonProfileData.PrescribeConfig != null && MedicationCommonProfileData.PrescribeConfig.EnableDoseCalc && MedicationCommonProfileData.PrescribeConfig.HeightWeightChangeAlert) {
                let result: string;
                let Encounterid: number = PatientContext.EncounterOid;
                let Pationtid: number = PatientContext.PatientOID;
                let dtRecordHWDTTM: DateTime= DateTime.MinValue;
                let dtLeastPresItemDCDTTM: DateTime= DateTime.MinValue;
                result = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("GetDoseCalcDateTime", Pationtid, Encounterid, "CC_FOR_ADMIN"), 'string');
                if (!String.IsNullOrEmpty(result)) {
                    //DateTime.TryParse(result, (o) => { dtLeastPresItemDCDTTM = o; });
                    DateTime.TryParseExact(
                        result, 
                        'dd/MM/yyyy',
                        'en_GB',
                        DateTimeStyles.None,
                        (o) => { dtLeastPresItemDCDTTM = o; });
                    if(MedChartData.PatinetInfo != null) {
                        dtRecordHWDTTM = DateTime.GreaterThanOrEqualTo(MedChartData.PatinetInfo.DCHTRecordDTTM , MedChartData.PatinetInfo.DCWTRecordDTTM) ? MedChartData.PatinetInfo.DCHTRecordDTTM : MedChartData.PatinetInfo.DCWTRecordDTTM;
                    }
                    // if (dtRecordHWDTTM != DateTime.MinValue && dtLeastPresItemDCDTTM != DateTime.MinValue && dtLeastPresItemDCDTTM < dtRecordHWDTTM) {
                    if (DateTime.NotEquals(dtRecordHWDTTM,DateTime.MinValue) && (DateTime.NotEquals(dtLeastPresItemDCDTTM, DateTime.MinValue) && DateTime.LessThan(dtLeastPresItemDCDTTM , dtRecordHWDTTM)))
                        { this.IsVisibleHWIndicator = Visibility.Visible;
                        this.HeightWeightIndText = Resource.MedsAdminPrescChartView.HTwtupdate_text + " " + dtRecordHWDTTM.ToString(CConstants.DateTimeFormat) + Resource.MedsAdminPrescChartView.Htwtpleasereview;
                        if (MedChartData.PatinetInfo != null) {
                            MedChartData.PatinetInfo.LatHWUpdatedDTTM = dtRecordHWDTTM;
                        }
                    }
                    else {
                        this.IsVisibleHWIndicator = Visibility.Collapsed;
                    }
                }
                else {
                    this.IsVisibleHWIndicator = Visibility.Collapsed;
                }
            }
    }

        public DischargeDTTM: DateTime;
        public LeaveDTTM: DateTime;
        public FillActivityConsideration(): void {
            let bACNodeItmClickable: boolean = true;
            if (this.ActivityConsideration != null && String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.OrdinalIgnoreCase) != 0) {


                AppLoadService.activityConsiderationArrowClick.subscribe(val=>{
                    if (val) {
                      this.ActivityConsideration_OnPopupOpen({},{});
                    }
                  });
                  AppLoadService.nodeClick.subscribe(val=>{
                    if (val||bACNodeItmClickable) {
                      this.ActivityConsideration_OnNodeItemClick({});
                    }
                  });


                // this.ActivityConsideration.OnPopupOpen  = (s,e) => { this.ActivityConsideration_OnPopupOpen(s,e); } ;
                if (!String.IsNullOrEmpty(ChartContext.MedchartLaunchLoc) && (String.Equals(ChartContext.MedchartLaunchLoc, "TechnicallyValidate") || String.Equals(ChartContext.MedchartLaunchLoc, "Prescribe") || String.Equals(ChartContext.MedchartLaunchLoc, "Authorise"))) {
                    bACNodeItmClickable = false;
                }
                // if (bACNodeItmClickable) {
                //     this.ActivityConsideration.OnNodeItemClick  = (s) => { this.ActivityConsideration_OnNodeItemClick(s); } ;
                // }
                // Application.CommonBB.PatientBSADataCompletedEvent -= CommonBB_PatientBSADataCompletedEvent;
                CommonBB.PatientBSADataCompletedEvent  = (s,e) => { this.CommonBB_PatientBSADataCompletedEvent(s,e); } ;
                this.ActivityConsideration.ActivityConsiderationCaption = "Prescribing considerations";
                this.ActivityConsideration.AddSection("SectionConsideration", "Considerations", String.Empty, Resource.MedicationChart.SectionConsideration_Tooltip);
                this.ActivityConsideration.AddSection("SectionAllergy", "Allergies/ADRs", String.Empty, Resource.MedicationChart.SectionAllergy_Tooltip);
                this.ActivityConsideration.AddSection("SectionProblem", "Problems", String.Empty, Resource.MedicationChart.SectionProblems_Tooltip);
                AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
            }
        }
        ActivityConsideration_OnPopupOpen(sender: Object, e: EventArgs): void {
            this.IsActivityConsiderationOpened = true;
            let sImageList: string = String.Empty;
            let oReturn: Object = HtmlPage.Window.Invoke("GetDataItemRecordedDate", null);
            this.UpdateActivityConsideration(false, oReturn);
            this.ActivityConsideration.AddNode("SectionConsideration", "DischargeDTTM", "Expected date of discharge:", String.Empty, String.Empty, false, false, String.Empty, String.Empty);
            this.ActivityConsideration.AddNode("SectionConsideration", "LeaveDTTM", "Expected date of patient leave:", String.Empty, String.Empty, false, false, String.Empty, String.Empty);
            if (this.ActivityConsideration.lstSection[2].Nodes.Count == 0) {
                if (!String.IsNullOrEmpty(WebServiceURLMedicationCommonBB.ManageProblemWS)) {
                    MedicationPrescriptionHelper.GetProblemByCriteria((o,e)=>{
                        this.probproxy_GetProblemByCriteriaCompleted(o,e)
                    });
                }
            }
            if (this.ActivityConsideration.lstSection[1].Nodes.Count == 0) {
                if (!String.IsNullOrEmpty(WebServiceURLMedicationCommonBB.ManageAllergyWS)) {
                    MedicationPrescriptionHelper.GetPatientAllergies((o,e)=>{
                        this.allergyproxy_GetPatientAllergiesCompleted(o,e)
                    });
                }
            }
            if (this.ActivityConsideration != null) {
                if (String.IsNullOrEmpty(this.sDischargeDTTM)) {
                    MedicationPrescriptionHelper.GetDischargeDate((o,e)=>{
                        this.PatientDischargeDate_GetDischargeDateCompleted(o,e);
                    });
                }
                else {
                    this.SetActivityConsiderationDischargeDTTM();
                }
                if (String.IsNullOrEmpty(this.sLeaveDTTM)) {
                    MedicationPrescriptionHelper.GetPatientLeaveByPatDet((o,e)=>{
                        this.LeaveDate_GetPatientLeaveByPatDetCompleted(o,e);
                    });
                }
                else {
                    this.SetActivityConsiderationLeaveDTTM();
                }
            }
            AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
        }
        SetActivityConsiderationDischargeDTTM(): void {
            this.ActivityConsideration.UpdateNode("SectionConsideration", "DischargeDTTM", "Expected date of discharge:", this.sDischargeDTTM, String.Empty, false, false, String.Empty, this.sDischargeDTTM);
            AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
        }
        SetActivityConsiderationLeaveDTTM(): void {
            this.ActivityConsideration.UpdateNode("SectionConsideration", "LeaveDTTM", "Expected date of patient leave:", this.sLeaveDTTM, String.Empty, false, false, String.Empty, this.sLeaveDTTM);
            AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
        }
        public UpdateActivityConsideration(IsDoseCalc: boolean, oReturn: Object): void {
            let sHName: string = "Height:";
            let sWName: string = "Weight:";
            let sGestationAge: string = "Gestational age:";
            let sHValue: string = "NOT RECORDED";
            let sWValue: string = "NOT RECORDED";
            let sGestationAgeValue: string = "NOT RECORDED";
            let sHeight: string;
            let sWeight: string;
            let sGestation: string;
            let sGestationreq: string = String.Empty;
            if (oReturn != null && oReturn.ToString().length > 0) {
                let arrValues: string[];
                if (IsDoseCalc) {
                    arrValues = oReturn.ToString().Split(';');
                    if (arrValues.length > 0 && !String.IsNullOrEmpty(arrValues[0])) {
                        sWValue = arrValues[0].Replace("  ", " ");
                    }
                    if (arrValues.length > 1 && !String.IsNullOrEmpty(arrValues[1])) {
                        sHValue = arrValues[1].Replace("  ", " ");
                    }
                    if (arrValues.length > 2 && !String.IsNullOrEmpty(arrValues[2])) {
                        sGestationAgeValue = arrValues[2].Replace("  ", " ");
                    }
                    sWValue = sWValue.Replace(":Recorded", ": Recorded");
                    sHValue = sHValue.Replace(":Recorded", ": Recorded");
                    sGestationAgeValue = sGestationAgeValue.Replace(":Recorded", ": Recorded");
                    sWeight = (arrValues.length > 3 && !String.IsNullOrEmpty(arrValues[3])) ? arrValues[3].Trim() : String.Empty;
                    sHeight = (arrValues.length > 4 && !String.IsNullOrEmpty(arrValues[4])) ? arrValues[4].Trim() : String.Empty;
                    sGestation = (arrValues.length > 5 && !String.IsNullOrEmpty(arrValues[5])) ? arrValues[5].Trim() : String.Empty;
                    this.ActivityConsideration.UpdateNode("SectionConsideration", sWName, sWName, sWValue, String.Empty, false, true, String.Empty, Resource.MedicationChart.PatientWeight_Tooltip + sWValue);
                    this.ActivityConsideration.UpdateNode("SectionConsideration", sHName, sHName, sHValue, String.Empty, false, true, String.Empty, Resource.MedicationChart.PatientHeight_Tooltip + sHValue);
                    AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
                    MedicationCommonBB.GetPatientAgeGenderDetails();
                    if (ContextManager.Instance.NameExists("Sgestationreq")) {
                        if ((ContextManager.Instance["Sgestationreq"]) != null) {
                            sGestationreq = ContextManager.Instance["Sgestationreq"].ToString();
                        }
                    }
                    if (sGestationreq == "1") {
                        this.ActivityConsideration.UpdateNode("SectionConsideration", sGestationAge, sGestationAge, sGestationAgeValue, String.Empty, false, true, String.Empty, sGestationAgeValue);
                        AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
                    }
                }
                else {
                    arrValues = oReturn.ToString().Split(',');
                    if (arrValues.length > 0 && !String.IsNullOrEmpty(arrValues[0])) {
                        sWValue = arrValues[0].Replace("  ", " ");
                    }
                    if (arrValues.length > 1 && !String.IsNullOrEmpty(arrValues[1])) {
                        sHValue = arrValues[1].Replace("  ", " ");
                    }
                    if (arrValues.length > 2 && !String.IsNullOrEmpty(arrValues[2])) {
                        sGestationAgeValue = arrValues[2].Replace("  ", " ");
                    }
                    sWValue = sWValue.Replace(":Recorded", ": Recorded");
                    sHValue = sHValue.Replace(":Recorded", ": Recorded");
                    sGestationAgeValue = sGestationAgeValue.Replace(":Recorded", ": Recorded");
                    sWeight = (arrValues.length > 3 && !String.IsNullOrEmpty(arrValues[3])) ? arrValues[3].Trim() : String.Empty;
                    sHeight = (arrValues.length > 4 && !String.IsNullOrEmpty(arrValues[4])) ? arrValues[4].Trim() : String.Empty;
                    sGestation = (arrValues.length > 5 && !String.IsNullOrEmpty(arrValues[5])) ? arrValues[5].Trim() : String.Empty;
                    if (this.ActivityConsideration.lstSection != null && this.ActivityConsideration.lstSection[0].Nodes != null && this.ActivityConsideration.lstSection[0].Nodes.Count == 0) {
                        this.ActivityConsideration.AddNode("SectionConsideration", sWName, sWName, sWValue, String.Empty, false, true, String.Empty, Resource.MedicationChart.PatientWeight_Tooltip + sWValue);
                        this.ActivityConsideration.AddNode("SectionConsideration", sHName, sHName, sHValue, String.Empty, false, true, String.Empty, Resource.MedicationChart.PatientHeight_Tooltip + sHValue);
                        AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
                    }
                    else {
                        this.ActivityConsideration.UpdateNode("SectionConsideration", sWName, sWName, sWValue, String.Empty, false, true, String.Empty, Resource.MedicationChart.PatientWeight_Tooltip + sWValue);
                        this.ActivityConsideration.UpdateNode("SectionConsideration", sHName, sHName, sHValue, String.Empty, false, true, String.Empty, Resource.MedicationChart.PatientHeight_Tooltip + sHValue);
                        AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
                    }
                    MedicationCommonBB.GetPatientAgeGenderDetails();
                    if (ContextManager.Instance.NameExists("Sgestationreq")) {
                        if ((ContextManager.Instance["Sgestationreq"]) != null) {
                            sGestationreq = ContextManager.Instance["Sgestationreq"].ToString();
                        }
                    }
                    if (sGestationreq == "1") {
                        this.ActivityConsideration.AddNode("SectionConsideration", sGestationAge, sGestationAge, sGestationAgeValue, String.Empty, false, true, String.Empty, sGestationAgeValue);
                        AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
                    }
                }
                this.ActivityConsideration.AddNode("SectionConsideration", "BSA", "BSA:", String.Empty, String.Empty, false, false, String.Empty, String.Empty);
                AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
                if ((!String.IsNullOrEmpty(sHeight) && !String.IsNullOrEmpty(sWeight)) || (!String.IsNullOrEmpty(sWeight))) {
                    CommonBB.GetPatientBSA(PatientContext.PatientOID, PatientContext.Age, sHeight, sWeight);
                }
            }
        }
        private BSAFormula: string;
        private BSAValue: string;
        CommonBB_PatientBSADataCompletedEvent(Formula: string, BSA: string): void {
            if (!String.IsNullOrEmpty(BSA)) {
                this.BSAValue = BSA;
                this.BSAFormula = Formula;
                if (CommonDomainValues.BSAFormula != null) {
                    let sBSAFormulaDisplay: string = this.BSAFormula;
                    let sDisplay: string;
                    let BSADisplayText = CommonDomainValues.BSAFormula.Where(CCBSA =>String.Compare(CCBSA.csCode,this.BSAFormula,StringComparison.OrdinalIgnoreCase)==0).Select(CCBSA => CCBSA.csDescription);
                    if (BSADisplayText != null && BSADisplayText.Count() > 0) {
                        sBSAFormulaDisplay = BSADisplayText.ElementAt(0);
                    }
                    sDisplay = this.BSAValue + " m^2 (" + sBSAFormulaDisplay + ")";
                    this.ActivityConsideration.UpdateNode("SectionConsideration", "BSA", "BSA:", sDisplay, String.Empty, false, false, String.Empty, sDisplay);
                    AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
                }
            }
            if (String.IsNullOrEmpty(this.sPatientHtWtBSAText) || String.IsNullOrEmpty(this.PatientHtWtBSAText) || (!String.IsNullOrEmpty(this.sPatientHtWtBSAText) && !String.IsNullOrEmpty(this.PatientHtWtBSAText) && String.Compare(this.sPatientHtWtBSAText, this.PatientHtWtBSAText) != 0)) {
                MedChartData.PatinetInfo = Common.GetPatientInfo();
                if (MedChartData.PatinetInfo != null && !String.IsNullOrEmpty(MedChartData.PatinetInfo.Observation)) {
                    let sHtWtBSA: string = MedChartData.PatinetInfo.Observation;
                    if (!String.IsNullOrEmpty(BSA) && !String.IsNullOrEmpty(this.BSAValue))
                        sHtWtBSA += " " + this.BSAValue + Resource.MedsAdminChartToolTip.PatientBSAUOMText;
                    this.PatientHtWtBSAText = sHtWtBSA;
                }
                else {
                    this.PatientHtWtBSAText = String.Empty;
                }
            }
        }
        allergyproxy_GetPatientAllergiesCompleted(sender: Object, e: ManageAllergy.GetPatientAllergiesCompletedEventArgs): void {
            let _ErrorID: number = 80000027;
            let _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:MedicationAdminVM, Method:allergyproxy_GetPatientAllergiesCompleted()";
            if (e.Error == null) {
                try {
                    let AllergyRes: ManageAllergy.CResMsgGetPatientAllergies = e.Result;
                    if (AllergyRes instanceof ManageAllergy.CResMsgGetPatientAllergies && AllergyRes.oPatientAllergyDet != null) {
                        for (let i: number = 0; i < AllergyRes.oPatientAllergyDet.Length; i++) {
                            if (i >= 10) {
                                this.ActivityConsideration.AddNode("SectionAllergy", String.Empty, Resource.MedicationChart.More_Allergies_Exist, String.Empty, String.Empty, false, false, Resource.MedicationChart.sectionallergyif_Tooltip, Resource.MedicationChart.sectionallergyif_Tooltip);
                                AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
                                break;
                            }
                            else {
                                this.ActivityConsideration.AddNode("SectionAllergy", AllergyRes.oPatientAllergyDet[i].AllergyID, AllergyRes.oPatientAllergyDet[i].Allergen, String.Empty, String.Empty, false, false, AllergyRes.oPatientAllergyDet[i].Allergen, Resource.MedicationChart.sectionallergyielse_Tooltip);
                                AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
                            }
                        }
                    }
                    else {
                        this.ActivityConsideration.AddNode("SectionAllergy", String.Empty, "None recorded", String.Empty, String.Empty, false, false, Resource.MedicationChart.Sectionallergyelse1_Tooltip, Resource.MedicationChart.sectionallergyelse2_Tooltip);
                        AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
                    }
                    for (let vSectionCntr: number = 0; vSectionCntr < this.ActivityConsideration.lstSection.Count; vSectionCntr++) {
                        if (String.Compare(this.ActivityConsideration.lstSection[vSectionCntr].SectionKey, "SectionAllergy") == 0) {
                            for (let vLoop: number = 0; vLoop < this.ActivityConsideration.lstSection[vSectionCntr].Nodes.Count; vLoop++)
                                this.ActivityConsideration.lstSection[vSectionCntr].Nodes[vLoop].NodeWidth = 300;
                            break;
                        }
                    }
                }
               catch(ex:any)  {
                    let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
            if (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.OrdinalIgnoreCase) != 0)
                this.ActivityConsideration.lstSection[0].Nodes[4].NodeWidth = 175;
        }
        probproxy_GetProblemByCriteriaCompleted(sender: Object, e: ManageProblem.GetProblemByCriteriaCompletedEventArgs): void {
            let _ErrorID: number = 80000023;
            let _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:MedicationAdminVM, Method:probproxy_GetProblemByCriteriaCompleted()";
            if (e.Error == null) {
                try {
                    let oProbRes: ManageProblem.CResMsgGetProblemByCriteria = e.Result;
                    if (oProbRes instanceof ManageProblem.CResMsgGetProblemByCriteria && oProbRes.oProblemView != null) {
                        for (let i: number = 0; i < oProbRes.oProblemView.Count; i++) {
                            if (i >= 5) {
                                this.ActivityConsideration.AddNode("SectionProblem", String.Empty, Resource.MedicationChart.More_Problem_Exist, String.Empty, String.Empty, false, false, Resource.MedicationChart.sectionallergyif_Tooltip, Resource.MedicationChart.sectionallergyif_Tooltip);
                                AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
                                break;
                            }
                            else {
                                this.ActivityConsideration.AddNode("SectionProblem", oProbRes.oProblemView[i].ProblemOID, oProbRes.oProblemView[i].ProblemName, String.Empty, String.Empty, false, false, oProbRes.oProblemView[i].ProblemName, Resource.MedicationChart.Sectionproblemielse_Tooltip);
                                AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
                            }
                        }
                        for (let vSectionCntr: number = 0; vSectionCntr < this.ActivityConsideration.lstSection.Count; vSectionCntr++) {
                            if (String.Compare(this.ActivityConsideration.lstSection[vSectionCntr].SectionKey, "SectionProblem") == 0) {
                                for (let vLoop: number = 0; vLoop < this.ActivityConsideration.lstSection[vSectionCntr].Nodes.Count; vLoop++)
                                    this.ActivityConsideration.lstSection[vSectionCntr].Nodes[vLoop].NodeWidth = 300;
                                break;
                            }
                        }
                    }
                    else {
                        this.ActivityConsideration.AddNode("SectionProblem", String.Empty, "None recorded", String.Empty, String.Empty, false, false, Resource.MedicationChart.Sectionproblemielse_Tooltip, Resource.MedicationChart.sectionallergyelse2_Tooltip);
                        AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
                    }
                }
               catch(ex:any)  {
                    let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
        }
        PatientDischargeDate_GetDischargeDateCompleted(sender: Object, e: ManagePrescSer.GetDischargeDateCompletedEventArgs): void {
            let _ErrorID: number = 80000038;
            let _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:MedicationAdminVM, Method:PatientDischargeDate_GetDischargeDateCompleted()";
            if (e.Error == null && e.Result != null) {
                try {
                    this.DischargeDTTM = e.Result.DischargeDate;
                    this.sDischargeDTTM = (DateTime.NotEquals(this.DischargeDTTM , DateTime.MinValue) && this.DischargeDTTM.Year < DateTime.MaxValue.Year) ? this.DischargeDTTM.ToString("dd-MMM-yyyy") : String.Empty;
                    if (this.IsActivityConsiderationOpened) {
                        this.SetActivityConsiderationDischargeDTTM();
                    }
                }
               catch(ex:any)  {
                    let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
        }
        LeaveDate_GetPatientLeaveByPatDetCompleted(sender: Object, e: QueryInpatient.GetPatientLeaveByPatDetCompletedEventArgs): void {
            let _ErrorID: number = 80000037;
            let _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:MedicationAdminVM, Method:LeaveDate_GetPatientLeaveByPatDetCompleted()";
            if (e.Error == null) {
                try {
                    let objRes: QueryInpatient.CResMsgGetPatientLeaveByPatDet = e.Result;
                    if (objRes != null && objRes.oPatientLeave != null) {
                        this.LeaveDTTM = objRes.oPatientLeave.ActualStartDttm;
                        this.sLeaveDTTM = DateTime.NotEquals(this.LeaveDTTM , DateTime.MinValue )? this.LeaveDTTM.ToString("dd-MMM-yyyy") : String.Empty;
                        if (this.IsActivityConsiderationOpened) {
                            this.SetActivityConsiderationLeaveDTTM();
                        }
                    }
                }
               catch(ex:any)  {
                    let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
        }
        async ActivityConsideration_OnNodeItemClick(objRLNode: any) {
            let sHName: string = "Height:";
            let sWName: string = "Weight:";
            let sGestationAge: string = "Gestational age:";
            let sGestationAgeValue: string = "NOT RECORDED";
            let sHValue: string = "NOT RECORDED";
            let sWValue: string = "NOT RECORDED";
            let sWeight: string = String.Empty;
            let sHeight: string = String.Empty;
            let sGestation: string = String.Empty;
            let sGestationreq: string = String.Empty;
            let oReturn = await HtmlPage.Window.InvokeAsync("ActivityConsideration", null, PatientContext.PatientOID);
            if (oReturn != null && oReturn.length > 0) {
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
                sWeight = (arrValues.length > 3 && !String.IsNullOrEmpty(arrValues[3])) ? arrValues[3].Trim() : String.Empty;
                sHeight = (arrValues.length > 4 && !String.IsNullOrEmpty(arrValues[4])) ? arrValues[4].Trim() : String.Empty;
                sGestation = (arrValues.length > 5 && !String.IsNullOrEmpty(arrValues[5])) ? arrValues[5].Trim() : String.Empty;
                let _isHaveHTDDTM: boolean = false;
                if (!String.IsNullOrEmpty(sHeight)) {
                    _isHaveHTDDTM = true;
                    let sHeightRecordedOnWithTime: string = String.Empty;
                    if (arrValues != null && arrValues.length > 1) {
                        if (!String.IsNullOrEmpty(arrValues[1]) && arrValues[1].Contains(':')) {
                            sHeightRecordedOnWithTime = arrValues[1].Split(':')[2] + ":" + arrValues[1].Split(':')[3];
                        }
                    }
                    PatientContext.PatientHeightDTTM = Convert.ToDateTime(sHeightRecordedOnWithTime);
                    if (MedChartData.PatinetInfo != null) {
                        MedChartData.PatinetInfo.DCHTRecordDTTM = PatientContext.PatientHeightDTTM;
                    }
                }
                if (!String.IsNullOrEmpty(sWeight)) {
                    _isHaveHTDDTM = true;
                    let sWeightRecordedOnWithTime: string = String.Empty;
                    if (arrValues != null && arrValues.length > 0) {
                        if (!String.IsNullOrEmpty(arrValues[0]) && arrValues[0].Contains(':')) {
                            sWeightRecordedOnWithTime = arrValues[0].Split(':')[2] + ":" + arrValues[0].Split(':')[3];
                        }
                    }
                    PatientContext.PatientWeightDTTM = Convert.ToDateTime(sWeightRecordedOnWithTime);
                    if (MedChartData.PatinetInfo != null) {
                        MedChartData.PatinetInfo.DCWTRecordDTTM = PatientContext.PatientWeightDTTM;
                    }
                }
                if (!_isHaveHTDDTM) {
                    MedChartData.PatinetInfo = Common.GetPatientInfo();
                }
                this.SetHeightweightPopUp();
                if (this.ActivityConsiderationUpdatedCompleted != null) {
                    this.ActivityConsiderationUpdatedCompleted();
                }
            }
            this.ActivityConsideration.UpdateNode("SectionConsideration", sWName, sWName, sWValue, String.Empty, false, true, "Patient Weight", Resource.MedicationChart.PatientWeight_Tooltip + sWValue);
            this.ActivityConsideration.UpdateNode("SectionConsideration", sHName, sHName, sHValue, String.Empty, false, true, "Patient Height", Resource.MedicationChart.PatientHeight_Tooltip + sHValue);
            AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
            MedicationCommonBB.GetPatientAgeGenderDetails();
            if (ContextManager.Instance.NameExists("Sgestationreq")) {
                if ((ContextManager.Instance["Sgestationreq"]) != null) {
                    sGestationreq = ContextManager.Instance["Sgestationreq"].ToString();
                }
            }
            if (sGestationreq == "1") {
                this.ActivityConsideration.UpdateNode("SectionConsideration", sGestationAge, sGestationAge, sGestationAgeValue, String.Empty, false, true, "Gestational age", sGestationAgeValue);
                AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
            }
            CommonBB.GetPatientBSA(PatientContext.PatientOID, PatientContext.Age, sHeight, sWeight);
        }
        public CheckPessimisticLock(out1: (IsLock: boolean) => void): void {
          let IsLock: boolean;

                      IsLock = false;
                      let sLockingMessage: string = String.Empty;
                      let sErrorCode: string = String.Empty;
                      let sEntityName: string = String.Empty;
                      sEntityName = "MedTVInpatient";
                      let sReadonlyKeyName: string = "";
                      let sWarningKeyName: string = "";
                      let objLockedUsersDet: ScriptObject = ObjectHelper.CreateType<ScriptObject>(HtmlPage.Window.Invoke("GetLockedUsersDetails", PatientContext.PatientOID, PatientContext.EncounterOid, MedChartData.MedChartOID, "0", sEntityName, sReadonlyKeyName, sWarningKeyName), ScriptObject);
                      if (objLockedUsersDet != null && objLockedUsersDet.GetProperty("WarningMessage") != null)
                          sLockingMessage = objLockedUsersDet.GetProperty("WarningMessage").ToString();
                      if (objLockedUsersDet != null && objLockedUsersDet.GetProperty("ErrorCode") != null)
                          sErrorCode = objLockedUsersDet.GetProperty("ErrorCode").ToString();
                      if (!String.IsNullOrEmpty(sErrorCode) && String.Equals(sErrorCode, "900038")) {
                          IsLock = true;
                          let msg: iMessageBox = new iMessageBox();
                          msg.Title = "Lorenzo";
                          msg.MessageButton = MessageBoxButton.OK;
                          msg.Message = sLockingMessage;
                          msg.Show();
                      }

           out1(IsLock);

          }
    }
