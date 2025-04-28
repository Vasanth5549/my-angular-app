//const resourceCulture = "";
const Data = [{ "key": "chartLegend_Text", "value": "Chart details" }, { "key": "icboPeriod_Tooltip", "value": "Select the period filter to apply to the chart" }, { "key": "icmdGO_Tooltip", "value": "Select to load the observation/results chart with the applied period filter" }, { "key": "idtpFromDate_Tooltip", "value": "Select the from date value to apply to the chart" }, { "key": "idtpToDate_Tooltip", "value": "Select the to date value to apply to the chart" }, { "key": "iMenuAction_Text", "value": "Actions" }, { "key": "iMenuAction_Tooltip", "value": "Select to choose from a list of actions" }, { "key": "lblPeriodFrom_Text", "value": "From" }, { "key": "lblPeriodTo_Text", "value": "To" }, { "key": "lblPeriod_Text", "value": "Period" }, { "key": "CommentsResultTooltip", "value": "Result comments are available, please click here to view the result details" }, { "key": "IndicatorTooltip", "value": "Indicator -" }, { "key": "MediaResultTooltip", "value": "Click here to view the attachment" }, { "key": "ObservationTooltip", "value": "Click here to view the observation" }, { "key": "TextResultTooltip", "value": "Click here to view the result" }, { "key": "Canceldisplay_Tooltip", "value": "Check to display cancelled values" }, { "key": "GridLines_Tooltip", "value": "Select to view the gridlines" }, { "key": "ReferenceRange_Tooltip", "value": "Select to view the reference range" }, { "key": "ShowDataPoints_Tooltip", "value": "Select to view the  data labels" }, { "key": "CONCATEITEMANDFLUID", "value": "in" }, { "key": "CONCATETOOLTIP", "value": " " }, { "key": "DOSE_ADMINISTERED", "value": "Dose administered" }, { "key": "INFUSION_FLOWRATE", "value": "Rate" }, { "key": "MULTICOMPONENTITEM", "value": "Multiple component item" }];
class ResourceManager {
    static GetString(key: string, resourceCulture: any): string {
        let r = Data.find((e) => e.key == key);
        return r != undefined ? r.value : "";
    }
}


export class ObservationChartResource {
    private static resourceCulture = "";
    constructor() {

    }
    GetResourceString(key: string): string {
        let r = Data.find((e) => e.key == key);
        return r != undefined ? r.value : "";
    }
    public static get Canceldisplay_Tooltip(): string {
        return ResourceManager.GetString("Canceldisplay_Tooltip", ObservationChartResource.resourceCulture);
    }
    public static get chartLegend_Text(): string {
        return ResourceManager.GetString("chartLegend_Text", ObservationChartResource.resourceCulture);
    }
    public static get CommentsResultTooltip(): string {
        return ResourceManager.GetString("CommentsResultTooltip", ObservationChartResource.resourceCulture);
    }
    public static get CONCATEITEMANDFLUID(): string {
        return ResourceManager.GetString("CONCATEITEMANDFLUID", ObservationChartResource.resourceCulture);
    }
    public static get CONCATETOOLTIP(): string {
        return ResourceManager.GetString("CONCATETOOLTIP", ObservationChartResource.resourceCulture);
    }
    public static get DOSE_ADMINISTERED(): string {
        return ResourceManager.GetString("DOSE_ADMINISTERED", ObservationChartResource.resourceCulture);
    }
    public static get GridLines_Tooltip(): string {
        return ResourceManager.GetString("GridLines_Tooltip", ObservationChartResource.resourceCulture);
    }
    public static get icboPeriod_Tooltip(): string {
        return ResourceManager.GetString("icboPeriod_Tooltip", ObservationChartResource.resourceCulture);
    }
    public static get icmdGO_Tooltip(): string {
        return ResourceManager.GetString("icmdGO_Tooltip", ObservationChartResource.resourceCulture);
    }
    public static get idtpFromDate_Tooltip(): string {
        return ResourceManager.GetString("idtpFromDate_Tooltip", ObservationChartResource.resourceCulture);
    }
    public static get idtpToDate_Tooltip(): string {
        return ResourceManager.GetString("idtpToDate_Tooltip", ObservationChartResource.resourceCulture);
    }
    public static get iMenuAction_Text(): string {
        return ResourceManager.GetString("iMenuAction_Text", ObservationChartResource.resourceCulture);
    }
    public static get iMenuAction_Tooltip(): string {
        return ResourceManager.GetString("iMenuAction_Tooltip", ObservationChartResource.resourceCulture);
    }
    public static get IndicatorTooltip(): string {
        return ResourceManager.GetString("IndicatorTooltip", ObservationChartResource.resourceCulture);
    }
    public static get INFUSION_FLOWRATE(): string {
        return ResourceManager.GetString("INFUSION_FLOWRATE", ObservationChartResource.resourceCulture);
    }
    public static get lblPeriod_Text(): string {
        return ResourceManager.GetString("lblPeriod_Text", ObservationChartResource.resourceCulture);
    }
    public static get lblPeriodFrom_Text(): string {
        return ResourceManager.GetString("lblPeriodFrom_Text", ObservationChartResource.resourceCulture);
    }
    public static get lblPeriodTo_Text(): string {
        return ResourceManager.GetString("lblPeriodTo_Text", ObservationChartResource.resourceCulture);
    }
    public static get MediaResultTooltip(): string {
        return ResourceManager.GetString("MediaResultTooltip", ObservationChartResource.resourceCulture);
    }
    public static get MULTICOMPONENTITEM(): string {
        return ResourceManager.GetString("MULTICOMPONENTITEM", ObservationChartResource.resourceCulture);
    }
    public static get ObservationTooltip(): string {
        return ResourceManager.GetString("ObservationTooltip", ObservationChartResource.resourceCulture);
    }
    public static get ReferenceRange_Tooltip(): string {
        return ResourceManager.GetString("ReferenceRange_Tooltip", ObservationChartResource.resourceCulture);
    }
    public static get ShowDataPoints_Tooltip(): string {
        return ResourceManager.GetString("ShowDataPoints_Tooltip", ObservationChartResource.resourceCulture);
    }
    public static get TextResultTooltip(): string {
        return ResourceManager.GetString("TextResultTooltip", ObservationChartResource.resourceCulture);
    }
}