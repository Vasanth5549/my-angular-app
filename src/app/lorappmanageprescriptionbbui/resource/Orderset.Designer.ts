const resourceCulture = "";
const Data = [{ "key": "DiscontinueMsg", "value": "The selected item(s) is part of order set - {0}. Please discontinue/cancel the other items in order set if appropriate" }, { "key": "OrderSetIcon_ToolTip", "value": "Order sets" }, { "key": "Quicklinkchilddisplay_Text", "value": "Order Sets" }, { "key": "Quicklinkparentdisplay_Text", "value": "Order sets" }];
class ResourceManager {
    static GetString(key: string, resourceCulture: any): string {
        let r = Data.find((e) => e.key == key);
        return r != undefined ? r.value : "";
    }
}
export class Orderset {
        constructor() {

        }
        public static get DiscontinueMsg(): string {
            return ResourceManager.GetString("DiscontinueMsg", resourceCulture);
        }
        public static get OrderSetIcon_ToolTip(): string {
            return ResourceManager.GetString("OrderSetIcon_ToolTip", resourceCulture);
        }
        public static get Quicklinkchilddisplay_Text(): string {
            return ResourceManager.GetString("Quicklinkchilddisplay_Text", resourceCulture);
        }
        public static get Quicklinkparentdisplay_Text(): string {
            return ResourceManager.GetString("Quicklinkparentdisplay_Text", resourceCulture);
        }
    }
