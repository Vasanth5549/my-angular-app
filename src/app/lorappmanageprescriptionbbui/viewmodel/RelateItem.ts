import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, ObservableCollection } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from '../../shared/epma-platform/soap-client/helper.service';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { Dictionary } from 'src/app/shared/epma-platform/index.dictionary';
import { MulticomponentVM } from './MulticomponentVM';
import { DrugProperty } from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { CConstants } from '../utilities/constants';
import { GPConnectItemVM } from './GPConnectItemVM';
  
    export class RelateItem extends ViewModelBase {
        private _formularyNotes: string;
        private _drugPropertyNotes: string;
        private _prescribingNote: string;
        private dicProductType: Dictionary<string, string>;
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
        public get PrescribingNote(): string {
            return this._prescribingNote;
        }
        public set PrescribingNote(value: string) {
            this._prescribingNote = value;
           //NotifyPropertyChanged("PrescribingNote");
        }
        public IdentifyingName: string;
        public PrescribeItemListOID: string;
        public IdentifyingType: string;
        public DrugProperties: string;
        public IsFormulary: string;
        public ItemSubType: string;
        public IdentifyingOID: string;
        public Message: string;
        public DrugProperyCode: string;
        public DrugProperyHdn: string;
        public HighRiskMsg: string;
        public IsAccessConstraint: string;
        public IsByBrand: string;
        public LorenzoID: string;
        public ItemType: string;
        public MCItemdisplay: string;
        private _isIconVisible: string = "Collapsed";
        private _isDrugPropertyIconVisible: string = "Collapsed";
        private multicomponentdetails: MulticomponentVM;
        public IsIndicationRequired: string;
        public SourceDataProviderType: string;
        public FormularyOID: number = 0;
        public IsAuthorise: boolean = false;
        public get MulticomponentDetails(): MulticomponentVM {
            return this.multicomponentdetails;
        }
        public set MulticomponentDetails(value: MulticomponentVM) {
            if (this.multicomponentdetails != value) {
                this.multicomponentdetails = value;
               //NotifyPropertyChanged("MulticomponentDetails");
            }
        }
        public get IsIconVisible(): string {
            return this._isIconVisible;
        }
        public set IsIconVisible(value: string) {
            this._isIconVisible = value;
           //NotifyPropertyChanged("IsIconVisible");
        }
        public get IsDrugPropertyIconVisible(): string {
            return this._isDrugPropertyIconVisible;
        }
        public set IsDrugPropertyIconVisible(value: string) {
            this._isDrugPropertyIconVisible = value;
           //NotifyPropertyChanged("IsDrugPropertyIconVisible");
        }
        FormularyNote: ObservableCollection<DrugProperty>;
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
                        if (this.FormularyNote[fkey] != null && ((String.Compare(this.FormularyNote[fkey].DrugName, "CATALOGUEITEM") == 0 || String.Compare(this.FormularyNote[fkey].DrugName, CConstants.ACTUALMOIETY) == 0) && !String.IsNullOrEmpty(this.FormularyNote[fkey].DrugPropertyCode) && !String.IsNullOrEmpty(this.FormularyNote[fkey].VMChildCode) && String.Compare(this.FormularyNote[fkey].VMChildCode, "CC_OCCRALLCHILD", StringComparison.CurrentCulture) == 0)) {
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
        public GpConnectMedicationItem: GPConnectItemVM;
    }