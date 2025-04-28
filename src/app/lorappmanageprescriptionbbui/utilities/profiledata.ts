import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, decimal, Double, Float, Int64, long, Long, StringComparison, GridConfig, ObservableCollection, CValuesetTerm, MedDrugInfoData } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from '../../shared/epma-platform/soap-client/helper.service';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import * as IPPMAManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS'
import { CChartDisplayConfig, AddPrescribingConfigData,PrescribingMethodConfigData, MedicationSearchConfigData, PrescribingConfigData, ClinicalVerificationConfiguration, PrintConfigurationData, MedDrugDisplayConfigData, ScheduleConfig, CClinicalIncidentConfig, InfusionPresConfigData, InfusDeliveryDevice, BSAFormulaConfigData, GPConnectConfiguration } from 'src/app/lorappslprofiletypes/medication';
  
    export class ProfileData {
        public static PrescribeMethodConfig: PrescribingMethodConfigData;
        public static MedSearchConfig: MedicationSearchConfigData;
        public static PrescribeConfig: PrescribingConfigData;
        public static ClinicalVerifyConfig: ClinicalVerificationConfiguration;
        public static MedConflictConfig: IPPMAManagePrescSer.MedicationConflictConfig;
        public static PrintConfig: PrintConfigurationData;
        public static MedDrugDisplayConfig: MedDrugDisplayConfigData;
        public static ScheduleConfig: ScheduleConfig;
        public static AdditionalPrescConfig: AddPrescribingConfigData;
        public static MedDrugInfoData: MedDrugInfoData;
        public static ResolveGridConfig: GridConfig;
        public static MedListViewGridConfig: GridConfig;
        public static ClinicalIncidentConfig: CClinicalIncidentConfig;
        public static InfusionPresConfig: InfusionPresConfigData;
        public static InfusDeliveryDeviceConfig: InfusDeliveryDevice;
        public static ChartDisplayConfig: CChartDisplayConfig;
        public static IsTransformGPConRequired: number;
        public static BSAFormulaConfig: BSAFormulaConfigData;
        public static GPConnectConfig: GPConnectConfiguration;
    }
    export class ConceptCodeData {
        public static IPPMAPRCTYP: ObservableCollection<CValuesetTerm>;
        public static DISPINS: ObservableCollection<CValuesetTerm>;
        public static RM_UNIT_MEASURE: ObservableCollection<CValuesetTerm>;
        public static MEDCATREASON: ObservableCollection<CValuesetTerm>;
        public static NFREASON: ObservableCollection<CValuesetTerm>;
    }
    export class WarningConceptCode {
        public static ConceptData: ObservableCollection<CValuesetTerm>;
    }
    export class UserPermissions {
        public static CanReorder: boolean;
        public static PrescribeWithRestriction: boolean;
        public static CanHoldUnhold: boolean;
        public static CanAddFavourites: boolean;
        public static Cancanceldiscontinuedrugs: boolean;
        public static CancanceldiscontinuedOwnrugs: boolean;
        public static CanViewObservations: boolean;
        public static CanViewResults: boolean;
        public static CanEnterObservations: boolean;
        public static CanEnterResults: boolean;
        public static CanAuthorise: boolean;
        public static CanPresWithAuth: boolean;
        public static CanAmend: boolean;
        public static CanAccessSealLock: boolean;
        public static CanViewFBChart: boolean;
        public static CanEnableMedChart: boolean;
        public static CanPrescribeDrugs: boolean;
    }