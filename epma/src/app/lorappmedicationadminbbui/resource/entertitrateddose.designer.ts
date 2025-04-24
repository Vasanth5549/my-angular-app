//const resourceCulture = "";
const Data = [{ "key": "lblBorder_Text", "value": "Selected slot" }, { "key": "lbldate_Text", "value": "Date" }, { "key": "lbldose_Text", "value": "Dose" }, { "key": "lblUoM_Text", "value": "UOM" }, { "key": "txtDose_ToolTip", "value": "Enter dose" }, { "key": "lbltime_Text", "value": "Time" }, { "key": "cboUoM_ToolTip", "value": "Select dose UOM" }, { "key": "cmdCancel_Text", "value": "Cancel" }, { "key": "cmdCancel_ToolTip", "value": "Select to cancel the activity" }, { "key": "cmdOk_Text", "value": "Ok" }, { "key": "cmdOk_ToolTip", "value": "Select to save the dose" }, { "key": "ErrMsg_Dose", "value": "Please enter a dose value" }, { "key": "ErrMsg_DoseUoM", "value": "Please select a dose UoM" }, { "key": "ErrMsg_DoseProper", "value": "Enter a numeric dose value or TBD" }, { "key": "IsEnterDoseAllowed", "value": "You cannot enter dose for this drug  as this drug is not included in the prescribable drug list for your prescribing  team." }];
class ResourceManager {
    static GetString(key: string, resourceCulture: any): string {
        let r = Data.find((e) => e.key == key);
        return r != undefined ? r.value : "";
    }
}


export class EnterTitratedDose {
    private static resourceCulture = "";
    constructor() {

    }
    public static get cboUoM_ToolTip(): string {
        return ResourceManager.GetString("cboUoM_ToolTip", EnterTitratedDose.resourceCulture);
    }
    public static get cmdCancel_Text(): string {
        return ResourceManager.GetString("cmdCancel_Text", EnterTitratedDose.resourceCulture);
    }
    public static get cmdCancel_ToolTip(): string {
        return ResourceManager.GetString("cmdCancel_ToolTip", EnterTitratedDose.resourceCulture);
    }
    public static get cmdOk_Text(): string {
        return ResourceManager.GetString("cmdOk_Text", EnterTitratedDose.resourceCulture);
    }
    public static get cmdOk_ToolTip(): string {
        return ResourceManager.GetString("cmdOk_ToolTip", EnterTitratedDose.resourceCulture);
    }
    public static get ErrMsg_Dose(): string {
        return ResourceManager.GetString("ErrMsg_Dose", EnterTitratedDose.resourceCulture);
    }
    public static get ErrMsg_DoseProper(): string {
        return ResourceManager.GetString("ErrMsg_DoseProper", EnterTitratedDose.resourceCulture);
    }
    public static get ErrMsg_DoseUoM(): string {
        return ResourceManager.GetString("ErrMsg_DoseUoM", EnterTitratedDose.resourceCulture);
    }
    public static get IsEnterDoseAllowed(): string {
        return ResourceManager.GetString("IsEnterDoseAllowed", EnterTitratedDose.resourceCulture);
    }
    public static get lblBorder_Text(): string {
        return ResourceManager.GetString("lblBorder_Text", EnterTitratedDose.resourceCulture);
    }
    public static get lbldate_Text(): string {
        return ResourceManager.GetString("lbldate_Text", EnterTitratedDose.resourceCulture);
    }
    public static get lbldose_Text(): string {
        return ResourceManager.GetString("lbldose_Text", EnterTitratedDose.resourceCulture);
    }
    public static get lbltime_Text(): string {
        return ResourceManager.GetString("lbltime_Text", EnterTitratedDose.resourceCulture);
    }
    public static get lblUoM_Text(): string {
        return ResourceManager.GetString("lblUoM_Text", EnterTitratedDose.resourceCulture);
    }
    public static get txtDose_ToolTip(): string {
        return ResourceManager.GetString("txtDose_ToolTip", EnterTitratedDose.resourceCulture);
    }
}