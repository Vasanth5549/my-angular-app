//const resourceCulture = "";
const Data = [{ "key": "cboStrikethroughReason_Tooltip", "value": "Select reason for strikethrough" }, { "key": "ChooseModOrStrikethru_Caption", "value": "Choose Modify or Strikethrough" }, { "key": "cmdCancel_Text", "value": "Cancel" }, { "key": "cmdCancel_Tooltip", "value": "Select to cancel strikethrough administration activity" }, { "key": "cmdModify_Tooltip", "value": "Select to modify administration" }, { "key": "cmdOK_Text", "value": "Ok" }, { "key": "cmdOK_Tooltip", "value": "Select Ok to complete strikethrough administration activity" }, { "key": "cmdStrikethru_Tooltip", "value": "Select to strikethrough administration" }, { "key": "lblCIFValue_Tooltip", "value": "Select to launch clinical incident form" }, { "key": "cmdModify_Text", "value": "Modify" }, { "key": "cmdStrikethru_Text", "value": "Strikethrough" }, { "key": "ReasonforStrikethruValidation", "value": "Enter reason for strikethrough, this field is mandatory." }, { "key": "lblMedAction_Text", "value": "Medication action" }, { "key": "lblDose_Text", "value": "Dose" }, { "key": "lblRoute_Text", "value": "Route" }, { "key": "lblSite_Text", "value": "Site" }, { "key": "lblDtTime_Text", "value": "Date/Time given" }, { "key": "lblAdminBy_Text", "value": "Administered by" }, { "key": "lblComments_Text", "value": "Comments" }, { "key": "lblRecBy_Text", "value": "Recorded by" }, { "key": "lblRec2At_Text", "value": "Recorded at" }, { "key": "Strikethru_WindowTitle", "value": "Strikethrough" }, { "key": "tbStrikethru_Text", "value": "Strikethrough administration" }, { "key": "lblBorder_Text", "value": "Information to be struck out" }, { "key": "lblCIF_Text", "value": "Clinical incident form" }, { "key": "lblReason_Text", "value": "Reason for strikethrough" }, { "key": "tbFooter_Text", "value": "This action will leave this slot as overdue/not yet recorded. Do you wish to record administration of this slot as 'Not known'?" }, { "key": "chkOverdue_Text", "value": "Yes" }, { "key": "lblReasonNotGiven_Text", "value": "Reason not given" }, { "key": "cmdClose_Text", "value": "Close" }, { "key": "cmdClose_Tooltip", "value": "Select to close the choose modify or strikethrough administration mezzanine" }, { "key": "DuenessLimit", "value": "The slot selected for {0} is outside the allowed modification time window." }, { "key": "SequentialItems", "value": "You are trying to strikethrough administration for a sequential prescription. Please ensure you strikethrough administration recorded against subsequent items before you proceed." }];
class ResourceManager {
    static GetString(key: string, resourceCulture: any): string {
        let r = Data.find((e) => e.key == key);
        return r != undefined ? r.value : "";
    }
}


export class Strikethrough {
    private static resourceCulture = "";
    constructor() {

    }
    public static get cboStrikethroughReason_Tooltip(): string {
        return ResourceManager.GetString("cboStrikethroughReason_Tooltip", Strikethrough.resourceCulture);
    }
    public static get chkOverdue_Text(): string {
        return ResourceManager.GetString("chkOverdue_Text", Strikethrough.resourceCulture);
    }
    public static get ChooseModOrStrikethru_Caption(): string {
        return ResourceManager.GetString("ChooseModOrStrikethru_Caption", Strikethrough.resourceCulture);
    }
    public static get cmdCancel_Text(): string {
        return ResourceManager.GetString("cmdCancel_Text", Strikethrough.resourceCulture);
    }
    public static get cmdCancel_Tooltip(): string {
        return ResourceManager.GetString("cmdCancel_Tooltip", Strikethrough.resourceCulture);
    }
    public static get cmdClose_Text(): string {
        return ResourceManager.GetString("cmdClose_Text", Strikethrough.resourceCulture);
    }
    public static get cmdClose_Tooltip(): string {
        return ResourceManager.GetString("cmdClose_Tooltip", Strikethrough.resourceCulture);
    }
    public static get cmdModify_Text(): string {
        return ResourceManager.GetString("cmdModify_Text", Strikethrough.resourceCulture);
    }
    public static get cmdModify_Tooltip(): string {
        return ResourceManager.GetString("cmdModify_Tooltip", Strikethrough.resourceCulture);
    }
    public static get cmdOK_Text(): string {
        return ResourceManager.GetString("cmdOK_Text", Strikethrough.resourceCulture);
    }
    public static get cmdOK_Tooltip(): string {
        return ResourceManager.GetString("cmdOK_Tooltip", Strikethrough.resourceCulture);
    }
    public static get cmdStrikethru_Text(): string {
        return ResourceManager.GetString("cmdStrikethru_Text", Strikethrough.resourceCulture);
    }
    public static get cmdStrikethru_Tooltip(): string {
        return ResourceManager.GetString("cmdStrikethru_Tooltip", Strikethrough.resourceCulture);
    }
    public static get lblAdminBy_Text(): string {
        return ResourceManager.GetString("lblAdminBy_Text", Strikethrough.resourceCulture);
    }
    public static get lblBorder_Text(): string {
        return ResourceManager.GetString("lblBorder_Text", Strikethrough.resourceCulture);
    }
    public static get lblCIF_Text(): string {
        return ResourceManager.GetString("lblCIF_Text", Strikethrough.resourceCulture);
    }
    public static get lblCIFValue_Tooltip(): string {
        return ResourceManager.GetString("lblCIFValue_Tooltip", Strikethrough.resourceCulture);
    }
    public static get lblComments_Text(): string {
        return ResourceManager.GetString("lblComments_Text", Strikethrough.resourceCulture);
    }
    public static get lblDose_Text(): string {
        return ResourceManager.GetString("lblDose_Text", Strikethrough.resourceCulture);
    }
    public static get lblDtTime_Text(): string {
        return ResourceManager.GetString("lblDtTime_Text", Strikethrough.resourceCulture);
    }
    public static get lblMedAction_Text(): string {
        return ResourceManager.GetString("lblMedAction_Text", Strikethrough.resourceCulture);
    }
    public static get lblReason_Text(): string {
        return ResourceManager.GetString("lblReason_Text", Strikethrough.resourceCulture);
    }
    public static get lblReasonNotGiven_Text(): string {
        return ResourceManager.GetString("lblReasonNotGiven_Text", Strikethrough.resourceCulture);
    }
    public static get lblRec2At_Text(): string {
        return ResourceManager.GetString("lblRec2At_Text", Strikethrough.resourceCulture);
    }
    public static get lblRecBy_Text(): string {
        return ResourceManager.GetString("lblRecBy_Text", Strikethrough.resourceCulture);
    }
    public static get lblRoute_Text(): string {
        return ResourceManager.GetString("lblRoute_Text", Strikethrough.resourceCulture);
    }
    public static get lblSite_Text(): string {
        return ResourceManager.GetString("lblSite_Text", Strikethrough.resourceCulture);
    }
    public static get ReasonforStrikethruValidation(): string {
        return ResourceManager.GetString("ReasonforStrikethruValidation", Strikethrough.resourceCulture);
    }
    public static get Strikethru_WindowTitle(): string {
        return ResourceManager.GetString("Strikethru_WindowTitle", Strikethrough.resourceCulture);
    }
    public static get tbFooter_Text(): string {
        return ResourceManager.GetString("tbFooter_Text", Strikethrough.resourceCulture);
    }
    public static get tbStrikethru_Text(): string {
        return ResourceManager.GetString("tbStrikethru_Text", Strikethrough.resourceCulture);
    }
    public static get SequentialItems(): string {
        return ResourceManager.GetString("SequentialItems", Strikethrough.resourceCulture);
    }
}