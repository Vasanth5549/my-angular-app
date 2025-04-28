import DateTime from 'epma-platform/DateTime';
import { ObservableCollection } from './observable-collection';

export enum ClerkFormViewDeftBehaviour
{
    LaunchFormNoMandatory = "LaunchFormNoMandatory",
    LaunchFormMandatory = "LaunchFormMandatory",
    DoNotLaunchForm = "DoNotLaunchForm",
    None = "None"
}

export class ContextInfo
{
    public static SecurityToken : string  = '';
    public static UserOID : number;
    public static MenuCode : string  = '';
    public static ReleaseVersion : string  = '';
    public static Culture : string  = '';
}
export class PatientContext
{
    public static PatientOID : number = 0;
    public static PatientAge : string = '';
    public static EncounterOid : number = 0;
    public static EncounterType : string = '';
    public static EncounterCode : string = '';
    public static Sex : string = '';
    public static DOB : string = '';
    public static PrescriptionType : string = '';
    public static BSA : string = '';
    public static PatientWEIGHT : string = '';
    public static IsTurnONDRC : boolean = true;  
    public static Age : number = 0;
    public static MergedPatientOID : number = 0;
    public static IsMergedPatient : string = '';
    public static PrescriptionMCVersionNo : string = '';
    public static PrescriptionIdentyType : string = '';
    public static PrescriptionIdentifyingOID : number = 0;
    public static PrescriptionItemOID : number = 0;
    public static EncounterStartDate : DateTime;
    public static EncounterStartDateTime : DateTime;
    public static IsAgeSexFilledforConflict : boolean = false;
    public static bIsDrugRoundvw : boolean = false;
    public static RoleProfileOID : string = '';
    public static PrescriptionOID : string = '';
    public static IPPMADU : boolean = true;
    public static TTOPBBDU : boolean = true;     
    public static IsINFUSIONON : boolean = true;  
    public static PrescriptionMCitemlist : string = '';
    public static PatientSealBreakExists : boolean = false;
    public static TTOPBBDU_P2 : boolean = false;
    public static IPPMADU_P2 : boolean = false;
    public static IsEstimatedDOB : boolean = false;
    public static PatientWeightRecordedOn : string = '';
    public static PatientHeightRecordedOn : string = '';
    public static BSAFormula : string = '';
    public static BSAFormulaCode : string = '';
    public static CalculatedBSA : number = 0;
    public static ClerkFormViewDefaultBehavior : ClerkFormViewDeftBehaviour;
    public static IdentifyingOids : string = '';
    public static IdentifyingTypes : string = '';
    public static isEstimatedWeight : boolean;
    public static isEstimatedHeight : boolean;
    public static PatientHEIGHT : string = '';
    public static IsPDSTraced : boolean;
    public static PatientHeightDTTM : DateTime;
    public static PatientWeightDTTM : DateTime;
    public static PatLatHWDTTM : DateTime;
    public static EncounterStatusCode : string = '';
    public static PatientPASID : string = '';
    public static IsFromEPR : boolean;
    public static IsPatientTranferAct : string = ''; 
}

export class AppContextInfo
{
    public static OrganisationName : string = '';
    public static OrganisationOID : string = '';
    public static JobRoleOID : string = '';
    public static JobRoleName : string = '';
    public static RoleProfileName : string = '';
    public static SpecialtyOID : string = '';
    public static TeamNames : string = '';
    public static TeamOIDs : string = '';
    public static UserOID : string = '';
    public static UserName : string = ''; 
}


export class WebServiceURLBB
{        
    public static QueryPatientRecordWS : string = '';
    public static CReferenceWSWS : string = '';
}

export class AppSessionInfo
{
    public static AMCV : string = '';
} 

export class ArrayOfString extends ObservableCollection<string> {}
export class ArrayOfDateTime extends ObservableCollection<Date> {}
export class ArrayOfLong extends ObservableCollection<number> {}   