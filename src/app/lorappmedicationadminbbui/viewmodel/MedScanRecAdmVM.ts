import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, Visibility, ObservableCollection } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { CMedBarcodeScanOverrideDetail } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { ManageBarcodeHelper, MedicationBarcode } from '../common/ManageBarcodeHelper';
import { CDrugHeader } from '../common/drugheader';

    export class MedScanRecAdmVM extends ViewModelBase {
        public oMedBarScanOverideForInvalidORNotMatchProd: CMedBarcodeScanOverrideDetail;
        private _oDrugHeader: CDrugHeader;
        public get oDrugHeader(): CDrugHeader {
            return this._oDrugHeader;
        }
        public set oDrugHeader(value: CDrugHeader) {
            this._oDrugHeader = value;
            //NotifyPropertyChanged("oDrugHeader");
        }
        private _oProductDetailsInfo: ObservableCollection<ProductDetailsGrid>;
        public get oProductDetailsInfo(): ObservableCollection<ProductDetailsGrid> {
            return this._oProductDetailsInfo;
        }
        public set oProductDetailsInfo(value: ObservableCollection<ProductDetailsGrid>) {
            this._oProductDetailsInfo = value;
           // NotifyPropertyChanged("oProductDetailsInfo");
        }
        private _OldProductDetailsInfo: ObservableCollection<ProductDetailsGrid>;
        public get OldProductDetailsInfo(): ObservableCollection<ProductDetailsGrid> {
            return this._OldProductDetailsInfo;
        }
        public set OldProductDetailsInfo(value: ObservableCollection<ProductDetailsGrid>) {
            this._OldProductDetailsInfo = value;
        }
        private _ProductScannedhdrValue: string;
        public get ProductScannedhdrValue(): string {
            return this._ProductScannedhdrValue;
        }
        public set ProductScannedhdrValue(value: string) {
            this._ProductScannedhdrValue = value;
            // NotifyPropertyChanged("ProductScannedhdrValue");
        }
        private _TotaldoseadministeredAmt: string;
        public get TotaldoseadministeredAmt(): string {
            return this._TotaldoseadministeredAmt;
        }
        public set TotaldoseadministeredAmt(value: string) {
            this._TotaldoseadministeredAmt = value;
            // NotifyPropertyChanged("TotaldoseadministeredAmt");
        }
        private _TotaldoseUOM: string;
        public get TotaldoseUOM(): string {
            return this._TotaldoseUOM;
        }
        public set TotaldoseUOM(value: string) {
            this._TotaldoseUOM = value;
            // NotifyPropertyChanged("TotaldoseUOM");
        }
        private _TotalDoseAdministeredUOMLZOID: string;
        public get TotalDoseAdministeredUOMLZOID(): string {
            return this._TotalDoseAdministeredUOMLZOID;
        }
        public set TotalDoseAdministeredUOMLZOID(value: string) {
            this._TotalDoseAdministeredUOMLZOID = value;
        }
        private _MCVersion: string;
        public get MCVersion(): string {
            return this._MCVersion;
        }
        public set MCVersion(value: string) {
            this._MCVersion = value;
            // NotifyPropertyChanged("MCVersion");
        }
        private _lnPrescriptionOID: number;
        public get lnPrescriptionOID(): number {
            return this._lnPrescriptionOID;
        }
        public set lnPrescriptionOID(value: number) {
            this._lnPrescriptionOID = value;
            // NotifyPropertyChanged("lnPrescriptionOID");
        }
        private _PrescribedDose: number;
        public get PrescribedDose(): number {
            return this._PrescribedDose;
        }
        public set PrescribedDose(value: number) {
            this._PrescribedDose = value;
            // NotifyPropertyChanged("PrescribedDose");
        }
        private _sDoseValUOM: string;
        public get sDoseValUOM(): string {
            return this._sDoseValUOM;
        }
        public set sDoseValUOM(value: string) {
            this._sDoseValUOM = value;
            // NotifyPropertyChanged("sDoseValUOM");
        }
        private _sDoseUOMLzoID: string;
        public get sDoseUOMLzoID(): string {
            return this._sDoseUOMLzoID;
        }
        public set sDoseUOMLzoID(value: string) {
            this._sDoseUOMLzoID = value;
            // NotifyPropertyChanged("sDoseUOMLzoID");
        }
        private _SlotDose: number;
        public get SlotDose(): number {
            return this._SlotDose;
        }
        public set SlotDose(value: number) {
            this._SlotDose = value;
            // NotifyPropertyChanged("SlotDose");
        }
        private _IsProductScanned: string = 'N';
        public get IsProductScanned(): string {
            return this._IsProductScanned;
        }
        public set IsProductScanned(value: string) {
            if (value != this._IsProductScanned) {
                this._IsProductScanned = value;
                // super.NotifyPropertyChanged("IsProductScanned");
            }
        }
        public BatchNumber: string;
        public SerialNumber: string;
        public ExpiryDate: DateTime;
        public EANGTINCode: string;
        private _IsbtnAddEnabled: boolean = true;
        public get IsbtnAddEnabled(): boolean {
            return this._IsbtnAddEnabled;
        }
        public set IsbtnAddEnabled(value: boolean) {
            if (value != this._IsbtnAddEnabled) {
                this._IsbtnAddEnabled = value;
                // super.NotifyPropertyChanged("IsbtnAddEnabled");
            }
        }
        private _IsDisEnableRemovebtn: boolean = false;
        public get IsDisEnableRemovebtn(): boolean {
            return this._IsDisEnableRemovebtn;
        }
        public set IsDisEnableRemovebtn(value: boolean) {
            if (value != this._IsDisEnableRemovebtn) {
                this._IsDisEnableRemovebtn = value;
                // super.NotifyPropertyChanged("IsDisEnableRemovebtn");
            }
        }
        private _IsInfusionDrug: boolean;
        public get IsInfusionDrug(): boolean {
            return this._IsInfusionDrug;
        }
        public set IsInfusionDrug(value: boolean) {
            if (value != this._IsInfusionDrug) {
                this._IsInfusionDrug = value;
                // super.NotifyPropertyChanged("IsInfusionDrug");
            }
        }
        private _IsInfPrescribeWithFluid: boolean;
        public get IsInfPrescribeWithFluid(): boolean {
            return this._IsInfPrescribeWithFluid;
        }
        public set IsInfPrescribeWithFluid(value: boolean) {
            if (value != this._IsInfPrescribeWithFluid) {
                this._IsInfPrescribeWithFluid = value;
                // super.NotifyPropertyChanged("IsInfPrescribeWithFluid");
            }
        }
        public OverrideReasonType: string;
        public OverrideIdentifyngType: string;
        public MessageTxt: string;
        private _IsbtnAddVisible: Visibility = Visibility.Visible;
        public get IsbtnAddVisible(): Visibility {
            return this._IsbtnAddVisible;
        }
        public set IsbtnAddVisible(value: Visibility) {
            if (value != this._IsbtnAddVisible) {
                this._IsbtnAddVisible = value;
                // super.NotifyPropertyChanged("IsbtnAddVisible");
            }
        }
        private _PresScheduleOID: number;
        public get PresScheduleOID(): number {
            return this._PresScheduleOID;
        }
        public set PresScheduleOID(value: number) {
            this._PresScheduleOID = value;
            // NotifyPropertyChanged("PresScheduleOID");
        }
        private _IsbtnRmvVisible: Visibility = Visibility.Visible;
        public get IsbtnRmvVisible(): Visibility {
            return this._IsbtnRmvVisible;
        }
        public set IsbtnRmvVisible(value: Visibility) {
            if (value != this._IsbtnRmvVisible) {
                this._IsbtnRmvVisible = value;
                // super.NotifyPropertyChanged("IsbtnRmvVisible");
            }
        }
        private _IsMedicationReadOnly: boolean;
        public get IsMedicationReadOnly(): boolean {
            return this._IsMedicationReadOnly;
        }
        public set IsMedicationReadOnly(value: boolean) {
            if (value != this._IsMedicationReadOnly) {
                this._IsMedicationReadOnly = value;
                // super.NotifyPropertyChanged("IsMedicationReadOnly");
            }
        }
        private _IsScanEnabledVis: Visibility = Visibility.Visible;
        public get IsScanEnabledVis(): Visibility {
            return this._IsScanEnabledVis;
        }
        public set IsScanEnabledVis(value: Visibility) {
            if (value != this._IsScanEnabledVis) {
                this._IsScanEnabledVis = value;
                // super.NotifyPropertyChanged("IsScanEnabledVis");
            }
        }
        private _IstxtBarcodeVis: Visibility = Visibility.Visible;
        public get IstxtBarcodeVis(): Visibility {
            return this._IstxtBarcodeVis;
        }
        public set IstxtBarcodeVis(value: Visibility) {
            if (value != this._IstxtBarcodeVis) {
                this._IstxtBarcodeVis = value;
                // super.NotifyPropertyChanged("IstxtBarcodeVis");
            }
        }
        private _IsExpiryDTMsgShown: boolean;
        public get IsExpiryDTMsgShown(): boolean {
            return this._IsExpiryDTMsgShown;
        }
        public set IsExpiryDTMsgShown(value: boolean) {
            if (this._IsExpiryDTMsgShown != value) {
                this._IsExpiryDTMsgShown = value;
            }
        }
        private _IsEnableTotalDoseValueAdmin: boolean;
        public get IsEnableTotalDoseValueAdmin(): boolean {
            return this._IsEnableTotalDoseValueAdmin;
        }
        public set IsEnableTotalDoseValueAdmin(value: boolean) {
            this._IsEnableTotalDoseValueAdmin = value;
            //super.NotifyPropertyChanged("IsEnableTotalDoseValueAdmin");
        }
        private _IsVisibleTotalDoseValueAdmin: Visibility = Visibility.Visible;
        public get IsVisibleTotalDoseValueAdmin(): Visibility {
            return this._IsVisibleTotalDoseValueAdmin;
        }
        public set IsVisibleTotalDoseValueAdmin(value: Visibility) {
            if (this._IsVisibleTotalDoseValueAdmin != value) {
                this._IsVisibleTotalDoseValueAdmin = value;
              //  super.NotifyPropertyChanged("IsVisibleTotalDoseValueAdmin");
            }
        }
        private _RecMedRouteOID: number;
        public get RecMedRouteOID(): number {
            return this._RecMedRouteOID;
        }
        public set RecMedRouteOID(value: number) {
            this._RecMedRouteOID = value;
        }
        public GetScannedItemDetails(MedBarcode: string): string {
            let oMedication: MedicationBarcode = ManageBarcodeHelper.GetMedication(MedBarcode);
            if (oMedication != null && oMedication.GTIN != null) {
                this.BatchNumber = !String.IsNullOrEmpty(oMedication.BATLOT) ? oMedication.BATLOT : String.Empty;
                this.ExpiryDate = (DateTime.NotEquals(oMedication.EXPDATE , DateTime.MinValue)) ? Convert.ToDateTime(oMedication.EXPDATE) : DateTime.MinValue;
                this.SerialNumber = !String.IsNullOrEmpty(oMedication.SLNO) ? oMedication.SLNO : String.Empty;
                return oMedication.GTIN;
            }
            else {
                return MedBarcode;
            }
        }
    }
    export class ProductDetailsGrid extends ViewModelBase {
        private _Productscanned: string;
        private _Productcode: string;
        private _Expirydate: DateTime;
        private _Batchnumber: string;
        private _Serialnumber: string;
        private _IsProductEnabled: boolean;
        private _IsStruckout: boolean;
        private _ScanProductLZOID: string;
        private _IsEnabledisableAdminAmt: boolean;
        private _IsExpiryDateEnabled: boolean;
        private _IsBatchNumberEnabled: boolean;
        private _IsSerialNumberEnabled: boolean;
        private _lstCMedBarcodeScanOverrideDetail: ObservableCollection<CMedBarcodeScanOverrideDetail>;
        private _Comments: string;
        private _IsPresFluidProduct: boolean;
        private _IsAllowExpiryDTTM: boolean;
        private _UniqueID: number;
        private _IsPastExpiryDTTM: boolean;
        public get IsPresFluidProduct(): boolean {
            return this._IsPresFluidProduct;
        }
        public set IsPresFluidProduct(value: boolean) {
            this._IsPresFluidProduct = value;
        }
        public get Productscanned(): string {
            return this._Productscanned;
        }
        public set Productscanned(value: string) {
            this._Productscanned = value;
        }
        public get Productcode(): string {
            return this._Productcode;
        }
        public set Productcode(value: string) {
            this._Productcode = value;
        }
        public get Expirydate(): DateTime{
            return this._Expirydate;
        }
        public set Expirydate(value: DateTime) {
            this._Expirydate = value;
        }
        public get Batchnumber(): string {
            return this._Batchnumber;
        }
        public set Batchnumber(value: string) {
            this._Batchnumber = value;
        }
        public get Serialnumber(): string {
            return this._Serialnumber;
        }
        public set Serialnumber(value: string) {
            this._Serialnumber = value;
        }
        public get IsProductEnabled(): boolean {
            return this._IsProductEnabled;
        }
        public set IsProductEnabled(value: boolean) {
            this._IsProductEnabled = value;
        }
        public get IsStruckout(): boolean {
            return this._IsStruckout;
        }
        public set IsStruckout(value: boolean) {
            this._IsStruckout = value;
        }
        public get ScanProductLZOID(): string {
            return this._ScanProductLZOID;
        }
        public set ScanProductLZOID(value: string) {
            this._ScanProductLZOID = value;
        }
        public get IsEnabledisableAdminAmt(): boolean {
            return this._IsEnabledisableAdminAmt;
        }
        public set IsEnabledisableAdminAmt(value: boolean) {
            this._IsEnabledisableAdminAmt = value;
        }
        public get IsExpiryDateEnabled(): boolean {
            return this._IsExpiryDateEnabled;
        }
        public set IsExpiryDateEnabled(value: boolean) {
            this._IsExpiryDateEnabled = value;
        }
        public get IsBatchNumberEnabled(): boolean {
            return this._IsBatchNumberEnabled;
        }
        public set IsBatchNumberEnabled(value: boolean) {
            this._IsBatchNumberEnabled = value;
        }
        public get IsSerialNumberEnabled(): boolean {
            return this._IsSerialNumberEnabled;
        }
        public set IsSerialNumberEnabled(value: boolean) {
            this._IsSerialNumberEnabled = value;
        }
        public get lstCMedBarcodeScanOverrideDetail(): ObservableCollection<CMedBarcodeScanOverrideDetail> {
            return this._lstCMedBarcodeScanOverrideDetail;
        }
        public set lstCMedBarcodeScanOverrideDetail(value: ObservableCollection<CMedBarcodeScanOverrideDetail>) {
            this._lstCMedBarcodeScanOverrideDetail = value;
        }
        private _PackageUOM: string;
        public get PackageUOM(): string {
            return this._PackageUOM;
        }
        public set PackageUOM(value: string) {
            this._PackageUOM = value;
        }
        private _PacKageUOMLZOID: string;
        public get PacKageUOMLZOID(): string {
            return this._PacKageUOMLZOID;
        }
        public set PacKageUOMLZOID(value: string) {
            this._PacKageUOMLZOID = value;
        }
        private _PresItemStrengthValue: number;
        public get PresItemStrengthValue(): number {
            return this._PresItemStrengthValue;
        }
        public set PresItemStrengthValue(value: number) {
            this._PresItemStrengthValue = value;
        }
        private _PresItemDoseMultiplier: number;
        public get PresItemDoseMultiplier(): number {
            return this._PresItemDoseMultiplier;
        }
        public set PresItemDoseMultiplier(value: number) {
            this._PresItemDoseMultiplier = value;
        }
        private _PresItemDoseDivider: number;
        public get PresItemDoseDivider(): number {
            return this._PresItemDoseDivider;
        }
        public set PresItemDoseDivider(value: number) {
            this._PresItemDoseDivider = value;
        }
        private _PresItemStrengthUOM: string;
        public get PresItemStrengthUOM(): string {
            return this._PresItemStrengthUOM;
        }
        public set PresItemStrengthUOM(value: string) {
            this._PresItemStrengthUOM = value;
        }
        public get Comments(): string {
            return this._Comments;
        }
        public set Comments(value: string) {
            this._Comments = value;
        }
        public get IsAllowOverideExpiryDTTM(): boolean {
            return this._IsAllowExpiryDTTM;
        }
        public set IsAllowOverideExpiryDTTM(value: boolean) {
            this._IsAllowExpiryDTTM = value;
        }
        public get UniqueID(): number {
            return this._UniqueID;
        }
        public set UniqueID(value: number) {
            this._UniqueID = value;
        }
        public get IsPastExpiryDTTM(): boolean {
            return this._IsPastExpiryDTTM;
        }
        public set IsPastExpiryDTTM(value: boolean) {
            this._IsPastExpiryDTTM = value;
        }
    }
