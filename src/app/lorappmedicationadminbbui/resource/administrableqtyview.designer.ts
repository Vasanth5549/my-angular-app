//const resourceCulture = "";
const Data = [{ "key": "AdminamtTxt", "value": "Administrable amount" }, { "key": "AlternateTxt", "value": "Alternatively select a different product" }, { "key": "AppropriateTxt", "value": "Please select an appropriate item" }, { "key": "cmdOKTxt", "value": "Ok" }, { "key": "ConfirmTxt", "value": "Confirm" }, { "key": "Confirm_ToolTip", "value": "Check to confirm" }, { "key": "DoesnotmatchTxt", "value": "does not match the prescribed item" }, { "key": "ExceedTxt", "value": "Strength exceeds prescribed dose" }, { "key": "FKey_Confirm", "value": "I" }, { "key": "FKey_PatientStock", "value": "M" }, { "key": "FKey_WardStock", "value": "W" }, { "key": "NotRecognised", "value": "The barcode you have scanned is not recognised by the system" }, { "key": "PatientStockTxt", "value": "From patient stock" }, { "key": "PatientStock_ToolTip", "value": "Enter quantity used from patient stock" }, { "key": "ProductTxt", "value": "Product selected" }, { "key": "QuantityTxt", "value": "Quantity used for administration:" }, { "key": "RemainingTxt", "value": "Amount remaining" }, { "key": "WardStockTxt", "value": "From ward stock" }, { "key": "WardStock_ToolTip", "value": "Enter quantity used from ward stock" }, { "key": "FKey_Ok", "value": "O" }];
class ResourceManager {
    static GetString(key: string, resourceCulture: any): string {
        let r = Data.find((e) => e.key == key);
        return r != undefined ? r.value : "";
    }
}


export class AdministrableQtyView {
    private static resourceCulture = "";
    constructor() {

    }
    public static get AdminamtTxt(): string {
        return ResourceManager.GetString("AdminamtTxt", AdministrableQtyView.resourceCulture);
    }
    public static get AlternateTxt(): string {
        return ResourceManager.GetString("AlternateTxt", AdministrableQtyView.resourceCulture);
    }
    public static get Confirm_ToolTip(): string {
        return ResourceManager.GetString("Confirm_ToolTip", AdministrableQtyView.resourceCulture);
    }
    public static get ConfirmTxt(): string {
        return ResourceManager.GetString("ConfirmTxt", AdministrableQtyView.resourceCulture);
    }
    public static get AppropriateTxt(): string {
        return ResourceManager.GetString("AppropriateTxt", AdministrableQtyView.resourceCulture);
    }
    public static get cmdOKTxt(): string {
        return ResourceManager.GetString("cmdOKTxt", AdministrableQtyView.resourceCulture);
    }
    public static get DoesnotmatchTxt(): string {
        return ResourceManager.GetString("DoesnotmatchTxt", AdministrableQtyView.resourceCulture);
    }
    public static get ExceedTxt(): string {
        return ResourceManager.GetString("ExceedTxt", AdministrableQtyView.resourceCulture);
    }
    public static get FKey_Confirm(): string {
        return ResourceManager.GetString("FKey_Confirm", AdministrableQtyView.resourceCulture);
    }
    public static get FKey_Ok(): string {
        return ResourceManager.GetString("FKey_Ok", AdministrableQtyView.resourceCulture);
    }
    public static get FKey_PatientStock(): string {
        return ResourceManager.GetString("FKey_PatientStock", AdministrableQtyView.resourceCulture);
    }
    public static get FKey_WardStock(): string {
        return ResourceManager.GetString("FKey_WardStock", AdministrableQtyView.resourceCulture);
    }
    public static get NotRecognised(): string {
        return ResourceManager.GetString("NotRecognised", AdministrableQtyView.resourceCulture);
    }
    public static get PatientStock_ToolTip(): string {
        return ResourceManager.GetString("PatientStock_ToolTip", AdministrableQtyView.resourceCulture);
    }
    public static get PatientStockTxt(): string {
        return ResourceManager.GetString("PatientStockTxt", AdministrableQtyView.resourceCulture);
    }
    public static get ProductTxt(): string {
        return ResourceManager.GetString("ProductTxt", AdministrableQtyView.resourceCulture);
    }
    public static get QuantityTxt(): string {
        return ResourceManager.GetString("QuantityTxt", AdministrableQtyView.resourceCulture);
    }
    public static get RemainingTxt(): string {
        return ResourceManager.GetString("RemainingTxt", AdministrableQtyView.resourceCulture);
    }
    public static get WardStock_ToolTip(): string {
        return ResourceManager.GetString("WardStock_ToolTip", AdministrableQtyView.resourceCulture);
    }
    public static get WardStockTxt(): string {
        return ResourceManager.GetString("WardStockTxt", AdministrableQtyView.resourceCulture);
    }
}