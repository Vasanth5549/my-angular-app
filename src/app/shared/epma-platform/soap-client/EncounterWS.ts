import DateTime from "epma-platform/DateTime";
import { byte, CContextInformation, CLZOObject, ObservableCollection } from "epma-platform/models";
import { HelperService } from "./helper.service";
export class EncounterWSWSSoapClient {

GetPatientEncountersforTypeCompleted: Function;
GetPatientEncountersforTypeAsync(oCReqMsgGetPatientEncountersforType:CReqMsgGetPatientEncountersforType ) : void {
  HelperService.Invoke<CReqMsgGetPatientEncountersforType,CResMsgGetPatientEncountersforType,GetPatientEncountersforTypeCompletedEventArgs>("EncounterWS.GetPatientEncountersforType",oCReqMsgGetPatientEncountersforType,this.GetPatientEncountersforTypeCompleted,"objEncounter",new GetPatientEncountersforTypeCompletedEventArgs(), prototypeList);
}

GetPatientEncountersforRangeCompleted: Function;
GetPatientEncountersforRangeAsync(oCReqMsgGetPatientEncountersforRange:CReqMsgGetPatientEncountersforRange ) : void {
  HelperService.Invoke<CReqMsgGetPatientEncountersforRange,CResMsgGetPatientEncountersforRange,GetPatientEncountersforRangeCompletedEventArgs>("EncounterWS.GetPatientEncountersforRange",oCReqMsgGetPatientEncountersforRange,this.GetPatientEncountersforRangeCompleted,"objEncounter",new GetPatientEncountersforRangeCompletedEventArgs(), prototypeList);
}

GetReferralforPatientCompleted: Function;
GetReferralforPatientAsync(oCReqMsgGetReferralforPatient:CReqMsgGetReferralforPatient ) : void {
  HelperService.Invoke<CReqMsgGetReferralforPatient,CResMsgGetReferralforPatient,GetReferralforPatientCompletedEventArgs>("EncounterWS.GetReferralforPatient",oCReqMsgGetReferralforPatient,this.GetReferralforPatientCompleted,"objEncounter",new GetReferralforPatientCompletedEventArgs(), prototypeList);
}

GetPatientEncountersforReferralCompleted: Function;
GetPatientEncountersforReferralAsync(oCReqMsgGetPatientEncountersforReferral:CReqMsgGetPatientEncountersforReferral ) : void {
  HelperService.Invoke<CReqMsgGetPatientEncountersforReferral,CResMsgGetPatientEncountersforReferral,GetPatientEncountersforReferralCompletedEventArgs>("EncounterWS.GetPatientEncountersforReferral",oCReqMsgGetPatientEncountersforReferral,this.GetPatientEncountersforReferralCompleted,"objEncounter",new GetPatientEncountersforReferralCompletedEventArgs(), prototypeList);
}

GetProblemsforPatientCompleted: Function;
GetProblemsforPatientAsync(oCReqMsgGetProblemsforPatient:CReqMsgGetProblemsforPatient ) : void {
  HelperService.Invoke<CReqMsgGetProblemsforPatient,CResMsgGetProblemsforPatient,GetProblemsforPatientCompletedEventArgs>("EncounterWS.GetProblemsforPatient",oCReqMsgGetProblemsforPatient,this.GetProblemsforPatientCompleted,"objEncounter",new GetProblemsforPatientCompletedEventArgs(), prototypeList);
}

GetPatientProblemCompleted: Function;
GetPatientProblemAsync(oCReqMsgGetPatientProblem:CReqMsgGetPatientProblem ) : void {
  HelperService.Invoke<CReqMsgGetPatientProblem,CResMsgGetPatientProblem,GetPatientProblemCompletedEventArgs>("EncounterWS.GetPatientProblem",oCReqMsgGetPatientProblem,this.GetPatientProblemCompleted,"PatientProblemOID",new GetPatientProblemCompletedEventArgs(), prototypeList);
}

GetEpisodesByPatOIDCompleted: Function;
GetEpisodesByPatOIDAsync(oCReqMsgGetEpisodesByPatOID:CReqMsgGetEpisodesByPatOID ) : void {
  HelperService.Invoke<CReqMsgGetEpisodesByPatOID,CResMsgGetEpisodesByPatOID,GetEpisodesByPatOIDCompletedEventArgs>("EncounterWS.GetEpisodesByPatOID",oCReqMsgGetEpisodesByPatOID,this.GetEpisodesByPatOIDCompleted,"IsJIT",new GetEpisodesByPatOIDCompletedEventArgs(), prototypeList);
}

CheckEncExistForPatientCompleted: Function;
CheckEncExistForPatientAsync(oCReqMsgCheckEncExistForPatient:CReqMsgCheckEncExistForPatient ) : void {
  HelperService.Invoke<CReqMsgCheckEncExistForPatient,CResMsgCheckEncExistForPatient,CheckEncExistForPatientCompletedEventArgs>("EncounterWS.CheckEncExistForPatient",oCReqMsgCheckEncExistForPatient,this.CheckEncExistForPatientCompleted,"EncStatusCode",new CheckEncExistForPatientCompletedEventArgs(), prototypeList);
}

CheckEncExistCNSCompleted: Function;
CheckEncExistCNSAsync(oCReqMsgCheckEncExistCNS:CReqMsgCheckEncExistCNS ) : void {
  HelperService.Invoke<CReqMsgCheckEncExistCNS,CResMsgCheckEncExistCNS,CheckEncExistCNSCompletedEventArgs>("EncounterWS.CheckEncExistCNS",oCReqMsgCheckEncExistCNS,this.CheckEncExistCNSCompleted,"OrganisationOID",new CheckEncExistCNSCompletedEventArgs(), prototypeList);
}

GetEpisodesForRefTypeCompleted: Function;
GetEpisodesForRefTypeAsync(oCReqMsgGetEpisodesForRefType:CReqMsgGetEpisodesForRefType ) : void {
  HelperService.Invoke<CReqMsgGetEpisodesForRefType,CResMsgGetEpisodesForRefType,GetEpisodesForRefTypeCompletedEventArgs>("EncounterWS.GetEpisodesForRefType",oCReqMsgGetEpisodesForRefType,this.GetEpisodesForRefTypeCompleted,"oReferrals",new GetEpisodesForRefTypeCompletedEventArgs(), prototypeList);
}

pGetEncountersForTheatrePatientCompleted: Function;
pGetEncountersForTheatrePatientAsync(oCReqMsgpGetEncountersForTheatrePatient:CReqMsgpGetEncountersForTheatrePatient ) : void {
  HelperService.Invoke<CReqMsgpGetEncountersForTheatrePatient,CResMsgpGetEncountersForTheatrePatient,pGetEncountersForTheatrePatientCompletedEventArgs>("EncounterWS.pGetEncountersForTheatrePatient",oCReqMsgpGetEncountersForTheatrePatient,this.pGetEncountersForTheatrePatientCompleted,"sBookingOID",new pGetEncountersForTheatrePatientCompletedEventArgs(), prototypeList);
}

GetEpiEncDetailsByPatOIDCompleted: Function;
GetEpiEncDetailsByPatOIDAsync(oCReqMsgGetEpiEncDetailsByPatOID:CReqMsgGetEpiEncDetailsByPatOID ) : void {
  HelperService.Invoke<CReqMsgGetEpiEncDetailsByPatOID,CResMsgGetEpiEncDetailsByPatOID,GetEpiEncDetailsByPatOIDCompletedEventArgs>("EncounterWS.GetEpiEncDetailsByPatOID",oCReqMsgGetEpiEncDetailsByPatOID,this.GetEpiEncDetailsByPatOIDCompleted,"EncounterOID",new GetEpiEncDetailsByPatOIDCompletedEventArgs(), prototypeList);
}

GetTrtmntFunDetByPatOIDCompleted: Function;
GetTrtmntFunDetByPatOIDAsync(oCReqMsgGetTrtmntFunDetByPatOID:CReqMsgGetTrtmntFunDetByPatOID ) : void {
  HelperService.Invoke<CReqMsgGetTrtmntFunDetByPatOID,CResMsgGetTrtmntFunDetByPatOID,GetTrtmntFunDetByPatOIDCompletedEventArgs>("EncounterWS.GetTrtmntFunDetByPatOID",oCReqMsgGetTrtmntFunDetByPatOID,this.GetTrtmntFunDetByPatOIDCompleted,"PatientOID",new GetTrtmntFunDetByPatOIDCompletedEventArgs(), prototypeList);
}

GetPatientEnquiryDetailsCompleted: Function;
GetPatientEnquiryDetailsAsync(oCReqMsgGetPatientEnquiryDetails:CReqMsgGetPatientEnquiryDetails ) : void {
  HelperService.Invoke<CReqMsgGetPatientEnquiryDetails,CResMsgGetPatientEnquiryDetails,GetPatientEnquiryDetailsCompletedEventArgs>("EncounterWS.GetPatientEnquiryDetails",oCReqMsgGetPatientEnquiryDetails,this.GetPatientEnquiryDetailsCompleted,"oPatEnquiry",new GetPatientEnquiryDetailsCompletedEventArgs(), prototypeList);
}

GetPatientPatAPPSUMRYDetailsCompleted: Function;
GetPatientPatAPPSUMRYDetailsAsync(oCReqMsgGetPatientPatAPPSUMRYDetails:CReqMsgGetPatientPatAPPSUMRYDetails ) : void {
  HelperService.Invoke<CReqMsgGetPatientPatAPPSUMRYDetails,CResMsgGetPatientPatAPPSUMRYDetails,GetPatientPatAPPSUMRYDetailsCompletedEventArgs>("EncounterWS.GetPatientPatAPPSUMRYDetails",oCReqMsgGetPatientPatAPPSUMRYDetails,this.GetPatientPatAPPSUMRYDetailsCompleted,"oPatEnquiry",new GetPatientPatAPPSUMRYDetailsCompletedEventArgs(), prototypeList);
}

GetEpisodesPagingCompleted: Function;
GetEpisodesPagingAsync(oCReqMsgGetEpisodesPaging:CReqMsgGetEpisodesPaging ) : void {
  HelperService.Invoke<CReqMsgGetEpisodesPaging,CResMsgGetEpisodesPaging,GetEpisodesPagingCompletedEventArgs>("EncounterWS.GetEpisodesPaging",oCReqMsgGetEpisodesPaging,this.GetEpisodesPagingCompleted,"pElement",new GetEpisodesPagingCompletedEventArgs(), prototypeList);
}

GetEncountersPagingCompleted: Function;
GetEncountersPagingAsync(oCReqMsgGetEncountersPaging:CReqMsgGetEncountersPaging ) : void {
  HelperService.Invoke<CReqMsgGetEncountersPaging,CResMsgGetEncountersPaging,GetEncountersPagingCompletedEventArgs>("EncounterWS.GetEncountersPaging",oCReqMsgGetEncountersPaging,this.GetEncountersPagingCompleted,"pElement",new GetEncountersPagingCompletedEventArgs(), prototypeList);
}

GetCareEventsPagingCompleted: Function;
GetCareEventsPagingAsync(oCReqMsgGetCareEventsPaging:CReqMsgGetCareEventsPaging ) : void {
  HelperService.Invoke<CReqMsgGetCareEventsPaging,CResMsgGetCareEventsPaging,GetCareEventsPagingCompletedEventArgs>("EncounterWS.GetCareEventsPaging",oCReqMsgGetCareEventsPaging,this.GetCareEventsPagingCompleted,"pElement",new GetCareEventsPagingCompletedEventArgs(), prototypeList);
}

GetEncountersForDMWPatientCompleted: Function;
GetEncountersForDMWPatientAsync(oCReqMsgGetEncountersForDMWPatient:CReqMsgGetEncountersForDMWPatient ) : void {
  HelperService.Invoke<CReqMsgGetEncountersForDMWPatient,CResMsgGetEncountersForDMWPatient,GetEncountersForDMWPatientCompletedEventArgs>("EncounterWS.GetEncountersForDMWPatient",oCReqMsgGetEncountersForDMWPatient,this.GetEncountersForDMWPatientCompleted,"objEncounter",new GetEncountersForDMWPatientCompletedEventArgs(), prototypeList);
}

GetEpisodeDetailsForEncCompleted: Function;
GetEpisodeDetailsForEncAsync(oCReqMsgGetEpisodeDetailsForEnc:CReqMsgGetEpisodeDetailsForEnc ) : void {
  HelperService.Invoke<CReqMsgGetEpisodeDetailsForEnc,CResMsgGetEpisodeDetailsForEnc,GetEpisodeDetailsForEncCompletedEventArgs>("EncounterWS.GetEpisodeDetailsForEnc",oCReqMsgGetEpisodeDetailsForEnc,this.GetEpisodeDetailsForEncCompleted,"EncounterOID",new GetEpisodeDetailsForEncCompletedEventArgs(), prototypeList);
}

GetEpisodeCompleted: Function;
GetEpisodeAsync(oCReqMsgGetEpisode:CReqMsgGetEpisode ) : void {
  HelperService.Invoke<CReqMsgGetEpisode,CResMsgGetEpisode,GetEpisodeCompletedEventArgs>("EncounterWS.GetEpisode",oCReqMsgGetEpisode,this.GetEpisodeCompleted,"pElement",new GetEpisodeCompletedEventArgs(), prototypeList);
}

GetPatEpisodePathwayDetailsCompleted: Function;
GetPatEpisodePathwayDetailsAsync(oCReqMsgGetPatEpisodePathwayDetails:CReqMsgGetPatEpisodePathwayDetails ) : void {
  HelperService.Invoke<CReqMsgGetPatEpisodePathwayDetails,CResMsgGetPatEpisodePathwayDetails,GetPatEpisodePathwayDetailsCompletedEventArgs>("EncounterWS.GetPatEpisodePathwayDetails",oCReqMsgGetPatEpisodePathwayDetails,this.GetPatEpisodePathwayDetailsCompleted,"bIsMerged",new GetPatEpisodePathwayDetailsCompletedEventArgs(), prototypeList);
}

GetEncountersForPatientCompleted: Function;
GetEncountersForPatientAsync(oCReqMsgGetEncountersForPatient:CReqMsgGetEncountersForPatient ) : void {
  HelperService.Invoke<CReqMsgGetEncountersForPatient,CResMsgGetEncountersForPatient,GetEncountersForPatientCompletedEventArgs>("EncounterWS.GetEncountersForPatient",oCReqMsgGetEncountersForPatient,this.GetEncountersForPatientCompleted,"pElement",new GetEncountersForPatientCompletedEventArgs(), prototypeList);
}

GetEncountersForEpisodeCompleted: Function;
GetEncountersForEpisodeAsync(oCReqMsgGetEncountersForEpisode:CReqMsgGetEncountersForEpisode ) : void {
  HelperService.Invoke<CReqMsgGetEncountersForEpisode,CResMsgGetEncountersForEpisode,GetEncountersForEpisodeCompletedEventArgs>("EncounterWS.GetEncountersForEpisode",oCReqMsgGetEncountersForEpisode,this.GetEncountersForEpisodeCompleted,"objEncounter",new GetEncountersForEpisodeCompletedEventArgs(), prototypeList);
}

GetEncounterCompleted: Function;
GetEncounterAsync(oCReqMsgGetEncounter:CReqMsgGetEncounter ) : void {
  HelperService.Invoke<CReqMsgGetEncounter,CResMsgGetEncounter,GetEncounterCompletedEventArgs>("EncounterWS.GetEncounter",oCReqMsgGetEncounter,this.GetEncounterCompleted,"objEncounter",new GetEncounterCompletedEventArgs(), prototypeList);
}

GetEncounterForCareEventsCompleted: Function;
GetEncounterForCareEventsAsync(oCReqMsgGetEncounterForCareEvents:CReqMsgGetEncounterForCareEvents ) : void {
  HelperService.Invoke<CReqMsgGetEncounterForCareEvents,CResMsgGetEncounterForCareEvents,GetEncounterForCareEventsCompletedEventArgs>("EncounterWS.GetEncounterForCareEvents",oCReqMsgGetEncounterForCareEvents,this.GetEncounterForCareEventsCompleted,"objEncounter",new GetEncounterForCareEventsCompletedEventArgs(), prototypeList);
}

GetSealEncounterCompleted: Function;
GetSealEncounterAsync(oCReqMsgGetSealEncounter:CReqMsgGetSealEncounter ) : void {
  HelperService.Invoke<CReqMsgGetSealEncounter,CResMsgGetSealEncounter,GetSealEncounterCompletedEventArgs>("EncounterWS.GetSealEncounter",oCReqMsgGetSealEncounter,this.GetSealEncounterCompleted,"objEncounter",new GetSealEncounterCompletedEventArgs(), prototypeList);
}

GetEncounterHOForPatientCompleted: Function;
GetEncounterHOForPatientAsync(oCReqMsgGetEncounterHOForPatient:CReqMsgGetEncounterHOForPatient ) : void {
  HelperService.Invoke<CReqMsgGetEncounterHOForPatient,CResMsgGetEncounterHOForPatient,GetEncounterHOForPatientCompletedEventArgs>("EncounterWS.GetEncounterHOForPatient",oCReqMsgGetEncounterHOForPatient,this.GetEncounterHOForPatientCompleted,"sPatientOId",new GetEncounterHOForPatientCompletedEventArgs(), prototypeList);
}

CheckEncExistCompleted: Function;
CheckEncExistAsync(oCReqMsgCheckEncExist:CReqMsgCheckEncExist ) : void {
  HelperService.Invoke<CReqMsgCheckEncExist,CResMsgCheckEncExist,CheckEncExistCompletedEventArgs>("EncounterWS.CheckEncExist",oCReqMsgCheckEncExist,this.CheckEncExistCompleted,"objEncounter",new CheckEncExistCompletedEventArgs(), prototypeList);
}

CheckCABExistCompleted: Function;
CheckCABExistAsync(oCReqMsgCheckCABExist:CReqMsgCheckCABExist ) : void {
  HelperService.Invoke<CReqMsgCheckCABExist,CResMsgCheckCABExist,CheckCABExistCompletedEventArgs>("EncounterWS.CheckCABExist",oCReqMsgCheckCABExist,this.CheckCABExistCompleted,"EncounterOID",new CheckCABExistCompletedEventArgs(), prototypeList);
}

GetCareEvenForEncCompleted: Function;
GetCareEvenForEncAsync(oCReqMsgGetCareEvenForEnc:CReqMsgGetCareEvenForEnc ) : void {
  HelperService.Invoke<CReqMsgGetCareEvenForEnc,CResMsgGetCareEvenForEnc,GetCareEvenForEncCompletedEventArgs>("EncounterWS.GetCareEvenForEnc",oCReqMsgGetCareEvenForEnc,this.GetCareEvenForEncCompleted,"SealImageList",new GetCareEvenForEncCompletedEventArgs(), prototypeList);
}

GetCareEventsForPatientCompleted: Function;
GetCareEventsForPatientAsync(oCReqMsgGetCareEventsForPatient:CReqMsgGetCareEventsForPatient ) : void {
  HelperService.Invoke<CReqMsgGetCareEventsForPatient,CResMsgGetCareEventsForPatient,GetCareEventsForPatientCompletedEventArgs>("EncounterWS.GetCareEventsForPatient",oCReqMsgGetCareEventsForPatient,this.GetCareEventsForPatientCompleted,"SealImageList",new GetCareEventsForPatientCompletedEventArgs(), prototypeList);
}

GetCareEventsForPatientbyEventOIDCompleted: Function;
GetCareEventsForPatientbyEventOIDAsync(oCReqMsgGetCareEventsForPatientbyEventOID:CReqMsgGetCareEventsForPatientbyEventOID ) : void {
  HelperService.Invoke<CReqMsgGetCareEventsForPatientbyEventOID,CResMsgGetCareEventsForPatientbyEventOID,GetCareEventsForPatientbyEventOIDCompletedEventArgs>("EncounterWS.GetCareEventsForPatientbyEventOID",oCReqMsgGetCareEventsForPatientbyEventOID,this.GetCareEventsForPatientbyEventOIDCompleted,"SealImageList",new GetCareEventsForPatientbyEventOIDCompletedEventArgs(), prototypeList);
}

GetCareEventsCompleted: Function;
GetCareEventsAsync(oCReqMsgGetCareEvents:CReqMsgGetCareEvents ) : void {
  HelperService.Invoke<CReqMsgGetCareEvents,CResMsgGetCareEvents,GetCareEventsCompletedEventArgs>("EncounterWS.GetCareEvents",oCReqMsgGetCareEvents,this.GetCareEventsCompleted,"IdentifiyingType",new GetCareEventsCompletedEventArgs(), prototypeList);
}

GetCareEventsDetailCompleted: Function;
GetCareEventsDetailAsync(oCReqMsgGetCareEventsDetail:CReqMsgGetCareEventsDetail ) : void {
  HelperService.Invoke<CReqMsgGetCareEventsDetail,CResMsgGetCareEventsDetail,GetCareEventsDetailCompletedEventArgs>("EncounterWS.GetCareEventsDetail",oCReqMsgGetCareEventsDetail,this.GetCareEventsDetailCompleted,"patientOID",new GetCareEventsDetailCompletedEventArgs(), prototypeList);
}

EpisodeSearchFilterCompleted: Function;
EpisodeSearchFilterAsync(oCReqMsgEpisodeSearchFilter:CReqMsgEpisodeSearchFilter ) : void {
  HelperService.Invoke<CReqMsgEpisodeSearchFilter,CResMsgEpisodeSearchFilter,EpisodeSearchFilterCompletedEventArgs>("EncounterWS.EpisodeSearchFilter",oCReqMsgEpisodeSearchFilter,this.EpisodeSearchFilterCompleted,"sDateQualifier",new EpisodeSearchFilterCompletedEventArgs(), prototypeList);
}

EncounterSearchFilterCompleted: Function;
EncounterSearchFilterAsync(oCReqMsgEncounterSearchFilter:CReqMsgEncounterSearchFilter ) : void {
  HelperService.Invoke<CReqMsgEncounterSearchFilter,CResMsgEncounterSearchFilter,EncounterSearchFilterCompletedEventArgs>("EncounterWS.EncounterSearchFilter",oCReqMsgEncounterSearchFilter,this.EncounterSearchFilterCompleted,"sDateQualifier",new EncounterSearchFilterCompletedEventArgs(), prototypeList);
}

EventSearchFilterCompleted: Function;
EventSearchFilterAsync(oCReqMsgEventSearchFilter:CReqMsgEventSearchFilter ) : void {
  HelperService.Invoke<CReqMsgEventSearchFilter,CResMsgEventSearchFilter,EventSearchFilterCompletedEventArgs>("EncounterWS.EventSearchFilter",oCReqMsgEventSearchFilter,this.EventSearchFilterCompleted,"TheatreDUConfig",new EventSearchFilterCompletedEventArgs(), prototypeList);
}

GetInPatientAMBSTCompleted: Function;
GetInPatientAMBSTAsync(oCReqMsgGetInPatientAMBST:CReqMsgGetInPatientAMBST ) : void {
  HelperService.Invoke<CReqMsgGetInPatientAMBST,CResMsgGetInPatientAMBST,GetInPatientAMBSTCompletedEventArgs>("EncounterWS.GetInPatientAMBST",oCReqMsgGetInPatientAMBST,this.GetInPatientAMBSTCompleted,"sEncounterID",new GetInPatientAMBSTCompletedEventArgs(), prototypeList);
}

GetOutPatientAMBSTCompleted: Function;
GetOutPatientAMBSTAsync(oCReqMsgGetOutPatientAMBST:CReqMsgGetOutPatientAMBST ) : void {
  HelperService.Invoke<CReqMsgGetOutPatientAMBST,CResMsgGetOutPatientAMBST,GetOutPatientAMBSTCompletedEventArgs>("EncounterWS.GetOutPatientAMBST",oCReqMsgGetOutPatientAMBST,this.GetOutPatientAMBSTCompleted,"sEncounterID",new GetOutPatientAMBSTCompletedEventArgs(), prototypeList);
}

GetAdmissionCompleted: Function;
GetAdmissionAsync(oCReqMsgGetAdmission:CReqMsgGetAdmission ) : void {
  HelperService.Invoke<CReqMsgGetAdmission,CResMsgGetAdmission,GetAdmissionCompletedEventArgs>("EncounterWS.GetAdmission",oCReqMsgGetAdmission,this.GetAdmissionCompleted,"sPatientOID",new GetAdmissionCompletedEventArgs(), prototypeList);
}

RetrieveDischargeCompleted: Function;
RetrieveDischargeAsync(oCReqMsgRetrieveDischarge:CReqMsgRetrieveDischarge ) : void {
  HelperService.Invoke<CReqMsgRetrieveDischarge,CResMsgRetrieveDischarge,RetrieveDischargeCompletedEventArgs>("EncounterWS.RetrieveDischarge",oCReqMsgRetrieveDischarge,this.RetrieveDischargeCompleted,"EncounterID",new RetrieveDischargeCompletedEventArgs(), prototypeList);
}

GetEncounterTypesforPatientCompleted: Function;
GetEncounterTypesforPatientAsync(oCReqMsgGetEncounterTypesforPatient:CReqMsgGetEncounterTypesforPatient ) : void {
  HelperService.Invoke<CReqMsgGetEncounterTypesforPatient,CResMsgGetEncounterTypesforPatient,GetEncounterTypesforPatientCompletedEventArgs>("EncounterWS.GetEncounterTypesforPatient",oCReqMsgGetEncounterTypesforPatient,this.GetEncounterTypesforPatientCompleted,"objEncounter",new GetEncounterTypesforPatientCompletedEventArgs(), prototypeList);
}
}

export class GetPatientEncountersforTypeCompletedEventArgs{
 public Result: CResMsgGetPatientEncountersforType;
public Error: any;
}
export class GetPatientEncountersforRangeCompletedEventArgs{
 public Result: CResMsgGetPatientEncountersforRange;
public Error: any;
}
export class GetReferralforPatientCompletedEventArgs{
 public Result: CResMsgGetReferralforPatient;
public Error: any;
}
export class GetPatientEncountersforReferralCompletedEventArgs{
 public Result: CResMsgGetPatientEncountersforReferral;
public Error: any;
}
export class GetProblemsforPatientCompletedEventArgs{
 public Result: CResMsgGetProblemsforPatient;
public Error: any;
}
export class GetPatientProblemCompletedEventArgs{
 public Result: CResMsgGetPatientProblem;
public Error: any;
}
export class GetEpisodesByPatOIDCompletedEventArgs{
 public Result: CResMsgGetEpisodesByPatOID;
public Error: any;
}
export class CheckEncExistForPatientCompletedEventArgs{
 public Result: CResMsgCheckEncExistForPatient;
public Error: any;
}
export class CheckEncExistCNSCompletedEventArgs{
 public Result: CResMsgCheckEncExistCNS;
public Error: any;
}
export class GetEpisodesForRefTypeCompletedEventArgs{
 public Result: CResMsgGetEpisodesForRefType;
public Error: any;
}
export class pGetEncountersForTheatrePatientCompletedEventArgs{
 public Result: CResMsgpGetEncountersForTheatrePatient;
public Error: any;
}
export class GetEpiEncDetailsByPatOIDCompletedEventArgs{
 public Result: CResMsgGetEpiEncDetailsByPatOID;
public Error: any;
}
export class GetTrtmntFunDetByPatOIDCompletedEventArgs{
 public Result: CResMsgGetTrtmntFunDetByPatOID;
public Error: any;
}
export class GetPatientEnquiryDetailsCompletedEventArgs{
 public Result: CResMsgGetPatientEnquiryDetails;
public Error: any;
}
export class GetPatientPatAPPSUMRYDetailsCompletedEventArgs{
 public Result: CResMsgGetPatientPatAPPSUMRYDetails;
public Error: any;
}
export class GetEpisodesPagingCompletedEventArgs{
 public Result: CResMsgGetEpisodesPaging;
public Error: any;
}
export class GetEncountersPagingCompletedEventArgs{
 public Result: CResMsgGetEncountersPaging;
public Error: any;
}
export class GetCareEventsPagingCompletedEventArgs{
 public Result: CResMsgGetCareEventsPaging;
public Error: any;
}
export class GetEncountersForDMWPatientCompletedEventArgs{
 public Result: CResMsgGetEncountersForDMWPatient;
public Error: any;
}
export class GetEpisodeDetailsForEncCompletedEventArgs{
 public Result: CResMsgGetEpisodeDetailsForEnc;
public Error: any;
}
export class GetEpisodeCompletedEventArgs{
 public Result: CResMsgGetEpisode;
public Error: any;
}
export class GetPatEpisodePathwayDetailsCompletedEventArgs{
 public Result: CResMsgGetPatEpisodePathwayDetails;
public Error: any;
}
export class GetEncountersForPatientCompletedEventArgs{
 public Result: CResMsgGetEncountersForPatient;
public Error: any;
}
export class GetEncountersForEpisodeCompletedEventArgs{
 public Result: CResMsgGetEncountersForEpisode;
public Error: any;
}
export class GetEncounterCompletedEventArgs{
 public Result: CResMsgGetEncounter;
public Error: any;
}
export class GetEncounterForCareEventsCompletedEventArgs{
 public Result: CResMsgGetEncounterForCareEvents;
public Error: any;
}
export class GetSealEncounterCompletedEventArgs{
 public Result: CResMsgGetSealEncounter;
public Error: any;
}
export class GetEncounterHOForPatientCompletedEventArgs {
  public Result: CResMsgGetEncounterHOForPatient;
  public Error: any;
}
export class CheckEncExistCompletedEventArgs {
  public Result: CResMsgCheckEncExist;
  public Error: any;
}
export class CheckCABExistCompletedEventArgs {
  public Result: CResMsgCheckCABExist;
  public Error: any;
}
export class GetCareEvenForEncCompletedEventArgs {
  public Result: CResMsgGetCareEvenForEnc;
  public Error: any;
}
export class GetCareEventsForPatientCompletedEventArgs {
  public Result: CResMsgGetCareEventsForPatient;
  public Error: any;
}
export class GetCareEventsForPatientbyEventOIDCompletedEventArgs {
  public Result: CResMsgGetCareEventsForPatientbyEventOID;
  public Error: any;
}
export class GetCareEventsCompletedEventArgs {
  public Result: CResMsgGetCareEvents;
  public Error: any;
}
export class GetCareEventsDetailCompletedEventArgs {
  public Result: CResMsgGetCareEventsDetail;
  public Error: any;
}
export class EpisodeSearchFilterCompletedEventArgs {
  public Result: CResMsgEpisodeSearchFilter;
  public Error: any;
}
export class EncounterSearchFilterCompletedEventArgs {
  public Result: CResMsgEncounterSearchFilter;
  public Error: any;
}
export class EventSearchFilterCompletedEventArgs {
  public Result: CResMsgEventSearchFilter;
  public Error: any;
}
export class GetInPatientAMBSTCompletedEventArgs {
  public Result: CResMsgGetInPatientAMBST;
  public Error: any;
}
export class GetOutPatientAMBSTCompletedEventArgs {
  public Result: CResMsgGetOutPatientAMBST;
  public Error: any;
}
export class GetAdmissionCompletedEventArgs {
  public Result: CResMsgGetAdmission;
  public Error: any;
}
export class RetrieveDischargeCompletedEventArgs {
  public Result: CResMsgRetrieveDischarge;
  public Error: any;
}
export class GetEncounterTypesforPatientCompletedEventArgs {
  public Result: CResMsgGetEncounterTypesforPatient;
  public Error: any;
}
export class CReqMsgGetEpisodesPaging {
  objEpisodeBC: Episode;
  pElementBC: PagingDynamicSQL;
  oContextInformation: CContextInformation;
}

export class Episode extends CLZOObject {
  Episodeoid: number;
  EpisodeIdentifier: string;
  EpisodeID: string;
  EpisodeName: string;
  Problem: string;
  CreatedDttm: DateTime;
  ClosureDttm: DateTime;
  EndDttm: DateTime;
  ClosureReason: string;
  Status: string;
  OrganisationID: number;
  OrganisationName: string;
  EPISTCode: string;
  PatientOID: string;
  ClosedBy: string;
  CreatedBy: number;
  bNegation: boolean;
  HasFilter: boolean;
  IsSealBroken: boolean;
  IsSealOwner: string;
  HasOwnSealBroken: boolean;
  PatientSeal: PatientSeal;
  EpisodeCount: number;
  StartDttm: DateTime;
  LinkedEpisodeOId: number;
  LinkedEpisodeName: string;
  CareServiceName: string;
  CareServiceOId: number;
  CareProviderOID: number;
  CareProviderName: string;
  ReferralOID: number;
  ReferralDttm: DateTime;
  ReferralFromCP: string;
  ReferralToCP: string;
  ReferralToType: string;
  ReferredToTeam: string;
  CreatedByUserName: string;
  ClosedByUserName: string;
  ReferredSpelity: string;
  ReferredTremnt: string;
  ReferredTeam: string;
  ReferredOrg: string;
  ReferralType: string;
  ReferralStatus: string;
  ClosedByCareProvOID: number;
  IsEncExists: string;
  SourcePatOID: number;
  ParentOID: number;
  CancelReason: string;
  RSNCNCode: string;
  CancelDTTM: DateTime;
  OutcomeCode: string;
  HasComments: string;
  IsValidationReq: boolean;
  HasDataFilter: string;
  EpiStatus: string;
  ReferredToSpecOID: number;
  PatientPathWayOID: number;
  PatientPathWayID: string;
  OrganisationMainID: string;
  EncounterOID: string;
  PatientReferralID: string;
  TeamOID: number;
  lnReftoProvider: number;
  IsReOpen: boolean;
  oMsgingAttributes: MessagingAttributes;
  EncounterType: string;
  DateQual: string;
  GroupValue: string;
  GroupValueDisplay: string;
  Count: number;
  GroupText: string;
  IsCustomFilter: boolean;
  AssociatedProblems: string;
  ActualRTTStatus: string;
  bRTTValidateRequired: boolean;
  arrobjEpsProblem: ObservableCollection<EpisodeProblem>;
}
export class PatientSeal extends CLZOObject {
  sSealPsisMess: SealPSISMessage;
  SealIdentifier: string;
  IdentifyingOID: string;
  IdentifyingType: string;
  PatientOID: string;
  CreatedDTTM: DateTime;
  ModifiedDTTM: DateTime;
  ModifiedBy: string;
  RefuseReasonCode: string;
  SealTimeout: number;
  Justification: string;
  RequestMode: string;
  Requestor: string;
  RequestorName: string;
  RequestorDetails: string;
  WitnessName: string;
  WitnessDetails: string;
  PrintedDTTM: DateTime;
  ConsentIdentifier: string;
  SealPSISMessage: SealPSISMessage;
  PatientName: string;
  PatientId: string;
  IsSealBreak: boolean;
  SurName: string;
  ForeName: string;
  Gender: string;
  IsProfileEnabled: boolean;
  ClinicianOID: number;
  PageNumber: number;
  PageSize: number;
  MaxRows: number;
  ClinicianIDs: string;
  CreatedBy: string;
  IsSensitive: string;
  IsMDMmsgRequired: boolean;
  patientSealAccessGroup: ObservableCollection<SealAccessGroup>;
  PatientSealAccessUsers: ObservableCollection<SealAccessUsers>;
}
export class SealPSISMessage extends CLZOObject {
  SealReportPacket: SealReportPacket;
  SealReportInfo: SealReportInfo;
  SealNotifyPacket: SealNotifyPacket;
  SealAuthor: SealAuthor;
}
export class SealReportPacket extends CLZOObject {
  MetaData: SealReportMetaData;
  Message: SealReportMessage;
}
export class SealReportMetaData extends CLZOObject {
  MessageId: string;
  CreationTime: string;
  InteractionId: string;
  OriginatorMachineID: string;
  VersionCode: string;
  HL7Version: string;
  UserLoggedIn: SealReportUserLoggedIn;
}
export class SealReportUserLoggedIn extends CLZOObject {
  UserRoleProfileID: string;
  UserID: string;
  UserJobRoleCode: string;
}
export class MessagingAttributes extends CLZOObject {
  RefByCPOID: number;
  RefToCPOID: number;
  EpisodeStartDTTM: DateTime;
  AlternateEPisodeID: string;
}
export class EpisodeProblem extends CLZOObject {
  PatientProblemOId: number;
  PatientProblemDescription: string;
  IsPrimary: boolean;
  IsLinked: boolean;
}
export class SealAccessUsers extends CLZOObject {
  AccessUserType: string;
  AccessUserIdentifier: string;
  SealIdentifier: string;
  CareProviderIdentifier: number;
  ActionTaken: string;
  ClinicianID: string;
  SurName: string;
  ForeName: string;
  Role: string;
  RoleOID: number;
  OrgName: string;
}
export class SealAccessGroup extends CLZOObject {
  AccessGroupIdentifier: string;
  SealIdentifier: string;
  ArtefactOID: number;
  ArtefactType: string;
  IsSealingGroup: boolean;
  IsEditingGroup: boolean;
  ArtefactName: string;
  ArtefactDesc: string;
  ArtefactID: string;
}
export class SealAuthor extends CLZOObject {
  Code: string;
  DisplayName: string;
  OrganisationId: string;
  OrganisationName: string;
  PersonName: string;
  SDSId: string;
  SDSUserProfileID: string;
}
export class SealNotifyMessage extends CLZOObject {
  RequesterType: string;
  SealingChangeItemRefType: string;
  RequesterId: string;
  RequesterName: string;
  RequesterDisplayName: string;
  RequesterCode: string;
  EffectiveDTTM: string;
  NHSNumber: string;
  SealingReson: string;
  Comments: string;
  SealEventActionCode: string;
  AuthorOfSeal: string;
}
export class SealNotifyUserLoggedIn extends CLZOObject {
  UserRoleProfileID: string;
  UserID: string;
  UserJobRoleCode: string;
}
export class SealNotifyMetaData extends CLZOObject {
  MessageId: string;
  CreationTime: string;
  InteractionId: string;
  OriginatorMachineID: string;
  VersionCode: string;
  HL7Version: string;
  UserLoggedIn: SealNotifyUserLoggedIn;
}
export class SealNotifyPacket extends CLZOObject {
  MetaData: SealNotifyMetaData;
  Message: SealNotifyMessage;
}
export class SealReportInfo extends CLZOObject {
  PrevSealtype: string;
  sealFlg: boolean;
  userFlg: boolean;
  UserGroupCode: string;
  UserAccessCode: string;
  DocumentAssociate: string;
  IsCareActivity: boolean;
}
export class SealReportMessage extends CLZOObject {
  Action: string;
  ReportEffectiveDTTM: string;
  ReportModifyDTTM: string;
  AuthorSDSUserID: string;
  AuthorSDSUserName: string;
  AuthorSDSUserRPID: string;
  AuthorOrganisationID: string;
  AuthorOrganisationName: string;
  PatientNHSNumber: string;
  SealId: string;
  ObjectType: string;
  SealingId: string;
  SealingState: string;
  JustifyingReason: string;
  SealRequesterId: string;
  SealRequesterRelationshipCode: string;
  SealRequesterPersonName: string;
  SealEventAction: string;
  SealWorkgroupAccessorId: string;
  SealAccessorId: string;
  RefusalReasonCode: string;
  SealAccessor: ObservableCollection<SealGroupAccessor>;
  SealWorkgroupAccessorName: ObservableCollection<string>;
  SealWorkgroupAccessorType: ObservableCollection<string>;
  NewWorkgroupAccessorId: ObservableCollection<string>;
}
export class SealGroupAccessor {
  AccessorType: SealAccessorType;
  AccessorOID: string;
}
export enum SealAccessorType {
  Team,
  Specialty,
  ServicePoint,
}
export class EncounterBase extends CLZOObject {
  EncounterID: string;
  EncounterType: string;
  OrganisationID: number;
  OrganisationName: string;
  LocationID: number;
  Locationname: string;
  EncounterReason: string;
  Status: string;
  CreatedDttm: DateTime;
  ClosureDttm: DateTime;
  EncounterIdentifier: string;
  StartedDttm: DateTime;
  LatestEvent: string;
  LengthOfStay: string;
  PatientLeave: number;
  AdmissionType: string;
  PatientOID: string;
  ServiceType: string;
}
export class Encounter extends EncounterBase {
  PathWayID: string;
  OrgMainIdentifier: string;
  EpisodeID: string;
  EpisodeName: string;
  ServicePoint: string;
  Location: string;
  CareProviderID: number;
  CareProviderName: string;
  SpecialtyID: number;
  SpecialtyName: string;
  CareServiceID: number;
  CareServiceName: string;
  AdditonalCareProvider: string;
  ReferralID: string;
  ReferralName: string;
  ServiceID: number;
  Servicename: string;
  CareproviderRole: string;
  Ambulatorystatus: string;
  APEStatus: string;
  APEStartDTTM: DateTime;
  EncouterIDTYCode: string;
  EncounterCreation: DateTime;
  ClosedBy: string;
  CreatedBy: number;
  EncounterStatus: string;
  AppointmentOID: string;
  ActualRTTSTCode: string;
  OCMSTCode: string;
  IsManualCreation: string;
  CareproviderRoleID: string;
  EpisodeIdentifier: string;
  ReferredToCPName: string;
  ReferralDttm: DateTime;
  ExpectedDischargeDttm: DateTime;
  bNegation: boolean;
  bFromRestAPI: boolean;
  LinkedEncounterOId: number;
  LinkedEncounter: string;
  ReferralOID: number;
  ReferredType: string;
  ReferredSpelity: string;
  ReferredTremnt: string;
  ReferredTeam: string;
  ReferredOrg: string;
  SessionName: string;
  LinkedEncType: string;
  SealOID: number;
  SealTypeType: string;
  NHSNumber: string;
  SessionOID: string;
  TreatmentFunctionName: string;
  CurrrentBedCategory: string;
  CurrentPatientCategory: string;
  TreatmentFunctionOID: string;
  CurrentLocationOID: string;
  CurrentLocationIdentifier: string;
  CurrentLocationName: string;
  CurrentCareProviderOID: number;
  CurrentCareProviderName: string;
  CurrentSpecialtyOID: number;
  CurrentSpecialtyName: string;
  CurrentServiceOID: number;
  CurrentServiceName: string;
  CurrentServicePointIdentifier: string;
  HasFilter: boolean;
  IsSealBroken: boolean;
  IsSealOwner: string;
  HasOwnSealBroken: boolean;
  PatientSeal: PatientSeal;
  CreatedByUserName: string;
  CancelReason: string;
  EncCancelDTTM: DateTime;
  SharedCarer: string;
  IsBkgByAPEWrittenOPOffer: boolean;
  APEOfferOID: string;
  ISADWNOTICEEXISTS: boolean;
  MedNextReviewDTTM: DateTime;
  IsOnHold: boolean;
  RescheduledFromBookingOID: string;
  Stagemarker: string;
  APPSTCode: string;
  IParentLocationType: string;
  IParentLocationOID: number;
  IParentLocationName: string;
  LeastLocationType: string;
  LeastLocationName: string;
  BedLocationCode: number;
  BedLocationName: string;
  BedLocationType: string;
  BedParentLocationCode: number;
  BedParentLocationName: string;
  BedParentLocationType: string;
  CPMBookingOID: number;
  LeastLocationOID: number;
  ActualDischargeDTTM: DateTime;
  OldPatientOID: number;
  OldReferralOID: number;
  OldEpisodeoid: number;
  IsENCCA: boolean;
  ISReferralUpdate: boolean;
  APEOID: number;
  RefPatientOID: number;
  DischargeDTTM: DateTime;
  RecordedUserOID: number;
  RecordedUserName: string;
  SortBy: string;
  IPEndDate: DateTime;
  ChildlocationOID: number;
  ChildlocationType: string;
  ChildlocationName: string;
  SubAreaLocOID: number;
  SubAreaLocType: string;
  SubAreaLocName: string;
  TrustSiteDetails: string;
  Referredservice: string;
  Referredservicedefinition: string;
  IsSimple: string;
  PatientDOB: DateTime;
  EprMapValue: string;
  GroupValue: string;
  GroupValueDisplay: string;
  Count: number;
  GroupText: string;
  DateQualifier: string;
  IsCustomFilter: boolean;
  CurrentCareProviderType: string;
  Pasid: string;
  Forename: string;
  Surname: string;
  Gender: string;
  DateofBirth: DateTime;
  SecondaryCareProvider: ObservableCollection<SecondaryCareProvider>;
}
export class Carer extends CLZOObject {
  Comments: string;
  IsPrimary: string;
  Name: string;
  OID: number;
  RecordOID: number;
}
export class CareProvider extends Carer {
  TreatmentFnName: string;
  SpecialityName: string;
  TeamName: string;
  AttendanceStatus: string;
  CareServiceName: string;
  HealthOrgName: string;
  TreatmentFnOID: number;
  TeamOID: number;
  CareServiceOID: number;
  SpecialityOID: number;
  oSpecialty: Specialty;
  otreatmentfunction: Specialty;
  objTeamDetail: TeamDetail;
  oConCareProvider: dpUser;
  IdentifyingType: string;
  PermissionType: string;
  CareProviderOID: number;
  IdentifyingOID: number;
  RoleProfileOID: number;
  CPForeName: string;
  CPSurName: string;
}
export class SecondaryCareProvider extends CareProvider {
  InvitedStatus: string;
}
export class Specialty extends CLZOObject {
  IsRestrictedData: boolean;
  Name: string;
  Description: string;
  SpecialtyType: string;
  MainIdentifier: string;
  Status: string;
  HealthOrganisation: string;
  OrganisationOIDs: string;
  ActiveTo: DateTime;
  SpecialtyOID: number;
  ParentSpecialtyOID: number;
  ActiveFrom: DateTime;
  StatusFlag: string;
  MainIDDesc: string;
  SpecialtyFrom: DateTime;
  SpecialtyTo: DateTime;
  ParentSpecialtyName: string;
  ParentSpecialtyType: string;
  SourceType: string;
  STFOID: number;
  SpecialtyTypCode: string;
  IsMain: string;
  CPTIRCode: string;
  TierOfService: string;
}
export class HOSpecialty extends Specialty {
}
export class TeamClinicalUnit extends Specialty {
}
export class Team extends CLZOObject {
  OId: number;
  AssignCaseload: string;
  Type: string;
  Name: string;
  Identifier: string;
  TeamOrganisation: ObjectInfo;
  Remarks: string;
  Status: string;
  ActiveFrom: DateTime;
  ActiveTo: DateTime;
  HasDataFilter: string;
  CAMHSTeamType: string;
  CAMHSTierofService: string;
}
export class TeamDetail extends Team {
  IsRestrictedData: boolean;
  LastModifiedBy: number;
  TeamLead: TeamMember;
  TeamSpecialty: ObjectInfo;
  ServicePoint: ObjectInfo;
  ParentTeam: Team;
  MinChildActiveFrom: DateTime;
  MaxChildActiveTo: DateTime;
  EnterpriseWorkgroupOID: number;
  AccessControlWorkgroup: ObjectInfo;
  MembershipWorkgroup: ObjectInfo;
  HasChildTeams: string;
  AuditData: AuditInfo;
  DateQualifier: string;
  Context: string;
  TimePeriod: string;
  PageSize: number;
  PageNumber: number;
  PageCount: number;
  InternalStatus: string;
  IsTeamMembersModified: string;
  ConstraintOIds: string;
  ConstraintWrkGrpCodes: string;
  organisationOID: string;
  IsSecureTeam: string;
  IsApproved: string;
  TeamQualifiesForClustering: string;
  CareServiceOId: number;
  oHealthOrganisation: HealthOrganisationDetail;
  IsTeamUsed: string;
  IsWGAssociated: string;
  TeamAddress: UserAddress;
  TeamMembersCount: number;
  ServiceLineCode: string;
  ServiceCategoryCode: string;
  TeamMembers: ObservableCollection<TeamMember>;
  TeamClinicalUnit: ObservableCollection<TeamClinicalUnit>;
}
export class Person extends CLZOObject {
  Surname: string;
  Forename: string;
  MiddleName: string;
  TitleCode: string;
  SexCode: string;
  IsDOBEstimation: string;
  BirthDttm: DateTime;
  BloodGroup: string;
  DeathDttm: DateTime;
  CountryCode: string;
  Initials: string;
  CreatedAt: DateTime;
  ModifiedAt: DateTime;
  CreatedBy: number;
  ModifiedBy: number;
  Status: string;
}
export class User extends Person {
  RoleID: string;
  RoleDescription: string;
  OId: number;
  CultureSetting: string;
  Qualification: string;
  QualificationType: string;
  IsCareprovider: string;
  Administrator: string;
  ActiveFrom: DateTime;
  ActiveTo: DateTime;
  ActiveToOrig: DateTime;
  MessagingIPdetails: string;
  HealthOrganisation: string;
  HealthOrganisationOId: number;
  CareproviderOrganisationOId: number;
  OccupationCode: string;
  CPTYPOID: string;
  oAuditInfo: AuditInfo;
  OutOfHrs: number;
  NATNLCode: string;
  RELIGCode: string;
  SPOKLCode: string;
  ETHGRCode: string;
  MARRYCode: string;
  WardAvailablity: string;
  IsAvailableOnHolidays: string;
  IsInterpreter: string;
  MainIdentifier: string;
  ParentHOTYPCode: string;
  ParentOrganisationCode: string;
  SourceOID: string;
  SourceType: string;
  CULTCCode: string;
  Comments: string;
  IsNativeUser: string;
  LoginName: string;
  RoleProCode: string;
  WorkGroupCode: string;
  EnterpriseNoteOID: number;
  ConstraintOIds: string;
  ConstraintWrkGrpCodes: string;
  RoleProfileOid: number;
  UserType: string;
  IsLoginableUser: string;
  IsConflictChk: boolean;
  EntObjAddDetOID: number;
  MFNBatchStatus: string;
  UITypeCode: string;
  IsRestrictedData: boolean;
}
export class TeamMember extends User {
  TeamMemberOId: number;
  RoleProfile: ObjectInfo;
  Role: ObjectInfo;
  AssignFrom: DateTime;
  AssignTo: DateTime;
  AccessControlWorkgroup: ObjectInfo;
  MembershipWorkgroup: ObjectInfo;
  IsTeamLead: string;
  TeamMemberEnterpriseWorkgroup: EnterpriseWorkgroup;
  RoleProfileCode: ObjectInfo;
  PrevModifiedAt: DateTime;
  IsApproved: string;
  TMMemberRoleCode: string;
  ActionPerformedByOID: number;
  ActionTaken: string;
  TLIntrayMessage: string;
  IsTMMbrRemoved: string;
  InvokingPoint: string;
  CLAssignFrom: DateTime;
  CLAssignTo: DateTime;
  ActiveLead: boolean;
  IsExcludefromCL: string;
  IsCaseLoadstatusupdate: string;
}
export class ObjectInfo extends CLZOObject {
  OID: number;
  Name: string;
  Code: string;
  RoleProfileOID: number;
  OwnerOrganisationOID: number;
  SourceDataProviderType: string;
}
export class EnterpriseWorkgroup extends CLZOObject {
  OId: number;
  ArtefactOId: number;
  ArtefactType: string;
  MembershipWorkgroupOId: number;
  MembershipWorkgroupCode: string;
  MembershipWorkgroupName: string;
  AccessCntlWorkgroupOId: number;
  AccessCntlWorkgroupCode: string;
  AccessCntlWorkgroupName: string;
  OldMembershipWorkgroupCode: string;
  Status: string;
  oWorkgroupUser: LRWorkgroupUser;
  OrganisationOId: number;
}
export class LRWorkgroupUser extends CLZOObject {
  OID: number;
  UserDetails: UserLoggedIn;
  AuthorUserWorkgroupIdentifier: string;
  AuthorUserRoleProfileIdentifier: string;
  TargetuserRoleProfileIdentifier: string;
  TargetuserObservationType: string;
  TargetUserIdentifier: string;
  TargetUserWorkgroupIdentifier: string;
  RequestType: string;
  AuthorUserIdentifier: string;
  TeamOID: number;
}
export class UserLoggedIn extends CLZOObject {
  RequestMsgID: string;
  UserRoleProfileID: string;
  UserID: string;
  UserJobRoleCode: string;
  OriginatorMachineID: string;
  BusinessProcessQualifier: string;
  BusinessProcessIdentifier: string;
  LRComments: string;
}
export class AuditInfo extends CLZOObject {
  CreatedAt: DateTime;
  CreatedBy: number;
  ModifiedAt: DateTime;
  ModifiedBy: number;
  Status: string;
  UserOID: number;
  JobRoleOID: number;
  JobRoleProfileOID: number;
  PrevModifiedAt: DateTime;
}
export class dpUser extends User {
  oHealthOrganisation: HealthOrganisationDetail;
  oRole: Role;
  oUserAddress: UserAddress;
  oUserID: ObservableCollection<UserID>;
}
export class HealthOrganisationDetail extends CLZOObject {
  IsRestrictedData: boolean;
  oHealthOrg: HealthOrganisation;
  oAuditInfo: AuditInfo;
  oHOStatus: HOStatus;
  oOrgInsurer: ObservableCollection<HOInsurer>;
  arrHealthOrg: ObservableCollection<HealthOrganisation>;
  oOrgAddress: ObservableCollection<HOAddress>;
  oOrgIDs: ObservableCollection<HOIdentifier>;
  oOrgLocation: ObservableCollection<HOLocation>;
  oOrgSpecialty: ObservableCollection<HOSpecialty>;
  oOrgTeams: ObservableCollection<HOTeams>;
  oOrgService: ObservableCollection<HOService>;
  oOrgCareService: ObservableCollection<HOCareService>;
  oFailedStatus: ObservableCollection<HOStatus>;
  oHOStatusHistory: ObservableCollection<StatusHistory>;
}
export class HealthOrganisation extends CLZOObject {
  IsRestrictedData: boolean;
  OId: number;
  Type: string;
  Name: string;
  Description: string;
  LeadCareProvider: string;
  MainID: string;
  oParentOrganisation: ParentOrganisation;
  External: boolean;
  MainIDType: string;
  UserMainID: string;
  UserTitleCode: string;
  ActiveFrom: DateTime;
  ActiveTo: DateTime;
  Active: boolean;
  CulturalSetting: string;
  oAuditInfo: AuditInfo;
  LevelCode: string;
  IsEASTrans: string;
  ChildCount: string;
  IsLegalEntity: string;
  Organisationgroup: string;
  Insurancetype: string;
  Insurancerange: string;
  Key: string;
  GeographicalLoc: string;
  PrevParHOOID: number;
  Pagesize: number;
  PageNumber: number;
  MaxRows: number;
  TotalRec: number;
  MFNBatchStatus: string;
}
export class ParentOrganisation extends CLZOObject {
  IsRestrictedData: boolean;
  OId: number;
  Type: string;
  Name: string;
  MainIDType: string;
  MainID: string;
  Relationship: string;
  StartDTTM: DateTime;
  EndDTTM: DateTime;
  oAuditInfo: AuditInfo;
}
export class HOInsurer extends CLZOObject {
  HOOid: string;
  InsurerOid: string;
  Insurertype: string;
  Insurerrange: string;
}
export class Address extends CLZOObject {
  AddressIdentifier: string;
  OverseasAddress: string;
  sPreferedContactTime: string;
  AddrRoleParentOID: string;
  Comments: string;
  PDSPatientAddressID: string;
  PDSPatientAddressRoleID: string;
  OwnerOrganisationOID: string;
  AddressType: string;
  RoleTypeCode: string;
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
  AddressLine4: string;
  PreferedContactTime: string;
  PDSUpdateStatus: byte;
  GenUpdate: string;
  bRpAddNullDates: boolean;
  OrgActiveFrom: DateTime;
  ActiveFrom: DateTime;
  ActiveTo: DateTime;
  StateCode: string;
  CountryCode: string;
  PostalCode: string;
  PrimaryContact: string;
  Communication: string;
  PrimaryAddress: string;
  SecureAddress: string;
  CityCode: string;
  CountyCode: string;
  AddressKey: string;
  IsValidAddressKey: string;
  AddressServiceName: string;
  MRGSTATUS: string;
  sMsgChk: string;
  AddressLine5: string;
  AddressTypeText: string;
  CountryText: string;
  GeoLocation: string;
  Contract: ContractActivity;
  sPDSValue: string;
  sLORValue: string;
  bPdsGenUpd: boolean;
  IsRestrictedData: boolean;
}
export class HOAddress extends Address {
  HOIdentifier: number;
  GLocation: string;
  oAuditInfo: AuditInfo;
  HOContact: ObservableCollection<Contact>;
}
export class Contact extends CLZOObject {
  SuspendMode: string;
  ActiveFrom: DateTime;
  ActiveTo: DateTime;
  Comments: string;
  OwnerOrganisationOID: string;
  PatientOID: string;
  PDSPatientAddressID: string;
  PDSPatientAddressRoleID: string;
  sMsgChk: string;
  PreferedContactTime: string;
  Status: string;
  FormattedFromDate: string;
  FormattedToDate: string;
  IsEmailRegWithEncryptService: string;
  IsRestrictedData: boolean;
  AddressOID: string;
  ContactIdentifier: string;
  ContactType: string;
  ContactRoleTypeCode: string;
  ContactNumber: string;
  Secure: boolean;
  IsDefault: string;
  oAuditInfo: AuditInfo;
  AddrRoleParentOID: string;
  UserNames: string;
  Communication: string;
  CreatedAt: DateTime;
  PrimaryContact: string;
  RegEncryptedEmailService: string;
    PDSUpdateStatus: byte;
  Extension: string;
  GenUpdate: string;
  IsPDSchecked: boolean;
  IsMatch: string;
  sPDSValue: string;
  sLORValue: string;
  IsUIHistoric: boolean;
  bPdsGenUpd: boolean;
  IsGenUpdate: boolean;
  LorActiveFrom: DateTime;
  OPMode: string;
  IsValidContact: boolean;
  ContactROTYPCode: string;
  GridRowStatus: string;
  oUserMobileNumber: ObservableCollection<UserMobileNumber>;
}
export class UserMobileNumber extends CLZOObject {
  UsersOID: string;
  MobileNumber: string;
  UserName: string;
  oAuditInfo: AuditInfo;
}
export class ContractActivityMetaData extends CLZOObject {
  Identifier: number;
  IdentifyingType: string;
  EntityType: string;
  ActivityType: string;
  ActivityID: string;
  ActivityOID: number;
  EncounterOID: number;
  PatientOID: number;
  PatientID: string;
  PrimaryID: string;
  SecondaryID: string;
  AssignmentDate: DateTime;
  AssignmentStatus: string;
  AssignmentMethod: string;
  ProcessingStatus: string;
  AgreementSerialNumber: string;
  AgreementLineRefNumber: string;
  ResponsibleHOOID: number;
  ResponsibleHOName: string;
  IsAssignmentLocked: string;
  CareProviderOID: number;
  TreatmentFnOID: number;
  ServicePointOID: number;
  CallingCAMethod: string;
  AltEntityTypeCode: string;
}
export class ContractActivity extends ContractActivityMetaData {
  PatientIDType: string;
  EffectiveDate: DateTime;
  ActivityStartDate: DateTime;
  ActivityEndDate: DateTime;
  PurchaserCode: string;
  PurchaserOID: number;
  PurchaserName: string;
  OwningProviderHOOID: number;
  AgreementOID: number;
  AgreementLineOID: number;
  AgreementDescription: string;
  OwningProviderHOName: string;
  AgreementLineDescription: string;
  IsClearAssignment: string;
  Weighting: number;
  OwnerOrganisationOID: number;
  IsModified: string;
  ParentActivityOID: number;
  ParentActivityID: string;
  ParentEntityType: string;
  ParentStartDate: DateTime;
  ParentEndDate: DateTime;
  CareActivity: string;
  TriggerAction: string;
  TriggerOID: number;
  RulesetOID: number;
  ConditionLogicMode: EnumTriggerConditionLogic;
  CondnEntityType: string;
  IsEncounterUpdate: boolean;
  EndDateMode: EnumTriggerEndDate;
  AttributesList: string;
  ReferralID: string;
  ReferralOID: number;
  LastUpdatedAt: DateTime;
  IsSensitive: string;
  GPDate: DateTime;
  PostcodeDate: DateTime;
  DOB: DateTime;
  IsLocked: string;
  oAssociatedEntities: ObservableCollection<AssociatedEntities>;
  GroupByResult: ObservableCollection<GroupResult>;
}
export enum EnumTriggerConditionLogic {
  NotApplicable,
  OnTrue,
  OnFalse,
}
export enum EnumTriggerEndDate {
  NotApplicable,
  NullEndDate,
  EndDate,
}
export class AssociatedEntities {
  EntityType: string;
  ActivityOID: number;
  EncounterOID: number;
  IsEncounterUpdate: string;
}
export class GroupResult {
  GroupValue: string;
  Count: number;
  DisplayValue: string;
}
export class UserAddress extends Address {
  IdentifyingOID: number;
  IdentifyingType: string;
  PractitionerOIDs: string;
  IsCommunicationAddress: string;
  IsDefault: string;
  UserAddressRoleID: number;
  ROTYPCode: string;
  AddressOID: number;
  PrevModifiedat: DateTime;
  UserContact: ObservableCollection<Contact>;
}
export class PatientAddress extends Address {
  AccommodationType: string;
  CorrespondencePeriod: string;
  Status: string;
  IsPatientAideUser: boolean;
  FormattedFromDate: string;
  FormattedToDate: string;
  PatientOID: string;
  CreatedAt: DateTime;
  IsValue: boolean;
  SuspendMode: string;
  GridRowStatus: string;
  ISPDSSelect: boolean;
  IsMatch: string;
  IsPDSchecked: boolean;
  IsUIHistoric: boolean;
  IsGenUpdate: boolean;
  LorActiveFrom: DateTime;
  OPMode: string;
  AccommodationTypeDTTM: DateTime;
  PatientContact: ObservableCollection<Contact>;
  PatientCommunication: ObservableCollection<PatientCommunication>;
  DPatientContact: ObservableCollection<Contact>;
}
export class PatientCommunication extends CLZOObject {
  AddrRoleParentOID: string;
  Comments: string;
  SuspendMode: string;
  ActiveFrom: DateTime;
  ActiveTo: DateTime;
  OwnerOrganisationOID: string;
  PatientOID: string;
  PDSPatientAddressID: string;
  PDSPatientAddressRoleID: string;
  sMsgChk: string;
  PreferedContactTime: string;
  Status: string;
  FormattedFromDate: string;
  FormattedToDate: string;
  IsEmailRegWithEncryptService: string;
  CountryCode: string;
  AddressIdentifier: string;
  StateCode: string;
  AddressLine5: string;
  AddressType: string;
  RoleTypeCode: string;
  oPatientAddress: PatientAddress;
  PostalCode: string;
  PrimaryContact: string;
  Communication: string;
  StartDttm: DateTime;
  CreatedAt: DateTime;
  EndDttm: DateTime;
  PrimaryAddress: string;
  SecureAddress: string;
  CityCode: string;
  CountyCode: string;
  AddressKey: string;
  IsValidAddressKey: string;
  AddressServiceName: string;
  MRGSTATUS: string;
  AddressLine2: string;
  AddressLine1: string;
  AddressLine3: string;
  AddressLine4: string;
  IsRestrictedData: boolean;
  AddressOID: string;
  ContactIdentifier: string;
  ContactType: string;
  ContactRoleTypeCode: string;
  ContactNumber: string;
  Secure: boolean;
  IsDefault: string;
  oAuditInfo: AuditInfo;
  UserNames: string;
  RegEncryptedEmailService: string;
    PDSUpdateStatus: byte;
  Extension: string;
  GenUpdate: string;
  IsPDSchecked: boolean;
  IsMatch: string;
  sPDSValue: string;
  sLORValue: string;
  IsUIHistoric: boolean;
  bPdsGenUpd: boolean;
  IsGenUpdate: boolean;
  LorActiveFrom: DateTime;
  OPMode: string;
  IsValidContact: boolean;
  ContactROTYPCode: string;
  GridRowStatus: string;
  oUserMobileNumber: ObservableCollection<UserMobileNumber>;
}
export class PersonalCarerAddress extends Address {
  Status: string;
  FormattedFromDate: string;
  FormattedToDate: string;
  PersonalCarerOID: string;
  Surname: string;
  Forename: string;
  Suffix: string;
  Titlecode: string;
  Gender: string;
  BirthDttm: DateTime;
  LozStartDTTM: DateTime;
  LozENDDTTM: DateTime;
  IsPDSchecked: boolean;
  IsMatch: string;
  PersonalCarerContact: ObservableCollection<Contact>;
}
export class PatientGP extends Address {
  Titlecode: string;
  Surname: string;
  Forename: string;
  OccupationCode: string;
  CareProviderID: string;
  PatientGPIdentifier: string;
  CareProviderIdentifier: string;
  OrganisationIdentifier: string;
  SourceNameOID: number;
  SourceName: string;
  TeamOID: number;
  TeamName: string;
  UsersOID: number;
  UsersIdentifier: string;
  PatientCareproviderOID: number;
  CareproviderType: string;
  CareproviderOID: number;
  CurrentGP: boolean;
  PRTYPCode: string;
  OrganisationType: string;
  ORGTypeCode: string;
  OrganisationCode: number;
  RoleName: string;
  CPROLCode: string;
  PDSPatientCareProviderID: string;
  PDSCarerType: string;
  FormattedFromDate: string;
  FormattedToDate: string;
  PatientOID: string;
  PractiseName: string;
  PractiseCode: string;
  GPPractiseAddress: HOAddress;
  CareproviderName: string;
  GPExist: string;
  LorActiveFrom: DateTime;
  PDSActiveFrom: DateTime;
  CreatedAt: DateTime;
  UsualGP: boolean;
  IdentifyingOID: string;
  DissociationCode: string;
  GPAddress: HOAddress;
  GPSalutation: string;
  GPName: string;
  CareServiceOID: number;
  EmailAddressOID: number;
  SAPExternalCareService: string;
  EmailAddress: string;
  CareService: string;
  SuspendMode: string;
  GridRowStatus: string;
  TelephoneHome: string;
  TelephoneWork: string;
  Mobile: string;
  GeneralPractioner: dpUser;
  IsMatch: string;
  IsPDSchecked: boolean;
  objHo: HealthOrganisationDetail;
}
export class LocationAddress extends Address {
  LocationID: number;
  GLocation: string;
  RoleParentOId: number;
  oAuditInfo: AuditInfo;
  oLoctionContact: ObservableCollection<Contact>;
}
export class ID extends CLZOObject {
  SuspendMode: string;
  IDType: string;
  sIdentifierOID: string;
  Identifier: string;
  Comments: string;
  AssigningAuthority: string;
  AssigningFacility: string;
  HealthOrgOID: string;
  HealthOrgName: string;
  PDSPatientID: string;
  sMessageChk: string;
  IsRestrictedData: boolean;
  IDIdentifier: string;
  MainID: boolean;
  DefaultID: boolean;
  MRGSTATUS: string;
  sRegType: string;
  ActiveFrom: DateTime;
  CreatedAt: DateTime;
  ActiveTo: DateTime;
  MigrationFlag: string;
}
export class HOIdentifier extends ID {
  HOUniqueOID: string;
  oAuditInfo: AuditInfo;
}
export class UserID extends ID {
  UserIdentifier: number;
  ModifiedAt: DateTime;
  CreatedBy: number;
  ModifiedBy: number;
  Status: string;
  oAuditInfo: AuditInfo;
}
export class LocationIdentifier extends ID {
  LocationOID: number;
  oAuditInfo: AuditInfo;
}
export class PatientID extends ID {
  PatientOID: string;
  IsFromSummary: boolean;
  PatientIdentifier: string;
  IdentifierType: string;
}
export class Location extends CLZOObject {
  LocationPosition: string;
  LocationPositiontxt: string;
  Boardingcharges: string;
  IsRestrictedData: boolean;
  OId: number;
  Type: string;
  Name: string;
  Description: string;
  HealthOrganisationOId: number;
  HealthOrganisationName: string;
  ParentLocationID: number;
  RootParentLocationOID: number;
  ParentLocationName: string;
  ReferredToProviderLocationOID: number;
  ReferredtoproviderName: string;
  ParentLocType: string;
  TRUSTPARENT: string;
  MainIDType: string;
  MainID: string;
  ActiveFrom: DateTime;
  ActiveTo: DateTime;
  Active: boolean;
  oAuditInfo: AuditInfo;
  IsParent: string;
  ParentLOCFrmdate: DateTime;
  ParentLOCTodate: DateTime;
  HealthOrganisationFrmDate: DateTime;
  HealthOrganisationToDate: DateTime;
  Typetxt: string;
  CreatedByName: string;
  IsOtherLocation: string;
  HasChild: boolean;
  BIsParentIdChange: boolean;
  oLocationFeatures: ObservableCollection<LocationFeature>;
  oLocationIdentifier: ObservableCollection<LocationIdentifier>;
  oLocationStatushistory: ObservableCollection<StatusHistory>;
  oMaskLocInfo: ObservableCollection<LocationMask>;
  oLocationTracks: ObservableCollection<LocationTracking>;
}
export class HOLocation extends Location {
}
export class LocationFeature extends CLZOObject {
  OID: number;
  LocationOID: number;
  LOCFTCode: string;
  Locationtext: string;
  CreatedBy: number;
  CreatedAt: DateTime;
  ModifiedBy: number;
  ModifyAt: DateTime;
  Status: string;
  OwnerOrganisationOID: number;
}
export class StatusHistory extends CLZOObject {
  Activity: string;
  ActivityDate: DateTime;
  Reason: string;
  ReasonforOnbehalfof: string;
  Remarks: string;
  Status: string;
  Status_Text: string;
  ActiveFrom: DateTime;
  ActiveTo: DateTime;
  OnBehalfUserOId: number;
  OnBehalfUserName: string;
  OID: number;
  Reasoncode: string;
  ActivityDateText: string;
}
export class HOStatus extends StatusHistory {
  IdentifyingOId: number;
  IdentifyingType: string;
  DASTSCode: string;
  EnterpriseName: string;
  EnterpriseDescription: string;
  EnterpriseMainID: string;
}
export class ServicePointStatus extends StatusHistory {
  IdentifyingOId: number;
  IdentifyingType: string;
  DASTSCode: string;
  EnterpriseName: string;
  EnterpriseDescription: string;
  EnterpriseMainID: string;
}
export class RTTActivity extends StatusHistory {
  ActivityType: string;
  CareactivityID: string;
  Careactivity: string;
  ActivityOID: number;
  ActivityID: string;
  ActivityActualStatus: string;
  Description: string;
  UserName: string;
  StatusSequence: number;
  PerformedDate: DateTime;
  ActivityEndDate: DateTime;
  Comments: string;
  RefBYCPOID: number;
  UpdateRTTStartDate: DateTime;
  RTTActivityDetailsOID: number;
  ReferralOID: number;
  TreatmentfunctionOId: number;
  SpecialityOId: number;
  CareproviderOId: number;
  ActivityDateRank: number;
  PerformedDateRank: number;
  RTTOID: number;
  RTTEndDTTM: DateTime;
  RTTUpdatedDTTM: DateTime;
  PerformedDTTM: DateTime;
  APEOID: number;
  ActivityIntendedStatus: string;
  PathWayType: string;
  APEStatus: string;
  BreachDate: DateTime;
  OriginalIdentifyingOID: number;
  MaxWaitTimeUOM: string;
  MaxWaitTime: number;
  Outcome: string;
  BookingOID: number;
  ServiceOID: number;
  AppointmentStartDTTM: DateTime;
  EventStatus: string;
  PreviousActivityType: string;
  ActivityPATOID: number;
  HisStartDTTM: DateTime;
  HisEndDTTM: DateTime;
  PreviousActActualStatus: string;
  ActTeamOID: number;
  bIsEdit: boolean;
  bIsCancel: boolean;
  bIsFromDeceasedJob: boolean;
  RTTFailureReason: string;
  SequenceChanged: number;
  IsPathwayChanged: boolean;
  ProposedMaxWaitTime: number;
  ProposedMaxWaitTimeUOM: string;
  ProposedStartDate: DateTime;
  ProposedIntendedStatus: string;
  ProposedRTTOID: number;
  ProposedBreachDate: DateTime;
  PreviousStatus: string;
  RTTUpdatedDTTMSECONLY: number;
  RFParentRTTOID: number;
  DescriptionADMIN: string;
}
export class LocationMask {
  LocationOID: number;
  ParentLocationOID: number;
  Areaname: string;
  MaskValue: string;
  HiddenValue: string;
  OperationMode: string;
  Delete: string;
  OID: number;
  MaskInfo: ObservableCollection<MaskInfo>;
}
export class MaskInfo extends CLZOObject {
  LocationOID: number;
  ServiceOID: number;
  DomainType: string;
  DomainValue: string;
  Case: string;
  CaseValue: string;
  Status: string;
  MaskOID: number;
}
export class LocationTracking extends CLZOObject {
  LocationOID: number;
  LocationTrackingOID: number;
  LocationTrackCode: string;
  Status: string;
  LocationTrackText: string;
}
export class dpLocation extends Location {
  oLocationAddress: LocationAddress;
  oHealthOrganisation: HealthOrganisationDetail;
  oParentLocation: dpLocation;
  oLocID: ObservableCollection<LocationIdentifier>;
}
export class HOTeams extends Team {
  OrganisationName: string;
}
export class ServicePoint extends CLZOObject {
  OID: number;
  oServicePointType: SubServicePoint;
  Description: string;
  OwnedByuserOID: number;
  HealthOrganisationOID: number;
  ReferredToProviderLocationOID: number;
  ReferredtoproviderName: string;
  MainIDType: string;
  MainID: string;
  Schedulable: boolean;
  ActiveFrom: DateTime;
  ActiveTo: DateTime;
  CareSettingType: string;
  Active: boolean;
  CreatedBy: number;
  CreatedOn: DateTime;
  ScheduleInstruction: string;
  oServiceProfile: ServiceProfile;
  Typetxt: string;
  Name: string;
  oServicePntdetail: ServicePointDetail;
  CreatedByName: string;
  EDTypCode: string;
  oServiceLetters: ServiceLetters;
  oServiceForms: ServiceForms;
  Standarddischargetime: DateTime;
  Standardadmissiontime: DateTime;
  oServicePurpose: ObservableCollection<ServicePurpose>;
  oEventStatusOptions: ObservableCollection<EventStatusOption>;
}
export class HOService extends ServicePoint {
  Type: string;
  OrganisationName: string;
}
export class ServicePurpose extends CLZOObject {
  PurposeCodeTxt: string;
  PurposeOId: number;
  PurposeCode: string;
  Status: string;
}
export class EventStatusOption extends CLZOObject {
  EventStatusOID: string;
  EventStatusServiceOID: string;
  EventStatusCode: string;
  Status: string;
  SeenMandatoryFlds: string;
  SeenMandatoryFldsPrev: string;
  IsCaseNotePresent: boolean;
  EventStatusName: string;
  IsEnablePlaceOfSafety: boolean;
  PdnaMandatoryFlds: string;
  PdnaMandatoryFldsPrev: string;
}
export class SubServicePoint extends CLZOObject {
  CompServOID: number;
  Type: string;
  Name: string;
  oAuditInfo: AuditInfo;
  ServiceOID: number;
  MainID: string;
  ActiveFrom: DateTime;
  ActiveTo: DateTime;
  OID: number;
  OrgOID: number;
}
export class ServiceProfile extends CLZOObject {
  ServiceProfileOId: number;
  ServiceOId: number;
  BRPAGCode: string;
  INCLICode: string;
  AGEGRCode: string;
  PhysicalCapacity: number;
  SexCode: string;
}
export class ServicePointDetail extends ServicePoint {
  oEntWorkGroup: EnterpriseWorkgroup;
  INLVLCode: string;
  IsBoarderChargesApplicable: string;
  IsWardAttendance: string;
  IsWardInUse: string;
  Context: string;
  MajorIncidentOID: number;
  PhysicalCapacity: number;
  Stdadmtm: DateTime;
  Stddistm: DateTime;
  MajorIncident: string;
  INCDLVLCode: string;
  SPDStatusflag: string;
  BRPGCode: string;
  AGEGCode: string;
  AccessCtrlWGName: string;
  MembershipWGName: string;
  IsAllowRetroBooking: string;
  Session: SessionDetails;
  MsgSerLocOID: number;
  AnaestheticRoom: boolean;
  RecoveryRoom: boolean;
  Comments: string;
  CarePoint: boolean;
  InchargeCareProviderID: number;
  InchargeCareproviderName: string;
  SpecialtyOID: number;
  SpecialtyDescription: string;
  Purpose: string;
  TheatreType: string;
  TheatreSuite: string;
  oSPStatus: ServicePointStatus;
  WardType: string;
  BedManagement: string;
  TreatementRoom: string;
  oHealthOrganisation: HealthOrganisation;
  CareServiceOID: number;
  CareServiceName: string;
  TheatreOID: number;
  WardOID: number;
  PurposeOID: number;
  CsServicePointOID: number;
  ServiceIDOID: number;
  IsPatientTracking: string;
  TWStatusFlag: string;
  WardAttendance: boolean;
  Incidentlevel: string;
  CCPEpisode: boolean;
  IsCapacityCheck: string;
  AugCarLocation: string;
  IsCDSExcluded: boolean;
  DataDeficitChk: boolean;
  FwdWaitView: boolean;
  PorterView: boolean;
  BookedStatus: string;
  CriticalCareUnitFunc: string;
  ScheduleFlag: string;
  CriticalCareUnitConfig: string;
  INCLICode: string;
  AGEGRCode: string;
  IsCapacitychng: boolean;
  Capacityfrmdt: DateTime;
  Capacitytodt: DateTime;
  ModCapacity: number;
  LockSession: boolean;
  IsAvailableOnHoliday: boolean;
  WorkDays: string;
  RemoveWorkDays: boolean;
  EPrescribe: boolean;
  IsQuickDischargeEnabled: boolean;
  IsLeaveAndDischargeAllowed: boolean;
  IsLocked: boolean;
  IsCaseNotePresent: boolean;
  IsEnablePlaceOfSafety: boolean;
  ContactNumber: string;
  ServiceLineCode: string;
  ServiceCategoryCode: string;
  IsSessionStarted: boolean;
  IsEndDateChanged: boolean;
  IFMFormCode: string;
  TransferFormRequired: string;
  IFMFormName: string;
  oTransferOfCare: TransferOfCareConfigInfo;
  oServiceProviderDetails: ObservableCollection<ServiceProviderDetails>;
  EventStatusOptions: ObservableCollection<EventStatusOption>;
  oLocation: ObservableCollection<Location>;
  oLocationMask: ObservableCollection<LocationMask>;
  arrServiceProfile: ObservableCollection<ServiceProfile>;
  oPurpose: ObservableCollection<ServicePurpose>;
  oAssociatedServicePoint: ObservableCollection<AssociatedServicePoint>;
  oTheatreCritical: ObservableCollection<TheatreCrtical>;
  TransportMode: ObservableCollection<TransportMode>;
  ServiceExtension: ObservableCollection<ServiceExtension>;
  MaskInfo: ObservableCollection<MaskInfo>;
  TheatreDelayGain: ObservableCollection<DelayGain>;
  CompatableServicePoint: ObservableCollection<SubServicePoint>;
  ServiceLetterDetails: ObservableCollection<ServiceLetters>;
  ServiceFormDetails: ObservableCollection<ServiceForms>;
  oFPlan: ObservableCollection<FloorPlans>;
  oFailedStatus: ObservableCollection<ServicePointStatus>;
  oServicePointStatusHistory: ObservableCollection<StatusHistory>;
  oEventStatusOpt: ObservableCollection<EventStatusOption>;
}
export class ServiceProviderDetails extends CLZOObject {
  ServiceProviderDetailsOId: number;
  ServiceOId: number;
  ServiceName: string;
  CareProviderOId: number;
  CareProviderName: string;
  SpecialtyOId: number;
  SpecialtyName: string;
  TreatmentFnOId: number;
  TreatmentFnName: string;
  CPForeName: string;
  CPSurName: string;
  SpecialtyType: string;
  CPRoleProfileOID: number;
  CPRoleProfileName: string;
  GridMode: string;
  SerCPRoleOID: number;
}
export class SessionDetails extends CLZOObject {
  SessionStartTime: string;
  SessionEndTime: string;
  DurationHours: number;
  DurationMinutes: number;
  EndHours: number;
  EndMinutes: number;
  StartHours: number;
  StartMinutes: number;
  SlotType: string;
  SlotDuration: number;
  ActiveFrom: DateTime;
  ActiveTo: DateTime;
  RestructurePerformDate: DateTime;
  SessionStartDate: DateTime;
  SessionEndDate: DateTime;
  Horizon: number;
  HorizonUOM: string;
  RestructureDoneBy: string;
  SessionName: string;
  SessionID: number;
  SessionType: string;
  SessionIdentifier: string;
}
export class AssociatedServicePoint extends CLZOObject {
  OID: number;
  ServiceOID: number;
  AssociatedServiceOID: number;
  AssociatedServiceName: string;
  AuditData: AuditInfo;
  OwnerOrganisationOID: number;
}
export class TheatreCrtical extends CLZOObject {
  OID: number;
  ServiceOID: number;
  CriticalCareType: string;
  CriticalCareValue: string;
  AuditData: AuditInfo;
  OwnerOrganisationOID: number;
}
export class TransportMode extends CLZOObject {
  TransportModeTxt: string;
  OID: number;
  TransportModeCC: string;
  Status: string;
}
export class ServiceExtension extends CLZOObject {
  LocationOID: number;
  ServiceOID: number;
  DomainType: string;
  DomainValue: string;
  Case: string;
  Status: string;
  MaskOID: number;
  ParentLocationOID: number;
  AreaName: string;
}
export class DelayGain extends CLZOObject {
  SourceStatusCode: string;
  TargetStatusCode: string;
  OID: number;
  Mandatory: string;
  ThresholdDuration: number;
  Status: string;
}
export class ServiceLetters extends CLZOObject {
  CareActivityCode: string;
  CareActivityName: string;
  DocumentCode: string;
  IdentifyingOID: number;
  IdentiyingType: string;
  IsDefault: string;
  LetterTemplateType: string;
  OID: number;
  Status: string;
  LetterTypeName: string;
  LetterTemplateName: string;
  TemplateOID: string;
  FormOID: string;
  EventStatusCode: string;
}
export class ServiceForms extends CLZOObject {
  ModifiedBy: number;
  ModifiedAt: DateTime;
  CareActivityCode: string;
  CareActivityName: string;
  IdentifyingOID: number;
  IdentiyingType: string;
  IsDefault: string;
  OID: number;
  Status: string;
  TemplateName: string;
  TemplateOID: string;
  FormOID: string;
  EventStatusCode: string;
}
export class FloorPlans extends CLZOObject {
  FloorOId: number;
  FloorName: string;
  FloorStatus: string;
  FloorIsUsed: string;
}
export class TOCRequestinput extends CLZOObject {
  TOCTYPE: string;
  PatientOID: number;
  EncounterOID: number;
  EncounterType: string;
  ServiceOID: number;
  GPOID: number;
  OrgOID: number;
  MeshMailBoxID: string;
  AlternateMeshMailBoxID: string;
  SendingSystemMailBoxID: string;
  MessageId: string;
  WorkflowID: string;
  DocumentOID: string;
  TOCSummaryOID: string;
  MESHLCode: string;
  ACKMTCode: string;
  ISFromMainApp: boolean;
  EncounterID: string;
  EncounterStatus: string;
    sClinicalDocBinaryContent: ObservableCollection<byte>;
  TOCStatus: string;
  TOCSummaryHistoryOID: number;
  TOCCompletedBy: number;
  TOCIsSensitive: string;
  TOCUserOverriddenPermission: string;
  ReceivingOrgOID: number;
  PASIdentifier: string;
  PatientNHSNumber: string;
  IsPatientGPAvailable: boolean;
  CareSettingCode: string;
  CareSettingTerm: string;
  CareSettingVersion: string;
  CareSettingCodingName: string;
}
export class TransferOfCareConfigInfo extends TOCRequestinput {
  TOCSECConfigToDelete: string;
  oTOCSectionDetails: ObservableCollection<TOCSectionDetails>;
}
export class TOCBaseObject extends CLZOObject {
  IsAtributeCustmDisplyFRMT: boolean;
  OID: number;
  QualifiedName: string;
  DisplayName: string;
  SnomedCode: string;
  DisplayOrder: number;
  IsVisible: string;
  IsMandatory: boolean;
  MANDTCode: string;
  MANDTDisplayName: string;
  oTOCCustmAttribute: ObservableCollection<TOCBaseObject>;
  DisplayValue: ObservableCollection<TOCDisplayDetails>;
}
export class TOCSectionDetails extends TOCBaseObject {
  FNTYPCode: string;
  FNTYPDisplayName: string;
  FRMATCode: string;
  FRMATDisplayName: string;
  SECTYcode: string;
  SECTYDisplayName: string;
  IdentifyingType: string;
  IdentifyingValue: string;
  IdentifyingName: string;
  IsValidSection: boolean;
  IsSecMandatryAtributeFilled: boolean;
  ServiceOID: number;
  IsSectionTypeChangeable: string;
  SectionDefinitionOID: number;
  IFMFormORDataItemOID: number;
  SectionContent: string;
  oTOCAttribute: ObservableCollection<TOCBaseObject>;
}
export class TOCDisplayDetails extends CLZOObject {
  Key: string;
  Value: string;
}
export class dpServicePointDetail extends ServicePointDetail {
  ServicePointID: ID;
  ServiceLocation: dpLocation;
  objdpUser: dpUser;
  ServiceOrganisation: HealthOrganisationDetail;
  SessionDetails: dpSessionDetail;
}
export class dpSessionDetail extends CLZOObject {
  SessionType: string;
  SessionID: string;
  SessionName: string;
  SessionStartTime: string;
  SessionEndTime: string;
  SlotType: string;
  RestructureDateTime: DateTime;
  IsCaseNoteReqd: boolean;
  CaseNoteType: string;
  IsPublishedCAB: boolean;
  IsContractSession: boolean;
  ActiveFrom: DateTime;
  ActiveTo: DateTime;
  Instructions: string;
  SessionLocation: dpLocation;
}
export class CareService extends CLZOObject {
  oEntWorkGroup: EnterpriseWorkgroup;
  OId: number;
  Type: string;
  Name: string;
  Description: string;
  HealthOrganisationOId: number;
  HealthOrgName: string;
  MainIDType: string;
  MainID: string;
  ActiveFrom: DateTime;
  ActiveTo: DateTime;
  Active: boolean;
  ChildCareService: string;
  oParentCareService: ParentService;
  oAuditInfo: AuditInfo;
  CreatedByName: string;
  PropertyType: string;
  HealthOrganisationFrmDate: DateTime;
  HealthOrganisationToDate: DateTime;
}
export class HOCareService extends CareService {
}
export class ParentService extends CLZOObject {
  OId: number;
  Type: string;
  Name: string;
  MainIDType: string;
  MainID: string;
  ActiveFrom: DateTime;
  ActiveTo: DateTime;
}
export class Role extends CLZOObject {
  RoleOID: number;
  IsRestrictedData: boolean;
  Code: string;
  Description: string;
  Name: string;
}
export class SearchCareEvent extends CLZOObject {
  PatientOId: number;
  EncounterOID: number;
  EventOID: number;
  Eventtype: string;
  CREVTCode: string;
  ENTYPCode: string;
  IsCustomFilter: boolean;
  CreatedDttm: DateTime;
  ClosureDttm: DateTime;
  DateQualifier: string;
  SplityOID: number;
}
export class CareEventItem extends CLZOObject {
  PatientOID: string;
  SearchCareEvents: ObservableCollection<SearchCareEvents>;
}
export class SearchCareEvents extends CLZOObject {
  GroupValue: string;
  GroupByText: string;
  Count: number;
  GroupText: string;
  OID: string;
  OutPatientEventOID: string;
  EncounterOID: string;
  EncounterName: string;
  EncounterIdentifier: string;
  EpisodeOID: string;
  EpisodeName: string;
  TYPE: string;
  CREVTCode: string;
  IdentifyingOID: string;
  IdentifyingType: string;
  CareproviderName: string;
  EstDiscDate: DateTime;
  MedicalDisEndDTTM: DateTime;
  StartDTTM: DateTime;
  EndDTTM: DateTime;
  Organisationname: string;
  OrganisationID: string;
  Status: string;
  ModifiedDTTM: DateTime;
  EventModifiedDTTM: DateTime;
  CareproviderOID: string;
  TreatmentFnOID: string;
  TreatmentFnName: string;
  SpecialtyOID: string;
  SpecialtyName: string;
  ServiceName: string;
  LocationName: string;
  SessionName: string;
  ReferralOid: string;
  CreatedBy: number;
  ServiceOID: number;
  LocationOID: number;
  CreatedUserName: string;
  MedicalDiscDTTM: string;
  BookingOID: number;
  CREVTText: string;
  BedCategory: string;
  UBRN: string;
  Donotcancel: boolean;
  APEOID: number;
  APETYPE: string;
  APEOFFEROID: number;
  OFFERITEMOID: number;
  APESTATUS: string;
  APEGUARANTEEDTTM: DateTime;
  OPSTACode: string;
  BkgLastModifiedAt: DateTime;
  APPSTCode: string;
  ScheduleOID: number;
  CPMScheduleOID: number;
  CPMBookingOID: number;
  PatientOID: string;
  isCancelled: boolean;
  OPCurrApptStatus: string;
  OPApptType: string;
  Stagemarker: string;
  ClosedBy: string;
  EncTypCode: string;
  CONMDCode: string;
}
export class CareEventsDetails extends CLZOObject {
  CareproviderOID: string;
  CareproviderName: string;
  SpecialtyOID: string;
  SpecialtyName: string;
  SpecialtyDescription: string;
  PatientOID: string;
  ServiceOID: string;
  ServiceName: string;
  LocationOID: string;
  LocationName: string;
  OrganisationOID: string;
  OrganisationName: string;
  EndDate: DateTime;
  StartDate: DateTime;
  oIPEventDetails: IPEventDetails;
  oOPEventDetails: OPEventDetails;
  oCEDayCareEventDetails: CEDayCareEventDetails;
  Comments: string;
  IdentifyingOID: string;
  IdentifyingType: string;
  ModifiedDTTM: DateTime;
  TreatmentFunction: string;
  oCELTMEventDetail: LTMENCEventDetails;
  MHAEndDate: DateTime;
}
export class IPEventDetails extends CLZOObject {
  oAdmission: CEAdmission;
  oCareProviderEvent: CECareProviderEvent;
  oLocationEvent: CELocationEvent;
  oPatientCategoryEvent: CEPatientCategoryEvent;
  oPatientLeaveReturn: CEPatientLeaveReturn;
  oDischarge: CEDischarge;
  oCEPatientLeave: CEPatientLeave;
  oCESection17Form: CESection17Form;
  oCEEstDischDate: CEEstDischDate;
  oCEPlannedContact: CEPlannedContact;
  oCECancelledContact: CECancelledContact;
}
export class CEAdmission extends CLZOObject {
  BookCancelDTTM: DateTime;
  DirectadmitrequestDTTM: DateTime;
  AdmissionDttm: DateTime;
  AdmissionNumber: string;
  AdmissionSource: string;
  AdmissionType: string;
  BedCategory: string;
  BedName: string;
  CareServiceName: string;
  ExpectedDischargeDttm: DateTime;
  OutlierReason: string;
  WardName: string;
  WardType: string;
  DateofCreation: DateTime;
  AmbulatoryStatus: string;
  Preferences: string;
  ModifiedDTTM: DateTime;
  ReasonForCancel: string;
  TreatmentFunction: string;
  SharedCarer: string;
  LegalCode: string;
  ExpectedLengthofStay: string;
  PatientCategorycode: string;
  ServiceCategorycode: string;
  ByCode: string;
  STRSNCode: string;
  ModifiedBy: string;
  IsBoarderExists: boolean;
  CPMBookingOID: number;
  RescheFromBookingOID: number;
  RescheduleComments: string;
  IPBookingOID: number;
  ServiceOID: number;
  IntendedManagement: string;
}
export class CECareProviderEvent extends CLZOObject {
  ReqToCareProviderName: string;
  ReqByStartDTTM: DateTime;
  ReqByEndDTTM: DateTime;
  ReqToStartDTTM: DateTime;
  ReqToEndDTTM: DateTime;
  CreatedDttm: DateTime;
  ReqToSpecialtyName: string;
  ReqBySpecialtyName: string;
  ReqByCareProviderName: string;
  TransferReason: string;
  ModifiedDTTM: DateTime;
  ReqByTreatmentfunction: string;
  ReqToTreatmentfunction: string;
}
export class CELocationEvent extends CLZOObject {
  FormOID: number;
  PriorEventOID: string;
  BedCategory: string;
  BedName: string;
  WardName: string;
  TransferDate: DateTime;
  PriorWardType: string;
  WardType: string;
  TransferReason: string;
  PriorBedName: string;
  PriorWardName: string;
  PriorBedCategory: string;
  PriorCareproviderName: string;
  PriorStartDTTM: DateTime;
  PriorEndDTTM: DateTime;
  Dateofcreation: DateTime;
  PriorLocationname: string;
  CurrentLocationname: string;
  ModifiedDTTM: DateTime;
  Comments: string;
}
export class CEPatientCategoryEvent extends CLZOObject {
  TargetCategory: string;
  TransferDate: DateTime;
  EndDate: DateTime;
  PriorTargetCategory: string;
  TransferReason: string;
  OrganisationName: string;
}
export class CEPatientLeave extends CLZOObject {
  LeaveType: string;
  RequestedStartDttm: DateTime;
  Duration: number;
  ExpectedReturnDttm: DateTime;
  RequestedBy: string;
  RequestedByOID: number;
  ReqByCareproviderName: string;
  IsBedReleased: boolean;
  objCPDetails: EscortedCPDetails;
  LeaveReason: string;
  MaxPermissibleDays: number;
  Comments: string;
  RejectComments: string;
  PersonalCarerName: string;
  IsCareproviderAccompany: boolean;
  ActualStartDttm: DateTime;
  AuthorisedBy: string;
  CreatedAt: DateTime;
  RecallDttm: DateTime;
  LeaveComment: string;
  CPDetails: string;
  ActualReturnDttm: DateTime;
  ModifiedDTTM: DateTime;
  RevisedExpectedReturnDTTM: DateTime;
  IsLeaveextended: boolean;
  AdvancedLeaveRetStatus: string;
  AWOLFromDTTM: DateTime;
  AWOLToDTTM: DateTime;
  AWOLStatus: string;
  AWOLLastObsDTTM: DateTime;
  AWOLLastObsLoc: string;
  AWOLPatientDesc: string;
  AWOLClothing: string;
  AWOLSearchDet: string;
  AWOLInformedBy: string;
  AWOLInformedDTTM: DateTime;
  AWOLContactBy: string;
  AWOLContactDTTM: DateTime;
  LeaveAuthoriseDTTM: DateTime;
  AWOLComments: string;
  AWOLOutCome: string;
  HealthOrganisation: string;
  ServicePointName: string;
  LocationName: string;
  ContactedName: string;
}
export class CEPatientLeaveReturn extends CEPatientLeave {
  BedName: string;
  WardName: string;
  WardType: string;
  CancelDate: DateTime;
  Reason: string;
  ReturnDttm: DateTime;
  LeaveToDttm: DateTime;
  Outcome: string;
  SpecialtyName: string;
  TreatmentFnName: string;
  BedCategory: string;
  IsNotReturned: boolean;
  IsLeaveRevoked: boolean;
  LeaveRevokedDttm: DateTime;
  IsPatientAWOL: boolean;
  AWOLFromDttm: DateTime;
  IsFurtherLeaveGranted: boolean;
  FurtherLeaveGrantedDttm: DateTime;
  PATIACode: string;
  LocAttribute: string;
}
export class EscortedCPDetails {
  NoOfCareProvider: number;
  CPGender: string;
  CPStatus: string;
  arrCPDetails: ObservableCollection<CareProviderDetails>;
}
export class CareProviderDetails {
  HMCPOId: string;
  CPName: string;
  CPOId: number;
}
export class CESection17Form extends CEPatientLeave {
  Sec17LeaveType: string;
  IsCPAccompanied: boolean;
  Section17FormOId: string;
  Sec17FormStatus: string;
  SectionName: string;
  SectionOId: number;
  RevokeDateTime: DateTime;
  RevokeReason: string;
  RevokeComments: string;
  DestAddress: string;
  Careofcode: string;
  Careofname: string;
  SpecialConsideration: string;
  ContactNumber: string;
}
export class CEDischarge extends CLZOObject {
  MedicalDischargeEndDTTM: DateTime;
  MDEndReason: string;
  Delayeddischargeatt: string;
  ResLocalAuthOrgOID: string;
  ResLocalAuthOrgName: string;
  DischargedType: string;
  Destination: string;
  DelayedReason: string;
  MedicalDischargeDttm: DateTime;
  DischargeDttm: DateTime;
  DateofCreation: DateTime;
  EncounterOID: string;
  Reason: string;
  CancelDate: DateTime;
  ExpectedDiscDTTM: DateTime;
  DischargeStatus: string;
  DischargedIn: string;
  DischargedInCode: string;
  IntentionToReadmit: string;
  ModifiedDTTM: DateTime;
  Comments: string;
  TransportMode: string;
  CareProviderOID: string;
  CareProvider: string;
  DestAddress: string;
  DischargeOutcome: string;
  ReadmitDays: string;
  DeferredReason: string;
  CancelledBy: string;
  NewActualRTTStatus: string;
  TempAddress: string;
  StateCode: string;
  CityCode: string;
  CNTRYCode: string;
  COUNTYCode: string;
  POSTCODE: string;
  Outcomes: ObservableCollection<CEDischargeOutcome>;
}
export class CEDischargeOutcome extends CLZOObject {
  OutcomeDetailsOID: string;
  EncounterOId: string;
  PatientOId: string;
  Outcome: string;
  IntReason: string;
  ExtReason: string;
  DDATRCode: string;
  IsPrimary: string;
  DDRSNFromDTTM: DateTime;
  DDRSNToDTTM: DateTime;
  ResLocalAuthOrgName: string;
}
export class CEEstDischDate extends CLZOObject {
  RevisedDTTM: DateTime;
  RevisedLOS: number;
  RSDDTCode: string;
  RequestedByUserName: string;
  PrevEstimatedDischDttm: DateTime;
  CareProviderName: string;
  ServiceName: string;
  LocationName: string;
}
export class CEPlannedContact extends CLZOObject {
  OrganizationName: string;
  CareproviderName: string;
  ContactType: string;
  ContactDateTime: DateTime;
  Location: string;
  Purpose: string;
  LocationType: string;
  IsInterpreter: string;
  PattCommLang: string;
  Comments: string;
  ContactCategory: string;
  CareproviderOID: string;
  OtherCPNameStatus: string;
  CNTOMRecordedDTTM: DateTime;
}
export class CECancelledContact extends CLZOObject {
  CancellationDateTime: DateTime;
  CancellationReason: string;
  CancelledBy: string;
  ContactDateTime: DateTime;
  CancelComments: string;
  ContactCategory: string;
  IsInterpreter: string;
  PattCommLang: string;
  CANBYCode: string;
}
export class OPEventDetails extends CLZOObject {
  oAttendance: CEAttendance;
}
export class CEAttendance extends CLZOObject {
  AppointmentEndDttm: DateTime;
  AppointmentStartDttm: DateTime;
  CareProviderRole: string;
  LocalOutcome: string;
  Outcome: string;
  DateOfCreation: DateTime;
  Reason: string;
  AttendStat: string;
  ModifiedDTTM: DateTime;
  AppointmentType: string;
  UBRN: string;
  USRN: string;
  RecordedDTTM: DateTime;
  TreatmentFunction: string;
  Comments: string;
  CANRNCode: string;
  CNCLBCode: string;
  ModifiedBy: string;
  RescheFromBookingOID: number;
  RescheduleBy: string;
  RescheduleReason: string;
  RescheduleComments: string;
  OPBookingOID: number;
  CONMDCode: string;
  ADTYPCODE: string;
}
export class CEDayCareEventDetails extends CLZOObject {
  Comments: string;
  CancelDate: DateTime;
  CancelOrDNAReason: string;
  BookingOID: string;
  StartDTTM: DateTime;
  EndDTTM: DateTime;
  CareproviderName: string;
  Location: string;
  Specialty: string;
  IsAppointmentConfirmed: boolean;
  SessionName: string;
  Outcome: string;
  Status: string;
  SessionID: string;
  EventDTTM: DateTime;
  EncounterOID: string;
  ServiceName: string;
  CareproviderOID: number;
  CreatedDTTM: DateTime;
}
export class LTMENCEventDetails extends CLZOObject {
  CareEventStatus: string;
  Location: string;
  OPerEndTime: DateTime;
  OperStartTime: DateTime;
  OperationDesc: string;
  ServicePoint: string;
  Session: string;
  Surgeon: string;
  Specialty: string;
  TreatmentFunction: string;
}
export class Admission extends CLZOObject {
  AdmissionOID: string;
  AdmissionNumber: string;
  MinAgeLimit: string;
  EncounterOID: string;
  validationmessage: string;
  EncounterID: string;
  BoarderAdmit: boolean;
  MaternityBoarderOID: number;
  MatBoarderBKGOID: number;
  MatBoarderEncOID: number;
  PreadmissionOID: string;
  LocationBedCount: number;
  IsLastRTTActivity: boolean;
  oBabyPatientDemographics: PatientDemographics;
  PatientOID: string;
  CareproviderOID: string;
  CareProviderName: string;
  SpecialtyOID: string;
  SpecialtyName: string;
  CareServiceOID: string;
  CPENDDTTM: DateTime;
  CareServiceName: string;
  AdmissionSource: string;
  SourceAddressDetails: string;
  SourceAddress: string;
  AdmissionType: string;
  PatientCategory: string;
  ServiceCategory: string;
  ManagementIntention: string;
  IsReadmission: string;
  ReadmissionOID: string;
  AdmissionDttm: DateTime;
  ExpectedLengthOfStay: string;
  Periodcode: string;
  ExpectedDischargeDttm: DateTime;
  ActualDischargeDttm: DateTime;
  IsEDDModified: boolean;
  RevisedPlanDDttm: DateTime;
  PreferredLanguage: string;
  PreferredLanguageText: string;
  IsRTTUpdateRequired: boolean;
  IsInterpreterRequired: boolean;
  CanOverBookIP: boolean;
  CanForceBookIP: boolean;
  ReferralOID: string;
  EpisodeOID: string;
  EpisodeID: string;
  WardType: string;
  WardOID: string;
  WardName: string;
  BedCategory: string;
  PreWardOID: string;
  EntityOID: number;
  BedOID: string;
  BedName: string;
  IsOutlier: boolean;
  IsOutlierSplty: boolean;
  LocSpltyOID: string;
  OutlierReason: string;
  PatientEmployer: string;
  Insurer: string;
  Comments: string;
  NurseInCharge: string;
  NurseInChargeOID: string;
  IsRequestVisitor: string;
  IsSpritualAdvisor: string;
  AmbulatoryStatus: string;
  BoarderName: string;
  BoarderWard: string;
  BoarderWardName: string;
  BookingOID: string;
  ReqBookingOID: string;
  IsReBookingNeeded: boolean;
  BookingStartDttm: DateTime;
  BookingEndDttm: DateTime;
  IsCancelled: boolean;
  IsCurrent: boolean;
  isLocCurrent: boolean;
  isCatCurrent: boolean;
  IsDischarged: boolean;
  CareProviderEventOID: string;
  LocationEventOID: string;
  PatientCategoryOID: string;
  ScheduleOID: string;
  OrganizationName: string;
  OrganizationOID: string;
  PatientName: string;
  BirthDttm: DateTime;
  LocationID: string;
  SessionName: string;
  LocationName: string;
  DischargeDttm: DateTime;
  IsQuickAdmitted: string;
  BoarderOID: string;
  DateofCreation: DateTime;
  TreatmentFunctionName: string;
  TreatmentFunctionOID: string;
  LegalStatus: string;
  bShowAdmitNumber: boolean;
  sAdmitNumberFormat: string;
  bCanOverlap: boolean;
  bCanOverRideCapacityRight: boolean;
  ReferralDate: string;
  ReferralFromCP: string;
  ReferralToCP: string;
  ReferralReason: string;
  APEOID: string;
  APEOfferOID: string;
  NonAssoAPEOID: string;
  APEOfferItemOID: number;
  IsPriorEventExist: boolean;
  IsChildExists: boolean;
  IsMaternityAdmission: boolean;
  PatAppIPOID: string;
  WardSpecialtyOID: number;
  WardTreatmentFunctionOID: number;
  WardLocationOID: number;
  InterpreterDetails: string;
  InterpreterStatusCode: string;
  InterpreterBooked: string;
  OutlierCategory: string;
  CreateCCP: boolean;
  CCPOID: number;
  LeaveDays: number;
  CCPDays: number;
  IsBedRequested: boolean;
  BRREQOID: string;
  SourceAddNotesDetOID: number;
  SourceAddNotesDetails: string;
  AppStatus: string;
  IsDiscardedBookings: boolean;
  ReferralToOrg: string;
  ReferralByOrg: string;
  ReferralSoruce: string;
  ReferralToType: string;
  ReferralType: string;
  EventDTTM: DateTime;
  Roleoid: string;
  Rolename: string;
  PatCarEvtOID: string;
  PasID: string;
  IsRetroEvent: boolean;
  ActualEventDttm: DateTime;
  IsPostEvtExist: boolean;
  LatestCPMBkgOID: string;
  PostEvtStartDTTM: DateTime;
  IsVoidCCP: boolean;
  PostLocEvtOID: string;
  IsPostCPExist: boolean;
  defaultWardOID: number;
  PatientProblemOID: number;
  IsScheduledAdmission: boolean;
  CodingIdentifyingtype: string;
  OldPatientOID: number;
  OldReferralOID: number;
  NewPatientOID: number;
  IstreatmentfnModified: boolean;
  MhTrialLeaveEndDate: DateTime;
  IsAdmittedFromExternal: boolean;
  IsAdvancedAPE: boolean;
  MedicalDisCPOID: number;
  ReasonForAdmit: string;
  IsContentSearch: boolean;
  MsgAuditLogID: number;
  IsFromEC: boolean;
  ECEncounterOID: number;
  oSpecialty: Specialty;
  oCareProvider: User;
  oWard: dpServicePointDetail;
  oAdcareprovider: dpUser;
  oNurseincharge: dpUser;
  oTreatmentFn: Specialty;
  oLocation: dpLocation;
  PriorEventOID: number;
  CPISResponseID: string;
  SharedCarers: ObservableCollection<SharedCarer>;
  LocationAttribute: ObservableCollection<LocationAttribute>;
  DietaryRequirements: ObservableCollection<DietaryRequirements>;
  BoarderDetails: ObservableCollection<BoarderDetails>;
  OPAppointments: ObservableCollection<OPAppointments>;
  DiscardedBookings: ObservableCollection<DiscardedBookings>;
  oCoding: ObservableCollection<Coding>;
  arrCPISAlertEncouterOId: ObservableCollection<number>;
}
export class PatientDemographics extends CLZOObject {
  PBR: string;
  isSummary: boolean;
  isSummaryMsgTrig: boolean;
  CallingCA: string;
  CareActivityCode: string;
  sUserName: string;
  sHOName: string;
  sRoleName: string;
  IsPreferenceUpdfromSummary: boolean;
  IsStatusUpdfromSummary: boolean;
  PurchaserOid: number;
  PurchaserName: string;
  PolicyNumber: string;
  ActiveFrom: DateTime;
  Count: number;
  PDSTotalCount: number;
  PDSConflictCount: number;
  IsReceiveReminderChecked: boolean;
  PrefContactMethodOID: string;
  PreferredContactMethod: string;
  OldPrefContactMethodOID: string;
  IsSendRegistrationEmail: boolean;
  PatientDetails: Patient;
  Contract: ContractActivity;
  PatBasedReg: PatientBasedRegistration;
  ReferralProcessMode: string;
  IsBlockLAATriggerEvent: boolean;
  IsMessagingCall: boolean;
  IsCABMessagingCall: boolean;
  PIB: PatientIdentityBand;
  BloodSpotCardLabel: BloodSpotCardLabel;
  PreferenceOIDs: string;
  IsSendPatientAideRegEmail: boolean;
  IsPatientAideUser: boolean;
  PatientAddress: ObservableCollection<PatientAddress>;
  PatientAlias: ObservableCollection<PatientAlias>;
  PatientID: ObservableCollection<PatientID>;
  PatientPersonalCarer: ObservableCollection<PatientPersonalCarer>;
  PatientCarer: ObservableCollection<PatientCarer>;
  PatientGP: ObservableCollection<PatientGP>;
  Preference: ObservableCollection<PatientPreference>;
  OtherAdminPreference: ObservableCollection<PatientPreference>;
  PatientStatus: ObservableCollection<PatientStatus>;
  Education: ObservableCollection<PatientEducation>;
  Employer: ObservableCollection<PatientEmployer>;
  Insurance: ObservableCollection<PatientInsurance>;
  PatientDeceased: ObservableCollection<PatientDeceased>;
  PatientConsent: ObservableCollection<PatientConsent>;
  DPatientAlias: ObservableCollection<PatientAlias>;
  DPatientAddress: ObservableCollection<PatientAddress>;
  DPatientPersonalCarer: ObservableCollection<PatientPersonalCarer>;
  DPreference: ObservableCollection<PatientPreference>;
  InterPreter: ObservableCollection<PatientPreference>;
}
export class Patient extends CLZOObject {
  PatientIdentifier: string;
  NumberOfDependants: number;
  PatientID: string;
  NationalID: string;
  UnFormatNHSNo: string;
  Identfier1: string;
  Identfier2: string;
  IDType: string;
  MessageStatus: string;
  DOBEstimated: string;
  DoNotMergeWithReason: string;
  PateintDeceasedstatus: string;
  OrganisationCode: number;
  Comments: string;
  NumberOfDependents: number;
  OwnerOrganisationOID: string;
  PDSSensitiveFlag: string;
  IsNewRegistration: boolean;
  Surname: string;
  Prefix: string;
  PartnerPrefix: string;
  PartnerSurname: string;
  PDisplayNHSNo: string;
  LDisplayNHSNo: string;
  bDOB: boolean;
  bDOD: boolean;
  PDisplayBirthDTTM: string;
  LDisplayBirthDTTM: string;
  PDisplayDeathDTTM: string;
  LDisplayDeathDTTM: string;
  PDisplayGender: string;
  LDisplayGender: string;
  SuffixName: string;
  Forename: string;
  MiddleName: string;
  TitleText: string;
  Title: string;
  PatientName: string;
  Alias: string;
  Sex: string;
  SexCode: string;
  RegistrationDttm: DateTime;
  bConTempPasid: boolean;
  PACLSModifiedDttm: DateTime;
  BirthDttm: DateTime;
  DateOfBirthEstimated: boolean;
  MultipleBirth: string;
  BloodGroup: string;
  InterpreterRequired: boolean;
  Deceased: boolean;
  IsConfirmDeceased: string;
  IsDecouple: string;
  IsDecoupleStaus: string;
  bModifyMode: boolean;
  PDSPatientAliasID: string;
    PDSPatientAliasStatus: byte;
  PlaceOfBirth: string;
  MPlaceOfBirthText: string;
  DeathDttm: DateTime;
  PDSDeathDttmCopy: DateTime;
  IsPartialDOD: string;
  BirthDttmOpmode: string;
  EventReasonCode: string;
  GenUpdate: string;
  iSFrSummCa: boolean;
  bDecFrSync: boolean;
  CountryCode: string;
  OrganisationType: string;
  RegistrationType: string;
  RegType: string;
  FacilityID: string;
  Confidential: boolean;
  Careprovider: string;
  PatientStatus: string;
  ConfidentialityReason: string;
  Nationality: string;
  Religion: string;
  Ethnic: string;
  ConsentReligion: string;
  ConsentEthnic: string;
  Occupation: string;
  MaritalStatus: string;
  EstimationOfBirth: string;
  RecordNumber: number;
  NYSIISForename: string;
  NYSIISSurname: string;
  IsActiveMerge: string;
  IsLinked: string;
  IsSensitive: string;
  IsConsent: string;
  Age: string;
  DeathNotification: string;
  TotRec: number;
  TraceStatus: string;
  SecondaryID: string;
  PrimaryID: string;
  MaxCount: number;
  IsPDSSync: boolean;
  Waitage: string;
  BirthDttmFrom: DateTime;
  SCNNumber: string;
  bSamescn: boolean;
  IsPDSTraced: string;
  PTRSTCode: string;
  Count: number;
  RegiseteredHOOID: number;
  RegiseteredHOName: string;
  DoNotMergeWithPASIDs: string;
  MessageChk: string;
  Confidentialcode: string;
  ageinyears: number;
  bPDSDeceased: boolean;
  bCancelDeceased: boolean;
  IsRegType: string;
  PDSGPPracCode: string;
  PrevCnt: number;
  IsUpdScnZero: boolean;
  MigrationFlag: string;
  CareProviderOrgCode: string;
  IsMetaphone: string;
  SocialEthnic: string;
  SocialReligion: string;
  bIsEmailReq: boolean;
  MSHDatetime: string;
  MSGPatientMainID: string;
  bIsCopyLetter: string;
  MaritalStatusCode: string;
  EthnicityCode: string;
  ReligionCode: string;
  IsFromMaternity: boolean;
  SexualOrientation: string;
  IsEthinicityUpdfromSummary: boolean;
  LocalSecure: string;
  SpokenLanguage: ObservableCollection<SpokenLanguage>;
  PatID: ObservableCollection<PatientID>;
}
export class SpokenLanguage extends CLZOObject {
  LanguageIdentifier: string;
  LanguageCode: string;
}
export class PatientAlias extends CLZOObject {
  AliasIdentifier: string;
  AliasType: string;
  Comments: string;
  OrganisationOID: string;
  PDSPatientAliasID: string;
  SuffixName: string;
  NYSIISSurname: string;
  NYSIISForename: string;
  sMsgChk: string;
  Status: string;
  FormattedFromDate: string;
  FormattedToDate: string;
  PatientOID: string;
  Surname: string;
  Forename: string;
  Middlename: string;
  Suffixname: string;
  Prefixname: string;
  Partnerprefix: string;
  Partnersurname: string;
  Title: string;
  ActiveFrom: DateTime;
  CreatedAt: DateTime;
  ActiveTo: DateTime;
  GenUpdate: string;
    PDSUpdateStatus: byte;
  SuspendMode: string;
  GridRowStatus: string;
  sPDSValue: string;
  sLorValue: string;
  IsPDSExceed: boolean;
  IsLorExceed: boolean;
  LozStartDTTM: DateTime;
  LozENDDTTM: DateTime;
  IsPDSchecked: boolean;
  IsMatch: string;
  IsAliasUIHistoric: boolean;
  bPdsGenUpd: boolean;
  IsGenUpdate: boolean;
  OPMode: string;
  IsMetaphone: string;
}
export class PatientPersonalCarer extends CLZOObject {
  SuspendMode: string;
  Status: string;
  PatientPersonalCarerOID: string;
  DisplayOnEPR: boolean;
  NextOfKin: boolean;
  OwnerOrganisationOID: string;
  Comments: string;
  DialectSupported: string;
  Preferredlanguage: string;
  InterpreterRequired: string;
  GUID: string;
  CommunicationMethod: string;
  ContactMethod: string;
  PreferredOrder: string;
  sMsgChk: string;
  Suffix: string;
  IsGuarantor: string;
  FormattedFromDate: string;
  FormattedToDate: string;
  IsFromNOK: boolean;
  ActiveTabKey: string;
  IsRowSel: boolean;
  PersonalCarerOID: string;
  PatientOID: string;
  Title: string;
  SurName: string;
  ForeName: string;
  Middlename: string;
  sPDSValue: string;
  sLorValue: string;
  PersonalCarerType: string;
  NHSType: string;
  Sex: string;
  BirthDttm: DateTime;
  DeathDttm: DateTime;
  ActiveFrom: DateTime;
  CreatedAt: DateTime;
  ActiveTo: DateTime;
  Relationship: string;
  PreferredContactTime: string;
  ParentalResponsibility: string;
  ResidencyStatus: string;
  Historic: boolean;
  DoNotContact: boolean;
  IsUIHistoric: boolean;
  IsGenUpdate: boolean;
  bPdsGenUpd: boolean;
  OPMode: string;
  PersonalCarerSensitive: string;
  UsePatientAddress: boolean;
  Mainvisitor: string;
  UsePatientContact: string;
  UsePatientAddressValue: string;
  PatientCorres: string;
  PatientExtraCorres: string;
  RelPatCarerAssemnt: RelPatCarerAssemnt;
  Callcentercallback: string;
  IsPatient: boolean;
  RegislocallyOption: number;
  RelationshipPatientOID: string;
  RelatedPatientID: string;
  PDSPerosnalCarerId: string;
  GenUpdate: string;
    PDSUpdateStatus: byte;
  NHSNumber: string;
  Reciprocate: boolean;
  RPStatus: string;
  Prefix: string;
  PartnerPrefix: string;
  PartnerSurName: string;
  PCarerFullName: string;
  LozStartDTTM: DateTime;
  LozENDDTTM: DateTime;
  IsPDSchecked: boolean;
  IsMatch: string;
  MSGVirtualStatus: boolean;
  IsRestrictedData: boolean;
  patid: ObservableCollection<PatientID>;
  RelPatCarerAssessment: ObservableCollection<RelPatCarerAssemnt>;
  PatientAddress: ObservableCollection<PatientAddress>;
  PersonalCarerAddress: ObservableCollection<PersonalCarerAddress>;
}
export class RelPatCarerAssemnt extends CLZOObject {
  Age: string;
  PreferredName: string;
  CurrentGP: string;
  Nationality: string;
  Ethinicity: string;
  Religion: string;
  Occupationstatus: string;
  Occupation: string;
  Disabililtystatus: string;
  Disabilitydetails: string;
  OID: string;
  PatPersonalCarerOID: string;
  RelPatCarerAssemntCDCForm: ObservableCollection<RelPatCarerAssemntCDCForm>;
}
export class RelPatCarerAssemntCDCForm {
  CDCFormCreatedAt: DateTime;
  OID: string;
  Encounter: DateTime;
  OperationMode: string;
  CDCFormname: string;
  CDCStatus: string;
  RemovedCDCOID: string;
  FormType: string;
  IFMFormTemplateOID: string;
  FormCode: string;
  OwnerOrganisationOID: string;
  OwnerOrganisationName: string;
  ModifiedAt: DateTime;
  ModifiedBy: string;
  TemplateVersion: string;
}
export class PatientCarer extends CLZOObject {
  PatientOID: string;
  CarerType: string;
  CarerIdentifier: string;
  CarerName: string;
  IsRestrictedData: boolean;
  CarerOID: number;
  SourceNameOID: number;
  SourceName: string;
  TeamOID: number;
  TeamName: string;
  ActiveFrom: DateTime;
  ActiveTo: DateTime;
  Comments: string;
  CPROLCode: string;
  RoleName: string;
  User: dpUser;
}
export class PatientPreference extends CLZOObject {
  SuspendMode: string;
  sPrefId: string;
  PreferenceCodeType: string;
  PreferenceDetails: string;
  IsPrimaryInterpreterRequired: string;
  Comments: string;
  FromDate: DateTime;
  ToDate: DateTime;
  PreferredCommunicationLanguage: string;
  PrimaryLanguage: string;
  OtherLanguage: string;
  DialectSupported: string;
  ScopeType: string;
  ScopeValue: string;
  ScopeIdentifyingOID: string;
  sMsgChk: boolean;
  Status: string;
  TempID: number;
  PreferenceOID: string;
  PatientOID: string;
  IsCombo: string;
  PREDTCode: string;
  CreatedAt: DateTime;
  Actionable: string;
  GenUpdate: string;
  sPDSValue: string;
  sLorValue: string;
    PDSUpdateStatus: byte;
  IsPDSSelect: string;
  IsPDSchecked: boolean;
  IsHistorical: boolean;
  IsUIHistoric: boolean;
  IsMatch: string;
  ActiveTo: DateTime;
  ActiveFrom: DateTime;
  IsReqFromOtherWP: boolean;
  IsInterpreterReqDeclined: boolean;
}
export class PatientStatus extends CLZOObject {
  SuspendMode: string;
  StatusIdentifier: string;
  StatusTypeCode: string;
  StatusValueCode: string;
  Comments: string;
  OwnerOrganisationOID: string;
  sMsgChk: boolean;
  bIsMHAASection: boolean;
  PatientOID: string;
  ActiveFrom: DateTime;
  ActiveTo: DateTime;
  CreatedAt: DateTime;
  MHAASectionOID: string;
  ParentMHAASectionOID: string;
  PatientStatusHO: string;
  IdentifyingType: string;
  IdentifyingOID: string;
}
export class PatientEducation extends CLZOObject {
  EducationIdentifier: string;
  EducationType: string;
  OrganizationOid: number;
  ActiveFrom: DateTime;
  ActiveTo: DateTime;
  Comments: string;
  Estname: string;
  Estaddress: string;
  EstPhno: string;
  EduCode: string;
  OwnerOrganisationOID: string;
  SuspendMode: string;
  PatientIdentifier: string;
  CreatedAt: DateTime;
  objHealthOrganisationDetail: HealthOrganisationDetail;
  IsRestrictedData: boolean;
}
export class PatientEmployer extends CLZOObject {
  EmployerIdentifier: string;
  PatientIdentifier: string;
  SuspendMode: string;
  OccupationStatus: string;
  Occupation: string;
  OccupationType: string;
  EmployerAddress: string;
  Comments: string;
  OwnerOrganisationOID: string;
  EmployerName: string;
  ActiveFrom: DateTime;
  CreatedAt: DateTime;
  ActiveTo: DateTime;
  ReportedDTTM: DateTime;
  IsRestrictedData: boolean;
}
export class PatientInsurance extends CLZOObject {
  InsuranceIdentifier: string;
  PatientIdentifier: string;
  PurchaserOid: number;
  InsuranceDetails: string;
  PolicyOid: number;
  LevelOfCover: string;
  PolicyNumber: string;
  InstitutionNumber: string;
  IdentificationNumber: string;
  sInsuranceOID: string;
  Comments: string;
  OrganisationOID: number;
  InsuranceType: string;
  InsuranceClass: string;
  sPolicyHolder: string;
  OwnerOrganisationOID: string;
  SuspendMode: string;
  InsuranceName: string;
  ActiveFrom: DateTime;
  ActiveTo: DateTime;
  CreatedAt: DateTime;
  sMsgChk: string;
  PurchaserTypeCode: string;
}
export class PatientBasedRegistration extends CLZOObject {
  SourcePatientID: string;
  BirthType: string;
  BirthCategory: string;
  NewPatient: ObservableCollection<ClonePatient>;
}
export class ClonePatient extends CLZOObject {
  RecordNumber: number;
  Surname: string;
  Forename: string;
  MiddleName: string;
  Sex: string;
  BirthDttm: DateTime;
  ApproxBirthReason: string;
  MotherChildRelationship: string;
  ChildMotherRelationship: string;
  RelationshipStartDttm: DateTime;
  CopyDetails: CopyDetails;
  NYSIISForename: string;
  NYSIISSurname: string;
  IsDeceased: boolean;
  StillBirthDet: PatientDeceased;
  RegistrationDTTM: DateTime;
  Title: string;
  MultipleBirth: string;
  bIsMotherChildNOK: boolean;
  PatientPersonalCarerOID: string;
  PersonalCarerOID: string;
}
export class CopyDetails {
  bIsUsualGP: boolean;
  bIsSurname: boolean;
  bIsReligion: boolean;
  bIsEthencity: boolean;
  bIsLanguage: boolean;
  bIsCurrentGP: boolean;
  bIsHomeAddress: boolean;
  bIsHomePhone: boolean;
  bIsOVS: boolean;
  bIsProfCarer: boolean;
  bIsEthnOrigin: boolean;
  bIsCounofBirth: boolean;
  bIsinsurance: boolean;
  bPreIsLanguage: boolean;
}
export class PatientDeceased extends CLZOObject {
  PatientDeceasedOID: string;
  PatientOID: string;
  DeathDttm: DateTime;
  PlaceOfDeath: string;
  DeathReason: string;
  NotifiedBy: string;
  NotifiedDttm: DateTime;
  NotifierOID: string;
  NotifierDetails: string;
  Confirmed: boolean;
  Comments: string;
  ConfirmComments: string;
  IsDeathEstimated: boolean;
  ApproximateReason: string;
  IsStillBirth: boolean;
  IsCancel: boolean;
  IsOverNightProcessCompleted: boolean;
  ConfirmDTTM: DateTime;
    PDSUpdateStatus: byte;
  CanDecReason: string;
  CanDecCancelledBy: string;
  CoronerInformed: string;
  PostMortemIndicated: string;
  ActionDate: DateTime;
  Action: string;
  PrevConfirmed: boolean;
  UserName: string;
  UserOID: string;
  OrganizationName: string;
  OrganizationOID: number;
  GpInformed: string;
  Peadiatrics: string;
  OthersInformed: string;
  ApproxiDTTM: DateTime;
  bModifyDeceased: boolean;
  ReasonForDifference: string;
  PreferredPlaceOfDeath: string;
  IsTraced: string;
  IsModifyMode: boolean;
  IsChkDeathMode: boolean;
  CreatedAt: DateTime;
  CreatedBy: number;
  OrganisationOID: string;
  IsBSD: boolean;
  BSDFormOID: string;
  CallingCA: string;
  IsFromPDSSync: boolean;
  Contract: ContractActivity;
  GenUpdate: string;
  IsPDSSelect: string;
  sSensitive: string;
  Cancellation: ObservableCollection<DeceasedCancellation>;
}
export class DeceasedCancellation {
  OID: string;
  PatientDeceasedOID: string;
  Reason: string;
  CancelDttm: DateTime;
  CancelledBy: string;
  Comments: string;
  DeathNotification: string;
}
export class PatientConsent extends CLZOObject {
  ConsentIdentifier: string;
  ActiveFrom: DateTime;
  ActiveTo: DateTime;
  LZOEnddt: DateTime;
  Comments: string;
  OrganisationOID: string;
  OrganisationName: string;
  bTriggerStore: boolean;
  PDSComments: string;
  Surname: string;
  Forename: string;
  Identifier: string;
  FormattedFromDate: string;
  FormattedToDate: string;
  bIsSilentSync: boolean;
  PatientOID: string;
  GenUpdate: string;
  ConsentType: string;
  OldConsentOID: string;
  ConsentValue: string;
  UserOid: string;
    PDSUpdateStatus: byte;
  EnteredByOID: string;
  IsPDSchecked: boolean;
  sPDSValue: string;
  IsFuture: boolean;
  sLORValue: string;
  IsMatch: string;
}
export class PatientIdentityBand extends CLZOObject {
  PIBStandard: string;
  PIBBaby: string;
}
export class BloodSpotCardLabel extends CLZOObject {
  lnPatientOID: number;
  BarCodedNHSNumber: string;
  NHSNumber: string;
  Name: string;
  BirthDTTM: DateTime;
  Sex: string;
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
  Postcode: string;
  Ethnicity: string;
  GPName: string;
  GPPracticeCode: string;
  lnCurrentGPOID: number;
  IsYSensitive: boolean;
  IsYSCSensitive: boolean;
  lnMotherPatientOID: number;
  MotherName: string;
  MotherBirthDTTM: DateTime;
  MotherNHSNumber: string;
  BirthWeight: string;
  Rank: string;
  GestationLength: string;
  DeliveryLocationName: string;
}
export class SharedCarer extends CLZOObject {
  EncounterOID: string;
  SharedCarerOID: string;
  CareproviderOID: string;
  CareproviderName: string;
  StartDTTM: DateTime;
  EndDTTM: DateTime;
  PrimeFLAG: string;
  RoleOID: number;
  SpecialityOID: number;
  SpecialityName: string;
  comments: string;
  RoleName: string;
  SharedRoleprofileoid: number;
  LastActualDischDTTM: DateTime;
}
export class LocationAttribute extends CLZOObject {
  LocationAttributeCode: string;
  LocationEventOID: number;
  BoarderEventOID: number;
  LocationAttributeOID: number;
}
export class DietaryRequirements extends CLZOObject {
  DietaryRequirementCode: string;
  DietaryRequirementsOID: number;
  AdmissionOID: number;
}
export class BoarderDetails extends CLZOObject {
  BoarderOID: number;
  BoarderName: string;
  BoarderStatus: string;
  PersonelCarerOID: number;
  IsCheckedIn: boolean;
  Reason: string;
  AccomodationFromDttm: DateTime;
  AccomodationToDttm: DateTime;
  CPMBookingOID: number;
  AccommodationTypeCode: string;
  Accommodation: string;
  RelationshipCode: string;
  Relationship: string;
  WardOID: number;
  WardName: string;
  LocationName: string;
  LocationOID: number;
  LocationAttribute: string;
  LocationAttributeVal: string;
  Comments: string;
  ExpectedLengthOfStay: string;
  IsBoarderChargesApplicable: boolean;
  AuthorisedByOID: number;
  AuthorisedBy: string;
  CPMScheduleOID: number;
  EncounterOID: number;
  BoarderEventOID: number;
  PatientBookingOID: number;
  CurrWard: number;
  bBoarder: boolean;
  CPMEntityOID: number;
  CategoryCode: string;
  ChildPatientOID: number;
  ChildEncounterOID: number;
  oBookingLocations: ObservableCollection<BookingLocation>;
}
export class BookingLocation extends CLZOObject {
  LocationName: string;
  LocationType: string;
  LocationPostion: string;
  LocationSpecialty: string;
  LocationTreatmentFunction: string;
  LocationFeature: string;
  LocationAttribute: string;
  Quantity: number;
  SessionStartTime: DateTime;
  SessionEndTime: DateTime;
}
export class OPAppointments extends CLZOObject {
  CareproviderName: string;
  CareproviderOID: number;
  Specialty: string;
  AppointmentDate: DateTime;
  Location: string;
  AppointmentStartTime: string;
  AppointmentEndTime: string;
}
export class DiscardedBookings extends CLZOObject {
  DiscrdBookingOID: number;
  DiscrdEnounterOID: number;
}
export class Coding extends CLZOObject {
  PatientName: string;
  CodeLengthErrorCode: number;
  CodingOID: string;
  IsPrimary: string;
  IsAuthorised: string;
  IsCancelled: string;
  CancelledDTTM: DateTime;
  SchemeName: string;
  SchemeVersion: string;
  ConceptCode: string;
  ConceptName: string;
  Category: string;
  Description: string;
  AddlDescription: string;
  Location: string;
  CodedOn: DateTime;
  CodedUserName: string;
  CodedUserID: number;
  Status: string;
  AuthorisedComments: string;
  ReportGrouping: string;
  ParingStatus: string;
  PariedTo: string;
  LastModifiedBy: string;
  UpdateReason: string;
  EntityStatus: string;
  PatientPASID: string;
  PatientOID: number;
  PatientSEXXXCode: string;
  PatientBirthDTTM: DateTime;
  EntityCareProviderName: string;
  EntitySpecialtyName: string;
  EntityTreatmentFnName: string;
  EntityCareServiceName: string;
  EntityID: string;
  EntityType: string;
  EntityStartDate: DateTime;
  EntityEndDate: DateTime;
  ProcedureDate: DateTime;
  DGVPValue: string;
  AverageLOS: string;
  LowTrimPoint: string;
  HighTrimPoint: string;
  CostWeight: string;
  CodingSchemeOID: number;
  TermText: number;
  Warning: string;
  CodOrGrpType: string;
  CancellationReason: string;
  CancelledByUserName: string;
  CodingStatus: string;
  SchemeWithVersion: string;
  DAIndicationChar: string;
  IsDGVP: string;
  CGRCACode: string;
  sConceptCodeOID: string;
  sCodePropertyName: string;
  sCodePropertyValue: string;
  GridRowStatus: string;
  nDisplayOrder: number;
  AuthorisedByOID: number;
  CancelledByUserOID: number;
  LastModifiedByUserOID: number;
  IdentifyingOID: number;
  IdentifyingType: string;
  Entity: string;
  CodingSource: string;
  AssignedForDate: DateTime;
  CodingTargetDate: DateTime;
  oCodedBy: dpUser;
  MechanicalVentilation: string;
  NeonatalCare: string;
  AdmissionWeight: string;
  TheatreVisitNumber: string;
  SchemeWithVersionForDisplay: string;
  ActivityDuration: string;
  PreviousValue: string;
  IsMultiplePatient: boolean;
  Comments: string;
  CareProvider: dpUser;
  AssignedBy: dpUser;
  AssignedTo: dpUser;
  AuthorizedBy: dpUser;
  IsConfirmed: string;
  CodedbyUsers: dpUser;
}
export class Discharge extends CLZOObject {
  OrganisationName: string;
  DischargeEventOID: string;
  EncounterOID: string;
  DischargeStatus: string;
  MedicalDischargeDttm: DateTime;
  DischargeDttm: DateTime;
  ExpectedDischargeDttm: DateTime;
  IntentionToReadmit: string;
  ReadmitWithin: number;
  ReadmitDays: string;
  Destination: string;
  DestinationAddress: string;
  TransportMode: string;
  DelayedReason: string;
  Delayeddischargeatt: string;
  ResLocalAuthOrgOID: string;
  ResLocalAuthOrgName: string;
  DesAddressPostalCode: string;
  Comments: string;
  MedicalDischargeComments: string;
  IsMedicallyDischarged: boolean;
  CareProviderOId: string;
  CareProvider: string;
  IsCancelled: boolean;
  DischargedIn: string;
  DischargedInCode: string;
  DischargedType: string;
  PatientOId: string;
  BookingOID: string;
  PersonalCarerName: string;
  PersonalCarerWardName: string;
  AdmissionDateTime: DateTime;
  IsDelayedDischarge: boolean;
  NurseInchargeOID: string;
  DateofCreation: DateTime;
  TempAddress: string;
  OutComeForIntray: string;
  LastModifiedAtforCPMB: DateTime;
  LocationOID: string;
  LocationName: string;
  APEOID: string;
  APEStatus: string;
  IsAdvancedAPE: boolean;
  CloseAPE: boolean;
  CanCloseAPE: boolean;
  CreateAPE: boolean;
  NotifyUserOID: string;
  CloseCCP: boolean;
  CCPOID: number;
  IntendedRTTStatus: string;
  sPatientClassification: string;
  WardOID: string;
  WardName: string;
  strBusBhvr: string;
  DischargeOutcome: string;
  ActualStatus: string;
  PatIPOID: string;
  RFRecievedDTTM: DateTime;
  ADMTCPOID: string;
  EpisodeOID: number;
  ReferralOID: number;
  RTTIsActive: string;
  PreviousRTTActive: string;
  RTTMonitoring: string;
  AWOLStatus: string;
  MaxWaitTime: number;
  APECancelledBy: string;
  Editchanged: string;
  DeferredReason: string;
  EditActualDischargeDTTM: DateTime;
  Sessionblockenddttm: DateTime;
  IsInsertMedDisc: boolean;
  IsPatientDischarged: boolean;
  iSHospAtHomeSrv: boolean;
  IsRetroEvent: boolean;
  ActualEventDttm: DateTime;
  TypeOfDischarge: string;
  QuickDischargeDTTM: DateTime;
  IBMsgPatientleaveReturnDone: boolean;
  isLeaveDischarge: boolean;
  sEventOID: string;
  IsQuickDisFromMedDis: boolean;
  MedicalDischargeEndDTTM: DateTime;
  MDEndReason: string;
  IsAlreadyMedDisEnddated: boolean;
  TempBedDetails: IPBookedTempLocation;
  IsDischargedFromExternal: boolean;
  oRTTACT: RTTActivity;
  RequestDetails: ObservableCollection<PatEncounterRequest>;
  oHistoryList: ObservableCollection<HistoryList>;
  codinggrp: ObservableCollection<CodingDetail>;
  Outcomes: ObservableCollection<DischargeOutcome>;
}
export class RequestSetInvestigation extends CLZOObject {
  SetInstanceOID: string;
  SetOID: number;
  SetName: string;
  SetType: string;
  SetStatus: string;
  SetRefNo: string;
  PrimaryItemName: string;
  IsEncounterPrimary: string;
  oRequestItems: ObservableCollection<RequestItems>;
  oWarnings: ObservableCollection<Warnings>;
}
export class PatEncounterRequest extends RequestSetInvestigation {
  PatientOID: string;
  EncounterOID: string;
  RequestOID: string;
  RequestDetailOID: string;
  RequestItemOID: number;
  RequestItemName: string;
  RequestStatus: string;
  RequestPerformDTTM: DateTime;
  Reason: string;
  IsSetLevelChange: string;
}
export class RequestItems extends CLZOObject {
  RequestDetailOID: string;
  InstanceType: string;
  InstanceOID: string;
  RequestItemName: string;
  RequestItemOID: number;
  RequestItemStatus: string;
  RequestPerformedDate: DateTime;
  DeselectionReason: string;
  DateRange: string;
  WarningFlag: string;
  EncounterOID: string;
}
export class Warnings extends CLZOObject {
  WarningID: string;
  RequestItemName: string;
  Reason: string;
  IsSet: string;
  Warning: string;
  WarningType: string;
  Severity: string;
  AcknowledgeComments: string;
  AcknowledgeWarnings: RequestAcknowledge;
  RequestItemOID: string;
  CriteriaOID: string;
  AckDateTime: DateTime;
  IsPlaced: string;
}
export class RequestAcknowledge extends CLZOObject {
  AckUserID: string;
  AckUserName: string;
  AckDttm: string;
}
export class HistoryList extends CLZOObject {
  ColumnName: string;
  FromValue: string;
  ToValue: string;
}
export class CodingDetail {
  oEntity: Entity;
  oEntityDetails: EntityDetails;
  MenuCode: string;
  oCoding: ObservableCollection<Coding>;
}
export class Entity extends CLZOObject {
  EncounterStartDTTM: DateTime;
  EncounterEndDTTM: DateTime;
  IsRecodeAdded: boolean;
  CodingMasterOID: string;
  EntityOID: string;
  PatientOID: string;
  PatientID: string;
  PatientName: string;
  EntityType: string;
  EntityID: string;
  CodedOn: DateTime;
  CodedUserName: string;
  CodedUserID: number;
  StartDate: DateTime;
  EndDate: DateTime;
  Status: string;
  AssignedByOID: number;
  AssignedBy: string;
  AssignedToOID: number;
  AssignedTo: string;
  AssignedForDttm: DateTime;
  EntityTargetDttm: DateTime;
  CareproviderOID: number;
  CareproviderName: string;
  SpecialtyOID: number;
  SpecialtyName: string;
  TreatmentFunctionOID: number;
  TreatmentFunctionName: string;
  CareserviceOID: number;
  CareserviceName: string;
  CareServicePointOID: number;
  CareServicePointName: string;
  EncounterDetails: string;
  RecordCnt: number;
  AdmissionWeight: string;
  MechanicalVentilation: string;
  CodingSource: string;
  TheatreVisits: number;
  NeonatalCareLevel: string;
  EncounterOID: string;
  HOID: string;
  servicepoint: string;
  CACode: string;
  PatIdentifier1: string;
  PatIdentifier2: string;
  PrimDiagCode: string;
  PrimProcCode: string;
  PrimGroupCode: string;
  VolumeID: string;
  CurCasenoteLoc: string;
  IsCriticalCare: string;
  IsGrouperSent: string;
  OnbehalfOf: string;
  EntityTypeFlag: string;
  SpellCode: string;
  AuthorisedBy: string;
  CodedByOID: number;
  AuthorisedByOID: number;
  IsSensitive: string;
  sPatientSurname: string;
  sPatientForename: string;
  sPatientGender: string;
  GroupCode: string;
  GroupCodeSchemeVersion: string;
  GroupDGVP: string;
  GroupPBC: string;
  GroupSSC: string;
  GroupUnbundledHRG: string;
  DomainCode: string;
  oGroupResult: ObservableCollection<GroupResult>;
}
export class EntityDetails extends CLZOObject {
  AdmissionDateTime: DateTime;
  AdmissionSource: string;
  AdmissionType: string;
  ManagementIntention: string;
  EntityStartDateTime: DateTime;
  EntityEndDateTime: DateTime;
  DischargeDateTime: DateTime;
  DischargeType: string;
  TotalLeaveDays: string;
  TotalStayLength: string;
  Ward: string;
  CriticalCareDays: string;
  CareProvider: string;
  Speciality: string;
  TreatmentFunction: string;
  GroupCode: string;
  PBC: string;
  ExcessBedDays: string;
  SSC: string;
  SSCVersion: string;
  UnbundledHRGs: string;
  DGVPValue: string;
  AverageLOS: string;
  LowTrimPoint: string;
  HighTrimPoint: string;
  CostWeight: string;
  ServicePoint: string;
  Priority: string;
  Outcome: string;
  AppointmentType: string;
  Location: string;
  SchemeVersion: string;
  AppointmentDateTime: DateTime;
  ArrivalDateTime: DateTime;
  PresentingComplaint: string;
  ArrivalMode: string;
  PatientGroup: string;
  TreatmentCompletedOn: DateTime;
  AuthorisedBy: string;
  DisposalDateTime: DateTime;
  DisposalReason: string;
  DisposedBy: string;
  Destination: string;
  Eventtype: string;
}
export class IPBookedTempLocation extends CLZOObject {
  TriggerPoint: string;
  BookingOID: number;
  CapacityOID: number;
  CPMTYCode: string;
  LatestEndDTTM: DateTime;
  PreviousEndDTTM: DateTime;
  CanExtendTempBed: boolean;
  BedReleased: string;
  PatientOID: number;
  EncounterOID: number;
  ServiceOID: number;
  CanRevertChanges: boolean;
}
export class DischargeOutcome extends CLZOObject {
  OutcomeDetailsOID: string;
  EncounterOId: string;
  PatientOId: string;
  Outcome: string;
  DischgReasonInternal: string;
  DischgReasonExternal: string;
  DDATRCode: string;
  DDRSNFromDTTM: DateTime;
  DDRSNToDTTM: DateTime;
  IsPrimary: string;
  ResLocalAuthOrgOID: number;
  ResLocalAuthOrgName: string;
}
export class ReferredByArtefacts extends CLZOObject {
  ReferredBySource: string;
  RefByCareProviderOID: number;
  RefByTeamOID: number;
  RefBySpecialityOID: number;
  RefByTreatmentFunctionOID: number;
  RefByOrganisationOID: number;
  OnBehalfOfUserOId: number;
  RefByCareProviderName: string;
  RefByTeamName: string;
  RefBySpecialityName: string;
  RefByTreatmentFunctionName: string;
  RefByOrganisationName: string;
  RefByOrgTyp: string;
  OnBehalfOfUserName: string;
  RefByServiceDefinitionOId: number;
  RefByServiceDefinitionName: string;
  RefByCareServiceOId: number;
  RefByCareServiceName: string;
}
export class Referrals extends ReferredByArtefacts {
  OId: number;
  LockingDTTM: DateTime;
  EncounterOId: number;
  PatientOId: number;
  MergPatientOId: number;
  PatientName: string;
  ServiceType: string;
  ServiceTypeText: string;
  Comments: string;
  LastComments: string;
  ID: string;
  Type: string;
  TypeText: string;
  Priority: string;
  PriorityText: string;
  SuspectedCancerSite: string;
  SuspectedCancerSiteText: string;
  AdminCategory: string;
  AdminCategoryText: string;
  Source: string;
  SourceText: string;
  RSNFOROUTOFREF: string;
  CreatedDTTM: DateTime;
  CRDTTM: DateTime;
  ReceivedDTTM: DateTime;
  RecordedDTTM: DateTime;
  Action: string;
  Media: string;
  MediaText: string;
  EscalationPolicyOId: number;
  EscalationPolicyName: string;
  VerificationPolicyOId: number;
  VerificationPolicyName: string;
  Status: string;
  StatusText: string;
  ManageStatusAPI: string;
  RequestedStatus: string;
  AllocatedStatus: string;
  IsAllocated: string;
  IsCAB: string;
  HasScanDoc: string;
  LinkedReferralOId: number;
  LinkedEpisodeOId: number;
  LinkedReferralDetails: string;
  PathWayType: string;
  PathWayTypeText: string;
  PathWayID: string;
  IsPathWayChanged: boolean;
  IsAccRefRecieveDTTMChanged: boolean;
  IsAccRefReferredtoDetChanged: boolean;
  UBRN: string;
  ReferredToType: string;
  ReferredToTypeText: string;
  ServiceDefinitionOId: number;
  CilnicalNoteOId: number;
  RequestCilnicalNoteOId: number;
  EpisodeOId: number;
  PrevEpisodeOId: number;
  EpisodeName: string;
  IsRefPart: boolean;
  IsRTTModified: boolean;
  EpisodeID: string;
  IsRefForward: number;
  EpisodeStatus: string;
  PPIOId: number;
  FormOId: number;
  FormName: string;
  ForwardedDTTM: DateTime;
  RefToOrganisationOId: number;
  RefToOrganisationName: string;
  RoleProfileOid: number;
  RoleProfileCode: string;
  ReferralReason: string;
  OrgMainIdentifier: string;
  RTTOID: number;
  RFRTTStartDate: DateTime;
  RFRTTIntendedStatus: string;
  RFRTTActualStatus: string;
  AcceptingPriority: string;
  Outcome: string;
  EXTSYCode: string;
  CreatedBY: string;
  ModifiedBy: string;
  CreatedByUserOID: number;
  ModifiedByUserOID: number;
  EpisodeStartDTTM: DateTime;
  PreviousStatus: string;
  IsCABModify: string;
  IncOnBehlfOf: string;
  IsRefByCPPatGP: boolean;
  oRFHL7MsgObjectDetails: RFHL7MsgObjectDetails;
  REFSPECOIDS: string;
  FilterOIds: string;
  RefDateTimeDisp: boolean;
  IsLinked: string;
  CommunityServiceType: string;
  ClosureDate: DateTime;
  ClosureReason: string;
  IsCABREFbyGPModified: string;
  IsCABRebookEpisodeChanged: boolean;
  IsCABRebookRTTChanged: boolean;
  IsCABRebookGlobalRTTChanged: boolean;
  RAPCLType: string;
  RAPCLSubType: string;
  RAPCMStatus: string;
  IsFromCA: string;
  oRefPrbdtls: ReferralPrbdtls;
  RefPrbReason: string;
  PrvPrbRSNCode: string;
  IsRTTMonitor: boolean;
  IsRTTActive: boolean;
  MaxWaitTime: number;
  MaxWaitTimeUOM: string;
  MaxWaitTimeDesc: string;
  ActivityType: string;
  ActivityDate: DateTime;
  EpisodePatientOID: number;
  bDASReferral: boolean;
  isMatRecordsExists: boolean;
  IsFromRestAPI: boolean;
  PASID: string;
  PrimaryPatientPASID: string;
  oRAGIndicator: ObservableCollection<RAGIndicator>;
}
export class RFHL7MsgObjectDetails extends CLZOObject {
  IsinboundmessageTrigger: boolean;
  AlternateEpisodeID: string;
  ReferredByOID: number;
  ReferredToOID: number;
}
export class RAGIndicator {
  FromValue: number;
  Tovalue: number;
  Type: string;
  UOM: string;
}
export class ReferralPrbdtls extends CLZOObject {
  PatientOID: number;
  ReferralOID: number;
  EpisodeOID: number;
  PrevEpisodeOId: number;
  ProblemOID: number;
  ProblemDTTM: DateTime;
  RefPrbReason: string;
  CDTYPCode: string;
  Code: string;
  Version: string;
  TermID: string;
  ProblemType: string;
  IsStrikePrbAssociation: boolean;
}
export class ChartTreatmentFunction extends CLZOObject {
  TreatmentFnOID: number;
  TreatmentFnName: string;
}
export class PagingDynamicSQL {
  PageSize: number;
  PageIndex: number;
  PageCount: number;
  RecFrm: number;
  RecTo: number;
  FindPageCount: boolean;
  ChildPagination: boolean;
  FilterBy: Filter;
  GroupBy: Group;
  FilterByColumn: string;
  SortingColumns: string;
  FilterByXML: string;
  SPSortingColumns: string;
  CustomFilterXML: string;
  SelectedDate: DateTime;
}
export class Filter {
  Type: FilterByType;
  ListMetaphoreOID: number;
  Serialize: string;
}
export enum FilterByType {
  None,
  XML,
  ListMetaphoreID,
}
export class Group {
  Type: GroupByType;
  ColumnName: string;
  ParentValue: string;
  Text: string;
  Serialize: string;
}
export enum GroupByType {
  None,
  Grouped,
  Expanded,
}
export class CResMsgGetEpisodesPaging {
  CurrentPageElement: PagingDynamicSQL;
  TotalRecCount: number;
  oContextInformation: CContextInformation;
  oEpisode: ObservableCollection<Episode>;
}
export class CReqMsgGetEncountersPaging {
  objEncounterBC: Encounter;
  pElementBC: PagingDynamicSQL;
  oContextInformation: CContextInformation;
}
export class CResMsgGetEncountersPaging {
  CurrentPageElement: PagingDynamicSQL;
  TotalRecCount: number;
  oContextInformation: CContextInformation;
  oEncounter: ObservableCollection<Encounter>;
}
export class CReqMsgGetCareEventsPaging {
  oCEventBC: SearchCareEvent;
  pElementBC: PagingDynamicSQL;
  oContextInformation: CContextInformation;
}
export class CResMsgGetCareEventsPaging {
  oCareEventItem: CareEventItem;
  TotalRecCount: number;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetEncountersForDMWPatient {
  objEncounterBC: Encounter;
  oContextInformation: CContextInformation;
}
export class CResMsgGetEncountersForDMWPatient {
  oContextInformation: CContextInformation;
  oEncounter: ObservableCollection<Encounter>;
}
export class CReqMsgGetEpisodeDetailsForEnc {
  PatientOIDBC: number;
  EncounterOIDBC: number;
  oContextInformation: CContextInformation;
}
export class CResMsgGetEpisodeDetailsForEnc {
  EpisodeOID: number;
  EpisodeStatus: string;
  ReferralType: string;
  RefToSpecOID: number;
  RefToSpecName: string;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetEpisode {
  objEpisodeBC: Episode;
  pElementBC: PageElement;
  oContextInformation: CContextInformation;
}
export class PageElement {
  PageSize: number;
  FirstElement: PageRowElement;
  LastElement: PageRowElement;
  PageIndex: number;
  RecordCount: number;
  CurrentFilterByID: number;
  CurrentPageOperation: PageOperation;
  CurrentFilterBy: FilterBy;
  SeperatorIDFieldName: string;
  SeperatorDTTMFieldName: string;
  SeperatorIDFieldNameOrdinal: number;
  SeperatorDTTMFieldNameOrdinal: number;
  CanReadDttm: boolean;
  GroupByColumn: string;
  GroupByText: string;
  Separator: SeparatorType;
  ReverseResult: boolean;
}
export class PageRowElement {
  SeperatorString: string;
  SeparatorID: number;
  SeparatorDTTM: DateTime;
}
export enum PageOperation {
  SinglePage,
  FirstPage,
  NextPage,
  PreivousPage,
  LastPage,
}
export enum FilterBy {
  ListMetaphoreID,
  XML,
  None,
}
export enum SeparatorType {
  StringID,
  GuidWithDateTime,
  Int64WithDateTime,
  Int64,
}
export class CResMsgGetEpisode {
  CurrentPageElement: PageElement;
  oContextInformation: CContextInformation;
  oEpisode: ObservableCollection<Episode>;
}
export class CReqMsgGetPatEpisodePathwayDetails {
  PatientOIDBC: number;
  bIsMergedBC: boolean;
  oContextInformation: CContextInformation;
}
export class CResMsgGetPatEpisodePathwayDetails {
  oContextInformation: CContextInformation;
  oEpisode: ObservableCollection<Episode>;
}
export class CReqMsgGetEncountersForPatient {
  objEncounterBC: Encounter;
  pElementBC: PageElement;
  oContextInformation: CContextInformation;
}
export class CResMsgGetEncountersForPatient {
  CurrentPageElement: PageElement;
  oContextInformation: CContextInformation;
  oEncounter: ObservableCollection<Encounter>;
}
export class CReqMsgGetEncountersForEpisode {
  objEncounterBC: Encounter;
  oContextInformation: CContextInformation;
}
export class CResMsgGetEncountersForEpisode {
  oContextInformation: CContextInformation;
  oEncounter: ObservableCollection<Encounter>;
}
export class CReqMsgGetEncounter {
  objEncounterBC: Encounter;
  oContextInformation: CContextInformation;
}
export class CResMsgGetEncounter {
  oContextInformation: CContextInformation;
  oEncounter: ObservableCollection<Encounter>;
}
export class CReqMsgGetEncounterForCareEvents {
  objEncounterBC: Encounter;
  oContextInformation: CContextInformation;
}
export class CResMsgGetEncounterForCareEvents {
  oContextInformation: CContextInformation;
  oEncounter: ObservableCollection<Encounter>;
}
export class CReqMsgGetSealEncounter {
  objEncounterBC: Encounter;
  oContextInformation: CContextInformation;
}
export class CResMsgGetSealEncounter {
  oContextInformation: CContextInformation;
  oEncounter: ObservableCollection<Encounter>;
}
export class CReqMsgGetEncounterHOForPatient {
  sPatientOIdBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetEncounterHOForPatient {
  oContextInformation: CContextInformation;
  oEncounter: ObservableCollection<Encounter>;
}
export class CReqMsgCheckEncExist {
  objEncounterBC: EncounterBase;
  oContextInformation: CContextInformation;
}
export class CResMsgCheckEncExist {
  IsExists: boolean;
  oContextInformation: CContextInformation;
}
export class CReqMsgCheckCABExist {
  PatientOIDBC: number;
  EncounterOIDBC: number;
  oContextInformation: CContextInformation;
}
export class CResMsgCheckCABExist {
  IsExists: boolean;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetCareEvenForEnc {
  sEncounterOIDBC: string;
  PatientOIDBC: number;
  sEncounterTypeBC: string;
  SealRecordListBC: string;
  SealImageListBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetCareEvenForEnc {
  objEvents: CareEventItem;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetCareEventsForPatient {
  PatientOIDBC: string;
  SealRecordListBC: string;
  SealImageListBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetCareEventsForPatient {
  oCareEventItem: CareEventItem;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetCareEventsForPatientbyEventOID {
  PatientOIDBC: string;
  sEventOIDBC: string;
  sEventtypeBC: string;
  SealRecordListBC: string;
  SealImageListBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetCareEventsForPatientbyEventOID {
  oCareEventItem: CareEventItem;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetCareEvents {
  IdentifyingOIDBC: string;
  IdentifiyingTypeBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetCareEvents {
  objResult: CareEventsDetails;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetCareEventsDetail {
  IdentifyingOIDBC: string;
  IdentifiyingTypeBC: string;
  patientOIDBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetCareEventsDetail {
  objResult: CareEventsDetails;
  oContextInformation: CContextInformation;
}
export class CReqMsgEpisodeSearchFilter {
  objEpisodeBC: Episode;
  sENTYPCodeBC: string;
  sDateQualifierBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgEpisodeSearchFilter {
  oContextInformation: CContextInformation;
  oEpisode: ObservableCollection<Episode>;
}
export class CReqMsgEncounterSearchFilter {
  objEncounterBC: Encounter;
  sEpisodeNameBC: string;
  sDateQualifierBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgEncounterSearchFilter {
  oContextInformation: CContextInformation;
  oEncounter: ObservableCollection<Encounter>;
}
export class CReqMsgEventSearchFilter {
  sCREVTCodeBC: string;
  sENTYPCodeBC: string;
  sPatientOIDBC: string;
  CreatedDttmBC: DateTime;
  ClosureDttmBC: DateTime;
  sDateQualifierBC: string;
  TheatreDUConfigBC: boolean;
  oContextInformation: CContextInformation;
}
export class CResMsgEventSearchFilter {
  oCareEventItem: CareEventItem;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetInPatientAMBST {
  sEncounterIDBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetInPatientAMBST {
  sPatientAppointmentIPOID: string;
  sAmbulatoryStatus: string;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetOutPatientAMBST {
  sEncounterIDBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetOutPatientAMBST {
  sPatientAppointmentOID: string;
  sAmbulatoryStatus: string;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetAdmission {
  sEncounterOIDBC: string;
  sPatientOIDBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetAdmission {
  oAdmissionView: Admission;
  oContextInformation: CContextInformation;
}
export class CReqMsgRetrieveDischarge {
  EncounterIDBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgRetrieveDischarge {
  oDischarge: Discharge;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetEncounterTypesforPatient {
  objEncounterBC: Encounter;
  oContextInformation: CContextInformation;
}
export class CResMsgGetEncounterTypesforPatient {
  oContextInformation: CContextInformation;
  oEncounter: ObservableCollection<Encounter>;
}
export class CReqMsgGetPatientEncountersforType {
  objEncounterBC: Encounter;
  oContextInformation: CContextInformation;
}
export class CResMsgGetPatientEncountersforType {
  oContextInformation: CContextInformation;
  oEncounter: ObservableCollection<Encounter>;
}
export class CReqMsgGetPatientEncountersforRange {
  objEncounterBC: Encounter;
  oContextInformation: CContextInformation;
}
export class CResMsgGetPatientEncountersforRange {
  oContextInformation: CContextInformation;
  oEncounter: ObservableCollection<Encounter>;
}
export class CReqMsgGetReferralforPatient {
  objEncounterBC: Encounter;
  oContextInformation: CContextInformation;
}
export class CResMsgGetReferralforPatient {
  oContextInformation: CContextInformation;
  oEncounter: ObservableCollection<Encounter>;
}
export class CReqMsgGetPatientEncountersforReferral {
  objEncounterBC: Encounter;
  oContextInformation: CContextInformation;
}
export class CResMsgGetPatientEncountersforReferral {
  oContextInformation: CContextInformation;
  oEncounter: ObservableCollection<Encounter>;
}
export class CReqMsgGetProblemsforPatient {
  objEncounterBC: Encounter;
  oContextInformation: CContextInformation;
}
export class CResMsgGetProblemsforPatient {
  oContextInformation: CContextInformation;
  oEncounter: ObservableCollection<Encounter>;
}
export class CReqMsgGetPatientProblem {
  PatientProblemOIDBC: number;
  oContextInformation: CContextInformation;
}
export class CResMsgGetPatientProblem {
  oEpisode: Episode;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetEpisodesByPatOID {
  PatientOIDBC: number;
  EPISTCodeBC: string;
  IsJITBC: boolean;
  oContextInformation: CContextInformation;
}
export class CResMsgGetEpisodesByPatOID {
  oContextInformation: CContextInformation;
  oEpisode: ObservableCollection<Episode>;
}
export class CReqMsgCheckEncExistForPatient {
  PatientOIDBC: number;
  EncTypeCodeBC: string;
  EncStatusCodeBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgCheckEncExistForPatient {
  encExist: boolean;
  oContextInformation: CContextInformation;
}
export class CReqMsgCheckEncExistCNS {
  PatientOIDBC: number;
  EncounterStatusBC: string;
  EncounterTypeBC: string;
  OrganisationOIDBC: number;
  oContextInformation: CContextInformation;
}
export class CResMsgCheckEncExistCNS {
  EncounterCount: number;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetEpisodesForRefType {
  oReferralsBC: Referrals;
  oContextInformation: CContextInformation;
}
export class CResMsgGetEpisodesForRefType {
  oContextInformation: CContextInformation;
  oEpisode: ObservableCollection<Episode>;
}
export class CReqMsgpGetEncountersForTheatrePatient {
  sPatientOIDBC: string;
  sBookingOIDBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgpGetEncountersForTheatrePatient {
  EncounterOID: number;
  oContextInformation: CContextInformation;
  oEncounter: ObservableCollection<Encounter>;
}
export class CReqMsgGetEpiEncDetailsByPatOID {
  PatientOIDBC: string;
  EncounterOIDBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetEpiEncDetailsByPatOID {
  EncMainIdentifier: string;
  EpisodeStartDTTM: DateTime;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetTrtmntFunDetByPatOID {
  PatientOIDBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetTrtmntFunDetByPatOID {
  oContextInformation: CContextInformation;
  oTreatmentFunction: ObservableCollection<ChartTreatmentFunction>;
}
export class CReqMsgGetPatientEnquiryDetails {
  oPatEnquiryBC: PatientEnquiry;
  oContextInformation: CContextInformation;
}
export class PatientEnquiry {
  PatientOID: number;
  AppointmentType: string;
  Date: DateTime;
  ViewType: string;
}
export class CResMsgGetPatientEnquiryDetails {
  oContextInformation: CContextInformation;
  oPatEnqDetails: ObservableCollection<PatientEnquiryDetails>;
}
export class PatientEnquiryDetails {
  Type: string;
  TypeCode: string;
  StartDTTM: DateTime;
  Status: string;
  MouseOverComments: string;
  StatusText: string;
  Comment: string;
  CareProviderName: string;
  PatientOID: number;
  CareproviderOID: number;
  TeamOID: number;
  TeamName: string;
  SpecialtyOID: number;
  ServiceOID: number;
  LocationOID: number;
  TFOID: number;
  Specialty: string;
  ServiceName: string;
  TFName: string;
  Location: string;
  ReferralOID: number;
  Transportation: string;
  APEGDDTTM: string;
  DNOBDTTM: string;
  PatientDOD: DateTime;
  PatientID: string;
  APEPriority: string;
  APEProfileName: string;
  EventType: string;
  EventDate: string;
  EventMonthYear: string;
  EventDay: string;
  EventTime: string;
  EventCode: string;
  ServiceID: string;
  Outcome: string;
  RecordedBY: string;
  CancelledBy: string;
  RecordedDTTM: string;
  AdmissionDTTM: DateTime;
  EndDTTM: DateTime;
  CanReschedule: boolean;
  CanCancel: boolean;
  BookingOID: number;
  ScheduleOID: number;
  IsAdvancedAPE: boolean;
  HasMore: boolean;
  oAPdetail: APEnquiryDetails;
  oOPdetail: OPEnquiryDetails;
  oIPdetail: IPEnquiryDetails;
  oCNTdetail: ContactEnquiryDetails;
}
export class APEnquiryDetails {
  OFFEROID: number;
  OFFERITEMOID: number;
  APEProfileOID: number;
  APEOfferStatus: string;
  APofferDTTM: DateTime;
  ActualAPStartDTTM: DateTime;
  APEOID: number;
  APETYPE: string;
  APETYPECode: string;
  APESTATUS: string;
  IsAdvancedAPE: boolean;
}
export class OPEnquiryDetails {
  DoNotCancel: boolean;
  BkModifiedDTTM: DateTime;
  UBRN: string;
  BKSTACode: string;
  SlotDuration: number;
  SessionName: string;
  oOPAPdetail: APEnquiryDetails;
}
export class IPEnquiryDetails {
  DoNotCancel: number;
  BkModifiedDTTM: DateTime;
  BKSTACode: string;
  SessionName: string;
  BookingOID: number;
  ScheduleOID: number;
  AdmissionDTTM: DateTime;
  ExpectdischargeDTTM: DateTime;
  DischargeDTTM: DateTime;
  Locationtype: string;
  BedCategory: string;
  oIPAPdetail: APEnquiryDetails;
}
export class ContactEnquiryDetails {
  Purpose: string;
  ContactType: string;
  Category: string;
  Locationtype: string;
  LocationtypeCode: string;
  ScheduleDefinitionOID: number;
  RoleprofileOID: number;
  IsRecurrence: string;
  CONTACTOID: number;
  Reason: string;
  StartTime: number;
  EndTime: number;
  PlannedDate: string;
  SlotDuration: number;
}
export class CReqMsgGetPatientPatAPPSUMRYDetails {
  oPatEnquiryBC: PatientEnquiry;
  oContextInformation: CContextInformation;
}
export class CResMsgGetPatientPatAPPSUMRYDetails {
  sWardName: string;
  oContextInformation: CContextInformation;
  oPatUpcomingEnqDetails: ObservableCollection<PatientEnquiryDetails>;
  oPatPrevEnqDetails: ObservableCollection<PatientEnquiryDetails>;
}


 const prototypeList = {"EncounterWS.GetPatientEncountersforType":CResMsgGetPatientEncountersforType.prototype ,
"EncounterWS.GetPatientEncountersforRange":CResMsgGetPatientEncountersforRange.prototype ,
"EncounterWS.GetReferralforPatient":CResMsgGetReferralforPatient.prototype ,
"EncounterWS.GetPatientEncountersforReferral":CResMsgGetPatientEncountersforReferral.prototype ,
"EncounterWS.GetProblemsforPatient":CResMsgGetProblemsforPatient.prototype ,
"EncounterWS.GetPatientProblem":CResMsgGetPatientProblem.prototype ,
"EncounterWS.GetEpisodesByPatOID":CResMsgGetEpisodesByPatOID.prototype ,
"EncounterWS.CheckEncExistForPatient":CResMsgCheckEncExistForPatient.prototype ,
"EncounterWS.CheckEncExistCNS":CResMsgCheckEncExistCNS.prototype ,
"EncounterWS.GetEpisodesForRefType":CResMsgGetEpisodesForRefType.prototype ,
"EncounterWS.pGetEncountersForTheatrePatient":CResMsgpGetEncountersForTheatrePatient.prototype ,
"EncounterWS.GetEpiEncDetailsByPatOID":CResMsgGetEpiEncDetailsByPatOID.prototype ,
"EncounterWS.GetTrtmntFunDetByPatOID":CResMsgGetTrtmntFunDetByPatOID.prototype ,
"EncounterWS.GetPatientEnquiryDetails":CResMsgGetPatientEnquiryDetails.prototype ,
"EncounterWS.GetPatientPatAPPSUMRYDetails":CResMsgGetPatientPatAPPSUMRYDetails.prototype ,
"EncounterWS.GetEpisodesPaging":CResMsgGetEpisodesPaging.prototype ,
"EncounterWS.GetEncountersPaging":CResMsgGetEncountersPaging.prototype ,
"EncounterWS.GetCareEventsPaging":CResMsgGetCareEventsPaging.prototype ,
"EncounterWS.GetEncountersForDMWPatient":CResMsgGetEncountersForDMWPatient.prototype ,
"EncounterWS.GetEpisodeDetailsForEnc":CResMsgGetEpisodeDetailsForEnc.prototype ,
"EncounterWS.GetEpisode":CResMsgGetEpisode.prototype ,
"EncounterWS.GetPatEpisodePathwayDetails":CResMsgGetPatEpisodePathwayDetails.prototype ,
"EncounterWS.GetEncountersForPatient":CResMsgGetEncountersForPatient.prototype ,
"EncounterWS.GetEncountersForEpisode":CResMsgGetEncountersForEpisode.prototype ,
"EncounterWS.GetEncounter":CResMsgGetEncounter.prototype ,
"EncounterWS.GetEncounterForCareEvents":CResMsgGetEncounterForCareEvents.prototype ,
"EncounterWS.GetSealEncounter":CResMsgGetSealEncounter.prototype ,
"EncounterWS.GetEncounterHOForPatient":CResMsgGetEncounterHOForPatient.prototype ,
"EncounterWS.CheckEncExist":CResMsgCheckEncExist.prototype ,
"EncounterWS.CheckCABExist":CResMsgCheckCABExist.prototype ,
"EncounterWS.GetCareEvenForEnc":CResMsgGetCareEvenForEnc.prototype ,
"EncounterWS.GetCareEventsForPatient":CResMsgGetCareEventsForPatient.prototype ,
"EncounterWS.GetCareEventsForPatientbyEventOID":CResMsgGetCareEventsForPatientbyEventOID.prototype ,
"EncounterWS.GetCareEvents":CResMsgGetCareEvents.prototype ,
"EncounterWS.GetCareEventsDetail":CResMsgGetCareEventsDetail.prototype ,
"EncounterWS.EpisodeSearchFilter":CResMsgEpisodeSearchFilter.prototype ,
"EncounterWS.EncounterSearchFilter":CResMsgEncounterSearchFilter.prototype ,
"EncounterWS.EventSearchFilter":CResMsgEventSearchFilter.prototype ,
"EncounterWS.GetInPatientAMBST":CResMsgGetInPatientAMBST.prototype ,
"EncounterWS.GetOutPatientAMBST":CResMsgGetOutPatientAMBST.prototype ,
"EncounterWS.GetAdmission":CResMsgGetAdmission.prototype ,
"EncounterWS.RetrieveDischarge":CResMsgRetrieveDischarge.prototype ,
"EncounterWS.GetEncounterTypesforPatient":CResMsgGetEncounterTypesforPatient.prototype ,

CReqMsgGetEpisodesPaging : { 
objEpisodeBC:Episode.prototype ,
pElementBC:PagingDynamicSQL.prototype ,
oContextInformation:CContextInformation.prototype ,

 },Episode : { 
PatientSeal:PatientSeal.prototype ,
oMsgingAttributes:MessagingAttributes.prototype ,
arrobjEpsProblem:EpisodeProblem.prototype ,

 },PatientSeal : { 
sSealPsisMess:SealPSISMessage.prototype ,
SealPSISMessage:SealPSISMessage.prototype ,
patientSealAccessGroup:SealAccessGroup.prototype ,
PatientSealAccessUsers:SealAccessUsers.prototype ,

 },SealPSISMessage : { 
SealReportPacket:SealReportPacket.prototype ,
SealReportInfo:SealReportInfo.prototype ,
SealNotifyPacket:SealNotifyPacket.prototype ,
SealAuthor:SealAuthor.prototype ,

 },SealReportPacket : { 
MetaData:SealReportMetaData.prototype ,
Message:SealReportMessage.prototype ,

 },SealReportMetaData : { 
UserLoggedIn:SealReportUserLoggedIn.prototype ,

 },SealNotifyMetaData : { 
UserLoggedIn:SealNotifyUserLoggedIn.prototype ,

 },SealNotifyPacket : { 
MetaData:SealNotifyMetaData.prototype ,
Message:SealNotifyMessage.prototype ,

 },SealReportMessage : { 
SealAccessor:SealGroupAccessor.prototype ,

 },Encounter : { 
PatientSeal:PatientSeal.prototype ,
SecondaryCareProvider:SecondaryCareProvider.prototype ,

 },CareProvider : { 
oSpecialty:Specialty.prototype ,
otreatmentfunction:Specialty.prototype ,
objTeamDetail:TeamDetail.prototype ,
oConCareProvider:dpUser.prototype ,

 },Team : { 
TeamOrganisation:ObjectInfo.prototype ,

 },TeamDetail : { 
TeamLead:TeamMember.prototype ,
TeamSpecialty:ObjectInfo.prototype ,
ServicePoint:ObjectInfo.prototype ,
ParentTeam:Team.prototype ,
AccessControlWorkgroup:ObjectInfo.prototype ,
MembershipWorkgroup:ObjectInfo.prototype ,
AuditData:AuditInfo.prototype ,
oHealthOrganisation:HealthOrganisationDetail.prototype ,
TeamAddress:UserAddress.prototype ,
TeamMembers:TeamMember.prototype ,
TeamClinicalUnit:TeamClinicalUnit.prototype ,

 },User : { 
oAuditInfo:AuditInfo.prototype ,

 },TeamMember : { 
RoleProfile:ObjectInfo.prototype ,
Role:ObjectInfo.prototype ,
AccessControlWorkgroup:ObjectInfo.prototype ,
MembershipWorkgroup:ObjectInfo.prototype ,
TeamMemberEnterpriseWorkgroup:EnterpriseWorkgroup.prototype ,
RoleProfileCode:ObjectInfo.prototype ,

 },EnterpriseWorkgroup : { 
oWorkgroupUser:LRWorkgroupUser.prototype ,

 },LRWorkgroupUser : { 
UserDetails:UserLoggedIn.prototype ,

 },dpUser : { 
oHealthOrganisation:HealthOrganisationDetail.prototype ,
oRole:Role.prototype ,
oUserAddress:UserAddress.prototype ,
oUserID:UserID.prototype ,

 },HealthOrganisationDetail : { 
oHealthOrg:HealthOrganisation.prototype ,
oAuditInfo:AuditInfo.prototype ,
oHOStatus:HOStatus.prototype ,
oOrgInsurer:HOInsurer.prototype ,
arrHealthOrg:HealthOrganisation.prototype ,
oOrgAddress:HOAddress.prototype ,
oOrgIDs:HOIdentifier.prototype ,
oOrgLocation:HOLocation.prototype ,
oOrgSpecialty:HOSpecialty.prototype ,
oOrgTeams:HOTeams.prototype ,
oOrgService:HOService.prototype ,
oOrgCareService:HOCareService.prototype ,
oFailedStatus:HOStatus.prototype ,
oHOStatusHistory:StatusHistory.prototype ,

 },HealthOrganisation : { 
oParentOrganisation:ParentOrganisation.prototype ,
oAuditInfo:AuditInfo.prototype ,

 },ParentOrganisation : { 
oAuditInfo:AuditInfo.prototype ,

 },Address : { 
Contract:ContractActivity.prototype ,

 },HOAddress : { 
oAuditInfo:AuditInfo.prototype ,
HOContact:Contact.prototype ,

 },Contact : { 
oAuditInfo:AuditInfo.prototype ,
oUserMobileNumber:UserMobileNumber.prototype ,

 },UserMobileNumber : { 
oAuditInfo:AuditInfo.prototype ,

 },ContractActivity : { 
oAssociatedEntities:AssociatedEntities.prototype ,
GroupByResult:GroupResult.prototype ,

 },UserAddress : { 
UserContact:Contact.prototype ,

 },PatientAddress : { 
PatientContact:Contact.prototype ,
PatientCommunication:PatientCommunication.prototype ,
DPatientContact:Contact.prototype ,

 },PatientCommunication : { 
oPatientAddress:PatientAddress.prototype ,
oAuditInfo:AuditInfo.prototype ,
oUserMobileNumber:UserMobileNumber.prototype ,

 },PersonalCarerAddress : { 
PersonalCarerContact:Contact.prototype ,

 },PatientGP : { 
GPPractiseAddress:HOAddress.prototype ,
GPAddress:HOAddress.prototype ,
GeneralPractioner:dpUser.prototype ,
objHo:HealthOrganisationDetail.prototype ,

 },LocationAddress : { 
oAuditInfo:AuditInfo.prototype ,
oLoctionContact:Contact.prototype ,

 },HOIdentifier : { 
oAuditInfo:AuditInfo.prototype ,

 },UserID : { 
oAuditInfo:AuditInfo.prototype ,

 },LocationIdentifier : { 
oAuditInfo:AuditInfo.prototype ,

 },Location : { 
oAuditInfo:AuditInfo.prototype ,
oLocationFeatures:LocationFeature.prototype ,
oLocationIdentifier:LocationIdentifier.prototype ,
oLocationStatushistory:StatusHistory.prototype ,
oMaskLocInfo:LocationMask.prototype ,
oLocationTracks:LocationTracking.prototype ,

 },LocationMask : { 
MaskInfo:MaskInfo.prototype ,

 },dpLocation : { 
oLocationAddress:LocationAddress.prototype ,
oHealthOrganisation:HealthOrganisationDetail.prototype ,
oParentLocation:dpLocation.prototype ,
oLocID:LocationIdentifier.prototype ,

 },ServicePoint : { 
oServicePointType:SubServicePoint.prototype ,
oServiceProfile:ServiceProfile.prototype ,
oServicePntdetail:ServicePointDetail.prototype ,
oServiceLetters:ServiceLetters.prototype ,
oServiceForms:ServiceForms.prototype ,
oServicePurpose:ServicePurpose.prototype ,
oEventStatusOptions:EventStatusOption.prototype ,

 },SubServicePoint : { 
oAuditInfo:AuditInfo.prototype ,

 },ServicePointDetail : { 
oEntWorkGroup:EnterpriseWorkgroup.prototype ,
Session:SessionDetails.prototype ,
oSPStatus:ServicePointStatus.prototype ,
oHealthOrganisation:HealthOrganisation.prototype ,
oTransferOfCare:TransferOfCareConfigInfo.prototype ,
oServiceProviderDetails:ServiceProviderDetails.prototype ,
EventStatusOptions:EventStatusOption.prototype ,
oLocation:Location.prototype ,
oLocationMask:LocationMask.prototype ,
arrServiceProfile:ServiceProfile.prototype ,
oPurpose:ServicePurpose.prototype ,
oAssociatedServicePoint:AssociatedServicePoint.prototype ,
oTheatreCritical:TheatreCrtical.prototype ,
TransportMode:TransportMode.prototype ,
ServiceExtension:ServiceExtension.prototype ,
MaskInfo:MaskInfo.prototype ,
TheatreDelayGain:DelayGain.prototype ,
CompatableServicePoint:SubServicePoint.prototype ,
ServiceLetterDetails:ServiceLetters.prototype ,
ServiceFormDetails:ServiceForms.prototype ,
oFPlan:FloorPlans.prototype ,
oFailedStatus:ServicePointStatus.prototype ,
oServicePointStatusHistory:StatusHistory.prototype ,
oEventStatusOpt:EventStatusOption.prototype ,

 },AssociatedServicePoint : { 
AuditData:AuditInfo.prototype ,

 },TheatreCrtical : { 
AuditData:AuditInfo.prototype ,

 },TransferOfCareConfigInfo : { 
oTOCSectionDetails:TOCSectionDetails.prototype ,

 },TOCBaseObject : { 
oTOCCustmAttribute:TOCBaseObject.prototype ,
DisplayValue:TOCDisplayDetails.prototype ,

 },TOCSectionDetails : { 
oTOCAttribute:TOCBaseObject.prototype ,

 },dpServicePointDetail : { 
ServicePointID:ID.prototype ,
ServiceLocation:dpLocation.prototype ,
objdpUser:dpUser.prototype ,
ServiceOrganisation:HealthOrganisationDetail.prototype ,
SessionDetails:dpSessionDetail.prototype ,

 },dpSessionDetail : { 
SessionLocation:dpLocation.prototype ,

 },CareService : { 
oEntWorkGroup:EnterpriseWorkgroup.prototype ,
oParentCareService:ParentService.prototype ,
oAuditInfo:AuditInfo.prototype ,

 },CareEventItem : { 
SearchCareEvents:SearchCareEvents.prototype ,

 },CareEventsDetails : { 
oIPEventDetails:IPEventDetails.prototype ,
oOPEventDetails:OPEventDetails.prototype ,
oCEDayCareEventDetails:CEDayCareEventDetails.prototype ,
oCELTMEventDetail:LTMENCEventDetails.prototype ,

 },IPEventDetails : { 
oAdmission:CEAdmission.prototype ,
oCareProviderEvent:CECareProviderEvent.prototype ,
oLocationEvent:CELocationEvent.prototype ,
oPatientCategoryEvent:CEPatientCategoryEvent.prototype ,
oPatientLeaveReturn:CEPatientLeaveReturn.prototype ,
oDischarge:CEDischarge.prototype ,
oCEPatientLeave:CEPatientLeave.prototype ,
oCESection17Form:CESection17Form.prototype ,
oCEEstDischDate:CEEstDischDate.prototype ,
oCEPlannedContact:CEPlannedContact.prototype ,
oCECancelledContact:CECancelledContact.prototype ,

 },CEPatientLeave : { 
objCPDetails:EscortedCPDetails.prototype ,

 },EscortedCPDetails : { 
arrCPDetails:CareProviderDetails.prototype ,

 },CEDischarge : { 
Outcomes:CEDischargeOutcome.prototype ,

 },OPEventDetails : { 
oAttendance:CEAttendance.prototype ,

 },Admission : { 
oBabyPatientDemographics:PatientDemographics.prototype ,
oSpecialty:Specialty.prototype ,
oCareProvider:User.prototype ,
oWard:dpServicePointDetail.prototype ,
oAdcareprovider:dpUser.prototype ,
oNurseincharge:dpUser.prototype ,
oTreatmentFn:Specialty.prototype ,
oLocation:dpLocation.prototype ,
SharedCarers:SharedCarer.prototype ,
LocationAttribute:LocationAttribute.prototype ,
DietaryRequirements:DietaryRequirements.prototype ,
BoarderDetails:BoarderDetails.prototype ,
OPAppointments:OPAppointments.prototype ,
DiscardedBookings:DiscardedBookings.prototype ,
oCoding:Coding.prototype ,

 },PatientDemographics : { 
PatientDetails:Patient.prototype ,
Contract:ContractActivity.prototype ,
PatBasedReg:PatientBasedRegistration.prototype ,
PIB:PatientIdentityBand.prototype ,
BloodSpotCardLabel:BloodSpotCardLabel.prototype ,
PatientAddress:PatientAddress.prototype ,
PatientAlias:PatientAlias.prototype ,
PatientID:PatientID.prototype ,
PatientPersonalCarer:PatientPersonalCarer.prototype ,
PatientCarer:PatientCarer.prototype ,
PatientGP:PatientGP.prototype ,
Preference:PatientPreference.prototype ,
OtherAdminPreference:PatientPreference.prototype ,
PatientStatus:PatientStatus.prototype ,
Education:PatientEducation.prototype ,
Employer:PatientEmployer.prototype ,
Insurance:PatientInsurance.prototype ,
PatientDeceased:PatientDeceased.prototype ,
PatientConsent:PatientConsent.prototype ,
DPatientAlias:PatientAlias.prototype ,
DPatientAddress:PatientAddress.prototype ,
DPatientPersonalCarer:PatientPersonalCarer.prototype ,
DPreference:PatientPreference.prototype ,
InterPreter:PatientPreference.prototype ,

 },Patient : { 
SpokenLanguage:SpokenLanguage.prototype ,
PatID:PatientID.prototype ,

 },PatientPersonalCarer : { 
RelPatCarerAssemnt:RelPatCarerAssemnt.prototype ,
patid:PatientID.prototype ,
RelPatCarerAssessment:RelPatCarerAssemnt.prototype ,
PatientAddress:PatientAddress.prototype ,
PersonalCarerAddress:PersonalCarerAddress.prototype ,

 },RelPatCarerAssemnt : { 
RelPatCarerAssemntCDCForm:RelPatCarerAssemntCDCForm.prototype ,

 },PatientCarer : { 
User:dpUser.prototype ,

 },PatientEducation : { 
objHealthOrganisationDetail:HealthOrganisationDetail.prototype ,

 },PatientBasedRegistration : { 
NewPatient:ClonePatient.prototype ,

 },ClonePatient : { 
CopyDetails:CopyDetails.prototype ,
StillBirthDet:PatientDeceased.prototype ,

 },PatientDeceased : { 
Contract:ContractActivity.prototype ,
Cancellation:DeceasedCancellation.prototype ,

 },BoarderDetails : { 
oBookingLocations:BookingLocation.prototype ,

 },Coding : { 
oCodedBy:dpUser.prototype ,
CareProvider:dpUser.prototype ,
AssignedBy:dpUser.prototype ,
AssignedTo:dpUser.prototype ,
AuthorizedBy:dpUser.prototype ,
CodedbyUsers:dpUser.prototype ,

 },Discharge : { 
TempBedDetails:IPBookedTempLocation.prototype ,
oRTTACT:RTTActivity.prototype ,
RequestDetails:PatEncounterRequest.prototype ,
oHistoryList:HistoryList.prototype ,
codinggrp:CodingDetail.prototype ,
Outcomes:DischargeOutcome.prototype ,

 },RequestSetInvestigation : { 
oRequestItems:RequestItems.prototype ,
oWarnings:Warnings.prototype ,

 },Warnings : { 
AcknowledgeWarnings:RequestAcknowledge.prototype ,

 },CodingDetail : { 
oEntity:Entity.prototype ,
oEntityDetails:EntityDetails.prototype ,
oCoding:Coding.prototype ,

 },Entity : { 
oGroupResult:GroupResult.prototype ,

 },Referrals : { 
oRFHL7MsgObjectDetails:RFHL7MsgObjectDetails.prototype ,
oRefPrbdtls:ReferralPrbdtls.prototype ,
oRAGIndicator:RAGIndicator.prototype ,

 },PagingDynamicSQL : { 
FilterBy:Filter.prototype ,
GroupBy:Group.prototype ,

 },CResMsgGetEpisodesPaging : { 
CurrentPageElement:PagingDynamicSQL.prototype ,
oContextInformation:CContextInformation.prototype ,
oEpisode:Episode.prototype ,

 },CReqMsgGetEncountersPaging : { 
objEncounterBC:Encounter.prototype ,
pElementBC:PagingDynamicSQL.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetEncountersPaging : { 
CurrentPageElement:PagingDynamicSQL.prototype ,
oContextInformation:CContextInformation.prototype ,
oEncounter:Encounter.prototype ,

 },CReqMsgGetCareEventsPaging : { 
oCEventBC:SearchCareEvent.prototype ,
pElementBC:PagingDynamicSQL.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetCareEventsPaging : { 
oCareEventItem:CareEventItem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetEncountersForDMWPatient : { 
objEncounterBC:Encounter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetEncountersForDMWPatient : { 
oContextInformation:CContextInformation.prototype ,
oEncounter:Encounter.prototype ,

 },CReqMsgGetEpisodeDetailsForEnc : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetEpisodeDetailsForEnc : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetEpisode : { 
objEpisodeBC:Episode.prototype ,
pElementBC:PageElement.prototype ,
oContextInformation:CContextInformation.prototype ,

 },PageElement : { 
FirstElement:PageRowElement.prototype ,
LastElement:PageRowElement.prototype ,

 },CResMsgGetEpisode : { 
CurrentPageElement:PageElement.prototype ,
oContextInformation:CContextInformation.prototype ,
oEpisode:Episode.prototype ,

 },CReqMsgGetPatEpisodePathwayDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPatEpisodePathwayDetails : { 
oContextInformation:CContextInformation.prototype ,
oEpisode:Episode.prototype ,

 },CReqMsgGetEncountersForPatient : { 
objEncounterBC:Encounter.prototype ,
pElementBC:PageElement.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetEncountersForPatient : { 
CurrentPageElement:PageElement.prototype ,
oContextInformation:CContextInformation.prototype ,
oEncounter:Encounter.prototype ,

 },CReqMsgGetEncountersForEpisode : { 
objEncounterBC:Encounter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetEncountersForEpisode : { 
oContextInformation:CContextInformation.prototype ,
oEncounter:Encounter.prototype ,

 },CReqMsgGetEncounter : { 
objEncounterBC:Encounter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetEncounter : { 
oContextInformation:CContextInformation.prototype ,
oEncounter:Encounter.prototype ,

 },CReqMsgGetEncounterForCareEvents : { 
objEncounterBC:Encounter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetEncounterForCareEvents : { 
oContextInformation:CContextInformation.prototype ,
oEncounter:Encounter.prototype ,

 },CReqMsgGetSealEncounter : { 
objEncounterBC:Encounter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetSealEncounter : { 
oContextInformation:CContextInformation.prototype ,
oEncounter:Encounter.prototype ,

 },CReqMsgGetEncounterHOForPatient : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetEncounterHOForPatient : { 
oContextInformation:CContextInformation.prototype ,
oEncounter:Encounter.prototype ,

 },CReqMsgCheckEncExist : { 
objEncounterBC:EncounterBase.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgCheckEncExist : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgCheckCABExist : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgCheckCABExist : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetCareEvenForEnc : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetCareEvenForEnc : { 
objEvents:CareEventItem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetCareEventsForPatient : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetCareEventsForPatient : { 
oCareEventItem:CareEventItem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetCareEventsForPatientbyEventOID : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetCareEventsForPatientbyEventOID : { 
oCareEventItem:CareEventItem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetCareEvents : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetCareEvents : { 
objResult:CareEventsDetails.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetCareEventsDetail : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetCareEventsDetail : { 
objResult:CareEventsDetails.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgEpisodeSearchFilter : { 
objEpisodeBC:Episode.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgEpisodeSearchFilter : { 
oContextInformation:CContextInformation.prototype ,
oEpisode:Episode.prototype ,

 },CReqMsgEncounterSearchFilter : { 
objEncounterBC:Encounter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgEncounterSearchFilter : { 
oContextInformation:CContextInformation.prototype ,
oEncounter:Encounter.prototype ,

 },CReqMsgEventSearchFilter : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgEventSearchFilter : { 
oCareEventItem:CareEventItem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetInPatientAMBST : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetInPatientAMBST : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetOutPatientAMBST : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetOutPatientAMBST : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetAdmission : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAdmission : { 
oAdmissionView:Admission.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgRetrieveDischarge : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgRetrieveDischarge : { 
oDischarge:Discharge.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetEncounterTypesforPatient : { 
objEncounterBC:Encounter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetEncounterTypesforPatient : { 
oContextInformation:CContextInformation.prototype ,
oEncounter:Encounter.prototype ,

 },CReqMsgGetPatientEncountersforType : { 
objEncounterBC:Encounter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPatientEncountersforType : { 
oContextInformation:CContextInformation.prototype ,
oEncounter:Encounter.prototype ,

 },CReqMsgGetPatientEncountersforRange : { 
objEncounterBC:Encounter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPatientEncountersforRange : { 
oContextInformation:CContextInformation.prototype ,
oEncounter:Encounter.prototype ,

 },CReqMsgGetReferralforPatient : { 
objEncounterBC:Encounter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetReferralforPatient : { 
oContextInformation:CContextInformation.prototype ,
oEncounter:Encounter.prototype ,

 },CReqMsgGetPatientEncountersforReferral : { 
objEncounterBC:Encounter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPatientEncountersforReferral : { 
oContextInformation:CContextInformation.prototype ,
oEncounter:Encounter.prototype ,

 },CReqMsgGetProblemsforPatient : { 
objEncounterBC:Encounter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProblemsforPatient : { 
oContextInformation:CContextInformation.prototype ,
oEncounter:Encounter.prototype ,

 },CReqMsgGetPatientProblem : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPatientProblem : { 
oEpisode:Episode.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetEpisodesByPatOID : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetEpisodesByPatOID : { 
oContextInformation:CContextInformation.prototype ,
oEpisode:Episode.prototype ,

 },CReqMsgCheckEncExistForPatient : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgCheckEncExistForPatient : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgCheckEncExistCNS : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgCheckEncExistCNS : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetEpisodesForRefType : { 
oReferralsBC:Referrals.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetEpisodesForRefType : { 
oContextInformation:CContextInformation.prototype ,
oEpisode:Episode.prototype ,

 },CReqMsgpGetEncountersForTheatrePatient : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgpGetEncountersForTheatrePatient : { 
oContextInformation:CContextInformation.prototype ,
oEncounter:Encounter.prototype ,

 },CReqMsgGetEpiEncDetailsByPatOID : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetEpiEncDetailsByPatOID : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetTrtmntFunDetByPatOID : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetTrtmntFunDetByPatOID : { 
oContextInformation:CContextInformation.prototype ,
oTreatmentFunction:ChartTreatmentFunction.prototype ,

 },CReqMsgGetPatientEnquiryDetails : { 
oPatEnquiryBC:PatientEnquiry.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPatientEnquiryDetails : { 
oContextInformation:CContextInformation.prototype ,
oPatEnqDetails:PatientEnquiryDetails.prototype ,

 },PatientEnquiryDetails : { 
oAPdetail:APEnquiryDetails.prototype ,
oOPdetail:OPEnquiryDetails.prototype ,
oIPdetail:IPEnquiryDetails.prototype ,
oCNTdetail:ContactEnquiryDetails.prototype ,

 },OPEnquiryDetails : { 
oOPAPdetail:APEnquiryDetails.prototype ,

 },IPEnquiryDetails : { 
oIPAPdetail:APEnquiryDetails.prototype ,

 },CReqMsgGetPatientPatAPPSUMRYDetails : { 
oPatEnquiryBC:PatientEnquiry.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPatientPatAPPSUMRYDetails : { 
oContextInformation:CContextInformation.prototype ,
oPatUpcomingEnqDetails:PatientEnquiryDetails.prototype ,
oPatPrevEnqDetails:PatientEnquiryDetails.prototype ,

 },CContextInformation : { 
Current:CContextInformation.prototype ,

 },
 }
 
const charPropertyLookup = [
'IsSealOwner',
'IsSimple',
'MFNBatchStatus',
'IsLegalEntity',
'IsEmailRegWithEncryptService',
'IsAssignmentLocked',
'IsClearAssignment','IsModified','IsLocked',
'IsEncounterUpdate',
'MigrationFlag',
'IsWardAttendance','IsWardInUse','TransferFormRequired',
'IsVisible',
'IsSectionTypeChangeable',
'IsMetaphone',
'Mainvisitor',
'OthersInformed',
'IsPrimary','IsAuthorised','IsCancelled','Status','IsDGVP',
'RTTIsActive','PreviousRTTActive','RTTMonitoring',
'IsSetLevelChange',
'WarningFlag',
'IsSet',
'TriggerPoint','BedReleased',
'IsAllocated','IsCAB','IsCABModify','IncOnBehlfOf','IsLinked','IsCABREFbyGPModified','IsFromCA',
'IsRecurrence',]
 