//const resourceCulture = "";
const Data = [{ "key": "cmdCancel_Text", "value": "Cancel" }, { "key": "cmdCancel_ToolTip", "value": "Select to cancel the activity" }, { "key": "cmdOk_Text", "value": "Ok" }, { "key": "cmdOk_ToolTip", "value": "Select to reinstate the selected slots" }, { "key": "ErrMsg_ReinstateReasons", "value": "Enter reinstate reason, this field is mandatory." }, { "key": "lblBorder_Text", "value": "Slot(s) selected to reinstate" }, { "key": "lblBorder_ToolTip", "value": "Selected slots to reinstate" }, { "key": "lblReinstatereason_Text", "value": "Reinstate reason" }, { "key": "txtReinstatereason_ToolTip", "value": "Enter reason to reinstate" }, { "key": "lblCaption_Text", "value": "Reinstate slots" }, { "key": "chkReinstateAll_text", "value": "Reinstate all future omitted slots" }, { "key": "chkReinstateAll_tooltip", "value": "Click to reinstate all future omitted slots" }];
class ResourceManager {
    static GetString(key: string, resourceCulture: any): string {
        let r = Data.find((e) => e.key == key);
        return r != undefined ? r.value : "";
    }
}


export class MedsAdminReinstateslots {
    private static resourceCulture = "";
    constructor() {

    }
    public static get chkReinstateAll_text(): string {
        return ResourceManager.GetString("chkReinstateAll_text", MedsAdminReinstateslots.resourceCulture);
    }
    public static get chkReinstateAll_tooltip(): string {
        return ResourceManager.GetString("chkReinstateAll_tooltip", MedsAdminReinstateslots.resourceCulture);
    }
    public static get cmdCancel_Text(): string {
        return ResourceManager.GetString("cmdCancel_Text", MedsAdminReinstateslots.resourceCulture);
    }
    public static get cmdCancel_ToolTip(): string {
        return ResourceManager.GetString("cmdCancel_ToolTip", MedsAdminReinstateslots.resourceCulture);
    }
    public static get cmdOk_Text(): string {
        return ResourceManager.GetString("cmdOk_Text", MedsAdminReinstateslots.resourceCulture);
    }
    public static get cmdOk_ToolTip(): string {
        return ResourceManager.GetString("cmdOk_ToolTip", MedsAdminReinstateslots.resourceCulture);
    }
    public static get ErrMsg_ReinstateReasons(): string {
        return ResourceManager.GetString("ErrMsg_ReinstateReasons", MedsAdminReinstateslots.resourceCulture);
    }
    public static get lblBorder_Text(): string {
        return ResourceManager.GetString("lblBorder_Text", MedsAdminReinstateslots.resourceCulture);
    }
    public static get lblBorder_ToolTip(): string {
        return ResourceManager.GetString("lblBorder_ToolTip", MedsAdminReinstateslots.resourceCulture);
    }
    public static get lblCaption_Text(): string {
        return ResourceManager.GetString("lblCaption_Text", MedsAdminReinstateslots.resourceCulture);
    }
    public static get lblReinstatereason_Text(): string {
        return ResourceManager.GetString("lblReinstatereason_Text", MedsAdminReinstateslots.resourceCulture);
    }
    public static get txtReinstatereason_ToolTip(): string {
        return ResourceManager.GetString("txtReinstatereason_ToolTip", MedsAdminReinstateslots.resourceCulture);
    }
    GetResourceString(key: string): string {
        let r = Data.find((e) => e.key == key);
        return r != undefined ? r.value : "";
    }
}