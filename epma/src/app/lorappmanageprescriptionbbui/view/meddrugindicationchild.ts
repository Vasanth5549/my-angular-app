import { Component, OnInit, ViewChild } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, ScriptObject} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow, HtmlPage, List, CListItem, StringSplitOptions } from 'epma-platform/models';
import { AppDialog, Grid, iLabel, iTerminologyBrowser,iCheckedListbox, KeyEventArgs } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import { DataItemDetails, SubsetDetails } from '../model/conditionaldose';
import { Common } from '../utilities/common';
import { CConstants } from '../utilities/constants';
import { CResMsgGetProblem, CResMsgGetProcessingOptionIndications, GetProblemCompletedEventArgs, GetProcessingOptionIndicationsCompletedEventArgs, ManagePrescriptionWSSoapClient, PatientProblem } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import * as ManagePrescSer from '../../shared/epma-platform/soap-client/ManagePrescriptionWS';
import { MedicationPrescriptionHelper } from 'src/app/lorappmedicationcommonbb/utilities/medicationprescriptionhelper';
import { TextWrapping } from 'src/app/shared/epma-platform/controls-model/TextWrapping';
import { DrugItemBasicData } from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { AppSessionInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { Resource } from '../resource';
import { BrowserDetails, TerminologyBrowserEventArgs, iTerminologyUtility, EnumControlMode } from 'src/app/shared/epma-platform/controls/epma-iTerminologyBrowser/epma-iTerminologyBrowser.component';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { Subject, debounceTime, throttleTime } from 'rxjs';
import { debounce } from 'lodash';

@Component({
    selector: 'meddrugindicationChild',
    templateUrl: './meddrugindicationchild.html'    
  })
  
export class meddrugindicationChild extends iAppDialogWindow {
        private LayoutRoot: Grid;
@ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid){
    if(c){ this.LayoutRoot  = c; }
};
private lblPatientProblems: iLabel;
@ViewChild("lblPatientProblemsTempRef", {read:iLabel, static: false }) set _lblPatientProblems(c: iLabel){
    if(c){ this.lblPatientProblems  = c; }
};
public lstPatientProblems: iCheckedListbox;
@ViewChild("lstPatientProblemsTempRef", {read:iCheckedListbox, static: false }) set _lstPatientProblems(c: iCheckedListbox){
    if(c){ this.lstPatientProblems  = c; }
};
private lblAssocIndications: iLabel;
@ViewChild("lblAssocIndicationsTempRef", {read:iLabel, static: false }) set _lblAssocIndications(c: iLabel){
    if(c){ this.lblAssocIndications  = c; }
};
public lstAssocIndications: iCheckedListbox;
@ViewChild("lstAssocIndicationsTempRef", {read:iCheckedListbox, static: false }) set _lstAssocIndications(c: iCheckedListbox){
    if(c){ this.lstAssocIndications  = c; }
};
public trmBrowser: iTerminologyBrowser;
@ViewChild("trmBrowserTempRef", {read:iTerminologyBrowser, static: false }) set _trmBrowser(c: iTerminologyBrowser){
    if(c){ this.trmBrowser  = c; }
};
        public Styles = ControlStyles;
        public mldetails = Resource.Medlistdetails;
        private oResolveItem: PrescriptionItemVM;
        private sProblem: string;
        public sProblem1: string;
        public sProbCod: string[];
        private SnowMedValue: boolean = false;
        public sProbCd: string = String.Empty;
        private oReturn: ScriptObject;
        public sText: string;
        public sProblemCode: string;
	    private searchSubject = new Subject<string>();
        public sCodingSchemeName: string;
        public sCodingSchemeVersion: string;
        public sProblemNameECOID: string;
        public sProblemNameOID: string;
        constructor() {
            super();
            //InitializeComponent();
            //Below code moved to constructorImpl
            /*this.sProblem = sText;
            if (sProblemCode != null && sProblemCode.length > 0) {
                let sProblmCode: string[];
                this.sProbCod = sProblemCode.Split('!');
                let nCnt = this.sProbCod.length;
                for (let i: number = 0; i < nCnt; i++) {
                    sProblmCode = this.sProbCod[i].Split('#');
                    if (sProblmCode.Contains("PROBLEMSFS") && sProblmCode.Contains("SNOMED CT") && !String.IsNullOrEmpty(sProblmCode[0]) && !String.IsNullOrEmpty(sProblmCode[1])) {
                        this.sProbCd = sProblmCode[0];
                        this.sProblem1 = sProblmCode[1];
                    }
                }
            }
            if (this.oReturn == null) {
                this.oReturn = ObjectHelper.CreateType<ScriptObject>(HtmlPage.Window.Invoke("GetSubsetIDsORDataItemOID"), ScriptObject);
            }
            let oSubsetDetailst: List<SubsetDetails> = new List<SubsetDetails>();
            let oDataItemDetailst: List<DataItemDetails> = new List<DataItemDetails>();
            let oLaunchfrmIDs: string = String.Empty;
            Common.GetHIMSubsetIDORDataItemOID(this.oReturn, (o1) => { oSubsetDetailst = o1; }, (o2) => { oLaunchfrmIDs = o2; }, (o3) => { oDataItemDetailst = o3; });
            this.trmBrowser.oTerminologyUtility = new iTerminologyUtility();
            this.trmBrowser.oTerminologyUtility.HRAText = CConstants.HRAText;
            if (oSubsetDetailst != null && oSubsetDetailst.Count > 0) {
                this.trmBrowser.oTerminologyUtility.oSubsetDetails = oSubsetDetailst;
            }
            if (oDataItemDetailst != null && oDataItemDetailst.Count > 0) {
                this.trmBrowser.oTerminologyUtility.oDataItemDetails = oDataItemDetailst;
            }
            this.trmBrowser.oTerminologyUtility.LaunchFrom = oLaunchfrmIDs;
            if (!String.IsNullOrEmpty(oLaunchfrmIDs)) {
                this.trmBrowser.oTerminologyUtility.HasAssociationsPasses = true;
            }
            else {
                this.trmBrowser.oTerminologyUtility.HasAssociationsPasses = false;
            }*/
        }

        constructorImpl(sText: string, sProblemCode: string) {
            this.sText = sText;
            this.sProblemCode = sProblemCode;            
        }
        constructorImplCntrls()
        {
            this.sProblem = this.sText;
            if (this.sProblemCode != null && this.sProblemCode.length > 0) {
                let sProblmCode: string[];
                this.sProbCod = this.sProblemCode.Split('!');
                let nCnt = this.sProbCod.length;
                for (let i: number = 0; i < nCnt; i++) {
                    sProblmCode = this.sProbCod[i].Split('#');
                    if (sProblmCode.Contains("PROBLEMSFS") && sProblmCode.Contains("SNOMED CT") && !String.IsNullOrEmpty(sProblmCode[0]) && !String.IsNullOrEmpty(sProblmCode[1])) {
                        this.sProbCd = sProblmCode[0];
                        this.sProblem1 = sProblmCode[1];
                    }
                }
            }
            if (this.oReturn == null) {
                this.oReturn = ObjectHelper.CreateType<ScriptObject>(HtmlPage.Window.Invoke("GetSubsetIDsORDataItemOID"), ScriptObject);
            }
            let oSubsetDetailst: List<SubsetDetails> = new List<SubsetDetails>();
            let oDataItemDetailst: List<DataItemDetails> = new List<DataItemDetails>();
            let oLaunchfrmIDs: string = String.Empty;
            Common.GetHIMSubsetIDORDataItemOID(this.oReturn, (o1) => { oSubsetDetailst = o1; }, (o2) => { oLaunchfrmIDs = o2; }, (o3) => { oDataItemDetailst = o3; });
            this.trmBrowser.oTerminologyUtility = new iTerminologyUtility();
            this.trmBrowser.oTerminologyUtility.HRAText = CConstants.HRAText;
            if (oSubsetDetailst != null && oSubsetDetailst.Count > 0) {
                this.trmBrowser.oTerminologyUtility.oSubsetDetails = oSubsetDetailst;
            }
            if (oDataItemDetailst != null && oDataItemDetailst.Count > 0) {
                this.trmBrowser.oTerminologyUtility.oDataItemDetails = oDataItemDetailst;
            }
            this.trmBrowser.oTerminologyUtility.LaunchFrom = oLaunchfrmIDs;
            if (!String.IsNullOrEmpty(oLaunchfrmIDs)) {
                this.trmBrowser.oTerminologyUtility.HasAssociationsPasses = true;
            }
            else {
                this.trmBrowser.oTerminologyUtility.HasAssociationsPasses = false;
            }
        }
        ngAfterViewInit(): void {
            this.constructorImplCntrls();
            this.ChildWindow_Loaded({},null);
            this.lstPatientProblems.listboxControl.selectItem(0);
            this.trmBrowser.Focus();
            let objCodingSchemeVersion = HtmlPage.Window.Invoke('CodingSchemeVersion');            
            if(objCodingSchemeVersion != null)
            {                
                this.sCodingSchemeName = !String.IsNullOrEmpty(objCodingSchemeVersion.CurrentCodingSchemeName) ? objCodingSchemeVersion.CurrentCodingSchemeName : String.Empty;
                this.sCodingSchemeVersion = !String.IsNullOrEmpty(objCodingSchemeVersion.CurrentCodingSchemeVersion) ? objCodingSchemeVersion.CurrentCodingSchemeVersion : String.Empty;
                this.sProblemNameOID = !String.IsNullOrEmpty(objCodingSchemeVersion.ProblemNameOID) ? objCodingSchemeVersion.ProblemNameOID : String.Empty;
                this.sProblemNameECOID = !String.IsNullOrEmpty(objCodingSchemeVersion.ProblemNameECOID) ? objCodingSchemeVersion.ProblemNameECOID : String.Empty;

                this.trmBrowser.oTerminologyUtility.CodingSchemeName = this.sCodingSchemeName;
                this.trmBrowser.oTerminologyUtility.CodingSchemeVersion = this.sCodingSchemeVersion;                
                if(!String.IsNullOrEmpty(PatientContext.EncounterCode) && String.Equals(PatientContext.EncounterCode, "CC_ACCEM",StringComparison.InvariantCultureIgnoreCase))
                {
                    this.trmBrowser.oTerminologyUtility.DataItemOIDs = this.sProblemNameECOID + ":CC_PRBDIAG:true";
                    this.trmBrowser.oTerminologyUtility.DataItemName = "ProblemView.ProblemNameEC";
                }
                else
                {
                    this.trmBrowser.oTerminologyUtility.DataItemOIDs = this.sProblemNameOID + ":CC_PRBDIAG:true";
                    this.trmBrowser.oTerminologyUtility.DataItemName = "ProblemView.ProblemName";
                }
            }
        }
        objServiceProxy: ManagePrescriptionWSSoapClient;
        private ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
            this.oResolveItem = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
            this.trmBrowser.IsReadOnly = false;
            this.trmBrowser.ControlMode = EnumControlMode.Search;
            if (this.oResolveItem != null && !String.IsNullOrEmpty(this.oResolveItem.FormViewerDetails.BasicDetails.PatientProblemCode) && this.oResolveItem.FormViewerDetails.BasicDetails.PatientProblemCode.Contains("PROBLEMSFS")) {
                let arrSelProbIndi: string[] = this.oResolveItem.FormViewerDetails.BasicDetails.PatientProblemCode.Split('!');
                let arrSelProb: string[];
                arrSelProbIndi.forEach( (sProbIndi)=> {
                    if (sProbIndi.Contains("PROBLEMSFS")) {
                        arrSelProb = sProbIndi.Split('#');
                        this.trmBrowser.oTerminologyUtility.SearchText = arrSelProb[1];
                        this.SnowMedValue = true;
                        let oBrowserDetails: BrowserDetails = new BrowserDetails(arrSelProb[1]);
                        oBrowserDetails.SNOMEDDescriptionID = arrSelProb[7];
                        oBrowserDetails.SNOMEDConceptID = arrSelProb[2];
                        oBrowserDetails.Description = arrSelProb[1];
                        this.trmBrowser.Text = arrSelProb[1];
                        if (this.trmBrowser.Text != '') {
                            this.trmBrowser.isSearchdisabled = true;
                            this.trmBrowser.isTextBoxDisabled = true;
                          }
                        var snomedBrowserTempValue = arrSelProb[1].replace('[',' [').split(" ");                        
                        snomedBrowserTempValue.forEach((el,i)=>{
                            if(el.includes(']')){
                        snomedBrowserTempValue.splice(i,1)
                            }
                        })
                        this.trmBrowser.snoomedbrowsertext = snomedBrowserTempValue.join(" ").trim();
                        this.trmBrowser.oTerminologyUtility.oTerminologyBrowserEventArgs = new TerminologyBrowserEventArgs(oBrowserDetails);
                    }
                });
            }
            if (!String.IsNullOrEmpty(this.oResolveItem.FormViewerDetails.BasicDetails.IdentifyingName) && !String.IsNullOrEmpty(this.oResolveItem.FormViewerDetails.BasicDetails.IdentifyingType) && this.oResolveItem.FormViewerDetails.BasicDetails.IdentifyingOID > 0) {
                this.objServiceProxy = new ManagePrescriptionWSSoapClient();
                this.objServiceProxy.GetProblemCompleted  = (s,e) => { this.objServiceProxy_GetProblemCompleted(s,e); } ;
                let objReqProb: ManagePrescSer.CReqMsgGetProblem = new ManagePrescSer.CReqMsgGetProblem();
                objReqProb.PatientOIDBC = PatientContext.PatientOID;
                let sImageList: string;
                objReqProb.SealRecordListBC = MedicationPrescriptionHelper.GetSealDrugs(CConstants.PatConf_Problem, (o) => { sImageList = o; });
                objReqProb.oContextInformation = Common.FillContext();
                this.objServiceProxy.GetProblemAsync(objReqProb);
            }
        }
        objServiceProxy_GetProblemCompleted(sender: Object, e: GetProblemCompletedEventArgs): void {
            if (e.Error != null)
                return
            let objResProb: CResMsgGetProblem = e.Result;
            if (objResProb.PatientProblem != null && objResProb.PatientProblem.Count > 0) {
                if (objResProb != null) {
                    objResProb.PatientProblem.forEach( (oPatProb)=> {
                        let bSelected: boolean = (!String.IsNullOrEmpty(this.sProblem) ? this.sProblem.Contains(oPatProb.ProblemName) : false);
                        this.lstPatientProblems.AddItem(ObjectHelper.CreateObject(new CListItem(), {
                            DisplayText: oPatProb.ProblemName,
                            Value: this.AppendPatientProblems(oPatProb),
                            IsSelected: bSelected,
                            TextWrapping: TextWrapping.Wrap
                        }));
                    });
                }
            }
            this.objServiceProxy = new ManagePrescriptionWSSoapClient();
            this.objServiceProxy.GetProcessingOptionIndicationsCompleted  = (s,e) => { this.objServiceProxy_GetProcessingOptionIndicationsCompleted(s,e); } ;
            let objReqProOptInd: ManagePrescSer.CReqMsgGetProcessingOptionIndications = new ManagePrescSer.CReqMsgGetProcessingOptionIndications();
            objReqProOptInd.oDrugItemBasicDataBC = new DrugItemBasicData();
            objReqProOptInd.oDrugItemBasicDataBC.IdentifyingOID = this.oResolveItem.FormViewerDetails.BasicDetails.IdentifyingOID;
            objReqProOptInd.oDrugItemBasicDataBC.IdentifyingType = this.oResolveItem.FormViewerDetails.BasicDetails.IdentifyingType;
            objReqProOptInd.oDrugItemBasicDataBC.MCVersionNo = String.IsNullOrEmpty(this.oResolveItem.FormViewerDetails.BasicDetails.MCVersion) ? AppSessionInfo.AMCV : this.oResolveItem.FormViewerDetails.BasicDetails.MCVersion;
            objReqProOptInd.oContextInformation = Common.FillContext();
            this.objServiceProxy.GetProcessingOptionIndicationsAsync(objReqProOptInd);
        }
        private AppendPatientProblems(objProb: PatientProblem): string {
            let strProb: StringBuilder = new StringBuilder();
            strProb.Append(objProb.ProblemOID);
            strProb.Append(",");
            strProb.Append(objProb.Term != null ? objProb.Term : String.Empty);
            strProb.Append(",");
            strProb.Append(objProb.Code != null ? objProb.Code : String.Empty);
            strProb.Append(",");
            strProb.Append(objProb.CodingschemeCode != null ? objProb.CodingschemeCode : String.Empty);
            strProb.Append(",");
            strProb.Append(objProb.Version != null ? objProb.Version : String.Empty);
            strProb.Append(",");
            strProb.Append(objProb.TermKey != null ? objProb.TermKey : String.Empty);
            strProb.Append(",");
            return strProb.ToString();
        }
        objServiceProxy_GetProcessingOptionIndicationsCompleted(sender: Object, e: GetProcessingOptionIndicationsCompletedEventArgs): void {
            if (e.Error != null)
                return
            let objResProcOpt: CResMsgGetProcessingOptionIndications = <CResMsgGetProcessingOptionIndications>e.Result;
            if (objResProcOpt.oProcessingOptionIndications == null || objResProcOpt.oProcessingOptionIndications.Count == 0)
                return
            let arrIndicationTerm: string[] = null;
            if (!String.IsNullOrEmpty(this.sProblem)) {
                arrIndicationTerm = this.sProblem.Split("~^", StringSplitOptions.RemoveEmptyEntries);
            }
            if (objResProcOpt != null && objResProcOpt.oProcessingOptionIndications != null && objResProcOpt.oProcessingOptionIndications.Count > 0) {
                objResProcOpt.oProcessingOptionIndications.forEach( (oInd)=> {
                    this.lstAssocIndications.AddItem(ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: oInd.Term,
                        Value: oInd.Code + "," + oInd.CodingschemeCode + "," + oInd.Version + "," + oInd.TermKey,
                        //IsSelected: arrIndicationTerm != null ? arrIndicationTerm.Contains(oInd.Term, StringComparer.InvariantCultureIgnoreCase) : false,
                        IsSelected: arrIndicationTerm != null ? arrIndicationTerm.Contains(oInd.Term) : false,
                        TextWrapping: TextWrapping.Wrap
                    }));
                });
            }
  }
  override KeyUpEvent(e: any) {
    if (e) {
      //debounce(this.TriggerTermSearch(e),5000)
      this.TriggerTermSearch(e);
    }
  }
 
  TriggerTermSearch(e) {
    var objTermCtl = this.trmBrowser;
    if (e.keyCode != 0 && e.keyCode != 13) {    
      objTermCtl.TermDetail = null;      
      let serchChar = e.target.value.trim().length;
      if (serchChar < 3) {
        this.ItemsSource.Clear()
    }
      if (e.target.value.trim() != '' && serchChar >= 3) {
        var srch = e.target.value.trim();        
        if (srch != '' && srch.length >= 3) {
          objTermCtl.searchText = srch;
          this.snomedsearch('ProblemTA',e);
        }
      } else {
        if (objTermCtl.QSDelaytimer != null) {
          clearTimeout(objTermCtl.QSDelaytimer);
        }        
      }
    }
  }

   snomedsearch(PsCA,e) {     
    if (e.target.value.length >= 3) {
    this.ItemsSource.Clear();
    let searchText = e.target.value;
    let CodingSchemeName = this.sCodingSchemeName //'SNOMED CT';
    let CodingSchemeVersion = this.sCodingSchemeVersion //'20230607';
    let DataItemOIDs: string;
    let DataItemNames: string;
    if(!String.IsNullOrEmpty(PatientContext.EncounterCode) && String.Equals(PatientContext.EncounterCode, "CC_ACCEM",StringComparison.InvariantCultureIgnoreCase))
    {
        DataItemOIDs = this.sProblemNameECOID + ":CC_PRBDIAG:true";
        DataItemNames = "ProblemView.ProblemNameEC";
    }
    else
    {
        DataItemOIDs = this.sProblemNameOID + ":CC_PRBDIAG:true";
        DataItemNames = "ProblemView.ProblemName";
    }
    //DataItemOIDs = '1108:CC_PRBDIAG:true';
    //DataItemNames = 'ProblemView.ProblemName';
    let sAncestorConceptID = "";
    let sActivity = 'Problem';
    let ProblemType = 'CC_PRBDIAG';
    let AllowMultiSelect = false
    let ShowBodySiteLaterality =false;    
    let IsWidenSearch = this.trmBrowser.iTermChecked==='1' ? '1':'0';
    let s = IsWidenSearch;  
    let obj = HtmlPage.Window.Invoke(
        'CallSnomedService',
        searchText,CodingSchemeName,CodingSchemeVersion,DataItemOIDs,DataItemNames,sAncestorConceptID,sActivity,ProblemType,AllowMultiSelect,ShowBodySiteLaterality,IsWidenSearch)
        this.typeAheadPushNewItems(obj);        
    }    
  }

  typeAheadPushNewItems(obj) {
    let typeAheadsfsItems;
    if (obj) {        
        if(obj!=""){
        var results=obj.split("~");
        var indresults;
        var objArray=new Array();
        objArray[0]=new Array(2);     
        for(var i=0;i<results.length;i++){
        indresults=results[i].split(":");
     
        let clistitem = new CListItem();
        clistitem.DisplayText =indresults[1];
        clistitem.Value = indresults[2];
        this.ItemsSource.array.push(clistitem);        
        }       
      }
    }else{
        this.ItemsSource.Clear();
      }
}}