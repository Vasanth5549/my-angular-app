import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,
    AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, Visibility, List, CListItem  } from 'epma-platform/models';
import { AppDialog, Image } from 'epma-platform/controls';
import { HelperService} from '../../shared/epma-platform/soap-client/helper.service';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { Dictionary, KeyValuePair } from 'epma-platform/dictionary';
import { AppSessionInfo, ClerkFormViewDeftBehaviour, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { CAActivity, CConstants, DoseTypeCode, PrescriptionTypes } from '../utilities/constants';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import { OrderSetInstance, PrescriptionItemVM } from './PrescriptionItemVM';
//import { CReqMsgGetIPPMAOrderSetAssociatedItemsList, IPPMAManagePrescriptionWSSoapClient } from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import * as IPPMAManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS'
import { Resource } from '../resource';
import { Common } from '../utilities/common';
import { CReqMsgGetIPPMAOrderSetAssociatedItemsList, GetIPPMAOrderSetAssociatedItemsListCompletedEventArgs, IPPMAManagePrescriptionWSSoapClient, OrderSetPrescriptionItems } from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { MedicationCommonProfileData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { MouseButtonEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import 'epma-platform/booleanextension';
import 'epma-platform/numberextension';
import 'epma-platform/stringextension';
import {iMath} from 'epma-platform/mathextension';
import 'epma-platform/arrayextension';
import { PopUpGridForOrderset } from '../view/PopUpGridForOrderset';
  
    export class OrderSetSecMezzanineVM extends ViewModelBase {
        private lOrderSetOID: number = 0;
        private sOrderSetName: string;
        private sGuidance: string;
        private sDisplayGuidance: string;
        private bconflictsON: boolean = false;
        private objPrescriptionList: ObservableCollection<PrescriptionItemAssociations>;
        private sLink: ObservableCollection<string>;
        private bIsEditable: boolean = false;
        private _prescriptionItems: Dictionary<string, PrescriptionItemVM>;
        //public delegate void OSItemsLoaded(bool IsEnabled, bool IsLinkDisabled);
        public OnOSItemsLoaded: Function;
        //public delegate void OSShowHyperlink(bool IsVisible);
        public OnShowHyperlink: Function;
        private sActivityType: string;
        private sNoDataMessage: string;
        //public delegate void OrderSetItemsLoadedDelegate(bool HasPermission);
        public OnOrderSetItemsLoadedDelegateChanged: Function;
        public IsDisableDRC: boolean = false;
        public IsDoNotOpenFormViewer: boolean = false;
        private _StartDateTime: DateTime= DateTime.MinValue;
        public get StartDateTime(): DateTime{
            return this._StartDateTime;
        }
        public set StartDateTime(value: DateTime) {
            if (this._StartDateTime != value) {
                this._StartDateTime = value;
               //NotifyPropertyChanged("StartDateTime");
            }
        }
        private _RangeStartDTTM: DateTime = DateTime.MinValue;
        public get RangeStartDTTM(): DateTime{
            return this._RangeStartDTTM;
        }
        public set RangeStartDTTM(value: DateTime) {
            if (this._RangeStartDTTM != value) {
                this._RangeStartDTTM = value;
               //NotifyPropertyChanged("RangeStartDTTM");
            }
        }
        private _RangeEndDTTM: DateTime = DateTime.MinValue;
        public get RangeEndDTTM(): DateTime{
            return this._RangeEndDTTM;
        }
        public set RangeEndDTTM(value: DateTime) {
            if (this._RangeEndDTTM != value) {
                this._RangeEndDTTM = value;
               //NotifyPropertyChanged("RangeEndDTTM");
            }
        }
        private _StartPrescriptionTime: DateTime = DateTime.MinValue;
        public get StartPrescriptionTime(): DateTime{
            return this._StartPrescriptionTime;
        }
        public set StartPrescriptionTime(value: DateTime) {
            if (this._StartPrescriptionTime != value) {
                this._StartPrescriptionTime = value;
               //NotifyPropertyChanged("StartPrescriptionTime");
            }
        }
        private _IsTopControlsEnabled: boolean = true;
        public get IsTopControlsEnabled(): boolean {
            return this._IsTopControlsEnabled;
        }
        public set IsTopControlsEnabled(value: boolean) {
            this._IsTopControlsEnabled = value;
           //NotifyPropertyChanged("IsTopControlsEnabled");
        }
        public get OrderSetName(): string {
            return this.sOrderSetName;
        }
        public set OrderSetName(value: string) {
            if (!String.IsNullOrEmpty(value)) {
                this.sOrderSetName = value;
               //NotifyPropertyChanged("OrderSetName");
            }
        }
        public get OrderSetOID(): number {
            return this.lOrderSetOID;
        }
        public set OrderSetOID(value: number) {
            this.lOrderSetOID = value;
           //NotifyPropertyChanged("OrderSetOID");
        }
        public get Guidance(): string {
            return this.sGuidance;
        }
        public set Guidance(value: string) {
            this.sGuidance = value;
           //NotifyPropertyChanged("Guidance");
        }
        public get DisplayGuidance(): string {
            return this.sDisplayGuidance;
        }
        public set DisplayGuidance(value: string) {
            this.sDisplayGuidance = value;
           //NotifyPropertyChanged("DisplayGuidance");
        }
        public get NoDataMessage(): string {
            return this.sNoDataMessage;
        }
        public set NoDataMessage(value: string) {
            this.sNoDataMessage = value;
           //NotifyPropertyChanged("NoDataMessage");
        }
        public get IsEditable(): boolean {
            return this.bIsEditable;
        }
        public set IsEditable(value: boolean) {
            this.bIsEditable = value;
           //NotifyPropertyChanged("IsEditable");
        }
        public IsLinkDisabled: boolean = false;
        public get Links(): ObservableCollection<string> {
            return this.sLink;
        }
        public set Links(value: ObservableCollection<string>) {
            this.sLink = value;
           //NotifyPropertyChanged("Links");
        }
        public get PrescriptionItems(): Dictionary<string, PrescriptionItemVM> {
            return this._prescriptionItems;
        }
        public set PrescriptionItems(value: Dictionary<string, PrescriptionItemVM>) {
            this._prescriptionItems = value;
        }
        public get PrescriptionItemList(): ObservableCollection<PrescriptionItemAssociations> {
            return this.objPrescriptionList;
        }
        public set PrescriptionItemList(value: ObservableCollection<PrescriptionItemAssociations>) {
            if (!ObjectHelper.ReferenceEquals(this.objPrescriptionList, value)) {
                this.objPrescriptionList = value;
               //NotifyPropertyChanged("PrescriptionItemList");
            }
        }
        public get IsConflictsON(): boolean {
            return this.bconflictsON;
        }
        public set IsConflictsON(value: boolean) {
            this.bconflictsON = value;
           //NotifyPropertyChanged("IsConflictsON");
        }
        public get ActivityType(): string {
            return this.sActivityType;
        }
        public set ActivityType(value: string) {
            this.sActivityType = value;
        }
        private _IsSetSequenceEnabled: boolean = false;
        public get IsSetSequenceEnabled(): boolean {
            return this._IsSetSequenceEnabled;
        }
        public set IsSetSequenceEnabled(value: boolean) {
            this._IsSetSequenceEnabled = value;
           //NotifyPropertyChanged("IsSetSequenceEnabled");
        }
        private _IsSetSequenceVisible: Visibility = Visibility.Collapsed;
        public get IsSetSequenceVisible(): Visibility {
            return this._IsSetSequenceVisible;
        }
        public set IsSetSequenceVisible(value: Visibility) {
            this._IsSetSequenceVisible = value;
           //NotifyPropertyChanged("IsSetSequenceVisible");
        }
        private _IsClearSequenceEnabled: boolean = false;
        public get IsClearSequenceEnabled(): boolean {
            return this._IsClearSequenceEnabled;
        }
        public set IsClearSequenceEnabled(value: boolean) {
            this._IsClearSequenceEnabled = value;
           //NotifyPropertyChanged("IsClearSequenceEnabled");
        }
        private _IsClearSequenceVisible: Visibility = Visibility.Collapsed;
        public get IsClearSequenceVisible(): Visibility {
            return this._IsClearSequenceVisible;
        }
        public set IsClearSequenceVisible(value: Visibility) {
            this._IsClearSequenceVisible = value;
           //NotifyPropertyChanged("IsClearSequenceVisible");
        }
        private _IsDoLinkEnabled: boolean = false;
        public get IsDoLinkEnabled(): boolean {
            return this._IsDoLinkEnabled;
        }
        public set IsDoLinkEnabled(value: boolean) {
            this._IsDoLinkEnabled = value;
           //NotifyPropertyChanged("IsDoLinkEnabled");
        }
        private _IsDoLinkVisible: Visibility = Visibility.Collapsed;
        public get IsDoLinkVisible(): Visibility {
            return this._IsDoLinkVisible;
        }
        public set IsDoLinkVisible(value: Visibility) {
            this._IsDoLinkVisible = value;
           //NotifyPropertyChanged("IsDoLinkVisible");
        }
        private _IsMoveUpEnabled: boolean = false;
        public get IsMoveUpEnabled(): boolean {
            return this._IsMoveUpEnabled;
        }
        public set IsMoveUpEnabled(value: boolean) {
            this._IsMoveUpEnabled = value;
           //NotifyPropertyChanged("IsMoveUpEnabled");
        }
        private _IsMoveUpVisible: Visibility = Visibility.Collapsed;
        public get IsMoveUpVisible(): Visibility {
            return this._IsMoveUpVisible;
        }
        public set IsMoveUpVisible(value: Visibility) {
            this._IsMoveUpVisible = value;
           //NotifyPropertyChanged("IsMoveUpVisible");
        }
        private _IsMoveDownEnabled: boolean = false;
        public get IsMoveDownEnabled(): boolean {
            return this._IsMoveDownEnabled;
        }
        public set IsMoveDownEnabled(value: boolean) {
            this._IsMoveDownEnabled = value;
           //NotifyPropertyChanged("IsMoveDownEnabled");
        }
        private _IsMoveDownVisible: Visibility = Visibility.Collapsed;
        public get IsMoveDownVisible(): Visibility {
            return this._IsMoveDownVisible;
        }
        public set IsMoveDownVisible(value: Visibility) {
            this._IsMoveDownVisible = value;
           //NotifyPropertyChanged("IsMoveDownVisible");
        }
        public IgnoreOrdetAssociations: string[];
        public IsPartialPrescribe: boolean = false;
        constructor();
		constructor(OrdsetOID?: number, sOrderSetName?: string);
		constructor(OrdsetOID?: number, sOrderSetName?: string, PrescriprionItemOIDs?: Dictionary<string, PrescriptionItemVM>, OrdersetLZOID?: string, ActivityType?: string, sTeamOIDs?: string);
		constructor(OrdsetOID?: number, sOrderSetName?: string, PrescriprionItemOIDs?: Dictionary<string, PrescriptionItemVM>, OrdersetLZOID?: string, ActivityType?: string, sTeamOIDs?: string)
		{
            super();
			switch (arguments.length) {
			case 2:
			 this.ActivityType = CAActivity.CA_PRESCRIBE;
            this.GetPrescriptionItemsforOrderSet(OrdsetOID, String.Empty, String.Empty);
            this.OrderSetName = sOrderSetName;
            this.OrderSetOID = OrdsetOID;
            this.StartDateTime = CommonBB.GetServerDateTime();
            this.StartPrescriptionTime = CommonBB.GetServerDateTime();
            if (PatientContext.EncounterStartDate != DateTime.MinValue) {
                if (PatientContext.PrescriptionType != PrescriptionTypes.Clerking && !String.Equals(PatientContext.ClerkFormViewDefaultBehavior, ClerkFormViewDeftBehaviour.LaunchFormMandatory)) {
                    this.RangeStartDTTM = PatientContext.EncounterStartDate.Date;
                }
                this.RangeEndDTTM = PatientContext.EncounterStartDate.AddYears(50);
            }
			break;
			case 6:
			this.ActivityType = ActivityType;
            this.GetPrescriptionItemsforOrderSet(OrdsetOID, OrdersetLZOID, sTeamOIDs);
            this.OrderSetName = sOrderSetName;
            this.OrderSetOID = OrdsetOID;
            this.PrescriptionItems = PrescriprionItemOIDs;
            this.StartDateTime = CommonBB.GetServerDateTime();
            this.StartPrescriptionTime = CommonBB.GetServerDateTime();
            if (PatientContext.EncounterStartDate != DateTime.MinValue) {
                if (PatientContext.PrescriptionType != PrescriptionTypes.Clerking && !String.Equals(PatientContext.ClerkFormViewDefaultBehavior, ClerkFormViewDeftBehaviour.LaunchFormMandatory)) {
                    this.RangeStartDTTM = PatientContext.EncounterStartDate.Date;
                }
                this.RangeEndDTTM = PatientContext.EncounterStartDate.AddYears(50);
            }
			break;
		}
        }
        private GetPrescriptionItemsforOrderSet(OrdsetOID: number, OrdersetLZOID: string, sTeamOIDs: string): void {
            let objservice1: IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescriptionWSSoapClient();
            objservice1.GetIPPMAOrderSetAssociatedItemsListCompleted  = (s,e) => { this.objservice1_GetIPPMAOrderSetAssociatedItemsListCompleted(s,e); } ;
            let oReq: CReqMsgGetIPPMAOrderSetAssociatedItemsList = new CReqMsgGetIPPMAOrderSetAssociatedItemsList();
            oReq.oContextInformation = Common.FillContext();
            oReq.OrderSetOIDBC = OrdsetOID;
            oReq.OrderSetLZOIDBC = OrdersetLZOID;
            oReq.sTeamOIDsBC = sTeamOIDs;
            if (!String.IsNullOrEmpty(this.ActivityType) && this.ActivityType == CAActivity.CA_REORDER) {
                oReq.PatientOIDBC = PatientContext.PatientOID;
            }
            oReq.MCVersionBC = AppSessionInfo.AMCV;
            objservice1.GetIPPMAOrderSetAssociatedItemsListAsync(oReq);
        }
        objservice1_GetIPPMAOrderSetAssociatedItemsListCompleted(sender: Object, e: GetIPPMAOrderSetAssociatedItemsListCompletedEventArgs): void {
            let _ErrorID: number = 80000055;
            this.IsLinkDisabled = false;
            let _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:OrderSetSecMezzanineVM, Method:objservice1_GetIPPMAOrderSetAssociatedItemsListCompleted()";
            let objResSearch: IPPMAManagePrescSer.CResMsgGetIPPMAOrderSetAssociatedItemsList = e.Result;
            if (e.Error == null) {
                try {
                    let oPresItem: ObservableCollection<PrescriptionItemAssociations> = new ObservableCollection<PrescriptionItemAssociations>();
                    let oInactivePresItem: ObservableCollection<OrderSetPrescriptionItems> = new ObservableCollection<OrderSetPrescriptionItems>();
                    if (objResSearch != null && objResSearch.ORSAssociatedItem != null && objResSearch.ORSAssociatedItem.ItemsList != null) {
                        objResSearch.ORSAssociatedItem.ItemsList = new ObservableCollection<OrderSetPrescriptionItems>(objResSearch.ORSAssociatedItem.ItemsList.OrderBy(x => x.DisplayOrder != null ? x.DisplayOrder : 0));
                        let itemcount: number = objResSearch.ORSAssociatedItem.ItemsList.Count;
                        let ObjAssociations: PrescriptionItemAssociations;
                        let oItemVM: PrescriptionItemVM;
                        let liHeaders: List<string> = new List<string>();
                        let liOrphanHeaders: List<KeyValuePair<number, string>> = new List<KeyValuePair<number, string>>();
                        if (objResSearch.ORSAssociatedItem != null && !String.IsNullOrEmpty(objResSearch.ORSAssociatedItem.OrphanHeaders)) {
                            liOrphanHeaders.AddRange(objResSearch.ORSAssociatedItem.OrphanHeaders.Split('\n').Select(x => new KeyValuePair<number, string>(Number.Parse(x.Substring(0, x.IndexOf('\t'))),
                                x.Substring(x.IndexOf('\t') + 1))).ToArray());
                        }
                        for (let nCnt: number = 0; nCnt < itemcount; nCnt++) {
                            ObjAssociations = new PrescriptionItemAssociations();
                            let _liOrphanHeaders: List<KeyValuePair<number, string>> = liOrphanHeaders.Where(x => x.Key < objResSearch.ORSAssociatedItem.ItemsList[nCnt].DisplayOrder).OrderBy(x => x.Key).ToList();
                            _liOrphanHeaders.ForEach(x => {
                                oPresItem.Add(ObjectHelper.CreateObject(new PrescriptionItemAssociations(), {
                                    PrescrptionItem: ObjectHelper.CreateObject(new PrescriptionItemVM(), {
                                        OsInstance: ObjectHelper.CreateObject(new OrderSetInstance(), {
                                            OsGroupHeaderName: x.Value,
                                            OsIsGroupHeader: true
                                        })
                                    }),
                                    IsPresOpenFVVisiblity: Visibility.Collapsed
                                }));
                                liOrphanHeaders.Remove(x);
                            });
                            if (!String.IsNullOrEmpty(objResSearch.ORSAssociatedItem.ItemsList[nCnt].HeaderName)) {
                                if (!liHeaders.Contains(objResSearch.ORSAssociatedItem.ItemsList[nCnt].HeaderName)) {
                                    let header: PrescriptionItemAssociations = ObjectHelper.CreateObject(new PrescriptionItemAssociations(), {
                                        PrescrptionItem: ObjectHelper.CreateObject(new PrescriptionItemVM(), {
                                            OsInstance: ObjectHelper.CreateObject(new OrderSetInstance(), {
                                                OsGroupHeaderName: objResSearch.ORSAssociatedItem.ItemsList[nCnt].HeaderName,
                                                OsIsGroupHeader: true
                                            })
                                        }),
                                        IsPresOpenFVVisiblity: Visibility.Collapsed
                                    });
                                    oPresItem.Add(header);
                                    liHeaders.Add(objResSearch.ORSAssociatedItem.ItemsList[nCnt].HeaderName);
                                }
                            }
                            let bCanAdd: boolean = objResSearch.ORSAssociatedItem.ItemsList[nCnt] != null;
                            if (objResSearch.ORSAssociatedItem.ItemsList[nCnt].Status == "A") {
                                let instance: OrderSetInstance = ObjectHelper.CreateObject(new OrderSetInstance(), { UniqId: nCnt + 1 });
                                let isClearking: boolean = (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.OrdinalIgnoreCase) == 0 || PatientContext.ClerkFormViewDefaultBehavior == ClerkFormViewDeftBehaviour.LaunchFormMandatory);
                                instance.IsPrescribed = this.IgnoreOrdetAssociations != null && objResSearch.ORSAssociatedItem.ItemsList[nCnt].ORSAssociationOID > 0 && this.IgnoreOrdetAssociations.Any(x => x == objResSearch.ORSAssociatedItem.ItemsList[nCnt].ORSAssociationOID.ToString());
                                if (instance.IsPrescribed) {
                                    objResSearch.ORSAssociatedItem.ItemsList[nCnt].TimeAdjustValue = null;
                                }
                                if (objResSearch.ORSAssociatedItem.ItemsList[nCnt].PrescriptionItemDetails != null && objResSearch.ORSAssociatedItem.ItemsList[nCnt].PrescriptionItemDetails.BasicProperties != null && objResSearch.ORSAssociatedItem.ItemsList[nCnt].PrescriptionItemDetails.BasicProperties.FrequencyDetails != null && !String.IsNullOrEmpty(objResSearch.ORSAssociatedItem.ItemsList[nCnt].PrescriptionItemDetails.BasicProperties.FrequencyDetails.FreqCode)) {
                                    instance.FreqPeriodCode = objResSearch.ORSAssociatedItem.ItemsList[nCnt].PrescriptionItemDetails.BasicProperties.FrequencyDetails.FreqCode;
                                }
                                if (!isClearking) {
                                    instance.OsIsProtected = !String.IsNullOrEmpty(objResSearch.ORSAssociatedItem.ItemsList[nCnt].SequenceType) && objResSearch.ORSAssociatedItem.ItemsList[nCnt].SequenceType.Equals("2", StringComparison.OrdinalIgnoreCase);
                                    instance.OsIsSequential = ObjectHelper.HasValue(objResSearch.ORSAssociatedItem.ItemsList[nCnt].SequentialID) && objResSearch.ORSAssociatedItem.ItemsList[nCnt].SequentialID.Value > 0;
                                    if (instance.OsIsSequential) {
                                        instance.OsIsSequential = ObjectHelper.HasValue(objResSearch.ORSAssociatedItem.ItemsList[nCnt].SequentialID) && objResSearch.ORSAssociatedItem.ItemsList[nCnt].SequentialID.Value > 0;
                                        instance.OsSeqGroupNo = objResSearch.ORSAssociatedItem.ItemsList[nCnt].SequentialID.Value;
                                        let isPreviouseSequential: boolean = nCnt > 0 && ObjectHelper.HasValue(objResSearch.ORSAssociatedItem.ItemsList[nCnt - 1].SequentialID) && objResSearch.ORSAssociatedItem.ItemsList[nCnt - 1].SequentialID.Value > 0;
                                        if (isPreviouseSequential) {
                                            if (objResSearch.ORSAssociatedItem.ItemsList[nCnt - 1].SequentialID.Value == objResSearch.ORSAssociatedItem.ItemsList[nCnt].SequentialID.Value) {
                                                for (let i: number = oPresItem.Count - 1; i >= 0; i--) {
                                                    if (oPresItem[i].PrescrptionItem.OsInstance.OsSeqGroupNo == objResSearch.ORSAssociatedItem.ItemsList[nCnt].SequentialID.Value) {
                                                        instance.OsDisplayOrder = oPresItem[i].PrescrptionItem.OsInstance.OsDisplayOrder + 1;
                                                        break;
                                                    }
                                                }
                                            }
                                            else {
                                                instance.OsDisplayOrder = 1;
                                                instance.OsIsFirstItem = true;
                                            }
                                        }
                                        else {
                                            instance.OsDisplayOrder = 1;
                                            instance.OsIsFirstItem = true;
                                        }
                                        if (objResSearch.ORSAssociatedItem.ItemsList.Count - 1 == nCnt) {
                                            instance.OsIsLastItem = true;
                                        }
                                        else if (!ObjectHelper.HasValue(objResSearch.ORSAssociatedItem.ItemsList[nCnt + 1].SequentialID) || objResSearch.ORSAssociatedItem.ItemsList[nCnt + 1].SequentialID.Value != objResSearch.ORSAssociatedItem.ItemsList[nCnt].SequentialID.Value) {
                                            instance.OsIsLastItem = true;
                                        }
                                    }
                                }
                                oItemVM = new PrescriptionItemVM(null);
                                if (objResSearch.ORSAssociatedItem.ItemsList[nCnt].PrescriptionItemDetails.BasicProperties != null) {
                                    if (objResSearch.ORSAssociatedItem.ItemsList[nCnt].PrescriptionItemDetails.BasicProperties.OrderSet == null) {
                                        objResSearch.ORSAssociatedItem.ItemsList[nCnt].PrescriptionItemDetails.BasicProperties.OrderSet = new IPPMAManagePrescSer.ObjectInfo();
                                        objResSearch.ORSAssociatedItem.ItemsList[nCnt].PrescriptionItemDetails.BasicProperties.OrderSet.OID = this.OrderSetOID;
                                    }
                                }
                                oItemVM.GetPresItemDetails(objResSearch.ORSAssociatedItem.ItemsList[nCnt].PrescriptionItemDetails);
                                if (objResSearch.ORSAssociatedItem.ItemsList[nCnt].PrescriptionItemDetails.BasicProperties != null) {
                                    oItemVM.IsAccessContraint = objResSearch.ORSAssociatedItem.ItemsList[nCnt].PrescriptionItemDetails.IsAccessContraint;
                                }
                                if (oItemVM != null && String.Equals(oItemVM.IsAccessContraint, "1", StringComparison.CurrentCultureIgnoreCase)) {
                                    oItemVM.FillPresItemProcDetail();
                                }
                                oItemVM.LorenzoID = objResSearch.ORSAssociatedItem.ItemsList[nCnt].PrescriptionItemDetails.LorenzoID;
                                oItemVM.PrescribableItemDetailOID = objResSearch.ORSAssociatedItem.ItemsList[nCnt].PrescriptionItemDetails.OID;
                                if (oItemVM.PrescriptionItemOID != 0) {
                                    oItemVM.PrescribableItemOID = oItemVM.PrescriptionItemOID;
                                }
                                oItemVM.PrescriptionItemOID = 0;
                                if ((objResSearch.ORSAssociatedItem.ItemsList[nCnt].PrescriptionItemDetails.DoseFormulaDet != null) && (MedicationCommonProfileData.PrescribeConfig.EnableDoseCalc) && ((!String.IsNullOrEmpty(objResSearch.ORSAssociatedItem.ItemsList[nCnt].PrescriptionItemDetails.DoseFormulaDet.BSAFormula)) || (!String.IsNullOrEmpty(objResSearch.ORSAssociatedItem.ItemsList[nCnt].PrescriptionItemDetails.DoseFormulaDet.CalculationFor)) || (!String.IsNullOrEmpty(objResSearch.ORSAssociatedItem.ItemsList[nCnt].PrescriptionItemDetails.DoseFormulaDet.IsDoseCalcAlwaysUse) && String.Equals(objResSearch.ORSAssociatedItem.ItemsList[nCnt].PrescriptionItemDetails.DoseFormulaDet.IsDoseCalcAlwaysUse, "1")) || (!String.IsNullOrEmpty(objResSearch.ORSAssociatedItem.ItemsList[nCnt].PrescriptionItemDetails.DoseFormulaDet.DoseCalcFrequencyName)) || (!String.IsNullOrEmpty(objResSearch.ORSAssociatedItem.ItemsList[nCnt].PrescriptionItemDetails.DoseFormulaDet.DoseCalcBasedOn)) || (!String.IsNullOrEmpty(objResSearch.ORSAssociatedItem.ItemsList[nCnt].PrescriptionItemDetails.DoseFormulaDet.DefaultWeightType)) || (!String.IsNullOrEmpty(objResSearch.ORSAssociatedItem.ItemsList[nCnt].PrescriptionItemDetails.DoseFormulaDet.RequestedDose)))) {
                                    oItemVM.IsDoseCalcInfo = true;
                                }
                                else {
                                    oItemVM.IsDoseCalcInfo = false;
                                }
                                let scurrentkey: string = String.Empty;
                                if (this.PrescriptionItems != null) {
                                    if (oItemVM != null && oItemVM.FormViewerDetails != null && oItemVM.FormViewerDetails.BasicDetails != null) {
                                        this.PrescriptionItems.forEach( (pritem)=> {
                                            if (oItemVM.FormViewerDetails.BasicDetails.IdentifyingOID.ToString() == pritem.Key.Split('-')[0]) {
                                                oItemVM = pritem.Value;
                                                if (oItemVM.FormViewerDetails.BasicDetails.CareTaker.Memento != null && oItemVM.FormViewerDetails.BasicDetails.CareTaker.Memento.Count > 0)
                                                    oItemVM.FormViewerDetails.BasicDetails.CareTaker.Memento.Clear();
                                                oItemVM.FormViewerDetails.BasicDetails.CareTaker.Memento.Add(oItemVM.FormViewerDetails.BasicDetails.Clone);
                                                scurrentkey = pritem.Key;
                                                return;
                                            }
                                            else if (objResSearch.ORSAssociatedItem.ItemsList[nCnt].ORSMainAppIdentifyingOID.ToString() == pritem.Key.Split('-')[0]) {
                                                oItemVM = pritem.Value;
                                                if (oItemVM.FormViewerDetails.BasicDetails.CareTaker.Memento != null && oItemVM.FormViewerDetails.BasicDetails.CareTaker.Memento.Count > 0)
                                                    oItemVM.FormViewerDetails.BasicDetails.CareTaker.Memento.Clear();
                                                oItemVM.FormViewerDetails.BasicDetails.CareTaker.Memento.Add(oItemVM.FormViewerDetails.BasicDetails.Clone);
                                                scurrentkey = pritem.Key;
                                                return;
                                            }
                                        });
                                    }
                                    if (!String.IsNullOrEmpty(scurrentkey)) {
                                        this.PrescriptionItems.Remove(scurrentkey);
                                    }
                                }
                                oItemVM.FormViewerDetails.BasicDetails.Ordersets = ObjectHelper.CreateObject(new CListItem(), {
                                    Value: this.OrderSetOID.ToString(),
                                    DisplayText: this.OrderSetName,
                                    ToolTip: Resource.ORSSecMezzanine.ORSIcon_ToolTip + " " + this.OrderSetName,
                                    IsSelected: objResSearch.ORSAssociatedItem.IsConflictsON,
                                    Tag: objResSearch.ORSAssociatedItem.ItemsList[nCnt].ORSAssociationOID,
                                    IsDefault: objResSearch.ORSAssociatedItem.IsDisableDoseRangeCheck
                                });
                                if (oItemVM.FormViewerDetails.BasicDetails.Ordersets != null && oItemVM.FormViewerDetails.BasicDetails.Ordersets.Tag != null) {
                                    if (!String.IsNullOrEmpty(oItemVM.FormViewerDetails.BasicDetails.Ordersets.Tag.ToString()))
                                        oItemVM.FormViewerDetails.BasicDetails.OrdersetAssociationOID = oItemVM.FormViewerDetails.BasicDetails.Ordersets.Tag.ToString();
                                }
                                ObjAssociations.PrescribingNote = objResSearch.ORSAssociatedItem.ItemsList[nCnt].PrescriptionItemDetails.PrescribingNote;
                                if (objResSearch != null && objResSearch.ORSAssociatedItem != null && objResSearch.ORSAssociatedItem.ItemsList[nCnt] != null && objResSearch.ORSAssociatedItem.ItemsList[nCnt].PrescriptionItemDetails != null && objResSearch.ORSAssociatedItem.ItemsList[nCnt].PrescriptionItemDetails.BasicProperties != null) {
                                    ObjAssociations.HasPermission = objResSearch.ORSAssociatedItem.ItemsList[nCnt].PrescriptionItemDetails.BasicProperties.HasPermission;
                                }
                                ObjAssociations.PrescrptionItem = oItemVM;
                                ObjAssociations.ActivityType = this.ActivityType;
                                if (this.ActivityType == CAActivity.CA_REORDER) {
                                    ObjAssociations.PrescrptionItem.IsOrderSetLastItem = false;
                                }
                                ObjAssociations.Offset = objResSearch.ORSAssociatedItem.ItemsList[nCnt].Offset;
                                ObjAssociations.MainappOID = objResSearch.ORSAssociatedItem.ItemsList[nCnt].ORSMainAppIdentifyingOID;
                                let offsetvalue: number = (!String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Clerking) && PatientContext.ClerkFormViewDefaultBehavior != ClerkFormViewDeftBehaviour.LaunchFormMandatory) ? objResSearch.ORSAssociatedItem.ItemsList[nCnt].OffsetValue : 0;
                                if (offsetvalue > 0) {
                                    if ((String.Compare(objResSearch.ORSAssociatedItem.ItemsList[nCnt].OffsetPeriod, "CC_WEEKS", StringComparison.OrdinalIgnoreCase) == 0)) {
                                        let numberofdays: number = offsetvalue * 7;
                                        ObjAssociations.StartDTTM = DateTime.MinValue;
                                        if (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.OrdinalIgnoreCase) != 0) {
                                            ObjAssociations.StartDTTM = CommonBB.GetServerDateTime().AddDays(numberofdays);
                                            ObjAssociations.StartPrescriptionTime = ObjAssociations.StartDTTM;
                                        }
                                        else {
                                            ObjAssociations.StartDTTM = CommonBB.GetServerDateTime().AddDays(numberofdays).Date;
                                            ObjAssociations.StartPrescriptionTime = CommonBB.GetServerDateTime().AddDays(numberofdays);
                                        }
                                    }
                                    else if ((String.Compare(objResSearch.ORSAssociatedItem.ItemsList[nCnt].OffsetPeriod, "CC_DAYS", StringComparison.OrdinalIgnoreCase) == 0)) {
                                        ObjAssociations.StartDTTM = DateTime.MinValue;
                                        if (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.OrdinalIgnoreCase) != 0) {
                                            ObjAssociations.StartDTTM = CommonBB.GetServerDateTime().AddDays(offsetvalue);
                                            ObjAssociations.StartPrescriptionTime = ObjAssociations.StartDTTM;
                                        }
                                        else {
                                            ObjAssociations.StartDTTM = CommonBB.GetServerDateTime().AddDays(offsetvalue).Date;
                                            ObjAssociations.StartPrescriptionTime = CommonBB.GetServerDateTime().AddDays(offsetvalue);
                                        }
                                    }
                                    else if ((String.Compare(objResSearch.ORSAssociatedItem.ItemsList[nCnt].OffsetPeriod, "CC_HOURS", StringComparison.OrdinalIgnoreCase) == 0)) {
                                        ObjAssociations.StartDTTM = DateTime.MinValue;
                                        if (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.OrdinalIgnoreCase) != 0) {
                                            ObjAssociations.StartDTTM = CommonBB.GetServerDateTime().AddHours(offsetvalue);
                                            ObjAssociations.StartPrescriptionTime = ObjAssociations.StartDTTM;
                                        }
                                        else {
                                            ObjAssociations.StartDTTM = CommonBB.GetServerDateTime().AddHours(offsetvalue).Date;
                                            ObjAssociations.StartPrescriptionTime = CommonBB.GetServerDateTime().AddHours(offsetvalue);
                                        }
                                    }
                                }
                                else if (offsetvalue == 0) {
                                    if (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.OrdinalIgnoreCase) != 0) {
                                        ObjAssociations.StartDTTM = CommonBB.GetServerDateTime();
                                        ObjAssociations.StartPrescriptionTime = CommonBB.GetServerDateTime();
                                    }
                                    else {
                                        ObjAssociations.StartDTTM = CommonBB.GetServerDateTime().Date;
                                        ObjAssociations.StartPrescriptionTime = CommonBB.GetServerDateTime();
                                    }
                                }
                                if (String.Equals(objResSearch.ORSAssociatedItem.ItemsList[nCnt].TimeAdjustValue, CConstants.ORSAllow, StringComparison.InvariantCultureIgnoreCase)) {
                                    if (!String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Clerking) && PatientContext.ClerkFormViewDefaultBehavior != ClerkFormViewDeftBehaviour.LaunchFormMandatory) {
                                        ObjAssociations.IsTimeAdjustEnabled = true;
                                    }
                                    ObjAssociations.IsTimeAdjust = false;
                                }
                                else if (String.Equals(objResSearch.ORSAssociatedItem.ItemsList[nCnt].TimeAdjustValue, CConstants.ORSAllowAndPreselect, StringComparison.InvariantCultureIgnoreCase)) {
                                    if (!String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Clerking) && PatientContext.ClerkFormViewDefaultBehavior != ClerkFormViewDeftBehaviour.LaunchFormMandatory) {
                                        ObjAssociations.IsTimeAdjustEnabled = true;
                                        ObjAssociations.IsTimeAdjust = true;
                                    }
                                }
                                else if (String.IsNullOrEmpty(objResSearch.ORSAssociatedItem.ItemsList[nCnt].TimeAdjustValue)) {
                                    ObjAssociations.IsTimeAdjustEnabled = false;
                                    ObjAssociations.IsTimeAdjust = false;
                                }
                                let isDoNotOpenChecked: boolean = objResSearch.ORSAssociatedItem != null && ObjectHelper.HasValue(objResSearch.ORSAssociatedItem.IsDoNotOpenFormViewer) ? objResSearch.ORSAssociatedItem.IsDoNotOpenFormViewer.Value : <boolean>null;
                                let IsSV: boolean = ObjAssociations != null && ObjAssociations.PrescrptionItem != null && ObjAssociations.PrescrptionItem.FormViewerDetails != null && ObjAssociations.PrescrptionItem.FormViewerDetails.BasicDetails != null && ObjAssociations.PrescrptionItem.FormViewerDetails.BasicDetails.DoseType != null && String.Equals(ObjAssociations.PrescrptionItem.FormViewerDetails.BasicDetails.DoseType.Value, DoseTypeCode.STEPPEDVARIABLE);
                                ObjAssociations.IsPresOpenFVChecked = (ObjectHelper.HasValue(isDoNotOpenChecked) && !isDoNotOpenChecked.Value) || IsSV;
                                ObjAssociations.IsPresOpenFVVisiblity = ObjectHelper.HasValue(isDoNotOpenChecked) && isDoNotOpenChecked.Value ? Visibility.Visible : Visibility.Collapsed;
                                ObjAssociations.IsPresOpenFVReadOnly = IsSV || instance.IsPrescribed;
                                oItemVM.FormViewerDetails.BasicDetails.IsDTTMSetViaORSMezzanine = true;
                                oItemVM.FormViewerDetails.BasicDetails.TimeMinValueFlag = false;
                                if (DateTime.NotEquals(ObjAssociations.StartDTTM, DateTime.MinValue)) {
                                    ObjAssociations.OriginalStartDTTM = ObjAssociations.StartDTTM;
                                }
                                if (DateTime.NotEquals(ObjAssociations.StartPrescriptionTime, DateTime.MinValue)) {
                                    ObjAssociations.OriginalStartPrescriptionTime = ObjAssociations.StartPrescriptionTime;
                                }
                                if (DateTime.NotEquals(PatientContext.EncounterStartDate, DateTime.MinValue)) {
                                    oItemVM.FormViewerDetails.BasicDetails.RangeStartDTTM = DateTime.MinValue;
                                    if (PatientContext.PrescriptionType != PrescriptionTypes.Clerking && !String.Equals(PatientContext.ClerkFormViewDefaultBehavior, ClerkFormViewDeftBehaviour.LaunchFormMandatory)) {
                                        oItemVM.FormViewerDetails.BasicDetails.RangeStartDTTM = PatientContext.EncounterStartDate.Date;
                                    }
                                    oItemVM.FormViewerDetails.BasicDetails.RangeEndDTTM = PatientContext.EncounterStartDate.AddYears(50);
                                }
                                oItemVM.FormViewerDetails.BasicDetails.IsOrderSetIconVisible = Visibility.Visible;
                                if (String.IsNullOrEmpty(oItemVM.FormularyNote)) {
                                    ObjAssociations.FormularyNoteVisible = Visibility.Collapsed;
                                }
                                else {
                                    ObjAssociations.FormularyNoteVisible = Visibility.Visible;
                                }
                                ObjAssociations.Default = (objResSearch.ORSAssociatedItem.ItemsList[nCnt].isDefault == "1" ? "Yes" : "No");
                                ObjAssociations.ordersetVM = this;
                                oItemVM.ordersetItem = ObjAssociations;
                                if (ObjAssociations.PrescrptionItem.PrescriptionItemStatus == CConstants.ONHOLD) {
                                    continue;
                                }
                                else {
                                    ObjAssociations.PrescrptionItem.OsInstance = instance;
                                    let isPartial: boolean = this.IgnoreOrdetAssociations != null && this.IgnoreOrdetAssociations.length > 0;
                                    if (ObjAssociations != null && ObjAssociations.PrescrptionItem != null && ObjAssociations.PrescrptionItem.OsInstance != null) {
                                        if (isClearking || isPartial) {
                                            if (ObjAssociations.PrescrptionItem.OsInstance.OsIsSequential) {
                                                ObjAssociations.PrescrptionItem.OsInstance.OsIsGroupHeader = false;
                                                ObjAssociations.PrescrptionItem.OsInstance.OsGroupHeaderName = null;
                                                ObjAssociations.PrescrptionItem.OsInstance.OsSeqGroupNo = 0;
                                                ObjAssociations.PrescrptionItem.OsInstance.OsIsSequential = false;
                                                ObjAssociations.PrescrptionItem.OsInstance.OsIsProtected = false;
                                                ObjAssociations.PrescrptionItem.OsInstance.OsDisplayOrder = 0;
                                                ObjAssociations.PrescrptionItem.OsInstance.OsIsFirstItem = false;
                                                ObjAssociations.PrescrptionItem.OsInstance.OsIsLastItem = false;
                                            }
                                        }
                                        else if (ObjAssociations.PrescrptionItem.OsInstance.OsIsSequential && !ObjAssociations.PrescrptionItem.OsInstance.OsIsFirstItem) {
                                            ObjAssociations.StartDTTM = null;
                                            ObjAssociations.StartPrescriptionTime = null;
                                        }
                                    }
                                    oPresItem.Add(ObjAssociations);
                                }
                            }
                            else {
                                oInactivePresItem.Add(objResSearch.ORSAssociatedItem.ItemsList[nCnt]);
                            }
                        }
                        liOrphanHeaders.OrderBy(x => x.Key).ForEach(x => {
                            oPresItem.Add(ObjectHelper.CreateObject(new PrescriptionItemAssociations(), {
                                PrescrptionItem: ObjectHelper.CreateObject(new PrescriptionItemVM(), {
                                    OsInstance: ObjectHelper.CreateObject(new OrderSetInstance(), {
                                        OsGroupHeaderName: x.Value,
                                        OsIsGroupHeader: true
                                    })
                                }),
                                IsPresOpenFVVisiblity: Visibility.Collapsed
                            }));
                            liOrphanHeaders.Remove(x);
                        });
                        if (oPresItem != null && oPresItem.Count > 0) {
                            this.IsTopControlsEnabled = oPresItem.Any(x => x.IsTimeAdjust);
                        }
                        if ((oInactivePresItem != null && oInactivePresItem.Count > 0) && (oInactivePresItem.Count == objResSearch.ORSAssociatedItem.ItemsList.Count)) {
                            this.NoDataMessage = Resource.ORSSecMezzanine.ORSItmGridDeactivated_Text;
                            this.IsLinkDisabled = true;
                        }
                        else {
                            this.IsLinkDisabled = false;
                            this.NoDataMessage = Resource.ORSSecMezzanine.NoItems_Text;
                            let MCIMsgText: string = String.Empty;
                            let bIsNormalItem: boolean = false;
                            if (oInactivePresItem.Count > 0) {
                                let sdeactivateditems: string = String.Empty;
                                for (let i: number = 0; i < oInactivePresItem.Count; i++) {
                                    if (String.IsNullOrEmpty(oInactivePresItem[i].PrescriptionItemDetails.ITMSUBTYP) || String.Equals(oInactivePresItem[i].PrescriptionItemDetails.ITMSUBTYP, "CC_NONEE"))
                                        bIsNormalItem = true;
                                    if (String.Equals(oInactivePresItem[i].PrescriptionItemDetails.ITMSUBTYP, "CC_MULCMPNTITM") && String.IsNullOrEmpty(MCIMsgText))
                                        MCIMsgText = Resource.ORSSecMezzanine.ORSMCItmDeactivated_Text1;
                                    if (String.IsNullOrEmpty(sdeactivateditems)) {
                                        sdeactivateditems = oInactivePresItem[i].PrescriptionItemDetails.IdentifyingName;
                                    }
                                    else {
                                        sdeactivateditems = sdeactivateditems + "\n" + oInactivePresItem[i].PrescriptionItemDetails.IdentifyingName;
                                    }
                                }
                                if (bIsNormalItem) {
                                    let imsg: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                                        Height: 180,
                                        IconType: MessageBoxType.Information,
                                        MessageButton: MessageBoxButton.OK,
                                        Title: "Lorenzo",
                                        Message: (!String.IsNullOrEmpty(MCIMsgText)) ? Resource.ORSSecMezzanine.ORSItmDeactivated1_Text + " " + MCIMsgText + " " + Resource.ORSSecMezzanine.ORSItmDeactivated3_Text + "\n" + sdeactivateditems + "\n" + Resource.ORSSecMezzanine.ORSItmDeactivated2_Text : Resource.ORSSecMezzanine.ORSItmDeactivated1_Text + " " + Resource.ORSSecMezzanine.ORSItmDeactivated3_Text + "\n" + sdeactivateditems + "\n" + Resource.ORSSecMezzanine.ORSItmDeactivated2_Text
                                    });
                                    imsg.Show();
                                }
                                else if (!String.IsNullOrEmpty(MCIMsgText)) {
                                    let imsg: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                                        Height: 180,
                                        IconType: MessageBoxType.Information,
                                        MessageButton: MessageBoxButton.OK,
                                        Title: "Lorenzo",
                                        Message: Resource.ORSSecMezzanine.ORSMCItmDeactivated_Text2 + " " + Resource.ORSSecMezzanine.ORSItmDeactivated3_Text + "\n" + sdeactivateditems + "\n" + Resource.ORSSecMezzanine.ORSItmDeactivated2_Text
                                    });
                                    imsg.Show();
                                }
                            }
                        }
                        this.PrescriptionItemList = oPresItem;
                        this.Guidance = objResSearch.ORSAssociatedItem.GuidanceText;
                        this.IsConflictsON = objResSearch.ORSAssociatedItem.IsConflictsON;
                        this.IsDisableDRC = objResSearch.ORSAssociatedItem.IsDisableDoseRangeCheck;
                        this.IsDoNotOpenFormViewer = objResSearch.ORSAssociatedItem != null && ObjectHelper.HasValue(objResSearch.ORSAssociatedItem.IsDoNotOpenFormViewer) ? objResSearch.ORSAssociatedItem.IsDoNotOpenFormViewer.Value : <boolean>null;
                        if (!String.IsNullOrEmpty(this.Guidance) && this.Guidance.length > 500) {
                            this.DisplayGuidance = this.Guidance.Substring(0, 450) + "...";
                            if (this.OnShowHyperlink != null) {
                                this.OnShowHyperlink(true);
                            }
                        }
                        else {
                            this.DisplayGuidance = this.Guidance;
                            if (this.OnShowHyperlink != null) {
                                this.OnShowHyperlink(false);
                            }
                        }
                        this.Links = objResSearch.ORSAssociatedItem.Links;
                        this.IsEditable = objResSearch.ORSAssociatedItem.IsEditable;
                        let IsNotAllowedToReorderOrderset: boolean = this.PrescriptionItemList.Any(x => x.HasPermission == false);
                        if (this.OnOrderSetItemsLoadedDelegateChanged != null) {
                            this.OnOrderSetItemsLoadedDelegateChanged(IsNotAllowedToReorderOrderset);
                        }
                        if (this.OnOSItemsLoaded != null) {
                            this.OnOSItemsLoaded(this.IsEditable, this.IsLinkDisabled);
                        }
                    }
                }
               catch(ex:any)  {
                    let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
        }
        public SequenciatlLinkButtonEvent(SequenceLinkIcon: Image): void {
            SequenceLinkIcon.MouseLeftButtonUp  = (s,e) => { this.LaunchSequentialLinkButton(s,e); } ;
        }
        public LaunchSequentialLinkButton(sender: Object, e: MouseButtonEventArgs): void {
            this.LaunchSequentialOrdersetPopup();
        }
        public bSeqMezClicked: boolean = false;
        public LaunchSequentialOrdersetPopup(): void {
            if (this.PrescriptionItemList != null && !this.bSeqMezClicked) {
                this.bSeqMezClicked = true;
                //Not Required for LHS. To be Re-Visited.
                PopUpGridForOrderset.GetOrdersetRecordsFromVM(this.PrescriptionItemList, (s, e) => this.OnSequentialMezzanineClosed(s));
                return
            }
        }
        OnSequentialMezzanineClosed(args: AppDialogEventargs): void {
            this.bSeqMezClicked = false;
            if (args != null && args.AppChildWindow != null)
                args.AppChildWindow.DialogResult = true;
        }
    }
    export class PrescriptionItemAssociations extends ViewModelBase {
        private sOffset: string;
        private sPresItems: PrescriptionItemVM;
        private sIsDefault: string;
        private sActivityType: string;
        private lMainAppOID: number = 0;
        private sFormularyNoteVisible: Visibility = Visibility.Collapsed;
        private sPrescribingNote: string;
        private _HasPermission: boolean = false;
        public ordersetVM: OrderSetSecMezzanineVM;
        private _IsTimeAdjust: boolean = false;
        public get IsTimeAdjust(): boolean {
            return this._IsTimeAdjust;
        }
        public set IsTimeAdjust(value: boolean) {
            this._IsTimeAdjust = value;
            if (this.ordersetVM != null && this.ordersetVM.PrescriptionItemList != null && this.ordersetVM.PrescriptionItemList.Count > 0) {
                this.ordersetVM.IsTopControlsEnabled = this.ordersetVM.PrescriptionItemList.Any(x => x.IsTimeAdjust);
            }
           //NotifyPropertyChanged("IsTimeAdjust");
        }
        private _IsTimeAdjustEnabled: boolean = false;
        public get IsTimeAdjustEnabled(): boolean {
            return this._IsTimeAdjustEnabled;
        }
        public set IsTimeAdjustEnabled(value: boolean) {
            this._IsTimeAdjustEnabled = value;
           //NotifyPropertyChanged("IsTimeAdjustEnabled");
           //NotifyPropertyChanged("IsTimeAdjustEnabledRevd");
        }
        public get Offset(): string {
            return this.sOffset;
        }
        public set Offset(value: string) {
            if (value != this.sOffset) {
                this.sOffset = value;
               //NotifyPropertyChanged("Offset");
            }
        }
        private _StartDTTM: DateTime = DateTime.MinValue;
        public get StartDTTM(): DateTime{
            return this._StartDTTM;
        }
        public set StartDTTM(value: DateTime) {
            if (ObjectHelper.ReferenceEquals(this._StartDTTM, value) != true) {
                this._StartDTTM = value;
               //NotifyPropertyChanged("StartDTTM");
            }
        }
        public get StartDateTime(): DateTime{
            if (this.StartDTTM == DateTime.MinValue || this.StartDTTM == null) {
                if (this.StartPrescriptionTime) {
                    return DateTime.Now.Date.AddTime(this.StartPrescriptionTime);
                }
                else {
                    return DateTime.Now.Date;
                }
            }
            else {
                return this.StartDTTM.DateTime.AddTime(this.StartPrescriptionTime);
            }
        }
        private _StartPrescriptionTime: DateTime = DateTime.MinValue;
        public get StartPrescriptionTime(): DateTime{
            return this._StartPrescriptionTime;
        }
        public set StartPrescriptionTime(value: DateTime) {
            if (ObjectHelper.ReferenceEquals(this._StartPrescriptionTime, value) != true) {
                this._StartPrescriptionTime = value;
               //NotifyPropertyChanged("StartPrescriptionTime");
            }
        }
        private _OriginalStartDTTM: DateTime = DateTime.MinValue;
        public get OriginalStartDTTM(): DateTime{
            return this._OriginalStartDTTM;
        }
        public set OriginalStartDTTM(value: DateTime) {
            if (ObjectHelper.ReferenceEquals(this._OriginalStartDTTM, value) != true) {
                this._OriginalStartDTTM = value;
               //NotifyPropertyChanged("OriginalStartDTTM");
            }
        }
        private _OriginalStartPrescriptionTime: DateTime = DateTime.MinValue;
        public get OriginalStartPrescriptionTime(): DateTime{
            return this._OriginalStartPrescriptionTime;
        }
        public set OriginalStartPrescriptionTime(value: DateTime) {
            if (ObjectHelper.ReferenceEquals(this._OriginalStartPrescriptionTime, value) != true) {
                this._OriginalStartPrescriptionTime = value;
               //NotifyPropertyChanged("OriginalStartPrescriptionTime");
            }
        }
        public get ActivityType(): string {
            return this.sActivityType;
        }
        public set ActivityType(value: string) {
            if (!String.IsNullOrEmpty(value)) {
                this.sActivityType = value;
            }
        }
        public get PrescrptionItem(): PrescriptionItemVM {
            return this.sPresItems;
        }
        public set PrescrptionItem(value: PrescriptionItemVM) {
            this.sPresItems = value;
        }
        public get Default(): string {
            return this.sIsDefault;
        }
        public set Default(value: string) {
            this.sIsDefault = value;
        }
        public get FormularyNoteVisible(): Visibility {
            return this.sFormularyNoteVisible;
        }
        public set FormularyNoteVisible(value: Visibility) {
            this.sFormularyNoteVisible = value;
        }
        public get MainappOID(): number {
            return this.lMainAppOID;
        }
        public set MainappOID(value: number) {
            this.lMainAppOID = value;
        }
        public get PrescribingNote(): string {
            return this.sPrescribingNote;
        }
        public set PrescribingNote(value: string) {
            this.sPrescribingNote = value;
        }
        public get HasPermission(): boolean {
            return this._HasPermission;
        }
        public set HasPermission(value: boolean) {
            this._HasPermission = value;
        }
        private _IsTimeAdjustEnabledRevd: boolean = false;
        public get IsTimeAdjustEnabledRevd(): boolean {
            return this._IsTimeAdjustEnabled && !this.PrescrptionItem.OsInstance.IsPrescribed && (!this.PrescrptionItem.OsInstance.OsIsSequential || this.PrescrptionItem.OsInstance.OsIsFirstItem);
        }
        public set IsTimeAdjustEnabledRevd(value: boolean) {
            this._IsTimeAdjustEnabled = value;
           //NotifyPropertyChanged("IsTimeAdjustEnabledRevd");
        }
        private _IsPresOpenFVChecked: boolean = false;
        public get IsPresOpenFVChecked(): boolean {
            return this._IsPresOpenFVChecked;
        }
        public set IsPresOpenFVChecked(value: boolean) {
            if (this._IsPresOpenFVChecked != value) {
                this._IsPresOpenFVChecked = value;
               //NotifyPropertyChanged("IsPresOpenFVChecked");
            }
        }
        private _IsPresOpenFVReadOnly: boolean = false;
        public get IsPresOpenFVReadOnly(): boolean {
            return this._IsPresOpenFVReadOnly;
        }
        public set IsPresOpenFVReadOnly(value: boolean) {
            this._IsPresOpenFVReadOnly = value;
           //NotifyPropertyChanged("IsPresOpenFVReadOnly");
           //NotifyPropertyChanged("IsPresOpenFVEnabled");
        }
        public get IsPresOpenFVEnabled(): boolean {
            return !this._IsPresOpenFVReadOnly;
        }
        private _IsPresOpenFVVisiblity: Visibility;
        public get IsPresOpenFVVisiblity(): Visibility {
            return this._IsPresOpenFVVisiblity;
        }
        public set IsPresOpenFVVisiblity(value: Visibility) {
            this._IsPresOpenFVVisiblity = value;
           //NotifyPropertyChanged("IsPresOpenFVVisiblity");
        }
    }