import { int64, int16, int32, uInt16, uInt32, uInt64, byte, long, double, decimal, DelegateArgs, CContextInformation, CLZOObject} from "epma-platform/models";
import { ObservableCollection } from "../models/observable-collection";
import DateTime from "../services/datetime.service";
import { HelperService } from "./helper.service";
export class CTeamManagementWSSoapClient{

GetUsrTeamByRoleProfileCompleted: Function;
GetUsrTeamByRoleProfileAsync(oCReqMsgGetUsrTeamByRoleProfile:CReqMsgGetUsrTeamByRoleProfile ) : void {
  HelperService.Invoke<CReqMsgGetUsrTeamByRoleProfile,CResMsgGetUsrTeamByRoleProfile,GetUsrTeamByRoleProfileCompletedEventArgs>("CTeamManagementWS.GetUsrTeamByRoleProfile",oCReqMsgGetUsrTeamByRoleProfile,this.GetUsrTeamByRoleProfileCompleted,"lnRoleProfileOID",new GetUsrTeamByRoleProfileCompletedEventArgs(), prototypeList);
}

GetTMIsUsedCompleted: Function;
GetTMIsUsedAsync(oCReqMsgGetTMIsUsed:CReqMsgGetTMIsUsed ) : void {
  HelperService.Invoke<CReqMsgGetTMIsUsed,CResMsgGetTMIsUsed,GetTMIsUsedCompletedEventArgs>("CTeamManagementWS.GetTMIsUsed",oCReqMsgGetTMIsUsed,this.GetTMIsUsedCompleted,"lnTeamOID",new GetTMIsUsedCompletedEventArgs(), prototypeList);
}

ChkTeamMemberCLCompleted: Function;
ChkTeamMemberCLAsync(oCReqMsgChkTeamMemberCL:CReqMsgChkTeamMemberCL ) : void {
  HelperService.Invoke<CReqMsgChkTeamMemberCL,CResMsgChkTeamMemberCL,ChkTeamMemberCLCompletedEventArgs>("CTeamManagementWS.ChkTeamMemberCL",oCReqMsgChkTeamMemberCL,this.ChkTeamMemberCLCompleted,"dtMemberEndDate",new ChkTeamMemberCLCompletedEventArgs(), prototypeList);
}

GetMemberDtlCompleted: Function;
GetMemberDtlAsync(oCReqMsgGetMemberDtl:CReqMsgGetMemberDtl ) : void {
  HelperService.Invoke<CReqMsgGetMemberDtl,CResMsgGetMemberDtl,GetMemberDtlCompletedEventArgs>("CTeamManagementWS.GetMemberDtl",oCReqMsgGetMemberDtl,this.GetMemberDtlCompleted,"IsFromCaseload",new GetMemberDtlCompletedEventArgs(), prototypeList);
}

GetTeamMembersDtlCompleted: Function;
GetTeamMembersDtlAsync(oCReqMsgGetTeamMembersDtl:CReqMsgGetTeamMembersDtl ) : void {
  HelperService.Invoke<CReqMsgGetTeamMembersDtl,CResMsgGetTeamMembersDtl,GetTeamMembersDtlCompletedEventArgs>("CTeamManagementWS.GetTeamMembersDtl",oCReqMsgGetTeamMembersDtl,this.GetTeamMembersDtlCompleted,"bInclInActive",new GetTeamMembersDtlCompletedEventArgs(), prototypeList);
}

ChkIsCAMHSTeamCompleted: Function;
ChkIsCAMHSTeamAsync(oCReqMsgChkIsCAMHSTeam:CReqMsgChkIsCAMHSTeam ) : void {
  HelperService.Invoke<CReqMsgChkIsCAMHSTeam,CResMsgChkIsCAMHSTeam,ChkIsCAMHSTeamCompletedEventArgs>("CTeamManagementWS.ChkIsCAMHSTeam",oCReqMsgChkIsCAMHSTeam,this.ChkIsCAMHSTeamCompleted,"lnTeamOID",new ChkIsCAMHSTeamCompletedEventArgs(), prototypeList);
}

ChkIsCAMHSTeamMultipleCompleted: Function;
ChkIsCAMHSTeamMultipleAsync(oCReqMsgChkIsCAMHSTeamMultiple:CReqMsgChkIsCAMHSTeamMultiple ) : void {
  HelperService.Invoke<CReqMsgChkIsCAMHSTeamMultiple,CResMsgChkIsCAMHSTeamMultiple,ChkIsCAMHSTeamMultipleCompletedEventArgs>("CTeamManagementWS.ChkIsCAMHSTeamMultiple",oCReqMsgChkIsCAMHSTeamMultiple,this.ChkIsCAMHSTeamMultipleCompleted,"sTeamOIDs",new ChkIsCAMHSTeamMultipleCompletedEventArgs(), prototypeList);
}

ChkIsCPActiveOnActvityAlocateCompleted: Function;
ChkIsCPActiveOnActvityAlocateAsync(oCReqMsgChkIsCPActiveOnActvityAlocate:CReqMsgChkIsCPActiveOnActvityAlocate ) : void {
  HelperService.Invoke<CReqMsgChkIsCPActiveOnActvityAlocate,CResMsgChkIsCPActiveOnActvityAlocate,ChkIsCPActiveOnActvityAlocateCompletedEventArgs>("CTeamManagementWS.ChkIsCPActiveOnActvityAlocate",oCReqMsgChkIsCPActiveOnActvityAlocate,this.ChkIsCPActiveOnActvityAlocateCompleted,"dtActivityAllocation",new ChkIsCPActiveOnActvityAlocateCompletedEventArgs(), prototypeList);
}

GetTeamOIDByUserOidCompleted: Function;
GetTeamOIDByUserOidAsync(oCReqMsgGetTeamOIDByUserOid:CReqMsgGetTeamOIDByUserOid ) : void {
  HelperService.Invoke<CReqMsgGetTeamOIDByUserOid,CResMsgGetTeamOIDByUserOid,GetTeamOIDByUserOidCompletedEventArgs>("CTeamManagementWS.GetTeamOIDByUserOid",oCReqMsgGetTeamOIDByUserOid,this.GetTeamOIDByUserOidCompleted,"CurrDttm",new GetTeamOIDByUserOidCompletedEventArgs(), prototypeList);
}

GetTeamsInfoForTheatreCompleted: Function;
GetTeamsInfoForTheatreAsync(oCReqMsgGetTeamsInfoForTheatre:CReqMsgGetTeamsInfoForTheatre ) : void {
  HelperService.Invoke<CReqMsgGetTeamsInfoForTheatre,CResMsgGetTeamsInfoForTheatre,GetTeamsInfoForTheatreCompletedEventArgs>("CTeamManagementWS.GetTeamsInfoForTheatre",oCReqMsgGetTeamsInfoForTheatre,this.GetTeamsInfoForTheatreCompleted,"objReqGetTeamsInfoForTheatre",new GetTeamsInfoForTheatreCompletedEventArgs(), prototypeList);
}

GetTeamMembersBySurnameCompleted: Function;
GetTeamMembersBySurnameAsync(oCReqMsgGetTeamMembersBySurname:CReqMsgGetTeamMembersBySurname ) : void {
  HelperService.Invoke<CReqMsgGetTeamMembersBySurname,CResMsgGetTeamMembersBySurname,GetTeamMembersBySurnameCompletedEventArgs>("CTeamManagementWS.GetTeamMembersBySurname",oCReqMsgGetTeamMembersBySurname,this.GetTeamMembersBySurnameCompleted,"sSearchText",new GetTeamMembersBySurnameCompletedEventArgs(), prototypeList);
}

CreateTeamCompleted: Function;
CreateTeamAsync(oCReqMsgCreateTeam:CReqMsgCreateTeam ) : void {
  HelperService.Invoke<CReqMsgCreateTeam,CResMsgCreateTeam,CreateTeamCompletedEventArgs>("CTeamManagementWS.CreateTeam",oCReqMsgCreateTeam,this.CreateTeamCompleted,"oDataFilter",new CreateTeamCompletedEventArgs(), prototypeList);
}

ModifyTeamCompleted: Function;
ModifyTeamAsync(oCReqMsgModifyTeam:CReqMsgModifyTeam ) : void {
  HelperService.Invoke<CReqMsgModifyTeam,CResMsgModifyTeam,ModifyTeamCompletedEventArgs>("CTeamManagementWS.ModifyTeam",oCReqMsgModifyTeam,this.ModifyTeamCompleted,"oDataFilter",new ModifyTeamCompletedEventArgs(), prototypeList);
}

DeactivateTeamCompleted: Function;
DeactivateTeamAsync(oCReqMsgDeactivateTeam:CReqMsgDeactivateTeam ) : void {
  HelperService.Invoke<CReqMsgDeactivateTeam,CResMsgDeactivateTeam,DeactivateTeamCompletedEventArgs>("CTeamManagementWS.DeactivateTeam",oCReqMsgDeactivateTeam,this.DeactivateTeamCompleted,"oTeamStatusHistory",new DeactivateTeamCompletedEventArgs(), prototypeList);
}

CancelTeamDeactivationCompleted: Function;
CancelTeamDeactivationAsync(oCReqMsgCancelTeamDeactivation:CReqMsgCancelTeamDeactivation ) : void {
  HelperService.Invoke<CReqMsgCancelTeamDeactivation,CResMsgCancelTeamDeactivation,CancelTeamDeactivationCompletedEventArgs>("CTeamManagementWS.CancelTeamDeactivation",oCReqMsgCancelTeamDeactivation,this.CancelTeamDeactivationCompleted,"oTeamStatusHistory",new CancelTeamDeactivationCompletedEventArgs(), prototypeList);
}

ReinstateTeamCompleted: Function;
ReinstateTeamAsync(oCReqMsgReinstateTeam:CReqMsgReinstateTeam ) : void {
  HelperService.Invoke<CReqMsgReinstateTeam,CResMsgReinstateTeam,ReinstateTeamCompletedEventArgs>("CTeamManagementWS.ReinstateTeam",oCReqMsgReinstateTeam,this.ReinstateTeamCompleted,"oTeamStatusHistory",new ReinstateTeamCompletedEventArgs(), prototypeList);
}

VoidTeamCompleted: Function;
VoidTeamAsync(oCReqMsgVoidTeam:CReqMsgVoidTeam ) : void {
  HelperService.Invoke<CReqMsgVoidTeam,CResMsgVoidTeam,VoidTeamCompletedEventArgs>("CTeamManagementWS.VoidTeam",oCReqMsgVoidTeam,this.VoidTeamCompleted,"oTeamStatusHistory",new VoidTeamCompletedEventArgs(), prototypeList);
}

SearchTeamCompleted: Function;
SearchTeamAsync(oCReqMsgSearchTeam:CReqMsgSearchTeam ) : void {
  HelperService.Invoke<CReqMsgSearchTeam,CResMsgSearchTeam,SearchTeamCompletedEventArgs>("CTeamManagementWS.SearchTeam",oCReqMsgSearchTeam,this.SearchTeamCompleted,"oTeamSearch",new SearchTeamCompletedEventArgs(), prototypeList);
}

GetTeamDetailsCompleted: Function;
GetTeamDetailsAsync(oCReqMsgGetTeamDetails:CReqMsgGetTeamDetails ) : void {
  HelperService.Invoke<CReqMsgGetTeamDetails,CResMsgGetTeamDetails,GetTeamDetailsCompletedEventArgs>("CTeamManagementWS.GetTeamDetails",oCReqMsgGetTeamDetails,this.GetTeamDetailsCompleted,"FromModify",new GetTeamDetailsCompletedEventArgs(), prototypeList);
}

GetChildTeamsCompleted: Function;
GetChildTeamsAsync(oCReqMsgGetChildTeams:CReqMsgGetChildTeams ) : void {
  HelperService.Invoke<CReqMsgGetChildTeams,CResMsgGetChildTeams,GetChildTeamsCompletedEventArgs>("CTeamManagementWS.GetChildTeams",oCReqMsgGetChildTeams,this.GetChildTeamsCompleted,"lParentTeamOID",new GetChildTeamsCompletedEventArgs(), prototypeList);
}

GetTeamStatusHistoryCompleted: Function;
GetTeamStatusHistoryAsync(oCReqMsgGetTeamStatusHistory:CReqMsgGetTeamStatusHistory ) : void {
  HelperService.Invoke<CReqMsgGetTeamStatusHistory,CResMsgGetTeamStatusHistory,GetTeamStatusHistoryCompletedEventArgs>("CTeamManagementWS.GetTeamStatusHistory",oCReqMsgGetTeamStatusHistory,this.GetTeamStatusHistoryCompleted,"lTeamOID",new GetTeamStatusHistoryCompletedEventArgs(), prototypeList);
}

IsTeamInUseCompleted: Function;
IsTeamInUseAsync(oCReqMsgIsTeamInUse:CReqMsgIsTeamInUse ) : void {
  HelperService.Invoke<CReqMsgIsTeamInUse,CResMsgIsTeamInUse,IsTeamInUseCompletedEventArgs>("CTeamManagementWS.IsTeamInUse",oCReqMsgIsTeamInUse,this.IsTeamInUseCompleted,"lTeamOid",new IsTeamInUseCompletedEventArgs(), prototypeList);
}

GetTeamMembersCompleted: Function;
GetTeamMembersAsync(oCReqMsgGetTeamMembers:CReqMsgGetTeamMembers ) : void {
  HelperService.Invoke<CReqMsgGetTeamMembers,CResMsgGetTeamMembers,GetTeamMembersCompletedEventArgs>("CTeamManagementWS.GetTeamMembers",oCReqMsgGetTeamMembers,this.GetTeamMembersCompleted,"dtAllocationdate",new GetTeamMembersCompletedEventArgs(), prototypeList);
}

UpdateTeamMembersCompleted: Function;
UpdateTeamMembersAsync(oCReqMsgUpdateTeamMembers:CReqMsgUpdateTeamMembers ) : void {
  HelperService.Invoke<CReqMsgUpdateTeamMembers,CResMsgUpdateTeamMembers,UpdateTeamMembersCompletedEventArgs>("CTeamManagementWS.UpdateTeamMembers",oCReqMsgUpdateTeamMembers,this.UpdateTeamMembersCompleted,"oTeamMembers",new UpdateTeamMembersCompletedEventArgs(), prototypeList);
}

IsParentCyclicCompleted: Function;
IsParentCyclicAsync(oCReqMsgIsParentCyclic:CReqMsgIsParentCyclic ) : void {
  HelperService.Invoke<CReqMsgIsParentCyclic,CResMsgIsParentCyclic,IsParentCyclicCompletedEventArgs>("CTeamManagementWS.IsParentCyclic",oCReqMsgIsParentCyclic,this.IsParentCyclicCompleted,"lChildOID",new IsParentCyclicCompletedEventArgs(), prototypeList);
}

GetUserTeamsCompleted: Function;
GetUserTeamsAsync(oCReqMsgGetUserTeams:CReqMsgGetUserTeams ) : void {
  HelperService.Invoke<CReqMsgGetUserTeams,CResMsgGetUserTeams,GetUserTeamsCompletedEventArgs>("CTeamManagementWS.GetUserTeams",oCReqMsgGetUserTeams,this.GetUserTeamsCompleted,"bActiveMem",new GetUserTeamsCompletedEventArgs(), prototypeList);
}

GetAllTeamsCompleted: Function;
GetAllTeamsAsync(oCReqMsgGetAllTeams:CReqMsgGetAllTeams ) : void {
  HelperService.Invoke<CReqMsgGetAllTeams,CResMsgGetAllTeams,GetAllTeamsCompletedEventArgs>("CTeamManagementWS.GetAllTeams",oCReqMsgGetAllTeams,this.GetAllTeamsCompleted,"oTeamSearch",new GetAllTeamsCompletedEventArgs(), prototypeList);
}

GetTeamMembersByRoleCompleted: Function;
GetTeamMembersByRoleAsync(oCReqMsgGetTeamMembersByRole:CReqMsgGetTeamMembersByRole ) : void {
  HelperService.Invoke<CReqMsgGetTeamMembersByRole,CResMsgGetTeamMembersByRole,GetTeamMembersByRoleCompletedEventArgs>("CTeamManagementWS.GetTeamMembersByRole",oCReqMsgGetTeamMembersByRole,this.GetTeamMembersByRoleCompleted,"lRoleOID",new GetTeamMembersByRoleCompletedEventArgs(), prototypeList);
}

ManageConstraintsCompleted: Function;
ManageConstraintsAsync(oCReqMsgManageConstraints:CReqMsgManageConstraints ) : void {
  HelperService.Invoke<CReqMsgManageConstraints,CResMsgManageConstraints,ManageConstraintsCompletedEventArgs>("CTeamManagementWS.ManageConstraints",oCReqMsgManageConstraints,this.ManageConstraintsCompleted,"oTeamConstraints",new ManageConstraintsCompletedEventArgs(), prototypeList);
}

GetTMDataFilterStatusCompleted: Function;
GetTMDataFilterStatusAsync(oCReqMsgGetTMDataFilterStatus:CReqMsgGetTMDataFilterStatus ) : void {
  HelperService.Invoke<CReqMsgGetTMDataFilterStatus,CResMsgGetTMDataFilterStatus,GetTMDataFilterStatusCompletedEventArgs>("CTeamManagementWS.GetTMDataFilterStatus",oCReqMsgGetTMDataFilterStatus,this.GetTMDataFilterStatusCompleted,"lnTeamOID",new GetTMDataFilterStatusCompletedEventArgs(), prototypeList);
}

GetParentTeamsByOrgCompleted: Function;
GetParentTeamsByOrgAsync(oCReqMsgGetParentTeamsByOrg:CReqMsgGetParentTeamsByOrg ) : void {
  HelperService.Invoke<CReqMsgGetParentTeamsByOrg,CResMsgGetParentTeamsByOrg,GetParentTeamsByOrgCompletedEventArgs>("CTeamManagementWS.GetParentTeamsByOrg",oCReqMsgGetParentTeamsByOrg,this.GetParentTeamsByOrgCompleted,"lOrgOId",new GetParentTeamsByOrgCompletedEventArgs(), prototypeList);
}

GetAllChildTeamsCompleted: Function;
GetAllChildTeamsAsync(oCReqMsgGetAllChildTeams:CReqMsgGetAllChildTeams ) : void {
  HelperService.Invoke<CReqMsgGetAllChildTeams,CResMsgGetAllChildTeams,GetAllChildTeamsCompletedEventArgs>("CTeamManagementWS.GetAllChildTeams",oCReqMsgGetAllChildTeams,this.GetAllChildTeamsCompleted,"lParentTeamOId",new GetAllChildTeamsCompletedEventArgs(), prototypeList);
}

GetTeamMemberHistoryDetailsCompleted: Function;
GetTeamMemberHistoryDetailsAsync(oCReqMsgGetTeamMemberHistoryDetails:CReqMsgGetTeamMemberHistoryDetails ) : void {
  HelperService.Invoke<CReqMsgGetTeamMemberHistoryDetails,CResMsgGetTeamMemberHistoryDetails,GetTeamMemberHistoryDetailsCompletedEventArgs>("CTeamManagementWS.GetTeamMemberHistoryDetails",oCReqMsgGetTeamMemberHistoryDetails,this.GetTeamMemberHistoryDetailsCompleted,"sTeamMemberOIDs",new GetTeamMemberHistoryDetailsCompletedEventArgs(), prototypeList);
}

RequestTeamAccessCompleted: Function;
RequestTeamAccessAsync(oCReqMsgRequestTeamAccess:CReqMsgRequestTeamAccess ) : void {
  HelperService.Invoke<CReqMsgRequestTeamAccess,CResMsgRequestTeamAccess,RequestTeamAccessCompletedEventArgs>("CTeamManagementWS.RequestTeamAccess",oCReqMsgRequestTeamAccess,this.RequestTeamAccessCompleted,"oTeamMember",new RequestTeamAccessCompletedEventArgs(), prototypeList);
}

GetUserTmDtlsCompleted: Function;
GetUserTmDtlsAsync(oCReqMsgGetUserTmDtls:CReqMsgGetUserTmDtls ) : void {
  HelperService.Invoke<CReqMsgGetUserTmDtls,CResMsgGetUserTmDtls,GetUserTmDtlsCompletedEventArgs>("CTeamManagementWS.GetUserTmDtls",oCReqMsgGetUserTmDtls,this.GetUserTmDtlsCompleted,"lnUserOID",new GetUserTmDtlsCompletedEventArgs(), prototypeList);
}

ChkDuplicateTMNameCompleted: Function;
ChkDuplicateTMNameAsync(oCReqMsgChkDuplicateTMName:CReqMsgChkDuplicateTMName ) : void {
  HelperService.Invoke<CReqMsgChkDuplicateTMName,CResMsgChkDuplicateTMName,ChkDuplicateTMNameCompletedEventArgs>("CTeamManagementWS.ChkDuplicateTMName",oCReqMsgChkDuplicateTMName,this.ChkDuplicateTMNameCompleted,"lnOrganisationOID",new ChkDuplicateTMNameCompletedEventArgs(), prototypeList);
}

GetTeamClinicalUnitByOIDCompleted: Function;
GetTeamClinicalUnitByOIDAsync(oCReqMsgGetTeamClinicalUnitByOID:CReqMsgGetTeamClinicalUnitByOID ) : void {
  HelperService.Invoke<CReqMsgGetTeamClinicalUnitByOID,CResMsgGetTeamClinicalUnitByOID,GetTeamClinicalUnitByOIDCompletedEventArgs>("CTeamManagementWS.GetTeamClinicalUnitByOID",oCReqMsgGetTeamClinicalUnitByOID,this.GetTeamClinicalUnitByOIDCompleted,"lTeamOID",new GetTeamClinicalUnitByOIDCompletedEventArgs(), prototypeList);
}

GetTeamForCPORGOIDCompleted: Function;
GetTeamForCPORGOIDAsync(oCReqMsgGetTeamForCPORGOID:CReqMsgGetTeamForCPORGOID ) : void {
  HelperService.Invoke<CReqMsgGetTeamForCPORGOID,CResMsgGetTeamForCPORGOID,GetTeamForCPORGOIDCompletedEventArgs>("CTeamManagementWS.GetTeamForCPORGOID",oCReqMsgGetTeamForCPORGOID,this.GetTeamForCPORGOIDCompleted,"bInclInactive",new GetTeamForCPORGOIDCompletedEventArgs(), prototypeList);
}

GetTeamNameCompleted: Function;
GetTeamNameAsync(oCReqMsgGetTeamName:CReqMsgGetTeamName ) : void {
  HelperService.Invoke<CReqMsgGetTeamName,CResMsgGetTeamName,GetTeamNameCompletedEventArgs>("CTeamManagementWS.GetTeamName",oCReqMsgGetTeamName,this.GetTeamNameCompleted,"sTeamOID",new GetTeamNameCompletedEventArgs(), prototypeList);
}
}

export class GetUsrTeamByRoleProfileCompletedEventArgs{
 public Result: CResMsgGetUsrTeamByRoleProfile;
public Error: any;
}
export class GetTMIsUsedCompletedEventArgs{
 public Result: CResMsgGetTMIsUsed;
public Error: any;
}
export class ChkTeamMemberCLCompletedEventArgs{
 public Result: CResMsgChkTeamMemberCL;
public Error: any;
}
export class GetMemberDtlCompletedEventArgs{
 public Result: CResMsgGetMemberDtl;
public Error: any;
}
export class GetTeamMembersDtlCompletedEventArgs{
 public Result: CResMsgGetTeamMembersDtl;
public Error: any;
}
export class ChkIsCAMHSTeamCompletedEventArgs{
 public Result: CResMsgChkIsCAMHSTeam;
public Error: any;
}
export class ChkIsCAMHSTeamMultipleCompletedEventArgs{
 public Result: CResMsgChkIsCAMHSTeamMultiple;
public Error: any;
}
export class ChkIsCPActiveOnActvityAlocateCompletedEventArgs{
 public Result: CResMsgChkIsCPActiveOnActvityAlocate;
public Error: any;
}
export class GetTeamOIDByUserOidCompletedEventArgs{
 public Result: CResMsgGetTeamOIDByUserOid;
public Error: any;
}
export class GetTeamsInfoForTheatreCompletedEventArgs{
 public Result: CResMsgGetTeamsInfoForTheatre;
public Error: any;
}
export class GetTeamMembersBySurnameCompletedEventArgs{
 public Result: CResMsgGetTeamMembersBySurname;
public Error: any;
}
export class CreateTeamCompletedEventArgs{
 public Result: CResMsgCreateTeam;
public Error: any;
}
export class ModifyTeamCompletedEventArgs{
 public Result: CResMsgModifyTeam;
public Error: any;
}
export class DeactivateTeamCompletedEventArgs{
 public Result: CResMsgDeactivateTeam;
public Error: any;
}
export class CancelTeamDeactivationCompletedEventArgs{
 public Result: CResMsgCancelTeamDeactivation;
public Error: any;
}
export class ReinstateTeamCompletedEventArgs{
 public Result: CResMsgReinstateTeam;
public Error: any;
}
export class VoidTeamCompletedEventArgs{
 public Result: CResMsgVoidTeam;
public Error: any;
}
export class SearchTeamCompletedEventArgs{
 public Result: CResMsgSearchTeam;
public Error: any;
}
export class GetTeamDetailsCompletedEventArgs{
 public Result: CResMsgGetTeamDetails;
public Error: any;
}
export class GetChildTeamsCompletedEventArgs{
 public Result: CResMsgGetChildTeams;
public Error: any;
}
export class GetTeamStatusHistoryCompletedEventArgs{
 public Result: CResMsgGetTeamStatusHistory;
public Error: any;
}
export class IsTeamInUseCompletedEventArgs{
 public Result: CResMsgIsTeamInUse;
public Error: any;
}
export class GetTeamMembersCompletedEventArgs{
 public Result: CResMsgGetTeamMembers;
public Error: any;
}
export class UpdateTeamMembersCompletedEventArgs{
 public Result: CResMsgUpdateTeamMembers;
public Error: any;
}
export class IsParentCyclicCompletedEventArgs{
 public Result: CResMsgIsParentCyclic;
public Error: any;
}
export class GetUserTeamsCompletedEventArgs{
 public Result: CResMsgGetUserTeams;
public Error: any;
}
export class GetAllTeamsCompletedEventArgs{
 public Result: CResMsgGetAllTeams;
public Error: any;
}
export class GetTeamMembersByRoleCompletedEventArgs{
 public Result: CResMsgGetTeamMembersByRole;
public Error: any;
}
export class ManageConstraintsCompletedEventArgs{
 public Result: CResMsgManageConstraints;
public Error: any;
}
export class GetTMDataFilterStatusCompletedEventArgs{
 public Result: CResMsgGetTMDataFilterStatus;
public Error: any;
}
export class GetParentTeamsByOrgCompletedEventArgs{
 public Result: CResMsgGetParentTeamsByOrg;
public Error: any;
}
export class GetAllChildTeamsCompletedEventArgs{
 public Result: CResMsgGetAllChildTeams;
public Error: any;
}
export class GetTeamMemberHistoryDetailsCompletedEventArgs{
 public Result: CResMsgGetTeamMemberHistoryDetails;
public Error: any;
}
export class RequestTeamAccessCompletedEventArgs{
 public Result: CResMsgRequestTeamAccess;
public Error: any;
}
export class GetUserTmDtlsCompletedEventArgs{
 public Result: CResMsgGetUserTmDtls;
public Error: any;
}
export class ChkDuplicateTMNameCompletedEventArgs{
 public Result: CResMsgChkDuplicateTMName;
public Error: any;
}
export class GetTeamClinicalUnitByOIDCompletedEventArgs{
 public Result: CResMsgGetTeamClinicalUnitByOID;
public Error: any;
}
export class GetTeamForCPORGOIDCompletedEventArgs{
 public Result: CResMsgGetTeamForCPORGOID;
public Error: any;
}
export class GetTeamNameCompletedEventArgs{
 public Result: CResMsgGetTeamName;
public Error: any;
}
export class CReqMsgCreateTeam{
oTeamDetailBC:TeamDetail;
oDataFilterBC:DataFilter;
oContextInformation:CContextInformation;
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
export class HOTeams extends Team{
OrganisationName:string;
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
export class ParentService extends CLZOObject{
OId:number;
Type:string;
Name:string;
MainIDType:string;
MainID:string;
ActiveFrom:DateTime;
ActiveTo:DateTime;
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
export class HOCareService extends CareService{
}
export class TOCDisplayDetails extends CLZOObject{
Key:string;
Value:string;
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
export class FloorPlans extends CLZOObject{
FloorOId:number;
FloorName:string;
FloorStatus:string;
FloorIsUsed:string;
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
export class DelayGain extends CLZOObject{
SourceStatusCode:string;
TargetStatusCode:string;
OID:number;
Mandatory:string;
ThresholdDuration:number;
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
export class TransportMode extends CLZOObject{
TransportModeTxt:string;
OID:number;
TransportModeCC:string;
Status:string;
}
export class TheatreCrtical extends CLZOObject{
OID:number;
ServiceOID:number;
CriticalCareType:string;
CriticalCareValue:string;
AuditData:AuditInfo;
OwnerOrganisationOID:number;
}
export class AssociatedServicePoint extends CLZOObject{
OID:number;
ServiceOID:number;
AssociatedServiceOID:number;
AssociatedServiceName:string;
AuditData:AuditInfo;
OwnerOrganisationOID:number;
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
export class ServiceProfile extends CLZOObject{
ServiceProfileOId:number;
ServiceOId:number;
BRPAGCode:string;
INCLICode:string;
AGEGRCode:string;
PhysicalCapacity:number;
SexCode:string;
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
export class ServicePurpose extends CLZOObject{
PurposeCodeTxt:string;
PurposeOId:number;
PurposeCode:string;
Status:string;
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
export class LocationIdentifier extends ID{
LocationOID:number;
oAuditInfo:AuditInfo;
}
export class HOIdentifier extends ID{
HOUniqueOID:string;
oAuditInfo:AuditInfo;
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
export class TeamStatusHistory extends StatusHistory{
OId:number;
DeactivationType:string;
PerformedBy:ObjectInfo;
PerformedLocation:ObjectInfo;
PerformedOrganisation:ObjectInfo;
AuditData:AuditInfo;
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
export class HOService extends ServicePoint{
Type:string;
OrganisationName:string;
}
export class UserMobileNumber extends CLZOObject{
UsersOID:string;
MobileNumber:string;
UserName:string;
oAuditInfo:AuditInfo;
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
export class HOAddress extends Address{
HOIdentifier:number;
GLocation:string;
oAuditInfo:AuditInfo;
HOContact:ObservableCollection<Contact>;
}
export class HOInsurer extends CLZOObject{
HOOid:string;
InsurerOid:string;
Insurertype:string;
Insurerrange:string;
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
export class TeamClinicalUnit extends Specialty{
}
export class ConstraintData extends CLZOObject{
OID:number;
Identity:string;
ValidationType:string;
ValidationMessage:string;
IncludeUOM:string;
IsValid:ObservableCollection<boolean>;
ActiveDates:ObservableCollection<ConstraintActiveDates>;
}
export class ConstraintActiveDates extends CLZOObject{
ActiveFrom:DateTime;
ActiveTo:DateTime;
}
export class TeamConstraints extends ConstraintData{
OId:number;
TeamOId:number;
ConstraintOId:number;
WrkGrpCode:string;
oAuditInfo:AuditInfo;
status:string;
}
export class RequestTeamAccess extends CLZOObject{
TeamOID:number;
TeamMemberOID:number;
TMMemberActiveFrom:DateTime;
TMMemberActiveTo:DateTime;
IsApproved:string;
}
export class TeamMemberDetail extends CLZOObject{
UserOID:number;
Surname:string;
Forename:string;
TeamOID:number;
TeamMemberOID:number;
IsTeamLead:boolean;
AssignFrom:DateTime;
AssignTo:DateTime;
TitleCode:string;
}
export class TeamBasic extends CLZOObject{
TeamOID:number;
TeamName:string;
}
export class CResMsgCreateTeam{
oTeamOID:Object;
oContextInformation:CContextInformation;
}
export class CReqMsgModifyTeam{
oTeamDetailBC:TeamDetail;
oDataFilterBC:DataFilter;
oContextInformation:CContextInformation;
}
export class CResMsgModifyTeam{
oContextInformation:CContextInformation;
}
export class CReqMsgDeactivateTeam{
oTeamStatusHistoryBC:TeamStatusHistory;
oContextInformation:CContextInformation;
}
export class CResMsgDeactivateTeam{
oContextInformation:CContextInformation;
}
export class CReqMsgCancelTeamDeactivation{
oTeamStatusHistoryBC:TeamStatusHistory;
oContextInformation:CContextInformation;
}
export class CResMsgCancelTeamDeactivation{
oContextInformation:CContextInformation;
}
export class CReqMsgReinstateTeam{
oTeamStatusHistoryBC:TeamStatusHistory;
oContextInformation:CContextInformation;
}
export class CResMsgReinstateTeam{
oContextInformation:CContextInformation;
}
export class CReqMsgVoidTeam{
oTeamStatusHistoryBC:TeamStatusHistory;
oContextInformation:CContextInformation;
}
export class CResMsgVoidTeam{
oContextInformation:CContextInformation;
}
export class CReqMsgSearchTeam{
oTeamSearchBC:TeamDetail;
oContextInformation:CContextInformation;
}
export class CResMsgSearchTeam{
IsRecordsAvailable:boolean;
oContextInformation:CContextInformation;
oTeamDetails:ObservableCollection<TeamDetail>;
}
export class CReqMsgGetTeamDetails{
lTeamOIDBC:number;
ActiveUserBC:string;
FromModifyBC:boolean;
oContextInformation:CContextInformation;
}
export class CResMsgGetTeamDetails{
oTeamDetail:TeamDetail;
oDataFilter:DataFilter;
oContextInformation:CContextInformation;
}
export class CReqMsgGetChildTeams{
lParentTeamOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetChildTeams{
oContextInformation:CContextInformation;
oChildTeams:ObservableCollection<TeamDetail>;
}
export class CReqMsgGetTeamStatusHistory{
lTeamOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetTeamStatusHistory{
oContextInformation:CContextInformation;
oTeamStatusHistory:ObservableCollection<TeamStatusHistory>;
}
export class CReqMsgIsTeamInUse{
lTeamOidBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgIsTeamInUse{
bHasActiveChilds:boolean;
bHasSchedule:boolean;
bHasChildTeam:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgGetTeamMembers{
lTeamOIDBC:number;
bActiveMembersOnlyBC:boolean;
IsFromCaseloadBC:boolean;
dtAllocationdateBC:DateTime;
oContextInformation:CContextInformation;
}
export class CResMsgGetTeamMembers{
oContextInformation:CContextInformation;
oTeamMembers:ObservableCollection<TeamMember>;
}
export class CReqMsgUpdateTeamMembers{
lTeamOIDBC:number;
oContextInformation:CContextInformation;
oTeamMembersBC:ObservableCollection<TeamMember>;
}
export class CResMsgUpdateTeamMembers{
TeamCount:number;
dtModified:DateTime;
oContextInformation:CContextInformation;
}
export class CReqMsgIsParentCyclic{
lParentOIDBC:number;
lChildOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgIsParentCyclic{
bStatus:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgGetUserTeams{
lUserOIDBC:number;
bActiveMemBC:boolean;
oContextInformation:CContextInformation;
}
export class CResMsgGetUserTeams{
oContextInformation:CContextInformation;
oTeam:ObservableCollection<Team>;
}
export class CReqMsgGetAllTeams{
oTeamSearchBC:TeamDetail;
oContextInformation:CContextInformation;
}
export class CResMsgGetAllTeams{
oContextInformation:CContextInformation;
oTeamDetails:ObservableCollection<TeamDetail>;
}
export class CReqMsgGetTeamMembersByRole{
lTeamOIDBC:number;
lRoleOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetTeamMembersByRole{
oContextInformation:CContextInformation;
oTeamMember:ObservableCollection<TeamMember>;
}
export class CReqMsgManageConstraints{
oTeamConstraintsBC:TeamConstraints;
oContextInformation:CContextInformation;
}
export class CResMsgManageConstraints{
oContextInformation:CContextInformation;
}
export class CReqMsgGetTMDataFilterStatus{
lnTeamOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetTMDataFilterStatus{
strDFStatus:string;
oContextInformation:CContextInformation;
}
export class CReqMsgGetParentTeamsByOrg{
lOrgOIdBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetParentTeamsByOrg{
oContextInformation:CContextInformation;
oTeamDetails:ObservableCollection<TeamDetail>;
}
export class CReqMsgGetAllChildTeams{
lParentTeamOIdBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetAllChildTeams{
oContextInformation:CContextInformation;
oTeamDetails:ObservableCollection<TeamDetail>;
}
export class CReqMsgGetTeamMemberHistoryDetails{
sTeamMemberOIDsBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetTeamMemberHistoryDetails{
oContextInformation:CContextInformation;
oTeamMember:ObservableCollection<TeamMember>;
}
export class CReqMsgRequestTeamAccess{
oTeamMemberBC:TeamMember;
oContextInformation:CContextInformation;
oReqTeamAccessBC:ObservableCollection<RequestTeamAccess>;
}
export class CResMsgRequestTeamAccess{
oContextInformation:CContextInformation;
}
export class CReqMsgGetUserTmDtls{
lnUserOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetUserTmDtls{
oContextInformation:CContextInformation;
oTeamDetails:ObservableCollection<TeamDetail>;
}
export class CReqMsgChkDuplicateTMName{
lnTeamOIDBC:number;
sTeamNameBC:string;
lnOrganisationOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgChkDuplicateTMName{
bIsDuplicate:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgGetTeamClinicalUnitByOID{
lTeamOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetTeamClinicalUnitByOID{
oContextInformation:CContextInformation;
oTMClinicalunits:ObservableCollection<TeamClinicalUnit>;
}
export class CReqMsgGetTeamForCPORGOID{
lnCPOIDBC:number;
lnOrgOIDBC:number;
bInclInactiveBC:boolean;
oContextInformation:CContextInformation;
}
export class CResMsgGetTeamForCPORGOID{
oContextInformation:CContextInformation;
oTMdetails:ObservableCollection<TeamDetail>;
}
export class CReqMsgGetTeamName{
sTeamOIDBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetTeamName{
oContextInformation:CContextInformation;
oTeam:ObservableCollection<Team>;
}
export class CReqMsgGetUsrTeamByRoleProfile{
lnUserOIDBC:number;
lnRoleProfileOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetUsrTeamByRoleProfile{
oContextInformation:CContextInformation;
objTeamDetails:ObservableCollection<Team>;
}
export class CReqMsgGetTMIsUsed{
lnTeamOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgGetTMIsUsed{
bIsUsed:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgChkTeamMemberCL{
lnTeamOIDBC:number;
lnCPOIDBC:number;
dtMemberEndDateBC:DateTime;
oContextInformation:CContextInformation;
}
export class CResMsgChkTeamMemberCL{
lnCaseloadOID:number;
oContextInformation:CContextInformation;
}
export class CReqMsgGetMemberDtl{
lnTeamOIDBC:number;
bInclInActiveBC:boolean;
IsFromCaseloadBC:boolean;
oContextInformation:CContextInformation;
}
export class CResMsgGetMemberDtl{
oContextInformation:CContextInformation;
objUser:ObservableCollection<User>;
}
export class CReqMsgGetTeamMembersDtl{
sTeamOIDsBC:string;
bInclInActiveBC:boolean;
oContextInformation:CContextInformation;
}
export class CResMsgGetTeamMembersDtl{
oContextInformation:CContextInformation;
objMemberDetail:ObservableCollection<TeamMemberDetail>;
}
export class CReqMsgChkIsCAMHSTeam{
lnTeamOIDBC:number;
oContextInformation:CContextInformation;
}
export class CResMsgChkIsCAMHSTeam{
bIsCAMHSTeam:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgChkIsCAMHSTeamMultiple{
sTeamOIDsBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgChkIsCAMHSTeamMultiple{
sCAMHSTeams:string;
oContextInformation:CContextInformation;
}
export class CReqMsgChkIsCPActiveOnActvityAlocate{
lnTeamOIDBC:number;
lnCPOIDBC:number;
dtActivityAllocationBC:DateTime;
oContextInformation:CContextInformation;
}
export class CResMsgChkIsCPActiveOnActvityAlocate{
IsCPActive:boolean;
oContextInformation:CContextInformation;
}
export class CReqMsgGetTeamOIDByUserOid{
sUserOIDBC:string;
CurrDttmBC:DateTime;
oContextInformation:CContextInformation;
}
export class CResMsgGetTeamOIDByUserOid{
oContextInformation:CContextInformation;
TeamBasicDetails:ObservableCollection<TeamBasic>;
}
export class CReqMsgGetTeamsInfoForTheatre{
oContextInformation:CContextInformation;
}
export class CResMsgGetTeamsInfoForTheatre{
oContextInformation:CContextInformation;
oTeamDetails:ObservableCollection<TeamBasic>;
}
export class CReqMsgGetTeamMembersBySurname{
lTeamOIDBC:number;
IsDefaultBC:string;
TmFilterBC:string;
sSearchTextBC:string;
oContextInformation:CContextInformation;
}
export class CResMsgGetTeamMembersBySurname{
TeamCount:number;
nRecordsCount:number;
oContextInformation:CContextInformation;
oTeamMembers:ObservableCollection<TeamMember>;
}
export class MarshalByRefObject{
}

 const prototypeList = {"CTeamManagementWS.GetUsrTeamByRoleProfile":CResMsgGetUsrTeamByRoleProfile.prototype ,
"CTeamManagementWS.GetTMIsUsed":CResMsgGetTMIsUsed.prototype ,
"CTeamManagementWS.ChkTeamMemberCL":CResMsgChkTeamMemberCL.prototype ,
"CTeamManagementWS.GetMemberDtl":CResMsgGetMemberDtl.prototype ,
"CTeamManagementWS.GetTeamMembersDtl":CResMsgGetTeamMembersDtl.prototype ,
"CTeamManagementWS.ChkIsCAMHSTeam":CResMsgChkIsCAMHSTeam.prototype ,
"CTeamManagementWS.ChkIsCAMHSTeamMultiple":CResMsgChkIsCAMHSTeamMultiple.prototype ,
"CTeamManagementWS.ChkIsCPActiveOnActvityAlocate":CResMsgChkIsCPActiveOnActvityAlocate.prototype ,
"CTeamManagementWS.GetTeamOIDByUserOid":CResMsgGetTeamOIDByUserOid.prototype ,
"CTeamManagementWS.GetTeamsInfoForTheatre":CResMsgGetTeamsInfoForTheatre.prototype ,
"CTeamManagementWS.GetTeamMembersBySurname":CResMsgGetTeamMembersBySurname.prototype ,
"CTeamManagementWS.CreateTeam":CResMsgCreateTeam.prototype ,
"CTeamManagementWS.ModifyTeam":CResMsgModifyTeam.prototype ,
"CTeamManagementWS.DeactivateTeam":CResMsgDeactivateTeam.prototype ,
"CTeamManagementWS.CancelTeamDeactivation":CResMsgCancelTeamDeactivation.prototype ,
"CTeamManagementWS.ReinstateTeam":CResMsgReinstateTeam.prototype ,
"CTeamManagementWS.VoidTeam":CResMsgVoidTeam.prototype ,
"CTeamManagementWS.SearchTeam":CResMsgSearchTeam.prototype ,
"CTeamManagementWS.GetTeamDetails":CResMsgGetTeamDetails.prototype ,
"CTeamManagementWS.GetChildTeams":CResMsgGetChildTeams.prototype ,
"CTeamManagementWS.GetTeamStatusHistory":CResMsgGetTeamStatusHistory.prototype ,
"CTeamManagementWS.IsTeamInUse":CResMsgIsTeamInUse.prototype ,
"CTeamManagementWS.GetTeamMembers":CResMsgGetTeamMembers.prototype ,
"CTeamManagementWS.UpdateTeamMembers":CResMsgUpdateTeamMembers.prototype ,
"CTeamManagementWS.IsParentCyclic":CResMsgIsParentCyclic.prototype ,
"CTeamManagementWS.GetUserTeams":CResMsgGetUserTeams.prototype ,
"CTeamManagementWS.GetAllTeams":CResMsgGetAllTeams.prototype ,
"CTeamManagementWS.GetTeamMembersByRole":CResMsgGetTeamMembersByRole.prototype ,
"CTeamManagementWS.ManageConstraints":CResMsgManageConstraints.prototype ,
"CTeamManagementWS.GetTMDataFilterStatus":CResMsgGetTMDataFilterStatus.prototype ,
"CTeamManagementWS.GetParentTeamsByOrg":CResMsgGetParentTeamsByOrg.prototype ,
"CTeamManagementWS.GetAllChildTeams":CResMsgGetAllChildTeams.prototype ,
"CTeamManagementWS.GetTeamMemberHistoryDetails":CResMsgGetTeamMemberHistoryDetails.prototype ,
"CTeamManagementWS.RequestTeamAccess":CResMsgRequestTeamAccess.prototype ,
"CTeamManagementWS.GetUserTmDtls":CResMsgGetUserTmDtls.prototype ,
"CTeamManagementWS.ChkDuplicateTMName":CResMsgChkDuplicateTMName.prototype ,
"CTeamManagementWS.GetTeamClinicalUnitByOID":CResMsgGetTeamClinicalUnitByOID.prototype ,
"CTeamManagementWS.GetTeamForCPORGOID":CResMsgGetTeamForCPORGOID.prototype ,
"CTeamManagementWS.GetTeamName":CResMsgGetTeamName.prototype ,

CReqMsgCreateTeam : { 
oTeamDetailBC:TeamDetail.prototype ,
oDataFilterBC:DataFilter.prototype ,
oContextInformation:CContextInformation.prototype ,

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

 },User : { 
oAuditInfo:AuditInfo.prototype ,

 },TeamMember : { 
RoleProfile:ObjectInfo.prototype ,
Role:ObjectInfo.prototype ,
AccessControlWorkgroup:ObjectInfo.prototype ,
MembershipWorkgroup:ObjectInfo.prototype ,
TeamMemberEnterpriseWorkgroup:EnterpriseWorkgroup.prototype ,
RoleProfileCode:ObjectInfo.prototype ,

 },DataFilter : { 
DataFilterDetails:DataFilterDetails.prototype ,

 },CareService : { 
oEntWorkGroup:EnterpriseWorkgroup.prototype ,
oParentCareService:ParentService.prototype ,
oAuditInfo:AuditInfo.prototype ,

 },EnterpriseWorkgroup : { 
oWorkgroupUser:LRWorkgroupUser.prototype ,

 },LRWorkgroupUser : { 
UserDetails:UserLoggedIn.prototype ,

 },TOCBaseObject : { 
oTOCCustmAttribute:TOCBaseObject.prototype ,
DisplayValue:TOCDisplayDetails.prototype ,

 },TOCSectionDetails : { 
oTOCAttribute:TOCBaseObject.prototype ,

 },TransferOfCareConfigInfo : { 
oTOCSectionDetails:TOCSectionDetails.prototype ,

 },TheatreCrtical : { 
AuditData:AuditInfo.prototype ,

 },AssociatedServicePoint : { 
AuditData:AuditInfo.prototype ,

 },SubServicePoint : { 
oAuditInfo:AuditInfo.prototype ,

 },ServicePoint : { 
oServicePointType:SubServicePoint.prototype ,
oServiceProfile:ServiceProfile.prototype ,
oServicePntdetail:ServicePointDetail.prototype ,
oServiceLetters:ServiceLetters.prototype ,
oServiceForms:ServiceForms.prototype ,
oServicePurpose:ServicePurpose.prototype ,
oEventStatusOptions:EventStatusOption.prototype ,

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

 },Location : { 
oAuditInfo:AuditInfo.prototype ,
oLocationFeatures:LocationFeature.prototype ,
oLocationIdentifier:LocationIdentifier.prototype ,
oLocationStatushistory:StatusHistory.prototype ,
oMaskLocInfo:LocationMask.prototype ,
oLocationTracks:LocationTracking.prototype ,

 },LocationIdentifier : { 
oAuditInfo:AuditInfo.prototype ,

 },HOIdentifier : { 
oAuditInfo:AuditInfo.prototype ,

 },TeamStatusHistory : { 
PerformedBy:ObjectInfo.prototype ,
PerformedLocation:ObjectInfo.prototype ,
PerformedOrganisation:ObjectInfo.prototype ,
AuditData:AuditInfo.prototype ,

 },LocationMask : { 
MaskInfo:MaskInfo.prototype ,

 },HealthOrganisation : { 
oParentOrganisation:ParentOrganisation.prototype ,
oAuditInfo:AuditInfo.prototype ,

 },ParentOrganisation : { 
oAuditInfo:AuditInfo.prototype ,

 },UserMobileNumber : { 
oAuditInfo:AuditInfo.prototype ,

 },Contact : { 
oAuditInfo:AuditInfo.prototype ,
oUserMobileNumber:UserMobileNumber.prototype ,

 },ContractActivity : { 
oAssociatedEntities:AssociatedEntities.prototype ,
GroupByResult:GroupResult.prototype ,

 },Address : { 
Contract:ContractActivity.prototype ,

 },UserAddress : { 
UserContact:Contact.prototype ,

 },HOAddress : { 
oAuditInfo:AuditInfo.prototype ,
HOContact:Contact.prototype ,

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

 },ConstraintData : { 
ActiveDates:ConstraintActiveDates.prototype ,

 },TeamConstraints : { 
oAuditInfo:AuditInfo.prototype ,

 },CResMsgCreateTeam : { 
oTeamOID:Object.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgModifyTeam : { 
oTeamDetailBC:TeamDetail.prototype ,
oDataFilterBC:DataFilter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgModifyTeam : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgDeactivateTeam : { 
oTeamStatusHistoryBC:TeamStatusHistory.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgDeactivateTeam : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgCancelTeamDeactivation : { 
oTeamStatusHistoryBC:TeamStatusHistory.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgCancelTeamDeactivation : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgReinstateTeam : { 
oTeamStatusHistoryBC:TeamStatusHistory.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgReinstateTeam : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgVoidTeam : { 
oTeamStatusHistoryBC:TeamStatusHistory.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgVoidTeam : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgSearchTeam : { 
oTeamSearchBC:TeamDetail.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgSearchTeam : { 
oContextInformation:CContextInformation.prototype ,
oTeamDetails:TeamDetail.prototype ,

 },CReqMsgGetTeamDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetTeamDetails : { 
oTeamDetail:TeamDetail.prototype ,
oDataFilter:DataFilter.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetChildTeams : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetChildTeams : { 
oContextInformation:CContextInformation.prototype ,
oChildTeams:TeamDetail.prototype ,

 },CReqMsgGetTeamStatusHistory : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetTeamStatusHistory : { 
oContextInformation:CContextInformation.prototype ,
oTeamStatusHistory:TeamStatusHistory.prototype ,

 },CReqMsgIsTeamInUse : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgIsTeamInUse : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetTeamMembers : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetTeamMembers : { 
oContextInformation:CContextInformation.prototype ,
oTeamMembers:TeamMember.prototype ,

 },CReqMsgUpdateTeamMembers : { 
oContextInformation:CContextInformation.prototype ,
oTeamMembersBC:TeamMember.prototype ,

 },CResMsgUpdateTeamMembers : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgIsParentCyclic : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgIsParentCyclic : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetUserTeams : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetUserTeams : { 
oContextInformation:CContextInformation.prototype ,
oTeam:Team.prototype ,

 },CReqMsgGetAllTeams : { 
oTeamSearchBC:TeamDetail.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAllTeams : { 
oContextInformation:CContextInformation.prototype ,
oTeamDetails:TeamDetail.prototype ,

 },CReqMsgGetTeamMembersByRole : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetTeamMembersByRole : { 
oContextInformation:CContextInformation.prototype ,
oTeamMember:TeamMember.prototype ,

 },CReqMsgManageConstraints : { 
oTeamConstraintsBC:TeamConstraints.prototype ,
oContextInformation:CContextInformation.prototype ,

 },CResMsgManageConstraints : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetTMDataFilterStatus : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetTMDataFilterStatus : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetParentTeamsByOrg : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetParentTeamsByOrg : { 
oContextInformation:CContextInformation.prototype ,
oTeamDetails:TeamDetail.prototype ,

 },CReqMsgGetAllChildTeams : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetAllChildTeams : { 
oContextInformation:CContextInformation.prototype ,
oTeamDetails:TeamDetail.prototype ,

 },CReqMsgGetTeamMemberHistoryDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetTeamMemberHistoryDetails : { 
oContextInformation:CContextInformation.prototype ,
oTeamMember:TeamMember.prototype ,

 },CReqMsgRequestTeamAccess : { 
oTeamMemberBC:TeamMember.prototype ,
oContextInformation:CContextInformation.prototype ,
oReqTeamAccessBC:RequestTeamAccess.prototype ,

 },CResMsgRequestTeamAccess : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetUserTmDtls : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetUserTmDtls : { 
oContextInformation:CContextInformation.prototype ,
oTeamDetails:TeamDetail.prototype ,

 },CReqMsgChkDuplicateTMName : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgChkDuplicateTMName : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetTeamClinicalUnitByOID : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetTeamClinicalUnitByOID : { 
oContextInformation:CContextInformation.prototype ,
oTMClinicalunits:TeamClinicalUnit.prototype ,

 },CReqMsgGetTeamForCPORGOID : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetTeamForCPORGOID : { 
oContextInformation:CContextInformation.prototype ,
oTMdetails:TeamDetail.prototype ,

 },CReqMsgGetTeamName : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetTeamName : { 
oContextInformation:CContextInformation.prototype ,
oTeam:Team.prototype ,

 },CReqMsgGetUsrTeamByRoleProfile : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetUsrTeamByRoleProfile : { 
oContextInformation:CContextInformation.prototype ,
objTeamDetails:Team.prototype ,

 },CReqMsgGetTMIsUsed : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetTMIsUsed : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgChkTeamMemberCL : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgChkTeamMemberCL : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetMemberDtl : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetMemberDtl : { 
oContextInformation:CContextInformation.prototype ,
objUser:User.prototype ,

 },CReqMsgGetTeamMembersDtl : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetTeamMembersDtl : { 
oContextInformation:CContextInformation.prototype ,
objMemberDetail:TeamMemberDetail.prototype ,

 },CReqMsgChkIsCAMHSTeam : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgChkIsCAMHSTeam : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgChkIsCAMHSTeamMultiple : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgChkIsCAMHSTeamMultiple : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgChkIsCPActiveOnActvityAlocate : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgChkIsCPActiveOnActvityAlocate : { 
oContextInformation:CContextInformation.prototype ,

 },CReqMsgGetTeamOIDByUserOid : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetTeamOIDByUserOid : { 
oContextInformation:CContextInformation.prototype ,
TeamBasicDetails:TeamBasic.prototype ,

 },CReqMsgGetTeamsInfoForTheatre : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetTeamsInfoForTheatre : { 
oContextInformation:CContextInformation.prototype ,
oTeamDetails:TeamBasic.prototype ,

 },CReqMsgGetTeamMembersBySurname : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetTeamMembersBySurname : { 
oContextInformation:CContextInformation.prototype ,
oTeamMembers:TeamMember.prototype ,

 },CContextInformation : { 
Current:CContextInformation.prototype ,

 },
 }
 
const charPropertyLookup = [
'MFNBatchStatus',
'HasItemFilter',
'IsVisible',
'IsSectionTypeChangeable',
'IsWardAttendance','IsWardInUse','TransferFormRequired',
'MigrationFlag',
'IsLegalEntity',
'IsEmailRegWithEncryptService',
'IsAssignmentLocked',
'IsClearAssignment','IsModified','IsLocked',
'IsEncounterUpdate',
'IsDefaultBC','TmFilterBC',]
 