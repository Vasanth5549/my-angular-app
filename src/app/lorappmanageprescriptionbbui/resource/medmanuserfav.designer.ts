// const resourceCulture = "";
    const Data = [{ "key": "AdministrationInstruction_Header", "value": "Administration instruction" }, { "key": "DoseUOM_Header", "value": "UOM" }, { "key": "Dose_Header", "value": "Dose" }, { "key": "DrugName_Header", "value": "Drug name" }, { "key": "Duration_Header", "value": "Duration" }, { "key": "Frequency_Header", "value": "Frequency" }, { "key": "iButton1_Text", "value": "Remove" }, { "key": "iButton3_Text", "value": "Move up" }, { "key": "iButton4_Text", "value": "Move down" }, { "key": "iLabel1_Text", "value": "Description" }, { "key": "Period_Header", "value": "Period" }, { "key": "Quantity_Header", "value": "Quantity" }, { "key": "Route_Header", "value": "Route" }, { "key": "String1", "value": "User name" }, { "key": "String18", "value": "" }, { "key": "String2", "value": "Favourites" }, { "key": "SupplyInstruction_Header", "value": "Supply instruction" }, { "key": "VariableInstruction_Header", "value": "Variable dose instruction" }];
    class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
            let r = Data.find((e) => e.key == key);
            return r != undefined ? r.value : "";
        }
    }
    export class medmanuserfav {
        // private static resourceMan: System.Resources.ResourceManager;
        private static resourceCulture = "";
        constructor() {

        }
        public static get AdministrationInstruction_Header(): string {
            return ResourceManager.GetString("AdministrationInstruction_Header", medmanuserfav.resourceCulture);
        }
        public static get Dose_Header(): string {
            return ResourceManager.GetString("Dose_Header", medmanuserfav.resourceCulture);
        }
        public static get DoseUOM_Header(): string {
            return ResourceManager.GetString("DoseUOM_Header", medmanuserfav.resourceCulture);
        }
        public static get DrugName_Header(): string {
            return ResourceManager.GetString("DrugName_Header", medmanuserfav.resourceCulture);
        }
        public static get Duration_Header(): string {
            return ResourceManager.GetString("Duration_Header", medmanuserfav.resourceCulture);
        }
        public static get Frequency_Header(): string {
            return ResourceManager.GetString("Frequency_Header", medmanuserfav.resourceCulture);
        }
        public static get iButton1_Text(): string {
            return ResourceManager.GetString("iButton1_Text", medmanuserfav.resourceCulture);
        }
        public static get iButton3_Text(): string {
            return ResourceManager.GetString("iButton3_Text", medmanuserfav.resourceCulture);
        }
        public static get iButton4_Text(): string {
            return ResourceManager.GetString("iButton4_Text", medmanuserfav.resourceCulture);
        }
        public static get iLabel1_Text(): string {
            return ResourceManager.GetString("iLabel1_Text", medmanuserfav.resourceCulture);
        }
        public static get Period_Header(): string {
            return ResourceManager.GetString("Period_Header", medmanuserfav.resourceCulture);
        }
        public static get Quantity_Header(): string {
            return ResourceManager.GetString("Quantity_Header", medmanuserfav.resourceCulture);
        }
        public static get Route_Header(): string {
            return ResourceManager.GetString("Route_Header", medmanuserfav.resourceCulture);
        }
        public static get String1(): string {
            return ResourceManager.GetString("String1", medmanuserfav.resourceCulture);
        }
        public static get String18(): string {
            return ResourceManager.GetString("String18", medmanuserfav.resourceCulture);
        }
        public static get String2(): string {
            return ResourceManager.GetString("String2", medmanuserfav.resourceCulture);
        }
        public static get SupplyInstruction_Header(): string {
            return ResourceManager.GetString("SupplyInstruction_Header", medmanuserfav.resourceCulture);
        }
        public static get VariableInstruction_Header(): string {
            return ResourceManager.GetString("VariableInstruction_Header", medmanuserfav.resourceCulture);
        }
    }
