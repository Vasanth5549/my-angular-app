const resourceCulture = "";
const Data = [{"key":"Prescriptiontype_Header","value":"Prescription type"},{"key":"Medicationitem_Header","value":"Medication item"},{"key":"Technicallyvalidatedat_Header","value":"Technically validated at"},{"key":"Supplyinscomments_Header","value":"Supply instructions/comments"},{"key":"Location_Header","value":"Location"},{"key":"Technicallyvalidatedby_Header","value":"Technically validated by"},{"key":"Comments","value":"Comments:"},{"key":"SupplyStatus","value":"Supply status"},{"key":"MedReqHistory_Cancelled","value":"Cancelled"},{"key":"MedReqHistory_Requested","value":"Requested"},{"key":"NextSupDate_Header","value":"Next supply"},{"key":"Dispensingdet_Header","value":"Dispensing request details date/time"}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }


    export class Supplyhistory {
        constructor() {

        }
        public static get Comments(): string {
            return ResourceManager.GetString("Comments", resourceCulture);
        }
        public static get Dispensingdet_Header(): string {
            return ResourceManager.GetString("Dispensingdet_Header", resourceCulture);
        }
        public static get Location_Header(): string {
            return ResourceManager.GetString("Location_Header", resourceCulture);
        }
        public static get Medicationitem_Header(): string {
            return ResourceManager.GetString("Medicationitem_Header", resourceCulture);
        }
        public static get MedReqHistory_Cancelled(): string {
            return ResourceManager.GetString("MedReqHistory_Cancelled", resourceCulture);
        }
        public static get MedReqHistory_Requested(): string {
            return ResourceManager.GetString("MedReqHistory_Requested", resourceCulture);
        }
        public static get NextSupDate_Header(): string {
            return ResourceManager.GetString("NextSupDate_Header", resourceCulture);
        }
        public static get Prescriptiontype_Header(): string {
            return ResourceManager.GetString("Prescriptiontype_Header", resourceCulture);
        }
        public static get Supplyinscomments_Header(): string {
            return ResourceManager.GetString("Supplyinscomments_Header", resourceCulture);
        }
        public static get SupplyStatus(): string {
            return ResourceManager.GetString("SupplyStatus", resourceCulture);
        }
        public static get Technicallyvalidatedat_Header(): string {
            return ResourceManager.GetString("Technicallyvalidatedat_Header", resourceCulture);
        }
        public static get Technicallyvalidatedby_Header(): string {
            return ResourceManager.GetString("Technicallyvalidatedby_Header", resourceCulture);
        }
    }
