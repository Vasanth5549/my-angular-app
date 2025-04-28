import { Injectable } from '@angular/core';
import { ContextType } from 'epma-platform/models';
import { InjectorInstance } from '../../../app.module';
import { AggregateService,ContextManager,ContextManagerService,MediatorDataService,base,SLQueryCollection, Convert, ObjectHelper } from 'epma-platform/services';
import { environment } from 'src/environments/environment';
import { MockWizardDataService } from '../local-connect/services/mock-wizard.service';
import { MedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { Subject,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppLoadService {
  public static activityConsiderationEVT = new Subject();
  public static activityConsiderationArrowClick = new Subject();
  public static nodeClick = new Subject();
  public static medtabChangeFlag = new Subject();
  public static parentObjMouseEnterFlag = new BehaviorSubject('true');
  private static ContextDataTemp:any;
  public static isChildWizard = false;
  public static uniqueMgsBoxList = [];
  public static allMgsBoxList = [];
  public static allOpenWindowList = [];
  constructor() {}

  public GetWizardContextData(contextCode:string){
    let aggregateService: AggregateService = InjectorInstance.get< AggregateService >(AggregateService);
    let contextManagerService: ContextManagerService = InjectorInstance.get<ContextManagerService>(ContextManagerService);
    let requestBody = contextCode;  
    let flowID = 'GetcontextData';
    let top:any = window.top;
    if((top != undefined && top != null) && typeof(top.GetMainApp()) != 'undefined' && top.GetMainApp().LBMSReturn != null){
      top.GetMainApp().LBMSReturn = null;
    }
    if (environment.mockEnvironment != true) {
    if(MediatorDataService.isWizard == false){
      aggregateService.postAggregateData(flowID,requestBody).subscribe({
        next(data){
          let SLWizardAllData = data;
          let SLWizardData = SLWizardAllData.split("~s.l.w.f~");
          let contextData = {hidSLWizardData:'',hdnResourcePermission:'',hdnProfiles:'',hdnRTE:'',hdncontextdata:'',hdnJsNames:''};
          if(SLWizardData != null && SLWizardData.length >= 7){
            contextData.hidSLWizardData = SLWizardData[0];
            contextData.hdnResourcePermission = SLWizardData[1];
            contextData.hdnProfiles = SLWizardData[2];
            contextData.hdnRTE = SLWizardData[3];
            contextData.hdncontextdata = SLWizardData[4];
            contextData.hdnJsNames = SLWizardData[6].split("<")[0];
          }
          let hiddenQueryStringData = contextManagerService.getContextData(ContextType.CAParameters);
          
          AppLoadService.ProcessContextManagerDatas(contextData.hdncontextdata);
          AppLoadService.ProcessQueryStringDatas(hiddenQueryStringData);
          AppLoadService.prepareWizardContext();
          MediatorDataService.appReadySubject.next('completed');
        },error(msg){
         console.log(msg);
        }
      })
    }else{
      let hiddenQueryStringData = contextManagerService.getContextData(ContextType.CAParameters);
      let SLWizardAllData = GetHdnSLContextData();
      let SLWizardData = SLWizardAllData.split("~s.l.w.f~");
      let contextData = {hidSLWizardData:'',hdnResourcePermission:'',hdnProfiles:'',hdnRTE:'',hdncontextdata:'',hdnJsNames:''};
      if(SLWizardData != null && SLWizardData.length >= 7){
        contextData.hidSLWizardData = SLWizardData[0];
        contextData.hdnResourcePermission = SLWizardData[1];
        contextData.hdnProfiles = SLWizardData[2];
        contextData.hdnRTE = SLWizardData[3];
        contextData.hdncontextdata = SLWizardData[4];
        contextData.hdnJsNames = SLWizardData[6].split("<")[0];
      }
     
      AppLoadService.ProcessContextManagerDatas(contextData.hdncontextdata);
     
      AppLoadService.ProcessQueryStringDatas(hiddenQueryStringData);
      AppLoadService.prepareWizardContext();
      MediatorDataService.appReadySubject.next('completed');
    }    
  }else{
    let mockWizardDataService: MockWizardDataService =
      InjectorInstance.get<MockWizardDataService>(MockWizardDataService);
      let _mediatorDataService: MediatorDataService =
      InjectorInstance.get<MediatorDataService>(MediatorDataService);
     mockWizardDataService.getMockGetContextData().subscribe({
       next(data){
          // let SLWizardData = mockWizardDataService.getMockSLWizardData();
          let SLWizardAllData = data;
          let SLWizardData = SLWizardAllData.split("~s.l.w.f~");
          let contextData = {hidSLWizardData:'',hdnResourcePermission:'',hdnProfiles:'',hdnRTE:'',hdncontextdata:'',hdnJsNames:''};
          if(SLWizardData != null && SLWizardData.length >= 7){
            contextData.hidSLWizardData = SLWizardData[0];
            contextData.hdnResourcePermission = SLWizardData[1];
            contextData.hdnProfiles = SLWizardData[2];
            contextData.hdnRTE = SLWizardData[3];
            contextData.hdncontextdata = SLWizardData[4];
            contextData.hdnJsNames = SLWizardData[6].split("<")[0];
          }
          let hiddenQueryStringData = contextManagerService.getContextData(ContextType.CAParameters);
          
          AppLoadService.ProcessContextManagerDatas(contextData.hdncontextdata);
          AppLoadService.ProcessQueryStringDatas(hiddenQueryStringData);
          AppLoadService.prepareWizardContext();
          const MenuCode = SLQueryCollection.GetQueryStringValue("MenuCode");
            _mediatorDataService.ca = MenuCode;
            _mediatorDataService.project = MenuCode;
          MediatorDataService.appReadySubject.next('completed');
       // },error(msg){
        //  console.log(msg);
        }
     });
  }
  }

  private static ProcessContextManagerDatas(strContextManagerData:string)
  {
    let saryQueryStringData : string[] = strContextManagerData.split('&');
    for (let QueryItemIndex = 0; QueryItemIndex < saryQueryStringData.length; QueryItemIndex++)
    {
        let saryQueryStringItem : string[] = saryQueryStringData[QueryItemIndex].split('=');
        if (saryQueryStringItem.length == 2){
          if (ContextManager.Instance.GetContext(saryQueryStringItem[0]) == false)
          ContextManager.Instance.Add(saryQueryStringItem[0], saryQueryStringItem[1]);
          else
          ContextManager.Instance[saryQueryStringItem[0]] = saryQueryStringItem[1];
        }
    }
  }

  private static ProcessQueryStringDatas(strQueryStringData: string) {
    let saryQueryStringData: string[] = strQueryStringData.split('&');
    for (let QueryItemIndex = 0; QueryItemIndex < saryQueryStringData.length; QueryItemIndex++) {
      let saryQueryStringItem: string[] = saryQueryStringData[QueryItemIndex].split('=');

      if (saryQueryStringItem.length == 2) {
        if (!SLQueryCollection.dicQueryStringContext.ContainsKey(saryQueryStringItem[0]))
        SLQueryCollection.dicQueryStringContext.Add(saryQueryStringItem[0], saryQueryStringItem[1]);
        else
        SLQueryCollection.dicQueryStringContext[saryQueryStringItem[0]] = saryQueryStringItem[1];
      }
    }
    SLQueryCollection.dicQueryStringContext.Add("ContextData", strQueryStringData);
    const MenuCode: string = SLQueryCollection.GetQueryStringValue("MenuCode");;
    const CACode = AppLoadService.FetchKeyCodeForCA(MenuCode);
    if (!SLQueryCollection.dicQueryStringContext.ContainsKey("LBMCACode"))
    SLQueryCollection.dicQueryStringContext.Add("LBMCACode", CACode);
    else
    SLQueryCollection.dicQueryStringContext["LBMCACode"] = CACode;
  }

  private static FetchKeyCodeForCA(sMenuCode: string): string {
    let sCACode: string = String.Empty; 
      switch (sMenuCode) {
        case 'MN_MEDINPATSL_P2':
        case 'MN_MEDADMINISTRAT_P2':
          sCACode = 'MedPrescribeInpatient';
          break;
        case 'MN_MEDDISCHRGESL_P2':
          sCACode = 'MedPrescribeDischarge';
          break;
        case 'MN_MEDLEAVESL_P2':
          sCACode = 'MedPrescribeLeave';
          break;
        case 'MN_MEDCLERKSL_P2':
          sCACode = 'MedPrescribeClerking';
          break;
        case 'MN_MEDOUTPATSL_P2':
          sCACode = 'MedPrescribeOutpatient';
          break;
          case 'MN_MEDCHART_P2':
          sCACode = 'MAMedChart';
          break;
          case 'MN_PRESCCHART_P2':
            sCACode = 'MAPrescriptionChart';
            break;
    }
    return sCACode;
  }
  
  private static prepareWizardContext()
  {
    if(JSON.parse(SLQueryCollection.GetQueryStringValue("ContextData")).CAParameters){
    let sQueryContext = JSON.parse(SLQueryCollection.GetQueryStringValue("ContextData")).CAParameters.toString();
    
    sQueryContext = sQueryContext.replace("ContextData=~|", "");
    sQueryContext = sQueryContext.replaceAll("~|", "&");
    sQueryContext = sQueryContext.replaceAll("|~", "=");
    let saryQueryStringData :  string[] = sQueryContext.split('&');
    saryQueryStringData.forEach((sItem:string) => {
      if (sItem != null && sItem.includes("="))
      {
        base.WizardContext.Add(sItem.split('=')[0], sItem.split('=')[1]);
      }
      if(sItem.split('=')[0] == "isChildWizard"){
        AppLoadService.isChildWizard = true;
      }

    });
  }
  }
  public static LaunchWizard( OnChildWizardClose: Function,  TaskCode: string, ContextData: string, AcctyCode: any = 2): void {
    let flowID = 'GetWizardDetails';
    let reqBody = "FunctionName=GetWizardDetails&TaskCode=" + TaskCode + "&WizardType=" + AcctyCode.toString();
    this.ContextDataTemp = ContextData;
    let aggregateService: AggregateService = InjectorInstance.get<AggregateService>(AggregateService);

    let LaunchWizard_OnResult = (sender: Object, Result: string) => {
        this.LaunchWizard_OnResult(sender, Result,OnChildWizardClose);
    }

    aggregateService.postAggregateData(flowID, reqBody).subscribe({
        next(Result) {
            LaunchWizard_OnResult({},Result);
        }, error(msg) {
            LaunchWizard_OnResult({},null);
        }
    })

}
private static async LaunchWizard_OnResult(sender: Object, Result: string,OnChildWizardClose: Function) {
    if (!String.IsNullOrWhiteSpace(Result)) {
        var sPath: string = String.Empty;
        var TaskOID: number = 0;
        var sTaskCode: string = String.Empty;
        var sTitle: string = String.Empty;
        var iHeight: number = 0;
        var iWidth: number = 0;
        var iWizardSize: number = 0;
        var sMenuType: string = String.Empty;
        var strMenuCode: string = String.Empty;
        var sContextData: string = this.ContextDataTemp;
        
        Result.Trim().Split(';').forEach(strItems => {            
    
            if (!String.IsNullOrWhiteSpace(strItems)) {
                var strItem: string[] = strItems.Split('=');
                var strName: string = String.Empty;
                var strValue: string = String.Empty;
                
                if (strItem != null && strItem.Count() > 1) {
                    strName = strItem[0].Replace("var __", "").Replace("'", "").Trim().ToLower();
                    strValue = strItem[1].Replace("'", "").Trim();
                    // console.log("ssss ".Trim());

                    if (String.Compare(strName, "url") == 0)
                        sPath = strValue;
                    else if (String.Compare(strName, "taskoid") == 0)
                        TaskOID = Convert.ToInt64(strValue);
                    else if (String.Compare(strName, "taskcode") == 0)
                        sTaskCode = strValue;
                    else if (String.Compare(strName, "title") == 0)
                        sTitle = strValue;
                    else if (String.Compare(strName, "height") == 0)
                        iHeight = Convert.ToInt32(strValue);
                    else if (String.Compare(strName, "width") == 0)
                        iWidth = Convert.ToInt32(strValue);
                    else if (String.Compare(strName, "wizardsize") == 0)
                        iWizardSize = Convert.ToInt32(strValue);
                    else if (String.Compare(strName, "menutype") == 0)
                        sMenuType = strValue;
                    else if (String.Compare(strName, "menucode") == 0)
                        strMenuCode = strValue;
                }
            }
        });
        if(iHeight == 0 || iHeight == null)
        // iHeight = 780;
      iHeight = 950;
        if(iWidth == 0 || iWidth == null)
        // iWidth = 1084;
      iWidth = 1920;
        console.log("LBMLaunchChildWizard",sPath, TaskOID, sTaskCode, sTitle, iHeight, iWidth, iWizardSize, sMenuType, strMenuCode, sContextData);
      let top:any = window.top;
      if(top.msgAlert == true)
       ObjectHelper.stopFinishAndCancelEvent(false);
      let response = await LBMLaunchChildWizard(sPath, TaskOID, sTaskCode, sTitle, iHeight, iWidth, iWizardSize, sMenuType, strMenuCode, sContextData);
      if((top != undefined && top != null) && (top.msgAlert != null && top.msgAlert == true))
       ObjectHelper.stopFinishAndCancelEvent(false);
      if(response && response != ''){
        //if(top.msgAlert == true)
         //ObjectHelper.stopFinishAndCancelEvent(false);
        let contextDataCAParam = response;
        if(contextDataCAParam.Contains('"ContextData=~"')){
          contextDataCAParam = contextDataCAParam.split("ContextData=~");
          contextDataCAParam = contextDataCAParam[0] + contextDataCAParam[1].split("|~").pop();
        }
        let contextData = {ContextData:contextDataCAParam.toString()}
        if(OnChildWizardClose && OnChildWizardClose instanceof Function){
          OnChildWizardClose(contextData);
        }
        this.PrintWizardData(response);
      }
    }
}  
public static PrintWizardData(sData:string): void
{
    if(sData != null && sData != ''){
        let wizardcontextData = {};
        let arKeys = sData.split('&');
        for (let inIdx = 0; inIdx < arKeys.length; inIdx++) 
        {
            let arValue = arKeys[inIdx].split('=');
            if (arValue.length > 1) 
            {
                if (arValue[0] != "" && arValue[1] != "") 
                {				
                    if(arValue[0].length>0 && arValue[1].length>0)
                    wizardcontextData[arValue[0]] = arValue[1];					
                }
            }
        }
        if(PrintPrescription != null)
        if((wizardcontextData != null && wizardcontextData != undefined) ){
          if((wizardcontextData["MENUCODE"] == null || wizardcontextData["MENUCODE"] == '') && (wizardcontextData["MenuCode"] != null)){
            wizardcontextData["MENUCODE"] = wizardcontextData["MenuCode"];
          }
          if(wizardcontextData["MENUCODE"] != null && wizardcontextData["MenuCode"] != null && wizardcontextData["MENUCODE"] != wizardcontextData["MenuCode"]){
              wizardcontextData["MENUCODE"] = wizardcontextData["MenuCode"];
          }
          PrintPrescription(wizardcontextData["MENUCODE"], wizardcontextData["sWIZStatus"], wizardcontextData['DIS_SUM'], wizardcontextData['TypeExist'], wizardcontextData["PrescriptionDetails"], wizardcontextData['PrinterPolicy'], wizardcontextData['IsSubmitPrint'], wizardcontextData["sPatientOID"], wizardcontextData["sEncounter"], wizardcontextData['IsClnicalNote'], wizardcontextData['IPPALTLOCAL']);
        }
    }
} 
public setDialogContext(QueryString: string) {
    let sQueryContext = QueryString;
    let saryQueryStringData: string[] = sQueryContext.split('&');
    saryQueryStringData.forEach((sItem: string) => {
      if (sItem != null && sItem.includes("=")) {
        base.WizardContext.Add(sItem.split('=')[0], sItem.split('=')[1]);
      }
    });
  }
}
