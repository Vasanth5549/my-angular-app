// const resourceCulture = "";
    const Data = [{ "key": "CancelButton_Text", "value": "Cancel" }, { "key": "iLabel1_Text", "value": "Dispensing instructions" }, { "key": "OKButton_Text", "value": "OK" }, { "key": "CancelButton_Tooltip", "value": "Select to cancel changes and exit" }, { "key": "OKButton_Tooltip", "value": "Select to commit changes and exit" }];
    class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
            let r = Data.find((e) => e.key == key);
            return r != undefined ? r.value : "";
        }
    }
    export class meddispin {
        // private static resourceMan: System.Resources.ResourceManager;
        private static resourceCulture = "";
        constructor() {

        }
        public static get CancelButton_Text(): string {
            return ResourceManager.GetString("CancelButton_Text", meddispin.resourceCulture);
        }
        public static get CancelButton_Tooltip(): string {
            return ResourceManager.GetString("CancelButton_Tooltip", meddispin.resourceCulture);
        }
        public static get iLabel1_Text(): string {
            return ResourceManager.GetString("iLabel1_Text", meddispin.resourceCulture);
        }
        public static get OKButton_Text(): string {
            return ResourceManager.GetString("OKButton_Text", meddispin.resourceCulture);
        }
        public static get OKButton_Tooltip(): string {
            return ResourceManager.GetString("OKButton_Tooltip", meddispin.resourceCulture);
        }
    }
