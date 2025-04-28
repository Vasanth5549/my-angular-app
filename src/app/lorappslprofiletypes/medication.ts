import { ObjectHelper } from "epma-platform/helper";
import { ObservableCollection } from "epma-platform/models";

    export class ActivityConfigurationData extends Object {
        private ActivityToPrintAfterField: string;
        private ActToPrintAfterValueField: string;
        private PolicyToBeUsedField: string;
        private PolicyToBeUsedValueField: string;
        private PrescriptiontypeField: string;
        private PrescriptiontypeValueField: string;
        private SummaryStationeryForConsolidatedPrintField: string;
        private SummaryStationeryForConsolidatedPrintValueField: string;
        public get ActivityToPrintAfter(): string {
            return this.ActivityToPrintAfterField;
        }
        public set ActivityToPrintAfter(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.ActivityToPrintAfterField, value) != true)) {
                this.ActivityToPrintAfterField = value;
                //this.RaisePropertyChanged("ActivityToPrintAfter");
            }
        }
        public get ActToPrintAfterValue(): string {
            return this.ActToPrintAfterValueField;
        }
        public set ActToPrintAfterValue(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.ActToPrintAfterValueField, value) != true)) {
                this.ActToPrintAfterValueField = value;
                //this.RaisePropertyChanged("ActToPrintAfterValue");
            }
        }
        public get PolicyToBeUsed(): string {
            return this.PolicyToBeUsedField;
        }
        public set PolicyToBeUsed(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.PolicyToBeUsedField, value) != true)) {
                this.PolicyToBeUsedField = value;
                //this.RaisePropertyChanged("PolicyToBeUsed");
            }
        }
        public get PolicyToBeUsedValue(): string {
            return this.PolicyToBeUsedValueField;
        }
        public set PolicyToBeUsedValue(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.PolicyToBeUsedValueField, value) != true)) {
                this.PolicyToBeUsedValueField = value;
                //this.RaisePropertyChanged("PolicyToBeUsedValue");
            }
        }
        public get Prescriptiontype(): string {
            return this.PrescriptiontypeField;
        }
        public set Prescriptiontype(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.PrescriptiontypeField, value) != true)) {
                this.PrescriptiontypeField = value;
                //this.RaisePropertyChanged("Prescriptiontype");
            }
        }
        public get PrescriptiontypeValue(): string {
            return this.PrescriptiontypeValueField;
        }
        public set PrescriptiontypeValue(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.PrescriptiontypeValueField, value) != true)) {
                this.PrescriptiontypeValueField = value;
                //this.RaisePropertyChanged("PrescriptiontypeValue");
            }
        }
        public get SummaryStationeryForConsolidatedPrint(): string {
            return this.SummaryStationeryForConsolidatedPrintField;
        }
        public set SummaryStationeryForConsolidatedPrint(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.SummaryStationeryForConsolidatedPrintField, value) != true)) {
                this.SummaryStationeryForConsolidatedPrintField = value;
                //this.RaisePropertyChanged("SummaryStationeryForConsolidatedPrint");
            }
        }
        public get SummaryStationeryForConsolidatedPrintValue(): string {
            return this.SummaryStationeryForConsolidatedPrintValueField;
        }
        public set SummaryStationeryForConsolidatedPrintValue(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.SummaryStationeryForConsolidatedPrintValueField, value) != true)) {
                this.SummaryStationeryForConsolidatedPrintValueField = value;
                //this.RaisePropertyChanged("SummaryStationeryForConsolidatedPrintValue");
            }
        }        
    }
    
    export class AddPrescribingConfigData extends Object {
        private FormularyMandatoryField: boolean = false;
        private AutoRefreshField: boolean = false;
        private ReconcileMandatoryField: boolean = false;
        private PresIdentifierNameField: string;
        private PresIdentifierTypeField: string;
        private RecManforIPField: boolean = false;
        private PrescribeofMCIField: boolean = false;
        private ReviewAfterMandatoryField: boolean = false;
        private EnableWardStockConfigField: boolean = false;
        public get FormularyMandatory(): boolean {
            return this.FormularyMandatoryField;
        }
        public set FormularyMandatory(value: boolean) {
            if ((this.FormularyMandatoryField.Equals(value) != true)) {
                this.FormularyMandatoryField = value;
                //this.RaisePropertyChanged("FormularyMandatory");
            }
        }
        public get AutoRefresh(): boolean {
            return this.AutoRefreshField;
        }
        public set AutoRefresh(value: boolean) {
            if ((this.AutoRefreshField.Equals(value) != true)) {
                this.AutoRefreshField = value;
                //this.RaisePropertyChanged("AutoRefresh");
            }
        }
        public get ReconcileMandatory(): boolean {
            return this.ReconcileMandatoryField;
        }
        public set ReconcileMandatory(value: boolean) {
            if ((this.ReconcileMandatoryField.Equals(value) != true)) {
                this.ReconcileMandatoryField = value;
                //this.RaisePropertyChanged("ReconcileMandatory");
            }
        }
        public get PresIdentifierName(): string {
            return this.PresIdentifierNameField;
        }
        public set PresIdentifierName(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.PresIdentifierNameField, value) != true)) {
                this.PresIdentifierNameField = value;
                //this.RaisePropertyChanged("PresIdentifierName");
            }
        }
        public get PresIdentifierType(): string {
            return this.PresIdentifierTypeField;
        }
        public set PresIdentifierType(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.PresIdentifierTypeField, value) != true)) {
                this.PresIdentifierTypeField = value;
                //this.RaisePropertyChanged("PresIdentifierType");
            }
        }
        public get RecManforIP(): boolean {
            return this.RecManforIPField;
        }
        public set RecManforIP(value: boolean) {
            if ((this.RecManforIPField.Equals(value) != true)) {
                this.RecManforIPField = value;
                //this.RaisePropertyChanged("RecManforIP");
            }
        }
        public get PrescribeofMCI(): boolean {
            return this.PrescribeofMCIField;
        }
        public set PrescribeofMCI(value: boolean) {
            if ((this.PrescribeofMCIField.Equals(value) != true)) {
                this.PrescribeofMCIField = value;
                //this.RaisePropertyChanged("PrescribeofMCI");
            }
        }
        public get ReviewAfterMandatory(): boolean {
            return this.ReviewAfterMandatoryField;
        }
        public set ReviewAfterMandatory(value: boolean) {
            if ((this.ReviewAfterMandatoryField.Equals(value) != true)) {
                this.ReviewAfterMandatoryField = value;
                //this.RaisePropertyChanged("ReviewAfterMandatory");
            }
        }
        public get EnableWardStockConfig(): boolean {
            return this.EnableWardStockConfigField;
        }
        public set EnableWardStockConfig(value: boolean) {
            if ((this.EnableWardStockConfigField.Equals(value) != true)) {
                this.EnableWardStockConfigField = value;
                //this.RaisePropertyChanged("EnableWardStockConfig");
            }
        }
        
        
    }
    
    export class BSAFormulaConfigData extends Object {
        private FormulaConfigField: ArrayOfString;
        public get FormulaConfig(): ArrayOfString {
            return this.FormulaConfigField;
        }
        public set FormulaConfig(value: ArrayOfString) {
            if ((ObjectHelper.ReferenceEquals(this.FormulaConfigField, value) != true)) {
                this.FormulaConfigField = value;
                //this.RaisePropertyChanged("FormulaConfig");
            }
        }        
    }    
    export class ArrayOfString extends ObservableCollection<string>
    {

    }    
    export class ClinicalVerificationConfiguration extends Object {
        private StationaryTypesField: string;
        private StationaryNameField: string;
        private IsSupplyReqInTechValField: boolean = false;
        private StationaryTypeCodeField: string;
        public get StationaryTypes(): string {
            return this.StationaryTypesField;
        }
        public set StationaryTypes(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.StationaryTypesField, value) != true)) {
                this.StationaryTypesField = value;
                //this.RaisePropertyChanged("StationaryTypes");
            }
        }
        public get StationaryName(): string {
            return this.StationaryNameField;
        }
        public set StationaryName(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.StationaryNameField, value) != true)) {
                this.StationaryNameField = value;
                //this.RaisePropertyChanged("StationaryName");
            }
        }
        public get IsSupplyReqInTechVal(): boolean {
            return this.IsSupplyReqInTechValField;
        }
        public set IsSupplyReqInTechVal(value: boolean) {
            if ((this.IsSupplyReqInTechValField.Equals(value) != true)) {
                this.IsSupplyReqInTechValField = value;
                //this.RaisePropertyChanged("IsSupplyReqInTechVal");
            }
        }
        public get StationaryTypeCode(): string {
            return this.StationaryTypeCodeField;
        }
        public set StationaryTypeCode(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.StationaryTypeCodeField, value) != true)) {
                this.StationaryTypeCodeField = value;
                //this.RaisePropertyChanged("StationaryTypeCode");
            }
        }        
    }    
    export class GPConnectConfiguration extends Object {
        private PrescriptionCodesField: string;
        public get PrescriptionCodes(): string {
            return this.PrescriptionCodesField;
        }
        public set PrescriptionCodes(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.PrescriptionCodesField, value) != true)) {
                this.PrescriptionCodesField = value;
                //this.RaisePropertyChanged("PrescriptionCodes");
            }
        }        
    }
    
    export class CMedicationLineDisplayData extends Object {
        private objLineDisConfigField: ObservableCollection<LineDisplayConfigurations>;
        private sColorCodeField: string;
        private MultipleComponentField: number = 0;
        public get objLineDisConfig(): ObservableCollection<LineDisplayConfigurations> {
            return this.objLineDisConfigField;
        }
        public set objLineDisConfig(value: ObservableCollection<LineDisplayConfigurations>) {
            if ((ObjectHelper.ReferenceEquals(this.objLineDisConfigField, value) != true)) {
                this.objLineDisConfigField = value;
                //this.RaisePropertyChanged("objLineDisConfig");
            }
        }
        public get sColorCode(): string {
            return this.sColorCodeField;
        }
        public set sColorCode(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.sColorCodeField, value) != true)) {
                this.sColorCodeField = value;
                //this.RaisePropertyChanged("sColorCode");
            }
        }
        public get MultipleComponent(): number {
            return this.MultipleComponentField;
        }
        public set MultipleComponent(value: number) {
            if ((this.MultipleComponentField.Equals(value) != true)) {
                this.MultipleComponentField = value;
                //this.RaisePropertyChanged("MultipleComponent");
            }
        }        
    }
    
    export class LineDisplayConfigurations extends Object {
        private FieldCodeField: string;
        private ColCodeField: string;
        private DisPosCodeField: string;
        private QualifierField: string;
        private CaseCodeField: string;
        private FontStyleCodeField: string;
        private IsSelectedField: number = 0;
        private OrderField: string;
        public get FieldCode(): string {
            return this.FieldCodeField;
        }
        public set FieldCode(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.FieldCodeField, value) != true)) {
                this.FieldCodeField = value;
                //this.RaisePropertyChanged("FieldCode");
            }
        }
        public get ColCode(): string {
            return this.ColCodeField;
        }
        public set ColCode(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.ColCodeField, value) != true)) {
                this.ColCodeField = value;
                //this.RaisePropertyChanged("ColCode");
            }
        }
        public get DisPosCode(): string {
            return this.DisPosCodeField;
        }
        public set DisPosCode(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.DisPosCodeField, value) != true)) {
                this.DisPosCodeField = value;
                //this.RaisePropertyChanged("DisPosCode");
            }
        }
        public get Qualifier(): string {
            return this.QualifierField;
        }
        public set Qualifier(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.QualifierField, value) != true)) {
                this.QualifierField = value;
                //this.RaisePropertyChanged("Qualifier");
            }
        }
        public get CaseCode(): string {
            return this.CaseCodeField;
        }
        public set CaseCode(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.CaseCodeField, value) != true)) {
                this.CaseCodeField = value;
                //this.RaisePropertyChanged("CaseCode");
            }
        }
        public get FontStyleCode(): string {
            return this.FontStyleCodeField;
        }
        public set FontStyleCode(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.FontStyleCodeField, value) != true)) {
                this.FontStyleCodeField = value;
                //this.RaisePropertyChanged("FontStyleCode");
            }
        }
        public get IsSelected(): number {
            return this.IsSelectedField;
        }
        public set IsSelected(value: number) {
            if ((this.IsSelectedField.Equals(value) != true)) {
                this.IsSelectedField = value;
                //this.RaisePropertyChanged("IsSelected");
            }
        }
        public get Order(): string {
            return this.OrderField;
        }
        public set Order(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.OrderField, value) != true)) {
                this.OrderField = value;
                //this.RaisePropertyChanged("Order");
            }
        }        
    }
    
    export class ConflictConfigurations extends Object {
        private ConflictMainTypeField: string;
        private ConfilctSubTypeField: string;
        private ConflictBehaviourField: string;
        public get ConflictMainType(): string {
            return this.ConflictMainTypeField;
        }
        public set ConflictMainType(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.ConflictMainTypeField, value) != true)) {
                this.ConflictMainTypeField = value;
                //this.RaisePropertyChanged("ConflictMainType");
            }
        }
        public get ConfilctSubType(): string {
            return this.ConfilctSubTypeField;
        }
        public set ConfilctSubType(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.ConfilctSubTypeField, value) != true)) {
                this.ConfilctSubTypeField = value;
                //this.RaisePropertyChanged("ConfilctSubType");
            }
        }
        public get ConflictBehaviour(): string {
            return this.ConflictBehaviourField;
        }
        public set ConflictBehaviour(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.ConflictBehaviourField, value) != true)) {
                this.ConflictBehaviourField = value;
                //this.RaisePropertyChanged("ConflictBehaviour");
            }
        }
    }
    
    export class EncounterPresConfigurations extends Object {
        private EncounterCodeField: string;
        private PrescriptionCodesField: string;
        private DefaultPresCodeField: string;
        private StatinaryCodesField: string;
        private StatinaryTypesCodeOIDsField: string;
        private StatinaryTypeCodeField: string;
        private DefaultStationaryTypeCodeField: string;
        private DefaultStationaryCodeField: string;
        private DefaultStationeryField: string;
        private IsDefaultField: boolean = false;
        private CopyAcrossPresCodesField: string;
        public get EncounterCode(): string {
            return this.EncounterCodeField;
        }
        public set EncounterCode(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.EncounterCodeField, value) != true)) {
                this.EncounterCodeField = value;
                //this.RaisePropertyChanged("EncounterCode");
            }
        }
        public get PrescriptionCodes(): string {
            return this.PrescriptionCodesField;
        }
        public set PrescriptionCodes(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.PrescriptionCodesField, value) != true)) {
                this.PrescriptionCodesField = value;
                //this.RaisePropertyChanged("PrescriptionCodes");
            }
        }
        public get DefaultPresCode(): string {
            return this.DefaultPresCodeField;
        }
        public set DefaultPresCode(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.DefaultPresCodeField, value) != true)) {
                this.DefaultPresCodeField = value;
                //this.RaisePropertyChanged("DefaultPresCode");
            }
        }
        public get StatinaryCodes(): string {
            return this.StatinaryCodesField;
        }
        public set StatinaryCodes(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.StatinaryCodesField, value) != true)) {
                this.StatinaryCodesField = value;
                //this.RaisePropertyChanged("StatinaryCodes");
            }
        }
        public get StatinaryTypesCodeOIDs(): string {
            return this.StatinaryTypesCodeOIDsField;
        }
        public set StatinaryTypesCodeOIDs(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.StatinaryTypesCodeOIDsField, value) != true)) {
                this.StatinaryTypesCodeOIDsField = value;
                //this.RaisePropertyChanged("StatinaryTypesCodeOIDs");
            }
        }
        public get StatinaryTypeCode(): string {
            return this.StatinaryTypeCodeField;
        }
        public set StatinaryTypeCode(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.StatinaryTypeCodeField, value) != true)) {
                this.StatinaryTypeCodeField = value;
                //this.RaisePropertyChanged("StatinaryTypeCode");
            }
        }
        public get DefaultStationaryTypeCode(): string {
            return this.DefaultStationaryTypeCodeField;
        }
        public set DefaultStationaryTypeCode(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.DefaultStationaryTypeCodeField, value) != true)) {
                this.DefaultStationaryTypeCodeField = value;
                //this.RaisePropertyChanged("DefaultStationaryTypeCode");
            }
        }
        public get DefaultStationaryCode(): string {
            return this.DefaultStationaryCodeField;
        }
        public set DefaultStationaryCode(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.DefaultStationaryCodeField, value) != true)) {
                this.DefaultStationaryCodeField = value;
                //this.RaisePropertyChanged("DefaultStationaryCode");
            }
        }
        public get DefaultStationery(): string {
            return this.DefaultStationeryField;
        }
        public set DefaultStationery(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.DefaultStationeryField, value) != true)) {
                this.DefaultStationeryField = value;
                //this.RaisePropertyChanged("DefaultStationery");
            }
        }
        public get IsDefault(): boolean {
            return this.IsDefaultField;
        }
        public set IsDefault(value: boolean) {
            if ((this.IsDefaultField.Equals(value) != true)) {
                this.IsDefaultField = value;
                //this.RaisePropertyChanged("IsDefault");
            }
        }
        public get CopyAcrossPresCodes(): string {
            return this.CopyAcrossPresCodesField;
        }
        public set CopyAcrossPresCodes(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.CopyAcrossPresCodesField, value) != true)) {
                this.CopyAcrossPresCodesField = value;
                //this.RaisePropertyChanged("CopyAcrossPresCodes");
            }
        }        
    }
    
    export class LinkInformation extends Object {
        private linktypeTextField: string;
        private linktypevalueField: string;
        private URLField: string;
        private URLsuffixField: string;
        public get linktypeText(): string {
            return this.linktypeTextField;
        }
        public set linktypeText(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.linktypeTextField, value) != true)) {
                this.linktypeTextField = value;
                //this.RaisePropertyChanged("linktypeText");
            }
        }
        public get linktypevalue(): string {
            return this.linktypevalueField;
        }
        public set linktypevalue(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.linktypevalueField, value) != true)) {
                this.linktypevalueField = value;
                //this.RaisePropertyChanged("linktypevalue");
            }
        }
        public get URL(): string {
            return this.URLField;
        }
        public set URL(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.URLField, value) != true)) {
                this.URLField = value;
                //this.RaisePropertyChanged("URL");
            }
        }
        public get URLsuffix(): string {
            return this.URLsuffixField;
        }
        public set URLsuffix(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.URLsuffixField, value) != true)) {
                this.URLsuffixField = value;
                //this.RaisePropertyChanged("URLsuffix");
            }
        }
    }
    
    export class MedCatalogueVersionConfigData extends Object {
        private sActiveVersionField: string;
        private sPrevActiveVersionField: string;
        private sPrepVersionField: string;
        private sArchiveFrmVersionField: string;
        private sRejectedVersionField: string;
        private sPurgeLoadTimeField: string;
        private sPrepTimeField: string;
        public get sActiveVersion(): string {
            return this.sActiveVersionField;
        }
        public set sActiveVersion(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.sActiveVersionField, value) != true)) {
                this.sActiveVersionField = value;
                //this.RaisePropertyChanged("sActiveVersion");
            }
        }
        public get sPrevActiveVersion(): string {
            return this.sPrevActiveVersionField;
        }
        public set sPrevActiveVersion(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.sPrevActiveVersionField, value) != true)) {
                this.sPrevActiveVersionField = value;
                //this.RaisePropertyChanged("sPrevActiveVersion");
            }
        }
        public get sPrepVersion(): string {
            return this.sPrepVersionField;
        }
        public set sPrepVersion(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.sPrepVersionField, value) != true)) {
                this.sPrepVersionField = value;
                //this.RaisePropertyChanged("sPrepVersion");
            }
        }
        public get sArchiveFrmVersion(): string {
            return this.sArchiveFrmVersionField;
        }
        public set sArchiveFrmVersion(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.sArchiveFrmVersionField, value) != true)) {
                this.sArchiveFrmVersionField = value;
                //this.RaisePropertyChanged("sArchiveFrmVersion");
            }
        }
        public get sRejectedVersion(): string {
            return this.sRejectedVersionField;
        }
        public set sRejectedVersion(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.sRejectedVersionField, value) != true)) {
                this.sRejectedVersionField = value;
                //this.RaisePropertyChanged("sRejectedVersion");
            }
        }
        public get sPurgeLoadTime(): string {
            return this.sPurgeLoadTimeField;
        }
        public set sPurgeLoadTime(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.sPurgeLoadTimeField, value) != true)) {
                this.sPurgeLoadTimeField = value;
                //this.RaisePropertyChanged("sPurgeLoadTime");
            }
        }
        public get sPrepTime(): string {
            return this.sPrepTimeField;
        }
        public set sPrepTime(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.sPrepTimeField, value) != true)) {
                this.sPrepTimeField = value;
                //this.RaisePropertyChanged("sPrepTime");
            }
        }        
    }
    
    export class MedDoseConfigData extends Object {
        private SolidDrugsField: string;
        private LiquidDrugsField: string;
        public get SolidDrugs(): string {
            return this.SolidDrugsField;
        }
        public set SolidDrugs(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.SolidDrugsField, value) != true)) {
                this.SolidDrugsField = value;
                //this.RaisePropertyChanged("SolidDrugs");
            }
        }
        public get LiquidDrugs(): string {
            return this.LiquidDrugsField;
        }
        public set LiquidDrugs(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.LiquidDrugsField, value) != true)) {
                this.LiquidDrugsField = value;
                //this.RaisePropertyChanged("LiquidDrugs");
            }
        }        
    }
    
    export class MedDrugDisplayConfigData extends Object {
        private FormularyField: string;
        private NonFormularyField: string;
        public get Formulary(): string {
            return this.FormularyField;
        }
        public set Formulary(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.FormularyField, value) != true)) {
                this.FormularyField = value;
                //this.RaisePropertyChanged("Formulary");
            }
        }
        public get NonFormulary(): string {
            return this.NonFormularyField;
        }
        public set NonFormulary(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.NonFormularyField, value) != true)) {
                this.NonFormularyField = value;
                //this.RaisePropertyChanged("NonFormulary");
            }
        }        
    }
    
    export class MedDrugInfoData extends Object {
        private LinksField: ObservableCollection<LinkInformation>;
        public get Links(): ObservableCollection<LinkInformation> {
            return this.LinksField;
        }
        public set Links(value: ObservableCollection<LinkInformation>) {
            if ((ObjectHelper.ReferenceEquals(this.LinksField, value) != true)) {
                this.LinksField = value;
                //this.RaisePropertyChanged("Links");
            }
        }        
    }
    
    export class MedicationConflictConfigData extends Object {
        private ConflictType1Field: string;
        private ConflictType2Field: string;
        private ConflictType3Field: string;
        private ConflictType4Field: string;
        private ConflictType5Field: string;
        private DisplayConflictsField: boolean = false;
        private WarningSequenceField: string;
        private objConflictConfigField: ObservableCollection<ConflictConfigurations>;
        public get ConflictType1(): string {
            return this.ConflictType1Field;
        }
        public set ConflictType1(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.ConflictType1Field, value) != true)) {
                this.ConflictType1Field = value;
                //this.RaisePropertyChanged("ConflictType1");
            }
        }
        public get ConflictType2(): string {
            return this.ConflictType2Field;
        }
        public set ConflictType2(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.ConflictType2Field, value) != true)) {
                this.ConflictType2Field = value;
                //this.RaisePropertyChanged("ConflictType2");
            }
        }
        public get ConflictType3(): string {
            return this.ConflictType3Field;
        }
        public set ConflictType3(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.ConflictType3Field, value) != true)) {
                this.ConflictType3Field = value;
                //this.RaisePropertyChanged("ConflictType3");
            }
        }
        public get ConflictType4(): string {
            return this.ConflictType4Field;
        }
        public set ConflictType4(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.ConflictType4Field, value) != true)) {
                this.ConflictType4Field = value;
                //this.RaisePropertyChanged("ConflictType4");
            }
        }
        public get ConflictType5(): string {
            return this.ConflictType5Field;
        }
        public set ConflictType5(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.ConflictType5Field, value) != true)) {
                this.ConflictType5Field = value;
                //this.RaisePropertyChanged("ConflictType5");
            }
        }
        public get DisplayConflicts(): boolean {
            return this.DisplayConflictsField;
        }
        public set DisplayConflicts(value: boolean) {
            if ((this.DisplayConflictsField.Equals(value) != true)) {
                this.DisplayConflictsField = value;
                //this.RaisePropertyChanged("DisplayConflicts");
            }
        }
        public get WarningSequence(): string {
            return this.WarningSequenceField;
        }
        public set WarningSequence(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.WarningSequenceField, value) != true)) {
                this.WarningSequenceField = value;
                //this.RaisePropertyChanged("WarningSequence");
            }
        }
        public get objConflictConfig(): ObservableCollection<ConflictConfigurations> {
            return this.objConflictConfigField;
        }
        public set objConflictConfig(value: ObservableCollection<ConflictConfigurations>) {
            if ((ObjectHelper.ReferenceEquals(this.objConflictConfigField, value) != true)) {
                this.objConflictConfigField = value;
                //this.RaisePropertyChanged("objConflictConfig");
            }
        }        
    }
    
    export class MedicationResultsViewCount extends Object {
        private nRecordsCountField: number = 0;
        public get nRecordsCount(): number {
            return this.nRecordsCountField;
        }
        public set nRecordsCount(value: number) {
            if ((this.nRecordsCountField.Equals(value) != true)) {
                this.nRecordsCountField = value;
                //this.RaisePropertyChanged("nRecordsCount");
            }
        }        
    }

    export class MedicationSearchConfigData extends Object {
        private DefaultPowerSearchField: string;
        private PowerSearchConfigField: ObservableCollection<PowerSearchConfigurationData>;
        public get DefaultPowerSearch(): string {
            return this.DefaultPowerSearchField;
        }
        public set DefaultPowerSearch(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.DefaultPowerSearchField, value) != true)) {
                this.DefaultPowerSearchField = value;
                //this.RaisePropertyChanged("DefaultPowerSearch");
            }
        }
        public get PowerSearchConfig(): ObservableCollection<PowerSearchConfigurationData> {
            return this.PowerSearchConfigField;
        }
        public set PowerSearchConfig(value: ObservableCollection<PowerSearchConfigurationData>) {
            if ((ObjectHelper.ReferenceEquals(this.PowerSearchConfigField, value) != true)) {
                this.PowerSearchConfigField = value;
                //this.RaisePropertyChanged("PowerSearchConfig");
            }
        }        
        
        private DisplayAMBrandOptionField: string;
        public get DisplayAMBrandOption(): string {
            return this.DisplayAMBrandOptionField;
        }
        public set DisplayAMBrandOption(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.DisplayAMBrandOptionField, value) != true)) {
                this.DisplayAMBrandOptionField = value;
                //this.RaisePropertyChanged("DisplayAMBrandOption");
            }
        }
    }
    
    export class PowerSearchConfigurationData extends Object {
        private SearchOptionField: string;
        private SearchOptionValueField: string;
        private ItemTypeField: string;
        private ItemTypeValueField: string;
        private PrimaryResultListField: string;
        private PrimaryResultListValueField: string;
        private SecondaryResultListField: string;
        private SecondaryResultListValueField: string;
        private ShowPrescribebybrandoptionsField: string;
        private ShowfluidforinfusionsField: string;
        private AlwaysDisplayInPrimaryListField: string;
        public get SearchOption(): string {
            return this.SearchOptionField;
        }
        public set SearchOption(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.SearchOptionField, value) != true)) {
                this.SearchOptionField = value;
                //this.RaisePropertyChanged("SearchOption");
            }
        }
        public get SearchOptionValue(): string {
            return this.SearchOptionValueField;
        }
        public set SearchOptionValue(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.SearchOptionValueField, value) != true)) {
                this.SearchOptionValueField = value;
                //this.RaisePropertyChanged("SearchOptionValue");
            }
        }
        public get ItemType(): string {
            return this.ItemTypeField;
        }
        public set ItemType(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.ItemTypeField, value) != true)) {
                this.ItemTypeField = value;
                //this.RaisePropertyChanged("ItemType");
            }
        }
        public get ItemTypeValue(): string {
            return this.ItemTypeValueField;
        }
        public set ItemTypeValue(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.ItemTypeValueField, value) != true)) {
                this.ItemTypeValueField = value;
                //this.RaisePropertyChanged("ItemTypeValue");
            }
        }
        public get PrimaryResultList(): string {
            return this.PrimaryResultListField;
        }
        public set PrimaryResultList(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.PrimaryResultListField, value) != true)) {
                this.PrimaryResultListField = value;
                //this.RaisePropertyChanged("PrimaryResultList");
            }
        }
        public get PrimaryResultListValue(): string {
            return this.PrimaryResultListValueField;
        }
        public set PrimaryResultListValue(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.PrimaryResultListValueField, value) != true)) {
                this.PrimaryResultListValueField = value;
                //this.RaisePropertyChanged("PrimaryResultListValue");
            }
        }
        public get SecondaryResultList(): string {
            return this.SecondaryResultListField;
        }
        public set SecondaryResultList(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.SecondaryResultListField, value) != true)) {
                this.SecondaryResultListField = value;
                //this.RaisePropertyChanged("SecondaryResultList");
            }
        }
        public get SecondaryResultListValue(): string {
            return this.SecondaryResultListValueField;
        }
        public set SecondaryResultListValue(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.SecondaryResultListValueField, value) != true)) {
                this.SecondaryResultListValueField = value;
                //this.RaisePropertyChanged("SecondaryResultListValue");
            }
        }
        public get ShowPrescribebybrandoptions(): string {
            return this.ShowPrescribebybrandoptionsField;
        }
        public set ShowPrescribebybrandoptions(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.ShowPrescribebybrandoptionsField, value) != true)) {
                this.ShowPrescribebybrandoptionsField = value;
                //this.RaisePropertyChanged("ShowPrescribebybrandoptions");
            }
        }
        public get Showfluidforinfusions(): string {
            return this.ShowfluidforinfusionsField;
        }
        public set Showfluidforinfusions(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.ShowfluidforinfusionsField, value) != true)) {
                this.ShowfluidforinfusionsField = value;
                //this.RaisePropertyChanged("Showfluidforinfusions");
            }
        }
        public get AlwaysDisplayInPrimaryList(): string {
            return this.AlwaysDisplayInPrimaryListField;
        }
        public set AlwaysDisplayInPrimaryList(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.AlwaysDisplayInPrimaryListField, value) != true)) {
                this.AlwaysDisplayInPrimaryListField = value;
                //this.RaisePropertyChanged("AlwaysDisplayInPrimaryList");
            }
        }        
    }

    export class MedicationViewConfigData extends Object {
        private DefaultGroupByField: string;
        private DefaultFilterByField: string;
        private GroupByColsField: string;
        private CurMedExpiryDurationField: string;
        private DrugsExpiryDurationField: string;
        private FavouritesField: boolean = false;
        private DrugCatalogueField: boolean = false;
        private FormularyField: boolean = false;
        private CancelledDrugField: boolean = false;
        private DiscontinuedDrugField: boolean = false;
        private PatMedColsField: string;
        private OtherLinksField: string;
        public get DefaultGroupBy(): string {
            return this.DefaultGroupByField;
        }
        public set DefaultGroupBy(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.DefaultGroupByField, value) != true)) {
                this.DefaultGroupByField = value;
                //this.RaisePropertyChanged("DefaultGroupBy");
            }
        }
        public get DefaultFilterBy(): string {
            return this.DefaultFilterByField;
        }
        public set DefaultFilterBy(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.DefaultFilterByField, value) != true)) {
                this.DefaultFilterByField = value;
                //this.RaisePropertyChanged("DefaultFilterBy");
            }
        }
        public get GroupByCols(): string {
            return this.GroupByColsField;
        }
        public set GroupByCols(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.GroupByColsField, value) != true)) {
                this.GroupByColsField = value;
                //this.RaisePropertyChanged("GroupByCols");
            }
        }
        public get CurMedExpiryDuration(): string {
            return this.CurMedExpiryDurationField;
        }
        public set CurMedExpiryDuration(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.CurMedExpiryDurationField, value) != true)) {
                this.CurMedExpiryDurationField = value;
                //this.RaisePropertyChanged("CurMedExpiryDuration");
            }
        }
        public get DrugsExpiryDuration(): string {
            return this.DrugsExpiryDurationField;
        }
        public set DrugsExpiryDuration(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.DrugsExpiryDurationField, value) != true)) {
                this.DrugsExpiryDurationField = value;
                //this.RaisePropertyChanged("DrugsExpiryDuration");
            }
        }
        public get Favourites(): boolean {
            return this.FavouritesField;
        }
        public set Favourites(value: boolean) {
            if ((this.FavouritesField.Equals(value) != true)) {
                this.FavouritesField = value;
                //this.RaisePropertyChanged("Favourites");
            }
        }
        public get DrugCatalogue(): boolean {
            return this.DrugCatalogueField;
        }
        public set DrugCatalogue(value: boolean) {
            if ((this.DrugCatalogueField.Equals(value) != true)) {
                this.DrugCatalogueField = value;
                //this.RaisePropertyChanged("DrugCatalogue");
            }
        }
        public get Formulary(): boolean {
            return this.FormularyField;
        }
        public set Formulary(value: boolean) {
            if ((this.FormularyField.Equals(value) != true)) {
                this.FormularyField = value;
                //this.RaisePropertyChanged("Formulary");
            }
        }
        public get CancelledDrug(): boolean {
            return this.CancelledDrugField;
        }
        public set CancelledDrug(value: boolean) {
            if ((this.CancelledDrugField.Equals(value) != true)) {
                this.CancelledDrugField = value;
                //this.RaisePropertyChanged("CancelledDrug");
            }
        }
        public get DiscontinuedDrug(): boolean {
            return this.DiscontinuedDrugField;
        }
        public set DiscontinuedDrug(value: boolean) {
            if ((this.DiscontinuedDrugField.Equals(value) != true)) {
                this.DiscontinuedDrugField = value;
                //this.RaisePropertyChanged("DiscontinuedDrug");
            }
        }
        public get PatMedCols(): string {
            return this.PatMedColsField;
        }
        public set PatMedCols(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.PatMedColsField, value) != true)) {
                this.PatMedColsField = value;
                //this.RaisePropertyChanged("PatMedCols");
            }
        }
        public get OtherLinks(): string {
            return this.OtherLinksField;
        }
        public set OtherLinks(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.OtherLinksField, value) != true)) {
                this.OtherLinksField = value;
                //this.RaisePropertyChanged("OtherLinks");
            }
        }        
    }
    
    export class MedNotificData extends Object {
        private GroupField: string;
        private ObjectNameField: string;
        private ObjectOidField: number = 0;
        private MCVFormatField: string;
        private MCVIncrementField: string;
        private PrepTimeField: string;
        public get Group(): string {
            return this.GroupField;
        }
        public set Group(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.GroupField, value) != true)) {
                this.GroupField = value;
                //this.RaisePropertyChanged("Group");
            }
        }
        public get ObjectName(): string {
            return this.ObjectNameField;
        }
        public set ObjectName(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.ObjectNameField, value) != true)) {
                this.ObjectNameField = value;
                //this.RaisePropertyChanged("ObjectName");
            }
        }
        public get ObjectOid(): number {
            return this.ObjectOidField;
        }
        public set ObjectOid(value: number) {
            if ((this.ObjectOidField.Equals(value) != true)) {
                this.ObjectOidField = value;
                //this.RaisePropertyChanged("ObjectOid");
            }
        }
        public get MCVFormat(): string {
            return this.MCVFormatField;
        }
        public set MCVFormat(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.MCVFormatField, value) != true)) {
                this.MCVFormatField = value;
                //this.RaisePropertyChanged("MCVFormat");
            }
        }
        public get MCVIncrement(): string {
            return this.MCVIncrementField;
        }
        public set MCVIncrement(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.MCVIncrementField, value) != true)) {
                this.MCVIncrementField = value;
                //this.RaisePropertyChanged("MCVIncrement");
            }
        }
        public get PrepTime(): string {
            return this.PrepTimeField;
        }
        public set PrepTime(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.PrepTimeField, value) != true)) {
                this.PrepTimeField = value;
                //this.RaisePropertyChanged("PrepTime");
            }
        }        
    }
    
    export class PrescribingConfigData extends Object {
        private ReasonMandatoryField: boolean = false;
        private AllowUserFavoritesField: boolean = false;
        private AlertPartentRowField: boolean = false;
        private AutoLaunchField: boolean = false;
        private IncludeEventDatesField: boolean = false;
        private PromptAllergyReviewField: boolean = false;
        private PaediatricsAgeRangeField: number = 0;
        private PaediatricsAgeRangeTopField: number = 0;
        private PaediatricsAgeUOMField: string;
        private NoOfResultDispField: number = 0;
        private BNFURLField: string;
        private HghtWghtPromptField: ArrayOfString;
        private AllergyPromptField: ArrayOfString;
        private StatRoleField: ArrayOfString;
        private SlotTimeField: ArrayOfString;
        private MultipleComponentField: number = 0;
        private CrossMatchField: boolean = false;
        private ConfigDateDurationField: number = 0;
        private ConfigDateDurationTypeField: string;
        private FavouriteFolderField: string;
        private FavouriteOIDField: number = 0;
        private FavouriteFolderLorenzoIDField: string;
        private CommonFavoFolderField: string;
        private CommonFavoOIDField: number = 0;
        private CommonFavoLorenzoIDField: string;
        private CommonCDCFavFolderField: string;
        private CommonCDCFavOIDField: number = 0;
        private CommonCDCFavLzoIDField: string;
        private EnableDoseCalcField: boolean = false;
        public AdjfactorAdjBWcalcField: number = 0;
        private IdealBodyWeightPercentageExceedsField: number = 0;
        private HeightWeightCDCFormCodeField: string;
        private HeightWeightCDCFormNameField: string;
        private HeightWeightChangeAlertField: boolean = false;
        private HghtWghtPromptCriteriaField: ObservableCollection<HghtWghtPrompt>;
        private PromptFreqMoreOptionField: boolean = false;
        private LaunchInpatientPresField: boolean = false;
        private ClerkFormViewDefautCodeField: string;
        public get ReasonMandatory(): boolean {
            return this.ReasonMandatoryField;
        }
        public set ReasonMandatory(value: boolean) {
            if ((this.ReasonMandatoryField.Equals(value) != true)) {
                this.ReasonMandatoryField = value;
                //this.RaisePropertyChanged("ReasonMandatory");
            }
        }
        public get AllowUserFavorites(): boolean {
            return this.AllowUserFavoritesField;
        }
        public set AllowUserFavorites(value: boolean) {
            if ((this.AllowUserFavoritesField.Equals(value) != true)) {
                this.AllowUserFavoritesField = value;
                //this.RaisePropertyChanged("AllowUserFavorites");
            }
        }
        public get AlertPartentRow(): boolean {
            return this.AlertPartentRowField;
        }
        public set AlertPartentRow(value: boolean) {
            if ((this.AlertPartentRowField.Equals(value) != true)) {
                this.AlertPartentRowField = value;
                //this.RaisePropertyChanged("AlertPartentRow");
            }
        }
        public get AutoLaunch(): boolean {
            return this.AutoLaunchField;
        }
        public set AutoLaunch(value: boolean) {
            if ((this.AutoLaunchField.Equals(value) != true)) {
                this.AutoLaunchField = value;
                //this.RaisePropertyChanged("AutoLaunch");
            }
        }
        public get IncludeEventDates(): boolean {
            return this.IncludeEventDatesField;
        }
        public set IncludeEventDates(value: boolean) {
            if ((this.IncludeEventDatesField.Equals(value) != true)) {
                this.IncludeEventDatesField = value;
                //this.RaisePropertyChanged("IncludeEventDates");
            }
        }
        public get PromptAllergyReview(): boolean {
            return this.PromptAllergyReviewField;
        }
        public set PromptAllergyReview(value: boolean) {
            if ((this.PromptAllergyReviewField.Equals(value) != true)) {
                this.PromptAllergyReviewField = value;
                //this.RaisePropertyChanged("PromptAllergyReview");
            }
        }
        public get PaediatricsAgeRange(): number {
            return this.PaediatricsAgeRangeField;
        }
        public set PaediatricsAgeRange(value: number) {
            if ((this.PaediatricsAgeRangeField.Equals(value) != true)) {
                this.PaediatricsAgeRangeField = value;
                //this.RaisePropertyChanged("PaediatricsAgeRange");
            }
        }
        public get PaediatricsAgeRangeTop(): number {
            return this.PaediatricsAgeRangeTopField;
        }
        public set PaediatricsAgeRangeTop(value: number) {
            if ((this.PaediatricsAgeRangeTopField.Equals(value) != true)) {
                this.PaediatricsAgeRangeTopField = value;
                //this.RaisePropertyChanged("PaediatricsAgeRangeTop");
            }
        }
        public get PaediatricsAgeUOM(): string {
            return this.PaediatricsAgeUOMField;
        }
        public set PaediatricsAgeUOM(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.PaediatricsAgeUOMField, value) != true)) {
                this.PaediatricsAgeUOMField = value;
                //this.RaisePropertyChanged("PaediatricsAgeUOM");
            }
        }
        public get NoOfResultDisp(): number {
            return this.NoOfResultDispField;
        }
        public set NoOfResultDisp(value: number) {
            if ((this.NoOfResultDispField.Equals(value) != true)) {
                this.NoOfResultDispField = value;
                //this.RaisePropertyChanged("NoOfResultDisp");
            }
        }
        public get BNFURL(): string {
            return this.BNFURLField;
        }
        public set BNFURL(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.BNFURLField, value) != true)) {
                this.BNFURLField = value;
                //this.RaisePropertyChanged("BNFURL");
            }
        }
        public get HghtWghtPrompt(): ArrayOfString {
            return this.HghtWghtPromptField;
        }
        public set HghtWghtPrompt(value: ArrayOfString) {
            if ((ObjectHelper.ReferenceEquals(this.HghtWghtPromptField, value) != true)) {
                this.HghtWghtPromptField = value;
                //this.RaisePropertyChanged("HghtWghtPrompt");
            }
        }
        public get AllergyPrompt(): ArrayOfString {
            return this.AllergyPromptField;
        }
        public set AllergyPrompt(value: ArrayOfString) {
            if ((ObjectHelper.ReferenceEquals(this.AllergyPromptField, value) != true)) {
                this.AllergyPromptField = value;
                //this.RaisePropertyChanged("AllergyPrompt");
            }
        }
        public get StatRole(): ArrayOfString {
            return this.StatRoleField;
        }
        public set StatRole(value: ArrayOfString) {
            if ((ObjectHelper.ReferenceEquals(this.StatRoleField, value) != true)) {
                this.StatRoleField = value;
                //this.RaisePropertyChanged("StatRole");
            }
        }
        public get SlotTime(): ArrayOfString {
            return this.SlotTimeField;
        }
        public set SlotTime(value: ArrayOfString) {
            if ((ObjectHelper.ReferenceEquals(this.SlotTimeField, value) != true)) {
                this.SlotTimeField = value;
                //this.RaisePropertyChanged("SlotTime");
            }
        }
        public get MultipleComponent(): number {
            return this.MultipleComponentField;
        }
        public set MultipleComponent(value: number) {
            if ((this.MultipleComponentField.Equals(value) != true)) {
                this.MultipleComponentField = value;
                //this.RaisePropertyChanged("MultipleComponent");
            }
        }
        public get CrossMatch(): boolean {
            return this.CrossMatchField;
        }
        public set CrossMatch(value: boolean) {
            if ((this.CrossMatchField.Equals(value) != true)) {
                this.CrossMatchField = value;
                //this.RaisePropertyChanged("CrossMatch");
            }
        }
        public get ConfigDateDuration(): number {
            return this.ConfigDateDurationField;
        }
        public set ConfigDateDuration(value: number) {
            if ((this.ConfigDateDurationField.Equals(value) != true)) {
                this.ConfigDateDurationField = value;
                //this.RaisePropertyChanged("ConfigDateDuration");
            }
        }
        public get ConfigDateDurationType(): string {
            return this.ConfigDateDurationTypeField;
        }
        public set ConfigDateDurationType(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.ConfigDateDurationTypeField, value) != true)) {
                this.ConfigDateDurationTypeField = value;
                //this.RaisePropertyChanged("ConfigDateDurationType");
            }
        }
        public get FavouriteFolder(): string {
            return this.FavouriteFolderField;
        }
        public set FavouriteFolder(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.FavouriteFolderField, value) != true)) {
                this.FavouriteFolderField = value;
                //this.RaisePropertyChanged("FavouriteFolder");
            }
        }
        public get FavouriteOID(): number {
            return this.FavouriteOIDField;
        }
        public set FavouriteOID(value: number) {
            if ((this.FavouriteOIDField.Equals(value) != true)) {
                this.FavouriteOIDField = value;
                //this.RaisePropertyChanged("FavouriteOID");
            }
        }
        public get FavouriteFolderLorenzoID(): string {
            return this.FavouriteFolderLorenzoIDField;
        }
        public set FavouriteFolderLorenzoID(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.FavouriteFolderLorenzoIDField, value) != true)) {
                this.FavouriteFolderLorenzoIDField = value;
                //this.RaisePropertyChanged("FavouriteFolderLorenzoID");
            }
        }
        public get CommonFavoFolder(): string {
            return this.CommonFavoFolderField;
        }
        public set CommonFavoFolder(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.CommonFavoFolderField, value) != true)) {
                this.CommonFavoFolderField = value;
                //this.RaisePropertyChanged("CommonFavoFolder");
            }
        }
        public get CommonFavoOID(): number {
            return this.CommonFavoOIDField;
        }
        public set CommonFavoOID(value: number) {
            if ((this.CommonFavoOIDField.Equals(value) != true)) {
                this.CommonFavoOIDField = value;
                //this.RaisePropertyChanged("CommonFavoOID");
            }
        }
        public get CommonFavoLorenzoID(): string {
            return this.CommonFavoLorenzoIDField;
        }
        public set CommonFavoLorenzoID(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.CommonFavoLorenzoIDField, value) != true)) {
                this.CommonFavoLorenzoIDField = value;
                //this.RaisePropertyChanged("CommonFavoLorenzoID");
            }
        }
        public get CommonCDCFavFolder(): string {
            return this.CommonCDCFavFolderField;
        }
        public set CommonCDCFavFolder(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.CommonCDCFavFolderField, value) != true)) {
                this.CommonCDCFavFolderField = value;
                //this.RaisePropertyChanged("CommonCDCFavFolder");
            }
        }
        public get CommonCDCFavOID(): number {
            return this.CommonCDCFavOIDField;
        }
        public set CommonCDCFavOID(value: number) {
            if ((this.CommonCDCFavOIDField.Equals(value) != true)) {
                this.CommonCDCFavOIDField = value;
                //this.RaisePropertyChanged("CommonCDCFavOID");
            }
        }
        public get CommonCDCFavLzoID(): string {
            return this.CommonCDCFavLzoIDField;
        }
        public set CommonCDCFavLzoID(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.CommonCDCFavLzoIDField, value) != true)) {
                this.CommonCDCFavLzoIDField = value;
                //this.RaisePropertyChanged("CommonCDCFavLzoID");
            }
        }
        public get EnableDoseCalc(): boolean {
            return this.EnableDoseCalcField;
        }
        public set EnableDoseCalc(value: boolean) {
            if ((this.EnableDoseCalcField.Equals(value) != true)) {
                this.EnableDoseCalcField = value;
                //this.RaisePropertyChanged("EnableDoseCalc");
            }
        }
        public get AdjfactorAdjBWcalc(): number {
            return this.AdjfactorAdjBWcalcField;
        }
        public set AdjfactorAdjBWcalc(value: number) {
            if ((this.AdjfactorAdjBWcalcField.Equals(value) != true)) {
                this.AdjfactorAdjBWcalcField = value;
                //this.RaisePropertyChanged("AdjfactorAdjBWcalc");
            }
        }
        public get IdealBodyWeightPercentageExceeds(): number {
            return this.IdealBodyWeightPercentageExceedsField;
        }
        public set IdealBodyWeightPercentageExceeds(value: number) {
            if ((this.IdealBodyWeightPercentageExceedsField.Equals(value) != true)) {
                this.IdealBodyWeightPercentageExceedsField = value;
                //this.RaisePropertyChanged("IdealBodyWeightPercentageExceeds");
            }
        }
        public get HeightWeightCDCFormCode(): string {
            return this.HeightWeightCDCFormCodeField;
        }
        public set HeightWeightCDCFormCode(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.HeightWeightCDCFormCodeField, value) != true)) {
                this.HeightWeightCDCFormCodeField = value;
                //this.RaisePropertyChanged("HeightWeightCDCFormCode");
            }
        }
        public get HeightWeightCDCFormName(): string {
            return this.HeightWeightCDCFormNameField;
        }
        public set HeightWeightCDCFormName(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.HeightWeightCDCFormNameField, value) != true)) {
                this.HeightWeightCDCFormNameField = value;
                //this.RaisePropertyChanged("HeightWeightCDCFormName");
            }
        }
        public get HeightWeightChangeAlert(): boolean {
            return this.HeightWeightChangeAlertField;
        }
        public set HeightWeightChangeAlert(value: boolean) {
            if ((this.HeightWeightChangeAlertField.Equals(value) != true)) {
                this.HeightWeightChangeAlertField = value;
                //this.RaisePropertyChanged("HeightWeightChangeAlert");
            }
        }
        public get HghtWghtPromptCriteria(): ObservableCollection<HghtWghtPrompt> {
            return this.HghtWghtPromptCriteriaField;
        }
        public set HghtWghtPromptCriteria(value: ObservableCollection<HghtWghtPrompt>) {
            if ((ObjectHelper.ReferenceEquals(this.HghtWghtPromptCriteriaField, value) != true)) {
                this.HghtWghtPromptCriteriaField = value;
                //this.RaisePropertyChanged("HghtWghtPromptCriteria");
            }
        }
        public get PromptFreqMoreOption(): boolean {
            return this.PromptFreqMoreOptionField;
        }
        public set PromptFreqMoreOption(value: boolean) {
            if ((this.PromptFreqMoreOptionField.Equals(value) != true)) {
                this.PromptFreqMoreOptionField = value;
                //this.RaisePropertyChanged("PromptFreqMoreOption");
            }
        }
        public get LaunchInpatientPres(): boolean {
            return this.LaunchInpatientPresField;
        }
        public set LaunchInpatientPres(value: boolean) {
            if ((this.LaunchInpatientPresField.Equals(value) != true)) {
                this.LaunchInpatientPresField = value;
                //this.RaisePropertyChanged("LaunchInpatientPres");
            }
        }
        public get ClerkFormViewDefautCode(): string {
            return this.ClerkFormViewDefautCodeField;
        }
        public set ClerkFormViewDefautCode(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.ClerkFormViewDefautCodeField, value) != true)) {
                this.ClerkFormViewDefautCodeField = value;
                //this.RaisePropertyChanged("ClerkFormViewDefautCode");
            }
        }        
    }
    
    export class HghtWghtPrompt extends Object {
        private AgeRangeValueField: string;
        private AgeRangeUOMCodeField: string;
        private DurationField: number = 0;
        private DurationCodeField: string;
        private HeightWeightField: string;
        private HeightWeightCodeField: string;
        public get AgeRangeValue(): string {
            return this.AgeRangeValueField;
        }
        public set AgeRangeValue(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.AgeRangeValueField, value) != true)) {
                this.AgeRangeValueField = value;
                //this.RaisePropertyChanged("AgeRangeValue");
            }
        }
        public get AgeRangeUOMCode(): string {
            return this.AgeRangeUOMCodeField;
        }
        public set AgeRangeUOMCode(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.AgeRangeUOMCodeField, value) != true)) {
                this.AgeRangeUOMCodeField = value;
                //this.RaisePropertyChanged("AgeRangeUOMCode");
            }
        }
        public get Duration(): number {
            return this.DurationField;
        }
        public set Duration(value: number) {
            if ((this.DurationField.Equals(value) != true)) {
                this.DurationField = value;
                //this.RaisePropertyChanged("Duration");
            }
        }
        public get DurationCode(): string {
            return this.DurationCodeField;
        }
        public set DurationCode(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.DurationCodeField, value) != true)) {
                this.DurationCodeField = value;
                //this.RaisePropertyChanged("DurationCode");
            }
        }
        public get HeightWeight(): string {
            return this.HeightWeightField;
        }
        public set HeightWeight(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.HeightWeightField, value) != true)) {
                this.HeightWeightField = value;
                //this.RaisePropertyChanged("HeightWeight");
            }
        }
        public get HeightWeightCode(): string {
            return this.HeightWeightCodeField;
        }
        public set HeightWeightCode(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.HeightWeightCodeField, value) != true)) {
                this.HeightWeightCodeField = value;
                //this.RaisePropertyChanged("HeightWeightCode");
            }
        }        
    }
    
    export class PrescribingMethodConfigData extends Object {
        private PowerSearchCategoriesField: string;
        private EncounPresConfigField: ObservableCollection<EncounterPresConfigurations>;
        public get PowerSearchCategories(): string {
            return this.PowerSearchCategoriesField;
        }
        public set PowerSearchCategories(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.PowerSearchCategoriesField, value) != true)) {
                this.PowerSearchCategoriesField = value;
                //this.RaisePropertyChanged("PowerSearchCategories");
            }
        }
        public get EncounPresConfig(): ObservableCollection<EncounterPresConfigurations> {
            return this.EncounPresConfigField;
        }
        public set EncounPresConfig(value: ObservableCollection<EncounterPresConfigurations>) {
            if ((ObjectHelper.ReferenceEquals(this.EncounPresConfigField, value) != true)) {
                this.EncounPresConfigField = value;
                //this.RaisePropertyChanged("EncounPresConfig");
            }
        }        
    }
    
    export class PrescriptionViewConfigData extends Object {
        private ColourPriorDischargeField: string;
        private AlertDurationField: string;
        private ColourPastDischargeField: string;
        private RemovePrescriptionField: number = 0;
        public get ColourPriorDischarge(): string {
            return this.ColourPriorDischargeField;
        }
        public set ColourPriorDischarge(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.ColourPriorDischargeField, value) != true)) {
                this.ColourPriorDischargeField = value;
                //this.RaisePropertyChanged("ColourPriorDischarge");
            }
        }
        public get AlertDuration(): string {
            return this.AlertDurationField;
        }
        public set AlertDuration(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.AlertDurationField, value) != true)) {
                this.AlertDurationField = value;
                //this.RaisePropertyChanged("AlertDuration");
            }
        }
        public get ColourPastDischarge(): string {
            return this.ColourPastDischargeField;
        }
        public set ColourPastDischarge(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.ColourPastDischargeField, value) != true)) {
                this.ColourPastDischargeField = value;
                //this.RaisePropertyChanged("ColourPastDischarge");
            }
        }
        public get RemovePrescription(): number {
            return this.RemovePrescriptionField;
        }
        public set RemovePrescription(value: number) {
            if ((this.RemovePrescriptionField.Equals(value) != true)) {
                this.RemovePrescriptionField = value;
                //this.RaisePropertyChanged("RemovePrescription");
            }
        }        
    }
    
    export class PrintConfigurationData extends Object {
        private ActivityConfigDataField: ObservableCollection<ActivityConfigurationData>;
        private ReplacementDurationField: number = 0;
        private IsLocalPrinterOverrideField: boolean = false;
        public get ActivityConfigData(): ObservableCollection<ActivityConfigurationData> {
            return this.ActivityConfigDataField;
        }
        public set ActivityConfigData(value: ObservableCollection<ActivityConfigurationData>) {
            if ((ObjectHelper.ReferenceEquals(this.ActivityConfigDataField, value) != true)) {
                this.ActivityConfigDataField = value;
                //this.RaisePropertyChanged("ActivityConfigData");
            }
        }
        public get ReplacementDuration(): number {
            return this.ReplacementDurationField;
        }
        public set ReplacementDuration(value: number) {
            if ((this.ReplacementDurationField.Equals(value) != true)) {
                this.ReplacementDurationField = value;
                //this.RaisePropertyChanged("ReplacementDuration");
            }
        }
        public get IsLocalPrinterOverride(): boolean {
            return this.IsLocalPrinterOverrideField;
        }
        public set IsLocalPrinterOverride(value: boolean) {
            if ((this.IsLocalPrinterOverrideField.Equals(value) != true)) {
                this.IsLocalPrinterOverrideField = value;
                //this.RaisePropertyChanged("IsLocalPrinterOverride");
            }
        }        
    }
    
    export class CChartDisplayConfig extends Object {
        private OverDueSlotsColorField: string;
        private DueSlotsColorField: string;
        private OmittedSlotsColorField: string;
        private AsRequiredSlotsColorField: string;
        private TodayOutlineColorField: string;
        public get OverDueSlotsColor(): string {
            return this.OverDueSlotsColorField;
        }
        public set OverDueSlotsColor(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.OverDueSlotsColorField, value) != true)) {
                this.OverDueSlotsColorField = value;
                //this.RaisePropertyChanged("OverDueSlotsColor");
            }
        }
        public get DueSlotsColor(): string {
            return this.DueSlotsColorField;
        }
        public set DueSlotsColor(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.DueSlotsColorField, value) != true)) {
                this.DueSlotsColorField = value;
                //this.RaisePropertyChanged("DueSlotsColor");
            }
        }
        public get OmittedSlotsColor(): string {
            return this.OmittedSlotsColorField;
        }
        public set OmittedSlotsColor(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.OmittedSlotsColorField, value) != true)) {
                this.OmittedSlotsColorField = value;
                //this.RaisePropertyChanged("OmittedSlotsColor");
            }
        }
        public get AsRequiredSlotsColor(): string {
            return this.AsRequiredSlotsColorField;
        }
        public set AsRequiredSlotsColor(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.AsRequiredSlotsColorField, value) != true)) {
                this.AsRequiredSlotsColorField = value;
                //this.RaisePropertyChanged("AsRequiredSlotsColor");
            }
        }
        public get TodayOutlineColor(): string {
            return this.TodayOutlineColorField;
        }
        public set TodayOutlineColor(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.TodayOutlineColorField, value) != true)) {
                this.TodayOutlineColorField = value;
                //this.RaisePropertyChanged("TodayOutlineColor");
            }
        }        
    }

    export class CClinicalIncidentConfig extends Object {
        private AddressField: string;
        private LinkTextToDisplayField: string;
        private isModifyAdministrationField: boolean = false;
        private isStrikeThroughAdministrationField: boolean = false;
        private isRecordAdminDoseDiscrepancyField: boolean = false;
        private isRecordAdminWitnessOverrideField: boolean = false;
        public get Address(): string {
            return this.AddressField;
        }
        public set Address(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.AddressField, value) != true)) {
                this.AddressField = value;
                //this.RaisePropertyChanged("Address");
            }
        }
        public get LinkTextToDisplay(): string {
            return this.LinkTextToDisplayField;
        }
        public set LinkTextToDisplay(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.LinkTextToDisplayField, value) != true)) {
                this.LinkTextToDisplayField = value;
                //this.RaisePropertyChanged("LinkTextToDisplay");
            }
        }
        public get isModifyAdministration(): boolean {
            return this.isModifyAdministrationField;
        }
        public set isModifyAdministration(value: boolean) {
            if ((this.isModifyAdministrationField.Equals(value) != true)) {
                this.isModifyAdministrationField = value;
                //this.RaisePropertyChanged("isModifyAdministration");
            }
        }
        public get isStrikeThroughAdministration(): boolean {
            return this.isStrikeThroughAdministrationField;
        }
        public set isStrikeThroughAdministration(value: boolean) {
            if ((this.isStrikeThroughAdministrationField.Equals(value) != true)) {
                this.isStrikeThroughAdministrationField = value;
                //this.RaisePropertyChanged("isStrikeThroughAdministration");
            }
        }
        public get isRecordAdminDoseDiscrepancy(): boolean {
            return this.isRecordAdminDoseDiscrepancyField;
        }
        public set isRecordAdminDoseDiscrepancy(value: boolean) {
            if ((this.isRecordAdminDoseDiscrepancyField.Equals(value) != true)) {
                this.isRecordAdminDoseDiscrepancyField = value;
                //this.RaisePropertyChanged("isRecordAdminDoseDiscrepancy");
            }
        }
        public get isRecordAdminWitnessOverride(): boolean {
            return this.isRecordAdminWitnessOverrideField;
        }
        public set isRecordAdminWitnessOverride(value: boolean) {
            if ((this.isRecordAdminWitnessOverrideField.Equals(value) != true)) {
                this.isRecordAdminWitnessOverrideField = value;
                //this.RaisePropertyChanged("isRecordAdminWitnessOverride");
            }
        }        
    }
    
    export class CSlotCharacteristicsConfig extends Object {
        private DuenessThresholdField: number = 0;
        private AdvDurationForRecordingField: number = 0;
        private SlotModificationTimeField: number = 0;
        public get DuenessThreshold(): number {
            return this.DuenessThresholdField;
        }
        public set DuenessThreshold(value: number) {
            if ((this.DuenessThresholdField.Equals(value) != true)) {
                this.DuenessThresholdField = value;
                //this.RaisePropertyChanged("DuenessThreshold");
            }
        }
        public get AdvDurationForRecording(): number {
            return this.AdvDurationForRecordingField;
        }
        public set AdvDurationForRecording(value: number) {
            if ((this.AdvDurationForRecordingField.Equals(value) != true)) {
                this.AdvDurationForRecordingField = value;
                //this.RaisePropertyChanged("AdvDurationForRecording");
            }
        }
        public get SlotModificationTime(): number {
            return this.SlotModificationTimeField;
        }
        public set SlotModificationTime(value: number) {
            if ((this.SlotModificationTimeField.Equals(value) != true)) {
                this.SlotModificationTimeField = value;
                //this.RaisePropertyChanged("SlotModificationTime");
            }
        }        
    }
    
    export class MedDrugRoundView extends Object {
        private ServicePointTypeField: string;
        private ServicePointField: string;
        private ServicePointOIDField: string;
        public get ServicePointType(): string {
            return this.ServicePointTypeField;
        }
        public set ServicePointType(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.ServicePointTypeField, value) != true)) {
                this.ServicePointTypeField = value;
                //this.RaisePropertyChanged("ServicePointType");
            }
        }
        public get ServicePoint(): string {
            return this.ServicePointField;
        }
        public set ServicePoint(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.ServicePointField, value) != true)) {
                this.ServicePointField = value;
                //this.RaisePropertyChanged("ServicePoint");
            }
        }
        public get ServicePointOID(): string {
            return this.ServicePointOIDField;
        }
        public set ServicePointOID(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.ServicePointOIDField, value) != true)) {
                this.ServicePointOIDField = value;
                //this.RaisePropertyChanged("ServicePointOID");
            }
        }        
    }
    
    export class ScheduleConfig extends Object {
        private SlotTimesTypeForAdminField: string;
        private TimeParamForAlertingField: number = 0;
        private AdminTimeReqforPRNField: boolean = false;
        public get SlotTimesTypeForAdmin(): string {
            return this.SlotTimesTypeForAdminField;
        }
        public set SlotTimesTypeForAdmin(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.SlotTimesTypeForAdminField, value) != true)) {
                this.SlotTimesTypeForAdminField = value;
                //this.RaisePropertyChanged("SlotTimesTypeForAdmin");
            }
        }
        public get TimeParamForAlerting(): number {
            return this.TimeParamForAlertingField;
        }
        public set TimeParamForAlerting(value: number) {
            if ((this.TimeParamForAlertingField.Equals(value) != true)) {
                this.TimeParamForAlertingField = value;
                //this.RaisePropertyChanged("TimeParamForAlerting");
            }
        }
        public get AdminTimeReqforPRN(): boolean {
            return this.AdminTimeReqforPRNField;
        }
        public set AdminTimeReqforPRN(value: boolean) {
            if ((this.AdminTimeReqforPRNField.Equals(value) != true)) {
                this.AdminTimeReqforPRNField = value;
                //this.RaisePropertyChanged("AdminTimeReqforPRN");
            }
        }        
    }    
    
    export class CChartSettingsConfig extends Object {
        private oDisposablereasonField: ArrayOfLstitem;
        private oOutcomeValuesField: ArrayOfLstitem;
        private CloseChartAfterField: number = 0;
        private IsManualLeaveStatusEnabledField: boolean = false;
        private IvAdminAlertAfterField: number = 0;
        private IsAllowSupplyReqField: boolean = false;
        private IsChangeFlowRateEnabledField: boolean = false;
        private AllowAnyUserForAdministrationField: string;
        public get oDisposablereason(): ArrayOfLstitem {
            return this.oDisposablereasonField;
        }
        public set oDisposablereason(value: ArrayOfLstitem) {
            if ((ObjectHelper.ReferenceEquals(this.oDisposablereasonField, value) != true)) {
                this.oDisposablereasonField = value;
                //this.RaisePropertyChanged("oDisposablereason");
            }
        }
        public get oOutcomeValues(): ArrayOfLstitem {
            return this.oOutcomeValuesField;
        }
        public set oOutcomeValues(value: ArrayOfLstitem) {
            if ((ObjectHelper.ReferenceEquals(this.oOutcomeValuesField, value) != true)) {
                this.oOutcomeValuesField = value;
                //this.RaisePropertyChanged("oOutcomeValues");
            }
        }
        public get CloseChartAfter(): number {
            return this.CloseChartAfterField;
        }
        public set CloseChartAfter(value: number) {
            if ((this.CloseChartAfterField.Equals(value) != true)) {
                this.CloseChartAfterField = value;
                //this.RaisePropertyChanged("CloseChartAfter");
            }
        }
        public get IsManualLeaveStatusEnabled(): boolean {
            return this.IsManualLeaveStatusEnabledField;
        }
        public set IsManualLeaveStatusEnabled(value: boolean) {
            if ((this.IsManualLeaveStatusEnabledField.Equals(value) != true)) {
                this.IsManualLeaveStatusEnabledField = value;
                //this.RaisePropertyChanged("IsManualLeaveStatusEnabled");
            }
        }
        public get IvAdminAlertAfter(): number {
            return this.IvAdminAlertAfterField;
        }
        public set IvAdminAlertAfter(value: number) {
            if ((this.IvAdminAlertAfterField.Equals(value) != true)) {
                this.IvAdminAlertAfterField = value;
                //this.RaisePropertyChanged("IvAdminAlertAfter");
            }
        }
        public get IsAllowSupplyReq(): boolean {
            return this.IsAllowSupplyReqField;
        }
        public set IsAllowSupplyReq(value: boolean) {
            if ((this.IsAllowSupplyReqField.Equals(value) != true)) {
                this.IsAllowSupplyReqField = value;
                //this.RaisePropertyChanged("IsAllowSupplyReq");
            }
        }
        public get IsChangeFlowRateEnabled(): boolean {
            return this.IsChangeFlowRateEnabledField;
        }
        public set IsChangeFlowRateEnabled(value: boolean) {
            if ((this.IsChangeFlowRateEnabledField.Equals(value) != true)) {
                this.IsChangeFlowRateEnabledField = value;
                //this.RaisePropertyChanged("IsChangeFlowRateEnabled");
            }
        }
        public get AllowAnyUserForAdministration(): string {
            return this.AllowAnyUserForAdministrationField;
        }
        public set AllowAnyUserForAdministration(value: string) {
            if (String.IsNullOrEmpty(this.AllowAnyUserForAdministrationField) || (this.AllowAnyUserForAdministrationField.Equals(value) != true)) {
                this.AllowAnyUserForAdministrationField = value;
                //this.RaisePropertyChanged("AllowAnyUserForAdministration");
            }
        }       
    }
    
    export class ArrayOfLstitem extends ObservableCollection<lstitem>
    {

    }
    
    export class lstitem extends Object {
        private ItemkeyField: string;
        private IsSelectedField: boolean = false;
        public get Itemkey(): string {
            return this.ItemkeyField;
        }
        public set Itemkey(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.ItemkeyField, value) != true)) {
                this.ItemkeyField = value;
                //this.RaisePropertyChanged("Itemkey");
            }
        }
        public get IsSelected(): boolean {
            return this.IsSelectedField;
        }
        public set IsSelected(value: boolean) {
            if ((this.IsSelectedField.Equals(value) != true)) {
                this.IsSelectedField = value;
                //this.RaisePropertyChanged("IsSelected");
            }
        }        
    }
    
    export class InfusionPresConfigData extends Object {
        private IsInfusionRatePCAField: boolean = false;
        private IsEnablePrescInfusField: boolean = false;
        private InfusPeriodField: number = 0;
        private InfusVolField: number = 0;
        private objInfusDeliveryDeviceField: ObservableCollection<InfusDeliveryDevice>;
        private objMedicalOxyConfigField: ObservableCollection<MedicalOxyConfig>;
        private objOxygenMasksField: ObservableCollection<OxygenMasks>;
        public get IsInfusionRatePCA(): boolean {
            return this.IsInfusionRatePCAField;
        }
        public set IsInfusionRatePCA(value: boolean) {
            if ((this.IsInfusionRatePCAField.Equals(value) != true)) {
                this.IsInfusionRatePCAField = value;
                //this.RaisePropertyChanged("IsInfusionRatePCA");
            }
        }
        public get IsEnablePrescInfus(): boolean {
            return this.IsEnablePrescInfusField;
        }
        public set IsEnablePrescInfus(value: boolean) {
            if ((this.IsEnablePrescInfusField.Equals(value) != true)) {
                this.IsEnablePrescInfusField = value;
                //this.RaisePropertyChanged("IsEnablePrescInfus");
            }
        }
        public get InfusPeriod(): number {
            return this.InfusPeriodField;
        }
        public set InfusPeriod(value: number) {
            if ((this.InfusPeriodField.Equals(value) != true)) {
                this.InfusPeriodField = value;
                //this.RaisePropertyChanged("InfusPeriod");
            }
        }
        public get InfusVol(): number {
            return this.InfusVolField;
        }
        public set InfusVol(value: number) {
            if ((this.InfusVolField.Equals(value) != true)) {
                this.InfusVolField = value;
                //this.RaisePropertyChanged("InfusVol");
            }
        }
        public get objInfusDeliveryDevice(): ObservableCollection<InfusDeliveryDevice> {
            return this.objInfusDeliveryDeviceField;
        }
        public set objInfusDeliveryDevice(value: ObservableCollection<InfusDeliveryDevice>) {
            if ((ObjectHelper.ReferenceEquals(this.objInfusDeliveryDeviceField, value) != true)) {
                this.objInfusDeliveryDeviceField = value;
                //this.RaisePropertyChanged("objInfusDeliveryDevice");
            }
        }
        public get objMedicalOxyConfig(): ObservableCollection<MedicalOxyConfig> {
            return this.objMedicalOxyConfigField;
        }
        public set objMedicalOxyConfig(value: ObservableCollection<MedicalOxyConfig>) {
            if ((ObjectHelper.ReferenceEquals(this.objMedicalOxyConfigField, value) != true)) {
                this.objMedicalOxyConfigField = value;
                //this.RaisePropertyChanged("objMedicalOxyConfig");
            }
        }
        public get objOxygenMasks(): ObservableCollection<OxygenMasks> {
            return this.objOxygenMasksField;
        }
        public set objOxygenMasks(value: ObservableCollection<OxygenMasks>) {
            if ((ObjectHelper.ReferenceEquals(this.objOxygenMasksField, value) != true)) {
                this.objOxygenMasksField = value;
                //this.RaisePropertyChanged("objOxygenMasks");
            }
        }        
    }
    
    export class InfusDeliveryDevice extends Object {
        private DeviceNameField: string;
        private InfusionRateDenomUOMCodeField: string;
        private InfusionRateDenomUOMOIDField: string;
        private InfusionRateNumUOMCodeField: string;
        private InfusionRateNumUOMOIDField: string;
        private IsAllowBoosterDoseField: boolean = false;
        public get DeviceName(): string {
            return this.DeviceNameField;
        }
        public set DeviceName(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.DeviceNameField, value) != true)) {
                this.DeviceNameField = value;
                //this.RaisePropertyChanged("DeviceName");
            }
        }
        public get InfusionRateDenomUOMCode(): string {
            return this.InfusionRateDenomUOMCodeField;
        }
        public set InfusionRateDenomUOMCode(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.InfusionRateDenomUOMCodeField, value) != true)) {
                this.InfusionRateDenomUOMCodeField = value;
                //this.RaisePropertyChanged("InfusionRateDenomUOMCode");
            }
        }
        public get InfusionRateDenomUOMOID(): string {
            return this.InfusionRateDenomUOMOIDField;
        }
        public set InfusionRateDenomUOMOID(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.InfusionRateDenomUOMOIDField, value) != true)) {
                this.InfusionRateDenomUOMOIDField = value;
                //this.RaisePropertyChanged("InfusionRateDenomUOMOID");
            }
        }
        public get InfusionRateNumUOMCode(): string {
            return this.InfusionRateNumUOMCodeField;
        }
        public set InfusionRateNumUOMCode(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.InfusionRateNumUOMCodeField, value) != true)) {
                this.InfusionRateNumUOMCodeField = value;
                //this.RaisePropertyChanged("InfusionRateNumUOMCode");
            }
        }
        public get InfusionRateNumUOMOID(): string {
            return this.InfusionRateNumUOMOIDField;
        }
        public set InfusionRateNumUOMOID(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.InfusionRateNumUOMOIDField, value) != true)) {
                this.InfusionRateNumUOMOIDField = value;
                //this.RaisePropertyChanged("InfusionRateNumUOMOID");
            }
        }
        public get IsAllowBoosterDose(): boolean {
            return this.IsAllowBoosterDoseField;
        }
        public set IsAllowBoosterDose(value: boolean) {
            if ((this.IsAllowBoosterDoseField.Equals(value) != true)) {
                this.IsAllowBoosterDoseField = value;
                //this.RaisePropertyChanged("IsAllowBoosterDose");
            }
        }        
    }
    
    export class MedicalOxyConfig extends Object {
        private MedicalOxygenNameField: string;
        private MedicalOxygenOIDField: number = 0;
        public get MedicalOxygenName(): string {
            return this.MedicalOxygenNameField;
        }
        public set MedicalOxygenName(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.MedicalOxygenNameField, value) != true)) {
                this.MedicalOxygenNameField = value;
                //this.RaisePropertyChanged("MedicalOxygenName");
            }
        }
        public get MedicalOxygenOID(): number {
            return this.MedicalOxygenOIDField;
        }
        public set MedicalOxygenOID(value: number) {
            if ((this.MedicalOxygenOIDField.Equals(value) != true)) {
                this.MedicalOxygenOIDField = value;
                //this.RaisePropertyChanged("MedicalOxygenOID");
            }
        }        
    }    
    export class OxygenMasks extends Object {
        private ConcentrationField: number = 0;
        private OxyDeviceNameField: string;
        public get Concentration(): number {
            return this.ConcentrationField;
        }
        public set Concentration(value: number) {
            if ((this.ConcentrationField.Equals(value) != true)) {
                this.ConcentrationField = value;
                //this.RaisePropertyChanged("Concentration");
            }
        }
        public get OxyDeviceName(): string {
            return this.OxyDeviceNameField;
        }
        public set OxyDeviceName(value: string) {
            if ((ObjectHelper.ReferenceEquals(this.OxyDeviceNameField, value) != true)) {
                this.OxyDeviceNameField = value;
                //this.RaisePropertyChanged("OxyDeviceName");
            }
        }        
    }
    