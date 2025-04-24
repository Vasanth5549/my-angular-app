import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, List ,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType} from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from '../../shared/epma-platform/soap-client/helper.service';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import {Resource}  from '../resource'
import { GPcStatus} from '../utilities/constants'
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { Visibility } from 'epma-platform/models';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
  
    export class GPConnectAddlDetailVM extends ViewModelBase {
        private _DrugName: string;
        public get DrugName(): string {
            return this._DrugName;
        }
        public set DrugName(value: string) {
            if (this._DrugName != value) {
                this._DrugName = value;
            }
        }
        private _SnomedCode: string;
        public get SnomedCode(): string {
            return this._SnomedCode;
        }
        public set SnomedCode(value: string) {
            if (this._SnomedCode != value) {
                this._SnomedCode = value;
            }
        }
        private _DosageText: string;
        public get DosageText(): string {
            return this._DosageText;
        }
        public set DosageText(value: string) {
            if (this._DosageText != value) {
                this._DosageText = value;
            }
        }
        private _LastIssuedDate: DateTime = DateTime.MinValue;
        public get LastIssuedDate(): DateTime{
            return this._LastIssuedDate;
        }
        public set LastIssuedDate(value: DateTime) {
            if (this._LastIssuedDate != value) {
                this._LastIssuedDate = value;
            }
        }
        public get LastIssuedDateText(): string {
            //if (this._LastIssuedDate <= DateTime.MinValue)
            if (DateTime.LessThanOrEqualTo(this._LastIssuedDate,DateTime.MinValue))         
                return String.Empty;
            else return this._LastIssuedDate.ToString("dd-MMM-yyyy");
            ;
        }
        private _CareSettingName: string;
        public get CareSettingName(): string {
            return this._CareSettingName;
        }
        public set CareSettingName(value: string) {
            if (this._CareSettingName != value) {
                this._CareSettingName = value;
            }
        }
        private _Status: string;
        public get Status(): string {
            return this._Status;
        }
        public set Status(value: string) {
            if (this._Status != value) {
                this._Status = value;
            }
        }
        public get StatusVisibility(): Visibility {
            if (!String.IsNullOrEmpty(this.ItemTypeCode) && this.ItemTypeCode.StartsWith("acute", StringComparison.OrdinalIgnoreCase) && !String.IsNullOrEmpty(this.Status) && (this.Status.Equals("Active", StringComparison.OrdinalIgnoreCase) || this.Status.Equals("Completed", StringComparison.OrdinalIgnoreCase))) {
                return Visibility.Collapsed;
            }
            else {
                return Visibility.Visible;
            }
        }
        private _EncounterName: string;
        public get EncounterName(): string {
            return this._EncounterName;
        }
        public set EncounterName(value: string) {
            if (this._EncounterName != value) {
                this._EncounterName = value;
            }
        }
        private _Intent: string;
        public get Intent(): string {
            return this._Intent;
        }
        public set Intent(value: string) {
            if (this._Intent != value) {
                this._Intent = value;
            }
        }
        private _Quantity: string;
        public get Quantity(): string {
            return this._Quantity;
        }
        public set Quantity(value: string) {
            if (this._Quantity != value) {
                this._Quantity = value;
            }
        }
        public get RepeatStartAndEnd(): string {
            let sRepeatFromAndToDate: string = !String.IsNullOrEmpty(Resource.Medlistdetails.GPConnAddlDtl_RepeatFromAndToDate) ? Resource.Medlistdetails.GPConnAddlDtl_RepeatFromAndToDate : "to";
            let sb: StringBuilder = new StringBuilder();
            if (!String.IsNullOrEmpty(this._PrescriptionType)) {
                sb.Append(this._PrescriptionType);
                if (!String.IsNullOrEmpty(this.StartDateText) || !String.IsNullOrEmpty(this.EndDateText)) {
                    sb.Append(" - ");
                }
            }
            if (!String.IsNullOrEmpty(this.StartDateText)) {
                sb.Append(this.StartDateText);
                if (!String.IsNullOrEmpty(this.EndDateText)) {
                    sb.Append(" " + sRepeatFromAndToDate + " " + this.EndDateText);
                }
            }
            return sb.ToString();
        }
        private _StatusChangedDate: DateTime = DateTime.MinValue;
        public get StatusChangedDate(): DateTime{
            return this._StatusChangedDate;
        }
        public set StatusChangedDate(value: DateTime) {
            if (this._StatusChangedDate != value) {
                this._StatusChangedDate = value;
            }
        }
        public get StatusChangedDateText(): string {
            // if (!ObjectHelper.HasValue(this._StatusChangedDate) || this._StatusChangedDate == DateTime.MinValue)
            if (!ObjectHelper.HasValue(this._StatusChangedDate) || DateTime.Equals(this._StatusChangedDate,DateTime.MinValue))  
            
                return String.Empty;
            else return this._StatusChangedDate.Value.ToString("dd-MMM-yyyy");
        }
        private _StatusReason: string;
        public get StatusReason(): string {
            return this._StatusReason;
        }
        public set StatusReason(value: string) {
            if (this._StatusReason != value) {
                this._StatusReason = value;
            }
        }
        public get StatusChangeDetails(): string {
            let sb: StringBuilder = new StringBuilder();
            if (!String.IsNullOrEmpty(this.Status) && this.Status != GPcStatus.Active && (this.Status != GPcStatus.Completed || String.IsNullOrEmpty(this.ItemTypeCode) || !this.ItemTypeCode.StartsWith("acute", StringComparison.OrdinalIgnoreCase))) {
                sb.Append(this.Status);
                if (!String.IsNullOrEmpty(this.StatusChangedDateText)) {
                    sb.Append(" on ");
                    sb.Append(this.StatusChangedDateText);
                }
                if (!String.IsNullOrEmpty(this.StatusReason)) {
                    sb.Append(" Reason ");
                    sb.Append(this.StatusReason);
                }
            }
            return sb.ToString();
        }
        private _PrescriptionType: string;
        public get PrescriptionType(): string {
            return this._PrescriptionType;
        }
        public set PrescriptionType(value: string) {
            if (this._PrescriptionType != value) {
                this._PrescriptionType = value;
            }
        }
        private _StartDate: DateTime = DateTime.MinValue;
        public get StartDate(): DateTime{
            return this._StartDate;
        }
        public set StartDate(value: DateTime) {
            if (this._StartDate != value) {
                this._StartDate = value;
            }
        }
        public get StartDateText(): string {
            // if (this._StartDate == DateTime.MinValue)
            if (DateTime.Equals(this._StartDate,DateTime.MinValue))
                return String.Empty;
            else return this._StartDate.ToString("dd-MMM-yyyy");
        }
        private _EndDate: DateTime =  DateTime.MinValue;
        public get EndDate(): DateTime{
            return this._EndDate;
        }
        public set EndDate(value: DateTime) {
            if (this._EndDate != value) {
                this._EndDate = value;
            }
        }
        public get EndDateText(): string {
            // if (!ObjectHelper.HasValue(this._EndDate) || this._EndDate.Value == DateTime.MinValue)
            if (!ObjectHelper.HasValue(this._EndDate) || DateTime.Equals(this._EndDate.Value,DateTime.MinValue))
                return String.Empty;
            else return this._EndDate.Value.ToString("dd-MMM-yyyy");
        }
        private _Dosage: string;
        public get Dosage(): string {
            return this._Dosage;
        }
        public set Dosage(value: string) {
            if (this._Dosage != value) {
                this._Dosage = value;
            }
        }
        private _PatientInstructions: string;
        public get PatientInstructions(): string {
            return this._PatientInstructions;
        }
        public set PatientInstructions(value: string) {
            if (this._PatientInstructions != value) {
                this._PatientInstructions = value;
            }
        }
        private _NoOfRepeatsAllowed: number = 0;
        public get NoOfRepeatsAllowed(): number {
            return this._NoOfRepeatsAllowed;
        }
        public set NoOfRepeatsAllowed(value: number) {
            this._NoOfRepeatsAllowed = value;
        }
        private _NoOfRepeatsIssued: number = 0;
        public get NoOfRepeatsIssued(): number {
            return this._NoOfRepeatsIssued;
        }
        public set NoOfRepeatsIssued(value: number) {
            this._NoOfRepeatsIssued = value;
        }
        private _DosageLastChanged: DateTime =  DateTime.MinValue;
        public get DosageLastChanged(): DateTime{
            return this._DosageLastChanged;
        }
        public set DosageLastChanged(value: DateTime) {
            this._DosageLastChanged = value;
        }
        public get DosageLastChangedText(): string {
            // if (this._DosageLastChanged <= DateTime.MinValue)
            if (DateTime.LessThanOrEqualTo(this._DosageLastChanged,DateTime.MinValue))
                return String.Empty;
            else return this._DosageLastChanged.ToString("dd-MMM-yyyy");
        }
        private _DispenseDetails: List<GPConnectDispenseDetail>;
        public get DispenseDetails(): List<GPConnectDispenseDetail> {
            return this._DispenseDetails;
        }
        public set DispenseDetails(value: List<GPConnectDispenseDetail>) {
            if (ObjectHelper.ReferenceEquals(this._DispenseDetails, value) != true) {
                this._DispenseDetails = value;
            }
        }
        public ItemTypeCode: string;
    }
    export class GPConnectDispenseDetail {
        private _StartDate: DateTime =  DateTime.MinValue;
        public get StartDate(): DateTime{
            return this._StartDate;
        }
        public set StartDate(value: DateTime) {
            if (this._StartDate != value) {
                this._StartDate = value;
            }
        }
        public get StartDateText(): string {
            //if (this._StartDate == DateTime.MinValue)
	    if (DateTime.LessThanOrEqualTo(this.StartDate,DateTime.MinValue))
                return String.Empty;
            else return this._StartDate.ToString("dd-MMM-yyyy");
            ;
        }
        private _EndDate: DateTime =  DateTime.MinValue;
        public get EndDate(): DateTime{
            return this._EndDate;
        }
        public set EndDate(value: DateTime) {
            if (this._EndDate != value) {
                this._EndDate = value;
            }
        }
        public get EndDateText(): string {
            // if (!ObjectHelper.HasValue(this._EndDate) || this._EndDate <= DateTime.MinValue)
            if (!ObjectHelper.HasValue(this._EndDate) || (DateTime.LessThanOrEqualTo(this._EndDate,DateTime.MinValue)))
                return String.Empty;
            else return this._EndDate.Value.ToString("dd-MMM-yyyy");
            ;
        }
        private _Quantity: string;
        public get Quantity(): string {
            return this._Quantity;
        }
        public set Quantity(value: string) {
            if (this._Quantity != value) {
                this._Quantity = value;
            }
        }
        private _DosageInstruction: string;
        public get DosageInstruction(): string {
            return this._DosageInstruction != null ? this._DosageInstruction : String.Empty;
        }
        public set DosageInstruction(value: string) {
            if (this._DosageInstruction != value) {
                this._DosageInstruction = value;
            }
        }
        public get DateRangeText(): string {
            return (this.StartDateText + " - " + this.EndDateText) + ":";
        }
    }