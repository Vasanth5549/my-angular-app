const Data = [
  { key: "Upto_Header", value: "Up to" },
  { key: "Quantity_Header", value: "Quantity" },
  { key: "UOM_Header", value: "UOM" },
  { key: "Multicomponent_Header", value: "Component name" },
  { key: "Dosageform_msg", value: "Dosage form cannot be blank" },
  { key: "Multicomponent_msg", value: "Multiple component preparations should have at least two components" },
  { key: "QuantityUOM_msg", value: "Please specify the quantity UOM for" },
  { key: "Quantity_msg", value: "Please specify the quantity for" },
  { key: "cmdAdd_Text", value: "Add item" },
  { key: "cmdAdd_tooltip", value: "Select to add another component" },
  { key: "cmdRemove_text", value: "Remove item" },
  { key: "cmdRemove_tooltip", value: "Select to remove a component" },
  { key: "lblDosageform_text", value: "Dosage form" },
  { key: "MCIFrame_Header", value: "Multiple component item details" },
  { key: "cmdAddSfs_Tooltip", value: "Select to search for a component" },
  { key: "Upto_Tooltip", value: "Select up to" },
  { key: "lblNextSupplyDTTM_Text", value:"Next supply"}
];

class ResourceManager {
  static GetString(key: string, resourceCulture: any): string {
    let r = Data.find((e) => e.key == key);
    return r != undefined ? r.value : "";
  }
}

export class multilist {
  // private static resourceMan: System.Resources.ResourceManager;
  private static resourceCulture = "";
  constructor() {}

  public static get CancelButton_Text(): string {
    return ResourceManager.GetString("CancelButton_Text", multilist.resourceCulture);
  }

  public static get CancelButton_Tooltip(): string {
    return ResourceManager.GetString("CancelButton_Tooltip", multilist.resourceCulture);
  }

  public static get chkSupplyInstruction_ToolTip(): string {
    return ResourceManager.GetString("chkSupplyInstruction_ToolTip", multilist.resourceCulture);
  }

  public static get lblNextSupplyDTTM_Text(): string {
    return ResourceManager.GetString("lblNextSupplyDTTM_Text", multilist.resourceCulture);
  }

  
  public static get lblNextSupplyDTTM_Tootip(): string {
    return ResourceManager.GetString("lblNextSupplyDTTM_Tootip", multilist.resourceCulture);
  }
  
	
  public static get lblOtherInstructions_Text(): string {
    return ResourceManager.GetString("lblOtherInstructions_Text", multilist.resourceCulture);
  }

  
  public static get lblSupplyComments_Text(): string {
    return ResourceManager.GetString("lblSupplyComments_Text", multilist.resourceCulture);
  }

 
  public static get OKButton_Text(): string {
    return ResourceManager.GetString("OKButton_Text", multilist.resourceCulture);
  }

  
  public static get OKButton_Tooltip(): string {
    return ResourceManager.GetString("OKButton_Tooltip", multilist.resourceCulture);
  }

  
  public static get Other_Instructions_Empty_Message(): string {
    return ResourceManager.GetString("Other_Instructions_Empty_Message", multilist.resourceCulture);
  }

  
  public static get txtOtherInstructions_Tooltip(): string {
    return ResourceManager.GetString("txtOtherInstructions_Tooltip", multilist.resourceCulture);
  }

  
  public static get txtSupplyComments_Tooltip(): string {
    return ResourceManager.GetString("txtSupplyComments_Tooltip", multilist.resourceCulture);
  }
}
