import { int64, int16, int32, uInt16, uInt32, uInt64, byte, long, double, decimal, DelegateArgs, CContextInformation, CLZOObject} from "epma-platform/models";
import { ObservableCollection } from "../models/observable-collection";
import DateTime from "../services/datetime.service";
import { HelperService } from "./helper.service";
export class CSecurityAuthenticationServiceWSSoapClient{

ManageUserPINCompleted: Function;
ManageUserPINAsync(oCReqMsgManageUserPIN:CReqMsgManageUserPIN ) : void {
  HelperService.Invoke<CReqMsgManageUserPIN,CResMsgManageUserPIN,ManageUserPINCompletedEventArgs>("CSecurityAuthenticationServiceWS.ManageUserPIN",oCReqMsgManageUserPIN,this.ManageUserPINCompleted,"sPin",new ManageUserPINCompletedEventArgs(), prototypeList);
}

ValidateUserPINCompleted: Function;
ValidateUserPINAsync(oCReqMsgValidateUserPIN:CReqMsgValidateUserPIN ) : void {
  HelperService.Invoke<CReqMsgValidateUserPIN,CResMsgValidateUserPIN,ValidateUserPINCompletedEventArgs>("CSecurityAuthenticationServiceWS.ValidateUserPIN",oCReqMsgValidateUserPIN,this.ValidateUserPINCompleted,"sPin",new ValidateUserPINCompletedEventArgs(), prototypeList);
}

LockLoginAccountCompleted: Function;
LockLoginAccountAsync(oCReqMsgLockLoginAccount:CReqMsgLockLoginAccount ) : void {
  HelperService.Invoke<CReqMsgLockLoginAccount,CResMsgLockLoginAccount,LockLoginAccountCompletedEventArgs>("CSecurityAuthenticationServiceWS.LockLoginAccount",oCReqMsgLockLoginAccount,this.LockLoginAccountCompleted,"sLoginID",new LockLoginAccountCompletedEventArgs(), prototypeList);
}

ChangePasswordCompleted: Function;
ChangePasswordAsync(oCReqMsgChangePassword:CReqMsgChangePassword ) : void {
  HelperService.Invoke<CReqMsgChangePassword,CResMsgChangePassword,ChangePasswordCompletedEventArgs>("CSecurityAuthenticationServiceWS.ChangePassword",oCReqMsgChangePassword,this.ChangePasswordCompleted,"objCLoginSecretQuestion",new ChangePasswordCompletedEventArgs(), prototypeList);
}

ChangePasswordByLoginTypeCompleted: Function;
ChangePasswordByLoginTypeAsync(oCReqMsgChangePasswordByLoginType:CReqMsgChangePasswordByLoginType ) : void {
  HelperService.Invoke<CReqMsgChangePasswordByLoginType,CResMsgChangePasswordByLoginType,ChangePasswordByLoginTypeCompletedEventArgs>("CSecurityAuthenticationServiceWS.ChangePasswordByLoginType",oCReqMsgChangePasswordByLoginType,this.ChangePasswordByLoginTypeCompleted,"objCLoginSecretQuestion",new ChangePasswordByLoginTypeCompletedEventArgs(), prototypeList);
}

SSOChangePasswordCompleted: Function;
SSOChangePasswordAsync(oCReqMsgSSOChangePassword:CReqMsgSSOChangePassword ) : void {
  HelperService.Invoke<CReqMsgSSOChangePassword,CResMsgSSOChangePassword,SSOChangePasswordCompletedEventArgs>("CSecurityAuthenticationServiceWS.SSOChangePassword",oCReqMsgSSOChangePassword,this.SSOChangePasswordCompleted,"sNewPassword",new SSOChangePasswordCompletedEventArgs(), prototypeList);
}

AuthenticateCompleted: Function;
AuthenticateAsync(oCReqMsgAuthenticate:CReqMsgAuthenticate ) : void {
  HelperService.Invoke<CReqMsgAuthenticate,CResMsgAuthenticate,AuthenticateCompletedEventArgs>("CSecurityAuthenticationServiceWS.Authenticate",oCReqMsgAuthenticate,this.AuthenticateCompleted,"lnHostID",new AuthenticateCompletedEventArgs(), prototypeList);
}

ADAuthenticateCompleted: Function;
ADAuthenticateAsync(oCReqMsgADAuthenticate:CReqMsgADAuthenticate ) : void {
  HelperService.Invoke<CReqMsgADAuthenticate,CResMsgADAuthenticate,ADAuthenticateCompletedEventArgs>("CSecurityAuthenticationServiceWS.ADAuthenticate",oCReqMsgADAuthenticate,this.ADAuthenticateCompleted,"lnHostId",new ADAuthenticateCompletedEventArgs(), prototypeList);
}

ReAuthenticateCompleted: Function;
ReAuthenticateAsync(oCReqMsgReAuthenticate:CReqMsgReAuthenticate ) : void {
  HelperService.Invoke<CReqMsgReAuthenticate,CResMsgReAuthenticate,ReAuthenticateCompletedEventArgs>("CSecurityAuthenticationServiceWS.ReAuthenticate",oCReqMsgReAuthenticate,this.ReAuthenticateCompleted,"sPassword",new ReAuthenticateCompletedEventArgs(), prototypeList);
}

ValidateSessionCompleted: Function;
ValidateSessionAsync(oCReqMsgValidateSession:CReqMsgValidateSession ) : void {
  HelperService.Invoke<CReqMsgValidateSession,CResMsgValidateSession,ValidateSessionCompletedEventArgs>("CSecurityAuthenticationServiceWS.ValidateSession",oCReqMsgValidateSession,this.ValidateSessionCompleted,"sessionToken",new ValidateSessionCompletedEventArgs(), prototypeList);
}

GetSessionDetailsCompleted: Function;
GetSessionDetailsAsync(oCReqMsgGetSessionDetails:CReqMsgGetSessionDetails ) : void {
  HelperService.Invoke<CReqMsgGetSessionDetails,CResMsgGetSessionDetails,GetSessionDetailsCompletedEventArgs>("CSecurityAuthenticationServiceWS.GetSessionDetails",oCReqMsgGetSessionDetails,this.GetSessionDetailsCompleted,"sessionToken",new GetSessionDetailsCompletedEventArgs(), prototypeList);
}

GetRoleProfilesForLoginCompleted: Function;
GetRoleProfilesForLoginAsync(oCReqMsgGetRoleProfilesForLogin:CReqMsgGetRoleProfilesForLogin ) : void {
  HelperService.Invoke<CReqMsgGetRoleProfilesForLogin,CResMsgGetRoleProfilesForLogin,GetRoleProfilesForLoginCompletedEventArgs>("CSecurityAuthenticationServiceWS.GetRoleProfilesForLogin",oCReqMsgGetRoleProfilesForLogin,this.GetRoleProfilesForLoginCompleted,"sLoginID",new GetRoleProfilesForLoginCompletedEventArgs(), prototypeList);
}

GetRoleProfileForLoginDetailCompleted: Function;
GetRoleProfileForLoginDetailAsync(oCReqMsgGetRoleProfileForLoginDetail:CReqMsgGetRoleProfileForLoginDetail ) : void {
  HelperService.Invoke<CReqMsgGetRoleProfileForLoginDetail,CResMsgGetRoleProfileForLoginDetail,GetRoleProfileForLoginDetailCompletedEventArgs>("CSecurityAuthenticationServiceWS.GetRoleProfileForLoginDetail",oCReqMsgGetRoleProfileForLoginDetail,this.GetRoleProfileForLoginDetailCompleted,"bIsNative",new GetRoleProfileForLoginDetailCompletedEventArgs(), prototypeList);
}

GetRoleProfileForLoginDetailWithWACompleted: Function;
GetRoleProfileForLoginDetailWithWAAsync(oCReqMsgGetRoleProfileForLoginDetailWithWA:CReqMsgGetRoleProfileForLoginDetailWithWA ) : void {
  HelperService.Invoke<CReqMsgGetRoleProfileForLoginDetailWithWA,CResMsgGetRoleProfileForLoginDetailWithWA,GetRoleProfileForLoginDetailWithWACompletedEventArgs>("CSecurityAuthenticationServiceWS.GetRoleProfileForLoginDetailWithWA",oCReqMsgGetRoleProfileForLoginDetailWithWA,this.GetRoleProfileForLoginDetailWithWACompleted,"bIncludeWorkingArea",new GetRoleProfileForLoginDetailWithWACompletedEventArgs(), prototypeList);
}

GetRoleProfileForUserCompleted: Function;
GetRoleProfileForUserAsync(oCReqMsgGetRoleProfileForUser:CReqMsgGetRoleProfileForUser ) : void {
  HelperService.Invoke<CReqMsgGetRoleProfileForUser,CResMsgGetRoleProfileForUser,GetRoleProfileForUserCompletedEventArgs>("CSecurityAuthenticationServiceWS.GetRoleProfileForUser",oCReqMsgGetRoleProfileForUser,this.GetRoleProfileForUserCompleted,"sUserName",new GetRoleProfileForUserCompletedEventArgs(), prototypeList);
}

UpdateSessionForRoleProfileCompleted: Function;
UpdateSessionForRoleProfileAsync(oCReqMsgUpdateSessionForRoleProfile:CReqMsgUpdateSessionForRoleProfile ) : void {
  HelperService.Invoke<CReqMsgUpdateSessionForRoleProfile,CResMsgUpdateSessionForRoleProfile,UpdateSessionForRoleProfileCompletedEventArgs>("CSecurityAuthenticationServiceWS.UpdateSessionForRoleProfile",oCReqMsgUpdateSessionForRoleProfile,this.UpdateSessionForRoleProfileCompleted,"sRoleProfileID",new UpdateSessionForRoleProfileCompletedEventArgs(), prototypeList);
}

UpdateWAOIDForRoleProfileCompleted: Function;
UpdateWAOIDForRoleProfileAsync(oCReqMsgUpdateWAOIDForRoleProfile:CReqMsgUpdateWAOIDForRoleProfile ) : void {
  HelperService.Invoke<CReqMsgUpdateWAOIDForRoleProfile,CResMsgUpdateWAOIDForRoleProfile,UpdateWAOIDForRoleProfileCompletedEventArgs>("CSecurityAuthenticationServiceWS.UpdateWAOIDForRoleProfile",oCReqMsgUpdateWAOIDForRoleProfile,this.UpdateWAOIDForRoleProfileCompleted,"lnWorkingAreaOID",new UpdateWAOIDForRoleProfileCompletedEventArgs(), prototypeList);
}

UpdateSessionForRoleProfileEntObjCompleted: Function;
UpdateSessionForRoleProfileEntObjAsync(oCReqMsgUpdateSessionForRoleProfileEntObj:CReqMsgUpdateSessionForRoleProfileEntObj ) : void {
  HelperService.Invoke<CReqMsgUpdateSessionForRoleProfileEntObj,CResMsgUpdateSessionForRoleProfileEntObj,UpdateSessionForRoleProfileEntObjCompletedEventArgs>("CSecurityAuthenticationServiceWS.UpdateSessionForRoleProfileEntObj",oCReqMsgUpdateSessionForRoleProfileEntObj,this.UpdateSessionForRoleProfileEntObjCompleted,"objEnterpriseObject",new UpdateSessionForRoleProfileEntObjCompletedEventArgs(), prototypeList);
}

InvalidateSessionWithReasonCompleted: Function;
InvalidateSessionWithReasonAsync(oCReqMsgInvalidateSessionWithReason:CReqMsgInvalidateSessionWithReason ) : void {
  HelperService.Invoke<CReqMsgInvalidateSessionWithReason,CResMsgInvalidateSessionWithReason,InvalidateSessionWithReasonCompletedEventArgs>("CSecurityAuthenticationServiceWS.InvalidateSessionWithReason",oCReqMsgInvalidateSessionWithReason,this.InvalidateSessionWithReasonCompleted,"enmReason",new InvalidateSessionWithReasonCompletedEventArgs(), prototypeList);
}

InvalidateSessionCompleted: Function;
InvalidateSessionAsync(oCReqMsgInvalidateSession:CReqMsgInvalidateSession ) : void {
  HelperService.Invoke<CReqMsgInvalidateSession,CResMsgInvalidateSession,InvalidateSessionCompletedEventArgs>("CSecurityAuthenticationServiceWS.InvalidateSession",oCReqMsgInvalidateSession,this.InvalidateSessionCompleted,"objReqInvalidateSession",new InvalidateSessionCompletedEventArgs(), prototypeList);
}

ResetPasswordCompleted: Function;
ResetPasswordAsync(oCReqMsgResetPassword:CReqMsgResetPassword ) : void {
  HelperService.Invoke<CReqMsgResetPassword,CResMsgResetPassword,ResetPasswordCompletedEventArgs>("CSecurityAuthenticationServiceWS.ResetPassword",oCReqMsgResetPassword,this.ResetPasswordCompleted,"sLoginName",new ResetPasswordCompletedEventArgs(), prototypeList);
}

LoginQuestionValidCompleted: Function;
LoginQuestionValidAsync(oCReqMsgLoginQuestionValid:CReqMsgLoginQuestionValid ) : void {
  HelperService.Invoke<CReqMsgLoginQuestionValid,CResMsgLoginQuestionValid,LoginQuestionValidCompletedEventArgs>("CSecurityAuthenticationServiceWS.LoginQuestionValid",oCReqMsgLoginQuestionValid,this.LoginQuestionValidCompleted,"sSecretAnswer",new LoginQuestionValidCompletedEventArgs(), prototypeList);
}

LoginNameIsUniqueCompleted: Function;
LoginNameIsUniqueAsync(oCReqMsgLoginNameIsUnique:CReqMsgLoginNameIsUnique ) : void {
  HelperService.Invoke<CReqMsgLoginNameIsUnique,CResMsgLoginNameIsUnique,LoginNameIsUniqueCompletedEventArgs>("CSecurityAuthenticationServiceWS.LoginNameIsUnique",oCReqMsgLoginNameIsUnique,this.LoginNameIsUniqueCompleted,"sLoginName",new LoginNameIsUniqueCompletedEventArgs(), prototypeList);
}

LoginNameIsUniqueByLoginTypeCompleted: Function;
LoginNameIsUniqueByLoginTypeAsync(oCReqMsgLoginNameIsUniqueByLoginType:CReqMsgLoginNameIsUniqueByLoginType ) : void {
  HelperService.Invoke<CReqMsgLoginNameIsUniqueByLoginType,CResMsgLoginNameIsUniqueByLoginType,LoginNameIsUniqueByLoginTypeCompletedEventArgs>("CSecurityAuthenticationServiceWS.LoginNameIsUniqueByLoginType",oCReqMsgLoginNameIsUniqueByLoginType,this.LoginNameIsUniqueByLoginTypeCompleted,"sLoginType",new LoginNameIsUniqueByLoginTypeCompletedEventArgs(), prototypeList);
}

GetLoginQuestionCompleted: Function;
GetLoginQuestionAsync(oCReqMsgGetLoginQuestion:CReqMsgGetLoginQuestion ) : void {
  HelperService.Invoke<CReqMsgGetLoginQuestion,CResMsgGetLoginQuestion,GetLoginQuestionCompletedEventArgs>("CSecurityAuthenticationServiceWS.GetLoginQuestion",oCReqMsgGetLoginQuestion,this.GetLoginQuestionCompleted,"sLoginName",new GetLoginQuestionCompletedEventArgs(), prototypeList);
}

AuthenticateUserwithRoleCompleted: Function;
AuthenticateUserwithRoleAsync(oCReqMsgAuthenticateUserwithRole:CReqMsgAuthenticateUserwithRole ) : void {
  HelperService.Invoke<CReqMsgAuthenticateUserwithRole,CResMsgAuthenticateUserwithRole,AuthenticateUserwithRoleCompletedEventArgs>("CSecurityAuthenticationServiceWS.AuthenticateUserwithRole",oCReqMsgAuthenticateUserwithRole,this.AuthenticateUserwithRoleCompleted,"bIsNative",new AuthenticateUserwithRoleCompletedEventArgs(), prototypeList);
}

IsValidSessionExistsCompleted: Function;
IsValidSessionExistsAsync(oCReqMsgIsValidSessionExists:CReqMsgIsValidSessionExists ) : void {
  HelperService.Invoke<CReqMsgIsValidSessionExists,CResMsgIsValidSessionExists,IsValidSessionExistsCompletedEventArgs>("CSecurityAuthenticationServiceWS.IsValidSessionExists",oCReqMsgIsValidSessionExists,this.IsValidSessionExistsCompleted,"sHostIP",new IsValidSessionExistsCompletedEventArgs(), prototypeList);
}

UpdateSecSessionMICompleted: Function;
UpdateSecSessionMIAsync(oCReqMsgUpdateSecSessionMI:CReqMsgUpdateSecSessionMI ) : void {
  HelperService.Invoke<CReqMsgUpdateSecSessionMI,CResMsgUpdateSecSessionMI,UpdateSecSessionMICompletedEventArgs>("CSecurityAuthenticationServiceWS.UpdateSecSessionMI",oCReqMsgUpdateSecSessionMI,this.UpdateSecSessionMICompleted,"sSessionKey",new UpdateSecSessionMICompletedEventArgs(), prototypeList);
}

IsUserAllowedToAccessCompleted: Function;
IsUserAllowedToAccessAsync(oCReqMsgIsUserAllowedToAccess:CReqMsgIsUserAllowedToAccess ) : void {
  HelperService.Invoke<CReqMsgIsUserAllowedToAccess,CResMsgIsUserAllowedToAccess,IsUserAllowedToAccessCompletedEventArgs>("CSecurityAuthenticationServiceWS.IsUserAllowedToAccess",oCReqMsgIsUserAllowedToAccess,this.IsUserAllowedToAccessCompleted,"OrganisationOID",new IsUserAllowedToAccessCompletedEventArgs(), prototypeList);
}

GetDIContextDataCompleted: Function;
GetDIContextDataAsync(oCReqMsgGetDIContextData:CReqMsgGetDIContextData ) : void {
  HelperService.Invoke<CReqMsgGetDIContextData,CResMsgGetDIContextData,GetDIContextDataCompletedEventArgs>("CSecurityAuthenticationServiceWS.GetDIContextData",oCReqMsgGetDIContextData,this.GetDIContextDataCompleted,"sAppName",new GetDIContextDataCompletedEventArgs(), prototypeList);
}
}

export class ManageUserPINCompletedEventArgs{
 public Result: CResMsgManageUserPIN;
public Error: any;
}
export class ValidateUserPINCompletedEventArgs{
 public Result: CResMsgValidateUserPIN;
public Error: any;
}
export class LockLoginAccountCompletedEventArgs{
 public Result: CResMsgLockLoginAccount;
public Error: any;
}
export class ChangePasswordCompletedEventArgs{
 public Result: CResMsgChangePassword;
public Error: any;
}
export class ChangePasswordByLoginTypeCompletedEventArgs{
 public Result: CResMsgChangePasswordByLoginType;
public Error: any;
}
export class SSOChangePasswordCompletedEventArgs{
 public Result: CResMsgSSOChangePassword;
public Error: any;
}
export class AuthenticateCompletedEventArgs{
 public Result: CResMsgAuthenticate;
public Error: any;
}
export class ADAuthenticateCompletedEventArgs{
 public Result: CResMsgADAuthenticate;
public Error: any;
}
export class ReAuthenticateCompletedEventArgs{
 public Result: CResMsgReAuthenticate;
public Error: any;
}
export class ValidateSessionCompletedEventArgs{
 public Result: CResMsgValidateSession;
public Error: any;
}
export class GetSessionDetailsCompletedEventArgs{
 public Result: CResMsgGetSessionDetails;
public Error: any;
}
export class GetRoleProfilesForLoginCompletedEventArgs{
 public Result: CResMsgGetRoleProfilesForLogin;
public Error: any;
}
export class GetRoleProfileForLoginDetailCompletedEventArgs{
 public Result: CResMsgGetRoleProfileForLoginDetail;
public Error: any;
}
export class GetRoleProfileForLoginDetailWithWACompletedEventArgs{
 public Result: CResMsgGetRoleProfileForLoginDetailWithWA;
public Error: any;
}
export class GetRoleProfileForUserCompletedEventArgs{
 public Result: CResMsgGetRoleProfileForUser;
public Error: any;
}
export class UpdateSessionForRoleProfileCompletedEventArgs{
 public Result: CResMsgUpdateSessionForRoleProfile;
public Error: any;
}
export class UpdateWAOIDForRoleProfileCompletedEventArgs{
 public Result: CResMsgUpdateWAOIDForRoleProfile;
public Error: any;
}
export class UpdateSessionForRoleProfileEntObjCompletedEventArgs{
 public Result: CResMsgUpdateSessionForRoleProfileEntObj;
public Error: any;
}
export class InvalidateSessionWithReasonCompletedEventArgs{
 public Result: CResMsgInvalidateSessionWithReason;
public Error: any;
}
export class InvalidateSessionCompletedEventArgs{
 public Result: CResMsgInvalidateSession;
public Error: any;
}
export class ResetPasswordCompletedEventArgs{
 public Result: CResMsgResetPassword;
public Error: any;
}
export class LoginQuestionValidCompletedEventArgs{
 public Result: CResMsgLoginQuestionValid;
public Error: any;
}
export class LoginNameIsUniqueCompletedEventArgs{
 public Result: CResMsgLoginNameIsUnique;
public Error: any;
}
export class LoginNameIsUniqueByLoginTypeCompletedEventArgs{
 public Result: CResMsgLoginNameIsUniqueByLoginType;
public Error: any;
}
export class GetLoginQuestionCompletedEventArgs{
 public Result: CResMsgGetLoginQuestion;
public Error: any;
}
export class AuthenticateUserwithRoleCompletedEventArgs{
 public Result: CResMsgAuthenticateUserwithRole;
public Error: any;
}
export class IsValidSessionExistsCompletedEventArgs{
 public Result: CResMsgIsValidSessionExists;
public Error: any;
}
export class UpdateSecSessionMICompletedEventArgs{
 public Result: CResMsgUpdateSecSessionMI;
public Error: any;
}
export class IsUserAllowedToAccessCompletedEventArgs{
 public Result: CResMsgIsUserAllowedToAccess;
public Error: any;
}
export class GetDIContextDataCompletedEventArgs{
 public Result: CResMsgGetDIContextData;
public Error: any;
}
export class CReqMsgLockLoginAccount{
sLoginIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgLockLoginAccount{
oContextInformation:CContextInformation;
}
export class CReqMsgChangePassword{
sLoginIDBC:string;
sOldPasswordBC:string;
sNewPasswordBC:string;
oContextInformation:CContextInformation;
objCLoginSecretQuestionBC:ObservableCollection<CLoginSecretQuestions>;
}
export class CLoginSecretQuestions{
SecretQuestionNumber:byte;
SecretQuestionCode:string;
SecretQuestion:string;
SecretAnswer:string;
}
export class CResMsgChangePassword{
bIsPasswordChangeSuccessful:boolean;
objSecurityPolicy:CSecurityPolicy;
oContextInformation:CContextInformation;
}
export class CHiM{
CreatedAt:DateTime;
CreatedBy:number;
ModifiedAt:DateTime;
ModifiedBy:number;
Status:string;
}
export class CSecurityPolicy extends CHiM{
AllowFurtherLogon:string;
CanResetPassword:string;
ChangePwdAtFirstInstance:string;
ConcurrencyActiveTimeLimit:number;
ConcurrencyLimit:number;
DefaultPwdForNewLogin:string;
DigitsInLoginID:number;
InitializedPasswordExpiryDays:number;
IsAllowAutoUserCreation:string;
IsWSRegirstionRequired:string;
LoginIDMaxLength:number;
LoginIDMinLength:number;
MaxAllowedLoginAttempts:number;
MinDigitsInPwd:number;
OID:number;
OwnerOrganisationOID:number;
PasswordExpiryDays:number;
PasswordMaxLength:number;
PasswordMinLength:number;
PasswordNotifyMode:string;
PwdExpiryNotifyFrom:number;
PwdHistoryCount:number;
PwdSpecialCharRequired:number;
SessionIdleTimeOut:number;
SpecialCharList:string;
TemporaryPwdExpiryDays:number;
TokenValidity:number;
}
export class CSecuritySession extends CHiM{
ApplicationName:string;
DataFilterRuleList:string;
HostIP:string;
IncludeChildOrganisation:string;
IsRestrictedByWorkStation:string;
IsSystemUser:string;
LastAccessedDTTM:DateTime;
LocaleOID:number;
LoginName:string;
OID:number;
OrganisationOID:number;
OwnerOrganisationOID:number;
RoleProfileOID:number;
SAMLResponse:string;
ServiceOID:number;
SessionErrorID:number;
SessionIdleTimeOut:number;
SessionKey:string;
TicketID:string;
TokenValidity:number;
UsersOID:number;
UserType:string;
}
export class CRoleprofile extends CHiM{
IncludeChildOrganisation:string;
IsLoginable:string;
IsNative:string;
IsRetired:string;
LevelFlag:string;
OID:number;
OrganisationOID:number;
OwnerOrganisationOID:number;
ProfileCode:string;
ProfileDescription:string;
ProfileName:string;
UIDTYCode:string;
}
export class CAreaOfWork extends CHiM{
Code:string;
Description:string;
Name:string;
OID:number;
OwnerOrganisationOID:number;
}
export class CRole extends CHiM{
CATGYCode:string;
Code:string;
Description:string;
IsAPIOnly:string;
IsCareProviderRole:string;
IsRetired:string;
LevelFlag:string;
Name:string;
OID:number;
OwnerOrganisationOID:number;
RoleType:string;
}
export class CRoleDetailsVO extends CRole{
FNTYPCode:string;
RoleAliasName:string;
}
export class CUsers extends CHiM{
CPTYPOID:string;
CULTCCode:string;
DeceasedDTTM:DateTime;
DISTRCode:string;
DTTMOFBirth:DateTime;
EndDTTM:DateTime;
ETHGRCode:string;
FORENAME:string;
Initials:string;
IsAvailOnHolidays:string;
ISCareprovider:string;
IsDateOfBirthEstimated:string;
IsInterpreter:string;
IsMDDFDisclaimerAcknowledged:string;
IsParticipateInConflictcheck:string;
MainIdentifier:string;
MARRYCode:string;
MFNBatchStatus:string;
NATNLCode:string;
OCCUPCode:string;
OID:number;
OutOfHrs:number;
OwnerOrganisationOID:number;
ParentHOTYPCode:string;
ParentOrganisationCode:string;
PIN:string;
Qualification:string;
RELIGCode:string;
SEXXXCode:string;
SPOKLCode:string;
StartDTTM:DateTime;
SURNAME:string;
TitleCode:string;
UITYPCode:string;
WardAvailablity:string;
}
export class CSpecialty extends CHiM{
CPTIRCode:string;
Description:string;
DIVSNCode:string;
EndDTTM:DateTime;
HasDataFilter:string;
LevelCode:string;
MainIdentifier:string;
Name:string;
OID:number;
OrganisationOID:number;
OwnerOrganisationOID:number;
ParentHOTYPCode:string;
ParentOrganisationCode:string;
ParentSpecialtyOID:number;
SPETYCode:string;
StartDTTM:DateTime;
}
export class CService extends CHiM{
AUGCACode:string;
CareProviderOID:number;
CCUCFCode:string;
CCUFNCode:string;
CSITTCode:string;
Description:string;
EDTYPCode:string;
EndDTTM:DateTime;
FormCode:string;
HasCCPEpisode:string;
HasDataFilter:string;
HorizonValue:number;
INLVLCode:string;
Instruction:string;
IsAllowRetroBooking:string;
IsCapacityCheckRequired:string;
IsCarePoint:string;
IsCaseNotePresent:string;
IsCDSExcluded:string;
IsDataDeficitCheck:string;
IsEnablePlaceOfSafety:string;
IsEprescribingAllowed:string;
IsForwardWaitView:string;
IsLeaveAndDischargeAllowed:string;
IsLocked:string;
IsMajorIncident:string;
IsPatientTracking:string;
IsPorterView:string;
IsQuickDischargeEnabled:string;
ISSchedulable:string;
IsSessionLockPostRestruct:string;
IsWardAttendance:string;
MainIdentifier:string;
Name:string;
OID:number;
OrganisationOID:number;
OwnerOrganisationOID:number;
ParentHOTYPCode:string;
ParentOrganisationCode:string;
ParentServiceOID:number;
PTRLNCode:string;
ReferredToProviderLocationOID:number;
ScheduleInstruction:string;
SERCTCode:string;
SERLNCode:string;
SpecialtyOID:number;
SPTYPCode:string;
StandardAdmitDTTM:DateTime;
StandardDischargeDTTM:DateTime;
StartDTTM:DateTime;
TransferFormRequired:string;
}
export class CTeam extends CHiM{
AssignCaseLoad:string;
CMTOSCode:string;
CMTTPCode:string;
Description:string;
EndDTTM:DateTime;
HasDataFilter:string;
Identifier:string;
IsDeActivated:string;
IsSecureTeam:string;
IsTeamQualifiesForClustering:string;
LevelCode:string;
LocationOID:number;
Name:string;
OID:number;
OrganisationOID:number;
OwnerOrganisationOID:number;
ParentTeamOID:number;
SERCTCode:string;
SERLNCode:string;
ServiceOID:number;
SpecialtyOID:number;
StartDTTM:DateTime;
TMTYPCode:string;
UsersOID:number;
}
export class CJobRole extends CHiM{
Code:string;
Description:string;
IsRetired:string;
LevelFlag:string;
Name:string;
OID:number;
OwnerOrganisationOID:number;
}
export class CWorkingArea extends CHiM{
ActiveFrom:DateTime;
ActiveTo:DateTime;
Description:string;
LevelFlag:string;
Name:string;
OID:number;
OrganisationOID:number;
OwnerOrganisationOID:number;
}
export class CReqMsgChangePasswordByLoginType{
sLoginIDBC:string;
sLoginTypeBC:string;
sOldPasswordBC:string;
sNewPasswordBC:string;
oContextInformation:CContextInformation;
objCLoginSecretQuestionBC:ObservableCollection<CLoginSecretQuestions>;
}
export class CResMsgChangePasswordByLoginType{
bIsPasswordChangeSuccessful:boolean;
objSecurityPolicy:CSecurityPolicy;
oContextInformation:CContextInformation;
}
export class CReqMsgSSOChangePassword{
sLoginIDBC:string;
sNewPasswordBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgSSOChangePassword{
bIsPasswordChangeSuccessful:boolean;
nPasswordMaxLength:number;
oContextInformation:CContextInformation;
}
export class CReqMsgAuthenticate{
sLoginIDBC:string;
sPasswordBC:string;
sHostIPBC:string;
lnLocaleOIDBC:number;
sApplicationNameBC:string;
lnHostIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgAuthenticate{
sessionKey:string;
UsersOID:number;
nSessnIdleTimeOut:number;
nTokenValidity:number;
sLocationName:string;
lnLocationOID:number;
LastAccessedDTTM:DateTime;
nNoOfFailureAttempts:number;
nPasswordExpiryNotify:number;
sIsSystemUser:string;
bIsTemporaryPassword:boolean;
bIsSecretAnswerEntered:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgADAuthenticate{
sLoginIDBC:string;
sHostIPBC:string;
nLocaleOIDBC:number;
sApplicationNameBC:string;
lnHostIdBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgADAuthenticate{
sessionKey:string;
UsersOID:number;
sLocationName:string;
lnLocationOID:number;
LastAccessedDTTM:DateTime;
sIsSystemUser:string;
oContextInformation:CContextInformation;
}
export class CReqMsgReAuthenticate{
sPasswordBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgReAuthenticate{
bIsVaild:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgValidateSession{
sessionTokenBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgValidateSession{
objSecuritySession:CSecuritySession;
oContextInformation:CContextInformation;
}
export class CReqMsgGetSessionDetails{
sessionTokenBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetSessionDetails{
dtmLastAccessedDttm:DateTime;
nNoofFailureAttempts:number;
sForeName:string;
sSurName:string;
sTitleCode:string;
oContextInformation:CContextInformation;
}
export class CReqMsgGetRoleProfilesForLogin{
sLoginIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetRoleProfilesForLogin{
oContextInformation:CContextInformation;
objRoleprofile:ObservableCollection<CRoleprofile>;
}
export class CReqMsgGetRoleProfileForLoginDetail{
sLoginNameBC:string;
bIncludeInActiveBC:boolean;
bIsNativeBC:boolean;
oContextInformation:CContextInformation;
}
export class CResMsgGetRoleProfileForLoginDetail{
oContextInformation:CContextInformation;
objArrayCollection:ObservableCollection<CEnterpriseObjectArray>;
}
export class CEnterpriseObjectArray{
PrevWorkingAreaOID:number;
IncludeWorkingArea:boolean;
JobRole:CJobRole;
IncludeChildOrganisation:string;
IsDisclaimerAck:boolean;
OID:number;
OrganisationOID:number;
OwnerOrganisationOID:number;
ProfileCode:string;
ProfileName:string;
ProfileDescription:string;
OrgName:string;
Status:string;
SessionKey:string;
ActiveFrom:DateTime;
ActiveTo:DateTime;
UserID:number;
IsDefault:string;
ForeName:string;
SurName:string;
TitleCode:string;
OccupType:string;
Gender:string;
UserIdentifier:string;
LocationName:string;
LocationOID:number;
LastAccessedDTTM:DateTime;
NoOfFailureAttempts:number;
PermissionCatName:string;
PerCatOID:number;
IsRetired:string;
Description:string;
Code:string;
IsNative:string;
IsLoginable:string;
CultureCode:string;
SharingGroupOID:number;
ModifiedAt:DateTime;
PrevSelectRoleProfOID:number;
MainWorkingArea:number;
AreaOfWork:ObservableCollection<CAreaOfWork>;
Role:ObservableCollection<CRole>;
RoleDetails:ObservableCollection<CRoleDetailsVO>;
Users:ObservableCollection<CUsers>;
Specialty:ObservableCollection<CSpecialty>;
Service:ObservableCollection<CService>;
Team:ObservableCollection<CTeam>;
WorkingArea:ObservableCollection<CWorkingArea>;
MainSpecialty:ObservableCollection<number>;
}
export class CReqMsgGetRoleProfileForLoginDetailWithWA{
sLoginNameBC:string;
bIncludeInActiveBC:boolean;
bIsNativeBC:boolean;
bIncludeWorkingAreaBC:boolean;
oContextInformation:CContextInformation;
}
export class CResMsgGetRoleProfileForLoginDetailWithWA{
oContextInformation:CContextInformation;
objArrayCollection:ObservableCollection<CEnterpriseObjectArray>;
}
export class CReqMsgGetRoleProfileForUser{
sUserNameBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetRoleProfileForUser{
oContextInformation:CContextInformation;
objRoleprofile:ObservableCollection<CRoleprofile>;
}
export class CReqMsgUpdateSessionForRoleProfile{
sRoleProfileIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgUpdateSessionForRoleProfile{
oContextInformation:CContextInformation;
}
export class CReqMsgUpdateWAOIDForRoleProfile{
lnRoleProfileIDBC:number;
lnWorkingAreaOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgUpdateWAOIDForRoleProfile{
oContextInformation:CContextInformation;
}
export class CReqMsgUpdateSessionForRoleProfileEntObj{
objEnterpriseObjectBC:CEnterpriseObjectArray;
oContextInformation:CContextInformation;
}
export class CResMsgUpdateSessionForRoleProfileEntObj{
oContextInformation:CContextInformation;
}
export class CReqMsgInvalidateSessionWithReason{
enmReasonBC:EnmInvalidateSessionReason;
oContextInformation:CContextInformation;
}
export enum EnmInvalidateSessionReason{
Logout,
SessionIdleTimeout,
TokenValidityExpired,
KillSession,
}
export class CResMsgInvalidateSessionWithReason{
oContextInformation:CContextInformation;
}
export class CReqMsgInvalidateSession{
oContextInformation:CContextInformation;
}
export class CResMsgInvalidateSession{
oContextInformation:CContextInformation;
}
export class CReqMsgResetPassword{
sLoginNameBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgResetPassword{
sPassword:string;
iPasswordNotifyMode:number;
oContextInformation:CContextInformation;
}
export class CReqMsgLoginQuestionValid{
sLoginNameBC:string;
sSecretQuestionBC:string;
sSecretAnswerBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgLoginQuestionValid{
bIsLoginValid:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgLoginNameIsUnique{
sLoginNameBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgLoginNameIsUnique{
oContextInformation:CContextInformation;
}
export class CReqMsgLoginNameIsUniqueByLoginType{
sLoginNameBC:string;
sLoginTypeBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgLoginNameIsUniqueByLoginType{
oContextInformation:CContextInformation;
}
export class CReqMsgGetLoginQuestion{
sLoginNameBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetLoginQuestion{
sSecretQuestion:string;
oContextInformation:CContextInformation;
}
export class CReqMsgAuthenticateUserwithRole{
sLoginIDBC:string;
sPasswordBC:string;
sHostIPBC:string;
lnLocaleOIDBC:number;
sApplicationNameBC:string;
sRoleProfileCodeBC:string;
lnHostIdBC:number;
bIsNativeBC:boolean;
oContextInformation:CContextInformation;
}
export class CResMsgAuthenticateUserwithRole{
sessionKey:string;
UsersOID:number;
nSessnIdleTimeOut:number;
nTokenValidity:number;
sLocationName:string;
lnLocationOID:number;
LastAccessedDTTM:DateTime;
nNoOfFailureAttempts:number;
nPasswordExpiryNotify:number;
oContextInformation:CContextInformation;
}
export class CReqMsgIsValidSessionExists{
sLoginNameBC:string;
sAppNameBC:string;
sHostIPBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgIsValidSessionExists{
bIsSessionValid:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgUpdateSecSessionMI{
sLoginNameBC:string;
sAppNameBC:string;
sHostIPBC:string;
sSessionKeyBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgUpdateSecSessionMI{
oContextInformation:CContextInformation;
}
export class CReqMsgIsUserAllowedToAccess{
UserOIDBC:number;
RoleProfileOIDBC:number;
LoginNameBC:string;
OrganisationOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgIsUserAllowedToAccess{
bUserAllowedToAccess:boolean;
bShowMsg:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgGetDIContextData{
sSecuirtySessionBC:string;
sHostIPBC:string;
sAppNameBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetDIContextData{
sUserContextData:string;
sDIContextData:string;
dttmCreatedAt:DateTime;
oContextInformation:CContextInformation;
}
export class CReqMsgManageUserPIN{
lnUserOIDBC:number;
sPinBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgManageUserPIN{
oContextInformation:CContextInformation;
}
export class CReqMsgValidateUserPIN{
lnUserOIDBC:number;
sPinBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgValidateUserPIN{
bValid:boolean;
oContextInformation:CContextInformation;
}

 const prototypeList = {"CSecurityAuthenticationServiceWS.ManageUserPIN":CResMsgManageUserPIN.prototype ,
"CSecurityAuthenticationServiceWS.ValidateUserPIN":CResMsgValidateUserPIN.prototype ,
"CSecurityAuthenticationServiceWS.LockLoginAccount":CResMsgLockLoginAccount.prototype ,
"CSecurityAuthenticationServiceWS.ChangePassword":CResMsgChangePassword.prototype ,
"CSecurityAuthenticationServiceWS.ChangePasswordByLoginType":CResMsgChangePasswordByLoginType.prototype ,
"CSecurityAuthenticationServiceWS.SSOChangePassword":CResMsgSSOChangePassword.prototype ,
"CSecurityAuthenticationServiceWS.Authenticate":CResMsgAuthenticate.prototype ,
"CSecurityAuthenticationServiceWS.ADAuthenticate":CResMsgADAuthenticate.prototype ,
"CSecurityAuthenticationServiceWS.ReAuthenticate":CResMsgReAuthenticate.prototype ,
"CSecurityAuthenticationServiceWS.ValidateSession":CResMsgValidateSession.prototype ,
"CSecurityAuthenticationServiceWS.GetSessionDetails":CResMsgGetSessionDetails.prototype ,
"CSecurityAuthenticationServiceWS.GetRoleProfilesForLogin":CResMsgGetRoleProfilesForLogin.prototype ,
"CSecurityAuthenticationServiceWS.GetRoleProfileForLoginDetail":CResMsgGetRoleProfileForLoginDetail.prototype ,
"CSecurityAuthenticationServiceWS.GetRoleProfileForLoginDetailWithWA":CResMsgGetRoleProfileForLoginDetailWithWA.prototype ,
"CSecurityAuthenticationServiceWS.GetRoleProfileForUser":CResMsgGetRoleProfileForUser.prototype ,
"CSecurityAuthenticationServiceWS.UpdateSessionForRoleProfile":CResMsgUpdateSessionForRoleProfile.prototype ,
"CSecurityAuthenticationServiceWS.UpdateWAOIDForRoleProfile":CResMsgUpdateWAOIDForRoleProfile.prototype ,
"CSecurityAuthenticationServiceWS.UpdateSessionForRoleProfileEntObj":CResMsgUpdateSessionForRoleProfileEntObj.prototype ,
"CSecurityAuthenticationServiceWS.InvalidateSessionWithReason":CResMsgInvalidateSessionWithReason.prototype ,
"CSecurityAuthenticationServiceWS.InvalidateSession":CResMsgInvalidateSession.prototype ,
"CSecurityAuthenticationServiceWS.ResetPassword":CResMsgResetPassword.prototype ,
"CSecurityAuthenticationServiceWS.LoginQuestionValid":CResMsgLoginQuestionValid.prototype ,
"CSecurityAuthenticationServiceWS.LoginNameIsUnique":CResMsgLoginNameIsUnique.prototype ,
"CSecurityAuthenticationServiceWS.LoginNameIsUniqueByLoginType":CResMsgLoginNameIsUniqueByLoginType.prototype ,
"CSecurityAuthenticationServiceWS.GetLoginQuestion":CResMsgGetLoginQuestion.prototype ,
"CSecurityAuthenticationServiceWS.AuthenticateUserwithRole":CResMsgAuthenticateUserwithRole.prototype ,
"CSecurityAuthenticationServiceWS.IsValidSessionExists":CResMsgIsValidSessionExists.prototype ,
"CSecurityAuthenticationServiceWS.UpdateSecSessionMI":CResMsgUpdateSecSessionMI.prototype ,
"CSecurityAuthenticationServiceWS.IsUserAllowedToAccess":CResMsgIsUserAllowedToAccess.prototype ,
"CSecurityAuthenticationServiceWS.GetDIContextData":CResMsgGetDIContextData.prototype ,

CReqMsgLockLoginAccount : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgLockLoginAccount : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgChangePassword : { 
oContextInformation:CContextInformation.prototype ,
objCLoginSecretQuestionBC:CLoginSecretQuestions.prototype ,

 },CResMsgChangePassword : { 
objSecurityPolicy:CSecurityPolicy.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgChangePasswordByLoginType : { 
oContextInformation:CContextInformation.prototype ,
objCLoginSecretQuestionBC:CLoginSecretQuestions.prototype ,

 },CResMsgChangePasswordByLoginType : { 
objSecurityPolicy:CSecurityPolicy.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgSSOChangePassword : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgSSOChangePassword : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgAuthenticate : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgAuthenticate : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgADAuthenticate : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgADAuthenticate : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgReAuthenticate : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgReAuthenticate : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgValidateSession : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgValidateSession : { 
objSecuritySession:CSecuritySession.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetSessionDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetSessionDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetRoleProfilesForLogin : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetRoleProfilesForLogin : { 
oContextInformation:CContextInformation.prototype ,
objRoleprofile:CRoleprofile.prototype ,

 },CReqMsgGetRoleProfileForLoginDetail : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetRoleProfileForLoginDetail : { 
oContextInformation:CContextInformation.prototype ,
objArrayCollection:CEnterpriseObjectArray.prototype ,

 },CEnterpriseObjectArray : { 
JobRole:CJobRole.prototype ,
AreaOfWork:CAreaOfWork.prototype ,
Role:CRole.prototype ,
RoleDetails:CRoleDetailsVO.prototype ,
Users:CUsers.prototype ,
Specialty:CSpecialty.prototype ,
Service:CService.prototype ,
Team:CTeam.prototype ,
WorkingArea:CWorkingArea.prototype ,

 },CReqMsgGetRoleProfileForLoginDetailWithWA : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetRoleProfileForLoginDetailWithWA : { 
oContextInformation:CContextInformation.prototype ,
objArrayCollection:CEnterpriseObjectArray.prototype ,

 },CReqMsgGetRoleProfileForUser : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetRoleProfileForUser : { 
oContextInformation:CContextInformation.prototype ,
objRoleprofile:CRoleprofile.prototype ,

 },CReqMsgUpdateSessionForRoleProfile : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgUpdateSessionForRoleProfile : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgUpdateWAOIDForRoleProfile : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgUpdateWAOIDForRoleProfile : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgUpdateSessionForRoleProfileEntObj : { 
objEnterpriseObjectBC:CEnterpriseObjectArray.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgUpdateSessionForRoleProfileEntObj : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgInvalidateSessionWithReason : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgInvalidateSessionWithReason : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgInvalidateSession : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgInvalidateSession : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgResetPassword : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgResetPassword : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgLoginQuestionValid : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgLoginQuestionValid : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgLoginNameIsUnique : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgLoginNameIsUnique : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgLoginNameIsUniqueByLoginType : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgLoginNameIsUniqueByLoginType : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetLoginQuestion : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetLoginQuestion : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgAuthenticateUserwithRole : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgAuthenticateUserwithRole : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgIsValidSessionExists : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgIsValidSessionExists : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgUpdateSecSessionMI : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgUpdateSecSessionMI : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgIsUserAllowedToAccess : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgIsUserAllowedToAccess : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetDIContextData : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetDIContextData : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgManageUserPIN : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgManageUserPIN : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgValidateUserPIN : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgValidateUserPIN : { 
oContextInformation:CContextInformation.prototype ,

 },CContextInformation : { 
Current:CContextInformation.prototype ,

 },
 }
 
const charPropertyLookup = [
'RoleType',
'MFNBatchStatus',
'TransferFormRequired',]
 