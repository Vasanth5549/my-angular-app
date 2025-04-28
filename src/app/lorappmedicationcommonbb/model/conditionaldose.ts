import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ClonableViewModelBase } from '../model/cloneviewmodel';

    export class ConditionalDose extends ClonableViewModelBase {
        private _lowerRange: string;
        private _upperRange: string;
        private _rangeUoM: string;
        private _dose: string;
        private _upperdose: string;
        private _doseUoM: string;
        private _doseUoMOID: number;
        private _instruction: string;
        private _observationResult: string;
        private _valueRange: string;
        private _doseInstruction: string;
        private _MonitoringPerid: string;
        private _RangeOperator: string;
        private _InfRate: string;
        private _InfUpperRate: string;
        private _InfNumUOM: string;
        private _InfDenumUOM: string;
        private _InfNumUoMOID: number;
        private _InfDenumUoMOID: number;
        public get InfRate(): string {
            return this._InfRate;
        }
        public set InfRate(value: string) {
            this._InfRate = value;
            this.SetDoseInstruction();
        }
        public get InfUpperRate(): string {
            return this._InfUpperRate;
        }
        public set InfUpperRate(value: string) {
            this._InfUpperRate = value;
            this.SetDoseInstruction();
        }
        public get InfNumUOM(): string {
            return this._InfNumUOM;
        }
        public set InfNumUOM(value: string) {
            this._InfNumUOM = value;
            this.SetDoseInstruction();
        }
        public get InfDenumUOM(): string {
            return this._InfDenumUOM;
        }
        public set InfDenumUOM(value: string) {
            this._InfDenumUOM = value;
            this.SetDoseInstruction();
        }
        public get MonitoringPerid(): string {
            return this._MonitoringPerid;
        }
        public set MonitoringPerid(value: string) {
            this._MonitoringPerid = value;
        }
        public get RangeOperator(): string {
            return this._RangeOperator;
        }
        public set RangeOperator(value: string) {
            this._RangeOperator = value;
            this.SetValueRange();
        }
        public get LowerRange(): string {
            return this._lowerRange;
        }
        public set LowerRange(value: string) {
            this._lowerRange = value;
            this.SetValueRange();
        }
        public get UpperRange(): string {
            return this._upperRange;
        }
        public set UpperRange(value: string) {
            this._upperRange = value;
            this.SetValueRange();
        }
        public get RangeUoM(): string {
            return this._rangeUoM;
        }
        public set RangeUoM(value: string) {
            this._rangeUoM = value;
            this.SetValueRange();
        }
        public get Dose(): string {
            return this._dose;
        }
        public set Dose(value: string) {
            this._dose = value;
            this.SetDoseInstruction();
        }
        public get UpperDose(): string {
            return this._upperdose;
        }
        public set UpperDose(value: string) {
            this._upperdose = value;
            this.SetDoseInstruction();
        }
        public get DoseUoM(): string {
            return this._doseUoM;
        }
        public set DoseUoM(value: string) {
            this._doseUoM = value;
            this.SetDoseInstruction();
        }
        public get DoseUoMOID(): number {
            return this._doseUoMOID;
        }
        public set DoseUoMOID(value: number) {
            this._doseUoMOID = value;
        }
        public get Instruction(): string {
            return this._instruction;
        }
        public set Instruction(value: string) {
            this._instruction = value;
            this.SetDoseInstruction();
        }
        public get ObservationResult(): string {
            return this._observationResult;
        }
        public set ObservationResult(value: string) {
            this._observationResult = value;            
        }
        public get ValueRange(): string {
            return this._valueRange;
        }
        public set ValueRange(value: string) {
            if (String.Compare(this._valueRange, value) != 0) {
                this._valueRange = value;
                
            }
        }
        public get DoseInstruction(): string {
            return this._doseInstruction;
        }
        public set DoseInstruction(value: string) {
            if (String.Compare(this._doseInstruction, value) != 0) {
                this._doseInstruction = value;
                
            }
        }
        public get InfNumUoMOID(): number {
            return this._InfNumUoMOID;
        }
        public set InfNumUoMOID(value: number) {
            this._InfNumUoMOID = value;
        }
        public get InfDenumUMOID(): number {
            return this._InfDenumUoMOID;
        }
        public set InfDenumUMOID(value: number) {
            this._InfDenumUoMOID = value;
        }
        private SetDoseInstruction(): void {
            let strBuild: StringBuilder = new StringBuilder();
            if (!String.IsNullOrEmpty(this._dose)) {
                strBuild.Append(this._dose);
                if (!String.IsNullOrEmpty(this._upperdose)) {
                    strBuild.Append(Convert.ToChar(45));
                    strBuild.Append(this._upperdose);
                }
                if (!String.IsNullOrEmpty(this._doseUoM)) {
                    strBuild.Append(Convert.ToChar(160));
                    strBuild.Append(this._doseUoM);
                }
                if (!String.IsNullOrEmpty(this._InfRate)) {
                    if (!String.IsNullOrEmpty(this._dose)) {
                        strBuild.Append(",");
                    }
                    strBuild.Append(Convert.ToChar(160));
                    strBuild.Append(this._InfRate);
                    if (!String.IsNullOrEmpty(this._InfUpperRate)) {
                        strBuild.Append(Convert.ToChar(160));
                        strBuild.Append("-");
                        strBuild.Append(Convert.ToChar(160));
                        strBuild.Append(this._InfUpperRate);
                    }
                    strBuild.Append(Convert.ToChar(160));
                    strBuild.Append(this._InfNumUOM);
                    strBuild.Append("/");
                    strBuild.Append(this._InfDenumUOM);
                }
            }
            else if (!String.IsNullOrEmpty(this._InfRate)) {
                if (!String.IsNullOrEmpty(this._dose)) {
                    strBuild.Append(",");
                }
                strBuild.Append(this._InfRate);
                if (!String.IsNullOrEmpty(this._InfUpperRate)) {
                    strBuild.Append(Convert.ToChar(160));
                    strBuild.Append("-");
                    strBuild.Append(Convert.ToChar(160));
                    strBuild.Append(this._InfUpperRate);
                }
                strBuild.Append(Convert.ToChar(160));
                strBuild.Append(this._InfNumUOM);
                strBuild.Append("/");
                strBuild.Append(this._InfDenumUOM);
            }
            if (!String.IsNullOrEmpty(this._instruction)) {
                if (strBuild.Length > 0) {
                    strBuild.Append(Convert.ToChar(160));
                    strBuild.Append(Convert.ToChar(45));
                    strBuild.Append(Convert.ToChar(160));
                }
                strBuild.Append(this._instruction);
            }
            this.DoseInstruction = strBuild.ToString();
        }
        private SetValueRange(): void {
            let strBuild: StringBuilder = new StringBuilder();
            if (!String.IsNullOrEmpty(this._RangeOperator)) {
                strBuild.Append(this._RangeOperator);
                strBuild.Append(Convert.ToChar(160));
            }
            if (!String.IsNullOrEmpty(this._lowerRange))
                strBuild.Append(this._lowerRange);
            if (!String.IsNullOrEmpty(this._upperRange)) {
                strBuild.Append(Convert.ToChar(160));
                strBuild.Append("-");
                strBuild.Append(Convert.ToChar(160));
                strBuild.Append(this._upperRange);
            }
            if (this._rangeUoM != null && !String.IsNullOrEmpty(this._rangeUoM)) {
                strBuild.Append(Convert.ToChar(160));
                strBuild.Append(this._rangeUoM);
            }
            this.ValueRange = strBuild.ToString();
        }
    }