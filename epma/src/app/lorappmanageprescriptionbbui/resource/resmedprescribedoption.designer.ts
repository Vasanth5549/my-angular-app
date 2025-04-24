const resourceCulture = "";
const Data = [{"key":"formularynote","value":"Formulary note"},{"key":"OrderSentenceDesc_Text","value":"Order sentence description"},{"key":"otherinformation","value":"Other information"},{"key":"prescriptionitem","value":"Prescription item"}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }
    export class ResMedPrescribedOption {
        constructor() {

        }
        public static get formularynote(): string {
            return ResourceManager.GetString("formularynote", resourceCulture);
        }
        public static get OrderSentenceDesc_Text(): string {
            return ResourceManager.GetString("OrderSentenceDesc_Text", resourceCulture);
        }
        public static get otherinformation(): string {
            return ResourceManager.GetString("otherinformation", resourceCulture);
        }
        public static get prescriptionitem(): string {
            return ResourceManager.GetString("prescriptionitem", resourceCulture);
        }
    }
