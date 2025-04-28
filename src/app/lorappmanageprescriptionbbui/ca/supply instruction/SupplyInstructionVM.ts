import { iActivityConsideration } from 'epma-platform/controls';
import { ObjectHelper } from 'epma-platform/helper';
import { Byte, Int64, WizardAction, byte, int64 } from 'epma-platform/models';
import { ContextManager, Convert, MediatorDataService, MessageEventArgs } from 'epma-platform/services';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import { InjectorInstance } from 'src/app/app.module';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { AppContextInfo, AppSessionInfo, ContextInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { MedChartData } from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import { MedicationCommonProfileData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { PrescriptionItemDetailsVM } from 'src/app/lorappmedicationcommonbb/viewmodel/prescriptionitemdetailsvm';
import { AddPrescribingConfigData } from 'src/app/lorappslprofiletypes/medication';
import { LzoWizardVmbaseService as LzoWizardVMBase } from 'src/app/shared/epma-platform/services/lzo-wizard-vmbase.service';
import * as IPPMAManagePrescSer from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { Common } from '../../utilities/common';
import { CPremission } from '../../utilities/globalvariable';
import { ProfileData } from '../../utilities/profiledata';
import { PrescriptionItemVM } from '../../viewmodel/PrescriptionItemVM';
import { RequisitionHistoryVM } from '../../viewmodel/RequisitionHistoryVM';
import { SupplyDispensingInstructionsVM } from '../../viewmodel/SupplyDispensingInstructionsVM';
import { SupplyHistoryVM } from '../../viewmodel/SupplyHistoryVM';
import { FormViewerVM } from '../../viewmodel/formviewervm';

export class SupplyInstructionVM extends LzoWizardVMBase {
    oMedicationDrugDetailsVM: PrescriptionItemDetailsVM;
    public oPrescItemVM: PrescriptionItemVM;
    sPrescriptionType: string = String.Empty;
    public sPrescriptionOIDs: string = String.Empty;
    sSupplyInstruction: string = String.Empty;
    sSupplyComments: string = String.Empty;
    public IdentifyingName: string = String.Empty;
    public IdentifyingType: string = String.Empty;
    public RouteOID: string = "";
    public LorenzoId: string = String.Empty;
    public DosageFormOID: string = String.Empty;
    public StrengthText: string = String.Empty;
    public RouteOIDs: string = String.Empty;
    public IsFinishClicked: boolean = false;
    public IsSuspendClicked: boolean = false;
    public IsSupplyInstructionCALaunch: boolean = false;
    public IdentifyingOID: number = 0;
    public SuppInstrInvokedFromPresChart: boolean = false;
    oSupDispVM: SupplyDispensingInstructionsVM;
    objIPPManagePresServiceProxy: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient;
    public medline: Object = null;
    Ovm: SupplyDispensingInstructionsVM = null;
    SupWardStockDetails: SupplyHistoryVM;
    RequisitionHisVM: RequisitionHistoryVM;
    public _mediatorDataService: MediatorDataService;
    constructor();
    constructor(sTaskOID?: string);
    constructor(sTaskOID?: string) {
        super(sTaskOID);
        switch (arguments.length) {
            case 0:
                //Revisit required
                //if (App.GetIsSuspendBufferVMCreation)
                this.CreateVMobject();
                break;
            case 1:
                //super(sTaskOID);            
                break;
        }
        this.OnInitialize();
        this.OnInitComplete();
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
                        this.OnFinishNow();
                        break;
                }
            }
        })
    }

    public override OnInitialize(): void {
        super.OnInitialize();
    }
    public override OnInitComplete(): void {
        this.IsSupplyInstructionCALaunch = true;
        this.GetContextInfo();
        this.oPrescItemVM = new PrescriptionItemVM(null);
        this.oPrescItemVM.FormViewerDetails = new FormViewerVM();
        this.oPrescItemVM.FormViewerDetails.SupplyInstructionVM = new SupplyDispensingInstructionsVM(this.sSupplyInstruction, this.sSupplyComments, this.LorenzoId, this.IdentifyingType, this.oPrescItemVM.IsMCIComponent, this.oPrescItemVM.IsCallForFluid, this.SuppInstrInvokedFromPresChart);
        if (this.oPrescItemVM != null && this.oPrescItemVM.FormViewerDetails != null && this.oPrescItemVM.FormViewerDetails.SupplyInstructionVM != null) {
            this.Ovm = this.oPrescItemVM.FormViewerDetails.SupplyInstructionVM;
            if (this.Ovm != null && !String.IsNullOrEmpty(this.sPrescriptionOIDs)) {
                this.Ovm.sPrescriptionOID = this.sPrescriptionOIDs;
                this.Ovm.OnSubmitCompleted = (s, e) => { this.SupplyInstruction_OnSubmitCompleted(s, e); };
            }
        }
        Common.SetDUAvaliable();
        super.OnInitComplete();
    }
    public override OnValidate(action: WizardAction): boolean {
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
            if (this.Ovm != null && !this.Ovm.IsNextSupply) {
                ObjectHelper.stopScreenFreezeEvent(true);
                if (!this.Ovm.ValidateSupplyInsOnSubmit()) {
                    this.IsFinishClicked = false;
                }
                else {
                    Busyindicator.SetStatusBusy("FINISH");
                    this.SetWIZContextInormation("FINISH");
                    this.Ovm.submitsupplyinstructions();
                    Busyindicator.SetStatusIdle("FINISH");
                }
            }
            else {
                this.IsFinishClicked = false;
            }
        }
    }
    SupplyInstruction_OnSubmitCompleted(IsTechValSubmitted: boolean, sPrescriptionOIDs: string): void {
        this.SetWIZContextInormation("FINISH");
        super.OnFinish();
    }
    public override OnFinishNow(): void {
        super.OnFinishNow();
    }
    public override OnCancel(): void {
        super.OnCancel();
    }
    public override OnReassign(): void {
        super.OnReassign();
    }
    public override OnSuspend(): void {
        if (!this.IsSuspendClicked) {
            this.IsSuspendClicked = true;
            this.SetWIZContextInormation("SUSPEND");
            super.OnSuspend();
        }
    }
    public SetWIZContextInormation(Action: string): void {
        let sQryStr: string = String.Empty;
        if (ContextManager.Instance.NameExists("WZContextInfo")) {
            sQryStr = ContextManager.Instance["WZContextInfo"].ToString();
            sQryStr += "EncounterOID=" + PatientContext.EncounterOid.ToString() + "&";
        }
        sQryStr += "WIZ_Status=" + Action;
        ContextManager.Instance.SetContext("WZContextInfo", sQryStr);
        this.WizardContext["WIZ_Status"] = Action;
        this.WizardContext["WFPATIENTOID"] = PatientContext.PatientOID.ToString();
        this.WizardContext["EncounterOID"] = PatientContext.EncounterOid.ToString();
    }
    private GetContextInfo(): void {
        let nTmpOID: number;
        let bnResult: boolean = true;
        if (ContextManager.Instance["PatientID"] != null && !String.IsNullOrEmpty(ContextManager.Instance["PatientID"].ToString())) {
            bnResult = Number.TryParse(ContextManager.Instance["PatientID"].ToString(), (o) => { nTmpOID = o; });
            PatientContext.PatientOID = nTmpOID;
        }
        if (ContextManager.Instance["PRESCRIPTIONOID"] != null && !String.IsNullOrEmpty(ContextManager.Instance["PRESCRIPTIONOID"].ToString())) {
            PatientContext.PrescriptionOID = ContextManager.Instance["PRESCRIPTIONOID"].ToString();
        }
        if (ContextManager.Instance["PrescType"] != null && !String.IsNullOrEmpty(ContextManager.Instance["PrescType"].ToString())) {
            PatientContext.PrescriptionType = ContextManager.Instance["PrescType"].ToString();
        }
        if (ContextManager.Instance["SecurityToken"] != null && !String.IsNullOrEmpty(ContextManager.Instance["SecurityToken"].ToString())) {
            ContextInfo.SecurityToken = ContextManager.Instance["SecurityToken"].ToString();
        }
        if (ContextManager.Instance["OrganisationOID"] != null && !String.IsNullOrEmpty(ContextManager.Instance["OrganisationOID"].ToString())) {
            AppContextInfo.OrganisationOID = ContextManager.Instance["OrganisationOID"].ToString();
        }
        if (ContextManager.Instance["UserOID"] != null && !String.IsNullOrEmpty(ContextManager.Instance["UserOID"].ToString())) {
            let objUserOid: int64;
            Int64.TryParse(ContextManager.Instance["UserOID"].ToString(), (o) => { objUserOid = o; });
            ContextInfo.UserOID = objUserOid;
        }
        if (ContextManager.Instance["ReleaseVersion"] != null && !String.IsNullOrEmpty(ContextManager.Instance["ReleaseVersion"].ToString())) {
            let objReleaseVer: byte;
            Byte.TryParse(ContextManager.Instance["ReleaseVersion"].ToString(), (o) => { objReleaseVer = o; });
            ContextInfo.ReleaseVersion = objReleaseVer;
        }
        if (ContextManager.Instance["AMCV"] != null && !String.IsNullOrEmpty(ContextManager.Instance["AMCV"].ToString())) {
            AppSessionInfo.AMCV = ContextManager.Instance["AMCV"].ToString();
        }
        if (ContextManager.Instance["EncounterOID"] != null && !String.IsNullOrEmpty(ContextManager.Instance["EncounterOID"].ToString())) {
            let objEncOid: int64;
            Int64.TryParse(ContextManager.Instance["EncounterOID"].ToString(), (o) => { objEncOid = o; });
            PatientContext.EncounterOid = objEncOid;
        }
        if (ContextManager.Instance["MergedPatientOID"] != null && !String.IsNullOrEmpty(ContextManager.Instance["MergedPatientOID"].ToString())) {
            let objMergedPatientOID: int64;
            Int64.TryParse(ContextManager.Instance["MergedPatientOID"].ToString(), (o) => { objMergedPatientOID = o; });
            PatientContext.MergedPatientOID = objMergedPatientOID;
        }
        if (ContextManager.Instance["IsMergedPatient"] != null) {
            PatientContext.IsMergedPatient = ContextManager.Instance["IsMergedPatient"].ToString();
        }
        if (ContextManager.Instance["JobRoleOID"] != null) {
            AppContextInfo.JobRoleOID = ContextManager.Instance["JobRoleOID"].ToString();
        }
        if (ContextManager.Instance["ServiceOID"] != null) {
            let ServiceOID: int64 = 0;
            Int64.TryParse(ContextManager.Instance["ServiceOID"].ToString(), (o) => { ServiceOID = o; });
            MedChartData.ServiceOID = ServiceOID;
        }
        CPremission.sPremission = ContextManager.Instance["PermissionDetails"].ToString();
        if (ContextManager.Instance["LocationOID"] != null) {
            let LocationOID: int64 = 0;
            Int64.TryParse(ContextManager.Instance["LocationOID"].ToString(), (o) => { LocationOID = o; });
            MedChartData.LocationOID = LocationOID;
        }
        if (ContextManager.Instance["FRC-001-CHILD"] != null)
            Common.Frc001Childs = ContextManager.Instance["FRC-001-CHILD"].ToString();
        if (ContextManager.Instance["FRC-002-CHILD"] != null)
            Common.Frc002Childs = ContextManager.Instance["FRC-002-CHILD"].ToString();
        if (ContextManager.Instance["FRC-003-CHILD"] != null)
            Common.Frc003Childs = ContextManager.Instance["FRC-003-CHILD"].ToString();
        if (ContextManager.Instance["FRQ-88-CHILD"] != null)
            Common.Frq88Childs = ContextManager.Instance["FRQ-88-CHILD"].ToString();
        if (ContextManager.Instance["IPPMADU_P2"] != null)
            PatientContext.IPPMADU_P2 = Convert.ToBoolean(ContextManager.Instance["IPPMADU_P2"].ToString());
        if (ContextManager.Instance["TTOPBBDU_P2"] != null)
            PatientContext.TTOPBBDU_P2 = Convert.ToBoolean(ContextManager.Instance["TTOPBBDU_P2"].ToString());
        if (ContextManager.Instance["EncounterOID"] != null)
            PatientContext.EncounterOid = Convert.ToInt64(ContextManager.Instance["EncounterOID"].ToString());
        if (!String.IsNullOrEmpty(this.WizardContext["PATIENTOID"]) && this.WizardContext["PATIENTOID"] != "") {
            ContextManager.Instance["PatientID"] = this.WizardContext["PATIENTOID"];
            PatientContext.PatientOID = Convert.ToInt64(ContextManager.Instance["PatientID"]);
        }
        else if (ContextManager.Instance["PatientID"] != null && ContextManager.Instance["PatientID"].ToString() != "") {
            PatientContext.PatientOID = Convert.ToInt64(ContextManager.Instance["PatientID"]);
        }
        if (ContextManager.Instance["IdentifyingOID"] != null && ContextManager.Instance["IdentifyingOID"].ToString() != "") {
            this.IdentifyingOID = Convert.ToInt64(ContextManager.Instance["IdentifyingOID"]);
        }
        if (!String.IsNullOrEmpty(this.WizardContext["PRESCRIPTIONOID"]) && this.WizardContext["PRESCRIPTIONOID"].ToString() != "") {
            ContextManager.Instance["PRESCRIPTIONOID"] = this.WizardContext["PRESCRIPTIONOID"];
            this.sPrescriptionOIDs = ContextManager.Instance["PRESCRIPTIONOID"].ToString();
            PatientContext.PrescriptionOID = this.sPrescriptionOIDs;
        }
        else if (ContextManager.Instance["PrescItemOID"] != null && ContextManager.Instance["PrescItemOID"].ToString() != "") {
            this.sPrescriptionOIDs = ContextManager.Instance["PrescItemOID"].ToString();
            PatientContext.PrescriptionOID = this.sPrescriptionOIDs;
        }
        if (ContextManager.Instance["PrescType"] != null) {
            this.sPrescriptionType = ContextManager.Instance["PrescType"].ToString();
            PatientContext.PrescriptionType = this.sPrescriptionType;
        }
        if (ContextManager.Instance["IsInfusionON"] != null) {
            PatientContext.IsINFUSIONON = Convert.ToBoolean(ContextManager.Instance["IsInfusionON"].ToString());
        }
        else {
            PatientContext.IsINFUSIONON = true;
        }
        if (ContextManager.Instance["SupplyInstruction"] != null && ContextManager.Instance["SupplyInstruction"].ToString() != "") {
            this.sSupplyInstruction = ContextManager.Instance["SupplyInstruction"].ToString();
        }
        if (ContextManager.Instance["SupplyComments"] != null && ContextManager.Instance["SupplyComments"].ToString() != "") {
            this.sSupplyComments = ContextManager.Instance["SupplyComments"].ToString();
        }
        if (ContextManager.Instance["IdentifyingName"] != null && ContextManager.Instance["IdentifyingName"].ToString() != "") {
            this.IdentifyingName = ContextManager.Instance["IdentifyingName"].ToString();
        }
        else if (!String.IsNullOrEmpty(this.WizardContext["IdentifyingName"]) && this.WizardContext["IdentifyingName"].ToString() != "") {
            this.IdentifyingName = this.WizardContext["IdentifyingName"];
        }
        if (ContextManager.Instance["IdentifyingType"] != null && ContextManager.Instance["IdentifyingType"].ToString() != "") {
            this.IdentifyingType = ContextManager.Instance["IdentifyingType"].ToString();
        }
        else if (!String.IsNullOrEmpty(this.WizardContext["IdentifyingType"]) && this.WizardContext["IdentifyingType"].ToString() != "") {
            this.IdentifyingType = this.WizardContext["IdentifyingType"];
        }
        if (ContextManager.Instance["RouteOID"] != null && ContextManager.Instance["RouteOID"].ToString() != "") {
            this.RouteOID = ContextManager.Instance["RouteOID"].ToString();
        }
        else if (!String.IsNullOrEmpty(this.WizardContext["RouteOID"]) && this.WizardContext["RouteOID"].ToString() != "") {
            this.RouteOID = this.WizardContext["RouteOID"];
        }
        if (ContextManager.Instance["LorenzoId"] != null && ContextManager.Instance["LorenzoId"].ToString() != "") {
            this.LorenzoId = ContextManager.Instance["LorenzoId"].ToString();
        }
        else if (!String.IsNullOrEmpty(this.WizardContext["LorenzoId"]) && this.WizardContext["LorenzoId"].ToString() != "") {
            this.LorenzoId = this.WizardContext["LorenzoId"];
        }
        if (ContextManager.Instance["DosageFormOID"] != null && ContextManager.Instance["DosageFormOID"].ToString() != "") {
            this.DosageFormOID = ContextManager.Instance["DosageFormOID"].ToString();
        }
        else if (!String.IsNullOrEmpty(this.WizardContext["DosageFormOID"]) && this.WizardContext["DosageFormOID"].ToString() != "") {
            this.DosageFormOID = this.WizardContext["DosageFormOID"];
        }
        if (ContextManager.Instance["StrengthText"] != null && ContextManager.Instance["StrengthText"].ToString() != "") {
            this.StrengthText = ContextManager.Instance["StrengthText"].ToString();
        }
        else if (!String.IsNullOrEmpty(this.WizardContext["StrengthText"]) && this.WizardContext["StrengthText"].ToString() != "") {
            this.StrengthText = this.WizardContext["StrengthText"];
        }
        if (!String.IsNullOrEmpty(this.WizardContext["SuppInstrInvokedFromPresChart"]) && this.WizardContext["SuppInstrInvokedFromPresChart"].ToString() != "" && this.WizardContext["SuppInstrInvokedFromPresChart"].ToString() == "TRUE") {
            this.SuppInstrInvokedFromPresChart = true;
        }
        else {
            this.SuppInstrInvokedFromPresChart = false;
        }
        if (ContextManager.Instance["RouteOIDs"] != null && ContextManager.Instance["RouteOIDs"].ToString() != "") {
            this.RouteOIDs = ContextManager.Instance["RouteOIDs"].ToString();
        }
        else if (!String.IsNullOrEmpty(this.WizardContext["RouteOIDs"]) && this.WizardContext["RouteOIDs"].ToString() != "") {
            this.RouteOIDs = this.WizardContext["RouteOIDs"];
        }
        if (ContextManager.Instance["MultipleIdentifyingOID"] != null && ContextManager.Instance["MultipleIdentifyingOID"].ToString() != "") {
            PatientContext.IdentifyingOids = ContextManager.Instance["MultipleIdentifyingOID"].ToString();
        }
        if (ContextManager.Instance["MultipleIdentifyingType"] != null && ContextManager.Instance["MultipleIdentifyingType"].ToString() != "") {
            PatientContext.IdentifyingTypes = ContextManager.Instance["MultipleIdentifyingType"].ToString();
        }
        if (ContextManager.Instance["IsEnableWSCProfile"] != null && ContextManager.Instance["IsEnableWSCProfile"].ToString() != "") {
            if (ProfileData.AdditionalPrescConfig == null)
                ProfileData.AdditionalPrescConfig = new AddPrescribingConfigData();
            if (MedicationCommonProfileData.AddPrescribingConfig == null)
                MedicationCommonProfileData.AddPrescribingConfig = new AddPrescribingConfigData();
            ProfileData.AdditionalPrescConfig.EnableWardStockConfig = Convert.ToBoolean(ContextManager.Instance["IsEnableWSCProfile"].ToString());
            MedicationCommonProfileData.AddPrescribingConfig.EnableWardStockConfig = Convert.ToBoolean(ContextManager.Instance["IsEnableWSCProfile"].ToString());
        }
    }
    oMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        super.OnFinish();
    }
    private CreateVMobject(): void {
        super.ActivityConsideration = new iActivityConsideration();
    }
}
