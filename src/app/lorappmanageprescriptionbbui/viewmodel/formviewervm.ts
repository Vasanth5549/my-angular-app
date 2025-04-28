import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, MessageBox,} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, ChildWindow, CListItem, CValuesetTerm, List, IEnumerable  } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from '../../shared/epma-platform/soap-client/helper.service';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { BasicDetailsVM } from './BasicDetailsVM';
import { TechValidateVM } from './TechValidateVM';
import { TechvalidateCAVM } from './TechvalidateCAVM';
import { SupplyDispensingInstructionsVM } from './SupplyDispensingInstructionsVM';
import { medTechvalProdOptVM } from './medTechvalProdOptVM';
import { MulticomponentVM } from './MulticomponentVM';
import { CustomTechValidatedItem } from './customtechvalidateditem';
import { CReqMsgGetProblem, CReqMsgGetProcessingOptionIndications, CResMsgGetFormViewControls, DrugItemBasicData, GetProcessingOptionIndicationsCompletedEventArgs, ManagePrescriptionWSSoapClient } from '../../shared/epma-platform/soap-client/ManagePrescriptionWS';
import * as MedicationMgmtSer from '../../shared/epma-platform/soap-client/MedicationMgmtWS'  
import * as ManagePrescSer from '../../shared/epma-platform/soap-client/ManagePrescriptionWS'
import { MultiSelectListVM } from '../viewmodel/MultiSelectListVM';
import { MultiSelectListView } from '../view/MultiSelectListView';
import { PresItemDRCVM } from './PresItemDRCVM';
import { ConflictsVM } from 'src/app/lorappmedicationcommonbb/viewmodel/conflictsvm';
import { PrescriptionItemVM } from './PrescriptionItemVM';
import { DomainValuesForTechValidate } from '../utilities/globalvariable';
import { CConstants, ValueDomain } from '../utilities/constants';
import { ConflictIcons } from '../model/common';
import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { PrescriptionTypes } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { Common } from '../utilities/common';
import { EventArgs } from 'src/app/shared/epma-platform/controls/Control';
import 'epma-platform/booleanextension';
import 'epma-platform/numberextension';
import 'epma-platform/stringextension';
import {iMath} from 'epma-platform/mathextension';
import 'epma-platform/arrayextension';
import { PropertyChangedEventArgs } from 'src/app/shared/epma-platform/controls/epma-tab/epma-tab.component';

    export class FormViewerVM extends ViewModelBase {
        private formOid: number = 0;
        private formName: string;
        private basicDetails: BasicDetailsVM;
        private techValidateDetails: TechValidateVM;
        private techvalidateCADetails: TechvalidateCAVM;
        private supplyinstructionVM: SupplyDispensingInstructionsVM;
        private techValidateDetailsCA: medTechvalProdOptVM;
        private conflictDetails: ObservableCollection<ConflictsVM>;
        private multicomponentdetails: MulticomponentVM;
        private dupmulticomponentDetails: MulticomponentVM;
        public objPrescriptionItemView: PrescriptionItemVM;
        /*[System.Xml.Serialization.XmlIgnoreAttribute]*/
        public objPrescriptionItemDetails: ManagePrescSer.PrescriptionItemDetails;
        private isClearTechValidate: boolean = false;
        private presItemDetailLzoID: string;
        private isFlgStpCheck: boolean=false;
        public frmViewTechValidatecmdUpdateThat;
        oMultiSelectListView: MultiSelectListView ; //Not Required for LHS. To be Re-Visited.
        oChildWindow: ChildWindow;
        PropertyChanged:Function;
        public get FormOID(): number {
            return this.formOid;
        }
        public set FormOID(value: number) {
            if (this.formOid != value) {
                this.formOid = value;
               //NotifyPropertyChanged("FormOID");
            }
        }
        public get FormName(): string {
            return this.formName;
        }
        public set FormName(value: string) {
            this.formName = value;
            if (this.formName == "Default") {
                this.BHasFormViewParams = false;
            }
            else {
                this.BHasFormViewParams = true;
            }
        }
        private _IsSteppedDoseDetailsModified: Boolean = false;
        public get IsSteppedDoseDetailsModified(): Boolean {
            return this._IsSteppedDoseDetailsModified;
        }
        public set IsSteppedDoseDetailsModified(value: Boolean) {
            this._IsSteppedDoseDetailsModified = value;
           //super.NotifyPropertyChanged("IsSteppedDoseDetailsModified");
        }
        private bHasFormViewParams: boolean = false;
        public get BHasFormViewParams(): boolean {
            return this.bHasFormViewParams;
        }
        public set BHasFormViewParams(value: boolean) {
            this.bHasFormViewParams = value;
        }
        private _basicControls: string[];
        public get BasicControls(): string[] {
            return this._basicControls;
        }
        public set BasicControls(value: string[]) {
            this._basicControls = value;
        }
        private _addtionalControls: string[];
        public get AdditionalControls(): string[] {
            return this._addtionalControls;
        }
        public set AdditionalControls(value: string[]) {
            this._addtionalControls = value;
        }
        private _mandatoryControls: boolean[];
        public get MandatoryControls(): boolean[] {
            return this._mandatoryControls;
        }
        public set MandatoryControls(value: boolean[]) {
            this._mandatoryControls = value;
        }
        public get BasicDetails(): BasicDetailsVM {
            return this.basicDetails;
        }
        public set BasicDetails(value: BasicDetailsVM) {
            if (this.basicDetails != value) {
                this.basicDetails = value;
               //NotifyPropertyChanged("BasicDetails");
               //Revisit Required
            //    let e:PropertyChangedEventArgs = {PropertyName:"BasicDetails"};
            //    value.PropertyChanged({}, e);
            }
        }
        public get TechValidateDetails(): TechValidateVM {
            return this.techValidateDetails;
        }
        public set TechValidateDetails(value: TechValidateVM) {
            if (this.techValidateDetails != value) {
                this.techValidateDetails = value;
               //NotifyPropertyChanged("TechValidateDetails");
            }
        }
        public get TechValidateDetailsCA(): medTechvalProdOptVM {
            return this.techValidateDetailsCA;
        }
        public set TechValidateDetailsCA(value: medTechvalProdOptVM) {
            if (this.techValidateDetailsCA != value) {
                this.techValidateDetailsCA = value;
               //NotifyPropertyChanged("TechValidateDetailsCA");
            }
        }
        public get TechvalidateCADetails(): TechvalidateCAVM {
            return this.techvalidateCADetails;
        }
        public set TechvalidateCADetails(value: TechvalidateCAVM) {
            if (this.techvalidateCADetails != value) {
                this.techvalidateCADetails = value;
               //NotifyPropertyChanged("TechvalidateCADetails");
            }
        }
        public get SupplyInstructionVM(): SupplyDispensingInstructionsVM {
            return this.supplyinstructionVM;
        }
        public set SupplyInstructionVM(value: SupplyDispensingInstructionsVM) {
            if (this.supplyinstructionVM != value) {
                this.supplyinstructionVM = value;
               //NotifyPropertyChanged("SupplyInstructionVM");
            }
        }
        private _propFVMTechPresItem: ObservableCollection<CustomTechValidatedItem>;
        public get TechValidatedFVMItems(): ObservableCollection<CustomTechValidatedItem> {
            return this._propFVMTechPresItem;
        }
        public set TechValidatedFVMItems(value: ObservableCollection<CustomTechValidatedItem>) {
            if (this._propFVMTechPresItem != value) {
                this._propFVMTechPresItem = value;
               //NotifyPropertyChanged("TechValidatedFVMItems");
            }
        }
        public get MulticomponentDetails(): MulticomponentVM {
            return this.multicomponentdetails;
        }
        public set MulticomponentDetails(value: MulticomponentVM) {
            if (this.multicomponentdetails != value) {
                this.multicomponentdetails = value;
               //NotifyPropertyChanged("MulticomponentDetails");
            }
        }
        public get dupMulticomponentDetails(): MulticomponentVM {
            return this.dupmulticomponentDetails;
        }
        public set dupMulticomponentDetails(value: MulticomponentVM) {
            if (this.dupmulticomponentDetails != value) {
                this.dupmulticomponentDetails = value;
               //NotifyPropertyChanged("dupMulticomponentDetails");
            }
        }
        private _PresItemDRCVM: PresItemDRCVM;
        public get PresItemDRCVM(): PresItemDRCVM {
            return this._PresItemDRCVM;
        }
        public set PresItemDRCVM(value: PresItemDRCVM) {
            if (this._PresItemDRCVM != value) {
                this._PresItemDRCVM = value;
               //NotifyPropertyChanged("PresItemDRCVM");
            }
        }
        public get ConflictDetails(): ObservableCollection<ConflictsVM> {
            return this.conflictDetails;
        }
        public set ConflictDetails(value: ObservableCollection<ConflictsVM>) {
            if (this.conflictDetails != value) {
                this.conflictDetails = value;
                let e:PropertyChangedEventArgs = { PropertyName: 'ConflictDetails'};
                if (this.PropertyChanged)
                  this.PropertyChanged({},e);
            //    this.NotifyPropertyChanged("ConflictDetails");
            }
        }
        /*[System.Xml.Serialization.XmlIgnoreAttribute]*/
        public ConflictsReason: ObservableCollection<CListItem>;
        /*[System.Xml.Serialization.XmlIgnoreAttribute]*/
        public AuthoriseReason: ObservableCollection<CListItem>;
        /*[System.Xml.Serialization.XmlIgnoreAttribute]*/
        public ClinicalVerifyReason: ObservableCollection<CListItem>;
        public InfusionType: ObservableCollection<CListItem>;
        public get IsClearTechValidate(): boolean {
            return this.isClearTechValidate;
        }
        public set IsClearTechValidate(value: boolean) {
            if (this.isClearTechValidate != value) {
                this.isClearTechValidate = value;
               //NotifyPropertyChanged("IsClearTechValidate");
            }
        }
        public get IsFlgStpCheck(): boolean {
            return this.isFlgStpCheck;
        }
        public set IsFlgStpCheck(value: boolean) {
            if (this.isFlgStpCheck != value) {
                this.isFlgStpCheck = value;
               
            }
        }
        private Steppedpopup: boolean = false;
        public get SteppedPopup(): boolean {
            return this.Steppedpopup;
        }
        public set SteppedPopup(value: boolean) {
            this.Steppedpopup = value;
        }
        private popup: boolean = false;
        public get Popup(): boolean {
            return this.popup;
        }
        public set Popup(value: boolean) {
            this.popup = value;
        }
        private _freqAmendment: boolean = false;
        public get FreqAmendment(): boolean {
            return this._freqAmendment;
        }
        public set FreqAmendment(value: boolean) {
            this._freqAmendment = value;
        }
        private nextadmintime: boolean = false;
        public get Nextadmintime(): boolean {
            return this.nextadmintime;
        }
        public set Nextadmintime(value: boolean) {
            this.nextadmintime = value;
        }
        public get PresItemDetailLzoID(): string {
            return this.presItemDetailLzoID;
        }
        public set PresItemDetailLzoID(value: string) {
            if (this.presItemDetailLzoID != value) {
                this.presItemDetailLzoID = value;
               //NotifyPropertyChanged("PresItemDetailLzoID");
            }
        }
        public LoadProblemsIndication(mcversionno: string, identifyoid: number, identifyingtype: string): void {
            let objService: ManagePrescriptionWSSoapClient = new ManagePrescriptionWSSoapClient();
            objService.GetProcessingOptionIndicationsCompleted  = (s,e) => { this.objService_GetProcessingOptionIndicationsCompleted(s,e); } ;
            let objPrbRequest: CReqMsgGetProblem = new CReqMsgGetProblem();
            let objIndRequest: CReqMsgGetProcessingOptionIndications = new CReqMsgGetProcessingOptionIndications();
            objIndRequest.oDrugItemBasicDataBC = new DrugItemBasicData();
            objIndRequest.oDrugItemBasicDataBC.IdentifyingOID = identifyoid;
            objIndRequest.oDrugItemBasicDataBC.IdentifyingType = identifyingtype;
            objIndRequest.oDrugItemBasicDataBC.MCVersionNo = mcversionno;
            objService.GetProcessingOptionIndicationsAsync(objIndRequest);
        }
        objService_GetProcessingOptionIndicationsCompleted(sender: Object, e: GetProcessingOptionIndicationsCompletedEventArgs): void {
            MessageBox.Show(e.Error.ToString());
        }
        private LoadStationaryCombo(): void {
            let objService: MedicationMgmtSer.MedicationMgmtWSSoapClient = new MedicationMgmtSer.MedicationMgmtWSSoapClient();
            objService.GetStationaryItemCompleted  = (s,e) => { this.objService_GetStationaryItemCompleted(s,e); } ;
            let ObjReq: MedicationMgmtSer.CReqMsgGetStationaryItem = new MedicationMgmtSer.CReqMsgGetStationaryItem();
            ObjReq.oContextInformation = Common.FillContext();
            objService.GetStationaryItemAsync(ObjReq);
        }
        objService_GetStationaryItemCompleted(sender: Object, e: MedicationMgmtSer.GetStationaryItemCompletedEventArgs): void {
            let objRes: MedicationMgmtSer.CResMsgGetStationaryItem = e.Result;
            this.BasicDetails.DefaultDetails.Stationarys = new ObservableCollection<CListItem>();
            if (objRes.objStationaryItem != null) {
                objRes.objStationaryItem.forEach( (s)=> {
                    this.BasicDetails.DefaultDetails.Stationarys.Add(ObjectHelper.CreateObject(new CListItem(), { DisplayText: s.StationaryName, Value: s.StationaryOID.ToString(), Tag: s.StationaryCode }));
                });
            }
        }
        
        public ShowDispensingInstructionWindow(): void {
            this.ShowMultiSelectWindow(ValueDomain.DispensingInstruction);
        }
        public ShowMultiSelectWindow(ValueDomainCode: string): void {
            let strTitle: string = String.Empty;
            this.oMultiSelectListView =new MultiSelectListView();
            if (String.Compare(ValueDomainCode, ValueDomain.DispensingInstruction) == 0) {
              
                this.oMultiSelectListView.constructorImpl(ValueDomain.DispensingInstruction, this.BasicDetails.DispensingInstruction.ToList());
                let oMultiSelectVM: MultiSelectListVM = ObjectHelper.CreateType<MultiSelectListVM>(this.oMultiSelectListView.DataContext, MultiSelectListVM);
                if (oMultiSelectVM instanceof MultiSelectListVM)
                    oMultiSelectVM.OtherInstructions = this.BasicDetails.OtherDispensingInstruction;
                strTitle = "Dispensing instructions - LORENZO";
            }
            else if (String.Compare(ValueDomainCode, ValueDomain.InstallIns) == 0) {
                let  oSelectedItem: List;
                if(this.BasicDetails.InstalmentInstructions !=null && this.BasicDetails.InstalmentInstructions.Count > 0){
                     oSelectedItem = this.BasicDetails.InstalmentInstructions.ToList(); 
               }
               this.oMultiSelectListView.constructorImpl(ValueDomain.InstallIns, oSelectedItem);
               strTitle = "Instalment instructions - LORENZO";
            }
            else if (String.Compare(ValueDomainCode, ValueDomain.EndorsementProperties) == 0) {
                this.oMultiSelectListView.constructorImpl(ValueDomain.EndorsementProperties, this.BasicDetails.EndorsementProperties.ToList());
                strTitle = "Endorsement properties - LORENZO";
            }
            if (this.oMultiSelectListView != null) {
                let oMultiSelectListViewCallback = (s,e) =>{
                    if (s != null)
                    {
                        this.oMultiSelectListView = s;
                    }
                }
                AppActivity.OpenWindow(strTitle, this.oMultiSelectListView, (s,e)=>{this.oMultiSelectListView_Closed(s);}, "", false, 477, 455, false, WindowButtonType.OkCancel, null, null, null, oMultiSelectListViewCallback);
            }
        }
        private oMultiSelectListView_Closed(args: AppDialogEventargs): void {
            this.oChildWindow = args.AppChildWindow;
            if (args.Result == AppDialogResult.Ok && args.Content != null) {
                //this.oMultiSelectListView = ObjectHelper.CreateType<MultiSelectListView>(args.Content.Component, MultiSelectListView);
                if (this.oMultiSelectListView.okButtonClick()) {
                    if (this.oMultiSelectListView instanceof MultiSelectListView) {
                        let oMultiSelectVM: MultiSelectListVM = ObjectHelper.CreateType<MultiSelectListVM>(this.oMultiSelectListView.DataContext, MultiSelectListVM);
                        if (oMultiSelectVM instanceof MultiSelectListVM) {
                            if (String.Compare(oMultiSelectVM.ValueDomainCode, ValueDomain.DispensingInstruction) == 0) {
                                DomainValuesForTechValidate.SelecteddispInstruction = new ObservableCollection<CValuesetTerm>();
                                this.BasicDetails.SelecteddispInstruction = new ObservableCollection<CListItem>();
                                let SeldispInstruction: ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
                                let TechSeldispInstruction: ObservableCollection<CValuesetTerm> = new ObservableCollection<CValuesetTerm>();
                                oMultiSelectVM.ValueDomainCollection.forEach( (oSelectedCListItem)=> {
                                    if (oSelectedCListItem.IsSelected) {
                                        if (!(SeldispInstruction.Where(x => x.Value == oSelectedCListItem.Value).Any()))
                                            SeldispInstruction.Add(oSelectedCListItem);
                                        if (!(TechSeldispInstruction.Where(x => x.csCode == oSelectedCListItem.Value).Any()))
                                            TechSeldispInstruction.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oSelectedCListItem.Value, csDescription: oSelectedCListItem.DisplayText }));
                                    }
                                });
                                this.BasicDetails.SelecteddispInstruction = SeldispInstruction;
                                DomainValuesForTechValidate.SelecteddispInstruction = TechSeldispInstruction;
                                this.BasicDetails.DispensingInstruction = oMultiSelectVM.ValueDomainCollection;
                                this.BasicDetails.OtherDispensingInstruction = oMultiSelectVM.OtherInstructions;
                            }
                            else if (String.Compare(oMultiSelectVM.ValueDomainCode, ValueDomain.InstallIns) == 0) {
                                this.BasicDetails.InstalmentInstructions = oMultiSelectVM.ValueDomainCollection;
                                this.BasicDetails.DynamicControlEndInstallLoaded.emit(true);
                            }
                            else if (String.Compare(oMultiSelectVM.ValueDomainCode, ValueDomain.EndorsementProperties) == 0) {
                                this.BasicDetails.EndorsementProperties = oMultiSelectVM.ValueDomainCollection;
                                this.BasicDetails.DynamicControlEndInstallLoaded.emit(true);
                            }
                        }
                    }
                }
            }
            else {
                this.oMultiSelectListView.CancelButtonClick();
            }
        }
        /*oMultiSelectList_Closed(sender: Object, e: EventArgs): void {
            let oMultiSelect: MultiSelectListWindow = ObjectHelper.CreateType<MultiSelectListWindow>(sender, MultiSelectListWindow);
        }*/
        
        private SetSelectedValues(oSelectedValues: List, sValueDomainCode: string): void {
            let strBuildText: StringBuilder = new StringBuilder();
            let strBuildValue: StringBuilder = new StringBuilder();
            if (this.BasicDetails == null)
                this.BasicDetails = new BasicDetailsVM(null);
            switch (sValueDomainCode) {
                case ValueDomain.DispensingInstruction:
                    this.BasicDetails.DispensingInstruction = new ObservableCollection<CListItem>();
                    oSelectedValues.forEach( (oItem)=> {
                        this.BasicDetails.DispensingInstruction.Add(oItem);
                    });
                    break;
            }
        }
        public FillFormViewerDetails(objResponse: CResMsgGetFormViewControls, isBasic: boolean): void {
            if (isBasic) {
                this.FormOID = objResponse.oFormViewControls.FormViewOID;
                this.FormName = objResponse.oFormViewControls.FormViewName;
                let lstControls: List<string> = new List<string>();
                let lstManControls: List<boolean> = new List<boolean>();
                if (String.Compare(this.BasicDetails.IdentifyingType, "NONCATALOGUEITEM", StringComparison.OrdinalIgnoreCase) == 0) {
                    lstControls.Add("CC_NONCATNAME");
                    lstManControls.Add(true);
                    lstControls.Add("CC_NONCATREASON");
                    lstManControls.Add(true);
                    lstControls.Add("CC_NONCATOTHREA");
                    lstManControls.Add(false);
                }
                lstControls.AddRange(objResponse.oFormViewControls.Columns);
                this.BasicControls = lstControls.ToArray();
                let mandateCtrls: IEnumerable<boolean> = objResponse.oFormViewControls.Mandatory.Select(sCtrl=>!String.IsNullOrEmpty(sCtrl) && sCtrl == "1");
                if (mandateCtrls != null)
                    lstManControls.AddRange(mandateCtrls);
                this.MandatoryControls = lstManControls.ToArray();
            }
            else {
                this.AdditionalControls = objResponse.oFormViewControls.Columns.ToArray();
            }
        }
        public AddOtherAdminInstruction(SelectedControls: string[], lstControls: List<string>, lstManControls: List<boolean>): void {
            if (SelectedControls != null && SelectedControls.Contains("CC_ADMININSTR") && !lstControls.Contains("CC_ADMININSTROTHERS") && String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration) != 0 && String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Inpatient) != 0) {
                lstControls.Add("CC_ADMININSTROTHERS");
                if (lstManControls != null && lstManControls.Count > 0) {
                    lstManControls.Add(false);
                }
            }
        }
        public AddPRNInstruction(SelectedControls: string[], lstControls: List<string>, lstManControls: List<boolean>): void {
            if (SelectedControls != null && SelectedControls.Contains("CC_DIRECTION") && !lstControls.Contains("CC_PRNINST")) {
                let nIndx: number = lstControls.IndexOf("CC_DIRECTION");
                lstControls.Insert(nIndx + 1, "CC_PRNINST");
                if (lstManControls != null && lstManControls.Count > nIndx) {
                    lstManControls.Insert(nIndx + 1, false);
                }
            }
        }
        public DisposeVMObjects(): void {
            //Not Required for LHS. To be Re-Visited.
            //this.oMultiSelectListView = null;
            this.oChildWindow = null;
        }
        public DoCleanUP(): void {
            this.DisposeVMObjects();
        }
        public ConflictsIconChangeBasedOnAcknlgmnt(TrafficSymbol: ConflictIcons): ConflictIcons {
            TrafficSymbol = ConflictIcons.None;
            let olist: List<string> = new List<string>();
            if (this.ConflictDetails != null && this.ConflictDetails.Count > 0) {
                this.ConflictDetails.forEach( (item)=> {
                    if (!item.IsFluidOrSequence && (String.Equals(item.PrescriberReason.DisplayText, CConstants.Selectreasonstar, StringComparison.InvariantCultureIgnoreCase) || (String.Equals(item.PrescriberReason.DisplayText, CConstants.Selectreason, StringComparison.InvariantCultureIgnoreCase) && String.Equals(item.IsMandatoryStarVisible, "Visible", StringComparison.InvariantCultureIgnoreCase)) || (String.Equals(item.PrescriberReason.DisplayText, CConstants.SelectReason, StringComparison.InvariantCultureIgnoreCase) && !item.AcknowledgeStatus))) {
                        if (olist != null && !olist.Contains(item.WarningBehaviourType)) {
                            olist.Add(item.WarningBehaviourType);
                        }
                    }
                });
                let isStarIconExist: boolean = olist.Contains(CConstants.Type1) || olist.Contains(CConstants.Type2) || olist.Contains(CConstants.Type3);
                let isAmberIconExist: boolean = olist.Contains(CConstants.Type4);
                let isQuestionMarkIconExist: boolean = olist.Contains(CConstants.Type5);
                if (isStarIconExist) {
                    TrafficSymbol = ConflictIcons.Red;
                }
                else if (isAmberIconExist) {
                    TrafficSymbol = ConflictIcons.Amber;
                }
                else if (isQuestionMarkIconExist) {
                    TrafficSymbol = ConflictIcons.Question;
                }
                else {
                    TrafficSymbol = ConflictIcons.MandatoryIndicator;
                }
            }
            return TrafficSymbol;
        }
    }