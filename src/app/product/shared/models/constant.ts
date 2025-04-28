export class CConstants {

  public static EncStatusOpen = "CC_ENCOPEN";
  public static OutPatientPrescribeMenuCode = "MN_MEDOUTPATSL_P2";
  public static InpatientEncounter = "CC_INPAT";
  public static MCI_DeactReorder = " have been deactivated since they were prescribed. Please reselect another medication item to proceed";
  public static MCI_Deactivate = " have been deactivated since they were prescribed. Please discontinue/cancel accordingly"; // IPPMA-3962

  public static PatConf_Pres = 'CC_PCPRES';
  public static UOMType1 = 'CC_MEDDRSN1';
  public static WeeklyFreq = 'CC_MEDDRSN2';
  public static UOMType2 = 'CC_MEDDRSN2';
  public static UOMType3 = 'CC_MEDRSN3';
  public static UOMType4 = 'CC_MEDRSN4';
  public static UOMType5 = 'CC_MINUTES';
  public static UOMType6 = 'CC_HOURS';
  public static PeriodFrequency = 'CC_PERIOD';
  public static IntervalFreq = 'CC_INTERVAL';
  public static sDrugrndtime = 'Drugroundtime';
  public static sFixedTime = 'FixedTime';
  static ChangingDose = 'Changing dose';
  public static ORSAllow = 'CC_ALLOWADJUST';
  public static ORSAllowAndPreselect = 'CC_ALLOWPRESELCT';
  public static DoseUOM_Type_Each = 'each';
  public static DoseUOM_Type_Volumn = 'volume';

  static AuthoriseMenuCode = 'MN_MED_AUTHORI_SL_P2';
  static Clerking = 'CC_MEDCLERK1';
  static Event = 'Event ';
  static sDose = 'Dose ';
  static sspace = ' ';
  static Meter = 'm';
  static KG = 'kg';
  static SVActionAdd = 'Add';
  static OnceOnlyLZOID = 'FRC-002';
  static SVActionChangingDose = 'ChangingDose';
  static SVActionUpdate = 'Update';
  static SVActionFormViewerOk = 'FormViewerOk';
  static ChangingDoseMezzanineNonDaywiseWidth: number = 320;
  public static ChangingDoseMezzanineDaywiseWidth: number = 1115;

  //Date formats
  static LongDateListFormat = 'dd-MMM-yyyy HH:mm:ss';
  static LongDateFormat = 'dd-MMM-yyyy hh:mm:ss';
  static ShortDateFormat = 'dd-MMM-yyyy';
  static ConflictDateFormat = 'dd-MMM-yyyy HH:mm:00';
  static LongDateWithoutSecs = 'dd-MMM-yyyy HH:mm';
  static Timeformat = 'HH:mm'; //SK - HIMSS - 91670
  static DateHMFormat = 'dd-MMM-yyyy HH:mm';

  //Conflicts  staticants
  static Precatalog = 'PRESCRIPTIONNONCATALOGUE';
  static Fordrug = 'formulary drug';
  static NonCatitem = 'non-catalogue item';
  static DRUGDUPLICATION = 'CC_DRUG_DUPLICATION';
  static DRUG_DUPL_CHK = 'CC_DUPL_CHK';
  static DRUGCONTRA = 'CC_DRUG_CONTRA';
  static DRUGINTRACT = 'CC_DRUG_INTRACT';
  static DRUG_INTERACTIONS = 'CC_INTERACTIONS';
  static sInteract = 'Drug interaction';
  static sDuplication = 'Drug duplication';
  static sAllergy = 'Drug allergy';
  static sContraIndication = 'Drug contraindication';
  static sDrugContraIndication = 'Contraindication';
  static sPrecaution = 'Precaution';
  static SelectBrand = 'Select brand';
  static DrugPropertyCNTRLDDRUG = 'CC_CNTRLDDRUG';
  static SNOMED_CT = 'SNOMED CT';
  static AsNeeded = 'As needed';
  static GenReview = 'CC_GENREW';
  static OtherFreeText = 'CC_OTHER_FREETEXT';
  static SUBTYPE_GAS = 'CC_MEDGAS';
  static SecondaryScreen = 'SECONDARYSCREEN';
  static OnceOnlyFrequency = 'CC_IPONCENLY';
  static static_QUANTITY = 'CC_QUANTITY';
  static Supplycomments = 'CC_SupplyComments';
  static SUBTYPE_BLOOD = 'CC_BLDPRODT';
  static ISOXYGENFORMVIEW = 'OXYGENFORMVIEW';
  static Formulary_Drug = 'CC_DRUG';
  static Formulary_Appliance = 'CC_APPLIANCE';
  static Formulary_Unknown = 'CC_UNKNOWN';
  static Other = 'CC_OTHER';
  static CONST_DOSE = 'CC_DOSE';
  static CONST_ADMINMETHOD = 'CC_ADMN_METHOD';
  static CONST_MORE = 'CC_More';
  static DischargePrescribeMenuCode = 'MN_MEDDISCHRGESL_P2';
  static ClerkingPrescribeMenuCode = 'MN_MEDCLERKSL_P2';
  static LeavePrescribeMenuCode = 'MN_MEDLEAVESL_P2';
  static InpatientPrescribeMenuCode = 'MN_MEDINPATSL_P2';
  static ForadminPrescribeMenuCode = 'MN_MEDADMINISTRAT_P2';
  static TechnicallyValidateMenuCode = 'MN_MED_VALIDATE_S_P2';

  // Prescription Item Status..
  static AMENDED = 'MEDStatus1'; //Amended
  static CANCELLED = 'MEDStatus2'; //Cancelled
  static DISCONTINUED = 'MEDStatus3'; //Discontinued
  static ISSUED = 'MEDStatus4'; //	Issued
  static DISPENSED = 'MEDStatus5'; //Dispensed
  static SUBMITTED = 'MEDStatus6'; //Submitted
  static AWAITINGAUTHORISE = 'MEDStatus7'; //Awaiting authorisation
  static AUTOVERIFIED = 'MEDStatus9'; //Auto Verified
  static CLINICALLYVERIFIED = 'MEDStatus10'; //Clinically verified
  static TECHNICALLYVALIDATED = 'MEDStatus11'; //Techinically validated
  static NOTAUTHORISED = 'MEDStatus12'; //Not authorised
  static ONHOLD = 'MEDStatus13'; //On Hold
  static COMPLETED = 'MEDStatus14'; //Completed
  static Supplycode = 'CC_SUPPLY';
  static DonotSupplycode = 'CC_MEDDONTSUPPLY';
  static CancelSupplycode = 'CC_CanMedreq';
  static cONE = '1';
  static cZERO = '0';
  static TABGPCONNECT = 'GPCONNECT';

  static CancelledStatusTermText = 'Cancelled';
  //186694 - Review Period : Start
  //in Rx the status is coming as Name(completed) not as code (MEDSTATUS14)
  static DiscontinueStatusTermText = 'Discontinued';
  static CompletedStatusTermText = 'Completed';
  //186694 - Review Period : Stops
  //

  //Item Type
  static CATALOGUEITEM: string = 'CATALOGUEITEM';
  static VIRTUALPRODUCT: string = 'VIRTUALPRODUCT';
  static ACTUALPRODUCT: string = 'ACTUALPRODUCT';
  static ACTUALMOIETY: string = 'ACTUALMOIETY';
  static EncountersPageSize: number = 20;
  static TitratedgridSize: number = 7;

  //186694 - Review Period
  static ReviewDomainCode: string = '';

  //Visisbility
  static Collapsed: string = 'Collapsed';
  static MULTIROUTEDILIMITER: string = '/ ';
  static MULTIROUTE_ROUTES: string = '|';
  static MULTIROUTE_ROUTE: string = '~';
  static MULTIROUTEOIDDILIMITER: string = ',';
  static NONCATALOGUEITEM: string = 'NONCATALOGUEITEM';

  static HighRisk: string = 'High risk';
  static AllProducts: string = 'All products';

  static HighRisk_CC: string = 'CC_HIGHRISK';
  static AllChild_CC: string = 'CC_OCCRALLCHILD';
  static SomeChild_CC: string = 'CC_OCCRSOMECHILD';

  static WarningIcon: string = 'iwarninginfonor16.png';
  static SUBTYPE: string = 'CC_MULCMPNTITM';
  static NOTANPREDEFMCI: string = 'Multiple component item';

  //SH
  static PatConf_Problem: string = 'CC_PCPRB';
  static PatConf_Allergy: string = 'CC_PCALLERGY';
  //Supply instruction
  static ONESTOPSUPPLYINS: string = 'CC_ONESTOP';
  static ONESTOPSUPPLYINSTEXT: string = 'One stop dispensed';
  static ADHOC_ITEM_LORENZOID: string = 'PI-001';
  //Infusion UOM Chnages
  static ml: string = 'UOM-25';
  static litre: string = 'UOM-7';
  static hour: string = 'UOM-46';
  static minute: string = 'UOM-43';
  //Terminology Coding Scheme
  static CodingSchemeName: string = 'LORENZO';
  static Version: string = '1.0';
  static FilterType: string = 'A';
  //LZO - 49454
  static IsBoydWeightFormula: string = 'CC_BOYDWGT';
  static BSAUOM: string = ' m\xB2';
  static WeightCode: string = 'CC_MEDWEIGHT';
  static HeightCode: string = 'CC_MEDHEIGHT';
  static DayCode: string = 'CC_MEDDRSN1';
  static MonthCode: string = 'CC_MEDRSN3';
  static YearCode: string = 'CC_MEDRSN4';
  static WeekCode: string = 'CC_MEDDRSN2';
  static WeekDuration: number = 7;
  static MonthDuration: number = 30;
  static YearDuration: number = 365;
  static NoOfDaysInMonth: number = 28;
  static KgCode: string = 'CC_MEDKG';
  static M2Code: string = 'CC_MEDM2';
  static MaleSexConceptCode: string = 'CC_Male';
  static FemaleSexConceptCode: string = 'CC_Female';
  static dbPatientHeightLimit: number = 60;
  static dbPercentageCalc: number = 100;
  static DailyDose: string = 'CC_MED_DLYDOSE';
  //BNS DC
  static BSACode: string = 'CC_BSA';
  static KGUOM: string = 'Kg';
  static RecordedWeightConceptCode: string = 'CC_RBW';
  static IBWConceptCode: string = 'CC_IBW';
  static ABWConceptCode: string = 'CC_ABW';
  static PerDose: string = 'CC_MED_PERDOSE';
  static CANCELRSN1 = 'Prescribed in error';
  static CANCELRSN2 = 'Entered in error';
  static TRUE = 'true';
  static FALSE = 'false';
  static sVisible = 'Visible';
  static sNormalDisplaytext = 'Normal';
  static sTitratedDisplaytext = 'Titrated';
  static ACTIVITY_AUTHORISE = 'AUTHORISE';
  static ACTIVITY_NOT_AUTHORISE = 'NOTAUTHORISE';
  static ACTIVITY_CLINICALLYVERIFY = 'CLINICALLYVERIFY';
  static ClinicallyVerifyMenuSL = 'MN_MED_VERIFY_SL_P2';
  static OutEnc = 'CC_OUTPAT'; //69904 quick win
  static MedDispenseRequestSent = 'CC_MEDCLMSREQSENT';
  static MedDispenseIssued = 'CC_MEDCLMSISSUED';
  static MedDispenseCancelled = 'CC_MEDCLMSCANC';
  static MedDispenseCancelledEPR = 'CC_MEDCLMSCANCEPR';
  static RouteOptionCode = 'RouteName';
  static QtyUOMoptioncode = 'QTYALLUOM';
  static RecordadminDoseUOMOptionCode = 'Recordadmindoseuom';
  static FormOptionCode = 'FormName';
  static AdminOptionCode = 'AdminInstruction';
  static SiteOptionCode = 'Site';

  static FrequencyOptionCode: string = 'FrequencyName';
  static DoseUOMOptionCode: string = 'ToDoseUOM';
  static ConPoundToKg: number = 2.2046;
  static ConGrmToKg: number = 1000;
  static sDoseIcon = 'DoseIcon';
  static sEPR: string = 'EPR';
  static sIsHavingtime: string = '1';
  static sIsHavingtimeZero: string = '0';

  static High: string = 'CC_High';
  static Medium: string = 'CC_Medium';
  static Low: string = 'CC_RFLOW';
  static NoUrgency: string = 'CC_NOURGENCY';
  //EPIC-7732 - Venkat RM
  static ReqMedIconToolTip: string =
    'Select request medication to view full details.';
  static RequestedBy: string = 'Requested by ';
  static On: string = 'on ';
  static Urgency: string = 'Urgency: ';
  static Requestcomments: string = 'Request comments: ';
  static RequestcommentsTooltip: string = 'Request comments';
  static ClinicallyVerifyMenuCode: string = 'MED_CA_CLN_VRFY_SL_P2';
  static ClinicallyVerifyMenu = 'MN_MED_VERIFY_P2';
  static AuthoriseMenu = 'MED_CA_AUTHORISE_P2';
  
  static Dose: string = 'Dose ';
  //Composite UOM removing CR
  static CompositeUOM: string = 'compound';
  //CS # 630581 - Locking CR - Starts
  //Epic 8487 - Changing lock duration from 60 to 30 - Divya
  static LockDuration: number = 30;
  static LockErrorcode: string = '900038';
  //CS # 630581 - Locking CR - Stops

  //CS # 633848 / Jira # LZO-186686
  static NO_OF_MINUTESPER_DAY: number = 1440;
  static NO_OF_DAYS_INCREASED: number = 6;
  static SelectReason: string = 'Select reason';

  //Ramya -US-181163
  static ZeroQuantity: string = 'No Supply Required';
  //186685 - Omit : Starts
  static TooltipFrom: string = 'From:';
  static TooltipComments: string = 'Comments:';
  static TooltipOmittedBy: string = 'Omitted by:';
  //186685 - Omit : Stops

  //186694 - Review Period : Starts
  static TooltipReviewcomments: string = 'Review comments :';
  static TooltipReviewRequestedBy: string = 'Review requested by:';
  static ReviewGeneralType: string = 'CC_GENREW';
  static ReviewOmittedType: string = 'CC_OMTREW';
  static GeneralText: string = 'GENERAL';

  //Enhancements to Review Period(Review Outcome)
  static GeneralReview: string = 'CC_GENREW';
  static OmitReview: string = 'CC_OMTREW';
  static Schedulefurtherreview: string = 'CC_REWSFV';
  static Nofurtherreviewrequired: string = 'CC_REWNFREW';
  static Discontinueprescriptionitem: string = 'CC_REWDIS';
  static Reinstatemedication: string = 'CC_REWREINS';
  static Amendedmedication: string = 'CC_REWAMD';
  static Completedmedication: string = 'CC_REWCOM';
  static Doses: string = 'CC_DOSES';
  //186694 - Review Period : Stops

  //Ramya-3383- Order set US 60058 - Orderset mezzanine
  static Ordersetmezzanine: string = 'ORDERSETMEZZANINE';
  //

  //Esakki - WSC
  static DispStRequestSent: string = 'CC_MEDCLMSREQSENT';
  static DispStCancelledEPR: string = 'CC_MEDCLMSCANCEPR';
  static DispStCancelled: string = 'CC_MEDCLMSCANC';
  static DispStIssued: string = 'CC_MEDCLMSISSUED';

  //dosecalc - sravani
  static TotDailydose: string = 'CC_MED_DLYDOSE';
  static IndDose: string = 'CC_MED_PERDOSE';
  static ClosedEncounterCode: string = 'CC_ENCCLOSED';

  //SK -- 91670 -- HIMSS CLMA
  static Appliance: string = 'CC_APPLIANCE';

  static ItemSubType: string = 'CC_MULCMPNTITM';
  //
  static sWarning: string = 'Warning';
  static sAbsolute: string = 'Always show';
  static sGeneric: string = 'Generic';
  //TFSID-130418
  static CADisCancelPresChart: string = 'CA_DisCancelPresChart';
  static Infinity: string = 'Infinity';
  static NaN: string = 'NaN';
  static sAuthoriseText = ' - ' + 'Needs authorisation';
  static Bolus: string = 'Bolus';
  static ConcentrationDoseUOM: string = 'ConcentrationDoseUOM';
  static TypeInInfusionRateNumerator = 'TypeInInfusionRateNumerator';
  static Selectproduct: string = 'Select product';
  static DateTimeMinYear = 1753;
  static DateTimeMaxYear = 9999;
  static sawaitingauthHeader = 'Awaiting authorisation';
  static sCancelled = 'CANCELLED';
  static sCompDisc = 'COMPLETED/DISCONTINUED';
  static ADHOC_ITEM_NAME = 'Multiple component item';
  static Addtionalcomments = 'CC_Additional';
  static More = 'More';

  static sAUTHORISE = 'AWAITING AUTHORISATION';
}

export class ConditionalDoseConstants {
  static ObservationKey = '_OBSERVATION';
  static ResultsKey = '_RESULTS';
  static Numeric = 'N';
  static Instruction = 'I';
}
export class AdditionalItemTypes {
  static Observation = 'Observation';
  static Result = 'Result';
}

export class CAActivity {
  static CA_PRESCRIBE = 'Prescribedrugs';
  static CA_AUTHORISE = 'AUTHORISE';
  static CA_NOTAUTHORISE = 'NOTAUTHORISE';
  static CA_CLNVERIFY = 'CLINICALLYVERIFY';
  static CA_AMEND = 'AMEND';
  static CA_REORDER = 'REORDER';
  static CA_CANCELDISCONTINUE = 'CANCELDISCONTINUE';
  static CA_TECHVALIDATE = 'TECHVALIDATE';
  static CA_UNHOLD = 'UNHOLD';
  static CA_HOLD = 'HOLD';
  static CA_VWFLTERPRES = 'View and Filter Prescription';
  static OnlyConflictsUpdate = 'Update conflicts';
  static PRECAUTION = 'Precaution';
  static CONTRAINDICATION = 'Drug contraindication';
  static WARNING = 'Warning';
  static sAlways = 'CC_SUBCI_ALWAYS';
  static sRelated = 'CC_SUBCI_RELATED';
  static sSpecific = 'CC_SUBCI_SPECIFIC';
  static sGeneric = 'Generic';
  static RECONCILED = 'Reconciled';
  static RECONCILEDSTOPPED = 'Stopped';
  static NOTRECONCILED = 'NotReconciled';
  static CA_RECONCILED = 'RECONCILED';
  static CA_UPDATEDRUGS = 'UpdateDrugs';
  static CA_UPDATE_SEQ_DRUGS = 'UpdateSequentialDrugs';
  static CA_UPDATE_NONIVSEQ_DRUGS = 'UpdateNonIVSequentialDrugs';
  static NonIVSeqUpdForSubsequentItems = 'NonIVSeqUpdForSubsequentItems';
  //RR DRC
  static OnlyDRCConflictsUpdate = 'Update DRCConflicts';
  //TFSID-39667
  static SequentialActionCodeAEITS = 'AddExistingItemToSequence';
}
export class CMedConstants {
  static CA_AUTHORISE = 'MED_CA_AUTHORISE_P2';
  static CA_CLNVERIFY = 'MED_CA_CLN_VRFY_P2';
  static CA_CANCELDISCONTINUE = 'CC_CA_MEDCANCEL';
  static CA_AMEND = 'AMEND';
  static CA_REORDER = 'REORDER';
  static Lessthan = 'CC_LS';
  static LessthanOrEqualto = 'CC_LSEQLTO';
  static Greterthan = 'CC_GRT';
  static GreterthanOrEqualto = 'CC_GRTEQLTO';
}

export class DoseTypeCode {
  static NORMAL: string = 'CC_MEDDOSE4';
  static VARIABLE: string = 'MEDDOSE1';
  static STEPPED: string = 'MEDDOSE2';
  static DOSAGERANGE: string = 'MEDDOSE17';
  static CONDITIONAL: string = 'CC_CONDNLDSNG';
  static TITRATED: string = 'CC_TITRATED';
  static STEPPEDVARIABLE: string = 'CC_STEPPEDVARIABLE';
  static sTITRATEDDsplyTxt: string = 'Titrated';
  static sSteppedvarDsplyTxt: string = 'Titrated';
  //SK -- 91670 -- HIMSS CLMA
  static sSTEPPEDVARDsplyTxt: string = 'Stepped/Variable';
  static sCONDITIONALDsplyTxt: string = 'Conditional';
  static Selectproduct: string = 'Select product';
}

export class ClerkFormViewDefault {
  static LaunchFormNoMandatory: string = 'CC_FRMVWRNOMAND';
  static LaunchFormMandatory: string = 'CC_FRMVWRMAND';
  static DoNotLaunchForm: string = 'CC_DNTLCHFRMVWR';
}

export class InfusionTypesCode {
  static CONTINUOUS: string = 'CC_IPPINFTYPCON';
  static INTERMITTENT: string = 'CC_IPPINFTYPINTE';
  static PCA: string = 'CC_IPPINFTYPPCA';
  //LZO-156033 - Infusion CR
  static SINGLEDOSEVOLUME: string = 'CC_IPPINFTYPSNGDOSE';
  static FLUID: string = 'CC_FLUID';
}
export enum SVIconLaunchFrom {
  UnKnown = 0,
  PrescribeRHS = 1,
  PrescribeLHS = 2,
  MedListView = 3,
  MedHistoryView = 4,
  Rx = 5, //Identify the SV and Rx launch from medication list and History View
  MedChart = 6,
  PresChart = 7,
  TechVal = 8,
}
export class MedImage {
  public static GetPath(ImageSrc: string): string {
    // let defaultPath = window.location.origin + '/assets/Images/';
    let defaultPath = './assets/images/';
    return defaultPath.concat(ImageSrc);
  }
}

export class MedImages {
  static SteppedVariable: string = 'iDoseTypeNOR16.png';
  static White: string = 'white1x1.png';
  static RedStar: string = 'ibubblestarnor16.png';
  static MandatoryIndicator: string = 'imandatoryindicator16.png';
  static Amber: string = 'ibubbleoptindnor16.png';
  static Acknowledged: string = 'iNewYes.png';
  static DiscontinuedIcon: string = 'idiscontinuedrugnor16.png';
  static CancelIcon: string = 'iNewCancelHot.png';
  static HoldIcon: string = 'iHoldNOR16.png';
  static PendingIcon: string = 'ipendingauth.png';
  static CommentIcon: string = 'icommenthot16.png';
  static AcknowledgedIcon: string = 'iacknowledgednor16.png';
  static Removefieldhot: string = 'ideletenor20x19.png';
  static CheckedReadCheckIcon: string = 'iCheckReadOnlyChecked13.png';
  static CheckedReadUnCheckIcon: string = 'iCheckReadOnlyUnchecked13.png';
  static PGDAdministration: string = 'pgd_prescription.png';
  static CC_CARESET_ICO: string = 'MPAD_Annotate_Active.png';
  static CC_SUPINS_ICO: string = 'iholdnor16.png';
  static CC_ADDCOM_ICO: string = 'iinfonor16.png';
  static CC_OMIT_ICO: string = 'slot status-omitted.png';
  static CC_REVIEW_ICO: string = 'iReviewAfterNOR16.png';
  static CC_CNTRLDDRUG: string = 'icontrolleddrugnor16.png';
  static CC_UNLICENSED: string = 'iunlicenseddrugnor16.png';
  static CC_HIGHRISK: string = 'iHighRiskNOR16.png';
  static CC_NEWLY: string = 'inewlymarketeddrugnor16.png';
  static CC_NAMEDRUG: string = 'inamedpatientdrugnor16.png';
  static DoseTypeIcon: string = 'idosetypenor16.png';
  static FormviwerIcon: string = 'iinfonor16.png';
  static WarningIcon: string = 'iwarninginfonor16.png';
  static SelectionIcon: string = 'icopyacrossnor24.png';
  static LinkArrow: string = 'iarrownor5x10.png';
  static PowerArrow: string = 'arrow.png';
  static SelectionIconDIS: string = 'icopyacrossdis24.png';
  static Exclamation: string = 'exclam.png';
  static Star: string = 'star.png';
  static CompletedIcon: string = 'completed.png';
  static ImgFolderOpen: string = 'itreefolderopen16.png';
  static ImgFolderClose: string = 'itreefolderclosedis16.png';
  static ImgMltcmpnt: string = 'Multicomponent Item.png';
  static ImgOrderSet: string = 'group_medicines_NOR16.png';
  static MandatoryIcon: string = 'conflict_01.png';
  static SupplyrequestIcon: string = 'Supply Flag_NOR16.png';
  static ReviewAfterImage: string = 'iinfonor16.png';
  static ReviewAfterIcon: string = 'iReviewAfterNOR16.png';
  static WardStockIcon: string = 'Wardstockitem16.PNG';
  static ConflictPass: string = 'ConflictPassCheck.png';
  static WhiteQuestionMark: string = 'ibubblequestionnor16.png';
  static NoteIcon: string = 'iCareEventsNOR16.png';
  static DCIcon: string = 'iCalculatorNOR16.png';
  static DCIconWithAlert: string = 'icalculatornor16_A.jpg';
  static DCDisableIcon: string = 'iCalculatorDIS16.png';
  static CriticalMeds: string = 'Critical_Meds_Icon.png';
  static CumulativeWarningIcon: string = 'cumulative_paracetamol_hot.png';
  static DoseCalculator: string = 'icalculatornor16.png';
  static DoseCalculatorWithAlert: string = 'icalculatornor16_A.jpg';
  static HighUrgency: string = 'IndicatorHIGH16.PNG';
  static MediumUrgency: string = 'IndicatorMedium16.PNG';
  static LowUrgency: string = 'IndicatorLOW16.PNG';
  static NoUrgency: string = 'Supply Flag_NOR16.png';
}

export class PrescriptionItemStatusCodes {
  static AMENDED: string = 'MEDStatus1'; //Amended
  static CANCELLED: string = 'MEDStatus2'; //Cancelled
  static DISCONTINUED: string = 'MEDStatus3'; //Discontinued
  static ISSUED: string = 'MEDStatus4'; //	Issued
  static DISPENSED: string = 'MEDStatus5'; //Dispensed
  static SUBMITTED: string = 'MEDStatus6'; //Submitted
  static AWAITINGAUTHORISE: string = 'MEDStatus7'; //Awaiting authorisation
  static AUTOVERIFIED: string = 'MEDStatus9'; //Auto Verified
  static CLINICALLYVERIFIED: string = 'MEDStatus10'; //Clinically verified
  static TECHNICALLYVALIDATED: string = 'MEDStatus11'; //Techinically validated
  static NOTAUTHORISED: string = 'MEDStatus12'; //Not authorised
  static ONHOLD: string = 'MEDStatus13'; //On Hold
  static COMPLETED: string = 'MEDStatus14'; //Completed
}

export class PrescriptionTypes {
  static Clerking = 'CC_MEDCLERK1';
  static Outpatient = 'CC_MED_TYP_OP';
  static ForAdministration = 'CC_FOR_ADMIN';
  static Leave = 'CC_Patientleave';
  static Discharge = 'CC_DSCHRG';
  static Inpatient = 'CC_FOR_ADMIN';
  static Foradministration = 'For administration';
  static sInpatient = 'Inpatient';
  static GPConnect = 'GPConnect';
}

export class ValueDomain {
  static SupplyInstruction = 'MEDSUPPLYIN';
  static Itemstatus = 'MEDPITSTC';
  static DispensingInstruction = 'DISPINS';
  static Contyp = 'CNFTY';
  static DrugDuplication = 'SUBDP';
  static DrugAllergy = 'SUBAG';
  static DrugContra = 'SUBCI';
  static Severity = 'MEDSVRTY';
  static Comments = 'WARSN';
  static TreatmentToContinue = 'MEDTRTCONTINUE';
  static ReasonForModification = 'MRSN';
  static Duration = 'MEDDRSN';
  static HoldReason = 'MEDHOLDREASON';
  static DoseType = 'MEDDOSEFRM';
  static MedicationAdministrationSlotStatus = 'MASLOTSTATUSCODE';
  static ForAdminDoseType = 'MEDDOSE';
  static MEDCATREASON = 'MEDCATREASON';
  static ConDose = 'MEDDBSAFR';
  static Month = 'EXPMONTHS';
  static MedicationClerking = 'MEDCLRSOR';
  static InstallIns = 'INSTALINS';
  static MedicationEncounterPrep = 'MEDENPRP';
  static ReconcileReason = 'MEDCANDISCNTRSN';
  static ConflictsReason = 'WARSN';
  static EndorsementProperties = 'MEDENPRP';
  static ProductType = 'PRODUCTTYPE';
  static MedicationOcInPrd = 'MedOcInPrd';
  static MedClerkModificationReasons = 'MEDCLERKING';
  static InstallVDur = 'MEDINSTLINTVDUR';
  static CONST_OVERRIDE_REASON = 'OVERIDEREASON';
  static RM_UNIT_MEASURE = 'RM_UNIT_MEASURE';
  static SUBINT = 'SUBINT';
  static BHVTY = 'BHVTY';
  static INFUSIONTYPE = 'INFUSIONTYPE';
  static RANGEOPERATOR = 'RANGEOPERATOR';
  static INFROUNDTO = 'INFROUNDTO';
  static HUMIDIFICATION = 'HUMIDIFICATION';
  static DRCErrorCode = 'DRCERRORCODE';
  static INDICATIONOVRDREASON = 'OVRDREASON';
  static DRCACKREASON = 'DRCACKWRSN';
  static PRESTYPE = 'IPPMAPRCTYP';
  static TITRATEDDOSEINSTRUCTION = 'TITRDSINST';
  static Supplystatus = 'MEDSUPPLYSTATUS';
  static MEDURGENCY = 'MEDURGENCY';
}

export class DRCDoseTypes {
  static Maintenance = 'DDT-1';
  static Single = 'DDT-2';
  static Loading = 'DDT-3';
  static Initial = 'DDT-4';
  static Test = 'DDT-5';
  static Titration = 'DDT-6';
  static Prophylactic = 'DDT-7';
  static Systemdefined = 'SDDT-0';
  static General = 'DDT-0';
}

export class InfusionVolume {
  static litre = 'litre';
  static microlitre = 'microlitre';
  static ml = 'ml';
}

export enum PrescribeSource {
  None = 0,
  DOS = 1,
  Other = 2,
}

export class ControType {
  public static StartDate: string = 'Date';
  public static Frequency: string = 'Frequency';
  public static DoseType: string = 'DoseType';
}
export class GPcStatus {
  static Active = 'Active';
  static Completed = 'Completed';
}


export class Conversion {
  public static minute: string = 'minute';
  public static hour: string = 'hour';
  public static day: string = 'day';
  public static week: string = 'week';
  public static month: string = 'month';
  public static year: string = 'year';
}

