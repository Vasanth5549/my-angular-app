//const resourceCulture = "";
const Data = [{ "key": "cboDuration_ToolTip", "value": "Choose a UOM" }, { "key": "chkUntil_Text", "value": "Until" }, { "key": "chkUntil_ToolTip", "value": "Define slots until duration" }, { "key": "cmdCancel_Text", "value": "Cancel" }, { "key": "cmdCancel_ToolTip", "value": "Select to cancel the activity" }, { "key": "cmdOk_Text", "value": "Ok" }, { "key": "cmdOk_ToolTip", "value": "Select to omit the selected slots" }, { "key": "ErrMsg_Duration", "value": "The duration value should be greater than zero." }, { "key": "ErrMsg_EndDate", "value": "End date time cannot be before current date time or after prescription end date/time." }, { "key": "ErrMsg_OmitReasons", "value": "Enter omit reason, this field is mandatory." }, { "key": "lblBorder_Text", "value": "Slot(s) selected for omission" }, { "key": "tvwOmitSlots_ToolTip", "value": "Selected slots for omission" }, { "key": "lblDuration_Text", "value": "Duration" }, { "key": "lblEndDate_Text", "value": "End date" }, { "key": "lblOmitReason_Text", "value": "Omit reason" }, { "key": "lblUOM_Text", "value": "UOM" }, { "key": "txtOmitReason_ToolTip", "value": "Provide a reason for omitting" }, { "key": "udDuration_ToolTip", "value": "Provide duration for omitting doses" }, { "key": "lblCaption_Text", "value": "Omit slots" }, { "key": "ErrMsg_DurationDate", "value": "Please add duration or an end date for omission of slots" }, { "key": "lblOmitFrom_Text", "value": "Omit from" }, { "key": "rdbIndefinite_tooltip", "value": "Tick to omit all medication doses until further notice" }, { "key": "rdbSelectedSlot_tooltip", "value": "Tick to omit selected slots" }, { "key": "rdbUntil_tooltip", "value": "Tick to specify a duration until which doses have to be omitted" }, { "key": "cboReviewAfter_ToolTip", "value": "Choose a UOM" }, { "key": "lblReviewAfterUOM_Text", "value": "UOM" }, { "key": "lblReviewAfter_Text", "value": "Review after" }, { "key": "lblReviewDate_Text", "value": "Review date" }, { "key": "udReviewAfter_ToolTip", "value": "Provide a review period" }, { "key": "lblReviewComments_Text", "value": "Review comments" }, { "key": "txtReviewComments_ToolTip", "value": "Add comments that can be used to aid the reviewer when the next review is being undertaken" }, { "key": "ErrMsg_OmitFrom", "value": "Omit from date and time cannot be before current date and time or after prescription end date and time" }, { "key": "ErrMsg_OmitFromEmpty", "value": "Please provide omit from date and time" }, { "key": "ErrMsg_DurationUOM", "value": "Please choose a UOM for duration" }, { "key": "ErrMsg_IndefiniteReviewPeriod", "value": "Please provide a review period" }, { "key": "ErrMsg_OmitFromPres", "value": "Omit from date and time cannot be before prescription start date and time or after prescription end date and time" }, { "key": "ErrMsg_ReviewPeriodEmpty", "value": "Review duration cannot be after the end date of the prescription." }, { "key": "rdbIndefinite_text", "value": "Indefinite" }, { "key": "rdbSelectedSlot_text", "value": "Selected slot" }, { "key": "rdbUntil_text", "value": "Until" }, { "key": "ErrMsg_EndDateLTFromDate", "value": "End date time cannot be less than omit from date time" }];
class ResourceManager {
    static GetString(key: string, resourceCulture: any): string {
        let r = Data.find((e) => e.key == key);
        return r != undefined ? r.value : "";
    }
}


export class MedsAdminOmitSlots {
    private static resourceCulture = "";
    constructor() {

    }
    GetResourceString(key: string): string {
        let r = Data.find((e) => e.key == key);
        return r != undefined ? r.value : "";
    }
    public static get cboDuration_ToolTip(): string {
        return ResourceManager.GetString("cboDuration_ToolTip", MedsAdminOmitSlots.resourceCulture);
    }
    public static get cboReviewAfter_ToolTip(): string {
        return ResourceManager.GetString("cboReviewAfter_ToolTip", MedsAdminOmitSlots.resourceCulture);
    }
    public static get chkUntil_Text(): string {
        return ResourceManager.GetString("chkUntil_Text", MedsAdminOmitSlots.resourceCulture);
    }
    public static get chkUntil_ToolTip(): string {
        return ResourceManager.GetString("chkUntil_ToolTip", MedsAdminOmitSlots.resourceCulture);
    }
    public static get cmdCancel_Text(): string {
        return ResourceManager.GetString("cmdCancel_Text", MedsAdminOmitSlots.resourceCulture);
    }
    public static get cmdCancel_ToolTip(): string {
        return ResourceManager.GetString("cmdCancel_ToolTip", MedsAdminOmitSlots.resourceCulture);
    }
    public static get cmdOk_Text(): string {
        return ResourceManager.GetString("cmdOk_Text", MedsAdminOmitSlots.resourceCulture);
    }
    public static get cmdOk_ToolTip(): string {
        return ResourceManager.GetString("cmdOk_ToolTip", MedsAdminOmitSlots.resourceCulture);
    }
    public static get ErrMsg_Duration(): string {
        return ResourceManager.GetString("ErrMsg_Duration", MedsAdminOmitSlots.resourceCulture);
    }
    public static get ErrMsg_DurationDate(): string {
        return ResourceManager.GetString("ErrMsg_DurationDate", MedsAdminOmitSlots.resourceCulture);
    }
    public static get ErrMsg_DurationUOM(): string {
        return ResourceManager.GetString("ErrMsg_DurationUOM", MedsAdminOmitSlots.resourceCulture);
    }
    public static get ErrMsg_EndDate(): string {
        return ResourceManager.GetString("ErrMsg_EndDate", MedsAdminOmitSlots.resourceCulture);
    }
    public static get ErrMsg_EndDateLTFromDate(): string {
        return ResourceManager.GetString("ErrMsg_EndDateLTFromDate", MedsAdminOmitSlots.resourceCulture);
    }
    public static get ErrMsg_IndefiniteReviewPeriod(): string {
        return ResourceManager.GetString("ErrMsg_IndefiniteReviewPeriod", MedsAdminOmitSlots.resourceCulture);
    }
    public static get ErrMsg_OmitFrom(): string {
        return ResourceManager.GetString("ErrMsg_OmitFrom", MedsAdminOmitSlots.resourceCulture);
    }
    public static get ErrMsg_OmitFromEmpty(): string {
        return ResourceManager.GetString("ErrMsg_OmitFromEmpty", MedsAdminOmitSlots.resourceCulture);
    }
    public static get ErrMsg_OmitFromPres(): string {
        return ResourceManager.GetString("ErrMsg_OmitFromPres", MedsAdminOmitSlots.resourceCulture);
    }
    public static get ErrMsg_OmitReasons(): string {
        return ResourceManager.GetString("ErrMsg_OmitReasons", MedsAdminOmitSlots.resourceCulture);
    }
    public static get ErrMsg_ReviewPeriodEmpty(): string {
        return ResourceManager.GetString("ErrMsg_ReviewPeriodEmpty", MedsAdminOmitSlots.resourceCulture);
    }
    public static get lblBorder_Text(): string {
        return ResourceManager.GetString("lblBorder_Text", MedsAdminOmitSlots.resourceCulture);
    }
    public static get lblCaption_Text(): string {
        return ResourceManager.GetString("lblCaption_Text", MedsAdminOmitSlots.resourceCulture);
    }
    public static get lblDuration_Text(): string {
        return ResourceManager.GetString("lblDuration_Text", MedsAdminOmitSlots.resourceCulture);
    }
    public static get lblEndDate_Text(): string {
        return ResourceManager.GetString("lblEndDate_Text", MedsAdminOmitSlots.resourceCulture);
    }
    public static get lblOmitFrom_Text(): string {
        return ResourceManager.GetString("lblOmitFrom_Text", MedsAdminOmitSlots.resourceCulture);
    }
    public static get lblOmitReason_Text(): string {
        return ResourceManager.GetString("lblOmitReason_Text", MedsAdminOmitSlots.resourceCulture);
    }
    public static get lblReviewAfter_Text(): string {
        return ResourceManager.GetString("lblReviewAfter_Text", MedsAdminOmitSlots.resourceCulture);
    }
    public static get lblReviewAfterUOM_Text(): string {
        return ResourceManager.GetString("lblReviewAfterUOM_Text", MedsAdminOmitSlots.resourceCulture);
    }
    public static get lblReviewComments_Text(): string {
        return ResourceManager.GetString("lblReviewComments_Text", MedsAdminOmitSlots.resourceCulture);
    }
    public static get lblReviewDate_Text(): string {
        return ResourceManager.GetString("lblReviewDate_Text", MedsAdminOmitSlots.resourceCulture);
    }
    public static get lblUOM_Text(): string {
        return ResourceManager.GetString("lblUOM_Text", MedsAdminOmitSlots.resourceCulture);
    }
    public static get rdbIndefinite_text(): string {
        return ResourceManager.GetString("rdbIndefinite_text", MedsAdminOmitSlots.resourceCulture);
    }
    public static get rdbIndefinite_tooltip(): string {
        return ResourceManager.GetString("rdbIndefinite_tooltip", MedsAdminOmitSlots.resourceCulture);
    }
    public static get rdbSelectedSlot_text(): string {
        return ResourceManager.GetString("rdbSelectedSlot_text", MedsAdminOmitSlots.resourceCulture);
    }
    public static get rdbSelectedSlot_tooltip(): string {
        return ResourceManager.GetString("rdbSelectedSlot_tooltip", MedsAdminOmitSlots.resourceCulture);
    }
    public static get rdbUntil_text(): string {
        return ResourceManager.GetString("rdbUntil_text", MedsAdminOmitSlots.resourceCulture);
    }
    public static get rdbUntil_tooltip(): string {
        return ResourceManager.GetString("rdbUntil_tooltip", MedsAdminOmitSlots.resourceCulture);
    }
    public static get tvwOmitSlots_ToolTip(): string {
        return ResourceManager.GetString("tvwOmitSlots_ToolTip", MedsAdminOmitSlots.resourceCulture);
    }
    public static get txtOmitReason_ToolTip(): string {
        return ResourceManager.GetString("txtOmitReason_ToolTip", MedsAdminOmitSlots.resourceCulture);
    }
    public static get txtReviewComments_ToolTip(): string {
        return ResourceManager.GetString("txtReviewComments_ToolTip", MedsAdminOmitSlots.resourceCulture);
    }
    public static get udDuration_ToolTip(): string {
        return ResourceManager.GetString("udDuration_ToolTip", MedsAdminOmitSlots.resourceCulture);
    }
    public static get udReviewAfter_ToolTip(): string {
        return ResourceManager.GetString("udReviewAfter_ToolTip", MedsAdminOmitSlots.resourceCulture);
    }
}