    const resourceCulture = "";
const Data = [{"key":"Upto_Header","value":"Up to"},{"key":"Quantity_Header","value":"Quantity"},{"key":"UOM_Header","value":"UOM"},{"key":"Multicomponent_Header","value":"Component name"},{"key":"Dosageform_msg","value":"Dosage form cannot be blank"},{"key":"Multicomponent_msg","value":"Multiple component preparations should have at least two components"},{"key":"QuantityUOM_msg","value":"Please specify the quantity UOM for"},{"key":"Quantity_msg","value":"Please specify the quantity for"},{"key":"cmdAdd_Text","value":"Add item"},{"key":"cmdAdd_tooltip","value":"Select to add another component"},{"key":"cmdRemove_text","value":"Remove item"},{"key":"cmdRemove_tooltip","value":"Select to remove a component"},{"key":"lblDosageform_text","value":"Dosage form"},{"key":"MCIFrame_Header","value":"Multiple component item details"},{"key":"cmdAddSfs_Tooltip","value":"Select to search for a component"},{"key":"Upto_Tooltip","value":"Select up to"}];
    class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }
    export class Multicomponent {
        constructor() {

        }
        public static get cmdAdd_Text(): string {
            return ResourceManager.GetString("cmdAdd_Text", resourceCulture);
        }
        public static get cmdAdd_tooltip(): string {
            return ResourceManager.GetString("cmdAdd_tooltip", resourceCulture);
        }
        public static get cmdAddSfs_Tooltip(): string {
            return ResourceManager.GetString("cmdAddSfs_Tooltip", resourceCulture);
        }
        public static get cmdRemove_text(): string {
            return ResourceManager.GetString("cmdRemove_text", resourceCulture);
        }
        public static get cmdRemove_tooltip(): string {
            return ResourceManager.GetString("cmdRemove_tooltip", resourceCulture);
        }
        public static get Dosageform_msg(): string {
            return ResourceManager.GetString("Dosageform_msg", resourceCulture);
        }
        public static get lblDosageform_text(): string {
            return ResourceManager.GetString("lblDosageform_text", resourceCulture);
        }
        public static get MCIFrame_Header(): string {
            return ResourceManager.GetString("MCIFrame_Header", resourceCulture);
        }
        public static get Multicomponent_Header(): string {
            return ResourceManager.GetString("Multicomponent_Header", resourceCulture);
        }
        public static get Multicomponent_msg(): string {
            return ResourceManager.GetString("Multicomponent_msg", resourceCulture);
        }
        public static get Quantity_Header(): string {
            return ResourceManager.GetString("Quantity_Header", resourceCulture);
        }
        public static get Quantity_msg(): string {
            return ResourceManager.GetString("Quantity_msg", resourceCulture);
        }
        public static get QuantityUOM_msg(): string {
            return ResourceManager.GetString("QuantityUOM_msg", resourceCulture);
        }
        public static get UOM_Header(): string {
            return ResourceManager.GetString("UOM_Header", resourceCulture);
        }
        public static get Upto_Header(): string {
            return ResourceManager.GetString("Upto_Header", resourceCulture);
        }
        public static get Upto_Tooltip(): string {
            return ResourceManager.GetString("Upto_Tooltip", resourceCulture);
        }
    }
