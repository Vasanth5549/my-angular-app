import { Component, HostListener, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Event, Router, RouterEvent } from '@angular/router';
import { ContextType, List } from 'epma-platform/models';
import { AppLoadService, MediatorDataService, MessageBoxButton, MessageBoxType, iMessageBox, iBusyIndicator } from 'epma-platform/services';
import {filter} from 'rxjs';
import * as Class from 'epma-platform/models';
import { AccessKeyService } from './shared/epma-platform/controls/AccessKey.service';
import { environment } from 'src/environments/environment';
import { InjectorInstance } from './app.module';
import { base, ContextManager } from 'epma-platform/services';
import { AppContextInfo, AppSessionInfo, ContextInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { ToasterContent, ToasterMessageService } from './shared/epma-platform/services/toasterMessage.service';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Inline } from './shared/epma-platform/controls/Control';
import { iActivityConsideration } from './shared/epma-platform/controls/epma-iactivityconsideration/epma-iactivityconsideration.component';

import {
  PopupService,
  PopupRef
} from '@progress/kendo-angular-popup';
import { HttpUtility } from './shared/epma-platform/models/httputility';


TSClasses = Class;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  private popupRef: PopupRef;
  public tempRef: TemplateRef<any>;
  @ViewChild('activityTemplateRef', { read: TemplateRef }) set itemTemplate(value) {
    this.tempRef = value;
  }
  public backMode = false;
  public Content:ToasterContent;
  public activityConsiderationTemplate;
  @ViewChild('toastTemplate', { read: TemplateRef })
  set notificationTemplate(value) {    
    ToasterMessageService.templateref = value;
  }
  ActivityData:any
  public ActivityConsideration: iActivityConsideration;
  @ViewChild("PrescribingConsiderationTempRef", {read:iActivityConsideration, static: false }) set _ActivityConsideration(c: iActivityConsideration){
  if(c){ this.ActivityConsideration = c; }
  };


    constructor(public router: Router,private _mediatorDataService:MediatorDataService,private notificationService: NotificationService, private popupService: PopupService) {

      _mediatorDataService.listenFor(ContextType.activityConsClick).subscribe((data:any) => {
        console.log('ContextType.activityConsClick',data);
        let top:any = window.top;
        if(!top.msgAlert){
          this.ActivityConsideration_OnPopupOpen({},{});
        } 
      })
      AppLoadService.activityConsiderationEVT.subscribe(val=>{
        this.ActivityConsideration = val as iActivityConsideration;
        
      

        this.ActivityData = (val as iActivityConsideration).lstSection;
        // this.ActivityConsideration.OnPopupOpen = (s, e) => { this.ActivityConsideration_OnPopupOpen(s, e); };
      })

    ToasterMessageService.notificationserviceref = notificationService;
    router.events.pipe(
       filter((e: Event | RouterEvent): e is RouterEvent => e instanceof RouterEvent)
    ).subscribe((e: RouterEvent) => {
      if(e.url.indexOf('/View.html')> -1 || e.url.indexOf('/LBMePMACommonView.aspx') > -1){
        this._mediatorDataService.setViewProject(e.url);
        this.GetContextInfo()
        this.navigate();
      }
      else if (e.url.indexOf('/index.html')> -1 || e.url.indexOf('/LBMePMACommonWizard.aspx') > -1){
        this._mediatorDataService.setProjectAndCA();
        if(this._mediatorDataService.project == 'lorappmedicationadminbbui'){
          this.GetContextInfo();
          this.navigate();
        }else
        this.navigate();
      }
    });
    ToasterMessageService.notificationData.subscribe((data)=> {
      this.Content = data;
    })

    console.log("AppComponent");
    if(environment.mockEnvironment)
    this.navigate();
    this._mediatorDataService.crateEventMessageListner();
    this._mediatorDataService.listenFor(ContextType.close).subscribe({
      next(context){
        let top:any = window.top;
        if(context && context.context){
          let contextData = context?.context;
          if(contextData.context && (contextData.context.event == "Finish" || contextData.context.event  == 'FinishNow')){
            top.oScreen.UnFreeze();
            let wizardcontext = null;
            let wizardcontextStr = '';
            if(contextData.LBMSReturn){
              //Finish with prescription
              wizardcontext = contextData.LBMSReturn;
            }else{
              //Finish without prescription
              wizardcontext = Object.assign({},base.WizardContext);
            }
            if(top.GetMainApp() && wizardcontext){
              if(wizardcontext){
                Object.keys(wizardcontext).forEach((key,i)=>{
                  if(key != 'objWizardContext'){
                    {
                    if(key == 'sWizardContext' && wizardcontext['sWizardContext'] != ''){
                      wizardcontextStr = wizardcontextStr + '&' + key + '=' + wizardcontext[key];
                    }else if(key != 'sWizardContext'){
                      wizardcontextStr = wizardcontextStr + '&' + key + '=' + wizardcontext[key];
                    }
                    if(i== Object.keys(wizardcontext).length - 1)
                    wizardcontextStr = wizardcontextStr + '&';
                    }
                  }
                });
              }
            wizardcontextStr = wizardcontextStr + "IsIPPMAEPRPRINT=True&";
            top.GetMainApp().LBMSReturn = wizardcontextStr;
            // top.GetMainApp().LBMSReturn = HttpUtility.UrlEncode(wizardcontextStr);
            }
			iBusyIndicator.Stop('FINISH');
            let angularToken = {RequestID : 'FRAEWORKCLOSE'};
            window.parent.postMessage(JSON.stringify(angularToken), '*');
            
          }else if(contextData.context && contextData.context.event){
            top.oScreen.UnFreeze();
            iMessageBox.Show("Error", contextData.context.event, MessageBoxType.Information, MessageBoxButton.OK);
          }
        }
      }
    })
  }
 
  ActivityConsideration_OnPopupOpen(s,e){
    this.togglePopup();
    AppLoadService.activityConsiderationArrowClick.next(true);
  }
  public togglePopup(): void {
    if (this.popupRef) {
      this.popupRef.close();
      this.popupRef = null;
    } else {
      this.popupRef = this.popupService.open({
        content: this.tempRef,
      offset:{ top:1542,left:0}
      });
    }
  }
  nodeClick(){
    AppLoadService.nodeClick.next(true); 
  }
  /* constructor(public router: Router,private _mediatorDataService:MediatorDataService) {
    this.router.navigate(['/testview'])
  } 
  /* constructor(public router: Router,private _mediatorDataService:MediatorDataService) {
    this._mediatorDataService.crateEventMessageListner();
    this.GetContextInfo();
    this.router.navigate(['/MN_MEDCHART_P2'])
  } */
  navigate(){
    
    let project = this._mediatorDataService.project;
    console.log(project);
    let path = `/${project}`;
    if(!location.pathname.includes('/test-platform'))
    this.router.navigate([path]);
    console.log('app comp', path);
  }
  // @HostListener('window:keyup', ['$event'])
  // onKeyUp(event) {
  //   if(event.ctrlKey && event.altKey){
  //     let AK = event.key;
  //     console.log('keyup', event, AK);
  //     let accessKeyService: AccessKeyService = InjectorInstance.get<AccessKeyService>(AccessKeyService);
  //     accessKeyService.keyPress(AK);
  // }}

  private GetContextInfo()
  {
      //Resetting the flag variable
      PatientContext.IsAgeSexFilledforConflict = false;

      if (base.WizardContext.objWizardContext.ContainsKey("PATIENTOID") && base.WizardContext.objWizardContext["PATIENTOID"] != null)
      {
          PatientContext.PatientOID = base.WizardContext.objWizardContext["PATIENTOID"];
          ContextManager.Instance["PatientID"] = base.WizardContext.objWizardContext["PATIENTOID"];
      }
      else if (ContextManager.Instance["PatientID"])
          PatientContext.PatientOID = ContextManager.Instance["PatientID"];
      else
          PatientContext.PatientOID = this._mediatorDataService.contextStore[1].context['PatientID'];

      if (base.WizardContext.objWizardContext.ContainsKey("ENCOUNTEROID") && base.WizardContext.objWizardContext["ENCOUNTEROID"] != null)
      {
          PatientContext.EncounterOid = base.WizardContext.objWizardContext["ENCOUNTEROID"];
          ContextManager.Instance["EncounterOID"] = base.WizardContext.objWizardContext["ENCOUNTEROID"];
      }
      else  if (base.WizardContext.objWizardContext.ContainsKey("EncounterOID") && base.WizardContext.objWizardContext["EncounterOID"] != null)
      {
        PatientContext.EncounterOid = base.WizardContext.objWizardContext["EncounterOID"];
        ContextManager.Instance["EncounterOID"] = base.WizardContext.objWizardContext["EncounterOID"];
      }
      else if (ContextManager.Instance["EncounterOID"])
          PatientContext.EncounterOid = ContextManager.Instance["EncounterOID"];
      else {
        if(this._mediatorDataService.contextStore[4].context['CAParameters']){
          let contextArray: String[] = this._mediatorDataService.contextStore[4].context['CAParameters'].toString().split('~|');
          for(let i = 0; i < contextArray.Count(); i++) {
              let contextDataArray: String[] = contextArray[i].split('|~');
              if (contextDataArray[0] == 'ENCID') {
                  PatientContext.EncounterOid = Number(contextDataArray[1]);
                  break;
              }
            }
          }
      }

      if (base.WizardContext.objWizardContext.ContainsKey("PrescType") && base.WizardContext.objWizardContext["PrescType"] != null)
          PatientContext.PrescriptionType = base.WizardContext.objWizardContext["PrescType"];

      if (ContextManager.Instance["DOB"] != null)
          PatientContext.DOB = ContextManager.Instance["DOB"];
      if (ContextManager.Instance["EncounterType"] != null)
      {
          PatientContext.EncounterCode = ContextManager.Instance["EncounterType"];
      }
      if (ContextManager.Instance["MergedPatientOID"] != null)
          PatientContext.MergedPatientOID = ContextManager.Instance["MergedPatientOID"];

      if (ContextManager.Instance["IsMergedPatient"] != null)
      {
          //String isMergedPatient;
          PatientContext.IsMergedPatient = ContextManager.Instance["IsMergedPatient"].toString();
      }
      if (ContextManager.Instance["IPPMADU_P2"] != null)
          PatientContext.IPPMADU_P2 = ContextManager.Instance["IPPMADU_P2"].toString();
      if (ContextManager.Instance["TTOPBBDU"] != null)
          PatientContext.TTOPBBDU = ContextManager.Instance["TTOPBBDU"].toString();
      //RR DU
      if (ContextManager.Instance["TTOPBBDU_P2"] != null)
          PatientContext.TTOPBBDU_P2 = ContextManager.Instance["TTOPBBDU_P2"].toString();

      //RR DRC
      if (ContextManager.Instance["IsTurnONDRC"] != null)
      {
          PatientContext.IsTurnONDRC = ContextManager.Instance["IsTurnONDRC"].toString();
      } 

      AppContextInfo.OrganisationName = ContextManager.Instance["OrganisationName"] ? ContextManager.Instance["OrganisationName"].toString() : '';
      AppContextInfo.JobRoleOID = ContextManager.Instance["JobRoleOID"] ? ContextManager.Instance["JobRoleOID"].toString() : '';
      AppContextInfo.JobRoleName = ContextManager.Instance['JobRoleName'] ? ContextManager.Instance["JobRoleName"].toString() : '';
      AppContextInfo.RoleProfileName = ContextManager.Instance["RoleProfileName"] ? ContextManager.Instance["RoleProfileName"].toString() : '';
      AppContextInfo.SpecialtyOID = ContextManager.Instance["SpecialtyOID"] ? ContextManager.Instance["SpecialtyOID"].toString() : '';
      AppSessionInfo.AMCV = ContextManager.Instance["AMCV"] ? ContextManager.Instance["AMCV"].toString() : '27';
      if (ContextManager.Instance["TeamNames"] != null)
          AppContextInfo.TeamNames = ContextManager.Instance["TeamNames"].toString();
      if (ContextManager.Instance["TeamOIDs"] != null)
          AppContextInfo.TeamOIDs = ContextManager.Instance["TeamOIDs"].toString();


      ContextInfo.SecurityToken = ContextManager.Instance["SecurityToken"] ? ContextManager.Instance["SecurityToken"].toString() : this._mediatorDataService.contextStore[2].context['SecurityKey'];
      AppContextInfo.OrganisationOID = ContextManager.Instance["OrganisationOID"] ? ContextManager.Instance["OrganisationOID"].toString() : this._mediatorDataService.contextStore[3].context['OrganizationID'];
      ContextInfo.Culture = ContextManager.Instance["Culture"] ? ContextManager.Instance["Culture"] : '';
      
      ContextInfo.UserOID = ContextManager.Instance["UserOID"] ? ContextManager.Instance["UserOID"].toString() : this._mediatorDataService.contextStore[0].context['UserID'];
      AppContextInfo.UserOID = ContextInfo.UserOID.ToString();
  
      ContextInfo.ReleaseVersion = ContextManager.Instance["ReleaseVersion"] ? ContextManager.Instance["ReleaseVersion"].toString() : '';

     
      if (ContextManager.Instance["bDateOfBirthEstimated"] != null)
      {
          PatientContext.IsEstimatedDOB = ContextManager.Instance["bDateOfBirthEstimated"].toString();
      }
      if (ContextManager.Instance["IsPatientTranferAct"] != null)
      {
          PatientContext.IsPatientTranferAct = ContextManager.Instance["IsPatientTranferAct"].toString();
      }
  }
 }
