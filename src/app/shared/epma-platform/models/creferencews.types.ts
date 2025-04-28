import { ObservableCollection } from "epma-platform/models";


export  class CPropertyDetails
{
    constructor(value?:CPropertyDetails){
        if(typeof value == 'object'){
            if(value.csName)
            this.csName = value.csName;
            if(value.csValue)
            this.csValue = value.csValue;
        }
    }

    public csName : string;
    public csValue : string;
}
export class CValuesetTerm{

    constructor(value?:CValuesetTerm){
        if(typeof value == 'object'){
            if(value.csCode)
            this.csCode = value.csCode;
            if(value.csDescription)
            this.csDescription = value.csDescription;
            if(value.arrPropertyDetails)
            this.arrPropertyDetails = value.arrPropertyDetails;
        }
    }

    public csCode : string;
    public csDescription : string;
    public arrPropertyDetails : ObservableCollection<CPropertyDetails>;

}

export const ValueDomain =
{
    SupplyInstruction : "MEDSUPPLYIN",
    DispensingInstruction : "DISPINS",
    Contyp : "CNFTY",
    DrugAllergy : "SUBAG",
    DrugContra : "SUBCI",
    ConDose : "MEDDBSAFR",
    MedicationClerking : "MEDCLRSOR",
    InstallIns : "INSTALINS",
    ReasonForOverride : "OVERIDEREASON",
    MedicationEncounterPrep : "MEDENPRP",
    MedicationAdministrationSlotStatus : "MASLOTSTATUSCODE",
    ActionPerformed : "MAACTIVITYCODE",
    DoseDiscrepancyValueDomainCode : "MEDRSNFRDISCP",
    ReasonForNotGivenDomainCode : "MEDRSNFRNONADM",
    ReasonForDeferDomainCode : "MEDRSNDEFER",
    ReqDosePerUOM : "REQDOSE",
    DCACKREASON : "DSOVRACKWRSN",
    RoundedDoseValue : "MEDDRNDOFF",
    ReasonforModification : "MRSN",
    NonformularyReason : "NFREASON",
    ReasonForGivenDomainCode : "MEDRSNFRMOD",
    //PreparationStatusDomainCode = "PRPSTCode",
    INFUSIONSLOTSTATUS : "IPPSLOTSTATUS",
    INFUSIONACTIONS : "INFUSIONACTIONS",
    StrikethruReason : "MEDRSNFRSTRTHR",
    PrescriptionItmStatus : "MEDPITSTC",
    //SH-Medline
    MedDoseType : "MEDDOSE",
    INFUSIONTYPE : "INFUSIONTYPE",
    InfStrikeThroughAction : "IPPINFUSION_STRIKETHROUGH",
    MedDoseFrm : "MEDDOSEFRM",
    
    ProductType : "PRODUCTTYPE",
    MedicationOcInPrd : "MedOcInPrd",
    ReasonForStop : "MEDRSNSTOP",
    ReasonForPause : "MEDRSNPAUSE",
    //IPPMA-5558
    Humidification : "HUMIDIFICATION",
    DRCErrorCode : "DRCErrorCode",//DRC
    ConflictsReason : "WARSN",
    DRCACKREASON : "DRCACKWRSN", //LZO-41349
    MEDDCALFOR : "MEDDCALFOR",
    TITRADMINSTRUCTION : "TITRDSINST",
    ReasonforReConcile : "MEDCANDISCNTRSN",
    //Esakki - WSC
    DispenseStatus : "MedCLMSDispenseStat",
    //LZO-125476
    SupplyStatus : "MEDSUPPLYSTATUS",

    OnBehalfOfReason : "MEDONBHFRSN",
    CommunicationMode : "COMMNMODE",

   //186694 - Review Period : Starts
   ReviewOutcome : "REWOUT",
   ReviewPeriodDomain : "MEDDRSN"
   //186694 - Review Period : Stops
}