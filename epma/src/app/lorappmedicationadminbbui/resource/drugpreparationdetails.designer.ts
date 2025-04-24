//const resourceCulture = "";
const Data = [{ "key": "BatchNo_Header", "value": "Batch no." }, { "key": "cbodispvolume_tooltip", "value": "Select displacement volume" }, { "key": "cbouom_tooltip", "value": "Select quantity unit of measure" }, { "key": "cmdaddfluid_tooltip", "value": "Select to add fluid" }, { "key": "cmdremovefluid_tooltip", "value": "Select to remove fluid" }, { "key": "Component_Header", "value": "Component name" }, { "key": "Displacement_Header", "value": "Displacement volume" }, { "key": "dtbexpdate_tooltip", "value": "Enter expiry date" }, { "key": "dtpprepdate_tooltip", "value": "Select date/time of  preparation" }, { "key": "ExpiryDate_Header", "value": "Expiry date" }, { "key": "prepbarcode_tooltip", "value": "Select to enable barcode scanning" }, { "key": "preplink_tooltip", "value": "Select to view monograph links" }, { "key": "prepstrikethrough_tooltip", "value": "Select to strikethrough preparation details" }, { "key": "Quantity_Header", "value": "Quantity" }, { "key": "SFFComponent_tooltip", "value": "Select component item" }, { "key": "sfsprepby_tooltip", "value": "Select prepared by care provider" }, { "key": "sfswitnessedby_tooltip", "value": "Select witnessed by care provider" }, { "key": "txtbztchno_tooltip", "value": "Enter batch number" }, { "key": "txtcomments_tooltip", "value": "Enter modification comments" }, { "key": "txtcomponentname_tooltip", "value": "Select component item" }, { "key": "txtqty_tooltip", "value": "Enter quantity" }, { "key": "UOM_Header", "value": "UOM" }, { "key": "Launch_DrugPreparation", "value": "Select to launch the preparation details" }, { "key": "Strikethrough_Comments", "value": "Scomments" }, { "key": "Man_Comments", "value": "Enter modification comments, this field is mandatory." }, { "key": "Man_ComponentName", "value": "Enter component name, this field is mandatory." }, { "key": "Man_PreparedBy", "value": "Enter prepared by, this field is mandatory." }, { "key": "Man_PrepDTTM", "value": "Enter date/time prepared, this field is mandatory." }, { "key": "Man_QuanityUOM", "value": "Quantity UOM cannot be blank." }, { "key": "Man_Quantity", "value": "Enter quantity, this field is mandatory." }, { "key": "Validate_AlreadySelected", "value": "You have selected" }, { "key": "Validate_DuplicateComponent", "value": "which is already added to the preparation. Duplicate fluids cannot be added to the preparation." }, { "key": "Validate_ExpDate", "value": "Expiry date(s) is earlier than the date of preparation. Please check." }, { "key": "Validate_Quantity", "value": "Quantity cannot be zero or empty." }, { "key": "Validate_PreparedDateTime", "value": "Future date/time is not allowed as prepared date/time." }, { "key": "Validate_ExpiredProduct", "value": "The scanned product has passed its expiry date. Please pick another product" }, { "key": "Validate_StrikethrComments", "value": "Enter strike through comments, this field is mandatory." }, { "key": "Validate_Witnessed", "value": "Selected witness is the same as the administering care provider. Please select a registered care provider, other than the administering user as a witness." }];
class ResourceManager {
    static GetString(key: string, resourceCulture: any): string {
        let r = Data.find((e) => e.key == key);
        return r != undefined ? r.value : "";
    }
}


export class DrugPreparationDetails {
    private static resourceCulture = "";
    public static get BatchNo_Header(): string {
        return ResourceManager.GetString("BatchNo_Header", DrugPreparationDetails.resourceCulture);
    }
    public static get cbodispvolume_tooltip(): string {
        return ResourceManager.GetString("cbodispvolume_tooltip", DrugPreparationDetails.resourceCulture);
    }
    public static get cbouom_tooltip(): string {
        return ResourceManager.GetString("cbouom_tooltip", DrugPreparationDetails.resourceCulture);
    }
    public static get cmdaddfluid_tooltip(): string {
        return ResourceManager.GetString("cmdaddfluid_tooltip", DrugPreparationDetails.resourceCulture);
    }
    public static get cmdremovefluid_tooltip(): string {
        return ResourceManager.GetString("cmdremovefluid_tooltip", DrugPreparationDetails.resourceCulture);
    }
    public static get Component_Header(): string {
        return ResourceManager.GetString("Component_Header", DrugPreparationDetails.resourceCulture);
    }
    public static get Displacement_Header(): string {
        return ResourceManager.GetString("Displacement_Header", DrugPreparationDetails.resourceCulture);
    }
    public static get dtbexpdate_tooltip(): string {
        return ResourceManager.GetString("dtbexpdate_tooltip", DrugPreparationDetails.resourceCulture);
    }
    public static get dtpprepdate_tooltip(): string {
        return ResourceManager.GetString("dtpprepdate_tooltip", DrugPreparationDetails.resourceCulture);
    }
    public static get ExpiryDate_Header(): string {
        return ResourceManager.GetString("ExpiryDate_Header", DrugPreparationDetails.resourceCulture);
    }
    public static get Launch_DrugPreparation(): string {
        return ResourceManager.GetString("Launch_DrugPreparation", DrugPreparationDetails.resourceCulture);
    }
    public static get Man_Comments(): string {
        return ResourceManager.GetString("Man_Comments", DrugPreparationDetails.resourceCulture);
    }
    public static get Man_ComponentName(): string {
        return ResourceManager.GetString("Man_ComponentName", DrugPreparationDetails.resourceCulture);
    }
    public static get Man_PreparedBy(): string {
        return ResourceManager.GetString("Man_PreparedBy", DrugPreparationDetails.resourceCulture);
    }
    public static get Man_PrepDTTM(): string {
        return ResourceManager.GetString("Man_PrepDTTM", DrugPreparationDetails.resourceCulture);
    }
    public static get Man_QuanityUOM(): string {
        return ResourceManager.GetString("Man_QuanityUOM", DrugPreparationDetails.resourceCulture);
    }
    public static get Man_Quantity(): string {
        return ResourceManager.GetString("Man_Quantity", DrugPreparationDetails.resourceCulture);
    }
    public static get prepbarcode_tooltip(): string {
        return ResourceManager.GetString("prepbarcode_tooltip", DrugPreparationDetails.resourceCulture);
    }
    public static get preplink_tooltip(): string {
        return ResourceManager.GetString("preplink_tooltip", DrugPreparationDetails.resourceCulture);
    }
    public static get prepstrikethrough_tooltip(): string {
        return ResourceManager.GetString("prepstrikethrough_tooltip", DrugPreparationDetails.resourceCulture);
    }
    public static get Quantity_Header(): string {
        return ResourceManager.GetString("Quantity_Header", DrugPreparationDetails.resourceCulture);
    }
    public static get SFFComponent_tooltip(): string {
        return ResourceManager.GetString("SFFComponent_tooltip", DrugPreparationDetails.resourceCulture);
    }
    public static get sfsprepby_tooltip(): string {
        return ResourceManager.GetString("sfsprepby_tooltip", DrugPreparationDetails.resourceCulture);
    }
    public static get sfswitnessedby_tooltip(): string {
        return ResourceManager.GetString("sfswitnessedby_tooltip", DrugPreparationDetails.resourceCulture);
    }
    public static get Strikethrough_Comments(): string {
        return ResourceManager.GetString("Strikethrough_Comments", DrugPreparationDetails.resourceCulture);
    }
    public static get txtbztchno_tooltip(): string {
        return ResourceManager.GetString("txtbztchno_tooltip", DrugPreparationDetails.resourceCulture);
    }
    public static get txtcomments_tooltip(): string {
        return ResourceManager.GetString("txtcomments_tooltip", DrugPreparationDetails.resourceCulture);
    }
    public static get txtcomponentname_tooltip(): string {
        return ResourceManager.GetString("txtcomponentname_tooltip", DrugPreparationDetails.resourceCulture);
    }
    public static get txtqty_tooltip(): string {
        return ResourceManager.GetString("txtqty_tooltip", DrugPreparationDetails.resourceCulture);
    }
    public static get UOM_Header(): string {
        return ResourceManager.GetString("UOM_Header", DrugPreparationDetails.resourceCulture);
    }
    public static get Validate_AlreadySelected(): string {
        return ResourceManager.GetString("Validate_AlreadySelected", DrugPreparationDetails.resourceCulture);
    }
    public static get Validate_DuplicateComponent(): string {
        return ResourceManager.GetString("Validate_DuplicateComponent", DrugPreparationDetails.resourceCulture);
    }
    public static get Validate_ExpDate(): string {
        return ResourceManager.GetString("Validate_ExpDate", DrugPreparationDetails.resourceCulture);
    }
    public static get Validate_ExpiredProduct(): string {
        return ResourceManager.GetString("Validate_ExpiredProduct", DrugPreparationDetails.resourceCulture);
    }
    public static get Validate_PreparedDateTime(): string {
        return ResourceManager.GetString("Validate_PreparedDateTime", DrugPreparationDetails.resourceCulture);
    }
    public static get Validate_Quantity(): string {
        return ResourceManager.GetString("Validate_Quantity", DrugPreparationDetails.resourceCulture);
    }
    public static get Validate_StrikethrComments(): string {
        return ResourceManager.GetString("Validate_StrikethrComments", DrugPreparationDetails.resourceCulture);
    }
    public static get Validate_Witnessed(): string {
        return ResourceManager.GetString("Validate_Witnessed", DrugPreparationDetails.resourceCulture);
    }
}