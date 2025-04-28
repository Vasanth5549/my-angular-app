import { Component, OnInit } from '@angular/core';
import {
  StringBuilder,
  ProfileFactoryType,
  ContextManager,
  Convert,
  AppActivity,
  Regex,
  ScriptObject,
} from 'epma-platform/services';
import {
  Level,
  ProfileContext,
  OnProfileResult,
  IProfileProp,
  Byte,
  Decimal,
  decimal,
  Double,
  Float,
  Int64,
  long,
  Long,
  StringComparison,
  AppDialogEventargs,
  AppDialogResult,
  DelegateArgs,
  DialogComponentArgs,
  WindowButtonType,
  ObservableCollection,
  HtmlPage,
} from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService } from '../../shared/epma-platform/soap-client/helper.service';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import {
  MessageEventArgs,
  MessageBoxResult,
  iMessageBox,
  MessageBoxButton,
  MessageBoxType,
  MessageBoxDelegate,
} from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import * as IPPMAManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { anyChanged } from '@progress/kendo-angular-common';
import { WizardContextCollection } from 'src/app/shared/epma-platform/services/ContextCollection.service';
import 'epma-platform/booleanextension';
import 'epma-platform/numberextension';
import 'epma-platform/stringextension';
import {iMath} from 'epma-platform/mathextension';
import 'epma-platform/arrayextension';
import { DataConversionService } from 'src/app/shared/epma-platform/services/data-conversion.service';
export class PrintUtility {
  constructor() {}
  public Print(
    oRes: ObservableCollection<IPPMAManagePrescSer.PrescriptionResponse>,
    sPrinterPolcy: string,
    WizardContext: string,
    consolidatetemplate: string,
    consolidatetemplateName: string,
    sprestype: string,
    isprint: boolean,
    isconsolidatedprint: boolean,
    ConsolidatedPrinterPolicy: string,
    out1: (sPrescriptionDetails: string) => void,
    out2: (AltLocalPrint: string) => void
  ): void {
    let sPrescriptionDetails: string;
    let AltLocalPrint: string;
    sPrescriptionDetails = String.Empty;
    AltLocalPrint = String.Empty;
    //let strWizardContext: string = (<WizardContextCollection>WizardContext)
     // .sWizardContext;
     let strWizardContext = WizardContext;
    if (oRes != null && oRes.Count > 0) {
      if (oRes[0].Chooseprinter == null) oRes[0].Chooseprinter = 'C';
     // let Response: string = PrintUtility.SerializeToJsonString(oRes.ToArray());
     let Responseobj = DataConversionService.ConverttoJson(oRes);
      let Response: string =  PrintUtility.SerializeToJsonString(Responseobj);
	  //TFS 55294 - For multipe CD drugs, below replace to happen further to print
      Response= Response.replaceAll('"IsControlledDrug":"48"','"IsControlledDrug":"0"');
        Response= Response.replaceAll('"IsControlledDrug":"49"','"IsControlledDrug":"1"');
      // let sDateRegExp: string = "\\/Date\((-*\d+)[\+\s]\d+\)\\/";
      // let matchEvaluator: MatchEvaluator = new MatchEvaluator(PrintUtility.ConvertJsonDateToDateString);
      // let reg: Regex = new Regex(sDateRegExp);
      // let jsonResString: string = reg.Replace(Response, matchEvaluator);
      let jsonResString: string = Response.replace(
        /\Date\((-*\d+)[\+\s]\d+\)/g,
        (a, b) => {
          return PrintUtility.ConvertJsonDateToDateString(b);
        }
      );
      let obj: ScriptObject;
      if (isprint && !isconsolidatedprint) {
        obj = ObjectHelper.CreateType<ScriptObject>(
          HtmlPage.Window.Invoke(
            'AjaxPrint',
            jsonResString,
            sPrinterPolcy,
            strWizardContext
          ),
          'ScriptObject'
        );
      } else if (!isprint && isconsolidatedprint) {
        obj = ObjectHelper.CreateType<ScriptObject>(
          HtmlPage.Window.Invoke(
            'ConsolidatedPrint',
            jsonResString,
            ConsolidatedPrinterPolicy,
            strWizardContext,
            consolidatetemplate,
            consolidatetemplateName,
            sprestype
          ),
          'ScriptObject'
        );
      } else {
        obj = ObjectHelper.CreateType<ScriptObject>(
          HtmlPage.Window.Invoke(
            'SessionConsolidatePrint',
            jsonResString,
            sPrinterPolcy,
            ConsolidatedPrinterPolicy,
            strWizardContext,
            consolidatetemplate,
            consolidatetemplateName,
            sprestype
          ),
          'ScriptObject'
        );
      }
      if (obj.GetProperty('PrescriptionDetails') != null) {
        sPrescriptionDetails = obj
          .GetProperty('PrescriptionDetails')
          .ToString();
      }
      if (obj.GetProperty('IPPALTLOCAL') != null) {
        AltLocalPrint = obj.GetProperty('IPPALTLOCAL').ToString();
      }
    }
    out1(sPrescriptionDetails);
    out2(AltLocalPrint);
  }
  public ClinicallyPrint(
    sPresOID: string,
    sPrestype: string,
    ActivityName: string,
    sPrinterPolcy: string,
    WizardContext: Object,
    sPATOID: string,
    consolidatetemplate: string,
    consolidatetemplateName: string,
    isprint: boolean,
    isconsolidatedprint: boolean,
    ConsolidatedPrinterPolicy: string,
    out1: (sPrescriptionDetails: string) => void,
    out2: (sPrintedPrescOIDs: string) => void,
    out3: (sTemplatemethodname: string) => void,
    out4: (sCrctPATIENTOID: string) => void,
    out5: (AltLocalPrint: string) => void
  ): void {
    let sPrescriptionDetails: string;
    let sPrintedPrescOIDs: string;
    let sTemplatemethodname: string;
    let sCrctPATIENTOID: string;
    let AltLocalPrint: string;
    sPrescriptionDetails = String.Empty;
    sPrintedPrescOIDs = String.Empty;
    sTemplatemethodname = String.Empty;
    AltLocalPrint = String.Empty;
    //let strWizardContext: string = (<WizardContextCollection>WizardContext)
    //  .sWizardContext;
    let obj: ScriptObject;
    if (isprint && !isconsolidatedprint) {
      obj = ObjectHelper.CreateType<ScriptObject>(
        HtmlPage.Window.Invoke(
          'AjaxClinicallyPrint',
          sPresOID,
          sPrinterPolcy,
          WizardContext,
          sPATOID
        ),
        'ScriptObject'
      );
    } else if (!isprint && isconsolidatedprint) {
      obj = ObjectHelper.CreateType<ScriptObject>(
        HtmlPage.Window.Invoke(
          'ConsolidatedPrint',
          sPresOID,
          ConsolidatedPrinterPolicy,
          WizardContext,
          consolidatetemplate,
          consolidatetemplateName,
          sPrestype,
          ActivityName
        ),
        'ScriptObject'
      );
    } else {
      obj = ObjectHelper.CreateType<ScriptObject>(
        HtmlPage.Window.Invoke(
          'SessionConsolidatePrint',
          sPresOID,
          sPrinterPolcy,
          ConsolidatedPrinterPolicy,
          WizardContext,
          consolidatetemplate,
          consolidatetemplateName,
          sPrestype,
          ActivityName,
          sPATOID
        ),
        'ScriptObject'
      );
    }
    sPrescriptionDetails = obj.GetProperty('PrescriptionDetails').ToString();
    sPrintedPrescOIDs = obj.GetProperty('PrintedPrescOIDs').ToString();
    if (obj.GetProperty('Templatemethodname') != null) {
      sTemplatemethodname = obj.GetProperty('Templatemethodname').ToString();
    }
    if (obj.GetProperty('CrctPATIENTOID') != null) {
      sCrctPATIENTOID = obj.GetProperty('CrctPATIENTOID').ToString();
    } else sCrctPATIENTOID = sPATOID;
    if (obj.GetProperty('IPPALTLOCAL') != null) {
      AltLocalPrint = obj.GetProperty('IPPALTLOCAL').ToString();
    }
    out1(sPrescriptionDetails);
    out2(sPrintedPrescOIDs);
    out3(sTemplatemethodname);
    out4(sCrctPATIENTOID);
    out5(AltLocalPrint);
  }
  public TechValidatePrint(
    sPresOID: string,
    sPrestypes: string,
    sPrinterPolcy: string,
    WizardContext: Object,
    sPATOID: string,
    consolidatedtemplate: string,
    consolidatedtemplateName: string,
    IsConsolidatedPrint: boolean,
    IsPrint: boolean,
    ConsolidatedPrinterPolicy: string,
    out1: (sPrescriptionDetails: string) => void,
    out2: (AltLocalPrint: string) => void
  ): void {
    let sPrescriptionDetails: string;
    let AltLocalPrint: string;
    sPrescriptionDetails = String.Empty;
    AltLocalPrint = String.Empty;
   // let strWizardContext: string = (<WizardContextCollection>WizardContext)
   //   .sWizardContext;

    let obj: ScriptObject;
    if (IsPrint && !IsConsolidatedPrint) {
      obj = ObjectHelper.CreateType<ScriptObject>(
        HtmlPage.Window.Invoke(
          'AjaxTechValidatePrint',
          sPresOID,
          sPrinterPolcy,
          WizardContext,
          sPATOID
        ),
        'ScriptObject'
      );
    } else if (!IsPrint && IsConsolidatedPrint) {
      obj = ObjectHelper.CreateType<ScriptObject>(
        HtmlPage.Window.Invoke(
          'ConsolidatedPrint',
          sPresOID,
          ConsolidatedPrinterPolicy,
          WizardContext,
          consolidatedtemplate,
          consolidatedtemplateName,
          sPrestypes,
          'Technically validate'
        ),
        'ScriptObject'
      );
    } else {
      obj = ObjectHelper.CreateType<ScriptObject>(
        HtmlPage.Window.Invoke(
          'SessionConsolidatePrint',
          sPresOID,
          sPrinterPolcy,
          ConsolidatedPrinterPolicy,
          WizardContext,
          consolidatedtemplate,
          consolidatedtemplateName,
          sPrestypes,
          'Technically validate',
          sPATOID
        ),
        'ScriptObject'
      );
    }
    if (obj.GetProperty('PrescriptionDetails') != null) {
      sPrescriptionDetails = obj.GetProperty('PrescriptionDetails').ToString();
    }
    if (obj.GetProperty('IPPALTLOCAL') != null) {
      AltLocalPrint = obj.GetProperty('IPPALTLOCAL').ToString();
    }
    out1(sPrescriptionDetails);
    out2(AltLocalPrint);
  }
  public CNSPrint(
    oRes: ObservableCollection<IPPMAManagePrescSer.PrescriptionResponse>,
    sPrinterPolcy: string,
    WizardContext: Object,
    out1: (sPrescriptionDetails: string) => void,
    out2: (AltLocalPrint: string) => void
  ): void {
    let sPrescriptionDetails: string;
    let AltLocalPrint: string;
    sPrescriptionDetails = String.Empty;
    AltLocalPrint = String.Empty;
 //   let strWizardContext: string = (<WizardContextCollection>WizardContext)
  //    .sWizardContext;
       let strWizardContext = WizardContext;
    if (oRes != null && oRes.Count > 0) {
      if (oRes[0].Chooseprinter == null) oRes[0].Chooseprinter = 'C';
      
       let Responseobj = DataConversionService.ConverttoJson(oRes);
      let Response: string =  PrintUtility.SerializeToJsonString(Responseobj);
      // let sDateRegExp: string = "\\/Date\((-*\d+)[\+\s]\d+\)\\/";
      // let matchEvaluator: MatchEvaluator = new MatchEvaluator(PrintUtility.ConvertJsonDateToDateString);
      // let reg: Regex = new Regex(sDateRegExp);
      // let jsonResString: string = reg.Replace(Response, matchEvaluator);
      let jsonResString: string = Response.replace(
        /\Date\((-*\d+)[\+\s]\d+\)/g,
        (a, b) => {
          return PrintUtility.ConvertJsonDateToDateString(b);
        }
      );
      let obj: ScriptObject = ObjectHelper.CreateType<ScriptObject>(
        HtmlPage.Window.Invoke(
          'AjaxCNSPrint',
          jsonResString,
          sPrinterPolcy,
          strWizardContext
        ),
        'ScriptObject'
      );
      if (obj.GetProperty('PrescriptionDetails') != null) {
        sPrescriptionDetails = obj
          .GetProperty('PrescriptionDetails')
          .ToString();
      }
      if (obj.GetProperty('IPPALTLOCAL') != null) {
        AltLocalPrint = obj.GetProperty('IPPALTLOCAL').ToString();
      }
    }
    out1(sPrescriptionDetails);
    out2(AltLocalPrint);
  }
  private static ConvertJsonDateToDateString(m: any): string {
    let result: string = String.Empty;
    let dt: DateTime = new DateTime(1970, 1, 1);
    dt = dt.AddMilliseconds(Number.Parse(m));
    dt = dt.ToLocalTime();
    result = dt.ToString('yyyy-MM-dd HH:mm:ss');
    return result;
  }
  public static SerializeToJsonString(
    objectToSerialize: IPPMAManagePrescSer.PrescriptionResponse[]
  ): string {
    // let ms: MemoryStream = new MemoryStream()
    // try {
    //     let serializer: DataContractJsonSerializer = new DataContractJsonSerializer(objectToSerialize.GetType());
    //     serializer.WriteObject(ms, objectToSerialize);
    //     ms.Position = 0;
    //     let reader: StreamReader = new StreamReader(ms)
    //     try {
    //         return reader.ReadToEnd();
    //     }
    //     finally {
    //         if (reader != null) reader.Dispose();
    //     }
    // }
    // finally {
    //     if (ms != null) ms.Dispose();
    // }
    return JSON.stringify(objectToSerialize);
  }
}
