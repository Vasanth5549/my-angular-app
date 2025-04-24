//const resourceCulture = "";
const Data = [{ "key": "AdminAmount_Header", "value": "Administered amount" }, { "key": "AdminAmount_Tooltip", "value": "Specify the admin amount value" }, { "key": "BatchNumber_Header", "value": "Batch/Lot number" }, { "key": "BatchNumber_Tooltip", "value": "Enter medication batch/Lot number" }, { "key": "chkNoWitness_text", "value": "No witness available" }, { "key": "chkNoWitness_tooltip", "value": "Select to indicate that no witness is avialable" }, { "key": "cmdAdd_Text", "value": "Add" }, { "key": "cmdAdd_Tooltip", "value": "Select to add product details" }, { "key": "cmdRemove_Text", "value": "Remove" }, { "key": "cmdRemove_Tooltip", "value": "Select to remove product details" }, { "key": "cmdUpdate_Text", "value": "Update" }, { "key": "cmdUpdate_Tooltip", "value": "Select to update product details" }, { "key": "ExpiryDate_Header", "value": "Expiry date" }, { "key": "ExpiryDate_Tooltip", "value": "Select medication expiry date" }, { "key": "lblWitnessedby_text", "value": "Witnessed by" }, { "key": "lblWitnessedby_tooltip", "value": "Select care provider who witnessed administration" }, { "key": "OutstandingDosetoadminister_Text", "value": "Outstanding dose to administer :" }, { "key": "OutstandingDosetoadminister_Tooltip", "value": "Outstanding dose to administered" }, { "key": "ProductCode_Header", "value": "Product code" }, { "key": "ProductCode_Tooltip", "value": "Enter medication product code" }, { "key": "ProductsScanned_Header", "value": "Products scanned" }, { "key": "ProductsScanned_Tooltip", "value": "Product scanned" }, { "key": "rdbgiven_text", "value": "Given" }, { "key": "rdbgiven_tooltip", "value": "Select given" }, { "key": "rdbprepMedication_text", "value": "Prepare medication" }, { "key": "rdbprepMedication_tooltip", "value": "Select prepare medication" }, { "key": "SerialNumber_Header", "value": "Serial number" }, { "key": "SerialNumber_Tooltip", "value": "Enter medication serial number" }, { "key": "sfsAdminsteredBy_tooltip", "value": "Search for a care provider–opens in a new window" }, { "key": "TotalDoseAdministered_Text", "value": "Total dose to be administered :" }, { "key": "TotalDoseAdministered_Tooltip", "value": "Enter total dose to be administered" }, { "key": "TotalDoseValueAdmin_Tooltip", "value": "Total dose value to be Administered" }, { "key": "UOM_Header", "value": "Uom" }, { "key": "UOM_Tooltip", "value": "Select the Uom" }, { "key": "HdnColStrength_Header", "value": "St." }, { "key": "HdnColtotadamt_Header", "value": "Cl." }, { "key": "ProductScannedhdr_Text", "value": "Product scanned :" }, { "key": "AdminAmt_Msg", "value": "Administered amount cannot be blank." }, { "key": "ExpiryDTTM_Msg", "value": "The expiry date of the medication scanned has passed. Do you wish to continue with the administration?" }, { "key": "ManualAdd_msg", "value": "As medication details have previously been manually entered in the grid this medication cannot be scanned and added to the grid." }, { "key": "MedExcluded_msg", "value": "This medication is excluded from scanning." }, { "key": "MultiRoute_Msg", "value": "This medication requires route to be provided before scanning can progress." }, { "key": "TotAdminAmt_Msg", "value": "The total administered amount does not match the dose field within record administration, please review and update as necessary." }, { "key": "WitnessBy_Msg", "value": "Enter witnessed by, this field is mandatory." }, { "key": "DoseMand_Msg", "value": "The medication requires a dose to be provided before scanning can progress" }, { "key": "ProdCode_Msg", "value": "The product identifier of the medication scanned is not recognised by the system" }, { "key": "RemoveMed_Msg", "value": "Scanned medication details will be removed\nDo you wish to proceed?" }, { "key": "ProductIdentifier_Msg", "value": "The product identifier of the medication scanned is not recognised by the system.\n\nTo proceed with manually recording this administration event please select an appropriate override reason. All previously scanned medications for this administration event(if applicable) will be removed" }, { "key": "Enable_scan", "value": "Enable scan" }, { "key": "Scan_enabled", "value": "Scan enabled" }, { "key": "Cancel_Msg", "value": "You are about to cancel this activity, are you sure?" }, { "key": "Mez_Title", "value": "Scan/Record medication details" }, { "key": "Invalidprodselcnote_msg", "value": "does not match the prescribed item.Please select an appropriate item.\n\nTo proceed with manually recording administration event please select an appropriate override reason.\nAll details of previously scanned medications for this administration event(if applicable) will be removed." }, { "key": "Invalidprodselected_msg", "value": "does not match the prescribed item.\nPlease select an appropriate item." }, { "key": "Invalidproductseloverride_msg", "value": "Product selected does not match the prescribed item.\nPlease select an appropriate item." }, { "key": "lblTotaladminamountnotmatch", "value": "The total administered amount does not match the dose field within record administration, please review" }, { "key": "GTINCodeLinkedMultiple_Msg", "value": "The scanned product GTIN code linked to multiple medications, please manually add the required details." }, { "key": "Comments_Header", "value": "Comments" }, { "key": "ExcludedMed_Msg", "value": "This medication is excluded from scanning. Do you wish to proceed?" }, { "key": "Comments_ToolTip", "value": "Enter comments" }, { "key": "ReadonlyRoute_Msg", "value": "Modifying the route is not available as medications have been scanned for this administration event. If you wish to modify the route please strikethrough the administration event." }, { "key": "DoseORStrengthNotMatch_Msg", "value": "‘The strength of the medication scanned does not match the dose/strength of the medication prescribed’ Please review.\n\nProduct scanned: {0}.\n\nDo you wish to proceed?\n\nSelect Yes to confirm the medication you have scanned is appropriate for the medication prescribed and can be added to the grid\nSelect No to cancel the scanning of this medication and scan an alternative medication" }, { "key": "Medicationprescribed_text", "value": "Medication prescribed :" }];
class ResourceManager {
    static GetString(key: string, resourceCulture: any): string {
        let r = Data.find((e) => e.key == key);
        return r != undefined ? r.value : "";
    }
}


export class MedScanRecAdmin {
    private static resourceCulture = "";
    constructor() {

    }
    GetResourceString(key: string): string {
        let r = Data.find((e) => e.key == key);
        return r != undefined ? r.value : "";
    }
    public static get AdminAmount_Header(): string {
        return ResourceManager.GetString("AdminAmount_Header", MedScanRecAdmin.resourceCulture);
    }
    public static get AdminAmount_Tooltip(): string {
        return ResourceManager.GetString("AdminAmount_Tooltip", MedScanRecAdmin.resourceCulture);
    }
    public static get AdminAmt_Msg(): string {
        return ResourceManager.GetString("AdminAmt_Msg", MedScanRecAdmin.resourceCulture);
    }
    public static get BatchNumber_Header(): string {
        return ResourceManager.GetString("BatchNumber_Header", MedScanRecAdmin.resourceCulture);
    }
    public static get BatchNumber_Tooltip(): string {
        return ResourceManager.GetString("BatchNumber_Tooltip", MedScanRecAdmin.resourceCulture);
    }
    public static get Cancel_Msg(): string {
        return ResourceManager.GetString("Cancel_Msg", MedScanRecAdmin.resourceCulture);
    }
    public static get chkNoWitness_text(): string {
        return ResourceManager.GetString("chkNoWitness_text", MedScanRecAdmin.resourceCulture);
    }
    public static get chkNoWitness_tooltip(): string {
        return ResourceManager.GetString("chkNoWitness_tooltip", MedScanRecAdmin.resourceCulture);
    }
    public static get cmdAdd_Text(): string {
        return ResourceManager.GetString("cmdAdd_Text", MedScanRecAdmin.resourceCulture);
    }
    public static get cmdAdd_Tooltip(): string {
        return ResourceManager.GetString("cmdAdd_Tooltip", MedScanRecAdmin.resourceCulture);
    }
    public static get cmdRemove_Text(): string {
        return ResourceManager.GetString("cmdRemove_Text", MedScanRecAdmin.resourceCulture);
    }
    public static get cmdRemove_Tooltip(): string {
        return ResourceManager.GetString("cmdRemove_Tooltip", MedScanRecAdmin.resourceCulture);
    }
    public static get cmdUpdate_Text(): string {
        return ResourceManager.GetString("cmdUpdate_Text", MedScanRecAdmin.resourceCulture);
    }
    public static get cmdUpdate_Tooltip(): string {
        return ResourceManager.GetString("cmdUpdate_Tooltip", MedScanRecAdmin.resourceCulture);
    }
    public static get Comments_Header(): string {
        return ResourceManager.GetString("Comments_Header", MedScanRecAdmin.resourceCulture);
    }
    public static get Comments_ToolTip(): string {
        return ResourceManager.GetString("Comments_ToolTip", MedScanRecAdmin.resourceCulture);
    }
    public static get DoseMand_Msg(): string {
        return ResourceManager.GetString("DoseMand_Msg", MedScanRecAdmin.resourceCulture);
    }
    public static get DoseORStrengthNotMatch_Msg(): string {
        return ResourceManager.GetString("DoseORStrengthNotMatch_Msg", MedScanRecAdmin.resourceCulture);
    }
    public static get Enable_scan(): string {
        return ResourceManager.GetString("Enable_scan", MedScanRecAdmin.resourceCulture);
    }
    public static get ExcludedMed_Msg(): string {
        return ResourceManager.GetString("ExcludedMed_Msg", MedScanRecAdmin.resourceCulture);
    }
    public static get ExpiryDate_Header(): string {
        return ResourceManager.GetString("ExpiryDate_Header", MedScanRecAdmin.resourceCulture);
    }
    public static get ExpiryDate_Tooltip(): string {
        return ResourceManager.GetString("ExpiryDate_Tooltip", MedScanRecAdmin.resourceCulture);
    }
    public static get ExpiryDTTM_Msg(): string {
        return ResourceManager.GetString("ExpiryDTTM_Msg", MedScanRecAdmin.resourceCulture);
    }
    public static get GTINCodeLinkedMultiple_Msg(): string {
        return ResourceManager.GetString("GTINCodeLinkedMultiple_Msg", MedScanRecAdmin.resourceCulture);
    }
    public static get HdnColStrength_Header(): string {
        return ResourceManager.GetString("HdnColStrength_Header", MedScanRecAdmin.resourceCulture);
    }
    public static get HdnColtotadamt_Header(): string {
        return ResourceManager.GetString("HdnColtotadamt_Header", MedScanRecAdmin.resourceCulture);
    }
    public static get Invalidprodselcnote_msg(): string {
        return ResourceManager.GetString("Invalidprodselcnote_msg", MedScanRecAdmin.resourceCulture);
    }
    public static get Invalidprodselected_msg(): string {
        return ResourceManager.GetString("Invalidprodselected_msg", MedScanRecAdmin.resourceCulture);
    }
    public static get Invalidproductseloverride_msg(): string {
        return ResourceManager.GetString("Invalidproductseloverride_msg", MedScanRecAdmin.resourceCulture);
    }
    public static get lblTotaladminamountnotmatch(): string {
        return ResourceManager.GetString("lblTotaladminamountnotmatch", MedScanRecAdmin.resourceCulture);
    }
    public static get lblWitnessedby_text(): string {
        return ResourceManager.GetString("lblWitnessedby_text", MedScanRecAdmin.resourceCulture);
    }
    public static get lblWitnessedby_tooltip(): string {
        return ResourceManager.GetString("lblWitnessedby_tooltip", MedScanRecAdmin.resourceCulture);
    }
    public static get ManualAdd_msg(): string {
        return ResourceManager.GetString("ManualAdd_msg", MedScanRecAdmin.resourceCulture);
    }
    public static get MedExcluded_msg(): string {
        return ResourceManager.GetString("MedExcluded_msg", MedScanRecAdmin.resourceCulture);
    }
    public static get Medicationprescribed_text(): string {
        return ResourceManager.GetString("Medicationprescribed_text", MedScanRecAdmin.resourceCulture);
    }
    public static get Mez_Title(): string {
        return ResourceManager.GetString("Mez_Title", MedScanRecAdmin.resourceCulture);
    }
    public static get MultiRoute_Msg(): string {
        return ResourceManager.GetString("MultiRoute_Msg", MedScanRecAdmin.resourceCulture);
    }
    public static get OutstandingDosetoadminister_Text(): string {
        return ResourceManager.GetString("OutstandingDosetoadminister_Text", MedScanRecAdmin.resourceCulture);
    }
    public static get OutstandingDosetoadminister_Tooltip(): string {
        return ResourceManager.GetString("OutstandingDosetoadminister_Tooltip", MedScanRecAdmin.resourceCulture);
    }
    public static get ProdCode_Msg(): string {
        return ResourceManager.GetString("ProdCode_Msg", MedScanRecAdmin.resourceCulture);
    }
    public static get ProductCode_Header(): string {
        return ResourceManager.GetString("ProductCode_Header", MedScanRecAdmin.resourceCulture);
    }
    public static get ProductCode_Tooltip(): string {
        return ResourceManager.GetString("ProductCode_Tooltip", MedScanRecAdmin.resourceCulture);
    }
    public static get ProductIdentifier_Msg(): string {
        return ResourceManager.GetString("ProductIdentifier_Msg", MedScanRecAdmin.resourceCulture);
    }
    public static get ProductScannedhdr_Text(): string {
        return ResourceManager.GetString("ProductScannedhdr_Text", MedScanRecAdmin.resourceCulture);
    }
    public static get ProductsScanned_Header(): string {
        return ResourceManager.GetString("ProductsScanned_Header", MedScanRecAdmin.resourceCulture);
    }
    public static get ProductsScanned_Tooltip(): string {
        return ResourceManager.GetString("ProductsScanned_Tooltip", MedScanRecAdmin.resourceCulture);
    }
    public static get rdbgiven_text(): string {
        return ResourceManager.GetString("rdbgiven_text", MedScanRecAdmin.resourceCulture);
    }
    public static get rdbgiven_tooltip(): string {
        return ResourceManager.GetString("rdbgiven_tooltip", MedScanRecAdmin.resourceCulture);
    }
    public static get rdbprepMedication_text(): string {
        return ResourceManager.GetString("rdbprepMedication_text", MedScanRecAdmin.resourceCulture);
    }
    public static get rdbprepMedication_tooltip(): string {
        return ResourceManager.GetString("rdbprepMedication_tooltip", MedScanRecAdmin.resourceCulture);
    }
    public static get ReadonlyRoute_Msg(): string {
        return ResourceManager.GetString("ReadonlyRoute_Msg", MedScanRecAdmin.resourceCulture);
    }
    public static get RemoveMed_Msg(): string {
        return ResourceManager.GetString("RemoveMed_Msg", MedScanRecAdmin.resourceCulture);
    }
    public static get Scan_enabled(): string {
        return ResourceManager.GetString("Scan_enabled", MedScanRecAdmin.resourceCulture);
    }
    public static get SerialNumber_Header(): string {
        return ResourceManager.GetString("SerialNumber_Header", MedScanRecAdmin.resourceCulture);
    }
    public static get SerialNumber_Tooltip(): string {
        return ResourceManager.GetString("SerialNumber_Tooltip", MedScanRecAdmin.resourceCulture);
    }
    public static get sfsAdminsteredBy_tooltip(): string {
        return ResourceManager.GetString("sfsAdminsteredBy_tooltip", MedScanRecAdmin.resourceCulture);
    }
    public static get TotAdminAmt_Msg(): string {
        return ResourceManager.GetString("TotAdminAmt_Msg", MedScanRecAdmin.resourceCulture);
    }
    public static get TotalDoseAdministered_Text(): string {
        return ResourceManager.GetString("TotalDoseAdministered_Text", MedScanRecAdmin.resourceCulture);
    }
    public static get TotalDoseAdministered_Tooltip(): string {
        return ResourceManager.GetString("TotalDoseAdministered_Tooltip", MedScanRecAdmin.resourceCulture);
    }
    public static get TotalDoseValueAdmin_Tooltip(): string {
        return ResourceManager.GetString("TotalDoseValueAdmin_Tooltip", MedScanRecAdmin.resourceCulture);
    }
    public static get UOM_Header(): string {
        return ResourceManager.GetString("UOM_Header", MedScanRecAdmin.resourceCulture);
    }
    public static get UOM_Tooltip(): string {
        return ResourceManager.GetString("UOM_Tooltip", MedScanRecAdmin.resourceCulture);
    }
    public static get WitnessBy_Msg(): string {
        return ResourceManager.GetString("WitnessBy_Msg", MedScanRecAdmin.resourceCulture);
    }
}