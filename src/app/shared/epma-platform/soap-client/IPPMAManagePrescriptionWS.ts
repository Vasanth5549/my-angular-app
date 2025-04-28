import { int64, int16, int32, uInt16, uInt32, uInt64, byte, long, double, decimal, DelegateArgs, CContextInformation, CLZOObject} from "epma-platform/models";
import { ObservableCollection } from "../models/observable-collection";
import DateTime from "../services/datetime.service";
import { HelperService } from "./helper.service";
import { CError } from "../models/eppma-common-types";

export class IPPMAManagePrescriptionWSSoapClient{

  GetBrandOptionsCompleted: Function;
  GetBrandOptionsAsync(oCReqMsgGetBrandOptions:CReqMsgGetBrandOptions ) : void {
    HelperService.Invoke<CReqMsgGetBrandOptions,CResMsgGetBrandOptions,GetBrandOptionsCompletedEventArgs>("IPPMAManagePrescriptionWS.GetBrandOptions",oCReqMsgGetBrandOptions,this.GetBrandOptionsCompleted,"oBrandData",new GetBrandOptionsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetTeamMembersWithPermissionCompleted: Function;
  GetTeamMembersWithPermissionAsync(oCReqMsgGetTeamMembersWithPermission:CReqMsgGetTeamMembersWithPermission ) : void {
    HelperService.Invoke<CReqMsgGetTeamMembersWithPermission,CResMsgGetTeamMembersWithPermission,GetTeamMembersWithPermissionCompletedEventArgs>("IPPMAManagePrescriptionWS.GetTeamMembersWithPermission",oCReqMsgGetTeamMembersWithPermission,this.GetTeamMembersWithPermissionCompleted,"TeamOID",new GetTeamMembersWithPermissionCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetResolveDetailCompleted: Function;
  GetResolveDetailAsync(oCReqMsgGetResolveDetail:CReqMsgGetResolveDetail ) : void {
    HelperService.Invoke<CReqMsgGetResolveDetail,CResMsgGetResolveDetail,GetResolveDetailCompletedEventArgs>("IPPMAManagePrescriptionWS.GetResolveDetail",oCReqMsgGetResolveDetail,this.GetResolveDetailCompleted,"cFollowupStat",new GetResolveDetailCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  VerifyDrugCompleted: Function;
  VerifyDrugAsync(oCReqMsgVerifyDrug:CReqMsgVerifyDrug ) : void {
    HelperService.Invoke<CReqMsgVerifyDrug,CResMsgVerifyDrug,VerifyDrugCompletedEventArgs>("IPPMAManagePrescriptionWS.VerifyDrug",oCReqMsgVerifyDrug,this.VerifyDrugCompleted,"objPrescriptionRes",new VerifyDrugCompletedEventArgs(), prototypeList, charPropertyLookup, configuration);
  }
  
  GetPatientMedicationHistoryCompleted: Function;
  GetPatientMedicationHistoryAsync(oCReqMsgGetPatientMedicationHistory:CReqMsgGetPatientMedicationHistory ) : void {
    HelperService.Invoke<CReqMsgGetPatientMedicationHistory,CResMsgGetPatientMedicationHistory,GetPatientMedicationHistoryCompletedEventArgs>("IPPMAManagePrescriptionWS.GetPatientMedicationHistory",oCReqMsgGetPatientMedicationHistory,this.GetPatientMedicationHistoryCompleted,"PageElement",new GetPatientMedicationHistoryCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetRelatedOptionsCompleted: Function;
  GetRelatedOptionsAsync(oCReqMsgGetRelatedOptions:CReqMsgGetRelatedOptions ) : void {
    HelperService.Invoke<CReqMsgGetRelatedOptions,CResMsgGetRelatedOptions,GetRelatedOptionsCompletedEventArgs>("IPPMAManagePrescriptionWS.GetRelatedOptions",oCReqMsgGetRelatedOptions,this.GetRelatedOptionsCompleted,"oDrugItemInputData",new GetRelatedOptionsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetIPPDrugDetailsCompleted: Function;
  GetIPPDrugDetailsAsync(oCReqMsgGetIPPDrugDetails:CReqMsgGetIPPDrugDetails ) : void {
    HelperService.Invoke<CReqMsgGetIPPDrugDetails,CResMsgGetIPPDrugDetails,GetIPPDrugDetailsCompletedEventArgs>("IPPMAManagePrescriptionWS.GetIPPDrugDetails",oCReqMsgGetIPPDrugDetails,this.GetIPPDrugDetailsCompleted,"IsBreak",new GetIPPDrugDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetIPPTechValDrugsCompleted: Function;
  GetIPPTechValDrugsAsync(oCReqMsgGetIPPTechValDrugs:CReqMsgGetIPPTechValDrugs ) : void {
    HelperService.Invoke<CReqMsgGetIPPTechValDrugs,CResMsgGetIPPTechValDrugs,GetIPPTechValDrugsCompletedEventArgs>("IPPMAManagePrescriptionWS.GetIPPTechValDrugs",oCReqMsgGetIPPTechValDrugs,this.GetIPPTechValDrugsCompleted,"IsBreak",new GetIPPTechValDrugsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  UpdateIVAlertShownForItemCompleted: Function;
  UpdateIVAlertShownForItemAsync(oCReqMsgUpdateIVAlertShownForItem:CReqMsgUpdateIVAlertShownForItem ) : void {
    HelperService.Invoke<CReqMsgUpdateIVAlertShownForItem,CResMsgUpdateIVAlertShownForItem,UpdateIVAlertShownForItemCompletedEventArgs>("IPPMAManagePrescriptionWS.UpdateIVAlertShownForItem",oCReqMsgUpdateIVAlertShownForItem,this.UpdateIVAlertShownForItemCompleted,"PrescriptionItemOIDs",new UpdateIVAlertShownForItemCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetMedicationConfilictConfigCompleted: Function;
  GetMedicationConfilictConfigAsync(oCReqMsgGetMedicationConfilictConfig:CReqMsgGetMedicationConfilictConfig ) : void {
    HelperService.Invoke<CReqMsgGetMedicationConfilictConfig,CResMsgGetMedicationConfilictConfig,GetMedicationConfilictConfigCompletedEventArgs>("IPPMAManagePrescriptionWS.GetMedicationConfilictConfig",oCReqMsgGetMedicationConfilictConfig,this.GetMedicationConfilictConfigCompleted,"IsMainAppConflicts",new GetMedicationConfilictConfigCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetLastCreatedPrescTypeForEncCompleted: Function;
  GetLastCreatedPrescTypeForEncAsync(oCReqMsgGetLastCreatedPrescTypeForEnc:CReqMsgGetLastCreatedPrescTypeForEnc ) : void {
    HelperService.Invoke<CReqMsgGetLastCreatedPrescTypeForEnc,CResMsgGetLastCreatedPrescTypeForEnc,GetLastCreatedPrescTypeForEncCompletedEventArgs>("IPPMAManagePrescriptionWS.GetLastCreatedPrescTypeForEnc",oCReqMsgGetLastCreatedPrescTypeForEnc,this.GetLastCreatedPrescTypeForEncCompleted,"EncounterOID",new GetLastCreatedPrescTypeForEncCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetPrescriptionViewCompleted: Function;
  GetPrescriptionViewAsync(oCReqMsgGetPrescriptionView:CReqMsgGetPrescriptionView ) : void {
    HelperService.Invoke<CReqMsgGetPrescriptionView,CResMsgGetPrescriptionView,GetPrescriptionViewCompletedEventArgs>("IPPMAManagePrescriptionWS.GetPrescriptionView",oCReqMsgGetPrescriptionView,this.GetPrescriptionViewCompleted,"CurrentPageConfig",new GetPrescriptionViewCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetIPPDecisionSupportCompleted: Function;
  GetIPPDecisionSupportAsync(oCReqMsgGetIPPDecisionSupport:CReqMsgGetIPPDecisionSupport ) : void {
    HelperService.Invoke<CReqMsgGetIPPDecisionSupport,CResMsgGetIPPDecisionSupport,GetIPPDecisionSupportCompletedEventArgs>("IPPMAManagePrescriptionWS.GetIPPDecisionSupport",oCReqMsgGetIPPDecisionSupport,this.GetIPPDecisionSupportCompleted,"objDecisionSuppCriteria",new GetIPPDecisionSupportCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetIPPFavouritesDefaultFolderCompleted: Function;
  GetIPPFavouritesDefaultFolderAsync(oCReqMsgGetIPPFavouritesDefaultFolder:CReqMsgGetIPPFavouritesDefaultFolder ) : void {
    HelperService.Invoke<CReqMsgGetIPPFavouritesDefaultFolder,CResMsgGetIPPFavouritesDefaultFolder,GetIPPFavouritesDefaultFolderCompletedEventArgs>("IPPMAManagePrescriptionWS.GetIPPFavouritesDefaultFolder",oCReqMsgGetIPPFavouritesDefaultFolder,this.GetIPPFavouritesDefaultFolderCompleted,"GastationAgeInDays",new GetIPPFavouritesDefaultFolderCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetMCpresitemCompleted: Function;
  GetMCpresitemAsync(oCReqMsgGetMCpresitem:CReqMsgGetMCpresitem ) : void {
    HelperService.Invoke<CReqMsgGetMCpresitem,CResMsgGetMCpresitem,GetMCpresitemCompletedEventArgs>("IPPMAManagePrescriptionWS.GetMCpresitem",oCReqMsgGetMCpresitem,this.GetMCpresitemCompleted,"SupDisInst",new GetMCpresitemCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  AuthoriseDrugsCompleted: Function;
  AuthoriseDrugsAsync(oCReqMsgAuthoriseDrugs:CReqMsgAuthoriseDrugs ) : void {
    HelperService.Invoke<CReqMsgAuthoriseDrugs,CResMsgAuthoriseDrugs,AuthoriseDrugsCompletedEventArgs>("IPPMAManagePrescriptionWS.AuthoriseDrugs",oCReqMsgAuthoriseDrugs,this.AuthoriseDrugsCompleted,"objPrescriptionRes",new AuthoriseDrugsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetAdministrationTimesCompleted: Function;
  GetAdministrationTimesAsync(oCReqMsgGetAdministrationTimes:CReqMsgGetAdministrationTimes ) : void {
    HelperService.Invoke<CReqMsgGetAdministrationTimes,CResMsgGetAdministrationTimes,GetAdministrationTimesCompletedEventArgs>("IPPMAManagePrescriptionWS.GetAdministrationTimes",oCReqMsgGetAdministrationTimes,this.GetAdministrationTimesCompleted,"sMCVersion",new GetAdministrationTimesCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  IsPreviousDueOverdueSlotExistsCompleted: Function;
  IsPreviousDueOverdueSlotExistsAsync(oCReqMsgIsPreviousDueOverdueSlotExists:CReqMsgIsPreviousDueOverdueSlotExists ) : void {
    HelperService.Invoke<CReqMsgIsPreviousDueOverdueSlotExists,CResMsgIsPreviousDueOverdueSlotExists,IsPreviousDueOverdueSlotExistsCompletedEventArgs>("IPPMAManagePrescriptionWS.IsPreviousDueOverdueSlotExists",oCReqMsgIsPreviousDueOverdueSlotExists,this.IsPreviousDueOverdueSlotExistsCompleted,"bChkOverdueExists",new IsPreviousDueOverdueSlotExistsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetPatientMedicationListCompleted: Function;
  GetPatientMedicationListAsync(oCReqMsgGetPatientMedicationList:CReqMsgGetPatientMedicationList ) : void {
    HelperService.Invoke<CReqMsgGetPatientMedicationList,CResMsgGetPatientMedicationList,GetPatientMedicationListCompletedEventArgs>("IPPMAManagePrescriptionWS.GetPatientMedicationList",oCReqMsgGetPatientMedicationList,this.GetPatientMedicationListCompleted,"oMedicationListCriteria",new GetPatientMedicationListCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetSequencePrescriptionItemStatusCompleted: Function;
  GetSequencePrescriptionItemStatusAsync(oCReqMsgGetSequencePrescriptionItemStatus:CReqMsgGetSequencePrescriptionItemStatus ) : void {
    HelperService.Invoke<CReqMsgGetSequencePrescriptionItemStatus,CResMsgGetSequencePrescriptionItemStatus,GetSequencePrescriptionItemStatusCompletedEventArgs>("IPPMAManagePrescriptionWS.GetSequencePrescriptionItemStatus",oCReqMsgGetSequencePrescriptionItemStatus,this.GetSequencePrescriptionItemStatusCompleted,"oMedicationListCriteria",new GetSequencePrescriptionItemStatusCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetIPPPatientMedicationCountCompleted: Function;
  GetIPPPatientMedicationCountAsync(oCReqMsgGetIPPPatientMedicationCount:CReqMsgGetIPPPatientMedicationCount ) : void {
    HelperService.Invoke<CReqMsgGetIPPPatientMedicationCount,CResMsgGetIPPPatientMedicationCount,GetIPPPatientMedicationCountCompletedEventArgs>("IPPMAManagePrescriptionWS.GetIPPPatientMedicationCount",oCReqMsgGetIPPPatientMedicationCount,this.GetIPPPatientMedicationCountCompleted,"PrescriptionType",new GetIPPPatientMedicationCountCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetDrugDetailsCompleted: Function;
  GetDrugDetailsAsync(oCReqMsgGetDrugDetails:CReqMsgGetDrugDetails ) : void {
    HelperService.Invoke<CReqMsgGetDrugDetails,CResMsgGetDrugDetails,GetDrugDetailsCompletedEventArgs>("IPPMAManagePrescriptionWS.GetDrugDetails",oCReqMsgGetDrugDetails,this.GetDrugDetailsCompleted,"PresIdentifyingType",new GetDrugDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetAdditionalDetailsCompleted: Function;
  GetAdditionalDetailsAsync(oCReqMsgGetAdditionalDetails:CReqMsgGetAdditionalDetails ) : void {
    HelperService.Invoke<CReqMsgGetAdditionalDetails,CResMsgGetAdditionalDetails,GetAdditionalDetailsCompletedEventArgs>("IPPMAManagePrescriptionWS.GetAdditionalDetails",oCReqMsgGetAdditionalDetails,this.GetAdditionalDetailsCompleted,"PrescriptionItemOID",new GetAdditionalDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetSupDispInstDetailsCompleted: Function;
  GetSupDispInstDetailsAsync(oCReqMsgGetSupDispInstDetails:CReqMsgGetSupDispInstDetails ) : void {
    HelperService.Invoke<CReqMsgGetSupDispInstDetails,CResMsgGetSupDispInstDetails,GetSupDispInstDetailsCompletedEventArgs>("IPPMAManagePrescriptionWS.GetSupDispInstDetails",oCReqMsgGetSupDispInstDetails,this.GetSupDispInstDetailsCompleted,"PrescriptionItemOID",new GetSupDispInstDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetIPPPrescriptionDetailsCompleted: Function;
  GetIPPPrescriptionDetailsAsync(oCReqMsgGetIPPPrescriptionDetails:CReqMsgGetIPPPrescriptionDetails ) : void {
    HelperService.Invoke<CReqMsgGetIPPPrescriptionDetails,CResMsgGetIPPPrescriptionDetails,GetIPPPrescriptionDetailsCompletedEventArgs>("IPPMAManagePrescriptionWS.GetIPPPrescriptionDetails",oCReqMsgGetIPPPrescriptionDetails,this.GetIPPPrescriptionDetailsCompleted,"oPrescriptionItemInputData",new GetIPPPrescriptionDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  DummyMethodCompleted: Function;
  DummyMethodAsync(oCReqMsgDummyMethod:CReqMsgDummyMethod ) : void {
    HelperService.Invoke<CReqMsgDummyMethod,CResMsgDummyMethod,DummyMethodCompletedEventArgs>("IPPMAManagePrescriptionWS.DummyMethod",oCReqMsgDummyMethod,this.DummyMethodCompleted,"oIPPPrescriptionItemView",new DummyMethodCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetDrugSitesCompleted: Function;
  GetDrugSitesAsync(oCReqMsgGetDrugSites:CReqMsgGetDrugSites ) : void {
    HelperService.Invoke<CReqMsgGetDrugSites,CResMsgGetDrugSites,GetDrugSitesCompletedEventArgs>("IPPMAManagePrescriptionWS.GetDrugSites",oCReqMsgGetDrugSites,this.GetDrugSitesCompleted,"MCVersion",new GetDrugSitesCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  IsDrugAdminStartedCompleted: Function;
  IsDrugAdminStartedAsync(oCReqMsgIsDrugAdminStarted:CReqMsgIsDrugAdminStarted ) : void {
    HelperService.Invoke<CReqMsgIsDrugAdminStarted,CResMsgIsDrugAdminStarted,IsDrugAdminStartedCompletedEventArgs>("IPPMAManagePrescriptionWS.IsDrugAdminStarted",oCReqMsgIsDrugAdminStarted,this.IsDrugAdminStartedCompleted,"nPatientOID",new IsDrugAdminStartedCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetFormViewDefaultParamsCompleted: Function;
  GetFormViewDefaultParamsAsync(oCReqMsgGetFormViewDefaultParams:CReqMsgGetFormViewDefaultParams ) : void {
    HelperService.Invoke<CReqMsgGetFormViewDefaultParams,CResMsgGetFormViewDefaultParams,GetFormViewDefaultParamsCompletedEventArgs>("IPPMAManagePrescriptionWS.GetFormViewDefaultParams",oCReqMsgGetFormViewDefaultParams,this.GetFormViewDefaultParamsCompleted,"objFormViewParams",new GetFormViewDefaultParamsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetSnomedForPrescribedItemCompleted: Function;
  GetSnomedForPrescribedItemAsync(oCReqMsgGetSnomedForPrescribedItem:CReqMsgGetSnomedForPrescribedItem ) : void {
    HelperService.Invoke<CReqMsgGetSnomedForPrescribedItem,CResMsgGetSnomedForPrescribedItem,GetSnomedForPrescribedItemCompletedEventArgs>("IPPMAManagePrescriptionWS.GetSnomedForPrescribedItem",oCReqMsgGetSnomedForPrescribedItem,this.GetSnomedForPrescribedItemCompleted,"oWnerOrganisationoid",new GetSnomedForPrescribedItemCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetMedicationsForInpatientCompleted: Function;
  GetMedicationsForInpatientAsync(oCReqMsgGetMedicationsForInpatient:CReqMsgGetMedicationsForInpatient ) : void {
    HelperService.Invoke<CReqMsgGetMedicationsForInpatient,CResMsgGetMedicationsForInpatient,GetMedicationsForInpatientCompletedEventArgs>("IPPMAManagePrescriptionWS.GetMedicationsForInpatient",oCReqMsgGetMedicationsForInpatient,this.GetMedicationsForInpatientCompleted,"PRTYPCODE",new GetMedicationsForInpatientCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  CheckPrescribeRuleCompleted: Function;
  CheckPrescribeRuleAsync(oCReqMsgCheckPrescribeRule:CReqMsgCheckPrescribeRule ) : void {
    HelperService.Invoke<CReqMsgCheckPrescribeRule,CResMsgCheckPrescribeRule,CheckPrescribeRuleCompletedEventArgs>("IPPMAManagePrescriptionWS.CheckPrescribeRule",oCReqMsgCheckPrescribeRule,this.CheckPrescribeRuleCompleted,"strRule",new CheckPrescribeRuleCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetNonReconciledItemsCompleted: Function;
  GetNonReconciledItemsAsync(oCReqMsgGetNonReconciledItems:CReqMsgGetNonReconciledItems ) : void {
    HelperService.Invoke<CReqMsgGetNonReconciledItems,CResMsgGetNonReconciledItems,GetNonReconciledItemsCompletedEventArgs>("IPPMAManagePrescriptionWS.GetNonReconciledItems",oCReqMsgGetNonReconciledItems,this.GetNonReconciledItemsCompleted,"oPrescriptionItemCriteria",new GetNonReconciledItemsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetDosageFormTypeCompleted: Function;
  GetDosageFormTypeAsync(oCReqMsgGetDosageFormType:CReqMsgGetDosageFormType ) : void {
    HelperService.Invoke<CReqMsgGetDosageFormType,CResMsgGetDosageFormType,GetDosageFormTypeCompletedEventArgs>("IPPMAManagePrescriptionWS.GetDosageFormType",oCReqMsgGetDosageFormType,this.GetDosageFormTypeCompleted,"objItemInputData",new GetDosageFormTypeCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetProcessingOptionsCompleted: Function;
  GetProcessingOptionsAsync(oCReqMsgGetProcessingOptions:CReqMsgGetProcessingOptions ) : void {
    HelperService.Invoke<CReqMsgGetProcessingOptions,CResMsgGetProcessingOptions,GetProcessingOptionsCompletedEventArgs>("IPPMAManagePrescriptionWS.GetProcessingOptions",oCReqMsgGetProcessingOptions,this.GetProcessingOptionsCompleted,"oDrugItemInputData",new GetProcessingOptionsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  SearchProcessingOptionsByIndicationsCompleted: Function;
  SearchProcessingOptionsByIndicationsAsync(oCReqMsgSearchProcessingOptionsByIndications:CReqMsgSearchProcessingOptionsByIndications ) : void {
    HelperService.Invoke<CReqMsgSearchProcessingOptionsByIndications,CResMsgSearchProcessingOptionsByIndications,SearchProcessingOptionsByIndicationsCompletedEventArgs>("IPPMAManagePrescriptionWS.SearchProcessingOptionsByIndications",oCReqMsgSearchProcessingOptionsByIndications,this.SearchProcessingOptionsByIndicationsCompleted,"oIndications",new SearchProcessingOptionsByIndicationsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetFavouritesDrugItemCompleted: Function;
  GetFavouritesDrugItemAsync(oCReqMsgGetFavouritesDrugItem:CReqMsgGetFavouritesDrugItem ) : void {
    HelperService.Invoke<CReqMsgGetFavouritesDrugItem,CResMsgGetFavouritesDrugItem,GetFavouritesDrugItemCompletedEventArgs>("IPPMAManagePrescriptionWS.GetFavouritesDrugItem",oCReqMsgGetFavouritesDrugItem,this.GetFavouritesDrugItemCompleted,"MVersion",new GetFavouritesDrugItemCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetResolveDefaultCompleted: Function;
  GetResolveDefaultAsync(oCReqMsgGetResolveDefault:CReqMsgGetResolveDefault ) : void {
    HelperService.Invoke<CReqMsgGetResolveDefault,CResMsgGetResolveDefault,GetResolveDefaultCompletedEventArgs>("IPPMAManagePrescriptionWS.GetResolveDefault",oCReqMsgGetResolveDefault,this.GetResolveDefaultCompleted,"oDrugItemInputData",new GetResolveDefaultCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetPrescriptionItemDoseInfoCompleted: Function;
  GetPrescriptionItemDoseInfoAsync(oCReqMsgGetPrescriptionItemDoseInfo:CReqMsgGetPrescriptionItemDoseInfo ) : void {
    HelperService.Invoke<CReqMsgGetPrescriptionItemDoseInfo,CResMsgGetPrescriptionItemDoseInfo,GetPrescriptionItemDoseInfoCompletedEventArgs>("IPPMAManagePrescriptionWS.GetPrescriptionItemDoseInfo",oCReqMsgGetPrescriptionItemDoseInfo,this.GetPrescriptionItemDoseInfoCompleted,"PrescriptionItemOID",new GetPrescriptionItemDoseInfoCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetIPPPrescriptionItemDoseInfoCompleted: Function;
  GetIPPPrescriptionItemDoseInfoAsync(oCReqMsgGetIPPPrescriptionItemDoseInfo:CReqMsgGetIPPPrescriptionItemDoseInfo ) : void {
    HelperService.Invoke<CReqMsgGetIPPPrescriptionItemDoseInfo,CResMsgGetIPPPrescriptionItemDoseInfo,GetIPPPrescriptionItemDoseInfoCompletedEventArgs>("IPPMAManagePrescriptionWS.GetIPPPrescriptionItemDoseInfo",oCReqMsgGetIPPPrescriptionItemDoseInfo,this.GetIPPPrescriptionItemDoseInfoCompleted,"sMcVersionNo",new GetIPPPrescriptionItemDoseInfoCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetIPPPrescribableItemDoseInfoCompleted: Function;
  GetIPPPrescribableItemDoseInfoAsync(oCReqMsgGetIPPPrescribableItemDoseInfo:CReqMsgGetIPPPrescribableItemDoseInfo ) : void {
    HelperService.Invoke<CReqMsgGetIPPPrescribableItemDoseInfo,CResMsgGetIPPPrescribableItemDoseInfo,GetIPPPrescribableItemDoseInfoCompletedEventArgs>("IPPMAManagePrescriptionWS.GetIPPPrescribableItemDoseInfo",oCReqMsgGetIPPPrescribableItemDoseInfo,this.GetIPPPrescribableItemDoseInfoCompleted,"sMcVersionNo",new GetIPPPrescribableItemDoseInfoCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetTitratedDoseInfoCompleted: Function;
  GetTitratedDoseInfoAsync(oCReqMsgGetTitratedDoseInfo:CReqMsgGetTitratedDoseInfo ) : void {
    HelperService.Invoke<CReqMsgGetTitratedDoseInfo,CResMsgGetTitratedDoseInfo,GetTitratedDoseInfoCompletedEventArgs>("IPPMAManagePrescriptionWS.GetTitratedDoseInfo",oCReqMsgGetTitratedDoseInfo,this.GetTitratedDoseInfoCompleted,"PrescriptionItemOID",new GetTitratedDoseInfoCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetIPPFrequencyCompleted: Function;
  GetIPPFrequencyAsync(oCReqMsgGetIPPFrequency:CReqMsgGetIPPFrequency ) : void {
    HelperService.Invoke<CReqMsgGetIPPFrequency,CResMsgGetIPPFrequency,GetIPPFrequencyCompletedEventArgs>("IPPMAManagePrescriptionWS.GetIPPFrequency",oCReqMsgGetIPPFrequency,this.GetIPPFrequencyCompleted,"cIsDefault",new GetIPPFrequencyCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetSysFormViewerSpecificDefaultValuesCompleted: Function;
  GetSysFormViewerSpecificDefaultValuesAsync(oCReqMsgGetSysFormViewerSpecificDefaultValues:CReqMsgGetSysFormViewerSpecificDefaultValues ) : void {
    HelperService.Invoke<CReqMsgGetSysFormViewerSpecificDefaultValues,CResMsgGetSysFormViewerSpecificDefaultValues,GetSysFormViewerSpecificDefaultValuesCompletedEventArgs>("IPPMAManagePrescriptionWS.GetSysFormViewerSpecificDefaultValues",oCReqMsgGetSysFormViewerSpecificDefaultValues,this.GetSysFormViewerSpecificDefaultValuesCompleted,"objFormViewParams",new GetSysFormViewerSpecificDefaultValuesCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  InvokeDRCConflictCompleted: Function;
  InvokeDRCConflictAsync(oCReqMsgInvokeDRCConflict:CReqMsgInvokeDRCConflict ) : void {
    HelperService.Invoke<CReqMsgInvokeDRCConflict,CResMsgInvokeDRCConflict,InvokeDRCConflictCompletedEventArgs>("IPPMAManagePrescriptionWS.InvokeDRCConflict",oCReqMsgInvokeDRCConflict,this.InvokeDRCConflictCompleted,"oDRCObject",new InvokeDRCConflictCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetDRCConflictsCompleted: Function;
  GetDRCConflictsAsync(oCReqMsgGetDRCConflicts:CReqMsgGetDRCConflicts ) : void {
    HelperService.Invoke<CReqMsgGetDRCConflicts,CResMsgGetDRCConflicts,GetDRCConflictsCompletedEventArgs>("IPPMAManagePrescriptionWS.GetDRCConflicts",oCReqMsgGetDRCConflicts,this.GetDRCConflictsCompleted,"PatientOID",new GetDRCConflictsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetUnresolvedConflictsCompleted: Function;
  GetUnresolvedConflictsAsync(oCReqMsgGetUnresolvedConflicts:CReqMsgGetUnresolvedConflicts ) : void {
    HelperService.Invoke<CReqMsgGetUnresolvedConflicts,CResMsgGetUnresolvedConflicts,GetUnresolvedConflictsCompletedEventArgs>("IPPMAManagePrescriptionWS.GetUnresolvedConflicts",oCReqMsgGetUnresolvedConflicts,this.GetUnresolvedConflictsCompleted,"PatientOID",new GetUnresolvedConflictsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  IsUnresolvedConflictsExistCompleted: Function;
  IsUnresolvedConflictsExistAsync(oCReqMsgIsUnresolvedConflictsExist:CReqMsgIsUnresolvedConflictsExist ) : void {
    HelperService.Invoke<CReqMsgIsUnresolvedConflictsExist,CResMsgIsUnresolvedConflictsExist,IsUnresolvedConflictsExistCompletedEventArgs>("IPPMAManagePrescriptionWS.IsUnresolvedConflictsExist",oCReqMsgIsUnresolvedConflictsExist,this.IsUnresolvedConflictsExistCompleted,"PatientOID",new IsUnresolvedConflictsExistCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetLeastDCalDTTMCompleted: Function;
  GetLeastDCalDTTMAsync(oCReqMsgGetLeastDCalDTTM:CReqMsgGetLeastDCalDTTM ) : void {
    HelperService.Invoke<CReqMsgGetLeastDCalDTTM,CResMsgGetLeastDCalDTTM,GetLeastDCalDTTMCompletedEventArgs>("IPPMAManagePrescriptionWS.GetLeastDCalDTTM",oCReqMsgGetLeastDCalDTTM,this.GetLeastDCalDTTMCompleted,"PresType",new GetLeastDCalDTTMCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  UpdatePresItemConflictsCompleted: Function;
  UpdatePresItemConflictsAsync(oCReqMsgUpdatePresItemConflicts:CReqMsgUpdatePresItemConflicts ) : void {
    HelperService.Invoke<CReqMsgUpdatePresItemConflicts,CResMsgUpdatePresItemConflicts,UpdatePresItemConflictsCompletedEventArgs>("IPPMAManagePrescriptionWS.UpdatePresItemConflicts",oCReqMsgUpdatePresItemConflicts,this.UpdatePresItemConflictsCompleted,"PatientOID",new UpdatePresItemConflictsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetTitratedDoseScheduleInfoCompleted: Function;
  GetTitratedDoseScheduleInfoAsync(oCReqMsgGetTitratedDoseScheduleInfo:CReqMsgGetTitratedDoseScheduleInfo ) : void {
    HelperService.Invoke<CReqMsgGetTitratedDoseScheduleInfo,CResMsgGetTitratedDoseScheduleInfo,GetTitratedDoseScheduleInfoCompletedEventArgs>("IPPMAManagePrescriptionWS.GetTitratedDoseScheduleInfo",oCReqMsgGetTitratedDoseScheduleInfo,this.GetTitratedDoseScheduleInfoCompleted,"PrescriptionItemOID",new GetTitratedDoseScheduleInfoCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetRequestMedicationDetailsCompleted: Function;
  GetRequestMedicationDetailsAsync(oCReqMsgGetRequestMedicationDetails:CReqMsgGetRequestMedicationDetails ) : void {
    HelperService.Invoke<CReqMsgGetRequestMedicationDetails,CResMsgGetRequestMedicationDetails,GetRequestMedicationDetailsCompletedEventArgs>("IPPMAManagePrescriptionWS.GetRequestMedicationDetails",oCReqMsgGetRequestMedicationDetails,this.GetRequestMedicationDetailsCompleted,"oMedicationListCriteria",new GetRequestMedicationDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetMultiRoutesCompleted: Function;
  GetMultiRoutesAsync(oCReqMsgGetMultiRoutes:CReqMsgGetMultiRoutes ) : void {
    HelperService.Invoke<CReqMsgGetMultiRoutes,CResMsgGetMultiRoutes,GetMultiRoutesCompletedEventArgs>("IPPMAManagePrescriptionWS.GetMultiRoutes",oCReqMsgGetMultiRoutes,this.GetMultiRoutesCompleted,"MCVersion",new GetMultiRoutesCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetReviewHistoryCompleted: Function;
  GetReviewHistoryAsync(oCReqMsgGetReviewHistory:CReqMsgGetReviewHistory ) : void {
    HelperService.Invoke<CReqMsgGetReviewHistory,CResMsgGetReviewHistory,GetReviewHistoryCompletedEventArgs>("IPPMAManagePrescriptionWS.GetReviewHistory",oCReqMsgGetReviewHistory,this.GetReviewHistoryCompleted,"lnPrescriptionItemOID",new GetReviewHistoryCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetScheduleTimeAndFreqCompleted: Function;
  GetScheduleTimeAndFreqAsync(oCReqMsgGetScheduleTimeAndFreq:CReqMsgGetScheduleTimeAndFreq ) : void {
    HelperService.Invoke<CReqMsgGetScheduleTimeAndFreq,CResMsgGetScheduleTimeAndFreq,GetScheduleTimeAndFreqCompletedEventArgs>("IPPMAManagePrescriptionWS.GetScheduleTimeAndFreq",oCReqMsgGetScheduleTimeAndFreq,this.GetScheduleTimeAndFreqCompleted,"PrescriptionItemOID",new GetScheduleTimeAndFreqCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  ManageReviewAfterPeriodCompleted: Function;
  ManageReviewAfterPeriodAsync(oCReqMsgManageReviewAfterPeriod:CReqMsgManageReviewAfterPeriod ) : void {
    HelperService.Invoke<CReqMsgManageReviewAfterPeriod,CResMsgManageReviewAfterPeriod,ManageReviewAfterPeriodCompletedEventArgs>("IPPMAManagePrescriptionWS.ManageReviewAfterPeriod",oCReqMsgManageReviewAfterPeriod,this.ManageReviewAfterPeriodCompleted,"objManageReviewPeriod",new ManageReviewAfterPeriodCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetDoseUOMDetailsCompleted: Function;
  GetDoseUOMDetailsAsync(oCReqMsgGetDoseUOMDetails:CReqMsgGetDoseUOMDetails ) : void {
    HelperService.Invoke<CReqMsgGetDoseUOMDetails,CResMsgGetDoseUOMDetails,GetDoseUOMDetailsCompletedEventArgs>("IPPMAManagePrescriptionWS.GetDoseUOMDetails",oCReqMsgGetDoseUOMDetails,this.GetDoseUOMDetailsCompleted,"mcVersion",new GetDoseUOMDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  UpdateDueOverStatusForClinicalIndicatorCompleted: Function;
  UpdateDueOverStatusForClinicalIndicatorAsync(oCReqMsgUpdateDueOverStatusForClinicalIndicator:CReqMsgUpdateDueOverStatusForClinicalIndicator ) : void {
    HelperService.Invoke<CReqMsgUpdateDueOverStatusForClinicalIndicator,CResMsgUpdateDueOverStatusForClinicalIndicator,UpdateDueOverStatusForClinicalIndicatorCompletedEventArgs>("IPPMAManagePrescriptionWS.UpdateDueOverStatusForClinicalIndicator",oCReqMsgUpdateDueOverStatusForClinicalIndicator,this.UpdateDueOverStatusForClinicalIndicatorCompleted,"oCMedInClinicalIndicParams",new UpdateDueOverStatusForClinicalIndicatorCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  IsAnyParacetamolAdministrationCompleted: Function;
  IsAnyParacetamolAdministrationAsync(oCReqMsgIsAnyParacetamolAdministration:CReqMsgIsAnyParacetamolAdministration ) : void {
    HelperService.Invoke<CReqMsgIsAnyParacetamolAdministration,CResMsgIsAnyParacetamolAdministration,IsAnyParacetamolAdministrationCompletedEventArgs>("IPPMAManagePrescriptionWS.IsAnyParacetamolAdministration",oCReqMsgIsAnyParacetamolAdministration,this.IsAnyParacetamolAdministrationCompleted,"IngAdminParams",new IsAnyParacetamolAdministrationCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetPatientHomeLeaveDetailCompleted: Function;
  GetPatientHomeLeaveDetailAsync(oCReqMsgGetPatientHomeLeaveDetail:CReqMsgGetPatientHomeLeaveDetail ) : void {
    HelperService.Invoke<CReqMsgGetPatientHomeLeaveDetail,CResMsgGetPatientHomeLeaveDetail,GetPatientHomeLeaveDetailCompletedEventArgs>("IPPMAManagePrescriptionWS.GetPatientHomeLeaveDetail",oCReqMsgGetPatientHomeLeaveDetail,this.GetPatientHomeLeaveDetailCompleted,"lnEncounterOID",new GetPatientHomeLeaveDetailCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetTransformConversionCompleted: Function;
  GetTransformConversionAsync(oCReqMsgGetTransformConversion:CReqMsgGetTransformConversion ) : void {
    HelperService.Invoke<CReqMsgGetTransformConversion,CResMsgGetTransformConversion,GetTransformConversionCompletedEventArgs>("IPPMAManagePrescriptionWS.GetTransformConversion",oCReqMsgGetTransformConversion,this.GetTransformConversionCompleted,"oGPCDrugConRequest",new GetTransformConversionCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetNonIVSubseqentItemsReqDataForSequenceCompleted: Function;
  GetNonIVSubseqentItemsReqDataForSequenceAsync(oCReqMsgGetNonIVSubseqentItemsReqDataForSequence:CReqMsgGetNonIVSubseqentItemsReqDataForSequence ) : void {
    HelperService.Invoke<CReqMsgGetNonIVSubseqentItemsReqDataForSequence,CResMsgGetNonIVSubseqentItemsReqDataForSequence,GetNonIVSubseqentItemsReqDataForSequenceCompletedEventArgs>("IPPMAManagePrescriptionWS.GetNonIVSubseqentItemsReqDataForSequence",oCReqMsgGetNonIVSubseqentItemsReqDataForSequence,this.GetNonIVSubseqentItemsReqDataForSequenceCompleted,"sMcVersionNo",new GetNonIVSubseqentItemsReqDataForSequenceCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetMedCheckMinorClicEnctrCompleted: Function;
  GetMedCheckMinorClicEnctrAsync(oCReqMsgGetMedCheckMinorClicEnctr:CReqMsgGetMedCheckMinorClicEnctr ) : void {
    HelperService.Invoke<CReqMsgGetMedCheckMinorClicEnctr,CResMsgGetMedCheckMinorClicEnctr,GetMedCheckMinorClicEnctrCompletedEventArgs>("IPPMAManagePrescriptionWS.GetMedCheckMinorClicEnctr",oCReqMsgGetMedCheckMinorClicEnctr,this.GetMedCheckMinorClicEnctrCompleted,"lnOrgOID",new GetMedCheckMinorClicEnctrCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  ChkPatientTransferActivityCompleted: Function;
  ChkPatientTransferActivityAsync(oCReqMsgChkPatientTransferActivity:CReqMsgChkPatientTransferActivity ) : void {
    HelperService.Invoke<CReqMsgChkPatientTransferActivity,CResMsgChkPatientTransferActivity,ChkPatientTransferActivityCompletedEventArgs>("IPPMAManagePrescriptionWS.ChkPatientTransferActivity",oCReqMsgChkPatientTransferActivity,this.ChkPatientTransferActivityCompleted,"MedChartOID",new ChkPatientTransferActivityCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetWarningCategoriesCompleted: Function;
  GetWarningCategoriesAsync(oCReqMsgGetWarningCategories:CReqMsgGetWarningCategories ) : void {
    HelperService.Invoke<CReqMsgGetWarningCategories,CResMsgGetWarningCategories,GetWarningCategoriesCompletedEventArgs>("IPPMAManagePrescriptionWS.GetWarningCategories",oCReqMsgGetWarningCategories,this.GetWarningCategoriesCompleted,"MCVersion",new GetWarningCategoriesCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetOmittedItemsListCompleted: Function;
  GetOmittedItemsListAsync(oCReqMsgGetOmittedItemsList:CReqMsgGetOmittedItemsList ) : void {
    HelperService.Invoke<CReqMsgGetOmittedItemsList,CResMsgGetOmittedItemsList,GetOmittedItemsListCompletedEventArgs>("IPPMAManagePrescriptionWS.GetOmittedItemsList",oCReqMsgGetOmittedItemsList,this.GetOmittedItemsListCompleted,"sPrescriptionItemOIDs",new GetOmittedItemsListCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  SubmitClerkMedDrugsCompleted: Function;
  SubmitClerkMedDrugsAsync(oCReqMsgSubmitClerkMedDrugs:CReqMsgSubmitClerkMedDrugs ) : void {
    HelperService.Invoke<CReqMsgSubmitClerkMedDrugs,CResMsgSubmitClerkMedDrugs,SubmitClerkMedDrugsCompletedEventArgs>("IPPMAManagePrescriptionWS.SubmitClerkMedDrugs",oCReqMsgSubmitClerkMedDrugs,this.SubmitClerkMedDrugsCompleted,"oMedication",new SubmitClerkMedDrugsCompletedEventArgs(), prototypeList, charPropertyLookup,configuration);
  }
  
  SubmitDrugsCompleted: Function;
  SubmitDrugsAsync(oCReqMsgSubmitDrugs:CReqMsgSubmitDrugs ) : void {
    HelperService.Invoke<CReqMsgSubmitDrugs,CResMsgSubmitDrugs,SubmitDrugsCompletedEventArgs>("IPPMAManagePrescriptionWS.SubmitDrugs",oCReqMsgSubmitDrugs,this.SubmitDrugsCompleted,"oMedication",new SubmitDrugsCompletedEventArgs(), prototypeList, charPropertyLookup, configuration);
  }
  
  GetPresItemUpdateHistoryCompleted: Function;
  GetPresItemUpdateHistoryAsync(oCReqMsgGetPresItemUpdateHistory:CReqMsgGetPresItemUpdateHistory ) : void {
    HelperService.Invoke<CReqMsgGetPresItemUpdateHistory,CResMsgGetPresItemUpdateHistory,GetPresItemUpdateHistoryCompletedEventArgs>("IPPMAManagePrescriptionWS.GetPresItemUpdateHistory",oCReqMsgGetPresItemUpdateHistory,this.GetPresItemUpdateHistoryCompleted,"presItemOid",new GetPresItemUpdateHistoryCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetGPConnectAdministrationCompleted: Function;
  GetGPConnectAdministrationAsync(oCReqMsgGetGPConnectAdministration:CReqMsgGetGPConnectAdministration ) : void {
    HelperService.Invoke<CReqMsgGetGPConnectAdministration,CResMsgGetGPConnectAdministration,GetGPConnectAdministrationCompletedEventArgs>("IPPMAManagePrescriptionWS.GetGPConnectAdministration",oCReqMsgGetGPConnectAdministration,this.GetGPConnectAdministrationCompleted,"prescriptionType",new GetGPConnectAdministrationCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetGPConnectAdditionalDetailCompleted: Function;
  GetGPConnectAdditionalDetailAsync(oCReqMsgGetGPConnectAdditionalDetail:CReqMsgGetGPConnectAdditionalDetail ) : void {
    HelperService.Invoke<CReqMsgGetGPConnectAdditionalDetail,CResMsgGetGPConnectAdditionalDetail,GetGPConnectAdditionalDetailCompletedEventArgs>("IPPMAManagePrescriptionWS.GetGPConnectAdditionalDetail",oCReqMsgGetGPConnectAdditionalDetail,this.GetGPConnectAdditionalDetailCompleted,"medicationStatementId",new GetGPConnectAdditionalDetailCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  CancelDrugsCompleted: Function;
  CancelDrugsAsync(oCReqMsgCancelDrugs:CReqMsgCancelDrugs ) : void {
    HelperService.Invoke<CReqMsgCancelDrugs,CResMsgCancelDrugs,CancelDrugsCompletedEventArgs>("IPPMAManagePrescriptionWS.CancelDrugs",oCReqMsgCancelDrugs,this.CancelDrugsCompleted,"oMedication",new CancelDrugsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetWardStockPresItemsDetailsCompleted: Function;
  GetWardStockPresItemsDetailsAsync(oCReqMsgGetWardStockPresItemsDetails:CReqMsgGetWardStockPresItemsDetails ) : void {
    HelperService.Invoke<CReqMsgGetWardStockPresItemsDetails,CResMsgGetWardStockPresItemsDetails,GetWardStockPresItemsDetailsCompletedEventArgs>("IPPMAManagePrescriptionWS.GetWardStockPresItemsDetails",oCReqMsgGetWardStockPresItemsDetails,this.GetWardStockPresItemsDetailsCompleted,"oWSPresItemCriteria",new GetWardStockPresItemsDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetDispensinginstDetailsCompleted: Function;
  GetDispensinginstDetailsAsync(oCReqMsgGetDispensinginstDetails:CReqMsgGetDispensinginstDetails ) : void {
    HelperService.Invoke<CReqMsgGetDispensinginstDetails,CResMsgGetDispensinginstDetails,GetDispensinginstDetailsCompletedEventArgs>("IPPMAManagePrescriptionWS.GetDispensinginstDetails",oCReqMsgGetDispensinginstDetails,this.GetDispensinginstDetailsCompleted,"EncounterOID",new GetDispensinginstDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetRequisitionHistoryDetailsCompleted: Function;
  GetRequisitionHistoryDetailsAsync(oCReqMsgGetRequisitionHistoryDetails:CReqMsgGetRequisitionHistoryDetails ) : void {
    HelperService.Invoke<CReqMsgGetRequisitionHistoryDetails,CResMsgGetRequisitionHistoryDetails,GetRequisitionHistoryDetailsCompletedEventArgs>("IPPMAManagePrescriptionWS.GetRequisitionHistoryDetails",oCReqMsgGetRequisitionHistoryDetails,this.GetRequisitionHistoryDetailsCompleted,"sLorenzoID",new GetRequisitionHistoryDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetSupplyHistoryDetailsCompleted: Function;
  GetSupplyHistoryDetailsAsync(oCReqMsgGetSupplyHistoryDetails:CReqMsgGetSupplyHistoryDetails ) : void {
    HelperService.Invoke<CReqMsgGetSupplyHistoryDetails,CResMsgGetSupplyHistoryDetails,GetSupplyHistoryDetailsCompletedEventArgs>("IPPMAManagePrescriptionWS.GetSupplyHistoryDetails",oCReqMsgGetSupplyHistoryDetails,this.GetSupplyHistoryDetailsCompleted,"sLorenzoID",new GetSupplyHistoryDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetSupplyDispenseDetailCompleted: Function;
  GetSupplyDispenseDetailAsync(oCReqMsgGetSupplyDispenseDetail:CReqMsgGetSupplyDispenseDetail ) : void {
    HelperService.Invoke<CReqMsgGetSupplyDispenseDetail,CResMsgGetSupplyDispenseDetail,GetSupplyDispenseDetailCompletedEventArgs>("IPPMAManagePrescriptionWS.GetSupplyDispenseDetail",oCReqMsgGetSupplyDispenseDetail,this.GetSupplyDispenseDetailCompleted,"PrescriptionItemOIDs",new GetSupplyDispenseDetailCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetClinicalVerificationDetailsCompleted: Function;
  GetClinicalVerificationDetailsAsync(oCReqMsgGetClinicalVerificationDetails:CReqMsgGetClinicalVerificationDetails ) : void {
    HelperService.Invoke<CReqMsgGetClinicalVerificationDetails,CResMsgGetClinicalVerificationDetails,GetClinicalVerificationDetailsCompletedEventArgs>("IPPMAManagePrescriptionWS.GetClinicalVerificationDetails",oCReqMsgGetClinicalVerificationDetails,this.GetClinicalVerificationDetailsCompleted,"objIp",new GetClinicalVerificationDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetOnBehalfOfDetailsCompleted: Function;
  GetOnBehalfOfDetailsAsync(oCReqMsgGetOnBehalfOfDetails:CReqMsgGetOnBehalfOfDetails ) : void {
    HelperService.Invoke<CReqMsgGetOnBehalfOfDetails,CResMsgGetOnBehalfOfDetails,GetOnBehalfOfDetailsCompletedEventArgs>("IPPMAManagePrescriptionWS.GetOnBehalfOfDetails",oCReqMsgGetOnBehalfOfDetails,this.GetOnBehalfOfDetailsCompleted,"objIb",new GetOnBehalfOfDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  UpdateIsSupplyAlertShownCompleted: Function;
  UpdateIsSupplyAlertShownAsync(oCReqMsgUpdateIsSupplyAlertShown:CReqMsgUpdateIsSupplyAlertShown ) : void {
    HelperService.Invoke<CReqMsgUpdateIsSupplyAlertShown,CResMsgUpdateIsSupplyAlertShown,UpdateIsSupplyAlertShownCompletedEventArgs>("IPPMAManagePrescriptionWS.UpdateIsSupplyAlertShown",oCReqMsgUpdateIsSupplyAlertShown,this.UpdateIsSupplyAlertShownCompleted,"IsSupplyAlertShown",new UpdateIsSupplyAlertShownCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  SubmitTechValidationItemsCompleted: Function;
  SubmitTechValidationItemsAsync(oCReqMsgSubmitTechValidationItems:CReqMsgSubmitTechValidationItems ) : void {
    HelperService.Invoke<CReqMsgSubmitTechValidationItems,CResMsgSubmitTechValidationItems,SubmitTechValidationItemsCompletedEventArgs>("IPPMAManagePrescriptionWS.SubmitTechValidationItems",oCReqMsgSubmitTechValidationItems,this.SubmitTechValidationItemsCompleted,"oTechnicalValidationInfo",new SubmitTechValidationItemsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  SubmitSupplyItemsCompleted: Function;
  SubmitSupplyItemsAsync(oCReqMsgSubmitSupplyItems:CReqMsgSubmitSupplyItems ) : void {
    HelperService.Invoke<CReqMsgSubmitSupplyItems,CResMsgSubmitSupplyItems,SubmitSupplyItemsCompletedEventArgs>("IPPMAManagePrescriptionWS.SubmitSupplyItems",oCReqMsgSubmitSupplyItems,this.SubmitSupplyItemsCompleted,"oTechnicalValidationInfo",new SubmitSupplyItemsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetIPPPrescriptionItemsCompleted: Function;
  GetIPPPrescriptionItemsAsync(oCReqMsgGetIPPPrescriptionItems:CReqMsgGetIPPPrescriptionItems ) : void {
    HelperService.Invoke<CReqMsgGetIPPPrescriptionItems,CResMsgGetIPPPrescriptionItems,GetIPPPrescriptionItemsCompletedEventArgs>("IPPMAManagePrescriptionWS.GetIPPPrescriptionItems",oCReqMsgGetIPPPrescriptionItems,this.GetIPPPrescriptionItemsCompleted,"PrescriptionOID",new GetIPPPrescriptionItemsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetPrescriptionItembyEncounterCompleted: Function;
  GetPrescriptionItembyEncounterAsync(oCReqMsgGetPrescriptionItembyEncounter:CReqMsgGetPrescriptionItembyEncounter ) : void {
    HelperService.Invoke<CReqMsgGetPrescriptionItembyEncounter,CResMsgGetPrescriptionItembyEncounter,GetPrescriptionItembyEncounterCompletedEventArgs>("IPPMAManagePrescriptionWS.GetPrescriptionItembyEncounter",oCReqMsgGetPrescriptionItembyEncounter,this.GetPrescriptionItembyEncounterCompleted,"stationeryoid",new GetPrescriptionItembyEncounterCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetAdhocMciRuleCompleted: Function;
  GetAdhocMciRuleAsync(oCReqMsgGetAdhocMciRule:CReqMsgGetAdhocMciRule ) : void {
    HelperService.Invoke<CReqMsgGetAdhocMciRule,CResMsgGetAdhocMciRule,GetAdhocMciRuleCompletedEventArgs>("IPPMAManagePrescriptionWS.GetAdhocMciRule",oCReqMsgGetAdhocMciRule,this.GetAdhocMciRuleCompleted,"Itemlist",new GetAdhocMciRuleCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetMciProductRuleCompleted: Function;
  GetMciProductRuleAsync(oCReqMsgGetMciProductRule:CReqMsgGetMciProductRule ) : void {
    HelperService.Invoke<CReqMsgGetMciProductRule,CResMsgGetMciProductRule,GetMciProductRuleCompletedEventArgs>("IPPMAManagePrescriptionWS.GetMciProductRule",oCReqMsgGetMciProductRule,this.GetMciProductRuleCompleted,"objFormViewParams",new GetMciProductRuleCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetIPPTechnicalDetailsCompleted: Function;
  GetIPPTechnicalDetailsAsync(oCReqMsgGetIPPTechnicalDetails:CReqMsgGetIPPTechnicalDetails ) : void {
    HelperService.Invoke<CReqMsgGetIPPTechnicalDetails,CResMsgGetIPPTechnicalDetails,GetIPPTechnicalDetailsCompletedEventArgs>("IPPMAManagePrescriptionWS.GetIPPTechnicalDetails",oCReqMsgGetIPPTechnicalDetails,this.GetIPPTechnicalDetailsCompleted,"IdentifyOIDType",new GetIPPTechnicalDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetIPPProcessingOptionIndicationsCompleted: Function;
  GetIPPProcessingOptionIndicationsAsync(oCReqMsgGetIPPProcessingOptionIndications:CReqMsgGetIPPProcessingOptionIndications ) : void {
    HelperService.Invoke<CReqMsgGetIPPProcessingOptionIndications,CResMsgGetIPPProcessingOptionIndications,GetIPPProcessingOptionIndicationsCompletedEventArgs>("IPPMAManagePrescriptionWS.GetIPPProcessingOptionIndications",oCReqMsgGetIPPProcessingOptionIndications,this.GetIPPProcessingOptionIndicationsCompleted,"oDrugItemBasicData",new GetIPPProcessingOptionIndicationsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  IsDeactivatedAttributeExistsCompleted: Function;
  IsDeactivatedAttributeExistsAsync(oCReqMsgIsDeactivatedAttributeExists:CReqMsgIsDeactivatedAttributeExists ) : void {
    HelperService.Invoke<CReqMsgIsDeactivatedAttributeExists,CResMsgIsDeactivatedAttributeExists,IsDeactivatedAttributeExistsCompletedEventArgs>("IPPMAManagePrescriptionWS.IsDeactivatedAttributeExists",oCReqMsgIsDeactivatedAttributeExists,this.IsDeactivatedAttributeExistsCompleted,"oIPPReqDeactAttributes",new IsDeactivatedAttributeExistsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetIPPMAMedicationFavouritesGroupItemsListCompleted: Function;
  GetIPPMAMedicationFavouritesGroupItemsListAsync(oCReqMsgGetIPPMAMedicationFavouritesGroupItemsList:CReqMsgGetIPPMAMedicationFavouritesGroupItemsList ) : void {
    HelperService.Invoke<CReqMsgGetIPPMAMedicationFavouritesGroupItemsList,CResMsgGetIPPMAMedicationFavouritesGroupItemsList,GetIPPMAMedicationFavouritesGroupItemsListCompletedEventArgs>("IPPMAManagePrescriptionWS.GetIPPMAMedicationFavouritesGroupItemsList",oCReqMsgGetIPPMAMedicationFavouritesGroupItemsList,this.GetIPPMAMedicationFavouritesGroupItemsListCompleted,"MCVersion",new GetIPPMAMedicationFavouritesGroupItemsListCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetIPPMAOrderSetItemsListCompleted: Function;
  GetIPPMAOrderSetItemsListAsync(oCReqMsgGetIPPMAOrderSetItemsList:CReqMsgGetIPPMAOrderSetItemsList ) : void {
    HelperService.Invoke<CReqMsgGetIPPMAOrderSetItemsList,CResMsgGetIPPMAOrderSetItemsList,GetIPPMAOrderSetItemsListCompletedEventArgs>("IPPMAManagePrescriptionWS.GetIPPMAOrderSetItemsList",oCReqMsgGetIPPMAOrderSetItemsList,this.GetIPPMAOrderSetItemsListCompleted,"MCVersion",new GetIPPMAOrderSetItemsListCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetIPPMAOrderSetAssociatedItemsListCompleted: Function;
  GetIPPMAOrderSetAssociatedItemsListAsync(oCReqMsgGetIPPMAOrderSetAssociatedItemsList:CReqMsgGetIPPMAOrderSetAssociatedItemsList ) : void {
    HelperService.Invoke<CReqMsgGetIPPMAOrderSetAssociatedItemsList,CResMsgGetIPPMAOrderSetAssociatedItemsList,GetIPPMAOrderSetAssociatedItemsListCompletedEventArgs>("IPPMAManagePrescriptionWS.GetIPPMAOrderSetAssociatedItemsList",oCReqMsgGetIPPMAOrderSetAssociatedItemsList,this.GetIPPMAOrderSetAssociatedItemsListCompleted,"MCVersion",new GetIPPMAOrderSetAssociatedItemsListCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetOrderSetStatusCompleted: Function;
  GetOrderSetStatusAsync(oCReqMsgGetOrderSetStatus:CReqMsgGetOrderSetStatus ) : void {
    HelperService.Invoke<CReqMsgGetOrderSetStatus,CResMsgGetOrderSetStatus,GetOrderSetStatusCompletedEventArgs>("IPPMAManagePrescriptionWS.GetOrderSetStatus",oCReqMsgGetOrderSetStatus,this.GetOrderSetStatusCompleted,"MCVersion",new GetOrderSetStatusCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  UpdateRvwAlertShownForItemCompleted: Function;
  UpdateRvwAlertShownForItemAsync(oCReqMsgUpdateRvwAlertShownForItem:CReqMsgUpdateRvwAlertShownForItem ) : void {
    HelperService.Invoke<CReqMsgUpdateRvwAlertShownForItem,CResMsgUpdateRvwAlertShownForItem,UpdateRvwAlertShownForItemCompletedEventArgs>("IPPMAManagePrescriptionWS.UpdateRvwAlertShownForItem",oCReqMsgUpdateRvwAlertShownForItem,this.UpdateRvwAlertShownForItemCompleted,"PrescriptionItemOIDs",new UpdateRvwAlertShownForItemCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetSelectProductCompleted: Function;
  GetSelectProductAsync(oCReqMsgGetSelectProduct:CReqMsgGetSelectProduct ) : void {
    HelperService.Invoke<CReqMsgGetSelectProduct,CResMsgGetSelectProduct,GetSelectProductCompletedEventArgs>("IPPMAManagePrescriptionWS.GetSelectProduct",oCReqMsgGetSelectProduct,this.GetSelectProductCompleted,"oSelectProduct",new GetSelectProductCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetPackDetByEANCodeCompleted: Function;
  GetPackDetByEANCodeAsync(oCReqMsgGetPackDetByEANCode:CReqMsgGetPackDetByEANCode ) : void {
    HelperService.Invoke<CReqMsgGetPackDetByEANCode,CResMsgGetPackDetByEANCode,GetPackDetByEANCodeCompletedEventArgs>("IPPMAManagePrescriptionWS.GetPackDetByEANCode",oCReqMsgGetPackDetByEANCode,this.GetPackDetByEANCodeCompleted,"oMatchEANCODESearch",new GetPackDetByEANCodeCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetPatientMedDisContItemsCompleted: Function;
  GetPatientMedDisContItemsAsync(oCReqMsgGetPatientMedDisContItems:CReqMsgGetPatientMedDisContItems ) : void {
    HelperService.Invoke<CReqMsgGetPatientMedDisContItems,CResMsgGetPatientMedDisContItems,GetPatientMedDisContItemsCompletedEventArgs>("IPPMAManagePrescriptionWS.GetPatientMedDisContItems",oCReqMsgGetPatientMedDisContItems,this.GetPatientMedDisContItemsCompleted,"oMedicationListCriteria",new GetPatientMedDisContItemsCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetClinicalEncountersDetailCompleted: Function;
  GetClinicalEncountersDetailAsync(oCReqMsgGetClinicalEncountersDetail:CReqMsgGetClinicalEncountersDetail ) : void {
    HelperService.Invoke<CReqMsgGetClinicalEncountersDetail,CResMsgGetClinicalEncountersDetail,GetClinicalEncountersDetailCompletedEventArgs>("IPPMAManagePrescriptionWS.GetClinicalEncountersDetail",oCReqMsgGetClinicalEncountersDetail,this.GetClinicalEncountersDetailCompleted,"lnOrgOID",new GetClinicalEncountersDetailCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetPrescriptionPrintStatusCompleted: Function;
  GetPrescriptionPrintStatusAsync(oCReqMsgGetPrescriptionPrintStatus:CReqMsgGetPrescriptionPrintStatus ) : void {
    HelperService.Invoke<CReqMsgGetPrescriptionPrintStatus,CResMsgGetPrescriptionPrintStatus,GetPrescriptionPrintStatusCompletedEventArgs>("IPPMAManagePrescriptionWS.GetPrescriptionPrintStatus",oCReqMsgGetPrescriptionPrintStatus,this.GetPrescriptionPrintStatusCompleted,"PatientOID",new GetPrescriptionPrintStatusCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
  
  GetSysFormViewerDefaultValuesCompleted: Function;
  GetSysFormViewerDefaultValuesAsync(oCReqMsgGetSysFormViewerDefaultValues:CReqMsgGetSysFormViewerDefaultValues ) : void {
    HelperService.Invoke<CReqMsgGetSysFormViewerDefaultValues,CResMsgGetSysFormViewerDefaultValues,GetSysFormViewerDefaultValuesCompletedEventArgs>("IPPMAManagePrescriptionWS.GetSysFormViewerDefaultValues",oCReqMsgGetSysFormViewerDefaultValues,this.GetSysFormViewerDefaultValuesCompleted,"sMultiCompDetails",new GetSysFormViewerDefaultValuesCompletedEventArgs(), prototypeList, charPropertyLookup);
  }
}

export class GetBrandOptionsCompletedEventArgs{
 public Result: CResMsgGetBrandOptions;
public Error: any;
}
export class GetTeamMembersWithPermissionCompletedEventArgs{
 public Result: CResMsgGetTeamMembersWithPermission;
public Error: any;
}
export class GetResolveDetailCompletedEventArgs{
 public Result: CResMsgGetResolveDetail;
public Error: any;
}
export class VerifyDrugCompletedEventArgs{
 public Result: CResMsgVerifyDrug;
public Error: any;
}
export class GetPatientMedicationHistoryCompletedEventArgs{
 public Result: CResMsgGetPatientMedicationHistory;
public Error: any;
}
export class GetRelatedOptionsCompletedEventArgs{
 public Result: CResMsgGetRelatedOptions;
public Error: any;
}
export class GetIPPDrugDetailsCompletedEventArgs{
 public Result: CResMsgGetIPPDrugDetails;
public Error: any;
}
export class GetIPPTechValDrugsCompletedEventArgs{
 public Result: CResMsgGetIPPTechValDrugs;
public Error: any;
}
export class UpdateIVAlertShownForItemCompletedEventArgs{
 public Result: CResMsgUpdateIVAlertShownForItem;
public Error: any;
}
export class GetMedicationConfilictConfigCompletedEventArgs{
 public Result: CResMsgGetMedicationConfilictConfig;
public Error: any;
}
export class GetLastCreatedPrescTypeForEncCompletedEventArgs{
 public Result: CResMsgGetLastCreatedPrescTypeForEnc;
public Error: any;
}
export class GetPrescriptionViewCompletedEventArgs{
 public Result: CResMsgGetPrescriptionView;
public Error: any;
}
export class GetIPPDecisionSupportCompletedEventArgs{
 public Result: CResMsgGetIPPDecisionSupport;
public Error: any;
}
export class GetIPPFavouritesDefaultFolderCompletedEventArgs{
 public Result: CResMsgGetIPPFavouritesDefaultFolder;
public Error: any;
}
export class GetMCpresitemCompletedEventArgs{
 public Result: CResMsgGetMCpresitem;
public Error: any;
}
export class AuthoriseDrugsCompletedEventArgs{
 public Result: CResMsgAuthoriseDrugs;
public Error: any;
}
export class GetAdministrationTimesCompletedEventArgs{
 public Result: CResMsgGetAdministrationTimes;
public Error: any;
}
export class IsPreviousDueOverdueSlotExistsCompletedEventArgs{
 public Result: CResMsgIsPreviousDueOverdueSlotExists;
public Error: any;
}
export class GetPatientMedicationListCompletedEventArgs{
 public Result: CResMsgGetPatientMedicationList;
public Error: any;
}
export class GetSequencePrescriptionItemStatusCompletedEventArgs{
 public Result: CResMsgGetSequencePrescriptionItemStatus;
public Error: any;
}
export class GetIPPPatientMedicationCountCompletedEventArgs{
 public Result: CResMsgGetIPPPatientMedicationCount;
public Error: any;
}
export class GetDrugDetailsCompletedEventArgs{
 public Result: CResMsgGetDrugDetails;
public Error: any;
}
export class GetAdditionalDetailsCompletedEventArgs{
 public Result: CResMsgGetAdditionalDetails;
public Error: any;
}
export class GetSupDispInstDetailsCompletedEventArgs{
 public Result: CResMsgGetSupDispInstDetails;
public Error: any;
}
export class GetIPPPrescriptionDetailsCompletedEventArgs{
 public Result: CResMsgGetIPPPrescriptionDetails;
public Error: any;
}
export class DummyMethodCompletedEventArgs {
  public Result: CResMsgDummyMethod;
  public Error: any;
}
export class GetDrugSitesCompletedEventArgs {
  public Result: CResMsgGetDrugSites;
  public Error: any;
}
export class IsDrugAdminStartedCompletedEventArgs {
  public Result: CResMsgIsDrugAdminStarted;
  public Error: any;
}
export class GetFormViewDefaultParamsCompletedEventArgs {
  public Result: CResMsgGetFormViewDefaultParams;
  public Error: any;
}
export class GetSnomedForPrescribedItemCompletedEventArgs {
  public Result: CResMsgGetSnomedForPrescribedItem;
  public Error: any;
}
export class GetMedicationsForInpatientCompletedEventArgs {
  public Result: CResMsgGetMedicationsForInpatient;
  public Error: any;
}
export class CheckPrescribeRuleCompletedEventArgs {
  public Result: CResMsgCheckPrescribeRule;
  public Error: any;
}
export class GetNonReconciledItemsCompletedEventArgs {
  public Result: CResMsgGetNonReconciledItems;
  public Error: any;
}
export class GetDosageFormTypeCompletedEventArgs {
  public Result: CResMsgGetDosageFormType;
  public Error: any;
}
export class GetProcessingOptionsCompletedEventArgs {
  public Result: CResMsgGetProcessingOptions;
  public Error: any;
}
export class SearchProcessingOptionsByIndicationsCompletedEventArgs {
  public Result: CResMsgSearchProcessingOptionsByIndications;
  public Error: any;
}
export class GetFavouritesDrugItemCompletedEventArgs {
  public Result: CResMsgGetFavouritesDrugItem;
  public Error: any;
}
export class GetResolveDefaultCompletedEventArgs {
  public Result: CResMsgGetResolveDefault;
  public Error: any;
}
export class GetPrescriptionItemDoseInfoCompletedEventArgs {
  public Result: CResMsgGetPrescriptionItemDoseInfo;
  public Error: any;
}
export class GetIPPPrescriptionItemDoseInfoCompletedEventArgs {
  public Result: CResMsgGetIPPPrescriptionItemDoseInfo;
  public Error: any;
}
export class GetIPPPrescribableItemDoseInfoCompletedEventArgs {
  public Result: CResMsgGetIPPPrescribableItemDoseInfo;
  public Error: any;
}
export class GetTitratedDoseInfoCompletedEventArgs {
  public Result: CResMsgGetTitratedDoseInfo;
  public Error: any;
}
export class GetIPPFrequencyCompletedEventArgs {
  public Result: CResMsgGetIPPFrequency;
  public Error: any;
}
export class GetSysFormViewerSpecificDefaultValuesCompletedEventArgs {
  public Result: CResMsgGetSysFormViewerSpecificDefaultValues;
  public Error: any;
}
export class InvokeDRCConflictCompletedEventArgs {
  public Result: CResMsgInvokeDRCConflict;
  public Error: any;
}
export class GetDRCConflictsCompletedEventArgs {
  public Result: CResMsgGetDRCConflicts;
  public Error: any;
}
export class GetUnresolvedConflictsCompletedEventArgs {
  public Result: CResMsgGetUnresolvedConflicts;
  public Error: any;
}
export class IsUnresolvedConflictsExistCompletedEventArgs {
  public Result: CResMsgIsUnresolvedConflictsExist;
  public Error: any;
}
export class GetLeastDCalDTTMCompletedEventArgs {
  public Result: CResMsgGetLeastDCalDTTM;
  public Error: any;
}
export class UpdatePresItemConflictsCompletedEventArgs {
  public Result: CResMsgUpdatePresItemConflicts;
  public Error: any;
}
export class GetTitratedDoseScheduleInfoCompletedEventArgs {
  public Result: CResMsgGetTitratedDoseScheduleInfo;
  public Error: any;
}
export class GetRequestMedicationDetailsCompletedEventArgs {
  public Result: CResMsgGetRequestMedicationDetails;
  public Error: any;
}
export class GetMultiRoutesCompletedEventArgs {
  public Result: CResMsgGetMultiRoutes;
  public Error: any;
}
export class GetReviewHistoryCompletedEventArgs {
  public Result: CResMsgGetReviewHistory;
  public Error: any;
}
export class GetScheduleTimeAndFreqCompletedEventArgs {
  public Result: CResMsgGetScheduleTimeAndFreq;
  public Error: any;
}
export class ManageReviewAfterPeriodCompletedEventArgs {
  public Result: CResMsgManageReviewAfterPeriod;
  public Error: any;
}
export class GetDoseUOMDetailsCompletedEventArgs {
  public Result: CResMsgGetDoseUOMDetails;
  public Error: any;
}
export class UpdateDueOverStatusForClinicalIndicatorCompletedEventArgs {
  public Result: CResMsgUpdateDueOverStatusForClinicalIndicator;
  public Error: any;
}
export class IsAnyParacetamolAdministrationCompletedEventArgs {
  public Result: CResMsgIsAnyParacetamolAdministration;
  public Error: any;
}
export class GetPatientHomeLeaveDetailCompletedEventArgs {
  public Result: CResMsgGetPatientHomeLeaveDetail;
  public Error: any;
}
export class GetTransformConversionCompletedEventArgs {
  public Result: CResMsgGetTransformConversion;
  public Error: any;
}
export class GetNonIVSubseqentItemsReqDataForSequenceCompletedEventArgs {
  public Result: CResMsgGetNonIVSubseqentItemsReqDataForSequence;
  public Error: any;
}
export class GetMedCheckMinorClicEnctrCompletedEventArgs {
  public Result: CResMsgGetMedCheckMinorClicEnctr;
  public Error: any;
}
export class ChkPatientTransferActivityCompletedEventArgs {
  public Result: CResMsgChkPatientTransferActivity;
  public Error: any;
}
export class GetWarningCategoriesCompletedEventArgs {
  public Result: CResMsgGetWarningCategories;
  public Error: any;
}
export class GetOmittedItemsListCompletedEventArgs {
  public Result: CResMsgGetOmittedItemsList;
  public Error: any;
}
export class SubmitClerkMedDrugsCompletedEventArgs {
  public Result: CResMsgSubmitClerkMedDrugs;
  public Error: any;
}
export class SubmitDrugsCompletedEventArgs {
  public Result: CResMsgSubmitDrugs;
  public Error: any;
}
export class GetPresItemUpdateHistoryCompletedEventArgs {
  public Result: CResMsgGetPresItemUpdateHistory;
  public Error: any;
}
export class GetGPConnectAdministrationCompletedEventArgs {
  public Result: CResMsgGetGPConnectAdministration;
  public Error: any;
}
export class GetGPConnectAdditionalDetailCompletedEventArgs {
  public Result: CResMsgGetGPConnectAdditionalDetail;
  public Error: any;
}
export class CancelDrugsCompletedEventArgs {
  public Result: CResMsgCancelDrugs;
  public Error: any;
}
export class GetWardStockPresItemsDetailsCompletedEventArgs {
  public Result: CResMsgGetWardStockPresItemsDetails;
  public Error: any;
}
export class GetDispensinginstDetailsCompletedEventArgs {
  public Result: CResMsgGetDispensinginstDetails;
  public Error: any;
}
export class GetRequisitionHistoryDetailsCompletedEventArgs {
  public Result: CResMsgGetRequisitionHistoryDetails;
  public Error: any;
}
export class GetSupplyHistoryDetailsCompletedEventArgs {
  public Result: CResMsgGetSupplyHistoryDetails;
  public Error: any;
}
export class GetSupplyDispenseDetailCompletedEventArgs {
  public Result: CResMsgGetSupplyDispenseDetail;
  public Error: any;
}
export class GetClinicalVerificationDetailsCompletedEventArgs {
  public Result: CResMsgGetClinicalVerificationDetails;
  public Error: any;
}
export class GetOnBehalfOfDetailsCompletedEventArgs {
  public Result: CResMsgGetOnBehalfOfDetails;
  public Error: any;
}
export class UpdateIsSupplyAlertShownCompletedEventArgs {
  public Result: CResMsgUpdateIsSupplyAlertShown;
  public Error: any;
}
export class SubmitTechValidationItemsCompletedEventArgs {
  public Result: CResMsgSubmitTechValidationItems;
  public Error: any;
}
export class SubmitSupplyItemsCompletedEventArgs {
  public Result: CResMsgSubmitSupplyItems;
  public Error: any;
}
export class GetIPPPrescriptionItemsCompletedEventArgs {
  public Result: CResMsgGetIPPPrescriptionItems;
  public Error: any;
}
export class GetPrescriptionItembyEncounterCompletedEventArgs {
  public Result: CResMsgGetPrescriptionItembyEncounter;
  public Error: any;
}
export class GetAdhocMciRuleCompletedEventArgs {
  public Result: CResMsgGetAdhocMciRule;
  public Error: any;
}
export class GetMciProductRuleCompletedEventArgs {
  public Result: CResMsgGetMciProductRule;
  public Error: any;
}
export class GetIPPTechnicalDetailsCompletedEventArgs {
  public Result: CResMsgGetIPPTechnicalDetails;
  public Error: any;
}
export class GetIPPProcessingOptionIndicationsCompletedEventArgs {
  public Result: CResMsgGetIPPProcessingOptionIndications;
  public Error: any;
}
export class IsDeactivatedAttributeExistsCompletedEventArgs {
  public Result: CResMsgIsDeactivatedAttributeExists;
  public Error: any;
}
export class GetIPPMAMedicationFavouritesGroupItemsListCompletedEventArgs {
  public Result: CResMsgGetIPPMAMedicationFavouritesGroupItemsList;
  public Error: any;
}
export class GetIPPMAOrderSetItemsListCompletedEventArgs {
  public Result: CResMsgGetIPPMAOrderSetItemsList;
  public Error: any;
}
export class GetIPPMAOrderSetAssociatedItemsListCompletedEventArgs {
  public Result: CResMsgGetIPPMAOrderSetAssociatedItemsList;
  public Error: any;
}
export class GetOrderSetStatusCompletedEventArgs {
  public Result: CResMsgGetOrderSetStatus;
  public Error: any;
}
export class UpdateRvwAlertShownForItemCompletedEventArgs {
  public Result: CResMsgUpdateRvwAlertShownForItem;
  public Error: any;
}
export class GetSelectProductCompletedEventArgs {
  public Result: CResMsgGetSelectProduct;
  public Error: any;
}
export class GetPackDetByEANCodeCompletedEventArgs {
  public Result: CResMsgGetPackDetByEANCode;
  public Error: any;
}
export class GetPatientMedDisContItemsCompletedEventArgs {
  public Result: CResMsgGetPatientMedDisContItems;
  public Error: any;
}
export class GetClinicalEncountersDetailCompletedEventArgs {
  public Result: CResMsgGetClinicalEncountersDetail;
  public Error: any;
}
export class GetPrescriptionPrintStatusCompletedEventArgs {
  public Result: CResMsgGetPrescriptionPrintStatus;
  public Error: any;
}
export class GetSysFormViewerDefaultValuesCompletedEventArgs {
  public Result: CResMsgGetSysFormViewerDefaultValues;
  public Error: any;
}
export class CReqMsgGetWardStockPresItemsDetails {
  oWSPresItemCriteriaBC: WardStockPresItemCriteria;
  oContextInformation: CContextInformation;
}

export class WardStockPresItemCriteria extends CLZOObject {
  IdentifyingOID: number;
  IdentifyingType: string;
  RouteOIDs: string;
  ProductFormOID: number;
  ServiceOID: number;
  LocationOID: number;
  MCVersion: string;
  StrengthText: string;
  EncounterOID: number;
  IsEnableWSC: boolean;
}
export class WardStockPresItemDetails extends CLZOObject {
  PrescriptionItem: string;
  StockLevel: string;
  PackSize: string;
}
export class Dispensinginstructionhistory extends CLZOObject {
  Dispensinginstructions: string;
  OtherDispensingInstruction: string;
  Additionalcomments: string;
  EncounterDetail: string;
  EncounterOid: number;
  PresType: string;
  EncounterType: string;
  CACode: string;
  IgnoreIfRequestExists: boolean;
  DispensingInstruction: ObservableCollection<ObjectInfo>;
}
export class ObjectInfo extends CLZOObject {
  OID: number;
  Name: string;
  Code: string;
  RoleProfileOID: number;
  OwnerOrganisationOID: number;
  SourceDataProviderType: string;
}
export class RequisitionHistoryDetails extends CLZOObject {
  ServiceOID: number;
  ServicePointName: string;
  LocationOID: number;
  UsersOID: number;
  RequisitionedBy: string;
  RoleOID: number;
  RoleName: string;
  RequisitionDTTM: DateTime;
  LocationName: string;
  IsCurrent: string;
  URGNCCode: string;
  Comments: string;
  PresItemOID: number;
  EncounterOID: number;
  LorenzoID: string;
  FluidPrescribableItemListOID: number;
  PrescriptionMultiComponentOID: number;
  RequestedCancelledBy: string;
  RequestStatus: string;
}
export class SupplyHistoryDetails extends CLZOObject {
  Drugname: string;
  Prescriptiontype: string;
  Supplyinstruction: string;
  SupplyComments: string;
  SupplieddBy: string;
  SuppliedDTTM: DateTime;
  ServiceName: string;
  LocationName: string;
  IsDoseCombinationsDefined: string;
  SupplystatusCode: string;
  PrescriptionItemOID: number;
  MedSupplyDetailOID: number;
  PresItemstatusCode: string;
  ItemSubType: string;
  MCVersion: string;
  PrescriptionMultiComponentOID: number;
  FluidPrescribableItemListOID: number;
  ParentDrugname: string;
  DrugFluidName: string;
  DrugFluidOID: number;
  PIDRequestIdentifyingOID: number;
  PIDRequestIdentifyingType: string;
  ResponseDTTM: DateTime;
  Reason: string;
  Surname: string;
  Forename: string;
  DispenseOID: number;
  NextSupplyDTTM: DateTime;
  SortingDTTM: DateTime;
  IsDummyRecord: boolean;
  IsDummyUpdated: boolean;
  DispenseStatus: ObservableCollection<PresItemIPPRequestDetails>;
  IsParent: number;
}
export class PresItemIPPRequestDetails extends CLZOObject {
  Status: string;
  ResponseDTTM: DateTime;
  Name: string;
  Reason: string;
  Locationname: string;
  DispensedDrugName: string;
  Servicename: string;
}
export class MedDispensingDetail extends CLZOObject {
  PresItemDispenseRequestOID: number;
  PrescriptionItemOID: number;
  PrescriptionMulticomponentOID: number;
  FluidPrescribableItemListOID: number;
  PrescriptionItemTechOID: number;
  PresItemDispenseStatusOID: number;
  DispenseStatus: string;
  ResponseDTTM: DateTime;
  ResponseDTTMText: string;
  DrugName: string;
  RequestedLocationName: string;
  RequestedServiceName: string;
  UserForename: string;
  UserSurname: string;
  Reason: string;
  LastDispensingText: string;
  PresRequisitionHistoryOID: number;
  PrescribeStartDTTM: DateTime;
  LorenzoID: string;
}
export class ClinicalVerificationHistoryIP extends CLZOObject {
  PatientOid: number;
  PrescriptionItemOid: number;
  EncounterOid: number;
  LorenzoID: string;
  MCVersionNo: string;
  LOGGEDINHO: number;
}
export class ClinicalVerificationHistoryOp extends CLZOObject {
  PrescriptionItemOID: number;
  ActionBy: string;
  ActionOn: DateTime;
  Status: string;
  Comments: string;
  ActionByOID: number;
}
export class OnBehalfDetailsIp extends CLZOObject {
  PrescriptionItemOid: number;
}
export class OnBehalfDetailsOp extends CLZOObject {
  PrescriptionItemOID: number;
  OnBehalfDTTM: DateTime;
  OnBehalfOf: string;
  OnBehalfReason: string;
  CommunicationMode: string;
  Users: string;
  Action: string;
  ActionTakenUserOID: number;
}
export class TechnicalValidationInfo extends CLZOObject {
  PrescriptionOID: number;
  PrescriptionItemOID: number;
  ValidatedDTTM: DateTime;
  ValidatedBy: ObjectInfo;
  ValidatorRoleName: string;
  IsTechnicalvalidate: string;
  Technicalvalidateupdate: boolean;
  EncounterOID: number;
  IsMergePatient: string;
  OtherDispensingInstruction: string;
  PrepStatusCode: string;
  IsWardStock: boolean;
  IsSupplyRequested: string;
  RequisitionCACode: string;
  LorenzoID: string;
  ServiceOID: number;
  LocationOID: number;
  UsersOID: number;
  RoleOID: number;
  PresMutliCompOid: number;
  UniqueMCRowID: number;
  MedsupplydetailOID: number;
  SupplyComments: string;
  SupplyStatus: string;
  FluidPrescribableItemListOID: number;
  IsChildEdited: byte;
  IsSuppInstrInvokedFromEPR: boolean;
  NextSupplyDTTM: DateTime;
  IsAlreadyClinicallyVerified: boolean;
  IncludeFluid: boolean;
  IgnoreIfRequestExists: boolean;
  Tag: PITag;
  PrescriptionItemStatus: string;
  IgnoreMainItem: boolean;
  IsAdditionalFluid: boolean;
  TechValidatedItems: ObservableCollection<TechValidatedItem>;
  SupplyInstruction: ObservableCollection<ObjectInfo>;
  DispensingInstruction: ObservableCollection<ObjectInfo>;
}
export class TechValidatedItem extends CLZOObject {
  DrugItem: DrugItemBasicData;
  QuantityPerDose: string;
  QuantityPerDoseUOM: ObjectInfo;
  TotalQuantity: string;
  TotalQuantityUOM: ObjectInfo;
  ClinicalVerifyComments: string;
  PrescriptionItemTechOID: number;
  IsTechnicalvalidate: string;
  IdentifyingDomain: string;
  MedSupplyOID: number;
  OtherDispensingInstruction: string;
  IsDoseCombinationsDefined: string;
  IsSupplyRequested: string;
  LocationOid: number;
  ServiceOid: number;
  ReqCACode: string;
  SupplyComments: string;
  FluidPrescribableItemListOID: number;
  LastReqUrgency: string;
  LastReqComments: string;
  LastRequestedBy: string;
  LastRequestedDateTime: DateTime;
  ReqIconShow: boolean;
  PrescriptionMultiComponentOID: number;
  PIDRequestIdentifyingOID: number;
  PIDRequestIdentifyingType: string;
  IsWardStock: boolean;
  NextSupplyDttm: DateTime;
  DispenseOID: number;
  isNextSupplyUpdate: boolean;
  SupplyStatus: string;
  SupplyInstruction: ObservableCollection<ObjectInfo>;
  DispensingInstruction: ObservableCollection<ObjectInfo>;
  DispenseStatus: ObservableCollection<PresItemRequestDetails>;
}
export class DrugItemBasicData extends CLZOObject {
  p: string;
  q: string;
  r: string;
  s: string;
  t: string;
  y: string;
  z: boolean;
  aa: string;
  bb: string;
  cc: number;
  dd: number;
  ee: string;
  ff: string;
  mc: string;
  ps: string;
  fg: number;
  IdentifyingOID: number;
  IdentifyingType: string;
  IdentifyingName: string;
  PrescribableItemListOID: number;
  MCVersionNo: string;
  IsAccessContraint: string;
  IsPrescribeByBrand: string;
  FormularyNote: string;
  ItemType: string;
  RouteOID: number;
  FormOID: number;
  IsTechValidateCA: string;
  LorenzoID: string;
  NonCatItemReason: string;
  TechQtyUomName: string;
  IsControllDrug: string;
  ITMSUBTYP: string;
  SourceDataProviderType: string;
  AliasName: string;
  PrescriptionItemId: string;
  ConflictUniqueId: string;
  bIsReplacement: boolean;
  sDosageForm: string;
  sStrength: string;
  DosageFormID: number;
  MCOID: number;
  MCPrepStatusCode: string;
  MCItemName: string;
  MCIItemDisplay: string;
  PreparationStatus: string;
  ItemSubType: string;
  IsInfusion: string;
  DisplaySequence: number;
  ReorderedFromclerkItemOID: number;
  MonPeriodMand: string;
  IsIndicationRequired: string;
  IndicationOverrideReson: string;
  PrescribableItemDetailOID: number;
  NonCatalogueOtherComments: string;
  OrderSentenceDesc: string;
  VMVPMCILorenzoID: string;
  VMVPMCIdentifyingName: string;
  FormularyOID: number;
  PrescribingNote: string;
  Guidance: string;
  OrdersetOID: string;
  IsExcludeGuidanceInSearch: string;
  AmendedCurrDTTM: DateTime;
  IsAmendedStopDTTMForAlternateDaysFreq: boolean;
  NextSlotGenerateStartDTTM: DateTime;
  PatientOID: number;
  ComponentOidandType: string;
  SupplyByAt: string;
  LastSupplyDTTM: DateTime;
  GPErrorCode: number;
  IsTransformGPConRequired: number;
  GPCProductFormOID: number;
  ServiceOID: number;
  LocationOID: number;
  EncounterOID: number;
  SupplyByAtMCIFluidParent: string;
  LastSupplyDTTMMCIFluidParent: DateTime;
  SupplyByAtFluidChild: string;
  LastSupplyDTTMFluidChild: DateTime;
  IsMCAuthorize: boolean;
  Ordersetdescription: string;
  MCIDEActiveItems: ObservableCollection<string>;
  MCIVersionMatchItems: ObservableCollection<string>;
}
export class PrescriptionItemBasicData extends DrugItemBasicData {
  SNOMEDCode: string;
  IsSTATFrequency: boolean;
  OID: number;
  PrescriptionItemNumber: string;
  IsAdministered: string;
  StartDTTM: DateTime = DateTime.MinValue;
  PartialStartDTTM: string;
  EndDTTM: DateTime;
  DoseStartDTTM: DateTime;
  DoseEndDTTM: DateTime;
  PrescriptionItemStatus: string;
  StatusModifedDTTM: DateTime;
  HealthOrganisation: ObjectInfo;
  PrescriptionBasicData: Prescription;
  IsControlledDrug: string;
  IsLastSlotCheckRequired: boolean;
  FirstSlotScheduleTime: DateTime;
  CurrentDispenseStatus: string;
}
export class PrescriptionBasicData extends CLZOObject {
  OID: number;
  PrescriptionNumber: string;
  PrescriptionType: string;
  PrescriptionDTTM: DateTime;
  PatientOID: number;
  EncounterOID: number;
  Specialty: ObjectInfo;
  EncounterID: string;
  PrescriberDetails: ObjectInfo;
  PrescriberRole: ObjectInfo;
  CareProvider: ObjectInfo;
  PrescriptionStatus: string;
  IsMergedPatient: string;
  IsCriticalMedication: string;
}
export class Prescription extends PrescriptionBasicData {
  PrintStatus: string;
  StaioneryType: ObjectInfo;
  ClerkingSource: string;
  ServicePoint: ObjectInfo;
  Location: ObjectInfo;
  IsPGD: string;
  HealthOrganisation: ObjectInfo;
  MCVersionNo: string;
  TeamOID: number;
  IsIntray: string;
  ChoosePrinter: string;
  SupplyPrepStatus: string;
  IsMedAlertShown: string;
  SupplyRequestdatetime: DateTime;
  RequestUrgency: string;
  CompletedStatus: string;
  PGDLorenzoID: string;
  TeamMembersOID: ObservableCollection<number>;
  PrescriptionAvailabilityStatus: ObservableCollection<AvailabilityStatus>;
  PrescriptionItems: ObservableCollection<PrescriptionItemDetails>;
}
export class AvailabilityStatus extends CLZOObject {
  Code: string;
  Status: string;
  Count: number;
}
export class PrescriptionItem extends PrescriptionItemBasicData {
  PrescriptionNumber: string;
  PrescriptionOID: number;
  IsPGD: string;
  PrescriberDetails: ObjectInfo;
  CareProvider: ObjectInfo;
  IsPRNDose: string;
  Specialty: string;
  IsDrugApprovalRequired: string;
  UniqueID: number;
  IsConflictsExists: string;
  IsDoseCalcExist: string;
  IsAmendment: string;
  ReorderItemOID: number;
  IsNonformulary: string;
  ReplaceDrugActiveStatus: string;
  DrugVersionMatch: string;
  ReprintReason: string;
  ClinicalNoteOID: string;
  PPatientOID: number;
  HIIsAckn: string;
  HIWarngBhTyp: string;
  EncounterType: string;
  InfusionSeqOrder: number;
  InfustionHeaderLvl: number;
  ParentPrescriptionItemOID: number;
  AutoNumber: number;
  PrescriberRoleName: string;
  TotalSeqCount: string;
  IsInfusionitem: string;
  IsBolus: string;
  PrescribableItemListIdnOID: number;
  IsReoderIconEnable: string;
  Recordadmindatetime: DateTime;
  PrevReorderItemOID: number;
  PresItemDetailLzoID: string;
  IsConditionalExists: boolean;
  IssIDSNewMeds: string;
  DisplayOrder: number;
  OrdersetGroupID: string;
  Supplycomments: string;
  VMVPLorenzoID: string;
  VMVPIdentifyingName: string;
  DrugFreqUOMCode: string;
  OrdersetLorenzoID: string;
  DName: string;
  reasonforModification: string;
  isPRNDirection: string;
  IsWardStockForChildMCI: boolean;
  IsInclude72HrsCompletedORDisconItem: string;
  IsGPConnectItem: boolean;
  GPConnectMedication: GPConnectItem;
  IsAutoSaveGPConnectForClerking: boolean;
  IsAutoSaveGPCForClerkReorder: boolean;
  IsVolumeBasedInfusion: string;
  RoundOffCode: string;
  RoundOffText: string;
  InfusionGroupSequenceNo: number;
  NextSupplyDTTM: DateTime;
  AuthoriseRoleOID: string;
  IsCriticalMed: boolean;
  CriticalDrugMsg: string;
  CriticalDrugSiteURL: string;
  CriticalRoutes: string;
  EncounterStatus: string;
  IsAnyItemAdministeredInSeqGroup: number;
  IsAmendCompletedStatus: boolean;
  PrescriberOBHName: string;
  PrescriberOBOUserOID: number;
  DrugApproverRoleOID: ObservableCollection<number>;
  DaysOfWeeks: ObservableCollection<string>;
}
export class PrescriptionItemDetails extends PrescriptionItem {
  BasicProperties: PresItemBasicProperties;
  AdditionalProperties: PresItemAdditionalProperties;
  DrugSpecificProperties: PresItemDrugProperties;
  FormViewParameters: PrescriptionItemFormViewParameters;
  APIProp: APIProperties;
  LegalCat: LegalCategory;
  AdminDetails: PrescriptionItemAdminDetails;
  DoseCalculation: DoseCalculatorDetails;
  ActionPerformedCode: string;
  ActionPerformed: PrescriptionItemAction;
  IsMandatoryFilled: boolean;
  PrecriptionItem: string;
  OtherInformation: string;
  TrafficSymbol: string;
  CurrentUniqueId: string;
  isMultiRouteChecked: boolean;
  TitratedDoseinfo: TitratedDoseinfo;
  ClerkFormViewDefaultCode: string;
  AuditChangeReasonCode: string;
  OnlyDRCConflictsUpdate: boolean;
  IsDRCReasonMandatory: boolean;
  IsDRCAcklgdeMandatory: boolean;
  OriginalDRCDoseTypeCode: string;
  IsChangedDRCDoseTypeForAmend: boolean;
  DRCBehaviourType: string;
  IsAmendDRCDataLoaded: boolean;
  IsAmendDRCRegenarated: boolean;
  SequentialActionPerformCode: string;
  IsSeqGroupHasDifferentStationaryType: boolean;
  DoseFormulaDet: DoseFormula;
  IsDoseCalcPerformedInAmend: boolean;
  IsSequencePerformedInAmend: boolean;
  MultiComponentDetails: ObservableCollection<IPPMCPresctiptionItem>;
  TechValidateDetails: ObservableCollection<TechnicalValidationInfo>;
  Warning: ObservableCollection<WarningDetails>;
  DRCConflict: ObservableCollection<DRCConflict>;
  AuditChanges: ObservableCollection<PresItemAuditHistory>;
}
export class PresItemCommonProperties extends CLZOObject {
  ItemType: string;
  ItemSubType: string;
  TreatmentToCont: ObjectInfo;
  AdminInstruction: ObjectInfo;
  LegalCategory: ObjectInfo;
  Route: ObjectInfo;
  Form: ObjectInfo;
  Statusflags: StatusFlags;
  IsControlledDrug: string;
  OtherDispensingInstruction: string;
  OtherAdminInstruction: string;
  IdentifyingDomain: string;
  AdminIdentifyingDomain: string;
  TechSupplyInstruction: string;
  MultipleRouteType: byte;
  IndicationOverrideReason: string;
  TechSupplyInstrItemLevel: string;
  IsSupplyReq: string;
  LocOid: number;
  ServOid: number;
  IsWardStk: boolean;
  RequisitionCACod: string;
  EncOID: number;
  IsMergePat: string;
  IsAmendSupplyInstrClear: boolean;
  PrescriptionItemTechOID: number;
  IsSupplyInstChanged: boolean;
  SupplyDTTM: DateTime;
  FluidSupplyInst: string;
  IsChildSupplyInstChanged: boolean;
  DRCdoseTypeLorenzoID: ObjectInfo;
  PresItemEncounter: ObjectInfo;
  NextSupplyDTTM: DateTime;
  FluidNextSupplyDTTM: DateTime;
  isNextSupplyUpdate: boolean;
  IsCriticalMed: boolean;
  IsAuthorised: boolean;
  FreqOID: number;
  IsPrescribeInControlledDrug: boolean;
  SupplyStatus: string;
  DispensingInstruction: ObservableCollection<ObjectInfo>;
  SupplyInstruction: ObservableCollection<ObjectInfo>;
  SupplementItems: ObservableCollection<ObjectInfo>;
  DrugProperties: ObservableCollection<DrugProperty>;
  MultipleRoutes: ObservableCollection<ObjectInfo>;
}
export class PresItemBasicProperties extends PresItemCommonProperties {
  defaultchk: string;
  Direction: ObjectInfo;
  Duration: MeasurableObject;
  Site: ObjectInfo;
  Quantity: Quantity;
  Dose: PrescriptionItemDose;
  FrequencyDetails: FrequencyDetails;
  IsPresItemLevelDispense: string;
  OrderSet: ObjectInfo;
  IsReviewAlertShown: string;
  IsPRNWithScheduled: boolean;
  OrderSetSeqId: string;
  ExistsOnAdmission: string;
  LastAdministeredDTTM: DateTime;
  IsAdministeredInAdvance: boolean;
  IsClinicalEncounter: boolean;
  PrescribingNote: string;
  HasPermission: boolean;
  TopMostAmendedPrescriptionItemOID: number;
  SeqInfusionStatus: string;
  CurrentDispenseStatus: string;
  IsAlreadyClinicallyVerified: boolean;
  IsAuthoriseText: string;
  PatientProblem: ObservableCollection<Indication>;
}
export class MeasurableObject extends CLZOObject {
  OID: number;
  Value: number;
  UOMOID: number;
  UOMName: string;
  RecordedDate: DateTime;
  UOMCode: string;
}
export class Quantity extends CLZOObject {
  QuantityValue: string;
  QuantityUOMId: number;
  QuantityUOMName: string;
}
export class PrescriptionItemDose extends CLZOObject {
  DoseType: ObjectInfo;
  ObservationResult: ObjectInfo;
  PresItemEncounter: ObjectInfo;
  IsClinicalEncounterPresItem: boolean;
  DoseRegime: ObservableCollection<DoseRegime>;
}
export class DoseRegime extends CLZOObject {
  LowerDose: number;
  UpperDose: number;
  DoseUOM: UOM;
  Duration: MeasurableObject;
  Quantity: MeasurableObject;
  Direction: ObjectInfo;
  PrescibableItemOID: number;
  StartDTTM: DateTime = DateTime.MinValue;
  EndDTTM: DateTime = DateTime.MinValue;
  LowerObservationRange: number;
  UpperObservationRange: number;
  ObservationRangeUOM: UOM;
  DosingInstruction: string;
  FrequencyDetails: FrequencyDetails;
  DurationUOMCode: string;
  PrescribableItemDoseOID: number;
  TitratedDoseInstructions: string;
  TitratedDoseAdtnlComments: string;
  TitratedDoseInstruction: ObjectInfo;
  IsHavingAdminTime: string;
  IsStartFromNextDay: boolean;
  vDosageScheduleTimes: ObservableCollection<number>;
  InfusionDetails: ObservableCollection<DoseRegimeInfusionDetail>;
  AdministeredTimeAndDoseDetails: ObservableCollection<AdministeredTimeDoseDetail>;
}
export class UOM extends CLZOObject {
  UOMId: number;
  UOMName: string;
  SourceDataProviderType: string;
  UOMCode: string;
  MCIPrescribableItemListOID: number;
  UOMTypeCode: string;
  OwnerOrganisationID: number;
}
export class FrequencyDetails extends CLZOObject {
  Frequency: ObjectInfo;
  IsFixedAdministration: string;
  StatIndicator: string;
  StatDose: MeasurableObject;
  FrequencyUOM: string;
  FreqCode: string;
  FreqLowEvent: number;
  FreqLowPeriod: number;
  PRNScheduledDet: string;
  ScheduledTimes: ObservableCollection<Scheduledetails>;
  DaysOfWeeks: ObservableCollection<string>;
}
export class Scheduledetails extends CLZOObject {
  ItemFrequencyOID: number;
  ScheduledTimeInMins: number;
  ScheduledTime: string;
  MappedDrugRoundTimeInMins: number;
  MappedDrugRoundTime: string;
  ScheduleTime: number;
  EncounterOID: number;
  MCVersion: string;
}
export class IPPScheduledetails extends Scheduledetails {
  ScheduleDate: DateTime = DateTime.MinValue;
  Dose: number = 0;
  DosewithUOM: string;
  Event: number;
  Day: number;
}
export class IPPFrequencyDetails extends FrequencyDetails {
  DaysOfWeek: ObservableCollection<string>;
}
export class DoseRegimeInfusionDetail extends CLZOObject {
  OID: number;
  PrescriptionItemDosageOID: number;
  InfusionRate: string;
  RateNumerator: UOM;
  RateDenominator: UOM;
  Duration: MeasurableObject;
  VariableDoseInstruction: string;
  IsAlertShown: boolean;
  UpperInfusionRate: string;
}
export class AdministeredTimeDoseDetail extends CLZOObject {
  PresItemDosageOID: number;
  Dose: string;
  DoseUOM: UOM;
  ScheduledTimeInMins: number;
}
export class IPPDoseRegime extends DoseRegime {
  InfusionRate: string;
  InfusionRateNumUOM: UOM;
  InfusionRateDenUOM: UOM;
  ValueRange: string;
  FreqUOMCode: string;
  DisplaySeqNumber: number;
  SVScheduleTimeAndDoseValues: string;
  PreviousServiceDRTValues: string;
  LowerValueRange: string;
  UpperValueRange: string;
  IsDaywise: string;
  ParentAdditionalItemValue: string;
  PrescriptionType: string;
  FrequencyType: string;
  Frequency: IPPFrequency;
  Rate: string;
  RateUOMOID: UOM;
  RateDenaminatorUOMOID: UOM;
  UpperRate: string;
  oConditionalDoseRegime: ObservableCollection<ConditionalDoseRegime>;
  oTitratedDoseRegime: ObservableCollection<TitratedDoseRegime>;
  FixedTimes: ObservableCollection<IPPScheduledetails>;
  DrugroundTimes: ObservableCollection<IPPScheduledetails>;
}
export class ConditionalDoseRegime extends CLZOObject {
  LowerValue: string;
  UpperValue: string;
  ValueUOM: UOM;
  AddlItemType: string;
  AddlItemOID: number;
  Dose: string;
  DoseUOM: UOM;
  Instruction: string;
  AddlItemName: string;
  AddlItemCode: string;
  ParentAddlItemCode: string;
  Rate: string;
  RateUOMOID: UOM;
  RateDenaminatorUOMOID: UOM;
  ValueRange: string;
  ValueRangeOpratorText: string;
  UpperDose: string;
  UpperRate: string;
  OID: number;
}
export class TitratedDoseRegime extends CLZOObject {
  scheduleDTTM: DateTime;
  Dose: string;
  DoseUOMOID: number;
  Scheduletime: string;
}
export class Frequency extends CLZOObject {
  Frequencyvalue: number;
  FrequencyId: number;
  FrequencyName: string;
  ShortName: string;
  IsPRN: string;
  IsApplicableForDoseCalc: string;
}
export class IPPFrequency extends Frequency {
  LowEvent: number;
  HighEvent: number;
  LowPeriod: number;
  HighPeriod: number;
  Type: string;
  UOM: string;
  IsSunday: boolean;
  IsMonday: boolean;
  IsTuesday: boolean;
  IsWednesday: boolean;
  IsThursday: boolean;
  IsFriday: boolean;
  IsSaturday: boolean;
  NoOfEventsPerDay: number;
}
export class Indication extends CLZOObject {
  CodingschemeCode: string;
  Version: string;
  Code: string;
  Term: string;
  TermKey: string;
  Type: string;
  DataProviderType: string;
  OwnerOrganisationOID: number;
}
export class StatusFlags {
  HasWarnings: string;
  IsHold: string;
  PrintStatus: string;
  HasDoseCalculation: string;
  IsTechValidate: string;
}
export class DrugProperty {
  DrugPropertyCode: string;
  VMChildCode: string;
  DrugName: string;
  HighRiskMsg: string;
  IdentifyingOID: number;
  IdentifyingType: string;
  OccuranceCode: string;
  CompPrescribableItemListOID: number;
  DrugPropertyToolTip: string;
  PrescriptionMCidentifyingtype: string;
  Prescriptionitemoid: number;
  Prescriptionmulticomponentoid: number;
  UniqueMCRowID: number;
  PrescribingNote: string;
}
export class IPPPresItemBasicProperties extends PresItemBasicProperties {
  StrengthText: string;
  Instruction: ObjectInfo;
  ParentPrescriptionType: string;
  ParentPrescriptionItemOID: number;
  OrginalEndDTTM: DateTime;
  PrepStatusCode: string;
  IsWardStock: boolean;
  IsSupplyRequested: string;
  RequisitionCACode: string;
  STKREQCode: string;
  oRequisitionHistoryDetails: RequisitionHistoryDetails;
  ReviewAfterDTTM: DateTime;
  ReviewAfter: string;
  ReviewAfterUOM: ObjectInfo;
  RouteDeactivation: string;
  FormDeactivation: string;
  SiteDeActivated: string;
  RequestDoseUOMDeActivated: string;
  QuantityUOMDeActivated: string;
  RatenumUOMDeActivated: string;
  RatedinoUOMDeActivated: string;
  BoosterdoseUOMDeActivated: string;
  BolusUOMDeActivated: string;
  IsReviewafterReq: boolean;
//  IsReviewAlertShown: string; -- same property exists in parent class also
  LastReviewedDTTM: DateTime;
  IsPresItemIgnoreAdminMethod: boolean;
  StrengthDeactivation: string;
}
export class PresItemBasicPropertiesView extends PresItemCommonProperties {
  cn: boolean;
  Dose: string;
  DoseType: string;
  Frequency: string;
  StartDate: DateTime;
  Duration: string;
  EndDate: DateTime;
  Direction: string;
  Site: string;
  Quantity: string;
  PrescriptionItem: ObjectInfo;
  DrugStatus: string;
  UniqueRowID: string;
  IsCurrentMedication: string;
  MedClrkSource: string;
  IsDeactivated: string;
  QuantityUOMName: string;
  QuantityUOMOID: number;
  QuantityUOMLzoID: string;
  IsPresItemLevelDispense: string;
  DispenseInstructionCode: string;
  SupplyInstructionCode: string;
  PrepStatusCode: string;
  MCIItemDisplay: string;
  IsSupplyRequested: string;
  IsWardStock: boolean;
  RequisitionCACode: string;
  FormViewParameters: PrescriptionItemFormViewParameters;
  OrderSet: ObjectInfo;
  PRNInstructionValue: string;
  RequestUrgency: string;
  RequestUrgencyOrder: number;
  RequestedDTTM: DateTime;
  RequestedComments: string;
  RequestedBy: string;
  SteppedDoseAdminTimes: string;
  IsinDefiniteOmit: boolean;
  IsinDefiniteOmitDTTM: DateTime;
  OmitComments: string;
  OmittedBy: string;
  IsAllowed: boolean;
  ExistsOnAdmission: string;
  PrescribingNote: string;
  FluidPrescribableItemListOID: number;
  Supplyby: string;
  PrescriptionMulticomponentOID: number;
  PrescriptionItemDosageOID: number;
  ProblemTerm: string;
  DiscontinuedBy: string;
  DiscontinuedReason: string;
  DateCommenceDTTM: DateTime;
  IsPGD: boolean;
  ProblemTerm1: string;
  SiteCode: string;
  StrengthText: string;
  oPresItemPropAPI: PrescriptionItemPropertiesAPI;
  DoseTypeValue: string;
  IsWardStockFluid: boolean;
  isDoseCalcExist: boolean;
  DCCalDTTM: DateTime;
  DCHeightRecordedDTTM: DateTime;
  DCWeightRecordedDTTM: DateTime;
  DurationInfo: MeasurableObject;
  Problem: ObservableCollection<string>;
}
export class PrescriptionItemFormViewParameters extends CLZOObject {
  LineIndicator: string;
  AdminDevice: string;
  AdministeredByCode: string;
  IntravenousInfusionData: IntravenousInfusionDetails;
  AdminDeviceData: AdminDeviceDetails;
  INFTYCODE: string;
  ReviewAfterDTTM: DateTime;
  ReviewAfter: string;
  ReviewAfterUOM: ObjectInfo;
  IsReviewafterReq: boolean;
  IsReviewAlert: boolean;
  ReviewComments: string;
  IsReviewExists: boolean;
  ReviewRequestedBy: string;
  ReviewType: string;
  IsReviewAvailableBeforeSequence: boolean;
  LastReviewedDTTM: DateTime;
  SequenceData: SequenceDetails;
}
export class IntravenousInfusionDetails extends CLZOObject {
  Fluid: ObjectInfo;
  Volume: string;
  VolumeUOM: UOM;
  InfusionPeriod: string;
  InfusionPeriodUOM: UOM;
  Rate: string;
  RateUOM: UOM;
  RateDenominatorUOM: UOM;
  Humidification: string;
  PreviousRate: string;
  PreviousRateDrUOMName: string;
  PreviousRateUOMName: string;
  DeliveryDevice: string;
  Lumen: string;
  InfusionSeqOrder: number;
  IsOnGoing: string;
  ReviewAfter: DateTime;
  MaxDose: string;
  Concentration: number;
  TargetSaturationUpper: number;
  TargetSaturationLower: number;
  IsOxygen: string;
  IsSequentialPrescribing: boolean;
  FirstPrescItemOIDInSeq: number;
  ParentPrescriptionItemOID: number;
  UparentPresitemOIDSeq: number;
  InfusionSeqCount: number;
  IsAlertShown: boolean;
  IsBolusInfusion: string;
  IsReviewAlert: boolean;
  IsInfusionInprogress: boolean;
  IsInfusionStartDTTMReached: boolean;
  IsInfusionRoute: string;
  IsInfAmendStartDTTMBlank: boolean;
  IsEstimatedStopRecalculationRequired: boolean;
  HUMIDCode: string;
  LowConcentration: string;
  LowConcentrationUOMOID: UOM;
  UpperConcentration: string;
  UpperConcentrationUOMOID: UOM;
  UpperRate: string;
  PreviousUpperRate: string;
  PreviousLowConcentration: string;
  PreviousLowConcentrationUOM: UOM;
  PreviousUpperConcentration: string;
  PreviousUpperConcentrationUOM: UOM;
  IsAlertShownValue: string;
  IsInfusion: boolean;
  IsVolumeBasedInfusion: string;
  RoundOffCode: string;
  RoundOffText: string;
  FluidIdentifyingType: string;
  FluidIdentifyingOID: number;
  FluidLorenzoID: string;
  IsFirstItem: boolean;
  InfusionGroupSequenceNo: number;
  IsLastItem: boolean;
  SequenceParentPrescItemOID: number;
  SeqInfOrderForPervImmediateItm: number;
  IsFluidAuthorise: boolean;
  InfScheduleDTTMs: ObservableCollection<DateTime>;
  SequentialPrescriptionItemOIDs: ObservableCollection<number>;
}
export class AdminDeviceDetails extends CLZOObject {
  BackgroundRate: string;
  BackgroundRateUOM: UOM;
  BackgroundRateDenaminatorUOMOID: number;
  TopUpDose: string;
  TopUpDoseUOM: UOM;
  LockOutPeriod: number;
  LockOutPeriodUOM: UOM;
  BackgroundRateDenaminatorUOM: UOM;
  MonitorPeriod: string;
  MonitorPeriodUOM: UOM;
  MonitoringPeriodAlertDTTM: DateTime;
  BoosterDose: string;
  BoosterDoseUOM: UOM;
}
export class SequenceDetails extends CLZOObject {
  SequenceOrder: number;
  IsSequentialPrescribing: boolean;
  FirstPrescItemOIDInSeq: number;
  ParentPrescriptionItemOID: number;
  IsSeqInprogress: boolean;
  GroupSequenceNo: number;
  IsFirstItem: boolean;
  IsLastItem: boolean;
  SequenceParentPrescItemOID: number;
  UparentPresitemOIDSeq: number;
}
export class PrescriptionItemPropertiesAPI extends CLZOObject {
  DrugNameLzoID: string;
  DrugNameOID: number;
  DrugFormOID: number;
  DrugFormLzoID: string;
  IsMedicationCritical: string;
  IsDoseCalculatedByDC: string;
  PatientObservationsLastDateTime: DateTime;
  oDoseCalc: DoseCalc;
}
export class DoseCalc {
  PatientHeight: string;
  PatientWeight: string;
  BSAFormula: string;
  BSAValue: string;
  UpdatePatientRecord: string;
  IsDailyDose: string;
  RequestDose: string;
  RequestDoseUOMOID: number;
  RequestDoseUOMName: string;
  RequestDosePer: string;
  CalculatedDose: string;
  OrderedPerDose: string;
  RoundedTo: string;
  OrderedPerDay: string;
  OverrideReason: string;
  ISAlwaysuseDosecalc: string;
  USSGestationDays: string;
  WeightUOM: string;
  DoseCalcBasedOn: string;
  RequestDoseSecondUOM: string;
  RequestDoseThirdUOMLzoID: string;
  FrequencyOID: number;
  WeightOption: string;
  BSAUOM: number;
  TotalDailyDose: string;
  SelectProductLorenzoID: string;
  RoundingFactor: string;
  DoseCapApplied: boolean;
  DoseCapAppliedDose: string;
  HeightUOM: string;
  RoundedDose: string;
  FormCode: string;
  HeightValue: string;
  HeightRecordedDTTM: DateTime;
  WeightValue: string;
  WeightRecordedDTTM: DateTime;
  IsEstimatedHeight: string;
  IsEstimatedWeight: string;
  IdealBodyWeight: string;
  AdjustedBodyWeight: string;
  BSAFRCode: string;
  RequestedDose: string;
  RequestedDoseUOMName: string;
  ReqDoseUOMSecondCompLzoID: string;
  ReqDoseUOMThirdCompLzoID: string;
  DOSFRCode: string;
  REQPDCode: string;
  FrequencyName: string;
  CalculatedAmount: string;
  OrderedAmountPerDose: string;
  OrderedAmountPerDay: string;
  OverRideReason: string;
  LowEvent: string;
  WTOPTCode: string;
  DrugFrequencyOID: number;
}
export class IPPPresItemBasicPropertiesView extends PresItemBasicPropertiesView {
  Strength: string;
  ScheduleTime: string;
  ParentPrescriptionItemOID: number;
  ParentPrescriptionType: string;
  ReorderFlag: string;
  ParentPrescriptionitemstatus: string;
  ParentEncounteroid: number;
  ParentReordertype: string;
  PRNInstruction: ObservableCollection<ObjectInfo>;
}
export class PresItemAdditionalProperties extends CLZOObject {
  NoOfInstallments: number;
  IntervalBtwnInstallment: MeasurableObject;
  MedClerkModifyReason: ObjectInfo;
  StationeryType: ObjectInfo;
  AdditionalComments: string;
  BatchNumber: string;
  ExpiryDate: DateTime;
  NonFormularyReason: string;
  NonCatalogueReason: string;
  StatusModifedDTTM: DateTime;
  AdminMethod: ObjectInfo;
  DrugAttributes: string;
  PharmacyNotingComments: string;
  HoldReason: string;
  ReasonOfStopping: string;
  DateCommenced: string;
  NonCatalogueOtherReason: string;
  ReconcileComments: string;
  PreparationStatus: string;
  SupplyInsChildExists: string;
  NonFormComponentItems: string;
  NonFormComponents: string;
  NonFormCompReason: string;
  PrescriberIdentifier: string;
  PrescriberBleep: string;
  PrescriberTelephone: string;
  PrescriberPager: string;
  ManageReviewDetail: ManageReviewPeriod;
  ReasonforReconcile: string;
  GroupHeaderName: string;
  OtherComments: string;
  AdminMethodCode: string;
  InstalmentInstructions: ObservableCollection<ObjectInfo>;
  EndorsementProperties: ObservableCollection<ObjectInfo>;
  MedClerkSource: ObservableCollection<ObjectInfo>;
  ReviewAfterDetails: ObservableCollection<ReviewAfterDetail>;
}
export class ReviewAfterDetail extends CLZOObject {
  PrescriptionItemOID: number;
  Reviewer: string;
  ReviewedDTTM: DateTime;
  ReviewRequestedBy: string;
  ReviewRequestedDTTM: DateTime;
  ReviewAfter: string;
  ReviewAfterUOM: ObjectInfo;
  ReviewPeriod: string;
  ReviewDueDTTM: DateTime;
  ReviewType: ObjectInfo;
  ReviewOutcome: ObjectInfo;
  ReviewOutcomeComments: string;
  ReviewRequestComments: string;
  ReinstateReason: string;
  IsCurrent: string;
  DiscontinueReason: string;
}
export class ManageReviewPeriod extends CLZOObject {
  PrescriptionItemOID: number;
  NewReviewAfterDTTM: DateTime;
  NewReviewAfter: string;
  NewReviewAfterUOM: ObjectInfo;
  NewReviewType: ObjectInfo;
  NewReviewRequestComments: string;
  EncounterOID: number;
  oReviewAfterDetail: ReviewAfterDetail;
}
export class PresItemDrugProperties extends CLZOObject {
  CanDoseBeChanged: string;
  MandatoryCode: string;
  ContraIndicationOID: number;
  HasProhibitedRoute: string;
  Strength: MeasurableObject;
  IsParacetamolIngredient: boolean;
}
export class IPPMCPresctiptionItem extends CLZOObject {
  PrescriptionItemOID: number;
  IdentifyingOID: number;
  IdentifyingType: string;
  ComponentName: string;
  Quantity: string;
  QuantityUOM: string;
  QuantityUOMOID: number;
  IsUpto: boolean;
  LorenzoID: string;
  IsNonFormulary: boolean;
  DisplayOrder: number;
  isEditable: boolean;
  isQtyEditable: boolean;
  isQtyUOMEditable: boolean;
  IsDisableConflicts: boolean;
  PrescribableItemListOID: number;
  UniqueMCRowID: number;
  ConflictsExist: string;
  OID: number;
  ActionCode: string;
  QuantityUOMs: ObjectInfo;
  Nonformularyreason: string;
  OtherNonformularyreason: string;
  QuantityUomcol: string;
  DisplacementVolume: string;
  DisplacementVolumeUOM: string;
  DisplacementVolumeUOMOID: number;
  BatchNumber: string;
  ExpiryDttm: DateTime;
  IsInfusionFluid: boolean;
  CompIdentifyingOID: number;
  CompIdentifyingType: string;
  MedDrugPreparationdetailOID: number;
  QuantityUOMLZID: string;
  AdminMethod: string;
  MCVersion: string;
  IdentifyingName: string;
  PresItemLorenzoID: string;
  MCDoseUOMDeActivated: string;
  DispenseInstructionCode: string;
  SupplyInstructionCode: string;
  OtherDispensingInstruction: string;
  PrepStatusCode: string;
  IsWardStock: boolean;
  IsSupplyRequested: string;
  RequisitionCACode: string;
  IsControlledDrug: string;
  DrugProperties: string;
  VMVPLorenzoID: string;
  VMVPMCIdentifyingName: string;
  SupplyComments: string;
  LastSupplyNameMCIChild: string;
  LastSupplyDTTMMCIChild: DateTime;
  NextSupplyDTTM: DateTime;
  IsMCAuthorize: boolean;
  MCQuantity: ObservableCollection<Quantity>;
  oDrugPrepHistoryData: ObservableCollection<DrugPrepHistoryData>;
  SupplyInstruction: ObservableCollection<ObjectInfo>;
  DispensingInstruction: ObservableCollection<ObjectInfo>;
  TechValidateDetails: ObservableCollection<TechnicalValidationInfo>;
}
export class DrugPrepHistoryData extends CLZOObject {
  AttributeName: string;
  FromValue: string;
  ToValue: string;
  Modifiedby: string;
  Modifieddttm: DateTime;
  ComponentName: string;
}
export class APIProperties {
  IngredientCollection: ObservableCollection<IngCollection>;
  IndicationCollection: ObservableCollection<IndCollection>;
  QuantityUOM: ObservableCollection<QuantityUOM>;
}
export class IngCollection {
  BaseIngredientName: string;
  BaseIngredientOID: number;
  IdentifyingType: string;
  IdentifyingOID: number;
}
export class IndCollection {
  PrescribableItemDetailOID: number;
  IndicationName: string;
  IndicationCode: string;
}
export class QuantityUOM extends CLZOObject {
  OID: number;
  QuantityUOMName: string;
  IdentifyingOID: number;
}
export class LegalCategory extends CLZOObject {
  LCId: number;
  LegalCategoryName: string;
}
export class PrescriptionItemAdminDetails extends CLZOObject {
  gn: boolean;
  OID: number;
  BatchNumber: string;
  ExpiryDate: DateTime;
  WitnessedBy: ObjectInfo;
  AdministredDate: DateTime;
  Comments: string;
  DoseAdministered: string;
  DoseAdministeredUOM: UOM;
  AdministeredBy: ObjectInfo;
  AdminInstruction: string;
  RouteOID: number;
  IsPCA: string;
  Site: ObjectInfo;
  IsNoWitnessAvailable: boolean;
  SlotScheduleDate: DateTime;
  BagSequence: number;
  DeliveryDevice: string;
  InfusionRate: string;
  InfusionRateUOM: ObjectInfo;
  InfusionRatePerUOM: ObjectInfo;
  DripRate: string;
  DripRateUOM: ObjectInfo;
  DripRatePerUOM: ObjectInfo;
  BagVolume: string;
  BagVolumeUOM: ObjectInfo;
  Lumen: string;
  InfusionEndDate: DateTime;
  AdminEndTime: DateTime;
  MedicationAction: string;
  InfuationType: string;
  InfusionPeriod: string;
  InfusionPeriodUOM: ObjectInfo;
  isInfusionBolusIntermittent: boolean;
  HumidCode: string;
  ConcentrationStrength: string;
  ConcentrationStrengthUOM: ObjectInfo;
  ConcentrationVolume: string;
  ConcentrationVolumeUOM: ObjectInfo;
  InfusionPeriodforMedAdmin: number;
  InfusionPeriodUOMforMedAdmin: ObjectInfo;
  InfusionDose: string;
  InfusionDoseUOMNumerator: ObjectInfo;
  InfusionDoseUOMDenominator: ObjectInfo;
  IsDuringHomeLeave: boolean;
}
export class WarningDetails extends CLZOObject {
  WarningOID: number;
  WarningType: string;
  WarningSubType: string;
  WarningMessage: string;
  WarningSeverity: string;
  WarningBehaviourType: string;
  AcknowledgeStatus: string;
  PrescriberComments: string;
  AuthroiserComments: string;
  ClinicallVeriferComments: string;
  ApplicableTo: string;
  IsProblem: boolean;
  ProblemText: string;
  PerformedOn: DateTime;
  MessageFormat: MessageFormat;
  PrescriptionItem: ObjectInfo;
  ConflictMessage: string;
  DisplaySequenceNumber: number;
  MonoGraphcontentOID: number;
  DrugMonoInfoOID: number;
  SourceDataProviderType: string;
  AllergyMsgTrigged: string;
  Code: string;
  ConflictType: string;
  sFrstNotAlrgyCheck: string;
  IsSeal: string;
  TypeColorCode: string;
  PrescriptionDTTM: DateTime;
  PrescriptionStartDTTM: DateTime;
  MCChildIDType: string;
  MCChildIDName: string;
  MCChildIDOID: number;
  DrugMulticomponentOID: number;
  UniqueMCRowID: number;
  HealthIssueCode: string;
  HealthIssueType: string;
  IsMandatoryForOthers: boolean;
}
export class MessageFormat extends CLZOObject {
  FirstMessage: string;
  SecondMessage: string;
  ThirdMessage: string;
  FourthMessage: string;
  FifthMessage: string;
  SixthMessage: string;
}
export class DoseCalculatorDetails extends CLZOObject {
  PatientHeight: string;
  PatientWeight: string;
  BSAFormula: string;
  BSAValue: string;
  UpdatePatientRecord: string;
  IsDailyDose: string;
  RequestDose: string;
  RequestDoseUOMOID: number;
  RequestDoseUOMName: string;
  RequestDosePer: string;
  CalculatedDose: string;
  OrderedPerDose: string;
  RoundedTo: string;
  OrderedPerDay: string;
  OverrideReason: string;
  ISAlwaysuseDosecalc: string;
  USSGestationDays: string;
  WeightUOM: string;
  DoseCalcBasedOn: string;
  RequestDoseSecondUOM: string;
  RequestDoseThirdUOMLzoID: string;
  FrequencyOID: number;
  WeightOption: string;
  BSAUOM: number;
  TotalDailyDose: string;
  SelectProductLorenzoID: string;
  RoundingFactor: string;
  DoseCapApplied: boolean;
  DoseCapAppliedDose: string;
  HeightUOM: string;
  RoundedDose: string;
  FormCode: string;
  IBWWeight: string;
  ABWWeight: string;
  RecordedHightDTTM: DateTime;
  RecordedWeightDTTM: DateTime;
  IsWeightEstimated: boolean;
  IsHeightEstimated: boolean;
  CalculatedDTTM: DateTime;
  IsEstimatedHeight: string;
  IsEstimatedWeight: string;
  ReqDoseUOMThirdCompLzoID: string;
  DOSFRCode: string;
  FrequencyName: string;
  ReqDoseUOMSecondCompLzoID: string;
  LowEvent: string;
  HTUOMCode: string;
  WTUOMCode: string;
}
export class PrescriptionItemAction extends CLZOObject {
  IsActionPerformed: string;
  PerformedDTTM: DateTime;
  PerformedBy: ObjectInfo;
  ReasonForModification: string;
  Comments: string;
  ActionCode: string;
  VerifyOnBehalf: OnBehalfInfo;
  IPReconcileReason: string;
  ModifiedItemOID: number;
  HoldReason: string;
  OnlyUpdatedColumn: string;
  UpdateItemStatus: string;
  CancelDefaultAllergen: string;
  DirectDiscontinueReason: string;
  ModificationComments: string;
  AmendOfItemNo: string;
  ReconcileComments: string;
  IPReconcileComments: string;
  ClinicallySupplyInstruction: string;
  IsClinicalVerHisLink: boolean;
  CVStatusCode: string;
}
export class OnBehalfInfo extends CLZOObject {
  NotifyFlag: string;
  OnBehalfOfUser: ObjectInfo;
  OnBehalfOfUserReason: string;
  CommunicationMode: string;
}
export class DRCConflict {
  OID: number;
  PatientOID: number;
  PrescriptionItemOID: number;
  DRCDefDoseTypeLorenzoID: string;
  DRCDefDoseTypeCode: string;
  DRCMessage: string;
  IsDRCPassed: string;
  Status: string;
  OwnerOrganisationOID: number;
  PartKey: number;
  PatientWeight: string;
  PatientBSA: string;
  IsDRCChecked: boolean;
  ConflictDetails: ObservableCollection<DRCConflictDetails>;
}
export class DRCConflictDetails {
  OID: number;
  PresItemDRCConflictOID: number;
  ErrorCode: string;
  ErrorMessage: string;
  AcknowledgeReason: string;
   //bug 44642
  AcknowledgeReasonCode: string;
  IsChecked: string;
  Status: string;
  OwnerOrganisationOID: number;
  Comments: string;
  BehaviourType: string;
  PartKey: number;
}
export class TitratedDoseinfo extends CLZOObject {
  IsHavingAdminTime: string;
  ScheduleDoseUOM: string;
  TitratedAdminInstruction: string;
  TitratedComments: string;
  TitrateScheduledinfo: ObservableCollection<TitrateScheduledinfo>;
}
export class TitrateScheduledinfo extends CLZOObject {
  ScheduleDTTM: DateTime;
  TitratedDose: string;
  TitratedDoseUOM: string;
}
export class PresItemAuditHistory {
  HistoryOid: number;
  FieldName: string;
  NewValue: string;
  OldValue: string;
}
export class DoseFormula extends CLZOObject {
  BSAFormula: string;
  DoseCalcBasedOn: string;
  CalculationFor: string;
  RequestedDose: string;
  RequestedUOM: UOM;
  RequestDosePerUOM: string;
  RoundOffDose: string;
  IsDoseCalcAlwaysUse: string;
  RequestedUOMOID: number;
  RequestedUOMName: string;
  MCVersion: string;
  IsCopyFav: string;
  RequestDosePer2UOMLzoID: string;
  RequestDosePer2UOMName: string;
  DefaultWeightType: string;
  MinDoseCap: string;
  MaxDoseCap: string;
  DoseCapUOMLzoID: string;
  DoseCapUOMName: string;
  ProductLzoID: string;
  ProductName: string;
  DosageFormType: string;
  DoseCalcFrequencyOID: number;
  DoseCalcFrequencyName: string;
  ThirdCmpLrnzOId: string;
  Freqdetail: ObjectInfo;
}
export class GPConnectItem extends CLZOObject {
  GPConnectID: string;
  MedicationItemDetail: string;
  DrugSnomedCode: string;
  ItemType: string;
  LastIssued: DateTime;
  MedicationCode: string;
  Dosage: ObservableCollection<GPConnectAdminDosage>;
}
export class GPConnectAdminDosage {
  Text: string;
  Instruction: string;
}
export class IPPPrescriptionItem extends PrescriptionItem {
  StrengthText: string;
  Instruction: ObjectInfo;
  PrescriptionItemStatusCode: string;
  DrugFrequencyUOMCode: string;
  IsWardStock: boolean;
  IsSupplyRequested: string;
  RequestedDTTM: DateTime;
  RequestedBy: string;
  RequestedComments: string;
  RequestUrgency: string;
  RequisitionCACode: string;
  InstructionCount: number;
  FrequencyDetails: IPPFrequencyDetails;
  IsWardStockForFluid: boolean;
}
export class PrescriptionDetails extends Prescription {
  PatientData: PatientDetail;
  EncounterDetails: EncounterDetails;
  IsTechnicallyValidated: string;
  TechnicallyValidatedUser: ObjectInfo;
  PresStationeryTypeOID: number;
  Row: number;
  GroupByDetails: ObservableCollection<GroupResult>;
}
export class PatientDetail extends CLZOObject {
  OID: number;
  Name: string;
  PatientID: string;
  ExpectedDischargeDTTM: DateTime;
  LeaveRequestDTTM: DateTime;
  DEPARTDTTM: DateTime;
}
export class EncounterDetails extends CLZOObject {
  OID: number;
  EncounterID: string;
  EncounterType: string;
  StartDTTM: DateTime;
  EndDTTM: DateTime;
}
export class GroupResult {
  GroupValue: string;
  Count: number;
  DisplayValue: string;
}
export class DrugItemBasicInfo extends DrugItemBasicData {
  FormularyNotes: string;
  APIProp: APIProperties;
  RequestedDose: string;
  Comments: string;
  PackSize: string;
  IsFormulary: string;
  MultiComponentItems: string;
  CompPrepStatusCode: string;
  MCUOMS: string;
  AdminMethod: string;
  IsInfusionFluid: string;
  IsAllowMultipleRoute: string;
  IsIgnoreEPresRuleAdminMethod: boolean;
  IsWardStock: boolean;
  IsAuthorise: boolean;
  DrugMedicationCode: string;
  DrugActiveStatus: string;
  DrugProperties: ObservableCollection<DrugProperty>;
  DoseRegime: ObservableCollection<DoseRegime>;
  MCChildItems: ObservableCollection<IPPMCPresctiptionItem>;
  Routes: ObservableCollection<Route>;
}
export class Route extends CLZOObject {
  RouteId: number;
  RouteName: string;
  Status: string;
  MCVersionNumber: string;
  bInfusion: string;
  IsProhibited: boolean;
  DataProvider: string;
  PageIndex: number;
  IsStrengthReqd: string;
  IsCustomized: boolean;
  OwnerOrganisationID: number;
  Code: string;
  LorenzoID: string;
  RouteText: string;
  nPageNo: number;
  nPageSize: number;
  nMAXRows: number;
  nLorenzoID: string;
  sRouteText: string;
}
export class DrugItemInputData extends DrugItemBasicData {
  PageIndex: number;
  FavouritesDetailOID: number;
  IsFormulary: boolean;
  Options: EnumDrugOptions;
  nPageNo: number;
  nPageSize: number;
  nMAXRows: number;
  PrepStatusCode: string;
  TeamOIDs: string;
  MCIDeactItems: string;
  IsFetchFormularyAndNonFormulary: boolean;
  MatchIdentifyingTypes: ObservableCollection<string>;
  IsAuthorise: boolean;
}
export enum EnumDrugOptions {
  ALTERNATE_OPTIONS,
  PRESCRIBING_OPTIONS,
  RELATED_OPTIONS,
  ALL,
}
export class IPPDrugItemInputData extends DrugItemInputData {
  RouteOIDs: string;
}
export class PresItemRequestDetails extends CLZOObject {
  Status: string;
  ResponseDTTM: DateTime;
  Name: string;
  Reason: string;
  Locationname: string;
  DispensedDrugName: string;
  Servicename: string;
}
export class PITag {
  ItemSubType: string;
  ContainsFluid: boolean;
  DrugFormOid: number;
  StrengthText: string;
  Routes: string;
  IsAdministration: boolean;
  MCVersionNo: string;
}
export class PrescriptionResponse extends CLZOObject {
  PrescriptionOID: number;
  StationeryType: ObjectInfo;
  Chooseprinter: string;
  TemplateStatus: string;
  PatientOID: string;
  EncounterOID: string;
  ClinicalNoteOID: string;
  PPatientOID: string;
  PresItemResponse: ObservableCollection<PrescriptionItemResponse>;
}
export class PrescriptionItemResponse extends CLZOObject {
  PrescriptionItemOID: number;
  IsControlledDrug: string;
  PrescriptionItemName: string;
  OID: number;
  Status: string;
}
export class EFrameworkCriteria extends CLZOObject {
  IdentifyingOID: number;
  IdentifyingType: string;
  RouteOID: number;
  FormOID: number;
  StrengthText: string;
  MCVersion: string;
}
export class IPPFormViewParams extends EFrameworkCriteria {
  ParamType: string;
  RouteOIDs: string;
  MCuptoIdentifyingoid: number;
  MCuptoIdentifyingtype: string;
  IsMciUptoProdRule: boolean;
  IsRouteRequired: boolean;
  IsDoseUOMRequired: boolean;
  IsDosageFormRequired: boolean;
  IsStrengthRequired: boolean;
  IsSiteRequired: boolean;
  PatientOID: number;
  PRNinstructions: string;
  IsProhibitedRouteRequired: boolean;
}
export class IPPFormViewDafults extends CLZOObject {
  IsStrengthProdAvail: boolean;
  HighRiskMsg: string;
  FHIRAttributesInfo: FHIRAttributes;
  DoseUOM: ObservableCollection<UOM>;
  DosageForm: ObservableCollection<Form>;
  DoseSite: ObservableCollection<Site>;
  Route: ObservableCollection<Route>;
  DoseStrength: ObservableCollection<string>;
  Quantity: ObservableCollection<Quantity>;
  MonographInfo: ObservableCollection<MonographInfo>;
  PRNInstructions: ObservableCollection<ObjectInfo>;
}
export class Form extends CLZOObject {
  FormId: number;
  FormName: string;
  LorenzoID: string;
  OwnerOrganisationID: number;
  Code: string;
}
export class Site extends CLZOObject {
  SiteId: number;
  SiteName: string;
  DataProvider: string;
  OwnerOrganisationOID: number;
}
export class MonographInfo extends CLZOObject {
  Type: string;
  Path: string;
  Information: string;
  Section: string;
  Status: string;
  MonographContentOID: number;
  SourceType: string;
  IdentifyingType: string;
  TypeDisplay: string;
}
export class FHIRAttributes {
  IsDoseConfigured: boolean;
  IsDirectionConfigured: boolean;
  ItemType: string;
}
export class Identifyingdetails extends CLZOObject {
  IdentifyingOID: number;
  IdentifyingType: string;
}
export class IPPReqDeactAttributes extends CLZOObject {
  PrescriptionItemOID: number;
  PatientOID: number;
  MCVersionNo: string;
  IdentifyingOID: number;
  IdentifyingType: string;
}
export class IPPResDeactAttributes extends CLZOObject {
  DeactAttributeStatus: boolean;
}
export class FavouriteItem extends CLZOObject {
  FavouriteItemID: number;
  Name: string;
  Level: number;
  ParentID: number;
  UserFavourite: string;
  ExpiryReason: string;
  ReinstateReason: string;
  Description: string;
  ActiveFrom: DateTime;
  ActiveTo: DateTime;
  ReinstateDTTM: DateTime;
  MCVersion: string;
  Version: string;
  sDataFilter: string;
  LorenzoID: string;
  OwnerorganisationOID: number;
  CurrentOrganizationID: number;
  DFOID: number;
  DFDEFOID: number;
  DFName: string;
  ChildCount: number;
  ChildFolderCount: number;
  IsMngAddFavourite: string;
  FavriteStatusHistory: StatusHistory;
  Itemtype: string;
  PrescriptionItem: ObservableCollection<ConstituentItem>;
}
export class PrescribeItemBase extends CLZOObject {
  IsBolus: string;
  PrescribeItemID: number;
  PrescribeItemListID: number;
  PrescribeItemDetailID: number;
  CatalogueID: number;
  Code: string;
  LorenzoID: string;
  Name: string;
  Description: string;
  KeyWord: string;
  Type: string;
  ItemSubType: string;
  Level: string;
  ActiveFrom: DateTime;
  ActiveTo: DateTime;
  VirtualParentID: number;
  ActualParentID: number;
  ParentName: string;
  IsDisplayInPrimaryList: string;
  IsDisplayInPrimaryListCust: string;
  Status: string;
  ItemStatusHistory: PrescribeItemStatus;
  HasChild: string;
  ParentItemOID: number;
  HOParentOID: number;
  OID: number;
  BrandName: string;
  DeactivateFrom: DateTime;
  ReinstateFrom: DateTime;
  PrescriptionItemID: string;
  PrescriptionID: string;
  Formularynote: string;
  OrganisationOID: number;
  IsFormulary: string;
  Version: string;
  MCVersion: string;
  SourceDataProviderType: string;
  SourceDataProviderID: string;
  DataProvStatus: string;
  SkipBasic: boolean;
  Hierarchy: string;
  HasDataFilter: string;
  EncounterID: string;
  ItemQuantityUOM: string;
  PresItemType: string;
  IsPrescribeByBrand: string;
  ItemID: string;
  ItemClass: string;
  OrganisationName: string;
  IsManufacturerGeneric: string;
  IsParallelImport: string;
  ITEMLORENZOID: string;
  AliasName: string;
  Display: string;
  ItemStatus: string;
  MCOID: number;
  MCPrepStatusCode: string;
  MCItemName: string;
  MCItmSubtypecode: string;
  MCIDetails: string;
  IsControllDrug: string;
  IsOxygen: string;
  CondDoseMonPeriodReq: string;
  IsOxygenCustom: string;
  CondDoseMonPeriodReqCustom: string;
  CustOID: number;
  CustOrganisationOID: number;
  MedicationHeading: string;
  IsCDForFDBEData: string;
  IsPresItemVPforAP: string;
  AdminMethodOID: number;
  AdminMethodName: string;
  Itemtype: string;
  IsAccessConstraint: boolean;
  IsAuthorise: boolean;
}
export class ConstituentItem extends PrescribeItemBase {
  FormularyNote: string;
  AddedBy: string;
  MFlag: string;
  ItemCatDetailId: number;
  identifyingoid: number;
  Processingdetails: string;
  ItemFormularyNote: string;
  HasAccessConstraint: number;
  MCIDeactitemName: string;
  IsCopyFav: string;
  DisplaySequence: number;
  IsIndicationRequired: string;
  IsDataProviderType: string;
  PrescNote: string;
  FormularyOID: number;
  Guidance: string;
  PrescItemType: string;
  IsExcludeGuidanceInSearch: string;
  ProcessingInfo: ObservableCollection<ProcessingInfo>;
  DrugProperty: ObservableCollection<DrugProperty>;
}
export class ProcessingInfo extends CLZOObject {
  IsBolus: string;
  IdentifyingOID: number;
  IdentifyingName: string;
  IdentifyingType: string;
  ProcessOID: number;
  MUIFlag: string;
  ONFlag: string;
  Name: string;
  AccessConstraint: string;
  Route: Route;
  Site: string;
  Form: Form;
  DoseType: string;
  DoseValue: string;
  MaxDoseValue: string;
  DoseUOM: UOM;
  McVersion: string;
  Frequency: Frequency;
  Duration: number;
  DurationCode: string;
  Period: string;
  Quantity: number;
  QuantityUOM: UOM;
  AdminInstruction: string;
  AdminInstructionName: string;
  SupplyInstruction: string;
  Stationary: string;
  StationaryText: string;
  IsDefault: string;
  Status: string;
  DoseFormula: DoseFormula;
  ProcessingOID: number;
  ProcessingIdenOID: number;
  DisplaySeqNum: number;
  AdminMethod: AdminMethod;
  AdminDevice: string;
  ObserveResult: string;
  StationaryP: Stationary;
  SourceDataProviderType: string;
  Strength: string;
  StrengthUOM: UOM;
  LorenzoID: string;
  DetailsLorenzoID: string;
  NoOfInstalment: number;
  InstalInstruction: string;
  InstalmentInterval: number;
  ItervalUOM: UOM;
  PRN: string;
  AddtionlComments: string;
  SiteName: string;
  AdminInstructionOID: number;
  IsCopyFav: string;
  IsSwap: string;
  ItemSubType: string;
  MCIDetails: string;
  MCDrugProperty: string;
  PresitemlistOID: number;
  OrderSentenceDescription: string;
  RequestDosePer2UOMLzoID: string;
  RequestDosePer2UOMName: string;
  DefaultWeightType: string;
  MinDoseCap: string;
  MaxDoseCap: string;
  DoseCapUOMLzoID: string;
  DoseCapUOMName: string;
  ProductLzoID: string;
  ProductName: string;
  DosageFormType: string;
  TitratedInstruction: string;
  DRCdoseTypes: DRCdoseTypes;
  AllowtimeshiftCode: string;
  IsAllowMultipleRoute: boolean;
  MultiRouteType: string;
  Itemtype: string;
  RequestPer2UOM: string;
  IsAccessConstraint: boolean;
  DisplayOrder: number;
  GroupHeaderName: string;
  SequentialID: number;
  FrequencyIsPRN: string;
  FreqLorenzoID: string;
  FreqPERODCode: string;
  Indication: ObservableCollection<Indication>;
  DoseDetails: ObservableCollection<DoseDetails>;
  MandatoryFields: ObservableCollection<string>;
  Adminin: ObservableCollection<AdminInstruction>;
  DrugRoute: ObservableCollection<Route>;
  DrugForm: ObservableCollection<Form>;
  DrugSite: ObservableCollection<Site>;
  DrugStationary: ObservableCollection<Stationary>;
  DrugPropery: ObservableCollection<DrugProperty>;
  SupplyQtyUOM: ObservableCollection<UOM>;
  FrequencyList: ObservableCollection<Frequency>;
  UOMList: ObservableCollection<UOM>;
  InfPeriodUOM: ObservableCollection<UOM>;
  InfRateNumUOM: ObservableCollection<UOM>;
  InfRateDenoUOM: ObservableCollection<UOM>;
}
export class DoseDetails extends CLZOObject {
  FromDoseValue: string;
  FromDoseUOM: UOM;
  ToDoseValue: string;
  ToDoseUOM: UOM;
  Frequency: Frequency;
  Duration: number;
  Period: string;
  VariableDoseInstr: string;
  StartDttm: DateTime;
  EndDttm: DateTime;
  PrescibableItemOID: number;
  QualifierName: string;
  StartValue: string;
  EndValue: string;
  ValueUOM: UOM;
  DurationUOM: UOM;
  Direction: string;
  Quantity: number;
  QuantityUOM: UOM;
  LowerObservationRange: number;
  UpperObservationRange: number;
  ObservationRangeUOM: UOM;
  DosingInstruction: string;
  FrequencyDetails: FrequencyDetails;
  LowerDose: string;
  LowerUOMOID: number;
  UpperDose: string;
  UpperUOMOID: number;
  MCVersion: string;
  IsCopyFav: string;
  DurationUOMOID: number;
  IsPRN: string;
  DurationUOMCode: string;
  DisplaySeqNum: number;
}
export class AdminMethod extends CLZOObject {
  AdminMethodId: number;
  AdminMethodName: string;
}
export class AdminInstruction extends CLZOObject {
  DAOID: number;
  AdminInstructionID: number;
  AdminInstructionName: string;
  Status: string;
  MCVersionNumber: string;
  OwnerOrganisationID: number;
}
export class Stationary extends CLZOObject {
  StationaryOID: number;
  StationaryName: string;
  StationaryHOrgID: number;
  DataProvider: string;
  StationaryCode: string;
}
export class DRCdoseTypes extends CLZOObject {
  DRCdoseTypeText: string;
  DRCdoseTypeLorenzoID: string;
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
export class PrescribeItemStatus extends StatusHistory {
  ReplacementItems: ObservableCollection<PrescribeItemBase>;
}
export class OrderSetAssociatedItems extends CLZOObject {
  GuidanceText: string;
  IsEditable: boolean;
  IsConflictsON: boolean;
  IsDisableDoseRangeCheck: boolean;
  IsDoNotOpenFormViewer: boolean;
  OrphanHeaders: string;
  Links: ObservableCollection<string>;
  ItemsList: ObservableCollection<OrderSetPrescriptionItems>;
}
export class OrderSetPrescriptionItems extends CLZOObject {
  isDefault: string;
  PrescriptionItemDetails: PrescriptionItemDetails;
  Offset: string;
  OffsetValue: number;
  OffsetPeriod: string;
  Status: string;
  ORSAssociationOID: number;
  ORSMainAppIdentifyingOID: number;
  PrescribingComments: string;
  TimeAdjustValue: string;
  DisplayOrder: number;
  HeaderName: string;
  SequentialID: number;
  SequenceType: string;
}
export class BrandInputData extends CLZOObject {
  IdentifyingOID: number;
  IdentifyingType: string;
  MCVersionNo: string;
  IsFormulary: boolean;
  RouteOID: string;
  FormOID: number;
  Strength: string;
  Itemsubtype: string;
  IsSearchBrandByAM: boolean;
}
export class MatchEANCODESearch extends CLZOObject {
  EANCode: string;
  ActiveMCVersionNo: string;
}
export class PackSizeForEANCODE extends CLZOObject {
  ScannedDrugName: string;
  ScannedDrugLorenzoID: string;
  PackSize: string;
  PackSizeUOM: string;
}
export class MedicationListCriteria extends CLZOObject {
  ServiceOID: number;
  LocationOID: number;
  sMenuCode: string;
  CAPresType: string;
  Identifyingtype: string;
  Identifyingoid: number;
  AlreadyPrescribedItem: string;
  currentEncounterOID: number;
  FHIRAttributes: FHIRExtension;
  IsDefaultRouteForm: boolean;
  AlreadyReorderdOID: string;
  PatientOID: number;
  EncounterOID: number;
  PrescriptionType: string;
  MaxSeqCountRequired: boolean;
  ProfileCancelledDrugFlag: string;
  ProfileDiscontinuedDrugFlag: string;
  ProfileHoldDuration: number;
  McVersion: string;
  IsDoPanel: number;
  FilterCriteria: string;
  ConflictCheck: string;
  DUCode: string;
  IsMaxSequentialGroupNoRequired: number;
  IsResolutionGird: number;
  IsEnableWSCconfig: boolean;
}
export class FHIRExtension {
  CalledBy: string;
  APIVersion: string;
  PrescriptionItemStatus: string;
  EpisodeIdentifier: string;
  EncounterIdentifier: string;
  IncDrugStatus: string;
  PrescriptionItemOID: string;
  EnableSealing: boolean;
  isMedClosedEncItem: boolean;
}
export class PrescriptionItemView extends CLZOObject {
  PrescriptionItemOID: number;
  FluidMedReq: FluidMedRequestDetail;
  oPrescriptionItem: PrescriptionItem;
  oPresItemBasicPropertiesView: PresItemBasicPropertiesView;
  oPresItemAdditionalProperties: PresItemAdditionalProperties;
  oPrescriptionItemAction: PrescriptionItemAction;
  oPrescriptionItemAddnView: PrescriptionItemAddnView;
  FrequencyDetails: IPPFrequency;
  AutoNumber: number;
  IsHeader: boolean;
  IsFooter: boolean;
  GroupHeaderName: string;
  InfustionHeaderLvl: number;
  IsFirstHeader: boolean;
  SupplyExistsForMCIComp: boolean;
  InfusionGroupSequenceNumber: string;
  oTechValidateDetails: ObservableCollection<TechValidatedItem>;
  IPPMCPresctiptionItem: ObservableCollection<IPPMCPresctiptionItem>;
}
export class FluidMedRequestDetail extends CLZOObject {
  EncounterOID: number;
  LastRequestedBy: string;
  LastRequestedDateTime: DateTime;
  LastTechValBy: string;
  LastTechValDateTime: DateTime;
  PrescriptionItemOID: number;
  SupplyComments: string;
  SupplyInstructions: string;
  SupplyStutus: string;
  FluidOID: number;
}
export class PrescriptionItemAddnView extends CLZOObject {
  AdditionalProperties: PresItemAdditionalProperties;
  AuthorisationDetails: PrescriptionItemAction;
  ClinicalVerificationDetails: PrescriptionItemAction;
  CancelDiscontinueDetails: PrescriptionItemAction;
  AmendDetails: PrescriptionItemAction;
  PrescriptionItem: PrescriptionItem;
}
export class IPPPrescriptionItemView extends PrescriptionItemView {
  HavingUpdationHistory: boolean;
}
export class IPPProcessingDetails extends CLZOObject {
  IsOxygen: string;
  ISBTYCode: string;
  PRNInstructions: ObservableCollection<ObjectInfo>;
  StrengthText: ObservableCollection<string>;
}
export class DRCConfigData extends CLZOObject {
  OID: number;
  DRCType: string;
  DRCTypeDesc: string;
  DRCSubType: string;
  DRCSubTypeDesc: string;
  BehaviourType: string;
  BehaviourTypeDesc: string;
  IsDisplayDRCConflict: string;
  DisplaySeqNumber: number;
  IsOpenDRCTab: string;
}
export class DRCObject extends CLZOObject {
  DOB: DateTime;
  RouteOID: number;
  RouteName: string;
  RouteLZoID: string;
  BaseRouteLZoID: string;
  FormLZOID: string;
  Strengthtext: string;
  IdentifyingType: string;
  SourceDataProviderID: number;
  IdentifyingOID: number;
  LorenzoID: string;
  IdentifyingName: string;
  PatientWeight: number;
  PatientHeight: number;
  PatientBSA: number;
  PatientAgeInDays: number;
  IndicationName: string;
  Dose: number;
  UpperDose: number;
  DoseUOM: DRCUOM;
  FreqHighevent: number;
  FreqLowevent: number;
  FreqLowperiod: number;
  FreqHighperiod: number;
  Frequency: string;
  MCVersionNo: string;
  ProductStrenghtUOM: DRCUOM;
  FrequencyLZOID: string;
  FrequencyBaseUoMMultiplier: number;
  FrequencyUOMLZOID: string;
  FrequencyOID: number;
  PrescribeLowDose: number;
  PrescribeLowDoseUONName: string;
  DosageFormText: string;
  PatAgeUnitFormat: string;
  PrescribeHighDose: number;
  PrescribeDosetype: string;
  PERODCode: string;
  NoofeventPerday: number;
  IsEstimatedDOB: boolean;
  IsEstimatedWeight: boolean;
  IsEstimatedHeight: boolean;
  PatientWeightRecordedOn: string;
  BSAFormula: string;
  PatientHeightRecordedOn: string;
  AsRequired: boolean;
  DRCDoseType: ObjectInfo;
  IsStrengthMandatory: boolean;
  AMCatalogueItemLZOID: string;
  IsTimeBaseDoseUOM: boolean;
  Indication: ObservableCollection<string>;
  DRCMultipleDoseValues: ObservableCollection<DRCMultipleDoseValue>;
  ChangingDose: ObservableCollection<string>;
  PresChangingDose: ObservableCollection<string>;
}
export class DRCUOM {
  Text: string;
  Value: string;
  LorenzoID: string;
  Compnent1LZOID: string;
  Compnent1_Name: string;
  Compnent2LZOID: string;
  Compnent2_Name: string;
  Compnent3LZOID: string;
  Compnent3_Name: string;
  BaseUomlorenzoID: string;
  BaseUomMultiplier: number;
  BaseUomName: string;
}
export class DRCMultipleDoseValue {
  LowDose: number = 0;
  HighDose: number = 0;
  PrescribeLowDose: number;
  PrescribeHighDose: number;
  PrescribeLowDoseUONName: string;
  DoseUOM: DRCUOM;
  FrequencyLZOID: string;
  FrequencyBaseUoMMultiplier: number;
  FrequencyUOMLZOID: string;
  FrequencyOID: number;
  FreqHighevent: number;
  FreqLowevent: number;
  FreqLowperiod: number;
  FreqHighperiod: number;
  Frequency: string;
  ChangingDose: ObservableCollection<string>;
}
export class TitratedDose extends CLZOObject {
  TitratedAdminInstruction: string;
  TitratedComments: string;
  IsHavingAdminTime: string;
  ScheduleDoseUOM: string;
  TitratedScheduledDetails: ObservableCollection<TitrateScheduled>;
}
export class TitrateScheduled extends CLZOObject {
  ScheduleDTTM: DateTime;
  TitratedDose: string;
  TitratedDoseUOM: string;
}
export class MedRequestDetail extends CLZOObject {
  oPrescriptionItemView: PrescriptionItemView;
  LastRequestedBy: string;
  LastRequestedDateTime: DateTime;
  LastTechValBy: string;
  LastTechValDateTime: DateTime;
  SupplyStutus: string;
  SupplyInstructions: string;
  SupplyComments: string;
  NextSupplyDTTM: DateTime;
  EncounterOID: number;
  PrescriptionItemOID: number;
  FluidPrescribableItemListOID: number;
  PrescMultiCompOID: number;
  MCIDisplayOrder: number;
  IsSupplied: boolean;
  LastDispensing: string;
  IsCancelReqEnabled: boolean;
  IsLastDispensingLink: boolean;
  PresReqHistoryOID: number;
  MCVersionNumber: string;
  LorenzoID: string;
  EncounterType: string;
  PrescriptionItemStartDTTM: DateTime;
}
export class MultiRoute extends CLZOObject {
  MultiRouteId: number;
  MultiRouteName: string;
  bInfusion: string;
}
export class DoseUOMBaseDetails extends CLZOObject {
  OID: number;
  LzoID: string;
  UOMBaseLzoID: string;
  UOMMultiplier: string;
}
export class IngredientAdminParams extends CLZOObject {
  MedChartOID: number;
  PatientOID: number;
  IngredientLorenzoID: string;
  DuenessWindowTimeMinutes: number;
  EncounterOID: number;
  RangeStartDttm: DateTime;
  RangeEndDttm: DateTime;
  SlotOID: number;
}
export class PatHomeLeaveInfo extends CLZOObject {
  StartDTTM: DateTime;
  EndDTTM: DateTime;
}
export class IPPPresItemOmittedInfo extends CLZOObject {
  GroupSequenceNo: number;
  ItemSequenceNo: number;
  OmittedPresItemOID: number;
}
export class Medication extends CLZOObject {
  PatientPrescription: Prescription;
  PrintDispensingInstruction: string;
  PrintDispensingcomments: string;
  IsPresLvlDispense: string;
  IsAutoSaveGPCForClerkMed: boolean;
  EncounterType: string;
  CACode: string;
  IgnoreIfRequestExists: boolean;
  PresItemPatientAddnDetail: PresItemPatientAddnDetail;
  CancelledDrugs: ObservableCollection<DeletedItemsInfo>;
  BackedOutDrugs: ObservableCollection<PrescriptionItemInputData>;
  ReconciledDrugs: ObservableCollection<ReconciledItems>;
  TechnicalValidation: ObservableCollection<TechnicalValidationInfo>;
}
export class DeletedItemsInfo extends CLZOObject {
  PrescriptionItemData: PrescriptionItemInputData;
  DeletedInfo: PrescriptionItemAction;
  IsPatMerged: string;
}
export class PrescriptionItemInputData extends CLZOObject {
  OID: number;
  PatientOID: number;
  ExpirationDuration: number;
  PrescriptionType: string;
  PrescriptionItemStatus: string;
  PrescriptionOID: number;
  EncounterOID: number;
  MCVesrionNo: string;
  ActiveMCVersion: string;
  PrescriptionNumber: string;
  Activity: string;
  InfusionSeqOrder: number;
  ParentPrescriptionItemOID: number;
  DiscontinouscancelSequential: boolean;
  CACode: string;
  ClerkformViewerDefltCode: string;
  ReviewOutcomeComments: string;
  IsPresItemStatusComplete: string;
  OrganizationOID: number;
  InfusionGroupSequenceNo: number;
  IsInfusionInProgress: boolean;
  PatientAllergyOID: ObservableCollection<string>;
}
export class ReconciledItems extends CLZOObject {
  PrescriptionItemOID: number;
  ReconciledStatus: PrescriptionItemAction;
  EncounterOID: number;
  PrescriptionOID: number;
  IsMerged: string;
  MCVersionNo: string;
  prescriptiontype: string;
}
export class PresItemPatientAddnDetail extends CLZOObject {
  PatientOID: number;
  EncounterOID: number;
  RecordedByUserOID: number;
  RecordedDTTM: DateTime;
  ACTONCode: string;
  CareActivityCode: string;
  PrescriptionItemOIDs: string;
}
export class PresItemAuditHistoryInfo extends CLZOObject {
  PrescriptionItemOid: number;
  ModificationIncidents: ObservableCollection<PresItemAuditHistoryIncident>;
}
export class PresItemAuditHistoryIncident extends CLZOObject {
  HistoryOid: number;
  ReasonForModification: string;
  ModificationComments: string;
  ModifiedBy: string;
  ModifiedAt: DateTime;
  AuditChanges: ObservableCollection<PresItemAuditHistory>;
}
export class MedicationViewData extends CLZOObject {
  IsMedClrk: string;
  AdhocMCIdentifyingoid: number;
  AdhocMCILorenzoid: string;
  AdhocMCIdentifyingname: string;
  ReviewPeriodAlertItems: string;
  CompletedStatus: string;
  MaxGrpSeqNo: number;
  ClinicalEncouterOIDCollection: string;
  TeamOIDs: string;
  TeamNames: string;
}
export class DrugAdminStatus extends CLZOObject {
  OID: number;
  IsAdministered: boolean;
  InProgScheduleDate: DateTime;
}
export class Ingredient extends CLZOObject {
  IngredientID: number;
  Name: string;
  Type: string;
  ActiveFrom: DateTime;
  ActiveTo: DateTime;
  InActiveFrom: DateTime;
  InActiveTo: DateTime;
  ExpiryReason: string;
  IngredientStatus: string;
  Status: string;
  Version: string;
  IngStatusHistory: StatusHistory;
  OrganisationOID: number;
  ReinstateReason: string;
  ReinstateDate: DateTime;
  SourceDataProviderType: string;
  SourceDataProviderID: string;
  LorenzoID: string;
  MCVersion: string;
  BaseIngredientName: string;
  BaseIngredientOID: number;
  Coding: ObservableCollection<Codification>;
}
export class Codification extends CLZOObject {
  OID: number;
  CodingschemeCode: string;
  CodingScheme: string;
  Version: string;
  Code: string;
  VersionValue: string;
  Description: string;
  CodeTerm: string;
  TermKey: string;
  ConceptCode: string;
  abnormalindicator: string;
  OwnerOrganisationOID: number;
  SNOMEDAssocTypeCode: string;
  SNOMEDAssocType: string;
}
export class CResMedicationitemsadded extends Ingredient {
  Term: string;
}
export class DecisionSupportBasicCriteria extends CLZOObject {
  DrugItem: DrugBasicData;
  StartDate: DateTime;
  EndDate: DateTime;
  RowID: string;
  IsMultiComponent: boolean;
  PrescriptionDTTM: DateTime;
  MCVersionNo: string;
  PrescriptionType: string;
  OrdersetOID: number;
  IsAmend: string;
}
export class DrugBasicData extends CLZOObject {
  p: string;
  q: string;
  r: string;
  s: string;
  t: string;
  y: string;
  z: boolean;
  IdentifyingOID: number;
  IdentifyingType: string;
  IdentifyingName: string;
  PrescribableItemListOID: number;
  MCVersionNo: string;
  IsAccessContraint: string;
  IsPrescribeByBrand: string;
  FormularyNote: string;
  ItemType: string;
  RouteOID: number;
  FormOID: number;
  IsTechValidateCA: string;
  LorenzoID: string;
  NonCatItemReason: string;
  TechQtyUomName: string;
  IsControllDrug: string;
  ITMSUBTYP: string;
  SourceDataProviderType: string;
  AliasName: string;
  PrescriptionItemId: string;
  ConflictUniqueId: string;
  bIsReplacement: boolean;
  MCIItem: string;
  UniqueMCRowID: number;
  FluidIdentifyingOID: number;
  FluidPrescribableItemListOID: number;
  FluidItemType: string;
  FluidLorenzoID: string;
  FluidIdentifyingname: string;
  IsMandatoryForOthers: boolean;
  PrescriptionItemNumber: number;
  IsConflictDisabled: boolean;
  GenericDrugLorenzoID: string;
  Basedrugname: string;
}
export class PrescriptionItemCriteria extends CLZOObject {
  PatientOID: number;
  EncounterOID: number;
  Code: string;
  OID: ObservableCollection<number>;
  NotRConciled: ObservableCollection<number>;
}
export class Dose extends CLZOObject {
  DoseType: string;
  ObservationResultCode: string;
  DoseDetails: ObservableCollection<DoseDetails>;
}
export class IPPREsolvedetail extends CLZOObject {
  oPGDListDetail: PGDListDetail;
  IsAllowMultipleRoute: boolean;
  IsCondDoseMonitoringPeriodReq: string;
  IsOxygen: string;
  ReviewAfter: string;
  ReviewAfterUOM: ObjectInfo;
  IsReviewafterReq: boolean;
  ISBTYCode: string;
  DoseCapDetail: DoseCapDetail;
  oDoseCalcInfo: DoseFormula;
  IsIgnoreAdminMethod: boolean;
  PrescribingNote: string;
  IsAuthorise: boolean;
  Route: ObservableCollection<Route>;
  AdminInstruction: ObservableCollection<ObjectInfo>;
  SuppyInstruction: ObservableCollection<string>;
  StationeryType: ObservableCollection<string>;
  StatType: ObservableCollection<Stationary>;
  Dose: ObservableCollection<Dose>;
  Quantity: ObservableCollection<Quantity>;
  Adminmethod: ObservableCollection<AdminMethod>;
  Form: ObservableCollection<Form>;
  oInfusionFluidDetails: ObservableCollection<InfusionFluidDetails>;
  ConcentrationDoseUOM: ObservableCollection<UOM>;
  PRNInstructions: ObservableCollection<ObjectInfo>;
  objFrequencyDetails: ObservableCollection<ObjectInfo>;
  WarningMessage: ObservableCollection<string>;
  VolumeUOM: ObservableCollection<UOM>;
  InfusionPeriodUOM: ObservableCollection<UOM>;
  RateDenaminatorUOM: ObservableCollection<UOM>;
  RateDenaminatorUOMO: ObservableCollection<UOM>;
  MultiComponentDetails: ObservableCollection<IPPMCPresctiptionItem>;
  InfusionFluid: ObservableCollection<ObjectInfo>;
  Indication: ObservableCollection<Indication>;
  MultiRoute: ObservableCollection<Route>;
  DRCDefDoseTypeLorenzoIDs: ObservableCollection<ObjectInfo>;
  objDoseCalciUOMs: ObservableCollection<ObjectInfo>;
  IntervalInstalmentsUoM: ObservableCollection<UOM>;
}
export class PGDListDetail extends CLZOObject {
  OID: number;
  PrescribableItem: ObjectInfo;
  DoseType: ObjectInfo;
  DoseValue: number;
  DoseUOM: ObjectInfo;
  Route: ObjectInfo;
  Frequnecy: ObjectInfo;
  DosageForm: ObjectInfo;
  Comments: string;
  LorenzoOID: string;
  IsParacetamolIngredient: boolean;
  ItemSubType: string;
  PresListItemOID: number;
  AdminMethod: ObjectInfo;
  UpperDose: number;
  DisplayNumber: number;
  IsAuthorise: boolean;
  MaxNoOfAdministration: number;
  PGDAdministrationCount: number;
  PGDLorenzoID: string;
  InfusionRate: string;
  IsBolus: string;
  InfusionRateNumUOM: ObjectInfo;
  InfusionRateDenoUOM: ObjectInfo;
  IsInfusion: boolean;
  IsControlledDrug: string;
  PGDListDetailOID: number;
  IngredientWarning: ObservableCollection<string>;
}
export class InfusionFluidDetails extends CLZOObject {
  IdentifyingOID: number;
  IdentifyingType: string;
  IdentifyingName: string;
  LorenzoID: string;
  IsInfusionFluid: string;
  FluidItemIdfyngOID: number;
}
export class DoseCapDetail extends CLZOObject {
  RouteOID: number;
  RouteName: string;
  RouteLzoID: string;
  MinDoseCap: string;
  MaxDoseCap: string;
  DoseCapUOMName: string;
  DoseCapUOMLzoID: string;
}
export class MedicationConflictConfig extends CLZOObject {
  DisplayConflicts: string;
  OID: number;
  IsReadOnly: string;
  ModifiedAt: DateTime;
  TurnOnDRC: string;
  oMedicationConflictConfigData: ObservableCollection<MedConflictConfigData>;
  oDRCConfigData: ObservableCollection<DRCConfigData>;
}
export class MedConflictConfigData extends CLZOObject {
  OID: number;
  ConflictType: string;
  ConflictSubType: string;
  BehaviourType: string;
  TypeColorCode: string;
  DisplaySeqNumber: number;
  ModifiedAt: DateTime;
  WarningCatLZOID: string;
}
export class CommonSearchCriteria extends CLZOObject {
  DateQualifier: string;
  FromDate: DateTime;
  ToDate: DateTime;
  Period: number;
  PatientOID: number;
  PeriodUOM: string;
  GroupKey: string;
  GroupByValue: string;
  ProfileExpiryDuration: number;
  CustomFlag: string;
}
export class PrescriptionSearchCriteria extends CommonSearchCriteria {
  PrescriptionType: string;
  EncounterType: string;
  PrescriptionNumber: string;
  TechnicallyValidatedStatus: string;
  TechnicallyValidatedUserOID: number;
  ExcludeSearch: string;
  PrescriptionStatus: string;
  SortBy: string;
  PrescriptionHOOIDs: string;
  DUCode: string;
  StockRequistion: string;
  MCIPrescriptions: boolean;
  PrepStatus: string;
  MedicationRequest: string;
  RequestUrgencyCode: string;
  CompletedStatus: string;
  MedDueForSupply: string;
  IsCriticalMedication: string;
  JobRoleOID: number;
  UserOID: number;
  PrescriberOIDs: ObservableCollection<number>;
  CareProviderOIDs: ObservableCollection<number>;
  ServicePointOIDs: ObservableCollection<number>;
  LocationOIDs: ObservableCollection<number>;
}
export class DecisionSupportCriteria extends CLZOObject {
  CACode: CACode;
  FromCA: string;
  PatientOID: number;
  PatientDOB: string;
  PatientSex: string;
  DrugExpiryDuration: number;
  AgeInYears: number;
  CheckMandatory: boolean;
  MCVersionNo: string;
  IsAllergenCheckNeed: boolean;
  RoleprofileId: number;
  UserOid: number;
  IsBreak: string;
  AddedMedication: ObservableCollection<DecisionSupportBasicCriteria>;
  CurrentMedication: ObservableCollection<DecisionSupportBasicCriteria>;
}
export enum CACode {
  HealthIssues,
  Prescribe,
  PGD,
}
export class WarningItems extends CLZOObject {
  RowID: string;
  DrugItem: DrugBasicData;
  DrugInteraction: ObservableCollection<WarningDetails>;
  DrugDoubling: ObservableCollection<WarningDetails>;
  DrugAllergy: ObservableCollection<WarningDetails>;
  DrugMandatory: ObservableCollection<WarningDetails>;
  DrugContraIndication: ObservableCollection<WarningDetails>;
  DrugCrossReaction: ObservableCollection<WarningDetails>;
  DrugAllergenNotIncluded: ObservableCollection<WarningDetails>;
  SealingDetails: ObservableCollection<SealingDetails>;
}
export class SealingDetails extends CLZOObject {
  IdentifyingCode: string;
  IdentifyingType: string;
}
export class CResMsgGetWardStockPresItemsDetails {
  IsWardStock: boolean;
  oContextInformation: CContextInformation;
  arrWSPresItemDetails: ObservableCollection<WardStockPresItemDetails>;
}
export class CReqMsgGetDispensinginstDetails {
  EncounterOIDBC: number;
  oContextInformation: CContextInformation;
}
export class CResMsgGetDispensinginstDetails {
  oContextInformation: CContextInformation;
  arrDispensinginstructionhistory: ObservableCollection<Dispensinginstructionhistory>;
}
export class CReqMsgGetRequisitionHistoryDetails {
  lnPatientoidBC: number;
  lnEncounteroidBC: number;
  lnFluidPrescribableItemListOIDBC: number;
  lnPrescriptionMultiComponentOIDBC: number;
  PrescriptionItemOIDBC: number;
  sLorenzoIDBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetRequisitionHistoryDetails {
  oContextInformation: CContextInformation;
  arrRequisitionHistoryDetails: ObservableCollection<RequisitionHistoryDetails>;
}
export class CReqMsgGetSupplyHistoryDetails {
  lnPatientoidBC: number;
  lnEncounteroidBC: number;
  IsMCICompBC: boolean;
  IsCallForFluidBC: boolean;
  IsCallFromCABC: boolean;
  PrescriptionItemOIDBC: number;
  PrescriptionItemOIDForMedDispDtlBC: number;
  sLorenzoIDBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetSupplyHistoryDetails {
  oContextInformation: CContextInformation;
  arrSupplyHistoryDetails: ObservableCollection<SupplyHistoryDetails>;
  oMedDispensingDetail: MedDispensingDetail[];
}
export class CReqMsgGetSupplyDispenseDetail {
  lnPatientoidBC: number;
  PrescriptionItemOIDsBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetSupplyDispenseDetail {
  oContextInformation: CContextInformation;
  oMedDispensingDetail: ObservableCollection<MedDispensingDetail>;
}
export class CReqMsgGetClinicalVerificationDetails {
  objIpBC: ClinicalVerificationHistoryIP;
  oContextInformation: CContextInformation;
}
export class CResMsgGetClinicalVerificationDetails {
  oContextInformation: CContextInformation;
  objOP: ObservableCollection<ClinicalVerificationHistoryOp>;
}
export class CReqMsgGetOnBehalfOfDetails {
  objIbBC: OnBehalfDetailsIp;
  oContextInformation: CContextInformation;
}
export class CResMsgGetOnBehalfOfDetails {
  oContextInformation: CContextInformation;
  objOB: ObservableCollection<OnBehalfDetailsOp>;
}
export class CReqMsgUpdateIsSupplyAlertShown {
  PrescriptionOIDBC: number;
  IsSupplyAlertShownBC: boolean;
  oContextInformation: CContextInformation;
}
export class CResMsgUpdateIsSupplyAlertShown {
  oContextInformation: CContextInformation;
}
export class CReqMsgSubmitTechValidationItems {
  oDispensinginstructionhistoryBC: Dispensinginstructionhistory;
  oContextInformation: CContextInformation;
  oTechnicalValidationInfoBC: ObservableCollection<TechnicalValidationInfo>;
}
export class CResMsgSubmitTechValidationItems {
  oContextInformation: CContextInformation;
}
export class CReqMsgSubmitSupplyItems {
  oDispensinginstructionhistoryBC: Dispensinginstructionhistory;
  oContextInformation: CContextInformation;
  oTechnicalValidationInfoBC: ObservableCollection<TechnicalValidationInfo>;
}
export class CResMsgSubmitSupplyItems {
  oContextInformation: CContextInformation;
}
export class CReqMsgGetIPPPrescriptionItems {
  PrescriptionOIDBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetIPPPrescriptionItems {
  oContextInformation: CContextInformation;
  ItemDetail: ObservableCollection<PrescriptionResponse>;
}
export class CReqMsgGetPrescriptionItembyEncounter {
  EncounteroidBC: string;
  sprestypeBC: string;
  stationeryoidBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetPrescriptionItembyEncounter {
  oContextInformation: CContextInformation;
  ItemDetail: ObservableCollection<PrescriptionResponse>;
}
export class CReqMsgGetAdhocMciRule {
  objFormViewParamsBC: IPPFormViewParams;
  ItemlistBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetAdhocMciRule {
  objDefaults: IPPFormViewDafults;
  isMCbrand: string;
  Brandflag: boolean;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetMciProductRule {
  objFormViewParamsBC: IPPFormViewParams;
  oContextInformation: CContextInformation;
}
export class CResMsgGetMciProductRule {
  isMCbrand: string;
  Brandflag: boolean;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetIPPTechnicalDetails {
  IdentifyOIDTypeBC: Identifyingdetails;
  oContextInformation: CContextInformation;
}
export class CResMsgGetIPPTechnicalDetails {
  oContextInformation: CContextInformation;
  oTechnicalValidationInfo: ObservableCollection<TechnicalValidationInfo>;
}
export class CReqMsgGetIPPProcessingOptionIndications {
  oDrugItemBasicDataBC: DrugItemBasicData;
  oContextInformation: CContextInformation;
}
export class CResMsgGetIPPProcessingOptionIndications {
  oContextInformation: CContextInformation;
  oProcessingOptionIndications: ObservableCollection<Indication>;
}
export class CReqMsgIsDeactivatedAttributeExists {
  oIPPReqDeactAttributesBC: IPPReqDeactAttributes;
  oContextInformation: CContextInformation;
}
export class CResMsgIsDeactivatedAttributeExists {
  oIPPResDeactAttributes: IPPResDeactAttributes;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetIPPMAMedicationFavouritesGroupItemsList {
  FavGroupOIdBC: number;
  sTeamOIDsBC: string;
  MCVersionBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetIPPMAMedicationFavouritesGroupItemsList {
  oFavouriteItem: FavouriteItem;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetIPPMAOrderSetItemsList {
  sTeamOIDsBC: string;
  MCVersionBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetIPPMAOrderSetItemsList {
  oFavouriteItem: FavouriteItem;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetIPPMAOrderSetAssociatedItemsList {
  OrderSetOIDBC: number;
  PatientOIDBC: number;
  OrderSetLZOIDBC: string;
  sTeamOIDsBC: string;
  MCVersionBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetIPPMAOrderSetAssociatedItemsList {
  ORSAssociatedItem: OrderSetAssociatedItems;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetOrderSetStatus {
  OrderSetOIDBC: number;
  MCVersionBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetOrderSetStatus {
  Status: string;
  oContextInformation: CContextInformation;
}
export class CReqMsgUpdateRvwAlertShownForItem {
  PrescriptionItemOIDsBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgUpdateRvwAlertShownForItem {
  oContextInformation: CContextInformation;
}
export class CReqMsgGetSelectProduct {
  oSelectProductBC: BrandInputData;
  oContextInformation: CContextInformation;
}
export class CResMsgGetSelectProduct {
  oContextInformation: CContextInformation;
  oDrugs: ObservableCollection<DrugItemBasicInfo>;
}
export class CReqMsgGetPackDetByEANCode {
  oMatchEANCODESearchBC: MatchEANCODESearch;
  oContextInformation: CContextInformation;
}
export class CResMsgGetPackDetByEANCode {
  oPackSizeForEANCODE: PackSizeForEANCODE;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetPatientMedDisContItems {
  oMedicationListCriteriaBC: MedicationListCriteria;
  oContextInformation: CContextInformation;
}
export class CResMsgGetPatientMedDisContItems {
  oContextInformation: CContextInformation;
  oPrescriptionItemView: ObservableCollection<PrescriptionItemView>;
}
export class CReqMsgGetClinicalEncountersDetail {
  lnPatientOIDBC: number;
  lnEncounterOIDBC: number;
  lnOrgOIDBC: number;
  oContextInformation: CContextInformation;
}
export class CResMsgGetClinicalEncountersDetail {
  sClinicalEncDet: string;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetPrescriptionPrintStatus {
  PrescriptionTypeBC: string;
  EncounterOIDBC: number;
  PatientOIDBC: number;
  oContextInformation: CContextInformation;
}
export class CResMsgGetPrescriptionPrintStatus {
  printStatus: string;
  PresDetails: string;
  StationeryDet: string;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetSysFormViewerDefaultValues {
  IdentifyingOIDBC: number;
  IdentifyingTypeBC: string;
  sMcVersionNoBC: string;
  routeoidBC: number;
  dosagefromoidBC: number;
  sMultiCompDetailsBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetSysFormViewerDefaultValues {
  oProcessingInfo: ProcessingInfo;
  oIPPProcessingDetails: IPPProcessingDetails;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetSysFormViewerSpecificDefaultValues {
  objFormViewParamsBC: IPPFormViewParams;
  oContextInformation: CContextInformation;
}
export class CResMsgGetSysFormViewerSpecificDefaultValues {
  objDefaults: IPPFormViewDafults;
  oContextInformation: CContextInformation;
}
export class CReqMsgInvokeDRCConflict {
  oDRCObjectBC: DRCObject;
  oContextInformation: CContextInformation;
  oDRCConfigBC: ObservableCollection<DRCConfigData>;
}
export class CResMsgInvokeDRCConflict {
  oContextInformation: CContextInformation;
  oDRCConflicts: ObservableCollection<DRCConflicts>;
}
export class DRCConflicts {
  DRCDoseType: string;
  DRCDoseTypeCode: string;
  DRCErrorTittle: string;
  ActualDRCDoseTypeCode: string;
  DRCError: ObservableCollection<DRCError>;
}
export class DRCError {
  DRCErrorType: string;
  DRCOtherErrorType: string;
  DRCErrorMsg: string;
  DRCOutcome: string;
  DRCErrorCode: string;
  PresChangDoseIndx: string;
}
export class CReqMsgGetDRCConflicts {
  PrescriptionItemOIDBC: number;
  PatientOIDBC: number;
  oContextInformation: CContextInformation;
}
export class CResMsgGetDRCConflicts {
  oContextInformation: CContextInformation;
  oDRCConflict: ObservableCollection<DRCConflict>;
}
export class CReqMsgGetUnresolvedConflicts {
  PatientOIDBC: number;
  oContextInformation: CContextInformation;
}
export class CResMsgGetUnresolvedConflicts {
  oContextInformation: CContextInformation;
  oWarningDetails: ObservableCollection<WarningDetails>;
}
export class CReqMsgIsUnresolvedConflictsExist {
  PatientOIDBC: number;
  oContextInformation: CContextInformation;
}
export class CResMsgIsUnresolvedConflictsExist {
  bIsConclictsExist: boolean;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetLeastDCalDTTM {
  PatientOIDBC: number;
  EncounterOIDBC: number;
  PresTypeBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetLeastDCalDTTM {
  LatAckOrPrescribedDTTM: DateTime;
  EncounterStatus: string;
  oContextInformation: CContextInformation;
}
export class CReqMsgUpdatePresItemConflicts {
  PatientOIDBC: number;
  oContextInformation: CContextInformation;
  oWarningDetailsBC: ObservableCollection<WarningDetails>;
}
export class CResMsgUpdatePresItemConflicts {
  oContextInformation: CContextInformation;
}
export class CReqMsgGetTitratedDoseScheduleInfo {
  PrescriptionItemOIDBC: number;
  oContextInformation: CContextInformation;
}
export class CResMsgGetTitratedDoseScheduleInfo {
  oTitratedDose: TitratedDose;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetRequestMedicationDetails {
  oMedicationListCriteriaBC: MedicationListCriteria;
  oContextInformation: CContextInformation;
}
export class CResMsgGetRequestMedicationDetails {
  MaxGrpSeqNo: number;
  oContextInformation: CContextInformation;
  oMedRequestDetail: ObservableCollection<MedRequestDetail>;
  oMedDispensingDetail: ObservableCollection<MedDispensingDetail>;
}
export class CReqMsgGetMultiRoutes {
  IdentifyingOIdBC: number;
  IdentifyingTypeBC: string;
  MCVersionBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetMultiRoutes {
  oContextInformation: CContextInformation;
  objmultiRoutes: ObservableCollection<MultiRoute>;
}
export class CReqMsgGetReviewHistory {
  lnPatientoidBC: number;
  IsCurrentRequiredBC: boolean;
  lnPrescriptionItemOIDBC: number;
  oContextInformation: CContextInformation;
}
export class CResMsgGetReviewHistory {
  IsReviewMandatory: boolean;
  IsReviewPeriodAvailable: string;
  IsReviewUOMCodeAvailable: ObjectInfo;
  oContextInformation: CContextInformation;
  ReviewAfterDetails: ObservableCollection<ReviewAfterDetail>;
}
export class CReqMsgGetScheduleTimeAndFreq {
  PrescriptionStartDateBC: DateTime;
  PrescriptionEndDateBC: DateTime;
  PatientOIDBC: number;
  PrescriptionItemOIDBC: number;
  oContextInformation: CContextInformation;
}
export class CResMsgGetScheduleTimeAndFreq {
  freq: IPPFrequency;
  oContextInformation: CContextInformation;
  lstscheduletimes: ObservableCollection<IPPScheduledetails>;
}
export class CReqMsgManageReviewAfterPeriod {
  lnPatientoidBC: number;
  objManageReviewPeriodBC: ManageReviewPeriod;
  oContextInformation: CContextInformation;
}
export class CResMsgManageReviewAfterPeriod {
  oContextInformation: CContextInformation;
}
export class CReqMsgGetDoseUOMDetails {
  firstDoseUOMOIDBC: number;
  secondDoseUOMOIDBC: number;
  mcVersionBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetDoseUOMDetails {
  oContextInformation: CContextInformation;
  doseUOMDetails: ObservableCollection<DoseUOMBaseDetails>;
}
export class CReqMsgUpdateDueOverStatusForClinicalIndicator {
  oCMedInClinicalIndicParamsBC: CMedStatusInClinicalIndicatorParams;
  oContextInformation: CContextInformation;
}
export class CMedStatusInClinicalIndicatorParams {
  PatientOID: number;
  EncounterOID: number;
}
export class CResMsgUpdateDueOverStatusForClinicalIndicator {
  IsUpdatedStatus: boolean;
  oContextInformation: CContextInformation;
}
export class CReqMsgIsAnyParacetamolAdministration {
  IngAdminParamsBC: IngredientAdminParams;
  oContextInformation: CContextInformation;
}
export class CResMsgIsAnyParacetamolAdministration {
  IsAnyParacetamolAdministered: boolean;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetPatientHomeLeaveDetail {
  lnPatientOIDBC: number;
  lnEncounterOIDBC: number;
  oContextInformation: CContextInformation;
}
export class CResMsgGetPatientHomeLeaveDetail {
  oPatHomeLeaveInfo: PatHomeLeaveInfo;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetTransformConversion {
  oGPCDrugConRequestBC: CGPCDrugConversionRequest;
  oContextInformation: CContextInformation;
}
export class CGPCDrugConversionRequest {
  DrugSnomedCode: string;
  FormSnomedCode: string;
  MCVersionNo: string;
  IsTransformGPConRequired: number;
  CurrentDTTM: DateTime;
}
export class CResMsgGetTransformConversion {
  oCGPCDrugConResult: DrugItemBasicInfo;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetNonIVSubseqentItemsReqDataForSequence {
  sMcVersionNoBC: string;
  oContextInformation: CContextInformation;
  objSequenceReqInpuCriteriaBC: ObservableCollection<CSequenceRequiredInputCriteria>;
}
export class CSequenceRequiredInputCriteria {
  PrescriptionItemOID: number;
  EncounterOID: number;
  FrequencyOID: number;
}
export class CResMsgGetNonIVSubseqentItemsReqDataForSequence {
  oContextInformation: CContextInformation;
  objSubsequentItemsRequiredDataForSeq: ObservableCollection<CSubsequentItemsRequiredDataForSeq>;
}
export class CSubsequentItemsRequiredDataForSeq {
  PrescriptionItemOID: number;
  oFrequency: IPPFrequency;
  oFixedTimes: ObservableCollection<IPPScheduledetails>;
  oDrugRoundTimes: ObservableCollection<IPPScheduledetails>;
}
export class CReqMsgGetMedCheckMinorClicEnctr {
  lnPatientOIDBC: number;
  lnEncounterOIDBC: number;
  lnOrgOIDBC: number;
  oContextInformation: CContextInformation;
}
export class CResMsgGetMedCheckMinorClicEnctr {
  IsMinorClinicalEncounter: boolean;
  oContextInformation: CContextInformation;
}
export class CReqMsgChkPatientTransferActivity {
  PatientOIDBC: number;
  EncounterOIDBC: number;
  MedChartOIDBC: number;
  oContextInformation: CContextInformation;
}
export class CResMsgChkPatientTransferActivity {
  bIsPatTransAct: boolean;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetWarningCategories {
  MCVersionBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetWarningCategories {
  oContextInformation: CContextInformation;
  objWarningCategories: ObservableCollection<UOM>;
}
export class CReqMsgGetOmittedItemsList {
  sPrescriptionItemOIDsBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetOmittedItemsList {
  oContextInformation: CContextInformation;
  oIPPPresItemOmittedInfo: ObservableCollection<IPPPresItemOmittedInfo>;
}
export class CReqMsgSubmitClerkMedDrugs {
  oMedicationBC: Medication;
  oContextInformation: CContextInformation;
}
export class CResMsgSubmitClerkMedDrugs {
  oContextInformation: CContextInformation;
  objPrescResponse: ObservableCollection<PrescriptionResponse>;
}
export class CReqMsgSubmitDrugs {
  oMedicationBC: Medication;
  oContextInformation: CContextInformation;
}
export class CResMsgSubmitDrugs {
  oContextInformation: CContextInformation;
  objPrescResponse: ObservableCollection<PrescriptionResponse>;
}
export class CReqMsgGetPresItemUpdateHistory {
  patientOidBC: number;
  presItemOidBC: number;
  oContextInformation: CContextInformation;
}
export class CResMsgGetPresItemUpdateHistory {
  objPrescResponse: PresItemAuditHistoryInfo;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetGPConnectAdministration {
  patientOidBC: number;
  nhsNumberBC: string;
  encounterOidBC: number;
  prescriptionTypeBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetGPConnectAdministration {
  objMedication: GPConnectMedication;
  oContextInformation: CContextInformation;
}
export class GPConnectMedication {
  ErrorFound: boolean;
  ErrorMessage: string;
  WarningNote: string;
  Administrations: ObservableCollection<GPConnectAdministration>;
  WarningCodes: ObservableCollection<string>;
}
export class GPConnectAdministration {
  GPConnectUniqueId: string;
  MedicationItemDetail: string;
  ItemTypeCode: string;
  ItemTypeDisplay: string;
  MedicationCode: string;
  IsClerked: boolean;
  LastIssued: DateTime;
  AdditionalDetail: GPConnectItemAdditionalDetail;
  IdentifierSystem: string;
  StatusDisplay: string;
  Quantity: string;
  Dosages: ObservableCollection<GPConnectAdminDosage>;
  AllIdentifiers: ObservableCollection<GpConnectIdentifier>;
}
export class GPConnectItemAdditionalDetail {
  Identifier: string;
  CareSetting: string;
  Encounter: string;
  Status: string;
  NoOfRepeatAllowed: number;
  NoOfRepeatIssued: number;
  DispensePlanned: GPConnectDispenseDetail;
  DosageLastChanged: DateTime;
  DispenseIssued: ObservableCollection<GPConnectDispenseDetail>;
}
export class GPConnectDispenseDetail {
  Quantity: string;
  StartDate: DateTime;
  EndDate: DateTime;
  DosageInstruction: string;
  StatusChangeDate: DateTime;
  StatusReason: string;
}
export class GpConnectIdentifier {
  IdentifierSystem: string;
  IdentifierValue: string;
}
export class CReqMsgGetGPConnectAdditionalDetail {
  patientOidBC: number;
  nhsNumberBC: string;
  medicationStatementIdBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetGPConnectAdditionalDetail {
  administration: GPConnectAdministration;
  oContextInformation: CContextInformation;
}
export class CReqMsgCancelDrugs {
  oMedicationBC: Medication;
  oContextInformation: CContextInformation;
}
export class CResMsgCancelDrugs {
  oContextInformation: CContextInformation;
  objPrescResponse: ObservableCollection<PrescriptionResponse>;
}
export class CReqMsgAuthoriseDrugs {
  objPatientInfoBC: GeneralInfo;
  oDispensinginstructionhistoryBC: Dispensinginstructionhistory;
  oContextInformation: CContextInformation;
  AuthorisedItemsBC: ObservableCollection<PrescriptionItemDetails>;
  UnAuthorisedItemsBC: ObservableCollection<PrescriptionItemDetails>;
  DeleteDrugsBC: ObservableCollection<DeletedItemsInfo>;
  ReconciledDrugsBC: ObservableCollection<ReconciledItems>;
  TechnicalValidateBC: ObservableCollection<TechnicalValidationInfo>;
  objPrescriptionResBC: ObservableCollection<PrescriptionResponse>;
}
export class GeneralInfo {
  IsMergedPatient: string;
  EncounterOID: number;
  PatientOID: number;
  oCancelDisRateAlertShown: CancelDisRateAlertShown;
  EncounterType: string;
  PrescriptionType: string;
  CACode: string;
  IgnoreIfRequestExists: boolean;
  PresItemPatientAddnDetail: PresItemPatientAddnDetail;
}
export class CancelDisRateAlertShown {
  IsRateAlertShown: boolean;
  PrescriptionOID: number;
  PatientOID: number;
  PrescriptionOIDList: string;
}
export class CResMsgAuthoriseDrugs {
  PrescriptionODS: string;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetAdministrationTimes {
  lnFrequencyOIDBC: number;
  lnEncounterOIDBC: number;
  PrescriptionItemOIDBC: number;
  sMCVersionBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetAdministrationTimes {
  oFrequency: IPPFrequency;
  oContextInformation: CContextInformation;
  oFixedTimes: ObservableCollection<IPPScheduledetails>;
  oDrugRoundTimes: ObservableCollection<IPPScheduledetails>;
}
export class CReqMsgIsPreviousDueOverdueSlotExists {
  PrescriptionItemOIDBC: number;
  PatientOIDBC: number;
  DuenessThresholdInMinsBC: number;
  OverDueThresholdInHrsBC: number;
  bPastDueSlotsOnlyBC: boolean;
  bChkOverdueExistsBC: boolean;
  oContextInformation: CContextInformation;
}
export class CResMsgIsPreviousDueOverdueSlotExists {
  IsSlotExists: number;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetPatientMedicationList {
  oMedicationListCriteriaBC: MedicationListCriteria;
  oContextInformation: CContextInformation;
}
export class CResMsgGetPatientMedicationList {
  oViewData: MedicationViewData;
  oContextInformation: CContextInformation;
  oPrescriptionItemView: ObservableCollection<PrescriptionItemView>;
}
export class CReqMsgGetSequencePrescriptionItemStatus {
  oMedicationListCriteriaBC: SequentialItemCriteria;
  oContextInformation: CContextInformation;
}
export class SequentialItemCriteria {
  PatientOid: number;
  OrganizationOid: number;
  SequentialInfusionData: ObservableCollection<PartialSequentialData>;
}
export class PartialSequentialData {
  PrescriptionItemOid: number;
  StatusCode: string;
  InfusionStartDate: DateTime;
  PresItemStartDTTM: DateTime;
  AdministeredDate: DateTime;
  InfusionPeriod: number;
  InfusionPeriodLorenzoID: string;
  PlannedInfusionVolume: string;
  PlannedInfusionVolumeOID: number;
  PrescribedVolumeLorenzoID: string;
  InfusionRate: string;
  InfusionRateLorenzoId: string;
  InfusionRatePerLorenzoId: string;
  IsNewFromModified: boolean;
  SourceStatus: string;
  SlotStatusCode: string;
  ScheduledDTTM: DateTime;
  PresItemENDTTM: DateTime;
}
export class CResMsgGetSequencePrescriptionItemStatus {
  oContextInformation: CContextInformation;
  oPrescriptionItemView: SequentialPresriptionItem[];
}
export class SequentialPresriptionItem {
  PresriptionItemOid: number;
  StartDateTime: DateTime;
  IsEstimated: boolean;
  Status: string;
}
export class CReqMsgGetIPPPatientMedicationCount {
  PatientOIDBC: number;
  EncounterOIDBC: number;
  PrescriptionTypeBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetIPPPatientMedicationCount {
  bIsExist: boolean;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetDrugDetails {
  PrescriptionItemOIDBC: number;
  IsBreakBC: string;
  serviceoidBC: number;
  locationoidBC: number;
  PresIdentifyingTypeBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetDrugDetails {
  oContextInformation: CContextInformation;
  oPrescriptionItemView: ObservableCollection<IPPPrescriptionItemView>;
}
export class CReqMsgGetAdditionalDetails {
  PrescriptionItemOIDBC: number;
  oContextInformation: CContextInformation;
}
export class CResMsgGetAdditionalDetails {
  oPrescriptionItemView: IPPPrescriptionItemView;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetSupDispInstDetails {
  PrescriptionItemOIDBC: number;
  oContextInformation: CContextInformation;
}
export class CResMsgGetSupDispInstDetails {
  oContextInformation: CContextInformation;
  oIPPSupDispInstView: ObservableCollection<IPPSupDispInstView>;
}
export class IPPSupDispInstView {
  PresItemOID: number;
  PresItemChildOID: number;
  ComponentName: string;
  SupplyInstruction: string;
  DispensingInst: string;
  DispensingComments: string;
  DispensingInstruction: ObservableCollection<ObjectInfo>;
}
export class CReqMsgGetIPPPrescriptionDetails {
  oPrescriptionItemInputDataBC: PrescriptionItemInputData;
  oContextInformation: CContextInformation;
}
export class CResMsgGetIPPPrescriptionDetails {
  oPresItemSourceProcDetail: PrescriptionItemDetails;
  oContextInformation: CContextInformation;
  oPrescriptionItemDetails: ObservableCollection<PrescriptionItemDetails>;
}
export class CReqMsgDummyMethod {
  oFrequencyDetailsBC: IPPFrequencyDetails;
  oIPPPresItemBasicPropertiesBC: IPPPresItemBasicProperties;
  oIPPPrescriptionItemBC: IPPPrescriptionItem;
  oIPPDoseRegimeBC: IPPDoseRegime;
  oIPPPresItemBasicPropertiesViewBC: IPPPresItemBasicPropertiesView;
  oIPPPrescriptionItemViewBC: IPPPrescriptionItemView;
  oContextInformation: CContextInformation;
}
export class CResMsgDummyMethod {
  oContextInformation: CContextInformation;
}
export class CReqMsgGetDrugSites {
  IdentifyingOIdBC: number;
  IdentifyingTypeBC: string;
  MCVersionBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetDrugSites {
  oContextInformation: CContextInformation;
  objSites: ObservableCollection<Site>;
}
export class CReqMsgIsDrugAdminStarted {
  DuenessThresholdBC: number;
  ActionCACodeBC: string;
  nPatientOIDBC: number;
  oContextInformation: CContextInformation;
  DrugItemOIDsBC: ObservableCollection<number>;
}
export class CResMsgIsDrugAdminStarted {
  oContextInformation: CContextInformation;
  oDrugAdminStatusOuputData: ObservableCollection<DrugAdminStatus>;
}
export class CReqMsgGetFormViewDefaultParams {
  objFormViewParamsBC: IPPFormViewParams;
  oContextInformation: CContextInformation;
}
export class CResMsgGetFormViewDefaultParams {
  techvalmandatory: boolean;
  objDefaults: IPPFormViewDafults;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetSnomedForPrescribedItem {
  PatientOIDBC: number;
  EncounterOIDBC: number;
  oWnerOrganisationoidBC: number;
  oContextInformation: CContextInformation;
}
export class CResMsgGetSnomedForPrescribedItem {
  oContextInformation: CContextInformation;
  oResMedItemsAdded: ObservableCollection<CResMedicationitemsadded>;
}
export class CReqMsgGetMedicationsForInpatient {
  PatientOIDBC: number;
  PresStartDateBC: DateTime;
  PresEndDateBC: DateTime;
  EncounterOIDBC: number;
  PRTYPCODEBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetMedicationsForInpatient {
  oContextInformation: CContextInformation;
  objItems: ObservableCollection<DecisionSupportBasicCriteria>;
}
export class CReqMsgCheckPrescribeRule {
  objCriteriaBC: EFrameworkCriteria;
  strRuleBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgCheckPrescribeRule {
  bStatus: string;
  ExecutedRuleName: string;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetNonReconciledItems {
  oPrescriptionItemCriteriaBC: PrescriptionItemCriteria;
  oContextInformation: CContextInformation;
}
export class CResMsgGetNonReconciledItems {
  oContextInformation: CContextInformation;
  oPrescriptionItemView: ObservableCollection<PrescriptionItemView>;
}
export class CReqMsgGetDosageFormType {
  objItemInputDataBC: DrugItemSimpleInput;
  oContextInformation: CContextInformation;
}
export class DrugItemSimpleInput {
  IdentifyingOID: number;
  IdentifyingType: string;
  McVersionNo: string;
}
export class CResMsgGetDosageFormType {
  sFormtype: string;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetProcessingOptions {
  oDrugItemInputDataBC: DrugItemInputData;
  oContextInformation: CContextInformation;
}
export class CResMsgGetProcessingOptions {
  IsSecAuthorised: boolean;
  oContextInformation: CContextInformation;
  oPrescribingOptionDetails: ObservableCollection<PrescriptionItemDetails>;
}
export class CReqMsgSearchProcessingOptionsByIndications {
  oDrugItemBasicDataBC: DrugItemBasicData;
  oIndicationsBC: Indication;
  oContextInformation: CContextInformation;
}
export class CResMsgSearchProcessingOptionsByIndications {
  oContextInformation: CContextInformation;
  oPrescriptionItemDetails: ObservableCollection<PrescriptionItemDetails>;
}
export class CReqMsgGetFavouritesDrugItem {
  IdentifyingOIDBC: number;
  IdentifyingTypeBC: string;
  FavOIdBC: number;
  IsFormularyBC: string;
  MVersionBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetFavouritesDrugItem {
  oContextInformation: CContextInformation;
  oPrescriptionItemDetails: ObservableCollection<PrescriptionItemDetails>;
}
export class CReqMsgGetResolveDefault {
  oDrugItemInputDataBC: DrugItemInputData;
  oContextInformation: CContextInformation;
}
export class CResMsgGetResolveDefault {
  oContextInformation: CContextInformation;
  oPrescriptionItemDetails: ObservableCollection<PrescriptionItemDetails>;
}
export class CReqMsgGetPrescriptionItemDoseInfo {
  PrescriptionItemOIDBC: number;
  oContextInformation: CContextInformation;
}
export class CResMsgGetPrescriptionItemDoseInfo {
  oDose: Dose;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetIPPPrescriptionItemDoseInfo {
  PrescriptionItemOIDBC: number;
  lEncounterOIDBC: number;
  sMcVersionNoBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetIPPPrescriptionItemDoseInfo {
  oDose: PrescriptionItemDose;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetIPPPrescribableItemDoseInfo {
  PrescribableItemOIDBC: number;
  sMcVersionNoBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetIPPPrescribableItemDoseInfo {
  oDose: PrescriptionItemDose;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetTitratedDoseInfo {
  PrescriptionItemOIDBC: number;
  oContextInformation: CContextInformation;
}
export class CResMsgGetTitratedDoseInfo {
  oDose: PrescriptionItemDose;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetIPPFrequency {
  MCVersionBC: string;
  cIsDefaultBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetIPPFrequency {
  oContextInformation: CContextInformation;
  objFrequencyDetails: ObservableCollection<ObjectInfo>;
}
export class CReqMsgGetBrandOptions {
  oBrandDataBC: BrandInputData;
  oContextInformation: CContextInformation;
}
export class CResMsgGetBrandOptions {
  oContextInformation: CContextInformation;
  oDrugs: ObservableCollection<DrugItemBasicInfo>;
}
export class CReqMsgGetTeamMembersWithPermission {
  TeamOIDBC: number;
  oContextInformation: CContextInformation;
}
export class CResMsgGetTeamMembersWithPermission {
  oContextInformation: CContextInformation;
  TeamMembersOID: ObservableCollection<number>;
}
export class CReqMsgGetResolveDetail {
  oDrugItemBasicDataBC: DrugItemBasicData;
  cFollowupStatBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetResolveDetail {
  ResolveDetail: IPPREsolvedetail;
  oContextInformation: CContextInformation;
}
export class CReqMsgVerifyDrug {
  objPatientInfoBC: GeneralInfo;
  oDispensinginstructionhistoryBC: Dispensinginstructionhistory;
  oContextInformation: CContextInformation;
  VerifiedItemsBC: ObservableCollection<PrescriptionItemDetails>;
  NonVerifiedItemsBC: ObservableCollection<PrescriptionItemDetails>;
  DeleteDrugsBC: ObservableCollection<DeletedItemsInfo>;
  ReconciledDrugsBC: ObservableCollection<ReconciledItems>;
  TechnicalValidateBC: ObservableCollection<TechnicalValidationInfo>;
  objPrescriptionResBC: ObservableCollection<PrescriptionResponse>;
}
export class CResMsgVerifyDrug {
  PrescriptionODS: string;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetPatientMedicationHistory {
  oMedicationListCriteriaBC: MedicationListCriteria;
  PageElementBC: PagingDynamicSQL;
  oContextInformation: CContextInformation;
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
export class CResMsgGetPatientMedicationHistory {
  PageCount: number;
  oContextInformation: CContextInformation;
  oPrescriptionItemView: ObservableCollection<PrescriptionItemView>;
}
export class CReqMsgGetRelatedOptions {
  oDrugItemInputDataBC: IPPDrugItemInputData;
  oContextInformation: CContextInformation;
}
export class CResMsgGetRelatedOptions {
  oContextInformation: CContextInformation;
  oRelatedDrugs: ObservableCollection<DrugItemBasicInfo>;
}
export class CReqMsgGetIPPDrugDetails {
  IsBreakBC: string;
  oContextInformation: CContextInformation;
  PrescriptionItemOIDBC: ObservableCollection<number>;
}
export class CResMsgGetIPPDrugDetails {
  oContextInformation: CContextInformation;
  oPrescriptionItemView: ObservableCollection<PrescriptionItemView>;
}
export class CReqMsgGetIPPTechValDrugs {
  PrescriptionTypeBC: string;
  PatientOIDBC: number;
  EncounterOIDBC: number;
  mcVersion: string;
  ServiceOIDBC: number;
  LocationOIDBC: number;
  IsBreakBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetIPPTechValDrugs {
  oContextInformation: CContextInformation;
  oPrescriptionItemView: ObservableCollection<PrescriptionItemView>;
  oMedDispensingDetail: ObservableCollection<MedDispensingDetail>;
}
export class CReqMsgUpdateIVAlertShownForItem {
  PrescriptionItemOIDsBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgUpdateIVAlertShownForItem {
  oContextInformation: CContextInformation;
}
export class CReqMsgGetMedicationConfilictConfig {
  McVersionNoBC: string;
  IsMainAppConflictsBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetMedicationConfilictConfig {
  oMedicationConflictConfig: MedicationConflictConfig;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetLastCreatedPrescTypeForEnc {
  PatientOIDBC: number;
  EncounterOIDBC: number;
  oContextInformation: CContextInformation;
}
export class CResMsgGetLastCreatedPrescTypeForEnc {
  sPrescType: string;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetPrescriptionView {
  oReqListBC: PrescriptionSearchCriteria;
  CurrentPageConfigBC: PagingDynamicSQL;
  oContextInformation: CContextInformation;
}
export class CResMsgGetPrescriptionView {
  PageCount: number;
  oContextInformation: CContextInformation;
  oPrescriptionDetails: ObservableCollection<PrescriptionDetails>;
}
export class CReqMsgGetIPPDecisionSupport {
  objDecisionSuppCriteriaBC: DecisionSupportCriteria;
  oContextInformation: CContextInformation;
}
export class CResMsgGetIPPDecisionSupport {
  objDrugWarnings: WarningItems;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetIPPFavouritesDefaultFolder {
  TeamOIDsBC: string;
  PatientAgeInDaysBC: number;
  GastationAgeInDaysBC: number;
  oContextInformation: CContextInformation;
}
export class CResMsgGetIPPFavouritesDefaultFolder {
  sDefUserFolder: string;
  sDefTeamFolder: string;
  sDefPatientAgeFolder: string;
  oContextInformation: CContextInformation;
}
export class CReqMsgGetMCpresitem {
  MCVersionBC: string;
  PrescriptionItemOIDBC: number;
  SupDisInstBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetMCpresitem {
  oContextInformation: CContextInformation;
  objIPPMCPresctiptionItem: ObservableCollection<IPPMCPresctiptionItem>;
}
export class ArrayOfString extends ObservableCollection<string>{}

 const prototypeList = {"IPPMAManagePrescriptionWS.GetBrandOptions":CResMsgGetBrandOptions.prototype ,
"IPPMAManagePrescriptionWS.GetTeamMembersWithPermission":CResMsgGetTeamMembersWithPermission.prototype ,
"IPPMAManagePrescriptionWS.GetResolveDetail":CResMsgGetResolveDetail.prototype ,
"IPPMAManagePrescriptionWS.VerifyDrug":CResMsgVerifyDrug.prototype ,
"IPPMAManagePrescriptionWS.GetPatientMedicationHistory":CResMsgGetPatientMedicationHistory.prototype ,
"IPPMAManagePrescriptionWS.GetRelatedOptions":CResMsgGetRelatedOptions.prototype ,
"IPPMAManagePrescriptionWS.GetIPPDrugDetails":CResMsgGetIPPDrugDetails.prototype ,
"IPPMAManagePrescriptionWS.GetIPPTechValDrugs":CResMsgGetIPPTechValDrugs.prototype ,
"IPPMAManagePrescriptionWS.UpdateIVAlertShownForItem":CResMsgUpdateIVAlertShownForItem.prototype ,
"IPPMAManagePrescriptionWS.GetMedicationConfilictConfig":CResMsgGetMedicationConfilictConfig.prototype ,
"IPPMAManagePrescriptionWS.GetLastCreatedPrescTypeForEnc":CResMsgGetLastCreatedPrescTypeForEnc.prototype ,
"IPPMAManagePrescriptionWS.GetPrescriptionView":CResMsgGetPrescriptionView.prototype ,
"IPPMAManagePrescriptionWS.GetIPPDecisionSupport":CResMsgGetIPPDecisionSupport.prototype ,
"IPPMAManagePrescriptionWS.GetIPPFavouritesDefaultFolder":CResMsgGetIPPFavouritesDefaultFolder.prototype ,
"IPPMAManagePrescriptionWS.GetMCpresitem":CResMsgGetMCpresitem.prototype ,
"IPPMAManagePrescriptionWS.AuthoriseDrugs":CResMsgAuthoriseDrugs.prototype ,
"IPPMAManagePrescriptionWS.GetAdministrationTimes":CResMsgGetAdministrationTimes.prototype ,
"IPPMAManagePrescriptionWS.IsPreviousDueOverdueSlotExists":CResMsgIsPreviousDueOverdueSlotExists.prototype ,
"IPPMAManagePrescriptionWS.GetPatientMedicationList":CResMsgGetPatientMedicationList.prototype ,
"IPPMAManagePrescriptionWS.GetSequencePrescriptionItemStatus":CResMsgGetSequencePrescriptionItemStatus.prototype ,
"IPPMAManagePrescriptionWS.GetIPPPatientMedicationCount":CResMsgGetIPPPatientMedicationCount.prototype ,
"IPPMAManagePrescriptionWS.GetDrugDetails":CResMsgGetDrugDetails.prototype ,
"IPPMAManagePrescriptionWS.GetAdditionalDetails":CResMsgGetAdditionalDetails.prototype ,
"IPPMAManagePrescriptionWS.GetSupDispInstDetails":CResMsgGetSupDispInstDetails.prototype ,
"IPPMAManagePrescriptionWS.GetIPPPrescriptionDetails":CResMsgGetIPPPrescriptionDetails.prototype ,
"IPPMAManagePrescriptionWS.DummyMethod":CResMsgDummyMethod.prototype ,
"IPPMAManagePrescriptionWS.GetDrugSites":CResMsgGetDrugSites.prototype ,
"IPPMAManagePrescriptionWS.IsDrugAdminStarted":CResMsgIsDrugAdminStarted.prototype ,
"IPPMAManagePrescriptionWS.GetFormViewDefaultParams":CResMsgGetFormViewDefaultParams.prototype ,
"IPPMAManagePrescriptionWS.GetSnomedForPrescribedItem":CResMsgGetSnomedForPrescribedItem.prototype ,
"IPPMAManagePrescriptionWS.GetMedicationsForInpatient":CResMsgGetMedicationsForInpatient.prototype ,
"IPPMAManagePrescriptionWS.CheckPrescribeRule":CResMsgCheckPrescribeRule.prototype ,
"IPPMAManagePrescriptionWS.GetNonReconciledItems":CResMsgGetNonReconciledItems.prototype ,
"IPPMAManagePrescriptionWS.GetDosageFormType":CResMsgGetDosageFormType.prototype ,
"IPPMAManagePrescriptionWS.GetProcessingOptions":CResMsgGetProcessingOptions.prototype ,
"IPPMAManagePrescriptionWS.SearchProcessingOptionsByIndications":CResMsgSearchProcessingOptionsByIndications.prototype ,
"IPPMAManagePrescriptionWS.GetFavouritesDrugItem":CResMsgGetFavouritesDrugItem.prototype ,
"IPPMAManagePrescriptionWS.GetResolveDefault":CResMsgGetResolveDefault.prototype ,
"IPPMAManagePrescriptionWS.GetPrescriptionItemDoseInfo":CResMsgGetPrescriptionItemDoseInfo.prototype ,
"IPPMAManagePrescriptionWS.GetIPPPrescriptionItemDoseInfo":CResMsgGetIPPPrescriptionItemDoseInfo.prototype ,
"IPPMAManagePrescriptionWS.GetIPPPrescribableItemDoseInfo":CResMsgGetIPPPrescribableItemDoseInfo.prototype ,
"IPPMAManagePrescriptionWS.GetTitratedDoseInfo":CResMsgGetTitratedDoseInfo.prototype ,
"IPPMAManagePrescriptionWS.GetIPPFrequency":CResMsgGetIPPFrequency.prototype ,
"IPPMAManagePrescriptionWS.GetSysFormViewerSpecificDefaultValues":CResMsgGetSysFormViewerSpecificDefaultValues.prototype ,
"IPPMAManagePrescriptionWS.InvokeDRCConflict":CResMsgInvokeDRCConflict.prototype ,
"IPPMAManagePrescriptionWS.GetDRCConflicts":CResMsgGetDRCConflicts.prototype ,
"IPPMAManagePrescriptionWS.GetUnresolvedConflicts":CResMsgGetUnresolvedConflicts.prototype ,
"IPPMAManagePrescriptionWS.IsUnresolvedConflictsExist":CResMsgIsUnresolvedConflictsExist.prototype ,
"IPPMAManagePrescriptionWS.GetLeastDCalDTTM":CResMsgGetLeastDCalDTTM.prototype ,
"IPPMAManagePrescriptionWS.UpdatePresItemConflicts":CResMsgUpdatePresItemConflicts.prototype ,
"IPPMAManagePrescriptionWS.GetTitratedDoseScheduleInfo":CResMsgGetTitratedDoseScheduleInfo.prototype ,
"IPPMAManagePrescriptionWS.GetRequestMedicationDetails":CResMsgGetRequestMedicationDetails.prototype ,
"IPPMAManagePrescriptionWS.GetMultiRoutes":CResMsgGetMultiRoutes.prototype ,
"IPPMAManagePrescriptionWS.GetReviewHistory":CResMsgGetReviewHistory.prototype ,
"IPPMAManagePrescriptionWS.GetScheduleTimeAndFreq":CResMsgGetScheduleTimeAndFreq.prototype ,
"IPPMAManagePrescriptionWS.ManageReviewAfterPeriod":CResMsgManageReviewAfterPeriod.prototype ,
"IPPMAManagePrescriptionWS.GetDoseUOMDetails":CResMsgGetDoseUOMDetails.prototype ,
"IPPMAManagePrescriptionWS.UpdateDueOverStatusForClinicalIndicator":CResMsgUpdateDueOverStatusForClinicalIndicator.prototype ,
"IPPMAManagePrescriptionWS.IsAnyParacetamolAdministration":CResMsgIsAnyParacetamolAdministration.prototype ,
"IPPMAManagePrescriptionWS.GetPatientHomeLeaveDetail":CResMsgGetPatientHomeLeaveDetail.prototype ,
"IPPMAManagePrescriptionWS.GetTransformConversion":CResMsgGetTransformConversion.prototype ,
"IPPMAManagePrescriptionWS.GetNonIVSubseqentItemsReqDataForSequence":CResMsgGetNonIVSubseqentItemsReqDataForSequence.prototype ,
"IPPMAManagePrescriptionWS.GetMedCheckMinorClicEnctr":CResMsgGetMedCheckMinorClicEnctr.prototype ,
"IPPMAManagePrescriptionWS.ChkPatientTransferActivity":CResMsgChkPatientTransferActivity.prototype ,
"IPPMAManagePrescriptionWS.GetWarningCategories":CResMsgGetWarningCategories.prototype ,
"IPPMAManagePrescriptionWS.GetOmittedItemsList":CResMsgGetOmittedItemsList.prototype ,
"IPPMAManagePrescriptionWS.SubmitClerkMedDrugs":CResMsgSubmitClerkMedDrugs.prototype ,
"IPPMAManagePrescriptionWS.SubmitDrugs":CResMsgSubmitDrugs.prototype ,
"IPPMAManagePrescriptionWS.GetPresItemUpdateHistory":CResMsgGetPresItemUpdateHistory.prototype ,
"IPPMAManagePrescriptionWS.GetGPConnectAdministration":CResMsgGetGPConnectAdministration.prototype ,
"IPPMAManagePrescriptionWS.GetGPConnectAdditionalDetail":CResMsgGetGPConnectAdditionalDetail.prototype ,
"IPPMAManagePrescriptionWS.CancelDrugs":CResMsgCancelDrugs.prototype ,
"IPPMAManagePrescriptionWS.GetWardStockPresItemsDetails":CResMsgGetWardStockPresItemsDetails.prototype ,
"IPPMAManagePrescriptionWS.GetDispensinginstDetails":CResMsgGetDispensinginstDetails.prototype ,
"IPPMAManagePrescriptionWS.GetRequisitionHistoryDetails":CResMsgGetRequisitionHistoryDetails.prototype ,
"IPPMAManagePrescriptionWS.GetSupplyHistoryDetails":CResMsgGetSupplyHistoryDetails.prototype ,
"IPPMAManagePrescriptionWS.GetSupplyDispenseDetail":CResMsgGetSupplyDispenseDetail.prototype ,
"IPPMAManagePrescriptionWS.GetClinicalVerificationDetails":CResMsgGetClinicalVerificationDetails.prototype ,
"IPPMAManagePrescriptionWS.GetOnBehalfOfDetails":CResMsgGetOnBehalfOfDetails.prototype ,
"IPPMAManagePrescriptionWS.UpdateIsSupplyAlertShown":CResMsgUpdateIsSupplyAlertShown.prototype ,
"IPPMAManagePrescriptionWS.SubmitTechValidationItems":CResMsgSubmitTechValidationItems.prototype ,
"IPPMAManagePrescriptionWS.SubmitSupplyItems":CResMsgSubmitSupplyItems.prototype ,
"IPPMAManagePrescriptionWS.GetIPPPrescriptionItems":CResMsgGetIPPPrescriptionItems.prototype ,
"IPPMAManagePrescriptionWS.GetPrescriptionItembyEncounter":CResMsgGetPrescriptionItembyEncounter.prototype ,
"IPPMAManagePrescriptionWS.GetAdhocMciRule":CResMsgGetAdhocMciRule.prototype ,
"IPPMAManagePrescriptionWS.GetMciProductRule":CResMsgGetMciProductRule.prototype ,
"IPPMAManagePrescriptionWS.GetIPPTechnicalDetails":CResMsgGetIPPTechnicalDetails.prototype ,
"IPPMAManagePrescriptionWS.GetIPPProcessingOptionIndications":CResMsgGetIPPProcessingOptionIndications.prototype ,
"IPPMAManagePrescriptionWS.IsDeactivatedAttributeExists":CResMsgIsDeactivatedAttributeExists.prototype ,
"IPPMAManagePrescriptionWS.GetIPPMAMedicationFavouritesGroupItemsList":CResMsgGetIPPMAMedicationFavouritesGroupItemsList.prototype ,
"IPPMAManagePrescriptionWS.GetIPPMAOrderSetItemsList":CResMsgGetIPPMAOrderSetItemsList.prototype ,
"IPPMAManagePrescriptionWS.GetIPPMAOrderSetAssociatedItemsList":CResMsgGetIPPMAOrderSetAssociatedItemsList.prototype ,
"IPPMAManagePrescriptionWS.GetOrderSetStatus":CResMsgGetOrderSetStatus.prototype ,
"IPPMAManagePrescriptionWS.UpdateRvwAlertShownForItem":CResMsgUpdateRvwAlertShownForItem.prototype ,
"IPPMAManagePrescriptionWS.GetSelectProduct":CResMsgGetSelectProduct.prototype ,
"IPPMAManagePrescriptionWS.GetPackDetByEANCode":CResMsgGetPackDetByEANCode.prototype ,
"IPPMAManagePrescriptionWS.GetPatientMedDisContItems":CResMsgGetPatientMedDisContItems.prototype ,
"IPPMAManagePrescriptionWS.GetClinicalEncountersDetail":CResMsgGetClinicalEncountersDetail.prototype ,
"IPPMAManagePrescriptionWS.GetPrescriptionPrintStatus":CResMsgGetPrescriptionPrintStatus.prototype ,
"IPPMAManagePrescriptionWS.GetSysFormViewerDefaultValues":CResMsgGetSysFormViewerDefaultValues.prototype ,

CReqMsgGetWardStockPresItemsDetails : { 
oWSPresItemCriteriaBC:WardStockPresItemCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },Dispensinginstructionhistory : { 
DispensingInstruction:ObjectInfo.prototype ,

 },SupplyHistoryDetails : { 
DispenseStatus:PresItemIPPRequestDetails.prototype ,

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

 },PrescriptionItemBasicData : { 
HealthOrganisation:ObjectInfo.prototype ,
PrescriptionBasicData:Prescription.prototype ,

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

 },PrescriptionItem : { 
PrescriberDetails:ObjectInfo.prototype ,
CareProvider:ObjectInfo.prototype ,
GPConnectMedication:GPConnectItem.prototype ,

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
ScheduledTimes:IPPScheduledetails.prototype ,

 },DoseRegimeInfusionDetail : { 
RateNumerator:UOM.prototype ,
RateDenominator:UOM.prototype ,
Duration:MeasurableObject.prototype ,

 },AdministeredTimeDoseDetail : { 
DoseUOM:UOM.prototype ,

 },IPPDoseRegime : { 
InfusionRateNumUOM:UOM.prototype ,
InfusionRateDenUOM:UOM.prototype ,
Frequency:IPPFrequency.prototype ,
RateUOMOID:UOM.prototype ,
RateDenaminatorUOMOID:UOM.prototype ,
oConditionalDoseRegime:ConditionalDoseRegime.prototype ,
oTitratedDoseRegime:TitratedDoseRegime.prototype ,
FixedTimes:IPPScheduledetails.prototype ,
DrugroundTimes:IPPScheduledetails.prototype ,

 },ConditionalDoseRegime : { 
ValueUOM:UOM.prototype ,
DoseUOM:UOM.prototype ,
RateUOMOID:UOM.prototype ,
RateDenaminatorUOMOID:UOM.prototype ,

 },IPPPresItemBasicProperties : { 
Instruction:ObjectInfo.prototype ,
oRequisitionHistoryDetails:RequisitionHistoryDetails.prototype ,
ReviewAfterUOM:ObjectInfo.prototype ,

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

 },IPPPresItemBasicPropertiesView : { 
PRNInstruction:ObjectInfo.prototype ,

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

 },GPConnectItem : { 
Dosage:GPConnectAdminDosage.prototype ,

 },IPPPrescriptionItem : { 
Instruction:ObjectInfo.prototype ,
FrequencyDetails:IPPFrequencyDetails.prototype ,

 },PrescriptionDetails : { 
PatientData:PatientDetail.prototype ,
EncounterDetails:EncounterDetails.prototype ,
TechnicallyValidatedUser:ObjectInfo.prototype ,
GroupByDetails:GroupResult.prototype ,

 },DrugItemBasicInfo : { 
APIProp:APIProperties.prototype ,
DrugProperties:DrugProperty.prototype ,
DoseRegime:DoseRegime.prototype ,
MCChildItems:IPPMCPresctiptionItem.prototype ,
Routes:Route.prototype ,

 },PrescriptionResponse : { 
StationeryType:ObjectInfo.prototype ,
PresItemResponse:PrescriptionItemResponse.prototype ,

 },IPPFormViewDafults : { 
FHIRAttributesInfo:FHIRAttributes.prototype ,
DoseUOM:UOM.prototype ,
DosageForm:Form.prototype ,
DoseSite:Site.prototype ,
Route:Route.prototype ,
Quantity:Quantity.prototype ,
MonographInfo:MonographInfo.prototype ,
PRNInstructions:ObjectInfo.prototype ,

 },FavouriteItem : { 
FavriteStatusHistory:StatusHistory.prototype ,
PrescriptionItem:ConstituentItem.prototype ,

 },PrescribeItemBase : { 
ItemStatusHistory:PrescribeItemStatus.prototype ,

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

 },DoseDetails : { 
FromDoseUOM:UOM.prototype ,
ToDoseUOM:UOM.prototype ,
Frequency:Frequency.prototype ,
ValueUOM:UOM.prototype ,
DurationUOM:UOM.prototype ,
QuantityUOM:UOM.prototype ,
ObservationRangeUOM:UOM.prototype ,
FrequencyDetails:FrequencyDetails.prototype ,

 },PrescribeItemStatus : { 
ReplacementItems:PrescribeItemBase.prototype ,

 },OrderSetAssociatedItems : { 
ItemsList:OrderSetPrescriptionItems.prototype ,

 },OrderSetPrescriptionItems : { 
PrescriptionItemDetails:PrescriptionItemDetails.prototype ,

 },MedicationListCriteria : { 
FHIRAttributes:FHIRExtension.prototype ,

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

 },IPPProcessingDetails : { 
PRNInstructions:ObjectInfo.prototype ,

 },DRCObject : { 
DoseUOM:DRCUOM.prototype ,
ProductStrenghtUOM:DRCUOM.prototype ,
DRCDoseType:ObjectInfo.prototype ,
DRCMultipleDoseValues:DRCMultipleDoseValue.prototype ,

 },DRCMultipleDoseValue : { 
DoseUOM:DRCUOM.prototype ,

 },TitratedDose : { 
TitratedScheduledDetails:TitrateScheduled.prototype ,

 },MedRequestDetail : { 
oPrescriptionItemView:PrescriptionItemView.prototype ,

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

 },PresItemAuditHistoryInfo : { 
ModificationIncidents:PresItemAuditHistoryIncident.prototype ,

 },PresItemAuditHistoryIncident : { 
AuditChanges:PresItemAuditHistory.prototype ,

 },Ingredient : { 
IngStatusHistory:StatusHistory.prototype ,
Coding:Codification.prototype ,

 },DecisionSupportBasicCriteria : { 
DrugItem:DrugBasicData.prototype ,

 },Dose : { 
DoseDetails:DoseDetails.prototype ,

 },IPPREsolvedetail : { 
oPGDListDetail:PGDListDetail.prototype ,
ReviewAfterUOM:ObjectInfo.prototype ,
DoseCapDetail:DoseCapDetail.prototype ,
oDoseCalcInfo:DoseFormula.prototype ,
Route:Route.prototype ,
AdminInstruction:ObjectInfo.prototype ,
StatType:Stationary.prototype ,
Dose:Dose.prototype ,
Quantity:Quantity.prototype ,
Adminmethod:AdminMethod.prototype ,
Form:Form.prototype ,
oInfusionFluidDetails:InfusionFluidDetails.prototype ,
ConcentrationDoseUOM:UOM.prototype ,
PRNInstructions:ObjectInfo.prototype ,
objFrequencyDetails:ObjectInfo.prototype ,
VolumeUOM:UOM.prototype ,
InfusionPeriodUOM:UOM.prototype ,
RateDenaminatorUOM:UOM.prototype ,
RateDenaminatorUOMO:UOM.prototype ,
MultiComponentDetails:IPPMCPresctiptionItem.prototype ,
InfusionFluid:ObjectInfo.prototype ,
Indication:Indication.prototype ,
MultiRoute:Route.prototype ,
DRCDefDoseTypeLorenzoIDs:ObjectInfo.prototype ,
objDoseCalciUOMs:ObjectInfo.prototype ,
IntervalInstalmentsUoM:UOM.prototype ,

 },PGDListDetail : { 
PrescribableItem:ObjectInfo.prototype ,
DoseType:ObjectInfo.prototype ,
DoseUOM:ObjectInfo.prototype ,
Route:ObjectInfo.prototype ,
Frequnecy:ObjectInfo.prototype ,
DosageForm:ObjectInfo.prototype ,
AdminMethod:ObjectInfo.prototype ,
InfusionRateNumUOM:ObjectInfo.prototype ,
InfusionRateDenoUOM:ObjectInfo.prototype ,

 },MedicationConflictConfig : { 
oMedicationConflictConfigData:MedConflictConfigData.prototype ,
oDRCConfigData:DRCConfigData.prototype ,

 },DecisionSupportCriteria : { 
AddedMedication:DecisionSupportBasicCriteria.prototype ,
CurrentMedication:DecisionSupportBasicCriteria.prototype ,

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

 },CResMsgGetWardStockPresItemsDetails : { 
oContextInformation:CContextInformation.prototype ,
arrWSPresItemDetails:WardStockPresItemDetails.prototype ,

 },CReqMsgGetDispensinginstDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDispensinginstDetails : { 
oContextInformation:CContextInformation.prototype ,
arrDispensinginstructionhistory:Dispensinginstructionhistory.prototype ,

 },CReqMsgGetRequisitionHistoryDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetRequisitionHistoryDetails : { 
oContextInformation:CContextInformation.prototype ,
arrRequisitionHistoryDetails:RequisitionHistoryDetails.prototype ,

 },CReqMsgGetSupplyHistoryDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetSupplyHistoryDetails : { 
oContextInformation:CContextInformation.prototype ,
arrSupplyHistoryDetails:SupplyHistoryDetails.prototype ,
oMedDispensingDetail:MedDispensingDetail.prototype ,

 },CReqMsgGetSupplyDispenseDetail : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetSupplyDispenseDetail : { 
oContextInformation:CContextInformation.prototype ,
oMedDispensingDetail:MedDispensingDetail.prototype ,

 },CReqMsgGetClinicalVerificationDetails : { 
objIpBC:ClinicalVerificationHistoryIP.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetClinicalVerificationDetails : { 
oContextInformation:CContextInformation.prototype ,
objOP:ClinicalVerificationHistoryOp.prototype ,

 },CReqMsgGetOnBehalfOfDetails : { 
objIbBC:OnBehalfDetailsIp.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetOnBehalfOfDetails : { 
oContextInformation:CContextInformation.prototype ,
objOB:OnBehalfDetailsOp.prototype ,

 },CReqMsgUpdateIsSupplyAlertShown : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgUpdateIsSupplyAlertShown : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgSubmitTechValidationItems : { 
oDispensinginstructionhistoryBC:Dispensinginstructionhistory.prototype ,
oContextInformation:CContextInformation.prototype ,
oTechnicalValidationInfoBC:TechnicalValidationInfo.prototype ,

 },CResMsgSubmitTechValidationItems : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgSubmitSupplyItems : { 
oDispensinginstructionhistoryBC:Dispensinginstructionhistory.prototype ,
oContextInformation:CContextInformation.prototype ,
oTechnicalValidationInfoBC:TechnicalValidationInfo.prototype ,

 },CResMsgSubmitSupplyItems : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetIPPPrescriptionItems : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIPPPrescriptionItems : { 
oContextInformation:CContextInformation.prototype ,
ItemDetail:PrescriptionResponse.prototype ,

 },CReqMsgGetPrescriptionItembyEncounter : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPrescriptionItembyEncounter : { 
oContextInformation:CContextInformation.prototype ,
ItemDetail:PrescriptionResponse.prototype ,

 },CReqMsgGetAdhocMciRule : { 
objFormViewParamsBC:IPPFormViewParams.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAdhocMciRule : { 
objDefaults:IPPFormViewDafults.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetMciProductRule : { 
objFormViewParamsBC:IPPFormViewParams.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMciProductRule : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetIPPTechnicalDetails : { 
IdentifyOIDTypeBC:Identifyingdetails.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIPPTechnicalDetails : { 
oContextInformation:CContextInformation.prototype ,
oTechnicalValidationInfo:TechnicalValidationInfo.prototype ,

 },CReqMsgGetIPPProcessingOptionIndications : { 
oDrugItemBasicDataBC:DrugItemBasicData.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIPPProcessingOptionIndications : { 
oContextInformation:CContextInformation.prototype ,
oProcessingOptionIndications:Indication.prototype ,

 },CReqMsgIsDeactivatedAttributeExists : { 
oIPPReqDeactAttributesBC:IPPReqDeactAttributes.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgIsDeactivatedAttributeExists : { 
oIPPResDeactAttributes:IPPResDeactAttributes.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetIPPMAMedicationFavouritesGroupItemsList : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIPPMAMedicationFavouritesGroupItemsList : { 
oFavouriteItem:FavouriteItem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetIPPMAOrderSetItemsList : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIPPMAOrderSetItemsList : { 
oFavouriteItem:FavouriteItem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetIPPMAOrderSetAssociatedItemsList : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIPPMAOrderSetAssociatedItemsList : { 
ORSAssociatedItem:OrderSetAssociatedItems.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetOrderSetStatus : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetOrderSetStatus : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgUpdateRvwAlertShownForItem : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgUpdateRvwAlertShownForItem : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetSelectProduct : { 
oSelectProductBC:BrandInputData.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetSelectProduct : { 
oContextInformation:CContextInformation.prototype ,
oDrugs:DrugItemBasicInfo.prototype ,

 },CReqMsgGetPackDetByEANCode : { 
oMatchEANCODESearchBC:MatchEANCODESearch.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPackDetByEANCode : { 
oPackSizeForEANCODE:PackSizeForEANCODE.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPatientMedDisContItems : { 
oMedicationListCriteriaBC:MedicationListCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPatientMedDisContItems : { 
oContextInformation:CContextInformation.prototype ,
oPrescriptionItemView:PrescriptionItemView.prototype ,

 },CReqMsgGetClinicalEncountersDetail : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetClinicalEncountersDetail : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPrescriptionPrintStatus : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPrescriptionPrintStatus : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetSysFormViewerDefaultValues : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetSysFormViewerDefaultValues : { 
oProcessingInfo:ProcessingInfo.prototype ,
oIPPProcessingDetails:IPPProcessingDetails.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetSysFormViewerSpecificDefaultValues : { 
objFormViewParamsBC:IPPFormViewParams.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetSysFormViewerSpecificDefaultValues : { 
objDefaults:IPPFormViewDafults.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgInvokeDRCConflict : { 
oDRCObjectBC:DRCObject.prototype ,
oContextInformation:CContextInformation.prototype ,
oDRCConfigBC:DRCConfigData.prototype ,

 },CResMsgInvokeDRCConflict : { 
oContextInformation:CContextInformation.prototype ,
oDRCConflicts:DRCConflicts.prototype ,

 },DRCConflicts : { 
DRCError:DRCError.prototype ,

 },CReqMsgGetDRCConflicts : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDRCConflicts : { 
oContextInformation:CContextInformation.prototype ,
oDRCConflict:DRCConflict.prototype ,

 },CReqMsgGetUnresolvedConflicts : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetUnresolvedConflicts : { 
oContextInformation:CContextInformation.prototype ,
oWarningDetails:WarningDetails.prototype ,

 },CReqMsgIsUnresolvedConflictsExist : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgIsUnresolvedConflictsExist : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetLeastDCalDTTM : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetLeastDCalDTTM : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgUpdatePresItemConflicts : { 
oContextInformation:CContextInformation.prototype ,
oWarningDetailsBC:WarningDetails.prototype ,

 },CResMsgUpdatePresItemConflicts : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetTitratedDoseScheduleInfo : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetTitratedDoseScheduleInfo : { 
oTitratedDose:TitratedDose.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetRequestMedicationDetails : { 
oMedicationListCriteriaBC:MedicationListCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetRequestMedicationDetails : { 
oContextInformation:CContextInformation.prototype ,
oMedRequestDetail:MedRequestDetail.prototype ,
oMedDispensingDetail:MedDispensingDetail.prototype ,

 },CReqMsgGetMultiRoutes : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMultiRoutes : { 
oContextInformation:CContextInformation.prototype ,
objmultiRoutes:MultiRoute.prototype ,

 },CReqMsgGetReviewHistory : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetReviewHistory : { 
IsReviewUOMCodeAvailable:ObjectInfo.prototype ,
oContextInformation:CContextInformation.prototype ,
ReviewAfterDetails:ReviewAfterDetail.prototype ,

 },CReqMsgGetScheduleTimeAndFreq : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetScheduleTimeAndFreq : { 
freq:IPPFrequency.prototype ,
oContextInformation:CContextInformation.prototype ,
lstscheduletimes:IPPScheduledetails.prototype ,

 },CReqMsgManageReviewAfterPeriod : { 
objManageReviewPeriodBC:ManageReviewPeriod.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgManageReviewAfterPeriod : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetDoseUOMDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDoseUOMDetails : { 
oContextInformation:CContextInformation.prototype ,
doseUOMDetails:DoseUOMBaseDetails.prototype ,

 },CReqMsgUpdateDueOverStatusForClinicalIndicator : { 
oCMedInClinicalIndicParamsBC:CMedStatusInClinicalIndicatorParams.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgUpdateDueOverStatusForClinicalIndicator : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgIsAnyParacetamolAdministration : { 
IngAdminParamsBC:IngredientAdminParams.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgIsAnyParacetamolAdministration : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPatientHomeLeaveDetail : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPatientHomeLeaveDetail : { 
oPatHomeLeaveInfo:PatHomeLeaveInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetTransformConversion : { 
oGPCDrugConRequestBC:CGPCDrugConversionRequest.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetTransformConversion : { 
oCGPCDrugConResult:DrugItemBasicInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetNonIVSubseqentItemsReqDataForSequence : { 
oContextInformation:CContextInformation.prototype ,
objSequenceReqInpuCriteriaBC:CSequenceRequiredInputCriteria.prototype ,

 },CResMsgGetNonIVSubseqentItemsReqDataForSequence : { 
oContextInformation:CContextInformation.prototype ,
objSubsequentItemsRequiredDataForSeq:CSubsequentItemsRequiredDataForSeq.prototype ,

 },CSubsequentItemsRequiredDataForSeq : { 
oFrequency:IPPFrequency.prototype ,
oFixedTimes:IPPScheduledetails.prototype ,
oDrugRoundTimes:IPPScheduledetails.prototype ,

 },CReqMsgGetMedCheckMinorClicEnctr : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMedCheckMinorClicEnctr : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgChkPatientTransferActivity : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgChkPatientTransferActivity : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetWarningCategories : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetWarningCategories : { 
oContextInformation:CContextInformation.prototype ,
objWarningCategories:UOM.prototype ,

 },CReqMsgGetOmittedItemsList : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetOmittedItemsList : { 
oContextInformation:CContextInformation.prototype ,
oIPPPresItemOmittedInfo:IPPPresItemOmittedInfo.prototype ,

 },CReqMsgSubmitClerkMedDrugs : { 
oMedicationBC:Medication.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgSubmitClerkMedDrugs : { 
oContextInformation:CContextInformation.prototype ,
objPrescResponse:PrescriptionResponse.prototype ,

 },CReqMsgSubmitDrugs : { 
oMedicationBC:Medication.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgSubmitDrugs : { 
oContextInformation:CContextInformation.prototype ,
objPrescResponse:PrescriptionResponse.prototype ,

 },CReqMsgGetPresItemUpdateHistory : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPresItemUpdateHistory : { 
objPrescResponse:PresItemAuditHistoryInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetGPConnectAdministration : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetGPConnectAdministration : { 
objMedication:GPConnectMedication.prototype ,
oContextInformation:CContextInformation.prototype ,

 },GPConnectMedication : { 
Administrations:GPConnectAdministration.prototype ,

 },GPConnectAdministration : { 
AdditionalDetail:GPConnectItemAdditionalDetail.prototype ,
Dosages:GPConnectAdminDosage.prototype ,
AllIdentifiers:GpConnectIdentifier.prototype ,

 },GPConnectItemAdditionalDetail : { 
DispensePlanned:GPConnectDispenseDetail.prototype ,
DispenseIssued:GPConnectDispenseDetail.prototype ,

 },CReqMsgGetGPConnectAdditionalDetail : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetGPConnectAdditionalDetail : { 
administration:GPConnectAdministration.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgCancelDrugs : { 
oMedicationBC:Medication.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgCancelDrugs : { 
oContextInformation:CContextInformation.prototype ,
objPrescResponse:PrescriptionResponse.prototype ,

 },CReqMsgAuthoriseDrugs : { 
objPatientInfoBC:GeneralInfo.prototype ,
oDispensinginstructionhistoryBC:Dispensinginstructionhistory.prototype ,
oContextInformation:CContextInformation.prototype ,
AuthorisedItemsBC:PrescriptionItemDetails.prototype ,
UnAuthorisedItemsBC:PrescriptionItemDetails.prototype ,
DeleteDrugsBC:DeletedItemsInfo.prototype ,
ReconciledDrugsBC:ReconciledItems.prototype ,
TechnicalValidateBC:TechnicalValidationInfo.prototype ,
objPrescriptionResBC:PrescriptionResponse.prototype ,

 },GeneralInfo : { 
oCancelDisRateAlertShown:CancelDisRateAlertShown.prototype ,
PresItemPatientAddnDetail:PresItemPatientAddnDetail.prototype ,

 },CResMsgAuthoriseDrugs : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetAdministrationTimes : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAdministrationTimes : { 
oFrequency:IPPFrequency.prototype ,
oContextInformation:CContextInformation.prototype ,
oFixedTimes:IPPScheduledetails.prototype ,
oDrugRoundTimes:IPPScheduledetails.prototype ,

 },CReqMsgIsPreviousDueOverdueSlotExists : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgIsPreviousDueOverdueSlotExists : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPatientMedicationList : { 
oMedicationListCriteriaBC:MedicationListCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPatientMedicationList : { 
oViewData:MedicationViewData.prototype ,
oContextInformation:CContextInformation.prototype ,
oPrescriptionItemView:PrescriptionItemView.prototype ,

 },CReqMsgGetSequencePrescriptionItemStatus : { 
oMedicationListCriteriaBC:SequentialItemCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },SequentialItemCriteria : { 
SequentialInfusionData:PartialSequentialData.prototype ,

 },CResMsgGetSequencePrescriptionItemStatus : { 
oContextInformation:CContextInformation.prototype ,
oPrescriptionItemView:SequentialPresriptionItem.prototype ,

 },CReqMsgGetIPPPatientMedicationCount : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIPPPatientMedicationCount : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetDrugDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDrugDetails : { 
oContextInformation:CContextInformation.prototype ,
oPrescriptionItemView:IPPPrescriptionItemView.prototype ,

 },CReqMsgGetAdditionalDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAdditionalDetails : { 
oPrescriptionItemView:IPPPrescriptionItemView.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetSupDispInstDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetSupDispInstDetails : { 
oContextInformation:CContextInformation.prototype ,
oIPPSupDispInstView:IPPSupDispInstView.prototype ,

 },IPPSupDispInstView : { 
DispensingInstruction:ObjectInfo.prototype ,

 },CReqMsgGetIPPPrescriptionDetails : { 
oPrescriptionItemInputDataBC:PrescriptionItemInputData.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIPPPrescriptionDetails : { 
oPresItemSourceProcDetail:PrescriptionItemDetails.prototype ,
oContextInformation:CContextInformation.prototype ,
oPrescriptionItemDetails:PrescriptionItemDetails.prototype ,

 },CReqMsgDummyMethod : { 
oFrequencyDetailsBC:IPPFrequencyDetails.prototype ,
oIPPPresItemBasicPropertiesBC:IPPPresItemBasicProperties.prototype ,
oIPPPrescriptionItemBC:IPPPrescriptionItem.prototype ,
oIPPDoseRegimeBC:IPPDoseRegime.prototype ,
oIPPPresItemBasicPropertiesViewBC:IPPPresItemBasicPropertiesView.prototype ,
oIPPPrescriptionItemViewBC:IPPPrescriptionItemView.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgDummyMethod : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetDrugSites : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDrugSites : { 
oContextInformation:CContextInformation.prototype ,
objSites:Site.prototype ,

 },CReqMsgIsDrugAdminStarted : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgIsDrugAdminStarted : { 
oContextInformation:CContextInformation.prototype ,
oDrugAdminStatusOuputData:DrugAdminStatus.prototype ,

 },CReqMsgGetFormViewDefaultParams : { 
objFormViewParamsBC:IPPFormViewParams.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFormViewDefaultParams : { 
objDefaults:IPPFormViewDafults.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetSnomedForPrescribedItem : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetSnomedForPrescribedItem : { 
oContextInformation:CContextInformation.prototype ,
oResMedItemsAdded:CResMedicationitemsadded.prototype ,

 },CReqMsgGetMedicationsForInpatient : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMedicationsForInpatient : { 
oContextInformation:CContextInformation.prototype ,
objItems:DecisionSupportBasicCriteria.prototype ,

 },CReqMsgCheckPrescribeRule : { 
objCriteriaBC:EFrameworkCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgCheckPrescribeRule : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetNonReconciledItems : { 
oPrescriptionItemCriteriaBC:PrescriptionItemCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetNonReconciledItems : { 
oContextInformation:CContextInformation.prototype ,
oPrescriptionItemView:PrescriptionItemView.prototype ,

 },CReqMsgGetDosageFormType : { 
objItemInputDataBC:DrugItemSimpleInput.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDosageFormType : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetProcessingOptions : { 
oDrugItemInputDataBC:DrugItemInputData.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProcessingOptions : { 
oContextInformation:CContextInformation.prototype ,
oPrescribingOptionDetails:PrescriptionItemDetails.prototype ,

 },CReqMsgSearchProcessingOptionsByIndications : { 
oDrugItemBasicDataBC:DrugItemBasicData.prototype ,
oIndicationsBC:Indication.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgSearchProcessingOptionsByIndications : { 
oContextInformation:CContextInformation.prototype ,
oPrescriptionItemDetails:PrescriptionItemDetails.prototype ,

 },CReqMsgGetFavouritesDrugItem : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFavouritesDrugItem : { 
oContextInformation:CContextInformation.prototype ,
oPrescriptionItemDetails:PrescriptionItemDetails.prototype ,

 },CReqMsgGetResolveDefault : { 
oDrugItemInputDataBC:DrugItemInputData.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResolveDefault : { 
oContextInformation:CContextInformation.prototype ,
oPrescriptionItemDetails:PrescriptionItemDetails.prototype ,

 },CReqMsgGetPrescriptionItemDoseInfo : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPrescriptionItemDoseInfo : { 
oDose:Dose.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetIPPPrescriptionItemDoseInfo : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIPPPrescriptionItemDoseInfo : { 
oDose:PrescriptionItemDose.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetIPPPrescribableItemDoseInfo : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIPPPrescribableItemDoseInfo : { 
oDose:PrescriptionItemDose.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetTitratedDoseInfo : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetTitratedDoseInfo : { 
oDose:PrescriptionItemDose.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetIPPFrequency : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIPPFrequency : { 
oContextInformation:CContextInformation.prototype ,
objFrequencyDetails:ObjectInfo.prototype ,

 },CReqMsgGetBrandOptions : { 
oBrandDataBC:BrandInputData.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetBrandOptions : { 
oContextInformation:CContextInformation.prototype ,
oDrugs:DrugItemBasicInfo.prototype ,

 },CReqMsgGetTeamMembersWithPermission : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetTeamMembersWithPermission : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetResolveDetail : { 
oDrugItemBasicDataBC:DrugItemBasicData.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetResolveDetail : { 
ResolveDetail:IPPREsolvedetail.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgVerifyDrug : { 
objPatientInfoBC:GeneralInfo.prototype ,
oDispensinginstructionhistoryBC:Dispensinginstructionhistory.prototype ,
oContextInformation:CContextInformation.prototype ,
VerifiedItemsBC:PrescriptionItemDetails.prototype ,
NonVerifiedItemsBC:PrescriptionItemDetails.prototype ,
DeleteDrugsBC:DeletedItemsInfo.prototype ,
ReconciledDrugsBC:ReconciledItems.prototype ,
TechnicalValidateBC:TechnicalValidationInfo.prototype ,
objPrescriptionResBC:PrescriptionResponse.prototype ,

 },CResMsgVerifyDrug : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPatientMedicationHistory : { 
oMedicationListCriteriaBC:MedicationListCriteria.prototype ,
PageElementBC:PagingDynamicSQL.prototype ,
oContextInformation:CContextInformation.prototype ,

 },PagingDynamicSQL : { 
FilterBy:Filter.prototype ,
GroupBy:Group.prototype ,

 },CResMsgGetPatientMedicationHistory : { 
oContextInformation:CContextInformation.prototype ,
oPrescriptionItemView:PrescriptionItemView.prototype ,

 },CReqMsgGetRelatedOptions : { 
oDrugItemInputDataBC:IPPDrugItemInputData.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetRelatedOptions : { 
oContextInformation:CContextInformation.prototype ,
oRelatedDrugs:DrugItemBasicInfo.prototype ,

 },CReqMsgGetIPPDrugDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIPPDrugDetails : { 
oContextInformation:CContextInformation.prototype ,
oPrescriptionItemView:PrescriptionItemView.prototype ,

 },CReqMsgGetIPPTechValDrugs : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIPPTechValDrugs : { 
oContextInformation:CContextInformation.prototype ,
oPrescriptionItemView:PrescriptionItemView.prototype ,
oMedDispensingDetail:MedDispensingDetail.prototype ,

 },CReqMsgUpdateIVAlertShownForItem : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgUpdateIVAlertShownForItem : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetMedicationConfilictConfig : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMedicationConfilictConfig : { 
oMedicationConflictConfig:MedicationConflictConfig.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetLastCreatedPrescTypeForEnc : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetLastCreatedPrescTypeForEnc : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPrescriptionView : { 
oReqListBC:PrescriptionSearchCriteria.prototype ,
CurrentPageConfigBC:PagingDynamicSQL.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPrescriptionView : { 
oContextInformation:CContextInformation.prototype ,
oPrescriptionDetails:PrescriptionDetails.prototype ,

 },CReqMsgGetIPPDecisionSupport : { 
objDecisionSuppCriteriaBC:DecisionSupportCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIPPDecisionSupport : { 
objDrugWarnings:WarningItems.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetIPPFavouritesDefaultFolder : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIPPFavouritesDefaultFolder : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetMCpresitem : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMCpresitem : { 
oContextInformation:CContextInformation.prototype ,
objIPPMCPresctiptionItem:IPPMCPresctiptionItem.prototype ,

 },CContextInformation : { 
Current:CContextInformation.prototype ,
Errors:CError.prototype
 },
 }
 const charPropertyLookup = [
  'IsCurrent',
  'IsDoseCombinationsDefined',
  'IsSupplyRequested',
  'IsTechValidateCA','MonPeriodMand','IsExcludeGuidanceInSearch',
  'IsAdministered','IsControlledDrug',
  'IsCriticalMedication',
  'IsPGD',
  'Status',
  'IsPRNDose','IsDrugApprovalRequired','IsConflictsExists','IsDoseCalcExist','IsAmendment','IsNonformulary','ReplaceDrugActiveStatus','DrugVersionMatch','HIIsAckn','IsReoderIconEnable','IssIDSNewMeds','IsInclude72HrsCompletedORDisconItem','IsVolumeBasedInfusion',
  'IsSupplyReq',
  'IsPresItemLevelDispense','ExistsOnAdmission',
  'IsFixedAdministration','StatIndicator','PRNScheduledDet',
  'IsDaywise',
  'HasWarnings','IsHold','PrintStatus','HasDoseCalculation',
  'IsCurrentMedication','IsDeactivated',
  'LineIndicator',
  'IsOxygen',
  'UpdatePatientRecord','IsDailyDose',
  'CanDoseBeChanged','HasProhibitedRoute',
  'IsPCA',
  'IsActionPerformed',
  'NotifyFlag',
  'IsTechnicallyValidated',
  'HasDataFilter','EncounterID','CondDoseMonPeriodReq','IsOxygenCustom','CondDoseMonPeriodReqCustom','IsCDForFDBEData','IsPresItemVPforAP',
  'IsPRN',
  'AlreadyPrescribedItem','ProfileCancelledDrugFlag','ProfileDiscontinuedDrugFlag','ConflictCheck',
  'IsDisplayDRCConflict','IsOpenDRCTab',
  'IsPresLvlDispense',
  'IsPresItemStatusComplete',
  'IsCondDoseMonitoringPeriodReq',
  'IsInfusionFluid',
  'DisplayConflicts','TurnOnDRC',
  'ExcludeSearch',
  'isMCbrand',
  'IsBreakBC',
  'bStatus',
  'cIsDefaultBC',
  'cFollowupStatBC',
  'IsMainAppConflictsBC'
]
export const CharExceptionList = {'Status': [PresItemIPPRequestDetails.prototype,ClinicalVerificationHistoryOp.prototype,DRCConflict.prototype,DRCConflictDetails.prototype,Route.prototype,PresItemRequestDetails.prototype,PrescriptionItemResponse.prototype,MonographInfo.prototype,PrescribeItemBase.prototype,ProcessingInfo.prototype,AdminInstruction.prototype,StatusHistory.prototype,OrderSetPrescriptionItems.prototype,Ingredient.prototype,CResMsgGetOrderSetStatus.prototype,GPConnectItemAdditionalDetail.prototype,SequentialPresriptionItem.prototype],

'EncounterID': [PrescriptionBasicData.prototype,EncounterDetails.prototype],

'PrintStatus': Prescription.prototype,
'IsControlledDrug': [PresItemCommonProperties.prototype,PGDListDetail.prototype],

'IsPRN': Frequency.prototype,
'IsPresItemLevelDispense': PresItemBasicPropertiesView.prototype,
'IsCurrent': ReviewAfterDetail.prototype,
'IsInfusionFluid': DrugItemBasicInfo.prototype,
}
 
  export const iTypeArrayExceptionList = {
    "DoseRegime": DoseRegime.prototype,
    "ScheduledTimes": Scheduledetails.prototype
  };
   const utcDateTimeExceptionList={
    "StartDTTM": [PrescriptionItemBasicData.prototype, DoseRegime.prototype],
    "EndDTTM": [PrescriptionItemBasicData.prototype, DoseRegime.prototype],
    "ScheduleDate": IPPScheduledetails.prototype,
    "scheduleDTTM": TitratedDoseRegime.prototype,
    "AdministredDate": PrescriptionItemAdminDetails.prototype,
    "SlotScheduleDate": PrescriptionItemAdminDetails.prototype
  }
  const configuration = {
    exceptionList :{
      CharExceptionList:CharExceptionList,
      utcDateTimeExceptionList:utcDateTimeExceptionList,
      iTypeArrayExceptionList:iTypeArrayExceptionList 
  },
  isZuluFormat:true // true if utcdatetime to be applied for all datetime or some datetime are zulu and some are utc
  }

export class ArrayOfLong extends ObservableCollection<long>{}
