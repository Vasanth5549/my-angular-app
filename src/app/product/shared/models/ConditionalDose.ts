import { CListItem } from "epma-platform/models";

export class ConditionalDose
{
    private _lowerRange = '';
    private _upperRange = '';
    private _rangeUoM: CListItem = new CListItem();
    private _dose = '';
    private _upperdose = '';
    private _doseUoM: CListItem = new CListItem();
    private _doseUoMOID = 0;
    private _instruction = '';
    private _observationResult = '';
    private _valueRange = '';
    private _doseInstruction = '';
    private _doseValueType = '';
    private _infusionFlag = false;
    private _infusionrate = '';
    private _InfRate = '';
    private _InfUpperRate = '';
    private _InfNumUOM = '';
    private _InfDenumUOM = '';
    private _InfNumUoMOID = 0;
    private _InfDenumUoMOID = 0;
    
    private _infusionUpperrate = '';
    private _infratenumeratoruom: CListItem = new CListItem();
    private _infrateDenominatoruom: CListItem = new CListItem();
    private _rangeOperator: CListItem = new CListItem();
    private _isenableUpperRange = false;

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
        if ((this._valueRange.toUpperCase() != value.toUpperCase())){
            this._valueRange = value;
        }
    }

    public get DoseInstruction(): string {
        return this._doseInstruction;
    }
    public set DoseInstruction(value: string) {
        if ((this._doseInstruction.toUpperCase() != value.toUpperCase())){
            this._doseInstruction = value;
        }
    }

    public get DoseUoMOID(): number {
        return this._doseUoMOID;
    }
    public set DoseUoMOID(value: number) {
        this._doseUoMOID = value;
    }

    public get InfRate(): string {
        return this._InfRate;
    }
    public set InfRate(value: string) {
        this._InfRate = value;
    }

    public get InfUpperRate(): string {
        return this._InfUpperRate;
    }
    public set InfUpperRate(value: string) {
        this._InfUpperRate = value;
    }

    public get InfNumUOM(): string {
        return this._InfNumUOM;
    }
    public set InfNumUOM(value: string) {
        this._InfNumUOM = value;
    }

    public get InfDenumUOM(): string {
        return this._InfDenumUOM;
    }
    public set InfDenumUOM(value: string) {
        this._InfDenumUOM = value;
    }
    
    public get InfNumUoMOID(): number {
        return this._InfNumUoMOID;
    }
    public set InfNumUoMOID(value: number) {
        this._InfNumUoMOID = value;
    }

    public get InfDenumUoMOID(): number {
        return this._InfDenumUoMOID;
    }
    public set InfDenumUoMOID(value: number) {
        this._InfDenumUoMOID = value;
    }

    public get InfDenumUMOID(): number {
        return this._InfDenumUoMOID;
    }
    public set InfDenumUMOID(value: number) {
        this._InfDenumUoMOID = value;
    }

    private SetDoseInstruction(){
        let strBuild = '';
        if (this._dose != null && this._dose != '')
            strBuild += this._dose;

        if (this._upperdose != null && this._upperdose != ''){
            strBuild += String.fromCharCode(45);
            strBuild += this._upperdose;
        }

        if (this._doseUoM != null && (this._doseUoM.DisplayText != null && this._doseUoM.DisplayText != '')){
            strBuild += String.fromCharCode(160);
            strBuild += this._doseUoM.DisplayText;
        }

        if(this._infusionFlag){
            if (this._infusionrate != null && this._infusionrate != ''){
                if (strBuild != null && strBuild.length > 0 && (strBuild.toString() != null && strBuild.toString() != '')){
                    strBuild += String.fromCharCode(44);
                    strBuild += String.fromCharCode(160);
                }
                
                strBuild += this._infusionrate;
                
                if (this._infusionUpperrate != null && this._infusionUpperrate != ''){
                    strBuild += " - ";
                    strBuild += this._infusionUpperrate;
                }

                strBuild += String.fromCharCode(160);

                if (this._infratenumeratoruom != null && (this._infratenumeratoruom.Value != null && this._infratenumeratoruom.Value != ''))
                    strBuild += this._infratenumeratoruom.DisplayText;

                if (this._infrateDenominatoruom != null && (this._infrateDenominatoruom.Value != null && this._infrateDenominatoruom.Value != '')){
                    strBuild += String.fromCharCode(47);
                    strBuild += this._infrateDenominatoruom.DisplayText;
                }
            } 
        } 
        
        if (this._instruction != null && this._instruction != ''){
            if (strBuild.length > 0){
                strBuild += String.fromCharCode(160);
                strBuild += String.fromCharCode(45);
                strBuild += String.fromCharCode(160);
            }
            strBuild += this._instruction;
        }
                
        this.DoseInstruction = strBuild.toString();     
        
    }


    private SetValueRange(){
        let strBuild = '';
        if ((this._rangeOperator != null) && (this._rangeOperator.DisplayText != null && this._rangeOperator.DisplayText != '')){
            strBuild += this._rangeOperator.DisplayText;
        }
        
        if (this._lowerRange != null && this._lowerRange != '')
            strBuild += this._lowerRange;

        if (this._upperRange != null && this._upperRange != ''){
            strBuild += String.fromCharCode(160);
            strBuild += "-";
            strBuild += String.fromCharCode(160);
            strBuild += this._upperRange;
        }

        if (this._rangeUoM != null && (this._rangeUoM.DisplayText != null && this._rangeUoM.DisplayText != '')){
            strBuild += String.fromCharCode(160);
            strBuild += this._rangeUoM.DisplayText;
        }

        this.ValueRange = strBuild.toString();
    }
        
   
    public get LowerRange(): string {
        return this._lowerRange;
    }
    public set LowerRange(value: string) {
        if ((this._lowerRange.toUpperCase() != value.toUpperCase())){
            this._lowerRange = value;
        }
    }

    public get UpperRange(): string {
        return this._upperRange;
    }
    public set UpperRange(value: string) {
        if ((this._upperRange.toUpperCase() != value.toUpperCase())){
            this._upperRange = value;
            this.SetValueRange();
        }
    }

    public get RangeUoM(): CListItem {
        return this._rangeUoM;
    }
    public set RangeUoM(value: CListItem) {
        if (this._rangeUoM != value){
            this._rangeUoM = value;
            this.SetValueRange();
        }
    }

    public get DoseValueType(): string {
        return this._doseValueType;
    }
    public set DoseValueType(value: string) {
        if (!(this._doseValueType == value)){
            this._doseValueType = value;
            this.SetDoseInstruction();
        }
    }

    public get Dose(): string {
        return this._dose;
    }
    public set Dose(value: string) {
        if ((this._dose.toUpperCase() != value.toUpperCase())){
            this._dose = value;
            this.SetDoseInstruction();
        }
    }
    
    public get UpperDose(): string {
        return this._upperdose;
    }
    public set UpperDose(value: string) {
        if ((this._upperdose.toUpperCase() != value.toUpperCase())){
            this._upperdose = value;
            this.SetDoseInstruction();
        }
    }
    
    public get DoseUoM(): CListItem {
        return this._doseUoM;
    }
    public set DoseUoM(value: CListItem) {
        if ((this._doseUoM != value)){
            this._doseUoM = value;
            this.SetDoseInstruction();
        }
    }

    public get Instruction(): string {
        return this._instruction;
    }
    public set Instruction(value: string) {
        if ((this._instruction.toUpperCase() != value.toUpperCase())){
            this._instruction = value;
            this.SetDoseInstruction();
        }
    }

    public get InfusionFlag(): boolean {
        return this._infusionFlag;
    }
    public set InfusionFlag(value: boolean) {
        this._infusionFlag = value;
    }
    
    public get RangeOperator(): CListItem {
        return this._rangeOperator;
    }
    public set RangeOperator(value: CListItem) {
        if ((this._rangeOperator != value)){
            this._rangeOperator = value;
            this.SetValueRange();
        }
    }
    
    public get InfrateDenominatoruom(): CListItem {
        return this._infrateDenominatoruom;
    }
    public set InfrateDenominatoruom(value: CListItem) {
        if ((this._infrateDenominatoruom != value)){
            this._infrateDenominatoruom = value;
            this.SetDoseInstruction();
        }
    }

    public get Infratenumeratoruom(): CListItem {
        return this._infratenumeratoruom;
    }
    public set Infratenumeratoruom(value: CListItem) {
        if ((this._infratenumeratoruom != value)){
            this._infratenumeratoruom = value;
            this.SetDoseInstruction();
        }
    }
    
    public get Infusionrate(): string {
        return this._infusionrate;
    }
    public set Infusionrate(value: string) {
        if ((this._infusionrate.toUpperCase() != value.toUpperCase())){
            this._infusionrate = value;
            this.SetDoseInstruction();
        }
    }
    
    public get InfusionUpperrate(): string {
        return this._infusionUpperrate;
    }
    public set InfusionUpperrate(value: string) {
        if ((this._infusionUpperrate.toUpperCase() != value.toUpperCase())){
            this._infusionUpperrate = value;
            this.SetDoseInstruction();
        }
    }

    public get IsenableUpperRange(): boolean {
        return this._isenableUpperRange;
    }
    public set IsenableUpperRange(value: boolean) {
        this._isenableUpperRange = value;
    }
    
}

export enum DoseState
{
    Added,
    Updated,
    Removed
}

