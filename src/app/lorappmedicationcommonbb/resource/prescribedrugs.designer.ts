import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
  

// const resourceCulture = "";
const Data = [{"key":"cmdAddFavourites_Text","value":"Add to favourites"},{"key":"cmdDiscontinueCancel_Text","value":"Discontinue/Cancel"},{"key":"cmdDoseCalculator_Text","value":"Dose calculator"},{"key":"cmdHoldUnhold_Text","value":"Hold/Unhold"},{"key":"cmdLinks_Text","value":"Links"},{"key":"cmdOtherLinks_Text","value":"Other links"},{"key":"cmdReconcile_Text","value":"Reconcile"},{"key":"cmdRemove_Text","value":"Remove"},{"key":"cmdRemove_Tooltip","value":"Click to remove"},{"key":"cmdResults_Text","value":"Results"},{"key":"DischargeMedications_Header","value":"Discharge prescription"},{"key":"HiddenColumn_Header","value":"Hidden"},{"key":"Otherinformation_Header","value":"Other information"},{"key":"PrescriptionItem_Header","value":"Prescription item"},{"key":"StartDTTM_Header","value":"Start date"},{"key":"AdminStartDTTM_Header","value":"Administration start date/time"},{"key":"AdminStatus_Header","value":"Administration status"},{"key":"cmdDoseCalculator_Tooltip","value":"Click to invoke dose calculator"},{"key":"cmdLinks_Tooltip","value":"Click to view drug monograph of the drug"},{"key":"cmdOtherLinks_Tooltip","value":"Click here to view other links of the drug"},{"key":"cmdReconcile_Tooltip","value":"Click to reconcile medication clerking and discharge medications"},{"key":"cmdResults_Tooltip","value":"Results"},{"key":"cmdAddFavourites_Tooltip","value":"Click to add drugs as a favourites"},{"key":"cmdDiscontinueCancel_Tooltip","value":"Discontinue/Cancel"},{"key":"cmdHoldUnhold_Tooltip","value":"Click to hold/unhold drug(s)"},{"key":"cancelicon_Tooltip","value":"Cancelled medication"},{"key":"CC_CARESET_ICO_Tooltip","value":"Click to view care set details"},{"key":"CC_CNTRLDDRUGelse_Tooltip","value":"Controlled drug"},{"key":"CC_CNTRLDDRUGif_Tooltip","value":"Controlled drug - All products"},{"key":"CC_DOSE_ICO_Tooltip","value":"Select to view dosing information"},{"key":"CC_HIGHRISKelse_Tooltip","value":"All products"},{"key":"CC_HIGHRISKif_Tooltip","value":"High risk"},{"key":"CC_NAMEDRUGelse_Tooltip","value":"Named patient"},{"key":"CC_NAMEDRUGif_Tooltip","value":"Named patient - All products"},{"key":"CC_NEWLYelse_Tooltip","value":"Newly marketed"},{"key":"CC_NEWLYif_Tooltip","value":"Newly marketed - All products"},{"key":"CC_UNLICENSEDelse_Tooltip","value":"Unlicensed"},{"key":"CC_UNLICENSEDif_Tooltip","value":"Unlicensed - All products"},{"key":"Checkreadonlycheck_Tooltip","value":"Acknowledged"},{"key":"CheckreadonlyUncheck_Tooltip","value":"Acknowledge"},{"key":"Commenticon_Tooltip","value":"Medication entry created due to an amendment"},{"key":"dicontinueico_Tootlip","value":"Discontinued medication"},{"key":"Holdicon_Tooltip","value":"Medication on Hold"},{"key":"InfoiconAcknowledged_Tooltip","value":"Clinically verified item"},{"key":"ManditoryConflicts_Tooltip","value":"Click to view/acknowledge conflicts for this drug (Mandatory)"},{"key":"Manditoryindicator_Tooltip","value":"Click to view conflicts for this drug"},{"key":"Pendingicon_Tooltip","value":"Awaiting authorisation"},{"key":"SectionAllergy_Tooltip","value":"Allergies/ADRs"},{"key":"SectionConsideration_Tooltip","value":"Considerations"},{"key":"SectionProblems_Tooltip","value":"Problems"},{"key":"sectionallergyif_Tooltip","value":"More records exist"},{"key":"PatientHeight_Tooltip","value":"Patient Height is:"},{"key":"PatientWeight_Tooltip","value":"Patient Weight is:"},{"key":"Sectionallergyelse1_Tooltip","value":"Patient Allergies"},{"key":"sectionallergyelse2_Tooltip","value":"No records exist"},{"key":"sectionallergyielse_Tooltip","value":"Patient Allergy"},{"key":"Sectionproblemielse_Tooltip","value":"Patient Problems"},{"key":"More_Allergies_Exist","value":".....more allergies/ADRs exist"},{"key":"More_Problem_Exist","value":".....more problems exist"},{"key":"CumulativeIcon_Tooltip","value":"Four or more administrations containing paracetamol have been recorded in the last 24 hrs. Check that the cumulative dose of paracetamol will not exceed 4g or 2g (for patients under 50 kg) before administering another dose."},{"key":"MCIAbove5Headr_Tooltip","value":"Select to view multi component item details"},{"key":"CC_HIGHRISKSomePrd_Tooltip","value":"Some products"},{"key":"RequestUrgencyHigh_Tooltip","value":"High urgency"},{"key":"RequestUrgencyLow_Tooltip","value":"Low urgency"},{"key":"RequestUrgencyMedium_Tooltip","value":"Medium urgency"},{"key":"RequestUrgencyNo_Tooltip","value":"Non urgent supply request"},{"key":"lblOutcomeComments_Text","value":"Outcome comments"},{"key":"lblReasonforDiscontinue_Text","value":"Reason for discontinuing"},{"key":"lblReinstate_Text","value":"Reinstate reason"},{"key":"lblReviewAfter_Text","value":"Review after (Period)"},{"key":"lblReviewdatetime_Text","value":"Review due"},{"key":"lblReviewOutcome_Text","value":"Review outcome"},{"key":"lblReviewRequestComments_Text","value":"Review request comments"},{"key":"lblReviewRequestedBy_Text","value":"Review requested by"},{"key":"lblReviewRequestedOn_Text","value":"Review requested on"},{"key":"lblReviewType_Text","value":"Review type"},{"key":"Errmsg_DiscontinueReason","value":"Please select a reason for discontinuing the medication"},{"key":"Errmsg_ReinstateReason","value":"Please enter the reinstate reason"},{"key":"Errmsg_ReviewOutcome","value":"Please choose a review outcome"},{"key":"Errmsg_ReviewPeriod","value":"Please provide a review period"},{"key":"Errmsg_ReviewPeriodUOM","value":"Please choose a UOM for review period"},{"key":"Errmsg_ReviewPeriodValueforDuration","value":"The review after time period cannot be longer than the duration time period"},{"key":"Errmsg_ReviewPeriodValueforInfusionPeriod","value":"The review after time cannot be after the infusion has finished. Please recheck and update"},{"key":"Errmsg_ReviewPeriodValueforStopDTTM","value":"The review after period cannot be same or greater than the stop date time"},{"key":"lblOutcomeComments_ToolTip","value":"Enter review outcome comments"},{"key":"lblReasonforDiscontinue_ToolTip","value":"Select reason for discontinuing the medication"},{"key":"lblReinstate_ToolTip","value":"Enter reinstate reason"},{"key":"lblReviewAfterUOM_ToolTip","value":"Enter review after UOM"},{"key":"lblReviewAfter_ToolTip","value":"Enter review period"},{"key":"lblReviewOutcome_Tooltip","value":"Select review outcome"},{"key":"lblReviewRequestComments_ToolTip","value":"Enter review request comments"},{"key":"LockingWarningMsg","value":"The care activity you are currently accessing has been active for 25 minutes and once 30 minutes has been reached if another user accesses this care activity your work will not be saved. Click finish."},{"key":"InfusionStartTime_Disclaimer","value":"* Estimated start date time based on duration of the preceding item"},{"key":"PGDCompleted","value":"PGD administration completed"},{"key":"PGDGiven","value":"PGD administration given"},{"key":"PGDCancelled","value":"PGD administration cancelled"}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }

    export class prescribedrugs {
        // private static resourceMan: System.Resources.ResourceManager;
        private static resourceCulture = "";
        constructor() {

        }
        public static get AdminStartDTTM_Header(): string {
            return ResourceManager.GetString("AdminStartDTTM_Header", prescribedrugs.resourceCulture);
        }
        public static get AdminStatus_Header(): string {
            return ResourceManager.GetString("AdminStatus_Header", prescribedrugs.resourceCulture);
        }
        public static get cancelicon_Tooltip(): string {
            return ResourceManager.GetString("cancelicon_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get CC_CARESET_ICO_Tooltip(): string {
            return ResourceManager.GetString("CC_CARESET_ICO_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get CC_CNTRLDDRUGelse_Tooltip(): string {
            return ResourceManager.GetString("CC_CNTRLDDRUGelse_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get CC_CNTRLDDRUGif_Tooltip(): string {
            return ResourceManager.GetString("CC_CNTRLDDRUGif_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get CC_DOSE_ICO_Tooltip(): string {
            return ResourceManager.GetString("CC_DOSE_ICO_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get CC_HIGHRISKelse_Tooltip(): string {
            return ResourceManager.GetString("CC_HIGHRISKelse_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get CC_HIGHRISKif_Tooltip(): string {
            return ResourceManager.GetString("CC_HIGHRISKif_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get CC_HIGHRISKSomePrd_Tooltip(): string {
            return ResourceManager.GetString("CC_HIGHRISKSomePrd_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get CC_NAMEDRUGelse_Tooltip(): string {
            return ResourceManager.GetString("CC_NAMEDRUGelse_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get CC_NAMEDRUGif_Tooltip(): string {
            return ResourceManager.GetString("CC_NAMEDRUGif_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get CC_NEWLYelse_Tooltip(): string {
            return ResourceManager.GetString("CC_NEWLYelse_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get CC_NEWLYif_Tooltip(): string {
            return ResourceManager.GetString("CC_NEWLYif_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get CC_UNLICENSEDelse_Tooltip(): string {
            return ResourceManager.GetString("CC_UNLICENSEDelse_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get CC_UNLICENSEDif_Tooltip(): string {
            return ResourceManager.GetString("CC_UNLICENSEDif_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get Checkreadonlycheck_Tooltip(): string {
            return ResourceManager.GetString("Checkreadonlycheck_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get CheckreadonlyUncheck_Tooltip(): string {
            return ResourceManager.GetString("CheckreadonlyUncheck_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get cmdAddFavourites_Text(): string {
            return ResourceManager.GetString("cmdAddFavourites_Text", prescribedrugs.resourceCulture);
        }
        public static get cmdAddFavourites_Tooltip(): string {
            return ResourceManager.GetString("cmdAddFavourites_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get cmdDiscontinueCancel_Text(): string {
            return ResourceManager.GetString("cmdDiscontinueCancel_Text", prescribedrugs.resourceCulture);
        }
        public static get cmdDiscontinueCancel_Tooltip(): string {
            return ResourceManager.GetString("cmdDiscontinueCancel_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get cmdDoseCalculator_Text(): string {
            return ResourceManager.GetString("cmdDoseCalculator_Text", prescribedrugs.resourceCulture);
        }
        public static get cmdDoseCalculator_Tooltip(): string {
            return ResourceManager.GetString("cmdDoseCalculator_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get cmdHoldUnhold_Text(): string {
            return ResourceManager.GetString("cmdHoldUnhold_Text", prescribedrugs.resourceCulture);
        }
        public static get cmdHoldUnhold_Tooltip(): string {
            return ResourceManager.GetString("cmdHoldUnhold_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get cmdLinks_Text(): string {
            return ResourceManager.GetString("cmdLinks_Text", prescribedrugs.resourceCulture);
        }
        public static get cmdLinks_Tooltip(): string {
            return ResourceManager.GetString("cmdLinks_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get cmdOtherLinks_Text(): string {
            return ResourceManager.GetString("cmdOtherLinks_Text", prescribedrugs.resourceCulture);
        }
        public static get cmdOtherLinks_Tooltip(): string {
            return ResourceManager.GetString("cmdOtherLinks_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get cmdReconcile_Text(): string {
            return ResourceManager.GetString("cmdReconcile_Text", prescribedrugs.resourceCulture);
        }
        public static get cmdReconcile_Tooltip(): string {
            return ResourceManager.GetString("cmdReconcile_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get cmdRemove_Text(): string {
            return ResourceManager.GetString("cmdRemove_Text", prescribedrugs.resourceCulture);
        }
        public static get cmdRemove_Tooltip(): string {
            return ResourceManager.GetString("cmdRemove_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get cmdResults_Text(): string {
            return ResourceManager.GetString("cmdResults_Text", prescribedrugs.resourceCulture);
        }
        public static get cmdResults_Tooltip(): string {
            return ResourceManager.GetString("cmdResults_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get Commenticon_Tooltip(): string {
            return ResourceManager.GetString("Commenticon_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get CumulativeIcon_Tooltip(): string {
            return ResourceManager.GetString("CumulativeIcon_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get dicontinueico_Tootlip(): string {
            return ResourceManager.GetString("dicontinueico_Tootlip", prescribedrugs.resourceCulture);
        }
        public static get DischargeMedications_Header(): string {
            return ResourceManager.GetString("DischargeMedications_Header", prescribedrugs.resourceCulture);
        }
        public static get Errmsg_DiscontinueReason(): string {
            return ResourceManager.GetString("Errmsg_DiscontinueReason", prescribedrugs.resourceCulture);
        }
        public static get Errmsg_ReinstateReason(): string {
            return ResourceManager.GetString("Errmsg_ReinstateReason", prescribedrugs.resourceCulture);
        }
        public static get Errmsg_ReviewOutcome(): string {
            return ResourceManager.GetString("Errmsg_ReviewOutcome", prescribedrugs.resourceCulture);
        }
        public static get Errmsg_ReviewPeriod(): string {
            return ResourceManager.GetString("Errmsg_ReviewPeriod", prescribedrugs.resourceCulture);
        }
        public static get Errmsg_ReviewPeriodUOM(): string {
            return ResourceManager.GetString("Errmsg_ReviewPeriodUOM", prescribedrugs.resourceCulture);
        }
        public static get Errmsg_ReviewPeriodValueforDuration(): string {
            return ResourceManager.GetString("Errmsg_ReviewPeriodValueforDuration", prescribedrugs.resourceCulture);
        }
        public static get Errmsg_ReviewPeriodValueforInfusionPeriod(): string {
            return ResourceManager.GetString("Errmsg_ReviewPeriodValueforInfusionPeriod", prescribedrugs.resourceCulture);
        }
        public static get Errmsg_ReviewPeriodValueforStopDTTM(): string {
            return ResourceManager.GetString("Errmsg_ReviewPeriodValueforStopDTTM", prescribedrugs.resourceCulture);
        }
        public static get HiddenColumn_Header(): string {
            return ResourceManager.GetString("HiddenColumn_Header", prescribedrugs.resourceCulture);
        }
        public static get Holdicon_Tooltip(): string {
            return ResourceManager.GetString("Holdicon_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get InfoiconAcknowledged_Tooltip(): string {
            return ResourceManager.GetString("InfoiconAcknowledged_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get lblOutcomeComments_Text(): string {
            return ResourceManager.GetString("lblOutcomeComments_Text", prescribedrugs.resourceCulture);
        }
        public static get lblOutcomeComments_ToolTip(): string {
            return ResourceManager.GetString("lblOutcomeComments_ToolTip", prescribedrugs.resourceCulture);
        }
        public static get lblReasonforDiscontinue_Text(): string {
            return ResourceManager.GetString("lblReasonforDiscontinue_Text", prescribedrugs.resourceCulture);
        }
        public static get lblReasonforDiscontinue_ToolTip(): string {
            return ResourceManager.GetString("lblReasonforDiscontinue_ToolTip", prescribedrugs.resourceCulture);
        }
        public static get lblReinstate_Text(): string {
            return ResourceManager.GetString("lblReinstate_Text", prescribedrugs.resourceCulture);
        }
        public static get lblReinstate_ToolTip(): string {
            return ResourceManager.GetString("lblReinstate_ToolTip", prescribedrugs.resourceCulture);
        }
        public static get lblReviewAfter_Text(): string {
            return ResourceManager.GetString("lblReviewAfter_Text", prescribedrugs.resourceCulture);
        }
        public static get lblReviewAfter_ToolTip(): string {
            return ResourceManager.GetString("lblReviewAfter_ToolTip", prescribedrugs.resourceCulture);
        }
        public static get lblReviewAfterUOM_ToolTip(): string {
            return ResourceManager.GetString("lblReviewAfterUOM_ToolTip", prescribedrugs.resourceCulture);
        }
        public static get lblReviewdatetime_Text(): string {
            return ResourceManager.GetString("lblReviewdatetime_Text", prescribedrugs.resourceCulture);
        }
        public static get lblReviewOutcome_Text(): string {
            return ResourceManager.GetString("lblReviewOutcome_Text", prescribedrugs.resourceCulture);
        }
        public static get lblReviewOutcome_Tooltip(): string {
            return ResourceManager.GetString("lblReviewOutcome_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get lblReviewRequestComments_Text(): string {
            return ResourceManager.GetString("lblReviewRequestComments_Text", prescribedrugs.resourceCulture);
        }
        public static get lblReviewRequestComments_ToolTip(): string {
            return ResourceManager.GetString("lblReviewRequestComments_ToolTip", prescribedrugs.resourceCulture);
        }
        public static get lblReviewRequestedBy_Text(): string {
            return ResourceManager.GetString("lblReviewRequestedBy_Text", prescribedrugs.resourceCulture);
        }
        public static get lblReviewRequestedOn_Text(): string {
            return ResourceManager.GetString("lblReviewRequestedOn_Text", prescribedrugs.resourceCulture);
        }
        public static get lblReviewType_Text(): string {
            return ResourceManager.GetString("lblReviewType_Text", prescribedrugs.resourceCulture);
        }
        public static get LockingWarningMsg(): string {
            return ResourceManager.GetString("LockingWarningMsg", prescribedrugs.resourceCulture);
        }
        public static get InfusionStartTime_Disclaimer(): string {
            return ResourceManager.GetString("InfusionStartTime_Disclaimer", prescribedrugs.resourceCulture);
        }
        public static get ManditoryConflicts_Tooltip(): string {
            return ResourceManager.GetString("ManditoryConflicts_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get Manditoryindicator_Tooltip(): string {
            return ResourceManager.GetString("Manditoryindicator_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get More_Allergies_Exist(): string {
            return ResourceManager.GetString("More_Allergies_Exist", prescribedrugs.resourceCulture);
        }
        public static get More_Problem_Exist(): string {
            return ResourceManager.GetString("More_Problem_Exist", prescribedrugs.resourceCulture);
        }
        public static get Otherinformation_Header(): string {
            return ResourceManager.GetString("Otherinformation_Header", prescribedrugs.resourceCulture);
        }
        public static get PatientHeight_Tooltip(): string {
            return ResourceManager.GetString("PatientHeight_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get PatientWeight_Tooltip(): string {
            return ResourceManager.GetString("PatientWeight_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get Pendingicon_Tooltip(): string {
            return ResourceManager.GetString("Pendingicon_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get PrescriptionItem_Header(): string {
            return ResourceManager.GetString("PrescriptionItem_Header", prescribedrugs.resourceCulture);
        }
        public static get RequestUrgencyHigh_Tooltip(): string {
            return ResourceManager.GetString("RequestUrgencyHigh_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get RequestUrgencyLow_Tooltip(): string {
            return ResourceManager.GetString("RequestUrgencyLow_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get RequestUrgencyMedium_Tooltip(): string {
            return ResourceManager.GetString("RequestUrgencyMedium_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get RequestUrgencyNo_Tooltip(): string {
            return ResourceManager.GetString("RequestUrgencyNo_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get SectionAllergy_Tooltip(): string {
            return ResourceManager.GetString("SectionAllergy_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get Sectionallergyelse1_Tooltip(): string {
            return ResourceManager.GetString("Sectionallergyelse1_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get sectionallergyelse2_Tooltip(): string {
            return ResourceManager.GetString("sectionallergyelse2_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get sectionallergyielse_Tooltip(): string {
            return ResourceManager.GetString("sectionallergyielse_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get sectionallergyif_Tooltip(): string {
            return ResourceManager.GetString("sectionallergyif_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get SectionConsideration_Tooltip(): string {
            return ResourceManager.GetString("SectionConsideration_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get Sectionproblemielse_Tooltip(): string {
            return ResourceManager.GetString("Sectionproblemielse_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get SectionProblems_Tooltip(): string {
            return ResourceManager.GetString("SectionProblems_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get StartDTTM_Header(): string {
            return ResourceManager.GetString("StartDTTM_Header", prescribedrugs.resourceCulture);
        }
        public static get MCIAbove5Headr_Tooltip(): string {
            return ResourceManager.GetString("MCIAbove5Headr_Tooltip", prescribedrugs.resourceCulture);
        }
        public static get PGDCompleted(): string {
            return ResourceManager.GetString("PGDCompleted", prescribedrugs.resourceCulture);
        }
        public static get PGDCancelled(): string {
            return ResourceManager.GetString("PGDCancelled", prescribedrugs.resourceCulture);
        }
        public static get PGDGiven(): string {
            return ResourceManager.GetString("PGDGiven", prescribedrugs.resourceCulture);
        }
    }