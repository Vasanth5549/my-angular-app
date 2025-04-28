const resourceCulture = "";
const Data = [{"key":"cboReason_ToolTip","value":"Select an option or free-type a reason for prescribing a non formulary medication item"},{"key":"cmdCancel_Text","value":"Cancel"},{"key":"cmdCancel_ToolTip","value":"Select cancel to close"},{"key":"cmdOk_Text","value":"Ok"},{"key":"cmdOk_ToolTip","value":"Select ok to proceed"},{"key":"lblItemName_Text","value":"Item name"},{"key":"lblNonFormulary_Text","value":"Non formulary item"},{"key":"lblOtherReason_Text","value":"Other reason"},{"key":"lblReason_Text","value":"Reason for prescribing non formulary item"},{"key":"txtOtherReason_ToolTip","value":"Specify the reason for non formulary item"}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }
    export class ResMedNonFormulary {
        constructor() {

        }
        public static get cboReason_ToolTip(): string {
            return ResourceManager.GetString("cboReason_ToolTip", resourceCulture);
        }
        public static get cmdCancel_Text(): string {
            return ResourceManager.GetString("cmdCancel_Text", resourceCulture);
        }
        public static get cmdCancel_ToolTip(): string {
            return ResourceManager.GetString("cmdCancel_ToolTip", resourceCulture);
        }
        public static get cmdOk_Text(): string {
            return ResourceManager.GetString("cmdOk_Text", resourceCulture);
        }
        public static get cmdOk_ToolTip(): string {
            return ResourceManager.GetString("cmdOk_ToolTip", resourceCulture);
        }
        public static get lblItemName_Text(): string {
            return ResourceManager.GetString("lblItemName_Text", resourceCulture);
        }
        public static get lblNonFormulary_Text(): string {
            return ResourceManager.GetString("lblNonFormulary_Text", resourceCulture);
        }
        public static get lblOtherReason_Text(): string {
            return ResourceManager.GetString("lblOtherReason_Text", resourceCulture);
        }
        public static get lblReason_Text(): string {
            return ResourceManager.GetString("lblReason_Text", resourceCulture);
        }
        public static get txtOtherReason_ToolTip(): string {
            return ResourceManager.GetString("txtOtherReason_ToolTip", resourceCulture);
        }
    }
