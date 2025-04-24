import { HtmlPage, StringComparison } from 'epma-platform/models';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import { CommonBB } from './common';
  
    export class ContextInfo {
        public static SecurityToken: string;
        public static UserOID: number;
        public static MenuCode: string;
        public static ReleaseVersion: number;
        public static Culture: string;
    }
    export enum ClerkFormViewDeftBehaviour {
        LaunchFormNoMandatory="LaunchFormNoMandatory",
        LaunchFormMandatory="LaunchFormMandatory",
        DoNotLaunchForm="DoNotLaunchForm",
        None="None",
    }
    export class PatientContext {
        public static PatientOID: number;
        public static PatientAge: string;
        public static EncounterOid: number;
        public static EncounterType: string;
        public static EncounterCode: string;
        public static Sex: string;
        public static DOB: string;
        public static PrescriptionType: string = "CC_MEDCLERK1";
        public static PType:string;
        public static BSA: string;
        public static PatientWEIGHT: string;
        /*[System.ComponentModel.DefaultValue(true)]*/
        public static IsTurnONDRC: boolean;
        public static Age: number;
        public static MergedPatientOID: number;
        public static IsMergedPatient: string;
        public static PrescriptionMCVersionNo: string;
        public static PrescriptionIdentyType: string;
        public static PrescriptionIdentifyingOID: number;
        public static PrescriptionItemOID: number;
        public static EncounterStartDate: DateTime;
        public static EncounterStartDateTime: DateTime;
        public static IsAgeSexFilledforConflict: boolean;
        public static bIsDrugRoundvw: boolean;
        public static RoleProfileOID: string;
        public static PrescriptionOID: string;
        /*[System.ComponentModel.DefaultValue(true)]*/
        public static IPPMADU: boolean;
        /*[System.ComponentModel.DefaultValue(true)]*/
        public static TTOPBBDU: boolean;
        /*[System.ComponentModel.DefaultValue(true)]*/
        public static IsINFUSIONON: boolean;
        public static PrescriptionMCitemlist: string;
        public static PatientSealBreakExists: boolean;
        public static TTOPBBDU_P2: boolean;
        public static IPPMADU_P2: boolean;
        public static IsEstimatedDOB: boolean;
        public static PatientWeightRecordedOn: string;
        public static PatientHeightRecordedOn: string;
        public static BSAFormula: string;
        public static BSAFormulaCode: string;
        public static CalculatedBSA: number;
        public static ClerkFormViewDefaultBehavior: ClerkFormViewDeftBehaviour;
        public static IdentifyingOids: string;
        public static IdentifyingTypes: string;
        public static isEstimatedWeight: boolean;
        public static isEstimatedHeight: boolean;
        public static PatientHEIGHT: string;
        public static IsPDSTraced: boolean;
        public static PatientHeightDTTM: DateTime;
        public static PatientWeightDTTM: DateTime;
        public static PatLatHWDTTM: DateTime;
        public static EncounterStatusCode: string;
        public static PatientPASID: string;
        public static IsFromEPR: boolean;
        public static IsPatientTranferAct: string;
    }
    export class AppContextInfo {
        public static OrganisationName: string;
        public static OrganisationOID: string;
        public static JobRoleOID: string;
        public static JobRoleName: string;
        public static RoleProfileName: string;
        public static SpecialtyOID: string;
        public static TeamNames: string;
        public static TeamOIDs: string;
        public static UserOID: string;
        public static UserName: string;
    }
    /*
    export class BindingObject {
        static bhttpbind: BasicHttpBinding;
        constructor() {
            if (!ObjectHelper.HasValue(CommonBB.IsHTTPS) {
      CommonBB.IsHTTPS =
        HtmlPage.Document.DocumentUri.AbsoluteUri.StartsWith(
          'https',
          StringComparison.InvariantCultureIgnoreCase
        );
            }
    BindingObject.bhttpbind = CommonBB.IsHTTPS.Value
      ? new BasicHttpBinding(BasicHttpSecurityMode.Transport)
      : new BasicHttpBinding();
            BindingObject.bhttpbind.MaxReceivedMessageSize = 2147483647;
        }
        public static GetBasicHttpBindingObject(): BasicHttpBinding {
            return BindingObject.bhttpbind;
        }
    }
    */
    export class WebServiceURLBB {
        public static QueryPatientRecordWS: string;
        public static CReferenceWSWS: string;
    }
    export class AppSessionInfo {
        public static AMCV: string;
    }
