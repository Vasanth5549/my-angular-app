import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, Visibility } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper as Helper, ObjectHelper } from 'epma-platform/helper';
import { IViewModelBase, ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';

    export class AdministrableQtyViewVM extends ViewModelBase {
        _drugName: string;
        public get ScannedDrugName(): string {
            return this._drugName;
        }
        public set ScannedDrugName(value: string) {
            this._drugName = value;
        }
        _CDWardOID: number;
        public get CDWardOID(): number {
            return this._CDWardOID;
        }
        public set CDWardOID(value: number) {
            this._CDWardOID = value;
        }
        _CDPatientOID: number;
        public get CDPatientOID(): number {
            return this._CDPatientOID;
        }
        public set CDPatientOID(value: number) {
            this._CDPatientOID = value;
        }
        _AdminsitrableAmount: string;
        public get AdminsitrableAmount(): string {
            return this._AdminsitrableAmount;
        }
        public set AdminsitrableAmount(value: string) {
            this._AdminsitrableAmount = value;
        }
        _strWardStockQuantityToAdmin: string;
        public get strWardStockQuantityToAdmin(): string {
            return this._strWardStockQuantityToAdmin;
        }
        public set strWardStockQuantityToAdmin(value: string) {
            this._strWardStockQuantityToAdmin = value;
            if (!String.IsNullOrWhiteSpace(value)) {
                this.WardStockQuantityToAdmin = Convert.ToDouble(this._strWardStockQuantityToAdmin);
                this.EnableCheckBox = true;
            }
            else {
                this.WardStockQuantityToAdmin = 0;
                this.EnableCheckBox = false;
            }
        }
        _WardStockUOM: string;
        public get WardStockUOM(): string {
            return this._WardStockUOM;
        }
        public set WardStockUOM(value: string) {
            this._WardStockUOM = value;
        }
        _PatientStockUOM: string;
        public get PatientStockUOM(): string {
            return this._PatientStockUOM;
        }
        public set PatientStockUOM(value: string) {
            this._PatientStockUOM = value;
        }
        _AmountRemaining: string;
        public get AmountRemaining(): string {
            return this._AmountRemaining;
        }
        public set AmountRemaining(value: string) {
            this._AmountRemaining = value;
        }
        _EnableCheckBox: boolean;
        public get EnableCheckBox(): boolean {
            return this._EnableCheckBox;
        }
        public set EnableCheckBox(value: boolean) {
            this._EnableCheckBox = value;
          //  NotifyPropertyChanged("EnableCheckBox");
        }
        _WardStockQuantityToAdmin: number;
        public get WardStockQuantityToAdmin(): number {
            return this._WardStockQuantityToAdmin;
        }
        public set WardStockQuantityToAdmin(value: number) {
            this._WardStockQuantityToAdmin = value;
           // NotifyPropertyChanged("WardStockQuantityToAdmin");
        }
        _strPatientStockQuantityToAdmin: string;
        public get strPatientStockQuantityToAdmin(): string {
            return this._strPatientStockQuantityToAdmin;
        }
        public set strPatientStockQuantityToAdmin(value: string) {
            this._strPatientStockQuantityToAdmin = value;
            if (!String.IsNullOrWhiteSpace(value)) {
                this.PatientStockQuantityToAdmin = Convert.ToDouble(this._strPatientStockQuantityToAdmin);
                this.EnableCheckBox = true;
            }
            else {
                this.PatientStockQuantityToAdmin = 0;
                this.EnableCheckBox = false;
            }
        }
        _PatientStockQuantityToAdmin: number;
        public get PatientStockQuantityToAdmin(): number {
            return this._PatientStockQuantityToAdmin;
        }
        public set PatientStockQuantityToAdmin(value: number) {
            this._PatientStockQuantityToAdmin = value;
           // NotifyPropertyChanged("PatientStockQuantityToAdmin");
        }
        _IsUpdateStockRegister: boolean;
        public get IsUpdateStockRegister(): boolean {
            return this._IsUpdateStockRegister;
        }
        public set IsUpdateStockRegister(value: boolean) {
            this._IsUpdateStockRegister = value;
           // NotifyPropertyChanged("IsUpdateStockRegister");
        }
        _DoseUOM: string;
        public get DoseUOM(): string {
            return this._DoseUOM;
        }
        public set DoseUOM(value: string) {
            this._DoseUOM = value;
        }
        _StockVisibibility: Visibility = Visibility.Collapsed;
        public get StockVisibility(): Visibility {
            return this._StockVisibibility;
        }
        public set StockVisibility(value: Visibility) {
            this._StockVisibibility = value;
        }
        _PatientStockVisibility: Visibility = Visibility.Collapsed;
        public get PatientStockVisibility(): Visibility {
            return this._PatientStockVisibility;
        }
        public set PatientStockVisibility(value: Visibility) {
            this._PatientStockVisibility = value;
        }
        ad: ObservableCollection<TransactionItemPackDetails>;
        public get TransactionItemPackDetails(): ObservableCollection<TransactionItemPackDetails> {
            if (this.ad == null)
                this.ad = new ObservableCollection<TransactionItemPackDetails>();
            return this.ad;
        }
        public set TransactionItemPackDetails(value: ObservableCollection<TransactionItemPackDetails>) {
            if (!Helper.ReferenceEquals(value, this.ad)) {
                this.ad = value;
              //  NotifyPropertyChanged("PackDetails");
            }
        }
        _Wastage: string;
        public get Wastage(): string {
            return this._Wastage;
        }
        public set Wastage(value: string) {
            this._Wastage = value;
        }
        _MessageVisibility: Visibility = Visibility.Collapsed;
        public get MessageVisibility(): Visibility {
            return this._MessageVisibility;
        }
        public set MessageVisibility(value: Visibility) {
            this._MessageVisibility = value;
        }
        _RegMsgVisibility: Visibility = Visibility.Collapsed;
        public get RegMsgVisibility(): Visibility {
            return this._RegMsgVisibility;
        }
        public set RegMsgVisibility(value: Visibility) {
            this._RegMsgVisibility = value;
        }
    }
    export class TransactionItemPackDetails extends ViewModelBase {
        a: string;
        public get BatchNumber(): string {
            return this.a;
        }
        public set BatchNumber(value: string) {
            if (!Helper.ReferenceEquals(value, this.a)) {
                this.a = value;
               // NotifyPropertyChanged("BatchNumber");
            }
        }
        b: DateTime;
        public get ExpiryDate(): DateTime{
            return this.b;
        }
        public set ExpiryDate(value: DateTime) {
            if (!Helper.ReferenceEquals(value, this.b)) {
                this.b = value;
               // NotifyPropertyChanged("ExpiryDate");
            }
        }
        c: string;
        public get Quantity(): string {
            return this.c;
        }
        public set Quantity(value: string) {
            if (!Helper.ReferenceEquals(value, this.c)) {
                this.c = value;
               // NotifyPropertyChanged("Quantity");
            }
        }
    }
