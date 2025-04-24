const resourceCulture = "";
const Data = [{"key":"IdentifyingName_Text","value":"Medication item name"},{"key":"lblCaptionName_Text","value":"This drug can be prescribed by brand only. Please select one of these options."},{"key":"lblIndications_Text","value":"Medication items"},{"key":"lblPrescribing_Text","value":"Prescribing options"},{"key":"Otherinformation_Text","value":"Other information"},{"key":"PrescriptionItem_Text","value":"Prescription item"},{"key":"FormularyNote_Text","value":""},{"key":"Close_ToolTip","value":"Select to close"},{"key":"CopyAcross_ToolTip","value":"Select to copy across"},{"key":"FormularyNote_ToolTip","value":"Formulary note"},{"key":"lblSelProductText","value":"Please select one of these product options."},{"key":"OrderSentenceDesc_Text","value":"Order sentence description"},{"key":"lblProductCaption","value":"This drug can be prescribed by product only. Please select one of these options."}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }
    export class ResMedBrandConstraints {
        constructor() {

        }
        public static get Close_ToolTip(): string {
            return ResourceManager.GetString("Close_ToolTip", resourceCulture);
        }
        public static get CopyAcross_ToolTip(): string {
            return ResourceManager.GetString("CopyAcross_ToolTip", resourceCulture);
        }
        public static get FormularyNote_Text(): string {
            return ResourceManager.GetString("FormularyNote_Text", resourceCulture);
        }
        public static get FormularyNote_ToolTip(): string {
            return ResourceManager.GetString("FormularyNote_ToolTip", resourceCulture);
        }
        public static get IdentifyingName_Text(): string {
            return ResourceManager.GetString("IdentifyingName_Text", resourceCulture);
        }
        public static get lblCaptionName_Text(): string {
            return ResourceManager.GetString("lblCaptionName_Text", resourceCulture);
        }
        public static get lblIndications_Text(): string {
            return ResourceManager.GetString("lblIndications_Text", resourceCulture);
        }
        public static get lblPrescribing_Text(): string {
            return ResourceManager.GetString("lblPrescribing_Text", resourceCulture);
        }
        public static get lblProductCaption(): string {
            return ResourceManager.GetString("lblProductCaption", resourceCulture);
        }
        public static get lblSelProductText(): string {
            return ResourceManager.GetString("lblSelProductText", resourceCulture);
        }
        public static get OrderSentenceDesc_Text(): string {
            return ResourceManager.GetString("OrderSentenceDesc_Text", resourceCulture);
        }
        public static get Otherinformation_Text(): string {
            return ResourceManager.GetString("Otherinformation_Text", resourceCulture);
        }
        public static get PrescriptionItem_Text(): string {
            return ResourceManager.GetString("PrescriptionItem_Text", resourceCulture);
        }
    }
