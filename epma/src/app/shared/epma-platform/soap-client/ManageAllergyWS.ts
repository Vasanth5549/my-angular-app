import { int64, int16, int32, uInt16, uInt32, uInt64, byte, long, double, decimal, DelegateArgs, CContextInformation, CLZOObject } from "epma-platform/models";
import { ObservableCollection } from "../models/observable-collection";
import DateTime from "../services/datetime.service";
import { HelperService } from "./helper.service";
export class ManageAllergyWSSoapClient{

ManageAllergiesCompleted: Function;
ManageAllergiesAsync(oCReqMsgManageAllergies:CReqMsgManageAllergies ) : void {
  HelperService.Invoke<CReqMsgManageAllergies,CResMsgManageAllergies,ManageAllergiesCompletedEventArgs>("ManageAllergyWS.ManageAllergies",oCReqMsgManageAllergies,this.ManageAllergiesCompleted,"oAllergyDet",new ManageAllergiesCompletedEventArgs(), prototypeList);
}

RecordAllergyCompleted: Function;
RecordAllergyAsync(oCReqMsgRecordAllergy:CReqMsgRecordAllergy ) : void {
  HelperService.Invoke<CReqMsgRecordAllergy,CResMsgRecordAllergy,RecordAllergyCompletedEventArgs>("ManageAllergyWS.RecordAllergy",oCReqMsgRecordAllergy,this.RecordAllergyCompleted,"oAllergyDet",new RecordAllergyCompletedEventArgs(), prototypeList);
}

ModifyAllergyCompleted: Function;
ModifyAllergyAsync(oCReqMsgModifyAllergy:CReqMsgModifyAllergy ) : void {
  HelperService.Invoke<CReqMsgModifyAllergy,CResMsgModifyAllergy,ModifyAllergyCompletedEventArgs>("ManageAllergyWS.ModifyAllergy",oCReqMsgModifyAllergy,this.ModifyAllergyCompleted,"oAllergyDet",new ModifyAllergyCompletedEventArgs(), prototypeList);
}

CloseAllergyCompleted: Function;
CloseAllergyAsync(oCReqMsgCloseAllergy:CReqMsgCloseAllergy ) : void {
  HelperService.Invoke<CReqMsgCloseAllergy,CResMsgCloseAllergy,CloseAllergyCompletedEventArgs>("ManageAllergyWS.CloseAllergy",oCReqMsgCloseAllergy,this.CloseAllergyCompleted,"oAllergystatus",new CloseAllergyCompletedEventArgs(), prototypeList);
}

ReopenAllergyCompleted: Function;
ReopenAllergyAsync(oCReqMsgReopenAllergy:CReqMsgReopenAllergy ) : void {
  HelperService.Invoke<CReqMsgReopenAllergy,CResMsgReopenAllergy,ReopenAllergyCompletedEventArgs>("ManageAllergyWS.ReopenAllergy",oCReqMsgReopenAllergy,this.ReopenAllergyCompleted,"oAllergystatus",new ReopenAllergyCompletedEventArgs(), prototypeList);
}

StrikeoutAllergyCompleted: Function;
StrikeoutAllergyAsync(oCReqMsgStrikeoutAllergy:CReqMsgStrikeoutAllergy ) : void {
  HelperService.Invoke<CReqMsgStrikeoutAllergy,CResMsgStrikeoutAllergy,StrikeoutAllergyCompletedEventArgs>("ManageAllergyWS.StrikeoutAllergy",oCReqMsgStrikeoutAllergy,this.StrikeoutAllergyCompleted,"oAllergystatus",new StrikeoutAllergyCompletedEventArgs(), prototypeList);
}

AllergyCheckedCompleted: Function;
AllergyCheckedAsync(oCReqMsgAllergyChecked:CReqMsgAllergyChecked ) : void {
  HelperService.Invoke<CReqMsgAllergyChecked,CResMsgAllergyChecked,AllergyCheckedCompletedEventArgs>("ManageAllergyWS.AllergyChecked",oCReqMsgAllergyChecked,this.AllergyCheckedCompleted,"oAllergyChecked",new AllergyCheckedCompletedEventArgs(), prototypeList);
}

GetPatientAllergiesCompleted: Function;
GetPatientAllergiesAsync(oCReqMsgGetPatientAllergies:CReqMsgGetPatientAllergies ) : void {
  HelperService.Invoke<CReqMsgGetPatientAllergies,CResMsgGetPatientAllergies,GetPatientAllergiesCompletedEventArgs>("ManageAllergyWS.GetPatientAllergies",oCReqMsgGetPatientAllergies,this.GetPatientAllergiesCompleted,"pageElement",new GetPatientAllergiesCompletedEventArgs(), prototypeList);
}

GetAllergyHistoryCompleted: Function;
GetAllergyHistoryAsync(oCReqMsgGetAllergyHistory:CReqMsgGetAllergyHistory ) : void {
  HelperService.Invoke<CReqMsgGetAllergyHistory,CResMsgGetAllergyHistory,GetAllergyHistoryCompletedEventArgs>("ManageAllergyWS.GetAllergyHistory",oCReqMsgGetAllergyHistory,this.GetAllergyHistoryCompleted,"AllergyID",new GetAllergyHistoryCompletedEventArgs(), prototypeList);
}

GetAllergyStatusCompleted: Function;
GetAllergyStatusAsync(oCReqMsgGetAllergyStatus:CReqMsgGetAllergyStatus ) : void {
  HelperService.Invoke<CReqMsgGetAllergyStatus,CResMsgGetAllergyStatus,GetAllergyStatusCompletedEventArgs>("ManageAllergyWS.GetAllergyStatus",oCReqMsgGetAllergyStatus,this.GetAllergyStatusCompleted,"AllergyID",new GetAllergyStatusCompletedEventArgs(), prototypeList);
}

GetAllergyCheckedDescCompleted: Function;
GetAllergyCheckedDescAsync(oCReqMsgGetAllergyCheckedDesc:CReqMsgGetAllergyCheckedDesc ) : void {
  HelperService.Invoke<CReqMsgGetAllergyCheckedDesc,CResMsgGetAllergyCheckedDesc,GetAllergyCheckedDescCompletedEventArgs>("ManageAllergyWS.GetAllergyCheckedDesc",oCReqMsgGetAllergyCheckedDesc,this.GetAllergyCheckedDescCompleted,"sPatientOID",new GetAllergyCheckedDescCompletedEventArgs(), prototypeList);
}

GetPatientAllergyCompleted: Function;
GetPatientAllergyAsync(oCReqMsgGetPatientAllergy:CReqMsgGetPatientAllergy ) : void {
  HelperService.Invoke<CReqMsgGetPatientAllergy,CResMsgGetPatientAllergy,GetPatientAllergyCompletedEventArgs>("ManageAllergyWS.GetPatientAllergy",oCReqMsgGetPatientAllergy,this.GetPatientAllergyCompleted,"AllergyOID",new GetPatientAllergyCompletedEventArgs(), prototypeList);
}

GetPatientAllergysByOidsCompleted: Function;
GetPatientAllergysByOidsAsync(oCReqMsgGetPatientAllergysByOids:CReqMsgGetPatientAllergysByOids ) : void {
  HelperService.Invoke<CReqMsgGetPatientAllergysByOids,CResMsgGetPatientAllergysByOids,GetPatientAllergysByOidsCompletedEventArgs>("ManageAllergyWS.GetPatientAllergysByOids",oCReqMsgGetPatientAllergysByOids,this.GetPatientAllergysByOidsCompleted,"AllergyOIDs",new GetPatientAllergysByOidsCompletedEventArgs(), prototypeList);
}

GetPatBannerAllergyDescCompleted: Function;
GetPatBannerAllergyDescAsync(oCReqMsgGetPatBannerAllergyDesc:CReqMsgGetPatBannerAllergyDesc ) : void {
  HelperService.Invoke<CReqMsgGetPatBannerAllergyDesc,CResMsgGetPatBannerAllergyDesc,GetPatBannerAllergyDescCompletedEventArgs>("ManageAllergyWS.GetPatBannerAllergyDesc",oCReqMsgGetPatBannerAllergyDesc,this.GetPatBannerAllergyDescCompleted,"oContext",new GetPatBannerAllergyDescCompletedEventArgs(), prototypeList);
}

GetPatBannerAllergyNameAndDescriptionCompleted: Function;
GetPatBannerAllergyNameAndDescriptionAsync(oCReqMsgGetPatBannerAllergyNameAndDescription:CReqMsgGetPatBannerAllergyNameAndDescription ) : void {
  HelperService.Invoke<CReqMsgGetPatBannerAllergyNameAndDescription,CResMsgGetPatBannerAllergyNameAndDescription,GetPatBannerAllergyNameAndDescriptionCompletedEventArgs>("ManageAllergyWS.GetPatBannerAllergyNameAndDescription",oCReqMsgGetPatBannerAllergyNameAndDescription,this.GetPatBannerAllergyNameAndDescriptionCompleted,"oContext",new GetPatBannerAllergyNameAndDescriptionCompletedEventArgs(), prototypeList);
}

GetPatBannerAllergyNamesCompleted: Function;
GetPatBannerAllergyNamesAsync(oCReqMsgGetPatBannerAllergyNames:CReqMsgGetPatBannerAllergyNames ) : void {
  HelperService.Invoke<CReqMsgGetPatBannerAllergyNames,CResMsgGetPatBannerAllergyNames,GetPatBannerAllergyNamesCompletedEventArgs>("ManageAllergyWS.GetPatBannerAllergyNames",oCReqMsgGetPatBannerAllergyNames,this.GetPatBannerAllergyNamesCompleted,"oContext",new GetPatBannerAllergyNamesCompletedEventArgs(), prototypeList);
}

GetPatBannerAllergyNamesForTheatresCompleted: Function;
GetPatBannerAllergyNamesForTheatresAsync(oCReqMsgGetPatBannerAllergyNamesForTheatres:CReqMsgGetPatBannerAllergyNamesForTheatres ) : void {
  HelperService.Invoke<CReqMsgGetPatBannerAllergyNamesForTheatres,CResMsgGetPatBannerAllergyNamesForTheatres,GetPatBannerAllergyNamesForTheatresCompletedEventArgs>("ManageAllergyWS.GetPatBannerAllergyNamesForTheatres",oCReqMsgGetPatBannerAllergyNamesForTheatres,this.GetPatBannerAllergyNamesForTheatresCompleted,"oContext",new GetPatBannerAllergyNamesForTheatresCompletedEventArgs(), prototypeList);
}

CheckDuplicateAllergyCompleted: Function;
CheckDuplicateAllergyAsync(oCReqMsgCheckDuplicateAllergy:CReqMsgCheckDuplicateAllergy ) : void {
  HelperService.Invoke<CReqMsgCheckDuplicateAllergy,CResMsgCheckDuplicateAllergy,CheckDuplicateAllergyCompletedEventArgs>("ManageAllergyWS.CheckDuplicateAllergy",oCReqMsgCheckDuplicateAllergy,this.CheckDuplicateAllergyCompleted,"sAllergen",new CheckDuplicateAllergyCompletedEventArgs(), prototypeList);
}

AllergyCheckedHistoryCompleted: Function;
AllergyCheckedHistoryAsync(oCReqMsgAllergyCheckedHistory:CReqMsgAllergyCheckedHistory ) : void {
  HelperService.Invoke<CReqMsgAllergyCheckedHistory,CResMsgAllergyCheckedHistory,AllergyCheckedHistoryCompletedEventArgs>("ManageAllergyWS.AllergyCheckedHistory",oCReqMsgAllergyCheckedHistory,this.AllergyCheckedHistoryCompleted,"lnPatientOID",new AllergyCheckedHistoryCompletedEventArgs(), prototypeList);
}

CheckActiveAllergiesCompleted: Function;
CheckActiveAllergiesAsync(oCReqMsgCheckActiveAllergies:CReqMsgCheckActiveAllergies ) : void {
  HelperService.Invoke<CReqMsgCheckActiveAllergies,CResMsgCheckActiveAllergies,CheckActiveAllergiesCompletedEventArgs>("ManageAllergyWS.CheckActiveAllergies",oCReqMsgCheckActiveAllergies,this.CheckActiveAllergiesCompleted,"sALGType",new CheckActiveAllergiesCompletedEventArgs(), prototypeList);
}

SendAuthoriseAllergyCompleted: Function;
SendAuthoriseAllergyAsync(oCReqMsgSendAuthoriseAllergy:CReqMsgSendAuthoriseAllergy ) : void {
  HelperService.Invoke<CReqMsgSendAuthoriseAllergy,CResMsgSendAuthoriseAllergy,SendAuthoriseAllergyCompletedEventArgs>("ManageAllergyWS.SendAuthoriseAllergy",oCReqMsgSendAuthoriseAllergy,this.SendAuthoriseAllergyCompleted,"oArrHISendAuthorisation",new SendAuthoriseAllergyCompletedEventArgs(), prototypeList);
}

GetAllergyListByOIDsCompleted: Function;
GetAllergyListByOIDsAsync(oCReqMsgGetAllergyListByOIDs:CReqMsgGetAllergyListByOIDs ) : void {
  HelperService.Invoke<CReqMsgGetAllergyListByOIDs,CResMsgGetAllergyListByOIDs,GetAllergyListByOIDsCompletedEventArgs>("ManageAllergyWS.GetAllergyListByOIDs",oCReqMsgGetAllergyListByOIDs,this.GetAllergyListByOIDsCompleted,"oHIDet",new GetAllergyListByOIDsCompletedEventArgs(), prototypeList);
}

AuthoriseAllergyCompleted: Function;
AuthoriseAllergyAsync(oCReqMsgAuthoriseAllergy:CReqMsgAuthoriseAllergy ) : void {
  HelperService.Invoke<CReqMsgAuthoriseAllergy,CResMsgAuthoriseAllergy,AuthoriseAllergyCompletedEventArgs>("ManageAllergyWS.AuthoriseAllergy",oCReqMsgAuthoriseAllergy,this.AuthoriseAllergyCompleted,"oarrHIAlgAuthorisation",new AuthoriseAllergyCompletedEventArgs(), prototypeList);
}

GetUsersByRoleOIDCompleted: Function;
GetUsersByRoleOIDAsync(oCReqMsgGetUsersByRoleOID:CReqMsgGetUsersByRoleOID ) : void {
  HelperService.Invoke<CReqMsgGetUsersByRoleOID,CResMsgGetUsersByRoleOID,GetUsersByRoleOIDCompletedEventArgs>("ManageAllergyWS.GetUsersByRoleOID",oCReqMsgGetUsersByRoleOID,this.GetUsersByRoleOIDCompleted,"lnRoleOID",new GetUsersByRoleOIDCompletedEventArgs(), prototypeList);
}

GetAllergiesExistsCompleted: Function;
GetAllergiesExistsAsync(oCReqMsgGetAllergiesExists:CReqMsgGetAllergiesExists ) : void {
  HelperService.Invoke<CReqMsgGetAllergiesExists,CResMsgGetAllergiesExists,GetAllergiesExistsCompletedEventArgs>("ManageAllergyWS.GetAllergiesExists",oCReqMsgGetAllergiesExists,this.GetAllergiesExistsCompleted,"oContext",new GetAllergiesExistsCompletedEventArgs(), prototypeList);
}

pGetPatALGSByPatientOIDWSCompleted: Function;
pGetPatALGSByPatientOIDWSAsync(oCReqMsgpGetPatALGSByPatientOIDWS:CReqMsgpGetPatALGSByPatientOIDWS ) : void {
  HelperService.Invoke<CReqMsgpGetPatALGSByPatientOIDWS,CResMsgpGetPatALGSByPatientOIDWS,pGetPatALGSByPatientOIDWSCompletedEventArgs>("ManageAllergyWS.pGetPatALGSByPatientOIDWS",oCReqMsgpGetPatALGSByPatientOIDWS,this.pGetPatALGSByPatientOIDWSCompleted,"ALGStatus",new pGetPatALGSByPatientOIDWSCompletedEventArgs(), prototypeList);
}

GetADRstatusExistsCompleted: Function;
GetADRstatusExistsAsync(oCReqMsgGetADRstatusExists:CReqMsgGetADRstatusExists ) : void {
  HelperService.Invoke<CReqMsgGetADRstatusExists,CResMsgGetADRstatusExists,GetADRstatusExistsCompletedEventArgs>("ManageAllergyWS.GetADRstatusExists",oCReqMsgGetADRstatusExists,this.GetADRstatusExistsCompleted,"InEncounterOID",new GetADRstatusExistsCompletedEventArgs(), prototypeList);
}

GetGPConnectSavedCompleted: Function;
GetGPConnectSavedAsync(oCReqMsgGetGPConnectSaved:CReqMsgGetGPConnectSaved ) : void {
  HelperService.Invoke<CReqMsgGetGPConnectSaved,CResMsgGetGPConnectSaved,GetGPConnectSavedCompletedEventArgs>("ManageAllergyWS.GetGPConnectSaved",oCReqMsgGetGPConnectSaved,this.GetGPConnectSavedCompleted,"oAlgDetails",new GetGPConnectSavedCompletedEventArgs(), prototypeList);
}
}

export class ManageAllergiesCompletedEventArgs{
 public Result: CResMsgManageAllergies;
public Error: any;
}
export class RecordAllergyCompletedEventArgs{
 public Result: CResMsgRecordAllergy;
public Error: any;
}
export class ModifyAllergyCompletedEventArgs{
 public Result: CResMsgModifyAllergy;
public Error: any;
}
export class CloseAllergyCompletedEventArgs{
 public Result: CResMsgCloseAllergy;
public Error: any;
}
export class ReopenAllergyCompletedEventArgs{
 public Result: CResMsgReopenAllergy;
public Error: any;
}
export class StrikeoutAllergyCompletedEventArgs{
 public Result: CResMsgStrikeoutAllergy;
public Error: any;
}
export class AllergyCheckedCompletedEventArgs{
 public Result: CResMsgAllergyChecked;
public Error: any;
}
export class GetPatientAllergiesCompletedEventArgs{
 public Result: CResMsgGetPatientAllergies;
public Error: any;
}
export class GetAllergyHistoryCompletedEventArgs{
 public Result: CResMsgGetAllergyHistory;
public Error: any;
}
export class GetAllergyStatusCompletedEventArgs{
 public Result: CResMsgGetAllergyStatus;
public Error: any;
}
export class GetAllergyCheckedDescCompletedEventArgs{
 public Result: CResMsgGetAllergyCheckedDesc;
public Error: any;
}
export class GetPatientAllergyCompletedEventArgs{
 public Result: CResMsgGetPatientAllergy;
public Error: any;
}
export class GetPatientAllergysByOidsCompletedEventArgs{
 public Result: CResMsgGetPatientAllergysByOids;
public Error: any;
}
export class GetPatBannerAllergyDescCompletedEventArgs{
 public Result: CResMsgGetPatBannerAllergyDesc;
public Error: any;
}
export class GetPatBannerAllergyNameAndDescriptionCompletedEventArgs{
 public Result: CResMsgGetPatBannerAllergyNameAndDescription;
public Error: any;
}
export class GetPatBannerAllergyNamesCompletedEventArgs{
 public Result: CResMsgGetPatBannerAllergyNames;
public Error: any;
}
export class GetPatBannerAllergyNamesForTheatresCompletedEventArgs{
 public Result: CResMsgGetPatBannerAllergyNamesForTheatres;
public Error: any;
}
export class CheckDuplicateAllergyCompletedEventArgs{
 public Result: CResMsgCheckDuplicateAllergy;
public Error: any;
}
export class AllergyCheckedHistoryCompletedEventArgs{
 public Result: CResMsgAllergyCheckedHistory;
public Error: any;
}
export class CheckActiveAllergiesCompletedEventArgs{
 public Result: CResMsgCheckActiveAllergies;
public Error: any;
}
export class SendAuthoriseAllergyCompletedEventArgs{
 public Result: CResMsgSendAuthoriseAllergy;
public Error: any;
}
export class GetAllergyListByOIDsCompletedEventArgs{
 public Result: CResMsgGetAllergyListByOIDs;
public Error: any;
}
export class AuthoriseAllergyCompletedEventArgs{
 public Result: CResMsgAuthoriseAllergy;
public Error: any;
}
export class GetUsersByRoleOIDCompletedEventArgs{
 public Result: CResMsgGetUsersByRoleOID;
public Error: any;
}
export class GetAllergiesExistsCompletedEventArgs{
 public Result: CResMsgGetAllergiesExists;
public Error: any;
}
export class pGetPatALGSByPatientOIDWSCompletedEventArgs{
 public Result: CResMsgpGetPatALGSByPatientOIDWS;
public Error: any;
}
export class GetADRstatusExistsCompletedEventArgs{
 public Result: CResMsgGetADRstatusExists;
public Error: any;
}
export class GetGPConnectSavedCompletedEventArgs{
 public Result: CResMsgGetGPConnectSaved;
public Error: any;
}
export class CReqMsgManageAllergies{
oContextInformation:CContextInformation;
oAllergyDetBC:ObservableCollection<AllergyDetails>;
}

export class AllergyDetails extends CLZOObject{
oAllergy:Allergy;
oAllergyChecked:AllergyChecked;
oHIContext:HealthIssueContext;
bServiceCall:boolean;
IsActiveAllergyExist:number;
oALGSnomedCodes:ObservableCollection<HealthIssueCode>;
oALGAlternateCodes:ObservableCollection<AltCodingSchemeData>;
}
export class Allergy extends CLZOObject{
IdentifierSystem:string;
codingSchemeName:string;
codingSchemeVersion:string;
AllergyCode:string;
OnsetDateDisplay:string;
PatientIdentifier:string;
AllergyID:string;
AllergyType:string;
Allergen:string;
IsSNOMEDCT:string;
AllergyStatus:string;
Reaction:string;
Severity:string;
OnSetDttm:DateTime;
OnSetDttmIdentifier:string;
Course:string;
ConfidenceLevel:string;
IsSignificant:string;
HasHistoryInfo:string;
InformationSource:string;
Comments:string;
RecordedDttm:DateTime;
LastUpdatedDttm:DateTime;
RecordedByUserId:number;
RecordedByUserName:string;
LastUpdatedByUserId:number;
LastUpdatedUserName:string;
ConcurrencyDTTM:DateTime;
CanStrikeOut:string;
IsPartialDate:string;
AllergyStatusInfo:string;
RecordCount:number;
CloseReopenDTTM:DateTime;
AllergyAltCode:string;
IsMHRA:string;
CreatedDTTM:DateTime;
ModifiedDTTM:DateTime;
AllergyAltTerm:string;
OrganisationName:string;
OrganisationOId:string;
Title:string;
UserRoleOid:string;
UserDetails:string;
UserRoleName:string;
ReasonForStrkOut:string;
oProvenance:Provenance;
oPatientSeal:PatientSeal;
OldOnSetDTTM:DateTime;
NewOnSetDTTM:DateTime;
grdAllergyTypeText:string;
grdAllergenText:string;
grdStatusText:string;
grdHiddenValues:string;
IsSTSPartialDate:string;
IsRecordProblem:boolean;
MPatientOID:string;
MEncounterOID:string;
MEncounterID:string;
SevReactions:string;
ProblemEncounterOID:string;
StatusComments:string;
CNFLVCODE:string;
ClosureDTTM:DateTime;
PCLRPCode:string;
PCLRPName:string;
CNFLVName:string;
AlgGeneralHiddenFields:string;
HasAuthorise:boolean;
HasSendAuthorise:boolean;
EscalationOID:number;
AuthComments:string;
IsConflictGenerated:boolean;
PatientDOB:DateTime;
PatientSex:string;
GroupByResult:ObservableCollection<GroupResult>;
SeverityReactions:ObservableCollection<SeverityReactions>;
}
export class Provenance extends CLZOObject{
Action:string;
Status:string;
Reason:string;
Comments:string;
ObservedBy:string;
ObservedOn:DateTime;
RecordedBy:string;
RecordedOn:DateTime;
ObjobservedBy:dpUser;
ObjRecordedBy:dpUser;
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
export class HealthIssueCode extends CLZOObject{
HIArtefactOID:string;
CodeColumnName:string;
CDTYPCode:string;
Code:string;
Term:string;
Version:string;
IsCurrentCodification:string;
TermKey:string;
patientOID:string;
}
export class AltCodingSchemeData extends HealthIssueCode{
}
export class HealthIssueContext extends CLZOObject{
RoleProfielOId:number;
AEMsgEncTypes:string;
EncounterType:string;
SelProcEncounterOID:string;
IdentifyingOId:number;
IdentifyingType:string;
IsFromTheatre:boolean;
EncStartDate:DateTime;
EncIdentifier:string;
PatientOID:string;
PatientID:string;
EncounterOID:string;
PatientDOB:DateTime;
PatientDOD:DateTime;
PatientSex:string;
IsPatientDeceased:string;
UserOID:number;
UserName:string;
HOOId:number;
EpisodeOID:string;
NHSMailSubject:string;
LorenzoUser:string;
LorenzoUserRole:string;
NHSOrganisationName:string;
NHSOrganisationAddress:string;
LorenzoUserTelephone:string;
LorenzoUserEmailAddress:string;
PatientConfigOID:string;
FetalDetailOid:number;
AlertType:string;
IsMerged:string;
CACode:string;
}
export class Carer extends CLZOObject{
Comments:string;
IsPrimary:string;
Name:string;
OID:number;
RecordOID:number;
}
export class CareProvider extends Carer{
TreatmentFnName:string;
SpecialityName:string;
TeamName:string;
AttendanceStatus:string;
CareServiceName:string;
HealthOrgName:string;
TreatmentFnOID:number;
TeamOID:number;
CareServiceOID:number;
SpecialityOID:number;
oSpecialty:Specialty;
otreatmentfunction:Specialty;
objTeamDetail:TeamDetail;
oConCareProvider:dpUser;
IdentifyingType:string;
PermissionType:string;
CareProviderOID:number;
IdentifyingOID:number;
RoleProfileOID:number;
CPForeName:string;
CPSurName:string;
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
export class TeamClinicalUnit extends Specialty{
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
export class TeamDetail extends Team{
IsRestrictedData:boolean;
LastModifiedBy:number;
TeamLead:TeamMember;
TeamSpecialty:ObjectInfo;
ServicePoint:ObjectInfo;
ParentTeam:Team;
MinChildActiveFrom:DateTime;
MaxChildActiveTo:DateTime;
EnterpriseWorkgroupOID:number;
AccessControlWorkgroup:ObjectInfo;
MembershipWorkgroup:ObjectInfo;
HasChildTeams:string;
AuditData:AuditInfo;
DateQualifier:string;
Context:string;
TimePeriod:string;
PageSize:number;
PageNumber:number;
PageCount:number;
InternalStatus:string;
IsTeamMembersModified:string;
ConstraintOIds:string;
ConstraintWrkGrpCodes:string;
organisationOID:string;
IsSecureTeam:string;
IsApproved:string;
TeamQualifiesForClustering:string;
CareServiceOId:number;
oHealthOrganisation:HealthOrganisationDetail;
IsTeamUsed:string;
IsWGAssociated:string;
TeamAddress:UserAddress;
TeamMembersCount:number;
ServiceLineCode:string;
ServiceCategoryCode:string;
TeamMembers:ObservableCollection<TeamMember>;
TeamClinicalUnit:ObservableCollection<TeamClinicalUnit>;
}
export class TeamMember extends User{
TeamMemberOId:number;
RoleProfile:ObjectInfo;
Role:ObjectInfo;
AssignFrom:DateTime;
AssignTo:DateTime;
AccessControlWorkgroup:ObjectInfo;
MembershipWorkgroup:ObjectInfo;
IsTeamLead:string;
TeamMemberEnterpriseWorkgroup:EnterpriseWorkgroup;
RoleProfileCode:ObjectInfo;
PrevModifiedAt:DateTime;
IsApproved:string;
TMMemberRoleCode:string;
ActionPerformedByOID:number;
ActionTaken:string;
TLIntrayMessage:string;
IsTMMbrRemoved:string;
InvokingPoint:string;
CLAssignFrom:DateTime;
CLAssignTo:DateTime;
ActiveLead:boolean;
IsExcludefromCL:string;
IsCaseLoadstatusupdate:string;
}
export class ObjectInfo extends CLZOObject{
OID:number;
Name:string;
Code:string;
RoleProfileOID:number;
OwnerOrganisationOID:number;
SourceDataProviderType:string;
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
export class HOTeams extends Team{
OrganisationName:string;
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
export class HOAddress extends Address{
HOIdentifier:number;
GLocation:string;
oAuditInfo:AuditInfo;
HOContact:ObservableCollection<Contact>;
}
export class SecondaryCareProvider extends CareProvider{
InvitedStatus:string;
}
export class HOInsurer extends CLZOObject{
HOOid:string;
InsurerOid:string;
Insurertype:string;
Insurerrange:string;
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
export class HealthIssueStatus extends StatusHistory{
RiskType:string;
RiskCode:string;
Staus:string;
IsAllowMultiple:string;
IsConfirm:number;
LinkedProcedureOids:string;
PatientOID:string;
ISConcurrencyChecked:boolean;
bMobiltyYes:boolean;
bStatusChanged:boolean;
Comments:string;
oProblemScopeDetail:ProblemScopeDetail;
HIOId:string;
UserID:number;
UserName:string;
IsPartialDate:string;
ConcurrencyDTTM:DateTime;
IsConfirmed:boolean;
LastModifiedUserID:number;
LastModifiedName:string;
HOOID:number;
HOName:string;
lnRoleOID:number;
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
export class AllergyChecked extends HealthIssueStatus{
Outcome:string;
AllergiesCheckedDTM:DateTime;
EncounterOID:number;
EncounterDetails:string;
EncounterInfo:Encounter;
oAllergyCheckedHistory:ObservableCollection<AllergyChecked>;
}
export class EncounterBase extends CLZOObject{
EncounterID:string;
EncounterType:string;
OrganisationID:number;
OrganisationName:string;
LocationID:number;
Locationname:string;
EncounterReason:string;
Status:string;
CreatedDttm:DateTime;
ClosureDttm:DateTime;
EncounterIdentifier:string;
StartedDttm:DateTime;
LatestEvent:string;
LengthOfStay:string;
PatientLeave:number;
AdmissionType:string;
PatientOID:string;
ServiceType:string;
}
export class Encounter extends EncounterBase{
PathWayID:string;
OrgMainIdentifier:string;
EpisodeID:string;
EpisodeName:string;
ServicePoint:string;
Location:string;
CareProviderID:number;
CareProviderName:string;
SpecialtyID:number;
SpecialtyName:string;
CareServiceID:number;
CareServiceName:string;
AdditonalCareProvider:string;
ReferralID:string;
ReferralName:string;
ServiceID:number;
Servicename:string;
CareproviderRole:string;
Ambulatorystatus:string;
APEStatus:string;
APEStartDTTM:DateTime;
EncouterIDTYCode:string;
EncounterCreation:DateTime;
ClosedBy:string;
CreatedBy:number;
EncounterStatus:string;
AppointmentOID:string;
ActualRTTSTCode:string;
OCMSTCode:string;
IsManualCreation:string;
CareproviderRoleID:string;
EpisodeIdentifier:string;
ReferredToCPName:string;
ReferralDttm:DateTime;
ExpectedDischargeDttm:DateTime;
bNegation:boolean;
bFromRestAPI:boolean;
LinkedEncounterOId:number;
LinkedEncounter:string;
ReferralOID:number;
ReferredType:string;
ReferredSpelity:string;
ReferredTremnt:string;
ReferredTeam:string;
ReferredOrg:string;
SessionName:string;
LinkedEncType:string;
SealOID:number;
SealTypeType:string;
NHSNumber:string;
SessionOID:string;
TreatmentFunctionName:string;
CurrrentBedCategory:string;
CurrentPatientCategory:string;
TreatmentFunctionOID:string;
CurrentLocationOID:string;
CurrentLocationIdentifier:string;
CurrentLocationName:string;
CurrentCareProviderOID:number;
CurrentCareProviderName:string;
CurrentSpecialtyOID:number;
CurrentSpecialtyName:string;
CurrentServiceOID:number;
CurrentServiceName:string;
CurrentServicePointIdentifier:string;
HasFilter:boolean;
IsSealBroken:boolean;
IsSealOwner:string;
HasOwnSealBroken:boolean;
PatientSeal:PatientSeal;
CreatedByUserName:string;
CancelReason:string;
EncCancelDTTM:DateTime;
SharedCarer:string;
IsBkgByAPEWrittenOPOffer:boolean;
APEOfferOID:string;
ISADWNOTICEEXISTS:boolean;
MedNextReviewDTTM:DateTime;
IsOnHold:boolean;
RescheduledFromBookingOID:string;
Stagemarker:string;
APPSTCode:string;
IParentLocationType:string;
IParentLocationOID:number;
IParentLocationName:string;
LeastLocationType:string;
LeastLocationName:string;
BedLocationCode:number;
BedLocationName:string;
BedLocationType:string;
BedParentLocationCode:number;
BedParentLocationName:string;
BedParentLocationType:string;
CPMBookingOID:number;
LeastLocationOID:number;
ActualDischargeDTTM:DateTime;
OldPatientOID:number;
OldReferralOID:number;
OldEpisodeoid:number;
IsENCCA:boolean;
ISReferralUpdate:boolean;
APEOID:number;
RefPatientOID:number;
DischargeDTTM:DateTime;
RecordedUserOID:number;
RecordedUserName:string;
SortBy:string;
IPEndDate:DateTime;
ChildlocationOID:number;
ChildlocationType:string;
ChildlocationName:string;
SubAreaLocOID:number;
SubAreaLocType:string;
SubAreaLocName:string;
TrustSiteDetails:string;
Referredservice:string;
Referredservicedefinition:string;
IsSimple:string;
PatientDOB:DateTime;
EprMapValue:string;
GroupValue:string;
GroupValueDisplay:string;
Count:number;
GroupText:string;
DateQualifier:string;
IsCustomFilter:boolean;
CurrentCareProviderType:string;
Pasid:string;
Forename:string;
Surname:string;
Gender:string;
DateofBirth:DateTime;
SecondaryCareProvider:ObservableCollection<SecondaryCareProvider>;
}
export class PatientSeal extends CLZOObject{
sSealPsisMess:SealPSISMessage;
SealIdentifier:string;
IdentifyingOID:string;
IdentifyingType:string;
PatientOID:string;
CreatedDTTM:DateTime;
ModifiedDTTM:DateTime;
ModifiedBy:string;
RefuseReasonCode:string;
SealTimeout:number;
Justification:string;
RequestMode:string;
Requestor:string;
RequestorName:string;
RequestorDetails:string;
WitnessName:string;
WitnessDetails:string;
PrintedDTTM:DateTime;
ConsentIdentifier:string;
SealPSISMessage:SealPSISMessage;
PatientName:string;
PatientId:string;
IsSealBreak:boolean;
SurName:string;
ForeName:string;
Gender:string;
IsProfileEnabled:boolean;
ClinicianOID:number;
PageNumber:number;
PageSize:number;
MaxRows:number;
ClinicianIDs:string;
CreatedBy:string;
IsSensitive:string;
IsMDMmsgRequired:boolean;
patientSealAccessGroup:ObservableCollection<SealAccessGroup>;
PatientSealAccessUsers:ObservableCollection<SealAccessUsers>;
}
export class SealPSISMessage extends CLZOObject{
SealReportPacket:SealReportPacket;
SealReportInfo:SealReportInfo;
SealNotifyPacket:SealNotifyPacket;
SealAuthor:SealAuthor;
}
export class SealReportPacket extends CLZOObject{
MetaData:SealReportMetaData;
Message:SealReportMessage;
}
export class SealReportMetaData extends CLZOObject{
MessageId:string;
CreationTime:string;
InteractionId:string;
OriginatorMachineID:string;
VersionCode:string;
HL7Version:string;
UserLoggedIn:SealReportUserLoggedIn;
}
export class SealReportUserLoggedIn extends CLZOObject{
UserRoleProfileID:string;
UserID:string;
UserJobRoleCode:string;
}
export class SealReportMessage extends CLZOObject{
Action:string;
ReportEffectiveDTTM:string;
ReportModifyDTTM:string;
AuthorSDSUserID:string;
AuthorSDSUserName:string;
AuthorSDSUserRPID:string;
AuthorOrganisationID:string;
AuthorOrganisationName:string;
PatientNHSNumber:string;
SealId:string;
ObjectType:string;
SealingId:string;
SealingState:string;
JustifyingReason:string;
SealRequesterId:string;
SealRequesterRelationshipCode:string;
SealRequesterPersonName:string;
SealEventAction:string;
SealWorkgroupAccessorId:string;
SealAccessorId:string;
RefusalReasonCode:string;
SealAccessor:ObservableCollection<SealGroupAccessor>;
SealWorkgroupAccessorName:ObservableCollection<string>;
SealWorkgroupAccessorType:ObservableCollection<string>;
NewWorkgroupAccessorId:ObservableCollection<string>;
}
export class SealGroupAccessor{
AccessorType:SealAccessorType;
AccessorOID:string;
}
export enum SealAccessorType{
Team,
Specialty,
ServicePoint,
}
export class SealReportInfo extends CLZOObject{
PrevSealtype:string;
sealFlg:boolean;
userFlg:boolean;
UserGroupCode:string;
UserAccessCode:string;
DocumentAssociate:string;
IsCareActivity:boolean;
}
export class SealNotifyPacket extends CLZOObject{
MetaData:SealNotifyMetaData;
Message:SealNotifyMessage;
}
export class SealNotifyMetaData extends CLZOObject{
MessageId:string;
CreationTime:string;
InteractionId:string;
OriginatorMachineID:string;
VersionCode:string;
HL7Version:string;
UserLoggedIn:SealNotifyUserLoggedIn;
}
export class SealNotifyUserLoggedIn extends CLZOObject{
UserRoleProfileID:string;
UserID:string;
UserJobRoleCode:string;
}
export class SealNotifyMessage extends CLZOObject{
RequesterType:string;
SealingChangeItemRefType:string;
RequesterId:string;
RequesterName:string;
RequesterDisplayName:string;
RequesterCode:string;
EffectiveDTTM:string;
NHSNumber:string;
SealingReson:string;
Comments:string;
SealEventActionCode:string;
AuthorOfSeal:string;
}
export class SealAuthor extends CLZOObject{
Code:string;
DisplayName:string;
OrganisationId:string;
OrganisationName:string;
PersonName:string;
SDSId:string;
SDSUserProfileID:string;
}
export class SealAccessGroup extends CLZOObject{
AccessGroupIdentifier:string;
SealIdentifier:string;
ArtefactOID:number;
ArtefactType:string;
IsSealingGroup:boolean;
IsEditingGroup:boolean;
ArtefactName:string;
ArtefactDesc:string;
ArtefactID:string;
}
export class SealAccessUsers extends CLZOObject{
AccessUserType:string;
AccessUserIdentifier:string;
SealIdentifier:string;
CareProviderIdentifier:number;
ActionTaken:string;
ClinicianID:string;
SurName:string;
ForeName:string;
Role:string;
RoleOID:number;
OrgName:string;
}
export class AllergyStatus extends HealthIssueStatus{
OnsetDateDisplay:string;
AllergyType:string;
bServiceCall:boolean;
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
export class HOLocation extends Location{
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
export class HOService extends ServicePoint{
Type:string;
OrganisationName:string;
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
export class ParentService extends CLZOObject{
OId:number;
Type:string;
Name:string;
MainIDType:string;
MainID:string;
ActiveFrom:DateTime;
ActiveTo:DateTime;
}
export class HOCareService extends CareService{
}
export class Role extends CLZOObject{
RoleOID:number;
IsRestrictedData:boolean;
Code:string;
Description:string;
Name:string;
}
export class AllergySearchCriteria extends Allergy{
oHealthIssueCriteria:SearchCriteria;
}
export class SearchCriteria extends CLZOObject{
IsGroupBy:string;
GroupByType:string;
GroupByData:string;
RoleProfileOID:number;
UserspecialityOID:number;
POMRMode:string;
SortBy:string;
SortByData:string;
SortOrder:string;
ProblemOnsetDate:DateTime;
ParentSortData:string;
ParentSortOrder:string;
FromDate:DateTime;
ToDate:DateTime;
SearchType:string;
PageNo:number;
PageSize:number;
IncludeInactiveHI:string;
IncludeStruckOutHI:string;
IsOnlyContext:string;
EPRMAPValue:string;
}
export class RecAllergyOut extends CLZOObject{
AllergyOID:string;
IsRecordProblem:boolean;
AllergyType:string;
IsConflictGenerated:boolean;
IsStichSendAuth:boolean;
IsAuthorise:boolean;
GPConnectID:string;
}
export class HealthIssueHistory extends CLZOObject{
OID:string;
ColumnName:string;
FromValue:string;
ToValue:string;
UsersOID:number;
UserName:string;
ModifiedDTTM:DateTime;
}
export class HISendAuthorisation extends CLZOObject{
HIOID:number;
HIIdentifyingType:string;
HIType:string;
HIName:string;
HIStatusCode:string;
HIEscalationOID:number;
OrganisationName:string;
HILastModifiedAt:DateTime;
oHIContext:HealthIssueContext;
PatientOid:string;
bServiceCall:boolean;
objHISendAuthorisationdt:ObservableCollection<HISendAuthorisationDetail>;
}
export class HISendAuthorisationDetail{
RecepientType:string;
RecepientRoleProfileOid:number;
RecepientOid:number;
RecepientName:string;
RoleProfileID:string;
}
export class CCareServiceOP extends CLZOObject{
LeadClinicianOID:number;
CurrentLevelID:number;
CareserviceResolved:boolean;
VerificationDTTM:DateTime;
OriginalRequestor:number;
IsFinalAuthLevel:number;
ActorIdentifyType:string;
RequestCode:string;
RequestID:string;
NotifyUsers:ObservableCollection<CNotifyUser>;
}
export class CNotifyUser extends CLZOObject{
LoginOID:number;
LoginName:string;
UserOID:number;
RoleOID:number;
RoleProfileOID:number;
RoleProfileCode:string;
OrganisationOID:number;
OrganisationName:string;
BusinessProcessQualifier:string;
BusinessProcessIdentifier:string;
ForeName:string;
SurName:string;
}
export class MultipleAllergyDetails extends CLZOObject{
AllergyType:string;
AllergyStatus:string;
PatientOID:string;
AllergyAltTerm:string;
Severity:string;
Allergygen:string;
Reaction:string;
PCOID:string;
AllergyDescription:string;
AllergyOID:string;
}
export class SeverityReactions{
SeverityText:string;
SeverityCode:string;
SeverityTerm:string;
ReactionText:string;
ReactionCode:string;
ReactionTerm:string;
Weightage:number;
}
export class CResMsgManageAllergies{
oContextInformation:CContextInformation;
}
export class CReqMsgRecordAllergy{
oContextInformation:CContextInformation;
oAllergyDetBC:ObservableCollection<AllergyDetails>;
}
export class CResMsgRecordAllergy{
oContextInformation:CContextInformation;
oRecAllergyOut:ObservableCollection<RecAllergyOut>;
}
export class CReqMsgModifyAllergy{
oAllergyDetBC:AllergyDetails;
oContextInformation:CContextInformation;
}
export class CResMsgModifyAllergy{
oRecAllergyOut:RecAllergyOut;
oContextInformation:CContextInformation;
}
export class CReqMsgCloseAllergy{
oHICBC:HealthIssueContext;
oAllergystatusBC:AllergyStatus;
oContextInformation:CContextInformation;
}
export class CResMsgCloseAllergy{
oContextInformation:CContextInformation;
}
export class CReqMsgReopenAllergy{
oHICBC:HealthIssueContext;
oAllergystatusBC:AllergyStatus;
oContextInformation:CContextInformation;
}
export class CResMsgReopenAllergy{
IsConflictGenerated:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgStrikeoutAllergy{
oContextBC:HealthIssueContext;
oAllergystatusBC:AllergyStatus;
oContextInformation:CContextInformation;
}
export class CResMsgStrikeoutAllergy{
oContextInformation:CContextInformation;
}
export class CReqMsgAllergyChecked{
oContextBC:HealthIssueContext;
oAllergyCheckedBC:AllergyChecked;
oContextInformation:CContextInformation;
}
export class CResMsgAllergyChecked{
AllergyChkOID:number;
oContextInformation:CContextInformation;
}
export class CReqMsgGetPatientAllergies{
oContextBC:HealthIssueContext;
oAllergySearchCriteriaBC:AllergySearchCriteria;
pageElementBC:PagingDynamicSQL;
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
export class CResMsgGetPatientAllergies{
RecordCount:number;
oContextInformation:CContextInformation;
oPatientAllergyDet:ObservableCollection<Allergy>;
}
export class CReqMsgGetAllergyHistory{
AllergyIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetAllergyHistory{
oContextInformation:CContextInformation;
oAllergyHistory:ObservableCollection<HealthIssueHistory>;
}
export class CReqMsgGetAllergyStatus{
AllergyIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetAllergyStatus{
oContextInformation:CContextInformation;
oAllergyStatus:ObservableCollection<AllergyStatus>;
}
export class CReqMsgGetAllergyCheckedDesc{
sPatientOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetAllergyCheckedDesc{
oAllergyChecked:AllergyChecked;
oContextInformation:CContextInformation;
}
export class CReqMsgGetPatientAllergy{
AllergyOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetPatientAllergy{
oPatientAllergyDet:Allergy;
oContextInformation:CContextInformation;
}
export class CReqMsgGetPatientAllergysByOids{
AllergyOIDsBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetPatientAllergysByOids{
oContextInformation:CContextInformation;
oPatientAllergyDet:ObservableCollection<Allergy>;
}
export class CReqMsgGetPatBannerAllergyDesc{
oContextBC:HealthIssueContext;
oContextInformation:CContextInformation;
}
export class CResMsgGetPatBannerAllergyDesc{
sDisplayText:string;
cIsCrucial:string;
oContextInformation:CContextInformation;
}
export class CReqMsgGetPatBannerAllergyNameAndDescription{
oContextBC:HealthIssueContext;
oContextInformation:CContextInformation;
}
export class CResMsgGetPatBannerAllergyNameAndDescription{
sAlgNameDisplayText:string;
sAlgDescDisplayText:string;
cIsCrucial:string;
oContextInformation:CContextInformation;
}
export class CReqMsgGetPatBannerAllergyNames{
oContextBC:HealthIssueContext;
oContextInformation:CContextInformation;
}
export class CResMsgGetPatBannerAllergyNames{
sDisplayText:string;
cIsCrucial:string;
oContextInformation:CContextInformation;
}
export class CReqMsgGetPatBannerAllergyNamesForTheatres{
oContextBC:HealthIssueContext;
oContextInformation:CContextInformation;
}
export class CResMsgGetPatBannerAllergyNamesForTheatres{
oContextInformation:CContextInformation;
oAllergy:ObservableCollection<Allergy>;
}
export class CReqMsgCheckDuplicateAllergy{
oContextBC:HealthIssueContext;
sAllergyTypeBC:string;
sAllergenBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgCheckDuplicateAllergy{
isDuplicate:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgAllergyCheckedHistory{
lnPatientOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgAllergyCheckedHistory{
oContextInformation:CContextInformation;
oAllergyChecked:ObservableCollection<AllergyChecked>;
}
export class CReqMsgCheckActiveAllergies{
lnPatientOIDBC:number;
sALGStatusBC:string;
sALGTypeBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgCheckActiveAllergies{
iCount:number;
oContextInformation:CContextInformation;
}
export class CReqMsgSendAuthoriseAllergy{
oContextInformation:CContextInformation;
oArrHISendAuthorisationBC:ObservableCollection<HISendAuthorisation>;
}
export class CResMsgSendAuthoriseAllergy{
oContextInformation:CContextInformation;
}
export class CReqMsgGetAllergyListByOIDs{
oHIDetBC:HealthIssueDetails;
oContextInformation:CContextInformation;
}
export class HealthIssueDetails{
PatientOID:number;
HIOIDs:string;
HIOID:number;
HIType:string;
HIName:string;
OrgOID:number;
HIStatus:string;
LastModifiedAt:DateTime;
EncounterOID:number;
OnsetDTTM:DateTime;
OnsetDTTMFormat:string;
UserOID:number;
EncMainIdentifier:string;
StatusReasonCode:string;
AllEncEpiCode:string;
AllEncEpiText:string;
ScopeDetails:string;
ConfidenceLevelText:string;
ConfidenceLevelCode:string;
InformationSourceText:string;
InformationSourceCode:string;
RiskToText:string;
RiskToCode:string;
oSeverityReactions:ObservableCollection<SeverityReactions>;
}
export class CResMsgGetAllergyListByOIDs{
oContextInformation:CContextInformation;
oArrHIDets:ObservableCollection<HealthIssueDetails>;
}
export class CReqMsgAuthoriseAllergy{
oContextInformation:CContextInformation;
oarrHIAlgAuthorisationBC:ObservableCollection<HIAlgAuthorisation>;
}
export class HIAlgAuthorisation{
objHIAuthorisation:HIAuthorisation;
objAllergyDetails:AllergyDetails;
bMobility:boolean;
}
export class HIAuthorisation{
OutcomeCode:string;
ReasonCode:string;
ReasonText:string;
Comments:string;
SenderOid:number;
SenderName:string;
HIName:string;
}
export class CResMsgAuthoriseAllergy{
oContextInformation:CContextInformation;
}
export class CReqMsgGetUsersByRoleOID{
lnEncounterOIDBC:number;
lnRoleOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetUsersByRoleOID{
objCareService:CCareServiceOP;
oContextInformation:CContextInformation;
}
export class CReqMsgGetAllergiesExists{
oContextBC:HealthIssueContext;
oContextInformation:CContextInformation;
}
export class CResMsgGetAllergiesExists{
oAllergyInfo:AllergyDetails;
oContextInformation:CContextInformation;
}
export class CReqMsgpGetPatALGSByPatientOIDWS{
PatientOIDBC:string;
OrgOIDBC:string;
ALGStatusBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgpGetPatALGSByPatientOIDWS{
oContextInformation:CContextInformation;
oDetails:ObservableCollection<MultipleAllergyDetails>;
}
export class CReqMsgGetADRstatusExists{
InPatientOIDBC:string;
InOrganisationOIDBC:string;
InEncounterOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetADRstatusExists{
ActResult:number;
oContextInformation:CContextInformation;
}
export class CReqMsgGetGPConnectSaved{
oAlgDetailsBC:Allergy;
oContextInformation:CContextInformation;
}
export class CResMsgGetGPConnectSaved{
sGpConnectID:string;
sGPConflict:string;
oContextInformation:CContextInformation;
}


 const prototypeList = {"ManageAllergyWS.ManageAllergies":CResMsgManageAllergies.prototype ,
"ManageAllergyWS.RecordAllergy":CResMsgRecordAllergy.prototype ,
"ManageAllergyWS.ModifyAllergy":CResMsgModifyAllergy.prototype ,
"ManageAllergyWS.CloseAllergy":CResMsgCloseAllergy.prototype ,
"ManageAllergyWS.ReopenAllergy":CResMsgReopenAllergy.prototype ,
"ManageAllergyWS.StrikeoutAllergy":CResMsgStrikeoutAllergy.prototype ,
"ManageAllergyWS.AllergyChecked":CResMsgAllergyChecked.prototype ,
"ManageAllergyWS.GetPatientAllergies":CResMsgGetPatientAllergies.prototype ,
"ManageAllergyWS.GetAllergyHistory":CResMsgGetAllergyHistory.prototype ,
"ManageAllergyWS.GetAllergyStatus":CResMsgGetAllergyStatus.prototype ,
"ManageAllergyWS.GetAllergyCheckedDesc":CResMsgGetAllergyCheckedDesc.prototype ,
"ManageAllergyWS.GetPatientAllergy":CResMsgGetPatientAllergy.prototype ,
"ManageAllergyWS.GetPatientAllergysByOids":CResMsgGetPatientAllergysByOids.prototype ,
"ManageAllergyWS.GetPatBannerAllergyDesc":CResMsgGetPatBannerAllergyDesc.prototype ,
"ManageAllergyWS.GetPatBannerAllergyNameAndDescription":CResMsgGetPatBannerAllergyNameAndDescription.prototype ,
"ManageAllergyWS.GetPatBannerAllergyNames":CResMsgGetPatBannerAllergyNames.prototype ,
"ManageAllergyWS.GetPatBannerAllergyNamesForTheatres":CResMsgGetPatBannerAllergyNamesForTheatres.prototype ,
"ManageAllergyWS.CheckDuplicateAllergy":CResMsgCheckDuplicateAllergy.prototype ,
"ManageAllergyWS.AllergyCheckedHistory":CResMsgAllergyCheckedHistory.prototype ,
"ManageAllergyWS.CheckActiveAllergies":CResMsgCheckActiveAllergies.prototype ,
"ManageAllergyWS.SendAuthoriseAllergy":CResMsgSendAuthoriseAllergy.prototype ,
"ManageAllergyWS.GetAllergyListByOIDs":CResMsgGetAllergyListByOIDs.prototype ,
"ManageAllergyWS.AuthoriseAllergy":CResMsgAuthoriseAllergy.prototype ,
"ManageAllergyWS.GetUsersByRoleOID":CResMsgGetUsersByRoleOID.prototype ,
"ManageAllergyWS.GetAllergiesExists":CResMsgGetAllergiesExists.prototype ,
"ManageAllergyWS.pGetPatALGSByPatientOIDWS":CResMsgpGetPatALGSByPatientOIDWS.prototype ,
"ManageAllergyWS.GetADRstatusExists":CResMsgGetADRstatusExists.prototype ,
"ManageAllergyWS.GetGPConnectSaved":CResMsgGetGPConnectSaved.prototype ,

CReqMsgManageAllergies : { 
oContextInformation:CContextInformation.prototype ,
oAllergyDetBC:AllergyDetails.prototype ,

 },AllergyDetails : { 
oAllergy:Allergy.prototype ,
oAllergyChecked:AllergyChecked.prototype ,
oHIContext:HealthIssueContext.prototype ,
oALGSnomedCodes:HealthIssueCode.prototype ,
oALGAlternateCodes:AltCodingSchemeData.prototype ,

 },Allergy : { 
oProvenance:Provenance.prototype ,
oPatientSeal:PatientSeal.prototype ,
GroupByResult:GroupResult.prototype ,
SeverityReactions:SeverityReactions.prototype ,

 },Provenance : { 
ObjobservedBy:dpUser.prototype ,
ObjRecordedBy:dpUser.prototype ,

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

 },CareProvider : { 
oSpecialty:Specialty.prototype ,
otreatmentfunction:Specialty.prototype ,
objTeamDetail:TeamDetail.prototype ,
oConCareProvider:dpUser.prototype ,

 },Team : { 
TeamOrganisation:ObjectInfo.prototype ,

 },TeamDetail : { 
TeamLead:TeamMember.prototype ,
TeamSpecialty:ObjectInfo.prototype ,
ServicePoint:ObjectInfo.prototype ,
ParentTeam:Team.prototype ,
AccessControlWorkgroup:ObjectInfo.prototype ,
MembershipWorkgroup:ObjectInfo.prototype ,
AuditData:AuditInfo.prototype ,
oHealthOrganisation:HealthOrganisationDetail.prototype ,
TeamAddress:UserAddress.prototype ,
TeamMembers:TeamMember.prototype ,
TeamClinicalUnit:TeamClinicalUnit.prototype ,

 },TeamMember : { 
RoleProfile:ObjectInfo.prototype ,
Role:ObjectInfo.prototype ,
AccessControlWorkgroup:ObjectInfo.prototype ,
MembershipWorkgroup:ObjectInfo.prototype ,
TeamMemberEnterpriseWorkgroup:EnterpriseWorkgroup.prototype ,
RoleProfileCode:ObjectInfo.prototype ,

 },EnterpriseWorkgroup : { 
oWorkgroupUser:LRWorkgroupUser.prototype ,

 },LRWorkgroupUser : { 
UserDetails:UserLoggedIn.prototype ,

 },Address : { 
Contract:ContractActivity.prototype ,

 },UserAddress : { 
UserContact:Contact.prototype ,

 },Contact : { 
oAuditInfo:AuditInfo.prototype ,
oUserMobileNumber:UserMobileNumber.prototype ,

 },UserMobileNumber : { 
oAuditInfo:AuditInfo.prototype ,

 },ContractActivity : { 
oAssociatedEntities:AssociatedEntities.prototype ,
GroupByResult:GroupResult.prototype ,

 },HOAddress : { 
oAuditInfo:AuditInfo.prototype ,
HOContact:Contact.prototype ,

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

 },HealthIssueStatus : { 
oProblemScopeDetail:ProblemScopeDetail.prototype ,

 },ProblemScopeDetail : { 
Child:ProblemScopeDetail.prototype ,

 },AllergyChecked : { 
EncounterInfo:Encounter.prototype ,
oAllergyCheckedHistory:AllergyChecked.prototype ,

 },Encounter : { 
PatientSeal:PatientSeal.prototype ,
SecondaryCareProvider:SecondaryCareProvider.prototype ,

 },PatientSeal : { 
sSealPsisMess:SealPSISMessage.prototype ,
SealPSISMessage:SealPSISMessage.prototype ,
patientSealAccessGroup:SealAccessGroup.prototype ,
PatientSealAccessUsers:SealAccessUsers.prototype ,

 },SealPSISMessage : { 
SealReportPacket:SealReportPacket.prototype ,
SealReportInfo:SealReportInfo.prototype ,
SealNotifyPacket:SealNotifyPacket.prototype ,
SealAuthor:SealAuthor.prototype ,

 },SealReportPacket : { 
MetaData:SealReportMetaData.prototype ,
Message:SealReportMessage.prototype ,

 },SealReportMetaData : { 
UserLoggedIn:SealReportUserLoggedIn.prototype ,

 },SealReportMessage : { 
SealAccessor:SealGroupAccessor.prototype ,

 },SealNotifyPacket : { 
MetaData:SealNotifyMetaData.prototype ,
Message:SealNotifyMessage.prototype ,

 },SealNotifyMetaData : { 
UserLoggedIn:SealNotifyUserLoggedIn.prototype ,

 },LocationMask : { 
MaskInfo:MaskInfo.prototype ,

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

 },AllergySearchCriteria : { 
oHealthIssueCriteria:SearchCriteria.prototype ,

 },HISendAuthorisation : { 
oHIContext:HealthIssueContext.prototype ,
objHISendAuthorisationdt:HISendAuthorisationDetail.prototype ,

 },CCareServiceOP : { 
NotifyUsers:CNotifyUser.prototype ,

 },CResMsgManageAllergies : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgRecordAllergy : { 
oContextInformation:CContextInformation.prototype ,
oAllergyDetBC:AllergyDetails.prototype ,

 },CResMsgRecordAllergy : { 
oContextInformation:CContextInformation.prototype ,
oRecAllergyOut:RecAllergyOut.prototype ,

 },CReqMsgModifyAllergy : { 
oAllergyDetBC:AllergyDetails.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgModifyAllergy : { 
oRecAllergyOut:RecAllergyOut.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgCloseAllergy : { 
oHICBC:HealthIssueContext.prototype ,
oAllergystatusBC:AllergyStatus.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgCloseAllergy : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgReopenAllergy : { 
oHICBC:HealthIssueContext.prototype ,
oAllergystatusBC:AllergyStatus.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgReopenAllergy : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgStrikeoutAllergy : { 
oContextBC:HealthIssueContext.prototype ,
oAllergystatusBC:AllergyStatus.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgStrikeoutAllergy : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgAllergyChecked : { 
oContextBC:HealthIssueContext.prototype ,
oAllergyCheckedBC:AllergyChecked.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgAllergyChecked : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPatientAllergies : { 
oContextBC:HealthIssueContext.prototype ,
oAllergySearchCriteriaBC:AllergySearchCriteria.prototype ,
pageElementBC:PagingDynamicSQL.prototype ,
oContextInformation:CContextInformation.prototype ,

 },PagingDynamicSQL : { 
FilterBy:Filter.prototype ,
GroupBy:Group.prototype ,

 },CResMsgGetPatientAllergies : { 
oContextInformation:CContextInformation.prototype ,
oPatientAllergyDet:Allergy.prototype ,

 },CReqMsgGetAllergyHistory : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAllergyHistory : { 
oContextInformation:CContextInformation.prototype ,
oAllergyHistory:HealthIssueHistory.prototype ,

 },CReqMsgGetAllergyStatus : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAllergyStatus : { 
oContextInformation:CContextInformation.prototype ,
oAllergyStatus:AllergyStatus.prototype ,

 },CReqMsgGetAllergyCheckedDesc : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAllergyCheckedDesc : { 
oAllergyChecked:AllergyChecked.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPatientAllergy : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPatientAllergy : { 
oPatientAllergyDet:Allergy.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPatientAllergysByOids : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPatientAllergysByOids : { 
oContextInformation:CContextInformation.prototype ,
oPatientAllergyDet:Allergy.prototype ,

 },CReqMsgGetPatBannerAllergyDesc : { 
oContextBC:HealthIssueContext.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPatBannerAllergyDesc : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPatBannerAllergyNameAndDescription : { 
oContextBC:HealthIssueContext.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPatBannerAllergyNameAndDescription : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPatBannerAllergyNames : { 
oContextBC:HealthIssueContext.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPatBannerAllergyNames : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetPatBannerAllergyNamesForTheatres : { 
oContextBC:HealthIssueContext.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetPatBannerAllergyNamesForTheatres : { 
oContextInformation:CContextInformation.prototype ,
oAllergy:Allergy.prototype ,

 },CReqMsgCheckDuplicateAllergy : { 
oContextBC:HealthIssueContext.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgCheckDuplicateAllergy : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgAllergyCheckedHistory : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgAllergyCheckedHistory : { 
oContextInformation:CContextInformation.prototype ,
oAllergyChecked:AllergyChecked.prototype ,

 },CReqMsgCheckActiveAllergies : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgCheckActiveAllergies : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgSendAuthoriseAllergy : { 
oContextInformation:CContextInformation.prototype ,
oArrHISendAuthorisationBC:HISendAuthorisation.prototype ,

 },CResMsgSendAuthoriseAllergy : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetAllergyListByOIDs : { 
oHIDetBC:HealthIssueDetails.prototype ,
oContextInformation:CContextInformation.prototype ,

 },HealthIssueDetails : { 
oSeverityReactions:SeverityReactions.prototype ,

 },CResMsgGetAllergyListByOIDs : { 
oContextInformation:CContextInformation.prototype ,
oArrHIDets:HealthIssueDetails.prototype ,

 },CReqMsgAuthoriseAllergy : { 
oContextInformation:CContextInformation.prototype ,
oarrHIAlgAuthorisationBC:HIAlgAuthorisation.prototype ,

 },HIAlgAuthorisation : { 
objHIAuthorisation:HIAuthorisation.prototype ,
objAllergyDetails:AllergyDetails.prototype ,

 },CResMsgAuthoriseAllergy : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetUsersByRoleOID : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetUsersByRoleOID : { 
objCareService:CCareServiceOP.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetAllergiesExists : { 
oContextBC:HealthIssueContext.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAllergiesExists : { 
oAllergyInfo:AllergyDetails.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgpGetPatALGSByPatientOIDWS : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgpGetPatALGSByPatientOIDWS : { 
oContextInformation:CContextInformation.prototype ,
oDetails:MultipleAllergyDetails.prototype ,

 },CReqMsgGetADRstatusExists : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetADRstatusExists : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetGPConnectSaved : { 
oAlgDetailsBC:Allergy.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetGPConnectSaved : { 
oContextInformation:CContextInformation.prototype ,

 },CContextInformation : { 
Current:CContextInformation.prototype ,

 },
 }
 
const charPropertyLookup = [
'IsSNOMEDCT','IsSignificant','HasHistoryInfo','CanStrikeOut','IsMHRA',
'MFNBatchStatus',
'IsLegalEntity',
'IsPatientDeceased',
'IsEmailRegWithEncryptService',
'IsAssignmentLocked',
'IsClearAssignment','IsModified','IsLocked',
'IsEncounterUpdate',
'MigrationFlag',
'IsAllowMultiple',
'IsSealOwner','IsSimple',
'IsWardAttendance','IsWardInUse','TransferFormRequired',
'IsVisible',
'IsSectionTypeChangeable',
'IsGroupBy','SortOrder','ParentSortOrder','SearchType','IncludeInactiveHI','IncludeStruckOutHI','IsOnlyContext',
'cIsCrucial',]
 