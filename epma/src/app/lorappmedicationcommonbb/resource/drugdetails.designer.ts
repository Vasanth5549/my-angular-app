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
    const Data = [{"key":"Authoriseracknowledgementreason_Header","value":"Authoriser reason"},{"key":"Clinicalverifieracknowledgementreason_Header","value":"Clinical verifier reason"},{"key":"DispensingInstruction_Header","value":"Dispensing instructions"},{"key":"IdentityfyingName_Header","value":"Medication catalogue item name"},{"key":"lblAdditionalName_Text","value":"Additional comments"},{"key":"lblAdminInst_Text","value":"Administration instructions"},{"key":"lblConflictsExistName_Text","value":"Conflicts exist"},{"key":"lblDispensing_Text","value":"Dispensing instructions"},{"key":"lblDoesCalcExistName_Text","value":"Dose calculation exists"},{"key":"lblDoseName_Text","value":"Dose and Administration method"},{"key":"lblDurations_Text","value":"Duration"},{"key":"lblEndorsement_Text","value":"Endorsement properties"},{"key":"lblForms_Text","value":"Form"},{"key":"lblFrequencyName_Text","value":"Direction and Frequency"},{"key":"lblHeading_Header","value":"Dose combinations"},{"key":"lblInstalmentinstructions_Text","value":"Instalment instructions"},{"key":"lblIntervalName_Text","value":"Interval between instalments"},{"key":"lblMedClerking_Text","value":"Medication clerking source"},{"key":"lblMedClerk_Text","value":"Medication clerking modify reason"},{"key":"lblNoofName_Text","value":"No. of instalments"},{"key":"lblOrderName_Text","value":"Ordered/Prescribed medication name"},{"key":"lblProblemName_Text","value":"Problem/Indication"},{"key":"lblRouteName_Text","value":"Route"},{"key":"lblSiteName_Text","value":"Site"},{"key":"lblStartDateName_Text","value":"Start date"},{"key":"lblStationery_Text","value":"Stationery type"},{"key":"lblStatusName_Text","value":"Status"},{"key":"lblStopDateName_Text","value":"Stop date"},{"key":"lblSupplyIns_Text","value":"Supply instructions"},{"key":"lblSupplyName_Text","value":"Supply quantity"},{"key":"lblTreatment_Text","value":"Treatment to continue"},{"key":"lblUsed_Text","value":"Used with"},{"key":"lblValidatedByName_Header","value":"Technically validated by"},{"key":"lblValidatedDate_Header","value":"Technically validated date/time"},{"key":"PrescriberAcknowledgementreason_Header","value":"Prescriber acknowledgement"},{"key":"Quantity_Header","value":"Quantity per dose"},{"key":"SupplyInstruction_Header","value":"Supply instructions/Comments"},{"key":"TotalQuantity_Header","value":"Total quantity"},{"key":"ConflictType_Header","value":"Type"},{"key":"Details_Header","value":"Details"},{"key":"viewStatus_Header","value":"Acknowledged"},{"key":"lblDateCommenced_Text","value":"Date commenced"},{"key":"lblAmendmentof_Text","value":"Amendment of"},{"key":"lblBy_Text","value":"By"},{"key":"lblComments_Text","value":"Comments"},{"key":"lblDateTime_Text","value":"Date/Time"},{"key":"lblMedicationClrkRsn_Text","value":"Medication clerking modify reason"},{"key":"lblPrescribedBy_Text","value":"Prescribed by"},{"key":"lblPrescribedOn_Text","value":"Prescribed on"},{"key":"lblPRNInstr_Text","value":"PRN instructions"},{"key":"lblReason_Text","value":"Reason"},{"key":"lblStrength_Text","value":"Strength"},{"key":"lblInfusionRate_Text","value":"Infusion rate"},{"key":"lblRoundedOffTo_Text","value":"(Rounding tolerance)"},{"key":"lblVerifiedby_Text","value":"Verified by"},{"key":"lblBatchNo_Text","value":"Batch no and expiry date"},{"key":"lblCareprovider_Text","value":"Care provider"},{"key":"lblFormulary_Text","value":"Formulary"},{"key":"lblHealthorganisation_Text","value":"Health organisation"},{"key":"lblHoldRsn_Text","value":"Reason for hold"},{"key":"lblInstalmentintr_Text","value":"Instalment instructions"},{"key":"lblNonFormulary_Text","value":"Reason for prescribing Non-formulary/type-in"},{"key":"lblPrescriptionNo_Text","value":"Prescription number"},{"key":"lblPresitemNo_Text","value":"Prescription item number"},{"key":"lblSpecialty_Text","value":"Specialty"},{"key":"ClerkedBy_Header","value":"Clerked by"},{"key":"RecordedBy_Header","value":"Recorded by"},{"key":"RecordedAt_Header","value":"Recorded at"},{"key":"lblCommentsforStop_Text","value":"Comments for stopping"},{"key":"Cancellation_Header","value":"Cancellation"},{"key":"Discontinuation_Header","value":"Discontinuation"},{"key":"PGDAdmin_Header","value":"PGD for administration  details"},{"key":"PGDSupply_Header","value":"PGD for supply details"},{"key":"Prescription_Header","value":"Prescription details"},{"key":"Authorisation_tooltip","value":"Select to view authorisation details"},{"key":"DoseCalculator_tooltip","value":"Click to view dose calculation details"},{"key":"Onbehalf_tooltip","value":"Select to view on behalf of details"},{"key":"DoseType_tooltip","value":"Select to view dosing information"},{"key":"Close_tooltip","value":"Click to close"},{"key":"Close_Text","value":"Close"},{"key":"NoRecordsText_Text","value":"There are no records to show"},{"key":"lblNonFormularyMCI_Text","value":"Non-formulary components of MCI and reason"},{"key":"cmdSupplyDispIns_Text","value":"Select to view instructions"},{"key":"PresBleep_Text","value":"Bleep"},{"key":"PresContactDetails_Text","value":"Contact details"},{"key":"PresDetails_Text","value":"Prescriber details"},{"key":"PresPager_Text","value":"Pager"},{"key":"PresStatus_Text","value":"Prescriber status"},{"key":"PresTelephone_Text","value":"Telephone(mobile)"},{"key":"PrefContactType_ToolTip","value":"Preferred contact type"},{"key":"lblReviewAfter_Text","value":"Prescription review details"},{"key":"lblSupplyStatus_Header","value":"Supply status"},{"key":"Comments","value":"Comments:"},{"key":"FutureOmitSlots_Tooltip","value":"This medication has some future doses omitted"},{"key":"IsOmitIndefinite_Tooltip","value":"Omitted indefinitely"},{"key":"OmittedDoseReview_Tooltip","value":"All doses are currently omitted. Treatment to be reviewed"},{"key":"ReviewMedline_Tooltip","value":"Medication review due"},{"key":"ReqMedIconToolTip","value":"Select request medication to view full details."},{"key":"WardStockIcon_Tooltip","value":"Item is stocked at this location"},{"key":"lblClerkSrcReferNo_Text","value":"Clerking source reference number"},{"key":"lblcommnmode_Text","value":"Communication mode"},{"key":"lblonbehalfreason_Text","value":"On behalf of reason"},{"key":"lblonbehalf_Text","value":"On behalf of"},{"key":"lblonbehalfdet_Text","value":"On behalf of details:"},{"key":"lblonbehalfhistory_Text","value":"On behalf of history"},{"key":"lblonbehalf_ToolTip","value":"Click to view on behalf of history"}];
    class ResourceManager {
            static GetString(key: string, resourceCulture: any): string {
              let r = Data.find((e) => e.key == key);
              return r != undefined ? r.value : "";
            }
          }


    export class DrugDetails {
        // private static resourceMan: System.Resources.ResourceManager;
        private static resourceCulture = "";
        constructor() {

        }
        public static get Authorisation_tooltip(): string {
            return ResourceManager.GetString("Authorisation_tooltip", DrugDetails.resourceCulture);
        }
        public static get Authoriseracknowledgementreason_Header(): string {
            return ResourceManager.GetString("Authoriseracknowledgementreason_Header", DrugDetails.resourceCulture);
        }
        public static get Cancellation_Header(): string {
            return ResourceManager.GetString("Cancellation_Header", DrugDetails.resourceCulture);
        }
        public static get ClerkedBy_Header(): string {
            return ResourceManager.GetString("ClerkedBy_Header", DrugDetails.resourceCulture);
        }
        public static get Clinicalverifieracknowledgementreason_Header(): string {
            return ResourceManager.GetString("Clinicalverifieracknowledgementreason_Header", DrugDetails.resourceCulture);
        }
        public static get Close_Text(): string {
            return ResourceManager.GetString("Close_Text", DrugDetails.resourceCulture);
        }
        public static get Close_tooltip(): string {
            return ResourceManager.GetString("Close_tooltip", DrugDetails.resourceCulture);
        }
        public static get ConflictType_Header(): string {
            return ResourceManager.GetString("ConflictType_Header", DrugDetails.resourceCulture);
        }
        public static get ReqMedIconToolTip(): string {
            return ResourceManager.GetString("ReqMedIconToolTip", DrugDetails.resourceCulture);
        }
        public static get Details_Header(): string {
            return ResourceManager.GetString("Details_Header", DrugDetails.resourceCulture);
        }
        public static get Discontinuation_Header(): string {
            return ResourceManager.GetString("Discontinuation_Header", DrugDetails.resourceCulture);
        }
        public static get DispensingInstruction_Header(): string {
            return ResourceManager.GetString("DispensingInstruction_Header", DrugDetails.resourceCulture);
        }
        public static get DoseCalculator_tooltip(): string {
            return ResourceManager.GetString("DoseCalculator_tooltip", DrugDetails.resourceCulture);
        }
        public static get DoseType_tooltip(): string {
            return ResourceManager.GetString("DoseType_tooltip", DrugDetails.resourceCulture);
        }
        public static get FutureOmitSlots_Tooltip(): string {
            return ResourceManager.GetString("FutureOmitSlots_Tooltip", DrugDetails.resourceCulture);
        }
        public static get IdentityfyingName_Header(): string {
            return ResourceManager.GetString("IdentityfyingName_Header", DrugDetails.resourceCulture);
        }
        public static get IsOmitIndefinite_Tooltip(): string {
            return ResourceManager.GetString("IsOmitIndefinite_Tooltip", DrugDetails.resourceCulture);
        }
        public static get lblAdditionalName_Text(): string {
            return ResourceManager.GetString("lblAdditionalName_Text", DrugDetails.resourceCulture);
        }
        public static get lblAdminInst_Text(): string {
            return ResourceManager.GetString("lblAdminInst_Text", DrugDetails.resourceCulture);
        }
        public static get lblAmendmentof_Text(): string {
            return ResourceManager.GetString("lblAmendmentof_Text", DrugDetails.resourceCulture);
        }
        public static get lblBatchNo_Text(): string {
            return ResourceManager.GetString("lblBatchNo_Text", DrugDetails.resourceCulture);
        }
        public static get lblClerkSrcReferNo_Text(): string {
            return ResourceManager.GetString("lblClerkSrcReferNo_Text", DrugDetails.resourceCulture);
        }
        public static get lblBy_Text(): string {
            return ResourceManager.GetString("lblBy_Text", DrugDetails.resourceCulture);
        }
        public static get lblCareprovider_Text(): string {
            return ResourceManager.GetString("lblCareprovider_Text", DrugDetails.resourceCulture);
        }
        public static get lblComments_Text(): string {
            return ResourceManager.GetString("lblComments_Text", DrugDetails.resourceCulture);
        }
        public static get lblCommentsforStop_Text(): string {
            return ResourceManager.GetString("lblCommentsforStop_Text", DrugDetails.resourceCulture);
        }
        public static get lblConflictsExistName_Text(): string {
            return ResourceManager.GetString("lblConflictsExistName_Text", DrugDetails.resourceCulture);
        }
        public static get lblDateCommenced_Text(): string {
            return ResourceManager.GetString("lblDateCommenced_Text", DrugDetails.resourceCulture);
        }
        public static get lblDateTime_Text(): string {
            return ResourceManager.GetString("lblDateTime_Text", DrugDetails.resourceCulture);
        }
        public static get lblDispensing_Text(): string {
            return ResourceManager.GetString("lblDispensing_Text", DrugDetails.resourceCulture);
        }
        public static get lblDoesCalcExistName_Text(): string {
            return ResourceManager.GetString("lblDoesCalcExistName_Text", DrugDetails.resourceCulture);
        }
        public static get lblDoseName_Text(): string {
            return ResourceManager.GetString("lblDoseName_Text", DrugDetails.resourceCulture);
        }
        public static get lblDurations_Text(): string {
            return ResourceManager.GetString("lblDurations_Text", DrugDetails.resourceCulture);
        }
        public static get lblEndorsement_Text(): string {
            return ResourceManager.GetString("lblEndorsement_Text", DrugDetails.resourceCulture);
        }
        public static get lblForms_Text(): string {
            return ResourceManager.GetString("lblForms_Text", DrugDetails.resourceCulture);
        }
        public static get lblFormulary_Text(): string {
            return ResourceManager.GetString("lblFormulary_Text", DrugDetails.resourceCulture);
        }
        public static get lblFrequencyName_Text(): string {
            return ResourceManager.GetString("lblFrequencyName_Text", DrugDetails.resourceCulture);
        }
        public static get lblHeading_Header(): string {
            return ResourceManager.GetString("lblHeading_Header", DrugDetails.resourceCulture);
        }
        public static get lblHealthorganisation_Text(): string {
            return ResourceManager.GetString("lblHealthorganisation_Text", DrugDetails.resourceCulture);
        }
        public static get lblHoldRsn_Text(): string {
            return ResourceManager.GetString("lblHoldRsn_Text", DrugDetails.resourceCulture);
        }
        public static get lblInstalmentinstructions_Text(): string {
            return ResourceManager.GetString("lblInstalmentinstructions_Text", DrugDetails.resourceCulture);
        }
        public static get lblInstalmentintr_Text(): string {
            return ResourceManager.GetString("lblInstalmentintr_Text", DrugDetails.resourceCulture);
        }
        public static get lblIntervalName_Text(): string {
            return ResourceManager.GetString("lblIntervalName_Text", DrugDetails.resourceCulture);
        }
        public static get lblMedClerk_Text(): string {
            return ResourceManager.GetString("lblMedClerk_Text", DrugDetails.resourceCulture);
        }
        public static get lblMedClerking_Text(): string {
            return ResourceManager.GetString("lblMedClerking_Text", DrugDetails.resourceCulture);
        }
        public static get lblMedicationClrkRsn_Text(): string {
            return ResourceManager.GetString("lblMedicationClrkRsn_Text", DrugDetails.resourceCulture);
        }
        public static get lblNonFormulary_Text(): string {
            return ResourceManager.GetString("lblNonFormulary_Text", DrugDetails.resourceCulture);
        }
        public static get lblNoofName_Text(): string {
            return ResourceManager.GetString("lblNoofName_Text", DrugDetails.resourceCulture);
        }
        public static get lblOrderName_Text(): string {
            return ResourceManager.GetString("lblOrderName_Text", DrugDetails.resourceCulture);
        }
        public static get lblonbehalfdet_Text(): string {
            return ResourceManager.GetString("lblonbehalfdet_Text", DrugDetails.resourceCulture);
        }
        public static get lblonbehalf_Text(): string {
            return ResourceManager.GetString("lblonbehalf_Text", DrugDetails.resourceCulture);
        }
        public static get lblonbehalfreason_Text(): string {
            return ResourceManager.GetString("lblonbehalfreason_Text", DrugDetails.resourceCulture);
        }
        public static get lblcommnmode_Text(): string {
            return ResourceManager.GetString("lblcommnmode_Text", DrugDetails.resourceCulture);
        }
        public static get lblonbehalfhistory_Text(): string {
            return ResourceManager.GetString("lblonbehalfhistory_Text", DrugDetails.resourceCulture);
        }
        public static get lblonbehalf_ToolTip(): string {
            return ResourceManager.GetString("lblonbehalf_ToolTip", DrugDetails.resourceCulture);
        }
        public static get lblPrescribedBy_Text(): string {
            return ResourceManager.GetString("lblPrescribedBy_Text", DrugDetails.resourceCulture);
        }
        public static get lblPrescribedOn_Text(): string {
            return ResourceManager.GetString("lblPrescribedOn_Text", DrugDetails.resourceCulture);
        }
        public static get lblPrescriptionNo_Text(): string {
            return ResourceManager.GetString("lblPrescriptionNo_Text", DrugDetails.resourceCulture);
        }
        public static get lblPresitemNo_Text(): string {
            return ResourceManager.GetString("lblPresitemNo_Text", DrugDetails.resourceCulture);
        }
        public static get lblPRNInstr_Text(): string {
            return ResourceManager.GetString("lblPRNInstr_Text", DrugDetails.resourceCulture);
        }
        public static get lblProblemName_Text(): string {
            return ResourceManager.GetString("lblProblemName_Text", DrugDetails.resourceCulture);
        }
        public static get lblReason_Text(): string {
            return ResourceManager.GetString("lblReason_Text", DrugDetails.resourceCulture);
        }
        public static get lblRouteName_Text(): string {
            return ResourceManager.GetString("lblRouteName_Text", DrugDetails.resourceCulture);
        }
        public static get lblSiteName_Text(): string {
            return ResourceManager.GetString("lblSiteName_Text", DrugDetails.resourceCulture);
        }
        public static get lblSpecialty_Text(): string {
            return ResourceManager.GetString("lblSpecialty_Text", DrugDetails.resourceCulture);
        }
        public static get lblStartDateName_Text(): string {
            return ResourceManager.GetString("lblStartDateName_Text", DrugDetails.resourceCulture);
        }
        public static get lblStationery_Text(): string {
            return ResourceManager.GetString("lblStationery_Text", DrugDetails.resourceCulture);
        }
        public static get lblStatusName_Text(): string {
            return ResourceManager.GetString("lblStatusName_Text", DrugDetails.resourceCulture);
        }
        public static get lblStopDateName_Text(): string {
            return ResourceManager.GetString("lblStopDateName_Text", DrugDetails.resourceCulture);
        }
        public static get lblStrength_Text(): string {
            return ResourceManager.GetString("lblStrength_Text", DrugDetails.resourceCulture);
        }
        public static get lblRoundedOffTo_Text(): string {
            return ResourceManager.GetString("lblRoundedOffTo_Text", DrugDetails.resourceCulture);
        }
        public static get lblInfusionRate_Text(): string {
            return ResourceManager.GetString("lblInfusionRate_Text", DrugDetails.resourceCulture);
        }
        public static get lblSupplyIns_Text(): string {
            return ResourceManager.GetString("lblSupplyIns_Text", DrugDetails.resourceCulture);
        }
        public static get lblSupplyName_Text(): string {
            return ResourceManager.GetString("lblSupplyName_Text", DrugDetails.resourceCulture);
        }
        public static get lblTreatment_Text(): string {
            return ResourceManager.GetString("lblTreatment_Text", DrugDetails.resourceCulture);
        }
        public static get lblUsed_Text(): string {
            return ResourceManager.GetString("lblUsed_Text", DrugDetails.resourceCulture);
        }
        public static get lblValidatedByName_Header(): string {
            return ResourceManager.GetString("lblValidatedByName_Header", DrugDetails.resourceCulture);
        }
        public static get lblValidatedDate_Header(): string {
            return ResourceManager.GetString("lblValidatedDate_Header", DrugDetails.resourceCulture);
        }
        public static get lblVerifiedby_Text(): string {
            return ResourceManager.GetString("lblVerifiedby_Text", DrugDetails.resourceCulture);
        }
        public static get NoRecordsText_Text(): string {
            return ResourceManager.GetString("NoRecordsText_Text", DrugDetails.resourceCulture);
        }
        public static get OmittedDoseReview_Tooltip(): string {
            return ResourceManager.GetString("OmittedDoseReview_Tooltip", DrugDetails.resourceCulture);
        }
        public static get Onbehalf_tooltip(): string {
            return ResourceManager.GetString("Onbehalf_tooltip", DrugDetails.resourceCulture);
        }
        public static get PGDAdmin_Header(): string {
            return ResourceManager.GetString("PGDAdmin_Header", DrugDetails.resourceCulture);
        }
        public static get PGDSupply_Header(): string {
            return ResourceManager.GetString("PGDSupply_Header", DrugDetails.resourceCulture);
        }
        public static get PrefContactType_ToolTip(): string {
            return ResourceManager.GetString("PrefContactType_ToolTip", DrugDetails.resourceCulture);
        }
        public static get PresBleep_Text(): string {
            return ResourceManager.GetString("PresBleep_Text", DrugDetails.resourceCulture);
        }
        public static get PresContactDetails_Text(): string {
            return ResourceManager.GetString("PresContactDetails_Text", DrugDetails.resourceCulture);
        }
        public static get PrescriberAcknowledgementreason_Header(): string {
            return ResourceManager.GetString("PrescriberAcknowledgementreason_Header", DrugDetails.resourceCulture);
        }
        public static get Prescription_Header(): string {
            return ResourceManager.GetString("Prescription_Header", DrugDetails.resourceCulture);
        }
        public static get PresDetails_Text(): string {
            return ResourceManager.GetString("PresDetails_Text", DrugDetails.resourceCulture);
        }
        public static get PresPager_Text(): string {
            return ResourceManager.GetString("PresPager_Text", DrugDetails.resourceCulture);
        }
        public static get PresStatus_Text(): string {
            return ResourceManager.GetString("PresStatus_Text", DrugDetails.resourceCulture);
        }
        public static get PresTelephone_Text(): string {
            return ResourceManager.GetString("PresTelephone_Text", DrugDetails.resourceCulture);
        }
        public static get Quantity_Header(): string {
            return ResourceManager.GetString("Quantity_Header", DrugDetails.resourceCulture);
        }
        public static get RecordedAt_Header(): string {
            return ResourceManager.GetString("RecordedAt_Header", DrugDetails.resourceCulture);
        }
        public static get RecordedBy_Header(): string {
            return ResourceManager.GetString("RecordedBy_Header", DrugDetails.resourceCulture);
        }
        public static get ReviewMedline_Tooltip(): string {
            return ResourceManager.GetString("ReviewMedline_Tooltip", DrugDetails.resourceCulture);
        }
        public static get SupplyInstruction_Header(): string {
            return ResourceManager.GetString("SupplyInstruction_Header", DrugDetails.resourceCulture);
        }
        public static get TotalQuantity_Header(): string {
            return ResourceManager.GetString("TotalQuantity_Header", DrugDetails.resourceCulture);
        }
        public static get viewStatus_Header(): string {
            return ResourceManager.GetString("viewStatus_Header", DrugDetails.resourceCulture);
        }
        public static get lblReviewAfter_Text(): string {
            return ResourceManager.GetString("lblReviewAfter_Text", DrugDetails.resourceCulture);
        }
        public static get lblNonFormularyMCI_Text(): string {
            return ResourceManager.GetString("lblNonFormularyMCI_Text", DrugDetails.resourceCulture);
        }
        public static get cmdSupplyDispIns_Text(): string {
            return ResourceManager.GetString("cmdSupplyDispIns_Text", DrugDetails.resourceCulture);
        }
        public static get lblSupplyStatus_Header(): string {
            return ResourceManager.GetString("lblSupplyStatus_Header", DrugDetails.resourceCulture);
        }
        public static get Comments(): string {
            return ResourceManager.GetString("Comments", DrugDetails.resourceCulture);
        }
    }