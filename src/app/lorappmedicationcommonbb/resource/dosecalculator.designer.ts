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
    const Data = [{"key":"BasedOn_Text","value":"Dose calculation for"},{"key":"BrdCalcOrderedAmt_Text","value":"Calculate ordered amount per dose"},{"key":"cboBSAFormula_ToolTip","value":"Select BSA formula"},{"key":"cboFrequency_ToolTip","value":"Select frequency"},{"key":"cboOverrideReason_ToolTip","value":"Select override reason"},{"key":"cboReqDosePer2UOM_ToolTip","value":"Select the requested dose UOM for infusion time"},{"key":"cboReqDosePerUOM_ToolTip","value":"Select the requested dose UOM for weight or BSA"},{"key":"cboReqDoseUOM_ToolTip","value":"Select the requested dose UOM"},{"key":"cboRoundTo_ToolTip","value":"Select round to"},{"key":"cmdCalcBSA_Text","value":"Calculate BSA"},{"key":"cmdCalcBSA_ToolTip","value":"Calculate BSA"},{"key":"cmdCalcDose_Text","value":"Calculate dose"},{"key":"cmdCalcDose_ToolTip","value":"Calculate dose"},{"key":"cmdCalcWeight_Text","value":"Calculate IBW/ABW"},{"key":"cmdCalcWeight_ToolTip","value":"Calculate IBW/ABW"},{"key":"cmdClear_Text","value":"Clear"},{"key":"cmdClear_ToolTip","value":"Select to clear"},{"key":"cmdSelectProduct_Text","value":"Select product"},{"key":"cmdSelectProduct_ToolTip","value":"Select product"},{"key":"lblBSAFormula_Text","value":"BSA formula"},{"key":"lblBSA_Text","value":"BSA"},{"key":"lblCalcAmtPerDose_Text","value":"Calculated amount per dose"},{"key":"lblDoseCalcDetails_Text","value":"Dose calculation details"},{"key":"lblFrequency_Text","value":"Frequency"},{"key":"lblOrderedAmtPerDose_Text","value":"Ordered amount per dose"},{"key":"lblOverrideReason_Text","value":"Override reason"},{"key":"lblPerDose_Text","value":"per dose"},{"key":"lblRoundTo_Text","value":"Round to"},{"key":"lblTotalDailyDose_Text","value":"Total daily dose"},{"key":"lblWeightOption_Text","value":"Weight option"},{"key":"OptABW_Text","value":"AjBW"},{"key":"OptABW_ToolTip","value":"Select for adjusted body weight"},{"key":"OptDailyDoseReq_Text","value":"Total daily dose"},{"key":"OptDailyDoseReq_ToolTip","value":"Select to calculate total daily dose"},{"key":"OptIBW_Text","value":"IBW"},{"key":"OptIBW_ToolTip","value":"Select for ideal body weight"},{"key":"OptIndividualDoseReq_Text","value":"Individual dose"},{"key":"OptIndividualDoseReq_ToolTip","value":"Select to calculate individual dose"},{"key":"OptRecordedWeight_Text","value":"Recorded/Estimated weight"},{"key":"OptRecordedWeight_ToolTip","value":"Select for recorded weight"},{"key":"RequestedDose_Text","value":"Requested dose"},{"key":"txtOrderedAmtDose_ToolTip","value":"Enter ordered amount per dose"},{"key":"txtRequestedDose_ToolTip","value":"Enter requested dose"},{"key":"UOM_Text","value":"UOM"},{"key":"UpdatePatient_Text","value":"Update weight/height to patient record"},{"key":"UpdatePatient_ToolTip","value":"Check to update weight/height to patient record"},{"key":"ErrMsg_ManBSAFormula","value":"Please choose BSA formula"},{"key":"ErrMsg_Height_not_available","value":"Please update height as it’s not available."},{"key":"ErrMsg_Weight_not_available","value":"Please update weight as it’s not available."},{"key":"ErrMsg_ValidateWeight","value":"Cannot calculate BSA. Patient’s weight not available/out of date"},{"key":"Lorenzo_Title","value":"LORENZO"},{"key":"ErrMsg_BSAFormulaandCalculateBSA","value":"Please select a BSA formula and calculate BSA first"},{"key":"ErrMsg_CalculateAdjBW","value":"AdjBW is not calculated yet. Please calculate patient AdjBW"},{"key":"ErrMsg_CalculateBSA","value":"BSA has not been calculated yet. Please calculate BSA"},{"key":"ErrMsg_CalculateIBW","value":"IBW value is not calculated yet. Please calculate patient IBW"},{"key":"ErrMsg_PastWeight","value":"Weight has not been recorded in recent past. Please enter the weight"},{"key":"ErrMsg_ReqDoseUOM","value":"Enter requested dose UOM, this field is mandatory"},{"key":"ErrMsg_ValidateRequestedDose","value":"Enter requested dose, this field is mandatory"},{"key":"lblDoseCapApplied_Text","value":"Minimum dose cap applied"},{"key":"ErrMsg_GenderNotCompatible","value":"IBW cannot be calculated based on the recorded patient gender. Please use recorded/estimated body weight to calculate dose."},{"key":"ErrMsg_ValidateHeightIBW","value":"IBW cannot be calculated because the patient height is not available/out of date."},{"key":"ErrMsg_ValidateHeightOver60","value":"IBW cannot be calculated as height needs to be over 152.4cm/1.524m (60 inches)."},{"key":"ToolTip_ABWAdvisable","value":"AjBW may be more suitable than IBW but cannot be verified as recorded weight is not available/ is out of date.  Please add recorded weight and recalculate if necessary"},{"key":"ErrMsg_ABWAdvisablePart1","value":"Adjusted body weight is recommended for the calculation because the patient’s recorded weight is at least"},{"key":"ErrMsg_ABWAdvisablePart2","value":"% more or less than ideal body weight."},{"key":"HeightOutOfDate","value":"Please update height as it's out of date."},{"key":"WeightOutOfDate","value":"Please update weight as it's out of date."},{"key":"ErrMsg_ChkQualifiedFrequency","value":"Frequency cannot be used to calculate amount per dose."},{"key":"lblBasedon_Text","value":"Based on"},{"key":"OptBSA_Text","value":"BSA"},{"key":"OptBSA_ToolTip","value":"Select to calculate BSA"},{"key":"OptWeight_Text","value":"Weight"},{"key":"OptWeight_ToolTip","value":"Select to calculate weight"},{"key":"CalculatedABW_Text","value":"Calculated AjBW"},{"key":"CalculatedBSA_Text","value":"Calculated BSA"},{"key":"Calculateddose_Text","value":"Calculated dose"},{"key":"CalculatedIBW_Text","value":"Calculated IBW"},{"key":"ErrMsgFrequency_validation","value":"Please select frequency"},{"key":"lblGestationAge_Text","value":"Gestational age"},{"key":"lblHeader_Text","value":"Record Height & Weight"},{"key":"lblHeight_Text","value":"Height"},{"key":"lblWeight_Text","value":"Weight"},{"key":"PerDayText","value":"per day"},{"key":"PerDoseText","value":"per dose"},{"key":"ErrMsg_ValidateBSAHeight_NotAvailable","value":"BSA cannot be calculated because the patient’s height is not available."},{"key":"ErrMsg_ValidateBSAHeight_outdate","value":"BSA cannot be calculated because the patient’s height is out of date."},{"key":"ErrMsg_ValidateBSAHW_NotAvailable","value":"BSA cannot be calculated because the patient’s height/weight is not available."},{"key":"ErrMsg_ValidateBSAHW_outdate","value":"BSA cannot be calculated because the patient’s height/weight is out of date."},{"key":"ErrMsg_ValidateBSAWeight_NotAvailable","value":"BSA cannot be calculated because the patient’s weight is not available."},{"key":"ErrMsg_ValidateBSAWeight_Outdate","value":"BSA cannot be calculated because the patient’s weight is out of date."},{"key":"ErrMsg_ValidateHeightIBW_NotAvailable","value":"IBW cannot be calculated because the patient height is not available."},{"key":"ErrMsg_ValidateHeightIBW_outdate","value":"IBW cannot be calculated because the patient height is out of date."},{"key":"ErrMsg_ValidateWeightIBW_NotAvailable","value":"IBW cannot be calculated because the patient weight is not available."},{"key":"ErrMsg_ValidateWeightIBW_outdate","value":"IBW Cannot be calculated because the patient weight is out of date."},{"key":"RecalculateErrMsg","value":"The height/weight values have been modified. Please re-calculate the dose."},{"key":"Recalculate_Text","value":"Recalculate"},{"key":"Recalculate_Tooltip","value":"Click to recalculate dose values."},{"key":"ErrMsg_ValidateRBWWeight_NotAvailable","value":"Dose cannot be calculated because the patient weight is not available."},{"key":"ErrMsg_ValidateRBWWeight_Outdate","value":"Dose cannot be calculated because the patient weight is out of date."},{"key":"lblAlwsUseDoseCal_Textr","value":"Always use dose calculator"},{"key":"lblBsaformula_textr","value":"BSA formula"},{"key":"lblDfltwttype_textr","value":"Default weight type"},{"key":"lblDosecalBsedon_textr","value":"Dose calculation based on"},{"key":"lblDoseCalfr_textr","value":"Dose calculation for"},{"key":"lblfrqnc_textr","value":"Frequency"},{"key":"lblReqdos_textr","value":"Requested dose"},{"key":"lblAdjBdyWeight_Text","value":"AjBW"},{"key":"lblCalcDose_Text","value":"Calculated amount per dose"},{"key":"lblDosecalculation_header","value":"Dose calculation"},{"key":"lblIdealWeight_Text","value":"IBW"},{"key":"lblIndDose_Text","value":"Individual dose/Total daily dose"},{"key":"lblRecWeight_Text","value":"Weight"},{"key":"lbReasForOver_Text","value":"Reason for override"},{"key":"cmdCalcAJBW_Text","value":"Calculated AJBW"},{"key":"cmdCalcEBW_Text","value":"Recorded/Estimated body weight"},{"key":"cmdCalcIBW_Text","value":"Calculated IBW"},{"key":"IsEstimated_Text","value":"(Estimated)"},{"key":"DoseCalci_Tooltip","value":"Click to view dose calculation details"},{"key":"DoseCalMaxValueErrorMsg","value":"System cannot calculate the dose for out of range values."},{"key":"OrdAmtZeroErrorMsg","value":"Ordered amount per dose cannot be zero or empty."},{"key":"lblDosecalculation_Text","value":"Dose calculation"},{"key":"ErrMsg_DecimalRoundingRequired","value":"The calculated dose amount value is decimal. Please consider rounding off the dose value."}];
    class ResourceManager {
            static GetString(key: string, resourceCulture: any): string {
              let r = Data.find((e) => e.key == key);
              return r != undefined ? r.value : "";
            }
          }


    export class DoseCalculator {
        // private static resourceMan: System.Resources.ResourceManager;
        private static resourceCulture = "";
        constructor() {

        }
        public static get BasedOn_Text(): string {
            return ResourceManager.GetString("BasedOn_Text", DoseCalculator.resourceCulture);
        }
        public static get BrdCalcOrderedAmt_Text(): string {
            return ResourceManager.GetString("BrdCalcOrderedAmt_Text", DoseCalculator.resourceCulture);
        }
        public static get CalculatedABW_Text(): string {
            return ResourceManager.GetString("CalculatedABW_Text", DoseCalculator.resourceCulture);
        }
        public static get CalculatedBSA_Text(): string {
            return ResourceManager.GetString("CalculatedBSA_Text", DoseCalculator.resourceCulture);
        }
        public static get Calculateddose_Text(): string {
            return ResourceManager.GetString("Calculateddose_Text", DoseCalculator.resourceCulture);
        }
        public static get CalculatedIBW_Text(): string {
            return ResourceManager.GetString("CalculatedIBW_Text", DoseCalculator.resourceCulture);
        }
        public static get cboBSAFormula_ToolTip(): string {
            return ResourceManager.GetString("cboBSAFormula_ToolTip", DoseCalculator.resourceCulture);
        }
        public static get cboFrequency_ToolTip(): string {
            return ResourceManager.GetString("cboFrequency_ToolTip", DoseCalculator.resourceCulture);
        }
        public static get cboOverrideReason_ToolTip(): string {
            return ResourceManager.GetString("cboOverrideReason_ToolTip", DoseCalculator.resourceCulture);
        }
        public static get cboReqDosePer2UOM_ToolTip(): string {
            return ResourceManager.GetString("cboReqDosePer2UOM_ToolTip", DoseCalculator.resourceCulture);
        }
        public static get cboReqDosePerUOM_ToolTip(): string {
            return ResourceManager.GetString("cboReqDosePerUOM_ToolTip", DoseCalculator.resourceCulture);
        }
        public static get cboReqDoseUOM_ToolTip(): string {
            return ResourceManager.GetString("cboReqDoseUOM_ToolTip", DoseCalculator.resourceCulture);
        }
        public static get cboRoundTo_ToolTip(): string {
            return ResourceManager.GetString("cboRoundTo_ToolTip", DoseCalculator.resourceCulture);
        }
        public static get cmdCalcAJBW_Text(): string {
            return ResourceManager.GetString("cmdCalcAJBW_Text", DoseCalculator.resourceCulture);
        }
        public static get cmdCalcBSA_Text(): string {
            return ResourceManager.GetString("cmdCalcBSA_Text", DoseCalculator.resourceCulture);
        }
        public static get cmdCalcBSA_ToolTip(): string {
            return ResourceManager.GetString("cmdCalcBSA_ToolTip", DoseCalculator.resourceCulture);
        }
        public static get cmdCalcDose_Text(): string {
            return ResourceManager.GetString("cmdCalcDose_Text", DoseCalculator.resourceCulture);
        }
        public static get cmdCalcDose_ToolTip(): string {
            return ResourceManager.GetString("cmdCalcDose_ToolTip", DoseCalculator.resourceCulture);
        }
        public static get cmdCalcEBW_Text(): string {
            return ResourceManager.GetString("cmdCalcEBW_Text", DoseCalculator.resourceCulture);
        }
        public static get cmdCalcIBW_Text(): string {
            return ResourceManager.GetString("cmdCalcIBW_Text", DoseCalculator.resourceCulture);
        }
        public static get cmdCalcWeight_Text(): string {
            return ResourceManager.GetString("cmdCalcWeight_Text", DoseCalculator.resourceCulture);
        }
        public static get cmdCalcWeight_ToolTip(): string {
            return ResourceManager.GetString("cmdCalcWeight_ToolTip", DoseCalculator.resourceCulture);
        }
        public static get cmdClear_Text(): string {
            return ResourceManager.GetString("cmdClear_Text", DoseCalculator.resourceCulture);
        }
        public static get cmdClear_ToolTip(): string {
            return ResourceManager.GetString("cmdClear_ToolTip", DoseCalculator.resourceCulture);
        }
        public static get cmdSelectProduct_Text(): string {
            return ResourceManager.GetString("cmdSelectProduct_Text", DoseCalculator.resourceCulture);
        }
        public static get cmdSelectProduct_ToolTip(): string {
            return ResourceManager.GetString("cmdSelectProduct_ToolTip", DoseCalculator.resourceCulture);
        }
        public static get DoseCalci_Tooltip(): string {
            return ResourceManager.GetString("DoseCalci_Tooltip", DoseCalculator.resourceCulture);
        }
        public static get DoseCalMaxValueErrorMsg(): string {
            return ResourceManager.GetString("DoseCalMaxValueErrorMsg", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_ABWAdvisablePart1(): string {
            return ResourceManager.GetString("ErrMsg_ABWAdvisablePart1", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_ABWAdvisablePart2(): string {
            return ResourceManager.GetString("ErrMsg_ABWAdvisablePart2", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_BSAFormulaandCalculateBSA(): string {
            return ResourceManager.GetString("ErrMsg_BSAFormulaandCalculateBSA", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_CalculateAdjBW(): string {
            return ResourceManager.GetString("ErrMsg_CalculateAdjBW", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_CalculateBSA(): string {
            return ResourceManager.GetString("ErrMsg_CalculateBSA", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_CalculateIBW(): string {
            return ResourceManager.GetString("ErrMsg_CalculateIBW", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_ChkQualifiedFrequency(): string {
            return ResourceManager.GetString("ErrMsg_ChkQualifiedFrequency", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_DecimalRoundingRequired(): string {
            return ResourceManager.GetString("ErrMsg_DecimalRoundingRequired", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_GenderNotCompatible(): string {
            return ResourceManager.GetString("ErrMsg_GenderNotCompatible", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_Height_not_available(): string {
            return ResourceManager.GetString("ErrMsg_Height_not_available", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_ManBSAFormula(): string {
            return ResourceManager.GetString("ErrMsg_ManBSAFormula", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_PastWeight(): string {
            return ResourceManager.GetString("ErrMsg_PastWeight", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_ReqDoseUOM(): string {
            return ResourceManager.GetString("ErrMsg_ReqDoseUOM", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_ValidateBSAHeight_NotAvailable(): string {
            return ResourceManager.GetString("ErrMsg_ValidateBSAHeight_NotAvailable", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_ValidateBSAHeight_outdate(): string {
            return ResourceManager.GetString("ErrMsg_ValidateBSAHeight_outdate", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_ValidateBSAHW_NotAvailable(): string {
            return ResourceManager.GetString("ErrMsg_ValidateBSAHW_NotAvailable", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_ValidateBSAHW_outdate(): string {
            return ResourceManager.GetString("ErrMsg_ValidateBSAHW_outdate", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_ValidateBSAWeight_NotAvailable(): string {
            return ResourceManager.GetString("ErrMsg_ValidateBSAWeight_NotAvailable", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_ValidateBSAWeight_Outdate(): string {
            return ResourceManager.GetString("ErrMsg_ValidateBSAWeight_Outdate", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_ValidateHeightIBW(): string {
            return ResourceManager.GetString("ErrMsg_ValidateHeightIBW", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_ValidateHeightIBW_NotAvailable(): string {
            return ResourceManager.GetString("ErrMsg_ValidateHeightIBW_NotAvailable", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_ValidateHeightIBW_outdate(): string {
            return ResourceManager.GetString("ErrMsg_ValidateHeightIBW_outdate", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_ValidateHeightOver60(): string {
            return ResourceManager.GetString("ErrMsg_ValidateHeightOver60", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_ValidateRBWWeight_NotAvailable(): string {
            return ResourceManager.GetString("ErrMsg_ValidateRBWWeight_NotAvailable", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_ValidateRBWWeight_Outdate(): string {
            return ResourceManager.GetString("ErrMsg_ValidateRBWWeight_Outdate", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_ValidateRequestedDose(): string {
            return ResourceManager.GetString("ErrMsg_ValidateRequestedDose", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_ValidateWeight(): string {
            return ResourceManager.GetString("ErrMsg_ValidateWeight", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_ValidateWeightIBW_NotAvailable(): string {
            return ResourceManager.GetString("ErrMsg_ValidateWeightIBW_NotAvailable", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_ValidateWeightIBW_outdate(): string {
            return ResourceManager.GetString("ErrMsg_ValidateWeightIBW_outdate", DoseCalculator.resourceCulture);
        }
        public static get ErrMsg_Weight_not_available(): string {
            return ResourceManager.GetString("ErrMsg_Weight_not_available", DoseCalculator.resourceCulture);
        }
        public static get ErrMsgFrequency_validation(): string {
            return ResourceManager.GetString("ErrMsgFrequency_validation", DoseCalculator.resourceCulture);
        }
        public static get HeightOutOfDate(): string {
            return ResourceManager.GetString("HeightOutOfDate", DoseCalculator.resourceCulture);
        }
        public static get IsEstimated_Text(): string {
            return ResourceManager.GetString("IsEstimated_Text", DoseCalculator.resourceCulture);
        }
        public static get lblAdjBdyWeight_Text(): string {
            return ResourceManager.GetString("lblAdjBdyWeight_Text", DoseCalculator.resourceCulture);
        }
        public static get lblAlwsUseDoseCal_Textr(): string {
            return ResourceManager.GetString("lblAlwsUseDoseCal_Textr", DoseCalculator.resourceCulture);
        }
        public static get lblBasedon_Text(): string {
            return ResourceManager.GetString("lblBasedon_Text", DoseCalculator.resourceCulture);
        }
        public static get lblBSA_Text(): string {
            return ResourceManager.GetString("lblBSA_Text", DoseCalculator.resourceCulture);
        }
        public static get lblBSAFormula_Text(): string {
            return ResourceManager.GetString("lblBSAFormula_Text", DoseCalculator.resourceCulture);
        }
        public static get lblBsaformula_textr(): string {
            return ResourceManager.GetString("lblBsaformula_textr", DoseCalculator.resourceCulture);
        }
        public static get lblCalcAmtPerDose_Text(): string {
            return ResourceManager.GetString("lblCalcAmtPerDose_Text", DoseCalculator.resourceCulture);
        }
        public static get lblCalcDose_Text(): string {
            return ResourceManager.GetString("lblCalcDose_Text", DoseCalculator.resourceCulture);
        }
        public static get lblDfltwttype_textr(): string {
            return ResourceManager.GetString("lblDfltwttype_textr", DoseCalculator.resourceCulture);
        }
        public static get lblDosecalBsedon_textr(): string {
            return ResourceManager.GetString("lblDosecalBsedon_textr", DoseCalculator.resourceCulture);
        }
        public static get lblDoseCalcDetails_Text(): string {
            return ResourceManager.GetString("lblDoseCalcDetails_Text", DoseCalculator.resourceCulture);
        }
        public static get lblDosecalculation_header(): string {
            return ResourceManager.GetString("lblDosecalculation_header", DoseCalculator.resourceCulture);
        }
        public static get lblDosecalculation_Text(): string {
            return ResourceManager.GetString("lblDosecalculation_Text", DoseCalculator.resourceCulture);
        }
        public static get lblDoseCalfr_textr(): string {
            return ResourceManager.GetString("lblDoseCalfr_textr", DoseCalculator.resourceCulture);
        }
        public static get lblDoseCapApplied_Text(): string {
            return ResourceManager.GetString("lblDoseCapApplied_Text", DoseCalculator.resourceCulture);
        }
        public static get lblFrequency_Text(): string {
            return ResourceManager.GetString("lblFrequency_Text", DoseCalculator.resourceCulture);
        }
        public static get lblfrqnc_textr(): string {
            return ResourceManager.GetString("lblfrqnc_textr", DoseCalculator.resourceCulture);
        }
        public static get lblGestationAge_Text(): string {
            return ResourceManager.GetString("lblGestationAge_Text", DoseCalculator.resourceCulture);
        }
        public static get lblHeader_Text(): string {
            return ResourceManager.GetString("lblHeader_Text", DoseCalculator.resourceCulture);
        }
        public static get lblHeight_Text(): string {
            return ResourceManager.GetString("lblHeight_Text", DoseCalculator.resourceCulture);
        }
        public static get lblIdealWeight_Text(): string {
            return ResourceManager.GetString("lblIdealWeight_Text", DoseCalculator.resourceCulture);
        }
        public static get lblIndDose_Text(): string {
            return ResourceManager.GetString("lblIndDose_Text", DoseCalculator.resourceCulture);
        }
        public static get lblOrderedAmtPerDose_Text(): string {
            return ResourceManager.GetString("lblOrderedAmtPerDose_Text", DoseCalculator.resourceCulture);
        }
        public static get lblOverrideReason_Text(): string {
            return ResourceManager.GetString("lblOverrideReason_Text", DoseCalculator.resourceCulture);
        }
        public static get lblPerDose_Text(): string {
            return ResourceManager.GetString("lblPerDose_Text", DoseCalculator.resourceCulture);
        }
        public static get lblRecWeight_Text(): string {
            return ResourceManager.GetString("lblRecWeight_Text", DoseCalculator.resourceCulture);
        }
        public static get lblReqdos_textr(): string {
            return ResourceManager.GetString("lblReqdos_textr", DoseCalculator.resourceCulture);
        }
        public static get lblRoundTo_Text(): string {
            return ResourceManager.GetString("lblRoundTo_Text", DoseCalculator.resourceCulture);
        }
        public static get lblTotalDailyDose_Text(): string {
            return ResourceManager.GetString("lblTotalDailyDose_Text", DoseCalculator.resourceCulture);
        }
        public static get lblWeight_Text(): string {
            return ResourceManager.GetString("lblWeight_Text", DoseCalculator.resourceCulture);
        }
        public static get lblWeightOption_Text(): string {
            return ResourceManager.GetString("lblWeightOption_Text", DoseCalculator.resourceCulture);
        }
        public static get lbReasForOver_Text(): string {
            return ResourceManager.GetString("lbReasForOver_Text", DoseCalculator.resourceCulture);
        }
        public static get Lorenzo_Title(): string {
            return ResourceManager.GetString("Lorenzo_Title", DoseCalculator.resourceCulture);
        }
        public static get OptABW_Text(): string {
            return ResourceManager.GetString("OptABW_Text", DoseCalculator.resourceCulture);
        }
        public static get OptABW_ToolTip(): string {
            return ResourceManager.GetString("OptABW_ToolTip", DoseCalculator.resourceCulture);
        }
        public static get OptBSA_Text(): string {
            return ResourceManager.GetString("OptBSA_Text", DoseCalculator.resourceCulture);
        }
        public static get OptBSA_ToolTip(): string {
            return ResourceManager.GetString("OptBSA_ToolTip", DoseCalculator.resourceCulture);
        }
        public static get OptDailyDoseReq_Text(): string {
            return ResourceManager.GetString("OptDailyDoseReq_Text", DoseCalculator.resourceCulture);
        }
        public static get OptDailyDoseReq_ToolTip(): string {
            return ResourceManager.GetString("OptDailyDoseReq_ToolTip", DoseCalculator.resourceCulture);
        }
        public static get OptIBW_Text(): string {
            return ResourceManager.GetString("OptIBW_Text", DoseCalculator.resourceCulture);
        }
        public static get OptIBW_ToolTip(): string {
            return ResourceManager.GetString("OptIBW_ToolTip", DoseCalculator.resourceCulture);
        }
        public static get OptIndividualDoseReq_Text(): string {
            return ResourceManager.GetString("OptIndividualDoseReq_Text", DoseCalculator.resourceCulture);
        }
        public static get OptIndividualDoseReq_ToolTip(): string {
            return ResourceManager.GetString("OptIndividualDoseReq_ToolTip", DoseCalculator.resourceCulture);
        }
        public static get OptRecordedWeight_Text(): string {
            return ResourceManager.GetString("OptRecordedWeight_Text", DoseCalculator.resourceCulture);
        }
        public static get OptRecordedWeight_ToolTip(): string {
            return ResourceManager.GetString("OptRecordedWeight_ToolTip", DoseCalculator.resourceCulture);
        }
        public static get OptWeight_Text(): string {
            return ResourceManager.GetString("OptWeight_Text", DoseCalculator.resourceCulture);
        }
        public static get OptWeight_ToolTip(): string {
            return ResourceManager.GetString("OptWeight_ToolTip", DoseCalculator.resourceCulture);
        }
        public static get OrdAmtZeroErrorMsg(): string {
            return ResourceManager.GetString("OrdAmtZeroErrorMsg", DoseCalculator.resourceCulture);
        }
        public static get PerDayText(): string {
            return ResourceManager.GetString("PerDayText", DoseCalculator.resourceCulture);
        }
        public static get PerDoseText(): string {
            return ResourceManager.GetString("PerDoseText", DoseCalculator.resourceCulture);
        }
        public static get Recalculate_Text(): string {
            return ResourceManager.GetString("Recalculate_Text", DoseCalculator.resourceCulture);
        }
        public static get Recalculate_Tooltip(): string {
            return ResourceManager.GetString("Recalculate_Tooltip", DoseCalculator.resourceCulture);
        }
        public static get RecalculateErrMsg(): string {
            return ResourceManager.GetString("RecalculateErrMsg", DoseCalculator.resourceCulture);
        }
        public static get RequestedDose_Text(): string {
            return ResourceManager.GetString("RequestedDose_Text", DoseCalculator.resourceCulture);
        }
        public static get ToolTip_ABWAdvisable(): string {
            return ResourceManager.GetString("ToolTip_ABWAdvisable", DoseCalculator.resourceCulture);
        }
        public static get txtOrderedAmtDose_ToolTip(): string {
            return ResourceManager.GetString("txtOrderedAmtDose_ToolTip", DoseCalculator.resourceCulture);
        }
        public static get txtRequestedDose_ToolTip(): string {
            return ResourceManager.GetString("txtRequestedDose_ToolTip", DoseCalculator.resourceCulture);
        }
        public static get UOM_Text(): string {
            return ResourceManager.GetString("UOM_Text", DoseCalculator.resourceCulture);
        }
        public static get UpdatePatient_Text(): string {
            return ResourceManager.GetString("UpdatePatient_Text", DoseCalculator.resourceCulture);
        }
        public static get UpdatePatient_ToolTip(): string {
            return ResourceManager.GetString("UpdatePatient_ToolTip", DoseCalculator.resourceCulture);
        }
        public static get WeightOutOfDate(): string {
            return ResourceManager.GetString("WeightOutOfDate", DoseCalculator.resourceCulture);
        }
    }