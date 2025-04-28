import {
  ObservableCollection,
  CListItem,  
  PrintConfigurationData
} from 'epma-platform/models';
import 'epma-platform/stringextension';
import { Dictionary } from 'epma-platform/dictionary';
import * as IPPManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { CValuesetTerm } from 'src/app/shared/epma-platform/soap-client/CReferenceWS';
import { AddPrescribingConfigData, CChartDisplayConfig, CMedicationLineDisplayData, CSlotCharacteristicsConfig, MedDrugDisplayConfigData, MedDrugInfoData, MedicationResultsViewCount, MedicationSearchConfigData, MedicationViewConfigData, PrescribingConfigData } from 'src/app/lorappslprofiletypes/medication';

    export class MedicationCommonProfileData {
        public static MedViewConfig: MedicationViewConfigData;
        public static _MedLineDisplay: CMedicationLineDisplayData;
        public static get MedLineDisplay(): CMedicationLineDisplayData {
            return MedicationCommonProfileData._MedLineDisplay;
        }
        public static set MedLineDisplay(value: CMedicationLineDisplayData) {
            MedicationCommonProfileData._MedLineDisplay = value;
            console.log('MedicationCommonProfileData.setter', value, new Date().getTime());
        }
        public static MedConflictConfig: IPPManagePrescSer.MedicationConflictConfig;
        public static MedSearchConfig: MedicationSearchConfigData;
        public static PrescribeConfig: PrescribingConfigData;
        public static SlotCharacteristicsConfig: CSlotCharacteristicsConfig;
        public static MedResultConfig: MedicationResultsViewCount;
        public static MedDrugDisplayConfig: MedDrugDisplayConfigData;
        public static MedDrugInfoData: MedDrugInfoData;
        public static AddPrescribingConfig: AddPrescribingConfigData;
        public static ChartDisplayConfig: CChartDisplayConfig;
        public static PrintConfig: PrintConfigurationData;
    }
    export class WarningConceptCode {
        public static ConceptData: ObservableCollection<CValuesetTerm>;
        public static WarningCategoriesData: ObservableCollection<CValuesetTerm>;
    }
    export class MedicationCommonConceptCodeData {
        public static ConceptCodes: ObservableCollection<CValuesetTerm>;
        public static ConceptCodedispense: ObservableCollection<CValuesetTerm>;
        public static ViewConceptCodes: ObservableCollection<CValuesetTerm>;
        public static MedAdminSlotStatus: ObservableCollection<CValuesetTerm>;
    }
    export class MedDoseTypeConceptCodeData {
        public static ConceptCodes: Dictionary<string, string>;
    }
    export class InfusionTypeConceptCodeData {
        public static ConceptCodes: ObservableCollection<CValuesetTerm>;
    }
    export class InfActionsConceptCodeData {
        public static ConceptCodes: ObservableCollection<CValuesetTerm>;
    }
    export class InfStrikethroughConceptCodeData {
        public static ConceptCodes: ObservableCollection<CValuesetTerm>;
    }
    export class InfStrikethroughReasonsConceptCodeData {
        public static ConceptCodes: ObservableCollection<CValuesetTerm>;
    }
    export class InfHumdificationConceptCodeData {
        public static ConceptCodes: ObservableCollection<CListItem>;
    }
    export class DRCErrorCodeConceptCodeData {
        public static ConceptCodes: ObservableCollection<CListItem>;
    }
    export class ReviewAfterUOMList {
        public static ConceptCodes: ObservableCollection<CListItem>;
    }
    export class ConflictsReasonConceptCodeData {
        public static ConceptCodes: ObservableCollection<CListItem>;
    }
    export class IndicationOverrideReason {
        public static ConceptCodes: ObservableCollection<CListItem>;
    }
    export class TitratedDoseInstructions {
        public static ConceptCodes: ObservableCollection<CListItem>;
    }
    export class RequestUrgency {
        public static ConceptCodes: Dictionary<string, string>;
    }
    export class ReviewAfterUOMListConceptCodeData {
        public static ConceptCodes: ObservableCollection<CValuesetTerm>;
    }
    export class DispenseStatusListConceptCodeData {
        public static ConceptCodes: ObservableCollection<CValuesetTerm>;
    }
    export class DoseCalcConceptCodeData {
        public static ConceptCodes: ObservableCollection<CValuesetTerm>;
    }
    export class DCOverridereasonConceptCodes {
        public static ConceptCodes: ObservableCollection<CValuesetTerm>;
    }
    export class DCReqDoseSecondUOMConceptCodes {
        public static ConceptCodes: ObservableCollection<CValuesetTerm>;
    }
    export class DCForConceptCodes {
        public static ConceptCodes: ObservableCollection<CValuesetTerm>;
    }