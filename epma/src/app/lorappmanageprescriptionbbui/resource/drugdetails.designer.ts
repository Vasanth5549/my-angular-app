// const resourceCulture = "";
    const Data = [{"key":"Authoriseracknowledgementreason_Header","value":"Authoriser reason"},{"key":"Clinicalverifieracknowledgementreason_Header","value":"Clinical verifier reason"},{"key":"DispensingInstruction_Header","value":"Dispensing instructions"},{"key":"IdentityfyingName_Header","value":"Medication catalogue item name"},{"key":"lblAdditionalName_Text","value":"Additional comments"},{"key":"lblAdminInst_Text","value":"Administration instructions"},{"key":"lblConflictsExistName_Text","value":"Conflicts exist"},{"key":"lblDispensing_Text","value":"Dispensing instructions"},{"key":"lblDoesCalcExistName_Text","value":"Dose calculation exists"},{"key":"lblDoseName_Text","value":"Dose and Administration method"},{"key":"lblDurations_Text","value":"Duration"},{"key":"lblEndorsement_Text","value":"Endorsement properties"},{"key":"lblForms_Text","value":"Form"},{"key":"lblFrequencyName_Text","value":"Direction and Frequency"},{"key":"lblHeading_Header","value":"Dose combinations"},{"key":"lblInstalmentinstructions_Text","value":"Instalment instructions"},{"key":"lblIntervalName_Text","value":"Interval between instalments"},{"key":"lblMedClerking_Text","value":"Medication clerking source"},{"key":"lblMedClerk_Text","value":"Medication clerking modify reason"},{"key":"lblNoofName_Text","value":"No. of instalments"},{"key":"lblOrderName_Text","value":"Ordered/Prescribed medication name"},{"key":"lblProblemName_Text","value":"Problem/Indication"},{"key":"lblRouteName_Text","value":"Route"},{"key":"lblSiteName_Text","value":"Site"},{"key":"lblStartDateName_Text","value":"Start date"},{"key":"lblStationery_Text","value":"Stationery type"},{"key":"lblStatusName_Text","value":"Status"},{"key":"lblStopDateName_Text","value":"Stop date"},{"key":"lblSupplyIns_Text","value":"Supply instructions"},{"key":"lblSupplyName_Text","value":"Supply quantity"},{"key":"lblTreatment_Text","value":"Treatment to continue"},{"key":"lblUsed_Text","value":"Used with"},{"key":"lblValidatedByName_Header","value":"Technically validated by"},{"key":"lblValidatedDate_Header","value":"Technically validated date/time"},{"key":"PrescriberAcknowledgementreason_Header","value":"Prescriber acknowledgement"},{"key":"Quantity_Header","value":"Quantity per dose"},{"key":"SupplyInstruction_Header","value":"Supply instructions"},{"key":"TotalQuantity_Header","value":"Total quantity"},{"key":"ConflictType_Header","value":"Type"},{"key":"Details_Header","value":"Details"},{"key":"viewStatus_Header","value":"Acknowledged"},{"key":"lblDateCommenced_Text","value":"Date commenced"},{"key":"HistoryIcon_Tooltip","value":"Modification History"}];
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
        public static get Authoriseracknowledgementreason_Header(): string {
            return ResourceManager.GetString("Authoriseracknowledgementreason_Header", DrugDetails.resourceCulture);
        }
        public static get Clinicalverifieracknowledgementreason_Header(): string {
            return ResourceManager.GetString("Clinicalverifieracknowledgementreason_Header", DrugDetails.resourceCulture);
        }
        public static get ConflictType_Header(): string {
            return ResourceManager.GetString("ConflictType_Header", DrugDetails.resourceCulture);
        }
        public static get Details_Header(): string {
            return ResourceManager.GetString("Details_Header", DrugDetails.resourceCulture);
        }
        public static get DispensingInstruction_Header(): string {
            return ResourceManager.GetString("DispensingInstruction_Header", DrugDetails.resourceCulture);
        }
        public static get HistoryIcon_Tooltip(): string {
            return ResourceManager.GetString("HistoryIcon_Tooltip", DrugDetails.resourceCulture);
        }
        public static get IdentityfyingName_Header(): string {
            return ResourceManager.GetString("IdentityfyingName_Header", DrugDetails.resourceCulture);
        }
        public static get lblAdditionalName_Text(): string {
            return ResourceManager.GetString("lblAdditionalName_Text", DrugDetails.resourceCulture);
        }
        public static get lblAdminInst_Text(): string {
            return ResourceManager.GetString("lblAdminInst_Text", DrugDetails.resourceCulture);
        }
        public static get lblConflictsExistName_Text(): string {
            return ResourceManager.GetString("lblConflictsExistName_Text", DrugDetails.resourceCulture);
        }
        public static get lblDateCommenced_Text(): string {
            return ResourceManager.GetString("lblDateCommenced_Text", DrugDetails.resourceCulture);
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
        public static get lblFrequencyName_Text(): string {
            return ResourceManager.GetString("lblFrequencyName_Text", DrugDetails.resourceCulture);
        }
        public static get lblHeading_Header(): string {
            return ResourceManager.GetString("lblHeading_Header", DrugDetails.resourceCulture);
        }
        public static get lblInstalmentinstructions_Text(): string {
            return ResourceManager.GetString("lblInstalmentinstructions_Text", DrugDetails.resourceCulture);
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
        public static get lblNoofName_Text(): string {
            return ResourceManager.GetString("lblNoofName_Text", DrugDetails.resourceCulture);
        }
        public static get lblOrderName_Text(): string {
            return ResourceManager.GetString("lblOrderName_Text", DrugDetails.resourceCulture);
        }
        public static get lblProblemName_Text(): string {
            return ResourceManager.GetString("lblProblemName_Text", DrugDetails.resourceCulture);
        }
        public static get lblRouteName_Text(): string {
            return ResourceManager.GetString("lblRouteName_Text", DrugDetails.resourceCulture);
        }
        public static get lblSiteName_Text(): string {
            return ResourceManager.GetString("lblSiteName_Text", DrugDetails.resourceCulture);
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
        public static get PrescriberAcknowledgementreason_Header(): string {
            return ResourceManager.GetString("PrescriberAcknowledgementreason_Header", DrugDetails.resourceCulture);
        }
        public static get Quantity_Header(): string {
            return ResourceManager.GetString("Quantity_Header", DrugDetails.resourceCulture);
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
    }
