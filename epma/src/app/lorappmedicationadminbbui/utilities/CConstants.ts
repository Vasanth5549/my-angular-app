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

    export class CConstants {
        public static ShortDateFormat: string = "dd-MMM-yyyy";
        public static LongDateFormat: string = "dd-MMM-yyyy hh:mm:ss";
        public static Timeformat: string = "HH:mm";
        public static DateTimeFormat: string = "dd-MMM-yyyy HH:mm";
        public static DateTimeFormatWithMeridiem: string = "dd-MMM-yyyy HH:mm tt";
        public static InfusionchartDateFormat: string = "dd MMM yyyy";
        public static PGDDrug: string = "PGD";
        public static DiscontinueText: string = "Discontinued";
        public static DISCONTINUED: string = "MEDStatus3";
        public static COMPLETED: string = "MEDStatus14";
        public static CANCELLED: string = "MEDStatus2";
        public static SUBMITTED: string = "MEDStatus6";
        public static NOTAUTHORISED: string = "MEDStatus12";
        public static AWAITINGAUTHORISE: string = "MEDStatus7";
        public static ONHOLD: string = "MEDStatus13";
        public static SelfAdminText: string = "SelfAdministered";
        public static CLINICALLYVERIFIED: string = "MEDStatus10";
        public static EARLYADMINISTRATIONTEXT: string = "Administration was {0} early";
        public static LATEADMINISTRATIONTEXT: string = "Administration was {0} late";
        public static NONCATALOGUEITEM: string = "NONCATALOGUEITEM";
        public static Precatalog: string = "PRESCRIPTIONNONCATALOGUE";
        public static DRUGDUPLICATION: string = "CC_DUPL_CHK";
        public static DRUGALLERGY: string = "CC_DRUG_ALLERGY";
        public static DRUGCONTRA: string = "CC_DRUG_CONTRA";
        public static DRUGINTRACT: string = "CC_INTERACTIONS";
        public static DRUGWARNING: string = "CC_DRUG_WARNING";
        public static DRUGPRECAUTION: string = "CC_DRUG_PRECAUTION";
        public static WBTYPE: string = "Type 5";
        public static sContraIndication: string = "Drug contraindication";
        public static sDrugContraIndication: string = "Contraindication";
        public static sContraindicationcheck: string = "Contraindication check";
        public static sDuplication: string = "Drug duplication";
        public static sPrecaution: string = "Precaution";
        public static sWarning: string = "Warning";
        public static sInteract: string = "Drug interaction";
        public static OverdueToNotknownTime: number = 72;
        public static InfOverdueToNotknownTime: number = 36;
        public static sChartActiveStatusText: string = "Active";
        public static sChartActiveStatusCode: string = "CC_MAACTIVE";
        public static sChartInActiveStatusCode: string = "CC_MACLOSED";
        public static sChartSuspendedStatusCode: string = "CC_MASUSPENDED";
        public static SortByChronological: string = "CC_CRNLGCAL";
        public static SortByRevChronological: string = "CC_REVCRNLGCAL";
        public static AccAndEmerEncValue: string = "CC_ACCEM";
        public static AccAndEmerEncText: string = "Emergency";
        public static InpatientEncValue: string = "CC_INPAT";
        public static InaptientEncText: string = "Inpatient";
        public static WardAttendEncValue: string = "CC_WARDATT";
        public static WardAttendEncText: string = "Ward attendence";
        public static OutpatientEncValue: string = "CC_OUTPAT";
        public static OutpatientEncText: string = "Outpatient";
        public static ContactEncValue: string = "CC_CONT";
        public static ContactEncText: string = "Contact";
        public static DaycareEncValue: string = "CC_DAYCARE";
        public static DaycareEncText: string = "Day care";
        public static StrikeThruWronSlotSelectedValue: string = "CC_WRNGSLTSEL";
        public static DoseTBD: string = "TBD";
        public static ChartNavigationLimitPeriod: number = 28;
        public static OmitEndDateMaxValue: number = 28;
        public static DoseUOMOptionCode: string = "ToDoseUOM";
        public static SiteOptionCode: string = "Site";
        public static PRNLockWarning: string = "PRNLockWarningIcon";
        public static CumulativeWarning: string = "CumulativeWarningIcon";
        public static ParacetamolRecentlyAdministered: string = "ParacetamolRecentlyAdministered";
        public static OutsideAdminTimeMsgYesNo: string = "OutsideAdminTimeMsgYesNo";
        public static OutsideAdminTimeMsgOk: string = "OutsideAdminTimeMsgOk";
        public static Lorenzo: string = "Lorenzo";
        public static InfusionWarning: string = "InfusionWarningIcon";
        public static sAmendedCompletedWarMsg: string = "AmendedCompletedWarMsg";
        public static sTabChartKey: string = "CC_MEDSADMINCHARTVIEW";
        public static sTabChartOverViewKey: string = "CC_MEDSADMINCHARTOVERVIEW";
        public static sTabInfusionKey: string = "CC_INFUSIONCHART";
        public static PatConf_Pres: string = "CC_PCPRES";
        public static PatConf_Allergy: string = "CC_PCALLERGY";
        public static PatConf_Problem: string = "CC_PCPRB";
        public static Formulary_Drug: string = "CC_DRUG";
        public static ENCstatus: string = "CC_ENCCLOSED";
        public static ItemSubType: string = "CC_MULCMPNTITM";
        public static NonItemSubType: string = "CC_NONEE";
        public static OnceOnlyPerodCode: string = "CC_IPONCENLY";
        public static ADHOC_ITEM_LORENZOID: string = "PI-001";
        public static CACreate: string = "CREATE";
        public static CAModify: string = "MODIFY";
        public static DispVolume: string = "Displacement volume";
        public static Quantity: string = "Quantity";
        public static QuantityUOM: string = "Quantity UOM";
        public static BatchNumber: string = "Batch number";
        public static ExpiryDttm: string = "Expiry date";
        public static MaximumQuantity: number = 99999.99;
        public static MCIADHOCITEM: string = "ADHOC_MCIITEM";
        public static InProgressCellBgColor: string = "#038008";
        public static NOTRECOGNISED: string = "The barcode you have scanned is not recognised by the system.";
        public static NOTMATCHED: string = "Product selected\n{0}\ndoes not match the prescribed item.\nPlease select an appropriate item.";
        public static PRODUCTQUANTITY: string = "Product selected \n{0} \nquantity \n{1} {2}";
        public static ADMINISTRABLEAMT: string = "Product selected \n{0} \nAdministrable amount \n{1}";
        public static STRENGTHEXEED: string = "Product selected \n{0} \nStrength exceeds prescribed dose \nquantity \n{1} x {2} \nAlternatively select a different product.";
        public static AMOUNTREMAINING: string = "Product selected \n{0} \nquantity \n{1} x {2} \nAmount remaining \n{3} {4} of {5} \nAlternatively select a different product.";
        public static SELECTEDQUANTITY: string = "Product selected \n{0} \nquantity \n{1} {2}";
        public static SELECTEDQTY: string = "Product selected \n{0} \nquantity \n{1} x {2}";
        public static EANCode: string = "EANCode";
        public static EANCodeDet: string = "EANCodeDet";
        public static Add_SelectedFluid: string = "Product selected \n{0}\n Do you wish to add the selected fluid to the drug preparation?";
        public static NotMatchedFluid: string = "Product selected \n{0}\ndoes not match any of the components. \nPlease select an appropriate item.";
        public static CONTS_DATETIMEGIVEN: string = "Date/Time given";
        public static ACTIONSTOP: string = "CC_Stop";
        public static ACTIONCOMPLETE: string = "CC_COMP";
        public static ACTIONCOMPLETE2: string = "CC_COMPLETE";
        public static ACTIONFLOWRATECHANGE: string = "CC_CHANGEFLOWRATE";
        public static ACTIONBEGUN: string = "CC_BEGUN";
        public static NOObservationandResult: string = "There are no observations or results configured for prescription item ";
        public static MSGTitleName: string = "LORENZO";
        public static Result: string = "Result";
        public static sRSNPatientHomeLeave: string = "CC_MEDCHRTPATONLEAVE";
        public static sRSNPatTransNonEPresWard: string = "CC_MEDCHRTRANNONEPRS";
        public static sRSNPatientDeparted: string = "CC_MEDCHRTPATDEP";
        public static sRSNPatientDNA: string = "CC_APPATDNA";
        public static ml: string = "UOM-25";
        public static litre: string = "UOM-7";
        public static hour: string = "UOM-46";
        public static minute: string = "UOM-43";
        public static SUBTYPE_GAS: string = "CC_MEDGAS";
        public static ConcentrationDoseUOM: string = "ConcentrationDoseUOM";
        public static sCNFRECCLRK: string = "CNFRECCLRK";
        public static AsRequired: string = "CC_MEDDIRECTION";
        public static AsNeeded: string = "as needed";
        public static StopDoseUOM: string = "StopDoseUOM";
        public static navDurationHrs: number = 2;
        public static sWeeklyFreqUOMCode: string = "CC_MEDDRSN2";
        public static Supplycomments: string = "CC_SupplyComments";
        public static dis_Supplycomments: string = "SupplyComments";
        public static dis_SupplyInstructions: string = "SupplyInstructions";
        public static Comments_tooltip: string = "Comments";
        public static techval_tooltip: string = "Technically validated at";
        public static FullDetails_tooltip: string = "Click to view full details";
        public static ReviewDue: string = "Review due";
        public static From: string = "From";
        public static Omittedby_tooltip: string = "Omitted by";
        public static OmitIndefinite: string = "Omitted indefinitely";
        public static OmitDefinite: string = "This medication has some future doses omitted";
        public static GeneralisedReview: string = "CC_GENREW";
        public static ReviewReqby: string = "Review requested by";
        public static ReviewConceptCode: string = "CC_REVIEWAFTER";
        public static CodingSchemeName: string = "LORENZO";
        public static Version: string = "1.0";
        public static FilterType: string = "A";
        public static Initiate: string = "INITIATE";
        public static GroupNameFontSize: number = 13;
        public static RequestMedication: string = "MN_MED_REQUEST";
        public static NonInfRecAdminCACode: string = "MN_MEDADMIN_P2";
        public static MedChart: string = "MN_MEDCHART_P2";
        public static SupplyInstr_Menucode: string = "MN_SUPINSTR_P2";
        public static DrugFlag: string = '7';
        public static ReqMedIconToolTip: string = "Select request medication to view full details.";
        public static one: string = '1';
        public static RequestedBy: string = "Requested by ";
        public static On: string = "on ";
        public static Urgency: string = "Urgency: ";
        public static Requestcomments: string = "Request comments: ";
        public static RequestcommentsTooltip: string = "Request comments";
        public static sSpace: string = " ";
        public static sExclamatary: string = "!";
        public static sBrown: string = "Brown";
        public static sNormal: string = "Normal";
        public static sBlack: string = "Black";
        public static sBold: string = "Bold";
        public static sHyphen: string = " - ";
        public static CompositeUOM: string = "compound";
        public static second: string = "UOM-42";
        public static month: string = "UOM-49";
        public static year: string = "UOM-50";
        public static Appliance: string = "CC_APPLIANCE";
        public static RouteText: string = "Route";
        public static DoseText: string = "Dose";
        public static d7DayColWidth: number = 84;
        public static d7DayTodayColWidth: number = 92;
        public static Thirteen: string = "13";
        public static Verdana: string = "Verdana";
        public static sMonthFreqUOMCode: string = "CC_MEDRSN3";
        public static sYearsFreqUOMCode: string = "CC_MEDRSN4";
        public static OmitKey: string = "Omit";
        public static ReviewKey: string = "Review";
        public static ReviewGeneralType: string = "CC_GENREW";
        public static ReviewOmittedType: string = "CC_OMTREW";
        public static GenReview: string = "CC_GENREW";
        public static OmitDosReview: string = "CC_OMTREW";
        public static ReviweOutcomeSchldFurtherRW: string = "CC_REWSFV";
        public static ReviewDiscontinue: string = "CC_REWDIS";
        public static ReviewReinstate: string = "CC_REWREINS";
        public static ReviewNFRR: string = "CC_REWNFREW";
        public static TooltipReviewcomments: string = "Review comments: ";
        public static TooltipReviewRequestedBy: string = "Review requested by: ";
        public static Sunday: string = "Sun";
        public static Monday: string = "Mon";
        public static Tuesday: string = "Tue";
        public static Wednesday: string = "Wed";
        public static Thursday: string = "Thu";
        public static Friday: string = "Fri";
        public static Saturday: string = "Sat";
        public static WeeklyText: string = "WEEKLY";
        public static WeeklyLabelON: string = "on";
        public static MinuteConceptCode: string = "CC_MINUTES";
        public static IsAllowEntireAdminStrikeThru: boolean = false;
        public static LockErrorcode: string = "900038";
        public static ReadOnlyErrorcode: string = "900039";
        public static WarningErrorcode: string = "900040";
        public static ClinicalIndicator: string = "ClinicalIndicator";
        public static WidthGtrThree: number = 70.51;
        public static WidthLessThree: number = 57;
        public static AnyParacetamolAdministrationCheckInHours: number = 4;
        public static MedDispenseRequestSent: string = "CC_MEDCLMSREQSENT";
        public static MedDispenseIssued: string = "CC_MEDCLMSISSUED";
        public static MedDispenseCancelled: string = "CC_MEDCLMSCANC";
        public static MedDispenseCancelledEPR: string = "CC_MEDCLMSCANCEPR";
        public static ENTER: string = "Enter";
        public static ENABLESCAN: string = "Enable barcode scanning";
        public static SCANENABLED: string = "Barcode scanning enabled";
        public static TOASTERFONTFAMILY: string = "Verdana";
        public static TOASTERFONTSIZE: number = 10;
        public static BARCODENOTRECOGNIZED: string = "Barcode scanned not recognized.";
        public static TOASTERSUCCESSHEADER: string = "Patient wristband matches the patient selected.";
        public static TOASTERPATIENTCONFIRMEDAS: string = "Patient confirmed as ";
        public static TOASTERPATIENTPASIDTITLE: string = "Patient ID: ";
        public static TOASTERPATIENTDOESNTMATCH: string = "This does not match the ID of the patient selected";
        public static TOASTERPATIENTSCANNED: string = "The ID of the patient scanned is ";
        public static PATIENTWBSCAN: string = "PATIENTWB";
        public static MEDICATIONSCAN: string = "MEDICATION";
        public static OVERRIDESCANTITLE: string = "Override barcode scan- LORENZO -- Webpage Dialog";
        public static PATIENT: string = "PATIENT";
        public static MEDCHART: string = "MEDCHART";
        public static PATWBSCANSUCCESS: string = "S";
        public static PATWBSCANFAILURE: string = "F";
        public static PATWBSCANINVALIDBARCODE: string = "I";
        public static BARCODESCANNERNOTAVAILABLE: string = "CC_BSNA";
        public static BARCODESCANNERNOTWORKING: string = "CC_BSNW";
        public static PATIENTWRISTBANDNOTAVAILABLE: string = "CC_PATWRSTBDNA";
        public static COULDNOTSCANPATIENTWRISTBAND: string = "CC_CNSWRSTBD";
        public static PATIENTWRISTBAND_AMENDINGADMINISTRATIONEVENTPATIENTNOTAVAILABLE: string = "CC_AMDPATNA";
        public static PATIENTWRISTBAND_OTHER: string = "CC_PATWRSTOTHR";
        public static PATIENTWRISTBAND: string = "PATIENTWRISTBAND";
        public static MedIdentifyingType: string = "MEDADMIN";
        public static MedReasonType: string = "MEDSCAN";
        public static ActionSelfAdmin: string = "SelfAdmin";
        public static ActionGiven: string = "Given";
        public static ActionNotGiven: string = "NotGiven";
        public static ActionNotKnown: string = "NotKnown";
        public static ActionDfrAdmin: string = "DfrAdmin";
        public static MedPresItemScannedDetail: string = "PresItemScannedDetail";
        public static CADisCancelPresChart: string = "CA_DisCancelPresChart";
        public static NaN: string = "NaN";
    }
    export class UOMType {
        public static Hours: string = "Hour(s)";
        public static Days: string = "Day(s)";
        public static Weeks: string = "Week(s)";
        public static Doses: string = "Dose(s)";
    }
    export enum PrescriptionItmTyp {
        NonInfusion,

        Infusion,

        MixedRoutes,

        None
    }
    export enum MultiRouteType {
        Single_Route = 0,

        Non_Infusion_Routes = 1,

        Infusion_Routes = 2,

        Mixed_Routes = 3
    }
    export enum RecordAdminType {
        None = 0,

        RecordAdmin = 1,

        InfusionRecordAdmin = 2
    }
    export enum LaunchAdminType {
        LaunchRecordAdmin = 0,

        LaunchModifyAdmin = 1,

        LaunchMultiSlot = 2
    }
    export enum ChartType {
        None = 0,

        Medication_Chart = 1,

        Medication_Overview_Chart = 2,

        Prescription_Chart = 3,

        Infusion_Chart = 4
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
    export class PrescriptionTypesMenuCode {
        public static ForAdministration: string = "MN_MEDADMINISTRAT_P2";
        public static Inpatient: string = "MN_MEDINPATSL_P2";
        public static Discharge: string = "MN_MEDDISCHRGESL_P2";
        public static CDTransaction: string = "MN_MNGTRAN";
        public static sclerking: string = "MN_MEDCLERKSL_P2";
        public static TechValidate: string = "MN_MED_VALIDATE_S_P2";
        public static ClicallyVerify: string = "MN_MED_VERIFY_SL_P2";
        public static ClicallyVerifyMenuCode: string = "MN_MED_VERIFY_SL_P2";
        public static Clerking: string = "MN_MEDCLERKSL_P2";
        public static Review: string = "MN_MED_REVIEW_SL_P2";
        public static AllergyChecked: string = "MN_HI_CONFALRGY";
    }
    export class UrgencyCode {
        public static Normal: string = "CC_NOURGENCY";
        public static Any: string = "CC_ANY";
        public static Nourgency: string = "No urgency";
        public static dis_Normal: string = "<Select>";
    }
    export class DoseTypeCode {
        public static NORMAL: string = "CC_MEDDOSE4";
        public static VARIABLE: string = "MEDDOSE1";
        public static STEPPED: string = "MEDDOSE2";
        public static DOSAGERANGE: string = "MEDDOSE17";
        public static CONDITIONAL: string = "CC_CONDNLDSNG";
        public static TITRATED: string = "CC_TITRATED";
        public static STEPPEDVARIABLE: string = "CC_STEPPEDVARIABLE";
    }
    export class CIngredientLorenzoID {
        public static Paracetamol: string = "IN-1129";
    }
    export class SlotStatus {
        public static PLANNED: string = "CC_PLANNED";
        public static GIVEN: string = "CC_ADMINISTERED";
        public static NOTGIVEN: string = "CC_NOTADMINISTERED";
        public static SELFADMINISTERED: string = "CC_SELFADMINISTERED";
        public static DEFERADMIN: string = "CC_DEFERADMIN";
        public static NOTKNOWN: string = "CC_NOTKNOWN";
        public static PATIENTSELFADMIN: string = "CC_PATIENTSELFADMIN";
        public static HOMELEAVE: string = "CC_HOMELEAVE";
        public static OVERDUE: string = "CC_OVERDUE";
        public static DUENOW: string = "CC_DUE";
        public static DEFEROVERDUE: string = "CC_DEFEROVERDUE";
        public static DEFERDUENOW: string = "CC_DEFERDUE";
        public static OMITTED: string = "CC_Omitted";
        public static OMITTEDInCaps: string = "CC_OMITTED";
        public static NOTYETRECORDED: string = "CC_NOTYETRECORDED";
        public static INPROGRESS: string = "CC_INPROGRESS";
        public static STOPPED: string = "CC_RSSTOPPED";
        public static COMPLETED: string = "CC_COMPLETED";
        public static PAUSED: string = "CC_PAUSED";
        public static DELETED: string = "CC_DELETED";
    }
    export class MedAction {
        public static RecordAdministration: string = "MN_MA_RECORDADMIN";
        public static ModifyAdministration: string = "MN_MA_MODIFYADMIN";
        public static StrikethorughAdmin: string = "MN_STRIKEADMIN_P2";
        public static OmitSlot: string = "MN_OMIT_SLOT_P2";
        public static ReinstateSlot: string = "MN_REINSTATE_SLOT_P2";
        public static Review: string = "MN_REVIEW_P2";
    }
    export class SlotStatusText {
        public static OVERDUE: string = "Overdue";
        public static DUENOW: string = "Due now";
        public static GIVEN: string = "Given";
        public static NOTGIVEN: string = "Not given";
        public static NOTKNOWN: string = "Not known";
        public static SELFADMINISTERED: string = "Self administered";
        public static PATIENTSELFADMIN: string = "Patient self-administering";
        public static DEFERRED: string = "Deferred";
        public static OMITTED: string = "Omitted";
        public static RENISTATE: string = "Planned";
        public static NOTYETRECORDED: string = "Not yet recorded";
        public static PGDGIVEN: string = "PGD admiistration given";
    }
    export class MedImage {
        public static GetPath(ImageSrc: string): string {
            return String.Concat("assets/images/", ImageSrc);
        }
    }
    export class MedImages {
        public static SteppedVariable: string = "iDoseTypeNOR16.png";
        public static Acknowledged: string = "iNewYes.png";
        public static DiscontinuedIcon: string = "idiscontinuedrugnor16.png";
        public static RxIcon: string = "ipatientmedicationhot16.png";
        public static PrescnoteIcon: string = "iCareEventsNOR16.png";
        public static ReviewIcon: string = "iReviewAfterNOR16.png";
        public static AdministeredIcon: string = "idrugadministerednor16.png";
        public static PatSelfAdmin: string = "iselfadministrationnor16.png";
        public static ConflictsBubbleIcon: string = "ibubmandatorynor16.png";
        public static ConflictsMandatoryIcon: string = "ibubblestarnor16.png";
        public static ControlledDrugIcon: string = "iControlledDrugHOT16.png";
        public static CC_UNLICENSED: string = "iunlicenseddrugnor16.png";
        public static CC_HIGHRISK: string = "iHighRiskNOR16.png";
        public static CC_NEWLY: string = "inewlymarketeddrugnor16.png";
        public static CC_NAMEDRUG: string = "inamedpatientdrugnor16.png";
        public static PGDIcon: string = "PGD_prescription.png";
        public static MultiSlotIcon: string = "iDocumentMultiNOR16.png";
        public static HistoryIcon: string = "iHistoryNOR16.png";
        public static GivenSlotIcon: string = "idrugadministerednor16.png";
        public static NotGivenSlotIcon: string = "iDrugNotAdministeredNOR16.png";
        public static NotKnownSlotIcon: string = "Not Known.png";
        public static SelfAdministeredIcon: string = "self administered.png";
        public static SelfAdminLateIcon: string = "self administered lately.png";
        public static SelfAdminEarlyIcon: string = "self administered early.png";
        public static PlannedIcon: string = "slot status-planned.png";
        public static PRNSlotIcon: string = "record a prn administration.png";
        public static EarlyAdminIcon: string = "Early administration.png";
        public static LateAdminIcon: string = "Late administration.png";
        public static CompletedIcon: string = "Completed.png";
        public static DoseDiscrepancy: string = "dose discrepancy.png";
        public static PRNAdminTimeIcon: string = "PRN_administration_time.png";
        public static AwaitingAuthoriseIcon: string = "ipendingauth.png";
        public static OnHoldIcon: string = "iholdnor16.png";
        public static OmittedSlotIcon: string = "Slot status-omitted.png";
        public static DoseTBDIcon: string = "TBD dose.png";
        public static CalenderIcon: string = "icalendarnor24.png";
        public static CancelledIcon: string = "iNewCancelHot.png";
        public static CumulativeWarningIcon: string = "Cumulative_paracetamol_HOT.png";
        public static Wardstockicon: string = "Wardstockitem16.PNG";
        public static SupplyRequesticon: string = "supply flag_nor16.png";
        public static Infusionicon: string = "bag change_nor1_nor 14x14.png";
        public static HomeLeaveIcon: string = "patient_on_home_leave.png";
        public static CommentIcon: string = "icommenthot16.png";
        public static additionalcommentsicon: string = "iinfonor16.png";
        public static MultiComponentItemIcon: string = "Multicomponent Item.png";
        public static PlannedInfusionIcon: string = "Infution_Scheduled_Sstart_timeNOR.PNG";
        public static DeferredInfusionIcon: string = "Infusion deferred.png";
        public static NotGivenInfusionIcon: string = "infusion_notgiven.PNG";
        public static BegunInfusionIcon: string = "Infution_Start_NOR.png";
        public static EstimatedStopInfusionIcon: string = "Estimated completion time.png";
        public static CompletedInfusionIcon: string = "completed_nor.PNG";
        public static PauseInfusionIcon: string = "Infution_pause_NOR16.png";
        public static ResumeInfusionIcon: string = "Infution_Start_NOR.png";
        public static ChangeBagInfusionIcon: string = "Bag change_NOR1_NOR.png";
        public static ChangeFlowRateInfusionIcon: string = "drop.png";
        public static StopInfusionIcon: string = "Infusion stopped_NOR1.png";
        public static InfPlannedDeferredIcon: string = "Bag change_NOR1_NOR.png";
        public static InfBegResInProgSameDateIcon: string = "Infusion begun_NOR.png";
        public static InfBegResInProgDiffDateIcon: string = "Infusion ongoing_NOR.png";
        public static InfPausedIcon: string = "Infusion paused_NOR.png";
        public static InfStoppedIcon: string = "Infusion stopped_NOR.png";
        public static InfCompletedIcon: string = "Infusion completed_NOR.png";
        public static InfNotGivenIcon: string = "Infution_Bag_Close_NOR.png";
        public static InfOmittedIcon: string = "Infution_not given_NOR.PNG";
        public static InfChartOmittedIcon: string = "Infution_omit.PNG";
        public static InfNotKnownIcon: string = "Infution_Not known_NOR.png";
        public static InfChartAlertIcon: string = "Alert_16.png";
        public static InfDuenessAlertIcon: string = "iOverdueForAdministrationNOR16.png";
        public static InfDueOverdueAlertIcon: string = "Alert_Overdue_16.png";
        public static InfMultiActionInfusionIcon: string = "Arrow_downNOR.png";
        public static OrderSetNameIcon: string = "group_medicines_NOR16.png";
        public static AdminCommentsIcon: string = "Comments-corner.png";
        public static MultiRouteIcon: string = "multi route.png";
        public static SupplyInstructionIcon: string = "icon/iholdhot16.png";
        public static NotKnownItemsExistsIcon: string = "Notification_10.png";
        public static ExistsOnAdmissionIcon: string = "iOnadmissionNOR16.png";
        public static CriticalMedsIcon: string = "Critical_Meds_Icon.png";
        public static DoseCalculator: string = "icalculatorhot16.png";
        public static DoseCalculatorWithAlert: string = "icalculatornor16_A.jpg";
        public static sequentiallink: string = "sequentiallink.png";
    }
    export class ValueSet {
        public static StrikethruReason: string = "MEDRSNFRINFSTRTHR";
        public static ReqMedGroup: string = "ReqMedGroup";
        public static MedReviewAfter: string = "MEDDRSN_RVP";
    }
    export class ValueDomain {
        public static StrikethruReason: string = "MEDRSNFRSTRTHR";
        public static SortByStatus: string = "MEDOVRVWSORTBY";
        public static ReasonforRecord: string = "MEDRSNFRNONADM";
        public static ReasonForNotDefer: string = "MEDRSNDEFER";
        public static ReasonforDiscrepancy: string = "MEDRSNFRDISCP";
        public static ReasonforModification: string = "MEDRSNFRMOD";
        public static PrescriptionItemStatus: string = "MEDPITSTC";
        public static DoseType: string = "MEDDOSE";
        public static SlotStatus: string = "MASLOTSTATUSCODE";
        public static ChartStatus: string = "MACHARTSTATUS";
        public static Duration: string = "IPPMEDDOSEDRSN";
        public static ENCOPENCONCEPTCODE: string = "CC_ENCOPEN";
        public static ENCSTATUSVALUEDOMAINCODE: string = "ENSTATUS";
        public static ENCTYPEVALUEDOMAINCODE: string = "ENCIDENTIFIER";
        public static IPPMAPrscTy: string = "IPPMAPRCTYP";
        public static MedSite: string = "MEDICATIONSITE";
        public static MedAdmnMthd: string = "MedAdMhd";
        public static MedClerk: string = "MEDCLERKING";
        public static MedSupp: string = "MEDSUPPLYIN";
        public static MedSupplyStatus: string = "MedSupplystatus";
        public static MedDoseForm: string = "MEDDOSEFRM";
        public static MedTreatCont: string = "MEDTRTCONTINUE";
        public static EncTyp: string = "ENTYP";
        public static MedDbSa: string = "MEDDBSAFR";
        public static MeddurationUOM: string = "MEDDRSN";
        public static MedicationView: string = "MEDVIEW";
        public static INFUSIONTYPE: string = "INFUSIONTYPE";
        public static INFUSIONACTIONS: string = "INFUSIONACTIONS";
        public static ReasonforPause: string = "MEDRSNPAUSE";
        public static ReasonforStop: string = "MEDRSNSTOP";
        public static Humidification: string = "HUMIDIFICATION";
        public static TITRATEDDOSEINSTRUCTION: string = "TITRDSINST";
        public static MEDURGENCY: string = "MEDURGENCY";
        public static SCANPATWBD: string = "PATWRISTBANDORDREAS";
        public static SCANMEDS: string = "MEDSORDREAS";
    }
    export class Qualifiers {
        public static InfusionPeriod: string;
        public static Duration: string;
    }
    export class MedicationAction {
        public static BEGUN: string = "CC_BEGUN";
        public static PAUSE: string = "CC_Pause";
        public static RESUME: string = "CC_Resume";
        public static CHANGEBAG: string = "CC_CHANGEBAG";
        public static CHANGEFLOWRATE: string = "CC_CHANGEFLOWRATE";
        public static STOP: string = "CC_Stop";
        public static COMPLETE: string = "CC_COMP";
        public static ESTIMATEDSTOP: string = "CC_ESTIMATEDSTOP";
        public static INPROGRESS: string = "CC_INPROGRESS";
        public static RETSTOP: string = "CC_Stop";
        public static RETCOMPLETE: string = "CC_COMP";
    }
    export class AdministrationField {
        public static BeginTime: string = "timeDateTimeGivenText";
        public static Endtime: string = "iTimedendTime";
        public static BagVolume: string = "bagvolumetext";
    }
    export class OmitAction {
        public static SelectedSlot: string = "SelectedSlot";
        public static Until: string = "Until";
        public static Indefinite: string = "Indefinite";
    }
    export class InfStrikeOutType {
        public static LastAction: string = "CC_STRKOUTLASTACTN";
        public static EntireAdmin: string = "CC_STRKOUTENTADMIN";
    }
    export class InfusionTypesCode {
        public static CONTINUOUS: string = "CC_IPPINFTYPCON";
        public static INTERMITTENT: string = "CC_IPPINFTYPINTE";
        public static PCA: string = "CC_IPPINFTYPPCA";
        public static SUBTYPE_GAS: string = "CC_MEDGAS";
        public static BLOOD_PRODUCT: string = "CC_BLDPRODT";
        public static SINGLEDOSEVOLUME: string = "CC_IPPINFTYPSNGDOSE";
        public static FLUID: string = "CC_FLUID";
    }
    export class InfChartAlert {
        public static AMENDMENT_ALERT: string = "AmendmentAlert";
        public static DISCONTINUATION_ALERT: string = "DiscontinuationAlert";
        public static FLOW_RATE_CHANGE_ALERT: string = "FlowRateChangeAlert";
        public static STEP_DOSE_FLOW_RATE_ALERT: string = "StepDoseFlowRateAlert";
        public static COND_DOSE_MONITORING_PER_ALERT: string = "CondDoseMonitoringPerAlert";
        public static DUE_ALERT: string = "DueAlert";
        public static OVERDUE_ALERT: string = "OverdueAlert";
        public static CONCENTRATION_CHANGE_ALERT: string = "ConcentrationChangeAlert";
        public static RATE_N_CONCENTRATION_CHANGE_ALERT: string = "ConcentrationAndRateChangeAlert";
        public static INFUSION_PERIOD_COMPLETED_ALERT: string = "InfusionPeriodCompleteAlert";
    }
    export class InfusionRecordAdminTypeCodes {
        public static None: number = 0;
        public static AmendmentAlertAdministration: number = 1;
        public static ContinuousSequentialAdministration: number = 2;
        public static AsRequiredAdministration: number = 3;
        public static IsRetrospectivePRN: number = 4;
    }