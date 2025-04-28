import DateTime from "epma-platform/DateTime";
import { CContextInformation,CLZOObject } from "epma-platform/models";
import { ObservableCollection } from "../models/observable-collection";
import { HelperService } from "./helper.service";

export class IPPMAMedicationReportsWSSoapClient{

GetMediItmDeactivationCompleted: Function;
GetMediItmDeactivationAsync(oCReqMsgGetMediItmDeactivation:CReqMsgGetMediItmDeactivation ) : void {
  HelperService.Invoke<CReqMsgGetMediItmDeactivation,CResMsgGetMediItmDeactivation,GetMediItmDeactivationCompletedEventArgs>("IPPMAMedicationReportsWS.GetMediItmDeactivation",oCReqMsgGetMediItmDeactivation,this.GetMediItmDeactivationCompleted,"reqobj",new GetMediItmDeactivationCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetControlledDrugsCompleted: Function;
GetControlledDrugsAsync(oCReqMsgGetControlledDrugs:CReqMsgGetControlledDrugs ) : void {
  HelperService.Invoke<CReqMsgGetControlledDrugs,CResMsgGetControlledDrugs,GetControlledDrugsCompletedEventArgs>("IPPMAMedicationReportsWS.GetControlledDrugs",oCReqMsgGetControlledDrugs,this.GetControlledDrugsCompleted,"reqobj",new GetControlledDrugsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetAwaitingPrescriptionsReportsCompleted: Function;
GetAwaitingPrescriptionsReportsAsync(oCReqMsgGetAwaitingPrescriptionsReports:CReqMsgGetAwaitingPrescriptionsReports ) : void {
  HelperService.Invoke<CReqMsgGetAwaitingPrescriptionsReports,CResMsgGetAwaitingPrescriptionsReports,GetAwaitingPrescriptionsReportsCompletedEventArgs>("IPPMAMedicationReportsWS.GetAwaitingPrescriptionsReports",oCReqMsgGetAwaitingPrescriptionsReports,this.GetAwaitingPrescriptionsReportsCompleted,"reqobj",new GetAwaitingPrescriptionsReportsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetAdministeredSpecificDrugCompleted: Function;
GetAdministeredSpecificDrugAsync(oCReqMsgGetAdministeredSpecificDrug:CReqMsgGetAdministeredSpecificDrug ) : void {
  HelperService.Invoke<CReqMsgGetAdministeredSpecificDrug,CResMsgGetAdministeredSpecificDrug,GetAdministeredSpecificDrugCompletedEventArgs>("IPPMAMedicationReportsWS.GetAdministeredSpecificDrug",oCReqMsgGetAdministeredSpecificDrug,this.GetAdministeredSpecificDrugCompleted,"reqobj",new GetAdministeredSpecificDrugCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetAdministeredEventByUserCompleted: Function;
GetAdministeredEventByUserAsync(oCReqMsgGetAdministeredEventByUser:CReqMsgGetAdministeredEventByUser ) : void {
  HelperService.Invoke<CReqMsgGetAdministeredEventByUser,CResMsgGetAdministeredEventByUser,GetAdministeredEventByUserCompletedEventArgs>("IPPMAMedicationReportsWS.GetAdministeredEventByUser",oCReqMsgGetAdministeredEventByUser,this.GetAdministeredEventByUserCompleted,"reqobj",new GetAdministeredEventByUserCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMedAdminExceptionReportsCompleted: Function;
GetMedAdminExceptionReportsAsync(oCReqMsgGetMedAdminExceptionReports:CReqMsgGetMedAdminExceptionReports ) : void {
  HelperService.Invoke<CReqMsgGetMedAdminExceptionReports,CResMsgGetMedAdminExceptionReports,GetMedAdminExceptionReportsCompletedEventArgs>("IPPMAMedicationReportsWS.GetMedAdminExceptionReports",oCReqMsgGetMedAdminExceptionReports,this.GetMedAdminExceptionReportsCompleted,"reqobj",new GetMedAdminExceptionReportsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetHistoricalMedAdminDetsCompleted: Function;
GetHistoricalMedAdminDetsAsync(oCReqMsgGetHistoricalMedAdminDets:CReqMsgGetHistoricalMedAdminDets ) : void {
  HelperService.Invoke<CReqMsgGetHistoricalMedAdminDets,CResMsgGetHistoricalMedAdminDets,GetHistoricalMedAdminDetsCompletedEventArgs>("IPPMAMedicationReportsWS.GetHistoricalMedAdminDets",oCReqMsgGetHistoricalMedAdminDets,this.GetHistoricalMedAdminDetsCompleted,"reqobj",new GetHistoricalMedAdminDetsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDrugintGrpLocalReportsCompleted: Function;
GetDrugintGrpLocalReportsAsync(oCReqMsgGetDrugintGrpLocalReports:CReqMsgGetDrugintGrpLocalReports ) : void {
  HelperService.Invoke<CReqMsgGetDrugintGrpLocalReports,CResMsgGetDrugintGrpLocalReports,GetDrugintGrpLocalReportsCompletedEventArgs>("IPPMAMedicationReportsWS.GetDrugintGrpLocalReports",oCReqMsgGetDrugintGrpLocalReports,this.GetDrugintGrpLocalReportsCompleted,"objRequest",new GetDrugintGrpLocalReportsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDiscontinuedMedicationCompleted: Function;
GetDiscontinuedMedicationAsync(oCReqMsgGetDiscontinuedMedication:CReqMsgGetDiscontinuedMedication ) : void {
  HelperService.Invoke<CReqMsgGetDiscontinuedMedication,CResMsgGetDiscontinuedMedication,GetDiscontinuedMedicationCompletedEventArgs>("IPPMAMedicationReportsWS.GetDiscontinuedMedication",oCReqMsgGetDiscontinuedMedication,this.GetDiscontinuedMedicationCompleted,"reqobj",new GetDiscontinuedMedicationCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPatientMedicationCompleted: Function;
GetPatientMedicationAsync(oCReqMsgGetPatientMedication:CReqMsgGetPatientMedication ) : void {
  HelperService.Invoke<CReqMsgGetPatientMedication,CResMsgGetPatientMedication,GetPatientMedicationCompletedEventArgs>("IPPMAMedicationReportsWS.GetPatientMedication",oCReqMsgGetPatientMedication,this.GetPatientMedicationCompleted,"reqobj",new GetPatientMedicationCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetUnverifiedPrescriptionCompleted: Function;
GetUnverifiedPrescriptionAsync(oCReqMsgGetUnverifiedPrescription:CReqMsgGetUnverifiedPrescription ) : void {
  HelperService.Invoke<CReqMsgGetUnverifiedPrescription,CResMsgGetUnverifiedPrescription,GetUnverifiedPrescriptionCompletedEventArgs>("IPPMAMedicationReportsWS.GetUnverifiedPrescription",oCReqMsgGetUnverifiedPrescription,this.GetUnverifiedPrescriptionCompleted,"reqobj",new GetUnverifiedPrescriptionCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPrescriptionItemCompleted: Function;
GetPrescriptionItemAsync(oCReqMsgGetPrescriptionItem:CReqMsgGetPrescriptionItem ) : void {
  HelperService.Invoke<CReqMsgGetPrescriptionItem,CResMsgGetPrescriptionItem,GetPrescriptionItemCompletedEventArgs>("IPPMAMedicationReportsWS.GetPrescriptionItem",oCReqMsgGetPrescriptionItem,this.GetPrescriptionItemCompleted,"reqobj",new GetPrescriptionItemCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFormularyItemCompleted: Function;
GetFormularyItemAsync(oCReqMsgGetFormularyItem:CReqMsgGetFormularyItem ) : void {
  HelperService.Invoke<CReqMsgGetFormularyItem,CResMsgGetFormularyItem,GetFormularyItemCompletedEventArgs>("IPPMAMedicationReportsWS.GetFormularyItem",oCReqMsgGetFormularyItem,this.GetFormularyItemCompleted,"reqobj",new GetFormularyItemCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMedicationItemListCompleted: Function;
GetMedicationItemListAsync(oCReqMsgGetMedicationItemList:CReqMsgGetMedicationItemList ) : void {
  HelperService.Invoke<CReqMsgGetMedicationItemList,CResMsgGetMedicationItemList,GetMedicationItemListCompletedEventArgs>("IPPMAMedicationReportsWS.GetMedicationItemList",oCReqMsgGetMedicationItemList,this.GetMedicationItemListCompleted,"reqobj",new GetMedicationItemListCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFreeTextPrescribingCompleted: Function;
GetFreeTextPrescribingAsync(oCReqMsgGetFreeTextPrescribing:CReqMsgGetFreeTextPrescribing ) : void {
  HelperService.Invoke<CReqMsgGetFreeTextPrescribing,CResMsgGetFreeTextPrescribing,GetFreeTextPrescribingCompletedEventArgs>("IPPMAMedicationReportsWS.GetFreeTextPrescribing",oCReqMsgGetFreeTextPrescribing,this.GetFreeTextPrescribingCompleted,"reqobj",new GetFreeTextPrescribingCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMedItemDetailCompleted: Function;
GetMedItemDetailAsync(oCReqMsgGetMedItemDetail:CReqMsgGetMedItemDetail ) : void {
  HelperService.Invoke<CReqMsgGetMedItemDetail,CResMsgGetMedItemDetail,GetMedItemDetailCompletedEventArgs>("IPPMAMedicationReportsWS.GetMedItemDetail",oCReqMsgGetMedItemDetail,this.GetMedItemDetailCompleted,"objRequest",new GetMedItemDetailCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetReplaceMedicationCompleted: Function;
GetReplaceMedicationAsync(oCReqMsgGetReplaceMedication:CReqMsgGetReplaceMedication ) : void {
  HelperService.Invoke<CReqMsgGetReplaceMedication,CResMsgGetReplaceMedication,GetReplaceMedicationCompletedEventArgs>("IPPMAMedicationReportsWS.GetReplaceMedication",oCReqMsgGetReplaceMedication,this.GetReplaceMedicationCompleted,"reqobj",new GetReplaceMedicationCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMedicationReportDetCompleted: Function;
GetMedicationReportDetAsync(oCReqMsgGetMedicationReportDet:CReqMsgGetMedicationReportDet ) : void {
  HelperService.Invoke<CReqMsgGetMedicationReportDet,CResMsgGetMedicationReportDet,GetMedicationReportDetCompletedEventArgs>("IPPMAMedicationReportsWS.GetMedicationReportDet",oCReqMsgGetMedicationReportDet,this.GetMedicationReportDetCompleted,"reqobj",new GetMedicationReportDetCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetUnverprelistReportDataCompleted: Function;
GetUnverprelistReportDataAsync(oCReqMsgGetUnverprelistReportData:CReqMsgGetUnverprelistReportData ) : void {
  HelperService.Invoke<CReqMsgGetUnverprelistReportData,CResMsgGetUnverprelistReportData,GetUnverprelistReportDataCompletedEventArgs>("IPPMAMedicationReportsWS.GetUnverprelistReportData",oCReqMsgGetUnverprelistReportData,this.GetUnverprelistReportDataCompleted,"reqobj",new GetUnverprelistReportDataCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDrugIndicationOverrideCompleted: Function;
GetDrugIndicationOverrideAsync(oCReqMsgGetDrugIndicationOverride:CReqMsgGetDrugIndicationOverride ) : void {
  HelperService.Invoke<CReqMsgGetDrugIndicationOverride,CResMsgGetDrugIndicationOverride,GetDrugIndicationOverrideCompletedEventArgs>("IPPMAMedicationReportsWS.GetDrugIndicationOverride",oCReqMsgGetDrugIndicationOverride,this.GetDrugIndicationOverrideCompleted,"reqobj",new GetDrugIndicationOverrideCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMedicationLocalisationCompleted: Function;
GetMedicationLocalisationAsync(oCReqMsgGetMedicationLocalisation:CReqMsgGetMedicationLocalisation ) : void {
  HelperService.Invoke<CReqMsgGetMedicationLocalisation,CResMsgGetMedicationLocalisation,GetMedicationLocalisationCompletedEventArgs>("IPPMAMedicationReportsWS.GetMedicationLocalisation",oCReqMsgGetMedicationLocalisation,this.GetMedicationLocalisationCompleted,"reqobj",new GetMedicationLocalisationCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPrintSupplyReqSheetCompleted: Function;
GetPrintSupplyReqSheetAsync(oCReqMsgGetPrintSupplyReqSheet:CReqMsgGetPrintSupplyReqSheet ) : void {
  HelperService.Invoke<CReqMsgGetPrintSupplyReqSheet,CResMsgGetPrintSupplyReqSheet,GetPrintSupplyReqSheetCompletedEventArgs>("IPPMAMedicationReportsWS.GetPrintSupplyReqSheet",oCReqMsgGetPrintSupplyReqSheet,this.GetPrintSupplyReqSheetCompleted,"reqobj",new GetPrintSupplyReqSheetCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMedicationAlertsCompleted: Function;
GetMedicationAlertsAsync(oCReqMsgGetMedicationAlerts:CReqMsgGetMedicationAlerts ) : void {
  HelperService.Invoke<CReqMsgGetMedicationAlerts,CResMsgGetMedicationAlerts,GetMedicationAlertsCompletedEventArgs>("IPPMAMedicationReportsWS.GetMedicationAlerts",oCReqMsgGetMedicationAlerts,this.GetMedicationAlertsCompleted,"reqobj",new GetMedicationAlertsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMedicationListSharedCompleted: Function;
GetMedicationListSharedAsync(oCReqMsgGetMedicationListShared:CReqMsgGetMedicationListShared ) : void {
  HelperService.Invoke<CReqMsgGetMedicationListShared,CResMsgGetMedicationListShared,GetMedicationListSharedCompletedEventArgs>("IPPMAMedicationReportsWS.GetMedicationListShared",oCReqMsgGetMedicationListShared,this.GetMedicationListSharedCompleted,"mcversionno",new GetMedicationListSharedCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFormularyIDNameCompleted: Function;
GetFormularyIDNameAsync(oCReqMsgGetFormularyIDName:CReqMsgGetFormularyIDName ) : void {
  HelperService.Invoke<CReqMsgGetFormularyIDName,CResMsgGetFormularyIDName,GetFormularyIDNameCompletedEventArgs>("IPPMAMedicationReportsWS.GetFormularyIDName",oCReqMsgGetFormularyIDName,this.GetFormularyIDNameCompleted,"MCVersion",new GetFormularyIDNameCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMedItemsAddedCompleted: Function;
GetMedItemsAddedAsync(oCReqMsgGetMedItemsAdded:CReqMsgGetMedItemsAdded ) : void {
  HelperService.Invoke<CReqMsgGetMedItemsAdded,CResMsgGetMedItemsAdded,GetMedItemsAddedCompletedEventArgs>("IPPMAMedicationReportsWS.GetMedItemsAdded",oCReqMsgGetMedItemsAdded,this.GetMedItemsAddedCompleted,"reqobj",new GetMedItemsAddedCompletedEventArgs(), prototypeList, charPropertyLookup);
}
}
  
  export class GetMediItmDeactivationCompletedEventArgs{
   public Result: CResMsgGetMediItmDeactivation;
  public Error: any;
  }
  export class GetControlledDrugsCompletedEventArgs{
   public Result: CResMsgGetControlledDrugs;
  public Error: any;
  }
  export class GetAwaitingPrescriptionsReportsCompletedEventArgs{
   public Result: CResMsgGetAwaitingPrescriptionsReports;
  public Error: any;
  }
  export class GetAdministeredSpecificDrugCompletedEventArgs{
   public Result: CResMsgGetAdministeredSpecificDrug;
  public Error: any;
  }
  export class GetAdministeredEventByUserCompletedEventArgs{
   public Result: CResMsgGetAdministeredEventByUser;
  public Error: any;
  }
  export class GetMedAdminExceptionReportsCompletedEventArgs{
   public Result: CResMsgGetMedAdminExceptionReports;
  public Error: any;
  }
  export class GetHistoricalMedAdminDetsCompletedEventArgs{
   public Result: CResMsgGetHistoricalMedAdminDets;
  public Error: any;
  }
  export class GetDrugintGrpLocalReportsCompletedEventArgs{
   public Result: CResMsgGetDrugintGrpLocalReports;
  public Error: any;
  }
  export class GetDiscontinuedMedicationCompletedEventArgs{
   public Result: CResMsgGetDiscontinuedMedication;
  public Error: any;
  }
  export class GetPatientMedicationCompletedEventArgs{
   public Result: CResMsgGetPatientMedication;
  public Error: any;
  }
  export class GetUnverifiedPrescriptionCompletedEventArgs{
   public Result: CResMsgGetUnverifiedPrescription;
  public Error: any;
  }
  export class GetPrescriptionItemCompletedEventArgs{
   public Result: CResMsgGetPrescriptionItem;
  public Error: any;
  }
  export class GetFormularyItemCompletedEventArgs{
   public Result: CResMsgGetFormularyItem;
  public Error: any;
  }
  export class GetMedicationItemListCompletedEventArgs{
   public Result: CResMsgGetMedicationItemList;
  public Error: any;
  }
  export class GetFreeTextPrescribingCompletedEventArgs{
   public Result: CResMsgGetFreeTextPrescribing;
  public Error: any;
  }
  export class GetMedItemDetailCompletedEventArgs{
   public Result: CResMsgGetMedItemDetail;
  public Error: any;
  }
  export class GetReplaceMedicationCompletedEventArgs{
   public Result: CResMsgGetReplaceMedication;
  public Error: any;
  }
  export class GetMedicationReportDetCompletedEventArgs{
   public Result: CResMsgGetMedicationReportDet;
  public Error: any;
  }
  export class GetUnverprelistReportDataCompletedEventArgs{
   public Result: CResMsgGetUnverprelistReportData;
  public Error: any;
  }
  export class GetDrugIndicationOverrideCompletedEventArgs{
   public Result: CResMsgGetDrugIndicationOverride;
  public Error: any;
  }
  export class GetMedicationLocalisationCompletedEventArgs{
   public Result: CResMsgGetMedicationLocalisation;
  public Error: any;
  }
  export class GetPrintSupplyReqSheetCompletedEventArgs{
   public Result: CResMsgGetPrintSupplyReqSheet;
  public Error: any;
  }
  export class GetMedicationAlertsCompletedEventArgs{
   public Result: CResMsgGetMedicationAlerts;
  public Error: any;
  }
  export class GetMedicationListSharedCompletedEventArgs{
   public Result: CResMsgGetMedicationListShared;
  public Error: any;
  }
  export class GetFormularyIDNameCompletedEventArgs{
   public Result: CResMsgGetFormularyIDName;
  public Error: any;
  }
  export class GetMedItemsAddedCompletedEventArgs{
   public Result: CResMsgGetMedItemsAdded;
  public Error: any;
  }
  export class CReqMsgGetMediItmDeactivation{
  reqobjBC:CReqIPPMediItmDeactivation;
  oContextInformation:CContextInformation;
  }
  
  export class CReqMediItmDeactivation extends CLZOObject{
  HOID:string;
  DataProviderStatus:string;
  IncludeAutoDeActiveRec:number;
  IncludeRecwith11Replacement:number;
  IncludeUsrDefModficFav:number;
  IncludePrescribleItemSentences:number;
  MediCatVerNo:string;
  }
  export class CReqIPPMediItmDeactivation extends CReqMediItmDeactivation{
  IncludePGDList:number;
  IncludeOrderSet:number;
  IncludeMCI:number;
  IncludeWardStock:number;
  }
  export class CRequestFreeTextPrescribing extends CLZOObject{
  CDateCriteria:CDateCriteria;
  SpecialtyOID:number;
  CareProviderOID:number;
  HOOID:string;
  UserOID:number;
  OrderStatus:string;
  }
  export class CDateCriteria extends CLZOObject{
  FromDate:DateTime;
  ToDate:DateTime;
  OrgID:number;
  }
  export class CResponseUnverifiedPrescription extends CLZOObject{
  PatientId:string;
  PatientName:string;
  PatientDOB:DateTime;
  PrescriptionNumber:string;
  PrescriptionItemNumber:string;
  PrescripedBy:string;
  Ward:string;
  ConsultantName:string;
  Consultant:string;
  Specialty:string;
  SpecialtyName:string;
  EncounterType:string;
  EncounterTypeDet:string;
  DateSubmitted:DateTime;
  DischargeStatus:string;
  PlannedDisDate:DateTime;
  DispensingInstructions:string;
  SupplyInstructions:string;
  FormularyStatus:number;
  StatusIndicator:string;
  DrugProperty:string;
  PrescribedBy:string;
  PrescriptionUserOID:number;
  Name:string;
  Dose:string;
  Route:string;
  DirectionFrequency:string;
  Form:string;
  Duration:string;
  Site:string;
  Quantity:string;
  StartDate:DateTime;
  StopDate:DateTime;
  ProblemIndication:string;
  PrescribedOn:DateTime;
  Status:string;
  PrescriptionType:string;
  VariableDosage:string;
  TreatmentContinue:string;
  PrescriptionItemId:string;
  PrescriptionID:string;
  IsCurrent:string;
  IsHold:string;
  IdentifyingType:string;
  OrganisationName:string;
  DurationUOM:string;
  IdentifyingOID:number;
  UPPERDose:string;
  LOWERDose:string;
  QuantityUOMOID:string;
  QuantityUOMNAME:string;
  DurationUOMNAME:string;
  DoseUOM:string;
  DoseUOMNAME:string;
  ViewSet:string;
  SetID:string;
  SetOID:string;
  IsPrimary:string;
  CancelCareSet:string;
  ClinicallyVerifiedBy:string;
  Careprovider:string;
  Servicepoint:string;
  ServicepointName:string;
  Stationery:string;
  PRESCRIPTIONITEMOIDS:string;
  Adminmethod:string;
  HasWarnings:string;
  EncounterOID:string;
  PharmacyNotingComments:string;
  IsPGD:string;
  ProductType:string;
  PrintStatus:string;
  StartDateIco:string;
  PrescriptionItem:string;
  OtherInformation:string;
  MCVersion:string;
  AdditionalComments:string;
  MedClerkModReason:string;
  BatchNumber:string;
  EndorsementProp:string;
  IntbwInst:string;
  ExpiryDate:DateTime;
  AdminInstructions:string;
  Problem:string;
  Usedwith:string;
  NoofInstalments:string;
  }
  export class CResControlledDrugs extends CResponseUnverifiedPrescription{
  StationeryType:string;
  VerificationStatus:string;
  TimeOfPrescription:DateTime;
  UserId:number;
  Use:string;
  Medication:string;
  Frequency:string;
  Direction:string;
  AdditionalInformation:string;
  SupplyDetails:string;
  }
  export class CResDisMedication extends CResControlledDrugs{
  DiscontinuedOn:DateTime;
  DataProviderstatus:string;
  Blacktriangle:string;
  ADRlist:string;
  AllergyID:string;
  Reaction:string;
  severity:string;
  MHRA_form_completed:string;
  EncounterID:string;
  }
  export class CResAwaitingPrescription extends CResponseUnverifiedPrescription{
  TransportRequested:string;
  BedName:string;
  OutstandingTasks:string;
  Locations:string;
  LocationName:string;
  ReasonforDischarge:string;
  }
  export class CReqAwaitingPrescription extends CLZOObject{
  oDateCriteria:CDateCriteria;
  EncounterType:string;
  EncounterTypeDet:string;
  Location:number;
  LocationName:number;
  ServicePoint:string;
  ServicePointName:string;
  Specialty:string;
  SpecialtyName:string;
  Consultant:string;
  ConsultantName:string;
  }
  export class CReqAdministeredSpecificDrug extends CLZOObject{
  OCDateCriteria:CDateCriteria;
  MedicationItemOID:string;
  MedicationItemName:string;
  ServicePoint:number;
  ServicePointName:string;
  GroupBy:string;
  }
  export class CResAdministeredSpecificDrug extends CLZOObject{
  PatientId:string;
  PatientName:string;
  ServicePoint:string;
  ServicePointName:string;
  Prescriber:string;
  PrescriberDate:DateTime;
  PrimaryIndication:string;
  Dose:string;
  RouteofAdmin:string;
  RouteofAdminName:string;
  TotalNoOfAdministration:string;
  TotalNoOfPatients:string;
  TotalNoOfPrescriptions:string;
  IsCriticalMed:string;
  }
  export class CReqAdministrdEventsByUser extends CLZOObject{
  oDateCriteria:CDateCriteria;
  MedicationItemOID:string;
  MedicationItemName:string;
  AdministeredByOID:number;
  AdministeredByName:string;
  }
  export class CResAdministrdEventsByUser extends CLZOObject{
  PatientId:string;
  PatientName:string;
  PrescriberName:string;
  PrescribedDueDate:DateTime;
  PrescribedDose:string;
  PrescribedDoseUOM:string;
  RouteofAdmin:string;
  RouteofAdminName:string;
  ActualDoseAdministered:string;
  ActualDoseAdministeredUOM:string;
  AdministeredDate:DateTime;
  Medication:string;
  Administeredby:string;
  AdminByRelationship:string;
  HomeLeaveText:string;
  }
  export class CReqMedAdminException extends CLZOObject{
  AdministeredbyOID:number;
  ExceptionStatusID:string;
  oDateCriteria:CDateCriteria;
  ServicePointOID:string;
  SortbyOID:string;
  DuenessThresholdTime:number;
  OverDueToNotKnown:number;
  }
  export class CResMedAdminException extends CLZOObject{
  Administeredby:string;
  Administereddose:string;
  Dueby:DateTime;
  ExceptionReason:string;
  ExceptionStatus:string;
  Given:DateTime;
  Medication:string;
  PASID:string;
  PatientName:string;
  PrescribedDose:string;
  Recordedby:string;
  Route:string;
  Servicepoint:string;
  AdminByRelationship:string;
  HomeLeaveText:string;
  }
  export class CReqHistoricalMedAdmin extends CLZOObject{
  oDateCriteria:CDateCriteria;
  MedicationItemOID:string;
  MedicationItemName:string;
  PatientOid:number;
  PatientName:string;
  EncounterOID:number;
  }
  export class CResHistoricalMedAdmin extends CLZOObject{
  Medication:string;
  PatientId:string;
  PatientName:string;
  Encounter:string;
  Servicepoint:string;
  ScheduledDate:DateTime;
  AdministeredDate:DateTime;
  Prescriber:string;
  PrescribedDose:string;
  PrescribedDoseUOM:string;
  AdministeredDose:string;
  AdministeredDoseUOM:string;
  Outcome:string;
  Administeredby:string;
  Route:string;
  NHSNumber:string;
  IsInfusion:string;
  VolumeInfused:string;
  ItemSubType:string;
  OrderSetOID:number;
  OrderSetName:string;
  IsBolus:string;
  BegunDTTM:DateTime;
  StopOrCompleteDTTM:DateTime;
  MedicationItemType:string;
  NotGivenReasonNumber:string;
  AdminByRelationship:string;
  HomeLeaveText:string;
  IsCriticalMed:string;
  }
  export class CReqDrugIntGrplocal extends CLZOObject{
  OrgOid:number;
  FromDate:DateTime;
  ToDate:DateTime;
  }
  export class CResDrugIntGrplocal extends CLZOObject{
  InteractiveGroupName:string;
  Severity:string;
  CustomisedSeverity:string;
  CustomisedBy:string;
  CustomisedDateTime:DateTime;
  PrimaryGroupName:string;
  }
  export class CReqPatientMedication extends CLZOObject{
  OrgOID:number;
  PatientOID:number;
  EncounterOIDs:string;
  PrescriptionItemStatus:string;
  PrescriptionType:string;
  }
  export class CResPatientMedication extends CLZOObject{
  PatientID:string;
  PatientName:string;
  PatientDOB:DateTime;
  EncounterType:string;
  NHSNumber:string;
  Address:string;
  Allergies:string;
  En_Start_Date:DateTime;
  En_End_Date:DateTime;
  En_Ref_number:string;
  Code_Description:string;
  ReasonForPres:string;
  TransactionType:string;
  AdminInsturction:string;
  Medicationclerkingmodifyreason:string;
  Frequency:string;
  ReasonForDis:string;
  Direction:string;
  Additionalcomments:string;
  Used:string;
  ReorderItem:string;
  StatusType:string;
  PITEMOID:string;
  ReorderItemOID:string;
  StatusIndicator:string;
  DrugProperty:string;
  PrescribedBy:string;
  PrescriptionUserOID:number;
  Name:string;
  Dose:string;
  Route:string;
  DirectionFrequency:string;
  Form:string;
  Duration:string;
  Site:string;
  Quantity:string;
  StartDate:DateTime;
  StopDate:DateTime;
  ProblemIndication:string;
  PrescribedOn:DateTime;
  Status:string;
  PrescriptionType:string;
  VariableDosage:string;
  TreatmentContinue:string;
  PrescriptionItemId:string;
  PrescriptionID:string;
  IsCurrent:string;
  IsHold:string;
  IdentifyingType:string;
  OrganisationName:string;
  DurationUOM:string;
  IdentifyingOID:number;
  UPPERDose:string;
  LOWERDose:string;
  QuantityUOMOID:string;
  QuantityUOMNAME:string;
  DurationUOMNAME:string;
  DoseUOM:string;
  DoseUOMNAME:string;
  ViewSet:string;
  SetID:string;
  SetOID:string;
  IsPrimary:string;
  CancelCareSet:string;
  ClinicallyVerifiedBy:string;
  Specialty:string;
  Careprovider:string;
  Servicepoint:string;
  Stationery:string;
  PRESCRIPTIONITEMOIDS:string;
  PRESCRIPTIONNUMBER:string;
  Adminmethod:string;
  HasWarnings:string;
  EncounterOID:string;
  PharmacyNotingComments:string;
  IsPGD:string;
  ProductType:string;
  PrintStatus:string;
  StartDateIco:string;
  PrescriptionItem:string;
  OtherInformation:string;
  MCVersion:string;
  MedClerkModReason:string;
  BatchNumber:string;
  EndorsementProp:string;
  IntbwInst:string;
  ExpiryDate:DateTime;
  AdminInstructions:string;
  Problem:string;
  DispensingInstructions:string;
  Usedwith:string;
  SupplyInstructions:string;
  NoofInstalments:string;
  }
  export class CRequestUnverifiedPrescription extends CLZOObject{
  CDateCriteria:CDateCriteria;
  SpecialtyOID:string;
  CareProviderOID:string;
  HOOID:string;
  UserOID:string;
  OrderStatus:string;
  WardOID:string;
  objAccessSeal:AccessSeal;
  }
  export class AccessSeal{
  RecordType:string;
  IncludeClinicianSeal:string;
  IncludeOwnSeal:string;
  IncludeOtherSeal:string;
  BreakSeal:string;
  PCCareProviderOID:number;
  PCRoleProfileOID:number;
  }
  export class CRepPatientDetails extends CLZOObject{
  PatientID:string;
  PatientName:string;
  PatientDOB:DateTime;
  strPatDOB:string;
  SEXCode:string;
  Address:string;
  NHSNO:string;
  Postcode:string;
  Ward:string;
  Clinic:string;
  }
  export class CResPrescriptionItem extends CRepPatientDetails{
  SubmitedDate:DateTime;
  Encounter:string;
  PresItemNumber:string;
  Medicationname:string;
  PresDetails:string;
  PrescribingNote:string;
  PresType:string;
  stationery:string;
  prescriber:string;
  Pharmstatus:string;
  ConsultantName:string;
  Specialty:string;
  ServicePoint:string;
  DataProviderStatus:string;
  PresSt:string;
  HighRisk:string;
  Unlicenced:string;
  NamedPatient:string;
  DrugLegend:string;
  NewlyMarketedDrug:string;
  PopenHighRisk:string;
  PcloseHighRisk:string;
  PopenUnlicenced:string;
  PcloseUnlicenced:string;
  PopenNamed:string;
  PcloseNamed:string;
  PopenNewly:string;
  PcloseNewly:string;
  }
  export class CRequestMedicationListItem extends CLZOObject{
  OCDateCriteria:CDateCriteria;
  MedicationListOID:number;
  ReturnMedicationFolderName:number;
  MedicationListType:string;
  UserOID:string;
  MedicationListSharedWith:string;
  MedicationItemOID:string;
  FormularyListStatus:number;
  }
  export class ReportResponseBase extends CLZOObject{
  HealthOrganisation:string;
  CareProviderName:string;
  Specialty:string;
  Location:string;
  UserName:string;
  PASID:string;
  PatientName:string;
  Sex:string;
  DOB:DateTime;
  Comments:string;
  Reason:string;
  }
  export class CResponseFreeTextPrescribing extends ReportResponseBase{
  FreeTextEntry:string;
  Dose:string;
  Route:string;
  Frequency:string;
  Orderstatus:string;
  VerifiedBy:string;
  AuthorisedBy:string;
  PrescriptionItem:string;
  PrescriptionType:string;
  ClinicalIndication:string;
  DOPrescribing:DateTime;
  }
  export class CRPTResMedItemDetail extends CLZOObject{
  ItemOID:string;
  DisplayName:string;
  BrandName:string;
  LorenzoID:string;
  VersionNo:string;
  DataProviderID:string;
  DataProviderType:string;
  DataProviderStatus:string;
  Synonyms:string;
  Itemtype:string;
  Status:string;
  EffectiveDTTM:string;
  DeactivatedDTTM:string;
  DeactivatedReason:string;
  Forms:string;
  Sites:string;
  Routes:string;
  ProhibitedRoutes:string;
  IsPrescribedBy:string;
  ProductTypes:string;
  HighRiskMsg:string;
  EndorsementProp:string;
  Ingredients:string;
  AdminMethod:string;
  AdminInstruction:string;
  SnomedCodes:string;
  HierarchyNodes:string;
  MonographPath:string;
  Indications:string;
  NationalFormularies:string;
  Stationeries:string;
  FormularyStatus:string;
  AdditionalItems:string;
  AlternativeItems:string;
  ContraIndications:string;
  IngClassGroups:string;
  IngCrossSenGroups:string;
  InteractionGroups:string;
  MonoInformation:string;
  IsManufacturerGeniric:string;
  Precautions:string;
  Warning:string;
  Policies:string;
  ReplacementItems:string;
  PRegimeName:string;
  PIsAccessConstraint:string;
  PIsDefault:string;
  PDisplaySeqNumber:string;
  PIndication:string;
  PDoseCalcDetail:string;
  PIsDoseCalcAlwaysUse:string;
  PRoundOff:string;
  PRequestDose:string;
  PDoseCalculationFor:string;
  PDoseCalcBasedOn:string;
  PBSAFormula:string;
  PDataFilters:string;
  PReplacementItems:string;
  PProductForm:string;
  PAdminMethod:string;
  PDose:string;
  PDoseUOM:string;
  PSites:string;
  PRoutes:string;
  PFrequency:string;
  PDirection:string;
  PVariableDoseInfo:string;
  PAdminInstruction:string;
  PSupplyDuration:string;
  PQuantityValue:string;
  PQuantityUOM:string;
  PInstruction:string;
  PStationeries:string;
  PDurationUOM:string;
  PDetails:string;
  PDoceCalcDetails:string;
  PItemOID:string;
  PItemType:string;
  }
  export class CResRepMedItem extends CLZOObject{
  MedicationItem:string;
  LZOStatus:string;
  DataProviderId:string;
  DataProviderStatus:string;
  HealthOrganisationRep:string;
  ReplacementMedItem:string;
  ReplacementMedItemID:string;
  ReplaceMedDataProviderId:string;
  PrRegimeName:string;
  PrIsDefault:string;
  PrProcessingDetail:string;
  FFormularyID:string;
  FFormularyName:string;
  FRegimeName:string;
  FProcessingDetails:string;
  MMedListId:string;
  MMedListName:string;
  MRegimeName:string;
  MProcessingDetail:string;
  UMedListId:string;
  UMedListName:string;
  UOwner:string;
  URegimeName:string;
  UProcessingDetail:string;
  AlAssociateMedItemId:string;
  AlAlternativeMedItemName:string;
  AlMedItemName:string;
  AlMedItemID:string;
  AlRegimeName:string;
  AlProceesingDetail:string;
  }
  export class CReqMedicationReportDet extends CLZOObject{
  ReportName:string;
  }
  export class CResMedicationReportDet extends CLZOObject{
  ReportTemplateOID:number;
  RDLLatestVersion:string;
  StaticFormURL:string;
  RepGrpName:string;
  }
  export class CReqUnverifiedprescriptionlist extends CLZOObject{
  HOOID:number;
  ServicePointOID:string;
  PrescriptionType:string;
  DateofAdmissionFrm:DateTime;
  DateofAdmissionTo:DateTime;
  ExpectedDODFrm:DateTime;
  ExpectedDODTo:DateTime;
  DOADomain:string;
  EDODDomain:string;
  }
  export class CResUnverifiedprescriptionlist extends CLZOObject{
  ServicePointName:string;
  PatientName:string;
  PatientID:string;
  LocationName:string;
  DateofAdmission:DateTime;
  IsClercked:boolean;
  ExpecteddischargeDttm:DateTime;
  Prescriptiondate:DateTime;
  }
  export class CReqDrugsIndicationOverride extends CLZOObject{
  CDateCriteria:CDateCriteria;
  PrescriptionUserOID:number;
  Servicepoint:string;
  }
  export class CResDrugsIndicationOverride extends CLZOObject{
  PrescriptionType:string;
  VerificationStatus:string;
  TimeOfPrescription:DateTime;
  UserId:number;
  Medication:string;
  Frequency:string;
  Direction:string;
  AdditionalInformation:string;
  SupplyDetails:string;
  SupplyInstructions:string;
  PasId:string;
  NHSId:string;
  PatientId:string;
  PatientName:string;
  PatientDOB:DateTime;
  PrescripedBy:string;
  ServicepointName:string;
  EncounterType:string;
  ConsultantName:string;
  PrescriptionItemNumber:string;
  Dose:string;
  Dosetype:string;
  Quantity:string;
  QuantityUOMNAME:string;
  QuantityUOMOID:string;
  Duration:string;
  DurationUOM:string;
  DurationUOMNAME:string;
  PrescribedOn:DateTime;
  Form:string;
  Specialty:string;
  SpecialtyName:string;
  StationeryType:string;
  Careprovider:string;
  IndicationOverriden:string;
  OverrideReason:string;
  }
  export class CReqMedicationLocalisation extends CLZOObject{
  OrgID:number;
  LocalisedFor:string;
  LocalisedID:string;
  }
  export class CResMedicationLocalisation extends CLZOObject{
  PrescribableItemName:string;
  LorenzoId:string;
  LocalisedFor:string;
  LocValCDDrug:string;
  LocValPrescribingNote:string;
  LocValRevwPeriod:string;
  LocValRevwPeriodUOM:string;
  LocValIndiRequired:string;
  LocValAddedIndications:string;
  LocValMonograph:string;
  LocValProhibIndications:string;
  LocMedicationHeaderCode:string;
  LocIsOxygen:string;
  LocIsCondDoseMoniPerReq:string;
  LocIsDisPrimaryList:string;
  LocIsInfusFluid:string;
  LocSynonym:string;
  LocalRoute:string;
  LocProhibitedRoute:string;
  LocSITE:string;
  LocDoseUOM:string;
  LocCode:string;
  LocPRNIns:string;
  LocReqResObs:string;
  LocAlternativeitem:string;
  LocCompatibleCom:string;
  LocMonographInfo:string;
  CriticalLocalRoute:string;
  }
  export class CReqPrintSupplySheet extends CLZOObject{
  HOOID:number;
  ServicePointOID:string;
  DateofSupplyFrm:DateTime;
  DateofSupplyTo:DateTime;
  PrescriptionType:string;
  PatientOID:string;
  }
  export class CResPrintSupplySheet extends CLZOObject{
  ServicePointName:string;
  PrescriptionType:string;
  PatientName:string;
  PatientId:string;
  Dispensinginstruction:string;
  RecordedAllergy:string;
  PresMedication:string;
  PresDose:string;
  PresDoseUOM:string;
  PresDosetype:string;
  PresRoute:string;
  PresFrequency:string;
  TechProdName:string;
  TechTotalQuantity:string;
  TechTotalQuantityUOM:string;
  TechSupplyInstructions:string;
  NHSId:string;
  PasId:string;
  PrescribedOn:DateTime;
  IsSealAllergyExists:string;
  Clinicallyverified:string;
  Presduration:string;
  PresdurationUOM:string;
  Stopdttm:DateTime;
  Dateofbirth:DateTime;
  Patweight:string;
  Patheight:string;
  ServicePointOID:string;
  PatientOID:string;
  SuppliedDttm:DateTime;
  PresItemOID:string;
  SupplyComments:string;
  DispensingComments:string;
  ConsultantName:string;
  SupplyDetailOID:string;
  SupplyInstructions:string;
  RequisitionDTTM:DateTime;
  HOName:string;
  CPTreatmentFucntion:string;
  TechnicallyValidatedBy:string;
  AdminInstructions:string;
  ClinicallyVerifiedDTTM:DateTime;
  Site:string;
  InfusionRate:string;
  EncounterOID:number;
  PresSecondaryOid:number;
  PresSecondaryType:string;
  PresSecondaryName:string;
  PresSecondaryDisplayOrder:number;
  DerivedSuppliedDttm:DateTime;
  PresDisplayName:string;
  ShowTopBorder:boolean;
  ShowBottomBorder:boolean;
  HideRowInfo:boolean;
  IsDummyRow:boolean;
  UniqId:string;
  }
  export class CRequestMedicationAlerts extends CLZOObject{
  objCRequestFreeTextPrescribing:CRequestFreeTextPrescribing;
  UserType:string;
  LocationOID:number;
  MedicationOID:number;
  MedicationOidType:string;
  IncludeChild:number;
  AlertType:string;
  ConflictOverridden:string;
  objAccessSeal:AccessSeal;
  }
  export class CMedicationInfo extends CLZOObject{
  PatientId:string;
  PatientName:string;
  PatientDOB:DateTime;
  PrescriptionNumber:string;
  PrescriptionItemNumber:string;
  PrescripedBy:string;
  }
  export class CResponseMedicationAlerts extends CMedicationInfo{
  HealthOrganisation:string;
  Specialty:string;
  User:string;
  Usertype:string;
  Encounter:string;
  MedicationItem:string;
  MedicationHierarchyNode:string;
  DTTMMedicationItem:DateTime;
  OrderStatus:string;
  ClinicalIndication:string;
  AlertType:string;
  ConflictSubtype:string;
  ConflictDetails:string;
  ConflictResolutionMethod:string;
  DTTMMedicationConflict:DateTime;
  ConflictMedicationItem:string;
  ConflictMedicationItemNumber:string;
  ReasonForPrescribingCM:string;
  StartDTTMCMedicationItem:DateTime;
  EndDTTMCMedicationItem:DateTime;
  EncounterCMedicationItem:string;
  ActionTakenByUser:string;
  ReasonForOverride:string;
  NameSubstitutedMItem:string;
  }
  export class MedicationListShared extends CLZOObject{
  FavouriteOID:number;
  FavouriteName:string;
  }
  export class CReqMedicationitemsadded extends CLZOObject{
  NewCatalogueVersion:string;
  OldCatalogueVersion:string;
  OrgID:number;
  MedicationItem:string;
  MedicationItemType:string;
  HOIDS:string;
  Includedefaultprocessingdetails:string;
  PrepCatalogueVersion:string;
  MedicationIT:string;
  }
  export class Ingredient extends CLZOObject{
  IngStatusHistory:StatusHistory;
  AdminWarning:CWarningMsg;
  PrescribeWarning:CWarningMsg;
  IngredientCust:IngredientCust;
  IngredientID:number;
  Name:string;
  Type:string;
  ActiveFrom:DateTime;
  ActiveTo:DateTime;
  InActiveFrom:DateTime;
  InActiveTo:DateTime;
  ExpiryReason:string;
  IngredientStatus:string;
  Status:string;
  Version:string;
  OrganisationOID:number;
  ReinstateReason:string;
  ReinstateDate:DateTime;
  SourceDataProviderType:string;
  SourceDataProviderID:string;
  LorenzoID:string;
  MCVersion:string;
  BaseIngredientName:string;
  BaseIngredientOID:number;
  nMAXRows:number;
  BIngStatus:string;
  Coding:ObservableCollection<TTOCodification>;
  }
  export class StatusHistory extends CLZOObject{
  Activity:string;
  ActivityDate:DateTime;
  Reason:string;
  ReasonforOnbehalfof:string;
  Remarks:string;
  Status:string;
  Status_Text:string;
  ActiveFrom:DateTime;
  ActiveTo:DateTime;
  OnBehalfUserOId:number;
  OnBehalfUserName:string;
  OID:number;
  Reasoncode:string;
  ActivityDateText:string;
  }
  export class Codification extends CLZOObject{
  OID:number;
  CodingschemeCode:string;
  CodingScheme:string;
  Version:string;
  Code:string;
  VersionValue:string;
  Description:string;
  CodeTerm:string;
  TermKey:string;
  ConceptCode:string;
  abnormalindicator:string;
  OwnerOrganisationOID:number;
  SNOMEDAssocTypeCode:string;
  SNOMEDAssocType:string;
  }
  export class TTOCodification extends Codification{
  SourceDataProviderType:string;
  }
  export class CWarningMsg{
  DictWarningOID:number;
  WarningMessage:string;
  DrugWarningOID:number;
  OperationMode:string;
  OrganisationOID:number;
  }
  export class IngredientCust{
  OID:number;
  IngredientOID:number;
  IsExcludeDrugDuplicationCheck:string;
  OperationMode:string;
  OrganisationOID:number;
  }
  export class CResMedicationitemsadded extends Ingredient{
  Term:string;
  MedItemTyp:string;
  }
  export class CResMsgGetMediItmDeactivation{
  oContextInformation:CContextInformation;
  resobj:ObservableCollection<CResIPPMedDeactivation>;
  }
  export class CResMedDeactivation{
  MedicationItemName:string;
  MedicationItemType:string;
  LZOMedItemId:string;
  DataProviderStatus:string;
  AutomaticDeactivation:string;
  ReplacementExists:string;
  DataProviderType:string;
  HealthOrganisationDec:string;
  PrMedItemName:string;
  PrDataProviderStatus:string;
  PrAutomaticDeactivation:string;
  PrReplacementExists:string;
  PrRegimeName:string;
  PrProcessingDetails:string;
  FFormularyName:string;
  FFormularyID:string;
  FDataProviderStatus:string;
  FAutomaticDeactivation:string;
  FReplacementExists:string;
  FRegimeName:string;
  FProcessingDetails:string;
  MMedListID:string;
  MMedListName:string;
  MDataProviderStatus:string;
  MAutomaticDeactivation:string;
  MReplacementExists:string;
  MRegimeName:string;
  MProcessingDetails:string;
  UMedListID:string;
  UMedListName:string;
  UDataProviderStatus:string;
  UAutomaticDeactivation:string;
  UReplacementExists:string;
  USentenceName:string;
  UProcessingDetails:string;
  UOwner:string;
  AlAssociateMedID:string;
  AlAdditionalMedItemName:string;
  AlDataProviderStatus:string;
  AlAutomaticDeactivation:string;
  AlReplacementExists:string;
  AlProcessingDetails:string;
  }
  export class CResIPPMedDeactivation extends CResMedDeactivation{
  PGDListName:string;
  PGDRouteOID:number;
  PGDRouteName:string;
  PGDProductFormOID:number;
  PGDProductForm:string;
  PGDDoseUOMOID:number;
  PGDPDoseUnit:string;
  PGDDrugFrequencyOID:number;
  PGDDrugFrequencyName:string;
  PGDComments:string;
  PGDDOSETYPE:string;
  PGDMAXDOSEVALUE:string;
  Medicationsentences:string;
  PGDLorenzoID:string;
  PGDDoseUOMNAME:string;
  ORDSTListName:string;
  ORDSTPDOSTYCode:string;
  ORDSTLorenzoID:string;
  ORDSTProcessingDetails:string;
  ORDSTRegimeName:string;
  STOREGListName:string;
  STOREGRouteOID:number;
  STOREGRouteName:string;
  STOREGProductFormOID:number;
  STOREGProductForm:string;
  STOREGDoseUOMOID:number;
  STOREGDoseUnit:string;
  STOREGFrequencyOID:number;
  STOREGDrugFrequencyName:string;
  STOREGComments:string;
  STOREGDOSETYPE:string;
  STOREGMAXDOSEVALUE:string;
  STOREGMedicationsentences:string;
  STOREGLorenzoID:string;
  STOREGDoseUOMName:string;
  STOREGProcessingDetails:string;
  STOREGRegimeName:string;
  MCIName:string;
  MCIDOSTYCode:string;
  MCILorenzoID:string;
  MCIProcessingDetails:string;
  MCIRegimeName:string;
  }
  export class CReqMsgGetControlledDrugs{
  reqobjBC:CReqControlledDrugs;
  oContextInformation:CContextInformation;
  }
  export class CReqControlledDrugs{
  Specialty:string;
  StationeryType:string;
  objRequestFreeTextPrescribing:CRequestFreeTextPrescribing;
  }
  export class CResMsgGetControlledDrugs{
  oContextInformation:CContextInformation;
  resobj:ObservableCollection<CResControlledDrugs>;
  }
  export class CReqMsgGetAwaitingPrescriptionsReports{
  reqobjBC:CReqAwaitingPrescription;
  oContextInformation:CContextInformation;
  }
  export class CResMsgGetAwaitingPrescriptionsReports{
  oContextInformation:CContextInformation;
  resobj:ObservableCollection<CResAwaitingPrescription>;
  }
  export class CReqMsgGetAdministeredSpecificDrug{
  reqobjBC:CReqAdministeredSpecificDrug;
  oContextInformation:CContextInformation;
  }
  export class CResMsgGetAdministeredSpecificDrug{
  oContextInformation:CContextInformation;
  resobj:ObservableCollection<CResAdministeredSpecificDrug>;
  }
  export class CReqMsgGetAdministeredEventByUser{
  reqobjBC:CReqAdministrdEventsByUser;
  oContextInformation:CContextInformation;
  }
  export class CResMsgGetAdministeredEventByUser{
  oContextInformation:CContextInformation;
  resobj:ObservableCollection<CResAdministrdEventsByUser>;
  }
  export class CReqMsgGetMedAdminExceptionReports{
  reqobjBC:CReqMedAdminException;
  oContextInformation:CContextInformation;
  }
  export class CResMsgGetMedAdminExceptionReports{
  oContextInformation:CContextInformation;
  resobj:ObservableCollection<CResMedAdminException>;
  }
  export class CReqMsgGetHistoricalMedAdminDets{
  reqobjBC:CReqHistoricalMedAdmin;
  oContextInformation:CContextInformation;
  }
  export class CResMsgGetHistoricalMedAdminDets{
  oContextInformation:CContextInformation;
  resobj:ObservableCollection<CResHistoricalMedAdmin>;
  }
  export class CReqMsgGetDrugintGrpLocalReports{
  objRequestBC:CReqDrugIntGrplocal;
  oContextInformation:CContextInformation;
  }
  export class CResMsgGetDrugintGrpLocalReports{
  oContextInformation:CContextInformation;
  objInteractionGroup:ObservableCollection<CResDrugIntGrplocal>;
  }
  export class CReqMsgGetDiscontinuedMedication{
  reqobjBC:CReqDisMedication;
  oContextInformation:CContextInformation;
  }
  export class CReqDisMedication{
  Specialty:string;
  PatientAge:string;
  PatientID:string;
  FormCompleted:string;
  oDateCriteria:CDateCriteria;
  }
  export class CResMsgGetDiscontinuedMedication{
  oContextInformation:CContextInformation;
  resobj:ObservableCollection<CResDisMedication>;
  }
  export class CReqMsgGetPatientMedication{
  reqobjBC:CReqPatientMedication;
  oContextInformation:CContextInformation;
  }
  export class CResMsgGetPatientMedication{
  oContextInformation:CContextInformation;
  resobj:ObservableCollection<CResPatientMedication>;
  }
  export class CReqMsgGetUnverifiedPrescription{
  reqobjBC:CRequestUnverifiedPrescription;
  oContextInformation:CContextInformation;
  }
  export class CResMsgGetUnverifiedPrescription{
  oContextInformation:CContextInformation;
  resobj:ObservableCollection<CResponseUnverifiedPrescription>;
  }
  export class CReqMsgGetPrescriptionItem{
  reqobjBC:CReqPrescriptionItem;
  oContextInformation:CContextInformation;
  }
  export class CReqPrescriptionItem{
  oDateCriteria:CDateCriteria;
  LocationOID:string;
  PrescriptionType:string;
  PrescriptionItemStatus:string;
  SpecialtyOID:string;
  ConsultantOID:string;
  ServicePointOID:number;
  UserOID:string;
  MediItemOID:string;
  MedTempTypeOID:string;
  MediHierarchyNode:string;
  IsChildrensInSerarch:number;
  FlaggedMHRA:number;
  FlaggedHighRisk:number;
  FlaggedPatient:number;
  FlaggedUnlicensed:number;
  ShowPrescribingNote:number;
  }
  export class CResMsgGetPrescriptionItem{
  oContextInformation:CContextInformation;
  resobj:ObservableCollection<CResPrescriptionItem>;
  }
  export class CReqMsgGetFormularyItem{
  reqobjBC:CRequestFormularyItemList;
  oContextInformation:CContextInformation;
  }
  export class CRequestFormularyItemList{
  HealthOrganisationOID:string;
  MedicationItemName:string;
  FormularyListStatus:string;
  AddedDate:string;
  FormularyIdName:string;
  MCVersion:number;
  FormularyID:string;
  }
  export class CResMsgGetFormularyItem{
  oContextInformation:CContextInformation;
  resobj:ObservableCollection<CResponseFormularyItemList>;
  }
  export class CResponseFormularyItemList{
  FormularyName:string;
  FormularyCodeAndID:string;
  FormularyVersion:string;
  Healthorganisation:string;
  MainFormularyFlagFormularyType:string;
  Hierarchy:string;
  DefaultValueFlag:string;
  MedicationItemName:string;
  Form:string;
  Dose:string;
  Route:string;
  Frequency:string;
  Duration:string;
  Quantity:string;
  AdministrationInstruction:string;
  SupplyInstruction:string;
  StationeryTemplate:string;
  FormularyNote:string;
  DateTimeAddedToFormularyList:DateTime;
  Effectivedate:DateTime;
  Expirydate:DateTime;
  }
  export class cResponseMedicationListItem extends CResponseFormularyItemList{
  MediLstNameID:string;
  MediLstSharedWith:string;
  TopLvlFolderName:string;
  ParentFolderName:string;
  FolderName:string;
  FolderLevel:string;
  FolderPosNo:number;
  MediOrdSentPos:string;
  AlwaysusCalc:string;
  DoseCalcFor:string;
  DoseCalcBasedon:string;
  BSAFormula:string;
  ReqDose:string;
  RoundOfDose:string;
  }
  export class CReqMsgGetMedicationItemList{
  reqobjBC:CRequestMedicationListItem;
  oContextInformation:CContextInformation;
  }
  export class CResMsgGetMedicationItemList{
  oContextInformation:CContextInformation;
  resobj:ObservableCollection<cResponseMedicationListItem>;
  }
  export class CReqMsgGetFreeTextPrescribing{
  reqobjBC:CRequestFreeTextPrescribing;
  oContextInformation:CContextInformation;
  }
  export class CResMsgGetFreeTextPrescribing{
  oContextInformation:CContextInformation;
  resobj:ObservableCollection<CResponseFreeTextPrescribing>;
  }
  export class CReqMsgGetMedItemDetail{
  objRequestBC:CReqMedItemDetails;
  oContextInformation:CContextInformation;
  }
  export class CReqMedItemDetails{
  MedItemOidandType:string;
  MCVersion:string;
  OrganisationOIDs:string;
  IsIncDefProcessing:string;
  }
  export class CResMsgGetMedItemDetail{
  oContextInformation:CContextInformation;
  oResMedItemDetail:ObservableCollection<CRPTResMedItemDetail>;
  }
  export class CReqMsgGetReplaceMedication{
  reqobjBC:CReqMediItmDeactivation;
  oContextInformation:CContextInformation;
  }
  export class CResMsgGetReplaceMedication{
  oContextInformation:CContextInformation;
  resobj:ObservableCollection<CResRepMedItem>;
  }
  export class CReqMsgGetMedicationReportDet{
  reqobjBC:CReqMedicationReportDet;
  oContextInformation:CContextInformation;
  }
  export class CResMsgGetMedicationReportDet{
  resobj:CResMedicationReportDet;
  oContextInformation:CContextInformation;
  }
  export class CReqMsgGetUnverprelistReportData{
  reqobjBC:CReqUnverifiedprescriptionlist;
  oContextInformation:CContextInformation;
  }
  export class CResMsgGetUnverprelistReportData{
  oContextInformation:CContextInformation;
  resobj:ObservableCollection<CResUnverifiedprescriptionlist>;
  }
  export class CReqMsgGetDrugIndicationOverride{
  reqobjBC:CReqDrugsIndicationOverride;
  oContextInformation:CContextInformation;
  }
  export class CResMsgGetDrugIndicationOverride{
  oContextInformation:CContextInformation;
  resobj:ObservableCollection<CResDrugsIndicationOverride>;
  }
  export class CReqMsgGetMedicationLocalisation{
  reqobjBC:CReqMedicationLocalisation;
  oContextInformation:CContextInformation;
  }
  export class CResMsgGetMedicationLocalisation{
  oContextInformation:CContextInformation;
  resobj:ObservableCollection<CResMedicationLocalisation>;
  }
  export class CReqMsgGetPrintSupplyReqSheet{
  reqobjBC:CReqPrintSupplySheet;
  oContextInformation:CContextInformation;
  }
  export class CResMsgGetPrintSupplyReqSheet{
  oContextInformation:CContextInformation;
  resobj:ObservableCollection<CResPrintSupplySheet>;
  }
  export class CReqMsgGetMedicationAlerts{
  reqobjBC:CRequestMedicationAlerts;
  oContextInformation:CContextInformation;
  }
  export class CResMsgGetMedicationAlerts{
  oContextInformation:CContextInformation;
  resobj:ObservableCollection<CResponseMedicationAlerts>;
  }
  export class CReqMsgGetMedicationListShared{
  mcversionnoBC:string;
  oContextInformation:CContextInformation;
  }
  export class CResMsgGetMedicationListShared{
  oContextInformation:CContextInformation;
  ResMedicationListShared:ObservableCollection<MedicationListShared>;
  }
  export class CReqMsgGetFormularyIDName{
  OrganisationIDBC:number;
  MCVersionBC:string;
  oContextInformation:CContextInformation;
  }
  export class CResMsgGetFormularyIDName{
  oContextInformation:CContextInformation;
  responseFormularyIDName:ObservableCollection<CresponseFormularyIDName>;
  }
  export class CresponseFormularyIDName{
  FormularyOID:string;
  FormularyName:string;
  }
  export class CReqMsgGetMedItemsAdded{
  reqobjBC:CReqMedicationitemsadded;
  oContextInformation:CContextInformation;
  }
  export class CResMsgGetMedItemsAdded{
  oContextInformation:CContextInformation;
  resobj:ObservableCollection<CResMedicationitemsadded>;
  }
  
 const prototypeList = {"IPPMAMedicationReportsWS.GetMediItmDeactivation":CResMsgGetMediItmDeactivation.prototype ,
"IPPMAMedicationReportsWS.GetControlledDrugs":CResMsgGetControlledDrugs.prototype ,
"IPPMAMedicationReportsWS.GetAwaitingPrescriptionsReports":CResMsgGetAwaitingPrescriptionsReports.prototype ,
"IPPMAMedicationReportsWS.GetAdministeredSpecificDrug":CResMsgGetAdministeredSpecificDrug.prototype ,
"IPPMAMedicationReportsWS.GetAdministeredEventByUser":CResMsgGetAdministeredEventByUser.prototype ,
"IPPMAMedicationReportsWS.GetMedAdminExceptionReports":CResMsgGetMedAdminExceptionReports.prototype ,
"IPPMAMedicationReportsWS.GetHistoricalMedAdminDets":CResMsgGetHistoricalMedAdminDets.prototype ,
"IPPMAMedicationReportsWS.GetDrugintGrpLocalReports":CResMsgGetDrugintGrpLocalReports.prototype ,
"IPPMAMedicationReportsWS.GetDiscontinuedMedication":CResMsgGetDiscontinuedMedication.prototype ,
"IPPMAMedicationReportsWS.GetPatientMedication":CResMsgGetPatientMedication.prototype ,
"IPPMAMedicationReportsWS.GetUnverifiedPrescription":CResMsgGetUnverifiedPrescription.prototype ,
"IPPMAMedicationReportsWS.GetPrescriptionItem":CResMsgGetPrescriptionItem.prototype ,
"IPPMAMedicationReportsWS.GetFormularyItem":CResMsgGetFormularyItem.prototype ,
"IPPMAMedicationReportsWS.GetMedicationItemList":CResMsgGetMedicationItemList.prototype ,
"IPPMAMedicationReportsWS.GetFreeTextPrescribing":CResMsgGetFreeTextPrescribing.prototype ,
"IPPMAMedicationReportsWS.GetMedItemDetail":CResMsgGetMedItemDetail.prototype ,
"IPPMAMedicationReportsWS.GetReplaceMedication":CResMsgGetReplaceMedication.prototype ,
"IPPMAMedicationReportsWS.GetMedicationReportDet":CResMsgGetMedicationReportDet.prototype ,
"IPPMAMedicationReportsWS.GetUnverprelistReportData":CResMsgGetUnverprelistReportData.prototype ,
"IPPMAMedicationReportsWS.GetDrugIndicationOverride":CResMsgGetDrugIndicationOverride.prototype ,
"IPPMAMedicationReportsWS.GetMedicationLocalisation":CResMsgGetMedicationLocalisation.prototype ,
"IPPMAMedicationReportsWS.GetPrintSupplyReqSheet":CResMsgGetPrintSupplyReqSheet.prototype ,
"IPPMAMedicationReportsWS.GetMedicationAlerts":CResMsgGetMedicationAlerts.prototype ,
"IPPMAMedicationReportsWS.GetMedicationListShared":CResMsgGetMedicationListShared.prototype ,
"IPPMAMedicationReportsWS.GetFormularyIDName":CResMsgGetFormularyIDName.prototype ,
"IPPMAMedicationReportsWS.GetMedItemsAdded":CResMsgGetMedItemsAdded.prototype ,

CReqMsgGetMediItmDeactivation : { 
reqobjBC:CReqIPPMediItmDeactivation.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CRequestFreeTextPrescribing : { 
CDateCriteria:CDateCriteria.prototype ,

 },CReqAwaitingPrescription : { 
oDateCriteria:CDateCriteria.prototype ,

 },CReqAdministeredSpecificDrug : { 
OCDateCriteria:CDateCriteria.prototype ,

 },CReqAdministrdEventsByUser : { 
oDateCriteria:CDateCriteria.prototype ,

 },CReqMedAdminException : { 
oDateCriteria:CDateCriteria.prototype ,

 },CReqHistoricalMedAdmin : { 
oDateCriteria:CDateCriteria.prototype ,

 },CRequestUnverifiedPrescription : { 
CDateCriteria:CDateCriteria.prototype ,
objAccessSeal:AccessSeal.prototype ,

 },CRequestMedicationListItem : { 
OCDateCriteria:CDateCriteria.prototype ,

 },CReqDrugsIndicationOverride : { 
CDateCriteria:CDateCriteria.prototype ,

 },CRequestMedicationAlerts : { 
objCRequestFreeTextPrescribing:CRequestFreeTextPrescribing.prototype ,
objAccessSeal:AccessSeal.prototype ,

 },Ingredient : { 
IngStatusHistory:StatusHistory.prototype ,
AdminWarning:CWarningMsg.prototype ,
PrescribeWarning:CWarningMsg.prototype ,
IngredientCust:IngredientCust.prototype ,
Coding:TTOCodification.prototype ,

 },CResMsgGetMediItmDeactivation : { 
oContextInformation:CContextInformation.prototype ,
resobj:CResIPPMedDeactivation.prototype ,

 },CReqMsgGetControlledDrugs : { 
reqobjBC:CReqControlledDrugs.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqControlledDrugs : { 
objRequestFreeTextPrescribing:CRequestFreeTextPrescribing.prototype ,

 },CResMsgGetControlledDrugs : { 
oContextInformation:CContextInformation.prototype ,
resobj:CResControlledDrugs.prototype ,

 },CReqMsgGetAwaitingPrescriptionsReports : { 
reqobjBC:CReqAwaitingPrescription.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAwaitingPrescriptionsReports : { 
oContextInformation:CContextInformation.prototype ,
resobj:CResAwaitingPrescription.prototype ,

 },CReqMsgGetAdministeredSpecificDrug : { 
reqobjBC:CReqAdministeredSpecificDrug.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAdministeredSpecificDrug : { 
oContextInformation:CContextInformation.prototype ,
resobj:CResAdministeredSpecificDrug.prototype ,

 },CReqMsgGetAdministeredEventByUser : { 
reqobjBC:CReqAdministrdEventsByUser.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAdministeredEventByUser : { 
oContextInformation:CContextInformation.prototype ,
resobj:CResAdministrdEventsByUser.prototype ,

 },CReqMsgGetMedAdminExceptionReports : { 
reqobjBC:CReqMedAdminException.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMedAdminExceptionReports : { 
oContextInformation:CContextInformation.prototype ,
resobj:CResMedAdminException.prototype ,

 },CReqMsgGetHistoricalMedAdminDets : { 
reqobjBC:CReqHistoricalMedAdmin.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetHistoricalMedAdminDets : { 
oContextInformation:CContextInformation.prototype ,
resobj:CResHistoricalMedAdmin.prototype ,

 },CReqMsgGetDrugintGrpLocalReports : { 
objRequestBC:CReqDrugIntGrplocal.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDrugintGrpLocalReports : { 
oContextInformation:CContextInformation.prototype ,
objInteractionGroup:CResDrugIntGrplocal.prototype ,

 },CReqMsgGetDiscontinuedMedication : { 
reqobjBC:CReqDisMedication.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqDisMedication : { 
oDateCriteria:CDateCriteria.prototype ,

 },CResMsgGetDiscontinuedMedication : { 
oContextInformation:CContextInformation.prototype ,
resobj:CResDisMedication.prototype ,

 },CReqMsgGetPatientMedication : { 
reqobjBC:CReqPatientMedication.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPatientMedication : { 
oContextInformation:CContextInformation.prototype ,
resobj:CResPatientMedication.prototype ,

 },CReqMsgGetUnverifiedPrescription : { 
reqobjBC:CRequestUnverifiedPrescription.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetUnverifiedPrescription : { 
oContextInformation:CContextInformation.prototype ,
resobj:CResponseUnverifiedPrescription.prototype ,

 },CReqMsgGetPrescriptionItem : { 
reqobjBC:CReqPrescriptionItem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqPrescriptionItem : { 
oDateCriteria:CDateCriteria.prototype ,

 },CResMsgGetPrescriptionItem : { 
oContextInformation:CContextInformation.prototype ,
resobj:CResPrescriptionItem.prototype ,

 },CReqMsgGetFormularyItem : { 
reqobjBC:CRequestFormularyItemList.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFormularyItem : { 
oContextInformation:CContextInformation.prototype ,
resobj:CResponseFormularyItemList.prototype ,

 },CReqMsgGetMedicationItemList : { 
reqobjBC:CRequestMedicationListItem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMedicationItemList : { 
oContextInformation:CContextInformation.prototype ,
resobj:cResponseMedicationListItem.prototype ,

 },CReqMsgGetFreeTextPrescribing : { 
reqobjBC:CRequestFreeTextPrescribing.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFreeTextPrescribing : { 
oContextInformation:CContextInformation.prototype ,
resobj:CResponseFreeTextPrescribing.prototype ,

 },CReqMsgGetMedItemDetail : { 
objRequestBC:CReqMedItemDetails.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMedItemDetail : { 
oContextInformation:CContextInformation.prototype ,
oResMedItemDetail:CRPTResMedItemDetail.prototype ,

 },CReqMsgGetReplaceMedication : { 
reqobjBC:CReqMediItmDeactivation.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetReplaceMedication : { 
oContextInformation:CContextInformation.prototype ,
resobj:CResRepMedItem.prototype ,

 },CReqMsgGetMedicationReportDet : { 
reqobjBC:CReqMedicationReportDet.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMedicationReportDet : { 
resobj:CResMedicationReportDet.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetUnverprelistReportData : { 
reqobjBC:CReqUnverifiedprescriptionlist.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetUnverprelistReportData : { 
oContextInformation:CContextInformation.prototype ,
resobj:CResUnverifiedprescriptionlist.prototype ,

 },CReqMsgGetDrugIndicationOverride : { 
reqobjBC:CReqDrugsIndicationOverride.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDrugIndicationOverride : { 
oContextInformation:CContextInformation.prototype ,
resobj:CResDrugsIndicationOverride.prototype ,

 },CReqMsgGetMedicationLocalisation : { 
reqobjBC:CReqMedicationLocalisation.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMedicationLocalisation : { 
oContextInformation:CContextInformation.prototype ,
resobj:CResMedicationLocalisation.prototype ,

 },CReqMsgGetPrintSupplyReqSheet : { 
reqobjBC:CReqPrintSupplySheet.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPrintSupplyReqSheet : { 
oContextInformation:CContextInformation.prototype ,
resobj:CResPrintSupplySheet.prototype ,

 },CReqMsgGetMedicationAlerts : { 
reqobjBC:CRequestMedicationAlerts.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMedicationAlerts : { 
oContextInformation:CContextInformation.prototype ,
resobj:CResponseMedicationAlerts.prototype ,

 },CReqMsgGetMedicationListShared : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMedicationListShared : { 
oContextInformation:CContextInformation.prototype ,
ResMedicationListShared:MedicationListShared.prototype ,

 },CReqMsgGetFormularyIDName : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFormularyIDName : { 
oContextInformation:CContextInformation.prototype ,
responseFormularyIDName:CresponseFormularyIDName.prototype ,

 },CReqMsgGetMedItemsAdded : { 
reqobjBC:CReqMedicationitemsadded.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMedItemsAdded : { 
oContextInformation:CContextInformation.prototype ,
resobj:CResMedicationitemsadded.prototype ,

 },CContextInformation : { 
Current:CContextInformation.prototype ,

 },
 }
 
const charPropertyLookup = [
'IsInfusion','IsBolus',]
 