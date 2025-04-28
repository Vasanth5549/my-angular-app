const resourceCulture = "";
const Data = [{"key":"cboTeam_Tooltip","value":"Specify team to whom the task should be sent to"},{"key":"cmdOk_Text","value":"Ok"},{"key":"cmdOk_Tooltip","value":"Click to submit this activity"},{"key":"lblOptions_Text","value":"Specify Team"},{"key":"lblTeam_Text","value":"Team"}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }
	
	export class userteam {
        constructor() {

        }
        public static get cboTeam_Tooltip(): string {
            return ResourceManager.GetString("cboTeam_Tooltip", resourceCulture);
        }
        public static get cmdOk_Text(): string {
            return ResourceManager.GetString("cmdOk_Text", resourceCulture);
        }
        public static get cmdOk_Tooltip(): string {
            return ResourceManager.GetString("cmdOk_Tooltip", resourceCulture);
        }
        public static get lblOptions_Text(): string {
            return ResourceManager.GetString("lblOptions_Text", resourceCulture);
        }
        public static get lblTeam_Text(): string {
            return ResourceManager.GetString("lblTeam_Text", resourceCulture);
        }
    }
