import { Injectable} from '@angular/core';
import { EventsModule } from '@progress/kendo-angular-common';
import { Observable,BehaviorSubject, Subject } from 'rxjs';
import { InjectorInstance } from '../../../app.module';
import { ContextType, EventContextModel } from 'epma-platform/models';
import {AppLoadService} from 'epma-platform/services';
import { environment } from 'src/environments/environment';
import { MockWizardDataService } from '../local-connect/services/mock-wizard.service';

@Injectable({
  providedIn: 'root'
})
export class MediatorDataService {

  private angularToken = {RequestID : 'PRIMARYCONTEXT'};
  private static intializeWizardScope : any;
  public contextStore: EventContextModel[] = [];
  private patientSubject : BehaviorSubject<any> = new BehaviorSubject(null);
  private userSubject : BehaviorSubject<any> = new BehaviorSubject(null);
  private securitySubject : BehaviorSubject<any> = new BehaviorSubject(null);
  private organizationSubject : BehaviorSubject<any> = new BehaviorSubject(null);
  private CAParameterSubject : BehaviorSubject<any> = new BehaviorSubject(null);
  private eventSubject : BehaviorSubject<any> = new BehaviorSubject(null);
  private wizardClose : BehaviorSubject<any> = new BehaviorSubject(null);
  private activityConsiderationClick : BehaviorSubject<any> = new BehaviorSubject(null);
  public static appReadySubject = new Subject();
  public static cancelClick = new Subject();
  private static appInitalizerSubscriber: any = null;
  public project = '';
  public ca = '';
  public static isWizard:boolean = true;
  _rowVirtualization = true;
  get rowVirtualization(){
    return this._rowVirtualization;
  }
  set rowVirtualization(value:boolean){
    this._rowVirtualization = value;
  }
  public cAMenuList = [
    { menu: 'MN_MEDCLERKSL_P2',project:"lorappmanageprescriptionbbui",ca:""},
    { menu: 'MN_MEDADMINISTRAT_P2',project:"lorappmanageprescriptionbbui",ca:""},
    { menu: 'MN_MEDINPATSL_P2',project:"lorappmanageprescriptionbbui",ca:""},
    { menu: 'MN_MEDOUTPATSL_P2',project:"lorappmanageprescriptionbbui",ca:""},
    { menu: 'MN_MEDDISCHRGESL_P2',project:"lorappmanageprescriptionbbui",ca:""},
    { menu: 'MN_MEDLEAVESL_P2',project:"lorappmanageprescriptionbbui",ca:""},
    { menu: 'MN_MED_VALIDATE_S_P2',project:"lorappmanageprescriptionbbui",ca:""},
    { menu: 'MN_RSLV_CONFLICTS',project:"lorappmanageprescriptionbbui",ca:""},
    { menu: 'MN_SUPINSTR_P2',project:"lorappmanageprescriptionbbui",ca:""},
    { menu: 'MN_MEDCHART_P2',project:"lorappmedicationadminbbui",ca:""},
    { menu: 'MN_PRESCCHART_P2',project:"lorappmedicationadminbbui",ca:""},
    { menu: 'MN_OBSERESULTCHAR_P2',project:"lorappmedicationadminbbui",ca:""},
    { menu: 'MN_MED_VERIFY_SL_P2',project:"lorappmanageprescriptionbbui",ca:""},
    { menu: 'MN_MED_REQUEST',project:"lorappmedicationadminbbui",ca:""},
    { menu: 'VW_MED_View',project:"lorappmedicationcommonbb",ca:""},
    { menu: 'MN_RECORDPGD_P2',project:"lorappmedicationadminbbui",ca:""}
  ];

  

  constructor() { }

  public prepublish(contextData:any) {
    if(contextData && contextData.contextCode){
      if(contextData.contextCode == 5 && contextData.context != null){
       this.intializeFrameworkObjects(contextData);
      }

      this.publish(contextData.contextCode,contextData);
    }
  }

  public intializeFrameworkObjects(contextData){
    let appLoadService: AppLoadService = InjectorInstance.get<AppLoadService>(AppLoadService);
    let requestBody = contextData.context.CAParameters;
    appLoadService.GetWizardContextData(requestBody);
  }

  private publish(type: ContextType, context: EventContextModel) {
    switch (type) {
      case (ContextType.user): this.userSubject.next({ context });
        break;
      case (ContextType.patient): this.patientSubject.next({ context });
        break;
      case (ContextType.security): this.securitySubject.next({ context });
        break;
      case (ContextType.organization): this.organizationSubject.next({ context });
        break;
      case (ContextType.CAParameters): this.CAParameterSubject.next({ context });
        break;
      case (ContextType.event):this.eventSubject.next({ context });
        break;
      case (ContextType.close):this.wizardClose.next({ context });
        break;
        case (ContextType.activityConsClick):this.activityConsiderationClick.next({ context });
        break;
    }
  }

  public listenFor(type: ContextType): Observable<any> {
    switch (type) {
      case (ContextType.user): return this.userSubject.asObservable();

      case (ContextType.patient): return this.patientSubject.asObservable();

      case (ContextType.security): return this.securitySubject.asObservable();

      case (ContextType.CAParameters): return this.CAParameterSubject.asObservable();

      case (ContextType.organization): return this.organizationSubject.asObservable();

      case (ContextType.event): return this.eventSubject.asObservable();

      case (ContextType.close): return this.wizardClose.asObservable();
      
      case (ContextType.activityConsClick): return this.activityConsiderationClick.asObservable();
    }
  }

  private checkContextDataCAParam(contextDataCAParam){
    if(!contextDataCAParam.Contains('&GenTaskOID'))
    contextDataCAParam = contextDataCAParam + "GenTaskOID=&";
    if(!contextDataCAParam.Contains('&InstanceOID'))
    contextDataCAParam = contextDataCAParam + "InstanceOID=&";
    if(!contextDataCAParam.Contains('&CACode'))
    contextDataCAParam = contextDataCAParam + "CACode=&";
    if(contextDataCAParam.Contains('&LbmMenuCode'))
    contextDataCAParam = contextDataCAParam.Replace("&LbmMenuCode","&MenuCode")
    if(!contextDataCAParam.Contains('&TaskCode'))
    contextDataCAParam = contextDataCAParam + "TaskCode=&"
    return contextDataCAParam;
  }

  private setContextDataCAParams(wizardData){
    let hdnCAParam = GetHdnCAParam();
    let CAParameters = null;
    if(hdnCAParam){
      let contextDataCAParam = hdnCAParam.split("ContextData")[1];
      let contextDataCAParamAdd = this.checkContextDataCAParam(contextDataCAParam);
      CAParameters = 'ContextData' + contextDataCAParamAdd;
      wizardData.forEach((element,i) => {
        if(element.name == "CAParameters"){
          wizardData[i].context.CAParameters = CAParameters;
        }
      });
    }
  }

  private setContextDataParams(wizardData){
    let hdnWizardContextData = JSON.parse(GetHdnWizardContextData());
    let index = ContextType.CAParameters - 1;
    if(hdnWizardContextData){
      wizardData.forEach((element,i) => {
        if(element.name == "user"){
          wizardData[i].context.UserID = hdnWizardContextData.UserID;
        }else if(element.name == "patient"){
          if(wizardData[index].context.CAParameters != null && wizardData[index].context.CAParameters != ''){
            if(wizardData[index].context.CAParameters.indexOf('|PATIENTOID|') > 0){
              let PatientIDContext = wizardData[index].context.CAParameters.split('|PATIENTOID|')[1];
              wizardData[i].context.PatientID = PatientIDContext.split('~|')[0].Replace("~",'');
            }
          }
          if(wizardData[i].context.PatientID == null){
            wizardData[i].context.PatientID = hdnWizardContextData.PatientID;
          }
        }else if(element.name == "security"){
          wizardData[i].context.SecurityKey = hdnWizardContextData.SecurityKey;
        }else if(element.name == "organization"){
          wizardData[i].context.OrganizationID = hdnWizardContextData.OrganizationID;
        }
      });
    }
  }

  private intializeWizardData(event){
    if (environment.mockEnvironment != true) {
      var wizardData = event.data !=null ? JSON.parse(event.data) : []; 
        this.setContextDataCAParams(wizardData);
        this.setContextDataParams(wizardData);
        if (wizardData && (typeof wizardData == 'object' && wizardData.length > 0)){
            let eventModel;
            let arrWizardData = wizardData;
            arrWizardData.forEach(element => {
                eventModel = Object.assign({}, element);
                this.contextStore.push(eventModel);
                this.prepublish(eventModel);
            }); 
        }
        else
        MediatorDataService.appInitalizerSubscriber.error();
    }else {
      let mockWizardDataService: MockWizardDataService =
        InjectorInstance.get<MockWizardDataService>(MockWizardDataService);
      var wizardData = mockWizardDataService.getMockWizardData();
      if (wizardData && (typeof wizardData == 'object' && wizardData.length > 0)){
          let eventModel;
          let arrWizardData = wizardData;
          arrWizardData.forEach(element => {
              eventModel = Object.assign({}, element);
              this.contextStore.push(eventModel);
              this.prepublish(eventModel);
          });          
      }
      else
      MediatorDataService.appInitalizerSubscriber.error();
    }
  }
  public processIntializeViewData() {
    let sendWizardData = [{contextCode:1,name:"user",context:{UserID:null},source:"webclient"},
    {contextCode:2,name:"patient",context:{PatientID:null},source:"webclient"},
    {contextCode:3,name:"security",context:{SecurityKey:null},source:"webclient"},
    {contextCode:4,name:"organization",context:{OrganizationID:null},source:"webclient"},
    {contextCode:5,name:"CAParameters",context:{CAParameters:null},source:"webclient"}];
    return JSON.stringify(sendWizardData);
  }

  private async intializeViewData(){
    let contextData = await ePMAGetContextData();
    var wizardData = contextData !=null ? JSON.parse(contextData) : []; 
    // this.setContextDataCAParams(wizardData);
    if (wizardData && (typeof wizardData == 'object' && wizardData.length > 0)){
        let eventModel;
        let arrWizardData = wizardData;
        arrWizardData.forEach(element => {
            eventModel = Object.assign({}, element);
            this.contextStore.push(eventModel);
            this.prepublish(eventModel);
        });          
    }
    else
    MediatorDataService.appInitalizerSubscriber.error();

  }


  public crateEventMessageListner(){
    MediatorDataService.intializeWizardScope = this.intializeWizardData.bind(this);
    window.addEventListener('message',MediatorDataService.intializeWizardScope, false);
  }
  

  public  initView() {
    MediatorDataService.isWizard = false;
    return new Observable((subscriber:any) => { 
      MediatorDataService.appInitalizerSubscriber = subscriber;
      MediatorDataService.appReadySubject.subscribe({
        next(data:any){
          if(MediatorDataService.appInitalizerSubscriber){
            MediatorDataService.appInitalizerSubscriber.complete();
            MediatorDataService.appInitalizerSubscriber = null;
          }
        }
      });
      this.intializeViewData();
      });
  }
  // async getePMAGetContextData(){
  //   return await ePMAGetContextData();
  // }

  public processInitWizardData() {
    let wizardData = [{contextCode:1,name:"user",context:{UserID:null},source:"webclient"},
    {contextCode:2,name:"patient",context:{PatientID:null},source:"webclient"},
    {contextCode:3,name:"security",context:{SecurityKey:null},source:"webclient"},
    {contextCode:4,name:"organization",context:{OrganizationID:null},source:"webclient"},
    {contextCode:5,name:"CAParameters",context:{CAParameters:null},source:"webclient"}];
    let sendWizardData={data : JSON.stringify(wizardData)};
    this.intializeWizardData(sendWizardData);
  }

  public initWizard() {
    MediatorDataService.isWizard = true;
    return new Observable((subscriber) => {
      // this.project = 'lorappmanageprescriptionbbui';
      // this.ca = 'medicationprescriptionview';
      MediatorDataService.appInitalizerSubscriber = subscriber;
      MediatorDataService.appReadySubject.subscribe({
        next(data:any){
          if(MediatorDataService.appInitalizerSubscriber){
            window.removeEventListener('message',MediatorDataService.intializeWizardScope, false);
            MediatorDataService.appInitalizerSubscriber.complete();
            MediatorDataService.appInitalizerSubscriber = null;
          }
        }
      });
      this.crateEventMessageListner();      
      window.parent.postMessage(JSON.stringify(this.angularToken), '*');
      this.processInitWizardData();
    })
  }

  public setProjectAndCA() {
    let sMenuCode = String.Empty;
    sMenuCode = this.getMenucodeFromCAparams(this.contextStore[4].context['CAParameters']);
    let oProject = this.cAMenuList.find((elem) => {
      return (String.Equals(sMenuCode, elem.menu) ? sMenuCode : String.Empty);
      // this.contextStore[4].context['CAParameters'].Contains(elem.menu);
    });
    if (oProject) {
      this.project = oProject.project;
      this.ca = oProject.ca;
    } else {
      this.project = 'lorappmanageprescriptionbbui';
      this.ca = 'medicationprescriptionview';
    }
  }

  public getMenucodeFromCAparams(param: string): string {
    let Menucode = String.Empty;
    if (param != null) {
      let Menuvalue = param.toUpperCase().split("~|MENUCODE|~");
      if (Menuvalue != null && Menuvalue.Count() > 0 && Menuvalue[1] != null && Menuvalue[1].Count() > 0) {
        Menucode = Menuvalue[1].split("~")[0];
      }
      else if (String.IsNullOrEmpty(Menucode)) {
        let Menuvalue = param.toUpperCase().split("&MENUCODE=");
        if (Menuvalue != null && Menuvalue.Count() > 0 && Menuvalue[1] != null && Menuvalue[1].Count() > 0) {
          Menucode = Menuvalue[1].split("&")[0];
        }
      }
    }
    return Menucode
  }

  public setViewProject(QueryString: string) {
    let hdnCAParam = GetHdnCAParam();
    this.project = 'lorappmedicationcommonbb';
    this.ca = 'lorappmedicationcommonbb';
    let appLoadService: AppLoadService = InjectorInstance.get<AppLoadService>(AppLoadService);
    appLoadService.setDialogContext(hdnCAParam);
  }
}
