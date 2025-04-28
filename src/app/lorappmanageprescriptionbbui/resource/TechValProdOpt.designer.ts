const resourceCulture = "";
const Data = [{"key":"MultiComp","value":"MultiComp"},{"key":"PresItemType","value":"PresItem"},{"key":"ProdOptMSG","value":"Please select the product option"},{"key":"Quantityperdose","value":"Quantity per dose is mandatory, please select the value"},{"key":"QuantityUOM","value":"Quantity per dose UOM is mandatory, please select the value"},{"key":"RemoveBeginTxt","value":"The prescription item"},{"key":"RemoveEndTxt","value":"will now be considered as not technically validated"},{"key":"SelectSupInstrution","value":"Select supply instructions to enter value(s)"},{"key":"Title","value":"Lorenzo - Manage prescription"},{"key":"TotalUOM","value":"Total quantity UOM is mandatory, please select the value"},{"key":"Totquantity","value":"Total quantity is mandatory, please select the value"},{"key":"SupplyInstMand","value":"Supply instructions field is mandatory, please select the value"}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }
	
	
	export class TechValProdOpt {
        constructor() {

        }
        public static get SelectSupInstrution(): string {
            return ResourceManager.GetString("SelectSupInstrution", resourceCulture);
        }
        public static get Quantityperdose(): string {
            return ResourceManager.GetString("Quantityperdose", resourceCulture);
        }
        public static get Totquantity(): string {
            return ResourceManager.GetString("Totquantity", resourceCulture);
        }
        public static get QuantityUOM(): string {
            return ResourceManager.GetString("QuantityUOM", resourceCulture);
        }
        public static get TotalUOM(): string {
            return ResourceManager.GetString("TotalUOM", resourceCulture);
        }
        public static get PresItemType(): string {
            return ResourceManager.GetString("PresItemType", resourceCulture);
        }
        public static get MultiComp(): string {
            return ResourceManager.GetString("MultiComp", resourceCulture);
        }
        public static get ProdOptMSG(): string {
            return ResourceManager.GetString("ProdOptMSG", resourceCulture);
        }
        public static get Title(): string {
            return ResourceManager.GetString("Title", resourceCulture);
        }
        public static get RemoveBeginTxt(): string {
            return ResourceManager.GetString("RemoveBeginTxt", resourceCulture);
        }
        public static get RemoveEndTxt(): string {
            return ResourceManager.GetString("RemoveEndTxt", resourceCulture);
        }
        public static get SupplyInstMand(): string {
            return ResourceManager.GetString("SupplyInstMand", resourceCulture);
        }
    }
