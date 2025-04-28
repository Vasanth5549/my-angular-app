
export class CConstants {
    static Event = "Event ";
    static sDose = "Dose ";
    static sspace = " ";
    static Meter = "m";
    static KG = "kg";

    //Date formats
    static LongDateListFormat = "dd-MMM-yyyy HH:mm:ss";
    static LongDateFormat = "dd-MMM-yyyy hh:mm:ss";
    static ShortDateFormat = "dd-MMM-yyyy";
    static ConflictDateFormat = "dd-MMM-yyyy HH:mm:00";
    static LongDateWithoutSecs = "dd-MMM-yyyy HH:mm";
    static Timeformat = "HH:mm";//SK - HIMSS - 91670

    //Conflicts Constants
    static Precatalog = "PRESCRIPTIONNONCATALOGUE";
    static Fordrug = "formulary drug";
    static NonCatitem = "non-catalogue item";
    static DRUGDUPLICATION = "CC_DRUG_DUPLICATION";
    static DRUG_DUPL_CHK = "CC_DUPL_CHK";
    static DRUGCONTRA = "CC_DRUG_CONTRA";
    static DRUGINTRACT = "CC_DRUG_INTRACT";
    static DRUG_INTERACTIONS = "CC_INTERACTIONS";
    static sInteract = "Drug interaction";
    static sDuplication = "Drug duplication";
    static sAllergy = "Drug allergy";
    static sContraIndication = "Drug contraindication";
    static sDrugContraIndication = "Contraindication";
    static sPrecaution = "Precaution";

    static SecondaryScreen = "SECONDARYSCREEN";
    static OnceOnlyFrequency = "CC_IPONCENLY";
    static CONST_QUANTITY = "CC_QUANTITY";
    static Supplycomments = "CC_SupplyComments";
    // Prescription Item Status..
    static AMENDED = "MEDStatus1"; //Amended
    static CANCELLED = "MEDStatus2"; //Cancelled
    static DISCONTINUED = "MEDStatus3"; //Discontinued
    static ISSUED = "MEDStatus4"; //	Issued
    static DISPENSED = "MEDStatus5"; //Dispensed
    static SUBMITTED = "MEDStatus6"; //Submitted
    static AWAITINGAUTHORISE = "MEDStatus7"; //Awaiting authorisation
    static AUTOVERIFIED = "MEDStatus9"; //Auto Verified
    static CLINICALLYVERIFIED = "MEDStatus10"; //Clinically verified
    static TECHNICALLYVALIDATED = "MEDStatus11"; //Techinically validated
    static NOTAUTHORISED = "MEDStatus12"; //Not authorised
    static ONHOLD = "MEDStatus13"; //On Hold
    static COMPLETED = "MEDStatus14"; //Completed

    static CancelledStatusTermText = "Cancelled";
    //186694 - Review Period : Start
    //in Rx the status is coming as Name(completed) not as code (MEDSTATUS14)
    static DiscontinueStatusTermText = "Discontinued";
    static CompletedStatusTermText = "Completed";
    //186694 - Review Period : Stops
    //

    //Item Type
    static CATALOGUEITEM = "CATALOGUEITEM";
    static VIRTUALPRODUCT = "VIRTUALPRODUCT";
    static ACTUALPRODUCT = "ACTUALPRODUCT";
    static ACTUALMOIETY = "ACTUALMOIETY";
    static EncountersPageSize = 20;
    static TitratedgridSize = 7;

    //186694 - Review Period
    static ReviewDomainCode = "";

    //Visisbility
    static Collapsed = "Collapsed";
    static MULTIROUTEDILIMITER = "/ ";
    static MULTIROUTE_ROUTES = '|';
    static MULTIROUTE_ROUTE = '~';
    static MULTIROUTEOIDDILIMITER = ",";
    static NONCATALOGUEITEM = "NONCATALOGUEITEM";

    static HighRisk = "High risk";
    static AllProducts = "All products";

    static HighRisk_CC = "CC_HIGHRISK";
    static AllChild_CC = "CC_OCCRALLCHILD";
    static SomeChild_CC = "CC_OCCRSOMECHILD";

    static WarningIcon = "iwarninginfonor16.png";
    static SUBTYPE = "CC_MULCMPNTITM";
    static NOTANPREDEFMCI = "Multiple component item";

    //SH
    static PatConf_Problem = "CC_PCPRB";
    static PatConf_Allergy = "CC_PCALLERGY";
    //Supply instruction
    static ONESTOPSUPPLYINS = "CC_ONESTOP";
    static ONESTOPSUPPLYINSTEXT = "One stop dispensed";
    static ADHOC_ITEM_LORENZOID = "PI-001";
    //Infusion UOM Chnages
    static ml = "UOM-25";
    static litre = "UOM-7";
    static hour = "UOM-46";
    static minute = "UOM-43";
    //Terminology Coding Scheme
    static CodingSchemeName = "LORENZO";
    static Version = "1.0";
    static FilterType = "A";
    //LZO - 49454 
    static IsBoydWeightFormula = "CC_BOYDWGT";
    static BSAUOM = " m\xB2";
    static WeightCode = "CC_MEDWEIGHT";
    static HeightCode = "CC_MEDHEIGHT";
    static DayCode = "CC_MEDDRSN1";
    static MonthCode = "CC_MEDRSN3";
    static YearCode = "CC_MEDRSN4";
    static WeekCode = "CC_MEDDRSN2";
    static WeekDuration = 7;
    static MonthDuration = 30;
    static YearDuration = 365;
    static NoOfDaysInMonth = 28;
    static KgCode = "CC_MEDKG";
    static M2Code = "CC_MEDM2";
    static MaleSexConceptCode = "CC_Male";
    static FemaleSexConceptCode = "CC_Female";
    static dbPatientHeightLimit = 60;
    static dbPercentageCalc = 100;
    static DailyDose = "CC_MED_DLYDOSE";
    //BNS DC
    static BSACode = "CC_BSA";
    static KGUOM = "Kg";
    static RecordedWeightConceptCode = "CC_RBW";
    static IBWConceptCode = "CC_IBW";
    static ABWConceptCode = "CC_ABW";
    static PerDose = "CC_MED_PERDOSE";

    static FrequencyOptionCode = "FrequencyName";
    static DoseUOMOptionCode = "ToDoseUOM";
    static ConPoundToKg = 2.2046;
    static ConGrmToKg = 1000;
    static sDoseIcon = "DoseIcon";
    static sEPR = "EPR";
    static sIsHavingtime = "1";
    static sIsHavingtimeZero = "0";

    static High = "CC_High";
    static Medium = "CC_Medium";
    static Low = "CC_RFLOW";
    static NoUrgency = "CC_NOURGENCY";
    //EPIC-7732 - Venkat RM
    static ReqMedIconToolTip = "Select request medication to view full details.";
    static RequestedBy = "Requested by ";
    static On = "on ";
    static Urgency = "Urgency: ";
    static Requestcomments = "Request comments: ";
    static RequestcommentsTooltip = "Request comments";
    static ClinicallyVerifyMenuCode = "MED_CA_CLN_VRFY_SL_P2";
    static TechnicallyValidateMenuCode = "MN_MED_VALIDATE_S_P2";
    static Dose = "Dose ";
    //Composite UOM removing CR
    static CompositeUOM = "compound";
    //CS # 630581 - Locking CR - Starts
    //Epic 8487 - Changing lock duration from 60 to 30 - Divya
    static LockDuration = 30;
    static LockErrorcode = "900038";
    //CS # 630581 - Locking CR - Stops

    //CS # 633848 / Jira # LZO-186686
    static NO_OF_MINUTESPER_DAY = 1440;
    static NO_OF_DAYS_INCREASED = 6;
    static SelectReason = "Select reason";

    //Ramya -US-181163
    static ZeroQuantity = "No Supply Required";
    //186685 - Omit : Starts
    static TooltipFrom = "From:";
    static TooltipComments = "Comments:";
    static TooltipOmittedBy = "Omitted by:";
    //186685 - Omit : Stops

    //186694 - Review Period : Starts
    static TooltipReviewcomments = "Review comments :";
    static TooltipReviewRequestedBy = "Review requested by:";
    static ReviewGeneralType = "CC_GENREW";
    static ReviewOmittedType = "CC_OMTREW";
    static GeneralText = "GENERAL";

    //Enhancements to Review Period(Review Outcome)
    static GeneralReview = "CC_GENREW";
    static OmitReview = "CC_OMTREW";
    static Schedulefurtherreview = "CC_REWSFV";
    static Nofurtherreviewrequired = "CC_REWNFREW";
    static Discontinueprescriptionitem = "CC_REWDIS";
    static Reinstatemedication = "CC_REWREINS";
    static Amendedmedication = "CC_REWAMD";
    static Completedmedication = "CC_REWCOM";
    static Doses = "CC_DOSES";
    //186694 - Review Period : Stops

    //Ramya-3383- Order set US 60058 - Orderset mezzanine
    static Ordersetmezzanine = "ORDERSETMEZZANINE";
    //

    //Esakki - WSC
    static DispStRequestSent = "CC_MEDCLMSREQSENT";
    static DispStCancelledEPR = "CC_MEDCLMSCANCEPR";
    static DispStCancelled = "CC_MEDCLMSCANC";
    static DispStIssued = "CC_MEDCLMSISSUED";

    //dosecalc - sravani
    static TotDailydose = "CC_MED_DLYDOSE";
    static IndDose = "CC_MED_PERDOSE";
    static ClosedEncounterCode = "CC_ENCCLOSED";

    //SK -- 91670 -- HIMSS CLMA
    static Appliance = "CC_APPLIANCE";

    static ItemSubType = "CC_MULCMPNTITM";
    //
    static sWarning = "Warning";
    static sAbsolute = "Always show";
    static sGeneric = "Generic";
    //TFSID-130418
    static CADisCancelPresChart = "CA_DisCancelPresChart";
}

//NS/AuditCR
export class FieldNames {
    static DurationUom = "DurationUom";
    static QuantityUom = "QuantityUom";
    static StopDatetime = "StopDatetime";
    static OnAdmission = "OnAdmission";
    static ProblemIndication = "ProblemIndication";
    static AdditionalComment = "AdditionalComment";
    static AdministrationInstruction = "AdministrationInstruction";
    //static TreatmentToContinue = "TreatmentToContinue";
    static FlowRate = "InfusionFlowRate"; //Infusion
    static InfusionPeriod = "InfusionPeriod";
    static MaxDose = "MaxDose";
    static DeliveryDevice = "DeliveryDevice";
    static TargetSaturationRange = "TargetSaturationRange";

    //NS/OSS - Track changes
    static OsDurationInfusionPeriod = "OsDurationInfusionPeriod";
    static OsInfusionType = "OsInfusionType";
    static OsIsInfusion = "OsIsInfusion";

}

export class AdministratorType {
    static PersonalCarer = "PersonalCarer";
    static Patient = "Patient";
    static Users = "Users";
}
//CS # 633848 / Jira # LZO-186686 :: Starts
export class ConstDurationUOM {
    static Days = "CC_MEDDRSN1";
    static Weeks = "CC_MEDDRSN2";
    static Months = "CC_MEDRSN3";
    static Years = "CC_MEDRSN4";
    static Minutes = "CC_MINUTES";
    static Hours = "CC_HOURS";
    static Doses = "CC_DOSES";
}
//CS # 633848 / Jira # LZO-186686 :: Stops

export class CnstSlotStatus {
    static PLANNED = "CC_PLANNED";
    static GIVEN = "CC_ADMINISTERED";
    static OVERDUE = "CC_OVERDUE";
    static DUENOW = "CC_DUE";
    static NOTKNOWN = "CC_NOTKNOWN";
    static NOTGIVEN = "CC_NOTADMINISTERED";
    static SELFADMINISTERED = "CC_SELFADMINISTERED";
    static DEFERADMINISTRATION = "CC_DEFERADMIN";
    static PATIENTSELFADMINISTERING = "CC_PATIENTSELFADMIN";
    static OMITTED = "CC_OMITTED";
    static DEFERDUE = "CC_DEFERDUE";
    static DEFEROVERDUE = "CC_DEFEROVERDUE";
    static NOTYETRECORDED = "CC_NOTYETRECORDED";
    static HOMELEAVE = "CC_HOMELEAVE";
    static Deleted = "CC_DELETED";
    //Infusion status
    static INPROGRESS = "CC_INPROGRESS";
    static STOPPED = "CC_RSSTOPPED";
    static COMPLETED = "CC_COMPLETED";
    static PAUSED = "CC_PAUSED";
    static SomeChild_CC = "CC_OCCRSOMECHILD"; //589100
}

export class ValueSet {
    static StrikethruReason = "MEDRSNFRINFSTRTHR";
    //186694 - Review Period : Starts
    static ReviewPeriodValueset = "MEDDRSN_RVP";
    static DiscontinueValueset = "MEDDISCONTINUE";
    //186694 - Review Period : Stops
}

export class ValueDomain {
    static SupplyInstruction = "MEDSUPPLYIN";
    static DispensingInstruction = "DISPINS";
    static Contyp = "CNFTY";
    static DrugAllergy = "SUBAG";
    static DrugContra = "SUBCI";
    static ConDose = "MEDDBSAFR";
    static MedicationClerking = "MEDCLRSOR";
    static InstallIns = "INSTALINS";
    static ReasonForOverride = "OVERIDEREASON";
    static MedicationEncounterPrep = "MEDENPRP";
    static MedicationAdministrationSlotStatus = "MASLOTSTATUSCODE";
    static ActionPerformed = "MAACTIVITYCODE";
    static DoseDiscrepancyValueDomainCode = "MEDRSNFRDISCP";
    static ReasonForNotGivenDomainCode = "MEDRSNFRNONADM";
    static ReasonForDeferDomainCode = "MEDRSNDEFER";
    static ReqDosePerUOM = "REQDOSE";
    static DCACKREASON = "DSOVRACKWRSN";
    static RoundedDoseValue = "MEDDRNDOFF";
    static ReasonforModification = "MRSN";
    static NonformularyReason = "NFREASON";
    static ReasonForGivenDomainCode = "MEDRSNFRMOD";
    //static PreparationStatusDomainCode = "PRPSTCode";
    static INFUSIONSLOTSTATUS = "IPPSLOTSTATUS";
    static INFUSIONACTIONS = "INFUSIONACTIONS";
    static StrikethruReason = "MEDRSNFRSTRTHR";
    static PrescriptionItmStatus = "MEDPITSTC";
    //SH-Medline
    static MedDoseType = "MEDDOSE";
    static INFUSIONTYPE = "INFUSIONTYPE";
    static InfStrikeThroughAction = "IPPINFUSION_STRIKETHROUGH";
    static MedDoseFrm = "MEDDOSEFRM";

    static ProductType = "PRODUCTTYPE";
    static MedicationOcInPrd = "MedOcInPrd";
    static ReasonForStop = "MEDRSNSTOP";
    static ReasonForPause = "MEDRSNPAUSE";
    //IPPMA-5558
    static Humidification = "HUMIDIFICATION";
    static DRCErrorCode = "DRCErrorCode";//DRC
    static ConflictsReason = "WARSN";
    static DRCACKREASON = "DRCACKWRSN"; //LZO-41349
    static MEDDCALFOR = "MEDDCALFOR";
    static TITRADMINSTRUCTION = "TITRDSINST";
    static ReasonforReConcile = "MEDCANDISCNTRSN";
    //Esakki - WSC
    static DispenseStatus = "MedCLMSDispenseStat";
    //LZO-125476
    static SupplyStatus = "MEDSUPPLYSTATUS";

    static OnBehalfOfReason = "MEDONBHFRSN";
    static CommunicationMode = "COMMNMODE";

    //186694 - Review Period : Starts
    static ReviewOutcome = "REWOUT";
    static ReviewPeriodDomain = "MEDDRSN";
    //186694 - Review Period : Stops
}

export class MedImage {
    public static GetPath(ImageSrc: string) {
        let defaultPath = './assets/images/';
        return defaultPath.concat(ImageSrc);
    }
}

export class MedImages {
    static CheckedReadCheckIcon = "icheckreadonlychecked13.png";
    static CheckedReadUnCheckIcon = "icheckreadonlyunchecked13.png";
    static CC_CNTRLDDRUG = "icontrolleddrugnor16.png";
    static CC_UNLICENSED = "iunlicenseddrugnor16.png";
    static CC_HIGHRISK = "ihighrisknor16.png";
    static CC_NEWLY = "inewlymarketeddrugnor16.png";
    static CC_NAMEDRUG = "inamedpatientdrugnor16.png";
    static DoseTypeIcon = "idosetypenor16.png";
    static EarlyAdminIcon = "Early administration.png";
    static LateAdminIcon = "Late administration.png";

    static SteppedVariable = "iDoseTypeNOR16.png";
    static PGDAdministration = "iPGDAdministrationNOR16.png";
    static CC_SUPINS_ICO = "Icon/iholdnor16.png";
    static CC_CARESET_ICO = "MPAD_Annotate_Active.png";
    static CC_ADDCOM_ICO = "iinfonor16.png";
    //186685 - Omit : Starts
    static CC_OMIT_ICO = "slot status-omitted.png";
    static CC_REVIEW_ICO = "iReviewAfterNOR16.png";
    //186685 - Omit : Stops

    static CumulativeWarningIcon = "cumulative_paracetamol_hot.png";
    static DoseCalculator = "icalculatornor16.png";
    static DoseCalculatorWithAlert = "icalculatornor16_A.jpg";
    static ConflictsIcon = "ibubmandatorynor16.png";
    static Star = "star.png";
    static ImgMltcmpnt = "Multicomponent Item.png";

    static HighUrgency = "IndicatorHIGH16.PNG";
    static MediumUrgency = "IndicatorMedium16.PNG";
    static LowUrgency = "IndicatorLOW16.PNG";
    static NoUrgency = "Supply Flag_NOR16.png";
    //devi
    static OnAdmission = "iOnadmissionNOR16.png";
    //Ramya-3383- order set US 60058 order set mezzanine
    static NoteIcon = "iCareEventsNOR16.png";
    //Esakki - WSC
    static WardStockIcon = "Wardstockitem16.PNG";
    //
    //Esakki - CriticalMeds
    static CriticalMeds = "Critical_Meds_Icon.png";
}

export class PrescriptionTypes {
    static Clerking = "CC_MEDCLERK1";
    static Outpatient = "CC_MED_TYP_OP";

    static ForAdministration = "CC_FOR_ADMIN";
    static Leave = "CC_Patientleave";
    static Discharge = "CC_DSCHRG";
    static Inpatient = "CC_FOR_ADMIN";
    static Foradministration = "For administration";
}

export class DoseTypeCode {
    static NORMAL = "CC_MEDDOSE4";
    static VARIABLE = "MEDDOSE1";
    static STEPPED = "MEDDOSE2";
    static DOSAGERANGE = "MEDDOSE17";
    static CONDITIONAL = "CC_CONDNLDSNG";
    static TITRATED = "CC_TITRATED";
    static STEPPEDVARIABLE = "CC_STEPPEDVARIABLE";
    static sTITRATEDDsplyTxt = "Titrated";
    static sSteppedvarDsplyTxt = "Titrated";
    //SK -- 91670 -- HIMSS CLMA
    static sSTEPPEDVARDsplyTxt = "Stepped/Variable";
    static sCONDITIONALDsplyTxt = "Conditional";
}

export class InfusionTypeCode {
    static CONTINUOUS = "CC_IPPINFTYPCON";
    static INTERMITTENT = "CC_IPPINFTYPINTE";
    static PCA = "CC_IPPINFTYPPCA";
    //LZO-156033 - Infusion CR
    static SINGLEDOSEVOLUME = "CC_IPPINFTYPSNGDOSE";
    static FLUID = "CC_FLUID";
}

export class DrugItemSubTypeCode {
    static BLOOD_PRODUCT = "CC_BLDPRODT";
    static MEDICAL_GAS = "CC_MEDGAS";
    static MULTI_COMPONENT = "CC_MULCMPNTITM";
    static NONE = "CC_NONEE";
}

export class InfusionStrikeOutConceptcodes {
    static StrikeOutLastAction = "CC_STRKOUTLASTACTN";
    static StrikeOutEntireAdmin = "CC_STRKOUTENTADMIN";
}

export class DaysOfWeek {
    static IsFriday = "Fri";
    static IsSaturday = "Sat";
    static IsMonday = "Mon";
    static IsTuesday = "Tue";
    static IsWednesday = "Wed";
    static IsThursday = "Thu";
    static IsSunday = "Sun";
}
//RR SV P2
//QC 228060 TFS 116242
export enum SVIconLaunchFrom {
    UnKnown = 0,
    PrescribeRHS = 1,
    PrescribeLHS = 2,
    MedListView = 3,
    MedHistoryView = 4,
    Rx = 5,//Identify the SV and Rx launch from medication list and History View
    MedChart = 6,
    PresChart = 7,
    TechVal = 8
}
