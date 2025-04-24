import { Colors, Cursors, iLabel, SolidColorBrush, TextBlock, Thickness } from "epma-platform/controls";
import { ObjectHelper } from "epma-platform/helper";
import { CValuesetTerm, LineDisplayConfigurations } from "epma-platform/models";
import DateTime from "epma-platform/DateTime";
import { ObservableCollection } from "../../../shared/epma-platform/models/observable-collection";
import { DrugProperty, Route } from "./ippmamanageprescriptionws";
export enum ActivityTypes {
  Prescribe,
  Reorder,
  Amend,
  Authorise,
  ClinicallyVerify,
  UpdateWarning,
  UnHold,
  ConflictUpdate,
  Reconcile,
  DRCConflictUpdate,
  None,
}

export enum ConflictIcons {
  BubbleHot = "BubbleHot",
  Red = "Red",
  Amber = "Amber",
  Pass = "Pass",
  Question = "Question",
  None = "None",
  MandatoryIndicator = "MandatoryIndicator",
}

export enum RuleNames {
  INGREDIENT,
  DOSAGEFORM,
  STRENGTH,
  BRAND,
  ADMINMETHOD,
  SITE,
}

export enum AsyncCallStatus {
  YetToTrigger,
  InProgress,
  Complete
  }

export enum FormDefaults {
  ALL,
  DOSAGEFORM,
  DOSEUOM,
  SITE,
}

export class DoseCalculation {
  public Height = '';
  public HeightUOM = '';
  public Weight = '';
  public WeightUOM = '';
  public DoseCalcBasedOn = '';
  public RequestDose = '';
  public ReqDoseUOMName = '';
  public RequestDosePer = '';
  public CalculationFor = '';
  public CalculatedPerDose = '';
  public RequestDoseSecondUOM = '';
  public RequestDoseThirdUOMLzoID = '';
  public WeightOption = '';
  public BSAFormula = '';
  public BSA = '';
  public TotalDailyDose = '';
  public SelectProductLorenzoID = '';
  public CalculatedDose = '';
  public RoundedTo = '';
  public RoundingFactor = '';
  public OrderedAmount = '';
  public OverrideReason = '';
  public DoseCapAppliedDose = '';
  public FormCode = '';
  public USSGestationDays = '';
  public UpdatePatientRecord = false;
  public IsHeightEstimated = false;
  public IsWeightEstimated = false;
  public DoseCapApplied = false;
  public ReqDoseUOMOID = 0;
  public FrequencyOID = 0;
  public BSAUOM = 0;
  public IBWWeight = 0;
  public RoundedDose = 0;
  public ABWWeight = 0;
  public RecordedHeightDTTM = new DateTime();
  public RecordedWeightDTTM = new DateTime();
  public CalculatedDTTM = new DateTime();
}

export interface DelegateArgs {
  instance: object;
  delegate: string;
}
export class ReplacemntItem {
  IdentifyingName: string;
  IdentifyingOID: string;
  IdentifyingType: string;
  MCVersion: string;
  IsFormulary: string;
  IsAccessContraint: string;
  IsPrescribeByBrand: string;
  sItemType: string;
  IsReplacement: boolean;
  LorenzoID: string;
}

export class LookAheadItem {
 WarningImage: string;
 Text: string;
 DrugName: string;
 Type: string;
 LinkIcon: string;
 OID: number;
 IsAccessConst: number;
 IsBrandOnly: number;
 FormularyNotes: string;
 IsFormulary: string;
 ItemSubType: string;
 ItemSubTypeImage: string;
 SourceDataProviderType: string;
 DrugType: string;
 DrugProperty: string;
 LorenzoID: string;
}

export class prescribedrugs {
    public static IsOrderSetExistsTeamBased = 'This order set cannot be prescribed, as it has one or more prescription items not included in the prescribable drug list for your team';
    public static IsFormularyOrDrugCatalogueExistsTeamBased = 'This drug cannot be prescribed as it is not included in the prescribable drug list for your team';
    public static CC_CNTRLDDRUGif_Tooltip = 'Controlled drug - All products';
    public static CC_CNTRLDDRUGelse_Tooltip = 'Controlled drug';
    public static CC_UNLICENSEDif_Tooltip = 'Unlicensed - All products';
    public static CC_UNLICENSEDelse_Tooltip = 'Unlicensed';
    public static CC_HIGHRISKif_Tooltip = 'High risk';
    public static CC_HIGHRISKSomePrd_Tooltip = 'Some products';
    public static CC_NEWLYif_Tooltip = 'Newly marketed - All products';
    public static CC_NEWLYelse_Tooltip = 'Newly marketed';
    public static CC_NAMEDRUGif_Tooltip = 'Named patient - All products';
    public static CC_NAMEDRUGelse_Tooltip = 'Named patient';
    public static CC_HIGHRISKelse_Tooltip = 'All products';
 }
 export class ORSSecMezzanine {
     public static ORSOKClick_Text = 'ORSOKClick_Text';
     public static ORSDeactivated_Text = 'ORSDeactivated_Text';
 }
//  export class GC {
//      public static MaxGeneration: number;
//      public static Collect;
//      public static WaitForPendingFinalizers;
//  }
 export class Orderset {
     public static OrderSetIcon_ToolTip = 'OrderSetIcon_ToolTip';
 }
 export class qlfav {
     public static Formularynote_Tooltip = 'Formularynote_Tooltip';
 }
 export class MultiSelectListView {
    public  DataContext: object;
    public  okButtonClick: any;
 }
export class MedsPrescribeUtility {
    public static GetMultiComponentItems(sMultiCompList: string): string[] {
        var sResult: string[];
        var MultiCompItemsSplitter: string = '^';
        if (!String.IsNullOrEmpty(sMultiCompList)) {
          // sResult = sMultiCompList.trimEnd(MultiCompItemsSplitter).split(MultiCompItemsSplitter);
        }
        return sResult;
    }
}
// export class Thickness {
//     public Left:number;  
//     public Right:number; 
//     public Bottom:number;  
//     public Top:number;  
//     constructor(Uniform?: number);  
//     constructor(Left?:number, Top?:number,Right?:number, Bottom?:number);  
//     constructor(l?:number, t?:number,r?:number, b?:number){  
//     if (t !=undefined){  
//             this.Top = t!;  
//             this.Bottom = b!;  
//             this.Right = r!;  
//             this.Left = l!;  
//         }else{  
//             this.Top = l!;  
//             this.Bottom = l!;  
//             this.Right = l!;  
//             this.Left = l!;
  
//         }  
//     }
// }
export class RelatedOptions {
  private identifyingName: string;
  public get IdentifyingName(): string {
      return this.identifyingName;
  }
  public set IdentifyingName(value: string) {
      this.identifyingName = value;
  }
  private identifyingOID: number;
  public get IdentifyingOID(): number {
      return this.identifyingOID;
  }
  public set IdentifyingOID(value: number) {
      this.identifyingOID = value;
  }
  private identifyingType: string;
  public get IdentifyingType(): string {
      return this.identifyingType;
  }
  public set IdentifyingType(value: string) {
      this.identifyingType = value;
  }
  private dosageForm: string;
  public get DosageForm(): string {
      return this.dosageForm;
  }
  public set DosageForm(value: string) {
      this.dosageForm = value;
  }
  private strength: string;
  public get Strength(): string {
      return this.strength;
  }
  public set Strength(value: string) {
      this.strength = value;
  }
  private dosageFormID: number;
  public get DosageFormID(): number {
      return this.dosageFormID;
  }
  public set DosageFormID(value: number) {
      this.dosageFormID = value;
  }
  private isFormulary: string;
  public get IsFormulary(): string {
      return this.isFormulary;
  }
  public set IsFormulary(value: string) {
      this.isFormulary = value;
  }
  private itemType: string;
  public get ItemType(): string {
      return this.itemType;
  }
  public set ItemType(value: string) {
      this.itemType = value;
  }
  private isAccessConst: string;
  public get IsAccessConst(): string {
      return this.isAccessConst;
  }
  public set IsAccessConst(value: string) {
      this.isAccessConst = value;
  }
  private lorenzoID: string;
  public get LorenzoID(): string {
      return this.lorenzoID;
  }
  public set LorenzoID(value: string) {
      this.lorenzoID = value;
  }
  public IsPrescribeByBrand: string;
  public MCVersion: string;
  public FormularyNote: string;
  public DrugProperties: ObservableCollection<DrugProperty>;
  public MCQuantityUomcol: string;
  private prescribableitemlistOID: number;
  public get PrescribableitemlistOID(): number {
      return this.prescribableitemlistOID;
  }
  public set PrescribableitemlistOID(value: number) {
      this.prescribableitemlistOID = value;
  }
  public IsMonPeriodMand: boolean;
  private _IsInfusionFluid: string;
  public get IsInfusionFluid(): string {
      return this._IsInfusionFluid;
  }
  public set IsInfusionFluid(value: string) {
      this._IsInfusionFluid = value;
  }
  private _IsAllowMultipleRoute: string;
  public get IsAllowMultipleRoute(): string {
      return this._IsAllowMultipleRoute;
  }
  public set IsAllowMultipleRoute(value: string) {
      this._IsAllowMultipleRoute = value;
  }
  private _routes:ObservableCollection<Route>;
  public get Routes(): ObservableCollection<Route> {
      return this._routes;
  }
  public set Routes(value: ObservableCollection<Route>) {
      this._routes = value;
  }
  private _IsIgnoreEPresRuleAdminMethod: boolean;
  public get IsIgnoreEPresRuleAdminMethod(): boolean {
      return this._IsIgnoreEPresRuleAdminMethod;
  }
  public set IsIgnoreEPresRuleAdminMethod(value: boolean) {
      this._IsIgnoreEPresRuleAdminMethod = value;
  }
  private _IsAuthorise: boolean;
  public get IsAuthorise(): boolean {
      return this._IsAuthorise;
  }
  public set IsAuthorise(value: boolean) {
      this._IsAuthorise = value;
  }
}

export class GC {
    public static MaxGeneration: number;
    /*[SecuritySafeCritical]*/
    public static Collect(): void{

    };
    /*[SecuritySafeCritical]*/
    public static GetTotalMemory(forceFullCollection: boolean): number{
        return 1;
    };
    /*[ReliabilityContractAttribute(Runtime.ConstrainedExecution.Consistency.WillNotCorruptState, Runtime.ConstrainedExecution.Cer.Success)]*/
    public static KeepAlive(obj: Object): void{

    };
    /*[SecuritySafeCritical]*/
    public static ReRegisterForFinalize(obj: Object): void{

    };
    /*[ReliabilityContractAttribute(Runtime.ConstrainedExecution.Consistency.WillNotCorruptState, Runtime.ConstrainedExecution.Cer.Success)]
            [SecuritySafeCritical]*/
    public static SuppressFinalize(obj: Object): void{

    };
    /*[SecuritySafeCritical]*/
    public static WaitForPendingFinalizers(): void{

    };
}
/*export class StringPlaceHolder{
    function stringFormat(template: string, ...args: any[]) {

        return template.replace(/{(\d+)}/g, function (match, number) {
    
            return typeof args[number] != 'undefined'
    
                ? args[number]
    
                : match
    
                ;
    
        });
    
    };
}*/

export class NotImplementedException
{
    constructor(){}
    
}

export class WarningConceptCode {
    public static ConceptData: ObservableCollection<CValuesetTerm>;
    public static WarningCategoriesData: ObservableCollection<CValuesetTerm>;
}


export class Common{
    public static WarningConceptCode = { WarningCategoriesData : "" };
    public static GetPrescriptionLineItemVM(oVM){
        return oVM;
    }
}


export enum Environment{
    NewLine = "\r\n"
}
export class Resource{ //bala need totalk
    public static MedicationForm = {MandatoryMsgTooltip:"",NonMandatoryMsgTooltip:""};
    public static Infusion = {InfSeqLineDsply_Txt : "Test Purpose",ExsitingSequenceNo : "Test Purpose"}
    public static Medlistdetails = {GpConnectDoseLabel:""}
}
export class PatientContext{
    public static PrescriptionType = "";
    public static ClerkFormViewDefaultBehavior = "";
}
export class PrescriptionTypes{
    public static Clerking = "";
}
export class ClerkFormViewDeftBehaviour{
    public static LaunchFormMandatory = "";
}

export class LineDisplayHelper{
    static lnDisFilter: ObservableCollection<LineDisplayConfigurations>;
    static lnDisFilterOther: ObservableCollection<LineDisplayConfigurations>;
    constructor() {
       
    }
    public static GetPrescriptionItem(objResponse: any, colWidth: number, sFromPage: string, out: (tbToolTip: TextBlock) => void  , isGPConnectItem: boolean = false): iLabel {
        let rtbLineDisplay: iLabel = ObjectHelper.CreateObject(new iLabel(), {
            BorderBrush: null,
            Background: new SolidColorBrush(Colors.Transparent),
            BorderThickness: new Thickness(0),
            IsWordwrap: true,
            Cursor: Cursors.Arrow
        });
        let txbToolTip: TextBlock = new TextBlock();
        let tbToolTip : TextBlock = null;
        rtbLineDisplay.Text = "Test iLabel" 
        txbToolTip.Text = "Test Block";
        tbToolTip = txbToolTip;
        out(tbToolTip)
        return rtbLineDisplay;
    }
    public static GetOtherInformation(objResponse: any, colWidth: number): iLabel {
        let rtbOtherLineDisplay: iLabel = ObjectHelper.CreateObject(new iLabel(), {
            BorderBrush: null,
            Background: new SolidColorBrush(Colors.Transparent),
            BorderThickness: new Thickness(0),
            IsWordwrap: true,
            Cursor: Cursors.Arrow
        });
        let txbToolTip: TextBlock = null;
        rtbOtherLineDisplay.Text = objResponse.PrescriptionItemStatus;
        return rtbOtherLineDisplay;
    }
}
export class CommonFlags{
    public static IsTechnicallyValidate = "";
}


export class ContextInfo{
    public static MenuCode = "MenuCode"
}
export interface Type{

}

export class ConflictsVM{
    public WarningMessage : string = "";
    public WarningType;
    public WarningSubType

    public SubscribeMonographClickEvent(tablink){

    }
}



