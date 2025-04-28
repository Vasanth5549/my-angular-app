// const resourceCulture = "";
const Data = [{"key":"CancelButton_Text","value":"Cancel"},{"key":"CancelButton_Tooltip","value":"Click to cancel"},{"key":"lblHeader_Text","value":"This medication item has been de-activated. Choose one the following replacement drugs if needed"},{"key":"OKButton_Text","value":"Ok"},{"key":"OKButton_Tooltip","value":"Click to ok"},{"key":"RepDrug_Text","value":"Replacement Item"}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }

    export class replacedrug {
        // private static resourceMan: System.Resources.ResourceManager;
        private static resourceCulture = "";
        constructor() {

        }
        public static get CancelButton_Text(): string {
            return ResourceManager.GetString("CancelButton_Text", replacedrug.resourceCulture);
        }
        public static get CancelButton_Tooltip(): string {
            return ResourceManager.GetString("CancelButton_Tooltip", replacedrug.resourceCulture);
        }
        public static get lblHeader_Text(): string {
            return ResourceManager.GetString("lblHeader_Text", replacedrug.resourceCulture);
        }
        public static get OKButton_Text(): string {
            return ResourceManager.GetString("OKButton_Text", replacedrug.resourceCulture);
        }
        public static get OKButton_Tooltip(): string {
            return ResourceManager.GetString("OKButton_Tooltip", replacedrug.resourceCulture);
        }
        public static get RepDrug_Text(): string {
            return ResourceManager.GetString("RepDrug_Text", replacedrug.resourceCulture);
        }
    }
