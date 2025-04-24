import DateTime from 'epma-platform/DateTime';
import { ObservableCollection } from 'epma-platform/models';
import { IViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { ClonableViewModelBase } from 'src/app/lorappmedicationcommonbb/model/cloneviewmodel';
import * as IPPMAManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
export enum ActivityTypes {
        Prescribe="Prescribe",

        Reorder="Reorder",

        Amend="Amend",

        Authorise="Authorise",

        ClinicallyVerify="ClinicallyVerify",

        UpdateWarning="UpdateWarning",

        UnHold="UnHold",

        ConflictUpdate="ConflictUpdate",

        Reconcile="Reconcile",

        DRCConflictUpdate="DRCConflictUpdate",

        None="None"
    }
    export enum ConflictIcons {
        BubbleHot="BubbleHot",

        Red="Red",

        Amber="Amber",

        Pass="Pass",

        Question="Question",

        None="None",

        MandatoryIndicator="MandatoryIndicator"
    }
    export enum RuleNames {
        INGREDIENT="INGREDIENT",

        DOSAGEFORM="DOSAGEFORM",

        STRENGTH="STRENGTH",

        BRAND="BRAND",

        ADMINMETHOD="ADMINMETHOD",

        SITE="SITE"
    }
    export enum FormDefaults {
        ALL="ALL",

        DOSAGEFORM="DOSAGEFORM",

        DOSEUOM="DOSEUOM",

        SITE="SITE"
    }
    export class ProblemObject {
        public ProblemOID: string;
        public ProblemName: string;
        public Code: string;
        public Term: string;
        public Version: string;
        public ProblemCode: string;
        public CodingCode: string;
        public TermKey: string;
    }
    export class DoseCalculation extends ClonableViewModelBase implements IViewModelBase {
        public Height: string;
        public HeightUOM: string;
        public Weight: string;
        public WeightUOM: string;
        public UpdatePatientRecord: boolean;
        public DoseCalcBasedOn: string;
        public RequestDose: string;
        public ReqDoseUOMOID: number;
        public ReqDoseUOMName: string;
        public RequestDosePer: string;
        public CalculationFor: string;
        public IBWWeight: number;
        public ABWWeight: number;
        public CalculatedPerDose: string;
        public RecordedHeightDTTM: DateTime;
        public RecordedWeightDTTM: DateTime;
        public IsHeightEstimated: boolean;
        public IsWeightEstimated: boolean;
        public CalculatedDTTM: DateTime;
        public RequestDoseSecondUOM: string;
        public RequestDoseThirdUOMLzoID: string;
        public FrequencyOID: number;
        public WeightOption: string;
        public BSAFormula: string;
        public BSA: string;
        public BSAUOM: number;
        public TotalDailyDose: string;
        public SelectProductLorenzoID: string;
        public CalculatedDose: string;
        public RoundedTo: string;
        public RoundedDose: number;
        public RoundingFactor: string;
        public OrderedAmount: string;
        public OverrideReason: string;
        public DoseCapApplied: boolean;
        public DoseCapAppliedDose: string;
        public FormCode: string;
        public USSGestationDays: string;
        public DoCleanUP(): void {

        }
    }
    export class LookAheadItem {
        public WarningImage: string;
        public Text: string;
        public DrugName: string;
        public Type: string;
        public LinkIcon: string;
        public OID: number;
        public IsAccessConst: number;
        public IsBrandOnly: number;
        public FormularyNotes: string;
        public IsFormulary: string;
        public ItemSubType: string;
        public ItemSubTypeImage: string;
        public SourceDataProviderType: string;
        public DrugType: string;
        public DrugProperty: string;
        public LorenzoID: string;
    }
    export class RelatedOptions {
        private identifyingName: string;
        public get IdentifyingName(): string {
            return this.identifyingName;
        }
        public set IdentifyingName(value: string) {
            this.identifyingName = value;
        }
        private identifyingOID: number;
        public get IdentifyingOID(): number {
            return this.identifyingOID;
        }
        public set IdentifyingOID(value: number) {
            this.identifyingOID = value;
        }
        private identifyingType: string;
        public get IdentifyingType(): string {
            return this.identifyingType;
        }
        public set IdentifyingType(value: string) {
            this.identifyingType = value;
        }
        private dosageForm: string;
        public get DosageForm(): string {
            return this.dosageForm;
        }
        public set DosageForm(value: string) {
            this.dosageForm = value;
        }
        private strength: string;
        public get Strength(): string {
            return this.strength;
        }
        public set Strength(value: string) {
            this.strength = value;
        }
        private dosageFormID: number;
        public get DosageFormID(): number {
            return this.dosageFormID;
        }
        public set DosageFormID(value: number) {
            this.dosageFormID = value;
        }
        private isFormulary: string;
        public get IsFormulary(): string {
            return this.isFormulary;
        }
        public set IsFormulary(value: string) {
            this.isFormulary = value;
        }
        private itemType: string;
        public get ItemType(): string {
            return this.itemType;
        }
        public set ItemType(value: string) {
            this.itemType = value;
        }
        private isAccessConst: string;
        public get IsAccessConst(): string {
            return this.isAccessConst;
        }
        public set IsAccessConst(value: string) {
            this.isAccessConst = value;
        }
        private lorenzoID: string;
        public get LorenzoID(): string {
            return this.lorenzoID;
        }
        public set LorenzoID(value: string) {
            this.lorenzoID = value;
        }
        public IsPrescribeByBrand: string;
        public MCVersion: string;
        public FormularyNote: string;
        public DrugProperties: ObservableCollection<IPPMAManagePrescSer.DrugProperty>;
        public MCQuantityUomcol: string;
        private prescribableitemlistOID: number;
        public get PrescribableitemlistOID(): number {
            return this.prescribableitemlistOID;
        }
        public set PrescribableitemlistOID(value: number) {
            this.prescribableitemlistOID = value;
        }
        public IsMonPeriodMand: boolean;
        private _IsInfusionFluid: string;
        public get IsInfusionFluid(): string {
            return this._IsInfusionFluid;
        }
        public set IsInfusionFluid(value: string) {
            this._IsInfusionFluid = value;
        }
        private _IsAllowMultipleRoute: string;
        public get IsAllowMultipleRoute(): string {
            return this._IsAllowMultipleRoute;
        }
        public set IsAllowMultipleRoute(value: string) {
            this._IsAllowMultipleRoute = value;
        }
        private _routes: ObservableCollection<IPPMAManagePrescSer.Route>;
        public get Routes(): ObservableCollection<IPPMAManagePrescSer.Route> {
            return this._routes;
        }
        public set Routes(value: ObservableCollection<IPPMAManagePrescSer.Route>) {
            this._routes = value;
        }
        private _IsIgnoreEPresRuleAdminMethod: boolean;
        public get IsIgnoreEPresRuleAdminMethod(): boolean {
            return this._IsIgnoreEPresRuleAdminMethod;
        }
        public set IsIgnoreEPresRuleAdminMethod(value: boolean) {
            this._IsIgnoreEPresRuleAdminMethod = value;
        }
        private _IsAuthorise: boolean;
        public get IsAuthorise(): boolean {
            return this._IsAuthorise;
        }
        public set IsAuthorise(value: boolean) {
            this._IsAuthorise = value;
        }
    }
    export class PrescribeOptions {
        private slctColumn: string;
        private prescriptionItem: string;
        private otherinformation: string;
        private formularyNotes: string;
        public get SlctColumn(): string {
            return this.slctColumn;
        }
        public set SlctColumn(value: string) {
            this.slctColumn = value;
        }
        public get PrescriptionItem(): string {
            return this.prescriptionItem;
        }
        public set PrescriptionItem(value: string) {
            this.prescriptionItem = value;
        }
        public get Otherinformation(): string {
            return this.otherinformation;
        }
        public set Otherinformation(value: string) {
            this.otherinformation = value;
        }
        public get FormularyNotes(): string {
            return this.formularyNotes;
        }
        public set FormularyNotes(value: string) {
            this.formularyNotes = value;
        }
    }
    export class OptionsItem {
        public FormularyNotes: string;
        public FormularyNote: string;
        public IsNonFormulary: string;
        public PrescribeItemDetailID: number;
        public DrugProperties: string;
        public PrescriptionItem: string;
        public Otherinformation: string;
        public IdentifyingName: string;
        public IdentifyingOID: string;
        public FormName: string;
        public DoseType: string;
        public RouteName: string;
        public Duration: string;
        public FrequencyName: string;
        public Variable: string;
        public Quantity: string;
        public RequestedDose: string;
        public SupplyInstruction: string;
        public IdentifyingType: string;
        public StartDttm: string;
        public IsByBrand: string;
        public IsAccessConstraint: string;
    }
    export class PackOptionItem {
        private formularyNotes: string;
        public IdentifyingName: string;
        public IdentifyingOID: number;
        public IdentifyingType: string;
        public DrugProperyHdn: string;
        public DrugProperyCode: string;
        public HighRiskMsg: string;
        public IsFormulary: string;
        public LorenzoID: string;
        public ItemType: string;
        public IsAccessConstraint: string;
        public IsByBrand: string;
        public ItemSubType: string;
        public get FormularyNotes(): string {
            return this.formularyNotes;
        }
        public set FormularyNotes(value: string) {
            this.formularyNotes = value;
        }
        public IsIndicationRequired: string;
        public SourceDataproviderType: string;
        private _IsAuthorise: boolean;
        public get IsAuthorise(): boolean {
            return this._IsAuthorise;
        }
        public set IsAuthorise(value: boolean) {
            this._IsAuthorise = value;
        }
        private _PrescribingNote: string;
        public get PrescribingNote(): string {
            return this._PrescribingNote;
        }
        public set PrescribingNote(value: string) {
            this._PrescribingNote = value;
        }
    }
    export class ReplacemntItem {
        public IdentifyingName: string;
        public IdentifyingOID: string;
        public IdentifyingType: string;
        public MCVersion: string;
        public IsFormulary: string;
        public IsAccessContraint: string;
        public IsPrescribeByBrand: string;
        public sItemType: string;
        public IsReplacement: boolean;
        public LorenzoID: string;
    }
