import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity } from 'epma-platform/services';
import { Level,  AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType,OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, ObservableCollection, CValuesetTerm, CListItem } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { BusyMessageWindow } from 'src/app/shared/epma-platform/services/busyMessageWindow.service';

  
    export class CPremission {
        public static sPremission: string;
    }
    export class WebServiceURL {
        public static ManagePrescriptionWS: string;
        public static MedicationMgmtWS: string;
        public static QueryCareEventsWS: string;
        public static CReferenceWSWS: string;
        public static CTerminologyWSWS: string;
        public static CBCFormsWS: string;
        public static CTeamManagementWS: string;
        public static IPPMAManagePrescriptionWS: string;
        public static MedicationAdminWS: string;
        public static IPPMAPrescribableDefnWS: string;
        public static ResultManagementWS: string;
        public static CBCDataitemsWS: string;
        public static ClinicalNotingWS: string;
    }
    export enum MedActivity {
        Authorise="Authorise",

        Amend="Amend",

        ClinicallyVerify="ClinicallyVerify",

        PrescribeDrugs="PrescribeDrugs",

        Reorder="Reorder",

        Hold="Hold",

        UnHold="UnHold"
    }
    export class DomainValuesForTechValidate {
        public static DispensingInstructions: ObservableCollection<CValuesetTerm>;
        public static SupplyInstructions: ObservableCollection<CValuesetTerm>;
        public static SelecteddispInstruction: ObservableCollection<CValuesetTerm>;
        public static SupplyRequest: ObservableCollection<CListItem>;
    }
    export class FormviewerCommonData {
        public static ServerDateTime: DateTime= DateTime.MinValue;
    }
    export class FormviewerComboValues {
        public static MEDCATREASON: ObservableCollection<CValuesetTerm>;
        public static TreatmentToContinue: ObservableCollection<CValuesetTerm>;
        public static ReasonForModificationValues: ObservableCollection<CValuesetTerm>;
        public static MedClerkModificationReasons: ObservableCollection<CValuesetTerm>;
        public static Duration: ObservableCollection<CValuesetTerm>;
        public static ForAdminDoseType: ObservableCollection<CValuesetTerm>;
        public static Month: ObservableCollection<CValuesetTerm>;
        public static SupplyInstructions: ObservableCollection<CValuesetTerm>;
        public static EndorsementProperties: ObservableCollection<CValuesetTerm>;
        public static InstallIns: ObservableCollection<CValuesetTerm>;
        public static DispensingInstructions: ObservableCollection<CValuesetTerm>;
        public static AdminMethods: ObservableCollection<CListItem>;
        public static ConflictsReason: ObservableCollection<CValuesetTerm>;
        public static CompoundUOMs: ObservableCollection<CListItem>;
        public static SupplyInstr: ObservableCollection<CListItem>;
    }
    export class CommonFlags {
        public static IsFormViewerDomainLoaded: boolean = false;
        public static IsTechnicallyValidateCA: boolean = false;
        public static IsTechnicallyValidate: boolean = false;
        public static MCidentifyingType: string;
        public static MCidentifyingName: string;
        public static MCsubtype: string;
        public static MClorenzoid: string;
        public static MCidentifyingOID: number;
        public static IsbagvolumeMsgDisplayed: boolean = false;
        public static bDiscontinueCancelClicked: boolean = false;
    }
    export class QueryStringInfo {
        public static CDCFormCode: string = String.Empty;
        public static SelPrescItemOID: number = 0;
        public static EnableIsSupplyRequest: boolean = false;
        public static IsLaunchformchart: string = String.Empty;
        public static IsLaunchformInfchart: string = String.Empty;
        public static MedclerkPrompt: string = String.Empty;
        public static IsLaunchformPreschart: string = String.Empty;
        public static IsLaunchformMedchart: string = String.Empty;
        public static IsLaunchformPreschartReview: string = String.Empty;
        public static IsClinicalNote: string = String.Empty;
        public static RequestLockOID: string = String.Empty;
        public static IsGPAutoSaveClerk: boolean = false;
        public static FromPreschart: string = String.Empty;
        public static FromClinicalNote: string = String.Empty;
    }
    export class GlobalVariable {
        public static NhsNumber: string;
        public static IsGPConnectEnabled: boolean;
        public static ApplicationPath: string;
        public static MessageWin: BusyMessageWindow;
    }