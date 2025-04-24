import { Component, OnInit } from '@angular/core';
import { EventArgs, iActivityConsideration, Key, KeyEventArgs, MouseButtonEventArgs, StackPanel } from 'epma-platform/controls';
import { InjectorInstance } from 'src/app/app.module';
import { AggregateService } from './aggregate.service';
import { Convert } from './convert.service';
import { BBWizard } from './epma-Bbwizard';
import { List } from '../models/list';
import { LzoWizardVmbaseService as LzoWizardVMBase } from './lzo-wizard-vmbase.service';
import { MessageBoxButton, MessageBoxType, MessageEventArgs, iMessageBox } from './iMessageBox.service';
import { ObjectHelper } from './objecthelper.service';
import { base } from './lbm-wizard-base.service';

@Component({
  selector: 'app-Lzowizard',
  template: ''
})
export class LzoWizard extends BBWizard  implements OnInit{
//export class LzoWizard implements OnInit {
    Loaded: Function;
    constructor(){
        super();
        this.LzoWizard_Loaded({},{});
    }
//   constructor() { 
//     // try {
//     //     InitializeComponent();
//     //     this.Loaded += new RoutedEventHandler(this.LzoWizard_Loaded);
//     //     HtmlPage.RegisterScriptableObject("objSLWizard", this);
//     // }
//     // catch (ex) {

//     // }
//   }

    public DataContext : any;
    public sName: string;
    // private cntxtPatientBanner: iContextBar = new iContextBar();
    public ActivityConsideration: iActivityConsideration = new iActivityConsideration();
    private spActivityConsd: StackPanel = new StackPanel();
    LaunchWizardCollection:List<string> = new List<string>();
    
    
    LzoWizard_Loaded(sender: Object, e: EventArgs): void {
        
    }
    helpExtender_KeyDown(sender: Object, e: KeyEventArgs): void {
        if (e.Key == Key.Enter || e.Key == Key.Space)
        {
            // super.OnHelp(this);
        }
    }
    public OnBeforeClose(): void {
            

    }
    public Help(AppActivityHelpCode: string): void {
        // super.OnHelp(this, AppActivityHelpCode);
    }
    imgHelp_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
        // super.OnHelp(this);
    }
 
    private ContextDataTemp: string = String.Empty;
    public LaunchWizard(TaskCode: string, ContextData: string, AcctyCode: any = 0, pHeight?: number, pWidth?: number): void {
        let flowID = 'GetWizardDetails';
        let reqBody = "FunctionName=GetWizardDetails&TaskCode=" + TaskCode + "&WizardType=" + AcctyCode.toString();
        let aggregateService: AggregateService = InjectorInstance.get<AggregateService>(AggregateService);
        let wizardcontextStr = '';
        let exclusionList = ["WIZ_TaskOID","WIZ_InstanceOID","WIZ_CAOID","WIZ_CACode","WIZ_TaskStatus","MENUCODE","RequestLockOID","WIZ_Size","MenuCode","WIZ_TaskCode","TaskOID","WIZ_Lvl"];
        Object.keys(base.WizardContext).forEach((key,i)=>{
            if(key != 'objWizardContext' && !ContextData.includes(key) && !exclusionList.includes(key)){
              {
              if(key == 'sWizardContext' && base.WizardContext['sWizardContext'] != ''){
                wizardcontextStr = wizardcontextStr + '&' + key + '=' + base.WizardContext[key];
              }else if(key != 'sWizardContext'){
                wizardcontextStr = wizardcontextStr + '&' + key + '=' + base.WizardContext[key];
              }
              if(i== Object.keys(base.WizardContext).length - 1)
              wizardcontextStr = wizardcontextStr + '&';
              }
            }
          });
          ContextData = ContextData + wizardcontextStr;
          this.ContextDataTemp = ContextData;
        let LaunchWizard_OnResult = (sender: Object, Result: string) => {
            let lHeight = pHeight;
            let lWidth = pWidth;
            this.LaunchWizard_OnResult(sender, Result, lHeight, lWidth);
        }

        aggregateService.postAggregateData(flowID, reqBody).subscribe({
            next(Result) {
                LaunchWizard_OnResult({},Result);
            }, error(msg) {
                LaunchWizard_OnResult({},null);
            }
        })

    }
    public async LaunchWizard_OnResult(sender: Object, Result: string, lHeight?: number, lWidth?: number): Promise<void> {
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
            {
                if(lHeight == 0 || lHeight == null)
                    iHeight = 950;
                else
                    iHeight = lHeight;
            }
            if(iWidth == 0 || iWidth == null)
            {
                if(lWidth == 0 || lWidth == null)
                    iWidth = 1920;
                else
                    iWidth = lWidth;
            }
           this.LaunchWizardCollection.Add("VM");
           let top:any = window.top;
           if(top.msgAlert == true)
            ObjectHelper.stopFinishAndCancelEvent(false);
           let returnvalue = await LBMLaunchChildWizard(sPath, TaskOID, sTaskCode, sTitle, iHeight, iWidth, iWizardSize, sMenuType, strMenuCode, sContextData);
           this.SetChildWizardData(returnvalue);
           this.PrintWizardData(returnvalue);
           if(top.msgAlert == true)
            ObjectHelper.stopFinishAndCancelEvent(false);
        }
    }
    public PrintWizardData(sData:string): void
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
    public SetChildWizardData(sData:string): void
    {
        let DataContext = this;
        if(this.LaunchWizardCollection != null && this.LaunchWizardCollection.Count > 0) {
            if (String.Compare(this.LaunchWizardCollection[this.LaunchWizardCollection.Count - 1], "VM") == 0){
                (DataContext as any as LzoWizardVMBase).GetChildWizardData(sData);
            }else{

            }
        }
    }
    public static ShowErrorMessage(errorID,defaultmsg,ctrlfocus?,msgbox?,title?,parameters?): void {
        if(typeof(title) == 'undefined' || title== null || title== "") title = 'LORENZO';
        let msgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
          Title: title,
          Message: defaultmsg,
          IconType: MessageBoxType.Exclamation,
          MessageButton: MessageBoxButton.OK,
        });
        msgBox.MessageBoxClose = (s, e) => {
          this.msgBox_MessageBoxClose(s, e);
        };
        msgBox.Show();
      }
      private static msgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        
      }
}