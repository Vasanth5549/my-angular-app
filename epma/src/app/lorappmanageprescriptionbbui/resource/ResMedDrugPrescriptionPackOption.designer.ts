const resourceCulture = "";
const Data = [{"key":"CopyAcross_ToolTip","value":"Select to copy across"},{"key":"drugname","value":""},{"key":"FormularyNote_ToolTip","value":"Formulary note"},{"key":"medicationitemname","value":"Medication item name"},{"key":"medicationitems","value":"Medication items"},{"key":"otherinformation","value":"Other information"},{"key":"pleaseselectoneoftheseoptions","value":"Please select one of these options:"},{"key":"prescribingoptions","value":"Prescribing options"},{"key":"prescriptionitem","value":"Prescription item"},{"key":"OrderSentenceDesc_Text","value":"Order sentence description"}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }
    export class ResMedDrugPrescriptionPackOption {
        constructor() {

        }
        public static get drugname(): string {
            return ResourceManager.GetString("drugname", resourceCulture);
        }
        public static get medicationitemname(): string {
            return ResourceManager.GetString("medicationitemname", resourceCulture);
        }
        public static get medicationitems(): string {
            return ResourceManager.GetString("medicationitems", resourceCulture);
        }
        public static get OrderSentenceDesc_Text(): string {
            return ResourceManager.GetString("OrderSentenceDesc_Text", resourceCulture);
        }
        public static get otherinformation(): string {
            return ResourceManager.GetString("otherinformation", resourceCulture);
        }
        public static get pleaseselectoneoftheseoptions(): string {
            return ResourceManager.GetString("pleaseselectoneoftheseoptions", resourceCulture);
        }
        public static get prescribingoptions(): string {
            return ResourceManager.GetString("prescribingoptions", resourceCulture);
        }
        public static get prescriptionitem(): string {
            return ResourceManager.GetString("prescriptionitem", resourceCulture);
        }
    }
