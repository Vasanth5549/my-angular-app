// const resourceCulture = "";
    const Data = [{ "key": "cboDoseValueUOM_ToolTip", "value": "Select dose value UOM" }, { "key": "cboRangeUOM_ToolTip", "value": "Select UOM" }, { "key": "cmdAdd_Caption", "value": "Add" }, { "key": "cmdAdd_ToolTip", "value": "Select to add conditional dose" }, { "key": "cmdRemove_Caption", "value": "Remove" }, { "key": "cmdRemove_ToolTip", "value": "Select to remove conditional dose" }, { "key": "cmdUpdate_Caption", "value": "Update" }, { "key": "cmdUpdate_ToolTip", "value": "Select to update conditional dose" }, { "key": "DoseUOM_Mandatory", "value": "Dose UOM cannot be blank" }, { "key": "Dose_Mandatory", "value": "Enter dose value, this field is mandatory" }, { "key": "Instruction_Mandatory", "value": "Enter instruction, this field is mandatory" }, { "key": "lblCondition_Text", "value": "Observations/ Results" }, { "key": "lblDoseValue_Text", "value": "Dose value" }, { "key": "lblValueRangeUOM_Text", "value": "UOM" }, { "key": "lblValueRange_Text", "value": "Value range" }, { "key": "optDoseValueType_ToolTip", "value": "Select dose value type" }, { "key": "Range_Validation", "value": "Lower and upper limit values are the same. Please change either" }, { "key": "tvwCondition_ToolTip", "value": "Select observation/results" }, { "key": "txtDoseValue_ToolTip", "value": "Enter dose value" }, { "key": "txtLowerRange_ToolTip", "value": "Enter value range" }, { "key": "txtUpperRange_ToolTip", "value": "Enter value range" }, { "key": "ValueRangeUOM_Mandatory", "value": "Select value range UOM" }, { "key": "ValueRange_Mandatory", "value": "Enter value range, this field is mandatory" }, { "key": "Observation_Display", "value": "Observation" }, { "key": "Results_Display", "value": "Results" }, { "key": "MessageBox_Title", "value": "Conditional dose - Lorenzo" }, { "key": "grdCondition_DoseInstruction", "value": "Dose details" }, { "key": "grdCondition_ObservationResult", "value": "Observations/Results" }, { "key": "grdCondition_ValueRange", "value": "Value range" }, { "key": "lblDoseValueUOM_Text", "value": "UOM" }, { "key": "txtInstruction_ToolTip", "value": "Enter instruction" }, { "key": "DoseSafety_Msg", "value": "For safety, avoid entering a dose value of less than 1, change unit of measure if necessary. Do you wish to continue?" }, { "key": "Clerking_Mandatory", "value": "Select a dose value and the corresponding dose unit of measure value to proceed." }, { "key": "Range_Validation1", "value": "Upper limit value is less than the lower limit value. Please change the value" }, { "key": "lblDose_Text", "value": "Dose" }, { "key": "grdCondition_DoseInfusionInstruction", "value": "Dosing details" }, { "key": "lblDoseInfusionValue_Text", "value": "Dosing details" }, { "key": "cboUOMInfusionrate1_Mandatory", "value": "Infusion rate dinominator UOM cannot be blank." }, { "key": "cboUOMInfusionrate_Mandatory", "value": "Infusion rate UOM cannot be blank." }, { "key": "txtLowerInfusionrate_Mandatory", "value": "Infusion rate cannot be zero or empty." }, { "key": "txtValueRange_Tooltip", "value": "Select the logical operator" }, { "key": "cboValueRange_Tooltip", "value": "Select value range" }, { "key": "ValDoseEmpty_mandatory", "value": "Dose cannot be zero or empty." }, { "key": "ValDoseUOMEmpty_mandatory", "value": "Dose UOM cannot be blank." }, { "key": "txtUpperDoseValue_ToolTip", "value": "Enter upper dose value" }, { "key": "DoseOrInstruction_Mandatory", "value": "Enter dose or instruction, this field is mandatory" }, { "key": "InfRateOrInstruction_Mandatory", "value": "Enter infusion rate or instruction, this field is mandatory" }, { "key": "UpperDose_Check", "value": "Uppder dose cannot be lessthan the lower dose" }, { "key": "ValDoseZero_mandatory", "value": "Dose cannot be zero." }, { "key": "ValRange_Validation", "value": "Please enter value greater than" }, { "key": "ValueRangeZero_Mandatory", "value": "The lower value range should start with zero" }, { "key": "ValidateDecimal_General", "value": "Value range for {0} with UOM  {1} should be specified with 3 decimal place" }, { "key": "ValidateDecimal_UOM", "value": "Value range for {0} with UOM  {1} should be specified with {2} decimal place" }, { "key": "TitratedUomMessage", "value": "Change in UOM will clear the titrated dose grid for its values. Click ok to clear the values and default this UOM else click cancel to retain the original UOM and values" }, { "key": "TitratedUomMessageBox_Title", "value": "Lorenzo" }];
    class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
            let r = Data.find((e) => e.key == key);
            return r != undefined ? r.value : "";
        }
    }
    export class medConditionalDoseRes {
        // private static resourceMan: System.Resources.ResourceManager;
        private static resourceCulture = "";
        constructor() {

        }
        public static get cboDoseValueUOM_ToolTip(): string {
            return ResourceManager.GetString("cboDoseValueUOM_ToolTip", medConditionalDoseRes.resourceCulture);
        }
        public static get cboRangeUOM_ToolTip(): string {
            return ResourceManager.GetString("cboRangeUOM_ToolTip", medConditionalDoseRes.resourceCulture);
        }
        public static get cboUOMInfusionrate_Mandatory(): string {
            return ResourceManager.GetString("cboUOMInfusionrate_Mandatory", medConditionalDoseRes.resourceCulture);
        }
        public static get cboUOMInfusionrate1_Mandatory(): string {
            return ResourceManager.GetString("cboUOMInfusionrate1_Mandatory", medConditionalDoseRes.resourceCulture);
        }
        public static get cboValueRange_Tooltip(): string {
            return ResourceManager.GetString("cboValueRange_Tooltip", medConditionalDoseRes.resourceCulture);
        }
        public static get Clerking_Mandatory(): string {
            return ResourceManager.GetString("Clerking_Mandatory", medConditionalDoseRes.resourceCulture);
        }
        public static get cmdAdd_Caption(): string {
            return ResourceManager.GetString("cmdAdd_Caption", medConditionalDoseRes.resourceCulture);
        }
        public static get cmdAdd_ToolTip(): string {
            return ResourceManager.GetString("cmdAdd_ToolTip", medConditionalDoseRes.resourceCulture);
        }
        public static get cmdRemove_Caption(): string {
            return ResourceManager.GetString("cmdRemove_Caption", medConditionalDoseRes.resourceCulture);
        }
        public static get cmdRemove_ToolTip(): string {
            return ResourceManager.GetString("cmdRemove_ToolTip", medConditionalDoseRes.resourceCulture);
        }
        public static get cmdUpdate_Caption(): string {
            return ResourceManager.GetString("cmdUpdate_Caption", medConditionalDoseRes.resourceCulture);
        }
        public static get cmdUpdate_ToolTip(): string {
            return ResourceManager.GetString("cmdUpdate_ToolTip", medConditionalDoseRes.resourceCulture);
        }
        public static get Dose_Mandatory(): string {
            return ResourceManager.GetString("Dose_Mandatory", medConditionalDoseRes.resourceCulture);
        }
        public static get DoseOrInstruction_Mandatory(): string {
            return ResourceManager.GetString("DoseOrInstruction_Mandatory", medConditionalDoseRes.resourceCulture);
        }
        public static get DoseSafety_Msg(): string {
            return ResourceManager.GetString("DoseSafety_Msg", medConditionalDoseRes.resourceCulture);
        }
        public static get DoseUOM_Mandatory(): string {
            return ResourceManager.GetString("DoseUOM_Mandatory", medConditionalDoseRes.resourceCulture);
        }
        public static get grdCondition_DoseInfusionInstruction(): string {
            return ResourceManager.GetString("grdCondition_DoseInfusionInstruction", medConditionalDoseRes.resourceCulture);
        }
        public static get grdCondition_DoseInstruction(): string {
            return ResourceManager.GetString("grdCondition_DoseInstruction", medConditionalDoseRes.resourceCulture);
        }
        public static get grdCondition_ObservationResult(): string {
            return ResourceManager.GetString("grdCondition_ObservationResult", medConditionalDoseRes.resourceCulture);
        }
        public static get grdCondition_ValueRange(): string {
            return ResourceManager.GetString("grdCondition_ValueRange", medConditionalDoseRes.resourceCulture);
        }
        public static get InfRateOrInstruction_Mandatory(): string {
            return ResourceManager.GetString("InfRateOrInstruction_Mandatory", medConditionalDoseRes.resourceCulture);
        }
        public static get Instruction_Mandatory(): string {
            return ResourceManager.GetString("Instruction_Mandatory", medConditionalDoseRes.resourceCulture);
        }
        public static get lblCondition_Text(): string {
            return ResourceManager.GetString("lblCondition_Text", medConditionalDoseRes.resourceCulture);
        }
        public static get lblDose_Text(): string {
            return ResourceManager.GetString("lblDose_Text", medConditionalDoseRes.resourceCulture);
        }
        public static get lblDoseInfusionValue_Text(): string {
            return ResourceManager.GetString("lblDoseInfusionValue_Text", medConditionalDoseRes.resourceCulture);
        }
        public static get lblDoseValue_Text(): string {
            return ResourceManager.GetString("lblDoseValue_Text", medConditionalDoseRes.resourceCulture);
        }
        public static get lblDoseValueUOM_Text(): string {
            return ResourceManager.GetString("lblDoseValueUOM_Text", medConditionalDoseRes.resourceCulture);
        }
        public static get lblValueRange_Text(): string {
            return ResourceManager.GetString("lblValueRange_Text", medConditionalDoseRes.resourceCulture);
        }
        public static get lblValueRangeUOM_Text(): string {
            return ResourceManager.GetString("lblValueRangeUOM_Text", medConditionalDoseRes.resourceCulture);
        }
        public static get MessageBox_Title(): string {
            return ResourceManager.GetString("MessageBox_Title", medConditionalDoseRes.resourceCulture);
        }
        public static get Observation_Display(): string {
            return ResourceManager.GetString("Observation_Display", medConditionalDoseRes.resourceCulture);
        }
        public static get optDoseValueType_ToolTip(): string {
            return ResourceManager.GetString("optDoseValueType_ToolTip", medConditionalDoseRes.resourceCulture);
        }
        public static get Range_Validation(): string {
            return ResourceManager.GetString("Range_Validation", medConditionalDoseRes.resourceCulture);
        }
        public static get Range_Validation1(): string {
            return ResourceManager.GetString("Range_Validation1", medConditionalDoseRes.resourceCulture);
        }
        public static get Results_Display(): string {
            return ResourceManager.GetString("Results_Display", medConditionalDoseRes.resourceCulture);
        }
        public static get TitratedUomMessage(): string {
            return ResourceManager.GetString("TitratedUomMessage", medConditionalDoseRes.resourceCulture);
        }
        public static get TitratedUomMessageBox_Title(): string {
            return ResourceManager.GetString("TitratedUomMessageBox_Title", medConditionalDoseRes.resourceCulture);
        }
        public static get tvwCondition_ToolTip(): string {
            return ResourceManager.GetString("tvwCondition_ToolTip", medConditionalDoseRes.resourceCulture);
        }
        public static get txtDoseValue_ToolTip(): string {
            return ResourceManager.GetString("txtDoseValue_ToolTip", medConditionalDoseRes.resourceCulture);
        }
        public static get txtInstruction_ToolTip(): string {
            return ResourceManager.GetString("txtInstruction_ToolTip", medConditionalDoseRes.resourceCulture);
        }
        public static get txtLowerInfusionrate_Mandatory(): string {
            return ResourceManager.GetString("txtLowerInfusionrate_Mandatory", medConditionalDoseRes.resourceCulture);
        }
        public static get txtLowerRange_ToolTip(): string {
            return ResourceManager.GetString("txtLowerRange_ToolTip", medConditionalDoseRes.resourceCulture);
        }
        public static get txtUpperDoseValue_ToolTip(): string {
            return ResourceManager.GetString("txtUpperDoseValue_ToolTip", medConditionalDoseRes.resourceCulture);
        }
        public static get txtUpperRange_ToolTip(): string {
            return ResourceManager.GetString("txtUpperRange_ToolTip", medConditionalDoseRes.resourceCulture);
        }
        public static get txtValueRange_Tooltip(): string {
            return ResourceManager.GetString("txtValueRange_Tooltip", medConditionalDoseRes.resourceCulture);
        }
        public static get UpperDose_Check(): string {
            return ResourceManager.GetString("UpperDose_Check", medConditionalDoseRes.resourceCulture);
        }
        public static get ValDoseEmpty_mandatory(): string {
            return ResourceManager.GetString("ValDoseEmpty_mandatory", medConditionalDoseRes.resourceCulture);
        }
        public static get ValDoseUOMEmpty_mandatory(): string {
            return ResourceManager.GetString("ValDoseUOMEmpty_mandatory", medConditionalDoseRes.resourceCulture);
        }
        public static get ValDoseZero_mandatory(): string {
            return ResourceManager.GetString("ValDoseZero_mandatory", medConditionalDoseRes.resourceCulture);
        }
        public static get ValidateDecimal_General(): string {
            return ResourceManager.GetString("ValidateDecimal_General", medConditionalDoseRes.resourceCulture);
        }
        public static get ValidateDecimal_UOM(): string {
            return ResourceManager.GetString("ValidateDecimal_UOM", medConditionalDoseRes.resourceCulture);
        }
        public static get ValRange_Validation(): string {
            return ResourceManager.GetString("ValRange_Validation", medConditionalDoseRes.resourceCulture);
        }
        public static get ValueRange_Mandatory(): string {
            return ResourceManager.GetString("ValueRange_Mandatory", medConditionalDoseRes.resourceCulture);
        }
        public static get ValueRangeUOM_Mandatory(): string {
            return ResourceManager.GetString("ValueRangeUOM_Mandatory", medConditionalDoseRes.resourceCulture);
        }
        public static get ValueRangeZero_Mandatory(): string {
            return ResourceManager.GetString("ValueRangeZero_Mandatory", medConditionalDoseRes.resourceCulture);
        }
    }
