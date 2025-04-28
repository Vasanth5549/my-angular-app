import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity,  ProcessRTE } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, ObservableCollection,  Visibility, RTEEventargs, List, CListItem, AppSessionInfo,  CValuesetTerm,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, RelayCommand} from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from '../../shared/epma-platform/soap-client/helper.service';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import *as Application from 'src/app/lorappcommonbb/amshelper';
import 'epma-platform/stringextension';
import { PrescriptionItemVM } from './PrescriptionItemVM';
import {  ConditionalDose, DoseState } from '../model/conditionaldose';
import { ClonableViewModelBase } from 'src/app/lorappmedicationcommonbb/model/cloneviewmodel';
import { IViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { ActivityTypes } from '../model/common';
import { AdditionalItemTypes,  CConstants,  CMedConstants, ConditionalDoseConstants, PrescriptionTypes, ValueDomain } from '../utilities/constants';
import { Common } from '../utilities/common';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { ConceptCodeData } from '../utilities/profiledata';
import { Dictionary } from 'epma-platform/dictionary';
import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { CommonFlags } from '../utilities/globalvariable';
import { medConditionalDoseRes } from '../resource/medconditionaldoseres.designer'
import { Resource } from '../resource';
import { CTreeListItem, iTreeViewCollection } from 'src/app/shared/epma-platform/controls-model/treeView.model';
import { CReqMsgGetDataItem, CResMsgGetDataItem, GetDataItemCompletedEventArgs, IPPMAPrescribableDefnWSSoapClient, IPPPrescribeItemLookUp, ObjectInfo, ObservationResult } from 'src/app/shared/epma-platform/soap-client/IPPMAPrescribableDefnWS';
import { ObjectHelper as Helper } from 'epma-platform/helper';
import { CReqMsgGetResultItemDetails, CResMsgGetResultItemDetails, GetResultItemDetailsCompletedEventArgs, ResultManagementWSSoapClient } from 'src/app/shared/epma-platform/soap-client/ResultManagementWS';
import 'epma-platform/booleanextension';
import 'epma-platform/numberextension';
import 'epma-platform/stringextension';
import {iMath as Math} from 'epma-platform/mathextension';
import 'epma-platform/arrayextension';
import { CBCDataitemsWSSoapClient, CReqMsgGetDataItemDetails, CResMsgGetDataItemDetails, DataitemListInfo, GetDataItemDetailsCompletedEventArgs } from 'src/app/shared/epma-platform/soap-client/CBCDataitemsWS';
  
    export class ConditionalDosingVM extends ClonableViewModelBase implements IViewModelBase {
        private _observationsResults: iTreeViewCollection;
        private _selectedObservationResult: CTreeListItem;
        private _doseDetails: ObservableCollection<ConditionalDose> = new ObservableCollection<ConditionalDose>();
        private _selectedDose: ConditionalDose;
        private _condition: ConditionalDose;
        private _rangeUOMs: ObservableCollection<CListItem>;
        private _rangeOperators: ObservableCollection<CListItem>;
        private _temprangeOperators: ObservableCollection<CListItem>;
        private _rangeOperator: CListItem;
        private _isInfusionRateVisible: Visibility = Visibility.Collapsed;
        private _isInfusionRateMandatory: boolean = false;
        private _conditionalDoseValue: string;
        private _gridDoseHeader: string;
        private infusionTypeFlag: boolean = false;
        private oItemVM: PrescriptionItemVM;
        private _doseUOMs: ObservableCollection<CListItem>;
        private _isNumericChecked: boolean = false;
        private _isInstructionChecked: boolean = false;
        private _isAddEnabled: boolean = false;
        private _isUpdateEnabled: boolean = false;
        private _isRemoveEnabled: boolean = false;
        private _doseVisibility: Visibility = Visibility.Visible;
        private _instructionVisibility: Visibility = Visibility.Collapsed;
        private _infusionVisibility: Visibility = Visibility.Collapsed;
        private _addCommand: RelayCommand;
        private _updateCommand: RelayCommand;
        private _removeCommand: RelayCommand;
        private lnIdentifyingOID: number = 0;
        private sIdentifyingType: string;
        private sMCVersion: string;
        private smcitemname: string;
        private lnprescriptionitemoid: number = 0;
        private sitemsubtype: string;
        private slorenzoid: string;
        private smcitemlist: string;
        private sActionCode: ActivityTypes;
        private _infRateNumeratorUOMList: ObservableCollection<CListItem>;
        private _infusionratedenoUOMList: ObservableCollection<CListItem>;
        //public delegate void ErrorEventArgs(long ErrorNumber, string ErrorMessage, string ContronID);
        public OnErrorEvent: Function;
        //public delegate void ConfirmationEventArgs(double DoseValue, string ConfirmationMessage, string ContronID, string Action);
        public OnConfirmEvent: Function;
        //public delegate void tvwConditionEnabledChanged(bool IsEnabled);
        public tvwConditionEnabledChangedEvent: Function;
        //public delegate void ConditionalDoseChanged(DoseState ConditionalDoseState);
        public ConditionalDoseChangedEvent: Function;
        public IsDoseAccepted: boolean = false;
        private _InfusionType: string;
        private _DoseType: string;
        private _IsDoseMandatory: boolean = false;
        private sAction: string = String.Empty;
        private IsOrdersetItem: boolean = false;
        public RangeOperatorLessthan: CListItem;
        public RangeOperatorLessthanOrEqualto: CListItem;
        public RangeOperatorGreterthan: CListItem;
        public RangeOperatorGreterthanOrEqualto: CListItem;
        constructor(IdentifyingOID: number, IdentifyingType: string, MCVersion: string, itemsubtype: string, mcitemname: string, prescriptionitemoid: number, Lorenzoid: string, mcitemlist: string, sAction: ActivityTypes, IsOrdersetPrescribing: boolean, RTEResult?:any) {
            super();
            if(RTEResult){
                this.OnRTEResultForDomainsCodes(RTEResult);
            } else {
                ProcessRTE.GetValuesByDomainCode(ValueDomain.RANGEOPERATOR, (s,e) => {this.OnRTEResultForDomainsCodes(s);});
            }
            this.lnIdentifyingOID = IdentifyingOID;
            this.sIdentifyingType = IdentifyingType;
            this.sMCVersion = MCVersion;
            this.sitemsubtype = itemsubtype;
            this.slorenzoid = Lorenzoid;
            this.smcitemname = mcitemname;
            this.lnprescriptionitemoid = prescriptionitemoid;
            this.smcitemlist = mcitemlist;
            this.sActionCode = sAction;
            this.IsOrdersetItem = IsOrdersetPrescribing;
            this.SetSelectedValues();
            this.LoadObservationsAndResults();
            this.ValueragneValidations();
        }
        OnRTEResultForDomainsCodes(args: RTEEventargs): void {
            if (args.Result != null) {
                this.RangeOperators = new ObservableCollection<CListItem>();
                this.TempRangeOperators = new ObservableCollection<CListItem>();
                this.RangeOperatorLessthan = new CListItem();
                this.RangeOperatorLessthanOrEqualto = new CListItem();
                this.RangeOperatorGreterthan = new CListItem();
                this.RangeOperatorGreterthanOrEqualto = new CListItem();
                (<List<CListItem>>args.Result).forEach( (oCListItem)=> {
                    this.RangeOperators.Add(oCListItem);
                    this.TempRangeOperators.Add(oCListItem);
                    if (String.Equals(oCListItem.Value, CMedConstants.Lessthan))
                        this.RangeOperatorLessthan = oCListItem;
                    else if (String.Equals(oCListItem.Value, CMedConstants.LessthanOrEqualto))
                        this.RangeOperatorLessthanOrEqualto = oCListItem;
                    else if (String.Equals(oCListItem.Value, CMedConstants.Greterthan))
                        this.RangeOperatorGreterthan = oCListItem;
                    else if (String.Equals(oCListItem.Value, CMedConstants.GreterthanOrEqualto))
                        this.RangeOperatorGreterthanOrEqualto = oCListItem;
                });
            }
        }
        private LoadObservationsAndResults(): void {
            if (String.Compare(this.sitemsubtype, CConstants.SUBTYPE, StringComparison.OrdinalIgnoreCase) == 0 && String.Compare(this.slorenzoid, CommonFlags.MClorenzoid, StringComparison.OrdinalIgnoreCase) == 0) {
                let oReq: CReqMsgGetDataItem = new CReqMsgGetDataItem();
                oReq.oContextInformation = Common.FillContext();
                oReq.IdentifyingOIDBC = this.lnIdentifyingOID;
                oReq.IdentifyingTypeBC = this.sIdentifyingType;
                if (!String.IsNullOrEmpty(this.smcitemlist))
                    oReq.itemlistBC = this.smcitemlist;
                else {
                    oReq.PrescriptionitemoidBC = this.lnprescriptionitemoid;
                }
                oReq.MCVersionNoBC = String.IsNullOrEmpty(this.sMCVersion) ? AppSessionInfo.AMCV : this.sMCVersion;
                let serviceProxy: IPPMAPrescribableDefnWSSoapClient = new IPPMAPrescribableDefnWSSoapClient();
                serviceProxy.GetDataItemCompleted  = (s,e) => { this.serviceProxy_GetDataItemCompleted(s,e); } ;
                serviceProxy.GetDataItemAsync(oReq);
            }
            else {
                let oReq: CReqMsgGetDataItem = new CReqMsgGetDataItem();
                oReq.oContextInformation = Common.FillContext();
                oReq.IdentifyingOIDBC = this.lnIdentifyingOID;
                oReq.IdentifyingTypeBC = this.sIdentifyingType;
                oReq.MCVersionNoBC = this.sMCVersion;
                let serviceProxy: IPPMAPrescribableDefnWSSoapClient = new IPPMAPrescribableDefnWSSoapClient();
                serviceProxy.GetDataItemCompleted  = (s,e) => { this.serviceProxy_GetDataItemCompleted(s,e); } ;
                serviceProxy.GetDataItemAsync(oReq);
            }
        }
        serviceProxy_GetDataItemCompleted(sender: Object, e: GetDataItemCompletedEventArgs): void {
            let _ErrorID: number = 80000051;
            let _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:conditionalmVM, Method:serviceProxy_GetDataItemCompleted()";
            let tvcObseResults: iTreeViewCollection = new iTreeViewCollection();
            if (e.Error == null) {
                try {
                    let oRes: CResMsgGetDataItem = e.Result;
                    if (oRes != null && oRes.oObservationResult != null && oRes.oObservationResult.Count > 0) {
                        let bIsFirstObservation: boolean = true;
                        let bIsFirstResult: boolean = true;
                        let nLen: number = oRes.oObservationResult.Count;
                        let sLookUpType: string = String.Empty;
                        let sItemName: string = String.Empty;
                        let bIsSelected: boolean = false;
                        let bHasChildern: boolean = false;
                        let nChildrenCnt: number = 0;
                        let sDIName: string;
                        let isduplicate: boolean = false;
                        for (let i: number = 0; i < nLen; i++) {
                            bIsSelected = false;
                            isduplicate = false;
                            if (oRes.oObservationResult[i] == null)
                                continue;
                            sLookUpType = oRes.oObservationResult[i].ItemType;
                            sItemName = oRes.oObservationResult[i].ItemName;
                            if (String.Compare(sLookUpType, AdditionalItemTypes.Observation, StringComparison.OrdinalIgnoreCase) == 0) {
                                if (bIsFirstObservation) {
                                    tvcObseResults.Add(ObjectHelper.CreateObject(new CTreeListItem(), {
                                        Value: medConditionalDoseRes.Observation_Display,
                                        ToolTip:Resource.medConditionalDoseRes.tvwCondition_ToolTip,
                                        Key: ConditionalDoseConstants.ObservationKey,
                                        Tag: ConditionalDoseConstants.ObservationKey,
                                        Expanded: true
                                    }));
                                    bIsFirstObservation = false;
                                }
                                if (this.sActionCode == ActivityTypes.Amend || this.sActionCode == ActivityTypes.Reorder || this.IsOrdersetItem || this.sActionCode == ActivityTypes.Prescribe) {
                                    sDIName = oRes.oObservationResult[i].ItemCode;
                                }
                                else {
                                    sDIName = oRes.oObservationResult[i].ItemName;
                                }
                                bIsSelected = String.Compare(this.AdditionalItemType, AdditionalItemTypes.Observation) == 0 && String.Compare(sDIName, this.AdditionalItemValue) == 0;
                                bHasChildern = oRes.oObservationResult[i].Children != null && oRes.oObservationResult[i].Children.Count > 0;
                                let ObservationChild: CTreeListItem = (ObjectHelper.CreateObject(new CTreeListItem(), {
                                    Value: sItemName,
                                    ToolTip: sItemName,
                                    Key: sDIName,
                                    Tag: oRes.oObservationResult[i],
                                    ParentKey: ConditionalDoseConstants.ObservationKey,
                                    Selected: bIsSelected,
                                    Expanded: bHasChildern
                                }));
                                tvcObseResults.forEach( (ctree)=> {
                                    if (ctree.Key == ObservationChild.Key) {
                                        isduplicate = true;
                                    }
                                });
                                if (!isduplicate) {
                                    tvcObseResults.Add(ObservationChild);
                                    if (bHasChildern) {
                                        nChildrenCnt = oRes.oObservationResult[i].Children.Count;
                                        for (let j: number = 0; j < nChildrenCnt; j++) {
                                            if (oRes.oObservationResult[i].Children[j] == null)
                                                continue;
                                            sItemName = oRes.oObservationResult[i].Children[j].ItemName;
                                            bIsSelected = String.Compare(this.AdditionalItemType, AdditionalItemTypes.Observation) == 0 && String.Compare(oRes.oObservationResult[i].Children[j].ItemCode, this.AdditionalItemValue) == 0 && String.Compare(sDIName, this.ParentAdditionalItemValue) == 0;
                                            tvcObseResults.Add(ObjectHelper.CreateObject(new CTreeListItem(), {
                                                Value: sItemName,
                                                ToolTip: sItemName,
                                                Key: oRes.oObservationResult[i].Children[j].ItemCode,
                                                Tag: oRes.oObservationResult[i].Children[j],
                                                ParentKey: sDIName,
                                                Selected: bIsSelected
                                            }));
                                        }
                                    }
                                }
                            }
                            else if (String.Compare(sLookUpType, AdditionalItemTypes.Result, StringComparison.OrdinalIgnoreCase) == 0) {
                                if (bIsFirstResult) {
                                    tvcObseResults.Add(ObjectHelper.CreateObject(new CTreeListItem(), {
                                        Value: medConditionalDoseRes.Results_Display,
                                        ToolTip:Resource.medConditionalDoseRes.tvwCondition_ToolTip,
                                        Key: ConditionalDoseConstants.ResultsKey,
                                        Tag: ConditionalDoseConstants.ResultsKey,
                                        Expanded: true
                                    }));
                                    bIsFirstResult = false;
                                }
                                bIsSelected = String.Compare(this.AdditionalItemType, AdditionalItemTypes.Result) == 0 && oRes.oObservationResult[i].ItemOID == this.AdditionalItemOID;
                                let ResultChildItem: CTreeListItem = (ObjectHelper.CreateObject(new CTreeListItem(), {
                                    Value: sItemName,
                                    ToolTip: sItemName,
                                    Key: oRes.oObservationResult[i].ItemOID.ToString(),
                                    Tag: oRes.oObservationResult[i],
                                    ParentKey: ConditionalDoseConstants.ResultsKey,
                                    Selected: bIsSelected
                                }));
                                tvcObseResults.forEach( (ctree)=> {
                                    if (ctree.Key == ResultChildItem.Key) {
                                        isduplicate = true;
                                    }
                                });
                                if (!isduplicate)
                                    tvcObseResults.Add(ResultChildItem);
                            }
                        }
                        if (this.SelectedObservationResult != null && String.IsNullOrEmpty(this.SelectedObservationResult.Value) && !String.IsNullOrEmpty(this.SelectedObservationResult.Key)) {
                            if (tvcObseResults != null) {
                                for (let i=0; i< tvcObseResults.Count; i++ ){
                                    let ctree : CTreeListItem = tvcObseResults[i];
                                    if (ctree.Key == this.SelectedObservationResult.Key) {
                                        this.SelectedObservationResult = ctree;
                                        break;
                                    }
                                }
                            }
                        }
                        if (this.DoseDetails != null) {
                            let ncount: number = this.DoseDetails.Count;
                            let IsValue: number = 0;
                            let _sTxtObservationResult: string = String.Empty;
                            
                            for (let i: number = 0; i < ncount; i++) {
                                //TFS 190133
                                IsValue = 0;
                                _sTxtObservationResult = String.Empty;
                                if (!String.IsNullOrEmpty(this.SelectedObservationResult.Value))
                                {
                                    Number.TryParse(this.SelectedObservationResult.Value, (o) => { IsValue = o; })
                                    if (IsValue > 0)
                                    {
                                        if (this.SelectedObservationResult.Tag != null && this.SelectedObservationResult.Tag instanceof ObjectInfo)
                                        {
                                            let objdata: ObjectInfo  = ObjectHelper.CreateType<ObjectInfo>(this.SelectedObservationResult.Tag, ObjectInfo);
                                            if(objdata !=null && !String.IsNullOrEmpty(objdata.Name))
                                            {
                                                let objTxt: string[] = objdata.Name.Split('^');
                                                if (objTxt != null && objTxt.Length > 1)
                                                {
                                                    if (objTxt[1] != null )
                                                    {
                                                        if (objTxt[1].StartsWith("|"))
                                                        {
                                                            _sTxtObservationResult = objTxt[1].Substring(1, objTxt[1].length);
                                                        }
                                                        else
                                                        {
                                                            _sTxtObservationResult = objTxt[1];
                                                        }
                                                    }

                                                }
                                            }
                                        }
                                    }
                                }
                                this.DoseDetails[i].ObservationResult = String.IsNullOrEmpty(_sTxtObservationResult)? this.SelectedObservationResult.Value: _sTxtObservationResult;
                            }
                        }
                    }
                }
               catch(ex:any)  {
                    let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
            this.ObservationsResults = tvcObseResults;
            Busyindicator.SetStatusIdle("FormViewer");
        }
        public get IsDoseMandatory(): boolean {
            return this._IsDoseMandatory;
        }
        public set IsDoseMandatory(value: boolean) {
            this._IsDoseMandatory = value;
           //NotifyPropertyChanged("IsDoseMandatory");
        }
        public get InfusionType(): string {
            return this._InfusionType;
        }
        public set InfusionType(value: string) {
            this._InfusionType = value;
           //NotifyPropertyChanged("InfusionType");
        }
        public get DoseType(): string {
            return this._DoseType;
        }
        public set DoseType(value: string) {
            this._DoseType = value;
           //NotifyPropertyChanged("DoseType");
        }
        public get ObservationsResults(): iTreeViewCollection {
            return this._observationsResults;
        }
        public set ObservationsResults(value: iTreeViewCollection) {
            if (!Helper.ReferenceEquals(this._observationsResults, value)) {
                this._observationsResults = value;
               //NotifyPropertyChanged("ObservationsResults");
            }
        }
        public get SelectedObservationResult(): CTreeListItem {
            return this._selectedObservationResult;
        }
        public set SelectedObservationResult(value: CTreeListItem) {
            if (value == null || (this._selectedObservationResult != null && String.Compare(this._selectedObservationResult.Key, value.Key) != 0)) {
                this.RangeUOMs = new ObservableCollection<CListItem>();
                this.IsRangeUoMEnabled = false;
            }
            this._selectedObservationResult = value;
            this.GetObservationResultItemUOMs();
            if (this._selectedObservationResult != null && this._doseDetails != null && this._doseDetails.Count > 0 && this._doseDetails[0] != null && String.IsNullOrEmpty(this._doseDetails[0].ObservationResult)) {
                let nLen: number = this._doseDetails.Count;
                for (let i: number = 0; i < nLen; i++) {
                    if (this._doseDetails[i] != null && String.IsNullOrEmpty(this._doseDetails[i].ObservationResult)) {
                        this.DoseDetails[i].ObservationResult = this.GetSelectedObservationResultDisplayText();
                    }
                }
            }
            this.SetSelectedValues();
        }
        private GetObservationResultItemUOMs(): void {
            if (this._selectedObservationResult != null && (this._selectedObservationResult.Children == null || this._selectedObservationResult.Children.Length == 0) && this._selectedObservationResult.Tag != null) {
                // let oResObse: ObservationResult = ObjectHelper.CreateType<ObservationResult>(this._selectedObservationResult.Tag, ObservationResult);
                if (this._selectedObservationResult.Tag instanceof ObservationResult) {
                    let oResObse: ObservationResult = this._selectedObservationResult.Tag;
                    let lnOID: number = oResObse.ItemOID;
                    let sCode: string = oResObse.ItemCode;
                    let sType: string = oResObse.ItemType;
                    if (String.Compare(sType, AdditionalItemTypes.Result) == 0) {
                        if (ConceptCodeData.RM_UNIT_MEASURE == null)
                            ProcessRTE.GetValuesByDomainCode(ValueDomain.RM_UNIT_MEASURE, (s,e) => {this.OnRTEResult(s);});
                        else { 
                            try{
                            this.GetResultItemUOMs(lnOID);
                            }catch(e){
                                console.log(e);
                            }}
                    }
                    else if (String.Compare(sType, AdditionalItemTypes.Observation) == 0) {
                        this.GetObservationItemUOMs(sCode);
                    }
                }
            }
        }
        private GetObservationItemUOMs(DataItemName: string): void {
            let objService: CBCDataitemsWSSoapClient = new CBCDataitemsWSSoapClient();
            let reqDataitemsdetails: CReqMsgGetDataItemDetails = new CReqMsgGetDataItemDetails();
            reqDataitemsdetails.diInfoBC = ObjectHelper.CreateObject(new DataitemListInfo(), { DataItemNames: DataItemName });
            reqDataitemsdetails.oContextInformation = Common.FillContext();
            objService.GetDataItemDetailsCompleted  = (s,e) => { this.objService_GetDataItemDetailsCompleted(s,e); } ;
            objService.GetDataItemDetailsAsync(reqDataitemsdetails);
        }
        objService_GetDataItemDetailsCompleted(sender: Object, e: GetDataItemDetailsCompletedEventArgs): void {
            this.RangeUOMs = new ObservableCollection<CListItem>();
            this.IsRangeUoMEnabled = false;
            let selectedUOM: CListItem = null;
            let isprimary: boolean = false;
            if (e.Error != null || e.Result == null)
                return
            let DIResponse: CResMsgGetDataItemDetails = e.Result;
            if (DIResponse.dataItems != null && DIResponse.dataItems.Length > 0 && DIResponse.dataItems[0].UOMItems != null && DIResponse.dataItems[0].UOMItems.Length > 0) {
                this.IsRangeUoMEnabled = true;
                let nUoMCnt: number = DIResponse.dataItems[0].UOMItems.Length;
                for (let i: number = 0; i < nUoMCnt; i++) {
                    if (DIResponse.dataItems[0].UOMItems[i] == null)
                        continue;
                    isprimary = DIResponse.dataItems[0].UOMItems[i].IsBaseUOM == 'Y' ? true : false;
                    this.RangeUOMs.Add(ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: DIResponse.dataItems[0].UOMItems[i].UOMName,
                        Value: DIResponse.dataItems[0].UOMItems[i].UOMCode,
                        Level: DIResponse.dataItems[0].UOMItems[i].UOMPrecision
                    }));
                    if (isprimary) {
                        selectedUOM = ObjectHelper.CreateObject(new CListItem(), {
                            DisplayText: DIResponse.dataItems[0].UOMItems[i].UOMName,
                            Value: DIResponse.dataItems[0].UOMItems[i].UOMCode,
                            Level: DIResponse.dataItems[0].UOMItems[i].UOMPrecision
                        });
                    }
                }
                if (this.RangeUOMs != null && this.RangeUOMs.Count == 1) {
                    this.Condition.RangeUoM = this.RangeUOMs[0];
                }
                else {
                    if (selectedUOM != null) {
                        this.RangeUOMs.forEach( (UOM)=> {
                            if (UOM.Value == selectedUOM.Value) {
                                this.Condition.RangeUoM = UOM;
                            }
                        });
                    }
                }
                if (this.DoseDetails != null && this.DoseDetails.Count > 0 && this.DoseDetails[0].RangeUoM != null && String.IsNullOrEmpty(this.DoseDetails[0].RangeUoM.DisplayText)) {
                    let nCnt: number = this.DoseDetails.Count;
                    for (let i: number = 0; i < nCnt; i++) {
                        this.DoseDetails[i].RangeUoM = this.GetComboValue(this.DoseDetails[i].RangeUoM, this.RangeUOMs);
                    }
                }
            }
            Busyindicator.SetStatusIdle("FormViewer");
        }
        private GetResultItemUOMs(lnOID: number): void {
            let oResultSer: ResultManagementWSSoapClient = new ResultManagementWSSoapClient();
            let oReqItem: CReqMsgGetResultItemDetails = new CReqMsgGetResultItemDetails();
            oReqItem.lResultItemOIDBC = lnOID;
            oReqItem.oContextInformation = Common.FillContext();
            oResultSer.GetResultItemDetailsCompleted  = (s,e) => { this.oResultSer_GetResultItemDetailsCompleted(s,e); } ;
            oResultSer.GetResultItemDetailsAsync(oReqItem);
        }
        oResultSer_GetResultItemDetailsCompleted(sender: Object, e: GetResultItemDetailsCompletedEventArgs): void {
            this.RangeUOMs = new ObservableCollection<CListItem>();
            this.IsRangeUoMEnabled = false;
            if (e.Error != null)
                return
            let oResItem: CResMsgGetResultItemDetails = e.Result;
            if (oResItem != null && oResItem.oResultItemInfo != null && oResItem.oResultItemInfo.Length > 0) {
                this.IsRangeUoMEnabled = true;
                let nLen: number = oResItem.oResultItemInfo.Length;
                let selectedUOM: CListItem = null;
                let isprimary: boolean = false;
                let sUOMCode: string = String.Empty;
                let sUOM: string = String.Empty;
                let decimalvalue: number = 0;
                let dicUOM: Dictionary<string, string> = new Dictionary<string, string>();
                for (let i: number = 0; i < nLen; i++) {
                    sUOMCode = String.Empty;
                    decimalvalue = -1;
                    if (oResItem.oResultItemInfo[i] != null) {
                        if (oResItem.oResultItemInfo[i].ResultItemNumeric != null && !String.IsNullOrEmpty(oResItem.oResultItemInfo[i].ResultItemNumeric.UOM)) {
                            sUOMCode = oResItem.oResultItemInfo[i].ResultItemNumeric.UOM;
                            decimalvalue = oResItem.oResultItemInfo[i].ResultItemNumeric.DecimalPlace;
                            isprimary = oResItem.oResultItemInfo[i].ResultItemNumeric.IsPrimary;
                        }
                        else if (oResItem.oResultItemInfo[i].ResultItemRange != null && !String.IsNullOrEmpty(oResItem.oResultItemInfo[i].ResultItemRange.UOM)) {
                            sUOMCode = oResItem.oResultItemInfo[i].ResultItemRange.UOM;
                        }
                    }
                    if (String.IsNullOrEmpty(sUOMCode) || dicUOM.ContainsKey(sUOMCode))
                        continue;
                    sUOM = String.Empty;
                    if (ConceptCodeData.RM_UNIT_MEASURE != null) {
                        let nCCLen: number = ConceptCodeData.RM_UNIT_MEASURE.Count;
                        for (let y: number = 0; y < nCCLen; y++) {
                            if (String.Compare(sUOMCode, ConceptCodeData.RM_UNIT_MEASURE[y].csCode) == 0 && !String.IsNullOrEmpty(ConceptCodeData.RM_UNIT_MEASURE[y].csDescription)) {
                                sUOM = ConceptCodeData.RM_UNIT_MEASURE[y].csDescription;
                                break;
                            }
                        }
                        if (!String.IsNullOrEmpty(sUOM)) {
                            dicUOM[sUOMCode] = sUOM;
                            this.RangeUOMs.Add(ObjectHelper.CreateObject(new CListItem(), {
                                DisplayText: sUOM,
                                Value: sUOMCode,
                                Level: decimalvalue
                            }));
                            if (isprimary) {
                                selectedUOM = ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: sUOM,
                                    Value: sUOMCode,
                                    Level: decimalvalue
                                });
                            }
                        }
                    }
                }
                if (this.RangeUOMs != null && this.RangeUOMs.Count == 1) {
                    this.Condition.RangeUoM = this.RangeUOMs[0];
                }
                else {
                    if (selectedUOM != null) {
                        this.RangeUOMs.forEach( (UOM)=> {
                            if (UOM.Value == selectedUOM.Value) {
                                this.Condition.RangeUoM = UOM;
                            }
                        });
                    }
                }
                if (this.DoseDetails != null && this.DoseDetails.Count > 0 && this.DoseDetails[0].RangeUoM != null && String.IsNullOrEmpty(this.DoseDetails[0].RangeUoM.DisplayText)) {
                    let nCnt: number = this.DoseDetails.Count;
                    for (let i: number = 0; i < nCnt; i++) {
                        this.DoseDetails[i].RangeUoM = this.GetComboValue(this.DoseDetails[i].RangeUoM, this.RangeUOMs);
                    }
                }
            }
            Busyindicator.SetStatusIdle("FormViewer");
        }
        OnRTEResult(args: RTEEventargs): void {
            if (String.IsNullOrEmpty(args.Request) || args.Result == null)
                return
            if ((String.Compare(args.Request, ValueDomain.RM_UNIT_MEASURE, StringComparison.CurrentCultureIgnoreCase) == 0)) {
                ConceptCodeData.RM_UNIT_MEASURE = new ObservableCollection<CValuesetTerm>();
                (<List<CListItem>>args.Result).forEach( (oCListItem)=> {
                    ConceptCodeData.RM_UNIT_MEASURE.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                });
                let oItemLookUp: IPPPrescribeItemLookUp = ObjectHelper.CreateType<IPPPrescribeItemLookUp>(this._selectedObservationResult.Tag, IPPPrescribeItemLookUp);
                if (oItemLookUp != null) {
                    let lnOID: number = oItemLookUp.ItemId;
                    let sType: string = oItemLookUp.LookUpType;
                    if (String.Compare(sType, AdditionalItemTypes.Result) == 0) {
                        try{
                            this.GetResultItemUOMs(lnOID);
                        }catch(e){
                            console.log(e);
                        }
                    }
                }
            }
            Busyindicator.SetStatusIdle("FormViewer");
        }
        private _isLowerRangeEnabled: boolean = true;
        public get IsLowerRangeEnabled(): boolean {
            return this._isLowerRangeEnabled;
        }
        public set IsLowerRangeEnabled(value: boolean) {
            this._isLowerRangeEnabled = value;
           //NotifyPropertyChanged("IsLowerRangeEnabled");
        }
        private _isRangeUoMEnabled: boolean = false;
        public get IsRangeUoMEnabled(): boolean {
            return this._isRangeUoMEnabled;
        }
        public set IsRangeUoMEnabled(value: boolean) {
            this._isRangeUoMEnabled = value;
           //NotifyPropertyChanged("IsRangeUoMEnabled");
        }
        public get RangeUOMs(): ObservableCollection<CListItem> {
            return this._rangeUOMs;
        }
        public set RangeUOMs(value: ObservableCollection<CListItem>) {
            this._rangeUOMs = value;
           //NotifyPropertyChanged("RangeUOMs");
        }
        public get RangeOperators(): ObservableCollection<CListItem> {
            return this._rangeOperators;
        }
        public set RangeOperators(value: ObservableCollection<CListItem>) {
            if (value != null) {
                this._rangeOperators = value;
               //NotifyPropertyChanged("RangeOperators");
            }
        }
        public get TempRangeOperators(): ObservableCollection<CListItem> {
            return this._temprangeOperators;
        }
        public set TempRangeOperators(value: ObservableCollection<CListItem>) {
            if (value != null) {
                this._temprangeOperators = value;
               //NotifyPropertyChanged("TempRangeOperators");
            }
        }
        public get RangeOperator(): CListItem {
            return this._rangeOperator;
        }
        public set RangeOperator(value: CListItem) {
            if (value != null) {
                this._rangeOperator = value;
               //NotifyPropertyChanged("RangeOperator");
            }
        }
        public get IsInfusionRateVisible(): Visibility {
            return this._isInfusionRateVisible;
        }
        public set IsInfusionRateVisible(value: Visibility) {
            if (value != null) {
                this._isInfusionRateVisible = value;
               //NotifyPropertyChanged("IsInfusionRateVisible");
            }
        }
        private _IsCondInfusionRateEnable: boolean = false;
        public get IsCondInfusionRateEnable(): boolean {
            return this._IsCondInfusionRateEnable;
        }
        public set IsCondInfusionRateEnable(value: boolean) {
            if (value != null) {
                this._IsCondInfusionRateEnable = value;
               //NotifyPropertyChanged("IsCondInfusionRateEnable");
            }
        }
        public get InfusionTypeFlag(): boolean {
            return this.infusionTypeFlag;
        }
        public set InfusionTypeFlag(value: boolean) {
            if (this.infusionTypeFlag != value) {
                this.infusionTypeFlag = value;
               //NotifyPropertyChanged("InfusionTypeFlag");
            }
        }
        public get DoseUOMs(): ObservableCollection<CListItem> {
            return this._doseUOMs;
        }
        public set DoseUOMs(value: ObservableCollection<CListItem>) {
            this._doseUOMs = value;
           //NotifyPropertyChanged("DoseUOMs");
        }
        private GetComboValue(oListItem: CListItem, oListCollection: ObservableCollection<CListItem>): CListItem {
            if (oListItem != null && oListCollection != null) {
                let nLen: number = oListCollection.Count;
                let oItem: CListItem = null;
                for (let i: number = 0; i < nLen; i++) {
                    if (String.Compare(oListCollection[i].Value, oListItem.Value) == 0) {
                        oItem = oListCollection[i];
                        break;
                    }
                }
                if (oItem != null) {
                    oListItem = oItem;
                }
                else if (!String.IsNullOrEmpty(oListItem.DisplayText)) {
                    oListCollection.Add(oListItem);
                }
            }
            return oListItem;
        }
        public get IsNumericChecked(): boolean {
            return this._isNumericChecked;
        }
        public set IsNumericChecked(value: boolean) {
            if (this._isNumericChecked != value) {
                this._isNumericChecked = value;
               //NotifyPropertyChanged("IsNumericChecked");
            }
        }
        public get IsInstructionChecked(): boolean {
            return this._isInstructionChecked;
        }
        public set IsInstructionChecked(value: boolean) {
            if (this._isInstructionChecked != value) {
                this._isInstructionChecked = value;
               //NotifyPropertyChanged("IsInstructionChecked");
            }
        }
        public get DoseVisibility(): Visibility {
            return this._doseVisibility;
        }
        public set DoseVisibility(value: Visibility) {
            if (!Helper.ReferenceEquals(this._doseVisibility, value)) {
                this._doseVisibility = value;
               //NotifyPropertyChanged("DoseVisibility");
            }
        }
        public get InstructionVisibility(): Visibility {
            return this._instructionVisibility;
        }
        public set InstructionVisibility(value: Visibility) {
            if (!Helper.ReferenceEquals(this._instructionVisibility, value)) {
                this._instructionVisibility = value;
               //NotifyPropertyChanged("InstructionVisibility");
            }
        }
        public get Condition(): ConditionalDose {
            return this._condition;
        }
        public set Condition(value: ConditionalDose) {
            this._condition = value;
           //NotifyPropertyChanged("Condition");
        }
        public get DoseDetails(): ObservableCollection<ConditionalDose> {
            return this._doseDetails;
        }
        public set DoseDetails(value: ObservableCollection<ConditionalDose>) {
            this._doseDetails = value;
           //NotifyPropertyChanged("DoseDetails");
        }
        public get SelectedDose(): ConditionalDose {
            return this._selectedDose;
        }
        public set SelectedDose(value: ConditionalDose) {
            if (!Helper.ReferenceEquals(this._selectedDose, value)) {
                this._selectedDose = value;
               //NotifyPropertyChanged("SelectedDose");
                this.SetSelectedValues();
            }
        }
        private _selectedDoseDetails: number[];
        public get SelectedDoseDetails(): number[] {
            return this._selectedDoseDetails;
        }
        public set SelectedDoseDetails(value: number[]) {
            this._selectedDoseDetails = value;
            let bIsMultiCondSelected: boolean = this._selectedDoseDetails != null && this._selectedDoseDetails.length > 1;
            if (bIsMultiCondSelected) {
                let min: number = 0, max = 0;
                let diff: number = 0;
                for (let i: number = 0; i < this._selectedDoseDetails.length; i++) {
                    if (i == 0) {
                        min = max = this._selectedDoseDetails[i];
                    }
                    ;
                    if (min > this._selectedDoseDetails[i])
                        min = this._selectedDoseDetails[i];
                    if (max < this._selectedDoseDetails[i])
                        max = this._selectedDoseDetails[i];
                }
                diff = (max - min) + 1;
                if (this._selectedDoseDetails.length == diff)
                    this.IsRemoveEnabled = true;
                else this.IsRemoveEnabled = false;
                this.IsAddEnabled = this.IsUpdateEnabled = !bIsMultiCondSelected;
                this.SetOrClearValues(!bIsMultiCondSelected);
            }
            else {
                this.SetSelectedValues();
            }
        }
        private SetSelectedValues(): void {
            let bIsCondSelected: boolean = (this._selectedDose != null);
            if (bIsCondSelected && this.DoseDetails != null && this.DoseDetails.Count > 0 && this.DoseDetails[this.DoseDetails.Count - 1] == this._selectedDose)
                this.IsRemoveEnabled = this.IsUpdateEnabled = true;
            else this.IsRemoveEnabled = this.IsUpdateEnabled = false;
            this.IsAddEnabled = !bIsCondSelected && !((this.SelectedObservationResult == null || String.IsNullOrEmpty(this.SelectedObservationResult.Value)) || (this.SelectedObservationResult.Children != null && this.SelectedObservationResult.Children.Count > 0));
            if (this.DoseDetails != null && this.DoseDetails.Count > 0 && this.DoseDetails[this.DoseDetails.Count - 1].RangeOperator != null && !String.IsNullOrEmpty(this.DoseDetails[this.DoseDetails.Count - 1].RangeOperator.Value) && (String.Equals(this.DoseDetails[this.DoseDetails.Count - 1].RangeOperator.Value, this.RangeOperatorGreterthan.Value) || String.Equals(this.DoseDetails[this.DoseDetails.Count - 1].RangeOperator.Value, this.RangeOperatorGreterthan.Value))) {
                this.IsAddEnabled = false;
            }
            this.SetOrClearValues(bIsCondSelected);
            if (this._selectedDose == null) {
                let oCondition: ConditionalDose = new ConditionalDose();
                let dLowerRange: number = 0;
                if (this.DoseDetails != null) {
                    for (let i: number = 0; i < this.DoseDetails.Count; i++) {
                        oCondition = this.DoseDetails[i];
                        if (oCondition != null) {
                            if ((oCondition.RangeOperator != null && (!String.Equals(oCondition.RangeOperator.Value, this.RangeOperatorGreterthan.Value) && !String.Equals(oCondition.RangeOperator.Value, this.RangeOperatorGreterthanOrEqualto.Value))) || (oCondition.RangeOperator == null && !String.IsNullOrEmpty(oCondition.LowerRange) && Number.TryParse(oCondition.LowerRange, (o) => { dLowerRange = o; }))) {
                                if(this.RangeOperator != null){
                                this.RangeOperators.Remove(this.RangeOperatorLessthan);
                                this.RangeOperators.Remove(this.RangeOperatorLessthanOrEqualto);
                                }
                            }
                        }
                    }
                }
            }
        }
        private SetOrClearValues(bIsCondSelected: boolean): void {
            if (bIsCondSelected) {
                if (this._selectedDose.RangeOperator != null && String.Equals(this._selectedDose.RangeOperator.Value, this.RangeOperatorLessthan.Value) && !this.RangeOperators.Contains(this.RangeOperatorLessthan)) {
                    this.RangeOperators.Add(this.RangeOperatorLessthan);
                }
                else if (this._selectedDose.RangeOperator != null && String.Equals(this._selectedDose.RangeOperator.Value, this.RangeOperatorLessthanOrEqualto.Value) && !this.RangeOperators.Contains(this.RangeOperatorLessthanOrEqualto)) {
                    this.RangeOperators.Add(this.RangeOperatorLessthanOrEqualto);
                }
                this.Condition = ObjectHelper.CreateObject(new ConditionalDose(), {
                    Dose: this._selectedDose.Dose,
                    UpperDose: this._selectedDose.UpperDose,
                    DoseUoM: this._selectedDose.DoseUoM,
                    Instruction: this._selectedDose.Instruction,
                    InfusionFlag: (!String.IsNullOrEmpty(this._selectedDose.Infusionrate)) ? true : false,
                    LowerRange: this._selectedDose.LowerRange,
                    UpperRange: this._selectedDose.UpperRange,
                    RangeOperator: this._selectedDose.RangeOperator,
                    Infusionrate: this._selectedDose.Infusionrate,
                    InfusionUpperrate: this._selectedDose.InfusionUpperrate
                });
                this.Condition.RangeUoM = this.GetComboValue(this._selectedDose.RangeUoM, this.RangeUOMs);
                this.Condition.DoseUoM = this.GetComboValue(this._selectedDose.DoseUoM, this.DoseUOMs);
                this.Condition.RangeOperator = this.GetComboValue(this._selectedDose.RangeOperator, this.RangeOperators);
                this.Condition.Infratenumeratoruom = this.GetComboValue(this._selectedDose.Infratenumeratoruom, this.InfRateNumeratorUOMList);
                this.Condition.InfrateDenominatoruom = this.GetComboValue(this._selectedDose.InfrateDenominatoruom, this.InfusionratedenoUOMList);
            }
            else {
                this.SetDefaultValues();
            }
        }
        private SetDoseInstructionVisibility(): void {
            if (this._isNumericChecked) {
                this.InstructionVisibility = Visibility.Collapsed;
                this.IsCondInfusionRateEnable = false;
                this.DoseVisibility = Visibility.Visible;
                this.Condition.Instruction = String.Empty;
                if (this.InfusionTypeFlag) {
                    this.IsCondInfusionRateEnable = true;
                    this.IsInfusionRateVisible = Visibility.Visible;
                }
                this.ConditionalDoseValue = Resource.medConditionalDoseRes.lblDoseInfusionValue_Text;
                this.GridDoseHeader = Resource.medConditionalDoseRes.grdCondition_DoseInfusionInstruction;
            }
            else if (this._isInstructionChecked) {
                this.InstructionVisibility = Visibility.Visible;
                this.DoseVisibility = Visibility.Collapsed;
                this.Condition.Dose = String.Empty;
                this.Condition.DoseUoM = null;
                this.IsCondInfusionRateEnable = false;
                this.Condition.Infusionrate = String.Empty;
                this.Condition.InfusionUpperrate = String.Empty;
                this.Condition.Infratenumeratoruom = null;
                this.Condition.InfrateDenominatoruom = null;
                this.ConditionalDoseValue = Resource.medConditionalDoseRes.lblDoseValue_Text;
                this.GridDoseHeader = Resource.medConditionalDoseRes.grdCondition_DoseInstruction;
            }
        }
        public get IsInfusionRateMandatory(): boolean {
            return this._isInfusionRateMandatory;
        }
        public set IsInfusionRateMandatory(value: boolean) {
            if (value != this._isInfusionRateMandatory) {
                this._isInfusionRateMandatory = value;
               //super.NotifyPropertyChanged("IsInfusionRateMandatory");
            }
        }
        public get ConditionalDoseValue(): string {
            return this._conditionalDoseValue;
        }
        public set ConditionalDoseValue(value: string) {
            if (value != this._conditionalDoseValue) {
                this._conditionalDoseValue = value;
               //super.NotifyPropertyChanged("ConditionalDoseValue");
            }
        }
        public get GridDoseHeader(): string {
            return this._gridDoseHeader;
        }
        public set GridDoseHeader(value: string) {
            if (value != this._gridDoseHeader) {
                this._gridDoseHeader = value;
               //super.NotifyPropertyChanged("GridDoseHeader");
            }
        }
        public get InfusionVisibility(): Visibility {
            return this._infusionVisibility;
        }
        public set InfusionVisibility(value: Visibility) {
            if (!Helper.ReferenceEquals(this._infusionVisibility, value)) {
                this._infusionVisibility = value;
               //NotifyPropertyChanged("InfusionVisibility");
            }
        }
        private Validate(): boolean {
            let bIsValid: boolean = true;
            let dLowerRange: number = 0;
            let dUpperRange: number = 0;
            if (this.Condition != null && !String.IsNullOrEmpty(this.Condition.LowerRange))
                Number.TryParse(this.Condition.LowerRange, (o) => { dLowerRange = o; });
            if ((String.IsNullOrEmpty(this.Condition.LowerRange)) || !Number.TryParse(this.Condition.LowerRange, (o) => { dLowerRange = o; })) {
                if (this.OnErrorEvent != null)
                    this.OnErrorEvent(3, medConditionalDoseRes.ValueRange_Mandatory, "txtLowerRange");
                bIsValid = false;
            }
            else if (!String.IsNullOrEmpty(this.Condition.LowerRange) && String.Compare(this.Condition.LowerRange, "0", StringComparison.CurrentCultureIgnoreCase) == 0 && String.IsNullOrEmpty(this.Condition.UpperRange)) {
                if (this.OnErrorEvent != null)
                    this.OnErrorEvent(3, medConditionalDoseRes.ValueRange_Mandatory, "txtUpperRange");
                bIsValid = false;
            }
            else if (this.RangeUOMs != null && this.RangeUOMs.Count > 0 && (this.Condition.RangeUoM == null || String.IsNullOrEmpty(this.Condition.RangeUoM.Value))) {
                if (this.OnErrorEvent != null)
                    this.OnErrorEvent(4, medConditionalDoseRes.ValueRangeUOM_Mandatory, "cboRangeUOM");
                bIsValid = false;
            }
            else if (!String.IsNullOrEmpty(this.Condition.UpperRange) && Number.TryParse(this.Condition.UpperRange, (o) => { dUpperRange = o; }) && dLowerRange == dUpperRange) {
                if (this.OnErrorEvent != null)
                    this.OnErrorEvent(5, medConditionalDoseRes.Range_Validation, "txtUpperRange");
                bIsValid = false;
            }
            else if (!String.IsNullOrEmpty(this.Condition.UpperRange) && Number.TryParse(this.Condition.UpperRange, (o) => { dUpperRange = o; }) && dLowerRange > dUpperRange) {
                if (this.OnErrorEvent != null)
                    this.OnErrorEvent(10, medConditionalDoseRes.Range_Validation1, "txtLowerRange");
                bIsValid = false;
            }
            else if (this.Condition.RangeOperator == null && !String.IsNullOrEmpty(this.Condition.LowerRange) && !String.IsNullOrEmpty(this.Condition.UpperRange) && (this.DoseDetails == null || (this.DoseDetails != null && this.DoseDetails.Count == 0) || (this.DoseDetails != null && this.DoseDetails.Count == 1 && this.DoseDetails[0] == this._selectedDose)) && dLowerRange > 0) {
                if (this.OnErrorEvent != null)
                    this.OnErrorEvent(3, medConditionalDoseRes.ValueRangeZero_Mandatory, "txtLowerRange");
                bIsValid = false;
            }
            else if (this.IsNumericChecked && this.IsConditionalDoseEnable && this.IsDoseMandatory && (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.CurrentCultureIgnoreCase) != 0)) {
                bIsValid = this.ValDOseMandatory();
            }
            else {
                if (!String.IsNullOrEmpty(this.Condition.UpperRange) && Number.TryParse(this.Condition.UpperRange, (o) => { dUpperRange = o; }) && !String.IsNullOrEmpty(this.Condition.LowerRange) && Number.TryParse(this.Condition.LowerRange, (o) => { dLowerRange = o; }) && dLowerRange == dUpperRange) {
                    if (this.OnErrorEvent != null)
                        this.OnErrorEvent(5, medConditionalDoseRes.Range_Validation, "txtUpperRange");
                    bIsValid = false;
                }
                else if (!String.IsNullOrEmpty(this.Condition.UpperRange) && Number.TryParse(this.Condition.UpperRange, (o) => { dUpperRange = o; }) && !String.IsNullOrEmpty(this.Condition.LowerRange) && Number.TryParse(this.Condition.LowerRange, (o) => { dLowerRange = o; }) && dLowerRange > dUpperRange) {
                    if (this.OnErrorEvent != null)
                        this.OnErrorEvent(10, medConditionalDoseRes.Range_Validation1, "txtLowerRange");
                    bIsValid = false;
                }
                {
                    let dDose: number = 0;
                    Number.TryParse(this.Condition.Dose, (o) => { dDose = o; });
                    if (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.CurrentCultureIgnoreCase) != 0 && this.IsConditionalDoseEnable && this.IsDoseMandatory) {
                        bIsValid = this.ValDOseMandatory();
                    }
                    if (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.CurrentCultureIgnoreCase) == 0 && this.IsConditionalDoseEnable) {
                        bIsValid = this.ValidateDoseFOrClerking();
                    }
                }
                if (bIsValid)
                    bIsValid = this.ValidateDecimal();
                if (bIsValid)
                    bIsValid = !this.LessthanPreviousCheck();
                if (bIsValid && this.Condition.RangeOperator == null && !String.IsNullOrEmpty(this.Condition.LowerRange) && String.IsNullOrEmpty(this.Condition.UpperRange))
                    bIsValid = !this.AnyRangeAvailableCheck();
            }
            if (bIsValid && this.InfusionTypeFlag) {
                if (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.CurrentCultureIgnoreCase) != 0 && this.IsConditionalDoseEnable && !this.IsDoseMandatory) {
                    bIsValid = this.ValidateDoseFOrClerking();
                }
                if (bIsValid && String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.CurrentCultureIgnoreCase) != 0) {
                    if (this.IsInfusionRateMandatory) {
                        if (String.IsNullOrEmpty(this.Condition.Instruction) && String.IsNullOrEmpty(this.Condition.Infusionrate) && this.Condition.Infratenumeratoruom == null && this.Condition.InfrateDenominatoruom == null) {
                            if (this.OnErrorEvent != null)
                                this.OnErrorEvent(9, medConditionalDoseRes.InfRateOrInstruction_Mandatory, "txtLowerInfusionrate");
                            bIsValid = false;
                        }
                        if ((!String.IsNullOrEmpty(this.Condition.Infusionrate) && String.Compare(this.Condition.Infusionrate, "0", StringComparison.CurrentCultureIgnoreCase) == 0)) {
                            if (this.OnErrorEvent != null)
                                this.OnErrorEvent(9, medConditionalDoseRes.txtLowerInfusionrate_Mandatory, "txtLowerInfusionrate");
                            bIsValid = false;
                        }
                        else if (!String.IsNullOrEmpty(this.Condition.Infusionrate) && (this.Condition.Infratenumeratoruom == null || String.IsNullOrEmpty(this.Condition.Infratenumeratoruom.Value))) {
                            if (this.OnErrorEvent != null)
                                this.OnErrorEvent(10, medConditionalDoseRes.cboUOMInfusionrate_Mandatory, "cboUOMInfusionrate");
                            bIsValid = false;
                        }
                        else if (!String.IsNullOrEmpty(this.Condition.Infusionrate) && (this.Condition.InfrateDenominatoruom == null || this.Condition.InfrateDenominatoruom != null && (String.IsNullOrEmpty(this.Condition.InfrateDenominatoruom.Value)))) {
                            if (this.OnErrorEvent != null)
                                this.OnErrorEvent(11, Resource.medConditionalDoseRes.cboUOMInfusionrate_Mandatory, "cboUOMInfusionrate1");
                            bIsValid = false;
                        }
                    }
                    else {
                        if ((!String.IsNullOrEmpty(this.Condition.Infusionrate) && String.Compare(this.Condition.Infusionrate, "0", StringComparison.CurrentCultureIgnoreCase) == 0)) {
                            if (this.OnErrorEvent != null)
                                this.OnErrorEvent(9, medConditionalDoseRes.txtLowerInfusionrate_Mandatory, "txtLowerInfusionrate");
                            bIsValid = false;
                        }
                        else if (((this.Condition.Infratenumeratoruom != null && !String.IsNullOrEmpty(this.Condition.Infratenumeratoruom.Value)) || (this.Condition.InfrateDenominatoruom != null && !String.IsNullOrEmpty(this.Condition.InfrateDenominatoruom.Value))) && (String.IsNullOrEmpty(this.Condition.Infusionrate) || (!String.IsNullOrEmpty(this.Condition.Infusionrate) && String.Compare(this.Condition.Infusionrate, "0", StringComparison.CurrentCultureIgnoreCase) == 0))) {
                            if (this.OnErrorEvent != null)
                                this.OnErrorEvent(9, medConditionalDoseRes.txtLowerInfusionrate_Mandatory, "txtLowerInfusionrate");
                            bIsValid = false;
                        }
                        else if ((!String.IsNullOrEmpty(this.Condition.Infusionrate) && String.Compare(this.Condition.Infusionrate, "0", StringComparison.CurrentCultureIgnoreCase) != 0) && (this.Condition.Infratenumeratoruom == null || (this.Condition.Infratenumeratoruom != null && String.IsNullOrEmpty(this.Condition.Infratenumeratoruom.Value)))) {
                            if (this.OnErrorEvent != null)
                                this.OnErrorEvent(10, medConditionalDoseRes.cboUOMInfusionrate_Mandatory, "cboUOMInfusionrate");
                            bIsValid = false;
                        }
                        else if ((!String.IsNullOrEmpty(this.Condition.Infusionrate) && String.Compare(this.Condition.Infusionrate, "0", StringComparison.CurrentCultureIgnoreCase) != 0) && (this.Condition.InfrateDenominatoruom == null || (this.Condition.InfrateDenominatoruom != null && String.IsNullOrEmpty(this.Condition.InfrateDenominatoruom.Value)))) {
                            if (this.OnErrorEvent != null)
                                this.OnErrorEvent(10, medConditionalDoseRes.cboUOMInfusionrate_Mandatory, "cboUOMInfusionrate1");
                            bIsValid = false;
                        }
                    }
                }
                else if (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.CurrentCultureIgnoreCase) == 0) {
                    if ((!String.IsNullOrEmpty(this.Condition.Dose) && String.Compare(this.Condition.Dose, "0", StringComparison.CurrentCultureIgnoreCase) == 0) && (this.Condition.DoseUoM == null || String.IsNullOrEmpty(this.Condition.DoseUoM.Value))) {
                        if (this.OnErrorEvent != null)
                            this.OnErrorEvent(9, medConditionalDoseRes.ValDoseUOMEmpty_mandatory, "cboDoseValueUOM");
                        bIsValid = false;
                    }
                    if ((!String.IsNullOrEmpty(this.Condition.Infusionrate) && String.Compare(this.Condition.Infusionrate, "0", StringComparison.CurrentCultureIgnoreCase) == 0)) {
                        if (this.OnErrorEvent != null)
                            this.OnErrorEvent(9, medConditionalDoseRes.txtLowerInfusionrate_Mandatory, "txtLowerInfusionrate");
                        bIsValid = false;
                    }
                    else if (((this.Condition.Infratenumeratoruom != null && !String.IsNullOrEmpty(this.Condition.Infratenumeratoruom.Value)) || (this.Condition.InfrateDenominatoruom != null && !String.IsNullOrEmpty(this.Condition.InfrateDenominatoruom.Value))) && (String.IsNullOrEmpty(this.Condition.Infusionrate) || (!String.IsNullOrEmpty(this.Condition.Infusionrate) && String.Compare(this.Condition.Infusionrate, "0", StringComparison.CurrentCultureIgnoreCase) == 0))) {
                        if (this.OnErrorEvent != null)
                            this.OnErrorEvent(9, medConditionalDoseRes.txtLowerInfusionrate_Mandatory, "txtLowerInfusionrate");
                        bIsValid = false;
                    }
                    else if ((!String.IsNullOrEmpty(this.Condition.Infusionrate) && String.Compare(this.Condition.Infusionrate, "0", StringComparison.CurrentCultureIgnoreCase) != 0) && (this.Condition.Infratenumeratoruom == null || (this.Condition.Infratenumeratoruom != null && String.IsNullOrEmpty(this.Condition.Infratenumeratoruom.Value)))) {
                        if (this.OnErrorEvent != null)
                            this.OnErrorEvent(10, medConditionalDoseRes.cboUOMInfusionrate_Mandatory, "cboUOMInfusionrate");
                        bIsValid = false;
                    }
                    else if ((!String.IsNullOrEmpty(this.Condition.Infusionrate) && String.Compare(this.Condition.Infusionrate, "0", StringComparison.CurrentCultureIgnoreCase) != 0) && (this.Condition.InfrateDenominatoruom == null || (this.Condition.InfrateDenominatoruom != null && String.IsNullOrEmpty(this.Condition.InfrateDenominatoruom.Value)))) {
                        if (this.OnErrorEvent != null)
                            this.OnErrorEvent(10, medConditionalDoseRes.cboUOMInfusionrate_Mandatory, "cboUOMInfusionrate1");
                        bIsValid = false;
                    }
                }
            }
            return bIsValid;
        }
        private ValDOseMandatory(): boolean {
            let dDose: number = 0;
            let dUDose: number = 0;
            Number.TryParse(this.Condition.Dose, (o) => { dDose = o; });
            Number.TryParse(this.Condition.UpperDose, (o) => { dUDose = o; });
            let IsValidate: boolean = true;
            if (String.IsNullOrEmpty(this.Condition.Instruction) && String.IsNullOrEmpty(this.Condition.Dose) && this.Condition.DoseUoM == null) {
                if (this.OnErrorEvent != null)
                    this.OnErrorEvent(9, medConditionalDoseRes.DoseOrInstruction_Mandatory, "txtDoseValue");
                IsValidate = false;
            }
            if (((!String.IsNullOrEmpty(this.Condition.Dose) && String.Compare(this.Condition.Dose, "0", StringComparison.CurrentCultureIgnoreCase) == 0)) && String.IsNullOrEmpty(this.Condition.UpperDose)) {
                if (this.OnErrorEvent != null)
                    this.OnErrorEvent(9, medConditionalDoseRes.ValDoseZero_mandatory, "txtDoseValue");
                IsValidate = false;
            }
            else if (!String.IsNullOrEmpty(this.Condition.Dose) && (this.Condition.DoseUoM == null || String.IsNullOrEmpty(this.Condition.DoseUoM.Value))) {
                if (this.OnErrorEvent != null)
                    this.OnErrorEvent(9, medConditionalDoseRes.ValDoseUOMEmpty_mandatory, "cboDoseValueUOM");
                IsValidate = false;
            }
            else if ((!String.IsNullOrEmpty(this.Condition.Dose) && dDose > 0 && dDose < 1) && (!ObjectHelper.HasValue(this.IsDoseAccepted) || (ObjectHelper.HasValue(this.IsDoseAccepted) && !this.IsDoseAccepted.Value))) {
                if (this.OnConfirmEvent != null)
                    this.OnConfirmEvent(dDose, medConditionalDoseRes.DoseSafety_Msg, "txtDoseValue", this.sAction);
                IsValidate = false;
            }
            else if (!String.IsNullOrEmpty(this.Condition.Dose) && !String.IsNullOrEmpty(this.Condition.UpperDose) && (dUDose < dDose)) {
                if (this.OnConfirmEvent != null)
                    this.OnErrorEvent(9, medConditionalDoseRes.Range_Validation1, "txtUpperDoseValue");
                IsValidate = false;
            }
            else if (!String.IsNullOrEmpty(this.Condition.Dose) && !String.IsNullOrEmpty(this.Condition.UpperDose) && (dUDose == dDose)) {
                if (this.OnConfirmEvent != null)
                    this.OnErrorEvent(9, medConditionalDoseRes.Range_Validation, "txtUpperDoseValue");
                IsValidate = false;
            }
            return IsValidate;
        }
        private ValidateDecimal(): boolean {
            if (this.Condition != null && this.Condition.RangeUoM != null) {
                let decimallevel: number = this.Condition.RangeUoM.Level;
                let slowerrange: string = Convert.ToString(this.Condition.LowerRange);
                let supperrange: string = Convert.ToString(this.Condition.UpperRange);
                let serrormsg: string = String.Format(medConditionalDoseRes.ValidateDecimal_UOM, this.SelectedObservationResult.Value, this.Condition.RangeUoM.DisplayText, this.Condition.RangeUoM.Level.ToString());
                let serrormsg1: string = String.Format(medConditionalDoseRes.ValidateDecimal_General, this.SelectedObservationResult.Value, this.SelectedObservationResult.Value, this.Condition.RangeUoM.DisplayText);
                if (!String.IsNullOrEmpty(slowerrange)) {
                    let lwrrangeval: string[] = slowerrange.Split('.');
                    if (slowerrange.Contains(".")) {
                        if (lwrrangeval != null && lwrrangeval.length > 1 && String.IsNullOrEmpty(lwrrangeval[1])) {
                            this.Condition.LowerRange = slowerrange.Remove(slowerrange.length - 1);
                        }
                    }
                    if (lwrrangeval != null && lwrrangeval.length > 1 && lwrrangeval[1].length > decimallevel) {
                        if (this.OnConfirmEvent != null)
                            this.OnErrorEvent(9, serrormsg, "txtLowerRange");
                        return false;
                    }
                    if (lwrrangeval != null && lwrrangeval.length > 1 && lwrrangeval[1].length > 3 && decimallevel == -1) {
                        if (this.OnConfirmEvent != null)
                            this.OnErrorEvent(9, serrormsg1, "txtLowerRange");
                        return false;
                    }
                }
                if (!String.IsNullOrEmpty(supperrange)) {
                    let uprrangeval: string[] = supperrange.Split('.');
                    if (supperrange.Contains(".")) {
                        if (uprrangeval != null && uprrangeval.length > 1 && String.IsNullOrEmpty(uprrangeval[1])) {
                            this.Condition.UpperRange = supperrange.Remove(supperrange.length - 1);
                        }
                    }
                    if (uprrangeval != null && uprrangeval.length > 1 && uprrangeval[1].length > decimallevel) {
                        if (this.OnConfirmEvent != null)
                            this.OnErrorEvent(9, serrormsg, "txtUpperRange");
                        return false;
                    }
                    if (uprrangeval != null && uprrangeval.length > 1 && uprrangeval[1].length > 3 && decimallevel == -1) {
                        if (this.OnConfirmEvent != null)
                            this.OnErrorEvent(9, serrormsg1, "txtUpperRange");
                        return false;
                    }
                }
            }
            return true;
        }
        private ValidateDoseFOrClerking(): boolean {
            let dDose: number = 0;
            let dUDose: number = 0;
            Number.TryParse(this.Condition.Dose, (o) => { dDose = o; });
            Number.TryParse(this.Condition.UpperDose, (o) => { dUDose = o; });
            let IsValidate: boolean = true;
            let IsDoseZeroAndUpperDoseEmpty: boolean = (!String.IsNullOrEmpty(this.Condition.Dose) && String.Compare(this.Condition.Dose, "0", StringComparison.CurrentCultureIgnoreCase) == 0) && String.IsNullOrEmpty(this.Condition.UpperDose);
            let IsUpperDoseOnlyEntered: boolean = String.IsNullOrEmpty(this.Condition.Dose) && !String.IsNullOrEmpty(this.Condition.UpperDose);
            if (IsDoseZeroAndUpperDoseEmpty || IsUpperDoseOnlyEntered) {
                if (this.OnErrorEvent != null)
                    this.OnErrorEvent(9, medConditionalDoseRes.Clerking_Mandatory, "txtDoseValue");
                IsValidate = false;
            }
            else if ((String.IsNullOrEmpty(this.Condition.Dose) || (!String.IsNullOrEmpty(this.Condition.Dose) && String.Compare(this.Condition.Dose, "0", StringComparison.CurrentCultureIgnoreCase) == 0) && String.IsNullOrEmpty(this.Condition.UpperDose)) && this.Condition.DoseUoM != null && !String.IsNullOrEmpty(this.Condition.DoseUoM.Value)) {
                if (this.OnErrorEvent != null)
                    this.OnErrorEvent(9, medConditionalDoseRes.Clerking_Mandatory, "txtDoseValue");
                IsValidate = false;
            }
            else if ((!String.IsNullOrEmpty(this.Condition.Dose) && String.Compare(this.Condition.Dose, "0", StringComparison.CurrentCultureIgnoreCase) != 0) && this.Condition.DoseUoM == null || (this.Condition.DoseUoM != null && String.IsNullOrEmpty(this.Condition.DoseUoM.Value))) {
                if (this.OnErrorEvent != null)
                    this.OnErrorEvent(9, medConditionalDoseRes.Clerking_Mandatory, "cboDoseValueUOM");
                IsValidate = false;
            }
            else if (!String.IsNullOrEmpty(this.Condition.Dose) && this.Condition.DoseUoM == null) {
                if (this.OnErrorEvent != null)
                    this.OnErrorEvent(9, medConditionalDoseRes.Clerking_Mandatory, "cboDoseValueUOM");
                IsValidate = false;
            }
            else if (dDose > 0 && dDose < 1 && (!ObjectHelper.HasValue(this.IsDoseAccepted) || (ObjectHelper.HasValue(this.IsDoseAccepted) && !this.IsDoseAccepted.Value))) {
                if (this.OnConfirmEvent != null)
                    this.OnConfirmEvent(dDose, medConditionalDoseRes.DoseSafety_Msg, "txtDoseValue", this.sAction);
                IsValidate = false;
            }
            else if (!String.IsNullOrEmpty(this.Condition.Dose) && !String.IsNullOrEmpty(this.Condition.UpperDose) && (dUDose < dDose)) {
                if (this.OnConfirmEvent != null)
                    this.OnErrorEvent(9, medConditionalDoseRes.Range_Validation1, "txtUpperDoseValue");
                IsValidate = false;
            }
            else if (!String.IsNullOrEmpty(this.Condition.Dose) && !String.IsNullOrEmpty(this.Condition.UpperDose) && (dUDose == dDose)) {
                if (this.OnConfirmEvent != null)
                    this.OnErrorEvent(9, medConditionalDoseRes.Range_Validation, "txtUpperDoseValue");
                IsValidate = false;
            }
            return IsValidate;
        }
        public SetDefaultValues(): void {
            this.Condition = new ConditionalDose();
            let ConDoseCnt: number = 0;
            if (this.RangeUOMs != null && this.RangeUOMs.Count == 1) {
                this.Condition.RangeUoM = this.RangeUOMs[0];
            }
            if (this._doseDetails != null && this.RangeUOMs != null) {
                ConDoseCnt = this._doseDetails.Count;
                if (ConDoseCnt > 0) {
                    if (this._doseDetails[ConDoseCnt - 1] != null) {
                        this.RangeUOMs.forEach( (UOM)=> {
                            if (this._doseDetails[ConDoseCnt - 1].RangeUoM != null && !String.IsNullOrEmpty(this._doseDetails[ConDoseCnt - 1].RangeUoM.Value)) {
                                if (String.Equals(UOM.Value, this._doseDetails[ConDoseCnt - 1].RangeUoM.Value)) {
                                    this.Condition.RangeUoM = UOM;
                                }
                            }
                        });
                    }
                }
            }
            if (this._selectedDoseDetails == null || this._selectedDoseDetails.length < 2)
                this.SelectedDose = null;
            if (this.tvwConditionEnabledChangedEvent != null)
                this.tvwConditionEnabledChangedEvent(!(this._doseDetails != null && this._doseDetails.Count > 0));
            this.sAction = String.Empty;
            this.IsDoseAccepted = null;
            this.ValueragneValidations();
        }
        private GetEnteredCondition(): ConditionalDose {
            let returnCondition: ConditionalDose = ObjectHelper.CreateObject(new ConditionalDose(), {
                Dose: this.IsConditionalDoseEnable ? this.Condition.Dose : String.Empty,
                UpperDose: this.IsConditionalDoseEnable ? this.Condition.UpperDose : String.Empty,
                DoseUoM: this.Condition.DoseUoM,
                Instruction: this.Condition.Instruction,
                LowerRange: this.Condition.LowerRange,
                UpperRange: this.Condition.UpperRange,
                RangeOperator: this.Condition.RangeOperator,
                Infusionrate: this.Condition.Infusionrate,
                InfusionUpperrate: this.Condition.InfusionUpperrate,
                Infratenumeratoruom: this.Condition.Infratenumeratoruom,
                InfrateDenominatoruom: this.Condition.InfrateDenominatoruom
            });
            if (this.Condition.RangeUoM != null && !String.IsNullOrEmpty(this.Condition.RangeUoM.Value)) {
                returnCondition.RangeUoM = ObjectHelper.CreateObject(new CListItem(), {
                    Value: this.Condition.RangeUoM.Value,
                    DisplayText: this.Condition.RangeUoM.DisplayText,
                    Level: this.Condition.RangeUoM.Level
                });
            }
            if (this.Condition.DoseUoM != null && !String.IsNullOrEmpty(this.Condition.DoseUoM.Value) && this.IsConditionalDoseEnable) {
                returnCondition.DoseUoM = ObjectHelper.CreateObject(new CListItem(), {
                    Value: this.Condition.DoseUoM.Value,
                    DisplayText: this.Condition.DoseUoM.DisplayText
                });
            }
            returnCondition.InfusionFlag = this.InfusionTypeFlag;
            if (this.Condition.RangeOperator != null && !String.IsNullOrEmpty(this.Condition.RangeOperator.Value)) {
                returnCondition.RangeOperator = ObjectHelper.CreateObject(new CListItem(), {
                    Value: this.Condition.RangeOperator.Value,
                    DisplayText: this.Condition.RangeOperator.DisplayText
                });
            }
            if (this.Condition.Infratenumeratoruom != null && !String.IsNullOrEmpty(this.Condition.Infratenumeratoruom.Value)) {
                returnCondition.Infratenumeratoruom = ObjectHelper.CreateObject(new CListItem(), {
                    Value: this.Condition.Infratenumeratoruom.Value,
                    DisplayText: this.Condition.Infratenumeratoruom.DisplayText,
                    Tag: this.Condition.Infratenumeratoruom.Tag
                });
            }
            if (this.Condition.InfrateDenominatoruom != null && !String.IsNullOrEmpty(this.Condition.InfrateDenominatoruom.Value)) {
                returnCondition.InfrateDenominatoruom = ObjectHelper.CreateObject(new CListItem(), {
                    Value: this.Condition.InfrateDenominatoruom.Value,
                    DisplayText: this.Condition.InfrateDenominatoruom.DisplayText,
                    Tag: this.Condition.InfrateDenominatoruom.Tag
                });
            }
            returnCondition.ObservationResult = this.GetSelectedObservationResultDisplayText();
            return returnCondition;
        }
        private GetSelectedObservationResultDisplayText(): string {
            let strBuild: StringBuilder = new StringBuilder();
            if (this.SelectedObservationResult != null) {
                let sParentKey: string = this._selectedObservationResult.ParentKey;
                if (!(String.Compare(sParentKey, ConditionalDoseConstants.ObservationKey, StringComparison.OrdinalIgnoreCase) == 0 || String.Compare(sParentKey, ConditionalDoseConstants.ResultsKey, StringComparison.OrdinalIgnoreCase) == 0)) {
                    let nLen: number = this.ObservationsResults.Count;
                    for (let i: number = 0; i < nLen; i++) {
                        if (String.Compare(this.ObservationsResults[i].Key, sParentKey) == 0) {
                            strBuild.Append(this.ObservationsResults[i].Value);
                            strBuild.Append(".");
                            break;
                        }
                    }
                }
                strBuild.Append(this._selectedObservationResult.Value);
            }
            return strBuild.ToString();
        }
        public AddCondition(): void {
            this.sAction = "Add";
            if (!this.Validate())
                return
            let returnCondition: ConditionalDose = this.GetEnteredCondition();
            let IsModifiedAdd: boolean = false;
            if (returnCondition != null) {
                IsModifiedAdd = (!String.IsNullOrEmpty(returnCondition.Dose) || !String.IsNullOrEmpty(returnCondition.UpperDose) || (returnCondition.DoseUoM != null && !String.IsNullOrEmpty(returnCondition.DoseUoM.Value))) ? true : false;
                if (!IsModifiedAdd) {
                    IsModifiedAdd = (!String.IsNullOrEmpty(returnCondition.Infusionrate) || !String.IsNullOrEmpty(returnCondition.InfusionUpperrate) || (returnCondition.Infratenumeratoruom != null && !String.IsNullOrEmpty(returnCondition.Infratenumeratoruom.Value)) || (returnCondition.InfrateDenominatoruom != null && !String.IsNullOrEmpty(returnCondition.InfrateDenominatoruom.Value))) ? true : false;
                }
                this.IsModifiedDose = IsModifiedAdd;
            }
            if (this.DoseDetails == null) {
                this.DoseDetails = new ObservableCollection<ConditionalDose>();
            }
            if (this.DoseDetails != null) {
                this.DoseDetails.Add(returnCondition);
            }
            this.SetDefaultValues();
            this.IsTvMsgShown = true;
            if (this.ConditionalDoseChangedEvent != null)
                this.ConditionalDoseChangedEvent(DoseState.Added);
            this.ValueragneValidations();
        }
        public UpdateCondition(): void {
            this.IsTvMsgShown = false;
            this.sAction = "Update";
            if (this.SelectedDose == null || !this.Validate())
                return
            let returnCondition: ConditionalDose = this.GetEnteredCondition();
            if (this.DoseDetails != null) {
                let nSelCond: number = this.DoseDetails.IndexOf(this.SelectedDose);
                if (nSelCond != -1 && this.AmendModifiedConditionalDose(this.SelectedDose, returnCondition)) {
                    this.IsModifiedDose = true;
                    this.IsTvMsgShown = true;
                }
                if (nSelCond != -1) {
                    this.DoseDetails[nSelCond] = returnCondition;
                    this.DoseDetails.array[nSelCond] = returnCondition;
                }
            }
            this.SetDefaultValues();
            if (this.ConditionalDoseChangedEvent != null)
                this.ConditionalDoseChangedEvent(DoseState.Updated);
            this.ValueragneValidations();
        }
        public RemoveCondition(): void {
            this.sAction = "Remove";
            if (this.SelectedDoseDetails == null || this.SelectedDoseDetails.length == 0)
                return
            if (this.DoseDetails != null) {
                let nLen: number = this.SelectedDoseDetails.length;
                for (let i: number = nLen; i > 0; i--) {
                    if (this.DoseDetails[this.SelectedDoseDetails[i - 1]] != null && this.DoseDetails[this.SelectedDoseDetails[i - 1]].RangeOperator != null) {
                        if (String.Equals(this.DoseDetails[this.SelectedDoseDetails[i - 1]].RangeOperator.Value, this.RangeOperatorLessthan.Value) || String.Equals(this.DoseDetails[this.SelectedDoseDetails[i - 1]].RangeOperator.Value, this.RangeOperatorLessthanOrEqualto.Value)) {
                            if (!this.RangeOperators.Contains(this.RangeOperatorLessthan))
                                this.RangeOperators.Add(this.RangeOperatorLessthan);
                            if (!this.RangeOperators.Contains(this.RangeOperatorLessthanOrEqualto))
                                this.RangeOperators.Add(this.RangeOperatorLessthanOrEqualto);
                        }
                    }
                    else if (this.DoseDetails[this.SelectedDoseDetails[i - 1]] != null && this.DoseDetails[this.SelectedDoseDetails[i - 1]].RangeOperator == null) {
                        if (!this.RangeOperators.Contains(this.RangeOperatorLessthan))
                            this.RangeOperators.Add(this.RangeOperatorLessthan);
                        if (!this.RangeOperators.Contains(this.RangeOperatorLessthanOrEqualto))
                            this.RangeOperators.Add(this.RangeOperatorLessthanOrEqualto);
                    }
                    this.DoseDetails.RemoveAt(this.SelectedDoseDetails[i - 1]);
                }
            }
            this._selectedDoseDetails = null;
            this.SetDefaultValues();
            this.IsTvMsgShown = true;
            if (this.ConditionalDoseChangedEvent != null)
                this.ConditionalDoseChangedEvent(DoseState.Removed);
            this.ValueragneValidations();
            if (this.DoseDetails == null || (this.DoseDetails != null && this.DoseDetails.Count == 0))
                this.IsLowerRangeEnabled = true;
        }
        private AmendModifiedConditionalDose(SelectedDose: ConditionalDose, ModifiedDose: ConditionalDose): boolean {
            let isModifiedDose: boolean = false;
            if (!isModifiedDose && SelectedDose != null && ModifiedDose != null) {
                let bSelectedlowerDose: boolean = !String.IsNullOrEmpty(SelectedDose.Dose) ? true : false;
                let bSelectedUpperDose: boolean = !String.IsNullOrEmpty(SelectedDose.UpperDose) ? true : false;
                let bSelectedDoseUom: boolean = (SelectedDose.DoseUoM != null && !String.IsNullOrEmpty(SelectedDose.DoseUoM.Value)) ? true : false;
                let bModifiedlowerDose: boolean = !String.IsNullOrEmpty(ModifiedDose.Dose) ? true : false;
                let bModifiedUpperDose: boolean = !String.IsNullOrEmpty(ModifiedDose.UpperDose) ? true : false;
                let bModifiedDoseUom: boolean = (ModifiedDose.DoseUoM != null && !String.IsNullOrEmpty(ModifiedDose.DoseUoM.Value)) ? true : false;
                if (!isModifiedDose && (!bSelectedlowerDose && !bSelectedUpperDose && !bSelectedDoseUom && bModifiedlowerDose && !bModifiedUpperDose && bModifiedDoseUom)) {
                    isModifiedDose = true;
                }
                else if (!isModifiedDose && (!bSelectedlowerDose && !bSelectedUpperDose && !bSelectedDoseUom && bModifiedlowerDose && bModifiedUpperDose && bModifiedDoseUom)) {
                    isModifiedDose = true;
                }
                else if (!isModifiedDose && (bSelectedlowerDose && bSelectedUpperDose && bSelectedDoseUom && bModifiedlowerDose && !bModifiedUpperDose && bModifiedDoseUom)) {
                    isModifiedDose = true;
                }
                else if (!isModifiedDose && (bSelectedlowerDose && bSelectedUpperDose && bSelectedDoseUom && !bModifiedlowerDose && !bModifiedUpperDose && !bModifiedDoseUom)) {
                    isModifiedDose = true;
                }
                else if (!isModifiedDose && ((!bSelectedUpperDose && bModifiedUpperDose) || (bSelectedUpperDose && !bModifiedUpperDose))) {
                    isModifiedDose = true;
                }
                else if (!isModifiedDose && !String.IsNullOrEmpty(SelectedDose.Dose) && !String.IsNullOrEmpty(ModifiedDose.Dose) && !String.Equals(SelectedDose.Dose, ModifiedDose.Dose, StringComparison.InvariantCultureIgnoreCase)) {
                    isModifiedDose = true;
                }
                else if (!isModifiedDose && !String.IsNullOrEmpty(SelectedDose.UpperDose) && !String.IsNullOrEmpty(ModifiedDose.UpperDose) && !String.Equals(SelectedDose.UpperDose, ModifiedDose.UpperDose, StringComparison.InvariantCultureIgnoreCase)) {
                    isModifiedDose = true;
                }
                else if (!isModifiedDose && SelectedDose.DoseUoM != null && !String.IsNullOrEmpty(SelectedDose.DoseUoM.Value) && ModifiedDose.DoseUoM != null && !String.IsNullOrEmpty(ModifiedDose.DoseUoM.Value) && !String.Equals(SelectedDose.DoseUoM.Value, ModifiedDose.DoseUoM.Value, StringComparison.InvariantCultureIgnoreCase)) {
                    isModifiedDose = true;
                }
                let bSelectedInflowerRate: boolean = !String.IsNullOrEmpty(SelectedDose.Infusionrate) ? true : false;
                let bSelectedInfUpperRate: boolean = !String.IsNullOrEmpty(SelectedDose.InfusionUpperrate) ? true : false;
                let bSelectedInfNumUom: boolean = (SelectedDose.Infratenumeratoruom != null && !String.IsNullOrEmpty(SelectedDose.Infratenumeratoruom.Value)) ? true : false;
                let bSelectedInfDenUom: boolean = (SelectedDose.InfrateDenominatoruom != null && !String.IsNullOrEmpty(SelectedDose.InfrateDenominatoruom.Value)) ? true : false;
                let bModifiedInflowerRate: boolean = !String.IsNullOrEmpty(ModifiedDose.Infusionrate) ? true : false;
                let bModifiedInfUpperRate: boolean = !String.IsNullOrEmpty(ModifiedDose.InfusionUpperrate) ? true : false;
                let bModifiedInfNumUom: boolean = (ModifiedDose.Infratenumeratoruom != null && !String.IsNullOrEmpty(ModifiedDose.Infratenumeratoruom.Value)) ? true : false;
                let bModifiedInfDenUom: boolean = (ModifiedDose.InfrateDenominatoruom != null && !String.IsNullOrEmpty(ModifiedDose.InfrateDenominatoruom.Value)) ? true : false;
                if (!isModifiedDose && (!bSelectedInflowerRate && !bSelectedInfUpperRate && !bSelectedInfNumUom && !bSelectedInfDenUom && bModifiedInflowerRate && !bModifiedInfUpperRate && bModifiedInfNumUom && bModifiedInfDenUom)) {
                    isModifiedDose = true;
                }
                else if (!isModifiedDose && (!bSelectedInflowerRate && !bSelectedInfUpperRate && !bSelectedInfNumUom && !bSelectedInfDenUom && bModifiedInflowerRate && bModifiedInfUpperRate && bModifiedInfNumUom && bModifiedInfDenUom)) {
                    isModifiedDose = true;
                }
                else if (!isModifiedDose && (bSelectedInflowerRate && bSelectedInfUpperRate && bSelectedInfNumUom && bSelectedInfDenUom && bModifiedInflowerRate && !bModifiedInfUpperRate && bModifiedInfNumUom && bModifiedInfDenUom)) {
                    isModifiedDose = true;
                }
                else if (!isModifiedDose && (bSelectedInflowerRate && bSelectedInfUpperRate && bSelectedInfNumUom && bSelectedInfDenUom && !bModifiedInflowerRate && !bModifiedInfUpperRate && !bModifiedInfNumUom && !bModifiedInfDenUom)) {
                    isModifiedDose = true;
                }
                else if (!isModifiedDose && (!bSelectedInfUpperRate && bModifiedInfUpperRate) || (bSelectedInfUpperRate && !bModifiedInfUpperRate)) {
                    isModifiedDose = true;
                }
                else if (!isModifiedDose && !String.IsNullOrEmpty(SelectedDose.Infusionrate) && !String.IsNullOrEmpty(ModifiedDose.Infusionrate) && !String.Equals(SelectedDose.Infusionrate, ModifiedDose.Infusionrate, StringComparison.InvariantCultureIgnoreCase)) {
                    isModifiedDose = true;
                }
                else if (!isModifiedDose && !String.IsNullOrEmpty(SelectedDose.InfusionUpperrate) && !String.IsNullOrEmpty(ModifiedDose.InfusionUpperrate) && !String.Equals(SelectedDose.InfusionUpperrate, ModifiedDose.InfusionUpperrate, StringComparison.InvariantCultureIgnoreCase)) {
                    isModifiedDose = true;
                }
                else if (!isModifiedDose && SelectedDose.Infratenumeratoruom != null && !String.IsNullOrEmpty(SelectedDose.Infratenumeratoruom.Value) && ModifiedDose.Infratenumeratoruom != null && !String.IsNullOrEmpty(ModifiedDose.Infratenumeratoruom.Value) && !String.Equals(SelectedDose.Infratenumeratoruom.Value, ModifiedDose.Infratenumeratoruom.Value, StringComparison.InvariantCultureIgnoreCase)) {
                    isModifiedDose = true;
                }
                else if (!isModifiedDose && SelectedDose.InfrateDenominatoruom != null && !String.IsNullOrEmpty(SelectedDose.InfrateDenominatoruom.Value) && ModifiedDose.InfrateDenominatoruom != null && !String.IsNullOrEmpty(ModifiedDose.InfrateDenominatoruom.Value) && !String.Equals(SelectedDose.InfrateDenominatoruom.Value, ModifiedDose.InfrateDenominatoruom.Value, StringComparison.InvariantCultureIgnoreCase)) {
                    isModifiedDose = true;
                }
            }
            return isModifiedDose;
        }
        public GetIsAddEnabled(): boolean {
            return this._isAddEnabled;
        }
        public GetIsUpdateEnabled(): boolean {
            return this._isUpdateEnabled;
        }
        public GetIsRemoveEnabled(): boolean {
            return this._isRemoveEnabled;
        }
        public get IsAddEnabled(): boolean {
            return this._isAddEnabled;
        }
        private set IsAddEnabled(value: boolean) {
            this._isAddEnabled = value;
            //this.AddCommand = new RelayCommand(this.AddCondition, this.GetIsAddEnabled);
            this.AddCommand = new RelayCommand((s,e) => {this.AddCondition() } , this.GetIsAddEnabled);
        }
        public get IsUpdateEnabled(): boolean {
            return this._isUpdateEnabled;
        }
        private set IsUpdateEnabled(value: boolean) {
            this._isUpdateEnabled = value;
            this.UpdateCommand = new RelayCommand((s,e) => {this.UpdateCondition() }, this.GetIsUpdateEnabled);
        }
        public get IsRemoveEnabled(): boolean {
            return this._isRemoveEnabled;
        }
        private set IsRemoveEnabled(value: boolean) {
            this._isRemoveEnabled = value;
            this.RemoveCommand = new RelayCommand((s,e) => {this.RemoveCondition()} , this.GetIsRemoveEnabled);
        }
        public get AddCommand(): RelayCommand {
            return this._addCommand;
        }
        public set AddCommand(value: RelayCommand) {
            if (!Helper.ReferenceEquals(this._addCommand, value)) {
                this._addCommand = value;
               //NotifyPropertyChanged("AddCommand");
            }
        }
        public get UpdateCommand(): RelayCommand {
            return this._updateCommand;
        }
        public set UpdateCommand(value: RelayCommand) {
            if (!Helper.ReferenceEquals(this._updateCommand, value)) {
                this._updateCommand = value;
               //NotifyPropertyChanged("UpdateCommand");
            }
        }
        public get RemoveCommand(): RelayCommand {
            return this._removeCommand;
        }
        public set RemoveCommand(value: RelayCommand) {
            if (!Helper.ReferenceEquals(this._removeCommand, value)) {
                this._removeCommand = value;
               //NotifyPropertyChanged("RemoveCommand");
            }
        }
        public SetDefaultDisable(): void {
            this.IsAddEnabled = this.IsUpdateEnabled = this.IsRemoveEnabled = false;
            if (this.SelectedObservationResult != null && !String.IsNullOrEmpty(this.SelectedObservationResult.Value))
                this.IsAddEnabled = true;
        }
        public ValueragneValidations(): void {
            if (this.DoseDetails != null && this.DoseDetails.Count > 0) {
                let oCondition: ConditionalDose = new ConditionalDose();
                let dLowerRange: number = 0;
                let dUpperRange: number = 0;
                for (let i: number = 0; i < this.DoseDetails.Count; i++) {
                    oCondition = this.DoseDetails[i];
                    if (oCondition != null) {
                        if (oCondition.RangeOperator == null && !String.IsNullOrEmpty(oCondition.LowerRange) && String.IsNullOrEmpty(oCondition.UpperRange)) {
                            this.IsLowerRangeEnabled = true;
                            this.Condition.LowerRange = String.Empty;
                            if(this.RangeOperator != null){
                            this.RangeOperators.Remove(this.RangeOperatorLessthan);
                            this.RangeOperators.Remove(this.RangeOperatorLessthanOrEqualto);
                            }
                        }
                        else if ((oCondition.RangeOperator != null && (!String.Equals(oCondition.RangeOperator.Value, this.RangeOperatorGreterthan.Value) && !String.Equals(oCondition.RangeOperator.Value, this.RangeOperatorGreterthanOrEqualto.Value))) || (oCondition.RangeOperator == null && !String.IsNullOrEmpty(oCondition.LowerRange) && Number.TryParse(oCondition.LowerRange, (o) => { dLowerRange = o; }))) {
                            if(this.RangeOperator != null){
                            this.RangeOperators.Remove(this.RangeOperatorLessthan);
                            this.RangeOperators.Remove(this.RangeOperatorLessthanOrEqualto);
                            }
                        }
                        let decimalvalue: number = 0;
                        if (oCondition.RangeUoM != null) {
                            if (oCondition.RangeUoM.Level > 0) {
                                let decimagrosslvalue: number = Math.Pow(.1, oCondition.RangeUoM.Level);
                                let strdecimalvalue: string = decimagrosslvalue.ToString("N" + oCondition.RangeUoM.Level);
                                Number.TryParse(strdecimalvalue, (o) => { decimalvalue = o; });
                            }
                            else {
                                decimalvalue = 1;
                            }
                        }
                        let LwrRange: number = 0;
                        if (oCondition.RangeOperator != null && (String.Equals(oCondition.RangeOperator.Value, this.RangeOperatorLessthan.Value) || String.Equals(oCondition.RangeOperator.Value, this.RangeOperatorLessthanOrEqualto.Value))) {
                            if (Number.TryParse(oCondition.LowerRange, (o) => { LwrRange = o; }))
                                LwrRange = LwrRange + decimalvalue;
                            if (this.sActionCode == ActivityTypes.Prescribe) {
                                if (LwrRange > 0) {
                                    this.Condition.LowerRange = LwrRange.ToString();
                                }
                                else {
                                    this.Condition.LowerRange = String.Empty;
                                }
                            }
                            this.IsLowerRangeEnabled = true;
                        }
                        else if ((!String.IsNullOrEmpty(oCondition.LowerRange) && (!String.IsNullOrEmpty(oCondition.UpperRange))) && Number.TryParse(oCondition.LowerRange, (o) => { LwrRange = o; }) && Number.TryParse(oCondition.UpperRange, (o) => { dUpperRange = o; })) {
                            LwrRange = Convert.ToDouble(oCondition.UpperRange) + decimalvalue;
                            this.Condition.LowerRange = LwrRange.ToString();
                            this.IsLowerRangeEnabled = false;
                        }
                        else if (oCondition.RangeOperator != null && (String.Equals(oCondition.RangeOperator.Value, this.RangeOperatorGreterthan.Value) || String.Equals(oCondition.RangeOperator.Value, this.RangeOperatorGreterthanOrEqualto.Value))) {
                            this.IsAddEnabled = this.IsRemoveEnabled = this.IsUpdateEnabled = false;
                            this.Condition.LowerRange = String.Empty;
                        }
                    }
                }
            }
        }
        public LessthanPreviousCheck(): boolean {
            let bLessValue: boolean = false;
            if (this.DoseDetails != null && this.DoseDetails.Count > 0) {
                let oCondition: ConditionalDose = new ConditionalDose();
                for (let i: number = 0; i < this.DoseDetails.Count; i++) {
                    oCondition = this.DoseDetails[i];
                    if (oCondition != null && oCondition.RangeOperator != null && (String.Equals(oCondition.RangeOperator.Value, this.RangeOperatorLessthan.Value) || String.Equals(oCondition.RangeOperator.Value, this.RangeOperatorLessthanOrEqualto.Value))) {
                        let dPreLwrrange: number = 0;
                        let dCurrLwrrange: number = 0;
                        Number.TryParse(oCondition.LowerRange, (o) => { dPreLwrrange = o; });
                        Number.TryParse(this.Condition.LowerRange, (o) => { dCurrLwrrange = o; });
                        if (dCurrLwrrange < dPreLwrrange) {
                            if (this.OnErrorEvent != null)
                                this.OnErrorEvent(10, medConditionalDoseRes.ValRange_Validation + " " + dPreLwrrange.ToString(), "txtLowerRange");
                            bLessValue = true;
                            break;
                        }
                    }
                }
            }
            return bLessValue;
        }
        public AnyRangeAvailableCheck(): boolean {
            let bAvailable: boolean = false;
            if (this.DoseDetails != null && this.DoseDetails.Count > 0) {
                let oCondition: ConditionalDose = new ConditionalDose();
                for (let i: number = 0; i < this.DoseDetails.Count; i++) {
                    oCondition = this.DoseDetails[i];
                    if (oCondition != null && oCondition.RangeOperator == null && !String.IsNullOrEmpty(oCondition.LowerRange) && !String.IsNullOrEmpty(oCondition.UpperRange)) {
                        if (oCondition != this._selectedDose) {
                            if (this.OnErrorEvent != null)
                                this.OnErrorEvent(10, "Enter upper range. This field is mandatory", "txtUpperRange");
                            bAvailable = true;
                            break;
                        }
                    }
                }
            }
            return bAvailable;
        }
        public IsUpperRateEnable(): boolean {
            let bEnable: boolean = true;
            if (this.DoseDetails != null && this.DoseDetails.Count > 0) {
                let oCondition: ConditionalDose = new ConditionalDose();
                for (let i: number = 0; i < this.DoseDetails.Count; i++) {
                    oCondition = this.DoseDetails[i];
                    if (oCondition != null && oCondition.RangeOperator == null && !String.IsNullOrEmpty(oCondition.LowerRange) && String.IsNullOrEmpty(oCondition.UpperRange)) {
                        if (oCondition != this._selectedDose) {
                            bEnable = false;
                            break;
                        }
                    }
                }
            }
            return bEnable;
        }
        public IsModifiedDose: boolean = false;
        public IsTvMsgShown: boolean = false;
        public AdditionalItemOID: number = 0;
        public AdditionalItemType: string;
        public AdditionalItemValue: string;
        public ParentAdditionalItemValue: string;
        public get InfRateNumeratorUOMList(): ObservableCollection<CListItem> {
            return this._infRateNumeratorUOMList;
        }
        public set InfRateNumeratorUOMList(value: ObservableCollection<CListItem>) {
            if (this._infRateNumeratorUOMList != value) {
                this._infRateNumeratorUOMList = value;
               //super.NotifyPropertyChanged("InfRateNumeratorUOMList");
            }
        }
        public get InfusionratedenoUOMList(): ObservableCollection<CListItem> {
            return this._infusionratedenoUOMList;
        }
        public set InfusionratedenoUOMList(value: ObservableCollection<CListItem>) {
            if (this._infusionratedenoUOMList != value) {
                this._infusionratedenoUOMList = value;
               //super.NotifyPropertyChanged("InfusionratedenoUOMList");
            }
        }
        private _IsConditionalDoseEnable: boolean = false;
        public get IsConditionalDoseEnable(): boolean {
            return this._IsConditionalDoseEnable;
        }
        public set IsConditionalDoseEnable(value: boolean) {
            this._IsConditionalDoseEnable = value;
           //super.NotifyPropertyChanged("IsConditionalDoseEnable");
        }
        private DisposeVmObjects(): void {
            this.AddCommand = null;
            this.UpdateCommand = null;
            this.RemoveCommand = null;
        }
        public DoCleanUP(): void {
            this.DisposeVmObjects();
        }
    }