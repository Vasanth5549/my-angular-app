//const resourceCulture = "";
const Data = [{ "key": "cmdCancel_Text", "value": "Cancel" }, { "key": "cmdCancel_Tooltip", "value": "Select to cancel manage self administration activity" }, { "key": "cmdOK_Text", "value": "Ok" }, { "key": "cmdOK_Tooltip", "value": "Select to complete manage self administration activity" }, { "key": "grdHeaderComments_Text", "value": "Comments" }, { "key": "grdHeaderComments_ToolTip", "value": "Enter comments" }, { "key": "grdHeaderPrescriptionitem_Text", "value": "Prescription item" }, { "key": "grdHeaderSelfadminister_Text", "value": "Self administer" }, { "key": "grdPrescriptionitem_ToolTip", "value": "Prescription item" }, { "key": "grdSelfadminister_ToolTip", "value": "Select to indicate that patient is self administering this prescription item" }, { "key": "Rxicon", "value": "Select to view the prescription item details" }, { "key": "Paracetamol_warning", "value": "You are attempting to set a medication containing paracetamol as self-administering, please be aware that the patient has also been prescribed other medications containing paracetamol. Do you wish to proceed?" }];
class ResourceManager {
    static GetString(key: string, resourceCulture: any): string {
        let r = Data.find((e) => e.key == key);
        return r != undefined ? r.value : "";
    }
}


export class ManageSelfAdministration {
    private static resourceCulture = "";
    constructor() {

    }
    public static get cmdCancel_Text(): string {
        return ResourceManager.GetString("cmdCancel_Text", ManageSelfAdministration.resourceCulture);
    }
    public static get cmdCancel_Tooltip(): string {
        return ResourceManager.GetString("cmdCancel_Tooltip", ManageSelfAdministration.resourceCulture);
    }
    public static get cmdOK_Text(): string {
        return ResourceManager.GetString("cmdOK_Text", ManageSelfAdministration.resourceCulture);
    }
    public static get cmdOK_Tooltip(): string {
        return ResourceManager.GetString("cmdOK_Tooltip", ManageSelfAdministration.resourceCulture);
    }
    public static get grdHeaderComments_Text(): string {
        return ResourceManager.GetString("grdHeaderComments_Text", ManageSelfAdministration.resourceCulture);
    }
    public static get grdHeaderComments_ToolTip(): string {
        return ResourceManager.GetString("grdHeaderComments_ToolTip", ManageSelfAdministration.resourceCulture);
    }
    public static get grdHeaderPrescriptionitem_Text(): string {
        return ResourceManager.GetString("grdHeaderPrescriptionitem_Text", ManageSelfAdministration.resourceCulture);
    }
    public static get grdHeaderSelfadminister_Text(): string {
        return ResourceManager.GetString("grdHeaderSelfadminister_Text", ManageSelfAdministration.resourceCulture);
    }
    public static get grdPrescriptionitem_ToolTip(): string {
        return ResourceManager.GetString("grdPrescriptionitem_ToolTip", ManageSelfAdministration.resourceCulture);
    }
    public static get grdSelfadminister_ToolTip(): string {
        return ResourceManager.GetString("grdSelfadminister_ToolTip", ManageSelfAdministration.resourceCulture);
    }
    public static get Paracetamol_warning(): string {
        return ResourceManager.GetString("Paracetamol_warning", ManageSelfAdministration.resourceCulture);
    }
    public static get Rxicon(): string {
        return ResourceManager.GetString("Rxicon", ManageSelfAdministration.resourceCulture);
    }
}