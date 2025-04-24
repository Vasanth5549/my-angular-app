const resourceCulture = "";
const Data = [{"key":"alternatemessage","value":"Alternate message"},{"key":"formularynote","value":"Formulary note"},{"key":"medicationitemname","value":"Medication item name"},{"key":"nonFormularyitem","value":"Check to include non-formulary items"},{"key":"OrderSentenceDesc_Text","value":"Order sentence description"}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }
    export class ResMedAlternateOption {
        constructor() {

        }
        public static get alternatemessage(): string {
            return ResourceManager.GetString("alternatemessage", resourceCulture);
        }
        public static get formularynote(): string {
            return ResourceManager.GetString("formularynote", resourceCulture);
        }
        public static get medicationitemname(): string {
            return ResourceManager.GetString("medicationitemname", resourceCulture);
        }
        public static get nonFormularyitem(): string {
            return ResourceManager.GetString("nonFormularyitem", resourceCulture);
        }
        public static get OrderSentenceDesc_Text(): string {
            return ResourceManager.GetString("OrderSentenceDesc_Text", resourceCulture);
        }
    }
