import { Component, Injectable, OnInit } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, Visibility, CListItem, ObservableCollection, List, RelayCommand, HtmlPage } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { IViewModelBase, ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { AppSessionInfo } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import { CConstants } from '../utilities/constants';
import { Resource } from '../resource';
import { CReqMsgGetAllOptions, CResMsgGetAllOptions, GetAllOptionsCompletedEventArgs, ManagePrescriptionWSSoapClient } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { CReqMsgGetUOMTypeList, CResMsgGetUOMTypeList, GetUOMTypeListCompletedEventArgs, MedicationAdministrationWSSoapClient, UomTypeList } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import 'epma-platform/booleanextension';
import 'epma-platform/numberextension';
import 'epma-platform/stringextension';
import {iMath as Math} from 'epma-platform/mathextension';
import 'epma-platform/arrayextension';

@Injectable({
    providedIn: 'root',
})
export class DripRateCalcVM extends ViewModelBase implements IViewModelBase {
    //public delegate void ErrorEventArgs(string ContronID);
    public OnErrorEvent: Function;
    private oMsgBox: iMessageBox;
    private bIsDoseBasedInfusionRate: Visibility;
    public get IsDoseBasedInfusionRate(): Visibility {
        return this.bIsDoseBasedInfusionRate;
    }
    public set IsDoseBasedInfusionRate(value: Visibility) {
        if (this.bIsDoseBasedInfusionRate != value) {
            this.bIsDoseBasedInfusionRate = value;
            //NotifyPropertyChanged("IsDoseBasedInfusionRate");
        }
    }
    private sDrugname: string;
    public get Drugname(): string {
        return this.sDrugname;
    }
    public set Drugname(value: string) {
        if (this.sDrugname != value) {
            this.sDrugname = value;
            //NotifyPropertyChanged("Drugname");
        }
    }
    //dont initilize the below line to 0;
    private dInfRateInDose: number;
    public get InfRateInDose(): number {
        return this.dInfRateInDose;
    }
    public set InfRateInDose(value: number) {
        if (this.dInfRateInDose != value) {
            this.dInfRateInDose = value;
            //NotifyPropertyChanged("InfRateInDose");
            this.CalculateInfConcentration();
        }
    }
    private liInfRateInDoseUOM: CListItem;
    public get InfRateInDoseUOM(): CListItem {
        return this.liInfRateInDoseUOM;
    }
    public set InfRateInDoseUOM(value: CListItem) {
        if (!ObjectHelper.ReferenceEquals(this.InfRateInDoseUOM, value)) {
            this.liInfRateInDoseUOM = value;
            //super.NotifyPropertyChanged("BagVolumeUOM");
            this.CalculateInfConcentration();
        }
    }
    private liInfRateInDosePerUOM: CListItem;
    public get InfRateInDosePerUOM(): CListItem {
        return this.liInfRateInDosePerUOM;
    }
    public set InfRateInDosePerUOM(value: CListItem) {
        if (!ObjectHelper.ReferenceEquals(this.liInfRateInDosePerUOM, value)) {
            this.liInfRateInDosePerUOM = value;
            //super.NotifyPropertyChanged("InfRateInDosePerUOM");
            this.CalculateInfConcentration();
        }
    }
    //dont initilize the below line to 0;
    private dInfStrength: number;
    public get InfStrength(): number {
        return this.dInfStrength;
    }
    public set InfStrength(value: number) {
        if (this.dInfStrength != value) {
            this.dInfStrength = value;
            //NotifyPropertyChanged("InfStrength");
            this.CalculateInfConcentration();
        }
    }
    private _IsEnabledInfusionrate: boolean = true;
    public get IsEnabledInfusionrate(): boolean {
        return this._IsEnabledInfusionrate;
    }
    public set IsEnabledInfusionrate(value: boolean) {
        if (this._IsEnabledInfusionrate != value) {
            this._IsEnabledInfusionrate = value;
            //NotifyPropertyChanged("IsEnabledInfusionrate");
        }
    }
    private liInfStrengthUOM: CListItem;
    public get InfStrengthUOM(): CListItem {
        return this.liInfStrengthUOM;
    }
    public set InfStrengthUOM(value: CListItem) {
        if (!ObjectHelper.ReferenceEquals(this.liInfStrengthUOM, value)) {
            if (value != null && value.DisplayText != null && value.DisplayText == "More") {
              this.liInfStrengthUOM = null;
                this.GetMoreComboOption();
            }else {
              this.liInfStrengthUOM = value;
            }

            //super.NotifyPropertyChanged("InfStrengthUOM");
            if (value == null || (!String.Equals(value.Value, "CC_More")))
                this.CalculateInfConcentration();
        }
    }
    //dont initilize the below line to 0;
    private iInfVolume: number;
    public get InfVolume(): number {
        return this.iInfVolume;
    }
    public set InfVolume(value: number) {
        if (this.iInfVolume != value) {
            this.iInfVolume = value;
            //NotifyPropertyChanged("InfVolume");
            this.CalculateInfConcentration();
        }
    }
    private liInfVolumeUOM: CListItem;
    public get InfVolumeUOM(): CListItem {
        return this.liInfVolumeUOM;
    }
    public set InfVolumeUOM(value: CListItem) {
        if (!ObjectHelper.ReferenceEquals(this.liInfVolumeUOM, value)) {
            this.liInfVolumeUOM = value;
            //super.NotifyPropertyChanged("InfVolumeUOM");
            this.CalculateInfConcentration();
        }
    }
    //dont initilize the below line to 0;
    private dInfConcentration: number;
    public get InfConcentration(): number {
        return this.dInfConcentration;
    }
    public set InfConcentration(value: number) {
        if (this.dInfConcentration != value) {
            this.dInfConcentration = value;
            //NotifyPropertyChanged("InfConcentration");
        }
    }
    private liInfConcentrationUOM: CListItem;
    public get InfConcentrationUOM(): CListItem {
        return this.liInfConcentrationUOM;
    }
    public set InfConcentrationUOM(value: CListItem) {
        if (!ObjectHelper.ReferenceEquals(this.liInfConcentrationUOM, value)) {
            this.liInfConcentrationUOM = value;
            //super.NotifyPropertyChanged("InfConcentrationUOM");
        }
    }
    private liInfConcentrationPerUOM: CListItem;
    public get InfConcentrationPerUOM(): CListItem {
        return this.liInfConcentrationPerUOM;
    }
    public set InfConcentrationPerUOM(value: CListItem) {
        if (!ObjectHelper.ReferenceEquals(this.liInfConcentrationPerUOM, value)) {
            this.liInfConcentrationPerUOM = value;
            //super.NotifyPropertyChanged("InfConcentrationPerUOM");
        }
    }
    //dont initilize the below line to 0;
    private dInfRateInVolume: number;
    public get InfRateInVolume(): number {
        return this.dInfRateInVolume;
    }
    public set InfRateInVolume(value: number) {
        if (this.dInfRateInVolume != value) {
            this.dInfRateInVolume = value;
            //NotifyPropertyChanged("InfRateInVolume");
            this.CalculateDriprate();
        }
    }
    private liInfRateInVolumeUOM: CListItem;
    public get InfRateInVolumeUOM(): CListItem {
        return this.liInfRateInVolumeUOM;
    }
    public set InfRateInVolumeUOM(value: CListItem) {
        if (!ObjectHelper.ReferenceEquals(this.liInfRateInVolumeUOM, value)) {
            this.liInfRateInVolumeUOM = value;
            //super.NotifyPropertyChanged("InfRateInVolumeUOM");
            this.CalculateDriprate();
        }
    }
    private liInfRateInVolumePerUOM: CListItem;
    public get InfRateInVolumePerUOM(): CListItem {
        return this.liInfRateInVolumePerUOM;
    }
    public set InfRateInVolumePerUOM(value: CListItem) {
        if (!ObjectHelper.ReferenceEquals(this.liInfRateInVolumePerUOM, value)) {
            this.liInfRateInVolumePerUOM = value;
            //super.NotifyPropertyChanged("InfRateInVolumePerUOM");
            this.CalculateDriprate();
        }
    }
    //dont initilize the below line to 0;
    private iDropFactor: number;
    public get DropFactor(): number {
        return this.iDropFactor;
    }
    public set DropFactor(value: number) {
        if (this.iDropFactor != value) {
            this.iDropFactor = value;
            //NotifyPropertyChanged("DropFactor");
            this.CalculateDriprate();
        }
    }
    //dont initilize the below line to 0;
    private dDripRate: number;
    public get DripRate(): number {
        return this.dDripRate;
    }
    public set DripRate(value: number) {
        if (this.dDripRate != value) {
            this.dDripRate = value;
            //NotifyPropertyChanged("DripRate");
        }
    }
    private oInfStrengthUOMList: ObservableCollection<CListItem>;
    public get InfStrengthUOMList(): ObservableCollection<CListItem> {
        return this.oInfStrengthUOMList;
    }
    public set InfStrengthUOMList(value: ObservableCollection<CListItem>) {
        if (this.oInfStrengthUOMList != value) {
            this.oInfStrengthUOMList = value;
            //NotifyPropertyChanged("InfStrengthUOMList");
        }
    }
    private oInfVolumeUOMList: ObservableCollection<CListItem>;
    public get InfVolumeUOMList(): ObservableCollection<CListItem> {
        return this.oInfVolumeUOMList;
    }
    public set InfVolumeUOMList(value: ObservableCollection<CListItem>) {
        if (this.oInfVolumeUOMList != value) {
            this.oInfVolumeUOMList = value;
            //NotifyPropertyChanged("InfVolumeUOMList");
        }
    }
    private oInfRatePerUOMList: ObservableCollection<CListItem>;
    public get InfRatePerUOMList(): ObservableCollection<CListItem> {
        return this.oInfRatePerUOMList;
    }
    public set InfRatePerUOMList(value: ObservableCollection<CListItem>) {
        if (this.oInfRatePerUOMList != value) {
            this.oInfRatePerUOMList = value;
            //NotifyPropertyChanged("InfRatePerUOMList");
        }
    }
    //dont initilize the below line to 0;
    private dIdentifyingOID: number;
    public get IdentifyingOID(): number {
        return this.dIdentifyingOID;
    }
    public set IdentifyingOID(value: number) {
        if (this.dIdentifyingOID != value) {
            this.dIdentifyingOID = value;
            //NotifyPropertyChanged("IdentifyingOID");
        }
    }
    private sIdentifyingType: string;
    public get IdentifyingType(): string {
        return this.sIdentifyingType;
    }
    public set IdentifyingType(value: string) {
        if (this.sIdentifyingType != value) {
            this.sIdentifyingType = value;
            //NotifyPropertyChanged("IdentifyingType");
        }
    }
    //dont initilize the below line to 0;
    private dPresItemOID: number;
    public get PresItemOID(): number {
        return this.dPresItemOID;
    }
    public set PresItemOID(value: number) {
        if (this.dPresItemOID != value) {
            this.dPresItemOID = value;
            //NotifyPropertyChanged("IdentifyingOID");
        }
    }
    private liDripRateUOM: CListItem;
    public get DripRateUOM(): CListItem {
        return this.liDripRateUOM;
    }
    public set DripRateUOM(value: CListItem) {
        if (!ObjectHelper.ReferenceEquals(this.liDripRateUOM, value)) {
            this.liDripRateUOM = value;
            //super.NotifyPropertyChanged("DripRateUOM");
        }
    }
    private liDripRatePerUOM: CListItem;
    public get DripRatePerUOM(): CListItem {
        return this.liDripRatePerUOM;
    }
    public set DripRatePerUOM(value: CListItem) {
        if (!ObjectHelper.ReferenceEquals(this.liDripRatePerUOM, value)) {
            this.liDripRatePerUOM = value;
            //super.NotifyPropertyChanged("DripRatePerUOM");
        }
    }
    private _IsSlashVisible: Visibility;
    public get IsSlashVisible(): Visibility {
        return this._IsSlashVisible;
    }
    public set IsSlashVisible(value: Visibility) {
        if (this._IsSlashVisible != value) {
            this._IsSlashVisible = value;
            //super.NotifyPropertyChanged("IsSlashVisible");
        }
    }
    public DoseTypeValue: string;
    public liForHour: CListItem;
    public temVolumeUOM: string;
    constructor() {
        super();
        this.GetDefaultForVolTimeWeight();
    }
    private CheckIfInfRateIsVolumeBased(): void {
        if (this.InfRateInDoseUOM != null && this.InfVolumeUOMList != null) {
            let bIsVolume: boolean = false;
            for(let i=0;i<this.InfVolumeUOMList.Count;i++){
                let oItem: CListItem = this.InfVolumeUOMList[i];            
                if (oItem.Value == this.InfRateInDoseUOM.Value) {
                    bIsVolume = true;
                    break;
                }
            }
            if (bIsVolume) {
                this.IsDoseBasedInfusionRate = Visibility.Collapsed;
                this.InfRateInVolume = this.InfRateInDose;
                this.InfRateInVolumeUOM = this.GetComboValue(this.InfRateInDoseUOM, this.InfVolumeUOMList);
                this.InfRateInVolumePerUOM = this.GetComboValue(this.InfRateInDosePerUOM, this.InfRatePerUOMList);
                this.InfRateInDose = null;
                this.InfRateInDoseUOM = null;
                this.InfRateInDosePerUOM = null;
            }
            else {
                this.IsDoseBasedInfusionRate = Visibility.Visible;
                this.InfRateInDose = this.InfRateInDose;
                this.InfRateInDoseUOM = this.InfRateInDoseUOM;
                this.InfRateInDosePerUOM = this.InfRateInDosePerUOM;
                this.InfStrengthUOM = this.GetComboValue(this.InfStrengthUOM, this.InfStrengthUOMList);
                this.InfVolumeUOM = this.GetComboValue(this.InfVolumeUOM, this.InfVolumeUOMList);
                this.InfRateInVolumeUOM = this.GetComboValue(this.InfRateInVolumeUOM, this.InfVolumeUOMList);
                this.InfRateInVolumePerUOM = this.GetComboValue(this.InfRateInVolumePerUOM, this.InfRatePerUOMList);
            }
            if (this.InfRateInDoseUOM != null && this.InfRateInDosePerUOM != null && String.IsNullOrEmpty(this.InfRateInDoseUOM.Value) && String.IsNullOrEmpty(this.InfRateInDosePerUOM.Value))
                this.IsSlashVisible = Visibility.Collapsed;
            else this.IsSlashVisible = Visibility.Visible;
        }
    }
    private oBtnCalculateClick: RelayCommand;
    public get BtnCalculateClick(): RelayCommand {
        if (this.oBtnCalculateClick == null) {
            let calcInfRate = () => { this.CalculateInfRate(); };
            this.oBtnCalculateClick = new RelayCommand(calcInfRate);
        }
        return this.oBtnCalculateClick;
    }
    private oBtnDoseCalClick: RelayCommand;
    public get BtnDoseCalClick(): RelayCommand {
        if (this.oBtnDoseCalClick == null) {
            this.oBtnDoseCalClick = new RelayCommand(this.LaunchDoseCalculator);
        }
        return this.oBtnDoseCalClick;
    }
    private CalculateDriprate(): void {
        let dTempInfRateInVolume: number = 0.0;
        if(this.DropFactor){
          if(!Number.isInteger(this.DropFactor)){
            this.DropFactor = Math.Floor(this.DropFactor)
          }
        }
        if (this.InfRateInVolume > 0 && this.InfRateInVolumeUOM != null && this.InfRateInVolumePerUOM != null && this.DropFactor > 0 && Number.isInteger(this.DropFactor)) {
            if (this.InfRateInVolume > 0 && this.InfRateInVolumeUOM.Value && this.InfRateInVolumePerUOM.Value && this.DropFactor > 0 && Number.isInteger(this.DropFactor)) {
            if (this.InfRateInVolumeUOM != null) {
                if (String.Compare(this.InfRateInVolumeUOM.DisplayText, "ml") == 0) {
                    dTempInfRateInVolume = this.InfRateInVolume;
                }
                else if (String.Compare(this.InfRateInVolumeUOM.DisplayText, "microlitre") == 0) {
                    dTempInfRateInVolume = this.InfRateInVolume / 1000;
                }
                else if (String.Compare(this.InfRateInVolumeUOM.DisplayText, "litre") == 0) {
                    dTempInfRateInVolume = this.InfRateInVolume * 1000;
                }
                else if (String.Compare(this.InfRateInVolumeUOM.DisplayText, "Imperial gallon") == 0) {
                    dTempInfRateInVolume = this.InfRateInVolume * 4546.09;
                }
            }
            if (this.InfRateInVolumePerUOM != null) {
                if (String.Compare(this.InfRateInVolumePerUOM.DisplayText, "hour") == 0) {
                    dTempInfRateInVolume = dTempInfRateInVolume / 60;
                }
                else if (String.Compare(this.InfRateInVolumePerUOM.DisplayText, "second") == 0) {
                    dTempInfRateInVolume = dTempInfRateInVolume * 1000;
                }
            }
            if (this.DropFactor > 0 && Number.isInteger(this.DropFactor)) {
                let dlDripRate: number = Math.Round(Convert.ToDouble(dTempInfRateInVolume) * Convert.ToDouble(this.DropFactor) * 2,0) / 2;
                // let dlDripRate: number = (((dTempInfRateInVolume) * Convert.ToDouble(this.DropFactor) * 2) / 2);
                if (dlDripRate == 0) {
                    this.DripRate = 0;  
                } else {
                this.DripRate = Math.Round(dlDripRate);
                }
                
            }
        }
    }
        else this.DripRate = null;
    }
    private CalculateInfConcentration(): void {
        // if (this.bIsDoseBasedInfusionRate == Visibility.Visible) {
            if (this.InfStrengthUOM != null && this.InfRateInDoseUOM != null && this.InfStrength > 0 && this.InfVolume > 0 && this.InfVolumeUOM != null) {
                let dTempInfConcentration: number = 0.0;
                let dTempInfStrength: number = 0.0;
                if (String.Compare(this.InfStrengthUOM.DisplayText, this.InfRateInDoseUOM.DisplayText) == 0) {
                    dTempInfConcentration = (Convert.ToDouble(this.InfStrength) / Convert.ToInt32(this.InfVolume));
                }
                else if (String.Compare(this.InfStrengthUOM.DisplayText, this.InfRateInDoseUOM.DisplayText) != 0) {
                    if ((String.Compare(this.InfStrengthUOM.DisplayText, "mg") == 0) && (String.Compare(this.InfRateInDoseUOM.DisplayText, "microgram") == 0))
                        dTempInfStrength = Convert.ToDouble(this.InfStrength) * 1000;
                    else if ((String.Compare(this.InfStrengthUOM.DisplayText, "microgram") == 0) && (String.Compare(this.InfRateInDoseUOM.DisplayText, "mg") == 0))
                        dTempInfStrength = Convert.ToDouble(this.InfStrength) / 1000;
                    dTempInfConcentration = (dTempInfStrength / Convert.ToInt32(this.InfVolume));
                }
                this.InfConcentration = (dTempInfConcentration > 0) ? dTempInfConcentration : null;
                this.InfConcentrationUOM = this.GetComboValue(this.InfRateInDoseUOM, this.InfStrengthUOMList);
                this.InfConcentrationPerUOM = this.GetComboValue(this.InfVolumeUOM, this.InfVolumeUOMList);
            }
            else {
                this.InfConcentration = null;
                this.InfConcentrationUOM = null;
                this.InfConcentrationPerUOM = null;
            }
        // }
    }
    public CalculateInfRate(): void {
    //revisitmeyasik
        // if (this.bIsDoseBasedInfusionRate == Visibility.Visible) {
            let NoValidate: boolean = false;
            if (this.InfStrength > 0 && this.InfStrengthUOM != null && this.InfVolume > 0 && this.InfVolumeUOM != null) {
                NoValidate = true;
            }
            if (this.InfRateInDose == null || this.InfRateInDose <= 0) {
                this.oMsgBox = ObjectHelper.CreateObject(new iMessageBox(), {
                    Title: Resource.InfusionChart.Lorenzo_Title,
                    Message: Resource.InfusionChart.InfRateInDose_Empty_Msg,
                    MessageButton: MessageBoxButton.OK,
                    IconType: MessageBoxType.Question,
                    Tag: "txtInfusionRate"
                });
                this.oMsgBox.MessageBoxClose = (s, e) => { this.oMsgBox_MessageBoxClose(s, e); };
                this.oMsgBox.Show();
            }
            else if (!NoValidate && (this.InfConcentration == null || this.InfConcentration <= 0)) {
                this.oMsgBox = ObjectHelper.CreateObject(new iMessageBox(), {
                    Title: Resource.InfusionChart.Lorenzo_Title,
                    Message: Resource.InfusionChart.InfConcentration_Empty_Msg,
                    MessageButton: MessageBoxButton.OK,
                    IconType: MessageBoxType.Question,
                    Tag: "txtConcentrationStrength"
                });
                this.oMsgBox.MessageBoxClose = (s, e) => { this.oMsgBox_MessageBoxClose(s, e); };
                this.oMsgBox.Show();
            }
            else {
                if (this.InfRateInDose != null && this.InfRateInDose > 0 && this.InfConcentration != null && this.InfConcentration > 0 && this.InfRateInDosePerUOM != null && this.InfConcentrationUOM != null) {
                    let dTempInfRateInVolume: number = 0.0;
                    dTempInfRateInVolume = this.InfRateInDose / this.InfConcentration;
                    if (String.Compare(this.InfRateInDosePerUOM.DisplayText, "hour") == 0) {
                        dTempInfRateInVolume = dTempInfRateInVolume;
                    }
                    else if (String.Compare(this.InfRateInDosePerUOM.DisplayText, "minute") == 0) {
                        dTempInfRateInVolume = dTempInfRateInVolume * 60;
                    }
                    else if (String.Compare(this.InfRateInDosePerUOM.DisplayText, "second") == 0) {
                        dTempInfRateInVolume = dTempInfRateInVolume * 3600;
                    }
                    // this.InfRateInVolume = Math.Round(Convert.ToDouble(dTempInfRateInVolume), 3);
                    this.InfRateInVolume = Math.Round(Convert.ToDouble(dTempInfRateInVolume), 3);
                    this.InfRateInVolumeUOM = this.GetComboValue(this.InfConcentrationPerUOM, this.InfVolumeUOMList);
                    this.InfRateInVolumePerUOM = this.GetComboValue(this.liForHour, this.InfRatePerUOMList);
                }
                else {
                    this.InfRateInVolume = null;
                    this.InfRateInVolumeUOM = null;
                    this.InfRateInVolumePerUOM = null;
                }
            }
        // }
    }
    private oMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        let sCtrlID: string = ObjectHelper.CreateType<string>(this.oMsgBox.Tag, "string");
        if (this.OnErrorEvent != null)
            this.OnErrorEvent(sCtrlID);
    }
    public GetComboValue(oListItem: CListItem, oListCollection: ObservableCollection<CListItem>): CListItem {
        if (oListItem != null && oListCollection != null) {
            let selectedVal: CListItem = null;
            for(let i=0; i<oListCollection.Count; i++){
                let oItem: CListItem = oListCollection[i];          
                if (oItem.Value == oListItem.Value) {
                    selectedVal = oItem;
                    break;
                }
             }
            if (!String.IsNullOrEmpty(oListItem.DisplayText)) {
                if (selectedVal != null) {
                    oListItem = selectedVal;
                }
            }
        }
        return oListItem;
    }
    public GetDefaultForVolTimeWeight(): void {
        let objService: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
        let objReq: CReqMsgGetUOMTypeList = new CReqMsgGetUOMTypeList();
        objReq.oContextInformation = CommonBB.FillContext();
        objReq.MCVersionNumberBC = AppSessionInfo.AMCV;
        objReq.UOMTypeBC = "volume,time,weight,compound,each";
        objService.GetUOMTypeListCompleted = (s, e) => { this.objService_GetUOMTypeListCompleted(s, e); };
        objService.GetUOMTypeListAsync(objReq);
    }
    objService_GetUOMTypeListCompleted(sender: Object, e: GetUOMTypeListCompletedEventArgs): void {
        if (e.Error != null) {
            AMSHelper.PublicExceptionDetails(7000001, "objService_GetUOMTypeListCompleted, LorAppMedicationAdminBBUI.dll", e.Error);
        }
        else {
            let objCResGetUOMTypeList: CResMsgGetUOMTypeList = e.Result;
            if (objCResGetUOMTypeList != null && objCResGetUOMTypeList.oUomTypeList != null && objCResGetUOMTypeList.oUomTypeList.Count > 0) {
                let nCount: number = objCResGetUOMTypeList.oUomTypeList.Count;
                let oCListItem: UomTypeList;
                this.InfRatePerUOMList = new ObservableCollection<CListItem>();
                this.liForHour = new CListItem();
                this.DripRateUOM = new CListItem();
                this.DripRatePerUOM = new CListItem();
                let tempDoseUOM: CListItem = new CListItem();
                let tempRateInVolUOM: CListItem = new CListItem();
                let tempRateInVolPerUOM: CListItem = new CListItem();
                if (this.InfStrengthUOM != null)
                    tempDoseUOM = this.InfStrengthUOM;
                if (this.InfRateInVolumeUOM != null)
                    tempRateInVolUOM = this.InfRateInVolumeUOM;
                if (this.InfRateInVolumePerUOM != null)
                    tempRateInVolPerUOM = this.InfRateInVolumePerUOM;
                let oUom: List<UomTypeList> = new List<UomTypeList>();
                for (let i: number = 0; i < nCount; i++) {
                    oCListItem = objCResGetUOMTypeList.oUomTypeList[i];
                    if (String.Compare(oCListItem.UOMTYCode, "volume") == 0) {
                        if (String.Compare(oCListItem.Name, this.temVolumeUOM) == 0) {
                            this.InfVolumeUOM = ObjectHelper.CreateObject(new CListItem(), { Value: oCListItem.UoMOID.ToString(), DisplayText: oCListItem.Name, Tag: oCListItem.LorenzoID });
                        }
                    }
                    else if (String.Compare(oCListItem.UOMTYCode, "time") == 0) {
                        oUom.Add(oCListItem);
                        if (String.Compare(oCListItem.LorenzoID, CConstants.hour) == 0)
                            this.liForHour = ObjectHelper.CreateObject(new CListItem(), { Value: oCListItem.UoMOID.ToString(), DisplayText: oCListItem.Name, Tag: oCListItem.LorenzoID });
                        if (String.Compare(oCListItem.LorenzoID, CConstants.minute) == 0)
                            this.DripRatePerUOM = ObjectHelper.CreateObject(new CListItem(), { Value: oCListItem.UoMOID.ToString(), DisplayText: oCListItem.Name, Tag: oCListItem.LorenzoID });
                    }
                    else if ((String.Compare(oCListItem.UOMTYCode, "each") == 0) && (String.Compare(oCListItem.LorenzoID, "UOM-35") == 0)) {
                        this.DripRateUOM = ObjectHelper.CreateObject(new CListItem(), { Value: oCListItem.UoMOID.ToString(), DisplayText: oCListItem.Name, Tag: oCListItem.LorenzoID });
                    }
                }
                let oUom1 = oUom.Where(s => String.Compare(s.UOMTYCode, "time", StringComparison.CurrentCultureIgnoreCase) == 0).OrderBy(s => s.UoMOID).ToArray();
                let nUomCount: number = oUom1.Count();
                for (let i: number = 0; i < nUomCount; i++) {
                    if (!String.IsNullOrEmpty(oUom1[i].Name) && (String.Equals(oUom1[i].LorenzoID, CConstants.hour) || String.Equals(oUom1[i].LorenzoID, CConstants.minute))) {
                        this.InfRatePerUOMList.Add(ObjectHelper.CreateObject(new CListItem(), { Value: oUom1[i].UoMOID.ToString(), DisplayText: oUom1[i].Name, Tag: oUom1[i].LorenzoID }));
                    }
                }
                if (tempDoseUOM != null) {
                    this.InfStrengthUOM = tempDoseUOM;
                }
                if (tempRateInVolUOM != null)
                    this.InfRateInVolumeUOM = tempRateInVolUOM;
                if (tempRateInVolPerUOM != null)
                    this.InfRateInVolumePerUOM = tempRateInVolPerUOM;
            }
        }
        this.CheckIfInfRateIsVolumeBased();
    }
    private GetMoreComboOption(): void {
        let objService: ManagePrescriptionWSSoapClient = new ManagePrescriptionWSSoapClient();
        objService.GetAllOptionsCompleted = (s, e) => { this.objService_GetAllOptionsCompleted(s, e); };
        let objAllRequest: CReqMsgGetAllOptions = new CReqMsgGetAllOptions();
        objAllRequest.IdentifyingOIDBC = this.IdentifyingOID;
        objAllRequest.IdentifyingTypeBC = this.IdentifyingType;
        objAllRequest.sOptionCodeBC = "ToDoseUOM";
        objAllRequest.MCVersionNoBC = AppSessionInfo.AMCV;
        objAllRequest.oContextInformation = CommonBB.FillContext();
        objService.GetAllOptionsAsync(objAllRequest);
    }
    objService_GetAllOptionsCompleted(sender: Object, e: GetAllOptionsCompletedEventArgs): void {
        let _ErrorID: number = 80000046;
        let _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:BasicDetailsVM, Method:objService_GetAllOptionsCompleted()";
        if (e.Error == null) {
            try {
                let objResponse: CResMsgGetAllOptions = e.Result;
                if (objResponse != null && objResponse.oValues != null && objResponse.oValues.Count > 0) {
                    this.InfStrengthUOMList = new ObservableCollection<CListItem>();
                    for (let i: number = 0; i < objResponse.oValues.Count; i++) {
                        if (!String.IsNullOrEmpty(objResponse.oValues[i].Name) && !String.Equals(objResponse.oValues[i].SealImageList, CConstants.CompositeUOM)) {
                            this.InfStrengthUOMList.Add(ObjectHelper.CreateObject(new CListItem(), {
                                DisplayText: objResponse.oValues[i].Name,
                                Value: objResponse.oValues[i].Code.ToString()
                            }));
                        }
                    }
                }
            }
            catch (ex: any) {
                let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
            }

        }
        else {
            let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
        }
    }
    public LaunchDoseCalculator(): void {
        let oParam: string[] = new Array(7);
        oParam[0] = this.IdentifyingOID.ToString();
        oParam[1] = this.IdentifyingType;
        oParam[2] = this.PresItemOID.ToString();
        oParam[3] = this.InfStrength.ToString();
        let dtempWeight: number = 0.0;
        let dtempDose: number = 0.0;
        if (this.InfStrengthUOM != null) {
            oParam[4] = this.InfStrengthUOM.Value;
            oParam[5] = this.InfStrengthUOM.DisplayText;
        }
        else {
            oParam[4] = String.Empty;
            oParam[5] = String.Empty;
        }
        oParam[6] = this.DoseTypeValue;
        let returnValue: any = HtmlPage.Window.Invoke("OpenDoseCalculator", oParam);
        if (returnValue != null) {
            let arrReturnValue: string[] = returnValue.ToString().Split(';');
            if (arrReturnValue.length > 0) {
                dtempDose = Convert.ToDouble(arrReturnValue[11]);
                if (this.InfStrength > 0 && dtempDose > 0) {
                    dtempWeight = dtempDose / Convert.ToDouble(this.InfStrength);
                }
                this.InfStrength = dtempDose;
                let temDoseUOM: CListItem = ObjectHelper.CreateObject(new CListItem(), { DisplayText: arrReturnValue[8], Value: arrReturnValue[7] });
                this.InfStrengthUOM = this.GetComboValue(temDoseUOM, this.InfStrengthUOMList);
                this.InfRateInDose = this.InfRateInDose * dtempWeight;
            }
        }
    }
    private DisposeVMObjects(): void {
        this.oBtnCalculateClick = null;
        this.oBtnDoseCalClick = null;
    }
    public DoCleanUP(): void {
        this.DisposeVMObjects();
    }
}
