const resourceCulture = "";
const Data = [{"key":"cmdPrescribingOptions_Text","value":"Prescribing options"},{"key":"cmdPrescribingOptions_Tooltip","value":"Click here to view prescription option of the drug"},{"key":"cmdPackOptions_Text","value":"Product/Pack options"},{"key":"cmdPackOptions_Tooltip","value":"Click here to view prescription pack option of the drug"},{"key":"cmdLinks_Text","value":"Links"},{"key":"cmdLinks_Tooltip","value":"Select to view drug monograph of the drug"},{"key":"CancelButton_Text","value":"Cancel"},{"key":"OKButton_Text","value":"Ok"},{"key":"CancelButton_Tooltip","value":"Cancel"},{"key":"OKButton_Tooltip","value":"Ok"},{"key":"Please_Select_an_item","value":"Please select an item."}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }
    export class ResMedSecondaryTab {
        constructor() {

        }
        public static get CancelButton_Text(): string {
            return ResourceManager.GetString("CancelButton_Text", resourceCulture);
        }
        public static get CancelButton_Tooltip(): string {
            return ResourceManager.GetString("CancelButton_Tooltip", resourceCulture);
        }
        public static get cmdLinks_Text(): string {
            return ResourceManager.GetString("cmdLinks_Text", resourceCulture);
        }
        public static get cmdLinks_Tooltip(): string {
            return ResourceManager.GetString("cmdLinks_Tooltip", resourceCulture);
        }
        public static get cmdPackOptions_Text(): string {
            return ResourceManager.GetString("cmdPackOptions_Text", resourceCulture);
        }
        public static get cmdPackOptions_Tooltip(): string {
            return ResourceManager.GetString("cmdPackOptions_Tooltip", resourceCulture);
        }
        public static get cmdPrescribingOptions_Text(): string {
            return ResourceManager.GetString("cmdPrescribingOptions_Text", resourceCulture);
        }
        public static get cmdPrescribingOptions_Tooltip(): string {
            return ResourceManager.GetString("cmdPrescribingOptions_Tooltip", resourceCulture);
        }
        public static get OKButton_Text(): string {
            return ResourceManager.GetString("OKButton_Text", resourceCulture);
        }
        public static get OKButton_Tooltip(): string {
            return ResourceManager.GetString("OKButton_Tooltip", resourceCulture);
        }
        public static get Please_Select_an_item(): string {
            return ResourceManager.GetString("Please_Select_an_item", resourceCulture);
        }
    }
