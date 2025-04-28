// const resourceCulture = "";
const Data = [{"key":"cboRSNOverride_ToolTip","value":"Select reason for override"},{"key":"cmdCancel_Text","value":"Cancel"},{"key":"cmdCancel_ToolTip","value":"Select to cancel this activity"},{"key":"cmdOk_Text","value":"Ok"},{"key":"cmdOk_ToolTip","value":"Select to submit this activity"},{"key":"lblRSNOverrideDesc_Text","value":"You have overridden the dose calculator calculated value. Enter a reason. Click 'Cancel' to revert to calculator suggested value."},{"key":"lblRSNOverrideTitle_Text","value":"Reason for override"},{"key":"lblRSNOverride_Text","value":"Reason for override"},{"key":"Title_Text","value":"Dose calculator modification"}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }
	  

    export class ResCalcDoseOverrideRSN {
        // private static resourceMan: System.Resources.ResourceManager;
        private static resourceCulture = "";
        constructor() {

        }
        public static get cboRSNOverride_ToolTip(): string {
            return ResourceManager.GetString("cboRSNOverride_ToolTip", ResCalcDoseOverrideRSN.resourceCulture);
        }
        public static get cmdCancel_Text(): string {
            return ResourceManager.GetString("cmdCancel_Text", ResCalcDoseOverrideRSN.resourceCulture);
        }
        public static get cmdCancel_ToolTip(): string {
            return ResourceManager.GetString("cmdCancel_ToolTip", ResCalcDoseOverrideRSN.resourceCulture);
        }
        public static get cmdOk_Text(): string {
            return ResourceManager.GetString("cmdOk_Text", ResCalcDoseOverrideRSN.resourceCulture);
        }
        public static get cmdOk_ToolTip(): string {
            return ResourceManager.GetString("cmdOk_ToolTip", ResCalcDoseOverrideRSN.resourceCulture);
        }
        public static get lblRSNOverride_Text(): string {
            return ResourceManager.GetString("lblRSNOverride_Text", ResCalcDoseOverrideRSN.resourceCulture);
        }
        public static get lblRSNOverrideDesc_Text(): string {
            return ResourceManager.GetString("lblRSNOverrideDesc_Text", ResCalcDoseOverrideRSN.resourceCulture);
        }
        public static get lblRSNOverrideTitle_Text(): string {
            return ResourceManager.GetString("lblRSNOverrideTitle_Text", ResCalcDoseOverrideRSN.resourceCulture);
        }
        public static get Title_Text(): string {
            return ResourceManager.GetString("Title_Text", ResCalcDoseOverrideRSN.resourceCulture);
        }
    }
