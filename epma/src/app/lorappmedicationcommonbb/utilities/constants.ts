import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
 
    export class CConstants {
        public static Event: string = "Event ";
        public static sDose: string = "Dose ";
        public static sspace: string = " ";
        public static Meter: string = "m";
        public static KG: string = "kg";
        public static LongDateListFormat: string = "dd-MMM-yyyy HH:mm:ss";
        public static LongDateFormat: string = "dd-MMM-yyyy hh:mm:ss";
        public static ShortDateFormat: string = "dd-MMM-yyyy";
        public static ConflictDateFormat: string = "dd-MMM-yyyy HH:mm:00";
        public static LongDateWithoutSecs: string = "dd-MMM-yyyy HH:mm";
        public static Timeformat: string = "HH:mm";
        public static Precatalog: string = "PRESCRIPTIONNONCATALOGUE";
        public static Fordrug: string = "formulary drug";
        public static NonCatitem: string = "non-catalogue item";
        public static DRUGDUPLICATION: string = "CC_DRUG_DUPLICATION";
        public static DRUG_DUPL_CHK: string = "CC_DUPL_CHK";
        public static DRUGCONTRA: string = "CC_DRUG_CONTRA";
        public static DRUGINTRACT: string = "CC_DRUG_INTRACT";
        public static DRUG_INTERACTIONS: string = "CC_INTERACTIONS";
        public static sInteract: string = "Drug interaction";
        public static sDuplication: string = "Drug duplication";
        public static sAllergy: string = "Drug allergy";
        public static sContraIndication: string = "Drug contraindication";
        public static sDrugContraIndication: string = "Contraindication";
        public static sPrecaution: string = "Precaution";
        public static SecondaryScreen: string = "SECONDARYSCREEN";
        public static OnceOnlyFrequency: string = "CC_IPONCENLY";
        public static CONST_QUANTITY: string = "CC_QUANTITY";
        public static Supplycomments: string = "CC_SupplyComments";
        public static AMENDED: string = "MEDStatus1";
        public static CANCELLED: string = "MEDStatus2";
        public static DISCONTINUED: string = "MEDStatus3";
        public static ISSUED: string = "MEDStatus4";
        public static DISPENSED: string = "MEDStatus5";
        public static SUBMITTED: string = "MEDStatus6";
        public static AWAITINGAUTHORISE: string = "MEDStatus7";
        public static AUTOVERIFIED: string = "MEDStatus9";
        public static CLINICALLYVERIFIED: string = "MEDStatus10";
        public static TECHNICALLYVALIDATED: string = "MEDStatus11";
        public static NOTAUTHORISED: string = "MEDStatus12";
        public static ONHOLD: string = "MEDStatus13";
        public static COMPLETED: string = "MEDStatus14";
        public static CancelledStatusTermText: string = "Cancelled";
        public static DiscontinueStatusTermText: string = "Discontinued";
        public static CompletedStatusTermText: string = "Completed";
        public static CATALOGUEITEM: string = "CATALOGUEITEM";
        public static VIRTUALPRODUCT: string = "VIRTUALPRODUCT";
        public static ACTUALPRODUCT: string = "ACTUALPRODUCT";
        public static ACTUALMOIETY: string = "ACTUALMOIETY";
        public static EncountersPageSize: number = 20;
        public static TitratedgridSize: number = 7;
        public static ReviewDomainCode: string = "";
        public static Collapsed: string = "Collapsed";
        public static MULTIROUTEDILIMITER: string = "/ ";
        public static MULTIROUTE_ROUTES: string = '|';
        public static MULTIROUTE_ROUTE: string = '~';
        public static MULTIROUTEOIDDILIMITER: string = ",";
        public static NONCATALOGUEITEM: string = "NONCATALOGUEITEM";
        public static HighRisk: string = "High risk";
        public static AllProducts: string = "All products";
        public static HighRisk_CC: string = "CC_HIGHRISK";
        public static AllChild_CC: string = "CC_OCCRALLCHILD";
        public static SomeChild_CC: string = "CC_OCCRSOMECHILD";
        public static WarningIcon: string = "iwarninginfonor16.png";
        public static SUBTYPE: string = "CC_MULCMPNTITM";
        public static NOTANPREDEFMCI: string = "Multiple component item";
        public static PatConf_Problem: string = "CC_PCPRB";
        public static PatConf_Allergy: string = "CC_PCALLERGY";
        public static ONESTOPSUPPLYINS: string = "CC_ONESTOP";
        public static ONESTOPSUPPLYINSTEXT: string = "One stop dispensed";
        public static ADHOC_ITEM_LORENZOID: string = "PI-001";
        public static ml: string = "UOM-25";
        public static litre: string = "UOM-7";
        public static hour: string = "UOM-46";
        public static minute: string = "UOM-43";
        public static CodingSchemeName: string = "LORENZO";
        public static Version: string = "1.0";
        public static FilterType: string = "A";
        public static IsBoydWeightFormula: string = "CC_BOYDWGT";
        public static BSAUOM: string = " m\xB2";
        public static WeightCode: string = "CC_MEDWEIGHT";
        public static HeightCode: string = "CC_MEDHEIGHT";
        public static DayCode: string = "CC_MEDDRSN1";
        public static MonthCode: string = "CC_MEDRSN3";
        public static YearCode: string = "CC_MEDRSN4";
        public static WeekCode: string = "CC_MEDDRSN2";
        public static WeekDuration: number = 7;
        public static MonthDuration: number = 30;
        public static YearDuration: number = 365;
        public static NoOfDaysInMonth: number = 28;
        public static KgCode: string = "CC_MEDKG";
        public static M2Code: string = "CC_MEDM2";
        public static MaleSexConceptCode: string = "CC_Male";
        public static FemaleSexConceptCode: string = "CC_Female";
        public static dbPatientHeightLimit: number = 60;
        public static dbPercentageCalc: number = 100;
        public static DailyDose: string = "CC_MED_DLYDOSE";
        public static BSACode: string = "CC_BSA";
        public static KGUOM: string = "Kg";
        public static RecordedWeightConceptCode: string = "CC_RBW";
        public static IBWConceptCode: string = "CC_IBW";
        public static ABWConceptCode: string = "CC_ABW";
        public static PerDose: string = "CC_MED_PERDOSE";
        public static FrequencyOptionCode: string = "FrequencyName";
        public static DoseUOMOptionCode: string = "ToDoseUOM";
        public static ConPoundToKg: number = 2.2046;
        public static ConGrmToKg: number = 1000;
        public static sDoseIcon: string = "DoseIcon";
        public static sEPR: string = "EPR";
        public static sIsHavingtime: string = "1";
        public static sIsHavingtimeZero: string = "0";
        public static High: string = "CC_High";
        public static Medium: string = "CC_Medium";
        public static Low: string = "CC_RFLOW";
        public static NoUrgency: string = "CC_NOURGENCY";
        public static ReqMedIconToolTip: string = "Select request medication to view full details.";
        public static RequestedBy: string = "Requested by ";
        public static On: string = "on ";
        public static Urgency: string = "Urgency: ";
        public static Requestcomments: string = "Request comments: ";
        public static RequestcommentsTooltip: string = "Request comments";
        public static ClinicallyVerifyMenuCode: string = "MED_CA_CLN_VRFY_SL_P2";
        public static TechnicallyValidateMenuCode: string = "MN_MED_VALIDATE_S_P2";
        public static Dose: string = "Dose ";
        public static CompositeUOM: string = "compound";
        public static LockDuration: number = 30;
        public static LockErrorcode: string = "900038";
        public static NO_OF_MINUTESPER_DAY: number = 1440;
        public static NO_OF_DAYS_INCREASED: number = 6;
        public static SelectReason: string = "Select reason";
        public static ZeroQuantity: string = "No Supply Required";
        public static TooltipFrom: string = "From:";
        public static TooltipComments: string = "Comments:";
        public static TooltipOmittedBy: string = "Omitted by:";
        public static TooltipReviewcomments: string = "Review comments :";
        public static TooltipReviewRequestedBy: string = "Review requested by:";
        public static ReviewGeneralType: string = "CC_GENREW";
        public static ReviewOmittedType: string = "CC_OMTREW";
        public static GeneralText: string = "GENERAL";
        public static GeneralReview: string = "CC_GENREW";
        public static OmitReview: string = "CC_OMTREW";
        public static Schedulefurtherreview: string = "CC_REWSFV";
        public static Nofurtherreviewrequired: string = "CC_REWNFREW";
        public static Discontinueprescriptionitem: string = "CC_REWDIS";
        public static Reinstatemedication: string = "CC_REWREINS";
        public static Amendedmedication: string = "CC_REWAMD";
        public static Completedmedication: string = "CC_REWCOM";
        public static Doses: string = "CC_DOSES";
        public static Ordersetmezzanine: string = "ORDERSETMEZZANINE";
        public static DispStRequestSent: string = "CC_MEDCLMSREQSENT";
        public static DispStCancelledEPR: string = "CC_MEDCLMSCANCEPR";
        public static DispStCancelled: string = "CC_MEDCLMSCANC";
        public static DispStIssued: string = "CC_MEDCLMSISSUED";
        public static TotDailydose: string = "CC_MED_DLYDOSE";
        public static IndDose: string = "CC_MED_PERDOSE";
        public static ClosedEncounterCode: string = "CC_ENCCLOSED";
        public static Appliance: string = "CC_APPLIANCE";
        public static ItemSubType: string = "CC_MULCMPNTITM";
        public static sWarning: string = "Warning";
        public static sAbsolute: string = "Always show";
        public static sGeneric: string = "Generic";
        public static CADisCancelPresChart: string = "CA_DisCancelPresChart";
    }
    export class FieldNames {
        public static DurationUom: string = "DurationUom";
        public static QuantityUom: string = "QuantityUom";
        public static StopDatetime: string = "StopDatetime";
        public static OnAdmission: string = "OnAdmission";
        public static ProblemIndication: string = "ProblemIndication";
        public static AdditionalComment: string = "AdditionalComment";
        public static AdministrationInstruction: string = "AdministrationInstruction";
        public static FlowRate: string = "InfusionFlowRate";
        public static InfusionPeriod: string = "InfusionPeriod";
        public static MaxDose: string = "MaxDose";
        public static DeliveryDevice: string = "DeliveryDevice";
        public static TargetSaturationRange: string = "TargetSaturationRange";
        public static OsDurationInfusionPeriod: string = "OsDurationInfusionPeriod";
        public static OsInfusionType: string = "OsInfusionType";
        public static OsIsInfusion: string = "OsIsInfusion";
    }
    export class AdministratorType {
        public static PersonalCarer: string = "PersonalCarer";
        public static Patient: string = "Patient";
        public static Users: string = "Users";
    }
    export class ConstDurationUOM {
        public static Days: string = "CC_MEDDRSN1";
        public static Weeks: string = "CC_MEDDRSN2";
        public static Months: string = "CC_MEDRSN3";
        public static Years: string = "CC_MEDRSN4";
        public static Minutes: string = "CC_MINUTES";
        public static Hours: string = "CC_HOURS";
        public static Doses: string = "CC_DOSES";
    }
    export class CnstSlotStatus {
        public static PLANNED: string = "CC_PLANNED";
        public static GIVEN: string = "CC_ADMINISTERED";
        public static OVERDUE: string = "CC_OVERDUE";
        public static DUENOW: string = "CC_DUE";
        public static NOTKNOWN: string = "CC_NOTKNOWN";
        public static NOTGIVEN: string = "CC_NOTADMINISTERED";
        public static SELFADMINISTERED: string = "CC_SELFADMINISTERED";
        public static DEFERADMINISTRATION: string = "CC_DEFERADMIN";
        public static PATIENTSELFADMINISTERING: string = "CC_PATIENTSELFADMIN";
        public static OMITTED: string = "CC_OMITTED";
        public static DEFERDUE: string = "CC_DEFERDUE";
        public static DEFEROVERDUE: string = "CC_DEFEROVERDUE";
        public static NOTYETRECORDED: string = "CC_NOTYETRECORDED";
        public static HOMELEAVE: string = "CC_HOMELEAVE";
        public static Deleted: string = "CC_DELETED";
        public static INPROGRESS: string = "CC_INPROGRESS";
        public static STOPPED: string = "CC_RSSTOPPED";
        public static COMPLETED: string = "CC_COMPLETED";
        public static PAUSED: string = "CC_PAUSED";
        public static SomeChild_CC: string = "CC_OCCRSOMECHILD";
    }
    export class ValueSet {
        public static StrikethruReason: string = "MEDRSNFRINFSTRTHR";
        public static ReviewPeriodValueset: string = "MEDDRSN_RVP";
        public static DiscontinueValueset: string = "MEDDISCONTINUE";
    }
    export class ValueDomain {
        public static MEDCATREASON: string = "MEDCATREASON";
        public static SupplyInstruction: string = "MEDSUPPLYIN";
        public static DispensingInstruction: string = "DISPINS";
        public static Contyp: string = "CNFTY";
        public static DrugAllergy: string = "SUBAG";
        public static DrugContra: string = "SUBCI";
        public static ConDose: string = "MEDDBSAFR";
        public static MedicationClerking: string = "MEDCLRSOR";
        public static InstallIns: string = "INSTALINS";
        public static ReasonForOverride: string = "OVERIDEREASON";
        public static MedicationEncounterPrep: string = "MEDENPRP";
        public static MedicationAdministrationSlotStatus: string = "MASLOTSTATUSCODE";
        public static ActionPerformed: string = "MAACTIVITYCODE";
        public static DoseDiscrepancyValueDomainCode: string = "MEDRSNFRDISCP";
        public static ReasonForNotGivenDomainCode: string = "MEDRSNFRNONADM";
        public static ReasonForDeferDomainCode: string = "MEDRSNDEFER";
        public static ReqDosePerUOM: string = "REQDOSE";
        public static DCACKREASON: string = "DSOVRACKWRSN";
        public static RoundedDoseValue: string = "MEDDRNDOFF";
        public static ReasonforModification: string = "MRSN";
        public static NonformularyReason: string = "NFREASON";
        public static ReasonForGivenDomainCode: string = "MEDRSNFRMOD";
        public static INFUSIONSLOTSTATUS: string = "IPPSLOTSTATUS";
        public static INFUSIONACTIONS: string = "INFUSIONACTIONS";
        public static StrikethruReason: string = "MEDRSNFRSTRTHR";
        public static PrescriptionItmStatus: string = "MEDPITSTC";
        public static MedDoseType: string = "MEDDOSE";
        public static INFUSIONTYPE: string = "INFUSIONTYPE";
        public static InfStrikeThroughAction: string = "IPPINFUSION_STRIKETHROUGH";
        public static MedDoseFrm: string = "MEDDOSEFRM";
        public static ProductType: string = "PRODUCTTYPE";
        public static MedicationOcInPrd: string = "MedOcInPrd";
        public static ReasonForStop: string = "MEDRSNSTOP";
        public static ReasonForPause: string = "MEDRSNPAUSE";
        public static Humidification: string = "HUMIDIFICATION";
        public static DRCErrorCode: string = "DRCErrorCode";
        public static ConflictsReason: string = "WARSN";
        public static DRCACKREASON: string = "DRCACKWRSN";
        public static MEDDCALFOR: string = "MEDDCALFOR";
        public static TITRADMINSTRUCTION: string = "TITRDSINST";
        public static ReasonforReConcile: string = "MEDCANDISCNTRSN";
        public static DispenseStatus: string = "MedCLMSDispenseStat";
        public static SupplyStatus: string = "MEDSUPPLYSTATUS";
        public static OnBehalfOfReason: string = "MEDONBHFRSN";
        public static CommunicationMode: string = "COMMNMODE";
        public static ReviewOutcome: string = "REWOUT";
        public static ReviewPeriodDomain: string = "MEDDRSN";
    }
    export class MedImage {
        public static GetPath(ImageSrc: string): string {
            return String.Concat("./assets/images/", ImageSrc);
        }
    }
    export class MedImages {
        public static CheckedReadCheckIcon: string = "icheckreadonlychecked13.png";
        public static CheckedReadUnCheckIcon: string = "icheckreadonlyunchecked13.png";
        public static CC_CNTRLDDRUG: string = "icontrolleddrugnor16.png";
        public static CC_UNLICENSED: string = "iunlicenseddrugnor16.png";
        public static CC_HIGHRISK: string = "ihighrisknor16.png";
        public static CC_NEWLY: string = "inewlymarketeddrugnor16.png";
        public static CC_NAMEDRUG: string = "inamedpatientdrugnor16.png";
        public static DoseTypeIcon: string = "idosetypenor16.png";
        public static EarlyAdminIcon: string = "Early administration.png";
        public static LateAdminIcon: string = "Late administration.png";
        public static SteppedVariable: string = "iDoseTypeNOR16.png";
        public static PGDAdministration: string = "iPGDAdministrationNOR16.png";
        public static CC_SUPINS_ICO: string = "Icon/iholdnor16.png";
        public static CC_CARESET_ICO: string = "MPAD_Annotate_Active.png";
        public static CC_ADDCOM_ICO: string = "iinfonor16.png";
        public static CC_OMIT_ICO: string = "slot status-omitted.png";
        public static CC_REVIEW_ICO: string = "iReviewAfterNOR16.png";
        public static CumulativeWarningIcon: string = "cumulative_paracetamol_hot.png";
        public static DoseCalculator: string = "icalculatornor16.png";
        public static DoseCalculatorWithAlert: string = "icalculatornor16_A.jpg";
        public static ConflictsIcon: string = "ibubmandatorynor16.png";
        public static Star: string = "star.png";
        public static ImgMltcmpnt: string = "Multicomponent Item.png";
        public static HighUrgency: string = "IndicatorHIGH16.PNG";
        public static MediumUrgency: string = "IndicatorMedium16.PNG";
        public static LowUrgency: string = "IndicatorLOW16.PNG";
        public static NoUrgency: string = "Supply Flag_NOR16.png";
        public static OnAdmission: string = "iOnadmissionNOR16.png";
        public static NoteIcon: string = "iCareEventsNOR16.png";
        public static WardStockIcon: string = "Wardstockitem16.PNG";
        public static CriticalMeds: string = "Critical_Meds_Icon.png";
    }
    export class PrescriptionTypes {
        public static Clerking: string = "CC_MEDCLERK1";
        public static Outpatient: string = "CC_MED_TYP_OP";
        public static ForAdministration: string = "CC_FOR_ADMIN";
        public static Leave: string = "CC_Patientleave";
        public static Discharge: string = "CC_DSCHRG";
        public static Inpatient: string = "CC_FOR_ADMIN";
        public static Foradministration: string = "For administration";
    }
    export class DoseTypeCode {
        public static NORMAL: string = "CC_MEDDOSE4";
        public static VARIABLE: string = "MEDDOSE1";
        public static STEPPED: string = "MEDDOSE2";
        public static DOSAGERANGE: string = "MEDDOSE17";
        public static CONDITIONAL: string = "CC_CONDNLDSNG";
        public static TITRATED: string = "CC_TITRATED";
        public static STEPPEDVARIABLE: string = "CC_STEPPEDVARIABLE";
        public static sTITRATEDDsplyTxt: string = "Titrated";
        public static sSteppedvarDsplyTxt: string = "Titrated";
        public static sSTEPPEDVARDsplyTxt: string = "Stepped/Variable";
        public static sCONDITIONALDsplyTxt: string = "Conditional";
    }
    export class InfusionTypeCode {
        public static CONTINUOUS: string = "CC_IPPINFTYPCON";
        public static INTERMITTENT: string = "CC_IPPINFTYPINTE";
        public static PCA: string = "CC_IPPINFTYPPCA";
        public static SINGLEDOSEVOLUME: string = "CC_IPPINFTYPSNGDOSE";
        public static FLUID: string = "CC_FLUID";
    }
    export class DrugItemSubTypeCode {
        public static BLOOD_PRODUCT: string = "CC_BLDPRODT";
        public static MEDICAL_GAS: string = "CC_MEDGAS";
        public static MULTI_COMPONENT: string = "CC_MULCMPNTITM";
        public static NONE: string = "CC_NONEE";
    }
    export class InfusionStrikeOutConceptcodes {
        public static StrikeOutLastAction: string = "CC_STRKOUTLASTACTN";
        public static StrikeOutEntireAdmin: string = "CC_STRKOUTENTADMIN";
    }
    export class DaysOfWeek {
        public static IsFriday: string = "Fri";
        public static IsSaturday: string = "Sat";
        public static IsMonday: string = "Mon";
        public static IsTuesday: string = "Tue";
        public static IsWednesday: string = "Wed";
        public static IsThursday: string = "Thu";
        public static IsSunday: string = "Sun";
    }
    export enum SVIconLaunchFrom {
        UnKnown = 0,

        PrescribeRHS = 1,

        PrescribeLHS = 2,

        MedListView = 3,

        MedHistoryView = 4,

        Rx = 5,

        MedChart = 6,

        PresChart = 7,

        TechVal = 8
    }