const resourceCulture = "";
const Data = [{"key":"CancelButton_Text","value":"Cancel"},{"key":"CancelButton_Tooltip","value":"Select to cancel changes and exit"},{"key":"FormularyNote_Tooltip","value":"Formulary note"},{"key":"Otherinformation_Tooltip","value":"Other information"},{"key":"pleaseselectoneoftheseoptions","value":"Please select one of these options:"},{"key":"prescriptionitem","value":"Prescription item"},{"key":"PrescriptionItem_Tooltip","value":"Prescription item"},{"key":"SlctColumn_Tooltip","value":"Select to copy across"},{"key":"cmdCancel_Text","value":"Close"},{"key":"otherinformation","value":"Other information"},{"key":"OrderSentenceDesc_Text","value":"Order sentence description"},{"key":"lblNoMatch_txt","value":"No matches in {0} list"}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }
    export class ResMedDrugPrescriptionOption {
        constructor() {

        }
        public static get CancelButton_Text(): string {
            return ResourceManager.GetString("CancelButton_Text", resourceCulture);
        }
        public static get CancelButton_Tooltip(): string {
            return ResourceManager.GetString("CancelButton_Tooltip", resourceCulture);
        }
        public static get cmdCancel_Text(): string {
            return ResourceManager.GetString("cmdCancel_Text", resourceCulture);
        }
        public static get FormularyNote_Tooltip(): string {
            return ResourceManager.GetString("FormularyNote_Tooltip", resourceCulture);
        }
        public static get lblNoMatch_txt(): string {
            return ResourceManager.GetString("lblNoMatch_txt", resourceCulture);
        }
        public static get OrderSentenceDesc_Text(): string {
            return ResourceManager.GetString("OrderSentenceDesc_Text", resourceCulture);
        }
        public static get otherinformation(): string {
            return ResourceManager.GetString("otherinformation", resourceCulture);
        }
        public static get Otherinformation_Tooltip(): string {
            return ResourceManager.GetString("Otherinformation_Tooltip", resourceCulture);
        }
        public static get pleaseselectoneoftheseoptions(): string {
            return ResourceManager.GetString("pleaseselectoneoftheseoptions", resourceCulture);
        }
        public static get prescriptionitem(): string {
            return ResourceManager.GetString("prescriptionitem", resourceCulture);
        }
        public static get PrescriptionItem_Tooltip(): string {
            return ResourceManager.GetString("PrescriptionItem_Tooltip", resourceCulture);
        }
        public static get SlctColumn_Tooltip(): string {
            return ResourceManager.GetString("SlctColumn_Tooltip", resourceCulture);
        }
    }
