import { CContextInformation, CLZOObject, byte  } from "epma-platform/models";
//import { int64, int16, int32, uInt16, uInt32, uInt64, byte, long, double, decimal, DelegateArgs, CContextInformation, } from "epma-platform/models";
import { ObservableCollection } from "../models/observable-collection";
import DateTime from "../services/datetime.service";
import { HelperService } from "./helper.service";
export class MedicationMgmtWSSoapClient{

GetFormularyByOIDCompleted: Function;
GetFormularyByOIDAsync(oCReqMsgGetFormularyByOID:CReqMsgGetFormularyByOID ) : void {
  HelperService.Invoke<CReqMsgGetFormularyByOID,CResMsgGetFormularyByOID,GetFormularyByOIDCompletedEventArgs>("MedicationMgmtWS.GetFormularyByOID",oCReqMsgGetFormularyByOID,this.GetFormularyByOIDCompleted,"oDeativeEntity",new GetFormularyByOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFavouritesByOIDCompleted: Function;
GetFavouritesByOIDAsync(oCReqMsgGetFavouritesByOID:CReqMsgGetFavouritesByOID ) : void {
  HelperService.Invoke<CReqMsgGetFavouritesByOID,CResMsgGetFavouritesByOID,GetFavouritesByOIDCompletedEventArgs>("MedicationMgmtWS.GetFavouritesByOID",oCReqMsgGetFavouritesByOID,this.GetFavouritesByOIDCompleted,"oDeativeEntity",new GetFavouritesByOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFormViewParmByOIDCompleted: Function;
GetFormViewParmByOIDAsync(oCReqMsgGetFormViewParmByOID:CReqMsgGetFormViewParmByOID ) : void {
  HelperService.Invoke<CReqMsgGetFormViewParmByOID,CResMsgGetFormViewParmByOID,GetFormViewParmByOIDCompletedEventArgs>("MedicationMgmtWS.GetFormViewParmByOID",oCReqMsgGetFormViewParmByOID,this.GetFormViewParmByOIDCompleted,"oDeativeEntity",new GetFormViewParmByOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetItemFreqByOIDCompleted: Function;
GetItemFreqByOIDAsync(oCReqMsgGetItemFreqByOID:CReqMsgGetItemFreqByOID ) : void {
  HelperService.Invoke<CReqMsgGetItemFreqByOID,CResMsgGetItemFreqByOID,GetItemFreqByOIDCompletedEventArgs>("MedicationMgmtWS.GetItemFreqByOID",oCReqMsgGetItemFreqByOID,this.GetItemFreqByOIDCompleted,"oDeativeEntity",new GetItemFreqByOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetROAByOIDCompleted: Function;
GetROAByOIDAsync(oCReqMsgGetROAByOID:CReqMsgGetROAByOID ) : void {
  HelperService.Invoke<CReqMsgGetROAByOID,CResMsgGetROAByOID,GetROAByOIDCompletedEventArgs>("MedicationMgmtWS.GetROAByOID",oCReqMsgGetROAByOID,this.GetROAByOIDCompleted,"oDeativeEntity",new GetROAByOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetAdminInstructionCompleted: Function;
GetAdminInstructionAsync(oCReqMsgGetAdminInstruction:CReqMsgGetAdminInstruction ) : void {
  HelperService.Invoke<CReqMsgGetAdminInstruction,CResMsgGetAdminInstruction,GetAdminInstructionCompletedEventArgs>("MedicationMgmtWS.GetAdminInstruction",oCReqMsgGetAdminInstruction,this.GetAdminInstructionCompleted,"objAdminInstruction",new GetAdminInstructionCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CreateRouteCompleted: Function;
CreateRouteAsync(oCReqMsgCreateRoute:CReqMsgCreateRoute ) : void {
  HelperService.Invoke<CReqMsgCreateRoute,CResMsgCreateRoute,CreateRouteCompletedEventArgs>("MedicationMgmtWS.CreateRoute",oCReqMsgCreateRoute,this.CreateRouteCompleted,"route",new CreateRouteCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CheckItemExistsCompleted: Function;
CheckItemExistsAsync(oCReqMsgCheckItemExists:CReqMsgCheckItemExists ) : void {
  HelperService.Invoke<CReqMsgCheckItemExists,CResMsgCheckItemExists,CheckItemExistsCompletedEventArgs>("MedicationMgmtWS.CheckItemExists",oCReqMsgCheckItemExists,this.CheckItemExistsCompleted,"sMcversionNo",new CheckItemExistsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFrequenciesCompleted: Function;
GetFrequenciesAsync(oCReqMsgGetFrequencies:CReqMsgGetFrequencies ) : void {
  HelperService.Invoke<CReqMsgGetFrequencies,CResMsgGetFrequencies,GetFrequenciesCompletedEventArgs>("MedicationMgmtWS.GetFrequencies",oCReqMsgGetFrequencies,this.GetFrequenciesCompleted,"IsDuplicate",new GetFrequenciesCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFrequencyByOIDCompleted: Function;
GetFrequencyByOIDAsync(oCReqMsgGetFrequencyByOID:CReqMsgGetFrequencyByOID ) : void {
  HelperService.Invoke<CReqMsgGetFrequencyByOID,CResMsgGetFrequencyByOID,GetFrequencyByOIDCompletedEventArgs>("MedicationMgmtWS.GetFrequencyByOID",oCReqMsgGetFrequencyByOID,this.GetFrequencyByOIDCompleted,"sMcVersionNo",new GetFrequencyByOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetBaseFrequenciesCompleted: Function;
GetBaseFrequenciesAsync(oCReqMsgGetBaseFrequencies:CReqMsgGetBaseFrequencies ) : void {
  HelperService.Invoke<CReqMsgGetBaseFrequencies,CResMsgGetBaseFrequencies,GetBaseFrequenciesCompletedEventArgs>("MedicationMgmtWS.GetBaseFrequencies",oCReqMsgGetBaseFrequencies,this.GetBaseFrequenciesCompleted,"MCVersion",new GetBaseFrequenciesCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CheckFrequencyIsLinkedCompleted: Function;
CheckFrequencyIsLinkedAsync(oCReqMsgCheckFrequencyIsLinked:CReqMsgCheckFrequencyIsLinked ) : void {
  HelperService.Invoke<CReqMsgCheckFrequencyIsLinked,CResMsgCheckFrequencyIsLinked,CheckFrequencyIsLinkedCompletedEventArgs>("MedicationMgmtWS.CheckFrequencyIsLinked",oCReqMsgCheckFrequencyIsLinked,this.CheckFrequencyIsLinkedCompleted,"sMcVersionNo",new CheckFrequencyIsLinkedCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ChkFreqCustomisedCompleted: Function;
ChkFreqCustomisedAsync(oCReqMsgChkFreqCustomised:CReqMsgChkFreqCustomised ) : void {
  HelperService.Invoke<CReqMsgChkFreqCustomised,CResMsgChkFreqCustomised,ChkFreqCustomisedCompletedEventArgs>("MedicationMgmtWS.ChkFreqCustomised",oCReqMsgChkFreqCustomised,this.ChkFreqCustomisedCompleted,"sMCVersion",new ChkFreqCustomisedCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMedicationCodeCompleted: Function;
GetMedicationCodeAsync(oCReqMsgGetMedicationCode:CReqMsgGetMedicationCode ) : void {
  HelperService.Invoke<CReqMsgGetMedicationCode,CResMsgGetMedicationCode,GetMedicationCodeCompletedEventArgs>("MedicationMgmtWS.GetMedicationCode",oCReqMsgGetMedicationCode,this.GetMedicationCodeCompleted,"sMcversionNo",new GetMedicationCodeCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CreateFrequencyCompleted: Function;
CreateFrequencyAsync(oCReqMsgCreateFrequency:CReqMsgCreateFrequency ) : void {
  HelperService.Invoke<CReqMsgCreateFrequency,CResMsgCreateFrequency,CreateFrequencyCompletedEventArgs>("MedicationMgmtWS.CreateFrequency",oCReqMsgCreateFrequency,this.CreateFrequencyCompleted,"oFrequency",new CreateFrequencyCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ModifyFrequencyCompleted: Function;
ModifyFrequencyAsync(oCReqMsgModifyFrequency:CReqMsgModifyFrequency ) : void {
  HelperService.Invoke<CReqMsgModifyFrequency,CResMsgModifyFrequency,ModifyFrequencyCompletedEventArgs>("MedicationMgmtWS.ModifyFrequency",oCReqMsgModifyFrequency,this.ModifyFrequencyCompleted,"oFrequency",new ModifyFrequencyCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFormNamesCompleted: Function;
GetFormNamesAsync(oCReqMsgGetFormNames:CReqMsgGetFormNames ) : void {
  HelperService.Invoke<CReqMsgGetFormNames,CResMsgGetFormNames,GetFormNamesCompletedEventArgs>("MedicationMgmtWS.GetFormNames",oCReqMsgGetFormNames,this.GetFormNamesCompleted,"lnOID",new GetFormNamesCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ManagePrescriptionFormsCompleted: Function;
ManagePrescriptionFormsAsync(oCReqMsgManagePrescriptionForms:CReqMsgManagePrescriptionForms ) : void {
  HelperService.Invoke<CReqMsgManagePrescriptionForms,CResMsgManagePrescriptionForms,ManagePrescriptionFormsCompletedEventArgs>("MedicationMgmtWS.ManagePrescriptionForms",oCReqMsgManagePrescriptionForms,this.ManagePrescriptionFormsCompleted,"oMngPresForms",new ManagePrescriptionFormsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CheckValidDateCompleted: Function;
CheckValidDateAsync(oCReqMsgCheckValidDate:CReqMsgCheckValidDate ) : void {
  HelperService.Invoke<CReqMsgCheckValidDate,CResMsgCheckValidDate,CheckValidDateCompletedEventArgs>("MedicationMgmtWS.CheckValidDate",oCReqMsgCheckValidDate,this.CheckValidDateCompleted,"dtmMedForm",new CheckValidDateCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDoseDetailsCompleted: Function;
GetDoseDetailsAsync(oCReqMsgGetDoseDetails:CReqMsgGetDoseDetails ) : void {
  HelperService.Invoke<CReqMsgGetDoseDetails,CResMsgGetDoseDetails,GetDoseDetailsCompletedEventArgs>("MedicationMgmtWS.GetDoseDetails",oCReqMsgGetDoseDetails,this.GetDoseDetailsCompleted,"Presbasicinfo",new GetDoseDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

IngManageActivePeriodsCompleted: Function;
IngManageActivePeriodsAsync(oCReqMsgIngManageActivePeriods:CReqMsgIngManageActivePeriods ) : void {
  HelperService.Invoke<CReqMsgIngManageActivePeriods,CResMsgIngManageActivePeriods,IngManageActivePeriodsCompletedEventArgs>("MedicationMgmtWS.IngManageActivePeriods",oCReqMsgIngManageActivePeriods,this.IngManageActivePeriodsCompleted,"oManageActivePeriods",new IngManageActivePeriodsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

HiManageActivePeriodsCompleted: Function;
HiManageActivePeriodsAsync(oCReqMsgHiManageActivePeriods:CReqMsgHiManageActivePeriods ) : void {
  HelperService.Invoke<CReqMsgHiManageActivePeriods,CResMsgHiManageActivePeriods,HiManageActivePeriodsCompletedEventArgs>("MedicationMgmtWS.HiManageActivePeriods",oCReqMsgHiManageActivePeriods,this.HiManageActivePeriodsCompleted,"oManageActivePeriods",new HiManageActivePeriodsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

PreManageActivePeriodsCompleted: Function;
PreManageActivePeriodsAsync(oCReqMsgPreManageActivePeriods:CReqMsgPreManageActivePeriods ) : void {
  HelperService.Invoke<CReqMsgPreManageActivePeriods,CResMsgPreManageActivePeriods,PreManageActivePeriodsCompletedEventArgs>("MedicationMgmtWS.PreManageActivePeriods",oCReqMsgPreManageActivePeriods,this.PreManageActivePeriodsCompleted,"oManageActivePeriods",new PreManageActivePeriodsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ForManageActivePeriodsCompleted: Function;
ForManageActivePeriodsAsync(oCReqMsgForManageActivePeriods:CReqMsgForManageActivePeriods ) : void {
  HelperService.Invoke<CReqMsgForManageActivePeriods,CResMsgForManageActivePeriods,ForManageActivePeriodsCompletedEventArgs>("MedicationMgmtWS.ForManageActivePeriods",oCReqMsgForManageActivePeriods,this.ForManageActivePeriodsCompleted,"oManageActivePeriods",new ForManageActivePeriodsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

IntManageActivePeriodsCompleted: Function;
IntManageActivePeriodsAsync(oCReqMsgIntManageActivePeriods:CReqMsgIntManageActivePeriods ) : void {
  HelperService.Invoke<CReqMsgIntManageActivePeriods,CResMsgIntManageActivePeriods,IntManageActivePeriodsCompletedEventArgs>("MedicationMgmtWS.IntManageActivePeriods",oCReqMsgIntManageActivePeriods,this.IntManageActivePeriodsCompleted,"oManageActivePeriods",new IntManageActivePeriodsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

SenManageActivePeriodsCompleted: Function;
SenManageActivePeriodsAsync(oCReqMsgSenManageActivePeriods:CReqMsgSenManageActivePeriods ) : void {
  HelperService.Invoke<CReqMsgSenManageActivePeriods,CResMsgSenManageActivePeriods,SenManageActivePeriodsCompletedEventArgs>("MedicationMgmtWS.SenManageActivePeriods",oCReqMsgSenManageActivePeriods,this.SenManageActivePeriodsCompleted,"oManageActivePeriods",new SenManageActivePeriodsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

MedManageActivePeriodsCompleted: Function;
MedManageActivePeriodsAsync(oCReqMsgMedManageActivePeriods:CReqMsgMedManageActivePeriods ) : void {
  HelperService.Invoke<CReqMsgMedManageActivePeriods,CResMsgMedManageActivePeriods,MedManageActivePeriodsCompletedEventArgs>("MedicationMgmtWS.MedManageActivePeriods",oCReqMsgMedManageActivePeriods,this.MedManageActivePeriodsCompleted,"oManageActivePeriods",new MedManageActivePeriodsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

FvpManageActivePeriodsCompleted: Function;
FvpManageActivePeriodsAsync(oCReqMsgFvpManageActivePeriods:CReqMsgFvpManageActivePeriods ) : void {
  HelperService.Invoke<CReqMsgFvpManageActivePeriods,CResMsgFvpManageActivePeriods,FvpManageActivePeriodsCompletedEventArgs>("MedicationMgmtWS.FvpManageActivePeriods",oCReqMsgFvpManageActivePeriods,this.FvpManageActivePeriodsCompleted,"oManageActivePeriods",new FvpManageActivePeriodsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ItmFreqManageActivePeriodsCompleted: Function;
ItmFreqManageActivePeriodsAsync(oCReqMsgItmFreqManageActivePeriods:CReqMsgItmFreqManageActivePeriods ) : void {
  HelperService.Invoke<CReqMsgItmFreqManageActivePeriods,CResMsgItmFreqManageActivePeriods,ItmFreqManageActivePeriodsCompletedEventArgs>("MedicationMgmtWS.ItmFreqManageActivePeriods",oCReqMsgItmFreqManageActivePeriods,this.ItmFreqManageActivePeriodsCompleted,"oManageActivePeriods",new ItmFreqManageActivePeriodsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ROAManageActivePeriodsCompleted: Function;
ROAManageActivePeriodsAsync(oCReqMsgROAManageActivePeriods:CReqMsgROAManageActivePeriods ) : void {
  HelperService.Invoke<CReqMsgROAManageActivePeriods,CResMsgROAManageActivePeriods,ROAManageActivePeriodsCompletedEventArgs>("MedicationMgmtWS.ROAManageActivePeriods",oCReqMsgROAManageActivePeriods,this.ROAManageActivePeriodsCompleted,"oManageActivePeriods",new ROAManageActivePeriodsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetIngredientByOIDCompleted: Function;
GetIngredientByOIDAsync(oCReqMsgGetIngredientByOID:CReqMsgGetIngredientByOID ) : void {
  HelperService.Invoke<CReqMsgGetIngredientByOID,CResMsgGetIngredientByOID,GetIngredientByOIDCompletedEventArgs>("MedicationMgmtWS.GetIngredientByOID",oCReqMsgGetIngredientByOID,this.GetIngredientByOIDCompleted,"oDeativeEntity",new GetIngredientByOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetInteractionGrpByOIDCompleted: Function;
GetInteractionGrpByOIDAsync(oCReqMsgGetInteractionGrpByOID:CReqMsgGetInteractionGrpByOID ) : void {
  HelperService.Invoke<CReqMsgGetInteractionGrpByOID,CResMsgGetInteractionGrpByOID,GetInteractionGrpByOIDCompletedEventArgs>("MedicationMgmtWS.GetInteractionGrpByOID",oCReqMsgGetInteractionGrpByOID,this.GetInteractionGrpByOIDCompleted,"oDeativeEntity",new GetInteractionGrpByOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetSensitivityGrpByOIDCompleted: Function;
GetSensitivityGrpByOIDAsync(oCReqMsgGetSensitivityGrpByOID:CReqMsgGetSensitivityGrpByOID ) : void {
  HelperService.Invoke<CReqMsgGetSensitivityGrpByOID,CResMsgGetSensitivityGrpByOID,GetSensitivityGrpByOIDCompletedEventArgs>("MedicationMgmtWS.GetSensitivityGrpByOID",oCReqMsgGetSensitivityGrpByOID,this.GetSensitivityGrpByOIDCompleted,"oDeativeEntity",new GetSensitivityGrpByOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetHierarchyByOIDCompleted: Function;
GetHierarchyByOIDAsync(oCReqMsgGetHierarchyByOID:CReqMsgGetHierarchyByOID ) : void {
  HelperService.Invoke<CReqMsgGetHierarchyByOID,CResMsgGetHierarchyByOID,GetHierarchyByOIDCompletedEventArgs>("MedicationMgmtWS.GetHierarchyByOID",oCReqMsgGetHierarchyByOID,this.GetHierarchyByOIDCompleted,"oDeativeEntity",new GetHierarchyByOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPrescribableItemByOIDCompleted: Function;
GetPrescribableItemByOIDAsync(oCReqMsgGetPrescribableItemByOID:CReqMsgGetPrescribableItemByOID ) : void {
  HelperService.Invoke<CReqMsgGetPrescribableItemByOID,CResMsgGetPrescribableItemByOID,GetPrescribableItemByOIDCompletedEventArgs>("MedicationMgmtWS.GetPrescribableItemByOID",oCReqMsgGetPrescribableItemByOID,this.GetPrescribableItemByOIDCompleted,"oDeativeEntity",new GetPrescribableItemByOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

IsGroupDetailsExistsCompleted: Function;
IsGroupDetailsExistsAsync(oCReqMsgIsGroupDetailsExists:CReqMsgIsGroupDetailsExists ) : void {
  HelperService.Invoke<CReqMsgIsGroupDetailsExists,CResMsgIsGroupDetailsExists,IsGroupDetailsExistsCompletedEventArgs>("MedicationMgmtWS.IsGroupDetailsExists",oCReqMsgIsGroupDetailsExists,this.IsGroupDetailsExistsCompleted,"sCAName",new IsGroupDetailsExistsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ManageMonographCompleted: Function;
ManageMonographAsync(oCReqMsgManageMonograph:CReqMsgManageMonograph ) : void {
  HelperService.Invoke<CReqMsgManageMonograph,CResMsgManageMonograph,ManageMonographCompletedEventArgs>("MedicationMgmtWS.ManageMonograph",oCReqMsgManageMonograph,this.ManageMonographCompleted,"sMCVersion",new ManageMonographCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMonographContentCompleted: Function;
GetMonographContentAsync(oCReqMsgGetMonographContent:CReqMsgGetMonographContent ) : void {
  HelperService.Invoke<CReqMsgGetMonographContent,CResMsgGetMonographContent,GetMonographContentCompletedEventArgs>("MedicationMgmtWS.GetMonographContent",oCReqMsgGetMonographContent,this.GetMonographContentCompleted,"sMCVersion",new GetMonographContentCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDrugXMLInfoCompleted: Function;
GetDrugXMLInfoAsync(oCReqMsgGetDrugXMLInfo:CReqMsgGetDrugXMLInfo ) : void {
  HelperService.Invoke<CReqMsgGetDrugXMLInfo,CResMsgGetDrugXMLInfo,GetDrugXMLInfoCompletedEventArgs>("MedicationMgmtWS.GetDrugXMLInfo",oCReqMsgGetDrugXMLInfo,this.GetDrugXMLInfoCompleted,"sMCVersion",new GetDrugXMLInfoCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMonographDetailsCompleted: Function;
GetMonographDetailsAsync(oCReqMsgGetMonographDetails:CReqMsgGetMonographDetails ) : void {
  HelperService.Invoke<CReqMsgGetMonographDetails,CResMsgGetMonographDetails,GetMonographDetailsCompletedEventArgs>("MedicationMgmtWS.GetMonographDetails",oCReqMsgGetMonographDetails,this.GetMonographDetailsCompleted,"sMCVersionNo",new GetMonographDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetStrengthOrderDetailsCompleted: Function;
GetStrengthOrderDetailsAsync(oCReqMsgGetStrengthOrderDetails:CReqMsgGetStrengthOrderDetails ) : void {
  HelperService.Invoke<CReqMsgGetStrengthOrderDetails,CResMsgGetStrengthOrderDetails,GetStrengthOrderDetailsCompletedEventArgs>("MedicationMgmtWS.GetStrengthOrderDetails",oCReqMsgGetStrengthOrderDetails,this.GetStrengthOrderDetailsCompleted,"objReqPresItemList",new GetStrengthOrderDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ManagestrengthorderCompleted: Function;
ManagestrengthorderAsync(oCReqMsgManagestrengthorder:CReqMsgManagestrengthorder ) : void {
  HelperService.Invoke<CReqMsgManagestrengthorder,CResMsgManagestrengthorder,ManagestrengthorderCompletedEventArgs>("MedicationMgmtWS.Managestrengthorder",oCReqMsgManagestrengthorder,this.ManagestrengthorderCompleted,"objPresItemList",new ManagestrengthorderCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetConflictWarningCategoryCompleted: Function;
GetConflictWarningCategoryAsync(oCReqMsgGetConflictWarningCategory:CReqMsgGetConflictWarningCategory ) : void {
  HelperService.Invoke<CReqMsgGetConflictWarningCategory,CResMsgGetConflictWarningCategory,GetConflictWarningCategoryCompletedEventArgs>("MedicationMgmtWS.GetConflictWarningCategory",oCReqMsgGetConflictWarningCategory,this.GetConflictWarningCategoryCompleted,"sMcversionNo",new GetConflictWarningCategoryCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetUserFavouritesChildGroupCompleted: Function;
GetUserFavouritesChildGroupAsync(oCReqMsgGetUserFavouritesChildGroup:CReqMsgGetUserFavouritesChildGroup ) : void {
  HelperService.Invoke<CReqMsgGetUserFavouritesChildGroup,CResMsgGetUserFavouritesChildGroup,GetUserFavouritesChildGroupCompletedEventArgs>("MedicationMgmtWS.GetUserFavouritesChildGroup",oCReqMsgGetUserFavouritesChildGroup,this.GetUserFavouritesChildGroupCompleted,"MCVersion",new GetUserFavouritesChildGroupCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetUserFavouritesGroupItemsCompleted: Function;
GetUserFavouritesGroupItemsAsync(oCReqMsgGetUserFavouritesGroupItems:CReqMsgGetUserFavouritesGroupItems ) : void {
  HelperService.Invoke<CReqMsgGetUserFavouritesGroupItems,CResMsgGetUserFavouritesGroupItems,GetUserFavouritesGroupItemsCompletedEventArgs>("MedicationMgmtWS.GetUserFavouritesGroupItems",oCReqMsgGetUserFavouritesGroupItems,this.GetUserFavouritesGroupItemsCompleted,"MCVersion",new GetUserFavouritesGroupItemsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetProcessingItemDetailsCompleted: Function;
GetProcessingItemDetailsAsync(oCReqMsgGetProcessingItemDetails:CReqMsgGetProcessingItemDetails ) : void {
  HelperService.Invoke<CReqMsgGetProcessingItemDetails,CResMsgGetProcessingItemDetails,GetProcessingItemDetailsCompletedEventArgs>("MedicationMgmtWS.GetProcessingItemDetails",oCReqMsgGetProcessingItemDetails,this.GetProcessingItemDetailsCompleted,"sMcVersionNo",new GetProcessingItemDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFavouritesSearchCompleted: Function;
GetFavouritesSearchAsync(oCReqMsgGetFavouritesSearch:CReqMsgGetFavouritesSearch ) : void {
  HelperService.Invoke<CReqMsgGetFavouritesSearch,CResMsgGetFavouritesSearch,GetFavouritesSearchCompletedEventArgs>("MedicationMgmtWS.GetFavouritesSearch",oCReqMsgGetFavouritesSearch,this.GetFavouritesSearchCompleted,"sMCVerNo",new GetFavouritesSearchCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDrugSiteCompleted: Function;
GetDrugSiteAsync(oCReqMsgGetDrugSite:CReqMsgGetDrugSite ) : void {
  HelperService.Invoke<CReqMsgGetDrugSite,CResMsgGetDrugSite,GetDrugSiteCompletedEventArgs>("MedicationMgmtWS.GetDrugSite",oCReqMsgGetDrugSite,this.GetDrugSiteCompleted,"objReqGetDrugSite",new GetDrugSiteCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPrsItemDetailsCompleted: Function;
GetPrsItemDetailsAsync(oCReqMsgGetPrsItemDetails:CReqMsgGetPrsItemDetails ) : void {
  HelperService.Invoke<CReqMsgGetPrsItemDetails,CResMsgGetPrsItemDetails,GetPrsItemDetailsCompletedEventArgs>("MedicationMgmtWS.GetPrsItemDetails",oCReqMsgGetPrsItemDetails,this.GetPrsItemDetailsCompleted,"sMcversionNo",new GetPrsItemDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPresItemModifyDetailsCompleted: Function;
GetPresItemModifyDetailsAsync(oCReqMsgGetPresItemModifyDetails:CReqMsgGetPresItemModifyDetails ) : void {
  HelperService.Invoke<CReqMsgGetPresItemModifyDetails,CResMsgGetPresItemModifyDetails,GetPresItemModifyDetailsCompletedEventArgs>("MedicationMgmtWS.GetPresItemModifyDetails",oCReqMsgGetPresItemModifyDetails,this.GetPresItemModifyDetailsCompleted,"sMcversionNo",new GetPresItemModifyDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetSteppedVariableDoseDetailsCompleted: Function;
GetSteppedVariableDoseDetailsAsync(oCReqMsgGetSteppedVariableDoseDetails:CReqMsgGetSteppedVariableDoseDetails ) : void {
  HelperService.Invoke<CReqMsgGetSteppedVariableDoseDetails,CResMsgGetSteppedVariableDoseDetails,GetSteppedVariableDoseDetailsCompletedEventArgs>("MedicationMgmtWS.GetSteppedVariableDoseDetails",oCReqMsgGetSteppedVariableDoseDetails,this.GetSteppedVariableDoseDetailsCompleted,"sMcversionNo",new GetSteppedVariableDoseDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

NotifyNewversionCompleted: Function;
NotifyNewversionAsync(oCReqMsgNotifyNewversion:CReqMsgNotifyNewversion ) : void {
  HelperService.Invoke<CReqMsgNotifyNewversion,CResMsgNotifyNewversion,NotifyNewversionCompletedEventArgs>("MedicationMgmtWS.NotifyNewversion",oCReqMsgNotifyNewversion,this.NotifyNewversionCompleted,"oNotifyVersionDetails",new NotifyNewversionCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ValiadteSentVersionCompleted: Function;
ValiadteSentVersionAsync(oCReqMsgValiadteSentVersion:CReqMsgValiadteSentVersion ) : void {
  HelperService.Invoke<CReqMsgValiadteSentVersion,CResMsgValiadteSentVersion,ValiadteSentVersionCompletedEventArgs>("MedicationMgmtWS.ValiadteSentVersion",oCReqMsgValiadteSentVersion,this.ValiadteSentVersionCompleted,"oNotifyVersionDetail",new ValiadteSentVersionCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetStationaryItemCompleted: Function;
GetStationaryItemAsync(oCReqMsgGetStationaryItem:CReqMsgGetStationaryItem ) : void {
  HelperService.Invoke<CReqMsgGetStationaryItem,CResMsgGetStationaryItem,GetStationaryItemCompletedEventArgs>("MedicationMgmtWS.GetStationaryItem",oCReqMsgGetStationaryItem,this.GetStationaryItemCompleted,"objReqGetStationaryItem",new GetStationaryItemCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetStationaryItemsCompleted: Function;
GetStationaryItemsAsync(oCReqMsgGetStationaryItems:CReqMsgGetStationaryItems ) : void {
  HelperService.Invoke<CReqMsgGetStationaryItems,CResMsgGetStationaryItems,GetStationaryItemsCompletedEventArgs>("MedicationMgmtWS.GetStationaryItems",oCReqMsgGetStationaryItems,this.GetStationaryItemsCompleted,"organisationoid",new GetStationaryItemsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

lnCheckExistPresItemCompleted: Function;
lnCheckExistPresItemAsync(oCReqMsglnCheckExistPresItem:CReqMsglnCheckExistPresItem ) : void {
  HelperService.Invoke<CReqMsglnCheckExistPresItem,CResMsglnCheckExistPresItem,lnCheckExistPresItemCompletedEventArgs>("MedicationMgmtWS.lnCheckExistPresItem",oCReqMsglnCheckExistPresItem,this.lnCheckExistPresItemCompleted,"objPrescribeItemDetails",new lnCheckExistPresItemCompletedEventArgs(), prototypeList, charPropertyLookup);
}

lnCheckExistDrugFavouritesCompleted: Function;
lnCheckExistDrugFavouritesAsync(oCReqMsglnCheckExistDrugFavourites:CReqMsglnCheckExistDrugFavourites ) : void {
  HelperService.Invoke<CReqMsglnCheckExistDrugFavourites,CResMsglnCheckExistDrugFavourites,lnCheckExistDrugFavouritesCompletedEventArgs>("MedicationMgmtWS.lnCheckExistDrugFavourites",oCReqMsglnCheckExistDrugFavourites,this.lnCheckExistDrugFavouritesCompleted,"sMCVersion",new lnCheckExistDrugFavouritesCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CreateFormViewParametersCompleted: Function;
CreateFormViewParametersAsync(oCReqMsgCreateFormViewParameters:CReqMsgCreateFormViewParameters ) : void {
  HelperService.Invoke<CReqMsgCreateFormViewParameters,CResMsgCreateFormViewParameters,CreateFormViewParametersCompletedEventArgs>("MedicationMgmtWS.CreateFormViewParameters",oCReqMsgCreateFormViewParameters,this.CreateFormViewParametersCompleted,"oFrmViewParameter",new CreateFormViewParametersCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ModifyFormViewParametersCompleted: Function;
ModifyFormViewParametersAsync(oCReqMsgModifyFormViewParameters:CReqMsgModifyFormViewParameters ) : void {
  HelperService.Invoke<CReqMsgModifyFormViewParameters,CResMsgModifyFormViewParameters,ModifyFormViewParametersCompletedEventArgs>("MedicationMgmtWS.ModifyFormViewParameters",oCReqMsgModifyFormViewParameters,this.ModifyFormViewParametersCompleted,"oFrwViewParameter",new ModifyFormViewParametersCompletedEventArgs(), prototypeList, charPropertyLookup);
}

SelectFormViewParametersCompleted: Function;
SelectFormViewParametersAsync(oCReqMsgSelectFormViewParameters:CReqMsgSelectFormViewParameters ) : void {
  HelperService.Invoke<CReqMsgSelectFormViewParameters,CResMsgSelectFormViewParameters,SelectFormViewParametersCompletedEventArgs>("MedicationMgmtWS.SelectFormViewParameters",oCReqMsgSelectFormViewParameters,this.SelectFormViewParametersCompleted,"sMCVersion",new SelectFormViewParametersCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMedFormDetailsByOIDCompleted: Function;
GetMedFormDetailsByOIDAsync(oCReqMsgGetMedFormDetailsByOID:CReqMsgGetMedFormDetailsByOID ) : void {
  HelperService.Invoke<CReqMsgGetMedFormDetailsByOID,CResMsgGetMedFormDetailsByOID,GetMedFormDetailsByOIDCompletedEventArgs>("MedicationMgmtWS.GetMedFormDetailsByOID",oCReqMsgGetMedFormDetailsByOID,this.GetMedFormDetailsByOIDCompleted,"lnMedFormOID",new GetMedFormDetailsByOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFrmVwrAttributesCompleted: Function;
GetFrmVwrAttributesAsync(oCReqMsgGetFrmVwrAttributes:CReqMsgGetFrmVwrAttributes ) : void {
  HelperService.Invoke<CReqMsgGetFrmVwrAttributes,CResMsgGetFrmVwrAttributes,GetFrmVwrAttributesCompletedEventArgs>("MedicationMgmtWS.GetFrmVwrAttributes",oCReqMsgGetFrmVwrAttributes,this.GetFrmVwrAttributesCompleted,"lnMedFormOID",new GetFrmVwrAttributesCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetAssociatedAttributesCompleted: Function;
GetAssociatedAttributesAsync(oCReqMsgGetAssociatedAttributes:CReqMsgGetAssociatedAttributes ) : void {
  HelperService.Invoke<CReqMsgGetAssociatedAttributes,CResMsgGetAssociatedAttributes,GetAssociatedAttributesCompletedEventArgs>("MedicationMgmtWS.GetAssociatedAttributes",oCReqMsgGetAssociatedAttributes,this.GetAssociatedAttributesCompleted,"sMCVersionNo",new GetAssociatedAttributesCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPresItemsCompleted: Function;
GetPresItemsAsync(oCReqMsgGetPresItems:CReqMsgGetPresItems ) : void {
  HelperService.Invoke<CReqMsgGetPresItems,CResMsgGetPresItems,GetPresItemsCompletedEventArgs>("MedicationMgmtWS.GetPresItems",oCReqMsgGetPresItems,this.GetPresItemsCompleted,"nPageSize",new GetPresItemsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetHierarchyCompleted: Function;
GetHierarchyAsync(oCReqMsgGetHierarchy:CReqMsgGetHierarchy ) : void {
  HelperService.Invoke<CReqMsgGetHierarchy,CResMsgGetHierarchy,GetHierarchyCompletedEventArgs>("MedicationMgmtWS.GetHierarchy",oCReqMsgGetHierarchy,this.GetHierarchyCompleted,"sSearchText",new GetHierarchyCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetLeafNodesCompleted: Function;
GetLeafNodesAsync(oCReqMsgGetLeafNodes:CReqMsgGetLeafNodes ) : void {
  HelperService.Invoke<CReqMsgGetLeafNodes,CResMsgGetLeafNodes,GetLeafNodesCompletedEventArgs>("MedicationMgmtWS.GetLeafNodes",oCReqMsgGetLeafNodes,this.GetLeafNodesCompleted,"sMCVersion",new GetLeafNodesCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPrescribingTeamsAndMedHierarchyCompleted: Function;
GetPrescribingTeamsAndMedHierarchyAsync(oCReqMsgGetPrescribingTeamsAndMedHierarchy:CReqMsgGetPrescribingTeamsAndMedHierarchy ) : void {
  HelperService.Invoke<CReqMsgGetPrescribingTeamsAndMedHierarchy,CResMsgGetPrescribingTeamsAndMedHierarchy,GetPrescribingTeamsAndMedHierarchyCompletedEventArgs>("MedicationMgmtWS.GetPrescribingTeamsAndMedHierarchy",oCReqMsgGetPrescribingTeamsAndMedHierarchy,this.GetPrescribingTeamsAndMedHierarchyCompleted,"sTeamType",new GetPrescribingTeamsAndMedHierarchyCompletedEventArgs(), prototypeList, charPropertyLookup);
}

SubmitMedMapHierarchyCompleted: Function;
SubmitMedMapHierarchyAsync(oCReqMsgSubmitMedMapHierarchy:CReqMsgSubmitMedMapHierarchy ) : void {
  HelperService.Invoke<CReqMsgSubmitMedMapHierarchy,CResMsgSubmitMedMapHierarchy,SubmitMedMapHierarchyCompletedEventArgs>("MedicationMgmtWS.SubmitMedMapHierarchy",oCReqMsgSubmitMedMapHierarchy,this.SubmitMedMapHierarchyCompleted,"oPrescribingTeamDetails",new SubmitMedMapHierarchyCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetHierarchyDupCompleted: Function;
GetHierarchyDupAsync(oCReqMsgGetHierarchyDup:CReqMsgGetHierarchyDup ) : void {
  HelperService.Invoke<CReqMsgGetHierarchyDup,CResMsgGetHierarchyDup,GetHierarchyDupCompletedEventArgs>("MedicationMgmtWS.GetHierarchyDup",oCReqMsgGetHierarchyDup,this.GetHierarchyDupCompleted,"IsDuplicate",new GetHierarchyDupCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CheckItemHrchyAssociationCompleted: Function;
CheckItemHrchyAssociationAsync(oCReqMsgCheckItemHrchyAssociation:CReqMsgCheckItemHrchyAssociation ) : void {
  HelperService.Invoke<CReqMsgCheckItemHrchyAssociation,CResMsgCheckItemHrchyAssociation,CheckItemHrchyAssociationCompletedEventArgs>("MedicationMgmtWS.CheckItemHrchyAssociation",oCReqMsgCheckItemHrchyAssociation,this.CheckItemHrchyAssociationCompleted,"sMcVersionNo",new CheckItemHrchyAssociationCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CreateHierarchyCompleted: Function;
CreateHierarchyAsync(oCReqMsgCreateHierarchy:CReqMsgCreateHierarchy ) : void {
  HelperService.Invoke<CReqMsgCreateHierarchy,CResMsgCreateHierarchy,CreateHierarchyCompletedEventArgs>("MedicationMgmtWS.CreateHierarchy",oCReqMsgCreateHierarchy,this.CreateHierarchyCompleted,"oDrugCategory",new CreateHierarchyCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ManageHierarchyCompleted: Function;
ManageHierarchyAsync(oCReqMsgManageHierarchy:CReqMsgManageHierarchy ) : void {
  HelperService.Invoke<CReqMsgManageHierarchy,CResMsgManageHierarchy,ManageHierarchyCompletedEventArgs>("MedicationMgmtWS.ManageHierarchy",oCReqMsgManageHierarchy,this.ManageHierarchyCompleted,"oDrugCategory",new ManageHierarchyCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDrugCategoryDetailsCompleted: Function;
GetDrugCategoryDetailsAsync(oCReqMsgGetDrugCategoryDetails:CReqMsgGetDrugCategoryDetails ) : void {
  HelperService.Invoke<CReqMsgGetDrugCategoryDetails,CResMsgGetDrugCategoryDetails,GetDrugCategoryDetailsCompletedEventArgs>("MedicationMgmtWS.GetDrugCategoryDetails",oCReqMsgGetDrugCategoryDetails,this.GetDrugCategoryDetailsCompleted,"sMCVersionNo",new GetDrugCategoryDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMedicationCompleted: Function;
GetMedicationAsync(oCReqMsgGetMedication:CReqMsgGetMedication ) : void {
  HelperService.Invoke<CReqMsgGetMedication,CResMsgGetMedication,GetMedicationCompletedEventArgs>("MedicationMgmtWS.GetMedication",oCReqMsgGetMedication,this.GetMedicationCompleted,"sMcversionNo",new GetMedicationCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPrescribableItemListSFSCompleted: Function;
GetPrescribableItemListSFSAsync(oCReqMsgGetPrescribableItemListSFS:CReqMsgGetPrescribableItemListSFS ) : void {
  HelperService.Invoke<CReqMsgGetPrescribableItemListSFS,CResMsgGetPrescribableItemListSFS,GetPrescribableItemListSFSCompletedEventArgs>("MedicationMgmtWS.GetPrescribableItemListSFS",oCReqMsgGetPrescribableItemListSFS,this.GetPrescribableItemListSFSCompleted,"objPrescribableItemSFS",new GetPrescribableItemListSFSCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CreatePrescibableItemCompleted: Function;
CreatePrescibableItemAsync(oCReqMsgCreatePrescibableItem:CReqMsgCreatePrescibableItem ) : void {
  HelperService.Invoke<CReqMsgCreatePrescibableItem,CResMsgCreatePrescibableItem,CreatePrescibableItemCompletedEventArgs>("MedicationMgmtWS.CreatePrescibableItem",oCReqMsgCreatePrescibableItem,this.CreatePrescibableItemCompleted,"oPresGrid",new CreatePrescibableItemCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ModifyPrescribableItemCompleted: Function;
ModifyPrescribableItemAsync(oCReqMsgModifyPrescribableItem:CReqMsgModifyPrescribableItem ) : void {
  HelperService.Invoke<CReqMsgModifyPrescribableItem,CResMsgModifyPrescribableItem,ModifyPrescribableItemCompletedEventArgs>("MedicationMgmtWS.ModifyPrescribableItem",oCReqMsgModifyPrescribableItem,this.ModifyPrescribableItemCompleted,"oPresGrid",new ModifyPrescribableItemCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetRouteCompleted: Function;
GetRouteAsync(oCReqMsgGetRoute:CReqMsgGetRoute ) : void {
  HelperService.Invoke<CReqMsgGetRoute,CResMsgGetRoute,GetRouteCompletedEventArgs>("MedicationMgmtWS.GetRoute",oCReqMsgGetRoute,this.GetRouteCompleted,"NavigationMode",new GetRouteCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetRouteSFSCompleted: Function;
GetRouteSFSAsync(oCReqMsgGetRouteSFS:CReqMsgGetRouteSFS ) : void {
  HelperService.Invoke<CReqMsgGetRouteSFS,CResMsgGetRouteSFS,GetRouteSFSCompletedEventArgs>("MedicationMgmtWS.GetRouteSFS",oCReqMsgGetRouteSFS,this.GetRouteSFSCompleted,"sIsBaseRt",new GetRouteSFSCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDosageFormCompleted: Function;
GetDosageFormAsync(oCReqMsgGetDosageForm:CReqMsgGetDosageForm ) : void {
  HelperService.Invoke<CReqMsgGetDosageForm,CResMsgGetDosageForm,GetDosageFormCompletedEventArgs>("MedicationMgmtWS.GetDosageForm",oCReqMsgGetDosageForm,this.GetDosageFormCompleted,"objDosageForm",new GetDosageFormCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetSiteCompleted: Function;
GetSiteAsync(oCReqMsgGetSite:CReqMsgGetSite ) : void {
  HelperService.Invoke<CReqMsgGetSite,CResMsgGetSite,GetSiteCompletedEventArgs>("MedicationMgmtWS.GetSite",oCReqMsgGetSite,this.GetSiteCompleted,"objSiteForm",new GetSiteCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFormCompleted: Function;
GetFormAsync(oCReqMsgGetForm:CReqMsgGetForm ) : void {
  HelperService.Invoke<CReqMsgGetForm,CResMsgGetForm,GetFormCompletedEventArgs>("MedicationMgmtWS.GetForm",oCReqMsgGetForm,this.GetFormCompleted,"isSolidDrugs",new GetFormCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetAllUOMCompleted: Function;
GetAllUOMAsync(oCReqMsgGetAllUOM:CReqMsgGetAllUOM ) : void {
  HelperService.Invoke<CReqMsgGetAllUOM,CResMsgGetAllUOM,GetAllUOMCompletedEventArgs>("MedicationMgmtWS.GetAllUOM",oCReqMsgGetAllUOM,this.GetAllUOMCompleted,"sMCVersion",new GetAllUOMCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetAllPackageUOMCompleted: Function;
GetAllPackageUOMAsync(oCReqMsgGetAllPackageUOM:CReqMsgGetAllPackageUOM ) : void {
  HelperService.Invoke<CReqMsgGetAllPackageUOM,CResMsgGetAllPackageUOM,GetAllPackageUOMCompletedEventArgs>("MedicationMgmtWS.GetAllPackageUOM",oCReqMsgGetAllPackageUOM,this.GetAllPackageUOMCompleted,"objReqGetAllPackageUOM",new GetAllPackageUOMCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetAllPackageUOMSFSCompleted: Function;
GetAllPackageUOMSFSAsync(oCReqMsgGetAllPackageUOMSFS:CReqMsgGetAllPackageUOMSFS ) : void {
  HelperService.Invoke<CReqMsgGetAllPackageUOMSFS,CResMsgGetAllPackageUOMSFS,GetAllPackageUOMSFSCompletedEventArgs>("MedicationMgmtWS.GetAllPackageUOMSFS",oCReqMsgGetAllPackageUOMSFS,this.GetAllPackageUOMSFSCompleted,"objPackUOM",new GetAllPackageUOMSFSCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetAllLegalCategoryCompleted: Function;
GetAllLegalCategoryAsync(oCReqMsgGetAllLegalCategory:CReqMsgGetAllLegalCategory ) : void {
  HelperService.Invoke<CReqMsgGetAllLegalCategory,CResMsgGetAllLegalCategory,GetAllLegalCategoryCompletedEventArgs>("MedicationMgmtWS.GetAllLegalCategory",oCReqMsgGetAllLegalCategory,this.GetAllLegalCategoryCompleted,"MCVersion",new GetAllLegalCategoryCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDoseUOMCompleted: Function;
GetDoseUOMAsync(oCReqMsgGetDoseUOM:CReqMsgGetDoseUOM ) : void {
  HelperService.Invoke<CReqMsgGetDoseUOM,CResMsgGetDoseUOM,GetDoseUOMCompletedEventArgs>("MedicationMgmtWS.GetDoseUOM",oCReqMsgGetDoseUOM,this.GetDoseUOMCompleted,"oPrescribeItemSetItem",new GetDoseUOMCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFrequencyCompleted: Function;
GetFrequencyAsync(oCReqMsgGetFrequency:CReqMsgGetFrequency ) : void {
  HelperService.Invoke<CReqMsgGetFrequency,CResMsgGetFrequency,GetFrequencyCompletedEventArgs>("MedicationMgmtWS.GetFrequency",oCReqMsgGetFrequency,this.GetFrequencyCompleted,"sMcVersionNo",new GetFrequencyCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetManufacturersCompleted: Function;
GetManufacturersAsync(oCReqMsgGetManufacturers:CReqMsgGetManufacturers ) : void {
  HelperService.Invoke<CReqMsgGetManufacturers,CResMsgGetManufacturers,GetManufacturersCompletedEventArgs>("MedicationMgmtWS.GetManufacturers",oCReqMsgGetManufacturers,this.GetManufacturersCompleted,"NavigationMode",new GetManufacturersCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetBasicDetailsCompleted: Function;
GetBasicDetailsAsync(oCReqMsgGetBasicDetails:CReqMsgGetBasicDetails ) : void {
  HelperService.Invoke<CReqMsgGetBasicDetails,CResMsgGetBasicDetails,GetBasicDetailsCompletedEventArgs>("MedicationMgmtWS.GetBasicDetails",oCReqMsgGetBasicDetails,this.GetBasicDetailsCompleted,"sMCVersionNo",new GetBasicDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

HOCGetPresItemDetailsCompleted: Function;
HOCGetPresItemDetailsAsync(oCReqMsgHOCGetPresItemDetails:CReqMsgHOCGetPresItemDetails ) : void {
  HelperService.Invoke<CReqMsgHOCGetPresItemDetails,CResMsgHOCGetPresItemDetails,HOCGetPresItemDetailsCompletedEventArgs>("MedicationMgmtWS.HOCGetPresItemDetails",oCReqMsgHOCGetPresItemDetails,this.HOCGetPresItemDetailsCompleted,"sMcVersionNo",new HOCGetPresItemDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDataFilterDetailsCompleted: Function;
GetDataFilterDetailsAsync(oCReqMsgGetDataFilterDetails:CReqMsgGetDataFilterDetails ) : void {
  HelperService.Invoke<CReqMsgGetDataFilterDetails,CResMsgGetDataFilterDetails,GetDataFilterDetailsCompletedEventArgs>("MedicationMgmtWS.GetDataFilterDetails",oCReqMsgGetDataFilterDetails,this.GetDataFilterDetailsCompleted,"sMcVersionNo",new GetDataFilterDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetConflictDetailsByOIDCompleted: Function;
GetConflictDetailsByOIDAsync(oCReqMsgGetConflictDetailsByOID:CReqMsgGetConflictDetailsByOID ) : void {
  HelperService.Invoke<CReqMsgGetConflictDetailsByOID,CResMsgGetConflictDetailsByOID,GetConflictDetailsByOIDCompletedEventArgs>("MedicationMgmtWS.GetConflictDetailsByOID",oCReqMsgGetConflictDetailsByOID,this.GetConflictDetailsByOIDCompleted,"MCVersion",new GetConflictDetailsByOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetConflictsByItemOIDCompleted: Function;
GetConflictsByItemOIDAsync(oCReqMsgGetConflictsByItemOID:CReqMsgGetConflictsByItemOID ) : void {
  HelperService.Invoke<CReqMsgGetConflictsByItemOID,CResMsgGetConflictsByItemOID,GetConflictsByItemOIDCompletedEventArgs>("MedicationMgmtWS.GetConflictsByItemOID",oCReqMsgGetConflictsByItemOID,this.GetConflictsByItemOIDCompleted,"nPageLength",new GetConflictsByItemOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetContraIndicationByOIDCompleted: Function;
GetContraIndicationByOIDAsync(oCReqMsgGetContraIndicationByOID:CReqMsgGetContraIndicationByOID ) : void {
  HelperService.Invoke<CReqMsgGetContraIndicationByOID,CResMsgGetContraIndicationByOID,GetContraIndicationByOIDCompletedEventArgs>("MedicationMgmtWS.GetContraIndicationByOID",oCReqMsgGetContraIndicationByOID,this.GetContraIndicationByOIDCompleted,"sMcversionNo",new GetContraIndicationByOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPrecautionByOIDCompleted: Function;
GetPrecautionByOIDAsync(oCReqMsgGetPrecautionByOID:CReqMsgGetPrecautionByOID ) : void {
  HelperService.Invoke<CReqMsgGetPrecautionByOID,CResMsgGetPrecautionByOID,GetPrecautionByOIDCompletedEventArgs>("MedicationMgmtWS.GetPrecautionByOID",oCReqMsgGetPrecautionByOID,this.GetPrecautionByOIDCompleted,"sMcVersionNo",new GetPrecautionByOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetWarningByOIDCompleted: Function;
GetWarningByOIDAsync(oCReqMsgGetWarningByOID:CReqMsgGetWarningByOID ) : void {
  HelperService.Invoke<CReqMsgGetWarningByOID,CResMsgGetWarningByOID,GetWarningByOIDCompletedEventArgs>("MedicationMgmtWS.GetWarningByOID",oCReqMsgGetWarningByOID,this.GetWarningByOIDCompleted,"sMcversionNo",new GetWarningByOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ViewRelatedConditionDetailsCompleted: Function;
ViewRelatedConditionDetailsAsync(oCReqMsgViewRelatedConditionDetails:CReqMsgViewRelatedConditionDetails ) : void {
  HelperService.Invoke<CReqMsgViewRelatedConditionDetails,CResMsgViewRelatedConditionDetails,ViewRelatedConditionDetailsCompletedEventArgs>("MedicationMgmtWS.ViewRelatedConditionDetails",oCReqMsgViewRelatedConditionDetails,this.ViewRelatedConditionDetailsCompleted,"MCVersion",new ViewRelatedConditionDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPrsItmOIDbyCatitmOidCompleted: Function;
GetPrsItmOIDbyCatitmOidAsync(oCReqMsgGetPrsItmOIDbyCatitmOid:CReqMsgGetPrsItmOIDbyCatitmOid ) : void {
  HelperService.Invoke<CReqMsgGetPrsItmOIDbyCatitmOid,CResMsgGetPrsItmOIDbyCatitmOid,GetPrsItmOIDbyCatitmOidCompletedEventArgs>("MedicationMgmtWS.GetPrsItmOIDbyCatitmOid",oCReqMsgGetPrsItmOIDbyCatitmOid,this.GetPrsItmOIDbyCatitmOidCompleted,"MCVersion",new GetPrsItmOIDbyCatitmOidCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ManageConflictconfigurationCompleted: Function;
ManageConflictconfigurationAsync(oCReqMsgManageConflictconfiguration:CReqMsgManageConflictconfiguration ) : void {
  HelperService.Invoke<CReqMsgManageConflictconfiguration,CResMsgManageConflictconfiguration,ManageConflictconfigurationCompletedEventArgs>("MedicationMgmtWS.ManageConflictconfiguration",oCReqMsgManageConflictconfiguration,this.ManageConflictconfigurationCompleted,"oMedicationConflictConfig",new ManageConflictconfigurationCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMedicationConfilictConfigCompleted: Function;
GetMedicationConfilictConfigAsync(oCReqMsgGetMedicationConfilictConfig:CReqMsgGetMedicationConfilictConfig ) : void {
  HelperService.Invoke<CReqMsgGetMedicationConfilictConfig,CResMsgGetMedicationConfilictConfig,GetMedicationConfilictConfigCompletedEventArgs>("MedicationMgmtWS.GetMedicationConfilictConfig",oCReqMsgGetMedicationConfilictConfig,this.GetMedicationConfilictConfigCompleted,"McVersionNo",new GetMedicationConfilictConfigCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetManageCatalogueconfigurationCompleted: Function;
GetManageCatalogueconfigurationAsync(oCReqMsgGetManageCatalogueconfiguration:CReqMsgGetManageCatalogueconfiguration ) : void {
  HelperService.Invoke<CReqMsgGetManageCatalogueconfiguration,CResMsgGetManageCatalogueconfiguration,GetManageCatalogueconfigurationCompletedEventArgs>("MedicationMgmtWS.GetManageCatalogueconfiguration",oCReqMsgGetManageCatalogueconfiguration,this.GetManageCatalogueconfigurationCompleted,"objReqGetManageCatalogueconfiguration",new GetManageCatalogueconfigurationCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetBulletinDetailCompleted: Function;
GetBulletinDetailAsync(oCReqMsgGetBulletinDetail:CReqMsgGetBulletinDetail ) : void {
  HelperService.Invoke<CReqMsgGetBulletinDetail,CResMsgGetBulletinDetail,GetBulletinDetailCompletedEventArgs>("MedicationMgmtWS.GetBulletinDetail",oCReqMsgGetBulletinDetail,this.GetBulletinDetailCompleted,"MCVersion",new GetBulletinDetailCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetVerDuplicateCompleted: Function;
GetVerDuplicateAsync(oCReqMsgGetVerDuplicate:CReqMsgGetVerDuplicate ) : void {
  HelperService.Invoke<CReqMsgGetVerDuplicate,CResMsgGetVerDuplicate,GetVerDuplicateCompletedEventArgs>("MedicationMgmtWS.GetVerDuplicate",oCReqMsgGetVerDuplicate,this.GetVerDuplicateCompleted,"MCVersion",new GetVerDuplicateCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetVerConfigHistoryCompleted: Function;
GetVerConfigHistoryAsync(oCReqMsgGetVerConfigHistory:CReqMsgGetVerConfigHistory ) : void {
  HelperService.Invoke<CReqMsgGetVerConfigHistory,CResMsgGetVerConfigHistory,GetVerConfigHistoryCompletedEventArgs>("MedicationMgmtWS.GetVerConfigHistory",oCReqMsgGetVerConfigHistory,this.GetVerConfigHistoryCompleted,"MCVersion",new GetVerConfigHistoryCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ManageCatalogueconfigurationCompleted: Function;
ManageCatalogueconfigurationAsync(oCReqMsgManageCatalogueconfiguration:CReqMsgManageCatalogueconfiguration ) : void {
  HelperService.Invoke<CReqMsgManageCatalogueconfiguration,CResMsgManageCatalogueconfiguration,ManageCatalogueconfigurationCompletedEventArgs>("MedicationMgmtWS.ManageCatalogueconfiguration",oCReqMsgManageCatalogueconfiguration,this.ManageCatalogueconfigurationCompleted,"objVersionConfig",new ManageCatalogueconfigurationCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetChkConfltCatConfigLnkEnableCompleted: Function;
GetChkConfltCatConfigLnkEnableAsync(oCReqMsgGetChkConfltCatConfigLnkEnable:CReqMsgGetChkConfltCatConfigLnkEnable ) : void {
  HelperService.Invoke<CReqMsgGetChkConfltCatConfigLnkEnable,CResMsgGetChkConfltCatConfigLnkEnable,GetChkConfltCatConfigLnkEnableCompletedEventArgs>("MedicationMgmtWS.GetChkConfltCatConfigLnkEnable",oCReqMsgGetChkConfltCatConfigLnkEnable,this.GetChkConfltCatConfigLnkEnableCompleted,"HO",new GetChkConfltCatConfigLnkEnableCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ChkYearAndMonthDataLoadCompleted: Function;
ChkYearAndMonthDataLoadAsync(oCReqMsgChkYearAndMonthDataLoad:CReqMsgChkYearAndMonthDataLoad ) : void {
  HelperService.Invoke<CReqMsgChkYearAndMonthDataLoad,CResMsgChkYearAndMonthDataLoad,ChkYearAndMonthDataLoadCompletedEventArgs>("MedicationMgmtWS.ChkYearAndMonthDataLoad",oCReqMsgChkYearAndMonthDataLoad,this.ChkYearAndMonthDataLoadCompleted,"Year",new ChkYearAndMonthDataLoadCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CheckMonthlyLoadStatusCompleted: Function;
CheckMonthlyLoadStatusAsync(oCReqMsgCheckMonthlyLoadStatus:CReqMsgCheckMonthlyLoadStatus ) : void {
  HelperService.Invoke<CReqMsgCheckMonthlyLoadStatus,CResMsgCheckMonthlyLoadStatus,CheckMonthlyLoadStatusCompletedEventArgs>("MedicationMgmtWS.CheckMonthlyLoadStatus",oCReqMsgCheckMonthlyLoadStatus,this.CheckMonthlyLoadStatusCompleted,"sActiveVersionNo",new CheckMonthlyLoadStatusCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFlryProcDoseDetailsCompleted: Function;
GetFlryProcDoseDetailsAsync(oCReqMsgGetFlryProcDoseDetails:CReqMsgGetFlryProcDoseDetails ) : void {
  HelperService.Invoke<CReqMsgGetFlryProcDoseDetails,CResMsgGetFlryProcDoseDetails,GetFlryProcDoseDetailsCompletedEventArgs>("MedicationMgmtWS.GetFlryProcDoseDetails",oCReqMsgGetFlryProcDoseDetails,this.GetFlryProcDoseDetailsCompleted,"sMCVersionNo",new GetFlryProcDoseDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPresItemDetailByOIDCompleted: Function;
GetPresItemDetailByOIDAsync(oCReqMsgGetPresItemDetailByOID:CReqMsgGetPresItemDetailByOID ) : void {
  HelperService.Invoke<CReqMsgGetPresItemDetailByOID,CResMsgGetPresItemDetailByOID,GetPresItemDetailByOIDCompletedEventArgs>("MedicationMgmtWS.GetPresItemDetailByOID",oCReqMsgGetPresItemDetailByOID,this.GetPresItemDetailByOIDCompleted,"MCVersion",new GetPresItemDetailByOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

IsDeactiveItemCompleted: Function;
IsDeactiveItemAsync(oCReqMsgIsDeactiveItem:CReqMsgIsDeactiveItem ) : void {
  HelperService.Invoke<CReqMsgIsDeactiveItem,CResMsgIsDeactiveItem,IsDeactiveItemCompletedEventArgs>("MedicationMgmtWS.IsDeactiveItem",oCReqMsgIsDeactiveItem,this.IsDeactiveItemCompleted,"lnPItemDetailOID",new IsDeactiveItemCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetSysDrugPropertyCompleted: Function;
GetSysDrugPropertyAsync(oCReqMsgGetSysDrugProperty:CReqMsgGetSysDrugProperty ) : void {
  HelperService.Invoke<CReqMsgGetSysDrugProperty,CResMsgGetSysDrugProperty,GetSysDrugPropertyCompletedEventArgs>("MedicationMgmtWS.GetSysDrugProperty",oCReqMsgGetSysDrugProperty,this.GetSysDrugPropertyCompleted,"MCVersion",new GetSysDrugPropertyCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CreateIngredientCompleted: Function;
CreateIngredientAsync(oCReqMsgCreateIngredient:CReqMsgCreateIngredient ) : void {
  HelperService.Invoke<CReqMsgCreateIngredient,CResMsgCreateIngredient,CreateIngredientCompletedEventArgs>("MedicationMgmtWS.CreateIngredient",oCReqMsgCreateIngredient,this.CreateIngredientCompleted,"oIngredient",new CreateIngredientCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ManageIngredientCompleted: Function;
ManageIngredientAsync(oCReqMsgManageIngredient:CReqMsgManageIngredient ) : void {
  HelperService.Invoke<CReqMsgManageIngredient,CResMsgManageIngredient,ManageIngredientCompletedEventArgs>("MedicationMgmtWS.ManageIngredient",oCReqMsgManageIngredient,this.ManageIngredientCompleted,"oIngredient",new ManageIngredientCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetIngredientCompleted: Function;
GetIngredientAsync(oCReqMsgGetIngredient:CReqMsgGetIngredient ) : void {
  HelperService.Invoke<CReqMsgGetIngredient,CResMsgGetIngredient,GetIngredientCompletedEventArgs>("MedicationMgmtWS.GetIngredient",oCReqMsgGetIngredient,this.GetIngredientCompleted,"objIngredientListView",new GetIngredientCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CheckIngredientIsLinkedCompleted: Function;
CheckIngredientIsLinkedAsync(oCReqMsgCheckIngredientIsLinked:CReqMsgCheckIngredientIsLinked ) : void {
  HelperService.Invoke<CReqMsgCheckIngredientIsLinked,CResMsgCheckIngredientIsLinked,CheckIngredientIsLinkedCompletedEventArgs>("MedicationMgmtWS.CheckIngredientIsLinked",oCReqMsgCheckIngredientIsLinked,this.CheckIngredientIsLinkedCompleted,"sMcVersionNo",new CheckIngredientIsLinkedCompletedEventArgs(), prototypeList, charPropertyLookup);
}

SearchIngredientCompleted: Function;
SearchIngredientAsync(oCReqMsgSearchIngredient:CReqMsgSearchIngredient ) : void {
  HelperService.Invoke<CReqMsgSearchIngredient,CResMsgSearchIngredient,SearchIngredientCompletedEventArgs>("MedicationMgmtWS.SearchIngredient",oCReqMsgSearchIngredient,this.SearchIngredientCompleted,"objIngredientListView",new SearchIngredientCompletedEventArgs(), prototypeList, charPropertyLookup);
}

SearchIngredientSFSCompleted: Function;
SearchIngredientSFSAsync(oCReqMsgSearchIngredientSFS:CReqMsgSearchIngredientSFS ) : void {
  HelperService.Invoke<CReqMsgSearchIngredientSFS,CResMsgSearchIngredientSFS,SearchIngredientSFSCompletedEventArgs>("MedicationMgmtWS.SearchIngredientSFS",oCReqMsgSearchIngredientSFS,this.SearchIngredientSFSCompleted,"objIngredientListView",new SearchIngredientSFSCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFavouriteSearchResultsCompleted: Function;
GetFavouriteSearchResultsAsync(oCReqMsgGetFavouriteSearchResults:CReqMsgGetFavouriteSearchResults ) : void {
  HelperService.Invoke<CReqMsgGetFavouriteSearchResults,CResMsgGetFavouriteSearchResults,GetFavouriteSearchResultsCompletedEventArgs>("MedicationMgmtWS.GetFavouriteSearchResults",oCReqMsgGetFavouriteSearchResults,this.GetFavouriteSearchResultsCompleted,"objReqFavouriteSearchResults",new GetFavouriteSearchResultsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CheckDuplicateMainFormularyCompleted: Function;
CheckDuplicateMainFormularyAsync(oCReqMsgCheckDuplicateMainFormulary:CReqMsgCheckDuplicateMainFormulary ) : void {
  HelperService.Invoke<CReqMsgCheckDuplicateMainFormulary,CResMsgCheckDuplicateMainFormulary,CheckDuplicateMainFormularyCompletedEventArgs>("MedicationMgmtWS.CheckDuplicateMainFormulary",oCReqMsgCheckDuplicateMainFormulary,this.CheckDuplicateMainFormularyCompleted,"lnOrganisationOID",new CheckDuplicateMainFormularyCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CreateInteractiveGroupCompleted: Function;
CreateInteractiveGroupAsync(oCReqMsgCreateInteractiveGroup:CReqMsgCreateInteractiveGroup ) : void {
  HelperService.Invoke<CReqMsgCreateInteractiveGroup,CResMsgCreateInteractiveGroup,CreateInteractiveGroupCompletedEventArgs>("MedicationMgmtWS.CreateInteractiveGroup",oCReqMsgCreateInteractiveGroup,this.CreateInteractiveGroupCompleted,"oInteractiveGroup",new CreateInteractiveGroupCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetInteractiveGroupCompleted: Function;
GetInteractiveGroupAsync(oCReqMsgGetInteractiveGroup:CReqMsgGetInteractiveGroup ) : void {
  HelperService.Invoke<CReqMsgGetInteractiveGroup,CResMsgGetInteractiveGroup,GetInteractiveGroupCompletedEventArgs>("MedicationMgmtWS.GetInteractiveGroup",oCReqMsgGetInteractiveGroup,this.GetInteractiveGroupCompleted,"lnEndRow",new GetInteractiveGroupCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetInteractiveGroupDetailsCompleted: Function;
GetInteractiveGroupDetailsAsync(oCReqMsgGetInteractiveGroupDetails:CReqMsgGetInteractiveGroupDetails ) : void {
  HelperService.Invoke<CReqMsgGetInteractiveGroupDetails,CResMsgGetInteractiveGroupDetails,GetInteractiveGroupDetailsCompletedEventArgs>("MedicationMgmtWS.GetInteractiveGroupDetails",oCReqMsgGetInteractiveGroupDetails,this.GetInteractiveGroupDetailsCompleted,"nPageSize",new GetInteractiveGroupDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDrugUnderHierarchyCompleted: Function;
GetDrugUnderHierarchyAsync(oCReqMsgGetDrugUnderHierarchy:CReqMsgGetDrugUnderHierarchy ) : void {
  HelperService.Invoke<CReqMsgGetDrugUnderHierarchy,CResMsgGetDrugUnderHierarchy,GetDrugUnderHierarchyCompletedEventArgs>("MedicationMgmtWS.GetDrugUnderHierarchy",oCReqMsgGetDrugUnderHierarchy,this.GetDrugUnderHierarchyCompleted,"sSearchText",new GetDrugUnderHierarchyCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetIntractItemDetailsCompleted: Function;
GetIntractItemDetailsAsync(oCReqMsgGetIntractItemDetails:CReqMsgGetIntractItemDetails ) : void {
  HelperService.Invoke<CReqMsgGetIntractItemDetails,CResMsgGetIntractItemDetails,GetIntractItemDetailsCompletedEventArgs>("MedicationMgmtWS.GetIntractItemDetails",oCReqMsgGetIntractItemDetails,this.GetIntractItemDetailsCompleted,"oIntractionGrpSearch",new GetIntractItemDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetInteractiveGroupbyNameCompleted: Function;
GetInteractiveGroupbyNameAsync(oCReqMsgGetInteractiveGroupbyName:CReqMsgGetInteractiveGroupbyName ) : void {
  HelperService.Invoke<CReqMsgGetInteractiveGroupbyName,CResMsgGetInteractiveGroupbyName,GetInteractiveGroupbyNameCompletedEventArgs>("MedicationMgmtWS.GetInteractiveGroupbyName",oCReqMsgGetInteractiveGroupbyName,this.GetInteractiveGroupbyNameCompleted,"objInteractiveGroup",new GetInteractiveGroupbyNameCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetLinkedIntrGrpDetailsCompleted: Function;
GetLinkedIntrGrpDetailsAsync(oCReqMsgGetLinkedIntrGrpDetails:CReqMsgGetLinkedIntrGrpDetails ) : void {
  HelperService.Invoke<CReqMsgGetLinkedIntrGrpDetails,CResMsgGetLinkedIntrGrpDetails,GetLinkedIntrGrpDetailsCompletedEventArgs>("MedicationMgmtWS.GetLinkedIntrGrpDetails",oCReqMsgGetLinkedIntrGrpDetails,this.GetLinkedIntrGrpDetailsCompleted,"MCVersion",new GetLinkedIntrGrpDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetCustomisedIntrGrpDetailsCompleted: Function;
GetCustomisedIntrGrpDetailsAsync(oCReqMsgGetCustomisedIntrGrpDetails:CReqMsgGetCustomisedIntrGrpDetails ) : void {
  HelperService.Invoke<CReqMsgGetCustomisedIntrGrpDetails,CResMsgGetCustomisedIntrGrpDetails,GetCustomisedIntrGrpDetailsCompletedEventArgs>("MedicationMgmtWS.GetCustomisedIntrGrpDetails",oCReqMsgGetCustomisedIntrGrpDetails,this.GetCustomisedIntrGrpDetailsCompleted,"MCVersion",new GetCustomisedIntrGrpDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ModifyInteractionGroupCompleted: Function;
ModifyInteractionGroupAsync(oCReqMsgModifyInteractionGroup:CReqMsgModifyInteractionGroup ) : void {
  HelperService.Invoke<CReqMsgModifyInteractionGroup,CResMsgModifyInteractionGroup,ModifyInteractionGroupCompletedEventArgs>("MedicationMgmtWS.ModifyInteractionGroup",oCReqMsgModifyInteractionGroup,this.ModifyInteractionGroupCompleted,"oInteractiveGroup",new ModifyInteractionGroupCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetIntrGroupFilterbyCompleted: Function;
GetIntrGroupFilterbyAsync(oCReqMsgGetIntrGroupFilterby:CReqMsgGetIntrGroupFilterby ) : void {
  HelperService.Invoke<CReqMsgGetIntrGroupFilterby,CResMsgGetIntrGroupFilterby,GetIntrGroupFilterbyCompletedEventArgs>("MedicationMgmtWS.GetIntrGroupFilterby",oCReqMsgGetIntrGroupFilterby,this.GetIntrGroupFilterbyCompleted,"IsDuplicate",new GetIntrGroupFilterbyCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetItemSearchCriteriaResultsCompleted: Function;
GetItemSearchCriteriaResultsAsync(oCReqMsgGetItemSearchCriteriaResults:CReqMsgGetItemSearchCriteriaResults ) : void {
  HelperService.Invoke<CReqMsgGetItemSearchCriteriaResults,CResMsgGetItemSearchCriteriaResults,GetItemSearchCriteriaResultsCompletedEventArgs>("MedicationMgmtWS.GetItemSearchCriteriaResults",oCReqMsgGetItemSearchCriteriaResults,this.GetItemSearchCriteriaResultsCompleted,"lnEndRow",new GetItemSearchCriteriaResultsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPolicyInfoCompleted: Function;
GetPolicyInfoAsync(oCReqMsgGetPolicyInfo:CReqMsgGetPolicyInfo ) : void {
  HelperService.Invoke<CReqMsgGetPolicyInfo,CResMsgGetPolicyInfo,GetPolicyInfoCompletedEventArgs>("MedicationMgmtWS.GetPolicyInfo",oCReqMsgGetPolicyInfo,this.GetPolicyInfoCompleted,"objReqGetPolicyInfo",new GetPolicyInfoCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ManageFavouritesCompleted: Function;
ManageFavouritesAsync(oCReqMsgManageFavourites:CReqMsgManageFavourites ) : void {
  HelperService.Invoke<CReqMsgManageFavourites,CResMsgManageFavourites,ManageFavouritesCompletedEventArgs>("MedicationMgmtWS.ManageFavourites",oCReqMsgManageFavourites,this.ManageFavouritesCompleted,"oFavouriteAssociation",new ManageFavouritesCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFavouritesParentGroupCompleted: Function;
GetFavouritesParentGroupAsync(oCReqMsgGetFavouritesParentGroup:CReqMsgGetFavouritesParentGroup ) : void {
  HelperService.Invoke<CReqMsgGetFavouritesParentGroup,CResMsgGetFavouritesParentGroup,GetFavouritesParentGroupCompletedEventArgs>("MedicationMgmtWS.GetFavouritesParentGroup",oCReqMsgGetFavouritesParentGroup,this.GetFavouritesParentGroupCompleted,"sMCVerNo",new GetFavouritesParentGroupCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFavouritesChildGroupCompleted: Function;
GetFavouritesChildGroupAsync(oCReqMsgGetFavouritesChildGroup:CReqMsgGetFavouritesChildGroup ) : void {
  HelperService.Invoke<CReqMsgGetFavouritesChildGroup,CResMsgGetFavouritesChildGroup,GetFavouritesChildGroupCompletedEventArgs>("MedicationMgmtWS.GetFavouritesChildGroup",oCReqMsgGetFavouritesChildGroup,this.GetFavouritesChildGroupCompleted,"MCVersion",new GetFavouritesChildGroupCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFavouritesGroupItemsCompleted: Function;
GetFavouritesGroupItemsAsync(oCReqMsgGetFavouritesGroupItems:CReqMsgGetFavouritesGroupItems ) : void {
  HelperService.Invoke<CReqMsgGetFavouritesGroupItems,CResMsgGetFavouritesGroupItems,GetFavouritesGroupItemsCompletedEventArgs>("MedicationMgmtWS.GetFavouritesGroupItems",oCReqMsgGetFavouritesGroupItems,this.GetFavouritesGroupItemsCompleted,"MCVersion",new GetFavouritesGroupItemsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFavouritesDrugItemCompleted: Function;
GetFavouritesDrugItemAsync(oCReqMsgGetFavouritesDrugItem:CReqMsgGetFavouritesDrugItem ) : void {
  HelperService.Invoke<CReqMsgGetFavouritesDrugItem,CResMsgGetFavouritesDrugItem,GetFavouritesDrugItemCompletedEventArgs>("MedicationMgmtWS.GetFavouritesDrugItem",oCReqMsgGetFavouritesDrugItem,this.GetFavouritesDrugItemCompleted,"MVersion",new GetFavouritesDrugItemCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFavAssociationCompleted: Function;
GetFavAssociationAsync(oCReqMsgGetFavAssociation:CReqMsgGetFavAssociation ) : void {
  HelperService.Invoke<CReqMsgGetFavAssociation,CResMsgGetFavAssociation,GetFavAssociationCompletedEventArgs>("MedicationMgmtWS.GetFavAssociation",oCReqMsgGetFavAssociation,this.GetFavAssociationCompleted,"MCVersion",new GetFavAssociationCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ManageUserFavouritesCompleted: Function;
ManageUserFavouritesAsync(oCReqMsgManageUserFavourites:CReqMsgManageUserFavourites ) : void {
  HelperService.Invoke<CReqMsgManageUserFavourites,CResMsgManageUserFavourites,ManageUserFavouritesCompletedEventArgs>("MedicationMgmtWS.ManageUserFavourites",oCReqMsgManageUserFavourites,this.ManageUserFavouritesCompleted,"UserOID",new ManageUserFavouritesCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetUserFavouritesParentGroupCompleted: Function;
GetUserFavouritesParentGroupAsync(oCReqMsgGetUserFavouritesParentGroup:CReqMsgGetUserFavouritesParentGroup ) : void {
  HelperService.Invoke<CReqMsgGetUserFavouritesParentGroup,CResMsgGetUserFavouritesParentGroup,GetUserFavouritesParentGroupCompletedEventArgs>("MedicationMgmtWS.GetUserFavouritesParentGroup",oCReqMsgGetUserFavouritesParentGroup,this.GetUserFavouritesParentGroupCompleted,"sMCVerNo",new GetUserFavouritesParentGroupCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ModifyRouteCompleted: Function;
ModifyRouteAsync(oCReqMsgModifyRoute:CReqMsgModifyRoute ) : void {
  HelperService.Invoke<CReqMsgModifyRoute,CResMsgModifyRoute,ModifyRouteCompletedEventArgs>("MedicationMgmtWS.ModifyRoute",oCReqMsgModifyRoute,this.ModifyRouteCompleted,"route",new ModifyRouteCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetRouteByOIDCompleted: Function;
GetRouteByOIDAsync(oCReqMsgGetRouteByOID:CReqMsgGetRouteByOID ) : void {
  HelperService.Invoke<CReqMsgGetRouteByOID,CResMsgGetRouteByOID,GetRouteByOIDCompletedEventArgs>("MedicationMgmtWS.GetRouteByOID",oCReqMsgGetRouteByOID,this.GetRouteByOIDCompleted,"sMCVersion",new GetRouteByOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetRoutesCompleted: Function;
GetRoutesAsync(oCReqMsgGetRoutes:CReqMsgGetRoutes ) : void {
  HelperService.Invoke<CReqMsgGetRoutes,CResMsgGetRoutes,GetRoutesCompletedEventArgs>("MedicationMgmtWS.GetRoutes",oCReqMsgGetRoutes,this.GetRoutesCompleted,"IsDuplicate",new GetRoutesCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CheckRouteIsLinkedCompleted: Function;
CheckRouteIsLinkedAsync(oCReqMsgCheckRouteIsLinked:CReqMsgCheckRouteIsLinked ) : void {
  HelperService.Invoke<CReqMsgCheckRouteIsLinked,CResMsgCheckRouteIsLinked,CheckRouteIsLinkedCompletedEventArgs>("MedicationMgmtWS.CheckRouteIsLinked",oCReqMsgCheckRouteIsLinked,this.CheckRouteIsLinkedCompleted,"sMCVersion",new CheckRouteIsLinkedCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetConflictSearchResultsCompleted: Function;
GetConflictSearchResultsAsync(oCReqMsgGetConflictSearchResults:CReqMsgGetConflictSearchResults ) : void {
  HelperService.Invoke<CReqMsgGetConflictSearchResults,CResMsgGetConflictSearchResults,GetConflictSearchResultsCompletedEventArgs>("MedicationMgmtWS.GetConflictSearchResults",oCReqMsgGetConflictSearchResults,this.GetConflictSearchResultsCompleted,"nPageLength",new GetConflictSearchResultsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ManageConflictsCompleted: Function;
ManageConflictsAsync(oCReqMsgManageConflicts:CReqMsgManageConflicts ) : void {
  HelperService.Invoke<CReqMsgManageConflicts,CResMsgManageConflicts,ManageConflictsCompletedEventArgs>("MedicationMgmtWS.ManageConflicts",oCReqMsgManageConflicts,this.ManageConflictsCompleted,"objConflictDetails",new ManageConflictsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ChkConflictsAssociationCompleted: Function;
ChkConflictsAssociationAsync(oCReqMsgChkConflictsAssociation:CReqMsgChkConflictsAssociation ) : void {
  HelperService.Invoke<CReqMsgChkConflictsAssociation,CResMsgChkConflictsAssociation,ChkConflictsAssociationCompletedEventArgs>("MedicationMgmtWS.ChkConflictsAssociation",oCReqMsgChkConflictsAssociation,this.ChkConflictsAssociationCompleted,"MCVersion",new ChkConflictsAssociationCompletedEventArgs(), prototypeList, charPropertyLookup);
}

DuplicateConflictCheckCompleted: Function;
DuplicateConflictCheckAsync(oCReqMsgDuplicateConflictCheck:CReqMsgDuplicateConflictCheck ) : void {
  HelperService.Invoke<CReqMsgDuplicateConflictCheck,CResMsgDuplicateConflictCheck,DuplicateConflictCheckCompletedEventArgs>("MedicationMgmtWS.DuplicateConflictCheck",oCReqMsgDuplicateConflictCheck,this.DuplicateConflictCheckCompleted,"objConflictDetails",new DuplicateConflictCheckCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetAdditionalDetailsCompleted: Function;
GetAdditionalDetailsAsync(oCReqMsgGetAdditionalDetails:CReqMsgGetAdditionalDetails ) : void {
  HelperService.Invoke<CReqMsgGetAdditionalDetails,CResMsgGetAdditionalDetails,GetAdditionalDetailsCompletedEventArgs>("MedicationMgmtWS.GetAdditionalDetails",oCReqMsgGetAdditionalDetails,this.GetAdditionalDetailsCompleted,"sMCVersionNo",new GetAdditionalDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetAlternateDetailsCompleted: Function;
GetAlternateDetailsAsync(oCReqMsgGetAlternateDetails:CReqMsgGetAlternateDetails ) : void {
  HelperService.Invoke<CReqMsgGetAlternateDetails,CResMsgGetAlternateDetails,GetAlternateDetailsCompletedEventArgs>("MedicationMgmtWS.GetAlternateDetails",oCReqMsgGetAlternateDetails,this.GetAlternateDetailsCompleted,"sMCVersionNo",new GetAlternateDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetAssociateDetailsCompleted: Function;
GetAssociateDetailsAsync(oCReqMsgGetAssociateDetails:CReqMsgGetAssociateDetails ) : void {
  HelperService.Invoke<CReqMsgGetAssociateDetails,CResMsgGetAssociateDetails,GetAssociateDetailsCompletedEventArgs>("MedicationMgmtWS.GetAssociateDetails",oCReqMsgGetAssociateDetails,this.GetAssociateDetailsCompleted,"sMCVersionNo",new GetAssociateDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMultiComponentDetailsCompleted: Function;
GetMultiComponentDetailsAsync(oCReqMsgGetMultiComponentDetails:CReqMsgGetMultiComponentDetails ) : void {
  HelperService.Invoke<CReqMsgGetMultiComponentDetails,CResMsgGetMultiComponentDetails,GetMultiComponentDetailsCompletedEventArgs>("MedicationMgmtWS.GetMultiComponentDetails",oCReqMsgGetMultiComponentDetails,this.GetMultiComponentDetailsCompleted,"sMCVersionNo",new GetMultiComponentDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetValidationDetailsCompleted: Function;
GetValidationDetailsAsync(oCReqMsgGetValidationDetails:CReqMsgGetValidationDetails ) : void {
  HelperService.Invoke<CReqMsgGetValidationDetails,CResMsgGetValidationDetails,GetValidationDetailsCompletedEventArgs>("MedicationMgmtWS.GetValidationDetails",oCReqMsgGetValidationDetails,this.GetValidationDetailsCompleted,"IdentifyingType",new GetValidationDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetProcessingDetailsCompleted: Function;
GetProcessingDetailsAsync(oCReqMsgGetProcessingDetails:CReqMsgGetProcessingDetails ) : void {
  HelperService.Invoke<CReqMsgGetProcessingDetails,CResMsgGetProcessingDetails,GetProcessingDetailsCompletedEventArgs>("MedicationMgmtWS.GetProcessingDetails",oCReqMsgGetProcessingDetails,this.GetProcessingDetailsCompleted,"sMcVersionNo",new GetProcessingDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPolicyDetailsCompleted: Function;
GetPolicyDetailsAsync(oCReqMsgGetPolicyDetails:CReqMsgGetPolicyDetails ) : void {
  HelperService.Invoke<CReqMsgGetPolicyDetails,CResMsgGetPolicyDetails,GetPolicyDetailsCompletedEventArgs>("MedicationMgmtWS.GetPolicyDetails",oCReqMsgGetPolicyDetails,this.GetPolicyDetailsCompleted,"sMcVersionNo",new GetPolicyDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetAdminMethodCompleted: Function;
GetAdminMethodAsync(oCReqMsgGetAdminMethod:CReqMsgGetAdminMethod ) : void {
  HelperService.Invoke<CReqMsgGetAdminMethod,CResMsgGetAdminMethod,GetAdminMethodCompletedEventArgs>("MedicationMgmtWS.GetAdminMethod",oCReqMsgGetAdminMethod,this.GetAdminMethodCompleted,"sMCVersion",new GetAdminMethodCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetParentPrescriptionItemListCompleted: Function;
GetParentPrescriptionItemListAsync(oCReqMsgGetParentPrescriptionItemList:CReqMsgGetParentPrescriptionItemList ) : void {
  HelperService.Invoke<CReqMsgGetParentPrescriptionItemList,CResMsgGetParentPrescriptionItemList,GetParentPrescriptionItemListCompletedEventArgs>("MedicationMgmtWS.GetParentPrescriptionItemList",oCReqMsgGetParentPrescriptionItemList,this.GetParentPrescriptionItemListCompleted,"IsDuplicate",new GetParentPrescriptionItemListCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetChildPrescriptionItemListCompleted: Function;
GetChildPrescriptionItemListAsync(oCReqMsgGetChildPrescriptionItemList:CReqMsgGetChildPrescriptionItemList ) : void {
  HelperService.Invoke<CReqMsgGetChildPrescriptionItemList,CResMsgGetChildPrescriptionItemList,GetChildPrescriptionItemListCompletedEventArgs>("MedicationMgmtWS.GetChildPrescriptionItemList",oCReqMsgGetChildPrescriptionItemList,this.GetChildPrescriptionItemListCompleted,"MCVersion",new GetChildPrescriptionItemListCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CreateCrossReactiveGroupCompleted: Function;
CreateCrossReactiveGroupAsync(oCReqMsgCreateCrossReactiveGroup:CReqMsgCreateCrossReactiveGroup ) : void {
  HelperService.Invoke<CReqMsgCreateCrossReactiveGroup,CResMsgCreateCrossReactiveGroup,CreateCrossReactiveGroupCompletedEventArgs>("MedicationMgmtWS.CreateCrossReactiveGroup",oCReqMsgCreateCrossReactiveGroup,this.CreateCrossReactiveGroupCompleted,"oReactiveGroup",new CreateCrossReactiveGroupCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ModifyCrossReactiveGroupCompleted: Function;
ModifyCrossReactiveGroupAsync(oCReqMsgModifyCrossReactiveGroup:CReqMsgModifyCrossReactiveGroup ) : void {
  HelperService.Invoke<CReqMsgModifyCrossReactiveGroup,CResMsgModifyCrossReactiveGroup,ModifyCrossReactiveGroupCompletedEventArgs>("MedicationMgmtWS.ModifyCrossReactiveGroup",oCReqMsgModifyCrossReactiveGroup,this.ModifyCrossReactiveGroupCompleted,"oReactiveGroup",new ModifyCrossReactiveGroupCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetReactiveGroupsCompleted: Function;
GetReactiveGroupsAsync(oCReqMsgGetReactiveGroups:CReqMsgGetReactiveGroups ) : void {
  HelperService.Invoke<CReqMsgGetReactiveGroups,CResMsgGetReactiveGroups,GetReactiveGroupsCompletedEventArgs>("MedicationMgmtWS.GetReactiveGroups",oCReqMsgGetReactiveGroups,this.GetReactiveGroupsCompleted,"lnEndRow",new GetReactiveGroupsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetReactiveGroupDetailCompleted: Function;
GetReactiveGroupDetailAsync(oCReqMsgGetReactiveGroupDetail:CReqMsgGetReactiveGroupDetail ) : void {
  HelperService.Invoke<CReqMsgGetReactiveGroupDetail,CResMsgGetReactiveGroupDetail,GetReactiveGroupDetailCompletedEventArgs>("MedicationMgmtWS.GetReactiveGroupDetail",oCReqMsgGetReactiveGroupDetail,this.GetReactiveGroupDetailCompleted,"nPageSize",new GetReactiveGroupDetailCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetCrossActItemDetailsCompleted: Function;
GetCrossActItemDetailsAsync(oCReqMsgGetCrossActItemDetails:CReqMsgGetCrossActItemDetails ) : void {
  HelperService.Invoke<CReqMsgGetCrossActItemDetails,CResMsgGetCrossActItemDetails,GetCrossActItemDetailsCompletedEventArgs>("MedicationMgmtWS.GetCrossActItemDetails",oCReqMsgGetCrossActItemDetails,this.GetCrossActItemDetailsCompleted,"oCrossReactGrpSearch",new GetCrossActItemDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetCrossRctGroupFilterbyCompleted: Function;
GetCrossRctGroupFilterbyAsync(oCReqMsgGetCrossRctGroupFilterby:CReqMsgGetCrossRctGroupFilterby ) : void {
  HelperService.Invoke<CReqMsgGetCrossRctGroupFilterby,CResMsgGetCrossRctGroupFilterby,GetCrossRctGroupFilterbyCompletedEventArgs>("MedicationMgmtWS.GetCrossRctGroupFilterby",oCReqMsgGetCrossRctGroupFilterby,this.GetCrossRctGroupFilterbyCompleted,"objReactiveSearch",new GetCrossRctGroupFilterbyCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CreateFormularyCompleted: Function;
CreateFormularyAsync(oCReqMsgCreateFormulary:CReqMsgCreateFormulary ) : void {
  HelperService.Invoke<CReqMsgCreateFormulary,CResMsgCreateFormulary,CreateFormularyCompletedEventArgs>("MedicationMgmtWS.CreateFormulary",oCReqMsgCreateFormulary,this.CreateFormularyCompleted,"oDataFilter",new CreateFormularyCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CopyFormularyCompleted: Function;
CopyFormularyAsync(oCReqMsgCopyFormulary:CReqMsgCopyFormulary ) : void {
  HelperService.Invoke<CReqMsgCopyFormulary,CResMsgCopyFormulary,CopyFormularyCompletedEventArgs>("MedicationMgmtWS.CopyFormulary",oCReqMsgCopyFormulary,this.CopyFormularyCompleted,"oDataFilter",new CopyFormularyCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ManageFormularyCompleted: Function;
ManageFormularyAsync(oCReqMsgManageFormulary:CReqMsgManageFormulary ) : void {
  HelperService.Invoke<CReqMsgManageFormulary,CResMsgManageFormulary,ManageFormularyCompletedEventArgs>("MedicationMgmtWS.ManageFormulary",oCReqMsgManageFormulary,this.ManageFormularyCompleted,"oDataFilter",new ManageFormularyCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFormularyListCompleted: Function;
GetFormularyListAsync(oCReqMsgGetFormularyList:CReqMsgGetFormularyList ) : void {
  HelperService.Invoke<CReqMsgGetFormularyList,CResMsgGetFormularyList,GetFormularyListCompletedEventArgs>("MedicationMgmtWS.GetFormularyList",oCReqMsgGetFormularyList,this.GetFormularyListCompleted,"lnEndRow",new GetFormularyListCompletedEventArgs(), prototypeList, charPropertyLookup);
}

SearchFormularyListCompleted: Function;
SearchFormularyListAsync(oCReqMsgSearchFormularyList:CReqMsgSearchFormularyList ) : void {
  HelperService.Invoke<CReqMsgSearchFormularyList,CResMsgSearchFormularyList,SearchFormularyListCompletedEventArgs>("MedicationMgmtWS.SearchFormularyList",oCReqMsgSearchFormularyList,this.SearchFormularyListCompleted,"objSearchFormularyGroup",new SearchFormularyListCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFormularyItemDetailsCompleted: Function;
GetFormularyItemDetailsAsync(oCReqMsgGetFormularyItemDetails:CReqMsgGetFormularyItemDetails ) : void {
  HelperService.Invoke<CReqMsgGetFormularyItemDetails,CResMsgGetFormularyItemDetails,GetFormularyItemDetailsCompletedEventArgs>("MedicationMgmtWS.GetFormularyItemDetails",oCReqMsgGetFormularyItemDetails,this.GetFormularyItemDetailsCompleted,"objSerachFormularyDetail",new GetFormularyItemDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFormularyDetailsCompleted: Function;
GetFormularyDetailsAsync(oCReqMsgGetFormularyDetails:CReqMsgGetFormularyDetails ) : void {
  HelperService.Invoke<CReqMsgGetFormularyDetails,CResMsgGetFormularyDetails,GetFormularyDetailsCompletedEventArgs>("MedicationMgmtWS.GetFormularyDetails",oCReqMsgGetFormularyDetails,this.GetFormularyDetailsCompleted,"sMenucode",new GetFormularyDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetIsDefaultValuesCompleted: Function;
GetIsDefaultValuesAsync(oCReqMsgGetIsDefaultValues:CReqMsgGetIsDefaultValues ) : void {
  HelperService.Invoke<CReqMsgGetIsDefaultValues,CResMsgGetIsDefaultValues,GetIsDefaultValuesCompletedEventArgs>("MedicationMgmtWS.GetIsDefaultValues",oCReqMsgGetIsDefaultValues,this.GetIsDefaultValuesCompleted,"CareActivity",new GetIsDefaultValuesCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFrmlyComboValuesCompleted: Function;
GetFrmlyComboValuesAsync(oCReqMsgGetFrmlyComboValues:CReqMsgGetFrmlyComboValues ) : void {
  HelperService.Invoke<CReqMsgGetFrmlyComboValues,CResMsgGetFrmlyComboValues,GetFrmlyComboValuesCompletedEventArgs>("MedicationMgmtWS.GetFrmlyComboValues",oCReqMsgGetFrmlyComboValues,this.GetFrmlyComboValuesCompleted,"sMcVersionNo",new GetFrmlyComboValuesCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CheckDuplicateFormularyCompleted: Function;
CheckDuplicateFormularyAsync(oCReqMsgCheckDuplicateFormulary:CReqMsgCheckDuplicateFormulary ) : void {
  HelperService.Invoke<CReqMsgCheckDuplicateFormulary,CResMsgCheckDuplicateFormulary,CheckDuplicateFormularyCompletedEventArgs>("MedicationMgmtWS.CheckDuplicateFormulary",oCReqMsgCheckDuplicateFormulary,this.CheckDuplicateFormularyCompleted,"lnOrganisationOID",new CheckDuplicateFormularyCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ChkDupItemlistCompleted: Function;
ChkDupItemlistAsync(oCReqMsgChkDupItemlist:CReqMsgChkDupItemlist ) : void {
  HelperService.Invoke<CReqMsgChkDupItemlist,CResMsgChkDupItemlist,ChkDupItemlistCompletedEventArgs>("MedicationMgmtWS.ChkDupItemlist",oCReqMsgChkDupItemlist,this.ChkDupItemlistCompleted,"sMCVersion",new ChkDupItemlistCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ChkDupIntractSenGrpItemCompleted: Function;
ChkDupIntractSenGrpItemAsync(oCReqMsgChkDupIntractSenGrpItem:CReqMsgChkDupIntractSenGrpItem ) : void {
  HelperService.Invoke<CReqMsgChkDupIntractSenGrpItem,CResMsgChkDupIntractSenGrpItem,ChkDupIntractSenGrpItemCompletedEventArgs>("MedicationMgmtWS.ChkDupIntractSenGrpItem",oCReqMsgChkDupIntractSenGrpItem,this.ChkDupIntractSenGrpItemCompleted,"sMCVersion",new ChkDupIntractSenGrpItemCompletedEventArgs(), prototypeList, charPropertyLookup);
}
}

export class GetFormularyByOIDCompletedEventArgs{
 public Result: CResMsgGetFormularyByOID;
public Error: any;
}
export class GetFavouritesByOIDCompletedEventArgs{
 public Result: CResMsgGetFavouritesByOID;
public Error: any;
}
export class GetFormViewParmByOIDCompletedEventArgs{
 public Result: CResMsgGetFormViewParmByOID;
public Error: any;
}
export class GetItemFreqByOIDCompletedEventArgs{
 public Result: CResMsgGetItemFreqByOID;
public Error: any;
}
export class GetROAByOIDCompletedEventArgs{
 public Result: CResMsgGetROAByOID;
public Error: any;
}
export class GetAdminInstructionCompletedEventArgs{
 public Result: CResMsgGetAdminInstruction;
public Error: any;
}
export class CreateRouteCompletedEventArgs{
 public Result: CResMsgCreateRoute;
public Error: any;
}
export class CheckItemExistsCompletedEventArgs{
 public Result: CResMsgCheckItemExists;
public Error: any;
}
export class GetFrequenciesCompletedEventArgs{
 public Result: CResMsgGetFrequencies;
public Error: any;
}
export class GetFrequencyByOIDCompletedEventArgs{
 public Result: CResMsgGetFrequencyByOID;
public Error: any;
}
export class GetBaseFrequenciesCompletedEventArgs{
 public Result: CResMsgGetBaseFrequencies;
public Error: any;
}
export class CheckFrequencyIsLinkedCompletedEventArgs{
 public Result: CResMsgCheckFrequencyIsLinked;
public Error: any;
}
export class ChkFreqCustomisedCompletedEventArgs{
 public Result: CResMsgChkFreqCustomised;
public Error: any;
}
export class GetMedicationCodeCompletedEventArgs{
 public Result: CResMsgGetMedicationCode;
public Error: any;
}
export class CreateFrequencyCompletedEventArgs{
 public Result: CResMsgCreateFrequency;
public Error: any;
}
export class ModifyFrequencyCompletedEventArgs{
 public Result: CResMsgModifyFrequency;
public Error: any;
}
export class GetFormNamesCompletedEventArgs{
 public Result: CResMsgGetFormNames;
public Error: any;
}
export class ManagePrescriptionFormsCompletedEventArgs{
 public Result: CResMsgManagePrescriptionForms;
public Error: any;
}
export class CheckValidDateCompletedEventArgs{
 public Result: CResMsgCheckValidDate;
public Error: any;
}
export class GetDoseDetailsCompletedEventArgs{
 public Result: CResMsgGetDoseDetails;
public Error: any;
}
export class IngManageActivePeriodsCompletedEventArgs{
 public Result: CResMsgIngManageActivePeriods;
public Error: any;
}
export class HiManageActivePeriodsCompletedEventArgs{
 public Result: CResMsgHiManageActivePeriods;
public Error: any;
}
export class PreManageActivePeriodsCompletedEventArgs{
 public Result: CResMsgPreManageActivePeriods;
public Error: any;
}
export class ForManageActivePeriodsCompletedEventArgs{
 public Result: CResMsgForManageActivePeriods;
public Error: any;
}
export class IntManageActivePeriodsCompletedEventArgs{
 public Result: CResMsgIntManageActivePeriods;
public Error: any;
}
export class SenManageActivePeriodsCompletedEventArgs{
 public Result: CResMsgSenManageActivePeriods;
public Error: any;
}
export class MedManageActivePeriodsCompletedEventArgs{
 public Result: CResMsgMedManageActivePeriods;
public Error: any;
}
export class FvpManageActivePeriodsCompletedEventArgs{
 public Result: CResMsgFvpManageActivePeriods;
public Error: any;
}
export class ItmFreqManageActivePeriodsCompletedEventArgs{
 public Result: CResMsgItmFreqManageActivePeriods;
public Error: any;
}
export class ROAManageActivePeriodsCompletedEventArgs{
 public Result: CResMsgROAManageActivePeriods;
public Error: any;
}
export class GetIngredientByOIDCompletedEventArgs{
 public Result: CResMsgGetIngredientByOID;
public Error: any;
}
export class GetInteractionGrpByOIDCompletedEventArgs{
 public Result: CResMsgGetInteractionGrpByOID;
public Error: any;
}
export class GetSensitivityGrpByOIDCompletedEventArgs{
 public Result: CResMsgGetSensitivityGrpByOID;
public Error: any;
}
export class GetHierarchyByOIDCompletedEventArgs{
 public Result: CResMsgGetHierarchyByOID;
public Error: any;
}
export class GetPrescribableItemByOIDCompletedEventArgs{
 public Result: CResMsgGetPrescribableItemByOID;
public Error: any;
}
export class IsGroupDetailsExistsCompletedEventArgs{
 public Result: CResMsgIsGroupDetailsExists;
public Error: any;
}
export class ManageMonographCompletedEventArgs{
 public Result: CResMsgManageMonograph;
public Error: any;
}
export class GetMonographContentCompletedEventArgs{
 public Result: CResMsgGetMonographContent;
public Error: any;
}
export class GetDrugXMLInfoCompletedEventArgs{
 public Result: CResMsgGetDrugXMLInfo;
public Error: any;
}
export class GetMonographDetailsCompletedEventArgs{
 public Result: CResMsgGetMonographDetails;
public Error: any;
}
export class GetStrengthOrderDetailsCompletedEventArgs{
 public Result: CResMsgGetStrengthOrderDetails;
public Error: any;
}
export class ManagestrengthorderCompletedEventArgs{
 public Result: CResMsgManagestrengthorder;
public Error: any;
}
export class GetConflictWarningCategoryCompletedEventArgs{
 public Result: CResMsgGetConflictWarningCategory;
public Error: any;
}
export class GetUserFavouritesChildGroupCompletedEventArgs{
 public Result: CResMsgGetUserFavouritesChildGroup;
public Error: any;
}
export class GetUserFavouritesGroupItemsCompletedEventArgs{
 public Result: CResMsgGetUserFavouritesGroupItems;
public Error: any;
}
export class GetProcessingItemDetailsCompletedEventArgs{
 public Result: CResMsgGetProcessingItemDetails;
public Error: any;
}
export class GetFavouritesSearchCompletedEventArgs{
 public Result: CResMsgGetFavouritesSearch;
public Error: any;
}
export class GetDrugSiteCompletedEventArgs{
 public Result: CResMsgGetDrugSite;
public Error: any;
}
export class GetPrsItemDetailsCompletedEventArgs{
 public Result: CResMsgGetPrsItemDetails;
public Error: any;
}
export class GetPresItemModifyDetailsCompletedEventArgs{
 public Result: CResMsgGetPresItemModifyDetails;
public Error: any;
}
export class GetSteppedVariableDoseDetailsCompletedEventArgs{
 public Result: CResMsgGetSteppedVariableDoseDetails;
public Error: any;
}
export class NotifyNewversionCompletedEventArgs{
 public Result: CResMsgNotifyNewversion;
public Error: any;
}
export class ValiadteSentVersionCompletedEventArgs{
 public Result: CResMsgValiadteSentVersion;
public Error: any;
}
export class GetStationaryItemCompletedEventArgs{
 public Result: CResMsgGetStationaryItem;
public Error: any;
}
export class GetStationaryItemsCompletedEventArgs{
 public Result: CResMsgGetStationaryItems;
public Error: any;
}
export class lnCheckExistPresItemCompletedEventArgs{
 public Result: CResMsglnCheckExistPresItem;
public Error: any;
}
export class lnCheckExistDrugFavouritesCompletedEventArgs{
 public Result: CResMsglnCheckExistDrugFavourites;
public Error: any;
}
export class CreateFormViewParametersCompletedEventArgs{
 public Result: CResMsgCreateFormViewParameters;
public Error: any;
}
export class ModifyFormViewParametersCompletedEventArgs{
 public Result: CResMsgModifyFormViewParameters;
public Error: any;
}
export class SelectFormViewParametersCompletedEventArgs{
 public Result: CResMsgSelectFormViewParameters;
public Error: any;
}
export class GetMedFormDetailsByOIDCompletedEventArgs{
 public Result: CResMsgGetMedFormDetailsByOID;
public Error: any;
}
export class GetFrmVwrAttributesCompletedEventArgs{
 public Result: CResMsgGetFrmVwrAttributes;
public Error: any;
}
export class GetAssociatedAttributesCompletedEventArgs{
 public Result: CResMsgGetAssociatedAttributes;
public Error: any;
}
export class GetPresItemsCompletedEventArgs{
 public Result: CResMsgGetPresItems;
public Error: any;
}
export class GetHierarchyCompletedEventArgs{
 public Result: CResMsgGetHierarchy;
public Error: any;
}
export class GetLeafNodesCompletedEventArgs{
 public Result: CResMsgGetLeafNodes;
public Error: any;
}
export class GetPrescribingTeamsAndMedHierarchyCompletedEventArgs{
 public Result: CResMsgGetPrescribingTeamsAndMedHierarchy;
public Error: any;
}
export class SubmitMedMapHierarchyCompletedEventArgs{
 public Result: CResMsgSubmitMedMapHierarchy;
public Error: any;
}
export class GetHierarchyDupCompletedEventArgs{
 public Result: CResMsgGetHierarchyDup;
public Error: any;
}
export class CheckItemHrchyAssociationCompletedEventArgs{
 public Result: CResMsgCheckItemHrchyAssociation;
public Error: any;
}
export class CreateHierarchyCompletedEventArgs{
 public Result: CResMsgCreateHierarchy;
public Error: any;
}
export class ManageHierarchyCompletedEventArgs{
 public Result: CResMsgManageHierarchy;
public Error: any;
}
export class GetDrugCategoryDetailsCompletedEventArgs{
 public Result: CResMsgGetDrugCategoryDetails;
public Error: any;
}
export class GetMedicationCompletedEventArgs{
 public Result: CResMsgGetMedication;
public Error: any;
}
export class GetPrescribableItemListSFSCompletedEventArgs{
 public Result: CResMsgGetPrescribableItemListSFS;
public Error: any;
}
export class CreatePrescibableItemCompletedEventArgs{
 public Result: CResMsgCreatePrescibableItem;
public Error: any;
}
export class ModifyPrescribableItemCompletedEventArgs{
 public Result: CResMsgModifyPrescribableItem;
public Error: any;
}
export class GetRouteCompletedEventArgs{
 public Result: CResMsgGetRoute;
public Error: any;
}
export class GetRouteSFSCompletedEventArgs{
 public Result: CResMsgGetRouteSFS;
public Error: any;
}
export class GetDosageFormCompletedEventArgs{
 public Result: CResMsgGetDosageForm;
public Error: any;
}
export class GetSiteCompletedEventArgs{
 public Result: CResMsgGetSite;
public Error: any;
}
export class GetFormCompletedEventArgs{
 public Result: CResMsgGetForm;
public Error: any;
}
export class GetAllUOMCompletedEventArgs{
 public Result: CResMsgGetAllUOM;
public Error: any;
}
export class GetAllPackageUOMCompletedEventArgs{
 public Result: CResMsgGetAllPackageUOM;
public Error: any;
}
export class GetAllPackageUOMSFSCompletedEventArgs{
 public Result: CResMsgGetAllPackageUOMSFS;
public Error: any;
}
export class GetAllLegalCategoryCompletedEventArgs{
 public Result: CResMsgGetAllLegalCategory;
public Error: any;
}
export class GetDoseUOMCompletedEventArgs{
 public Result: CResMsgGetDoseUOM;
public Error: any;
}
export class GetFrequencyCompletedEventArgs{
 public Result: CResMsgGetFrequency;
public Error: any;
}
export class GetManufacturersCompletedEventArgs{
 public Result: CResMsgGetManufacturers;
public Error: any;
}
export class GetBasicDetailsCompletedEventArgs{
 public Result: CResMsgGetBasicDetails;
public Error: any;
}
export class HOCGetPresItemDetailsCompletedEventArgs{
 public Result: CResMsgHOCGetPresItemDetails;
public Error: any;
}
export class GetDataFilterDetailsCompletedEventArgs{
 public Result: CResMsgGetDataFilterDetails;
public Error: any;
}
export class GetConflictDetailsByOIDCompletedEventArgs{
 public Result: CResMsgGetConflictDetailsByOID;
public Error: any;
}
export class GetConflictsByItemOIDCompletedEventArgs{
 public Result: CResMsgGetConflictsByItemOID;
public Error: any;
}
export class GetContraIndicationByOIDCompletedEventArgs{
 public Result: CResMsgGetContraIndicationByOID;
public Error: any;
}
export class GetPrecautionByOIDCompletedEventArgs{
 public Result: CResMsgGetPrecautionByOID;
public Error: any;
}
export class GetWarningByOIDCompletedEventArgs{
 public Result: CResMsgGetWarningByOID;
public Error: any;
}
export class ViewRelatedConditionDetailsCompletedEventArgs{
 public Result: CResMsgViewRelatedConditionDetails;
public Error: any;
}
export class GetPrsItmOIDbyCatitmOidCompletedEventArgs{
 public Result: CResMsgGetPrsItmOIDbyCatitmOid;
public Error: any;
}
export class ManageConflictconfigurationCompletedEventArgs{
 public Result: CResMsgManageConflictconfiguration;
public Error: any;
}
export class GetMedicationConfilictConfigCompletedEventArgs{
 public Result: CResMsgGetMedicationConfilictConfig;
public Error: any;
}
export class GetManageCatalogueconfigurationCompletedEventArgs{
 public Result: CResMsgGetManageCatalogueconfiguration;
public Error: any;
}
export class GetBulletinDetailCompletedEventArgs{
 public Result: CResMsgGetBulletinDetail;
public Error: any;
}
export class GetVerDuplicateCompletedEventArgs{
 public Result: CResMsgGetVerDuplicate;
public Error: any;
}
export class GetVerConfigHistoryCompletedEventArgs{
 public Result: CResMsgGetVerConfigHistory;
public Error: any;
}
export class ManageCatalogueconfigurationCompletedEventArgs{
 public Result: CResMsgManageCatalogueconfiguration;
public Error: any;
}
export class GetChkConfltCatConfigLnkEnableCompletedEventArgs{
 public Result: CResMsgGetChkConfltCatConfigLnkEnable;
public Error: any;
}
export class ChkYearAndMonthDataLoadCompletedEventArgs{
 public Result: CResMsgChkYearAndMonthDataLoad;
public Error: any;
}
export class CheckMonthlyLoadStatusCompletedEventArgs{
 public Result: CResMsgCheckMonthlyLoadStatus;
public Error: any;
}
export class GetFlryProcDoseDetailsCompletedEventArgs{
 public Result: CResMsgGetFlryProcDoseDetails;
public Error: any;
}
export class GetPresItemDetailByOIDCompletedEventArgs{
 public Result: CResMsgGetPresItemDetailByOID;
public Error: any;
}
export class IsDeactiveItemCompletedEventArgs{
 public Result: CResMsgIsDeactiveItem;
public Error: any;
}
export class GetSysDrugPropertyCompletedEventArgs{
 public Result: CResMsgGetSysDrugProperty;
public Error: any;
}
export class CreateIngredientCompletedEventArgs{
 public Result: CResMsgCreateIngredient;
public Error: any;
}
export class ManageIngredientCompletedEventArgs{
 public Result: CResMsgManageIngredient;
public Error: any;
}
export class GetIngredientCompletedEventArgs{
 public Result: CResMsgGetIngredient;
public Error: any;
}
export class CheckIngredientIsLinkedCompletedEventArgs{
 public Result: CResMsgCheckIngredientIsLinked;
public Error: any;
}
export class SearchIngredientCompletedEventArgs{
 public Result: CResMsgSearchIngredient;
public Error: any;
}
export class SearchIngredientSFSCompletedEventArgs{
 public Result: CResMsgSearchIngredientSFS;
public Error: any;
}
export class GetFavouriteSearchResultsCompletedEventArgs{
 public Result: CResMsgGetFavouriteSearchResults;
public Error: any;
}
export class CheckDuplicateMainFormularyCompletedEventArgs{
 public Result: CResMsgCheckDuplicateMainFormulary;
public Error: any;
}
export class CreateInteractiveGroupCompletedEventArgs{
 public Result: CResMsgCreateInteractiveGroup;
public Error: any;
}
export class GetInteractiveGroupCompletedEventArgs{
 public Result: CResMsgGetInteractiveGroup;
public Error: any;
}
export class GetInteractiveGroupDetailsCompletedEventArgs{
 public Result: CResMsgGetInteractiveGroupDetails;
public Error: any;
}
export class GetDrugUnderHierarchyCompletedEventArgs{
 public Result: CResMsgGetDrugUnderHierarchy;
public Error: any;
}
export class GetIntractItemDetailsCompletedEventArgs{
 public Result: CResMsgGetIntractItemDetails;
public Error: any;
}
export class GetInteractiveGroupbyNameCompletedEventArgs{
 public Result: CResMsgGetInteractiveGroupbyName;
public Error: any;
}
export class GetLinkedIntrGrpDetailsCompletedEventArgs{
 public Result: CResMsgGetLinkedIntrGrpDetails;
public Error: any;
}
export class GetCustomisedIntrGrpDetailsCompletedEventArgs{
 public Result: CResMsgGetCustomisedIntrGrpDetails;
public Error: any;
}
export class ModifyInteractionGroupCompletedEventArgs{
 public Result: CResMsgModifyInteractionGroup;
public Error: any;
}
export class GetIntrGroupFilterbyCompletedEventArgs{
 public Result: CResMsgGetIntrGroupFilterby;
public Error: any;
}
export class GetItemSearchCriteriaResultsCompletedEventArgs{
 public Result: CResMsgGetItemSearchCriteriaResults;
public Error: any;
}
export class GetPolicyInfoCompletedEventArgs{
 public Result: CResMsgGetPolicyInfo;
public Error: any;
}
export class ManageFavouritesCompletedEventArgs{
 public Result: CResMsgManageFavourites;
public Error: any;
}
export class GetFavouritesParentGroupCompletedEventArgs{
 public Result: CResMsgGetFavouritesParentGroup;
public Error: any;
}
export class GetFavouritesChildGroupCompletedEventArgs{
 public Result: CResMsgGetFavouritesChildGroup;
public Error: any;
}
export class GetFavouritesGroupItemsCompletedEventArgs{
 public Result: CResMsgGetFavouritesGroupItems;
public Error: any;
}
export class GetFavouritesDrugItemCompletedEventArgs{
 public Result: CResMsgGetFavouritesDrugItem;
public Error: any;
}
export class GetFavAssociationCompletedEventArgs{
 public Result: CResMsgGetFavAssociation;
public Error: any;
}
export class ManageUserFavouritesCompletedEventArgs{
 public Result: CResMsgManageUserFavourites;
public Error: any;
}
export class GetUserFavouritesParentGroupCompletedEventArgs{
 public Result: CResMsgGetUserFavouritesParentGroup;
public Error: any;
}
export class ModifyRouteCompletedEventArgs{
 public Result: CResMsgModifyRoute;
public Error: any;
}
export class GetRouteByOIDCompletedEventArgs{
 public Result: CResMsgGetRouteByOID;
public Error: any;
}
export class GetRoutesCompletedEventArgs{
 public Result: CResMsgGetRoutes;
public Error: any;
}
export class CheckRouteIsLinkedCompletedEventArgs{
 public Result: CResMsgCheckRouteIsLinked;
public Error: any;
}
export class GetConflictSearchResultsCompletedEventArgs{
 public Result: CResMsgGetConflictSearchResults;
public Error: any;
}
export class ManageConflictsCompletedEventArgs{
 public Result: CResMsgManageConflicts;
public Error: any;
}
export class ChkConflictsAssociationCompletedEventArgs{
 public Result: CResMsgChkConflictsAssociation;
public Error: any;
}
export class DuplicateConflictCheckCompletedEventArgs{
 public Result: CResMsgDuplicateConflictCheck;
public Error: any;
}
export class GetAdditionalDetailsCompletedEventArgs{
 public Result: CResMsgGetAdditionalDetails;
public Error: any;
}
export class GetAlternateDetailsCompletedEventArgs{
 public Result: CResMsgGetAlternateDetails;
public Error: any;
}
export class GetAssociateDetailsCompletedEventArgs{
 public Result: CResMsgGetAssociateDetails;
public Error: any;
}
export class GetMultiComponentDetailsCompletedEventArgs{
 public Result: CResMsgGetMultiComponentDetails;
public Error: any;
}
export class GetValidationDetailsCompletedEventArgs{
 public Result: CResMsgGetValidationDetails;
public Error: any;
}
export class GetProcessingDetailsCompletedEventArgs{
 public Result: CResMsgGetProcessingDetails;
public Error: any;
}
export class GetPolicyDetailsCompletedEventArgs{
 public Result: CResMsgGetPolicyDetails;
public Error: any;
}
export class GetAdminMethodCompletedEventArgs{
 public Result: CResMsgGetAdminMethod;
public Error: any;
}
export class GetParentPrescriptionItemListCompletedEventArgs{
 public Result: CResMsgGetParentPrescriptionItemList;
public Error: any;
}
export class GetChildPrescriptionItemListCompletedEventArgs{
 public Result: CResMsgGetChildPrescriptionItemList;
public Error: any;
}
export class CreateCrossReactiveGroupCompletedEventArgs{
 public Result: CResMsgCreateCrossReactiveGroup;
public Error: any;
}
export class ModifyCrossReactiveGroupCompletedEventArgs{
 public Result: CResMsgModifyCrossReactiveGroup;
public Error: any;
}
export class GetReactiveGroupsCompletedEventArgs{
 public Result: CResMsgGetReactiveGroups;
public Error: any;
}
export class GetReactiveGroupDetailCompletedEventArgs{
 public Result: CResMsgGetReactiveGroupDetail;
public Error: any;
}
export class GetCrossActItemDetailsCompletedEventArgs{
 public Result: CResMsgGetCrossActItemDetails;
public Error: any;
}
export class GetCrossRctGroupFilterbyCompletedEventArgs{
 public Result: CResMsgGetCrossRctGroupFilterby;
public Error: any;
}
export class CreateFormularyCompletedEventArgs{
 public Result: CResMsgCreateFormulary;
public Error: any;
}
export class CopyFormularyCompletedEventArgs{
 public Result: CResMsgCopyFormulary;
public Error: any;
}
export class ManageFormularyCompletedEventArgs{
 public Result: CResMsgManageFormulary;
public Error: any;
}
export class GetFormularyListCompletedEventArgs{
 public Result: CResMsgGetFormularyList;
public Error: any;
}
export class SearchFormularyListCompletedEventArgs{
 public Result: CResMsgSearchFormularyList;
public Error: any;
}
export class GetFormularyItemDetailsCompletedEventArgs{
 public Result: CResMsgGetFormularyItemDetails;
public Error: any;
}
export class GetFormularyDetailsCompletedEventArgs{
 public Result: CResMsgGetFormularyDetails;
public Error: any;
}
export class GetIsDefaultValuesCompletedEventArgs{
 public Result: CResMsgGetIsDefaultValues;
public Error: any;
}
export class GetFrmlyComboValuesCompletedEventArgs{
 public Result: CResMsgGetFrmlyComboValues;
public Error: any;
}
export class CheckDuplicateFormularyCompletedEventArgs{
 public Result: CResMsgCheckDuplicateFormulary;
public Error: any;
}
export class ChkDupItemlistCompletedEventArgs{
 public Result: CResMsgChkDupItemlist;
public Error: any;
}
export class ChkDupIntractSenGrpItemCompletedEventArgs{
 public Result: CResMsgChkDupIntractSenGrpItem;
public Error: any;
}
export class CReqMsgGetAdditionalDetails{
IdentifyingOIDBC:number;
IdentifyingTypeBC:string;
sMCVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetAdditionalDetails{
oContextInformation:CContextInformation;
objPrescribeItemLookUp:ObservableCollection<PrescribeItemLookUp>;
}

export class PrescribeItemLookUp extends CLZOObject{
LookUpType:string;
ItemId:number;
ItemName:string;
ParentItem:string;
ProductOccurance:string;
AdditionalItemValue:string;
OwnerOrganisationOID:number;
}
export class CompatibleComponents extends PrescribeItemLookUp{
OID:number;
PreparationStatus:string;
MCVersion:string;
Status:string;
PrescribableItem:ObservableCollection<ObjectInfo>;
CompatibleItems:ObservableCollection<CompatibleItems>;
}
export class ObjectInfo extends CLZOObject{
OID:number;
Name:string;
Code:string;
RoleProfileOID:number;
OwnerOrganisationOID:number;
SourceDataProviderType:string;
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
export class AlternateDrugItem extends PrescribeItemBase{
Message:string;
ParentItem:string;
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
export class Form extends CLZOObject{
FormId:number;
FormName:string;
LorenzoID:string;
OwnerOrganisationID:number;
Code:string;
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
export class UOM extends CLZOObject{
UOMId:number;
UOMName:string;
SourceDataProviderType:string;
UOMCode:string;
MCIPrescribableItemListOID:number;
UOMTypeCode:string;
OwnerOrganisationID:number;
}
export class Frequency extends CLZOObject{
Frequencyvalue:number;
FrequencyId:number;
FrequencyName:string;
ShortName:string;
IsPRN:string;
IsApplicableForDoseCalc:string;
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
export class MeasurableObject extends CLZOObject{
OID:number;
Value:number;
UOMOID:number;
UOMName:string;
RecordedDate:DateTime;
UOMCode:string;
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
export class Stationary extends CLZOObject{
StationaryOID:number;
StationaryName:string;
StationaryHOrgID:number;
DataProvider:string;
StationaryCode:string;
}
export class Site extends CLZOObject{
SiteId:number;
SiteName:string;
DataProvider:string;
OwnerOrganisationOID:number;
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
export class DRCdoseTypes extends CLZOObject{
DRCdoseTypeText:string;
DRCdoseTypeLorenzoID:string;
}
export class PrescribeItemDetails extends PrescribeItemBase{
AdditionalDetail:AdditionalInfo;
MultiComponentDetails:MultiComponent;
oCompatibleComponents:CompatibleComponents;
ItemCategory:ObservableCollection<DrugCategory>;
Indication:ObservableCollection<Indication>;
Ingredient:ObservableCollection<Ingredient>;
Coding:ObservableCollection<TTOCodification>;
ItemLookUp:ObservableCollection<PrescribeItemLookUp>;
AlternateDrugs:ObservableCollection<AlternateDrugItem>;
ProcessingDetails:ObservableCollection<ProcessingInfo>;
Policy:ObservableCollection<DrugPolicy>;
ResolveForm:ObservableCollection<string>;
ResolveFormPI:ObservableCollection<ResolveForm>;
ContraIndicativeDetails:ObservableCollection<DrugContraIndicative>;
PrecautionDetails:ObservableCollection<DrugPrecaution>;
WarningDetails:ObservableCollection<DrugWarning>;
}
export class DrugCategory extends CLZOObject{
CategoryID:number;
Name:string;
Description:string;
ParentCategory:number;
HierarchyLevel:number;
Version:string;
Status:string;
OrganisationOID:number;
SourceDataProviderType:string;
SourceDataProviderID:string;
LorenzoID:string;
MCVersion:string;
EffectiveDTTM:DateTime;
ExpiryDTTM:DateTime;
ExpiryReason:string;
ReinstateDTTM:DateTime;
ReinstateReason:string;
HierarchyType:string;
FirstSublevel:number;
IsDrugAssociated:number;
Coding:ObservableCollection<TTOCodification>;
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
export class AdditionalInfo extends CLZOObject{
PackageType:string;
LegalCategory:LegalCategory;
CountryCode:string;
SubPack:number;
SubPackUOM:UOM;
Image:ObservableCollection<byte>;
BrandName:string;
Form:Form;
Strength:string;
StrengthUOM:UOM;
StrengthPerValue:UOM;
Quantity:string;
QuantityUOM:UOM;
Cost:string;
CostUOM:UOM;
Package:string;
PackageUOM:UOM;
PackPrice:number;
PackPriceUOM:UOM;
PrescribeByBrand:boolean;
CombinationProductPack:boolean;
Manufacturer:Manufacturer;
IsGeneric:boolean;
AdminMethod:AdminMethod;
AccessConstraint:boolean;
HighRiskMsg:string;
DisplaySeqNum:number;
IsNewItem:boolean;
IsRequestUpdated:boolean;
IsRemoved:boolean;
IsDisplayPrimaryList:boolean;
IsDisplayPrimaryListCustom:string;
IValertDisplay:string;
IsInfusion:boolean;
IsInfusionCustom:string;
DisplacementVolume:string;
DisplacementUOMName:string;
DisplacementUOMOID:number;
MCPackSize:number;
MCPackSizeUOMOID:number;
MCPackSizeUOMName:string;
IsMultiRoute:boolean;
IsCondDoseMonPeriodReq:boolean;
IsCondDoseMonPeriodReqCustom:string;
ItemType:ObservableCollection<string>;
ItemFormulation:ObservableCollection<string>;
NationalFormulary:ObservableCollection<string>;
Synonyms:ObservableCollection<string>;
Monograph:ObservableCollection<MonographInfo>;
AdminInstruction:ObservableCollection<AdminInstruction>;
Route:ObservableCollection<Route>;
ProhibitedRoute:ObservableCollection<Route>;
Site:ObservableCollection<Site>;
FormArr:ObservableCollection<Form>;
StationaryType:ObservableCollection<string>;
MonographInformation:ObservableCollection<MonographInformation>;
EndorsementProperties:ObservableCollection<EndorsementProperties>;
ProductType:ObservableCollection<ProductType>;
Stationary:ObservableCollection<Stationary>;
MultiComponent:ObservableCollection<DrugMultiComponent>;
Approvedby:ObservableCollection<DrugApprover>;
ApplicableFluids:ObservableCollection<PrescribeItem>;
Synonym:ObservableCollection<Synonym>;
SupplyQuantityUOM:ObservableCollection<SupplyQuantityUOM>;
MCSupplyQuantityUOM:ObservableCollection<MCSupplyQuantityUOM>;
HOCustProductType:ObservableCollection<ProductType>;
EANCode:ObservableCollection<EANCodeInfo>;
}
export class LegalCategory extends CLZOObject{
LCId:number;
LegalCategoryName:string;
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
export class Manufacturer extends CLZOObject{
ManufacturerId:number;
ManufacturerName:string;
MCVersionNumber:string;
}
export class MonographInformation extends CLZOObject{
Description:string;
MonographInfo:ObservableCollection<byte>;
SourceDataProviderType:string;
MonographContentOID:number;
MonographInformationOID:number;
SourceDataProviderID:string;
LorenzoID:string;
OwnerOrganisationOID:number;
}
export class EndorsementProperties extends CLZOObject{
EndorsementPrptsCC:string;
EndorsementPrptsName:string;
}
export class ProductType extends CLZOObject{
ProdOid:number;
ProdIdentOid:number;
ProdTypeName:string;
ProdTypeCC:string;
OccurInProd:string;
OccurInProdCC:string;
OwnerOrganisationOID:number;
}
export class DrugMultiComponent extends CLZOObject{
DrugMultiComponentOID:number;
ParentIdentifyingOID:number;
IdentifyingType:string;
IsEditable:string;
PrescribableItemName:string;
PrescribableItemOID:number;
Quantity:number;
UnitOfMeasure:UOM;
IsPrimary:string;
QuantityUOM:UOM;
}
export class DrugApprover extends CLZOObject{
DrugApproverOID:number;
RoleOID:number;
Code:string;
Description:string;
}
export class Synonym extends CLZOObject{
Text:string;
DataProvider:string;
OwnerOrganisationID:number;
}
export class SupplyQuantityUOM extends CLZOObject{
SupplyQuantityOID:number;
SupplyQuantityName:string;
MCVersion:string;
SourceDataProviderID:string;
SourceDataProviderType:string;
}
export class MCSupplyQuantityUOM extends CLZOObject{
SupplyQuantityOID:number;
SupplyQuantityName:string;
MCVersion:string;
SourceDataProviderID:string;
SourceDataProviderType:string;
}
export class EANCodeInfo extends CLZOObject{
EANCodeOID:number;
EANCode:string;
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
export class DrugPolicy extends CLZOObject{
PolicyOID:number;
OrganisationOID:string;
OrganisationName:string;
PolicyType:string;
PolicyName:string;
Status:string;
}
export class ResolveForm extends CLZOObject{
Attribute:string;
Display:string;
Mandatory:string;
IdentifyingOID:number;
IdentifyingType:string;
PRETPCode:string;
RouteOID:number;
DOSFMCode:number;
isBasic:string;
}
export class ContraIndicative extends CLZOObject{
OID:number;
SubType:string;
ApplicableTo:string;
MappedCodeType:string;
MappedCodeTerm:string;
ConstraintOId:number;
ConstraintName:string;
ConstraintText:string;
Severity:string;
Message:string;
}
export class DrugContraIndicative extends ContraIndicative{
Type:string;
IsDecisionSupportAvbl:string;
ApplicableToText:string;
ContraSubText:string;
ContraSubType:string;
Applicableto:string;
ConflictText:string;
Mappedcodetype:string;
Mappedcodeterm:string;
ConditionType:string;
DictConditionOID:number;
IdentifyingOID:number;
IdentifyingType:string;
ItemName:string;
OccurInProd:string;
OrganisationID:number;
SeqNumber:number;
DataProviderType:string;
DataProviderID:string;
Source:string;
SourceID:number;
Status:string;
ConflictSource:string;
McVersionNo:string;
}
export class Precaution extends CLZOObject{
PrecautionOID:number;
ConstraintOID:number;
ConstraintName:string;
ConstraintText:string;
PrecautionSubtype:string;
PrecautionSubtypeID:string;
MappedCodeType:string;
MappedCodeTerm:string;
}
export class DrugPrecaution extends Precaution{
Type:string;
ConditionType:string;
DictConditionOID:number;
IdentifyingOID:number;
IdentifyingType:string;
ItemName:string;
OccurInProd:string;
OID:number;
OrganisationID:number;
SeqNumber:number;
DataProviderType:string;
DataProviderID:string;
Source:string;
SourceID:number;
Status:string;
ConflictSource:string;
ConflictText:string;
McVersionNo:string;
}
export class Warning extends CLZOObject{
WarningOID:number;
ConstraintOID:number;
ConstraintName:string;
ConstraintText:string;
MappedCodeType:string;
MappedCodeTerm:string;
}
export class DrugWarning extends Warning{
Type:string;
ConditionType:string;
DictWarningOID:number;
IdentifyingOID:number;
IdentifyingType:string;
ItemName:string;
OccurInProd:string;
OID:number;
OrganisationID:number;
SeqNumber:number;
DataProviderType:string;
DataProviderID:string;
Source:string;
SourceID:number;
Status:string;
ConflictSource:string;
ConflictText:string;
McVersionNo:string;
}
export class MultiComponent extends CLZOObject{
PreparationStatusCode:string;
PreparationStatus:string;
IsEditable:boolean;
MCIDetails:string;
IsQtyEditable:boolean;
IsQtyUOMEditable:boolean;
IsDisableConflicts:boolean;
Components:ObservableCollection<MultiComponentItem>;
}
export class MultiComponentItem extends CLZOObject{
DrugMultiComponentOID:number;
PrescribableitemListOID:number;
PrescribableitemName:string;
ComponentPresItemListOID:number;
ComponentName:string;
Quantity:string;
QuantityUOM:string;
QuantityUOMOID:number;
IsUpto:boolean;
LorenzoID:string;
ComponentDrugType:string;
ComponentDrugOID:number;
DisplayOrder:number;
IsItemEditable:boolean;
OwnerOrganisationOID:number;
ConflictIcon:string;
UOMDetail:string;
ConfictDetail:string;
QtyDisplay:string;
DrugProperty:string;
IsAddedNew:string;
IsVisited:string;
Conflicts:ObservableCollection<MultiComponentConflicts>;
}
export class MultiComponentConflicts extends CLZOObject{
DrugMultiComponentConflictsOID:number;
Message:string;
TypeCode:string;
Type:string;
SubTypeCode:string;
SubType:string;
Quantity:string;
BehaviourTypeCOde:string;
BehaviourType:string;
}
export class PrescriptionItemBasicInfo extends CLZOObject{
OID:number;
IdentifyingOID:number;
IdentifyingType:string;
Name:string;
PrescriptionOID:number;
PrescriptionItemStatus:string;
Dose:Dose;
StartDate:DateTime;
EndDate:DateTime;
IsPGD:string;
IsSTATDose:string;
IsPRNDose:string;
FrequencyDetails:FrequencyDetails;
IsPresItem1Available:string;
IsPresItem2Available:string;
AdminDetails:PrescriptionItemAdminDetails;
ItemSubType:string;
MCVersionNumber:string;
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
export class ConstraintList extends CLZOObject{
ConstraintName:string;
}
export class ReactiveGroup extends CLZOObject{
ReactiveGroupID:number;
Name:string;
Description:string;
IsCrossReactive:string;
OrganisationOID:number;
Status:string;
VersionNo:string;
MCVersionNo:string;
SourceDataProviderType:string;
SourceDataProviderID:string;
LORENZOID:string;
EffectiveDTTM:DateTime;
ExpiryDTTM:DateTime;
ExpiryReason:string;
ReinstateReason:string;
ReinstateDTTM:DateTime;
Ingredient:ObservableCollection<Ingredient>;
}
export class FormularyGroup extends CLZOObject{
FormularyID:number;
Code:string;
Name:string;
Description:string;
Type:string;
ActiveFrom:DateTime;
InActiveFrom:DateTime;
InActiveTo:DateTime;
OrganisationOID:number;
OrganisationName:string;
SourceDataProviderID:string;
SourceDataProviderType:string;
Version:string;
MedCatVersion:string;
HasDataFilter:string;
ReasnCode:string;
Status:string;
CareActivity:string;
Createdby:string;
ModifiedBy:DateTime;
LastUpdatedBy:string;
ItemFormularyNote:string;
IsCopyFav:string;
PrescriptionItem:ObservableCollection<ConstituentItem>;
FormularyOptionsGridBC:ObservableCollection<FormularyOptionGrid>;
}
export class FormularyOptionGrid{
ItemOId:string;
DrugOId:string;
DrugName:string;
DrugType:string;
PrescriptionItem:string;
HiddenValues:string;
Otherinformation:string;
DisplaySeqNum:string;
GroupKey:string;
MUIFlag:string;
IsDefault:string;
TempID:string;
FVICon:string;
Ordersentencedescription:string;
IsSwap:string;
DoseCalcDetails:string;
sItemtype:string;
IsAccessConstraint:boolean;
}
export class DataFilter extends CLZOObject{
ItemOID:number;
HasItemFilter:string;
ItemColumnName:string;
SPName:string;
TableName:string;
InsertSP:string;
UpdateSP:string;
ItemTableName:string;
DataFilterDetails:ObservableCollection<DataFilterDetails>;
}
export class DataFilterDetails extends CLZOObject{
OID:number;
DataFilterOID:number;
ItemOID:number;
DataFilterName:string;
CareActivityName:string;
CareActivityCode:string;
DTMStatus:string;
HasDataFilter:string;
SourceOID:number;
SourceType:string;
TMSTSCODE:string;
TemplateStatus:string;
OrganisationName:string;
TemplateStatusCode:string;
}
export class SearchFormularyGroup extends CLZOObject{
name:string;
type:string;
Version:string;
MedCatVersion:string;
Item:string;
HO:string;
dateQualifier:string;
fromDate:DateTime;
toDate:DateTime;
SeparatorID:number;
PageLength:number;
NavMode:string;
SepName:string;
Status:string;
StartRow:number;
EndRow:number;
}
export class SearchFormularyDetail extends SearchFormularyGroup{
FormularyOID:number;
}
export class InteractiveGroup extends CLZOObject{
InteractiveGroupID:number;
Name:string;
Description:string;
OrganisationOID:number;
Status:string;
VersionNo:string;
MCVersionNo:string;
SourceDataProviderType:string;
SourceDataProviderID:string;
LORENZOID:string;
EffectiveDTTM:DateTime;
ExpiryDTTM:DateTime;
ExpiryReason:string;
ReinstateReason:string;
ReinstateDTTM:DateTime;
InActiveFrom:DateTime;
InActiveTo:DateTime;
PageNo:number;
PageSize:number;
MAXRows:number;
PageIndex:number;
PresecribeItem:ObservableCollection<PrescribeItemBase>;
InteractionGroup:ObservableCollection<InteractionGroup>;
}
export class InteractionGroup{
InteractiveGroupID:number;
InteractiveGroupName:string;
MessageID:number;
Message:string;
Severity:string;
MessageStyle:string;
Status:string;
OID:number;
LorenzoID:string;
CustomisedBy:string;
CustomisedOn:string;
CustomisedSeverity:string;
CustomisedDateTime:DateTime;
OrganisationOID:number;
OperationalFlag:string;
DrugInteractionOID:number;
}
export class DrugItemDetails extends CLZOObject{
Name:string;
}
export class ItemSearchCriteria extends CLZOObject{
DisplayName:string;
Synonyms:string;
Category:string;
ProductType:string;
ItemSubType:string;
DrugProperty:string;
ProductFormOID:number;
RouteOID:number;
DateQualifier:string;
FromDate:DateTime;
ToDate:DateTime;
CodeType:string;
Version:string;
MCVersion:string;
Term:string;
Ingredient:string;
Status:string;
LorenzoID:string;
SourceID:string;
ParentLorenzoID:string;
Searchpattern:string;
Itemclass:string;
StartRow:number;
EndRow:number;
IsDuplicate:string;
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
export class StatusFlags{
HasWarnings:string;
IsHold:string;
PrintStatus:string;
HasDoseCalculation:string;
IsTechValidate:string;
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
export class RouteofAdmin extends CLZOObject{
RouteOID:number;
RouteName:string;
RouteDesc:string;
SourceDataProviderType:string;
SourceDataProviderID:string;
VersionNo:string;
MedicationCatalogueNo:string;
IsInjectableRoute:string;
IsInfusion:boolean;
EffectiveDate:DateTime;
HOName:string;
OrganisationOID:number;
BaseRouteOID:number;
BaseRouteName:string;
Status:string;
ActiveFrom:DateTime;
ActiveTo:DateTime;
InActiveFrom:DateTime;
InActiveTo:DateTime;
LorenzoID:string;
FBRoute:string;
RouteAssociationOID:number;
RouteIsInjectable:string;
Coding:ObservableCollection<TTOCodification>;
}
export class ConflictSearchCriteria extends CLZOObject{
ConflictText:string;
ConflictType:string;
MCVersionNumber:string;
OrganisationID:number;
Sex:ObservableCollection<string>;
}
export class ConflictDetails extends CLZOObject{
ConflictText:string;
AgeMax:string;
AgeMin:string;
PERODCode:string;
AlwaysShowID:string;
ConflictType:string;
LorenzoID:string;
DisplaySeqNumber:number;
OccurenceInProduct:string;
MCVersionNumber:string;
OID:number;
OrganisationID:number;
Sex:string;
Source:string;
SourceID:string;
Status:string;
SourceDataProviderID:string;
SourceDataProviderType:string;
RelatedConditionExist:number;
RmvRelatedOIDs:string;
RelatedCondition:ObservableCollection<TTOCodification>;
SpecificCondition:ObservableCollection<TTOCodification>;
oWarningCategory:ObservableCollection<ConflictsWarningCategory>;
}
export class ConflictsWarningCategory extends CLZOObject{
WarningCategoryOID:number;
WarningCategoryDesc:string;
}
export class RelatedConditionDetails extends CLZOObject{
Code:string;
CodeTerm:string;
IdentifyingOID:number;
IdentifyingType:string;
}
export class MedicationConflictConfig extends CLZOObject{
DisplayConflicts:string;
OID:number;
IsReadOnly:string;
ModifiedAt:DateTime;
TurnOnDRC:string;
oMedicationConflictConfigData:ObservableCollection<MedConflictConfigData>;
oDRCConfigData:ObservableCollection<DRCConfigData>;
}
export class MedConflictConfigData extends CLZOObject{
OID:number;
ConflictType:string;
ConflictSubType:string;
BehaviourType:string;
TypeColorCode:string;
DisplaySeqNumber:number;
ModifiedAt:DateTime;
WarningCatLZOID:string;
}
export class DRCConfigData extends CLZOObject{
OID:number;
DRCType:string;
DRCTypeDesc:string;
DRCSubType:string;
DRCSubTypeDesc:string;
BehaviourType:string;
BehaviourTypeDesc:string;
IsDisplayDRCConflict:string;
DisplaySeqNumber:number;
IsOpenDRCTab:string;
}
export class ManageCatalogueVersionConfig extends CLZOObject{
OID:number;
PrepVersion:string;
ActiveVersion:string;
PrevactiveVersion:string;
Newversionpreptime:string;
RejectedVersion:string;
LastVersion:string;
DataProviderVersionDTTM:DateTime;
DPVDTTM:DateTime;
oVersionHistory:ObservableCollection<VersionHistory>;
}
export class VersionHistory extends CLZOObject{
Version:string;
MDDSLoadStatus:string;
VersionStatus:string;
GoLiveDTTM:DateTime;
ReactivationDTTM:DateTime;
InactivationDTTM:DateTime;
RejectionDTTM:DateTime;
HO:number;
DataProviderBldDTTM:DateTime;
DataProviderVerDTTM:DateTime;
DPBulletin:string;
DataCutRef:string;
Status:string;
MonthYear:string;
oDuplicateEntry:ObservableCollection<DuplicateEntry>;
}
export class DuplicateEntry{
CareActivty:string;
DuplicateValue:number;
}
export class CLZAddObject extends CLZOObject{
IsRwSelected:boolean;
EditMode:string;
AddlnValues:string;
}
export class IngredientListView extends CLZAddObject{
PageIndex:number;
StartRow:number;
EndRow:number;
cIsDuplicate:string;
LorenzoID:string;
IngredientID:number;
AdminWarning:string;
PrescribeWarning:string;
SName:string;
SType:string;
SStatus:string;
SDateQualifier:string;
DtFromDate:DateTime;
DtToDate:DateTime;
FSepOid:number;
NPageLength:number;
SNavMode:string;
SSepName:string;
SVersion:string;
SMcVersion:string;
BIsBaseIngredient:boolean;
nPageNo:number;
nPageSize:number;
nMAXRows:number;
BIsCrModIngredient:boolean;
IsDuplicate:string;
}
export class FavouriteSearchResults extends CLZOObject{
LFavouriteOID:number;
SFavouriteName:string;
SFavType:string;
NType:number;
SUserName:string;
SMCVersioNo:string;
NPageIndex:number;
NPageLength:number;
SLorenzoID:string;
}
export class PrescribingTeamDetails extends CLZOObject{
McVersionNo:string;
TeamOID:number;
TeamName:string;
TLName:string;
Status:string;
EffectiveDTTM:DateTime;
oMedicationHierarchyDetails:ObservableCollection<MedicationHierarchyDetails>;
}
export class MedicationHierarchyDetails extends CLZOObject{
Name:string;
OID:number;
LorenzoID:string;
}
export class CatDetails extends CLZOObject{
Description:string;
Version:string;
SourceDataProviderType:string;
SourceDataProviderID:string;
LorenzoID:string;
MCVersion:string;
EffectiveDTTM:DateTime;
ExpiryDTTM:DateTime;
DeactiveDTTM:DateTime;
ExpiryReason:string;
ReinstateDTTM:DateTime;
DeactivateReason:string;
ReinstateReason:string;
}
export class PrescribableItemListSFS extends CLZOObject{
ItemText:string;
VersionNo:string;
MCVersionNo:string;
Status:string;
IdentifyingType:string;
MultiComponent:boolean;
PageIndex:number;
PageLength:number;
ApplyFilter:boolean;
PatientOID:number;
ItemType:string;
OrgOIDs:string;
LorenzoID:string;
IsIncludeAM:boolean;
AccessConstraint:boolean;
}
export class PrescriptionGridInfo extends CLZOObject{
ItemOId:number;
DrugOId:number;
DrugName:string;
DrugType:string;
PrescriptionItem:string;
HiddenValues:string;
Otherinformation:string;
DisplaySeqNum:string;
GroupKey:string;
MUIFlag:string;
IsDefault:string;
Ordersentencedescription:string;
ItemSubType:string;
IsSwap:string;
IsCopyFav:string;
DrugFavGrpOId:string;
DrugFavDetOId:string;
DrugLorenzoID:string;
DetailLorenzoID:string;
PresitemlistOID:string;
AdminMethodOID:string;
AdminMethodName:string;
DRCdoseTypeLorenzoID:string;
DRCdoseTypeText:string;
Itemtype:string;
DoseCalcDetails:string;
IsAccessConstraint:boolean;
}
export class DosageForm extends CLZOObject{
DosageFormOid:number;
DosageName:string;
PageNo:number;
PageSize:number;
MAXRows:number;
MCVersion:string;
}
export class DrugSite extends CLZOObject{
SiteOid:number;
SiteName:string;
MCVersion:string;
nPageNo:number;
nPageSize:number;
nMAXRows:number;
}
export class PackageUOM extends CLZOObject{
PackUOMOid:number;
PackUOMName:string;
MCVersionNumber:string;
nPageNo:number;
nPageSize:number;
nMAXRows:number;
}
export class MonographDetails extends CLZOObject{
MonoDesc:string;
ItemName:string;
SourceDataProviderType:string;
MonoContentOID:number;
}
export class PrescriptionItemList extends CLZOObject{
OID:number;
CatalogueItemOID:number;
IdentifyingName:string;
StrengthText:string;
DisplayStrengthTextSeqNo:number;
RowNumber:number;
MCVersionNo:string;
}
export class FrmVwParameter extends CLZOObject{
FormViewerOID:number;
FormViewerName:string;
HOName:string;
OwnerOrganisationOID:number;
Status:string;
InActiveFrom:DateTime;
InActiveTo:DateTime;
EffectiveDTTM:DateTime;
MCVersionNo:string;
FormAttributes:ObservableCollection<FrmVwAttributes>;
}
export class FrmVwAttributes extends CLZOObject{
FrmVwrAttribOID:number;
FrmVwrOID:number;
ATRTPCode:string;
DisplayOrder:number;
ConfigType:string;
IsMandatory:string;
OwnerOrganisationOID:number;
}
export class MngPresForms extends CLZOObject{
MedFormViewerOID:number;
MedFormViewerItemsOID:number;
OwnerOrganisationOID:number;
DOSFMOID:number;
PRETPCode:string;
RouteOID:number;
EffectiveDTTM:DateTime;
APPTOCode:string;
ADDEVCode:string;
ItemSubType:string;
MCVersionNo:string;
LorenzoID:string;
IsUpdateReqd:string;
MFVPresItem:ObservableCollection<MedFormPresItem>;
AttribItem:ObservableCollection<AttributesItem>;
}
export class MedFormPresItem extends CLZOObject{
MedFrmVwrPresItemOID:number;
PrescribableItemListOID:number;
PrescribableItemName:string;
OwnerOrganisationOID:number;
MCVersion:string;
}
export class AttributesItem extends CLZOObject{
MFIOID:number;
RouteName:string;
PRETPCode:string;
DOSFMName:string;
ApplyTo:string;
RTOID:number;
DFOID:number;
EffectiveDt:DateTime;
MCVersion:string;
LorenzoID:string;
}
export class DrugFrequency extends CLZOObject{
ShortName:string;
ItemFrequencyOID:number;
DisplayCode:string;
FrequencyDesc:string;
SourceDataProviderID:string;
SourceDataProviderType:string;
LorenzoID:string;
ParentLorenzoID:string;
VersionNo:string;
MedicationCatalougeNo:string;
EffectiveDate:DateTime;
FrequencyType:string;
FrequencyDurationUOM:string;
Doseperiod:number;
LowPeriod:string;
HighPeriod:string;
LowEvent:number;
HighEvent:number;
IsPRN:boolean;
MapToDrugRound:boolean;
Sun:boolean;
Mon:boolean;
Tue:boolean;
Wed:boolean;
Thu:boolean;
Fri:boolean;
Sat:boolean;
sCustomizedFreq:string;
SortOrder:number;
OrganisationOID:number;
HOName:string;
Status:string;
ActiveFrom:DateTime;
ActiveTo:DateTime;
InActiveFrom:DateTime;
InActiveTo:DateTime;
IsIncludeInDisplay:boolean;
PRN:string;
BaseFrequencyOID:number;
BaseFrequencyName:string;
EventsPerDay:byte;
Customised:string;
IsAllowAdvanceAdmin:boolean;
IsApplicableForDoseCalc:boolean;
Coding:ObservableCollection<TTOCodification>;
ScheduleTime:ObservableCollection<Scheduledetails>;
DaysOfWeek:ObservableCollection<string>;
}
export class ManageActivePeriods extends CLZOObject{
OID:number;
ObjectID:number;
ObjectName:string;
ItemOID:number;
CAName:string;
ActivityType:string;
InActiveFrom:DateTime;
InActiveTo:DateTime;
PerformedByID:number;
PerformedBy:string;
ActionPerformedDt:DateTime;
Reason:string;
Comments:string;
OrganisationOID:number;
IdentifyingOID:number;
IdentifyingType:string;
IsCancelDeactivation:string;
IsCurrent:string;
hdnInActiveFrom:DateTime;
hdnInActiveTo:DateTime;
hdnCancelDeactivation:string;
EffectiveDate:DateTime;
Lorenzoid:string;
MCVersion:string;
IsValueModified:string;
objAlternativeDrugs:ObservableCollection<AlternativeDrugs>;
}
export class AlternativeDrugs extends CLZOObject{
AlternativeIdentifyingOID:number;
AlternativeIdentifyingType:string;
MCVersion:string;
AlternativewIdentifyingName:string;
}
export class DeactivateEntity extends CLZOObject{
ObjectID:number;
CAName:string;
ItemOID:number;
IdentifyingType:string;
InActiveFrom:DateTime;
InActiveTo:DateTime;
LorenzoID:string;
EffectiveDate:DateTime;
ObjectName:string;
MCVersionNumber:string;
}
export class MAPMain extends CLZOObject{
MAPMainEntities:DeactivateEntity;
MAPSubEntitties:ManageActivePeriods;
MAPHistory:ObservableCollection<ManageActivePeriods>;
objAlternativeDrugs:ObservableCollection<AlternativeDrugs>;
}
export class AdminInstructionSFS extends CLZOObject{
AdminInstructionOid:number;
AdminInstructionName:string;
McVersionNumber:string;
nPageNo:number;
nPageSize:number;
nMAXRows:number;
}
export class CReqMsgGetAlternateDetails{
IdentifyingOIDBC:number;
IdentifyingTypeBC:string;
sMCVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetAlternateDetails{
oContextInformation:CContextInformation;
objAlternateDrugItem:ObservableCollection<AlternateDrugItem>;
}
export class CReqMsgGetAssociateDetails{
PresbasicinfoBC:PrescriptionItemBasicInfo;
sMCVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetAssociateDetails{
oContextInformation:CContextInformation;
objAssociateItem:ObservableCollection<PrescribeItem>;
}
export class CReqMsgGetMultiComponentDetails{
PresbasicinfoBC:PrescriptionItemBasicInfo;
sMCVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetMultiComponentDetails{
oContextInformation:CContextInformation;
objMultiComponentItem:ObservableCollection<DrugMultiComponent>;
}
export class CReqMsgGetValidationDetails{
IdentifyingOIDBC:number;
IdentifyingTypeBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetValidationDetails{
oContextInformation:CContextInformation;
ConstraintList:ObservableCollection<ConstraintList>;
}
export class CReqMsgGetProcessingDetails{
IdentifyingOIDBC:number;
IdentifyingTypeBC:string;
ProcessingOIDBC:string;
sMcVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetProcessingDetails{
oContextInformation:CContextInformation;
objProcessingInfo:ObservableCollection<ProcessingInfo>;
}
export class CReqMsgGetPolicyDetails{
IdentifyingOIDBC:number;
IdentifyingTypeBC:string;
sMcVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetPolicyDetails{
oContextInformation:CContextInformation;
objPolicyDetails:ObservableCollection<DrugPolicy>;
}
export class CReqMsgGetAdminMethod{
sMCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetAdminMethod{
oContextInformation:CContextInformation;
objAdminMethod:ObservableCollection<AdminMethod>;
}
export class CReqMsgGetParentPrescriptionItemList{
nPageLengthBC:number;
sMCVersionBC:string;
lnStartRowBC:number;
lnEndRowBC:number;
IsDuplicateBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetParentPrescriptionItemList{
lnRecCount:number;
lnLastPgRecCnt:number;
oContextInformation:CContextInformation;
objPrescribeItemBase:ObservableCollection<PrescribeItemBase>;
}
export class CReqMsgGetChildPrescriptionItemList{
nOIDBC:number;
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetChildPrescriptionItemList{
oContextInformation:CContextInformation;
objPrescribeItemBase:ObservableCollection<PrescribeItemBase>;
}
export class CReqMsgCreateCrossReactiveGroup{
oReactiveGroupBC:ReactiveGroup;
oContextInformation:CContextInformation;
}
export class CResMsgCreateCrossReactiveGroup{
lnReactiveGroup:number;
oContextInformation:CContextInformation;
}
export class CReqMsgModifyCrossReactiveGroup{
lnReactiveOIDBC:number;
oReactiveGroupBC:ReactiveGroup;
oContextInformation:CContextInformation;
}
export class CResMsgModifyCrossReactiveGroup{
lnReactiveGroup:number;
oContextInformation:CContextInformation;
}
export class CReqMsgGetReactiveGroups{
nPageLengthBC:number;
sMCVersionBC:string;
lnStartRowBC:number;
lnEndRowBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetReactiveGroups{
lnRecCount:number;
lnLastPgRecCnt:number;
oContextInformation:CContextInformation;
oReactiveGroup:ObservableCollection<ReactiveGroup>;
}
export class CReqMsgGetReactiveGroupDetail{
lReactiveGroupIdBC:number;
sMCVersionNoBC:string;
sSearchTextBC:string;
nPageIndexBC:number;
nPageSizeBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetReactiveGroupDetail{
nRecordCount:number;
oContextInformation:CContextInformation;
oIngredient:ObservableCollection<Ingredient>;
}
export class CReqMsgGetCrossActItemDetails{
oCrossReactGrpSearchBC:CrossReactGrpSearch;
oContextInformation:CContextInformation;
}
export class CrossReactGrpSearch{
lnCrossactiveOID:number;
sMcVersionNo:string;
nPageLength:number;
lStartRow:number;
lEndRow:number;
sSearchText:string;
}
export class CResMsgGetCrossActItemDetails{
lnRecCount:number;
lnLastPgRecCnt:number;
oContextInformation:CContextInformation;
oIngredient:ObservableCollection<Ingredient>;
}
export class CReqMsgGetCrossRctGroupFilterby{
objReactiveSearchBC:CrossReactiveGroupSearch;
oContextInformation:CContextInformation;
}
export class CrossReactiveGroupSearch{
IngredientOID:string;
RctGrpName:string;
Status:string;
DateQualifier:string;
FromDate:DateTime;
ToDate:DateTime;
GroupType:string;
SeparatorID:number;
PageLength:number;
NavMode:string;
SepName:string;
Version:string;
MCVersion:string;
StartRow:number;
EndRow:number;
IsDuplicate:string;
}
export class CResMsgGetCrossRctGroupFilterby{
lnRecCount:number;
lnLastPgRecCnt:number;
oContextInformation:CContextInformation;
oReactiveGroup:ObservableCollection<ReactiveGroup>;
}
export class CReqMsgCreateFormulary{
oFormularyGroupBC:FormularyGroup;
oDataFilterBC:DataFilter;
oContextInformation:CContextInformation;
}
export class CResMsgCreateFormulary{
lnFormulary:number;
ForCode:string;
oContextInformation:CContextInformation;
}
export class CReqMsgCopyFormulary{
oFormularyGroupBC:FormularyGroup;
oDataFilterBC:DataFilter;
oContextInformation:CContextInformation;
}
export class CResMsgCopyFormulary{
lnFormulary:number;
ForCode:string;
oContextInformation:CContextInformation;
}
export class CReqMsgManageFormulary{
oFormularyGroupBC:FormularyGroup;
oDataFilterBC:DataFilter;
oContextInformation:CContextInformation;
}
export class CResMsgManageFormulary{
lnFormulary:number;
oContextInformation:CContextInformation;
}
export class CReqMsgGetFormularyList{
PageLengthBC:number;
sMCVersionBC:string;
lnStartRowBC:number;
lnEndRowBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetFormularyList{
lnRecCount:number;
lnLastPgRecCnt:number;
oContextInformation:CContextInformation;
oFormularyGroup:ObservableCollection<FormularyGroup>;
}
export class CReqMsgSearchFormularyList{
objSearchFormularyGroupBC:SearchFormularyGroup;
oContextInformation:CContextInformation;
}
export class CResMsgSearchFormularyList{
lnRecCount:number;
lnLastPgRecCnt:number;
oContextInformation:CContextInformation;
oFormularyGroup:ObservableCollection<FormularyGroup>;
}
export class CReqMsgGetFormularyItemDetails{
objSerachFormularyDetailBC:SearchFormularyDetail;
oContextInformation:CContextInformation;
}
export class CResMsgGetFormularyItemDetails{
lnRecCount:number;
lnLastPgRecCnt:number;
oContextInformation:CContextInformation;
oConstituentItem:ObservableCollection<ConstituentItem>;
}
export class CReqMsgGetFormularyDetails{
lnFormularyIdBC:number;
sMcVersionNoBC:string;
sMenucodeBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetFormularyDetails{
oFormularyGroup:FormularyGroup;
oDataFilter:DataFilter;
oContextInformation:CContextInformation;
}
export class CReqMsgGetIsDefaultValues{
lnFormularyOIDBC:number;
sMcVersionNoBC:string;
lnItemIdBC:number;
sItemTypeBC:string;
CareActivityBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetIsDefaultValues{
oContextInformation:CContextInformation;
oProcessingInfo:ObservableCollection<ProcessingInfo>;
}
export class CReqMsgGetFrmlyComboValues{
lnItemIdBC:number;
sItemTypeBC:string;
sMcVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetFrmlyComboValues{
oProcessingInfo:ProcessingInfo;
oContextInformation:CContextInformation;
}
export class CReqMsgCheckDuplicateFormulary{
sNameBC:string;
sMedCatVersionBC:string;
lnOrganisationOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgCheckDuplicateFormulary{
bIsDuplicate:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgChkDupItemlist{
lFrmlyGrpOIDBC:number;
lIdentifyingOidBC:number;
sIdentifyingTypeBC:string;
lHOIDBC:number;
sMCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgChkDupItemlist{
bIsDuplicate:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgChkDupIntractSenGrpItem{
lGroupOIDBC:number;
sItemOIDsBC:string;
GroupTypeBC:string;
sMCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgChkDupIntractSenGrpItem{
bIsDuplicate:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgCheckDuplicateMainFormulary{
lnFormularIDBC:number;
sNameBC:string;
sMedCatVersionBC:string;
lnOrganisationOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgCheckDuplicateMainFormulary{
bIsDuplicate:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgCreateInteractiveGroup{
oInteractiveGroupBC:InteractiveGroup;
oContextInformation:CContextInformation;
}
export class CResMsgCreateInteractiveGroup{
lnInteractiveGroup:number;
oContextInformation:CContextInformation;
}
export class CReqMsgGetInteractiveGroup{
PageLengthBC:number;
sMCVersionBC:string;
lnStartRowBC:number;
lnEndRowBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetInteractiveGroup{
lnRecCount:number;
lnLastPgRecCnt:number;
oContextInformation:CContextInformation;
oInteractiveGroup:ObservableCollection<InteractiveGroup>;
}
export class CReqMsgGetInteractiveGroupDetails{
lnInteractiveOIDBC:number;
sMcVersionNoBC:string;
sSearchTextBC:string;
nPageIndexBC:number;
nPageSizeBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetInteractiveGroupDetails{
nRecordCount:number;
oContextInformation:CContextInformation;
oPrescribeItemBase:ObservableCollection<PrescribeItemBase>;
}
export class CReqMsgGetDrugUnderHierarchy{
lnHierarchyOIDBC:number;
sMcVersionNoBC:string;
iPageIndexBC:number;
iPageSizeBC:number;
sSearchTextBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetDrugUnderHierarchy{
nRecordCount:number;
oContextInformation:CContextInformation;
oDrugItemDetails:ObservableCollection<DrugItemDetails>;
}
export class CReqMsgGetIntractItemDetails{
oIntractionGrpSearchBC:IntractionGrpSearch;
oContextInformation:CContextInformation;
}
export class IntractionGrpSearch{
lnInteractiveOID:number;
sMcVersionNo:string;
nPageLength:number;
lStartRow:number;
lEndRow:number;
sSearchText:string;
}
export class CResMsgGetIntractItemDetails{
lnRecCount:number;
lnLastPgRecCnt:number;
oContextInformation:CContextInformation;
objPrescribeItemBase:ObservableCollection<PrescribeItemBase>;
}
export class CReqMsgGetInteractiveGroupbyName{
objInteractiveGroupBC:InteractiveGroup;
oContextInformation:CContextInformation;
}
export class CResMsgGetInteractiveGroupbyName{
reccount:number;
oContextInformation:CContextInformation;
oInteractiveGroup:ObservableCollection<InteractiveGroup>;
}
export class CReqMsgGetLinkedIntrGrpDetails{
lnInteractiveOIDBC:number;
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetLinkedIntrGrpDetails{
oContextInformation:CContextInformation;
oInteractionGroup:ObservableCollection<InteractionGroup>;
}
export class CReqMsgGetCustomisedIntrGrpDetails{
lnInteractiveOIDBC:number;
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetCustomisedIntrGrpDetails{
oContextInformation:CContextInformation;
oInteractionGroup:ObservableCollection<InteractionGroup>;
}
export class CReqMsgModifyInteractionGroup{
lnInteractiveOIDBC:number;
oInteractiveGroupBC:InteractiveGroup;
oContextInformation:CContextInformation;
}
export class CResMsgModifyInteractionGroup{
lnInteractiveGroup:number;
oContextInformation:CContextInformation;
}
export class CReqMsgGetIntrGroupFilterby{
sIdentifyingtypeBC:string;
sIdentifyingOIDBC:string;
sStatusBC:string;
sDateQualifierBC:string;
sFromDateBC:DateTime;
sToDateBC:DateTime;
sIntrGrpNameBC:string;
PageLengthBC:number;
sVersionNoBC:string;
sMCversionNoBC:string;
lnStartRowBC:number;
lnEndRowBC:number;
IsDuplicateBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetIntrGroupFilterby{
lnRecCount:number;
lnLastPgRecCnt:number;
oContextInformation:CContextInformation;
oInteractiveGroup:ObservableCollection<InteractiveGroup>;
}
export class CReqMsgGetItemSearchCriteriaResults{
objItemSearchCriteriaBC:ItemSearchCriteria;
nPageLengthBC:number;
lnStartRowBC:number;
lnEndRowBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetItemSearchCriteriaResults{
lnRecCount:number;
lnLastPgRecCnt:number;
oContextInformation:CContextInformation;
objPrescribableItems:ObservableCollection<PrescribeItemBase>;
}
export class CReqMsgGetPolicyInfo{
oContextInformation:CContextInformation;
}
export class CResMsgGetPolicyInfo{
oContextInformation:CContextInformation;
PolicyItem:ObservableCollection<DrugPolicy>;
}
export class CReqMsgManageFavourites{
UserOIDBC:number;
oContextInformation:CContextInformation;
oArrFavouriteItemBC:ObservableCollection<FavouriteItem>;
oFavouriteAssociationBC:ObservableCollection<FavouriteAssociation>;
}
export class FavouriteAssociation{
OID:number;
IdentifyingOID:number;
IdentifyingName:string;
FavouriteName:string;
IdentifyingType:string;
DrugFavouriteGroupLorenzoID:string;
CreatedBy:number;
CreatedAt:DateTime;
ModifiedBy:number;
ModifiedAt:DateTime;
Status:string;
SourceOID:string;
SourceType:string;
OwnerOrganisationOID:number;
Flag:string;
}
export class CResMsgManageFavourites{
lnFavouriteItem:number;
oContextInformation:CContextInformation;
}
export class CReqMsgGetFavouritesParentGroup{
UserOIdBC:number;
sMCVerNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetFavouritesParentGroup{
TeamOIDs:string;
oContextInformation:CContextInformation;
oArrFavouriteItem:ObservableCollection<FavouriteItem>;
}
export class CReqMsgGetFavouritesChildGroup{
ParentOIdBC:number;
UserOIdBC:number;
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetFavouritesChildGroup{
oContextInformation:CContextInformation;
oArrFavouriteItem:ObservableCollection<FavouriteItem>;
}
export class CReqMsgGetFavouritesGroupItems{
FavGroupOIdBC:number;
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetFavouritesGroupItems{
oFavouriteItem:FavouriteItem;
oContextInformation:CContextInformation;
}
export class CReqMsgGetFavouritesDrugItem{
IdentifyingOIDBC:number;
IdentifyingTypeBC:string;
FavOIdBC:number;
MVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetFavouritesDrugItem{
oContextInformation:CContextInformation;
oPrescriptionItemDetails:ObservableCollection<PrescriptionItemDetails>;
}
export class CReqMsgGetFavAssociation{
OrganisationOIDBC:number;
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetFavAssociation{
oContextInformation:CContextInformation;
oFavouriteAssociation:ObservableCollection<FavouriteAssociation>;
}
export class CReqMsgManageUserFavourites{
UserOIDBC:number;
oContextInformation:CContextInformation;
oArrFavouriteItemBC:ObservableCollection<FavouriteItem>;
}
export class CResMsgManageUserFavourites{
lnFavouriteItem:number;
oContextInformation:CContextInformation;
}
export class CReqMsgGetUserFavouritesParentGroup{
UserOIdBC:number;
sMCVerNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetUserFavouritesParentGroup{
TeamOIDs:string;
oContextInformation:CContextInformation;
oArrFavouriteItem:ObservableCollection<FavouriteItem>;
}
export class CReqMsgModifyRoute{
routeBC:RouteofAdmin;
oContextInformation:CContextInformation;
}
export class CResMsgModifyRoute{
oContextInformation:CContextInformation;
}
export class CReqMsgGetRouteByOID{
lnRouteOIDBC:number;
sMCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetRouteByOID{
objRoute:RouteofAdmin;
oContextInformation:CContextInformation;
}
export class CReqMsgGetRoutes{
nPageLengthBC:number;
sMCVersionBC:string;
lnStartRowBC:number;
lnEndRowBC:number;
IsDuplicateBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetRoutes{
lnRecCount:number;
lnLastPgRecCnt:number;
oContextInformation:CContextInformation;
objRoute:ObservableCollection<RouteofAdmin>;
}
export class CReqMsgCheckRouteIsLinked{
lnRouteOIDBC:number;
sMCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgCheckRouteIsLinked{
bIsLinked:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgGetConflictSearchResults{
objConflictSearchCriteriaBC:ConflictSearchCriteria;
nPageIndexBC:number;
nPageLengthBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetConflictSearchResults{
lnRecCount:number;
oContextInformation:CContextInformation;
objConflictDetails:ObservableCollection<ConflictDetails>;
}
export class CReqMsgManageConflicts{
ModeBC:string;
objConflictDetailsBC:ConflictDetails;
oContextInformation:CContextInformation;
}
export class CResMsgManageConflicts{
lnConflictOID:number;
oContextInformation:CContextInformation;
}
export class CReqMsgChkConflictsAssociation{
lnConflictOIDBC:number;
sConflictTypeBC:string;
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgChkConflictsAssociation{
oContextInformation:CContextInformation;
sPrescribableItemArr:ObservableCollection<string>;
}
export class CReqMsgDuplicateConflictCheck{
objConflictDetailsBC:ConflictDetails;
oContextInformation:CContextInformation;
}
export class CResMsgDuplicateConflictCheck{
blnDuplicate:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgGetConflictDetailsByOID{
ConflictOIDBC:number;
sConflictTypeBC:string;
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetConflictDetailsByOID{
lnRecCount:number;
oContextInformation:CContextInformation;
objConflictDetails:ObservableCollection<ConflictDetails>;
}
export class CReqMsgGetConflictsByItemOID{
lnIdentifyingOIDBC:number;
sIdentifyingTypeBC:string;
sCondtionTypeBC:string;
MCVersionBC:string;
nPageIndexBC:number;
nPageLengthBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetConflictsByItemOID{
lnRecCount:number;
oContextInformation:CContextInformation;
objConflictDetails:ObservableCollection<ConflictDetails>;
}
export class CReqMsgGetContraIndicationByOID{
lnIdentifyingOIDBC:number;
sIdentifyingTypeBC:string;
sMcversionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetContraIndicationByOID{
RecCount:number;
oContextInformation:CContextInformation;
objContraIndicative:ObservableCollection<DrugContraIndicative>;
}
export class CReqMsgGetPrecautionByOID{
lnIdentifyingOIDBC:number;
sIdentifyingTypeBC:string;
sMcVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetPrecautionByOID{
RecCount:number;
oContextInformation:CContextInformation;
objDrugPrecaution:ObservableCollection<DrugPrecaution>;
}
export class CReqMsgGetWarningByOID{
lnIdentifyingOIDBC:number;
sIdentifyingTypeBC:string;
sMcversionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetWarningByOID{
RecCount:number;
oContextInformation:CContextInformation;
objDrugWarning:ObservableCollection<DrugWarning>;
}
export class CReqMsgViewRelatedConditionDetails{
lnIdentifyingOIDBC:number;
sIdentifyingTypeBC:string;
nPageIndexBC:number;
nPageLengthBC:number;
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgViewRelatedConditionDetails{
lnRecCount:number;
oContextInformation:CContextInformation;
objRelatedConditions:ObservableCollection<RelatedConditionDetails>;
}
export class CReqMsgGetPrsItmOIDbyCatitmOid{
lCatalogueItemOIDBC:number;
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetPrsItmOIDbyCatitmOid{
lPresItemOID:number;
oContextInformation:CContextInformation;
}
export class CReqMsgManageConflictconfiguration{
oMedicationConflictConfigBC:MedicationConflictConfig;
oContextInformation:CContextInformation;
}
export class CResMsgManageConflictconfiguration{
oContextInformation:CContextInformation;
}
export class CReqMsgGetMedicationConfilictConfig{
IsMainAppConflictsBC:string;
McVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetMedicationConfilictConfig{
oMedicationConflictConfig:MedicationConflictConfig;
oContextInformation:CContextInformation;
}
export class CReqMsgGetManageCatalogueconfiguration{
oContextInformation:CContextInformation;
}
export class CResMsgGetManageCatalogueconfiguration{
oMCVC:ManageCatalogueVersionConfig;
oContextInformation:CContextInformation;
}
export class CReqMsgGetBulletinDetail{
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetBulletinDetail{
oBulletin:ObservableCollection<byte>;
oContextInformation:CContextInformation;
}
export class CReqMsgGetVerDuplicate{
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetVerDuplicate{
oContextInformation:CContextInformation;
oDuplicateEntry:ObservableCollection<DuplicateEntry>;
}
export class CReqMsgGetVerConfigHistory{
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetVerConfigHistory{
oMCVC:ManageCatalogueVersionConfig;
oContextInformation:CContextInformation;
}
export class CReqMsgManageCatalogueconfiguration{
objVersionConfigBC:ManageCatalogueVersionConfig;
oContextInformation:CContextInformation;
}
export class CResMsgManageCatalogueconfiguration{
lnMedCatalogueVersionConfig:number;
oContextInformation:CContextInformation;
}
export class CReqMsgGetChkConfltCatConfigLnkEnable{
HOBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetChkConfltCatConfigLnkEnable{
oConfig:string;
oContextInformation:CContextInformation;
}
export class CReqMsgChkYearAndMonthDataLoad{
MonthBC:number;
YearBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgChkYearAndMonthDataLoad{
oMCVersion:string;
oContextInformation:CContextInformation;
}
export class CReqMsgCheckMonthlyLoadStatus{
sActiveVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgCheckMonthlyLoadStatus{
sStatus:string;
oContextInformation:CContextInformation;
}
export class CReqMsgGetFlryProcDoseDetails{
PresItemDetOIDBC:number;
sMCVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetFlryProcDoseDetails{
oContextInformation:CContextInformation;
DoseDetails:ObservableCollection<DoseDetails>;
}
export class CReqMsgGetPresItemDetailByOID{
OIDBC:number;
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetPresItemDetailByOID{
ProcessingInfo:ProcessingInfo;
oContextInformation:CContextInformation;
}
export class CReqMsgIsDeactiveItem{
lnPItemDetailOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgIsDeactiveItem{
sIsDeactivate:string;
oContextInformation:CContextInformation;
}
export class CReqMsgGetSysDrugProperty{
GroupOIDBC:number;
ItemOIDBC:number;
ItemTypeBC:string;
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetSysDrugProperty{
oDrugPropertyValue:DrugPropertyValue;
oContextInformation:CContextInformation;
}
export class DrugPropertyValue{
FormularyNote:string;
DrugProperty:ObservableCollection<DrugProperty>;
}
export class CReqMsgCreateIngredient{
oIngredientBC:Ingredient;
oContextInformation:CContextInformation;
}
export class CResMsgCreateIngredient{
lnIngredient:number;
oContextInformation:CContextInformation;
}
export class CReqMsgManageIngredient{
oIngredientBC:Ingredient;
oContextInformation:CContextInformation;
}
export class CResMsgManageIngredient{
lnIngredient:number;
oContextInformation:CContextInformation;
}
export class CReqMsgGetIngredient{
objIngredientListViewBC:IngredientListView;
oContextInformation:CContextInformation;
}
export class CResMsgGetIngredient{
lnRecCount:number;
lnLastPgRecCnt:number;
oContextInformation:CContextInformation;
oIngredient:ObservableCollection<Ingredient>;
}
export class CReqMsgCheckIngredientIsLinked{
lnIngredientOIDBC:number;
sMcVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgCheckIngredientIsLinked{
bIsLinked:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgSearchIngredient{
objIngredientListViewBC:IngredientListView;
oContextInformation:CContextInformation;
}
export class CResMsgSearchIngredient{
lnRecCount:number;
lnLastPgRecCnt:number;
oContextInformation:CContextInformation;
oIngredient:ObservableCollection<Ingredient>;
}
export class CReqMsgSearchIngredientSFS{
objIngredientListViewBC:IngredientListView;
oContextInformation:CContextInformation;
}
export class CResMsgSearchIngredientSFS{
reccount:number;
oContextInformation:CContextInformation;
oIngredient:ObservableCollection<IngredientListView>;
}
export class CReqMsgGetFavouriteSearchResults{
objReqFavouriteSearchResultsBC:FavouriteSearchResults;
oContextInformation:CContextInformation;
}
export class CResMsgGetFavouriteSearchResults{
reccount:number;
oContextInformation:CContextInformation;
objResFavouriteSearchResults:ObservableCollection<FavouriteSearchResults>;
}
export class CReqMsgGetHierarchy{
lnCategoryIDBC:number;
sMCVersionBC:string;
sSearchTextBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetHierarchy{
oContextInformation:CContextInformation;
oDrugCategory:ObservableCollection<DrugCategory>;
}
export class CReqMsgGetLeafNodes{
lnCategoryIDBC:number;
sMCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetLeafNodes{
oContextInformation:CContextInformation;
oDrugLeafNodes:ObservableCollection<DrugCategory>;
}
export class CReqMsgGetPrescribingTeamsAndMedHierarchy{
lnTeamOIDBCBC:number;
sMCVersionBC:string;
sTeamTypeBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetPrescribingTeamsAndMedHierarchy{
oContextInformation:CContextInformation;
oPrescribingTeamDetails:ObservableCollection<PrescribingTeamDetails>;
}
export class CReqMsgSubmitMedMapHierarchy{
oContextInformation:CContextInformation;
oPrescribingTeamDetailsBC:ObservableCollection<PrescribingTeamDetails>;
}
export class CResMsgSubmitMedMapHierarchy{
oContextInformation:CContextInformation;
}
export class CReqMsgGetHierarchyDup{
sMCVersionBC:string;
IsDuplicateBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetHierarchyDup{
oContextInformation:CContextInformation;
oDrugCategory:ObservableCollection<DrugCategory>;
}
export class CReqMsgCheckItemHrchyAssociation{
lnCategoryIDBC:number;
sMcVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgCheckItemHrchyAssociation{
bExists:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgCreateHierarchy{
oDrugCategoryBC:DrugCategory;
oContextInformation:CContextInformation;
}
export class CResMsgCreateHierarchy{
lnHierarchy:number;
oContextInformation:CContextInformation;
}
export class CReqMsgManageHierarchy{
oDrugCategoryBC:DrugCategory;
oContextInformation:CContextInformation;
}
export class CResMsgManageHierarchy{
oContextInformation:CContextInformation;
}
export class CReqMsgGetDrugCategoryDetails{
IdentifyingOIDBC:number;
sMCVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetDrugCategoryDetails{
oContextInformation:CContextInformation;
oCatDetails:ObservableCollection<CatDetails>;
}
export class CReqMsgGetMedication{
IdentifyingOIDBC:number;
IdentifyingTypeBC:string;
sMcversionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetMedication{
oContextInformation:CContextInformation;
objCodification:ObservableCollection<TTOCodification>;
}
export class CReqMsgGetPrescribableItemListSFS{
objPrescribableItemSFSBC:PrescribableItemListSFS;
oContextInformation:CContextInformation;
}
export class CResMsgGetPrescribableItemListSFS{
reccount:number;
oContextInformation:CContextInformation;
objPrescribeItemBase:ObservableCollection<PrescribeItemBase>;
}
export class CReqMsgCreatePrescibableItem{
oDataFilterBC:DataFilter;
oContextInformation:CContextInformation;
PrescribeItemDetailsBC:ObservableCollection<PrescribeItemDetails>;
oPresGridBC:ObservableCollection<PrescriptionGridInfo>;
}
export class CResMsgCreatePrescibableItem{
prescribeitemOIDs:string;
oContextInformation:CContextInformation;
}
export class CReqMsgModifyPrescribableItem{
oDataFilterBC:DataFilter;
oContextInformation:CContextInformation;
PrescribeItemDetailsBC:ObservableCollection<PrescribeItemDetails>;
oPresGridBC:ObservableCollection<PrescriptionGridInfo>;
}
export class CResMsgModifyPrescribableItem{
prescribeitemOIDs:string;
oContextInformation:CContextInformation;
}
export class CReqMsgGetRoute{
RouteTextBC:string;
MCVersionNumberBC:string;
SeperatorOIDBC:number;
PageLengthBC:number;
NavigationModeBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetRoute{
reccount:number;
oContextInformation:CContextInformation;
objRoute:ObservableCollection<Route>;
}
export class CReqMsgGetRouteSFS{
objCurrentRouteBC:Route;
sIsBaseRtBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetRouteSFS{
reccount:number;
oContextInformation:CContextInformation;
objRoute:ObservableCollection<Route>;
}
export class CReqMsgGetDosageForm{
objDosageFormBC:DosageForm;
oContextInformation:CContextInformation;
}
export class CResMsgGetDosageForm{
oContextInformation:CContextInformation;
objDosageFormArray:ObservableCollection<DosageForm>;
}
export class CReqMsgGetSite{
objSiteFormBC:DrugSite;
oContextInformation:CContextInformation;
}
export class CResMsgGetSite{
oContextInformation:CContextInformation;
objSiteFormArray:ObservableCollection<DrugSite>;
}
export class CReqMsgGetForm{
MCVersionNoBC:string;
isSolidDrugsBC:boolean;
oContextInformation:CContextInformation;
}
export class CResMsgGetForm{
oContextInformation:CContextInformation;
objForm:ObservableCollection<Form>;
}
export class CReqMsgGetAllUOM{
sMCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetAllUOM{
oContextInformation:CContextInformation;
objUOM:ObservableCollection<UOM>;
}
export class CReqMsgGetAllPackageUOM{
oContextInformation:CContextInformation;
}
export class CResMsgGetAllPackageUOM{
oContextInformation:CContextInformation;
objUOM:ObservableCollection<UOM>;
}
export class CReqMsgGetAllPackageUOMSFS{
objPackUOMBC:PackageUOM;
oContextInformation:CContextInformation;
}
export class CResMsgGetAllPackageUOMSFS{
oContextInformation:CContextInformation;
objPackUOMArray:ObservableCollection<PackageUOM>;
}
export class CReqMsgGetAllLegalCategory{
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetAllLegalCategory{
oContextInformation:CContextInformation;
objLegalCategory:ObservableCollection<LegalCategory>;
}
export class CReqMsgGetDoseUOM{
oPrescribeItemSetItemBC:PrescribeItemSetItem;
oContextInformation:CContextInformation;
}
export class PrescribeItemSetItem{
IdentifyingOID:string;
IdentifyingType:string;
SetName:string;
SetID:string;
SetOID:string;
IsPrimary:string;
ActiveFrom:DateTime;
PrescribeItemID:string;
IdentifyingName:string;
PrescriptionitemID:string;
IdentifyingUOMType:string;
MCVersion:string;
}
export class CResMsgGetDoseUOM{
oContextInformation:CContextInformation;
objUOM:ObservableCollection<UOM>;
}
export class CReqMsgGetFrequency{
sMcVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetFrequency{
oContextInformation:CContextInformation;
objFrequency:ObservableCollection<Frequency>;
}
export class CReqMsgGetManufacturers{
ManufacturerTextBC:string;
MCVersionNumberBC:string;
SeperatorOIDBC:number;
PageLengthBC:number;
NavigationModeBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetManufacturers{
reccount:number;
oContextInformation:CContextInformation;
objManufacturer:ObservableCollection<Manufacturer>;
}
export class CReqMsgGetBasicDetails{
nIdentifyingOIDBC:number;
sIdentifyingTypeBC:string;
sMCVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetBasicDetails{
objPrescribeDetails:PrescribeItemDetails;
oContextInformation:CContextInformation;
}
export class CReqMsgHOCGetPresItemDetails{
IdentifyingOIDBC:number;
IdentifyingTypeBC:string;
PageBC:string;
sMcVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgHOCGetPresItemDetails{
oContextInformation:CContextInformation;
objPrescribeItemDetails:ObservableCollection<PrescribeItemDetails>;
}
export class CReqMsgGetDataFilterDetails{
lnItemOIDBC:number;
sMcVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetDataFilterDetails{
sCAName:string;
oContextInformation:CContextInformation;
}
export class CReqMsgIsGroupDetailsExists{
lnGroupOIDBC:number;
sMCVersionBC:string;
sCANameBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgIsGroupDetailsExists{
bItemExists:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgManageMonograph{
objMonoInfoBC:MonographInformation;
sMCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgManageMonograph{
MonoInfoOID:number;
MonoLorenzoID:string;
oContextInformation:CContextInformation;
}
export class CReqMsgGetMonographContent{
lnMonoOIDBC:number;
sMCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetMonographContent{
objContent:MonographInformation;
oContextInformation:CContextInformation;
}
export class CReqMsgGetDrugXMLInfo{
lnMonoOIDBC:number;
sMCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetDrugXMLInfo{
sXMLData:string;
oContextInformation:CContextInformation;
}
export class CReqMsgGetMonographDetails{
IdentifyingOIDBC:number;
IdentifyingTypeBC:string;
sMCVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetMonographDetails{
oContextInformation:CContextInformation;
objMonoDetails:ObservableCollection<MonographDetails>;
}
export class CReqMsgGetStrengthOrderDetails{
objReqPresItemListBC:PrescriptionItemList;
oContextInformation:CContextInformation;
}
export class CResMsgGetStrengthOrderDetails{
oContextInformation:CContextInformation;
objResPresItemList:ObservableCollection<PrescriptionItemList>;
}
export class CReqMsgManagestrengthorder{
oContextInformation:CContextInformation;
objPresItemListBC:ObservableCollection<PrescriptionItemList>;
}
export class CResMsgManagestrengthorder{
oContextInformation:CContextInformation;
}
export class CReqMsgGetConflictWarningCategory{
sMcversionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetConflictWarningCategory{
oContextInformation:CContextInformation;
objConflictsWarningCategory:ObservableCollection<ConflictsWarningCategory>;
}
export class CReqMsgGetUserFavouritesChildGroup{
ParentOIdBC:number;
UserOIdBC:number;
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetUserFavouritesChildGroup{
oContextInformation:CContextInformation;
oArrFavouriteItem:ObservableCollection<FavouriteItem>;
}
export class CReqMsgGetUserFavouritesGroupItems{
FavGroupOIdBC:number;
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetUserFavouritesGroupItems{
oFavouriteItem:FavouriteItem;
oContextInformation:CContextInformation;
}
export class CReqMsgGetProcessingItemDetails{
IdentifyingOIDBC:number;
IdentifyingTypeBC:string;
sMcVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetProcessingItemDetails{
oContextInformation:CContextInformation;
ProcessingInformation:ObservableCollection<ProcessingInfo>;
}
export class CReqMsgGetFavouritesSearch{
UserOIdBC:number;
SusrOIDBC:string;
sNameBC:string;
statusBC:string;
dfromdateBC:DateTime;
dTodateBC:DateTime;
sHOIDBC:string;
sItemOIDSBC:string;
sDTQUALIFIERBC:string;
sverNoBC:string;
sMCVerNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetFavouritesSearch{
oContextInformation:CContextInformation;
oArrFavouriteItem:ObservableCollection<FavouriteItem>;
}
export class CReqMsgGetDrugSite{
oContextInformation:CContextInformation;
}
export class CResMsgGetDrugSite{
oContextInformation:CContextInformation;
objDrugSite:ObservableCollection<DrugSite>;
}
export class CReqMsgGetPrsItemDetails{
IdentifyingOIDBC:number;
IdentifyingTypeBC:string;
sMcversionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetPrsItemDetails{
objPrescribeItemDetails:PrescribeItemDetails;
oContextInformation:CContextInformation;
}
export class CReqMsgGetPresItemModifyDetails{
IdentifyingOIDBC:number;
IdentifyingTypeBC:string;
sMcversionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetPresItemModifyDetails{
oDataFilter:DataFilter;
oContextInformation:CContextInformation;
objPrescribeItemDetails:ObservableCollection<PrescribeItemDetails>;
}
export class CReqMsgGetSteppedVariableDoseDetails{
PrescribableItemDetailOIDBC:number;
sMcversionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetSteppedVariableDoseDetails{
oContextInformation:CContextInformation;
DoseDetails:ObservableCollection<DoseDetails>;
}
export class CReqMsgNotifyNewversion{
oNotifyVersionDetailsBC:CNotifyVersion;
oContextInformation:CContextInformation;
}
export class CNotifyVersion{
objNotifyNewVersion:CNotifyNewVersion;
objCNotifyObjects:CNotifyObjects;
}
export class CNotifyNewVersion{
sNewcatalogueVersion:string;
sActivecatalogueVersion:string;
sNewVerPrepTime:string;
luserOID:number;
}
export class CNotifyObjects{
sObjectType:string;
sObjectName:string;
lObjectsOID:number;
luserOID:number;
}
export class CResMsgNotifyNewversion{
oContextInformation:CContextInformation;
}
export class CReqMsgValiadteSentVersion{
oNotifyVersionDetailBC:CNotifyNewVersion;
oContextInformation:CContextInformation;
}
export class CResMsgValiadteSentVersion{
oContextInformation:CContextInformation;
oNotifyVersionDetails:ObservableCollection<CNotifyNewVersion>;
}
export class CReqMsgGetStationaryItem{
oContextInformation:CContextInformation;
}
export class CResMsgGetStationaryItem{
oContextInformation:CContextInformation;
objStationaryItem:ObservableCollection<Stationary>;
}
export class CReqMsgGetStationaryItems{
organisationoidBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetStationaryItems{
oContextInformation:CContextInformation;
objStationaryItem:ObservableCollection<Stationary>;
}
export class CReqMsglnCheckExistPresItem{
objPrescribeItemDetailsBC:PrescribeItemDetails;
oContextInformation:CContextInformation;
}
export class CResMsglnCheckExistPresItem{
oContextInformation:CContextInformation;
}
export class CReqMsglnCheckExistDrugFavourites{
sNameBC:string;
sParentGROUPOIDBC:string;
sMCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsglnCheckExistDrugFavourites{
lnResultout:number;
oContextInformation:CContextInformation;
}
export class CReqMsgCreateFormViewParameters{
oFrmViewParameterBC:FrmVwParameter;
oContextInformation:CContextInformation;
}
export class CResMsgCreateFormViewParameters{
lnViewParam:number;
oContextInformation:CContextInformation;
}
export class CReqMsgModifyFormViewParameters{
oFrwViewParameterBC:FrmVwParameter;
oContextInformation:CContextInformation;
}
export class CResMsgModifyFormViewParameters{
lnViewParam:number;
oContextInformation:CContextInformation;
}
export class CReqMsgSelectFormViewParameters{
nPageIndexBC:number;
nPageSizeBC:number;
sMCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgSelectFormViewParameters{
nRecordCount:number;
oContextInformation:CContextInformation;
oMedFormView:ObservableCollection<FrmVwParameter>;
}
export class CReqMsgGetMedFormDetailsByOID{
lnMedFormOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetMedFormDetailsByOID{
oFrmViewParameter:FrmVwParameter;
oContextInformation:CContextInformation;
}
export class CReqMsgGetFrmVwrAttributes{
lnMedFormOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetFrmVwrAttributes{
oFrmVwr:FrmVwParameter;
oContextInformation:CContextInformation;
}
export class CReqMsgGetAssociatedAttributes{
lnMedFormOIDBC:number;
sMCVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetAssociatedAttributes{
oMngPresFrm:MngPresForms;
oContextInformation:CContextInformation;
}
export class CReqMsgGetPresItems{
lnMedFormItemOIDBC:number;
sMCVersionNoBC:string;
nPageIndexBC:number;
nPageSizeBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetPresItems{
nRecordCount:number;
oContextInformation:CContextInformation;
oPresItem:ObservableCollection<MedFormPresItem>;
}
export class CReqMsgCheckItemExists{
lnMedFormVwrOIDBC:number;
sMcversionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgCheckItemExists{
nRecordCount:number;
oContextInformation:CContextInformation;
}
export class CReqMsgGetFrequencies{
nPageLengthBC:number;
sMCVersionBC:string;
lnStartRowBC:number;
lnEndRowBC:number;
IsDuplicateBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetFrequencies{
lnRecCount:number;
lnLastPgRecCnt:number;
oContextInformation:CContextInformation;
objFrequency:ObservableCollection<DrugFrequency>;
}
export class CReqMsgGetFrequencyByOID{
lnFrequencyOIDBC:number;
sMcVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetFrequencyByOID{
objFrequency:DrugFrequency;
oContextInformation:CContextInformation;
}
export class CReqMsgGetBaseFrequencies{
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetBaseFrequencies{
oContextInformation:CContextInformation;
BaseFrequencies:ObservableCollection<Frequency>;
}
export class CReqMsgCheckFrequencyIsLinked{
lnFrequencyOIDBC:number;
sMcVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgCheckFrequencyIsLinked{
bIsLinked:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgChkFreqCustomised{
sLorenzoIDBC:string;
sMCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgChkFreqCustomised{
bIsCustomised:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgGetMedicationCode{
IdentifyingTypeBC:string;
IdentifyingOIDBC:number;
sMcversionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetMedicationCode{
oContextInformation:CContextInformation;
objCodification:ObservableCollection<TTOCodification>;
}
export class CReqMsgCreateFrequency{
oFrequencyBC:DrugFrequency;
oContextInformation:CContextInformation;
}
export class CResMsgCreateFrequency{
oContextInformation:CContextInformation;
}
export class CReqMsgModifyFrequency{
oFrequencyBC:DrugFrequency;
oContextInformation:CContextInformation;
}
export class CResMsgModifyFrequency{
oContextInformation:CContextInformation;
}
export class CReqMsgGetFormNames{
lnOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetFormNames{
sFormName:string;
oContextInformation:CContextInformation;
}
export class CReqMsgManagePrescriptionForms{
oMngPresFormsBC:MngPresForms;
oContextInformation:CContextInformation;
}
export class CResMsgManagePrescriptionForms{
oContextInformation:CContextInformation;
}
export class CReqMsgCheckValidDate{
lnFormOidBC:number;
dtmMedFormBC:DateTime;
oContextInformation:CContextInformation;
}
export class CResMsgCheckValidDate{
bIsValidDate:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgGetDoseDetails{
PresbasicinfoBC:PrescriptionItemBasicInfo;
oContextInformation:CContextInformation;
}
export class CResMsgGetDoseDetails{
doseDetail:Dose;
oContextInformation:CContextInformation;
}
export class CReqMsgIngManageActivePeriods{
oContextInformation:CContextInformation;
oManageActivePeriodsBC:ObservableCollection<ManageActivePeriods>;
}
export class CResMsgIngManageActivePeriods{
lnActivePeriods:number;
oContextInformation:CContextInformation;
}
export class CReqMsgHiManageActivePeriods{
oContextInformation:CContextInformation;
oManageActivePeriodsBC:ObservableCollection<ManageActivePeriods>;
}
export class CResMsgHiManageActivePeriods{
lnActivePeriods:number;
oContextInformation:CContextInformation;
}
export class CReqMsgPreManageActivePeriods{
oContextInformation:CContextInformation;
oManageActivePeriodsBC:ObservableCollection<ManageActivePeriods>;
}
export class CResMsgPreManageActivePeriods{
lnActivePeriods:number;
oContextInformation:CContextInformation;
}
export class CReqMsgForManageActivePeriods{
oContextInformation:CContextInformation;
oManageActivePeriodsBC:ObservableCollection<ManageActivePeriods>;
}
export class CResMsgForManageActivePeriods{
lnActivePeriods:number;
oContextInformation:CContextInformation;
}
export class CReqMsgIntManageActivePeriods{
oContextInformation:CContextInformation;
oManageActivePeriodsBC:ObservableCollection<ManageActivePeriods>;
}
export class CResMsgIntManageActivePeriods{
lnActivePeriods:number;
oContextInformation:CContextInformation;
}
export class CReqMsgSenManageActivePeriods{
oContextInformation:CContextInformation;
oManageActivePeriodsBC:ObservableCollection<ManageActivePeriods>;
}
export class CResMsgSenManageActivePeriods{
lnActivePeriods:number;
oContextInformation:CContextInformation;
}
export class CReqMsgMedManageActivePeriods{
oContextInformation:CContextInformation;
oManageActivePeriodsBC:ObservableCollection<ManageActivePeriods>;
}
export class CResMsgMedManageActivePeriods{
lnActivePeriods:number;
oContextInformation:CContextInformation;
}
export class CReqMsgFvpManageActivePeriods{
oContextInformation:CContextInformation;
oManageActivePeriodsBC:ObservableCollection<ManageActivePeriods>;
}
export class CResMsgFvpManageActivePeriods{
lnActivePeriods:number;
oContextInformation:CContextInformation;
}
export class CReqMsgItmFreqManageActivePeriods{
oContextInformation:CContextInformation;
oManageActivePeriodsBC:ObservableCollection<ManageActivePeriods>;
}
export class CResMsgItmFreqManageActivePeriods{
lnActivePeriods:number;
oContextInformation:CContextInformation;
}
export class CReqMsgROAManageActivePeriods{
oContextInformation:CContextInformation;
oManageActivePeriodsBC:ObservableCollection<ManageActivePeriods>;
}
export class CResMsgROAManageActivePeriods{
lnActivePeriods:number;
oContextInformation:CContextInformation;
}
export class CReqMsgGetIngredientByOID{
oDeativeEntityBC:DeactivateEntity;
oContextInformation:CContextInformation;
}
export class CResMsgGetIngredientByOID{
oManageActivePeriodMain:MAPMain;
oContextInformation:CContextInformation;
}
export class CReqMsgGetInteractionGrpByOID{
oDeativeEntityBC:DeactivateEntity;
oContextInformation:CContextInformation;
}
export class CResMsgGetInteractionGrpByOID{
oManageActivePeriodMain:MAPMain;
oContextInformation:CContextInformation;
}
export class CReqMsgGetSensitivityGrpByOID{
oDeativeEntityBC:DeactivateEntity;
oContextInformation:CContextInformation;
}
export class CResMsgGetSensitivityGrpByOID{
oManageActivePeriodMain:MAPMain;
oContextInformation:CContextInformation;
}
export class CReqMsgGetHierarchyByOID{
oDeativeEntityBC:DeactivateEntity;
oContextInformation:CContextInformation;
}
export class CResMsgGetHierarchyByOID{
oManageActivePeriodMain:MAPMain;
oContextInformation:CContextInformation;
}
export class CReqMsgGetPrescribableItemByOID{
oDeativeEntityBC:DeactivateEntity;
oContextInformation:CContextInformation;
}
export class CResMsgGetPrescribableItemByOID{
oManageActivePeriodMain:MAPMain;
oContextInformation:CContextInformation;
}
export class CReqMsgGetFormularyByOID{
oDeativeEntityBC:DeactivateEntity;
oContextInformation:CContextInformation;
}
export class CResMsgGetFormularyByOID{
oManageActivePeriodMain:MAPMain;
oContextInformation:CContextInformation;
}
export class CReqMsgGetFavouritesByOID{
oDeativeEntityBC:DeactivateEntity;
oContextInformation:CContextInformation;
}
export class CResMsgGetFavouritesByOID{
oManageActivePeriodMain:MAPMain;
oContextInformation:CContextInformation;
}
export class CReqMsgGetFormViewParmByOID{
oDeativeEntityBC:DeactivateEntity;
oContextInformation:CContextInformation;
}
export class CResMsgGetFormViewParmByOID{
oManageActivePeriodMain:MAPMain;
oContextInformation:CContextInformation;
}
export class CReqMsgGetItemFreqByOID{
oDeativeEntityBC:DeactivateEntity;
oContextInformation:CContextInformation;
}
export class CResMsgGetItemFreqByOID{
oManageActivePeriodMain:MAPMain;
oContextInformation:CContextInformation;
}
export class CReqMsgGetROAByOID{
oDeativeEntityBC:DeactivateEntity;
oContextInformation:CContextInformation;
}
export class CResMsgGetROAByOID{
oManageActivePeriodMain:MAPMain;
oContextInformation:CContextInformation;
}
export class CReqMsgGetAdminInstruction{
objAdminInstructionBC:AdminInstructionSFS;
oContextInformation:CContextInformation;
}
export class CResMsgGetAdminInstruction{
oContextInformation:CContextInformation;
objadminInstructionArray:ObservableCollection<AdminInstructionSFS>;
}
export class CReqMsgCreateRoute{
routeBC:RouteofAdmin;
oContextInformation:CContextInformation;
}
export class CResMsgCreateRoute{
oContextInformation:CContextInformation;
}

 const prototypeList = {"MedicationMgmtWS.GetFormularyByOID":CResMsgGetFormularyByOID.prototype ,
"MedicationMgmtWS.GetFavouritesByOID":CResMsgGetFavouritesByOID.prototype ,
"MedicationMgmtWS.GetFormViewParmByOID":CResMsgGetFormViewParmByOID.prototype ,
"MedicationMgmtWS.GetItemFreqByOID":CResMsgGetItemFreqByOID.prototype ,
"MedicationMgmtWS.GetROAByOID":CResMsgGetROAByOID.prototype ,
"MedicationMgmtWS.GetAdminInstruction":CResMsgGetAdminInstruction.prototype ,
"MedicationMgmtWS.CreateRoute":CResMsgCreateRoute.prototype ,
"MedicationMgmtWS.CheckItemExists":CResMsgCheckItemExists.prototype ,
"MedicationMgmtWS.GetFrequencies":CResMsgGetFrequencies.prototype ,
"MedicationMgmtWS.GetFrequencyByOID":CResMsgGetFrequencyByOID.prototype ,
"MedicationMgmtWS.GetBaseFrequencies":CResMsgGetBaseFrequencies.prototype ,
"MedicationMgmtWS.CheckFrequencyIsLinked":CResMsgCheckFrequencyIsLinked.prototype ,
"MedicationMgmtWS.ChkFreqCustomised":CResMsgChkFreqCustomised.prototype ,
"MedicationMgmtWS.GetMedicationCode":CResMsgGetMedicationCode.prototype ,
"MedicationMgmtWS.CreateFrequency":CResMsgCreateFrequency.prototype ,
"MedicationMgmtWS.ModifyFrequency":CResMsgModifyFrequency.prototype ,
"MedicationMgmtWS.GetFormNames":CResMsgGetFormNames.prototype ,
"MedicationMgmtWS.ManagePrescriptionForms":CResMsgManagePrescriptionForms.prototype ,
"MedicationMgmtWS.CheckValidDate":CResMsgCheckValidDate.prototype ,
"MedicationMgmtWS.GetDoseDetails":CResMsgGetDoseDetails.prototype ,
"MedicationMgmtWS.IngManageActivePeriods":CResMsgIngManageActivePeriods.prototype ,
"MedicationMgmtWS.HiManageActivePeriods":CResMsgHiManageActivePeriods.prototype ,
"MedicationMgmtWS.PreManageActivePeriods":CResMsgPreManageActivePeriods.prototype ,
"MedicationMgmtWS.ForManageActivePeriods":CResMsgForManageActivePeriods.prototype ,
"MedicationMgmtWS.IntManageActivePeriods":CResMsgIntManageActivePeriods.prototype ,
"MedicationMgmtWS.SenManageActivePeriods":CResMsgSenManageActivePeriods.prototype ,
"MedicationMgmtWS.MedManageActivePeriods":CResMsgMedManageActivePeriods.prototype ,
"MedicationMgmtWS.FvpManageActivePeriods":CResMsgFvpManageActivePeriods.prototype ,
"MedicationMgmtWS.ItmFreqManageActivePeriods":CResMsgItmFreqManageActivePeriods.prototype ,
"MedicationMgmtWS.ROAManageActivePeriods":CResMsgROAManageActivePeriods.prototype ,
"MedicationMgmtWS.GetIngredientByOID":CResMsgGetIngredientByOID.prototype ,
"MedicationMgmtWS.GetInteractionGrpByOID":CResMsgGetInteractionGrpByOID.prototype ,
"MedicationMgmtWS.GetSensitivityGrpByOID":CResMsgGetSensitivityGrpByOID.prototype ,
"MedicationMgmtWS.GetHierarchyByOID":CResMsgGetHierarchyByOID.prototype ,
"MedicationMgmtWS.GetPrescribableItemByOID":CResMsgGetPrescribableItemByOID.prototype ,
"MedicationMgmtWS.IsGroupDetailsExists":CResMsgIsGroupDetailsExists.prototype ,
"MedicationMgmtWS.ManageMonograph":CResMsgManageMonograph.prototype ,
"MedicationMgmtWS.GetMonographContent":CResMsgGetMonographContent.prototype ,
"MedicationMgmtWS.GetDrugXMLInfo":CResMsgGetDrugXMLInfo.prototype ,
"MedicationMgmtWS.GetMonographDetails":CResMsgGetMonographDetails.prototype ,
"MedicationMgmtWS.GetStrengthOrderDetails":CResMsgGetStrengthOrderDetails.prototype ,
"MedicationMgmtWS.Managestrengthorder":CResMsgManagestrengthorder.prototype ,
"MedicationMgmtWS.GetConflictWarningCategory":CResMsgGetConflictWarningCategory.prototype ,
"MedicationMgmtWS.GetUserFavouritesChildGroup":CResMsgGetUserFavouritesChildGroup.prototype ,
"MedicationMgmtWS.GetUserFavouritesGroupItems":CResMsgGetUserFavouritesGroupItems.prototype ,
"MedicationMgmtWS.GetProcessingItemDetails":CResMsgGetProcessingItemDetails.prototype ,
"MedicationMgmtWS.GetFavouritesSearch":CResMsgGetFavouritesSearch.prototype ,
"MedicationMgmtWS.GetDrugSite":CResMsgGetDrugSite.prototype ,
"MedicationMgmtWS.GetPrsItemDetails":CResMsgGetPrsItemDetails.prototype ,
"MedicationMgmtWS.GetPresItemModifyDetails":CResMsgGetPresItemModifyDetails.prototype ,
"MedicationMgmtWS.GetSteppedVariableDoseDetails":CResMsgGetSteppedVariableDoseDetails.prototype ,
"MedicationMgmtWS.NotifyNewversion":CResMsgNotifyNewversion.prototype ,
"MedicationMgmtWS.ValiadteSentVersion":CResMsgValiadteSentVersion.prototype ,
"MedicationMgmtWS.GetStationaryItem":CResMsgGetStationaryItem.prototype ,
"MedicationMgmtWS.GetStationaryItems":CResMsgGetStationaryItems.prototype ,
"MedicationMgmtWS.lnCheckExistPresItem":CResMsglnCheckExistPresItem.prototype ,
"MedicationMgmtWS.lnCheckExistDrugFavourites":CResMsglnCheckExistDrugFavourites.prototype ,
"MedicationMgmtWS.CreateFormViewParameters":CResMsgCreateFormViewParameters.prototype ,
"MedicationMgmtWS.ModifyFormViewParameters":CResMsgModifyFormViewParameters.prototype ,
"MedicationMgmtWS.SelectFormViewParameters":CResMsgSelectFormViewParameters.prototype ,
"MedicationMgmtWS.GetMedFormDetailsByOID":CResMsgGetMedFormDetailsByOID.prototype ,
"MedicationMgmtWS.GetFrmVwrAttributes":CResMsgGetFrmVwrAttributes.prototype ,
"MedicationMgmtWS.GetAssociatedAttributes":CResMsgGetAssociatedAttributes.prototype ,
"MedicationMgmtWS.GetPresItems":CResMsgGetPresItems.prototype ,
"MedicationMgmtWS.GetHierarchy":CResMsgGetHierarchy.prototype ,
"MedicationMgmtWS.GetLeafNodes":CResMsgGetLeafNodes.prototype ,
"MedicationMgmtWS.GetPrescribingTeamsAndMedHierarchy":CResMsgGetPrescribingTeamsAndMedHierarchy.prototype ,
"MedicationMgmtWS.SubmitMedMapHierarchy":CResMsgSubmitMedMapHierarchy.prototype ,
"MedicationMgmtWS.GetHierarchyDup":CResMsgGetHierarchyDup.prototype ,
"MedicationMgmtWS.CheckItemHrchyAssociation":CResMsgCheckItemHrchyAssociation.prototype ,
"MedicationMgmtWS.CreateHierarchy":CResMsgCreateHierarchy.prototype ,
"MedicationMgmtWS.ManageHierarchy":CResMsgManageHierarchy.prototype ,
"MedicationMgmtWS.GetDrugCategoryDetails":CResMsgGetDrugCategoryDetails.prototype ,
"MedicationMgmtWS.GetMedication":CResMsgGetMedication.prototype ,
"MedicationMgmtWS.GetPrescribableItemListSFS":CResMsgGetPrescribableItemListSFS.prototype ,
"MedicationMgmtWS.CreatePrescibableItem":CResMsgCreatePrescibableItem.prototype ,
"MedicationMgmtWS.ModifyPrescribableItem":CResMsgModifyPrescribableItem.prototype ,
"MedicationMgmtWS.GetRoute":CResMsgGetRoute.prototype ,
"MedicationMgmtWS.GetRouteSFS":CResMsgGetRouteSFS.prototype ,
"MedicationMgmtWS.GetDosageForm":CResMsgGetDosageForm.prototype ,
"MedicationMgmtWS.GetSite":CResMsgGetSite.prototype ,
"MedicationMgmtWS.GetForm":CResMsgGetForm.prototype ,
"MedicationMgmtWS.GetAllUOM":CResMsgGetAllUOM.prototype ,
"MedicationMgmtWS.GetAllPackageUOM":CResMsgGetAllPackageUOM.prototype ,
"MedicationMgmtWS.GetAllPackageUOMSFS":CResMsgGetAllPackageUOMSFS.prototype ,
"MedicationMgmtWS.GetAllLegalCategory":CResMsgGetAllLegalCategory.prototype ,
"MedicationMgmtWS.GetDoseUOM":CResMsgGetDoseUOM.prototype ,
"MedicationMgmtWS.GetFrequency":CResMsgGetFrequency.prototype ,
"MedicationMgmtWS.GetManufacturers":CResMsgGetManufacturers.prototype ,
"MedicationMgmtWS.GetBasicDetails":CResMsgGetBasicDetails.prototype ,
"MedicationMgmtWS.HOCGetPresItemDetails":CResMsgHOCGetPresItemDetails.prototype ,
"MedicationMgmtWS.GetDataFilterDetails":CResMsgGetDataFilterDetails.prototype ,
"MedicationMgmtWS.GetConflictDetailsByOID":CResMsgGetConflictDetailsByOID.prototype ,
"MedicationMgmtWS.GetConflictsByItemOID":CResMsgGetConflictsByItemOID.prototype ,
"MedicationMgmtWS.GetContraIndicationByOID":CResMsgGetContraIndicationByOID.prototype ,
"MedicationMgmtWS.GetPrecautionByOID":CResMsgGetPrecautionByOID.prototype ,
"MedicationMgmtWS.GetWarningByOID":CResMsgGetWarningByOID.prototype ,
"MedicationMgmtWS.ViewRelatedConditionDetails":CResMsgViewRelatedConditionDetails.prototype ,
"MedicationMgmtWS.GetPrsItmOIDbyCatitmOid":CResMsgGetPrsItmOIDbyCatitmOid.prototype ,
"MedicationMgmtWS.ManageConflictconfiguration":CResMsgManageConflictconfiguration.prototype ,
"MedicationMgmtWS.GetMedicationConfilictConfig":CResMsgGetMedicationConfilictConfig.prototype ,
"MedicationMgmtWS.GetManageCatalogueconfiguration":CResMsgGetManageCatalogueconfiguration.prototype ,
"MedicationMgmtWS.GetBulletinDetail":CResMsgGetBulletinDetail.prototype ,
"MedicationMgmtWS.GetVerDuplicate":CResMsgGetVerDuplicate.prototype ,
"MedicationMgmtWS.GetVerConfigHistory":CResMsgGetVerConfigHistory.prototype ,
"MedicationMgmtWS.ManageCatalogueconfiguration":CResMsgManageCatalogueconfiguration.prototype ,
"MedicationMgmtWS.GetChkConfltCatConfigLnkEnable":CResMsgGetChkConfltCatConfigLnkEnable.prototype ,
"MedicationMgmtWS.ChkYearAndMonthDataLoad":CResMsgChkYearAndMonthDataLoad.prototype ,
"MedicationMgmtWS.CheckMonthlyLoadStatus":CResMsgCheckMonthlyLoadStatus.prototype ,
"MedicationMgmtWS.GetFlryProcDoseDetails":CResMsgGetFlryProcDoseDetails.prototype ,
"MedicationMgmtWS.GetPresItemDetailByOID":CResMsgGetPresItemDetailByOID.prototype ,
"MedicationMgmtWS.IsDeactiveItem":CResMsgIsDeactiveItem.prototype ,
"MedicationMgmtWS.GetSysDrugProperty":CResMsgGetSysDrugProperty.prototype ,
"MedicationMgmtWS.CreateIngredient":CResMsgCreateIngredient.prototype ,
"MedicationMgmtWS.ManageIngredient":CResMsgManageIngredient.prototype ,
"MedicationMgmtWS.GetIngredient":CResMsgGetIngredient.prototype ,
"MedicationMgmtWS.CheckIngredientIsLinked":CResMsgCheckIngredientIsLinked.prototype ,
"MedicationMgmtWS.SearchIngredient":CResMsgSearchIngredient.prototype ,
"MedicationMgmtWS.SearchIngredientSFS":CResMsgSearchIngredientSFS.prototype ,
"MedicationMgmtWS.GetFavouriteSearchResults":CResMsgGetFavouriteSearchResults.prototype ,
"MedicationMgmtWS.CheckDuplicateMainFormulary":CResMsgCheckDuplicateMainFormulary.prototype ,
"MedicationMgmtWS.CreateInteractiveGroup":CResMsgCreateInteractiveGroup.prototype ,
"MedicationMgmtWS.GetInteractiveGroup":CResMsgGetInteractiveGroup.prototype ,
"MedicationMgmtWS.GetInteractiveGroupDetails":CResMsgGetInteractiveGroupDetails.prototype ,
"MedicationMgmtWS.GetDrugUnderHierarchy":CResMsgGetDrugUnderHierarchy.prototype ,
"MedicationMgmtWS.GetIntractItemDetails":CResMsgGetIntractItemDetails.prototype ,
"MedicationMgmtWS.GetInteractiveGroupbyName":CResMsgGetInteractiveGroupbyName.prototype ,
"MedicationMgmtWS.GetLinkedIntrGrpDetails":CResMsgGetLinkedIntrGrpDetails.prototype ,
"MedicationMgmtWS.GetCustomisedIntrGrpDetails":CResMsgGetCustomisedIntrGrpDetails.prototype ,
"MedicationMgmtWS.ModifyInteractionGroup":CResMsgModifyInteractionGroup.prototype ,
"MedicationMgmtWS.GetIntrGroupFilterby":CResMsgGetIntrGroupFilterby.prototype ,
"MedicationMgmtWS.GetItemSearchCriteriaResults":CResMsgGetItemSearchCriteriaResults.prototype ,
"MedicationMgmtWS.GetPolicyInfo":CResMsgGetPolicyInfo.prototype ,
"MedicationMgmtWS.ManageFavourites":CResMsgManageFavourites.prototype ,
"MedicationMgmtWS.GetFavouritesParentGroup":CResMsgGetFavouritesParentGroup.prototype ,
"MedicationMgmtWS.GetFavouritesChildGroup":CResMsgGetFavouritesChildGroup.prototype ,
"MedicationMgmtWS.GetFavouritesGroupItems":CResMsgGetFavouritesGroupItems.prototype ,
"MedicationMgmtWS.GetFavouritesDrugItem":CResMsgGetFavouritesDrugItem.prototype ,
"MedicationMgmtWS.GetFavAssociation":CResMsgGetFavAssociation.prototype ,
"MedicationMgmtWS.ManageUserFavourites":CResMsgManageUserFavourites.prototype ,
"MedicationMgmtWS.GetUserFavouritesParentGroup":CResMsgGetUserFavouritesParentGroup.prototype ,
"MedicationMgmtWS.ModifyRoute":CResMsgModifyRoute.prototype ,
"MedicationMgmtWS.GetRouteByOID":CResMsgGetRouteByOID.prototype ,
"MedicationMgmtWS.GetRoutes":CResMsgGetRoutes.prototype ,
"MedicationMgmtWS.CheckRouteIsLinked":CResMsgCheckRouteIsLinked.prototype ,
"MedicationMgmtWS.GetConflictSearchResults":CResMsgGetConflictSearchResults.prototype ,
"MedicationMgmtWS.ManageConflicts":CResMsgManageConflicts.prototype ,
"MedicationMgmtWS.ChkConflictsAssociation":CResMsgChkConflictsAssociation.prototype ,
"MedicationMgmtWS.DuplicateConflictCheck":CResMsgDuplicateConflictCheck.prototype ,
"MedicationMgmtWS.GetAdditionalDetails":CResMsgGetAdditionalDetails.prototype ,
"MedicationMgmtWS.GetAlternateDetails":CResMsgGetAlternateDetails.prototype ,
"MedicationMgmtWS.GetAssociateDetails":CResMsgGetAssociateDetails.prototype ,
"MedicationMgmtWS.GetMultiComponentDetails":CResMsgGetMultiComponentDetails.prototype ,
"MedicationMgmtWS.GetValidationDetails":CResMsgGetValidationDetails.prototype ,
"MedicationMgmtWS.GetProcessingDetails":CResMsgGetProcessingDetails.prototype ,
"MedicationMgmtWS.GetPolicyDetails":CResMsgGetPolicyDetails.prototype ,
"MedicationMgmtWS.GetAdminMethod":CResMsgGetAdminMethod.prototype ,
"MedicationMgmtWS.GetParentPrescriptionItemList":CResMsgGetParentPrescriptionItemList.prototype ,
"MedicationMgmtWS.GetChildPrescriptionItemList":CResMsgGetChildPrescriptionItemList.prototype ,
"MedicationMgmtWS.CreateCrossReactiveGroup":CResMsgCreateCrossReactiveGroup.prototype ,
"MedicationMgmtWS.ModifyCrossReactiveGroup":CResMsgModifyCrossReactiveGroup.prototype ,
"MedicationMgmtWS.GetReactiveGroups":CResMsgGetReactiveGroups.prototype ,
"MedicationMgmtWS.GetReactiveGroupDetail":CResMsgGetReactiveGroupDetail.prototype ,
"MedicationMgmtWS.GetCrossActItemDetails":CResMsgGetCrossActItemDetails.prototype ,
"MedicationMgmtWS.GetCrossRctGroupFilterby":CResMsgGetCrossRctGroupFilterby.prototype ,
"MedicationMgmtWS.CreateFormulary":CResMsgCreateFormulary.prototype ,
"MedicationMgmtWS.CopyFormulary":CResMsgCopyFormulary.prototype ,
"MedicationMgmtWS.ManageFormulary":CResMsgManageFormulary.prototype ,
"MedicationMgmtWS.GetFormularyList":CResMsgGetFormularyList.prototype ,
"MedicationMgmtWS.SearchFormularyList":CResMsgSearchFormularyList.prototype ,
"MedicationMgmtWS.GetFormularyItemDetails":CResMsgGetFormularyItemDetails.prototype ,
"MedicationMgmtWS.GetFormularyDetails":CResMsgGetFormularyDetails.prototype ,
"MedicationMgmtWS.GetIsDefaultValues":CResMsgGetIsDefaultValues.prototype ,
"MedicationMgmtWS.GetFrmlyComboValues":CResMsgGetFrmlyComboValues.prototype ,
"MedicationMgmtWS.CheckDuplicateFormulary":CResMsgCheckDuplicateFormulary.prototype ,
"MedicationMgmtWS.ChkDupItemlist":CResMsgChkDupItemlist.prototype ,
"MedicationMgmtWS.ChkDupIntractSenGrpItem":CResMsgChkDupIntractSenGrpItem.prototype ,

CReqMsgGetAdditionalDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAdditionalDetails : { 
oContextInformation:CContextInformation.prototype ,
objPrescribeItemLookUp:PrescribeItemLookUp.prototype ,

 },CompatibleComponents : { 
PrescribableItem:ObjectInfo.prototype ,
CompatibleItems:CompatibleItems.prototype ,

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

 },FrequencyDetails : { 
Frequency:ObjectInfo.prototype ,
StatDose:MeasurableObject.prototype ,
ScheduledTimes:Scheduledetails.prototype ,

 },DoseFormula : { 
RequestedUOM:UOM.prototype ,
Freqdetail:ObjectInfo.prototype ,

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

 },PrescribeItemDetails : { 
AdditionalDetail:AdditionalInfo.prototype ,
MultiComponentDetails:MultiComponent.prototype ,
oCompatibleComponents:CompatibleComponents.prototype ,
ItemCategory:DrugCategory.prototype ,
Indication:Indication.prototype ,
Ingredient:Ingredient.prototype ,
Coding:TTOCodification.prototype ,
ItemLookUp:PrescribeItemLookUp.prototype ,
AlternateDrugs:AlternateDrugItem.prototype ,
ProcessingDetails:ProcessingInfo.prototype ,
Policy:DrugPolicy.prototype ,
ResolveFormPI:ResolveForm.prototype ,
ContraIndicativeDetails:DrugContraIndicative.prototype ,
PrecautionDetails:DrugPrecaution.prototype ,
WarningDetails:DrugWarning.prototype ,

 },DrugCategory : { 
Coding:TTOCodification.prototype ,

 },AdditionalInfo : { 
LegalCategory:LegalCategory.prototype ,
SubPackUOM:UOM.prototype ,
Form:Form.prototype ,
StrengthUOM:UOM.prototype ,
StrengthPerValue:UOM.prototype ,
QuantityUOM:UOM.prototype ,
CostUOM:UOM.prototype ,
PackageUOM:UOM.prototype ,
PackPriceUOM:UOM.prototype ,
Manufacturer:Manufacturer.prototype ,
AdminMethod:AdminMethod.prototype ,
Monograph:MonographInfo.prototype ,
AdminInstruction:AdminInstruction.prototype ,
Route:Route.prototype ,
ProhibitedRoute:Route.prototype ,
Site:Site.prototype ,
FormArr:Form.prototype ,
MonographInformation:MonographInformation.prototype ,
EndorsementProperties:EndorsementProperties.prototype ,
ProductType:ProductType.prototype ,
Stationary:Stationary.prototype ,
MultiComponent:DrugMultiComponent.prototype ,
Approvedby:DrugApprover.prototype ,
ApplicableFluids:PrescribeItem.prototype ,
Synonym:Synonym.prototype ,
SupplyQuantityUOM:SupplyQuantityUOM.prototype ,
MCSupplyQuantityUOM:MCSupplyQuantityUOM.prototype ,
HOCustProductType:ProductType.prototype ,
EANCode:EANCodeInfo.prototype ,

 },DrugMultiComponent : { 
UnitOfMeasure:UOM.prototype ,
QuantityUOM:UOM.prototype ,

 },Ingredient : { 
IngStatusHistory:StatusHistory.prototype ,
AdminWarning:CWarningMsg.prototype ,
PrescribeWarning:CWarningMsg.prototype ,
IngredientCust:IngredientCust.prototype ,
Coding:TTOCodification.prototype ,

 },MultiComponent : { 
Components:MultiComponentItem.prototype ,

 },MultiComponentItem : { 
Conflicts:MultiComponentConflicts.prototype ,

 },PrescriptionItemBasicInfo : { 
Dose:Dose.prototype ,
FrequencyDetails:FrequencyDetails.prototype ,
AdminDetails:PrescriptionItemAdminDetails.prototype ,

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

 },ReactiveGroup : { 
Ingredient:Ingredient.prototype ,

 },FormularyGroup : { 
PrescriptionItem:ConstituentItem.prototype ,
FormularyOptionsGridBC:FormularyOptionGrid.prototype ,

 },DataFilter : { 
DataFilterDetails:DataFilterDetails.prototype ,

 },InteractiveGroup : { 
PresecribeItem:PrescribeItemBase.prototype ,
InteractionGroup:InteractionGroup.prototype ,

 },FavouriteItem : { 
FavriteStatusHistory:StatusHistory.prototype ,
PrescriptionItem:ConstituentItem.prototype ,

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

 },DoseRegimeInfusionDetail : { 
RateNumerator:UOM.prototype ,
RateDenominator:UOM.prototype ,
Duration:MeasurableObject.prototype ,

 },AdministeredTimeDoseDetail : { 
DoseUOM:UOM.prototype ,

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

 },GPConnectItem : { 
Dosage:GPConnectAdminDosage.prototype ,

 },RouteofAdmin : { 
Coding:TTOCodification.prototype ,

 },ConflictDetails : { 
RelatedCondition:TTOCodification.prototype ,
SpecificCondition:TTOCodification.prototype ,
oWarningCategory:ConflictsWarningCategory.prototype ,

 },MedicationConflictConfig : { 
oMedicationConflictConfigData:MedConflictConfigData.prototype ,
oDRCConfigData:DRCConfigData.prototype ,

 },ManageCatalogueVersionConfig : { 
oVersionHistory:VersionHistory.prototype ,

 },VersionHistory : { 
oDuplicateEntry:DuplicateEntry.prototype ,

 },PrescribingTeamDetails : { 
oMedicationHierarchyDetails:MedicationHierarchyDetails.prototype ,

 },FrmVwParameter : { 
FormAttributes:FrmVwAttributes.prototype ,

 },MngPresForms : { 
MFVPresItem:MedFormPresItem.prototype ,
AttribItem:AttributesItem.prototype ,

 },DrugFrequency : { 
Coding:TTOCodification.prototype ,
ScheduleTime:Scheduledetails.prototype ,

 },ManageActivePeriods : { 
objAlternativeDrugs:AlternativeDrugs.prototype ,

 },MAPMain : { 
MAPMainEntities:DeactivateEntity.prototype ,
MAPSubEntitties:ManageActivePeriods.prototype ,
MAPHistory:ManageActivePeriods.prototype ,
objAlternativeDrugs:AlternativeDrugs.prototype ,

 },CReqMsgGetAlternateDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAlternateDetails : { 
oContextInformation:CContextInformation.prototype ,
objAlternateDrugItem:AlternateDrugItem.prototype ,

 },CReqMsgGetAssociateDetails : { 
PresbasicinfoBC:PrescriptionItemBasicInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAssociateDetails : { 
oContextInformation:CContextInformation.prototype ,
objAssociateItem:PrescribeItem.prototype ,

 },CReqMsgGetMultiComponentDetails : { 
PresbasicinfoBC:PrescriptionItemBasicInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMultiComponentDetails : { 
oContextInformation:CContextInformation.prototype ,
objMultiComponentItem:DrugMultiComponent.prototype ,

 },CReqMsgGetValidationDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetValidationDetails : { 
oContextInformation:CContextInformation.prototype ,
ConstraintList:ConstraintList.prototype ,

 },CReqMsgGetProcessingDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProcessingDetails : { 
oContextInformation:CContextInformation.prototype ,
objProcessingInfo:ProcessingInfo.prototype ,

 },CReqMsgGetPolicyDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPolicyDetails : { 
oContextInformation:CContextInformation.prototype ,
objPolicyDetails:DrugPolicy.prototype ,

 },CReqMsgGetAdminMethod : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAdminMethod : { 
oContextInformation:CContextInformation.prototype ,
objAdminMethod:AdminMethod.prototype ,

 },CReqMsgGetParentPrescriptionItemList : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetParentPrescriptionItemList : { 
oContextInformation:CContextInformation.prototype ,
objPrescribeItemBase:PrescribeItemBase.prototype ,

 },CReqMsgGetChildPrescriptionItemList : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetChildPrescriptionItemList : { 
oContextInformation:CContextInformation.prototype ,
objPrescribeItemBase:PrescribeItemBase.prototype ,

 },CReqMsgCreateCrossReactiveGroup : { 
oReactiveGroupBC:ReactiveGroup.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgCreateCrossReactiveGroup : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgModifyCrossReactiveGroup : { 
oReactiveGroupBC:ReactiveGroup.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgModifyCrossReactiveGroup : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetReactiveGroups : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetReactiveGroups : { 
oContextInformation:CContextInformation.prototype ,
oReactiveGroup:ReactiveGroup.prototype ,

 },CReqMsgGetReactiveGroupDetail : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetReactiveGroupDetail : { 
oContextInformation:CContextInformation.prototype ,
oIngredient:Ingredient.prototype ,

 },CReqMsgGetCrossActItemDetails : { 
oCrossReactGrpSearchBC:CrossReactGrpSearch.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetCrossActItemDetails : { 
oContextInformation:CContextInformation.prototype ,
oIngredient:Ingredient.prototype ,

 },CReqMsgGetCrossRctGroupFilterby : { 
objReactiveSearchBC:CrossReactiveGroupSearch.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetCrossRctGroupFilterby : { 
oContextInformation:CContextInformation.prototype ,
oReactiveGroup:ReactiveGroup.prototype ,

 },CReqMsgCreateFormulary : { 
oFormularyGroupBC:FormularyGroup.prototype ,
oDataFilterBC:DataFilter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgCreateFormulary : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgCopyFormulary : { 
oFormularyGroupBC:FormularyGroup.prototype ,
oDataFilterBC:DataFilter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgCopyFormulary : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgManageFormulary : { 
oFormularyGroupBC:FormularyGroup.prototype ,
oDataFilterBC:DataFilter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgManageFormulary : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetFormularyList : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFormularyList : { 
oContextInformation:CContextInformation.prototype ,
oFormularyGroup:FormularyGroup.prototype ,

 },CReqMsgSearchFormularyList : { 
objSearchFormularyGroupBC:SearchFormularyGroup.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgSearchFormularyList : { 
oContextInformation:CContextInformation.prototype ,
oFormularyGroup:FormularyGroup.prototype ,

 },CReqMsgGetFormularyItemDetails : { 
objSerachFormularyDetailBC:SearchFormularyDetail.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFormularyItemDetails : { 
oContextInformation:CContextInformation.prototype ,
oConstituentItem:ConstituentItem.prototype ,

 },CReqMsgGetFormularyDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFormularyDetails : { 
oFormularyGroup:FormularyGroup.prototype ,
oDataFilter:DataFilter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetIsDefaultValues : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIsDefaultValues : { 
oContextInformation:CContextInformation.prototype ,
oProcessingInfo:ProcessingInfo.prototype ,

 },CReqMsgGetFrmlyComboValues : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFrmlyComboValues : { 
oProcessingInfo:ProcessingInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgCheckDuplicateFormulary : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgCheckDuplicateFormulary : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgChkDupItemlist : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgChkDupItemlist : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgChkDupIntractSenGrpItem : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgChkDupIntractSenGrpItem : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgCheckDuplicateMainFormulary : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgCheckDuplicateMainFormulary : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgCreateInteractiveGroup : { 
oInteractiveGroupBC:InteractiveGroup.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgCreateInteractiveGroup : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetInteractiveGroup : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetInteractiveGroup : { 
oContextInformation:CContextInformation.prototype ,
oInteractiveGroup:InteractiveGroup.prototype ,

 },CReqMsgGetInteractiveGroupDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetInteractiveGroupDetails : { 
oContextInformation:CContextInformation.prototype ,
oPrescribeItemBase:PrescribeItemBase.prototype ,

 },CReqMsgGetDrugUnderHierarchy : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDrugUnderHierarchy : { 
oContextInformation:CContextInformation.prototype ,
oDrugItemDetails:DrugItemDetails.prototype ,

 },CReqMsgGetIntractItemDetails : { 
oIntractionGrpSearchBC:IntractionGrpSearch.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIntractItemDetails : { 
oContextInformation:CContextInformation.prototype ,
objPrescribeItemBase:PrescribeItemBase.prototype ,

 },CReqMsgGetInteractiveGroupbyName : { 
objInteractiveGroupBC:InteractiveGroup.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetInteractiveGroupbyName : { 
oContextInformation:CContextInformation.prototype ,
oInteractiveGroup:InteractiveGroup.prototype ,

 },CReqMsgGetLinkedIntrGrpDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetLinkedIntrGrpDetails : { 
oContextInformation:CContextInformation.prototype ,
oInteractionGroup:InteractionGroup.prototype ,

 },CReqMsgGetCustomisedIntrGrpDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetCustomisedIntrGrpDetails : { 
oContextInformation:CContextInformation.prototype ,
oInteractionGroup:InteractionGroup.prototype ,

 },CReqMsgModifyInteractionGroup : { 
oInteractiveGroupBC:InteractiveGroup.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgModifyInteractionGroup : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetIntrGroupFilterby : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIntrGroupFilterby : { 
oContextInformation:CContextInformation.prototype ,
oInteractiveGroup:InteractiveGroup.prototype ,

 },CReqMsgGetItemSearchCriteriaResults : { 
objItemSearchCriteriaBC:ItemSearchCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetItemSearchCriteriaResults : { 
oContextInformation:CContextInformation.prototype ,
objPrescribableItems:PrescribeItemBase.prototype ,

 },CReqMsgGetPolicyInfo : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPolicyInfo : { 
oContextInformation:CContextInformation.prototype ,
PolicyItem:DrugPolicy.prototype ,

 },CReqMsgManageFavourites : { 
oContextInformation:CContextInformation.prototype ,
oArrFavouriteItemBC:FavouriteItem.prototype ,
oFavouriteAssociationBC:FavouriteAssociation.prototype ,

 },CResMsgManageFavourites : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetFavouritesParentGroup : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFavouritesParentGroup : { 
oContextInformation:CContextInformation.prototype ,
oArrFavouriteItem:FavouriteItem.prototype ,

 },CReqMsgGetFavouritesChildGroup : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFavouritesChildGroup : { 
oContextInformation:CContextInformation.prototype ,
oArrFavouriteItem:FavouriteItem.prototype ,

 },CReqMsgGetFavouritesGroupItems : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFavouritesGroupItems : { 
oFavouriteItem:FavouriteItem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetFavouritesDrugItem : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFavouritesDrugItem : { 
oContextInformation:CContextInformation.prototype ,
oPrescriptionItemDetails:PrescriptionItemDetails.prototype ,

 },CReqMsgGetFavAssociation : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFavAssociation : { 
oContextInformation:CContextInformation.prototype ,
oFavouriteAssociation:FavouriteAssociation.prototype ,

 },CReqMsgManageUserFavourites : { 
oContextInformation:CContextInformation.prototype ,
oArrFavouriteItemBC:FavouriteItem.prototype ,

 },CResMsgManageUserFavourites : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetUserFavouritesParentGroup : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetUserFavouritesParentGroup : { 
oContextInformation:CContextInformation.prototype ,
oArrFavouriteItem:FavouriteItem.prototype ,

 },CReqMsgModifyRoute : { 
routeBC:RouteofAdmin.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgModifyRoute : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetRouteByOID : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetRouteByOID : { 
objRoute:RouteofAdmin.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetRoutes : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetRoutes : { 
oContextInformation:CContextInformation.prototype ,
objRoute:RouteofAdmin.prototype ,

 },CReqMsgCheckRouteIsLinked : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgCheckRouteIsLinked : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetConflictSearchResults : { 
objConflictSearchCriteriaBC:ConflictSearchCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetConflictSearchResults : { 
oContextInformation:CContextInformation.prototype ,
objConflictDetails:ConflictDetails.prototype ,

 },CReqMsgManageConflicts : { 
objConflictDetailsBC:ConflictDetails.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgManageConflicts : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgChkConflictsAssociation : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgChkConflictsAssociation : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgDuplicateConflictCheck : { 
objConflictDetailsBC:ConflictDetails.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgDuplicateConflictCheck : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetConflictDetailsByOID : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetConflictDetailsByOID : { 
oContextInformation:CContextInformation.prototype ,
objConflictDetails:ConflictDetails.prototype ,

 },CReqMsgGetConflictsByItemOID : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetConflictsByItemOID : { 
oContextInformation:CContextInformation.prototype ,
objConflictDetails:ConflictDetails.prototype ,

 },CReqMsgGetContraIndicationByOID : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetContraIndicationByOID : { 
oContextInformation:CContextInformation.prototype ,
objContraIndicative:DrugContraIndicative.prototype ,

 },CReqMsgGetPrecautionByOID : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPrecautionByOID : { 
oContextInformation:CContextInformation.prototype ,
objDrugPrecaution:DrugPrecaution.prototype ,

 },CReqMsgGetWarningByOID : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetWarningByOID : { 
oContextInformation:CContextInformation.prototype ,
objDrugWarning:DrugWarning.prototype ,

 },CReqMsgViewRelatedConditionDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgViewRelatedConditionDetails : { 
oContextInformation:CContextInformation.prototype ,
objRelatedConditions:RelatedConditionDetails.prototype ,

 },CReqMsgGetPrsItmOIDbyCatitmOid : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPrsItmOIDbyCatitmOid : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgManageConflictconfiguration : { 
oMedicationConflictConfigBC:MedicationConflictConfig.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgManageConflictconfiguration : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetMedicationConfilictConfig : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMedicationConfilictConfig : { 
oMedicationConflictConfig:MedicationConflictConfig.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetManageCatalogueconfiguration : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetManageCatalogueconfiguration : { 
oMCVC:ManageCatalogueVersionConfig.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetBulletinDetail : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetBulletinDetail : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetVerDuplicate : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetVerDuplicate : { 
oContextInformation:CContextInformation.prototype ,
oDuplicateEntry:DuplicateEntry.prototype ,

 },CReqMsgGetVerConfigHistory : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetVerConfigHistory : { 
oMCVC:ManageCatalogueVersionConfig.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgManageCatalogueconfiguration : { 
objVersionConfigBC:ManageCatalogueVersionConfig.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgManageCatalogueconfiguration : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetChkConfltCatConfigLnkEnable : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetChkConfltCatConfigLnkEnable : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgChkYearAndMonthDataLoad : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgChkYearAndMonthDataLoad : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgCheckMonthlyLoadStatus : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgCheckMonthlyLoadStatus : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetFlryProcDoseDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFlryProcDoseDetails : { 
oContextInformation:CContextInformation.prototype ,
DoseDetails:DoseDetails.prototype ,

 },CReqMsgGetPresItemDetailByOID : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPresItemDetailByOID : { 
ProcessingInfo:ProcessingInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgIsDeactiveItem : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgIsDeactiveItem : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetSysDrugProperty : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetSysDrugProperty : { 
oDrugPropertyValue:DrugPropertyValue.prototype ,
oContextInformation:CContextInformation.prototype ,

 },DrugPropertyValue : { 
DrugProperty:DrugProperty.prototype ,

 },CReqMsgCreateIngredient : { 
oIngredientBC:Ingredient.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgCreateIngredient : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgManageIngredient : { 
oIngredientBC:Ingredient.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgManageIngredient : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetIngredient : { 
objIngredientListViewBC:IngredientListView.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIngredient : { 
oContextInformation:CContextInformation.prototype ,
oIngredient:Ingredient.prototype ,

 },CReqMsgCheckIngredientIsLinked : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgCheckIngredientIsLinked : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgSearchIngredient : { 
objIngredientListViewBC:IngredientListView.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgSearchIngredient : { 
oContextInformation:CContextInformation.prototype ,
oIngredient:Ingredient.prototype ,

 },CReqMsgSearchIngredientSFS : { 
objIngredientListViewBC:IngredientListView.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgSearchIngredientSFS : { 
oContextInformation:CContextInformation.prototype ,
oIngredient:IngredientListView.prototype ,

 },CReqMsgGetFavouriteSearchResults : { 
objReqFavouriteSearchResultsBC:FavouriteSearchResults.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFavouriteSearchResults : { 
oContextInformation:CContextInformation.prototype ,
objResFavouriteSearchResults:FavouriteSearchResults.prototype ,

 },CReqMsgGetHierarchy : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetHierarchy : { 
oContextInformation:CContextInformation.prototype ,
oDrugCategory:DrugCategory.prototype ,

 },CReqMsgGetLeafNodes : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetLeafNodes : { 
oContextInformation:CContextInformation.prototype ,
oDrugLeafNodes:DrugCategory.prototype ,

 },CReqMsgGetPrescribingTeamsAndMedHierarchy : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPrescribingTeamsAndMedHierarchy : { 
oContextInformation:CContextInformation.prototype ,
oPrescribingTeamDetails:PrescribingTeamDetails.prototype ,

 },CReqMsgSubmitMedMapHierarchy : { 
oContextInformation:CContextInformation.prototype ,
oPrescribingTeamDetailsBC:PrescribingTeamDetails.prototype ,

 },CResMsgSubmitMedMapHierarchy : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetHierarchyDup : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetHierarchyDup : { 
oContextInformation:CContextInformation.prototype ,
oDrugCategory:DrugCategory.prototype ,

 },CReqMsgCheckItemHrchyAssociation : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgCheckItemHrchyAssociation : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgCreateHierarchy : { 
oDrugCategoryBC:DrugCategory.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgCreateHierarchy : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgManageHierarchy : { 
oDrugCategoryBC:DrugCategory.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgManageHierarchy : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetDrugCategoryDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDrugCategoryDetails : { 
oContextInformation:CContextInformation.prototype ,
oCatDetails:CatDetails.prototype ,

 },CReqMsgGetMedication : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMedication : { 
oContextInformation:CContextInformation.prototype ,
objCodification:TTOCodification.prototype ,

 },CReqMsgGetPrescribableItemListSFS : { 
objPrescribableItemSFSBC:PrescribableItemListSFS.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPrescribableItemListSFS : { 
oContextInformation:CContextInformation.prototype ,
objPrescribeItemBase:PrescribeItemBase.prototype ,

 },CReqMsgCreatePrescibableItem : { 
oDataFilterBC:DataFilter.prototype ,
oContextInformation:CContextInformation.prototype ,
PrescribeItemDetailsBC:PrescribeItemDetails.prototype ,
oPresGridBC:PrescriptionGridInfo.prototype ,

 },CResMsgCreatePrescibableItem : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgModifyPrescribableItem : { 
oDataFilterBC:DataFilter.prototype ,
oContextInformation:CContextInformation.prototype ,
PrescribeItemDetailsBC:PrescribeItemDetails.prototype ,
oPresGridBC:PrescriptionGridInfo.prototype ,

 },CResMsgModifyPrescribableItem : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetRoute : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetRoute : { 
oContextInformation:CContextInformation.prototype ,
objRoute:Route.prototype ,

 },CReqMsgGetRouteSFS : { 
objCurrentRouteBC:Route.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetRouteSFS : { 
oContextInformation:CContextInformation.prototype ,
objRoute:Route.prototype ,

 },CReqMsgGetDosageForm : { 
objDosageFormBC:DosageForm.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDosageForm : { 
oContextInformation:CContextInformation.prototype ,
objDosageFormArray:DosageForm.prototype ,

 },CReqMsgGetSite : { 
objSiteFormBC:DrugSite.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetSite : { 
oContextInformation:CContextInformation.prototype ,
objSiteFormArray:DrugSite.prototype ,

 },CReqMsgGetForm : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetForm : { 
oContextInformation:CContextInformation.prototype ,
objForm:Form.prototype ,

 },CReqMsgGetAllUOM : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAllUOM : { 
oContextInformation:CContextInformation.prototype ,
objUOM:UOM.prototype ,

 },CReqMsgGetAllPackageUOM : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAllPackageUOM : { 
oContextInformation:CContextInformation.prototype ,
objUOM:UOM.prototype ,

 },CReqMsgGetAllPackageUOMSFS : { 
objPackUOMBC:PackageUOM.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAllPackageUOMSFS : { 
oContextInformation:CContextInformation.prototype ,
objPackUOMArray:PackageUOM.prototype ,

 },CReqMsgGetAllLegalCategory : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAllLegalCategory : { 
oContextInformation:CContextInformation.prototype ,
objLegalCategory:LegalCategory.prototype ,

 },CReqMsgGetDoseUOM : { 
oPrescribeItemSetItemBC:PrescribeItemSetItem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDoseUOM : { 
oContextInformation:CContextInformation.prototype ,
objUOM:UOM.prototype ,

 },CReqMsgGetFrequency : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFrequency : { 
oContextInformation:CContextInformation.prototype ,
objFrequency:Frequency.prototype ,

 },CReqMsgGetManufacturers : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetManufacturers : { 
oContextInformation:CContextInformation.prototype ,
objManufacturer:Manufacturer.prototype ,

 },CReqMsgGetBasicDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetBasicDetails : { 
objPrescribeDetails:PrescribeItemDetails.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgHOCGetPresItemDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgHOCGetPresItemDetails : { 
oContextInformation:CContextInformation.prototype ,
objPrescribeItemDetails:PrescribeItemDetails.prototype ,

 },CReqMsgGetDataFilterDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDataFilterDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgIsGroupDetailsExists : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgIsGroupDetailsExists : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgManageMonograph : { 
objMonoInfoBC:MonographInformation.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgManageMonograph : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetMonographContent : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMonographContent : { 
objContent:MonographInformation.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetDrugXMLInfo : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDrugXMLInfo : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetMonographDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMonographDetails : { 
oContextInformation:CContextInformation.prototype ,
objMonoDetails:MonographDetails.prototype ,

 },CReqMsgGetStrengthOrderDetails : { 
objReqPresItemListBC:PrescriptionItemList.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetStrengthOrderDetails : { 
oContextInformation:CContextInformation.prototype ,
objResPresItemList:PrescriptionItemList.prototype ,

 },CReqMsgManagestrengthorder : { 
oContextInformation:CContextInformation.prototype ,
objPresItemListBC:PrescriptionItemList.prototype ,

 },CResMsgManagestrengthorder : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetConflictWarningCategory : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetConflictWarningCategory : { 
oContextInformation:CContextInformation.prototype ,
objConflictsWarningCategory:ConflictsWarningCategory.prototype ,

 },CReqMsgGetUserFavouritesChildGroup : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetUserFavouritesChildGroup : { 
oContextInformation:CContextInformation.prototype ,
oArrFavouriteItem:FavouriteItem.prototype ,

 },CReqMsgGetUserFavouritesGroupItems : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetUserFavouritesGroupItems : { 
oFavouriteItem:FavouriteItem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetProcessingItemDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProcessingItemDetails : { 
oContextInformation:CContextInformation.prototype ,
ProcessingInformation:ProcessingInfo.prototype ,

 },CReqMsgGetFavouritesSearch : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFavouritesSearch : { 
oContextInformation:CContextInformation.prototype ,
oArrFavouriteItem:FavouriteItem.prototype ,

 },CReqMsgGetDrugSite : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDrugSite : { 
oContextInformation:CContextInformation.prototype ,
objDrugSite:DrugSite.prototype ,

 },CReqMsgGetPrsItemDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPrsItemDetails : { 
objPrescribeItemDetails:PrescribeItemDetails.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPresItemModifyDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPresItemModifyDetails : { 
oDataFilter:DataFilter.prototype ,
oContextInformation:CContextInformation.prototype ,
objPrescribeItemDetails:PrescribeItemDetails.prototype ,

 },CReqMsgGetSteppedVariableDoseDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetSteppedVariableDoseDetails : { 
oContextInformation:CContextInformation.prototype ,
DoseDetails:DoseDetails.prototype ,

 },CReqMsgNotifyNewversion : { 
oNotifyVersionDetailsBC:CNotifyVersion.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CNotifyVersion : { 
objNotifyNewVersion:CNotifyNewVersion.prototype ,
objCNotifyObjects:CNotifyObjects.prototype ,

 },CResMsgNotifyNewversion : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgValiadteSentVersion : { 
oNotifyVersionDetailBC:CNotifyNewVersion.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgValiadteSentVersion : { 
oContextInformation:CContextInformation.prototype ,
oNotifyVersionDetails:CNotifyNewVersion.prototype ,

 },CReqMsgGetStationaryItem : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetStationaryItem : { 
oContextInformation:CContextInformation.prototype ,
objStationaryItem:Stationary.prototype ,

 },CReqMsgGetStationaryItems : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetStationaryItems : { 
oContextInformation:CContextInformation.prototype ,
objStationaryItem:Stationary.prototype ,

 },CReqMsglnCheckExistPresItem : { 
objPrescribeItemDetailsBC:PrescribeItemDetails.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsglnCheckExistPresItem : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsglnCheckExistDrugFavourites : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsglnCheckExistDrugFavourites : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgCreateFormViewParameters : { 
oFrmViewParameterBC:FrmVwParameter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgCreateFormViewParameters : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgModifyFormViewParameters : { 
oFrwViewParameterBC:FrmVwParameter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgModifyFormViewParameters : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgSelectFormViewParameters : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgSelectFormViewParameters : { 
oContextInformation:CContextInformation.prototype ,
oMedFormView:FrmVwParameter.prototype ,

 },CReqMsgGetMedFormDetailsByOID : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMedFormDetailsByOID : { 
oFrmViewParameter:FrmVwParameter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetFrmVwrAttributes : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFrmVwrAttributes : { 
oFrmVwr:FrmVwParameter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetAssociatedAttributes : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAssociatedAttributes : { 
oMngPresFrm:MngPresForms.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPresItems : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPresItems : { 
oContextInformation:CContextInformation.prototype ,
oPresItem:MedFormPresItem.prototype ,

 },CReqMsgCheckItemExists : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgCheckItemExists : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetFrequencies : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFrequencies : { 
oContextInformation:CContextInformation.prototype ,
objFrequency:DrugFrequency.prototype ,

 },CReqMsgGetFrequencyByOID : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFrequencyByOID : { 
objFrequency:DrugFrequency.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetBaseFrequencies : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetBaseFrequencies : { 
oContextInformation:CContextInformation.prototype ,
BaseFrequencies:Frequency.prototype ,

 },CReqMsgCheckFrequencyIsLinked : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgCheckFrequencyIsLinked : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgChkFreqCustomised : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgChkFreqCustomised : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetMedicationCode : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMedicationCode : { 
oContextInformation:CContextInformation.prototype ,
objCodification:TTOCodification.prototype ,

 },CReqMsgCreateFrequency : { 
oFrequencyBC:DrugFrequency.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgCreateFrequency : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgModifyFrequency : { 
oFrequencyBC:DrugFrequency.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgModifyFrequency : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetFormNames : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFormNames : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgManagePrescriptionForms : { 
oMngPresFormsBC:MngPresForms.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgManagePrescriptionForms : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgCheckValidDate : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgCheckValidDate : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetDoseDetails : { 
PresbasicinfoBC:PrescriptionItemBasicInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDoseDetails : { 
doseDetail:Dose.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgIngManageActivePeriods : { 
oContextInformation:CContextInformation.prototype ,
oManageActivePeriodsBC:ManageActivePeriods.prototype ,

 },CResMsgIngManageActivePeriods : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgHiManageActivePeriods : { 
oContextInformation:CContextInformation.prototype ,
oManageActivePeriodsBC:ManageActivePeriods.prototype ,

 },CResMsgHiManageActivePeriods : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgPreManageActivePeriods : { 
oContextInformation:CContextInformation.prototype ,
oManageActivePeriodsBC:ManageActivePeriods.prototype ,

 },CResMsgPreManageActivePeriods : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgForManageActivePeriods : { 
oContextInformation:CContextInformation.prototype ,
oManageActivePeriodsBC:ManageActivePeriods.prototype ,

 },CResMsgForManageActivePeriods : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgIntManageActivePeriods : { 
oContextInformation:CContextInformation.prototype ,
oManageActivePeriodsBC:ManageActivePeriods.prototype ,

 },CResMsgIntManageActivePeriods : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgSenManageActivePeriods : { 
oContextInformation:CContextInformation.prototype ,
oManageActivePeriodsBC:ManageActivePeriods.prototype ,

 },CResMsgSenManageActivePeriods : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgMedManageActivePeriods : { 
oContextInformation:CContextInformation.prototype ,
oManageActivePeriodsBC:ManageActivePeriods.prototype ,

 },CResMsgMedManageActivePeriods : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgFvpManageActivePeriods : { 
oContextInformation:CContextInformation.prototype ,
oManageActivePeriodsBC:ManageActivePeriods.prototype ,

 },CResMsgFvpManageActivePeriods : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgItmFreqManageActivePeriods : { 
oContextInformation:CContextInformation.prototype ,
oManageActivePeriodsBC:ManageActivePeriods.prototype ,

 },CResMsgItmFreqManageActivePeriods : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgROAManageActivePeriods : { 
oContextInformation:CContextInformation.prototype ,
oManageActivePeriodsBC:ManageActivePeriods.prototype ,

 },CResMsgROAManageActivePeriods : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetIngredientByOID : { 
oDeativeEntityBC:DeactivateEntity.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIngredientByOID : { 
oManageActivePeriodMain:MAPMain.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetInteractionGrpByOID : { 
oDeativeEntityBC:DeactivateEntity.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetInteractionGrpByOID : { 
oManageActivePeriodMain:MAPMain.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetSensitivityGrpByOID : { 
oDeativeEntityBC:DeactivateEntity.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetSensitivityGrpByOID : { 
oManageActivePeriodMain:MAPMain.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetHierarchyByOID : { 
oDeativeEntityBC:DeactivateEntity.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetHierarchyByOID : { 
oManageActivePeriodMain:MAPMain.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPrescribableItemByOID : { 
oDeativeEntityBC:DeactivateEntity.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPrescribableItemByOID : { 
oManageActivePeriodMain:MAPMain.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetFormularyByOID : { 
oDeativeEntityBC:DeactivateEntity.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFormularyByOID : { 
oManageActivePeriodMain:MAPMain.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetFavouritesByOID : { 
oDeativeEntityBC:DeactivateEntity.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFavouritesByOID : { 
oManageActivePeriodMain:MAPMain.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetFormViewParmByOID : { 
oDeativeEntityBC:DeactivateEntity.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFormViewParmByOID : { 
oManageActivePeriodMain:MAPMain.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetItemFreqByOID : { 
oDeativeEntityBC:DeactivateEntity.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetItemFreqByOID : { 
oManageActivePeriodMain:MAPMain.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetROAByOID : { 
oDeativeEntityBC:DeactivateEntity.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetROAByOID : { 
oManageActivePeriodMain:MAPMain.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetAdminInstruction : { 
objAdminInstructionBC:AdminInstructionSFS.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAdminInstruction : { 
oContextInformation:CContextInformation.prototype ,
objadminInstructionArray:AdminInstructionSFS.prototype ,

 },CReqMsgCreateRoute : { 
routeBC:RouteofAdmin.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgCreateRoute : { 
oContextInformation:CContextInformation.prototype ,

 },CContextInformation : { 
Current:CContextInformation.prototype ,

 },
 }
 
const charPropertyLookup = [
'HasDataFilter','EncounterID','IsOxygen','CondDoseMonPeriodReq','IsOxygenCustom','CondDoseMonPeriodReqCustom','IsCDForFDBEData','IsPresItemVPforAP',
'IsPRN',
'IsFixedAdministration','StatIndicator','PRNScheduledDet',
'IsExcludeGuidanceInSearch',
'IsDisplayPrimaryListCustom','IsInfusionCustom','IsCondDoseMonPeriodReqCustom',
'IsEditable','IsPrimary',
'ConditionType','Status',
'IsPGD','IsSTATDose','IsPRNDose','IsPresItem1Available','IsPresItem2Available',
'IsPCA',
'HasItemFilter',
'IsDuplicate',
'IsTechValidateCA','MonPeriodMand',
'IsAdministered','IsControlledDrug',
'IsCriticalMedication',
'IsDrugApprovalRequired','IsConflictsExists','IsDoseCalcExist','IsAmendment','IsNonformulary','ReplaceDrugActiveStatus','DrugVersionMatch','HIIsAckn','IsReoderIconEnable','IssIDSNewMeds','IsInclude72HrsCompletedORDisconItem','IsVolumeBasedInfusion',
'IsSupplyReq',
'IsPresItemLevelDispense','ExistsOnAdmission',
'HasWarnings','IsHold','PrintStatus','HasDoseCalculation',
'CanDoseBeChanged','HasProhibitedRoute',
'LineIndicator',
'IsSupplyRequested',
'IsDoseCombinationsDefined',
'UpdatePatientRecord','IsDailyDose',
'IsActionPerformed',
'NotifyFlag',
'AlwaysShowID',
'DisplayConflicts','TurnOnDRC',
'IsDisplayDRCConflict','IsOpenDRCTab',
'cIsDuplicate',
'IsUpdateReqd',
'IsDuplicateBC',
'ModeBC',
'IsMainAppConflictsBC',]
 