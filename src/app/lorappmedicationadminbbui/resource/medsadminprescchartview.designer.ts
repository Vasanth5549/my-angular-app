//const resourceCulture = "";
const Data = [{ "key": "CanManageMedAdministration", "value": "You do not have rights to perform the action" }, { "key": "ChartDrugItemColumnHeader", "value": "Prescription item" }, { "key": "cmdClearSelection_Tooltip", "value": "Select to clear the selection of slots" }, { "key": "cmdEnterDose_Tooltip", "value": "Select to enter dose" }, { "key": "cmdNextDay_Text", "value": "> Day" }, { "key": "cmdNextDay_Tooltip", "value": "Select to move overview into the future by one day" }, { "key": "cmdNextWeek_Text", "value": "> Week" }, { "key": "cmdNextWeek_Tooltip", "value": "Select to move overview into the future by one week" }, { "key": "cmdOmit_Tooltip", "value": "Select to omit the slots" }, { "key": "cmdPrevDay_Text", "value": "< Day" }, { "key": "cmdPrevDay_Tooltip", "value": "Select to move overview into the past by one day" }, { "key": "cmdPrevWeek_Text", "value": "< Week" }, { "key": "cmdPrevWeek_Tooltip", "value": "Select to move overview into the past by one week" }, { "key": "cmdReinstate_Tooltip", "value": "Select to reinstate the slots" }, { "key": "cmdToday_Text", "value": "Go to today" }, { "key": "cmdToday_Tooltip", "value": "Select to move overview into the current day" }, { "key": "lblSortFilter_Text", "value": "Filter by options" }, { "key": "lblSortFilter_Tooltip", "value": "Select to launch filter options" }, { "key": "LockMsg_Prescribechart", "value": "User  {0}  currently has this patient's prescription open for editing. You will not able to perform this activity." }, { "key": "LockMsg_MedChart", "value": "User {0}  currently has this patient's Medication Chart open. Any updates you make to this prescription will not be visible to this user." }, { "key": "LockMsg_ORSPresChart", "value": "This record has already been modified by {0}. You cannot submit this activity." }, { "key": "For_Admin_Medication", "value": "For administration" }, { "key": "Inpatient_Medication", "value": "Inpatient medication" }, { "key": "Infusion_DiscontinueCancel", "value": "You have selected item(s) with administrations that might be currently in progress. Are you sure you want to discontinue? If so you must directly inform the nurse of any changes made" }, { "key": "cmdFluidBalance_Text", "value": "Fluid balance" }, { "key": "cmdFluidBalance_ToolTip", "value": "Click to launch fluid balance" }, { "key": "LockMsg", "value": "User {0} has commenced prescribing for this patient. You cannot submit this prescription." }, { "key": "LockMsg_Abort", "value": "This care activity has already been modified by another user. You will not be able to perform this activity." }, { "key": "NumberofAdministration_ToolTip", "value": "Total number of administrations" }, { "key": "CVMsg_Prescribechart", "value": "As the prescription does not have items to be clinically verified, clinically verify care activity cannot be launched" }, { "key": "TVMsg_Prescribechart", "value": "As the prescription does not have items to be technically validate, technically validate care activity cannot be launched" }, { "key": "chkIncludeDiscontinue_Text", "value": "Include completed / discontinued items" }, { "key": "chkIncludeDiscontinue_ToolTip", "value": "Select to include completed / discontinued  items" }, { "key": "LockMsg_Commenced", "value": "User {0} has commenced an activity for a medication. You cannot submit this activity." }, { "key": "SupplyInstructionMessage", "value": "Supply instructions/Supply comments are currently set for {0} of {1} medications. Do you wish to clear the existing instructions and replace with new instructions for all selected medications?" }, { "key": "SupplyNoItems_Message", "value": "As the prescription does not have items to be supplied, supply instructions care activity cannot be launched" }, { "key": "ReviewGeneralIcon_Tooltip", "value": "Medication review due " }, { "key": "ReviewOmittedIcon_Tooltip", "value": "All doses are currently omitted. Treatment to be reviewed" }, { "key": "FutureSlotGiven", "value": "One or more of the slots have already been administered/started. Do you want to omit the remaining slots?" }, { "key": "AreDiscontinueCancelAllowed", "value": "You cannot discontinue these drugs as these drugs are not included in the prescribable drug list for your prescribing  team. {0}" }, { "key": "IsAmendAllowed", "value": "This drug cannot be amended as it is not included in the prescribable drug list for your team" }, { "key": "IsDiscontinueCancelAllowed", "value": "You cannot discontinue this drug as this drug is not included in the prescribable drug list for your prescribing team. {0}" }, { "key": "IsOmitAllowed", "value": "You cannot omit this drug as this drug is not included in the prescribable drug list for your prescribing team." }, { "key": "IsReinstateAllowed", "value": "You cannot reinstate this drug as this drug is not included in the prescribable drug list for your prescribing team." }, { "key": "IsReviewAllowed", "value": "You cannot review this drug as this drug is not included in the prescribable drug list for your prescribing team." }, { "key": "Htwtpleasereview", "value": ". Please review." }, { "key": "HTwtupdate_text", "value": "Weight/Height has not been updated since" }];
class ResourceManager {
    static GetString(key: string, resourceCulture: any): string {
        let r = Data.find((e) => e.key == key);
        return r != undefined ? r.value : "";
    }
}


export class MedsAdminPrescChartView {
    private static resourceCulture = "";
    constructor() {

    }
    public static get AreDiscontinueCancelAllowed(): string {
        return ResourceManager.GetString("AreDiscontinueCancelAllowed", MedsAdminPrescChartView.resourceCulture);
    }
    public static get CanManageMedAdministration(): string {
        return ResourceManager.GetString("CanManageMedAdministration", MedsAdminPrescChartView.resourceCulture);
    }
    public static get ChartDrugItemColumnHeader(): string {
        return ResourceManager.GetString("ChartDrugItemColumnHeader", MedsAdminPrescChartView.resourceCulture);
    }
    public static get chkIncludeDiscontinue_Text(): string {
        return ResourceManager.GetString("chkIncludeDiscontinue_Text", MedsAdminPrescChartView.resourceCulture);
    }
    public static get chkIncludeDiscontinue_ToolTip(): string {
        return ResourceManager.GetString("chkIncludeDiscontinue_ToolTip", MedsAdminPrescChartView.resourceCulture);
    }
    public static get cmdClearSelection_Tooltip(): string {
        return ResourceManager.GetString("cmdClearSelection_Tooltip", MedsAdminPrescChartView.resourceCulture);
    }
    public static get cmdEnterDose_Tooltip(): string {
        return ResourceManager.GetString("cmdEnterDose_Tooltip", MedsAdminPrescChartView.resourceCulture);
    }
    public static get cmdFluidBalance_Text(): string {
        return ResourceManager.GetString("cmdFluidBalance_Text", MedsAdminPrescChartView.resourceCulture);
    }
    public static get cmdFluidBalance_ToolTip(): string {
        return ResourceManager.GetString("cmdFluidBalance_ToolTip", MedsAdminPrescChartView.resourceCulture);
    }
    public static get cmdNextDay_Text(): string {
        return ResourceManager.GetString("cmdNextDay_Text", MedsAdminPrescChartView.resourceCulture);
    }
    public static get cmdNextDay_Tooltip(): string {
        return ResourceManager.GetString("cmdNextDay_Tooltip", MedsAdminPrescChartView.resourceCulture);
    }
    public static get cmdNextWeek_Text(): string {
        return ResourceManager.GetString("cmdNextWeek_Text", MedsAdminPrescChartView.resourceCulture);
    }
    public static get cmdNextWeek_Tooltip(): string {
        return ResourceManager.GetString("cmdNextWeek_Tooltip", MedsAdminPrescChartView.resourceCulture);
    }
    public static get cmdOmit_Tooltip(): string {
        return ResourceManager.GetString("cmdOmit_Tooltip", MedsAdminPrescChartView.resourceCulture);
    }
    public static get cmdPrevDay_Text(): string {
        return ResourceManager.GetString("cmdPrevDay_Text", MedsAdminPrescChartView.resourceCulture);
    }
    public static get cmdPrevDay_Tooltip(): string {
        return ResourceManager.GetString("cmdPrevDay_Tooltip", MedsAdminPrescChartView.resourceCulture);
    }
    public static get cmdPrevWeek_Text(): string {
        return ResourceManager.GetString("cmdPrevWeek_Text", MedsAdminPrescChartView.resourceCulture);
    }
    public static get cmdPrevWeek_Tooltip(): string {
        return ResourceManager.GetString("cmdPrevWeek_Tooltip", MedsAdminPrescChartView.resourceCulture);
    }
    public static get cmdReinstate_Tooltip(): string {
        return ResourceManager.GetString("cmdReinstate_Tooltip", MedsAdminPrescChartView.resourceCulture);
    }
    public static get cmdToday_Text(): string {
        return ResourceManager.GetString("cmdToday_Text", MedsAdminPrescChartView.resourceCulture);
    }
    public static get cmdToday_Tooltip(): string {
        return ResourceManager.GetString("cmdToday_Tooltip", MedsAdminPrescChartView.resourceCulture);
    }
    public static get CVMsg_Prescribechart(): string {
        return ResourceManager.GetString("CVMsg_Prescribechart", MedsAdminPrescChartView.resourceCulture);
    }
    public static get For_Admin_Medication(): string {
        return ResourceManager.GetString("For_Admin_Medication", MedsAdminPrescChartView.resourceCulture);
    }
    public static get FutureSlotGiven(): string {
        return ResourceManager.GetString("FutureSlotGiven", MedsAdminPrescChartView.resourceCulture);
    }
    public static get Htwtpleasereview(): string {
        return ResourceManager.GetString("Htwtpleasereview", MedsAdminPrescChartView.resourceCulture);
    }
    public static get HTwtupdate_text(): string {
        return ResourceManager.GetString("HTwtupdate_text", MedsAdminPrescChartView.resourceCulture);
    }
    public static get Infusion_DiscontinueCancel(): string {
        return ResourceManager.GetString("Infusion_DiscontinueCancel", MedsAdminPrescChartView.resourceCulture);
    }
    public static get Inpatient_Medication(): string {
        return ResourceManager.GetString("Inpatient_Medication", MedsAdminPrescChartView.resourceCulture);
    }
    public static get IsAmendAllowed(): string {
        return ResourceManager.GetString("IsAmendAllowed", MedsAdminPrescChartView.resourceCulture);
    }
    public static get IsDiscontinueCancelAllowed(): string {
        return ResourceManager.GetString("IsDiscontinueCancelAllowed", MedsAdminPrescChartView.resourceCulture);
    }
    public static get IsOmitAllowed(): string {
        return ResourceManager.GetString("IsOmitAllowed", MedsAdminPrescChartView.resourceCulture);
    }
    public static get IsReinstateAllowed(): string {
        return ResourceManager.GetString("IsReinstateAllowed", MedsAdminPrescChartView.resourceCulture);
    }
    public static get IsReviewAllowed(): string {
        return ResourceManager.GetString("IsReviewAllowed", MedsAdminPrescChartView.resourceCulture);
    }
    public static get lblSortFilter_Text(): string {
        return ResourceManager.GetString("lblSortFilter_Text", MedsAdminPrescChartView.resourceCulture);
    }
    public static get lblSortFilter_Tooltip(): string {
        return ResourceManager.GetString("lblSortFilter_Tooltip", MedsAdminPrescChartView.resourceCulture);
    }
    public static get LockMsg(): string {
        return ResourceManager.GetString("LockMsg", MedsAdminPrescChartView.resourceCulture);
    }
    public static get LockMsg_Abort(): string {
        return ResourceManager.GetString("LockMsg_Abort", MedsAdminPrescChartView.resourceCulture);
    }
    public static get LockMsg_Commenced(): string {
        return ResourceManager.GetString("LockMsg_Commenced", MedsAdminPrescChartView.resourceCulture);
    }
    public static get LockMsg_MedChart(): string {
        return ResourceManager.GetString("LockMsg_MedChart", MedsAdminPrescChartView.resourceCulture);
    }
    public static get LockMsg_ORSPresChart(): string {
        return ResourceManager.GetString("LockMsg_ORSPresChart", MedsAdminPrescChartView.resourceCulture);
    }
    public static get LockMsg_Prescribechart(): string {
        return ResourceManager.GetString("LockMsg_Prescribechart", MedsAdminPrescChartView.resourceCulture);
    }
    public static get NumberofAdministration_ToolTip(): string {
        return ResourceManager.GetString("NumberofAdministration_ToolTip", MedsAdminPrescChartView.resourceCulture);
    }
    public static get ReviewGeneralIcon_Tooltip(): string {
        return ResourceManager.GetString("ReviewGeneralIcon_Tooltip", MedsAdminPrescChartView.resourceCulture);
    }
    public static get ReviewOmittedIcon_Tooltip(): string {
        return ResourceManager.GetString("ReviewOmittedIcon_Tooltip", MedsAdminPrescChartView.resourceCulture);
    }
    public static get SupplyInstructionMessage(): string {
        return ResourceManager.GetString("SupplyInstructionMessage", MedsAdminPrescChartView.resourceCulture);
    }
    public static get SupplyNoItems_Message(): string {
        return ResourceManager.GetString("SupplyNoItems_Message", MedsAdminPrescChartView.resourceCulture);
    }
    public static get TVMsg_Prescribechart(): string {
        return ResourceManager.GetString("TVMsg_Prescribechart", MedsAdminPrescChartView.resourceCulture);
    }
}