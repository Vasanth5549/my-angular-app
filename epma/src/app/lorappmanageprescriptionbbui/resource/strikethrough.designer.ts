const resourceCulture = "";
const Data = [{"key":"cboStrikethroughReason_Tooltip","value":"Select reason for strikethrough"},{"key":"cmdCancel_Text","value":"Cancel"},{"key":"cmdCancel_Tooltip","value":"Select to cancel strikethrough administration activity"},{"key":"cmdOK_Text","value":"Ok"},{"key":"cmdOK_Tooltip","value":"Select Ok to complete strikethrough administration activity"},{"key":"lblCIFValue_Tooltip","value":"Select to launch Clinical incident form"}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }
	
	
	export class Strikethrough {
        constructor() {

        }
        public static get cboStrikethroughReason_Tooltip(): string {
            return ResourceManager.GetString("cboStrikethroughReason_Tooltip", resourceCulture);
        }
        public static get cmdCancel_Text(): string {
            return ResourceManager.GetString("cmdCancel_Text", resourceCulture);
        }
        public static get cmdCancel_Tooltip(): string {
            return ResourceManager.GetString("cmdCancel_Tooltip", resourceCulture);
        }
        public static get cmdOK_Text(): string {
            return ResourceManager.GetString("cmdOK_Text", resourceCulture);
        }
        public static get cmdOK_Tooltip(): string {
            return ResourceManager.GetString("cmdOK_Tooltip", resourceCulture);
        }
        public static get lblCIFValue_Tooltip(): string {
            return ResourceManager.GetString("lblCIFValue_Tooltip", resourceCulture);
        }
    }
