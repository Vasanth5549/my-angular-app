import { AggregateService } from "epma-platform/services";
import { InjectorInstance } from "src/app/app.module";
import { CContextInformation, CLZOObject } from "./ippmamanageprescriptionws";

export class EncounterBase extends CLZOObject {
    EncounterID: string = '';
    EncounterType: string = '';
    OrganisationID: number = 0;
    OrganisationName: string = '';
    LocationID: number = 0;
    Locationname: string = '';
    EncounterReason: string = '';
    Status: string = '';
    CreatedDttm: string = '';
    ClosureDttm: string = '';
    EncounterIdentifier: string = '';
    StartedDttm: string = '';
    PatientOID: string = '';
}

export class Encounter extends EncounterBase {
    PathWayID: string = '';
    OrgMainIdentifier: string = '';
    EpisodeID: string = '';
    EpisodeName: string = '';
    ServicePoint: string = '';
    Location: string = '';
    CareProviderID: number = 0;
    CareProviderName: string = '';
    SpecialtyID: number = 0;
    SpecialtyName: string = '';
    CareServiceID: number = 0;
    CareServiceName: string = '';
    AdditonalCareProvider: string = '';
    ReferralID: string = '';
    ReferralName: string = '';
    ServiceID: number = 0;
    Servicename: string = '';
    CareproviderRole: string = '';
    Ambulatorystatus: string = '';
    EncouterIDTYCode: string = '';
    EncounterCreation: string = '';
    ClosedBy: string = '';
    CreatedBy: number = 0;
    EncounterStatus: string = '';
    AppointmentOID: string = '';
    IsManualCreation: string = '';
    CareproviderRoleID: string = '';
    EpisodeIdentifier: string = '';
    ReferredToCPName: string = '';
    ReferralDttm: string = '';
    bNegation: boolean = false;
    LinkedEncounterOId: number = 0;
    LinkedEncounter: string = '';
    ReferralOID: number = 0;
    ReferredType: string = '';
    ReferredSpelity: string = '';
    ReferredTremnt: string = '';
    ReferredTeam: string = '';
    ReferredOrg: string = '';
    SessionName: string = '';
    LinkedEncType: string = '';
    SessionOID: string = '';
    TreatmentFunctionName: string = '';
    CurrrentBedCategory: string = '';
    CurrentPatientCategory: string = '';
    TreatmentFunctionOID: string = '';
    CurrentLocationOID: string = '';
    CurrentLocationName: string = '';
    CurrentCareProviderOID: number = 0;
    CurrentCareProviderName: string = '';
    CurrentSpecialtyOID: number = 0;
    CurrentSpecialtyName: string = '';
    CurrentServiceOID: number = 0;
    CurrentServiceName: string = '';
    HasFilter: boolean = false;
    IsSealBroken: boolean = false;
    IsSealOwner: string = '';
    HasOwnSealBroken: boolean = false;
    PatientSeal: PatientSeal = new PatientSeal();
    CreatedByUserName: string = '';
    CancelReason: string = '';
    EncCancelDTTM: string = '';
    SharedCarer: string = '';
    IsBkgByAPEWrittenOPOffer: boolean = false;
    APEOfferOID: string = '';
    IsOnHold: boolean = false;
    RescheduledFromBookingOID: string = '';
    Referredservice: string = '';
    Referredservicedefinition: string = '';
    IsSimple: string = '';
    EprMapValue: string = '';
    GroupValue: string = '';
    GroupValueDisplay: string = '';
    Count: number = 0;
    GroupText: string = '';
    DateQualifier: string = '';
    IsCustomFilter: boolean = false;
    CurrentCareProviderType: string = '';
}


export class CReqMsgGetEncountersPaging {
    objEncounterBC: Encounter = new Encounter();
    pElementBC: PagingDynamicSQL = new PagingDynamicSQL();;
    oContextInformation: CContextInformation = new CContextInformation();
}


export class CResMsgGetEncountersPaging {
    oEncounter: Array<Encounter> = [];
    CurrentPageElement: PagingDynamicSQL = new PagingDynamicSQL();
    TotalRecCount: number = 0;
    oContextInformation: CContextInformation = new CContextInformation();
}


export class PagingDynamicSQL {
    PageSize: number = 0;
    PageIndex: number = 0;
    PageCount: number = 0;
    RecFrm: number = 0;
    RecTo: number = 0;
    FindPageCount: boolean = false;
    ChildPagination: boolean = false;
    FilterBy: Filter = new Filter();
    GroupBy: Group = new Group();
    FilterByColumn: string = '';
    SortingColumns: string = '';
    FilterByXML: string = '';
}


export class Filter {
    Type: FilterByType;
    ListMetaphoreOID: number = 0;
    Serialize: string = '';
}

export class Group {
    Type: GroupByType;
    ColumnName: string = '';
    ParentValue: string = '';
    Text: string = '';
    Serialize: string = '';
}


enum FilterByType {
    None = 0,
    XML = 1,
    ListMetaphoreID = 2,
}


enum GroupByType {
    None = 0,
    Grouped = 1,
    Expanded = 2,
}


export class PatientSeal extends CLZOObject {
    sSealPsisMess: SealPSISMessage = new SealPSISMessage();
    SealIdentifier: string = '';
    IdentifyingOID: string = '';
    IdentifyingType: string = '';
    PatientOID: string = '';
    CreatedDTTM: string = '';
    ModifiedDTTM: string = '';
    ModifiedBy: string = '';
    RefuseReasonCode: string = '';
    SealTimeout: number = 0;
    Justification: string = '';
    RequestMode: string = '';
    Requestor: string = '';
    RequestorName: string = '';
    RequestorDetails: string = '';
    WitnessName: string = '';
    WitnessDetails: string = '';
    PrintedDTTM: string = '';
    ConsentIdentifier: string = '';
    patientSealAccessGroup: Array<SealAccessGroup> = [];
    PatientSealAccessUsers: Array<SealAccessUsers> = [];
    SealPSISMessage: SealPSISMessage = new SealPSISMessage();
    PatientName: string = '';
    PatientId: string = '';
    IsSealBreak: boolean = false;
    SurName: string = '';
    ForeName: string = '';
    Gender: string = '';
    IsProfileEnabled: boolean = false;
    ClinicianOID: number = 0;
    PageNumber: number = 0;
    PageSize: number = 0;
    MaxRows: number = 0;
    ClinicianIDs: string = '';
    CreatedBy: string = '';
    IsSensitive: string = '';
}



export class SealAccessGroup extends CLZOObject {
    AccessGroupIdentifier: string = '';
    SealIdentifier: string = '';
    ArtefactOID: number = 0;
    ArtefactType: string = '';
    IsSealingGroup: boolean = false;
    IsEditingGroup: boolean = false;
    ArtefactName: string = '';
    ArtefactDesc: string = '';
    ArtefactID: string = '';
}


export class SealAccessUsers extends CLZOObject {
    AccessUserType: string = '';
    AccessUserIdentifier: string = '';
    SealIdentifier: string = '';
    CareProviderIdentifier: number = 0;
    ActionTaken: string = '';
    ClinicianID: string = '';
    SurName: string = '';
    ForeName: string = '';
    Role: string = '';
    RoleOID: number = 0;
    OrgName: string = '';
}


export class SealPSISMessage extends CLZOObject {
    SealReportPacket: SealReportPacket = new SealReportPacket();
    SealReportInfo: SealReportInfo = new SealReportInfo();
    SealNotifyPacket: SealNotifyPacket = new SealNotifyPacket();
    SealAuthor: SealAuthor = new SealAuthor();
}

export class SealReportPacket extends CLZOObject {
    MetaData: SealReportMetaData = new SealReportMetaData();
    Message: SealReportMessage = new SealReportMessage();
}


export class SealReportInfo extends CLZOObject {
    PrevSealtype: string = '';
    SealFlg: boolean = false;
    UserFlg: boolean = false;
    UserGroupCode: string = '';
    UserAccessCode: string = '';
    DocumentAssociate: string = '';
    IsCareActivity: boolean = false;
}


export class SealNotifyPacket extends CLZOObject {
    MetaData: SealNotifyMetaData = new SealNotifyMetaData();
    Message: SealNotifyMessage = new SealNotifyMessage();
}


export class SealAuthor extends CLZOObject {
    Code: string = '';
    DisplayName: string = '';
    OrganisationId: string = '';
    OrganisationName: string = '';
    PersonName: string = '';
    SDSId: string = '';
    SDSUserProfileID: string = '';
}


export class SealReportMetaData extends CLZOObject {
    MessageId: string = '';
    CreationTime: string = '';
    InteractionId: string = '';
    OriginatorMachineID: string = '';
    VersionCode: string = '';
    HL7Version: string = '';
    UserLoggedIn: SealReportUserLoggedIn = new SealReportUserLoggedIn();
}


export class SealReportMessage extends CLZOObject {
    SealAccessor: Array<SealGroupAccessor> = [];
    Action: string = '';
    ReportEffectiveDTTM: string = '';
    ReportModifyDTTM: string = '';
    AuthorSDSUserID: string = '';
    AuthorSDSUserName: string = '';
    AuthorSDSUserRPID: string = '';
    AuthorOrganisationID: string = '';
    AuthorOrganisationName: string = '';
    PatientNHSNumber: string = '';
    SealId: string = '';
    ObjectType: string = '';
    SealingId: string = '';
    SealingState: string = '';
    JustifyingReason: string = '';
    SealRequesterId: string = '';
    SealRequesterRelationshipCode: string = '';
    SealRequesterPersonName: string = '';
    SealEventAction: string = '';
    SealWorkgroupAccessorId: string = '';
    SealWorkgroupAccessorName: ArrayOfString;
    SealWorkgroupAccessorType: ArrayOfString;
    NewWorkgroupAccessorId: ArrayOfString;
    SealAccessorId: string = '';
    RefusalReasonCode: string = '';
}

export class ArrayOfString extends Array<string>
{

}

export class SealGroupAccessor {
    AccessorType: SealAccessorType = 0;
    AccessorOID: string = '';
}


enum SealAccessorType {
    Team = 0,
    Specialty = 1,
    ServicePoint = 2,
}


export class SealReportUserLoggedIn extends CLZOObject {
    UserRoleProfileID: string = '';
    UserID: string = '';
    UserJobRoleCode: string = '';
}

export class SealNotifyMetaData extends CLZOObject {
    MessageId: string = '';
    CreationTime: string = '';
    InteractionId: string = '';
    OriginatorMachineID: string = '';
    VersionCode: string = '';
    HL7Version: string = '';
    UserLoggedIn: SealNotifyUserLoggedIn = new SealNotifyUserLoggedIn();
}


export class SealNotifyMessage extends CLZOObject {
    RequesterType: string = '';
    SealingChangeItemRefType: string = '';
    RequesterId: string = '';
    RequesterName: string = '';
    RequesterDisplayName: string = '';
    RequesterCode: string = '';
    EffectiveDTTM: string = '';
    NHSNumber: string = '';
    SealingReson: string = '';
    Comments: string = '';
    SealEventActionCode: string = '';
    AuthorOfSeal: string = '';
}


export class SealNotifyUserLoggedIn extends CLZOObject {
    UserRoleProfileID: string = '';
    UserID: string = '';
    UserJobRoleCode: string = '';
}



export class QueryCareEventsWSSoapClient {
    flowId = ""
    GetEncountersPagingAsync(pElement: CReqMsgGetEncountersPaging, delegateArgs: { instance: object, delegate: string }) {
        HelperService.invoke<CResMsgGetEncountersPaging>(this.flowId, pElement, delegateArgs);
    }
}

// export type object =  Object
export class HelperService {
    public static invoke<T>(id: any, method: CReqMsgGetEncountersPaging, delegateArgs: any) {
        let aggregateService: AggregateService = InjectorInstance.get<AggregateService>(AggregateService);
        aggregateService.postAggregateData(id, method).subscribe(res => {
            console.table(res);
            let response = JSON.parse(res) as T;
            delegateArgs.instance[delegateArgs.delegate](response);
        });
    }
}