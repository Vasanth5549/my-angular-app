import { int64, int16, int32, uInt16, uInt32, uInt64, byte, long, double, decimal, DelegateArgs, CContextInformation, CLZOObject} from "epma-platform/models";
import { ObservableCollection } from "../models/observable-collection";
import DateTime from "../services/datetime.service";
import { HelperService } from "./helper.service";
export class MedicationAdministrationWSSoapClient{

GetPreviousSeqItemActiveCompleted: Function;
GetPreviousSeqItemActiveAsync(oCReqMsgGetPreviousSeqItemActive:CReqMsgGetPreviousSeqItemActive ) : void {
  HelperService.Invoke<CReqMsgGetPreviousSeqItemActive,CResMsgGetPreviousSeqItemActive,GetPreviousSeqItemActiveCompletedEventArgs>("MedicationAdministrationWS.GetPreviousSeqItemActive",oCReqMsgGetPreviousSeqItemActive,this.GetPreviousSeqItemActiveCompleted,"PatientOID",new GetPreviousSeqItemActiveCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetIsMedBarCodeConfigMandatoryCompleted: Function;
GetIsMedBarCodeConfigMandatoryAsync(oCReqMsgGetIsMedBarCodeConfigMandatory:CReqMsgGetIsMedBarCodeConfigMandatory ) : void {
  HelperService.Invoke<CReqMsgGetIsMedBarCodeConfigMandatory,CResMsgGetIsMedBarCodeConfigMandatory,GetIsMedBarCodeConfigMandatoryCompletedEventArgs>("MedicationAdministrationWS.GetIsMedBarCodeConfigMandatory",oCReqMsgGetIsMedBarCodeConfigMandatory,this.GetIsMedBarCodeConfigMandatoryCompleted,"oMedBarCodeConfigRequest",new GetIsMedBarCodeConfigMandatoryCompletedEventArgs(), prototypeList, charPropertyLookup);
}

InsertMedBarcodeScanLogCompleted: Function;
InsertMedBarcodeScanLogAsync(oCReqMsgInsertMedBarcodeScanLog:CReqMsgInsertMedBarcodeScanLog ) : void {
  HelperService.Invoke<CReqMsgInsertMedBarcodeScanLog,CResMsgInsertMedBarcodeScanLog,InsertMedBarcodeScanLogCompletedEventArgs>("MedicationAdministrationWS.InsertMedBarcodeScanLog",oCReqMsgInsertMedBarcodeScanLog,this.InsertMedBarcodeScanLogCompleted,"oMedBarcodeScanLogRequest",new InsertMedBarcodeScanLogCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMedicationScanDetailsCompleted: Function;
GetMedicationScanDetailsAsync(oCReqMsgGetMedicationScanDetails:CReqMsgGetMedicationScanDetails ) : void {
  HelperService.Invoke<CReqMsgGetMedicationScanDetails,CResMsgGetMedicationScanDetails,GetMedicationScanDetailsCompletedEventArgs>("MedicationAdministrationWS.GetMedicationScanDetails",oCReqMsgGetMedicationScanDetails,this.GetMedicationScanDetailsCompleted,"oMedicationScanDetailsRequest",new GetMedicationScanDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetIsClinicalEncExistsCompleted: Function;
GetIsClinicalEncExistsAsync(oCReqMsgGetIsClinicalEncExists:CReqMsgGetIsClinicalEncExists ) : void {
  HelperService.Invoke<CReqMsgGetIsClinicalEncExists,CResMsgGetIsClinicalEncExists,GetIsClinicalEncExistsCompletedEventArgs>("MedicationAdministrationWS.GetIsClinicalEncExists",oCReqMsgGetIsClinicalEncExists,this.GetIsClinicalEncExistsCompleted,"EncounterOID",new GetIsClinicalEncExistsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMedScanBatchExpiryDetailsCompleted: Function;
GetMedScanBatchExpiryDetailsAsync(oCReqMsgGetMedScanBatchExpiryDetails:CReqMsgGetMedScanBatchExpiryDetails ) : void {
  HelperService.Invoke<CReqMsgGetMedScanBatchExpiryDetails,CResMsgGetMedScanBatchExpiryDetails,GetMedScanBatchExpiryDetailsCompletedEventArgs>("MedicationAdministrationWS.GetMedScanBatchExpiryDetails",oCReqMsgGetMedScanBatchExpiryDetails,this.GetMedScanBatchExpiryDetailsCompleted,"PrescriptionItemScheduleOID",new GetMedScanBatchExpiryDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ModifyAdministrationCompleted: Function;
ModifyAdministrationAsync(oCReqMsgModifyAdministration:CReqMsgModifyAdministration ) : void {
  HelperService.Invoke<CReqMsgModifyAdministration,CResMsgModifyAdministration,ModifyAdministrationCompletedEventArgs>("MedicationAdministrationWS.ModifyAdministration",oCReqMsgModifyAdministration,this.ModifyAdministrationCompleted,"objSlotDetail",new ModifyAdministrationCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetActiveMedicationsCompleted: Function;
GetActiveMedicationsAsync(oCReqMsgGetActiveMedications:CReqMsgGetActiveMedications ) : void {
  HelperService.Invoke<CReqMsgGetActiveMedications,CResMsgGetActiveMedications,GetActiveMedicationsCompletedEventArgs>("MedicationAdministrationWS.GetActiveMedications",oCReqMsgGetActiveMedications,this.GetActiveMedicationsCompleted,"PatientOID",new GetActiveMedicationsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetRecordAdministionDetailsCompleted: Function;
GetRecordAdministionDetailsAsync(oCReqMsgGetRecordAdministionDetails:CReqMsgGetRecordAdministionDetails ) : void {
  HelperService.Invoke<CReqMsgGetRecordAdministionDetails,CResMsgGetRecordAdministionDetails,GetRecordAdministionDetailsCompletedEventArgs>("MedicationAdministrationWS.GetRecordAdministionDetails",oCReqMsgGetRecordAdministionDetails,this.GetRecordAdministionDetailsCompleted,"IsIncludeInfusions",new GetRecordAdministionDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

OmitSlotsCompleted: Function;
OmitSlotsAsync(oCReqMsgOmitSlots:CReqMsgOmitSlots ) : void {
  HelperService.Invoke<CReqMsgOmitSlots,CResMsgOmitSlots,OmitSlotsCompletedEventArgs>("MedicationAdministrationWS.OmitSlots",oCReqMsgOmitSlots,this.OmitSlotsCompleted,"oOmitSlotsParams",new OmitSlotsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ReinstateSlotsCompleted: Function;
ReinstateSlotsAsync(oCReqMsgReinstateSlots:CReqMsgReinstateSlots ) : void {
  HelperService.Invoke<CReqMsgReinstateSlots,CResMsgReinstateSlots,ReinstateSlotsCompletedEventArgs>("MedicationAdministrationWS.ReinstateSlots",oCReqMsgReinstateSlots,this.ReinstateSlotsCompleted,"oReinstateSlotParams",new ReinstateSlotsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

UpdateTitratedDoseCompleted: Function;
UpdateTitratedDoseAsync(oCReqMsgUpdateTitratedDose:CReqMsgUpdateTitratedDose ) : void {
  HelperService.Invoke<CReqMsgUpdateTitratedDose,CResMsgUpdateTitratedDose,UpdateTitratedDoseCompletedEventArgs>("MedicationAdministrationWS.UpdateTitratedDose",oCReqMsgUpdateTitratedDose,this.UpdateTitratedDoseCompleted,"oDoseSchedule",new UpdateTitratedDoseCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetIngredientAdminstrationCountCompleted: Function;
GetIngredientAdminstrationCountAsync(oCReqMsgGetIngredientAdminstrationCount:CReqMsgGetIngredientAdminstrationCount ) : void {
  HelperService.Invoke<CReqMsgGetIngredientAdminstrationCount,CResMsgGetIngredientAdminstrationCount,GetIngredientAdminstrationCountCompletedEventArgs>("MedicationAdministrationWS.GetIngredientAdminstrationCount",oCReqMsgGetIngredientAdminstrationCount,this.GetIngredientAdminstrationCountCompleted,"IngAdminParams",new GetIngredientAdminstrationCountCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetConditionalDoseRegimeCompleted: Function;
GetConditionalDoseRegimeAsync(oCReqMsgGetConditionalDoseRegime:CReqMsgGetConditionalDoseRegime ) : void {
  HelperService.Invoke<CReqMsgGetConditionalDoseRegime,CResMsgGetConditionalDoseRegime,GetConditionalDoseRegimeCompletedEventArgs>("MedicationAdministrationWS.GetConditionalDoseRegime",oCReqMsgGetConditionalDoseRegime,this.GetConditionalDoseRegimeCompleted,"LatestObsResValueReq",new GetConditionalDoseRegimeCompletedEventArgs(), prototypeList, charPropertyLookup);
}

MatchDrugEANCodeCompleted: Function;
MatchDrugEANCodeAsync(oCReqMsgMatchDrugEANCode:CReqMsgMatchDrugEANCode ) : void {
  HelperService.Invoke<CReqMsgMatchDrugEANCode,CResMsgMatchDrugEANCode,MatchDrugEANCodeCompletedEventArgs>("MedicationAdministrationWS.MatchDrugEANCode",oCReqMsgMatchDrugEANCode,this.MatchDrugEANCodeCompleted,"oMatchEANCodeParams",new MatchDrugEANCodeCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetLatestObservationCompleted: Function;
GetLatestObservationAsync(oCReqMsgGetLatestObservation:CReqMsgGetLatestObservation ) : void {
  HelperService.Invoke<CReqMsgGetLatestObservation,CResMsgGetLatestObservation,GetLatestObservationCompletedEventArgs>("MedicationAdministrationWS.GetLatestObservation",oCReqMsgGetLatestObservation,this.GetLatestObservationCompleted,"PatientOID",new GetLatestObservationCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetAdminListForObservationChartCompleted: Function;
GetAdminListForObservationChartAsync(oCReqMsgGetAdminListForObservationChart:CReqMsgGetAdminListForObservationChart ) : void {
  HelperService.Invoke<CReqMsgGetAdminListForObservationChart,CResMsgGetAdminListForObservationChart,GetAdminListForObservationChartCompletedEventArgs>("MedicationAdministrationWS.GetAdminListForObservationChart",oCReqMsgGetAdminListForObservationChart,this.GetAdminListForObservationChartCompleted,"PrescriptionItemOID",new GetAdminListForObservationChartCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetLifeviewPrintIPPMACompleted: Function;
GetLifeviewPrintIPPMAAsync(oCReqMsgGetLifeviewPrintIPPMA:CReqMsgGetLifeviewPrintIPPMA ) : void {
  HelperService.Invoke<CReqMsgGetLifeviewPrintIPPMA,CResMsgGetLifeviewPrintIPPMA,GetLifeviewPrintIPPMACompletedEventArgs>("MedicationAdministrationWS.GetLifeviewPrintIPPMA",oCReqMsgGetLifeviewPrintIPPMA,this.GetLifeviewPrintIPPMACompleted,"sMedicationDU",new GetLifeviewPrintIPPMACompletedEventArgs(), prototypeList, charPropertyLookup);
}

RecordInfusionAdministrationCompleted: Function;
RecordInfusionAdministrationAsync(oCReqMsgRecordInfusionAdministration:CReqMsgRecordInfusionAdministration ) : void {
  HelperService.Invoke<CReqMsgRecordInfusionAdministration,CResMsgRecordInfusionAdministration,RecordInfusionAdministrationCompletedEventArgs>("MedicationAdministrationWS.RecordInfusionAdministration",oCReqMsgRecordInfusionAdministration,this.RecordInfusionAdministrationCompleted,"bIsPRN",new RecordInfusionAdministrationCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetCompatibleComponentDetCompleted: Function;
GetCompatibleComponentDetAsync(oCReqMsgGetCompatibleComponentDet:CReqMsgGetCompatibleComponentDet ) : void {
  HelperService.Invoke<CReqMsgGetCompatibleComponentDet,CResMsgGetCompatibleComponentDet,GetCompatibleComponentDetCompletedEventArgs>("MedicationAdministrationWS.GetCompatibleComponentDet",oCReqMsgGetCompatibleComponentDet,this.GetCompatibleComponentDetCompleted,"sMcversionNo",new GetCompatibleComponentDetCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetItemDispVolandDoseUOMDetCompleted: Function;
GetItemDispVolandDoseUOMDetAsync(oCReqMsgGetItemDispVolandDoseUOMDet:CReqMsgGetItemDispVolandDoseUOMDet ) : void {
  HelperService.Invoke<CReqMsgGetItemDispVolandDoseUOMDet,CResMsgGetItemDispVolandDoseUOMDet,GetItemDispVolandDoseUOMDetCompletedEventArgs>("MedicationAdministrationWS.GetItemDispVolandDoseUOMDet",oCReqMsgGetItemDispVolandDoseUOMDet,this.GetItemDispVolandDoseUOMDetCompleted,"sMcversionNo",new GetItemDispVolandDoseUOMDetCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetUOMTypeListCompleted: Function;
GetUOMTypeListAsync(oCReqMsgGetUOMTypeList:CReqMsgGetUOMTypeList ) : void {
  HelperService.Invoke<CReqMsgGetUOMTypeList,CResMsgGetUOMTypeList,GetUOMTypeListCompletedEventArgs>("MedicationAdministrationWS.GetUOMTypeList",oCReqMsgGetUOMTypeList,this.GetUOMTypeListCompleted,"MCVersionNumber",new GetUOMTypeListCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetAllBagDetailsCompleted: Function;
GetAllBagDetailsAsync(oCReqMsgGetAllBagDetails:CReqMsgGetAllBagDetails ) : void {
  HelperService.Invoke<CReqMsgGetAllBagDetails,CResMsgGetAllBagDetails,GetAllBagDetailsCompletedEventArgs>("MedicationAdministrationWS.GetAllBagDetails",oCReqMsgGetAllBagDetails,this.GetAllBagDetailsCompleted,"MCVersionNumber",new GetAllBagDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

DrugPrepMatchEANCodeCompleted: Function;
DrugPrepMatchEANCodeAsync(oCReqMsgDrugPrepMatchEANCode:CReqMsgDrugPrepMatchEANCode ) : void {
  HelperService.Invoke<CReqMsgDrugPrepMatchEANCode,CResMsgDrugPrepMatchEANCode,DrugPrepMatchEANCodeCompletedEventArgs>("MedicationAdministrationWS.DrugPrepMatchEANCode",oCReqMsgDrugPrepMatchEANCode,this.DrugPrepMatchEANCodeCompleted,"oDrugPrepEANCheckParams",new DrugPrepMatchEANCodeCompletedEventArgs(), prototypeList, charPropertyLookup);
}

StrikeThroughInfusionAdminCompleted: Function;
StrikeThroughInfusionAdminAsync(oCReqMsgStrikeThroughInfusionAdmin:CReqMsgStrikeThroughInfusionAdmin ) : void {
  HelperService.Invoke<CReqMsgStrikeThroughInfusionAdmin,CResMsgStrikeThroughInfusionAdmin,StrikeThroughInfusionAdminCompletedEventArgs>("MedicationAdministrationWS.StrikeThroughInfusionAdmin",oCReqMsgStrikeThroughInfusionAdmin,this.StrikeThroughInfusionAdminCompleted,"oStrikethroughAdmin",new StrikeThroughInfusionAdminCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetAllinfuactchldDetlCompleted: Function;
GetAllinfuactchldDetlAsync(oCReqMsgGetAllinfuactchldDetl:CReqMsgGetAllinfuactchldDetl ) : void {
  HelperService.Invoke<CReqMsgGetAllinfuactchldDetl,CResMsgGetAllinfuactchldDetl,GetAllinfuactchldDetlCompletedEventArgs>("MedicationAdministrationWS.GetAllinfuactchldDetl",oCReqMsgGetAllinfuactchldDetl,this.GetAllinfuactchldDetlCompleted,"IsFetchRecentActionOnly",new GetAllinfuactchldDetlCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetAllstrikethrdtlCompleted: Function;
GetAllstrikethrdtlAsync(oCReqMsgGetAllstrikethrdtl:CReqMsgGetAllstrikethrdtl ) : void {
  HelperService.Invoke<CReqMsgGetAllstrikethrdtl,CResMsgGetAllstrikethrdtl,GetAllstrikethrdtlCompletedEventArgs>("MedicationAdministrationWS.GetAllstrikethrdtl",oCReqMsgGetAllstrikethrdtl,this.GetAllstrikethrdtlCompleted,"MCVersionNumber",new GetAllstrikethrdtlCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetStrikeinfchldDetlCompleted: Function;
GetStrikeinfchldDetlAsync(oCReqMsgGetStrikeinfchldDetl:CReqMsgGetStrikeinfchldDetl ) : void {
  HelperService.Invoke<CReqMsgGetStrikeinfchldDetl,CResMsgGetStrikeinfchldDetl,GetStrikeinfchldDetlCompletedEventArgs>("MedicationAdministrationWS.GetStrikeinfchldDetl",oCReqMsgGetStrikeinfchldDetl,this.GetStrikeinfchldDetlCompleted,"PatientOID",new GetStrikeinfchldDetlCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetInfRecAdminDefaultValuesCompleted: Function;
GetInfRecAdminDefaultValuesAsync(oCReqMsgGetInfRecAdminDefaultValues:CReqMsgGetInfRecAdminDefaultValues ) : void {
  HelperService.Invoke<CReqMsgGetInfRecAdminDefaultValues,CResMsgGetInfRecAdminDefaultValues,GetInfRecAdminDefaultValuesCompletedEventArgs>("MedicationAdministrationWS.GetInfRecAdminDefaultValues",oCReqMsgGetInfRecAdminDefaultValues,this.GetInfRecAdminDefaultValuesCompleted,"oInfSumaryViewParams",new GetInfRecAdminDefaultValuesCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetLatestObsOrResultDetailsCompleted: Function;
GetLatestObsOrResultDetailsAsync(oCReqMsgGetLatestObsOrResultDetails:CReqMsgGetLatestObsOrResultDetails ) : void {
  HelperService.Invoke<CReqMsgGetLatestObsOrResultDetails,CResMsgGetLatestObsOrResultDetails,GetLatestObsOrResultDetailsCompletedEventArgs>("MedicationAdministrationWS.GetLatestObsOrResultDetails",oCReqMsgGetLatestObsOrResultDetails,this.GetLatestObsOrResultDetailsCompleted,"oPatLatObsResParams",new GetLatestObsOrResultDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

SubmitMedRequestsCompleted: Function;
SubmitMedRequestsAsync(oCReqMsgSubmitMedRequests:CReqMsgSubmitMedRequests ) : void {
  HelperService.Invoke<CReqMsgSubmitMedRequests,CResMsgSubmitMedRequests,SubmitMedRequestsCompletedEventArgs>("MedicationAdministrationWS.SubmitMedRequests",oCReqMsgSubmitMedRequests,this.SubmitMedRequestsCompleted,"nJobRoleOID",new SubmitMedRequestsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPresItemParentChildDetailCompleted: Function;
GetPresItemParentChildDetailAsync(oCReqMsgGetPresItemParentChildDetail:CReqMsgGetPresItemParentChildDetail ) : void {
  HelperService.Invoke<CReqMsgGetPresItemParentChildDetail,CResMsgGetPresItemParentChildDetail,GetPresItemParentChildDetailCompletedEventArgs>("MedicationAdministrationWS.GetPresItemParentChildDetail",oCReqMsgGetPresItemParentChildDetail,this.GetPresItemParentChildDetailCompleted,"PITSTCode",new GetPresItemParentChildDetailCompletedEventArgs(), prototypeList, charPropertyLookup);
}

WhenOmitLaunchCompleted: Function;
WhenOmitLaunchAsync(oCReqMsgWhenOmitLaunch:CReqMsgWhenOmitLaunch ) : void {
  HelperService.Invoke<CReqMsgWhenOmitLaunch,CResMsgWhenOmitLaunch,WhenOmitLaunchCompletedEventArgs>("MedicationAdministrationWS.WhenOmitLaunch",oCReqMsgWhenOmitLaunch,this.WhenOmitLaunchCompleted,"oOmitLaunchParams",new WhenOmitLaunchCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ListHardCodedLzoIdMappingCompleted: Function;
ListHardCodedLzoIdMappingAsync(oCReqMsgListHardCodedLzoIdMapping:CReqMsgListHardCodedLzoIdMapping ) : void {
  HelperService.Invoke<CReqMsgListHardCodedLzoIdMapping,CResMsgListHardCodedLzoIdMapping,ListHardCodedLzoIdMappingCompletedEventArgs>("MedicationAdministrationWS.ListHardCodedLzoIdMapping",oCReqMsgListHardCodedLzoIdMapping,this.ListHardCodedLzoIdMappingCompleted,"currentOrganisationOid",new ListHardCodedLzoIdMappingCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPrintMedicationAdminReportCompleted: Function;
GetPrintMedicationAdminReportAsync(oCReqMsgGetPrintMedicationAdminReport:CReqMsgGetPrintMedicationAdminReport ) : void {
  HelperService.Invoke<CReqMsgGetPrintMedicationAdminReport,CResMsgGetPrintMedicationAdminReport,GetPrintMedicationAdminReportCompletedEventArgs>("MedicationAdministrationWS.GetPrintMedicationAdminReport",oCReqMsgGetPrintMedicationAdminReport,this.GetPrintMedicationAdminReportCompleted,"oPrintMedChartParams",new GetPrintMedicationAdminReportCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMedicationChartCompleted: Function;
GetMedicationChartAsync(oCReqMsgGetMedicationChart:CReqMsgGetMedicationChart ) : void {
  HelperService.Invoke<CReqMsgGetMedicationChart,CResMsgGetMedicationChart,GetMedicationChartCompletedEventArgs>("MedicationAdministrationWS.GetMedicationChart",oCReqMsgGetMedicationChart,this.GetMedicationChartCompleted,"ViewMedChartParams",new GetMedicationChartCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMedChartInfoByPatOrEncCompleted: Function;
GetMedChartInfoByPatOrEncAsync(oCReqMsgGetMedChartInfoByPatOrEnc:CReqMsgGetMedChartInfoByPatOrEnc ) : void {
  HelperService.Invoke<CReqMsgGetMedChartInfoByPatOrEnc,CResMsgGetMedChartInfoByPatOrEnc,GetMedChartInfoByPatOrEncCompletedEventArgs>("MedicationAdministrationWS.GetMedChartInfoByPatOrEnc",oCReqMsgGetMedChartInfoByPatOrEnc,this.GetMedChartInfoByPatOrEncCompleted,"lnEncounterOID",new GetMedChartInfoByPatOrEncCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetEncounterDetailsForMedChartCompleted: Function;
GetEncounterDetailsForMedChartAsync(oCReqMsgGetEncounterDetailsForMedChart:CReqMsgGetEncounterDetailsForMedChart ) : void {
  HelperService.Invoke<CReqMsgGetEncounterDetailsForMedChart,CResMsgGetEncounterDetailsForMedChart,GetEncounterDetailsForMedChartCompletedEventArgs>("MedicationAdministrationWS.GetEncounterDetailsForMedChart",oCReqMsgGetEncounterDetailsForMedChart,this.GetEncounterDetailsForMedChartCompleted,"MedChartOID",new GetEncounterDetailsForMedChartCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetLockedUsersDetailsCompleted: Function;
GetLockedUsersDetailsAsync(oCReqMsgGetLockedUsersDetails:CReqMsgGetLockedUsersDetails ) : void {
  HelperService.Invoke<CReqMsgGetLockedUsersDetails,CResMsgGetLockedUsersDetails,GetLockedUsersDetailsCompletedEventArgs>("MedicationAdministrationWS.GetLockedUsersDetails",oCReqMsgGetLockedUsersDetails,this.GetLockedUsersDetailsCompleted,"objAppWarnData",new GetLockedUsersDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

UpdateLockingStatusToDeactivatedCompleted: Function;
UpdateLockingStatusToDeactivatedAsync(oCReqMsgUpdateLockingStatusToDeactivated:CReqMsgUpdateLockingStatusToDeactivated ) : void {
  HelperService.Invoke<CReqMsgUpdateLockingStatusToDeactivated,CResMsgUpdateLockingStatusToDeactivated,UpdateLockingStatusToDeactivatedCompletedEventArgs>("MedicationAdministrationWS.UpdateLockingStatusToDeactivated",oCReqMsgUpdateLockingStatusToDeactivated,this.UpdateLockingStatusToDeactivatedCompleted,"sKeyCodes",new UpdateLockingStatusToDeactivatedCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMedicationChartForPrintCompleted: Function;
GetMedicationChartForPrintAsync(oCReqMsgGetMedicationChartForPrint:CReqMsgGetMedicationChartForPrint ) : void {
  HelperService.Invoke<CReqMsgGetMedicationChartForPrint,CResMsgGetMedicationChartForPrint,GetMedicationChartForPrintCompletedEventArgs>("MedicationAdministrationWS.GetMedicationChartForPrint",oCReqMsgGetMedicationChartForPrint,this.GetMedicationChartForPrintCompleted,"oPrintMedChartParams",new GetMedicationChartForPrintCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMedicationChartOverviewCompleted: Function;
GetMedicationChartOverviewAsync(oCReqMsgGetMedicationChartOverview:CReqMsgGetMedicationChartOverview ) : void {
  HelperService.Invoke<CReqMsgGetMedicationChartOverview,CResMsgGetMedicationChartOverview,GetMedicationChartOverviewCompletedEventArgs>("MedicationAdministrationWS.GetMedicationChartOverview",oCReqMsgGetMedicationChartOverview,this.GetMedicationChartOverviewCompleted,"OverviewMedChartParams",new GetMedicationChartOverviewCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPrescriptionChartCompleted: Function;
GetPrescriptionChartAsync(oCReqMsgGetPrescriptionChart:CReqMsgGetPrescriptionChart ) : void {
  HelperService.Invoke<CReqMsgGetPrescriptionChart,CResMsgGetPrescriptionChart,GetPrescriptionChartCompletedEventArgs>("MedicationAdministrationWS.GetPrescriptionChart",oCReqMsgGetPrescriptionChart,this.GetPrescriptionChartCompleted,"ViewPrescChartParams",new GetPrescriptionChartCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetInfusionChartCompleted: Function;
GetInfusionChartAsync(oCReqMsgGetInfusionChart:CReqMsgGetInfusionChart ) : void {
  HelperService.Invoke<CReqMsgGetInfusionChart,CResMsgGetInfusionChart,GetInfusionChartCompletedEventArgs>("MedicationAdministrationWS.GetInfusionChart",oCReqMsgGetInfusionChart,this.GetInfusionChartCompleted,"ViewMedChartParams",new GetInfusionChartCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetIsInfusionChartAlertExistsCompleted: Function;
GetIsInfusionChartAlertExistsAsync(oCReqMsgGetIsInfusionChartAlertExists:CReqMsgGetIsInfusionChartAlertExists ) : void {
  HelperService.Invoke<CReqMsgGetIsInfusionChartAlertExists,CResMsgGetIsInfusionChartAlertExists,GetIsInfusionChartAlertExistsCompletedEventArgs>("MedicationAdministrationWS.GetIsInfusionChartAlertExists",oCReqMsgGetIsInfusionChartAlertExists,this.GetIsInfusionChartAlertExistsCompleted,"oParams",new GetIsInfusionChartAlertExistsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

UpdateMedChartForHomeLeaveCompleted: Function;
UpdateMedChartForHomeLeaveAsync(oCReqMsgUpdateMedChartForHomeLeave:CReqMsgUpdateMedChartForHomeLeave ) : void {
  HelperService.Invoke<CReqMsgUpdateMedChartForHomeLeave,CResMsgUpdateMedChartForHomeLeave,UpdateMedChartForHomeLeaveCompletedEventArgs>("MedicationAdministrationWS.UpdateMedChartForHomeLeave",oCReqMsgUpdateMedChartForHomeLeave,this.UpdateMedChartForHomeLeaveCompleted,"oMedChartSetHomeLeaveStatusParams",new UpdateMedChartForHomeLeaveCompletedEventArgs(), prototypeList, charPropertyLookup);
}

StrikethroughAdminCompleted: Function;
StrikethroughAdminAsync(oCReqMsgStrikethroughAdmin:CReqMsgStrikethroughAdmin ) : void {
  HelperService.Invoke<CReqMsgStrikethroughAdmin,CResMsgStrikethroughAdmin,StrikethroughAdminCompletedEventArgs>("MedicationAdministrationWS.StrikethroughAdmin",oCReqMsgStrikethroughAdmin,this.StrikethroughAdminCompleted,"oStrikethroughAdmin",new StrikethroughAdminCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetAdminMultiSlotCompleted: Function;
GetAdminMultiSlotAsync(oCReqMsgGetAdminMultiSlot:CReqMsgGetAdminMultiSlot ) : void {
  HelperService.Invoke<CReqMsgGetAdminMultiSlot,CResMsgGetAdminMultiSlot,GetAdminMultiSlotCompletedEventArgs>("MedicationAdministrationWS.GetAdminMultiSlot",oCReqMsgGetAdminMultiSlot,this.GetAdminMultiSlotCompleted,"oMultiSlotParams",new GetAdminMultiSlotCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDrugroundViewCompleted: Function;
GetDrugroundViewAsync(oCReqMsgGetDrugroundView:CReqMsgGetDrugroundView ) : void {
  HelperService.Invoke<CReqMsgGetDrugroundView,CResMsgGetDrugroundView,GetDrugroundViewCompletedEventArgs>("MedicationAdministrationWS.GetDrugroundView",oCReqMsgGetDrugroundView,this.GetDrugroundViewCompleted,"oDrugroundViewParams",new GetDrugroundViewCompletedEventArgs(), prototypeList, charPropertyLookup);
}

IsPGDListsAvailableCompleted: Function;
IsPGDListsAvailableAsync(oCReqMsgIsPGDListsAvailable:CReqMsgIsPGDListsAvailable ) : void {
  HelperService.Invoke<CReqMsgIsPGDListsAvailable,CResMsgIsPGDListsAvailable,IsPGDListsAvailableCompletedEventArgs>("MedicationAdministrationWS.IsPGDListsAvailable",oCReqMsgIsPGDListsAvailable,this.IsPGDListsAvailableCompleted,"medChartOID",new IsPGDListsAvailableCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetAssociatedPGDListItemCompleted: Function;
GetAssociatedPGDListItemAsync(oCReqMsgGetAssociatedPGDListItem:CReqMsgGetAssociatedPGDListItem ) : void {
  HelperService.Invoke<CReqMsgGetAssociatedPGDListItem,CResMsgGetAssociatedPGDListItem,GetAssociatedPGDListItemCompletedEventArgs>("MedicationAdministrationWS.GetAssociatedPGDListItem",oCReqMsgGetAssociatedPGDListItem,this.GetAssociatedPGDListItemCompleted,"DuenessWindowTimeMinutes",new GetAssociatedPGDListItemCompletedEventArgs(), prototypeList, charPropertyLookup);
}

RecordPGDCompleted: Function;
RecordPGDAsync(oCReqMsgRecordPGD:CReqMsgRecordPGD ) : void {
  HelperService.Invoke<CReqMsgRecordPGD,CResMsgRecordPGD,RecordPGDCompletedEventArgs>("MedicationAdministrationWS.RecordPGD",oCReqMsgRecordPGD,this.RecordPGDCompleted,"sRoleName",new RecordPGDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetSlotInfoByOidCompleted: Function;
GetSlotInfoByOidAsync(oCReqMsgGetSlotInfoByOid:CReqMsgGetSlotInfoByOid ) : void {
  HelperService.Invoke<CReqMsgGetSlotInfoByOid,CResMsgGetSlotInfoByOid,GetSlotInfoByOidCompletedEventArgs>("MedicationAdministrationWS.GetSlotInfoByOid",oCReqMsgGetSlotInfoByOid,this.GetSlotInfoByOidCompleted,"IsIncludeInfusions",new GetSlotInfoByOidCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetAmendedPresDetailCompleted: Function;
GetAmendedPresDetailAsync(oCReqMsgGetAmendedPresDetail:CReqMsgGetAmendedPresDetail ) : void {
  HelperService.Invoke<CReqMsgGetAmendedPresDetail,CResMsgGetAmendedPresDetail,GetAmendedPresDetailCompletedEventArgs>("MedicationAdministrationWS.GetAmendedPresDetail",oCReqMsgGetAmendedPresDetail,this.GetAmendedPresDetailCompleted,"MCVersion",new GetAmendedPresDetailCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetTitratedDoseDetailCompleted: Function;
GetTitratedDoseDetailAsync(oCReqMsgGetTitratedDoseDetail:CReqMsgGetTitratedDoseDetail ) : void {
  HelperService.Invoke<CReqMsgGetTitratedDoseDetail,CResMsgGetTitratedDoseDetail,GetTitratedDoseDetailCompletedEventArgs>("MedicationAdministrationWS.GetTitratedDoseDetail",oCReqMsgGetTitratedDoseDetail,this.GetTitratedDoseDetailCompleted,"PatientOID",new GetTitratedDoseDetailCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetAdministrationListCompleted: Function;
GetAdministrationListAsync(oCReqMsgGetAdministrationList:CReqMsgGetAdministrationList ) : void {
  HelperService.Invoke<CReqMsgGetAdministrationList,CResMsgGetAdministrationList,GetAdministrationListCompletedEventArgs>("MedicationAdministrationWS.GetAdministrationList",oCReqMsgGetAdministrationList,this.GetAdministrationListCompleted,"PrescriptionItemOID",new GetAdministrationListCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetAdministrationListDetailsCompleted: Function;
GetAdministrationListDetailsAsync(oCReqMsgGetAdministrationListDetails:CReqMsgGetAdministrationListDetails ) : void {
  HelperService.Invoke<CReqMsgGetAdministrationListDetails,CResMsgGetAdministrationListDetails,GetAdministrationListDetailsCompletedEventArgs>("MedicationAdministrationWS.GetAdministrationListDetails",oCReqMsgGetAdministrationListDetails,this.GetAdministrationListDetailsCompleted,"MedAdminOID",new GetAdministrationListDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetAdminHistoryListCompleted: Function;
GetAdminHistoryListAsync(oCReqMsgGetAdminHistoryList:CReqMsgGetAdminHistoryList ) : void {
  HelperService.Invoke<CReqMsgGetAdminHistoryList,CResMsgGetAdminHistoryList,GetAdminHistoryListCompletedEventArgs>("MedicationAdministrationWS.GetAdminHistoryList",oCReqMsgGetAdminHistoryList,this.GetAdminHistoryListCompleted,"PatientOID",new GetAdminHistoryListCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetAdminHistoryListDetailsCompleted: Function;
GetAdminHistoryListDetailsAsync(oCReqMsgGetAdminHistoryListDetails:CReqMsgGetAdminHistoryListDetails ) : void {
  HelperService.Invoke<CReqMsgGetAdminHistoryListDetails,CResMsgGetAdminHistoryListDetails,GetAdminHistoryListDetailsCompletedEventArgs>("MedicationAdministrationWS.GetAdminHistoryListDetails",oCReqMsgGetAdminHistoryListDetails,this.GetAdminHistoryListDetailsCompleted,"MCVersionNo",new GetAdminHistoryListDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

RecordAdministrationCompleted: Function;
RecordAdministrationAsync(oCReqMsgRecordAdministration:CReqMsgRecordAdministration ) : void {
  HelperService.Invoke<CReqMsgRecordAdministration,CResMsgRecordAdministration,RecordAdministrationCompletedEventArgs>("MedicationAdministrationWS.RecordAdministration",oCReqMsgRecordAdministration,this.RecordAdministrationCompleted,"bIsPRN",new RecordAdministrationCompletedEventArgs(), prototypeList, charPropertyLookup);
}

DummyMethodCompleted: Function;
DummyMethodAsync(oCReqMsgDummyMethod:CReqMsgDummyMethod ) : void {
  HelperService.Invoke<CReqMsgDummyMethod,CResMsgDummyMethod,DummyMethodCompletedEventArgs>("MedicationAdministrationWS.DummyMethod",oCReqMsgDummyMethod,this.DummyMethodCompleted,"oIPPPrescriptionItem",new DummyMethodCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetSelfAdminDetailsCompleted: Function;
GetSelfAdminDetailsAsync(oCReqMsgGetSelfAdminDetails:CReqMsgGetSelfAdminDetails ) : void {
  HelperService.Invoke<CReqMsgGetSelfAdminDetails,CResMsgGetSelfAdminDetails,GetSelfAdminDetailsCompletedEventArgs>("MedicationAdministrationWS.GetSelfAdminDetails",oCReqMsgGetSelfAdminDetails,this.GetSelfAdminDetailsCompleted,"objManageSelfAdminParams",new GetSelfAdminDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ManageSelfAdminCompleted: Function;
ManageSelfAdminAsync(oCReqMsgManageSelfAdmin:CReqMsgManageSelfAdmin ) : void {
  HelperService.Invoke<CReqMsgManageSelfAdmin,CResMsgManageSelfAdmin,ManageSelfAdminCompletedEventArgs>("MedicationAdministrationWS.ManageSelfAdmin",oCReqMsgManageSelfAdmin,this.ManageSelfAdminCompleted,"nPatientOID",new ManageSelfAdminCompletedEventArgs(), prototypeList, charPropertyLookup);
}
}

export class GetPreviousSeqItemActiveCompletedEventArgs{
 public Result: CResMsgGetPreviousSeqItemActive;
public Error: any;
}
export class GetIsMedBarCodeConfigMandatoryCompletedEventArgs{
 public Result: CResMsgGetIsMedBarCodeConfigMandatory;
public Error: any;
}
export class InsertMedBarcodeScanLogCompletedEventArgs{
 public Result: CResMsgInsertMedBarcodeScanLog;
public Error: any;
}
export class GetMedicationScanDetailsCompletedEventArgs{
 public Result: CResMsgGetMedicationScanDetails;
public Error: any;
}
export class GetIsClinicalEncExistsCompletedEventArgs{
 public Result: CResMsgGetIsClinicalEncExists;
public Error: any;
}
export class GetMedScanBatchExpiryDetailsCompletedEventArgs{
 public Result: CResMsgGetMedScanBatchExpiryDetails;
public Error: any;
}
export class ModifyAdministrationCompletedEventArgs{
 public Result: CResMsgModifyAdministration;
public Error: any;
}
export class GetActiveMedicationsCompletedEventArgs{
 public Result: CResMsgGetActiveMedications;
public Error: any;
}
export class GetRecordAdministionDetailsCompletedEventArgs{
 public Result: CResMsgGetRecordAdministionDetails;
public Error: any;
}
export class OmitSlotsCompletedEventArgs{
 public Result: CResMsgOmitSlots;
public Error: any;
}
export class ReinstateSlotsCompletedEventArgs{
 public Result: CResMsgReinstateSlots;
public Error: any;
}
export class UpdateTitratedDoseCompletedEventArgs{
 public Result: CResMsgUpdateTitratedDose;
public Error: any;
}
export class GetIngredientAdminstrationCountCompletedEventArgs{
 public Result: CResMsgGetIngredientAdminstrationCount;
public Error: any;
}
export class GetConditionalDoseRegimeCompletedEventArgs{
 public Result: CResMsgGetConditionalDoseRegime;
public Error: any;
}
export class MatchDrugEANCodeCompletedEventArgs{
 public Result: CResMsgMatchDrugEANCode;
public Error: any;
}
export class GetLatestObservationCompletedEventArgs{
 public Result: CResMsgGetLatestObservation;
public Error: any;
}
export class GetAdminListForObservationChartCompletedEventArgs{
 public Result: CResMsgGetAdminListForObservationChart;
public Error: any;
}
export class GetLifeviewPrintIPPMACompletedEventArgs{
 public Result: CResMsgGetLifeviewPrintIPPMA;
public Error: any;
}
export class RecordInfusionAdministrationCompletedEventArgs{
 public Result: CResMsgRecordInfusionAdministration;
public Error: any;
}
export class GetCompatibleComponentDetCompletedEventArgs{
 public Result: CResMsgGetCompatibleComponentDet;
public Error: any;
}
export class GetItemDispVolandDoseUOMDetCompletedEventArgs{
 public Result: CResMsgGetItemDispVolandDoseUOMDet;
public Error: any;
}
export class GetUOMTypeListCompletedEventArgs{
 public Result: CResMsgGetUOMTypeList;
public Error: any;
}
export class GetAllBagDetailsCompletedEventArgs{
 public Result: CResMsgGetAllBagDetails;
public Error: any;
}
export class DrugPrepMatchEANCodeCompletedEventArgs{
 public Result: CResMsgDrugPrepMatchEANCode;
public Error: any;
}
export class StrikeThroughInfusionAdminCompletedEventArgs{
 public Result: CResMsgStrikeThroughInfusionAdmin;
public Error: any;
}
export class GetAllinfuactchldDetlCompletedEventArgs{
 public Result: CResMsgGetAllinfuactchldDetl;
public Error: any;
}
export class GetAllstrikethrdtlCompletedEventArgs{
 public Result: CResMsgGetAllstrikethrdtl;
public Error: any;
}
export class GetStrikeinfchldDetlCompletedEventArgs{
 public Result: CResMsgGetStrikeinfchldDetl;
public Error: any;
}
export class GetInfRecAdminDefaultValuesCompletedEventArgs{
 public Result: CResMsgGetInfRecAdminDefaultValues;
public Error: any;
}
export class GetLatestObsOrResultDetailsCompletedEventArgs{
 public Result: CResMsgGetLatestObsOrResultDetails;
public Error: any;
}
export class SubmitMedRequestsCompletedEventArgs{
 public Result: CResMsgSubmitMedRequests;
public Error: any;
}
export class GetPresItemParentChildDetailCompletedEventArgs{
 public Result: CResMsgGetPresItemParentChildDetail;
public Error: any;
}
export class WhenOmitLaunchCompletedEventArgs{
 public Result: CResMsgWhenOmitLaunch;
public Error: any;
}
export class ListHardCodedLzoIdMappingCompletedEventArgs{
 public Result: CResMsgListHardCodedLzoIdMapping;
public Error: any;
}
export class GetPrintMedicationAdminReportCompletedEventArgs{
 public Result: CResMsgGetPrintMedicationAdminReport;
public Error: any;
}
export class GetMedicationChartCompletedEventArgs{
 public Result: CResMsgGetMedicationChart;
public Error: any;
}
export class GetMedChartInfoByPatOrEncCompletedEventArgs{
 public Result: CResMsgGetMedChartInfoByPatOrEnc;
public Error: any;
}
export class GetEncounterDetailsForMedChartCompletedEventArgs{
 public Result: CResMsgGetEncounterDetailsForMedChart;
public Error: any;
}
export class GetLockedUsersDetailsCompletedEventArgs{
 public Result: CResMsgGetLockedUsersDetails;
public Error: any;
}
export class UpdateLockingStatusToDeactivatedCompletedEventArgs{
 public Result: CResMsgUpdateLockingStatusToDeactivated;
public Error: any;
}
export class GetMedicationChartForPrintCompletedEventArgs{
 public Result: CResMsgGetMedicationChartForPrint;
public Error: any;
}
export class GetMedicationChartOverviewCompletedEventArgs{
 public Result: CResMsgGetMedicationChartOverview;
public Error: any;
}
export class GetPrescriptionChartCompletedEventArgs{
 public Result: CResMsgGetPrescriptionChart;
public Error: any;
}
export class GetInfusionChartCompletedEventArgs{
 public Result: CResMsgGetInfusionChart;
public Error: any;
}
export class GetIsInfusionChartAlertExistsCompletedEventArgs{
 public Result: CResMsgGetIsInfusionChartAlertExists;
public Error: any;
}
export class UpdateMedChartForHomeLeaveCompletedEventArgs{
 public Result: CResMsgUpdateMedChartForHomeLeave;
public Error: any;
}
export class StrikethroughAdminCompletedEventArgs{
 public Result: CResMsgStrikethroughAdmin;
public Error: any;
}
export class GetAdminMultiSlotCompletedEventArgs{
 public Result: CResMsgGetAdminMultiSlot;
public Error: any;
}
export class GetDrugroundViewCompletedEventArgs{
 public Result: CResMsgGetDrugroundView;
public Error: any;
}
export class IsPGDListsAvailableCompletedEventArgs{
 public Result: CResMsgIsPGDListsAvailable;
public Error: any;
}
export class GetAssociatedPGDListItemCompletedEventArgs{
 public Result: CResMsgGetAssociatedPGDListItem;
public Error: any;
}
export class RecordPGDCompletedEventArgs{
 public Result: CResMsgRecordPGD;
public Error: any;
}
export class GetSlotInfoByOidCompletedEventArgs{
 public Result: CResMsgGetSlotInfoByOid;
public Error: any;
}
export class GetAmendedPresDetailCompletedEventArgs{
 public Result: CResMsgGetAmendedPresDetail;
public Error: any;
}
export class GetTitratedDoseDetailCompletedEventArgs{
 public Result: CResMsgGetTitratedDoseDetail;
public Error: any;
}
export class GetAdministrationListCompletedEventArgs{
 public Result: CResMsgGetAdministrationList;
public Error: any;
}
export class GetAdministrationListDetailsCompletedEventArgs{
 public Result: CResMsgGetAdministrationListDetails;
public Error: any;
}
export class GetAdminHistoryListCompletedEventArgs{
 public Result: CResMsgGetAdminHistoryList;
public Error: any;
}
export class GetAdminHistoryListDetailsCompletedEventArgs{
 public Result: CResMsgGetAdminHistoryListDetails;
public Error: any;
}
export class RecordAdministrationCompletedEventArgs{
 public Result: CResMsgRecordAdministration;
public Error: any;
}
export class DummyMethodCompletedEventArgs{
 public Result: CResMsgDummyMethod;
public Error: any;
}
export class GetSelfAdminDetailsCompletedEventArgs{
 public Result: CResMsgGetSelfAdminDetails;
public Error: any;
}
export class ManageSelfAdminCompletedEventArgs{
 public Result: CResMsgManageSelfAdmin;
public Error: any;
}
export class CReqMsgGetMedicationChart{
ViewMedChartParamsBC:MedChartParams;
oContextInformation:CContextInformation;
}

export class MedChartParams extends CLZOObject{
PatientAge:number;
ServicePointOID:number;
RoleOID:number;
OwnerOrganisationOID:number;
MedChartOID:number;
PatientOID:number;
StartDate:DateTime;
EndDate:DateTime;
DuenessWindowTimeMinutes:number;
OverDueTimeHours:number;
MCVersion:number;
IsCancelledChecked:boolean;
IsDiscontinuedChecked:boolean;
PrescType:string;
EncounterOID:number;
ProfileDiscontinuedDrugFlag:string;
SealRecordLst:string;
ProfileHoldDuration:number;
ProfileIvAlertMins:number;
LastModifiedBy:string;
FallBacklogOID:number;
OrganisationName:string;
PASID:string;
IsDrugRoundView:boolean;
IsIncludeInfusions:boolean;
ChartSortType:string;
RefreshTriggeredCACode:string;
ENCStartDate:DateTime;
CallFrom:string;
Episode:string;
}
export class InfChartAlertInfo extends CLZOObject{
DueStatus:string;
InfusionAlertExist:boolean;
}
export class PatientInfo extends CLZOObject{
EncounterType:string;
EncounterIdentifier:string;
EncStartDate:DateTime;
EncEndDate:DateTime;
WardName:string;
BedSpace:string;
AdmissionDate:DateTime;
ExpectedDateOfDischarge:DateTime;
}
export class MeasurableObject extends CLZOObject{
OID:number;
Value:number;
UOMOID:number;
UOMName:string;
RecordedDate:DateTime;
UOMCode:string;
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
export class UOM extends CLZOObject{
UOMId:number;
UOMName:string;
SourceDataProviderType:string;
UOMCode:string;
MCIPrescribableItemListOID:number;
UOMTypeCode:string;
OwnerOrganisationID:number;
}
export class ConditionalDoseRegime extends CLZOObject{
LowerValue:string;
UpperValue:string;
ValueUOM:UOM;
AddlItemType:string;
AddlItemOID:number;
Dose:string;
DoseUOM:UOM;
Instruction:string;
AddlItemName:string;
AddlItemCode:string;
ParentAddlItemCode:string;
Rate:string;
RateUOMOID:UOM;
RateDenaminatorUOMOID:UOM;
ValueRange:string;
ValueRangeOpratorText:string;
UpperDose:string;
UpperRate:string;
OID:number;
}
export class DoseSchedule extends CLZOObject{
ScheduledDTTM:DateTime;
Dose:string;
DoseUOM:string;
PrescriptionItemScheduleOID:number;
DoseUOMOID:number;
PrescriptionItemOID:number;
PatientOID:number;
MedChartOID:number;
}
export class SteppedVariableDoseInfo extends CLZOObject{
OID:number;
Frequency:string;
StartDate:DateTime;
EndDate:DateTime;
ScheduleStartDTTM:DateTime;
LowerDose:string;
UpperDose:string;
DoseUOM:string;
DoseScheduleType:string;
Duration:number;
DurationUOM:string;
PrescriptionItemOID:number;
PrescriptionItemDosageOID:number;
PrescriptionItemScheduleOID:number;
IsDayWise:string;
oDoseSchedule:ObservableCollection<DoseSchedule>;
}
export class TransactionItemPackDetail extends CLZOObject{
IdentifyingType:string;
IdentifyingTypeOID:number;
Quantity:string;
BatchNo:string;
ExpiryDate:DateTime;
OID:number;
SelectedQuantity:string;
UOM:string;
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
export class AvailabilityStatus extends CLZOObject{
Code:string;
Status:string;
Count:number;
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
export class IPPFrequencyDetails extends FrequencyDetails{
DaysOfWeek:ObservableCollection<string>;
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
export class IPPPresItemBasicProperties extends PresItemBasicProperties{
StrengthText:string;
Instruction:ObjectInfo;
ParentPrescriptionType:string;
ParentPrescriptionItemOID:number;
OrginalEndDTTM:DateTime;
PrepStatusCode:string;
IsWardStock:boolean;
IsSupplyRequested:string;
RequisitionCACode:string;
STKREQCode:string;
oRequisitionHistoryDetails:RequisitionHistoryDetails;
ReviewAfterDTTM:DateTime;
ReviewAfter:string;
ReviewAfterUOM:ObjectInfo;
RouteDeactivation:string;
FormDeactivation:string;
SiteDeActivated:string;
RequestDoseUOMDeActivated:string;
QuantityUOMDeActivated:string;
RatenumUOMDeActivated:string;
RatedinoUOMDeActivated:string;
BoosterdoseUOMDeActivated:string;
BolusUOMDeActivated:string;
IsReviewafterReq:boolean;
IsReviewAlertShown:string;
LastReviewedDTTM:DateTime;
IsPresItemIgnoreAdminMethod:boolean;
StrengthDeactivation:string;
}
export class RequisitionHistoryDetails extends CLZOObject{
ServiceOID:number;
ServicePointName:string;
LocationOID:number;
UsersOID:number;
RequisitionedBy:string;
RoleOID:number;
RoleName:string;
RequisitionDTTM:DateTime;
LocationName:string;
IsCurrent:string;
URGNCCode:string;
Comments:string;
PresItemOID:number;
EncounterOID:number;
LorenzoID:string;
FluidPrescribableItemListOID:number;
PrescriptionMultiComponentOID:number;
RequestedCancelledBy:string;
RequestStatus:string;
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
PrescriptionItemTechOID:number;
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
export class IPPPrescriptionItem extends PrescriptionItem{
StrengthText:string;
Instruction:ObjectInfo;
PrescriptionItemStatusCode:string;
DrugFrequencyUOMCode:string;
IsWardStock:boolean;
IsSupplyRequested:string;
RequestedDTTM:DateTime;
RequestedBy:string;
RequestedComments:string;
RequestUrgency:string;
RequisitionCACode:string;
InstructionCount:number;
FrequencyDetails:IPPFrequencyDetails;
IsWardStockForFluid:boolean;
}
export class DrugPrepDetail extends CLZOObject{
Preparedby:string;
PreparedbyOID:number;
Prepareddttm:DateTime;
Modificationcomments:string;
Witnessedby:string;
WitnessedbyOID:number;
PrescriptionItemScheduleOID:number;
IsStrikeOut:boolean;
MedDrugPreparationOID:number;
MedAdminOID:number;
IsHistoryExists:boolean;
oPresctiptionItem:ObservableCollection<IPPMCPresctiptionItem>;
}
export class CMedBarcodeScanOverrideDetail extends CLZOObject{
IdentifyingOID:number;
IdentifyingType:string;
EncounterOID:number;
ServiceOID:number;
OverrideReasonType:string;
OverrideByUserOID:number;
OverrideDTTM:DateTime;
OverrideScanReason:string;
Comments:string;
}
export class AlertsInfo extends CLZOObject{
Alert:string;
PreInfRate:string;
ModifiedBy:string;
ModifiedAt:DateTime;
InfRate:string;
Concentration:string;
PreConcentration:string;
}
export class SiteList extends CLZOObject{
SiteOID:number;
SiteName:string;
}
export class UomTypeList extends CLZOObject{
UoMOID:number;
Name:string;
LorenzoID:string;
UOMTYCode:string;
}
export class InfusionBagDetail extends CLZOObject{
Dose:string;
DoseUOM:UOM;
BagVolume:string;
BagVolumeUOM:UOM;
BagSequence:number;
PrevBagSequence:number;
ExpiryDate:DateTime;
BatchNumber:string;
AdminStartTime:DateTime;
AdminEndTime:DateTime;
InfusedVolume:string;
InfusedVolumeUOM:UOM;
AdministeredBy:ObjectInfo;
WitnessedBy:ObjectInfo;
IsWitnessNotAvailable:boolean;
Wastage:string;
WastageUOM:UOM;
IsCurrent:string;
}
export class InfusionAdminDetail extends CLZOObject{
ActionCode:string;
ActionStartDate:DateTime;
ActionEndDate:DateTime;
RecordedAt:DateTime;
RecordedBy:string;
Site:string;
Lumen:string;
Deliverydevice:string;
infusionComments:string;
infusionReasonCode:string;
InfusionRate:string;
InfusionRateUOM:UOM;
InfusionRatePerUOM:UOM;
DripRate:string;
DripRateUOM:UOM;
DripRatePerUOM:UOM;
TopUpDose:string;
TopUpDoseUOM:UOM;
INFTYCode:string;
PrescriptionItemOID:number;
DoseDiscReasonCode:string;
oInfusionBagDetail:InfusionBagDetail;
WitnessedBy:string;
IsWitness:boolean;
MedAdminOID:number;
InfusionAdministeredAt:DateTime;
InfusionAdministeredBy:string;
AdministeredByCPOID:number;
RecordedByUserOID:number;
ActionTermText:string;
Dose:string;
DoseUOMOID:number;
AdminComments:string;
MedAdminInfusionOID:number;
Humidification:string;
Route:ObjectInfo;
ConcentrationStrength:string;
ConcentrationStrengthUOM:UOM;
ConcentrationVolume:string;
ConcentrationVolumeUOM:UOM;
PreviousConcentration:string;
IsInfusionRateRangeProvided:boolean;
InfusionDose:string;
InfusionDoseUOM:string;
InfusionDoseUOMNumerator:UOM;
InfusionDoseUOMDenominator:UOM;
DoseDiscComments:string;
IsEndTimeRecalculated:boolean;
MedAdminHistoryOID:number;
IsStruckout:string;
IsMedScannedProduct:string;
}
export class AdministrationDetail extends CLZOObject{
MedAdminOID:number;
Lumen:string;
DeliveryDevice:string;
bIsWitnessRequired:boolean;
PresItemStatusModifiedAt:DateTime;
PresItemStatusModifiedBy:string;
IsAnyParacetamolAdministeredInGivenPeriod:boolean;
AdministeredByOID:number;
AdministeredBy:string;
AdminByRelationship:string;
AdminByPersonalCarerOID:number;
AdministratorType:string;
AdministeredOnTimeMode:string;
DoseDiscrepancyExists:number;
Dose:string;
DoseUOM:string;
DoseUOMOID:number;
AmendDoseUOMOID:string;
Route:string;
SelectedRoute:string;
RouteOID:string;
Site:string;
SiteOID:string;
ExpiryDate:DateTime;
AdministeredDate:DateTime;
IsNoWitnessAvailable:boolean;
WitnessedByOID:number;
WitnessedBy:string;
AdminComments:string;
AdminReasonCode:string;
DoseDiscReasonCode:string;
AmendReasonCode:string;
IsHistoryExists:boolean;
BatchNumber:string;
ReasonNotGiven:string;
MedicationAction:string;
RecordedBy:string;
RecordedAt:DateTime;
AmendedPresOID:number;
PresStatusCode:string;
AlreadyRequestedDets:string;
IsInsertComments:number;
IsInsertHistory:number;
InfusionEndDate:DateTime;
IsWardStock:boolean;
IsSupplyRequested:string;
RequisitionCACode:string;
oRequisitionHistoryDetails:RequisitionHistoryDetails;
FirstBagBegunAt:DateTime;
LastBagEndedAt:DateTime;
TotalVolumeInfused:string;
TotalVolumeInfusedUOMName:string;
TotalVolumeInfusedUOMLzoID:string;
CurrentBagVolumeInfused:string;
CurrentBagVolumeInfusedUOMName:string;
PatientOID:number;
ScheduleOID:number;
PrescriptionItemScheduleOID:number;
DoseUomLorenzoID:string;
StrikeoutAction:string;
CDWardRegItemOID:number;
CDPatientRegItemOID:number;
WardCurrentStock:string;
PatientCurrentStock:string;
AdministeredQty:string;
Wastage:string;
InfusionStartDate:DateTime;
oAlertsInfoDetails:AlertsInfo;
IsAlertRequired:boolean;
IsCanComplete:boolean;
INFTYCode:string;
FluidName:string;
IsInfusion:string;
IsBolus:string;
MedicationPastAction:string;
WardStockUOM:string;
PatientStockUOM:string;
DoseDiscComments:string;
ConcentrationStrength:string;
ConcentrationStrengthUOM:UOM;
ConcentrationVolume:string;
ConcentrationVolumeUOM:UOM;
InfusionPeriodforMedAdmin:number;
InfusionPeriodUOMforMedAdmin:UOM;
RecordOneMoreAction:string;
RecordOMASequence:string;
IsConditionalExists:boolean;
AdminMethod:string;
DosageFormOID:number;
IsAdministeredOnInfusionChart:boolean;
LastAdministeredBy:string;
LastAdministeredAt:DateTime;
PlannedInfusionVolume:string;
PlannedInfusionVolumeUOMOID:number;
PlannedInfusionVolumeUOMName:string;
IsAdministeredInAdvance:boolean;
PlannedInfusionVolumeUOMLzoID:string;
IsPersonalCarerNotListed:boolean;
IsDuringHomeLeave:boolean;
IsCriticalMed:boolean;
CriticalMedsRoutes:string;
CriticalMedsMsg:string;
CriticalDrugSiteURL:string;
IsStruckout:string;
IsMedScannedProduct:string;
MedAdminHistoryOID:number;
MedScannedHistoryOID:number;
IsMedScanExcluded:boolean;
IsScanDetailExists:boolean;
PGDLorenzoID:string;
ServiceOID:number;
EncounterOID:number;
oInfusionAdminDetail:ObservableCollection<InfusionAdminDetail>;
oUomTypeList:ObservableCollection<UomTypeList>;
oSiteList:ObservableCollection<SiteList>;
PrescribedRoutes:ObservableCollection<ObjectInfo>;
ConcentrationDoseUOMs:ObservableCollection<ObjectInfo>;
MedProductDetails:ObservableCollection<MedsScanProductDetails>;
MedBarCodeOverrideDetails:ObservableCollection<CMedBarcodeScanOverrideDetail>;
}
export class MedsScanProductDetails{
ScanProductDose:string;
ScanProductDoseUomLZOID:string;
MedAdminOID:number;
PrescriptionitemOID:number;
ScanProductLZOID:string;
ProductCode:string;
ExpiryDTTM:DateTime;
BatchNumber:string;
SerialNumber:string;
IsProductScanned:string;
MedAdminHistoryOID:number;
IsStruckout:string;
OwnerOrganisationOID:number;
MedAdminInfusionDetailOID:number;
Comments:string;
TotalDoseAdministered:string;
TotalDoseAdministeredUOMLZOID:string;
MedBarCodeOverrideDetails:ObservableCollection<CMedBarcodeScanOverrideDetail>;
}
export class SlotDetail extends CLZOObject{
InfRateUOM:UOM;
InfRatePerUOM:UOM;
LorenzoID:string;
IsSelfAdministered:boolean;
IsInfusion:boolean;
Dose:string;
UpperDose:string;
DoseUOM:string;
DoseUOMOID:number;
DoseUOMLzoID:string;
ScheduledDTTM:DateTime;
PrescriptionItemDosageOID:number;
AdministrationDetail:AdministrationDetail;
Status:string;
PrescriptionItemOID:number;
OID:number;
IsNextDoseAllowedForPRN:boolean;
MinimumIntervalForPRN:number;
LastRecordedAtForPRN:DateTime;
IsPrepByWard:boolean;
oDrugPrepDetail:DrugPrepDetail;
IsDrugPreStrikeOut:string;
MedDrugPreparationOID:number;
IsUpdatePIStatusToCompleted:boolean;
IsLastSlotCheckRequired:boolean;
PresItemStartDTTM:DateTime;
PresItemENDTTM:DateTime;
IsLastSlotInView:boolean;
PatientOID:number;
InfusionRecordAdminTypeCode:number;
ScheduleGenerationPresItemOID:number;
MCVersion:string;
PrescriptionType:string;
PreparedAt:DateTime;
PreparedBy:string;
PrepWitness:string;
WardStockQuantityToAdmin:string;
PatientStockQuantityToAdmin:string;
InfusionPeriod:number;
InfusionPeriodLorenzoID:string;
InfusionRate:string;
PrescriptionItemStatus:string;
PrescribedVolume:string;
PrescribedVolumeLorenzoID:string;
InfUpperRate:string;
AdminMethod:string;
IsAllowAdvanceAdmin:boolean;
EstVolumeInfusedInProgress:number;
EstVolumeInfusedInProgressUOM:UOM;
EstVolumeInfusedInProgressDurationInMins:number;
IsOnceOnlyFrequency:boolean;
IsHighlightSlot:boolean;
IsPatientSelfAdministered:boolean;
IsPRNWithSchedule:boolean;
EncounterOID:number;
Direction:string;
IsNextSlotMultiSlotAdmin:boolean;
ParentPrescriptionItemOID:number;
InfusionGroupSequenceNo:number;
InfusionSequentialItemNo:number;
SERVICEOID:number;
TransactionItemPackDetail:ObservableCollection<TransactionItemPackDetail>;
}
export class DrugHeader extends CLZOObject{
datediff:number;
enddatediff:number;
emptyslotdatediff:number;
DrugIdentifyingOID:number;
DrugIdentifyingType:string;
LorenzoID:string;
MCVersion:string;
PrescriptionDuration:number;
IsParacetamolIngredient:boolean;
OrderSetName:string;
PrescriptionItemOID:number;
DrugName:string;
DosageForm:string;
LowEvent:number;
HighEvent:number;
LowPeriod:string;
HighPeriod:string;
PerodCode:string;
FrequencyType:string;
LowerDose:string;
UpperDose:string;
DoseUOM:string;
DoseUOMLzoID:string;
DoseUOMOID:number;
DrugFrequency:string;
DoseType:string;
Route:string;
RouteCode:string;
RouteOID:number;
DosageFormOID:number;
SiteOID:number;
Site:string;
SiteCode:string;
AdministrationInstructions:string;
PRNInstructions:string;
ItemType:string;
PrescriptionItemStatus:string;
StartDate:DateTime;
EndDate:DateTime;
PrescriberName:string;
PrescriberOID:number;
IsControlledDrug:boolean;
IsPGD:boolean;
IsConflictExists:string;
IsClinicallyVerified:boolean;
WeightValue:string;
CalculatedAmount:string;
OrderedAmountPerDose:string;
OverRideReason:string;
WTUOMCode:string;
IsEstimatedWeight:string;
BSAFRCode:string;
BSAValue:string;
ReqDoseUOMSecondCompLzoID:string;
ReqDoseUOMThirdCompLzoID:string;
AdjustedBodyWeight:string;
IdealBodyWeight:string;
IsDailyDose:string;
TotalDailyDose:string;
RequestedDose:string;
RequestedDoseUOMName:string;
DrugFrequencyName:string;
LOWEVENTPrint:number;
DoseCalcBSAWeight:string;
TotalDailyDoseWithUOM:string;
DrugFrequencyDoseCalc:string;
CalculatedAmountPerDose:string;
OrderedAmountPerDoseDC:string;
WTOPTCode:string;
DOSFRCode:string;
IsPRN:boolean;
IsSelfAdministered:boolean;
IsWitnessRequired:boolean;
MinimumInterval:number;
MaxSlotDate:DateTime;
AdminMethodOID:number;
AdminMethod:string;
AdminMethodCode:string;
AmendedPrescriptionItemOID:number;
IsAmendment:boolean;
PrescribingComments:string;
SlotsTimeIntervalAvg:number;
IsAdminIVAlertMsgRequired:number;
ItemSubType:string;
PreparationStatusCode:string;
EncounterOID:number;
EncounterType:string;
FormViewParameters:PrescriptionItemFormViewParameters;
IsInfusion:boolean;
InfusionType:string;
IsAlertShown:number;
PreviousRate:string;
PrescribedAt:DateTime;
PrescriptionDurationUOM:string;
AdditionalComments:string;
AdministrationTimes:string;
Discontinuedby:string;
DiscontinuedDttm:DateTime;
ConcentrationStrength:string;
ConcentrationStrengthUOM:UOM;
ConcentrationVolume:string;
ConcentrationVolumeUOM:UOM;
AmendedAsRequired:string;
PreviousConcentration:string;
IsPRNWithSchedule:boolean;
PrintCategory:string;
IsConditionalExists:boolean;
StrengthText:string;
MultiRouteType:byte;
ClinicallyVerifiedComments:string;
ClinicallyVerifiedBy:string;
ClinicallyVerifiedAt:DateTime;
OrderSetGroupID:string;
DaysOfWeek:string;
IsSupplyRequested:string;
RequestedDTTM:DateTime;
RequestedBy:string;
RequestedComments:string;
RequestUrgency:string;
IsBolus:boolean;
InfusionCompletedBy:string;
DiscontinuedComments:string;
InfusionCompletionComments:string;
StopDate:DateTime;
IsInfusionFluid:boolean;
IsAllowAdvanceAdmin:boolean;
SupplyComments:string;
SupplyInstructions:string;
ProductOptions:string;
DrugFrequencyOID:number;
IsIndefiniteOmit:boolean;
IndefiniteOmitFromDTTM:DateTime;
OmitComments:string;
LastOmittedSlotDTTM:DateTime;
Omittedby:string;
ReviewDTTM:DateTime;
ReviewRequestedComments:string;
ReviewedRequestedby:string;
ReviewType:string;
IsAllowed:boolean;
ExistsOnAdmission:string;
GroupSequenceNo:number;
GroupTermText:string;
SupplyDTTM:DateTime;
NextSupplyDTTM:DateTime;
UOMTYCode:string;
IsCriticalMed:boolean;
CriticalMedsRoutes:string;
IsCriticalMedication:string;
CriticalMedsMsg:string;
CriticalDrugSiteURL:string;
IsDoseCalculatedByDC:boolean;
DCalcDTTM:DateTime;
IsAmendCompletedStatus:boolean;
DCHeightRecordedDTTM:DateTime;
DCWeightRecordedDTTM:DateTime;
ScheduleDTTM:DateTime;
RecordedDTTM:DateTime;
IsMedScanExcluded:boolean;
IngredientWarning:ObservableCollection<string>;
MultiComponentItems:ObservableCollection<string>;
InfChartAlerts:ObservableCollection<string>;
}
export class DrugDetail extends CLZOObject{
DrugHeader:DrugHeader;
DisplayOrder:number;
IsNextDoseAllowedForPRN:boolean;
MinimumIntervalForPRN:number;
LastRecordedAtForPRN:DateTime;
sTitrated:string;
GroupDisplayName:string;
CreatedAtDTTM:DateTime;
SlotDetails:ObservableCollection<SlotDetail>;
oSteppedVariableDoseInfo:ObservableCollection<SteppedVariableDoseInfo>;
oConditionalDoseRegimeInfo:ObservableCollection<ConditionalDoseRegime>;
oDoseRegimeInfusionInfo:ObservableCollection<DoseRegimeInfusionDetail>;
}
export class Encounter extends CLZOObject{
EncounterOID:number;
Type:string;
StartDate:DateTime;
EndDate:DateTime;
MainId:string;
Current:string;
StatusCode:string;
}
export class MedicationChart extends CLZOObject{
OID:number;
PatientOID:number;
ChartStatus:string;
ActiveFrom:DateTime;
ActiveTo:DateTime;
oPatientInfo:PatientInfo;
ServiceOID:number;
ParacetamolAdministeredCount:number;
IsDischPresExs:boolean;
EncounterOID:number;
EncounterType:string;
MergedPatientOID:number;
IsMergedPatient:string;
EncounterStatus:string;
LocationOID:number;
ParentMedicationChart:MedicationChart;
InfusionItemCount:number;
NonInfusionItemCount:number;
InfusionChartAlertInfo:InfChartAlertInfo;
ReviewPeriodAletItems:string;
IsReqMedEnable:string;
IsAuthoriseDrugAvailable:boolean;
Encounter:ObservableCollection<Encounter>;
DrugDetail:ObservableCollection<DrugDetail>;
EventsInNotKnownStatus:ObservableCollection<string>;
}
export class AppLockData extends CLZOObject{
EntityOID:number;
EntityName:string;
LockDuration:number;
LockUserOID:number;
LockUserName:string;
ErrorCode:number;
}
export class MedChartStatusUpdateParams extends CLZOObject{
AvaliableMedicationDUCode:eAvaliableMedicationDUCode;
CareActivityCode:string;
PatientOID:number;
EncounterOID:number;
DischargeOutcome:string;
SourceWardOID:number;
DestinationWardOID:number;
ActionDTTM:DateTime;
NewAttendanceStatus:string;
OldAttendanceStatus:string;
LeaveRetOccurredDTTM:DateTime;
IsInsertPatientLeave:boolean;
IdentifyingEventOID:number;
IdentifyingEventType:string;
IsLeaveRetActualDischarge:boolean;
}
export enum eAvaliableMedicationDUCode{
None,
IPPMA,
IPPMA_P2,
}
export class MultiSlotParams extends CLZOObject{
MedChartOID:number;
PrescriptionItemOID:number;
SlotDate:DateTime;
IsPRN:boolean;
DuenessTime:number;
OverDueTime:number;
PatientOID:number;
}
export class MultiSlotDetail extends CLZOObject{
IsNextDoseAllowedForPRN:boolean;
MinimumIntervalForPRN:number;
LastRecordedAtForPRN:DateTime;
IsPrepStatusByWard:boolean;
MultiRouteType:byte;
IsInfusionInProgressForMultiRouteItem:boolean;
InProgressMultiRouteInfusionAdminDTTM:DateTime;
oSlotDetail:ObservableCollection<SlotDetail>;
}
export class DrugroundViewParams extends CLZOObject{
ServicePointOID:number;
DuenessThresholdTime:number;
IsABMEnabled:number;
OverdueToNotknownTime:number;
DueUntil:DateTime;
BedSpaceOIDs:string;
SelLocationOID:string;
SortbyOption:string;
IsCMON:string;
IsEmergency:string;
ChartCloseDuration:number;
BedSpaceOID:ObservableCollection<number>;
}
export class Drugroundview extends CLZOObject{
PatientsWithDue:ObservableCollection<DrugroundPatientList>;
PatientsWithNoDue:ObservableCollection<DrugroundPatientList>;
PatientsMedList:ObservableCollection<DrugroundPatientList>;
}
export class DrugroundPatientList extends CLZOObject{
PatientOID:number;
PrimaryPatientOID:number;
Surname:string;
ForeName:string;
SNDEXSURNAME:string;
Title:string;
CPTitle:string;
PatientID:string;
DateOfBirth:DateTime;
CareProviderName:string;
CareProviderOID:number;
BedSpace:string;
IsSensitive:string;
NHSNUMBER:string;
IsOverDue:string;
IsDue:string;
IsControlledDrug:string;
IsPRNDrug:string;
MedChartOID:number;
ChartStatus:string;
ChartEndDTTM:DateTime;
LOCATIONTYPE:string;
EncounterOID:number;
EncounterType:string;
IsPlannedSlot:string;
NameForDupCheck:string;
cIsDuplicate:string;
MergedPatientOID:number;
PreparationStatus:string;
IsInfusionAlert:string;
DisplaySequence:string;
PatientName:string;
IsInjectableRoute:string;
}
export class PGDList extends CLZOObject{
OID:number;
Name:string;
EffectiveDate:DateTime;
MCVersion:string;
Version:string;
Status:string;
LorenzoID:string;
ModifiedAt:DateTime;
ModifiedBy:number;
IdentifyingType:string;
IdentifyingOID:number;
ItemType:string;
OwnerOrganisationOID:number;
IsControlledDrug:string;
MCchildItem:string;
WitnessBy:string;
WitnessByOID:string;
IsNoWitnessAvailable:boolean;
ParentLorenzoID:string;
IsAuthorise:string;
ServiceOID:number;
ItemSubType:string;
FormViewParameters:PrescriptionItemFormViewParameters;
oDrugPrepDetail:DrugPrepDetail;
IsDrugPreStrikeOut:string;
PgdListDetailOID:number;
PatientOID:number;
PreparationstatusCode:string;
AssociatedObject:ObservableCollection<ObjectInfo>;
MedicationSentences:ObservableCollection<PGDListDetail>;
Warningdetails:ObservableCollection<WarningDetails>;
MultiComponentDetails:ObservableCollection<IPPMCPresctiptionItem>;
MultiComponentItems:ObservableCollection<string>;
}
export class PGDListDetail extends CLZOObject{
OID:number;
PrescribableItem:ObjectInfo;
DoseType:ObjectInfo;
DoseValue:number;
DoseUOM:ObjectInfo;
Route:ObjectInfo;
Frequnecy:ObjectInfo;
DosageForm:ObjectInfo;
Comments:string;
LorenzoOID:string;
IsParacetamolIngredient:boolean;
ItemSubType:string;
PresListItemOID:number;
AdminMethod:ObjectInfo;
UpperDose:number;
DisplayNumber:number;
IsAuthorise:boolean;
MaxNoOfAdministration:number;
PGDAdministrationCount:number;
PGDLorenzoID:string;
InfusionRate:string;
IsBolus:string;
InfusionRateNumUOM:ObjectInfo;
InfusionRateDenoUOM:ObjectInfo;
IsInfusion:boolean;
IsControlledDrug:string;
PGDListDetailOID:number;
IngredientWarning:ObservableCollection<string>;
}
export class PGDAdministration extends CLZOObject{
BatchNo:string;
ExpiryDate:DateTime;
MedicationAction:string;
AdministrationDate:DateTime;
AdministrationTime:DateTime;
AdministeredDose:number;
Comments:string;
PGDList:PGDList;
IsMergedPatient:string;
AdministeredBy:ObservableCollection<ObjectInfo>;
AdministeredDoseUOM:ObservableCollection<ObjectInfo>;
}
export class PGDResponse extends CLZOObject{
PrescriptionItemScheudleOID:number;
PrescriptionItemOID:number;
MedicationAdminOID:number;
}
export class AdminHistory extends CLZOObject{
nActionByTitle:string;
ActionCode:string;
SlotStatus:string;
MedAdminHistoryOID:number;
ActionDTTM:DateTime;
ActionBySurname:string;
ActionByForename:string;
ActionByTitle:string;
IsDuringHomeLeave:boolean;
IsStruckout:string;
IsMedScannedProduct:string;
}
export class AdminHistoryDetails extends CLZOObject{
ColumnCode:string;
FromValue:string;
ToValue:string;
}
export class ManageSelfAdminParams extends CLZOObject{
MedChartOID:number;
McVersion:number;
PatientOID:number;
PrescriptionType:string;
ProfileHoldDuration:number;
}
export class SelfAdminDrug extends CLZOObject{
IsSelfAdministered:boolean;
SelfAdminComments:string;
OverdueToNotknownTime:number;
DuenessThresholdTime:number;
PrescriptionItemOID:number;
oPrescriptionItemView:PrescriptionItemView;
ItemSubType:string;
LorenzoID:string;
IsParacetamolIngredient:boolean;
MultiComponentItems:ObservableCollection<string>;
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
export class OmitSlotsParams extends CLZOObject{
PrescriptionItemOID:number;
Reason:string;
FromDTTM:DateTime;
ToDTTM:DateTime;
PatientOID:number;
DurationUOM:string;
MedChartOID:number;
IsInfusion:boolean;
IsUpdatePIStatusToCompleted:boolean;
IsLastSlotCheckRequired:boolean;
PresItemENDTTM:DateTime;
ScheduledDTTM:DateTime;
OmitIndefinite:boolean;
OmitReviewFromDTTM:DateTime;
ManageReviewPeriod:ManageReviewPeriod;
IsOnceOnlyFrequency:boolean;
OSlotData:ObservableCollection<SlotData>;
}
export class SlotData{
PrescriptionItemScheduleOID:number;
ScheduleDTTM:DateTime;
SlotStatus:string;
MedAdminOID:number;
}
export class ReinstateSlotParams extends CLZOObject{
Reason:string;
PatientOID:number;
MedChartOID:number;
IsUpdatePIStatusToCompleted:boolean;
IsLastSlotCheckRequired:boolean;
PresItemENDTTM:DateTime;
ScheduledDTTM:DateTime;
PrescriptionItemOID:number;
ReinstateAll:boolean;
ReviewPeriodDtls:ManageReviewPeriod;
ReinstateSlotDTTM:DateTime;
IsOnceOnlyFrequency:boolean;
MedAdminOID:ObservableCollection<number>;
OSlotData:ObservableCollection<SlotData>;
}
export class IngredientAdminParams extends CLZOObject{
MedChartOID:number;
PatientOID:number;
IngredientLorenzoID:string;
DuenessWindowTimeMinutes:number;
EncounterOID:number;
RangeStartDttm:DateTime;
RangeEndDttm:DateTime;
SlotOID:number;
}
export class MatchEANCodeParams extends CLZOObject{
PrescriptionItemOID:number;
EANCode:string;
PatientOID:number;
ActiveMCVersionNo:string;
SlotDose:string;
SlotDoseUOM:string;
SlotDoseUOMLzoID:string;
IsApplyMatchingLogicOnly:boolean;
IsInfPrescribeWithFluid:boolean;
RecMedRouteOID:number;
}
export class MatchEANCodeResult extends CLZOObject{
ScannedDrugName:string;
AdministrableDose:string;
AdministrableDoseUOM:string;
AdditionalDose:string;
AdditionalDoseUOM:string;
IsInfusionFluid:boolean;
IdentifyingOID:number;
IdentifyingType:string;
IdentifyingName:string;
PrescribableItemListOID:number;
Quantity:string;
QuantityUOM:string;
AdminMethod:string;
LorenzoID:string;
DispVolume:string;
DispVolumeUOM:string;
Wastage:string;
StrengthValue:string;
StrengthUOM:string;
ScanProductLZOID:string;
StrengthUOMLzoID:string;
PackageUOM:string;
PacKageUOMLZOID:string;
PresItemStrengthValue:number;
PresItemDoseMultiplier:number;
PresItemDoseDivider:number;
PresItemStrengthUOM:string;
}
export class Observation extends CLZOObject{
PatientIdentifier:string;
OBSSNOMEDDESCRIPTION:string;
PovDeviceCode:string;
FormDeviceCode:string;
OBSSNOMEDCODE:string;
ISRECORDEDFROMDEVICE:string;
ISDEVICE:boolean;
OID:string;
Name:string;
Createdon:DateTime;
Createdby:number;
CreatedbyName:string;
ObserverdBy:string;
Observedon:DateTime;
ObserverName:string;
Observedby:number;
OBSTSCode:string;
OBSTSCodeName:string;
EncounterOID:string;
PatientOID:string;
Source:string;
SourceOID:string;
Modfiedon:DateTime;
Modfiedby:number;
StatusCode:string;
Comments:string;
DataItemVersion:string;
OrganizationOID:number;
OrganizationName:string;
OwningOrganizationOID:number;
Status:string;
celllevelComments:string;
StrkOutREASNCode:string;
strkOutComments:string;
OBMRSCode:string;
ModifyRemarks:string;
ModifiedbyName:string;
DisplayName:string;
ModifiedDTTM:DateTime;
ObservationObjType:string;
ObjectType:string;
ObservedValue:string;
ObservationValue:string;
resultItemType:string;
ObservedValueUom:string;
DataItemType:string;
FormOID:number;
RecorderUserOID:number;
RecorderUserName:string;
PatientObservationOID:number;
ObservationValueOID:number;
EncounterName:string;
Unitofmeasure:string;
IdentifyingOID:number;
IdentifyingType:string;
HasHistory:string;
RecordedDTTM:DateTime;
IsDIInstance:boolean;
DataItemInstanceName:string;
DataTypeName:string;
PatientObservation:ObservableCollection<ObservationValue>;
}
export class ObservationValue{
iLevel:number;
DataTypeCode:string;
ParentObservationOID:string;
OID:string;
Observationoid:string;
DataItemOID:string;
DataType:string;
Name:string;
DataItemVersion:string;
LocationOID:number;
DeviceCode:string;
Value:string;
SnomedCode:string;
UOM:string;
CommentField:string;
BaseUOM:string;
BaseValue:string;
ObservationValueName:string;
ObservationValueDisplayName:string;
MinRange:string;
MaxRange:string;
Score:string;
Text:string;
Comments:string;
DataItemInstanceName:string;
FormOID:number;
UOMName:string;
BaseUOMName:string;
RecorderUserName:string;
RecordedDTTM:DateTime;
IFMFormTemplateOID:number;
IsDynamicForm:boolean;
EncounterName:string;
ObservedOn:DateTime;
SortOrder:string;
ScoreValue:string;
NextObservationDueDTTM:DateTime;
AbnormalityINDCode:string;
AbnormalityINDText:string;
ColorCode:string;
IsDNR:string;
DNRReasonCode:string;
DNRCode:string;
OrganisationOID:number;
IsDIInstance:boolean;
ChildObservation:ObservableCollection<NestedObservations>;
NestedChildObservation:ObservableCollection<NestedObservations>;
ChildObservationValue:ObservableCollection<ObservationValue>;
Terms:ObservableCollection<ObservationTerm>;
}
export class NestedObservations{
Key:string;
Value:string;
}
export class ObservationTerm{
Scheme:string;
Version:string;
Code:string;
Name:string;
Description:string;
ConceptType:string;
Term:string;
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
export class CompatibleItems extends CLZOObject{
CompatibleItemLZOID:string;
Comments:string;
CompatibleItemName:string;
DisplaySeqNum:number;
CompatIdentifyingOID:number;
CompatIdentifyingType:string;
CompatOID:number;
PrescribableitemListOID:number;
AdminMethod:string;
IsInfusionFluid:string;
OwnerOrganisationOID:number;
}
export class DrugPrepEANCheckParams extends CLZOObject{
EANCode:string;
ActicveMCVersion:string;
oDrugPrepItems:ObservableCollection<DrugPrepItem>;
}
export class DrugPrepItem extends CLZOObject{
Quantity:string;
QuantityUOM:string;
QuantityUOMLZOID:string;
DrugIdentifyingOID:number;
DrugIdentifyingType:string;
MCVersionNumber:string;
DrugIdentifyingName:string;
AdminMethod:string;
}
export class InfSumaryViewParams extends CLZOObject{
IdentifyingOID:number;
IdentifyingType:string;
MCVersionNo:string;
PrescriptionItemOID:number;
PatientOID:number;
PrescriptionItemScheduleOID:number;
MedicationAction:string;
PatientAge:string;
LorenzoID:string;
RoleOID:number;
UomTypeCode:string;
ServicePointOID:number;
IsAlertShown:boolean;
MedAdminOID:number;
oCALunch:CALaunch;
IsSlotInPastDateAndStatusUnknown:boolean;
ShowChartStatus:string;
}
export enum CALaunch{
InfusionChart,
OverviewChart,
FluidBalnce,
}
export class InfAdministeredTimes extends CLZOObject{
SNo:number;
SlotOID:number;
InfusionStartDTTM:DateTime;
InfusionEndDTTM:DateTime;
InfusionOriginalEndDTTM:DateTime;
SlotStatus:string;
}
export class CancelledPresReqHistoryDetails extends CLZOObject{
PresRequisitionHistoryOID:number;
PrescriptionItemOID:number;
FluidPrescribableItemListOID:number;
PrescriptionMultiComponentOID:number;
PrescriptionType:string;
EncounterOID:number;
EncounterType:string;
IsMessageTrigger:boolean;
}
export class PresItemParentChildDetail extends CLZOObject{
ParentPrescriptionItemOID:number;
ChildPrescriptionItemOID:number;
FirstScheduleOID:number;
LastScheduleOID:number;
}
export class OmitLaunchParams extends CLZOObject{
PrescriptionItemOID:number;
PatientOID:number;
}
export class MedBarCodeConfigRequest extends CLZOObject{
ENTYPCode:string;
ServiceOID:number;
EncounterOID:number;
DrugLorenzoID:string;
DrugIdentifyingType:string;
MCVersionNumber:string;
DrugPartkey:number;
IdentifyingCategory:string;
}
export class MedBarCodeConfigResponse extends CLZOObject{
MedBarCodeConfigOID:number;
IsPatWBMandateScan:string;
IsMedMandateScan:string;
}
export class MedBarcodeScanLogRequest extends CLZOObject{
IdentifyingOID:number;
IdentifyingType:string;
EncounterOID:number;
ActionStatus:string;
ScanCode:string;
PrescriptionItemScheduleOID:number;
ProcessedDTTM:DateTime;
}
export class MedBarcodeScanLogResponse extends CLZOObject{
MedBarcodeScanLogOID:number;
}
export class MedicationScanDetailsRequest extends CLZOObject{
MedAdminOID:number;
MedAdminHistoryOID:number;
PrescriptionItemOID:number;
PrescriptionItemScheduleOID:number;
PatientOID:number;
MCVersion:string;
MedAdminInfusionOID:number;
}
export class MedicationScanDetailsResponse extends CLZOObject{
MedAdminOID:number;
PrescriptionitemOID:number;
MedAdminHistoryOID:number;
ScanProductLZOID:string;
ProductCode:string;
ExpiryDTTM:DateTime;
BatchNumber:string;
Serialnumber:string;
IsProductScanned:string;
WitnessedBy:string;
IsNoWitnessAvailable:boolean;
Comments:string;
TotaldoseadministeredAmt:string;
TotalDoseAdministeredUOM:string;
WitnessedBYOID:number;
ScanProductName:string;
}
export class CResMsgGetMedicationChart{
MedicationChatView:MedicationChart;
oContextInformation:CContextInformation;
}
export class CReqMsgGetMedChartInfoByPatOrEnc{
lnPatinetOIDBC:number;
lnEncounterOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetMedChartInfoByPatOrEnc{
MedChartData:MedicationChart;
oContextInformation:CContextInformation;
}
export class CReqMsgGetEncounterDetailsForMedChart{
PatientOIDBC:number;
MedChartOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetEncounterDetailsForMedChart{
MedChartData:MedicationChart;
oContextInformation:CContextInformation;
}
export class CReqMsgGetLockedUsersDetails{
lnPatinetOIDBC:number;
lnEncounterOIDBC:number;
lnOrganisationOIDBC:number;
oContextInformation:CContextInformation;
objAppLockDataBC:ObservableCollection<AppLockData>;
objAppReadonlyDataBC:ObservableCollection<AppLockData>;
objAppWarnDataBC:ObservableCollection<AppLockData>;
}
export class CResMsgGetLockedUsersDetails{
lnMedchartOID:number;
oContextInformation:CContextInformation;
oAppLockData:ObservableCollection<AppLockData>;
}
export class CReqMsgUpdateLockingStatusToDeactivated{
sKeyCodesBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgUpdateLockingStatusToDeactivated{
oContextInformation:CContextInformation;
}
export class CReqMsgGetMedicationChartForPrint{
oPrintMedChartParamsBC:MedChartParams;
oContextInformation:CContextInformation;
}
export class CResMsgGetMedicationChartForPrint{
oPrintMedicationChart:MedicationChart;
oContextInformation:CContextInformation;
}
export class CReqMsgGetMedicationChartOverview{
OverviewMedChartParamsBC:MedChartParams;
oContextInformation:CContextInformation;
}
export class CResMsgGetMedicationChartOverview{
oOverviewMedicationChart:MedicationChart;
oContextInformation:CContextInformation;
}
export class CReqMsgGetPrescriptionChart{
ViewPrescChartParamsBC:MedChartParams;
oContextInformation:CContextInformation;
}
export class CResMsgGetPrescriptionChart{
oPrescriptionChart:MedicationChart;
oContextInformation:CContextInformation;
}
export class CReqMsgGetInfusionChart{
ViewMedChartParamsBC:MedChartParams;
oContextInformation:CContextInformation;
}
export class CResMsgGetInfusionChart{
InfusionChatView:MedicationChart;
oContextInformation:CContextInformation;
}
export class CReqMsgGetIsInfusionChartAlertExists{
oContextInformation:CContextInformation;
oParamsBC:ObservableCollection<MedicationDueStatusParams>;
}
export class MedicationDueStatusParams{
AvaliableMedicationDUCode:eAvaliableMedicationDUCode;
PatientOID:number;
EncounterOID:number;
HealthOrgOID:number;
InputType:eInputType;
PresItemOID:ObservableCollection<number>;
}
export enum eInputType{
PatientOIDOnly,
PatientOIDAndEncounterOID,
}
export class CResMsgGetIsInfusionChartAlertExists{
oContextInformation:CContextInformation;
oResult:ObservableCollection<MedicationDueStatus>;
}
export class MedicationDueStatus{
PatientOID:number;
DueStatus:string;
InfusionAlertExist:boolean;
DueOverdueSlotDTTM:DateTime;
RAGStatus:eRAGStatus;
oPresItemInfAlertInfo:ObservableCollection<PresItemInfAlertInfo>;
}
export class PresItemInfAlertInfo{
PresItemOID:number;
InfAlertType:eInfAlertType;
ModifiedBy:ObjectInfo;
ModifiedAt:DateTime;
PreviousInfRate:string;
CurrentInfRate:string;
PreviousConcentration:string;
CurrentConcentration:string;
}
export enum eInfAlertType{
None,
DueAlert,
OverdueAlert,
AmendmentAlert,
DiscontinuationAlert,
FlowRateChangeAlert,
CondDoseMonitoringPerAlert,
ConcentrationChangeAlert,
RateAndConcentrationChangeAlert,
InfusionPeriodCompleteAlert,
}
export enum eRAGStatus{
Red,
Amber,
Green,
Grey,
}
export class CReqMsgUpdateMedChartForHomeLeave{
oMedChartSetHomeLeaveStatusParamsBC:MedChartStatusUpdateParams;
oContextInformation:CContextInformation;
}
export class CResMsgUpdateMedChartForHomeLeave{
oContextInformation:CContextInformation;
}
export class CReqMsgStrikethroughAdmin{
oStrikethroughAdminBC:CStrikethroughAdmin;
oContextInformation:CContextInformation;
}
export class CStrikethroughAdmin{
MedAdminOID:number;
ReasonCode:string;
ActionCode:string;
PrescriptionItemScheduleOID:number;
IsUpdatePIStatusToCompleted:boolean;
IsLastSlotCheckRequired:boolean;
PresItemStartDTTM:DateTime;
PresItemENDTTM:DateTime;
ScheduledDTTM:DateTime;
PrescriptionItemOID:number;
OID:number;
PatientOID:number;
InfusionType:string;
IsCalledFromADT:boolean;
IsOnceOnlySlot:boolean;
EncounterOID:number;
IsAllowEntireStrikeThru:boolean;
PGDLorenzoID:string;
ServiceOID:number;
}
export class CResMsgStrikethroughAdmin{
IsPresItemStatusUpdated:boolean;
OriginalStatus:string;
oContextInformation:CContextInformation;
}
export class CReqMsgGetAdminMultiSlot{
oMultiSlotParamsBC:MultiSlotParams;
oContextInformation:CContextInformation;
}
export class CResMsgGetAdminMultiSlot{
oMultiSlotDetail:MultiSlotDetail;
oContextInformation:CContextInformation;
}
export class CReqMsgGetDrugroundView{
oDrugroundViewParamsBC:DrugroundViewParams;
oContextInformation:CContextInformation;
}
export class CResMsgGetDrugroundView{
oDrugroundView:Drugroundview;
oContextInformation:CContextInformation;
}
export class CReqMsgIsPGDListsAvailable{
roleOIDBC:number;
servicePointOIDBC:number;
medChartOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgIsPGDListsAvailable{
isExist:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgGetAssociatedPGDListItem{
roleOIDBC:number;
servicePointOIDBC:number;
MCVersionBC:string;
medChartOIDBC:number;
patientOIDBC:number;
EncounterOIDBC:number;
DuenessWindowTimeMinutesBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetAssociatedPGDListItem{
IsPatTransAct:boolean;
IsClinicalEncouter:boolean;
ParacetamolAdministeredCount:number;
oContextInformation:CContextInformation;
oPGDList:ObservableCollection<PGDList>;
oPGDListRole:ObservableCollection<PGDList>;
}
export class CReqMsgRecordPGD{
oPGDAdministrationBC:PGDAdministration;
nEncounterOIDBC:number;
sRoleNameBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgRecordPGD{
oPGDResponse:PGDResponse;
oContextInformation:CContextInformation;
}
export class CReqMsgGetSlotInfoByOid{
prescriptionItemOidBC:number;
LorenzoIDBC:string;
patientOIDBC:number;
ServiceOIDBC:number;
LocationOIDBC:number;
SlotOIDBC:number;
MCVersionBC:number;
IsIncludeInfusionsBC:boolean;
oContextInformation:CContextInformation;
}
export class CResMsgGetSlotInfoByOid{
objAdministrationDetail:AdministrationDetail;
oContextInformation:CContextInformation;
}
export class CReqMsgGetAmendedPresDetail{
PrescriptionItemOIDBC:number;
PatientOIDBC:number;
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetAmendedPresDetail{
oContextInformation:CContextInformation;
oBasicProperties:ObservableCollection<IPPPresItemBasicProperties>;
oAddProperties:ObservableCollection<PresItemAdditionalProperties>;
}
export class CReqMsgGetTitratedDoseDetail{
PresItemSchOIDBC:number;
PatientOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetTitratedDoseDetail{
oDoseDetail:ObjectInfo;
oContextInformation:CContextInformation;
}
export class CReqMsgGetAdministrationList{
PrescriptionItemOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetAdministrationList{
oContextInformation:CContextInformation;
oSlotDetails:ObservableCollection<SlotDetail>;
}
export class CReqMsgGetAdministrationListDetails{
MedAdminOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetAdministrationListDetails{
oContextInformation:CContextInformation;
oSlotDetails:ObservableCollection<SlotDetail>;
}
export class CReqMsgGetAdminHistoryList{
MedAdminOIDBC:number;
ScheduleOIDBC:number;
PatientOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetAdminHistoryList{
oContextInformation:CContextInformation;
oAdminHistory:ObservableCollection<AdminHistory>;
}
export class CReqMsgGetAdminHistoryListDetails{
MedAdminHistoryOIDBC:number;
PresHistoryOIDBC:number;
ActivityBC:string;
MCVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetAdminHistoryListDetails{
oContextInformation:CContextInformation;
oAdminHistoryDetails:ObservableCollection<AdminHistoryDetails>;
}
export class CReqMsgRecordAdministration{
objSlotDetailBC:SlotDetail;
nPatientOIDBC:number;
bIsPRNBC:boolean;
oContextInformation:CContextInformation;
}
export class CResMsgRecordAdministration{
MedAdminOid:number;
IsPresItemStatusUpdated:boolean;
CDRegItemOID:number;
PatName:string;
PatientPASID:string;
oContextInformation:CContextInformation;
}
export class CReqMsgDummyMethod{
oIPPPrescriptionItemBC:IPPPrescriptionItem;
oContextInformation:CContextInformation;
}
export class CResMsgDummyMethod{
oContextInformation:CContextInformation;
}
export class CReqMsgGetSelfAdminDetails{
objManageSelfAdminParamsBC:ManageSelfAdminParams;
oContextInformation:CContextInformation;
}
export class CResMsgGetSelfAdminDetails{
oContextInformation:CContextInformation;
objSelfAdminDrugDetails:ObservableCollection<SelfAdminDrug>;
}
export class CReqMsgManageSelfAdmin{
nPatientOIDBC:number;
oContextInformation:CContextInformation;
objSelfAdminDrugDetailsBC:ObservableCollection<SelfAdminDrug>;
}
export class CResMsgManageSelfAdmin{
oContextInformation:CContextInformation;
}
export class CReqMsgModifyAdministration{
objSlotDetailBC:SlotDetail;
oContextInformation:CContextInformation;
}
export class CResMsgModifyAdministration{
IsPresItemStatusUpdated:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgGetActiveMedications{
PatientOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetActiveMedications{
oContextInformation:CContextInformation;
oDecisionSupportCriteria:ObservableCollection<DecisionSupportCriteria>;
}
export class CReqMsgGetRecordAdministionDetails{
MedsAdminOidBC:number;
PatientOidBC:number;
IsSlotInPastDateAndStatusUnknownBC:boolean;
PrescriptionItemScheduleOIDBC:number;
IsIncludeInfusionsBC:boolean;
oContextInformation:CContextInformation;
}
export class CResMsgGetRecordAdministionDetails{
objAdministrationDetail:AdministrationDetail;
oContextInformation:CContextInformation;
}
export class CReqMsgOmitSlots{
oOmitSlotsParamsBC:OmitSlotsParams;
oContextInformation:CContextInformation;
}
export class CResMsgOmitSlots{
lErrorCode:number;
dLastUpdateDTTM:DateTime;
sLastUpdateBy:string;
IsPresItemStatusUpdated:boolean;
LastOmittedSlotDTTM:DateTime;
oContextInformation:CContextInformation;
oUpdatedSlotsData:ObservableCollection<SlotData>;
}
export class CReqMsgReinstateSlots{
oReinstateSlotParamsBC:ReinstateSlotParams;
oContextInformation:CContextInformation;
}
export class CResMsgReinstateSlots{
lErrorCode:number;
dLastUpdateDTTM:DateTime;
sLastUpdateBy:string;
IsPresItemStatusUpdated:boolean;
LastOmittedSlotDTTM:DateTime;
oContextInformation:CContextInformation;
oUpdatedSlotsData:ObservableCollection<SlotData>;
}
export class CReqMsgUpdateTitratedDose{
oDoseScheduleBC:DoseSchedule;
oContextInformation:CContextInformation;
}
export class CResMsgUpdateTitratedDose{
lErrorCode:number;
lPrescriptionItemScheduleOID:number;
dLastUpdateDTTM:DateTime;
sLastUpdateBy:string;
oContextInformation:CContextInformation;
}
export class CReqMsgGetIngredientAdminstrationCount{
IngAdminParamsBC:IngredientAdminParams;
oContextInformation:CContextInformation;
}
export class CResMsgGetIngredientAdminstrationCount{
IngredientAdminCount:number;
oContextInformation:CContextInformation;
}
export class CReqMsgGetConditionalDoseRegime{
PrescriptionItemOIDBC:number;
PatientOIDBC:number;
EncounterOIDBC:number;
LatestObsResValueReqBC:boolean;
oContextInformation:CContextInformation;
}
export class CResMsgGetConditionalDoseRegime{
CondDoseRegime:ConditionalDoseRegimeDetails;
oContextInformation:CContextInformation;
}
export class ConditionalDoseRegimeDetails{
PatLatestObsResValue:CPatLatestObsResValue;
PresItemStatDTTM:DateTime;
ConditionalDoseRegimeDet:ObservableCollection<ConditionalDoseRegime>;
}
export class CPatLatestObsResValue{
EntityType:string;
EntityName:string;
EntityCode:string;
EntityValue:string;
EntityUOM:string;
EntityDetails:string;
RecordedDate:DateTime;
}
export class CReqMsgMatchDrugEANCode{
oMatchEANCodeParamsBC:MatchEANCodeParams;
oContextInformation:CContextInformation;
}
export class CResMsgMatchDrugEANCode{
oMatchEANCodeResult:MatchEANCodeResult;
oContextInformation:CContextInformation;
}
export class CReqMsgGetLatestObservation{
infoBC:EPRDataitemReadParameterInfo;
PatientOIDBC:number;
oContextInformation:CContextInformation;
}
export class EPRDataitemReadParameterInfo{
Count:number;
DataitemCode:string;
OBOTYcode:string;
PatientOID:string;
ObservationStatus:string;
ParentDICode:string;
DateInterval:number;
IsComposite:boolean;
Number:number;
SourceType:number;
FromDate:DateTime;
ToDate:DateTime;
}
export class CResMsgGetLatestObservation{
oContextInformation:CContextInformation;
oRecordedObservations:ObservableCollection<Observation>;
}
export class CReqMsgGetAdminListForObservationChart{
PrescriptionItemOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetAdminListForObservationChart{
oContextInformation:CContextInformation;
oSlotDetails:ObservableCollection<SlotDetail>;
}
export class CReqMsgGetLifeviewPrintIPPMA{
PrescriptionItemOIDBC:number;
sMedicationDUBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetLifeviewPrintIPPMA{
oMedicationItemDetails:MedicationItemDetails;
oContextInformation:CContextInformation;
}
export class CReqMsgRecordInfusionAdministration{
objSlotDetailBC:SlotDetail;
nPatientOIDBC:number;
bIsPRNBC:boolean;
oContextInformation:CContextInformation;
}
export class CResMsgRecordInfusionAdministration{
MedAdminOid:number;
oAlertInfo:AlertsInfo;
oSlotDetail:SlotDetail;
oContextInformation:CContextInformation;
}
export class CReqMsgGetCompatibleComponentDet{
IdentifyingOIDBC:number;
IdentifyingTypeBC:string;
sMcversionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetCompatibleComponentDet{
oContextInformation:CContextInformation;
objCompatibleComponents:ObservableCollection<CompatibleItems>;
}
export class CReqMsgGetItemDispVolandDoseUOMDet{
IdentifyingOIDBC:number;
sIdentifyingTypeBC:string;
sMcversionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetItemDispVolandDoseUOMDet{
oContextInformation:CContextInformation;
objDisplacementVolume:ObservableCollection<IPPMCPresctiptionItem>;
objQuantityUom:ObservableCollection<IPPMCPresctiptionItem>;
}
export class CReqMsgGetUOMTypeList{
UOMTypeBC:string;
MCVersionNumberBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetUOMTypeList{
oContextInformation:CContextInformation;
oUomTypeList:ObservableCollection<UomTypeList>;
}
export class CReqMsgGetAllBagDetails{
MedAdminOIDBC:number;
MCVersionNumberBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetAllBagDetails{
oContextInformation:CContextInformation;
oInfusionBagDetail:ObservableCollection<InfusionBagDetail>;
}
export class CReqMsgDrugPrepMatchEANCode{
oDrugPrepEANCheckParamsBC:DrugPrepEANCheckParams;
oContextInformation:CContextInformation;
}
export class CResMsgDrugPrepMatchEANCode{
oMatchEANCodeResult:MatchEANCodeResult;
oContextInformation:CContextInformation;
}
export class CReqMsgStrikeThroughInfusionAdmin{
oStrikethroughAdminBC:CStrikethroughAdmin;
oContextInformation:CContextInformation;
}
export class CResMsgStrikeThroughInfusionAdmin{
objSlotDetail:SlotDetail;
oContextInformation:CContextInformation;
}
export class CReqMsgGetAllinfuactchldDetl{
MedAdminOIDBC:number;
PatientOIDBC:number;
MCVersionNumberBC:string;
IsFetchRecentActionOnlyBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetAllinfuactchldDetl{
objAdministrationDetail:AdministrationDetail;
oContextInformation:CContextInformation;
}
export class CReqMsgGetAllstrikethrdtl{
MedAdminOIDBC:number;
PatientOIDBC:number;
MCVersionNumberBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetAllstrikethrdtl{
objAdministrationDetail:AdministrationDetail;
oContextInformation:CContextInformation;
}
export class CReqMsgGetStrikeinfchldDetl{
MedAdminHistoryOIDBC:number;
PatientOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetStrikeinfchldDetl{
objAdministrationDetail:AdministrationDetail;
oContextInformation:CContextInformation;
}
export class CReqMsgGetInfRecAdminDefaultValues{
oInfSumaryViewParamsBC:InfSumaryViewParams;
oContextInformation:CContextInformation;
}
export class CResMsgGetInfRecAdminDefaultValues{
oDrugDetail:DrugDetail;
oDefaultInfRecAdminDetail:AdministrationDetail;
oInfSumaryViewAdminDetail:AdministrationDetail;
oContextInformation:CContextInformation;
oInfAdministeredTimes:ObservableCollection<InfAdministeredTimes>;
}
export class CReqMsgGetLatestObsOrResultDetails{
oPatLatObsResParamsBC:CPatLatestObsResParams;
oContextInformation:CContextInformation;
}
export class CPatLatestObsResParams{
PatientOID:number;
EncounterOID:number;
EntityType:string;
IdValue:string;
}
export class CResMsgGetLatestObsOrResultDetails{
oPatLatObsResVal:CPatLatestObsResValue;
oContextInformation:CContextInformation;
}
export class CReqMsgSubmitMedRequests{
nEncounterOIDBC:number;
sPresTypeBC:string;
nPatientOIDBC:number;
nJobRoleOIDBC:number;
oContextInformation:CContextInformation;
oRequisitionHistoryDetailsBC:ObservableCollection<RequisitionHistoryDetails>;
oCancelledPresReqHistoryDetailsBC:ObservableCollection<CancelledPresReqHistoryDetails>;
}
export class CResMsgSubmitMedRequests{
oContextInformation:CContextInformation;
}
export class CReqMsgGetPresItemParentChildDetail{
PrescriptionItemOIDBC:number;
PatientOIDBC:number;
PITSTCodeBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetPresItemParentChildDetail{
oPrescScheAmendedDetail:PresItemParentChildDetail;
oContextInformation:CContextInformation;
}
export class CReqMsgWhenOmitLaunch{
oOmitLaunchParamsBC:OmitLaunchParams;
oContextInformation:CContextInformation;
}
export class CResMsgWhenOmitLaunch{
IsFutureSlotAdministered:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgListHardCodedLzoIdMapping{
sMcVersionNoBC:string;
currentOrganisationOidBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgListHardCodedLzoIdMapping{
oContextInformation:CContextInformation;
objFrequency:ObservableCollection<HardCodedFrequencyMap>;
}
export class HardCodedFrequencyMap{
LorenzoId:string;
ParentLorenzoId:string;
}
export class CReqMsgGetPrintMedicationAdminReport{
oPrintMedChartParamsBC:MedChartParams;
oContextInformation:CContextInformation;
}
export class CResMsgGetPrintMedicationAdminReport{
oPrintMedicationChart:MedicationChart;
oContextInformation:CContextInformation;
}
export class CReqMsgGetPreviousSeqItemActive{
ParentPrescriptionitemOIDBC:number;
SeqnoBC:number;
IsAllowStrikeOutBC:number;
PatientOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetPreviousSeqItemActive{
IsPrevSeqItmActive:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgGetIsMedBarCodeConfigMandatory{
oMedBarCodeConfigRequestBC:MedBarCodeConfigRequest;
oContextInformation:CContextInformation;
}
export class CResMsgGetIsMedBarCodeConfigMandatory{
oMedBarCodeConfigResponse:MedBarCodeConfigResponse;
oContextInformation:CContextInformation;
}
export class CReqMsgInsertMedBarcodeScanLog{
oMedBarcodeScanLogRequestBC:MedBarcodeScanLogRequest;
oContextInformation:CContextInformation;
}
export class CResMsgInsertMedBarcodeScanLog{
oMedBarcodeScanLogResponse:MedBarcodeScanLogResponse;
oContextInformation:CContextInformation;
}
export class CReqMsgGetMedicationScanDetails{
oMedicationScanDetailsRequestBC:MedicationScanDetailsRequest;
oContextInformation:CContextInformation;
}
export class CResMsgGetMedicationScanDetails{
oContextInformation:CContextInformation;
oMedicationScanDetailsResponse:ObservableCollection<MedicationScanDetailsResponse>;
oDrugDetail:ObservableCollection<DrugDetail>;
}
export class CReqMsgGetIsClinicalEncExists{
PatientOIDBC:number;
EncounterOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetIsClinicalEncExists{
IsClinicalEncounter:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgGetMedScanBatchExpiryDetails{
PatientOIDBC:number;
PrescriptionItemScheduleOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetMedScanBatchExpiryDetails{
IsExist:string;
oContextInformation:CContextInformation;
}
export class ArrayOfString extends ObservableCollection<string>{}

 const prototypeList = {"MedicationAdministrationWS.GetPreviousSeqItemActive":CResMsgGetPreviousSeqItemActive.prototype ,
"MedicationAdministrationWS.GetIsMedBarCodeConfigMandatory":CResMsgGetIsMedBarCodeConfigMandatory.prototype ,
"MedicationAdministrationWS.InsertMedBarcodeScanLog":CResMsgInsertMedBarcodeScanLog.prototype ,
"MedicationAdministrationWS.GetMedicationScanDetails":CResMsgGetMedicationScanDetails.prototype ,
"MedicationAdministrationWS.GetIsClinicalEncExists":CResMsgGetIsClinicalEncExists.prototype ,
"MedicationAdministrationWS.GetMedScanBatchExpiryDetails":CResMsgGetMedScanBatchExpiryDetails.prototype ,
"MedicationAdministrationWS.ModifyAdministration":CResMsgModifyAdministration.prototype ,
"MedicationAdministrationWS.GetActiveMedications":CResMsgGetActiveMedications.prototype ,
"MedicationAdministrationWS.GetRecordAdministionDetails":CResMsgGetRecordAdministionDetails.prototype ,
"MedicationAdministrationWS.OmitSlots":CResMsgOmitSlots.prototype ,
"MedicationAdministrationWS.ReinstateSlots":CResMsgReinstateSlots.prototype ,
"MedicationAdministrationWS.UpdateTitratedDose":CResMsgUpdateTitratedDose.prototype ,
"MedicationAdministrationWS.GetIngredientAdminstrationCount":CResMsgGetIngredientAdminstrationCount.prototype ,
"MedicationAdministrationWS.GetConditionalDoseRegime":CResMsgGetConditionalDoseRegime.prototype ,
"MedicationAdministrationWS.MatchDrugEANCode":CResMsgMatchDrugEANCode.prototype ,
"MedicationAdministrationWS.GetLatestObservation":CResMsgGetLatestObservation.prototype ,
"MedicationAdministrationWS.GetAdminListForObservationChart":CResMsgGetAdminListForObservationChart.prototype ,
"MedicationAdministrationWS.GetLifeviewPrintIPPMA":CResMsgGetLifeviewPrintIPPMA.prototype ,
"MedicationAdministrationWS.RecordInfusionAdministration":CResMsgRecordInfusionAdministration.prototype ,
"MedicationAdministrationWS.GetCompatibleComponentDet":CResMsgGetCompatibleComponentDet.prototype ,
"MedicationAdministrationWS.GetItemDispVolandDoseUOMDet":CResMsgGetItemDispVolandDoseUOMDet.prototype ,
"MedicationAdministrationWS.GetUOMTypeList":CResMsgGetUOMTypeList.prototype ,
"MedicationAdministrationWS.GetAllBagDetails":CResMsgGetAllBagDetails.prototype ,
"MedicationAdministrationWS.DrugPrepMatchEANCode":CResMsgDrugPrepMatchEANCode.prototype ,
"MedicationAdministrationWS.StrikeThroughInfusionAdmin":CResMsgStrikeThroughInfusionAdmin.prototype ,
"MedicationAdministrationWS.GetAllinfuactchldDetl":CResMsgGetAllinfuactchldDetl.prototype ,
"MedicationAdministrationWS.GetAllstrikethrdtl":CResMsgGetAllstrikethrdtl.prototype ,
"MedicationAdministrationWS.GetStrikeinfchldDetl":CResMsgGetStrikeinfchldDetl.prototype ,
"MedicationAdministrationWS.GetInfRecAdminDefaultValues":CResMsgGetInfRecAdminDefaultValues.prototype ,
"MedicationAdministrationWS.GetLatestObsOrResultDetails":CResMsgGetLatestObsOrResultDetails.prototype ,
"MedicationAdministrationWS.SubmitMedRequests":CResMsgSubmitMedRequests.prototype ,
"MedicationAdministrationWS.GetPresItemParentChildDetail":CResMsgGetPresItemParentChildDetail.prototype ,
"MedicationAdministrationWS.WhenOmitLaunch":CResMsgWhenOmitLaunch.prototype ,
"MedicationAdministrationWS.ListHardCodedLzoIdMapping":CResMsgListHardCodedLzoIdMapping.prototype ,
"MedicationAdministrationWS.GetPrintMedicationAdminReport":CResMsgGetPrintMedicationAdminReport.prototype ,
"MedicationAdministrationWS.GetMedicationChart":CResMsgGetMedicationChart.prototype ,
"MedicationAdministrationWS.GetMedChartInfoByPatOrEnc":CResMsgGetMedChartInfoByPatOrEnc.prototype ,
"MedicationAdministrationWS.GetEncounterDetailsForMedChart":CResMsgGetEncounterDetailsForMedChart.prototype ,
"MedicationAdministrationWS.GetLockedUsersDetails":CResMsgGetLockedUsersDetails.prototype ,
"MedicationAdministrationWS.UpdateLockingStatusToDeactivated":CResMsgUpdateLockingStatusToDeactivated.prototype ,
"MedicationAdministrationWS.GetMedicationChartForPrint":CResMsgGetMedicationChartForPrint.prototype ,
"MedicationAdministrationWS.GetMedicationChartOverview":CResMsgGetMedicationChartOverview.prototype ,
"MedicationAdministrationWS.GetPrescriptionChart":CResMsgGetPrescriptionChart.prototype ,
"MedicationAdministrationWS.GetInfusionChart":CResMsgGetInfusionChart.prototype ,
"MedicationAdministrationWS.GetIsInfusionChartAlertExists":CResMsgGetIsInfusionChartAlertExists.prototype ,
"MedicationAdministrationWS.UpdateMedChartForHomeLeave":CResMsgUpdateMedChartForHomeLeave.prototype ,
"MedicationAdministrationWS.StrikethroughAdmin":CResMsgStrikethroughAdmin.prototype ,
"MedicationAdministrationWS.GetAdminMultiSlot":CResMsgGetAdminMultiSlot.prototype ,
"MedicationAdministrationWS.GetDrugroundView":CResMsgGetDrugroundView.prototype ,
"MedicationAdministrationWS.IsPGDListsAvailable":CResMsgIsPGDListsAvailable.prototype ,
"MedicationAdministrationWS.GetAssociatedPGDListItem":CResMsgGetAssociatedPGDListItem.prototype ,
"MedicationAdministrationWS.RecordPGD":CResMsgRecordPGD.prototype ,
"MedicationAdministrationWS.GetSlotInfoByOid":CResMsgGetSlotInfoByOid.prototype ,
"MedicationAdministrationWS.GetAmendedPresDetail":CResMsgGetAmendedPresDetail.prototype ,
"MedicationAdministrationWS.GetTitratedDoseDetail":CResMsgGetTitratedDoseDetail.prototype ,
"MedicationAdministrationWS.GetAdministrationList":CResMsgGetAdministrationList.prototype ,
"MedicationAdministrationWS.GetAdministrationListDetails":CResMsgGetAdministrationListDetails.prototype ,
"MedicationAdministrationWS.GetAdminHistoryList":CResMsgGetAdminHistoryList.prototype ,
"MedicationAdministrationWS.GetAdminHistoryListDetails":CResMsgGetAdminHistoryListDetails.prototype ,
"MedicationAdministrationWS.RecordAdministration":CResMsgRecordAdministration.prototype ,
"MedicationAdministrationWS.DummyMethod":CResMsgDummyMethod.prototype ,
"MedicationAdministrationWS.GetSelfAdminDetails":CResMsgGetSelfAdminDetails.prototype ,
"MedicationAdministrationWS.ManageSelfAdmin":CResMsgManageSelfAdmin.prototype ,

CReqMsgGetMedicationChart : { 
ViewMedChartParamsBC:MedChartParams.prototype ,
oContextInformation:CContextInformation.prototype ,

 },DoseRegimeInfusionDetail : { 
RateNumerator:UOM.prototype ,
RateDenominator:UOM.prototype ,
Duration:MeasurableObject.prototype ,

 },ConditionalDoseRegime : { 
ValueUOM:UOM.prototype ,
DoseUOM:UOM.prototype ,
RateUOMOID:UOM.prototype ,
RateDenaminatorUOMOID:UOM.prototype ,

 },SteppedVariableDoseInfo : { 
oDoseSchedule:DoseSchedule.prototype ,

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
ScheduledTimes:Scheduledetails.prototype ,

 },AdministeredTimeDoseDetail : { 
DoseUOM:UOM.prototype ,

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

 },GPConnectItem : { 
Dosage:GPConnectAdminDosage.prototype ,

 },IPPPrescriptionItem : { 
Instruction:ObjectInfo.prototype ,
FrequencyDetails:IPPFrequencyDetails.prototype ,

 },DrugPrepDetail : { 
oPresctiptionItem:IPPMCPresctiptionItem.prototype ,

 },InfusionBagDetail : { 
DoseUOM:UOM.prototype ,
BagVolumeUOM:UOM.prototype ,
InfusedVolumeUOM:UOM.prototype ,
AdministeredBy:ObjectInfo.prototype ,
WitnessedBy:ObjectInfo.prototype ,
WastageUOM:UOM.prototype ,

 },InfusionAdminDetail : { 
InfusionRateUOM:UOM.prototype ,
InfusionRatePerUOM:UOM.prototype ,
DripRateUOM:UOM.prototype ,
DripRatePerUOM:UOM.prototype ,
TopUpDoseUOM:UOM.prototype ,
oInfusionBagDetail:InfusionBagDetail.prototype ,
Route:ObjectInfo.prototype ,
ConcentrationStrengthUOM:UOM.prototype ,
ConcentrationVolumeUOM:UOM.prototype ,
InfusionDoseUOMNumerator:UOM.prototype ,
InfusionDoseUOMDenominator:UOM.prototype ,

 },AdministrationDetail : { 
oRequisitionHistoryDetails:RequisitionHistoryDetails.prototype ,
oAlertsInfoDetails:AlertsInfo.prototype ,
ConcentrationStrengthUOM:UOM.prototype ,
ConcentrationVolumeUOM:UOM.prototype ,
InfusionPeriodUOMforMedAdmin:UOM.prototype ,
oInfusionAdminDetail:InfusionAdminDetail.prototype ,
oUomTypeList:UomTypeList.prototype ,
oSiteList:SiteList.prototype ,
PrescribedRoutes:ObjectInfo.prototype ,
ConcentrationDoseUOMs:ObjectInfo.prototype ,
MedProductDetails:MedsScanProductDetails.prototype ,
MedBarCodeOverrideDetails:CMedBarcodeScanOverrideDetail.prototype ,

 },MedsScanProductDetails : { 
MedBarCodeOverrideDetails:CMedBarcodeScanOverrideDetail.prototype ,

 },SlotDetail : { 
InfRateUOM:UOM.prototype ,
InfRatePerUOM:UOM.prototype ,
AdministrationDetail:AdministrationDetail.prototype ,
oDrugPrepDetail:DrugPrepDetail.prototype ,
EstVolumeInfusedInProgressUOM:UOM.prototype ,
TransactionItemPackDetail:TransactionItemPackDetail.prototype ,

 },DrugHeader : { 
FormViewParameters:PrescriptionItemFormViewParameters.prototype ,
ConcentrationStrengthUOM:UOM.prototype ,
ConcentrationVolumeUOM:UOM.prototype ,

 },DrugDetail : { 
DrugHeader:DrugHeader.prototype ,
SlotDetails:SlotDetail.prototype ,
oSteppedVariableDoseInfo:SteppedVariableDoseInfo.prototype ,
oConditionalDoseRegimeInfo:ConditionalDoseRegime.prototype ,
oDoseRegimeInfusionInfo:DoseRegimeInfusionDetail.prototype ,

 },MedicationChart : { 
oPatientInfo:PatientInfo.prototype ,
ParentMedicationChart:MedicationChart.prototype ,
InfusionChartAlertInfo:InfChartAlertInfo.prototype ,
Encounter:Encounter.prototype ,
DrugDetail:DrugDetail.prototype ,

 },MultiSlotDetail : { 
oSlotDetail:SlotDetail.prototype ,

 },Drugroundview : { 
PatientsWithDue:DrugroundPatientList.prototype ,
PatientsWithNoDue:DrugroundPatientList.prototype ,
PatientsMedList:DrugroundPatientList.prototype ,

 },PGDList : { 
FormViewParameters:PrescriptionItemFormViewParameters.prototype ,
oDrugPrepDetail:DrugPrepDetail.prototype ,
AssociatedObject:ObjectInfo.prototype ,
MedicationSentences:PGDListDetail.prototype ,
Warningdetails:WarningDetails.prototype ,
MultiComponentDetails:IPPMCPresctiptionItem.prototype ,

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

 },PGDAdministration : { 
PGDList:PGDList.prototype ,
AdministeredBy:ObjectInfo.prototype ,
AdministeredDoseUOM:ObjectInfo.prototype ,

 },SelfAdminDrug : { 
oPrescriptionItemView:PrescriptionItemView.prototype ,

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

 },DecisionSupportCriteria : { 
AddedMedication:DecisionSupportBasicCriteria.prototype ,
CurrentMedication:DecisionSupportBasicCriteria.prototype ,

 },DecisionSupportBasicCriteria : { 
DrugItem:DrugBasicData.prototype ,

 },OmitSlotsParams : { 
ManageReviewPeriod:ManageReviewPeriod.prototype ,
OSlotData:SlotData.prototype ,

 },ReinstateSlotParams : { 
ReviewPeriodDtls:ManageReviewPeriod.prototype ,
OSlotData:SlotData.prototype ,

 },Observation : { 
PatientObservation:ObservationValue.prototype ,

 },ObservationValue : { 
ChildObservation:NestedObservations.prototype ,
NestedChildObservation:NestedObservations.prototype ,
ChildObservationValue:ObservationValue.prototype ,
Terms:ObservationTerm.prototype ,

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

 },DrugPrepEANCheckParams : { 
oDrugPrepItems:DrugPrepItem.prototype ,

 },CResMsgGetMedicationChart : { 
MedicationChatView:MedicationChart.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetMedChartInfoByPatOrEnc : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMedChartInfoByPatOrEnc : { 
MedChartData:MedicationChart.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetEncounterDetailsForMedChart : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetEncounterDetailsForMedChart : { 
MedChartData:MedicationChart.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetLockedUsersDetails : { 
oContextInformation:CContextInformation.prototype ,
objAppLockDataBC:AppLockData.prototype ,
objAppReadonlyDataBC:AppLockData.prototype ,
objAppWarnDataBC:AppLockData.prototype ,

 },CResMsgGetLockedUsersDetails : { 
oContextInformation:CContextInformation.prototype ,
oAppLockData:AppLockData.prototype ,

 },CReqMsgUpdateLockingStatusToDeactivated : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgUpdateLockingStatusToDeactivated : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetMedicationChartForPrint : { 
oPrintMedChartParamsBC:MedChartParams.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMedicationChartForPrint : { 
oPrintMedicationChart:MedicationChart.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetMedicationChartOverview : { 
OverviewMedChartParamsBC:MedChartParams.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMedicationChartOverview : { 
oOverviewMedicationChart:MedicationChart.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPrescriptionChart : { 
ViewPrescChartParamsBC:MedChartParams.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPrescriptionChart : { 
oPrescriptionChart:MedicationChart.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetInfusionChart : { 
ViewMedChartParamsBC:MedChartParams.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetInfusionChart : { 
InfusionChatView:MedicationChart.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetIsInfusionChartAlertExists : { 
oContextInformation:CContextInformation.prototype ,
oParamsBC:MedicationDueStatusParams.prototype ,

 },CResMsgGetIsInfusionChartAlertExists : { 
oContextInformation:CContextInformation.prototype ,
oResult:MedicationDueStatus.prototype ,

 },MedicationDueStatus : { 
oPresItemInfAlertInfo:PresItemInfAlertInfo.prototype ,

 },PresItemInfAlertInfo : { 
ModifiedBy:ObjectInfo.prototype ,

 },CReqMsgUpdateMedChartForHomeLeave : { 
oMedChartSetHomeLeaveStatusParamsBC:MedChartStatusUpdateParams.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgUpdateMedChartForHomeLeave : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgStrikethroughAdmin : { 
oStrikethroughAdminBC:CStrikethroughAdmin.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgStrikethroughAdmin : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetAdminMultiSlot : { 
oMultiSlotParamsBC:MultiSlotParams.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAdminMultiSlot : { 
oMultiSlotDetail:MultiSlotDetail.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetDrugroundView : { 
oDrugroundViewParamsBC:DrugroundViewParams.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDrugroundView : { 
oDrugroundView:Drugroundview.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgIsPGDListsAvailable : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgIsPGDListsAvailable : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetAssociatedPGDListItem : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAssociatedPGDListItem : { 
oContextInformation:CContextInformation.prototype ,
oPGDList:PGDList.prototype ,
oPGDListRole:PGDList.prototype ,

 },CReqMsgRecordPGD : { 
oPGDAdministrationBC:PGDAdministration.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgRecordPGD : { 
oPGDResponse:PGDResponse.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetSlotInfoByOid : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetSlotInfoByOid : { 
objAdministrationDetail:AdministrationDetail.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetAmendedPresDetail : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAmendedPresDetail : { 
oContextInformation:CContextInformation.prototype ,
oBasicProperties:IPPPresItemBasicProperties.prototype ,
oAddProperties:PresItemAdditionalProperties.prototype ,

 },CReqMsgGetTitratedDoseDetail : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetTitratedDoseDetail : { 
oDoseDetail:ObjectInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetAdministrationList : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAdministrationList : { 
oContextInformation:CContextInformation.prototype ,
oSlotDetails:SlotDetail.prototype ,

 },CReqMsgGetAdministrationListDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAdministrationListDetails : { 
oContextInformation:CContextInformation.prototype ,
oSlotDetails:SlotDetail.prototype ,

 },CReqMsgGetAdminHistoryList : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAdminHistoryList : { 
oContextInformation:CContextInformation.prototype ,
oAdminHistory:AdminHistory.prototype ,

 },CReqMsgGetAdminHistoryListDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAdminHistoryListDetails : { 
oContextInformation:CContextInformation.prototype ,
oAdminHistoryDetails:AdminHistoryDetails.prototype ,

 },CReqMsgRecordAdministration : { 
objSlotDetailBC:SlotDetail.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgRecordAdministration : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgDummyMethod : { 
oIPPPrescriptionItemBC:IPPPrescriptionItem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgDummyMethod : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetSelfAdminDetails : { 
objManageSelfAdminParamsBC:ManageSelfAdminParams.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetSelfAdminDetails : { 
oContextInformation:CContextInformation.prototype ,
objSelfAdminDrugDetails:SelfAdminDrug.prototype ,

 },CReqMsgManageSelfAdmin : { 
oContextInformation:CContextInformation.prototype ,
objSelfAdminDrugDetailsBC:SelfAdminDrug.prototype ,

 },CResMsgManageSelfAdmin : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgModifyAdministration : { 
objSlotDetailBC:SlotDetail.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgModifyAdministration : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetActiveMedications : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetActiveMedications : { 
oContextInformation:CContextInformation.prototype ,
oDecisionSupportCriteria:DecisionSupportCriteria.prototype ,

 },CReqMsgGetRecordAdministionDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetRecordAdministionDetails : { 
objAdministrationDetail:AdministrationDetail.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgOmitSlots : { 
oOmitSlotsParamsBC:OmitSlotsParams.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgOmitSlots : { 
oContextInformation:CContextInformation.prototype ,
oUpdatedSlotsData:SlotData.prototype ,

 },CReqMsgReinstateSlots : { 
oReinstateSlotParamsBC:ReinstateSlotParams.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgReinstateSlots : { 
oContextInformation:CContextInformation.prototype ,
oUpdatedSlotsData:SlotData.prototype ,

 },CReqMsgUpdateTitratedDose : { 
oDoseScheduleBC:DoseSchedule.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgUpdateTitratedDose : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetIngredientAdminstrationCount : { 
IngAdminParamsBC:IngredientAdminParams.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIngredientAdminstrationCount : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetConditionalDoseRegime : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetConditionalDoseRegime : { 
CondDoseRegime:ConditionalDoseRegimeDetails.prototype ,
oContextInformation:CContextInformation.prototype ,

 },ConditionalDoseRegimeDetails : { 
PatLatestObsResValue:CPatLatestObsResValue.prototype ,
ConditionalDoseRegimeDet:ConditionalDoseRegime.prototype ,

 },CReqMsgMatchDrugEANCode : { 
oMatchEANCodeParamsBC:MatchEANCodeParams.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgMatchDrugEANCode : { 
oMatchEANCodeResult:MatchEANCodeResult.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetLatestObservation : { 
infoBC:EPRDataitemReadParameterInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetLatestObservation : { 
oContextInformation:CContextInformation.prototype ,
oRecordedObservations:Observation.prototype ,

 },CReqMsgGetAdminListForObservationChart : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAdminListForObservationChart : { 
oContextInformation:CContextInformation.prototype ,
oSlotDetails:SlotDetail.prototype ,

 },CReqMsgGetLifeviewPrintIPPMA : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetLifeviewPrintIPPMA : { 
oMedicationItemDetails:MedicationItemDetails.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgRecordInfusionAdministration : { 
objSlotDetailBC:SlotDetail.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgRecordInfusionAdministration : { 
oAlertInfo:AlertsInfo.prototype ,
oSlotDetail:SlotDetail.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetCompatibleComponentDet : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetCompatibleComponentDet : { 
oContextInformation:CContextInformation.prototype ,
objCompatibleComponents:CompatibleItems.prototype ,

 },CReqMsgGetItemDispVolandDoseUOMDet : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetItemDispVolandDoseUOMDet : { 
oContextInformation:CContextInformation.prototype ,
objDisplacementVolume:IPPMCPresctiptionItem.prototype ,
objQuantityUom:IPPMCPresctiptionItem.prototype ,

 },CReqMsgGetUOMTypeList : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetUOMTypeList : { 
oContextInformation:CContextInformation.prototype ,
oUomTypeList:UomTypeList.prototype ,

 },CReqMsgGetAllBagDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAllBagDetails : { 
oContextInformation:CContextInformation.prototype ,
oInfusionBagDetail:InfusionBagDetail.prototype ,

 },CReqMsgDrugPrepMatchEANCode : { 
oDrugPrepEANCheckParamsBC:DrugPrepEANCheckParams.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgDrugPrepMatchEANCode : { 
oMatchEANCodeResult:MatchEANCodeResult.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgStrikeThroughInfusionAdmin : { 
oStrikethroughAdminBC:CStrikethroughAdmin.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgStrikeThroughInfusionAdmin : { 
objSlotDetail:SlotDetail.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetAllinfuactchldDetl : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAllinfuactchldDetl : { 
objAdministrationDetail:AdministrationDetail.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetAllstrikethrdtl : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAllstrikethrdtl : { 
objAdministrationDetail:AdministrationDetail.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetStrikeinfchldDetl : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetStrikeinfchldDetl : { 
objAdministrationDetail:AdministrationDetail.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetInfRecAdminDefaultValues : { 
oInfSumaryViewParamsBC:InfSumaryViewParams.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetInfRecAdminDefaultValues : { 
oDrugDetail:DrugDetail.prototype ,
oDefaultInfRecAdminDetail:AdministrationDetail.prototype ,
oInfSumaryViewAdminDetail:AdministrationDetail.prototype ,
oContextInformation:CContextInformation.prototype ,
oInfAdministeredTimes:InfAdministeredTimes.prototype ,

 },CReqMsgGetLatestObsOrResultDetails : { 
oPatLatObsResParamsBC:CPatLatestObsResParams.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetLatestObsOrResultDetails : { 
oPatLatObsResVal:CPatLatestObsResValue.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgSubmitMedRequests : { 
oContextInformation:CContextInformation.prototype ,
oRequisitionHistoryDetailsBC:RequisitionHistoryDetails.prototype ,
oCancelledPresReqHistoryDetailsBC:CancelledPresReqHistoryDetails.prototype ,

 },CResMsgSubmitMedRequests : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPresItemParentChildDetail : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPresItemParentChildDetail : { 
oPrescScheAmendedDetail:PresItemParentChildDetail.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgWhenOmitLaunch : { 
oOmitLaunchParamsBC:OmitLaunchParams.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgWhenOmitLaunch : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgListHardCodedLzoIdMapping : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgListHardCodedLzoIdMapping : { 
oContextInformation:CContextInformation.prototype ,
objFrequency:HardCodedFrequencyMap.prototype ,

 },CReqMsgGetPrintMedicationAdminReport : { 
oPrintMedChartParamsBC:MedChartParams.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPrintMedicationAdminReport : { 
oPrintMedicationChart:MedicationChart.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPreviousSeqItemActive : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPreviousSeqItemActive : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetIsMedBarCodeConfigMandatory : { 
oMedBarCodeConfigRequestBC:MedBarCodeConfigRequest.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIsMedBarCodeConfigMandatory : { 
oMedBarCodeConfigResponse:MedBarCodeConfigResponse.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgInsertMedBarcodeScanLog : { 
oMedBarcodeScanLogRequestBC:MedBarcodeScanLogRequest.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgInsertMedBarcodeScanLog : { 
oMedBarcodeScanLogResponse:MedBarcodeScanLogResponse.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetMedicationScanDetails : { 
oMedicationScanDetailsRequestBC:MedicationScanDetailsRequest.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMedicationScanDetails : { 
oContextInformation:CContextInformation.prototype ,
oMedicationScanDetailsResponse:MedicationScanDetailsResponse.prototype ,
oDrugDetail:DrugDetail.prototype ,

 },CReqMsgGetIsClinicalEncExists : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIsClinicalEncExists : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetMedScanBatchExpiryDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMedScanBatchExpiryDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CContextInformation : { 
Current:CContextInformation.prototype ,

 },
 }
 
const charPropertyLookup = [
'ProfileDiscontinuedDrugFlag',
'IsTechValidateCA','MonPeriodMand','IsExcludeGuidanceInSearch',
'IsAdministered','IsControlledDrug',
'IsCriticalMedication',
'IsPGD',
'Status',
'IsPRNDose','IsDrugApprovalRequired','IsConflictsExists','IsDoseCalcExist','IsAmendment','IsNonformulary','ReplaceDrugActiveStatus','DrugVersionMatch','HIIsAckn','IsReoderIconEnable','IssIDSNewMeds','IsInclude72HrsCompletedORDisconItem','IsVolumeBasedInfusion',
'IsSupplyReq',
'IsPresItemLevelDispense','ExistsOnAdmission',
'IsFixedAdministration','StatIndicator','PRNScheduledDet',
'HasWarnings','IsHold','PrintStatus','HasDoseCalculation',
'IsSupplyRequested',
'IsCurrent',
'IsCurrentMedication','IsDeactivated',
'LineIndicator',
'IsOxygen',
'UpdatePatientRecord','IsDailyDose',
'CanDoseBeChanged','HasProhibitedRoute',
'IsDoseCombinationsDefined',
'IsPCA',
'IsActionPerformed',
'NotifyFlag',
'IsStruckout','IsMedScannedProduct',
'AdministeredOnTimeMode','IsInfusion','IsBolus',
'IsProductScanned',
'IsConflictExists',
'Current',
'IsReqMedEnable',
'IsCMON','IsEmergency',
'IsOverDue','IsDue','IsPRNDrug','IsPlannedSlot','cIsDuplicate','IsInfusionAlert','DisplaySequence',
'ISRECORDEDFROMDEVICE',
'IsDNR',
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
'IsPatWBMandateScan','IsMedMandateScan',
'IsExist',]
 