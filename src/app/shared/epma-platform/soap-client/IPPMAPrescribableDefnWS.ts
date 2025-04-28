import DateTime from "epma-platform/DateTime";
import { byte, CContextInformation, CLZOObject, ObservableCollection } from "epma-platform/models";
import { HelperService } from "./helper.service";


export class IPPMAPrescribableDefnWSSoapClient{

GetPGDListCompleted: Function;
GetPGDListAsync(oCReqMsgGetPGDList:CReqMsgGetPGDList ) : void {
  HelperService.Invoke<CReqMsgGetPGDList,CResMsgGetPGDList,GetPGDListCompletedEventArgs>("IPPMAPrescribableDefnWS.GetPGDList",oCReqMsgGetPGDList,this.GetPGDListCompleted,"objReqGetPGDList",new GetPGDListCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPGDListByOIDCompleted: Function;
GetPGDListByOIDAsync(oCReqMsgGetPGDListByOID:CReqMsgGetPGDListByOID ) : void {
  HelperService.Invoke<CReqMsgGetPGDListByOID,CResMsgGetPGDListByOID,GetPGDListByOIDCompletedEventArgs>("IPPMAPrescribableDefnWS.GetPGDListByOID",oCReqMsgGetPGDListByOID,this.GetPGDListByOIDCompleted,"sMcVersionNo",new GetPGDListByOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CheckDuplicatePGDCompleted: Function;
CheckDuplicatePGDAsync(oCReqMsgCheckDuplicatePGD:CReqMsgCheckDuplicatePGD ) : void {
  HelperService.Invoke<CReqMsgCheckDuplicatePGD,CResMsgCheckDuplicatePGD,CheckDuplicatePGDCompletedEventArgs>("IPPMAPrescribableDefnWS.CheckDuplicatePGD",oCReqMsgCheckDuplicatePGD,this.CheckDuplicatePGDCompleted,"sName",new CheckDuplicatePGDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ModifyPGDlistCompleted: Function;
ModifyPGDlistAsync(oCReqMsgModifyPGDlist:CReqMsgModifyPGDlist ) : void {
  HelperService.Invoke<CReqMsgModifyPGDlist,CResMsgModifyPGDlist,ModifyPGDlistCompletedEventArgs>("IPPMAPrescribableDefnWS.ModifyPGDlist",oCReqMsgModifyPGDlist,this.ModifyPGDlistCompleted,"DelPGDLorenzoIDs",new ModifyPGDlistCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPGDListAssociationCompleted: Function;
GetPGDListAssociationAsync(oCReqMsgGetPGDListAssociation:CReqMsgGetPGDListAssociation ) : void {
  HelperService.Invoke<CReqMsgGetPGDListAssociation,CResMsgGetPGDListAssociation,GetPGDListAssociationCompletedEventArgs>("IPPMAPrescribableDefnWS.GetPGDListAssociation",oCReqMsgGetPGDListAssociation,this.GetPGDListAssociationCompleted,"PGDName",new GetPGDListAssociationCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetOIDBYFREQUENCYCompleted: Function;
GetOIDBYFREQUENCYAsync(oCReqMsgGetOIDBYFREQUENCY:CReqMsgGetOIDBYFREQUENCY ) : void {
  HelperService.Invoke<CReqMsgGetOIDBYFREQUENCY,CResMsgGetOIDBYFREQUENCY,GetOIDBYFREQUENCYCompletedEventArgs>("IPPMAPrescribableDefnWS.GetOIDBYFREQUENCY",oCReqMsgGetOIDBYFREQUENCY,this.GetOIDBYFREQUENCYCompleted,"sMcVersionNo",new GetOIDBYFREQUENCYCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GETSPROLEASSCNCompleted: Function;
GETSPROLEASSCNAsync(oCReqMsgGETSPROLEASSCN:CReqMsgGETSPROLEASSCN ) : void {
  HelperService.Invoke<CReqMsgGETSPROLEASSCN,CResMsgGETSPROLEASSCN,GETSPROLEASSCNCompletedEventArgs>("IPPMAPrescribableDefnWS.GETSPROLEASSCN",oCReqMsgGETSPROLEASSCN,this.GETSPROLEASSCNCompleted,"sType",new GETSPROLEASSCNCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetIPPInfRateComboValues_P2Completed: Function;
GetIPPInfRateComboValues_P2Async(oCReqMsgGetIPPInfRateComboValues_P2:CReqMsgGetIPPInfRateComboValues_P2 ) : void {
  HelperService.Invoke<CReqMsgGetIPPInfRateComboValues_P2,CResMsgGetIPPInfRateComboValues_P2,GetIPPInfRateComboValues_P2CompletedEventArgs>("IPPMAPrescribableDefnWS.GetIPPInfRateComboValues_P2",oCReqMsgGetIPPInfRateComboValues_P2,this.GetIPPInfRateComboValues_P2Completed,"sMcVersionNo",new GetIPPInfRateComboValues_P2CompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDRCdoseTypesCompleted: Function;
GetDRCdoseTypesAsync(oCReqMsgGetDRCdoseTypes:CReqMsgGetDRCdoseTypes ) : void {
  HelperService.Invoke<CReqMsgGetDRCdoseTypes,CResMsgGetDRCdoseTypes,GetDRCdoseTypesCompletedEventArgs>("IPPMAPrescribableDefnWS.GetDRCdoseTypes",oCReqMsgGetDRCdoseTypes,this.GetDRCdoseTypesCompleted,"MCVersionNo",new GetDRCdoseTypesCompletedEventArgs(), prototypeList, charPropertyLookup);
}

IsAnyDrugContainGivenIngredientCompleted: Function;
IsAnyDrugContainGivenIngredientAsync(oCReqMsgIsAnyDrugContainGivenIngredient:CReqMsgIsAnyDrugContainGivenIngredient ) : void {
  HelperService.Invoke<CReqMsgIsAnyDrugContainGivenIngredient,CResMsgIsAnyDrugContainGivenIngredient,IsAnyDrugContainGivenIngredientCompletedEventArgs>("IPPMAPrescribableDefnWS.IsAnyDrugContainGivenIngredient",oCReqMsgIsAnyDrugContainGivenIngredient,this.IsAnyDrugContainGivenIngredientCompleted,"oMultiComponentItem",new IsAnyDrugContainGivenIngredientCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetSysMultiRoutesCompleted: Function;
GetSysMultiRoutesAsync(oCReqMsgGetSysMultiRoutes:CReqMsgGetSysMultiRoutes ) : void {
  HelperService.Invoke<CReqMsgGetSysMultiRoutes,CResMsgGetSysMultiRoutes,GetSysMultiRoutesCompletedEventArgs>("IPPMAPrescribableDefnWS.GetSysMultiRoutes",oCReqMsgGetSysMultiRoutes,this.GetSysMultiRoutesCompleted,"MCVersion",new GetSysMultiRoutesCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMedBarCodeConfigCompleted: Function;
GetMedBarCodeConfigAsync(oCReqMsgGetMedBarCodeConfig:CReqMsgGetMedBarCodeConfig ) : void {
  HelperService.Invoke<CReqMsgGetMedBarCodeConfig,CResMsgGetMedBarCodeConfig,GetMedBarCodeConfigCompletedEventArgs>("IPPMAPrescribableDefnWS.GetMedBarCodeConfig",oCReqMsgGetMedBarCodeConfig,this.GetMedBarCodeConfigCompleted,"objReqGetMedBarCodeConfig",new GetMedBarCodeConfigCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ManageMedBarcodeCompleted: Function;
ManageMedBarcodeAsync(oCReqMsgManageMedBarcode:CReqMsgManageMedBarcode ) : void {
  HelperService.Invoke<CReqMsgManageMedBarcode,CResMsgManageMedBarcode,ManageMedBarcodeCompletedEventArgs>("IPPMAPrescribableDefnWS.ManageMedBarcode",oCReqMsgManageMedBarcode,this.ManageMedBarcodeCompleted,"oMedBarCodeConfig",new ManageMedBarcodeCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetIngCustDetailsCompleted: Function;
GetIngCustDetailsAsync(oCReqMsgGetIngCustDetails:CReqMsgGetIngCustDetails ) : void {
  HelperService.Invoke<CReqMsgGetIngCustDetails,CResMsgGetIngCustDetails,GetIngCustDetailsCompletedEventArgs>("IPPMAPrescribableDefnWS.GetIngCustDetails",oCReqMsgGetIngCustDetails,this.GetIngCustDetailsCompleted,"sMCVersionNo",new GetIngCustDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CreateDrugRoundProfileCompleted: Function;
CreateDrugRoundProfileAsync(oCReqMsgCreateDrugRoundProfile:CReqMsgCreateDrugRoundProfile ) : void {
  HelperService.Invoke<CReqMsgCreateDrugRoundProfile,CResMsgCreateDrugRoundProfile,CreateDrugRoundProfileCompletedEventArgs>("IPPMAPrescribableDefnWS.CreateDrugRoundProfile",oCReqMsgCreateDrugRoundProfile,this.CreateDrugRoundProfileCompleted,"profile",new CreateDrugRoundProfileCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CopyFromExistingProfileCompleted: Function;
CopyFromExistingProfileAsync(oCReqMsgCopyFromExistingProfile:CReqMsgCopyFromExistingProfile ) : void {
  HelperService.Invoke<CReqMsgCopyFromExistingProfile,CResMsgCopyFromExistingProfile,CopyFromExistingProfileCompletedEventArgs>("IPPMAPrescribableDefnWS.CopyFromExistingProfile",oCReqMsgCopyFromExistingProfile,this.CopyFromExistingProfileCompleted,"objReqCopyFromExistingProfile",new CopyFromExistingProfileCompletedEventArgs(), prototypeList, charPropertyLookup);
}

AssociatedServicePointCompleted: Function;
AssociatedServicePointAsync(oCReqMsgAssociatedServicePoint:CReqMsgAssociatedServicePoint ) : void {
  HelperService.Invoke<CReqMsgAssociatedServicePoint,CResMsgAssociatedServicePoint,AssociatedServicePointCompletedEventArgs>("IPPMAPrescribableDefnWS.AssociatedServicePoint",oCReqMsgAssociatedServicePoint,this.AssociatedServicePointCompleted,"ServicepointOID",new AssociatedServicePointCompletedEventArgs(), prototypeList, charPropertyLookup);
}

IsDuplicateProfileNameCompleted: Function;
IsDuplicateProfileNameAsync(oCReqMsgIsDuplicateProfileName:CReqMsgIsDuplicateProfileName ) : void {
  HelperService.Invoke<CReqMsgIsDuplicateProfileName,CResMsgIsDuplicateProfileName,IsDuplicateProfileNameCompletedEventArgs>("IPPMAPrescribableDefnWS.IsDuplicateProfileName",oCReqMsgIsDuplicateProfileName,this.IsDuplicateProfileNameCompleted,"sName",new IsDuplicateProfileNameCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetTypeBasedFrequencyCompleted: Function;
GetTypeBasedFrequencyAsync(oCReqMsgGetTypeBasedFrequency:CReqMsgGetTypeBasedFrequency ) : void {
  HelperService.Invoke<CReqMsgGetTypeBasedFrequency,CResMsgGetTypeBasedFrequency,GetTypeBasedFrequencyCompletedEventArgs>("IPPMAPrescribableDefnWS.GetTypeBasedFrequency",oCReqMsgGetTypeBasedFrequency,this.GetTypeBasedFrequencyCompleted,"sMCVersion",new GetTypeBasedFrequencyCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDrugprofileCompleted: Function;
GetDrugprofileAsync(oCReqMsgGetDrugprofile:CReqMsgGetDrugprofile ) : void {
  HelperService.Invoke<CReqMsgGetDrugprofile,CResMsgGetDrugprofile,GetDrugprofileCompletedEventArgs>("IPPMAPrescribableDefnWS.GetDrugprofile",oCReqMsgGetDrugprofile,this.GetDrugprofileCompleted,"SearchDetails",new GetDrugprofileCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetWitnessCriteriaCompleted: Function;
GetWitnessCriteriaAsync(oCReqMsgGetWitnessCriteria:CReqMsgGetWitnessCriteria ) : void {
  HelperService.Invoke<CReqMsgGetWitnessCriteria,CResMsgGetWitnessCriteria,GetWitnessCriteriaCompletedEventArgs>("IPPMAPrescribableDefnWS.GetWitnessCriteria",oCReqMsgGetWitnessCriteria,this.GetWitnessCriteriaCompleted,"MCVersion",new GetWitnessCriteriaCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CreateFrequencyCompleted: Function;
CreateFrequencyAsync(oCReqMsgCreateFrequency:CReqMsgCreateFrequency ) : void {
  HelperService.Invoke<CReqMsgCreateFrequency,CResMsgCreateFrequency,CreateFrequencyCompletedEventArgs>("IPPMAPrescribableDefnWS.CreateFrequency",oCReqMsgCreateFrequency,this.CreateFrequencyCompleted,"oFrequency",new CreateFrequencyCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ModifyFrequencyCompleted: Function;
ModifyFrequencyAsync(oCReqMsgModifyFrequency:CReqMsgModifyFrequency ) : void {
  HelperService.Invoke<CReqMsgModifyFrequency,CResMsgModifyFrequency,ModifyFrequencyCompletedEventArgs>("IPPMAPrescribableDefnWS.ModifyFrequency",oCReqMsgModifyFrequency,this.ModifyFrequencyCompleted,"oFrequency",new ModifyFrequencyCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ManageWitnessCriteriaCompleted: Function;
ManageWitnessCriteriaAsync(oCReqMsgManageWitnessCriteria:CReqMsgManageWitnessCriteria ) : void {
  HelperService.Invoke<CReqMsgManageWitnessCriteria,CResMsgManageWitnessCriteria,ManageWitnessCriteriaCompletedEventArgs>("IPPMAPrescribableDefnWS.ManageWitnessCriteria",oCReqMsgManageWitnessCriteria,this.ManageWitnessCriteriaCompleted,"oWitnessCriteria",new ManageWitnessCriteriaCompletedEventArgs(), prototypeList, charPropertyLookup);
}

IsWitnessRequiredCompleted: Function;
IsWitnessRequiredAsync(oCReqMsgIsWitnessRequired:CReqMsgIsWitnessRequired ) : void {
  HelperService.Invoke<CReqMsgIsWitnessRequired,CResMsgIsWitnessRequired,IsWitnessRequiredCompletedEventArgs>("IPPMAPrescribableDefnWS.IsWitnessRequired",oCReqMsgIsWitnessRequired,this.IsWitnessRequiredCompleted,"Criteria",new IsWitnessRequiredCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetIngredientWarningCompleted: Function;
GetIngredientWarningAsync(oCReqMsgGetIngredientWarning:CReqMsgGetIngredientWarning ) : void {
  HelperService.Invoke<CReqMsgGetIngredientWarning,CResMsgGetIngredientWarning,GetIngredientWarningCompletedEventArgs>("IPPMAPrescribableDefnWS.GetIngredientWarning",oCReqMsgGetIngredientWarning,this.GetIngredientWarningCompleted,"WarningMesaageType",new GetIngredientWarningCompletedEventArgs(), prototypeList, charPropertyLookup);
}

DrugRoundManageActivePeriodsCompleted: Function;
DrugRoundManageActivePeriodsAsync(oCReqMsgDrugRoundManageActivePeriods:CReqMsgDrugRoundManageActivePeriods ) : void {
  HelperService.Invoke<CReqMsgDrugRoundManageActivePeriods,CResMsgDrugRoundManageActivePeriods,DrugRoundManageActivePeriodsCompletedEventArgs>("IPPMAPrescribableDefnWS.DrugRoundManageActivePeriods",oCReqMsgDrugRoundManageActivePeriods,this.DrugRoundManageActivePeriodsCompleted,"oManageActivePeriods",new DrugRoundManageActivePeriodsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDrugRoundProfielByOIDCompleted: Function;
GetDrugRoundProfielByOIDAsync(oCReqMsgGetDrugRoundProfielByOID:CReqMsgGetDrugRoundProfielByOID ) : void {
  HelperService.Invoke<CReqMsgGetDrugRoundProfielByOID,CResMsgGetDrugRoundProfielByOID,GetDrugRoundProfielByOIDCompletedEventArgs>("IPPMAPrescribableDefnWS.GetDrugRoundProfielByOID",oCReqMsgGetDrugRoundProfielByOID,this.GetDrugRoundProfielByOIDCompleted,"oDeactivateEntity",new GetDrugRoundProfielByOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ModifyDrugRoundProfileCompleted: Function;
ModifyDrugRoundProfileAsync(oCReqMsgModifyDrugRoundProfile:CReqMsgModifyDrugRoundProfile ) : void {
  HelperService.Invoke<CReqMsgModifyDrugRoundProfile,CResMsgModifyDrugRoundProfile,ModifyDrugRoundProfileCompletedEventArgs>("IPPMAPrescribableDefnWS.ModifyDrugRoundProfile",oCReqMsgModifyDrugRoundProfile,this.ModifyDrugRoundProfileCompleted,"profile",new ModifyDrugRoundProfileCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetItemFrequencyCompleted: Function;
GetItemFrequencyAsync(oCReqMsgGetItemFrequency:CReqMsgGetItemFrequency ) : void {
  HelperService.Invoke<CReqMsgGetItemFrequency,CResMsgGetItemFrequency,GetItemFrequencyCompletedEventArgs>("IPPMAPrescribableDefnWS.GetItemFrequency",oCReqMsgGetItemFrequency,this.GetItemFrequencyCompleted,"DrugRoundOID",new GetItemFrequencyCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetServicePointCompleted: Function;
GetServicePointAsync(oCReqMsgGetServicePoint:CReqMsgGetServicePoint ) : void {
  HelperService.Invoke<CReqMsgGetServicePoint,CResMsgGetServicePoint,GetServicePointCompletedEventArgs>("IPPMAPrescribableDefnWS.GetServicePoint",oCReqMsgGetServicePoint,this.GetServicePointCompleted,"DrugRoundOID",new GetServicePointCompletedEventArgs(), prototypeList, charPropertyLookup);
}

PGDManageActivePeriodsCompleted: Function;
PGDManageActivePeriodsAsync(oCReqMsgPGDManageActivePeriods:CReqMsgPGDManageActivePeriods ) : void {
  HelperService.Invoke<CReqMsgPGDManageActivePeriods,CResMsgPGDManageActivePeriods,PGDManageActivePeriodsCompletedEventArgs>("IPPMAPrescribableDefnWS.PGDManageActivePeriods",oCReqMsgPGDManageActivePeriods,this.PGDManageActivePeriodsCompleted,"oManageActivePeriods",new PGDManageActivePeriodsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GETPGDOBJECTBYOIDCompleted: Function;
GETPGDOBJECTBYOIDAsync(oCReqMsgGETPGDOBJECTBYOID:CReqMsgGETPGDOBJECTBYOID ) : void {
  HelperService.Invoke<CReqMsgGETPGDOBJECTBYOID,CResMsgGETPGDOBJECTBYOID,GETPGDOBJECTBYOIDCompletedEventArgs>("IPPMAPrescribableDefnWS.GETPGDOBJECTBYOID",oCReqMsgGETPGDOBJECTBYOID,this.GETPGDOBJECTBYOIDCompleted,"oDeactivateEntity",new GETPGDOBJECTBYOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPGDListViewCompleted: Function;
GetPGDListViewAsync(oCReqMsgGetPGDListView:CReqMsgGetPGDListView ) : void {
  HelperService.Invoke<CReqMsgGetPGDListView,CResMsgGetPGDListView,GetPGDListViewCompletedEventArgs>("IPPMAPrescribableDefnWS.GetPGDListView",oCReqMsgGetPGDListView,this.GetPGDListViewCompleted,"lnEndRow",new GetPGDListViewCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CreatePGDListCompleted: Function;
CreatePGDListAsync(oCReqMsgCreatePGDList:CReqMsgCreatePGDList ) : void {
  HelperService.Invoke<CReqMsgCreatePGDList,CResMsgCreatePGDList,CreatePGDListCompletedEventArgs>("IPPMAPrescribableDefnWS.CreatePGDList",oCReqMsgCreatePGDList,this.CreatePGDListCompleted,"oPGDlist",new CreatePGDListCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ModifyStockRegisterCompleted: Function;
ModifyStockRegisterAsync(oCReqMsgModifyStockRegister:CReqMsgModifyStockRegister ) : void {
  HelperService.Invoke<CReqMsgModifyStockRegister,CResMsgModifyStockRegister,ModifyStockRegisterCompletedEventArgs>("IPPMAPrescribableDefnWS.ModifyStockRegister",oCReqMsgModifyStockRegister,this.ModifyStockRegisterCompleted,"oStockRegister",new ModifyStockRegisterCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CheckDuplicateDrugRegCompleted: Function;
CheckDuplicateDrugRegAsync(oCReqMsgCheckDuplicateDrugReg:CReqMsgCheckDuplicateDrugReg ) : void {
  HelperService.Invoke<CReqMsgCheckDuplicateDrugReg,CResMsgCheckDuplicateDrugReg,CheckDuplicateDrugRegCompletedEventArgs>("IPPMAPrescribableDefnWS.CheckDuplicateDrugReg",oCReqMsgCheckDuplicateDrugReg,this.CheckDuplicateDrugRegCompleted,"LocationOID",new CheckDuplicateDrugRegCompletedEventArgs(), prototypeList, charPropertyLookup);
}

SearchStockRegisterCompleted: Function;
SearchStockRegisterAsync(oCReqMsgSearchStockRegister:CReqMsgSearchStockRegister ) : void {
  HelperService.Invoke<CReqMsgSearchStockRegister,CResMsgSearchStockRegister,SearchStockRegisterCompletedEventArgs>("IPPMAPrescribableDefnWS.SearchStockRegister",oCReqMsgSearchStockRegister,this.SearchStockRegisterCompleted,"oSearch",new SearchStockRegisterCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetWardListCompleted: Function;
GetWardListAsync(oCReqMsgGetWardList:CReqMsgGetWardList ) : void {
  HelperService.Invoke<CReqMsgGetWardList,CResMsgGetWardList,GetWardListCompletedEventArgs>("IPPMAPrescribableDefnWS.GetWardList",oCReqMsgGetWardList,this.GetWardListCompleted,"objReqGetWardList",new GetWardListCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetStockItemsCompleted: Function;
GetStockItemsAsync(oCReqMsgGetStockItems:CReqMsgGetStockItems ) : void {
  HelperService.Invoke<CReqMsgGetStockItems,CResMsgGetStockItems,GetStockItemsCompletedEventArgs>("IPPMAPrescribableDefnWS.GetStockItems",oCReqMsgGetStockItems,this.GetStockItemsCompleted,"MCVersion",new GetStockItemsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetStockDetailsCompleted: Function;
GetStockDetailsAsync(oCReqMsgGetStockDetails:CReqMsgGetStockDetails ) : void {
  HelperService.Invoke<CReqMsgGetStockDetails,CResMsgGetStockDetails,GetStockDetailsCompletedEventArgs>("IPPMAPrescribableDefnWS.GetStockDetails",oCReqMsgGetStockDetails,this.GetStockDetailsCompleted,"StockOID",new GetStockDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

StkRegManageActivePeriodsCompleted: Function;
StkRegManageActivePeriodsAsync(oCReqMsgStkRegManageActivePeriods:CReqMsgStkRegManageActivePeriods ) : void {
  HelperService.Invoke<CReqMsgStkRegManageActivePeriods,CResMsgStkRegManageActivePeriods,StkRegManageActivePeriodsCompletedEventArgs>("IPPMAPrescribableDefnWS.StkRegManageActivePeriods",oCReqMsgStkRegManageActivePeriods,this.StkRegManageActivePeriodsCompleted,"oManageActivePeriods",new StkRegManageActivePeriodsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetSupplyPackUOMCompleted: Function;
GetSupplyPackUOMAsync(oCReqMsgGetSupplyPackUOM:CReqMsgGetSupplyPackUOM ) : void {
  HelperService.Invoke<CReqMsgGetSupplyPackUOM,CResMsgGetSupplyPackUOM,GetSupplyPackUOMCompletedEventArgs>("IPPMAPrescribableDefnWS.GetSupplyPackUOM",oCReqMsgGetSupplyPackUOM,this.GetSupplyPackUOMCompleted,"sMCVersion",new GetSupplyPackUOMCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CreateOrderSetCompleted: Function;
CreateOrderSetAsync(oCReqMsgCreateOrderSet:CReqMsgCreateOrderSet ) : void {
  HelperService.Invoke<CReqMsgCreateOrderSet,CResMsgCreateOrderSet,CreateOrderSetCompletedEventArgs>("IPPMAPrescribableDefnWS.CreateOrderSet",oCReqMsgCreateOrderSet,this.CreateOrderSetCompleted,"oOrderSet",new CreateOrderSetCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ModifyOrderSetCompleted: Function;
ModifyOrderSetAsync(oCReqMsgModifyOrderSet:CReqMsgModifyOrderSet ) : void {
  HelperService.Invoke<CReqMsgModifyOrderSet,CResMsgModifyOrderSet,ModifyOrderSetCompletedEventArgs>("IPPMAPrescribableDefnWS.ModifyOrderSet",oCReqMsgModifyOrderSet,this.ModifyOrderSetCompleted,"oOrderSet",new ModifyOrderSetCompletedEventArgs(), prototypeList, charPropertyLookup);
}

SearchOrderSetCompleted: Function;
SearchOrderSetAsync(oCReqMsgSearchOrderSet:CReqMsgSearchOrderSet ) : void {
  HelperService.Invoke<CReqMsgSearchOrderSet,CResMsgSearchOrderSet,SearchOrderSetCompletedEventArgs>("IPPMAPrescribableDefnWS.SearchOrderSet",oCReqMsgSearchOrderSet,this.SearchOrderSetCompleted,"oSearch",new SearchOrderSetCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetOrderSetDetailsCompleted: Function;
GetOrderSetDetailsAsync(oCReqMsgGetOrderSetDetails:CReqMsgGetOrderSetDetails ) : void {
  HelperService.Invoke<CReqMsgGetOrderSetDetails,CResMsgGetOrderSetDetails,GetOrderSetDetailsCompletedEventArgs>("IPPMAPrescribableDefnWS.GetOrderSetDetails",oCReqMsgGetOrderSetDetails,this.GetOrderSetDetailsCompleted,"MCVersion",new GetOrderSetDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetOrderSetItemCompleted: Function;
GetOrderSetItemAsync(oCReqMsgGetOrderSetItem:CReqMsgGetOrderSetItem ) : void {
  HelperService.Invoke<CReqMsgGetOrderSetItem,CResMsgGetOrderSetItem,GetOrderSetItemCompletedEventArgs>("IPPMAPrescribableDefnWS.GetOrderSetItem",oCReqMsgGetOrderSetItem,this.GetOrderSetItemCompleted,"MCVersion",new GetOrderSetItemCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetOSHeaderByOIDCompleted: Function;
GetOSHeaderByOIDAsync(oCReqMsgGetOSHeaderByOID:CReqMsgGetOSHeaderByOID ) : void {
  HelperService.Invoke<CReqMsgGetOSHeaderByOID,CResMsgGetOSHeaderByOID,GetOSHeaderByOIDCompletedEventArgs>("IPPMAPrescribableDefnWS.GetOSHeaderByOID",oCReqMsgGetOSHeaderByOID,this.GetOSHeaderByOIDCompleted,"MCVersion",new GetOSHeaderByOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetOrderSetListCompleted: Function;
GetOrderSetListAsync(oCReqMsgGetOrderSetList:CReqMsgGetOrderSetList ) : void {
  HelperService.Invoke<CReqMsgGetOrderSetList,CResMsgGetOrderSetList,GetOrderSetListCompletedEventArgs>("IPPMAPrescribableDefnWS.GetOrderSetList",oCReqMsgGetOrderSetList,this.GetOrderSetListCompleted,"objReqGetOrderSetList",new GetOrderSetListCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetBasicSearchOrderSetsCompleted: Function;
GetBasicSearchOrderSetsAsync(oCReqMsgGetBasicSearchOrderSets:CReqMsgGetBasicSearchOrderSets ) : void {
  HelperService.Invoke<CReqMsgGetBasicSearchOrderSets,CResMsgGetBasicSearchOrderSets,GetBasicSearchOrderSetsCompletedEventArgs>("IPPMAPrescribableDefnWS.GetBasicSearchOrderSets",oCReqMsgGetBasicSearchOrderSets,this.GetBasicSearchOrderSetsCompleted,"oSearch",new GetBasicSearchOrderSetsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CheckOrderSetDuplicateCompleted: Function;
CheckOrderSetDuplicateAsync(oCReqMsgCheckOrderSetDuplicate:CReqMsgCheckOrderSetDuplicate ) : void {
  HelperService.Invoke<CReqMsgCheckOrderSetDuplicate,CResMsgCheckOrderSetDuplicate,CheckOrderSetDuplicateCompletedEventArgs>("IPPMAPrescribableDefnWS.CheckOrderSetDuplicate",oCReqMsgCheckOrderSetDuplicate,this.CheckOrderSetDuplicateCompleted,"OrderSet",new CheckOrderSetDuplicateCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFavouritesTreeHierarchyCompleted: Function;
GetFavouritesTreeHierarchyAsync(oCReqMsgGetFavouritesTreeHierarchy:CReqMsgGetFavouritesTreeHierarchy ) : void {
  HelperService.Invoke<CReqMsgGetFavouritesTreeHierarchy,CResMsgGetFavouritesTreeHierarchy,GetFavouritesTreeHierarchyCompletedEventArgs>("IPPMAPrescribableDefnWS.GetFavouritesTreeHierarchy",oCReqMsgGetFavouritesTreeHierarchy,this.GetFavouritesTreeHierarchyCompleted,"oFavTreeInput",new GetFavouritesTreeHierarchyCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetOrderSetDetsByOIDCompleted: Function;
GetOrderSetDetsByOIDAsync(oCReqMsgGetOrderSetDetsByOID:CReqMsgGetOrderSetDetsByOID ) : void {
  HelperService.Invoke<CReqMsgGetOrderSetDetsByOID,CResMsgGetOrderSetDetsByOID,GetOrderSetDetsByOIDCompletedEventArgs>("IPPMAPrescribableDefnWS.GetOrderSetDetsByOID",oCReqMsgGetOrderSetDetsByOID,this.GetOrderSetDetsByOIDCompleted,"MCVersion",new GetOrderSetDetsByOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

OrderSetManageActivePeriodsCompleted: Function;
OrderSetManageActivePeriodsAsync(oCReqMsgOrderSetManageActivePeriods:CReqMsgOrderSetManageActivePeriods ) : void {
  HelperService.Invoke<CReqMsgOrderSetManageActivePeriods,CResMsgOrderSetManageActivePeriods,OrderSetManageActivePeriodsCompletedEventArgs>("IPPMAPrescribableDefnWS.OrderSetManageActivePeriods",oCReqMsgOrderSetManageActivePeriods,this.OrderSetManageActivePeriodsCompleted,"oManageActivePeriods",new OrderSetManageActivePeriodsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CheckIsInfusionRouteCompleted: Function;
CheckIsInfusionRouteAsync(oCReqMsgCheckIsInfusionRoute:CReqMsgCheckIsInfusionRoute ) : void {
  HelperService.Invoke<CReqMsgCheckIsInfusionRoute,CResMsgCheckIsInfusionRoute,CheckIsInfusionRouteCompletedEventArgs>("IPPMAPrescribableDefnWS.CheckIsInfusionRoute",oCReqMsgCheckIsInfusionRoute,this.CheckIsInfusionRouteCompleted,"sMcVersionNo",new CheckIsInfusionRouteCompletedEventArgs(), prototypeList, charPropertyLookup);
}

HOCustomisePresItemCompleted: Function;
HOCustomisePresItemAsync(oCReqMsgHOCustomisePresItem:CReqMsgHOCustomisePresItem ) : void {
  HelperService.Invoke<CReqMsgHOCustomisePresItem,CResMsgHOCustomisePresItem,HOCustomisePresItemCompletedEventArgs>("IPPMAPrescribableDefnWS.HOCustomisePresItem",oCReqMsgHOCustomisePresItem,this.HOCustomisePresItemCompleted,"oCustomisePresItem",new HOCustomisePresItemCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetHOCustomisePresItemCompleted: Function;
GetHOCustomisePresItemAsync(oCReqMsgGetHOCustomisePresItem:CReqMsgGetHOCustomisePresItem ) : void {
  HelperService.Invoke<CReqMsgGetHOCustomisePresItem,CResMsgGetHOCustomisePresItem,GetHOCustomisePresItemCompletedEventArgs>("IPPMAPrescribableDefnWS.GetHOCustomisePresItem",oCReqMsgGetHOCustomisePresItem,this.GetHOCustomisePresItemCompleted,"oCustomisePresItem",new GetHOCustomisePresItemCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDRCIndicationCompleted: Function;
GetDRCIndicationAsync(oCReqMsgGetDRCIndication:CReqMsgGetDRCIndication ) : void {
  HelperService.Invoke<CReqMsgGetDRCIndication,CResMsgGetDRCIndication,GetDRCIndicationCompletedEventArgs>("IPPMAPrescribableDefnWS.GetDRCIndication",oCReqMsgGetDRCIndication,this.GetDRCIndicationCompleted,"sMcVersionNo",new GetDRCIndicationCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDRCDetailsCompleted: Function;
GetDRCDetailsAsync(oCReqMsgGetDRCDetails:CReqMsgGetDRCDetails ) : void {
  HelperService.Invoke<CReqMsgGetDRCDetails,CResMsgGetDRCDetails,GetDRCDetailsCompletedEventArgs>("IPPMAPrescribableDefnWS.GetDRCDetails",oCReqMsgGetDRCDetails,this.GetDRCDetailsCompleted,"sindicationid",new GetDRCDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ChkRouteAssocAnyDOSCompleted: Function;
ChkRouteAssocAnyDOSAsync(oCReqMsgChkRouteAssocAnyDOS:CReqMsgChkRouteAssocAnyDOS ) : void {
  HelperService.Invoke<CReqMsgChkRouteAssocAnyDOS,CResMsgChkRouteAssocAnyDOS,ChkRouteAssocAnyDOSCompletedEventArgs>("IPPMAPrescribableDefnWS.ChkRouteAssocAnyDOS",oCReqMsgChkRouteAssocAnyDOS,this.ChkRouteAssocAnyDOSCompleted,"MCVersionNo",new ChkRouteAssocAnyDOSCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDosageFormTypeCompleted: Function;
GetDosageFormTypeAsync(oCReqMsgGetDosageFormType:CReqMsgGetDosageFormType ) : void {
  HelperService.Invoke<CReqMsgGetDosageFormType,CResMsgGetDosageFormType,GetDosageFormTypeCompletedEventArgs>("IPPMAPrescribableDefnWS.GetDosageFormType",oCReqMsgGetDosageFormType,this.GetDosageFormTypeCompleted,"sMCVersion",new GetDosageFormTypeCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetProductForVMCompleted: Function;
GetProductForVMAsync(oCReqMsgGetProductForVM:CReqMsgGetProductForVM ) : void {
  HelperService.Invoke<CReqMsgGetProductForVM,CResMsgGetProductForVM,GetProductForVMCompletedEventArgs>("IPPMAPrescribableDefnWS.GetProductForVM",oCReqMsgGetProductForVM,this.GetProductForVMCompleted,"sMcVersionNo",new GetProductForVMCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFormularyDetailsCompleted: Function;
GetFormularyDetailsAsync(oCReqMsgGetFormularyDetails:CReqMsgGetFormularyDetails ) : void {
  HelperService.Invoke<CReqMsgGetFormularyDetails,CResMsgGetFormularyDetails,GetFormularyDetailsCompletedEventArgs>("IPPMAPrescribableDefnWS.GetFormularyDetails",oCReqMsgGetFormularyDetails,this.GetFormularyDetailsCompleted,"sMenucode",new GetFormularyDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CheckDuplicateFormularyCompleted: Function;
CheckDuplicateFormularyAsync(oCReqMsgCheckDuplicateFormulary:CReqMsgCheckDuplicateFormulary ) : void {
  HelperService.Invoke<CReqMsgCheckDuplicateFormulary,CResMsgCheckDuplicateFormulary,CheckDuplicateFormularyCompletedEventArgs>("IPPMAPrescribableDefnWS.CheckDuplicateFormulary",oCReqMsgCheckDuplicateFormulary,this.CheckDuplicateFormularyCompleted,"lnOrganisationOID",new CheckDuplicateFormularyCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CheckDuplicateMainFormularyCompleted: Function;
CheckDuplicateMainFormularyAsync(oCReqMsgCheckDuplicateMainFormulary:CReqMsgCheckDuplicateMainFormulary ) : void {
  HelperService.Invoke<CReqMsgCheckDuplicateMainFormulary,CResMsgCheckDuplicateMainFormulary,CheckDuplicateMainFormularyCompletedEventArgs>("IPPMAPrescribableDefnWS.CheckDuplicateMainFormulary",oCReqMsgCheckDuplicateMainFormulary,this.CheckDuplicateMainFormularyCompleted,"lnOrganisationOID",new CheckDuplicateMainFormularyCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CreateFormularyCompleted: Function;
CreateFormularyAsync(oCReqMsgCreateFormulary:CReqMsgCreateFormulary ) : void {
  HelperService.Invoke<CReqMsgCreateFormulary,CResMsgCreateFormulary,CreateFormularyCompletedEventArgs>("IPPMAPrescribableDefnWS.CreateFormulary",oCReqMsgCreateFormulary,this.CreateFormularyCompleted,"oDataFilter",new CreateFormularyCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ManageFormularyCompleted: Function;
ManageFormularyAsync(oCReqMsgManageFormulary:CReqMsgManageFormulary ) : void {
  HelperService.Invoke<CReqMsgManageFormulary,CResMsgManageFormulary,ManageFormularyCompletedEventArgs>("IPPMAPrescribableDefnWS.ManageFormulary",oCReqMsgManageFormulary,this.ManageFormularyCompleted,"oDataFilter",new ManageFormularyCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetGPConnectConfigurationCompleted: Function;
GetGPConnectConfigurationAsync(oCReqMsgGetGPConnectConfiguration:CReqMsgGetGPConnectConfiguration ) : void {
  HelperService.Invoke<CReqMsgGetGPConnectConfiguration,CResMsgGetGPConnectConfiguration,GetGPConnectConfigurationCompletedEventArgs>("IPPMAPrescribableDefnWS.GetGPConnectConfiguration",oCReqMsgGetGPConnectConfiguration,this.GetGPConnectConfigurationCompleted,"MCVersionNo",new GetGPConnectConfigurationCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ManageGPConnectConfigurationCompleted: Function;
ManageGPConnectConfigurationAsync(oCReqMsgManageGPConnectConfiguration:CReqMsgManageGPConnectConfiguration ) : void {
  HelperService.Invoke<CReqMsgManageGPConnectConfiguration,CResMsgManageGPConnectConfiguration,ManageGPConnectConfigurationCompletedEventArgs>("IPPMAPrescribableDefnWS.ManageGPConnectConfiguration",oCReqMsgManageGPConnectConfiguration,this.ManageGPConnectConfigurationCompleted,"oManageGPCConfiguration",new ManageGPConnectConfigurationCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetIsDefaultValuesCompleted: Function;
GetIsDefaultValuesAsync(oCReqMsgGetIsDefaultValues:CReqMsgGetIsDefaultValues ) : void {
  HelperService.Invoke<CReqMsgGetIsDefaultValues,CResMsgGetIsDefaultValues,GetIsDefaultValuesCompletedEventArgs>("IPPMAPrescribableDefnWS.GetIsDefaultValues",oCReqMsgGetIsDefaultValues,this.GetIsDefaultValuesCompleted,"CareActivity",new GetIsDefaultValuesCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ChkDupItemlistCompleted: Function;
ChkDupItemlistAsync(oCReqMsgChkDupItemlist:CReqMsgChkDupItemlist ) : void {
  HelperService.Invoke<CReqMsgChkDupItemlist,CResMsgChkDupItemlist,ChkDupItemlistCompletedEventArgs>("IPPMAPrescribableDefnWS.ChkDupItemlist",oCReqMsgChkDupItemlist,this.ChkDupItemlistCompleted,"sMCVersion",new ChkDupItemlistCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFormularyItemDetailsCompleted: Function;
GetFormularyItemDetailsAsync(oCReqMsgGetFormularyItemDetails:CReqMsgGetFormularyItemDetails ) : void {
  HelperService.Invoke<CReqMsgGetFormularyItemDetails,CResMsgGetFormularyItemDetails,GetFormularyItemDetailsCompletedEventArgs>("IPPMAPrescribableDefnWS.GetFormularyItemDetails",oCReqMsgGetFormularyItemDetails,this.GetFormularyItemDetailsCompleted,"objSerachFormularyDetail",new GetFormularyItemDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPrescribableItemListSFSCompleted: Function;
GetPrescribableItemListSFSAsync(oCReqMsgGetPrescribableItemListSFS:CReqMsgGetPrescribableItemListSFS ) : void {
  HelperService.Invoke<CReqMsgGetPrescribableItemListSFS,CResMsgGetPrescribableItemListSFS,GetPrescribableItemListSFSCompletedEventArgs>("IPPMAPrescribableDefnWS.GetPrescribableItemListSFS",oCReqMsgGetPrescribableItemListSFS,this.GetPrescribableItemListSFSCompleted,"objPrescribableItemSFS",new GetPrescribableItemListSFSCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CreateIngredientCompleted: Function;
CreateIngredientAsync(oCReqMsgCreateIngredient:CReqMsgCreateIngredient ) : void {
  HelperService.Invoke<CReqMsgCreateIngredient,CResMsgCreateIngredient,CreateIngredientCompletedEventArgs>("IPPMAPrescribableDefnWS.CreateIngredient",oCReqMsgCreateIngredient,this.CreateIngredientCompleted,"oIngredient",new CreateIngredientCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ManageIngredientCompleted: Function;
ManageIngredientAsync(oCReqMsgManageIngredient:CReqMsgManageIngredient ) : void {
  HelperService.Invoke<CReqMsgManageIngredient,CResMsgManageIngredient,ManageIngredientCompletedEventArgs>("IPPMAPrescribableDefnWS.ManageIngredient",oCReqMsgManageIngredient,this.ManageIngredientCompleted,"oIngredient",new ManageIngredientCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetIngredientCompleted: Function;
GetIngredientAsync(oCReqMsgGetIngredient:CReqMsgGetIngredient ) : void {
  HelperService.Invoke<CReqMsgGetIngredient,CResMsgGetIngredient,GetIngredientCompletedEventArgs>("IPPMAPrescribableDefnWS.GetIngredient",oCReqMsgGetIngredient,this.GetIngredientCompleted,"objIngredientListView",new GetIngredientCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CheckIngredientIsLinkedCompleted: Function;
CheckIngredientIsLinkedAsync(oCReqMsgCheckIngredientIsLinked:CReqMsgCheckIngredientIsLinked ) : void {
  HelperService.Invoke<CReqMsgCheckIngredientIsLinked,CResMsgCheckIngredientIsLinked,CheckIngredientIsLinkedCompletedEventArgs>("IPPMAPrescribableDefnWS.CheckIngredientIsLinked",oCReqMsgCheckIngredientIsLinked,this.CheckIngredientIsLinkedCompleted,"sMcVersionNo",new CheckIngredientIsLinkedCompletedEventArgs(), prototypeList, charPropertyLookup);
}

SearchIngredientCompleted: Function;
SearchIngredientAsync(oCReqMsgSearchIngredient:CReqMsgSearchIngredient ) : void {
  HelperService.Invoke<CReqMsgSearchIngredient,CResMsgSearchIngredient,SearchIngredientCompletedEventArgs>("IPPMAPrescribableDefnWS.SearchIngredient",oCReqMsgSearchIngredient,this.SearchIngredientCompleted,"objIngredientListView",new SearchIngredientCompletedEventArgs(), prototypeList, charPropertyLookup);
}

SearchIngredientSFSCompleted: Function;
SearchIngredientSFSAsync(oCReqMsgSearchIngredientSFS:CReqMsgSearchIngredientSFS ) : void {
  HelperService.Invoke<CReqMsgSearchIngredientSFS,CResMsgSearchIngredientSFS,SearchIngredientSFSCompletedEventArgs>("IPPMAPrescribableDefnWS.SearchIngredientSFS",oCReqMsgSearchIngredientSFS,this.SearchIngredientSFSCompleted,"objIngredientListView",new SearchIngredientSFSCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetProductPackCompleted: Function;
GetProductPackAsync(oCReqMsgGetProductPack:CReqMsgGetProductPack ) : void {
  HelperService.Invoke<CReqMsgGetProductPack,CResMsgGetProductPack,GetProductPackCompletedEventArgs>("IPPMAPrescribableDefnWS.GetProductPack",oCReqMsgGetProductPack,this.GetProductPackCompleted,"oSearch",new GetProductPackCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ManageEANCodeCompleted: Function;
ManageEANCodeAsync(oCReqMsgManageEANCode:CReqMsgManageEANCode ) : void {
  HelperService.Invoke<CReqMsgManageEANCode,CResMsgManageEANCode,ManageEANCodeCompletedEventArgs>("IPPMAPrescribableDefnWS.ManageEANCode",oCReqMsgManageEANCode,this.ManageEANCodeCompleted,"oManagedEANCode",new ManageEANCodeCompletedEventArgs(), prototypeList, charPropertyLookup);
}

IsEANCodeExistCompleted: Function;
IsEANCodeExistAsync(oCReqMsgIsEANCodeExist:CReqMsgIsEANCodeExist ) : void {
  HelperService.Invoke<CReqMsgIsEANCodeExist,CResMsgIsEANCodeExist,IsEANCodeExistCompletedEventArgs>("IPPMAPrescribableDefnWS.IsEANCodeExist",oCReqMsgIsEANCodeExist,this.IsEANCodeExistCompleted,"mcversion",new IsEANCodeExistCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetIPPMAProcessingDetailsCompleted: Function;
GetIPPMAProcessingDetailsAsync(oCReqMsgGetIPPMAProcessingDetails:CReqMsgGetIPPMAProcessingDetails ) : void {
  HelperService.Invoke<CReqMsgGetIPPMAProcessingDetails,CResMsgGetIPPMAProcessingDetails,GetIPPMAProcessingDetailsCompletedEventArgs>("IPPMAPrescribableDefnWS.GetIPPMAProcessingDetails",oCReqMsgGetIPPMAProcessingDetails,this.GetIPPMAProcessingDetailsCompleted,"sMcVersionNo",new GetIPPMAProcessingDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetIPPMAIsDefaultValuesCompleted: Function;
GetIPPMAIsDefaultValuesAsync(oCReqMsgGetIPPMAIsDefaultValues:CReqMsgGetIPPMAIsDefaultValues ) : void {
  HelperService.Invoke<CReqMsgGetIPPMAIsDefaultValues,CResMsgGetIPPMAIsDefaultValues,GetIPPMAIsDefaultValuesCompletedEventArgs>("IPPMAPrescribableDefnWS.GetIPPMAIsDefaultValues",oCReqMsgGetIPPMAIsDefaultValues,this.GetIPPMAIsDefaultValuesCompleted,"FormularyOID",new GetIPPMAIsDefaultValuesCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetItemUOMCompleted: Function;
GetItemUOMAsync(oCReqMsgGetItemUOM:CReqMsgGetItemUOM ) : void {
  HelperService.Invoke<CReqMsgGetItemUOM,CResMsgGetItemUOM,GetItemUOMCompletedEventArgs>("IPPMAPrescribableDefnWS.GetItemUOM",oCReqMsgGetItemUOM,this.GetItemUOMCompleted,"sMCVersion",new GetItemUOMCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMultiComponentListCompleted: Function;
GetMultiComponentListAsync(oCReqMsgGetMultiComponentList:CReqMsgGetMultiComponentList ) : void {
  HelperService.Invoke<CReqMsgGetMultiComponentList,CResMsgGetMultiComponentList,GetMultiComponentListCompletedEventArgs>("IPPMAPrescribableDefnWS.GetMultiComponentList",oCReqMsgGetMultiComponentList,this.GetMultiComponentListCompleted,"sMCVersion",new GetMultiComponentListCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMultiComponentCompleted: Function;
GetMultiComponentAsync(oCReqMsgGetMultiComponent:CReqMsgGetMultiComponent ) : void {
  HelperService.Invoke<CReqMsgGetMultiComponent,CResMsgGetMultiComponent,GetMultiComponentCompletedEventArgs>("IPPMAPrescribableDefnWS.GetMultiComponent",oCReqMsgGetMultiComponent,this.GetMultiComponentCompleted,"sPageSize",new GetMultiComponentCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GenerateConflictsForMulticomponentCompleted: Function;
GenerateConflictsForMulticomponentAsync(oCReqMsgGenerateConflictsForMulticomponent:CReqMsgGenerateConflictsForMulticomponent ) : void {
  HelperService.Invoke<CReqMsgGenerateConflictsForMulticomponent,CResMsgGenerateConflictsForMulticomponent,GenerateConflictsForMulticomponentCompletedEventArgs>("IPPMAPrescribableDefnWS.GenerateConflictsForMulticomponent",oCReqMsgGenerateConflictsForMulticomponent,this.GenerateConflictsForMulticomponentCompleted,"objDecisionSuppCriteria",new GenerateConflictsForMulticomponentCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetIPPFrmlyComboValuesCompleted: Function;
GetIPPFrmlyComboValuesAsync(oCReqMsgGetIPPFrmlyComboValues:CReqMsgGetIPPFrmlyComboValues ) : void {
  HelperService.Invoke<CReqMsgGetIPPFrmlyComboValues,CResMsgGetIPPFrmlyComboValues,GetIPPFrmlyComboValuesCompletedEventArgs>("IPPMAPrescribableDefnWS.GetIPPFrmlyComboValues",oCReqMsgGetIPPFrmlyComboValues,this.GetIPPFrmlyComboValuesCompleted,"sMultiCompDetails",new GetIPPFrmlyComboValuesCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetCompatibleComponentDetCompleted: Function;
GetCompatibleComponentDetAsync(oCReqMsgGetCompatibleComponentDet:CReqMsgGetCompatibleComponentDet ) : void {
  HelperService.Invoke<CReqMsgGetCompatibleComponentDet,CResMsgGetCompatibleComponentDet,GetCompatibleComponentDetCompletedEventArgs>("IPPMAPrescribableDefnWS.GetCompatibleComponentDet",oCReqMsgGetCompatibleComponentDet,this.GetCompatibleComponentDetCompleted,"sMcversionNo",new GetCompatibleComponentDetCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CreateStockRegisterCompleted: Function;
CreateStockRegisterAsync(oCReqMsgCreateStockRegister:CReqMsgCreateStockRegister ) : void {
  HelperService.Invoke<CReqMsgCreateStockRegister,CResMsgCreateStockRegister,CreateStockRegisterCompletedEventArgs>("IPPMAPrescribableDefnWS.CreateStockRegister",oCReqMsgCreateStockRegister,this.CreateStockRegisterCompleted,"oStockRegister",new CreateStockRegisterCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDosageFormCompleted: Function;
GetDosageFormAsync(oCReqMsgGetDosageForm:CReqMsgGetDosageForm ) : void {
  HelperService.Invoke<CReqMsgGetDosageForm,CResMsgGetDosageForm,GetDosageFormCompletedEventArgs>("IPPMAPrescribableDefnWS.GetDosageForm",oCReqMsgGetDosageForm,this.GetDosageFormCompleted,"oDosageForm",new GetDosageFormCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ManageDosageFormCompleted: Function;
ManageDosageFormAsync(oCReqMsgManageDosageForm:CReqMsgManageDosageForm ) : void {
  HelperService.Invoke<CReqMsgManageDosageForm,CResMsgManageDosageForm,ManageDosageFormCompletedEventArgs>("IPPMAPrescribableDefnWS.ManageDosageForm",oCReqMsgManageDosageForm,this.ManageDosageFormCompleted,"oArrDosageForm",new ManageDosageFormCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ManageFavouritesCompleted: Function;
ManageFavouritesAsync(oCReqMsgManageFavourites:CReqMsgManageFavourites ) : void {
  HelperService.Invoke<CReqMsgManageFavourites,CResMsgManageFavourites,ManageFavouritesCompletedEventArgs>("IPPMAPrescribableDefnWS.ManageFavourites",oCReqMsgManageFavourites,this.ManageFavouritesCompleted,"oPresGrid",new ManageFavouritesCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDrugFavouriteGroupCriteriaCompleted: Function;
GetDrugFavouriteGroupCriteriaAsync(oCReqMsgGetDrugFavouriteGroupCriteria:CReqMsgGetDrugFavouriteGroupCriteria ) : void {
  HelperService.Invoke<CReqMsgGetDrugFavouriteGroupCriteria,CResMsgGetDrugFavouriteGroupCriteria,GetDrugFavouriteGroupCriteriaCompletedEventArgs>("IPPMAPrescribableDefnWS.GetDrugFavouriteGroupCriteria",oCReqMsgGetDrugFavouriteGroupCriteria,this.GetDrugFavouriteGroupCriteriaCompleted,"MCVersion",new GetDrugFavouriteGroupCriteriaCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFavouritesGroupItemsIPPMACompleted: Function;
GetFavouritesGroupItemsIPPMAAsync(oCReqMsgGetFavouritesGroupItemsIPPMA:CReqMsgGetFavouritesGroupItemsIPPMA ) : void {
  HelperService.Invoke<CReqMsgGetFavouritesGroupItemsIPPMA,CResMsgGetFavouritesGroupItemsIPPMA,GetFavouritesGroupItemsIPPMACompletedEventArgs>("IPPMAPrescribableDefnWS.GetFavouritesGroupItemsIPPMA",oCReqMsgGetFavouritesGroupItemsIPPMA,this.GetFavouritesGroupItemsIPPMACompleted,"MCVersion",new GetFavouritesGroupItemsIPPMACompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFavouritesDrugItemCompleted: Function;
GetFavouritesDrugItemAsync(oCReqMsgGetFavouritesDrugItem:CReqMsgGetFavouritesDrugItem ) : void {
  HelperService.Invoke<CReqMsgGetFavouritesDrugItem,CResMsgGetFavouritesDrugItem,GetFavouritesDrugItemCompletedEventArgs>("IPPMAPrescribableDefnWS.GetFavouritesDrugItem",oCReqMsgGetFavouritesDrugItem,this.GetFavouritesDrugItemCompleted,"MVersion",new GetFavouritesDrugItemCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ValidateMedTypeCompleted: Function;
ValidateMedTypeAsync(oCReqMsgValidateMedType:CReqMsgValidateMedType ) : void {
  HelperService.Invoke<CReqMsgValidateMedType,CResMsgValidateMedType,ValidateMedTypeCompletedEventArgs>("IPPMAPrescribableDefnWS.ValidateMedType",oCReqMsgValidateMedType,this.ValidateMedTypeCompleted,"cFlag",new ValidateMedTypeCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CreateMedicationTypeCompleted: Function;
CreateMedicationTypeAsync(oCReqMsgCreateMedicationType:CReqMsgCreateMedicationType ) : void {
  HelperService.Invoke<CReqMsgCreateMedicationType,CResMsgCreateMedicationType,CreateMedicationTypeCompletedEventArgs>("IPPMAPrescribableDefnWS.CreateMedicationType",oCReqMsgCreateMedicationType,this.CreateMedicationTypeCompleted,"oMedicationType",new CreateMedicationTypeCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ModifyMedicationTypeCompleted: Function;
ModifyMedicationTypeAsync(oCReqMsgModifyMedicationType:CReqMsgModifyMedicationType ) : void {
  HelperService.Invoke<CReqMsgModifyMedicationType,CResMsgModifyMedicationType,ModifyMedicationTypeCompletedEventArgs>("IPPMAPrescribableDefnWS.ModifyMedicationType",oCReqMsgModifyMedicationType,this.ModifyMedicationTypeCompleted,"oMedicationType",new ModifyMedicationTypeCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMedicationTypeByOIDCompleted: Function;
GetMedicationTypeByOIDAsync(oCReqMsgGetMedicationTypeByOID:CReqMsgGetMedicationTypeByOID ) : void {
  HelperService.Invoke<CReqMsgGetMedicationTypeByOID,CResMsgGetMedicationTypeByOID,GetMedicationTypeByOIDCompletedEventArgs>("IPPMAPrescribableDefnWS.GetMedicationTypeByOID",oCReqMsgGetMedicationTypeByOID,this.GetMedicationTypeByOIDCompleted,"lMedVersion",new GetMedicationTypeByOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMedicationTypeCompleted: Function;
GetMedicationTypeAsync(oCReqMsgGetMedicationType:CReqMsgGetMedicationType ) : void {
  HelperService.Invoke<CReqMsgGetMedicationType,CResMsgGetMedicationType,GetMedicationTypeCompletedEventArgs>("IPPMAPrescribableDefnWS.GetMedicationType",oCReqMsgGetMedicationType,this.GetMedicationTypeCompleted,"lnEndRow",new GetMedicationTypeCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMedicationTypeDetailCompleted: Function;
GetMedicationTypeDetailAsync(oCReqMsgGetMedicationTypeDetail:CReqMsgGetMedicationTypeDetail ) : void {
  HelperService.Invoke<CReqMsgGetMedicationTypeDetail,CResMsgGetMedicationTypeDetail,GetMedicationTypeDetailCompletedEventArgs>("IPPMAPrescribableDefnWS.GetMedicationTypeDetail",oCReqMsgGetMedicationTypeDetail,this.GetMedicationTypeDetailCompleted,"sMCVersion",new GetMedicationTypeDetailCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetIPPMAFrmlyComboValuesCompleted: Function;
GetIPPMAFrmlyComboValuesAsync(oCReqMsgGetIPPMAFrmlyComboValues:CReqMsgGetIPPMAFrmlyComboValues ) : void {
  HelperService.Invoke<CReqMsgGetIPPMAFrmlyComboValues,CResMsgGetIPPMAFrmlyComboValues,GetIPPMAFrmlyComboValuesCompletedEventArgs>("IPPMAPrescribableDefnWS.GetIPPMAFrmlyComboValues",oCReqMsgGetIPPMAFrmlyComboValues,this.GetIPPMAFrmlyComboValuesCompleted,"MCVersionNo",new GetIPPMAFrmlyComboValuesCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDataItemCompleted: Function;
GetDataItemAsync(oCReqMsgGetDataItem:CReqMsgGetDataItem ) : void {
  HelperService.Invoke<CReqMsgGetDataItem,CResMsgGetDataItem,GetDataItemCompletedEventArgs>("IPPMAPrescribableDefnWS.GetDataItem",oCReqMsgGetDataItem,this.GetDataItemCompleted,"itemlist",new GetDataItemCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CreatePrescibableItemCompleted: Function;
CreatePrescibableItemAsync(oCReqMsgCreatePrescibableItem:CReqMsgCreatePrescibableItem ) : void {
  HelperService.Invoke<CReqMsgCreatePrescibableItem,CResMsgCreatePrescibableItem,CreatePrescibableItemCompletedEventArgs>("IPPMAPrescribableDefnWS.CreatePrescibableItem",oCReqMsgCreatePrescibableItem,this.CreatePrescibableItemCompleted,"oPresGrid",new CreatePrescibableItemCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ModifyPrescribableItemCompleted: Function;
ModifyPrescribableItemAsync(oCReqMsgModifyPrescribableItem:CReqMsgModifyPrescribableItem ) : void {
  HelperService.Invoke<CReqMsgModifyPrescribableItem,CResMsgModifyPrescribableItem,ModifyPrescribableItemCompletedEventArgs>("IPPMAPrescribableDefnWS.ModifyPrescribableItem",oCReqMsgModifyPrescribableItem,this.ModifyPrescribableItemCompleted,"RemovedIdTypes",new ModifyPrescribableItemCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPresItemModifyDetailsCompleted: Function;
GetPresItemModifyDetailsAsync(oCReqMsgGetPresItemModifyDetails:CReqMsgGetPresItemModifyDetails ) : void {
  HelperService.Invoke<CReqMsgGetPresItemModifyDetails,CResMsgGetPresItemModifyDetails,GetPresItemModifyDetailsCompletedEventArgs>("IPPMAPrescribableDefnWS.GetPresItemModifyDetails",oCReqMsgGetPresItemModifyDetails,this.GetPresItemModifyDetailsCompleted,"sMcversionNo",new GetPresItemModifyDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetCustomiseParentFlagCompleted: Function;
GetCustomiseParentFlagAsync(oCReqMsgGetCustomiseParentFlag:CReqMsgGetCustomiseParentFlag ) : void {
  HelperService.Invoke<CReqMsgGetCustomiseParentFlag,CResMsgGetCustomiseParentFlag,GetCustomiseParentFlagCompletedEventArgs>("IPPMAPrescribableDefnWS.GetCustomiseParentFlag",oCReqMsgGetCustomiseParentFlag,this.GetCustomiseParentFlagCompleted,"LoginOrgout",new GetCustomiseParentFlagCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetBasicDetailsCompleted: Function;
GetBasicDetailsAsync(oCReqMsgGetBasicDetails:CReqMsgGetBasicDetails ) : void {
  HelperService.Invoke<CReqMsgGetBasicDetails,CResMsgGetBasicDetails,GetBasicDetailsCompletedEventArgs>("IPPMAPrescribableDefnWS.GetBasicDetails",oCReqMsgGetBasicDetails,this.GetBasicDetailsCompleted,"sMCVersionNo",new GetBasicDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetAdditionalDetailsCompleted: Function;
GetAdditionalDetailsAsync(oCReqMsgGetAdditionalDetails:CReqMsgGetAdditionalDetails ) : void {
  HelperService.Invoke<CReqMsgGetAdditionalDetails,CResMsgGetAdditionalDetails,GetAdditionalDetailsCompletedEventArgs>("IPPMAPrescribableDefnWS.GetAdditionalDetails",oCReqMsgGetAdditionalDetails,this.GetAdditionalDetailsCompleted,"sMCVersionNo",new GetAdditionalDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPrescribableItemDetailIPPMACompleted: Function;
GetPrescribableItemDetailIPPMAAsync(oCReqMsgGetPrescribableItemDetailIPPMA:CReqMsgGetPrescribableItemDetailIPPMA ) : void {
  HelperService.Invoke<CReqMsgGetPrescribableItemDetailIPPMA,CResMsgGetPrescribableItemDetailIPPMA,GetPrescribableItemDetailIPPMACompletedEventArgs>("IPPMAPrescribableDefnWS.GetPrescribableItemDetailIPPMA",oCReqMsgGetPrescribableItemDetailIPPMA,this.GetPrescribableItemDetailIPPMACompleted,"MCVersion",new GetPrescribableItemDetailIPPMACompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetAllDoseUOMSFSCompleted: Function;
GetAllDoseUOMSFSAsync(oCReqMsgGetAllDoseUOMSFS:CReqMsgGetAllDoseUOMSFS ) : void {
  HelperService.Invoke<CReqMsgGetAllDoseUOMSFS,CResMsgGetAllDoseUOMSFS,GetAllDoseUOMSFSCompletedEventArgs>("IPPMAPrescribableDefnWS.GetAllDoseUOMSFS",oCReqMsgGetAllDoseUOMSFS,this.GetAllDoseUOMSFSCompleted,"objDoseUOM",new GetAllDoseUOMSFSCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ManageRouteFormPairCompleted: Function;
ManageRouteFormPairAsync(oCReqMsgManageRouteFormPair:CReqMsgManageRouteFormPair ) : void {
  HelperService.Invoke<CReqMsgManageRouteFormPair,CResMsgManageRouteFormPair,ManageRouteFormPairCompletedEventArgs>("IPPMAPrescribableDefnWS.ManageRouteFormPair",oCReqMsgManageRouteFormPair,this.ManageRouteFormPairCompleted,"objRouteForm",new ManageRouteFormPairCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMedicationCompleted: Function;
GetMedicationAsync(oCReqMsgGetMedication:CReqMsgGetMedication ) : void {
  HelperService.Invoke<CReqMsgGetMedication,CResMsgGetMedication,GetMedicationCompletedEventArgs>("IPPMAPrescribableDefnWS.GetMedication",oCReqMsgGetMedication,this.GetMedicationCompleted,"MCVersion",new GetMedicationCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetRouteFormPairCompleted: Function;
GetRouteFormPairAsync(oCReqMsgGetRouteFormPair:CReqMsgGetRouteFormPair ) : void {
  HelperService.Invoke<CReqMsgGetRouteFormPair,CResMsgGetRouteFormPair,GetRouteFormPairCompletedEventArgs>("IPPMAPrescribableDefnWS.GetRouteFormPair",oCReqMsgGetRouteFormPair,this.GetRouteFormPairCompleted,"objPaging",new GetRouteFormPairCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetMappedLorenzoObjectsCompleted: Function;
GetMappedLorenzoObjectsAsync(oCReqMsgGetMappedLorenzoObjects:CReqMsgGetMappedLorenzoObjects ) : void {
  HelperService.Invoke<CReqMsgGetMappedLorenzoObjects,CResMsgGetMappedLorenzoObjects,GetMappedLorenzoObjectsCompletedEventArgs>("IPPMAPrescribableDefnWS.GetMappedLorenzoObjects",oCReqMsgGetMappedLorenzoObjects,this.GetMappedLorenzoObjectsCompleted,"MCVersion",new GetMappedLorenzoObjectsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetRouteFormPairSFSCompleted: Function;
GetRouteFormPairSFSAsync(oCReqMsgGetRouteFormPairSFS:CReqMsgGetRouteFormPairSFS ) : void {
  HelperService.Invoke<CReqMsgGetRouteFormPairSFS,CResMsgGetRouteFormPairSFS,GetRouteFormPairSFSCompletedEventArgs>("IPPMAPrescribableDefnWS.GetRouteFormPairSFS",oCReqMsgGetRouteFormPairSFS,this.GetRouteFormPairSFSCompleted,"objRouteform",new GetRouteFormPairSFSCompletedEventArgs(), prototypeList, charPropertyLookup);
}

CopyFormularyCompleted: Function;
CopyFormularyAsync(oCReqMsgCopyFormulary:CReqMsgCopyFormulary ) : void {
  HelperService.Invoke<CReqMsgCopyFormulary,CResMsgCopyFormulary,CopyFormularyCompletedEventArgs>("IPPMAPrescribableDefnWS.CopyFormulary",oCReqMsgCopyFormulary,this.CopyFormularyCompleted,"oDataFilter",new CopyFormularyCompletedEventArgs(), prototypeList, charPropertyLookup);
}
}

export class GetPGDListCompletedEventArgs{
 public Result: CResMsgGetPGDList;
public Error: any;
}
export class GetPGDListByOIDCompletedEventArgs{
 public Result: CResMsgGetPGDListByOID;
public Error: any;
}
export class CheckDuplicatePGDCompletedEventArgs{
 public Result: CResMsgCheckDuplicatePGD;
public Error: any;
}
export class ModifyPGDlistCompletedEventArgs{
 public Result: CResMsgModifyPGDlist;
public Error: any;
}
export class GetPGDListAssociationCompletedEventArgs{
 public Result: CResMsgGetPGDListAssociation;
public Error: any;
}
export class GetOIDBYFREQUENCYCompletedEventArgs{
 public Result: CResMsgGetOIDBYFREQUENCY;
public Error: any;
}
export class GETSPROLEASSCNCompletedEventArgs{
 public Result: CResMsgGETSPROLEASSCN;
public Error: any;
}
export class GetIPPInfRateComboValues_P2CompletedEventArgs{
 public Result: CResMsgGetIPPInfRateComboValues_P2;
public Error: any;
}
export class GetDRCdoseTypesCompletedEventArgs{
 public Result: CResMsgGetDRCdoseTypes;
public Error: any;
}
export class IsAnyDrugContainGivenIngredientCompletedEventArgs{
 public Result: CResMsgIsAnyDrugContainGivenIngredient;
public Error: any;
}
export class GetSysMultiRoutesCompletedEventArgs{
 public Result: CResMsgGetSysMultiRoutes;
public Error: any;
}
export class GetMedBarCodeConfigCompletedEventArgs{
 public Result: CResMsgGetMedBarCodeConfig;
public Error: any;
}
export class ManageMedBarcodeCompletedEventArgs{
 public Result: CResMsgManageMedBarcode;
public Error: any;
}
export class GetIngCustDetailsCompletedEventArgs{
 public Result: CResMsgGetIngCustDetails;
public Error: any;
}
export class CreateDrugRoundProfileCompletedEventArgs{
 public Result: CResMsgCreateDrugRoundProfile;
public Error: any;
}
export class CopyFromExistingProfileCompletedEventArgs{
 public Result: CResMsgCopyFromExistingProfile;
public Error: any;
}
export class AssociatedServicePointCompletedEventArgs{
 public Result: CResMsgAssociatedServicePoint;
public Error: any;
}
export class IsDuplicateProfileNameCompletedEventArgs{
 public Result: CResMsgIsDuplicateProfileName;
public Error: any;
}
export class GetTypeBasedFrequencyCompletedEventArgs{
 public Result: CResMsgGetTypeBasedFrequency;
public Error: any;
}
export class GetDrugprofileCompletedEventArgs{
 public Result: CResMsgGetDrugprofile;
public Error: any;
}
export class GetWitnessCriteriaCompletedEventArgs{
 public Result: CResMsgGetWitnessCriteria;
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
export class ManageWitnessCriteriaCompletedEventArgs{
 public Result: CResMsgManageWitnessCriteria;
public Error: any;
}
export class IsWitnessRequiredCompletedEventArgs{
 public Result: CResMsgIsWitnessRequired;
public Error: any;
}
export class GetIngredientWarningCompletedEventArgs{
 public Result: CResMsgGetIngredientWarning;
public Error: any;
}
export class DrugRoundManageActivePeriodsCompletedEventArgs{
 public Result: CResMsgDrugRoundManageActivePeriods;
public Error: any;
}
export class GetDrugRoundProfielByOIDCompletedEventArgs{
 public Result: CResMsgGetDrugRoundProfielByOID;
public Error: any;
}
export class ModifyDrugRoundProfileCompletedEventArgs{
 public Result: CResMsgModifyDrugRoundProfile;
public Error: any;
}
export class GetItemFrequencyCompletedEventArgs{
 public Result: CResMsgGetItemFrequency;
public Error: any;
}
export class GetServicePointCompletedEventArgs{
 public Result: CResMsgGetServicePoint;
public Error: any;
}
export class PGDManageActivePeriodsCompletedEventArgs{
 public Result: CResMsgPGDManageActivePeriods;
public Error: any;
}
export class GETPGDOBJECTBYOIDCompletedEventArgs{
 public Result: CResMsgGETPGDOBJECTBYOID;
public Error: any;
}
export class GetPGDListViewCompletedEventArgs{
 public Result: CResMsgGetPGDListView;
public Error: any;
}
export class CreatePGDListCompletedEventArgs{
 public Result: CResMsgCreatePGDList;
public Error: any;
}
export class ModifyStockRegisterCompletedEventArgs{
 public Result: CResMsgModifyStockRegister;
public Error: any;
}
export class CheckDuplicateDrugRegCompletedEventArgs{
 public Result: CResMsgCheckDuplicateDrugReg;
public Error: any;
}
export class SearchStockRegisterCompletedEventArgs{
 public Result: CResMsgSearchStockRegister;
public Error: any;
}
export class GetWardListCompletedEventArgs{
 public Result: CResMsgGetWardList;
public Error: any;
}
export class GetStockItemsCompletedEventArgs{
 public Result: CResMsgGetStockItems;
public Error: any;
}
export class GetStockDetailsCompletedEventArgs{
 public Result: CResMsgGetStockDetails;
public Error: any;
}
export class StkRegManageActivePeriodsCompletedEventArgs{
 public Result: CResMsgStkRegManageActivePeriods;
public Error: any;
}
export class GetSupplyPackUOMCompletedEventArgs{
 public Result: CResMsgGetSupplyPackUOM;
public Error: any;
}
export class CreateOrderSetCompletedEventArgs{
 public Result: CResMsgCreateOrderSet;
public Error: any;
}
export class ModifyOrderSetCompletedEventArgs{
 public Result: CResMsgModifyOrderSet;
public Error: any;
}
export class SearchOrderSetCompletedEventArgs{
 public Result: CResMsgSearchOrderSet;
public Error: any;
}
export class GetOrderSetDetailsCompletedEventArgs{
 public Result: CResMsgGetOrderSetDetails;
public Error: any;
}
export class GetOrderSetItemCompletedEventArgs{
 public Result: CResMsgGetOrderSetItem;
public Error: any;
}
export class GetOSHeaderByOIDCompletedEventArgs{
 public Result: CResMsgGetOSHeaderByOID;
public Error: any;
}
export class GetOrderSetListCompletedEventArgs{
 public Result: CResMsgGetOrderSetList;
public Error: any;
}
export class GetBasicSearchOrderSetsCompletedEventArgs{
 public Result: CResMsgGetBasicSearchOrderSets;
public Error: any;
}
export class CheckOrderSetDuplicateCompletedEventArgs{
 public Result: CResMsgCheckOrderSetDuplicate;
public Error: any;
}
export class GetFavouritesTreeHierarchyCompletedEventArgs{
 public Result: CResMsgGetFavouritesTreeHierarchy;
public Error: any;
}
export class GetOrderSetDetsByOIDCompletedEventArgs{
 public Result: CResMsgGetOrderSetDetsByOID;
public Error: any;
}
export class OrderSetManageActivePeriodsCompletedEventArgs{
 public Result: CResMsgOrderSetManageActivePeriods;
public Error: any;
}
export class CheckIsInfusionRouteCompletedEventArgs{
 public Result: CResMsgCheckIsInfusionRoute;
public Error: any;
}
export class HOCustomisePresItemCompletedEventArgs{
 public Result: CResMsgHOCustomisePresItem;
public Error: any;
}
export class GetHOCustomisePresItemCompletedEventArgs{
 public Result: CResMsgGetHOCustomisePresItem;
public Error: any;
}
export class GetDRCIndicationCompletedEventArgs{
 public Result: CResMsgGetDRCIndication;
public Error: any;
}
export class GetDRCDetailsCompletedEventArgs{
 public Result: CResMsgGetDRCDetails;
public Error: any;
}
export class ChkRouteAssocAnyDOSCompletedEventArgs{
 public Result: CResMsgChkRouteAssocAnyDOS;
public Error: any;
}
export class GetDosageFormTypeCompletedEventArgs{
 public Result: CResMsgGetDosageFormType;
public Error: any;
}
export class GetProductForVMCompletedEventArgs{
 public Result: CResMsgGetProductForVM;
public Error: any;
}
export class GetFormularyDetailsCompletedEventArgs{
 public Result: CResMsgGetFormularyDetails;
public Error: any;
}
export class CheckDuplicateFormularyCompletedEventArgs{
 public Result: CResMsgCheckDuplicateFormulary;
public Error: any;
}
export class CheckDuplicateMainFormularyCompletedEventArgs{
 public Result: CResMsgCheckDuplicateMainFormulary;
public Error: any;
}
export class CreateFormularyCompletedEventArgs{
 public Result: CResMsgCreateFormulary;
public Error: any;
}
export class ManageFormularyCompletedEventArgs{
 public Result: CResMsgManageFormulary;
public Error: any;
}
export class GetGPConnectConfigurationCompletedEventArgs{
 public Result: CResMsgGetGPConnectConfiguration;
public Error: any;
}
export class ManageGPConnectConfigurationCompletedEventArgs{
 public Result: CResMsgManageGPConnectConfiguration;
public Error: any;
}
export class GetIsDefaultValuesCompletedEventArgs{
 public Result: CResMsgGetIsDefaultValues;
public Error: any;
}
export class ChkDupItemlistCompletedEventArgs{
 public Result: CResMsgChkDupItemlist;
public Error: any;
}
export class GetFormularyItemDetailsCompletedEventArgs{
 public Result: CResMsgGetFormularyItemDetails;
public Error: any;
}
export class GetPrescribableItemListSFSCompletedEventArgs{
 public Result: CResMsgGetPrescribableItemListSFS;
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
export class GetProductPackCompletedEventArgs{
 public Result: CResMsgGetProductPack;
public Error: any;
}
export class ManageEANCodeCompletedEventArgs{
 public Result: CResMsgManageEANCode;
public Error: any;
}
export class IsEANCodeExistCompletedEventArgs{
 public Result: CResMsgIsEANCodeExist;
public Error: any;
}
export class GetIPPMAProcessingDetailsCompletedEventArgs{
 public Result: CResMsgGetIPPMAProcessingDetails;
public Error: any;
}
export class GetIPPMAIsDefaultValuesCompletedEventArgs{
 public Result: CResMsgGetIPPMAIsDefaultValues;
public Error: any;
}
export class GetItemUOMCompletedEventArgs{
 public Result: CResMsgGetItemUOM;
public Error: any;
}
export class GetMultiComponentListCompletedEventArgs{
 public Result: CResMsgGetMultiComponentList;
public Error: any;
}
export class GetMultiComponentCompletedEventArgs{
 public Result: CResMsgGetMultiComponent;
public Error: any;
}
export class GenerateConflictsForMulticomponentCompletedEventArgs{
 public Result: CResMsgGenerateConflictsForMulticomponent;
public Error: any;
}
export class GetIPPFrmlyComboValuesCompletedEventArgs{
 public Result: CResMsgGetIPPFrmlyComboValues;
public Error: any;
}
export class GetCompatibleComponentDetCompletedEventArgs{
 public Result: CResMsgGetCompatibleComponentDet;
public Error: any;
}
export class CreateStockRegisterCompletedEventArgs{
 public Result: CResMsgCreateStockRegister;
public Error: any;
}
export class GetDosageFormCompletedEventArgs{
 public Result: CResMsgGetDosageForm;
public Error: any;
}
export class ManageDosageFormCompletedEventArgs{
 public Result: CResMsgManageDosageForm;
public Error: any;
}
export class ManageFavouritesCompletedEventArgs{
 public Result: CResMsgManageFavourites;
public Error: any;
}
export class GetDrugFavouriteGroupCriteriaCompletedEventArgs{
 public Result: CResMsgGetDrugFavouriteGroupCriteria;
public Error: any;
}
export class GetFavouritesGroupItemsIPPMACompletedEventArgs{
 public Result: CResMsgGetFavouritesGroupItemsIPPMA;
public Error: any;
}
export class GetFavouritesDrugItemCompletedEventArgs{
 public Result: CResMsgGetFavouritesDrugItem;
public Error: any;
}
export class ValidateMedTypeCompletedEventArgs{
 public Result: CResMsgValidateMedType;
public Error: any;
}
export class CreateMedicationTypeCompletedEventArgs{
 public Result: CResMsgCreateMedicationType;
public Error: any;
}
export class ModifyMedicationTypeCompletedEventArgs{
 public Result: CResMsgModifyMedicationType;
public Error: any;
}
export class GetMedicationTypeByOIDCompletedEventArgs{
 public Result: CResMsgGetMedicationTypeByOID;
public Error: any;
}
export class GetMedicationTypeCompletedEventArgs{
 public Result: CResMsgGetMedicationType;
public Error: any;
}
export class GetMedicationTypeDetailCompletedEventArgs{
 public Result: CResMsgGetMedicationTypeDetail;
public Error: any;
}
export class GetIPPMAFrmlyComboValuesCompletedEventArgs{
 public Result: CResMsgGetIPPMAFrmlyComboValues;
public Error: any;
}
export class GetDataItemCompletedEventArgs{
 public Result: CResMsgGetDataItem;
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
export class GetPresItemModifyDetailsCompletedEventArgs{
 public Result: CResMsgGetPresItemModifyDetails;
public Error: any;
}
export class GetCustomiseParentFlagCompletedEventArgs{
 public Result: CResMsgGetCustomiseParentFlag;
public Error: any;
}
export class GetBasicDetailsCompletedEventArgs{
 public Result: CResMsgGetBasicDetails;
public Error: any;
}
export class GetAdditionalDetailsCompletedEventArgs{
 public Result: CResMsgGetAdditionalDetails;
public Error: any;
}
export class GetPrescribableItemDetailIPPMACompletedEventArgs{
 public Result: CResMsgGetPrescribableItemDetailIPPMA;
public Error: any;
}
export class GetAllDoseUOMSFSCompletedEventArgs{
 public Result: CResMsgGetAllDoseUOMSFS;
public Error: any;
}
export class ManageRouteFormPairCompletedEventArgs{
 public Result: CResMsgManageRouteFormPair;
public Error: any;
}
export class GetMedicationCompletedEventArgs{
 public Result: CResMsgGetMedication;
public Error: any;
}
export class GetRouteFormPairCompletedEventArgs{
 public Result: CResMsgGetRouteFormPair;
public Error: any;
}
export class GetMappedLorenzoObjectsCompletedEventArgs{
 public Result: CResMsgGetMappedLorenzoObjects;
public Error: any;
}
export class GetRouteFormPairSFSCompletedEventArgs{
 public Result: CResMsgGetRouteFormPairSFS;
public Error: any;
}
export class CopyFormularyCompletedEventArgs{
 public Result: CResMsgCopyFormulary;
public Error: any;
}
export class CReqMsgGetDosageForm{
oDosageFormBC:IPPDosageForm;
oContextInformation:CContextInformation;
}

export class DosageForm extends CLZOObject{
DosageFormOid:number;
DosageName:string;
PageNo:number;
PageSize:number;
MAXRows:number;
MCVersion:string;
}
export class IPPDosageForm extends DosageForm{
Type:string;
VersionNo:string;
InhaledCode:string;
IsModReleaseChar:boolean;
StartRow:number;
EndRow:number;
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
export class UOM extends CLZOObject{
UOMId:number;
UOMName:string;
SourceDataProviderType:string;
UOMCode:string;
MCIPrescribableItemListOID:number;
UOMTypeCode:string;
OwnerOrganisationID:number;
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
export class ObjectInfo extends CLZOObject{
OID:number;
Name:string;
Code:string;
RoleProfileOID:number;
OwnerOrganisationOID:number;
SourceDataProviderType:string;
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
export class IPPProcessingInfo extends ProcessingInfo{
oIntravenousInfusionDetails:IntravenousInfusionDetails;
oAdminDeviceDetails:AdminDeviceDetails;
OffSetValue:string;
OffSetPeriod:string;
PrescribingNote:string;
PresItemStatus:string;
FormularyNote:string;
Itemdetail_IdentifyingOid:number;
Itemdetail_IdentifyingType:string;
PRNInstructionOID:number;
PRNInstruction:string;
StrengthText:string;
INFTYCODE:string;
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
export class Dose extends CLZOObject{
DoseType:string;
ObservationResultCode:string;
DoseDetails:ObservableCollection<DoseDetails>;
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
export class IPPPrescribeItemLookUp extends PrescribeItemLookUp{
DrugBasedRequestOID:number;
PrescribableItem:ObservableCollection<ObjectInfo>;
}
export class AlternateDrugItem extends PrescribeItemBase{
Message:string;
ParentItem:string;
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
export class MedicationType extends CLZOObject{
OID:number;
Name:string;
IsStrength:boolean;
SiteRequired:string;
IsDoseMethod:boolean;
MCVersion:string;
VersionNo:string;
LorenzoID:string;
Status:string;
ModifiedBy:number;
ModifiedAt:DateTime;
OwnerOrganisationOID:number;
RouteFormCol:ObservableCollection<RouteFormPair>;
}
export class RouteFormPair extends CLZOObject{
OID:number;
ObjRoute:ObjectInfo;
ObjForm:ObjectInfo;
IsPreciseMapped:boolean;
Description:string;
VersionNo:string;
MCVersionNo:string;
nPageNo:number;
nPageSize:number;
LorenzoID:string;
Lorenzoroutes:ObservableCollection<ObjectInfo>;
Lorenzoforms:ObservableCollection<ObjectInfo>;
}
export class MedTypeSearchCriteria extends CLZOObject{
MedicationType:string;
RouteOID:number;
FormOID:number;
MCVersion:string;
}
export class IPPProcessingDetails extends CLZOObject{
IsOxygen:string;
ISBTYCode:string;
PRNInstructions:ObservableCollection<ObjectInfo>;
StrengthText:ObservableCollection<string>;
}
export class ObservationResult extends CLZOObject{
DrugBasedRequestOID:number;
ItemOID:number;
ItemName:string;
ItemCode:string;
ItemType:string;
Version:number;
ChildItemName:string;
Children:ObservableCollection<ObservationResult>;
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
export class DoseUOM extends CLZOObject{
DoseUOMOid:number;
DoseUOMName:string;
MCVersionNumber:string;
nPageNo:number;
nPageSize:number;
nMAXRows:number;
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
export class GPConnectExcludedPresItems extends CLZOObject{
LorenzoID:string;
DisplayName:string;
}
export class ManageGPCConfiguration extends CLZOObject{
IsTransformGPConnectMeds:string;
LorenzoIDs:string;
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
export class IPPPrescribableItemListSFS extends PrescribableItemListSFS{
ParentItemOID:number;
ParentItemType:string;
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
export class ProductPackSearchSelection extends CLZOObject{
AppName:string;
Strength:string;
DosageForm:number;
Brand:string;
MCVersion:string;
PageNo:number;
PageSize:number;
ProductCode:string;
}
export class ActualProductPack extends CLZOObject{
ProductPackName:string;
LorenzoID:string;
MCVersion:string;
EANHiddenData:string;
OwnerOrganisationOID:number;
Itemtype:string;
Status:string;
objEANCodes:ObservableCollection<EANCodes>;
}
export class EANCodes extends CLZOObject{
EANCodeOID:number;
EANCode:string;
}
export class ManagedEANCode extends CLZOObject{
LorenzoID:string;
MCVersion:string;
uEANCodes:string;
EANCodes:ObservableCollection<string>;
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
export class SealingDetails extends CLZOObject{
IdentifyingCode:string;
IdentifyingType:string;
}
export class StockRegister extends CLZOObject{
StockRegisterOID:number;
DisplayName:string;
Description:string;
ServiceOID:number;
LocationOID:number;
StockType:string;
Pagesize:number;
StockItems:ObservableCollection<StockItems>;
}
export class StockItems extends CLZOObject{
StockRegisterOID:number;
DrugLZOID:string;
Name:string;
ClassType:string;
IdentifyingOID:number;
StockLevel:string;
StockUOM:UOM;
PackSize:string;
PackSizeUOM:UOM;
MCVersionNo:string;
UOMDetails:string;
PackUom:string;
IsHOCDPresItem:string;
}
export class StockRegisterSearch extends CLZOObject{
DisplayName:string;
StockType:string;
ServiceOID:string;
LocationOID:string;
DrugLZOID:string;
IdentifyingOID:string;
DateQualifier:string;
FromDate:DateTime;
ToDate:DateTime;
StartRow:number;
EndRow:number;
PageLength:number;
MCVersionNo:string;
StockRegisterStatus:string;
}
export class StockRegisterList extends CLZOObject{
StockRegisterOID:number;
DisplayName:string;
Description:string;
IsSupplyRequest:string;
StockType:string;
ServiceOID:number;
ServiceName:string;
LocationOID:number;
LocationName:string;
Pagesize:number;
IsSupplyRequested:boolean;
StockRegisterStatus:string;
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
export class OrderSet extends CLZOObject{
OID:number;
SETTYPCODE:string;
OrderSetName:string;
Description:string;
EffectiveDTTM:DateTime;
UsersOID:number;
SpecialtyOID:number;
Guidance:string;
IsEditable:string;
LorenzoID:string;
DefaultSelection:string;
MCVersion:string;
UserName:string;
SpecialtyName:string;
IsConflitsON:string;
IsDisableDRC:string;
IsDontOpenFV:string;
IsProtectedSeq:string;
IsExcludeGuidanceInSearch:string;
oCommonMedicines:ObservableCollection<CommonMedicines>;
Codifications:ObservableCollection<TTOCodification>;
Synonyms:ObservableCollection<Synonym>;
Links:ObservableCollection<MonographInfo>;
OrderSetItems:ObservableCollection<OrderSetItem>;
OrderSetOrphanHeaders:ObservableCollection<OrderSetOrphanHeader>;
}
export class CommonMedicines extends CLZOObject{
Key:string;
Status:string;
}
export class OrderSetItem extends CLZOObject{
OrderSetOID:number;
OrderSetItemOID:number;
DisplayOrder:number;
IdentifyingType:string;
IdentifyingValue:string;
IsSelect:string;
OffSetValue:string;
OffSetUOMCode:string;
MCVersion:string;
LorenzoID:string;
DrugName:string;
ItemSubType:string;
DrugOId:string;
ItemOId:string;
PresitemlistOID:string;
IsCopyFav:string;
DrugType:string;
DisplaySeqNum:string;
DrugLorenzoID:string;
DetailLorenzoID:string;
GroupKey:string;
HiddenValues:string;
IsSwap:string;
PrescriptionItem:string;
Otherinformation:string;
IsDefaultSelected:string;
PrescribingNote:string;
Offset:string;
FVICon:string;
DrugFavGrpOID:string;
ItemCatalogueGrpOID:string;
ConflictsIcon:string;
ConflictDetail:string;
PGDListOID:string;
Itemdetail_IdentifyingOid:number;
Itemdetail_IdentifyingType:string;
IsLineItem:boolean;
Ordersentencedescription:string;
DRCdoseTypeLorenzoID:string;
AllowtimeshiftID:string;
DoseCalcDetails:string;
Itemtype:string;
IsAccessConstraint:string;
IsHeader:string;
HeaderName:string;
SequentialID:string;
FrequencyName:string;
PRNNormal:string;
InfusionType:string;
DurationSpin:string;
InfusionPeriod:string;
DoseType:string;
IsInfusionRoute:string;
SVLastDuration:string;
FrequencyIsPRN:string;
FreqLorenzoID:string;
FreqPERODCode:string;
DurationID:string;
InfusionPeriodUOMName:string;
ProcessingInfo:ObservableCollection<IPPProcessingInfo>;
oConstituentItem:ObservableCollection<ConstituentItem>;
oWarnings:ObservableCollection<WarningDetails>;
oCommonMedicines:ObservableCollection<CommonMedicines>;
ItemCatalogueGrp:ObservableCollection<string>;
}
export class OrderSetOrphanHeader extends CLZOObject{
OrderSetOID:number;
GroupHeaderName:string;
DisplayOrder:number;
MCVersionNo:string;
}
export class OrderSetSearch extends CLZOObject{
OrderSetName:string;
Description:string;
SETTYPCODE:string;
UsersOID:number;
SpecialtyOID:number;
Synonym:string;
DateQualifier:string;
FromDate:DateTime;
ToDate:DateTime;
MCVersionNo:string;
StartRow:number;
EndRow:number;
PageLength:number;
OrderStatus:string;
Codifications:ObservableCollection<TTOCodification>;
}
export class OrderSetList extends CLZOObject{
OrderSetOID:number;
OrderSetName:string;
SETTYPCODE:string;
UsersOID:string;
SpecialtyOID:string;
Status:string;
EffectiveDTTM:DateTime;
Users:string;
Specialty:string;
InActiveFromDTTM:DateTime;
InActiveToDTTM:DateTime;
LorenzoID:string;
OrganisationOID:number;
oOrderSetItem:ObservableCollection<Object>;
}
export class OrderSetListDetails extends CLZOObject{
Description:string;
Guidance:string;
IsConflictON:string;
IsDontOpenFV:string;
IsExcludeGuidanceInSearch:string;
Synonyms:ObservableCollection<Synonym>;
Codifications:ObservableCollection<TTOCodification>;
CommonMedicinesFolder:ObservableCollection<string>;
}
export class OrderSetHeaderInfo extends CLZOObject{
OSAOSGHOID:number;
GroupHeaderName:string;
DisplayOrder:number;
IsOrphan:string;
}
export class FavTreeHierarchyReq extends CLZOObject{
OrgOID:number;
MCVersionNo:string;
}
export class CustomisePresItem extends CLZOObject{
OpModeCD:string;
OpModeRP:string;
OpModeIR:string;
OpModeIND:string;
OpModeMR:string;
OpModeMONO:string;
OpModeGH:string;
OpModePN:string;
OpModeMulti:string;
OpModeIgnoreEPresAM:string;
OpModeCM:string;
OpModeA:string;
IdentifyingOID:number;
IdentifyingType:string;
LorenzoID:string;
MCVersionNo:string;
ActivityType:string;
ItemSubType:string;
IsControlDrug:boolean;
RVAfterUOMText:string;
OwnerOganisationOID:number;
IsExistingDoseCapAvailable:boolean;
CLocalEprescribe:CLocalEprescribe;
CLocalReviewPeriod:CLocalReviewPeriod;
CLocalMultiRoute:CLocalMultiRoute;
CLocalIndicationReq:CLocalIndicationReq;
CLocalCD:CLocalCD;
CLocalMonoGrph:CLocalMonoGrph;
CLocalGroupHeader:CLocalGroupHeader;
CLocalPrescribeNote:CLocalPrescribeNote;
CLocalCriticalMed:CLocalCriticalMed;
DrugProperty:DrugProperty;
CLocalAuthorise:CLocalAuthorise;
CLocalMedBrCodeScan:CLocalMedBrCodeScan;
oDoseCapDetails:ObservableCollection<DoseCapDetail>;
}
export class DoseCapDetail extends CLZOObject{
RouteOID:number;
RouteName:string;
RouteLzoID:string;
MinDoseCap:string;
MaxDoseCap:string;
DoseCapUOMName:string;
DoseCapUOMLzoID:string;
}
export class CLocalizeBase{
IsLocalized:boolean;
OperationMode:number;
}
export class CLocalEprescribe extends CLocalizeBase{
IgnoreEPresRule:boolean;
}
export class CLocalMedBrCodeScan extends CLocalizeBase{
DrugPropertyOID:number;
IsExcludeBarcodeScan:string;
}
export class CLocalAuthorise extends CLocalizeBase{
IsAuthorise:string;
DrugPropertyOID:number;
oAuthoriseRoles:ObservableCollection<AuthoriseRoles>;
}
export class AuthoriseRoles extends CLZOObject{
lDrugAuthRoleOID:number;
sDrugAuthRoleName:string;
}
export class CLocalCriticalMed extends CLocalizeBase{
DrugPropertyOID:number;
IsCriticalMed:string;
CriticalDrugMsg:string;
CriticalDrugSiteURL:string;
oCriticalMedRoutes:ObservableCollection<CriticalMedRoutes>;
}
export class CriticalMedRoutes extends CLZOObject{
DrugPropertyOID:number;
RouteLzoID:string;
RouteName:string;
IsCriticalMedRoute:string;
IsRemovable:string;
}
export class CLocalPrescribeNote extends CLocalizeBase{
IsPrescribingNote:boolean;
PrescribingNote:string;
}
export class CLocalGroupHeader extends CLocalizeBase{
IsGroupHeader:boolean;
GroupHeader:string;
}
export class CLocalMonoGrph extends CLocalizeBase{
oMonograph:ObservableCollection<MonographInfo>;
}
export class CLocalCD extends CLocalizeBase{
IsControlDrug:boolean;
}
export class CLocalIndicationReq extends CLocalizeBase{
IndicationRequired:boolean;
IsFDBEChecked:boolean;
oIndications:ObservableCollection<Indication>;
}
export class CLocalMultiRoute extends CLocalizeBase{
IsAllowMultipleRoute:boolean;
IsCustomized:boolean;
SourceDataProviderType:string;
oRoute:ObservableCollection<Route>;
}
export class CLocalReviewPeriod extends CLocalizeBase{
IsRPRequired:boolean;
RVAfter:string;
RVAfterUOM:string;
}
export class CustomisePresItemDetails extends CLZOObject{
ActivityType:string;
LorenzoID:string;
RVAfterUOMText:string;
OwnerOganisationOID:number;
CLocalEprescribe:CLocalEprescribe;
CLocalReviewPeriod:CLocalReviewPeriod;
CLocalMultiRoute:CLocalMultiRoute;
CLocalIndicationReq:CLocalIndicationReq;
CLocalCD:CLocalCD;
CLocalMonoGrph:CLocalMonoGrph;
CLocalGroupHeader:CLocalGroupHeader;
CLocalPrescribeNote:CLocalPrescribeNote;
CLocalCriticalMed:CLocalCriticalMed;
DrugProperty:DrugProperty;
Itemtype:string;
CLocalAuthorise:CLocalAuthorise;
CLocalMedBrCodeScan:CLocalMedBrCodeScan;
oRoute:ObservableCollection<Route>;
oDoseCapDetails:ObservableCollection<DoseCapDetail>;
}
export class DRCSysDetails extends CLZOObject{
IdentifyingOID:number;
IdentifyingType:string;
MCVersionNo:string;
LorenzoID:string;
Indicationid:string;
Indicationname:string;
Routename:string;
Formname:string;
LowAge:string;
HighAge:string;
LowWeight:string;
HighWeight:string;
LowBSA:string;
HighBSA:string;
Dosetype:string;
Lowdose:string;
HighDose:string;
MaxDose:string;
LowFrequecyname:string;
HighFrequecyname:string;
MaxSingleDose:string;
}
export class IPPProductDetails extends CLZOObject{
ProductName:string;
ProductType:string;
DosageFormOID:number;
ProductLorenzoID:string;
}
export class InfusionRateUOMs extends CLZOObject{
InfRateNumUOM:ObservableCollection<UOM>;
InfRateDenoUOM:ObservableCollection<UOM>;
}
export class InfusionFluidDetails extends CLZOObject{
IdentifyingOID:number;
IdentifyingType:string;
IdentifyingName:string;
LorenzoID:string;
IsInfusionFluid:string;
FluidItemIdfyngOID:number;
}
export class MultiRoute extends CLZOObject{
MultiRouteId:number;
MultiRouteName:string;
bInfusion:string;
}
export class MedBarCodeConfig extends CLZOObject{
OID:number;
IsMandatePatient:string;
IsMandateMedication:string;
oMedBarCodeEncTypeConfig:ObservableCollection<MedBarCodeEncTypeConfig>;
oMedBarCodeConfigDetails:ObservableCollection<MedBarCodeConfigDetails>;
}
export class MedBarCodeEncTypeConfig extends CLZOObject{
MedBarCodeConfigOID:number;
ENTYPCode:string;
IdentifyingCategory:string;
}
export class MedBarCodeConfigDetails extends CLZOObject{
MedBarCodeConfigOID:number;
IdentifyingOID:number;
IdentifyingType:string;
IdentifyingName:string;
ServiceEncounterType:string;
IsMandatePatient:string;
IsMandateMedication:string;
}
export class DrugRoundProfile extends CLZOObject{
DrugRoundTimeListView:string;
EffectiveFromDate:DateTime;
Name:string;
OID:number;
Status:string;
OrgOID:number;
DrugRoundTimes:ObservableCollection<string>;
DRProfileFrequency:ObservableCollection<DRProfileFrequency>;
ServicePoints:ObservableCollection<DROProfileServicePoint>;
}
export class DRProfileFrequency extends CLZOObject{
ItemFrequency:string;
ItemFrequencyOID:number;
LorenzoID:string;
ProfileTime:ObservableCollection<string>;
TimeMode:ObservableCollection<string>;
}
export class DROProfileServicePoint extends CLZOObject{
ServicePoint:string;
ServicePointOID:number;
Flag:boolean;
}
export class DuplicateDrugSP extends CLZOObject{
ServiceName:string;
ServiceOID:number;
DrugRoundOID:number;
DrugRoundName:string;
}
export class DrugRoundFilter extends CLZOObject{
ProfileName:string;
IsActive:string;
ServicePointOID:number;
StartRow:number;
EndRow:number;
NPageLength:number;
}
export class WitnessCriteria extends CLZOObject{
OID:number;
AgeFrom:number;
AgeTo:number;
AgeUOM:string;
IsControlledDrugIncluded:boolean;
IsRuleExists:boolean;
DontWitnessOverrideForAllRole:boolean;
PrescriptionItemOid:number;
Drugs:ObservableCollection<ObjectInfo>;
Roles:ObservableCollection<ObjectInfo>;
Routes:ObservableCollection<ObjectInfo>;
ServicePoints:ObservableCollection<ObjectInfo>;
Exceptions:ObservableCollection<WitnessException>;
ExemptedRoles:ObservableCollection<ObjectInfo>;
}
export class WitnessException extends CLZOObject{
OID:number;
IsControlledDrugIncluded:boolean;
Roles:ObjectInfo;
Drugs:ObservableCollection<ObjectInfo>;
ServicePoints:ObservableCollection<ObjectInfo>;
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
export class WitnessCriteriaresult extends CLZOObject{
Flag:boolean;
Isnowitnessoverride:boolean;
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
export class PGDListSearchCriteria extends CLZOObject{
Name:string;
ServicePointOID:number;
RoleOID:number;
Status:string;
McVersionNo:string;
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
export class CResMsgGetDosageForm{
lnRecCount:number;
lnLastPgRecCnt:number;
oContextInformation:CContextInformation;
oArrDosageForm:ObservableCollection<IPPDosageForm>;
}
export class CReqMsgManageDosageForm{
oContextInformation:CContextInformation;
oArrDosageFormBC:ObservableCollection<IPPDosageForm>;
}
export class CResMsgManageDosageForm{
oContextInformation:CContextInformation;
}
export class CReqMsgManageFavourites{
UserOIDBC:number;
oContextInformation:CContextInformation;
oArrFavouriteItemBC:ObservableCollection<FavouriteItem>;
oFavouriteAssociationBC:ObservableCollection<FavouriteAssociation>;
oDrugFavGrpPatientAgeBC:ObservableCollection<DrugFavGrpPatientAge>;
oPresGridBC:ObservableCollection<PrescriptionGridInfo>;
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
export class DrugFavGrpPatientAge{
OID:number;
PatientAgeFrom:number;
PatientAgeTo:number;
PatientAgeUOM:string;
PatientAgeUOMCode:string;
PatientAgeName:string;
FavouriteName:string;
USSGestationDays:number;
DrugFavouriteGroupLorenzoID:string;
MCVersionNo:string;
CreatedBy:number;
CreatedAt:DateTime;
ModifiedBy:number;
ModifiedAt:DateTime;
Flag:string;
Status:string;
}
export class CResMsgManageFavourites{
lnFavouriteItem:number;
oContextInformation:CContextInformation;
}
export class CReqMsgGetDrugFavouriteGroupCriteria{
OrganisationOIDBC:number;
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetDrugFavouriteGroupCriteria{
oContextInformation:CContextInformation;
oDrugFavGrpPatientAge:ObservableCollection<DrugFavGrpPatientAge>;
}
export class CReqMsgGetFavouritesGroupItemsIPPMA{
FavGroupOIdBC:number;
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetFavouritesGroupItemsIPPMA{
oFavouriteItem:FavouriteItem;
oContextInformation:CContextInformation;
}
export class CReqMsgGetFavouritesDrugItem{
IdentifyingOIDBC:number;
IdentifyingTypeBC:string;
FavOIdBC:number;
IsFormularyBC:string;
MVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetFavouritesDrugItem{
oContextInformation:CContextInformation;
oPrescriptionItemDetails:ObservableCollection<PrescriptionItemDetails>;
}
export class CReqMsgValidateMedType{
MCVersionBC:string;
sMedTypeNameBC:string;
lMedTypeOIDBC:number;
sRouteFormPairOIDsBC:string;
cFlagBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgValidateMedType{
bIsDuplicate:boolean;
RouteFormPair:string;
oContextInformation:CContextInformation;
}
export class CReqMsgCreateMedicationType{
oMedicationTypeBC:MedicationType;
oContextInformation:CContextInformation;
}
export class CResMsgCreateMedicationType{
lnMedType:number;
oContextInformation:CContextInformation;
}
export class CReqMsgModifyMedicationType{
oMedicationTypeBC:MedicationType;
oContextInformation:CContextInformation;
}
export class CResMsgModifyMedicationType{
lnMedTye:number;
oContextInformation:CContextInformation;
}
export class CReqMsgGetMedicationTypeByOID{
lMedicationTypeOIDBC:number;
lMedVersionBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetMedicationTypeByOID{
oContextInformation:CContextInformation;
objRouteFormPair:ObservableCollection<RouteFormPair>;
}
export class CReqMsgGetMedicationType{
oCriteriaBC:MedTypeSearchCriteria;
nPageLengthBC:number;
lnStartRowBC:number;
lnEndRowBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetMedicationType{
lnRecCount:number;
lnLastPgRecCnt:number;
oContextInformation:CContextInformation;
oMedicationType:ObservableCollection<MedicationType>;
}
export class CReqMsgGetMedicationTypeDetail{
OIDBC:number;
sMCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetMedicationTypeDetail{
oContextInformation:CContextInformation;
oRouteFormPair:ObservableCollection<RouteFormPair>;
}
export class CReqMsgGetIPPMAFrmlyComboValues{
IdentifyingOIDBC:number;
IdentifyingTypeBC:string;
MCVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetIPPMAFrmlyComboValues{
oIPPProcessingDetails:IPPProcessingDetails;
oContextInformation:CContextInformation;
}
export class CReqMsgGetDataItem{
IdentifyingOIDBC:number;
IdentifyingTypeBC:string;
MCVersionNoBC:string;
IsRequestRequiredBC:boolean;
PrescriptionitemoidBC:number;
itemlistBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetDataItem{
oContextInformation:CContextInformation;
oObservationResult:ObservableCollection<ObservationResult>;
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
UpdatedIdTypesBC:string;
RemovedIdTypesBC:string;
oContextInformation:CContextInformation;
PrescribeItemDetailsBC:ObservableCollection<PrescribeItemDetails>;
oPresGridBC:ObservableCollection<PrescriptionGridInfo>;
}
export class CResMsgModifyPrescribableItem{
prescribeitemOIDs:string;
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
export class CReqMsgGetCustomiseParentFlag{
IdentifyingOIDBC:number;
IdentifyingTypeBC:string;
sMcversionNoBC:string;
ParentCheckBC:string;
LoginOrgoutBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetCustomiseParentFlag{
oContextInformation:CContextInformation;
CusParentFlag:ObservableCollection<CustomiseFlag>;
}
export class CustomiseFlag{
IsOxygen:string;
IsFluid:boolean;
IsConditional:boolean;
IsPrimary:boolean;
Name:string;
ItemID:string;
IsOxygenCust:string;
IsConditionalCust:string;
IsPrimaryCust:string;
IsFluidCust:string;
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
export class CReqMsgGetAdditionalDetails{
IdentifyingOIDBC:number;
IdentifyingTypeBC:string;
sMCVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetAdditionalDetails{
oContextInformation:CContextInformation;
objPrescribeItemLookUp:ObservableCollection<IPPPrescribeItemLookUp>;
}
export class CReqMsgGetPrescribableItemDetailIPPMA{
OIDBC:number;
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetPrescribableItemDetailIPPMA{
ProcessingInfo:IPPProcessingInfo;
oContextInformation:CContextInformation;
}
export class CReqMsgGetAllDoseUOMSFS{
objDoseUOMBC:DoseUOM;
oContextInformation:CContextInformation;
}
export class CResMsgGetAllDoseUOMSFS{
oContextInformation:CContextInformation;
objDoseUOMArray:ObservableCollection<DoseUOM>;
}
export class CReqMsgManageRouteFormPair{
oContextInformation:CContextInformation;
objRouteFormBC:ObservableCollection<RouteFormPair>;
}
export class CResMsgManageRouteFormPair{
oContextInformation:CContextInformation;
}
export class CReqMsgGetMedication{
IdentifyingTypeBC:string;
CodeBC:string;
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetMedication{
oContextInformation:CContextInformation;
LorenzoObjects:ObservableCollection<ObjectInfo>;
}
export class CReqMsgGetRouteFormPair{
MCVersionBC:string;
objPagingBC:Pagination;
oContextInformation:CContextInformation;
}
export class Pagination{
PageIndex:number;
PageSize:number;
RecordCount:number;
}
export class CResMsgGetRouteFormPair{
lnRecCount:number;
lnLastPgRecCnt:number;
oContextInformation:CContextInformation;
objRouteFormPair:ObservableCollection<RouteFormPair>;
}
export class CReqMsgGetMappedLorenzoObjects{
IdentifyingTypeBC:string;
CodeBC:string;
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetMappedLorenzoObjects{
oContextInformation:CContextInformation;
LorenzoObjects:ObservableCollection<ObjectInfo>;
}
export class CReqMsgGetRouteFormPairSFS{
objRouteformBC:RouteFormPair;
oContextInformation:CContextInformation;
}
export class CResMsgGetRouteFormPairSFS{
nMaxrows:number;
oContextInformation:CContextInformation;
objRouteFormPair:ObservableCollection<RouteFormPair>;
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
export class CReqMsgManageFormulary{
oFormularyGroupBC:FormularyGroup;
oDataFilterBC:DataFilter;
oContextInformation:CContextInformation;
}
export class CResMsgManageFormulary{
lnFormulary:number;
oContextInformation:CContextInformation;
}
export class CReqMsgGetGPConnectConfiguration{
MCVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetGPConnectConfiguration{
IsTransformGPConnectMeds:string;
oContextInformation:CContextInformation;
oGPConnectExcludedPresItems:ObservableCollection<GPConnectExcludedPresItems>;
}
export class CReqMsgManageGPConnectConfiguration{
oManageGPCConfigurationBC:ManageGPCConfiguration;
oContextInformation:CContextInformation;
}
export class CResMsgManageGPConnectConfiguration{
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
oProcessingInfo:ObservableCollection<IPPProcessingInfo>;
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
export class CReqMsgGetPrescribableItemListSFS{
objPrescribableItemSFSBC:IPPPrescribableItemListSFS;
oContextInformation:CContextInformation;
}
export class CResMsgGetPrescribableItemListSFS{
reccount:number;
oContextInformation:CContextInformation;
objPrescribeItemBase:ObservableCollection<PrescribeItemBase>;
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
export class CReqMsgGetProductPack{
oSearchBC:ProductPackSearchSelection;
oContextInformation:CContextInformation;
}
export class CResMsgGetProductPack{
nMaxRows:number;
oContextInformation:CContextInformation;
objActualProductPack:ObservableCollection<ActualProductPack>;
}
export class CReqMsgManageEANCode{
oManagedEANCodeBC:ManagedEANCode;
oContextInformation:CContextInformation;
}
export class CResMsgManageEANCode{
lnEANCode:number;
oContextInformation:CContextInformation;
}
export class CReqMsgIsEANCodeExist{
sEANCodenameBC:string;
mcversionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgIsEANCodeExist{
DuplicateEAN:string;
oContextInformation:CContextInformation;
}
export class CReqMsgGetIPPMAProcessingDetails{
IdentifyingOIDBC:number;
IdentifyingTypeBC:string;
ProcessingOIDBC:string;
sMcVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetIPPMAProcessingDetails{
oContextInformation:CContextInformation;
objProcessingInfo:ObservableCollection<IPPProcessingInfo>;
}
export class CReqMsgGetIPPMAIsDefaultValues{
sMcVersionNoBC:string;
lnItemIdBC:number;
sItemTypeBC:string;
CareActivityBC:string;
FormularyOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetIPPMAIsDefaultValues{
oContextInformation:CContextInformation;
oProcessingInfo:ObservableCollection<IPPProcessingInfo>;
}
export class CReqMsgGetItemUOM{
lnIdentifyingOIDBC:number;
sIdentifyingTypeBC:string;
sMCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetItemUOM{
oContextInformation:CContextInformation;
objUOM:ObservableCollection<UOM>;
}
export class CReqMsgGetMultiComponentList{
sDrugMultiComponentOIDBC:number;
sMCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetMultiComponentList{
oContextInformation:CContextInformation;
objMultiCompList:ObservableCollection<MultiComponentItem>;
objWarningDetails:ObservableCollection<WarningDetails>;
objDrugProperty:ObservableCollection<DrugProperty>;
}
export class CReqMsgGetMultiComponent{
sMcversionNoBC:string;
sSearchTextBC:string;
sSearchByBC:string;
sPageNoBC:number;
sPageSizeBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetMultiComponent{
reccount:number;
oContextInformation:CContextInformation;
objMultiComp:ObservableCollection<MultiComponentItem>;
}
export class CReqMsgGenerateConflictsForMulticomponent{
objDecisionSuppCriteriaBC:DecisionSupportCriteria;
oContextInformation:CContextInformation;
}
export class CResMsgGenerateConflictsForMulticomponent{
oContextInformation:CContextInformation;
objDrugWarnings:ObservableCollection<WarningItems>;
}
export class CReqMsgGetIPPFrmlyComboValues{
lnItemIdBC:number;
sItemTypeBC:string;
sMcVersionNoBC:string;
sMultiCompDetailsBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetIPPFrmlyComboValues{
oProcessingInfo:ProcessingInfo;
oContextInformation:CContextInformation;
}
export class CReqMsgGetCompatibleComponentDet{
IdentifyingOIDBC:number;
IdentifyingTypeBC:string;
sMcversionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetCompatibleComponentDet{
objCompatibleComponents:CompatibleComponents;
oContextInformation:CContextInformation;
}
export class CReqMsgCreateStockRegister{
oStockRegisterBC:StockRegister;
oContextInformation:CContextInformation;
}
export class CResMsgCreateStockRegister{
oContextInformation:CContextInformation;
}
export class CReqMsgModifyStockRegister{
oStockRegisterBC:StockRegister;
oContextInformation:CContextInformation;
}
export class CResMsgModifyStockRegister{
oContextInformation:CContextInformation;
}
export class CReqMsgCheckDuplicateDrugReg{
StockRegisterNameBC:string;
LocationOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgCheckDuplicateDrugReg{
IsDuplicate:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgSearchStockRegister{
oSearchBC:StockRegisterSearch;
oContextInformation:CContextInformation;
}
export class CResMsgSearchStockRegister{
lTotalRecordCount:number;
iLastPageRecordCount:number;
oContextInformation:CContextInformation;
oStockRegisterList:ObservableCollection<StockRegisterList>;
}
export class CReqMsgGetWardList{
oContextInformation:CContextInformation;
}
export class CResMsgGetWardList{
oContextInformation:CContextInformation;
oStockRegisterList:ObservableCollection<StockRegisterList>;
}
export class CReqMsgGetStockItems{
LocationOIDBC:number;
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetStockItems{
oContextInformation:CContextInformation;
oStockItems:ObservableCollection<StockItems>;
}
export class CReqMsgGetStockDetails{
StockOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetStockDetails{
oContextInformation:CContextInformation;
oStockRegisterList:ObservableCollection<StockRegisterList>;
}
export class CReqMsgStkRegManageActivePeriods{
oContextInformation:CContextInformation;
oManageActivePeriodsBC:ObservableCollection<ManageActivePeriods>;
}
export class CResMsgStkRegManageActivePeriods{
lnActivePeriods:number;
oContextInformation:CContextInformation;
}
export class CReqMsgGetSupplyPackUOM{
IdentifyingOIDBC:number;
sDrugTypeBC:string;
sMCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetSupplyPackUOM{
oContextInformation:CContextInformation;
oUOM:ObservableCollection<UOM>;
}
export class CReqMsgCreateOrderSet{
oOrderSetBC:OrderSet;
oContextInformation:CContextInformation;
}
export class CResMsgCreateOrderSet{
oContextInformation:CContextInformation;
}
export class CReqMsgModifyOrderSet{
oOrderSetBC:OrderSet;
oContextInformation:CContextInformation;
}
export class CResMsgModifyOrderSet{
oContextInformation:CContextInformation;
}
export class CReqMsgSearchOrderSet{
oSearchBC:OrderSetSearch;
oContextInformation:CContextInformation;
}
export class CResMsgSearchOrderSet{
TotalRecordCount:number;
LastPageRecCount:number;
oContextInformation:CContextInformation;
oOrderSetList:ObservableCollection<OrderSetList>;
}
export class CReqMsgGetOrderSetDetails{
OrderSetOIDBC:number;
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetOrderSetDetails{
oContextInformation:CContextInformation;
OrderSetListDetails:ObservableCollection<OrderSetListDetails>;
}
export class CReqMsgGetOrderSetItem{
OrderSetOIDBC:number;
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetOrderSetItem{
oContextInformation:CContextInformation;
OrderSetItem:ObservableCollection<OrderSetItem>;
}
export class CReqMsgGetOSHeaderByOID{
OrderSetOIDBC:number;
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetOSHeaderByOID{
oContextInformation:CContextInformation;
oOrderSetHeaderInfo:ObservableCollection<OrderSetHeaderInfo>;
}
export class CReqMsgGetOrderSetList{
oContextInformation:CContextInformation;
}
export class CResMsgGetOrderSetList{
oContextInformation:CContextInformation;
OrderSetListDetails:ObservableCollection<OrderSetListDetails>;
}
export class CReqMsgGetBasicSearchOrderSets{
oSearchBC:OrderSetSearch;
oContextInformation:CContextInformation;
}
export class CResMsgGetBasicSearchOrderSets{
TotalRecordCount:number;
oContextInformation:CContextInformation;
oOrderSetList:ObservableCollection<OrderSetList>;
}
export class CReqMsgCheckOrderSetDuplicate{
OrderSetBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgCheckOrderSetDuplicate{
IsDuplicate:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgGetFavouritesTreeHierarchy{
oFavTreeInputBC:FavTreeHierarchyReq;
oContextInformation:CContextInformation;
}
export class CResMsgGetFavouritesTreeHierarchy{
oContextInformation:CContextInformation;
oFavItems:ObservableCollection<FavouriteItem>;
}
export class CReqMsgGetOrderSetDetsByOID{
OrderSetOIDBC:number;
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetOrderSetDetsByOID{
oOrderSet:OrderSet;
oContextInformation:CContextInformation;
}
export class CReqMsgOrderSetManageActivePeriods{
oContextInformation:CContextInformation;
oManageActivePeriodsBC:ObservableCollection<ManageActivePeriods>;
}
export class CResMsgOrderSetManageActivePeriods{
lnActivePeriods:number;
oContextInformation:CContextInformation;
}
export class CReqMsgCheckIsInfusionRoute{
sRouteOIDsBC:string;
sMcVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgCheckIsInfusionRoute{
sInfusionRoute:string;
oContextInformation:CContextInformation;
}
export class CReqMsgHOCustomisePresItem{
oCustomisePresItemBC:CustomisePresItem;
oContextInformation:CContextInformation;
}
export class CResMsgHOCustomisePresItem{
oContextInformation:CContextInformation;
}
export class CReqMsgGetHOCustomisePresItem{
oCustomisePresItemBC:CustomisePresItem;
oContextInformation:CContextInformation;
}
export class CResMsgGetHOCustomisePresItem{
oCustomisePresItemDetails:CustomisePresItemDetails;
oContextInformation:CContextInformation;
}
export class CReqMsgGetDRCIndication{
IdentifyingOIDBC:number;
IdentifiyingTypeBC:string;
sMcVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetDRCIndication{
oContextInformation:CContextInformation;
ObjDRCnfo:ObservableCollection<DRCSysDetails>;
}
export class CReqMsgGetDRCDetails{
IdentifyingOIDBC:number;
IdentifiyingTypeBC:string;
sMcVersionNoBC:string;
sindicationidBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetDRCDetails{
oContextInformation:CContextInformation;
ObjDRCnfo:ObservableCollection<DRCSysDetails>;
}
export class CReqMsgChkRouteAssocAnyDOS{
IdentifyingOIDBC:number;
IdentifyingTypeBC:string;
lRouteOIDBC:number;
MCVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgChkRouteAssocAnyDOS{
bIsRouteAssocDOS:boolean;
CANames:string;
oContextInformation:CContextInformation;
}
export class CReqMsgGetDosageFormType{
lnDosageFormOIDBC:number;
sMCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetDosageFormType{
objDosageFormType:string;
oContextInformation:CContextInformation;
}
export class CReqMsgGetProductForVM{
lnlnCatalogueItemOIDBC:number;
sMcVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetProductForVM{
oContextInformation:CContextInformation;
ObjProductForVM:ObservableCollection<IPPProductDetails>;
}
export class CReqMsgGetIPPInfRateComboValues_P2{
sMcVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetIPPInfRateComboValues_P2{
oInfusionRateUOMs:InfusionRateUOMs;
oContextInformation:CContextInformation;
}
export class CReqMsgGetDRCdoseTypes{
MCVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetDRCdoseTypes{
oContextInformation:CContextInformation;
DRCdoseType:ObservableCollection<DRCdoseTypes>;
}
export class CReqMsgIsAnyDrugContainGivenIngredient{
oMultiComponentItemBC:CMultiComponentItem;
oContextInformation:CContextInformation;
}
export class CMultiComponentItem{
MCVersionNumber:string;
IngredientLorenzoID:string;
Components:ObservableCollection<InfusionFluidDetails>;
}
export class CResMsgIsAnyDrugContainGivenIngredient{
Result:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgGetSysMultiRoutes{
IdentifyingOIdBC:number;
IdentifyingTypeBC:string;
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetSysMultiRoutes{
oContextInformation:CContextInformation;
objmultiRoutes:ObservableCollection<MultiRoute>;
}
export class CReqMsgGetMedBarCodeConfig{
oContextInformation:CContextInformation;
}
export class CResMsgGetMedBarCodeConfig{
oMedBarCodeConfig:MedBarCodeConfig;
oContextInformation:CContextInformation;
}
export class CReqMsgManageMedBarcode{
oMedBarCodeConfigBC:MedBarCodeConfig;
oContextInformation:CContextInformation;
}
export class CResMsgManageMedBarcode{
oContextInformation:CContextInformation;
}
export class CReqMsgGetIngCustDetails{
lIngredientOIDBC:number;
sMCVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetIngCustDetails{
objIngCustDetails:IngCustDetails;
oContextInformation:CContextInformation;
}
export class IngCustDetails{
AdminWarningDetails:ObservableCollection<CWarningMsg>;
PrescWarningDetails:ObservableCollection<CWarningMsg>;
ExcludeConflictDetails:ObservableCollection<IngredientCust>;
}
export class CReqMsgCreateDrugRoundProfile{
FlagBC:boolean;
profileBC:DrugRoundProfile;
oContextInformation:CContextInformation;
}
export class CResMsgCreateDrugRoundProfile{
lnDRprofile:number;
oContextInformation:CContextInformation;
}
export class CReqMsgCopyFromExistingProfile{
oContextInformation:CContextInformation;
}
export class CResMsgCopyFromExistingProfile{
oContextInformation:CContextInformation;
oDRPObject:ObservableCollection<DrugRoundProfile>;
}
export class CReqMsgAssociatedServicePoint{
ServicepointOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgAssociatedServicePoint{
oContextInformation:CContextInformation;
objDupDrugSP:ObservableCollection<DuplicateDrugSP>;
}
export class CReqMsgIsDuplicateProfileName{
sNameBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgIsDuplicateProfileName{
bIsDuplicate:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgGetTypeBasedFrequency{
sTypeBC:string;
sMCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetTypeBasedFrequency{
oContextInformation:CContextInformation;
objArrFreq:ObservableCollection<ObjectInfo>;
sScheduleTime:ObservableCollection<string>;
}
export class CReqMsgGetDrugprofile{
SearchDetailsBC:DrugRoundFilter;
oContextInformation:CContextInformation;
}
export class CResMsgGetDrugprofile{
lnRecCount:number;
lnLastPgRecCnt:number;
oContextInformation:CContextInformation;
objDrugprofile:ObservableCollection<DrugRoundProfile>;
}
export class CReqMsgGetWitnessCriteria{
MCVersionBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetWitnessCriteria{
witnessCriteria:WitnessCriteria;
oContextInformation:CContextInformation;
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
export class CReqMsgManageWitnessCriteria{
oWitnessCriteriaBC:WitnessCriteria;
oContextInformation:CContextInformation;
}
export class CResMsgManageWitnessCriteria{
oContextInformation:CContextInformation;
}
export class CReqMsgIsWitnessRequired{
CriteriaBC:WitnessCriteria;
oContextInformation:CContextInformation;
}
export class CResMsgIsWitnessRequired{
owitnessCriteriaresult:WitnessCriteriaresult;
oContextInformation:CContextInformation;
}
export class CReqMsgGetIngredientWarning{
IdentifyingTypeBC:string;
IdentifyingOIDBC:number;
MCVersionBC:string;
WarningMesaageTypeBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetIngredientWarning{
oContextInformation:CContextInformation;
WarningMessage:ObservableCollection<string>;
}
export class CReqMsgDrugRoundManageActivePeriods{
oContextInformation:CContextInformation;
oManageActivePeriodsBC:ObservableCollection<ManageActivePeriods>;
}
export class CResMsgDrugRoundManageActivePeriods{
lnActivePeriods:number;
oContextInformation:CContextInformation;
}
export class CReqMsgGetDrugRoundProfielByOID{
oDeactivateEntityBC:DeactivateEntity;
oContextInformation:CContextInformation;
}
export class CResMsgGetDrugRoundProfielByOID{
oManageActivePeriodMain:MAPMain;
oContextInformation:CContextInformation;
}
export class CReqMsgModifyDrugRoundProfile{
profileBC:DrugRoundProfile;
oContextInformation:CContextInformation;
}
export class CResMsgModifyDrugRoundProfile{
oContextInformation:CContextInformation;
}
export class CReqMsgGetItemFrequency{
DrugRoundOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetItemFrequency{
oContextInformation:CContextInformation;
objProfileFrequency:ObservableCollection<DRProfileFrequency>;
}
export class CReqMsgGetServicePoint{
DrugRoundOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetServicePoint{
LastModifiedAt:DateTime;
oContextInformation:CContextInformation;
objProfileSP:ObservableCollection<DROProfileServicePoint>;
}
export class CReqMsgPGDManageActivePeriods{
oContextInformation:CContextInformation;
oManageActivePeriodsBC:ObservableCollection<ManageActivePeriods>;
}
export class CResMsgPGDManageActivePeriods{
lnActivePeriods:number;
oContextInformation:CContextInformation;
}
export class CReqMsgGETPGDOBJECTBYOID{
oDeactivateEntityBC:DeactivateEntity;
oContextInformation:CContextInformation;
}
export class CResMsgGETPGDOBJECTBYOID{
oManageActivePeriodMain:MAPMain;
oContextInformation:CContextInformation;
}
export class CReqMsgGetPGDListView{
CriteriaBC:PGDListSearchCriteria;
nPageLengthBC:number;
lnStartRowBC:number;
lnEndRowBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetPGDListView{
lnRecCount:number;
lnLastPgRecCnt:number;
oContextInformation:CContextInformation;
oPGDList:ObservableCollection<PGDList>;
}
export class CReqMsgCreatePGDList{
MCversionBC:string;
FlagBC:boolean;
SPROLEBC:string;
AssociatetypeBC:string;
oPGDlistBC:PGDList;
oContextInformation:CContextInformation;
}
export class CResMsgCreatePGDList{
lnPGD:number;
oContextInformation:CContextInformation;
}
export class CReqMsgGetPGDList{
oContextInformation:CContextInformation;
}
export class CResMsgGetPGDList{
oContextInformation:CContextInformation;
oPGDList:ObservableCollection<PGDList>;
}
export class CReqMsgGetPGDListByOID{
PGDListOIDBC:number;
sMcVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetPGDListByOID{
oContextInformation:CContextInformation;
objPGDListDetail:ObservableCollection<PGDListDetail>;
}
export class CReqMsgCheckDuplicatePGD{
sNameBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgCheckDuplicatePGD{
bIsDuplicate:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgModifyPGDlist{
MCversionBC:string;
FlagBC:boolean;
SPROLEBC:string;
AssociatetypeBC:string;
oPGDlistBC:PGDList;
DelPGDLorenzoIDsBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgModifyPGDlist{
lnPGD:number;
oContextInformation:CContextInformation;
}
export class CReqMsgGetPGDListAssociation{
sASSOCIATEDOIDBC:string;
TYPEBC:string;
PGDNameBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetPGDListAssociation{
oPGDList:PGDList;
oContextInformation:CContextInformation;
}
export class CReqMsgGetOIDBYFREQUENCY{
sMcVersionNoBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetOIDBYFREQUENCY{
oPGDListDetail:PGDListDetail;
oContextInformation:CContextInformation;
}
export class CReqMsgGETSPROLEASSCN{
PGDOIDBC:number;
sTypeBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGETSPROLEASSCN{
oPGDList:PGDList;
oContextInformation:CContextInformation;
}
export class MarshalByRefObject{
}

 const prototypeList = {"IPPMAPrescribableDefnWS.GetPGDList":CResMsgGetPGDList.prototype ,
"IPPMAPrescribableDefnWS.GetPGDListByOID":CResMsgGetPGDListByOID.prototype ,
"IPPMAPrescribableDefnWS.CheckDuplicatePGD":CResMsgCheckDuplicatePGD.prototype ,
"IPPMAPrescribableDefnWS.ModifyPGDlist":CResMsgModifyPGDlist.prototype ,
"IPPMAPrescribableDefnWS.GetPGDListAssociation":CResMsgGetPGDListAssociation.prototype ,
"IPPMAPrescribableDefnWS.GetOIDBYFREQUENCY":CResMsgGetOIDBYFREQUENCY.prototype ,
"IPPMAPrescribableDefnWS.GETSPROLEASSCN":CResMsgGETSPROLEASSCN.prototype ,
"IPPMAPrescribableDefnWS.GetIPPInfRateComboValues_P2":CResMsgGetIPPInfRateComboValues_P2.prototype ,
"IPPMAPrescribableDefnWS.GetDRCdoseTypes":CResMsgGetDRCdoseTypes.prototype ,
"IPPMAPrescribableDefnWS.IsAnyDrugContainGivenIngredient":CResMsgIsAnyDrugContainGivenIngredient.prototype ,
"IPPMAPrescribableDefnWS.GetSysMultiRoutes":CResMsgGetSysMultiRoutes.prototype ,
"IPPMAPrescribableDefnWS.GetMedBarCodeConfig":CResMsgGetMedBarCodeConfig.prototype ,
"IPPMAPrescribableDefnWS.ManageMedBarcode":CResMsgManageMedBarcode.prototype ,
"IPPMAPrescribableDefnWS.GetIngCustDetails":CResMsgGetIngCustDetails.prototype ,
"IPPMAPrescribableDefnWS.CreateDrugRoundProfile":CResMsgCreateDrugRoundProfile.prototype ,
"IPPMAPrescribableDefnWS.CopyFromExistingProfile":CResMsgCopyFromExistingProfile.prototype ,
"IPPMAPrescribableDefnWS.AssociatedServicePoint":CResMsgAssociatedServicePoint.prototype ,
"IPPMAPrescribableDefnWS.IsDuplicateProfileName":CResMsgIsDuplicateProfileName.prototype ,
"IPPMAPrescribableDefnWS.GetTypeBasedFrequency":CResMsgGetTypeBasedFrequency.prototype ,
"IPPMAPrescribableDefnWS.GetDrugprofile":CResMsgGetDrugprofile.prototype ,
"IPPMAPrescribableDefnWS.GetWitnessCriteria":CResMsgGetWitnessCriteria.prototype ,
"IPPMAPrescribableDefnWS.CreateFrequency":CResMsgCreateFrequency.prototype ,
"IPPMAPrescribableDefnWS.ModifyFrequency":CResMsgModifyFrequency.prototype ,
"IPPMAPrescribableDefnWS.ManageWitnessCriteria":CResMsgManageWitnessCriteria.prototype ,
"IPPMAPrescribableDefnWS.IsWitnessRequired":CResMsgIsWitnessRequired.prototype ,
"IPPMAPrescribableDefnWS.GetIngredientWarning":CResMsgGetIngredientWarning.prototype ,
"IPPMAPrescribableDefnWS.DrugRoundManageActivePeriods":CResMsgDrugRoundManageActivePeriods.prototype ,
"IPPMAPrescribableDefnWS.GetDrugRoundProfielByOID":CResMsgGetDrugRoundProfielByOID.prototype ,
"IPPMAPrescribableDefnWS.ModifyDrugRoundProfile":CResMsgModifyDrugRoundProfile.prototype ,
"IPPMAPrescribableDefnWS.GetItemFrequency":CResMsgGetItemFrequency.prototype ,
"IPPMAPrescribableDefnWS.GetServicePoint":CResMsgGetServicePoint.prototype ,
"IPPMAPrescribableDefnWS.PGDManageActivePeriods":CResMsgPGDManageActivePeriods.prototype ,
"IPPMAPrescribableDefnWS.GETPGDOBJECTBYOID":CResMsgGETPGDOBJECTBYOID.prototype ,
"IPPMAPrescribableDefnWS.GetPGDListView":CResMsgGetPGDListView.prototype ,
"IPPMAPrescribableDefnWS.CreatePGDList":CResMsgCreatePGDList.prototype ,
"IPPMAPrescribableDefnWS.ModifyStockRegister":CResMsgModifyStockRegister.prototype ,
"IPPMAPrescribableDefnWS.CheckDuplicateDrugReg":CResMsgCheckDuplicateDrugReg.prototype ,
"IPPMAPrescribableDefnWS.SearchStockRegister":CResMsgSearchStockRegister.prototype ,
"IPPMAPrescribableDefnWS.GetWardList":CResMsgGetWardList.prototype ,
"IPPMAPrescribableDefnWS.GetStockItems":CResMsgGetStockItems.prototype ,
"IPPMAPrescribableDefnWS.GetStockDetails":CResMsgGetStockDetails.prototype ,
"IPPMAPrescribableDefnWS.StkRegManageActivePeriods":CResMsgStkRegManageActivePeriods.prototype ,
"IPPMAPrescribableDefnWS.GetSupplyPackUOM":CResMsgGetSupplyPackUOM.prototype ,
"IPPMAPrescribableDefnWS.CreateOrderSet":CResMsgCreateOrderSet.prototype ,
"IPPMAPrescribableDefnWS.ModifyOrderSet":CResMsgModifyOrderSet.prototype ,
"IPPMAPrescribableDefnWS.SearchOrderSet":CResMsgSearchOrderSet.prototype ,
"IPPMAPrescribableDefnWS.GetOrderSetDetails":CResMsgGetOrderSetDetails.prototype ,
"IPPMAPrescribableDefnWS.GetOrderSetItem":CResMsgGetOrderSetItem.prototype ,
"IPPMAPrescribableDefnWS.GetOSHeaderByOID":CResMsgGetOSHeaderByOID.prototype ,
"IPPMAPrescribableDefnWS.GetOrderSetList":CResMsgGetOrderSetList.prototype ,
"IPPMAPrescribableDefnWS.GetBasicSearchOrderSets":CResMsgGetBasicSearchOrderSets.prototype ,
"IPPMAPrescribableDefnWS.CheckOrderSetDuplicate":CResMsgCheckOrderSetDuplicate.prototype ,
"IPPMAPrescribableDefnWS.GetFavouritesTreeHierarchy":CResMsgGetFavouritesTreeHierarchy.prototype ,
"IPPMAPrescribableDefnWS.GetOrderSetDetsByOID":CResMsgGetOrderSetDetsByOID.prototype ,
"IPPMAPrescribableDefnWS.OrderSetManageActivePeriods":CResMsgOrderSetManageActivePeriods.prototype ,
"IPPMAPrescribableDefnWS.CheckIsInfusionRoute":CResMsgCheckIsInfusionRoute.prototype ,
"IPPMAPrescribableDefnWS.HOCustomisePresItem":CResMsgHOCustomisePresItem.prototype ,
"IPPMAPrescribableDefnWS.GetHOCustomisePresItem":CResMsgGetHOCustomisePresItem.prototype ,
"IPPMAPrescribableDefnWS.GetDRCIndication":CResMsgGetDRCIndication.prototype ,
"IPPMAPrescribableDefnWS.GetDRCDetails":CResMsgGetDRCDetails.prototype ,
"IPPMAPrescribableDefnWS.ChkRouteAssocAnyDOS":CResMsgChkRouteAssocAnyDOS.prototype ,
"IPPMAPrescribableDefnWS.GetDosageFormType":CResMsgGetDosageFormType.prototype ,
"IPPMAPrescribableDefnWS.GetProductForVM":CResMsgGetProductForVM.prototype ,
"IPPMAPrescribableDefnWS.GetFormularyDetails":CResMsgGetFormularyDetails.prototype ,
"IPPMAPrescribableDefnWS.CheckDuplicateFormulary":CResMsgCheckDuplicateFormulary.prototype ,
"IPPMAPrescribableDefnWS.CheckDuplicateMainFormulary":CResMsgCheckDuplicateMainFormulary.prototype ,
"IPPMAPrescribableDefnWS.CreateFormulary":CResMsgCreateFormulary.prototype ,
"IPPMAPrescribableDefnWS.ManageFormulary":CResMsgManageFormulary.prototype ,
"IPPMAPrescribableDefnWS.GetGPConnectConfiguration":CResMsgGetGPConnectConfiguration.prototype ,
"IPPMAPrescribableDefnWS.ManageGPConnectConfiguration":CResMsgManageGPConnectConfiguration.prototype ,
"IPPMAPrescribableDefnWS.GetIsDefaultValues":CResMsgGetIsDefaultValues.prototype ,
"IPPMAPrescribableDefnWS.ChkDupItemlist":CResMsgChkDupItemlist.prototype ,
"IPPMAPrescribableDefnWS.GetFormularyItemDetails":CResMsgGetFormularyItemDetails.prototype ,
"IPPMAPrescribableDefnWS.GetPrescribableItemListSFS":CResMsgGetPrescribableItemListSFS.prototype ,
"IPPMAPrescribableDefnWS.CreateIngredient":CResMsgCreateIngredient.prototype ,
"IPPMAPrescribableDefnWS.ManageIngredient":CResMsgManageIngredient.prototype ,
"IPPMAPrescribableDefnWS.GetIngredient":CResMsgGetIngredient.prototype ,
"IPPMAPrescribableDefnWS.CheckIngredientIsLinked":CResMsgCheckIngredientIsLinked.prototype ,
"IPPMAPrescribableDefnWS.SearchIngredient":CResMsgSearchIngredient.prototype ,
"IPPMAPrescribableDefnWS.SearchIngredientSFS":CResMsgSearchIngredientSFS.prototype ,
"IPPMAPrescribableDefnWS.GetProductPack":CResMsgGetProductPack.prototype ,
"IPPMAPrescribableDefnWS.ManageEANCode":CResMsgManageEANCode.prototype ,
"IPPMAPrescribableDefnWS.IsEANCodeExist":CResMsgIsEANCodeExist.prototype ,
"IPPMAPrescribableDefnWS.GetIPPMAProcessingDetails":CResMsgGetIPPMAProcessingDetails.prototype ,
"IPPMAPrescribableDefnWS.GetIPPMAIsDefaultValues":CResMsgGetIPPMAIsDefaultValues.prototype ,
"IPPMAPrescribableDefnWS.GetItemUOM":CResMsgGetItemUOM.prototype ,
"IPPMAPrescribableDefnWS.GetMultiComponentList":CResMsgGetMultiComponentList.prototype ,
"IPPMAPrescribableDefnWS.GetMultiComponent":CResMsgGetMultiComponent.prototype ,
"IPPMAPrescribableDefnWS.GenerateConflictsForMulticomponent":CResMsgGenerateConflictsForMulticomponent.prototype ,
"IPPMAPrescribableDefnWS.GetIPPFrmlyComboValues":CResMsgGetIPPFrmlyComboValues.prototype ,
"IPPMAPrescribableDefnWS.GetCompatibleComponentDet":CResMsgGetCompatibleComponentDet.prototype ,
"IPPMAPrescribableDefnWS.CreateStockRegister":CResMsgCreateStockRegister.prototype ,
"IPPMAPrescribableDefnWS.GetDosageForm":CResMsgGetDosageForm.prototype ,
"IPPMAPrescribableDefnWS.ManageDosageForm":CResMsgManageDosageForm.prototype ,
"IPPMAPrescribableDefnWS.ManageFavourites":CResMsgManageFavourites.prototype ,
"IPPMAPrescribableDefnWS.GetDrugFavouriteGroupCriteria":CResMsgGetDrugFavouriteGroupCriteria.prototype ,
"IPPMAPrescribableDefnWS.GetFavouritesGroupItemsIPPMA":CResMsgGetFavouritesGroupItemsIPPMA.prototype ,
"IPPMAPrescribableDefnWS.GetFavouritesDrugItem":CResMsgGetFavouritesDrugItem.prototype ,
"IPPMAPrescribableDefnWS.ValidateMedType":CResMsgValidateMedType.prototype ,
"IPPMAPrescribableDefnWS.CreateMedicationType":CResMsgCreateMedicationType.prototype ,
"IPPMAPrescribableDefnWS.ModifyMedicationType":CResMsgModifyMedicationType.prototype ,
"IPPMAPrescribableDefnWS.GetMedicationTypeByOID":CResMsgGetMedicationTypeByOID.prototype ,
"IPPMAPrescribableDefnWS.GetMedicationType":CResMsgGetMedicationType.prototype ,
"IPPMAPrescribableDefnWS.GetMedicationTypeDetail":CResMsgGetMedicationTypeDetail.prototype ,
"IPPMAPrescribableDefnWS.GetIPPMAFrmlyComboValues":CResMsgGetIPPMAFrmlyComboValues.prototype ,
"IPPMAPrescribableDefnWS.GetDataItem":CResMsgGetDataItem.prototype ,
"IPPMAPrescribableDefnWS.CreatePrescibableItem":CResMsgCreatePrescibableItem.prototype ,
"IPPMAPrescribableDefnWS.ModifyPrescribableItem":CResMsgModifyPrescribableItem.prototype ,
"IPPMAPrescribableDefnWS.GetPresItemModifyDetails":CResMsgGetPresItemModifyDetails.prototype ,
"IPPMAPrescribableDefnWS.GetCustomiseParentFlag":CResMsgGetCustomiseParentFlag.prototype ,
"IPPMAPrescribableDefnWS.GetBasicDetails":CResMsgGetBasicDetails.prototype ,
"IPPMAPrescribableDefnWS.GetAdditionalDetails":CResMsgGetAdditionalDetails.prototype ,
"IPPMAPrescribableDefnWS.GetPrescribableItemDetailIPPMA":CResMsgGetPrescribableItemDetailIPPMA.prototype ,
"IPPMAPrescribableDefnWS.GetAllDoseUOMSFS":CResMsgGetAllDoseUOMSFS.prototype ,
"IPPMAPrescribableDefnWS.ManageRouteFormPair":CResMsgManageRouteFormPair.prototype ,
"IPPMAPrescribableDefnWS.GetMedication":CResMsgGetMedication.prototype ,
"IPPMAPrescribableDefnWS.GetRouteFormPair":CResMsgGetRouteFormPair.prototype ,
"IPPMAPrescribableDefnWS.GetMappedLorenzoObjects":CResMsgGetMappedLorenzoObjects.prototype ,
"IPPMAPrescribableDefnWS.GetRouteFormPairSFS":CResMsgGetRouteFormPairSFS.prototype ,
"IPPMAPrescribableDefnWS.CopyFormulary":CResMsgCopyFormulary.prototype ,

CReqMsgGetDosageForm : { 
oDosageFormBC:IPPDosageForm.prototype ,
oContextInformation:CContextInformation.prototype ,

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

 },FrequencyDetails : { 
Frequency:ObjectInfo.prototype ,
StatDose:MeasurableObject.prototype ,
ScheduledTimes:Scheduledetails.prototype ,

 },DoseFormula : { 
RequestedUOM:UOM.prototype ,
Freqdetail:ObjectInfo.prototype ,

 },IPPProcessingInfo : { 
oIntravenousInfusionDetails:IntravenousInfusionDetails.prototype ,
oAdminDeviceDetails:AdminDeviceDetails.prototype ,

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

 },PrescribeItemStatus : { 
ReplacementItems:PrescribeItemBase.prototype ,

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

 },Ingredient : { 
IngStatusHistory:StatusHistory.prototype ,
AdminWarning:CWarningMsg.prototype ,
PrescribeWarning:CWarningMsg.prototype ,
IngredientCust:IngredientCust.prototype ,
Coding:TTOCodification.prototype ,

 },CompatibleComponents : { 
PrescribableItem:ObjectInfo.prototype ,
CompatibleItems:CompatibleItems.prototype ,

 },IPPPrescribeItemLookUp : { 
PrescribableItem:ObjectInfo.prototype ,

 },MultiComponent : { 
Components:MultiComponentItem.prototype ,

 },MultiComponentItem : { 
Conflicts:MultiComponentConflicts.prototype ,

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

 },GPConnectItem : { 
Dosage:GPConnectAdminDosage.prototype ,

 },MedicationType : { 
RouteFormCol:RouteFormPair.prototype ,

 },RouteFormPair : { 
ObjRoute:ObjectInfo.prototype ,
ObjForm:ObjectInfo.prototype ,
Lorenzoroutes:ObjectInfo.prototype ,
Lorenzoforms:ObjectInfo.prototype ,

 },IPPProcessingDetails : { 
PRNInstructions:ObjectInfo.prototype ,

 },ObservationResult : { 
Children:ObservationResult.prototype ,

 },DataFilter : { 
DataFilterDetails:DataFilterDetails.prototype ,

 },FormularyGroup : { 
PrescriptionItem:ConstituentItem.prototype ,
FormularyOptionsGridBC:FormularyOptionGrid.prototype ,

 },ActualProductPack : { 
objEANCodes:EANCodes.prototype ,

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

 },StockRegister : { 
StockItems:StockItems.prototype ,

 },StockItems : { 
StockUOM:UOM.prototype ,
PackSizeUOM:UOM.prototype ,

 },ManageActivePeriods : { 
objAlternativeDrugs:AlternativeDrugs.prototype ,

 },OrderSet : { 
oCommonMedicines:CommonMedicines.prototype ,
Codifications:TTOCodification.prototype ,
Synonyms:Synonym.prototype ,
Links:MonographInfo.prototype ,
OrderSetItems:OrderSetItem.prototype ,
OrderSetOrphanHeaders:OrderSetOrphanHeader.prototype ,

 },OrderSetItem : { 
ProcessingInfo:IPPProcessingInfo.prototype ,
oConstituentItem:ConstituentItem.prototype ,
oWarnings:WarningDetails.prototype ,
oCommonMedicines:CommonMedicines.prototype ,

 },OrderSetSearch : { 
Codifications:TTOCodification.prototype ,

 },OrderSetList : { 
oOrderSetItem:Object.prototype ,

 },OrderSetListDetails : { 
Synonyms:Synonym.prototype ,
Codifications:TTOCodification.prototype ,

 },CustomisePresItem : { 
CLocalEprescribe:CLocalEprescribe.prototype ,
CLocalReviewPeriod:CLocalReviewPeriod.prototype ,
CLocalMultiRoute:CLocalMultiRoute.prototype ,
CLocalIndicationReq:CLocalIndicationReq.prototype ,
CLocalCD:CLocalCD.prototype ,
CLocalMonoGrph:CLocalMonoGrph.prototype ,
CLocalGroupHeader:CLocalGroupHeader.prototype ,
CLocalPrescribeNote:CLocalPrescribeNote.prototype ,
CLocalCriticalMed:CLocalCriticalMed.prototype ,
DrugProperty:DrugProperty.prototype ,
CLocalAuthorise:CLocalAuthorise.prototype ,
CLocalMedBrCodeScan:CLocalMedBrCodeScan.prototype ,
oDoseCapDetails:DoseCapDetail.prototype ,

 },CLocalAuthorise : { 
oAuthoriseRoles:AuthoriseRoles.prototype ,

 },CLocalCriticalMed : { 
oCriticalMedRoutes:CriticalMedRoutes.prototype ,

 },CLocalMonoGrph : { 
oMonograph:MonographInfo.prototype ,

 },CLocalIndicationReq : { 
oIndications:Indication.prototype ,

 },CLocalMultiRoute : { 
oRoute:Route.prototype ,

 },CustomisePresItemDetails : { 
CLocalEprescribe:CLocalEprescribe.prototype ,
CLocalReviewPeriod:CLocalReviewPeriod.prototype ,
CLocalMultiRoute:CLocalMultiRoute.prototype ,
CLocalIndicationReq:CLocalIndicationReq.prototype ,
CLocalCD:CLocalCD.prototype ,
CLocalMonoGrph:CLocalMonoGrph.prototype ,
CLocalGroupHeader:CLocalGroupHeader.prototype ,
CLocalPrescribeNote:CLocalPrescribeNote.prototype ,
CLocalCriticalMed:CLocalCriticalMed.prototype ,
DrugProperty:DrugProperty.prototype ,
CLocalAuthorise:CLocalAuthorise.prototype ,
CLocalMedBrCodeScan:CLocalMedBrCodeScan.prototype ,
oRoute:Route.prototype ,
oDoseCapDetails:DoseCapDetail.prototype ,

 },InfusionRateUOMs : { 
InfRateNumUOM:UOM.prototype ,
InfRateDenoUOM:UOM.prototype ,

 },MedBarCodeConfig : { 
oMedBarCodeEncTypeConfig:MedBarCodeEncTypeConfig.prototype ,
oMedBarCodeConfigDetails:MedBarCodeConfigDetails.prototype ,

 },DrugRoundProfile : { 
DRProfileFrequency:DRProfileFrequency.prototype ,
ServicePoints:DROProfileServicePoint.prototype ,

 },WitnessCriteria : { 
Drugs:ObjectInfo.prototype ,
Roles:ObjectInfo.prototype ,
Routes:ObjectInfo.prototype ,
ServicePoints:ObjectInfo.prototype ,
Exceptions:WitnessException.prototype ,
ExemptedRoles:ObjectInfo.prototype ,

 },WitnessException : { 
Roles:ObjectInfo.prototype ,
Drugs:ObjectInfo.prototype ,
ServicePoints:ObjectInfo.prototype ,

 },DrugFrequency : { 
Coding:TTOCodification.prototype ,
ScheduleTime:Scheduledetails.prototype ,

 },MAPMain : { 
MAPMainEntities:DeactivateEntity.prototype ,
MAPSubEntitties:ManageActivePeriods.prototype ,
MAPHistory:ManageActivePeriods.prototype ,
objAlternativeDrugs:AlternativeDrugs.prototype ,

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

 },DrugPrepDetail : { 
oPresctiptionItem:IPPMCPresctiptionItem.prototype ,

 },CResMsgGetDosageForm : { 
oContextInformation:CContextInformation.prototype ,
oArrDosageForm:IPPDosageForm.prototype ,

 },CReqMsgManageDosageForm : { 
oContextInformation:CContextInformation.prototype ,
oArrDosageFormBC:IPPDosageForm.prototype ,

 },CResMsgManageDosageForm : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgManageFavourites : { 
oContextInformation:CContextInformation.prototype ,
oArrFavouriteItemBC:FavouriteItem.prototype ,
oFavouriteAssociationBC:FavouriteAssociation.prototype ,
oDrugFavGrpPatientAgeBC:DrugFavGrpPatientAge.prototype ,
oPresGridBC:PrescriptionGridInfo.prototype ,

 },CResMsgManageFavourites : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetDrugFavouriteGroupCriteria : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDrugFavouriteGroupCriteria : { 
oContextInformation:CContextInformation.prototype ,
oDrugFavGrpPatientAge:DrugFavGrpPatientAge.prototype ,

 },CReqMsgGetFavouritesGroupItemsIPPMA : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFavouritesGroupItemsIPPMA : { 
oFavouriteItem:FavouriteItem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetFavouritesDrugItem : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFavouritesDrugItem : { 
oContextInformation:CContextInformation.prototype ,
oPrescriptionItemDetails:PrescriptionItemDetails.prototype ,

 },CReqMsgValidateMedType : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgValidateMedType : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgCreateMedicationType : { 
oMedicationTypeBC:MedicationType.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgCreateMedicationType : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgModifyMedicationType : { 
oMedicationTypeBC:MedicationType.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgModifyMedicationType : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetMedicationTypeByOID : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMedicationTypeByOID : { 
oContextInformation:CContextInformation.prototype ,
objRouteFormPair:RouteFormPair.prototype ,

 },CReqMsgGetMedicationType : { 
oCriteriaBC:MedTypeSearchCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMedicationType : { 
oContextInformation:CContextInformation.prototype ,
oMedicationType:MedicationType.prototype ,

 },CReqMsgGetMedicationTypeDetail : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMedicationTypeDetail : { 
oContextInformation:CContextInformation.prototype ,
oRouteFormPair:RouteFormPair.prototype ,

 },CReqMsgGetIPPMAFrmlyComboValues : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIPPMAFrmlyComboValues : { 
oIPPProcessingDetails:IPPProcessingDetails.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetDataItem : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDataItem : { 
oContextInformation:CContextInformation.prototype ,
oObservationResult:ObservationResult.prototype ,

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

 },CReqMsgGetPresItemModifyDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPresItemModifyDetails : { 
oDataFilter:DataFilter.prototype ,
oContextInformation:CContextInformation.prototype ,
objPrescribeItemDetails:PrescribeItemDetails.prototype ,

 },CReqMsgGetCustomiseParentFlag : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetCustomiseParentFlag : { 
oContextInformation:CContextInformation.prototype ,
CusParentFlag:CustomiseFlag.prototype ,

 },CReqMsgGetBasicDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetBasicDetails : { 
objPrescribeDetails:PrescribeItemDetails.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetAdditionalDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAdditionalDetails : { 
oContextInformation:CContextInformation.prototype ,
objPrescribeItemLookUp:IPPPrescribeItemLookUp.prototype ,

 },CReqMsgGetPrescribableItemDetailIPPMA : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPrescribableItemDetailIPPMA : { 
ProcessingInfo:IPPProcessingInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetAllDoseUOMSFS : { 
objDoseUOMBC:DoseUOM.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAllDoseUOMSFS : { 
oContextInformation:CContextInformation.prototype ,
objDoseUOMArray:DoseUOM.prototype ,

 },CReqMsgManageRouteFormPair : { 
oContextInformation:CContextInformation.prototype ,
objRouteFormBC:RouteFormPair.prototype ,

 },CResMsgManageRouteFormPair : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetMedication : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMedication : { 
oContextInformation:CContextInformation.prototype ,
LorenzoObjects:ObjectInfo.prototype ,

 },CReqMsgGetRouteFormPair : { 
objPagingBC:Pagination.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetRouteFormPair : { 
oContextInformation:CContextInformation.prototype ,
objRouteFormPair:RouteFormPair.prototype ,

 },CReqMsgGetMappedLorenzoObjects : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMappedLorenzoObjects : { 
oContextInformation:CContextInformation.prototype ,
LorenzoObjects:ObjectInfo.prototype ,

 },CReqMsgGetRouteFormPairSFS : { 
objRouteformBC:RouteFormPair.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetRouteFormPairSFS : { 
oContextInformation:CContextInformation.prototype ,
objRouteFormPair:RouteFormPair.prototype ,

 },CReqMsgCopyFormulary : { 
oFormularyGroupBC:FormularyGroup.prototype ,
oDataFilterBC:DataFilter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgCopyFormulary : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetFormularyDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFormularyDetails : { 
oFormularyGroup:FormularyGroup.prototype ,
oDataFilter:DataFilter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgCheckDuplicateFormulary : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgCheckDuplicateFormulary : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgCheckDuplicateMainFormulary : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgCheckDuplicateMainFormulary : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgCreateFormulary : { 
oFormularyGroupBC:FormularyGroup.prototype ,
oDataFilterBC:DataFilter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgCreateFormulary : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgManageFormulary : { 
oFormularyGroupBC:FormularyGroup.prototype ,
oDataFilterBC:DataFilter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgManageFormulary : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetGPConnectConfiguration : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetGPConnectConfiguration : { 
oContextInformation:CContextInformation.prototype ,
oGPConnectExcludedPresItems:GPConnectExcludedPresItems.prototype ,

 },CReqMsgManageGPConnectConfiguration : { 
oManageGPCConfigurationBC:ManageGPCConfiguration.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgManageGPConnectConfiguration : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetIsDefaultValues : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIsDefaultValues : { 
oContextInformation:CContextInformation.prototype ,
oProcessingInfo:IPPProcessingInfo.prototype ,

 },CReqMsgChkDupItemlist : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgChkDupItemlist : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetFormularyItemDetails : { 
objSerachFormularyDetailBC:SearchFormularyDetail.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFormularyItemDetails : { 
oContextInformation:CContextInformation.prototype ,
oConstituentItem:ConstituentItem.prototype ,

 },CReqMsgGetPrescribableItemListSFS : { 
objPrescribableItemSFSBC:IPPPrescribableItemListSFS.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPrescribableItemListSFS : { 
oContextInformation:CContextInformation.prototype ,
objPrescribeItemBase:PrescribeItemBase.prototype ,

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

 },CReqMsgGetProductPack : { 
oSearchBC:ProductPackSearchSelection.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProductPack : { 
oContextInformation:CContextInformation.prototype ,
objActualProductPack:ActualProductPack.prototype ,

 },CReqMsgManageEANCode : { 
oManagedEANCodeBC:ManagedEANCode.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgManageEANCode : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgIsEANCodeExist : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgIsEANCodeExist : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetIPPMAProcessingDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIPPMAProcessingDetails : { 
oContextInformation:CContextInformation.prototype ,
objProcessingInfo:IPPProcessingInfo.prototype ,

 },CReqMsgGetIPPMAIsDefaultValues : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIPPMAIsDefaultValues : { 
oContextInformation:CContextInformation.prototype ,
oProcessingInfo:IPPProcessingInfo.prototype ,

 },CReqMsgGetItemUOM : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetItemUOM : { 
oContextInformation:CContextInformation.prototype ,
objUOM:UOM.prototype ,

 },CReqMsgGetMultiComponentList : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMultiComponentList : { 
oContextInformation:CContextInformation.prototype ,
objMultiCompList:MultiComponentItem.prototype ,
objWarningDetails:WarningDetails.prototype ,
objDrugProperty:DrugProperty.prototype ,

 },CReqMsgGetMultiComponent : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMultiComponent : { 
oContextInformation:CContextInformation.prototype ,
objMultiComp:MultiComponentItem.prototype ,

 },CReqMsgGenerateConflictsForMulticomponent : { 
objDecisionSuppCriteriaBC:DecisionSupportCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGenerateConflictsForMulticomponent : { 
oContextInformation:CContextInformation.prototype ,
objDrugWarnings:WarningItems.prototype ,

 },CReqMsgGetIPPFrmlyComboValues : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIPPFrmlyComboValues : { 
oProcessingInfo:ProcessingInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetCompatibleComponentDet : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetCompatibleComponentDet : { 
objCompatibleComponents:CompatibleComponents.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgCreateStockRegister : { 
oStockRegisterBC:StockRegister.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgCreateStockRegister : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgModifyStockRegister : { 
oStockRegisterBC:StockRegister.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgModifyStockRegister : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgCheckDuplicateDrugReg : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgCheckDuplicateDrugReg : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgSearchStockRegister : { 
oSearchBC:StockRegisterSearch.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgSearchStockRegister : { 
oContextInformation:CContextInformation.prototype ,
oStockRegisterList:StockRegisterList.prototype ,

 },CReqMsgGetWardList : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetWardList : { 
oContextInformation:CContextInformation.prototype ,
oStockRegisterList:StockRegisterList.prototype ,

 },CReqMsgGetStockItems : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetStockItems : { 
oContextInformation:CContextInformation.prototype ,
oStockItems:StockItems.prototype ,

 },CReqMsgGetStockDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetStockDetails : { 
oContextInformation:CContextInformation.prototype ,
oStockRegisterList:StockRegisterList.prototype ,

 },CReqMsgStkRegManageActivePeriods : { 
oContextInformation:CContextInformation.prototype ,
oManageActivePeriodsBC:ManageActivePeriods.prototype ,

 },CResMsgStkRegManageActivePeriods : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetSupplyPackUOM : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetSupplyPackUOM : { 
oContextInformation:CContextInformation.prototype ,
oUOM:UOM.prototype ,

 },CReqMsgCreateOrderSet : { 
oOrderSetBC:OrderSet.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgCreateOrderSet : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgModifyOrderSet : { 
oOrderSetBC:OrderSet.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgModifyOrderSet : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgSearchOrderSet : { 
oSearchBC:OrderSetSearch.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgSearchOrderSet : { 
oContextInformation:CContextInformation.prototype ,
oOrderSetList:OrderSetList.prototype ,

 },CReqMsgGetOrderSetDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetOrderSetDetails : { 
oContextInformation:CContextInformation.prototype ,
OrderSetListDetails:OrderSetListDetails.prototype ,

 },CReqMsgGetOrderSetItem : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetOrderSetItem : { 
oContextInformation:CContextInformation.prototype ,
OrderSetItem:OrderSetItem.prototype ,

 },CReqMsgGetOSHeaderByOID : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetOSHeaderByOID : { 
oContextInformation:CContextInformation.prototype ,
oOrderSetHeaderInfo:OrderSetHeaderInfo.prototype ,

 },CReqMsgGetOrderSetList : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetOrderSetList : { 
oContextInformation:CContextInformation.prototype ,
OrderSetListDetails:OrderSetListDetails.prototype ,

 },CReqMsgGetBasicSearchOrderSets : { 
oSearchBC:OrderSetSearch.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetBasicSearchOrderSets : { 
oContextInformation:CContextInformation.prototype ,
oOrderSetList:OrderSetList.prototype ,

 },CReqMsgCheckOrderSetDuplicate : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgCheckOrderSetDuplicate : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetFavouritesTreeHierarchy : { 
oFavTreeInputBC:FavTreeHierarchyReq.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFavouritesTreeHierarchy : { 
oContextInformation:CContextInformation.prototype ,
oFavItems:FavouriteItem.prototype ,

 },CReqMsgGetOrderSetDetsByOID : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetOrderSetDetsByOID : { 
oOrderSet:OrderSet.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgOrderSetManageActivePeriods : { 
oContextInformation:CContextInformation.prototype ,
oManageActivePeriodsBC:ManageActivePeriods.prototype ,

 },CResMsgOrderSetManageActivePeriods : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgCheckIsInfusionRoute : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgCheckIsInfusionRoute : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgHOCustomisePresItem : { 
oCustomisePresItemBC:CustomisePresItem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgHOCustomisePresItem : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetHOCustomisePresItem : { 
oCustomisePresItemBC:CustomisePresItem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetHOCustomisePresItem : { 
oCustomisePresItemDetails:CustomisePresItemDetails.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetDRCIndication : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDRCIndication : { 
oContextInformation:CContextInformation.prototype ,
ObjDRCnfo:DRCSysDetails.prototype ,

 },CReqMsgGetDRCDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDRCDetails : { 
oContextInformation:CContextInformation.prototype ,
ObjDRCnfo:DRCSysDetails.prototype ,

 },CReqMsgChkRouteAssocAnyDOS : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgChkRouteAssocAnyDOS : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetDosageFormType : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDosageFormType : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetProductForVM : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetProductForVM : { 
oContextInformation:CContextInformation.prototype ,
ObjProductForVM:IPPProductDetails.prototype ,

 },CReqMsgGetIPPInfRateComboValues_P2 : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIPPInfRateComboValues_P2 : { 
oInfusionRateUOMs:InfusionRateUOMs.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetDRCdoseTypes : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDRCdoseTypes : { 
oContextInformation:CContextInformation.prototype ,
DRCdoseType:DRCdoseTypes.prototype ,

 },CReqMsgIsAnyDrugContainGivenIngredient : { 
oMultiComponentItemBC:CMultiComponentItem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CMultiComponentItem : { 
Components:InfusionFluidDetails.prototype ,

 },CResMsgIsAnyDrugContainGivenIngredient : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetSysMultiRoutes : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetSysMultiRoutes : { 
oContextInformation:CContextInformation.prototype ,
objmultiRoutes:MultiRoute.prototype ,

 },CReqMsgGetMedBarCodeConfig : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMedBarCodeConfig : { 
oMedBarCodeConfig:MedBarCodeConfig.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgManageMedBarcode : { 
oMedBarCodeConfigBC:MedBarCodeConfig.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgManageMedBarcode : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetIngCustDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIngCustDetails : { 
objIngCustDetails:IngCustDetails.prototype ,
oContextInformation:CContextInformation.prototype ,

 },IngCustDetails : { 
AdminWarningDetails:CWarningMsg.prototype ,
PrescWarningDetails:CWarningMsg.prototype ,
ExcludeConflictDetails:IngredientCust.prototype ,

 },CReqMsgCreateDrugRoundProfile : { 
profileBC:DrugRoundProfile.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgCreateDrugRoundProfile : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgCopyFromExistingProfile : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgCopyFromExistingProfile : { 
oContextInformation:CContextInformation.prototype ,
oDRPObject:DrugRoundProfile.prototype ,

 },CReqMsgAssociatedServicePoint : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgAssociatedServicePoint : { 
oContextInformation:CContextInformation.prototype ,
objDupDrugSP:DuplicateDrugSP.prototype ,

 },CReqMsgIsDuplicateProfileName : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgIsDuplicateProfileName : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetTypeBasedFrequency : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetTypeBasedFrequency : { 
oContextInformation:CContextInformation.prototype ,
objArrFreq:ObjectInfo.prototype ,

 },CReqMsgGetDrugprofile : { 
SearchDetailsBC:DrugRoundFilter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDrugprofile : { 
oContextInformation:CContextInformation.prototype ,
objDrugprofile:DrugRoundProfile.prototype ,

 },CReqMsgGetWitnessCriteria : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetWitnessCriteria : { 
witnessCriteria:WitnessCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

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

 },CReqMsgManageWitnessCriteria : { 
oWitnessCriteriaBC:WitnessCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgManageWitnessCriteria : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgIsWitnessRequired : { 
CriteriaBC:WitnessCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgIsWitnessRequired : { 
owitnessCriteriaresult:WitnessCriteriaresult.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetIngredientWarning : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetIngredientWarning : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgDrugRoundManageActivePeriods : { 
oContextInformation:CContextInformation.prototype ,
oManageActivePeriodsBC:ManageActivePeriods.prototype ,

 },CResMsgDrugRoundManageActivePeriods : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetDrugRoundProfielByOID : { 
oDeactivateEntityBC:DeactivateEntity.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDrugRoundProfielByOID : { 
oManageActivePeriodMain:MAPMain.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgModifyDrugRoundProfile : { 
profileBC:DrugRoundProfile.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgModifyDrugRoundProfile : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetItemFrequency : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetItemFrequency : { 
oContextInformation:CContextInformation.prototype ,
objProfileFrequency:DRProfileFrequency.prototype ,

 },CReqMsgGetServicePoint : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetServicePoint : { 
oContextInformation:CContextInformation.prototype ,
objProfileSP:DROProfileServicePoint.prototype ,

 },CReqMsgPGDManageActivePeriods : { 
oContextInformation:CContextInformation.prototype ,
oManageActivePeriodsBC:ManageActivePeriods.prototype ,

 },CResMsgPGDManageActivePeriods : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGETPGDOBJECTBYOID : { 
oDeactivateEntityBC:DeactivateEntity.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGETPGDOBJECTBYOID : { 
oManageActivePeriodMain:MAPMain.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPGDListView : { 
CriteriaBC:PGDListSearchCriteria.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPGDListView : { 
oContextInformation:CContextInformation.prototype ,
oPGDList:PGDList.prototype ,

 },CReqMsgCreatePGDList : { 
oPGDlistBC:PGDList.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgCreatePGDList : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPGDList : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPGDList : { 
oContextInformation:CContextInformation.prototype ,
oPGDList:PGDList.prototype ,

 },CReqMsgGetPGDListByOID : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPGDListByOID : { 
oContextInformation:CContextInformation.prototype ,
objPGDListDetail:PGDListDetail.prototype ,

 },CReqMsgCheckDuplicatePGD : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgCheckDuplicatePGD : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgModifyPGDlist : { 
oPGDlistBC:PGDList.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgModifyPGDlist : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPGDListAssociation : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPGDListAssociation : { 
oPGDList:PGDList.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetOIDBYFREQUENCY : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetOIDBYFREQUENCY : { 
oPGDListDetail:PGDListDetail.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGETSPROLEASSCN : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGETSPROLEASSCN : { 
oPGDList:PGDList.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CContextInformation : { 
Current:CContextInformation.prototype ,

 },
 }
 
const charPropertyLookup = [
'HasDataFilter','EncounterID','IsOxygen','CondDoseMonPeriodReq','IsOxygenCustom','CondDoseMonPeriodReqCustom','IsCDForFDBEData','IsPresItemVPforAP',
'IsExcludeGuidanceInSearch',
'IsPRN',
'IsFixedAdministration','StatIndicator','PRNScheduledDet',
'IsVolumeBasedInfusion',
'IsDisplayPrimaryListCustom','IsInfusionCustom','IsCondDoseMonPeriodReqCustom',
'IsEditable','IsPrimary',
'ConditionType','Status',
'IsTechValidateCA','MonPeriodMand',
'IsAdministered','IsControlledDrug',
'IsCriticalMedication',
'IsPGD',
'IsPRNDose','IsDrugApprovalRequired','IsConflictsExists','IsDoseCalcExist','IsAmendment','IsNonformulary','ReplaceDrugActiveStatus','DrugVersionMatch','HIIsAckn','IsReoderIconEnable','IssIDSNewMeds','IsInclude72HrsCompletedORDisconItem',
'IsSupplyReq',
'IsPresItemLevelDispense','ExistsOnAdmission',
'HasWarnings','IsHold','PrintStatus','HasDoseCalculation',
'CanDoseBeChanged','HasProhibitedRoute',
'LineIndicator',
'IsSupplyRequested',
'IsDoseCombinationsDefined',
'IsPCA',
'UpdatePatientRecord','IsDailyDose',
'IsActionPerformed',
'NotifyFlag',
'HasItemFilter',
'IsTransformGPConnectMeds',
'cIsDuplicate','IsDuplicate',
'IsSupplyRequest',
'IsConflitsON','IsDisableDRC','IsDontOpenFV','IsProtectedSeq',
'IsOrphan',
'OpModeCD','OpModeRP','OpModeIR','OpModeIND','OpModeMR','OpModeMONO','OpModeGH','OpModePN','OpModeMulti','OpModeIgnoreEPresAM','OpModeCM','OpModeA',
'IsExcludeBarcodeScan',
'IsAuthorise',
'IsCriticalMed',
'IsCriticalMedRoute','IsRemovable',
'IsInfusionFluid',
'IsMandatePatient','IsMandateMedication',
'IsActive',
'cFlagBC',
'WarningMesaageTypeBC',]
 