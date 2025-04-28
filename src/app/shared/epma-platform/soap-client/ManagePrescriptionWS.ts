import { int64, int16, int32, uInt16, uInt32, uInt64, byte, long, double, decimal, DelegateArgs, CContextInformation, CLZOObject } from "epma-platform/models";
import { ObservableCollection } from "../models/observable-collection";
import DateTime from "../services/datetime.service";
import { HelperService } from "./helper.service";
export class ManagePrescriptionWSSoapClient{

GetDispInsCompleted: Function;
GetDispInsAsync(oCReqMsgGetDispIns:CReqMsgGetDispIns ) : void {
  HelperService.Invoke<CReqMsgGetDispIns,CResMsgGetDispIns,GetDispInsCompletedEventArgs>("ManagePrescriptionWS.GetDispIns",oCReqMsgGetDispIns,this.GetDispInsCompleted,"sPatientOID",new GetDispInsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFavouritesGroupItemsListCompleted: Function;
GetFavouritesGroupItemsListAsync(oCReqMsgGetFavouritesGroupItemsList:CReqMsgGetFavouritesGroupItemsList ) : void {
  HelperService.Invoke<CReqMsgGetFavouritesGroupItemsList,CResMsgGetFavouritesGroupItemsList,GetFavouritesGroupItemsListCompletedEventArgs>("ManagePrescriptionWS.GetFavouritesGroupItemsList",oCReqMsgGetFavouritesGroupItemsList,this.GetFavouritesGroupItemsListCompleted,"MCVersion",new GetFavouritesGroupItemsListCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPatientMergeConflictsCompleted: Function;
GetPatientMergeConflictsAsync(oCReqMsgGetPatientMergeConflicts:CReqMsgGetPatientMergeConflicts ) : void {
  HelperService.Invoke<CReqMsgGetPatientMergeConflicts,CResMsgGetPatientMergeConflicts,GetPatientMergeConflictsCompletedEventArgs>("ManagePrescriptionWS.GetPatientMergeConflicts",oCReqMsgGetPatientMergeConflicts,this.GetPatientMergeConflictsCompleted,"objMergeMedicationDetails",new GetPatientMergeConflictsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFavouritesDefaultFolderCompleted: Function;
GetFavouritesDefaultFolderAsync(oCReqMsgGetFavouritesDefaultFolder:CReqMsgGetFavouritesDefaultFolder ) : void {
  HelperService.Invoke<CReqMsgGetFavouritesDefaultFolder,CResMsgGetFavouritesDefaultFolder,GetFavouritesDefaultFolderCompletedEventArgs>("ManagePrescriptionWS.GetFavouritesDefaultFolder",oCReqMsgGetFavouritesDefaultFolder,this.GetFavouritesDefaultFolderCompleted,"TeamOIDs",new GetFavouritesDefaultFolderCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetLifeViewPrintDetailsCompleted: Function;
GetLifeViewPrintDetailsAsync(oCReqMsgGetLifeViewPrintDetails:CReqMsgGetLifeViewPrintDetails ) : void {
  HelperService.Invoke<CReqMsgGetLifeViewPrintDetails,CResMsgGetLifeViewPrintDetails,GetLifeViewPrintDetailsCompletedEventArgs>("ManagePrescriptionWS.GetLifeViewPrintDetails",oCReqMsgGetLifeViewPrintDetails,this.GetLifeViewPrintDetailsCompleted,"PrescriptionItemOID",new GetLifeViewPrintDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

InsUpPerscriptionMedClerkCompleted: Function;
InsUpPerscriptionMedClerkAsync(oCReqMsgInsUpPerscriptionMedClerk:CReqMsgInsUpPerscriptionMedClerk ) : void {
  HelperService.Invoke<CReqMsgInsUpPerscriptionMedClerk,CResMsgInsUpPerscriptionMedClerk,InsUpPerscriptionMedClerkCompletedEventArgs>("ManagePrescriptionWS.InsUpPerscriptionMedClerk",oCReqMsgInsUpPerscriptionMedClerk,this.InsUpPerscriptionMedClerkCompleted,"sMedClerkedValue",new InsUpPerscriptionMedClerkCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMedclerkPromptCompleted: Function;
GetMedclerkPromptAsync(oCReqMsgGetMedclerkPrompt:CReqMsgGetMedclerkPrompt ) : void {
  HelperService.Invoke<CReqMsgGetMedclerkPrompt,CResMsgGetMedclerkPrompt,GetMedclerkPromptCompletedEventArgs>("ManagePrescriptionWS.GetMedclerkPrompt",oCReqMsgGetMedclerkPrompt,this.GetMedclerkPromptCompleted,"EncounterOID",new GetMedclerkPromptCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDoseCalcDetailsCompleted: Function;
GetDoseCalcDetailsAsync(oCReqMsgGetDoseCalcDetails:CReqMsgGetDoseCalcDetails ) : void {
  HelperService.Invoke<CReqMsgGetDoseCalcDetails,CResMsgGetDoseCalcDetails,GetDoseCalcDetailsCompletedEventArgs>("ManagePrescriptionWS.GetDoseCalcDetails",oCReqMsgGetDoseCalcDetails,this.GetDoseCalcDetailsCompleted,"lnPrescribableItemDetailOID",new GetDoseCalcDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetAllOptionsCompleted: Function;
GetAllOptionsAsync(oCReqMsgGetAllOptions:CReqMsgGetAllOptions ) : void {
  HelperService.Invoke<CReqMsgGetAllOptions,CResMsgGetAllOptions,GetAllOptionsCompletedEventArgs>("ManagePrescriptionWS.GetAllOptions",oCReqMsgGetAllOptions,this.GetAllOptionsCompleted,"MCVersionNo",new GetAllOptionsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetIsItemAuthoriseCompleted: Function;
GetIsItemAuthoriseAsync(oCReqMsgGetIsItemAuthorise:CReqMsgGetIsItemAuthorise ) : void {
  HelperService.Invoke<CReqMsgGetIsItemAuthorise,CResMsgGetIsItemAuthorise,GetIsItemAuthoriseCompletedEventArgs>("ManagePrescriptionWS.GetIsItemAuthorise",oCReqMsgGetIsItemAuthorise,this.GetIsItemAuthoriseCompleted,"MCVersionNo",new GetIsItemAuthoriseCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFormViewControlsCompleted: Function;
GetFormViewControlsAsync(oCReqMsgGetFormViewControls:CReqMsgGetFormViewControls ) : void {
  HelperService.Invoke<CReqMsgGetFormViewControls,CResMsgGetFormViewControls,GetFormViewControlsCompletedEventArgs>("ManagePrescriptionWS.GetFormViewControls",oCReqMsgGetFormViewControls,this.GetFormViewControlsCompleted,"mcVersionNo",new GetFormViewControlsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetProblemCompleted: Function;
GetProblemAsync(oCReqMsgGetProblem:CReqMsgGetProblem ) : void {
  HelperService.Invoke<CReqMsgGetProblem,CResMsgGetProblem,GetProblemCompletedEventArgs>("ManagePrescriptionWS.GetProblem",oCReqMsgGetProblem,this.GetProblemCompleted,"SealRecordList",new GetProblemCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDischargeDateCompleted: Function;
GetDischargeDateAsync(oCReqMsgGetDischargeDate:CReqMsgGetDischargeDate ) : void {
  HelperService.Invoke<CReqMsgGetDischargeDate,CResMsgGetDischargeDate,GetDischargeDateCompletedEventArgs>("ManagePrescriptionWS.GetDischargeDate",oCReqMsgGetDischargeDate,this.GetDischargeDateCompleted,"EncounterOID",new GetDischargeDateCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDrugRouteCompleted: Function;
GetDrugRouteAsync(oCReqMsgGetDrugRoute:CReqMsgGetDrugRoute ) : void {
  HelperService.Invoke<CReqMsgGetDrugRoute,CResMsgGetDrugRoute,GetDrugRouteCompletedEventArgs>("ManagePrescriptionWS.GetDrugRoute",oCReqMsgGetDrugRoute,this.GetDrugRouteCompleted,"oDrugItemBasicData",new GetDrugRouteCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetStationaryItemByOIDCompleted: Function;
GetStationaryItemByOIDAsync(oCReqMsgGetStationaryItemByOID:CReqMsgGetStationaryItemByOID ) : void {
  HelperService.Invoke<CReqMsgGetStationaryItemByOID,CResMsgGetStationaryItemByOID,GetStationaryItemByOIDCompletedEventArgs>("ManagePrescriptionWS.GetStationaryItemByOID",oCReqMsgGetStationaryItemByOID,this.GetStationaryItemByOIDCompleted,"lnPatientOID",new GetStationaryItemByOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetItemStatusCompleted: Function;
GetItemStatusAsync(oCReqMsgGetItemStatus:CReqMsgGetItemStatus ) : void {
  HelperService.Invoke<CReqMsgGetItemStatus,CResMsgGetItemStatus,GetItemStatusCompletedEventArgs>("ManagePrescriptionWS.GetItemStatus",oCReqMsgGetItemStatus,this.GetItemStatusCompleted,"lnPatientOID",new GetItemStatusCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPrescriptionItemsCompleted: Function;
GetPrescriptionItemsAsync(oCReqMsgGetPrescriptionItems:CReqMsgGetPrescriptionItems ) : void {
  HelperService.Invoke<CReqMsgGetPrescriptionItems,CResMsgGetPrescriptionItems,GetPrescriptionItemsCompletedEventArgs>("ManagePrescriptionWS.GetPrescriptionItems",oCReqMsgGetPrescriptionItems,this.GetPrescriptionItemsCompleted,"PrescriptionOID",new GetPrescriptionItemsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

NotifyFYICompleted: Function;
NotifyFYIAsync(oCReqMsgNotifyFYI:CReqMsgNotifyFYI ) : void {
  HelperService.Invoke<CReqMsgNotifyFYI,CResMsgNotifyFYI,NotifyFYICompletedEventArgs>("ManagePrescriptionWS.NotifyFYI",oCReqMsgNotifyFYI,this.NotifyFYICompleted,"oNotifyFYIDetails",new NotifyFYICompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPrescDrugStationaryIDCompleted: Function;
GetPrescDrugStationaryIDAsync(oCReqMsgGetPrescDrugStationaryID:CReqMsgGetPrescDrugStationaryID ) : void {
  HelperService.Invoke<CReqMsgGetPrescDrugStationaryID,CResMsgGetPrescDrugStationaryID,GetPrescDrugStationaryIDCompletedEventArgs>("ManagePrescriptionWS.GetPrescDrugStationaryID",oCReqMsgGetPrescDrugStationaryID,this.GetPrescDrugStationaryIDCompleted,"sPrescriptionItemIds",new GetPrescDrugStationaryIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFormularyHierarchyCompleted: Function;
GetFormularyHierarchyAsync(oCReqMsgGetFormularyHierarchy:CReqMsgGetFormularyHierarchy ) : void {
  HelperService.Invoke<CReqMsgGetFormularyHierarchy,CResMsgGetFormularyHierarchy,GetFormularyHierarchyCompletedEventArgs>("ManagePrescriptionWS.GetFormularyHierarchy",oCReqMsgGetFormularyHierarchy,this.GetFormularyHierarchyCompleted,"oDrugHierarchyInput",new GetFormularyHierarchyCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetHierarchyFormularyItemsCompleted: Function;
GetHierarchyFormularyItemsAsync(oCReqMsgGetHierarchyFormularyItems:CReqMsgGetHierarchyFormularyItems ) : void {
  HelperService.Invoke<CReqMsgGetHierarchyFormularyItems,CResMsgGetHierarchyFormularyItems,GetHierarchyFormularyItemsCompletedEventArgs>("ManagePrescriptionWS.GetHierarchyFormularyItems",oCReqMsgGetHierarchyFormularyItems,this.GetHierarchyFormularyItemsCompleted,"oDrugHierarchyInput",new GetHierarchyFormularyItemsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetTechnicalDetailsCompleted: Function;
GetTechnicalDetailsAsync(oCReqMsgGetTechnicalDetails:CReqMsgGetTechnicalDetails ) : void {
  HelperService.Invoke<CReqMsgGetTechnicalDetails,CResMsgGetTechnicalDetails,GetTechnicalDetailsCompletedEventArgs>("ManagePrescriptionWS.GetTechnicalDetails",oCReqMsgGetTechnicalDetails,this.GetTechnicalDetailsCompleted,"PrescriptionItemOID",new GetTechnicalDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDrugDetailsCompleted: Function;
GetDrugDetailsAsync(oCReqMsgGetDrugDetails:CReqMsgGetDrugDetails ) : void {
  HelperService.Invoke<CReqMsgGetDrugDetails,CResMsgGetDrugDetails,GetDrugDetailsCompletedEventArgs>("ManagePrescriptionWS.GetDrugDetails",oCReqMsgGetDrugDetails,this.GetDrugDetailsCompleted,"IsBreak",new GetDrugDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

UpdatePrintStatusCompleted: Function;
UpdatePrintStatusAsync(oCReqMsgUpdatePrintStatus:CReqMsgUpdatePrintStatus ) : void {
  HelperService.Invoke<CReqMsgUpdatePrintStatus,CResMsgUpdatePrintStatus,UpdatePrintStatusCompletedEventArgs>("ManagePrescriptionWS.UpdatePrintStatus",oCReqMsgUpdatePrintStatus,this.UpdatePrintStatusCompleted,"IsprescriptionID",new UpdatePrintStatusCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CheckAccessCompleted: Function;
CheckAccessAsync(oCReqMsgCheckAccess:CReqMsgCheckAccess ) : void {
  HelperService.Invoke<CReqMsgCheckAccess,CResMsgCheckAccess,CheckAccessCompletedEventArgs>("ManagePrescriptionWS.CheckAccess",oCReqMsgCheckAccess,this.CheckAccessCompleted,"sResourceName",new CheckAccessCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetResultsViewCompleted: Function;
GetResultsViewAsync(oCReqMsgGetResultsView:CReqMsgGetResultsView ) : void {
  HelperService.Invoke<CReqMsgGetResultsView,CResMsgGetResultsView,GetResultsViewCompletedEventArgs>("ManagePrescriptionWS.GetResultsView",oCReqMsgGetResultsView,this.GetResultsViewCompleted,"NoOfRows",new GetResultsViewCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetRequestIdCompleted: Function;
GetRequestIdAsync(oCReqMsgGetRequestId:CReqMsgGetRequestId ) : void {
  HelperService.Invoke<CReqMsgGetRequestId,CResMsgGetRequestId,GetRequestIdCompletedEventArgs>("ManagePrescriptionWS.GetRequestId",oCReqMsgGetRequestId,this.GetRequestIdCompleted,"MCVersion",new GetRequestIdCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ChkResultAssociationCompleted: Function;
ChkResultAssociationAsync(oCReqMsgChkResultAssociation:CReqMsgChkResultAssociation ) : void {
  HelperService.Invoke<CReqMsgChkResultAssociation,CResMsgChkResultAssociation,ChkResultAssociationCompletedEventArgs>("ManagePrescriptionWS.ChkResultAssociation",oCReqMsgChkResultAssociation,this.ChkResultAssociationCompleted,"sMCVersion",new ChkResultAssociationCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPatientMedicationListCompleted: Function;
GetPatientMedicationListAsync(oCReqMsgGetPatientMedicationList:CReqMsgGetPatientMedicationList ) : void {
  HelperService.Invoke<CReqMsgGetPatientMedicationList,CResMsgGetPatientMedicationList,GetPatientMedicationListCompletedEventArgs>("ManagePrescriptionWS.GetPatientMedicationList",oCReqMsgGetPatientMedicationList,this.GetPatientMedicationListCompleted,"oMedicationListCriteria",new GetPatientMedicationListCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPatientMedicationHistoryCompleted: Function;
GetPatientMedicationHistoryAsync(oCReqMsgGetPatientMedicationHistory:CReqMsgGetPatientMedicationHistory ) : void {
  HelperService.Invoke<CReqMsgGetPatientMedicationHistory,CResMsgGetPatientMedicationHistory,GetPatientMedicationHistoryCompletedEventArgs>("ManagePrescriptionWS.GetPatientMedicationHistory",oCReqMsgGetPatientMedicationHistory,this.GetPatientMedicationHistoryCompleted,"PageElement",new GetPatientMedicationHistoryCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDeactivateAttributesCompleted: Function;
GetDeactivateAttributesAsync(oCReqMsgGetDeactivateAttributes:CReqMsgGetDeactivateAttributes ) : void {
  HelperService.Invoke<CReqMsgGetDeactivateAttributes,CResMsgGetDeactivateAttributes,GetDeactivateAttributesCompletedEventArgs>("ManagePrescriptionWS.GetDeactivateAttributes",oCReqMsgGetDeactivateAttributes,this.GetDeactivateAttributesCompleted,"smcVersionNo",new GetDeactivateAttributesCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFormLorenzoIDCompleted: Function;
GetFormLorenzoIDAsync(oCReqMsgGetFormLorenzoID:CReqMsgGetFormLorenzoID ) : void {
  HelperService.Invoke<CReqMsgGetFormLorenzoID,CResMsgGetFormLorenzoID,GetFormLorenzoIDCompletedEventArgs>("ManagePrescriptionWS.GetFormLorenzoID",oCReqMsgGetFormLorenzoID,this.GetFormLorenzoIDCompleted,"oDrugItemInputData",new GetFormLorenzoIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetItemStrengthInfoCompleted: Function;
GetItemStrengthInfoAsync(oCReqMsgGetItemStrengthInfo:CReqMsgGetItemStrengthInfo ) : void {
  HelperService.Invoke<CReqMsgGetItemStrengthInfo,CResMsgGetItemStrengthInfo,GetItemStrengthInfoCompletedEventArgs>("ManagePrescriptionWS.GetItemStrengthInfo",oCReqMsgGetItemStrengthInfo,this.GetItemStrengthInfoCompleted,"oDrugItemInputData",new GetItemStrengthInfoCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDocTemplatesPolicyTypeCompleted: Function;
GetDocTemplatesPolicyTypeAsync(oCReqMsgGetDocTemplatesPolicyType:CReqMsgGetDocTemplatesPolicyType ) : void {
  HelperService.Invoke<CReqMsgGetDocTemplatesPolicyType,CResMsgGetDocTemplatesPolicyType,GetDocTemplatesPolicyTypeCompletedEventArgs>("ManagePrescriptionWS.GetDocTemplatesPolicyType",oCReqMsgGetDocTemplatesPolicyType,this.GetDocTemplatesPolicyTypeCompleted,"PrescriptionOIDs",new GetDocTemplatesPolicyTypeCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPatientMedicationCountCompleted: Function;
GetPatientMedicationCountAsync(oCReqMsgGetPatientMedicationCount:CReqMsgGetPatientMedicationCount ) : void {
  HelperService.Invoke<CReqMsgGetPatientMedicationCount,CResMsgGetPatientMedicationCount,GetPatientMedicationCountCompletedEventArgs>("ManagePrescriptionWS.GetPatientMedicationCount",oCReqMsgGetPatientMedicationCount,this.GetPatientMedicationCountCompleted,"PrescriptionType",new GetPatientMedicationCountCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMedClerkingSourceCompleted: Function;
GetMedClerkingSourceAsync(oCReqMsgGetMedClerkingSource:CReqMsgGetMedClerkingSource ) : void {
  HelperService.Invoke<CReqMsgGetMedClerkingSource,CResMsgGetMedClerkingSource,GetMedClerkingSourceCompletedEventArgs>("ManagePrescriptionWS.GetMedClerkingSource",oCReqMsgGetMedClerkingSource,this.GetMedClerkingSourceCompleted,"oMedLstCrt",new GetMedClerkingSourceCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDrugBasicInfoCompleted: Function;
GetDrugBasicInfoAsync(oCReqMsgGetDrugBasicInfo:CReqMsgGetDrugBasicInfo ) : void {
  HelperService.Invoke<CReqMsgGetDrugBasicInfo,CResMsgGetDrugBasicInfo,GetDrugBasicInfoCompletedEventArgs>("ManagePrescriptionWS.GetDrugBasicInfo",oCReqMsgGetDrugBasicInfo,this.GetDrugBasicInfoCompleted,"OIDs",new GetDrugBasicInfoCompletedEventArgs(), prototypeList, charPropertyLookup);
}

SubmitDrugsCompleted: Function;
SubmitDrugsAsync(oCReqMsgSubmitDrugs:CReqMsgSubmitDrugs ) : void {
  HelperService.Invoke<CReqMsgSubmitDrugs,CResMsgSubmitDrugs,SubmitDrugsCompletedEventArgs>("ManagePrescriptionWS.SubmitDrugs",oCReqMsgSubmitDrugs,this.SubmitDrugsCompleted,"oMedication",new SubmitDrugsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetNonReconciledItemsCompleted: Function;
GetNonReconciledItemsAsync(oCReqMsgGetNonReconciledItems:CReqMsgGetNonReconciledItems ) : void {
  HelperService.Invoke<CReqMsgGetNonReconciledItems,CResMsgGetNonReconciledItems,GetNonReconciledItemsCompletedEventArgs>("ManagePrescriptionWS.GetNonReconciledItems",oCReqMsgGetNonReconciledItems,this.GetNonReconciledItemsCompleted,"oPrescriptionItemCriteria",new GetNonReconciledItemsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

VerifyDrugCompleted: Function;
VerifyDrugAsync(oCReqMsgVerifyDrug:CReqMsgVerifyDrug ) : void {
  HelperService.Invoke<CReqMsgVerifyDrug,CResMsgVerifyDrug,VerifyDrugCompletedEventArgs>("ManagePrescriptionWS.VerifyDrug",oCReqMsgVerifyDrug,this.VerifyDrugCompleted,"TechnicalValidate",new VerifyDrugCompletedEventArgs(), prototypeList, charPropertyLookup);
}

AuthoriseDrugCompleted: Function;
AuthoriseDrugAsync(oCReqMsgAuthoriseDrug:CReqMsgAuthoriseDrug ) : void {
  HelperService.Invoke<CReqMsgAuthoriseDrug,CResMsgAuthoriseDrug,AuthoriseDrugCompletedEventArgs>("ManagePrescriptionWS.AuthoriseDrug",oCReqMsgAuthoriseDrug,this.AuthoriseDrugCompleted,"objPrescriptionRes",new AuthoriseDrugCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetProcessingOptionIndicationsCompleted: Function;
GetProcessingOptionIndicationsAsync(oCReqMsgGetProcessingOptionIndications:CReqMsgGetProcessingOptionIndications ) : void {
  HelperService.Invoke<CReqMsgGetProcessingOptionIndications,CResMsgGetProcessingOptionIndications,GetProcessingOptionIndicationsCompletedEventArgs>("ManagePrescriptionWS.GetProcessingOptionIndications",oCReqMsgGetProcessingOptionIndications,this.GetProcessingOptionIndicationsCompleted,"oDrugItemBasicData",new GetProcessingOptionIndicationsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

SearchProcessingOptionsByIndicationsCompleted: Function;
SearchProcessingOptionsByIndicationsAsync(oCReqMsgSearchProcessingOptionsByIndications:CReqMsgSearchProcessingOptionsByIndications ) : void {
  HelperService.Invoke<CReqMsgSearchProcessingOptionsByIndications,CResMsgSearchProcessingOptionsByIndications,SearchProcessingOptionsByIndicationsCompletedEventArgs>("ManagePrescriptionWS.SearchProcessingOptionsByIndications",oCReqMsgSearchProcessingOptionsByIndications,this.SearchProcessingOptionsByIndicationsCompleted,"oIndications",new SearchProcessingOptionsByIndicationsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetCurrentMedicationCompleted: Function;
GetCurrentMedicationAsync(oCReqMsgGetCurrentMedication:CReqMsgGetCurrentMedication ) : void {
  HelperService.Invoke<CReqMsgGetCurrentMedication,CResMsgGetCurrentMedication,GetCurrentMedicationCompletedEventArgs>("ManagePrescriptionWS.GetCurrentMedication",oCReqMsgGetCurrentMedication,this.GetCurrentMedicationCompleted,"oPrescriptionItemInputData",new GetCurrentMedicationCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetSearchDrugsCompleted: Function;
GetSearchDrugsAsync(oCReqMsgGetSearchDrugs:CReqMsgGetSearchDrugs ) : void {
  HelperService.Invoke<CReqMsgGetSearchDrugs,CResMsgGetSearchDrugs,GetSearchDrugsCompletedEventArgs>("ManagePrescriptionWS.GetSearchDrugs",oCReqMsgGetSearchDrugs,this.GetSearchDrugsCompleted,"oPowerSearchCriteria",new GetSearchDrugsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetCompatibleComponentsCompleted: Function;
GetCompatibleComponentsAsync(oCReqMsgGetCompatibleComponents:CReqMsgGetCompatibleComponents ) : void {
  HelperService.Invoke<CReqMsgGetCompatibleComponents,CResMsgGetCompatibleComponents,GetCompatibleComponentsCompletedEventArgs>("ManagePrescriptionWS.GetCompatibleComponents",oCReqMsgGetCompatibleComponents,this.GetCompatibleComponentsCompleted,"oCompatibleComponentCriteria",new GetCompatibleComponentsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetResolveDefaultCompleted: Function;
GetResolveDefaultAsync(oCReqMsgGetResolveDefault:CReqMsgGetResolveDefault ) : void {
  HelperService.Invoke<CReqMsgGetResolveDefault,CResMsgGetResolveDefault,GetResolveDefaultCompletedEventArgs>("ManagePrescriptionWS.GetResolveDefault",oCReqMsgGetResolveDefault,this.GetResolveDefaultCompleted,"oDrugItemInputData",new GetResolveDefaultCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetResolveDetailCompleted: Function;
GetResolveDetailAsync(oCReqMsgGetResolveDetail:CReqMsgGetResolveDetail ) : void {
  HelperService.Invoke<CReqMsgGetResolveDetail,CResMsgGetResolveDetail,GetResolveDetailCompletedEventArgs>("ManagePrescriptionWS.GetResolveDetail",oCReqMsgGetResolveDetail,this.GetResolveDetailCompleted,"oDrugItemBasicData",new GetResolveDetailCompletedEventArgs(), prototypeList, charPropertyLookup);
}

SubmitTechValidationDetailsCompleted: Function;
SubmitTechValidationDetailsAsync(oCReqMsgSubmitTechValidationDetails:CReqMsgSubmitTechValidationDetails ) : void {
  HelperService.Invoke<CReqMsgSubmitTechValidationDetails,CResMsgSubmitTechValidationDetails,SubmitTechValidationDetailsCompletedEventArgs>("ManagePrescriptionWS.SubmitTechValidationDetails",oCReqMsgSubmitTechValidationDetails,this.SubmitTechValidationDetailsCompleted,"oTechnicalValidationInfo",new SubmitTechValidationDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDoseDetailsCompleted: Function;
GetDoseDetailsAsync(oCReqMsgGetDoseDetails:CReqMsgGetDoseDetails ) : void {
  HelperService.Invoke<CReqMsgGetDoseDetails,CResMsgGetDoseDetails,GetDoseDetailsCompletedEventArgs>("ManagePrescriptionWS.GetDoseDetails",oCReqMsgGetDoseDetails,this.GetDoseDetailsCompleted,"PrescriptionItemOID",new GetDoseDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPrescriptionItemDoseInfoCompleted: Function;
GetPrescriptionItemDoseInfoAsync(oCReqMsgGetPrescriptionItemDoseInfo:CReqMsgGetPrescriptionItemDoseInfo ) : void {
  HelperService.Invoke<CReqMsgGetPrescriptionItemDoseInfo,CResMsgGetPrescriptionItemDoseInfo,GetPrescriptionItemDoseInfoCompletedEventArgs>("ManagePrescriptionWS.GetPrescriptionItemDoseInfo",oCReqMsgGetPrescriptionItemDoseInfo,this.GetPrescriptionItemDoseInfoCompleted,"PrescriptionItemOID",new GetPrescriptionItemDoseInfoCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetValidationsDetailsCompleted: Function;
GetValidationsDetailsAsync(oCReqMsgGetValidationsDetails:CReqMsgGetValidationsDetails ) : void {
  HelperService.Invoke<CReqMsgGetValidationsDetails,CResMsgGetValidationsDetails,GetValidationsDetailsCompletedEventArgs>("ManagePrescriptionWS.GetValidationsDetails",oCReqMsgGetValidationsDetails,this.GetValidationsDetailsCompleted,"oValidationDetails",new GetValidationsDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetAdditionalDetailsCompleted: Function;
GetAdditionalDetailsAsync(oCReqMsgGetAdditionalDetails:CReqMsgGetAdditionalDetails ) : void {
  HelperService.Invoke<CReqMsgGetAdditionalDetails,CResMsgGetAdditionalDetails,GetAdditionalDetailsCompletedEventArgs>("ManagePrescriptionWS.GetAdditionalDetails",oCReqMsgGetAdditionalDetails,this.GetAdditionalDetailsCompleted,"PrescriptionItemOID",new GetAdditionalDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPrescriptionViewCompleted: Function;
GetPrescriptionViewAsync(oCReqMsgGetPrescriptionView:CReqMsgGetPrescriptionView ) : void {
  HelperService.Invoke<CReqMsgGetPrescriptionView,CResMsgGetPrescriptionView,GetPrescriptionViewCompletedEventArgs>("ManagePrescriptionWS.GetPrescriptionView",oCReqMsgGetPrescriptionView,this.GetPrescriptionViewCompleted,"CurrentPageConfig",new GetPrescriptionViewCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDecisionSupportCompleted: Function;
GetDecisionSupportAsync(oCReqMsgGetDecisionSupport:CReqMsgGetDecisionSupport ) : void {
  HelperService.Invoke<CReqMsgGetDecisionSupport,CResMsgGetDecisionSupport,GetDecisionSupportCompletedEventArgs>("ManagePrescriptionWS.GetDecisionSupport",oCReqMsgGetDecisionSupport,this.GetDecisionSupportCompleted,"objDecisionSuppCriteria",new GetDecisionSupportCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetReplacementDrugsCompleted: Function;
GetReplacementDrugsAsync(oCReqMsgGetReplacementDrugs:CReqMsgGetReplacementDrugs ) : void {
  HelperService.Invoke<CReqMsgGetReplacementDrugs,CResMsgGetReplacementDrugs,GetReplacementDrugsCompletedEventArgs>("ManagePrescriptionWS.GetReplacementDrugs",oCReqMsgGetReplacementDrugs,this.GetReplacementDrugsCompleted,"oDrugItemBasicData",new GetReplacementDrugsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetAlternateOptionsCompleted: Function;
GetAlternateOptionsAsync(oCReqMsgGetAlternateOptions:CReqMsgGetAlternateOptions ) : void {
  HelperService.Invoke<CReqMsgGetAlternateOptions,CResMsgGetAlternateOptions,GetAlternateOptionsCompletedEventArgs>("ManagePrescriptionWS.GetAlternateOptions",oCReqMsgGetAlternateOptions,this.GetAlternateOptionsCompleted,"oDrugItemBasicData",new GetAlternateOptionsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetProductPackOptionsCompleted: Function;
GetProductPackOptionsAsync(oCReqMsgGetProductPackOptions:CReqMsgGetProductPackOptions ) : void {
  HelperService.Invoke<CReqMsgGetProductPackOptions,CResMsgGetProductPackOptions,GetProductPackOptionsCompletedEventArgs>("ManagePrescriptionWS.GetProductPackOptions",oCReqMsgGetProductPackOptions,this.GetProductPackOptionsCompleted,"oDrugItemBasicData",new GetProductPackOptionsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetRelatedOptionsCompleted: Function;
GetRelatedOptionsAsync(oCReqMsgGetRelatedOptions:CReqMsgGetRelatedOptions ) : void {
  HelperService.Invoke<CReqMsgGetRelatedOptions,CResMsgGetRelatedOptions,GetRelatedOptionsCompletedEventArgs>("ManagePrescriptionWS.GetRelatedOptions",oCReqMsgGetRelatedOptions,this.GetRelatedOptionsCompleted,"oDrugItemInputData",new GetRelatedOptionsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetProductOptionsCompleted: Function;
GetProductOptionsAsync(oCReqMsgGetProductOptions:CReqMsgGetProductOptions ) : void {
  HelperService.Invoke<CReqMsgGetProductOptions,CResMsgGetProductOptions,GetProductOptionsCompletedEventArgs>("ManagePrescriptionWS.GetProductOptions",oCReqMsgGetProductOptions,this.GetProductOptionsCompleted,"oDrugItemInputData",new GetProductOptionsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetProcessingOptionsCompleted: Function;
GetProcessingOptionsAsync(oCReqMsgGetProcessingOptions:CReqMsgGetProcessingOptions ) : void {
  HelperService.Invoke<CReqMsgGetProcessingOptions,CResMsgGetProcessingOptions,GetProcessingOptionsCompletedEventArgs>("ManagePrescriptionWS.GetProcessingOptions",oCReqMsgGetProcessingOptions,this.GetProcessingOptionsCompleted,"oDrugItemInputData",new GetProcessingOptionsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetItemMongraphCompleted: Function;
GetItemMongraphAsync(oCReqMsgGetItemMongraph:CReqMsgGetItemMongraph ) : void {
  HelperService.Invoke<CReqMsgGetItemMongraph,CResMsgGetItemMongraph,GetItemMongraphCompletedEventArgs>("ManagePrescriptionWS.GetItemMongraph",oCReqMsgGetItemMongraph,this.GetItemMongraphCompleted,"oDrugItemBasicData",new GetItemMongraphCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPrescriptionDetailsCompleted: Function;
GetPrescriptionDetailsAsync(oCReqMsgGetPrescriptionDetails:CReqMsgGetPrescriptionDetails ) : void {
  HelperService.Invoke<CReqMsgGetPrescriptionDetails,CResMsgGetPrescriptionDetails,GetPrescriptionDetailsCompletedEventArgs>("ManagePrescriptionWS.GetPrescriptionDetails",oCReqMsgGetPrescriptionDetails,this.GetPrescriptionDetailsCompleted,"oPrescriptionItemInputData",new GetPrescriptionDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMonographInformationCompleted: Function;
GetMonographInformationAsync(oCReqMsgGetMonographInformation:CReqMsgGetMonographInformation ) : void {
  HelperService.Invoke<CReqMsgGetMonographInformation,CResMsgGetMonographInformation,GetMonographInformationCompletedEventArgs>("ManagePrescriptionWS.GetMonographInformation",oCReqMsgGetMonographInformation,this.GetMonographInformationCompleted,"oDrugItemBasicData",new GetMonographInformationCompletedEventArgs(), prototypeList, charPropertyLookup);
}
}

export class GetDispInsCompletedEventArgs{
 public Result: CResMsgGetDispIns;
public Error: any;
}
export class GetFavouritesGroupItemsListCompletedEventArgs{
 public Result: CResMsgGetFavouritesGroupItemsList;
public Error: any;
}
export class GetPatientMergeConflictsCompletedEventArgs{
 public Result: CResMsgGetPatientMergeConflicts;
public Error: any;
}
export class GetFavouritesDefaultFolderCompletedEventArgs{
 public Result: CResMsgGetFavouritesDefaultFolder;
public Error: any;
}
export class GetLifeViewPrintDetailsCompletedEventArgs{
 public Result: CResMsgGetLifeViewPrintDetails;
public Error: any;
}
export class InsUpPerscriptionMedClerkCompletedEventArgs{
 public Result: CResMsgInsUpPerscriptionMedClerk;
public Error: any;
}
export class GetMedclerkPromptCompletedEventArgs{
 public Result: CResMsgGetMedclerkPrompt;
public Error: any;
}
export class GetDoseCalcDetailsCompletedEventArgs{
 public Result: CResMsgGetDoseCalcDetails;
public Error: any;
}
export class GetAllOptionsCompletedEventArgs{
 public Result: CResMsgGetAllOptions;
public Error: any;
}
export class GetIsItemAuthoriseCompletedEventArgs{
 public Result: CResMsgGetIsItemAuthorise;
public Error: any;
}
export class GetFormViewControlsCompletedEventArgs{
 public Result: CResMsgGetFormViewControls;
public Error: any;
}
export class GetProblemCompletedEventArgs{
 public Result: CResMsgGetProblem;
public Error: any;
}
export class GetDischargeDateCompletedEventArgs{
 public Result: CResMsgGetDischargeDate;
public Error: any;
}
export class GetDrugRouteCompletedEventArgs{
 public Result: CResMsgGetDrugRoute;
public Error: any;
}
export class GetStationaryItemByOIDCompletedEventArgs{
 public Result: CResMsgGetStationaryItemByOID;
public Error: any;
}
export class GetItemStatusCompletedEventArgs{
 public Result: CResMsgGetItemStatus;
public Error: any;
}
export class GetPrescriptionItemsCompletedEventArgs{
 public Result: CResMsgGetPrescriptionItems;
public Error: any;
}
export class NotifyFYICompletedEventArgs{
 public Result: CResMsgNotifyFYI;
public Error: any;
}
export class GetPrescDrugStationaryIDCompletedEventArgs{
 public Result: CResMsgGetPrescDrugStationaryID;
public Error: any;
}
export class GetFormularyHierarchyCompletedEventArgs{
 public Result: CResMsgGetFormularyHierarchy;
public Error: any;
}
export class GetHierarchyFormularyItemsCompletedEventArgs{
 public Result: CResMsgGetHierarchyFormularyItems;
public Error: any;
}
export class GetTechnicalDetailsCompletedEventArgs{
 public Result: CResMsgGetTechnicalDetails;
public Error: any;
}
export class GetDrugDetailsCompletedEventArgs{
 public Result: CResMsgGetDrugDetails;
public Error: any;
}
export class UpdatePrintStatusCompletedEventArgs{
 public Result: CResMsgUpdatePrintStatus;
public Error: any;
}
export class CheckAccessCompletedEventArgs{
 public Result: CResMsgCheckAccess;
public Error: any;
}
export class GetResultsViewCompletedEventArgs{
 public Result: CResMsgGetResultsView;
public Error: any;
}
export class GetRequestIdCompletedEventArgs{
 public Result: CResMsgGetRequestId;
public Error: any;
}
export class ChkResultAssociationCompletedEventArgs{
 public Result: CResMsgChkResultAssociation;
public Error: any;
}
export class GetPatientMedicationListCompletedEventArgs{
 public Result: CResMsgGetPatientMedicationList;
public Error: any;
}
export class GetPatientMedicationHistoryCompletedEventArgs{
 public Result: CResMsgGetPatientMedicationHistory;
public Error: any;
}
export class GetDeactivateAttributesCompletedEventArgs{
 public Result: CResMsgGetDeactivateAttributes;
public Error: any;
}
export class GetFormLorenzoIDCompletedEventArgs{
 public Result: CResMsgGetFormLorenzoID;
public Error: any;
}
export class GetItemStrengthInfoCompletedEventArgs{
 public Result: CResMsgGetItemStrengthInfo;
public Error: any;
}
export class GetDocTemplatesPolicyTypeCompletedEventArgs{
 public Result: CResMsgGetDocTemplatesPolicyType;
public Error: any;
}
export class GetPatientMedicationCountCompletedEventArgs{
 public Result: CResMsgGetPatientMedicationCount;
public Error: any;
}
export class GetMedClerkingSourceCompletedEventArgs{
 public Result: CResMsgGetMedClerkingSource;
public Error: any;
}
export class GetDrugBasicInfoCompletedEventArgs{
 public Result: CResMsgGetDrugBasicInfo;
public Error: any;
}
export class SubmitDrugsCompletedEventArgs{
 public Result: CResMsgSubmitDrugs;
public Error: any;
}
export class GetNonReconciledItemsCompletedEventArgs{
 public Result: CResMsgGetNonReconciledItems;
public Error: any;
}
export class VerifyDrugCompletedEventArgs{
 public Result: CResMsgVerifyDrug;
public Error: any;
}
export class AuthoriseDrugCompletedEventArgs{
 public Result: CResMsgAuthoriseDrug;
public Error: any;
}
export class GetProcessingOptionIndicationsCompletedEventArgs{
 public Result: CResMsgGetProcessingOptionIndications;
public Error: any;
}
export class SearchProcessingOptionsByIndicationsCompletedEventArgs{
 public Result: CResMsgSearchProcessingOptionsByIndications;
public Error: any;
}
export class GetCurrentMedicationCompletedEventArgs{
 public Result: CResMsgGetCurrentMedication;
public Error: any;
}
export class GetSearchDrugsCompletedEventArgs{
 public Result: CResMsgGetSearchDrugs;
public Error: any;
}
export class GetCompatibleComponentsCompletedEventArgs{
 public Result: CResMsgGetCompatibleComponents;
public Error: any;
}
export class GetResolveDefaultCompletedEventArgs{
 public Result: CResMsgGetResolveDefault;
public Error: any;
}
export class GetResolveDetailCompletedEventArgs{
 public Result: CResMsgGetResolveDetail;
public Error: any;
}
export class SubmitTechValidationDetailsCompletedEventArgs{
 public Result: CResMsgSubmitTechValidationDetails;
public Error: any;
}
export class GetDoseDetailsCompletedEventArgs{
 public Result: CResMsgGetDoseDetails;
public Error: any;
}
export class GetPrescriptionItemDoseInfoCompletedEventArgs{
 public Result: CResMsgGetPrescriptionItemDoseInfo;
public Error: any;
}
export class GetValidationsDetailsCompletedEventArgs{
 public Result: CResMsgGetValidationsDetails;
public Error: any;
}
export class GetAdditionalDetailsCompletedEventArgs{
 public Result: CResMsgGetAdditionalDetails;
public Error: any;
}
export class GetPrescriptionViewCompletedEventArgs{
 public Result: CResMsgGetPrescriptionView;
public Error: any;
}
export class GetDecisionSupportCompletedEventArgs{
 public Result: CResMsgGetDecisionSupport;
public Error: any;
}
export class GetReplacementDrugsCompletedEventArgs{
 public Result: CResMsgGetReplacementDrugs;
public Error: any;
}
export class GetAlternateOptionsCompletedEventArgs{
 public Result: CResMsgGetAlternateOptions;
public Error: any;
}
export class GetProductPackOptionsCompletedEventArgs{
 public Result: CResMsgGetProductPackOptions;
public Error: any;
}
export class GetRelatedOptionsCompletedEventArgs{
 public Result: CResMsgGetRelatedOptions;
public Error: any;
}
export class GetProductOptionsCompletedEventArgs{
 public Result: CResMsgGetProductOptions;
public Error: any;
}
export class GetProcessingOptionsCompletedEventArgs{
 public Result: CResMsgGetProcessingOptions;
public Error: any;
}
export class GetItemMongraphCompletedEventArgs{
 public Result: CResMsgGetItemMongraph;
public Error: any;
}
export class GetPrescriptionDetailsCompletedEventArgs{
 public Result: CResMsgGetPrescriptionDetails;
public Error: any;
}
export class GetMonographInformationCompletedEventArgs{
 public Result: CResMsgGetMonographInformation;
public Error: any;
}
export class CReqMsgGetDrugBasicInfo{
oContextInformation:CContextInformation;
OIDsBC:ObservableCollection<number>;
}
export class CResMsgGetDrugBasicInfo{
oContextInformation:CContextInformation;
ItemDetail:ObservableCollection<PrescriptionItemBasicData>;
}

export class DrugItemBasicData extends CLZOObject{
p:string;
q:string;
r:string;
s:string;
t:string;
y:string;
z:boolean;
aa:string;
bb:string;
cc:number;
dd:number;
ee:string;
ff:string;
mc:string;
ps:string;
fg:number;
IdentifyingOID:number;
IdentifyingType:string;
IdentifyingName:string;
PrescribableItemListOID:number;
MCVersionNo:string;
IsAccessContraint:string;
IsPrescribeByBrand:string;
FormularyNote:string;
ItemType:string;
RouteOID:number;
FormOID:number;
IsTechValidateCA:string;
LorenzoID:string;
NonCatItemReason:string;
TechQtyUomName:string;
IsControllDrug:string;
ITMSUBTYP:string;
SourceDataProviderType:string;
AliasName:string;
PrescriptionItemId:string;
ConflictUniqueId:string;
bIsReplacement:boolean;
sDosageForm:string;
sStrength:string;
DosageFormID:number;
MCOID:number;
MCPrepStatusCode:string;
MCItemName:string;
MCIItemDisplay:string;
PreparationStatus:string;
ItemSubType:string;
IsInfusion:string;
DisplaySequence:number;
ReorderedFromclerkItemOID:number;
MonPeriodMand:string;
IsIndicationRequired:string;
IndicationOverrideReson:string;
PrescribableItemDetailOID:number;
NonCatalogueOtherComments:string;
OrderSentenceDesc:string;
VMVPMCILorenzoID:string;
VMVPMCIdentifyingName:string;
FormularyOID:number;
PrescribingNote:string;
Guidance:string;
OrdersetOID:string;
IsExcludeGuidanceInSearch:string;
AmendedCurrDTTM:DateTime;
IsAmendedStopDTTMForAlternateDaysFreq:boolean;
NextSlotGenerateStartDTTM:DateTime;
PatientOID:number;
ComponentOidandType:string;
SupplyByAt:string;
LastSupplyDTTM:DateTime;
GPErrorCode:number;
IsTransformGPConRequired:number;
GPCProductFormOID:number;
ServiceOID:number;
LocationOID:number;
EncounterOID:number;
SupplyByAtMCIFluidParent:string;
LastSupplyDTTMMCIFluidParent:DateTime;
SupplyByAtFluidChild:string;
LastSupplyDTTMFluidChild:DateTime;
IsMCAuthorize:boolean;
Ordersetdescription:string;
MCIDEActiveItems:ObservableCollection<string>;
MCIVersionMatchItems:ObservableCollection<string>;
}
export class PrescriptionItemBasicData extends DrugItemBasicData{
SNOMEDCode:string;
IsSTATFrequency:boolean;
OID:number;
PrescriptionItemNumber:string;
IsAdministered:string;
StartDTTM:DateTime;
PartialStartDTTM:string;
EndDTTM:DateTime;
DoseStartDTTM:DateTime;
DoseEndDTTM:DateTime;
PrescriptionItemStatus:string;
StatusModifedDTTM:DateTime;
HealthOrganisation:ObjectInfo;
PrescriptionBasicData:Prescription;
IsControlledDrug:string;
IsLastSlotCheckRequired:boolean;
FirstSlotScheduleTime:DateTime;
CurrentDispenseStatus:string;
}
export class ObjectInfo extends CLZOObject{
OID:number;
Name:string;
Code:string;
RoleProfileOID:number;
OwnerOrganisationOID:number;
SourceDataProviderType:string;
}
export class PrescriptionItem extends PrescriptionItemBasicData{
PrescriptionNumber:string;
PrescriptionOID:number;
IsPGD:string;
PrescriberDetails:ObjectInfo;
CareProvider:ObjectInfo;
IsPRNDose:string;
Specialty:string;
IsDrugApprovalRequired:string;
UniqueID:number;
IsConflictsExists:string;
IsDoseCalcExist:string;
IsAmendment:string;
ReorderItemOID:number;
IsNonformulary:string;
ReplaceDrugActiveStatus:string;
DrugVersionMatch:string;
ReprintReason:string;
ClinicalNoteOID:string;
PPatientOID:number;
HIIsAckn:string;
HIWarngBhTyp:string;
EncounterType:string;
InfusionSeqOrder:number;
InfustionHeaderLvl:number;
ParentPrescriptionItemOID:number;
AutoNumber:number;
PrescriberRoleName:string;
TotalSeqCount:number;
IsInfusionitem:string;
IsBolus:string;
PrescribableItemListIdnOID:number;
IsReoderIconEnable:string;
Recordadmindatetime:DateTime;
PrevReorderItemOID:number;
PresItemDetailLzoID:string;
IsConditionalExists:boolean;
IssIDSNewMeds:string;
DisplayOrder:number;
OrdersetGroupID:string;
Supplycomments:string;
VMVPLorenzoID:string;
VMVPIdentifyingName:string;
DrugFreqUOMCode:string;
OrdersetLorenzoID:string;
DName:string;
reasonforModification:string;
isPRNDirection:string;
IsWardStockForChildMCI:boolean;
IsInclude72HrsCompletedORDisconItem:string;
IsGPConnectItem:boolean;
GPConnectMedication:GPConnectItem;
IsAutoSaveGPConnectForClerking:boolean;
IsAutoSaveGPCForClerkReorder:boolean;
IsVolumeBasedInfusion:string;
RoundOffCode:string;
RoundOffText:string;
InfusionGroupSequenceNo:number;
NextSupplyDTTM:DateTime;
AuthoriseRoleOID:string;
IsCriticalMed:boolean;
CriticalDrugMsg:string;
CriticalDrugSiteURL:string;
CriticalRoutes:string;
EncounterStatus:string;
IsAnyItemAdministeredInSeqGroup:number;
IsAmendCompletedStatus:boolean;
PrescriberOBHName:string;
PrescriberOBOUserOID:number;
DrugApproverRoleOID:ObservableCollection<number>;
DaysOfWeeks:ObservableCollection<string>;
}
export class GPConnectItem extends CLZOObject{
GPConnectID:string;
MedicationItemDetail:string;
DrugSnomedCode:string;
ItemType:string;
LastIssued:DateTime;
MedicationCode:string;
Dosage:ObservableCollection<GPConnectAdminDosage>;
}
export class GPConnectAdminDosage{
Text:string;
Instruction:string;
}
export class PrescriptionItemDetails extends PrescriptionItem{
BasicProperties:PresItemBasicProperties;
AdditionalProperties:PresItemAdditionalProperties;
DrugSpecificProperties:PresItemDrugProperties;
FormViewParameters:PrescriptionItemFormViewParameters;
APIProp:APIProperties;
LegalCat:LegalCategory;
AdminDetails:PrescriptionItemAdminDetails;
DoseCalculation:DoseCalculatorDetails;
ActionPerformedCode:string;
ActionPerformed:PrescriptionItemAction;
IsMandatoryFilled:boolean;
PrecriptionItem:string;
OtherInformation:string;
TrafficSymbol:string;
CurrentUniqueId:string;
isMultiRouteChecked:boolean;
TitratedDoseinfo:TitratedDoseinfo;
ClerkFormViewDefaultCode:string;
AuditChangeReasonCode:string;
OnlyDRCConflictsUpdate:boolean;
IsDRCReasonMandatory:boolean;
IsDRCAcklgdeMandatory:boolean;
OriginalDRCDoseTypeCode:string;
IsChangedDRCDoseTypeForAmend:boolean;
DRCBehaviourType:string;
IsAmendDRCDataLoaded:boolean;
IsAmendDRCRegenarated:boolean;
SequentialActionPerformCode:string;
IsSeqGroupHasDifferentStationaryType:boolean;
DoseFormulaDet:DoseFormula;
IsDoseCalcPerformedInAmend:boolean;
IsSequencePerformedInAmend:boolean;
MultiComponentDetails:ObservableCollection<IPPMCPresctiptionItem>;
TechValidateDetails:ObservableCollection<TechnicalValidationInfo>;
Warning:ObservableCollection<WarningDetails>;
DRCConflict:ObservableCollection<DRCConflict>;
AuditChanges:ObservableCollection<PresItemAuditHistory>;
}
export class PresItemCommonProperties extends CLZOObject{
ItemType:string;
ItemSubType:string;
TreatmentToCont:ObjectInfo;
AdminInstruction:ObjectInfo;
LegalCategory:ObjectInfo;
Route:ObjectInfo;
Form:ObjectInfo;
Statusflags:StatusFlags;
IsControlledDrug:string;
OtherDispensingInstruction:string;
OtherAdminInstruction:string;
IdentifyingDomain:string;
AdminIdentifyingDomain:string;
TechSupplyInstruction:string;
MultipleRouteType:byte;
IndicationOverrideReason:string;
TechSupplyInstrItemLevel:string;
IsSupplyReq:string;
LocOid:number;
ServOid:number;
IsWardStk:boolean;
RequisitionCACod:string;
EncOID:number;
IsMergePat:string;
IsAmendSupplyInstrClear:boolean;
PrescriptionItemTechOID:number;
IsSupplyInstChanged:boolean;
SupplyDTTM:DateTime;
FluidSupplyInst:string;
IsChildSupplyInstChanged:boolean;
DRCdoseTypeLorenzoID:ObjectInfo;
PresItemEncounter:ObjectInfo;
NextSupplyDTTM:DateTime;
FluidNextSupplyDTTM:DateTime;
isNextSupplyUpdate:boolean;
IsCriticalMed:boolean;
IsAuthorised:boolean;
FreqOID:number;
IsPrescribeInControlledDrug:boolean;
SupplyStatus:string;
DispensingInstruction:ObservableCollection<ObjectInfo>;
SupplyInstruction:ObservableCollection<ObjectInfo>;
SupplementItems:ObservableCollection<ObjectInfo>;
DrugProperties:ObservableCollection<DrugProperty>;
MultipleRoutes:ObservableCollection<ObjectInfo>;
}
export class PresItemBasicProperties extends PresItemCommonProperties{
defaultchk:string;
Direction:ObjectInfo;
Duration:MeasurableObject;
Site:ObjectInfo;
Quantity:Quantity;
Dose:PrescriptionItemDose;
FrequencyDetails:FrequencyDetails;
IsPresItemLevelDispense:string;
OrderSet:ObjectInfo;
IsPRNWithScheduled:boolean;
OrderSetSeqId:string;
ExistsOnAdmission:string;
LastAdministeredDTTM:DateTime;
IsAdministeredInAdvance:boolean;
IsClinicalEncounter:boolean;
PrescribingNote:string;
HasPermission:boolean;
TopMostAmendedPrescriptionItemOID:number;
SeqInfusionStatus:string;
CurrentDispenseStatus:string;
IsAlreadyClinicallyVerified:boolean;
IsAuthoriseText:string;
PatientProblem:ObservableCollection<Indication>;
}
export class MeasurableObject extends CLZOObject{
OID:number;
Value:number;
UOMOID:number;
UOMName:string;
RecordedDate:DateTime;
UOMCode:string;
}
export class Quantity extends CLZOObject{
QuantityValue:string;
QuantityUOMId:number;
QuantityUOMName:string;
}
export class PrescriptionItemDose extends CLZOObject{
DoseType:ObjectInfo;
ObservationResult:ObjectInfo;
PresItemEncounter:ObjectInfo;
IsClinicalEncounterPresItem:boolean;
DoseRegime:ObservableCollection<DoseRegime>;
}
export class DoseRegime extends CLZOObject{
LowerDose:number;
UpperDose:number;
DoseUOM:UOM;
Duration:MeasurableObject;
Quantity:MeasurableObject;
Direction:ObjectInfo;
PrescibableItemOID:number;
StartDTTM:DateTime;
EndDTTM:DateTime;
LowerObservationRange:number;
UpperObservationRange:number;
ObservationRangeUOM:UOM;
DosingInstruction:string;
FrequencyDetails:FrequencyDetails;
DurationUOMCode:string;
PrescribableItemDoseOID:number;
TitratedDoseInstructions:string;
TitratedDoseAdtnlComments:string;
TitratedDoseInstruction:ObjectInfo;
IsHavingAdminTime:string;
IsStartFromNextDay:boolean;
vDosageScheduleTimes:ObservableCollection<number>;
InfusionDetails:ObservableCollection<DoseRegimeInfusionDetail>;
AdministeredTimeAndDoseDetails:ObservableCollection<AdministeredTimeDoseDetail>;
}
export class UOM extends CLZOObject{
UOMId:number;
UOMName:string;
SourceDataProviderType:string;
UOMCode:string;
MCIPrescribableItemListOID:number;
UOMTypeCode:string;
OwnerOrganisationID:number;
}
export class FrequencyDetails extends CLZOObject{
Frequency:ObjectInfo;
IsFixedAdministration:string;
StatIndicator:string;
StatDose:MeasurableObject;
FrequencyUOM:string;
FreqCode:string;
FreqLowEvent:number;
FreqLowPeriod:number;
PRNScheduledDet:string;
ScheduledTimes:ObservableCollection<Scheduledetails>;
DaysOfWeeks:ObservableCollection<string>;
}
export class Scheduledetails extends CLZOObject{
ItemFrequencyOID:number;
ScheduledTimeInMins:number;
ScheduledTime:string;
MappedDrugRoundTimeInMins:number;
MappedDrugRoundTime:string;
ScheduleTime:number;
EncounterOID:number;
MCVersion:string;
}
export class DoseRegimeInfusionDetail extends CLZOObject{
OID:number;
PrescriptionItemDosageOID:number;
InfusionRate:string;
RateNumerator:UOM;
RateDenominator:UOM;
Duration:MeasurableObject;
VariableDoseInstruction:string;
IsAlertShown:boolean;
UpperInfusionRate:string;
}
export class AdministeredTimeDoseDetail extends CLZOObject{
PresItemDosageOID:number;
Dose:string;
DoseUOM:UOM;
ScheduledTimeInMins:number;
}
export class Indication extends CLZOObject{
CodingschemeCode:string;
Version:string;
Code:string;
Term:string;
TermKey:string;
Type:string;
DataProviderType:string;
OwnerOrganisationOID:number;
}
export class PatientProblem extends Indication{
ProblemName:string;
ProblemOID:number;
}
export class StatusFlags{
HasWarnings:string;
IsHold:string;
PrintStatus:string;
HasDoseCalculation:string;
IsTechValidate:string;
}
export class DrugProperty{
DrugPropertyCode:string;
VMChildCode:string;
DrugName:string;
HighRiskMsg:string;
IdentifyingOID:number;
IdentifyingType:string;
OccuranceCode:string;
CompPrescribableItemListOID:number;
DrugPropertyToolTip:string;
PrescriptionMCidentifyingtype:string;
Prescriptionitemoid:number;
Prescriptionmulticomponentoid:number;
UniqueMCRowID:number;
PrescribingNote:string;
}
export class PresItemBasicPropertiesView extends PresItemCommonProperties{
cn:boolean;
Dose:string;
DoseType:string;
Frequency:string;
StartDate:DateTime;
Duration:string;
EndDate:DateTime;
Direction:string;
Site:string;
Quantity:string;
PrescriptionItem:ObjectInfo;
DrugStatus:string;
UniqueRowID:string;
IsCurrentMedication:string;
MedClrkSource:string;
IsDeactivated:string;
QuantityUOMName:string;
QuantityUOMOID:number;
QuantityUOMLzoID:string;
IsPresItemLevelDispense:string;
DispenseInstructionCode:string;
SupplyInstructionCode:string;
PrepStatusCode:string;
MCIItemDisplay:string;
IsSupplyRequested:string;
IsWardStock:boolean;
RequisitionCACode:string;
FormViewParameters:PrescriptionItemFormViewParameters;
OrderSet:ObjectInfo;
PRNInstructionValue:string;
RequestUrgency:string;
RequestUrgencyOrder:number;
RequestedDTTM:DateTime;
RequestedComments:string;
RequestedBy:string;
SteppedDoseAdminTimes:string;
IsinDefiniteOmit:boolean;
IsinDefiniteOmitDTTM:DateTime;
OmitComments:string;
OmittedBy:string;
IsAllowed:boolean;
ExistsOnAdmission:string;
PrescribingNote:string;
FluidPrescribableItemListOID:number;
Supplyby:string;
PrescriptionMulticomponentOID:number;
PrescriptionItemDosageOID:number;
ProblemTerm:string;
DiscontinuedBy:string;
DiscontinuedReason:string;
DateCommenceDTTM:DateTime;
IsPGD:boolean;
ProblemTerm1:string;
SiteCode:string;
StrengthText:string;
oPresItemPropAPI:PrescriptionItemPropertiesAPI;
DoseTypeValue:string;
IsWardStockFluid:boolean;
isDoseCalcExist:boolean;
DCCalDTTM:DateTime;
DCHeightRecordedDTTM:DateTime;
DCWeightRecordedDTTM:DateTime;
DurationInfo:MeasurableObject;
Problem:ObservableCollection<string>;
}
export class PrescriptionItemFormViewParameters extends CLZOObject{
LineIndicator:string;
AdminDevice:string;
AdministeredByCode:string;
IntravenousInfusionData:IntravenousInfusionDetails;
AdminDeviceData:AdminDeviceDetails;
INFTYCODE:string;
ReviewAfterDTTM:DateTime;
ReviewAfter:string;
ReviewAfterUOM:ObjectInfo;
IsReviewafterReq:boolean;
IsReviewAlert:boolean;
ReviewComments:string;
IsReviewExists:boolean;
ReviewRequestedBy:string;
ReviewType:string;
IsReviewAvailableBeforeSequence:boolean;
LastReviewedDTTM:DateTime;
SequenceData:SequenceDetails;
}
export class IntravenousInfusionDetails extends CLZOObject{
Fluid:ObjectInfo;
Volume:string;
VolumeUOM:UOM;
InfusionPeriod:string;
InfusionPeriodUOM:UOM;
Rate:string;
RateUOM:UOM;
RateDenominatorUOM:UOM;
Humidification:string;
PreviousRate:string;
PreviousRateDrUOMName:string;
PreviousRateUOMName:string;
DeliveryDevice:string;
Lumen:string;
InfusionSeqOrder:number;
IsOnGoing:string;
ReviewAfter:DateTime;
MaxDose:string;
Concentration:number;
TargetSaturationUpper:number;
TargetSaturationLower:number;
IsOxygen:string;
IsSequentialPrescribing:boolean;
FirstPrescItemOIDInSeq:number;
ParentPrescriptionItemOID:number;
UparentPresitemOIDSeq:number;
InfusionSeqCount:number;
IsAlertShown:boolean;
IsBolusInfusion:string;
IsReviewAlert:boolean;
IsInfusionInprogress:boolean;
IsInfusionStartDTTMReached:boolean;
IsInfusionRoute:string;
IsInfAmendStartDTTMBlank:boolean;
IsEstimatedStopRecalculationRequired:boolean;
HUMIDCode:string;
LowConcentration:string;
LowConcentrationUOMOID:UOM;
UpperConcentration:string;
UpperConcentrationUOMOID:UOM;
UpperRate:string;
PreviousUpperRate:string;
PreviousLowConcentration:string;
PreviousLowConcentrationUOM:UOM;
PreviousUpperConcentration:string;
PreviousUpperConcentrationUOM:UOM;
IsAlertShownValue:string;
IsInfusion:boolean;
IsVolumeBasedInfusion:string;
RoundOffCode:string;
RoundOffText:string;
FluidIdentifyingType:string;
FluidIdentifyingOID:number;
FluidLorenzoID:string;
IsFirstItem:boolean;
InfusionGroupSequenceNo:number;
IsLastItem:boolean;
SequenceParentPrescItemOID:number;
SeqInfOrderForPervImmediateItm:number;
IsFluidAuthorise:boolean;
InfScheduleDTTMs:ObservableCollection<DateTime>;
SequentialPrescriptionItemOIDs:ObservableCollection<number>;
}
export class AdminDeviceDetails extends CLZOObject{
BackgroundRate:string;
BackgroundRateUOM:UOM;
BackgroundRateDenaminatorUOMOID:number;
TopUpDose:string;
TopUpDoseUOM:UOM;
LockOutPeriod:number;
LockOutPeriodUOM:UOM;
BackgroundRateDenaminatorUOM:UOM;
MonitorPeriod:string;
MonitorPeriodUOM:UOM;
MonitoringPeriodAlertDTTM:DateTime;
BoosterDose:string;
BoosterDoseUOM:UOM;
}
export class SequenceDetails extends CLZOObject{
SequenceOrder:number;
IsSequentialPrescribing:boolean;
FirstPrescItemOIDInSeq:number;
ParentPrescriptionItemOID:number;
IsSeqInprogress:boolean;
GroupSequenceNo:number;
IsFirstItem:boolean;
IsLastItem:boolean;
SequenceParentPrescItemOID:number;
UparentPresitemOIDSeq:number;
}
export class PrescriptionItemPropertiesAPI extends CLZOObject{
DrugNameLzoID:string;
DrugNameOID:number;
DrugFormOID:number;
DrugFormLzoID:string;
IsMedicationCritical:string;
IsDoseCalculatedByDC:string;
PatientObservationsLastDateTime:DateTime;
oDoseCalc:DoseCalc;
}
export class DoseCalc{
PatientHeight:string;
PatientWeight:string;
BSAFormula:string;
BSAValue:string;
UpdatePatientRecord:string;
IsDailyDose:string;
RequestDose:string;
RequestDoseUOMOID:number;
RequestDoseUOMName:string;
RequestDosePer:string;
CalculatedDose:string;
OrderedPerDose:string;
RoundedTo:string;
OrderedPerDay:string;
OverrideReason:string;
ISAlwaysuseDosecalc:string;
USSGestationDays:string;
WeightUOM:string;
DoseCalcBasedOn:string;
RequestDoseSecondUOM:string;
RequestDoseThirdUOMLzoID:string;
FrequencyOID:number;
WeightOption:string;
BSAUOM:number;
TotalDailyDose:string;
SelectProductLorenzoID:string;
RoundingFactor:string;
DoseCapApplied:boolean;
DoseCapAppliedDose:string;
HeightUOM:string;
RoundedDose:string;
FormCode:string;
HeightValue:string;
HeightRecordedDTTM:DateTime;
WeightValue:string;
WeightRecordedDTTM:DateTime;
IsEstimatedHeight:string;
IsEstimatedWeight:string;
IdealBodyWeight:string;
AdjustedBodyWeight:string;
BSAFRCode:string;
RequestedDose:string;
RequestedDoseUOMName:string;
ReqDoseUOMSecondCompLzoID:string;
ReqDoseUOMThirdCompLzoID:string;
DOSFRCode:string;
REQPDCode:string;
FrequencyName:string;
CalculatedAmount:string;
OrderedAmountPerDose:string;
OrderedAmountPerDay:string;
OverRideReason:string;
LowEvent:string;
WTOPTCode:string;
DrugFrequencyOID:number;
}
export class PresItemAdditionalProperties extends CLZOObject{
NoOfInstallments:number;
IntervalBtwnInstallment:MeasurableObject;
MedClerkModifyReason:ObjectInfo;
StationeryType:ObjectInfo;
AdditionalComments:string;
BatchNumber:string;
ExpiryDate:DateTime;
NonFormularyReason:string;
NonCatalogueReason:string;
StatusModifedDTTM:DateTime;
AdminMethod:ObjectInfo;
DrugAttributes:string;
PharmacyNotingComments:string;
HoldReason:string;
ReasonOfStopping:string;
DateCommenced:string;
NonCatalogueOtherReason:string;
ReconcileComments:string;
PreparationStatus:string;
SupplyInsChildExists:string;
NonFormComponentItems:string;
NonFormComponents:string;
NonFormCompReason:string;
PrescriberIdentifier:string;
PrescriberBleep:string;
PrescriberTelephone:string;
PrescriberPager:string;
ManageReviewDetail:ManageReviewPeriod;
ReasonforReconcile:string;
GroupHeaderName:string;
OtherComments:string;
AdminMethodCode:string;
InstalmentInstructions:ObservableCollection<ObjectInfo>;
EndorsementProperties:ObservableCollection<ObjectInfo>;
MedClerkSource:ObservableCollection<ObjectInfo>;
ReviewAfterDetails:ObservableCollection<ReviewAfterDetail>;
}
export class ReviewAfterDetail extends CLZOObject{
PrescriptionItemOID:number;
Reviewer:string;
ReviewedDTTM:DateTime;
ReviewRequestedBy:string;
ReviewRequestedDTTM:DateTime;
ReviewAfter:string;
ReviewAfterUOM:ObjectInfo;
ReviewPeriod:string;
ReviewDueDTTM:DateTime;
ReviewType:ObjectInfo;
ReviewOutcome:ObjectInfo;
ReviewOutcomeComments:string;
ReviewRequestComments:string;
ReinstateReason:string;
IsCurrent:string;
DiscontinueReason:string;
}
export class ManageReviewPeriod extends CLZOObject{
PrescriptionItemOID:number;
NewReviewAfterDTTM:DateTime;
NewReviewAfter:string;
NewReviewAfterUOM:ObjectInfo;
NewReviewType:ObjectInfo;
NewReviewRequestComments:string;
EncounterOID:number;
oReviewAfterDetail:ReviewAfterDetail;
}
export class PresItemDrugProperties extends CLZOObject{
CanDoseBeChanged:string;
MandatoryCode:string;
ContraIndicationOID:number;
HasProhibitedRoute:string;
Strength:MeasurableObject;
IsParacetamolIngredient:boolean;
}
export class IPPMCPresctiptionItem extends CLZOObject{
PrescriptionItemOID:number;
IdentifyingOID:number;
IdentifyingType:string;
ComponentName:string;
Quantity:string;
QuantityUOM:string;
QuantityUOMOID:number;
IsUpto:boolean;
LorenzoID:string;
IsNonFormulary:boolean;
DisplayOrder:number;
isEditable:boolean;
isQtyEditable:boolean;
isQtyUOMEditable:boolean;
IsDisableConflicts:boolean;
PrescribableItemListOID:number;
UniqueMCRowID:number;
ConflictsExist:string;
OID:number;
ActionCode:string;
QuantityUOMs:ObjectInfo;
Nonformularyreason:string;
OtherNonformularyreason:string;
QuantityUomcol:string;
DisplacementVolume:string;
DisplacementVolumeUOM:string;
DisplacementVolumeUOMOID:number;
BatchNumber:string;
ExpiryDttm:DateTime;
IsInfusionFluid:boolean;
CompIdentifyingOID:number;
CompIdentifyingType:string;
MedDrugPreparationdetailOID:number;
QuantityUOMLZID:string;
AdminMethod:string;
MCVersion:string;
IdentifyingName:string;
PresItemLorenzoID:string;
MCDoseUOMDeActivated:string;
DispenseInstructionCode:string;
SupplyInstructionCode:string;
OtherDispensingInstruction:string;
PrepStatusCode:string;
IsWardStock:boolean;
IsSupplyRequested:string;
RequisitionCACode:string;
IsControlledDrug:string;
DrugProperties:string;
VMVPLorenzoID:string;
VMVPMCIdentifyingName:string;
SupplyComments:string;
LastSupplyNameMCIChild:string;
LastSupplyDTTMMCIChild:DateTime;
NextSupplyDTTM:DateTime;
IsMCAuthorize:boolean;
MCQuantity:ObservableCollection<Quantity>;
oDrugPrepHistoryData:ObservableCollection<DrugPrepHistoryData>;
SupplyInstruction:ObservableCollection<ObjectInfo>;
DispensingInstruction:ObservableCollection<ObjectInfo>;
TechValidateDetails:ObservableCollection<TechnicalValidationInfo>;
}
export class DrugPrepHistoryData extends CLZOObject{
AttributeName:string;
FromValue:string;
ToValue:string;
Modifiedby:string;
Modifieddttm:DateTime;
ComponentName:string;
}
export class TechnicalValidationInfo extends CLZOObject{
PrescriptionOID:number;
PrescriptionItemOID:number;
ValidatedDTTM:DateTime;
ValidatedBy:ObjectInfo;
ValidatorRoleName:string;
IsTechnicalvalidate:string;
Technicalvalidateupdate:boolean;
EncounterOID:number;
IsMergePatient:string;
OtherDispensingInstruction:string;
PrepStatusCode:string;
IsWardStock:boolean;
IsSupplyRequested:string;
RequisitionCACode:string;
LorenzoID:string;
ServiceOID:number;
LocationOID:number;
UsersOID:number;
RoleOID:number;
PresMutliCompOid:number;
UniqueMCRowID:number;
MedsupplydetailOID:number;
SupplyComments:string;
SupplyStatus:string;
FluidPrescribableItemListOID:number;
IsChildEdited:byte;
IsSuppInstrInvokedFromEPR:boolean;
NextSupplyDTTM:DateTime;
IsAlreadyClinicallyVerified:boolean;
IncludeFluid:boolean;
IgnoreIfRequestExists:boolean;
Tag:PITag;
PrescriptionItemStatus:string;
IgnoreMainItem:boolean;
IsAdditionalFluid:boolean;
TechValidatedItems:ObservableCollection<TechValidatedItem>;
SupplyInstruction:ObservableCollection<ObjectInfo>;
DispensingInstruction:ObservableCollection<ObjectInfo>;
}
export class TechValidatedItem extends CLZOObject{
DrugItem:DrugItemBasicData;
QuantityPerDose:string;
QuantityPerDoseUOM:ObjectInfo;
TotalQuantity:string;
TotalQuantityUOM:ObjectInfo;
ClinicalVerifyComments:string;
PrescriptionItemTechOID:number=0;
IsTechnicalvalidate:string;
IdentifyingDomain:string;
MedSupplyOID:number;
OtherDispensingInstruction:string;
IsDoseCombinationsDefined:string;
IsSupplyRequested:string;
LocationOid:number;
ServiceOid:number;
SupplyComments:string;
FluidPrescribableItemListOID:number;
LastReqUrgency:string;
LastReqComments:string;
LastRequestedBy:string;
LastRequestedDateTime:DateTime;
ReqIconShow:boolean;
PrescriptionMultiComponentOID:number;
PIDRequestIdentifyingOID:number;
PIDRequestIdentifyingType:string;
IsWardStock:boolean;
NextSupplyDttm:DateTime;
DispenseOID:number;
isNextSupplyUpdate:boolean;
SupplyStatus:string;
SupplyInstruction:ObservableCollection<ObjectInfo>;
DispensingInstruction:ObservableCollection<ObjectInfo>;
DispenseStatus:ObservableCollection<PresItemRequestDetails>;
}
export class PresItemRequestDetails extends CLZOObject{
Status:string;
ResponseDTTM:DateTime;
Name:string;
Reason:string;
Locationname:string;
DispensedDrugName:string;
Servicename:string;
}
export class PITag{
ItemSubType:string;
ContainsFluid:boolean;
DrugFormOid:number;
StrengthText:string;
Routes:string;
IsAdministration:boolean;
MCVersionNo:string;
}
export class APIProperties{
IngredientCollection:ObservableCollection<IngCollection>;
IndicationCollection:ObservableCollection<IndCollection>;
QuantityUOM:ObservableCollection<QuantityUOM>;
}
export class IngCollection{
BaseIngredientName:string;
BaseIngredientOID:number;
IdentifyingType:string;
IdentifyingOID:number;
}
export class IndCollection{
PrescribableItemDetailOID:number;
IndicationName:string;
IndicationCode:string;
}
export class QuantityUOM extends CLZOObject{
OID:number;
QuantityUOMName:string;
IdentifyingOID:number;
}
export class LegalCategory extends CLZOObject{
LCId:number;
LegalCategoryName:string;
}
export class PrescriptionItemAdminDetails extends CLZOObject{
gn:boolean;
OID:number;
BatchNumber:string;
ExpiryDate:DateTime;
WitnessedBy:ObjectInfo;
AdministredDate:DateTime;
Comments:string;
DoseAdministered:string;
DoseAdministeredUOM:UOM;
AdministeredBy:ObjectInfo;
AdminInstruction:string;
RouteOID:number;
IsPCA:string;
Site:ObjectInfo;
IsNoWitnessAvailable:boolean;
SlotScheduleDate:DateTime;
BagSequence:number;
DeliveryDevice:string;
InfusionRate:string;
InfusionRateUOM:ObjectInfo;
InfusionRatePerUOM:ObjectInfo;
DripRate:string;
DripRateUOM:ObjectInfo;
DripRatePerUOM:ObjectInfo;
BagVolume:string;
BagVolumeUOM:ObjectInfo;
Lumen:string;
InfusionEndDate:DateTime;
AdminEndTime:DateTime;
MedicationAction:string;
InfuationType:string;
InfusionPeriod:string;
InfusionPeriodUOM:ObjectInfo;
isInfusionBolusIntermittent:boolean;
HumidCode:string;
ConcentrationStrength:string;
ConcentrationStrengthUOM:ObjectInfo;
ConcentrationVolume:string;
ConcentrationVolumeUOM:ObjectInfo;
InfusionPeriodforMedAdmin:number;
InfusionPeriodUOMforMedAdmin:ObjectInfo;
InfusionDose:string;
InfusionDoseUOMNumerator:ObjectInfo;
InfusionDoseUOMDenominator:ObjectInfo;
IsDuringHomeLeave:boolean;
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
export class DoseCalculatorDetails extends CLZOObject{
PatientHeight:string;
PatientWeight:string;
BSAFormula:string;
BSAValue:string;
UpdatePatientRecord:string;
IsDailyDose:string;
RequestDose:string;
RequestDoseUOMOID:number;
RequestDoseUOMName:string;
RequestDosePer:string;
CalculatedDose:string;
OrderedPerDose:string;
RoundedTo:string;
OrderedPerDay:string;
OverrideReason:string;
ISAlwaysuseDosecalc:string;
USSGestationDays:string;
WeightUOM:string;
DoseCalcBasedOn:string;
RequestDoseSecondUOM:string;
RequestDoseThirdUOMLzoID:string;
FrequencyOID:number;
WeightOption:string;
BSAUOM:number;
TotalDailyDose:string;
SelectProductLorenzoID:string;
RoundingFactor:string;
DoseCapApplied:boolean;
DoseCapAppliedDose:string;
HeightUOM:string;
RoundedDose:string;
FormCode:string;
IBWWeight:string;
ABWWeight:string;
RecordedHightDTTM:DateTime;
RecordedWeightDTTM:DateTime;
IsWeightEstimated:boolean;
IsHeightEstimated:boolean;
CalculatedDTTM:DateTime;
IsEstimatedHeight:string;
IsEstimatedWeight:string;
ReqDoseUOMThirdCompLzoID:string;
DOSFRCode:string;
FrequencyName:string;
ReqDoseUOMSecondCompLzoID:string;
LowEvent:string;
HTUOMCode:string;
WTUOMCode:string;
}
export class PrescriptionItemAction extends CLZOObject{
IsActionPerformed:string;
PerformedDTTM:DateTime;
PerformedBy:ObjectInfo;
ReasonForModification:string;
Comments:string;
ActionCode:string;
VerifyOnBehalf:OnBehalfInfo;
IPReconcileReason:string;
ModifiedItemOID:number;
HoldReason:string;
OnlyUpdatedColumn:string;
UpdateItemStatus:string;
CancelDefaultAllergen:string;
DirectDiscontinueReason:string;
ModificationComments:string;
AmendOfItemNo:string;
ReconcileComments:string;
IPReconcileComments:string;
ClinicallySupplyInstruction:string;
IsClinicalVerHisLink:boolean;
CVStatusCode:string;
}
export class OnBehalfInfo extends CLZOObject{
NotifyFlag:string;
OnBehalfOfUser:ObjectInfo;
OnBehalfOfUserReason:string;
CommunicationMode:string;
}
export class DRCConflict{
OID:number;
PatientOID:number;
PrescriptionItemOID:number;
DRCDefDoseTypeLorenzoID:string;
DRCDefDoseTypeCode:string;
DRCMessage:string;
IsDRCPassed:string;
Status:string;
OwnerOrganisationOID:number;
PartKey:number;
PatientWeight:string;
PatientBSA:string;
IsDRCChecked:boolean;
ConflictDetails:ObservableCollection<DRCConflictDetails>;
}
export class DRCConflictDetails{
OID:number;
PresItemDRCConflictOID:number;
ErrorCode:string;
ErrorMessage:string;
AcknowledgeReason:string;
IsChecked:string;
Status:string;
OwnerOrganisationOID:number;
Comments:string;
BehaviourType:string;
PartKey:number;
}
export class TitratedDoseinfo extends CLZOObject{
IsHavingAdminTime:string;
ScheduleDoseUOM:string;
TitratedAdminInstruction:string;
TitratedComments:string;
TitrateScheduledinfo:ObservableCollection<TitrateScheduledinfo>;
}
export class TitrateScheduledinfo extends CLZOObject{
ScheduleDTTM:DateTime;
TitratedDose:string;
TitratedDoseUOM:string;
}
export class PresItemAuditHistory{
HistoryOid:number;
FieldName:string;
NewValue:string;
OldValue:string;
}
export class DoseFormula extends CLZOObject{
BSAFormula:string;
DoseCalcBasedOn:string;
CalculationFor:string;
RequestedDose:string;
RequestedUOM:UOM;
RequestDosePerUOM:string;
RoundOffDose:string;
IsDoseCalcAlwaysUse:string;
RequestedUOMOID:number;
RequestedUOMName:string;
MCVersion:string;
IsCopyFav:string;
RequestDosePer2UOMLzoID:string;
RequestDosePer2UOMName:string;
DefaultWeightType:string;
MinDoseCap:string;
MaxDoseCap:string;
DoseCapUOMLzoID:string;
DoseCapUOMName:string;
ProductLzoID:string;
ProductName:string;
DosageFormType:string;
DoseCalcFrequencyOID:number;
DoseCalcFrequencyName:string;
ThirdCmpLrnzOId:string;
Freqdetail:ObjectInfo;
}
export class DrugItemBasicInfo extends DrugItemBasicData{
FormularyNotes:string;
APIProp:APIProperties;
RequestedDose:string;
Comments:string;
PackSize:string;
IsFormulary:string;
MultiComponentItems:string;
CompPrepStatusCode:string;
MCUOMS:string;
AdminMethod:string;
IsInfusionFluid:string;
IsAllowMultipleRoute:string;
IsIgnoreEPresRuleAdminMethod:boolean;
IsWardStock:boolean;
IsAuthorise:boolean;
DrugMedicationCode:string;
DrugActiveStatus:string;
DrugProperties:ObservableCollection<DrugProperty>;
DoseRegime:ObservableCollection<DoseRegime>;
MCChildItems:ObservableCollection<IPPMCPresctiptionItem>;
Routes:ObservableCollection<Route>;
}
export class Route extends CLZOObject{
RouteId:number;
RouteName:string;
Status:string;
MCVersionNumber:string;
bInfusion:string;
IsProhibited:boolean;
DataProvider:string;
PageIndex:number;
IsStrengthReqd:string;
IsCustomized:boolean;
OwnerOrganisationID:number;
Code:string;
LorenzoID:string;
RouteText:string;
nPageNo:number;
nPageSize:number;
nMAXRows:number;
nLorenzoID:string;
sRouteText:string;
}
export class DrugItemInputData extends DrugItemBasicData{
PageIndex:number;
FavouritesDetailOID:number;
IsFormulary:boolean;
Options:EnumDrugOptions;
nPageNo:number;
nPageSize:number;
nMAXRows:number;
PrepStatusCode:string;
TeamOIDs:string;
MCIDeactItems:string;
IsFetchFormularyAndNonFormulary:boolean;
MatchIdentifyingTypes:ObservableCollection<string>;
IsAuthorise:boolean=false;
}
export enum EnumDrugOptions{
ALTERNATE_OPTIONS,
PRESCRIBING_OPTIONS,
RELATED_OPTIONS,
ALL,
}
export class AvailabilityStatus extends CLZOObject{
Code:string;
Status:string;
Count:number;
}
export class PrescriptionBasicData extends CLZOObject{
OID:number;
PrescriptionNumber:string;
PrescriptionType:string;
PrescriptionDTTM:DateTime;
PatientOID:number;
EncounterOID:number;
Specialty:ObjectInfo;
EncounterID:string;
PrescriberDetails:ObjectInfo;
PrescriberRole:ObjectInfo;
CareProvider:ObjectInfo;
PrescriptionStatus:string;
IsMergedPatient:string;
IsCriticalMedication:string;
}
export class Prescription extends PrescriptionBasicData{
PrintStatus:string;
StaioneryType:ObjectInfo;
ClerkingSource:string;
ServicePoint:ObjectInfo;
Location:ObjectInfo;
IsPGD:string;
HealthOrganisation:ObjectInfo;
MCVersionNo:string;
TeamOID:number;
IsIntray:string;
ChoosePrinter:string;
SupplyPrepStatus:string;
IsMedAlertShown:string;
SupplyRequestdatetime:DateTime;
RequestUrgency:string;
CompletedStatus:string;
PGDLorenzoID:string;
TeamMembersOID:ObservableCollection<number>;
PrescriptionAvailabilityStatus:ObservableCollection<AvailabilityStatus>;
PrescriptionItems:ObservableCollection<PrescriptionItemDetails>;
}
export class PrescriptionDetails extends Prescription{
PatientData:PatientDetail;
EncounterDetails:EncounterDetails;
IsTechnicallyValidated:string;
TechnicallyValidatedUser:ObjectInfo;
PresStationeryTypeOID:number;
Row:number;
GroupByDetails:ObservableCollection<GroupResult>;
}
export class PatientDetail extends CLZOObject{
OID:number;
Name:string;
PatientID:string;
ExpectedDischargeDTTM:DateTime;
LeaveRequestDTTM:DateTime;
DEPARTDTTM:DateTime;
}
export class EncounterDetails extends CLZOObject{
OID:number;
EncounterID:string;
EncounterType:string;
StartDTTM:DateTime;
EndDTTM:DateTime;
}
export class GroupResult{
GroupValue:string;
Count:number;
DisplayValue:string;
}
export class Medication extends CLZOObject{
PatientPrescription:Prescription;
PrintDispensingInstruction:string;
PrintDispensingcomments:string;
IsPresLvlDispense:string;
IsAutoSaveGPCForClerkMed:boolean;
EncounterType:string;
CACode:string;
IgnoreIfRequestExists:boolean;
PresItemPatientAddnDetail:PresItemPatientAddnDetail;
CancelledDrugs:ObservableCollection<DeletedItemsInfo>;
BackedOutDrugs:ObservableCollection<PrescriptionItemInputData>;
ReconciledDrugs:ObservableCollection<ReconciledItems>;
TechnicalValidation:ObservableCollection<TechnicalValidationInfo>;
}
export class DeletedItemsInfo extends CLZOObject{
PrescriptionItemData:PrescriptionItemInputData;
DeletedInfo:PrescriptionItemAction;
IsPatMerged:string;
}
export class PrescriptionItemInputData extends CLZOObject{
OID:number;
PatientOID:number;
ExpirationDuration:number;
PrescriptionType:string;
PrescriptionItemStatus:string;
PrescriptionOID:number;
EncounterOID:number;
MCVesrionNo:string;
ActiveMCVersion:string;
PrescriptionNumber:string;
Activity:string;
InfusionSeqOrder:number;
ParentPrescriptionItemOID:number;
DiscontinouscancelSequential:boolean;
CACode:string;
ClerkformViewerDefltCode:string;
ReviewOutcomeComments:string;
IsPresItemStatusComplete:string;
OrganizationOID:number;
InfusionGroupSequenceNo:number;
IsInfusionInProgress:boolean;
PatientAllergyOID:ObservableCollection<string>;
}
export class ReconciledItems extends CLZOObject{
PrescriptionItemOID:number;
ReconciledStatus:PrescriptionItemAction;
EncounterOID:number;
PrescriptionOID:number;
IsMerged:string;
MCVersionNo:string;
prescriptiontype:string;
}
export class PresItemPatientAddnDetail extends CLZOObject{
PatientOID:number;
EncounterOID:number;
RecordedByUserOID:number;
RecordedDTTM:DateTime;
ACTONCode:string;
CareActivityCode:string;
PrescriptionItemOIDs:string;
}
export class PrescriptionResponse extends CLZOObject{
PrescriptionOID:number;
StationeryType:ObjectInfo;
Chooseprinter:string;
TemplateStatus:string;
PatientOID:string;
EncounterOID:string;
ClinicalNoteOID:string;
PPatientOID:string;
PresItemResponse:ObservableCollection<PrescriptionItemResponse>;
}
export class PrescriptionItemResponse extends CLZOObject{
PrescriptionItemOID:number;
IsControlledDrug:string;
PrescriptionItemName:string;
OID:number;
Status:string;
}
export class PrescriptionItemCriteria extends CLZOObject{
PatientOID:number;
EncounterOID:number;
Code:string;
OID:ObservableCollection<number>;
NotRConciled:ObservableCollection<number>;
}
export class PrescriptionItemView extends CLZOObject{
PrescriptionItemOID:number;
FluidMedReq:FluidMedRequestDetail;
oPrescriptionItem:PrescriptionItem;
oPresItemBasicPropertiesView:PresItemBasicPropertiesView;
oPresItemAdditionalProperties:PresItemAdditionalProperties;
oPrescriptionItemAction:PrescriptionItemAction;
oPrescriptionItemAddnView:PrescriptionItemAddnView;
FrequencyDetails:IPPFrequency;
AutoNumber:number;
IsHeader:boolean;
IsFooter:boolean;
GroupHeaderName:string;
InfustionHeaderLvl:number;
IsFirstHeader:boolean;
SupplyExistsForMCIComp:boolean;
InfusionGroupSequenceNumber:string;
oTechValidateDetails:ObservableCollection<TechValidatedItem>;
IPPMCPresctiptionItem:ObservableCollection<IPPMCPresctiptionItem>;
}
export class FluidMedRequestDetail extends CLZOObject{
EncounterOID:number;
LastRequestedBy:string;
LastRequestedDateTime:DateTime;
LastTechValBy:string;
LastTechValDateTime:DateTime;
PrescriptionItemOID:number;
SupplyComments:string;
SupplyInstructions:string;
SupplyStutus:string;
FluidOID:number;
}
export class PrescriptionItemAddnView extends CLZOObject{
AdditionalProperties:PresItemAdditionalProperties;
AuthorisationDetails:PrescriptionItemAction;
ClinicalVerificationDetails:PrescriptionItemAction;
CancelDiscontinueDetails:PrescriptionItemAction;
AmendDetails:PrescriptionItemAction;
PrescriptionItem:PrescriptionItem;
}
export class Frequency extends CLZOObject{
Frequencyvalue:number;
FrequencyId:number;
FrequencyName:string;
ShortName:string;
IsPRN:string;
IsApplicableForDoseCalc:string;
}
export class IPPFrequency extends Frequency{
LowEvent:number;
HighEvent:number;
LowPeriod:number;
HighPeriod:number;
Type:string;
UOM:string;
IsSunday:boolean;
IsMonday:boolean;
IsTuesday:boolean;
IsWednesday:boolean;
IsThursday:boolean;
IsFriday:boolean;
IsSaturday:boolean;
NoOfEventsPerDay:number;
}
export class Dispensinginstructionhistory extends CLZOObject{
Dispensinginstructions:string;
OtherDispensingInstruction:string;
Additionalcomments:string;
EncounterDetail:string;
EncounterOid:number;
PresType:string;
EncounterType:string;
CACode:string;
IgnoreIfRequestExists:boolean;
DispensingInstruction:ObservableCollection<ObjectInfo>;
}
export class PowerSearchCriteria extends CLZOObject{
SearchText:string;
SearchCriteria:EnumSearchCriteria;
SearchType:EnumSearchType;
OrganisationOID:number;
IsFormulary:string;
FullyResolvedCriteria:FullyResolvedCriteria;
MCVersionNo:string;
IsBrandFlagOn:string;
ActivityCode:string;
IsIncludeMultiCompFlagOn:string;
IsIncludeInfusionFlagOn:string;
IsIPPMA_DU:boolean;
IsFluidSearchSFSFlagOn:string;
IsMCChildUOMs:string;
IsVMVPIsBrand:string;
IsVPAPMCIFlag:string;
AlwaysDisplayInPrimaryList:string;
TeamOIDs:string;
Identifier:number;
IdentifyingTypes:ObservableCollection<string>;
UserDateFilters:ObservableCollection<string>;
}
export enum EnumSearchCriteria{
DRUG = "DRUG",
PROBLEM = 'PROBLEM',
HIERARCHY = 'HIERARCHY',
FAVOURITES = 'FAVOURITES',
REQUESTSET_CARESET = 'REQUESTSET_CARESET',
DEFAULT = 'DEFAULT',
ORDERSET = 'ORDERSET',
}
export enum EnumSearchType{
CONTAINS = 'CONTAINS',
LEADING_WORD = 'LEADING_WORD',
FULLY_RESOLVED = 'FULLY_RESOLVED',
NONE = 'NONE',
BEGINS_WITH = 'BEGINS_WITH',
}
export class FullyResolvedCriteria extends CLZOObject{
DrugName:string;
Strengh:number;
Unit:string;
Others:string;
}
export class CompatibleComponentCriteria extends CLZOObject{
OrganisationOID:number;
MCVersionNo:string;
ActivityCode:string;
IdentifyingOID:ObservableCollection<number>;
IdentifyingType:ObservableCollection<string>;
}
export class ResolveDetails extends CLZOObject{
IsControlledDrug:string;
IsAllowMultipleRoute:boolean;
Route:ObservableCollection<Route>;
Form:ObservableCollection<Form>;
Frequency:ObservableCollection<Frequency>;
Site:ObservableCollection<Site>;
AdminInstruction:ObservableCollection<ObjectInfo>;
SuppyInstruction:ObservableCollection<string>;
StationeryType:ObservableCollection<string>;
StatType:ObservableCollection<Stationary>;
DurationDetails:ObservableCollection<DurationDetails>;
Dose:ObservableCollection<Dose>;
Quantity:ObservableCollection<Quantity>;
DrugProperyHdn:ObservableCollection<string>;
EndorsementPrpts:ObservableCollection<EndorsementProperties>;
}
export class Form extends CLZOObject{
FormId:number;
FormName:string;
LorenzoID:string;
OwnerOrganisationID:number;
Code:string;
}
export class Site extends CLZOObject{
SiteId:number;
SiteName:string;
DataProvider:string;
OwnerOrganisationOID:number;
}
export class Stationary extends CLZOObject{
StationaryOID:number;
StationaryName:string;
StationaryHOrgID:number;
DataProvider:string;
StationaryCode:string;
}
export class DurationDetails{
Duration:number;
UOMCode:string;
UOM:string;
}
export class Dose extends CLZOObject{
DoseType:string;
ObservationResultCode:string;
DoseDetails:ObservableCollection<DoseDetails>;
}
export class DoseDetails extends CLZOObject{
FromDoseValue:string;
FromDoseUOM:UOM;
ToDoseValue:string;
ToDoseUOM:UOM;
Frequency:Frequency;
Duration:number;
Period:string;
VariableDoseInstr:string;
StartDttm:DateTime;
EndDttm:DateTime;
PrescibableItemOID:number;
QualifierName:string;
StartValue:string;
EndValue:string;
ValueUOM:UOM;
DurationUOM:UOM;
Direction:string;
Quantity:number;
QuantityUOM:UOM;
LowerObservationRange:number;
UpperObservationRange:number;
ObservationRangeUOM:UOM;
DosingInstruction:string;
FrequencyDetails:FrequencyDetails;
LowerDose:string;
LowerUOMOID:number;
UpperDose:string;
UpperUOMOID:number;
MCVersion:string;
IsCopyFav:string;
DurationUOMOID:number;
IsPRN:string;
DurationUOMCode:string;
DisplaySeqNum:number;
}
export class EndorsementProperties extends CLZOObject{
EndorsementPrptsCC:string;
EndorsementPrptsName:string;
}
export class ValidationDetails extends CLZOObject{
IsBreak:string;
PrescriptionItemOid:number;
}
export class SealingDetails extends CLZOObject{
IdentifyingCode:string;
IdentifyingType:string;
}
export class CommonSearchCriteria extends CLZOObject{
DateQualifier:string;
FromDate:DateTime;
ToDate:DateTime;
Period:number;
PatientOID:number;
PeriodUOM:string;
GroupKey:string;
GroupByValue:string;
ProfileExpiryDuration:number;
CustomFlag:string;
}
export class PrescriptionSearchCriteria extends CommonSearchCriteria{
PrescriptionType:string;
EncounterType:string;
PrescriptionNumber:string;
TechnicallyValidatedStatus:string;
TechnicallyValidatedUserOID:number;
ExcludeSearch:string;
PrescriptionStatus:string;
SortBy:string;
PrescriptionHOOIDs:string;
DUCode:string;
StockRequistion:string;
MCIPrescriptions:boolean;
PrepStatus:string;
MedicationRequest:string;
RequestUrgencyCode:string;
CompletedStatus:string;
MedDueForSupply:string;
IsCriticalMedication:string;
JobRoleOID:number;
UserOID:number;
PrescriberOIDs:ObservableCollection<number>;
CareProviderOIDs:ObservableCollection<number>;
ServicePointOIDs:ObservableCollection<number>;
LocationOIDs:ObservableCollection<number>;
}
export class DecisionSupportCriteria extends CLZOObject{
CACode:CACode;
FromCA:string;
PatientOID:number;
PatientDOB:string;
PatientSex:string;
DrugExpiryDuration:number;
AgeInYears:number;
CheckMandatory:boolean;
MCVersionNo:string;
IsAllergenCheckNeed:boolean;
RoleprofileId:number;
UserOid:number;
IsBreak:string;
AddedMedication:ObservableCollection<DecisionSupportBasicCriteria>;
CurrentMedication:ObservableCollection<DecisionSupportBasicCriteria>;
}
export enum CACode{
HealthIssues,
Prescribe,
PGD,
}
export class DecisionSupportBasicCriteria extends CLZOObject{
DrugItem:DrugBasicData;
StartDate:DateTime;
EndDate:DateTime;
RowID:string;
IsMultiComponent:boolean;
PrescriptionDTTM:DateTime;
MCVersionNo:string;
PrescriptionType:string;
OrdersetOID:number;
IsAmend:string;
}
export class DrugBasicData extends CLZOObject{
p:string;
q:string;
r:string;
s:string;
t:string;
y:string;
z:boolean;
IdentifyingOID:number;
IdentifyingType:string;
IdentifyingName:string;
PrescribableItemListOID:number;
MCVersionNo:string;
IsAccessContraint:string;
IsPrescribeByBrand:string;
FormularyNote:string;
ItemType:string;
RouteOID:number;
FormOID:number;
IsTechValidateCA:string;
LorenzoID:string;
NonCatItemReason:string;
TechQtyUomName:string;
IsControllDrug:string;
ITMSUBTYP:string;
SourceDataProviderType:string;
AliasName:string;
PrescriptionItemId:string;
ConflictUniqueId:string;
bIsReplacement:boolean;
MCIItem:string;
UniqueMCRowID:number;
FluidIdentifyingOID:number;
FluidPrescribableItemListOID:number;
FluidItemType:string;
FluidLorenzoID:string;
FluidIdentifyingname:string;
IsMandatoryForOthers:boolean;
PrescriptionItemNumber:number;
IsConflictDisabled:boolean;
GenericDrugLorenzoID:string;
Basedrugname:string;
}
export class WarningItems extends CLZOObject{
RowID:string;
DrugItem:DrugBasicData;
DrugInteraction:ObservableCollection<WarningDetails>;
DrugDoubling:ObservableCollection<WarningDetails>;
DrugAllergy:ObservableCollection<WarningDetails>;
DrugMandatory:ObservableCollection<WarningDetails>;
DrugContraIndication:ObservableCollection<WarningDetails>;
DrugCrossReaction:ObservableCollection<WarningDetails>;
DrugAllergenNotIncluded:ObservableCollection<WarningDetails>;
SealingDetails:ObservableCollection<SealingDetails>;
}
export class MonographInfo extends CLZOObject{
Type:string;
Path:string;
Information:string;
Section:string;
Status:string;
MonographContentOID:number;
SourceType:string;
IdentifyingType:string;
TypeDisplay:string;
}
export class FormViewControls extends CLZOObject{
FormViewName:string;
FormViewOID:number;
IsDynamicMultiRoute:boolean;
IsWardStock:boolean;
IsWardStockFluid:boolean;
IsFLorTCorRF:string;
RequestRouteOIDs:string;
RequestFormOID:number;
RequestStrength:string;
Columns:ObservableCollection<string>;
Mandatory:ObservableCollection<string>;
IsWardStockForMCI:ObservableCollection<string>;
}
export class RelatedConditionDetails extends CLZOObject{
Code:string;
CodeTerm:string;
IdentifyingOID:number;
IdentifyingType:string;
}
export class PrescribeItemBase extends CLZOObject{
IsBolus:string;
PrescribeItemID:number;
PrescribeItemListID:number;
PrescribeItemDetailID:number;
CatalogueID:number;
Code:string;
LorenzoID:string;
Name:string;
Description:string;
KeyWord:string;
Type:string;
ItemSubType:string;
Level:string;
ActiveFrom:DateTime;
ActiveTo:DateTime;
VirtualParentID:number;
ActualParentID:number;
ParentName:string;
IsDisplayInPrimaryList:string;
IsDisplayInPrimaryListCust:string;
Status:string;
ItemStatusHistory:PrescribeItemStatus;
HasChild:string;
ParentItemOID:number;
HOParentOID:number;
OID:number;
BrandName:string;
DeactivateFrom:DateTime;
ReinstateFrom:DateTime;
PrescriptionItemID:string;
PrescriptionID:string;
Formularynote:string;
OrganisationOID:number;
IsFormulary:string;
Version:string;
MCVersion:string;
SourceDataProviderType:string;
SourceDataProviderID:string;
DataProvStatus:string;
SkipBasic:boolean;
Hierarchy:string;
HasDataFilter:string;
EncounterID:string;
ItemQuantityUOM:string;
PresItemType:string;
IsPrescribeByBrand:string;
ItemID:string;
ItemClass:string;
OrganisationName:string;
IsManufacturerGeneric:string;
IsParallelImport:string;
ITEMLORENZOID:string;
AliasName:string;
Display:string;
ItemStatus:string;
MCOID:number;
MCPrepStatusCode:string;
MCItemName:string;
MCItmSubtypecode:string;
MCIDetails:string;
IsControllDrug:string;
IsOxygen:string;
CondDoseMonPeriodReq:string;
IsOxygenCustom:string;
CondDoseMonPeriodReqCustom:string;
CustOID:number;
CustOrganisationOID:number;
MedicationHeading:string;
IsCDForFDBEData:string;
IsPresItemVPforAP:string;
AdminMethodOID:number;
AdminMethodName:string;
Itemtype:string;
IsAccessConstraint:boolean;
IsAuthorise:boolean;
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
export class PrescribeItemStatus extends StatusHistory{
ReplacementItems:ObservableCollection<PrescribeItemBase>;
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
export class PrescribeItem extends PrescribeItemBase{
Route:Route;
Site:string;
SiteName:string;
Line:string;
LineName:string;
Form:Form;
DoseDetails:Dose;
AdminInstruction:string;
SupplyInstruction:string;
Stationery:string;
Quantity:number;
QuantityUOM:UOM;
Frequency:Frequency;
Duration:number;
DurationUOM:UOM;
FormularyNote:string;
DoseFormula:DoseFormula;
IsBrand:number;
HasAccessConstraint:number;
TempSETID:string;
StationeryOID:number;
ItemType:ObservableCollection<string>;
}
export class ConstituentItem extends PrescribeItemBase{
FormularyNote:string;
AddedBy:string;
MFlag:string;
ItemCatDetailId:number;
identifyingoid:number;
Processingdetails:string;
ItemFormularyNote:string;
HasAccessConstraint:number;
MCIDeactitemName:string;
IsCopyFav:string;
DisplaySequence:number;
IsIndicationRequired:string;
IsDataProviderType:string;
PrescNote:string;
FormularyOID:number;
Guidance:string;
PrescItemType:string;
IsExcludeGuidanceInSearch:string;
ProcessingInfo:ObservableCollection<ProcessingInfo>;
DrugProperty:ObservableCollection<DrugProperty>;
}
export class ProcessingInfo extends CLZOObject{
IsBolus:string;
IdentifyingOID:number;
IdentifyingName:string;
IdentifyingType:string;
ProcessOID:number;
MUIFlag:string;
ONFlag:string;
Name:string;
AccessConstraint:string;
Route:Route;
Site:string;
Form:Form;
DoseType:string;
DoseValue:string;
MaxDoseValue:string;
DoseUOM:UOM;
McVersion:string;
Frequency:Frequency;
Duration:number;
DurationCode:string;
Period:string;
Quantity:number;
QuantityUOM:UOM;
AdminInstruction:string;
AdminInstructionName:string;
SupplyInstruction:string;
Stationary:string;
StationaryText:string;
IsDefault:string;
Status:string;
DoseFormula:DoseFormula;
ProcessingOID:number;
ProcessingIdenOID:number;
DisplaySeqNum:number;
AdminMethod:AdminMethod;
AdminDevice:string;
ObserveResult:string;
StationaryP:Stationary;
SourceDataProviderType:string;
Strength:string;
StrengthUOM:UOM;
LorenzoID:string;
DetailsLorenzoID:string;
NoOfInstalment:number;
InstalInstruction:string;
InstalmentInterval:number;
ItervalUOM:UOM;
PRN:string;
AddtionlComments:string;
SiteName:string;
AdminInstructionOID:number;
IsCopyFav:string;
IsSwap:string;
ItemSubType:string;
MCIDetails:string;
MCDrugProperty:string;
PresitemlistOID:number;
OrderSentenceDescription:string;
RequestDosePer2UOMLzoID:string;
RequestDosePer2UOMName:string;
DefaultWeightType:string;
MinDoseCap:string;
MaxDoseCap:string;
DoseCapUOMLzoID:string;
DoseCapUOMName:string;
ProductLzoID:string;
ProductName:string;
DosageFormType:string;
TitratedInstruction:string;
DRCdoseTypes:DRCdoseTypes;
AllowtimeshiftCode:string;
IsAllowMultipleRoute:boolean;
MultiRouteType:string;
Itemtype:string;
RequestPer2UOM:string;
IsAccessConstraint:boolean;
DisplayOrder:number;
GroupHeaderName:string;
SequentialID:number;
FrequencyIsPRN:string;
FreqLorenzoID:string;
FreqPERODCode:string;
Indication:ObservableCollection<Indication>;
DoseDetails:ObservableCollection<DoseDetails>;
MandatoryFields:ObservableCollection<string>;
Adminin:ObservableCollection<AdminInstruction>;
DrugRoute:ObservableCollection<Route>;
DrugForm:ObservableCollection<Form>;
DrugSite:ObservableCollection<Site>;
DrugStationary:ObservableCollection<Stationary>;
DrugPropery:ObservableCollection<DrugProperty>;
SupplyQtyUOM:ObservableCollection<UOM>;
FrequencyList:ObservableCollection<Frequency>;
UOMList:ObservableCollection<UOM>;
InfPeriodUOM:ObservableCollection<UOM>;
InfRateNumUOM:ObservableCollection<UOM>;
InfRateDenoUOM:ObservableCollection<UOM>;
}
export class AdminMethod extends CLZOObject{
AdminMethodId:number;
AdminMethodName:string;
}
export class AdminInstruction extends CLZOObject{
DAOID:number;
AdminInstructionID:number;
AdminInstructionName:string;
Status:string;
MCVersionNumber:string;
OwnerOrganisationID:number;
}
export class DRCdoseTypes extends CLZOObject{
DRCdoseTypeText:string;
DRCdoseTypeLorenzoID:string;
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
export class MedicationListCriteria extends CLZOObject{
ServiceOID:number;
LocationOID:number;
sMenuCode:string;
CAPresType:string;
Identifyingtype:string;
Identifyingoid:number;
AlreadyPrescribedItem:string;
currentEncounterOID:number;
FHIRAttributes:FHIRExtension;
IsDefaultRouteForm:boolean;
AlreadyReorderdOID:string;
PatientOID:number;
EncounterOID:number;
PrescriptionType:string;
MaxSeqCountRequired:boolean;
ProfileCancelledDrugFlag:string;
ProfileDiscontinuedDrugFlag:string;
ProfileHoldDuration:number;
McVersion:string;
IsDoPanel:number;
FilterCriteria:string;
ConflictCheck:string;
DUCode:string;
IsMaxSequentialGroupNoRequired:number;
IsResolutionGird:number;
IsEnableWSCconfig:boolean;
}
export class FHIRExtension{
CalledBy:string;
APIVersion:string;
PrescriptionItemStatus:string;
EpisodeIdentifier:string;
EncounterIdentifier:string;
IncDrugStatus:string;
PrescriptionItemOID:string;
EnableSealing:boolean;
isMedClosedEncItem:boolean;
}
export class FavouriteItem extends CLZOObject{
FavouriteItemID:number;
Name:string;
Level:number;
ParentID:number;
UserFavourite:string;
ExpiryReason:string;
ReinstateReason:string;
Description:string;
ActiveFrom:DateTime;
ActiveTo:DateTime;
ReinstateDTTM:DateTime;
MCVersion:string;
Version:string;
sDataFilter:string;
LorenzoID:string;
OwnerorganisationOID:number;
CurrentOrganizationID:number;
DFOID:number;
DFDEFOID:number;
DFName:string;
ChildCount:number;
ChildFolderCount:number;
IsMngAddFavourite:string;
FavriteStatusHistory:StatusHistory;
Itemtype:string;
PrescriptionItem:ObservableCollection<ConstituentItem>;
}
export class MergeMedicationDetails extends CLZOObject{
MCVersionNo:string;
ChangedStatus:string;
ChangedPatAge:string;
ChangedPatGender:string;
IsContraCheckNeed:string;
PatientDetails:ObservableCollection<MergePatientDetails>;
}
export class MergePatientDetails extends CLZOObject{
PatientOID:number;
PatientAge:number;
Gender:string;
EncounterList:string;
SealMedicationList:string;
PatientOIDs:string;
}
export class MergeconflictDetails extends CLZOObject{
ConflictType:string;
ConflictName:string;
MedicationName:string;
MedicationPatientOID:number;
ConflictPatientOID:number;
MedicationPrescriberOID:number;
}
export class MedicationViewItem extends CLZOObject{
GroupKey:string;
OrganisationOID:number;
}
export class MedicationItem extends MedicationViewItem{
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
StartDateIco:string;
PrescriptionItem:string;
OtherInformation:string;
MCVersion:string;
IsStopped:boolean;
HighRisk:boolean;
BlackTriangle:boolean;
Unlicensed:boolean;
NamedPatient:boolean;
ControlledDrug:boolean;
GenericNameForAPandAPP:string;
DMtdCode:string;
DMtdDescription:string;
AllChildItems:boolean;
PrescriptionCompletedStatus:string;
ReprintReason:string;
RePrintModified:DateTime;
}
export class MedicationItemDetails extends MedicationItem{
AdminInsturction:string;
DispensingInstruction:string;
SupplyInstruction:string;
IntervalBtwnInstalment:string;
NoOfInstalments:string;
UsedWith:string;
Stationerytype:string;
Medicationclerkingmodifyreason:string;
Additionalcomments:string;
DurationUOMID:string;
DurationUOMName:string;
DIRECTION:string;
Frequency:string;
QuantityUOMID:string;
QuantityUOMName:string;
DoesCalcExist:string;
ConflictsExist:string;
DoseType:string;
Upperdosevalue:string;
Lowerdosevalue:string;
DoseDetails:string;
EndorsementProp:string;
InstalmentIns:string;
Medclerksource:string;
TopUpDose:string;
BackgroundRate:string;
LockOutPeriod:string;
ISBTYCode:string;
OnBehalf:string;
OnBehalfComments:string;
CommunicationMode:string;
ExpDate:DateTime;
ClinicallyVerifiedOn:DateTime;
BatchNumber:string;
AmendmentOf:string;
AdminDevCode:string;
IsSTAT:string;
AdministeredDttm:DateTime;
ConflictType:string;
Conflict:string;
Severity:string;
Acknowledgement:string;
Authoriser:string;
ClinicallyVerifyReason:string;
TechQuantity:string;
TechDispensingInstruction:string;
TechSupplyInstruction:string;
TechValidatedBy:string;
TechValidatedOn:DateTime;
DoseFrequency:string;
PrescriptionNo:string;
DoseUnitOfMeasure:string;
DurationPeriod:string;
QuantityUOM:string;
PrescriptionItemStartdate:string;
ReasonforModification:string;
DoseCalculationDetailsValue:string;
HeightValue:string;
WeightValue:string;
BSA:string;
BSAdoseformula:string;
ToBeUpdatedPatientRecord:boolean;
IsDailyDose:boolean;
RequestedDose:string;
RequestedDoseUOMOID:string;
RequestedDoseUOMName:string;
REQPDCode:string;
CalculatedAmount:string;
OrderedAmountPerDose:string;
OrderedAmountPerDay:string;
RNDOFCode:string;
OverRideReason:string;
StoppingReason:string;
StoppingComments:string;
ACBS:boolean;
SLS:boolean;
ContraceptiveUse:boolean;
PrintStatus:string;
TotalPres:string;
StopDttm:DateTime;
ResonForModification:string;
DiscontinuedCancelledreason:string;
DiscontinuedCancelledDTTM:DateTime;
PrescriptionamendedDTTM:DateTime;
objPrsBy:dpUser;
objPrsSp:Specialty;
objPrsHO:HealthOrganisationDetail;
objClnvrBy:dpUser;
objBhlfUser:dpUser;
Strength:string;
InfusionType:string;
DeliveryDevice:string;
BoosterDose:string;
Fluid:string;
Volume:string;
InfusionPeriod:string;
Rate:string;
Lumen:string;
Ongoing:string;
ReviewAfter:string;
Bolus:string;
LockoutPeriod:string;
MaximumDose:string;
Concentration:string;
FlowRate:string;
TargetSaturationRange:string;
InfusionSequenceNo:boolean;
PRNInstruction:string;
ItemSubtype:string;
AutoNumber:number;
ParentPrescriptionItemOID:number;
InfusionSeqOrder:number;
TotalSeqCount:number;
SeqAndThen:string;
isStopDttm:boolean;
Humidification:string;
Clerkingstatus:string;
DTCMNCode:string;
DispensingAddcomments:string;
Supplycomments:string;
PresItemDispensingInst:string;
TITRDSINST:string;
TITRDComments:string;
PrescriptionItemDosageOID:number;
AuthoriseComment:string;
ExistsOnAdmission:string;
PrescribingNote:string;
IsInfusion:boolean;
MedActionCode:string;
MedicationAction:string;
AdminDoseDtls:string;
AdministeredBy:string;
AdminComments:string;
AdministeredReason:string;
DueAt:DateTime;
TotalVolumeInfused:string;
AdministeredRoute:string;
DoseDiscrepancyReason:string;
DoseDiscrepancyComments:string;
IsBolus:string;
Prescriptionconflicts:ObservableCollection<Prescriptionconflicts>;
Prescriptiontechnicalvalidation:ObservableCollection<Prescriptiontechnicalvalidation>;
PrescriptionDoseDetails:ObservableCollection<DoseDetail>;
}
export class Prescriptionconflicts extends CLZOObject{
Conflict:string;
ConflictType:string;
Severity:string;
acknowledgementReason:string;
AuthoriserReason:string;
ClinicalVerifierReason:string;
}
export class Prescriptiontechnicalvalidation extends CLZOObject{
Name:string;
TechQuantity:string;
TechDispensingInstruction:string;
TechSupplyInstruction:string;
TechValidatedBy:string;
TechValidatedOn:DateTime;
TechTotQuantity:string;
TechItemDetails:string;
}
export class DoseDetail extends CLZOObject{
FromDoseValue:number;
FromDoseUOM:UOMS;
ToDoseValue:number;
ToDoseUOM:UOMS;
Frequency:Frequencys;
Duration:number;
DurationUOM:UOMS;
Period:string;
VariableDoseInstr:string;
StartDttm:DateTime;
EndDttm:DateTime;
PrescibableItemOID:number;
Direction:string;
}
export class UOMS extends CLZOObject{
UOMId:number;
UOMName:string;
}
export class Frequencys extends CLZOObject{
Frequencyvalue:number;
FrequencyId:number;
FrequencyName:string;
ShortName:string;
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
export class CReqMsgSubmitDrugs{
oMedicationBC:Medication;
oContextInformation:CContextInformation;
}
export class CResMsgSubmitDrugs{
oContextInformation:CContextInformation;
objPrescResponse:ObservableCollection<PrescriptionResponse>;
}
export class CReqMsgGetNonReconciledItems{
oPrescriptionItemCriteriaBC:PrescriptionItemCriteria;
oContextInformation:CContextInformation;
}
export class CResMsgGetNonReconciledItems{
oContextInformation:CContextInformation;
oPrescriptionItemView:ObservableCollection<PrescriptionItemView>;
}
export class CReqMsgVerifyDrug{
objPatientInfoBC:GeneralInfo;
oDispensinginstructionhistoryBC:Dispensinginstructionhistory;
oContextInformation:CContextInformation;
VerifiedItemsBC:ObservableCollection<PrescriptionItemDetails>;
NonVerifiedItemsBC:ObservableCollection<PrescriptionItemDetails>;
DeleteDrugsBC:ObservableCollection<DeletedItemsInfo>;
ReconciledDrugsBC:ObservableCollection<ReconciledItems>;
TechnicalValidateBC:ObservableCollection<TechnicalValidationInfo>;
}
export class GeneralInfo{
IsMergedPatient:string;
EncounterOID:number;
PatientOID:number;
oCancelDisRateAlertShown:CancelDisRateAlertShown;
EncounterType:string;
PrescriptionType:string;
CACode:string;
IgnoreIfRequestExists:boolean;
PresItemPatientAddnDetail:PresItemPatientAddnDetail;
}
export class CancelDisRateAlertShown{
IsRateAlertShown:boolean;
PrescriptionOID:number;
PatientOID:number;
PrescriptionOIDList:string;
}
export class CResMsgVerifyDrug{
oContextInformation:CContextInformation;
objPrescriptionRes:ObservableCollection<PrescriptionResponse>;
}
export class CReqMsgAuthoriseDrug{
objPatientInfoBC:GeneralInfo;
oDispensinginstructionhistoryBC:Dispensinginstructionhistory;
oContextInformation:CContextInformation;
AuthorisedItemsBC:ObservableCollection<PrescriptionItemDetails>;
UnAuthorisedItemsBC:ObservableCollection<PrescriptionItemDetails>;
DeleteDrugsBC:ObservableCollection<DeletedItemsInfo>;
ReconciledDrugsBC:ObservableCollection<ReconciledItems>;
TechnicalValidateBC:ObservableCollection<TechnicalValidationInfo>;
objPrescriptionResBC:ObservableCollection<PrescriptionResponse>;
}
export class CResMsgAuthoriseDrug{
oContextInformation:CContextInformation;
}
export class CReqMsgGetProcessingOptionIndications{
oDrugItemBasicDataBC:DrugItemBasicData;
oContextInformation:CContextInformation;
}
export class CResMsgGetProcessingOptionIndications{
oContextInformation:CContextInformation;
oProcessingOptionIndications:ObservableCollection<Indication>;
}
export class CReqMsgSearchProcessingOptionsByIndications{
oDrugItemBasicDataBC:DrugItemBasicData;
oIndicationsBC:Indication;
oContextInformation:CContextInformation;
}
export class CResMsgSearchProcessingOptionsByIndications{
oContextInformation:CContextInformation;
oPrescriptionItemDetails:ObservableCollection<PrescriptionItemDetails>;
}
export class CReqMsgGetCurrentMedication{
oPrescriptionItemInputDataBC:PrescriptionItemInputData;
oContextInformation:CContextInformation;
}
export class CResMsgGetCurrentMedication{
oContextInformation:CContextInformation;
CurrentItems:ObservableCollection<PrescriptionItemBasicData>;
}
export class CReqMsgGetSearchDrugs{
oPowerSearchCriteriaBC:PowerSearchCriteria;
oContextInformation:CContextInformation;
}
export class CResMsgGetSearchDrugs{
RecordExist:boolean;
oContextInformation:CContextInformation;
PowerSearchDrugs:ObservableCollection<DrugItemBasicInfo>;
}
export class CReqMsgGetCompatibleComponents{
oCompatibleComponentCriteriaBC:CompatibleComponentCriteria;
oContextInformation:CContextInformation;
}
export class CResMsgGetCompatibleComponents{
oContextInformation:CContextInformation;
CompatibleComponentDrugs:ObservableCollection<DrugItemBasicInfo>;
}
export class CReqMsgGetResolveDefault{
oDrugItemInputDataBC:DrugItemInputData;
oContextInformation:CContextInformation;
}
export class CResMsgGetResolveDefault{
oContextInformation:CContextInformation;
oPrescriptionItemDetails:ObservableCollection<PrescriptionItemDetails>;
}
export class CReqMsgGetResolveDetail{
oDrugItemBasicDataBC:DrugItemBasicData;
oContextInformation:CContextInformation;
}
export class CResMsgGetResolveDetail{
ResolveDetail:ResolveDetails;
oContextInformation:CContextInformation;
}
export class CReqMsgSubmitTechValidationDetails{
oContextInformation:CContextInformation;
oTechnicalValidationInfoBC:ObservableCollection<TechnicalValidationInfo>;
}
export class CResMsgSubmitTechValidationDetails{
oContextInformation:CContextInformation;
}
export class CReqMsgGetDoseDetails{
PrescriptionItemOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetDoseDetails{
oDoseCalculatorDetails:DoseCalculatorDetails;
oContextInformation:CContextInformation;
}
export class CReqMsgGetPrescriptionItemDoseInfo{
PrescriptionItemOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetPrescriptionItemDoseInfo{
oDose:Dose;
oContextInformation:CContextInformation;
}
export class CReqMsgGetValidationsDetails{
oValidationDetailsBC:ValidationDetails;
oContextInformation:CContextInformation;
}
export class CResMsgGetValidationsDetails{
oContextInformation:CContextInformation;
oWarningDetails:ObservableCollection<WarningDetails>;
oSealingDetails:ObservableCollection<SealingDetails>;
}
export class CReqMsgGetAdditionalDetails{
PrescriptionItemOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetAdditionalDetails{
oPrescriptionItemAddnView:PrescriptionItemAddnView;
oContextInformation:CContextInformation;
}
export class CReqMsgGetPrescriptionView{
oReqListBC:PrescriptionSearchCriteria;
CurrentPageConfigBC:PagingDynamicSQL;
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
export class CResMsgGetPrescriptionView{
PageCount:number;
oContextInformation:CContextInformation;
oPrescriptionDetails:ObservableCollection<PrescriptionDetails>;
}
export class CReqMsgGetDecisionSupport{
objDecisionSuppCriteriaBC:DecisionSupportCriteria;
oContextInformation:CContextInformation;
}
export class CResMsgGetDecisionSupport{
oContextInformation:CContextInformation;
objDrugWarnings:ObservableCollection<WarningItems>;
}
export class CReqMsgGetReplacementDrugs{
oDrugItemBasicDataBC:DrugItemBasicData;
oContextInformation:CContextInformation;
}
export class CResMsgGetReplacementDrugs{
oContextInformation:CContextInformation;
oReplacementDrugs:ObservableCollection<DrugItemBasicInfo>;
}
export class CReqMsgGetAlternateOptions{
oDrugItemBasicDataBC:DrugItemInputData;
oContextInformation:CContextInformation;
}
export class CResMsgGetAlternateOptions{
oContextInformation:CContextInformation;
oAlternateOptions:ObservableCollection<DrugItemBasicInfo>;
}
export class CReqMsgGetProductPackOptions{
oDrugItemBasicDataBC:DrugItemBasicData;
oContextInformation:CContextInformation;
}
export class CResMsgGetProductPackOptions{
oContextInformation:CContextInformation;
oPackItems:ObservableCollection<DrugItemBasicInfo>;
}
export class CReqMsgGetRelatedOptions{
oDrugItemInputDataBC:DrugItemInputData;
oContextInformation:CContextInformation;
}
export class CResMsgGetRelatedOptions{
oContextInformation:CContextInformation;
oRelatedDrugs:ObservableCollection<DrugItemBasicInfo>;
}
export class CReqMsgGetProductOptions{
oDrugItemInputDataBC:DrugItemInputData;
oContextInformation:CContextInformation;
}
export class CResMsgGetProductOptions{
reccount:number;
oContextInformation:CContextInformation;
oRelatedDrugs:ObservableCollection<DrugItemBasicInfo>;
}
export class CReqMsgGetProcessingOptions{
oDrugItemInputDataBC:DrugItemInputData;
oContextInformation:CContextInformation;
}
export class CResMsgGetProcessingOptions{
oContextInformation:CContextInformation;
oPrescribingOptionDetails:ObservableCollection<PrescriptionItemDetails>;
}
export class CReqMsgGetItemMongraph{
oDrugItemBasicDataBC:DrugItemBasicData;
oContextInformation:CContextInformation;
}
export class CResMsgGetItemMongraph{
oContextInformation:CContextInformation;
MonographInformation:ObservableCollection<MonographInfo>;
}
export class CReqMsgGetPrescriptionDetails{
oPrescriptionItemInputDataBC:PrescriptionItemInputData;
oContextInformation:CContextInformation;
}
export class CResMsgGetPrescriptionDetails{
oContextInformation:CContextInformation;
oPrescriptionItemDetails:ObservableCollection<PrescriptionItemDetails>;
}
export class CReqMsgGetMonographInformation{
oDrugItemBasicDataBC:DrugItemBasicData;
oContextInformation:CContextInformation;
}
export class CResMsgGetMonographInformation{
oContextInformation:CContextInformation;
MonographInformation:ObservableCollection<string>;
}
export class CReqMsgGetDoseCalcDetails{
lnPrescribableItemDetailOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetDoseCalcDetails{
oDoseFormula:DoseFormula;
oContextInformation:CContextInformation;
}
export class CReqMsgGetAllOptions{
IdentifyingOIDBC:number;
IdentifyingTypeBC:string;
sOptionCodeBC:string;
MCVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetAllOptions{
oContextInformation:CContextInformation;
oValues:ObservableCollection<ObjectInfo>;
}
export class CReqMsgGetIsItemAuthorise{
IdentifyingTypeBC:string;
LorenzoIDBC:string;
MCVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetIsItemAuthorise{
IsAuthorise:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgGetFormViewControls{
oFormViewCriteriaBC:FormViewCriteria;
mcVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class FormViewCriteria{
IdentifyingOID:number;
IdentifyingType:string;
ItemSubType:string;
PrescriptionType:string;
RouteOID:number;
FormOID:number;
IsBasic:string;
IsInfusionOn:string;
RouteOIDs:string;
Strength:string;
ServiceOID:number;
LocationOID:number;
MCIIdentifyingOIDTypes:string;
FluidIdentifyingOID:number;
FluidIdentifyingType:string;
EncounterOID:number;
IsFLorTCorRF:string;
}
export class CResMsgGetFormViewControls{
oFormViewControls:FormViewControls;
oContextInformation:CContextInformation;
}
export class CReqMsgGetProblem{
PatientOIDBC:number;
SealRecordListBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetProblem{
oContextInformation:CContextInformation;
PatientProblem:ObservableCollection<PatientProblem>;
}
export class CReqMsgGetDischargeDate{
EncounterOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetDischargeDate{
DischargeDate:DateTime;
oContextInformation:CContextInformation;
}
export class CReqMsgGetDrugRoute{
oDrugItemBasicDataBC:DrugItemBasicData;
oContextInformation:CContextInformation;
}
export class CResMsgGetDrugRoute{
oContextInformation:CContextInformation;
oDrugRoutes:ObservableCollection<Route>;
}
export class CReqMsgGetStationaryItemByOID{
lnPatientOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetStationaryItemByOID{
oContextInformation:CContextInformation;
objStationaryItem:ObservableCollection<Stationary>;
}
export class CReqMsgGetItemStatus{
lnPatientOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetItemStatus{
oContextInformation:CContextInformation;
oStatusDetail:ObservableCollection<RelatedConditionDetails>;
}
export class CReqMsgGetPrescriptionItems{
PrescriptionOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetPrescriptionItems{
oContextInformation:CContextInformation;
ItemDetail:ObservableCollection<PrescriptionResponse>;
}
export class CReqMsgNotifyFYI{
oNotifyFYIDetailsBC:CNotifyFYI;
oContextInformation:CContextInformation;
}
export class CNotifyFYI{
sHOName:string;
sUserName:string;
sNAReason:string;
sNewcatalogueVersion:string;
sActivecatalogueVersion:string;
sNewVerPrepTime:string;
luserOID:number;
}
export class CResMsgNotifyFYI{
resultid:number;
oContextInformation:CContextInformation;
}
export class CReqMsgGetPrescDrugStationaryID{
sPrescriptionIdsBC:string;
sPrescriptionItemIdsBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetPrescDrugStationaryID{
oContextInformation:CContextInformation;
oPrescribeItem:ObservableCollection<PrescribeItem>;
}
export class CReqMsgGetFormularyHierarchy{
oDrugHierarchyInputBC:DrugHierarchyInfo;
oContextInformation:CContextInformation;
}
export class DrugHierarchyInfo{
HierarchyOID:number;
HierarchyName:string;
HierarchyType:string;
FormularyOID:number;
MCVersionNo:string;
ParentHierarchyOID:number;
ParentHierarchyName:string;
ActivityType:string;
TeamOIDs:string;
}
export class CResMsgGetFormularyHierarchy{
oContextInformation:CContextInformation;
oDrugHierarchyInfo:ObservableCollection<DrugHierarchyInfo>;
}
export class CReqMsgGetHierarchyFormularyItems{
oDrugHierarchyInputBC:DrugHierarchyInfo;
oContextInformation:CContextInformation;
}
export class CResMsgGetHierarchyFormularyItems{
oContextInformation:CContextInformation;
oDrugItemBasicData:ObservableCollection<DrugItemBasicInfo>;
}
export class CReqMsgGetTechnicalDetails{
SupplydetailOIDsBC:number;
SupplyDttmBC:DateTime;
ServiceOIDBC:number;
LocationOIDBC:number;
PrescriptionItemOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetTechnicalDetails{
oContextInformation:CContextInformation;
oTechnicalValidationInfo:ObservableCollection<TechnicalValidationInfo>;
}
export class CReqMsgGetDrugDetails{
IsBreakBC:string;
oContextInformation:CContextInformation;
PrescriptionItemOIDBC:ObservableCollection<number>;
}
export class CResMsgGetDrugDetails{
oContextInformation:CContextInformation;
oPrescriptionItemView:ObservableCollection<PrescriptionItemView>;
}
export class CReqMsgUpdatePrintStatus{
sReprintReasonBC:string;
IsprescriptionIDBC:string;
oContextInformation:CContextInformation;
PrescriptionOIDsBC:ObservableCollection<number>;
}
export class CResMsgUpdatePrintStatus{
oContextInformation:CContextInformation;
}
export class CReqMsgCheckAccess{
UserOIDBC:number;
sResourceNameBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgCheckAccess{
IsRigthExists:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgGetResultsView{
PatientIdBC:string;
ResultsIdBC:string;
NoOfRowsBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetResultsView{
oContextInformation:CContextInformation;
Results:ObservableCollection<ResultComponentValue>;
}
export class CReqMsgGetRequestId{
IdentifyingIdBC:number;
IdentifyingTypeBC:string;
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetRequestId{
ResultsId:string;
oContextInformation:CContextInformation;
}
export class CReqMsgChkResultAssociation{
lnIdentifyingIdBC:number;
sIdentifyingTypeBC:string;
sMCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgChkResultAssociation{
bDrugAssociate:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgGetPatientMedicationList{
oMedicationListCriteriaBC:MedicationListCriteria;
oContextInformation:CContextInformation;
}
export class CResMsgGetPatientMedicationList{
IsDisConflClrk:string;
oContextInformation:CContextInformation;
oPrescriptionItemView:ObservableCollection<PrescriptionItemView>;
}
export class CReqMsgGetPatientMedicationHistory{
oMedicationListCriteriaBC:MedicationListCriteria;
PageElementBC:PagingDynamicSQL;
oContextInformation:CContextInformation;
}
export class CResMsgGetPatientMedicationHistory{
PageCount:number;
oContextInformation:CContextInformation;
oPrescriptionItemView:ObservableCollection<PrescriptionItemView>;
}
export class CReqMsgGetDeactivateAttributes{
lnPrescriptionItemOIDBC:number;
smcVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetDeactivateAttributes{
IsDeactivate:string;
IsProhibitedRoute:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgGetFormLorenzoID{
oDrugItemInputDataBC:DrugItemSimpleInput;
oContextInformation:CContextInformation;
}
export class DrugItemSimpleInput{
IdentifyingOID:number;
IdentifyingType:string;
McVersionNo:string;
}
export class CResMsgGetFormLorenzoID{
sLorenzoID:string;
oContextInformation:CContextInformation;
}
export class CReqMsgGetItemStrengthInfo{
oDrugItemInputDataBC:DrugItemSimpleInput;
oContextInformation:CContextInformation;
}
export class CResMsgGetItemStrengthInfo{
sStrengthValue:string;
sStrengthUomName:string;
sStrengthUomPerName:string;
oContextInformation:CContextInformation;
}
export class CReqMsgGetDocTemplatesPolicyType{
DocTemplateOIDsBC:string;
PrescriptionOIDsBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetDocTemplatesPolicyType{
oContextInformation:CContextInformation;
DocTemplates:ObservableCollection<DocTemplatesPrnPolicy>;
}
export class DocTemplatesPrnPolicy{
DocTemplateOID:number;
PrinterPolicyType:string;
DocTemplateName:string;
IdentifyingName:string;
}
export class CReqMsgGetPatientMedicationCount{
PatientOIDBC:number;
EncounterOIDBC:number;
PrescriptionTypeBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetPatientMedicationCount{
bIsExist:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgGetMedClerkingSource{
oMedLstCrtBC:MedicationListCriteria;
oContextInformation:CContextInformation;
}
export class CResMsgGetMedClerkingSource{
sMedClrkSrc:string;
MedClerkedType:string;
MedClerkedValue:string;
isActiveclerk:string;
oContextInformation:CContextInformation;
}
export class CReqMsgGetDispIns{
lnPrescriptionIDBC:number;
sPatientOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetDispIns{
sDispValue:string;
sOtherTxt:string;
oContextInformation:CContextInformation;
}
export class CReqMsgGetFavouritesGroupItemsList{
FavGroupOIdBC:number;
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetFavouritesGroupItemsList{
oFavouriteItem:FavouriteItem;
oContextInformation:CContextInformation;
}
export class CReqMsgGetPatientMergeConflicts{
objMergeMedicationDetailsBC:MergeMedicationDetails;
oContextInformation:CContextInformation;
}
export class CResMsgGetPatientMergeConflicts{
oContextInformation:CContextInformation;
objMergeconflictDetails:ObservableCollection<MergeconflictDetails>;
}
export class CReqMsgGetFavouritesDefaultFolder{
TeamOIDsBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetFavouritesDefaultFolder{
sDefUserFolder:string;
sDefTeamFolder:string;
oContextInformation:CContextInformation;
}
export class CReqMsgGetLifeViewPrintDetails{
PrescriptionItemOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetLifeViewPrintDetails{
oMedicationItemDetails:MedicationItemDetails;
oContextInformation:CContextInformation;
}
export class CReqMsgInsUpPerscriptionMedClerk{
PatientOIDBC:number;
EncounterOIDBC:number;
sMedClerkedTypeBC:string;
sMedClerkedValueBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgInsUpPerscriptionMedClerk{
oContextInformation:CContextInformation;
}
export class CReqMsgGetMedclerkPrompt{
PatientOIDBC:number;
EncounterOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetMedclerkPrompt{
sMedClerkedType:string;
sMedClerkedValue:string;
isActiveclerk:string;
oContextInformation:CContextInformation;
}
export class ArrayOfLong extends ObservableCollection<long>{}
export class ArrayOfString extends ObservableCollection<string>{}

 const prototypeList = {"ManagePrescriptionWS.GetDispIns":CResMsgGetDispIns.prototype ,
"ManagePrescriptionWS.GetFavouritesGroupItemsList":CResMsgGetFavouritesGroupItemsList.prototype ,
"ManagePrescriptionWS.GetPatientMergeConflicts":CResMsgGetPatientMergeConflicts.prototype ,
"ManagePrescriptionWS.GetFavouritesDefaultFolder":CResMsgGetFavouritesDefaultFolder.prototype ,
"ManagePrescriptionWS.GetLifeViewPrintDetails":CResMsgGetLifeViewPrintDetails.prototype ,
"ManagePrescriptionWS.InsUpPerscriptionMedClerk":CResMsgInsUpPerscriptionMedClerk.prototype ,
"ManagePrescriptionWS.GetMedclerkPrompt":CResMsgGetMedclerkPrompt.prototype ,
"ManagePrescriptionWS.GetDoseCalcDetails":CResMsgGetDoseCalcDetails.prototype ,
"ManagePrescriptionWS.GetAllOptions":CResMsgGetAllOptions.prototype ,
"ManagePrescriptionWS.GetIsItemAuthorise":CResMsgGetIsItemAuthorise.prototype ,
"ManagePrescriptionWS.GetFormViewControls":CResMsgGetFormViewControls.prototype ,
"ManagePrescriptionWS.GetProblem":CResMsgGetProblem.prototype ,
"ManagePrescriptionWS.GetDischargeDate":CResMsgGetDischargeDate.prototype ,
"ManagePrescriptionWS.GetDrugRoute":CResMsgGetDrugRoute.prototype ,
"ManagePrescriptionWS.GetStationaryItemByOID":CResMsgGetStationaryItemByOID.prototype ,
"ManagePrescriptionWS.GetItemStatus":CResMsgGetItemStatus.prototype ,
"ManagePrescriptionWS.GetPrescriptionItems":CResMsgGetPrescriptionItems.prototype ,
"ManagePrescriptionWS.NotifyFYI":CResMsgNotifyFYI.prototype ,
"ManagePrescriptionWS.GetPrescDrugStationaryID":CResMsgGetPrescDrugStationaryID.prototype ,
"ManagePrescriptionWS.GetFormularyHierarchy":CResMsgGetFormularyHierarchy.prototype ,
"ManagePrescriptionWS.GetHierarchyFormularyItems":CResMsgGetHierarchyFormularyItems.prototype ,
"ManagePrescriptionWS.GetTechnicalDetails":CResMsgGetTechnicalDetails.prototype ,
"ManagePrescriptionWS.GetDrugDetails":CResMsgGetDrugDetails.prototype ,
"ManagePrescriptionWS.UpdatePrintStatus":CResMsgUpdatePrintStatus.prototype ,
"ManagePrescriptionWS.CheckAccess":CResMsgCheckAccess.prototype ,
"ManagePrescriptionWS.GetResultsView":CResMsgGetResultsView.prototype ,
"ManagePrescriptionWS.GetRequestId":CResMsgGetRequestId.prototype ,
"ManagePrescriptionWS.ChkResultAssociation":CResMsgChkResultAssociation.prototype ,
"ManagePrescriptionWS.GetPatientMedicationList":CResMsgGetPatientMedicationList.prototype ,
"ManagePrescriptionWS.GetPatientMedicationHistory":CResMsgGetPatientMedicationHistory.prototype ,
"ManagePrescriptionWS.GetDeactivateAttributes":CResMsgGetDeactivateAttributes.prototype ,
"ManagePrescriptionWS.GetFormLorenzoID":CResMsgGetFormLorenzoID.prototype ,
"ManagePrescriptionWS.GetItemStrengthInfo":CResMsgGetItemStrengthInfo.prototype ,
"ManagePrescriptionWS.GetDocTemplatesPolicyType":CResMsgGetDocTemplatesPolicyType.prototype ,
"ManagePrescriptionWS.GetPatientMedicationCount":CResMsgGetPatientMedicationCount.prototype ,
"ManagePrescriptionWS.GetMedClerkingSource":CResMsgGetMedClerkingSource.prototype ,
"ManagePrescriptionWS.GetDrugBasicInfo":CResMsgGetDrugBasicInfo.prototype ,
"ManagePrescriptionWS.SubmitDrugs":CResMsgSubmitDrugs.prototype ,
"ManagePrescriptionWS.GetNonReconciledItems":CResMsgGetNonReconciledItems.prototype ,
"ManagePrescriptionWS.VerifyDrug":CResMsgVerifyDrug.prototype ,
"ManagePrescriptionWS.AuthoriseDrug":CResMsgAuthoriseDrug.prototype ,
"ManagePrescriptionWS.GetProcessingOptionIndications":CResMsgGetProcessingOptionIndications.prototype ,
"ManagePrescriptionWS.SearchProcessingOptionsByIndications":CResMsgSearchProcessingOptionsByIndications.prototype ,
"ManagePrescriptionWS.GetCurrentMedication":CResMsgGetCurrentMedication.prototype ,
"ManagePrescriptionWS.GetSearchDrugs":CResMsgGetSearchDrugs.prototype ,
"ManagePrescriptionWS.GetCompatibleComponents":CResMsgGetCompatibleComponents.prototype ,
"ManagePrescriptionWS.GetResolveDefault":CResMsgGetResolveDefault.prototype ,
"ManagePrescriptionWS.GetResolveDetail":CResMsgGetResolveDetail.prototype ,
"ManagePrescriptionWS.SubmitTechValidationDetails":CResMsgSubmitTechValidationDetails.prototype ,
"ManagePrescriptionWS.GetDoseDetails":CResMsgGetDoseDetails.prototype ,
"ManagePrescriptionWS.GetPrescriptionItemDoseInfo":CResMsgGetPrescriptionItemDoseInfo.prototype ,
"ManagePrescriptionWS.GetValidationsDetails":CResMsgGetValidationsDetails.prototype ,
"ManagePrescriptionWS.GetAdditionalDetails":CResMsgGetAdditionalDetails.prototype ,
"ManagePrescriptionWS.GetPrescriptionView":CResMsgGetPrescriptionView.prototype ,
"ManagePrescriptionWS.GetDecisionSupport":CResMsgGetDecisionSupport.prototype ,
"ManagePrescriptionWS.GetReplacementDrugs":CResMsgGetReplacementDrugs.prototype ,
"ManagePrescriptionWS.GetAlternateOptions":CResMsgGetAlternateOptions.prototype ,
"ManagePrescriptionWS.GetProductPackOptions":CResMsgGetProductPackOptions.prototype ,
"ManagePrescriptionWS.GetRelatedOptions":CResMsgGetRelatedOptions.prototype ,
"ManagePrescriptionWS.GetProductOptions":CResMsgGetProductOptions.prototype ,
"ManagePrescriptionWS.GetProcessingOptions":CResMsgGetProcessingOptions.prototype ,
"ManagePrescriptionWS.GetItemMongraph":CResMsgGetItemMongraph.prototype ,
"ManagePrescriptionWS.GetPrescriptionDetails":CResMsgGetPrescriptionDetails.prototype ,
"ManagePrescriptionWS.GetMonographInformation":CResMsgGetMonographInformation.prototype ,

CReqMsgGetDrugBasicInfo : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDrugBasicInfo : { 
oContextInformation:CContextInformation.prototype ,
ItemDetail:PrescriptionItemBasicData.prototype ,

 },PrescriptionItemBasicData : { 
HealthOrganisation:ObjectInfo.prototype ,
PrescriptionBasicData:Prescription.prototype ,

 },PrescriptionItem : { 
PrescriberDetails:ObjectInfo.prototype ,
CareProvider:ObjectInfo.prototype ,
GPConnectMedication:GPConnectItem.prototype ,

 },GPConnectItem : { 
Dosage:GPConnectAdminDosage.prototype ,

 },PrescriptionItemDetails : { 
BasicProperties:PresItemBasicProperties.prototype ,
AdditionalProperties:PresItemAdditionalProperties.prototype ,
DrugSpecificProperties:PresItemDrugProperties.prototype ,
FormViewParameters:PrescriptionItemFormViewParameters.prototype ,
APIProp:APIProperties.prototype ,
LegalCat:LegalCategory.prototype ,
AdminDetails:PrescriptionItemAdminDetails.prototype ,
DoseCalculation:DoseCalculatorDetails.prototype ,
ActionPerformed:PrescriptionItemAction.prototype ,
TitratedDoseinfo:TitratedDoseinfo.prototype ,
DoseFormulaDet:DoseFormula.prototype ,
MultiComponentDetails:IPPMCPresctiptionItem.prototype ,
TechValidateDetails:TechnicalValidationInfo.prototype ,
Warning:WarningDetails.prototype ,
DRCConflict:DRCConflict.prototype ,
AuditChanges:PresItemAuditHistory.prototype ,

 },PresItemCommonProperties : { 
TreatmentToCont:ObjectInfo.prototype ,
AdminInstruction:ObjectInfo.prototype ,
LegalCategory:ObjectInfo.prototype ,
Route:ObjectInfo.prototype ,
Form:ObjectInfo.prototype ,
Statusflags:StatusFlags.prototype ,
DRCdoseTypeLorenzoID:ObjectInfo.prototype ,
PresItemEncounter:ObjectInfo.prototype ,
DispensingInstruction:ObjectInfo.prototype ,
SupplyInstruction:ObjectInfo.prototype ,
SupplementItems:ObjectInfo.prototype ,
DrugProperties:DrugProperty.prototype ,
MultipleRoutes:ObjectInfo.prototype ,

 },PresItemBasicProperties : { 
Direction:ObjectInfo.prototype ,
Duration:MeasurableObject.prototype ,
Site:ObjectInfo.prototype ,
Quantity:Quantity.prototype ,
Dose:PrescriptionItemDose.prototype ,
FrequencyDetails:FrequencyDetails.prototype ,
OrderSet:ObjectInfo.prototype ,
PatientProblem:Indication.prototype ,

 },PrescriptionItemDose : { 
DoseType:ObjectInfo.prototype ,
ObservationResult:ObjectInfo.prototype ,
PresItemEncounter:ObjectInfo.prototype ,
DoseRegime:DoseRegime.prototype ,

 },DoseRegime : { 
DoseUOM:UOM.prototype ,
Duration:MeasurableObject.prototype ,
Quantity:MeasurableObject.prototype ,
Direction:ObjectInfo.prototype ,
ObservationRangeUOM:UOM.prototype ,
FrequencyDetails:FrequencyDetails.prototype ,
TitratedDoseInstruction:ObjectInfo.prototype ,
InfusionDetails:DoseRegimeInfusionDetail.prototype ,
AdministeredTimeAndDoseDetails:AdministeredTimeDoseDetail.prototype ,

 },FrequencyDetails : { 
Frequency:ObjectInfo.prototype ,
StatDose:MeasurableObject.prototype ,
ScheduledTimes:Scheduledetails.prototype ,

 },DoseRegimeInfusionDetail : { 
RateNumerator:UOM.prototype ,
RateDenominator:UOM.prototype ,
Duration:MeasurableObject.prototype ,

 },AdministeredTimeDoseDetail : { 
DoseUOM:UOM.prototype ,

 },PresItemBasicPropertiesView : { 
PrescriptionItem:ObjectInfo.prototype ,
FormViewParameters:PrescriptionItemFormViewParameters.prototype ,
OrderSet:ObjectInfo.prototype ,
oPresItemPropAPI:PrescriptionItemPropertiesAPI.prototype ,
DurationInfo:MeasurableObject.prototype ,

 },PrescriptionItemFormViewParameters : { 
IntravenousInfusionData:IntravenousInfusionDetails.prototype ,
AdminDeviceData:AdminDeviceDetails.prototype ,
ReviewAfterUOM:ObjectInfo.prototype ,
SequenceData:SequenceDetails.prototype ,

 },IntravenousInfusionDetails : { 
Fluid:ObjectInfo.prototype ,
VolumeUOM:UOM.prototype ,
InfusionPeriodUOM:UOM.prototype ,
RateUOM:UOM.prototype ,
RateDenominatorUOM:UOM.prototype ,
LowConcentrationUOMOID:UOM.prototype ,
UpperConcentrationUOMOID:UOM.prototype ,
PreviousLowConcentrationUOM:UOM.prototype ,
PreviousUpperConcentrationUOM:UOM.prototype ,

 },AdminDeviceDetails : { 
BackgroundRateUOM:UOM.prototype ,
TopUpDoseUOM:UOM.prototype ,
LockOutPeriodUOM:UOM.prototype ,
BackgroundRateDenaminatorUOM:UOM.prototype ,
MonitorPeriodUOM:UOM.prototype ,
BoosterDoseUOM:UOM.prototype ,

 },PrescriptionItemPropertiesAPI : { 
oDoseCalc:DoseCalc.prototype ,

 },PresItemAdditionalProperties : { 
IntervalBtwnInstallment:MeasurableObject.prototype ,
MedClerkModifyReason:ObjectInfo.prototype ,
StationeryType:ObjectInfo.prototype ,
AdminMethod:ObjectInfo.prototype ,
ManageReviewDetail:ManageReviewPeriod.prototype ,
InstalmentInstructions:ObjectInfo.prototype ,
EndorsementProperties:ObjectInfo.prototype ,
MedClerkSource:ObjectInfo.prototype ,
ReviewAfterDetails:ReviewAfterDetail.prototype ,

 },ReviewAfterDetail : { 
ReviewAfterUOM:ObjectInfo.prototype ,
ReviewType:ObjectInfo.prototype ,
ReviewOutcome:ObjectInfo.prototype ,

 },ManageReviewPeriod : { 
NewReviewAfterUOM:ObjectInfo.prototype ,
NewReviewType:ObjectInfo.prototype ,
oReviewAfterDetail:ReviewAfterDetail.prototype ,

 },PresItemDrugProperties : { 
Strength:MeasurableObject.prototype ,

 },IPPMCPresctiptionItem : { 
QuantityUOMs:ObjectInfo.prototype ,
MCQuantity:Quantity.prototype ,
oDrugPrepHistoryData:DrugPrepHistoryData.prototype ,
SupplyInstruction:ObjectInfo.prototype ,
DispensingInstruction:ObjectInfo.prototype ,
TechValidateDetails:TechnicalValidationInfo.prototype ,

 },TechnicalValidationInfo : { 
ValidatedBy:ObjectInfo.prototype ,
Tag:PITag.prototype ,
TechValidatedItems:TechValidatedItem.prototype ,
SupplyInstruction:ObjectInfo.prototype ,
DispensingInstruction:ObjectInfo.prototype ,

 },TechValidatedItem : { 
DrugItem:DrugItemBasicData.prototype ,
QuantityPerDoseUOM:ObjectInfo.prototype ,
TotalQuantityUOM:ObjectInfo.prototype ,
SupplyInstruction:ObjectInfo.prototype ,
DispensingInstruction:ObjectInfo.prototype ,
DispenseStatus:PresItemRequestDetails.prototype ,

 },APIProperties : { 
IngredientCollection:IngCollection.prototype ,
IndicationCollection:IndCollection.prototype ,
QuantityUOM:QuantityUOM.prototype ,

 },PrescriptionItemAdminDetails : { 
WitnessedBy:ObjectInfo.prototype ,
DoseAdministeredUOM:UOM.prototype ,
AdministeredBy:ObjectInfo.prototype ,
Site:ObjectInfo.prototype ,
InfusionRateUOM:ObjectInfo.prototype ,
InfusionRatePerUOM:ObjectInfo.prototype ,
DripRateUOM:ObjectInfo.prototype ,
DripRatePerUOM:ObjectInfo.prototype ,
BagVolumeUOM:ObjectInfo.prototype ,
InfusionPeriodUOM:ObjectInfo.prototype ,
ConcentrationStrengthUOM:ObjectInfo.prototype ,
ConcentrationVolumeUOM:ObjectInfo.prototype ,
InfusionPeriodUOMforMedAdmin:ObjectInfo.prototype ,
InfusionDoseUOMNumerator:ObjectInfo.prototype ,
InfusionDoseUOMDenominator:ObjectInfo.prototype ,

 },WarningDetails : { 
MessageFormat:MessageFormat.prototype ,
PrescriptionItem:ObjectInfo.prototype ,

 },PrescriptionItemAction : { 
PerformedBy:ObjectInfo.prototype ,
VerifyOnBehalf:OnBehalfInfo.prototype ,

 },OnBehalfInfo : { 
OnBehalfOfUser:ObjectInfo.prototype ,

 },DRCConflict : { 
ConflictDetails:DRCConflictDetails.prototype ,

 },TitratedDoseinfo : { 
TitrateScheduledinfo:TitrateScheduledinfo.prototype ,

 },DoseFormula : { 
RequestedUOM:UOM.prototype ,
Freqdetail:ObjectInfo.prototype ,

 },DrugItemBasicInfo : { 
APIProp:APIProperties.prototype ,
DrugProperties:DrugProperty.prototype ,
DoseRegime:DoseRegime.prototype ,
MCChildItems:IPPMCPresctiptionItem.prototype ,
Routes:Route.prototype ,

 },PrescriptionBasicData : { 
Specialty:ObjectInfo.prototype ,
PrescriberDetails:ObjectInfo.prototype ,
PrescriberRole:ObjectInfo.prototype ,
CareProvider:ObjectInfo.prototype ,

 },Prescription : { 
StaioneryType:ObjectInfo.prototype ,
ServicePoint:ObjectInfo.prototype ,
Location:ObjectInfo.prototype ,
HealthOrganisation:ObjectInfo.prototype ,
PrescriptionAvailabilityStatus:AvailabilityStatus.prototype ,
PrescriptionItems:PrescriptionItemDetails.prototype ,

 },PrescriptionDetails : { 
PatientData:PatientDetail.prototype ,
EncounterDetails:EncounterDetails.prototype ,
TechnicallyValidatedUser:ObjectInfo.prototype ,
GroupByDetails:GroupResult.prototype ,

 },Medication : { 
PatientPrescription:Prescription.prototype ,
PresItemPatientAddnDetail:PresItemPatientAddnDetail.prototype ,
CancelledDrugs:DeletedItemsInfo.prototype ,
BackedOutDrugs:PrescriptionItemInputData.prototype ,
ReconciledDrugs:ReconciledItems.prototype ,
TechnicalValidation:TechnicalValidationInfo.prototype ,

 },DeletedItemsInfo : { 
PrescriptionItemData:PrescriptionItemInputData.prototype ,
DeletedInfo:PrescriptionItemAction.prototype ,

 },ReconciledItems : { 
ReconciledStatus:PrescriptionItemAction.prototype ,

 },PrescriptionResponse : { 
StationeryType:ObjectInfo.prototype ,
PresItemResponse:PrescriptionItemResponse.prototype ,

 },PrescriptionItemView : { 
FluidMedReq:FluidMedRequestDetail.prototype ,
oPrescriptionItem:PrescriptionItem.prototype ,
oPresItemBasicPropertiesView:PresItemBasicPropertiesView.prototype ,
oPresItemAdditionalProperties:PresItemAdditionalProperties.prototype ,
oPrescriptionItemAction:PrescriptionItemAction.prototype ,
oPrescriptionItemAddnView:PrescriptionItemAddnView.prototype ,
FrequencyDetails:IPPFrequency.prototype ,
oTechValidateDetails:TechValidatedItem.prototype ,
IPPMCPresctiptionItem:IPPMCPresctiptionItem.prototype ,

 },PrescriptionItemAddnView : { 
AdditionalProperties:PresItemAdditionalProperties.prototype ,
AuthorisationDetails:PrescriptionItemAction.prototype ,
ClinicalVerificationDetails:PrescriptionItemAction.prototype ,
CancelDiscontinueDetails:PrescriptionItemAction.prototype ,
AmendDetails:PrescriptionItemAction.prototype ,
PrescriptionItem:PrescriptionItem.prototype ,

 },Dispensinginstructionhistory : { 
DispensingInstruction:ObjectInfo.prototype ,

 },PowerSearchCriteria : { 
FullyResolvedCriteria:FullyResolvedCriteria.prototype ,

 },ResolveDetails : { 
Route:Route.prototype ,
Form:Form.prototype ,
Frequency:Frequency.prototype ,
Site:Site.prototype ,
AdminInstruction:ObjectInfo.prototype ,
StatType:Stationary.prototype ,
DurationDetails:DurationDetails.prototype ,
Dose:Dose.prototype ,
Quantity:Quantity.prototype ,
EndorsementPrpts:EndorsementProperties.prototype ,

 },Dose : { 
DoseDetails:DoseDetails.prototype ,

 },DoseDetails : { 
FromDoseUOM:UOM.prototype ,
ToDoseUOM:UOM.prototype ,
Frequency:Frequency.prototype ,
ValueUOM:UOM.prototype ,
DurationUOM:UOM.prototype ,
QuantityUOM:UOM.prototype ,
ObservationRangeUOM:UOM.prototype ,
FrequencyDetails:FrequencyDetails.prototype ,

 },DecisionSupportCriteria : { 
AddedMedication:DecisionSupportBasicCriteria.prototype ,
CurrentMedication:DecisionSupportBasicCriteria.prototype ,

 },DecisionSupportBasicCriteria : { 
DrugItem:DrugBasicData.prototype ,

 },WarningItems : { 
DrugItem:DrugBasicData.prototype ,
DrugInteraction:WarningDetails.prototype ,
DrugDoubling:WarningDetails.prototype ,
DrugAllergy:WarningDetails.prototype ,
DrugMandatory:WarningDetails.prototype ,
DrugContraIndication:WarningDetails.prototype ,
DrugCrossReaction:WarningDetails.prototype ,
DrugAllergenNotIncluded:WarningDetails.prototype ,
SealingDetails:SealingDetails.prototype ,

 },PrescribeItemBase : { 
ItemStatusHistory:PrescribeItemStatus.prototype ,

 },PrescribeItemStatus : { 
ReplacementItems:PrescribeItemBase.prototype ,

 },PrescribeItem : { 
Route:Route.prototype ,
Form:Form.prototype ,
DoseDetails:Dose.prototype ,
QuantityUOM:UOM.prototype ,
Frequency:Frequency.prototype ,
DurationUOM:UOM.prototype ,
DoseFormula:DoseFormula.prototype ,

 },ConstituentItem : { 
ProcessingInfo:ProcessingInfo.prototype ,
DrugProperty:DrugProperty.prototype ,

 },ProcessingInfo : { 
Route:Route.prototype ,
Form:Form.prototype ,
DoseUOM:UOM.prototype ,
Frequency:Frequency.prototype ,
QuantityUOM:UOM.prototype ,
DoseFormula:DoseFormula.prototype ,
AdminMethod:AdminMethod.prototype ,
StationaryP:Stationary.prototype ,
StrengthUOM:UOM.prototype ,
ItervalUOM:UOM.prototype ,
DRCdoseTypes:DRCdoseTypes.prototype ,
Indication:Indication.prototype ,
DoseDetails:DoseDetails.prototype ,
Adminin:AdminInstruction.prototype ,
DrugRoute:Route.prototype ,
DrugForm:Form.prototype ,
DrugSite:Site.prototype ,
DrugStationary:Stationary.prototype ,
DrugPropery:DrugProperty.prototype ,
SupplyQtyUOM:UOM.prototype ,
FrequencyList:Frequency.prototype ,
UOMList:UOM.prototype ,
InfPeriodUOM:UOM.prototype ,
InfRateNumUOM:UOM.prototype ,
InfRateDenoUOM:UOM.prototype ,

 },ResultComponentValue : { 
CodedValue:Codification.prototype ,
ResultValueViewer:ResultValueViewer.prototype ,

 },ResultValueViewer : { 
ResultMedia:ResultMedia.prototype ,

 },MedicationListCriteria : { 
FHIRAttributes:FHIRExtension.prototype ,

 },FavouriteItem : { 
FavriteStatusHistory:StatusHistory.prototype ,
PrescriptionItem:ConstituentItem.prototype ,

 },MergeMedicationDetails : { 
PatientDetails:MergePatientDetails.prototype ,

 },MedicationItemDetails : { 
objPrsBy:dpUser.prototype ,
objPrsSp:Specialty.prototype ,
objPrsHO:HealthOrganisationDetail.prototype ,
objClnvrBy:dpUser.prototype ,
objBhlfUser:dpUser.prototype ,
Prescriptionconflicts:Prescriptionconflicts.prototype ,
Prescriptiontechnicalvalidation:Prescriptiontechnicalvalidation.prototype ,
PrescriptionDoseDetails:DoseDetail.prototype ,

 },DoseDetail : { 
FromDoseUOM:UOMS.prototype ,
ToDoseUOM:UOMS.prototype ,
Frequency:Frequencys.prototype ,
DurationUOM:UOMS.prototype ,

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

 },CReqMsgSubmitDrugs : { 
oMedicationBC:Medication.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgSubmitDrugs : { 
oContextInformation:CContextInformation.prototype ,
objPrescResponse:PrescriptionResponse.prototype ,

 },CReqMsgGetNonReconciledItems : { 
oPrescriptionItemCriteriaBC:PrescriptionItemCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetNonReconciledItems : { 
oContextInformation:CContextInformation.prototype ,
oPrescriptionItemView:PrescriptionItemView.prototype ,

 },CReqMsgVerifyDrug : { 
objPatientInfoBC:GeneralInfo.prototype ,
oDispensinginstructionhistoryBC:Dispensinginstructionhistory.prototype ,
oContextInformation:CContextInformation.prototype ,
VerifiedItemsBC:PrescriptionItemDetails.prototype ,
NonVerifiedItemsBC:PrescriptionItemDetails.prototype ,
DeleteDrugsBC:DeletedItemsInfo.prototype ,
ReconciledDrugsBC:ReconciledItems.prototype ,
TechnicalValidateBC:TechnicalValidationInfo.prototype ,

 },GeneralInfo : { 
oCancelDisRateAlertShown:CancelDisRateAlertShown.prototype ,
PresItemPatientAddnDetail:PresItemPatientAddnDetail.prototype ,

 },CResMsgVerifyDrug : { 
oContextInformation:CContextInformation.prototype ,
objPrescriptionRes:PrescriptionResponse.prototype ,

 },CReqMsgAuthoriseDrug : { 
objPatientInfoBC:GeneralInfo.prototype ,
oDispensinginstructionhistoryBC:Dispensinginstructionhistory.prototype ,
oContextInformation:CContextInformation.prototype ,
AuthorisedItemsBC:PrescriptionItemDetails.prototype ,
UnAuthorisedItemsBC:PrescriptionItemDetails.prototype ,
DeleteDrugsBC:DeletedItemsInfo.prototype ,
ReconciledDrugsBC:ReconciledItems.prototype ,
TechnicalValidateBC:TechnicalValidationInfo.prototype ,
objPrescriptionResBC:PrescriptionResponse.prototype ,

 },CResMsgAuthoriseDrug : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetProcessingOptionIndications : { 
oDrugItemBasicDataBC:DrugItemBasicData.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProcessingOptionIndications : { 
oContextInformation:CContextInformation.prototype ,
oProcessingOptionIndications:Indication.prototype ,

 },CReqMsgSearchProcessingOptionsByIndications : { 
oDrugItemBasicDataBC:DrugItemBasicData.prototype ,
oIndicationsBC:Indication.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgSearchProcessingOptionsByIndications : { 
oContextInformation:CContextInformation.prototype ,
oPrescriptionItemDetails:PrescriptionItemDetails.prototype ,

 },CReqMsgGetCurrentMedication : { 
oPrescriptionItemInputDataBC:PrescriptionItemInputData.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetCurrentMedication : { 
oContextInformation:CContextInformation.prototype ,
CurrentItems:PrescriptionItemBasicData.prototype ,

 },CReqMsgGetSearchDrugs : { 
oPowerSearchCriteriaBC:PowerSearchCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetSearchDrugs : { 
oContextInformation:CContextInformation.prototype ,
PowerSearchDrugs:DrugItemBasicInfo.prototype ,

 },CReqMsgGetCompatibleComponents : { 
oCompatibleComponentCriteriaBC:CompatibleComponentCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetCompatibleComponents : { 
oContextInformation:CContextInformation.prototype ,
CompatibleComponentDrugs:DrugItemBasicInfo.prototype ,

 },CReqMsgGetResolveDefault : { 
oDrugItemInputDataBC:DrugItemInputData.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResolveDefault : { 
oContextInformation:CContextInformation.prototype ,
oPrescriptionItemDetails:PrescriptionItemDetails.prototype ,

 },CReqMsgGetResolveDetail : { 
oDrugItemBasicDataBC:DrugItemBasicData.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResolveDetail : { 
ResolveDetail:ResolveDetails.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgSubmitTechValidationDetails : { 
oContextInformation:CContextInformation.prototype ,
oTechnicalValidationInfoBC:TechnicalValidationInfo.prototype ,

 },CResMsgSubmitTechValidationDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetDoseDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDoseDetails : { 
oDoseCalculatorDetails:DoseCalculatorDetails.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPrescriptionItemDoseInfo : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPrescriptionItemDoseInfo : { 
oDose:Dose.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetValidationsDetails : { 
oValidationDetailsBC:ValidationDetails.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetValidationsDetails : { 
oContextInformation:CContextInformation.prototype ,
oWarningDetails:WarningDetails.prototype ,
oSealingDetails:SealingDetails.prototype ,

 },CReqMsgGetAdditionalDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAdditionalDetails : { 
oPrescriptionItemAddnView:PrescriptionItemAddnView.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPrescriptionView : { 
oReqListBC:PrescriptionSearchCriteria.prototype ,
CurrentPageConfigBC:PagingDynamicSQL.prototype ,
oContextInformation:CContextInformation.prototype ,

 },PagingDynamicSQL : { 
FilterBy:Filter.prototype ,
GroupBy:Group.prototype ,

 },CResMsgGetPrescriptionView : { 
oContextInformation:CContextInformation.prototype ,
oPrescriptionDetails:PrescriptionDetails.prototype ,

 },CReqMsgGetDecisionSupport : { 
objDecisionSuppCriteriaBC:DecisionSupportCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDecisionSupport : { 
oContextInformation:CContextInformation.prototype ,
objDrugWarnings:WarningItems.prototype ,

 },CReqMsgGetReplacementDrugs : { 
oDrugItemBasicDataBC:DrugItemBasicData.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetReplacementDrugs : { 
oContextInformation:CContextInformation.prototype ,
oReplacementDrugs:DrugItemBasicInfo.prototype ,

 },CReqMsgGetAlternateOptions : { 
oDrugItemBasicDataBC:DrugItemInputData.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAlternateOptions : { 
oContextInformation:CContextInformation.prototype ,
oAlternateOptions:DrugItemBasicInfo.prototype ,

 },CReqMsgGetProductPackOptions : { 
oDrugItemBasicDataBC:DrugItemBasicData.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProductPackOptions : { 
oContextInformation:CContextInformation.prototype ,
oPackItems:DrugItemBasicInfo.prototype ,

 },CReqMsgGetRelatedOptions : { 
oDrugItemInputDataBC:DrugItemInputData.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetRelatedOptions : { 
oContextInformation:CContextInformation.prototype ,
oRelatedDrugs:DrugItemBasicInfo.prototype ,

 },CReqMsgGetProductOptions : { 
oDrugItemInputDataBC:DrugItemInputData.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProductOptions : { 
oContextInformation:CContextInformation.prototype ,
oRelatedDrugs:DrugItemBasicInfo.prototype ,

 },CReqMsgGetProcessingOptions : { 
oDrugItemInputDataBC:DrugItemInputData.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProcessingOptions : { 
oContextInformation:CContextInformation.prototype ,
oPrescribingOptionDetails:PrescriptionItemDetails.prototype ,

 },CReqMsgGetItemMongraph : { 
oDrugItemBasicDataBC:DrugItemBasicData.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetItemMongraph : { 
oContextInformation:CContextInformation.prototype ,
MonographInformation:MonographInfo.prototype ,

 },CReqMsgGetPrescriptionDetails : { 
oPrescriptionItemInputDataBC:PrescriptionItemInputData.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPrescriptionDetails : { 
oContextInformation:CContextInformation.prototype ,
oPrescriptionItemDetails:PrescriptionItemDetails.prototype ,

 },CReqMsgGetMonographInformation : { 
oDrugItemBasicDataBC:DrugItemBasicData.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMonographInformation : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetDoseCalcDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDoseCalcDetails : { 
oDoseFormula:DoseFormula.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetAllOptions : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAllOptions : { 
oContextInformation:CContextInformation.prototype ,
oValues:ObjectInfo.prototype ,

 },CReqMsgGetIsItemAuthorise : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIsItemAuthorise : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetFormViewControls : { 
oFormViewCriteriaBC:FormViewCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFormViewControls : { 
oFormViewControls:FormViewControls.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetProblem : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProblem : { 
oContextInformation:CContextInformation.prototype ,
PatientProblem:PatientProblem.prototype ,

 },CReqMsgGetDischargeDate : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDischargeDate : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetDrugRoute : { 
oDrugItemBasicDataBC:DrugItemBasicData.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDrugRoute : { 
oContextInformation:CContextInformation.prototype ,
oDrugRoutes:Route.prototype ,

 },CReqMsgGetStationaryItemByOID : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetStationaryItemByOID : { 
oContextInformation:CContextInformation.prototype ,
objStationaryItem:Stationary.prototype ,

 },CReqMsgGetItemStatus : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetItemStatus : { 
oContextInformation:CContextInformation.prototype ,
oStatusDetail:RelatedConditionDetails.prototype ,

 },CReqMsgGetPrescriptionItems : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPrescriptionItems : { 
oContextInformation:CContextInformation.prototype ,
ItemDetail:PrescriptionResponse.prototype ,

 },CReqMsgNotifyFYI : { 
oNotifyFYIDetailsBC:CNotifyFYI.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgNotifyFYI : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPrescDrugStationaryID : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPrescDrugStationaryID : { 
oContextInformation:CContextInformation.prototype ,
oPrescribeItem:PrescribeItem.prototype ,

 },CReqMsgGetFormularyHierarchy : { 
oDrugHierarchyInputBC:DrugHierarchyInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFormularyHierarchy : { 
oContextInformation:CContextInformation.prototype ,
oDrugHierarchyInfo:DrugHierarchyInfo.prototype ,

 },CReqMsgGetHierarchyFormularyItems : { 
oDrugHierarchyInputBC:DrugHierarchyInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetHierarchyFormularyItems : { 
oContextInformation:CContextInformation.prototype ,
oDrugItemBasicData:DrugItemBasicInfo.prototype ,

 },CReqMsgGetTechnicalDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetTechnicalDetails : { 
oContextInformation:CContextInformation.prototype ,
oTechnicalValidationInfo:TechnicalValidationInfo.prototype ,

 },CReqMsgGetDrugDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDrugDetails : { 
oContextInformation:CContextInformation.prototype ,
oPrescriptionItemView:PrescriptionItemView.prototype ,

 },CReqMsgUpdatePrintStatus : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgUpdatePrintStatus : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgCheckAccess : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgCheckAccess : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetResultsView : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResultsView : { 
oContextInformation:CContextInformation.prototype ,
Results:ResultComponentValue.prototype ,

 },CReqMsgGetRequestId : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetRequestId : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgChkResultAssociation : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgChkResultAssociation : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPatientMedicationList : { 
oMedicationListCriteriaBC:MedicationListCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPatientMedicationList : { 
oContextInformation:CContextInformation.prototype ,
oPrescriptionItemView:PrescriptionItemView.prototype ,

 },CReqMsgGetPatientMedicationHistory : { 
oMedicationListCriteriaBC:MedicationListCriteria.prototype ,
PageElementBC:PagingDynamicSQL.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPatientMedicationHistory : { 
oContextInformation:CContextInformation.prototype ,
oPrescriptionItemView:PrescriptionItemView.prototype ,

 },CReqMsgGetDeactivateAttributes : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDeactivateAttributes : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetFormLorenzoID : { 
oDrugItemInputDataBC:DrugItemSimpleInput.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFormLorenzoID : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetItemStrengthInfo : { 
oDrugItemInputDataBC:DrugItemSimpleInput.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetItemStrengthInfo : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetDocTemplatesPolicyType : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDocTemplatesPolicyType : { 
oContextInformation:CContextInformation.prototype ,
DocTemplates:DocTemplatesPrnPolicy.prototype ,

 },CReqMsgGetPatientMedicationCount : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPatientMedicationCount : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetMedClerkingSource : { 
oMedLstCrtBC:MedicationListCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMedClerkingSource : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetDispIns : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDispIns : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetFavouritesGroupItemsList : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFavouritesGroupItemsList : { 
oFavouriteItem:FavouriteItem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPatientMergeConflicts : { 
objMergeMedicationDetailsBC:MergeMedicationDetails.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPatientMergeConflicts : { 
oContextInformation:CContextInformation.prototype ,
objMergeconflictDetails:MergeconflictDetails.prototype ,

 },CReqMsgGetFavouritesDefaultFolder : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFavouritesDefaultFolder : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetLifeViewPrintDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetLifeViewPrintDetails : { 
oMedicationItemDetails:MedicationItemDetails.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgInsUpPerscriptionMedClerk : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgInsUpPerscriptionMedClerk : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetMedclerkPrompt : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMedclerkPrompt : { 
oContextInformation:CContextInformation.prototype ,

 },CContextInformation : { 
Current:CContextInformation.prototype ,

 },
 }
 
const charPropertyLookup = [
'IsTechValidateCA','MonPeriodMand','IsExcludeGuidanceInSearch',
'IsAdministered','IsControlledDrug',
'IsPGD','IsPRNDose','IsDrugApprovalRequired','IsConflictsExists','IsDoseCalcExist','IsAmendment','IsNonformulary','ReplaceDrugActiveStatus','DrugVersionMatch','HIIsAckn','IsReoderIconEnable','IssIDSNewMeds','IsInclude72HrsCompletedORDisconItem','IsVolumeBasedInfusion',
'IsSupplyReq',
'IsPresItemLevelDispense','ExistsOnAdmission',
'IsFixedAdministration','StatIndicator','PRNScheduledDet',
'HasWarnings','IsHold','PrintStatus','HasDoseCalculation',
'IsCurrentMedication','IsDeactivated','IsSupplyRequested',
'LineIndicator',
'IsOxygen',
'UpdatePatientRecord','IsDailyDose',
'CanDoseBeChanged','HasProhibitedRoute',
'IsDoseCombinationsDefined',
'IsPCA',
'IsActionPerformed',
'NotifyFlag',
'Status',
'IsCriticalMedication',
'IsTechnicallyValidated',
'IsPresLvlDispense',
'IsPresItemStatusComplete',
'IsFormulary','IsIncludeMultiCompFlagOn','IsIncludeInfusionFlagOn','IsFluidSearchSFSFlagOn','IsMCChildUOMs','IsVMVPIsBrand','IsVPAPMCIFlag','AlwaysDisplayInPrimaryList',
'IsPRN',
'ExcludeSearch',
'HasDataFilter','EncounterID','CondDoseMonPeriodReq','IsOxygenCustom','CondDoseMonPeriodReqCustom','IsCDForFDBEData','IsPresItemVPforAP',
'AlreadyPrescribedItem','ProfileCancelledDrugFlag','ProfileDiscontinuedDrugFlag','ConflictCheck',
'ChangedPatAge','ChangedPatGender','IsContraCheckNeed',
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
'IsBasic','IsInfusionOn',
'IsBreakBC',
'IsprescriptionIDBC',
'MedClerkedValue','isActiveclerk',
'sMedClerkedValueBC',
'sMedClerkedValue',]
 

 