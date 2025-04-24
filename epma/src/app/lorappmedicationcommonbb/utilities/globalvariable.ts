import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection } from 'epma-platform/models';
import { AppDialog, Color } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { CValuesetTerm } from 'src/app/shared/epma-platform/soap-client/CReferenceWS';
import { MedDrugDetailsParams } from '../model/meddrugdetailsparams';
  
    export class WebServiceURLMedicationCommonBB {
        public static ManagePrescriptionWS: string;
        public static MedicationMgmtWS: string;
        public static MedicationAdministrationWS: string;
        public static IPPMAManagePrescriptionWS: string;
        public static ManageSecurityWS: string;
        public static ManageProblemWS: string;
        public static ManageAllergyWS: string;
        public static QueryInpatientWS: string;
        public static SecurityAuthenticationWS: string;
    }
    export class MedDrugDetailsInputParam {
        public static DrugDetailsInputParams: MedDrugDetailsParams;
    }
    export class CommonDomainValues {
        public static MedicationClerking: ObservableCollection<CValuesetTerm>;
        public static BSAFormula: ObservableCollection<CValuesetTerm>;
    }
    export class MedChartData {
        public static ServiceOID: number;
        public static LocationOID: number;
        private static _AsRequiredSlotsColor: Color;
        public static set AsRequiredSlotsColor(value: Color) {
            MedChartData._AsRequiredSlotsColor = value;
        }
        public static get AsRequiredSlotsColor(): Color {
            return MedChartData._AsRequiredSlotsColor;
        }
        public static DueSlotsColor: Color;
        public static OmittedSlotsColor: Color;
        public static OverDueSlotsColor: Color;
        public static TodayOutlineColor: Color;
        public static DuenessThreshold: number = 0;
        public static IsAllergyRecorded: boolean = false;
    }