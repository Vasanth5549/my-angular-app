import { ConceptProperty } from "./ConceptProperty";
import { int } from "./eppma-common-types";
import { List } from "./list";

export interface EventContextModel{
    contextCode:ContextType,
    name:string,
    context:string,
    source:string
} 
export enum ContextType {
   user = 1,
   patient = 2,
   security = 3,
   organization = 4,
   CAParameters = 5,
   event = 6,
   close = 7,
   activityConsClick = 8
}
export interface ContextEventargs{
    Request : string, 
    Result : object
}
export class CListItem{
    DisplayText : string ="";
    IsDefault:boolean;
    IsSelected:boolean;
    Level?:int=0;
    Tag?: any;
    TextWrapping?: TextWrapping;
    ToolTip?:string;
    Value?:string="";
    ConceptProperties?: List<ConceptProperty>;
    PropertyChanged?:Function;
    ToString(){
        return this.DisplayText;
    }
}
export interface RTEEventargs{
    Request : string, 
    Result : any
}
export interface termModel{
    key : string,
    value : any;
}
export const ValueDomain = {
    ConflictsReason: 'ConflictsReason',
    BHVTY: 'BHVTY',
    TreatmentToContinue : 'TreatmentToContinue',
    Duration : 'Duration',
    DispensingInstruction : 'DispensingInstruction',
    SupplyInstruction : 'SupplyInstruction',
    Supplystatus : 'Supplystatus',
    MedDoseFrm : "ValueDomain.MedDoseFrm",
    MeddurationUOM : "MEDDRSN"
};

export const Constants = {
    ERROR_IN_Unhandled : 6000,
    ERROR_IN_OnResultGetAccessDetail : 6001,
    ERROR_IN_OnWizardExit : 6002,
    ERROR_IN_OnGetURL : 6003,
    ERROR_IN_GetAccessDetail : 6004,
    ERROR_IN_OnInitialize : 6005,
    ERROR_IN_SetSuspended : 6006,
    ERROR_IN_SetDiscard : 6007,
    ERROR_IN_ResumeTask : 6008,
    ERROR_IN_OnResumeTaskResult : 6009,
    ERROR_IN_GetTimezoneInfo : 6010,
    ERROR_IN_OnGetTaskInfoCompleted : 6011,
    Warning_IN_OnGetTaskInfoCompleted : 6012,
    ERROR_IN_DeferTask : 6013,
    ERROR_IN_RenderBanner : 6014,
    ERROR_IN_EndInvoke : 6015,
    ERROR_IN_GetProfile : 6016,
    ERROR_IN_GetProfileWithLevel : 6017,
    ERROR_IN_GetInstasnce : 6018,
    ERROR_IN_LzoWizard_Loaded : 6019,
    ERROR_IN_SLSECURITYACCESS: 6020,
    ERROR_IN_SLMULTICALLHELPER : 6021,
    ApplicationName : "LorArcSilverlightFramework",
    ERROR_IN_GetProfiles : 6022,
    ERROR_IN_AppActivityKeyDown : 6023,
    ServiceDirectoryPath : "Services"
}
export enum Level{ 
    Enterprise = 'Enterprise',
    Organisation = 'Organisation',
    Role = 'Role',
    User = 'User'
};
export class ProfileContext {

    constructor();
  constructor(
        public ContextCode?: string,
        public ProfileItemKey?: string,
        public ProfileLevel?: Level,
        public ProfileType?: string,
        public ProfileData?: any) {

    }
}
export class IProfileProp {
    FormCode: string;
    Profile: any;
    ProfileKey: string;
}
export interface OnProfileResult
{
  Sender : any, 
  Result : ProfileContext
}
export enum TextWrapping {
    NoWrap = 1,
    Wrap
}
export class SLSFSItem extends CListItem{    
    DisplayValue:string ;
    Sfskey:string ;
    Sfstype:string ;
  }