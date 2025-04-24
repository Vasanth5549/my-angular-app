const resourceCulture = "";
const Data = [{ "key": "PrescriptionItem_Header", "value": "Prescription item" }, { "key": "Otherinformation_Header", "value": "Other information" }, { "key": "defaultselect_Header", "value": "Default select" }, { "key": "NoRecordsFound_Message", "value": "No items linked to order set" }, { "key": "Offset_Header", "value": "Offset" }, { "key": "SelectText_Message", "value": "Please select one or more items in the set" }, { "key": "cmdLinks_Text", "value": "Links" }, { "key": "cmdLinks_Tooltip", "value": "Select to view links" }, { "key": "GuidanceLink_Text", "value": "Please click here for full implementation guidance" }, { "key": "Description_Header", "value": "Description" }, { "key": "GuidanceText", "value": "- Guidance Text" }, { "key": "WebpageDialog", "value": "- LORENZO -- Webpage Dialog" }, { "key": "NoItems_Text", "value": "No items linked to order set" }, { "key": "ORSDeactivated_Text", "value": "This order set has been de-activated. Please select another appropriate order set to proceed" }, { "key": "ORSItmDeactivated1_Text", "value": "The below item(s)" }, { "key": "ORSItmDeactivated2_Text", "value": "Please prescribe alternative item(s) if necessary" }, { "key": "ORSItmGridDeactivated_Text", "value": "All items in the selected order set have been deactivated. Kindly amend the contents of the order set in order to proceed" }, { "key": "ORSIcon_ToolTip", "value": "This item is part of the set -" }, { "key": "ORSOKClick_Text", "value": "Please select atleast one item from the orderset" }, { "key": "ORSCannotPrescribe1_Text", "value": "The selected order set" }, { "key": "ORSCannotPrescribe2_Text", "value": "is already available in the prescription list.Please select a different item." }, { "key": "ORSItmDeactivated3_Text", "value": "that are part of this order set has been deactivated" }, { "key": "ORSMCItmDeactivated_Text1", "value": "and one or more components of the multiple component item(s)" }, { "key": "ORSMCItmDeactivated_Text2", "value": "One or more components of the multiple component item(s)" }, { "key": "OrderSentenceDesc_Header", "value": "Order sentence description" }, { "key": "TimeAdjust_Header", "value": "Time adjust" }, { "key": "StartDate_Header", "value": "Start date" }, { "key": "StartTime_Header", "value": "Start time" }, { "key": "StartDateTime_Header", "value": "Start date/time" }, { "key": "DisableDRC_Text", "value": "Disable dose range check" }, { "key": "DisableDRC_Warning", "value": "Dose range checking for this order set has been disabled, please untick this check box if you wish to run Dose Range Checking for this order set" }, { "key": "DisableDRC_ToolTip", "value": "Click to disable dose range checking for this order set." }, { "key": "chkTimeAdjust_ToolTip", "value": "Select to adjust the start time for this medication" }, { "key": "dtpStartDate_Tooltip", "value": "Start date" }, { "key": "dtpStartTime_Tooltip", "value": "Start time" }, { "key": "btnApply_Tooltip", "value": "Click to apply the selected date time for the medications the time adjust option is ticked" }, { "key": "SetDateTime_Text", "value": "Set date and time" }, { "key": "SequenceLink_Header", "value": "Link" }, { "key": "SequenceLink_Tooltip", "value": "Item is part of a sequential prescription" }, { "key": "Checktoopenformviewer_Tooltip", "value": "Check to open form viewer" }];
class ResourceManager {
    static GetString(key: string, resourceCulture: any): string {
        let r = Data.find((e) => e.key == key);
        return r != undefined ? r.value : "";
    }
}
export class ORSSecMezzanine {
        constructor() {

        }
        public static get btnApply_Tooltip(): string {
            return ResourceManager.GetString("btnApply_Tooltip", resourceCulture);
        }
        public static get Checktoopenformviewer_Tooltip(): string {
            return ResourceManager.GetString("Checktoopenformviewer_Tooltip", resourceCulture);
        }
        public static get chkTimeAdjust_ToolTip(): string {
            return ResourceManager.GetString("chkTimeAdjust_ToolTip", resourceCulture);
        }
        public static get cmdLinks_Text(): string {
            return ResourceManager.GetString("cmdLinks_Text", resourceCulture);
        }
        public static get cmdLinks_Tooltip(): string {
            return ResourceManager.GetString("cmdLinks_Tooltip", resourceCulture);
        }
        public static get defaultselect_Header(): string {
            return ResourceManager.GetString("defaultselect_Header", resourceCulture);
        }
        public static get Description_Header(): string {
            return ResourceManager.GetString("Description_Header", resourceCulture);
        }
        public static get DisableDRC_Text(): string {
            return ResourceManager.GetString("DisableDRC_Text", resourceCulture);
        }
        public static get DisableDRC_ToolTip(): string {
            return ResourceManager.GetString("DisableDRC_ToolTip", resourceCulture);
        }
        public static get DisableDRC_Warning(): string {
            return ResourceManager.GetString("DisableDRC_Warning", resourceCulture);
        }
        public static get dtpStartDate_Tooltip(): string {
            return ResourceManager.GetString("dtpStartDate_Tooltip", resourceCulture);
        }
        public static get dtpStartTime_Tooltip(): string {
            return ResourceManager.GetString("dtpStartTime_Tooltip", resourceCulture);
        }
        public static get GuidanceLink_Text(): string {
            return ResourceManager.GetString("GuidanceLink_Text", resourceCulture);
        }
        public static get GuidanceText(): string {
            return ResourceManager.GetString("GuidanceText", resourceCulture);
        }
        public static get NoItems_Text(): string {
            return ResourceManager.GetString("NoItems_Text", resourceCulture);
        }
        public static get NoRecordsFound_Message(): string {
            return ResourceManager.GetString("NoRecordsFound_Message", resourceCulture);
        }
        public static get Offset_Header(): string {
            return ResourceManager.GetString("Offset_Header", resourceCulture);
        }
        public static get OrderSentenceDesc_Header(): string {
            return ResourceManager.GetString("OrderSentenceDesc_Header", resourceCulture);
        }
        public static get ORSCannotPrescribe1_Text(): string {
            return ResourceManager.GetString("ORSCannotPrescribe1_Text", resourceCulture);
        }
        public static get ORSCannotPrescribe2_Text(): string {
            return ResourceManager.GetString("ORSCannotPrescribe2_Text", resourceCulture);
        }
        public static get ORSDeactivated_Text(): string {
            return ResourceManager.GetString("ORSDeactivated_Text", resourceCulture);
        }
        public static get ORSIcon_ToolTip(): string {
            return ResourceManager.GetString("ORSIcon_ToolTip", resourceCulture);
        }
        public static get ORSItmDeactivated1_Text(): string {
            return ResourceManager.GetString("ORSItmDeactivated1_Text", resourceCulture);
        }
        public static get ORSItmDeactivated2_Text(): string {
            return ResourceManager.GetString("ORSItmDeactivated2_Text", resourceCulture);
        }
        public static get ORSItmDeactivated3_Text(): string {
            return ResourceManager.GetString("ORSItmDeactivated3_Text", resourceCulture);
        }
        public static get ORSItmGridDeactivated_Text(): string {
            return ResourceManager.GetString("ORSItmGridDeactivated_Text", resourceCulture);
        }
        public static get ORSMCItmDeactivated_Text1(): string {
            return ResourceManager.GetString("ORSMCItmDeactivated_Text1", resourceCulture);
        }
        public static get ORSMCItmDeactivated_Text2(): string {
            return ResourceManager.GetString("ORSMCItmDeactivated_Text2", resourceCulture);
        }
        public static get ORSOKClick_Text(): string {
            return ResourceManager.GetString("ORSOKClick_Text", resourceCulture);
        }
        public static get Otherinformation_Header(): string {
            return ResourceManager.GetString("Otherinformation_Header", resourceCulture);
        }
        public static get PrescriptionItem_Header(): string {
            return ResourceManager.GetString("PrescriptionItem_Header", resourceCulture);
        }
        public static get SelectText_Message(): string {
            return ResourceManager.GetString("SelectText_Message", resourceCulture);
        }
        public static get SetDateTime_Text(): string {
            return ResourceManager.GetString("SetDateTime_Text", resourceCulture);
        }
        public static get StartDate_Header(): string {
            return ResourceManager.GetString("StartDate_Header", resourceCulture);
        }
        public static get StartTime_Header(): string {
            return ResourceManager.GetString("StartTime_Header", resourceCulture);
        }
        public static get StartDateTime_Header(): string {
            return ResourceManager.GetString("StartDateTime_Header", resourceCulture);
        }
        public static get TimeAdjust_Header(): string {
            return ResourceManager.GetString("TimeAdjust_Header", resourceCulture);
        }
        public static get WebpageDialog(): string {
            return ResourceManager.GetString("WebpageDialog", resourceCulture);
        }
        public static get SequenceLink_Header(): string {
            return ResourceManager.GetString("SequenceLink_Header", resourceCulture);
        }
        public static get SequenceLink_Tooltip(): string {
            return ResourceManager.GetString("SequenceLink_Tooltip", resourceCulture);
        }
    }
