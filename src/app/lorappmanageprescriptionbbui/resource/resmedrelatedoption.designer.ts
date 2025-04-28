const resourceCulture = "";
const Data = [{"key":"formularynote","value":"Formulary note"},{"key":"medicationitemname","value":"Medication item name"}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }
    export class ResMedRelatedOption {
        constructor() {

        }
        public static get formularynote(): string {
            return ResourceManager.GetString("formularynote", resourceCulture);
        }
        public static get medicationitemname(): string {
            return ResourceManager.GetString("medicationitemname", resourceCulture);
        }
    }
