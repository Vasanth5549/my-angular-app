import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, ObservableCollection, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from '../../shared/epma-platform/soap-client/helper.service';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { Dictionary } from 'epma-platform/dictionary';
import { MulticomponentVM } from './MulticomponentVM';
import { DrugProperty } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { CConstants } from '../utilities/constants';
 
    export class AlternateItem extends ViewModelBase {
        private _IdentifyingName: string;
        public get IdentifyingName(): string {
            return this._IdentifyingName;
        }
        public set IdentifyingName(value: string) {
            this._IdentifyingName = value;
        }
        private _PrescribeItemID: string;
        public get PrescribeItemID(): string {
            return this._PrescribeItemID;
        }
        public set PrescribeItemID(value: string) {
            this._PrescribeItemID = value;
        }
        private _IdentifyingType: string;
        public get IdentifyingType(): string {
            return this._IdentifyingType;
        }
        public set IdentifyingType(value: string) {
            this._IdentifyingType = value;
        }
        private _Message: string;
        public get Message(): string {
            return this._Message;
        }
        public set Message(value: string) {
            this._Message = value;
        }
        private _IsFormulary: string;
        public get IsFormulary(): string {
            return this._IsFormulary;
        }
        public set IsFormulary(value: string) {
            this._IsFormulary = value;
        }
        private _FMNoteToolTip: string;
        public get FMNoteToolTip(): string {
            return this._FMNoteToolTip;
        }
        public set FMNoteToolTip(value: string) {
            this._FMNoteToolTip = value;
        }
        private _IdentifyingOID: string;
        public get IdentifyingOID(): string {
            return this._IdentifyingOID;
        }
        public set IdentifyingOID(value: string) {
            this._IdentifyingOID = value;
        }
        private _LorenzoID: string;
        public get LorenzoID(): string {
            return this._LorenzoID;
        }
        public set LorenzoID(value: string) {
            this._LorenzoID = value;
        }
        private _DrugProperties: string;
        public get DrugProperties(): string {
            return this._DrugProperties;
        }
        public set DrugProperties(value: string) {
            this._DrugProperties = value;
        }
        private _isAccessConstraint: string;
        public get IsAccessConstraint(): string {
            return this._isAccessConstraint;
        }
        public set IsAccessConstraint(value: string) {
            this._isAccessConstraint = value;
        }
        private _isByBrand: string;
        public get IsByBrand(): string {
            return this._isByBrand;
        }
        public set IsByBrand(value: string) {
            this._isByBrand = value;
        }
        private _itemType: string;
        public get ItemType(): string {
            return this._itemType;
        }
        public set ItemType(value: string) {
            this._itemType = value;
        }
        private dicProductType: Dictionary<string, string>;
        private _formularyNotes: string;
        public get FormularyNotes(): string {
            return this._formularyNotes;
        }
        public set FormularyNotes(value: string) {
            this._formularyNotes = value;
            if (!String.IsNullOrEmpty(this._formularyNotes))
                this.IsIconVisible = "Visible";
            else this.IsIconVisible = "Collapsed";
           //NotifyPropertyChanged("FormularyNotes");
        }
        private multicomponentdetails: MulticomponentVM;
        public get MulticomponentDetails(): MulticomponentVM {
            return this.multicomponentdetails;
        }
        public set MulticomponentDetails(value: MulticomponentVM) {
            if (this.multicomponentdetails != value) {
                this.multicomponentdetails = value;
               //NotifyPropertyChanged("MulticomponentDetails");
            }
        }
        private _itemsubType: string;
        public get ItemsubType(): string {
            return this._itemsubType;
        }
        public set ItemsubType(value: string) {
            this._itemsubType = value;
        }
        private _Mcitemdisplay: string;
        public get mcitemdisplay(): string {
            return this._Mcitemdisplay;
        }
        public set mcitemdisplay(value: string) {
            this._Mcitemdisplay = value;
        }
        private _prepStatus: string;
        public get PreparationStatus(): string {
            return this._prepStatus;
        }
        public set PreparationStatus(value: string) {
            this._prepStatus = value;
        }
        private _isIconVisible: string = "Collapsed";
        public get IsIconVisible(): string {
            return this._isIconVisible;
        }
        public set IsIconVisible(value: string) {
            this._isIconVisible = value;
           //NotifyPropertyChanged("IsIconVisible");
        }
        private _drugPropertyNotes: string;
        public get DrugPropertyNotes(): string {
            return this._drugPropertyNotes;
        }
        public set DrugPropertyNotes(value: string) {
            this._drugPropertyNotes = value;
            if (!String.IsNullOrEmpty(this._drugPropertyNotes))
                this.IsDrugPropertyIconVisible = "Visible";
            else this.IsDrugPropertyIconVisible = "Collapsed";
           //NotifyPropertyChanged("DrugPropertyNotes");
        }
        private _isDrugPropertyIconVisible: string = "Collapsed";
        public get IsDrugPropertyIconVisible(): string {
            return this._isDrugPropertyIconVisible;
        }
        public set IsDrugPropertyIconVisible(value: string) {
            this._isDrugPropertyIconVisible = value;
           //NotifyPropertyChanged("IsDrugPropertyIconVisible");
        }
        FormularyNote: ObservableCollection<DrugProperty>;
        private _SourceDataProviderType: string;
        public get SourceDataProviderType(): string {
            return this._SourceDataProviderType;
        }
        public set SourceDataProviderType(value: string) {
            this._SourceDataProviderType = value;
        }
        private _IsIndicationRequired: string;
        public get IsIndicationRequired(): string {
            return this._IsIndicationRequired;
        }
        public set IsIndicationRequired(value: string) {
            this._IsIndicationRequired = value;
        }
        private _FormularyOID: number = 0;
        public get FormularyOID(): number {
            return this._FormularyOID;
        }
        public set FormularyOID(value: number) {
            this._FormularyOID = value;
        }
        private _IsAuthorise: boolean = false;
        public get IsAuthorise(): boolean {
            return this._IsAuthorise;
        }
        public set IsAuthorise(value: boolean) {
            this._IsAuthorise = value;
        }
        public SetDrugPropertyTooltip(forNoteCollection: ObservableCollection<DrugProperty>, dicProductTypefrmPO: Dictionary<string, string>, itemsubtype: string): string {
            this.FormularyNote = forNoteCollection;
            let builder: StringBuilder = new StringBuilder();
            let drugProperties: string = String.Empty;
            let data: string = String.Empty;
            let ocproduct: string = String.Empty;
            let dicElemCount: number = dicProductTypefrmPO.Count();
            if (this.FormularyNote != null) {
                for (let fkey: number = 0; fkey < this.FormularyNote.Count; fkey++) {
                    if (this.FormularyNote[fkey] != null) {
                        if (this.FormularyNote[fkey] != null && ((String.Compare(this.FormularyNote[fkey].DrugName, "CATALOGUEITEM") == 0 || String.Equals(this.FormularyNote[fkey].DrugName, CConstants.ACTUALMOIETY, StringComparison.InvariantCultureIgnoreCase)) && !String.IsNullOrEmpty(this.FormularyNote[fkey].DrugPropertyCode) && !String.IsNullOrEmpty(this.FormularyNote[fkey].VMChildCode) && String.Compare(this.FormularyNote[fkey].VMChildCode, "CC_OCCRALLCHILD", StringComparison.CurrentCulture) == 0)) {
                            if (!this.FormularyNote[fkey].DrugPropertyCode.StartsWith("###")) {
                                if (dicProductTypefrmPO.ContainsKey(this.FormularyNote[fkey].DrugPropertyCode)) {
                                    if (builder.Length > 0) {
                                        builder.Append(", ");
                                    }
                                    else {
                                        builder.Append(" ");
                                    }
                                    builder.Append(dicProductTypefrmPO[this.FormularyNote[fkey].DrugPropertyCode]);
                                }
                            }
                            else {
                                data = this.FormularyNote[fkey].DrugPropertyCode.Replace("###", "Formulary note");
                            }
                        }
                        else if (this.FormularyNote[fkey] != null && (String.Compare(this.FormularyNote[fkey].DrugName, "CATALOGUEITEM") != 0 && String.Compare(this.FormularyNote[fkey].DrugName, CConstants.ACTUALMOIETY) != 0 && !String.IsNullOrEmpty(this.FormularyNote[fkey].DrugPropertyCode))) {
                            if (!this.FormularyNote[fkey].DrugPropertyCode.StartsWith("###")) {
                                if (dicProductTypefrmPO.ContainsKey(this.FormularyNote[fkey].DrugPropertyCode)) {
                                    if (builder.Length > 0) {
                                        builder.Append(", ");
                                    }
                                    else {
                                        builder.Append(" ");
                                    }
                                    builder.Append(dicProductTypefrmPO[this.FormularyNote[fkey].DrugPropertyCode]);
                                }
                            }
                            else {
                                data = this.FormularyNote[fkey].DrugPropertyCode.Replace("###", "Formulary note");
                            }
                            if (!this.FormularyNote[fkey].DrugPropertyCode.StartsWith("###") && String.Compare(this.FormularyNote[fkey].DrugPropertyCode, "CC_HIGHRISK") == 0 && !String.IsNullOrEmpty(this.FormularyNote[fkey].HighRiskMsg)) {
                                builder.Append(" - ");
                                builder.Append(this.FormularyNote[fkey].HighRiskMsg);
                            }
                        }
                        if (!this.FormularyNote[fkey].DrugPropertyCode.StartsWith("###") && String.Compare(this.FormularyNote[fkey].DrugPropertyCode, "CC_HIGHRISK") == 0 && !String.IsNullOrEmpty(this.FormularyNote[fkey].HighRiskMsg) && !String.IsNullOrEmpty(this.FormularyNote[fkey].VMChildCode) && String.Compare(this.FormularyNote[fkey].VMChildCode, "CC_OCCRALLCHILD", StringComparison.CurrentCulture) == 0) {
                            builder.Append(" - ");
                            builder.Append(this.FormularyNote[fkey].HighRiskMsg);
                        }
                        if (!this.FormularyNote[fkey].DrugPropertyCode.StartsWith("###") && this.FormularyNote[fkey] != null && !String.IsNullOrEmpty(this.FormularyNote[fkey].VMChildCode) && String.Compare(this.FormularyNote[fkey].VMChildCode, "CC_OCCRALLCHILD", StringComparison.CurrentCulture) == 0 && !String.IsNullOrEmpty(this.FormularyNote[fkey].DrugName) && (String.Compare(this.FormularyNote[fkey].DrugName, "CATALOGUEITEM", StringComparison.CurrentCulture) == 0 || String.Compare(this.FormularyNote[fkey].DrugName, CConstants.ACTUALMOIETY, StringComparison.CurrentCulture) == 0) && (String.Compare(itemsubtype, CConstants.SUBTYPE, StringComparison.OrdinalIgnoreCase) != 0)) {
                            builder.Append(" - ");
                            ocproduct = "All products";
                            builder.Append(ocproduct);
                        }
                    }
                }
                drugProperties = builder.ToString();
                if (drugProperties.length > 0) {
                    if (!String.IsNullOrEmpty(data)) {
                        this.DrugPropertyNotes = data + "\r\nProperties - " + drugProperties;
                    }
                    else {
                        this.DrugPropertyNotes = "Properties - " + drugProperties;
                    }
                }
                else {
                    this.DrugPropertyNotes = data;
                }
            }
            return this.DrugPropertyNotes;
        }
    }