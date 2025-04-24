import { CListItem } from "epma-platform/models";
import { CValuesetTerm } from "../models/Commonbbcreference";
import DateTime from 'epma-platform/DateTime';

   
    export  class CPremission
    {
        public static  sPremission:string;
    }    
        
    export  class WebServiceURL
    {
        public static  get ManagePrescriptionWS():string{
            return this.ManagePrescriptionWS;
        }
        public static set ManagePrescriptionWS(value:string){
            this.ManagePrescriptionWS=value;
        }

        public static  get MedicationMgmtWS():string{
            return this.MedicationMgmtWS;
        }
        public static set MedicationMgmtWS(value:string){
            this.MedicationMgmtWS=value;
        }

        public static  get QueryCareEventsWS():string{
            return this.QueryCareEventsWS;
        }
        public static set QueryCareEventsWS(value:string){
            this.QueryCareEventsWS=value;
        }
       
        public static  get CReferenceWSWS():string{
            return this.CReferenceWSWS;
        }
        public static set CReferenceWSWS(value:string){
            this.CReferenceWSWS=value;
        }

        public static  get CTerminologyWSWS():string{
            return this.CTerminologyWSWS;
        }
        public static set CTerminologyWSWS(value:string){
            this.CTerminologyWSWS=value;
        }

        public static  get CBCFormsWS():string{
            return this.CBCFormsWS;
        }
        public static set CBCFormsWS(value:string){
            this.CBCFormsWS=value;
        }


        public static  get CTeamManagementWS():string{
            return this.CTeamManagementWS;
        }
        public static set CTeamManagementWS(value:string){
            this.CTeamManagementWS=value;
        }
       
        public static  get IPPMAManagePrescriptionWS():string{
            return this.IPPMAManagePrescriptionWS;
        }
        public static set IPPMAManagePrescriptionWS(value:string){
            this.IPPMAManagePrescriptionWS=value;
        }

        public static  get MedicationAdminWS():string{
            return this.MedicationAdminWS;
        }
        public static set MedicationAdminWS(value:string){
            this.MedicationAdminWS=value;
        }

        public static  get IPPMAPrescribableDefnWS():string{
            return this.IPPMAPrescribableDefnWS;
        }
        public static set IPPMAPrescribableDefnWS(value:string){
            this.IPPMAPrescribableDefnWS=value;
        }

        public static  get ResultManagementWS():string{
            return this.ResultManagementWS;
        }
        public static set ResultManagementWS(value:string){
            this.ResultManagementWS=value;
        }

        public static  get CBCDataitemsWS():string{
            return this.CBCDataitemsWS;
        }
        public static set CBCDataitemsWS(value:string){
            this.CBCDataitemsWS=value;
        }

        
        public static  get ClinicalNotingWS():string{
            return this.ClinicalNotingWS;
        }
        public static set ClinicalNotingWS(value:string){
            this.ClinicalNotingWS=value;
        }
       

    }
    export enum MedActivity
    {
        Authorise,
        Amend,
        ClinicallyVerify,
        PrescribeDrugs,
        Reorder,
        Hold,
        UnHold
    }
    
    export  class DomainValuesForTechValidate
    {
        public static  DispensingInstructions:Array<CValuesetTerm>;
        public static  SupplyInstructions:Array<CValuesetTerm>;
        public static  SelecteddispInstruction:Array<CValuesetTerm>;
        public static  SupplyRequest:Array<CListItem>;
    }
    export  class FormviewerCommonData
    {
  public static ServerDateTime: DateTime = new DateTime('0001-01-01T00:00:00Z');
    }
    export  class FormviewerComboValues
    {
        public static  MEDCATREASON:Array<CValuesetTerm>;
        public static  TreatmentToContinue:Array<CValuesetTerm>;
        public static  ReasonForModificationValues:Array<CValuesetTerm>;
        public static  MedClerkModificationReasons:Array<CValuesetTerm>;
        public static  Duration:Array<CValuesetTerm>;
        public static  ForAdminDoseType:Array<CValuesetTerm>;
        public static  Month:Array<CValuesetTerm>;
        public static  SupplyInstructions:Array<CValuesetTerm>;
        public static  EndorsementProperties:Array<CValuesetTerm>;
        public static  InstallIns:Array<CValuesetTerm>;
        public static  DispensingInstructions:Array<CValuesetTerm>;
        public static  AdminMethods:Array<CListItem>;
        public static  ConflictsReason:Array<CValuesetTerm>;
        //JIRA - IPPMA-3206
        public static  CompoundUOMs:Array<CListItem>;
        public static  SupplyInstr:Array<CListItem>;
    }
    export  class CommonFlags
    {
        //public static bool IsTechValidateMsgDisplayed = false;
        public static  IsFormViewerDomainLoaded :boolean= false;
        public static  IsTechnicallyValidateCA :boolean= false;
        public static  IsTechnicallyValidate:boolean = false;
        public static  MCidentifyingType:string;
        public static  MCidentifyingName:string;
        public static  MCsubtype:string;
        public static  MClorenzoid:string;
        public static  MCidentifyingOID:number;
        public static  IsbagvolumeMsgDisplayed:boolean = false;
        public static  bDiscontinueCancelClicked:boolean = false;
    }
	
    export  class QueryStringInfo
    {
        //560628 - To set the favourite folder while launching from CDC
        public static  CDCFormCode:string = "";
        public static  SelPrescItemOID:number = 0;        
        public static  EnableIsSupplyRequest :boolean= false;
        public static  IsLaunchformchart:string = ""; // 584816-Infusion phase 1
        public static  IsLaunchformInfchart :string= "";
		 public static  MedclerkPrompt:string = "";
        public static  IsLaunchformPreschart:string = "";
        public static  IsLaunchformMedchart:string = "";
        public static  IsLaunchformPreschartReview:string = "";
        //626571
        public static  IsClinicalNote:string = "";
        //Locking CR
        public static  RequestLockOID:string = "";

         //TFS-71610 QC-218622
        public static  IsGPAutoSaveClerk:boolean = false;
    }

	//TFS:71610/NS
    export  class GlobalVariable
    {
        public static  NhsNumber:string;
        public static  IsGPConnectEnabled:boolean;
        public static  ApplicationPath:string;
		//TFS:82525/NS

        //Need to uncomment
     //   public static  MessageWin:View.BusyMessageWindow;
    }

