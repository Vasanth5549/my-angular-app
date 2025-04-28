import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, ObservableCollection, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, CListItem, AppSessionInfo } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from '../../shared/epma-platform/soap-client/helper.service';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { FormViewerVM } from './formviewervm';
import { CReqMsgGetAllOptions, CResMsgGetAllOptions, GetAllOptionsCompletedEventArgs, ManagePrescriptionWSSoapClient } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { CConstants } from '../utilities/constants';
import { Common } from '../utilities/common';
import * as Application from 'src/app/lorappcommonbb/amshelper';
import * as IPPManagePrescSer from '../../shared/epma-platform/soap-client/ManagePrescriptionWS'

  
  
    export class MulticomponentVM extends ViewModelBase {
        public SelectedRowIndex: number = -1;
        private formViewerDetails: FormViewerVM;
        private _IsTechValidate: boolean = false;
        private _propMCBasicInfo: ObservableCollection<MulticomponentChildVM> = new ObservableCollection<MulticomponentChildVM>();
        public get oMCItemBasicInfo(): ObservableCollection<MulticomponentChildVM> {
            return this._propMCBasicInfo;
        }
        public set oMCItemBasicInfo(value: ObservableCollection<MulticomponentChildVM>) {
            if (this._propMCBasicInfo != value) {
                this._propMCBasicInfo.CopyFrom(value);
               //NotifyPropertyChanged("oMCItemBasicInfo");
            }
        }
        private _IsWardStock: boolean = false;
        public get IsWardStock(): boolean {
            return this._IsWardStock;
        }
        public set IsWardStock(value: boolean) {
            if (this._IsWardStock != value) {
                this._IsWardStock = value;
               //super.NotifyPropertyChanged("IsWardStock");
            }
        }
        private _IsOriginalSupplyRequested: boolean = false;
        public get IsOriginalSupplyRequested(): boolean {
            return this._IsOriginalSupplyRequested;
        }
        public set IsOriginalSupplyRequested(value: boolean) {
            if (this._IsOriginalSupplyRequested != value) {
                this._IsOriginalSupplyRequested = value;
               //super.NotifyPropertyChanged("IsOriginalSupplyRequested");
            }
        }
        //public delegate void IsSupplyRequestedChange(PrescriptionItemVM PresItemVM);
        public IsSupplyRequestedChangedEvent: Function;
        private _IsSupplyRequested: boolean = false;
        public get IsSupplyRequested(): boolean {
            return this._IsSupplyRequested;
        }
        public set IsSupplyRequested(value: boolean) {
            if (this._IsSupplyRequested != value) {
                this._IsSupplyRequested = value;
                // if (this._IsSupplyRequested && this.IsSupplyRequestedChangedEvent != null)
                   //super.NotifyPropertyChanged("IsSupplyRequested");
            }
        }
        private _IsSupplyRequestVisible: boolean = false;
        public get IsSupplyRequestVisible(): boolean {
            return this._IsSupplyRequestVisible;
        }
        public set IsSupplyRequestVisible(value: boolean) {
            if (this._IsSupplyRequestVisible != value) {
                this._IsSupplyRequestVisible = value;
               //super.NotifyPropertyChanged("IsSupplyRequestVisible");
            }
        }
        private _IsReSupplyRequested: boolean = false;
        public get IsReSupplyRequested(): boolean {
            return this._IsReSupplyRequested;
        }
        public set IsReSupplyRequested(value: boolean) {
            if (this._IsReSupplyRequested != value) {
                this._IsReSupplyRequested = value;
               //super.NotifyPropertyChanged("IsReSupplyRequested");
            }
        }
        private _IsReSupplyRequestVisible: boolean = false;
        public get IsReSupplyRequestVisible(): boolean {
            return this._IsReSupplyRequestVisible;
        }
        public set IsReSupplyRequestVisible(value: boolean) {
            if (this._IsReSupplyRequestVisible != value) {
                this._IsReSupplyRequestVisible = value;
               //super.NotifyPropertyChanged("IsReSupplyRequestVisible");
            }
        }
        private isSupplyRequestedEnable: boolean = false;
        public get IsSupplyRequestedEnable(): boolean {
            return this.isSupplyRequestedEnable;
        }
        public set IsSupplyRequestedEnable(value: boolean) {
            if (this.isSupplyRequestedEnable != value) {
                this.isSupplyRequestedEnable = value;
               //NotifyPropertyChanged("IsSupplyRequestedEnable");
            }
        }
        private _RequisitionCACode: string = String.Empty;
        public get RequisitionCACode(): string {
            return this._RequisitionCACode;
        }
        public set RequisitionCACode(value: string) {
            if (this._RequisitionCACode != value) {
                this._RequisitionCACode = value;
               //super.NotifyPropertyChanged("RequisitionCACode");
            }
        }
        private _supDisText: string = "Add supply instruction";
        public get SupDisText(): string {
            return this._supDisText;
        }
        public set SupDisText(value: string) {
            this._supDisText = value;
           //NotifyPropertyChanged("SupDisText");
        }
        private _supToolTipDisText: string = "Add supply instructions/ Product options";
        public get supToolTipDisText(): string {
            return this._supToolTipDisText;
        }
        public set supToolTipDisText(value: string) {
            this._supToolTipDisText = value;
           //NotifyPropertyChanged("supToolTipDisText");
        }
        public LorenzoID: string;
        public get FormViewerDetails(): FormViewerVM {
            return this.formViewerDetails;
        }
        public set FormViewerDetails(value: FormViewerVM) {
            if (this.formViewerDetails != value) {
                this.formViewerDetails = value;
               //super.NotifyPropertyChanged("FormViewerDetails");
            }
        }
        public get IsTechValidate(): boolean {
            return this._IsTechValidate;
        }
        public set IsTechValidate(value: boolean) {
            this._IsTechValidate = value;
           //NotifyPropertyChanged("IsTechValidate");
        }
    }
    export class MulticomponentChildVM extends IPPManagePrescSer.IPPMCPresctiptionItem { 
        //public delegate void QuantityUOMChanged();
        public QuantityUOMChangedEvent: Function;
        private _mcUomcmb: ObservableCollection<CListItem>;
        public get MCUOMCombo(): ObservableCollection<CListItem> {
            return this._mcUomcmb;
        }
        public set MCUOMCombo(value: ObservableCollection<CListItem>) {
            if (this._mcUomcmb != value) {
                this._mcUomcmb = value;
                // RaisePropertyChanged("MCUOMCombo");
            }
        }
        private _mcUomvalue: CListItem;
        public get MCUOMValue(): CListItem {
            return this._mcUomvalue;
        }
        public set MCUOMValue(value: CListItem) {
            let prevValue: CListItem;
            if (this._mcUomvalue != value) {
                if (this._mcUomvalue == null)
                    prevValue = new CListItem();
                else prevValue = this._mcUomvalue;
                this._mcUomvalue = value;
                // RaisePropertyChanged("MCUOMValue");
                if (this.QuantityUOMChangedEvent != null && prevValue != null && value != null && !String.IsNullOrEmpty(value.DisplayText) && prevValue.Value != value.Value) {
                    this.QuantityUOMChangedEvent();
                }
                if (this._mcUomvalue != null && this._mcUomvalue.DisplayText != null)
                    this.MCUomName = this._mcUomvalue.DisplayText;
                if (this._mcUomvalue != null && this._mcUomvalue.DisplayText != null && this._mcUomvalue.DisplayText == "More") {
                    this._mcUomvalue = null;
                    this.MCUomName = String.Empty;
                    this.MoreOptionCode = CConstants.DoseUOMOptionCode;
                    this.GetMoreComboOption();
                }
            }
        }
        private _MCUomName: string;
        public get MCUomName(): string {
            return this._MCUomName;
        }
        public set MCUomName(value: string) {
            this._MCUomName = value;
            // RaisePropertyChanged("MCUomName");
        }
        private _Compoentsdrugprop: string = String.Empty;
        public get Compoentsdrugprop(): string {
            return this._Compoentsdrugprop;
        }
        public set Compoentsdrugprop(value: string) {
            if (this._Compoentsdrugprop != value) {
                this._Compoentsdrugprop = value;
                // RaisePropertyChanged("Compoentsdrugprop");
            }
        }
        private _PresItemTechOID: number = 0;
        public get PresItemTechOID(): number {
            return this._PresItemTechOID;
        }
        public set PresItemTechOID(value: number) {
            this._PresItemTechOID = value;
            // RaisePropertyChanged("PresItemTechOID");
        }
        private MoreOptionCode: string;
        private GetMoreComboOption(): void {
            let objService: ManagePrescriptionWSSoapClient = new ManagePrescriptionWSSoapClient();
            objService.GetAllOptionsCompleted  = (s,e) => { this.objService_GetAllOptionsCompleted(s,e); } ;
            let objAllRequest: CReqMsgGetAllOptions = new CReqMsgGetAllOptions();
            objAllRequest.IdentifyingOIDBC = 0;
            objAllRequest.IdentifyingTypeBC = String.Empty;
            objAllRequest.sOptionCodeBC = this.MoreOptionCode;
            objAllRequest.MCVersionNoBC = AppSessionInfo.AMCV;
            objAllRequest.oContextInformation = Common.FillContext();
            objService.GetAllOptionsAsync(objAllRequest);
        }
        objService_GetAllOptionsCompleted(sender: Object, e: GetAllOptionsCompletedEventArgs): void {
            let _ErrorID: number = 80000046;
            let _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:BasicDetailsVM, Method:objService_GetAllOptionsCompleted()";
            if (e.Error == null) {
                try {
                    let objResponse: CResMsgGetAllOptions = e.Result;
                    if (objResponse != null && objResponse.oValues != null && objResponse.oValues.Count > 0) {
                        switch (this.MoreOptionCode) {
                            case CConstants.DoseUOMOptionCode:
                                this.MCUOMCombo = new ObservableCollection<CListItem>();
                                for (let i: number = 0; i < objResponse.oValues.Count; i++) {
                                    if (!String.IsNullOrEmpty(objResponse.oValues[i].Name)) {
                                        this.MCUOMCombo.Add(ObjectHelper.CreateObject(new CListItem(), {
                                            DisplayText: objResponse.oValues[i].Name,
                                            Value: objResponse.oValues[i].Code.ToString()
                                        }));
                                    }
                                }
                                break;
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
        }
        private _MCIBrandName: string;
        public get MCIBrandName(): string {
            return this._MCIBrandName;
        }
        public set MCIBrandName(value: string) {
            this._MCIBrandName = value;
        }
        private _IsUptoEnabled: boolean = true;
        public get IsUptoEnabled(): boolean {
            return this._IsUptoEnabled;
        }
        public set IsUptoEnabled(value: boolean) {
            if (this._IsUptoEnabled != value) {
                this._IsUptoEnabled = value;
                // RaisePropertyChanged("IsUptoEnabled");
            }
        }
    }