    //const resourceCulture = "";
const Data = [{ "key": "cmdCancel_Text", "value": "Cancel" }, { "key": "cmdCancel_Tooltip", "value": "Select to cancel record PGD administration" }, { "key": "cmdOK_Text", "value": "Ok" }, { "key": "cmdOK_Tooltip", "value": "Select to record PGD administration" }, { "key": "Date_Time_given_Tolltip", "value": "Select date and time PGD item is administered" }, { "key": "Expiry_date_Tolltip", "value": "Select expiry date" }, { "key": "sfsAdministeredby_Tooltip", "value": "Search for care provider who administered PGD" }, { "key": "txtBatchno_text", "value": "Enter batch number" }, { "key": "txtComments_Tooltip", "value": "Enter additional comments" }, { "key": "PGD_List_ServicePoint", "value": "Select to view items in PGD list of type service point" }, { "key": "PGD_List_Disable", "value": "Awaiting authorisation item" }, { "key": "PGD_List_ServicePoint_Selection", "value": "Select to record PGD administration of selected prescription item" }, { "key": "ErrMsg_CurrentDateSelect", "value": "User resticted to select current date and current date -1" }, { "key": "ErrMsg_AdministeredBy", "value": "Enter administered by, this field is mandatory." }, { "key": "ErrMsg_EnterDose", "value": "Please Select PGD List." }, { "key": "ErrMsg_EnterRoute", "value": "Enter Route - this field is mandatory." }, { "key": "ErrMsg_EnterGivenDate", "value": "Enter DateTime/Time given, this field is mandatory." }, { "key": "ErrMsg_EnterGivenTime", "value": "Enter Given Time - this field is mandatory." }, { "key": "txtTitleExpansions_Text", "value": "Record patient group directive administration" }, { "key": "txtTitle_Text", "value": "Record PGD" }, { "key": "PGD_List_Role", "value": "Select to view items in PGD list of type role" }, { "key": "CumulativeIconErrMsg1", "value": "A total of {0} administrations of prescriptions containing paracetamol have been completed within the last 24 hrs." }, { "key": "CumulativeIconErrMsg2", "value": "Please check that patient does not exceed the maximum dose of Paracetamol of  4g in 24 hours or 2g in 24 hrs if less than 50kg. Do you wish to continue?" }, { "key": "chkYesConflicts_Tooltip", "value": "Select to indicate that record PGD will continue as administration has already been done." }, { "key": "cmdCancelConflicts_Tooltip", "value": "Select to cancel record PGD administration" }, { "key": "cmdOKConflicts_Tooltip", "value": "Select to continue with record PGD administration in the presence of conflicts" }, { "key": "CancelledEncounter1_Msg", "value": "This encounter is cancelled and medication details/ changes have not been saved." }, { "key": "CancelledEncounter2_Msg", "value": "Medication details will need to be re-entered against an appropriate encounter." }, { "key": "_123451_Msg", "value": "The prescription for this patient cannot be submitted because the patient has been discharged, please click OK and the prescribing window will close and no prescriptions will be processed for this patient.." }, { "key": "MaxNoOfAdministration_Warning", "value": "Maximum number of PGD administrations for this patient for this location has been reached" }, { "key": "lblPGDWarning_Msg", "value": "The amount of PGD administrations allowed is configured based on the current location of the patient, if this patient has been transferred please ensure you review any previous PGD administration events in the medication or infusion chart" }, { "key": "PGDUsed_Text", "value": "PGD’s used" }, { "key": "PGDUsed_Tooltip", "value": "PGD’s administered" }, { "key": "AllAckReqd_Tooltip", "value": "There are one or more mandatory fields that are blank. Please complete the mandatory Information to proceed further" }];
class ResourceManager {
    static GetString(key: string, resourceCulture: any): string {
        let r = Data.find((e) => e.key == key);
        return r != undefined ? r.value : "";
    }
}


export class RecordPGD {
    private static resourceCulture = "";
    constructor() {

    }
    GetResourceString(key: string): string {
        let r = Data.find((e) => e.key == key);
        return r != undefined ? r.value : "";
    }
    public static get _123451_Msg(): string {
        return ResourceManager.GetString("_123451_Msg", RecordPGD.resourceCulture);
    }
    public static get AllAckReqd_Tooltip(): string {
        return ResourceManager.GetString("AllAckReqd_Tooltip", RecordPGD.resourceCulture);
    }
    public static get CancelledEncounter1_Msg(): string {
        return ResourceManager.GetString("CancelledEncounter1_Msg", RecordPGD.resourceCulture);
    }
    public static get CancelledEncounter2_Msg(): string {
        return ResourceManager.GetString("CancelledEncounter2_Msg", RecordPGD.resourceCulture);
    }
    public static get chkYesConflicts_Tooltip(): string {
        return ResourceManager.GetString("chkYesConflicts_Tooltip", RecordPGD.resourceCulture);
    }
    public static get cmdCancel_Text(): string {
        return ResourceManager.GetString("cmdCancel_Text", RecordPGD.resourceCulture);
    }
    public static get cmdCancel_Tooltip(): string {
        return ResourceManager.GetString("cmdCancel_Tooltip", RecordPGD.resourceCulture);
    }
    public static get cmdCancelConflicts_Tooltip(): string {
        return ResourceManager.GetString("cmdCancelConflicts_Tooltip", RecordPGD.resourceCulture);
    }
    public static get cmdOK_Text(): string {
        return ResourceManager.GetString("cmdOK_Text", RecordPGD.resourceCulture);
    }
    public static get cmdOK_Tooltip(): string {
        return ResourceManager.GetString("cmdOK_Tooltip", RecordPGD.resourceCulture);
    }
    public static get cmdOKConflicts_Tooltip(): string {
        return ResourceManager.GetString("cmdOKConflicts_Tooltip", RecordPGD.resourceCulture);
    }
    public static get CumulativeIconErrMsg1(): string {
        return ResourceManager.GetString("CumulativeIconErrMsg1", RecordPGD.resourceCulture);
    }
    public static get CumulativeIconErrMsg2(): string {
        return ResourceManager.GetString("CumulativeIconErrMsg2", RecordPGD.resourceCulture);
    }
    public static get Date_Time_given_Tolltip(): string {
        return ResourceManager.GetString("Date_Time_given_Tolltip", RecordPGD.resourceCulture);
    }
    public static get ErrMsg_AdministeredBy(): string {
        return ResourceManager.GetString("ErrMsg_AdministeredBy", RecordPGD.resourceCulture);
    }
    public static get ErrMsg_CurrentDateSelect(): string {
        return ResourceManager.GetString("ErrMsg_CurrentDateSelect", RecordPGD.resourceCulture);
    }
    public static get ErrMsg_EnterDose(): string {
        return ResourceManager.GetString("ErrMsg_EnterDose", RecordPGD.resourceCulture);
    }
    public static get ErrMsg_EnterGivenDate(): string {
        return ResourceManager.GetString("ErrMsg_EnterGivenDate", RecordPGD.resourceCulture);
    }
    public static get ErrMsg_EnterGivenTime(): string {
        return ResourceManager.GetString("ErrMsg_EnterGivenTime", RecordPGD.resourceCulture);
    }
    public static get ErrMsg_EnterRoute(): string {
        return ResourceManager.GetString("ErrMsg_EnterRoute", RecordPGD.resourceCulture);
    }
    public static get Expiry_date_Tolltip(): string {
        return ResourceManager.GetString("Expiry_date_Tolltip", RecordPGD.resourceCulture);
    }
    public static get MaxNoOfAdministration_Warning(): string {
        return ResourceManager.GetString("MaxNoOfAdministration_Warning", RecordPGD.resourceCulture);
    }
    public static get lblPGDWarning_Msg(): string {
        return ResourceManager.GetString("lblPGDWarning_Msg", RecordPGD.resourceCulture);
    }
    public static get PGD_List_Disable(): string {
        return ResourceManager.GetString("PGD_List_Disable", RecordPGD.resourceCulture);
    }
    public static get PGD_List_Role(): string {
        return ResourceManager.GetString("PGD_List_Role", RecordPGD.resourceCulture);
    }
    public static get PGD_List_ServicePoint(): string {
        return ResourceManager.GetString("PGD_List_ServicePoint", RecordPGD.resourceCulture);
    }
    public static get PGD_List_ServicePoint_Selection(): string {
        return ResourceManager.GetString("PGD_List_ServicePoint_Selection", RecordPGD.resourceCulture);
    }
    public static get PGDUsed_Text(): string {
        return ResourceManager.GetString("PGDUsed_Text", RecordPGD.resourceCulture);
    }
    public static get PGDUsed_Tooltip(): string {
        return ResourceManager.GetString("PGDUsed_Tooltip", RecordPGD.resourceCulture);
    }
    public static get sfsAdministeredby_Tooltip(): string {
        return ResourceManager.GetString("sfsAdministeredby_Tooltip", RecordPGD.resourceCulture);
    }
    public static get txtBatchno_text(): string {
        return ResourceManager.GetString("txtBatchno_text", RecordPGD.resourceCulture);
    }
    public static get txtComments_Tooltip(): string {
        return ResourceManager.GetString("txtComments_Tooltip", RecordPGD.resourceCulture);
    }
    public static get txtTitle_Text(): string {
        return ResourceManager.GetString("txtTitle_Text", RecordPGD.resourceCulture);
    }
    public static get txtTitleExpansions_Text(): string {
        return ResourceManager.GetString("txtTitleExpansions_Text", RecordPGD.resourceCulture);
    }
}