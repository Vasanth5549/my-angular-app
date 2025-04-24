import { int64, int16, int32, uInt16, uInt32, uInt64, byte, long, double, decimal, DelegateArgs, CContextInformation, CLZOObject } from "epma-platform/models";
import { ObservableCollection } from "../models/observable-collection";
import DateTime from "../services/datetime.service";
import { HelperService } from "./helper.service";


export class CBCFormsWSSoapClient {

    GetFormPolicyCompleted: Function;
    GetFormPolicyAsync(oCReqMsgGetFormPolicy: CReqMsgGetFormPolicy): void {
        HelperService.Invoke<CReqMsgGetFormPolicy, CResMsgGetFormPolicy, GetFormPolicyCompletedEventArgs>("CBCFormsWS.GetFormPolicy", oCReqMsgGetFormPolicy, this.GetFormPolicyCompleted, "reqForm", new GetFormPolicyCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormStatusCompleted: Function;
    GetFormStatusAsync(oCReqMsgGetFormStatus: CReqMsgGetFormStatus): void {
        HelperService.Invoke<CReqMsgGetFormStatus, CResMsgGetFormStatus, GetFormStatusCompletedEventArgs>("CBCFormsWS.GetFormStatus", oCReqMsgGetFormStatus, this.GetFormStatusCompleted, "FormOId", new GetFormStatusCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormWorkingStatusCompleted: Function;
    GetFormWorkingStatusAsync(oCReqMsgGetFormWorkingStatus: CReqMsgGetFormWorkingStatus): void {
        HelperService.Invoke<CReqMsgGetFormWorkingStatus, CResMsgGetFormWorkingStatus, GetFormWorkingStatusCompletedEventArgs>("CBCFormsWS.GetFormWorkingStatus", oCReqMsgGetFormWorkingStatus, this.GetFormWorkingStatusCompleted, "lPatientOID", new GetFormWorkingStatusCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFrmStatusCompleted: Function;
    GetFrmStatusAsync(oCReqMsgGetFrmStatus: CReqMsgGetFrmStatus): void {
        HelperService.Invoke<CReqMsgGetFrmStatus, CResMsgGetFrmStatus, GetFrmStatusCompletedEventArgs>("CBCFormsWS.GetFrmStatus", oCReqMsgGetFrmStatus, this.GetFrmStatusCompleted, "lPatientOID", new GetFrmStatusCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    ClinicalFlagCompleted: Function;
    ClinicalFlagAsync(oCReqMsgClinicalFlag: CReqMsgClinicalFlag): void {
        HelperService.Invoke<CReqMsgClinicalFlag, CResMsgClinicalFlag, ClinicalFlagCompletedEventArgs>("CBCFormsWS.ClinicalFlag", oCReqMsgClinicalFlag, this.ClinicalFlagCompleted, "strConfigKey", new ClinicalFlagCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFSTaskMgmtStatusCompleted: Function;
    GetFSTaskMgmtStatusAsync(oCReqMsgGetFSTaskMgmtStatus: CReqMsgGetFSTaskMgmtStatus): void {
        HelperService.Invoke<CReqMsgGetFSTaskMgmtStatus, CResMsgGetFSTaskMgmtStatus, GetFSTaskMgmtStatusCompletedEventArgs>("CBCFormsWS.GetFSTaskMgmtStatus", oCReqMsgGetFSTaskMgmtStatus, this.GetFSTaskMgmtStatusCompleted, "FormOId", new GetFSTaskMgmtStatusCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormWSCompleted: Function;
    GetFormWSAsync(oCReqMsgGetFormWS: CReqMsgGetFormWS): void {
        HelperService.Invoke<CReqMsgGetFormWS, CResMsgGetFormWS, GetFormWSCompletedEventArgs>("CBCFormsWS.GetFormWS", oCReqMsgGetFormWS, this.GetFormWSCompleted, "PatientOID", new GetFormWSCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormStatusHistoryDetailsCompleted: Function;
    GetFormStatusHistoryDetailsAsync(oCReqMsgGetFormStatusHistoryDetails: CReqMsgGetFormStatusHistoryDetails): void {
        HelperService.Invoke<CReqMsgGetFormStatusHistoryDetails, CResMsgGetFormStatusHistoryDetails, GetFormStatusHistoryDetailsCompletedEventArgs>("CBCFormsWS.GetFormStatusHistoryDetails", oCReqMsgGetFormStatusHistoryDetails, this.GetFormStatusHistoryDetailsCompleted, "reqForm", new GetFormStatusHistoryDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    ContinueFormSetCompleted: Function;
    ContinueFormSetAsync(oCReqMsgContinueFormSet: CReqMsgContinueFormSet): void {
        HelperService.Invoke<CReqMsgContinueFormSet, CResMsgContinueFormSet, ContinueFormSetCompletedEventArgs>("CBCFormsWS.ContinueFormSet", oCReqMsgContinueFormSet, this.ContinueFormSetCompleted, "iFormOIDToCanStart", new ContinueFormSetCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    UpdateFormPatientCompleted: Function;
    UpdateFormPatientAsync(oCReqMsgUpdateFormPatient: CReqMsgUpdateFormPatient): void {
        HelperService.Invoke<CReqMsgUpdateFormPatient, CResMsgUpdateFormPatient, UpdateFormPatientCompletedEventArgs>("CBCFormsWS.UpdateFormPatient", oCReqMsgUpdateFormPatient, this.UpdateFormPatientCompleted, "ReqFormPatient", new UpdateFormPatientCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    RetrieveFormbyFilterCompleted: Function;
    RetrieveFormbyFilterAsync(oCReqMsgRetrieveFormbyFilter: CReqMsgRetrieveFormbyFilter): void {
        HelperService.Invoke<CReqMsgRetrieveFormbyFilter, CResMsgRetrieveFormbyFilter, RetrieveFormbyFilterCompletedEventArgs>("CBCFormsWS.RetrieveFormbyFilter", oCReqMsgRetrieveFormbyFilter, this.RetrieveFormbyFilterCompleted, "reqFormListInfo", new RetrieveFormbyFilterCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFSChildListCompleted: Function;
    GetFSChildListAsync(oCReqMsgGetFSChildList: CReqMsgGetFSChildList): void {
        HelperService.Invoke<CReqMsgGetFSChildList, CResMsgGetFSChildList, GetFSChildListCompletedEventArgs>("CBCFormsWS.GetFSChildList", oCReqMsgGetFSChildList, this.GetFSChildListCompleted, "ParentFormOID", new GetFSChildListCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFSChildListNFECompleted: Function;
    GetFSChildListNFEAsync(oCReqMsgGetFSChildListNFE: CReqMsgGetFSChildListNFE): void {
        HelperService.Invoke<CReqMsgGetFSChildListNFE, CResMsgGetFSChildListNFE, GetFSChildListNFECompletedEventArgs>("CBCFormsWS.GetFSChildListNFE", oCReqMsgGetFSChildListNFE, this.GetFSChildListNFECompleted, "PatientOID", new GetFSChildListNFECompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetInitiateRightsForUserCompleted: Function;
    GetInitiateRightsForUserAsync(oCReqMsgGetInitiateRightsForUser: CReqMsgGetInitiateRightsForUser): void {
        HelperService.Invoke<CReqMsgGetInitiateRightsForUser, CResMsgGetInitiateRightsForUser, GetInitiateRightsForUserCompletedEventArgs>("CBCFormsWS.GetInitiateRightsForUser", oCReqMsgGetInitiateRightsForUser, this.GetInitiateRightsForUserCompleted, "sFormCode", new GetInitiateRightsForUserCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    ReadCompleted: Function;
    ReadAsync(oCReqMsgRead: CReqMsgRead): void {
        HelperService.Invoke<CReqMsgRead, CResMsgRead, ReadCompletedEventArgs>("CBCFormsWS.Read", oCReqMsgRead, this.ReadCompleted, "reqFormReadInfo", new ReadCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    RetrieveFormSetRulesCompleted: Function;
    RetrieveFormSetRulesAsync(oCReqMsgRetrieveFormSetRules: CReqMsgRetrieveFormSetRules): void {
        HelperService.Invoke<CReqMsgRetrieveFormSetRules, CResMsgRetrieveFormSetRules, RetrieveFormSetRulesCompletedEventArgs>("CBCFormsWS.RetrieveFormSetRules", oCReqMsgRetrieveFormSetRules, this.RetrieveFormSetRulesCompleted, "reqFSRuleReadInfo", new RetrieveFormSetRulesCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    RetrieveObsoleteFormDataCompleted: Function;
    RetrieveObsoleteFormDataAsync(oCReqMsgRetrieveObsoleteFormData: CReqMsgRetrieveObsoleteFormData): void {
        HelperService.Invoke<CReqMsgRetrieveObsoleteFormData, CResMsgRetrieveObsoleteFormData, RetrieveObsoleteFormDataCompletedEventArgs>("CBCFormsWS.RetrieveObsoleteFormData", oCReqMsgRetrieveObsoleteFormData, this.RetrieveObsoleteFormDataCompleted, "reqObsForm", new RetrieveObsoleteFormDataCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetAssesedDetailsCompleted: Function;
    GetAssesedDetailsAsync(oCReqMsgGetAssesedDetails: CReqMsgGetAssesedDetails): void {
        HelperService.Invoke<CReqMsgGetAssesedDetails, CResMsgGetAssesedDetails, GetAssesedDetailsCompletedEventArgs>("CBCFormsWS.GetAssesedDetails", oCReqMsgGetAssesedDetails, this.GetAssesedDetailsCompleted, "reqForm", new GetAssesedDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetUserCPRoleCompleted: Function;
    GetUserCPRoleAsync(oCReqMsgGetUserCPRole: CReqMsgGetUserCPRole): void {
        HelperService.Invoke<CReqMsgGetUserCPRole, CResMsgGetUserCPRole, GetUserCPRoleCompletedEventArgs>("CBCFormsWS.GetUserCPRole", oCReqMsgGetUserCPRole, this.GetUserCPRoleCompleted, "RoleOID", new GetUserCPRoleCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetTSDetailsCompleted: Function;
    GetTSDetailsAsync(oCReqMsgGetTSDetails: CReqMsgGetTSDetails): void {
        HelperService.Invoke<CReqMsgGetTSDetails, CResMsgGetTSDetails, GetTSDetailsCompletedEventArgs>("CBCFormsWS.GetTSDetails", oCReqMsgGetTSDetails, this.GetTSDetailsCompleted, "criteria", new GetTSDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetRDLTemplateCompleted: Function;
    GetRDLTemplateAsync(oCReqMsgGetRDLTemplate: CReqMsgGetRDLTemplate): void {
        HelperService.Invoke<CReqMsgGetRDLTemplate, CResMsgGetRDLTemplate, GetRDLTemplateCompletedEventArgs>("CBCFormsWS.GetRDLTemplate", oCReqMsgGetRDLTemplate, this.GetRDLTemplateCompleted, "templateName", new GetRDLTemplateCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    RetrieveFMOIDByTaskCompleted: Function;
    RetrieveFMOIDByTaskAsync(oCReqMsgRetrieveFMOIDByTask: CReqMsgRetrieveFMOIDByTask): void {
        HelperService.Invoke<CReqMsgRetrieveFMOIDByTask, CResMsgRetrieveFMOIDByTask, RetrieveFMOIDByTaskCompletedEventArgs>("CBCFormsWS.RetrieveFMOIDByTask", oCReqMsgRetrieveFMOIDByTask, this.RetrieveFMOIDByTaskCompleted, "reqTask", new RetrieveFMOIDByTaskCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormDataItemImageCompleted: Function;
    GetFormDataItemImageAsync(oCReqMsgGetFormDataItemImage: CReqMsgGetFormDataItemImage): void {
        HelperService.Invoke<CReqMsgGetFormDataItemImage, CResMsgGetFormDataItemImage, GetFormDataItemImageCompletedEventArgs>("CBCFormsWS.GetFormDataItemImage", oCReqMsgGetFormDataItemImage, this.GetFormDataItemImageCompleted, "DataitemInstanceName", new GetFormDataItemImageCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormDIImageTempCompleted: Function;
    GetFormDIImageTempAsync(oCReqMsgGetFormDIImageTemp: CReqMsgGetFormDIImageTemp): void {
        HelperService.Invoke<CReqMsgGetFormDIImageTemp, CResMsgGetFormDIImageTemp, GetFormDIImageTempCompletedEventArgs>("CBCFormsWS.GetFormDIImageTemp", oCReqMsgGetFormDIImageTemp, this.GetFormDIImageTempCompleted, "DataitemInstanceName", new GetFormDIImageTempCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormDocAssociationCompleted: Function;
    GetFormDocAssociationAsync(oCReqMsgGetFormDocAssociation: CReqMsgGetFormDocAssociation): void {
        HelperService.Invoke<CReqMsgGetFormDocAssociation, CResMsgGetFormDocAssociation, GetFormDocAssociationCompletedEventArgs>("CBCFormsWS.GetFormDocAssociation", oCReqMsgGetFormDocAssociation, this.GetFormDocAssociationCompleted, "reqFormDoc", new GetFormDocAssociationCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormDetailsCompleted: Function;
    GetFormDetailsAsync(oCReqMsgGetFormDetails: CReqMsgGetFormDetails): void {
        HelperService.Invoke<CReqMsgGetFormDetails, CResMsgGetFormDetails, GetFormDetailsCompletedEventArgs>("CBCFormsWS.GetFormDetails", oCReqMsgGetFormDetails, this.GetFormDetailsCompleted, "reqForm", new GetFormDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormBasicDetCompleted: Function;
    GetFormBasicDetAsync(oCReqMsgGetFormBasicDet: CReqMsgGetFormBasicDet): void {
        HelperService.Invoke<CReqMsgGetFormBasicDet, CResMsgGetFormBasicDet, GetFormBasicDetCompletedEventArgs>("CBCFormsWS.GetFormBasicDet", oCReqMsgGetFormBasicDet, this.GetFormBasicDetCompleted, "reqForm", new GetFormBasicDetCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormDetailsFromIntrayCompleted: Function;
    GetFormDetailsFromIntrayAsync(oCReqMsgGetFormDetailsFromIntray: CReqMsgGetFormDetailsFromIntray): void {
        HelperService.Invoke<CReqMsgGetFormDetailsFromIntray, CResMsgGetFormDetailsFromIntray, GetFormDetailsFromIntrayCompletedEventArgs>("CBCFormsWS.GetFormDetailsFromIntray", oCReqMsgGetFormDetailsFromIntray, this.GetFormDetailsFromIntrayCompleted, "reqForm", new GetFormDetailsFromIntrayCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetAuthObserverCompleted: Function;
    GetAuthObserverAsync(oCReqMsgGetAuthObserver: CReqMsgGetAuthObserver): void {
        HelperService.Invoke<CReqMsgGetAuthObserver, CResMsgGetAuthObserver, GetAuthObserverCompletedEventArgs>("CBCFormsWS.GetAuthObserver", oCReqMsgGetAuthObserver, this.GetAuthObserverCompleted, "reqForm", new GetAuthObserverCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormObsViewCompleted: Function;
    GetFormObsViewAsync(oCReqMsgGetFormObsView: CReqMsgGetFormObsView): void {
        HelperService.Invoke<CReqMsgGetFormObsView, CResMsgGetFormObsView, GetFormObsViewCompletedEventArgs>("CBCFormsWS.GetFormObsView", oCReqMsgGetFormObsView, this.GetFormObsViewCompleted, "reqForm", new GetFormObsViewCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetObservedSTDTCompleted: Function;
    GetObservedSTDTAsync(oCReqMsgGetObservedSTDT: CReqMsgGetObservedSTDT): void {
        HelperService.Invoke<CReqMsgGetObservedSTDT, CResMsgGetObservedSTDT, GetObservedSTDTCompletedEventArgs>("CBCFormsWS.GetObservedSTDT", oCReqMsgGetObservedSTDT, this.GetObservedSTDTCompleted, "reqForm", new GetObservedSTDTCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormAuthorisationCompleted: Function;
    GetFormAuthorisationAsync(oCReqMsgGetFormAuthorisation: CReqMsgGetFormAuthorisation): void {
        HelperService.Invoke<CReqMsgGetFormAuthorisation, CResMsgGetFormAuthorisation, GetFormAuthorisationCompletedEventArgs>("CBCFormsWS.GetFormAuthorisation", oCReqMsgGetFormAuthorisation, this.GetFormAuthorisationCompleted, "AuthorisationLevel", new GetFormAuthorisationCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormCommentsCompleted: Function;
    GetFormCommentsAsync(oCReqMsgGetFormComments: CReqMsgGetFormComments): void {
        HelperService.Invoke<CReqMsgGetFormComments, CResMsgGetFormComments, GetFormCommentsCompletedEventArgs>("CBCFormsWS.GetFormComments", oCReqMsgGetFormComments, this.GetFormCommentsCompleted, "reqForm", new GetFormCommentsCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormContextCompleted: Function;
    GetFormContextAsync(oCReqMsgGetFormContext: CReqMsgGetFormContext): void {
        HelperService.Invoke<CReqMsgGetFormContext, CResMsgGetFormContext, GetFormContextCompletedEventArgs>("CBCFormsWS.GetFormContext", oCReqMsgGetFormContext, this.GetFormContextCompleted, "reqForm", new GetFormContextCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormContextbyTypeCompleted: Function;
    GetFormContextbyTypeAsync(oCReqMsgGetFormContextbyType: CReqMsgGetFormContextbyType): void {
        HelperService.Invoke<CReqMsgGetFormContextbyType, CResMsgGetFormContextbyType, GetFormContextbyTypeCompletedEventArgs>("CBCFormsWS.GetFormContextbyType", oCReqMsgGetFormContextbyType, this.GetFormContextbyTypeCompleted, "ContextType", new GetFormContextbyTypeCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormContextByOIDsCompleted: Function;
    GetFormContextByOIDsAsync(oCReqMsgGetFormContextByOIDs: CReqMsgGetFormContextByOIDs): void {
        HelperService.Invoke<CReqMsgGetFormContextByOIDs, CResMsgGetFormContextByOIDs, GetFormContextByOIDsCompletedEventArgs>("CBCFormsWS.GetFormContextByOIDs", oCReqMsgGetFormContextByOIDs, this.GetFormContextByOIDsCompleted, "FormOIDs", new GetFormContextByOIDsCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    SendContinueFormSetCACompleted: Function;
    SendContinueFormSetCAAsync(oCReqMsgSendContinueFormSetCA: CReqMsgSendContinueFormSetCA): void {
        HelperService.Invoke<CReqMsgSendContinueFormSetCA, CResMsgSendContinueFormSetCA, SendContinueFormSetCACompletedEventArgs>("CBCFormsWS.SendContinueFormSetCA", oCReqMsgSendContinueFormSetCA, this.SendContinueFormSetCACompleted, "objRequest", new SendContinueFormSetCACompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetHiMChangesCompleted: Function;
    GetHiMChangesAsync(oCReqMsgGetHiMChanges: CReqMsgGetHiMChanges): void {
        HelperService.Invoke<CReqMsgGetHiMChanges, CResMsgGetHiMChanges, GetHiMChangesCompletedEventArgs>("CBCFormsWS.GetHiMChanges", oCReqMsgGetHiMChanges, this.GetHiMChangesCompleted, "FormOID", new GetHiMChangesCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormSetCodeCompleted: Function;
    GetFormSetCodeAsync(oCReqMsgGetFormSetCode: CReqMsgGetFormSetCode): void {
        HelperService.Invoke<CReqMsgGetFormSetCode, CResMsgGetFormSetCode, GetFormSetCodeCompletedEventArgs>("CBCFormsWS.GetFormSetCode", oCReqMsgGetFormSetCode, this.GetFormSetCodeCompleted, "objRequest", new GetFormSetCodeCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetPatientObservationIndicatorWithHistoryCompleted: Function;
    GetPatientObservationIndicatorWithHistoryAsync(oCReqMsgGetPatientObservationIndicatorWithHistory: CReqMsgGetPatientObservationIndicatorWithHistory): void {
        HelperService.Invoke<CReqMsgGetPatientObservationIndicatorWithHistory, CResMsgGetPatientObservationIndicatorWithHistory, GetPatientObservationIndicatorWithHistoryCompletedEventArgs>("CBCFormsWS.GetPatientObservationIndicatorWithHistory", oCReqMsgGetPatientObservationIndicatorWithHistory, this.GetPatientObservationIndicatorWithHistoryCompleted, "objIndicatorReadParam", new GetPatientObservationIndicatorWithHistoryCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    ManageDataItemIndicatorCompleted: Function;
    ManageDataItemIndicatorAsync(oCReqMsgManageDataItemIndicator: CReqMsgManageDataItemIndicator): void {
        HelperService.Invoke<CReqMsgManageDataItemIndicator, CResMsgManageDataItemIndicator, ManageDataItemIndicatorCompletedEventArgs>("CBCFormsWS.ManageDataItemIndicator", oCReqMsgManageDataItemIndicator, this.ManageDataItemIndicatorCompleted, "objIndicator", new ManageDataItemIndicatorCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    UpdateFormOutComeCompleted: Function;
    UpdateFormOutComeAsync(oCReqMsgUpdateFormOutCome: CReqMsgUpdateFormOutCome): void {
        HelperService.Invoke<CReqMsgUpdateFormOutCome, CResMsgUpdateFormOutCome, UpdateFormOutComeCompletedEventArgs>("CBCFormsWS.UpdateFormOutCome", oCReqMsgUpdateFormOutCome, this.UpdateFormOutComeCompleted, "objReqUpOutcme", new UpdateFormOutComeCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetHiMReferencesCompleted: Function;
    GetHiMReferencesAsync(oCReqMsgGetHiMReferences: CReqMsgGetHiMReferences): void {
        HelperService.Invoke<CReqMsgGetHiMReferences, CResMsgGetHiMReferences, GetHiMReferencesCompletedEventArgs>("CBCFormsWS.GetHiMReferences", oCReqMsgGetHiMReferences, this.GetHiMReferencesCompleted, "FormOID", new GetHiMReferencesCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GroupByCTXCompleted: Function;
    GroupByCTXAsync(oCReqMsgGroupByCTX: CReqMsgGroupByCTX): void {
        HelperService.Invoke<CReqMsgGroupByCTX, CResMsgGroupByCTX, GroupByCTXCompletedEventArgs>("CBCFormsWS.GroupByCTX", oCReqMsgGroupByCTX, this.GroupByCTXCompleted, "readParam", new GroupByCTXCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormByCTXCompleted: Function;
    GetFormByCTXAsync(oCReqMsgGetFormByCTX: CReqMsgGetFormByCTX): void {
        HelperService.Invoke<CReqMsgGetFormByCTX, CResMsgGetFormByCTX, GetFormByCTXCompletedEventArgs>("CBCFormsWS.GetFormByCTX", oCReqMsgGetFormByCTX, this.GetFormByCTXCompleted, "readParam", new GetFormByCTXCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormForCTXNoneCompleted: Function;
    GetFormForCTXNoneAsync(oCReqMsgGetFormForCTXNone: CReqMsgGetFormForCTXNone): void {
        HelperService.Invoke<CReqMsgGetFormForCTXNone, CResMsgGetFormForCTXNone, GetFormForCTXNoneCompletedEventArgs>("CBCFormsWS.GetFormForCTXNone", oCReqMsgGetFormForCTXNone, this.GetFormForCTXNoneCompleted, "readParam", new GetFormForCTXNoneCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormassessmentCompleted: Function;
    GetFormassessmentAsync(oCReqMsgGetFormassessment: CReqMsgGetFormassessment): void {
        HelperService.Invoke<CReqMsgGetFormassessment, CResMsgGetFormassessment, GetFormassessmentCompletedEventArgs>("CBCFormsWS.GetFormassessment", oCReqMsgGetFormassessment, this.GetFormassessmentCompleted, "readParamInfo", new GetFormassessmentCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    IFMFormTemplateMandChkCompleted: Function;
    IFMFormTemplateMandChkAsync(oCReqMsgIFMFormTemplateMandChk: CReqMsgIFMFormTemplateMandChk): void {
        HelperService.Invoke<CReqMsgIFMFormTemplateMandChk, CResMsgIFMFormTemplateMandChk, IFMFormTemplateMandChkCompletedEventArgs>("CBCFormsWS.IFMFormTemplateMandChk", oCReqMsgIFMFormTemplateMandChk, this.IFMFormTemplateMandChkCompleted, "Version", new IFMFormTemplateMandChkCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetPrintFormDetailsCompleted: Function;
    GetPrintFormDetailsAsync(oCReqMsgGetPrintFormDetails: CReqMsgGetPrintFormDetails): void {
        HelperService.Invoke<CReqMsgGetPrintFormDetails, CResMsgGetPrintFormDetails, GetPrintFormDetailsCompletedEventArgs>("CBCFormsWS.GetPrintFormDetails", oCReqMsgGetPrintFormDetails, this.GetPrintFormDetailsCompleted, "reqFormReadInfo", new GetPrintFormDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormPrintPlcyCodeCompleted: Function;
    GetFormPrintPlcyCodeAsync(oCReqMsgGetFormPrintPlcyCode: CReqMsgGetFormPrintPlcyCode): void {
        HelperService.Invoke<CReqMsgGetFormPrintPlcyCode, CResMsgGetFormPrintPlcyCode, GetFormPrintPlcyCodeCompletedEventArgs>("CBCFormsWS.GetFormPrintPlcyCode", oCReqMsgGetFormPrintPlcyCode, this.GetFormPrintPlcyCodeCompleted, "TemporForm", new GetFormPrintPlcyCodeCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    CheckIsInsertedFormCompleted: Function;
    CheckIsInsertedFormAsync(oCReqMsgCheckIsInsertedForm: CReqMsgCheckIsInsertedForm): void {
        HelperService.Invoke<CReqMsgCheckIsInsertedForm, CResMsgCheckIsInsertedForm, CheckIsInsertedFormCompletedEventArgs>("CBCFormsWS.CheckIsInsertedForm", oCReqMsgCheckIsInsertedForm, this.CheckIsInsertedFormCompleted, "oRequest", new CheckIsInsertedFormCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetInsertedFormSetRulesCompleted: Function;
    GetInsertedFormSetRulesAsync(oCReqMsgGetInsertedFormSetRules: CReqMsgGetInsertedFormSetRules): void {
        HelperService.Invoke<CReqMsgGetInsertedFormSetRules, CResMsgGetInsertedFormSetRules, GetInsertedFormSetRulesCompletedEventArgs>("CBCFormsWS.GetInsertedFormSetRules", oCReqMsgGetInsertedFormSetRules, this.GetInsertedFormSetRulesCompleted, "reqFSRuleReadInfo", new GetInsertedFormSetRulesCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetLatestFormByObservationCompleted: Function;
    GetLatestFormByObservationAsync(oCReqMsgGetLatestFormByObservation: CReqMsgGetLatestFormByObservation): void {
        HelperService.Invoke<CReqMsgGetLatestFormByObservation, CResMsgGetLatestFormByObservation, GetLatestFormByObservationCompletedEventArgs>("CBCFormsWS.GetLatestFormByObservation", oCReqMsgGetLatestFormByObservation, this.GetLatestFormByObservationCompleted, "objPatINDTrack", new GetLatestFormByObservationCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormInfoCompleted: Function;
    GetFormInfoAsync(oCReqMsgGetFormInfo: CReqMsgGetFormInfo): void {
        HelperService.Invoke<CReqMsgGetFormInfo, CResMsgGetFormInfo, GetFormInfoCompletedEventArgs>("CBCFormsWS.GetFormInfo", oCReqMsgGetFormInfo, this.GetFormInfoCompleted, "reqForm", new GetFormInfoCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    SendIntrayAlertForOverridedCompleted: Function;
    SendIntrayAlertForOverridedAsync(oCReqMsgSendIntrayAlertForOverrided: CReqMsgSendIntrayAlertForOverrided): void {
        HelperService.Invoke<CReqMsgSendIntrayAlertForOverrided, CResMsgSendIntrayAlertForOverrided, SendIntrayAlertForOverridedCompletedEventArgs>("CBCFormsWS.SendIntrayAlertForOverrided", oCReqMsgSendIntrayAlertForOverrided, this.SendIntrayAlertForOverridedCompleted, "formPatientSensitive", new SendIntrayAlertForOverridedCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    SaveFormDistributionDetailsCompleted: Function;
    SaveFormDistributionDetailsAsync(oCReqMsgSaveFormDistributionDetails: CReqMsgSaveFormDistributionDetails): void {
        HelperService.Invoke<CReqMsgSaveFormDistributionDetails, CResMsgSaveFormDistributionDetails, SaveFormDistributionDetailsCompletedEventArgs>("CBCFormsWS.SaveFormDistributionDetails", oCReqMsgSaveFormDistributionDetails, this.SaveFormDistributionDetailsCompleted, "oLRSTransactionLog", new SaveFormDistributionDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetDistributedFormDetailsCompleted: Function;
    GetDistributedFormDetailsAsync(oCReqMsgGetDistributedFormDetails: CReqMsgGetDistributedFormDetails): void {
        HelperService.Invoke<CReqMsgGetDistributedFormDetails, CResMsgGetDistributedFormDetails, GetDistributedFormDetailsCompletedEventArgs>("CBCFormsWS.GetDistributedFormDetails", oCReqMsgGetDistributedFormDetails, this.GetDistributedFormDetailsCompleted, "PatientOID", new GetDistributedFormDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    InstantiateFormCompleted: Function;
    InstantiateFormAsync(oCReqMsgInstantiateForm: CReqMsgInstantiateForm): void {
        HelperService.Invoke<CReqMsgInstantiateForm, CResMsgInstantiateForm, InstantiateFormCompletedEventArgs>("CBCFormsWS.InstantiateForm", oCReqMsgInstantiateForm, this.InstantiateFormCompleted, "reqForm", new InstantiateFormCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    SendFormsToIntrayCompleted: Function;
    SendFormsToIntrayAsync(oCReqMsgSendFormsToIntray: CReqMsgSendFormsToIntray): void {
        HelperService.Invoke<CReqMsgSendFormsToIntray, CResMsgSendFormsToIntray, SendFormsToIntrayCompletedEventArgs>("CBCFormsWS.SendFormsToIntray", oCReqMsgSendFormsToIntray, this.SendFormsToIntrayCompleted, "FormToSend", new SendFormsToIntrayCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    UpdateFormNACompleted: Function;
    UpdateFormNAAsync(oCReqMsgUpdateFormNA: CReqMsgUpdateFormNA): void {
        HelperService.Invoke<CReqMsgUpdateFormNA, CResMsgUpdateFormNA, UpdateFormNACompletedEventArgs>("CBCFormsWS.UpdateFormNA", oCReqMsgUpdateFormNA, this.UpdateFormNACompleted, "ReqUpdateFormNA", new UpdateFormNACompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    UpdateFormStatusCompleted: Function;
    UpdateFormStatusAsync(oCReqMsgUpdateFormStatus: CReqMsgUpdateFormStatus): void {
        HelperService.Invoke<CReqMsgUpdateFormStatus, CResMsgUpdateFormStatus, UpdateFormStatusCompletedEventArgs>("CBCFormsWS.UpdateFormStatus", oCReqMsgUpdateFormStatus, this.UpdateFormStatusCompleted, "ReqFormWithStatus", new UpdateFormStatusCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    SaveDocAssociationCompleted: Function;
    SaveDocAssociationAsync(oCReqMsgSaveDocAssociation: CReqMsgSaveDocAssociation): void {
        HelperService.Invoke<CReqMsgSaveDocAssociation, CResMsgSaveDocAssociation, SaveDocAssociationCompletedEventArgs>("CBCFormsWS.SaveDocAssociation", oCReqMsgSaveDocAssociation, this.SaveDocAssociationCompleted, "PatientOID", new SaveDocAssociationCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    ManageFormDocAssociationCompleted: Function;
    ManageFormDocAssociationAsync(oCReqMsgManageFormDocAssociation: CReqMsgManageFormDocAssociation): void {
        HelperService.Invoke<CReqMsgManageFormDocAssociation, CResMsgManageFormDocAssociation, ManageFormDocAssociationCompletedEventArgs>("CBCFormsWS.ManageFormDocAssociation", oCReqMsgManageFormDocAssociation, this.ManageFormDocAssociationCompleted, "newdocoid", new ManageFormDocAssociationCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    DeleteFormDocAssociationCompleted: Function;
    DeleteFormDocAssociationAsync(oCReqMsgDeleteFormDocAssociation: CReqMsgDeleteFormDocAssociation): void {
        HelperService.Invoke<CReqMsgDeleteFormDocAssociation, CResMsgDeleteFormDocAssociation, DeleteFormDocAssociationCompletedEventArgs>("CBCFormsWS.DeleteFormDocAssociation", oCReqMsgDeleteFormDocAssociation, this.DeleteFormDocAssociationCompleted, "docoid", new DeleteFormDocAssociationCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    PendingAuthorisationCompleted: Function;
    PendingAuthorisationAsync(oCReqMsgPendingAuthorisation: CReqMsgPendingAuthorisation): void {
        HelperService.Invoke<CReqMsgPendingAuthorisation, CResMsgPendingAuthorisation, PendingAuthorisationCompletedEventArgs>("CBCFormsWS.PendingAuthorisation", oCReqMsgPendingAuthorisation, this.PendingAuthorisationCompleted, "formOID", new PendingAuthorisationCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    SendForAuthorisationCompleted: Function;
    SendForAuthorisationAsync(oCReqMsgSendForAuthorisation: CReqMsgSendForAuthorisation): void {
        HelperService.Invoke<CReqMsgSendForAuthorisation, CResMsgSendForAuthorisation, SendForAuthorisationCompletedEventArgs>("CBCFormsWS.SendForAuthorisation", oCReqMsgSendForAuthorisation, this.SendForAuthorisationCompleted, "RoleOID", new SendForAuthorisationCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    InsertFormCompleted: Function;
    InsertFormAsync(oCReqMsgInsertForm: CReqMsgInsertForm): void {
        HelperService.Invoke<CReqMsgInsertForm, CResMsgInsertForm, InsertFormCompletedEventArgs>("CBCFormsWS.InsertForm", oCReqMsgInsertForm, this.InsertFormCompleted, "ParentFormOID", new InsertFormCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    InsertMandFormObsCompleted: Function;
    InsertMandFormObsAsync(oCReqMsgInsertMandFormObs: CReqMsgInsertMandFormObs): void {
        HelperService.Invoke<CReqMsgInsertMandFormObs, CResMsgInsertMandFormObs, InsertMandFormObsCompletedEventArgs>("CBCFormsWS.InsertMandFormObs", oCReqMsgInsertMandFormObs, this.InsertMandFormObsCompleted, "ParentFormOID", new InsertMandFormObsCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    SaveHiMReferencesCompleted: Function;
    SaveHiMReferencesAsync(oCReqMsgSaveHiMReferences: CReqMsgSaveHiMReferences): void {
        HelperService.Invoke<CReqMsgSaveHiMReferences, CResMsgSaveHiMReferences, SaveHiMReferencesCompletedEventArgs>("CBCFormsWS.SaveHiMReferences", oCReqMsgSaveHiMReferences, this.SaveHiMReferencesCompleted, "reqFormHiMRef", new SaveHiMReferencesCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    SaveHiMRefIdentifierCompleted: Function;
    SaveHiMRefIdentifierAsync(oCReqMsgSaveHiMRefIdentifier: CReqMsgSaveHiMRefIdentifier): void {
        HelperService.Invoke<CReqMsgSaveHiMRefIdentifier, CResMsgSaveHiMRefIdentifier, SaveHiMRefIdentifierCompletedEventArgs>("CBCFormsWS.SaveHiMRefIdentifier", oCReqMsgSaveHiMRefIdentifier, this.SaveHiMRefIdentifierCompleted, "FormHiMRefOID", new SaveHiMRefIdentifierCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormsDetailsCompleted: Function;
    GetFormsDetailsAsync(oCReqMsgGetFormsDetails: CReqMsgGetFormsDetails): void {
        HelperService.Invoke<CReqMsgGetFormsDetails, CResMsgGetFormsDetails, GetFormsDetailsCompletedEventArgs>("CBCFormsWS.GetFormsDetails", oCReqMsgGetFormsDetails, this.GetFormsDetailsCompleted, "reqFormListInfo", new GetFormsDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    SaveCompleted: Function;
    SaveAsync(oCReqMsgSave: CReqMsgSave): void {
        HelperService.Invoke<CReqMsgSave, CResMsgSave, SaveCompletedEventArgs>("CBCFormsWS.Save", oCReqMsgSave, this.SaveCompleted, "isStatusChanged", new SaveCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetLatestFormOIDCompleted: Function;
    GetLatestFormOIDAsync(oCReqMsgGetLatestFormOID: CReqMsgGetLatestFormOID): void {
        HelperService.Invoke<CReqMsgGetLatestFormOID, CResMsgGetLatestFormOID, GetLatestFormOIDCompletedEventArgs>("CBCFormsWS.GetLatestFormOID", oCReqMsgGetLatestFormOID, this.GetLatestFormOIDCompleted, "objFormContentParam", new GetLatestFormOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    CustomSaveCompleted: Function;
    CustomSaveAsync(oCReqMsgCustomSave: CReqMsgCustomSave): void {
        HelperService.Invoke<CReqMsgCustomSave, CResMsgCustomSave, CustomSaveCompletedEventArgs>("CBCFormsWS.CustomSave", oCReqMsgCustomSave, this.CustomSaveCompleted, "FormTemplate", new CustomSaveCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    TemporarySaveCompleted: Function;
    TemporarySaveAsync(oCReqMsgTemporarySave: CReqMsgTemporarySave): void {
        HelperService.Invoke<CReqMsgTemporarySave, CResMsgTemporarySave, TemporarySaveCompletedEventArgs>("CBCFormsWS.TemporarySave", oCReqMsgTemporarySave, this.TemporarySaveCompleted, "ReqForm", new TemporarySaveCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    DeleteTemporaryFormCompleted: Function;
    DeleteTemporaryFormAsync(oCReqMsgDeleteTemporaryForm: CReqMsgDeleteTemporaryForm): void {
        HelperService.Invoke<CReqMsgDeleteTemporaryForm, CResMsgDeleteTemporaryForm, DeleteTemporaryFormCompletedEventArgs>("CBCFormsWS.DeleteTemporaryForm", oCReqMsgDeleteTemporaryForm, this.DeleteTemporaryFormCompleted, "pFormOID", new DeleteTemporaryFormCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    ReadBulkAuthoriseCompleted: Function;
    ReadBulkAuthoriseAsync(oCReqMsgReadBulkAuthorise: CReqMsgReadBulkAuthorise): void {
        HelperService.Invoke<CReqMsgReadBulkAuthorise, CResMsgReadBulkAuthorise, ReadBulkAuthoriseCompletedEventArgs>("CBCFormsWS.ReadBulkAuthorise", oCReqMsgReadBulkAuthorise, this.ReadBulkAuthoriseCompleted, "Taskoid", new ReadBulkAuthoriseCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetModifiedDataitemsValuesCompleted: Function;
    GetModifiedDataitemsValuesAsync(oCReqMsgGetModifiedDataitemsValues: CReqMsgGetModifiedDataitemsValues): void {
        HelperService.Invoke<CReqMsgGetModifiedDataitemsValues, CResMsgGetModifiedDataitemsValues, GetModifiedDataitemsValuesCompletedEventArgs>("CBCFormsWS.GetModifiedDataitemsValues", oCReqMsgGetModifiedDataitemsValues, this.GetModifiedDataitemsValuesCompleted, "info", new GetModifiedDataitemsValuesCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetDIHistoryValuesCompleted: Function;
    GetDIHistoryValuesAsync(oCReqMsgGetDIHistoryValues: CReqMsgGetDIHistoryValues): void {
        HelperService.Invoke<CReqMsgGetDIHistoryValues, CResMsgGetDIHistoryValues, GetDIHistoryValuesCompletedEventArgs>("CBCFormsWS.GetDIHistoryValues", oCReqMsgGetDIHistoryValues, this.GetDIHistoryValuesCompleted, "info", new GetDIHistoryValuesCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetDataitemHistoryValuesCompleted: Function;
    GetDataitemHistoryValuesAsync(oCReqMsgGetDataitemHistoryValues: CReqMsgGetDataitemHistoryValues): void {
        HelperService.Invoke<CReqMsgGetDataitemHistoryValues, CResMsgGetDataitemHistoryValues, GetDataitemHistoryValuesCompletedEventArgs>("CBCFormsWS.GetDataitemHistoryValues", oCReqMsgGetDataitemHistoryValues, this.GetDataitemHistoryValuesCompleted, "info", new GetDataitemHistoryValuesCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetSectionHistoryValuesCompleted: Function;
    GetSectionHistoryValuesAsync(oCReqMsgGetSectionHistoryValues: CReqMsgGetSectionHistoryValues): void {
        HelperService.Invoke<CReqMsgGetSectionHistoryValues, CResMsgGetSectionHistoryValues, GetSectionHistoryValuesCompletedEventArgs>("CBCFormsWS.GetSectionHistoryValues", oCReqMsgGetSectionHistoryValues, this.GetSectionHistoryValuesCompleted, "info", new GetSectionHistoryValuesCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetDataitemLatestValuesCompleted: Function;
    GetDataitemLatestValuesAsync(oCReqMsgGetDataitemLatestValues: CReqMsgGetDataitemLatestValues): void {
        HelperService.Invoke<CReqMsgGetDataitemLatestValues, CResMsgGetDataitemLatestValues, GetDataitemLatestValuesCompletedEventArgs>("CBCFormsWS.GetDataitemLatestValues", oCReqMsgGetDataitemLatestValues, this.GetDataitemLatestValuesCompleted, "info", new GetDataitemLatestValuesCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetLatestDataitemValuesCompleted: Function;
    GetLatestDataitemValuesAsync(oCReqMsgGetLatestDataitemValues: CReqMsgGetLatestDataitemValues): void {
        HelperService.Invoke<CReqMsgGetLatestDataitemValues, CResMsgGetLatestDataitemValues, GetLatestDataitemValuesCompletedEventArgs>("CBCFormsWS.GetLatestDataitemValues", oCReqMsgGetLatestDataitemValues, this.GetLatestDataitemValuesCompleted, "info", new GetLatestDataitemValuesCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetGVDetailsCompleted: Function;
    GetGVDetailsAsync(oCReqMsgGetGVDetails: CReqMsgGetGVDetails): void {
        HelperService.Invoke<CReqMsgGetGVDetails, CResMsgGetGVDetails, GetGVDetailsCompletedEventArgs>("CBCFormsWS.GetGVDetails", oCReqMsgGetGVDetails, this.GetGVDetailsCompleted, "formName", new GetGVDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormBasicdetailsCompleted: Function;
    GetFormBasicdetailsAsync(oCReqMsgGetFormBasicdetails: CReqMsgGetFormBasicdetails): void {
        HelperService.Invoke<CReqMsgGetFormBasicdetails, CResMsgGetFormBasicdetails, GetFormBasicdetailsCompletedEventArgs>("CBCFormsWS.GetFormBasicdetails", oCReqMsgGetFormBasicdetails, this.GetFormBasicdetailsCompleted, "info", new GetFormBasicdetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    IsLCVEnabledCompleted: Function;
    IsLCVEnabledAsync(oCReqMsgIsLCVEnabled: CReqMsgIsLCVEnabled): void {
        HelperService.Invoke<CReqMsgIsLCVEnabled, CResMsgIsLCVEnabled, IsLCVEnabledCompletedEventArgs>("CBCFormsWS.IsLCVEnabled", oCReqMsgIsLCVEnabled, this.IsLCVEnabledCompleted, "FormTempOID", new IsLCVEnabledCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    IsViewChangesEnabledCompleted: Function;
    IsViewChangesEnabledAsync(oCReqMsgIsViewChangesEnabled: CReqMsgIsViewChangesEnabled): void {
        HelperService.Invoke<CReqMsgIsViewChangesEnabled, CResMsgIsViewChangesEnabled, IsViewChangesEnabledCompletedEventArgs>("CBCFormsWS.IsViewChangesEnabled", oCReqMsgIsViewChangesEnabled, this.IsViewChangesEnabledCompleted, "FormTempOID", new IsViewChangesEnabledCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormPropertiesCompleted: Function;
    GetFormPropertiesAsync(oCReqMsgGetFormProperties: CReqMsgGetFormProperties): void {
        HelperService.Invoke<CReqMsgGetFormProperties, CResMsgGetFormProperties, GetFormPropertiesCompletedEventArgs>("CBCFormsWS.GetFormProperties", oCReqMsgGetFormProperties, this.GetFormPropertiesCompleted, "FormTempOID", new GetFormPropertiesCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    ListSearchCompleted: Function;
    ListSearchAsync(oCReqMsgListSearch: CReqMsgListSearch): void {
        HelperService.Invoke<CReqMsgListSearch, CResMsgListSearch, ListSearchCompletedEventArgs>("CBCFormsWS.ListSearch", oCReqMsgListSearch, this.ListSearchCompleted, "reqFormListInfo", new ListSearchCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormBasicByFormOIDCompleted: Function;
    GetFormBasicByFormOIDAsync(oCReqMsgGetFormBasicByFormOID: CReqMsgGetFormBasicByFormOID): void {
        HelperService.Invoke<CReqMsgGetFormBasicByFormOID, CResMsgGetFormBasicByFormOID, GetFormBasicByFormOIDCompletedEventArgs>("CBCFormsWS.GetFormBasicByFormOID", oCReqMsgGetFormBasicByFormOID, this.GetFormBasicByFormOIDCompleted, "reqFormListInfo", new GetFormBasicByFormOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormByFormOIDCompleted: Function;
    GetFormByFormOIDAsync(oCReqMsgGetFormByFormOID: CReqMsgGetFormByFormOID): void {
        HelperService.Invoke<CReqMsgGetFormByFormOID, CResMsgGetFormByFormOID, GetFormByFormOIDCompletedEventArgs>("CBCFormsWS.GetFormByFormOID", oCReqMsgGetFormByFormOID, this.GetFormByFormOIDCompleted, "reqFormListInfo", new GetFormByFormOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    RetrieveUsersSearchCompleted: Function;
    RetrieveUsersSearchAsync(oCReqMsgRetrieveUsersSearch: CReqMsgRetrieveUsersSearch): void {
        HelperService.Invoke<CReqMsgRetrieveUsersSearch, CResMsgRetrieveUsersSearch, RetrieveUsersSearchCompletedEventArgs>("CBCFormsWS.RetrieveUsersSearch", oCReqMsgRetrieveUsersSearch, this.RetrieveUsersSearchCompleted, "reqFormListInfo", new RetrieveUsersSearchCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    RetrieveUsersSearchByCodeCompleted: Function;
    RetrieveUsersSearchByCodeAsync(oCReqMsgRetrieveUsersSearchByCode: CReqMsgRetrieveUsersSearchByCode): void {
        HelperService.Invoke<CReqMsgRetrieveUsersSearchByCode, CResMsgRetrieveUsersSearchByCode, RetrieveUsersSearchByCodeCompletedEventArgs>("CBCFormsWS.RetrieveUsersSearchByCode", oCReqMsgRetrieveUsersSearchByCode, this.RetrieveUsersSearchByCodeCompleted, "reqFormListInfo", new RetrieveUsersSearchByCodeCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetAllFormChildsCompleted: Function;
    GetAllFormChildsAsync(oCReqMsgGetAllFormChilds: CReqMsgGetAllFormChilds): void {
        HelperService.Invoke<CReqMsgGetAllFormChilds, CResMsgGetAllFormChilds, GetAllFormChildsCompletedEventArgs>("CBCFormsWS.GetAllFormChilds", oCReqMsgGetAllFormChilds, this.GetAllFormChildsCompleted, "PatientOID", new GetAllFormChildsCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetChildFormDetailsCompleted: Function;
    GetChildFormDetailsAsync(oCReqMsgGetChildFormDetails: CReqMsgGetChildFormDetails): void {
        HelperService.Invoke<CReqMsgGetChildFormDetails, CResMsgGetChildFormDetails, GetChildFormDetailsCompletedEventArgs>("CBCFormsWS.GetChildFormDetails", oCReqMsgGetChildFormDetails, this.GetChildFormDetailsCompleted, "FormOID", new GetChildFormDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetAllFormChildsForADHOCCheckCompleted: Function;
    GetAllFormChildsForADHOCCheckAsync(oCReqMsgGetAllFormChildsForADHOCCheck: CReqMsgGetAllFormChildsForADHOCCheck): void {
        HelperService.Invoke<CReqMsgGetAllFormChildsForADHOCCheck, CResMsgGetAllFormChildsForADHOCCheck, GetAllFormChildsForADHOCCheckCompletedEventArgs>("CBCFormsWS.GetAllFormChildsForADHOCCheck", oCReqMsgGetAllFormChildsForADHOCCheck, this.GetAllFormChildsForADHOCCheckCompleted, "ParentFormOID", new GetAllFormChildsForADHOCCheckCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormDataCompleted: Function;
    GetFormDataAsync(oCReqMsgGetFormData: CReqMsgGetFormData): void {
        HelperService.Invoke<CReqMsgGetFormData, CResMsgGetFormData, GetFormDataCompletedEventArgs>("CBCFormsWS.GetFormData", oCReqMsgGetFormData, this.GetFormDataCompleted, "formStatusHistory", new GetFormDataCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormAssoCompleted: Function;
    GetFormAssoAsync(oCReqMsgGetFormAsso: CReqMsgGetFormAsso): void {
        HelperService.Invoke<CReqMsgGetFormAsso, CResMsgGetFormAsso, GetFormAssoCompletedEventArgs>("CBCFormsWS.GetFormAsso", oCReqMsgGetFormAsso, this.GetFormAssoCompleted, "identifyingType", new GetFormAssoCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormObservationDetailsCompleted: Function;
    GetFormObservationDetailsAsync(oCReqMsgGetFormObservationDetails: CReqMsgGetFormObservationDetails): void {
        HelperService.Invoke<CReqMsgGetFormObservationDetails, CResMsgGetFormObservationDetails, GetFormObservationDetailsCompletedEventArgs>("CBCFormsWS.GetFormObservationDetails", oCReqMsgGetFormObservationDetails, this.GetFormObservationDetailsCompleted, "PatientOID", new GetFormObservationDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormDataNFECompleted: Function;
    GetFormDataNFEAsync(oCReqMsgGetFormDataNFE: CReqMsgGetFormDataNFE): void {
        HelperService.Invoke<CReqMsgGetFormDataNFE, CResMsgGetFormDataNFE, GetFormDataNFECompletedEventArgs>("CBCFormsWS.GetFormDataNFE", oCReqMsgGetFormDataNFE, this.GetFormDataNFECompleted, "PatientOID", new GetFormDataNFECompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    RetrieveFormDataCompleted: Function;
    RetrieveFormDataAsync(oCReqMsgRetrieveFormData: CReqMsgRetrieveFormData): void {
        HelperService.Invoke<CReqMsgRetrieveFormData, CResMsgRetrieveFormData, RetrieveFormDataCompletedEventArgs>("CBCFormsWS.RetrieveFormData", oCReqMsgRetrieveFormData, this.RetrieveFormDataCompleted, "formStatusHistory", new RetrieveFormDataCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetLatestFormDataCompleted: Function;
    GetLatestFormDataAsync(oCReqMsgGetLatestFormData: CReqMsgGetLatestFormData): void {
        HelperService.Invoke<CReqMsgGetLatestFormData, CResMsgGetLatestFormData, GetLatestFormDataCompletedEventArgs>("CBCFormsWS.GetLatestFormData", oCReqMsgGetLatestFormData, this.GetLatestFormDataCompleted, "patientOID", new GetLatestFormDataCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormDataByOIDsCompleted: Function;
    GetFormDataByOIDsAsync(oCReqMsgGetFormDataByOIDs: CReqMsgGetFormDataByOIDs): void {
        HelperService.Invoke<CReqMsgGetFormDataByOIDs, CResMsgGetFormDataByOIDs, GetFormDataByOIDsCompletedEventArgs>("CBCFormsWS.GetFormDataByOIDs", oCReqMsgGetFormDataByOIDs, this.GetFormDataByOIDsCompleted, "formOIDs", new GetFormDataByOIDsCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormDataByOIDNFECompleted: Function;
    GetFormDataByOIDNFEAsync(oCReqMsgGetFormDataByOIDNFE: CReqMsgGetFormDataByOIDNFE): void {
        HelperService.Invoke<CReqMsgGetFormDataByOIDNFE, CResMsgGetFormDataByOIDNFE, GetFormDataByOIDNFECompletedEventArgs>("CBCFormsWS.GetFormDataByOIDNFE", oCReqMsgGetFormDataByOIDNFE, this.GetFormDataByOIDNFECompleted, "patientOID", new GetFormDataByOIDNFECompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetUserAccessedFormCompleted: Function;
    GetUserAccessedFormAsync(oCReqMsgGetUserAccessedForm: CReqMsgGetUserAccessedForm): void {
        HelperService.Invoke<CReqMsgGetUserAccessedForm, CResMsgGetUserAccessedForm, GetUserAccessedFormCompletedEventArgs>("CBCFormsWS.GetUserAccessedForm", oCReqMsgGetUserAccessedForm, this.GetUserAccessedFormCompleted, "MaxCount", new GetUserAccessedFormCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    PatientFormDefaultSetCompleted: Function;
    PatientFormDefaultSetAsync(oCReqMsgPatientFormDefaultSet: CReqMsgPatientFormDefaultSet): void {
        HelperService.Invoke<CReqMsgPatientFormDefaultSet, CResMsgPatientFormDefaultSet, PatientFormDefaultSetCompletedEventArgs>("CBCFormsWS.PatientFormDefaultSet", oCReqMsgPatientFormDefaultSet, this.PatientFormDefaultSetCompleted, "TheatreEvntOID", new PatientFormDefaultSetCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    PatientFormInstCountCompleted: Function;
    PatientFormInstCountAsync(oCReqMsgPatientFormInstCount: CReqMsgPatientFormInstCount): void {
        HelperService.Invoke<CReqMsgPatientFormInstCount, CResMsgPatientFormInstCount, PatientFormInstCountCompletedEventArgs>("CBCFormsWS.PatientFormInstCount", oCReqMsgPatientFormInstCount, this.PatientFormInstCountCompleted, "flag", new PatientFormInstCountCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    PatientChildFormDefaultSetCompleted: Function;
    PatientChildFormDefaultSetAsync(oCReqMsgPatientChildFormDefaultSet: CReqMsgPatientChildFormDefaultSet): void {
        HelperService.Invoke<CReqMsgPatientChildFormDefaultSet, CResMsgPatientChildFormDefaultSet, PatientChildFormDefaultSetCompletedEventArgs>("CBCFormsWS.PatientChildFormDefaultSet", oCReqMsgPatientChildFormDefaultSet, this.PatientChildFormDefaultSetCompleted, "FormCode", new PatientChildFormDefaultSetCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetFormDisturbutionListCompleted: Function;
    GetFormDisturbutionListAsync(oCReqMsgGetFormDisturbutionList: CReqMsgGetFormDisturbutionList): void {
        HelperService.Invoke<CReqMsgGetFormDisturbutionList, CResMsgGetFormDisturbutionList, GetFormDisturbutionListCompletedEventArgs>("CBCFormsWS.GetFormDisturbutionList", oCReqMsgGetFormDisturbutionList, this.GetFormDisturbutionListCompleted, "PatientOID", new GetFormDisturbutionListCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    RetrieveCustomListCompleted: Function;
    RetrieveCustomListAsync(oCReqMsgRetrieveCustomList: CReqMsgRetrieveCustomList): void {
        HelperService.Invoke<CReqMsgRetrieveCustomList, CResMsgRetrieveCustomList, RetrieveCustomListCompletedEventArgs>("CBCFormsWS.RetrieveCustomList", oCReqMsgRetrieveCustomList, this.RetrieveCustomListCompleted, "reqCustomListInfo", new RetrieveCustomListCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    ManageContextCompleted: Function;
    ManageContextAsync(oCReqMsgManageContext: CReqMsgManageContext): void {
        HelperService.Invoke<CReqMsgManageContext, CResMsgManageContext, ManageContextCompletedEventArgs>("CBCFormsWS.ManageContext", oCReqMsgManageContext, this.ManageContextCompleted, "UpdateContext", new ManageContextCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    BulkUpdateTreatmentFnFrmCxtCompleted: Function;
    BulkUpdateTreatmentFnFrmCxtAsync(oCReqMsgBulkUpdateTreatmentFnFrmCxt: CReqMsgBulkUpdateTreatmentFnFrmCxt): void {
        HelperService.Invoke<CReqMsgBulkUpdateTreatmentFnFrmCxt, CResMsgBulkUpdateTreatmentFnFrmCxt, BulkUpdateTreatmentFnFrmCxtCompletedEventArgs>("CBCFormsWS.BulkUpdateTreatmentFnFrmCxt", oCReqMsgBulkUpdateTreatmentFnFrmCxt, this.BulkUpdateTreatmentFnFrmCxtCompleted, "treatMentFunOID", new BulkUpdateTreatmentFnFrmCxtCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetCareCoordinatorCompleted: Function;
    GetCareCoordinatorAsync(oCReqMsgGetCareCoordinator: CReqMsgGetCareCoordinator): void {
        HelperService.Invoke<CReqMsgGetCareCoordinator, CResMsgGetCareCoordinator, GetCareCoordinatorCompletedEventArgs>("CBCFormsWS.GetCareCoordinator", oCReqMsgGetCareCoordinator, this.GetCareCoordinatorCompleted, "objRequest", new GetCareCoordinatorCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    UpdatePTACompleted: Function;
    UpdatePTAAsync(oCReqMsgUpdatePTA: CReqMsgUpdatePTA): void {
        HelperService.Invoke<CReqMsgUpdatePTA, CResMsgUpdatePTA, UpdatePTACompletedEventArgs>("CBCFormsWS.UpdatePTA", oCReqMsgUpdatePTA, this.UpdatePTACompleted, "objRequest", new UpdatePTACompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    ManageFormStatusCompleted: Function;
    ManageFormStatusAsync(oCReqMsgManageFormStatus: CReqMsgManageFormStatus): void {
        HelperService.Invoke<CReqMsgManageFormStatus, CResMsgManageFormStatus, ManageFormStatusCompletedEventArgs>("CBCFormsWS.ManageFormStatus", oCReqMsgManageFormStatus, this.ManageFormStatusCompleted, "RoleOID", new ManageFormStatusCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetLatestFormCompleted: Function;
    GetLatestFormAsync(oCReqMsgGetLatestForm: CReqMsgGetLatestForm): void {
        HelperService.Invoke<CReqMsgGetLatestForm, CResMsgGetLatestForm, GetLatestFormCompletedEventArgs>("CBCFormsWS.GetLatestForm", oCReqMsgGetLatestForm, this.GetLatestFormCompleted, "objFormLatest", new GetLatestFormCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    GetLatestFormByDTCompleted: Function;
    GetLatestFormByDTAsync(oCReqMsgGetLatestFormByDT: CReqMsgGetLatestFormByDT): void {
        HelperService.Invoke<CReqMsgGetLatestFormByDT, CResMsgGetLatestFormByDT, GetLatestFormByDTCompletedEventArgs>("CBCFormsWS.GetLatestFormByDT", oCReqMsgGetLatestFormByDT, this.GetLatestFormByDTCompleted, "objFormLatest", new GetLatestFormByDTCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    FormSuspendDeferCompleted: Function;
    FormSuspendDeferAsync(oCReqMsgFormSuspendDefer: CReqMsgFormSuspendDefer): void {
        HelperService.Invoke<CReqMsgFormSuspendDefer, CResMsgFormSuspendDefer, FormSuspendDeferCompletedEventArgs>("CBCFormsWS.FormSuspendDefer", oCReqMsgFormSuspendDefer, this.FormSuspendDeferCompleted, "SameStatusAgain", new FormSuspendDeferCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    UpdateStatusHistoryTaskOIDCompleted: Function;
    UpdateStatusHistoryTaskOIDAsync(oCReqMsgUpdateStatusHistoryTaskOID: CReqMsgUpdateStatusHistoryTaskOID): void {
        HelperService.Invoke<CReqMsgUpdateStatusHistoryTaskOID, CResMsgUpdateStatusHistoryTaskOID, UpdateStatusHistoryTaskOIDCompletedEventArgs>("CBCFormsWS.UpdateStatusHistoryTaskOID", oCReqMsgUpdateStatusHistoryTaskOID, this.UpdateStatusHistoryTaskOIDCompleted, "RequestHistory", new UpdateStatusHistoryTaskOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    AuthorizeFormCompleted: Function;
    AuthorizeFormAsync(oCReqMsgAuthorizeForm: CReqMsgAuthorizeForm): void {
        HelperService.Invoke<CReqMsgAuthorizeForm, CResMsgAuthorizeForm, AuthorizeFormCompletedEventArgs>("CBCFormsWS.AuthorizeForm", oCReqMsgAuthorizeForm, this.AuthorizeFormCompleted, "RoleOID", new AuthorizeFormCompletedEventArgs(), prototypeList, charPropertyLookup);
    }

    InFormUserCompleted: Function;
    InFormUserAsync(oCReqMsgInFormUser: CReqMsgInFormUser): void {
        HelperService.Invoke<CReqMsgInFormUser, CResMsgInFormUser, InFormUserCompletedEventArgs>("CBCFormsWS.InFormUser", oCReqMsgInFormUser, this.InFormUserCompleted, "sComments", new InFormUserCompletedEventArgs(), prototypeList, charPropertyLookup);
    }
}

export class GetFormPolicyCompletedEventArgs {
    public Result: CResMsgGetFormPolicy;
    public Error: any;
}
export class GetFormStatusCompletedEventArgs {
    public Result: CResMsgGetFormStatus;
    public Error: any;
}
export class GetFormWorkingStatusCompletedEventArgs {
    public Result: CResMsgGetFormWorkingStatus;
    public Error: any;
}
export class GetFrmStatusCompletedEventArgs {
    public Result: CResMsgGetFrmStatus;
    public Error: any;
}
export class ClinicalFlagCompletedEventArgs {
    public Result: CResMsgClinicalFlag;
    public Error: any;
}
export class GetFSTaskMgmtStatusCompletedEventArgs {
    public Result: CResMsgGetFSTaskMgmtStatus;
    public Error: any;
}
export class GetFormWSCompletedEventArgs {
    public Result: CResMsgGetFormWS;
    public Error: any;
}
export class GetFormStatusHistoryDetailsCompletedEventArgs {
    public Result: CResMsgGetFormStatusHistoryDetails;
    public Error: any;
}
export class ContinueFormSetCompletedEventArgs {
    public Result: CResMsgContinueFormSet;
    public Error: any;
}
export class UpdateFormPatientCompletedEventArgs {
    public Result: CResMsgUpdateFormPatient;
    public Error: any;
}
export class RetrieveFormbyFilterCompletedEventArgs {
    public Result: CResMsgRetrieveFormbyFilter;
    public Error: any;
}
export class GetFSChildListCompletedEventArgs {
    public Result: CResMsgGetFSChildList;
    public Error: any;
}
export class GetFSChildListNFECompletedEventArgs {
    public Result: CResMsgGetFSChildListNFE;
    public Error: any;
}
export class GetInitiateRightsForUserCompletedEventArgs {
    public Result: CResMsgGetInitiateRightsForUser;
    public Error: any;
}
export class ReadCompletedEventArgs {
    public Result: CResMsgRead;
    public Error: any;
}
export class RetrieveFormSetRulesCompletedEventArgs {
    public Result: CResMsgRetrieveFormSetRules;
    public Error: any;
}
export class RetrieveObsoleteFormDataCompletedEventArgs {
    public Result: CResMsgRetrieveObsoleteFormData;
    public Error: any;
}
export class GetAssesedDetailsCompletedEventArgs {
    public Result: CResMsgGetAssesedDetails;
    public Error: any;
}
export class GetUserCPRoleCompletedEventArgs {
    public Result: CResMsgGetUserCPRole;
    public Error: any;
}
export class GetTSDetailsCompletedEventArgs {
    public Result: CResMsgGetTSDetails;
    public Error: any;
}
export class GetRDLTemplateCompletedEventArgs {
    public Result: CResMsgGetRDLTemplate;
    public Error: any;
}
export class RetrieveFMOIDByTaskCompletedEventArgs {
    public Result: CResMsgRetrieveFMOIDByTask;
    public Error: any;
}
export class GetFormDataItemImageCompletedEventArgs {
    public Result: CResMsgGetFormDataItemImage;
    public Error: any;
}
export class GetFormDIImageTempCompletedEventArgs {
    public Result: CResMsgGetFormDIImageTemp;
    public Error: any;
}
export class GetFormDocAssociationCompletedEventArgs {
    public Result: CResMsgGetFormDocAssociation;
    public Error: any;
}
export class GetFormDetailsCompletedEventArgs {
    public Result: CResMsgGetFormDetails;
    public Error: any;
}
export class GetFormBasicDetCompletedEventArgs {
    public Result: CResMsgGetFormBasicDet;
    public Error: any;
}
export class GetFormDetailsFromIntrayCompletedEventArgs {
    public Result: CResMsgGetFormDetailsFromIntray;
    public Error: any;
}
export class GetAuthObserverCompletedEventArgs {
    public Result: CResMsgGetAuthObserver;
    public Error: any;
}
export class GetFormObsViewCompletedEventArgs {
    public Result: CResMsgGetFormObsView;
    public Error: any;
}
export class GetObservedSTDTCompletedEventArgs {
    public Result: CResMsgGetObservedSTDT;
    public Error: any;
}
export class GetFormAuthorisationCompletedEventArgs {
    public Result: CResMsgGetFormAuthorisation;
    public Error: any;
}
export class GetFormCommentsCompletedEventArgs {
    public Result: CResMsgGetFormComments;
    public Error: any;
}
export class GetFormContextCompletedEventArgs {
    public Result: CResMsgGetFormContext;
    public Error: any;
}
export class GetFormContextbyTypeCompletedEventArgs {
    public Result: CResMsgGetFormContextbyType;
    public Error: any;
}
export class GetFormContextByOIDsCompletedEventArgs {
    public Result: CResMsgGetFormContextByOIDs;
    public Error: any;
}
export class SendContinueFormSetCACompletedEventArgs {
    public Result: CResMsgSendContinueFormSetCA;
    public Error: any;
}
export class GetHiMChangesCompletedEventArgs {
    public Result: CResMsgGetHiMChanges;
    public Error: any;
}
export class GetFormSetCodeCompletedEventArgs {
    public Result: CResMsgGetFormSetCode;
    public Error: any;
}
export class GetPatientObservationIndicatorWithHistoryCompletedEventArgs {
    public Result: CResMsgGetPatientObservationIndicatorWithHistory;
    public Error: any;
}
export class ManageDataItemIndicatorCompletedEventArgs {
    public Result: CResMsgManageDataItemIndicator;
    public Error: any;
}
export class UpdateFormOutComeCompletedEventArgs {
    public Result: CResMsgUpdateFormOutCome;
    public Error: any;
}
export class GetHiMReferencesCompletedEventArgs {
    public Result: CResMsgGetHiMReferences;
    public Error: any;
}
export class GroupByCTXCompletedEventArgs {
    public Result: CResMsgGroupByCTX;
    public Error: any;
}
export class GetFormByCTXCompletedEventArgs {
    public Result: CResMsgGetFormByCTX;
    public Error: any;
}
export class GetFormForCTXNoneCompletedEventArgs {
    public Result: CResMsgGetFormForCTXNone;
    public Error: any;
}
export class GetFormassessmentCompletedEventArgs {
    public Result: CResMsgGetFormassessment;
    public Error: any;
}
export class IFMFormTemplateMandChkCompletedEventArgs {
    public Result: CResMsgIFMFormTemplateMandChk;
    public Error: any;
}
export class GetPrintFormDetailsCompletedEventArgs {
    public Result: CResMsgGetPrintFormDetails;
    public Error: any;
}
export class GetFormPrintPlcyCodeCompletedEventArgs {
    public Result: CResMsgGetFormPrintPlcyCode;
    public Error: any;
}
export class CheckIsInsertedFormCompletedEventArgs {
    public Result: CResMsgCheckIsInsertedForm;
    public Error: any;
}
export class GetInsertedFormSetRulesCompletedEventArgs {
    public Result: CResMsgGetInsertedFormSetRules;
    public Error: any;
}
export class GetLatestFormByObservationCompletedEventArgs {
    public Result: CResMsgGetLatestFormByObservation;
    public Error: any;
}
export class GetFormInfoCompletedEventArgs {
    public Result: CResMsgGetFormInfo;
    public Error: any;
}
export class SendIntrayAlertForOverridedCompletedEventArgs {
    public Result: CResMsgSendIntrayAlertForOverrided;
    public Error: any;
}
export class SaveFormDistributionDetailsCompletedEventArgs {
    public Result: CResMsgSaveFormDistributionDetails;
    public Error: any;
}
export class GetDistributedFormDetailsCompletedEventArgs {
    public Result: CResMsgGetDistributedFormDetails;
    public Error: any;
}
export class InstantiateFormCompletedEventArgs {
    public Result: CResMsgInstantiateForm;
    public Error: any;
}
export class SendFormsToIntrayCompletedEventArgs {
    public Result: CResMsgSendFormsToIntray;
    public Error: any;
}
export class UpdateFormNACompletedEventArgs {
    public Result: CResMsgUpdateFormNA;
    public Error: any;
}
export class UpdateFormStatusCompletedEventArgs {
    public Result: CResMsgUpdateFormStatus;
    public Error: any;
}
export class SaveDocAssociationCompletedEventArgs {
    public Result: CResMsgSaveDocAssociation;
    public Error: any;
}
export class ManageFormDocAssociationCompletedEventArgs {
    public Result: CResMsgManageFormDocAssociation;
    public Error: any;
}
export class DeleteFormDocAssociationCompletedEventArgs {
    public Result: CResMsgDeleteFormDocAssociation;
    public Error: any;
}
export class PendingAuthorisationCompletedEventArgs {
    public Result: CResMsgPendingAuthorisation;
    public Error: any;
}
export class SendForAuthorisationCompletedEventArgs {
    public Result: CResMsgSendForAuthorisation;
    public Error: any;
}
export class InsertFormCompletedEventArgs {
    public Result: CResMsgInsertForm;
    public Error: any;
}
export class InsertMandFormObsCompletedEventArgs {
    public Result: CResMsgInsertMandFormObs;
    public Error: any;
}
export class SaveHiMReferencesCompletedEventArgs {
    public Result: CResMsgSaveHiMReferences;
    public Error: any;
}
export class SaveHiMRefIdentifierCompletedEventArgs {
    public Result: CResMsgSaveHiMRefIdentifier;
    public Error: any;
}
export class GetFormsDetailsCompletedEventArgs {
    public Result: CResMsgGetFormsDetails;
    public Error: any;
}
export class SaveCompletedEventArgs {
    public Result: CResMsgSave;
    public Error: any;
}
export class GetLatestFormOIDCompletedEventArgs {
    public Result: CResMsgGetLatestFormOID;
    public Error: any;
}
export class CustomSaveCompletedEventArgs {
    public Result: CResMsgCustomSave;
    public Error: any;
}
export class TemporarySaveCompletedEventArgs {
    public Result: CResMsgTemporarySave;
    public Error: any;
}
export class DeleteTemporaryFormCompletedEventArgs {
    public Result: CResMsgDeleteTemporaryForm;
    public Error: any;
}
export class ReadBulkAuthoriseCompletedEventArgs {
    public Result: CResMsgReadBulkAuthorise;
    public Error: any;
}
export class GetModifiedDataitemsValuesCompletedEventArgs {
    public Result: CResMsgGetModifiedDataitemsValues;
    public Error: any;
}
export class GetDIHistoryValuesCompletedEventArgs {
    public Result: CResMsgGetDIHistoryValues;
    public Error: any;
}
export class GetDataitemHistoryValuesCompletedEventArgs {
    public Result: CResMsgGetDataitemHistoryValues;
    public Error: any;
}
export class GetSectionHistoryValuesCompletedEventArgs {
    public Result: CResMsgGetSectionHistoryValues;
    public Error: any;
}
export class GetDataitemLatestValuesCompletedEventArgs {
    public Result: CResMsgGetDataitemLatestValues;
    public Error: any;
}
export class GetLatestDataitemValuesCompletedEventArgs {
    public Result: CResMsgGetLatestDataitemValues;
    public Error: any;
}
export class GetGVDetailsCompletedEventArgs {
    public Result: CResMsgGetGVDetails;
    public Error: any;
}
export class GetFormBasicdetailsCompletedEventArgs {
    public Result: CResMsgGetFormBasicdetails;
    public Error: any;
}
export class IsLCVEnabledCompletedEventArgs {
    public Result: CResMsgIsLCVEnabled;
    public Error: any;
}
export class IsViewChangesEnabledCompletedEventArgs {
    public Result: CResMsgIsViewChangesEnabled;
    public Error: any;
}
export class GetFormPropertiesCompletedEventArgs {
    public Result: CResMsgGetFormProperties;
    public Error: any;
}
export class ListSearchCompletedEventArgs {
    public Result: CResMsgListSearch;
    public Error: any;
}
export class GetFormBasicByFormOIDCompletedEventArgs {
    public Result: CResMsgGetFormBasicByFormOID;
    public Error: any;
}
export class GetFormByFormOIDCompletedEventArgs {
    public Result: CResMsgGetFormByFormOID;
    public Error: any;
}
export class RetrieveUsersSearchCompletedEventArgs {
    public Result: CResMsgRetrieveUsersSearch;
    public Error: any;
}
export class RetrieveUsersSearchByCodeCompletedEventArgs {
    public Result: CResMsgRetrieveUsersSearchByCode;
    public Error: any;
}
export class GetAllFormChildsCompletedEventArgs {
    public Result: CResMsgGetAllFormChilds;
    public Error: any;
}
export class GetChildFormDetailsCompletedEventArgs {
    public Result: CResMsgGetChildFormDetails;
    public Error: any;
}
export class GetAllFormChildsForADHOCCheckCompletedEventArgs {
    public Result: CResMsgGetAllFormChildsForADHOCCheck;
    public Error: any;
}
export class GetFormDataCompletedEventArgs {
    public Result: CResMsgGetFormData;
    public Error: any;
}
export class GetFormAssoCompletedEventArgs {
    public Result: CResMsgGetFormAsso;
    public Error: any;
}
export class GetFormObservationDetailsCompletedEventArgs {
    public Result: CResMsgGetFormObservationDetails;
    public Error: any;
}
export class GetFormDataNFECompletedEventArgs {
    public Result: CResMsgGetFormDataNFE;
    public Error: any;
}
export class RetrieveFormDataCompletedEventArgs {
    public Result: CResMsgRetrieveFormData;
    public Error: any;
}
export class GetLatestFormDataCompletedEventArgs {
    public Result: CResMsgGetLatestFormData;
    public Error: any;
}
export class GetFormDataByOIDsCompletedEventArgs {
    public Result: CResMsgGetFormDataByOIDs;
    public Error: any;
}
export class GetFormDataByOIDNFECompletedEventArgs {
    public Result: CResMsgGetFormDataByOIDNFE;
    public Error: any;
}
export class GetUserAccessedFormCompletedEventArgs {
    public Result: CResMsgGetUserAccessedForm;
    public Error: any;
}
export class PatientFormDefaultSetCompletedEventArgs {
    public Result: CResMsgPatientFormDefaultSet;
    public Error: any;
}
export class PatientFormInstCountCompletedEventArgs {
    public Result: CResMsgPatientFormInstCount;
    public Error: any;
}
export class PatientChildFormDefaultSetCompletedEventArgs {
    public Result: CResMsgPatientChildFormDefaultSet;
    public Error: any;
}
export class GetFormDisturbutionListCompletedEventArgs {
    public Result: CResMsgGetFormDisturbutionList;
    public Error: any;
}
export class RetrieveCustomListCompletedEventArgs {
    public Result: CResMsgRetrieveCustomList;
    public Error: any;
}
export class ManageContextCompletedEventArgs {
    public Result: CResMsgManageContext;
    public Error: any;
}
export class BulkUpdateTreatmentFnFrmCxtCompletedEventArgs {
    public Result: CResMsgBulkUpdateTreatmentFnFrmCxt;
    public Error: any;
}
export class GetCareCoordinatorCompletedEventArgs {
    public Result: CResMsgGetCareCoordinator;
    public Error: any;
}
export class UpdatePTACompletedEventArgs {
    public Result: CResMsgUpdatePTA;
    public Error: any;
}
export class ManageFormStatusCompletedEventArgs {
    public Result: CResMsgManageFormStatus;
    public Error: any;
}
export class GetLatestFormCompletedEventArgs {
    public Result: CResMsgGetLatestForm;
    public Error: any;
}
export class GetLatestFormByDTCompletedEventArgs {
    public Result: CResMsgGetLatestFormByDT;
    public Error: any;
}
export class FormSuspendDeferCompletedEventArgs {
    public Result: CResMsgFormSuspendDefer;
    public Error: any;
}
export class UpdateStatusHistoryTaskOIDCompletedEventArgs {
    public Result: CResMsgUpdateStatusHistoryTaskOID;
    public Error: any;
}
export class AuthorizeFormCompletedEventArgs {
    public Result: CResMsgAuthorizeForm;
    public Error: any;
}
export class InFormUserCompletedEventArgs {
    public Result: CResMsgInFormUser;
    public Error: any;
}
export class CReqMsgGetAllFormChilds {
    FormOIDBC: number;
    PatientOIDBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgGetAllFormChilds {
    oContextInformation: CContextInformation;
    resFormChilds: ObservableCollection<Form>;
}
export class Form {
    HraPermissions: number;
    OID: number;
    PredecessorOID: number;
    CreatedBy: string;
    IsADHOC: string;
    IFMParentFormOID: number;
    IFMFormChildOID: number;
    IFMChildFormOID: number;
    OwnerOrganisationOID: number;
    FormType: number;
    FormTemplateOID: number;
    TemplateStatus: number;
    TemplateVersion: number;
    ActiveStatus: number;
    WorkingStatus: number;
    CategoryOID: number;
    IsSignificant: number;
    IsPolicyOverridden: number;
    MandatoryFilled: number;
    IsCommented: number;
    HasHistory: number;
    AssigneeName: string;
    AttributeValue: string;
    AssigneeOID: number;
    UsersOID: number;
    AssigneeType: string;
    AssigneeOIDList: string;
    IsDistributed: number;
    HasAttachment: number;
    Sequence: number;
    Predecessor: number;
    FormName: string;
    TemplateCode: string;
    TemplateName: string;
    FormCode: string;
    Description: string;
    CategoryName: string;
    Status: string;
    OutCome: string;
    OwnerOrganisationName: string;
    InitiatedRole: string;
    AssignedTo: string;
    FinalisedRole: string;
    IFMRCCode: string;
    LastObservedRole: string;
    CancelledRole: string;
    LastModifiedRole: string;
    AuthorisedRole: string;
    LastModifiedOn: DateTime;
    ObservedOn: DateTime;
    FinalisedOn: DateTime;
    CancelledOn: DateTime;
    InitiatedOn: DateTime;
    AuthorisedOn: DateTime;
    ModifiedAt: DateTime;
    CreatedAt: DateTime;
    SourceOID: string;
    SourceType: string;
    Source: string;
    UIFElementCode: string;
    Authorisation: FormAuthorisation;
    InitiatedBy: number;
    PatientOID: string;
    WFTaskListOID: number;
    ReferenceOID: number;
    AuthorisationUserOID: string;
    AuthorisationLevel: string;
    TemplateOrigVersion: string;
    IsOptional: number;
    References: string;
    UsageContext: number;
    SealType: string;
    SealImage: string;
    GblVaroid: number;
    ParentFormOID: number;
    CareSetViewOID: number;
    FormIdentifyingCode: string;
    FormIdentifyingType: string;
    NotApplicable: string;
    TotalCount: number;
    FormMode: number;
    TreatmentFnName: string;
    FormComments: string;
    UserName: string;
    FirstName: string;
    LastName: string;
    JobRoleName: string;
    CanObsolete: string;
    CCTYPCode: string;
    SetViewOID: number;
    PatientOid: number;
    CareCoordinatorOID: number;
    AttributeValueOID: number;
    RoleOIDBC: number;
    CareCoordinatorType: string;
    Message: string;
    Comment: string;
    CommentsOID: number;
    IsAutoFinalize: string;
    DisableTaskManagement: string;
    IsQuickFinalize: string;
    IsSendForAuthChked: boolean;
    IsSendForAuthChkedAny: boolean;
    IsFinaliseChkDis: boolean;
    MenuCode: string;
    CACode: string;
    IsFormInserted: string;
    IsSaveCoorinator: boolean;
    isEscPcyAttached: boolean;
    IsFormSetFinalised: boolean;
    PrevModifiedAt: DateTime;
    IsMandatoryFilled: string;
    ObservationDTTM: DateTime;
    ReleaseVersion: byte;
    HiddenColumns: string;
    ActualParentOID: number;
    EncType: string;
    EncStatus: string;
    EncClinicalLead: string;
    AuthorName: string;
    JobRoleOid: number;
    EncounterOid: number;
    EncounterStatus: string;
    EncounterStartDttm: DateTime;
    CurrentHistoryOID: number;
    IFMFormDataOID: number;
    AssessedBy: string;
    ISAUTOSENDFORAUTHLAUNCH: boolean;
    ISPendingAuth: boolean;
    IsPDFExtract: boolean;
    IsVerifyPolicy: boolean;
    ObserverList: string;
    FrmData: ObservableCollection<byte>;
    FormTemplate: ObservableCollection<byte>;
    CanStrikeOUT: boolean;
    CanAuthoriseForm: boolean;
    CanSaveHRA: boolean;
    ViewName: string;
    FormOIds: string;
    IsDefaultCV: number;
    IsAssociatedAlerts: boolean;
    IsRestApi: boolean;
    IsTemporary: boolean;
    IsInboundMsgCall: boolean;
    IncompleteForm: InCompleteForm;
    ViewTemplate: ObservableCollection<ViewTemplate>;
    FormAssociations: ObservableCollection<FormAssociations>;
    Policy: ObservableCollection<FormPolicy>;
    KeyWord: ObservableCollection<string>;
    Term: ObservableCollection<FormTerm>;
    DIHistory: ObservableCollection<FormDataitemHistory>;
    DIImage: ObservableCollection<FormDataitemImage>;
    Reference: ObservableCollection<FormReference>;
    StatusHistory: ObservableCollection<FormStatusHistory>;
    Data: ObservableCollection<FormData>;
    Comments: ObservableCollection<FormComments>;
    Context: ObservableCollection<FormContext>;
    Observer: ObservableCollection<FormObserver>;
    Removeobserver: ObservableCollection<FormObserver>;
    Child: ObservableCollection<FormChild>;
    Recepient: ObservableCollection<FormRecepient>;
    AuthorisationUser: ObservableCollection<FormAuthorisationUser>;
    PolicyAuthoriserList: ObservableCollection<PolicyAuthoriser>;
    ResolvedViewContent: ObservableCollection<string>;
}
export class ViewTemplate {
    OID: number;
    Version: number;
    Sequence: number;
    PageSize: number;
    PageOrientation: number;
    FormTemplateOID: number;
    ViewName: string;
    OperationMode: string;
    Description: string;
    IsDefault: number;
    IsIncludeImageSection: string;
    IsDefaultTemplate: string;
    IscanDocu: string;
    IsViewDIHistory: string;
    RequiresUpdate: number;
    LastModified: DateTime;
    ViewContent: ObservableCollection<byte>;
    Status: string;
    OwnerOrganisationOID: number;
    CultureCode: string;
    IFMFormHistoryOID: number;
    CreatedAt: DateTime;
    Modifiedby: string;
    Createdby: string;
    CreatedbyOID: number;
    Roles: ObservableCollection<ViewTemplateRef>;
    HeaderFooters: ObservableCollection<ViewTemplateHeaderFooter>;
    OIDS: ObservableCollection<number>;
}
export class ViewTemplateRef {
    OID: number;
    IdentifyingOID: number;
    IdentifyingType: string;
    Name: string;
    OperationMode: string;
}
export class ViewTemplateHeaderFooter {
    OID: number;
    HeaderFooterOID: number;
    CustVwOID: number;
    OwnerOrganisationOID: number;
    Firstpageheaderoid: number;
    Firstpagefooteroid: number;
    Subsequentpageheaderoid: number;
    Subsequentpagefooteroid: number;
    ContentType: number;
    HeaderFooterName: string;
    viname: string;
    HOName: string;
    OperationMode: string;
    Firstheadername: string;
    Firstfootername: string;
    Subheadername: string;
    Subfootername: string;
}
export class FormAssociations {
    IdentifyingType: string;
    InstanceName: string;
    AssociatedOid: string;
    SubSectionIndex: number;
    SectionIndex: number;
    FormstatusHistoryOID: number;
}
export class FormPolicy {
    OID: number;
    FormOID: number;
    PolicyOID: number;
    Status: number;
    Severity: number;
    Overridden: number;
    PolicyName: string;
    DataItem: string;
    HealthOrganisation: string;
    PolicyDescription: string;
    OverriddenBy: string;
    Reason: string;
    Comments: string;
    EffectFrom: DateTime;
    EffectUntil: DateTime;
    OverriddenOn: DateTime;
    Type: number;
    FormData: ObservableCollection<byte>;
    SourceOID: string;
    SourceType: string;
}
export class FormTerm {
    OID: number;
    FormOID: number;
    ConceptType: number;
    Scheme: string;
    Version: number;
    Code: string;
    Description: string;
    Name: string;
    SourceOID: string;
    SourceType: string;
}
export class FormDataitemHistory {
    OID: number;
    FormOID: number;
    FormHistoryOID: number;
    Section: string;
    DataItemName: string;
    SectionType: string;
    IsCited: number;
    InstanceIndex: number;
    DataitemCaption: string;
    SectionIndex: string;
    Value: string;
    DataType: number;
    ObservedOn: DateTime;
    ObservedOnDST: string;
    ObservedBy: string;
    ModifiedOn: DateTime;
    IsDeleted: boolean;
    ModifiedBy: string;
    NameValPair: string;
    PageIndex: number;
    Page: string;
}
export class FormDataitemImage {
    OID: number;
    FormOID: number;
    FormHistoryOID: number;
    DataItemName: string;
    TemplateOID: number;
    DataitemInstanceName: string;
    ImageInfo: ObservableCollection<byte>;
}
export class FormReference {
    OID: number;
    FormOID: number;
    IdentifyingOID: number;
    IdentifyingRole: string;
    Name: string;
    SourceOID: string;
    SourceType: string;
}
export class FormStatusHistory {
    OID: number;
    FormOID: number;
    Status: number;
    Author: string;
    Remarks: string;
    Comments: string;
    FromDate: DateTime;
    ToDate: DateTime;
    FormStatus: number;
    FormName: string;
    Data: ObservableCollection<byte>;
    OwnerOrganisationOID: number;
    ModifiedAt: DateTime;
    CreatedBy: number;
    FormMode: number;
    IFMFormHistoryOID: number;
    Name: string;
    InitiatedROLE: string;
    FinalisedDTTM: DateTime;
    AuthorisedDTTM: DateTime;
    CancelledDTTM: DateTime;
    WFTaskListOID: number;
    RoleOID: number;
    PsPrintContentOID: number;
    ScheduledDTTM: DateTime;
    RoleProfileOID: number;
    PrintStatus: string;
    SourceOID: string;
    SourceType: string;
    CareActivityCode: string;
    ReasonCode: string;
    RecipientName: string;
    RecipientOrganisation: string;
    PatientOID: number;
    FormTemplateOID: number;
    FormType: number;
    FormWorkingStatus: number;
    DIHistory: ObservableCollection<FormDataitemHistory>;
}
export class FormData {
    OID: number;
    FormTemplateOID: number;
    FormName: string;
    LocalizedName: string;
    FormOID: number;
    Data: ObservableCollection<byte>;
    FormHistoryOID: number;
    CareSetViewOID: number;
    ObservedOn: DateTime;
    AssessedOn: DateTime;
    ObserverOIDs: string;
    ModifiedBy: string;
    IsOptional: number;
    TemplateOID: number;
    IsLigthWeight: boolean;
    SourceOID: string;
    SourceType: string;
    LastModifiedOn: DateTime;
    PatientOID: number;
    FormMode: number;
}
export class FormComments {
    OID: number;
    FormOID: number;
    SectionIndex: number;
    SectionName: string;
    DataItemName: string;
    Value: string;
    Text: string;
    CommentedBy: string;
    ObservedOn: DateTime;
    CommentedOn: DateTime;
}
export class FormContext {
    IsEncounterModified: boolean;
    OID: number;
    PatientOID: number;
    OldPatientoid: number;
    FormOID: number;
    ContextType: number;
    AttributeName: string;
    AttributeValue: string;
    RowIndex: number;
    IFMRCcode: string;
    FormType: number;
    ObservedOn: DateTime;
    FormCode: string;
    FormName: string;
    FormTemplateOID: number;
    TemplateStatus: number;
    Description: string;
    ActiveStatus: number;
    WorkingStatus: number;
    CategoryOID: number;
    IsSignificant: number;
    IsPolicyOverridden: number;
    IsCommented: number;
    HasHistory: number;
    IsDistributed: number;
    ReferenceOID: number;
    SourceType: string;
    HasAttachment: number;
    OutCome: string;
    InitiatedDTTM: DateTime;
    InitiatedRole: string;
    LastModifiedRole: string;
    LastModifiedDTTM: DateTime;
    CreatedAt: DateTime;
    ModifiedAt: DateTime;
    OwnerOrganisationOID: number;
    CreatedBy: string;
    Status: string;
    CanObsolete: string;
    SetViewOID: number;
    OwnerOrganisationName: string;
    AuthorisationUserOID: string;
    AuthorisationLevel: string;
    IdentifyingName: string;
    SealType: string;
    SealImage: string;
    Rowvalue: number;
    Rownumber: number;
    Totalcount: number;
    Parenttotal: number;
    Parentname: string;
    StartDTTM: DateTime;
    Clinician: string;
    Location: string;
    DisplayStatus: string;
    Severity: string;
    EncounterType: string;
    EncounterTypeTerm: string;
    ProblemOnsetDTTM: DateTime;
    ProblemResolvedDTTM: DateTime;
    ProblemRecordedDTTM: DateTime;
    ProblemStatusCode: string;
    RiskIsSignificant: number;
    ProblemDescription: string;
    ProblemTerm: string;
    ReleaseVersion: byte;
    RefReceivedDate: DateTime;
    ReferredbyHO: string;
    RefIDType: string;
    RefIDName: string;
    RiskTerm: string;
    HiddenColumns: string;
    AttributeValueOID: number;
    PatientOid: number;
    SourceOID: string;
    FormStatusHisOID: number;
    UIFElementCode: string;
    FormObservations: ObservableCollection<FormObservationInfo>;
}
export class FormObservationInfo {
    AssessedByOID: string;
    AssessedBy: string;
}
export class FormObserver {
    OID: number;
    OperationMode: number;
    FormOID: number;
    Operation: number;
    AuthorRole: string;
    ObserverRole: string;
    ObservedOn: DateTime;
    ModifiedOn: DateTime;
    ModifiedBy: string;
    AuthorOID: number;
    ObserverRoleOID: number;
    CreatedBy: number;
    WorkingStatus: number;
    IdentifyingType: string;
    IdentifyingValue: string;
    IFMFormStatusHisOID: number;
    CareProviderOID: number;
    RoleProfileOID: number;
    OrganisationOID: number;
    IdentifyingName: string;
    SpecialtyName: string;
    TeamName: string;
    SpecialtyOID: number;
    TeamOID: number;
    SourceOID: string;
    SourceType: string;
    Status: string;
}
export class FormChild {
    OID: number;
    ParentFormOID: number;
    ChildFormOID: number;
    Optional: number;
    Sequence: number;
    Predecessor: number;
    Form: Form;
}
export class FormRecepient {
    OID: number;
    DistOID: number;
    FormOID: number;
    TaskOID: number;
    IdentifyingOID: number;
    CareCoordinatorOID: number;
    PatientOID: string;
    PrevIdentifyingOID: number;
    IdentifyingRole: string;
    PrevIdentifyingRole: string;
    Name: string;
    PrevName: string;
    CallBackComment: string;
    CreatedAt: DateTime;
    Type: number;
    Version: number;
    ChildFormList: string;
    OwnerOrganisationOID: number;
    UserName: string;
    Organisation: string;
    CreatedBy: string;
    CareCoordinatorType: string;
    CareCoordinatorName: string;
    WorkingStatus: number;
    RecipientType: string;
    RecipientTypeCode: string;
    DistributeMode: string;
    DistributeModeCode: string;
    DistributionAddress: string;
    Status: string;
    IsPrimaryRecipient: string;
    ModifiedAt: DateTime;
    UserRoleProfile: string;
    UserType: string;
    SourceOID: string;
    SourceType: string;
    DistributeEmailAddress: string;
    Child: ObservableCollection<string>;
    CareCoordinatorList: ObservableCollection<number>;
}
export class FormAuthorisation {
    OID: number;
    AuthorisedOn: DateTime;
    AuthLevel: number;
    AuthorisedBy: string;
    AuthorisedRole: string;
    IFMFormOID: number;
}
export class FormAuthorisationUser {
    OID: number;
    UserName: string;
    AuthLevel: number;
    WFTaskListOID: number;
    UserOID: number;
    IFMFormOID: number;
}
export class PolicyAuthoriser {
    OID: number;
    IFMPolicyRequestorOID: number;
    IFMFormTemplateOID: number;
    AuthoriserRoleOID: number;
    AuthoriserRoleName: string;
    AuthoriserLevel: number;
    AuthorisorType: string;
}
export class InCompleteForm {
    BaseFormOID: number;
    OID: number;
    FormDataOID: number;
    FormStatusHistOID: number;
}
export class FormDistributionDetails extends Form {
    UserOID: number;
    PatientBanner: string;
    ConfigEmailID: string;
    SenderName: string;
    EmailContent: string;
    ImageXML: string;
    MailSubject: string;
    NETemplateName: string;
    LorenzoUser: string;
    LorenzoUserRole: string;
    NHSOrganisationName: string;
    NHSOrganisationAddress: string;
    LorenzoUserTelephone: string;
    LorenzoUserEmailAddress: string;
    DistributeEmailAddress: string;
    FormRecipient: ObservableCollection<FormRecepient>;
    AttachmentContent: ObservableCollection<byte>;
    AttachmentFileName: ObservableCollection<string>;
}
export class CReqMsgGetChildFormDetails {
    FormOIDBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgGetChildFormDetails {
    oContextInformation: CContextInformation;
    resFormChilds: ObservableCollection<Form>;
}
export class CReqMsgGetAllFormChildsForADHOCCheck {
    FormOIDBC: number;
    ParentFormOIDBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgGetAllFormChildsForADHOCCheck {
    resFormChilds: boolean;
    oContextInformation: CContextInformation;
    objresFormChilds: ObservableCollection<Form>;
}
export class CReqMsgGetFormData {
    formOIDBC: number;
    formStatusHistoryBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormData {
    oContextInformation: CContextInformation;
    resFormData: ObservableCollection<FormData>;
}
export class CReqMsgGetFormAsso {
    formOIDBC: number;
    formStatusHistoryBC: number;
    identifyingTypeBC: string;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormAsso {
    oContextInformation: CContextInformation;
    Imags: ObservableCollection<FormAssociations>;
}
export class CReqMsgGetFormObservationDetails {
    formOIDBC: number;
    PatientOIDBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormObservationDetails {
    oContextInformation: CContextInformation;
    ObservationValues: ObservableCollection<FormObservation>;
}
export class FormObservation {
    Name: string;
    UOM: string;
    Value: string;
    ObservationDTTM: DateTime;
    InstanceName: string;
    InstanceIndex: number;
    IdentifierValue: string;
}
export class CReqMsgGetFormDataNFE {
    formOIDBC: number;
    formStatusHistoryBC: number;
    PatientOIDBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormDataNFE {
    oContextInformation: CContextInformation;
    resFormData: ObservableCollection<FormData>;
}
export class CReqMsgRetrieveFormData {
    formOIDBC: number;
    patientOIDBC: number;
    formStatusHistoryBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgRetrieveFormData {
    oContextInformation: CContextInformation;
    resFormData: ObservableCollection<FormData>;
}
export class CReqMsgGetLatestFormData {
    formOIDBC: number;
    patientOIDBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgGetLatestFormData {
    oContextInformation: CContextInformation;
    resFormData: ObservableCollection<FormData>;
}
export class CReqMsgGetFormDataByOIDs {
    formOIDsBC: string;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormDataByOIDs {
    oContextInformation: CContextInformation;
    resFormData: ObservableCollection<FormData>;
}
export class CReqMsgGetFormDataByOIDNFE {
    formOIDsBC: string;
    patientOIDBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormDataByOIDNFE {
    oContextInformation: CContextInformation;
    resFormData: ObservableCollection<FormData>;
}
export class CReqMsgGetUserAccessedForm {
    UserOIDBC: number;
    PatientOIDBC: number;
    MaxCountBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgGetUserAccessedForm {
    oContextInformation: CContextInformation;
    UserAccessedForms: ObservableCollection<EPRUserAccessedFormInfo>;
}
export class EPRUserAccessedFormInfo {
    UserOID: number;
    PatientOID: number;
    FormOID: number;
    FormName: string;
    FormTemplateOID: number;
}
export class CReqMsgPatientFormDefaultSet {
    PatientOIDBC: number;
    FormCodeBC: string;
    TheatreEvntOIDBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgPatientFormDefaultSet {
    oContextInformation: CContextInformation;
    PatientFormDefaultSet: ObservableCollection<PatientFormDefaultSet>;
}
export class PatientFormDefaultSet {
    FormID: number;
    ChildFormOID: number;
    Status: number;
    InitiatedDateTime: DateTime;
    LastModifiedDateTime: DateTime;
    FinalisedDateTime: DateTime;
    Encounter: string;
    EncounterOID: number;
    AuthorName: string;
    InstanceCount: number;
    InstCount: number;
    SummaryOutcome: string;
}
export class CReqMsgPatientFormInstCount {
    PatientOIDBC: number;
    FormCodeBC: string;
    flagBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgPatientFormInstCount {
    oContextInformation: CContextInformation;
    PatientFormInstCount: ObservableCollection<PatientFormInstCount>;
}
export class PatientFormInstCount {
    InstanceCount: number;
    Status: number;
}
export class CReqMsgPatientChildFormDefaultSet {
    PatientOIDBC: number;
    FormCodeBC: string;
    oContextInformation: CContextInformation;
}
export class CResMsgPatientChildFormDefaultSet {
    oContextInformation: CContextInformation;
    PatientFormDefaultSet: ObservableCollection<PatientFormDefaultSet>;
}
export class CReqMsgGetFormDisturbutionList {
    FormOIDBC: number;
    PatientOIDBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormDisturbutionList {
    oContextInformation: CContextInformation;
    resFormrecipient: ObservableCollection<FormRecepient>;
}
export class CReqMsgRetrieveCustomList {
    reqCustomListInfoBC: CustomFilterParameterInfo;
    oContextInformation: CContextInformation;
}
export class CustomFilterParameterInfo {
    OId: number;
    name: string;
    description: string;
    sortOrder: number;
    startDttm: DateTime;
    endDttm: DateTime;
    lSCATCode: string;
    groupName: string;
    lISTYCode: string;
    usersOId: number;
    criteriaXML: ObservableCollection<byte>;
    sOrder: number;
    OID: number;
    Name: string;
    Description: string;
    SortOrder: number;
    StartDttm: DateTime;
    EndDttm: DateTime;
    LSCATCode: string;
    GroupName: string;
    LISTYCode: string;
    UsersOId: number;
    CriteriaXML: ObservableCollection<byte>;
    SOrder: number;
}
export class CResMsgRetrieveCustomList {
    oContextInformation: CContextInformation;
    resCustomListInfo: ObservableCollection<CustomFilterParameterInfo>;
}
export class CReqMsgManageContext {
    UpdateContextBC: string;
    oContextInformation: CContextInformation;
    reqFormContextBC: ObservableCollection<FormContext>;
}
export class CResMsgManageContext {
    oContextInformation: CContextInformation;
}
export class CReqMsgBulkUpdateTreatmentFnFrmCxt {
    patientOIDBC: number;
    encounterOIDBC: number;
    identifyingOIDBC: number;
    identifyingTypeBC: string;
    treatMentFunOIDBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgBulkUpdateTreatmentFnFrmCxt {
    oContextInformation: CContextInformation;
}
export class CReqMsgGetCareCoordinator {
    objRequestBC: FormRecepient;
    oContextInformation: CContextInformation;
}
export class CResMsgGetCareCoordinator {
    objResponse: FormRecepient;
    oContextInformation: CContextInformation;
}
export class CReqMsgUpdatePTA {
    objRequestBC: FormRecepient;
    oContextInformation: CContextInformation;
}
export class CResMsgUpdatePTA {
    rowAffected: number;
    oContextInformation: CContextInformation;
}
export class CReqMsgManageFormStatus {
    FormManageStatusBC: Form;
    RoleOIDBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgManageFormStatus {
    oContextInformation: CContextInformation;
}
export class CReqMsgGetLatestForm {
    objFormLatestBC: FormLatestReadParamInfo;
    oContextInformation: CContextInformation;
}
export class FormLatestReadParamInfo {
    FormCode: string;
    PatientOID: number;
    EncounterOID: number;
    OrganisationOID: number;
    CGetFinalisedForm: string;
    CIncludeStruckOut: string;
    CIncludeAuthorise: string;
    DTTM: DateTime;
}
export class CResMsgGetLatestForm {
    latestFormData: LatestFormData;
    oContextInformation: CContextInformation;
}
export class LatestFormData {
    FormOID: number;
    FormCode: string;
    FormName: string;
    FinalisedDTTM: DateTime;
    FinalisedFormCount: number;
    WorkingStatus: number;
    IsLatestFormFinalised: boolean;
    FormTemplateOID: number;
}
export class CReqMsgGetLatestFormByDT {
    objFormLatestBC: FormLatestReadParamInfo;
    oContextInformation: CContextInformation;
}
export class CResMsgGetLatestFormByDT {
    latestFormData: LatestFormData;
    oContextInformation: CContextInformation;
}
export class CReqMsgFormSuspendDefer {
    SuspendDeferBC: Form;
    SameStatusAgainBC: boolean;
    oContextInformation: CContextInformation;
}
export class CResMsgFormSuspendDefer {
    oContextInformation: CContextInformation;
}
export class CReqMsgUpdateStatusHistoryTaskOID {
    RequestHistoryBC: FormStatusHistory;
    oContextInformation: CContextInformation;
}
export class CResMsgUpdateStatusHistoryTaskOID {
    oContextInformation: CContextInformation;
}
export class CReqMsgAuthorizeForm {
    reqFormBC: Form;
    RoleOIDBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgAuthorizeForm {
    oContextInformation: CContextInformation;
}
export class CReqMsgInFormUser {
    FormOIDBC: number;
    sPatientIDBC: number;
    sCommentsBC: string;
    oContextInformation: CContextInformation;
    arrFormRecepientsBC: ObservableCollection<FormRecepient>;
    oLRSTransactionLogBC: ObservableCollection<LRSTransactionLog>;
}
export class LRSTransactionLog extends CLZOObject {
    LRComments: string;
    LRSOID: number;
    PageSize: number;
    RecordCount: number;
    PageIndex: number;
    LRSTransTypeCode: string;
    ErrorStatus: string;
    TransLogCount: number;
    LRReasonCode: string;
    AccReasonCode: string;
    AccessReasonFreetext: string;
    ErrorDetails: string;
    ErrorDTTM: DateTime;
    RequestDTTM: DateTime;
    ResponseDTTM: DateTime;
    LastReplayedDTTM: DateTime;
    EffectiveDTTM: DateTime;
    AlertReqFlag: string;
    AuthorUID: string;
    AuthorUserName: string;
    AuthorURP: string;
    AuthorURPName: string;
    BPqualifiercode: string;
    BPqualifierRowOID: string;
    LRStatusChangeReason: string;
    TargetUID: string;
    TargetUserName: string;
    TargetURP: string;
    TargetURPName: string;
    OrganisationCode: string;
    OrganisationName: string;
    AuthorUserCode: string;
    UserWorkGroupCode: string;
    UserWorkGroupName: string;
    TargetWorkGroupCode: string;
    TargetWorkGroupName: string;
    Status: string;
    DateQualifier: string;
    ActiveFrom: DateTime;
    ActiveTo: DateTime;
    PatientNHSNumber: string;
    PatientFullName: string;
    IdentifyingOID: number;
    ArtefactType: string;
    ArtefactName: string;
    RequestMsgID: string;
    DeviceID: string;
    LRSIdentifier: string;
    LRExpiryDTTM: string;
    IsLRExists: string;
    LRCreateType: string;
    PatientOID: number;
    PrimaryID: string;
    SecondaryID: string;
    OwnerOrganisationOID: number;
    UserDetails: UserLoggedIn;
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
export class PatientIndicatorDataValue extends CLZOObject {
    PatientOID: number;
    DOA: DateTime;
    EncStartDTTM: DateTime;
    IsApplyRuletoEpisode: string;
    EncounterOID: number;
    IndicatorRuleOID: number;
    Rules: CClindicalIndicatorRule;
    IdentifyingType: string;
    IdentifyingOID: number;
    IndicatorContextInfo: string;
    IndicatorCriteriaCode: string;
    WardDetails: string;
    ConsultantDetails: string;
    PatientDetails: string;
    IndicatorRAGG: PatientIndicatorRAGG;
    IndicatorInitializedDTTM: DateTime;
    PatientTrackingOID: number;
    ServiceOID: number;
    EncounterType: string;
    IndicatorViewOID: number;
    IsSealed: string;
    IsBatchTriggered: string;
    PatientName: string;
    PASNumber: string;
    WardOID: number;
    WardName: string;
    sIsRepeatableDataRule: string;
    IPPatFlowcomments: string;
    AdmissionOID: number;
    OutPatientEventOID: number;
    OPPatientFlowcomments: string;
    PatientCurrentEventDTTM: string;
    CareActivityCode: string;
    IPPrimaryCode: string;
    IPPatientPriority: string;
    IPPatientPrioritySort: string;
    IsEcComments: string;
    IsUserData: boolean;
    CareProviderName: string;
    LocationName: string;
    BookingOID: number;
    OPServiceOID: number;
    CareProviderOID: number;
    AppType: string;
    PatientAppointmentOID: number;
    SlotNo: number;
    PreviousEncounterOID: number;
    IndicatorDomainCode: string;
    UserOID: number;
    NumericValue: number;
    OverNumericValue: number;
    NumericalSignage: string;
    SignificantValue: string;
    SupplementaryContextInfo: string;
    cResetRepeatcount: string;
    PatDOB: string;
    MedNextReviewDTTM: DateTime;
    AllocatedResources: string;
    IsNursingActivity: string;
    TobeDoneActivity: string;
    ActiveActivity: string;
    Indicators: ObservableCollection<CIndicator>;
}
export class CClindicalIndicatorRule extends CLZOObject {
    lOID: number;
    sIndicatorName: string;
    sDisplayName: string;
    cRAGCalculateBy: string;
    sIndicatorCode: string;
    sIndicatorText: string;
    sIndicatorCriteriaCode: string;
    sIndicatorAdopter: string;
    sIndicatorRule: string;
    sIsTrend: string;
    sIsValue: string;
    sIsRepeatableRule: string;
    bRepeatableDuration: byte;
    sDurationUOMCode: string;
    dCreatedAt: DateTime;
    sCreatedBy: string;
    dModifiedAt: DateTime;
    sModifiedBy: string;
    sIndicatorCriteriaText: string;
    lHealthOrgOID: number;
    sHealthOrgName: string;
    bRepeatableNumberOfTimes: number;
    lStartIndex: number;
    lEndIndex: number;
    lTotalCount: number;
    sIndicatorDescription: string;
    cIndicatorType: string;
    sINTYPCode: string;
    sINTYPText: string;
    sIsIndicPartOfAggComputation: string;
    sIsTimeValueToBeDisplayed: string;
    sIsNameValueToBeDisplayed: string;
    lOrganisationOID: number;
    cRuleMethod: string;
    sCode: string;
    sTerm: string;
    sVersion: string;
    sCDTYPCode: string;
    HasHistory: string;
    sSTATSCode: string;
    sREASNCode: string;
    sComments: string;
    sActivityCode: string;
    sRuleType: string;
    sIsApplyRuletoEpisode: string;
    sINCRTOperator: string;
    sINCRTCriteria: string;
    INCRTValue: byte;
    IdentifyingName: string;
    IdentifyingType: string;
    IdentifyingOID: number;
    IsSignicantDisplayed: string;
    INDVLCode: string;
    IndicatorValueTimeInterval: number;
    LaunchForm: string;
    ReasonForCorrection: string;
    ClinicalIndicatorRuleDetails: ObservableCollection<CClindicalIndicatorRuleDetails>;
}
export class CClindicalIndicatorRuleDetails {
    lRuleOID: number;
    lOID: number;
    sFromValue: string;
    sFromValueOperator: string;
    sToValue: string;
    sToValueOperator: string;
    sTextualRule: string;
    sIsTextualRule: string;
    sColourCode: string;
    bRAGGStatusValue: byte;
    dModifiedAt: DateTime;
    sModifiedBy: string;
    sRuleName: string;
    sStatusCode: string;
    sReasonCode: string;
    sComments: string;
    sECCommentsShown: string;
    cRAGCalculateBy: string;
    RAGGValue: string;
    IsCommentExits: number;
    IsSharedList: string;
}
export class PatientIndicatorRAGG {
    RAGGStatusValue: byte;
    REDStatusDTTM: DateTime;
    GREENStatusDTTM: DateTime;
    AMBERStatusDTTM: DateTime;
    GREYStatusDTTM: DateTime;
    IndicatorNumericValue: string;
    IndicatorTimeValue: DateTime;
    Trendindicator: string;
    IndicatorValueUOM: string;
    IndicatorEnumRAGGValue: ObservableCollection<PatientIndicatorEnumRAGG>;
}
export class PatientIndicatorEnumRAGG {
    Value: string;
    RAGGStatus: byte;
}
export class CIndicator {
    PatientOID: number;
    IndicatorName: string;
    DataValue: string;
    TrendIndicator: string;
    IndicatorValues: string;
    IndicatorCode: string;
    RuleCode: string;
    cIndicatorType: string;
    cRuleMethod: string;
    IndicatorContextInfo: string;
    RAGGStatusValue: byte;
    REDStatusDTTM: DateTime;
    GREENStatusDTTM: DateTime;
    AMBERStatusDTTM: DateTime;
    GREYStatusDTTM: DateTime;
    IndicatorCriteriaCode: string;
    sIsRepeatableRule: string;
    bRepeatableDuration: byte;
    sDurationUOMCode: string;
    bRepeatableNumberOfTimes: number;
    sIsRepeatableDataRule: string;
    bRepeatCount: number;
    IdentifyingType: string;
    IdentifyingOID: number;
    INDVLCode: string;
    RAGCalculateBy: string;
    IndicatorTimeValue: DateTime;
    IndicatorRuleOID: string;
    UserName: string;
    OPSeenTime: string;
    IsApplyRuleEpisode: string;
    LaunchForm: string;
    ReasonForCorrection: string;
}
export class CDCPatientIndicatorHistory extends PatientIndicatorDataValue {
    DataitemHistory: ObservableCollection<CDCDataitemHistoryValue>;
}
export class CDCDataitemHistoryValue {
    BaseUOM: string;
    ObservedOn: DateTime;
    ModifiedAt: DateTime;
    DataType: string;
    DataItemOID: number;
    DataitemName: string;
    Patientoid: number;
    Value: string;
    RowNo: number;
}
export class PatientIndicatorTracking extends CLZOObject {
    PatientOID: number;
    EncounterOID: number;
    IdentifyingType: string;
    IdentifyingOID: number;
    IndicatorInitializedDTTM: DateTime;
    IndicatorName: string;
    IndicatorDomainCode: string;
    IndicatorCriteriaCode: string;
    OrganisationOID: number;
    EncounterType: string;
    AdmitType: string;
    PatientTrackingStatus: string;
    IsBatchProcessed: string;
    PatientTrackingOID: number;
    IsIndicatorTrackingRequired: string;
    IsIndicatorHistoryRequired: string;
    IndicatorViewOID: number;
    IsPatientConfidential: string;
    ServiceOID: number;
    IsBatchTriggered: string;
    MultipleEncounterOID: string;
    IsRepeatableRule: string;
    IsApplyRuleToEpisode: string;
    IsRetrospective: string;
    PreviousEncounterOID: number;
    Status: string;
    IndicatorRuleOID: number;
}
export class CResMsgInFormUser {
    oContextInformation: CContextInformation;
}
export class CReqMsgPendingAuthorisation {
    reqFormBC: Form;
    formOIDBC: string;
    oContextInformation: CContextInformation;
}
export class CResMsgPendingAuthorisation {
    oContextInformation: CContextInformation;
}
export class CReqMsgSendForAuthorisation {
    reqFormBC: Form;
    RoleOIDBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgSendForAuthorisation {
    oContextInformation: CContextInformation;
}
export class CReqMsgInsertForm {
    ReqFormBC: Form;
    ParentFormOIDBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgInsertForm {
    ResForm: Form;
    oContextInformation: CContextInformation;
}
export class CReqMsgInsertMandFormObs {
    ReqFormBC: Form;
    ParentFormOIDBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgInsertMandFormObs {
    ResForm: Form;
    oContextInformation: CContextInformation;
}
export class CReqMsgSaveHiMReferences {
    oContextInformation: CContextInformation;
    reqFormHiMRefBC: ObservableCollection<FormHiMRef>;
}
export class FormHiMRef {
    OID: number;
    IFMFormOID: number;
    Status: string;
    PatientOID: number;
    ROneOID: number;
    OwnerOrganisationOID: number;
    DataitemName: string;
    AllRecords: string;
    InstanceName: string;
    HiMObject: string;
    HiMAttribute: string;
    IdentifierName: string;
    IdentifierValue: string;
    DataitemVersion: number;
    InstanceIndex: number;
    PersistanceStatus: number;
    SourceOID: string;
    SourceType: string;
    FormHiMIdentifier: ObservableCollection<FormHiMIdentifier>;
}
export class FormHiMIdentifier {
    OID: number;
    IFMFormHiMRefOID: number;
    IdentifyingValue: string;
    IdentifyingName: string;
    SourceOID: string;
    SourceType: string;
}
export class CResMsgSaveHiMReferences {
    oContextInformation: CContextInformation;
}
export class CReqMsgSaveHiMRefIdentifier {
    FormHiMRefOIDBC: number;
    oContextInformation: CContextInformation;
    reqFormHiMIDBC: ObservableCollection<FormHiMIdentifier>;
}
export class CResMsgSaveHiMRefIdentifier {
    oContextInformation: CContextInformation;
}
export class CReqMsgGetFormsDetails {
    reqFormListInfoBC: FormsDetailsParamInfo;
    oContextInformation: CContextInformation;
}
export class FormsDetailsParamInfo {
    EpisodeOID: number;
    PatientOID: number;
    OwnerOrganisationOID: number;
}
export class CResMsgGetFormsDetails {
    oContextInformation: CContextInformation;
    resFormInfo: ObservableCollection<FormInfo>;
}
export class FormInfo {
    AssesmentDate: DateTime;
    AssessedBy: string;
    EncounterID: string;
    EncounterOID: number;
    EncounterType: string;
    FormCode: string;
    FormName: string;
    FormOID: number;
    FormTemplateOID: number;
    InitiatedBy: string;
    InitiatedDate: DateTime;
    IsStrikethrough: boolean;
    ModifiedBy: string;
    ModifiedByOID: number;
    ModifiedDate: DateTime;
    PatientOID: number;
    FormStatus: string;
    WorkingStatus: number;
    AuthorisedDate: DateTime;
    AuthorisedBy: number;
    CancelledDate: DateTime;
    TemplateType: string;
    FormOperation: string;
    OrganisationOID: number;
}
export class CReqMsgSave {
    ReqFormBC: Form;
    ContextTypesBC: string;
    isStatusChangedBC: boolean;
    oContextInformation: CContextInformation;
}
export class CResMsgSave {
    ResForm: Form;
    oContextInformation: CContextInformation;
}
export class CReqMsgGetLatestFormOID {
    objFormContentParamBC: FormContentParam;
    oContextInformation: CContextInformation;
}
export class FormContentParam {
    FormName: string;
    CustomViewName: string;
    PatientOID: number;
    EncounterOID: number;
    EpisodeOID: number;
    WorkingStatusList: string;
    IncludeInprogress: boolean;
    EncounterOIDs: string;
    FormContentType: FormContentTypes;
}
export enum FormContentTypes {
    Others,
    getCDCFormContent,
    getCDCFormContentEpisode,
    getLatestCDCFormContentEncounter,
    getLatestCDCFormContentEpisode,
}
export class CResMsgGetLatestFormOID {
    oContextInformation: CContextInformation;
    ResForm: ObservableCollection<Form>;
}
export class CReqMsgCustomSave {
    ReqFormBC: Form;
    ContextTypesBC: string;
    saveTypeBC: string;
    FormTemplateBC: ObservableCollection<byte>;
    oContextInformation: CContextInformation;
}
export class CResMsgCustomSave {
    ResForm: Form;
    oContextInformation: CContextInformation;
}
export class CReqMsgTemporarySave {
    ReqFormBC: Form;
    oContextInformation: CContextInformation;
}
export class CResMsgTemporarySave {
    ResForm: Form;
    oContextInformation: CContextInformation;
}
export class CReqMsgDeleteTemporaryForm {
    pFormOIDBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgDeleteTemporaryForm {
    oContextInformation: CContextInformation;
}
export class CReqMsgReadBulkAuthorise {
    TaskoidBC: string;
    oContextInformation: CContextInformation;
}
export class CResMsgReadBulkAuthorise {
    oContextInformation: CContextInformation;
    objOutiFormBulkAuthorise: ObservableCollection<iFormBulkAuthorise>;
}
export class iFormBulkAuthorise {
    OID: string;
    TASKNMAE: string;
    PATIENTNAME: string;
    PATIENTPRIMARYIDENTIFIER: string;
    PATIENTSEX: string;
    PATIENTDATEOFBIRTH: string;
    PATIENTAGE: string;
    EXPECTEDCOMPLETIONDATE: string;
    CURRENTSTATUS: string;
    HEALTHORGANISATION: string;
    INITIATEDBY: string;
    REQUESTEDBY: string;
    FORMOID: string;
    PATIENTOID: string;
    FORMTEMPLATEOID: string;
    INITIATEDDTTM: string;
}
export class CReqMsgGetModifiedDataitemsValues {
    infoBC: EPRFormReadParameterInfo;
    oContextInformation: CContextInformation;
}
export class EPRFormReadParameterInfo {
    FormOID: number;
    FormHistoryOID: number;
    PrevFormHistoryOID: number;
    FormMode: number;
    PatFormOID: number;
    TemplateOID: number;
    PatientOID: number;
    FormName: string;
    FormNameList: string;
    Version: number;
    ReleaseVersion: byte;
    DataFilterOIDs: string;
    IsFormInserted: string;
    CultureCode: string;
    WorkingStausList: string;
    EncounterOID: number;
}
export class CResMsgGetModifiedDataitemsValues {
    oContextInformation: CContextInformation;
    resFormDIHistory: ObservableCollection<FormDataitemHistory>;
}
export class CReqMsgGetDIHistoryValues {
    infoBC: ReadDIHistoryInfo;
    oContextInformation: CContextInformation;
}
export class ReadDIHistoryInfo {
    FormOID: number;
    PatientOID: number;
    StatusHistoryOID: number;
    OwnerOrganisationOID: number;
}
export class CResMsgGetDIHistoryValues {
    oContextInformation: CContextInformation;
    Values: ObservableCollection<DataitemHistoryValues>;
}
export class DataitemHistoryValues {
    Name: string;
    UnitOfMeasure: string;
    UOMTerm: string;
    Value: string;
    Code: string;
    ObservedOn: DateTime;
    LastModifiedOn: DateTime;
    LastModifiedBy: string;
    Sequence: number;
    DataType: string;
    OID: number;
    PatientObservationOID: number;
    PatObsValHistOID: number;
    StatusHistoryOID: number;
    FormMode: number;
    SecInstanceIndex: number;
    PageSection: string;
    RecordCount: number;
    CareActivityCode: string;
    SectionName: string;
    PageName: string;
    ReasonCode: string;
    Remarks: string;
    InCustomView: boolean;
    DataItemInstIndex: string;
    DiDisplayName: string;
    DataItemUniqueName: string;
    IsSingular: boolean;
    DiTabIndex: number;
}
export class CReqMsgGetDataitemHistoryValues {
    infoBC: HistoryReadParameterInfo;
    oContextInformation: CContextInformation;
}
export class HistoryReadParameterInfo {
    FormOID: number;
    PatientOID: number;
    StatusHistoryOID: number;
    DataitemName: string;
    FromREC: number;
    ToRec: number;
    SectionIndex: number;
    PageIndex: number;
    SectionInstance: number;
}
export class CResMsgGetDataitemHistoryValues {
    oContextInformation: CContextInformation;
    Values: ObservableCollection<HistoryDataitemValues>;
}
export class HistoryDataitemValues {
    Name: string;
    UnitOfMeasure: string;
    UOMTerm: string;
    Value: string;
    Code: string;
    ObservedOn: DateTime;
    LastModifiedOn: DateTime;
    LastModifiedBy: string;
    Sequence: number;
    DataType: string;
    OID: number;
    PatientObservationOID: number;
    StatusHistoryOID: number;
    FormMode: number;
    SecInstanceIndex: number;
    PageSection: string;
    RecordCount: number;
    CareActivityCode: string;
}
export class CReqMsgGetSectionHistoryValues {
    infoBC: HistoryReadParameterInfo;
    oContextInformation: CContextInformation;
}
export class CResMsgGetSectionHistoryValues {
    oContextInformation: CContextInformation;
    Values: ObservableCollection<HistorySectionValues>;
}
export class HistorySectionValues {
    StatusHistoryOID: number;
    ObservedOn: DateTime;
    LastModifiedOn: DateTime;
    LastModifiedBy: string;
    Sequence: number;
    FormMode: number;
    SectionIndex: number;
    PageIndex: number;
    SecInstanceIndex: number;
    SectionStatus: string;
    RecordCount: number;
    CareActivityCode: string;
}
export class CReqMsgGetDataitemLatestValues {
    infoBC: LCVReadParameterInfo;
    oContextInformation: CContextInformation;
}
export class LCVReadParameterInfo {
    TemplateOID: number;
    PatientOID: number;
    DataitemName: string;
    FromREC: number;
    ToRec: number;
    FormTemplateCode: string;
}
export class CResMsgGetDataitemLatestValues {
    oContextInformation: CContextInformation;
    Values: ObservableCollection<DataitemLatestValues>;
}
export class DataitemLatestValues {
    Name: string;
    UnitOfMeasure: string;
    UOMTerm: string;
    Value: string;
    Code: string;
    ObservedOn: DateTime;
    LastModifiedOn: DateTime;
    Sequence: number;
    DataType: string;
    OID: number;
    PatientObservationOID: number;
    DIInstanceName: string;
    BaseUOM: string;
    BaseUOMTerm: string;
    BaseValue: string;
}
export class CReqMsgGetLatestDataitemValues {
    infoBC: EPRDataitemReadParameterInfo;
    oContextInformation: CContextInformation;
}
export class EPRDataitemReadParameterInfo {
    Count: number;
    DataitemCode: string;
    OBOTYcode: string;
    PatientOID: string;
    ObservationStatus: string;
    ParentDICode: string;
    DateInterval: number;
    IsComposite: boolean;
    Number: number;
    SourceType: number;
    FromDate: DateTime;
    ToDate: DateTime;
}
export class CResMsgGetLatestDataitemValues {
    oContextInformation: CContextInformation;
    dataitemValues: ObservableCollection<FormDataitemLatestValues>;
}
export class FormDataitemLatestValues {
    Name: string;
    FormOid: number;
    OID: string;
    ParentOID: string;
    DataItemType: string;
    Value: string;
    LastModifiedDTTM: DateTime;
    RecordedUser: string;
    RecordedDTTM: DateTime;
    UnitOfMeasureValues: UOMValues;
    Children: ObservableCollection<FormDataitemLatestValues>;
}
export class UOMValues {
    UOM: string;
    BaseUOM: string;
    BaseUOMText: string;
    BaseValue: string;
}
export class CReqMsgGetGVDetails {
    formsetOIDBC: number;
    formNameBC: string;
    oContextInformation: CContextInformation;
}
export class CResMsgGetGVDetails {
    value: string;
    oContextInformation: CContextInformation;
}
export class CReqMsgGetFormBasicdetails {
    infoBC: EPRFormReadParameterInfo;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormBasicdetails {
    oContextInformation: CContextInformation;
    basicdetails: ObservableCollection<FormBasicDetails>;
}
export class FormBasicDetails {
    FormMode: string;
    OID: number;
    FormCode: string;
    FormName: string;
    WorkingStatus: number;
    AuthorisationLevel: string;
    InitiatedBy: number;
    InitiatedRole: string;
    PatientOid: number;
    LastModifiedDTTM: DateTime;
    AssessedOn: DateTime;
    ModifiedBy: string;
    AssessedBy: string;
    MainIdentifier: string;
    FormTemplateOID: number;
    FormTemplateVersion: number;
    LastObservedRole: string;
    OwnerOrganisationName: string;
    LocalizedName: string;
    DefaultCustomView: string;
    EncounterOID: number;
}
export class CReqMsgIsLCVEnabled {
    FormTempOIDBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgIsLCVEnabled {
    LCVEnabled: boolean;
    oContextInformation: CContextInformation;
}
export class CReqMsgIsViewChangesEnabled {
    FormTempOIDBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgIsViewChangesEnabled {
    ViewChangesEnabled: boolean;
    oContextInformation: CContextInformation;
}
export class CReqMsgGetFormProperties {
    FormTempOIDBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormProperties {
    objFormTemplateProperties: FormTemplateProperties;
    oContextInformation: CContextInformation;
}
export class FormTemplateProperties {
    IsLCV: boolean;
    IsViewChanges: boolean;
    IsGenerateDoc: boolean;
}
export class CReqMsgListSearch {
    reqFormListInfoBC: EPRFormListParameterInfo;
    oContextInformation: CContextInformation;
}
export class EPRFormListParameterInfo {
    filterBySpecialty: string;
    filterByUserID: string;
    filterByAll: string;
    filterByTeam: string;
    isDisableTaskManagement: string;
    PatientOID: number;
    FORMCODE: string;
    SpecialityOID: number;
    RoleOID: number;
    EncounterOID: number;
    EpisodeOID: number;
    ProblemOID: number;
    Keywords: string;
    FilterByFormStatus: string;
    FilterBykeyword: string;
    FilterByStatus: string;
    FilterByUserID: string;
    FilterByTeam: string;
    FilterByAll: string;
    FilterByPeriod: string;
    FilterByCategory: string;
    FilterBySpecialty: string;
    FilterByQualifier: number;
    BetweenDate: DateTime;
    AndDate: DateTime;
    SealRecordList: string;
    SealRecordImageList: string;
    UsersOID: number;
    CategoryOID: string;
    GroupByType: number;
    HOOID: string;
    FormName: string;
    Specialty: string;
    Status: string;
    UserListOID: string;
    StatusList: string;
    FormType: number;
    StatusQualifier: number;
    EffectFrom: DateTime;
    EffectUntil: DateTime;
    PageNumber: number;
    PageSize: number;
    TotalCount: number;
    sDataFilterOID: string;
    OwnerOrganisationID: number;
    ContextType: number;
    ContextOID: number;
    LastModifiedOn: string;
    Formoid: number;
    LastModifiedBy: number;
    ReleaseVersion: byte;
    WorkingStatus: number;
    WorkingStatusList: string;
    GroupByData: string;
    StoredProcedureName: string;
    encounterlist: string;
    ColOrder1: string;
    ColOrder2: string;
    ColOrder3: string;
    GroupByOption: string;
    EPRMapOIDs: string;
}
export class CResMsgListSearch {
    oContextInformation: CContextInformation;
    resForm: ObservableCollection<Form>;
}
export class CReqMsgGetFormBasicByFormOID {
    reqFormListInfoBC: EPRFormListParameterInfo;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormBasicByFormOID {
    oContextInformation: CContextInformation;
    resForm: ObservableCollection<Form>;
}
export class CReqMsgGetFormByFormOID {
    reqFormListInfoBC: EPRFormListParameterInfo;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormByFormOID {
    oContextInformation: CContextInformation;
    resForm: ObservableCollection<Form>;
}
export class CReqMsgRetrieveUsersSearch {
    reqFormListInfoBC: EPRFormListParameterInfo;
    oContextInformation: CContextInformation;
}
export class CResMsgRetrieveUsersSearch {
    oContextInformation: CContextInformation;
    resForm: ObservableCollection<Form>;
}
export class CReqMsgRetrieveUsersSearchByCode {
    reqFormListInfoBC: EPRFormListParameterInfo;
    oContextInformation: CContextInformation;
}
export class CResMsgRetrieveUsersSearchByCode {
    oContextInformation: CContextInformation;
    resForm: ObservableCollection<Form>;
}
export class CReqMsgSendContinueFormSetCA {
    objRequestBC: FormRecepient;
    oContextInformation: CContextInformation;
}
export class CResMsgSendContinueFormSetCA {
    oContextInformation: CContextInformation;
}
export class CReqMsgGetHiMChanges {
    FormOIDBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgGetHiMChanges {
    oContextInformation: CContextInformation;
    HiMDetails: ObservableCollection<HiMChangeDetails>;
}
export class HiMChangeDetails {
    ParentDataItemName: string;
    HiMObject: string;
    HiMAttribute: string;
    Value: string;
    CreatedAt: DateTime;
    CreatedBy: string;
    ModifiedAt: DateTime;
    ModifiedBy: string;
}
export class CReqMsgGetFormSetCode {
    objRequestBC: Form;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormSetCode {
    oContextInformation: CContextInformation;
    objResponse: ObservableCollection<Form>;
}
export class CReqMsgGetPatientObservationIndicatorWithHistory {
    objIndicatorReadParamBC: DataItemIndicatorReadParam;
    oContextInformation: CContextInformation;
}
export class DataItemIndicatorReadParam {
    PatientOID: number;
    EncounterOID: number;
    OrganisationOID: number;
    DataitemNames: string;
    FromDate: DateTime;
    ToDate: DateTime;
    RowCount: number;
}
export class CResMsgGetPatientObservationIndicatorWithHistory {
    oContextInformation: CContextInformation;
    arrIndicatorHistValues: ObservableCollection<CDCPatientIndicatorHistory>;
}
export class CReqMsgManageDataItemIndicator {
    objIndicatorBC: DataItemIndicatorReadParam;
    oContextInformation: CContextInformation;
}
export class CResMsgManageDataItemIndicator {
    nResultIndicator: number;
    oContextInformation: CContextInformation;
}
export class CReqMsgUpdateFormOutCome {
    objReqUpOutcmeBC: Form;
    oContextInformation: CContextInformation;
}
export class CResMsgUpdateFormOutCome {
    oContextInformation: CContextInformation;
}
export class CReqMsgGetHiMReferences {
    FormOIDBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgGetHiMReferences {
    oContextInformation: CContextInformation;
    resFormHiMRef: ObservableCollection<FormHiMRef>;
}
export class CReqMsgGroupByCTX {
    readParamBC: EPRFormListParameterInfo;
    oContextInformation: CContextInformation;
}
export class CResMsgGroupByCTX {
    IsNonereq: Object;
    oContextInformation: CContextInformation;
    formContext: ObservableCollection<FormContext>;
}
export class CReqMsgGetFormByCTX {
    readParamBC: EPRFormListParameterInfo;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormByCTX {
    oContextInformation: CContextInformation;
    resForm: ObservableCollection<Form>;
}
export class CReqMsgGetFormForCTXNone {
    readParamBC: EPRFormListParameterInfo;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormForCTXNone {
    oContextInformation: CContextInformation;
    resForm: ObservableCollection<Form>;
}
export class CReqMsgGetFormassessment {
    readParamInfoBC: EPRFormListParameterInfo;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormassessment {
    oContextInformation: CContextInformation;
    resForm: ObservableCollection<Form>;
}
export class CReqMsgIFMFormTemplateMandChk {
    CodeBC: string;
    VersionBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgIFMFormTemplateMandChk {
    oContextInformation: CContextInformation;
    objOutList: ObservableCollection<Object>;
}
export class CReqMsgGetPrintFormDetails {
    reqFormReadInfoBC: EPRFormReadParameterInfo;
    oContextInformation: CContextInformation;
}
export class CResMsgGetPrintFormDetails {
    objforms: Form;
    oContextInformation: CContextInformation;
}
export class CReqMsgGetFormPrintPlcyCode {
    sFormoidBC: number;
    TemporFormBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormPrintPlcyCode {
    sPolicyCode: string;
    oContextInformation: CContextInformation;
}
export class CReqMsgCheckIsInsertedForm {
    oRequestBC: EPRFormReadParameterInfo;
    oContextInformation: CContextInformation;
}
export class CResMsgCheckIsInsertedForm {
    status: boolean;
    ActualTmpOID: number;
    oContextInformation: CContextInformation;
}
export class CReqMsgGetInsertedFormSetRules {
    reqFSRuleReadInfoBC: EPRFormReadParameterInfo;
    oContextInformation: CContextInformation;
}
export class CResMsgGetInsertedFormSetRules {
    oContextInformation: CContextInformation;
    resFSRule: ObservableCollection<FSRuleValue>;
}
export class FSRuleValue {
    ParentTemplateOID: number;
    FMTChildOID: number;
    FSSeverity: number;
    FSAlert: string;
    FSRule: string;
    FormName: string;
    GBLVARValue: string;
    FormRule: ObservableCollection<byte>;
}
export class CReqMsgGetLatestFormByObservation {
    objPatINDTrackBC: PatientIndicatorTracking;
    oContextInformation: CContextInformation;
}
export class CResMsgGetLatestFormByObservation {
    objFormDetails: HistoryFormDIResponse;
    oContextInformation: CContextInformation;
}
export class HistoryFormDIResponse {
    FormOID: number;
    FormTemplateOID: number;
    FormName: string;
    UifElementCode: string;
}
export class CReqMsgGetFormInfo {
    reqFormBC: FormInfo;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormInfo {
    resForm: FormInfo;
    oContextInformation: CContextInformation;
}
export class CReqMsgSendIntrayAlertForOverrided {
    formPatientSensitiveBC: FormPatientSensitive;
    oContextInformation: CContextInformation;
}
export class FormPatientSensitive {
    TaskName: string;
    TaskDescription: string;
    CareActivityName: string;
    PatientOID: string;
    UserOID: number;
    ReasonAccess: string;
    AdditionInfo: string;
}
export class CResMsgSendIntrayAlertForOverrided {
    oContextInformation: CContextInformation;
}
export class CReqMsgSaveFormDistributionDetails {
    FrmDistBC: FormDistributionDetails;
    FormOIDBC: number;
    oContextInformation: CContextInformation;
    oLRSTransactionLogBC: ObservableCollection<LRSTransactionLog>;
}
export class CResMsgSaveFormDistributionDetails {
    oContextInformation: CContextInformation;
}
export class CReqMsgGetDistributedFormDetails {
    FormOIDBC: number;
    PatientOIDBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgGetDistributedFormDetails {
    oContextInformation: CContextInformation;
    FrmDistDetails: ObservableCollection<FormRecepient>;
}
export class CReqMsgInstantiateForm {
    reqFormBC: Form;
    oContextInformation: CContextInformation;
}
export class CResMsgInstantiateForm {
    oContextInformation: CContextInformation;
}
export class CReqMsgSendFormsToIntray {
    FormToSendBC: Form;
    oContextInformation: CContextInformation;
}
export class CResMsgSendFormsToIntray {
    oContextInformation: CContextInformation;
}
export class CReqMsgUpdateFormNA {
    ReqUpdateFormNABC: Form;
    oContextInformation: CContextInformation;
}
export class CResMsgUpdateFormNA {
    oContextInformation: CContextInformation;
}
export class CReqMsgUpdateFormStatus {
    ReqFormWithStatusBC: Form;
    oContextInformation: CContextInformation;
}
export class CResMsgUpdateFormStatus {
    oContextInformation: CContextInformation;
}
export class CReqMsgSaveDocAssociation {
    FormOIDBC: number;
    ClinDocOIDBC: number;
    AuthorBC: string;
    RoleOIDBC: number;
    PatientOIDBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgSaveDocAssociation {
    oContextInformation: CContextInformation;
}
export class CReqMsgManageFormDocAssociation {
    olddocoidBC: number;
    newdocoidBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgManageFormDocAssociation {
    oContextInformation: CContextInformation;
}
export class CReqMsgDeleteFormDocAssociation {
    docoidBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgDeleteFormDocAssociation {
    oContextInformation: CContextInformation;
}
export class CReqMsgContinueFormSet {
    ReqFormSetContinueBC: Form;
    iFormOIDToCanStartBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgContinueFormSet {
    oContextInformation: CContextInformation;
}
export class CReqMsgUpdateFormPatient {
    ReqFormPatientBC: FormPatient;
    oContextInformation: CContextInformation;
}
export class FormPatient {
    FormOID: number;
    NewPatientOID: number;
    OldPatientOID: number;
    LastModifiedRole: string;
}
export class CResMsgUpdateFormPatient {
    oContextInformation: CContextInformation;
}
export class CReqMsgRetrieveFormbyFilter {
    reqFormListInfoBC: EPRFormListParameterInfo;
    oContextInformation: CContextInformation;
}
export class CResMsgRetrieveFormbyFilter {
    oContextInformation: CContextInformation;
    resForm: ObservableCollection<Form>;
}
export class CReqMsgGetFSChildList {
    ParentFormOIDBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFSChildList {
    oContextInformation: CContextInformation;
    resFormChild: ObservableCollection<Form>;
}
export class CReqMsgGetFSChildListNFE {
    ParentFormOIDBC: number;
    PatientOIDBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFSChildListNFE {
    oContextInformation: CContextInformation;
    resFormChild: ObservableCollection<Form>;
}
export class CReqMsgGetInitiateRightsForUser {
    sFormCodeBC: string;
    oContextInformation: CContextInformation;
}
export class CResMsgGetInitiateRightsForUser {
    lHasINIRights: number;
    oContextInformation: CContextInformation;
}
export class CReqMsgRead {
    reqFormReadInfoBC: EPRFormReadParameterInfo;
    oContextInformation: CContextInformation;
}
export class CResMsgRead {
    resForm: Form;
    oContextInformation: CContextInformation;
}
export class CReqMsgRetrieveFormSetRules {
    reqFSRuleReadInfoBC: EPRFormReadParameterInfo;
    oContextInformation: CContextInformation;
}
export class CResMsgRetrieveFormSetRules {
    oContextInformation: CContextInformation;
    resFSRule: ObservableCollection<FSRuleValue>;
}
export class CReqMsgRetrieveObsoleteFormData {
    reqObsFormBC: EPRFormReadParameterInfo;
    oContextInformation: CContextInformation;
}
export class CResMsgRetrieveObsoleteFormData {
    oContextInformation: CContextInformation;
    resObsFMData: ObservableCollection<InsObsoleteFormDet>;
}
export class InsObsoleteFormDet {
    FormCode: string;
    FormName: string;
    IFMFormTemplateOID: number;
    TemplateStatus: number;
    TemplateVersion: number;
    Description: string;
    ActiveStatus: number;
    WorkingStatus: number;
    IsPolicyOverridden: number;
    IsCommented: number;
    IsDistributed: number;
    SourceType: string;
    IFMRCCode: string;
    CanObsolete: string;
    IsAutoFinalise: string;
    IsOptional: number;
    Sequence: number;
    Predecessor: number;
    PredecessorOID: number;
    CanStart: number;
    IdentifyingOID: number;
    IdentifyingType: string;
    WFTaskListOID: number;
}
export class CReqMsgGetAssesedDetails {
    reqFormBC: Form;
    oContextInformation: CContextInformation;
}
export class CResMsgGetAssesedDetails {
    oContextInformation: CContextInformation;
    resAssDet: ObservableCollection<AssesedDetails>;
}
export class AssesedDetails {
    ObservedBy: string;
    ObservedOn: DateTime;
    UserName: string;
    FullName: string;
    UserOID: string;
    IdentifyingName: string;
    IdentifyingType: string;
    IdentifyingValue: string;
    SpecialtyName: string;
    SpecialtyOID: number;
    TeamName: string;
    TeamOID: number;
    RoleProfileOID: number;
    OrganisationOID: number;
}
export class CReqMsgGetUserCPRole {
    patientOIDBC: number;
    userOIDBC: number;
    RoleOIDBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgGetUserCPRole {
    oContextInformation: CContextInformation;
    UserCPRole: ObservableCollection<CPRole>;
}
export class CPRole {
    CPType: string;
    CPRoleCode: string;
    RoleCode: string;
}
export class CReqMsgGetTSDetails {
    RoleprofileOIDBC: number;
    criteriaBC: string;
    oContextInformation: CContextInformation;
}
export class CResMsgGetTSDetails {
    oContextInformation: CContextInformation;
    Objdet: ObservableCollection<TeamSpecDetails>;
}
export class TeamSpecDetails {
    Teamoid: number;
    Teamnames: string;
    SpecOid: number;
    SpecNames: string;
}
export class CReqMsgGetRDLTemplate {
    templateNameBC: string;
    oContextInformation: CContextInformation;
}
export class CResMsgGetRDLTemplate {
    oContextInformation: CContextInformation;
    resFrmtemplate: ObservableCollection<RDLFormTemplate>;
}
export class RDLFormTemplate {
    templates: string;
    code: string;
}
export class CReqMsgRetrieveFMOIDByTask {
    reqTaskBC: FSRuleIntray;
    oContextInformation: CContextInformation;
}
export class FSRuleIntray {
    FORMOID: number;
    TEMPLATEOID: number;
    TASKOID: number;
    PARENTFORMOID: number;
    FormCode: string;
}
export class CResMsgRetrieveFMOIDByTask {
    oContextInformation: CContextInformation;
    resFormDet: ObservableCollection<FSRuleIntray>;
}
export class CReqMsgGetFormDataItemImage {
    FormOIDBC: number;
    TemplateOIDBC: number;
    DataitemInstanceNameBC: string;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormDataItemImage {
    oContextInformation: CContextInformation;
    DataitemImage: ObservableCollection<FormDataitemImage>;
}
export class CReqMsgGetFormDIImageTemp {
    FormOIDBC: number;
    TemplateOIDBC: number;
    DataitemInstanceNameBC: string;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormDIImageTemp {
    oContextInformation: CContextInformation;
    DataitemImageTemp: ObservableCollection<FormDataitemImageTemp>;
}
export class FormDataitemImageTemp {
    OID: number;
    FormOID: number;
    FormHistoryOID: number;
    DataItemName: string;
    TemplateOID: number;
    DataitemInstanceName: string;
    ImageInfo: ObservableCollection<byte>;
}
export class CReqMsgGetFormDocAssociation {
    reqFormDocBC: FormDocAssociation;
    oContextInformation: CContextInformation;
}
export class FormDocAssociation {
    FormOID: number;
    DocumentOID: number;
}
export class CResMsgGetFormDocAssociation {
    resFormDoc: FormDocAssociation;
    oContextInformation: CContextInformation;
}
export class CReqMsgGetFormDetails {
    reqFormBC: EPRFormReadParameterInfo;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormDetails {
    resForm: Form;
    oContextInformation: CContextInformation;
}
export class CReqMsgGetFormBasicDet {
    reqFormBC: EPRFormReadParameterInfo;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormBasicDet {
    resForm: Form;
    oContextInformation: CContextInformation;
}
export class CReqMsgGetFormDetailsFromIntray {
    reqFormBC: EPRFormReadParameterInfo;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormDetailsFromIntray {
    resForm: FormBasicDetails;
    oContextInformation: CContextInformation;
}
export class CReqMsgGetAuthObserver {
    reqFormBC: EPRFormReadParameterInfo;
    oContextInformation: CContextInformation;
}
export class CResMsgGetAuthObserver {
    oContextInformation: CContextInformation;
    resFormObserver: ObservableCollection<FormObserver>;
}
export class CReqMsgGetFormObsView {
    reqFormBC: EPRFormReadParameterInfo;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormObsView {
    oContextInformation: CContextInformation;
    resFormObserver: ObservableCollection<FormObserver>;
}
export class CReqMsgGetObservedSTDT {
    reqFormBC: EPRFormReadParameterInfo;
    oContextInformation: CContextInformation;
}
export class CResMsgGetObservedSTDT {
    oContextInformation: CContextInformation;
    resFormObserver: ObservableCollection<FormObserver>;
}
export class CReqMsgGetFormAuthorisation {
    sFormOIDBC: number;
    AuthorisationLevelBC: string;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormAuthorisation {
    oContextInformation: CContextInformation;
    resFormAuthorisation: ObservableCollection<FormAuthorisation>;
}
export class CReqMsgGetFormComments {
    reqFormBC: EPRFormReadParameterInfo;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormComments {
    oContextInformation: CContextInformation;
    resFormComments: ObservableCollection<FormComments>;
}
export class CReqMsgGetFormContext {
    reqFormBC: EPRFormReadParameterInfo;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormContext {
    oContextInformation: CContextInformation;
    resFormContext: ObservableCollection<FormContext>;
}
export class CReqMsgGetFormContextbyType {
    reqFormBC: EPRFormReadParameterInfo;
    ContextTypeBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormContextbyType {
    oContextInformation: CContextInformation;
    resFormContext: ObservableCollection<FormContext>;
}
export class CReqMsgGetFormContextByOIDs {
    FormOIDsBC: string;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormContextByOIDs {
    oContextInformation: CContextInformation;
    resFormContext: ObservableCollection<FormContext>;
}
export class CReqMsgGetFormPolicy {
    reqFormBC: EPRFormReadParameterInfo;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormPolicy {
    oContextInformation: CContextInformation;
    resFormPolicy: ObservableCollection<FormPolicy>;
}
export class CReqMsgGetFormStatus {
    FormOIdBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormStatus {
    status: string;
    oContextInformation: CContextInformation;
}
export class CReqMsgGetFormWorkingStatus {
    lFormOIdBC: number;
    lPatientOIDBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormWorkingStatus {
    formWorkingStatus: string;
    oContextInformation: CContextInformation;
}
export class CReqMsgGetFrmStatus {
    FormOIdBC: number;
    lPatientOIDBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFrmStatus {
    status: string;
    oContextInformation: CContextInformation;
}
export class CReqMsgClinicalFlag {
    strConfigKeyBC: string;
    oContextInformation: CContextInformation;
}
export class CResMsgClinicalFlag {
    strConfigKeyValue: string;
    oContextInformation: CContextInformation;
}
export class CReqMsgGetFSTaskMgmtStatus {
    FormOIdBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFSTaskMgmtStatus {
    status: string;
    oContextInformation: CContextInformation;
}
export class CReqMsgGetFormWS {
    FormOIdBC: number;
    PatientOIDBC: number;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormWS {
    status: string;
    oContextInformation: CContextInformation;
}
export class CReqMsgGetFormStatusHistoryDetails {
    reqFormBC: EPRFormReadParameterInfo;
    oContextInformation: CContextInformation;
}
export class CResMsgGetFormStatusHistoryDetails {
    oContextInformation: CContextInformation;
    resFormStsHistory: ObservableCollection<FormStatusHistory>;
}
export enum enmMultiCampusPattern {
    NONE,
    FLAT,
    GLOBAL,
    EXCLUSIVE,
    TOPDOWN,
    BOTTOMUP,
    TOPDOWNSHARED,
    BOTTOMUPSHARED,
    GLOBALWSG,
    FLATWSG,
}

const prototypeList = {
    "CBCFormsWS.GetFormPolicy": CResMsgGetFormPolicy.prototype,
    "CBCFormsWS.GetFormStatus": CResMsgGetFormStatus.prototype,
    "CBCFormsWS.GetFormWorkingStatus": CResMsgGetFormWorkingStatus.prototype,
    "CBCFormsWS.GetFrmStatus": CResMsgGetFrmStatus.prototype,
    "CBCFormsWS.ClinicalFlag": CResMsgClinicalFlag.prototype,
    "CBCFormsWS.GetFSTaskMgmtStatus": CResMsgGetFSTaskMgmtStatus.prototype,
    "CBCFormsWS.GetFormWS": CResMsgGetFormWS.prototype,
    "CBCFormsWS.GetFormStatusHistoryDetails": CResMsgGetFormStatusHistoryDetails.prototype,
    "CBCFormsWS.ContinueFormSet": CResMsgContinueFormSet.prototype,
    "CBCFormsWS.UpdateFormPatient": CResMsgUpdateFormPatient.prototype,
    "CBCFormsWS.RetrieveFormbyFilter": CResMsgRetrieveFormbyFilter.prototype,
    "CBCFormsWS.GetFSChildList": CResMsgGetFSChildList.prototype,
    "CBCFormsWS.GetFSChildListNFE": CResMsgGetFSChildListNFE.prototype,
    "CBCFormsWS.GetInitiateRightsForUser": CResMsgGetInitiateRightsForUser.prototype,
    "CBCFormsWS.Read": CResMsgRead.prototype,
    "CBCFormsWS.RetrieveFormSetRules": CResMsgRetrieveFormSetRules.prototype,
    "CBCFormsWS.RetrieveObsoleteFormData": CResMsgRetrieveObsoleteFormData.prototype,
    "CBCFormsWS.GetAssesedDetails": CResMsgGetAssesedDetails.prototype,
    "CBCFormsWS.GetUserCPRole": CResMsgGetUserCPRole.prototype,
    "CBCFormsWS.GetTSDetails": CResMsgGetTSDetails.prototype,
    "CBCFormsWS.GetRDLTemplate": CResMsgGetRDLTemplate.prototype,
    "CBCFormsWS.RetrieveFMOIDByTask": CResMsgRetrieveFMOIDByTask.prototype,
    "CBCFormsWS.GetFormDataItemImage": CResMsgGetFormDataItemImage.prototype,
    "CBCFormsWS.GetFormDIImageTemp": CResMsgGetFormDIImageTemp.prototype,
    "CBCFormsWS.GetFormDocAssociation": CResMsgGetFormDocAssociation.prototype,
    "CBCFormsWS.GetFormDetails": CResMsgGetFormDetails.prototype,
    "CBCFormsWS.GetFormBasicDet": CResMsgGetFormBasicDet.prototype,
    "CBCFormsWS.GetFormDetailsFromIntray": CResMsgGetFormDetailsFromIntray.prototype,
    "CBCFormsWS.GetAuthObserver": CResMsgGetAuthObserver.prototype,
    "CBCFormsWS.GetFormObsView": CResMsgGetFormObsView.prototype,
    "CBCFormsWS.GetObservedSTDT": CResMsgGetObservedSTDT.prototype,
    "CBCFormsWS.GetFormAuthorisation": CResMsgGetFormAuthorisation.prototype,
    "CBCFormsWS.GetFormComments": CResMsgGetFormComments.prototype,
    "CBCFormsWS.GetFormContext": CResMsgGetFormContext.prototype,
    "CBCFormsWS.GetFormContextbyType": CResMsgGetFormContextbyType.prototype,
    "CBCFormsWS.GetFormContextByOIDs": CResMsgGetFormContextByOIDs.prototype,
    "CBCFormsWS.SendContinueFormSetCA": CResMsgSendContinueFormSetCA.prototype,
    "CBCFormsWS.GetHiMChanges": CResMsgGetHiMChanges.prototype,
    "CBCFormsWS.GetFormSetCode": CResMsgGetFormSetCode.prototype,
    "CBCFormsWS.GetPatientObservationIndicatorWithHistory": CResMsgGetPatientObservationIndicatorWithHistory.prototype,
    "CBCFormsWS.ManageDataItemIndicator": CResMsgManageDataItemIndicator.prototype,
    "CBCFormsWS.UpdateFormOutCome": CResMsgUpdateFormOutCome.prototype,
    "CBCFormsWS.GetHiMReferences": CResMsgGetHiMReferences.prototype,
    "CBCFormsWS.GroupByCTX": CResMsgGroupByCTX.prototype,
    "CBCFormsWS.GetFormByCTX": CResMsgGetFormByCTX.prototype,
    "CBCFormsWS.GetFormForCTXNone": CResMsgGetFormForCTXNone.prototype,
    "CBCFormsWS.GetFormassessment": CResMsgGetFormassessment.prototype,
    "CBCFormsWS.IFMFormTemplateMandChk": CResMsgIFMFormTemplateMandChk.prototype,
    "CBCFormsWS.GetPrintFormDetails": CResMsgGetPrintFormDetails.prototype,
    "CBCFormsWS.GetFormPrintPlcyCode": CResMsgGetFormPrintPlcyCode.prototype,
    "CBCFormsWS.CheckIsInsertedForm": CResMsgCheckIsInsertedForm.prototype,
    "CBCFormsWS.GetInsertedFormSetRules": CResMsgGetInsertedFormSetRules.prototype,
    "CBCFormsWS.GetLatestFormByObservation": CResMsgGetLatestFormByObservation.prototype,
    "CBCFormsWS.GetFormInfo": CResMsgGetFormInfo.prototype,
    "CBCFormsWS.SendIntrayAlertForOverrided": CResMsgSendIntrayAlertForOverrided.prototype,
    "CBCFormsWS.SaveFormDistributionDetails": CResMsgSaveFormDistributionDetails.prototype,
    "CBCFormsWS.GetDistributedFormDetails": CResMsgGetDistributedFormDetails.prototype,
    "CBCFormsWS.InstantiateForm": CResMsgInstantiateForm.prototype,
    "CBCFormsWS.SendFormsToIntray": CResMsgSendFormsToIntray.prototype,
    "CBCFormsWS.UpdateFormNA": CResMsgUpdateFormNA.prototype,
    "CBCFormsWS.UpdateFormStatus": CResMsgUpdateFormStatus.prototype,
    "CBCFormsWS.SaveDocAssociation": CResMsgSaveDocAssociation.prototype,
    "CBCFormsWS.ManageFormDocAssociation": CResMsgManageFormDocAssociation.prototype,
    "CBCFormsWS.DeleteFormDocAssociation": CResMsgDeleteFormDocAssociation.prototype,
    "CBCFormsWS.PendingAuthorisation": CResMsgPendingAuthorisation.prototype,
    "CBCFormsWS.SendForAuthorisation": CResMsgSendForAuthorisation.prototype,
    "CBCFormsWS.InsertForm": CResMsgInsertForm.prototype,
    "CBCFormsWS.InsertMandFormObs": CResMsgInsertMandFormObs.prototype,
    "CBCFormsWS.SaveHiMReferences": CResMsgSaveHiMReferences.prototype,
    "CBCFormsWS.SaveHiMRefIdentifier": CResMsgSaveHiMRefIdentifier.prototype,
    "CBCFormsWS.GetFormsDetails": CResMsgGetFormsDetails.prototype,
    "CBCFormsWS.Save": CResMsgSave.prototype,
    "CBCFormsWS.GetLatestFormOID": CResMsgGetLatestFormOID.prototype,
    "CBCFormsWS.CustomSave": CResMsgCustomSave.prototype,
    "CBCFormsWS.TemporarySave": CResMsgTemporarySave.prototype,
    "CBCFormsWS.DeleteTemporaryForm": CResMsgDeleteTemporaryForm.prototype,
    "CBCFormsWS.ReadBulkAuthorise": CResMsgReadBulkAuthorise.prototype,
    "CBCFormsWS.GetModifiedDataitemsValues": CResMsgGetModifiedDataitemsValues.prototype,
    "CBCFormsWS.GetDIHistoryValues": CResMsgGetDIHistoryValues.prototype,
    "CBCFormsWS.GetDataitemHistoryValues": CResMsgGetDataitemHistoryValues.prototype,
    "CBCFormsWS.GetSectionHistoryValues": CResMsgGetSectionHistoryValues.prototype,
    "CBCFormsWS.GetDataitemLatestValues": CResMsgGetDataitemLatestValues.prototype,
    "CBCFormsWS.GetLatestDataitemValues": CResMsgGetLatestDataitemValues.prototype,
    "CBCFormsWS.GetGVDetails": CResMsgGetGVDetails.prototype,
    "CBCFormsWS.GetFormBasicdetails": CResMsgGetFormBasicdetails.prototype,
    "CBCFormsWS.IsLCVEnabled": CResMsgIsLCVEnabled.prototype,
    "CBCFormsWS.IsViewChangesEnabled": CResMsgIsViewChangesEnabled.prototype,
    "CBCFormsWS.GetFormProperties": CResMsgGetFormProperties.prototype,
    "CBCFormsWS.ListSearch": CResMsgListSearch.prototype,
    "CBCFormsWS.GetFormBasicByFormOID": CResMsgGetFormBasicByFormOID.prototype,
    "CBCFormsWS.GetFormByFormOID": CResMsgGetFormByFormOID.prototype,
    "CBCFormsWS.RetrieveUsersSearch": CResMsgRetrieveUsersSearch.prototype,
    "CBCFormsWS.RetrieveUsersSearchByCode": CResMsgRetrieveUsersSearchByCode.prototype,
    "CBCFormsWS.GetAllFormChilds": CResMsgGetAllFormChilds.prototype,
    "CBCFormsWS.GetChildFormDetails": CResMsgGetChildFormDetails.prototype,
    "CBCFormsWS.GetAllFormChildsForADHOCCheck": CResMsgGetAllFormChildsForADHOCCheck.prototype,
    "CBCFormsWS.GetFormData": CResMsgGetFormData.prototype,
    "CBCFormsWS.GetFormAsso": CResMsgGetFormAsso.prototype,
    "CBCFormsWS.GetFormObservationDetails": CResMsgGetFormObservationDetails.prototype,
    "CBCFormsWS.GetFormDataNFE": CResMsgGetFormDataNFE.prototype,
    "CBCFormsWS.RetrieveFormData": CResMsgRetrieveFormData.prototype,
    "CBCFormsWS.GetLatestFormData": CResMsgGetLatestFormData.prototype,
    "CBCFormsWS.GetFormDataByOIDs": CResMsgGetFormDataByOIDs.prototype,
    "CBCFormsWS.GetFormDataByOIDNFE": CResMsgGetFormDataByOIDNFE.prototype,
    "CBCFormsWS.GetUserAccessedForm": CResMsgGetUserAccessedForm.prototype,
    "CBCFormsWS.PatientFormDefaultSet": CResMsgPatientFormDefaultSet.prototype,
    "CBCFormsWS.PatientFormInstCount": CResMsgPatientFormInstCount.prototype,
    "CBCFormsWS.PatientChildFormDefaultSet": CResMsgPatientChildFormDefaultSet.prototype,
    "CBCFormsWS.GetFormDisturbutionList": CResMsgGetFormDisturbutionList.prototype,
    "CBCFormsWS.RetrieveCustomList": CResMsgRetrieveCustomList.prototype,
    "CBCFormsWS.ManageContext": CResMsgManageContext.prototype,
    "CBCFormsWS.BulkUpdateTreatmentFnFrmCxt": CResMsgBulkUpdateTreatmentFnFrmCxt.prototype,
    "CBCFormsWS.GetCareCoordinator": CResMsgGetCareCoordinator.prototype,
    "CBCFormsWS.UpdatePTA": CResMsgUpdatePTA.prototype,
    "CBCFormsWS.ManageFormStatus": CResMsgManageFormStatus.prototype,
    "CBCFormsWS.GetLatestForm": CResMsgGetLatestForm.prototype,
    "CBCFormsWS.GetLatestFormByDT": CResMsgGetLatestFormByDT.prototype,
    "CBCFormsWS.FormSuspendDefer": CResMsgFormSuspendDefer.prototype,
    "CBCFormsWS.UpdateStatusHistoryTaskOID": CResMsgUpdateStatusHistoryTaskOID.prototype,
    "CBCFormsWS.AuthorizeForm": CResMsgAuthorizeForm.prototype,
    "CBCFormsWS.InFormUser": CResMsgInFormUser.prototype,

    CReqMsgGetAllFormChilds: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetAllFormChilds: {
        oContextInformation: CContextInformation.prototype,
        resFormChilds: Form.prototype,

    }, Form: {
        Authorisation: FormAuthorisation.prototype,
        IncompleteForm: InCompleteForm.prototype,
        ViewTemplate: ViewTemplate.prototype,
        FormAssociations: FormAssociations.prototype,
        Policy: FormPolicy.prototype,
        Term: FormTerm.prototype,
        DIHistory: FormDataitemHistory.prototype,
        DIImage: FormDataitemImage.prototype,
        Reference: FormReference.prototype,
        StatusHistory: FormStatusHistory.prototype,
        Data: FormData.prototype,
        Comments: FormComments.prototype,
        Context: FormContext.prototype,
        Observer: FormObserver.prototype,
        Removeobserver: FormObserver.prototype,
        Child: FormChild.prototype,
        Recepient: FormRecepient.prototype,
        AuthorisationUser: FormAuthorisationUser.prototype,
        PolicyAuthoriserList: PolicyAuthoriser.prototype,

    }, ViewTemplate: {
        Roles: ViewTemplateRef.prototype,
        HeaderFooters: ViewTemplateHeaderFooter.prototype,

    }, FormStatusHistory: {
        DIHistory: FormDataitemHistory.prototype,

    }, FormContext: {
        FormObservations: FormObservationInfo.prototype,

    }, FormChild: {
        Form: Form.prototype,

    }, FormDistributionDetails: {
        FormRecipient: FormRecepient.prototype,

    }, CReqMsgGetChildFormDetails: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetChildFormDetails: {
        oContextInformation: CContextInformation.prototype,
        resFormChilds: Form.prototype,

    }, CReqMsgGetAllFormChildsForADHOCCheck: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetAllFormChildsForADHOCCheck: {
        oContextInformation: CContextInformation.prototype,
        objresFormChilds: Form.prototype,

    }, CReqMsgGetFormData: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormData: {
        oContextInformation: CContextInformation.prototype,
        resFormData: FormData.prototype,

    }, CReqMsgGetFormAsso: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormAsso: {
        oContextInformation: CContextInformation.prototype,
        Imags: FormAssociations.prototype,

    }, CReqMsgGetFormObservationDetails: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormObservationDetails: {
        oContextInformation: CContextInformation.prototype,
        ObservationValues: FormObservation.prototype,

    }, CReqMsgGetFormDataNFE: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormDataNFE: {
        oContextInformation: CContextInformation.prototype,
        resFormData: FormData.prototype,

    }, CReqMsgRetrieveFormData: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgRetrieveFormData: {
        oContextInformation: CContextInformation.prototype,
        resFormData: FormData.prototype,

    }, CReqMsgGetLatestFormData: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetLatestFormData: {
        oContextInformation: CContextInformation.prototype,
        resFormData: FormData.prototype,

    }, CReqMsgGetFormDataByOIDs: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormDataByOIDs: {
        oContextInformation: CContextInformation.prototype,
        resFormData: FormData.prototype,

    }, CReqMsgGetFormDataByOIDNFE: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormDataByOIDNFE: {
        oContextInformation: CContextInformation.prototype,
        resFormData: FormData.prototype,

    }, CReqMsgGetUserAccessedForm: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetUserAccessedForm: {
        oContextInformation: CContextInformation.prototype,
        UserAccessedForms: EPRUserAccessedFormInfo.prototype,

    }, CReqMsgPatientFormDefaultSet: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgPatientFormDefaultSet: {
        oContextInformation: CContextInformation.prototype,
        PatientFormDefaultSet: PatientFormDefaultSet.prototype,

    }, CReqMsgPatientFormInstCount: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgPatientFormInstCount: {
        oContextInformation: CContextInformation.prototype,
        PatientFormInstCount: PatientFormInstCount.prototype,

    }, CReqMsgPatientChildFormDefaultSet: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgPatientChildFormDefaultSet: {
        oContextInformation: CContextInformation.prototype,
        PatientFormDefaultSet: PatientFormDefaultSet.prototype,

    }, CReqMsgGetFormDisturbutionList: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormDisturbutionList: {
        oContextInformation: CContextInformation.prototype,
        resFormrecipient: FormRecepient.prototype,

    }, CReqMsgRetrieveCustomList: {
        reqCustomListInfoBC: CustomFilterParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgRetrieveCustomList: {
        oContextInformation: CContextInformation.prototype,
        resCustomListInfo: CustomFilterParameterInfo.prototype,

    }, CReqMsgManageContext: {
        oContextInformation: CContextInformation.prototype,
        reqFormContextBC: FormContext.prototype,

    }, CResMsgManageContext: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgBulkUpdateTreatmentFnFrmCxt: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgBulkUpdateTreatmentFnFrmCxt: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgGetCareCoordinator: {
        objRequestBC: FormRecepient.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetCareCoordinator: {
        objResponse: FormRecepient.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgUpdatePTA: {
        objRequestBC: FormRecepient.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgUpdatePTA: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgManageFormStatus: {
        FormManageStatusBC: Form.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgManageFormStatus: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgGetLatestForm: {
        objFormLatestBC: FormLatestReadParamInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetLatestForm: {
        latestFormData: LatestFormData.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgGetLatestFormByDT: {
        objFormLatestBC: FormLatestReadParamInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetLatestFormByDT: {
        latestFormData: LatestFormData.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgFormSuspendDefer: {
        SuspendDeferBC: Form.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgFormSuspendDefer: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgUpdateStatusHistoryTaskOID: {
        RequestHistoryBC: FormStatusHistory.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgUpdateStatusHistoryTaskOID: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgAuthorizeForm: {
        reqFormBC: Form.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgAuthorizeForm: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgInFormUser: {
        oContextInformation: CContextInformation.prototype,
        arrFormRecepientsBC: FormRecepient.prototype,
        oLRSTransactionLogBC: LRSTransactionLog.prototype,

    }, LRSTransactionLog: {
        UserDetails: UserLoggedIn.prototype,

    }, PatientIndicatorDataValue: {
        Rules: CClindicalIndicatorRule.prototype,
        IndicatorRAGG: PatientIndicatorRAGG.prototype,
        Indicators: CIndicator.prototype,

    }, CClindicalIndicatorRule: {
        ClinicalIndicatorRuleDetails: CClindicalIndicatorRuleDetails.prototype,

    }, PatientIndicatorRAGG: {
        IndicatorEnumRAGGValue: PatientIndicatorEnumRAGG.prototype,

    }, CDCPatientIndicatorHistory: {
        DataitemHistory: CDCDataitemHistoryValue.prototype,

    }, CResMsgInFormUser: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgPendingAuthorisation: {
        reqFormBC: Form.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgPendingAuthorisation: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgSendForAuthorisation: {
        reqFormBC: Form.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgSendForAuthorisation: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgInsertForm: {
        ReqFormBC: Form.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgInsertForm: {
        ResForm: Form.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgInsertMandFormObs: {
        ReqFormBC: Form.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgInsertMandFormObs: {
        ResForm: Form.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgSaveHiMReferences: {
        oContextInformation: CContextInformation.prototype,
        reqFormHiMRefBC: FormHiMRef.prototype,

    }, FormHiMRef: {
        FormHiMIdentifier: FormHiMIdentifier.prototype,

    }, CResMsgSaveHiMReferences: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgSaveHiMRefIdentifier: {
        oContextInformation: CContextInformation.prototype,
        reqFormHiMIDBC: FormHiMIdentifier.prototype,

    }, CResMsgSaveHiMRefIdentifier: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgGetFormsDetails: {
        reqFormListInfoBC: FormsDetailsParamInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormsDetails: {
        oContextInformation: CContextInformation.prototype,
        resFormInfo: FormInfo.prototype,

    }, CReqMsgSave: {
        ReqFormBC: Form.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgSave: {
        ResForm: Form.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgGetLatestFormOID: {
        objFormContentParamBC: FormContentParam.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetLatestFormOID: {
        oContextInformation: CContextInformation.prototype,
        ResForm: Form.prototype,

    }, CReqMsgCustomSave: {
        ReqFormBC: Form.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgCustomSave: {
        ResForm: Form.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgTemporarySave: {
        ReqFormBC: Form.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgTemporarySave: {
        ResForm: Form.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgDeleteTemporaryForm: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgDeleteTemporaryForm: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgReadBulkAuthorise: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgReadBulkAuthorise: {
        oContextInformation: CContextInformation.prototype,
        objOutiFormBulkAuthorise: iFormBulkAuthorise.prototype,

    }, CReqMsgGetModifiedDataitemsValues: {
        infoBC: EPRFormReadParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetModifiedDataitemsValues: {
        oContextInformation: CContextInformation.prototype,
        resFormDIHistory: FormDataitemHistory.prototype,

    }, CReqMsgGetDIHistoryValues: {
        infoBC: ReadDIHistoryInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetDIHistoryValues: {
        oContextInformation: CContextInformation.prototype,
        Values: DataitemHistoryValues.prototype,

    }, CReqMsgGetDataitemHistoryValues: {
        infoBC: HistoryReadParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetDataitemHistoryValues: {
        oContextInformation: CContextInformation.prototype,
        Values: HistoryDataitemValues.prototype,

    }, CReqMsgGetSectionHistoryValues: {
        infoBC: HistoryReadParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetSectionHistoryValues: {
        oContextInformation: CContextInformation.prototype,
        Values: HistorySectionValues.prototype,

    }, CReqMsgGetDataitemLatestValues: {
        infoBC: LCVReadParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetDataitemLatestValues: {
        oContextInformation: CContextInformation.prototype,
        Values: DataitemLatestValues.prototype,

    }, CReqMsgGetLatestDataitemValues: {
        infoBC: EPRDataitemReadParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetLatestDataitemValues: {
        oContextInformation: CContextInformation.prototype,
        dataitemValues: FormDataitemLatestValues.prototype,

    }, FormDataitemLatestValues: {
        UnitOfMeasureValues: UOMValues.prototype,
        Children: FormDataitemLatestValues.prototype,

    }, CReqMsgGetGVDetails: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetGVDetails: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgGetFormBasicdetails: {
        infoBC: EPRFormReadParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormBasicdetails: {
        oContextInformation: CContextInformation.prototype,
        basicdetails: FormBasicDetails.prototype,

    }, CReqMsgIsLCVEnabled: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgIsLCVEnabled: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgIsViewChangesEnabled: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgIsViewChangesEnabled: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgGetFormProperties: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormProperties: {
        objFormTemplateProperties: FormTemplateProperties.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgListSearch: {
        reqFormListInfoBC: EPRFormListParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgListSearch: {
        oContextInformation: CContextInformation.prototype,
        resForm: Form.prototype,

    }, CReqMsgGetFormBasicByFormOID: {
        reqFormListInfoBC: EPRFormListParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormBasicByFormOID: {
        oContextInformation: CContextInformation.prototype,
        resForm: Form.prototype,

    }, CReqMsgGetFormByFormOID: {
        reqFormListInfoBC: EPRFormListParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormByFormOID: {
        oContextInformation: CContextInformation.prototype,
        resForm: Form.prototype,

    }, CReqMsgRetrieveUsersSearch: {
        reqFormListInfoBC: EPRFormListParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgRetrieveUsersSearch: {
        oContextInformation: CContextInformation.prototype,
        resForm: Form.prototype,

    }, CReqMsgRetrieveUsersSearchByCode: {
        reqFormListInfoBC: EPRFormListParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgRetrieveUsersSearchByCode: {
        oContextInformation: CContextInformation.prototype,
        resForm: Form.prototype,

    }, CReqMsgSendContinueFormSetCA: {
        objRequestBC: FormRecepient.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgSendContinueFormSetCA: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgGetHiMChanges: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetHiMChanges: {
        oContextInformation: CContextInformation.prototype,
        HiMDetails: HiMChangeDetails.prototype,

    }, CReqMsgGetFormSetCode: {
        objRequestBC: Form.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormSetCode: {
        oContextInformation: CContextInformation.prototype,
        objResponse: Form.prototype,

    }, CReqMsgGetPatientObservationIndicatorWithHistory: {
        objIndicatorReadParamBC: DataItemIndicatorReadParam.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetPatientObservationIndicatorWithHistory: {
        oContextInformation: CContextInformation.prototype,
        arrIndicatorHistValues: CDCPatientIndicatorHistory.prototype,

    }, CReqMsgManageDataItemIndicator: {
        objIndicatorBC: DataItemIndicatorReadParam.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgManageDataItemIndicator: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgUpdateFormOutCome: {
        objReqUpOutcmeBC: Form.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgUpdateFormOutCome: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgGetHiMReferences: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetHiMReferences: {
        oContextInformation: CContextInformation.prototype,
        resFormHiMRef: FormHiMRef.prototype,

    }, CReqMsgGroupByCTX: {
        readParamBC: EPRFormListParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGroupByCTX: {
        IsNonereq: Object.prototype,
        oContextInformation: CContextInformation.prototype,
        formContext: FormContext.prototype,

    }, CReqMsgGetFormByCTX: {
        readParamBC: EPRFormListParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormByCTX: {
        oContextInformation: CContextInformation.prototype,
        resForm: Form.prototype,

    }, CReqMsgGetFormForCTXNone: {
        readParamBC: EPRFormListParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormForCTXNone: {
        oContextInformation: CContextInformation.prototype,
        resForm: Form.prototype,

    }, CReqMsgGetFormassessment: {
        readParamInfoBC: EPRFormListParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormassessment: {
        oContextInformation: CContextInformation.prototype,
        resForm: Form.prototype,

    }, CReqMsgIFMFormTemplateMandChk: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgIFMFormTemplateMandChk: {
        oContextInformation: CContextInformation.prototype,
        objOutList: Object.prototype,

    }, CReqMsgGetPrintFormDetails: {
        reqFormReadInfoBC: EPRFormReadParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetPrintFormDetails: {
        objforms: Form.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgGetFormPrintPlcyCode: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormPrintPlcyCode: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgCheckIsInsertedForm: {
        oRequestBC: EPRFormReadParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgCheckIsInsertedForm: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgGetInsertedFormSetRules: {
        reqFSRuleReadInfoBC: EPRFormReadParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetInsertedFormSetRules: {
        oContextInformation: CContextInformation.prototype,
        resFSRule: FSRuleValue.prototype,

    }, CReqMsgGetLatestFormByObservation: {
        objPatINDTrackBC: PatientIndicatorTracking.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetLatestFormByObservation: {
        objFormDetails: HistoryFormDIResponse.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgGetFormInfo: {
        reqFormBC: FormInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormInfo: {
        resForm: FormInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgSendIntrayAlertForOverrided: {
        formPatientSensitiveBC: FormPatientSensitive.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgSendIntrayAlertForOverrided: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgSaveFormDistributionDetails: {
        FrmDistBC: FormDistributionDetails.prototype,
        oContextInformation: CContextInformation.prototype,
        oLRSTransactionLogBC: LRSTransactionLog.prototype,

    }, CResMsgSaveFormDistributionDetails: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgGetDistributedFormDetails: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetDistributedFormDetails: {
        oContextInformation: CContextInformation.prototype,
        FrmDistDetails: FormRecepient.prototype,

    }, CReqMsgInstantiateForm: {
        reqFormBC: Form.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgInstantiateForm: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgSendFormsToIntray: {
        FormToSendBC: Form.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgSendFormsToIntray: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgUpdateFormNA: {
        ReqUpdateFormNABC: Form.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgUpdateFormNA: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgUpdateFormStatus: {
        ReqFormWithStatusBC: Form.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgUpdateFormStatus: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgSaveDocAssociation: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgSaveDocAssociation: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgManageFormDocAssociation: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgManageFormDocAssociation: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgDeleteFormDocAssociation: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgDeleteFormDocAssociation: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgContinueFormSet: {
        ReqFormSetContinueBC: Form.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgContinueFormSet: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgUpdateFormPatient: {
        ReqFormPatientBC: FormPatient.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgUpdateFormPatient: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgRetrieveFormbyFilter: {
        reqFormListInfoBC: EPRFormListParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgRetrieveFormbyFilter: {
        oContextInformation: CContextInformation.prototype,
        resForm: Form.prototype,

    }, CReqMsgGetFSChildList: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFSChildList: {
        oContextInformation: CContextInformation.prototype,
        resFormChild: Form.prototype,

    }, CReqMsgGetFSChildListNFE: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFSChildListNFE: {
        oContextInformation: CContextInformation.prototype,
        resFormChild: Form.prototype,

    }, CReqMsgGetInitiateRightsForUser: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetInitiateRightsForUser: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgRead: {
        reqFormReadInfoBC: EPRFormReadParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgRead: {
        resForm: Form.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgRetrieveFormSetRules: {
        reqFSRuleReadInfoBC: EPRFormReadParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgRetrieveFormSetRules: {
        oContextInformation: CContextInformation.prototype,
        resFSRule: FSRuleValue.prototype,

    }, CReqMsgRetrieveObsoleteFormData: {
        reqObsFormBC: EPRFormReadParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgRetrieveObsoleteFormData: {
        oContextInformation: CContextInformation.prototype,
        resObsFMData: InsObsoleteFormDet.prototype,

    }, CReqMsgGetAssesedDetails: {
        reqFormBC: Form.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetAssesedDetails: {
        oContextInformation: CContextInformation.prototype,
        resAssDet: AssesedDetails.prototype,

    }, CReqMsgGetUserCPRole: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetUserCPRole: {
        oContextInformation: CContextInformation.prototype,
        UserCPRole: CPRole.prototype,

    }, CReqMsgGetTSDetails: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetTSDetails: {
        oContextInformation: CContextInformation.prototype,
        Objdet: TeamSpecDetails.prototype,

    }, CReqMsgGetRDLTemplate: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetRDLTemplate: {
        oContextInformation: CContextInformation.prototype,
        resFrmtemplate: RDLFormTemplate.prototype,

    }, CReqMsgRetrieveFMOIDByTask: {
        reqTaskBC: FSRuleIntray.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgRetrieveFMOIDByTask: {
        oContextInformation: CContextInformation.prototype,
        resFormDet: FSRuleIntray.prototype,

    }, CReqMsgGetFormDataItemImage: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormDataItemImage: {
        oContextInformation: CContextInformation.prototype,
        DataitemImage: FormDataitemImage.prototype,

    }, CReqMsgGetFormDIImageTemp: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormDIImageTemp: {
        oContextInformation: CContextInformation.prototype,
        DataitemImageTemp: FormDataitemImageTemp.prototype,

    }, CReqMsgGetFormDocAssociation: {
        reqFormDocBC: FormDocAssociation.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormDocAssociation: {
        resFormDoc: FormDocAssociation.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgGetFormDetails: {
        reqFormBC: EPRFormReadParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormDetails: {
        resForm: Form.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgGetFormBasicDet: {
        reqFormBC: EPRFormReadParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormBasicDet: {
        resForm: Form.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgGetFormDetailsFromIntray: {
        reqFormBC: EPRFormReadParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormDetailsFromIntray: {
        resForm: FormBasicDetails.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgGetAuthObserver: {
        reqFormBC: EPRFormReadParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetAuthObserver: {
        oContextInformation: CContextInformation.prototype,
        resFormObserver: FormObserver.prototype,

    }, CReqMsgGetFormObsView: {
        reqFormBC: EPRFormReadParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormObsView: {
        oContextInformation: CContextInformation.prototype,
        resFormObserver: FormObserver.prototype,

    }, CReqMsgGetObservedSTDT: {
        reqFormBC: EPRFormReadParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetObservedSTDT: {
        oContextInformation: CContextInformation.prototype,
        resFormObserver: FormObserver.prototype,

    }, CReqMsgGetFormAuthorisation: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormAuthorisation: {
        oContextInformation: CContextInformation.prototype,
        resFormAuthorisation: FormAuthorisation.prototype,

    }, CReqMsgGetFormComments: {
        reqFormBC: EPRFormReadParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormComments: {
        oContextInformation: CContextInformation.prototype,
        resFormComments: FormComments.prototype,

    }, CReqMsgGetFormContext: {
        reqFormBC: EPRFormReadParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormContext: {
        oContextInformation: CContextInformation.prototype,
        resFormContext: FormContext.prototype,

    }, CReqMsgGetFormContextbyType: {
        reqFormBC: EPRFormReadParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormContextbyType: {
        oContextInformation: CContextInformation.prototype,
        resFormContext: FormContext.prototype,

    }, CReqMsgGetFormContextByOIDs: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormContextByOIDs: {
        oContextInformation: CContextInformation.prototype,
        resFormContext: FormContext.prototype,

    }, CReqMsgGetFormPolicy: {
        reqFormBC: EPRFormReadParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormPolicy: {
        oContextInformation: CContextInformation.prototype,
        resFormPolicy: FormPolicy.prototype,

    }, CReqMsgGetFormStatus: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormStatus: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgGetFormWorkingStatus: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormWorkingStatus: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgGetFrmStatus: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFrmStatus: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgClinicalFlag: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgClinicalFlag: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgGetFSTaskMgmtStatus: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFSTaskMgmtStatus: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgGetFormWS: {
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormWS: {
        oContextInformation: CContextInformation.prototype,

    }, CReqMsgGetFormStatusHistoryDetails: {
        reqFormBC: EPRFormReadParameterInfo.prototype,
        oContextInformation: CContextInformation.prototype,

    }, CResMsgGetFormStatusHistoryDetails: {
        oContextInformation: CContextInformation.prototype,
        resFormStsHistory: FormStatusHistory.prototype,

    }, CContextInformation: {
        Current: CContextInformation.prototype,

    },
}

const charPropertyLookup = [
'EncounterStatus',
'IsIncludeImageSection','IsViewDIHistory',
'CGetFinalisedForm',
'LRCreateType',
'sIsRepeatableDataRule','NumericalSignage','SignificantValue','cResetRepeatcount',
'cRAGCalculateBy','cIndicatorType','cRuleMethod','LaunchForm',
'IsSharedList',
'Status',
'isDisableTaskManagement',]
 