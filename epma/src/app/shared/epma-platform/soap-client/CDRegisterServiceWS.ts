import DateTime from "epma-platform/DateTime";
import { CContextInformation, CLZOObject, long } from "epma-platform/models";
import { ObservableCollection } from "../models/observable-collection";
import { HelperService } from "./helper.service";

export class CDRegisterServiceWSSoapClient{

GetCDRegisterViewCompleted: Function;
GetCDRegisterViewAsync(oCReqMsgGetCDRegisterView:CReqMsgGetCDRegisterView ) : void {
  HelperService.Invoke<CReqMsgGetCDRegisterView,CResMsgGetCDRegisterView,GetCDRegisterViewCompletedEventArgs>("CDRegisterServiceWS.GetCDRegisterView",oCReqMsgGetCDRegisterView,this.GetCDRegisterViewCompleted,"pElement",new GetCDRegisterViewCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetCDRegisterItemPackDetailViewCompleted: Function;
GetCDRegisterItemPackDetailViewAsync(oCReqMsgGetCDRegisterItemPackDetailView:CReqMsgGetCDRegisterItemPackDetailView ) : void {
  HelperService.Invoke<CReqMsgGetCDRegisterItemPackDetailView,CResMsgGetCDRegisterItemPackDetailView,GetCDRegisterItemPackDetailViewCompletedEventArgs>("CDRegisterServiceWS.GetCDRegisterItemPackDetailView",oCReqMsgGetCDRegisterItemPackDetailView,this.GetCDRegisterItemPackDetailViewCompleted,"McVersionNo",new GetCDRegisterItemPackDetailViewCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetCDWardViewCompleted: Function;
GetCDWardViewAsync(oCReqMsgGetCDWardView:CReqMsgGetCDWardView ) : void {
  HelperService.Invoke<CReqMsgGetCDWardView,CResMsgGetCDWardView,GetCDWardViewCompletedEventArgs>("CDRegisterServiceWS.GetCDWardView",oCReqMsgGetCDWardView,this.GetCDWardViewCompleted,"pElement",new GetCDWardViewCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetCDTransactionCompleted: Function;
GetCDTransactionAsync(oCReqMsgGetCDTransaction:CReqMsgGetCDTransaction ) : void {
  HelperService.Invoke<CReqMsgGetCDTransaction,CResMsgGetCDTransaction,GetCDTransactionCompletedEventArgs>("CDRegisterServiceWS.GetCDTransaction",oCReqMsgGetCDTransaction,this.GetCDTransactionCompleted,"objSearchTransaction",new GetCDTransactionCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetVerifiedCDTransactionCompleted: Function;
GetVerifiedCDTransactionAsync(oCReqMsgGetVerifiedCDTransaction:CReqMsgGetVerifiedCDTransaction ) : void {
  HelperService.Invoke<CReqMsgGetVerifiedCDTransaction,CResMsgGetVerifiedCDTransaction,GetVerifiedCDTransactionCompletedEventArgs>("CDRegisterServiceWS.GetVerifiedCDTransaction",oCReqMsgGetVerifiedCDTransaction,this.GetVerifiedCDTransactionCompleted,"CDRegisterItemOID",new GetVerifiedCDTransactionCompletedEventArgs(), prototypeList, charPropertyLookup);
}

AddStockCompleted: Function;
AddStockAsync(oCReqMsgAddStock:CReqMsgAddStock ) : void {
  HelperService.Invoke<CReqMsgAddStock,CResMsgAddStock,AddStockCompletedEventArgs>("CDRegisterServiceWS.AddStock",oCReqMsgAddStock,this.AddStockCompleted,"objAddStockInfo",new AddStockCompletedEventArgs(), prototypeList, charPropertyLookup);
}

ManageTransactionCompleted: Function;
ManageTransactionAsync(oCReqMsgManageTransaction:CReqMsgManageTransaction ) : void {
  HelperService.Invoke<CReqMsgManageTransaction,CResMsgManageTransaction,ManageTransactionCompletedEventArgs>("CDRegisterServiceWS.ManageTransaction",oCReqMsgManageTransaction,this.ManageTransactionCompleted,"objMangeStock",new ManageTransactionCompletedEventArgs(), prototypeList, charPropertyLookup);
}

OrderStockCompleted: Function;
OrderStockAsync(oCReqMsgOrderStock:CReqMsgOrderStock ) : void {
  HelperService.Invoke<CReqMsgOrderStock,CResMsgOrderStock,OrderStockCompletedEventArgs>("CDRegisterServiceWS.OrderStock",oCReqMsgOrderStock,this.OrderStockCompleted,"oOrderStock",new OrderStockCompletedEventArgs(), prototypeList, charPropertyLookup);
}

SupplyStockCompleted: Function;
SupplyStockAsync(oCReqMsgSupplyStock:CReqMsgSupplyStock ) : void {
  HelperService.Invoke<CReqMsgSupplyStock,CResMsgSupplyStock,SupplyStockCompletedEventArgs>("CDRegisterServiceWS.SupplyStock",oCReqMsgSupplyStock,this.SupplyStockCompleted,"oSupplyStock",new SupplyStockCompletedEventArgs(), prototypeList, charPropertyLookup);
}

HOPharmacyAssociationCompleted: Function;
HOPharmacyAssociationAsync(oCReqMsgHOPharmacyAssociation:CReqMsgHOPharmacyAssociation ) : void {
  HelperService.Invoke<CReqMsgHOPharmacyAssociation,CResMsgHOPharmacyAssociation,HOPharmacyAssociationCompletedEventArgs>("CDRegisterServiceWS.HOPharmacyAssociation",oCReqMsgHOPharmacyAssociation,this.HOPharmacyAssociationCompleted,"oPharmaAssocn",new HOPharmacyAssociationCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetCDRegisteItemsCompleted: Function;
GetCDRegisteItemsAsync(oCReqMsgGetCDRegisteItems:CReqMsgGetCDRegisteItems ) : void {
  HelperService.Invoke<CReqMsgGetCDRegisteItems,CResMsgGetCDRegisteItems,GetCDRegisteItemsCompletedEventArgs>("CDRegisterServiceWS.GetCDRegisteItems",oCReqMsgGetCDRegisteItems,this.GetCDRegisteItemsCompleted,"oSearchRegister",new GetCDRegisteItemsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetQtyandUOMListByLzoIDCompleted: Function;
GetQtyandUOMListByLzoIDAsync(oCReqMsgGetQtyandUOMListByLzoID:CReqMsgGetQtyandUOMListByLzoID ) : void {
  HelperService.Invoke<CReqMsgGetQtyandUOMListByLzoID,CResMsgGetQtyandUOMListByLzoID,GetQtyandUOMListByLzoIDCompletedEventArgs>("CDRegisterServiceWS.GetQtyandUOMListByLzoID",oCReqMsgGetQtyandUOMListByLzoID,this.GetQtyandUOMListByLzoIDCompleted,"oSearchRegister",new GetQtyandUOMListByLzoIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPharmacyHOAssociationCompleted: Function;
GetPharmacyHOAssociationAsync(oCReqMsgGetPharmacyHOAssociation:CReqMsgGetPharmacyHOAssociation ) : void {
  HelperService.Invoke<CReqMsgGetPharmacyHOAssociation,CResMsgGetPharmacyHOAssociation,GetPharmacyHOAssociationCompletedEventArgs>("CDRegisterServiceWS.GetPharmacyHOAssociation",oCReqMsgGetPharmacyHOAssociation,this.GetPharmacyHOAssociationCompleted,"OrganisationOID",new GetPharmacyHOAssociationCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetOrdersCompleted: Function;
GetOrdersAsync(oCReqMsgGetOrders:CReqMsgGetOrders ) : void {
  HelperService.Invoke<CReqMsgGetOrders,CResMsgGetOrders,GetOrdersCompletedEventArgs>("CDRegisterServiceWS.GetOrders",oCReqMsgGetOrders,this.GetOrdersCompleted,"pElement",new GetOrdersCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetOrderDetailsCompleted: Function;
GetOrderDetailsAsync(oCReqMsgGetOrderDetails:CReqMsgGetOrderDetails ) : void {
  HelperService.Invoke<CReqMsgGetOrderDetails,CResMsgGetOrderDetails,GetOrderDetailsCompletedEventArgs>("CDRegisterServiceWS.GetOrderDetails",oCReqMsgGetOrderDetails,this.GetOrderDetailsCompleted,"McVersionNo",new GetOrderDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetRegisterItemForOrderItemDetailCompleted: Function;
GetRegisterItemForOrderItemDetailAsync(oCReqMsgGetRegisterItemForOrderItemDetail:CReqMsgGetRegisterItemForOrderItemDetail ) : void {
  HelperService.Invoke<CReqMsgGetRegisterItemForOrderItemDetail,CResMsgGetRegisterItemForOrderItemDetail,GetRegisterItemForOrderItemDetailCompletedEventArgs>("CDRegisterServiceWS.GetRegisterItemForOrderItemDetail",oCReqMsgGetRegisterItemForOrderItemDetail,this.GetRegisterItemForOrderItemDetailCompleted,"oSearchOrder",new GetRegisterItemForOrderItemDetailCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetRegisterOIDForServiceCompleted: Function;
GetRegisterOIDForServiceAsync(oCReqMsgGetRegisterOIDForService:CReqMsgGetRegisterOIDForService ) : void {
  HelperService.Invoke<CReqMsgGetRegisterOIDForService,CResMsgGetRegisterOIDForService,GetRegisterOIDForServiceCompletedEventArgs>("CDRegisterServiceWS.GetRegisterOIDForService",oCReqMsgGetRegisterOIDForService,this.GetRegisterOIDForServiceCompleted,"oSearchRegister",new GetRegisterOIDForServiceCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetCurrStockByRegItemOIDCompleted: Function;
GetCurrStockByRegItemOIDAsync(oCReqMsgGetCurrStockByRegItemOID:CReqMsgGetCurrStockByRegItemOID ) : void {
  HelperService.Invoke<CReqMsgGetCurrStockByRegItemOID,CResMsgGetCurrStockByRegItemOID,GetCurrStockByRegItemOIDCompletedEventArgs>("CDRegisterServiceWS.GetCurrStockByRegItemOID",oCReqMsgGetCurrStockByRegItemOID,this.GetCurrStockByRegItemOIDCompleted,"RegItemOID",new GetCurrStockByRegItemOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

VerifyStockCompleted: Function;
VerifyStockAsync(oCReqMsgVerifyStock:CReqMsgVerifyStock ) : void {
  HelperService.Invoke<CReqMsgVerifyStock,CResMsgVerifyStock,VerifyStockCompletedEventArgs>("CDRegisterServiceWS.VerifyStock",oCReqMsgVerifyStock,this.VerifyStockCompleted,"oVerifyStock",new VerifyStockCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPendingUpdatesTransactionsCompleted: Function;
GetPendingUpdatesTransactionsAsync(oCReqMsgGetPendingUpdatesTransactions:CReqMsgGetPendingUpdatesTransactions ) : void {
  HelperService.Invoke<CReqMsgGetPendingUpdatesTransactions,CResMsgGetPendingUpdatesTransactions,GetPendingUpdatesTransactionsCompletedEventArgs>("CDRegisterServiceWS.GetPendingUpdatesTransactions",oCReqMsgGetPendingUpdatesTransactions,this.GetPendingUpdatesTransactionsCompleted,"RegItemOID",new GetPendingUpdatesTransactionsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

UpdatePendingTransactionCompleted: Function;
UpdatePendingTransactionAsync(oCReqMsgUpdatePendingTransaction:CReqMsgUpdatePendingTransaction ) : void {
  HelperService.Invoke<CReqMsgUpdatePendingTransaction,CResMsgUpdatePendingTransaction,UpdatePendingTransactionCompletedEventArgs>("CDRegisterServiceWS.UpdatePendingTransaction",oCReqMsgUpdatePendingTransaction,this.UpdatePendingTransactionCompleted,"objPendingStock",new UpdatePendingTransactionCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPatientStockCompleted: Function;
GetPatientStockAsync(oCReqMsgGetPatientStock:CReqMsgGetPatientStock ) : void {
  HelperService.Invoke<CReqMsgGetPatientStock,CResMsgGetPatientStock,GetPatientStockCompletedEventArgs>("CDRegisterServiceWS.GetPatientStock",oCReqMsgGetPatientStock,this.GetPatientStockCompleted,"pElement",new GetPatientStockCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPatientMezzanineDetailsCompleted: Function;
GetPatientMezzanineDetailsAsync(oCReqMsgGetPatientMezzanineDetails:CReqMsgGetPatientMezzanineDetails ) : void {
  HelperService.Invoke<CReqMsgGetPatientMezzanineDetails,CResMsgGetPatientMezzanineDetails,GetPatientMezzanineDetailsCompletedEventArgs>("CDRegisterServiceWS.GetPatientMezzanineDetails",oCReqMsgGetPatientMezzanineDetails,this.GetPatientMezzanineDetailsCompleted,"dEcDate",new GetPatientMezzanineDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPatientStockDetailsCompleted: Function;
GetPatientStockDetailsAsync(oCReqMsgGetPatientStockDetails:CReqMsgGetPatientStockDetails ) : void {
  HelperService.Invoke<CReqMsgGetPatientStockDetails,CResMsgGetPatientStockDetails,GetPatientStockDetailsCompletedEventArgs>("CDRegisterServiceWS.GetPatientStockDetails",oCReqMsgGetPatientStockDetails,this.GetPatientStockDetailsCompleted,"OrganisationOID",new GetPatientStockDetailsCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetSupplyDetailsWithPackByOrderOIDCompleted: Function;
GetSupplyDetailsWithPackByOrderOIDAsync(oCReqMsgGetSupplyDetailsWithPackByOrderOID:CReqMsgGetSupplyDetailsWithPackByOrderOID ) : void {
  HelperService.Invoke<CReqMsgGetSupplyDetailsWithPackByOrderOID,CResMsgGetSupplyDetailsWithPackByOrderOID,GetSupplyDetailsWithPackByOrderOIDCompletedEventArgs>("CDRegisterServiceWS.GetSupplyDetailsWithPackByOrderOID",oCReqMsgGetSupplyDetailsWithPackByOrderOID,this.GetSupplyDetailsWithPackByOrderOIDCompleted,"McVersionNo",new GetSupplyDetailsWithPackByOrderOIDCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPharmacyOnOrderCountCompleted: Function;
GetPharmacyOnOrderCountAsync(oCReqMsgGetPharmacyOnOrderCount:CReqMsgGetPharmacyOnOrderCount ) : void {
  HelperService.Invoke<CReqMsgGetPharmacyOnOrderCount,CResMsgGetPharmacyOnOrderCount,GetPharmacyOnOrderCountCompletedEventArgs>("CDRegisterServiceWS.GetPharmacyOnOrderCount",oCReqMsgGetPharmacyOnOrderCount,this.GetPharmacyOnOrderCountCompleted,"OrganisationOID",new GetPharmacyOnOrderCountCompletedEventArgs(), prototypeList, charPropertyLookup);
}

GetPharmacyForSPTypeCompleted: Function;
GetPharmacyForSPTypeAsync(oCReqMsgGetPharmacyForSPType:CReqMsgGetPharmacyForSPType ) : void {
  HelperService.Invoke<CReqMsgGetPharmacyForSPType,CResMsgGetPharmacyForSPType,GetPharmacyForSPTypeCompletedEventArgs>("CDRegisterServiceWS.GetPharmacyForSPType",oCReqMsgGetPharmacyForSPType,this.GetPharmacyForSPTypeCompleted,"SPType",new GetPharmacyForSPTypeCompletedEventArgs(), prototypeList, charPropertyLookup);
}

PatientStockHandOverCompleted: Function;
PatientStockHandOverAsync(oCReqMsgPatientStockHandOver:CReqMsgPatientStockHandOver ) : void {
  HelperService.Invoke<CReqMsgPatientStockHandOver,CResMsgPatientStockHandOver,PatientStockHandOverCompletedEventArgs>("CDRegisterServiceWS.PatientStockHandOver",oCReqMsgPatientStockHandOver,this.PatientStockHandOverCompleted,"objPatstockHover",new PatientStockHandOverCompletedEventArgs(), prototypeList, charPropertyLookup);
}
}

export class GetCDRegisterViewCompletedEventArgs{
 public Result: CResMsgGetCDRegisterView;
public Error: any;
}
export class GetCDRegisterItemPackDetailViewCompletedEventArgs{
 public Result: CResMsgGetCDRegisterItemPackDetailView;
public Error: any;
}
export class GetCDWardViewCompletedEventArgs{
 public Result: CResMsgGetCDWardView;
public Error: any;
}
export class GetCDTransactionCompletedEventArgs{
 public Result: CResMsgGetCDTransaction;
public Error: any;
}
export class GetVerifiedCDTransactionCompletedEventArgs{
 public Result: CResMsgGetVerifiedCDTransaction;
public Error: any;
}
export class AddStockCompletedEventArgs{
 public Result: CResMsgAddStock;
public Error: any;
}
export class ManageTransactionCompletedEventArgs{
 public Result: CResMsgManageTransaction;
public Error: any;
}
export class OrderStockCompletedEventArgs{
 public Result: CResMsgOrderStock;
public Error: any;
}
export class SupplyStockCompletedEventArgs{
 public Result: CResMsgSupplyStock;
public Error: any;
}
export class HOPharmacyAssociationCompletedEventArgs{
 public Result: CResMsgHOPharmacyAssociation;
public Error: any;
}
export class GetCDRegisteItemsCompletedEventArgs{
 public Result: CResMsgGetCDRegisteItems;
public Error: any;
}
export class GetQtyandUOMListByLzoIDCompletedEventArgs{
 public Result: CResMsgGetQtyandUOMListByLzoID;
public Error: any;
}
export class GetPharmacyHOAssociationCompletedEventArgs{
 public Result: CResMsgGetPharmacyHOAssociation;
public Error: any;
}
export class GetOrdersCompletedEventArgs{
 public Result: CResMsgGetOrders;
public Error: any;
}
export class GetOrderDetailsCompletedEventArgs{
 public Result: CResMsgGetOrderDetails;
public Error: any;
}
export class GetRegisterItemForOrderItemDetailCompletedEventArgs{
 public Result: CResMsgGetRegisterItemForOrderItemDetail;
public Error: any;
}
export class GetRegisterOIDForServiceCompletedEventArgs{
 public Result: CResMsgGetRegisterOIDForService;
public Error: any;
}
export class GetCurrStockByRegItemOIDCompletedEventArgs{
 public Result: CResMsgGetCurrStockByRegItemOID;
public Error: any;
}
export class VerifyStockCompletedEventArgs{
 public Result: CResMsgVerifyStock;
public Error: any;
}
export class GetPendingUpdatesTransactionsCompletedEventArgs{
 public Result: CResMsgGetPendingUpdatesTransactions;
public Error: any;
}
export class UpdatePendingTransactionCompletedEventArgs{
 public Result: CResMsgUpdatePendingTransaction;
public Error: any;
}
export class GetPatientStockCompletedEventArgs{
 public Result: CResMsgGetPatientStock;
public Error: any;
}
export class GetPatientMezzanineDetailsCompletedEventArgs{
 public Result: CResMsgGetPatientMezzanineDetails;
public Error: any;
}
export class GetPatientStockDetailsCompletedEventArgs{
 public Result: CResMsgGetPatientStockDetails;
public Error: any;
}
export class GetSupplyDetailsWithPackByOrderOIDCompletedEventArgs{
 public Result: CResMsgGetSupplyDetailsWithPackByOrderOID;
public Error: any;
}
export class GetPharmacyOnOrderCountCompletedEventArgs{
 public Result: CResMsgGetPharmacyOnOrderCount;
public Error: any;
}
export class GetPharmacyForSPTypeCompletedEventArgs{
 public Result: CResMsgGetPharmacyForSPType;
public Error: any;
}
export class PatientStockHandOverCompletedEventArgs{
 public Result: CResMsgPatientStockHandOver;
public Error: any;
}
export class CReqMsgGetCDRegisterView{
objSearchRegisterBC:SearchRegister;
pElementBC:PagingDynamicSQL;
oContextInformation:CContextInformation;
}
export class SearchRegister{
LorenzoID:string;
DispensedOn:DateTime;
BatchNo:string;
ExpiredMonth:string;
ExpiredYear:string;
StocklevelOperator:string;
StocklevelQuantity:string;
StocklevelUOMID:string;
RegisterItemOID:number;
ServiceOID:number;
LocationOID:number;
OrganisationOID:number;
PageSize:number;
PageNumber:number;
PageCount:number;
PatientOID:number;
McVersionNo:number;
RegisterTypeCode:string;
CatalogueItemOID:number;
ItemType:string;
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
export class CResMsgGetCDRegisterView{
iPageCount:number;
oContextInformation:CContextInformation;
objViewRegisterItem:ObservableCollection<RegisterItemsView>;
}
export class RegisterItemsView{
LorenzoID:string;
PrescribableItemName:string;
RegisterItemOID:number;
CurrentStock:string;
VerifiedOn:DateTime;
PageSize:number;
PageNumber:number;
PageCount:number;
CurrentStockWithUOM:string;
LzoUOMID:string;
ServicePointName:string;
oRegItemPackDetail:ObservableCollection<RegisterItemsPackDetailView>;
}
export class RegisterItemsPackDetailView{
BatchNO:string;
ExpiryDate:DateTime;
Quantity:string;
}
export class CReqMsgGetCDRegisterItemPackDetailView{
RegisterItemOIDBC:number;
McVersionNoBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetCDRegisterItemPackDetailView{
oContextInformation:CContextInformation;
objRegItemPackDetView:ObservableCollection<RegisterItemsPackDetailView>;
}
export class CReqMsgGetCDWardView{
oSearchRegisterBC:SearchRegister;
pElementBC:PagingDynamicSQL;
oContextInformation:CContextInformation;
}
export class CResMsgGetCDWardView{
iPageCount:number;
oContextInformation:CContextInformation;
objWardView:ObservableCollection<WardView>;
}
export class WardView{
WardOID:number;
WardName:string;
LocationOID:number;
LocationName:string;
PageSize:number;
PageNumber:number;
PageCount:number;
}
export class CReqMsgGetCDTransaction{
objSearchTransactionBC:SearchTransaction;
oContextInformation:CContextInformation;
}
export class SearchTransaction{
RegisterItemOID:number;
TransactionType:string;
Period:string;
FromDate:DateTime;
Todate:DateTime;
PageSize:number;
PageNumber:number;
PageCount:number;
McVersionNo:number;
}
export class CResMsgGetCDTransaction{
oContextInformation:CContextInformation;
objItemTransaction:ObservableCollection<ItemTransaction>;
}

export class ItemTransaction extends CLZOObject{
RegisterItemOID:number;
TransactionQuantity:string;
TransactionDTTM:DateTime;
TransactionBy:number;
TransactionTypeCode:string;
WitnessedByOID:number;
RecdFromIdentifyingType:string;
RecdFromIdentifyingValue:string;
TxnStockLevel:string;
ModifyReasonCode:string;
ModifyComments:string;
AdjustmentReasonCode:string;
AdjustmentComments:string;
WastageQuantity:string;
MedAdminOID:number;
IsStrikeOut:string;
IsPendingForUpdate:string;
LorenzoID:number;
IsAccepted:string;
IsVerified:string;
OID:number;
PerformedBy:string;
WitnessedBy:string;
SelectedTransactionQuantity:string;
PatientOID:number;
DeltaQuantity:number;
LastVerifiedDTTM:DateTime;
VerifiedToolTip:string;
PrevStockLevel:string;
DrugName:string;
UOM:string;
SelectedTransactionDTTM:DateTime;
PatientID:string;
PatientName:string;
PatAddress:string;
CDTransactionMasterOID:number;
PatientServiceOID:number;
PatientServiceName:string;
PrescribedByOID:number;
PrescribedBy:string;
OrderNumber:string;
oTransactionItemPackDetail:ObservableCollection<TransactionItemPackDetail>;
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
export class AddStock extends CLZOObject{
oRegister:CRegister;
Receivedby:number;
ReceivedOn:DateTime;
WitnessBy:number;
ReceivedFromType:string;
ReceivedFrom:string;
OrderOID:number;
OrderStatus:string;
oRegisterItem:ObservableCollection<RegisterItem>;
}
export class CRegister extends CLZOObject{
ServicePointOID:number;
LocationOID:number;
PatientOID:number;
RegisterTypeCode:string;
OwnerOrganisationOID:number;
Partkey:number;
ReceivedBy:number;
ReceivedOn:DateTime;
WitnessedBy:number;
ReceivedFromType:string;
ReceivedSource:string;
OID:number;
}
export class RegisterItem extends CLZOObject{
RegisterOID:number;
LorenzoID:string;
CurrentStock:string;
CurrentStockUOMID:string;
LastVerifiedOn:DateTime;
OID:number;
OrderItemOID:number;
OrderItemStatus:string;
SupplyItemDetailOID:number;
oRegisterItemPackDetail:ObservableCollection<RegisterItemPackDetail>;
}
export class RegisterItemPackDetail extends CLZOObject{
RegisterItemOID:number;
BatchwiseQuantity:string;
BatchNo:string;
ExpiryDate:DateTime;
}
export class Order extends CLZOObject{
IdentifyingOID:number;
RequisitionCode:string;
SupplyingPharmacyOID:number;
IdentifyingType:string;
OrderStatusCode:string;
OrderDTTM:DateTime;
OrderBy:number;
Comments:string;
OrderSupplyStatusCode:string;
ServiceOID:number;
ServiceName:string;
LocationOID:number;
LocationName:string;
OrderByName:string;
OrderStatusText:string;
PatientName:string;
OID:number;
oOrderDetail:ObservableCollection<OrderDetail>;
}
export class OrderDetail extends CLZOObject{
OrderOID:number;
OrderItemDetailOID:number;
IdentifyingOID:number;
RequestedQuantity:string;
RequestedQuantityUOMID:string;
OrderStatusCode:string;
OrderStatusText:string;
SuppliedQuantity:string;
SupplyStatusCode:string;
PrescribableItemName:string;
UOMName:string;
RequestedQuantityWithUOM:string;
IdentifyingType:string;
PrescribableItemID:string;
OID:number;
McVersionNo:number;
OrderedPharmacyOID:number;
}
export class Supply extends CLZOObject{
OrderOID:number;
SuppliedBy:number;
suppliedDTTM:DateTime;
WitnessedBy:number;
SupplyStatusCode:string;
DeliveryAcceptedBy:number;
DeliveryAcceptedAt:DateTime;
DeliveredUser:string;
ReceivedBy:number;
ReceivedAt:DateTime;
ReasonForReturn:string;
OID:number;
IdentifyingOID:number;
IdentifyingType:string;
ServiceOID:number;
LocationOID:number;
oSupplyDetail:ObservableCollection<SupplyDetail>;
}
export class SupplyDetail extends CLZOObject{
SupplyOID:number;
OrderDetailOID:number;
SuppliedQuantity:string;
SupplyStatusCode:string;
OID:number;
CDRegisterItemOID:number;
CurrentStock:string;
RequestedQuantity:string;
PrescribableItemID:string;
PrescribableItemName:string;
UOMText:string;
IdentifyingOID:number;
IdentifyingType:string;
UOMID:string;
TotalSuppliedQuantity:string;
OrderStatusCode:string;
oTransactionItemPackDetail:ObservableCollection<TransactionItemPackDetail>;
}
export class ServiceTypePharmacyAssociation extends CLZOObject{
OrganisationOID:number;
ServiceTypeCode:string;
PharmacyOID:number;
OID:number;
}
export class PharmacyAssociation extends CLZOObject{
OranisationOID:number;
OranisationName:string;
PharmacyOID:number;
PharmacyName:string;
ServiceTypeCode:string;
OID:number;
}
export class VerifyDetail extends CLZOObject{
VerifiedOn:DateTime;
VerifiedBy:number;
WitnessedBy:number;
OID:number;
CDRegItemOID:ObservableCollection<number>;
}
export class PatientStock extends CLZOObject{
CDROID:number;
PatientOID:number;
PatientDOB:DateTime;
PatientPDSFlag:string;
PatientNHSNumber:string;
PatientPASID:string;
Location:string;
PatientName:string;
CPName:string;
PatientAddress:string;
PatientDOBWithSensitivity:string;
IsMerged:boolean;
LocationOID:string;
oPatientStockDetail:ObservableCollection<PatientStockDetail>;
}
export class PatientStockDetail extends CLZOObject{
CDROID:number;
CDRItemOID:number;
Quantity:string;
PrescribableItemName:string;
UOM:string;
QuantityWithUOM:string;
}
export class PatientStockHOver extends CLZOObject{
PerformedByOID:number;
PerformedOn:DateTime;
TransferredWardOID:number;
TransactionType:string;
WitnessedByOID:number;
CDRegisterOID:number;
PatientOID:number;
ServiceOID:number;
TransactionCACode:string;
MCVersionNumber:string;
}
export class CReqMsgGetVerifiedCDTransaction{
CDRegisterItemOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetVerifiedCDTransaction{
oContextInformation:CContextInformation;
objItemTransaction:ObservableCollection<ItemTransaction>;
}
export class CReqMsgAddStock{
objAddStockInfoBC:AddStock;
oContextInformation:CContextInformation;
}
export class CResMsgAddStock{
oContextInformation:CContextInformation;
}
export class CReqMsgManageTransaction{
objMangeStockBC:ItemTransaction;
oContextInformation:CContextInformation;
}
export class CResMsgManageTransaction{
ErrorCode:string;
oContextInformation:CContextInformation;
}
export class CReqMsgOrderStock{
oOrderStockBC:Order;
oContextInformation:CContextInformation;
}
export class CResMsgOrderStock{
oContextInformation:CContextInformation;
}
export class CReqMsgSupplyStock{
oSupplyStockBC:Supply;
oContextInformation:CContextInformation;
}
export class CResMsgSupplyStock{
oContextInformation:CContextInformation;
}
export class CReqMsgHOPharmacyAssociation{
oContextInformation:CContextInformation;
oPharmaAssocnBC:ObservableCollection<ServiceTypePharmacyAssociation>;
}
export class CResMsgHOPharmacyAssociation{
oContextInformation:CContextInformation;
}
export class CReqMsgGetCDRegisteItems{
oSearchRegisterBC:SearchRegister;
oContextInformation:CContextInformation;
}
export class CResMsgGetCDRegisteItems{
oContextInformation:CContextInformation;
oRegisterItemsList:ObservableCollection<RegisterItemsList>;
}
export class RegisterItemsList{
LorenzoID:string;
PrescribableItemName:string;
RegisterItemOID:number;
CurrentStock:string;
UOMID:string;
UOMText:string;
CurrentStockWithUOM:string;
oUOMList:ObservableCollection<UOMList>;
}
export class UOMList{
UOMID:string;
UOMName:string;
}
export class CReqMsgGetQtyandUOMListByLzoID{
oSearchRegisterBC:SearchRegister;
oContextInformation:CContextInformation;
}
export class CResMsgGetQtyandUOMListByLzoID{
oRegisterItemsList:RegisterItemsList;
oContextInformation:CContextInformation;
}
export class CReqMsgGetPharmacyHOAssociation{
OrganisationOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetPharmacyHOAssociation{
oContextInformation:CContextInformation;
oPharmacyAssociation:ObservableCollection<PharmacyAssociation>;
}
export class CReqMsgGetOrders{
oSearchOrderBC:SearchOrder;
pElementBC:PagingDynamicSQL;
oContextInformation:CContextInformation;
}
export class SearchOrder{
LorenzoID:string;
ServiceOID:number;
LocationOID:number;
OrganisationOID:number;
OrderStatus:string;
OrderByOID:number;
PatientOID:number;
PageSize:number;
PageNumber:number;
PageCount:number;
McVersionNo:number;
RegisterTypeCode:string;
OrderID:string;
OrderOID:number;
}
export class CResMsgGetOrders{
iPageCount:number;
oContextInformation:CContextInformation;
Orders:ObservableCollection<Order>;
}
export class CReqMsgGetOrderDetails{
OrderOIDBC:number;
McVersionNoBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetOrderDetails{
oContextInformation:CContextInformation;
OrderDetails:ObservableCollection<OrderDetail>;
}
export class CReqMsgGetRegisterItemForOrderItemDetail{
oSearchOrderBC:SearchOrder;
oContextInformation:CContextInformation;
}
export class CResMsgGetRegisterItemForOrderItemDetail{
oContextInformation:CContextInformation;
oOrder:ObservableCollection<Order>;
}
export class CReqMsgGetRegisterOIDForService{
oSearchRegisterBC:SearchRegister;
oContextInformation:CContextInformation;
}
export class CResMsgGetRegisterOIDForService{
RegisterOID:Object;
oContextInformation:CContextInformation;
}
export class CReqMsgGetCurrStockByRegItemOID{
RegItemOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetCurrStockByRegItemOID{
lnCurrStock:number;
oContextInformation:CContextInformation;
}
export class CReqMsgVerifyStock{
oVerifyStockBC:VerifyDetail;
oContextInformation:CContextInformation;
}
export class CResMsgVerifyStock{
oContextInformation:CContextInformation;
}
export class CReqMsgGetPendingUpdatesTransactions{
RegItemOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetPendingUpdatesTransactions{
oContextInformation:CContextInformation;
objItemTransaction:ObservableCollection<ItemTransaction>;
}
export class CReqMsgUpdatePendingTransaction{
oContextInformation:CContextInformation;
objPendingStockBC:ObservableCollection<ItemTransaction>;
}
export class CResMsgUpdatePendingTransaction{
CurrentStock:string;
oContextInformation:CContextInformation;
}
export class CReqMsgGetPatientStock{
ServicePointOIDBC:number;
LocationOIDBC:number;
OrganisationOIDBC:number;
dEcDateBC:DateTime;
pElementBC:PagingDynamicSQL;
oContextInformation:CContextInformation;
}
export class CResMsgGetPatientStock{
iPageCount:number;
oContextInformation:CContextInformation;
PatientStockList:ObservableCollection<PatientStock>;
}
export class CReqMsgGetPatientMezzanineDetails{
ServicePointOIDBC:number;
dEcDateBC:DateTime;
oContextInformation:CContextInformation;
}
export class CResMsgGetPatientMezzanineDetails{
oContextInformation:CContextInformation;
PatientMezzanineList:ObservableCollection<PatientStock>;
}
export class CReqMsgGetPatientStockDetails{
CDROIDBC:number;
MCVersionNumberBC:string;
OrganisationOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetPatientStockDetails{
oContextInformation:CContextInformation;
PatientStockItemList:ObservableCollection<PatientStockDetail>;
}
export class CReqMsgGetSupplyDetailsWithPackByOrderOID{
OrderOIDBC:number;
McVersionNoBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetSupplyDetailsWithPackByOrderOID{
oSupply:Supply;
oContextInformation:CContextInformation;
}
export class CReqMsgGetPharmacyOnOrderCount{
ServicePointOIDBC:number;
OrganisationOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetPharmacyOnOrderCount{
lRecordCount:number;
oContextInformation:CContextInformation;
}
export class CReqMsgGetPharmacyForSPType{
OrganisationOIDBC:number;
SPTypeBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetPharmacyForSPType{
PharmacyDetails:PharmacyAssociation;
oContextInformation:CContextInformation;
}
export class CReqMsgPatientStockHandOver{
objPatstockHoverBC:PatientStockHOver;
oContextInformation:CContextInformation;
}
export class CResMsgPatientStockHandOver{
oContextInformation:CContextInformation;
}
export class MarshalByRefObject{
}

 const prototypeList = {"CDRegisterServiceWS.GetCDRegisterView":CResMsgGetCDRegisterView.prototype ,
"CDRegisterServiceWS.GetCDRegisterItemPackDetailView":CResMsgGetCDRegisterItemPackDetailView.prototype ,
"CDRegisterServiceWS.GetCDWardView":CResMsgGetCDWardView.prototype ,
"CDRegisterServiceWS.GetCDTransaction":CResMsgGetCDTransaction.prototype ,
"CDRegisterServiceWS.GetVerifiedCDTransaction":CResMsgGetVerifiedCDTransaction.prototype ,
"CDRegisterServiceWS.AddStock":CResMsgAddStock.prototype ,
"CDRegisterServiceWS.ManageTransaction":CResMsgManageTransaction.prototype ,
"CDRegisterServiceWS.OrderStock":CResMsgOrderStock.prototype ,
"CDRegisterServiceWS.SupplyStock":CResMsgSupplyStock.prototype ,
"CDRegisterServiceWS.HOPharmacyAssociation":CResMsgHOPharmacyAssociation.prototype ,
"CDRegisterServiceWS.GetCDRegisteItems":CResMsgGetCDRegisteItems.prototype ,
"CDRegisterServiceWS.GetQtyandUOMListByLzoID":CResMsgGetQtyandUOMListByLzoID.prototype ,
"CDRegisterServiceWS.GetPharmacyHOAssociation":CResMsgGetPharmacyHOAssociation.prototype ,
"CDRegisterServiceWS.GetOrders":CResMsgGetOrders.prototype ,
"CDRegisterServiceWS.GetOrderDetails":CResMsgGetOrderDetails.prototype ,
"CDRegisterServiceWS.GetRegisterItemForOrderItemDetail":CResMsgGetRegisterItemForOrderItemDetail.prototype ,
"CDRegisterServiceWS.GetRegisterOIDForService":CResMsgGetRegisterOIDForService.prototype ,
"CDRegisterServiceWS.GetCurrStockByRegItemOID":CResMsgGetCurrStockByRegItemOID.prototype ,
"CDRegisterServiceWS.VerifyStock":CResMsgVerifyStock.prototype ,
"CDRegisterServiceWS.GetPendingUpdatesTransactions":CResMsgGetPendingUpdatesTransactions.prototype ,
"CDRegisterServiceWS.UpdatePendingTransaction":CResMsgUpdatePendingTransaction.prototype ,
"CDRegisterServiceWS.GetPatientStock":CResMsgGetPatientStock.prototype ,
"CDRegisterServiceWS.GetPatientMezzanineDetails":CResMsgGetPatientMezzanineDetails.prototype ,
"CDRegisterServiceWS.GetPatientStockDetails":CResMsgGetPatientStockDetails.prototype ,
"CDRegisterServiceWS.GetSupplyDetailsWithPackByOrderOID":CResMsgGetSupplyDetailsWithPackByOrderOID.prototype ,
"CDRegisterServiceWS.GetPharmacyOnOrderCount":CResMsgGetPharmacyOnOrderCount.prototype ,
"CDRegisterServiceWS.GetPharmacyForSPType":CResMsgGetPharmacyForSPType.prototype ,
"CDRegisterServiceWS.PatientStockHandOver":CResMsgPatientStockHandOver.prototype ,

CReqMsgGetCDRegisterView : { 
objSearchRegisterBC:SearchRegister.prototype ,
pElementBC:PagingDynamicSQL.prototype ,
oContextInformation:CContextInformation.prototype ,

 },PagingDynamicSQL : { 
FilterBy:Filter.prototype ,
GroupBy:Group.prototype ,

 },CResMsgGetCDRegisterView : { 
oContextInformation:CContextInformation.prototype ,
objViewRegisterItem:RegisterItemsView.prototype ,

 },RegisterItemsView : { 
oRegItemPackDetail:RegisterItemsPackDetailView.prototype ,

 },CReqMsgGetCDRegisterItemPackDetailView : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetCDRegisterItemPackDetailView : { 
oContextInformation:CContextInformation.prototype ,
objRegItemPackDetView:RegisterItemsPackDetailView.prototype ,

 },CReqMsgGetCDWardView : { 
oSearchRegisterBC:SearchRegister.prototype ,
pElementBC:PagingDynamicSQL.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetCDWardView : { 
oContextInformation:CContextInformation.prototype ,
objWardView:WardView.prototype ,

 },CReqMsgGetCDTransaction : { 
objSearchTransactionBC:SearchTransaction.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetCDTransaction : { 
oContextInformation:CContextInformation.prototype ,
objItemTransaction:ItemTransaction.prototype ,

 },ItemTransaction : { 
oTransactionItemPackDetail:TransactionItemPackDetail.prototype ,

 },AddStock : { 
oRegister:CRegister.prototype ,
oRegisterItem:RegisterItem.prototype ,

 },RegisterItem : { 
oRegisterItemPackDetail:RegisterItemPackDetail.prototype ,

 },Order : { 
oOrderDetail:OrderDetail.prototype ,

 },Supply : { 
oSupplyDetail:SupplyDetail.prototype ,

 },SupplyDetail : { 
oTransactionItemPackDetail:TransactionItemPackDetail.prototype ,

 },PatientStock : { 
oPatientStockDetail:PatientStockDetail.prototype ,

 },CReqMsgGetVerifiedCDTransaction : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetVerifiedCDTransaction : { 
oContextInformation:CContextInformation.prototype ,
objItemTransaction:ItemTransaction.prototype ,

 },CReqMsgAddStock : { 
objAddStockInfoBC:AddStock.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgAddStock : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgManageTransaction : { 
objMangeStockBC:ItemTransaction.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgManageTransaction : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgOrderStock : { 
oOrderStockBC:Order.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgOrderStock : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgSupplyStock : { 
oSupplyStockBC:Supply.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgSupplyStock : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgHOPharmacyAssociation : { 
oContextInformation:CContextInformation.prototype ,
oPharmaAssocnBC:ServiceTypePharmacyAssociation.prototype ,

 },CResMsgHOPharmacyAssociation : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetCDRegisteItems : { 
oSearchRegisterBC:SearchRegister.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetCDRegisteItems : { 
oContextInformation:CContextInformation.prototype ,
oRegisterItemsList:RegisterItemsList.prototype ,

 },RegisterItemsList : { 
oUOMList:UOMList.prototype ,

 },CReqMsgGetQtyandUOMListByLzoID : { 
oSearchRegisterBC:SearchRegister.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetQtyandUOMListByLzoID : { 
oRegisterItemsList:RegisterItemsList.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPharmacyHOAssociation : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPharmacyHOAssociation : { 
oContextInformation:CContextInformation.prototype ,
oPharmacyAssociation:PharmacyAssociation.prototype ,

 },CReqMsgGetOrders : { 
oSearchOrderBC:SearchOrder.prototype ,
pElementBC:PagingDynamicSQL.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetOrders : { 
oContextInformation:CContextInformation.prototype ,
Orders:Order.prototype ,

 },CReqMsgGetOrderDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetOrderDetails : { 
oContextInformation:CContextInformation.prototype ,
OrderDetails:OrderDetail.prototype ,

 },CReqMsgGetRegisterItemForOrderItemDetail : { 
oSearchOrderBC:SearchOrder.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetRegisterItemForOrderItemDetail : { 
oContextInformation:CContextInformation.prototype ,
oOrder:Order.prototype ,

 },CReqMsgGetRegisterOIDForService : { 
oSearchRegisterBC:SearchRegister.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetRegisterOIDForService : { 
RegisterOID:Object.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetCurrStockByRegItemOID : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetCurrStockByRegItemOID : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgVerifyStock : { 
oVerifyStockBC:VerifyDetail.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgVerifyStock : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPendingUpdatesTransactions : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPendingUpdatesTransactions : { 
oContextInformation:CContextInformation.prototype ,
objItemTransaction:ItemTransaction.prototype ,

 },CReqMsgUpdatePendingTransaction : { 
oContextInformation:CContextInformation.prototype ,
objPendingStockBC:ItemTransaction.prototype ,

 },CResMsgUpdatePendingTransaction : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPatientStock : { 
pElementBC:PagingDynamicSQL.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPatientStock : { 
oContextInformation:CContextInformation.prototype ,
PatientStockList:PatientStock.prototype ,

 },CReqMsgGetPatientMezzanineDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPatientMezzanineDetails : { 
oContextInformation:CContextInformation.prototype ,
PatientMezzanineList:PatientStock.prototype ,

 },CReqMsgGetPatientStockDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPatientStockDetails : { 
oContextInformation:CContextInformation.prototype ,
PatientStockItemList:PatientStockDetail.prototype ,

 },CReqMsgGetSupplyDetailsWithPackByOrderOID : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetSupplyDetailsWithPackByOrderOID : { 
oSupply:Supply.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPharmacyOnOrderCount : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPharmacyOnOrderCount : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPharmacyForSPType : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPharmacyForSPType : { 
PharmacyDetails:PharmacyAssociation.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgPatientStockHandOver : { 
objPatstockHoverBC:PatientStockHOver.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgPatientStockHandOver : { 
oContextInformation:CContextInformation.prototype ,

 },CContextInformation : { 
Current:CContextInformation.prototype ,

 },
 }
 
const charPropertyLookup = []
 