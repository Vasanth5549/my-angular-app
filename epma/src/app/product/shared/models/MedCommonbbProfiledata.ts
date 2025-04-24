import { CListItem } from "epma-platform/models";
import { CValuesetTerm } from "./Commonbbcreference";
import { MedicationConflictConfig } from "./ippmamanageprescriptionws";
import { AddPrescribingConfigData, CChartDisplayConfig, CMedicationLineDisplayData, CSlotCharacteristicsConfig, MedDrugDisplayConfigData, MedDrugInfoData, MedicationResultsViewCount, MedicationSearchConfigData, MedicationViewConfigData, PrescribingConfigData } from "./medication";

export class MedicationCommonProfileData
{
    static _MedViewConfig:MedicationViewConfigData;    
    public static get MedViewConfig(): MedicationViewConfigData {
        return MedicationCommonProfileData._MedViewConfig;
    }
    public static set MedViewConfig(value: MedicationViewConfigData) {
        MedicationCommonProfileData._MedViewConfig = value;
    }

    static _MedLineDisplay:CMedicationLineDisplayData;
    public static get MedLineDisplay(): CMedicationLineDisplayData {
        return MedicationCommonProfileData._MedLineDisplay;
    }
    public static set MedLineDisplay(value: CMedicationLineDisplayData) {
        MedicationCommonProfileData._MedLineDisplay = value;
    }

    static _MedConflictConfig:MedicationConflictConfig;
    //IPPManagePrescSer.MedicationConflictConfig
    public static get MedConflictConfig(): MedicationConflictConfig {
        return MedicationCommonProfileData._MedConflictConfig;
    }
    public static set MedConflictConfig(value: MedicationConflictConfig) {
        MedicationCommonProfileData._MedConflictConfig = value;
    }
    
    static _MedSearchConfig:MedicationSearchConfigData;
    public static get MedSearchConfig(): MedicationSearchConfigData {
        return MedicationCommonProfileData._MedSearchConfig;
    }
    public static set MedSearchConfig(value: MedicationSearchConfigData) {
        MedicationCommonProfileData._MedSearchConfig = value;
    }

    static _PrescribeConfig:PrescribingConfigData;
    public static get PrescribeConfig(): PrescribingConfigData {
        return MedicationCommonProfileData._PrescribeConfig;
    }
    public static set PrescribeConfig(value: PrescribingConfigData) {
        MedicationCommonProfileData._PrescribeConfig = value;
    }

    static _SlotCharacteristicsConfig:CSlotCharacteristicsConfig;
    public static get SlotCharacteristicsConfig(): CSlotCharacteristicsConfig {
        return MedicationCommonProfileData._SlotCharacteristicsConfig;
    }
    public static set SlotCharacteristicsConfig(value: CSlotCharacteristicsConfig) {
        MedicationCommonProfileData._SlotCharacteristicsConfig = value;
    }

    static _MedResultConfig:MedicationResultsViewCount;
    public static get MedResultConfig(): MedicationResultsViewCount {
        return MedicationCommonProfileData._MedResultConfig;
    }
    public static set MedResultConfig(value: MedicationResultsViewCount) {
        MedicationCommonProfileData._MedResultConfig = value;
    }

    static _MedDrugDisplayConfig:MedDrugDisplayConfigData;
    public static get MedDrugDisplayConfig(): MedDrugDisplayConfigData {
        return MedicationCommonProfileData._MedDrugDisplayConfig;
    }
    public static set MedDrugDisplayConfig(value: MedDrugDisplayConfigData) {
        MedicationCommonProfileData._MedDrugDisplayConfig = value;
    }

    static _MedDrugInfoData:MedDrugInfoData;
    public static get MedDrugInfoData(): MedDrugInfoData {
        return MedicationCommonProfileData._MedDrugInfoData;
    }
    public static set MedDrugInfoData(value: MedDrugInfoData) {
        MedicationCommonProfileData._MedDrugInfoData = value;
    }

    static _AddPrescribingConfig:AddPrescribingConfigData;
    public static get AddPrescribingConfig(): AddPrescribingConfigData {
        return MedicationCommonProfileData._AddPrescribingConfig;
    }
    public static set AddPrescribingConfig(value: AddPrescribingConfigData) {
        MedicationCommonProfileData._AddPrescribingConfig = value;
    }

    static _ChartDisplayConfig:CChartDisplayConfig;
    public static get ChartDisplayConfig(): CChartDisplayConfig {
        return MedicationCommonProfileData._ChartDisplayConfig;
    }
    public static set ChartDisplayConfig(value: CChartDisplayConfig) {
        MedicationCommonProfileData._ChartDisplayConfig = value;
    }

}

export class WarningConceptCode
{
    static _ConceptData:CValuesetTerm[];
    public static get ConceptData(): CValuesetTerm[] {
        return WarningConceptCode._ConceptData;
    }
    public static set ConceptData(value: CValuesetTerm[]) {
        WarningConceptCode._ConceptData = value;
    }
    
    static _WarningCategoriesData:CValuesetTerm[];
    public static get WarningCategoriesData(): CValuesetTerm[] {
        return WarningConceptCode._WarningCategoriesData;
    }
    public static set WarningCategoriesData(value: CValuesetTerm[]) {
        WarningConceptCode._WarningCategoriesData = value;
    }

}

export class MedicationCommonConceptCodeData
{
    static _ConceptCodes:CValuesetTerm[];
    public static get ConceptCodes(): CValuesetTerm[] {
        return MedicationCommonConceptCodeData._ConceptCodes;
    }
    public static set ConceptCodes(value: CValuesetTerm[]) {
        MedicationCommonConceptCodeData._ConceptCodes = value;
    }

    static _ConceptCodedispense:CValuesetTerm[];
    public static get ConceptCodedispense(): CValuesetTerm[] {
        return MedicationCommonConceptCodeData._ConceptCodedispense;
    }
    public static set ConceptCodedispense(value: CValuesetTerm[]) {
        MedicationCommonConceptCodeData._ConceptCodedispense = value;
    }

    static _ViewConceptCodes:CValuesetTerm[];
    public static get ViewConceptCodes(): CValuesetTerm[] {
        return MedicationCommonConceptCodeData._ViewConceptCodes;
    }
    public static set ViewConceptCodes(value: CValuesetTerm[]) {
        MedicationCommonConceptCodeData._ViewConceptCodes = value;
    }

    static _MedAdminSlotStatus:CValuesetTerm[];
    public static get MedAdminSlotStatus(): CValuesetTerm[] {
        return MedicationCommonConceptCodeData._MedAdminSlotStatus;
    }
    public static set MedAdminSlotStatus(value: CValuesetTerm[]) {
        MedicationCommonConceptCodeData._MedAdminSlotStatus = value;
    }

}

export class MedDoseTypeConceptCodeData
{
    static _ConceptCodes:Map<string,string>;
    public static get ConceptCodes(): Map<string,string> {
        return MedDoseTypeConceptCodeData._ConceptCodes;
    }
    public static set ConceptCodes(value: Map<string,string>) {
        MedDoseTypeConceptCodeData._ConceptCodes = value;
    }
}

export class InfusionTypeConceptCodeData
{
    static _ConceptCodes:CValuesetTerm[];
    public static get ConceptCodes(): CValuesetTerm[] {
        return InfusionTypeConceptCodeData._ConceptCodes;
    }
    public static set ConceptCodes(value: CValuesetTerm[]) {
        InfusionTypeConceptCodeData._ConceptCodes = value;
    }
}

export class InfActionsConceptCodeData
{
    static _ConceptCodes:CValuesetTerm[];
    public static get ConceptCodes(): CValuesetTerm[] {
        return InfActionsConceptCodeData._ConceptCodes;
    }
    public static set ConceptCodes(value: CValuesetTerm[]) {
        InfActionsConceptCodeData._ConceptCodes = value;
    }
}

export class InfStrikethroughConceptCodeData
{
    static _ConceptCodes:CValuesetTerm[];
    public static get ConceptCodes(): CValuesetTerm[] {
        return InfStrikethroughConceptCodeData._ConceptCodes;
    }
    public static set ConceptCodes(value: CValuesetTerm[]) {
        InfStrikethroughConceptCodeData._ConceptCodes = value;
    }
}

export class InfStrikethroughReasonsConceptCodeData
{
    static _ConceptCodes:CValuesetTerm[];
    public static get ConceptCodes(): CValuesetTerm[] {
        return InfStrikethroughReasonsConceptCodeData._ConceptCodes;
    }
    public static set ConceptCodes(value: CValuesetTerm[]) {
        InfStrikethroughReasonsConceptCodeData._ConceptCodes = value;
    }
}

export class InfHumdificationConceptCodeData
{
    static _ConceptCodes:CListItem[];
    public static get ConceptCodes(): CListItem[] {
        return InfHumdificationConceptCodeData._ConceptCodes;
    }
    public static set ConceptCodes(value: CListItem[]) {
        InfHumdificationConceptCodeData._ConceptCodes = value;
    }
}
//DRC
export class DRCErrorCodeConceptCodeData
{
    static _ConceptCodes:CListItem[];
    public static get ConceptCodes(): CListItem[] {
        return DRCErrorCodeConceptCodeData._ConceptCodes;
    }
    public static set ConceptCodes(value: CListItem[]) {
        DRCErrorCodeConceptCodeData._ConceptCodes = value;
    }
}

export class ReviewAfterUOMList
{
    static _ConceptCodes:CListItem[];
    public static get ConceptCodes(): CListItem[] {
        return ReviewAfterUOMList._ConceptCodes;
    }
    public static set ConceptCodes(value: CListItem[]) {
        ReviewAfterUOMList._ConceptCodes = value;
    }
}

export class ConflictsReasonConceptCodeData
{
    static _ConceptCodes:CListItem[];
    public static get ConceptCodes(): CListItem[] {
        return ConflictsReasonConceptCodeData._ConceptCodes;
    }
    public static set ConceptCodes(value: CListItem[]) {
        ConflictsReasonConceptCodeData._ConceptCodes = value;
    }
}

export class IndicationOverrideReason
{
    static _ConceptCodes:CListItem[];
    public static get ConceptCodes(): CListItem[] {
        return IndicationOverrideReason._ConceptCodes;
    }
    public static set ConceptCodes(value: CListItem[]) {
        IndicationOverrideReason._ConceptCodes = value;
    }
}

export class TitratedDoseInstructions
{
    static _ConceptCodes:CListItem[];
    public static get ConceptCodes(): CListItem[] {
        return TitratedDoseInstructions._ConceptCodes;
    }
    public static set ConceptCodes(value: CListItem[]) {
        TitratedDoseInstructions._ConceptCodes = value;
    }
}

export class RequestUrgency
{
    static _ConceptCodes:Map<string,string>;
    public static get ConceptCodes(): Map<string,string> {
        return RequestUrgency._ConceptCodes;
    }
    public static set ConceptCodes(value: Map<string,string>) {
        RequestUrgency._ConceptCodes = value;
    }
}

export class ReviewAfterUOMListConceptCodeData
{
    static _ConceptCodes:CListItem[];
    public static get ConceptCodes(): CListItem[] {
        return ReviewAfterUOMListConceptCodeData._ConceptCodes;
    }
    public static set ConceptCodes(value: CListItem[]) {
        ReviewAfterUOMListConceptCodeData._ConceptCodes = value;
    }
}

export class DispenseStatusListConceptCodeData
{
    static _ConceptCodes:CValuesetTerm[];
    public static get ConceptCodes(): CValuesetTerm[] {
        return DispenseStatusListConceptCodeData._ConceptCodes;
    }
    public static set ConceptCodes(value: CValuesetTerm[]) {
        DispenseStatusListConceptCodeData._ConceptCodes = value;
    }
}

export class DoseCalcConceptCodeData
{
    static _ConceptCodes:CValuesetTerm[];
    public static get ConceptCodes(): CValuesetTerm[] {
        return DoseCalcConceptCodeData._ConceptCodes;
    }
    public static set ConceptCodes(value: CValuesetTerm[]) {
        DoseCalcConceptCodeData._ConceptCodes = value;
    }
}    

export class DCOverridereasonConceptCodes
{
    static _ConceptCodes:CValuesetTerm[];
    public static get ConceptCodes(): CValuesetTerm[] {
        return DCOverridereasonConceptCodes._ConceptCodes;
    }
    public static set ConceptCodes(value: CValuesetTerm[]) {
        DCOverridereasonConceptCodes._ConceptCodes = value;
    }
}

export class DCReqDoseSecondUOMConceptCodes
{
    static _ConceptCodes:CValuesetTerm[];
    public static get ConceptCodes(): CValuesetTerm[] {
        return DCReqDoseSecondUOMConceptCodes._ConceptCodes;
    }
    public static set ConceptCodes(value: CValuesetTerm[]) {
        DCReqDoseSecondUOMConceptCodes._ConceptCodes = value;
    }
}

export class DCForConceptCodes
{
    static _ConceptCodes:CValuesetTerm[];
    public static get ConceptCodes(): CValuesetTerm[] {
        return DCForConceptCodes._ConceptCodes;
    }
    public static set ConceptCodes(value: CValuesetTerm[]) {
        DCForConceptCodes._ConceptCodes = value;
    }
}

