import { GridConfig } from 'epma-platform/models';
import { CValuesetTerm } from './Commonbbcreference';
import { MedicationConflictConfig } from './ippmamanageprescriptionws';
import {
  AddPrescribingConfigData,
  BSAFormulaConfigData,
  CChartDisplayConfig,
  CClinicalIncidentConfig,
  ClinicalVerificationConfiguration,
  CSlotCharacteristicsConfig,
  GPConnectConfiguration,
  InfusDeliveryDevice,
  InfusionPresConfigData,
  MedDrugDisplayConfigData,
  MedDrugInfoData,
  MedicationResultsViewCount,
  MedicationSearchConfigData,
  PrescribingConfigData,
  PrescribingMethodConfigData,
  PrintConfigurationData,
  ScheduleConfig,
} from './medication';

export class ProfileData {
  public static  get PrescribeMethodConfig(): PrescribingMethodConfigData {
    return this.PrescribeMethodConfig;
  }
  public static  set PrescribeMethodConfig(value: PrescribingMethodConfigData) {
    this.PrescribeMethodConfig = value;
  }

  public static  get MedSearchConfig(): MedicationSearchConfigData {
    return this.MedSearchConfig;
  }
  public static  set MedSearchConfig(value: MedicationSearchConfigData) {
    this.MedSearchConfig = value;
  }

  public static  get PrescribeConfig(): PrescribingConfigData {
    return this.PrescribeConfig;
  }
  public static set PrescribeConfig(value: PrescribingConfigData) {
    this.PrescribeConfig = value;
  }

  public static get ClinicalVerifyConfig(): ClinicalVerificationConfiguration {
    return this.ClinicalVerifyConfig;
  }
  public static set ClinicalVerifyConfig(value: ClinicalVerificationConfiguration) {
    this.ClinicalVerifyConfig = value;
  }

  public static get MedResultConfig(): MedicationResultsViewCount {
    return this.MedResultConfig;
  }
  public static set MedResultConfig(value: MedicationResultsViewCount) {
    this.MedResultConfig = value;
  }

  //IPPMAManagePrescSer.MedicationConflictConfig
  public static get MedConflictConfig(): MedicationConflictConfig {
    return this.MedConflictConfig;
  }
  public static set MedConflictConfig(value: MedicationConflictConfig) {
    this.MedConflictConfig = value;
  }

  public static get PrintConfig(): PrintConfigurationData {
    return this.PrintConfig;
  }
  public static set PrintConfig(value: PrintConfigurationData) {
    this.PrintConfig = value;
  }

  public static get MedDrugDisplayConfig(): MedDrugDisplayConfigData {
    return this.MedDrugDisplayConfig;
  }
  public static set MedDrugDisplayConfig(value: MedDrugDisplayConfigData) {
    this.MedDrugDisplayConfig = value;
  }

  public static get ScheduleConfig(): ScheduleConfig {
    return this.ScheduleConfig;
  }
  public static set ScheduleConfig(value: ScheduleConfig) {
    this.ScheduleConfig = value;
  }

  private static _AdditionalPrescConfig: AddPrescribingConfigData;
  public static get AdditionalPrescConfig(): AddPrescribingConfigData {
    return this._AdditionalPrescConfig;
  }
  public static set AdditionalPrescConfig(value: AddPrescribingConfigData) {
    this._AdditionalPrescConfig = value;
  }

  public static get SlotCharacteristicsConfig(): CSlotCharacteristicsConfig {
    return this.SlotCharacteristicsConfig;
  }
  public static set SlotCharacteristicsConfig(value: CSlotCharacteristicsConfig) {
    this.SlotCharacteristicsConfig = value;
  }

  public static get MedDrugInfoData(): MedDrugInfoData {
    return this.MedDrugInfoData;
  }
  public static set MedDrugInfoData(value: MedDrugInfoData) {
    this.MedDrugInfoData = value;
  }

  public static get ResolveGridConfig(): GridConfig {
    return this.ResolveGridConfig;
  }
  public static set ResolveGridConfig(value: GridConfig) {
    this.ResolveGridConfig = value;
  }

  public static get MedListViewGridConfig(): GridConfig {
    return this.MedListViewGridConfig;
  }
  public static set MedListViewGridConfig(value: GridConfig) {
    this.MedListViewGridConfig = value;
  }

  public static get ClinicalIncidentConfig(): CClinicalIncidentConfig {
    return this.ClinicalIncidentConfig;
  }
  public static set ClinicalIncidentConfig(value: CClinicalIncidentConfig) {
    this.ClinicalIncidentConfig = value;
  }

  public static get InfusionPresConfig(): InfusionPresConfigData {
    return this.InfusionPresConfig;
  }
  public static set InfusionPresConfig(value: InfusionPresConfigData) {
    this.InfusionPresConfig = value;
  }

  public static get InfusDeliveryDeviceConfig(): InfusDeliveryDevice {
    return this.InfusDeliveryDeviceConfig;
  }
  public static set InfusDeliveryDeviceConfig(value: InfusDeliveryDevice) {
    this.InfusDeliveryDeviceConfig = value;
  }

  public static get ChartDisplayConfig(): CChartDisplayConfig {
    return this.ChartDisplayConfig;
  }
  public static set ChartDisplayConfig(value: CChartDisplayConfig) {
    this.ChartDisplayConfig = value;
  }

  public static get IsTransformGPConRequired(): number {
    return this.IsTransformGPConRequired;
  }
  public static set IsTransformGPConRequired(value: number) {
    this.IsTransformGPConRequired = value;
  }

  public static get BSAFormulaConfig(): BSAFormulaConfigData {
    return this.BSAFormulaConfig;
  }
  public static set BSAFormulaConfig(value: BSAFormulaConfigData) {
    this.BSAFormulaConfig = value;
  }

  public static get GPConnectConfig(): GPConnectConfiguration {
    return this.GPConnectConfig;
  }
  public static set GPConnectConfig(value: GPConnectConfiguration) {
    this.GPConnectConfig = value;
  }
}

export class ConceptCodeData {
  public static get ConceptCodes(): CValuesetTerm[] {
    return this.ConceptCodes;
  }
  public static set ConceptCodes(value: CValuesetTerm[]) {
    this.ConceptCodes = value;
  }

  public static get IPPMAPRCTYP(): CValuesetTerm[] {
    return this.IPPMAPRCTYP;
  }
  public static set IPPMAPRCTYP(value: CValuesetTerm[]) {
    this.IPPMAPRCTYP = value;
  }

  public static get DISPINS(): CValuesetTerm[] {
    return this.DISPINS;
  }
  public static set DISPINS(value: CValuesetTerm[]) {
    this.DISPINS = value;
  }

  public static get RM_UNIT_MEASURE(): CValuesetTerm[] {
    return this.RM_UNIT_MEASURE;
  }
  public static set RM_UNIT_MEASURE(value: CValuesetTerm[]) {
    this.RM_UNIT_MEASURE = value;
  }

  public static get MEDCATREASON(): CValuesetTerm[] {
    return this.MEDCATREASON;
  }
  public static set MEDCATREASON(value: CValuesetTerm[]) {
    this.MEDCATREASON = value;
  }

  public static get NFREASON(): CValuesetTerm[] {
    return this.NFREASON;
  }
  public static set NFREASON(value: CValuesetTerm[]) {
    this.NFREASON = value;
  }
}

export class WarningConceptCode {
  public static get ConceptData(): CValuesetTerm[] {
    return this.ConceptData;
  }
  public static set ConceptData(value: CValuesetTerm[]) {
    this.ConceptData = value;
  }
}

export class UserPermissions {
  static CanReorder: boolean;
  static PrescribeWithRestriction: boolean;
  static CanHoldUnhold: boolean;
  static CanAddFavourites: boolean;
  static Cancanceldiscontinuedrugs: boolean;
  static CancanceldiscontinuedOwnrugs: boolean;
  static CanViewObservations: boolean;
  static CanViewResults: boolean;
  static CanEnterObservations: boolean;
  static CanEnterResults: boolean;
  static CanAuthorise: boolean;
  static CanPresWithAuth: boolean;
  static CanAmend: boolean;
  static CanAccessSealLock: boolean;
  static CanViewFBChart: boolean;
  static CanEnableMedChart: boolean;
  static CanPrescribeDrugs: boolean;
}
