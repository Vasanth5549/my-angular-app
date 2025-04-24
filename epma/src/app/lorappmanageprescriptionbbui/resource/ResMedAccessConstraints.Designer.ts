const resourceCulture = "";
const Data = [{"key":"FormularyNotes_Text","value":"FormularyNotes"},{"key":"lblCaptionName_Text","value":"This drug can be prescribed only for the following indications and corresponding prescribing options. Select one to proceed"},{"key":"lblIndications_Text","value":"Indications"},{"key":"lblPrescribing_Text","value":"Prescribing options"},{"key":"Otherinformation_Text","value":"Other information"},{"key":"PrescriptionItem_Text","value":"Prescription item"},{"key":"Close_ToolTip","value":"Select to close"},{"key":"CopyAcross_ToolTip","value":"Select to copy across"},{"key":"FormularyNote_ToolTip","value":"Formulary note"},{"key":"lblOverrideIndications_Text","value":"Override Indications"},{"key":"lblReasonoverride_Text","value":"Reason for override"},{"key":"ChkOverrideIndications_Tooltip","value":"Click to override indications"},{"key":"cboReasonoverride_Tooltip","value":"Choose reason for overriding indications"},{"key":"OrderSentenceDesc_Text","value":"Order sentence description"}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }
    export class ResMedAccessConstraints {
        constructor() {

        }
        public static get cboReasonoverride_Tooltip(): string {
            return ResourceManager.GetString("cboReasonoverride_Tooltip", resourceCulture);
        }
        public static get ChkOverrideIndications_Tooltip(): string {
            return ResourceManager.GetString("ChkOverrideIndications_Tooltip", resourceCulture);
        }
        public static get Close_ToolTip(): string {
            return ResourceManager.GetString("Close_ToolTip", resourceCulture);
        }
        public static get CopyAcross_ToolTip(): string {
            return ResourceManager.GetString("CopyAcross_ToolTip", resourceCulture);
        }
        public static get FormularyNote_ToolTip(): string {
            return ResourceManager.GetString("FormularyNote_ToolTip", resourceCulture);
        }
        public static get FormularyNotes_Text(): string {
            return ResourceManager.GetString("FormularyNotes_Text", resourceCulture);
        }
        public static get lblCaptionName_Text(): string {
            return ResourceManager.GetString("lblCaptionName_Text", resourceCulture);
        }
        public static get lblIndications_Text(): string {
            return ResourceManager.GetString("lblIndications_Text", resourceCulture);
        }
        public static get lblOverrideIndications_Text(): string {
            return ResourceManager.GetString("lblOverrideIndications_Text", resourceCulture);
        }
        public static get lblPrescribing_Text(): string {
            return ResourceManager.GetString("lblPrescribing_Text", resourceCulture);
        }
        public static get lblReasonoverride_Text(): string {
            return ResourceManager.GetString("lblReasonoverride_Text", resourceCulture);
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
