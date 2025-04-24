import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, SLQueryCollection} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, CListItem, ChildWindow,  CContextInformation  } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { PrescriptionItemVM } from './PrescriptionItemVM';
import { IPPMABaseVM } from './ippmabasevm';
import { ActivityTypes, ReplacemntItem } from '../model/common';
import * as ManagePrescSer from '../../shared/epma-platform/soap-client/ManagePrescriptionWS';
import { ConstituentItem, CReqMsgGetReplacementDrugs, CResMsgGetReplacementDrugs, DrugItemInputData, GetReplacementDrugsCompletedEventArgs, ManagePrescriptionWSSoapClient } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { CConstants } from '../utilities/constants';
import { Common } from '../utilities/common';
import { AppContextInfo, ContextInfo } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import * as Application from 'src/app/lorappcommonbb/amshelper';
import { EventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { MedReplacementDrugsChild } from '../view/medreplacementdrugschild';
import { AppSessionInfo } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { meddrugprescriptionoptionChild } from '../view/meddrugprescriptionoptionchild';

    export class ReplacementDrugVM extends ViewModelBase {
        sTagObj: ConstituentItem;
        oVM: IPPMABaseVM;
        oItemVM: PrescriptionItemVM;
        MenuCode: string = String.Empty;
         objRepDrugsChild: MedReplacementDrugsChild;
        private oAppDialogWindow: ChildWindow;
        public objReplacemntItem: ObservableCollection<ReplacemntItem>;
        private repItem: ObservableCollection<CListItem>;
        
         private obj: meddrugprescriptionoptionChild;
        private oChildWindow: ChildWindow;
        public get RepItem(): ObservableCollection<CListItem> {
            return this.repItem;
        }
        public set RepItem(value: ObservableCollection<CListItem>) {
            if (this.repItem != value) {
                this.repItem = value;
               //NotifyPropertyChanged("RepItem");
            }
        }
        public GetReplacementDrugs(sTagObject: ConstituentItem, oVModel: IPPMABaseVM): void {
            this.sTagObj = sTagObject;
            this.oVM = oVModel;
            if ((this.sTagObj.PrescriptionItemID != CConstants.Formulary_Drug) && (this.sTagObj.PrescriptionItemID != CConstants.Formulary_Appliance) && (this.sTagObj.PrescriptionItemID != CConstants.Formulary_Unknown) && String.Compare(this.sTagObj.Type, CConstants.Precatalog, StringComparison.CurrentCulture) != 0) {
                let objService: ManagePrescriptionWSSoapClient = new ManagePrescriptionWSSoapClient();
                objService.GetReplacementDrugsCompleted  = (s,e) => { this.objService_GetReplacementDrugsCompleted(s,e); } ;
                let objReqReplacmnt: CReqMsgGetReplacementDrugs = new CReqMsgGetReplacementDrugs();
                objReqReplacmnt.oDrugItemBasicDataBC = new DrugItemInputData();
                objReqReplacmnt.oDrugItemBasicDataBC.IdentifyingOID = Convert.ToInt64(this.sTagObj.PrescriptionItemID);
                objReqReplacmnt.oDrugItemBasicDataBC.IdentifyingType = this.sTagObj.Type;
                objReqReplacmnt.oDrugItemBasicDataBC.MCVersionNo = AppSessionInfo.AMCV;
                objReqReplacmnt.oContextInformation = Common.FillContext();
                objReqReplacmnt.oContextInformation = new CContextInformation();
                objReqReplacmnt.oContextInformation.SecurityToken = ContextInfo.SecurityToken;
                objReqReplacmnt.oContextInformation.ReleaseVersion = 2;
                objReqReplacmnt.oContextInformation.OrganizationID = AppContextInfo.OrganisationOID;
                objService.GetReplacementDrugsAsync(objReqReplacmnt);
            }
            else {
                this.oVM.CheckForNonFormulary(this.sTagObj.IsFormulary.Equals("1"), this.sTagObj.Name, false);
            }
        }
        objService_GetReplacementDrugsCompleted(sender: Object, e: GetReplacementDrugsCompletedEventArgs): void {
            let _ErrorID: number = 80000042;
            let _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:ReplacementDrugVM, Method:objService_GetReplacementDrugsCompleted()";
            if (this.oVM != null) {
                this.oVM.GpConnectMedicationItem = null;
            }
            if (e.Error == null) {
                try {
                    let objResReplacmnt: CResMsgGetReplacementDrugs = e.Result;
                    if (objResReplacmnt != null && objResReplacmnt.oReplacementDrugs != null) {
                        if (objResReplacmnt.oReplacementDrugs != null && objResReplacmnt.oReplacementDrugs.Count > 0 && (objResReplacmnt.oReplacementDrugs[0].IdentifyingOID > 0 || objResReplacmnt.oReplacementDrugs[0].IdentifyingOID == -1)) {
                            this.objReplacemntItem = new ObservableCollection<ReplacemntItem>();
                            for (let nCnt: number = 0; nCnt < objResReplacmnt.oReplacementDrugs.Count; nCnt++) {
                                this.objReplacemntItem.Add(ObjectHelper.CreateObject(new ReplacemntItem(), {
                                    IdentifyingName: objResReplacmnt.oReplacementDrugs[nCnt].IdentifyingName,
                                    IdentifyingType: objResReplacmnt.oReplacementDrugs[nCnt].IdentifyingType,
                                    IdentifyingOID: Convert.ToString(objResReplacmnt.oReplacementDrugs[nCnt].IdentifyingOID),
                                    MCVersion: AppSessionInfo.AMCV,
                                    IsAccessContraint: objResReplacmnt.oReplacementDrugs[nCnt].IsAccessContraint,
                                    IsPrescribeByBrand: objResReplacmnt.oReplacementDrugs[nCnt].IsPrescribeByBrand,
                                    sItemType: objResReplacmnt.oReplacementDrugs[nCnt].ItemType,
                                    IsReplacement: objResReplacmnt.oReplacementDrugs[nCnt].bIsReplacement,
                                    IsFormulary: objResReplacmnt.oReplacementDrugs[nCnt].IsFormulary,
                                    LorenzoID: objResReplacmnt.oReplacementDrugs[nCnt].LorenzoID
                                }));
                            }
                            this.RepItem = new ObservableCollection<CListItem>();
                            this.objReplacemntItem.forEach( (oRI)=> {
                                if (!String.IsNullOrEmpty(oRI.IdentifyingOID) && String.Compare(oRI.IdentifyingOID, "-1", StringComparison.CurrentCultureIgnoreCase) != 0) {
                                    let lstRepItem: CListItem = new CListItem();
                                    lstRepItem.DisplayText = oRI.IdentifyingName;
                                    lstRepItem.Value = oRI.IdentifyingOID + "~" + oRI.IdentifyingType + "~" + oRI.MCVersion + "~" + oRI.IsAccessContraint + "~" + oRI.IsPrescribeByBrand + "~" + oRI.sItemType + "~" + oRI.IsReplacement + "~" + oRI.IsFormulary + "~" + oRI.LorenzoID;
                                    this.RepItem.Add(lstRepItem);
                                }
                            });
                        }
                        let nResult: number;
                        let IsInActiveItem: boolean = false;
                        if (String.Compare(SLQueryCollection.GetQueryStringValue("MenuCode"), "MN_MED_AUTHORI_SL_P2") == 0) {
                            nResult = 2;
                            if (this.objReplacemntItem != null)
                                IsInActiveItem = true;
                            else IsInActiveItem = false;
                        }
                        else {
                            if (this.oVM.DrugItem != null)
                                nResult = this.ToBeAlternated(this.objReplacemntItem, this.oVM.DrugItem != null ? this.oVM.DrugItem.IdentifyingName : String.Empty, null, this.oVM.DrugItem.ITMSUBTYP, this.oVM.DrugItem.MCIDeactItems);
                            else nResult = this.ToBeAlternated(this.objReplacemntItem, this.oVM.DrugItem != null ? this.oVM.DrugItem.IdentifyingName : String.Empty, null, null, String.Empty);
                        }
                        if (nResult == 1)
                            this.ReplacementFormfav(null, this.oVM.DrugItem != null ? this.oVM.DrugItem.IdentifyingName : String.Empty, null);
                        else if (nResult == 2) {
                            if (this.oVM != null && this.oVM.DrugItem != null && !String.IsNullOrEmpty(this.oVM.DrugItem.ITMSUBTYP) && String.Equals(this.oVM.DrugItem.ITMSUBTYP, CConstants.SUBTYPE, StringComparison.InvariantCultureIgnoreCase)) {
                                this.oVM.SelectedGPConnectItem = null;
                            }
                            if (String.Compare(this.sTagObj.OperationMode, "N") == 0) {
                                let sIsFormulary: string[] = this.sTagObj.IsFormulary.Split('^');
                                if (sIsFormulary.length > 0 && sIsFormulary[0] == "Fav" && String.Compare(this.sTagObj.HasAccessConstraint.ToString(), "0", StringComparison.CurrentCulture) == 0 && String.Compare(this.sTagObj.IsIndicationRequired.ToString(), "0", StringComparison.CurrentCulture) == 0) {
                                    let ObjCItem: ManagePrescSer.ConstituentItem = new ManagePrescSer.ConstituentItem();
                                    
                                     this.obj = new meddrugprescriptionoptionChild();
                                    if (this.oVM.SelectedGPConnectItem != null) {
                                        this.oVM.GpConnectMedicationItem = this.oVM.SelectedGPConnectItem;
                                        this.oVM.SelectedGPConnectItem = null;
                                    }
                                    ObjCItem.PrescribeItemID = Convert.ToInt64(this.sTagObj.PrescriptionItemID);
                                    ObjCItem.Type = this.sTagObj.Type;
                                    ObjCItem.OID = this.sTagObj.OID;
                                    ObjCItem.IsFormulary = this.sTagObj.IsFormulary;
                                    ObjCItem.MCVersion = AppSessionInfo.AMCV;
                                    ObjCItem.LorenzoID = this.sTagObj.LorenzoID;
                                    ObjCItem.Name = this.sTagObj.Name;
                                    ObjCItem.IsPrescribeByBrand = this.sTagObj.IsPrescribeByBrand;
                                    ObjCItem.HasAccessConstraint = this.sTagObj.HasAccessConstraint;
                                    ObjCItem.Itemtype = this.sTagObj.Itemtype;
                                   
                                     this.obj.sTagObj = ObjCItem;
                                     this.obj.DataContext = ObjectHelper.CreateType<IPPMABaseVM>(this.oVM, IPPMABaseVM);
                                    //  ObjectHelper.stopFinishAndCancelEvent(true);
                                    
                                    AppActivity.OpenWindow(this.obj.sTagObj.Name, this.obj, (s,e) => {this.obj_ClosedApp(s);}, "", false, 410, 720, false, WindowButtonType.Close, null, undefined, undefined, undefined, 'secondardDialog');
                                }
                                else if (this.oVM.DrugItem != null) {
                                    this.oVM.IsOtherClick = true;
                                    if (this.oVM.SelectedGPConnectItem != null) {
                                        this.oVM.GpConnectMedicationItem = this.oVM.SelectedGPConnectItem;
                                        this.oVM.SelectedGPConnectItem = null;
                                    }
                                    this.oVM.PrescribeNewItem(this.oVM.DrugItem);
                                }
                            }
                            else {
                                this.oVM.CheckForNonFormulary(this.sTagObj.IsFormulary.Equals("1"), this.sTagObj.Name, IsInActiveItem);
                            }
                        }
                    }
                    else if (this.oVM.DrugItem != null) {
                        this.oVM.IsOtherClick = true;
                        this.oVM.PrescribeNewItem(this.oVM.DrugItem);
                    }
                }
               catch(ex:any)  {
                    let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
        }
        obj_ClosedApp(args: AppDialogEventargs): void {
            this.oChildWindow = args.AppChildWindow;
            //this.oChildWindow.DialogResult = false;
            // ObjectHelper.stopFinishAndCancelEvent(false);
            this.oChildWindow.DialogRef.close();
            if (this.oVM != null) {
                this.oVM.GpConnectMedicationItem = null;
            }
            if (this.oVM != null && this.oVM.ActivityCode == ActivityTypes.Reorder)
                Busyindicator.SetStatusIdle("Reorder");
            Busyindicator.SetStatusIdle("Favourites");
        }
        public NONReplacement(sTagObject: ConstituentItem, oVModel: IPPMABaseVM): void {
            this.sTagObj = sTagObject;
            this.oVM = oVModel;
            let IsInActiveItem: boolean = false;
            if ((sTagObject.PrescriptionItemID != CConstants.Formulary_Drug) && (sTagObject.PrescriptionItemID != CConstants.Formulary_Appliance) && (sTagObject.PrescriptionItemID != CConstants.Formulary_Unknown) && String.Compare(sTagObject.Type, CConstants.Precatalog, StringComparison.CurrentCulture) != 0) {
                if (String.Compare(this.sTagObj.OperationMode, "N") == 0) {
                    let sIsFormulary: string[] = this.sTagObj.IsFormulary.Split('^');
                    if (sIsFormulary.length > 0 && sIsFormulary[0] == "Fav" && String.Compare(this.sTagObj.HasAccessConstraint.ToString(), "0", StringComparison.CurrentCulture) == 0) {
                        let ObjCItem: ManagePrescSer.ConstituentItem = new ManagePrescSer.ConstituentItem();
                        
                        this.obj = new meddrugprescriptionoptionChild();
                        ObjCItem.PrescribeItemID = Convert.ToInt64(this.sTagObj.PrescriptionItemID);
                        ObjCItem.Type = this.sTagObj.Type;
                        ObjCItem.OID = this.sTagObj.OID;
                        ObjCItem.IsFormulary = this.sTagObj.IsFormulary;
                        ObjCItem.MCVersion = AppSessionInfo.AMCV;
                        ObjCItem.LorenzoID = this.sTagObj.LorenzoID;
                        ObjCItem.Name = this.sTagObj.Name;
                        ObjCItem.IsPrescribeByBrand = this.sTagObj.IsPrescribeByBrand;
                        ObjCItem.HasAccessConstraint = this.sTagObj.HasAccessConstraint;
                        ObjCItem.Itemtype = this.sTagObj.Itemtype;
                        
                         this.obj.sTagObj = ObjCItem;
                         this.obj.DataContext = ObjectHelper.CreateType<IPPMABaseVM>(this.oVM, IPPMABaseVM);
                       
                         AppActivity.OpenWindow(this.obj.sTagObj.Name, this.obj, (s,e) => {this.obj_ClosedApp(s);}, "", false, 410, 720, false, WindowButtonType.OkCancel, null);
                        }
                    else if (this.oVM.DrugItem != null) {
                        this.oVM.PrescribeNewItem(this.oVM.DrugItem);
                    }
                }
                else {
                    this.oVM.CheckForNonFormulary(this.sTagObj.IsFormulary.Equals("1"), this.sTagObj.Name, IsInActiveItem);
                }
            }
            else {
                this.oVM.CheckForNonFormulary(this.sTagObj.IsFormulary.Equals("1"), this.sTagObj.Name, IsInActiveItem);
            }
        }
        public ToBeAlternated(oReplaceItem: ObservableCollection<ReplacemntItem>, DrugName: string, oPItemVM: PrescriptionItemVM, ItemSubType: string, MCIDeactItems: string): number {
            if (oPItemVM != null)
                this.oItemVM = oPItemVM;
            if (oReplaceItem == null)
                return 2;
            if (String.Compare(oReplaceItem[0].IdentifyingOID, "-1", StringComparison.CurrentCulture) == 0) {
                let obj: iMessageBox = new iMessageBox();
                if (String.Compare(ItemSubType, CConstants.SUBTYPE, StringComparison.OrdinalIgnoreCase) == 0) {
                    if (!String.IsNullOrEmpty(MCIDeactItems))
                        obj.Message = String.Format("The component(s) of multiple component item  " + MCIDeactItems + " have been deactivated. Please reselect another from medication search list.");
                    else obj.Message = String.Format("The Multiple component item " + DrugName + " have been deactivated. Please reselect another from medication search list.", DrugName);
                }
                else {
                    if (DrugName != String.Empty && DrugName!=undefined)
                        obj.Message = String.Format(CConstants.NO_REPLACEMENT, DrugName);
                    else obj.Message = String.Format(CConstants.NO_REPLACEMENT, '').Replace("<>", "");
                }
                obj.Title = "Information - Lorenzo";
                obj.MessageButton = MessageBoxButton.OK;
                obj.IconType = MessageBoxType.Information;
                if (oPItemVM != null)
                    obj.Closed  = (s,e) => { this.obj_Closed(s,e); } ;
                // else
                //     obj.Closed  = (s,e) => { ObjectHelper.stopFinishAndCancelEvent(false) } ;
                obj.Show();
                // ObjectHelper.stopFinishAndCancelEvent(true);
                if (this.oVM != null && this.oVM.ActivityCode == ActivityTypes.Reorder)
                    Busyindicator.SetStatusIdle("Reorder");
                Busyindicator.SetStatusIdle("FormViewer");
                Busyindicator.SetStatusIdle("Favourites");
                Busyindicator.SetStatusIdle("FormViewerClick");
                return 3;
            }
            else if (oReplaceItem != null && !String.IsNullOrEmpty(oReplaceItem[0].IdentifyingOID) && oReplaceItem[0].IdentifyingOID != "0" && String.Compare(ItemSubType, CConstants.SUBTYPE, StringComparison.OrdinalIgnoreCase) == 0) {
                let obj: iMessageBox = new iMessageBox();
                if (String.Compare(ItemSubType, CConstants.SUBTYPE, StringComparison.OrdinalIgnoreCase) == 0) {
                    if (DrugName != String.Empty)
                        obj.Message = String.Format("The Multiple component item " + DrugName + " have been deactivated. Please reselect another from medication search list.", DrugName);
                    else obj.Message = String.Format("The Multiple component item have been deactivated. Please reselect another from medication search list.");
                    obj.Title = "Information - Lorenzo";
                    obj.MessageButton = MessageBoxButton.OK;
                    obj.IconType = MessageBoxType.Information;
                    if (oPItemVM != null)
                        obj.Closed  = (s,e) => { this.obj_Closed(s,e); } ;
                    obj.Show();
                    if (this.oVM != null && this.oVM.ActivityCode == ActivityTypes.Reorder)
                        Busyindicator.SetStatusIdle("Reorder");
                    Busyindicator.SetStatusIdle("FormViewer");
                    Busyindicator.SetStatusIdle("Favourites");
                    Busyindicator.SetStatusIdle("FormViewerClick");
                    return 3;
                }
            }
            else if (String.Compare(oReplaceItem[0].IdentifyingOID, "0", StringComparison.CurrentCulture) == 0) {
                let obj: iMessageBox = new iMessageBox();
                if (String.Compare(ItemSubType, CConstants.SUBTYPE, StringComparison.OrdinalIgnoreCase) == 0) {
                    obj.Message = "The Multiple component item " + DrugName + " or its any one of the component is not available as part of current version. Please reselect another from medication search list";
                }
                else {
                    obj.Message = this.sTagObj.Name + " " + CConstants.No_Replacement_Current_Version;
                }
                obj.Title = "Information - Lorenzo";
                obj.MessageButton = MessageBoxButton.OK;
                obj.IconType = MessageBoxType.Information;
                obj.Closed  = (s,e) => { this.obj_Closed(s,e); } ;
                obj.Show();
                if (this.oVM != null && this.oVM.ActivityCode == ActivityTypes.Reorder)
                    Busyindicator.SetStatusIdle("Reorder");
                Busyindicator.SetStatusIdle("FormViewer");
                Busyindicator.SetStatusIdle("Favourites");
                Busyindicator.SetStatusIdle("FormViewerClick");
                return 3;
            }
            else if (oReplaceItem != null && !String.IsNullOrEmpty(oReplaceItem[0].IdentifyingOID) && oReplaceItem[0].IdentifyingOID != "0" && String.Compare(ItemSubType, CConstants.SUBTYPE, StringComparison.OrdinalIgnoreCase) != 0) {
                return 1;
            }
            return 2;
        }
        obj_Closed(sender: Object, e: EventArgs): void {
            // ObjectHelper.stopFinishAndCancelEvent(false);
            this.oItemVM.UnHoldCompleted();
        }
        public ReplacementFormfav(oVModel: IPPMABaseVM, DrugName: string, oPItemVM: PrescriptionItemVM): void {
            this.oItemVM = oPItemVM;
            if (this.oVM != null && this.oVM.objProcessingItemVM != null) {
                this.oVM.objProcessingItemVM = null;
            }
            if (oVModel != null && this.oVM == null)
                this.oVM = oVModel;
           
             this.objRepDrugsChild = new MedReplacementDrugsChild();
             this.objRepDrugsChild.constructorimpl(DrugName);
             this.objRepDrugsChild.DataContext = this;
             AppActivity.OpenWindow("Replacement Item", this.objRepDrugsChild, (s,e) => {this.objReplacementDrugs_Closed(s);}, "", false, 290, 400, false, WindowButtonType.OkCancel, null);
        }
        objReplacementDrugs_Closed(args: AppDialogEventargs): void {
            let bDialogResult: boolean = false;
            this.oAppDialogWindow = args.AppChildWindow;
            //Not Required for LHS. To be Re-Visited.
            if (args.Content != null)
            this.objRepDrugsChild = ObjectHelper.CreateType<MedReplacementDrugsChild>(args.Content.Component, MedReplacementDrugsChild);
            if (args.Result == AppDialogResult.Ok) {
                bDialogResult = this.objRepDrugsChild.OKButtonClick();
                if (bDialogResult) {
                    if (this.oItemVM != null) {
                        this.oItemVM.PrescriptionItemStatus = CConstants.CANCELLED;
                        this.oItemVM.OperationMode = "U";
                    }
                    this.oVM.PrescribeNewItem(this.objRepDrugsChild.objDrugItemInputData);
                    this.oAppDialogWindow.DialogResult = bDialogResult;
                }
            }            
            else if (args.Result == AppDialogResult.Cancel) {
                Busyindicator.SetStatusIdle("FormViewer");
                Busyindicator.SetStatusIdle("Favourites");
                Busyindicator.SetStatusIdle("FormViewerClick");
                if (this.oVM != null && this.oVM.ActivityCode == ActivityTypes.Reorder)
                    Busyindicator.SetStatusIdle("Reorder");
                //this.oAppDialogWindow.DialogResult = false;
                this.objRepDrugsChild.appDialog.DialogResult=true;
                
            }
            
            if (this.oItemVM != null)
                this.oItemVM.UnHoldCompleted();
        }
    }