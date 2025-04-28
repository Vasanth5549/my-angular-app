import { CListItem } from "epma-platform/models";
import { Convert, StringBuilder } from "epma-platform/services";
import { ClonableViewModelBase } from "src/app/lorappmedicationcommonbb/model/cloneviewmodel";

export class ConditionalDose extends ClonableViewModelBase {
        private _lowerRange: string;
        private _upperRange: string;
        private _rangeUoM: CListItem;
        private _dose: string;
        private _upperdose: string;
        private _doseUoM: CListItem;
        private _instruction: string;
        private _observationResult: string;
        private _valueRange: string;
        private _doseInstruction: string;
        private _doseValueType: string;
        private _infusionFlag: boolean;
        private _infusionrate: string;
        private _infusionUpperrate: string;
        private _infratenumeratoruom: CListItem;
        private _infrateDenominatoruom: CListItem;
        private _rangeOperator: CListItem;
        private _isenableUpperRange: boolean = false;
        public get ObservationResult(): string {
            return this._observationResult;
        }
        public set ObservationResult(value: string) {
            this._observationResult = value;
            //NotifyPropertyChanged("ObservationResult");
        }
        public get ValueRange(): string {
            return this._valueRange;
        }
        public set ValueRange(value: string) {
            if (String.Compare(this._valueRange, value) != 0) {
                this._valueRange = value;
                //NotifyPropertyChanged("ValueRange");
            }
        }
        public get DoseInstruction(): string {
            return this._doseInstruction;
        }
        public set DoseInstruction(value: string) {
            if (String.Compare(this._doseInstruction, value) != 0) {
                this._doseInstruction = value;
                //NotifyPropertyChanged("DoseInstruction");
            }
        }
        private SetDoseInstruction(): void {
            let strBuild: StringBuilder = new StringBuilder();
            if (!String.IsNullOrEmpty(this._dose))
                strBuild.Append(this._dose);
            if (!String.IsNullOrEmpty(this._upperdose)) {
                strBuild.Append(Convert.ToChar(45));
                strBuild.Append(this._upperdose);
            }
            if (this._doseUoM != null && !String.IsNullOrEmpty(this._doseUoM.DisplayText)) {
                strBuild.Append(Convert.ToChar(160));
                strBuild.Append(this._doseUoM.DisplayText);
            }
            if (this._infusionFlag) {
                if (!String.IsNullOrEmpty(this._infusionrate)) {
                    if (strBuild != null && strBuild.Length > 0 && !String.IsNullOrEmpty(strBuild.ToString())) {
                        strBuild.Append(Convert.ToChar(44));
                        strBuild.Append(Convert.ToChar(160));
                    }
                    strBuild.Append(this._infusionrate);
                    if (!String.IsNullOrEmpty(this._infusionUpperrate)) {
                        strBuild.Append(" - ");
                        strBuild.Append(this._infusionUpperrate);
                    }
                    strBuild.Append(Convert.ToChar(160));
                    if (this._infratenumeratoruom != null && !String.IsNullOrEmpty(this._infratenumeratoruom.Value))
                        strBuild.Append(this._infratenumeratoruom.DisplayText);
                    if (this._infrateDenominatoruom != null && !String.IsNullOrEmpty(this._infrateDenominatoruom.Value)) {
                        strBuild.Append(Convert.ToChar(47));
                        strBuild.Append(this._infrateDenominatoruom.DisplayText);
                    }
                }
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
            if (((this._rangeOperator != null) && (!String.IsNullOrEmpty(this._rangeOperator.DisplayText)))) {
                strBuild.Append(this._rangeOperator.DisplayText);
            }
            if (!String.IsNullOrEmpty(this._lowerRange))
                strBuild.Append(this._lowerRange);
            if (!String.IsNullOrEmpty(this._upperRange)) {
                strBuild.Append(Convert.ToChar(160));
                strBuild.Append("-");
                strBuild.Append(Convert.ToChar(160));
                strBuild.Append(this._upperRange);
            }
            if (this._rangeUoM != null && !String.IsNullOrEmpty(this._rangeUoM.DisplayText)) {
                strBuild.Append(Convert.ToChar(160));
                strBuild.Append(this._rangeUoM.DisplayText);
            }
            this.ValueRange = strBuild.ToString();
        }
        public get LowerRange(): string {
            return this._lowerRange;
        }
        public set LowerRange(value: string) {
            if (String.Compare(this._lowerRange, value) != 0) {
                this._lowerRange = value;
                //NotifyPropertyChanged("LowerRange");
                this.SetValueRange();
            }
        }
        public get UpperRange(): string {
            return this._upperRange;
        }
        public set UpperRange(value: string) {
            if (String.Compare(this._upperRange, value) != 0) {
                this._upperRange = value;
                //NotifyPropertyChanged("UpperRange");
                this.SetValueRange();
            }
        }
        public get RangeUoM(): CListItem {
            return this._rangeUoM;
        }
        public set RangeUoM(value: CListItem) {
            if (value != this._rangeUoM) {
                this._rangeUoM = value;
                //NotifyPropertyChanged("RangeUoM");
                this.SetValueRange();
            }
        }
        public get DoseValueType(): string {
            return this._doseValueType;
        }
        public set DoseValueType(value: string) {
            if (!String.Equals(this._doseValueType, value)) {
                this._doseValueType = value;
                this.SetDoseInstruction();
            }
        }
        public get Dose(): string {
            return this._dose;
        }
        public set Dose(value: string) {
            if (String.Compare(this._dose, value) != 0) {
                this._dose = value;
                //NotifyPropertyChanged("Dose");
                this.SetDoseInstruction();
            }
        }
        public get UpperDose(): string {
            return this._upperdose;
        }
        public set UpperDose(value: string) {
            if (String.Compare(this._upperdose, value) != 0) {
                this._upperdose = value;
                //NotifyPropertyChanged("UpperDose");
                this.SetDoseInstruction();
            }
        }
        public get DoseUoM(): CListItem {
            return this._doseUoM;
        }
        public set DoseUoM(value: CListItem) {
            if (value != this._doseUoM) {
                this._doseUoM = value;
                //NotifyPropertyChanged("DoseUoM");
                this.SetDoseInstruction();
                if (value != null && value.Value == "CC_More") {
                    value.DisplayText = '';
                }
            }
        }
        public get Instruction(): string {
            return this._instruction;
        }
        public set Instruction(value: string) {
            if (String.Compare(this._instruction, value) != 0) {
                this._instruction = value;
                //NotifyPropertyChanged("Instruction");
                this.SetDoseInstruction();
            }
        }
        public get InfusionFlag(): boolean {
            return this._infusionFlag;
        }
        public set InfusionFlag(value: boolean) {
            this._infusionFlag = value;
            //NotifyPropertyChanged("InfusionFlag");
        }
        public get RangeOperator(): CListItem {
            return this._rangeOperator;
        }
        public set RangeOperator(value: CListItem) {
            if (value != this._rangeOperator) {
                this._rangeOperator = value;
                //NotifyPropertyChanged("RangeOperator");
                this.SetValueRange();
            }
        }
        public get InfrateDenominatoruom(): CListItem {
            return this._infrateDenominatoruom;
        }
        public set InfrateDenominatoruom(value: CListItem) {
            if (value != this._infrateDenominatoruom) {
                this._infrateDenominatoruom = value;
                //NotifyPropertyChanged("InfrateDenominatoruom");
                this.SetDoseInstruction();
            }
        }
        public get Infratenumeratoruom(): CListItem {
            return this._infratenumeratoruom;
        }
        public set Infratenumeratoruom(value: CListItem) {
            if (value != this._infratenumeratoruom) {
                this._infratenumeratoruom = value;
                //NotifyPropertyChanged("Infratenumeratoruom");
                this.SetDoseInstruction();
            }
        }
        public get Infusionrate(): string {
            return this._infusionrate;
        }
        public set Infusionrate(value: string) {
            if (String.Compare(this._infusionrate, value) != 0) {
                this._infusionrate = value;
                //NotifyPropertyChanged("Infusionrate");
                this.SetDoseInstruction();
            }
        }
        public get InfusionUpperrate(): string {
            return this._infusionUpperrate;
        }
        public set InfusionUpperrate(value: string) {
            if (String.Compare(this._infusionUpperrate, value) != 0) {
                this._infusionUpperrate = value;
                //NotifyPropertyChanged("InfusionUpperrate");
                this.SetDoseInstruction();
            }
        }
        public get IsenableUpperRange(): boolean {
            return this._isenableUpperRange;
        }
        public set IsenableUpperRange(value: boolean) {
            this._isenableUpperRange = value;
            //NotifyPropertyChanged("IsenableUpperRange");
        }
    }
    export enum DoseState {
        Added="Added",

        Updated="Updated",

        Removed="Removed"
    }
    export class SubsetDetails {
        lnSubsetID: string;
        IsConstraining: boolean;
        SubsetAssociation: string;
        SubsetID: string;
    }
    export class DataItemDetails {
        DataitemOID: number;
        RetrieveChildren: boolean;
        TypeValue: string;
    }