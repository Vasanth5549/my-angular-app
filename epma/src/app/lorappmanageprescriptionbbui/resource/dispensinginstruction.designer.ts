// const resourceCulture = "";
    const Data = [{"key":"Additionalcomments_Header","value":"Additional comments"},{"key":"Otherinstruction_Header","value":"Other instruction(s)"},{"key":"Encounter_Header","value":"Encounter"},{"key":"DispensingHistory_Header","value":"Dispensing instruction history"},{"key":"DispensingInstruction_Header","value":"Dispensing instructions"},{"key":"Comments_Header","value":"Comments"},{"key":"AdditionalComments_ToolTip","value":"Enter additional comments"},{"key":"OtherIns_ToolTip","value":"Enter other instruction(s)"},{"key":"sTitle","value":"Dispensing instructions - LORENZO"},{"key":"sLorenzoTitle","value":"Lorenzo"},{"key":"sMandatoryMessage","value":"The other instruction(s) cannot be blank."},{"key":"ChkDispensingInstruction","value":"Choose one or more dispensing instruction(s)"}];
    class ResourceManager {
            static GetString(key: string, resourceCulture: any): string {
              let r = Data.find((e) => e.key == key);
              return r != undefined ? r.value : "";
            }
          }


    export class Dispensinginstruction {
        // private static resourceMan: System.Resources.ResourceManager;
        private static resourceCulture = "";
        constructor() {

        }
        public static get Additionalcomments_Header(): string {
            return ResourceManager.GetString("Additionalcomments_Header", Dispensinginstruction.resourceCulture);
        }
        public static get AdditionalComments_ToolTip(): string {
            return ResourceManager.GetString("AdditionalComments_ToolTip", Dispensinginstruction.resourceCulture);
        }
        public static get ChkDispensingInstruction(): string {
            return ResourceManager.GetString("ChkDispensingInstruction", Dispensinginstruction.resourceCulture);
        }
        public static get Comments_Header(): string {
            return ResourceManager.GetString("Comments_Header", Dispensinginstruction.resourceCulture);
        }
        public static get DispensingHistory_Header(): string {
            return ResourceManager.GetString("DispensingHistory_Header", Dispensinginstruction.resourceCulture);
        }
        public static get DispensingInstruction_Header(): string {
            return ResourceManager.GetString("DispensingInstruction_Header", Dispensinginstruction.resourceCulture);
        }
        public static get Encounter_Header(): string {
            return ResourceManager.GetString("Encounter_Header", Dispensinginstruction.resourceCulture);
        }
        public static get OtherIns_ToolTip(): string {
            return ResourceManager.GetString("OtherIns_ToolTip", Dispensinginstruction.resourceCulture);
        }
        public static get Otherinstruction_Header(): string {
            return ResourceManager.GetString("Otherinstruction_Header", Dispensinginstruction.resourceCulture);
        }
        public static get sLorenzoTitle(): string {
            return ResourceManager.GetString("sLorenzoTitle", Dispensinginstruction.resourceCulture);
        }
        public static get sMandatoryMessage(): string {
            return ResourceManager.GetString("sMandatoryMessage", Dispensinginstruction.resourceCulture);
        }
        public static get sTitle(): string {
            return ResourceManager.GetString("sTitle", Dispensinginstruction.resourceCulture);
        }
    }
