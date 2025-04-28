//const resourceCulture = "";
const Data = [{ "key": "Cancel_Text", "value": "Cancel" }, { "key": "Cancel_ToolTip", "value": "Select to cancel selection of conditional dose" }, { "key": "lblAmendMessage_Text", "value": "Drug that is being recorded has been amended by another user" }, { "key": "OK_Text", "value": "Ok" }, { "key": "OK_ToolTip", "value": "Select to record specified conditional dose value" }, { "key": "lblAmendMsg_Text", "value": "and the amended drug details are as follows:" }, { "key": "lblAmendOkCancel_Text", "value": "Please select “Ok” to submit administration or “Cancel” to change the administration details." }, { "key": "lblAmendOk_Text", "value": "Please select “Ok” to proceed." }, { "key": "Amend_CompletedItem_Warning_Msg", "value": "This item has been completed due to amendment and has been superseded with a newly created item. Check whether the newly created item has a dose scheduled for administration around the same time. If there are any doses scheduled for administration around the same time update the doses that should no longer be administered by marking as NOT GIVEN to ensure it is not inadvertently administered later.\n\nSeek guidance if you are uncertain which doses should no longer be given." }, { "key": "Amend_DiscontinuedItem_Warning_Msg", "value": "The discontinued item selected for administration has a completed prescription due to amendment and had been superseded with this item. Check whether the completed item has a dose scheduled for administration around the same time. If there are any doses scheduled for administration around the same time update the doses that should no longer be administered by marking as NOT GIVEN to ensure it is not inadvertently administered later.\n\nSeek guidance if you are uncertain which doses should no longer be given." }, { "key": "Amend_NewItem_Warning_Msg", "value": "The original item has been completed due to amendment and has been superseded with this item. If there are any doses scheduled for administration around the same time update the doses that should no longer be administered by marking as NOT GIVEN to ensure it is not inadvertently administered later.\n\nSeek guidance if you are uncertain which doses should no longer be given." }];
class ResourceManager {
    static GetString(key: string, resourceCulture: any): string {
        let r = Data.find((e) => e.key == key);
        return r != undefined ? r.value : "";
    }
}


export class MedAmendMessage {
    private static resourceCulture = "";
    constructor() {

    }
    public static get Amend_CompletedItem_Warning_Msg(): string {
        return ResourceManager.GetString("Amend_CompletedItem_Warning_Msg", MedAmendMessage.resourceCulture);
    }
    public static get Amend_DiscontinuedItem_Warning_Msg(): string {
        return ResourceManager.GetString("Amend_DiscontinuedItem_Warning_Msg", MedAmendMessage.resourceCulture);
    }
    public static get Amend_NewItem_Warning_Msg(): string {
        return ResourceManager.GetString("Amend_NewItem_Warning_Msg", MedAmendMessage.resourceCulture);
    }
    public static get Cancel_Text(): string {
        return ResourceManager.GetString("Cancel_Text", MedAmendMessage.resourceCulture);
    }
    public static get Cancel_ToolTip(): string {
        return ResourceManager.GetString("Cancel_ToolTip", MedAmendMessage.resourceCulture);
    }
    public static get lblAmendMessage_Text(): string {
        return ResourceManager.GetString("lblAmendMessage_Text", MedAmendMessage.resourceCulture);
    }
    public static get lblAmendMsg_Text(): string {
        return ResourceManager.GetString("lblAmendMsg_Text", MedAmendMessage.resourceCulture);
    }
    public static get lblAmendOk_Text(): string {
        return ResourceManager.GetString("lblAmendOk_Text", MedAmendMessage.resourceCulture);
    }
    public static get lblAmendOkCancel_Text(): string {
        return ResourceManager.GetString("lblAmendOkCancel_Text", MedAmendMessage.resourceCulture);
    }
    public static get OK_Text(): string {
        return ResourceManager.GetString("OK_Text", MedAmendMessage.resourceCulture);
    }
    public static get OK_ToolTip(): string {
        return ResourceManager.GetString("OK_ToolTip", MedAmendMessage.resourceCulture);
    }
}