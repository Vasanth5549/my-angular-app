import { CommonBB, LzoWizardAction } from 'src/app/lorappcommonbb/utilities/common';
import * as Application from 'src/app/lorappcommonbb/amshelper';
import { InfContinousSequentail, PrescriptionItemVM } from "./PrescriptionItemVM";
import { App } from "src/app/shared/epma-platform/controls/ResourceStyle";
import { IPPMABaseVM } from './ippmabasevm';
import { ContextManager, Convert, MediatorDataService, MessageBoxButton, MessageBoxResult, MessageBoxType, MessageEventArgs, ObjectHelper, base, iMessageBox } from 'epma-platform/services';
import { Common } from '../utilities/common';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import {Byte, ContextInfo, Int64, ObservableCollection,  WizardAction, byte, int64, StringComparison } from 'epma-platform/models';
import { CConstants, PrescriptionTypes } from '../utilities/constants';
import { Resource } from '../resource';
import { Environment } from 'src/app/product/shared/models/Common';
import { LockedUsersDetails, MedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { CPremission, GlobalVariable, QueryStringInfo } from '../utilities/globalvariable';
import { MedChartData } from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import { iActivityConsideration, iTabItem } from 'epma-platform/controls';
import { MedQuickSelectVM } from './medquickselectvm';
import { MulticomponentVM } from './MulticomponentVM';
import { GPConnectItemVM } from './GPConnectItemVM';
import { AppSessionInfo, PatientContext,AppContextInfo} from 'src/app/lorappcommonbb/utilities/globalvariable';
import { InjectorInstance } from 'src/app/app.module';

export class ClinicallyVerifyVM extends IPPMABaseVM {
    public _mediatorDataService: MediatorDataService;
    constructor() {
        super();
        this._mediatorDataService = InjectorInstance.get<MediatorDataService>(MediatorDataService);
        this._mediatorDataService.listenFor(6).subscribe((data:any) => {
          if(data){
           let contextData = data.context;
           switch (contextData.context.event) {
            case 'Discard_Click': this.OnCancel();
                       break;
            case 'Finish_Click':
              this.OnFinish();  
              break;
            case 'FinishNow_Click':             
                this.OnFinishNow();  
                        break;
           }
          }
        })
        // super(sTaskOID);
        // if (App.GetIsSuspendBufferVMCreation){
        this.CreateVMobject();
        // }
    }
    private _sLastCACode: string = String.Empty;
    public get sLastCACode(): string {
        return this._sLastCACode;
    }
    public set sLastCACode(value: string) {
        this._sLastCACode = value;
    }
    private _CliniverifyClosed: string = String.Empty;
    public get CliniverifyClosed(): string {
        return this._CliniverifyClosed;
    }
    public set CliniverifyClosed(value: string) {
        this._CliniverifyClosed = value;
        // OnPropertyChanged("CliniverifyClosed");
    }
    private _CliniverifyClosedCancel: string = String.Empty;
    public get CliniverifyClosedCancel(): string {
        return this._CliniverifyClosedCancel;
    }
    public set CliniverifyClosedCancel(value: string) {
        this._CliniverifyClosedCancel = value;
        // OnPropertyChanged("CliniverifyClosedCancel");
    }
    public oDispensingItemVM: PrescriptionItemVM;
    public override GetChildWizardData(sData: string): void {
        if (!String.IsNullOrEmpty(this.sLastCACode) && (String.Compare(this.sLastCACode, "MN_MED_VALIDATE_S_P2") == 0) && !String.IsNullOrEmpty(sData)) {
            let eWizardAction: LzoWizardAction = CommonBB.GetWizardAction(sData);
            if (eWizardAction == LzoWizardAction.Finish || eWizardAction == LzoWizardAction.FinishNow) {
                this.CliniverifyClosed = sData;
            }
            else if (eWizardAction == LzoWizardAction.Cancel) {
                this.CliniverifyClosedCancel = sData;
            }
        }
    }
    public override OnInitialize(): void {
        super.OnInitialize();
    }
    public override OnInitComplete(): void {
        this.LoadClientHealthObjects();
        this.GetContextInfoFromHtmlPage();
        if (this.AppContext.MenuCode === 'MN_MED_VERIFY_SL_P2') {
            ContextInfo.MenuCode = 'MED_CA_CLN_VRFY_SL_P2';
            if (!String.IsNullOrEmpty(base.WizardContext["IsLaunchFromPresChart"]))
            {
                Common.GetConflictConfig();
            }
          }
        super.OnInitComplete();
        if (ContextManager.Instance["FRC-001-CHILD"] != null)
            Common.Frc001Childs = ContextManager.Instance["FRC-001-CHILD"].ToString();
        if (ContextManager.Instance["FRC-002-CHILD"] != null)
            Common.Frc002Childs = ContextManager.Instance["FRC-002-CHILD"].ToString();
        if (ContextManager.Instance["FRC-003-CHILD"] != null)
            Common.Frc003Childs = ContextManager.Instance["FRC-003-CHILD"].ToString();
        if (ContextManager.Instance["FRQ-88-CHILD"] != null)
            Common.Frq88Childs = ContextManager.Instance["FRQ-88-CHILD"].ToString();
    }
    public override OnValidate(action: WizardAction): boolean {
        if (action == WizardAction.Next) {

        }
        return super.OnValidate(action);
    }
    public override OnNext(): void {
        super.OnNext();
    }
    public override OnPrevious(): void {
        super.OnPrevious();
    }
    public override OnFinish(): void {
        if (!this.IsFinishClicked) {
            this.IsFinishClicked = true;
            if (!this.ValidateSupplyPendingDispense()) {
                this.IsFinishClicked = false;
            }
            else {
                super.OnValidateAsync(WizardAction.Finish).subscribe((result=>{
                    if(result){
                        Busyindicator.SetStatusBusy("FINISH");
                        super.SetWIZContextInormation("FINISH");
                        super.IsFinishNow = false;
                        super.IsFinish = true;
                        this.CheckLaunchClrkCAAndSubmit();
                    }else{
                        this.IsFinishClicked=false;
                        return;
                    }
                }));
        }
        }
    }
    public override OnFinishNow(): void {
        if (!this.IsFinishClicked) {
            this.IsFinishClicked = true;
            if (!this.ValidateSupplyPendingDispense()) {
                this.IsFinishClicked = false;
            }
            else {
                super.SetWIZContextInormation("FINISHNOW");
                super.IsFinishNow = true;
                super.IsFinish = false;
                this.CheckLaunchClrkCAAndSubmit();
            }
        }
    }
    private CheckLaunchClrkCAAndSubmit(): void {
        if (!this.IsPrint && !this.IsConsolidatedPrint && PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration) {
            let oPrescribedGPData = this.MedsResolve.Where(
                (item) =>
                  !String.IsNullOrEmpty(item.OperationMode) &&
                  String.Equals(
                    item.OperationMode,
                    'N',
                    StringComparison.InvariantCultureIgnoreCase
                  ) &&
                  item.IsGPConnectItem
              ).Select((item) => item)
            if (oPrescribedGPData != null && oPrescribedGPData.Count() > 0) {
                if (String.Equals(ContextInfo.MenuCode, CConstants.ForadminPrescribeMenuCode, StringComparison.InvariantCultureIgnoreCase) || String.Equals(ContextInfo.MenuCode, CConstants.InpatientPrescribeMenuCode, StringComparison.InvariantCultureIgnoreCase) || String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase)) {
                    let strLaunchClrkMsg: string = Resource.MedicationForm.LaunchClrkMsg;
                    let oMsgBox: iMessageBox = new iMessageBox();
                    oMsgBox.MessageBoxClose = (s, e) => { this.oMsgLaunchClrk_MessageBoxClose(s, e); };
                    oMsgBox.Height = 170;
                    oMsgBox.Width = 420;
                    oMsgBox.MessageButton = MessageBoxButton.YesNo;
                    oMsgBox.IconType = MessageBoxType.Question;
                    oMsgBox.Message = strLaunchClrkMsg.Replace("\\r\\n", Environment.NewLine + Environment.NewLine);
                    let _top: any = top;
                    _top.oScreen.UnFreeze();
                    oMsgBox.Show();
                }
                else {
                    this.CheckLockAndSubmit();
                }
            }
            else {
                this.CheckLockAndSubmit();
            }
        }
        else {
            this.CheckLockAndSubmit();
        }
    }
    oMsgLaunchClrk_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.Yes) {
            this.CanLaunchClerkPrescription = true;
        }
        else {
            this.CanLaunchClerkPrescription = false;
        }
        this.CheckLockAndSubmit();
    }
    private CheckLockAndSubmit(): void {
        let sMenuCode: string = this.AppContext.MenuCode;
        let _lockedUserDetails: LockedUsersDetails;

        if (!MedicationCommonBB.IsLockStillValid(String.IsNullOrEmpty(QueryStringInfo.RequestLockOID) ? 0 : Number.Parse(QueryStringInfo.RequestLockOID), sMenuCode, (o) => {_lockedUserDetails = o;}))
        {
            let oMsgBox: iMessageBox = new iMessageBox();
            oMsgBox.MessageBoxClose = (s, e) => { this.oMsgBox_MessageBoxClose(s, e); };
            oMsgBox.Title = "Information - Lorenzo";
            oMsgBox.Height = 160;
            oMsgBox.MessageButton = MessageBoxButton.OK;
            oMsgBox.IconType = MessageBoxType.Information;
            if (String.IsNullOrEmpty(_lockedUserDetails.LockedUserName)) {
                oMsgBox.Message = Resource.MedicationForm.LockMsg_Abort;
            }
            else {
                oMsgBox.Message = String.Format(Resource.MedicationForm.LockMsg, _lockedUserDetails.LockedUserName);
            }
            oMsgBox.Show();
        }
            else {
            super.PrescribeDrugs();
        }
    }
    override oMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        super.OnFinishNow();
    }
    public override OnCancel(): void {
        if ((this instanceof IPPMABaseVM) && (ObjectHelper.CreateType<IPPMABaseVM>(this, IPPMABaseVM)) != null) {
            if (this.IsPatientHTWTUpdated) {
                super.WizardContext["IsPatientHTWTUpdated"] = "1";
            }
            else {
                super.WizardContext["IsPatientHTWTUpdated"] = "0";
            }
            if ((ObjectHelper.CreateType<IPPMABaseVM>(this, IPPMABaseVM)).objNewItemVM != null) {
                (ObjectHelper.CreateType<IPPMABaseVM>(this, IPPMABaseVM)).objNewItemVM = null;
            }
            if ((ObjectHelper.CreateType<IPPMABaseVM>(this, IPPMABaseVM)).objProcessingItemVM != null) {
                (ObjectHelper.CreateType<IPPMABaseVM>(this, IPPMABaseVM)).objProcessingItemVM = null;
            }
        }
        super.OnCancel();
    }
    public override OnReassign(): void {
        super.OnReassign();
    }
    public override OnSuspend(): void {
        if (!this.IsSuspendClicked) {
            this.IsSuspendClicked = true;
            super.OnSuspend();
        }
    }
    public override GetContextInfoFromHtmlPage(): void {
        PatientContext.IsAgeSexFilledforConflict = false;
        let lnMergePatOID: number = 0;
        ContextManager.Instance["PatientID"] = base.WizardContext["PATIENTOID"];
        ContextManager.Instance["EncounterOID"] = base.WizardContext["EncounterOID"];
        ContextManager.Instance["PRESCRIPTIONOID"] = base.WizardContext["PRESCRIPTIONOID"];
        ContextManager.Instance["PrescriberID"] = base.WizardContext["PrescriberID"];
        ContextManager.Instance["PrescriptionNumber"] = base.WizardContext["PrescriptionNumber"];
        ContextManager.Instance["CrctPatientOID"] = base.WizardContext["CrctPatientOID"];
        PatientContext.PatientOID = Convert.ToInt64(base.WizardContext["PATIENTOID"]);
        PatientContext.EncounterOid = Convert.ToInt64(base.WizardContext["EncounterOID"]);
        PatientContext.PrescriptionType = base.WizardContext["PrescType"];
        PatientContext.PType = base.WizardContext["PrescType"];
        if (!String.IsNullOrEmpty(base.WizardContext["ENCTYPE"]))
            PatientContext.EncounterType = base.WizardContext["ENCTYPE"];
        else PatientContext.EncounterType = ContextManager.Instance["EncounterType"].ToString();
        PatientContext.EncounterCode = PatientContext.EncounterType;
        if (ContextManager.Instance["RoleprofileOID"] != null)
            PatientContext.RoleProfileOID = ContextManager.Instance["RoleprofileOID"].ToString();

        if (Number.TryParse(ContextManager.Instance["MergedPatientOID"].ToString(), (o) => {lnMergePatOID=o}) && lnMergePatOID > 0, lnMergePatOID && lnMergePatOID > 0)
        PatientContext.MergedPatientOID = lnMergePatOID;

                else if (ContextManager.Instance["PatientID"] != null && Number.TryParse(ContextManager.Instance["PatientID"].ToString(), (o) => {lnMergePatOID=o}), lnMergePatOID)
        {
            PatientContext.MergedPatientOID = lnMergePatOID;
        }
        if (ContextManager.Instance["IsMergedPatient"] != null) {
            PatientContext.IsMergedPatient = ContextManager.Instance["IsMergedPatient"].ToString();
        }
        if (ContextManager.Instance["IPPMADU_P2"] != null)
            PatientContext.IPPMADU_P2 = Convert.ToBoolean(ContextManager.Instance["IPPMADU_P2"].ToString());
        if (ContextManager.Instance["TTOPBBDU"] != null)
            PatientContext.TTOPBBDU = Convert.ToBoolean(ContextManager.Instance["TTOPBBDU"].ToString());
        if (ContextManager.Instance["TTOPBBDU_P2"] != null)
            PatientContext.TTOPBBDU_P2 = Convert.ToBoolean(ContextManager.Instance["TTOPBBDU_P2"].ToString());
        if (ContextManager.Instance["PatientSealBreakExists"] != null)
            PatientContext.PatientSealBreakExists = Convert.ToBoolean(ContextManager.Instance["PatientSealBreakExists"].ToString());
        if (ContextManager.Instance["IsInfusionON"] != null) {
            PatientContext.IsINFUSIONON = Convert.ToBoolean(ContextManager.Instance["IsInfusionON"].ToString());
        }
        else {
            PatientContext.IsINFUSIONON = true;
        }
        if (ContextManager.Instance["IsTurnONDRC"] != null) {
            PatientContext.IsTurnONDRC = Convert.ToBoolean(ContextManager.Instance["IsTurnONDRC"].ToString());
        }
        AppContextInfo.OrganisationName = ContextManager.Instance["OrganisationName"].ToString();
        AppContextInfo.JobRoleOID = ContextManager.Instance["JobRoleOID"].ToString();
        AppContextInfo.RoleProfileName = ContextManager.Instance["RoleProfileName"].ToString();
        AppContextInfo.SpecialtyOID = ContextManager.Instance["SpecialtyOID"].ToString();
        AppSessionInfo.AMCV = ContextManager.Instance["AMCV"].ToString();
        if (ContextManager.Instance["UserName"] != null)
            AppContextInfo.UserName = ContextManager.Instance["UserName"].ToString();
        AppContextInfo.UserOID = ContextManager.Instance['UserOID'].ToString();
        if (ContextManager.Instance["TeamNames"] != null)
            AppContextInfo.TeamNames = ContextManager.Instance["TeamNames"].ToString();
        if (ContextManager.Instance["TeamOIDs"] != null)
            AppContextInfo.TeamOIDs = ContextManager.Instance["TeamOIDs"].ToString();
        let nAge: number = 0;

        if (ContextManager.Instance["Age"] != null && Number.TryParse(ContextManager.Instance["Age"].ToString(), (o) => {nAge=o}), nAge)
        PatientContext.Age = nAge;
        PatientContext.DOB = ContextManager.Instance["DOB"].ToString();
        PatientContext.Sex = ContextManager.Instance["Sex"].ToString();
        GlobalVariable.NhsNumber = ContextManager.Instance["NHSNumber"] != null ? ContextManager.Instance["NHSNumber"].ToString() : null;
        GlobalVariable.IsGPConnectEnabled = ContextManager.Instance["GpConnectEnabled"] != null && ContextManager.Instance["GpConnectEnabled"].ToString() == "1";
        GlobalVariable.ApplicationPath = ContextManager.Instance["ApplicationPath"] != null ? ContextManager.Instance["ApplicationPath"].ToString() : String.Empty;
        if (ContextManager.Instance["IsPDSTraced"] != null) {
            let sIsPDSTraced: string = ContextManager.Instance["IsPDSTraced"].ToString();
            PatientContext.IsPDSTraced = (!String.IsNullOrEmpty(sIsPDSTraced) && String.Equals(sIsPDSTraced, "1")) ? true : false;
        }
        CPremission.sPremission = ContextManager.Instance["PermissionDetails"].ToString();
        ContextInfo.SecurityToken = ContextManager.Instance["SecurityToken"].ToString();
        AppContextInfo.OrganisationOID = ContextManager.Instance["OrganisationOID"].ToString();
        let objUserOid: int64;

        Number.TryParse(ContextManager.Instance["UserOID"].ToString(), (o) => { objUserOid = o; });
        ContextInfo.UserOID = objUserOid;
        let objReleaseVer: byte;

        Byte.TryParse(ContextManager.Instance["ReleaseVersion"].ToString(), (o) => { objReleaseVer = o; });
        ContextInfo.ReleaseVersion = objReleaseVer.toString();
        ContextInfo.Culture = Convert.ToString(ContextManager.Instance["Culture"]);
        if (ContextManager.Instance["ServiceOID"] != null) {
            let ServiceOID: int64 = 0;

            Number.TryParse(ContextManager.Instance["ServiceOID"].ToString(), (o) => { ServiceOID = o; });
            MedChartData.ServiceOID = ServiceOID;
        }
        if (ContextManager.Instance["LocationOID"] != null) {
            let LocationOID: int64 = 0;

            Number.TryParse(ContextManager.Instance["LocationOID"].ToString(), (o) => { LocationOID = o; });
            MedChartData.LocationOID = LocationOID;
        }
        if (ContextManager.Instance["EnableIsSupplyRequest"] != null) {
            QueryStringInfo.EnableIsSupplyRequest = String.Compare(ContextManager.Instance["EnableIsSupplyRequest"].ToString(), "Y") == 0;
        }
        if (ContextManager.Instance["IsClinicalNote"] != null) {
            QueryStringInfo.IsClinicalNote = ContextManager.Instance["IsClinicalNote"].ToString();
        }
        if (ContextManager.Instance["RequestLockOID"] != null) {
            QueryStringInfo.RequestLockOID = ContextManager.Instance["RequestLockOID"].ToString();
        }
        if (ContextManager.Instance["bDateOfBirthEstimated"] != null) {
            PatientContext.IsEstimatedDOB = Convert.ToBoolean(ContextManager.Instance["bDateOfBirthEstimated"].ToString());
        }
        if (!String.IsNullOrEmpty(base.WizardContext["IsLaunchFromChart"])) {
            QueryStringInfo.IsLaunchformchart = base.WizardContext["IsLaunchFromChart"];
            if (!String.IsNullOrEmpty(base.WizardContext["IsLaunchFromPresChart"]))
                QueryStringInfo.IsLaunchformPreschart = base.WizardContext["IsLaunchFromPresChart"];
        }
        if (!String.IsNullOrEmpty(base.WizardContext["SelPIOID"])) {

            Number.TryParse(base.WizardContext["SelPIOID"], (o) => { QueryStringInfo.SelPrescItemOID = o; });
        }
        else {
            QueryStringInfo.SelPrescItemOID = 0;
        }
        if (ContextManager.Instance["IsPatientTranferAct"] != null && PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration) {
            PatientContext.IsPatientTranferAct = ContextManager.Instance["IsPatientTranferAct"].ToString();
        }
        Common.SetDUAvaliable();
    }
    private CreateVMobject(): void {
        super.ActivityConsideration = new iActivityConsideration();
        super.MedsClerked = new ObservableCollection<PrescriptionItemVM>();
        super.MedsDischarge = new ObservableCollection<PrescriptionItemVM>();
        super.MedsLeave = new ObservableCollection<PrescriptionItemVM>();
        super.MedsOutPatient = new ObservableCollection<PrescriptionItemVM>();
        super.MedsInPatient = new ObservableCollection<PrescriptionItemVM>();
        super.MedsResolve = new ObservableCollection<PrescriptionItemVM>();
        super.QuickSelectVM = new MedQuickSelectVM();
        super.MedsCopyReconcile = new ObservableCollection<PrescriptionItemVM>();
        super.MedsDeletedItemsResolve = new ObservableCollection<number>();
        super.MedsPrint = new ObservableCollection<PrescriptionItemVM>();
        super.MedsReconcile = new ObservableCollection<PrescriptionItemVM>();
        super.MedsReorder = new ObservableCollection<PrescriptionItemVM>();
        super.MedTabList = new ObservableCollection<iTabItem>();
        super.InfusionContinousSeq = new InfContinousSequentail();
        super.oMulticomponentVM = new MulticomponentVM();
        super.MedsGPConnect = new ObservableCollection<GPConnectItemVM>();
    }
    private LoadClientHealthObjects(): void {
        if (super.SuspendBuffer != null) {
            let objMedicationPrescribeVM: ClinicallyVerifyVM = (<ClinicallyVerifyVM>(super.SuspendBuffer));
            if (objMedicationPrescribeVM != null) {
                super.MedsClerked = objMedicationPrescribeVM.MedsClerked;
                super.MedsDischarge = objMedicationPrescribeVM.MedsDischarge;
                super.MedsLeave = objMedicationPrescribeVM.MedsLeave;
                super.MedsOutPatient = objMedicationPrescribeVM.MedsOutPatient;
                super.MedsInPatient = objMedicationPrescribeVM.MedsInPatient;
                super.MedsResolve = objMedicationPrescribeVM.MedsResolve;
                super.QuickSelectVM = objMedicationPrescribeVM.QuickSelectVM;
                super.DrugItem = objMedicationPrescribeVM.DrugItem;
                super.MedsCopyReconcile = objMedicationPrescribeVM.MedsCopyReconcile;
                super.MedsDeletedItemsResolve = objMedicationPrescribeVM.MedsDeletedItemsResolve;
                super.MedsPrint = objMedicationPrescribeVM.MedsPrint;
                super.MedsReconcile = objMedicationPrescribeVM.MedsReconcile;
                super.MedsReorder = objMedicationPrescribeVM.MedsReorder;
                super.MedTabList = objMedicationPrescribeVM.MedTabList;
                super.oMulticomponentVM = objMedicationPrescribeVM.oMulticomponentVM;
                super.InfusionContinousSeq = objMedicationPrescribeVM.InfusionContinousSeq;
                super.MedsGPConnect = objMedicationPrescribeVM.MedsGPConnect;
            }
        }
    }
    bValid: boolean = false;
    public ValidateSupplyPendingDispense(): boolean {
        if (this.lstDispensePendingItems != null) {
            let IncludeMedicationDispenseBehaviour: boolean = ContextManager.Instance["IncludeMedicationDispenseBehaviour"] != null && ContextManager.Instance["IncludeMedicationDispenseBehaviour"].ToString().Equals("true", StringComparison.OrdinalIgnoreCase);
            let objMsg: iMessageBox = new iMessageBox();
            objMsg.MessageButton = MessageBoxButton.YesNoCancel;
            objMsg.IconType = MessageBoxType.Question;
            objMsg.Title = "Lorenzo";
            if (this.lstDispensePendingItems.Count == 0 || !IncludeMedicationDispenseBehaviour) {
                this.bValid = true;
            }
            else {
                // added to compensate the commented part 18-09
                     objMsg.MessageBoxClose = (s, e) => { this.oCheckValidateSupplyPendingDispense_MessageBoxClose(s, e) }
                // objMsg.MessageBoxClose += new EventHandler<MessageEventArgs>((o: Object, e: MessageEventArgs) => {
                //     if (e.MessageBoxResult == MessageBoxResult.Cancel) {
                //         bValid = false;
                //     }
                //     else {
                //         this.IgnoreIfRequestExists = (e.MessageBoxResult == MessageBoxResult.No);
                //         Busyindicator.SetStatusBusy("FINISH");
                //         super.SetWIZContextInormation("FINISH");
                //         super.IsFinishNow = false;
                //         super.IsFinish = true;
                //         this.IsFinishClicked = true;
                //         this.CheckLaunchClrkCAAndSubmit();
                //     }
                // });
                objMsg.Message = String.Format(Resource.TechValidate.ResentRequestMessage, String.Join("\n\n\t", this.lstDispensePendingItems.ToArray()));
                objMsg.Height = 280;
                objMsg.Width = 420;
                objMsg.Show();
                ObjectHelper.stopScreenFreezeEvent(true);
            }
        }
        else {
            this.bValid = true;
        }
        return  this.bValid;
    }
    oCheckValidateSupplyPendingDispense_MessageBoxClose(sender: Object, e: MessageEventArgs){
          if (e.MessageBoxResult == MessageBoxResult.Cancel) {
                        this.bValid = false;
                    }
                    else {
                        this.IgnoreIfRequestExists = (e.MessageBoxResult == MessageBoxResult.No);
                        Busyindicator.SetStatusBusy("FINISH");
                        super.SetWIZContextInormation("FINISH");
                        super.IsFinishNow = false;
                        super.IsFinish = true;
                        this.IsFinishClicked = true;
                        this.CheckLaunchClrkCAAndSubmit();
                    }
    }
}
