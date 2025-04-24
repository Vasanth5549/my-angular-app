// const resourceCulture = "";
const Data = [{"key":"CancelButton_Text","value":"Cancel"},{"key":"CancelButton_Tooltip","value":"Click to Cancel"},{"key":"cboReason_Tooltip","value":"Specify resaon"},{"key":"OKButton_Text","value":"Ok"},{"key":"OKButton_Tooltip","value":"Click to Ok"},{"key":"PrescriptionItem_Header","value":"Prescription item"},{"key":"Reason_Header","value":"Reason for stopping"},{"key":"Cancel_Error_Message","value":"You are about to cancel this activity,are you sure?"},{"key":"Comments_Header","value":"Comments"},{"key":"MandatoryLegend_Text","value":"Mandatory fields"}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }

    export class reconcile {
        // private static resourceMan: System.Resources.ResourceManager;
        private static resourceCulture = "";
        constructor() {

        }
        public static get Cancel_Error_Message(): string {
            return ResourceManager.GetString("Cancel_Error_Message", reconcile.resourceCulture);
        }
        public static get CancelButton_Text(): string {
            return ResourceManager.GetString("CancelButton_Text", reconcile.resourceCulture);
        }
        public static get CancelButton_Tooltip(): string {
            return ResourceManager.GetString("CancelButton_Tooltip", reconcile.resourceCulture);
        }
        public static get cboReason_Tooltip(): string {
            return ResourceManager.GetString("cboReason_Tooltip", reconcile.resourceCulture);
        }
        public static get Comments_Header(): string {
            return ResourceManager.GetString("Comments_Header", reconcile.resourceCulture);
        }
        public static get MandatoryLegend_Text(): string {
            return ResourceManager.GetString("MandatoryLegend_Text", reconcile.resourceCulture);
        }
        public static get OKButton_Text(): string {
            return ResourceManager.GetString("OKButton_Text", reconcile.resourceCulture);
        }
        public static get OKButton_Tooltip(): string {
            return ResourceManager.GetString("OKButton_Tooltip", reconcile.resourceCulture);
        }
        public static get PrescriptionItem_Header(): string {
            return ResourceManager.GetString("PrescriptionItem_Header", reconcile.resourceCulture);
        }
        public static get Reason_Header(): string {
            return ResourceManager.GetString("Reason_Header", reconcile.resourceCulture);
        }
    }
