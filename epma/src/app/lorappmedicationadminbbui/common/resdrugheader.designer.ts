//const resourceCulture = "";
const Data = [{ "key": "drugItem_DoseLabelText", "value": "Dose" }, { "key": "drugItem_RouteLabelText", "value": "Route" }];
class ResourceManager {
  static GetString(key: string, resourceCulture: any): string {
    let r = Data.find((e) => e.key == key);
    return r != undefined ? r.value : "";
  }
}


export class ResDrugHeader {
  private static resourceCulture = "";
  constructor() {

  }
  public static get drugItem_DoseLabelText(): string {
    return ResourceManager.GetString("drugItem_DoseLabelText", ResDrugHeader.resourceCulture);
  }
  public static get drugItem_RouteLabelText(): string {
    return ResourceManager.GetString("drugItem_RouteLabelText", ResDrugHeader.resourceCulture);
  }
}