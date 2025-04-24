//const resourceCulture = "";
const Data = [{ "key": "cboMedicationView_Tooltip", "value": "Select the days in Medication view" }, { "key": "cboSortby_Tooltip", "value": "Select from the available sort options" }, { "key": "cmdCancel_Text", "value": "Cancel" }, { "key": "cmdCancel_Tooltip", "value": "Select to cancel the activity" }, { "key": "cmdOK_Text", "value": "OK" }, { "key": "cmdOK_Tooltip", "value": "Select to set the filter" }, { "key": "dtpFromdate_Tooltip", "value": "Select from date" }, { "key": "lblEncounter_Text", "value": "Encounter" }, { "key": "lblFilterby_Text", "value": "Filter options" }, { "key": "lblFrom_Text", "value": "From" }, { "key": "lblMedicationViewText_Text", "value": "14 day view" }, { "key": "lblMedicationView_Text", "value": "Medication view" }, { "key": "lblSortby", "value": "Sort by" }, { "key": "lblSort_Text", "value": "Sort options" }, { "key": "sfsEncounter_Tooltip", "value": "Select encounter" }, { "key": "tbSortFilterOptions_Text", "value": "Filter by options" }, { "key": "SortFilterOptionsHeader", "value": "Medication chart overview - Options" }, { "key": "chkIncludeDiscontinue_Text", "value": "Include discontinued/completed items" }, { "key": "chkIncludeCancel_Text", "value": "Include cancelled items" }, { "key": "chkIncludeDiscontinue_ToolTip", "value": "Select to include discontinued/completed items" }, { "key": "chkIncludeCancel_ToolTip", "value": "Select to include cancelled items" }, { "key": "FilterByOptionsHeader", "value": "Prescription chart - Filter by options" }, { "key": "tbFilterOption_Text", "value": "Filter by options" }, { "key": "ErrMsgMedChartEncNotAssociated", "value": "The selected encounter does not have a medication chart associated with it, Please select another encounter." }, { "key": "cmdOverViewOK_Tooltip", "value": "Select to apply filter options to overview" }];
class ResourceManager {
    static GetString(key: string, resourceCulture: any): string {
        let r = Data.find((e) => e.key == key);
        return r != undefined ? r.value : "";
    }
}


export class MedSortFilterbyOptionsDesign {
    private static resourceCulture = "";
    constructor() {

    }
    public static get cboMedicationView_Tooltip(): string {
        return ResourceManager.GetString("cboMedicationView_Tooltip", MedSortFilterbyOptionsDesign.resourceCulture);
    }
    public static get cboSortby_Tooltip(): string {
        return ResourceManager.GetString("cboSortby_Tooltip", MedSortFilterbyOptionsDesign.resourceCulture);
    }
    public static get chkIncludeCancel_Text(): string {
        return ResourceManager.GetString("chkIncludeCancel_Text", MedSortFilterbyOptionsDesign.resourceCulture);
    }
    public static get chkIncludeCancel_ToolTip(): string {
        return ResourceManager.GetString("chkIncludeCancel_ToolTip", MedSortFilterbyOptionsDesign.resourceCulture);
    }
    public static get chkIncludeDiscontinue_Text(): string {
        return ResourceManager.GetString("chkIncludeDiscontinue_Text", MedSortFilterbyOptionsDesign.resourceCulture);
    }
    public static get chkIncludeDiscontinue_ToolTip(): string {
        return ResourceManager.GetString("chkIncludeDiscontinue_ToolTip", MedSortFilterbyOptionsDesign.resourceCulture);
    }
    public static get cmdCancel_Text(): string {
        return ResourceManager.GetString("cmdCancel_Text", MedSortFilterbyOptionsDesign.resourceCulture);
    }
    public static get cmdCancel_Tooltip(): string {
        return ResourceManager.GetString("cmdCancel_Tooltip", MedSortFilterbyOptionsDesign.resourceCulture);
    }
    public static get cmdOK_Text(): string {
        return ResourceManager.GetString("cmdOK_Text", MedSortFilterbyOptionsDesign.resourceCulture);
    }
    public static get cmdOK_Tooltip(): string {
        return ResourceManager.GetString("cmdOK_Tooltip", MedSortFilterbyOptionsDesign.resourceCulture);
    }
    public static get cmdOverViewOK_Tooltip(): string {
        return ResourceManager.GetString("cmdOverViewOK_Tooltip", MedSortFilterbyOptionsDesign.resourceCulture);
    }
    public static get dtpFromdate_Tooltip(): string {
        return ResourceManager.GetString("dtpFromdate_Tooltip", MedSortFilterbyOptionsDesign.resourceCulture);
    }
    public static get ErrMsgMedChartEncNotAssociated(): string {
        return ResourceManager.GetString("ErrMsgMedChartEncNotAssociated", MedSortFilterbyOptionsDesign.resourceCulture);
    }
    public static get FilterByOptionsHeader(): string {
        return ResourceManager.GetString("FilterByOptionsHeader", MedSortFilterbyOptionsDesign.resourceCulture);
    }
    public static get lblEncounter_Text(): string {
        return ResourceManager.GetString("lblEncounter_Text", MedSortFilterbyOptionsDesign.resourceCulture);
    }
    public static get lblFilterby_Text(): string {
        return ResourceManager.GetString("lblFilterby_Text", MedSortFilterbyOptionsDesign.resourceCulture);
    }
    public static get lblFrom_Text(): string {
        return ResourceManager.GetString("lblFrom_Text", MedSortFilterbyOptionsDesign.resourceCulture);
    }
    public static get lblMedicationView_Text(): string {
        return ResourceManager.GetString("lblMedicationView_Text", MedSortFilterbyOptionsDesign.resourceCulture);
    }
    public static get lblMedicationViewText_Text(): string {
        return ResourceManager.GetString("lblMedicationViewText_Text", MedSortFilterbyOptionsDesign.resourceCulture);
    }
    public static get lblSort_Text(): string {
        return ResourceManager.GetString("lblSort_Text", MedSortFilterbyOptionsDesign.resourceCulture);
    }
    public static get lblSortby(): string {
        return ResourceManager.GetString("lblSortby", MedSortFilterbyOptionsDesign.resourceCulture);
    }
    public static get sfsEncounter_Tooltip(): string {
        return ResourceManager.GetString("sfsEncounter_Tooltip", MedSortFilterbyOptionsDesign.resourceCulture);
    }
    public static get SortFilterOptionsHeader(): string {
        return ResourceManager.GetString("SortFilterOptionsHeader", MedSortFilterbyOptionsDesign.resourceCulture);
    }
    public static get tbFilterOption_Text(): string {
        return ResourceManager.GetString("tbFilterOption_Text", MedSortFilterbyOptionsDesign.resourceCulture);
    }
    public static get tbSortFilterOptions_Text(): string {
        return ResourceManager.GetString("tbSortFilterOptions_Text", MedSortFilterbyOptionsDesign.resourceCulture);
    }
}