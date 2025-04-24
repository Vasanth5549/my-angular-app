// const resourceCulture = "";
const Data = [{"key":"Formularynote_Tooltip","value":"Formulary note -"},{"key":"lblQLink1Name_Text","value":"Fromulary"},{"key":"lblQLinkName_Text","value":"Favourites"},{"key":"SelcetionIcon_Tooltip","value":"Click to copy across"}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }

    export class qlfav {
        // private static resourceMan: System.Resources.ResourceManager;
        private static resourceCulture = "";
        constructor() {

        }
        public static get Formularynote_Tooltip(): string {
            return ResourceManager.GetString("Formularynote_Tooltip", qlfav.resourceCulture);
        }
        public static get lblQLink1Name_Text(): string {
            return ResourceManager.GetString("lblQLink1Name_Text", qlfav.resourceCulture);
        }
        public static get lblQLinkName_Text(): string {
            return ResourceManager.GetString("lblQLinkName_Text", qlfav.resourceCulture);
        }
        public static get SelcetionIcon_Tooltip(): string {
            return ResourceManager.GetString("SelcetionIcon_Tooltip", qlfav.resourceCulture);
        }
    }
