import { Injectable } from '@angular/core';
import { base,ContextManager,AMSHelper,SLQueryCollection, LzoWizard, MediatorDataService, ObjectHelper, AppLoadService } from 'epma-platform/services';
import { Constants, ContextCollection, Visibility, WizardAction } from "epma-platform/models";
import { AMSException } from '../models/AMSException';
import { iActivityConsideration } from 'epma-platform/controls';
import { WizardContextCollection } from './ContextCollection.service';
import { HttpUtility } from '../models/httputility';
import { WizardType } from '../models/eppma-common-types';
import { HelperService } from '../soap-client/helper.service';
import { InjectorInstance } from 'src/app/app.module';

@Injectable({
  providedIn: 'root'
})
export class LzoWizardVmbaseService extends LzoWizard{
   //STUB Code bug #35820
  OnValidate(action: WizardAction): boolean {
      throw new Error('Method not implemented.');
  }
   //STUB Code bug #35820
  objTaskInfo(objTaskInfo: any) {
      throw new Error('Method not implemented.');
  }
  //STUB Code bug #35819
   async RenderBanner(objTaskInfo?: any) {
    await ePMARefreshBanner();
    //code to be Revisited Below code commented Bug id 48707
      // throw new Error('Method not implemented.');
  }
  public static AppContext: any;
  public ErrorID: any;
  public ErrorMessage: any;
  public StackTrace: any;
  public Source: any;
  public WizardContext:WizardContextCollection = new WizardContextCollection();

  public CACode:string;

  private _AppContext: ContextCollection = new ContextCollection();
  public set AppContext(val: ContextCollection) {
    this._AppContext = val;
    LzoWizardVmbaseService.AppContext = val;
  }
  public get AppContext(): ContextCollection {
    return this._AppContext;
  }


  public IsButtonNextVisible: Visibility;

  public IsRoadMapVisible: Visibility;

  public IsButtonFinishNowVisible: Visibility;

  public IsButtonFinishVisible: Visibility;
  public IsButtonSuspendVisible: Visibility;
  //STUB Code for bug #35821
  _IsButtonCancelVisible : Visibility
  get IsButtonCancelVisible() : Visibility {
    return this._IsButtonCancelVisible;
  }
  public set IsButtonCancelVisible ( val: Visibility ) {
    let visibilityvalue = true;
    if (val == Visibility.Collapsed)
    visibilityvalue = false;

    let angularToken = {RequestID : 'FRAEWORKBUTTON', sButton : "Discard", visibility: visibilityvalue };
    window.parent.postMessage(JSON.stringify(angularToken), '*');

  }

  private _strBeforeExitScript : string = "BeforeExitSLWizard();";
  private _strExitScript : string = "ExitSLWizard();";
  public InstanceOIDField : string = '';
  public GenTaskOIDField : string = '';
  private bGetURL : boolean = false;
  private sCareActivityName : string = '';
  // public UIFServices.CResMsgGetTaskInfo objTaskInfo;
  private sConfigurationURL : string = '';
  private sConfigurationKEY : string = "ConfigurationWS";
  private sWIZ_Status : string = '';
  private sCACode : string = '';
  public bIsResume  : boolean = false;
  // public ActivityConsideration:iActivityConsideration;
  public SuspendBuffer:any

  public get GenTaskOID():string{
    return this.GenTaskOIDField;
  }

  public set GenTaskOID(value: string){
      if ((Object.is(this.GenTaskOIDField, value) != true)){
          this.GenTaskOIDField = value;
      }
  }


  public get InstanceOID():string{
    return this.InstanceOIDField;
  }

  public set InstanceOID(value: string){
      if ((Object.is(this.InstanceOIDField, value) != true)){
          this.InstanceOIDField = value;
      }
  }

  constructor();

  constructor(sTaskOID? : string);

  constructor(bIsDialog? : boolean);

  constructor(){
   super();
   this.temp_CACodeFill();
    this.prepareWizardContext();
    let rd: any;
    switch (arguments.length) {
      case 0:
        this.SetDefaultTabIndex();
        break;
      case 1:
        if(typeof arguments[0] == 'string')
        {
          let sTaskOID = arguments[0];
          this.InstanceOID = sTaskOID;
          ContextManager.Instance["InstanceOID"] = this.InstanceOID;
          //SetGenTaskOID();
          //ResumeTask(sTaskOID);
          this.SetDefaultTabIndex();
          // this.prepareWizardContext();
        }
        break;
      }
  }

  public prepareWizardContext(){
    let sQueryContext = JSON.parse(SLQueryCollection.GetQueryStringValue("ContextData")).CAParameters.toString();
    //Revisit - Siva
    sQueryContext = sQueryContext.replaceAll("%u2013", "%E2%80%93");  
    sQueryContext = sQueryContext.replaceAll("%u2019", "%E2%80%99");
    sQueryContext = sQueryContext.replace("ContextData=~|", "");
    sQueryContext = sQueryContext.replaceAll("~|", "&");
    sQueryContext = sQueryContext.replaceAll("|~", "=");
    let saryQueryStringData :  string[] = sQueryContext.split('&');
    saryQueryStringData.forEach((sItem:string) => {
      if (sItem != null && sItem.includes("="))
      {
        //let ctx = HttpUtility.UrlDecode(sItem.split('=')[1]);
       
        let ctx =sItem.split('=')[1];
        this.WizardContext.Add(sItem.split('=')[0], ctx);
      }
    });
  }

  private SetGenTaskOID() : void
  {
    this.GenTaskOID = '';
    //if (HtmlPage.Document.QueryString.ContainsKey("GenTaskOID") && !string.IsNullOrEmpty(HtmlPage.Document.QueryString["GenTaskOID"]) && HtmlPage.Document.QueryString["GenTaskOID"] != "0")
    //{
    //    GenTaskOID = HtmlPage.Document.QueryString["GenTaskOID"].ToString();
    //}
    ContextManager.Instance["GenTaskOID"] = this.GenTaskOID;
  }

  private SetDefaultTabIndex() : void
  {
      base['ReassignButtonTabIndex'] = 1000;
      base['SuspendButtonTabIndex'] = 1001;
      base['PrevButtonTabIndex'] = 1002;
      base['NextButtonTabIndex'] = 1003;
      base['FinishButtonTabIndex'] = 1004;
      base['FinishNowButtonTabIndex'] = 1005;
      base['CancelButtonTabIndex'] = 1006;
  }


  public OnInitialize() {

    try {
      // const ApplicationPath = string.Join("/", Application.Current.Host.Source.AbsoluteUri.Split('/'), 0, 4);
      let InstanceOID = SLQueryCollection.GetQueryStringValue("InstanceOID");
      this.AppContext.TSKCGCode = SLQueryCollection.GetQueryStringValue("WIZ_TaskCategory");
      let GenTaskOID = SLQueryCollection.GetQueryStringValue("GenTaskOID");
      ContextManager.Instance["InstanceOID"] = InstanceOID;
      ContextManager.Instance["GenTaskOID"] = GenTaskOID;

      // if (!App.IsSuspendBufferVMCreation)
      //     {
      //         ActivityConsideration = new iActivityConsideration();
      //        this.ProcessData();
      //        this.OnInitComplete();
      //     }

    }
    catch (err: any) {
      this.ErrorID = Constants.ERROR_IN_OnWizardExit;
      this.ErrorMessage = err.Message;
      this.StackTrace = err.StackTrace;
      this.Source = Constants.ApplicationName;
      this.LogError();
    }
  }

  public LogError(): void  {
    let ex: AMSException = new AMSException();
    ex.ErrorID = this.ErrorID;
    ex.ErrorMessage = this.ErrorMessage;
    ex.Source = this.Source;
    ex.StackTrace = this.StackTrace;
    AMSHelper.PublishProblemInfo(ex);
  }
  public static ProcessData() {

  }

  public static OnInitComplete() {

  }

  public OnInitComplete(){
  }
  public OnNext(){
  }
  public OnPrevious(){

  }
  public OnFinish(oReturn?:any){
    base.WizardContext.Add("WIZ_Status","FINISH");
    if(oReturn != null){
      oReturn.Add("WIZ_Status","FINISH");
    }
    LzoWizardVmbaseService.closeWizard(oReturn);
  }
  public ContextPrep(){
    if(this.WizardContext){
      Object.keys(this.WizardContext).forEach((key,i)=>{
        if(key != 'objWizardContext'){
          if (base.WizardContext.ContainsKey(key))
            base.WizardContext.Remove(key);

          base.WizardContext.Add(key,this.WizardContext[key]);
        }
      });
    }

  }
  public OnFinishNow(){
    base.WizardContext.Add("WIZ_Status","FINISHNOW");
    LzoWizardVmbaseService.closeWizard();
  }
  public OnCancel(){

  }
  public OnReassign(){

  }
  public OnSuspend(){

  }
  public OnCloseCA(){
    if(HelperService.windowCloseFlag == "Finish" || HelperService.windowCloseFlag == 'FinishNow'){
      base.WizardContext.Add("sWIZStatus","FINISH");
      base.WizardContext.Add("WIZ_Status","FINISH");
      let _mediatorDataService = InjectorInstance.get<MediatorDataService>(MediatorDataService);
      _mediatorDataService.prepublish({context:{event: HelperService.windowCloseFlag},contextCode:7,name:"close",source:"appWizard"});
      HelperService.windowCloseFlag = "";
    
    }
  }
  
  private temp_CACodeFill() {
    this.AppContext.CACode = SLQueryCollection.GetQueryStringValue('MenuCode');
    this.AppContext.MenuCode = SLQueryCollection.GetQueryStringValue('MenuCode');
    this.CACode = SLQueryCollection.GetQueryStringValue('MenuCode');
    if(this.AppContext.CACode == 'MN_MED_VERIFY_SL_P2'){
      this.AppContext.CACode = 'MED_CA_CLN_VRFY_SL_P2';
      this.CACode = 'MED_CA_CLN_VRFY_SL_P2';
    }
  }

  private static closeWizard(oReturn?:any){
    if(AppLoadService.isChildWizard){
      ObjectHelper.stopScreenFreezeEvent(true);
        let sdata = this.getContextString();
        this.setDialogReturnValue(sdata);
        this.onclose(oReturn);
      }else{
        this.onclose(oReturn);
      }
  }
  private static onclose(oReturn?:any){
    setTimeout(() => {
      let _mediatorDataService = InjectorInstance.get<MediatorDataService>(MediatorDataService);
      _mediatorDataService.prepublish({context:{event: HelperService.windowCloseFlag},contextCode:7,name:"close",source:"appWizard",LBMSReturn:oReturn?oReturn:""});
      HelperService.windowCloseFlag = "";
     }, 0);
      ObjectHelper.stopScreenFreezeEvent(true);
  }

  //#35915 LaunchWizard is added as a stub
  // LaunchWizard(sMenuCode: string, sQuery: string, WIZARD?: WizardType) {
  //   if(WIZARD == null)
  //   WIZARD = WizardType.WIZARD;
    
  //   let _LzoWizard: LzoWizard = InjectorInstance.get<LzoWizard>(LzoWizard);
  //   if(typeof(sQuery) != 'undefined' && sQuery != null && sQuery != ""){
  //    _LzoWizard.LaunchWizard(null,sMenuCode,sQuery);
  //   }
  // }
  PropertyChanged: (s: any, e: any) => void;  
  private static getContextString(){
    let newObj = Object.assign({},base.WizardContext);
    delete newObj["objWizardContext"];
    let wizardcontextStr="";
    Object.keys(newObj).forEach((key,i)=>{
      if(key != 'objWizardContext'){
        wizardcontextStr = wizardcontextStr + '&' + key + '=' + newObj[key];
        if(i== Object.keys(newObj).length - 1)
        wizardcontextStr = wizardcontextStr + '&';
      }
    });
    return wizardcontextStr;
    // let context = "context={";
    // (Object.keys(base.WizardContext)).forEach((key)=>{
    //   if(key != "objWizardContext"){
    //     let value = base.WizardContext[key];
    //     context +=key+":"+value+"&"; 
    //   }
    // });
    // if(context.endsWith("&"))
    // context = context.substring(0,context.length-1)
    // context = "}"
  }
  static setDialogReturnValue(sdata:string){
    let sdoc = window.top.document;
    let dialogIndx=0;
    while(sdoc.getElementById('dialog_'+dialogIndx)!=null)
    dialogIndx++;
    dialogIndx = dialogIndx != 0 ?dialogIndx -1 : dialogIndx;
    if((sdoc.getElementById("dialog_body_"+dialogIndx) as any)?.contentWindow)
    (sdoc.getElementById("dialog_body_"+dialogIndx) as any).contentWindow.returnValue = sdata;
  }
  GetChildWizardData(sdata:string){

  }
}
