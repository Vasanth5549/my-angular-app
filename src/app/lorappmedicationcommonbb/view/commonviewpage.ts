import { Component} from "@angular/core";
import { ApplicationHelper, ContextManager, LzoWizard, ObjectHelper, base } from "epma-platform/services";
import { MedDrugDetailsParams } from "../model/meddrugdetailsparams";
import { MedDrugDetailsInputParam,WebServiceURLMedicationCommonBB } from "../utilities/globalvariable";
import { MedicationCommonBB } from "../utilities/medicationcommonbb";
import { medddetailsChild } from "../child/medddetailschild";
import { DoseTypeCode, InfusionTypeCode, PrescriptionTypes, SVIconLaunchFrom } from "../utilities/constants";
import { AppDialogEventargs, IProfileProp, Visibility, WindowButtonType, long,StringComparison } from "epma-platform/models";
import { Busyindicator } from "src/app/lorappcommonbb/busyindicator";
import { MedDoseDetails } from "./meddosedetails";
import { MultipleDoseDetail, PrescriptionItemDetailsVM } from "../viewmodel/prescriptionitemdetailsvm";
import { ProfileFactoryType, Convert, AppActivity } from 'epma-platform/services';
import { CommPrescriptionItemViewVM } from "../viewmodel/prescriptionitemviewvm";
import DateTime from "epma-platform/DateTime";
import { PatientContext,ContextInfo,AppContextInfo} from 'src/app/lorappcommonbb/utilities/globalvariable';
import { ManageSquenceLink } from "../child/medsequentialprescription";
import { CCommSequentialHelper } from 'src/app/lorappmedicationcommonbb/utilities/CSequentialHelper';
import * as IPPManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import {MedicationCommonProfileData} from '../utilities/profiledata';
import {CMedicationLineDisplayData,PrescribingConfigData,} from 'src/app/lorappslprofiletypes/medication';
import { WebServiceURLBB } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { MedSteppedFullPrescriptionVW } from "./medSteppedFullPrescriptionVW";
import { MedTitratedDose } from "./medtitrateddose";
import { TitratedDoseCommonVM } from "../viewmodel/TitratedDoseDetailsCommonVM";
import { MedTitratedDoseView } from "./medtitrateddoseview";
import { ConditionalDoseVM, RequestSource } from "../viewmodel/ConditionalDoseVM";
import { MedConditionalDose } from "./medconditionaldose";

@Component({
    selector: 'commonviewpage',
    templateUrl: './commonviewpage.html',
    styleUrls: ['./commonviewpage.css']
})

export class Commonviewpage extends LzoWizard {
    public iconclick;
    public dosetype;
    public medchildDataContext;
    public objDosecalc:MedDoseDetails;
    public objDoseCalcDataContext: MedDoseDetails;
    public objPrescitemdetvm:PrescriptionItemDetailsVM;
    public objCommPrescriptionItemViewVM: CommPrescriptionItemViewVM;
    public infustionIteminSequence: ManageSquenceLink;
    public GroupSeqNo: number = 0;
    public MultiDoseDetailVM: MultipleDoseDetail;
    public objStepped: MedSteppedFullPrescriptionVW;
    public PrescriptionItemOID: long;
    public PrescriptionTypeCode: string;
    public IsClerkForIPFormView: boolean;
    public objTitrated: MedTitratedDose;
    public oTitratedDoseCommonVM: TitratedDoseCommonVM;
    public objTitratedView: MedTitratedDoseView;
    public sTitle: string;
    public ConditionalVM: ConditionalDoseVM;
    public objConditional: MedConditionalDose;
    public sTitaratedVM = String.Empty;

    constructor() {
        super();
    }
    ngAfterViewInit(): void {
        let contextdata = base.WizardContext;
        this.GetContextData(contextdata);
        let profile: ProfileFactoryType = new ProfileFactoryType();
        profile.OnProfileLoaded = (s, e) => {this.profile_OnProfileLoaded(s, e);};
        profile.GetProfile<CMedicationLineDisplayData>("VW_MEDICONFIG", "MEDLINEDISPLAY");
        profile.GetProfile<PrescribingConfigData>("VW_MEDICONFIG", "PRESCONFIG");  
        let sAppSvrPath:string = CommonBB.GetURLString(MedDrugDetailsInputParam.DrugDetailsInputParams.WebServiceURL, ApplicationHelper.AbsoluteUri);
        WebServiceURLMedicationCommonBB.ManagePrescriptionWS = sAppSvrPath + "/ManagePrescription_P2.asmx";
        WebServiceURLMedicationCommonBB.MedicationMgmtWS = sAppSvrPath + "/MedicationMgmt_P2.asmx";
        WebServiceURLMedicationCommonBB.MedicationAdministrationWS = sAppSvrPath + "/MedicationAdministration_P2.asmx";
        WebServiceURLMedicationCommonBB.IPPMAManagePrescriptionWS = sAppSvrPath + "/IPPMAManagePrescription_P2.asmx";
        WebServiceURLBB.CReferenceWSWS = sAppSvrPath + "/CReferenceWS.asmx";
        WebServiceURLBB.QueryPatientRecordWS = sAppSvrPath + "/QueryPatientRecord.asmx";
        WebServiceURLMedicationCommonBB.SecurityAuthenticationWS = sAppSvrPath + "/CSecurityAuthenticationService.asmx";
        // To Get the context information - already utilized from app component.ts
        // Commented below. Refer app.component.ts - GetContextInfo()
        // ContextInfo.ReleaseVersion = MedDrugDetailsInputParam.DrugDetailsInputParams.ReleaseVersion;
        // ContextInfo.SecurityToken = MedDrugDetailsInputParam.DrugDetailsInputParams.SecurityToken;
        // ContextInfo.UserOID = MedDrugDetailsInputParam.DrugDetailsInputParams.UserOID;
        // PatientContext.PatientOID = Convert.ToInt64(MedDrugDetailsInputParam.DrugDetailsInputParams.PatientID);
        // AppContextInfo.OrganisationOID = MedDrugDetailsInputParam.DrugDetailsInputParams.OrganizationID;
        // PatientContext.EncounterOid = Convert.ToInt64(MedDrugDetailsInputParam.DrugDetailsInputParams.EncounterOID);     
        this.GetConflictConfig();
        MedicationCommonBB.GetWarningCategories();
        MedicationCommonBB.IsCalledFromWeb = true;
        // re-visit 
        // RESTHelper objResthelper = new RESTHelper();
        //     objResthelper.URL = "/EPR/SLAppCallBack.aspx";
        //     objResthelper.PostData = "FunctionName=GetAdjustmentRules";
        //     objResthelper.OnResult += new RESTHelper.OnResulthandler(OnResultGetAdjustmentRules);
        //     objResthelper.EndInvoke();
        this.OnResultGetAdjustmentRules();
    }

    GetContextData(contextdata) {
        MedDrugDetailsInputParam.DrugDetailsInputParams = new MedDrugDetailsParams();
        MedDrugDetailsInputParam.DrugDetailsInputParams.ClerkingFormviewDefaltCode = contextdata.ClerkingFormviewDefaltCode;
        MedDrugDetailsInputParam.DrugDetailsInputParams.ContextEncounterOID = contextdata.ContextEncounterOID;
        MedDrugDetailsInputParam.DrugDetailsInputParams.ContextEncounterTypeCode = contextdata.ContextEncounterTypeCode;
        MedDrugDetailsInputParam.DrugDetailsInputParams.DoseType = contextdata.DoseType;
        MedDrugDetailsInputParam.DrugDetailsInputParams.DrugName = contextdata.DrugName;
        MedDrugDetailsInputParam.DrugDetailsInputParams.EncounterOID = contextdata.EncounterOID;
        MedDrugDetailsInputParam.DrugDetailsInputParams.IconClick = contextdata.IconClick;
        MedDrugDetailsInputParam.DrugDetailsInputParams.InfusionGroupSequenceNo = contextdata.InfusionGroupSequenceNo;
        MedDrugDetailsInputParam.DrugDetailsInputParams.InfusionType = contextdata.InfusionType;
        MedDrugDetailsInputParam.DrugDetailsInputParams.IsDoseCalcExist = contextdata.IsDoseCalcExist;
        MedDrugDetailsInputParam.DrugDetailsInputParams.IsPatientTranferAct = contextdata.IsPatientTranferAct;
        MedDrugDetailsInputParam.DrugDetailsInputParams.LatHWDTTM = contextdata.LatHWDTTM;
        MedDrugDetailsInputParam.DrugDetailsInputParams.LocationOID = contextdata.LocationOID;
        MedDrugDetailsInputParam.DrugDetailsInputParams.LorenzoID = contextdata.LorenzoID;
        MedDrugDetailsInputParam.DrugDetailsInputParams.MCVersion = contextdata.MCVersion;
        MedDrugDetailsInputParam.DrugDetailsInputParams.OrganizationID = contextdata.OrganizationID;
        MedDrugDetailsInputParam.DrugDetailsInputParams.PatientID = contextdata.PatientID;
        MedDrugDetailsInputParam.DrugDetailsInputParams.PrescriptionItemOID = contextdata.PrescriptionItemOID;
        MedDrugDetailsInputParam.DrugDetailsInputParams.PrescriptionTypeCode = contextdata.PrescriptionTypeCode;
        MedDrugDetailsInputParam.DrugDetailsInputParams.ReleaseVersion = contextdata.ReleaseVersion;
        MedDrugDetailsInputParam.DrugDetailsInputParams.RoleProfileName = contextdata.RoleProfileName;
        MedDrugDetailsInputParam.DrugDetailsInputParams.SecurityToken = contextdata.SecurityToken;
        MedDrugDetailsInputParam.DrugDetailsInputParams.ServiceOID = contextdata.ServiceOID;
        MedDrugDetailsInputParam.DrugDetailsInputParams.TechValDef = contextdata.TechValDef;
        MedDrugDetailsInputParam.DrugDetailsInputParams.UserOID = contextdata.UserOID;
        MedDrugDetailsInputParam.DrugDetailsInputParams.WebServiceURL = contextdata.WebServiceURL;
    }
    OnResultGetAdjustmentRules() {
        // re-visit 
        // XmlSerializer serializer = new XmlSerializer(typeof(SLDSTInfo));
        // using (XmlReader reader = XmlReader.Create(new StringReader(Result)))
        // {
        //     SLDateUtility.DSTInfo = (SLDSTInfo)serializer.Deserialize(reader);
        // }
        if (String.Compare(MedDrugDetailsInputParam.DrugDetailsInputParams.IconClick, "DoseIcon", StringComparison.OrdinalIgnoreCase) == 0) {
            // <!--Stepped variable icon click-->
            if (String.Compare(MedDrugDetailsInputParam.DrugDetailsInputParams.DoseType, "Stepped/Variable", StringComparison.CurrentCultureIgnoreCase) == 0) {
                Busyindicator.SetStatusBusy("SteppenFullPrescription");
                this.MultiDoseDetailVM = new MultipleDoseDetail(MedDrugDetailsInputParam.DrugDetailsInputParams.PrescriptionItemOID, MedDrugDetailsInputParam.DrugDetailsInputParams.MCVersion, DoseTypeCode.STEPPEDVARIABLE, "EPR",
                    !String.IsNullOrEmpty(MedDrugDetailsInputParam.DrugDetailsInputParams.PrescriptionTypeCode)
                        ? MedDrugDetailsInputParam.DrugDetailsInputParams.PrescriptionTypeCode
                        : PatientContext.PrescriptionType);
                this.MultiDoseDetailVM.SteppedDoseCompleted = (s, e) => { this.SteppedVMDoseCompleted(this.MultiDoseDetailVM); };
            }
            // <!--Titrated icon click-->
            else if (String.Compare(MedDrugDetailsInputParam.DrugDetailsInputParams.DoseType, "Titrated", StringComparison.CurrentCultureIgnoreCase) == 0) {
                Busyindicator.SetStatusBusy("Titratediconclick");
                this.PrescriptionItemOID = 0;
                this.PrescriptionTypeCode = String.Empty;
                this.IsClerkForIPFormView = false;
                if (MedDrugDetailsInputParam.DrugDetailsInputParams != null) {
                    this.sTitle = MedDrugDetailsInputParam.DrugDetailsInputParams.DrugName;
                    this.PrescriptionItemOID = MedDrugDetailsInputParam.DrugDetailsInputParams.PrescriptionItemOID;
                    this.PrescriptionTypeCode = MedDrugDetailsInputParam.DrugDetailsInputParams.PrescriptionTypeCode;
                    if (String.Equals(MedDrugDetailsInputParam.DrugDetailsInputParams.ClerkingFormviewDefaltCode, "CC_FRMVWRMAND")
                        && !String.IsNullOrEmpty(this.PrescriptionTypeCode) && String.Equals(this.PrescriptionTypeCode, PrescriptionTypes.Clerking)) {
                        this.IsClerkForIPFormView = true;
                    }
                    if ((this.PrescriptionTypeCode != PrescriptionTypes.Discharge && this.PrescriptionTypeCode != PrescriptionTypes.Outpatient && this.PrescriptionTypeCode != PrescriptionTypes.Leave && this.PrescriptionTypeCode != PrescriptionTypes.Clerking) || this.IsClerkForIPFormView) {
                        this.MultiDoseDetailVM = new MultipleDoseDetail(MedDrugDetailsInputParam.DrugDetailsInputParams.PrescriptionItemOID, MedDrugDetailsInputParam.DrugDetailsInputParams.MCVersion, DoseTypeCode.TITRATED, "EPR", this.PrescriptionTypeCode);
                        this.MultiDoseDetailVM.TitratedDoseCompleted = (s, e) => { this.MultiDoseDetailVM_TitratedDoseCompleted(); };
                    }
                    else if (this.PrescriptionTypeCode == PrescriptionTypes.Discharge || this.PrescriptionTypeCode == PrescriptionTypes.Outpatient || this.PrescriptionTypeCode == PrescriptionTypes.Leave || this.PrescriptionTypeCode == PrescriptionTypes.Clerking) {
                        this.oTitratedDoseCommonVM = new TitratedDoseCommonVM();
                        this.oTitratedDoseCommonVM.InputPrescriptionItemOID = this.PrescriptionItemOID;
                        this.objTitratedView = new MedTitratedDoseView(this.oTitratedDoseCommonVM);
                        this.sTitaratedVM = "MedTitratedDoseView";
                    }
                    Busyindicator.SetStatusIdle("Titratediconclick");
                }
            }
            // <!--Conditional icon click-->
            else if (String.Compare(MedDrugDetailsInputParam.DrugDetailsInputParams.DoseType, "Conditional", StringComparison.CurrentCultureIgnoreCase) == 0) {
                if (this.ConditionalVM == null) {
                    this.ConditionalVM = new ConditionalDoseVM(RequestSource.ViewDrugDetails, MedDrugDetailsInputParam.DrugDetailsInputParams.PrescriptionItemOID,false);
                }
                this.objConditional = new MedConditionalDose();
                if (MedDrugDetailsInputParam.DrugDetailsInputParams != null && !String.IsNullOrEmpty(MedDrugDetailsInputParam.DrugDetailsInputParams.InfusionType)
                    && (String.Compare(MedDrugDetailsInputParam.DrugDetailsInputParams.InfusionType, InfusionTypeCode.CONTINUOUS, StringComparison.OrdinalIgnoreCase) == 0
                        || String.Compare(MedDrugDetailsInputParam.DrugDetailsInputParams.InfusionType, InfusionTypeCode.FLUID, StringComparison.OrdinalIgnoreCase) == 0
                        || String.Compare(MedDrugDetailsInputParam.DrugDetailsInputParams.InfusionType, InfusionTypeCode.SINGLEDOSEVOLUME, StringComparison.OrdinalIgnoreCase) == 0)) {
                    this.ConditionalVM.IsMonitoringPeriodvisible = Visibility.Visible;
                }
                this.objConditional.DataContext = this.ConditionalVM;
                this.objConditional.InfusionType = MedDrugDetailsInputParam.DrugDetailsInputParams.InfusionType;
                this.objConditional.DoseType = MedDrugDetailsInputParam.DrugDetailsInputParams.DoseType;
            }
        }
        // <!--Dose calculator-->

        else if (String.Compare(MedDrugDetailsInputParam.DrugDetailsInputParams.IconClick, "DoseCalIcon", StringComparison.CurrentCultureIgnoreCase) == 0) {
            Busyindicator.SetStatusBusy("DCIconClicked");
            this.objDosecalc = new MedDoseDetails();
            this.objPrescitemdetvm = new PrescriptionItemDetailsVM();
            this.objDosecalc.PrescriptionItemOID = MedDrugDetailsInputParam.DrugDetailsInputParams.PrescriptionItemOID;
            this.objDosecalc.MCVersion = MedDrugDetailsInputParam.DrugDetailsInputParams.MCVersion;
            this.objPrescitemdetvm.GetDoseDeatils(MedDrugDetailsInputParam.DrugDetailsInputParams.PrescriptionItemOID);
            this.objPrescitemdetvm.DoseDetailEvent = (s, e) => { this.PrescriptionItemDetailsVM_DoseDetailEvent(this.objPrescitemdetvm); };
        }
        // <!--SequenceIcon-->

        else if (String.Compare(MedDrugDetailsInputParam.DrugDetailsInputParams.IconClick, "SequenceIcon", StringComparison.CurrentCultureIgnoreCase) == 0) {
            Busyindicator.SetStatusBusy("LaunchSeqMez");
            let PrescriptionTypeCode: string = String.Empty;
            let nCurrentEncounterOID: long = PatientContext.EncounterOid;
            this.objCommPrescriptionItemViewVM = new CommPrescriptionItemViewVM();
            this.objCommPrescriptionItemViewVM.GetDomainValuesForSeqMez();
            this.GroupSeqNo = Convert.ToInt32(MedDrugDetailsInputParam.DrugDetailsInputParams.InfusionGroupSequenceNo);
            PrescriptionTypeCode = MedDrugDetailsInputParam.DrugDetailsInputParams.PrescriptionTypeCode;
            let RecordedWTHTDTTM = DateTime.MinValue;
            if (!String.IsNullOrEmpty(MedDrugDetailsInputParam.DrugDetailsInputParams.LatHWDTTM)) {
                DateTime.TryParse(MedDrugDetailsInputParam.DrugDetailsInputParams.LatHWDTTM, (o) => { RecordedWTHTDTTM = o });
                PatientContext.PatientHeightDTTM = RecordedWTHTDTTM;
                PatientContext.PatientWeightDTTM = RecordedWTHTDTTM;
            }
            this.objCommPrescriptionItemViewVM.GetPatientMedications(PrescriptionTypeCode, '7', nCurrentEncounterOID);
            this.objCommPrescriptionItemViewVM.GetMedicationsEvent = (s, e) => { this.CommPrescriptionItemViewVM_GetMedicationsEvent(this.objCommPrescriptionItemViewVM); };
        }


        // <!-- Rx icon click && supplyicon -->

        else {
            this.medchildDataContext = new medddetailsChild()
            this.medchildDataContext.PrescriptionItemOID = MedDrugDetailsInputParam.DrugDetailsInputParams.PrescriptionItemOID;
            this.medchildDataContext.MCVersion = MedDrugDetailsInputParam.DrugDetailsInputParams.MCVersion;
            this.medchildDataContext.LorenzoID = MedDrugDetailsInputParam.DrugDetailsInputParams.LorenzoID;
            this.medchildDataContext.ServiceOID = MedDrugDetailsInputParam.DrugDetailsInputParams.ServiceOID;
            this.medchildDataContext.LocationOID = MedDrugDetailsInputParam.DrugDetailsInputParams.LocationOID;
            if (!String.IsNullOrEmpty(MedDrugDetailsInputParam.DrugDetailsInputParams.IsDoseCalcExist)) {
                this.medchildDataContext.DoseCalcExist = MedDrugDetailsInputParam.DrugDetailsInputParams.IsDoseCalcExist.Equals("2") ? '2' : '1';
            }
            this.medchildDataContext.oLaunchFrom = SVIconLaunchFrom.Rx;
            if (!String.IsNullOrEmpty(MedDrugDetailsInputParam.DrugDetailsInputParams.IsPatientTranferAct)) {
                PatientContext.IsPatientTranferAct = MedDrugDetailsInputParam.DrugDetailsInputParams.IsPatientTranferAct;
            }
            if (MedDrugDetailsInputParam.DrugDetailsInputParams.TechValDef == "true") {
                this.medchildDataContext.TechValDef = true;
            }
            else {
                this.medchildDataContext.TechValDef = false;
            }
        }
        this.iconclick = MedDrugDetailsInputParam.DrugDetailsInputParams.IconClick;
        this.dosetype = MedDrugDetailsInputParam.DrugDetailsInputParams.DoseType;
    }

    PrescriptionItemDetailsVM_DoseDetailEvent(PresItemDetails: PrescriptionItemDetailsVM): void {
        this.objDoseCalcDataContext = new MedDoseDetails();
        this.objDoseCalcDataContext.DataContext = PresItemDetails.DoseDetails;
        Busyindicator.SetStatusIdle('DCIconClicked');
    }
    //Not required below as we are not calling appactivity.window
    /*
    omedDoseDetails_Closed(args:AppDialogEventargs):void
        {
            Busyindicator.SetStatusIdle("DCIconClicked");
            args.AppChildWindow.DialogResult = true;
        }
    */
    CommPrescriptionItemViewVM_GetMedicationsEvent(PresItemDetails: CommPrescriptionItemViewVM) {
        if (PresItemDetails != null && PresItemDetails.MedsResolve != null && this.GroupSeqNo > 0) {
            PatientContext.IsFromEPR = true;
            this.infustionIteminSequence = new ManageSquenceLink();
            CCommSequentialHelper.LaunchItemsInSequenceMezzanine(PresItemDetails.MedsResolve, this.GroupSeqNo, null, this.infustionIteminSequence);
            Busyindicator.SetStatusIdle("LaunchSeqMez");
        }
    }

    //Not required below as we are not calling appactivity.window
    /*
    OnSequentialMezzanineClosed( args:AppDialogEventargs) {
        this.GroupSeqNo = 0;
        this.objCommPrescriptionItemViewVM.GetMedicationsEvent = (s, e) => { this.CommPrescriptionItemViewVM_GetMedicationsEvent(this.objCommPrescriptionItemViewVM); };
        Busyindicator.SetStatusIdle("LaunchSeqMez");
        if (args != null && args.AppChildWindow != null){
            args.AppChildWindow.DialogResult = false;
        }
    }*/
    public GetConflictConfig(): void {
        if (WebServiceURLMedicationCommonBB.IPPMAManagePrescriptionWS != null) {
            let objService: IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient =
                new IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
            let objReqConfig: IPPManagePrescSer.CReqMsgGetMedicationConfilictConfig =
                new IPPManagePrescSer.CReqMsgGetMedicationConfilictConfig();
            objReqConfig.IsMainAppConflictsBC = '1';
            objReqConfig.oContextInformation = CommonBB.FillContext();
            objService.GetMedicationConfilictConfigCompleted = (s, e) => {
                this.ConflictsConfig_Completed(s, e);
            };
            objService.GetMedicationConfilictConfigAsync(objReqConfig);
        }
    }
    private ConflictsConfig_Completed(
        sender: Object,
        e: IPPManagePrescSer.GetMedicationConfilictConfigCompletedEventArgs
    ): void {
        if (e.Error != null) return;
        let objResConfig: IPPManagePrescSer.CResMsgGetMedicationConfilictConfig =
            e.Result;
        if (objResConfig != null) {
            MedicationCommonProfileData.MedConflictConfig =
                e.Result.oMedicationConflictConfig;
        }
    }
    private profile_OnProfileLoaded(sender: object, Result: IProfileProp) {
        if (Result == null){
            return;
        }
        if (Result.Profile instanceof CMedicationLineDisplayData) {
            let objCMedicationLineDisplayData: CMedicationLineDisplayData = ObjectHelper.CreateType<CMedicationLineDisplayData>(
                Result.Profile,
                CMedicationLineDisplayData
              );
            if (objCMedicationLineDisplayData != null) {
                MedicationCommonProfileData.MedLineDisplay = objCMedicationLineDisplayData;
            }
          }
        if (Result.Profile instanceof PrescribingConfigData) {
            let objPrescribeConfigData: PrescribingConfigData =
              ObjectHelper.CreateType<PrescribingConfigData>(
                Result.Profile,
                PrescribingConfigData
              );
            if (objPrescribeConfigData != null)
              MedicationCommonProfileData.PrescribeConfig = objPrescribeConfigData;
          }
    }
    /* private MedSteppedDose_Closed(args: AppDialogEventargs) {
        Busyindicator.SetStatusIdle("SteppenFullPrescription");
        this.objStepped.appDialog.DialogResult = true;
     }*/
    public MultiDoseDetailVM_TitratedDoseCompleted(): void {
        this.objTitrated = new MedTitratedDose();
        this.objTitrated.DataContext = this.MultiDoseDetailVM;
        this.sTitaratedVM = "MedTitratedDose";
        //this.objTitrated.onDialogClose = this.objTitrated_Closed;
        //AppActivity.OpenWindow(this.sTitle, this.objTitrated, this.objTitrated_Closed, "", false, 350, 480, false, WindowButtonType.Close, null);
    }
    // added this function for binding datacontext issue
    public SteppedVMDoseCompleted(MultiDoseDetailVM):void{
        this.objStepped = new MedSteppedFullPrescriptionVW();
        this.objStepped.oLaunchFrom = SVIconLaunchFrom.Rx;
        if (!String.IsNullOrEmpty(MedDrugDetailsInputParam.DrugDetailsInputParams.IsPatientTranferAct)) {
            PatientContext.IsPatientTranferAct = MedDrugDetailsInputParam.DrugDetailsInputParams.IsPatientTranferAct;
        }
        this.objStepped.DataContext = MultiDoseDetailVM;
        if (MedDrugDetailsInputParam.DrugDetailsInputParams != null && !String.IsNullOrEmpty(MedDrugDetailsInputParam.DrugDetailsInputParams.InfusionType)) {
            this.objStepped.sInfusionType = MedDrugDetailsInputParam.DrugDetailsInputParams.InfusionType;
        }
        if (MedDrugDetailsInputParam.DrugDetailsInputParams != null && !String.IsNullOrEmpty(MedDrugDetailsInputParam.DrugDetailsInputParams.PrescriptionTypeCode)) {
            this.objStepped.sPrescriptionTypeCode = MedDrugDetailsInputParam.DrugDetailsInputParams.PrescriptionTypeCode;
        }
        Busyindicator.SetStatusIdle("SteppenFullPrescription");
    }
    //Not required, not calling AppActivity.OpenWindow
    /*public objTitrated_Closed(args: AppDialogEventargs): void {
        Busyindicator.SetStatusIdle("Titratediconclick");
        this.objTitrated.appDialog.DialogResult = true;
    }*/

    //Not required, not calling AppActivity.OpenWindow
    /*public omedobjConditional1_Closed(args: AppDialogEventargs): void {
        args.AppChildWindow.DialogResult = true;
    }*/
    // note: not used in silverlight,
    // private MedDoseCalci_Closed(args: AppDialogEventargs): void {
    //     this.objDosecalc.appDialog.DialogResult = true;
    // }
}
