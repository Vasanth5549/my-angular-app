import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, ScriptObject} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, HtmlPage, CListItem, List } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { CReqMsgIsWitnessRequired, CResMsgIsWitnessRequired, IPPMAPrescribableDefnWSSoapClient, IsWitnessRequiredCompletedEventArgs, ObjectInfo, WitnessCriteria, WitnessCriteriaresult } from 'src/app/shared/epma-platform/soap-client/IPPMAPrescribableDefnWS';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { MedChartData } from './globalvariable';
import { AppContextInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import * as Application from '../../lorappcommonbb/amshelper';
import { iSFS } from 'src/app/shared/epma-platform/controls/epma-isfs/epma-isfs.component';
import { SLSFSItem } from 'src/app/shared/epma-platform/models/model';

  
    export class MedAdminViewHelper {
        oParam: string = String.Empty;
        _CallBack: (_: WitnessCriteriaresult) => void;
        public IsWitnessRequired(prescriptionItemOID: number, strLorenzoID: string, lnRouteOID: number, IsControlledDrug: boolean, CallBack: (_: WitnessCriteriaresult) => void): void {
            let objService: IPPMAPrescribableDefnWSSoapClient = new IPPMAPrescribableDefnWSSoapClient();
            objService.IsWitnessRequiredCompleted  = (s,e) => { this.objService_IsWitnessReqdCompleted(s,e); } ;
            let objReq: CReqMsgIsWitnessRequired = new CReqMsgIsWitnessRequired();
            objReq.oContextInformation = CommonBB.FillContext();
            objReq.CriteriaBC = new WitnessCriteria();
            objReq.CriteriaBC.PrescriptionItemOid = prescriptionItemOID;
            objReq.CriteriaBC.ServicePoints = new ObservableCollection<ObjectInfo>();
            objReq.CriteriaBC.ServicePoints.Add(ObjectHelper.CreateObject(new ObjectInfo(), { OID: MedChartData.ServiceOID }));
            objReq.CriteriaBC.Drugs = new ObservableCollection<ObjectInfo>();
            objReq.CriteriaBC.Drugs.Add(ObjectHelper.CreateObject(new ObjectInfo(), { Code: strLorenzoID }));
            objReq.CriteriaBC.Roles = new ObservableCollection<ObjectInfo>();
            objReq.CriteriaBC.Roles.Add(ObjectHelper.CreateObject(new ObjectInfo(), { OID: Convert.ToInt64(AppContextInfo.JobRoleOID) }));
            objReq.CriteriaBC.Routes = new ObservableCollection<ObjectInfo>();
            objReq.CriteriaBC.Routes.Add(ObjectHelper.CreateObject(new ObjectInfo(), { OID: lnRouteOID }));
            if (!String.IsNullOrEmpty(PatientContext.DOB) && DateTime.LessThanOrEqualTo(Convert.ToDateTime(PatientContext.DOB) , CommonBB.GetServerDateTime()))
                objReq.CriteriaBC.AgeFrom = Convert.ToInt16(PatientContext.PatientAge);
            else objReq.CriteriaBC.AgeFrom = -1;
            objReq.CriteriaBC.IsControlledDrugIncluded = IsControlledDrug;
            this._CallBack = CallBack;
            objService.IsWitnessRequiredAsync(objReq);
        }
        objService_IsWitnessReqdCompleted(sender: Object, e: IsWitnessRequiredCompletedEventArgs): void {
            let _ErrorID: number = 80000094;
            let _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:MedAdminViewHelper, Method:IsWitnessReqdCompleted";
            let oRes: CResMsgIsWitnessRequired = ObjectHelper.CreateType<CResMsgIsWitnessRequired>(e.Result, CResMsgIsWitnessRequired);
            let otmp: WitnessCriteriaresult = ObjectHelper.CreateType<WitnessCriteriaresult>(oRes.owitnessCriteriaresult, WitnessCriteriaresult);
            if (e.Error == null && e.Result != null && e.Result.owitnessCriteriaresult != null)
                this._CallBack(e.Result.owitnessCriteriaresult);
            else {
                Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
        }
        public LaunchSFS(oSFSControl: iSFS, OID: number, name: string, oQuickList: ObservableCollection<CListItem>): void {
            let oListitem: CListItem = this.CPSFSOpen();
            if (oListitem != null && oListitem.Value != null) {
                OID = Convert.ToInt64(oListitem.Value);
                name = oListitem.DisplayText;
                if (oQuickList == null) {
                    oQuickList = new ObservableCollection<CListItem>();
                }
                let IsItemAlreadyExists: boolean = false;
                for(let i:number = 0; i < oQuickList.Count; i++){
                    let oItem = oQuickList[i];
                    //oQuickList.forEach( (oItem)=> {
                        if (oItem.Value == oListitem.Value) {
                            IsItemAlreadyExists = true;
                            break;
                        }
                    //});
                }
                
                if (!IsItemAlreadyExists) {
                    let lstItems: List<SLSFSItem> = new List<SLSFSItem>();
                    lstItems.Add(ObjectHelper.CreateObject(new SLSFSItem(), { DisplayText: oListitem.DisplayText, DisplayValue: oListitem.Value, Sfskey: oListitem.Value, Sfstype: "cp" }));
                    oSFSControl.AddSFSItems(lstItems);
                    oQuickList.Add(oListitem);
                }
            }
        }
        private CPSFSOpen(): CListItem {
            this.oParam = AppContextInfo.OrganisationName;
            let oSelectedItems: CListItem = new CListItem();
            let returnValue: ScriptObject = ObjectHelper.CreateType<ScriptObject>(HtmlPage.Window.Invoke("SFSCareProvider", this.oParam), 'ScriptObject');
            if (returnValue != null && returnValue.GetProperty("length") != null) {
                let nSelectCnt: number = Convert.ToInt32(returnValue.GetProperty("length"));
                let selectedValue: ScriptObject = ObjectHelper.CreateType<ScriptObject>(returnValue.GetProperty(0), 'ScriptObject');
                let oItem: CListItem = new CListItem();
                oItem.DisplayText = ObjectHelper.CreateType<string>(selectedValue.GetProperty("SurName"), 'string');
                if (!String.IsNullOrEmpty(ObjectHelper.CreateType<string>(selectedValue.GetProperty("ForeName"), 'string'))) {
                    oItem.DisplayText += " ";
                    oItem.DisplayText += selectedValue.GetProperty("ForeName");
                }
                oItem.Value = ObjectHelper.CreateType<string>(selectedValue.GetProperty("OId"), 'string');
                oSelectedItems = oItem;
            }
            return oSelectedItems;
        }
    }
