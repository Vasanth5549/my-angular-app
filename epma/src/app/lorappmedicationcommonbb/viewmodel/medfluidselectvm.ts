import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison , AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, List, ObservableCollection} from 'epma-platform/models';
import { AppDialog, iPowerSearch } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { Dictionary } from 'epma-platform/dictionary';
import { MedicationCommonProfileData } from '../utilities/profiledata';
import {  EnumSearchCriteria, EnumSearchType } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import * as ManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS'
import { PSLineItem, PSStyleItem } from 'src/app/shared/epma-platform/controls/iPowerSearch';
  
    export class MedFluidSelectVM extends ViewModelBase {
        public oAString: ManagePrescSer.ArrayOfString;
        public valueCollection: Dictionary<string, List<string>>;
        BrandFlagForDrug: string = "0";
        itmTypPrmScr: List<string> = new List<string>();
        public LoadUserFavourites: boolean = false;
        private lstfluidLineItem: ObservableCollection<PSLineItem> = new ObservableCollection<PSLineItem>();
        public get LstFluidLineItem(): ObservableCollection<PSLineItem> {
            return this.lstfluidLineItem;
        }
        public set LstFluidLineItem(value: ObservableCollection<PSLineItem>) {
        if ((this.lstfluidLineItem != value)) {
                this.lstfluidLineItem = value;
               //NotifyPropertyChanged("LstFluidLineItem");
            }
        }
        private _lineItem: string;
        public get LineItem(): string {
            return this._lineItem;
        }
        public set LineItem(value: string) {
            if (this._lineItem != value) {
                this._lineItem = value;
               //NotifyPropertyChanged("LineItem");
            }
        }
        public GetProfileConfigData(SearchCriteria: string): void {
            let criteria: string = String.Empty;
            this.oAString = new ManagePrescSer.ArrayOfString();
            switch (SearchCriteria) {
                case "REQUEST_SET_CARE_SET":
                    criteria = "CC_REQCARESET";
                    break;
                case "PROBLEM":
                    criteria = "CC_MEDPLM";
                    break;
                case "HIERARCHY":
                    criteria = "CC_SUBDP_HRCY";
                    break;
                case "DRUG_NAME":
                    criteria = "CC_DRUGNAME";
                    break;
            }
            if (MedicationCommonProfileData.MedSearchConfig != null && MedicationCommonProfileData.MedSearchConfig.PowerSearchConfig != null && MedicationCommonProfileData.MedSearchConfig.PowerSearchConfig.Count > 0) {
            let tstData: StringBuilder = new StringBuilder();
                this.valueCollection = new Dictionary<string, List<string>>();
                let collection: List<string>;
                let sPriResultList: string;
                let sbPriResultList: StringBuilder = new StringBuilder();
                let myData: string[];
                let nCount: number = MedicationCommonProfileData.MedSearchConfig.PowerSearchConfig.Count;
                for (let i: number = 0; i < nCount; i++) {
                    tstData.Clear();
                    if (String.Compare(MedicationCommonProfileData.MedSearchConfig.PowerSearchConfig[i].SearchOptionValue.ToUpper(), criteria, StringComparison.CurrentCultureIgnoreCase) == 0) {
                        collection = new List<string>();
                        this.itmTypPrmScr.Add(MedicationCommonProfileData.MedSearchConfig.PowerSearchConfig[i].ItemTypeValue.ToUpper());
                        if (String.Compare(MedicationCommonProfileData.MedSearchConfig.PowerSearchConfig[i].ItemTypeValue, "CC_DRUG", StringComparison.CurrentCultureIgnoreCase) == 0) {
                            if (String.Compare(MedicationCommonProfileData.MedSearchConfig.PowerSearchConfig[i].ShowPrescribebybrandoptions, "Yes", StringComparison.CurrentCultureIgnoreCase) == 0)
                                this.BrandFlagForDrug = "1";
                        }
                        sPriResultList = MedicationCommonProfileData.MedSearchConfig.PowerSearchConfig[i].PrimaryResultList.ToUpper();
                        sPriResultList = sPriResultList.Replace(" ", String.Empty);
                        sPriResultList = sPriResultList.Replace("VIRTUALMOIETY", "CATALOGUEITEM");
                        myData = sPriResultList.Split(',');
                        collection.Clear();
                        sbPriResultList.Clear();
                        for (let dnt: number = 0; dnt < myData.length; dnt++) {
                            collection.Add(myData[dnt]);
                            sbPriResultList.Append(myData[dnt]);
                            sbPriResultList.Append("~");
                        }
                        if (!this.valueCollection.ContainsKey(MedicationCommonProfileData.MedSearchConfig.PowerSearchConfig[i].ItemTypeValue.ToUpper())) {
                            this.valueCollection.Add(MedicationCommonProfileData.MedSearchConfig.PowerSearchConfig[i].ItemTypeValue.ToUpper(), collection);
                            tstData.Append(MedicationCommonProfileData.MedSearchConfig.PowerSearchConfig[i].ItemTypeValue.ToUpper());
                            tstData.Append("-");
                            tstData.Append(sbPriResultList);
                            this.oAString.Add(tstData.ToString());
                        }
                    }
                }
            }
        }
        public GetSearchType(sSearchType: string): EnumSearchType {
            let ReturnValue: EnumSearchType = EnumSearchType.NONE;
            switch (sSearchType) {
                case "CONTAINS":
                    ReturnValue = EnumSearchType.CONTAINS;
                    break;
                case "LEADING_WORD":
                    ReturnValue = EnumSearchType.LEADING_WORD;
                    break;
                case "FULLY_RESOLVED":
                    ReturnValue = EnumSearchType.FULLY_RESOLVED;
                    break;
            }
            return ReturnValue;
        }
        public GetSearchCriteria(sSearchType: string): EnumSearchCriteria {
            let ReturnValue: EnumSearchCriteria = EnumSearchCriteria.DRUG;
            switch (sSearchType) {
                case "DRUG_NAME":
                    ReturnValue = EnumSearchCriteria.DRUG;
                    break;
                case "HIERARCHY":
                    ReturnValue = EnumSearchCriteria.HIERARCHY;
                    break;
                case "PROBLEM":
                    ReturnValue = EnumSearchCriteria.PROBLEM;
                    break;
                case "REQUEST_SET_CARE_SET":
                    ReturnValue = EnumSearchCriteria.REQUESTSET_CARESET;
                    break;
                case "FAVOURITES":
                    ReturnValue = EnumSearchCriteria.FAVOURITES;
                    break;
            }
            return ReturnValue;
        }
        private lstfluidStyleItem: ObservableCollection<PSStyleItem>;
        public get LstFluidStyleItem(): ObservableCollection<PSStyleItem> {
            return this.lstfluidStyleItem;
        }
        public set LstFluidStyleItem(value: ObservableCollection<PSStyleItem>) {
            if (this.lstfluidStyleItem != value) {
                this.lstfluidStyleItem = value;
               //NotifyPropertyChanged("LstFluidStyleItem");
            }
        }
        private fluidID: string;
        public get FluidID(): string {
            return this.fluidID;
        }
        public set FluidID(value: string) {
            this.fluidID = value;
           //NotifyPropertyChanged("FluidID");
        }
        private fluidOID: number = 0;
        public get FluidOID(): number {
            return this.fluidOID;
        }
        public set FluidOID(value: number) {
            this.fluidOID = value;
           //NotifyPropertyChanged("FluidOID");
        }
        private fluidLorenzoID: string;
        public get FluidLorenzoID(): string {
            return this.fluidLorenzoID;
        }
        public set FluidLorenzoID(value: string) {
            this.fluidLorenzoID = value;
           //NotifyPropertyChanged("FluidLorenzoID");
        }
        private fluidItemType: string;
        public get FluidItemType(): string {
            return this.fluidItemType;
        }
        public set FluidItemType(value: string) {
            this.fluidItemType = value;
           //NotifyPropertyChanged("FluidItemType");
        }
        private fluidPRPSTUSCode: string;
        public get FluidPRPSTUSCode(): string {
            return this.fluidPRPSTUSCode;
        }
        public set FluidPRPSTUSCode(value: string) {
            this.fluidPRPSTUSCode = value;
           //NotifyPropertyChanged("FluidItemType");
        }
        private sFluidAdminMethod: string;
        public get FluidAdminMethod(): string {
            return this.sFluidAdminMethod;
        }
        public set FluidAdminMethod(value: string) {
            this.sFluidAdminMethod = value;
           //NotifyPropertyChanged("FluidAdminMethod");
        }
    }