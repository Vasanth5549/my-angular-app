// const resourceCulture = "";
    const Data = [{ "key": "123451_Msg", "value": "The prescription for this patient cannot be submitted because the patient has been discharged, please click OK and the prescribing window will close and no prescriptions will be processed for this patient." }, { "key": "900025_Msg", "value": "This record has been amended by another user since you started this transaction.Please re-query the data and start the transaction again" }, { "key": "CancelledEncounter1_Msg", "value": "This encounter is cancelled and medication details/ changes have not been saved." }, { "key": "CancelledEncounter2_Msg", "value": "Medication details will need to be re-entered against an appropriate encounter." }, { "key": "IDConfig_ERROR_IN_ID_GENERATION", "value": "Error during Auto-ID generation" }, { "key": "IDConfig_ID_GENERATION_OVERFLOWED", "value": "Overflow of sequence number in Auto-ID generation" }, { "key": "IDConfig_NO_ACTIVE_ID_EXITS", "value": "No Active ID configuration exists" }, { "key": "IDConfig_NO_CONFIG_FOUND", "value": "ID not configured" }, { "key": "IDConfig_NO_ID_CONFIG_EXITS", "value": "No ID configuration definition exists" }, { "key": "IsStatOnceOnlyOrPrnError", "value": "Creating a sequence is not available as one or more selected items contains a STAT/Once only or PRN prescription" }, { "key": "IsApplianceMedGasSVOrPCAError", "value": "Creating a sequence is not available as one or more selected items cannot be added to a sequence" }, { "key": "IsStatOnceOnlyOrPrnBreakError", "value": "You cannot add a STAT/Once only or PRN frequency to a sequence" }, { "key": "HavingDurationInfusionPeriodError", "value": "Creating a sequence is not available as one or more selected items does not have a duration or infusion period" }, { "key": "HavingIVAndNonIVError", "value": "Creating a sequence is not available as one or more selected items cannot be added to the sequence" }, { "key": "OrdersetMultipleValidationError", "value": "Creating a sequence is not available as one or more selected items cannot be added to the sequence" }, { "key": "HaveDurationInfusionPeriodLinkError", "value": "Linking a sequence is not available as one or more selected items does not have a duration or infusion period" }, { "key": "HeaderInMiddleOfOrderSet", "value": "The group header name can’t be in the middle of sequence. Please adjust accordingly" }, { "key": "AmendDurationInfType", "value": "This item is part of a sequence so you cannot amend the duration, infusion period, infusion type to PCA/Intermittent or Dose type to stepped/Variable or Titrated. Please remove the sequence item if necessary" }, { "key": "ChangeOfRouteInSequence", "value": "This item is part of a sequence and you cannot combine infusion and non-infusion medication within the same sequence.  Please remove the sequence item if necessary" }, { "key": "DaysOfWeeks_NotExist_Msg", "value": "The patient has a stepped/variable prescription. Please review and update the days of the week before submitting the prescription" }];
    class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
            let r = Data.find((e) => e.key == key);
            return r != undefined ? r.value : "";
        }
    }
    export class MedicationErrors {
        // private static resourceMan: System.Resources.ResourceManager;
        private static resourceCulture = "";
        constructor() {

        }
        public static get _123451_Msg(): string {
            return ResourceManager.GetString("123451_Msg", MedicationErrors.resourceCulture);
        }
        public static get _900025_Msg(): string {
            return ResourceManager.GetString("900025_Msg", MedicationErrors.resourceCulture);
        }
        public static get AmendDurationInfType(): string {
            return ResourceManager.GetString("AmendDurationInfType", MedicationErrors.resourceCulture);
        }
        public static get CancelledEncounter1_Msg(): string {
            return ResourceManager.GetString("CancelledEncounter1_Msg", MedicationErrors.resourceCulture);
        }
        public static get CancelledEncounter2_Msg(): string {
            return ResourceManager.GetString("CancelledEncounter2_Msg", MedicationErrors.resourceCulture);
        }
        public static get ChangeOfRouteInSequence(): string {
            return ResourceManager.GetString("ChangeOfRouteInSequence", MedicationErrors.resourceCulture);
        }
        public static get DaysOfWeeks_NotExist_Msg(): string {
            return ResourceManager.GetString("DaysOfWeeks_NotExist_Msg", MedicationErrors.resourceCulture);
        }
        public static get HaveDurationInfusionPeriodLinkError(): string {
            return ResourceManager.GetString("HaveDurationInfusionPeriodLinkError", MedicationErrors.resourceCulture);
        }
        public static get HavingDurationInfusionPeriodError(): string {
            return ResourceManager.GetString("HavingDurationInfusionPeriodError", MedicationErrors.resourceCulture);
        }
        public static get HavingIVAndNonIVError(): string {
            return ResourceManager.GetString("HavingIVAndNonIVError", MedicationErrors.resourceCulture);
        }
        public static get HeaderInMiddleOfOrderSet(): string {
            return ResourceManager.GetString("HeaderInMiddleOfOrderSet", MedicationErrors.resourceCulture);
        }
        public static get IDConfig_ERROR_IN_ID_GENERATION(): string {
            return ResourceManager.GetString("IDConfig_ERROR_IN_ID_GENERATION", MedicationErrors.resourceCulture);
        }
        public static get IDConfig_ID_GENERATION_OVERFLOWED(): string {
            return ResourceManager.GetString("IDConfig_ID_GENERATION_OVERFLOWED", MedicationErrors.resourceCulture);
        }
        public static get IDConfig_NO_ACTIVE_ID_EXITS(): string {
            return ResourceManager.GetString("IDConfig_NO_ACTIVE_ID_EXITS", MedicationErrors.resourceCulture);
        }
        public static get IDConfig_NO_CONFIG_FOUND(): string {
            return ResourceManager.GetString("IDConfig_NO_CONFIG_FOUND", MedicationErrors.resourceCulture);
        }
        public static get IDConfig_NO_ID_CONFIG_EXITS(): string {
            return ResourceManager.GetString("IDConfig_NO_ID_CONFIG_EXITS", MedicationErrors.resourceCulture);
        }
        public static get IsApplianceMedGasSVOrPCAError(): string {
            return ResourceManager.GetString("IsApplianceMedGasSVOrPCAError", MedicationErrors.resourceCulture);
        }
        public static get IsStatOnceOnlyOrPrnBreakError(): string {
            return ResourceManager.GetString("IsStatOnceOnlyOrPrnBreakError", MedicationErrors.resourceCulture);
        }
        public static get IsStatOnceOnlyOrPrnError(): string {
            return ResourceManager.GetString("IsStatOnceOnlyOrPrnError", MedicationErrors.resourceCulture);
        }
        public static get OrdersetMultipleValidationError(): string {
            return ResourceManager.GetString("OrdersetMultipleValidationError", MedicationErrors.resourceCulture);
        }
    }
