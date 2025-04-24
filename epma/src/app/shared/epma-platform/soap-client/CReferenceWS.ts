import { int64, int16, int32, uInt16, uInt32, uInt64, byte, long, double, decimal, DelegateArgs, CContextInformation } from "epma-platform/models";
import { ObservableCollection } from "../models/observable-collection";
import DateTime from "../services/datetime.service";
import { HelperService } from "./helper.service";

export class CReferenceWSSoapClient{

GetAllValueDomainsCompleted: Function;
GetAllValueDomainsAsync(oCReqMsgGetAllValueDomains:CReqMsgGetAllValueDomains ) : void {
  HelperService.Invoke<CReqMsgGetAllValueDomains,CResMsgGetAllValueDomains,GetAllValueDomainsCompletedEventArgs>("CReferenceWSWS.GetAllValueDomains",oCReqMsgGetAllValueDomains,this.GetAllValueDomainsCompleted,"objScheme",new GetAllValueDomainsCompletedEventArgs(), prototypeList);
}

GetValueDomainByDomainCodeCompleted: Function;
GetValueDomainByDomainCodeAsync(oCReqMsgGetValueDomainByDomainCode:CReqMsgGetValueDomainByDomainCode ) : void {
  HelperService.Invoke<CReqMsgGetValueDomainByDomainCode,CResMsgGetValueDomainByDomainCode,GetValueDomainByDomainCodeCompletedEventArgs>("CReferenceWSWS.GetValueDomainByDomainCode",oCReqMsgGetValueDomainByDomainCode,this.GetValueDomainByDomainCodeCompleted,"objValue",new GetValueDomainByDomainCodeCompletedEventArgs(), prototypeList);
}

GetAllReferenceCodesByDomainCompleted: Function;
GetAllReferenceCodesByDomainAsync(oCReqMsgGetAllReferenceCodesByDomain:CReqMsgGetAllReferenceCodesByDomain ) : void {
  HelperService.Invoke<CReqMsgGetAllReferenceCodesByDomain,CResMsgGetAllReferenceCodesByDomain,GetAllReferenceCodesByDomainCompletedEventArgs>("CReferenceWSWS.GetAllReferenceCodesByDomain",oCReqMsgGetAllReferenceCodesByDomain,this.GetAllReferenceCodesByDomainCompleted,"objValue",new GetAllReferenceCodesByDomainCompletedEventArgs(), prototypeList);
}

GetLinkedValueSetsForDomainCompleted: Function;
GetLinkedValueSetsForDomainAsync(oCReqMsgGetLinkedValueSetsForDomain:CReqMsgGetLinkedValueSetsForDomain ) : void {
  HelperService.Invoke<CReqMsgGetLinkedValueSetsForDomain,CResMsgGetLinkedValueSetsForDomain,GetLinkedValueSetsForDomainCompletedEventArgs>("CReferenceWSWS.GetLinkedValueSetsForDomain",oCReqMsgGetLinkedValueSetsForDomain,this.GetLinkedValueSetsForDomainCompleted,"objValueSetMapping",new GetLinkedValueSetsForDomainCompletedEventArgs(), prototypeList);
}

GetConceptDescriptionByIDCompleted: Function;
GetConceptDescriptionByIDAsync(oCReqMsgGetConceptDescriptionByID:CReqMsgGetConceptDescriptionByID ) : void {
  HelperService.Invoke<CReqMsgGetConceptDescriptionByID,CResMsgGetConceptDescriptionByID,GetConceptDescriptionByIDCompletedEventArgs>("CReferenceWSWS.GetConceptDescriptionByID",oCReqMsgGetConceptDescriptionByID,this.GetConceptDescriptionByIDCompleted,"objConcept",new GetConceptDescriptionByIDCompletedEventArgs(), prototypeList);
}

GetRefCodesByDomainCompleted: Function;
GetRefCodesByDomainAsync(oCReqMsgGetRefCodesByDomain:CReqMsgGetRefCodesByDomain ) : void {
  HelperService.Invoke<CReqMsgGetRefCodesByDomain,CResMsgGetRefCodesByDomain,GetRefCodesByDomainCompletedEventArgs>("CReferenceWSWS.GetRefCodesByDomain",oCReqMsgGetRefCodesByDomain,this.GetRefCodesByDomainCompleted,"objValue",new GetRefCodesByDomainCompletedEventArgs(), prototypeList);
}

GetDefRefCodesByDomainCompleted: Function;
GetDefRefCodesByDomainAsync(oCReqMsgGetDefRefCodesByDomain:CReqMsgGetDefRefCodesByDomain ) : void {
  HelperService.Invoke<CReqMsgGetDefRefCodesByDomain,CResMsgGetDefRefCodesByDomain,GetDefRefCodesByDomainCompletedEventArgs>("CReferenceWSWS.GetDefRefCodesByDomain",oCReqMsgGetDefRefCodesByDomain,this.GetDefRefCodesByDomainCompleted,"objValue",new GetDefRefCodesByDomainCompletedEventArgs(), prototypeList);
}

GetAllConceptCodesByPropDomainCompleted: Function;
GetAllConceptCodesByPropDomainAsync(oCReqMsgGetAllConceptCodesByPropDomain:CReqMsgGetAllConceptCodesByPropDomain ) : void {
  HelperService.Invoke<CReqMsgGetAllConceptCodesByPropDomain,CResMsgGetAllConceptCodesByPropDomain,GetAllConceptCodesByPropDomainCompletedEventArgs>("CReferenceWSWS.GetAllConceptCodesByPropDomain",oCReqMsgGetAllConceptCodesByPropDomain,this.GetAllConceptCodesByPropDomainCompleted,"objConProperty",new GetAllConceptCodesByPropDomainCompletedEventArgs(), prototypeList);
}

GetAllReferenceCodesCompleted: Function;
GetAllReferenceCodesAsync(oCReqMsgGetAllReferenceCodes:CReqMsgGetAllReferenceCodes ) : void {
  HelperService.Invoke<CReqMsgGetAllReferenceCodes,CResMsgGetAllReferenceCodes,GetAllReferenceCodesCompletedEventArgs>("CReferenceWSWS.GetAllReferenceCodes",oCReqMsgGetAllReferenceCodes,this.GetAllReferenceCodesCompleted,"objDomainValue",new GetAllReferenceCodesCompletedEventArgs(), prototypeList);
}

GetLinkedDomainsForDomainCompleted: Function;
GetLinkedDomainsForDomainAsync(oCReqMsgGetLinkedDomainsForDomain:CReqMsgGetLinkedDomainsForDomain ) : void {
  HelperService.Invoke<CReqMsgGetLinkedDomainsForDomain,CResMsgGetLinkedDomainsForDomain,GetLinkedDomainsForDomainCompletedEventArgs>("CReferenceWSWS.GetLinkedDomainsForDomain",oCReqMsgGetLinkedDomainsForDomain,this.GetLinkedDomainsForDomainCompleted,"objValueSetMapping",new GetLinkedDomainsForDomainCompletedEventArgs(), prototypeList);
}

GetValueDomainByDomainCodeRCCompleted: Function;
GetValueDomainByDomainCodeRCAsync(oCReqMsgGetValueDomainByDomainCodeRC:CReqMsgGetValueDomainByDomainCodeRC ) : void {
  HelperService.Invoke<CReqMsgGetValueDomainByDomainCodeRC,CResMsgGetValueDomainByDomainCodeRC,GetValueDomainByDomainCodeRCCompletedEventArgs>("CReferenceWSWS.GetValueDomainByDomainCodeRC",oCReqMsgGetValueDomainByDomainCodeRC,this.GetValueDomainByDomainCodeRCCompleted,"objDomain",new GetValueDomainByDomainCodeRCCompletedEventArgs(), prototypeList);
}

GetReferenceRelationDetailsCompleted: Function;
GetReferenceRelationDetailsAsync(oCReqMsgGetReferenceRelationDetails:CReqMsgGetReferenceRelationDetails ) : void {
  HelperService.Invoke<CReqMsgGetReferenceRelationDetails,CResMsgGetReferenceRelationDetails,GetReferenceRelationDetailsCompletedEventArgs>("CReferenceWSWS.GetReferenceRelationDetails",oCReqMsgGetReferenceRelationDetails,this.GetReferenceRelationDetailsCompleted,"objMapping",new GetReferenceRelationDetailsCompletedEventArgs(), prototypeList);
}

GetValueDomainBySFSCompleted: Function;
GetValueDomainBySFSAsync(oCReqMsgGetValueDomainBySFS:CReqMsgGetValueDomainBySFS ) : void {
  HelperService.Invoke<CReqMsgGetValueDomainBySFS,CResMsgGetValueDomainBySFS,GetValueDomainBySFSCompletedEventArgs>("CReferenceWSWS.GetValueDomainBySFS",oCReqMsgGetValueDomainBySFS,this.GetValueDomainBySFSCompleted,"nPageIndex",new GetValueDomainBySFSCompletedEventArgs(), prototypeList);
}

GetValueSetBySFSCompleted: Function;
GetValueSetBySFSAsync(oCReqMsgGetValueSetBySFS:CReqMsgGetValueSetBySFS ) : void {
  HelperService.Invoke<CReqMsgGetValueSetBySFS,CResMsgGetValueSetBySFS,GetValueSetBySFSCompletedEventArgs>("CReferenceWSWS.GetValueSetBySFS",oCReqMsgGetValueSetBySFS,this.GetValueSetBySFSCompleted,"objValueSetSearch",new GetValueSetBySFSCompletedEventArgs(), prototypeList);
}

GetAllHealthOrganisationsCompleted: Function;
GetAllHealthOrganisationsAsync(oCReqMsgGetAllHealthOrganisations:CReqMsgGetAllHealthOrganisations ) : void {
  HelperService.Invoke<CReqMsgGetAllHealthOrganisations,CResMsgGetAllHealthOrganisations,GetAllHealthOrganisationsCompletedEventArgs>("CReferenceWSWS.GetAllHealthOrganisations",oCReqMsgGetAllHealthOrganisations,this.GetAllHealthOrganisationsCompleted,"objHealthOrgn",new GetAllHealthOrganisationsCompletedEventArgs(), prototypeList);
}

GetLinkedValueSetsForDomainRCCompleted: Function;
GetLinkedValueSetsForDomainRCAsync(oCReqMsgGetLinkedValueSetsForDomainRC:CReqMsgGetLinkedValueSetsForDomainRC ) : void {
  HelperService.Invoke<CReqMsgGetLinkedValueSetsForDomainRC,CResMsgGetLinkedValueSetsForDomainRC,GetLinkedValueSetsForDomainRCCompletedEventArgs>("CReferenceWSWS.GetLinkedValueSetsForDomainRC",oCReqMsgGetLinkedValueSetsForDomainRC,this.GetLinkedValueSetsForDomainRCCompleted,"objValueSetMapping",new GetLinkedValueSetsForDomainRCCompletedEventArgs(), prototypeList);
}

GetValuesByDomainsCompleted: Function;
GetValuesByDomainsAsync(oCReqMsgGetValuesByDomains:CReqMsgGetValuesByDomains ) : void {
  HelperService.Invoke<CReqMsgGetValuesByDomains,CResMsgGetValuesByDomains,GetValuesByDomainsCompletedEventArgs>("CReferenceWSWS.GetValuesByDomains",oCReqMsgGetValuesByDomains,this.GetValuesByDomainsCompleted,"objDomainInfo",new GetValuesByDomainsCompletedEventArgs(), prototypeList);
}

GetHierarchicalValuesByDomainsCompleted: Function;
GetHierarchicalValuesByDomainsAsync(oCReqMsgGetHierarchicalValuesByDomains:CReqMsgGetHierarchicalValuesByDomains ) : void {
  HelperService.Invoke<CReqMsgGetHierarchicalValuesByDomains,CResMsgGetHierarchicalValuesByDomains,GetHierarchicalValuesByDomainsCompletedEventArgs>("CReferenceWSWS.GetHierarchicalValuesByDomains",oCReqMsgGetHierarchicalValuesByDomains,this.GetHierarchicalValuesByDomainsCompleted,"oDomainsInfo",new GetHierarchicalValuesByDomainsCompletedEventArgs(), prototypeList);
}

GetAllValuesByDomainsCompleted: Function;
GetAllValuesByDomainsAsync(oCReqMsgGetAllValuesByDomains:CReqMsgGetAllValuesByDomains ) : void {
  HelperService.Invoke<CReqMsgGetAllValuesByDomains,CResMsgGetAllValuesByDomains,GetAllValuesByDomainsCompletedEventArgs>("CReferenceWSWS.GetAllValuesByDomains",oCReqMsgGetAllValuesByDomains,this.GetAllValuesByDomainsCompleted,"oDomainsInfo",new GetAllValuesByDomainsCompletedEventArgs(), prototypeList);
}

GetLinkedValuesCompleted: Function;
GetLinkedValuesAsync(oCReqMsgGetLinkedValues:CReqMsgGetLinkedValues ) : void {
  HelperService.Invoke<CReqMsgGetLinkedValues,CResMsgGetLinkedValues,GetLinkedValuesCompletedEventArgs>("CReferenceWSWS.GetLinkedValues",oCReqMsgGetLinkedValues,this.GetLinkedValuesCompleted,"objValSetMapping",new GetLinkedValuesCompletedEventArgs(), prototypeList);
}

GetValueSetByCriteriaCompleted: Function;
GetValueSetByCriteriaAsync(oCReqMsgGetValueSetByCriteria:CReqMsgGetValueSetByCriteria ) : void {
  HelperService.Invoke<CReqMsgGetValueSetByCriteria,CResMsgGetValueSetByCriteria,GetValueSetByCriteriaCompletedEventArgs>("CReferenceWSWS.GetValueSetByCriteria",oCReqMsgGetValueSetByCriteria,this.GetValueSetByCriteriaCompleted,"objValueSetSearch",new GetValueSetByCriteriaCompletedEventArgs(), prototypeList);
}

GetAssociatedDataFiltersCompleted: Function;
GetAssociatedDataFiltersAsync(oCReqMsgGetAssociatedDataFilters:CReqMsgGetAssociatedDataFilters ) : void {
  HelperService.Invoke<CReqMsgGetAssociatedDataFilters,CResMsgGetAssociatedDataFilters,GetAssociatedDataFiltersCompletedEventArgs>("CReferenceWSWS.GetAssociatedDataFilters",oCReqMsgGetAssociatedDataFilters,this.GetAssociatedDataFiltersCompleted,"sElementVersion",new GetAssociatedDataFiltersCompletedEventArgs(), prototypeList);
}

IsExistsDataFilterCompleted: Function;
IsExistsDataFilterAsync(oCReqMsgIsExistsDataFilter:CReqMsgIsExistsDataFilter ) : void {
  HelperService.Invoke<CReqMsgIsExistsDataFilter,CResMsgIsExistsDataFilter,IsExistsDataFilterCompletedEventArgs>("CReferenceWSWS.IsExistsDataFilter",oCReqMsgIsExistsDataFilter,this.IsExistsDataFilterCompleted,"objCQItemDataFilter",new IsExistsDataFilterCompletedEventArgs(), prototypeList);
}

IsExistsVersionedValueSetCompleted: Function;
IsExistsVersionedValueSetAsync(oCReqMsgIsExistsVersionedValueSet:CReqMsgIsExistsVersionedValueSet ) : void {
  HelperService.Invoke<CReqMsgIsExistsVersionedValueSet,CResMsgIsExistsVersionedValueSet,IsExistsVersionedValueSetCompletedEventArgs>("CReferenceWSWS.IsExistsVersionedValueSet",oCReqMsgIsExistsVersionedValueSet,this.IsExistsVersionedValueSetCompleted,"objCQExistsVersionedGroup",new IsExistsVersionedValueSetCompletedEventArgs(), prototypeList);
}

GetValuesByTextCompleted: Function;
GetValuesByTextAsync(oCReqMsgGetValuesByText:CReqMsgGetValuesByText ) : void {
  HelperService.Invoke<CReqMsgGetValuesByText,CResMsgGetValuesByText,GetValuesByTextCompletedEventArgs>("CReferenceWSWS.GetValuesByText",oCReqMsgGetValuesByText,this.GetValuesByTextCompleted,"objValueText",new GetValuesByTextCompletedEventArgs(), prototypeList);
}
}

export class GetAllValueDomainsCompletedEventArgs{
 public Result: CResMsgGetAllValueDomains;
public Error: any;
}
export class GetValueDomainByDomainCodeCompletedEventArgs{
 public Result: CResMsgGetValueDomainByDomainCode;
public Error: any;
}
export class GetAllReferenceCodesByDomainCompletedEventArgs{
 public Result: CResMsgGetAllReferenceCodesByDomain;
public Error: any;
}
export class GetLinkedValueSetsForDomainCompletedEventArgs{
 public Result: CResMsgGetLinkedValueSetsForDomain;
public Error: any;
}
export class GetConceptDescriptionByIDCompletedEventArgs{
 public Result: CResMsgGetConceptDescriptionByID;
public Error: any;
}
export class GetRefCodesByDomainCompletedEventArgs{
 public Result: CResMsgGetRefCodesByDomain;
public Error: any;
}
export class GetDefRefCodesByDomainCompletedEventArgs{
 public Result: CResMsgGetDefRefCodesByDomain;
public Error: any;
}
export class GetAllConceptCodesByPropDomainCompletedEventArgs{
 public Result: CResMsgGetAllConceptCodesByPropDomain;
public Error: any;
}
export class GetAllReferenceCodesCompletedEventArgs{
 public Result: CResMsgGetAllReferenceCodes;
public Error: any;
}
export class GetLinkedDomainsForDomainCompletedEventArgs{
 public Result: CResMsgGetLinkedDomainsForDomain;
public Error: any;
}
export class GetValueDomainByDomainCodeRCCompletedEventArgs{
 public Result: CResMsgGetValueDomainByDomainCodeRC;
public Error: any;
}
export class GetReferenceRelationDetailsCompletedEventArgs{
 public Result: CResMsgGetReferenceRelationDetails;
public Error: any;
}
export class GetValueDomainBySFSCompletedEventArgs{
 public Result: CResMsgGetValueDomainBySFS;
public Error: any;
}
export class GetValueSetBySFSCompletedEventArgs{
 public Result: CResMsgGetValueSetBySFS;
public Error: any;
}
export class GetAllHealthOrganisationsCompletedEventArgs{
 public Result: CResMsgGetAllHealthOrganisations;
public Error: any;
}
export class GetLinkedValueSetsForDomainRCCompletedEventArgs{
 public Result: CResMsgGetLinkedValueSetsForDomainRC;
public Error: any;
}
export class GetValuesByDomainsCompletedEventArgs{
 public Result: CResMsgGetValuesByDomains;
public Error: any;
}
export class GetHierarchicalValuesByDomainsCompletedEventArgs{
 public Result: CResMsgGetHierarchicalValuesByDomains;
public Error: any;
}
export class GetAllValuesByDomainsCompletedEventArgs{
 public Result: CResMsgGetAllValuesByDomains;
public Error: any;
}
export class GetLinkedValuesCompletedEventArgs{
 public Result: CResMsgGetLinkedValues;
public Error: any;
}
export class GetValueSetByCriteriaCompletedEventArgs{
 public Result: CResMsgGetValueSetByCriteria;
public Error: any;
}
export class GetAssociatedDataFiltersCompletedEventArgs{
 public Result: CResMsgGetAssociatedDataFilters;
public Error: any;
}
export class IsExistsDataFilterCompletedEventArgs{
 public Result: CResMsgIsExistsDataFilter;
public Error: any;
}
export class IsExistsVersionedValueSetCompletedEventArgs{
 public Result: CResMsgIsExistsVersionedValueSet;
public Error: any;
}
export class GetValuesByTextCompletedEventArgs{
 public Result: CResMsgGetValuesByText;
public Error: any;
}
export class CReqMsgGetAllValueDomains{
objSchemeBC:CQScheme;
oContextInformation:CContextInformation;
}
export class CQFilter{
csFilterType:string;
}
export class CQScheme extends CQFilter{
csCodingSchemeName:string;
csVersion:string;
csLanguageCode:string;
}
export class CQValueDomain extends CQScheme{
csDomainCode:string;
csConceptText:string;
csValueSetName:string;
objAssociateType:AssociationType;
csTermType:string;
CacheManagementCode:boolean;
filterparenthovalueset:boolean;
}
export enum AssociationType{
UnLinked,
Linked,
All,
}
export class CQValueSetMapping extends CQScheme{
csSourceDomain:string;
csTargetDomain:string;
csSourceConcept:string;
csTargetConcept:string;
csTargetValuesetCode:string;
csPropertyCode:string;
csPropertyValue:string;
}
export class CQConcept extends CQScheme{
csConceptCode:string;
csValueSetName:string;
csSubsetIDs:string;
cbReteriveChilds:boolean;
csSnomedConceptCode:string;
}
export class CQConceptProperty extends CQScheme{
csPropertyName:string;
csPropertyValue:string;
csConceptCode:string;
}
export class CQDomainSearch extends CQScheme{
csDomainCode:string;
csDomainDescription:string;
dttmFromDate:DateTime;
csMatchAlgorithm:string;
}
export class CQValueSetSearch extends CQScheme{
csDomainCode:string;
csValueSetName:string;
csValueSetDescription:string;
dttmFromDate:DateTime;
csMatchAlgorithm:string;
}
export class CQDomainsInfo extends CQScheme{
csValueDomain:string;
}
export class CQExistsVersionedGroup extends CQScheme{
csValueDomainCode:string;
csValueSetName:string;
csIsForMapping:string;
byReleaseVersion:string;
}
export class CQValueText extends CQScheme{
csDomainCode:string;
csValueSetName:string;
csReleaseVersion:string;
csText:string;
csAccessibleDataFilters:string;
}
export class CQHealthOrganisation extends CQFilter{
lOrgansationOID:number;
sIdentifyingType:string;
sCodingSchemeName:string;
sVersion:string;
sValueDomainCode:string;
sValueSetName:string;
sSubsetID:string;
sCodeSetID:string;
}
export class CResMsgGetAllValueDomains{
oContextInformation:CContextInformation;
arrValueDomainInfo:ObservableCollection<CValueDomainInfo>;
}
export class CValueDomainInfo{
csCodingSchemeName:string;
clCodingSchemeOID:number;
csVersion:string;
csDomainCode:string;
clValueDomainOID:number;
csDomainDescription:string;
csStatus:string;
cbIsUserDefined:boolean;
csLevelFlag:string;
csValueSetManagementCode:string;
cdttmFromDate:DateTime;
cdttmToDate:DateTime;
cdttmCodSchFromDate:DateTime;
cdttmCodSchToDate:DateTime;
clOwnerOrganisationOID:number;
dttmPrevModifiedAt:DateTime;
}
export class CValueDomainDescription extends CValueDomainInfo{
arrReferenceValueInfo:ObservableCollection<CReferenceValueInfo>;
}
export class CReferenceValueInfo{
objConceptCodeInfo:CConceptCodeInfo;
cbIsDefault:boolean;
cbIsMandatory:boolean;
csUsageContext:string;
csSortOrder:string;
csValidFrom:DateTime;
csValidTo:DateTime;
cbIsUserDefined:boolean;
csValueSetName:string;
csValueSetDescription:string;
csLevelFlag:string;
csStatus:string;
clOwnerOrganisationOID:number;
dttmPrevModifiedAt:DateTime;
clnValueSetGroupOID:number;
csIsAssociationRetired:string;
csHasDataFilter:string;
csIsForMapping:string;
byteReleaseVersion:string;
arrDataFilterCollection:ObservableCollection<CDataFilterCollection>;
}
export class CConceptCodeInfo{
csCode:string;
csDisplayName:string;
csStatus:string;
cbIsUserDefined:boolean;
csTaxonomy:string;
csLevelFlag:string;
csConceptDescription:string;
csTermKey:string;
csParentOID:string;
cdttmFromDate:DateTime;
cdttmToDate:DateTime;
csTermType:string;
objContentModification:CContentModification;
clConceptCodeOID:number;
csParentConceptCode:string;
csParentConceptCodeStatus:string;
clOwnerOrganisationOID:number;
csSubsetID:string;
csSubsetName:string;
dttmPrevModifiedAt:DateTime;
byteValSetReleaseVersion:string;
csIsCodable:string;
csIsDefault:string;
TaxonomyID:ObservableCollection<string>;
Taxonomy:ObservableCollection<string>;
arrPropertyDetails:ObservableCollection<CPropertyDetails>;
}
export class CContentModification{
cbAddEntry:boolean;
cbRetireEntry:boolean;
cbReInstateEntry:boolean;
cbUpdateEntry:boolean;
csIdentifier:string;
}
export class CPropertyDetails{
csName:string;
csValue:string;
}
export class CConceptDescriptionRecord extends CConceptCodeInfo{
arrTermInfo:ObservableCollection<CTermInfo>;
arrPropertyInfo:ObservableCollection<CPropertyInfo>;
}
export class CTermInfo{
csTermType:string;
csTermText:string;
csTermKey:string;
csTermID:string;
dttmPrevModifiedAt:DateTime;
lnOwnerOrganisationOID:number;
csLevelFlag:string;
csDisplayText:string;
TermID:string;
arrTermDescription:ObservableCollection<CTermDescriptionInfoSet>;
}
export class CTermDescription{
csLanguageCode:string;
csResourceValue:string;
cbIsDefault:boolean;
dttmPrevModifiedAt:DateTime;
lMultiLingualOID:number;
lnOwnerOrganisationOID:number;
}
export class CTermDescriptionInfoSet extends CTermDescription{
objContentModification:CContentModification;
}
export class CPropertyInfo{
csName:string;
csValue:string;
dttmPrevModifiedAt:DateTime;
lnPropertyMasterOID:number;
csPropValueDescription:string;
}
export class CConceptPropertyInfo extends CConceptCodeInfo{
arrPropertyInfo:ObservableCollection<CPropertyInfo>;
}
export class CConceptCodeInfoSet extends CConceptCodeInfo{
}
export class CDataFilterCollection{
clOID:number;
csCACode:string;
csCAName:string;
csDataFilterID:string;
csDataFilterName:string;
}
export class CValueDomainHistoryDesc extends CValueDomainInfo{
arrHistoryInfo:ObservableCollection<CHistoryInfo>;
}
export class CHistoryInfo{
csDateType:string;
cdttmFromDate:DateTime;
cdttmToDate:DateTime;
csType:string;
csReason:string;
csComments:string;
cdMainFromDTTM:DateTime;
cdMainToDTTM:DateTime;
dttmPrevModifiedAt:DateTime;
}
export class CValueSetDetails extends CValueDomainHistoryDesc{
arrValueSetInfoDescription:ObservableCollection<CValueSetInfoDescription>;
}
export class CValueSetInfo{
csValueSetName:string;
csValueSetDescription:string;
csValidFrom:DateTime;
csValidTo:DateTime;
csLevelFlag:string;
csStatus:string;
clOwnerOrganisationOID:number;
dttmPrevModifiedAt:DateTime;
byteReleaseVersion:string;
csIsForMapping:string;
clParentOrganisationOID:number;
csParentOrganisationName:string;
csOrganisationName:string;
arrDataFilterCollection:ObservableCollection<CDataFilterCollection>;
}
export class CValueSetInfoDescription extends CValueSetInfo{
arrHistoryInfo:ObservableCollection<CHistoryInfo>;
}
export class CReqMsgGetValueDomainByDomainCode{
objValueBC:CQValueDomain;
oContextInformation:CContextInformation;
}
export class CResMsgGetValueDomainByDomainCode{
oContextInformation:CContextInformation;
arrValueDomainInfo:ObservableCollection<CValueDomainInfo>;
}
export class CReqMsgGetAllReferenceCodesByDomain{
objValueBC:CQValueDomain;
oContextInformation:CContextInformation;
}
export class CResMsgGetAllReferenceCodesByDomain{
objValueDomainDesc:CValueDomainDescription;
oContextInformation:CContextInformation;
}
export class CReqMsgGetLinkedValueSetsForDomain{
objValueSetMappingBC:CQValueSetMapping;
oContextInformation:CContextInformation;
}
export class CResMsgGetLinkedValueSetsForDomain{
oContextInformation:CContextInformation;
arrReferenceValInfo:ObservableCollection<CReferenceValueInfo>;
}
export class CReqMsgGetConceptDescriptionByID{
objConceptBC:CQConcept;
oContextInformation:CContextInformation;
}
export class CResMsgGetConceptDescriptionByID{
objConceptDescRecord:CConceptDescriptionRecord;
oContextInformation:CContextInformation;
}
export class CReqMsgGetRefCodesByDomain{
objValueBC:CQValueDomain;
oContextInformation:CContextInformation;
}
export class CResMsgGetRefCodesByDomain{
objValueDomainDesc:CValueDomainDescription;
oContextInformation:CContextInformation;
}
export class CReqMsgGetDefRefCodesByDomain{
objValueBC:CQValueDomain;
oContextInformation:CContextInformation;
}
export class CResMsgGetDefRefCodesByDomain{
objValueDomainDesc:CValueDomainDescription;
oContextInformation:CContextInformation;
}
export class CReqMsgGetAllConceptCodesByPropDomain{
objValueBC:CQValueDomain;
objConPropertyBC:CQConceptProperty;
oContextInformation:CContextInformation;
}
export class CResMsgGetAllConceptCodesByPropDomain{
oContextInformation:CContextInformation;
arrConceptPropInfo:ObservableCollection<CConceptPropertyInfo>;
}
export class CReqMsgGetAllReferenceCodes{
objDomainValueBC:CQValueDomain;
oContextInformation:CContextInformation;
}
export class CResMsgGetAllReferenceCodes{
oContextInformation:CContextInformation;
arrValueSetDetails:ObservableCollection<CValueSetDetails>;
}
export class CReqMsgGetLinkedDomainsForDomain{
objValueSetMappingBC:CQValueSetMapping;
oContextInformation:CContextInformation;
}
export class CResMsgGetLinkedDomainsForDomain{
oContextInformation:CContextInformation;
arrValueDomain:ObservableCollection<CValueDomainInfo>;
}
export class CReqMsgGetValueDomainByDomainCodeRC{
objDomainBC:CQValueDomain;
oContextInformation:CContextInformation;
}
export class CResMsgGetValueDomainByDomainCodeRC{
oContextInformation:CContextInformation;
arrValueDomainHistory:ObservableCollection<CValueDomainHistoryDesc>;
}
export class CReqMsgGetReferenceRelationDetails{
objMappingBC:CQValueSetMapping;
oContextInformation:CContextInformation;
}
export class CResMsgGetReferenceRelationDetails{
objRefValRelnDesc:CReferenceValueRelationDescription;
oContextInformation:CContextInformation;
}
export class CReferenceValueRelationDescription{
arrHistoryInfo:ObservableCollection<CHistoryInfo>;
}
export class CReqMsgGetValueDomainBySFS{
objDomainSearchBC:CQDomainSearch;
nPageSizeBC:number;
nPageIndexBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetValueDomainBySFS{
lnRecCount:number;
oContextInformation:CContextInformation;
arrValueDomainInfo:ObservableCollection<CValueDomainInfo>;
}
export class CReqMsgGetValueSetBySFS{
objValueSetSearchBC:CQValueSetSearch;
oContextInformation:CContextInformation;
}
export class CResMsgGetValueSetBySFS{
oContextInformation:CContextInformation;
arrReferenceValueInfo:ObservableCollection<CReferenceValueInfo>;
}
export class CReqMsgGetAllHealthOrganisations{
objHealthOrgnBC:CQHealthOrganisation;
oContextInformation:CContextInformation;
}
export class CResMsgGetAllHealthOrganisations{
oContextInformation:CContextInformation;
arrHealthOrgnInfo:ObservableCollection<CHealthOrganisationInfo>;
}
export class CHealthOrganisationInfo{
lOrgansationOID:number;
lParentOrganisationOID:number;
sOrganisationName:string;
dttmFromDate:DateTime;
dttmToDate:DateTime;
}
export class CReqMsgGetLinkedValueSetsForDomainRC{
objValueSetMappingBC:CQValueSetMapping;
oContextInformation:CContextInformation;
}
export class CResMsgGetLinkedValueSetsForDomainRC{
oContextInformation:CContextInformation;
arrReferenceValInfo:ObservableCollection<CReferenceValueRelationRecord>;
}
export class CReferenceValueRelationRecord{
csCodingSchemeName:string;
csVersion:string;
csSourceDomainCode:string;
csTargetDomainCode:string;
csSourceConceptCode:string;
objContentModification:CContentModification;
csTargetValueSetName:string;
csSourceValueSetName:string;
cdttmFromDate:DateTime;
cdttmToDate:DateTime;
objHistoryInfo:CHistoryInfo;
cdttmCodSchFromDate:DateTime;
cdttmCodSchToDate:DateTime;
csStatus:string;
clOwnerOrganisationOID:number;
dttmPrevModifiedAt:DateTime;
csHasDataFilter:string;
lnVSMappingOID:number;
byteReleaseVersion:string;
arrTargetConceptCode:ObservableCollection<CConceptCodeInfoSet>;
}
export class CReqMsgGetValuesByDomains{
objDomainInfoBC:CQDomainsInfo;
oContextInformation:CContextInformation;
}
export class CResMsgGetValuesByDomains{
oContextInformation:CContextInformation;
arrValSetCollection:ObservableCollection<CValuesetCollection>;
}
export class CDomainsInfo{
csDomainsInfo:string;
}
export class CValuesetCollection extends CDomainsInfo{
sDefaultCode:string;
arrValuesetTerm:ObservableCollection<CValuesetTerm>;
}
export class CValuesetTerm{
csCode:string;
csDescription:string;
arrPropertyDetails:ObservableCollection<CPropertyDetails>;
}
export class CReqMsgGetHierarchicalValuesByDomains{
oDomainsInfoBC:CQDomainsInfo;
oContextInformation:CContextInformation;
}
export class CResMsgGetHierarchicalValuesByDomains{
oContextInformation:CContextInformation;
arrValuesetCollection:ObservableCollection<CValuesetCollection>;
}
export class CReqMsgGetAllValuesByDomains{
oDomainsInfoBC:CQDomainsInfo;
oContextInformation:CContextInformation;
}
export class CResMsgGetAllValuesByDomains{
oContextInformation:CContextInformation;
arrValuesetCollection:ObservableCollection<CValuesetCollection>;
}
export class CReqMsgGetLinkedValues{
objValSetMappingBC:CQValueSetMapping;
oContextInformation:CContextInformation;
}
export class CResMsgGetLinkedValues{
oContextInformation:CContextInformation;
arrTgtValueGroup:ObservableCollection<CTargetValueGroup>;
}
export class CTargetValueGroup{
csValueSetName:string;
csValueSetDescription:string;
cdttmFromDate:DateTime;
cdttmToDate:DateTime;
clnOwnerOrganisationOID:number;
csStatus:string;
cdttmPrevModifiedAt:DateTime;
objDataFilterColl:CDataFilterCollection;
byteReleaseVersion:string;
lnValueSetMappingOID:number;
arrTargetValueSet:ObservableCollection<CTargetValueSet>;
arrHistoryInfo:ObservableCollection<CHistoryInfo>;
}
export class CTargetValueSet{
csTargetCode:string;
csTargetText:string;
csTargetValueSetStatus:string;
csConceptCodeStatus:string;
}
export class CReqMsgGetValueSetByCriteria{
objValueSetSearchBC:CQValueSetSearch;
oContextInformation:CContextInformation;
}
export class CResMsgGetValueSetByCriteria{
oContextInformation:CContextInformation;
arrTargetValueSets:ObservableCollection<CTargetValueSets>;
}
export class CTargetValueSets{
csValueSetName:string;
csValueSetDescription:string;
csStatus:string;
byteReleaseVersion:string;
}
export class CReqMsgGetAssociatedDataFilters{
objCQItemBC:CQItem;
sElementVersionBC:string;
oContextInformation:CContextInformation;
}
export class CQItem{
lnItemOID:number;
csEntity:string;
csFunctionalDomainCode:string;
}
export class CResMsgGetAssociatedDataFilters{
oContextInformation:CContextInformation;
arrDataFilterCollection:ObservableCollection<CDataFilterCollection>;
}
export class CReqMsgIsExistsDataFilter{
objCQItemDataFilterBC:CQItemDataFilter;
oContextInformation:CContextInformation;
}
export class CQItemDataFilter{
lnItemOID:number;
csCACode:string;
csEntity:string;
}
export class CResMsgIsExistsDataFilter{
bDtFltExists:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgIsExistsVersionedValueSet{
objCQExistsVersionedGroupBC:CQExistsVersionedGroup;
oContextInformation:CContextInformation;
}
export class CResMsgIsExistsVersionedValueSet{
oContextInformation:CContextInformation;
}
export class CReqMsgGetValuesByText{
objValueTextBC:CQValueText;
oContextInformation:CContextInformation;
}
export class CResMsgGetValuesByText{
oContextInformation:CContextInformation;
arrValueText:ObservableCollection<CValueText>;
}
export class CValueText{
csCode:string;
csDescription:string;
}

 const prototypeList = {"CReferenceWSWS.GetAllValueDomains":CResMsgGetAllValueDomains.prototype ,
"CReferenceWSWS.GetValueDomainByDomainCode":CResMsgGetValueDomainByDomainCode.prototype ,
"CReferenceWSWS.GetAllReferenceCodesByDomain":CResMsgGetAllReferenceCodesByDomain.prototype ,
"CReferenceWSWS.GetLinkedValueSetsForDomain":CResMsgGetLinkedValueSetsForDomain.prototype ,
"CReferenceWSWS.GetConceptDescriptionByID":CResMsgGetConceptDescriptionByID.prototype ,
"CReferenceWSWS.GetRefCodesByDomain":CResMsgGetRefCodesByDomain.prototype ,
"CReferenceWSWS.GetDefRefCodesByDomain":CResMsgGetDefRefCodesByDomain.prototype ,
"CReferenceWSWS.GetAllConceptCodesByPropDomain":CResMsgGetAllConceptCodesByPropDomain.prototype ,
"CReferenceWSWS.GetAllReferenceCodes":CResMsgGetAllReferenceCodes.prototype ,
"CReferenceWSWS.GetLinkedDomainsForDomain":CResMsgGetLinkedDomainsForDomain.prototype ,
"CReferenceWSWS.GetValueDomainByDomainCodeRC":CResMsgGetValueDomainByDomainCodeRC.prototype ,
"CReferenceWSWS.GetReferenceRelationDetails":CResMsgGetReferenceRelationDetails.prototype ,
"CReferenceWSWS.GetValueDomainBySFS":CResMsgGetValueDomainBySFS.prototype ,
"CReferenceWSWS.GetValueSetBySFS":CResMsgGetValueSetBySFS.prototype ,
"CReferenceWSWS.GetAllHealthOrganisations":CResMsgGetAllHealthOrganisations.prototype ,
"CReferenceWSWS.GetLinkedValueSetsForDomainRC":CResMsgGetLinkedValueSetsForDomainRC.prototype ,
"CReferenceWSWS.GetValuesByDomains":CResMsgGetValuesByDomains.prototype ,
"CReferenceWSWS.GetHierarchicalValuesByDomains":CResMsgGetHierarchicalValuesByDomains.prototype ,
"CReferenceWSWS.GetAllValuesByDomains":CResMsgGetAllValuesByDomains.prototype ,
"CReferenceWSWS.GetLinkedValues":CResMsgGetLinkedValues.prototype ,
"CReferenceWSWS.GetValueSetByCriteria":CResMsgGetValueSetByCriteria.prototype ,
"CReferenceWSWS.GetAssociatedDataFilters":CResMsgGetAssociatedDataFilters.prototype ,
"CReferenceWSWS.IsExistsDataFilter":CResMsgIsExistsDataFilter.prototype ,
"CReferenceWSWS.IsExistsVersionedValueSet":CResMsgIsExistsVersionedValueSet.prototype ,
"CReferenceWSWS.GetValuesByText":CResMsgGetValuesByText.prototype ,

CReqMsgGetAllValueDomains : { 
objSchemeBC:CQScheme.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAllValueDomains : { 
oContextInformation:CContextInformation.prototype ,
arrValueDomainInfo:CValueDomainInfo.prototype ,

 },CValueDomainDescription : { 
arrReferenceValueInfo:CReferenceValueInfo.prototype ,

 },CReferenceValueInfo : { 
objConceptCodeInfo:CConceptCodeInfo.prototype ,
arrDataFilterCollection:CDataFilterCollection.prototype ,

 },CConceptCodeInfo : { 
objContentModification:CContentModification.prototype ,
arrPropertyDetails:CPropertyDetails.prototype ,

 },CConceptDescriptionRecord : { 
arrTermInfo:CTermInfo.prototype ,
arrPropertyInfo:CPropertyInfo.prototype ,

 },CTermInfo : { 
arrTermDescription:CTermDescriptionInfoSet.prototype ,

 },CTermDescriptionInfoSet : { 
objContentModification:CContentModification.prototype ,

 },CConceptPropertyInfo : { 
arrPropertyInfo:CPropertyInfo.prototype ,

 },CValueDomainHistoryDesc : { 
arrHistoryInfo:CHistoryInfo.prototype ,

 },CValueSetDetails : { 
arrValueSetInfoDescription:CValueSetInfoDescription.prototype ,

 },CValueSetInfo : { 
arrDataFilterCollection:CDataFilterCollection.prototype ,

 },CValueSetInfoDescription : { 
arrHistoryInfo:CHistoryInfo.prototype ,

 },CReqMsgGetValueDomainByDomainCode : { 
objValueBC:CQValueDomain.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetValueDomainByDomainCode : { 
oContextInformation:CContextInformation.prototype ,
arrValueDomainInfo:CValueDomainInfo.prototype ,

 },CReqMsgGetAllReferenceCodesByDomain : { 
objValueBC:CQValueDomain.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAllReferenceCodesByDomain : { 
objValueDomainDesc:CValueDomainDescription.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetLinkedValueSetsForDomain : { 
objValueSetMappingBC:CQValueSetMapping.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetLinkedValueSetsForDomain : { 
oContextInformation:CContextInformation.prototype ,
arrReferenceValInfo:CReferenceValueInfo.prototype ,

 },CReqMsgGetConceptDescriptionByID : { 
objConceptBC:CQConcept.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetConceptDescriptionByID : { 
objConceptDescRecord:CConceptDescriptionRecord.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetRefCodesByDomain : { 
objValueBC:CQValueDomain.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetRefCodesByDomain : { 
objValueDomainDesc:CValueDomainDescription.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetDefRefCodesByDomain : { 
objValueBC:CQValueDomain.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDefRefCodesByDomain : { 
objValueDomainDesc:CValueDomainDescription.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetAllConceptCodesByPropDomain : { 
objValueBC:CQValueDomain.prototype ,
objConPropertyBC:CQConceptProperty.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAllConceptCodesByPropDomain : { 
oContextInformation:CContextInformation.prototype ,
arrConceptPropInfo:CConceptPropertyInfo.prototype ,

 },CReqMsgGetAllReferenceCodes : { 
objDomainValueBC:CQValueDomain.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAllReferenceCodes : { 
oContextInformation:CContextInformation.prototype ,
arrValueSetDetails:CValueSetDetails.prototype ,

 },CReqMsgGetLinkedDomainsForDomain : { 
objValueSetMappingBC:CQValueSetMapping.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetLinkedDomainsForDomain : { 
oContextInformation:CContextInformation.prototype ,
arrValueDomain:CValueDomainInfo.prototype ,

 },CReqMsgGetValueDomainByDomainCodeRC : { 
objDomainBC:CQValueDomain.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetValueDomainByDomainCodeRC : { 
oContextInformation:CContextInformation.prototype ,
arrValueDomainHistory:CValueDomainHistoryDesc.prototype ,

 },CReqMsgGetReferenceRelationDetails : { 
objMappingBC:CQValueSetMapping.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetReferenceRelationDetails : { 
objRefValRelnDesc:CReferenceValueRelationDescription.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReferenceValueRelationDescription : { 
arrHistoryInfo:CHistoryInfo.prototype ,

 },CReqMsgGetValueDomainBySFS : { 
objDomainSearchBC:CQDomainSearch.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetValueDomainBySFS : { 
oContextInformation:CContextInformation.prototype ,
arrValueDomainInfo:CValueDomainInfo.prototype ,

 },CReqMsgGetValueSetBySFS : { 
objValueSetSearchBC:CQValueSetSearch.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetValueSetBySFS : { 
oContextInformation:CContextInformation.prototype ,
arrReferenceValueInfo:CReferenceValueInfo.prototype ,

 },CReqMsgGetAllHealthOrganisations : { 
objHealthOrgnBC:CQHealthOrganisation.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAllHealthOrganisations : { 
oContextInformation:CContextInformation.prototype ,
arrHealthOrgnInfo:CHealthOrganisationInfo.prototype ,

 },CReqMsgGetLinkedValueSetsForDomainRC : { 
objValueSetMappingBC:CQValueSetMapping.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetLinkedValueSetsForDomainRC : { 
oContextInformation:CContextInformation.prototype ,
arrReferenceValInfo:CReferenceValueRelationRecord.prototype ,

 },CReferenceValueRelationRecord : { 
objContentModification:CContentModification.prototype ,
objHistoryInfo:CHistoryInfo.prototype ,
arrTargetConceptCode:CConceptCodeInfoSet.prototype ,

 },CReqMsgGetValuesByDomains : { 
objDomainInfoBC:CQDomainsInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetValuesByDomains : { 
oContextInformation:CContextInformation.prototype ,
arrValSetCollection:CValuesetCollection.prototype ,

 },CValuesetCollection : { 
arrValuesetTerm:CValuesetTerm.prototype ,

 },CValuesetTerm : { 
arrPropertyDetails:CPropertyDetails.prototype ,

 },CReqMsgGetHierarchicalValuesByDomains : { 
oDomainsInfoBC:CQDomainsInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetHierarchicalValuesByDomains : { 
oContextInformation:CContextInformation.prototype ,
arrValuesetCollection:CValuesetCollection.prototype ,

 },CReqMsgGetAllValuesByDomains : { 
oDomainsInfoBC:CQDomainsInfo.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAllValuesByDomains : { 
oContextInformation:CContextInformation.prototype ,
arrValuesetCollection:CValuesetCollection.prototype ,

 },CReqMsgGetLinkedValues : { 
objValSetMappingBC:CQValueSetMapping.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetLinkedValues : { 
oContextInformation:CContextInformation.prototype ,
arrTgtValueGroup:CTargetValueGroup.prototype ,

 },CTargetValueGroup : { 
objDataFilterColl:CDataFilterCollection.prototype ,
arrTargetValueSet:CTargetValueSet.prototype ,
arrHistoryInfo:CHistoryInfo.prototype ,

 },CReqMsgGetValueSetByCriteria : { 
objValueSetSearchBC:CQValueSetSearch.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetValueSetByCriteria : { 
oContextInformation:CContextInformation.prototype ,
arrTargetValueSets:CTargetValueSets.prototype ,

 },CReqMsgGetAssociatedDataFilters : { 
objCQItemBC:CQItem.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAssociatedDataFilters : { 
oContextInformation:CContextInformation.prototype ,
arrDataFilterCollection:CDataFilterCollection.prototype ,

 },CReqMsgIsExistsDataFilter : { 
objCQItemDataFilterBC:CQItemDataFilter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgIsExistsDataFilter : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgIsExistsVersionedValueSet : { 
objCQExistsVersionedGroupBC:CQExistsVersionedGroup.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgIsExistsVersionedValueSet : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetValuesByText : { 
objValueTextBC:CQValueText.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetValuesByText : { 
oContextInformation:CContextInformation.prototype ,
arrValueText:CValueText.prototype ,

 },CContextInformation : { 
Current:CContextInformation.prototype ,

 },
 }
 
const charPropertyLookup = []
 