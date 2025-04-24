//const resourceCulture = "";
const Data = [{ "key": "Cancel_Text", "value": "Cancel" }, { "key": "Cancel_ToolTip", "value": "Select to cancel selection of conditional dose" }, { "key": "cboDiscrepancyReason_ToolTip", "value": "Select reason for dose discrepancy" }, { "key": "chkOtherDose_ToolTip", "value": "Select to enter other dose values" }, { "key": "DoseDetailsIcon_ToolTip", "value": "Select to view conditional dose regime" }, { "key": "DoseDiscrepancy_Msg", "value": "Select dose discrepancy reason, this field is mandatory" }, { "key": "DoseMandatory_Msg", "value": "Dose has not been specified. Please select or specify a dose value in order to proceed." }, { "key": "grdConditionalDose_DoseInstruction_Text", "value": "Dose details" }, { "key": "lblClinicalIncidentValue_ToolTip", "value": "Select to launch clinical incident form" }, { "key": "lblClinicalIncident_Text", "value": "Clinical incident form" }, { "key": "lblConditionalRegime_Text", "value": "Conditional dose regime" }, { "key": "lblDiscrepancyReason_Text", "value": "Discrepancy reason" }, { "key": "lblObservationsResults_Text", "value": "Observations/Results" }, { "key": "lblObservationsResults_ToolTip", "value": "Select to launch observations/results–opening a new window" }, { "key": "lblOtherDoseValue_Text", "value": "Other dose value" }, { "key": "lblOtherDose_Text", "value": "Other dose" }, { "key": "OK_Text", "value": "Ok" }, { "key": "OK_ToolTip", "value": "Select to record specified conditional dose value" }, { "key": "OtherDoseMandatory_Msg", "value": "Dose value cannot be zero or empty." }, { "key": "txtOtherDoseValue_ToolTip", "value": "Enter dose value" }, { "key": "Request_Tooltip", "value": "Supply request" }, { "key": "RequestMedication_ToolTip", "value": "Click to launch request medication" }, { "key": "lblScanRecMedication_Text", "value": "Scan/Record medication" }, { "key": "lblScanRecMedication_ToolTip", "value": "Select to launch Scan/Record medication" }];
class ResourceManager {
    static GetString(key: string, resourceCulture: any): string {
        let r = Data.find((e) => e.key == key);
        return r != undefined ? r.value : "";
    }
}

export class ConditionalRegime {
    private static resourceCulture = "";
    constructor() {

    }
    GetResourceString(key: string): string {
        let r = Data.find((e) => e.key == key);
        return r != undefined ? r.value : "";
    }
    public static get Cancel_Text(): string {
        return ResourceManager.GetString("Cancel_Text", ConditionalRegime.resourceCulture);
    }
    public static get Cancel_ToolTip(): string {
        return ResourceManager.GetString("Cancel_ToolTip", ConditionalRegime.resourceCulture);
    }
    public static get cboDiscrepancyReason_ToolTip(): string {
        return ResourceManager.GetString("cboDiscrepancyReason_ToolTip", ConditionalRegime.resourceCulture);
    }
    public static get chkOtherDose_ToolTip(): string {
        return ResourceManager.GetString("chkOtherDose_ToolTip", ConditionalRegime.resourceCulture);
    }
    public static get DoseDetailsIcon_ToolTip(): string {
        return ResourceManager.GetString("DoseDetailsIcon_ToolTip", ConditionalRegime.resourceCulture);
    }
    public static get DoseDiscrepancy_Msg(): string {
        return ResourceManager.GetString("DoseDiscrepancy_Msg", ConditionalRegime.resourceCulture);
    }
    public static get DoseMandatory_Msg(): string {
        return ResourceManager.GetString("DoseMandatory_Msg", ConditionalRegime.resourceCulture);
    }
    public static get grdConditionalDose_DoseInstruction_Text(): string {
        return ResourceManager.GetString("grdConditionalDose_DoseInstruction_Text", ConditionalRegime.resourceCulture);
    }
    public static get lblClinicalIncident_Text(): string {
        return ResourceManager.GetString("lblClinicalIncident_Text", ConditionalRegime.resourceCulture);
    }
    public static get lblClinicalIncidentValue_ToolTip(): string {
        return ResourceManager.GetString("lblClinicalIncidentValue_ToolTip", ConditionalRegime.resourceCulture);
    }
    public static get lblConditionalRegime_Text(): string {
        return ResourceManager.GetString("lblConditionalRegime_Text", ConditionalRegime.resourceCulture);
    }
    public static get lblDiscrepancyReason_Text(): string {
        return ResourceManager.GetString("lblDiscrepancyReason_Text", ConditionalRegime.resourceCulture);
    }
    public static get lblObservationsResults_Text(): string {
        return ResourceManager.GetString("lblObservationsResults_Text", ConditionalRegime.resourceCulture);
    }
    public static get lblObservationsResults_ToolTip(): string {
        return ResourceManager.GetString("lblObservationsResults_ToolTip", ConditionalRegime.resourceCulture);
    }
    public static get lblOtherDose_Text(): string {
        return ResourceManager.GetString("lblOtherDose_Text", ConditionalRegime.resourceCulture);
    }
    public static get lblOtherDoseValue_Text(): string {
        return ResourceManager.GetString("lblOtherDoseValue_Text", ConditionalRegime.resourceCulture);
    }
    public static get lblScanRecMedication_Text(): string {
        return ResourceManager.GetString("lblScanRecMedication_Text", ConditionalRegime.resourceCulture);
    }
    public static get lblScanRecMedication_ToolTip(): string {
        return ResourceManager.GetString("lblScanRecMedication_ToolTip", ConditionalRegime.resourceCulture);
    }
    public static get OK_Text(): string {
        return ResourceManager.GetString("OK_Text", ConditionalRegime.resourceCulture);
    }
    public static get OK_ToolTip(): string {
        return ResourceManager.GetString("OK_ToolTip", ConditionalRegime.resourceCulture);
    }
    public static get OtherDoseMandatory_Msg(): string {
        return ResourceManager.GetString("OtherDoseMandatory_Msg", ConditionalRegime.resourceCulture);
    }
    public static get Request_Tooltip(): string {
        return ResourceManager.GetString("Request_Tooltip", ConditionalRegime.resourceCulture);
    }
    public static get RequestMedication_ToolTip(): string {
        return ResourceManager.GetString("RequestMedication_ToolTip", ConditionalRegime.resourceCulture);
    }
    public static get txtOtherDoseValue_ToolTip(): string {
        return ResourceManager.GetString("txtOtherDoseValue_ToolTip", ConditionalRegime.resourceCulture);
    }
}