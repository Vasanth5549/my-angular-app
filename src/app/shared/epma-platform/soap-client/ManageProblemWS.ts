import { int64, int16, int32, uInt16, uInt32, uInt64, byte, long, double, decimal, DelegateArgs, CContextInformation, CLZOObject} from "epma-platform/models";
import { ObservableCollection } from "../models/observable-collection";
import DateTime from "../services/datetime.service";
import { HelperService } from "./helper.service";
export class ManageProblemWSSoapClient{

GetProblemByLinkCompleted: Function;
GetProblemByLinkAsync(oCReqMsgGetProblemByLink:CReqMsgGetProblemByLink ) : void {
  HelperService.Invoke<CReqMsgGetProblemByLink,CResMsgGetProblemByLink,GetProblemByLinkCompletedEventArgs>("ManageProblemWS.GetProblemByLink",oCReqMsgGetProblemByLink,this.GetProblemByLinkCompleted,"ObjReqObjManageProblemAdapter",new GetProblemByLinkCompletedEventArgs(), prototypeList);
}

GetProblemByEpisodeCompleted: Function;
GetProblemByEpisodeAsync(oCReqMsgGetProblemByEpisode:CReqMsgGetProblemByEpisode ) : void {
  HelperService.Invoke<CReqMsgGetProblemByEpisode,CResMsgGetProblemByEpisode,GetProblemByEpisodeCompletedEventArgs>("ManageProblemWS.GetProblemByEpisode",oCReqMsgGetProblemByEpisode,this.GetProblemByEpisodeCompleted,"lnEpisodeOID",new GetProblemByEpisodeCompletedEventArgs(), prototypeList);
}

GetProblemForSummaryViewCompleted: Function;
GetProblemForSummaryViewAsync(oCReqMsgGetProblemForSummaryView:CReqMsgGetProblemForSummaryView ) : void {
  HelperService.Invoke<CReqMsgGetProblemForSummaryView,CResMsgGetProblemForSummaryView,GetProblemForSummaryViewCompletedEventArgs>("ManageProblemWS.GetProblemForSummaryView",oCReqMsgGetProblemForSummaryView,this.GetProblemForSummaryViewCompleted,"objReqSummaryView",new GetProblemForSummaryViewCompletedEventArgs(), prototypeList);
}

GetPOMREncounterEpisodeCompleted: Function;
GetPOMREncounterEpisodeAsync(oCReqMsgGetPOMREncounterEpisode:CReqMsgGetPOMREncounterEpisode ) : void {
  HelperService.Invoke<CReqMsgGetPOMREncounterEpisode,CResMsgGetPOMREncounterEpisode,GetPOMREncounterEpisodeCompletedEventArgs>("ManageProblemWS.GetPOMREncounterEpisode",oCReqMsgGetPOMREncounterEpisode,this.GetPOMREncounterEpisodeCompleted,"ProblemOID",new GetPOMREncounterEpisodeCompletedEventArgs(), prototypeList);
}

GetScopeDetailsCompleted: Function;
GetScopeDetailsAsync(oCReqMsgGetScopeDetails:CReqMsgGetScopeDetails ) : void {
  HelperService.Invoke<CReqMsgGetScopeDetails,CResMsgGetScopeDetails,GetScopeDetailsCompletedEventArgs>("ManageProblemWS.GetScopeDetails",oCReqMsgGetScopeDetails,this.GetScopeDetailsCompleted,"Culture",new GetScopeDetailsCompletedEventArgs(), prototypeList);
}

GetProblemContextDetailsCompleted: Function;
GetProblemContextDetailsAsync(oCReqMsgGetProblemContextDetails:CReqMsgGetProblemContextDetails ) : void {
  HelperService.Invoke<CReqMsgGetProblemContextDetails,CResMsgGetProblemContextDetails,GetProblemContextDetailsCompletedEventArgs>("ManageProblemWS.GetProblemContextDetails",oCReqMsgGetProblemContextDetails,this.GetProblemContextDetailsCompleted,"oRequest",new GetProblemContextDetailsCompletedEventArgs(), prototypeList);
}

GetPatientScopeDetailsCompleted: Function;
GetPatientScopeDetailsAsync(oCReqMsgGetPatientScopeDetails:CReqMsgGetPatientScopeDetails ) : void {
  HelperService.Invoke<CReqMsgGetPatientScopeDetails,CResMsgGetPatientScopeDetails,GetPatientScopeDetailsCompletedEventArgs>("ManageProblemWS.GetPatientScopeDetails",oCReqMsgGetPatientScopeDetails,this.GetPatientScopeDetailsCompleted,"oRequest",new GetPatientScopeDetailsCompletedEventArgs(), prototypeList);
}

GetProblemHistoryCompleted: Function;
GetProblemHistoryAsync(oCReqMsgGetProblemHistory:CReqMsgGetProblemHistory ) : void {
  HelperService.Invoke<CReqMsgGetProblemHistory,CResMsgGetProblemHistory,GetProblemHistoryCompletedEventArgs>("ManageProblemWS.GetProblemHistory",oCReqMsgGetProblemHistory,this.GetProblemHistoryCompleted,"sProblemOID",new GetProblemHistoryCompletedEventArgs(), prototypeList);
}

GetProblemBodySiteCompleted: Function;
GetProblemBodySiteAsync(oCReqMsgGetProblemBodySite:CReqMsgGetProblemBodySite ) : void {
  HelperService.Invoke<CReqMsgGetProblemBodySite,CResMsgGetProblemBodySite,GetProblemBodySiteCompletedEventArgs>("ManageProblemWS.GetProblemBodySite",oCReqMsgGetProblemBodySite,this.GetProblemBodySiteCompleted,"sProblemOID",new GetProblemBodySiteCompletedEventArgs(), prototypeList);
}

GetProblemInfoByPatEncCompleted: Function;
GetProblemInfoByPatEncAsync(oCReqMsgGetProblemInfoByPatEnc:CReqMsgGetProblemInfoByPatEnc ) : void {
  HelperService.Invoke<CReqMsgGetProblemInfoByPatEnc,CResMsgGetProblemInfoByPatEnc,GetProblemInfoByPatEncCompletedEventArgs>("ManageProblemWS.GetProblemInfoByPatEnc",oCReqMsgGetProblemInfoByPatEnc,this.GetProblemInfoByPatEncCompleted,"PatientOID",new GetProblemInfoByPatEncCompletedEventArgs(), prototypeList);
}

CheckProblemAssociateCompleted: Function;
CheckProblemAssociateAsync(oCReqMsgCheckProblemAssociate:CReqMsgCheckProblemAssociate ) : void {
  HelperService.Invoke<CReqMsgCheckProblemAssociate,CResMsgCheckProblemAssociate,CheckProblemAssociateCompletedEventArgs>("ManageProblemWS.CheckProblemAssociate",oCReqMsgCheckProblemAssociate,this.CheckProblemAssociateCompleted,"ProblemOID",new CheckProblemAssociateCompletedEventArgs(), prototypeList);
}

GetProblemCodingViewCompleted: Function;
GetProblemCodingViewAsync(oCReqMsgGetProblemCodingView:CReqMsgGetProblemCodingView ) : void {
  HelperService.Invoke<CReqMsgGetProblemCodingView,CResMsgGetProblemCodingView,GetProblemCodingViewCompletedEventArgs>("ManageProblemWS.GetProblemCodingView",oCReqMsgGetProblemCodingView,this.GetProblemCodingViewCompleted,"ScopeCode",new GetProblemCodingViewCompletedEventArgs(), prototypeList);
}

CheckDuplicateFetusPrbCompleted: Function;
CheckDuplicateFetusPrbAsync(oCReqMsgCheckDuplicateFetusPrb:CReqMsgCheckDuplicateFetusPrb ) : void {
  HelperService.Invoke<CReqMsgCheckDuplicateFetusPrb,CResMsgCheckDuplicateFetusPrb,CheckDuplicateFetusPrbCompletedEventArgs>("ManageProblemWS.CheckDuplicateFetusPrb",oCReqMsgCheckDuplicateFetusPrb,this.CheckDuplicateFetusPrbCompleted,"lnFetalDetailOid",new CheckDuplicateFetusPrbCompletedEventArgs(), prototypeList);
}

GetProblemDetailsByFetalOidCompleted: Function;
GetProblemDetailsByFetalOidAsync(oCReqMsgGetProblemDetailsByFetalOid:CReqMsgGetProblemDetailsByFetalOid ) : void {
  HelperService.Invoke<CReqMsgGetProblemDetailsByFetalOid,CResMsgGetProblemDetailsByFetalOid,GetProblemDetailsByFetalOidCompletedEventArgs>("ManageProblemWS.GetProblemDetailsByFetalOid",oCReqMsgGetProblemDetailsByFetalOid,this.GetProblemDetailsByFetalOidCompleted,"lnPatientOid",new GetProblemDetailsByFetalOidCompletedEventArgs(), prototypeList);
}

SendAuthoriseProblemCompleted: Function;
SendAuthoriseProblemAsync(oCReqMsgSendAuthoriseProblem:CReqMsgSendAuthoriseProblem ) : void {
  HelperService.Invoke<CReqMsgSendAuthoriseProblem,CResMsgSendAuthoriseProblem,SendAuthoriseProblemCompletedEventArgs>("ManageProblemWS.SendAuthoriseProblem",oCReqMsgSendAuthoriseProblem,this.SendAuthoriseProblemCompleted,"oArrHISendAuthorisation",new SendAuthoriseProblemCompletedEventArgs(), prototypeList);
}

AuthoriseProblemCompleted: Function;
AuthoriseProblemAsync(oCReqMsgAuthoriseProblem:CReqMsgAuthoriseProblem ) : void {
  HelperService.Invoke<CReqMsgAuthoriseProblem,CResMsgAuthoriseProblem,AuthoriseProblemCompletedEventArgs>("ManageProblemWS.AuthoriseProblem",oCReqMsgAuthoriseProblem,this.AuthoriseProblemCompleted,"oarrHIPrbAuthorisation",new AuthoriseProblemCompletedEventArgs(), prototypeList);
}

GetProblemListByOIDsCompleted: Function;
GetProblemListByOIDsAsync(oCReqMsgGetProblemListByOIDs:CReqMsgGetProblemListByOIDs ) : void {
  HelperService.Invoke<CReqMsgGetProblemListByOIDs,CResMsgGetProblemListByOIDs,GetProblemListByOIDsCompletedEventArgs>("ManageProblemWS.GetProblemListByOIDs",oCReqMsgGetProblemListByOIDs,this.GetProblemListByOIDsCompleted,"oHIDet",new GetProblemListByOIDsCompletedEventArgs(), prototypeList);
}

GetProblemCPPViewCompleted: Function;
GetProblemCPPViewAsync(oCReqMsgGetProblemCPPView:CReqMsgGetProblemCPPView ) : void {
  HelperService.Invoke<CReqMsgGetProblemCPPView,CResMsgGetProblemCPPView,GetProblemCPPViewCompletedEventArgs>("ManageProblemWS.GetProblemCPPView",oCReqMsgGetProblemCPPView,this.GetProblemCPPViewCompleted,"oCPPCriteria",new GetProblemCPPViewCompletedEventArgs(), prototypeList);
}

GetHealthIssueCodeGroupCompleted: Function;
GetHealthIssueCodeGroupAsync(oCReqMsgGetHealthIssueCodeGroup:CReqMsgGetHealthIssueCodeGroup ) : void {
  HelperService.Invoke<CReqMsgGetHealthIssueCodeGroup,CResMsgGetHealthIssueCodeGroup,GetHealthIssueCodeGroupCompletedEventArgs>("ManageProblemWS.GetHealthIssueCodeGroup",oCReqMsgGetHealthIssueCodeGroup,this.GetHealthIssueCodeGroupCompleted,"sEncounterOID",new GetHealthIssueCodeGroupCompletedEventArgs(), prototypeList);
}

GetPOMRProblemsInPagesCompleted: Function;
GetPOMRProblemsInPagesAsync(oCReqMsgGetPOMRProblemsInPages:CReqMsgGetPOMRProblemsInPages ) : void {
  HelperService.Invoke<CReqMsgGetPOMRProblemsInPages,CResMsgGetPOMRProblemsInPages,GetPOMRProblemsInPagesCompletedEventArgs>("ManageProblemWS.GetPOMRProblemsInPages",oCReqMsgGetPOMRProblemsInPages,this.GetPOMRProblemsInPagesCompleted,"oProblemSearch",new GetPOMRProblemsInPagesCompletedEventArgs(), prototypeList);
}

GetPOMRListViewCompleted: Function;
GetPOMRListViewAsync(oCReqMsgGetPOMRListView:CReqMsgGetPOMRListView ) : void {
  HelperService.Invoke<CReqMsgGetPOMRListView,CResMsgGetPOMRListView,GetPOMRListViewCompletedEventArgs>("ManageProblemWS.GetPOMRListView",oCReqMsgGetPOMRListView,this.GetPOMRListViewCompleted,"oReqProblemListView",new GetPOMRListViewCompletedEventArgs(), prototypeList);
}

POMRLinkProblemCompleted: Function;
POMRLinkProblemAsync(oCReqMsgPOMRLinkProblem:CReqMsgPOMRLinkProblem ) : void {
  HelperService.Invoke<CReqMsgPOMRLinkProblem,CResMsgPOMRLinkProblem,POMRLinkProblemCompletedEventArgs>("ManageProblemWS.POMRLinkProblem",oCReqMsgPOMRLinkProblem,this.POMRLinkProblemCompleted,"dttmConcurrency",new POMRLinkProblemCompletedEventArgs(), prototypeList);
}

POMRLinkWorkinglistProblemCompleted: Function;
POMRLinkWorkinglistProblemAsync(oCReqMsgPOMRLinkWorkinglistProblem:CReqMsgPOMRLinkWorkinglistProblem ) : void {
  HelperService.Invoke<CReqMsgPOMRLinkWorkinglistProblem,CResMsgPOMRLinkWorkinglistProblem,POMRLinkWorkinglistProblemCompletedEventArgs>("ManageProblemWS.POMRLinkWorkinglistProblem",oCReqMsgPOMRLinkWorkinglistProblem,this.POMRLinkWorkinglistProblemCompleted,"dttmConcurrency",new POMRLinkWorkinglistProblemCompletedEventArgs(), prototypeList);
}

InsertScopeDetailsCompleted: Function;
InsertScopeDetailsAsync(oCReqMsgInsertScopeDetails:CReqMsgInsertScopeDetails ) : void {
  HelperService.Invoke<CReqMsgInsertScopeDetails,CResMsgInsertScopeDetails,InsertScopeDetailsCompletedEventArgs>("ManageProblemWS.InsertScopeDetails",oCReqMsgInsertScopeDetails,this.InsertScopeDetailsCompleted,"oProblemScopeDetail",new InsertScopeDetailsCompletedEventArgs(), prototypeList);
}

UpdateScopeDetailsCompleted: Function;
UpdateScopeDetailsAsync(oCReqMsgUpdateScopeDetails:CReqMsgUpdateScopeDetails ) : void {
  HelperService.Invoke<CReqMsgUpdateScopeDetails,CResMsgUpdateScopeDetails,UpdateScopeDetailsCompletedEventArgs>("ManageProblemWS.UpdateScopeDetails",oCReqMsgUpdateScopeDetails,this.UpdateScopeDetailsCompleted,"oProblemScopeDetail",new UpdateScopeDetailsCompletedEventArgs(), prototypeList);
}

InsertScopeHistoryCompleted: Function;
InsertScopeHistoryAsync(oCReqMsgInsertScopeHistory:CReqMsgInsertScopeHistory ) : void {
  HelperService.Invoke<CReqMsgInsertScopeHistory,CResMsgInsertScopeHistory,InsertScopeHistoryCompletedEventArgs>("ManageProblemWS.InsertScopeHistory",oCReqMsgInsertScopeHistory,this.InsertScopeHistoryCompleted,"ProblemScopeOIDs",new InsertScopeHistoryCompletedEventArgs(), prototypeList);
}

GetWorkingProblemDetailsCompleted: Function;
GetWorkingProblemDetailsAsync(oCReqMsgGetWorkingProblemDetails:CReqMsgGetWorkingProblemDetails ) : void {
  HelperService.Invoke<CReqMsgGetWorkingProblemDetails,CResMsgGetWorkingProblemDetails,GetWorkingProblemDetailsCompletedEventArgs>("ManageProblemWS.GetWorkingProblemDetails",oCReqMsgGetWorkingProblemDetails,this.GetWorkingProblemDetailsCompleted,"ProblemOID",new GetWorkingProblemDetailsCompletedEventArgs(), prototypeList);
}

CheckProblemModifiedCompleted: Function;
CheckProblemModifiedAsync(oCReqMsgCheckProblemModified:CReqMsgCheckProblemModified ) : void {
  HelperService.Invoke<CReqMsgCheckProblemModified,CResMsgCheckProblemModified,CheckProblemModifiedCompletedEventArgs>("ManageProblemWS.CheckProblemModified",oCReqMsgCheckProblemModified,this.CheckProblemModifiedCompleted,"LastModifiedDTTM",new CheckProblemModifiedCompletedEventArgs(), prototypeList);
}

ListProblemProceduresCompleted: Function;
ListProblemProceduresAsync(oCReqMsgListProblemProcedures:CReqMsgListProblemProcedures ) : void {
  HelperService.Invoke<CReqMsgListProblemProcedures,CResMsgListProblemProcedures,ListProblemProceduresCompletedEventArgs>("ManageProblemWS.ListProblemProcedures",oCReqMsgListProblemProcedures,this.ListProblemProceduresCompleted,"objPRMProblemProcedure",new ListProblemProceduresCompletedEventArgs(), prototypeList);
}

GetEpisodeDetailsForEncLECompleted: Function;
GetEpisodeDetailsForEncLEAsync(oCReqMsgGetEpisodeDetailsForEncLE:CReqMsgGetEpisodeDetailsForEncLE ) : void {
  HelperService.Invoke<CReqMsgGetEpisodeDetailsForEncLE,CResMsgGetEpisodeDetailsForEncLE,GetEpisodeDetailsForEncLECompletedEventArgs>("ManageProblemWS.GetEpisodeDetailsForEncLE",oCReqMsgGetEpisodeDetailsForEncLE,this.GetEpisodeDetailsForEncLECompleted,"sProblemScope",new GetEpisodeDetailsForEncLECompletedEventArgs(), prototypeList);
}

GetUnMergeProblemConflictCompleted: Function;
GetUnMergeProblemConflictAsync(oCReqMsgGetUnMergeProblemConflict:CReqMsgGetUnMergeProblemConflict ) : void {
  HelperService.Invoke<CReqMsgGetUnMergeProblemConflict,CResMsgGetUnMergeProblemConflict,GetUnMergeProblemConflictCompletedEventArgs>("ManageProblemWS.GetUnMergeProblemConflict",oCReqMsgGetUnMergeProblemConflict,this.GetUnMergeProblemConflictCompleted,"dtMergeDTTM",new GetUnMergeProblemConflictCompletedEventArgs(), prototypeList);
}

ProblemManagementAdapterCompleted: Function;
ProblemManagementAdapterAsync(oCReqMsgProblemManagementAdapter:CReqMsgProblemManagementAdapter ) : void {
  HelperService.Invoke<CReqMsgProblemManagementAdapter,CResMsgProblemManagementAdapter,ProblemManagementAdapterCompletedEventArgs>("ManageProblemWS.ProblemManagementAdapter",oCReqMsgProblemManagementAdapter,this.ProblemManagementAdapterCompleted,"ObjReqObjManageProblemAdapter",new ProblemManagementAdapterCompletedEventArgs(), prototypeList);
}

RecordProblemCompleted: Function;
RecordProblemAsync(oCReqMsgRecordProblem:CReqMsgRecordProblem ) : void {
  HelperService.Invoke<CReqMsgRecordProblem,CResMsgRecordProblem,RecordProblemCompletedEventArgs>("ManageProblemWS.RecordProblem",oCReqMsgRecordProblem,this.RecordProblemCompleted,"oProblemDetails",new RecordProblemCompletedEventArgs(), prototypeList);
}

RecordProblem_LECompleted: Function;
RecordProblem_LEAsync(oCReqMsgRecordProblem_LE:CReqMsgRecordProblem_LE ) : void {
  HelperService.Invoke<CReqMsgRecordProblem_LE,CResMsgRecordProblem_LE,RecordProblem_LECompletedEventArgs>("ManageProblemWS.RecordProblem_LE",oCReqMsgRecordProblem_LE,this.RecordProblem_LECompleted,"oLinkedProcedureDetails",new RecordProblem_LECompletedEventArgs(), prototypeList);
}

ModifyProblemCompleted: Function;
ModifyProblemAsync(oCReqMsgModifyProblem:CReqMsgModifyProblem ) : void {
  HelperService.Invoke<CReqMsgModifyProblem,CResMsgModifyProblem,ModifyProblemCompletedEventArgs>("ManageProblemWS.ModifyProblem",oCReqMsgModifyProblem,this.ModifyProblemCompleted,"oProblemDetails",new ModifyProblemCompletedEventArgs(), prototypeList);
}

ModifyProblem_LECompleted: Function;
ModifyProblem_LEAsync(oCReqMsgModifyProblem_LE:CReqMsgModifyProblem_LE ) : void {
  HelperService.Invoke<CReqMsgModifyProblem_LE,CResMsgModifyProblem_LE,ModifyProblem_LECompletedEventArgs>("ManageProblemWS.ModifyProblem_LE",oCReqMsgModifyProblem_LE,this.ModifyProblem_LECompleted,"oLinkedProcedureDetails",new ModifyProblem_LECompletedEventArgs(), prototypeList);
}

LinkProblemCompleted: Function;
LinkProblemAsync(oCReqMsgLinkProblem:CReqMsgLinkProblem ) : void {
  HelperService.Invoke<CReqMsgLinkProblem,CResMsgLinkProblem,LinkProblemCompletedEventArgs>("ManageProblemWS.LinkProblem",oCReqMsgLinkProblem,this.LinkProblemCompleted,"dttmConcurrency",new LinkProblemCompletedEventArgs(), prototypeList);
}

LinkProblem_LECompleted: Function;
LinkProblem_LEAsync(oCReqMsgLinkProblem_LE:CReqMsgLinkProblem_LE ) : void {
  HelperService.Invoke<CReqMsgLinkProblem_LE,CResMsgLinkProblem_LE,LinkProblem_LECompletedEventArgs>("ManageProblemWS.LinkProblem_LE",oCReqMsgLinkProblem_LE,this.LinkProblem_LECompleted,"dttmConcurrency",new LinkProblem_LECompletedEventArgs(), prototypeList);
}

DistributeProblemCompleted: Function;
DistributeProblemAsync(oCReqMsgDistributeProblem:CReqMsgDistributeProblem ) : void {
  HelperService.Invoke<CReqMsgDistributeProblem,CResMsgDistributeProblem,DistributeProblemCompletedEventArgs>("ManageProblemWS.DistributeProblem",oCReqMsgDistributeProblem,this.DistributeProblemCompleted,"dttmConcurrency",new DistributeProblemCompletedEventArgs(), prototypeList);
}

DistributeProblem_LECompleted: Function;
DistributeProblem_LEAsync(oCReqMsgDistributeProblem_LE:CReqMsgDistributeProblem_LE ) : void {
  HelperService.Invoke<CReqMsgDistributeProblem_LE,CResMsgDistributeProblem_LE,DistributeProblem_LECompletedEventArgs>("ManageProblemWS.DistributeProblem_LE",oCReqMsgDistributeProblem_LE,this.DistributeProblem_LECompleted,"dttmConcurrency",new DistributeProblem_LECompletedEventArgs(), prototypeList);
}

CloseProblemCompleted: Function;
CloseProblemAsync(oCReqMsgCloseProblem:CReqMsgCloseProblem ) : void {
  HelperService.Invoke<CReqMsgCloseProblem,CResMsgCloseProblem,CloseProblemCompletedEventArgs>("ManageProblemWS.CloseProblem",oCReqMsgCloseProblem,this.CloseProblemCompleted,"oHealthIssueStatus",new CloseProblemCompletedEventArgs(), prototypeList);
}

CloseProblem_LECompleted: Function;
CloseProblem_LEAsync(oCReqMsgCloseProblem_LE:CReqMsgCloseProblem_LE ) : void {
  HelperService.Invoke<CReqMsgCloseProblem_LE,CResMsgCloseProblem_LE,CloseProblem_LECompletedEventArgs>("ManageProblemWS.CloseProblem_LE",oCReqMsgCloseProblem_LE,this.CloseProblem_LECompleted,"oHealthIssueStatus",new CloseProblem_LECompletedEventArgs(), prototypeList);
}

ReopenProblemCompleted: Function;
ReopenProblemAsync(oCReqMsgReopenProblem:CReqMsgReopenProblem ) : void {
  HelperService.Invoke<CReqMsgReopenProblem,CResMsgReopenProblem,ReopenProblemCompletedEventArgs>("ManageProblemWS.ReopenProblem",oCReqMsgReopenProblem,this.ReopenProblemCompleted,"oHealthIssueStatus",new ReopenProblemCompletedEventArgs(), prototypeList);
}

ReopenProblem_LECompleted: Function;
ReopenProblem_LEAsync(oCReqMsgReopenProblem_LE:CReqMsgReopenProblem_LE ) : void {
  HelperService.Invoke<CReqMsgReopenProblem_LE,CResMsgReopenProblem_LE,ReopenProblem_LECompletedEventArgs>("ManageProblemWS.ReopenProblem_LE",oCReqMsgReopenProblem_LE,this.ReopenProblem_LECompleted,"oHealthIssueStatus",new ReopenProblem_LECompletedEventArgs(), prototypeList);
}

StrikeoutProblemCompleted: Function;
StrikeoutProblemAsync(oCReqMsgStrikeoutProblem:CReqMsgStrikeoutProblem ) : void {
  HelperService.Invoke<CReqMsgStrikeoutProblem,CResMsgStrikeoutProblem,StrikeoutProblemCompletedEventArgs>("ManageProblemWS.StrikeoutProblem",oCReqMsgStrikeoutProblem,this.StrikeoutProblemCompleted,"oHealthIssueStatus",new StrikeoutProblemCompletedEventArgs(), prototypeList);
}

StrikeoutProblem_LECompleted: Function;
StrikeoutProblem_LEAsync(oCReqMsgStrikeoutProblem_LE:CReqMsgStrikeoutProblem_LE ) : void {
  HelperService.Invoke<CReqMsgStrikeoutProblem_LE,CResMsgStrikeoutProblem_LE,StrikeoutProblem_LECompletedEventArgs>("ManageProblemWS.StrikeoutProblem_LE",oCReqMsgStrikeoutProblem_LE,this.StrikeoutProblem_LECompleted,"oHealthIssueStatus",new StrikeoutProblem_LECompletedEventArgs(), prototypeList);
}

CheckDuplicateProblemCompleted: Function;
CheckDuplicateProblemAsync(oCReqMsgCheckDuplicateProblem:CReqMsgCheckDuplicateProblem ) : void {
  HelperService.Invoke<CReqMsgCheckDuplicateProblem,CResMsgCheckDuplicateProblem,CheckDuplicateProblemCompletedEventArgs>("ManageProblemWS.CheckDuplicateProblem",oCReqMsgCheckDuplicateProblem,this.CheckDuplicateProblemCompleted,"sScope",new CheckDuplicateProblemCompletedEventArgs(), prototypeList);
}

CheckDuplicateProblem_LECompleted: Function;
CheckDuplicateProblem_LEAsync(oCReqMsgCheckDuplicateProblem_LE:CReqMsgCheckDuplicateProblem_LE ) : void {
  HelperService.Invoke<CReqMsgCheckDuplicateProblem_LE,CResMsgCheckDuplicateProblem_LE,CheckDuplicateProblem_LECompletedEventArgs>("ManageProblemWS.CheckDuplicateProblem_LE",oCReqMsgCheckDuplicateProblem_LE,this.CheckDuplicateProblem_LECompleted,"sProblemOID",new CheckDuplicateProblem_LECompletedEventArgs(), prototypeList);
}

GetProblemInfoCompleted: Function;
GetProblemInfoAsync(oCReqMsgGetProblemInfo:CReqMsgGetProblemInfo ) : void {
  HelperService.Invoke<CReqMsgGetProblemInfo,CResMsgGetProblemInfo,GetProblemInfoCompletedEventArgs>("ManageProblemWS.GetProblemInfo",oCReqMsgGetProblemInfo,this.GetProblemInfoCompleted,"sProblemOID",new GetProblemInfoCompletedEventArgs(), prototypeList);
}

GetProblemInfo_LECompleted: Function;
GetProblemInfo_LEAsync(oCReqMsgGetProblemInfo_LE:CReqMsgGetProblemInfo_LE ) : void {
  HelperService.Invoke<CReqMsgGetProblemInfo_LE,CResMsgGetProblemInfo_LE,GetProblemInfo_LECompletedEventArgs>("ManageProblemWS.GetProblemInfo_LE",oCReqMsgGetProblemInfo_LE,this.GetProblemInfo_LECompleted,"Culture",new GetProblemInfo_LECompletedEventArgs(), prototypeList);
}

GetProblemByCriteriaCompleted: Function;
GetProblemByCriteriaAsync(oCReqMsgGetProblemByCriteria:CReqMsgGetProblemByCriteria ) : void {
  HelperService.Invoke<CReqMsgGetProblemByCriteria,CResMsgGetProblemByCriteria,GetProblemByCriteriaCompletedEventArgs>("ManageProblemWS.GetProblemByCriteria",oCReqMsgGetProblemByCriteria,this.GetProblemByCriteriaCompleted,"pageElement",new GetProblemByCriteriaCompletedEventArgs(), prototypeList);
}

GetProblemByCriteria_LECompleted: Function;
GetProblemByCriteria_LEAsync(oCReqMsgGetProblemByCriteria_LE:CReqMsgGetProblemByCriteria_LE ) : void {
  HelperService.Invoke<CReqMsgGetProblemByCriteria_LE,CResMsgGetProblemByCriteria_LE,GetProblemByCriteria_LECompletedEventArgs>("ManageProblemWS.GetProblemByCriteria_LE",oCReqMsgGetProblemByCriteria_LE,this.GetProblemByCriteria_LECompleted,"oProblemSearch",new GetProblemByCriteria_LECompletedEventArgs(), prototypeList);
}

GetProblemMultiValuesCompleted: Function;
GetProblemMultiValuesAsync(oCReqMsgGetProblemMultiValues:CReqMsgGetProblemMultiValues ) : void {
  HelperService.Invoke<CReqMsgGetProblemMultiValues,CResMsgGetProblemMultiValues,GetProblemMultiValuesCompletedEventArgs>("ManageProblemWS.GetProblemMultiValues",oCReqMsgGetProblemMultiValues,this.GetProblemMultiValuesCompleted,"cIsBodySite",new GetProblemMultiValuesCompletedEventArgs(), prototypeList);
}

GetProblemLinksCompleted: Function;
GetProblemLinksAsync(oCReqMsgGetProblemLinks:CReqMsgGetProblemLinks ) : void {
  HelperService.Invoke<CReqMsgGetProblemLinks,CResMsgGetProblemLinks,GetProblemLinksCompletedEventArgs>("ManageProblemWS.GetProblemLinks",oCReqMsgGetProblemLinks,this.GetProblemLinksCompleted,"sPatientOID",new GetProblemLinksCompletedEventArgs(), prototypeList);
}

GetProblemLinks_LECompleted: Function;
GetProblemLinks_LEAsync(oCReqMsgGetProblemLinks_LE:CReqMsgGetProblemLinks_LE ) : void {
  HelperService.Invoke<CReqMsgGetProblemLinks_LE,CResMsgGetProblemLinks_LE,GetProblemLinks_LECompletedEventArgs>("ManageProblemWS.GetProblemLinks_LE",oCReqMsgGetProblemLinks_LE,this.GetProblemLinks_LECompleted,"sCulture",new GetProblemLinks_LECompletedEventArgs(), prototypeList);
}

GetPrcSFSProblemsCompleted: Function;
GetPrcSFSProblemsAsync(oCReqMsgGetPrcSFSProblems:CReqMsgGetPrcSFSProblems ) : void {
  HelperService.Invoke<CReqMsgGetPrcSFSProblems,CResMsgGetPrcSFSProblems,GetPrcSFSProblemsCompletedEventArgs>("ManageProblemWS.GetPrcSFSProblems",oCReqMsgGetPrcSFSProblems,this.GetPrcSFSProblemsCompleted,"oRequest",new GetPrcSFSProblemsCompletedEventArgs(), prototypeList);
}

GetProblemBiLinksCompleted: Function;
GetProblemBiLinksAsync(oCReqMsgGetProblemBiLinks:CReqMsgGetProblemBiLinks ) : void {
  HelperService.Invoke<CReqMsgGetProblemBiLinks,CResMsgGetProblemBiLinks,GetProblemBiLinksCompletedEventArgs>("ManageProblemWS.GetProblemBiLinks",oCReqMsgGetProblemBiLinks,this.GetProblemBiLinksCompleted,"sProblemOID",new GetProblemBiLinksCompletedEventArgs(), prototypeList);
}

GetProblemDistributionListCompleted: Function;
GetProblemDistributionListAsync(oCReqMsgGetProblemDistributionList:CReqMsgGetProblemDistributionList ) : void {
  HelperService.Invoke<CReqMsgGetProblemDistributionList,CResMsgGetProblemDistributionList,GetProblemDistributionListCompletedEventArgs>("ManageProblemWS.GetProblemDistributionList",oCReqMsgGetProblemDistributionList,this.GetProblemDistributionListCompleted,"sProblemOID",new GetProblemDistributionListCompletedEventArgs(), prototypeList);
}

GetProblemStatusesCompleted: Function;
GetProblemStatusesAsync(oCReqMsgGetProblemStatuses:CReqMsgGetProblemStatuses ) : void {
  HelperService.Invoke<CReqMsgGetProblemStatuses,CResMsgGetProblemStatuses,GetProblemStatusesCompletedEventArgs>("ManageProblemWS.GetProblemStatuses",oCReqMsgGetProblemStatuses,this.GetProblemStatusesCompleted,"sProblemOID",new GetProblemStatusesCompletedEventArgs(), prototypeList);
}

GetProblemEncounterCompleted: Function;
GetProblemEncounterAsync(oCReqMsgGetProblemEncounter:CReqMsgGetProblemEncounter ) : void {
  HelperService.Invoke<CReqMsgGetProblemEncounter,CResMsgGetProblemEncounter,GetProblemEncounterCompletedEventArgs>("ManageProblemWS.GetProblemEncounter",oCReqMsgGetProblemEncounter,this.GetProblemEncounterCompleted,"sProblemOID",new GetProblemEncounterCompletedEventArgs(), prototypeList);
}
}

export class GetProblemByLinkCompletedEventArgs{
 public Result: CResMsgGetProblemByLink;
public Error: any;
}
export class GetProblemByEpisodeCompletedEventArgs{
 public Result: CResMsgGetProblemByEpisode;
public Error: any;
}
export class GetProblemForSummaryViewCompletedEventArgs{
 public Result: CResMsgGetProblemForSummaryView;
public Error: any;
}
export class GetPOMREncounterEpisodeCompletedEventArgs{
 public Result: CResMsgGetPOMREncounterEpisode;
public Error: any;
}
export class GetScopeDetailsCompletedEventArgs{
 public Result: CResMsgGetScopeDetails;
public Error: any;
}
export class GetProblemContextDetailsCompletedEventArgs{
 public Result: CResMsgGetProblemContextDetails;
public Error: any;
}
export class GetPatientScopeDetailsCompletedEventArgs{
 public Result: CResMsgGetPatientScopeDetails;
public Error: any;
}
export class GetProblemHistoryCompletedEventArgs{
 public Result: CResMsgGetProblemHistory;
public Error: any;
}
export class GetProblemBodySiteCompletedEventArgs{
 public Result: CResMsgGetProblemBodySite;
public Error: any;
}
export class GetProblemInfoByPatEncCompletedEventArgs{
 public Result: CResMsgGetProblemInfoByPatEnc;
public Error: any;
}
export class CheckProblemAssociateCompletedEventArgs{
 public Result: CResMsgCheckProblemAssociate;
public Error: any;
}
export class GetProblemCodingViewCompletedEventArgs{
 public Result: CResMsgGetProblemCodingView;
public Error: any;
}
export class CheckDuplicateFetusPrbCompletedEventArgs{
 public Result: CResMsgCheckDuplicateFetusPrb;
public Error: any;
}
export class GetProblemDetailsByFetalOidCompletedEventArgs{
 public Result: CResMsgGetProblemDetailsByFetalOid;
public Error: any;
}
export class SendAuthoriseProblemCompletedEventArgs{
 public Result: CResMsgSendAuthoriseProblem;
public Error: any;
}
export class AuthoriseProblemCompletedEventArgs{
 public Result: CResMsgAuthoriseProblem;
public Error: any;
}
export class GetProblemListByOIDsCompletedEventArgs{
 public Result: CResMsgGetProblemListByOIDs;
public Error: any;
}
export class GetProblemCPPViewCompletedEventArgs{
 public Result: CResMsgGetProblemCPPView;
public Error: any;
}
export class GetHealthIssueCodeGroupCompletedEventArgs{
 public Result: CResMsgGetHealthIssueCodeGroup;
public Error: any;
}
export class GetPOMRProblemsInPagesCompletedEventArgs{
 public Result: CResMsgGetPOMRProblemsInPages;
public Error: any;
}
export class GetPOMRListViewCompletedEventArgs{
 public Result: CResMsgGetPOMRListView;
public Error: any;
}
export class POMRLinkProblemCompletedEventArgs{
 public Result: CResMsgPOMRLinkProblem;
public Error: any;
}
export class POMRLinkWorkinglistProblemCompletedEventArgs{
 public Result: CResMsgPOMRLinkWorkinglistProblem;
public Error: any;
}
export class InsertScopeDetailsCompletedEventArgs{
 public Result: CResMsgInsertScopeDetails;
public Error: any;
}
export class UpdateScopeDetailsCompletedEventArgs{
 public Result: CResMsgUpdateScopeDetails;
public Error: any;
}
export class InsertScopeHistoryCompletedEventArgs{
 public Result: CResMsgInsertScopeHistory;
public Error: any;
}
export class GetWorkingProblemDetailsCompletedEventArgs{
 public Result: CResMsgGetWorkingProblemDetails;
public Error: any;
}
export class CheckProblemModifiedCompletedEventArgs{
 public Result: CResMsgCheckProblemModified;
public Error: any;
}
export class ListProblemProceduresCompletedEventArgs{
 public Result: CResMsgListProblemProcedures;
public Error: any;
}
export class GetEpisodeDetailsForEncLECompletedEventArgs{
 public Result: CResMsgGetEpisodeDetailsForEncLE;
public Error: any;
}
export class GetUnMergeProblemConflictCompletedEventArgs{
 public Result: CResMsgGetUnMergeProblemConflict;
public Error: any;
}
export class ProblemManagementAdapterCompletedEventArgs{
 public Result: CResMsgProblemManagementAdapter;
public Error: any;
}
export class RecordProblemCompletedEventArgs{
 public Result: CResMsgRecordProblem;
public Error: any;
}
export class RecordProblem_LECompletedEventArgs{
 public Result: CResMsgRecordProblem_LE;
public Error: any;
}
export class ModifyProblemCompletedEventArgs{
 public Result: CResMsgModifyProblem;
public Error: any;
}
export class ModifyProblem_LECompletedEventArgs{
 public Result: CResMsgModifyProblem_LE;
public Error: any;
}
export class LinkProblemCompletedEventArgs{
 public Result: CResMsgLinkProblem;
public Error: any;
}
export class LinkProblem_LECompletedEventArgs{
 public Result: CResMsgLinkProblem_LE;
public Error: any;
}
export class DistributeProblemCompletedEventArgs{
 public Result: CResMsgDistributeProblem;
public Error: any;
}
export class DistributeProblem_LECompletedEventArgs{
 public Result: CResMsgDistributeProblem_LE;
public Error: any;
}
export class CloseProblemCompletedEventArgs{
 public Result: CResMsgCloseProblem;
public Error: any;
}
export class CloseProblem_LECompletedEventArgs{
 public Result: CResMsgCloseProblem_LE;
public Error: any;
}
export class ReopenProblemCompletedEventArgs{
 public Result: CResMsgReopenProblem;
public Error: any;
}
export class ReopenProblem_LECompletedEventArgs{
 public Result: CResMsgReopenProblem_LE;
public Error: any;
}
export class StrikeoutProblemCompletedEventArgs{
 public Result: CResMsgStrikeoutProblem;
public Error: any;
}
export class StrikeoutProblem_LECompletedEventArgs{
 public Result: CResMsgStrikeoutProblem_LE;
public Error: any;
}
export class CheckDuplicateProblemCompletedEventArgs{
 public Result: CResMsgCheckDuplicateProblem;
public Error: any;
}
export class CheckDuplicateProblem_LECompletedEventArgs{
 public Result: CResMsgCheckDuplicateProblem_LE;
public Error: any;
}
export class GetProblemInfoCompletedEventArgs{
 public Result: CResMsgGetProblemInfo;
public Error: any;
}
export class GetProblemInfo_LECompletedEventArgs{
 public Result: CResMsgGetProblemInfo_LE;
public Error: any;
}
export class GetProblemByCriteriaCompletedEventArgs{
 public Result: CResMsgGetProblemByCriteria;
public Error: any;
}
export class GetProblemByCriteria_LECompletedEventArgs{
 public Result: CResMsgGetProblemByCriteria_LE;
public Error: any;
}
export class GetProblemMultiValuesCompletedEventArgs{
 public Result: CResMsgGetProblemMultiValues;
public Error: any;
}
export class GetProblemLinksCompletedEventArgs{
 public Result: CResMsgGetProblemLinks;
public Error: any;
}
export class GetProblemLinks_LECompletedEventArgs{
 public Result: CResMsgGetProblemLinks_LE;
public Error: any;
}
export class GetPrcSFSProblemsCompletedEventArgs{
 public Result: CResMsgGetPrcSFSProblems;
public Error: any;
}
export class GetProblemBiLinksCompletedEventArgs{
 public Result: CResMsgGetProblemBiLinks;
public Error: any;
}
export class GetProblemDistributionListCompletedEventArgs{
 public Result: CResMsgGetProblemDistributionList;
public Error: any;
}
export class GetProblemStatusesCompletedEventArgs{
 public Result: CResMsgGetProblemStatuses;
public Error: any;
}
export class GetProblemEncounterCompletedEventArgs{
 public Result: CResMsgGetProblemEncounter;
public Error: any;
}
export class CReqMsgRecordProblem{
oContextInformation:CContextInformation;
oProblemDetailsBC:ObservableCollection<ProblemDetails>;
}

export class ProblemDetails extends CLZOObject{
ISConcurrencyChecked:boolean;
bMobilityYes:boolean;
oRequestScopeDetails:RequestScopeDetail;
oHealthStatus:HealthIssueStatus;
oProblemContext:HealthIssueContext;
oProblem:Problem;
oProblemMVal:ProblemMultiValues;
oPatientSeal:PatientSeal;
FetalDetailOID:number;
oProblemLink:ObservableCollection<ProblemLink>;
oProblemDistribute:ObservableCollection<DistributionList>;
oPRBSnomedCodes:ObservableCollection<HealthIssueCode>;
oPatientBodySite:ObservableCollection<ProblemBodySite>;
oPRBAlternateCodes:ObservableCollection<AltCodingSchemeData>;
}
export class RequestScopeDetail extends CLZOObject{
PatientOID:number;
ProblemOID:number;
EpisodeOID:number;
EncounterOID:number;
ScopeDetailType:string;
Culture:string;
CallKey:string;
}
export class SealAccessUsers extends CLZOObject{
AccessUserType:string;
AccessUserIdentifier:string;
SealIdentifier:string;
CareProviderIdentifier:number;
ActionTaken:string;
ClinicianID:string;
SurName:string;
ForeName:string;
Role:string;
RoleOID:number;
OrgName:string;
}
export class SealAccessGroup extends CLZOObject{
AccessGroupIdentifier:string;
SealIdentifier:string;
ArtefactOID:number;
ArtefactType:string;
IsSealingGroup:boolean;
IsEditingGroup:boolean;
ArtefactName:string;
ArtefactDesc:string;
ArtefactID:string;
}
export class SealAuthor extends CLZOObject{
Code:string;
DisplayName:string;
OrganisationId:string;
OrganisationName:string;
PersonName:string;
SDSId:string;
SDSUserProfileID:string;
}
export class SealNotifyMessage extends CLZOObject{
RequesterType:string;
SealingChangeItemRefType:string;
RequesterId:string;
RequesterName:string;
RequesterDisplayName:string;
RequesterCode:string;
EffectiveDTTM:string;
NHSNumber:string;
SealingReson:string;
Comments:string;
SealEventActionCode:string;
AuthorOfSeal:string;
}
export class SealNotifyUserLoggedIn extends CLZOObject{
UserRoleProfileID:string;
UserID:string;
UserJobRoleCode:string;
}
export class SealNotifyMetaData extends CLZOObject{
MessageId:string;
CreationTime:string;
InteractionId:string;
OriginatorMachineID:string;
VersionCode:string;
HL7Version:string;
UserLoggedIn:SealNotifyUserLoggedIn;
}
export class SealNotifyPacket extends CLZOObject{
MetaData:SealNotifyMetaData;
Message:SealNotifyMessage;
}
export class SealReportInfo extends CLZOObject{
PrevSealtype:string;
sealFlg:boolean;
userFlg:boolean;
UserGroupCode:string;
UserAccessCode:string;
DocumentAssociate:string;
IsCareActivity:boolean;
}
export class SealReportMessage extends CLZOObject{
Action:string;
ReportEffectiveDTTM:string;
ReportModifyDTTM:string;
AuthorSDSUserID:string;
AuthorSDSUserName:string;
AuthorSDSUserRPID:string;
AuthorOrganisationID:string;
AuthorOrganisationName:string;
PatientNHSNumber:string;
SealId:string;
ObjectType:string;
SealingId:string;
SealingState:string;
JustifyingReason:string;
SealRequesterId:string;
SealRequesterRelationshipCode:string;
SealRequesterPersonName:string;
SealEventAction:string;
SealWorkgroupAccessorId:string;
SealAccessorId:string;
RefusalReasonCode:string;
SealAccessor:ObservableCollection<SealGroupAccessor>;
SealWorkgroupAccessorName:ObservableCollection<string>;
SealWorkgroupAccessorType:ObservableCollection<string>;
NewWorkgroupAccessorId:ObservableCollection<string>;
}
export class SealGroupAccessor{
AccessorType:SealAccessorType;
AccessorOID:string;
}
export enum SealAccessorType{
Team,
Specialty,
ServicePoint,
}
export class SealReportUserLoggedIn extends CLZOObject{
UserRoleProfileID:string;
UserID:string;
UserJobRoleCode:string;
}
export class SealReportMetaData extends CLZOObject{
MessageId:string;
CreationTime:string;
InteractionId:string;
OriginatorMachineID:string;
VersionCode:string;
HL7Version:string;
UserLoggedIn:SealReportUserLoggedIn;
}
export class SealReportPacket extends CLZOObject{
MetaData:SealReportMetaData;
Message:SealReportMessage;
}
export class SealPSISMessage extends CLZOObject{
SealReportPacket:SealReportPacket;
SealReportInfo:SealReportInfo;
SealNotifyPacket:SealNotifyPacket;
SealAuthor:SealAuthor;
}
export class PatientSeal extends CLZOObject{
sSealPsisMess:SealPSISMessage;
SealIdentifier:string;
IdentifyingOID:string;
IdentifyingType:string;
PatientOID:string;
CreatedDTTM:DateTime;
ModifiedDTTM:DateTime;
ModifiedBy:string;
RefuseReasonCode:string;
SealTimeout:number;
Justification:string;
RequestMode:string;
Requestor:string;
RequestorName:string;
RequestorDetails:string;
WitnessName:string;
WitnessDetails:string;
PrintedDTTM:DateTime;
ConsentIdentifier:string;
SealPSISMessage:SealPSISMessage;
PatientName:string;
PatientId:string;
IsSealBreak:boolean;
SurName:string;
ForeName:string;
Gender:string;
IsProfileEnabled:boolean;
ClinicianOID:number;
PageNumber:number;
PageSize:number;
MaxRows:number;
ClinicianIDs:string;
CreatedBy:string;
IsSensitive:string;
IsMDMmsgRequired:boolean;
patientSealAccessGroup:ObservableCollection<SealAccessGroup>;
PatientSealAccessUsers:ObservableCollection<SealAccessUsers>;
}
export class HealthIssueCode extends CLZOObject{
HIArtefactOID:string;
CodeColumnName:string;
CDTYPCode:string;
Code:string;
Term:string;
Version:string;
IsCurrentCodification:string;
TermKey:string;
patientOID:string;
}
export class AltCodingSchemeData extends HealthIssueCode{
}
export class DistributionList extends CLZOObject{
RecepientTypeCode:string;
RecepientSurName:string;
RecepientForeName:string;
DistributeModeCode:string;
ReceipientTypeCode1:string;
ProblemOID:string;
DistributionMode:string;
RecepientType:string;
Recepient:string;
RecepientIdentifyingType:string;
RecepientIdentifyingOId:number;
IsPrimary:string;
RoleProfileOID:string;
PCConfigOID:string;
}
export class ProblemLink extends CLZOObject{
CareRecordTypeText:string;
LinkTypeText:string;
LinkDetailsText:string;
LinkReasonText:string;
CertainityText:string;
RoleProfileOID:number;
UserspecialityOID:number;
IdentifyingType:string;
DragMode:string;
Workingstatus:string;
CurrentParentOID:string;
isMainProcedure:string;
HIArtefactOID:string;
CareRecordType:string;
LinkType:string;
LinkDetails:string;
LinkReason:string;
Certainity:string;
ProblemOID:number;
PatientOid:number;
}
export class ProblemMultiValues extends CLZOObject{
Relationship:string;
}
export class BodySite extends CLZOObject{
BSLAOId:string;
BodySiteCode:string;
BodySiteTerm:string;
BodySiteVersion:string;
LateralityCode:string;
LateralityTerm:string;
LateralityVersion:string;
LateralityCount:number;
}
export class ProblemBodySite extends BodySite{
}
export class ProcedureBodySite extends BodySite{
}
export class Person extends CLZOObject{
Surname:string;
Forename:string;
MiddleName:string;
TitleCode:string;
SexCode:string;
IsDOBEstimation:string;
BirthDttm:DateTime;
BloodGroup:string;
DeathDttm:DateTime;
CountryCode:string;
Initials:string;
CreatedAt:DateTime;
ModifiedAt:DateTime;
CreatedBy:number;
ModifiedBy:number;
Status:string;
}
export class User extends Person{
RoleID:string;
RoleDescription:string;
OId:number;
CultureSetting:string;
Qualification:string;
QualificationType:string;
IsCareprovider:string;
Administrator:string;
ActiveFrom:DateTime;
ActiveTo:DateTime;
ActiveToOrig:DateTime;
MessagingIPdetails:string;
HealthOrganisation:string;
HealthOrganisationOId:number;
CareproviderOrganisationOId:number;
OccupationCode:string;
CPTYPOID:string;
oAuditInfo:AuditInfo;
OutOfHrs:number;
NATNLCode:string;
RELIGCode:string;
SPOKLCode:string;
ETHGRCode:string;
MARRYCode:string;
WardAvailablity:string;
IsAvailableOnHolidays:string;
IsInterpreter:string;
MainIdentifier:string;
ParentHOTYPCode:string;
ParentOrganisationCode:string;
SourceOID:string;
SourceType:string;
CULTCCode:string;
Comments:string;
IsNativeUser:string;
LoginName:string;
RoleProCode:string;
WorkGroupCode:string;
EnterpriseNoteOID:number;
ConstraintOIds:string;
ConstraintWrkGrpCodes:string;
RoleProfileOid:number;
UserType:string;
IsLoginableUser:string;
IsConflictChk:boolean;
EntObjAddDetOID:number;
MFNBatchStatus:string;
UITypeCode:string;
IsRestrictedData:boolean;
}
export class AuditInfo extends CLZOObject{
CreatedAt:DateTime;
CreatedBy:number;
ModifiedAt:DateTime;
ModifiedBy:number;
Status:string;
UserOID:number;
JobRoleOID:number;
JobRoleProfileOID:number;
PrevModifiedAt:DateTime;
}
export class dpUser extends User{
oHealthOrganisation:HealthOrganisationDetail;
oRole:Role;
oUserAddress:UserAddress;
oUserID:ObservableCollection<UserID>;
}
export class HealthOrganisationDetail extends CLZOObject{
IsRestrictedData:boolean;
oHealthOrg:HealthOrganisation;
oAuditInfo:AuditInfo;
oHOStatus:HOStatus;
oOrgInsurer:ObservableCollection<HOInsurer>;
arrHealthOrg:ObservableCollection<HealthOrganisation>;
oOrgAddress:ObservableCollection<HOAddress>;
oOrgIDs:ObservableCollection<HOIdentifier>;
oOrgLocation:ObservableCollection<HOLocation>;
oOrgSpecialty:ObservableCollection<HOSpecialty>;
oOrgTeams:ObservableCollection<HOTeams>;
oOrgService:ObservableCollection<HOService>;
oOrgCareService:ObservableCollection<HOCareService>;
oFailedStatus:ObservableCollection<HOStatus>;
oHOStatusHistory:ObservableCollection<StatusHistory>;
}
export class HealthOrganisation extends CLZOObject{
IsRestrictedData:boolean;
OId:number;
Type:string;
Name:string;
Description:string;
LeadCareProvider:string;
MainID:string;
oParentOrganisation:ParentOrganisation;
External:boolean;
MainIDType:string;
UserMainID:string;
UserTitleCode:string;
ActiveFrom:DateTime;
ActiveTo:DateTime;
Active:boolean;
CulturalSetting:string;
oAuditInfo:AuditInfo;
LevelCode:string;
IsEASTrans:string;
ChildCount:string;
IsLegalEntity:string;
Organisationgroup:string;
Insurancetype:string;
Insurancerange:string;
Key:string;
GeographicalLoc:string;
PrevParHOOID:number;
Pagesize:number;
PageNumber:number;
MaxRows:number;
TotalRec:number;
MFNBatchStatus:string;
}
export class ParentOrganisation extends CLZOObject{
IsRestrictedData:boolean;
OId:number;
Type:string;
Name:string;
MainIDType:string;
MainID:string;
Relationship:string;
StartDTTM:DateTime;
EndDTTM:DateTime;
oAuditInfo:AuditInfo;
}
export class HOInsurer extends CLZOObject{
HOOid:string;
InsurerOid:string;
Insurertype:string;
Insurerrange:string;
}
export class Address extends CLZOObject{
AddressIdentifier:string;
OverseasAddress:string;
sPreferedContactTime:string;
AddrRoleParentOID:string;
Comments:string;
PDSPatientAddressID:string;
PDSPatientAddressRoleID:string;
OwnerOrganisationOID:string;
AddressType:string;
RoleTypeCode:string;
AddressLine1:string;
AddressLine2:string;
AddressLine3:string;
AddressLine4:string;
PreferedContactTime:string;
PDSUpdateStatus:byte;
GenUpdate:string;
bRpAddNullDates:boolean;
OrgActiveFrom:DateTime;
ActiveFrom:DateTime;
ActiveTo:DateTime;
StateCode:string;
CountryCode:string;
PostalCode:string;
PrimaryContact:string;
Communication:string;
PrimaryAddress:string;
SecureAddress:string;
CityCode:string;
CountyCode:string;
AddressKey:string;
IsValidAddressKey:string;
AddressServiceName:string;
MRGSTATUS:string;
sMsgChk:string;
AddressLine5:string;
AddressTypeText:string;
CountryText:string;
GeoLocation:string;
Contract:ContractActivity;
sPDSValue:string;
sLORValue:string;
bPdsGenUpd:boolean;
IsRestrictedData:boolean;
}
export class HOAddress extends Address{
HOIdentifier:number;
GLocation:string;
oAuditInfo:AuditInfo;
HOContact:ObservableCollection<Contact>;
}
export class Contact extends CLZOObject{
SuspendMode:string;
ActiveFrom:DateTime;
ActiveTo:DateTime;
Comments:string;
OwnerOrganisationOID:string;
PatientOID:string;
PDSPatientAddressID:string;
PDSPatientAddressRoleID:string;
sMsgChk:string;
PreferedContactTime:string;
Status:string;
FormattedFromDate:string;
FormattedToDate:string;
IsEmailRegWithEncryptService:string;
IsRestrictedData:boolean;
AddressOID:string;
ContactIdentifier:string;
ContactType:string;
ContactRoleTypeCode:string;
ContactNumber:string;
Secure:boolean;
IsDefault:string;
oAuditInfo:AuditInfo;
AddrRoleParentOID:string;
UserNames:string;
Communication:string;
CreatedAt:DateTime;
PrimaryContact:string;
RegEncryptedEmailService:string;
PDSUpdateStatus:byte;
Extension:string;
GenUpdate:string;
IsPDSchecked:boolean;
IsMatch:string;
sPDSValue:string;
sLORValue:string;
IsUIHistoric:boolean;
bPdsGenUpd:boolean;
IsGenUpdate:boolean;
LorActiveFrom:DateTime;
OPMode:string;
IsValidContact:boolean;
ContactROTYPCode:string;
GridRowStatus:string;
oUserMobileNumber:ObservableCollection<UserMobileNumber>;
}
export class UserMobileNumber extends CLZOObject{
UsersOID:string;
MobileNumber:string;
UserName:string;
oAuditInfo:AuditInfo;
}
export class ContractActivityMetaData extends CLZOObject{
Identifier:number;
IdentifyingType:string;
EntityType:string;
ActivityType:string;
ActivityID:string;
ActivityOID:number;
EncounterOID:number;
PatientOID:number;
PatientID:string;
PrimaryID:string;
SecondaryID:string;
AssignmentDate:DateTime;
AssignmentStatus:string;
AssignmentMethod:string;
ProcessingStatus:string;
AgreementSerialNumber:string;
AgreementLineRefNumber:string;
ResponsibleHOOID:number;
ResponsibleHOName:string;
IsAssignmentLocked:string;
CareProviderOID:number;
TreatmentFnOID:number;
ServicePointOID:number;
CallingCAMethod:string;
AltEntityTypeCode:string;
}
export class ContractActivity extends ContractActivityMetaData{
PatientIDType:string;
EffectiveDate:DateTime;
ActivityStartDate:DateTime;
ActivityEndDate:DateTime;
PurchaserCode:string;
PurchaserOID:number;
PurchaserName:string;
OwningProviderHOOID:number;
AgreementOID:number;
AgreementLineOID:number;
AgreementDescription:string;
OwningProviderHOName:string;
AgreementLineDescription:string;
IsClearAssignment:string;
Weighting:number;
OwnerOrganisationOID:number;
IsModified:string;
ParentActivityOID:number;
ParentActivityID:string;
ParentEntityType:string;
ParentStartDate:DateTime;
ParentEndDate:DateTime;
CareActivity:string;
TriggerAction:string;
TriggerOID:number;
RulesetOID:number;
ConditionLogicMode:EnumTriggerConditionLogic;
CondnEntityType:string;
IsEncounterUpdate:boolean;
EndDateMode:EnumTriggerEndDate;
AttributesList:string;
ReferralID:string;
ReferralOID:number;
LastUpdatedAt:DateTime;
IsSensitive:string;
GPDate:DateTime;
PostcodeDate:DateTime;
DOB:DateTime;
IsLocked:string;
oAssociatedEntities:ObservableCollection<AssociatedEntities>;
GroupByResult:ObservableCollection<GroupResult>;
}
export enum EnumTriggerConditionLogic{
NotApplicable,
OnTrue,
OnFalse,
}
export enum EnumTriggerEndDate{
NotApplicable,
NullEndDate,
EndDate,
}
export class AssociatedEntities{
EntityType:string;
ActivityOID:number;
EncounterOID:number;
IsEncounterUpdate:string;
}
export class GroupResult{
GroupValue:string;
Count:number;
DisplayValue:string;
}
export class UserAddress extends Address{
IdentifyingOID:number;
IdentifyingType:string;
PractitionerOIDs:string;
IsCommunicationAddress:string;
IsDefault:string;
UserAddressRoleID:number;
ROTYPCode:string;
AddressOID:number;
PrevModifiedat:DateTime;
UserContact:ObservableCollection<Contact>;
}
export class ID extends CLZOObject{
SuspendMode:string;
IDType:string;
sIdentifierOID:string;
Identifier:string;
Comments:string;
AssigningAuthority:string;
AssigningFacility:string;
HealthOrgOID:string;
HealthOrgName:string;
PDSPatientID:string;
sMessageChk:string;
IsRestrictedData:boolean;
IDIdentifier:string;
MainID:boolean;
DefaultID:boolean;
MRGSTATUS:string;
sRegType:string;
ActiveFrom:DateTime;
CreatedAt:DateTime;
ActiveTo:DateTime;
MigrationFlag:string;
}
export class HOIdentifier extends ID{
HOUniqueOID:string;
oAuditInfo:AuditInfo;
}
export class UserID extends ID{
UserIdentifier:number;
ModifiedAt:DateTime;
CreatedBy:number;
ModifiedBy:number;
Status:string;
oAuditInfo:AuditInfo;
}
export class LocationIdentifier extends ID{
LocationOID:number;
oAuditInfo:AuditInfo;
}
export class Location extends CLZOObject{
LocationPosition:string;
LocationPositiontxt:string;
Boardingcharges:string;
IsRestrictedData:boolean;
OId:number;
Type:string;
Name:string;
Description:string;
HealthOrganisationOId:number;
HealthOrganisationName:string;
ParentLocationID:number;
RootParentLocationOID:number;
ParentLocationName:string;
ReferredToProviderLocationOID:number;
ReferredtoproviderName:string;
ParentLocType:string;
TRUSTPARENT:string;
MainIDType:string;
MainID:string;
ActiveFrom:DateTime;
ActiveTo:DateTime;
Active:boolean;
oAuditInfo:AuditInfo;
IsParent:string;
ParentLOCFrmdate:DateTime;
ParentLOCTodate:DateTime;
HealthOrganisationFrmDate:DateTime;
HealthOrganisationToDate:DateTime;
Typetxt:string;
CreatedByName:string;
IsOtherLocation:string;
HasChild:boolean;
BIsParentIdChange:boolean;
oLocationFeatures:ObservableCollection<LocationFeature>;
oLocationIdentifier:ObservableCollection<LocationIdentifier>;
oLocationStatushistory:ObservableCollection<StatusHistory>;
oMaskLocInfo:ObservableCollection<LocationMask>;
oLocationTracks:ObservableCollection<LocationTracking>;
}
export class HOLocation extends Location{
}
export class LocationFeature extends CLZOObject{
OID:number;
LocationOID:number;
LOCFTCode:string;
Locationtext:string;
CreatedBy:number;
CreatedAt:DateTime;
ModifiedBy:number;
ModifyAt:DateTime;
Status:string;
OwnerOrganisationOID:number;
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
export class HealthIssueStatus extends StatusHistory{
RiskType:string;
RiskCode:string;
Staus:string;
IsAllowMultiple:string;
IsConfirm:number;
LinkedProcedureOids:string;
PatientOID:string;
ISConcurrencyChecked:boolean;
bMobiltyYes:boolean;
bStatusChanged:boolean;
Comments:string;
oProblemScopeDetail:ProblemScopeDetail;
HIOId:string;
UserID:number;
UserName:string;
IsPartialDate:string;
ConcurrencyDTTM:DateTime;
IsConfirmed:boolean;
LastModifiedUserID:number;
LastModifiedName:string;
HOOID:number;
HOName:string;
lnRoleOID:number;
}
export class ProblemScopeDetail extends CLZOObject{
OID:number;
ParentOID:number;
IdentifyingTypeCode:string;
IdentifyingTypeText:string;
IdentifyingOID:number;
Identifier:string;
Name:string;
Type:string;
TypeCode:string;
CareProviderName:string;
Status:string;
StatusCode:string;
Specialty:string;
Service:string;
Location:string;
DisplayDetails:string;
StartDTTM:DateTime;
EndDTTM:DateTime;
IsMainProblem:boolean;
Activity:string;
IsSelected:boolean;
IsEnabled:boolean;
Details:string;
PatientProblemOID:number;
IsMainProblemRightClick:boolean;
Child:ObservableCollection<ProblemScopeDetail>;
}
export class ServicePointStatus extends StatusHistory{
IdentifyingOId:number;
IdentifyingType:string;
DASTSCode:string;
EnterpriseName:string;
EnterpriseDescription:string;
EnterpriseMainID:string;
}
export class HOStatus extends StatusHistory{
IdentifyingOId:number;
IdentifyingType:string;
DASTSCode:string;
EnterpriseName:string;
EnterpriseDescription:string;
EnterpriseMainID:string;
}
export class LocationMask{
LocationOID:number;
ParentLocationOID:number;
Areaname:string;
MaskValue:string;
HiddenValue:string;
OperationMode:string;
Delete:string;
OID:number;
MaskInfo:ObservableCollection<MaskInfo>;
}
export class MaskInfo extends CLZOObject{
LocationOID:number;
ServiceOID:number;
DomainType:string;
DomainValue:string;
Case:string;
CaseValue:string;
Status:string;
MaskOID:number;
}
export class LocationTracking extends CLZOObject{
LocationOID:number;
LocationTrackingOID:number;
LocationTrackCode:string;
Status:string;
LocationTrackText:string;
}
export class Specialty extends CLZOObject{
IsRestrictedData:boolean;
Name:string;
Description:string;
SpecialtyType:string;
MainIdentifier:string;
Status:string;
HealthOrganisation:string;
OrganisationOIDs:string;
ActiveTo:DateTime;
SpecialtyOID:number;
ParentSpecialtyOID:number;
ActiveFrom:DateTime;
StatusFlag:string;
MainIDDesc:string;
SpecialtyFrom:DateTime;
SpecialtyTo:DateTime;
ParentSpecialtyName:string;
ParentSpecialtyType:string;
SourceType:string;
STFOID:number;
SpecialtyTypCode:string;
IsMain:string;
CPTIRCode:string;
TierOfService:string;
}
export class HOSpecialty extends Specialty{
}
export class Team extends CLZOObject{
OId:number;
AssignCaseload:string;
Type:string;
Name:string;
Identifier:string;
TeamOrganisation:ObjectInfo;
Remarks:string;
Status:string;
ActiveFrom:DateTime;
ActiveTo:DateTime;
HasDataFilter:string;
CAMHSTeamType:string;
CAMHSTierofService:string;
}
export class HOTeams extends Team{
OrganisationName:string;
}
export class ObjectInfo extends CLZOObject{
OID:number;
Name:string;
Code:string;
RoleProfileOID:number;
OwnerOrganisationOID:number;
SourceDataProviderType:string;
}
export class ServicePoint extends CLZOObject{
OID:number;
oServicePointType:SubServicePoint;
Description:string;
OwnedByuserOID:number;
HealthOrganisationOID:number;
ReferredToProviderLocationOID:number;
ReferredtoproviderName:string;
MainIDType:string;
MainID:string;
Schedulable:boolean;
ActiveFrom:DateTime;
ActiveTo:DateTime;
CareSettingType:string;
Active:boolean;
CreatedBy:number;
CreatedOn:DateTime;
ScheduleInstruction:string;
oServiceProfile:ServiceProfile;
Typetxt:string;
Name:string;
oServicePntdetail:ServicePointDetail;
CreatedByName:string;
EDTypCode:string;
oServiceLetters:ServiceLetters;
oServiceForms:ServiceForms;
Standarddischargetime:DateTime;
Standardadmissiontime:DateTime;
oServicePurpose:ObservableCollection<ServicePurpose>;
oEventStatusOptions:ObservableCollection<EventStatusOption>;
}
export class HOService extends ServicePoint{
Type:string;
OrganisationName:string;
}
export class ServicePurpose extends CLZOObject{
PurposeCodeTxt:string;
PurposeOId:number;
PurposeCode:string;
Status:string;
}
export class EventStatusOption extends CLZOObject{
EventStatusOID:string;
EventStatusServiceOID:string;
EventStatusCode:string;
Status:string;
SeenMandatoryFlds:string;
SeenMandatoryFldsPrev:string;
IsCaseNotePresent:boolean;
EventStatusName:string;
IsEnablePlaceOfSafety:boolean;
PdnaMandatoryFlds:string;
PdnaMandatoryFldsPrev:string;
}
export class SubServicePoint extends CLZOObject{
CompServOID:number;
Type:string;
Name:string;
oAuditInfo:AuditInfo;
ServiceOID:number;
MainID:string;
ActiveFrom:DateTime;
ActiveTo:DateTime;
OID:number;
OrgOID:number;
}
export class ServiceProfile extends CLZOObject{
ServiceProfileOId:number;
ServiceOId:number;
BRPAGCode:string;
INCLICode:string;
AGEGRCode:string;
PhysicalCapacity:number;
SexCode:string;
}
export class ServicePointDetail extends ServicePoint{
oEntWorkGroup:EnterpriseWorkgroup;
INLVLCode:string;
IsBoarderChargesApplicable:string;
IsWardAttendance:string;
IsWardInUse:string;
Context:string;
MajorIncidentOID:number;
PhysicalCapacity:number;
Stdadmtm:DateTime;
Stddistm:DateTime;
MajorIncident:string;
INCDLVLCode:string;
SPDStatusflag:string;
BRPGCode:string;
AGEGCode:string;
AccessCtrlWGName:string;
MembershipWGName:string;
IsAllowRetroBooking:string;
Session:SessionDetails;
MsgSerLocOID:number;
AnaestheticRoom:boolean;
RecoveryRoom:boolean;
Comments:string;
CarePoint:boolean;
InchargeCareProviderID:number;
InchargeCareproviderName:string;
SpecialtyOID:number;
SpecialtyDescription:string;
Purpose:string;
TheatreType:string;
TheatreSuite:string;
oSPStatus:ServicePointStatus;
WardType:string;
BedManagement:string;
TreatementRoom:string;
oHealthOrganisation:HealthOrganisation;
CareServiceOID:number;
CareServiceName:string;
TheatreOID:number;
WardOID:number;
PurposeOID:number;
CsServicePointOID:number;
ServiceIDOID:number;
IsPatientTracking:string;
TWStatusFlag:string;
WardAttendance:boolean;
Incidentlevel:string;
CCPEpisode:boolean;
IsCapacityCheck:string;
AugCarLocation:string;
IsCDSExcluded:boolean;
DataDeficitChk:boolean;
FwdWaitView:boolean;
PorterView:boolean;
BookedStatus:string;
CriticalCareUnitFunc:string;
ScheduleFlag:string;
CriticalCareUnitConfig:string;
INCLICode:string;
AGEGRCode:string;
IsCapacitychng:boolean;
Capacityfrmdt:DateTime;
Capacitytodt:DateTime;
ModCapacity:number;
LockSession:boolean;
IsAvailableOnHoliday:boolean;
WorkDays:string;
RemoveWorkDays:boolean;
EPrescribe:boolean;
IsQuickDischargeEnabled:boolean;
IsLeaveAndDischargeAllowed:boolean;
IsLocked:boolean;
IsCaseNotePresent:boolean;
IsEnablePlaceOfSafety:boolean;
ContactNumber:string;
ServiceLineCode:string;
ServiceCategoryCode:string;
IsSessionStarted:boolean;
IsEndDateChanged:boolean;
IFMFormCode:string;
TransferFormRequired:string;
IFMFormName:string;
oTransferOfCare:TransferOfCareConfigInfo;
oServiceProviderDetails:ObservableCollection<ServiceProviderDetails>;
EventStatusOptions:ObservableCollection<EventStatusOption>;
oLocation:ObservableCollection<Location>;
oLocationMask:ObservableCollection<LocationMask>;
arrServiceProfile:ObservableCollection<ServiceProfile>;
oPurpose:ObservableCollection<ServicePurpose>;
oAssociatedServicePoint:ObservableCollection<AssociatedServicePoint>;
oTheatreCritical:ObservableCollection<TheatreCrtical>;
TransportMode:ObservableCollection<TransportMode>;
ServiceExtension:ObservableCollection<ServiceExtension>;
MaskInfo:ObservableCollection<MaskInfo>;
TheatreDelayGain:ObservableCollection<DelayGain>;
CompatableServicePoint:ObservableCollection<SubServicePoint>;
ServiceLetterDetails:ObservableCollection<ServiceLetters>;
ServiceFormDetails:ObservableCollection<ServiceForms>;
oFPlan:ObservableCollection<FloorPlans>;
oFailedStatus:ObservableCollection<ServicePointStatus>;
oServicePointStatusHistory:ObservableCollection<StatusHistory>;
oEventStatusOpt:ObservableCollection<EventStatusOption>;
}
export class EnterpriseWorkgroup extends CLZOObject{
OId:number;
ArtefactOId:number;
ArtefactType:string;
MembershipWorkgroupOId:number;
MembershipWorkgroupCode:string;
MembershipWorkgroupName:string;
AccessCntlWorkgroupOId:number;
AccessCntlWorkgroupCode:string;
AccessCntlWorkgroupName:string;
OldMembershipWorkgroupCode:string;
Status:string;
oWorkgroupUser:LRWorkgroupUser;
OrganisationOId:number;
}
export class LRWorkgroupUser extends CLZOObject{
OID:number;
UserDetails:UserLoggedIn;
AuthorUserWorkgroupIdentifier:string;
AuthorUserRoleProfileIdentifier:string;
TargetuserRoleProfileIdentifier:string;
TargetuserObservationType:string;
TargetUserIdentifier:string;
TargetUserWorkgroupIdentifier:string;
RequestType:string;
AuthorUserIdentifier:string;
TeamOID:number;
}
export class UserLoggedIn extends CLZOObject{
RequestMsgID:string;
UserRoleProfileID:string;
UserID:string;
UserJobRoleCode:string;
OriginatorMachineID:string;
BusinessProcessQualifier:string;
BusinessProcessIdentifier:string;
LRComments:string;
}
export class ServiceProviderDetails extends CLZOObject{
ServiceProviderDetailsOId:number;
ServiceOId:number;
ServiceName:string;
CareProviderOId:number;
CareProviderName:string;
SpecialtyOId:number;
SpecialtyName:string;
TreatmentFnOId:number;
TreatmentFnName:string;
CPForeName:string;
CPSurName:string;
SpecialtyType:string;
CPRoleProfileOID:number;
CPRoleProfileName:string;
GridMode:string;
SerCPRoleOID:number;
}
export class SessionDetails extends CLZOObject{
SessionStartTime:string;
SessionEndTime:string;
DurationHours:number;
DurationMinutes:number;
EndHours:number;
EndMinutes:number;
StartHours:number;
StartMinutes:number;
SlotType:string;
SlotDuration:number;
ActiveFrom:DateTime;
ActiveTo:DateTime;
RestructurePerformDate:DateTime;
SessionStartDate:DateTime;
SessionEndDate:DateTime;
Horizon:number;
HorizonUOM:string;
RestructureDoneBy:string;
SessionName:string;
SessionID:number;
SessionType:string;
SessionIdentifier:string;
}
export class AssociatedServicePoint extends CLZOObject{
OID:number;
ServiceOID:number;
AssociatedServiceOID:number;
AssociatedServiceName:string;
AuditData:AuditInfo;
OwnerOrganisationOID:number;
}
export class TheatreCrtical extends CLZOObject{
OID:number;
ServiceOID:number;
CriticalCareType:string;
CriticalCareValue:string;
AuditData:AuditInfo;
OwnerOrganisationOID:number;
}
export class TransportMode extends CLZOObject{
TransportModeTxt:string;
OID:number;
TransportModeCC:string;
Status:string;
}
export class ServiceExtension extends CLZOObject{
LocationOID:number;
ServiceOID:number;
DomainType:string;
DomainValue:string;
Case:string;
Status:string;
MaskOID:number;
ParentLocationOID:number;
AreaName:string;
}
export class DelayGain extends CLZOObject{
SourceStatusCode:string;
TargetStatusCode:string;
OID:number;
Mandatory:string;
ThresholdDuration:number;
Status:string;
}
export class ServiceLetters extends CLZOObject{
CareActivityCode:string;
CareActivityName:string;
DocumentCode:string;
IdentifyingOID:number;
IdentiyingType:string;
IsDefault:string;
LetterTemplateType:string;
OID:number;
Status:string;
LetterTypeName:string;
LetterTemplateName:string;
TemplateOID:string;
FormOID:string;
EventStatusCode:string;
}
export class ServiceForms extends CLZOObject{
ModifiedBy:number;
ModifiedAt:DateTime;
CareActivityCode:string;
CareActivityName:string;
IdentifyingOID:number;
IdentiyingType:string;
IsDefault:string;
OID:number;
Status:string;
TemplateName:string;
TemplateOID:string;
FormOID:string;
EventStatusCode:string;
}
export class FloorPlans extends CLZOObject{
FloorOId:number;
FloorName:string;
FloorStatus:string;
FloorIsUsed:string;
}
export class TOCRequestinput extends CLZOObject{
TOCTYPE:string;
PatientOID:number;
EncounterOID:number;
EncounterType:string;
ServiceOID:number;
GPOID:number;
OrgOID:number;
MeshMailBoxID:string;
AlternateMeshMailBoxID:string;
SendingSystemMailBoxID:string;
MessageId:string;
WorkflowID:string;
DocumentOID:string;
TOCSummaryOID:string;
MESHLCode:string;
ACKMTCode:string;
ISFromMainApp:boolean;
EncounterID:string;
EncounterStatus:string;
sClinicalDocBinaryContent:ObservableCollection<byte>;
TOCStatus:string;
TOCSummaryHistoryOID:number;
TOCCompletedBy:number;
TOCIsSensitive:string;
TOCUserOverriddenPermission:string;
ReceivingOrgOID:number;
PASIdentifier:string;
PatientNHSNumber:string;
IsPatientGPAvailable:boolean;
CareSettingCode:string;
CareSettingTerm:string;
CareSettingVersion:string;
CareSettingCodingName:string;
}
export class TransferOfCareConfigInfo extends TOCRequestinput{
TOCSECConfigToDelete:string;
oTOCSectionDetails:ObservableCollection<TOCSectionDetails>;
}
export class TOCBaseObject extends CLZOObject{
IsAtributeCustmDisplyFRMT:boolean;
OID:number;
QualifiedName:string;
DisplayName:string;
SnomedCode:string;
DisplayOrder:number;
IsVisible:string;
IsMandatory:boolean;
MANDTCode:string;
MANDTDisplayName:string;
oTOCCustmAttribute:ObservableCollection<TOCBaseObject>;
DisplayValue:ObservableCollection<TOCDisplayDetails>;
}
export class TOCSectionDetails extends TOCBaseObject{
FNTYPCode:string;
FNTYPDisplayName:string;
FRMATCode:string;
FRMATDisplayName:string;
SECTYcode:string;
SECTYDisplayName:string;
IdentifyingType:string;
IdentifyingValue:string;
IdentifyingName:string;
IsValidSection:boolean;
IsSecMandatryAtributeFilled:boolean;
ServiceOID:number;
IsSectionTypeChangeable:string;
SectionDefinitionOID:number;
IFMFormORDataItemOID:number;
SectionContent:string;
oTOCAttribute:ObservableCollection<TOCBaseObject>;
}
export class TOCDisplayDetails extends CLZOObject{
Key:string;
Value:string;
}
export class CareService extends CLZOObject{
oEntWorkGroup:EnterpriseWorkgroup;
OId:number;
Type:string;
Name:string;
Description:string;
HealthOrganisationOId:number;
HealthOrgName:string;
MainIDType:string;
MainID:string;
ActiveFrom:DateTime;
ActiveTo:DateTime;
Active:boolean;
ChildCareService:string;
oParentCareService:ParentService;
oAuditInfo:AuditInfo;
CreatedByName:string;
PropertyType:string;
HealthOrganisationFrmDate:DateTime;
HealthOrganisationToDate:DateTime;
}
export class HOCareService extends CareService{
}
export class ParentService extends CLZOObject{
OId:number;
Type:string;
Name:string;
MainIDType:string;
MainID:string;
ActiveFrom:DateTime;
ActiveTo:DateTime;
}
export class Role extends CLZOObject{
RoleOID:number;
IsRestrictedData:boolean;
Code:string;
Description:string;
Name:string;
}
export class CPatientProblemStatus_API extends CLZOObject{
Comments:string;
RSNSTCode:string;
OID:number;
CloseReopenDTTM:DateTime;
}
export class ProblemLink_FHIRAPI extends CLZOObject{
HIArtefactOID:string;
CareRecordType:string;
ProblemOID:number;
}
export class Problem extends CLZOObject{
Termtext:string;
Iscodification:string;
CodingSchemeVersion:string;
TermId:string;
OID:number;
ScopeText:string;
IsMainProblem:boolean;
ScopeIdentifyingOid:number;
OnBehalfOf:string;
CDTYPCode:string;
PBMHiddenValues:string;
EncounterType:string;
OnSetDttmMsg:DateTime;
ProblemRecordedBy:Person;
ProblemModifiedBy:Person;
ProblemOnBehalfOf:Person;
Version:string;
StrProblemOnsetDTTM:string;
IsWorkingProblemStatus:string;
sAllEncEpisode:string;
ConclusionDTTMText:string;
ENTYPCode:string;
ProblemNameTermText:string;
ReferralStatus:string;
ReferralOID:string;
ProblemOID:string;
ProblemType:string;
ProblemName:string;
ProblemCode:string;
ProblemDesc:string;
ProblemStatus:string;
Relationship:string;
OnSetDttm:DateTime;
Scope:string;
ScopeValue:string;
Course:string;
Certainty:string;
IsSignificant:string;
SubType:string;
IsPrimary:string;
Severity:string;
BodySite:string;
BodyDetails:string;
ExpectedConclusionDttm:DateTime;
OnExpectedConclusionDttm:string;
ObserverID:number;
ObserverName:string;
ModifiedDTTM:DateTime;
CreatedDTTM:DateTime;
IsConfidential:string;
ConcurrencyDTTM:DateTime;
IsPartialDate:string;
IsPartialDateCode:string;
IsHasHistory:string;
CanStrikeOut:string;
HasLinkProblem:string;
RecordedBy:string;
RecordedByOID:number;
OnBehalfOfOID:number;
HasFilter:string;
EncounterOID:number;
ConclusionDttm:DateTime;
IsDistributed:string;
ProblemAltCode:string;
ProblemAltTerm:string;
OnSetDate:string;
OrganisationOId:string;
OrganisationName:string;
LastModifiedName:string;
Title:string;
RoleID:string;
RoleName:string;
UserInfo:string;
ReasonForStrkOut:string;
PatientOID:string;
NewOnSetDTTM:DateTime;
OldOnSetDTTM:DateTime;
grdPrbTypeText:string;
grdPrbTypeVal:string;
grdPrbNameText:string;
grdPrbNameVal:string;
grdStatusText:string;
grdOnsetDtText:string;
grdHiddenValues:string;
grdHiddenBodysite:string;
PrbCloseDTTM:DateTime;
CloseIsPartial:string;
CourseText:string;
ReasonForStatusChange:string;
OnExpectedConclusionDttmText:string;
Termname:string;
RecordedByID:number;
StatusComments:string;
StatusComment:string;
StatusUpdateDTTM:DateTime;
ModifiedBy:string;
ModifiedByOID:number;
ModifiedAt:DateTime;
OnsetDateFormat:string;
OnsetDTTMText:string;
OnsetDTTM:DateTime;
ProblemStatusText:string;
CertaintyText:string;
SeverityText:string;
ProblemTypeText:string;
LinkProblemOID:number;
FetalDetailOID:number;
FetalNo:string;
FetalID:string;
Sex:string;
Comments:string;
DateFormat:string;
FetalStatus:string;
EncounterID:string;
EpisodeID:string;
HasSendAuthRight:boolean;
HasAuthoriseRight:boolean;
EscalationOID:number;
AuthComments:string;
LastUpdatedByUserID:number;
IsModified:boolean;
LinkedReferalEpisodeOid:string;
IsOldPartialDate:string;
ProblemScopeValueDisplay:string;
SubTypeText:string;
PatientIdentifier:string;
ProblemLinks:ObservableCollection<ProblemLink_FHIRAPI>;
PrbStatus:ObservableCollection<CPatientProblemStatus_API>;
ScopeDetails:ObservableCollection<ProblemScopeDetail>;
Bodysite:ObservableCollection<ProblemBodySite>;
GroupByResult:ObservableCollection<GroupResult>;
}
export class ProblemSearchCriteria extends Problem{
Culture:string;
sTaskDetails:string;
ProblemOids:string;
sSubsetCertainity:string;
MasterlistSortOrder:string;
WorklistSortOrder:string;
oProblemCriteria:SearchCriteria;
HasSealBroken:boolean;
HasOwnSealBroken:boolean;
ProblemCodeFilter:string;
}
export class SearchCriteria extends CLZOObject{
IsGroupBy:string;
GroupByType:string;
GroupByData:string;
RoleProfileOID:number;
UserspecialityOID:number;
POMRMode:string;
SortBy:string;
SortByData:string;
SortOrder:string;
ProblemOnsetDate:DateTime;
ParentSortData:string;
ParentSortOrder:string;
FromDate:DateTime;
ToDate:DateTime;
SearchType:string;
PageNo:number;
PageSize:number;
IncludeInactiveHI:string;
IncludeStruckOutHI:string;
IsOnlyContext:string;
EPRMAPValue:string;
}
export class ProblemView extends Problem{
RowNumber:number;
ParentName:string;
ParentTotal:number;
Total:number;
DirectDevice:string;
Status:string;
ParentOID:string;
ChildOID:string;
Xml:string;
Workingstatus:string;
StrCloseReopenDTTM:string;
oProblemProcedure:ProblemProcedure;
InExternalWorkingList:boolean;
RecordCount:number;
EncounterDetail:string;
CloseReopenDTTM:DateTime;
oPatientEncounter:PatientEncounter;
IsSealOwner:string;
oProvenance:Provenance;
oTerminology:Terminology;
oPatientSeal:PatientSeal;
PbmGeneralHiddenFields:string;
objEpisode:ObservableCollection<Episode>;
}
export class ProblemProcedure{
ProcedureName:string;
ProcedureCode:string;
IsMainProcedure:string;
ProcedurePerformedDTTM:DateTime;
ProcedureBodysiteLaterality:string;
}
export class PatientEncounter{
MainIdentifier:string;
EncounterOID:string;
EncounterType:string;
LocationName:string;
TempLocationName:string;
CurrentLocationName:string;
CareProviderName:string;
SpecialtyName:string;
ExpectedDischargeDTTM:DateTime;
EndDTTM:DateTime;
MedicalDischargeDttm:DateTime;
StartDTTM:DateTime;
Status:string;
}
export class Provenance extends CLZOObject{
Action:string;
Status:string;
Reason:string;
Comments:string;
ObservedBy:string;
ObservedOn:DateTime;
RecordedBy:string;
RecordedOn:DateTime;
ObjobservedBy:dpUser;
ObjRecordedBy:dpUser;
}
export class Terminology extends CLZOObject{
Conceptcode:string;
Descriptiontext:string;
Codingscheme:string;
Codingschemeversion:string;
}
export class Episode extends CLZOObject{
Episodeoid:number;
EpisodeIdentifier:string;
EpisodeID:string;
EpisodeName:string;
Problem:string;
CreatedDttm:DateTime;
ClosureDttm:DateTime;
EndDttm:DateTime;
ClosureReason:string;
Status:string;
OrganisationID:number;
OrganisationName:string;
EPISTCode:string;
PatientOID:string;
ClosedBy:string;
CreatedBy:number;
bNegation:boolean;
HasFilter:boolean;
IsSealBroken:boolean;
IsSealOwner:string;
HasOwnSealBroken:boolean;
PatientSeal:PatientSeal;
EpisodeCount:number;
StartDttm:DateTime;
LinkedEpisodeOId:number;
LinkedEpisodeName:string;
CareServiceName:string;
CareServiceOId:number;
CareProviderOID:number;
CareProviderName:string;
ReferralOID:number;
ReferralDttm:DateTime;
ReferralFromCP:string;
ReferralToCP:string;
ReferralToType:string;
ReferredToTeam:string;
CreatedByUserName:string;
ClosedByUserName:string;
ReferredSpelity:string;
ReferredTremnt:string;
ReferredTeam:string;
ReferredOrg:string;
ReferralType:string;
ReferralStatus:string;
ClosedByCareProvOID:number;
IsEncExists:string;
SourcePatOID:number;
ParentOID:number;
CancelReason:string;
RSNCNCode:string;
CancelDTTM:DateTime;
OutcomeCode:string;
HasComments:string;
IsValidationReq:boolean;
HasDataFilter:string;
EpiStatus:string;
ReferredToSpecOID:number;
PatientPathWayOID:number;
PatientPathWayID:string;
OrganisationMainID:string;
EncounterOID:string;
PatientReferralID:string;
TeamOID:number;
lnReftoProvider:number;
IsReOpen:boolean;
oMsgingAttributes:MessagingAttributes;
EncounterType:string;
DateQual:string;
GroupValue:string;
GroupValueDisplay:string;
Count:number;
GroupText:string;
IsCustomFilter:boolean;
AssociatedProblems:string;
ActualRTTStatus:string;
bRTTValidateRequired:boolean;
arrobjEpsProblem:ObservableCollection<EpisodeProblem>;
}
export class EpisodeProblem extends CLZOObject{
PatientProblemOId:number;
PatientProblemDescription:string;
IsPrimary:boolean;
IsLinked:boolean;
}
export class MessagingAttributes extends CLZOObject{
RefByCPOID:number;
RefToCPOID:number;
EpisodeStartDTTM:DateTime;
AlternateEPisodeID:string;
}
export class HealthIssueContext extends CLZOObject{
RoleProfielOId:number;
AEMsgEncTypes:string;
EncounterType:string;
SelProcEncounterOID:string;
IdentifyingOId:number;
IdentifyingType:string;
IsFromTheatre:boolean;
EncStartDate:DateTime;
EncIdentifier:string;
PatientOID:string;
PatientID:string;
EncounterOID:string;
PatientDOB:DateTime;
PatientDOD:DateTime;
PatientSex:string;
IsPatientDeceased:string;
UserOID:number;
UserName:string;
HOOId:number;
EpisodeOID:string;
NHSMailSubject:string;
LorenzoUser:string;
LorenzoUserRole:string;
NHSOrganisationName:string;
NHSOrganisationAddress:string;
LorenzoUserTelephone:string;
LorenzoUserEmailAddress:string;
PatientConfigOID:string;
FetalDetailOid:number;
AlertType:string;
IsMerged:string;
CACode:string;
}
export class ProcedureDetails extends CLZOObject{
Activity:string;
isMainProcedure:string;
oContext:HealthIssueContext;
oProcedure:Procedure;
CheckDuplicate:string;
FetaDetailOid:number;
PatientOID:number;
OldPartialDateCode:string;
oMainProcedurePRB:ObservableCollection<MainProcedureProblem>;
oProcedureBS:ObservableCollection<ProcedureBodySite>;
oProcedureCP:ObservableCollection<ProcedureCareProvider>;
oProcedurePRB:ObservableCollection<ProcedureProblem>;
oPRCSnomedCodes:ObservableCollection<HealthIssueCode>;
oPRCAlternateCodes:ObservableCollection<AltCodingSchemeData>;
}
export class MainProcedureProblem extends CLZOObject{
ProcedureName:string;
LinkOID:string;
ProblemOID:string;
ProcedureOID:string;
}
export class Procedure extends CLZOObject{
ProcedureOID:string;
ProcedureCode:string;
ProcedureTerm:string;
ProcedureVersion:string;
Approach:string;
DirectDevice:string;
Method:string;
ApproachTerm:string;
DirectDeviceTerm:string;
MethodTerm:string;
Priority:string;
ServicePointOId:number;
ServicePointName:string;
ProcedureStatus:string;
PerformedDTTM:DateTime;
PerformedDTTMText:string;
CreatedDTTM:DateTime;
ConcurrencyDTTM:DateTime;
ModifiedDTTM:DateTime;
PartialDateCode:string;
IsHasHistory:string;
CanStrikeOut:string;
PerformedBy:string;
SPTYPCode:string;
PerformedByOID:string;
RecordedBy:string;
grdPrcName:string;
grdPrcNameVal:string;
grdPerformedDTTM:string;
grdPerformedBy:string;
grdComments:string;
grdHiddenValues:string;
grdHiddenBodysite:string;
lateralSite:string;
StatusRemark:string;
CreatedByOID:number;
StrikeOutReason:string;
StrikeOutComments:string;
ProcedureAltCode:string;
ProcedureAltTerm:string;
StruckOutBy:string;
TitleCode:string;
UserRoleOid:string;
UserDetails:string;
UserRoleName:string;
UserRoleCode:string;
HOOId:number;
HOName:string;
Comments:string;
OldOnSetDTTM:DateTime;
NewOnSetDTTM:DateTime;
FetalDetailOID:number;
FetalNo:string;
FetalID:string;
Sex:string;
EncounterOID:number;
PatientOID:number;
FetalStatus:string;
HasSendAuthRight:boolean;
HasAuthoriseRight:boolean;
EscalationOID:number;
AuthComments:string;
LastModifiedByOID:number;
OrganisationName:string;
StrStartDate:string;
isMainProcedure:string;
OldPartialDateCode:string;
CDTYPECode:string;
EncounterType:string;
ProcedureMinutes:string;
IsTheatreProcedure:boolean;
IsPrimaryProcedure:boolean;
IsAnaesthesia:boolean;
Duration:number;
ProcedureDescription:string;
Enddttm:DateTime;
GroupByResult:ObservableCollection<GroupResult>;
}
export class ProcedureCareProvider extends CLZOObject{
CareProviderOId:string;
CareProviderName:string;
}
export class ProcedureProblem extends CLZOObject{
IsMainProcedure:boolean;
MainProcedure:string;
ChangeMainprocedureLinkOID:string;
ProcedureOID:string;
ProblemOId:string;
ProblemTerm:string;
ProblemVersion:string;
ProblemCode:string;
ProblemDttm:DateTime;
ProblemDateCode:string;
LinkOID:string;
}
export class CReqProblemListView extends CLZOObject{
PatientOID:number;
UserOID:number;
UserspecialityOID:number;
IsConfidential:string;
POMRMode:string;
Culture:string;
sTaskDetails:string;
Problemoids:string;
sSubsetCertainity:string;
ProcedureOID:number;
MasterlistSortOrder:string;
WorklistSortOrder:string;
oPatientSealCriteria:PatientSealCriteria;
}
export class PatientSealCriteria extends CLZOObject{
SealIdentifier:string;
IdentifyingOID:string;
IdentifyingType:string;
PatientOID:string;
CareProviderOID:string;
IncludeClinicianSeal:boolean;
IncludeOwnSeal:boolean;
IncludeOtherSeal:boolean;
IsSealBreak:boolean;
PatientOIDs:string;
}
export class PatientProblemPrc extends CLZOObject{
ProblemOID:number;
ProblemName:string;
OnSetDTTMText:string;
ProblemStatus:string;
InExternalWorkingList:boolean;
ModifiedDTTM:DateTime;
LinkOID:number;
IsMainProcedure:string;
MainPRCLinkOID:number;
MainPRCName:string;
MainPRCOID:number;
ProcedureName:string;
IsHidden:boolean;
}
export class ProblemEncounterEpisode extends CLZOObject{
OID:number;
ParentOID:number;
RecordType:string;
Id:string;
Type:string;
CPName:string;
Status:string;
Specialty:string;
Location:string;
StartDTTM:DateTime;
EndDTTM:DateTime;
}
export class RequestContextDetail extends CLZOObject{
PatientOID:number;
ProblemOID:number;
EpisodeOID:number;
EncounterOID:number;
ScopeDetailType:string;
Culture:string;
}
export class ProblemContextDetail extends CLZOObject{
OID:number;
ParentOID:number;
ProblemOID:number;
ProblemName:string;
ProblemCode:string;
ProblemStatusCode:string;
ProblemStatusText:string;
Scope:string;
ScopeValue:string;
OnsetDTTMText:string;
ConclusionDTTMText:string;
ProblemTypeCode:string;
ProblemTypeText:string;
CDTYPCode:string;
CodingSchemeVersion:string;
IdentifyingTypeCode:string;
IdentifyingTypeText:string;
IdentifyingOID:number;
Identifier:string;
CareProviderName:string;
Status:string;
Specialty:string;
Service:string;
Location:string;
DisplayDetails:string;
StartDTTM:DateTime;
EndDTTM:DateTime;
IsMainProblem:boolean;
Activity:string;
IsSelected:boolean;
IsEnabled:boolean;
Details:string;
PatientProblemOID:number;
Child:ObservableCollection<ProblemScopeDetail>;
}
export class HealthIssueHistory extends CLZOObject{
OID:string;
ColumnName:string;
FromValue:string;
ToValue:string;
UsersOID:number;
UserName:string;
ModifiedDTTM:DateTime;
}
export class CodingCNSProblem extends CLZOObject{
ProblemIdentifier:string;
ProblemName:string;
sType:string;
Problemcode:string;
RecordBy:number;
CreatedByUserName:string;
RecordedDTTM:DateTime;
CodingScheme:string;
Version:string;
SCOPCCode:string;
PatientOID:number;
IsMainProblem:boolean;
}
export class HISendAuthorisation extends CLZOObject{
HIOID:number;
HIIdentifyingType:string;
HIType:string;
HIName:string;
HIStatusCode:string;
HIEscalationOID:number;
OrganisationName:string;
HILastModifiedAt:DateTime;
oHIContext:HealthIssueContext;
PatientOid:string;
bServiceCall:boolean;
objHISendAuthorisationdt:ObservableCollection<HISendAuthorisationDetail>;
}
export class HISendAuthorisationDetail{
RecepientType:string;
RecepientRoleProfileOid:number;
RecepientOid:number;
RecepientName:string;
RoleProfileID:string;
}
export class CPPProperty extends CLZOObject{
SortBy:string;
SortOrder:string;
GroupBy:string;
GroupByValue:string;
}
export class CPPCriteria extends CPPProperty{
PatientOID:string;
StatusCode:string;
FromDate:DateTime;
ToDate:DateTime;
Count:number;
sType:string;
IsSignedDoc:string;
IsRecentDoc:string;
IsReferenceDoc:string;
Priority:string;
ProblemName:string;
IsNote:string;
IsIncident:string;
IsSensitive:string;
}
export class CPPProblem extends CLZOObject{
ProblemIdentifier:string;
ProblemName:string;
sType:string;
StatusCode:string;
RecordedDTTM:DateTime;
EncounterOID:string;
EncounterDetails:string;
IsPartialDate:string;
}
export class HealthIssueCodeGroup extends CLZOObject{
TermText:string;
Code:string;
Description:string;
CodingSchemeName:string;
Version:string;
HealthIssueType:string;
SchemeWithVersion:string;
}
export class ProblemListView extends CLZOObject{
IsSealExists:boolean;
MasterList:ObservableCollection<ProblemList>;
WorkingList:ObservableCollection<ProblemList>;
}
export class ProblemList extends CLZOObject{
OID:number;
ParentOID:number;
TermId:string;
ProblemName:string;
Workingstatus:string;
ProblemCode:string;
ProblemTypeCode:string;
ProblemTypeText:string;
ProblemStatusCode:string;
ProblemStatusText:string;
EncounterTypeCode:string;
EncounterTypeText:string;
OnsetDTTMText:string;
ConclusionDTTMText:string;
ObserverName:string;
Scope:string;
Severity:string;
RecordedBy:string;
OnsetDateFormat:string;
CloseDateFormat:string;
ScopeValue:string;
CDTYPCode:string;
CodingSchemeVersion:string;
CertainityCode:string;
CertainityText:string;
HasHistory:string;
HasLinkProblem:string;
IsConfidential:string;
IsSignificant:string;
IsPrimary:string;
HasDataFilter:string;
CanStrikeOut:string;
ExpectedConclusionDTTM:DateTime;
CloseReopenDTTM:DateTime;
CreatedDTTM:DateTime;
ConcurrencyDTTM:DateTime;
OnsetDTTM:DateTime;
InExternalWorkingList:boolean;
IsMainProblem:boolean;
IsFreeText:boolean;
FreeText:string;
varProblemName:string;
WorkListDetailsToolTip:string;
WorkListDetailsMessage:string;
IsMultipleWorkList:boolean;
ProcedureDetails:string;
Comments:string;
FetalDetailOID:number;
IsDistributed:string;
PatientOID:number;
ReferralOID:string;
IsChecked:boolean;
ExpectedConclusionDTTMTxt:string;
ContextENTYPCode:string;
ChildProblems:ObservableCollection<ProblemList>;
ScopeDetails:ObservableCollection<ProblemScopeDetail>;
}
export class ProblemWorkingListDetail extends CLZOObject{
OID:number;
ProblemOID:number;
SpecialityOID:number;
SpecialityName:string;
UserOID:number;
UserName:string;
SurName:string;
ForeName:string;
}
export class PRMProblemProcedure extends CLZOObject{
ProblemOID:number;
GetLatest:boolean;
PerformedDate:DateTime;
ProcedureCode:string;
Culture:string;
PerformedDateCode:string;
MultiplePerformedDate:string;
ProblemOIDs:string;
}
export class CResMsgRecordProblem{
oContextInformation:CContextInformation;
oReturnProbDetails:ObservableCollection<ReturnProblemDetails>;
}
export class ReturnProblemDetails{
sProblemOID:string;
sSealIdentifier:string;
sEmailUsers:string;
IsConflictGenerated:boolean;
IsStichSendAuth:boolean;
IsAuthorise:boolean;
oarrProcedureOut:ObservableCollection<ProcedureOut>;
}
export class ProcedureOut{
IsStichSendAuth:boolean;
IsAuthorise:boolean;
ProcedureOID:string;
IsConflictGenerated:boolean;
}
export class CReqMsgRecordProblem_LE{
oProblemDetailsBC:ProblemDetails;
oContextInformation:CContextInformation;
oLinkedProcedureDetailsBC:ObservableCollection<ProcedureDetails>;
}
export class CResMsgRecordProblem_LE{
sProblemOID:string;
sSealIdentifier:string;
sEmailUsers:string;
oContextInformation:CContextInformation;
oReturnProblemDetails:ObservableCollection<ReturnProblemDetails>;
}
export class CReqMsgModifyProblem{
oProblemDetailsBC:ProblemDetails;
oContextInformation:CContextInformation;
}
export class CResMsgModifyProblem{
oReturnProbDetails:ReturnProblemDetails;
oContextInformation:CContextInformation;
}
export class CReqMsgModifyProblem_LE{
oProblemDetailsBC:ProblemDetails;
oContextInformation:CContextInformation;
oLinkedProcedureDetailsBC:ObservableCollection<ProcedureDetails>;
}
export class CResMsgModifyProblem_LE{
sEmailUsers:string;
sProblemOids:string;
oContextInformation:CContextInformation;
oReturnProblemDetails:ObservableCollection<ReturnProblemDetails>;
}
export class CReqMsgLinkProblem{
oContextBC:HealthIssueContext;
sProblemOIDBC:string;
HasLinkBC:string;
dttmConcurrencyBC:DateTime;
oContextInformation:CContextInformation;
oProblemLinkBC:ObservableCollection<ProblemLink>;
}
export class CResMsgLinkProblem{
oContextInformation:CContextInformation;
}
export class CReqMsgLinkProblem_LE{
oContextBC:HealthIssueContext;
sProblemOIDBC:string;
HasLinkBC:string;
dttmConcurrencyBC:DateTime;
oContextInformation:CContextInformation;
oProblemLinkBC:ObservableCollection<ProblemLink>;
}
export class CResMsgLinkProblem_LE{
oContextInformation:CContextInformation;
}
export class CReqMsgDistributeProblem{
oContextBC:HealthIssueContext;
sProblemOIDBC:string;
dttmConcurrencyBC:DateTime;
oContextInformation:CContextInformation;
oProblemDistributeBC:ObservableCollection<DistributionList>;
}
export class CResMsgDistributeProblem{
sEmailUsers:string;
oContextInformation:CContextInformation;
}
export class CReqMsgDistributeProblem_LE{
oContextBC:HealthIssueContext;
sProblemOIDBC:string;
dttmConcurrencyBC:DateTime;
oContextInformation:CContextInformation;
oProblemDistributeBC:ObservableCollection<DistributionList>;
}
export class CResMsgDistributeProblem_LE{
sEmailUsers:string;
oContextInformation:CContextInformation;
}
export class CReqMsgCloseProblem{
oContextBC:HealthIssueContext;
oHealthIssueStatusBC:HealthIssueStatus;
oContextInformation:CContextInformation;
}
export class CResMsgCloseProblem{
oContextInformation:CContextInformation;
}
export class CReqMsgCloseProblem_LE{
oContextBC:HealthIssueContext;
oHealthIssueStatusBC:HealthIssueStatus;
oContextInformation:CContextInformation;
}
export class CResMsgCloseProblem_LE{
oContextInformation:CContextInformation;
}
export class CReqMsgReopenProblem{
oContextBC:HealthIssueContext;
oHealthIssueStatusBC:HealthIssueStatus;
oContextInformation:CContextInformation;
}
export class CResMsgReopenProblem{
IsConflictGenerated:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgReopenProblem_LE{
oContextBC:HealthIssueContext;
oHealthIssueStatusBC:HealthIssueStatus;
oContextInformation:CContextInformation;
}
export class CResMsgReopenProblem_LE{
IsConflictGenerated:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgStrikeoutProblem{
oContextBC:HealthIssueContext;
oHealthIssueStatusBC:HealthIssueStatus;
oContextInformation:CContextInformation;
}
export class CResMsgStrikeoutProblem{
oContextInformation:CContextInformation;
}
export class CReqMsgStrikeoutProblem_LE{
oContextBC:HealthIssueContext;
oHealthIssueStatusBC:HealthIssueStatus;
oContextInformation:CContextInformation;
}
export class CResMsgStrikeoutProblem_LE{
oContextInformation:CContextInformation;
}
export class CReqMsgCheckDuplicateProblem{
oContextBC:HealthIssueContext;
sProblemTypeBC:string;
sProblemNameBC:string;
sScopeBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgCheckDuplicateProblem{
isDuplicate:boolean;
lnErrorID:number;
oContextInformation:CContextInformation;
}
export class CReqMsgCheckDuplicateProblem_LE{
oContextBC:HealthIssueContext;
sProblemTypeBC:string;
sProblemNameBC:string;
sScopeBC:string;
sAllEncEpisodeBC:string;
sProblemOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgCheckDuplicateProblem_LE{
isDuplicate:boolean;
lnErrorID:number;
oContextInformation:CContextInformation;
}
export class CReqMsgGetProblemInfo{
sProblemOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetProblemInfo{
oProblem:Problem;
oContextInformation:CContextInformation;
}
export class CReqMsgGetProblemInfo_LE{
sProblemOIDBC:string;
CultureBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetProblemInfo_LE{
oProblem:Problem;
oContextInformation:CContextInformation;
}
export class CReqMsgGetProblemByCriteria{
oContextBC:HealthIssueContext;
oProblemSearchBC:ProblemSearchCriteria;
pageElementBC:PagingDynamicSQL;
oContextInformation:CContextInformation;
}
export class PagingDynamicSQL{
PageSize:number;
PageIndex:number;
PageCount:number;
RecFrm:number;
RecTo:number;
FindPageCount:boolean;
ChildPagination:boolean;
FilterBy:Filter;
GroupBy:Group;
FilterByColumn:string;
SortingColumns:string;
FilterByXML:string;
SPSortingColumns:string;
CustomFilterXML:string;
SelectedDate:DateTime;
}
export class Filter{
Type:FilterByType;
ListMetaphoreOID:number;
Serialize:string;
}
export enum FilterByType{
None,
XML,
ListMetaphoreID,
}
export class Group{
Type:GroupByType;
ColumnName:string;
ParentValue:string;
Text:string;
Serialize:string;
}
export enum GroupByType{
None,
Grouped,
Expanded,
}
export class CResMsgGetProblemByCriteria{
lnTotalCount:number;
oContextInformation:CContextInformation;
oProblemView:ObservableCollection<ProblemView>;
}
export class CReqMsgGetProblemByCriteria_LE{
oContextBC:HealthIssueContext;
oProblemSearchBC:ProblemSearchCriteria;
oContextInformation:CContextInformation;
}
export class CResMsgGetProblemByCriteria_LE{
lnTotalCount:number;
oContextInformation:CContextInformation;
oProblemView:ObservableCollection<ProblemView>;
}
export class CReqMsgGetProblemMultiValues{
sProblemOIDBC:string;
cIsBodySiteBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetProblemMultiValues{
oContextInformation:CContextInformation;
oProblemMVal:ObservableCollection<ProblemMultiValues>;
}
export class CReqMsgGetProblemLinks{
sProblemOIDBC:string;
IsTreeViewBC:boolean;
sPatientOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetProblemLinks{
oContextInformation:CContextInformation;
oProblemLink:ObservableCollection<ProblemLink>;
}
export class CReqMsgGetProblemLinks_LE{
sProblemOIDBC:string;
IsTreeViewBC:boolean;
sCultureBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetProblemLinks_LE{
oContextInformation:CContextInformation;
oProblemLink:ObservableCollection<ProblemLink>;
}
export class CReqMsgGetPrcSFSProblems{
oRequestBC:CReqProblemListView;
oContextInformation:CContextInformation;
}
export class CResMsgGetPrcSFSProblems{
oContextInformation:CContextInformation;
PatientProblemProcedures:ObservableCollection<PatientProblemPrc>;
}
export class CReqMsgGetProblemBiLinks{
sProblemOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetProblemBiLinks{
oContextInformation:CContextInformation;
oProblemLink:ObservableCollection<ProblemLink>;
}
export class CReqMsgGetProblemDistributionList{
sProblemOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetProblemDistributionList{
oContextInformation:CContextInformation;
oProblemDistribute:ObservableCollection<DistributionList>;
}
export class CReqMsgGetProblemStatuses{
sProblemOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetProblemStatuses{
oContextInformation:CContextInformation;
oHealthIssueStatus:ObservableCollection<HealthIssueStatus>;
}
export class CReqMsgGetProblemEncounter{
sProblemOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetProblemEncounter{
oContextInformation:CContextInformation;
oEncounter:ObservableCollection<PatientEncounter>;
}
export class CReqMsgGetPOMREncounterEpisode{
ProblemOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetPOMREncounterEpisode{
oContextInformation:CContextInformation;
objEncounterEpisode:ObservableCollection<ProblemEncounterEpisode>;
}
export class CReqMsgGetScopeDetails{
ProblemOIDBC:number;
IncludeChildEncountersBC:boolean;
CultureBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetScopeDetails{
oContextInformation:CContextInformation;
ScopeDetails:ObservableCollection<ProblemScopeDetail>;
}
export class CReqMsgGetProblemContextDetails{
oRequestBC:RequestContextDetail;
oContextInformation:CContextInformation;
}
export class CResMsgGetProblemContextDetails{
oContextInformation:CContextInformation;
ScopeDetails:ObservableCollection<ProblemContextDetail>;
}
export class CReqMsgGetPatientScopeDetails{
oRequestBC:RequestScopeDetail;
oContextInformation:CContextInformation;
}
export class CResMsgGetPatientScopeDetails{
oContextInformation:CContextInformation;
ScopeDetails:ObservableCollection<ProblemScopeDetail>;
}
export class CReqMsgGetProblemHistory{
sProblemOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetProblemHistory{
oContextInformation:CContextInformation;
oProblemHistory:ObservableCollection<HealthIssueHistory>;
}
export class CReqMsgGetProblemBodySite{
sProblemOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetProblemBodySite{
oContextInformation:CContextInformation;
oProblemBS:ObservableCollection<ProblemBodySite>;
}
export class CReqMsgGetProblemInfoByPatEnc{
PatientOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetProblemInfoByPatEnc{
oContextInformation:CContextInformation;
oProblem:ObservableCollection<Problem>;
}
export class CReqMsgCheckProblemAssociate{
PatientOIDBC:number;
ProblemOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgCheckProblemAssociate{
lnIsLinkAvble:number;
oContextInformation:CContextInformation;
}
export class CReqMsgGetProblemCodingView{
PatientOIDBC:number;
EncounterOIDBC:number;
PageSizeBC:number;
PageIndexBC:number;
ScopeCodeBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetProblemCodingView{
oContextInformation:CContextInformation;
oCodingCNSProblem:ObservableCollection<CodingCNSProblem>;
}
export class CReqMsgCheckDuplicateFetusPrb{
oContextBC:HealthIssueContext;
sProblemTypeBC:string;
sProblemNameBC:string;
sScopeBC:string;
lnFetalDetailOidBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgCheckDuplicateFetusPrb{
isDuplicate:boolean;
lnErrorID:number;
oContextInformation:CContextInformation;
}
export class CReqMsgGetProblemDetailsByFetalOid{
lnFetalDetailoidBC:number;
lnPatientOidBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetProblemDetailsByFetalOid{
oContextInformation:CContextInformation;
oDetails:ObservableCollection<ProblemDetails>;
}
export class CReqMsgSendAuthoriseProblem{
oContextInformation:CContextInformation;
oArrHISendAuthorisationBC:ObservableCollection<HISendAuthorisation>;
}
export class CResMsgSendAuthoriseProblem{
oContextInformation:CContextInformation;
}
export class CReqMsgAuthoriseProblem{
oContextInformation:CContextInformation;
oarrHIPrbAuthorisationBC:ObservableCollection<HIPrbAuthorisation>;
}
export class HIPrbAuthorisation{
objProblemDetails:ProblemDetails;
objHIAuthorisation:HIAuthorisation;
}
export class HIAuthorisation{
OutcomeCode:string;
ReasonCode:string;
ReasonText:string;
Comments:string;
SenderOid:number;
SenderName:string;
HIName:string;
}
export class CResMsgAuthoriseProblem{
oContextInformation:CContextInformation;
}
export class CReqMsgGetProblemListByOIDs{
oHIDetBC:HealthIssueDetails;
oContextInformation:CContextInformation;
}
export class HealthIssueDetails{
PatientOID:number;
HIOIDs:string;
HIOID:number;
HIType:string;
HIName:string;
OrgOID:number;
HIStatus:string;
LastModifiedAt:DateTime;
EncounterOID:number;
OnsetDTTM:DateTime;
OnsetDTTMFormat:string;
UserOID:number;
EncMainIdentifier:string;
StatusReasonCode:string;
AllEncEpiCode:string;
AllEncEpiText:string;
ScopeDetails:string;
ConfidenceLevelText:string;
ConfidenceLevelCode:string;
InformationSourceText:string;
InformationSourceCode:string;
RiskToText:string;
RiskToCode:string;
oSeverityReactions:ObservableCollection<SeverityReactions>;
}
export class SeverityReactions{
SeverityText:string;
SeverityCode:string;
SeverityTerm:string;
ReactionText:string;
ReactionCode:string;
ReactionTerm:string;
Weightage:number;
}
export class CResMsgGetProblemListByOIDs{
oContextInformation:CContextInformation;
oArrHIDets:ObservableCollection<HealthIssueDetails>;
}
export class CReqMsgGetProblemCPPView{
oCPPCriteriaBC:CPPCriteria;
oContextInformation:CContextInformation;
}
export class CResMsgGetProblemCPPView{
nRecordCnt:number;
oContextInformation:CContextInformation;
oCPPProblem:ObservableCollection<CPPProblem>;
}
export class CReqMsgGetHealthIssueCodeGroup{
sEncounterOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetHealthIssueCodeGroup{
oContextInformation:CContextInformation;
oHealthIssueCodeGroup:ObservableCollection<HealthIssueCodeGroup>;
}
export class CReqMsgGetPOMRProblemsInPages{
oContextBC:HealthIssueContext;
oProblemSearchBC:ProblemSearchCriteria;
oContextInformation:CContextInformation;
}
export class CResMsgGetPOMRProblemsInPages{
oContextInformation:CContextInformation;
oProblemView_Paging:ObservableCollection<ProblemView>;
}
export class CReqMsgGetPOMRListView{
oReqProblemListViewBC:CReqProblemListView;
oContextInformation:CContextInformation;
}
export class CResMsgGetPOMRListView{
objProblemListView:ProblemListView;
oContextInformation:CContextInformation;
}
export class CReqMsgPOMRLinkProblem{
oContextBC:HealthIssueContext;
sProblemOIDBC:string;
HasLinkBC:string;
dttmConcurrencyBC:DateTime;
oContextInformation:CContextInformation;
oProblemLinkBC:ObservableCollection<ProblemLink>;
}
export class CResMsgPOMRLinkProblem{
oContextInformation:CContextInformation;
}
export class CReqMsgPOMRLinkWorkinglistProblem{
oContextBC:HealthIssueContext;
sModeBC:string;
sWorkingStatusBC:string;
sProblemOIDBC:string;
dttmConcurrencyBC:DateTime;
oContextInformation:CContextInformation;
}
export class CResMsgPOMRLinkWorkinglistProblem{
oContextInformation:CContextInformation;
}
export class CReqMsgInsertScopeDetails{
ProblemOIDBC:number;
oContextInformation:CContextInformation;
oProblemScopeDetailBC:ObservableCollection<ProblemScopeDetail>;
}
export class CResMsgInsertScopeDetails{
oContextInformation:CContextInformation;
}
export class CReqMsgUpdateScopeDetails{
ProblemOIDBC:number;
oContextInformation:CContextInformation;
oProblemScopeDetailBC:ObservableCollection<ProblemScopeDetail>;
}
export class CResMsgUpdateScopeDetails{
oContextInformation:CContextInformation;
}
export class CReqMsgInsertScopeHistory{
ProblemOIDBC:number;
ProblemScopeOIDsBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgInsertScopeHistory{
oContextInformation:CContextInformation;
}
export class CReqMsgGetWorkingProblemDetails{
PatientOIDBC:number;
ProblemOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetWorkingProblemDetails{
oContextInformation:CContextInformation;
ProblemWorkListDetails:ObservableCollection<ProblemWorkingListDetail>;
}
export class CReqMsgCheckProblemModified{
ProblemOIDBC:number;
LastModifiedDTTMBC:DateTime;
oContextInformation:CContextInformation;
}
export class CResMsgCheckProblemModified{
IsPBMModified:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgListProblemProcedures{
objPRMProblemProcedureBC:PRMProblemProcedure;
oContextInformation:CContextInformation;
}
export class CResMsgListProblemProcedures{
oContextInformation:CContextInformation;
oAryProcedureDetails:ObservableCollection<ProcedureDetails>;
}
export class CReqMsgGetEpisodeDetailsForEncLE{
PatientOIDBC:number;
sPbmAllencepiBC:string;
sProblemScopeBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetEpisodeDetailsForEncLE{
EpisodeOID:number;
EpisodeCode:string;
oContextInformation:CContextInformation;
}
export class CReqMsgGetUnMergeProblemConflict{
PrimaryPatientOidBC:number;
SecondaryPatientOidBC:number;
dtMergeDTTMBC:DateTime;
oContextInformation:CContextInformation;
MovedRefOidsBC:ObservableCollection<number>;
}
export class CResMsgGetUnMergeProblemConflict{
conflict:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgProblemManagementAdapter{
ObjReqObjManageProblemAdapterBC:ReqObjManageProblemAdapter;
oContextInformation:CContextInformation;
}
export class ReqObjManageProblemAdapter{
lPatientOID:number;
lProblemOID:number;
lScopeOId:number;
lOldScopeOId:number;
sScopeType:string;
lUserOId:number;
sProblemName:string;
sProblemCode:string;
dOperationDateTime:DateTime;
sCodingSchemeName:string;
sCodingSchemeVersion:string;
sCDTYPCode:string;
sTermID:string;
IdentifyingOid:number;
IdentifyingType:string;
Status:string;
Activity:string;
AlertMsgEvntOptions:AlertMessageEventOptions;
}
export enum AlertMessageEventOptions{
Default,
Yes,
No,
Cancel,
Ok,
}
export class CResMsgProblemManagementAdapter{
ObjResObjManageProblemAdapter:ResObjManageProblemAdapter;
oContextInformation:CContextInformation;
}
export class ResObjManageProblemAdapter{
lProblemOID:number;
lErrorID:number;
ObjException:string;
}
export class CReqMsgGetProblemByLink{
ObjReqObjManageProblemAdapterBC:ReqObjManageProblemAdapter;
oContextInformation:CContextInformation;
}
export class CResMsgGetProblemByLink{
ObjResProblem:Problem;
oContextInformation:CContextInformation;
}
export class CReqMsgGetProblemByEpisode{
lnPatientOidBC:number;
lnEpisodeOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetProblemByEpisode{
oContextInformation:CContextInformation;
oPrbDetails:ObservableCollection<Problem>;
}
export class CReqMsgGetProblemForSummaryView{
objReqSummaryViewBC:lzoSummaryInputCriteria;
oContextInformation:CContextInformation;
}
export class lzoSummaryInputCriteria{
OID:number;
PatientOID:number;
DomainName:string;
LorenzoCulture:string;
CodingSchemeName:string;
CodingSchemeVersion:string;
RoleProfileOID:number;
CareServiceOID:string;
ServicePointOID:string;
UserOID:string;
IsSensitive:boolean;
IncludeClinicianSeal:string;
IncludeOwnSeal:string;
IncludeOtherSeal:string;
CareProviderOID:number;
HealthOrganizationOID:number;
objSVFilter:lzoSummaryFilter;
ViewMode:string;
RecordCount:number;
IFMDataItems:string;
}
export class lzoSummaryFilter{
EpisodeEncounterOIDCollection:string;
EncounterOID:number;
EpisodeOID:number;
RecCount:number;
EpisodeLatestEncounterDetails:string;
}
export class CResMsgGetProblemForSummaryView{
oContextInformation:CContextInformation;
objProblemDetails:ObservableCollection<SVProblemDetails>;
}
export class lzoSummaryViewOut{
OID:string;
HasStruckedOut:boolean;
SealImage:string;
setypcode:string;
SealCount:number;
SealTypeText:string;
sErrorCode:string;
sErrorMessage:string;
}
export class SVProblemDetails extends lzoSummaryViewOut{
ProbCode:string;
ProbName:string;
ProbType:string;
ProbDesc:string;
ProbScope:string;
ProbOnSetDt:string;
ProbStatus:string;
ProbIsMainProc:string;
ProbProcCode:string;
ProbProcName:string;
ProbProcPerformCode:string;
ProbProcPerformDTTM:string;
ProbProcBdSiteLate:string;
ProbBdSiteDet:string;
ProbCourse:string;
ProbCertainty:string;
ProbSeverity:string;
ProbSubType:string;
ProbOnExpecConclusionDt:string;
ProbExpecDtOfConclusion:DateTime;
ProbHasHistory:string;
ProbOnBehalfOf:string;
ProbCodSchName:string;
ProbCodSchVer:string;
ProbLastModOn:DateTime;
}

 const prototypeList = {"ManageProblemWS.GetProblemByLink":CResMsgGetProblemByLink.prototype ,
"ManageProblemWS.GetProblemByEpisode":CResMsgGetProblemByEpisode.prototype ,
"ManageProblemWS.GetProblemForSummaryView":CResMsgGetProblemForSummaryView.prototype ,
"ManageProblemWS.GetPOMREncounterEpisode":CResMsgGetPOMREncounterEpisode.prototype ,
"ManageProblemWS.GetScopeDetails":CResMsgGetScopeDetails.prototype ,
"ManageProblemWS.GetProblemContextDetails":CResMsgGetProblemContextDetails.prototype ,
"ManageProblemWS.GetPatientScopeDetails":CResMsgGetPatientScopeDetails.prototype ,
"ManageProblemWS.GetProblemHistory":CResMsgGetProblemHistory.prototype ,
"ManageProblemWS.GetProblemBodySite":CResMsgGetProblemBodySite.prototype ,
"ManageProblemWS.GetProblemInfoByPatEnc":CResMsgGetProblemInfoByPatEnc.prototype ,
"ManageProblemWS.CheckProblemAssociate":CResMsgCheckProblemAssociate.prototype ,
"ManageProblemWS.GetProblemCodingView":CResMsgGetProblemCodingView.prototype ,
"ManageProblemWS.CheckDuplicateFetusPrb":CResMsgCheckDuplicateFetusPrb.prototype ,
"ManageProblemWS.GetProblemDetailsByFetalOid":CResMsgGetProblemDetailsByFetalOid.prototype ,
"ManageProblemWS.SendAuthoriseProblem":CResMsgSendAuthoriseProblem.prototype ,
"ManageProblemWS.AuthoriseProblem":CResMsgAuthoriseProblem.prototype ,
"ManageProblemWS.GetProblemListByOIDs":CResMsgGetProblemListByOIDs.prototype ,
"ManageProblemWS.GetProblemCPPView":CResMsgGetProblemCPPView.prototype ,
"ManageProblemWS.GetHealthIssueCodeGroup":CResMsgGetHealthIssueCodeGroup.prototype ,
"ManageProblemWS.GetPOMRProblemsInPages":CResMsgGetPOMRProblemsInPages.prototype ,
"ManageProblemWS.GetPOMRListView":CResMsgGetPOMRListView.prototype ,
"ManageProblemWS.POMRLinkProblem":CResMsgPOMRLinkProblem.prototype ,
"ManageProblemWS.POMRLinkWorkinglistProblem":CResMsgPOMRLinkWorkinglistProblem.prototype ,
"ManageProblemWS.InsertScopeDetails":CResMsgInsertScopeDetails.prototype ,
"ManageProblemWS.UpdateScopeDetails":CResMsgUpdateScopeDetails.prototype ,
"ManageProblemWS.InsertScopeHistory":CResMsgInsertScopeHistory.prototype ,
"ManageProblemWS.GetWorkingProblemDetails":CResMsgGetWorkingProblemDetails.prototype ,
"ManageProblemWS.CheckProblemModified":CResMsgCheckProblemModified.prototype ,
"ManageProblemWS.ListProblemProcedures":CResMsgListProblemProcedures.prototype ,
"ManageProblemWS.GetEpisodeDetailsForEncLE":CResMsgGetEpisodeDetailsForEncLE.prototype ,
"ManageProblemWS.GetUnMergeProblemConflict":CResMsgGetUnMergeProblemConflict.prototype ,
"ManageProblemWS.ProblemManagementAdapter":CResMsgProblemManagementAdapter.prototype ,
"ManageProblemWS.RecordProblem":CResMsgRecordProblem.prototype ,
"ManageProblemWS.RecordProblem_LE":CResMsgRecordProblem_LE.prototype ,
"ManageProblemWS.ModifyProblem":CResMsgModifyProblem.prototype ,
"ManageProblemWS.ModifyProblem_LE":CResMsgModifyProblem_LE.prototype ,
"ManageProblemWS.LinkProblem":CResMsgLinkProblem.prototype ,
"ManageProblemWS.LinkProblem_LE":CResMsgLinkProblem_LE.prototype ,
"ManageProblemWS.DistributeProblem":CResMsgDistributeProblem.prototype ,
"ManageProblemWS.DistributeProblem_LE":CResMsgDistributeProblem_LE.prototype ,
"ManageProblemWS.CloseProblem":CResMsgCloseProblem.prototype ,
"ManageProblemWS.CloseProblem_LE":CResMsgCloseProblem_LE.prototype ,
"ManageProblemWS.ReopenProblem":CResMsgReopenProblem.prototype ,
"ManageProblemWS.ReopenProblem_LE":CResMsgReopenProblem_LE.prototype ,
"ManageProblemWS.StrikeoutProblem":CResMsgStrikeoutProblem.prototype ,
"ManageProblemWS.StrikeoutProblem_LE":CResMsgStrikeoutProblem_LE.prototype ,
"ManageProblemWS.CheckDuplicateProblem":CResMsgCheckDuplicateProblem.prototype ,
"ManageProblemWS.CheckDuplicateProblem_LE":CResMsgCheckDuplicateProblem_LE.prototype ,
"ManageProblemWS.GetProblemInfo":CResMsgGetProblemInfo.prototype ,
"ManageProblemWS.GetProblemInfo_LE":CResMsgGetProblemInfo_LE.prototype ,
"ManageProblemWS.GetProblemByCriteria":CResMsgGetProblemByCriteria.prototype ,
"ManageProblemWS.GetProblemByCriteria_LE":CResMsgGetProblemByCriteria_LE.prototype ,
"ManageProblemWS.GetProblemMultiValues":CResMsgGetProblemMultiValues.prototype ,
"ManageProblemWS.GetProblemLinks":CResMsgGetProblemLinks.prototype ,
"ManageProblemWS.GetProblemLinks_LE":CResMsgGetProblemLinks_LE.prototype ,
"ManageProblemWS.GetPrcSFSProblems":CResMsgGetPrcSFSProblems.prototype ,
"ManageProblemWS.GetProblemBiLinks":CResMsgGetProblemBiLinks.prototype ,
"ManageProblemWS.GetProblemDistributionList":CResMsgGetProblemDistributionList.prototype ,
"ManageProblemWS.GetProblemStatuses":CResMsgGetProblemStatuses.prototype ,
"ManageProblemWS.GetProblemEncounter":CResMsgGetProblemEncounter.prototype ,

CReqMsgRecordProblem : { 
oContextInformation:CContextInformation.prototype ,
oProblemDetailsBC:ProblemDetails.prototype ,

 },ProblemDetails : { 
oRequestScopeDetails:RequestScopeDetail.prototype ,
oHealthStatus:HealthIssueStatus.prototype ,
oProblemContext:HealthIssueContext.prototype ,
oProblem:Problem.prototype ,
oProblemMVal:ProblemMultiValues.prototype ,
oPatientSeal:PatientSeal.prototype ,
oProblemLink:ProblemLink.prototype ,
oProblemDistribute:DistributionList.prototype ,
oPRBSnomedCodes:HealthIssueCode.prototype ,
oPatientBodySite:ProblemBodySite.prototype ,
oPRBAlternateCodes:AltCodingSchemeData.prototype ,

 },SealNotifyMetaData : { 
UserLoggedIn:SealNotifyUserLoggedIn.prototype ,

 },SealNotifyPacket : { 
MetaData:SealNotifyMetaData.prototype ,
Message:SealNotifyMessage.prototype ,

 },SealReportMessage : { 
SealAccessor:SealGroupAccessor.prototype ,

 },SealReportMetaData : { 
UserLoggedIn:SealReportUserLoggedIn.prototype ,

 },SealReportPacket : { 
MetaData:SealReportMetaData.prototype ,
Message:SealReportMessage.prototype ,

 },SealPSISMessage : { 
SealReportPacket:SealReportPacket.prototype ,
SealReportInfo:SealReportInfo.prototype ,
SealNotifyPacket:SealNotifyPacket.prototype ,
SealAuthor:SealAuthor.prototype ,

 },PatientSeal : { 
sSealPsisMess:SealPSISMessage.prototype ,
SealPSISMessage:SealPSISMessage.prototype ,
patientSealAccessGroup:SealAccessGroup.prototype ,
PatientSealAccessUsers:SealAccessUsers.prototype ,

 },User : { 
oAuditInfo:AuditInfo.prototype ,

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

 },HealthIssueStatus : { 
oProblemScopeDetail:ProblemScopeDetail.prototype ,

 },ProblemScopeDetail : { 
Child:ProblemScopeDetail.prototype ,

 },LocationMask : { 
MaskInfo:MaskInfo.prototype ,

 },Team : { 
TeamOrganisation:ObjectInfo.prototype ,

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

 },EnterpriseWorkgroup : { 
oWorkgroupUser:LRWorkgroupUser.prototype ,

 },LRWorkgroupUser : { 
UserDetails:UserLoggedIn.prototype ,

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

 },CareService : { 
oEntWorkGroup:EnterpriseWorkgroup.prototype ,
oParentCareService:ParentService.prototype ,
oAuditInfo:AuditInfo.prototype ,

 },Problem : { 
ProblemRecordedBy:Person.prototype ,
ProblemModifiedBy:Person.prototype ,
ProblemOnBehalfOf:Person.prototype ,
ProblemLinks:ProblemLink_FHIRAPI.prototype ,
PrbStatus:CPatientProblemStatus_API.prototype ,
ScopeDetails:ProblemScopeDetail.prototype ,
Bodysite:ProblemBodySite.prototype ,
GroupByResult:GroupResult.prototype ,

 },ProblemSearchCriteria : { 
oProblemCriteria:SearchCriteria.prototype ,

 },ProblemView : { 
oProblemProcedure:ProblemProcedure.prototype ,
oPatientEncounter:PatientEncounter.prototype ,
oProvenance:Provenance.prototype ,
oTerminology:Terminology.prototype ,
oPatientSeal:PatientSeal.prototype ,
objEpisode:Episode.prototype ,

 },Provenance : { 
ObjobservedBy:dpUser.prototype ,
ObjRecordedBy:dpUser.prototype ,

 },Episode : { 
PatientSeal:PatientSeal.prototype ,
oMsgingAttributes:MessagingAttributes.prototype ,
arrobjEpsProblem:EpisodeProblem.prototype ,

 },ProcedureDetails : { 
oContext:HealthIssueContext.prototype ,
oProcedure:Procedure.prototype ,
oMainProcedurePRB:MainProcedureProblem.prototype ,
oProcedureBS:ProcedureBodySite.prototype ,
oProcedureCP:ProcedureCareProvider.prototype ,
oProcedurePRB:ProcedureProblem.prototype ,
oPRCSnomedCodes:HealthIssueCode.prototype ,
oPRCAlternateCodes:AltCodingSchemeData.prototype ,

 },Procedure : { 
GroupByResult:GroupResult.prototype ,

 },CReqProblemListView : { 
oPatientSealCriteria:PatientSealCriteria.prototype ,

 },ProblemContextDetail : { 
Child:ProblemScopeDetail.prototype ,

 },HISendAuthorisation : { 
oHIContext:HealthIssueContext.prototype ,
objHISendAuthorisationdt:HISendAuthorisationDetail.prototype ,

 },ProblemListView : { 
MasterList:ProblemList.prototype ,
WorkingList:ProblemList.prototype ,

 },ProblemList : { 
ChildProblems:ProblemList.prototype ,
ScopeDetails:ProblemScopeDetail.prototype ,

 },CResMsgRecordProblem : { 
oContextInformation:CContextInformation.prototype ,
oReturnProbDetails:ReturnProblemDetails.prototype ,

 },ReturnProblemDetails : { 
oarrProcedureOut:ProcedureOut.prototype ,

 },CReqMsgRecordProblem_LE : { 
oProblemDetailsBC:ProblemDetails.prototype ,
oContextInformation:CContextInformation.prototype ,
oLinkedProcedureDetailsBC:ProcedureDetails.prototype ,

 },CResMsgRecordProblem_LE : { 
oContextInformation:CContextInformation.prototype ,
oReturnProblemDetails:ReturnProblemDetails.prototype ,

 },CReqMsgModifyProblem : { 
oProblemDetailsBC:ProblemDetails.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgModifyProblem : { 
oReturnProbDetails:ReturnProblemDetails.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgModifyProblem_LE : { 
oProblemDetailsBC:ProblemDetails.prototype ,
oContextInformation:CContextInformation.prototype ,
oLinkedProcedureDetailsBC:ProcedureDetails.prototype ,

 },CResMsgModifyProblem_LE : { 
oContextInformation:CContextInformation.prototype ,
oReturnProblemDetails:ReturnProblemDetails.prototype ,

 },CReqMsgLinkProblem : { 
oContextBC:HealthIssueContext.prototype ,
oContextInformation:CContextInformation.prototype ,
oProblemLinkBC:ProblemLink.prototype ,

 },CResMsgLinkProblem : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgLinkProblem_LE : { 
oContextBC:HealthIssueContext.prototype ,
oContextInformation:CContextInformation.prototype ,
oProblemLinkBC:ProblemLink.prototype ,

 },CResMsgLinkProblem_LE : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgDistributeProblem : { 
oContextBC:HealthIssueContext.prototype ,
oContextInformation:CContextInformation.prototype ,
oProblemDistributeBC:DistributionList.prototype ,

 },CResMsgDistributeProblem : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgDistributeProblem_LE : { 
oContextBC:HealthIssueContext.prototype ,
oContextInformation:CContextInformation.prototype ,
oProblemDistributeBC:DistributionList.prototype ,

 },CResMsgDistributeProblem_LE : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgCloseProblem : { 
oContextBC:HealthIssueContext.prototype ,
oHealthIssueStatusBC:HealthIssueStatus.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgCloseProblem : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgCloseProblem_LE : { 
oContextBC:HealthIssueContext.prototype ,
oHealthIssueStatusBC:HealthIssueStatus.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgCloseProblem_LE : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgReopenProblem : { 
oContextBC:HealthIssueContext.prototype ,
oHealthIssueStatusBC:HealthIssueStatus.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgReopenProblem : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgReopenProblem_LE : { 
oContextBC:HealthIssueContext.prototype ,
oHealthIssueStatusBC:HealthIssueStatus.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgReopenProblem_LE : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgStrikeoutProblem : { 
oContextBC:HealthIssueContext.prototype ,
oHealthIssueStatusBC:HealthIssueStatus.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgStrikeoutProblem : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgStrikeoutProblem_LE : { 
oContextBC:HealthIssueContext.prototype ,
oHealthIssueStatusBC:HealthIssueStatus.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgStrikeoutProblem_LE : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgCheckDuplicateProblem : { 
oContextBC:HealthIssueContext.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgCheckDuplicateProblem : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgCheckDuplicateProblem_LE : { 
oContextBC:HealthIssueContext.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgCheckDuplicateProblem_LE : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetProblemInfo : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProblemInfo : { 
oProblem:Problem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetProblemInfo_LE : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProblemInfo_LE : { 
oProblem:Problem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetProblemByCriteria : { 
oContextBC:HealthIssueContext.prototype ,
oProblemSearchBC:ProblemSearchCriteria.prototype ,
pageElementBC:PagingDynamicSQL.prototype ,
oContextInformation:CContextInformation.prototype ,

 },PagingDynamicSQL : { 
FilterBy:Filter.prototype ,
GroupBy:Group.prototype ,

 },CResMsgGetProblemByCriteria : { 
oContextInformation:CContextInformation.prototype ,
oProblemView:ProblemView.prototype ,

 },CReqMsgGetProblemByCriteria_LE : { 
oContextBC:HealthIssueContext.prototype ,
oProblemSearchBC:ProblemSearchCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProblemByCriteria_LE : { 
oContextInformation:CContextInformation.prototype ,
oProblemView:ProblemView.prototype ,

 },CReqMsgGetProblemMultiValues : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProblemMultiValues : { 
oContextInformation:CContextInformation.prototype ,
oProblemMVal:ProblemMultiValues.prototype ,

 },CReqMsgGetProblemLinks : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProblemLinks : { 
oContextInformation:CContextInformation.prototype ,
oProblemLink:ProblemLink.prototype ,

 },CReqMsgGetProblemLinks_LE : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProblemLinks_LE : { 
oContextInformation:CContextInformation.prototype ,
oProblemLink:ProblemLink.prototype ,

 },CReqMsgGetPrcSFSProblems : { 
oRequestBC:CReqProblemListView.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPrcSFSProblems : { 
oContextInformation:CContextInformation.prototype ,
PatientProblemProcedures:PatientProblemPrc.prototype ,

 },CReqMsgGetProblemBiLinks : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProblemBiLinks : { 
oContextInformation:CContextInformation.prototype ,
oProblemLink:ProblemLink.prototype ,

 },CReqMsgGetProblemDistributionList : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProblemDistributionList : { 
oContextInformation:CContextInformation.prototype ,
oProblemDistribute:DistributionList.prototype ,

 },CReqMsgGetProblemStatuses : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProblemStatuses : { 
oContextInformation:CContextInformation.prototype ,
oHealthIssueStatus:HealthIssueStatus.prototype ,

 },CReqMsgGetProblemEncounter : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProblemEncounter : { 
oContextInformation:CContextInformation.prototype ,
oEncounter:PatientEncounter.prototype ,

 },CReqMsgGetPOMREncounterEpisode : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPOMREncounterEpisode : { 
oContextInformation:CContextInformation.prototype ,
objEncounterEpisode:ProblemEncounterEpisode.prototype ,

 },CReqMsgGetScopeDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetScopeDetails : { 
oContextInformation:CContextInformation.prototype ,
ScopeDetails:ProblemScopeDetail.prototype ,

 },CReqMsgGetProblemContextDetails : { 
oRequestBC:RequestContextDetail.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProblemContextDetails : { 
oContextInformation:CContextInformation.prototype ,
ScopeDetails:ProblemContextDetail.prototype ,

 },CReqMsgGetPatientScopeDetails : { 
oRequestBC:RequestScopeDetail.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPatientScopeDetails : { 
oContextInformation:CContextInformation.prototype ,
ScopeDetails:ProblemScopeDetail.prototype ,

 },CReqMsgGetProblemHistory : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProblemHistory : { 
oContextInformation:CContextInformation.prototype ,
oProblemHistory:HealthIssueHistory.prototype ,

 },CReqMsgGetProblemBodySite : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProblemBodySite : { 
oContextInformation:CContextInformation.prototype ,
oProblemBS:ProblemBodySite.prototype ,

 },CReqMsgGetProblemInfoByPatEnc : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProblemInfoByPatEnc : { 
oContextInformation:CContextInformation.prototype ,
oProblem:Problem.prototype ,

 },CReqMsgCheckProblemAssociate : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgCheckProblemAssociate : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetProblemCodingView : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProblemCodingView : { 
oContextInformation:CContextInformation.prototype ,
oCodingCNSProblem:CodingCNSProblem.prototype ,

 },CReqMsgCheckDuplicateFetusPrb : { 
oContextBC:HealthIssueContext.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgCheckDuplicateFetusPrb : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetProblemDetailsByFetalOid : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProblemDetailsByFetalOid : { 
oContextInformation:CContextInformation.prototype ,
oDetails:ProblemDetails.prototype ,

 },CReqMsgSendAuthoriseProblem : { 
oContextInformation:CContextInformation.prototype ,
oArrHISendAuthorisationBC:HISendAuthorisation.prototype ,

 },CResMsgSendAuthoriseProblem : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgAuthoriseProblem : { 
oContextInformation:CContextInformation.prototype ,
oarrHIPrbAuthorisationBC:HIPrbAuthorisation.prototype ,

 },HIPrbAuthorisation : { 
objProblemDetails:ProblemDetails.prototype ,
objHIAuthorisation:HIAuthorisation.prototype ,

 },CResMsgAuthoriseProblem : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetProblemListByOIDs : { 
oHIDetBC:HealthIssueDetails.prototype ,
oContextInformation:CContextInformation.prototype ,

 },HealthIssueDetails : { 
oSeverityReactions:SeverityReactions.prototype ,

 },CResMsgGetProblemListByOIDs : { 
oContextInformation:CContextInformation.prototype ,
oArrHIDets:HealthIssueDetails.prototype ,

 },CReqMsgGetProblemCPPView : { 
oCPPCriteriaBC:CPPCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProblemCPPView : { 
oContextInformation:CContextInformation.prototype ,
oCPPProblem:CPPProblem.prototype ,

 },CReqMsgGetHealthIssueCodeGroup : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetHealthIssueCodeGroup : { 
oContextInformation:CContextInformation.prototype ,
oHealthIssueCodeGroup:HealthIssueCodeGroup.prototype ,

 },CReqMsgGetPOMRProblemsInPages : { 
oContextBC:HealthIssueContext.prototype ,
oProblemSearchBC:ProblemSearchCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPOMRProblemsInPages : { 
oContextInformation:CContextInformation.prototype ,
oProblemView_Paging:ProblemView.prototype ,

 },CReqMsgGetPOMRListView : { 
oReqProblemListViewBC:CReqProblemListView.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPOMRListView : { 
objProblemListView:ProblemListView.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgPOMRLinkProblem : { 
oContextBC:HealthIssueContext.prototype ,
oContextInformation:CContextInformation.prototype ,
oProblemLinkBC:ProblemLink.prototype ,

 },CResMsgPOMRLinkProblem : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgPOMRLinkWorkinglistProblem : { 
oContextBC:HealthIssueContext.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgPOMRLinkWorkinglistProblem : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgInsertScopeDetails : { 
oContextInformation:CContextInformation.prototype ,
oProblemScopeDetailBC:ProblemScopeDetail.prototype ,

 },CResMsgInsertScopeDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgUpdateScopeDetails : { 
oContextInformation:CContextInformation.prototype ,
oProblemScopeDetailBC:ProblemScopeDetail.prototype ,

 },CResMsgUpdateScopeDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgInsertScopeHistory : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgInsertScopeHistory : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetWorkingProblemDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetWorkingProblemDetails : { 
oContextInformation:CContextInformation.prototype ,
ProblemWorkListDetails:ProblemWorkingListDetail.prototype ,

 },CReqMsgCheckProblemModified : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgCheckProblemModified : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgListProblemProcedures : { 
objPRMProblemProcedureBC:PRMProblemProcedure.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgListProblemProcedures : { 
oContextInformation:CContextInformation.prototype ,
oAryProcedureDetails:ProcedureDetails.prototype ,

 },CReqMsgGetEpisodeDetailsForEncLE : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetEpisodeDetailsForEncLE : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetUnMergeProblemConflict : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetUnMergeProblemConflict : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgProblemManagementAdapter : { 
ObjReqObjManageProblemAdapterBC:ReqObjManageProblemAdapter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgProblemManagementAdapter : { 
ObjResObjManageProblemAdapter:ResObjManageProblemAdapter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetProblemByLink : { 
ObjReqObjManageProblemAdapterBC:ReqObjManageProblemAdapter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProblemByLink : { 
ObjResProblem:Problem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetProblemByEpisode : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProblemByEpisode : { 
oContextInformation:CContextInformation.prototype ,
oPrbDetails:Problem.prototype ,

 },CReqMsgGetProblemForSummaryView : { 
objReqSummaryViewBC:lzoSummaryInputCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },lzoSummaryInputCriteria : { 
objSVFilter:lzoSummaryFilter.prototype ,

 },CResMsgGetProblemForSummaryView : { 
oContextInformation:CContextInformation.prototype ,
objProblemDetails:SVProblemDetails.prototype ,

 },CContextInformation : { 
Current:CContextInformation.prototype ,

 },
 }
 
const charPropertyLookup = [
'IsPrimary',
'isMainProcedure',
'MFNBatchStatus',
'IsLegalEntity',
'IsEmailRegWithEncryptService',
'IsAssignmentLocked',
'IsClearAssignment','IsModified','IsLocked',
'IsEncounterUpdate',
'MigrationFlag',
'IsAllowMultiple',
'IsWardAttendance','IsWardInUse','TransferFormRequired',
'IsVisible',
'IsSectionTypeChangeable',
'IsWorkingProblemStatus','IsSignificant','IsConfidential','IsHasHistory','CanStrikeOut','HasLinkProblem','HasFilter','IsDistributed',
'IsGroupBy','SortOrder','ParentSortOrder','SearchType','IncludeInactiveHI','IncludeStruckOutHI','IsOnlyContext',
'IsSealOwner',
'IsMainProcedure',
'IsPatientDeceased',
'CheckDuplicate',
'IsSignedDoc','IsRecentDoc','IsReferenceDoc','IsNote','IsIncident','IsSensitive',
'HasHistory','HasDataFilter',
'HasLinkBC',
'cIsBodySiteBC',
'IncludeClinicianSeal','IncludeOwnSeal','IncludeOtherSeal','ViewMode',]
 