// const resourceCulture = "";
const Data = [{"key":"Description_Text","value":"Description"},{"key":"Link_Text","value":"Link"}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }

    export class otherlinks {
        // private static resourceMan: System.Resources.ResourceManager;
        private static resourceCulture = "";
        constructor() {

        }
        public static get Description_Text(): string {
            return ResourceManager.GetString("Description_Text", otherlinks.resourceCulture);
        }
        public static get Link_Text(): string {
            return ResourceManager.GetString("Link_Text", otherlinks.resourceCulture);
        }
    }
