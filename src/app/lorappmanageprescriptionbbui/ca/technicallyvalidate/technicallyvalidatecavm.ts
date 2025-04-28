
import { ProfileFactoryType,ContextManager,Convert, MediatorDataService } from 'epma-platform/services';
import { ProfileContext, StringComparison, List, WizardAction } from 'epma-platform/models';
import { MessageEventArgs, iMessageBox, MessageBoxButton, MessageBoxType } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { LzoWizardVmbaseService as LzoWizardVMBase } from 'src/app/shared/epma-platform/services/lzo-wizard-vmbase.service';
import { PrescriptionItemVM } from '../../viewmodel/PrescriptionItemVM';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { FormViewerVM } from '../../viewmodel/formviewervm';
import { TechvalidateCAVM } from '../../viewmodel/TechvalidateCAVM';
import { Common } from '../../utilities/common';
import { ContextInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { QueryStringInfo } from '../../utilities/globalvariable';
import { Resource } from '../../resource';
import { ProfileData } from '../../utilities/profiledata';
import { PrintUtility } from '../../utilities/csprintutility';
import { csResolveUtility } from '../../utilities/csresolveutility';
import { PrescriptionHelper } from '../../utilities/prescriptionhelper';
import { PrescriptionTypes } from '../../utilities/constants';
import { LockedUsersDetails, MedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { AddPrescribingConfigData, CChartDisplayConfig, CMedicationLineDisplayData, MedDrugDisplayConfigData, PrescribingConfigData, PrintConfigurationData } from 'src/app/lorappslprofiletypes/medication';
import { MedicationCommonProfileData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { iActivityConsideration } from 'epma-platform/controls';
import { MedChartData } from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { InjectorInstance } from 'src/app/app.module';
import { PropertyChangedEventArgs } from 'src/app/shared/epma-platform/controls/epma-tab/epma-tab.component';

    export class TechnicallyValidateCAVM extends LzoWizardVMBase {
        sPrescriptionType: string = String.Empty;
        sPrescriptionOIDs: string = String.Empty;
        sStationeryDetails: string = String.Empty;
        sPrintStatus: string = String.Empty;
        IsPrint: boolean = false;
        PrinterPolicy: string = String.Empty;
        PrescriptionIDS: string = String.Empty;
        IsConsolidatedPrint: boolean = false;
        private consolidatedPrinterPolicy: string;
        private consolidatedtemplate: string;
        private consolidatedtemplateName: string;
        private ConsolidatedPrinterPolicy: string;
        public oPrescItemVM: PrescriptionItemVM;
        public IsFinishClicked: boolean = false;
        public IsSuspendClicked: boolean = false;
        //public delegate void TechvalProfileDelegate();
public TechvalProfileCompleted: Function;
public _mediatorDataService: MediatorDataService;
constructor();
constructor(sTaskOID?: string) {
    super(sTaskOID);
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
    this.OnInitComplete();
    // Suspend task related code, commented based on platform's suggestion
    // if (arguments.length == 0) {
    //     if (App.GetIsSuspendBufferVMCreation)
    //         this.CreateVMobject();
    // }
}
private NotifyPropertyChanged(prop: string) {
    let e:PropertyChangedEventArgs = { PropertyName: prop};
      if (this.PropertyChanged)
        this.PropertyChanged({},e);
}
public override OnInitialize(): void
        {
            super.OnInitialize();
        }
public override OnInitComplete(): void
        {
            Busyindicator.SetStatusBusy("TechValidate_Startup");
            if(String.Compare(this.WizardContext["MenuCode"], "MN_MED_VALIDATE_S_P2") == 0)
    {
        this.oPrescItemVM = new PrescriptionItemVM(null);
        this.oPrescItemVM.FormViewerDetails = new FormViewerVM();
        this.oPrescItemVM.FormViewerDetails.TechvalidateCADetails = new TechvalidateCAVM();
        this.oPrescItemVM.FormViewerDetails.TechvalidateCADetails.OnSubmitCompleted  = (s,e) => { this.TechValidateDetails_OnSubmitCompleted(s,e); } ;
        this.oPrescItemVM.FormViewerDetails.TechvalidateCADetails.LoadPrescriptionData();
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
    if (ContextManager.Instance["PRESCRIPTIONOID"] != null) {
        this.PrescriptionIDS = ContextManager.Instance["PRESCRIPTIONOID"].ToString();
    }
    ContextInfo.Culture = Convert.ToString(ContextManager.Instance["Culture"]);
    this.GetProfileData();
    if (!String.IsNullOrEmpty(this.WizardContext["LaunchFrom"]) && String.Equals(this.WizardContext["LaunchFrom"], "MN_MEDCHART")) {
        QueryStringInfo.IsLaunchformMedchart = "True";
    }
    if (!String.IsNullOrEmpty(this.WizardContext["LaunchFrom"]) && String.Equals(this.WizardContext["LaunchFrom"], "MN_PRESCCHART_P2")) {
        QueryStringInfo.FromPreschart = "True";
    }
    if (this.WizardContext["IsClnicalNote"] == "Yes") {
        QueryStringInfo.FromClinicalNote = "True";
    }
    if (ContextManager.Instance["RequestLockOID"] != null) {
        QueryStringInfo.RequestLockOID = ContextManager.Instance["RequestLockOID"].ToString();
    }
    Common.SetDUAvaliable();
    super.OnInitComplete();
    if (ContextManager.Instance["FRC-001-CHILD"] != null)
        Common.Frc001Childs = ContextManager.Instance["FRC-001-CHILD"].ToString();
    if (ContextManager.Instance["FRC-002-CHILD"] != null)
        Common.Frc002Childs = ContextManager.Instance["FRC-002-CHILD"].ToString();
    if (ContextManager.Instance["FRC-003-CHILD"] != null)
        Common.Frc003Childs = ContextManager.Instance["FRC-003-CHILD"].ToString();
    if (ContextManager.Instance["FRQ-88-CHILD"] != null)
        Common.Frq88Childs = ContextManager.Instance["FRQ-88-CHILD"].ToString();
    if (PatientContext.EncounterType == null) {
        if (!String.IsNullOrEmpty(this.WizardContext["ENCTYPE"]))
            PatientContext.EncounterType = this.WizardContext["ENCTYPE"];
        else PatientContext.EncounterType = ContextManager.Instance["EncounterType"].ToString();
    }
    if (ContextManager.Instance["IsPatientTranferAct"] != null && PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration) {
        PatientContext.IsPatientTranferAct = ContextManager.Instance["IsPatientTranferAct"].ToString();
    }
}
TechValidateDetails_OnSubmitCompleted(IsTechValSubmitted: boolean, sPrescriptionOIDs: string): void
    {
        if(IsTechValSubmitted) {
            if (!String.IsNullOrEmpty(sPrescriptionOIDs))
                this.TechValidateSubmitPrint(sPrescriptionOIDs);
            else this.TechValidateSubmitPrint(this.PrescriptionIDS);
        }
 else {
            super.OnFinish();
        }
    }
public override OnValidate(action: WizardAction): boolean
{
    return super.OnValidate(action);
}
public override OnNext(): void
    {
        super.OnNext();
    }
public override OnPrevious(): void
    {
        super.OnPrevious();
    }
public override OnFinish(): void
    {
        if(!this.IsFinishClicked) {
            this.IsFinishClicked = true;
            let sMenuCode: string = super.AppContext.MenuCode;
            let _lockedUserDetails: LockedUsersDetails;
            this.SetWIZContextInormation("FINISH");

            if (!MedicationCommonBB.IsLockStillValid(String.IsNullOrEmpty(QueryStringInfo.RequestLockOID) ? 0 : Number.Parse(QueryStringInfo.RequestLockOID), sMenuCode, (o) => { _lockedUserDetails = o })) {     
                let oMsgBox: iMessageBox = new iMessageBox();
                oMsgBox.MessageBoxClose  = (s,e) => { this.oMsgBox_MessageBoxClose(s,e); } ;
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
                if (!this.oPrescItemVM.IsNextSupply) {
                    Busyindicator.SetStatusBusy("FINISH");
                    this.oPrescItemVM.FormViewerDetails.TechvalidateCADetails.TechnicalValidateSubmit();
                }
                this.IsFinishClicked = false;
            }
        }
    }
public override OnFinishNow(): void
    {
        super.OnFinishNow();
    }
public override OnCancel(): void
    {
        super.OnCancel();
    }
public override OnReassign(): void
    {
        super.OnReassign();
    }
public override OnSuspend(): void
    {
        if(!this.IsSuspendClicked) {
            this.IsSuspendClicked = true;
            this.SetWIZContextInormation("SUSPEND");
            super.OnSuspend();
        }
    }
public SetWIZContextInormation(Action: string): void
    {
        let sQryStr: string = String.Empty;
        if(ContextManager.Instance.NameExists("WZContextInfo"))
{
    sQryStr = ContextManager.Instance["WZContextInfo"].ToString();
    sQryStr += "EncounterOID=" + PatientContext.EncounterOid.ToString() + "&";
}
sQryStr += "WIZ_Status=" + Action;
ContextManager.Instance.SetContext("WZContextInfo", sQryStr);
this.WizardContext["WIZ_Status"] = Action;
this.WizardContext["WFPATIENTOID"] = PatientContext.PatientOID.ToString();
this.WizardContext["EncounterOID"] = PatientContext.EncounterOid.ToString();
}
private GetProfileData(): void
    {
        let profile: ProfileFactoryType = new ProfileFactoryType();
        profile.OnProfileListLoaded  = (s,e) => { this.profile_OnProfileLoaded(s,e); } ;
        let lstProfileReq: List<ProfileContext>  = new List<ProfileContext>();
        let objReq: ProfileContext = new ProfileContext();
        objReq.ContextCode = "VW_MEDICONFIG";
        objReq.ProfileItemKey = "MEDLINEDISPLAY";
        objReq.ProfileType = typeof(CMedicationLineDisplayData) ;
        objReq.ProfileLevel = ProfileFactoryType.Level.User;
        lstProfileReq.Add(objReq);
        objReq = new ProfileContext();
        objReq.ContextCode = "VW_MEDICONFIG";
        objReq.ProfileItemKey = "PRINTCFG";
        objReq.ProfileType = typeof(PrintConfigurationData) ;
        objReq.ProfileLevel = ProfileFactoryType.Level.User;
        lstProfileReq.Add(objReq);
        objReq = new ProfileContext();
        objReq.ContextCode = "VW_MEDICONFIG";
        objReq.ProfileItemKey = "DRUGDISPCONFIG";
        objReq.ProfileType = typeof(MedDrugDisplayConfigData) ;
        objReq.ProfileLevel = ProfileFactoryType.Level.User;
        lstProfileReq.Add(objReq);
        objReq = new ProfileContext();
        objReq.ContextCode = "VW_MEDICONFIG";
        objReq.ProfileItemKey = "ADDPRESCRIBINGCONFIG";
        objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
        objReq.ProfileType = typeof(AddPrescribingConfigData) ;
        lstProfileReq.Add(objReq);
        objReq = new ProfileContext();
        objReq.ContextCode = "VW_MEDICONFIG";
        objReq.ProfileItemKey = "PRESCONFIG";
        objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
        objReq.ProfileType = typeof(PrescribingConfigData) ;
        lstProfileReq.Add(objReq);
        profile.GetProfilesData(lstProfileReq);
    }
private GetProfileChartData(): void
    {
        let profile: ProfileFactoryType = new ProfileFactoryType();
        profile.OnProfileListLoaded  = (s,e) => { this.profile_OnProfileChartLoaded(s,e); } ;
        let lstProfileChartReq: List<ProfileContext>  = new List<ProfileContext>();
        let objReq: ProfileContext = new ProfileContext();
        objReq = new ProfileContext();
        objReq.ContextCode = "MA_ADMINSETTING";
        objReq.ProfileItemKey = "MACHARTDISPLAYCONFIG";
        objReq.ProfileType = typeof(CChartDisplayConfig) ;
        objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
        lstProfileChartReq.Add(objReq);
        profile.GetProfilesData(lstProfileChartReq);
    }
profile_OnProfileChartLoaded(sender: Object, Result: List<ProfileContext> ): void
    {
        Result.forEach( (oProfileContext)=> {
            if (oProfileContext.ContextCode == "MA_ADMINSETTING" && oProfileContext.ProfileItemKey == "MACHARTDISPLAYCONFIG") {
                if (oProfileContext.ProfileData instanceof CChartDisplayConfig) {
                    ProfileData.ChartDisplayConfig = ObjectHelper.CreateType<CChartDisplayConfig>(oProfileContext.ProfileData, CChartDisplayConfig);
                    if (ProfileData.ChartDisplayConfig != null) {
                        if (!String.IsNullOrEmpty(ProfileData.ChartDisplayConfig.AsRequiredSlotsColor)) {
                            MedChartData.AsRequiredSlotsColor = CommonBB.ToColor(ProfileData.ChartDisplayConfig.AsRequiredSlotsColor);
                            this.NotifyPropertyChanged("AsRequiredSlotsColor");
                        }
                        if (!String.IsNullOrEmpty(ProfileData.ChartDisplayConfig.DueSlotsColor)) {
                            MedChartData.DueSlotsColor = CommonBB.ToColor(ProfileData.ChartDisplayConfig.DueSlotsColor);
                        }
                        if (!String.IsNullOrEmpty(ProfileData.ChartDisplayConfig.OmittedSlotsColor)) {
                            MedChartData.OmittedSlotsColor = CommonBB.ToColor(ProfileData.ChartDisplayConfig.OmittedSlotsColor);
                        }
                        if (!String.IsNullOrEmpty(ProfileData.ChartDisplayConfig.OverDueSlotsColor)) {
                            MedChartData.OverDueSlotsColor = CommonBB.ToColor(ProfileData.ChartDisplayConfig.OverDueSlotsColor);
                        }
                        if (!String.IsNullOrEmpty(ProfileData.ChartDisplayConfig.TodayOutlineColor)) {
                            MedChartData.TodayOutlineColor = CommonBB.ToColor(ProfileData.ChartDisplayConfig.TodayOutlineColor);
                        }
                    }
                }
            }
        });
    }

private _MedLineDisplay: CMedicationLineDisplayData;
public get MedLineDisplay(): CMedicationLineDisplayData {
    return this._MedLineDisplay;
}
public set MedLineDisplay(value: CMedicationLineDisplayData) {
    this._MedLineDisplay = value;
}
 profile_OnProfileLoaded(sender: Object, Result: List<ProfileContext> ): void
        {
            Result.forEach( (oProfileContext)=> {
                if (String.Compare(oProfileContext.ContextCode, "VW_MEDICONFIG") == 0 && String.Compare(oProfileContext.ProfileItemKey, "MEDLINEDISPLAY") == 0) {
                    if (oProfileContext.ProfileData instanceof CMedicationLineDisplayData) {
                        MedicationCommonProfileData.MedLineDisplay = ObjectHelper.CreateType<CMedicationLineDisplayData>(oProfileContext.ProfileData, CMedicationLineDisplayData);
                        this.MedLineDisplay = MedicationCommonProfileData.MedLineDisplay;
                    }
                }
                if (String.Compare(oProfileContext.ContextCode, "VW_MEDICONFIG") == 0 && String.Compare(oProfileContext.ProfileItemKey, "PRINTCFG") == 0) {
                    if (oProfileContext.ProfileData instanceof PrintConfigurationData) {
                        ProfileData.PrintConfig = ObjectHelper.CreateType<PrintConfigurationData>(oProfileContext.ProfileData, PrintConfigurationData);
                    }
                }
                if (String.Compare(oProfileContext.ContextCode, "VW_MEDICONFIG") == 0 && String.Compare(oProfileContext.ProfileItemKey, "DRUGDISPCONFIG") == 0) {
                    if (oProfileContext.ProfileData instanceof MedDrugDisplayConfigData) {
                        ProfileData.MedDrugDisplayConfig = ObjectHelper.CreateType<MedDrugDisplayConfigData>(oProfileContext.ProfileData, MedDrugDisplayConfigData);
                    }
                }
                if (String.Compare(oProfileContext.ContextCode, "VW_MEDICONFIG") == 0 && String.Compare(oProfileContext.ProfileItemKey, "ADDPRESCRIBINGCONFIG") == 0) {
                    if (oProfileContext.ProfileData instanceof AddPrescribingConfigData) {
                        ProfileData.AdditionalPrescConfig = ObjectHelper.CreateType<AddPrescribingConfigData>(oProfileContext.ProfileData, AddPrescribingConfigData);
                        MedicationCommonProfileData.AddPrescribingConfig = ObjectHelper.CreateType<AddPrescribingConfigData>(oProfileContext.ProfileData, AddPrescribingConfigData);
                    }
                }
                if (String.Compare(oProfileContext.ContextCode, "VW_MEDICONFIG") == 0 && String.Compare(oProfileContext.ProfileItemKey, "PRESCONFIG") == 0) {
                    if (oProfileContext.ProfileData instanceof PrescribingConfigData) {
                        ProfileData.PrescribeConfig = ObjectHelper.CreateType<PrescribingConfigData>(oProfileContext.ProfileData, PrescribingConfigData);
                        MedicationCommonProfileData.PrescribeConfig = ObjectHelper.CreateType<PrescribingConfigData>(oProfileContext.ProfileData, PrescribingConfigData);
                    }
                }
            });
            this.GetProfileChartData();
            if(this.TechvalProfileCompleted != null)
            this.TechvalProfileCompleted();
        }
async TechValidateSubmitPrint(PrescriptionOIDs: string)
    {
        let sPrescriptionDetails: string = String.Empty;
        let sALTLOCAL: string = String.Empty;
        let ContextPresType: string = PatientContext.PrescriptionType;
        if(ProfileData.PrintConfig != null)
{
    for (let i: number = 0; i < ProfileData.PrintConfig.ActivityConfigData.Count; i++) {
        if (String.Compare(ProfileData.PrintConfig.ActivityConfigData[i].ActivityToPrintAfter, "Technically validate", StringComparison.CurrentCultureIgnoreCase) == 0 && String.Compare(ProfileData.PrintConfig.ActivityConfigData[i].PrescriptiontypeValue, PatientContext.PrescriptionType, StringComparison.CurrentCultureIgnoreCase) == 0 && String.IsNullOrEmpty(ProfileData.PrintConfig.ActivityConfigData[i].SummaryStationeryForConsolidatedPrintValue)) {
            this.IsPrint = true;
            if (ProfileData.PrintConfig.ActivityConfigData[i].PolicyToBeUsed.Contains("Main printer policy") && ProfileData.PrintConfig.ActivityConfigData[i].PolicyToBeUsed.Contains("Alternate printer policy"))
                this.PrinterPolicy = "BOTH";
            else if (ProfileData.PrintConfig.ActivityConfigData[i].PolicyToBeUsed.Contains("Main printer policy"))
                this.PrinterPolicy = "MAIN";
            else if (ProfileData.PrintConfig.ActivityConfigData[i].PolicyToBeUsed.Contains("Alternate printer policy"))
                this.PrinterPolicy = "ALT";
            else this.PrinterPolicy = "NO";
        }
        if (String.Compare(ProfileData.PrintConfig.ActivityConfigData[i].ActivityToPrintAfter, "Technically validate", StringComparison.CurrentCultureIgnoreCase) == 0 && String.Compare(ProfileData.PrintConfig.ActivityConfigData[i].PrescriptiontypeValue, PatientContext.PrescriptionType, StringComparison.CurrentCultureIgnoreCase) == 0 && !String.IsNullOrEmpty(ProfileData.PrintConfig.ActivityConfigData[i].SummaryStationeryForConsolidatedPrintValue)) {
            this.IsConsolidatedPrint = true;
            if (!String.IsNullOrEmpty(ProfileData.PrintConfig.ActivityConfigData[i].SummaryStationeryForConsolidatedPrintValue) && ProfileData.PrintConfig.ActivityConfigData[i].SummaryStationeryForConsolidatedPrintValue.Contains("~")) {
                ProfileData.PrintConfig.ActivityConfigData[i].SummaryStationeryForConsolidatedPrintValue = ProfileData.PrintConfig.ActivityConfigData[i].SummaryStationeryForConsolidatedPrintValue.Replace('~', '#');
            }
            this.consolidatedtemplate = ProfileData.PrintConfig.ActivityConfigData[i].SummaryStationeryForConsolidatedPrintValue;
            this.consolidatedtemplateName = ProfileData.PrintConfig.ActivityConfigData[i].SummaryStationeryForConsolidatedPrint;
            if (ProfileData.PrintConfig.ActivityConfigData[i].PolicyToBeUsed.Contains("Main printer policy") && ProfileData.PrintConfig.ActivityConfigData[i].PolicyToBeUsed.Contains("Alternate printer policy"))
                this.ConsolidatedPrinterPolicy = "BOTH";
            else if (ProfileData.PrintConfig.ActivityConfigData[i].PolicyToBeUsed.Contains("Main printer policy"))
                this.ConsolidatedPrinterPolicy = "MAIN";
            else if (ProfileData.PrintConfig.ActivityConfigData[i].PolicyToBeUsed.Contains("Alternate Printer Policy"))
                this.ConsolidatedPrinterPolicy = "ALT";
            else this.ConsolidatedPrinterPolicy = "NO";
        }
    }
}
if ((this.IsPrint || this.IsConsolidatedPrint) && !String.IsNullOrEmpty(this.WizardContext["MenuCode"]) && String.Compare(this.WizardContext["MenuCode"], "MN_MEDCLERKSL_P2") != 0) {
    let oPrintUtility: PrintUtility = new PrintUtility();
    //let objWizContext: Object = ObjectHelper.CreateType<Object>(this.WizardContext, Object); 
    let objWizContext='';
      Object.keys(this.WizardContext).forEach((key,i)=>{
        if(key != 'objWizardContext'){
            objWizContext = objWizContext + '&' + key + '=' + this.WizardContext[key];

          if(i== Object.keys(this.WizardContext).length - 1)

          objWizContext = objWizContext + '&';

        }
      });
   oPrintUtility.TechValidatePrint(PrescriptionOIDs, ContextPresType, this.PrinterPolicy, objWizContext, PatientContext.PatientOID.ToString(), this.consolidatedtemplate, this.consolidatedtemplateName, this.IsConsolidatedPrint, this.IsPrint, this.ConsolidatedPrinterPolicy, (o1) => { sPrescriptionDetails = o1; }, (o2) => { sALTLOCAL = o2; });
}
this.WizardContext["PrintData"] = sPrescriptionDetails;
this.WizardContext["PrescriptionDetails"] = sPrescriptionDetails;
if (this.IsPrint) {
    this.WizardContext["IsSubmitPrint"] = this.IsPrint.ToString();
    this.WizardContext["IsTechValPrint"] = this.IsPrint.ToString();
    this.WizardContext["PrinterPolicy"] = this.PrinterPolicy;
}
if (this.IsConsolidatedPrint) {
    this.WizardContext["IsSubmitPrint"] = this.IsConsolidatedPrint.ToString();
    this.WizardContext["IsTechValPrint"] = this.IsConsolidatedPrint.ToString();
    this.WizardContext["PrinterPolicy"] = this.ConsolidatedPrinterPolicy;
}
ContextInfo.MenuCode = "MN_MED_VALIDATE_S_P2";
this.WizardContext["IPPALTLOCAL"] = sALTLOCAL;
let sTypeExist: string = "false";
if (ContextPresType == PrescriptionTypes.Discharge && this.WizardContext["IsClnicalNote"] != "Yes") {
    let oResolveUtility: csResolveUtility = new csResolveUtility();

    await oResolveUtility.DischargeSummary((o) => { sTypeExist = o; }, PatientContext.EncounterOid.ToString(), PatientContext.PatientOID.ToString());
}

this.WizardContext["TypeExist"] = sTypeExist;
let sReturnContext = await PrescriptionHelper.PrintPrescription(this.WizardContext);
super.OnFinish(sReturnContext);
//PrescriptionHelper.PrintPrescription(this.WizardContext);
}
oMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void
    {
        super.OnFinish();
    }
private CreateVMobject(): void
    {
        super.ActivityConsideration = new iActivityConsideration();
    } 
                }