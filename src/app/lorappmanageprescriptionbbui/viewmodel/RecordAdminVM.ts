import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, CListItem, Visibility } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from '../../shared/epma-platform/soap-client/helper.service';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper as Helper, ObjectHelper } from 'epma-platform/helper';
import { ClonableViewModelBase } from 'src/app/lorappmedicationcommonbb/model/cloneviewmodel';
import { IViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { PrescriptionItemVM } from './PrescriptionItemVM';
import { CConstants } from '../utilities/constants';
import { AppContextInfo, AppSessionInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { DoseTypeCode, InfusionTypesCode } from '../utilities/constants';
import { ProfileData } from '../utilities/profiledata';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { MedChartData } from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import { CReqMsgGetAllOptions, CResMsgGetAllOptions, GetAllOptionsCompletedEventArgs, ManagePrescriptionWSSoapClient } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { Common } from '../utilities/common';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import { SelectedUserType } from 'src/app/lorappmedicationcommonbb/utilities/witnesshelper';
import { CReqMsgIsWitnessRequired, CResMsgIsWitnessRequired, IPPMAPrescribableDefnWSSoapClient, IsWitnessRequiredCompletedEventArgs, WitnessCriteria, ObjectInfo } from 'src/app/shared/epma-platform/soap-client/IPPMAPrescribableDefnWS';
  
    export class RecordAdminVM extends ClonableViewModelBase implements IViewModelBase {
        public oPrescriptionItemVM: PrescriptionItemVM;
        private route: ObservableCollection<CListItem>;
        private _Dose: string;
        private _DoseUoM: ObservableCollection<CListItem>;
        private _SelectedDoseUoM: CListItem;
        private sites: ObservableCollection<CListItem>;
        private _site: CListItem;
        private _BatchNo: string;
        private _ExpiryDate: DateTime = DateTime.MinValue;
        private _AdministeredDate: DateTime = DateTime.MinValue;
        private _AdministeredTime: DateTime = DateTime.MinValue;
        public SlotScheduleTime: DateTime = DateTime.MinValue;
        private _AdminComments: string;
        private _route: CListItem;
        private _bIsloaded: boolean = false;
        //public delegate void WitnessUserSelectedDlgt(SelectedUserType _SelectedUserType);
        public OnWitnessUserSelected: Function;
        //public delegate void GetWitnessRequiredDlgt();
        public GetWitnessRequiredEvent: Function;
        public IsRouteChanged: boolean = false;
        public bAutRecSuccess: boolean = false;
        public MoreOptionKey: string = String.Empty;
        public TabVisited : boolean = false;
        public DynamicFormRecAdminTabVisited : boolean = false;
        public get Route(): CListItem {
            return this._route;
        }
        public set Route(value: CListItem) {
            if (!Helper.ReferenceEquals(this._route, value)) {
                this._route = value;
                if (value != null) {
                    this.IsRouteChanged = true;
                    if (this.IsLoaded)
                        this.GetWitnessRequired();
                }
               //NotifyPropertyChanged("Route");
            }
            else {
                this.IsRouteChanged = false;
            }
        }
        public get Dose(): string {
            return this._Dose;
        }
        public set Dose(value: string) {
            if (!Helper.ReferenceEquals(this._Dose, value)) {
                this._Dose = value;
               //NotifyPropertyChanged("Dose");
            }
        }
        private _InfusionType: CListItem;
        public get InfusionType(): CListItem {
            return this._InfusionType;
        }
        public set InfusionType(value: CListItem) {
            if (!Helper.ReferenceEquals(this._InfusionType, value)) {
                this._InfusionType = value;
               //NotifyPropertyChanged("InfusionType");
            }
        }
        public get DoseUoM(): ObservableCollection<CListItem> {
            return this._DoseUoM;
        }
        public set DoseUoM(value: ObservableCollection<CListItem>) {
            if (this._DoseUoM != value) {
                this._DoseUoM = value;
               //super.NotifyPropertyChanged("DoseUoM");
            }
        }
        private _DoseUOMValue: string = String.Empty;
        public get DoseUOMValue(): string {
            return this._DoseUOMValue;
        }
        public set DoseUOMValue(value: string) {
            if (!Helper.ReferenceEquals(this._DoseUOMValue, value)) {
                this._DoseUOMValue = value;
               //NotifyPropertyChanged("DoseUOMValue");
            }
        }
        private _isBolusIntermittent: boolean = false;
        public get isBolusIntermittent(): boolean {
            return this._isBolusIntermittent;
        }
        public set isBolusIntermittent(value: boolean) {
            this._isBolusIntermittent = value;
           //NotifyPropertyChanged("isBolusIntermittent");
        }
        public get SelectedDoseUoM(): CListItem {
            return this._SelectedDoseUoM;
        }
        public set SelectedDoseUoM(value: CListItem) {
            if (value != null && value.Value == CConstants.CONST_MORE) {
                if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.FormViewerDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails != null) {
                    this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.MoreOptionCode = CConstants.RecordadminDoseUOMOptionCode;
                    this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.GetMoreComboOption();
                }
            }
            else {
                this._SelectedDoseUoM = value;
               //NotifyPropertyChanged("SelectedDoseUoM");
            }
        }
        private _DoseMandatory: boolean = false;
        public get DoseMandatory(): boolean {
            return this._DoseMandatory;
        }
        public set DoseMandatory(value: boolean) {
            if (this._DoseMandatory != value) {
                this._DoseMandatory = value;
               //super.NotifyPropertyChanged("DoseMandatory");
            }
        }
        private _DoseUOMMandatory: boolean = false;
        public get DoseUOMMandatory(): boolean {
            return this._DoseUOMMandatory;
        }
        public set DoseUOMMandatory(value: boolean) {
            if (this._DoseUOMMandatory != value) {
                this._DoseUOMMandatory = value;
               //super.NotifyPropertyChanged("DoseUOMMandatory");
            }
        }
        private _RouteMandatory: boolean = false;
        public get RouteMandatory(): boolean {
            return this._RouteMandatory;
        }
        public set RouteMandatory(value: boolean) {
            if (this._RouteMandatory != value) {
                this._RouteMandatory = value;
               //super.NotifyPropertyChanged("RouteMandatory");
            }
        }
        private _IsDoseEnable: boolean = false;
        public get IsDoseEnable(): boolean {
            return this._IsDoseEnable;
        }
        public set IsDoseEnable(value: boolean) {
            if (this._IsDoseEnable != value) {
                this._IsDoseEnable = value;
               //super.NotifyPropertyChanged("IsDoseEnable");
            }
        }
        private _IsDoseValueEnable: boolean = false;
        public get IsDoseValueEnable(): boolean {
            return this._IsDoseValueEnable;
        }
        public set IsDoseValueEnable(value: boolean) {
            if (this._IsDoseValueEnable != value) {
                this._IsDoseValueEnable = value;
               //super.NotifyPropertyChanged("IsDoseValueEnable");
            }
        }
        private _IsDoseUOMEnable: boolean = false;
        public get IsDoseUOMEnable(): boolean {
            return this._IsDoseUOMEnable;
        }
        public set IsDoseUOMEnable(value: boolean) {
            if (this._IsDoseUOMEnable != value) {
                this._IsDoseUOMEnable = value;
               //super.NotifyPropertyChanged("IsDoseUOMEnable");
            }
        }
        private _IsDoseUOMValueEnable: boolean = false;
        public get IsDoseUOMValueEnable(): boolean {
            return this._IsDoseUOMValueEnable;
        }
        public set IsDoseUOMValueEnable(value: boolean) {
            if (this._IsDoseUOMValueEnable != value) {
                this._IsDoseUOMValueEnable = value;
               //super.NotifyPropertyChanged("IsDoseUOMValueEnable");
            }
        }
        public get Sites(): ObservableCollection<CListItem> {
            return this.sites;
        }
        public set Sites(value: ObservableCollection<CListItem>) {
            if (this.sites != value) {
                this.sites = value;
               //super.NotifyPropertyChanged("Sites");
            }
        }
        public get Site(): CListItem {
            return this._site;
        }
        public set Site(value: CListItem) {
            if (value != null) {
                if (value.Value == CConstants.CONST_MORE) {
                    //value.DisplayText = '';
                    //value.Value = '';
                    this._site = null;
                    if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.FormViewerDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails != null) {
                        this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.MoreOptionCode = CConstants.RecordAdminSiteOptionCode;
                        this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.GetMoreComboOption();
                    }
                }
                else {
                    this._site = value;
                   //super.NotifyPropertyChanged("Site");
                }
            }
        }
        public get BatchNo(): string {
            return this._BatchNo;
        }
        public set BatchNo(value: string) {
            if (!Helper.ReferenceEquals(this._BatchNo, value)) {
                this._BatchNo = value;
               //NotifyPropertyChanged("BatchNo");
            }
        }
        private _BatchNoMandatory: boolean = false;
        public get BatchNoMandatory(): boolean {
            return this._BatchNoMandatory;
        }
        public set BatchNoMandatory(value: boolean) {
            if (this._BatchNoMandatory != value) {
                this._BatchNoMandatory = value;
               //super.NotifyPropertyChanged("BatchNoMandatory");
            }
        }
        public get ExpiryDate(): DateTime{
            return this._ExpiryDate;
        }
        public set ExpiryDate(value: DateTime) {
            if (!Helper.ReferenceEquals(this._ExpiryDate, value)) {
                this._ExpiryDate = value;
               //NotifyPropertyChanged("ExpiryDate");
            }
        }
        private _ExpiryDateMandatory: boolean = false;
        public get ExpiryDateMandatory(): boolean {
            return this._ExpiryDateMandatory;
        }
        public set ExpiryDateMandatory(value: boolean) {
            if (this._ExpiryDateMandatory != value) {
                this._ExpiryDateMandatory = value;
               //super.NotifyPropertyChanged("ExpiryDateMandatory");
            }
        }
        public get AdministeredDate(): DateTime{
            return this._AdministeredDate;
        }
        public set AdministeredDate(value: DateTime) {
            if (!Helper.ReferenceEquals(this._AdministeredDate, value)) {
                this._AdministeredDate = value;
                if(this.AdministeredTime)
                {
                    this.AdministeredTime = (this._AdministeredDate.Date != DateTime.MinValue ? this._AdministeredDate.DateTime.AddTime(this._AdministeredTime) : DateTime.MinValue);
                }
               //NotifyPropertyChanged("AdministeredDate");
            }
        }
        public get AdministeredTime(): DateTime{
            return this._AdministeredTime;
        }
        public set AdministeredTime(value: DateTime) {
            if (!Helper.ReferenceEquals(this._AdministeredTime, value)) {
                this._AdministeredTime = (this._AdministeredDate.Date != DateTime.MinValue ? this._AdministeredDate.DateTime.AddTime(value) : DateTime.MinValue);
               //NotifyPropertyChanged("AdministeredTime");
            }
        }
        public get AdminComments(): string {
            return this._AdminComments;
        }
        public set AdminComments(value: string) {
            if (!Helper.ReferenceEquals(this._AdminComments, value)) {
                this._AdminComments = value;
               //NotifyPropertyChanged("AdminComments");
            }
        }
        public get IsLoaded(): boolean {
            return this._bIsloaded;
        }
        public set IsLoaded(value: boolean) {
            this._bIsloaded = value;
            this.SetRecordAdmin();
        }
        public get Routes(): ObservableCollection<CListItem> {
            return this.route;
        }
        public set Routes(value: ObservableCollection<CListItem>) {
            this.route = value;
           //super.NotifyPropertyChanged("Routes");
        }
        public SetRecordAdmin(): void {
            if (this.oPrescriptionItemVM != null && ((!String.IsNullOrEmpty(this.oPrescriptionItemVM.ItemMainType) && (String.Compare(this.oPrescriptionItemVM.ItemMainType, CConstants.Formulary_Drug, StringComparison.CurrentCultureIgnoreCase) == 0 || (PatientContext.IsINFUSIONON && String.Equals(this.oPrescriptionItemVM.ItemMainType, CConstants.Formulary_Appliance, StringComparison.OrdinalIgnoreCase) && !String.IsNullOrEmpty(this.oPrescriptionItemVM.ItemSubType) && String.Equals(this.oPrescriptionItemVM.ItemSubType, CConstants.SUBTYPE_GAS, StringComparison.OrdinalIgnoreCase)))) || (this.oPrescriptionItemVM.FormViewerDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails != null && !String.IsNullOrEmpty(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingType) && (String.Equals(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.NONCATALOGUEITEM, StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.Precatalog, StringComparison.CurrentCultureIgnoreCase)))))
                this.RouteMandatory = true;
            else this.RouteMandatory = false;
            if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.FormViewerDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails != null && (this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminMethod == null && (this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IsAdminMethodVisible == Visibility.Collapsed || (this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.DoseType != null && String.Equals(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.DoseType.Value, DoseTypeCode.CONDITIONAL, StringComparison.CurrentCultureIgnoreCase)))) && ((!String.IsNullOrEmpty(this.oPrescriptionItemVM.ItemMainType) && String.Compare(this.oPrescriptionItemVM.ItemMainType, CConstants.Formulary_Drug, StringComparison.CurrentCultureIgnoreCase) == 0) || (String.Compare(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.NONCATALOGUEITEM) == 0 || String.Compare(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.Precatalog) == 0))) {
                this.IsDoseEnable = true;
                this.IsDoseUOMEnable = true;
                this.IsDoseValueEnable = true;
                this.IsDoseUOMValueEnable = true;
                if (this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.Route != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.Route.Tag != null && String.Compare(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.Route.Tag.ToString(), "1") == 0 && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionType != null && !String.IsNullOrEmpty(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionType.Value) && (String.Compare(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.CONTINUOUS) == 0 || String.Compare(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.SINGLEDOSEVOLUME) == 0 || String.Compare(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.FLUID) == 0)) {
                    this.DoseMandatory = false;
                    this.DoseUOMMandatory = false;
                    if (String.IsNullOrEmpty(this.Dose)) {
                        this.IsDoseEnable = false;
                        this.IsDoseValueEnable = false;
                    }
                    else {
                        this.IsDoseEnable = true;
                        this.IsDoseValueEnable = true;
                        if (this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.InfRateNumeratorUom != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.InfRateNumeratorUom.Tag != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.VolumeUOMList != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.VolumeUOMList.Count > 0) {
                            let checkVolumebasedIfusedUom = this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.VolumeUOMList.Where(c => c.Tag != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.InfRateNumeratorUom.Tag.ToString().Contains(c.Tag.ToString())).Select(s => s).ToList();
                            if (checkVolumebasedIfusedUom.Count > 0) {
                                this.IsDoseEnable = false;
                                this.IsDoseValueEnable = false;
                            }
                        }
                    }
                }
                else {
                    if (this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionType != null && !String.IsNullOrEmpty(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionType.Value) && (String.Compare(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.PCA) != 0)) {
                        this.DoseMandatory = true;
                        this.DoseUOMMandatory = true;
                    }
                }
            }
            else {
                this.DoseMandatory = false;
                this.DoseUOMMandatory = false;
                this.IsDoseEnable = false;
                this.IsDoseUOMEnable = false;
                this.IsDoseValueEnable = false;
                this.IsDoseUOMValueEnable = false;
            }
        }
        public _WitnessByList: ObservableCollection<CListItem>;
        public get WitnessByList(): ObservableCollection<CListItem> {
            return this._WitnessByList;
        }
        public set WitnessByList(value: ObservableCollection<CListItem>) {
            if (!Helper.ReferenceEquals(this._WitnessByList, value)) {
                this._WitnessByList = value;
               //NotifyPropertyChanged("WitnessByList");
            }
        }
        private _WitnessMandatory: boolean = false;
        public get WitnessMandatory(): boolean {
            return this._WitnessMandatory;
        }
        public set WitnessMandatory(value: boolean) {
            if (this._WitnessMandatory != value) {
                this._WitnessMandatory = value;
               //super.NotifyPropertyChanged("WitnessMandatory");
            }
        }
        private _bIsWitnessReqd: boolean = false;
        public get bIsWitnessReqd(): boolean {
            return this._bIsWitnessReqd;
        }
        public set bIsWitnessReqd(value: boolean) {
            if (this._bIsWitnessReqd != value) {
                this._bIsWitnessReqd = value;
               //super.NotifyPropertyChanged("bIsWitnessReqd");
            }
        }
        private _focus: boolean = false;
        public get Focus(): boolean {
            return this._focus;
        }
        public set Focus(value: boolean) {
            if (this._focus != value) {
                this._focus = value;
               //super.NotifyPropertyChanged("Focus");
            }
        }
        private _ClinicalIncidentForm: string;
        public get ClinicalIncidentForm(): string {
            return this._ClinicalIncidentForm;
        }
        public set ClinicalIncidentForm(value: string) {
            if (this._ClinicalIncidentForm != value) {
                this._ClinicalIncidentForm = value;
               //super.NotifyPropertyChanged("ClinicalIncidentForm");
            }
        }
        private _UserName: string;
        public get UserName(): string {
            return this._UserName;
        }
        public set UserName(value: string) {
            if (this._UserName != value) {
                this._UserName = value;
               //NotifyPropertyChanged("UserName");
            }
        }
        private _IsNoWitnessSelected: boolean = false;
        public get IsNoWitnessSelected(): boolean {
            return this._IsNoWitnessSelected;
        }
        public set IsNoWitnessSelected(value: boolean) {
            if (!Helper.ReferenceEquals(this._IsNoWitnessSelected, value)) {
                this._IsNoWitnessSelected = value;
            }
        }
        private _WitnessByOID: string;
        public get WitnessByOID(): string {
            return this._WitnessByOID;
        }
        public set WitnessByOID(value: string) {
            {
                if (this.IsNoWitnessSelected) {
                    value = "-1";
                }
                this._WitnessByOID = value;
                let IsCallFromRestore: boolean = false;
                if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.FormViewerDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IsRestoreOldValues) {
                    IsCallFromRestore = true;
                }
                if (!String.IsNullOrEmpty(value) && value != "-1" && this.OnWitnessUserSelected != null && !IsCallFromRestore)
                    this.OnWitnessUserSelected(SelectedUserType.WitnessingUser);
               //NotifyPropertyChanged("WitnessByOID");
            }
        }
        private _WitnessBy: string;
        public get WitnessBy(): string {
            return this._WitnessBy;
        }
        public set WitnessBy(value: string) {
            {
                if (this.IsNoWitnessSelected) {
                    value = String.Empty;
                }
                this._WitnessBy = value;
               //NotifyPropertyChanged("WitnessBy");
            }
        }
        private _IsNoWitnessAvialable: boolean = false;
        public get IsNoWitnessAvialable(): boolean {
            return this._IsNoWitnessAvialable;
        }
        public set IsNoWitnessAvialable(value: boolean) {
            if (!Helper.ReferenceEquals(this._IsNoWitnessAvialable, value)) {
                this._IsNoWitnessAvialable = value;
               //NotifyPropertyChanged("IsNoWitnessAvialable");
            }
        }
        private _PasswordText: string;
        public get PasswordText(): string {
            return this._PasswordText;
        }
        public set PasswordText(value: string) {
            if (this._PasswordText != value) {
                this._PasswordText = value;
               //NotifyPropertyChanged("PasswordText");
            }
        }
        private _PasswordMandShow: Visibility = Visibility.Collapsed;
        public get PasswordMandShow(): Visibility {
            return this._PasswordMandShow;
        }
        public set PasswordMandShow(value: Visibility) {
            if (this._PasswordMandShow != value) {
                this._PasswordMandShow = value;
               //NotifyPropertyChanged("PasswordMandShow");
            }
        }
        private _PasswordSuccess: boolean = false;
        public get PasswordSuccess(): boolean {
            return this._PasswordSuccess;
        }
        public set PasswordSuccess(value: boolean) {
            this._PasswordSuccess = value;
        }
        private _ChkNoWitness: Visibility = Visibility.Visible;
        public get ChkNoWitness(): Visibility {
            return this._ChkNoWitness;
        }
        public set ChkNoWitness(value: Visibility) {
            if (this._ChkNoWitness != value) {
                this._ChkNoWitness = value;
               //NotifyPropertyChanged("ChkNoWitness");
            }
        }
        public GetCliniicalIncidentFormConfig(): void {
            if (ProfileData.ClinicalIncidentConfig != null && ProfileData.ClinicalIncidentConfig.isRecordAdminWitnessOverride) {
                this.ClinicalIncidentForm = ProfileData.ClinicalIncidentConfig.LinkTextToDisplay;
            }
        }
        public GetWitnessRequired(): void {
            Busyindicator.SetStatusBusy("frmRecordAdmin");
            let objService: IPPMAPrescribableDefnWSSoapClient = new IPPMAPrescribableDefnWSSoapClient();
            objService.IsWitnessRequiredCompleted  = (s,e) => { this.objService_IsWitnessReqdCompleted(s,e); } ;
            let objReq: CReqMsgIsWitnessRequired = new CReqMsgIsWitnessRequired();
            objReq.oContextInformation = CommonBB.FillContext();
            objReq.CriteriaBC = new WitnessCriteria();
            objReq.CriteriaBC.ServicePoints = new ObservableCollection<ObjectInfo>();
            objReq.CriteriaBC.ServicePoints.Add(ObjectHelper.CreateObject(new ObjectInfo(), { OID: MedChartData.ServiceOID }));
            objReq.CriteriaBC.Drugs = new ObservableCollection<ObjectInfo>();
            objReq.CriteriaBC.Drugs.Add(ObjectHelper.CreateObject(new ObjectInfo(), { Code: this.oPrescriptionItemVM != null ? this.oPrescriptionItemVM.LorenzoID : String.Empty }));
            objReq.CriteriaBC.Roles = new ObservableCollection<ObjectInfo>();
            objReq.CriteriaBC.Roles.Add(ObjectHelper.CreateObject(new ObjectInfo(), { OID: Convert.ToInt64(AppContextInfo.JobRoleOID) }));
            objReq.CriteriaBC.Routes = new ObservableCollection<ObjectInfo>();
            objReq.CriteriaBC.Routes.Add(ObjectHelper.CreateObject(new ObjectInfo(), { OID: this.Route != null ? Number.Parse(this.Route.Value) : 0 }));
            if (!String.IsNullOrEmpty(PatientContext.DOB) && DateTime.LessThanOrEqualTo(Convert.ToDateTime(PatientContext.DOB), CommonBB.GetServerDateTime()))
                objReq.CriteriaBC.AgeFrom = Convert.ToInt16(PatientContext.Age);
            else objReq.CriteriaBC.AgeFrom = -1;
            if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.FormViewerDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails != null && (String.Equals(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.CATALOGUEITEM, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.ACTUALMOIETY, StringComparison.InvariantCultureIgnoreCase))) {
                if (this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.DrugProperties != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.DrugProperties.Where(c => String.Equals(c.DrugPropertyCode, CConstants.DrugPropertyCNTRLDDRUG) && String.Equals(c.VMChildCode, CConstants.AllChild_CC)).ToList().Count > 0) {
                    objReq.CriteriaBC.IsControlledDrugIncluded = true;
                }
                else {
                    objReq.CriteriaBC.IsControlledDrugIncluded = false;
                }
            }
            else {
                objReq.CriteriaBC.IsControlledDrugIncluded = this.oPrescriptionItemVM != null ? this.oPrescriptionItemVM.IsControlledDrug.Equals('1') : false;
            }
            objService.IsWitnessRequiredAsync(objReq);
        }
        objService_IsWitnessReqdCompleted(sender: Object, e: IsWitnessRequiredCompletedEventArgs): void {
            if (e.Result != null) {
                let objRes: CResMsgIsWitnessRequired = e.Result;
                if (objRes != null && objRes.owitnessCriteriaresult != null) {
                    if (objRes.owitnessCriteriaresult.Flag) {
                        this.bIsWitnessReqd = true;
                    }
                    else {
                        this.IsNoWitnessAvialable = this.bIsWitnessReqd = false;
                    }
                    if (objRes.owitnessCriteriaresult.Isnowitnessoverride) {
                        this.ChkNoWitness = Visibility.Collapsed;
                    }
                    else {
                        this.ChkNoWitness = Visibility.Visible;
                    }
                }
            }
            Busyindicator.SetStatusIdle("frmRecordAdmin");
            if (this.GetWitnessRequiredEvent != null)
                this.GetWitnessRequiredEvent();
        }
        private deliveryDeviceList: ObservableCollection<CListItem>;
        private _volumeUOM: ObservableCollection<CListItem>;
        private _volumeuom: CListItem;
        private _BagVolume: string;
        private deliveryDevice: CListItem;
        private _DripRate: string;
        private _DripRateUOM: CListItem;
        private _DripRateDenUOM: CListItem;
        private _DeliveryDeviceText: string;
        private _IsEnabledDeliveryDevice: boolean = false;
        private lumen: string;
        private _InfusionRate: string;
        private _InfusionRateUOMValue: string;
        private _infratenumeratoruom: CListItem;
        private _infrateDenominatoruom: CListItem;
        private _isenableInfusionlumen: boolean = true;
        private _humidification: CListItem;
        private _FlowrateNumUom: CListItem;
        private _FlowrateDenUom: CListItem;
        private _IsEnableHumidification: boolean = true;
        public get IsenableInfusionLumen(): boolean {
            return this._isenableInfusionlumen;
        }
        public set IsenableInfusionLumen(value: boolean) {
            if (!Helper.ReferenceEquals(this._isenableInfusionlumen, value)) {
                this._isenableInfusionlumen = value;
               //super.NotifyPropertyChanged("IsenableInfusionLumen");
            }
        }
        public get DeliveryDeviceList(): ObservableCollection<CListItem> {
            return this.deliveryDeviceList;
        }
        public set DeliveryDeviceList(value: ObservableCollection<CListItem>) {
            this.deliveryDeviceList = value;
           //NotifyPropertyChanged("DeliveryDeviceList");
        }
        public get DripRate(): string {
            return this._DripRate;
        }
        public set DripRate(value: string) {
            if (!Helper.ReferenceEquals(this._DripRate, value)) {
                this._DripRate = value;
               //super.NotifyPropertyChanged("DripRate");
            }
        }
        public get BagVolume(): string {
            return this._BagVolume;
        }
        public set BagVolume(value: string) {
            if (!Helper.ReferenceEquals(this._BagVolume, value)) {
                this._BagVolume = value;
               //super.NotifyPropertyChanged("BagVolume");
            }
        }
        public get BagVolumeUOMList(): ObservableCollection<CListItem> {
            return this._volumeUOM;
        }
        public set BagVolumeUOMList(value: ObservableCollection<CListItem>) {
            if (this._volumeUOM != value) {
                this._volumeUOM = value;
               //NotifyPropertyChanged("BagVolumeUOMList");
            }
        }
        public get BagVolumeUOM(): CListItem {
            return this._volumeuom;
        }
        public set BagVolumeUOM(value: CListItem) {
            if (value != this._volumeuom) {
                this._volumeuom = value;
               //NotifyPropertyChanged("BagVolumeUOM");
            }
        }
        private _IsInfRateVolBased: boolean = false;
        public get IsInfRateVolBased(): boolean {
            return this._IsInfRateVolBased;
        }
        public set IsInfRateVolBased(value: boolean) {
            if (this._IsInfRateVolBased != value) {
                this._IsInfRateVolBased = value;
               //super.NotifyPropertyChanged("IsInfRateVolBased");
            }
        }
        private _IsInfusionrateCal: Visibility = Visibility.Collapsed;
        public get IsInfusionrateCal(): Visibility {
            return this._IsInfusionrateCal;
        }
        public set IsInfusionrateCal(value: Visibility) {
            if (this._IsInfusionrateCal != value) {
                this._IsInfusionrateCal = value;
               //NotifyPropertyChanged("IsInfusionrateCal");
            }
        }
        private _IsInfDripnrateCal: Visibility = Visibility.Collapsed;
        public get IsInfDripnrateCal(): Visibility {
            return this._IsInfDripnrateCal;
        }
        public set IsInfDripnrateCal(value: Visibility) {
            if (this._IsInfDripnrateCal != value) {
                this._IsInfDripnrateCal = value;
               //NotifyPropertyChanged("IsInfDripnrateCal");
            }
        }
        public get DripRateUOM(): CListItem {
            return this._DripRateUOM;
        }
        public set DripRateUOM(value: CListItem) {
            if (value != this._DripRateUOM) {
                this._DripRateUOM = value;
               //NotifyPropertyChanged("DripRateUOM");
            }
        }
        public get DripRateDenUOM(): CListItem {
            return this._DripRateDenUOM;
        }
        public set DripRateDenUOM(value: CListItem) {
            if (value != this._DripRateDenUOM) {
                this._DripRateDenUOM = value;
               //NotifyPropertyChanged("DripRateDenUOM");
            }
        }
        public get DeliveryDevice(): CListItem {
            return this.deliveryDevice;
        }
        public set DeliveryDevice(value: CListItem) {
            if (this.deliveryDevice != value) {
                this.deliveryDevice = value;
               //NotifyPropertyChanged("DeliveryDevice");
            }
        }
        public get DeliveryDeviceText(): string {
            return this._DeliveryDeviceText;
        }
        public set DeliveryDeviceText(value: string) {
            if (value != this._DeliveryDeviceText) {
                this._DeliveryDeviceText = value;
               //NotifyPropertyChanged("DeliveryDeviceText");
            }
        }
        public get IsEnabledDeliveryDevice(): boolean {
            return this._IsEnabledDeliveryDevice;
        }
        public set IsEnabledDeliveryDevice(value: boolean) {
            if (!Helper.ReferenceEquals(this._IsEnabledDeliveryDevice, value)) {
                this._IsEnabledDeliveryDevice = value;
               //NotifyPropertyChanged("IsEnabledDeliveryDevice");
            }
        }
        public get Lumen(): string {
            return this.lumen;
        }
        public set Lumen(value: string) {
            this.lumen = value;
           //NotifyPropertyChanged("Lumen");
        }
        public get InfusionRate(): string {
            return this._InfusionRate;
        }
        public set InfusionRate(value: string) {
            if (this._InfusionRate != value) {
                this._InfusionRate = value;
               //NotifyPropertyChanged("InfusionRate");
            }
        }
        private _InfusionRateForDripRateCal: string = String.Empty;
        public get InfusionRateForDripRateCal(): string {
            return this._InfusionRateForDripRateCal;
        }
        public set InfusionRateForDripRateCal(value: string) {
            if (this._InfusionRateForDripRateCal != value) {
                this._InfusionRateForDripRateCal = value;
               //NotifyPropertyChanged("InfusionRateForDripRateCal");
            }
        }
        private _InfusionRateUOMValueForDripRateCal: string = String.Empty;
        public get InfusionRateUOMValueForDripRateCal(): string {
            return this._InfusionRateUOMValueForDripRateCal;
        }
        public set InfusionRateUOMValueForDripRateCal(value: string) {
            if (this._InfusionRateUOMValueForDripRateCal != value) {
                this._InfusionRateUOMValueForDripRateCal = value;
               //NotifyPropertyChanged("InfusionRateUOMValueForDripRateCal");
            }
        }
        public get InfusionRateUOMValue(): string {
            return this._InfusionRateUOMValue;
        }
        public set InfusionRateUOMValue(value: string) {
            if (this._InfusionRateUOMValue != value) {
                this._InfusionRateUOMValue = value;
               //NotifyPropertyChanged("InfusionRateUOMValue");
            }
        }
        public get InfRateNumeratorUom(): CListItem {
            return this._infratenumeratoruom;
        }
        public set InfRateNumeratorUom(value: CListItem) {
            if (value != this._infratenumeratoruom) {
                this._infratenumeratoruom = value;
               //NotifyPropertyChanged("InfRateNumeratorUom");
            }
        }
        private _InfusionRateNumeratorUOMs: ObservableCollection<CListItem>;
        public get InfusionRateNumeratorUOMs(): ObservableCollection<CListItem> {
            return this._InfusionRateNumeratorUOMs;
        }
        public set InfusionRateNumeratorUOMs(value: ObservableCollection<CListItem>) {
            if (this._InfusionRateNumeratorUOMs != value) {
                this._InfusionRateNumeratorUOMs = value;
               //NotifyPropertyChanged("InfusionRateNumeratorUOMs");
            }
        }
        public get InfRateDinominatorUom(): CListItem {
            return this._infrateDenominatoruom;
        }
        public set InfRateDinominatorUom(value: CListItem) {
            if (value != this._infrateDenominatoruom) {
                this._infrateDenominatoruom = value;
               //NotifyPropertyChanged("InfRateDinominatorUom");
            }
        }
        public get Humidification(): CListItem {
            return this._humidification;
        }
        public set Humidification(value: CListItem) {
            if (this._humidification != value) {
                this._humidification = value;
               //NotifyPropertyChanged("Humidification");
            }
        }
        public get FlowrateNumUom(): CListItem {
            return this._FlowrateNumUom;
        }
        public set FlowrateNumUom(value: CListItem) {
            if (this._FlowrateNumUom != value) {
                this._FlowrateNumUom = value;
               //NotifyPropertyChanged("FlowrateNumUom");
            }
        }
        public get FlowrateDenUom(): CListItem {
            return this._FlowrateDenUom;
        }
        public set FlowrateDenUom(value: CListItem) {
            if (this._FlowrateDenUom != value) {
                this._FlowrateDenUom = value;
               //NotifyPropertyChanged("FlowrateDenUom");
            }
        }
        private _ConcentrationStrength: string;
        private _ConcentrationStrengthUOM: CListItem;
        private _ConcentrationVolume: string;
        private _ConcentrationVolumeUOM: CListItem;
        private _EnableConcentration: boolean = true;
        private _InfusionDose: string;
        private _InfusionDoseNumeratorUOMID: number = 0;
        private _InfusionDoseDenominatorUOMID: number = 0;
        private _InfusionDoseUOM: string;
        private _EnableInfusionDose: boolean = false;
        private _InfusionPeriodMedAdmin: string;
        private _InfusionPeriodMedAdminUOM: CListItem;
        private _EnableInfusionPeriodMedAdmin: boolean = false;
        public get ConcentrationStrength(): string {
            return this._ConcentrationStrength;
        }
        public set ConcentrationStrength(value: string) {
            if (!Helper.ReferenceEquals(this._ConcentrationStrength, value)) {
                this._ConcentrationStrength = value;
               //NotifyPropertyChanged("ConcentrationStrength");
            }
        }
        private _ConcentrationStrengthUOMs: ObservableCollection<CListItem>;
        public get ConcentrationStrengthUOMs(): ObservableCollection<CListItem> {
            return this._ConcentrationStrengthUOMs;
        }
        public set ConcentrationStrengthUOMs(value: ObservableCollection<CListItem>) {
            if (this._ConcentrationStrengthUOMs != value) {
                this._ConcentrationStrengthUOMs = value;
               //NotifyPropertyChanged("ConcentrationStrengthUOMs");
            }
        }
        public get ConcentrationStrengthUOM(): CListItem {
            return this._ConcentrationStrengthUOM;
        }
        public set ConcentrationStrengthUOM(value: CListItem) {
            if (!Helper.ReferenceEquals(this._ConcentrationStrengthUOM, value)) {
                if (value != null && value.Value != null && value.Value == "CC_More") {
                    this.GetMoreComboOption(CConstants.ConcentrationDoseUOM);
                }
                if (this._ConcentrationStrengthUOMs != null)
                    this._ConcentrationStrengthUOM = this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.GetComboValue(value, this.ConcentrationStrengthUOMs);
                else this._ConcentrationStrengthUOM = value;
               //NotifyPropertyChanged("ConcentrationStrengthUOM");
            }
        }
        private GetMoreComboOption(MoreOptionCode: string): void {
            this.MoreOptionKey = MoreOptionCode;
            let objService: ManagePrescriptionWSSoapClient = new ManagePrescriptionWSSoapClient();
            objService.GetAllOptionsCompleted  = (s,e) => { this.objService_GetAllOptionsCompleted(s,e); } ;
            let objAllRequest: CReqMsgGetAllOptions = new CReqMsgGetAllOptions();
            objAllRequest.IdentifyingOIDBC = this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingOID;
            objAllRequest.IdentifyingTypeBC = this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingType;
            objAllRequest.sOptionCodeBC = CConstants.DoseUOMOptionCode;
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
                        switch (this.MoreOptionKey) {
                            case CConstants.ConcentrationDoseUOM:
                                this.ConcentrationStrengthUOMs = new ObservableCollection<CListItem>();
                                for (let i: number = 0; i < objResponse.oValues.Count; i++) {
                                    if (!String.IsNullOrEmpty(objResponse.oValues[i].Name)) {
                                        this.ConcentrationStrengthUOMs.Add(ObjectHelper.CreateObject(new CListItem(), {
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
                    let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
        }
        public get ConcentrationVolume(): string {
            return this._ConcentrationVolume;
        }
        public set ConcentrationVolume(value: string) {
            if (!Helper.ReferenceEquals(this._ConcentrationVolume, value)) {
                this._ConcentrationVolume = value;
               //NotifyPropertyChanged("ConcentrationVolume");
            }
        }
        public get ConcentrationVolumeUOM(): CListItem {
            return this._ConcentrationVolumeUOM;
        }
        public set ConcentrationVolumeUOM(value: CListItem) {
            if (!Helper.ReferenceEquals(this._ConcentrationVolumeUOM, value)) {
                this._ConcentrationVolumeUOM = value;
               //NotifyPropertyChanged("ConcentrationVolumeUOM");
            }
        }
        public get EnableConcentration(): boolean {
            return this._EnableConcentration;
        }
        public set EnableConcentration(value: boolean) {
            if (!Helper.ReferenceEquals(this._EnableConcentration, value)) {
                this._EnableConcentration = value;
               //NotifyPropertyChanged("EnableConcentration");
            }
        }
        public get InfusionDose(): string {
            return this._InfusionDose;
        }
        public set InfusionDose(value: string) {
            if (!Helper.ReferenceEquals(this._InfusionDose, value)) {
                this._InfusionDose = value;
               //NotifyPropertyChanged("InfusionDose");
            }
        }
        public get InfusionDoseUOM(): string {
            return this._InfusionDoseUOM;
        }
        public set InfusionDoseUOM(value: string) {
            if (!Helper.ReferenceEquals(this._InfusionDoseUOM, value)) {
                this._InfusionDoseUOM = value;
               //NotifyPropertyChanged("InfusionDoseUOM");
            }
        }
        public get InfusionDoseNumeratorUOMID(): number {
            return this._InfusionDoseNumeratorUOMID;
        }
        public set InfusionDoseNumeratorUOMID(value: number) {
            if (!Helper.ReferenceEquals(this._InfusionDoseNumeratorUOMID, value)) {
                this._InfusionDoseNumeratorUOMID = value;
               //NotifyPropertyChanged("InfusionDoseNumeratorUOMID");
            }
        }
        public get InfusionDoseDenominatorUOMID(): number {
            return this._InfusionDoseDenominatorUOMID;
        }
        public set InfusionDoseDenominatorUOMID(value: number) {
            if (!Helper.ReferenceEquals(this._InfusionDoseNumeratorUOMID, value)) {
                this._InfusionDoseNumeratorUOMID = value;
               //NotifyPropertyChanged("InfusionDoseNumeratorUOMID");
            }
        }
        public get EnableInfusionDose(): boolean {
            return this._EnableInfusionDose;
        }
        public set EnableInfusionDose(value: boolean) {
            if (!Helper.ReferenceEquals(this._EnableInfusionDose, value)) {
                this._EnableInfusionDose = value;
               //NotifyPropertyChanged("EnableInfusionDose");
            }
        }
        public get EnableInfusionPeriodMedAdmin(): boolean {
            return this._EnableInfusionPeriodMedAdmin;
        }
        public set EnableInfusionPeriodMedAdmin(value: boolean) {
            if (!Helper.ReferenceEquals(this._EnableInfusionPeriodMedAdmin, value)) {
                this._EnableInfusionPeriodMedAdmin = value;
               //NotifyPropertyChanged("EnableInfusionPeriodMedAdmin");
            }
        }
        public get InfusionPeriodMedAdmin(): string {
            return this._InfusionPeriodMedAdmin;
        }
        public set InfusionPeriodMedAdmin(value: string) {
            if (!Helper.ReferenceEquals(this._InfusionPeriodMedAdmin, value)) {
                this._InfusionPeriodMedAdmin = value;
               //NotifyPropertyChanged("InfusionPeriodMedAdmin");
            }
        }
        public get InfusionPeriodMedAdminUOM(): CListItem {
            return this._InfusionPeriodMedAdminUOM;
        }
        public set InfusionPeriodMedAdminUOM(value: CListItem) {
            if (!Helper.ReferenceEquals(this._InfusionPeriodMedAdminUOM, value)) {
                this._InfusionPeriodMedAdminUOM = value;
               //NotifyPropertyChanged("InfusionPeriodMedAdminUOM");
            }
        }
        public get IsEnableHumidification(): boolean {
            return this._IsEnableHumidification;
        }
        public set IsEnableHumidification(value: boolean) {
            if (this._IsEnableHumidification != value) {
                this._IsEnableHumidification = value;
               //NotifyPropertyChanged("IsEnableHumidification");
            }
        }
        private _bIsDuringHomeLeave: boolean = false;
        public get IsDuringHomeLeave(): boolean {
            return this._bIsDuringHomeLeave;
        }
        public set IsDuringHomeLeave(value: boolean) {
            this._bIsDuringHomeLeave = value;
        }
        private _HomeLeaveStartDTTM: DateTime = DateTime.MinValue;
        public get HomeLeaveStartDTTM(): DateTime{
            return this._HomeLeaveStartDTTM;
        }
        public set HomeLeaveStartDTTM(value: DateTime) {
            this._HomeLeaveStartDTTM = value;
        }
        public DoCleanUP(): void {

        }
    }