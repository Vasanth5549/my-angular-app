//const resourceCulture = "";
const Data = [{ "key": "AuditTxt", "value": "This action selected is recorded and may be audited by your organisation." }, { "key": "BarcodeMedicationMsgTxt", "value": "Scanning the barcode of this medication is mandated." }, { "key": "BarcodeMsgTxt", "value": "Scanning the patient’s wristband is mandatory, please scan the appropriate patient’s wristband or select an appropriate override reason." }, { "key": "CommentsMandatoryMessage", "value": "Enter comments, this field is mandatory." }, { "key": "lblComments", "value": "Comments" }, { "key": "lblResNotScan_text", "value": "Reason for override" }, { "key": "lblScanTxt", "value": "Override scan" }, { "key": "ReasonMandatoryMessage", "value": "Enter reason for override, this field is mandatory." }, { "key": "cboResNotScan_tooltip", "value": "Select reason for override" }];
class ResourceManager {
    static GetString(key: string, resourceCulture: any): string {
        let r = Data.find((e) => e.key == key);
        return r != undefined ? r.value : "";
    }
}


export class OverrideBarcodeScan {
    private static resourceCulture = "";
    constructor() {

    }
    public static get AuditTxt(): string {
        return ResourceManager.GetString("AuditTxt", OverrideBarcodeScan.resourceCulture);
    }
    public static get BarcodeMedicationMsgTxt(): string {
        return ResourceManager.GetString("BarcodeMedicationMsgTxt", OverrideBarcodeScan.resourceCulture);
    }
    public static get BarcodeMsgTxt(): string {
        return ResourceManager.GetString("BarcodeMsgTxt", OverrideBarcodeScan.resourceCulture);
    }
    public static get cboResNotScan_tooltip(): string {
        return ResourceManager.GetString("cboResNotScan_tooltip", OverrideBarcodeScan.resourceCulture);
    }
    public static get CommentsMandatoryMessage(): string {
        return ResourceManager.GetString("CommentsMandatoryMessage", OverrideBarcodeScan.resourceCulture);
    }
    public static get lblComments(): string {
        return ResourceManager.GetString("lblComments", OverrideBarcodeScan.resourceCulture);
    }
    public static get lblResNotScan_text(): string {
        return ResourceManager.GetString("lblResNotScan_text", OverrideBarcodeScan.resourceCulture);
    }
    public static get lblScanTxt(): string {
        return ResourceManager.GetString("lblScanTxt", OverrideBarcodeScan.resourceCulture);
    }
    public static get ReasonMandatoryMessage(): string {
        return ResourceManager.GetString("ReasonMandatoryMessage", OverrideBarcodeScan.resourceCulture);
    }
    GetResourceString(key: string): string {
        let r = Data.find((e) => e.key == key);
        return r != undefined ? r.value : "";
    }
}