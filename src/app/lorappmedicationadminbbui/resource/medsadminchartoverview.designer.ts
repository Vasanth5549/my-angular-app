//const resourceCulture = "";
const Data = [{ "key": "CanManageMedAdministration", "value": "You do not have rights to perform the action" }, { "key": "ChartDrugItemColumnHeader", "value": "Prescription item" }, { "key": "chkIncludeDiscontinue_Text", "value": "Include completed / discontinued items" }, { "key": "chkIncludeDiscontinue_ToolTip", "value": "Select to include completed / discontinued  items" }, { "key": "cmdFluidBalance_Text", "value": "Fluid balance" }, { "key": "cmdFluidBalance_ToolTip", "value": "Click to launch fluid balance" }, { "key": "cmdNextDay_Text", "value": "> Day" }, { "key": "cmdNextDay_Tooltip", "value": "Select to move overview into the future by one day" }, { "key": "cmdNextWeek_Text", "value": "> Week" }, { "key": "cmdNextWeek_Tooltip", "value": "Select to move overview into the future by one week" }, { "key": "cmdPrevDay_Text", "value": "< Day" }, { "key": "cmdPrevDay_Tooltip", "value": "Select to move overview into the past by one day" }, { "key": "cmdPrevWeek_Text", "value": "< Week" }, { "key": "cmdPrevWeek_Tooltip", "value": "Select to move overview into the past by one week" }, { "key": "cmdTechValidate_Text", "value": "Technically validate" }, { "key": "cmdTechValidate_Tooltip", "value": "Technically validate" }, { "key": "cmdToday_Text", "value": "Go to today" }, { "key": "cmdToday_Tooltip", "value": "Select to move overview into the current day" }, { "key": "lblAdmin_Text", "value": "Administer normally" }, { "key": "lblInfAdmin_Text", "value": "Administer as an infusion" }, { "key": "lblMixedMultiRouteAlert_Text", "value": "The selected item has been prescribed with multiple routes of administration. Please choose one of the options for administration." }, { "key": "lblSortFilter_Text", "value": "Filter by options" }, { "key": "lblSortFilter_Tooltip", "value": "Select to launch Filter options screen" }, { "key": "RecordAdmin_Msg", "value": "The slot selected for {0} is outside the administration time allowed. Do you wish to continue?" }, { "key": "cmdWristbandScan_text", "value": "Scan wristband" }, { "key": "cmdWristbandScan_tooltip", "value": "Scan wristband" }];
class ResourceManager {
    static GetString(key: string, resourceCulture: any): string {
        let r = Data.find((e) => e.key == key);
        return r != undefined ? r.value : "";
    }
}


export class MedsAdminChartOverview {
    private static resourceCulture = "";
    constructor() {

    }
    public static get CanManageMedAdministration(): string {
        return ResourceManager.GetString("CanManageMedAdministration", MedsAdminChartOverview.resourceCulture);
    }
    public static get ChartDrugItemColumnHeader(): string {
        return ResourceManager.GetString("ChartDrugItemColumnHeader", MedsAdminChartOverview.resourceCulture);
    }
    public static get chkIncludeDiscontinue_Text(): string {
        return ResourceManager.GetString("chkIncludeDiscontinue_Text", MedsAdminChartOverview.resourceCulture);
    }
    public static get chkIncludeDiscontinue_ToolTip(): string {
        return ResourceManager.GetString("chkIncludeDiscontinue_ToolTip", MedsAdminChartOverview.resourceCulture);
    }
    public static get cmdFluidBalance_Text(): string {
        return ResourceManager.GetString("cmdFluidBalance_Text", MedsAdminChartOverview.resourceCulture);
    }
    public static get cmdFluidBalance_ToolTip(): string {
        return ResourceManager.GetString("cmdFluidBalance_ToolTip", MedsAdminChartOverview.resourceCulture);
    }
    public static get cmdNextDay_Text(): string {
        return ResourceManager.GetString("cmdNextDay_Text", MedsAdminChartOverview.resourceCulture);
    }
    public static get cmdNextDay_Tooltip(): string {
        return ResourceManager.GetString("cmdNextDay_Tooltip", MedsAdminChartOverview.resourceCulture);
    }
    public static get cmdNextWeek_Text(): string {
        return ResourceManager.GetString("cmdNextWeek_Text", MedsAdminChartOverview.resourceCulture);
    }
    public static get cmdNextWeek_Tooltip(): string {
        return ResourceManager.GetString("cmdNextWeek_Tooltip", MedsAdminChartOverview.resourceCulture);
    }
    public static get cmdPrevDay_Text(): string {
        return ResourceManager.GetString("cmdPrevDay_Text", MedsAdminChartOverview.resourceCulture);
    }
    public static get cmdPrevDay_Tooltip(): string {
        return ResourceManager.GetString("cmdPrevDay_Tooltip", MedsAdminChartOverview.resourceCulture);
    }
    public static get cmdPrevWeek_Text(): string {
        return ResourceManager.GetString("cmdPrevWeek_Text", MedsAdminChartOverview.resourceCulture);
    }
    public static get cmdPrevWeek_Tooltip(): string {
        return ResourceManager.GetString("cmdPrevWeek_Tooltip", MedsAdminChartOverview.resourceCulture);
    }
    public static get cmdTechValidate_Text(): string {
        return ResourceManager.GetString("cmdTechValidate_Text", MedsAdminChartOverview.resourceCulture);
    }
    public static get cmdTechValidate_Tooltip(): string {
        return ResourceManager.GetString("cmdTechValidate_Tooltip", MedsAdminChartOverview.resourceCulture);
    }
    public static get cmdToday_Text(): string {
        return ResourceManager.GetString("cmdToday_Text", MedsAdminChartOverview.resourceCulture);
    }
    public static get cmdToday_Tooltip(): string {
        return ResourceManager.GetString("cmdToday_Tooltip", MedsAdminChartOverview.resourceCulture);
    }
    public static get cmdWristbandScan_text(): string {
        return ResourceManager.GetString("cmdWristbandScan_text", MedsAdminChartOverview.resourceCulture);
    }
    public static get cmdWristbandScan_tooltip(): string {
        return ResourceManager.GetString("cmdWristbandScan_tooltip", MedsAdminChartOverview.resourceCulture);
    }
    public static get lblAdmin_Text(): string {
        return ResourceManager.GetString("lblAdmin_Text", MedsAdminChartOverview.resourceCulture);
    }
    public static get lblInfAdmin_Text(): string {
        return ResourceManager.GetString("lblInfAdmin_Text", MedsAdminChartOverview.resourceCulture);
    }
    public static get lblMixedMultiRouteAlert_Text(): string {
        return ResourceManager.GetString("lblMixedMultiRouteAlert_Text", MedsAdminChartOverview.resourceCulture);
    }
    public static get lblSortFilter_Text(): string {
        return ResourceManager.GetString("lblSortFilter_Text", MedsAdminChartOverview.resourceCulture);
    }
    public static get lblSortFilter_Tooltip(): string {
        return ResourceManager.GetString("lblSortFilter_Tooltip", MedsAdminChartOverview.resourceCulture);
    }
    public static get RecordAdmin_Msg(): string {
        return ResourceManager.GetString("RecordAdmin_Msg", MedsAdminChartOverview.resourceCulture);
    }
}