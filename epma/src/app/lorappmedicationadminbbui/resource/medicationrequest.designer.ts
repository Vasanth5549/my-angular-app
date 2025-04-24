//const resourceCulture = "";
const Data = [{ "key": "cmdStatus_Text", "value": "Status" }, { "key": "cmdType_Text", "value": "Type" }, { "key": "cmdType_Text", "value": "Type" }, { "key": "cmdPrescriptionitem_Text", "value": "Prescription item" }, { "key": "cmdRequestsupply_Text", "value": "Request supply" }, { "key": "cmdUrgency_Text", "value": "Urgency" }, { "key": "cmdReqMedication_Text", "value": "Request medication" }, { "key": "cmdChecktorequestsupply_Text", "value": "Check to request supply" }, { "key": "cmdChooseUrgency_Text", "value": "Choose urgency" }, { "key": "cmdRequestComments_Text", "value": "Request comments" }, { "key": "cmdLastrequestedby_Text", "value": "Last requested by" }, { "key": "cmdLastrequestedbydatetime_Text", "value": "Last requested date/time" }, { "key": "cmdLasttechnicallyvalidatedby_Text", "value": "Last technically validated by" }, { "key": "cmdLasttechnicallyvalidateddatetime_Text", "value": "Last technically validated date/time" }, { "key": "cmdSupplystatus_Text", "value": "Supply status" }, { "key": "cmdSupplyinstructions_Text", "value": "Supply instructions" }, { "key": "cmdSupplycomments_Text", "value": "Supply comments" }, { "key": "cmdSupplyInstructionsComments_Text", "value": "Supply instructions/Comments" }, { "key": "cmdLastDispensing_Text", "value": "Last dispensed" }, { "key": "cmdLastDispensing_LinkText", "value": "Dispense history" }, { "key": "cmdCancelRequest_Text", "value": "Cancel request" }, { "key": "cmdCancelRequest_Tooltip", "value": "Select to cancel the medication request" }, { "key": "cmdReqMedication_Tooltip", "value": "Click to launch request medication" }, { "key": "cmdChecktorequestsupply_Tooltip", "value": "Check to request supply" }, { "key": "cmdChooseUrgency_Tooltip", "value": "Choose urgency" }, { "key": "cmdRequestComments_Tooltip", "value": "Request comments" }, { "key": "cmdLastrequestedby_Tooltip", "value": "Last requested by" }, { "key": "cmdLastrequestedbydatetime_Tooltip", "value": "Last requested date/time" }, { "key": "cmdLasttechnicallyvalidatedby_Tooltip", "value": "Last technically validated by" }, { "key": "cmdLasttechnicallyvalidateddatetime_Tooltip", "value": "Last technically validated date/time" }, { "key": "cmdSupplystatus_Tooltip", "value": "Supply status" }, { "key": "cmdSupplyinstructions_Tooltip", "value": "Supply instructions" }, { "key": "cmdSupplycomments_Tooltip", "value": "Supply comments" }, { "key": "cmdComponentName_Text", "value": "Component name" }, { "key": "ReqMedIconToolTip", "value": "Select request medication to view full details." }, { "key": "ResentRequestMessage", "value": "Requests are already in progress for the items below\n\nDo you wish to continue?\n\nSelect No to supply only those items without a request already in progress\n\nYes to continue supply request for all selected items\n\nor Cancel to close the window\n\nItems:\n\n  {0}" }];
class ResourceManager {
    static GetString(key: string, resourceCulture: any): string {
        let r = Data.find((e) => e.key == key);
        return r != undefined ? r.value : "";
    }
}


export class MedicationRequest {
    private static resourceCulture = "";
    constructor() {

    }
    public static get cmdCancelRequest_Text(): string {
        return ResourceManager.GetString("cmdCancelRequest_Text", MedicationRequest.resourceCulture);
    }
    public static get cmdCancelRequest_Tooltip(): string {
        return ResourceManager.GetString("cmdCancelRequest_Tooltip", MedicationRequest.resourceCulture);
    }
    public static get cmdChecktorequestsupply_Text(): string {
        return ResourceManager.GetString("cmdChecktorequestsupply_Text", MedicationRequest.resourceCulture);
    }
    public static get cmdChecktorequestsupply_Tooltip(): string {
        return ResourceManager.GetString("cmdChecktorequestsupply_Tooltip", MedicationRequest.resourceCulture);
    }
    public static get cmdChooseUrgency_Text(): string {
        return ResourceManager.GetString("cmdChooseUrgency_Text", MedicationRequest.resourceCulture);
    }
    public static get cmdChooseUrgency_Tooltip(): string {
        return ResourceManager.GetString("cmdChooseUrgency_Tooltip", MedicationRequest.resourceCulture);
    }
    public static get cmdComponentName_Text(): string {
        return ResourceManager.GetString("cmdComponentName_Text", MedicationRequest.resourceCulture);
    }
    public static get cmdLastDispensing_LinkText(): string {
        return ResourceManager.GetString("cmdLastDispensing_LinkText", MedicationRequest.resourceCulture);
    }
    public static get cmdLastDispensing_Text(): string {
        return ResourceManager.GetString("cmdLastDispensing_Text", MedicationRequest.resourceCulture);
    }
    public static get ReqMedIconToolTip(): string {
        return ResourceManager.GetString("ReqMedIconToolTip", MedicationRequest.resourceCulture);
    }
    public static get cmdLastrequestedby_Text(): string {
        return ResourceManager.GetString("cmdLastrequestedby_Text", MedicationRequest.resourceCulture);
    }
    public static get cmdLastrequestedby_Tooltip(): string {
        return ResourceManager.GetString("cmdLastrequestedby_Tooltip", MedicationRequest.resourceCulture);
    }
    public static get cmdLastrequestedbydatetime_Text(): string {
        return ResourceManager.GetString("cmdLastrequestedbydatetime_Text", MedicationRequest.resourceCulture);
    }
    public static get cmdLastrequestedbydatetime_Tooltip(): string {
        return ResourceManager.GetString("cmdLastrequestedbydatetime_Tooltip", MedicationRequest.resourceCulture);
    }
    public static get cmdLasttechnicallyvalidatedby_Text(): string {
        return ResourceManager.GetString("cmdLasttechnicallyvalidatedby_Text", MedicationRequest.resourceCulture);
    }
    public static get cmdLasttechnicallyvalidatedby_Tooltip(): string {
        return ResourceManager.GetString("cmdLasttechnicallyvalidatedby_Tooltip", MedicationRequest.resourceCulture);
    }
    public static get cmdLasttechnicallyvalidateddatetime_Text(): string {
        return ResourceManager.GetString("cmdLasttechnicallyvalidateddatetime_Text", MedicationRequest.resourceCulture);
    }
    public static get cmdLasttechnicallyvalidateddatetime_Tooltip(): string {
        return ResourceManager.GetString("cmdLasttechnicallyvalidateddatetime_Tooltip", MedicationRequest.resourceCulture);
    }
    public static get cmdPrescriptionitem_Text(): string {
        return ResourceManager.GetString("cmdPrescriptionitem_Text", MedicationRequest.resourceCulture);
    }
    public static get cmdReqMedication_Text(): string {
        return ResourceManager.GetString("cmdReqMedication_Text", MedicationRequest.resourceCulture);
    }
    public static get cmdReqMedication_Tooltip(): string {
        return ResourceManager.GetString("cmdReqMedication_Tooltip", MedicationRequest.resourceCulture);
    }
    public static get cmdRequestComments_Text(): string {
        return ResourceManager.GetString("cmdRequestComments_Text", MedicationRequest.resourceCulture);
    }
    public static get cmdRequestComments_Tooltip(): string {
        return ResourceManager.GetString("cmdRequestComments_Tooltip", MedicationRequest.resourceCulture);
    }
    public static get cmdRequestsupply_Text(): string {
        return ResourceManager.GetString("cmdRequestsupply_Text", MedicationRequest.resourceCulture);
    }
    public static get cmdStatus_Text(): string {
        return ResourceManager.GetString("cmdStatus_Text", MedicationRequest.resourceCulture);
    }
    public static get cmdSupplycomments_Text(): string {
        return ResourceManager.GetString("cmdSupplycomments_Text", MedicationRequest.resourceCulture);
    }
    public static get cmdSupplycomments_Tooltip(): string {
        return ResourceManager.GetString("cmdSupplycomments_Tooltip", MedicationRequest.resourceCulture);
    }
    public static get cmdSupplyinstructions_Text(): string {
        return ResourceManager.GetString("cmdSupplyinstructions_Text", MedicationRequest.resourceCulture);
    }
    public static get cmdSupplyinstructions_Tooltip(): string {
        return ResourceManager.GetString("cmdSupplyinstructions_Tooltip", MedicationRequest.resourceCulture);
    }
    public static get cmdSupplyInstructionsComments_Text(): string {
        return ResourceManager.GetString("cmdSupplyInstructionsComments_Text", MedicationRequest.resourceCulture);
    }
    public static get cmdSupplystatus_Text(): string {
        return ResourceManager.GetString("cmdSupplystatus_Text", MedicationRequest.resourceCulture);
    }
    public static get cmdSupplystatus_Tooltip(): string {
        return ResourceManager.GetString("cmdSupplystatus_Tooltip", MedicationRequest.resourceCulture);
    }
    public static get cmdType_Text(): string {
        return ResourceManager.GetString("cmdType_Text", MedicationRequest.resourceCulture);
    }
    public static get cmdUrgency_Text(): string {
        return ResourceManager.GetString("cmdUrgency_Text", MedicationRequest.resourceCulture);
    }
    public static get ResentRequestMessage(): string {
        return ResourceManager.GetString("ResentRequestMessage", MedicationRequest.resourceCulture);
    }
}