import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, ObservableCollection, List, ContextInfo,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, CListItem  } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from '../../shared/epma-platform/soap-client/helper.service';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper as Helper, ObjectHelper } from 'epma-platform/helper';
import { CReqMsgGetPrescriptionDetails, CResMsgGetPrescriptionDetails, GetPrescriptionDetailsCompletedEventArgs, ManagePrescriptionWSSoapClient } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { CReqMsgGetFavouritesParentGroup, CReqMsgGetUserFavouritesGroupItems, CReqMsgManageFavourites, CResMsgGetFavouritesParentGroup, CResMsgGetUserFavouritesGroupItems, GetFavouritesParentGroupCompletedEventArgs, GetUserFavouritesGroupItemsCompletedEventArgs, ManageFavouritesCompletedEventArgs, MedicationMgmtWSSoapClient } from 'src/app/shared/epma-platform/soap-client/MedicationMgmtWS';
import { MedicationPrescribeVM } from '../ca/prescribe/medicationprescribevm';
import { Common } from '../utilities/common';
import { AppSessionInfo } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { PrescriptionItemInputData } from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import * as ManagePrescSer  from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS'
import * as MedicationMgmtSer  from 'src/app/shared/epma-platform/soap-client/MedicationMgmtWS'

import { PrescriptionItemVM } from './PrescriptionItemVM';
import { FormViewerVM } from './formviewervm';
import { PresItemDRCVM } from './PresItemDRCVM';
import { BasicDetailsVM } from './BasicDetailsVM';
import { MultipleDoseDetail } from './MultipleDoseDetail';
import { MedQuickSelectVM } from './medquickselectvm';
import { DoseTypeCode } from '../utilities/constants';
import { IViewModelBase, ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import { CTreeListItem, iTreeViewCollection, TreeImageCollection } from 'src/app/shared/epma-platform/controls-model/treeView.model';
 
    export class AddtoFavouritesVM extends ViewModelBase implements IViewModelBase {
        oPresWS: ManagePrescriptionWSSoapClient;
        oMedMgmtWS: MedicationMgmtWSSoapClient;
        private TreeVwParentGpObj: iTreeViewCollection;
        private PrescriptionLineItemObj: ObservableCollection<PrescriptionItemVMDerived>;
        private ParentKey: string = String.Empty;
        oGridColl: ObservableCollection<PrescriptionItemVMDerived> = new ObservableCollection<PrescriptionItemVMDerived>();
        lstItemFav: iTreeViewCollection = new iTreeViewCollection();
        lstItem: iTreeViewCollection = new iTreeViewCollection();
        oColl: List<TreeImageCollection> = new List<TreeImageCollection>();
        private ipBaseVM: MedicationPrescribeVM;
        public get IpBaseVM(): MedicationPrescribeVM {
            return this.ipBaseVM;
        }
        public set IpBaseVM(value: MedicationPrescribeVM) {
            if (this.ipBaseVM != value) {
                this.ipBaseVM = value;
               //super.NotifyPropertyChanged("IpBaseVM");
            }
        }
        constructor() {
            super();
            this.oPresWS = new ManagePrescriptionWSSoapClient();
            this.oMedMgmtWS = new MedicationMgmtWSSoapClient();
            this.oPresWS.GetPrescriptionDetailsCompleted  = (s,e) => { this.oServ_GetPrescriptionDetailsCompleted(s,e); } ;
            this.PopulateParentNode();
        }
        public get TreeVwParentGp(): iTreeViewCollection {
            return this.TreeVwParentGpObj;
        }
        public set TreeVwParentGp(value: iTreeViewCollection) {
            if (!Helper.ReferenceEquals(this.TreeVwParentGpObj, value)) {
                this.TreeVwParentGpObj = value;
               //super.NotifyPropertyChanged("TreeVwParentGp");
            }
        }
        public get GridFavColumns(): ObservableCollection<PrescriptionItemVMDerived> {
            return this.PrescriptionLineItemObj;
        }
        public set GridFavColumns(value: ObservableCollection<PrescriptionItemVMDerived>) {
            if (this.PrescriptionLineItemObj != value) {
                this.PrescriptionLineItemObj = value;
               //super.NotifyPropertyChanged("GridFavColumns");
            }
        }
        public GetPrescriptionDetails(oPrescriptionItemVM: ObservableCollection<Object>): void {
            let nObjCnt: number = oPrescriptionItemVM.Count;
            for (let nCnt: number = 0; nCnt < nObjCnt; nCnt++) {
                let oItemVM: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(oPrescriptionItemVM[nCnt], PrescriptionItemVM);
                if (!oItemVM.IsFormViewDataLoaded) {
                    let oPresDetailsReq: CReqMsgGetPrescriptionDetails = new CReqMsgGetPrescriptionDetails();
                    oPresDetailsReq.oPrescriptionItemInputDataBC = new PrescriptionItemInputData();
                    oPresDetailsReq.oPrescriptionItemInputDataBC.OID = oItemVM.PrescriptionItemOID;
                    oPresDetailsReq.oPrescriptionItemInputDataBC.PrescriptionItemStatus = oItemVM.PrescriptionItemStatus;
                    oPresDetailsReq.oPrescriptionItemInputDataBC.MCVesrionNo = oItemVM.FormViewerDetails.BasicDetails.MCVersion;
                    oPresDetailsReq.oPrescriptionItemInputDataBC.ActiveMCVersion = AppSessionInfo.AMCV;
                    oPresDetailsReq.oContextInformation = Common.FillContext();
                    this.oPresWS.GetPrescriptionDetailsAsync(oPresDetailsReq);
                }
                else {
                    this.FillPresDetailsfromObject(oPrescriptionItemVM[nCnt]);
                }
                this.GridFavColumns = this.oGridColl;
            }
        }
        oServ_GetPrescriptionDetailsCompleted(sender: Object, e: GetPrescriptionDetailsCompletedEventArgs): void {
            let _ErrorID: number = 80000054;
            let _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:Addtofavouritesvm.cs, Method:oServ_GetPrescriptionDetailsCompleted()";
            if (e.Error == null) {
                try {
                    let oPresDetailsRes: CResMsgGetPrescriptionDetails = e.Result;
                    this.FillDataContextPresDetails(oPresDetailsRes);
                }
               catch(ex:any)  {
                    let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
        }
        private FillDataContextPresDetails(oPresDetailsRes: CResMsgGetPrescriptionDetails): void {
            if (oPresDetailsRes instanceof CResMsgGetPrescriptionDetails && oPresDetailsRes.oPrescriptionItemDetails != null && oPresDetailsRes.oPrescriptionItemDetails.Count > 0) {
                oPresDetailsRes.oPrescriptionItemDetails.forEach( (oPresc)=> {
                    let oGrdColumns: PrescriptionItemVMDerived = new PrescriptionItemVMDerived();
                    oGrdColumns.FavItemKey = "NA";
                    oGrdColumns.FormViewerDetails = new FormViewerVM();
                    oGrdColumns.FormViewerDetails.PresItemDRCVM = new PresItemDRCVM();
                    oGrdColumns.FormViewerDetails.BasicDetails = new BasicDetailsVM(null);
                    oGrdColumns.FormViewerDetails.BasicDetails.IdentifyingName = oPresc.IdentifyingName;
                    oGrdColumns.FormViewerDetails.BasicDetails.IdentifyingOID = oPresc.PrescribableItemListOID;
                    oGrdColumns.FormViewerDetails.BasicDetails.IdentifyingType = oPresc.IdentifyingType;
                    oGrdColumns.FormViewerDetails.BasicDetails.MCVersion = oPresc.MCVersionNo;
                    if (!Helper.ReferenceEquals(oPresc.BasicProperties, null)) {
                        if (!Helper.ReferenceEquals(oPresc.BasicProperties.Route, null)) {
                            oGrdColumns.FormViewerDetails.BasicDetails.Route = ObjectHelper.CreateObject(new CListItem(), {
                                DisplayText: oPresc.BasicProperties.Route.Name,
                                Value: oPresc.BasicProperties.Route.OID.ToString()
                            });
                        }
                        if (!Helper.ReferenceEquals(oPresc.BasicProperties.Form, null)) {
                            oGrdColumns.FormViewerDetails.BasicDetails.DosageForm = ObjectHelper.CreateObject(new CListItem(), {
                                DisplayText: oPresc.BasicProperties.Form.Name,
                                Value: oPresc.BasicProperties.Form.OID.ToString()
                            });
                        }
                        if (!Helper.ReferenceEquals(oPresc.BasicProperties.Dose, null) && !Helper.ReferenceEquals(oPresc.BasicProperties.Dose.DoseType, null)) {
                            oGrdColumns.FormViewerDetails.BasicDetails.DoseType = ObjectHelper.CreateObject(new CListItem(), {
                                DisplayText: oPresc.BasicProperties.Dose.DoseType.Name,
                                Value: oPresc.BasicProperties.Dose.DoseType.Code
                            });
                        }
                        if (!Helper.ReferenceEquals(oPresc.BasicProperties.Dose, null) && !Helper.ReferenceEquals(oPresc.BasicProperties.Dose.DoseRegime, null)) {
                            if (oPresc.BasicProperties.Dose.DoseRegime.Count == 1) {
                                oGrdColumns.FormViewerDetails.BasicDetails.Dose = oPresc.BasicProperties.Dose.DoseRegime[0].LowerDose.ToString();
                                oGrdColumns.FormViewerDetails.BasicDetails.DoseUOM = ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: oPresc.BasicProperties.Dose.DoseRegime[0].DoseUOM.UOMName,
                                    Value: oPresc.BasicProperties.Dose.DoseRegime[0].DoseUOM.UOMId.ToString()
                                });
                            }
                            else {
                                let oMultiDoseDet: MultipleDoseDetail = new MultipleDoseDetail();
                                oPresc.BasicProperties.Dose.DoseRegime.forEach( (oDose)=> {
                                    oMultiDoseDet.LowerDose = oDose.LowerDose;
                                    oMultiDoseDet.UpperDose = oDose.UpperDose;
                                    if (!Helper.ReferenceEquals(oDose.Direction, null)) {
                                        oMultiDoseDet.IsPRN = !String.IsNullOrEmpty(oDose.Direction.Code) && (String.Compare(oDose.Direction.Code, "CC_MEDDIRECTION") == 0 || String.Compare(oDose.Direction.Code, "As needed") == 0);
                                    }
                                    oMultiDoseDet.DoseInstructions = oDose.DosingInstruction;
                                    if (!Helper.ReferenceEquals(oDose.DoseUOM, null)) {
                                        oMultiDoseDet.DoseUOM = ObjectHelper.CreateObject(new CListItem(), {
                                            DisplayText: oDose.DoseUOM.UOMName,
                                            Value: oDose.DoseUOM.UOMId.ToString()
                                        });
                                    }
                                    if (!Helper.ReferenceEquals(oDose.Duration, null)) {
                                        oMultiDoseDet.Duration = oDose.Duration.Value;
                                        oMultiDoseDet.DurationUOM = ObjectHelper.CreateObject(new CListItem(), {
                                            DisplayText: oDose.Duration.UOMName,
                                            Value: oDose.Duration.UOMOID.ToString()
                                        });
                                    }
                                    if (!Helper.ReferenceEquals(oPresc.BasicProperties.FrequencyDetails, null) && !Helper.ReferenceEquals(oPresc.BasicProperties.FrequencyDetails.Frequency, null)) {
                                        oMultiDoseDet.Frequency = ObjectHelper.CreateObject(new CListItem(), {
                                            DisplayText: oDose.FrequencyDetails.Frequency.Name,
                                            Value: oDose.FrequencyDetails.Frequency.OID.ToString()
                                        });
                                    }
                                });
                            }
                        }
                        if (!Helper.ReferenceEquals(oPresc.BasicProperties.FrequencyDetails, null) && !Helper.ReferenceEquals(oPresc.BasicProperties.FrequencyDetails.Frequency, null)) {
                            oGrdColumns.FormViewerDetails.BasicDetails.Frequency = ObjectHelper.CreateObject(new CListItem(), {
                                DisplayText: oPresc.BasicProperties.FrequencyDetails.Frequency.Name,
                                Value: oPresc.BasicProperties.FrequencyDetails.Frequency.OID.ToString()
                            });
                        }
                        if (!Helper.ReferenceEquals(oPresc.BasicProperties.Quantity, null)) {
                            oGrdColumns.FormViewerDetails.BasicDetails.Quantity = oPresc.BasicProperties.Quantity.QuantityValue;
                            oGrdColumns.FormViewerDetails.BasicDetails.QuantityUOMName = oPresc.BasicProperties.Quantity.QuantityUOMName;
                            oGrdColumns.FormViewerDetails.BasicDetails.QuantityUOM = ObjectHelper.CreateObject(new CListItem(), {
                                DisplayText: oPresc.BasicProperties.Quantity.QuantityUOMName,
                                Value: oPresc.BasicProperties.Quantity.QuantityUOMId.ToString()
                            });
                        }
                        if (!Helper.ReferenceEquals(oPresc.BasicProperties.Duration, null)) {
                            oGrdColumns.FormViewerDetails.BasicDetails.Duration = oPresc.BasicProperties.Duration.Value.ToString();
                            oGrdColumns.FormViewerDetails.BasicDetails.DurationUOM = ObjectHelper.CreateObject(new CListItem(), {
                                DisplayText: oPresc.BasicProperties.Duration.UOMName,
                                Value: oPresc.BasicProperties.Duration.UOMOID.ToString()
                            });
                        }
                        if (!Helper.ReferenceEquals(oPresc.BasicProperties.AdminInstruction, null)) {
                            oGrdColumns.FormViewerDetails.BasicDetails.AdminInstruction = ObjectHelper.CreateObject(new CListItem(), {
                                DisplayText: oPresc.BasicProperties.AdminInstruction.Name,
                                Value: oPresc.BasicProperties.AdminInstruction.OID.ToString()
                            });
                        }
                        if (!Helper.ReferenceEquals(oPresc.BasicProperties.Site, null)) {
                            oGrdColumns.FormViewerDetails.BasicDetails.Site = ObjectHelper.CreateObject(new CListItem(), {
                                DisplayText: oPresc.BasicProperties.Site.Name,
                                Value: oPresc.BasicProperties.Site.OID.ToString()
                            });
                        }
                        if (!Helper.ReferenceEquals(oPresc.BasicProperties.Direction, null)) {
                            oGrdColumns.FormViewerDetails.BasicDetails.Direction = oPresc.BasicProperties.Direction.Code;
                        }
                        if (!Helper.ReferenceEquals(oPresc.BasicProperties.SupplyInstruction, null) && oPresc.BasicProperties.SupplyInstruction.Count > 0) {
                            let oSupply: ManagePrescSer.ObjectInfo = oPresc.BasicProperties.SupplyInstruction[0];
                            if (oSupply != null) {

                            }
                        }
                        if (!Helper.ReferenceEquals(oPresc.BasicProperties.DispensingInstruction, null) && oPresc.BasicProperties.DispensingInstruction.Count > 0) {
                            oGrdColumns.FormViewerDetails.BasicDetails.DispensingInstruction = new ObservableCollection<CListItem>();
                            oPresc.BasicProperties.DispensingInstruction.forEach( (oDispens)=> {
                                oGrdColumns.FormViewerDetails.BasicDetails.DispensingInstruction.Add(ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: oDispens.Name,
                                    Value: oDispens.Code
                                }));
                            });
                        }
                        oGrdColumns.FormViewerDetails.BasicDetails.OtherDispensingInstruction = oPresc.BasicProperties.OtherDispensingInstruction;
                        if (!Helper.ReferenceEquals(oPresc.BasicProperties.Statusflags, null)) {
                            oGrdColumns.IsHold = oPresc.BasicProperties.Statusflags.IsHold.Equals('1');
                        }
                        if (!Helper.ReferenceEquals(oPresc.BasicProperties.DrugProperties, null) && oPresc.BasicProperties.DrugProperties.Count > 0) {
                            oGrdColumns.FormViewerDetails.BasicDetails.DrugProperties = oPresc.BasicProperties.DrugProperties;
                        }
                        if (!Helper.ReferenceEquals(oPresc.BasicProperties.IsControlledDrug, null))
                            oPresc.IsControlledDrug = Convert.ToChar(oPresc.BasicProperties.IsControlledDrug);
                        this.oGridColl.Add(oGrdColumns);
                    }
                });
            }
        }
        private FillPresDetailsfromObject(oPrescriptionItemVM: Object): void {
            if (oPrescriptionItemVM != null) {
                let oGrdColumns: PrescriptionItemVMDerived = new PrescriptionItemVMDerived();
                oGrdColumns.FormViewerDetails = new FormViewerVM();
                oGrdColumns.FormViewerDetails.PresItemDRCVM = new PresItemDRCVM();
                oGrdColumns.FormViewerDetails.BasicDetails = new BasicDetailsVM(null);
                oGrdColumns.FormViewerDetails.BasicDetails = (ObjectHelper.CreateType<PrescriptionItemVM>(oPrescriptionItemVM, PrescriptionItemVM)).FormViewerDetails.BasicDetails;
                oGrdColumns.FavItemKey = "NA";
                this.oGridColl.Add(oGrdColumns);
            }
        }
        public PopulateParentNode(): void {
            let oReqGetFavParentGp: CReqMsgGetFavouritesParentGroup = new CReqMsgGetFavouritesParentGroup();
            oReqGetFavParentGp.UserOIdBC = ContextInfo.UserOID;
            oReqGetFavParentGp.sMCVerNoBC = AppSessionInfo.AMCV;
            oReqGetFavParentGp.oContextInformation = Common.FillContext();
            this.oMedMgmtWS.GetFavouritesParentGroupCompleted  = (s,e) => { this.oMedMgmtWS_GetFavouritesParentGroupCompleted(s,e); } ;
            this.oMedMgmtWS.GetFavouritesParentGroupAsync(oReqGetFavParentGp);
        }
        oMedMgmtWS_GetFavouritesParentGroupCompleted(sender: Object, e: GetFavouritesParentGroupCompletedEventArgs): void {
            let _ErrorID: number = 80000053;
            let _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:Addtofavouritesvm.cs, Method:oMedMgmtWS_GetFavouritesParentGroupCompleted()";
            if (e.Error == null) {
                try {
                    let oResGetFavParentGp: CResMsgGetFavouritesParentGroup = e.Result;
                    this.FillDataContextParentNode(oResGetFavParentGp);
                }
               catch(ex:any)  {
                    let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
        }
        private FillDataContextParentNode(oResGetFavParentGp: CResMsgGetFavouritesParentGroup): void {
            if (oResGetFavParentGp instanceof CResMsgGetFavouritesParentGroup && oResGetFavParentGp.oArrFavouriteItem != null && oResGetFavParentGp.oArrFavouriteItem.Count > 0) {
                this.oColl.Add(ObjectHelper.CreateObject(new TreeImageCollection(), { ImageSource: "./assets/images/ifavoritesnor16.png" }));
                this.lstItem.Add(ObjectHelper.CreateObject(new CTreeListItem(), {
                    Value: "Favourites",
                    Key: "1",
                    ParentKey: "0",
                    Selected: true,
                    ImageCollection: this.oColl
                }));
                let nResponseCount: number = oResGetFavParentGp.oArrFavouriteItem.Count;
                let sTagInfo: string = String.Empty;
                for (let nIndex: number = 0; nIndex < nResponseCount; nIndex++) {
                    sTagInfo = oResGetFavParentGp.oArrFavouriteItem[nIndex].ActiveFrom.ToString();
                    sTagInfo += ";" + oResGetFavParentGp.oArrFavouriteItem[nIndex].ActiveTo.ToString();
                    sTagInfo += ";" + oResGetFavParentGp.oArrFavouriteItem[nIndex].MCVersion;
                    sTagInfo += ";" + oResGetFavParentGp.oArrFavouriteItem[nIndex].Version;
                    sTagInfo += ";" + oResGetFavParentGp.oArrFavouriteItem[nIndex].LorenzoID;
                    this.lstItem.Add(ObjectHelper.CreateObject(new CTreeListItem(), {
                        Value: oResGetFavParentGp.oArrFavouriteItem[nIndex].Name,
                        Key: oResGetFavParentGp.oArrFavouriteItem[nIndex].FavouriteItemID.ToString(),
                        ParentKey: "1",
                        Tag: <Object>sTagInfo
                    }));
                    if (oResGetFavParentGp.oArrFavouriteItem[nIndex].ChildFolderCount > 0) {
                        this.lstItem.Add(ObjectHelper.CreateObject(new CTreeListItem(), {
                            Value: oResGetFavParentGp.oArrFavouriteItem[nIndex].Name,
                            Key: "DUMMY_" + oResGetFavParentGp.oArrFavouriteItem[nIndex].FavouriteItemID.ToString(),
                            ParentKey: oResGetFavParentGp.oArrFavouriteItem[nIndex].FavouriteItemID.ToString()
                        }));
                    }
                }
                this.TreeVwParentGp = this.lstItem;
            }
            else {
                this.lstItem.Add(ObjectHelper.CreateObject(new CTreeListItem(), {
                    Value: "Favourites",
                    Key: "1",
                    ParentKey: "0",
                    Selected: true,
                    ImageCollection: this.oColl
                }));
                this.TreeVwParentGp = this.lstItem;
            }
        }
        public SaveFavourites(oGrdRows: ObservableCollection<PrescriptionItemVMDerived>, oTrvFavItems: iTreeViewCollection): void {
            let oReqManFavourites: CReqMsgManageFavourites = new CReqMsgManageFavourites();
            let nLoopCnt: number = oTrvFavItems.Count;
            let sTaginfo: string[];
            oReqManFavourites.oArrFavouriteItemBC = new ObservableCollection<MedicationMgmtSer.FavouriteItem>();
            for (let nTrVwCnt: number = 0; nTrVwCnt < nLoopCnt; nTrVwCnt++) {
                let oTreeItem: CTreeListItem = oTrvFavItems.ElementAt<CTreeListItem>(nTrVwCnt);
                if (oTreeItem.Value != "Favourites" && oTreeItem.Key.IndexOf("DUMMY_") == -1) {
                    sTaginfo = oTreeItem.Tag.ToString().Split(';');
                    let oFavLstItem: MedicationMgmtSer.FavouriteItem = new MedicationMgmtSer.FavouriteItem();
                    if (oTreeItem.Key.Contains("Child")) {
                        oFavLstItem.OperationMode = "I";
                        oFavLstItem.IsMngAddFavourite = "1";
                        if (oTreeItem.ParentKey == "1")
                            oFavLstItem.Name = oTreeItem.Value + "~" + "0" + "~" + oTreeItem.Key;
                        else oFavLstItem.Name = oTreeItem.Value + "~" + oTreeItem.ParentKey + "~" + oTreeItem.Key;
                    }
                    else {
                        oFavLstItem.FavouriteItemID = Convert.ToInt64(oTreeItem.Key);
                        oFavLstItem.OperationMode = "U";
                        oFavLstItem.IsMngAddFavourite = "0";
                        oFavLstItem.Name = oTreeItem.Value;
                        if (oTreeItem.ParentKey != "1")
                            oFavLstItem.ParentID = Convert.ToInt64(oTreeItem.ParentKey);
                    }
                    oFavLstItem.ActiveFrom = Convert.ToDateTime(sTaginfo[0]);
                    oFavLstItem.ActiveTo = Convert.ToDateTime(sTaginfo[1]);
                    oFavLstItem.UserFavourite = "1";
                    oFavLstItem.MCVersion = sTaginfo[2];
                    oFavLstItem.Version = this.CalculateVersion(sTaginfo[3]).ToString();
                    oFavLstItem.Level = 1;
                    oFavLstItem.LorenzoID = sTaginfo[4];
                    oFavLstItem.PrescriptionItem = this.GetGridDatawithFav(oGrdRows, oTreeItem.Key);
                    oReqManFavourites.oArrFavouriteItemBC.Add(oFavLstItem);
                }
            }
            oReqManFavourites.UserOIDBC = ContextInfo.UserOID;
            oReqManFavourites.oContextInformation = Common.FillContext();
            this.oMedMgmtWS.ManageFavouritesCompleted  = (s,e) => { this.oMedMgmtWS_ManageFavouritesCompleted(s,e); } ;
            this.oMedMgmtWS.ManageFavouritesAsync(oReqManFavourites);
        }
        oMedMgmtWS_ManageFavouritesCompleted(sender: Object, e: ManageFavouritesCompletedEventArgs): void {
            if (this.IpBaseVM != null && this.IpBaseVM.QuickSelectVM != null) {
                let oQSelVM: MedQuickSelectVM = this.IpBaseVM.QuickSelectVM;
                oQSelVM.PopulateQuickLinksCombo();
            }
        }
        private CalculateVersion(sVersion: string): number {
            let dverout: number = 0;
            if (Number.TryParse(sVersion, (o)=>{dverout=o;})) {
                dverout = dverout + .01;
            }
            else {
                dverout = 0.01;
            }
            return dverout;
        }
        private GetGridDatawithFav(oGrdRows: ObservableCollection<PrescriptionItemVMDerived>, NodeKey: string): ObservableCollection<MedicationMgmtSer.ConstituentItem> {
            let oListConsItem: ObservableCollection<MedicationMgmtSer.ConstituentItem> = new ObservableCollection<MedicationMgmtSer.ConstituentItem>();
            let oConstituentItem: MedicationMgmtSer.ConstituentItem;
            oGrdRows.forEach( (oRows)=> {
                if (oRows.FavItemKey != "NA" && oRows.FavItemKey == NodeKey) {
                    if (oRows.FormViewerDetails.BasicDetails.IdentifyingOID > 0) {
                        oConstituentItem = new MedicationMgmtSer.ConstituentItem();
                        oConstituentItem.PrescribeItemID = oRows.FormViewerDetails.BasicDetails.IdentifyingOID;
                        if (!String.IsNullOrEmpty(oRows.FormViewerDetails.BasicDetails.IdentifyingType))
                            oConstituentItem.Type = oRows.FormViewerDetails.BasicDetails.IdentifyingType;
                        oConstituentItem.Name = oRows.FormViewerDetails.BasicDetails.IdentifyingName;
                        oConstituentItem.ProcessingInfo = new ObservableCollection<MedicationMgmtSer.ProcessingInfo>();
                        let oProInfo: MedicationMgmtSer.ProcessingInfo = new MedicationMgmtSer.ProcessingInfo();
                        oProInfo.Name = String.Empty;
                        oProInfo.AccessConstraint = "N";
                        oProInfo.IsDefault = "0";
                        if (!Helper.ReferenceEquals(oRows.FormViewerDetails.BasicDetails.Dose, null)) {
                            oProInfo.DoseValue = oRows.FormViewerDetails.BasicDetails.Dose;
                            if (!Helper.ReferenceEquals(oRows.FormViewerDetails.BasicDetails.DoseType, null))
                                oProInfo.DoseType = oRows.FormViewerDetails.BasicDetails.DoseType.Value;
                            if (String.Compare(oProInfo.DoseType, DoseTypeCode.DOSAGERANGE, StringComparison.CurrentCultureIgnoreCase) == 0 && !Helper.ReferenceEquals(oRows.FormViewerDetails.BasicDetails.UpperDose, null)) {
                                oProInfo.MaxDoseValue = oRows.FormViewerDetails.BasicDetails.UpperDose;
                            }
                            if (!Helper.ReferenceEquals(oRows.FormViewerDetails.BasicDetails.DoseUOM, null)) {
                                oProInfo.DoseUOM = ObjectHelper.CreateObject(new MedicationMgmtSer.UOM(), {
                                    UOMName: oRows.FormViewerDetails.BasicDetails.DoseUOM.DisplayText,
                                    UOMId: Convert.ToInt64(oRows.FormViewerDetails.BasicDetails.DoseUOM.Value)
                                });
                            }
                        }
                        if (!Helper.ReferenceEquals(oRows.FormViewerDetails.BasicDetails.MultiDoseDetails, null)) {
                            oProInfo.DoseDetails = new ObservableCollection<MedicationMgmtSer.DoseDetails>();
                            oRows.FormViewerDetails.BasicDetails.MultiDoseDetails.forEach( (oMultiDose)=> {
                                let oDoseDet: MedicationMgmtSer.DoseDetails = ObjectHelper.CreateObject(new MedicationMgmtSer.DoseDetails(), {
                                    LowerDose: oMultiDose.LowerDose.ToString(),
                                    UpperDose: oMultiDose.UpperDose.ToString(),
                                    Direction: oMultiDose.Direction,
                                    DosingInstruction: oMultiDose.DoseInstructions,
                                    FromDoseUOM: ObjectHelper.CreateObject(new MedicationMgmtSer.UOM(), {
                                        UOMName: oMultiDose.DoseUOM.DisplayText,
                                        UOMId: Convert.ToInt64(oMultiDose.DoseUOM.Value)
                                    }),
                                    Duration: Convert.ToInt32(oMultiDose.Duration),
                                    Period: oMultiDose.DurationUOM.Value,
                                    FrequencyDetails: ObjectHelper.CreateObject(new MedicationMgmtSer.FrequencyDetails(), {
                                        Frequency: ObjectHelper.CreateObject(new MedicationMgmtSer.ObjectInfo(), {
                                            Name: oMultiDose.Frequency.DisplayText,
                                            OID: Convert.ToInt64(oMultiDose.Frequency.Value)
                                        })
                                    })
                                });
                            });
                        }
                        if (!Helper.ReferenceEquals(oRows.FormViewerDetails.BasicDetails.Route, null)) {
                            oProInfo.Route = ObjectHelper.CreateObject(new MedicationMgmtSer.Route(), {
                                RouteName: oRows.FormViewerDetails.BasicDetails.Route.DisplayText,
                                RouteId: Convert.ToInt64(oRows.FormViewerDetails.BasicDetails.Route.Value)
                            });
                        }
                        if (!Helper.ReferenceEquals(oRows.FormViewerDetails.BasicDetails.DosageForm, null)) {
                            oProInfo.Form = ObjectHelper.CreateObject(new MedicationMgmtSer.Form(), {
                                FormName: oRows.FormViewerDetails.BasicDetails.DosageForm.DisplayText,
                                FormId: Convert.ToInt64(oRows.FormViewerDetails.BasicDetails.DosageForm.Value)
                            });
                        }
                        if (!Helper.ReferenceEquals(oRows.FormViewerDetails.BasicDetails.Frequency, null)) {
                            oProInfo.Frequency = ObjectHelper.CreateObject(new MedicationMgmtSer.Frequency(), {
                                FrequencyName: oRows.FormViewerDetails.BasicDetails.Frequency.DisplayText,
                                FrequencyId: (!String.IsNullOrEmpty(oRows.FormViewerDetails.BasicDetails.Frequency.Value)) ? Convert.ToInt64(oRows.FormViewerDetails.BasicDetails.Frequency.Value) : 0
                            });
                        }
                        let nQty: number = 0;
                        if (!String.IsNullOrEmpty(oRows.FormViewerDetails.BasicDetails.Quantity) && Number.TryParse(oRows.FormViewerDetails.BasicDetails.Quantity,(o) => nQty=o)) {
                            oProInfo.Quantity = nQty;
                            if (!Helper.ReferenceEquals(oRows.FormViewerDetails.BasicDetails.QuantityUOMName, null) && !Helper.ReferenceEquals(oRows.FormViewerDetails.BasicDetails.QuantityUOM, null)) {
                                oProInfo.QuantityUOM = ObjectHelper.CreateObject(new MedicationMgmtSer.UOM(), {
                                    UOMName: oRows.FormViewerDetails.BasicDetails.QuantityUOMName,
                                    UOMId: Convert.ToInt64(oRows.FormViewerDetails.BasicDetails.QuantityUOM.Value)
                                });
                            }
                        }
                        if (!Helper.ReferenceEquals(oRows.FormViewerDetails.BasicDetails.Duration, null)) {
                            if (!String.IsNullOrEmpty(oRows.FormViewerDetails.BasicDetails.Duration))
                                oProInfo.Duration = Convert.ToInt32(oRows.FormViewerDetails.BasicDetails.Duration);
                            if (oRows.FormViewerDetails.BasicDetails.DurationUOM != null)
                                oProInfo.Period = oRows.FormViewerDetails.BasicDetails.DurationUOM.Value;
                        }
                        if (!Helper.ReferenceEquals(oRows.FormViewerDetails.BasicDetails.AdminInstruction, null)) {
                            if (oRows.FormViewerDetails.BasicDetails.AdminInstruction != null)
                                oProInfo.AdminInstructionName = oRows.FormViewerDetails.BasicDetails.AdminInstruction.DisplayText;
                            if (!String.IsNullOrEmpty(oRows.FormViewerDetails.BasicDetails.AdminInstruction.Value))
                                oProInfo.AdminInstructionOID = Convert.ToInt64(oRows.FormViewerDetails.BasicDetails.AdminInstruction.Value);
                        }
                        if (!Helper.ReferenceEquals(oRows.FormViewerDetails.BasicDetails.Site, null)) {

                        }
                        oProInfo.OperationMode = "N";
                        oConstituentItem.ProcessingInfo.Add(oProInfo);
                        oListConsItem.Add(oConstituentItem);
                    }
                }
            });
            return oListConsItem;
        }
        public GetUserFavgpItems(FavGrpOID: string): void {
            let oReqGetUserFavGpItems: CReqMsgGetUserFavouritesGroupItems = new CReqMsgGetUserFavouritesGroupItems();
            oReqGetUserFavGpItems.FavGroupOIdBC = Convert.ToInt64(FavGrpOID);
            oReqGetUserFavGpItems.MCVersionBC = AppSessionInfo.AMCV;
            oReqGetUserFavGpItems.oContextInformation = Common.FillContext();
            this.oMedMgmtWS.GetUserFavouritesGroupItemsCompleted  = (s,e) => { this.oMedMgmtWS_GetUserFavouritesGroupItemsCompleted(s,e); } ;
            this.oMedMgmtWS.GetUserFavouritesGroupItemsAsync(oReqGetUserFavGpItems);
        }
        oMedMgmtWS_GetUserFavouritesGroupItemsCompleted(sender: Object, e: GetUserFavouritesGroupItemsCompletedEventArgs): void {
            let _ErrorID: number = 80000052;
            let _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:Addtofavouritesvm.cs, Method:oMedMgmtWS_GetUserFavouritesGroupItemsCompleted()";
            if (e.Error == null) {
                try {
                    let oResGetUserFavGpItems: CResMsgGetUserFavouritesGroupItems = e.Result;
                    this.FillDataContextFavGpItems(oResGetUserFavGpItems);
                }
               catch(ex:any)  {
                    let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
        }
        private FillDataContextFavGpItems(oResGetUserFavGpItems: CResMsgGetUserFavouritesGroupItems): void {
            if (oResGetUserFavGpItems instanceof CResMsgGetUserFavouritesGroupItems && oResGetUserFavGpItems.oFavouriteItem != null) {
                let oItemVM: ObservableCollection<PrescriptionItemVMDerived> = new ObservableCollection<PrescriptionItemVMDerived>();
                let FavItemKey: number = oResGetUserFavGpItems.oFavouriteItem.FavouriteItemID;
                oResGetUserFavGpItems.oFavouriteItem.PrescriptionItem.forEach( (oConstituentItem)=> {
                    let oItem: PrescriptionItemVMDerived = new PrescriptionItemVMDerived();
                    let oProcessingInfo: ObservableCollection<MedicationMgmtSer.ProcessingInfo> = new ObservableCollection<MedicationMgmtSer.ProcessingInfo>();
                    oProcessingInfo = oConstituentItem.ProcessingInfo;
                    oItem.FormViewerDetails = new FormViewerVM();
                    oItem.FormViewerDetails.PresItemDRCVM = new PresItemDRCVM();
                    oItem.FormViewerDetails.BasicDetails = new BasicDetailsVM(oItem);
                    oItem.FormViewerDetails.BasicDetails.IdentifyingName = oConstituentItem.Name;
                    oItem.FormViewerDetails.BasicDetails.IdentifyingOID = oConstituentItem.PrescribeItemID;
                    oItem.FormViewerDetails.BasicDetails.IdentifyingType = oConstituentItem.Type;
                    oItem.FormViewerDetails.BasicDetails.MCVersion = oConstituentItem.MCVersion;
                    oItem.FavItemKey = FavItemKey.ToString();
                    oProcessingInfo.forEach( (oProInfo)=> {
                        oItem.FormViewerDetails.BasicDetails.Dose = oProInfo.DoseValue;
                        oItem.FormViewerDetails.BasicDetails.DoseType = new CListItem();
                        oItem.FormViewerDetails.BasicDetails.DoseType.DisplayText = oProInfo.DoseType;
                        oItem.FormViewerDetails.BasicDetails.DoseUOM = new CListItem();
                        oItem.FormViewerDetails.BasicDetails.DoseUOM.DisplayText = oProInfo.DoseUOM.UOMName;
                        oItem.FormViewerDetails.BasicDetails.DoseUOM.Value = oProInfo.DoseUOM.UOMId.ToString();
                        oItem.FormViewerDetails.BasicDetails.Duration = oProInfo.Duration.ToString();
                        oItem.FormViewerDetails.BasicDetails.DosageForm = new CListItem();
                        oItem.FormViewerDetails.BasicDetails.DosageForm.DisplayText = oProInfo.Form.FormName;
                        oItem.FormViewerDetails.BasicDetails.DosageForm.Value = oProInfo.Form.FormId.ToString();
                        oItem.FormViewerDetails.BasicDetails.Route = new CListItem();
                        oItem.FormViewerDetails.BasicDetails.Route.DisplayText = oProInfo.Route.RouteName;
                        oItem.FormViewerDetails.BasicDetails.Route.Value = oProInfo.Route.RouteId.ToString();
                        oItem.FormViewerDetails.BasicDetails.Frequency = new CListItem();
                        oItem.FormViewerDetails.BasicDetails.Frequency.DisplayText = oProInfo.Frequency.FrequencyName;
                        oItem.FormViewerDetails.BasicDetails.Frequency.Value = oProInfo.Frequency.FrequencyId.ToString();
                        oItem.FormViewerDetails.BasicDetails.Quantity = oProInfo.Quantity.ToString();
                        oItem.FormViewerDetails.BasicDetails.AdminInstruction = new CListItem();
                        oItem.FormViewerDetails.BasicDetails.AdminInstruction.DisplayText = oProInfo.AdminInstructionName;
                        oItem.FormViewerDetails.BasicDetails.AdminInstruction.Value = oProInfo.AdminInstructionOID.ToString();
                        let oListItem: CListItem = new CListItem();
                        oListItem.DisplayText = oProInfo.SupplyInstruction;
                        oListItem.Value = oProInfo.SupplyInstruction;
                        oItem.FormViewerDetails.BasicDetails.Site = new CListItem();
                        oItem.FormViewerDetails.BasicDetails.Site.DisplayText = oProInfo.SiteName;
                    });
                    oItemVM.Add(oItem);
                });
                this.GridFavColumns = oItemVM;
            }
        }
        public DisposeVMObjects(): void {
            this.TreeVwParentGpObj = null;
            this.lstItemFav = null;
            this.lstItem = null;
        }
        public DoCleanUP(): void {
            this.DisposeVMObjects();
        }
    }
    
        export class PrescriptionItemVMDerived extends PrescriptionItemVM {
            private FavItemKeyFld: string;
            public get FavItemKey(): string {
                return this.FavItemKeyFld;
            }
            public set FavItemKey(value: string) {
                this.FavItemKeyFld = value;
            }
        }
    