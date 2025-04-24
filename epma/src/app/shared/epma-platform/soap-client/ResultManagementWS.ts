import { int64, int16, int32, uInt16, uInt32, uInt64, byte, long, double, decimal, DelegateArgs, CContextInformation, CLZOObject} from "epma-platform/models";
import { ObservableCollection } from "../models/observable-collection";
import DateTime from "../services/datetime.service";
import { HelperService } from "./helper.service";
export class ResultManagementWSSoapClient{

PrintResultsCompleted: Function;
PrintResultsAsync(oCReqMsgPrintResults:CReqMsgPrintResults ) : void {
  HelperService.Invoke<CReqMsgPrintResults,CResMsgPrintResults,PrintResultsCompletedEventArgs>("ResultManagementWS.PrintResults",oCReqMsgPrintResults,this.PrintResultsCompleted,"sReqOID",new PrintResultsCompletedEventArgs(), prototypeList);
}

GetApplyAllResultCompleted: Function;
GetApplyAllResultAsync(oCReqMsgGetApplyAllResult:CReqMsgGetApplyAllResult ) : void {
  HelperService.Invoke<CReqMsgGetApplyAllResult,CResMsgGetApplyAllResult,GetApplyAllResultCompletedEventArgs>("ResultManagementWS.GetApplyAllResult",oCReqMsgGetApplyAllResult,this.GetApplyAllResultCompleted,"lResultOID",new GetApplyAllResultCompletedEventArgs(), prototypeList);
}

ManageAcknowledgestatusCompleted: Function;
ManageAcknowledgestatusAsync(oCReqMsgManageAcknowledgestatus:CReqMsgManageAcknowledgestatus ) : void {
  HelperService.Invoke<CReqMsgManageAcknowledgestatus,CResMsgManageAcknowledgestatus,ManageAcknowledgestatusCompletedEventArgs>("ResultManagementWS.ManageAcknowledgestatus",oCReqMsgManageAcknowledgestatus,this.ManageAcknowledgestatusCompleted,"oManageResultStatus",new ManageAcknowledgestatusCompletedEventArgs(), prototypeList);
}

GetSeenResultReportCompleted: Function;
GetSeenResultReportAsync(oCReqMsgGetSeenResultReport:CReqMsgGetSeenResultReport ) : void {
  HelperService.Invoke<CReqMsgGetSeenResultReport,CResMsgGetSeenResultReport,GetSeenResultReportCompletedEventArgs>("ResultManagementWS.GetSeenResultReport",oCReqMsgGetSeenResultReport,this.GetSeenResultReportCompleted,"sRequestItemOID",new GetSeenResultReportCompletedEventArgs(), prototypeList);
}

GetResultAcknowledgedReportCompleted: Function;
GetResultAcknowledgedReportAsync(oCReqMsgGetResultAcknowledgedReport:CReqMsgGetResultAcknowledgedReport ) : void {
  HelperService.Invoke<CReqMsgGetResultAcknowledgedReport,CResMsgGetResultAcknowledgedReport,GetResultAcknowledgedReportCompletedEventArgs>("ResultManagementWS.GetResultAcknowledgedReport",oCReqMsgGetResultAcknowledgedReport,this.GetResultAcknowledgedReportCompleted,"sEncType",new GetResultAcknowledgedReportCompletedEventArgs(), prototypeList);
}

GetResultUnAcknowledgedReportCompleted: Function;
GetResultUnAcknowledgedReportAsync(oCReqMsgGetResultUnAcknowledgedReport:CReqMsgGetResultUnAcknowledgedReport ) : void {
  HelperService.Invoke<CReqMsgGetResultUnAcknowledgedReport,CResMsgGetResultUnAcknowledgedReport,GetResultUnAcknowledgedReportCompletedEventArgs>("ResultManagementWS.GetResultUnAcknowledgedReport",oCReqMsgGetResultUnAcknowledgedReport,this.GetResultUnAcknowledgedReportCompleted,"sCareProviderOID",new GetResultUnAcknowledgedReportCompletedEventArgs(), prototypeList);
}

GetResultsListViewByRequestDetailOIDsCompleted: Function;
GetResultsListViewByRequestDetailOIDsAsync(oCReqMsgGetResultsListViewByRequestDetailOIDs:CReqMsgGetResultsListViewByRequestDetailOIDs ) : void {
  HelperService.Invoke<CReqMsgGetResultsListViewByRequestDetailOIDs,CResMsgGetResultsListViewByRequestDetailOIDs,GetResultsListViewByRequestDetailOIDsCompletedEventArgs>("ResultManagementWS.GetResultsListViewByRequestDetailOIDs",oCReqMsgGetResultsListViewByRequestDetailOIDs,this.GetResultsListViewByRequestDetailOIDsCompleted,"pageElement",new GetResultsListViewByRequestDetailOIDsCompletedEventArgs(), prototypeList);
}

GetRequestDetailsViewCompleted: Function;
GetRequestDetailsViewAsync(oCReqMsgGetRequestDetailsView:CReqMsgGetRequestDetailsView ) : void {
  HelperService.Invoke<CReqMsgGetRequestDetailsView,CResMsgGetRequestDetailsView,GetRequestDetailsViewCompletedEventArgs>("ResultManagementWS.GetRequestDetailsView",oCReqMsgGetRequestDetailsView,this.GetRequestDetailsViewCompleted,"oSearch",new GetRequestDetailsViewCompletedEventArgs(), prototypeList);
}

GetResultByResultItemIDCompleted: Function;
GetResultByResultItemIDAsync(oCReqMsgGetResultByResultItemID:CReqMsgGetResultByResultItemID ) : void {
  HelperService.Invoke<CReqMsgGetResultByResultItemID,CResMsgGetResultByResultItemID,GetResultByResultItemIDCompletedEventArgs>("ResultManagementWS.GetResultByResultItemID",oCReqMsgGetResultByResultItemID,this.GetResultByResultItemIDCompleted,"sRequestDetailOID",new GetResultByResultItemIDCompletedEventArgs(), prototypeList);
}

ClearUnseenResultsCompleted: Function;
ClearUnseenResultsAsync(oCReqMsgClearUnseenResults:CReqMsgClearUnseenResults ) : void {
  HelperService.Invoke<CReqMsgClearUnseenResults,CResMsgClearUnseenResults,ClearUnseenResultsCompletedEventArgs>("ResultManagementWS.ClearUnseenResults",oCReqMsgClearUnseenResults,this.ClearUnseenResultsCompleted,"sStatus",new ClearUnseenResultsCompletedEventArgs(), prototypeList);
}

MarkResultsAsSeenCompleted: Function;
MarkResultsAsSeenAsync(oCReqMsgMarkResultsAsSeen:CReqMsgMarkResultsAsSeen ) : void {
  HelperService.Invoke<CReqMsgMarkResultsAsSeen,CResMsgMarkResultsAsSeen,MarkResultsAsSeenCompletedEventArgs>("ResultManagementWS.MarkResultsAsSeen",oCReqMsgMarkResultsAsSeen,this.MarkResultsAsSeenCompleted,"referenceNumbers",new MarkResultsAsSeenCompletedEventArgs(), prototypeList);
}

GetResHisDateCompleted: Function;
GetResHisDateAsync(oCReqMsgGetResHisDate:CReqMsgGetResHisDate ) : void {
  HelperService.Invoke<CReqMsgGetResHisDate,CResMsgGetResHisDate,GetResHisDateCompletedEventArgs>("ResultManagementWS.GetResHisDate",oCReqMsgGetResHisDate,this.GetResHisDateCompleted,"sPatientOID",new GetResHisDateCompletedEventArgs(), prototypeList);
}

GetRequestIntrayFormCompleted: Function;
GetRequestIntrayFormAsync(oCReqMsgGetRequestIntrayForm:CReqMsgGetRequestIntrayForm ) : void {
  HelperService.Invoke<CReqMsgGetRequestIntrayForm,CResMsgGetRequestIntrayForm,GetRequestIntrayFormCompletedEventArgs>("ResultManagementWS.GetRequestIntrayForm",oCReqMsgGetRequestIntrayForm,this.GetRequestIntrayFormCompleted,"sRequestOID",new GetRequestIntrayFormCompletedEventArgs(), prototypeList);
}

GetRMResDtsHistoryCompleted: Function;
GetRMResDtsHistoryAsync(oCReqMsgGetRMResDtsHistory:CReqMsgGetRMResDtsHistory ) : void {
  HelperService.Invoke<CReqMsgGetRMResDtsHistory,CResMsgGetRMResDtsHistory,GetRMResDtsHistoryCompletedEventArgs>("ResultManagementWS.GetRMResDtsHistory",oCReqMsgGetRMResDtsHistory,this.GetRMResDtsHistoryCompleted,"sPatientOID",new GetRMResDtsHistoryCompletedEventArgs(), prototypeList);
}

GetResConfidentialCompleted: Function;
GetResConfidentialAsync(oCReqMsgGetResConfidential:CReqMsgGetResConfidential ) : void {
  HelperService.Invoke<CReqMsgGetResConfidential,CResMsgGetResConfidential,GetResConfidentialCompletedEventArgs>("ResultManagementWS.GetResConfidential",oCReqMsgGetResConfidential,this.GetResConfidentialCompleted,"oReq",new GetResConfidentialCompletedEventArgs(), prototypeList);
}

GetDataFilterForRequestItemCompleted: Function;
GetDataFilterForRequestItemAsync(oCReqMsgGetDataFilterForRequestItem:CReqMsgGetDataFilterForRequestItem ) : void {
  HelperService.Invoke<CReqMsgGetDataFilterForRequestItem,CResMsgGetDataFilterForRequestItem,GetDataFilterForRequestItemCompletedEventArgs>("ResultManagementWS.GetDataFilterForRequestItem",oCReqMsgGetDataFilterForRequestItem,this.GetDataFilterForRequestItemCompleted,"oReq",new GetDataFilterForRequestItemCompletedEventArgs(), prototypeList);
}

GetContextDetailsCompleted: Function;
GetContextDetailsAsync(oCReqMsgGetContextDetails:CReqMsgGetContextDetails ) : void {
  HelperService.Invoke<CReqMsgGetContextDetails,CResMsgGetContextDetails,GetContextDetailsCompletedEventArgs>("ResultManagementWS.GetContextDetails",oCReqMsgGetContextDetails,this.GetContextDetailsCompleted,"oSearch",new GetContextDetailsCompletedEventArgs(), prototypeList);
}

GetAccessRightsCompleted: Function;
GetAccessRightsAsync(oCReqMsgGetAccessRights:CReqMsgGetAccessRights ) : void {
  HelperService.Invoke<CReqMsgGetAccessRights,CResMsgGetAccessRights,GetAccessRightsCompletedEventArgs>("ResultManagementWS.GetAccessRights",oCReqMsgGetAccessRights,this.GetAccessRightsCompleted,"oRequest",new GetAccessRightsCompletedEventArgs(), prototypeList);
}

GetResultDetailsForCDCCompleted: Function;
GetResultDetailsForCDCAsync(oCReqMsgGetResultDetailsForCDC:CReqMsgGetResultDetailsForCDC ) : void {
  HelperService.Invoke<CReqMsgGetResultDetailsForCDC,CResMsgGetResultDetailsForCDC,GetResultDetailsForCDCCompletedEventArgs>("ResultManagementWS.GetResultDetailsForCDC",oCReqMsgGetResultDetailsForCDC,this.GetResultDetailsForCDCCompleted,"oSearch",new GetResultDetailsForCDCCompletedEventArgs(), prototypeList);
}

GetResultsCompleted: Function;
GetResultsAsync(oCReqMsgGetResults:CReqMsgGetResults ) : void {
  HelperService.Invoke<CReqMsgGetResults,CResMsgGetResults,GetResultsCompletedEventArgs>("ResultManagementWS.GetResults",oCReqMsgGetResults,this.GetResultsCompleted,"lResultOID",new GetResultsCompletedEventArgs(), prototypeList);
}

GetBubbleResultInfoCompleted: Function;
GetBubbleResultInfoAsync(oCReqMsgGetBubbleResultInfo:CReqMsgGetBubbleResultInfo ) : void {
  HelperService.Invoke<CReqMsgGetBubbleResultInfo,CResMsgGetBubbleResultInfo,GetBubbleResultInfoCompletedEventArgs>("ResultManagementWS.GetBubbleResultInfo",oCReqMsgGetBubbleResultInfo,this.GetBubbleResultInfoCompleted,"lRequestOIDs",new GetBubbleResultInfoCompletedEventArgs(), prototypeList);
}

EnterResultsCompleted: Function;
EnterResultsAsync(oCReqMsgEnterResults:CReqMsgEnterResults ) : void {
  HelperService.Invoke<CReqMsgEnterResults,CResMsgEnterResults,EnterResultsCompletedEventArgs>("ResultManagementWS.EnterResults",oCReqMsgEnterResults,this.EnterResultsCompleted,"objPatientInvestigationResult",new EnterResultsCompletedEventArgs(), prototypeList);
}

GetFormDefinitionCompleted: Function;
GetFormDefinitionAsync(oCReqMsgGetFormDefinition:CReqMsgGetFormDefinition ) : void {
  HelperService.Invoke<CReqMsgGetFormDefinition,CResMsgGetFormDefinition,GetFormDefinitionCompletedEventArgs>("ResultManagementWS.GetFormDefinition",oCReqMsgGetFormDefinition,this.GetFormDefinitionCompleted,"lRequestItemOID",new GetFormDefinitionCompletedEventArgs(), prototypeList);
}

GetAllResultItemCompleted: Function;
GetAllResultItemAsync(oCReqMsgGetAllResultItem:CReqMsgGetAllResultItem ) : void {
  HelperService.Invoke<CReqMsgGetAllResultItem,CResMsgGetAllResultItem,GetAllResultItemCompletedEventArgs>("ResultManagementWS.GetAllResultItem",oCReqMsgGetAllResultItem,this.GetAllResultItemCompleted,"sResultitemOID",new GetAllResultItemCompletedEventArgs(), prototypeList);
}

GetRequestItemByResultItemIDCompleted: Function;
GetRequestItemByResultItemIDAsync(oCReqMsgGetRequestItemByResultItemID:CReqMsgGetRequestItemByResultItemID ) : void {
  HelperService.Invoke<CReqMsgGetRequestItemByResultItemID,CResMsgGetRequestItemByResultItemID,GetRequestItemByResultItemIDCompletedEventArgs>("ResultManagementWS.GetRequestItemByResultItemID",oCReqMsgGetRequestItemByResultItemID,this.GetRequestItemByResultItemIDCompleted,"lResultItemOID",new GetRequestItemByResultItemIDCompletedEventArgs(), prototypeList);
}

GetResultItemDetailsCompleted: Function;
GetResultItemDetailsAsync(oCReqMsgGetResultItemDetails:CReqMsgGetResultItemDetails ) : void {
  HelperService.Invoke<CReqMsgGetResultItemDetails,CResMsgGetResultItemDetails,GetResultItemDetailsCompletedEventArgs>("ResultManagementWS.GetResultItemDetails",oCReqMsgGetResultItemDetails,this.GetResultItemDetailsCompleted,"lResultItemOID",new GetResultItemDetailsCompletedEventArgs(), prototypeList);
}

GetResultItemDefinitionCompleted: Function;
GetResultItemDefinitionAsync(oCReqMsgGetResultItemDefinition:CReqMsgGetResultItemDefinition ) : void {
  HelperService.Invoke<CReqMsgGetResultItemDefinition,CResMsgGetResultItemDefinition,GetResultItemDefinitionCompletedEventArgs>("ResultManagementWS.GetResultItemDefinition",oCReqMsgGetResultItemDefinition,this.GetResultItemDefinitionCompleted,"lResultItemOID",new GetResultItemDefinitionCompletedEventArgs(), prototypeList);
}

GetCDCDetailsCompleted: Function;
GetCDCDetailsAsync(oCReqMsgGetCDCDetails:CReqMsgGetCDCDetails ) : void {
  HelperService.Invoke<CReqMsgGetCDCDetails,CResMsgGetCDCDetails,GetCDCDetailsCompletedEventArgs>("ResultManagementWS.GetCDCDetails",oCReqMsgGetCDCDetails,this.GetCDCDetailsCompleted,"lResultItemOID",new GetCDCDetailsCompletedEventArgs(), prototypeList);
}

GetNotificationListCompleted: Function;
GetNotificationListAsync(oCReqMsgGetNotificationList:CReqMsgGetNotificationList ) : void {
  HelperService.Invoke<CReqMsgGetNotificationList,CResMsgGetNotificationList,GetNotificationListCompletedEventArgs>("ResultManagementWS.GetNotificationList",oCReqMsgGetNotificationList,this.GetNotificationListCompleted,"lRequestdetailtOID",new GetNotificationListCompletedEventArgs(), prototypeList);
}

ManageResultsCompleted: Function;
ManageResultsAsync(oCReqMsgManageResults:CReqMsgManageResults ) : void {
  HelperService.Invoke<CReqMsgManageResults,CResMsgManageResults,ManageResultsCompletedEventArgs>("ResultManagementWS.ManageResults",oCReqMsgManageResults,this.ManageResultsCompleted,"objPatientInvestigationResult",new ManageResultsCompletedEventArgs(), prototypeList);
}

AcknowledgeResultCompleted: Function;
AcknowledgeResultAsync(oCReqMsgAcknowledgeResult:CReqMsgAcknowledgeResult ) : void {
  HelperService.Invoke<CReqMsgAcknowledgeResult,CResMsgAcknowledgeResult,AcknowledgeResultCompletedEventArgs>("ResultManagementWS.AcknowledgeResult",oCReqMsgAcknowledgeResult,this.AcknowledgeResultCompleted,"oManageResultStatus",new AcknowledgeResultCompletedEventArgs(), prototypeList);
}

AcknowledgeResultsCompleted: Function;
AcknowledgeResultsAsync(oCReqMsgAcknowledgeResults:CReqMsgAcknowledgeResults ) : void {
  HelperService.Invoke<CReqMsgAcknowledgeResults,CResMsgAcknowledgeResults,AcknowledgeResultsCompletedEventArgs>("ResultManagementWS.AcknowledgeResults",oCReqMsgAcknowledgeResults,this.AcknowledgeResultsCompleted,"acknowledgeInfo",new AcknowledgeResultsCompletedEventArgs(), prototypeList);
}

AuthorizeResultCompleted: Function;
AuthorizeResultAsync(oCReqMsgAuthorizeResult:CReqMsgAuthorizeResult ) : void {
  HelperService.Invoke<CReqMsgAuthorizeResult,CResMsgAuthorizeResult,AuthorizeResultCompletedEventArgs>("ResultManagementWS.AuthorizeResult",oCReqMsgAuthorizeResult,this.AuthorizeResultCompleted,"oManageResultStatus",new AuthorizeResultCompletedEventArgs(), prototypeList);
}

CancelResultCompleted: Function;
CancelResultAsync(oCReqMsgCancelResult:CReqMsgCancelResult ) : void {
  HelperService.Invoke<CReqMsgCancelResult,CResMsgCancelResult,CancelResultCompletedEventArgs>("ResultManagementWS.CancelResult",oCReqMsgCancelResult,this.CancelResultCompleted,"oManageResultStatus",new CancelResultCompletedEventArgs(), prototypeList);
}

GetCIBubbleResultInfoCompleted: Function;
GetCIBubbleResultInfoAsync(oCReqMsgGetCIBubbleResultInfo:CReqMsgGetCIBubbleResultInfo ) : void {
  HelperService.Invoke<CReqMsgGetCIBubbleResultInfo,CResMsgGetCIBubbleResultInfo,GetCIBubbleResultInfoCompletedEventArgs>("ResultManagementWS.GetCIBubbleResultInfo",oCReqMsgGetCIBubbleResultInfo,this.GetCIBubbleResultInfoCompleted,"lRequestOIDs",new GetCIBubbleResultInfoCompletedEventArgs(), prototypeList);
}

GetDIRnRParamValuesCompleted: Function;
GetDIRnRParamValuesAsync(oCReqMsgGetDIRnRParamValues:CReqMsgGetDIRnRParamValues ) : void {
  HelperService.Invoke<CReqMsgGetDIRnRParamValues,CResMsgGetDIRnRParamValues,GetDIRnRParamValuesCompletedEventArgs>("ResultManagementWS.GetDIRnRParamValues",oCReqMsgGetDIRnRParamValues,this.GetDIRnRParamValuesCompleted,"oSearch",new GetDIRnRParamValuesCompletedEventArgs(), prototypeList);
}

getResultDtlsCompleted: Function;
getResultDtlsAsync(oCReqMsggetResultDtls:CReqMsggetResultDtls ) : void {
  HelperService.Invoke<CReqMsggetResultDtls,CResMsggetResultDtls,getResultDtlsCompletedEventArgs>("ResultManagementWS.getResultDtls",oCReqMsggetResultDtls,this.getResultDtlsCompleted,"userOID",new getResultDtlsCompletedEventArgs(), prototypeList);
}

getResultDtlsPatMergeCompleted: Function;
getResultDtlsPatMergeAsync(oCReqMsggetResultDtlsPatMerge:CReqMsggetResultDtlsPatMerge ) : void {
  HelperService.Invoke<CReqMsggetResultDtlsPatMerge,CResMsggetResultDtlsPatMerge,getResultDtlsPatMergeCompletedEventArgs>("ResultManagementWS.getResultDtlsPatMerge",oCReqMsggetResultDtlsPatMerge,this.getResultDtlsPatMergeCompleted,"userOID",new getResultDtlsPatMergeCompletedEventArgs(), prototypeList);
}

GetSVRequestsCompleted: Function;
GetSVRequestsAsync(oCReqMsgGetSVRequests:CReqMsgGetSVRequests ) : void {
  HelperService.Invoke<CReqMsgGetSVRequests,CResMsgGetSVRequests,GetSVRequestsCompletedEventArgs>("ResultManagementWS.GetSVRequests",oCReqMsgGetSVRequests,this.GetSVRequestsCompleted,"objSVInputCriteria",new GetSVRequestsCompletedEventArgs(), prototypeList);
}

GetSVResultsCompleted: Function;
GetSVResultsAsync(oCReqMsgGetSVResults:CReqMsgGetSVResults ) : void {
  HelperService.Invoke<CReqMsgGetSVResults,CResMsgGetSVResults,GetSVResultsCompletedEventArgs>("ResultManagementWS.GetSVResults",oCReqMsgGetSVResults,this.GetSVResultsCompleted,"objSVInputCriteria",new GetSVResultsCompletedEventArgs(), prototypeList);
}

GetResultsListViewCompleted: Function;
GetResultsListViewAsync(oCReqMsgGetResultsListView:CReqMsgGetResultsListView ) : void {
  HelperService.Invoke<CReqMsgGetResultsListView,CResMsgGetResultsListView,GetResultsListViewCompletedEventArgs>("ResultManagementWS.GetResultsListView",oCReqMsgGetResultsListView,this.GetResultsListViewCompleted,"oReq",new GetResultsListViewCompletedEventArgs(), prototypeList);
}

GetResultComponentCompleted: Function;
GetResultComponentAsync(oCReqMsgGetResultComponent:CReqMsgGetResultComponent ) : void {
  HelperService.Invoke<CReqMsgGetResultComponent,CResMsgGetResultComponent,GetResultComponentCompletedEventArgs>("ResultManagementWS.GetResultComponent",oCReqMsgGetResultComponent,this.GetResultComponentCompleted,"patientOID",new GetResultComponentCompletedEventArgs(), prototypeList);
}

GetModifiedRequestsCompleted: Function;
GetModifiedRequestsAsync(oCReqMsgGetModifiedRequests:CReqMsgGetModifiedRequests ) : void {
  HelperService.Invoke<CReqMsgGetModifiedRequests,CResMsgGetModifiedRequests,GetModifiedRequestsCompletedEventArgs>("ResultManagementWS.GetModifiedRequests",oCReqMsgGetModifiedRequests,this.GetModifiedRequestsCompleted,"startDttm",new GetModifiedRequestsCompletedEventArgs(), prototypeList);
}

GetRequestsCompleted: Function;
GetRequestsAsync(oCReqMsgGetRequests:CReqMsgGetRequests ) : void {
  HelperService.Invoke<CReqMsgGetRequests,CResMsgGetRequests,GetRequestsCompletedEventArgs>("ResultManagementWS.GetRequests",oCReqMsgGetRequests,this.GetRequestsCompleted,"referenceNumbers",new GetRequestsCompletedEventArgs(), prototypeList);
}

ModifyRecipientListCompleted: Function;
ModifyRecipientListAsync(oCReqMsgModifyRecipientList:CReqMsgModifyRecipientList ) : void {
  HelperService.Invoke<CReqMsgModifyRecipientList,CResMsgModifyRecipientList,ModifyRecipientListCompletedEventArgs>("ResultManagementWS.ModifyRecipientList",oCReqMsgModifyRecipientList,this.ModifyRecipientListCompleted,"objtaskDetail",new ModifyRecipientListCompletedEventArgs(), prototypeList);
}

GetViewSpecStatusCompleted: Function;
GetViewSpecStatusAsync(oCReqMsgGetViewSpecStatus:CReqMsgGetViewSpecStatus ) : void {
  HelperService.Invoke<CReqMsgGetViewSpecStatus,CResMsgGetViewSpecStatus,GetViewSpecStatusCompletedEventArgs>("ResultManagementWS.GetViewSpecStatus",oCReqMsgGetViewSpecStatus,this.GetViewSpecStatusCompleted,"PatientOID",new GetViewSpecStatusCompletedEventArgs(), prototypeList);
}

GetWarnDetCompleted: Function;
GetWarnDetAsync(oCReqMsgGetWarnDet:CReqMsgGetWarnDet ) : void {
  HelperService.Invoke<CReqMsgGetWarnDet,CResMsgGetWarnDet,GetWarnDetCompletedEventArgs>("ResultManagementWS.GetWarnDet",oCReqMsgGetWarnDet,this.GetWarnDetCompleted,"ReqtDetOID",new GetWarnDetCompletedEventArgs(), prototypeList);
}

GetAddDetCompleted: Function;
GetAddDetAsync(oCReqMsgGetAddDet:CReqMsgGetAddDet ) : void {
  HelperService.Invoke<CReqMsgGetAddDet,CResMsgGetAddDet,GetAddDetCompletedEventArgs>("ResultManagementWS.GetAddDet",oCReqMsgGetAddDet,this.GetAddDetCompleted,"ReqtDetOID",new GetAddDetCompletedEventArgs(), prototypeList);
}

GetAltDetCompleted: Function;
GetAltDetAsync(oCReqMsgGetAltDet:CReqMsgGetAltDet ) : void {
  HelperService.Invoke<CReqMsgGetAltDet,CResMsgGetAltDet,GetAltDetCompletedEventArgs>("ResultManagementWS.GetAltDet",oCReqMsgGetAltDet,this.GetAltDetCompleted,"ReqtDetOID",new GetAltDetCompletedEventArgs(), prototypeList);
}

GetWarnLinkCompleted: Function;
GetWarnLinkAsync(oCReqMsgGetWarnLink:CReqMsgGetWarnLink ) : void {
  HelperService.Invoke<CReqMsgGetWarnLink,CResMsgGetWarnLink,GetWarnLinkCompletedEventArgs>("ResultManagementWS.GetWarnLink",oCReqMsgGetWarnLink,this.GetWarnLinkCompleted,"PatientOID",new GetWarnLinkCompletedEventArgs(), prototypeList);
}

GetResultModificationHistoryCompleted: Function;
GetResultModificationHistoryAsync(oCReqMsgGetResultModificationHistory:CReqMsgGetResultModificationHistory ) : void {
  HelperService.Invoke<CReqMsgGetResultModificationHistory,CResMsgGetResultModificationHistory,GetResultModificationHistoryCompletedEventArgs>("ResultManagementWS.GetResultModificationHistory",oCReqMsgGetResultModificationHistory,this.GetResultModificationHistoryCompleted,"oResultSearch",new GetResultModificationHistoryCompletedEventArgs(), prototypeList);
}

GetStatusHistoryCompleted: Function;
GetStatusHistoryAsync(oCReqMsgGetStatusHistory:CReqMsgGetStatusHistory ) : void {
  HelperService.Invoke<CReqMsgGetStatusHistory,CResMsgGetStatusHistory,GetStatusHistoryCompletedEventArgs>("ResultManagementWS.GetStatusHistory",oCReqMsgGetStatusHistory,this.GetStatusHistoryCompleted,"sSeenType",new GetStatusHistoryCompletedEventArgs(), prototypeList);
}

GetGraphViewCompleted: Function;
GetGraphViewAsync(oCReqMsgGetGraphView:CReqMsgGetGraphView ) : void {
  HelperService.Invoke<CReqMsgGetGraphView,CResMsgGetGraphView,GetGraphViewCompletedEventArgs>("ResultManagementWS.GetGraphView",oCReqMsgGetGraphView,this.GetGraphViewCompleted,"oSearch",new GetGraphViewCompletedEventArgs(), prototypeList);
}

GetResultReportCompleted: Function;
GetResultReportAsync(oCReqMsgGetResultReport:CReqMsgGetResultReport ) : void {
  HelperService.Invoke<CReqMsgGetResultReport,CResMsgGetResultReport,GetResultReportCompletedEventArgs>("ResultManagementWS.GetResultReport",oCReqMsgGetResultReport,this.GetResultReportCompleted,"RequestedBy",new GetResultReportCompletedEventArgs(), prototypeList);
}

GetResultsCodingGroupingCompleted: Function;
GetResultsCodingGroupingAsync(oCReqMsgGetResultsCodingGrouping:CReqMsgGetResultsCodingGrouping ) : void {
  HelperService.Invoke<CReqMsgGetResultsCodingGrouping,CResMsgGetResultsCodingGrouping,GetResultsCodingGroupingCompletedEventArgs>("ResultManagementWS.GetResultsCodingGrouping",oCReqMsgGetResultsCodingGrouping,this.GetResultsCodingGroupingCompleted,"SealImageList",new GetResultsCodingGroupingCompletedEventArgs(), prototypeList);
}

GetResultDetailsCompleted: Function;
GetResultDetailsAsync(oCReqMsgGetResultDetails:CReqMsgGetResultDetails ) : void {
  HelperService.Invoke<CReqMsgGetResultDetails,CResMsgGetResultDetails,GetResultDetailsCompletedEventArgs>("ResultManagementWS.GetResultDetails",oCReqMsgGetResultDetails,this.GetResultDetailsCompleted,"oSearch",new GetResultDetailsCompletedEventArgs(), prototypeList);
}

GetGroupRequestsDetailsCompleted: Function;
GetGroupRequestsDetailsAsync(oCReqMsgGetGroupRequestsDetails:CReqMsgGetGroupRequestsDetails ) : void {
  HelperService.Invoke<CReqMsgGetGroupRequestsDetails,CResMsgGetGroupRequestsDetails,GetGroupRequestsDetailsCompletedEventArgs>("ResultManagementWS.GetGroupRequestsDetails",oCReqMsgGetGroupRequestsDetails,this.GetGroupRequestsDetailsCompleted,"oSearch",new GetGroupRequestsDetailsCompletedEventArgs(), prototypeList);
}

GetResultsTabularViewCompleted: Function;
GetResultsTabularViewAsync(oCReqMsgGetResultsTabularView:CReqMsgGetResultsTabularView ) : void {
  HelperService.Invoke<CReqMsgGetResultsTabularView,CResMsgGetResultsTabularView,GetResultsTabularViewCompletedEventArgs>("ResultManagementWS.GetResultsTabularView",oCReqMsgGetResultsTabularView,this.GetResultsTabularViewCompleted,"oSearch",new GetResultsTabularViewCompletedEventArgs(), prototypeList);
}

GetResultsHistoryViewCompleted: Function;
GetResultsHistoryViewAsync(oCReqMsgGetResultsHistoryView:CReqMsgGetResultsHistoryView ) : void {
  HelperService.Invoke<CReqMsgGetResultsHistoryView,CResMsgGetResultsHistoryView,GetResultsHistoryViewCompletedEventArgs>("ResultManagementWS.GetResultsHistoryView",oCReqMsgGetResultsHistoryView,this.GetResultsHistoryViewCompleted,"oSearch",new GetResultsHistoryViewCompletedEventArgs(), prototypeList);
}

GetResultFilterByForTabularViewCompleted: Function;
GetResultFilterByForTabularViewAsync(oCReqMsgGetResultFilterByForTabularView:CReqMsgGetResultFilterByForTabularView ) : void {
  HelperService.Invoke<CReqMsgGetResultFilterByForTabularView,CResMsgGetResultFilterByForTabularView,GetResultFilterByForTabularViewCompletedEventArgs>("ResultManagementWS.GetResultFilterByForTabularView",oCReqMsgGetResultFilterByForTabularView,this.GetResultFilterByForTabularViewCompleted,"EPRFilter",new GetResultFilterByForTabularViewCompletedEventArgs(), prototypeList);
}

GetResultsTabularViewFilterCompleted: Function;
GetResultsTabularViewFilterAsync(oCReqMsgGetResultsTabularViewFilter:CReqMsgGetResultsTabularViewFilter ) : void {
  HelperService.Invoke<CReqMsgGetResultsTabularViewFilter,CResMsgGetResultsTabularViewFilter,GetResultsTabularViewFilterCompletedEventArgs>("ResultManagementWS.GetResultsTabularViewFilter",oCReqMsgGetResultsTabularViewFilter,this.GetResultsTabularViewFilterCompleted,"SeenType",new GetResultsTabularViewFilterCompletedEventArgs(), prototypeList);
}

GetResultFilterByCompleted: Function;
GetResultFilterByAsync(oCReqMsgGetResultFilterBy:CReqMsgGetResultFilterBy ) : void {
  HelperService.Invoke<CReqMsgGetResultFilterBy,CResMsgGetResultFilterBy,GetResultFilterByCompletedEventArgs>("ResultManagementWS.GetResultFilterBy",oCReqMsgGetResultFilterBy,this.GetResultFilterByCompleted,"SeenType",new GetResultFilterByCompletedEventArgs(), prototypeList);
}

GetResultsListviewFilterCompleted: Function;
GetResultsListviewFilterAsync(oCReqMsgGetResultsListviewFilter:CReqMsgGetResultsListviewFilter ) : void {
  HelperService.Invoke<CReqMsgGetResultsListviewFilter,CResMsgGetResultsListviewFilter,GetResultsListviewFilterCompletedEventArgs>("ResultManagementWS.GetResultsListviewFilter",oCReqMsgGetResultsListviewFilter,this.GetResultsListviewFilterCompleted,"tabCode",new GetResultsListviewFilterCompletedEventArgs(), prototypeList);
}

GetRequestItemNameFiltrCompleted: Function;
GetRequestItemNameFiltrAsync(oCReqMsgGetRequestItemNameFiltr:CReqMsgGetRequestItemNameFiltr ) : void {
  HelperService.Invoke<CReqMsgGetRequestItemNameFiltr,CResMsgGetRequestItemNameFiltr,GetRequestItemNameFiltrCompletedEventArgs>("ResultManagementWS.GetRequestItemNameFiltr",oCReqMsgGetRequestItemNameFiltr,this.GetRequestItemNameFiltrCompleted,"oSearch",new GetRequestItemNameFiltrCompletedEventArgs(), prototypeList);
}

ServiceRequestCompleted: Function;
ServiceRequestAsync(oCReqMsgServiceRequest:CReqMsgServiceRequest ) : void {
  HelperService.Invoke<CReqMsgServiceRequest,CResMsgServiceRequest,ServiceRequestCompletedEventArgs>("ResultManagementWS.ServiceRequest",oCReqMsgServiceRequest,this.ServiceRequestCompleted,"objManageReqStatus",new ServiceRequestCompletedEventArgs(), prototypeList);
}

GetResultAndReqItmDFCompleted: Function;
GetResultAndReqItmDFAsync(oCReqMsgGetResultAndReqItmDF:CReqMsgGetResultAndReqItmDF ) : void {
  HelperService.Invoke<CReqMsgGetResultAndReqItmDF,CResMsgGetResultAndReqItmDF,GetResultAndReqItmDFCompletedEventArgs>("ResultManagementWS.GetResultAndReqItmDF",oCReqMsgGetResultAndReqItmDF,this.GetResultAndReqItmDFCompleted,"UsersOID",new GetResultAndReqItmDFCompletedEventArgs(), prototypeList);
}

GetResultForPrescriptionCompleted: Function;
GetResultForPrescriptionAsync(oCReqMsgGetResultForPrescription:CReqMsgGetResultForPrescription ) : void {
  HelperService.Invoke<CReqMsgGetResultForPrescription,CResMsgGetResultForPrescription,GetResultForPrescriptionCompletedEventArgs>("ResultManagementWS.GetResultForPrescription",oCReqMsgGetResultForPrescription,this.GetResultForPrescriptionCompleted,"sSealRecordList",new GetResultForPrescriptionCompletedEventArgs(), prototypeList);
}

GetResultDetailsByPatOrEncOIDCompleted: Function;
GetResultDetailsByPatOrEncOIDAsync(oCReqMsgGetResultDetailsByPatOrEncOID:CReqMsgGetResultDetailsByPatOrEncOID ) : void {
  HelperService.Invoke<CReqMsgGetResultDetailsByPatOrEncOID,CResMsgGetResultDetailsByPatOrEncOID,GetResultDetailsByPatOrEncOIDCompletedEventArgs>("ResultManagementWS.GetResultDetailsByPatOrEncOID",oCReqMsgGetResultDetailsByPatOrEncOID,this.GetResultDetailsByPatOrEncOIDCompleted,"oResultValuesRequest",new GetResultDetailsByPatOrEncOIDCompletedEventArgs(), prototypeList);
}

ReassignAcknowledgementTaskCompleted: Function;
ReassignAcknowledgementTaskAsync(oCReqMsgReassignAcknowledgementTask:CReqMsgReassignAcknowledgementTask ) : void {
  HelperService.Invoke<CReqMsgReassignAcknowledgementTask,CResMsgReassignAcknowledgementTask,ReassignAcknowledgementTaskCompletedEventArgs>("ResultManagementWS.ReassignAcknowledgementTask",oCReqMsgReassignAcknowledgementTask,this.ReassignAcknowledgementTaskCompleted,"objRecipientdetail",new ReassignAcknowledgementTaskCompletedEventArgs(), prototypeList);
}

GetRequestCommentsCompleted: Function;
GetRequestCommentsAsync(oCReqMsgGetRequestComments:CReqMsgGetRequestComments ) : void {
  HelperService.Invoke<CReqMsgGetRequestComments,CResMsgGetRequestComments,GetRequestCommentsCompletedEventArgs>("ResultManagementWS.GetRequestComments",oCReqMsgGetRequestComments,this.GetRequestCommentsCompleted,"oReqIds",new GetRequestCommentsCompletedEventArgs(), prototypeList);
}

GetMyRequestViewCompleted: Function;
GetMyRequestViewAsync(oCReqMsgGetMyRequestView:CReqMsgGetMyRequestView ) : void {
  HelperService.Invoke<CReqMsgGetMyRequestView,CResMsgGetMyRequestView,GetMyRequestViewCompletedEventArgs>("ResultManagementWS.GetMyRequestView",oCReqMsgGetMyRequestView,this.GetMyRequestViewCompleted,"oSearch",new GetMyRequestViewCompletedEventArgs(), prototypeList);
}

GetViewMyRequestListCompleted: Function;
GetViewMyRequestListAsync(oCReqMsgGetViewMyRequestList:CReqMsgGetViewMyRequestList ) : void {
  HelperService.Invoke<CReqMsgGetViewMyRequestList,CResMsgGetViewMyRequestList,GetViewMyRequestListCompletedEventArgs>("ResultManagementWS.GetViewMyRequestList",oCReqMsgGetViewMyRequestList,this.GetViewMyRequestListCompleted,"oSearch",new GetViewMyRequestListCompletedEventArgs(), prototypeList);
}

GetMyRequestChildViewCompleted: Function;
GetMyRequestChildViewAsync(oCReqMsgGetMyRequestChildView:CReqMsgGetMyRequestChildView ) : void {
  HelperService.Invoke<CReqMsgGetMyRequestChildView,CResMsgGetMyRequestChildView,GetMyRequestChildViewCompletedEventArgs>("ResultManagementWS.GetMyRequestChildView",oCReqMsgGetMyRequestChildView,this.GetMyRequestChildViewCompleted,"oSearch",new GetMyRequestChildViewCompletedEventArgs(), prototypeList);
}

GetUnsolicitedAdocResultsCompleted: Function;
GetUnsolicitedAdocResultsAsync(oCReqMsgGetUnsolicitedAdocResults:CReqMsgGetUnsolicitedAdocResults ) : void {
  HelperService.Invoke<CReqMsgGetUnsolicitedAdocResults,CResMsgGetUnsolicitedAdocResults,GetUnsolicitedAdocResultsCompletedEventArgs>("ResultManagementWS.GetUnsolicitedAdocResults",oCReqMsgGetUnsolicitedAdocResults,this.GetUnsolicitedAdocResultsCompleted,"CurrentDTTM",new GetUnsolicitedAdocResultsCompletedEventArgs(), prototypeList);
}

GetPatUnsolicitedAdocResultsCompleted: Function;
GetPatUnsolicitedAdocResultsAsync(oCReqMsgGetPatUnsolicitedAdocResults:CReqMsgGetPatUnsolicitedAdocResults ) : void {
  HelperService.Invoke<CReqMsgGetPatUnsolicitedAdocResults,CResMsgGetPatUnsolicitedAdocResults,GetPatUnsolicitedAdocResultsCompletedEventArgs>("ResultManagementWS.GetPatUnsolicitedAdocResults",oCReqMsgGetPatUnsolicitedAdocResults,this.GetPatUnsolicitedAdocResultsCompleted,"CurrentDTTM",new GetPatUnsolicitedAdocResultsCompletedEventArgs(), prototypeList);
}

ModAckHistoryCompleted: Function;
ModAckHistoryAsync(oCReqMsgModAckHistory:CReqMsgModAckHistory ) : void {
  HelperService.Invoke<CReqMsgModAckHistory,CResMsgModAckHistory,ModAckHistoryCompletedEventArgs>("ResultManagementWS.ModAckHistory",oCReqMsgModAckHistory,this.ModAckHistoryCompleted,"patientOID",new ModAckHistoryCompletedEventArgs(), prototypeList);
}

GetResultItemTextDetailsCompleted: Function;
GetResultItemTextDetailsAsync(oCReqMsgGetResultItemTextDetails:CReqMsgGetResultItemTextDetails ) : void {
  HelperService.Invoke<CReqMsgGetResultItemTextDetails,CResMsgGetResultItemTextDetails,GetResultItemTextDetailsCompletedEventArgs>("ResultManagementWS.GetResultItemTextDetails",oCReqMsgGetResultItemTextDetails,this.GetResultItemTextDetailsCompleted,"resultItemOID",new GetResultItemTextDetailsCompletedEventArgs(), prototypeList);
}

GetSamplePerformedDTTMCompleted: Function;
GetSamplePerformedDTTMAsync(oCReqMsgGetSamplePerformedDTTM:CReqMsgGetSamplePerformedDTTM ) : void {
  HelperService.Invoke<CReqMsgGetSamplePerformedDTTM,CResMsgGetSamplePerformedDTTM,GetSamplePerformedDTTMCompletedEventArgs>("ResultManagementWS.GetSamplePerformedDTTM",oCReqMsgGetSamplePerformedDTTM,this.GetSamplePerformedDTTMCompleted,"request",new GetSamplePerformedDTTMCompletedEventArgs(), prototypeList);
}

GetResultByResultHisIDCompleted: Function;
GetResultByResultHisIDAsync(oCReqMsgGetResultByResultHisID:CReqMsgGetResultByResultHisID ) : void {
  HelperService.Invoke<CReqMsgGetResultByResultHisID,CResMsgGetResultByResultHisID,GetResultByResultHisIDCompletedEventArgs>("ResultManagementWS.GetResultByResultHisID",oCReqMsgGetResultByResultHisID,this.GetResultByResultHisIDCompleted,"resultItemOID",new GetResultByResultHisIDCompletedEventArgs(), prototypeList);
}

EncounterAvailCheckCompleted: Function;
EncounterAvailCheckAsync(oCReqMsgEncounterAvailCheck:CReqMsgEncounterAvailCheck ) : void {
  HelperService.Invoke<CReqMsgEncounterAvailCheck,CResMsgEncounterAvailCheck,EncounterAvailCheckCompletedEventArgs>("ResultManagementWS.EncounterAvailCheck",oCReqMsgEncounterAvailCheck,this.EncounterAvailCheckCompleted,"sPatientOID",new EncounterAvailCheckCompletedEventArgs(), prototypeList);
}

GetUnSeenResultListCompleted: Function;
GetUnSeenResultListAsync(oCReqMsgGetUnSeenResultList:CReqMsgGetUnSeenResultList ) : void {
  HelperService.Invoke<CReqMsgGetUnSeenResultList,CResMsgGetUnSeenResultList,GetUnSeenResultListCompletedEventArgs>("ResultManagementWS.GetUnSeenResultList",oCReqMsgGetUnSeenResultList,this.GetUnSeenResultListCompleted,"sUserInfo",new GetUnSeenResultListCompletedEventArgs(), prototypeList);
}

GetResultStatusCodeCompleted: Function;
GetResultStatusCodeAsync(oCReqMsgGetResultStatusCode:CReqMsgGetResultStatusCode ) : void {
  HelperService.Invoke<CReqMsgGetResultStatusCode,CResMsgGetResultStatusCode,GetResultStatusCodeCompletedEventArgs>("ResultManagementWS.GetResultStatusCode",oCReqMsgGetResultStatusCode,this.GetResultStatusCodeCompleted,"requestDetailOID",new GetResultStatusCodeCompletedEventArgs(), prototypeList);
}

GetLRSUsersOrTeamsCompleted: Function;
GetLRSUsersOrTeamsAsync(oCReqMsgGetLRSUsersOrTeams:CReqMsgGetLRSUsersOrTeams ) : void {
  HelperService.Invoke<CReqMsgGetLRSUsersOrTeams,CResMsgGetLRSUsersOrTeams,GetLRSUsersOrTeamsCompletedEventArgs>("ResultManagementWS.GetLRSUsersOrTeams",oCReqMsgGetLRSUsersOrTeams,this.GetLRSUsersOrTeamsCompleted,"resultOID",new GetLRSUsersOrTeamsCompletedEventArgs(), prototypeList);
}

GetCombinedSpecimenCollectionCompleted: Function;
GetCombinedSpecimenCollectionAsync(oCReqMsgGetCombinedSpecimenCollection:CReqMsgGetCombinedSpecimenCollection ) : void {
  HelperService.Invoke<CReqMsgGetCombinedSpecimenCollection,CResMsgGetCombinedSpecimenCollection,GetCombinedSpecimenCollectionCompletedEventArgs>("ResultManagementWS.GetCombinedSpecimenCollection",oCReqMsgGetCombinedSpecimenCollection,this.GetCombinedSpecimenCollectionCompleted,"requestDetailOID",new GetCombinedSpecimenCollectionCompletedEventArgs(), prototypeList);
}

GetPatientFlagsCompleted: Function;
GetPatientFlagsAsync(oCReqMsgGetPatientFlags:CReqMsgGetPatientFlags ) : void {
  HelperService.Invoke<CReqMsgGetPatientFlags,CResMsgGetPatientFlags,GetPatientFlagsCompletedEventArgs>("ResultManagementWS.GetPatientFlags",oCReqMsgGetPatientFlags,this.GetPatientFlagsCompleted,"criteria",new GetPatientFlagsCompletedEventArgs(), prototypeList);
}

GetNewRequestsCompleted: Function;
GetNewRequestsAsync(oCReqMsgGetNewRequests:CReqMsgGetNewRequests ) : void {
  HelperService.Invoke<CReqMsgGetNewRequests,CResMsgGetNewRequests,GetNewRequestsCompletedEventArgs>("ResultManagementWS.GetNewRequests",oCReqMsgGetNewRequests,this.GetNewRequestsCompleted,"objReqNewEvents",new GetNewRequestsCompletedEventArgs(), prototypeList);
}

GetNewResultsCompleted: Function;
GetNewResultsAsync(oCReqMsgGetNewResults:CReqMsgGetNewResults ) : void {
  HelperService.Invoke<CReqMsgGetNewResults,CResMsgGetNewResults,GetNewResultsCompletedEventArgs>("ResultManagementWS.GetNewResults",oCReqMsgGetNewResults,this.GetNewResultsCompleted,"objReqNewEvents",new GetNewResultsCompletedEventArgs(), prototypeList);
}

GetPendingResultsCompleted: Function;
GetPendingResultsAsync(oCReqMsgGetPendingResults:CReqMsgGetPendingResults ) : void {
  HelperService.Invoke<CReqMsgGetPendingResults,CResMsgGetPendingResults,GetPendingResultsCompletedEventArgs>("ResultManagementWS.GetPendingResults",oCReqMsgGetPendingResults,this.GetPendingResultsCompleted,"patientOID",new GetPendingResultsCompletedEventArgs(), prototypeList);
}

GetUnseenResultsCompleted: Function;
GetUnseenResultsAsync(oCReqMsgGetUnseenResults:CReqMsgGetUnseenResults ) : void {
  HelperService.Invoke<CReqMsgGetUnseenResults,CResMsgGetUnseenResults,GetUnseenResultsCompletedEventArgs>("ResultManagementWS.GetUnseenResults",oCReqMsgGetUnseenResults,this.GetUnseenResultsCompleted,"patientOID",new GetUnseenResultsCompletedEventArgs(), prototypeList);
}

GetResultDIAppNameCompleted: Function;
GetResultDIAppNameAsync(oCReqMsgGetResultDIAppName:CReqMsgGetResultDIAppName ) : void {
  HelperService.Invoke<CReqMsgGetResultDIAppName,CResMsgGetResultDIAppName,GetResultDIAppNameCompletedEventArgs>("ResultManagementWS.GetResultDIAppName",oCReqMsgGetResultDIAppName,this.GetResultDIAppNameCompleted,"resultOID",new GetResultDIAppNameCompletedEventArgs(), prototypeList);
}

GetImageOnlyResultsCompleted: Function;
GetImageOnlyResultsAsync(oCReqMsgGetImageOnlyResults:CReqMsgGetImageOnlyResults ) : void {
  HelperService.Invoke<CReqMsgGetImageOnlyResults,CResMsgGetImageOnlyResults,GetImageOnlyResultsCompletedEventArgs>("ResultManagementWS.GetImageOnlyResults",oCReqMsgGetImageOnlyResults,this.GetImageOnlyResultsCompleted,"requestDetailOID",new GetImageOnlyResultsCompletedEventArgs(), prototypeList);
}
}

export class PrintResultsCompletedEventArgs{
 public Result: CResMsgPrintResults;
public Error: any;
}
export class GetApplyAllResultCompletedEventArgs{
 public Result: CResMsgGetApplyAllResult;
public Error: any;
}
export class ManageAcknowledgestatusCompletedEventArgs{
 public Result: CResMsgManageAcknowledgestatus;
public Error: any;
}
export class GetSeenResultReportCompletedEventArgs{
 public Result: CResMsgGetSeenResultReport;
public Error: any;
}
export class GetResultAcknowledgedReportCompletedEventArgs{
 public Result: CResMsgGetResultAcknowledgedReport;
public Error: any;
}
export class GetResultUnAcknowledgedReportCompletedEventArgs{
 public Result: CResMsgGetResultUnAcknowledgedReport;
public Error: any;
}
export class GetResultsListViewByRequestDetailOIDsCompletedEventArgs{
 public Result: CResMsgGetResultsListViewByRequestDetailOIDs;
public Error: any;
}
export class GetRequestDetailsViewCompletedEventArgs{
 public Result: CResMsgGetRequestDetailsView;
public Error: any;
}
export class GetResultByResultItemIDCompletedEventArgs{
 public Result: CResMsgGetResultByResultItemID;
public Error: any;
}
export class ClearUnseenResultsCompletedEventArgs{
 public Result: CResMsgClearUnseenResults;
public Error: any;
}
export class MarkResultsAsSeenCompletedEventArgs{
 public Result: CResMsgMarkResultsAsSeen;
public Error: any;
}
export class GetResHisDateCompletedEventArgs{
 public Result: CResMsgGetResHisDate;
public Error: any;
}
export class GetRequestIntrayFormCompletedEventArgs{
 public Result: CResMsgGetRequestIntrayForm;
public Error: any;
}
export class GetRMResDtsHistoryCompletedEventArgs{
 public Result: CResMsgGetRMResDtsHistory;
public Error: any;
}
export class GetResConfidentialCompletedEventArgs{
 public Result: CResMsgGetResConfidential;
public Error: any;
}
export class GetDataFilterForRequestItemCompletedEventArgs{
 public Result: CResMsgGetDataFilterForRequestItem;
public Error: any;
}
export class GetContextDetailsCompletedEventArgs{
 public Result: CResMsgGetContextDetails;
public Error: any;
}
export class GetAccessRightsCompletedEventArgs{
 public Result: CResMsgGetAccessRights;
public Error: any;
}
export class GetResultDetailsForCDCCompletedEventArgs{
 public Result: CResMsgGetResultDetailsForCDC;
public Error: any;
}
export class GetResultsCompletedEventArgs{
 public Result: CResMsgGetResults;
public Error: any;
}
export class GetBubbleResultInfoCompletedEventArgs{
 public Result: CResMsgGetBubbleResultInfo;
public Error: any;
}
export class EnterResultsCompletedEventArgs{
 public Result: CResMsgEnterResults;
public Error: any;
}
export class GetFormDefinitionCompletedEventArgs{
 public Result: CResMsgGetFormDefinition;
public Error: any;
}
export class GetAllResultItemCompletedEventArgs{
 public Result: CResMsgGetAllResultItem;
public Error: any;
}
export class GetRequestItemByResultItemIDCompletedEventArgs{
 public Result: CResMsgGetRequestItemByResultItemID;
public Error: any;
}
export class GetResultItemDetailsCompletedEventArgs{
 public Result: CResMsgGetResultItemDetails;
public Error: any;
}
export class GetResultItemDefinitionCompletedEventArgs{
 public Result: CResMsgGetResultItemDefinition;
public Error: any;
}
export class GetCDCDetailsCompletedEventArgs{
 public Result: CResMsgGetCDCDetails;
public Error: any;
}
export class GetNotificationListCompletedEventArgs{
 public Result: CResMsgGetNotificationList;
public Error: any;
}
export class ManageResultsCompletedEventArgs{
 public Result: CResMsgManageResults;
public Error: any;
}
export class AcknowledgeResultCompletedEventArgs{
 public Result: CResMsgAcknowledgeResult;
public Error: any;
}
export class AcknowledgeResultsCompletedEventArgs{
 public Result: CResMsgAcknowledgeResults;
public Error: any;
}
export class AuthorizeResultCompletedEventArgs{
 public Result: CResMsgAuthorizeResult;
public Error: any;
}
export class CancelResultCompletedEventArgs{
 public Result: CResMsgCancelResult;
public Error: any;
}
export class GetCIBubbleResultInfoCompletedEventArgs{
 public Result: CResMsgGetCIBubbleResultInfo;
public Error: any;
}
export class GetDIRnRParamValuesCompletedEventArgs{
 public Result: CResMsgGetDIRnRParamValues;
public Error: any;
}
export class getResultDtlsCompletedEventArgs{
 public Result: CResMsggetResultDtls;
public Error: any;
}
export class getResultDtlsPatMergeCompletedEventArgs{
 public Result: CResMsggetResultDtlsPatMerge;
public Error: any;
}
export class GetSVRequestsCompletedEventArgs{
 public Result: CResMsgGetSVRequests;
public Error: any;
}
export class GetSVResultsCompletedEventArgs{
 public Result: CResMsgGetSVResults;
public Error: any;
}
export class GetResultsListViewCompletedEventArgs{
 public Result: CResMsgGetResultsListView;
public Error: any;
}
export class GetResultComponentCompletedEventArgs{
 public Result: CResMsgGetResultComponent;
public Error: any;
}
export class GetModifiedRequestsCompletedEventArgs{
 public Result: CResMsgGetModifiedRequests;
public Error: any;
}
export class GetRequestsCompletedEventArgs{
 public Result: CResMsgGetRequests;
public Error: any;
}
export class ModifyRecipientListCompletedEventArgs{
 public Result: CResMsgModifyRecipientList;
public Error: any;
}
export class GetViewSpecStatusCompletedEventArgs{
 public Result: CResMsgGetViewSpecStatus;
public Error: any;
}
export class GetWarnDetCompletedEventArgs{
 public Result: CResMsgGetWarnDet;
public Error: any;
}
export class GetAddDetCompletedEventArgs{
 public Result: CResMsgGetAddDet;
public Error: any;
}
export class GetAltDetCompletedEventArgs{
 public Result: CResMsgGetAltDet;
public Error: any;
}
export class GetWarnLinkCompletedEventArgs{
 public Result: CResMsgGetWarnLink;
public Error: any;
}
export class GetResultModificationHistoryCompletedEventArgs{
 public Result: CResMsgGetResultModificationHistory;
public Error: any;
}
export class GetStatusHistoryCompletedEventArgs{
 public Result: CResMsgGetStatusHistory;
public Error: any;
}
export class GetGraphViewCompletedEventArgs{
 public Result: CResMsgGetGraphView;
public Error: any;
}
export class GetResultReportCompletedEventArgs{
 public Result: CResMsgGetResultReport;
public Error: any;
}
export class GetResultsCodingGroupingCompletedEventArgs{
 public Result: CResMsgGetResultsCodingGrouping;
public Error: any;
}
export class GetResultDetailsCompletedEventArgs{
 public Result: CResMsgGetResultDetails;
public Error: any;
}
export class GetGroupRequestsDetailsCompletedEventArgs{
 public Result: CResMsgGetGroupRequestsDetails;
public Error: any;
}
export class GetResultsTabularViewCompletedEventArgs{
 public Result: CResMsgGetResultsTabularView;
public Error: any;
}
export class GetResultsHistoryViewCompletedEventArgs{
 public Result: CResMsgGetResultsHistoryView;
public Error: any;
}
export class GetResultFilterByForTabularViewCompletedEventArgs{
 public Result: CResMsgGetResultFilterByForTabularView;
public Error: any;
}
export class GetResultsTabularViewFilterCompletedEventArgs{
 public Result: CResMsgGetResultsTabularViewFilter;
public Error: any;
}
export class GetResultFilterByCompletedEventArgs{
 public Result: CResMsgGetResultFilterBy;
public Error: any;
}
export class GetResultsListviewFilterCompletedEventArgs{
 public Result: CResMsgGetResultsListviewFilter;
public Error: any;
}
export class GetRequestItemNameFiltrCompletedEventArgs{
 public Result: CResMsgGetRequestItemNameFiltr;
public Error: any;
}
export class ServiceRequestCompletedEventArgs{
 public Result: CResMsgServiceRequest;
public Error: any;
}
export class GetResultAndReqItmDFCompletedEventArgs{
 public Result: CResMsgGetResultAndReqItmDF;
public Error: any;
}
export class GetResultForPrescriptionCompletedEventArgs{
 public Result: CResMsgGetResultForPrescription;
public Error: any;
}
export class GetResultDetailsByPatOrEncOIDCompletedEventArgs{
 public Result: CResMsgGetResultDetailsByPatOrEncOID;
public Error: any;
}
export class ReassignAcknowledgementTaskCompletedEventArgs{
 public Result: CResMsgReassignAcknowledgementTask;
public Error: any;
}
export class GetRequestCommentsCompletedEventArgs{
 public Result: CResMsgGetRequestComments;
public Error: any;
}
export class GetMyRequestViewCompletedEventArgs{
 public Result: CResMsgGetMyRequestView;
public Error: any;
}
export class GetViewMyRequestListCompletedEventArgs{
 public Result: CResMsgGetViewMyRequestList;
public Error: any;
}
export class GetMyRequestChildViewCompletedEventArgs{
 public Result: CResMsgGetMyRequestChildView;
public Error: any;
}
export class GetUnsolicitedAdocResultsCompletedEventArgs{
 public Result: CResMsgGetUnsolicitedAdocResults;
public Error: any;
}
export class GetPatUnsolicitedAdocResultsCompletedEventArgs{
 public Result: CResMsgGetPatUnsolicitedAdocResults;
public Error: any;
}
export class ModAckHistoryCompletedEventArgs{
 public Result: CResMsgModAckHistory;
public Error: any;
}
export class GetResultItemTextDetailsCompletedEventArgs{
 public Result: CResMsgGetResultItemTextDetails;
public Error: any;
}
export class GetSamplePerformedDTTMCompletedEventArgs{
 public Result: CResMsgGetSamplePerformedDTTM;
public Error: any;
}
export class GetResultByResultHisIDCompletedEventArgs{
 public Result: CResMsgGetResultByResultHisID;
public Error: any;
}
export class EncounterAvailCheckCompletedEventArgs{
 public Result: CResMsgEncounterAvailCheck;
public Error: any;
}
export class GetUnSeenResultListCompletedEventArgs{
 public Result: CResMsgGetUnSeenResultList;
public Error: any;
}
export class GetResultStatusCodeCompletedEventArgs{
 public Result: CResMsgGetResultStatusCode;
public Error: any;
}
export class GetLRSUsersOrTeamsCompletedEventArgs{
 public Result: CResMsgGetLRSUsersOrTeams;
public Error: any;
}
export class GetCombinedSpecimenCollectionCompletedEventArgs{
 public Result: CResMsgGetCombinedSpecimenCollection;
public Error: any;
}
export class GetPatientFlagsCompletedEventArgs{
 public Result: CResMsgGetPatientFlags;
public Error: any;
}
export class GetNewRequestsCompletedEventArgs{
 public Result: CResMsgGetNewRequests;
public Error: any;
}
export class GetNewResultsCompletedEventArgs{
 public Result: CResMsgGetNewResults;
public Error: any;
}
export class GetPendingResultsCompletedEventArgs{
 public Result: CResMsgGetPendingResults;
public Error: any;
}
export class GetUnseenResultsCompletedEventArgs{
 public Result: CResMsgGetUnseenResults;
public Error: any;
}
export class GetResultDIAppNameCompletedEventArgs{
 public Result: CResMsgGetResultDIAppName;
public Error: any;
}
export class GetImageOnlyResultsCompletedEventArgs{
 public Result: CResMsgGetImageOnlyResults;
public Error: any;
}
export class CReqMsgGetRequestItemNameFiltr{
oSearchBC:RRSearchCriteria;
oContextInformation:CContextInformation;
}

export class RRSearchCriteria extends CLZOObject{
PatientOID:number;
OrganizationID:number;
EncounterOID:number;
UserOID:number;
LoggedInUserRoleOID:number;
}
export class RequestItems extends CLZOObject{
RequestDetailOID:string;
InstanceType:string;
InstanceOID:string;
RequestItemName:string;
RequestItemOID:number;
RequestItemStatus:string;
RequestPerformedDate:DateTime;
DeselectionReason:string;
DateRange:string;
WarningFlag:string;
EncounterOID:string;
}
export class ManageRequest extends CLZOObject{
SetItemDetails:RequestSetInvestigation;
IsDataChanged:number;
IsRecipientChanged:number;
IsProblemChanged:number;
IsCitationChanged:number;
IsNewInsert:number;
PatientInvestigation:PatientInvestigation;
ManageInfo:ManageRequestStatus;
oMailDisclaimer:MailDisclaimer;
IsCancelRequest:boolean;
SendTaskTo:string;
RequestedCACode:string;
IsCancelFromWarnings:string;
IsEncounterModified:boolean;
}
export class RequestSetInvestigation extends CLZOObject{
SetInstanceOID:string;
SetOID:number;
SetName:string;
SetType:string;
SetStatus:string;
SetRefNo:string;
PrimaryItemName:string;
IsEncounterPrimary:string;
oRequestItems:ObservableCollection<RequestItems>;
oWarnings:ObservableCollection<Warnings>;
}
export class Warnings extends CLZOObject{
WarningID:string;
RequestItemName:string;
Reason:string;
IsSet:string;
Warning:string;
WarningType:string;
Severity:string;
AcknowledgeComments:string;
AcknowledgeWarnings:RequestAcknowledge;
RequestItemOID:string;
CriteriaOID:string;
AckDateTime:DateTime;
IsPlaced:string;
}
export class RequestAcknowledge extends CLZOObject{
AckUserID:string;
AckUserName:string;
AckDttm:string;
}
export class PatientInvestigation extends CLZOObject{
RecurrenceDttm:string;
RecPatResReqdDttm:string;
Status:string;
REQStatus:string;
SPMStatus:string;
ParentIdentifyingID:string;
IsAcknowledgeRequired:string;
SetInstanceOID:string;
SetID:string;
SetOID:string;
SetName:string;
SetType:string;
IsPrimary:string;
InstanceOID:string;
InstanceIdentifyingType:string;
RequestID:string;
IsRequestFromMsg:boolean;
RequestDetailID:string;
PatientID:string;
EncounterID:string;
LocationID:string;
Location:string;
OrganisationID:string;
Organisation:string;
RoleID:string;
RoleName:string;
RequestType:string;
GroupNumber:string;
RequestDttm:DateTime;
RequestedUserID:number;
RequestedUserName:string;
OnbehalfOfUserID:number;
OnbehalfOfUserName:string;
OnBehalfOfReason:string;
RequestPerformedDttm:DateTime;
ResultExpectedDttm:DateTime;
ResultReceivedDttm:DateTime;
Priority:string;
Reason:string;
ClinicalDetail:string;
ServicepointID:number;
ServicepointName:string;
SpecialtyID:number;
SpecialtyName:string;
RequestItemID:string;
RequestItemName:string;
RequestItemDescription:string;
TradingPartnerAdditionalInformation:string;
ReasonForHold:string;
HoldComments:string;
ItemReferenceNo:string;
ReviewCategory:string;
AdditionalInfo:RequestAdditionalInfo;
RequestCDCFormInfo:RequestCDCForm;
CitationContent:ObservableCollection<byte>;
CitationOID:string;
ContactMode:string;
IsItemBreached:string;
ContactNumber:string;
IsRequestSet:string;
IsRepeatRequest:string;
IsRequestRecipient:string;
HaveAdditional:string;
HaveParent:string;
IdentifierSystem:string;
PatientName:string;
MainIdentifier:string;
CurrentCareProviderName:string;
LastModifiedUserName:string;
LastModifiedUserID:number;
BubbleOID:number;
BubbleName:string;
DistributeNew:string;
DistributeRem:string;
RecurPatReqToBePerDttm:string;
MsgItemReferenceNo:string;
MsgIdentifierSystem:string;
BubbleCDCID:string;
BubbleCDCVersion:string;
RequestItemCDCID:string;
RequestItemCDCVersion:string;
HaveDuplicateCheck:boolean;
BubbleForm:string;
RequestForm:string;
ScheduledDTTM:DateTime;
IntrayCDCID:string;
IntrayCDCVersion:string;
VerficationPolicyID:number;
RequestItemTypeCode:string;
HasIntrayForm:string;
RequestLeadTime:number;
RequestLeadTimeUOM:string;
IsResultsEntered:boolean;
TradingPartnerOID:number;
PrevReqStatus:string;
RequestReasonCode:string;
Comments:string;
RequestItemCode:string;
IsFromMessaging:boolean;
IsActivatePrevLevel:boolean;
AuthorisedUserOID:number;
CACode:string;
SelectedPatOID:string;
RequestGPInfo:RequestGP;
AuthorisationOID:number;
AuthorisationType:string;
AuthorisationComments:string;
AuthorisationName:string;
RequestorRoleOID:string;
TransmitHistory:TransmitHistory;
CollectionMethod:string;
TradingPartnerAdditionalInfo:string;
SendResultsToCareProvider:string;
SendResultsToTeams:string;
ReqOriginatingServiceOID:number;
ReqOriginatingLocationOID:number;
IsPregnant:string;
IsFastingTimeSpecimen:string;
IsPreviousMRSApositive:string;
LastMenstrualPeriodDTTM:DateTime;
IsLMPDateConfirmed:string;
IsHighRisk:string;
OriginalRequestItemOID:number;
OriginalRequestItemName:string;
ReviewCategoryText:string;
ResultSharingStatus:string;
Problems:ObservableCollection<Problem>;
RequestClinicalNoteInfo:ObservableCollection<RequestCitation>;
Warnings:ObservableCollection<Warnings>;
Distribute:ObservableCollection<Recipient>;
RequestSchedule:ObservableCollection<RequestSchedule>;
RequestItemFormDetails:ObservableCollection<RequestCDCFormDetails>;
BubbleFormDetails:ObservableCollection<RequestCDCFormDetails>;
ConfigItems:ObservableCollection<ConfigurableItem>;
QuestionnaireItems:ObservableCollection<RequestQuestionnaireItem>;
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
export class ProblemLink_FHIRAPI extends CLZOObject{
HIArtefactOID:string;
CareRecordType:string;
ProblemOID:number;
}
export class CPatientProblemStatus_API extends CLZOObject{
Comments:string;
RSNSTCode:string;
OID:number;
CloseReopenDTTM:DateTime;
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
export class HOStatus extends StatusHistory{
IdentifyingOId:number;
IdentifyingType:string;
DASTSCode:string;
EnterpriseName:string;
EnterpriseDescription:string;
EnterpriseMainID:string;
}
export class ServicePointStatus extends StatusHistory{
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
export class RequestAdditionalInfo extends CLZOObject{
ReceivingLab:string;
CommunicationMode:string;
TransmissionDate:DateTime;
TPServiceOID:number;
IsTPTriggered:boolean;
RequestReceivedOn:string;
SpecimenSuggested:ObservableCollection<SpecimenDetails>;
}
export class SpecimenDetails extends CLZOObject{
ContainerOID:number;
SpecimenOID:number;
SpecimenCode:string;
SpecimenDefnName:string;
SpecimenDescription:string;
SpecimenTypeOID:number;
CollectionRoute:string;
BodySite:string;
VolumeToBeCollected:string;
VolumeToBeCollectedUOM:string;
ExpiryPeriodValue:number;
ExpiryPeriodUOM:string;
CollectionMethod:string;
Precondition:string;
Laterality:string;
CollectionProcedure:string;
SpecHandlingInstruction:string;
SpecRiskFactor:string;
IsCanBeCombined:boolean;
IsAllowModifySpec:boolean;
NoOfLables:number;
OffsetValue:number;
OffsetUOM:string;
SpecimenSuggestedOID:number;
SpecimenSuggestedID:string;
RequestDetailOID:number;
RequestDetailID:string;
PatientOID:number;
GeneratedSpecimenID:string;
VolumeCollected:string;
VolumeCollectedUOM:string;
SuggestedCollectionDTTM:DateTime;
SpecimenStatus:string;
SpecimenSequenceNumber:number;
OrganisationOID:number;
TradingPartnerServiceOID:number;
SpecimenCollectedOID:number;
SpecimenCollectedID:string;
Remarks:string;
ConsolidatedSpecimenStatus:string;
CollectionStatus:string;
CollectionStartDTTM:DateTime;
CollectionEndDTTM:DateTime;
CollectedUserOID:number;
VerifiedUserOID:number;
HasHistory:boolean;
RequestItemOID:number;
RequestItemID:string;
RequestItemName:string;
AgeMin:number;
AgeMax:number;
AgeUOM:string;
CollectionPeriodValue:number;
CollectionPeriodCode:string;
IsRegularInterval:boolean;
IntervalValue:number;
IntervalUOM:string;
Status:string;
RequestAssociated:string;
SpecimenTypeCode:string;
SpecimenTypeName:string;
CollectedBy:string;
VerifiedBy:string;
ContainerName:string;
LoactionOID:number;
LocationName:string;
DFTSpecCount:number;
DFTCount:string;
EncounterOID:number;
IsParent:boolean;
IsVolumeMandatory:boolean;
BodySiteText:string;
SpecSuggModifiedAt:string;
ReqDetModifiedAt:string;
DefaultCollectionMethod:string;
TotalSpecCount:number;
CollectionRouteText:string;
PreconditionText:string;
LateralityText:string;
CollectionProcedureText:string;
CollectionMethodText:string;
VolumeUOMText:string;
ExpiryUOMText:string;
ItemReferenceNumber:string;
ReqToBePerformedDTTM:string;
TypeOfCap:string;
SpecimenPriority:string;
SpecimenPriorityRank:number;
DeferUserIDs:string;
IsDisAssociated:boolean;
SpecimenIdentifier:string;
Reason:string;
IsLastCancelled:boolean;
IsEnableAddInfoTab:boolean;
PrevDFTDTTM:DateTime;
oMailDisclaimer:MailDisclaimer;
CreatedBy:string;
CreatedOn:DateTime;
ModifiedBy:string;
ModifiedOn:DateTime;
SMTYPCode:string;
IsFromMessaging:boolean;
IsResultsEntered:boolean;
ServicePointName:string;
EncounterType:string;
PatientName:string;
PatientID:string;
Gender:string;
DOB:DateTime;
NHSNumber:string;
ExpiryDTTM:DateTime;
isModifyResults:boolean;
IsBodySiteMand:boolean;
IsLateralityMand:boolean;
IsColRouteMand:boolean;
IsColProcedureMand:boolean;
IsPreConditionMand:boolean;
IsVolumeMand:boolean;
ChkMandatory:string;
IsOutboundTriggered:boolean;
CollectionGuidance:string;
SuggSpecStatus:string;
RequestedDTTM:DateTime;
TaskDesc:string;
ActualSuggCollDTTM:DateTime;
CanBeCombined:string;
CareActivity:string;
ExternalIdentifier:string;
IsChanged:boolean;
IsPrintOnlyOnPrintOrCollect:boolean;
SpecimenCollectedBy:dpUser;
SpecimenVerifiedBy:dpUser;
FirstSpecCollDTTM:DateTime;
ModSpecimenCount:number;
RequestedBy:string;
CollectionDate:string;
RequestedOn:string;
IsDisablePrintLabel:boolean;
IsScanOverridden:boolean;
OverriddenReason:string;
OverriddenComments:string;
EncounterTypeCode:string;
EXIDFCode:string;
RequestStatus:string;
CollectionRecipients:ObservableCollection<SpecimenSuggestedNotifiedUsers>;
}
export class MailDisclaimer{
OrganisationName:string;
OrganisationOID:number;
UserName:string;
UserOID:number;
RoleName:string;
RoleOID:number;
OrganisationAddress:string;
UserAddress:string;
UserTelephone:string;
UserNameRPT:string;
}
export class SpecimenSuggestedNotifiedUsers{
OID:number;
SpecimenSuggestedOID:number;
IdentifyingOID:number;
IdentifyingType:string;
IdentifyingName:string;
Status:string;
OwnerOrganisationOID:number;
}
export class RequestCDCForm extends CLZOObject{
BubbleCDCID:string;
BubbleCDCVersion:string;
RequestItemCDCID:string;
RequestItemCDCVersion:string;
IntrayCDCID:string;
IntrayCDCVersion:string;
RequestItemOID:string;
BubbleOID:number;
}
export class RequestCitation extends CLZOObject{
CitationID:string;
CitationName:string;
}
export class Recipient extends CLZOObject{
RecipientID:string;
Name:string;
Type:string;
IsTransmitted:string;
IdentifierValue:string;
RequestType:string;
}
export class RequestSchedule extends CLZOObject{
ScheduleID:string;
ScheduleDefinition:string;
ScheduleTypeCode:string;
RequestScheduleCriteriaOID:string;
IsApplicableForAllOccurrences:boolean;
IsActivateCancel:boolean;
}
export class RequestCDCFormDetails extends CLZOObject{
DataItemName:string;
DataItemValue:string;
}
export class RequestGP extends CLZOObject{
AdmFlag1Text:string;
AdmFlag2Text:string;
AdmFlag3Text:string;
AdmFlag4Text:string;
AdmFlag5Text:string;
AdmFlag6Text:string;
AdmFlag7Text:string;
AdmFlag8Text:string;
AdmFlag9Text:string;
AdmFlag10Text:string;
AdmFlag11Text:string;
AdmFlag12Text:string;
AdmFlag13Text:string;
AdmFlag14Text:string;
AdmFlag15Text:string;
AdmFieldText:string;
AdmField2Text:string;
AdmField3Text:string;
AdmFlag1Val:string;
AdmFlag2Val:string;
AdmFlag3Val:string;
AdmFlag4Val:string;
AdmFlag5Val:string;
AdmFlag6Val:string;
AdmFlag7Val:string;
AdmFlag8Val:string;
AdmFlag9Val:string;
AdmFlag10Val:string;
AdmFlag11Val:string;
AdmFlag12Val:string;
AdmFlag13Val:string;
AdmFlag14Val:string;
AdmFlag15Val:string;
AdmFieldVal:string;
AdmField2Val:string;
AdmField3Val:string;
AdmFieldValCode:string;
AdmFlag1ValCode:string;
AdmFlag2ValCode:string;
AdmFlag1Order:number;
AdmFlag2Order:number;
AdmFieldOrder:number;
}
export class TransmitHistory extends CLZOObject{
TransmissionMethod:string;
TransmittedTo:string;
TransmittedOn:DateTime;
}
export class ConfigurableItem extends CLZOObject{
ItemName:string;
ItemValue:string;
ItemValueCode:string;
ItemOrder:number;
ItemType:string;
RequestDetailOID:number;
}
export class RequestQuestionnaireItem{
RequestDetailOID:number;
PatientOID:number;
Name:string;
Value:string;
}
export class ManageRequestStatus extends CLZOObject{
RequestedUserID:number;
PatientID:string;
IsOnbehalfOf:boolean;
OnbehalfOfID:number;
OnbehalfOf:string;
RequestName:string;
RequestID:string;
RequestDetailID:string;
RequestItemID:string;
Encounter:string;
EncounterID:string;
LocationID:string;
Location:string;
HaveAdditional:string;
IsRepeatRequest:string;
ActivityDate:DateTime;
Reason:string;
Remarks:string;
Status:string;
UserName:string;
ReasonForOnbehalfOf:string;
ConstraintOID:string;
ConstraintName:string;
RequestHistoryStatus:string;
ReferenceID:string;
ReferenceType:string;
RequestedDTTM:DateTime;
RequestPriority:string;
RequestItemName:string;
ModfiedUserName:string;
HasIntrayForm:string;
oMailDisclaimer:MailDisclaimer;
ItemReferenceNo:string;
IdentifierSystem:string;
IsSpecDisassociated:boolean;
CancelDetails:string;
SelectedPatOID:string;
OnbehalfOfUserID:number;
RequestGPInfo:RequestGP;
OtherReqDetOIDs:string;
AuthorisationOID:number;
AuthorisationType:string;
AuthorisationComments:string;
IsPregnant:string;
IsFastingTimeSpecimen:string;
IsPreviousMRSApositive:string;
LastMenstrualPeriodDTTM:DateTime;
IsLMPDateConfirmed:string;
IsHighRisk:string;
OriginalRequestItemOID:number;
OriginalRequestItemName:string;
RequestReviewCategory:string;
RequestSpecialtyID:string;
ConfigItems:ObservableCollection<ConfigurableItem>;
}
export class ResultComponentValue extends CLZOObject{
MultiFlags:string;
ResultComponentValueOID:string;
ResultComponentHistoryOID:string;
RequestOID:string;
RequestedDttm:DateTime;
RequestDetailOID:string;
RequestRefNo:string;
RequestItemOID:number;
RequestItemName:string;
LocationName:string;
ResultEnteredUserName:string;
ResultEnteredUserOId:string;
ResultEnteredDateTime:DateTime;
SpecimenCollectedDTTM:DateTime;
SpecimenReceivedDTTM:DateTime;
SamplePerformedDTTM:DateTime;
ResultReceivedOn:DateTime;
CreatedAt:DateTime;
ResultOID:string;
ResultItemID:number;
ResultItemCode:string;
Sequence:number;
UOM:string;
LowerLimit:string;
UpperLimit:string;
ResultValue:string;
TextValue:string;
CustomValue:string;
CDCFormInstanceOID:string;
CDCFormInstanceVersion:number;
CDCFormOID:string;
ResultType:string;
CodedValue:Codification;
Comments:string;
AbnormalIndication:string;
ReferenceRange:string;
MediaLink:string;
ImageType:string;
ResultDTTM:DateTime;
ReportedDTTM:DateTime;
IsAcknowledged:boolean;
ResultPriority:string;
AcknowledgementComment:string;
AcknowledgedUserName:string;
AcknowledgedDTTM:DateTime;
OverallComments:string;
ResultStatus:string;
ResultStatusDisplayName:string;
ResultReceiptMode:string;
ResultItemName:string;
ResultComments:string;
ModifiedBy:string;
ModifiedByOID:number;
CreatedBy:string;
CreatedByOID:number;
ModifiedAt:DateTime;
PreviousResultvalue:string;
ResultParameter:string;
PreviousResultStatus:string;
AdditionalInformation:ObservableCollection<byte>;
ResultEnteredDate:DateTime;
ResultValueViewerOID:string;
ResultMediaOID:string;
MediaType:string;
AttachmentOID:string;
IsMultiLine:boolean;
TextResultOID:string;
IsAuthorisedUser:string;
IsHistoryAvailable:boolean;
IsConfidential:boolean;
AbnormalIndicationCode:string;
ExternalRefNumber:string;
SequenceNo:number;
DomainCode:string;
CodedType:string;
NormalReferenceRange:string;
PACSParameter:string;
IsAcknowledgementRequired:string;
InvestigationInterpretation:string;
SpecimenType:string;
SpecimenSite:string;
Laterality:string;
RequestComments:string;
Precondition:string;
AckHistory:boolean;
IsMessaging:boolean;
ComponentSeqNo:string;
IndicatorIcon:string;
ResultHistoryOID:number;
IsNonProportional:string;
PatientOID:number;
IsModified:boolean;
IsSupressWrap:boolean;
InclCommentsFields:string;
Supwrap:string;
abnor_indicator:string;
Nooflines:number;
IsAllowManual:string;
IsExclude:string;
SpecimenID:string;
RequestItemCode:string;
ResultItemStatus:string;
RequestReviewCategory:string;
ResultItemCodeDI:string;
TextualResultValueHRA:string;
EncounterIdentifierInfo:string;
CodeSystemIdentifier:string;
ReasonAndComments:string;
IsSameType:string;
IsUOMModified:string;
Careprovidername:string;
SamplePerformedDTTMTTOP:string;
IsSealExists:boolean;
IsIncludeComment:boolean;
ResultReviewCategory:string;
ResultValueViewer:ResultValueViewer;
OriginalRequestItemOID:number;
OriginalRequestItemName:string;
ExtAppName:string;
SubIdentifier:string;
IsDuplicateMapped:boolean;
HasRepetitiveComp:boolean;
IsCDSAlgExecReq:boolean;
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
export class ResultValueViewer{
OID:number;
IdentifyingType:string;
IdentifyingOID:number;
MediaTypeCode:string;
ViewerIdentifier:string;
ResultEncoding:string;
ResultCompression:string;
IsImage:boolean;
HaveHistory:string;
Status:string;
ResultMedia:ResultMedia;
}
export class ResultMedia{
OID:number;
ResultMediaValue:ObservableCollection<byte>;
ResultValueviewerOID:number;
Status:string;
}
export class ResultValuesRequest extends CLZOObject{
PatientOID:number;
EncounterOID:number;
}
export class ResultValuesResponse extends CLZOObject{
ResultName:string;
ResultItemOID:number;
ResultValue:string;
ResultType:string;
ResultComponentOID:number;
NormalValue:string;
ResultDateTime:DateTime;
ResultOID:number;
RequestOID:number;
ResultValueViewerOID:number;
ResultMediaValue:ObservableCollection<byte>;
}
export class ResultSeenDetail extends CLZOObject{
RequestOID:string;
RequestItemOID:string;
UserName:string;
UserOID:number;
Status:string;
SeenDate:DateTime;
IsDetailView:string;
CurrentUserInfo:string;
IsConfidential:string;
IsMessageSequence:string;
Contactnumber:string;
PatientOID:string;
TeamOID:string;
SeenType:string;
UserOIDs:string;
}
export class SearchResult extends CLZOObject{
RequestDetailOID:string;
ResultItemOID:string;
PatientOID:string;
}
export class AcknowledgeResultInfo extends CLZOObject{
ReferenceNumber:string;
Comments:string;
AcknowledgedAt:DateTime;
ResultComponentOID:string;
OverallComments:string;
RequestDetailOID:string;
ResultItemName:string;
RequestName:string;
ResultName:string;
}
export class ViewMYReqSearch extends CLZOObject{
UserOID:number;
PatientOID:number;
SearchPeriod:number;
ViewType:string;
IsFutureRequest:boolean;
IsCanceledRequest:boolean;
IsUnseen:boolean;
IsUnackResult:boolean;
IsReqWithResult:boolean;
DefaultServicePointOID:number;
PrimaryID:string;
SecondaryID:string;
TermText:string;
CfServicePointOIDs:string;
CfServiceDeptOIDs:string;
CfRequestStatus:string;
CfSpecimenStatus:string;
CfResultWFStatus:string;
CfResultStatus:string;
CfRequestingGrp:string;
SeenType:string;
oPagingDynamicSQL:PagingDynamicSQL;
SelectedRecordOIDs:string;
ExcludedTeams:string;
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
export class InvestigationResultBase extends CLZOObject{
InvestigationInterpretation:string;
IsAcknowledged:boolean;
IsSeen:boolean;
IsHistoryAvailable:boolean;
IsConfidential:boolean;
IsEscalation:boolean;
IsAbnormal:boolean;
ServiceDept:string;
RequestType:string;
SetInstanceOID:string;
SetName:string;
SetType:string;
SetReferenceNumber:string;
SetStatus:string;
SetPrimaryItem:string;
SetPrimaryItemId:number;
IsAcceptAllDates:string;
InstanceType:string;
AuthorisedUserName:string;
AuthorisedDTTM:DateTime;
InstanceStatusCode:string;
RequestItemOID:number;
RequestItemName:string;
OriginalRequestItemOID:number;
OriginalRequestItemName:string;
SpecialtyOID:number;
RequestStatus:string;
ResultOverallStatus:string;
WorkFlowStatus:string;
RequestPriority:string;
RequestRefNo:string;
GroupRefNo:string;
RequestOID:string;
RequestDetailOID:string;
PatientOID:string;
ResultOID:string;
HasResult:string;
Abnormality:string;
Icon:string;
ResultType:string;
OrganisationOID:string;
OrganisationName:string;
UserOID:number;
IsUnAcknowledgedFiltered:string;
IsUnSeenFiltered:string;
IsAbnormalFiltered:string;
IsConfidentialFiltered:string;
RequestResultIcon:string;
RequestPlaced:string;
ResultsAvailable:string;
RequestItemOIDs:string;
ResultItemOIDs:string;
ResWRKFSCode:string;
RequestingGroup:string;
PatientForename:string;
CareProviderName:string;
ServicePointName:string;
TradingPartnerName:string;
AddressLine1:string;
AddressLine2:string;
City:string;
PostCode:string;
}
export class InvestigationResultView extends InvestigationResultBase{
ResultReceivedDttm:DateTime;
SampleCollectedDttm:DateTime;
RequestDttm:DateTime;
ResultAuthorizedByID:number;
ResultAuthorizedBy:string;
ResultExpectedDttm:DateTime;
EncounterID:string;
ReviewCategory:string;
RequestedByID:number;
RequestedBy:string;
RequestPerformedDttm:DateTime;
AcknowledgedByID:number;
AcknowledgedBy:string;
IsPrimaryRequestItem:string;
IsEncounterPrimary:string;
AltRequestitemname:string;
EntereBy:string;
EnteredOn:DateTime;
MONEORMORERESULTSRECEIVED:number;
PENDINGAUTH:number;
PENDINGACK:number;
ALLRESULTSRECEIVED:number;
ITEMSOVERDUE:number;
RESCOMPL:number;
PatPrimId:string;
PatSecId:string;
AcknowledgedDTTM:DateTime;
ReportedDTTM:DateTime;
ContactMode:string;
ContactNumber:string;
RequestReason:string;
OnbehalfOfID:number;
OnbehalfOf:string;
OnbehalfOfReason:string;
RequestProblem:string;
ResultRecipient:string;
HaveAdditional:string;
SpecimenStatus:string;
IsRepeatRequest:string;
LocationOID:number;
LocationName:string;
ReqAuthorisedBy:string;
ReqToBePerformedDttm:DateTime;
EncounterType:string;
EncounterStatus:string;
EncounterMainIdentifier:string;
EncounterDate:DateTime;
ENCSTATUSCODE:string;
EncounterEndDttm:DateTime;
HOName:string;
SpecialityName:string;
TreatmentFunction:string;
CareProvider:string;
PatientID:string;
PatientName:string;
PatientDOB:DateTime;
Age:string;
Sex:string;
PatientLocation:string;
RepeatScheduleNo:string;
HaveRequestEntryForm:string;
ClinicalDetails:string;
IDN:string;
PageLength:string;
NavigationMode:string;
TotalRowCount:string;
CreatedAt:DateTime;
IsAcknowledgementRequired:string;
IsMessageRequest:string;
RequestItemCode:string;
IsPrinted:string;
CanOverrideConfidentialItems:boolean;
SpecimenReceivedDTTM:DateTime;
BookedDTTM:DateTime;
HaveBubbleEntryForm:string;
HaveRequestIntrayForm:string;
BubbleDisplayName:string;
Unseen:number;
Unacknowledged:number;
Abnormal:number;
Confidential:number;
ItemReferenceNo:string;
ReasonForCan:string;
SpecimenInfo:string;
RequestGPInfo:RequestGP;
AllRecCount:number;
SpecimenID:string;
SentForAuthName:string;
SentForComments:string;
IsSensitive:string;
SortDttm:DateTime;
PatientDisplayName:string;
IsPregnant:string;
IsFastingTimeSpecimen:string;
IsPreviousMRSApositive:string;
LastMenstrualPeriodDTTM:DateTime;
IsLMPDateConfirmed:string;
IsHighRisk:string;
ResultSharingStatus:string;
HasClinicalDetails:boolean;
ConfigItems:ObservableCollection<ConfigurableItem>;
}
export class ModificationHistory extends InvestigationResultView{
ResultValue:string;
TextualValue:string;
CustomValue:string;
UOM:string;
ReferenceRange:string;
Comments:string;
AbnormalIndicator:string;
ResultStatus:string;
ResultEnteredDateTime:DateTime;
ResultComponentOID:string;
PreviousResultComponentOID:string;
ResultComponentHistoryOID:string;
PreviousResultComponentHistoryOID:string;
ResultHistoryOID:string;
PreviousResultHistoryOID:string;
ResultValueViewerOID:string;
PreviousResultValueViewerOID:string;
ResultValueViewerHistoryOID:string;
PreviousResultValueViewerHistoryOID:string;
ResultItemOID:string;
ResultItemName:string;
ModifiedBy:string;
ResultMediaOID:string;
PreviousResultMediaOID:string;
MediaType:string;
PreviousMediaType:string;
ImageType:string;
PreviousImageType:string;
MediaLink:string;
PreviousMediaLink:string;
ResultParameter:string;
PreviousValue:string;
CurrentValue:string;
ModifiedAt:DateTime;
AdditionalInformation:ObservableCollection<byte>;
ResultEnteredOID:string;
PrevResultType:string;
CDCFormInstanceOID:string;
PreviousCDCFormInstanceOID:string;
CDCFormName:string;
PreviousCDCFormName:string;
IdentifyingType:string;
PreviousIdentifyingType:string;
OverallComments:string;
IsResultExcluded:string;
SubIdentifier:string;
}
export class SearchInvestigationResult extends InvestigationResultBase{
RequestItemType:string;
Requestedby:string;
ContainRequestItemOIDs:string;
Organisation:string;
ResultItemOID:number;
ResultItemCode:string;
ProblemsAssociated:string;
ResultCategory:string;
DateQualifier:string;
Period:string;
FromDate:DateTime;
ToDate:DateTime;
EncounterOID:string;
IsGroupBy:boolean;
PatientName:string;
PatientLocationOID:string;
EncounterType:string;
ShowAdminEncounters:boolean;
IsResAcknowledged:string;
IsResSeen:string;
IsResHistoryAvailable:string;
IDN:string;
PageLength:string;
NavigationMode:string;
TotalRowCount:string;
CreatedAt:string;
IsPaging:boolean;
CurrentUserInfo:string;
FilterType:string;
PageInfo:string;
IsExecute:string;
ReviewCategory:string;
IsEmergency:boolean;
ResultComponentOID:string;
RowCount:number;
ServicePointOID:string;
CareProviderOID:string;
IsForLifeView:boolean;
SeenType:string;
TeamOID:string;
SpecialtyOIDs:string;
SpecStatusCode:string;
sRequestDetOID:string;
CACode:string;
SealRecordListBC:string;
SealImageListBC:string;
}
export class InvestigationTabularView extends InvestigationResultBase{
ResultReceivedDttm:DateTime;
ReviewCategory:string;
ResultItemCode:string;
CustomValue:string;
ResultStatus:string;
ReferenceRange:string;
ResultItemID:string;
ResultMediaOID:string;
UOM:string;
ResultIdentifyingType:string;
ResultIdentifyingOID:string;
ResultEnteredBy:string;
NormalReferenceRange:string;
Comments:string;
IsMessaging:boolean;
LowerLimit:string;
UpperLimit:string;
RRSequence:string;
ResultItemSequence:string;
RICode:string;
HasDataFilter:string;
AbnDisplayName:string;
UOMDisplayName:string;
RefRange:string;
OverallComments:string;
IsExclude:boolean;
IsPrimary:boolean;
PrevModifedDt:DateTime;
IsAnomaly:boolean;
}
export class UnsolAdocResDetails extends CLZOObject{
RequestResultIcon:string;
InvestigationName:string;
SamplePerformedDTTM:string;
ResultReportedDTTM:string;
ServiceDepartment:string;
ResultStatus:string;
ItemReferenceNumber:string;
ExternalRefNumber:string;
PatientID:string;
RequestDetailOID:string;
ReqGroupReference:string;
}
export class AcknowledgementHistory extends CLZOObject{
DateandTime:DateTime;
EnteredBy:string;
Comments:string;
Reason:string;
}
export class RetrieveSampleDate extends CLZOObject{
RequestItemOID:number;
RequestDetailOID:number;
IsSolicitated:string;
IsMsging:string;
PatientOID:number;
}
export class ResultSampleDate extends CLZOObject{
IsSpecDefinAvail:string;
SampleCollectionDate:DateTime;
ReqToBePerformedDate:DateTime;
}
export class EncounterDetails extends CLZOObject{
EncounterOID:string;
EncIdentifier:string;
EncType:string;
}
export class LRSUsersOrTeams extends CLZOObject{
NoteIdentifyOID:string;
NoteIdentifyName:string;
NoteIdentifyType:string;
MembershipWorkGroupID:string;
AccessCntrlWorkGroupID:string;
RoleProfileCode:string;
WorkgroupCode:string;
}
export class RMPatientFlagsCriteria extends CLZOObject{
AcknowledgementEscalationTimePeriod:TimeSpan;
ExcludeManuallyEnteredResults:boolean;
WithinRangeOfEpisode:boolean;
WithinRangeOfEncounter:boolean;
EncounterOID:number;
TimePeriod:TimeSpan;
StartDttm:DateTime;
IncludeRequestFlags:boolean;
IncludeResultFlags:boolean;
RQTYPCodes:ObservableCollection<string>;
Departments:ObservableCollection<string>;
}
export class TimeSpan{
}
export class RMPatientFlagsData extends CLZOObject{
PatientFlags:ObservableCollection<RMPatientFlags>;
DepartmentFlags:ObservableCollection<RMCategorizedFlags>;
ReviewCategoryFlags:ObservableCollection<RMCategorizedFlags>;
UrgencyFlags:ObservableCollection<RMCategorizedFlags>;
ResultUrgencyFlags:ObservableCollection<RMCategorizedFlags>;
}
export class RMPatientFlags{
PatientOID:number;
TotalCount:number;
AbnormalCount:number;
UnacknowledgedCount:number;
UnseenCount:number;
UnseenAndAbnormalCount:number;
UnseenAndUnacknowledgedCount:number;
AcknowledgementEscalationCount:number;
UnseenAndSealedCount:number;
MostRecentResultReceivedDttm:DateTime;
RequestCount:number;
MostRecentRequestPlacedDttm:DateTime;
}
export class RMCategorizedFlags extends RMPatientFlags{
Category:string;
PatientOIDs:ObservableCollection<number>;
}
export class NewEvents extends CLZOObject{
OID:string;
UsersOID:number;
PatientOID:string;
ModifiedAt:DateTime;
Status:string;
IdentifyingOID:string;
IdentifyingType:string;
IsAbnormalFlag:string;
IsViewed:string;
EncounterOID:string;
OwnerOrganisationOID:number;
LoggedinHO:number;
IsConsent:string;
PageInfo:string;
}
export class NewRequests extends CLZOObject{
OID:string;
ResultItemName:string;
RequestedUserName:string;
RequestedDTTM:DateTime;
SpecialtyName:string;
Status:string;
Priority:string;
RequestType:string;
ToBePerformedDTTM:DateTime;
ResultRequiredDTTM:DateTime;
EncounterOID:string;
ConsentCount:string;
OriginalRequestItemOID:number;
OriginalRequestItemName:string;
}
export class NewResults extends CLZOObject{
OID:string;
RequestOID:string;
ResultItemName:string;
INTFLCode:string;
IdentifyingResultValue:string;
ReferenceRange:string;
UOM:string;
IsAbnormalFlag:string;
ConsentCount:string;
Status:string;
ReqDetOID:string;
ResultType:string;
ResultItemOID:string;
Requestitemname:string;
Specialtyname:string;
Collectiondate:DateTime;
RequestBy:string;
ResultStatus:string;
PageInfo:string;
ResEnteredBy:string;
IsConfidential:string;
OriginalRequestItemOID:number;
OriginalRequestItemName:string;
}
export class ResultBubbleInfo extends CLZOObject{
ResultOID:string;
ResultReceivedDttm:DateTime;
ResultStatus:string;
ResultEnteredBy:string;
Speciality:string;
Abnormality:string;
RequestItemName:string;
RequestdetailOID:string;
EncounterOID:string;
RequestOID:string;
RequestItemOID:string;
ModifiedAt:DateTime;
RequestedUserOID:string;
HaveRequestEntryForm:string;
MVName:string;
MVUserOID:string;
RequestRefNo:string;
ResEnteredUserOID:string;
ResEnteredUserName:string;
RequestorRoleOID:string;
RequestedDttm:DateTime;
ItemReferenceNo:string;
PatientOID:string;
PACSParameter:string;
Interfaceprofileoid:string;
SpecimenInfo:string;
OnBehalfOfUserOID:number;
RequestItemCode:string;
RequestToBePerformedDTTM:DateTime;
SampleCollectedDttm:DateTime;
RejectionComments:string;
IsResultRejected:string;
IsThruMessaging:string;
AckComments:string;
RQPRTCode:string;
PRITYCode:string;
EncounterType:string;
CareProvider:string;
SPECName:string;
TreatmentFn:string;
EncounterDttm:DateTime;
ENSTACode:string;
EncounterMainIdentifier:string;
HOName:string;
}
export class ModifiedRequest extends CLZOObject{
PatientOID:number;
RequestDetailOID:number;
RequestItemOID:number;
Code:string;
Name:string;
EncounterOID:number;
EncounterID:string;
EncounterType:string;
Status:string;
WorkFlowStatus:string;
RequestITemType:string;
Priority:string;
ServiceDepartment:string;
RequestedDttm:DateTime;
ReferenceNumber:string;
OwnerOrganisationOID:number;
ReviewCategory:string;
RequestReason:string;
SamplePerformedDttm:DateTime;
AssociatedProblems:string;
RequestedBy:string;
ModifiedAt:DateTime;
Result:ModifiedResult;
ToBePerformedDttm:DateTime;
ResultRequiredDttm:DateTime;
BookedDttm:DateTime;
SpecimenReferenceNumber:string;
RequestOID:number;
SealIndication:number;
ReqComments:string;
RequestedUserOID:number;
SpecimenSuggestedOID:number;
BehalfOfUserOID:number;
ResultSeenUserOID:number;
ResultSeenHisOID:number;
GroupReferenceNumber:string;
ContactMode:string;
ContactNumber:string;
SpecimenOIDs:string;
IsHighRisk:string;
IsPregnant:string;
IsFastingTimeSpecimen:string;
IsPreviousMRSApositive:string;
LastMenstrualPeriodDTTM:DateTime;
IsLMPDateConfirmed:string;
CollectionMethod:string;
BubbleFormOID:number;
RequestFormOID:number;
RequestTypeCode:string;
SendResultsTo:string;
ContactModeCode:string;
RequestTypeCodeInfo:string;
AcknowledgedComments:string;
ResPriorityCode:string;
ResPriorityText:string;
ReqPriorityCode:string;
ReqPriorityText:string;
TotalRecordCNT:number;
ActiveRecordCNT:number;
IsSealLockCNT:number;
Resultcount:number;
IsSEALCount:number;
IsAlternateOf:string;
LabReferenceCode:string;
PacsParameter:string;
ExtAppName:string;
SWPSSCodeReq:string;
PatientIdentifier:string;
}
export class ModifiedResult{
ResultOID:number;
Status:string;
Priority:string;
PacsParameter:string;
ModifiedAt:DateTime;
PerformedBy:string;
PerformedByUserOId:string;
IsAcknowledged:boolean;
AcknowledgedBy:string;
AcknowledgedDttm:DateTime;
AcknowledgeComments:string;
ReportedDttm:DateTime;
ExternalReferenceNumber:string;
OverallComments:string;
IsManualResult:boolean;
AcknowledgedComments:string;
ResPriorityCode:string;
ResPriorityText:string;
ReqPriorityCode:string;
ReqPriorityText:string;
LabReferenceCode:string;
ExtAppName:string;
IsAlternateOf:string;
SWPSSCodeRes:string;
ResultSeenUsers:ObservableCollection<number>;
ResultComponents:ObservableCollection<ModifiedResultComponent>;
}
export class ModifiedResultComponent{
ResultComponentOID:number;
ResultItemOID:number;
Code:string;
Name:string;
Status:string;
ResultType:string;
Value:string;
UOM:string;
AbnormalityCode:string;
ReferenceRange:string;
ReviewCategory:string;
Comments:string;
ModifiedAt:DateTime;
AcknowledgedComments:string;
ResPriorityCode:string;
}
export class IntrayNotification extends CLZOObject{
NotificationType:string;
Startdate:DateTime;
EndDate:DateTime;
Priority:string;
subject:FYISubject;
CAName:string;
CAOID:string;
CACode:string;
PatientOID:string;
EncounterOID:string;
RequestDetailOID:string;
IdentifyingType:string;
IdentifyingOID:string;
IdentifyingTeamOID:string;
PatientName:string;
PatientDOB:string;
Location:string;
PasID:string;
CAMenuCode:string;
RequestedDttm:DateTime;
REQSTCode:string;
ResultOID:string;
}
export class FYISubject extends CLZOObject{
NotificationMessage:string;
PatientName:string;
PatientID:string;
PatientDOB:string;
PatientLocation:string;
RequestItemName:string;
ResultReportedDate:DateTime;
ResultStatus:string;
ResultItemName:string;
NotDescription:string;
RequestID:string;
}
export class WarningDetails extends CLZOObject{
WarningOID:number;
WarningType:string;
WarningSubType:string;
WarningMessage:string;
WarningSeverity:string;
WarningBehaviourType:string;
AcknowledgeStatus:string;
PrescriberComments:string;
AuthroiserComments:string;
ClinicallVeriferComments:string;
ApplicableTo:string;
IsProblem:boolean;
ProblemText:string;
PerformedOn:DateTime;
MessageFormat:MessageFormat;
PrescriptionItem:ObjectInfo;
ConflictMessage:string;
DisplaySequenceNumber:number;
MonoGraphcontentOID:number;
DrugMonoInfoOID:number;
SourceDataProviderType:string;
AllergyMsgTrigged:string;
Code:string;
ConflictType:string;
sFrstNotAlrgyCheck:string;
IsSeal:string;
TypeColorCode:string;
PrescriptionDTTM:DateTime;
PrescriptionStartDTTM:DateTime;
MCChildIDType:string;
MCChildIDName:string;
MCChildIDOID:number;
DrugMulticomponentOID:number;
UniqueMCRowID:number;
HealthIssueCode:string;
HealthIssueType:string;
IsMandatoryForOthers:boolean;
}
export class MessageFormat extends CLZOObject{
FirstMessage:string;
SecondMessage:string;
ThirdMessage:string;
FourthMessage:string;
FifthMessage:string;
SixthMessage:string;
}
export class PrintResultsTemplate extends CLZOObject{
SpecimenType:string;
RequestItemName:string;
PatientName:string;
Sex:string;
Age:number;
PatientID:string;
SpecimenSite:string;
Laterality:string;
SamplePerformed:DateTime;
HoID:string;
RequestComments:string;
DOB:DateTime;
Precondition:string;
ResultIds:string;
HoName:string;
RequestedBy:string;
OverallComments:string;
RequestedDttm:DateTime;
oResultComponentValue:ObservableCollection<ResultComponentValue>;
}
export class ResultsCodingDetails extends CLZOObject{
Investigation:string;
ServiceDept:string;
Requestdatetime:DateTime;
Reportdatetime:DateTime;
ResultStatus:string;
ReferenceNo:string;
ReqDetOID:string;
ReqItemOID:string;
isHasDFRights:boolean;
ResWFStatus:string;
SealTypeinfo:string;
SealImageinfo:string;
}
export class InvestigationResultDetail extends CLZOObject{
OInvResultView:InvestigationResultView;
oResultComponentValue:ObservableCollection<ResultComponentValue>;
}
export class ResultSummaryCount extends CLZOObject{
AllRecord:number;
UnSeen:number;
UnAcknowledge:number;
}
export class RequestItemDataFilter extends CLZOObject{
RequestItemOID:string;
CAName:string;
CurrentUserDataFilter:string;
UsersOID:string;
AuthorisedStatus:boolean;
}
export class AccessRights extends CLZOObject{
UserOID:number;
PermissionCode:string;
Permissiondescription:string;
CanViewGraph:boolean;
CanViewMultiComponentGraph:boolean;
CanViewSeenByHistory:boolean;
CanViewModificationHistory:boolean;
CanViewStatusHistory:boolean;
CanViewOverrideConfidentialItems:boolean;
CanListResults:boolean;
CanViewResults:boolean;
CanViewResultTypes:boolean;
CanSetResultStatus:boolean;
CanViewUnauthorisedResults:boolean;
CanViewUnverifiedResults:boolean;
}
export class ManageResultStatus extends CLZOObject{
ResultDetails:ResultInfo;
ResultStatusInfo:ResultStatusInfo;
ResultAdditionalDetails:ResultAdditionalInfo;
RequestCtxt:RequestContext;
PrevModifedDate:DateTime;
SpecimenInformation:SpecimenInformation;
}
export class ResultInfo extends CLZOObject{
RequestedUserOID:string;
RequestItemName:string;
IsThruMessaging:string;
PatientInvestigationRequestID:string;
ResultReceivedDttm:DateTime;
SampleCollectedDttm:DateTime;
ResultStatus:string;
Reason:string;
OnbehalfOfID:number;
OnbehalfOf:string;
EncounterOID:string;
ResultsOID:string;
RoleID:string;
IsSameType:string;
IsUOMModified:string;
IsResultRejected:string;
EncMainIdentifier:string;
RequestedUserInternal:boolean;
OBOUserInternal:boolean;
ResultValues:ObservableCollection<ResultComponentValue>;
}
export class ResultStatusInfo extends CLZOObject{
PatientInvestigationRequestID:string;
ResultOID:string;
ResultActionOID:string;
ResultHistoryOID:string;
ActivityCode:string;
IsAuthorisation:string;
ActivityDate:DateTime;
IsAcknowledged:boolean;
UserOrTeamValue:string;
Reason:string;
Comments:string;
AcknowledgeComments:string;
OnbehalfOfID:number;
OnbehalfOf:string;
RequestItemOID:string;
IsUserOrTeam:string;
UserOIDOrTeamOID:string;
EMailID:string;
SenderName:string;
IsAckRequired:boolean;
sResultItemIDs:string;
RequestDetOID:string;
Resultstatus:string;
IsRejected:boolean;
}
export class ResultAdditionalInfo extends CLZOObject{
ExternalRefNumber:string;
ResultPriority:string;
PerformedByUserID:number;
PerformedByUser:string;
IsPointofCare:boolean;
Location:string;
LocationOID:number;
Device:string;
DeviceOID:number;
Comments:string;
NoteIdentifyOID:string;
NoteIdentifyName:string;
NoteIdentifyType:string;
NoteCPOID:string;
NoteTMOID:string;
NoteCPName:string;
NoteTMName:string;
HasAbnormal:string;
NoteIdentifyValue:string;
NotifyResults:string;
AcknowledgeRequired:string;
AcknowledgeStatus:string;
RoleProfileCode:string;
WorkgroupCode:string;
MembershipWorkGroupID:string;
AccessCntrlWorkGroupID:string;
DeletedUsersTag:string;
IsRecipientChanged:boolean;
oMailDisclaimer:MailDisclaimer;
AbnormalStatus:string;
ItemReferenceNo:string;
RequestedBy:string;
RequestedByID:number;
SpecimenID:string;
RESPTCode:string;
IsSolicitedRequest:string;
IsMessaging:string;
ReqReason:string;
}
export class RequestContext extends CLZOObject{
RequestDetailOID:string;
PatientID:string;
EncounterID:string;
PatientName:string;
PatientDOB:string;
Location:string;
PasID:string;
ReviewCategory:string;
ResultEnteredBy:string;
ServicePointOID:number;
LocationOID:number;
EncounterType:string;
OrganisationOID:number;
CareProviderID:number;
SpecialtyOID:number;
ReferenceNo:string;
ResEnteredUserOID:string;
ResEnteredUserName:string;
PACSParameter:string;
ExtAppName:string;
FromCA:string;
AcknowledgedUserId:number;
EncModified:string;
ReqOriginatingLocationOID:number;
ReqOriginatingServiceOID:number;
RequestedDate:DateTime;
ToBePerformedDate:DateTime;
BookedDateTime:DateTime;
IsUnsolicited:string;
RequestorRoleOID:string;
CurrentStatusForEscalation:string;
isAllResultsCancelled:boolean;
PatientOID:string;
InterfaceProfileOID:string;
OnBehalfOfRequestor:number;
LastModifiedDTTM:DateTime;
ResultSharingStatus:string;
EncounterIDType:string;
}
export class SpecimenInformation extends CLZOObject{
ObservationDateTime:DateTime;
SpecimenComments:string;
SpecimenTypeID:number;
CollectionMethod:string;
CollectionSite:string;
PlacerID:string;
VolumeToBeCollected:string;
AnalyticalUOM:string;
ContainerUsedID:number;
CollectionRoute:string;
ObservationEndDateTime:DateTime;
SpecimenOID:number;
SpecimenTypeCode:string;
Laterality:string;
}
export class PatientInvestigationResult extends CLZOObject{
RequestCtxt:RequestContext;
ResultDetails:ResultInfo;
RequestResultItemDetails:RequestResultRuntimeMap;
ResultStatusInfo:ResultStatusInfo;
SpecimenInformation:SpecimenInformation;
IsPlaceRequestRequired:boolean;
IsRunTimeMappingRequired:boolean;
IsAckReqForUnsolresult:boolean;
ResultAdditionalDetails:ResultAdditionalInfo;
Distribute:ObservableCollection<Recipient>;
}
export class RequestResultRuntimeMap extends CLZOObject{
RequestItemID:number;
RequestItemName:string;
ResultItemID:number;
ResultItemName:string;
SpecialityID:number;
SpecialityName:string;
}
export class ResultItemBase extends CLZOObject{
Type:string;
TextType:string;
SpecialtyOID:number;
Specialty:string;
ReviewCategory:string;
Code:string;
DisplayName:string;
Description:string;
Sequence:number;
}
export class ResultItem extends ResultItemBase{
ResultItemOID:number;
IsMultiLine:boolean;
ActiveFrom:DateTime;
ActiveTo:DateTime;
Status:string;
OrganisationOID:number;
OrganisationName:string;
CreatedByCareProviderOID:number;
CreatedByCareProviderName:string;
ModifiedByCareProviderOID:number;
ModifiedByCareProviderName:string;
CreatedAt:DateTime;
ModifiedAt:DateTime;
ResultItemVersion:string;
IsCentral:string;
Notify:string;
LocalNotify:string;
Acknowledgement:string;
LocalAcknowledgement:string;
LocalOrganisationOID:string;
LocalResultItemOID:number;
IsIncludeAck:string;
IsNonProportionalFont:string;
InclCommentsFields:string;
Supwrap:string;
abnor_indicator:string;
rowcount:number;
Nooflines:number;
IsAllowManual:string;
ResultType:string;
ResultItemLocalOID:number;
ResultSharingStatus:string;
Synonym:ObservableCollection<string>;
}
export class RequestEntryForm extends CLZOObject{
OrganisationName:string;
organisationOID:string;
RequestFormOID:number;
RequestFormCode:string;
RequestFormType:string;
RequestFormVersion:string;
StationaryOID:number;
Stationary:string;
IsIntrayForm:boolean;
IsFormStoredInPatientEPR:boolean;
RequestFormName:string;
EntryFormCarryForward:boolean;
IsFormEPRTab:number;
ConstraintsOID:string;
TemplateType:string;
StationaryCode:string;
}
export class PrintResults extends CLZOObject{
oInvResultView:InvestigationResultView;
oResultComponentValue:ResultComponentValue;
RequestItemName:string;
PatientName:string;
Sex:string;
Age:number;
PatientID:string;
SpecimenName:string;
ResultPriority:string;
}
export class SeenResultReport extends CLZOObject{
Surname:string;
Forename:string;
Sex:string;
BirthDTTM:DateTime;
Line1:string;
PostCode:string;
RequestItemName:string;
REQSTCode:string;
RequestedUserName:string;
ResultSeenUserName:string;
ResultSeenDTTM:DateTime;
Speciality:string;
Contactno:string;
ContactDetail:string;
NHSNumber:string;
PatientID:string;
MainIdentifier:string;
HOIdentifier:string;
IsSensitive:string;
}
export class ResultAcknowledgedReport extends CLZOObject{
oSeenResultReport:SeenResultReport;
PatientName:string;
RequestedDTTM:DateTime;
CareProviderName:string;
PASID:string;
HOIdentifier:string;
RequestedUserName:string;
RequestItemName:string;
REQSTCode:string;
}
export class ResultUnAcknowledgedReport extends CLZOObject{
oSeenResultReport:SeenResultReport;
RequestedDTTM:DateTime;
PatientName:string;
PASID:string;
ResultDTTM:DateTime;
CareProviderName:string;
HOIdentifier:string;
RequestedUserName:string;
RequestItemName:string;
CPName:string;
}
export class CResMsgGetRequestItemNameFiltr{
oContextInformation:CContextInformation;
oRequestItems:ObservableCollection<RequestItems>;
}
export class CReqMsgServiceRequest{
objManageReqStatusBC:ManageRequest;
oContextInformation:CContextInformation;
}
export class CResMsgServiceRequest{
oContextInformation:CContextInformation;
}
export class CReqMsgGetResultAndReqItmDF{
sReqDtOIDBC:string;
sReqPatientOIDBC:string;
CANameBC:string;
UsersOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetResultAndReqItmDF{
bAuthStatus:boolean;
sStatus:string;
oContextInformation:CContextInformation;
}
export class CReqMsgGetResultForPrescription{
ResultItemOIDBC:string;
sCriteriaBC:string;
sOrganisationOIDBC:string;
sPatientOIDBC:string;
sUserOIDBC:number;
sSealRecordListBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetResultForPrescription{
oContextInformation:CContextInformation;
objResult:ObservableCollection<ResultComponentValue>;
}
export class CReqMsgGetResultDetailsByPatOrEncOID{
oResultValuesRequestBC:ResultValuesRequest;
oContextInformation:CContextInformation;
}
export class CResMsgGetResultDetailsByPatOrEncOID{
oContextInformation:CContextInformation;
oResultValuesResponse:ObservableCollection<ResultValuesResponse>;
}
export class CReqMsgReassignAcknowledgementTask{
objTaskDetailsBC:CIntrayTask;
objRecipientdetailBC:ResultSeenDetail;
oContextInformation:CContextInformation;
}
export class CIntrayTask{
TaskName:string;
TaskType:string;
CACode:string;
TaskDescription:string;
Assign:boolean;
IsFrameWorktask:string;
PlannedStartDTTM:DateTime;
PlannedEndDTTM:DateTime;
RecurStartDTTM:DateTime;
oRecurrenceVO:CRecurrenceVO;
IsScheduleTask:string;
RecurIteration:number;
AppCode:string;
CareActivityOID:number;
RequestorOID:number;
Priority:string;
DataPacket:ObservableCollection<byte>;
EscalationPolicyOID:number;
OriginatorOID:number;
OriginatorOrgOID:number;
ProfileTaskName:string;
oTaskContext:ObservableCollection<CTaskContext>;
oTaskUser:ObservableCollection<CTaskUser>;
oTaskNotify:ObservableCollection<CTaskNotifyList>;
}
export class CRecurrenceVO{
RecurrenceID:number;
RecurrenceInterval:number;
RecurrenceType:string;
WeekFlag:string;
RecurrenceCycles:ObservableCollection<CRecurrenceCycleVO>;
}
export class CRecurrenceCycleVO{
Unit:string;
Value:string;
FindConsecutiveDays:boolean;
RecurrenceCycles:ObservableCollection<CRecurrenceCycleVO>;
}
export class CTaskContext{
IdentifyingType:string;
IdentifyingValue:string;
}
export class CTaskUser{
IdentifyingType:string;
IdentifyingValue:number;
RoleProfileOID:number;
}
export class CTaskNotifyList{
ExternalMode:string;
}
export class CResMsgReassignAcknowledgementTask{
oContextInformation:CContextInformation;
}
export class CReqMsgGetRequestComments{
oReqIdsBC:SearchResult;
oContextInformation:CContextInformation;
}
export class CResMsgGetRequestComments{
oContextInformation:CContextInformation;
oReqComments:ObservableCollection<AcknowledgeResultInfo>;
}
export class CReqMsgGetMyRequestView{
oSearchBC:ViewMYReqSearch;
oContextInformation:CContextInformation;
}
export class CResMsgGetMyRequestView{
oContextInformation:CContextInformation;
oRequest:ObservableCollection<InvestigationResultView>;
}
export class CReqMsgGetViewMyRequestList{
oSearchBC:ViewMYReqSearch;
oContextInformation:CContextInformation;
}
export class CResMsgGetViewMyRequestList{
oRequest:ViewMyRequestResultView;
oContextInformation:CContextInformation;
}
export class ViewMyRequestResultView{
TotalRecords:number;
AllRecords:number;
oInvestigationResultView:ObservableCollection<InvestigationResultView>;
}
export class CReqMsgGetMyRequestChildView{
oSearchBC:ViewMYReqSearch;
oContextInformation:CContextInformation;
}
export class CResMsgGetMyRequestChildView{
oContextInformation:CContextInformation;
oRequest:ObservableCollection<InvestigationResultView>;
}
export class CReqMsgGetUnsolicitedAdocResults{
sPatientOIDBC:string;
CurrentDTTMBC:DateTime;
oContextInformation:CContextInformation;
}
export class CResMsgGetUnsolicitedAdocResults{
oContextInformation:CContextInformation;
oResults:ObservableCollection<UnsolAdocResDetails>;
}
export class CReqMsgGetPatUnsolicitedAdocResults{
sPatientOIDBC:string;
CurrentDTTMBC:DateTime;
oContextInformation:CContextInformation;
}
export class CResMsgGetPatUnsolicitedAdocResults{
oContextInformation:CContextInformation;
oResults:ObservableCollection<UnsolAdocResDetails>;
}
export class CReqMsgModAckHistory{
reqDetailOIDBC:string;
patientOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgModAckHistory{
ackHis:AcknowledgementHistory;
oContextInformation:CContextInformation;
}
export class CReqMsgGetResultItemTextDetails{
resultItemOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetResultItemTextDetails{
oContextInformation:CContextInformation;
textReferenceRange:ObservableCollection<TextReferenceRange>;
}
export class TextReferenceRange{
DegreeofNormality:string;
ReferencePoint:string;
CriteriaID:number;
CriteriaName:string;
}
export class CReqMsgGetSamplePerformedDTTM{
requestBC:RetrieveSampleDate;
oContextInformation:CContextInformation;
}
export class CResMsgGetSamplePerformedDTTM{
oContextInformation:CContextInformation;
response:ObservableCollection<ResultSampleDate>;
}
export class CReqMsgGetResultByResultHisID{
resultHistoryIDBC:string;
patientOIDBC:string;
resultItemOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetResultByResultHisID{
resultComponentValue:ResultComponentValue;
oContextInformation:CContextInformation;
}
export class CReqMsgEncounterAvailCheck{
sPatientOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgEncounterAvailCheck{
oContextInformation:CContextInformation;
oResults:ObservableCollection<EncounterDetails>;
}
export class CReqMsgGetUnSeenResultList{
sPatientBC:string;
sUserOIDBC:string;
sUserInfoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetUnSeenResultList{
oContextInformation:CContextInformation;
oResult:ObservableCollection<InvestigationResultView>;
}
export class CReqMsgGetResultStatusCode{
requestDetailOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetResultStatusCode{
status:string;
oContextInformation:CContextInformation;
}
export class CReqMsgGetLRSUsersOrTeams{
resultOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetLRSUsersOrTeams{
oContextInformation:CContextInformation;
lrsUsersOrTeams:ObservableCollection<LRSUsersOrTeams>;
}
export class CReqMsgGetCombinedSpecimenCollection{
requestDetailOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetCombinedSpecimenCollection{
isCombinedSpecimenCollection:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgGetPatientFlags{
criteriaBC:RMPatientFlagsCriteria;
oContextInformation:CContextInformation;
patientOIDsBC:ObservableCollection<number>;
}
export class CResMsgGetPatientFlags{
patientFlagsData:RMPatientFlagsData;
oContextInformation:CContextInformation;
}
export class CReqMsgGetNewRequests{
objReqNewEventsBC:NewEvents;
oContextInformation:CContextInformation;
}
export class CResMsgGetNewRequests{
sConsentCount:string;
oContextInformation:CContextInformation;
objResNewRequests:ObservableCollection<NewRequests>;
}
export class CReqMsgGetNewResults{
objReqNewEventsBC:NewEvents;
oContextInformation:CContextInformation;
}
export class CResMsgGetNewResults{
sConsentCount:string;
oContextInformation:CContextInformation;
objResNewResults:ObservableCollection<NewResults>;
}
export class CReqMsgGetPendingResults{
patientOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetPendingResults{
oContextInformation:CContextInformation;
}
export class CReqMsgGetUnseenResults{
patientOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetUnseenResults{
oContextInformation:CContextInformation;
}
export class CReqMsgGetResultDIAppName{
resultOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetResultDIAppName{
useDI:boolean;
appName:string;
oContextInformation:CContextInformation;
}
export class CReqMsgGetImageOnlyResults{
patientOIDBC:number;
requestDetailOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetImageOnlyResults{
oContextInformation:CContextInformation;
requestDetailOIDs:ObservableCollection<string>;
}
export class CReqMsgGetCIBubbleResultInfo{
lRequestOIDsBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetCIBubbleResultInfo{
oContextInformation:CContextInformation;
oResults:ObservableCollection<ResultBubbleInfo>;
}
export class CReqMsgGetDIRnRParamValues{
oSearchBC:SearchResult;
oContextInformation:CContextInformation;
}
export class CResMsgGetDIRnRParamValues{
oResults:AKADIParams;
oContextInformation:CContextInformation;
}
export class AKADIParams{
PatientOID:string;
OrgOID:string;
RequestOID:string;
RequestDetailOID:string;
RequestItemOID:string;
RequestItemCode:string;
RequestItemName:string;
RequestCategory:string;
RequestType:string;
ResultOID:string;
ResultItemOID:string;
ResultItemName:string;
ResultItemCode:string;
ResultCategory:string;
ResultType:string;
ExtAppName:string;
ExtRefNo:string;
ExtPACSParam:string;
}
export class CReqMsggetResultDtls{
resultOIDBC:number;
organisationOIDBC:number;
userOIDBC:number;
oContextInformation:CContextInformation;
patientOIDsBC:ObservableCollection<number>;
}
export class CResMsggetResultDtls{
oContextInformation:CContextInformation;
modifiedRequests:ObservableCollection<ModifiedRequest>;
}
export class CReqMsggetResultDtlsPatMerge{
resultOIDBC:number;
organisationOIDBC:number;
userOIDBC:number;
oContextInformation:CContextInformation;
patientOIDsBC:ObservableCollection<number>;
}
export class CResMsggetResultDtlsPatMerge{
oContextInformation:CContextInformation;
modifiedRequests:ObservableCollection<ModifiedRequest>;
}
export class CReqMsgGetSVRequests{
objSVInputCriteriaBC:lzoSummaryInputCriteria;
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
export class CResMsgGetSVRequests{
oContextInformation:CContextInformation;
objSVRequestDetails:ObservableCollection<SVRequestDetails>;
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
export class SVRequestDetails extends lzoSummaryViewOut{
ReqItem:string;
ReqItemCode:string;
ReqPriority:string;
ReqPerformedOn:DateTime;
ReqDt:DateTime;
ReqResRequireOn:DateTime;
ReqStatus:string;
ReqHO:string;
ReqType:string;
ReqItemDesc:string;
ReqGroupNumber:string;
ReqRefNum:string;
ReqPerformOn:DateTime;
ReqCPName:string;
ReqRole:string;
ReqReason:string;
ReqClinDet:string;
ReqContactMode:string;
ReqContactNumber:string;
}
export class SVResultDetails extends lzoSummaryViewOut{
ResltReqItemName:string;
ResltPriority:string;
ResltStatus:string;
ResltItemName:string;
ResltUOM:string;
ResltValue:string;
ResltRefRange:string;
ResltComments:string;
ResltAbnormality:string;
ResltOn:DateTime;
ResltReceiveOn:DateTime;
ResltSamplePerformOn:DateTime;
ResltOverallComments:string;
ResltReqRefNum:string;
ResltReqItemCode:string;
ResltReqOn:DateTime;
ResltItemCode:string;
ResltType:string;
ResltSamplePerformDTTM:DateTime;
ResltReceiptMode:string;
ResltIsConfidential:string;
}
export class CReqMsgGetSVResults{
objSVInputCriteriaBC:lzoSummaryInputCriteria;
oContextInformation:CContextInformation;
}
export class CResMsgGetSVResults{
oContextInformation:CContextInformation;
objSVResultDetails:ObservableCollection<SVResultDetails>;
}
export class CReqMsgGetResultsListView{
oReqBC:ResultSeenDetail;
oContextInformation:CContextInformation;
}
export class CResMsgGetResultsListView{
oContextInformation:CContextInformation;
oResults:ObservableCollection<ResultComponentValue>;
}
export class CReqMsgGetResultComponent{
resultComponentOIDBC:string;
patientOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetResultComponent{
resultComponentValue:ResultComponentValue;
oContextInformation:CContextInformation;
}
export class CReqMsgGetModifiedRequests{
organisationOIDBC:number;
startDttmBC:DateTime;
oContextInformation:CContextInformation;
patientOIDsBC:ObservableCollection<number>;
}
export class CResMsgGetModifiedRequests{
oContextInformation:CContextInformation;
modifiedRequests:ObservableCollection<ModifiedRequest>;
}
export class CReqMsgGetRequests{
referenceNumbersBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetRequests{
oContextInformation:CContextInformation;
requests:ObservableCollection<ModifiedRequest>;
}
export class CReqMsgModifyRecipientList{
objtaskDetailBC:IntrayNotification;
oContextInformation:CContextInformation;
}
export class CResMsgModifyRecipientList{
oContextInformation:CContextInformation;
}
export class CReqMsgGetViewSpecStatus{
PatientOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetViewSpecStatus{
nSpecStatus:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgGetWarnDet{
ReqtDetOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetWarnDet{
oContextInformation:CContextInformation;
oWarnDet:ObservableCollection<WarningDetails>;
}
export class CReqMsgGetAddDet{
ReqtDetOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetAddDet{
oContextInformation:CContextInformation;
oResDet:ObservableCollection<InvestigationResultView>;
}
export class CReqMsgGetAltDet{
ReqtDetOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetAltDet{
oContextInformation:CContextInformation;
oResDet:ObservableCollection<InvestigationResultView>;
}
export class CReqMsgGetWarnLink{
ReqtDetOIDBC:string;
PatientOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetWarnLink{
nstatus:string;
oContextInformation:CContextInformation;
}
export class CReqMsgGetResultModificationHistory{
oResultSearchBC:SearchResult;
oContextInformation:CContextInformation;
}
export class CResMsgGetResultModificationHistory{
oContextInformation:CContextInformation;
oModificationHistory:ObservableCollection<ModificationHistory>;
}
export class CReqMsgGetStatusHistory{
sRequestOIDBC:string;
sPatientOIDBC:string;
sSeenTypeBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetStatusHistory{
oContextInformation:CContextInformation;
oResultValue:ObservableCollection<ResultComponentValue>;
oResultValueseen:ObservableCollection<ResultSeenDetail>;
}
export class CReqMsgGetGraphView{
oSearchBC:SearchInvestigationResult;
oContextInformation:CContextInformation;
}
export class CResMsgGetGraphView{
sMulUOMResNames:string;
oContextInformation:CContextInformation;
oResults:ObservableCollection<InvestigationTabularView>;
}
export class CReqMsgGetResultReport{
sResDetailOIDBC:string;
sPatientOIDBC:string;
HoNameBC:string;
RequestedByBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetResultReport{
oContextInformation:CContextInformation;
oPrintResultsTemplate:ObservableCollection<PrintResultsTemplate>;
}
export class CReqMsgGetResultsCodingGrouping{
lnEncounterOIDBC:number;
sPatientOIDBC:string;
sUserOIDBC:string;
SealRecordListBC:string;
SealImageListBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetResultsCodingGrouping{
oContextInformation:CContextInformation;
oResults:ObservableCollection<ResultsCodingDetails>;
}
export class CReqMsgGetResultDetails{
oSearchBC:SearchInvestigationResult;
oContextInformation:CContextInformation;
}
export class CResMsgGetResultDetails{
oInvResultView:InvestigationResultDetail;
oContextInformation:CContextInformation;
}
export class CReqMsgGetGroupRequestsDetails{
oSearchBC:SearchInvestigationResult;
oContextInformation:CContextInformation;
}
export class CResMsgGetGroupRequestsDetails{
oContextInformation:CContextInformation;
oInvResultView:ObservableCollection<InvestigationResultView>;
}
export class CReqMsgGetResultsTabularView{
oSearchBC:SearchInvestigationResult;
oContextInformation:CContextInformation;
}
export class CResMsgGetResultsTabularView{
oContextInformation:CContextInformation;
oResults:ObservableCollection<InvestigationTabularView>;
}
export class CReqMsgGetResultsHistoryView{
oSearchBC:SearchInvestigationResult;
oContextInformation:CContextInformation;
}
export class CResMsgGetResultsHistoryView{
oContextInformation:CContextInformation;
oResults:ObservableCollection<InvestigationTabularView>;
}
export class CReqMsgGetResultFilterByForTabularView{
ResultFilterByXMLBC:ObservableCollection<byte>;
PatientOIDBC:string;
EPRFilterBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetResultFilterByForTabularView{
oContextInformation:CContextInformation;
oRequest:ObservableCollection<InvestigationTabularView>;
}
export class CReqMsgGetResultsTabularViewFilter{
ResultFilterByXMLBC:ObservableCollection<byte>;
PatientOIDBC:string;
EPRFilterBC:string;
TeamOIDBC:string;
SeenTypeBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetResultsTabularViewFilter{
oContextInformation:CContextInformation;
oRequest:ObservableCollection<InvestigationTabularView>;
}
export class CReqMsgGetResultFilterBy{
ResultFilterByXMLBC:ObservableCollection<byte>;
PatientOIDBC:string;
IsSpecInfoNeededBC:boolean;
SealImageListBC:string;
SealRecordListBC:string;
EPRFilterBC:string;
pageElementBC:PagingDynamicSQL;
TeamOIDBC:string;
SeenTypeBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetResultFilterBy{
oSumCount:ResultSummaryCount;
PageCount:number;
oContextInformation:CContextInformation;
oRequest:ObservableCollection<InvestigationResultView>;
}
export class CReqMsgGetResultsListviewFilter{
ResultFilterByXMLBC:ObservableCollection<byte>;
PatientOIDBC:string;
IsSpecInfoNeededBC:boolean;
SealImageListBC:string;
SealRecordListBC:string;
EPRFilterBC:string;
pageElementBC:PagingDynamicSQL;
TeamOIDBC:string;
SeenTypeBC:string;
tabCodeBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetResultsListviewFilter{
oSumCount:ResultSummaryCount;
PageCount:number;
oContextInformation:CContextInformation;
oRequest:ObservableCollection<InvestigationResultView>;
}
export class CReqMsgGetResultsListViewByRequestDetailOIDs{
patientOIDBC:number;
requestDetailOIDsBC:string;
pageElementBC:PagingDynamicSQL;
oContextInformation:CContextInformation;
}
export class CResMsgGetResultsListViewByRequestDetailOIDs{
pageCount:number;
summaryCount:ResultSummaryCount;
oContextInformation:CContextInformation;
resultViews:ObservableCollection<InvestigationResultView>;
}
export class CReqMsgGetRequestDetailsView{
oSearchBC:SearchInvestigationResult;
oContextInformation:CContextInformation;
}
export class CResMsgGetRequestDetailsView{
oContextInformation:CContextInformation;
oRequest:ObservableCollection<InvestigationResultView>;
}
export class CReqMsgGetResultByResultItemID{
lResultItemIDBC:number;
sResultOIDBC:string;
sRequestDetailOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetResultByResultItemID{
oResult:ResultComponentValue;
oContextInformation:CContextInformation;
}
export class CReqMsgClearUnseenResults{
sRequestOIDBC:string;
sReqDtsOIDBC:string;
sUserIDBC:string;
sUserNameBC:string;
sStatusBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgClearUnseenResults{
oContextInformation:CContextInformation;
}
export class CReqMsgMarkResultsAsSeen{
oContextInformation:CContextInformation;
referenceNumbersBC:ObservableCollection<string>;
}
export class CResMsgMarkResultsAsSeen{
oContextInformation:CContextInformation;
}
export class CReqMsgGetResHisDate{
sRequestOIDBC:string;
sPatientOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetResHisDate{
oContextInformation:CContextInformation;
oResult:ObservableCollection<ResultComponentValue>;
}
export class CReqMsgGetRequestIntrayForm{
sRequestOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetRequestIntrayForm{
oResult:ResultComponentValue;
oContextInformation:CContextInformation;
}
export class CReqMsgGetRMResDtsHistory{
sRequestOIDBC:string;
dtModifiedDateBC:DateTime;
sPatientOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetRMResDtsHistory{
oContextInformation:CContextInformation;
oResults:ObservableCollection<ResultComponentValue>;
}
export class CReqMsgGetResConfidential{
oReqBC:ResultSeenDetail;
oContextInformation:CContextInformation;
}
export class CResMsgGetResConfidential{
oContextInformation:CContextInformation;
oResults:ObservableCollection<ResultComponentValue>;
}
export class CReqMsgGetDataFilterForRequestItem{
oReqBC:RequestItemDataFilter;
oContextInformation:CContextInformation;
}
export class CResMsgGetDataFilterForRequestItem{
oResults:RequestItemDataFilter;
oContextInformation:CContextInformation;
}
export class CReqMsgGetContextDetails{
oSearchBC:SearchInvestigationResult;
oContextInformation:CContextInformation;
}
export class CResMsgGetContextDetails{
oContextInformation:CContextInformation;
oRequest:ObservableCollection<InvestigationResultView>;
}
export class CReqMsgGetAccessRights{
oRequestBC:AccessRights;
oContextInformation:CContextInformation;
}
export class CResMsgGetAccessRights{
oResponse:AccessRights;
oContextInformation:CContextInformation;
}
export class CReqMsgGetResultDetailsForCDC{
oSearchBC:SearchInvestigationResult;
oContextInformation:CContextInformation;
}
export class CResMsgGetResultDetailsForCDC{
oContextInformation:CContextInformation;
oResponse:ObservableCollection<ResultComponentValue>;
}
export class CReqMsgGetResults{
lResultOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetResults{
oManageResultStatus:ManageResultStatus;
oContextInformation:CContextInformation;
}
export class CReqMsgGetBubbleResultInfo{
lRequestOIDsBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetBubbleResultInfo{
oContextInformation:CContextInformation;
oResults:ObservableCollection<ResultBubbleInfo>;
}
export class CReqMsgEnterResults{
oContextInformation:CContextInformation;
objPatientInvestigationResultBC:ObservableCollection<PatientInvestigationResult>;
}
export class CResMsgEnterResults{
oResultId:Object;
oContextInformation:CContextInformation;
}
export class CReqMsgGetFormDefinition{
lRequestItemOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetFormDefinition{
oContextInformation:CContextInformation;
oResultItem:ObservableCollection<ResultItem>;
}
export class CReqMsgGetAllResultItem{
sResultItemKeywordBC:string;
sDisplayAllBC:string;
sPageLengthBC:string;
sResultitemOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetAllResultItem{
oContextInformation:CContextInformation;
oResultItem:ObservableCollection<ResultItem>;
}
export class CReqMsgGetRequestItemByResultItemID{
lResultItemOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetRequestItemByResultItemID{
oContextInformation:CContextInformation;
oResultItem:ObservableCollection<ResultItem>;
}
export class CReqMsgGetResultItemDetails{
lResultItemOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetResultItemDetails{
oContextInformation:CContextInformation;
oResultItemInfo:ObservableCollection<ResultItemInfo>;
}
export class ResultItemInfo{
ResultItemNumeric:NumericResultItem;
ResultItemRange:NumericResultItemRange;
}
export class NumericResultItem{
NumericResultItemOID:number;
UOM:string;
LowerLimit:string;
UpperLimit:string;
IsPrimary:boolean;
InCentral:boolean;
OperationalFlag:string;
DecimalPlace:byte;
ResultItemRange:ObservableCollection<NumericResultItemRange>;
}
export class NumericResultItemRange{
NumericResultItemRangeOID:number;
RefLowerNormal:string;
RefBeyondLowerValue:string;
RefUpperNormal:string;
CriteriaID:number;
CriteriaName:string;
RefUOM:string;
RefBeyondUpperValue:string;
RefAddlRange1:string;
RefBeyondIndicatorValue1:string;
RefAddlRange2:string;
RefbeyondIndicatorValue2:string;
RefUOMValue:string;
DegreeOfNormality:string;
RefLowerLimit:string;
RefUpperLimit:string;
RefMinOpCode:string;
RefMaxOpCode:string;
ReferencePoint:string;
UOM:string;
round:string;
istotalrange:string;
IndentifyingType:string;
IdentifyingValue:string;
}
export class CReqMsgGetResultItemDefinition{
lRequestOIDBC:number;
lResultItemOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetResultItemDefinition{
oContextInformation:CContextInformation;
oResultItem:ObservableCollection<ResultItem>;
}
export class CReqMsgGetCDCDetails{
lResultItemOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetCDCDetails{
objRequestEntryForm:RequestEntryForm;
oContextInformation:CContextInformation;
}
export class CReqMsgGetNotificationList{
lRequestdetailtOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetNotificationList{
oContextInformation:CContextInformation;
oResultAdditionalInfo:ObservableCollection<ResultAdditionalInfo>;
}
export class CReqMsgManageResults{
oContextInformation:CContextInformation;
objPatientInvestigationResultBC:ObservableCollection<ManageResultStatus>;
}
export class CResMsgManageResults{
oContextInformation:CContextInformation;
}
export class CReqMsgAcknowledgeResult{
oContextInformation:CContextInformation;
oManageResultStatusBC:ObservableCollection<ManageResultStatus>;
}
export class CResMsgAcknowledgeResult{
oContextInformation:CContextInformation;
}
export class CReqMsgAcknowledgeResults{
oContextInformation:CContextInformation;
acknowledgeInfoBC:ObservableCollection<AcknowledgeResultInfo>;
}
export class CResMsgAcknowledgeResults{
oContextInformation:CContextInformation;
}
export class CReqMsgAuthorizeResult{
oContextInformation:CContextInformation;
oManageResultStatusBC:ObservableCollection<ManageResultStatus>;
}
export class CResMsgAuthorizeResult{
oContextInformation:CContextInformation;
}
export class CReqMsgCancelResult{
oContextInformation:CContextInformation;
oManageResultStatusBC:ObservableCollection<ManageResultStatus>;
}
export class CResMsgCancelResult{
oContextInformation:CContextInformation;
}
export class CReqMsgPrintResults{
sReqOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgPrintResults{
oContextInformation:CContextInformation;
oPrintResult:ObservableCollection<PrintResults>;
}
export class CReqMsgGetApplyAllResult{
lResultOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetApplyAllResult{
oContextInformation:CContextInformation;
oManageResultStatus:ObservableCollection<ManageResultStatus>;
}
export class CReqMsgManageAcknowledgestatus{
oManageResultStatusBC:ManageResultStatus;
oContextInformation:CContextInformation;
}
export class CResMsgManageAcknowledgestatus{
oContextInformation:CContextInformation;
}
export class CReqMsgGetSeenResultReport{
sPatOIDBC:string;
sRequestItemOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetSeenResultReport{
oContextInformation:CContextInformation;
oSeenResultReport:ObservableCollection<SeenResultReport>;
}
export class CReqMsgGetResultAcknowledgedReport{
sFromDateBC:DateTime;
sToDateBC:DateTime;
sExpectedDischrgDtBC:DateTime;
sLocationOIDBC:string;
sEncTypeBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetResultAcknowledgedReport{
oContextInformation:CContextInformation;
oResultAcknowledgedReport:ObservableCollection<ResultAcknowledgedReport>;
}
export class CReqMsgGetResultUnAcknowledgedReport{
sFromDateBC:DateTime;
sToDateBC:DateTime;
sCareProviderOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetResultUnAcknowledgedReport{
oContextInformation:CContextInformation;
oResultUnAcknowledgedReport:ObservableCollection<ResultUnAcknowledgedReport>;
}
export class MarshalByRefObject{
}

 const prototypeList = {"ResultManagementWS.PrintResults":CResMsgPrintResults.prototype ,
"ResultManagementWS.GetApplyAllResult":CResMsgGetApplyAllResult.prototype ,
"ResultManagementWS.ManageAcknowledgestatus":CResMsgManageAcknowledgestatus.prototype ,
"ResultManagementWS.GetSeenResultReport":CResMsgGetSeenResultReport.prototype ,
"ResultManagementWS.GetResultAcknowledgedReport":CResMsgGetResultAcknowledgedReport.prototype ,
"ResultManagementWS.GetResultUnAcknowledgedReport":CResMsgGetResultUnAcknowledgedReport.prototype ,
"ResultManagementWS.GetResultsListViewByRequestDetailOIDs":CResMsgGetResultsListViewByRequestDetailOIDs.prototype ,
"ResultManagementWS.GetRequestDetailsView":CResMsgGetRequestDetailsView.prototype ,
"ResultManagementWS.GetResultByResultItemID":CResMsgGetResultByResultItemID.prototype ,
"ResultManagementWS.ClearUnseenResults":CResMsgClearUnseenResults.prototype ,
"ResultManagementWS.MarkResultsAsSeen":CResMsgMarkResultsAsSeen.prototype ,
"ResultManagementWS.GetResHisDate":CResMsgGetResHisDate.prototype ,
"ResultManagementWS.GetRequestIntrayForm":CResMsgGetRequestIntrayForm.prototype ,
"ResultManagementWS.GetRMResDtsHistory":CResMsgGetRMResDtsHistory.prototype ,
"ResultManagementWS.GetResConfidential":CResMsgGetResConfidential.prototype ,
"ResultManagementWS.GetDataFilterForRequestItem":CResMsgGetDataFilterForRequestItem.prototype ,
"ResultManagementWS.GetContextDetails":CResMsgGetContextDetails.prototype ,
"ResultManagementWS.GetAccessRights":CResMsgGetAccessRights.prototype ,
"ResultManagementWS.GetResultDetailsForCDC":CResMsgGetResultDetailsForCDC.prototype ,
"ResultManagementWS.GetResults":CResMsgGetResults.prototype ,
"ResultManagementWS.GetBubbleResultInfo":CResMsgGetBubbleResultInfo.prototype ,
"ResultManagementWS.EnterResults":CResMsgEnterResults.prototype ,
"ResultManagementWS.GetFormDefinition":CResMsgGetFormDefinition.prototype ,
"ResultManagementWS.GetAllResultItem":CResMsgGetAllResultItem.prototype ,
"ResultManagementWS.GetRequestItemByResultItemID":CResMsgGetRequestItemByResultItemID.prototype ,
"ResultManagementWS.GetResultItemDetails":CResMsgGetResultItemDetails.prototype ,
"ResultManagementWS.GetResultItemDefinition":CResMsgGetResultItemDefinition.prototype ,
"ResultManagementWS.GetCDCDetails":CResMsgGetCDCDetails.prototype ,
"ResultManagementWS.GetNotificationList":CResMsgGetNotificationList.prototype ,
"ResultManagementWS.ManageResults":CResMsgManageResults.prototype ,
"ResultManagementWS.AcknowledgeResult":CResMsgAcknowledgeResult.prototype ,
"ResultManagementWS.AcknowledgeResults":CResMsgAcknowledgeResults.prototype ,
"ResultManagementWS.AuthorizeResult":CResMsgAuthorizeResult.prototype ,
"ResultManagementWS.CancelResult":CResMsgCancelResult.prototype ,
"ResultManagementWS.GetCIBubbleResultInfo":CResMsgGetCIBubbleResultInfo.prototype ,
"ResultManagementWS.GetDIRnRParamValues":CResMsgGetDIRnRParamValues.prototype ,
"ResultManagementWS.getResultDtls":CResMsggetResultDtls.prototype ,
"ResultManagementWS.getResultDtlsPatMerge":CResMsggetResultDtlsPatMerge.prototype ,
"ResultManagementWS.GetSVRequests":CResMsgGetSVRequests.prototype ,
"ResultManagementWS.GetSVResults":CResMsgGetSVResults.prototype ,
"ResultManagementWS.GetResultsListView":CResMsgGetResultsListView.prototype ,
"ResultManagementWS.GetResultComponent":CResMsgGetResultComponent.prototype ,
"ResultManagementWS.GetModifiedRequests":CResMsgGetModifiedRequests.prototype ,
"ResultManagementWS.GetRequests":CResMsgGetRequests.prototype ,
"ResultManagementWS.ModifyRecipientList":CResMsgModifyRecipientList.prototype ,
"ResultManagementWS.GetViewSpecStatus":CResMsgGetViewSpecStatus.prototype ,
"ResultManagementWS.GetWarnDet":CResMsgGetWarnDet.prototype ,
"ResultManagementWS.GetAddDet":CResMsgGetAddDet.prototype ,
"ResultManagementWS.GetAltDet":CResMsgGetAltDet.prototype ,
"ResultManagementWS.GetWarnLink":CResMsgGetWarnLink.prototype ,
"ResultManagementWS.GetResultModificationHistory":CResMsgGetResultModificationHistory.prototype ,
"ResultManagementWS.GetStatusHistory":CResMsgGetStatusHistory.prototype ,
"ResultManagementWS.GetGraphView":CResMsgGetGraphView.prototype ,
"ResultManagementWS.GetResultReport":CResMsgGetResultReport.prototype ,
"ResultManagementWS.GetResultsCodingGrouping":CResMsgGetResultsCodingGrouping.prototype ,
"ResultManagementWS.GetResultDetails":CResMsgGetResultDetails.prototype ,
"ResultManagementWS.GetGroupRequestsDetails":CResMsgGetGroupRequestsDetails.prototype ,
"ResultManagementWS.GetResultsTabularView":CResMsgGetResultsTabularView.prototype ,
"ResultManagementWS.GetResultsHistoryView":CResMsgGetResultsHistoryView.prototype ,
"ResultManagementWS.GetResultFilterByForTabularView":CResMsgGetResultFilterByForTabularView.prototype ,
"ResultManagementWS.GetResultsTabularViewFilter":CResMsgGetResultsTabularViewFilter.prototype ,
"ResultManagementWS.GetResultFilterBy":CResMsgGetResultFilterBy.prototype ,
"ResultManagementWS.GetResultsListviewFilter":CResMsgGetResultsListviewFilter.prototype ,
"ResultManagementWS.GetRequestItemNameFiltr":CResMsgGetRequestItemNameFiltr.prototype ,
"ResultManagementWS.ServiceRequest":CResMsgServiceRequest.prototype ,
"ResultManagementWS.GetResultAndReqItmDF":CResMsgGetResultAndReqItmDF.prototype ,
"ResultManagementWS.GetResultForPrescription":CResMsgGetResultForPrescription.prototype ,
"ResultManagementWS.GetResultDetailsByPatOrEncOID":CResMsgGetResultDetailsByPatOrEncOID.prototype ,
"ResultManagementWS.ReassignAcknowledgementTask":CResMsgReassignAcknowledgementTask.prototype ,
"ResultManagementWS.GetRequestComments":CResMsgGetRequestComments.prototype ,
"ResultManagementWS.GetMyRequestView":CResMsgGetMyRequestView.prototype ,
"ResultManagementWS.GetViewMyRequestList":CResMsgGetViewMyRequestList.prototype ,
"ResultManagementWS.GetMyRequestChildView":CResMsgGetMyRequestChildView.prototype ,
"ResultManagementWS.GetUnsolicitedAdocResults":CResMsgGetUnsolicitedAdocResults.prototype ,
"ResultManagementWS.GetPatUnsolicitedAdocResults":CResMsgGetPatUnsolicitedAdocResults.prototype ,
"ResultManagementWS.ModAckHistory":CResMsgModAckHistory.prototype ,
"ResultManagementWS.GetResultItemTextDetails":CResMsgGetResultItemTextDetails.prototype ,
"ResultManagementWS.GetSamplePerformedDTTM":CResMsgGetSamplePerformedDTTM.prototype ,
"ResultManagementWS.GetResultByResultHisID":CResMsgGetResultByResultHisID.prototype ,
"ResultManagementWS.EncounterAvailCheck":CResMsgEncounterAvailCheck.prototype ,
"ResultManagementWS.GetUnSeenResultList":CResMsgGetUnSeenResultList.prototype ,
"ResultManagementWS.GetResultStatusCode":CResMsgGetResultStatusCode.prototype ,
"ResultManagementWS.GetLRSUsersOrTeams":CResMsgGetLRSUsersOrTeams.prototype ,
"ResultManagementWS.GetCombinedSpecimenCollection":CResMsgGetCombinedSpecimenCollection.prototype ,
"ResultManagementWS.GetPatientFlags":CResMsgGetPatientFlags.prototype ,
"ResultManagementWS.GetNewRequests":CResMsgGetNewRequests.prototype ,
"ResultManagementWS.GetNewResults":CResMsgGetNewResults.prototype ,
"ResultManagementWS.GetPendingResults":CResMsgGetPendingResults.prototype ,
"ResultManagementWS.GetUnseenResults":CResMsgGetUnseenResults.prototype ,
"ResultManagementWS.GetResultDIAppName":CResMsgGetResultDIAppName.prototype ,
"ResultManagementWS.GetImageOnlyResults":CResMsgGetImageOnlyResults.prototype ,

CReqMsgGetRequestItemNameFiltr : { 
oSearchBC:RRSearchCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },ManageRequest : { 
SetItemDetails:RequestSetInvestigation.prototype ,
PatientInvestigation:PatientInvestigation.prototype ,
ManageInfo:ManageRequestStatus.prototype ,
oMailDisclaimer:MailDisclaimer.prototype ,

 },RequestSetInvestigation : { 
oRequestItems:RequestItems.prototype ,
oWarnings:Warnings.prototype ,

 },Warnings : { 
AcknowledgeWarnings:RequestAcknowledge.prototype ,

 },PatientInvestigation : { 
AdditionalInfo:RequestAdditionalInfo.prototype ,
RequestCDCFormInfo:RequestCDCForm.prototype ,
RequestGPInfo:RequestGP.prototype ,
TransmitHistory:TransmitHistory.prototype ,
Problems:Problem.prototype ,
RequestClinicalNoteInfo:RequestCitation.prototype ,
Warnings:Warnings.prototype ,
Distribute:Recipient.prototype ,
RequestSchedule:RequestSchedule.prototype ,
RequestItemFormDetails:RequestCDCFormDetails.prototype ,
BubbleFormDetails:RequestCDCFormDetails.prototype ,
ConfigItems:ConfigurableItem.prototype ,
QuestionnaireItems:RequestQuestionnaireItem.prototype ,

 },Problem : { 
ProblemRecordedBy:Person.prototype ,
ProblemModifiedBy:Person.prototype ,
ProblemOnBehalfOf:Person.prototype ,
ProblemLinks:ProblemLink_FHIRAPI.prototype ,
PrbStatus:CPatientProblemStatus_API.prototype ,
ScopeDetails:ProblemScopeDetail.prototype ,
Bodysite:ProblemBodySite.prototype ,
GroupByResult:GroupResult.prototype ,

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

 },ProblemScopeDetail : { 
Child:ProblemScopeDetail.prototype ,

 },RequestAdditionalInfo : { 
SpecimenSuggested:SpecimenDetails.prototype ,

 },SpecimenDetails : { 
oMailDisclaimer:MailDisclaimer.prototype ,
SpecimenCollectedBy:dpUser.prototype ,
SpecimenVerifiedBy:dpUser.prototype ,
CollectionRecipients:SpecimenSuggestedNotifiedUsers.prototype ,

 },ManageRequestStatus : { 
oMailDisclaimer:MailDisclaimer.prototype ,
RequestGPInfo:RequestGP.prototype ,
ConfigItems:ConfigurableItem.prototype ,

 },ResultComponentValue : { 
CodedValue:Codification.prototype ,
ResultValueViewer:ResultValueViewer.prototype ,

 },ResultValueViewer : { 
ResultMedia:ResultMedia.prototype ,

 },ViewMYReqSearch : { 
oPagingDynamicSQL:PagingDynamicSQL.prototype ,

 },PagingDynamicSQL : { 
FilterBy:Filter.prototype ,
GroupBy:Group.prototype ,

 },InvestigationResultView : { 
RequestGPInfo:RequestGP.prototype ,
ConfigItems:ConfigurableItem.prototype ,

 },RMPatientFlagsCriteria : { 
AcknowledgementEscalationTimePeriod:TimeSpan.prototype ,
TimePeriod:TimeSpan.prototype ,

 },RMPatientFlagsData : { 
PatientFlags:RMPatientFlags.prototype ,
DepartmentFlags:RMCategorizedFlags.prototype ,
ReviewCategoryFlags:RMCategorizedFlags.prototype ,
UrgencyFlags:RMCategorizedFlags.prototype ,
ResultUrgencyFlags:RMCategorizedFlags.prototype ,

 },ModifiedRequest : { 
Result:ModifiedResult.prototype ,

 },ModifiedResult : { 
ResultComponents:ModifiedResultComponent.prototype ,

 },IntrayNotification : { 
subject:FYISubject.prototype ,

 },WarningDetails : { 
MessageFormat:MessageFormat.prototype ,
PrescriptionItem:ObjectInfo.prototype ,

 },PrintResultsTemplate : { 
oResultComponentValue:ResultComponentValue.prototype ,

 },InvestigationResultDetail : { 
OInvResultView:InvestigationResultView.prototype ,
oResultComponentValue:ResultComponentValue.prototype ,

 },ManageResultStatus : { 
ResultDetails:ResultInfo.prototype ,
ResultStatusInfo:ResultStatusInfo.prototype ,
ResultAdditionalDetails:ResultAdditionalInfo.prototype ,
RequestCtxt:RequestContext.prototype ,
SpecimenInformation:SpecimenInformation.prototype ,

 },ResultInfo : { 
ResultValues:ResultComponentValue.prototype ,

 },ResultAdditionalInfo : { 
oMailDisclaimer:MailDisclaimer.prototype ,

 },PatientInvestigationResult : { 
RequestCtxt:RequestContext.prototype ,
ResultDetails:ResultInfo.prototype ,
RequestResultItemDetails:RequestResultRuntimeMap.prototype ,
ResultStatusInfo:ResultStatusInfo.prototype ,
SpecimenInformation:SpecimenInformation.prototype ,
ResultAdditionalDetails:ResultAdditionalInfo.prototype ,
Distribute:Recipient.prototype ,

 },PrintResults : { 
oInvResultView:InvestigationResultView.prototype ,
oResultComponentValue:ResultComponentValue.prototype ,

 },ResultAcknowledgedReport : { 
oSeenResultReport:SeenResultReport.prototype ,

 },ResultUnAcknowledgedReport : { 
oSeenResultReport:SeenResultReport.prototype ,

 },CResMsgGetRequestItemNameFiltr : { 
oContextInformation:CContextInformation.prototype ,
oRequestItems:RequestItems.prototype ,

 },CReqMsgServiceRequest : { 
objManageReqStatusBC:ManageRequest.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgServiceRequest : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetResultAndReqItmDF : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResultAndReqItmDF : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetResultForPrescription : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResultForPrescription : { 
oContextInformation:CContextInformation.prototype ,
objResult:ResultComponentValue.prototype ,

 },CReqMsgGetResultDetailsByPatOrEncOID : { 
oResultValuesRequestBC:ResultValuesRequest.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResultDetailsByPatOrEncOID : { 
oContextInformation:CContextInformation.prototype ,
oResultValuesResponse:ResultValuesResponse.prototype ,

 },CReqMsgReassignAcknowledgementTask : { 
objTaskDetailsBC:CIntrayTask.prototype ,
objRecipientdetailBC:ResultSeenDetail.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CIntrayTask : { 
oRecurrenceVO:CRecurrenceVO.prototype ,
oTaskContext:CTaskContext.prototype ,
oTaskUser:CTaskUser.prototype ,
oTaskNotify:CTaskNotifyList.prototype ,

 },CRecurrenceVO : { 
RecurrenceCycles:CRecurrenceCycleVO.prototype ,

 },CRecurrenceCycleVO : { 
RecurrenceCycles:CRecurrenceCycleVO.prototype ,

 },CResMsgReassignAcknowledgementTask : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetRequestComments : { 
oReqIdsBC:SearchResult.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetRequestComments : { 
oContextInformation:CContextInformation.prototype ,
oReqComments:AcknowledgeResultInfo.prototype ,

 },CReqMsgGetMyRequestView : { 
oSearchBC:ViewMYReqSearch.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMyRequestView : { 
oContextInformation:CContextInformation.prototype ,
oRequest:InvestigationResultView.prototype ,

 },CReqMsgGetViewMyRequestList : { 
oSearchBC:ViewMYReqSearch.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetViewMyRequestList : { 
oRequest:ViewMyRequestResultView.prototype ,
oContextInformation:CContextInformation.prototype ,

 },ViewMyRequestResultView : { 
oInvestigationResultView:InvestigationResultView.prototype ,

 },CReqMsgGetMyRequestChildView : { 
oSearchBC:ViewMYReqSearch.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMyRequestChildView : { 
oContextInformation:CContextInformation.prototype ,
oRequest:InvestigationResultView.prototype ,

 },CReqMsgGetUnsolicitedAdocResults : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetUnsolicitedAdocResults : { 
oContextInformation:CContextInformation.prototype ,
oResults:UnsolAdocResDetails.prototype ,

 },CReqMsgGetPatUnsolicitedAdocResults : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPatUnsolicitedAdocResults : { 
oContextInformation:CContextInformation.prototype ,
oResults:UnsolAdocResDetails.prototype ,

 },CReqMsgModAckHistory : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgModAckHistory : { 
ackHis:AcknowledgementHistory.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetResultItemTextDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResultItemTextDetails : { 
oContextInformation:CContextInformation.prototype ,
textReferenceRange:TextReferenceRange.prototype ,

 },CReqMsgGetSamplePerformedDTTM : { 
requestBC:RetrieveSampleDate.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetSamplePerformedDTTM : { 
oContextInformation:CContextInformation.prototype ,
response:ResultSampleDate.prototype ,

 },CReqMsgGetResultByResultHisID : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResultByResultHisID : { 
resultComponentValue:ResultComponentValue.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgEncounterAvailCheck : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgEncounterAvailCheck : { 
oContextInformation:CContextInformation.prototype ,
oResults:EncounterDetails.prototype ,

 },CReqMsgGetUnSeenResultList : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetUnSeenResultList : { 
oContextInformation:CContextInformation.prototype ,
oResult:InvestigationResultView.prototype ,

 },CReqMsgGetResultStatusCode : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResultStatusCode : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetLRSUsersOrTeams : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetLRSUsersOrTeams : { 
oContextInformation:CContextInformation.prototype ,
lrsUsersOrTeams:LRSUsersOrTeams.prototype ,

 },CReqMsgGetCombinedSpecimenCollection : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetCombinedSpecimenCollection : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPatientFlags : { 
criteriaBC:RMPatientFlagsCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPatientFlags : { 
patientFlagsData:RMPatientFlagsData.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetNewRequests : { 
objReqNewEventsBC:NewEvents.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetNewRequests : { 
oContextInformation:CContextInformation.prototype ,
objResNewRequests:NewRequests.prototype ,

 },CReqMsgGetNewResults : { 
objReqNewEventsBC:NewEvents.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetNewResults : { 
oContextInformation:CContextInformation.prototype ,
objResNewResults:NewResults.prototype ,

 },CReqMsgGetPendingResults : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPendingResults : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetUnseenResults : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetUnseenResults : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetResultDIAppName : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResultDIAppName : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetImageOnlyResults : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetImageOnlyResults : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetCIBubbleResultInfo : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetCIBubbleResultInfo : { 
oContextInformation:CContextInformation.prototype ,
oResults:ResultBubbleInfo.prototype ,

 },CReqMsgGetDIRnRParamValues : { 
oSearchBC:SearchResult.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDIRnRParamValues : { 
oResults:AKADIParams.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsggetResultDtls : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsggetResultDtls : { 
oContextInformation:CContextInformation.prototype ,
modifiedRequests:ModifiedRequest.prototype ,

 },CReqMsggetResultDtlsPatMerge : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsggetResultDtlsPatMerge : { 
oContextInformation:CContextInformation.prototype ,
modifiedRequests:ModifiedRequest.prototype ,

 },CReqMsgGetSVRequests : { 
objSVInputCriteriaBC:lzoSummaryInputCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },lzoSummaryInputCriteria : { 
objSVFilter:lzoSummaryFilter.prototype ,

 },CResMsgGetSVRequests : { 
oContextInformation:CContextInformation.prototype ,
objSVRequestDetails:SVRequestDetails.prototype ,

 },CReqMsgGetSVResults : { 
objSVInputCriteriaBC:lzoSummaryInputCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetSVResults : { 
oContextInformation:CContextInformation.prototype ,
objSVResultDetails:SVResultDetails.prototype ,

 },CReqMsgGetResultsListView : { 
oReqBC:ResultSeenDetail.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResultsListView : { 
oContextInformation:CContextInformation.prototype ,
oResults:ResultComponentValue.prototype ,

 },CReqMsgGetResultComponent : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResultComponent : { 
resultComponentValue:ResultComponentValue.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetModifiedRequests : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetModifiedRequests : { 
oContextInformation:CContextInformation.prototype ,
modifiedRequests:ModifiedRequest.prototype ,

 },CReqMsgGetRequests : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetRequests : { 
oContextInformation:CContextInformation.prototype ,
requests:ModifiedRequest.prototype ,

 },CReqMsgModifyRecipientList : { 
objtaskDetailBC:IntrayNotification.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgModifyRecipientList : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetViewSpecStatus : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetViewSpecStatus : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetWarnDet : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetWarnDet : { 
oContextInformation:CContextInformation.prototype ,
oWarnDet:WarningDetails.prototype ,

 },CReqMsgGetAddDet : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAddDet : { 
oContextInformation:CContextInformation.prototype ,
oResDet:InvestigationResultView.prototype ,

 },CReqMsgGetAltDet : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAltDet : { 
oContextInformation:CContextInformation.prototype ,
oResDet:InvestigationResultView.prototype ,

 },CReqMsgGetWarnLink : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetWarnLink : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetResultModificationHistory : { 
oResultSearchBC:SearchResult.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResultModificationHistory : { 
oContextInformation:CContextInformation.prototype ,
oModificationHistory:ModificationHistory.prototype ,

 },CReqMsgGetStatusHistory : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetStatusHistory : { 
oContextInformation:CContextInformation.prototype ,
oResultValue:ResultComponentValue.prototype ,
oResultValueseen:ResultSeenDetail.prototype ,

 },CReqMsgGetGraphView : { 
oSearchBC:SearchInvestigationResult.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetGraphView : { 
oContextInformation:CContextInformation.prototype ,
oResults:InvestigationTabularView.prototype ,

 },CReqMsgGetResultReport : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResultReport : { 
oContextInformation:CContextInformation.prototype ,
oPrintResultsTemplate:PrintResultsTemplate.prototype ,

 },CReqMsgGetResultsCodingGrouping : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResultsCodingGrouping : { 
oContextInformation:CContextInformation.prototype ,
oResults:ResultsCodingDetails.prototype ,

 },CReqMsgGetResultDetails : { 
oSearchBC:SearchInvestigationResult.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResultDetails : { 
oInvResultView:InvestigationResultDetail.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetGroupRequestsDetails : { 
oSearchBC:SearchInvestigationResult.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetGroupRequestsDetails : { 
oContextInformation:CContextInformation.prototype ,
oInvResultView:InvestigationResultView.prototype ,

 },CReqMsgGetResultsTabularView : { 
oSearchBC:SearchInvestigationResult.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResultsTabularView : { 
oContextInformation:CContextInformation.prototype ,
oResults:InvestigationTabularView.prototype ,

 },CReqMsgGetResultsHistoryView : { 
oSearchBC:SearchInvestigationResult.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResultsHistoryView : { 
oContextInformation:CContextInformation.prototype ,
oResults:InvestigationTabularView.prototype ,

 },CReqMsgGetResultFilterByForTabularView : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResultFilterByForTabularView : { 
oContextInformation:CContextInformation.prototype ,
oRequest:InvestigationTabularView.prototype ,

 },CReqMsgGetResultsTabularViewFilter : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResultsTabularViewFilter : { 
oContextInformation:CContextInformation.prototype ,
oRequest:InvestigationTabularView.prototype ,

 },CReqMsgGetResultFilterBy : { 
pageElementBC:PagingDynamicSQL.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResultFilterBy : { 
oSumCount:ResultSummaryCount.prototype ,
oContextInformation:CContextInformation.prototype ,
oRequest:InvestigationResultView.prototype ,

 },CReqMsgGetResultsListviewFilter : { 
pageElementBC:PagingDynamicSQL.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResultsListviewFilter : { 
oSumCount:ResultSummaryCount.prototype ,
oContextInformation:CContextInformation.prototype ,
oRequest:InvestigationResultView.prototype ,

 },CReqMsgGetResultsListViewByRequestDetailOIDs : { 
pageElementBC:PagingDynamicSQL.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResultsListViewByRequestDetailOIDs : { 
summaryCount:ResultSummaryCount.prototype ,
oContextInformation:CContextInformation.prototype ,
resultViews:InvestigationResultView.prototype ,

 },CReqMsgGetRequestDetailsView : { 
oSearchBC:SearchInvestigationResult.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetRequestDetailsView : { 
oContextInformation:CContextInformation.prototype ,
oRequest:InvestigationResultView.prototype ,

 },CReqMsgGetResultByResultItemID : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResultByResultItemID : { 
oResult:ResultComponentValue.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgClearUnseenResults : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgClearUnseenResults : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgMarkResultsAsSeen : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgMarkResultsAsSeen : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetResHisDate : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResHisDate : { 
oContextInformation:CContextInformation.prototype ,
oResult:ResultComponentValue.prototype ,

 },CReqMsgGetRequestIntrayForm : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetRequestIntrayForm : { 
oResult:ResultComponentValue.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetRMResDtsHistory : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetRMResDtsHistory : { 
oContextInformation:CContextInformation.prototype ,
oResults:ResultComponentValue.prototype ,

 },CReqMsgGetResConfidential : { 
oReqBC:ResultSeenDetail.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResConfidential : { 
oContextInformation:CContextInformation.prototype ,
oResults:ResultComponentValue.prototype ,

 },CReqMsgGetDataFilterForRequestItem : { 
oReqBC:RequestItemDataFilter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDataFilterForRequestItem : { 
oResults:RequestItemDataFilter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetContextDetails : { 
oSearchBC:SearchInvestigationResult.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetContextDetails : { 
oContextInformation:CContextInformation.prototype ,
oRequest:InvestigationResultView.prototype ,

 },CReqMsgGetAccessRights : { 
oRequestBC:AccessRights.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAccessRights : { 
oResponse:AccessRights.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetResultDetailsForCDC : { 
oSearchBC:SearchInvestigationResult.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResultDetailsForCDC : { 
oContextInformation:CContextInformation.prototype ,
oResponse:ResultComponentValue.prototype ,

 },CReqMsgGetResults : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResults : { 
oManageResultStatus:ManageResultStatus.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetBubbleResultInfo : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetBubbleResultInfo : { 
oContextInformation:CContextInformation.prototype ,
oResults:ResultBubbleInfo.prototype ,

 },CReqMsgEnterResults : { 
oContextInformation:CContextInformation.prototype ,
objPatientInvestigationResultBC:PatientInvestigationResult.prototype ,

 },CResMsgEnterResults : { 
oResultId:Object.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetFormDefinition : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFormDefinition : { 
oContextInformation:CContextInformation.prototype ,
oResultItem:ResultItem.prototype ,

 },CReqMsgGetAllResultItem : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAllResultItem : { 
oContextInformation:CContextInformation.prototype ,
oResultItem:ResultItem.prototype ,

 },CReqMsgGetRequestItemByResultItemID : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetRequestItemByResultItemID : { 
oContextInformation:CContextInformation.prototype ,
oResultItem:ResultItem.prototype ,

 },CReqMsgGetResultItemDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResultItemDetails : { 
oContextInformation:CContextInformation.prototype ,
oResultItemInfo:ResultItemInfo.prototype ,

 },ResultItemInfo : { 
ResultItemNumeric:NumericResultItem.prototype ,
ResultItemRange:NumericResultItemRange.prototype ,

 },NumericResultItem : { 
ResultItemRange:NumericResultItemRange.prototype ,

 },CReqMsgGetResultItemDefinition : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResultItemDefinition : { 
oContextInformation:CContextInformation.prototype ,
oResultItem:ResultItem.prototype ,

 },CReqMsgGetCDCDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetCDCDetails : { 
objRequestEntryForm:RequestEntryForm.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetNotificationList : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetNotificationList : { 
oContextInformation:CContextInformation.prototype ,
oResultAdditionalInfo:ResultAdditionalInfo.prototype ,

 },CReqMsgManageResults : { 
oContextInformation:CContextInformation.prototype ,
objPatientInvestigationResultBC:ManageResultStatus.prototype ,

 },CResMsgManageResults : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgAcknowledgeResult : { 
oContextInformation:CContextInformation.prototype ,
oManageResultStatusBC:ManageResultStatus.prototype ,

 },CResMsgAcknowledgeResult : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgAcknowledgeResults : { 
oContextInformation:CContextInformation.prototype ,
acknowledgeInfoBC:AcknowledgeResultInfo.prototype ,

 },CResMsgAcknowledgeResults : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgAuthorizeResult : { 
oContextInformation:CContextInformation.prototype ,
oManageResultStatusBC:ManageResultStatus.prototype ,

 },CResMsgAuthorizeResult : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgCancelResult : { 
oContextInformation:CContextInformation.prototype ,
oManageResultStatusBC:ManageResultStatus.prototype ,

 },CResMsgCancelResult : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgPrintResults : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgPrintResults : { 
oContextInformation:CContextInformation.prototype ,
oPrintResult:PrintResults.prototype ,

 },CReqMsgGetApplyAllResult : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetApplyAllResult : { 
oContextInformation:CContextInformation.prototype ,
oManageResultStatus:ManageResultStatus.prototype ,

 },CReqMsgManageAcknowledgestatus : { 
oManageResultStatusBC:ManageResultStatus.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgManageAcknowledgestatus : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetSeenResultReport : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetSeenResultReport : { 
oContextInformation:CContextInformation.prototype ,
oSeenResultReport:SeenResultReport.prototype ,

 },CReqMsgGetResultAcknowledgedReport : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResultAcknowledgedReport : { 
oContextInformation:CContextInformation.prototype ,
oResultAcknowledgedReport:ResultAcknowledgedReport.prototype ,

 },CReqMsgGetResultUnAcknowledgedReport : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResultUnAcknowledgedReport : { 
oContextInformation:CContextInformation.prototype ,
oResultUnAcknowledgedReport:ResultUnAcknowledgedReport.prototype ,

 },CContextInformation : { 
Current:CContextInformation.prototype ,

 },
 }
 
const charPropertyLookup = [
'WarningFlag',
'IsSet',
'IsPrimary',
'IsWorkingProblemStatus','IsSignificant','IsConfidential','IsHasHistory','CanStrikeOut','HasLinkProblem','HasFilter','IsDistributed',
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
'SpecimenIdentifier',
'RecurrenceType',
'IncludeClinicianSeal','IncludeOwnSeal','IncludeOtherSeal','ViewMode',]
 