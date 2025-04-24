const resourceCulture = "";
    const Data = [{ "key": "CancelButton_Text", "value": "Cancel" }, { "key": "CancelButton_Tooltip", "value": "Click to Cancel" }, { "key": "iLabel2_Text", "value": "On behalf of reason" }, { "key": "iLabel3_Text", "value": "Communication mode" }, { "key": "lblHeader_Text", "value": "On behalf of details" }, { "key": "OKButton_Text", "value": "OK" }, { "key": "OKButton_Tooltip", "value": "Click to Ok" }, { "key": "SFSOnBehalfOf_Tooltip", "value": "Select a value from SFS" }, { "key": "textBlock1_Tezt", "value": "On behalf of" }, { "key": "On_behalf_Mandatory_Message", "value": "On behalf of is mandatory, Please enter the value" }, { "key": "Action_text", "value": "Action" }, { "key": "commnmode_text", "value": "Communication mode" }, { "key": "onbehalfof_text", "value": "On behalf of" }, { "key": "onbehlfrsn_text", "value": "On behalf of reason" }, { "key": "Users_Text", "value": "User" }, { "key": "onbehalfdttm_Text", "value": "On behalf of date/time" }];
    class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
            let r = Data.find((e) => e.key == key);
            return r != undefined ? r.value : "";
        }
    }
    export class onbehalfof {
        constructor() {

        }
        public static get CancelButton_Text(): string {
            return ResourceManager.GetString("CancelButton_Text", resourceCulture);
        }
        public static get CancelButton_Tooltip(): string {
            return ResourceManager.GetString("CancelButton_Tooltip", resourceCulture);
        }
        public static get iLabel2_Text(): string {
            return ResourceManager.GetString("iLabel2_Text", resourceCulture);
        }
        public static get iLabel3_Text(): string {
            return ResourceManager.GetString("iLabel3_Text", resourceCulture);
        }
        public static get lblHeader_Text(): string {
            return ResourceManager.GetString("lblHeader_Text", resourceCulture);
        }
        public static get OKButton_Text(): string {
            return ResourceManager.GetString("OKButton_Text", resourceCulture);
        }
        public static get OKButton_Tooltip(): string {
            return ResourceManager.GetString("OKButton_Tooltip", resourceCulture);
        }
        public static get On_behalf_Mandatory_Message(): string {
            return ResourceManager.GetString("On_behalf_Mandatory_Message", resourceCulture);
        }
        public static get SFSOnBehalfOf_Tooltip(): string {
            return ResourceManager.GetString("SFSOnBehalfOf_Tooltip", resourceCulture);
        }
        public static get textBlock1_Tezt(): string {
            return ResourceManager.GetString("textBlock1_Tezt", resourceCulture);
        }
        public static get onbehalfdttm_Text(): string {
            return ResourceManager.GetString("onbehalfdttm_Text", resourceCulture);
        }
        public static get onbehalfof_text(): string {
            return ResourceManager.GetString("onbehalfof_text", resourceCulture);
        }
        public static get onbehlfrsn_text(): string {
            return ResourceManager.GetString("onbehlfrsn_text", resourceCulture);
        }
        public static get commnmode_text(): string {
            return ResourceManager.GetString("commnmode_text", resourceCulture);
        }
        public static get Users_Text(): string {
            return ResourceManager.GetString("Users_Text", resourceCulture);
        }
        public static get Action_text(): string {
            return ResourceManager.GetString("Action_text", resourceCulture);
        }
    }
