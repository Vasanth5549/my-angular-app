
//import { Color } from "./Color";
import { CValuesetTerm } from '../models/Commonbbcreference'
import { MedDrugDetailsParams } from "./MedDrugDetailsParams";
export class  WebServiceURLMedicationCommonBB {
   public  static get ManagePrescriptionWS():string{return this. ManagePrescriptionWS};
   public  static set  ManagePrescriptionWS(value:string){this. ManagePrescriptionWS = value}
   public  static get  MedicationMgmtWS():string{return this. MedicationMgmtWS};
   public  static set   MedicationMgmtWS(value:string){this.  MedicationMgmtWS= value}
   public  static get  MedicationAdministrationWS():string{return this. MedicationAdministrationWS};
   public  static set  MedicationAdministrationWS(value:string){this.  MedicationAdministrationWS= value}
   public  static get  IPPMAManagePrescriptionWS():string{return this. IPPMAManagePrescriptionWS};
   public  static set  IPPMAManagePrescriptionWS(value:string){this.  IPPMAManagePrescriptionWS= value}
   public  static get  ManageSecurityWS():string{return this.  ManageSecurityWS};
   public  static set  ManageSecurityWS(value:string){this.  ManageSecurityWS= value}
   public  static get  ManageProblemWS():string{return this.  ManageProblemWS};
   public  static set  ManageProblemWS(value:string){this.  ManageProblemWS= value}
   public  static get ManageAllergyWS():string{return this. ManageAllergyWS};
   public  static set ManageAllergyWS(value:string){this. ManageAllergyWS= value}
   public  static get QueryInpatientWS():string{return this.  QueryInpatientWS};
   public  static set  QueryInpatientWS(value:string){this.  QueryInpatientWS= value}
 
   public  static get SecurityAuthenticationWS():string{return this.  SecurityAuthenticationWS};
   public  static set SecurityAuthenticationWS (value:string){this.   SecurityAuthenticationWS= value}
 
 
 
  
}
export class MedDrugDetailsInputParam
{
  

    public static get DrugDetailsInputParams(): MedDrugDetailsParams {
  
      return this.DrugDetailsInputParams;
  
    }
  
    public static set DrugDetailsInputParams(value: MedDrugDetailsParams) {
  
      this.DrugDetailsInputParams = value;
  
    }
    
    
}

export  class CommonDomainValues
{
    public  static  MedicationClerking:Array<CValuesetTerm>;
    public  static  BSAFormula:Array<CValuesetTerm>;    
}
export  class MedChartData
    {
        public  static get  ServiceOID():number{return this. ServiceOID};
        public  static set ServiceOID (value:number){this. ServiceOID= value};
        public  static get LocationOID():number{return this.LocationOID  };
        public  static set LocationOID(value:number){this.   LocationOID= value}
    
		//sameer Epic: 633859, US:637594 start
      public static AsRequiredSlotsColor : any;//: Color = {};
      public  static  DueSlotsColor : any;//:Color={};
      public   static  OmittedSlotsColor: any;//:Color={};
      public   static  OverDueSlotsColor: any;//:Color={};
      public   static  TodayOutlineColor : any;//:Color={};
		//sameer Epic: 633859, US:637594 end
      public  static  DuenessThreshold = 0;
         //Malini
         //TFS id-42654 Allergy status is not updating when user records allergy via discontinue and cancel in Prescribe CA Or Prescriptionchart.       
        public static  IsAllergyRecorded = false;
    }
