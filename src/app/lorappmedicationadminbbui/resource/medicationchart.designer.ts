//const resourceCulture = "";
const Data = [{ "key": "DrugDetail_IvMsg", "value": "Patient on IV for {0} hours or more" }, { "key": "IvMsgPopup", "value": "Patient has been receiving {0}  by intravenous route for more than {1} hours.\n \nPlease ask the prescriber to review if the intravenous route is still appropriate." }, { "key": "SectionAllergy_Tooltip", "value": "Allergies/ADRs" }, { "key": "SectionConsideration_Tooltip", "value": "Considerations" }, { "key": "SectionProblems_Tooltip", "value": "Problems" }, { "key": "PatientHeight_Tooltip", "value": "Patient Height is:" }, { "key": "Sectionproblemielse_Tooltip", "value": "Patient Problems" }, { "key": "sectionallergyelse2_Tooltip", "value": "No records exist" }, { "key": "sectionallergyif_Tooltip", "value": "More records exist" }, { "key": "More_Allergies_Exist", "value": ".....more allergies/ADRs exist" }, { "key": "More_Problem_Exist", "value": ".....more problems exist" }, { "key": "Sectionallergyelse1_Tooltip", "value": "Patient Allergies" }, { "key": "sectionallergyielse_Tooltip", "value": "Patient Allergy" }, { "key": "ReviewItemsSufmsg", "value": "Please review" }, { "key": "InfusionAlertsNotReviewedMsg", "value": "There are pending infusion prescriptions for administration/review." }, { "key": "ReviewItemsMedChartSufmsg", "value": "Please inform a prescriber" }, { "key": "ReviewItemsMedChartPrefmsg", "value": "Prescription item(s) are due to be reviewed today." }, { "key": "InfoiconAcknowledged_Tooltip", "value": "Clinically verified item\\r\\nVerified by: {0}\\r\\nVerified at: {1}" }, { "key": "InfoiconAcknowledgedComment_Tooltip", "value": "\\r\\nComments: {0}" }, { "key": "LockingMessagePartOne", "value": "This record is currently in use by" }, { "key": "LockingMessagePartTwo", "value": ". Please re-try this activity later." }, { "key": "Recordtimemandatory", "value": "Are you sure you want to have the administration time as 00:00?" }, { "key": "PatientWeight_Tooltip", "value": "Patient Weight is:" }, { "key": "PatientBSA_Tooltip", "value": "Patient BSA is:" }, { "key": "UpdateReview_Tooltip", "value": "Click to update the review" }, { "key": "SequentialInfusionCaption", "value": "SEQUENTIAL INFUSIONS" }, { "key": "ExsitingSequenceNo", "value": "SEQUENCE {0}" }, { "key": "HomeLeaveMsg", "value": "The patient is on home leave. Do you wish to record administration of this slot?" }, { "key": "SeqLink_Tooltip", "value": "Item is part of a sequential medications" }, { "key": "AmendedCompletedWarningMsg", "value": "This medication has been amended resulting in a new schedule of administrations. Please review the patient record before proceeding with this action." }];
class ResourceManager {
    static GetString(key: string, resourceCulture: any): string {
        let r = Data.find((e) => e.key == key);
        return r != undefined ? r.value : "";
    }
}


export class MedicationChart {
    private static resourceCulture = "";
    constructor() {

    }
    public static get AmendedCompletedWarningMsg(): string {
        return ResourceManager.GetString("AmendedCompletedWarningMsg", MedicationChart.resourceCulture);
    }
    public static get DrugDetail_IvMsg(): string {
        return ResourceManager.GetString("DrugDetail_IvMsg", MedicationChart.resourceCulture);
    }
    public static get ExsitingSequenceNo(): string {
        return ResourceManager.GetString("ExsitingSequenceNo", MedicationChart.resourceCulture);
    }
    public static get HomeLeaveMsg(): string {
        return ResourceManager.GetString("HomeLeaveMsg", MedicationChart.resourceCulture);
    }
    public static get InfoiconAcknowledged_Tooltip(): string {
        return ResourceManager.GetString("InfoiconAcknowledged_Tooltip", MedicationChart.resourceCulture);
    }
    public static get InfoiconAcknowledgedComment_Tooltip(): string {
        return ResourceManager.GetString("InfoiconAcknowledgedComment_Tooltip", MedicationChart.resourceCulture);
    }
    public static get InfusionAlertsNotReviewedMsg(): string {
        return ResourceManager.GetString("InfusionAlertsNotReviewedMsg", MedicationChart.resourceCulture);
    }
    public static get IvMsgPopup(): string {
        return ResourceManager.GetString("IvMsgPopup", MedicationChart.resourceCulture);
    }
    public static get LockingMessagePartOne(): string {
        return ResourceManager.GetString("LockingMessagePartOne", MedicationChart.resourceCulture);
    }
    public static get LockingMessagePartTwo(): string {
        return ResourceManager.GetString("LockingMessagePartTwo", MedicationChart.resourceCulture);
    }
    public static get More_Allergies_Exist(): string {
        return ResourceManager.GetString("More_Allergies_Exist", MedicationChart.resourceCulture);
    }
    public static get More_Problem_Exist(): string {
        return ResourceManager.GetString("More_Problem_Exist", MedicationChart.resourceCulture);
    }
    public static get PatientBSA_Tooltip(): string {
        return ResourceManager.GetString("PatientBSA_Tooltip", MedicationChart.resourceCulture);
    }
    public static get PatientHeight_Tooltip(): string {
        return ResourceManager.GetString("PatientHeight_Tooltip", MedicationChart.resourceCulture);
    }
    public static get PatientWeight_Tooltip(): string {
        return ResourceManager.GetString("PatientWeight_Tooltip", MedicationChart.resourceCulture);
    }
    public static get Recordtimemandatory(): string {
        return ResourceManager.GetString("Recordtimemandatory", MedicationChart.resourceCulture);
    }
    public static get ReviewItemsMedChartPrefmsg(): string {
        return ResourceManager.GetString("ReviewItemsMedChartPrefmsg", MedicationChart.resourceCulture);
    }
    public static get ReviewItemsMedChartSufmsg(): string {
        return ResourceManager.GetString("ReviewItemsMedChartSufmsg", MedicationChart.resourceCulture);
    }
    public static get ReviewItemsSufmsg(): string {
        return ResourceManager.GetString("ReviewItemsSufmsg", MedicationChart.resourceCulture);
    }
    public static get SectionAllergy_Tooltip(): string {
        return ResourceManager.GetString("SectionAllergy_Tooltip", MedicationChart.resourceCulture);
    }
    public static get Sectionallergyelse1_Tooltip(): string {
        return ResourceManager.GetString("Sectionallergyelse1_Tooltip", MedicationChart.resourceCulture);
    }
    public static get sectionallergyelse2_Tooltip(): string {
        return ResourceManager.GetString("sectionallergyelse2_Tooltip", MedicationChart.resourceCulture);
    }
    public static get sectionallergyielse_Tooltip(): string {
        return ResourceManager.GetString("sectionallergyielse_Tooltip", MedicationChart.resourceCulture);
    }
    public static get sectionallergyif_Tooltip(): string {
        return ResourceManager.GetString("sectionallergyif_Tooltip", MedicationChart.resourceCulture);
    }
    public static get SectionConsideration_Tooltip(): string {
        return ResourceManager.GetString("SectionConsideration_Tooltip", MedicationChart.resourceCulture);
    }
    public static get Sectionproblemielse_Tooltip(): string {
        return ResourceManager.GetString("Sectionproblemielse_Tooltip", MedicationChart.resourceCulture);
    }
    public static get SectionProblems_Tooltip(): string {
        return ResourceManager.GetString("SectionProblems_Tooltip", MedicationChart.resourceCulture);
    }
    public static get SeqLink_Tooltip(): string {
        return ResourceManager.GetString("SeqLink_Tooltip", MedicationChart.resourceCulture);
    }
    public static get SequentialInfusionCaption(): string {
        return ResourceManager.GetString("SequentialInfusionCaption", MedicationChart.resourceCulture);
    }
    public static get UpdateReview_Tooltip(): string {
        return ResourceManager.GetString("UpdateReview_Tooltip", MedicationChart.resourceCulture);
    }
}