import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { BSAFormulaConfigData, CChartDisplayConfig, CChartSettingsConfig, CClinicalIncidentConfig, CMedicationLineDisplayData, CSlotCharacteristicsConfig, InfusionPresConfigData } from 'src/app/lorappslprofiletypes/medication';
import { MedicationConflictConfig } from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
  
    export class ProfileData {
        public static SlotCharacteristicsConfig: CSlotCharacteristicsConfig;
        public static ChartDisplayConfig: CChartDisplayConfig;
        public static BSAFormulaConfig: BSAFormulaConfigData;
        public static MedConflictConfig: MedicationConflictConfig;
        public static ClinicalIncidentConfig: CClinicalIncidentConfig;
        public static MedLineDisplay: CMedicationLineDisplayData;
        public static ChartSettingsConfig: CChartSettingsConfig;
        public static InfusionPresConfig: InfusionPresConfigData;
    }
    export class UserPermissions {
        public static CanPrescribe: boolean;
        public static CanPrintMedChart: boolean;
        public static CanRecordPGD: boolean;
        public static CanmanageSelfadministration: boolean;
        public static CanManageMedAdministration: boolean;
        public static CanOmitSlots: boolean;
        public static CanReinstateSlots: boolean;
        public static CanEnterTitratedDose: boolean;
        public static CanViewObservations: boolean;
        public static CanViewResults: boolean;
        public static CanEnterObservations: boolean;
        public static CanEnterResults: boolean;
        public static CanModifyObservations: boolean;
        public static CanCancelObservations: boolean;
        public static Cancanceldiscontinuedrugs: boolean;
        public static CancanceldiscontinuedOwnrugs: boolean;
        public static CanAmend: boolean;
        public static CanPrescribeInpatient: boolean;
        public static CanPrescribeDischarge: boolean;
        public static CanViewFBChart: boolean;
        public static CanEnableFBChart: boolean;
        public static CanTechnicallyValidate: boolean;
        public static CanRequestMedication: boolean;
        public static CanClinicallyVerfiy: boolean;
        public static CanReview: boolean;
    }
