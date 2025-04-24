import { ObservableCollection,CContextInformation, CLZOObject } from "epma-platform/models";
import { HelperService } from "./helper.service";

export class ManageSecurityWSSoapClient {

GetSecurityGroupDetailsCompleted: Function;
GetSecurityGroupDetailsAsync(oCReqMsgGetSecurityGroupDetails:CReqMsgGetSecurityGroupDetails ) : void {
  HelperService.Invoke<CReqMsgGetSecurityGroupDetails,CResMsgGetSecurityGroupDetails,GetSecurityGroupDetailsCompletedEventArgs>("ManageSecurityGroupWS.GetSecurityGroupDetails",oCReqMsgGetSecurityGroupDetails,this.GetSecurityGroupDetailsCompleted,"sIdentifyingType",new GetSecurityGroupDetailsCompletedEventArgs(), prototypeList);
}
}

export class GetSecurityGroupDetailsCompletedEventArgs {
  public Result: CResMsgGetSecurityGroupDetails;
  public Error: any;
}
export class CReqMsgGetSecurityGroupDetails {
  lnIdentifyingOIDBC: number;
  sIdentifyingTypeBC: string;
  oContextInformation: CContextInformation;
}
export class CResMsgGetSecurityGroupDetails {
  objSecurityGroupDetail: SecurityGroupDetail;
  oContextInformation: CContextInformation;
}

export class SecurityGroupDetail extends CLZOObject {
  oSecurityGroup: SecurityGroup;
  arrSecurityGroup: ObservableCollection<SecurityGroup>;
}
export class EntObjSecurityGroup extends CLZOObject {
  EntObjSecurityGroupOID: number;
  SecurityGroupOID: number;
  IdentifyingOID: number;
  IdentifyingType: string;
  Status: string;
  OwnerOrganisationOID: number;
  LevelCode: string;
  LevelFlag: string;
  ModifiedBy: number;
}
export class SecurityGroup extends EntObjSecurityGroup {
  Code: string;
  Description: string;
}


 const prototypeList = {"ManageSecurityGroupWS.GetSecurityGroupDetails":CResMsgGetSecurityGroupDetails.prototype ,

CReqMsgGetSecurityGroupDetails : { 
oContextInformation:CContextInformation.prototype ,

 },CResMsgGetSecurityGroupDetails : { 
objSecurityGroupDetail:SecurityGroupDetail.prototype ,
oContextInformation:CContextInformation.prototype ,

 },SecurityGroupDetail : { 
oSecurityGroup:SecurityGroup.prototype ,
arrSecurityGroup:SecurityGroup.prototype ,

 },CContextInformation : { 
Current:CContextInformation.prototype ,

 },
 }
 
const charPropertyLookup = []
 