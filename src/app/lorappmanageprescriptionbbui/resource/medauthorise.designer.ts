// const resourceCulture = "";
    const Data = [{ "key": "cmdDiscontinueCancel_Text", "value": "Discontinue/Cancel" }, { "key": "cmdDispensingInstr_Text", "value": "Add dispensing instructions" }, { "key": "cmdDoseCalculator_Text", "value": "Dose calculator" }, { "key": "cmdLinks_Text", "value": "Links" }, { "key": "cmdOnbehalfOf_Text", "value": "On behalf of" }, { "key": "cmdReconcile_Text", "value": "Reconcile" }, { "key": "cmdResults_Text", "value": "Results" }, { "key": "ConflictIcon_Header", "value": "Conflict" }, { "key": "DischargeMedications_Header", "value": "Discharge prescription" }, { "key": "FormViewerIcon_Header", "value": "Form viewer" }, { "key": "HiddenColumn__Header", "value": "Hidden" }, { "key": "lblDisplayText_Text", "value": "Discharge medications - items to be clinically verified" }, { "key": "Otherinformation_Header", "value": "Other information" }, { "key": "PrescriptionItem_Header", "value": "Prescription item name" }, { "key": "RecordedMedications_Header", "value": "Recorded medication" }, { "key": "StartDTTM_Header", "value": "Start date" }, { "key": "verified_Header", "value": "Verfied" }, { "key": "lblDisplayAuthoriseText_Header", "value": "Discharge medications - items to be authorised" }, { "key": "authorised_Header", "value": "Authorised" }, { "key": "cmdDiscontinueCancel_Tooltip", "value": "Click to discontinue/Cancel the item" }, { "key": "cmdDispensingInstr_Tooltip", "value": "Select to enter dispensing instructions" }, { "key": "cmdDoseCalculator_Tooltip", "value": "Click to invoke dose calculator" }, { "key": "cmdLinks_Tooltip", "value": "Click to view drug monograph of the drug" }, { "key": "cmdOnbehalfOf_Tooltip", "value": "Click to view on behalf of screen" }, { "key": "cmdReconcile_Tooltip", "value": "Click to reconcile medication clerking and discharge medications" }, { "key": "cmdResults_Tooltip", "value": "Results" }, { "key": "ConflictsMessage", "value": "Conflicts exist for one or more prescribed medication items. Please review them" }, { "key": "DeactiveMessage", "value": "The medication item(s) {0} have been deactivated. Please re-prescribe/reselect" }, { "key": "cmdLinks_Tooltip2", "value": "Links" }, { "key": "Search_Header", "value": "Search" }, { "key": "cmdOtherLinks_Text", "value": "Other links" }, { "key": "cmdOtherLinks_Tooltip", "value": "Click here to view other links of the drug" }, { "key": "cmdRemove_Text", "value": "Remove" }, { "key": "cmdRemove_Tooltip", "value": "Click to remove" }, { "key": "cmdObservationResult_Text", "value": "Observations/Results" }, { "key": "cmdObservationResult_Tooltip", "value": "Select to launch observations/results – opening  a new window" }, { "key": "cmdTechValidate_Text", "value": "Technically validate" }, { "key": "cmdTechValidate_Tooltip", "value": "Select to Technically validate the items" }, { "key": "DeactCompMsg", "value": "The component(s) of {0} have been deactivated since they were prescribed. Please discontinue/cancel accordingly." }, { "key": "InfCancelledDiscon_ValMsg", "value": "The following item(s) have been cancelled/discontinued by prescriber:" }, { "key": "InfRateAmended_ValMsg", "value": "The infusion rate has been changed for:" }, { "key": "InfConcentrationAmended_ValMsg", "value": "The concentration has been changed for:" }, { "key": "cmdMedAdmin_Text", "value": "Medication administration" }, { "key": "cmdMedAdmin_Tooltip", "value": "Click to view medication administration chart" }, { "key": "cmdSupplyInstruction_Text", "value": "Add supply instructions" }, { "key": "cmdSupplyInstruction_ToolTip", "value": "Select to enter supply instructions" }, { "key": "ExistingSupplyInst_Validation1", "value": "Supply instructions/Supply comments are currently set for" }, { "key": "CancelCA_validation", "value": "You are about to cancel this activity, are you sure?" }, { "key": "MessageBox_Title", "value": "LORENZO" }, { "key": "ExistingSupplyInst_Validation2", "value": "medications. Do you wish to clear the existing instructions and replace with new instructions for all selected medications?" }, { "key": "gpConnectViewerText", "value": "GP Connectviewer" }, { "key": "gpConnectViewerToolTip", "value": "Click to launch GP Connect summary screen" }];
    class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
            let r = Data.find((e) => e.key == key);
            return r != undefined ? r.value : "";
        }
    }
    export class medauthorise {
        // private static resourceMan: System.Resources.ResourceManager;
        private static resourceCulture = "";
        constructor() {

        }
        public static get authorised_Header(): string {
            return ResourceManager.GetString("authorised_Header", medauthorise.resourceCulture);
        }
        public static get CancelCA_validation(): string {
            return ResourceManager.GetString("CancelCA_validation", medauthorise.resourceCulture);
        }
        public static get cmdDiscontinueCancel_Text(): string {
            return ResourceManager.GetString("cmdDiscontinueCancel_Text", medauthorise.resourceCulture);
        }
        public static get cmdDiscontinueCancel_Tooltip(): string {
            return ResourceManager.GetString("cmdDiscontinueCancel_Tooltip", medauthorise.resourceCulture);
        }
        public static get cmdDispensingInstr_Text(): string {
            return ResourceManager.GetString("cmdDispensingInstr_Text", medauthorise.resourceCulture);
        }
        public static get cmdDispensingInstr_Tooltip(): string {
            return ResourceManager.GetString("cmdDispensingInstr_Tooltip", medauthorise.resourceCulture);
        }
        public static get cmdDoseCalculator_Text(): string {
            return ResourceManager.GetString("cmdDoseCalculator_Text", medauthorise.resourceCulture);
        }
        public static get cmdDoseCalculator_Tooltip(): string {
            return ResourceManager.GetString("cmdDoseCalculator_Tooltip", medauthorise.resourceCulture);
        }
        public static get cmdLinks_Text(): string {
            return ResourceManager.GetString("cmdLinks_Text", medauthorise.resourceCulture);
        }
        public static get cmdLinks_Tooltip(): string {
            return ResourceManager.GetString("cmdLinks_Tooltip", medauthorise.resourceCulture);
        }
        public static get cmdLinks_Tooltip2(): string {
            return ResourceManager.GetString("cmdLinks_Tooltip2", medauthorise.resourceCulture);
        }
        public static get cmdMedAdmin_Text(): string {
            return ResourceManager.GetString("cmdMedAdmin_Text", medauthorise.resourceCulture);
        }
        public static get cmdMedAdmin_Tooltip(): string {
            return ResourceManager.GetString("cmdMedAdmin_Tooltip", medauthorise.resourceCulture);
        }
        public static get cmdObservationResult_Text(): string {
            return ResourceManager.GetString("cmdObservationResult_Text", medauthorise.resourceCulture);
        }
        public static get cmdObservationResult_Tooltip(): string {
            return ResourceManager.GetString("cmdObservationResult_Tooltip", medauthorise.resourceCulture);
        }
        public static get cmdOnbehalfOf_Text(): string {
            return ResourceManager.GetString("cmdOnbehalfOf_Text", medauthorise.resourceCulture);
        }
        public static get cmdOnbehalfOf_Tooltip(): string {
            return ResourceManager.GetString("cmdOnbehalfOf_Tooltip", medauthorise.resourceCulture);
        }
        public static get cmdOtherLinks_Text(): string {
            return ResourceManager.GetString("cmdOtherLinks_Text", medauthorise.resourceCulture);
        }
        public static get cmdOtherLinks_Tooltip(): string {
            return ResourceManager.GetString("cmdOtherLinks_Tooltip", medauthorise.resourceCulture);
        }
        public static get cmdReconcile_Text(): string {
            return ResourceManager.GetString("cmdReconcile_Text", medauthorise.resourceCulture);
        }
        public static get cmdReconcile_Tooltip(): string {
            return ResourceManager.GetString("cmdReconcile_Tooltip", medauthorise.resourceCulture);
        }
        public static get cmdRemove_Text(): string {
            return ResourceManager.GetString("cmdRemove_Text", medauthorise.resourceCulture);
        }
        public static get cmdRemove_Tooltip(): string {
            return ResourceManager.GetString("cmdRemove_Tooltip", medauthorise.resourceCulture);
        }
        public static get cmdResults_Text(): string {
            return ResourceManager.GetString("cmdResults_Text", medauthorise.resourceCulture);
        }
        public static get cmdResults_Tooltip(): string {
            return ResourceManager.GetString("cmdResults_Tooltip", medauthorise.resourceCulture);
        }
        public static get cmdSupplyInstruction_Text(): string {
            return ResourceManager.GetString("cmdSupplyInstruction_Text", medauthorise.resourceCulture);
        }
        public static get cmdSupplyInstruction_ToolTip(): string {
            return ResourceManager.GetString("cmdSupplyInstruction_ToolTip", medauthorise.resourceCulture);
        }
        public static get cmdTechValidate_Text(): string {
            return ResourceManager.GetString("cmdTechValidate_Text", medauthorise.resourceCulture);
        }
        public static get cmdTechValidate_Tooltip(): string {
            return ResourceManager.GetString("cmdTechValidate_Tooltip", medauthorise.resourceCulture);
        }
        public static get ConflictIcon_Header(): string {
            return ResourceManager.GetString("ConflictIcon_Header", medauthorise.resourceCulture);
        }
        public static get ConflictsMessage(): string {
            return ResourceManager.GetString("ConflictsMessage", medauthorise.resourceCulture);
        }
        public static get DeactCompMsg(): string {
            return ResourceManager.GetString("DeactCompMsg", medauthorise.resourceCulture);
        }
        public static get DeactiveMessage(): string {
            return ResourceManager.GetString("DeactiveMessage", medauthorise.resourceCulture);
        }
        public static get DischargeMedications_Header(): string {
            return ResourceManager.GetString("DischargeMedications_Header", medauthorise.resourceCulture);
        }
        public static get ExistingSupplyInst_Validation1(): string {
            return ResourceManager.GetString("ExistingSupplyInst_Validation1", medauthorise.resourceCulture);
        }
        public static get ExistingSupplyInst_Validation2(): string {
            return ResourceManager.GetString("ExistingSupplyInst_Validation2", medauthorise.resourceCulture);
        }
        public static get FormViewerIcon_Header(): string {
            return ResourceManager.GetString("FormViewerIcon_Header", medauthorise.resourceCulture);
        }
        public static get gpConnectViewerText(): string {
            return ResourceManager.GetString("gpConnectViewerText", medauthorise.resourceCulture);
        }
        public static get gpConnectViewerToolTip(): string {
            return ResourceManager.GetString("gpConnectViewerToolTip", medauthorise.resourceCulture);
        }
        public static get HiddenColumn__Header(): string {
            return ResourceManager.GetString("HiddenColumn__Header", medauthorise.resourceCulture);
        }
        public static get InfCancelledDiscon_ValMsg(): string {
            return ResourceManager.GetString("InfCancelledDiscon_ValMsg", medauthorise.resourceCulture);
        }
        public static get InfConcentrationAmended_ValMsg(): string {
            return ResourceManager.GetString("InfConcentrationAmended_ValMsg", medauthorise.resourceCulture);
        }
        public static get InfRateAmended_ValMsg(): string {
            return ResourceManager.GetString("InfRateAmended_ValMsg", medauthorise.resourceCulture);
        }
        public static get lblDisplayAuthoriseText_Header(): string {
            return ResourceManager.GetString("lblDisplayAuthoriseText_Header", medauthorise.resourceCulture);
        }
        public static get lblDisplayText_Text(): string {
            return ResourceManager.GetString("lblDisplayText_Text", medauthorise.resourceCulture);
        }
        public static get MessageBox_Title(): string {
            return ResourceManager.GetString("MessageBox_Title", medauthorise.resourceCulture);
        }
        public static get Otherinformation_Header(): string {
            return ResourceManager.GetString("Otherinformation_Header", medauthorise.resourceCulture);
        }
        public static get PrescriptionItem_Header(): string {
            return ResourceManager.GetString("PrescriptionItem_Header", medauthorise.resourceCulture);
        }
        public static get RecordedMedications_Header(): string {
            return ResourceManager.GetString("RecordedMedications_Header", medauthorise.resourceCulture);
        }
        public static get Search_Header(): string {
            return ResourceManager.GetString("Search_Header", medauthorise.resourceCulture);
        }
        public static get StartDTTM_Header(): string {
            return ResourceManager.GetString("StartDTTM_Header", medauthorise.resourceCulture);
        }
        public static get verified_Header(): string {
            return ResourceManager.GetString("verified_Header", medauthorise.resourceCulture);
        }
    }
