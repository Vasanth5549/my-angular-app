// const resourceCulture = "";
    const Data = [{"key":"cboComnMode_Tooltip","value":"Reason for cancellation/Discontinuation"},{"key":"cmdRemove_Text","value":"Remove"},{"key":"cmdSetDetails_Text","value":"View set item details"},{"key":"IdentifyingName_Header","value":"Medication catalogue item name"},{"key":"CancelButton_Text","value":"Cancel"},{"key":"OKButton_Text","value":"Ok"},{"key":"Action_Header","value":"Action"},{"key":"CancelButton_Tooltip","value":"Click to discard changes and close"},{"key":"cmdRemove_Tooltip","value":"Select medication item to remove"},{"key":"OKButton_Tooltip","value":"Click to save changes and close"},{"key":"PrescriptionItemOID_Header","value":"Medication catalogue item OID"},{"key":"Reason_Header","value":"Discontinue/Cancel reason"},{"key":"cmdSetDetails_Tooltip","value":"Click to view set item details"},{"key":"Cancel_Error_Message","value":"You are about to cancel this activity,are you sure?"},{"key":"Empty_Validation_Message","value":"Discontinue/Cancel reason cannot be empty"}];
    class ResourceManager {
            static GetString(key: string, resourceCulture: any): string {
              let r = Data.find((e) => e.key == key);
              return r != undefined ? r.value : "";
            }
          }

    export class disconcan1 {
        // private static resourceMan: System.Resources.ResourceManager;
        private static resourceCulture = "";
        constructor() {

        }
        public static get Action_Header(): string {
            return ResourceManager.GetString("Action_Header", disconcan1.resourceCulture);
        }
        public static get Cancel_Error_Message(): string {
            return ResourceManager.GetString("Cancel_Error_Message", disconcan1.resourceCulture);
        }
        public static get CancelButton_Text(): string {
            return ResourceManager.GetString("CancelButton_Text", disconcan1.resourceCulture);
        }
        public static get CancelButton_Tooltip(): string {
            return ResourceManager.GetString("CancelButton_Tooltip", disconcan1.resourceCulture);
        }
        public static get cboComnMode_Tooltip(): string {
            return ResourceManager.GetString("cboComnMode_Tooltip", disconcan1.resourceCulture);
        }
        public static get cmdRemove_Text(): string {
            return ResourceManager.GetString("cmdRemove_Text", disconcan1.resourceCulture);
        }
        public static get cmdRemove_Tooltip(): string {
            return ResourceManager.GetString("cmdRemove_Tooltip", disconcan1.resourceCulture);
        }
        public static get cmdSetDetails_Text(): string {
            return ResourceManager.GetString("cmdSetDetails_Text", disconcan1.resourceCulture);
        }
        public static get cmdSetDetails_Tooltip(): string {
            return ResourceManager.GetString("cmdSetDetails_Tooltip", disconcan1.resourceCulture);
        }
        public static get Empty_Validation_Message(): string {
            return ResourceManager.GetString("Empty_Validation_Message", disconcan1.resourceCulture);
        }
        public static get IdentifyingName_Header(): string {
            return ResourceManager.GetString("IdentifyingName_Header", disconcan1.resourceCulture);
        }
        public static get OKButton_Text(): string {
            return ResourceManager.GetString("OKButton_Text", disconcan1.resourceCulture);
        }
        public static get OKButton_Tooltip(): string {
            return ResourceManager.GetString("OKButton_Tooltip", disconcan1.resourceCulture);
        }
        public static get PrescriptionItemOID_Header(): string {
            return ResourceManager.GetString("PrescriptionItemOID_Header", disconcan1.resourceCulture);
        }
        public static get Reason_Header(): string {
            return ResourceManager.GetString("Reason_Header", disconcan1.resourceCulture);
        }
    }
