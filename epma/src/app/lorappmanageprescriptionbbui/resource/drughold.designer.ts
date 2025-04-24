// const resourceCulture = "";
    const Data = [{ "key": "CancelButton_Text", "value": "Cancel" }, { "key": "CancelButton_Tooltip", "value": "Click to Cancel" }, { "key": "iSFS1_Tooltip", "value": "Select a value from SFS" }, { "key": "lblHoldReason_Text", "value": "Reason for hold" }, { "key": "OKButton_Text", "value": "Ok" }, { "key": "OKButton_Tooltip", "value": "Click to Ok" }, { "key": "lblOtherReason_Text", "value": "Other reason" }, { "key": "cboHoldReason_Tooltip", "value": "Select the hold reason" }];
    class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
            let r = Data.find((e) => e.key == key);
            return r != undefined ? r.value : "";
        }
    }
    export class drughold {
        // private static resourceMan: System.Resources.ResourceManager;
        private static resourceCulture = "";
        constructor() {

        }
        public static get CancelButton_Text(): string {
            return ResourceManager.GetString("CancelButton_Text", drughold.resourceCulture);
        }
        public static get CancelButton_Tooltip(): string {
            return ResourceManager.GetString("CancelButton_Tooltip", drughold.resourceCulture);
        }
        public static get cboHoldReason_Tooltip(): string {
            return ResourceManager.GetString("cboHoldReason_Tooltip", drughold.resourceCulture);
        }
        public static get iSFS1_Tooltip(): string {
            return ResourceManager.GetString("iSFS1_Tooltip", drughold.resourceCulture);
        }
        public static get lblHoldReason_Text(): string {
            return ResourceManager.GetString("lblHoldReason_Text", drughold.resourceCulture);
        }
        public static get lblOtherReason_Text(): string {
            return ResourceManager.GetString("lblOtherReason_Text", drughold.resourceCulture);
        }
        public static get OKButton_Text(): string {
            return ResourceManager.GetString("OKButton_Text", drughold.resourceCulture);
        }
        public static get OKButton_Tooltip(): string {
            return ResourceManager.GetString("OKButton_Tooltip", drughold.resourceCulture);
        }
    }
