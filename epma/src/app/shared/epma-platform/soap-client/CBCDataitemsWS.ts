import { int64, int16, int32, uInt16, uInt32, uInt64, byte, long, double, decimal, DelegateArgs, CContextInformation, CLZOObject } from "epma-platform/models";
import { ObservableCollection } from "../models/observable-collection";
import DateTime from "../services/datetime.service";
import { HelperService } from "./helper.service";

export class CBCDataitemsWSSoapClient{

ReadAndVerifyImportDICompleted: Function;
ReadAndVerifyImportDIAsync(oCReqMsgReadAndVerifyImportDI:CReqMsgReadAndVerifyImportDI ) : void {
  HelperService.Invoke<CReqMsgReadAndVerifyImportDI,CResMsgReadAndVerifyImportDI,ReadAndVerifyImportDICompletedEventArgs>("CBCDataitemsWS.ReadAndVerifyImportDI",oCReqMsgReadAndVerifyImportDI,this.ReadAndVerifyImportDICompleted,"readParameterInfo",new ReadAndVerifyImportDICompletedEventArgs(), prototypeList, charPropertyLookup);
}

UpdateURNCompleted: Function;
UpdateURNAsync(oCReqMsgUpdateURN:CReqMsgUpdateURN ) : void {
  HelperService.Invoke<CReqMsgUpdateURN,CResMsgUpdateURN,UpdateURNCompletedEventArgs>("CBCDataitemsWS.UpdateURN",oCReqMsgUpdateURN,this.UpdateURNCompleted,"readParameterInfo",new UpdateURNCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetObservationSetRequiresUpdateCompleted: Function;
GetObservationSetRequiresUpdateAsync(oCReqMsgGetObservationSetRequiresUpdate:CReqMsgGetObservationSetRequiresUpdate ) : void {
  HelperService.Invoke<CReqMsgGetObservationSetRequiresUpdate,CResMsgGetObservationSetRequiresUpdate,GetObservationSetRequiresUpdateCompletedEventArgs>("CBCDataitemsWS.GetObservationSetRequiresUpdate",oCReqMsgGetObservationSetRequiresUpdate,this.GetObservationSetRequiresUpdateCompleted,"objReqGetObservationSetRequiresUpdate",new GetObservationSetRequiresUpdateCompletedEventArgs(), prototypeList, charPropertyLookup);
}

UpdateCompositeCompleted: Function;
UpdateCompositeAsync(oCReqMsgUpdateComposite:CReqMsgUpdateComposite ) : void {
  HelperService.Invoke<CReqMsgUpdateComposite,CResMsgUpdateComposite,UpdateCompositeCompletedEventArgs>("CBCDataitemsWS.UpdateComposite",oCReqMsgUpdateComposite,this.UpdateCompositeCompleted,"URN",new UpdateCompositeCompletedEventArgs(), prototypeList, charPropertyLookup);
}

SaveDIHistoryCompleted: Function;
SaveDIHistoryAsync(oCReqMsgSaveDIHistory:CReqMsgSaveDIHistory ) : void {
  HelperService.Invoke<CReqMsgSaveDIHistory,CResMsgSaveDIHistory,SaveDIHistoryCompletedEventArgs>("CBCDataitemsWS.SaveDIHistory",oCReqMsgSaveDIHistory,this.SaveDIHistoryCompleted,"Dataitemoid",new SaveDIHistoryCompletedEventArgs(), prototypeList, charPropertyLookup);
}

SearchNumericDICompleted: Function;
SearchNumericDIAsync(oCReqMsgSearchNumericDI:CReqMsgSearchNumericDI ) : void {
  HelperService.Invoke<CReqMsgSearchNumericDI,CResMsgSearchNumericDI,SearchNumericDICompletedEventArgs>("CBCDataitemsWS.SearchNumericDI",oCReqMsgSearchNumericDI,this.SearchNumericDICompleted,"readParameterInfo",new SearchNumericDICompletedEventArgs(), prototypeList, charPropertyLookup);
}

SaveReferenceScoreRangeCompleted: Function;
SaveReferenceScoreRangeAsync(oCReqMsgSaveReferenceScoreRange:CReqMsgSaveReferenceScoreRange ) : void {
  HelperService.Invoke<CReqMsgSaveReferenceScoreRange,CResMsgSaveReferenceScoreRange,SaveReferenceScoreRangeCompletedEventArgs>("CBCDataitemsWS.SaveReferenceScoreRange",oCReqMsgSaveReferenceScoreRange,this.SaveReferenceScoreRangeCompleted,"lstdataitempropertyScorerange",new SaveReferenceScoreRangeCompletedEventArgs(), prototypeList, charPropertyLookup);
}

SaveRAGGColorForEnumCompleted: Function;
SaveRAGGColorForEnumAsync(oCReqMsgSaveRAGGColorForEnum:CReqMsgSaveRAGGColorForEnum ) : void {
  HelperService.Invoke<CReqMsgSaveRAGGColorForEnum,CResMsgSaveRAGGColorForEnum,SaveRAGGColorForEnumCompletedEventArgs>("CBCDataitemsWS.SaveRAGGColorForEnum",oCReqMsgSaveRAGGColorForEnum,this.SaveRAGGColorForEnumCompleted,"lstdataitemEnum",new SaveRAGGColorForEnumCompletedEventArgs(), prototypeList, charPropertyLookup);
}

FindDataItemCompleted: Function;
FindDataItemAsync(oCReqMsgFindDataItem:CReqMsgFindDataItem ) : void {
  HelperService.Invoke<CReqMsgFindDataItem,CResMsgFindDataItem,FindDataItemCompletedEventArgs>("CBCDataitemsWS.FindDataItem",oCReqMsgFindDataItem,this.FindDataItemCompleted,"reqDataItem",new FindDataItemCompletedEventArgs(), prototypeList, charPropertyLookup);
}

SaveDataitemCompleted: Function;
SaveDataitemAsync(oCReqMsgSaveDataitem:CReqMsgSaveDataitem ) : void {
  HelperService.Invoke<CReqMsgSaveDataitem,CResMsgSaveDataitem,SaveDataitemCompletedEventArgs>("CBCDataitemsWS.SaveDataitem",oCReqMsgSaveDataitem,this.SaveDataitemCompleted,"objReqSaveDataitem",new SaveDataitemCompletedEventArgs(), prototypeList, charPropertyLookup);
}

RetriveChildDataitemDetailsCompleted: Function;
RetriveChildDataitemDetailsAsync(oCReqMsgRetriveChildDataitemDetails:CReqMsgRetriveChildDataitemDetails ) : void {
  HelperService.Invoke<CReqMsgRetriveChildDataitemDetails,CResMsgRetriveChildDataitemDetails,RetriveChildDataitemDetailsCompletedEventArgs>("CBCDataitemsWS.RetriveChildDataitemDetails",oCReqMsgRetriveChildDataitemDetails,this.RetriveChildDataitemDetailsCompleted,"reqDataitem",new RetriveChildDataitemDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

RetriveChildDataitemDetailsNewCompleted: Function;
RetriveChildDataitemDetailsNewAsync(oCReqMsgRetriveChildDataitemDetailsNew:CReqMsgRetriveChildDataitemDetailsNew ) : void {
  HelperService.Invoke<CReqMsgRetriveChildDataitemDetailsNew,CResMsgRetriveChildDataitemDetailsNew,RetriveChildDataitemDetailsNewCompletedEventArgs>("CBCDataitemsWS.RetriveChildDataitemDetailsNew",oCReqMsgRetriveChildDataitemDetailsNew,this.RetriveChildDataitemDetailsNewCompleted,"BulkStatus",new RetriveChildDataitemDetailsNewCompletedEventArgs(), prototypeList, charPropertyLookup);
}

IsDICompositeChildCompleted: Function;
IsDICompositeChildAsync(oCReqMsgIsDICompositeChild:CReqMsgIsDICompositeChild ) : void {
  HelperService.Invoke<CReqMsgIsDICompositeChild,CResMsgIsDICompositeChild,IsDICompositeChildCompletedEventArgs>("CBCDataitemsWS.IsDICompositeChild",oCReqMsgIsDICompositeChild,this.IsDICompositeChildCompleted,"DataitemCode",new IsDICompositeChildCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDataItemsInfoCompleted: Function;
GetDataItemsInfoAsync(oCReqMsgGetDataItemsInfo:CReqMsgGetDataItemsInfo ) : void {
  HelperService.Invoke<CReqMsgGetDataItemsInfo,CResMsgGetDataItemsInfo,GetDataItemsInfoCompletedEventArgs>("CBCDataitemsWS.GetDataItemsInfo",oCReqMsgGetDataItemsInfo,this.GetDataItemsInfoCompleted,"dataItemOIDs",new GetDataItemsInfoCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ReadCompleted: Function;
ReadAsync(oCReqMsgRead:CReqMsgRead ) : void {
  HelperService.Invoke<CReqMsgRead,CResMsgRead,ReadCompletedEventArgs>("CBCDataitemsWS.Read",oCReqMsgRead,this.ReadCompleted,"readParameterInfo",new ReadCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ReadImportCompleted: Function;
ReadImportAsync(oCReqMsgReadImport:CReqMsgReadImport ) : void {
  HelperService.Invoke<CReqMsgReadImport,CResMsgReadImport,ReadImportCompletedEventArgs>("CBCDataitemsWS.ReadImport",oCReqMsgReadImport,this.ReadImportCompleted,"readParameterInfo",new ReadImportCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ManageStatusCompleted: Function;
ManageStatusAsync(oCReqMsgManageStatus:CReqMsgManageStatus ) : void {
  HelperService.Invoke<CReqMsgManageStatus,CResMsgManageStatus,ManageStatusCompletedEventArgs>("CBCDataitemsWS.ManageStatus",oCReqMsgManageStatus,this.ManageStatusCompleted,"required",new ManageStatusCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ManageWorkingStatusCompleted: Function;
ManageWorkingStatusAsync(oCReqMsgManageWorkingStatus:CReqMsgManageWorkingStatus ) : void {
  HelperService.Invoke<CReqMsgManageWorkingStatus,CResMsgManageWorkingStatus,ManageWorkingStatusCompletedEventArgs>("CBCDataitemsWS.ManageWorkingStatus",oCReqMsgManageWorkingStatus,this.ManageWorkingStatusCompleted,"DiOID",new ManageWorkingStatusCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDtDetailsCompleted: Function;
GetDtDetailsAsync(oCReqMsgGetDtDetails:CReqMsgGetDtDetails ) : void {
  HelperService.Invoke<CReqMsgGetDtDetails,CResMsgGetDtDetails,GetDtDetailsCompletedEventArgs>("CBCDataitemsWS.GetDtDetails",oCReqMsgGetDtDetails,this.GetDtDetailsCompleted,"name",new GetDtDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

BulkManageStatusCompleted: Function;
BulkManageStatusAsync(oCReqMsgBulkManageStatus:CReqMsgBulkManageStatus ) : void {
  HelperService.Invoke<CReqMsgBulkManageStatus,CResMsgBulkManageStatus,BulkManageStatusCompletedEventArgs>("CBCDataitemsWS.BulkManageStatus",oCReqMsgBulkManageStatus,this.BulkManageStatusCompleted,"bulkobject",new BulkManageStatusCompletedEventArgs(), prototypeList, charPropertyLookup);
}

UpdateCurrentPropRangeCompleted: Function;
UpdateCurrentPropRangeAsync(oCReqMsgUpdateCurrentPropRange:CReqMsgUpdateCurrentPropRange ) : void {
  HelperService.Invoke<CReqMsgUpdateCurrentPropRange,CResMsgUpdateCurrentPropRange,UpdateCurrentPropRangeCompletedEventArgs>("CBCDataitemsWS.UpdateCurrentPropRange",oCReqMsgUpdateCurrentPropRange,this.UpdateCurrentPropRangeCompleted,"ImportFlag",new UpdateCurrentPropRangeCompletedEventArgs(), prototypeList, charPropertyLookup);
}

UpdateCurrentEnumItemCompleted: Function;
UpdateCurrentEnumItemAsync(oCReqMsgUpdateCurrentEnumItem:CReqMsgUpdateCurrentEnumItem ) : void {
  HelperService.Invoke<CReqMsgUpdateCurrentEnumItem,CResMsgUpdateCurrentEnumItem,UpdateCurrentEnumItemCompletedEventArgs>("CBCDataitemsWS.UpdateCurrentEnumItem",oCReqMsgUpdateCurrentEnumItem,this.UpdateCurrentEnumItemCompleted,"ImportFlag",new UpdateCurrentEnumItemCompletedEventArgs(), prototypeList, charPropertyLookup);
}

DuplicateCheckCompleted: Function;
DuplicateCheckAsync(oCReqMsgDuplicateCheck:CReqMsgDuplicateCheck ) : void {
  HelperService.Invoke<CReqMsgDuplicateCheck,CResMsgDuplicateCheck,DuplicateCheckCompletedEventArgs>("CBCDataitemsWS.DuplicateCheck",oCReqMsgDuplicateCheck,this.DuplicateCheckCompleted,"reqDataitem",new DuplicateCheckCompletedEventArgs(), prototypeList, charPropertyLookup);
}

SnomedDuplicateCheckCompleted: Function;
SnomedDuplicateCheckAsync(oCReqMsgSnomedDuplicateCheck:CReqMsgSnomedDuplicateCheck ) : void {
  HelperService.Invoke<CReqMsgSnomedDuplicateCheck,CResMsgSnomedDuplicateCheck,SnomedDuplicateCheckCompletedEventArgs>("CBCDataitemsWS.SnomedDuplicateCheck",oCReqMsgSnomedDuplicateCheck,this.SnomedDuplicateCheckCompleted,"info",new SnomedDuplicateCheckCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ListSearchCompleted: Function;
ListSearchAsync(oCReqMsgListSearch:CReqMsgListSearch ) : void {
  HelperService.Invoke<CReqMsgListSearch,CResMsgListSearch,ListSearchCompletedEventArgs>("CBCDataitemsWS.ListSearch",oCReqMsgListSearch,this.ListSearchCompleted,"info",new ListSearchCompletedEventArgs(), prototypeList, charPropertyLookup);
}

FormListSearchCompleted: Function;
FormListSearchAsync(oCReqMsgFormListSearch:CReqMsgFormListSearch ) : void {
  HelperService.Invoke<CReqMsgFormListSearch,CResMsgFormListSearch,FormListSearchCompletedEventArgs>("CBCDataitemsWS.FormListSearch",oCReqMsgFormListSearch,this.FormListSearchCompleted,"info",new FormListSearchCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetDataItemDetailsCompleted: Function;
GetDataItemDetailsAsync(oCReqMsgGetDataItemDetails:CReqMsgGetDataItemDetails ) : void {
  HelperService.Invoke<CReqMsgGetDataItemDetails,CResMsgGetDataItemDetails,GetDataItemDetailsCompletedEventArgs>("CBCDataitemsWS.GetDataItemDetails",oCReqMsgGetDataItemDetails,this.GetDataItemDetailsCompleted,"diInfo",new GetDataItemDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ListSearch_pagingCompleted: Function;
ListSearch_pagingAsync(oCReqMsgListSearch_paging:CReqMsgListSearch_paging ) : void {
  HelperService.Invoke<CReqMsgListSearch_paging,CResMsgListSearch_paging,ListSearch_pagingCompletedEventArgs>("CBCDataitemsWS.ListSearch_paging",oCReqMsgListSearch_paging,this.ListSearch_pagingCompleted,"info",new ListSearch_pagingCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ReadReferenceOIDCompleted: Function;
ReadReferenceOIDAsync(oCReqMsgReadReferenceOID:CReqMsgReadReferenceOID ) : void {
  HelperService.Invoke<CReqMsgReadReferenceOID,CResMsgReadReferenceOID,ReadReferenceOIDCompletedEventArgs>("CBCDataitemsWS.ReadReferenceOID",oCReqMsgReadReferenceOID,this.ReadReferenceOIDCompleted,"reqDataitem",new ReadReferenceOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

SelectSearchCompleted: Function;
SelectSearchAsync(oCReqMsgSelectSearch:CReqMsgSelectSearch ) : void {
  HelperService.Invoke<CReqMsgSelectSearch,CResMsgSelectSearch,SelectSearchCompletedEventArgs>("CBCDataitemsWS.SelectSearch",oCReqMsgSelectSearch,this.SelectSearchCompleted,"reqDataItem",new SelectSearchCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetCompositedetailsCompleted: Function;
GetCompositedetailsAsync(oCReqMsgGetCompositedetails:CReqMsgGetCompositedetails ) : void {
  HelperService.Invoke<CReqMsgGetCompositedetails,CResMsgGetCompositedetails,GetCompositedetailsCompletedEventArgs>("CBCDataitemsWS.GetCompositedetails",oCReqMsgGetCompositedetails,this.GetCompositedetailsCompleted,"isGroup",new GetCompositedetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetNestedCompDIDetailsCompleted: Function;
GetNestedCompDIDetailsAsync(oCReqMsgGetNestedCompDIDetails:CReqMsgGetNestedCompDIDetails ) : void {
  HelperService.Invoke<CReqMsgGetNestedCompDIDetails,CResMsgGetNestedCompDIDetails,GetNestedCompDIDetailsCompletedEventArgs>("CBCDataitemsWS.GetNestedCompDIDetails",oCReqMsgGetNestedCompDIDetails,this.GetNestedCompDIDetailsCompleted,"DataItemReqParam",new GetNestedCompDIDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

UpdateDataitemCompleted: Function;
UpdateDataitemAsync(oCReqMsgUpdateDataitem:CReqMsgUpdateDataitem ) : void {
  HelperService.Invoke<CReqMsgUpdateDataitem,CResMsgUpdateDataitem,UpdateDataitemCompletedEventArgs>("CBCDataitemsWS.UpdateDataitem",oCReqMsgUpdateDataitem,this.UpdateDataitemCompleted,"updateInfo",new UpdateDataitemCompletedEventArgs(), prototypeList, charPropertyLookup);
}

BulkDIUpdateCompleted: Function;
BulkDIUpdateAsync(oCReqMsgBulkDIUpdate:CReqMsgBulkDIUpdate ) : void {
  HelperService.Invoke<CReqMsgBulkDIUpdate,CResMsgBulkDIUpdate,BulkDIUpdateCompletedEventArgs>("CBCDataitemsWS.BulkDIUpdate",oCReqMsgBulkDIUpdate,this.BulkDIUpdateCompleted,"oidlist",new BulkDIUpdateCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetFormDataitemCompleted: Function;
GetFormDataitemAsync(oCReqMsgGetFormDataitem:CReqMsgGetFormDataitem ) : void {
  HelperService.Invoke<CReqMsgGetFormDataitem,CResMsgGetFormDataitem,GetFormDataitemCompletedEventArgs>("CBCDataitemsWS.GetFormDataitem",oCReqMsgGetFormDataitem,this.GetFormDataitemCompleted,"readInfo",new GetFormDataitemCompletedEventArgs(), prototypeList, charPropertyLookup);
}

UpdateGRPDIAssociationCompleted: Function;
UpdateGRPDIAssociationAsync(oCReqMsgUpdateGRPDIAssociation:CReqMsgUpdateGRPDIAssociation ) : void {
  HelperService.Invoke<CReqMsgUpdateGRPDIAssociation,CResMsgUpdateGRPDIAssociation,UpdateGRPDIAssociationCompletedEventArgs>("CBCDataitemsWS.UpdateGRPDIAssociation",oCReqMsgUpdateGRPDIAssociation,this.UpdateGRPDIAssociationCompleted,"RefDIOIDs",new UpdateGRPDIAssociationCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ReadImportNFECompleted: Function;
ReadImportNFEAsync(oCReqMsgReadImportNFE:CReqMsgReadImportNFE ) : void {
  HelperService.Invoke<CReqMsgReadImportNFE,CResMsgReadImportNFE,ReadImportNFECompletedEventArgs>("CBCDataitemsWS.ReadImportNFE",oCReqMsgReadImportNFE,this.ReadImportNFECompleted,"readParameterInfo",new ReadImportNFECompletedEventArgs(), prototypeList, charPropertyLookup);
}
}

export class ReadAndVerifyImportDICompletedEventArgs{
 public Result: CResMsgReadAndVerifyImportDI;
public Error: any;
}
export class UpdateURNCompletedEventArgs{
 public Result: CResMsgUpdateURN;
public Error: any;
}
export class GetObservationSetRequiresUpdateCompletedEventArgs{
 public Result: CResMsgGetObservationSetRequiresUpdate;
public Error: any;
}
export class UpdateCompositeCompletedEventArgs{
 public Result: CResMsgUpdateComposite;
public Error: any;
}
export class SaveDIHistoryCompletedEventArgs{
 public Result: CResMsgSaveDIHistory;
public Error: any;
}
export class SearchNumericDICompletedEventArgs{
 public Result: CResMsgSearchNumericDI;
public Error: any;
}
export class SaveReferenceScoreRangeCompletedEventArgs{
 public Result: CResMsgSaveReferenceScoreRange;
public Error: any;
}
export class SaveRAGGColorForEnumCompletedEventArgs{
 public Result: CResMsgSaveRAGGColorForEnum;
public Error: any;
}
export class FindDataItemCompletedEventArgs{
 public Result: CResMsgFindDataItem;
public Error: any;
}
export class SaveDataitemCompletedEventArgs{
 public Result: CResMsgSaveDataitem;
public Error: any;
}
export class RetriveChildDataitemDetailsCompletedEventArgs{
 public Result: CResMsgRetriveChildDataitemDetails;
public Error: any;
}
export class RetriveChildDataitemDetailsNewCompletedEventArgs{
 public Result: CResMsgRetriveChildDataitemDetailsNew;
public Error: any;
}
export class IsDICompositeChildCompletedEventArgs{
 public Result: CResMsgIsDICompositeChild;
public Error: any;
}
export class GetDataItemsInfoCompletedEventArgs{
 public Result: CResMsgGetDataItemsInfo;
public Error: any;
}
export class ReadCompletedEventArgs{
 public Result: CResMsgRead;
public Error: any;
}
export class ReadImportCompletedEventArgs{
 public Result: CResMsgReadImport;
public Error: any;
}
export class ManageStatusCompletedEventArgs{
 public Result: CResMsgManageStatus;
public Error: any;
}
export class ManageWorkingStatusCompletedEventArgs{
 public Result: CResMsgManageWorkingStatus;
public Error: any;
}
export class GetDtDetailsCompletedEventArgs{
 public Result: CResMsgGetDtDetails;
public Error: any;
}
export class BulkManageStatusCompletedEventArgs{
 public Result: CResMsgBulkManageStatus;
public Error: any;
}
export class UpdateCurrentPropRangeCompletedEventArgs{
 public Result: CResMsgUpdateCurrentPropRange;
public Error: any;
}
export class UpdateCurrentEnumItemCompletedEventArgs{
 public Result: CResMsgUpdateCurrentEnumItem;
public Error: any;
}
export class DuplicateCheckCompletedEventArgs{
 public Result: CResMsgDuplicateCheck;
public Error: any;
}
export class SnomedDuplicateCheckCompletedEventArgs{
 public Result: CResMsgSnomedDuplicateCheck;
public Error: any;
}
export class ListSearchCompletedEventArgs{
 public Result: CResMsgListSearch;
public Error: any;
}
export class FormListSearchCompletedEventArgs{
 public Result: CResMsgFormListSearch;
public Error: any;
}
export class GetDataItemDetailsCompletedEventArgs{
 public Result: CResMsgGetDataItemDetails;
public Error: any;
}
export class ListSearch_pagingCompletedEventArgs{
 public Result: CResMsgListSearch_paging;
public Error: any;
}
export class ReadReferenceOIDCompletedEventArgs{
 public Result: CResMsgReadReferenceOID;
public Error: any;
}
export class SelectSearchCompletedEventArgs{
 public Result: CResMsgSelectSearch;
public Error: any;
}
export class GetCompositedetailsCompletedEventArgs{
 public Result: CResMsgGetCompositedetails;
public Error: any;
}
export class GetNestedCompDIDetailsCompletedEventArgs{
 public Result: CResMsgGetNestedCompDIDetails;
public Error: any;
}
export class UpdateDataitemCompletedEventArgs{
 public Result: CResMsgUpdateDataitem;
public Error: any;
}
export class BulkDIUpdateCompletedEventArgs{
 public Result: CResMsgBulkDIUpdate;
public Error: any;
}
export class GetFormDataitemCompletedEventArgs{
 public Result: CResMsgGetFormDataitem;
public Error: any;
}
export class UpdateGRPDIAssociationCompletedEventArgs{
 public Result: CResMsgUpdateGRPDIAssociation;
public Error: any;
}
export class ReadImportNFECompletedEventArgs{
 public Result: CResMsgReadImportNFE;
public Error: any;
}
export class CReqMsgSaveDataitem{
objReqSaveDataitemBC:Dataitem;
oContextInformation:CContextInformation;
}
export class Dataitem{
OID:number;
CanUse:string;
Name:string;
SnomedTerm:string;
Category:string;
Caption:string;
Description:string;
Type:number;
IsSysDefined:number;
IsTimeLineRequired:string;
IsCNSRequired:string;
DataType:number;
IsSelfComposite:Object;
PrevDataType:number;
PrevDataItemType:number;
HiMObject:string;
HiMAttribute:string;
HiMAttributeQualifiedName:string;
Contributors:string;
Version:number;
ActiveStatus:number;
WorkingStatus:number;
RefDataitemOID:number;
Sequence:number;
Validated:number;
RequiresUpdate:number;
LastModified:DateTime;
Status:string;
ChildOIDs:string;
IsMandatory:number;
IsDIPropertyRangeModified:string;
IsScoreRangeUpdated:string;
Qualifier:string;
CreatedAt:DateTime;
ModifiedBy:string;
OwnerOrganisationOID:number;
DisplayName:string;
childoid:number;
ReleaseVersion:byte;
TimelineRequired:number;
URN:string;
TotalCount:number;
ParentTotal:number;
EventInfo:DataitemEventInfo;
BaseUOM:string;
DisplayOrder:number;
Categories:ObservableCollection<DataitemCategory>;
Keywords:ObservableCollection<string>;
Terms:ObservableCollection<DataitemTerm>;
UOMItems:ObservableCollection<DataitemUOM>;
Properties:ObservableCollection<DataitemProperty>;
Children:ObservableCollection<Dataitem>;
HistoryInfo:ObservableCollection<DataitemStatusHistory>;
ResultItems:ObservableCollection<HRAResultItem>;
JSSource:ObservableCollection<JSObject>;
}
export class DataitemCategory{
OID:number;
ValueCode:string;
Description:string;
iFMDataItemOID:number;
}
export class DataitemTerm{
OID:number;
Scheme:string;
SchemeOID:number;
Version:string;
Code:string;
Name:string;
Description:string;
ConceptType:number;
iFMDataItemOID:number;
TermID:string;
}
export class DataitemUOM{
DataItemOID:number;
DataItemName:string;
UOMCategoryOID:number;
UOMCategoryCode:string;
UOMCode:string;
UOMName:string;
UOMNamePlural:string;
UOMSymbol:string;
IsBaseUOM:string;
UOMPrecision:byte;
}
export class DataitemProperty{
OID:number;
PropertyOID:number;
Value:string;
Readonly:number;
iFMDataItemOID:number;
Ranges:ObservableCollection<DataitemPropertyRange>;
Items:ObservableCollection<DataitemEnumItem>;
}
export class DataitemPropertyRange{
OID:number;
MinValue:number;
MaxValue:number;
UnitOfMeasure:string;
UnitOfMeasureValue:string;
Precision:byte;
Criteria:ObservableCollection<byte>;
CriteriaNotation:string;
IsPropertyRangeModified:string;
iFMDataItemOID:number;
IFMDataItemPropertyOID:number;
ReferenceRanges:ObservableCollection<DataItemProptyScoreRange>;
}
export class DataItemProptyScoreRange{
OID:number;
DIPropertyRangeOid:number;
LowerRange:string;
UpperRange:string;
BaseUnitOfMeasure:string;
BaseunitOfValue:string;
Severity:string;
Score:number;
Status:string;
Color:string;
IsScoreRangeUpdated:string;
OrganisationOID:number;
iFMDataItemOID:number;
}
export class DataitemEnumItem{
OID:number;
PropertyOID:number;
Value:string;
Text:string;
Score:number;
IsDefault:number;
IsNegation:number;
IsExcluded:number;
IsBaseUOM:byte;
Precision:byte;
iFMDataItemOID:number;
Color:string;
Status:string;
IsEnumItemUpdated:string;
OrganisationOID:number;
IFMDataItemEnumItemOID:number;
Terms:ObservableCollection<DataitemEnumTerms>;
ColorList:ObservableCollection<DataitemEnumItemColor>;
}
export class DataitemEnumTerms{
OID:number;
Scheme:string;
Version:string;
Code:string;
Name:string;
Description:string;
TermID:string;
}
export class DataitemEnumItemColor{
OID:number;
IFMDataItemEnumItemOID:number;
ColorCode:string;
OrganisationOID:number;
IsEnumItemUpdated:string;
iFMDataItemOID:number;
Status:string;
}
export class DataitemStatusHistory{
OID:number;
Status:string;
FromDate:DateTime;
EndDate:DateTime;
Contributors:string;
Comments:string;
ActiveStatus:number;
AuthorOID:number;
Author:string;
Version:number;
PerformedRole:number;
Action:string;
PerformedOn:DateTime;
iFMDataItemOID:number;
}
export class HRAResultItem{
OID:number;
RSOID:number;
RSName:string;
RSCode:string;
RSDescription:string;
RSUOMCode:string;
RSUOMDesc:string;
RQOID:number;
RQName:string;
RQDescription:string;
Status:string;
IsMandatory:string;
DisplayOrder:number;
ResultType:string;
Version:string;
ResultStatus:string;
ResultStatusCode:string;
iFMDataItemOID:number;
}
export class DataitemEventInfo{
OID:number;
DataitemOID:number;
FullInfo:ObservableCollection<byte>;
JSSource:ObservableCollection<byte>;
JSSourceObjList:ObservableCollection<JSObject>;
}
export class JSObject{
Name:string;
SelectedObjectType:string;
MethodName:string;
JSSource:string;
}
export class CResMsgSaveDataitem{
objResSaveDataitem:Dataitem;
oContextInformation:CContextInformation;
}
export class CReqMsgRetriveChildDataitemDetails{
reqDataitemBC:Dataitem;
oContextInformation:CContextInformation;
}
export class CResMsgRetriveChildDataitemDetails{
resDataitem:Dataitem;
oContextInformation:CContextInformation;
}
export class CReqMsgRetriveChildDataitemDetailsNew{
dataitemoidsBC:string;
BulkStatusBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgRetriveChildDataitemDetailsNew{
oContextInformation:CContextInformation;
resdataitemobj:ObservableCollection<Dataitem>;
}
export class CReqMsgIsDICompositeChild{
DataitemCodeBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgIsDICompositeChild{
oContextInformation:CContextInformation;
dataitem:ObservableCollection<Dataitem>;
}
export class CReqMsgGetDataItemsInfo{
dataItemOIDsBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetDataItemsInfo{
oContextInformation:CContextInformation;
dataItemsDetails:ObservableCollection<Dataitem>;
}
export class CReqMsgRead{
readParameterInfoBC:DataitemReadParameterInfo;
oContextInformation:CContextInformation;
}
export class DataitemReadParameterInfo{
OID:number;
HiMObject:string;
HiMAttribute:string;
RequiresUpdate:number;
ActiveStatus:number;
WorkingStatus:number;
Type:number;
DataType:number;
Keyword:string;
Category:string;
FromDTTM:DateTime;
ToDTTM:DateTime;
QualifierType:number;
Contributors:string;
Version:number;
FormVersion:number;
Name:string;
Description:string;
ActiveStatusTimeLine:string;
CanUse:string;
FilterBy:string;
TabSelection:number;
CNSRequired:string;
PageSize:number;
PageNumber:number;
IsExport:boolean;
}
export class CResMsgRead{
oContextInformation:CContextInformation;
resdataitemdetails:ObservableCollection<Dataitem>;
}
export class CReqMsgReadImport{
readParameterInfoBC:DataitemReadParameterInfo;
oContextInformation:CContextInformation;
}
export class CResMsgReadImport{
oContextInformation:CContextInformation;
resdataitemdetails:ObservableCollection<Dataitem>;
}
export class CReqMsgManageStatus{
reqdataitemBC:Dataitem;
requiredBC:boolean;
oContextInformation:CContextInformation;
}
export class CResMsgManageStatus{
oContextInformation:CContextInformation;
}
export class CReqMsgManageWorkingStatus{
DiOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgManageWorkingStatus{
oContextInformation:CContextInformation;
}
export class CReqMsgGetDtDetails{
nameBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetDtDetails{
oContextInformation:CContextInformation;
resdataitemobj:ObservableCollection<Dataitem>;
}
export class CReqMsgBulkManageStatus{
bulkobjectBC:BulkManageStatus;
oContextInformation:CContextInformation;
}
export class BulkManageStatus{
Comments:string;
ActiveStatus:number;
Status:string;
PerformedRole:number;
UserOID:number;
OID:ObservableCollection<string>;
TemplateBlobToUpdate:ObservableCollection<UpdatedTemplateBlob>;
}
export class UpdatedTemplateBlob{
OID:number;
UpdatedDesignInfo:ObservableCollection<byte>;
}
export class CResMsgBulkManageStatus{
oContextInformation:CContextInformation;
}
export class CReqMsgUpdateCurrentPropRange{
prevDataItemBC:Dataitem;
currentDataItemBC:Dataitem;
ImportFlagBC:boolean;
oContextInformation:CContextInformation;
}
export class CResMsgUpdateCurrentPropRange{
retDataItem:Dataitem;
oContextInformation:CContextInformation;
}
export class CReqMsgUpdateCurrentEnumItem{
prevDataItemBC:Dataitem;
currentDataItemBC:Dataitem;
ImportFlagBC:boolean;
oContextInformation:CContextInformation;
}
export class CResMsgUpdateCurrentEnumItem{
retDataItem:Dataitem;
oContextInformation:CContextInformation;
}
export class CReqMsgDuplicateCheck{
reqDataitemBC:Dataitem;
oContextInformation:CContextInformation;
}
export class CResMsgDuplicateCheck{
isUnique:string;
oContextInformation:CContextInformation;
}
export class CReqMsgSnomedDuplicateCheck{
infoBC:DataitemDuplicateChkParameterInfo;
oContextInformation:CContextInformation;
}
export class DataitemDuplicateChkParameterInfo{
ConceptID:string;
}
export class CResMsgSnomedDuplicateCheck{
oContextInformation:CContextInformation;
di:ObservableCollection<Dataitem>;
}
export class CReqMsgListSearch{
infoBC:DataitemListParameterInfo;
oContextInformation:CContextInformation;
}
export class DataitemListParameterInfo{
Context:number;
Keyword:string;
Status:string;
FromDate:DateTime;
ToDate:DateTime;
Type:number;
HimObject:string;
CanUse:string;
ReleaseVersion:byte;
GroupBy:string;
PageNumber:number;
PageSize:number;
TotalCount:number;
ProfileValue:number;
ParentName:string;
IsOBSSET:string;
}
export class CResMsgListSearch{
oContextInformation:CContextInformation;
dataitems:ObservableCollection<Dataitem>;
}
export class CReqMsgFormListSearch{
infoBC:DataitemListParameterInfo;
oContextInformation:CContextInformation;
}
export class CResMsgFormListSearch{
oContextInformation:CContextInformation;
dataitems:ObservableCollection<Dataitem>;
}
export class CReqMsgGetDataItemDetails{
diInfoBC:DataitemListInfo;
oContextInformation:CContextInformation;
}
export class DataitemListInfo{
DataItemNames:string;
}
export class CResMsgGetDataItemDetails{
oContextInformation:CContextInformation;
dataItems:ObservableCollection<Dataitem>;
}
export class CReqMsgListSearch_paging{
infoBC:DataitemListParameterInfo;
oContextInformation:CContextInformation;
}
export class CResMsgListSearch_paging{
oContextInformation:CContextInformation;
dataitems:ObservableCollection<Dataitem>;
}
export class CReqMsgReadReferenceOID{
reqDataitemBC:Dataitem;
oContextInformation:CContextInformation;
}
export class CResMsgReadReferenceOID{
oContextInformation:CContextInformation;
resdataitem:ObservableCollection<Dataitem>;
}
export class CReqMsgSelectSearch{
reqDataItemBC:DataitemReadParameterInfo;
oContextInformation:CContextInformation;
}
export class CResMsgSelectSearch{
oContextInformation:CContextInformation;
resDataItem:ObservableCollection<Dataitem>;
}
export class CReqMsgGetCompositedetails{
compositeOIDBC:number;
isGroupBC:boolean;
oContextInformation:CContextInformation;
}
export class CResMsgGetCompositedetails{
oContextInformation:CContextInformation;
resDataItem:ObservableCollection<DataitemInstanceDetails>;
}
export class DataitemInstanceDetails{
ChildOID:number;
RefOID:number;
Name:string;
DisplayName:string;
HiMObject:string;
ReferencedVersion:number;
ReferencedStatus:number;
LatestVersion:number;
LatestStatus:number;
StatusUpdateComments:string;
LastModified:DateTime;
ModifiedBy:string;
}
export class CReqMsgGetNestedCompDIDetails{
DataItemReqParamBC:DataitemReadParam;
oContextInformation:CContextInformation;
}
export class DataitemReadParam{
DataitemOIDs:string;
DataitemRefOIDs:string;
ActiveStatus:number;
WorkingStatus:number;
IsChildAssociationReq:boolean;
DICodes:string;
DataitemNames:ObservableCollection<DataitemBasicInfo>;
}
export class DataitemBasicInfo{
DataitemOID:number;
Name:string;
Version:number;
}
export class CResMsgGetNestedCompDIDetails{
oContextInformation:CContextInformation;
resDataItem:ObservableCollection<DataItemAssociation>;
}
export class DataItemAssociation{
PrimaryIFMDataItemOID:number;
SecondaryIFMDataItemOID:number;
RefIFMDataItemOID:number;
IFMDataItemOID:number;
DisplayOrder:number;
IsMandatory:string;
ParentDIName:string;
ChildDIName:string;
ChildDisplayName:string;
ChildDataItemType:number;
ChildDataType:number;
ChildHiMObject:string;
ChildHIMAttribute:string;
ChildActiveStatus:number;
ChildVersion:number;
ChildContributors:string;
ChildModifiedAt:DateTime;
RowOrder:number;
}
export class CReqMsgUpdateDataitem{
updateInfoBC:DataitemUpdateParameterInfo;
oContextInformation:CContextInformation;
}
export class DataitemUpdateParameterInfo{
ChildoidList:string;
NameList:string;
ParentOID:number;
Type:number;
IsPartialUpdate:number;
PerformedRole:number;
}
export class CResMsgUpdateDataitem{
UpdatedStatus:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgBulkDIUpdate{
oidlistBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgBulkDIUpdate{
rows:number;
oContextInformation:CContextInformation;
}
export class CReqMsgGetFormDataitem{
readInfoBC:DataitemReadParameterInfo;
oContextInformation:CContextInformation;
}
export class CResMsgGetFormDataitem{
oContextInformation:CContextInformation;
dataitem:ObservableCollection<DataitemReadParameterInfo>;
}
export class CReqMsgUpdateGRPDIAssociation{
PrimaryDIOIDsBC:string;
RefDIOIDsBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgUpdateGRPDIAssociation{
oContextInformation:CContextInformation;
}
export class CReqMsgReadImportNFE{
readParameterInfoBC:DataitemReadParameterInfo;
oContextInformation:CContextInformation;
}
export class CResMsgReadImportNFE{
oContextInformation:CContextInformation;
resdataitemdetails:ObservableCollection<Dataitem>;
}
export class CReqMsgReadAndVerifyImportDI{
readParameterInfoBC:DataitemReadParameterInfo;
oContextInformation:CContextInformation;
}
export class CResMsgReadAndVerifyImportDI{
oContextInformation:CContextInformation;
resdataitemdetails:ObservableCollection<Dataitem>;
}
export class CReqMsgUpdateURN{
readParameterInfoBC:DataitemReadParameterInfo;
oContextInformation:CContextInformation;
}
export class CResMsgUpdateURN{
rowAffected:number;
oContextInformation:CContextInformation;
}
export class CReqMsgGetObservationSetRequiresUpdate{
oContextInformation:CContextInformation;
}
export class CResMsgGetObservationSetRequiresUpdate{
ObsSetOIDs:string;
oContextInformation:CContextInformation;
}
export class CReqMsgUpdateComposite{
DataitemNameBC:string;
URNBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgUpdateComposite{
rows:number;
oContextInformation:CContextInformation;
}
export class CReqMsgSaveDIHistory{
DihistinfoBC:DataitemStatusHistory;
DataitemoidBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgSaveDIHistory{
oContextInformation:CContextInformation;
}
export class CReqMsgSearchNumericDI{
readParameterInfoBC:DataitemReadParameterInfo;
oContextInformation:CContextInformation;
}
export class CResMsgSearchNumericDI{
oContextInformation:CContextInformation;
resdataitemdetails:ObservableCollection<Dataitem>;
}
export class CReqMsgSaveReferenceScoreRange{
oContextInformation:CContextInformation;
lstdataitempropertyScorerangeBC:ObservableCollection<DataItemProptyScoreRange>;
}
export class CResMsgSaveReferenceScoreRange{
oContextInformation:CContextInformation;
}
export class CReqMsgSaveRAGGColorForEnum{
oContextInformation:CContextInformation;
lstdataitemEnumBC:ObservableCollection<DataitemEnumItemColor>;
}
export class CResMsgSaveRAGGColorForEnum{
oContextInformation:CContextInformation;
}
export class CReqMsgFindDataItem{
reqDataItemBC:DataitemReadParameterInfo;
oContextInformation:CContextInformation;
}
export class CResMsgFindDataItem{
oContextInformation:CContextInformation;
resDataItem:ObservableCollection<Dataitem>;
}
export class MarshalByRefObject{
}

 const prototypeList = {"CBCDataitemsWS.ReadAndVerifyImportDI":CResMsgReadAndVerifyImportDI.prototype ,
"CBCDataitemsWS.UpdateURN":CResMsgUpdateURN.prototype ,
"CBCDataitemsWS.GetObservationSetRequiresUpdate":CResMsgGetObservationSetRequiresUpdate.prototype ,
"CBCDataitemsWS.UpdateComposite":CResMsgUpdateComposite.prototype ,
"CBCDataitemsWS.SaveDIHistory":CResMsgSaveDIHistory.prototype ,
"CBCDataitemsWS.SearchNumericDI":CResMsgSearchNumericDI.prototype ,
"CBCDataitemsWS.SaveReferenceScoreRange":CResMsgSaveReferenceScoreRange.prototype ,
"CBCDataitemsWS.SaveRAGGColorForEnum":CResMsgSaveRAGGColorForEnum.prototype ,
"CBCDataitemsWS.FindDataItem":CResMsgFindDataItem.prototype ,
"CBCDataitemsWS.SaveDataitem":CResMsgSaveDataitem.prototype ,
"CBCDataitemsWS.RetriveChildDataitemDetails":CResMsgRetriveChildDataitemDetails.prototype ,
"CBCDataitemsWS.RetriveChildDataitemDetailsNew":CResMsgRetriveChildDataitemDetailsNew.prototype ,
"CBCDataitemsWS.IsDICompositeChild":CResMsgIsDICompositeChild.prototype ,
"CBCDataitemsWS.GetDataItemsInfo":CResMsgGetDataItemsInfo.prototype ,
"CBCDataitemsWS.Read":CResMsgRead.prototype ,
"CBCDataitemsWS.ReadImport":CResMsgReadImport.prototype ,
"CBCDataitemsWS.ManageStatus":CResMsgManageStatus.prototype ,
"CBCDataitemsWS.ManageWorkingStatus":CResMsgManageWorkingStatus.prototype ,
"CBCDataitemsWS.GetDtDetails":CResMsgGetDtDetails.prototype ,
"CBCDataitemsWS.BulkManageStatus":CResMsgBulkManageStatus.prototype ,
"CBCDataitemsWS.UpdateCurrentPropRange":CResMsgUpdateCurrentPropRange.prototype ,
"CBCDataitemsWS.UpdateCurrentEnumItem":CResMsgUpdateCurrentEnumItem.prototype ,
"CBCDataitemsWS.DuplicateCheck":CResMsgDuplicateCheck.prototype ,
"CBCDataitemsWS.SnomedDuplicateCheck":CResMsgSnomedDuplicateCheck.prototype ,
"CBCDataitemsWS.ListSearch":CResMsgListSearch.prototype ,
"CBCDataitemsWS.FormListSearch":CResMsgFormListSearch.prototype ,
"CBCDataitemsWS.GetDataItemDetails":CResMsgGetDataItemDetails.prototype ,
"CBCDataitemsWS.ListSearch_paging":CResMsgListSearch_paging.prototype ,
"CBCDataitemsWS.ReadReferenceOID":CResMsgReadReferenceOID.prototype ,
"CBCDataitemsWS.SelectSearch":CResMsgSelectSearch.prototype ,
"CBCDataitemsWS.GetCompositedetails":CResMsgGetCompositedetails.prototype ,
"CBCDataitemsWS.GetNestedCompDIDetails":CResMsgGetNestedCompDIDetails.prototype ,
"CBCDataitemsWS.UpdateDataitem":CResMsgUpdateDataitem.prototype ,
"CBCDataitemsWS.BulkDIUpdate":CResMsgBulkDIUpdate.prototype ,
"CBCDataitemsWS.GetFormDataitem":CResMsgGetFormDataitem.prototype ,
"CBCDataitemsWS.UpdateGRPDIAssociation":CResMsgUpdateGRPDIAssociation.prototype ,
"CBCDataitemsWS.ReadImportNFE":CResMsgReadImportNFE.prototype ,

CReqMsgSaveDataitem : { 
objReqSaveDataitemBC:Dataitem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },Dataitem : { 
IsSelfComposite:Object.prototype ,
EventInfo:DataitemEventInfo.prototype ,
Categories:DataitemCategory.prototype ,
Terms:DataitemTerm.prototype ,
UOMItems:DataitemUOM.prototype ,
Properties:DataitemProperty.prototype ,
Children:Dataitem.prototype ,
HistoryInfo:DataitemStatusHistory.prototype ,
ResultItems:HRAResultItem.prototype ,
JSSource:JSObject.prototype ,

 },DataitemUOM : { 
IsBaseUOM:'Char',

 },DataitemProperty : { 
Ranges:DataitemPropertyRange.prototype ,
Items:DataitemEnumItem.prototype ,

 },DataitemPropertyRange : { 
ReferenceRanges:DataItemProptyScoreRange.prototype ,

 },DataitemEnumItem : { 
Terms:DataitemEnumTerms.prototype ,
ColorList:DataitemEnumItemColor.prototype ,

 },DataitemEventInfo : { 
JSSourceObjList:JSObject.prototype ,

 },CResMsgSaveDataitem : { 
objResSaveDataitem:Dataitem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgRetriveChildDataitemDetails : { 
reqDataitemBC:Dataitem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgRetriveChildDataitemDetails : { 
resDataitem:Dataitem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgRetriveChildDataitemDetailsNew : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgRetriveChildDataitemDetailsNew : { 
oContextInformation:CContextInformation.prototype ,
resdataitemobj:Dataitem.prototype ,

 },CReqMsgIsDICompositeChild : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgIsDICompositeChild : { 
oContextInformation:CContextInformation.prototype ,
dataitem:Dataitem.prototype ,

 },CReqMsgGetDataItemsInfo : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDataItemsInfo : { 
oContextInformation:CContextInformation.prototype ,
dataItemsDetails:Dataitem.prototype ,

 },CReqMsgRead : { 
readParameterInfoBC:DataitemReadParameterInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },DataitemReadParameterInfo : { 
CNSRequired:'Char',

 },CResMsgRead : { 
oContextInformation:CContextInformation.prototype ,
resdataitemdetails:Dataitem.prototype ,

 },CReqMsgReadImport : { 
readParameterInfoBC:DataitemReadParameterInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgReadImport : { 
oContextInformation:CContextInformation.prototype ,
resdataitemdetails:Dataitem.prototype ,

 },CReqMsgManageStatus : { 
reqdataitemBC:Dataitem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgManageStatus : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgManageWorkingStatus : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgManageWorkingStatus : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetDtDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDtDetails : { 
oContextInformation:CContextInformation.prototype ,
resdataitemobj:Dataitem.prototype ,

 },CReqMsgBulkManageStatus : { 
bulkobjectBC:BulkManageStatus.prototype ,
oContextInformation:CContextInformation.prototype ,

 },BulkManageStatus : { 
TemplateBlobToUpdate:UpdatedTemplateBlob.prototype ,

 },CResMsgBulkManageStatus : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgUpdateCurrentPropRange : { 
prevDataItemBC:Dataitem.prototype ,
currentDataItemBC:Dataitem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgUpdateCurrentPropRange : { 
retDataItem:Dataitem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgUpdateCurrentEnumItem : { 
prevDataItemBC:Dataitem.prototype ,
currentDataItemBC:Dataitem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgUpdateCurrentEnumItem : { 
retDataItem:Dataitem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgDuplicateCheck : { 
reqDataitemBC:Dataitem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgDuplicateCheck : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgSnomedDuplicateCheck : { 
infoBC:DataitemDuplicateChkParameterInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgSnomedDuplicateCheck : { 
oContextInformation:CContextInformation.prototype ,
di:Dataitem.prototype ,

 },CReqMsgListSearch : { 
infoBC:DataitemListParameterInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgListSearch : { 
oContextInformation:CContextInformation.prototype ,
dataitems:Dataitem.prototype ,

 },CReqMsgFormListSearch : { 
infoBC:DataitemListParameterInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgFormListSearch : { 
oContextInformation:CContextInformation.prototype ,
dataitems:Dataitem.prototype ,

 },CReqMsgGetDataItemDetails : { 
diInfoBC:DataitemListInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDataItemDetails : { 
oContextInformation:CContextInformation.prototype ,
dataItems:Dataitem.prototype ,

 },CReqMsgListSearch_paging : { 
infoBC:DataitemListParameterInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgListSearch_paging : { 
oContextInformation:CContextInformation.prototype ,
dataitems:Dataitem.prototype ,

 },CReqMsgReadReferenceOID : { 
reqDataitemBC:Dataitem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgReadReferenceOID : { 
oContextInformation:CContextInformation.prototype ,
resdataitem:Dataitem.prototype ,

 },CReqMsgSelectSearch : { 
reqDataItemBC:DataitemReadParameterInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgSelectSearch : { 
oContextInformation:CContextInformation.prototype ,
resDataItem:Dataitem.prototype ,

 },CReqMsgGetCompositedetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetCompositedetails : { 
oContextInformation:CContextInformation.prototype ,
resDataItem:DataitemInstanceDetails.prototype ,

 },CReqMsgGetNestedCompDIDetails : { 
DataItemReqParamBC:DataitemReadParam.prototype ,
oContextInformation:CContextInformation.prototype ,

 },DataitemReadParam : { 
DataitemNames:DataitemBasicInfo.prototype ,

 },CResMsgGetNestedCompDIDetails : { 
oContextInformation:CContextInformation.prototype ,
resDataItem:DataItemAssociation.prototype ,

 },CReqMsgUpdateDataitem : { 
updateInfoBC:DataitemUpdateParameterInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgUpdateDataitem : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgBulkDIUpdate : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgBulkDIUpdate : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetFormDataitem : { 
readInfoBC:DataitemReadParameterInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetFormDataitem : { 
oContextInformation:CContextInformation.prototype ,
dataitem:DataitemReadParameterInfo.prototype ,

 },CReqMsgUpdateGRPDIAssociation : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgUpdateGRPDIAssociation : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgReadImportNFE : { 
readParameterInfoBC:DataitemReadParameterInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgReadImportNFE : { 
oContextInformation:CContextInformation.prototype ,
resdataitemdetails:Dataitem.prototype ,

 },CReqMsgReadAndVerifyImportDI : { 
readParameterInfoBC:DataitemReadParameterInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgReadAndVerifyImportDI : { 
oContextInformation:CContextInformation.prototype ,
resdataitemdetails:Dataitem.prototype ,

 },CReqMsgUpdateURN : { 
readParameterInfoBC:DataitemReadParameterInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgUpdateURN : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetObservationSetRequiresUpdate : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetObservationSetRequiresUpdate : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgUpdateComposite : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgUpdateComposite : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgSaveDIHistory : { 
DihistinfoBC:DataitemStatusHistory.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgSaveDIHistory : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgSearchNumericDI : { 
readParameterInfoBC:DataitemReadParameterInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgSearchNumericDI : { 
oContextInformation:CContextInformation.prototype ,
resdataitemdetails:Dataitem.prototype ,

 },CReqMsgSaveReferenceScoreRange : { 
oContextInformation:CContextInformation.prototype ,
lstdataitempropertyScorerangeBC:DataItemProptyScoreRange.prototype ,

 },CResMsgSaveReferenceScoreRange : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgSaveRAGGColorForEnum : { 
oContextInformation:CContextInformation.prototype ,
lstdataitemEnumBC:DataitemEnumItemColor.prototype ,

 },CResMsgSaveRAGGColorForEnum : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgFindDataItem : { 
reqDataItemBC:DataitemReadParameterInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgFindDataItem : { 
oContextInformation:CContextInformation.prototype ,
resDataItem:Dataitem.prototype ,

 },CContextInformation : { 
Current:CContextInformation.prototype ,

 },
 }
 
const charPropertyLookup = [
'IsBaseUOM',
'CNSRequired']
export const charExceptionList = {}
 