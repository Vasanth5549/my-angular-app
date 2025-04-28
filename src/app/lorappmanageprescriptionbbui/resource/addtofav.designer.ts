// const resourceCulture = "";
const Data = [{"key":"cmdAdd_Text","value":"Add"},{"key":"cmdAdd_Tooltip","value":"Select to add an item"},{"key":"cmdClose_Text","value":"Close"},{"key":"cmdClose_Tooltip","value":"Select to close"},{"key":"cmdNewFolder_Text","value":"New folder"},{"key":"cmdNewFolder_Tooltip","value":"Select to create Group"},{"key":"DrugName_Header","value":"Drug name"},{"key":"lblSummary_Text","value":"Summary"},{"key":"lblText_Text","value":"Add to favourites"}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }


    export class addtofav {
        // private static resourceMan: System.Resources.ResourceManager;
        private static resourceCulture = "";
        constructor() {

        }
        public static get cmdAdd_Text(): string {
            return ResourceManager.GetString("cmdAdd_Text", addtofav.resourceCulture);
        }
        public static get cmdAdd_Tooltip(): string {
            return ResourceManager.GetString("cmdAdd_Tooltip", addtofav.resourceCulture);
        }
        public static get cmdClose_Text(): string {
            return ResourceManager.GetString("cmdClose_Text", addtofav.resourceCulture);
        }
        public static get cmdClose_Tooltip(): string {
            return ResourceManager.GetString("cmdClose_Tooltip", addtofav.resourceCulture);
        }
        public static get cmdNewFolder_Text(): string {
            return ResourceManager.GetString("cmdNewFolder_Text", addtofav.resourceCulture);
        }
        public static get cmdNewFolder_Tooltip(): string {
            return ResourceManager.GetString("cmdNewFolder_Tooltip", addtofav.resourceCulture);
        }
        public static get DrugName_Header(): string {
            return ResourceManager.GetString("DrugName_Header", addtofav.resourceCulture);
        }
        public static get lblSummary_Text(): string {
            return ResourceManager.GetString("lblSummary_Text", addtofav.resourceCulture);
        }
        public static get lblText_Text(): string {
            return ResourceManager.GetString("lblText_Text", addtofav.resourceCulture);
        }
    }
