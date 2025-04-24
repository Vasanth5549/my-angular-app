
    export class ActivityConfigurationData
    {       

        private ActivityToPrintAfterField = '';
        private ActToPrintAfterValueField = '';
        private PolicyToBeUsedField = '';
        private PolicyToBeUsedValueField = '';
        private PrescriptiontypeField = '';
        private PrescriptiontypeValueField = '';
        private SummaryStationeryForConsolidatedPrintField = '';
        private SummaryStationeryForConsolidatedPrintValueField = '';

        public get ActivityToPrintAfter():string{
            return this.ActivityToPrintAfterField;
        }

        public set ActivityToPrintAfter(value: string){  
            if ((Object.is(this.ActivityToPrintAfterField, value) != true)){
                this.ActivityToPrintAfterField = value;
            }
        }

        public get ActToPrintAfterValue():string{
            return this.ActToPrintAfterValueField;
        }

        public set ActToPrintAfterValue(value: string){  
            if ((Object.is(this.ActToPrintAfterValueField, value) != true)){
                this.ActToPrintAfterValueField = value;
            }
        }

        public get PolicyToBeUsed():string{
            return this.PolicyToBeUsedField;
        }

        public set PolicyToBeUsed(value: string){  
            if ((Object.is(this.PolicyToBeUsedField, value) != true)){
                this.PolicyToBeUsedField = value;
            }
        }

        public get PolicyToBeUsedValue():string{
            return this.PolicyToBeUsedValueField;
        }

        public set PolicyToBeUsedValue(value: string){  
            if ((Object.is(this.PolicyToBeUsedValueField, value) != true)){
                this.PolicyToBeUsedValueField = value;
            }
        }

        public get Prescriptiontype():string{
            return this.PrescriptiontypeField;
        }

        public set Prescriptiontype(value: string){  
            if ((Object.is(this.PrescriptiontypeField, value) != true)){
                this.PrescriptiontypeField = value;
            }
        }

        public get PrescriptiontypeValue():string{
            return this.PrescriptiontypeValueField;
        }

        public set PrescriptiontypeValue(value: string){  
            if ((Object.is(this.PrescriptiontypeValueField, value) != true)){
                this.PrescriptiontypeValueField = value;
            }
        }

        public get SummaryStationeryForConsolidatedPrint():string{
            return this.SummaryStationeryForConsolidatedPrintField;
        }

        public set SummaryStationeryForConsolidatedPrint(value: string){  
            if ((Object.is(this.SummaryStationeryForConsolidatedPrintField, value) != true)){
                this.SummaryStationeryForConsolidatedPrintField = value;
            }
        }

        public get SummaryStationeryForConsolidatedPrintValue():string{
            return this.SummaryStationeryForConsolidatedPrintValueField;
        }

        public set SummaryStationeryForConsolidatedPrintValue(value: string){  
            if ((Object.is(this.SummaryStationeryForConsolidatedPrintValueField, value) != true)){
                this.SummaryStationeryForConsolidatedPrintValueField = value;
            }
        }

    }

    export class AddPrescribingConfigData
    {
        private FormularyMandatoryField = false;
        private AutoRefreshField = false;
        private ReconcileMandatoryField = false;
        private PresIdentifierNameField = '';
        private PresIdentifierTypeField = '';
		private RecManforIPField = false;
        private PrescribeofMCIField = false;
        private ReviewAfterMandatoryField = false;
		//BNS WSC
        private EnableWardStockConfigField = false;

        public get FormularyMandatory():boolean{
            return this.FormularyMandatoryField;
        }

        public set FormularyMandatory(value: boolean){  
            if ((this.FormularyMandatoryField != value)){
                this.FormularyMandatoryField = value;
            }
        }

        public get AutoRefresh():boolean{
            return this.AutoRefreshField;
        }

        public set AutoRefresh(value: boolean){  
            if ((this.AutoRefreshField != value)){
                this.AutoRefreshField = value;
            }
        }

        public get ReconcileMandatory():boolean{
            return this.ReconcileMandatoryField;
        }

        public set ReconcileMandatory(value: boolean){  
            if ((this.ReconcileMandatoryField != value)){
                this.ReconcileMandatoryField = value;
            }
        }

        public get PresIdentifierName():string{
            return this.PresIdentifierNameField;
        }

        public set PresIdentifierName(value: string){  
            if ((Object.is(this.PresIdentifierNameField, value) != true)){
                this.PresIdentifierNameField = value;
            }
        }

        public get PresIdentifierType():string{
            return this.PresIdentifierTypeField;
        }

        public set PresIdentifierType(value: string){  
            if ((Object.is(this.PresIdentifierTypeField, value) != true)){
                this.PresIdentifierTypeField = value;
            }
        }

        public get RecManforIP():boolean{
            return this.RecManforIPField;
        }

        public set RecManforIP(value: boolean){  
            if ((this.RecManforIPField != value)){
                this.RecManforIPField = value;
            }
        }

        public get PrescribeofMCI():boolean{
            return this.PrescribeofMCIField;
        }

        public set PrescribeofMCI(value: boolean){  
            if ((this.PrescribeofMCIField != value)){
                this.PrescribeofMCIField = value;
            }
        }

        public get ReviewAfterMandatory():boolean{
            return this.ReviewAfterMandatoryField;
        }

        public set ReviewAfterMandatory(value: boolean){  
            if ((this.ReviewAfterMandatoryField != value)){
                this.ReviewAfterMandatoryField = value;
            }
        }

        public get EnableWardStockConfig():boolean{
            return this.EnableWardStockConfigField;
        }

        public set EnableWardStockConfig(value: boolean){  
            if ((this.EnableWardStockConfigField != value)){
                this.EnableWardStockConfigField = value;
            }
        }

    }


    export class BSAFormulaConfigData
    {
        private FormulaConfigField!: ArrayOfString;

        public get FormulaConfig(): ArrayOfString{
            return this.FormulaConfigField;
        }

        public set FormulaConfig(value: ArrayOfString){  
            if ((Object.is(this.FormulaConfigField, value) != true)){
                this.FormulaConfigField = value;
            }
        }

    }


    // TODO
    export class ArrayOfString extends Array<string>
    {
    }

    export class ClinicalVerificationConfiguration
    {
        private StationaryTypesField = '';
        private StationaryNameField = '';
        private IsSupplyReqInTechValField = false;
        private StationaryTypeCodeField = '';

        public get StationaryTypes():string{
            return this.StationaryTypesField;
        }

        public set StationaryTypes(value: string){  
            if ((Object.is(this.StationaryTypesField, value) != true)){
                this.StationaryTypesField = value;
            }
        }

        public get StationaryName():string{
            return this.StationaryNameField;
        }

        public set StationaryName(value: string){  
            if ((Object.is(this.StationaryNameField, value) != true)){
                this.StationaryNameField = value;
            }
        }

        public get IsSupplyReqInTechVal():boolean{
            return this.IsSupplyReqInTechValField;
        }

        public set IsSupplyReqInTechVal(value: boolean){  
            if ((this.IsSupplyReqInTechValField != value)){
                this.IsSupplyReqInTechValField = value;
            }
        }

        public get StationaryTypeCode():string{
            return this.StationaryTypeCodeField;
        }

        public set StationaryTypeCode(value: string){  
            if ((Object.is(this.StationaryTypeCodeField, value) != true)){
                this.StationaryTypeCodeField = value;
            }
        }

    }


    export class GPConnectConfiguration
    {
        private PrescriptionCodesField = '';

        public get PrescriptionCodes():string{
            return this.PrescriptionCodesField;
        }

        public set PrescriptionCodes(value: string){  
            if ((Object.is(this.PrescriptionCodesField, value) != true)){
                this.PrescriptionCodesField = value;
            }
        }

    }

    export class CMedicationLineDisplayData
    {

        private objLineDisConfigField: Array<LineDisplayConfigurations> = new Array<LineDisplayConfigurations>();

        private sColorCodeField = '';
        private MultipleComponentField = 0;

        public get objLineDisConfig():Array<LineDisplayConfigurations>{
            return this.objLineDisConfigField;
        }

        public set objLineDisConfig(value: Array<LineDisplayConfigurations>){  
            if ((Object.is(this.objLineDisConfigField, value) != true)){
                this.objLineDisConfigField = value;
            }
        }

        public get sColorCode():string{
            return this.sColorCodeField;
        }

        public set sColorCode(value: string){  
            if ((Object.is(this.sColorCodeField, value) != true)){
                this.sColorCodeField = value;
            }
        }

        public get MultipleComponent():number{
            return this.MultipleComponentField;
        }

        public set MultipleComponent(value: number){  
            if ((this.MultipleComponentField != value)){
                this.MultipleComponentField = value;
            }
        }

    }

    
    export class LineDisplayConfigurations
    {
        private FieldCodeField = '';
        private ColCodeField = '';
        private DisPosCodeField = '';
        private QualifierField = '';
        private CaseCodeField = '';
        private FontStyleCodeField = '';
        private IsSelectedField = 0;
        private OrderField = '';

        public get FieldCode():string{
            return this.FieldCodeField;
        }

        public set FieldCode(value: string){  
            if ((Object.is(this.FieldCodeField, value) != true)){
                this.FieldCodeField = value;
            }
        }

        public get ColCode():string{
            return this.ColCodeField;
        }

        public set ColCode(value: string){  
            if ((Object.is(this.ColCodeField, value) != true)){
                this.ColCodeField = value;
            }
        }

        public get DisPosCode():string{
            return this.DisPosCodeField;
        }

        public set DisPosCode(value: string){  
            if ((Object.is(this.DisPosCodeField, value) != true)){
                this.DisPosCodeField = value;
            }
        }

        public get Qualifier():string{
            return this.QualifierField;
        }

        public set Qualifier(value: string){  
            if ((Object.is(this.QualifierField, value) != true)){
                this.QualifierField = value;
            }
        }

        public get CaseCode():string{
            return this.CaseCodeField;
        }

        public set CaseCode(value: string){  
            if ((Object.is(this.CaseCodeField, value) != true)){
                this.CaseCodeField = value;
            }
        }
        
        public get FontStyleCode():string{
            return this.FontStyleCodeField;
        }

        public set FontStyleCode(value: string){  
            if ((Object.is(this.FontStyleCodeField, value) != true)){
                this.FontStyleCodeField = value;
            }
        }

        public get IsSelected():number{
            return this.IsSelectedField;
        }

        public set IsSelected(value: number){  
            if ((this.IsSelectedField != value)){
                this.IsSelectedField = value;
            }
        }

        public get Order():string{
            return this.OrderField;
        }

        public set Order(value: string){  
            if ((Object.is(this.OrderField, value) != true)){
                this.OrderField = value;
            }
        }

    }


    export class ConflictConfigurations
    {
        private ConflictMainTypeField = '';
        private ConfilctSubTypeField = ''
        private ConflictBehaviourField = ''

        public get ConflictMainType():string{
            return this.ConflictMainTypeField;
        }

        public set ConflictMainType(value: string){  
            if ((Object.is(this.ConflictMainTypeField, value) != true)){
                this.ConflictMainTypeField = value;
            }
        }

        public get ConfilctSubType():string{
            return this.ConfilctSubTypeField;
        }

        public set ConfilctSubType(value: string){  
            if ((Object.is(this.ConfilctSubTypeField, value) != true)){
                this.ConfilctSubTypeField = value;
            }
        }

        public get ConflictBehaviour():string{
            return this.ConflictBehaviourField;
        }

        public set ConflictBehaviour(value: string){  
            if ((Object.is(this.ConflictBehaviourField, value) != true)){
                this.ConflictBehaviourField = value;
            }
        }
        
    }

    export class EncounterPresConfigurations 
    {
        private EncounterCodeField = '';
        private PrescriptionCodesField = '';
        private DefaultPresCodeField = '';
        private StatinaryCodesField = '';
        private StatinaryTypesCodeOIDsField = '';
        private StatinaryTypeCodeField = '';
        private DefaultStationaryTypeCodeField = '';
        private DefaultStationaryCodeField = '';
        private DefaultStationeryField = '';
        private IsDefaultField = false;
        private CopyAcrossPresCodesField = '';

        public get EncounterCode():string{
            return this.EncounterCodeField;
        }

        public set EncounterCode(value: string){  
            if ((Object.is(this.EncounterCodeField, value) != true)){
                this.EncounterCodeField = value;
            }
        }

        public get PrescriptionCodes():string{
            return this.PrescriptionCodesField;
        }

        public set PrescriptionCodes(value: string){  
            if ((Object.is(this.PrescriptionCodesField, value) != true)){
                this.PrescriptionCodesField = value;
            }
        }

        public get DefaultPresCode():string{
            return this.DefaultPresCodeField;
        }

        public set DefaultPresCode(value: string){  
            if ((Object.is(this.DefaultPresCodeField, value) != true)){
                this.DefaultPresCodeField = value;
            }
        }
        
        public get StatinaryCodes():string{
            return this.StatinaryCodesField;
        }

        public set StatinaryCodes(value: string){  
            if ((Object.is(this.StatinaryCodesField, value) != true)){
                this.StatinaryCodesField = value;
            }
        }

        public get StatinaryTypesCodeOIDs():string{
            return this.StatinaryTypesCodeOIDsField;
        }

        public set StatinaryTypesCodeOIDs(value: string){  
            if ((Object.is(this.StatinaryTypesCodeOIDsField, value) != true)){
                this.StatinaryTypesCodeOIDsField = value;
            }
        }

        public get StatinaryTypeCode():string{
            return this.StatinaryTypeCodeField;
        }

        public set StatinaryTypeCode(value: string){  
            if ((Object.is(this.StatinaryTypeCodeField, value) != true)){
                this.StatinaryTypeCodeField = value;
            }
        }
        
        public get DefaultStationaryTypeCode():string{
            return this.DefaultStationaryTypeCodeField;
        }

        public set DefaultStationaryTypeCode(value: string){  
            if ((Object.is(this.DefaultStationaryTypeCodeField, value) != true)){
                this.DefaultStationaryTypeCodeField = value;
            }
        }

        public get DefaultStationaryCode():string{
            return this.DefaultStationaryCodeField;
        }

        public set DefaultStationaryCode(value: string){  
            if ((Object.is(this.DefaultStationaryCodeField, value) != true)){
                this.DefaultStationaryCodeField = value;
            }
        }

        public get DefaultStationery():string{
            return this.DefaultStationeryField;
        }

        public set DefaultStationery(value: string){  
            if ((Object.is(this.DefaultStationeryField, value) != true)){
                this.DefaultStationeryField = value;
            }
        }

        public get IsDefault():boolean{
            return this.IsDefaultField;
        }

        public set IsDefault(value: boolean){  
            if ((this.IsDefaultField != value)){
                this.IsDefaultField = value;
            }
        }

        public get CopyAcrossPresCodes():string{
            return this.CopyAcrossPresCodesField;
        }

        public set CopyAcrossPresCodes(value: string){  
            if ((Object.is(this.CopyAcrossPresCodesField, value) != true)){
                this.CopyAcrossPresCodesField = value;
            }
        }

    }

    export class LinkInformation
    {

        private linktypeTextField = '';
        private linktypevalueField = '';
        private URLField = '';
        private URLsuffixField = '';

        public get linktypeText():string{
            return this.linktypeTextField;
        }

        public set linktypeText(value: string){  
            if ((Object.is(this.linktypeTextField, value) != true)){
                this.linktypeTextField = value;
            }
        }

        public get linktypevalue():string{
            return this.linktypevalueField;
        }

        public set linktypevalue(value: string){  
            if ((Object.is(this.linktypevalueField, value) != true)){
                this.linktypevalueField = value;
            }
        }
        
        public get URL():string{
            return this.URLField;
        }

        public set URL(value: string){  
            if ((Object.is(this.URLField, value) != true)){
                this.URLField = value;
            }
        }
        
        public get URLsuffix():string{
            return this.URLsuffixField;
        }

        public set URLsuffix(value: string){  
            if ((Object.is(this.URLsuffixField, value) != true)){
                this.URLsuffixField = value;
            }
        }

    }

    export class MedCatalogueVersionConfigData
    {
        private sActiveVersionField = '';
        private sPrevActiveVersionField = '';
        private sPrepVersionField = '';
        private sArchiveFrmVersionField = '';
        private sRejectedVersionField = '';
        private sPurgeLoadTimeField = '';
        private sPrepTimeField = '';

        public get sActiveVersion():string{
            return this.sActiveVersionField;
        }

        public set sActiveVersion(value: string){  
            if ((Object.is(this.sActiveVersionField, value) != true)){
                this.sActiveVersionField = value;
            }
        }

        public get sPrevActiveVersion():string{
            return this.sPrevActiveVersionField;
        }

        public set sPrevActiveVersion(value: string){  
            if ((Object.is(this.sPrevActiveVersionField, value) != true)){
                this.sPrevActiveVersionField = value;
            }
        }

        public get sPrepVersion():string{
            return this.sPrepVersionField;
        }

        public set sPrepVersion(value: string){  
            if ((Object.is(this.sPrepVersionField, value) != true)){
                this.sPrepVersionField = value;
            }
        }

        public get sArchiveFrmVersion():string{
            return this.sArchiveFrmVersionField;
        }

        public set sArchiveFrmVersion(value: string){  
            if ((Object.is(this.sArchiveFrmVersionField, value) != true)){
                this.sArchiveFrmVersionField = value;
            }
        }

        public get sRejectedVersion():string{
            return this.sRejectedVersionField;
        }

        public set sRejectedVersion(value: string){  
            if ((Object.is(this.sRejectedVersionField, value) != true)){
                this.sRejectedVersionField = value;
            }
        }

        public get sPurgeLoadTime():string{
            return this.sPurgeLoadTimeField;
        }

        public set sPurgeLoadTime(value: string){  
            if ((Object.is(this.sPurgeLoadTimeField, value) != true)){
                this.sPurgeLoadTimeField = value;
            }
        }

        public get sPrepTime():string{
            return this.sPrepTimeField;
        }

        public set sPrepTime(value: string){  
            if ((Object.is(this.sPrepTimeField, value) != true)){
                this.sPrepTimeField = value;
            }
        }
        
    }


    export class MedDoseConfigData 
    {
        private SolidDrugsField = '';
        private LiquidDrugsField = '';

        public get SolidDrugs():string{
            return this.SolidDrugsField;
        }

        public set SolidDrugs(value: string){  
            if ((Object.is(this.SolidDrugsField, value) != true)){
                this.SolidDrugsField = value;
            }
        }

        public get LiquidDrugs():string{
            return this.LiquidDrugsField;
        }

        public set LiquidDrugs(value: string){  
            if ((Object.is(this.LiquidDrugsField, value) != true)){
                this.LiquidDrugsField = value;
            }
        }

    }

    
    export class MedDrugDisplayConfigData
    {

        private FormularyField = '';
        private NonFormularyField = '';

        public get Formulary():string{
            return this.FormularyField;
        }

        public set Formulary(value: string){  
            if ((Object.is(this.FormularyField, value) != true)){
                this.FormularyField = value;
            }
        }

        public get NonFormulary():string{
            return this.NonFormularyField;
        }

        public set NonFormulary(value: string){  
            if ((Object.is(this.NonFormularyField, value) != true)){
                this.NonFormularyField = value;
            }
        }

    }

    export class MedDrugInfoData 
    {
        public get LinksField():Array<LinkInformation>{
            return this.LinksField;
        }

        public set LinksField(value: Array<LinkInformation>){  
            if ((Object.is(this.LinksField, value) != true)){
                this.LinksField = value;
            }
        }

    }

    
    export class MedicationConflictConfigData
    {

        private ConflictType1Field = '';
        private ConflictType2Field = '';
        private ConflictType3Field = '';
        private ConflictType4Field = '';
        private ConflictType5Field = '';
        private DisplayConflictsField = false;
        private WarningSequenceField = '';

        private objConflictConfigField: Array<ConflictConfigurations> = new Array<ConflictConfigurations>();

        public get ConflictType1():string{
            return this.ConflictType1Field;
        }

        public set ConflictType1(value: string){  
            if ((Object.is(this.ConflictType1Field, value) != true)){
                this.ConflictType1Field = value;
            }
        }

        public get ConflictType2():string{
            return this.ConflictType2Field;
        }

        public set ConflictType2(value: string){  
            if ((Object.is(this.ConflictType2Field, value) != true)){
                this.ConflictType2Field = value;
            }
        }

        public get ConflictType3():string{
            return this.ConflictType3Field;
        }

        public set ConflictType3(value: string){  
            if ((Object.is(this.ConflictType3Field, value) != true)){
                this.ConflictType3Field = value;
            }
        }

        public get ConflictType4():string{
            return this.ConflictType4Field;
        }

        public set ConflictType4(value: string){  
            if ((Object.is(this.ConflictType4Field, value) != true)){
                this.ConflictType4Field = value;
            }
        }
        
        public get ConflictType5():string{
            return this.ConflictType5Field;
        }

        public set ConflictType5(value: string){  
            if ((Object.is(this.ConflictType5Field, value) != true)){
                this.ConflictType5Field = value;
            }
        }

        public get DisplayConflicts():boolean{
            return this.DisplayConflictsField;
        }

        public set DisplayConflicts(value: boolean){  
            if ((this.DisplayConflictsField != value)){
                this.DisplayConflictsField = value;
            }
        }

        public get WarningSequence():string{
            return this.WarningSequenceField;
        }

        public set WarningSequence(value: string){  
            if ((Object.is(this.WarningSequenceField, value) != true)){
                this.WarningSequenceField = value;
            }
        }
        
        public get objConflictConfig():Array<ConflictConfigurations>{
            return this.objConflictConfigField;
        }

        public set objConflictConfig(value: Array<ConflictConfigurations>){  
            if ((Object.is(this.objConflictConfigField, value) != true)){
                this.objConflictConfigField = value;
            }
        }

    }

    
    export class MedicationResultsViewCount
    {
        private nRecordsCountField = 0;

        public get nRecordsCount():number{
            return this.nRecordsCountField;
        }

        public set nRecordsCount(value: number){  
            if ((this.nRecordsCountField != value)){
                this.nRecordsCountField = value;
            }
        }

    }


    export class MedicationSearchConfigData
    {
        private DefaultPowerSearchField = '';

        private PowerSearchConfigField: Array<PowerSearchConfigurationData> = new Array<PowerSearchConfigurationData>();

        public get DefaultPowerSearch():string{
            return this.DefaultPowerSearchField;
        }

        public set DefaultPowerSearch(value: string){  
            if ((Object.is(this.DefaultPowerSearchField, value) != true)){
                this.DefaultPowerSearchField = value;
            }
        }

        public get PowerSearchConfig():Array<PowerSearchConfigurationData> {
            return this.PowerSearchConfigField;
        }

        public set PowerSearchConfig(value: Array<PowerSearchConfigurationData> ){  
            if ((Object.is(this.PowerSearchConfigField, value) != true)){
                this.PowerSearchConfigField = value;
            }
        }

		//TFS 5203 BNS AM change
        private DisplayAMBrandOptionField = '';

        public get DisplayAMBrandOption():string{
            return this.DisplayAMBrandOptionField;
        }

        public set DisplayAMBrandOption(value: string){  
            if ((Object.is(this.DisplayAMBrandOptionField, value) != true)){
                this.DisplayAMBrandOptionField = value;
            }
        }

    }

    
    export class PowerSearchConfigurationData
    {
        private SearchOptionField = '';
        private SearchOptionValueField = '';
        private ItemTypeField = '';
        private ItemTypeValueField = '';
        private PrimaryResultListField = '';
        private PrimaryResultListValueField = '';
        private SecondaryResultListField = '';
        private SecondaryResultListValueField = '';
        private ShowPrescribebybrandoptionsField = '';
        private ShowfluidforinfusionsField = '';
        private AlwaysDisplayInPrimaryListField = '';

        public get SearchOption():string{
            return this.SearchOptionField;
        }

        public set SearchOption(value: string){  
            if ((Object.is(this.SearchOptionField, value) != true)){
                this.SearchOptionField = value;
            }
        }

        public get SearchOptionValue():string{
            return this.SearchOptionValueField;
        }

        public set SearchOptionValue(value: string){  
            if ((Object.is(this.SearchOptionValueField, value) != true)){
                this.SearchOptionValueField = value;
            }
        }

        public get ItemType():string{
            return this.ItemTypeField;
        }

        public set ItemType(value: string){  
            if ((Object.is(this.ItemTypeField, value) != true)){
                this.ItemTypeField = value;
            }
        }

        public get ItemTypeValue():string{
            return this.ItemTypeValueField;
        }

        public set ItemTypeValue(value: string){  
            if ((Object.is(this.ItemTypeValueField, value) != true)){
                this.ItemTypeValueField = value;
            }
        }
        
        public get PrimaryResultList():string{
            return this.PrimaryResultListField;
        }

        public set PrimaryResultList(value: string){  
            if ((Object.is(this.PrimaryResultListField, value) != true)){
                this.PrimaryResultListField = value;
            }
        }
        
        public get PrimaryResultListValue():string{
            return this.PrimaryResultListValueField;
        }

        public set PrimaryResultListValue(value: string){  
            if ((Object.is(this.PrimaryResultListValueField, value) != true)){
                this.PrimaryResultListValueField = value;
            }
        }
        
        public get SecondaryResultList():string{
            return this.SecondaryResultListField;
        }

        public set SecondaryResultList(value: string){  
            if ((Object.is(this.SecondaryResultListField, value) != true)){
                this.SecondaryResultListField = value;
            }
        }

        public get SecondaryResultListValue():string{
            return this.SecondaryResultListValueField;
        }

        public set SecondaryResultListValue(value: string){  
            if ((Object.is(this.SecondaryResultListValueField, value) != true)){
                this.SecondaryResultListValueField = value;
            }
        }

        public get ShowPrescribebybrandoptions():string{
            return this.ShowPrescribebybrandoptionsField;
        }

        public set ShowPrescribebybrandoptions(value: string){  
            if ((Object.is(this.ShowPrescribebybrandoptionsField, value) != true)){
                this.ShowPrescribebybrandoptionsField = value;
            }
        }
        
        public get Showfluidforinfusions():string{
            return this.ShowfluidforinfusionsField;
        }

        public set Showfluidforinfusions(value: string){  
            if ((Object.is(this.ShowfluidforinfusionsField, value) != true)){
                this.ShowfluidforinfusionsField = value;
            }
        }
        
        public get AlwaysDisplayInPrimaryList():string{
            return this.AlwaysDisplayInPrimaryListField;
        }

        public set AlwaysDisplayInPrimaryList(value: string){  
            if ((Object.is(this.AlwaysDisplayInPrimaryListField, value) != true)){
                this.AlwaysDisplayInPrimaryListField = value;
            }
        }
        
    }

    export class MedicationViewConfigData
    {
        private DefaultGroupByField = '';
        private DefaultFilterByField = '';
        private GroupByColsField = '';
        private CurMedExpiryDurationField = '';
        private DrugsExpiryDurationField = '';
        private FavouritesField = false;
        private DrugCatalogueField = false;
        private FormularyField = false;
        private CancelledDrugField = false;
        private DiscontinuedDrugField = false;
        private PatMedColsField = '';
        private OtherLinksField = '';

        public get DefaultGroupBy():string{
            return this.DefaultGroupByField;
        }

        public set DefaultGroupBy(value: string){  
            if ((Object.is(this.DefaultGroupByField, value) != true)){
                this.DefaultGroupByField = value;
            }
        }

        public get DefaultFilterBy():string{
            return this.DefaultFilterByField;
        }

        public set DefaultFilterBy(value: string){  
            if ((Object.is(this.DefaultFilterByField, value) != true)){
                this.DefaultFilterByField = value;
            }
        }

        public get GroupByCols():string{
            return this.GroupByColsField;
        }

        public set GroupByCols(value: string){  
            if ((Object.is(this.GroupByColsField, value) != true)){
                this.GroupByColsField = value;
            }
        }
        
        public get CurMedExpiryDuration():string{
            return this.CurMedExpiryDurationField;
        }

        public set CurMedExpiryDuration(value: string){  
            if ((Object.is(this.CurMedExpiryDurationField, value) != true)){
                this.CurMedExpiryDurationField = value;
            }
        }

        public get DrugsExpiryDuration():string{
            return this.DrugsExpiryDurationField;
        }

        public set DrugsExpiryDuration(value: string){  
            if ((Object.is(this.DrugsExpiryDurationField, value) != true)){
                this.DrugsExpiryDurationField = value;
            }
        }
        
        public get Favourites():boolean{
            return this.FavouritesField;
        }

        public set Favourites(value: boolean){  
            if ((this.FavouritesField != value)){
                this.FavouritesField = value;
            }
        }
        
        public get DrugCatalogue():boolean{
            return this.DrugCatalogueField;
        }

        public set DrugCatalogue(value: boolean){  
            if ((this.DrugCatalogueField != value)){
                this.DrugCatalogueField = value;
            }
        }

        public get Formulary():boolean{
            return this.FormularyField;
        }

        public set Formulary(value: boolean){  
            if ((this.FormularyField != value)){
                this.FormularyField = value;
            }
        }

        public get CancelledDrug():boolean{
            return this.CancelledDrugField;
        }

        public set CancelledDrug(value: boolean){  
            if ((this.CancelledDrugField != value)){
                this.CancelledDrugField = value;
            }
        }
        
        public get DiscontinuedDrug():boolean{
            return this.DiscontinuedDrugField;
        }

        public set DiscontinuedDrug(value: boolean){  
            if ((this.DiscontinuedDrugField != value)){
                this.DiscontinuedDrugField = value;
            }
        }

        public get PatMedCols():string{
            return this.PatMedColsField;
        }

        public set PatMedCols(value: string){  
            if ((Object.is(this.PatMedColsField, value) != true)){
                this.PatMedColsField = value;
            }
        }

        public get OtherLinks():string{
            return this.OtherLinksField;
        }

        public set OtherLinks(value: string){  
            if ((Object.is(this.OtherLinksField, value) != true)){
                this.OtherLinksField = value;
            }
        }
        
    }


    export class MedNotificData
    {
        private GroupField = '';
        private ObjectNameField = '';
        private ObjectOidField = 0;
        private MCVFormatField = '';
        private MCVIncrementField = '';
        private PrepTimeField = '';

        public get Group():string{
            return this.GroupField;
        }

        public set Group(value: string){  
            if ((Object.is(this.GroupField, value) != true)){
                this.GroupField = value;
            }
        }

        public get ObjectName():string{
            return this.ObjectNameField;
        }

        public set ObjectName(value: string){  
            if ((Object.is(this.ObjectNameField, value) != true)){
                this.ObjectNameField = value;
            }
        }

        public get ObjectOid():number{
            return this.ObjectOidField;
        }

        public set ObjectOid(value: number){  
            if ((this.ObjectOidField != value)){
                this.ObjectOidField = value;
            }
        }

        public get MCVFormat():string{
            return this.MCVFormatField;
        }

        public set MCVFormat(value: string){  
            if ((Object.is(this.MCVFormatField, value) != true)){
                this.MCVFormatField = value;
            }
        }
        
        public get MCVIncrement():string{
            return this.MCVIncrementField;
        }

        public set MCVIncrement(value: string){  
            if ((Object.is(this.MCVIncrementField, value) != true)){
                this.MCVIncrementField = value;
            }
        }

        public get PrepTime():string{
            return this.PrepTimeField;
        }

        public set PrepTime(value: string){  
            if ((Object.is(this.PrepTimeField, value) != true)){
                this.PrepTimeField = value;
            }
        }
        
    }


    export class PrescribingConfigData
    {
        private ReasonMandatoryField = false;
        private AllowUserFavoritesField = false;
        private AlertPartentRowField = false;
        private AutoLaunchField = false;
        private IncludeEventDatesField = false;
        private PromptAllergyReviewField = false;
        private PaediatricsAgeRangeField = 0;
        private PaediatricsAgeRangeTopField = 0;
        private PaediatricsAgeUOMField = '';
        private NoOfResultDispField = 0;
        private BNFURLField = '';

        private HghtWghtPromptField!: ArrayOfString;
        private AllergyPromptField!: ArrayOfString;
        private StatRoleField!: ArrayOfString;
        private SlotTimeField!: ArrayOfString;

        private MultipleComponentField = 0;
        private CrossMatchField = false;
        private ConfigDateDurationField = 0;
        private ConfigDateDurationTypeField = '';
        private FavouriteFolderField = '';
        private FavouriteOIDField = 0;
        private FavouriteFolderLorenzoIDField = '';
        private CommonFavoFolderField = '';
        private CommonFavoOIDField = 0;
        private CommonFavoLorenzoIDField = '';
        private CommonCDCFavFolderField = '';
        private CommonCDCFavOIDField = 0;
        private CommonCDCFavLzoIDField = '';
        private  EnableDoseCalcField = false;
        public AdjfactorAdjBWcalcField = 0;
        private IdealBodyWeightPercentageExceedsField = 0;
        private HeightWeightCDCFormCodeField = '';
        private HeightWeightCDCFormNameField = '';
        private HeightWeightChangeAlertField = false;

        private HghtWghtPromptCriteriaField: Array<HghtWghtPrompt> = new Array<HghtWghtPrompt>();
        //622262: Flag control 'PromptFreqMoreOptionField'is declared to use it,
        //in MedPrescribingConfig.aspx.cs for Loading data with saved changes.
        private PromptFreqMoreOptionField = false;
		private LaunchInpatientPresField = false;
        //RR Clerk
        private ClerkFormViewDefautCodeField = '';


        public get ReasonMandatory():boolean{
            return this.ReasonMandatoryField;
        }

        public set ReasonMandatory(value: boolean){  
            if ((this.ReasonMandatoryField != value)){
                this.ReasonMandatoryField = value;
            }
        }

        public get AllowUserFavorites():boolean{
            return this.AllowUserFavoritesField;
        }

        public set AllowUserFavorites(value: boolean){  
            if ((this.AllowUserFavoritesField != value)){
                this.AllowUserFavoritesField = value;
            }
        }
        
        public get AlertPartentRow():boolean{
            return this.AlertPartentRowField;
        }

        public set AlertPartentRow(value: boolean){  
            if ((this.AlertPartentRowField != value)){
                this.AlertPartentRowField = value;
            }
        }

        public get AutoLaunch():boolean{
            return this.AutoLaunchField;
        }

        public set AutoLaunch(value: boolean){  
            if ((this.AutoLaunchField != value)){
                this.AutoLaunchField = value;
            }
        }
        
        public get IncludeEventDates():boolean{
            return this.IncludeEventDatesField;
        }

        public set IncludeEventDates(value: boolean){  
            if ((this.IncludeEventDatesField != value)){
                this.IncludeEventDatesField = value;
            }
        }
        
        public get PromptAllergyReview():boolean{
            return this.PromptAllergyReviewField;
        }

        public set PromptAllergyReview(value: boolean){  
            if ((this.PromptAllergyReviewField != value)){
                this.PromptAllergyReviewField = value;
            }
        }
        
        public get PaediatricsAgeRange():number{
            return this.PaediatricsAgeRangeField;
        }

        public set PaediatricsAgeRange(value: number){  
            if ((this.PaediatricsAgeRangeField != value)){
                this.PaediatricsAgeRangeField = value;
            }
        }
        
        public get PaediatricsAgeRangeTop():number{
            return this.PaediatricsAgeRangeTopField;
        }

        public set PaediatricsAgeRangeTop(value: number){  
            if ((this.PaediatricsAgeRangeTopField != value)){
                this.PaediatricsAgeRangeTopField = value;
            }
        }
        
        public get PaediatricsAgeUOM():string{
            return this.PaediatricsAgeUOMField;
        }

        public set PaediatricsAgeUOM(value: string){  
            if ((Object.is(this.PaediatricsAgeUOMField, value) != true)){
                this.PaediatricsAgeUOMField = value;
            }
        }
        
        public get NoOfResultDisp():number{
            return this.NoOfResultDispField;
        }

        public set NoOfResultDisp(value: number){  
            if ((this.NoOfResultDispField != value)){
                this.NoOfResultDispField = value;
            }
        }

        public get BNFURL():string{
            return this.BNFURLField;
        }

        public set BNFURL(value: string){  
            if ((Object.is(this.BNFURLField, value) != true)){
                this.BNFURLField = value;
            }
        }

        public get HghtWghtPrompt():ArrayOfString{
            return this.HghtWghtPromptField;
        }

        public set HghtWghtPrompt(value: ArrayOfString){  
            if ((Object.is(this.HghtWghtPromptField, value) != true)){
                this.HghtWghtPromptField = value;
            }
        }
        
        public get AllergyPrompt():ArrayOfString{
            return this.AllergyPromptField;
        }

        public set AllergyPrompt(value: ArrayOfString){  
            if ((Object.is(this.AllergyPromptField, value) != true)){
                this.AllergyPromptField = value;
            }
        }
        
        public get StatRole():ArrayOfString{
            return this.StatRoleField;
        }

        public set StatRole(value: ArrayOfString){  
            if ((Object.is(this.StatRoleField, value) != true)){
                this.StatRoleField = value;
            }
        }
        
        public get SlotTime():ArrayOfString{
            return this.SlotTimeField;
        }

        public set SlotTime(value: ArrayOfString){  
            if ((Object.is(this.SlotTimeField, value) != true)){
                this.SlotTimeField = value;
            }
        }

        public get MultipleComponent():number{
            return this.MultipleComponentField;
        }

        public set MultipleComponent(value: number){  
            if ((this.MultipleComponentField != value)){
                this.MultipleComponentField = value;
            }
        }

        public get CrossMatch():boolean{
            return this.CrossMatchField;
        }

        public set CrossMatch(value: boolean){  
            if ((this.CrossMatchField != value)){
                this.CrossMatchField = value;
            }
        }

        public get ConfigDateDuration():number{
            return this.ConfigDateDurationField;
        }

        public set ConfigDateDuration(value: number){  
            if ((this.ConfigDateDurationField != value)){
                this.ConfigDateDurationField = value;
            }
        }
        
        public get ConfigDateDurationType():string{
            return this.ConfigDateDurationTypeField;
        }

        public set ConfigDateDurationType(value: string){  
            if ((Object.is(this.ConfigDateDurationTypeField, value) != true)){
                this.ConfigDateDurationTypeField = value;
            }
        }

        public get FavouriteFolder():string{
            return this.FavouriteFolderField;
        }

        public set FavouriteFolder(value: string){  
            if ((Object.is(this.FavouriteFolderField, value) != true)){
                this.FavouriteFolderField = value;
            }
        }

        public get FavouriteOID():number{
            return this.FavouriteOIDField;
        }

        public set FavouriteOID(value: number){  
            if ((this.FavouriteOIDField != value)){
                this.FavouriteOIDField = value;
            }
        }

        public get FavouriteFolderLorenzoID():string{
            return this.FavouriteFolderLorenzoIDField;
        }

        public set FavouriteFolderLorenzoID(value: string){  
            if ((Object.is(this.FavouriteFolderLorenzoIDField, value) != true)){
                this.FavouriteFolderLorenzoIDField = value;
            }
        }

        public get CommonFavoFolder():string{
            return this.CommonFavoFolderField;
        }

        public set CommonFavoFolder(value: string){  
            if ((Object.is(this.CommonFavoFolderField, value) != true)){
                this.CommonFavoFolderField = value;
            }
        }

        public get CommonFavoOID():number{
            return this.CommonFavoOIDField;
        }

        public set CommonFavoOID(value: number){  
            if ((this.CommonFavoOIDField != value)){
                this.CommonFavoOIDField = value;
            }
        }
        
        public get CommonFavoLorenzoID():string{
            return this.CommonFavoLorenzoIDField;
        }

        public set CommonFavoLorenzoID(value: string){  
            if ((Object.is(this.CommonFavoLorenzoIDField, value) != true)){
                this.CommonFavoLorenzoIDField = value;
            }
        }

        public get CommonCDCFavFolder():string{
            return this.CommonCDCFavFolderField;
        }

        public set CommonCDCFavFolder(value: string){  
            if ((Object.is(this.CommonCDCFavFolderField, value) != true)){
                this.CommonCDCFavFolderField = value;
            }
        }

        public get CommonCDCFavOID():number{
            return this.CommonCDCFavOIDField;
        }

        public set CommonCDCFavOID(value: number){  
            if ((this.CommonCDCFavOIDField != value)){
                this.CommonCDCFavOIDField = value;
            }
        }
        
        public get CommonCDCFavLzoID():string{
            return this.CommonCDCFavLzoIDField;
        }

        public set CommonCDCFavLzoID(value: string){  
            if ((Object.is(this.CommonCDCFavLzoIDField, value) != true)){
                this.CommonCDCFavLzoIDField = value;
            }
        }

        public get EnableDoseCalc():boolean{
            return this.EnableDoseCalcField;
        }

        public set EnableDoseCalc(value: boolean){  
            if ((this.EnableDoseCalcField != value)){
                this.EnableDoseCalcField = value;
            }
        }
        
        public get AdjfactorAdjBWcalc():number{
            return this.AdjfactorAdjBWcalcField;
        }

        public set AdjfactorAdjBWcalc(value: number){  
            if ((this.AdjfactorAdjBWcalcField != value)){
                this.AdjfactorAdjBWcalcField = value;
            }
        }

        public get IdealBodyWeightPercentageExceeds():number{
            return this.IdealBodyWeightPercentageExceedsField;
        }

        public set IdealBodyWeightPercentageExceeds(value: number){  
            if ((this.IdealBodyWeightPercentageExceedsField != value)){
                this.IdealBodyWeightPercentageExceedsField = value;
            }
        }

        public get HeightWeightCDCFormCode():string{
            return this.HeightWeightCDCFormCodeField;
        }

        public set HeightWeightCDCFormCode(value: string){  
            if ((Object.is(this.HeightWeightCDCFormCodeField, value) != true)){
                this.HeightWeightCDCFormCodeField = value;
            }
        }

        public get HeightWeightCDCFormName():string{
            return this.HeightWeightCDCFormNameField;
        }

        public set HeightWeightCDCFormName(value: string){  
            if ((Object.is(this.HeightWeightCDCFormNameField, value) != true)){
                this.HeightWeightCDCFormNameField = value;
            }
        }
        
        public get HeightWeightChangeAlert():boolean{
            return this.HeightWeightChangeAlertField;
        }

        public set HeightWeightChangeAlert(value: boolean){  
            if ((this.HeightWeightChangeAlertField != value)){
                this.HeightWeightChangeAlertField = value;
            }
        }

        public get HghtWghtPromptCriteria():Array<HghtWghtPrompt>{
            return this.HghtWghtPromptCriteriaField;
        }

        public set HghtWghtPromptCriteria(value: Array<HghtWghtPrompt>){  
            if ((Object.is(this.HghtWghtPromptCriteriaField, value) != true)){
                this.HghtWghtPromptCriteriaField = value;
            }
        }
        
        //622262: Setting the Get,Set  property for the 'PromptFreqMoreOption'
        public get PromptFreqMoreOption():boolean{
            return this.PromptFreqMoreOptionField;
        }

        public set PromptFreqMoreOption(value: boolean){  
            if ((this.PromptFreqMoreOptionField != value)){
                this.PromptFreqMoreOptionField = value;
            }
        }

        public get LaunchInpatientPres():boolean{
            return this.LaunchInpatientPresField;
        }

        public set LaunchInpatientPres(value: boolean){  
            if ((this.LaunchInpatientPresField != value)){
                this.LaunchInpatientPresField = value;
            }
        }

        public get ClerkFormViewDefautCode():string{
            return this.ClerkFormViewDefautCodeField;
        }

        public set ClerkFormViewDefautCode(value: string){  
            if ((Object.is(this.ClerkFormViewDefautCodeField, value) != true)){
                this.ClerkFormViewDefautCodeField = value;
            }
        }
    
    }

    export class HghtWghtPrompt
    {
        private AgeRangeValueField = '';
        private AgeRangeUOMCodeField = '';
        private DurationField = 0;
        private DurationCodeField = '';
        private HeightWeightField = '';
        private HeightWeightCodeField = '';

        public get AgeRangeValue():string{
            return this.AgeRangeValueField;
        }

        public set AgeRangeValue(value: string){  
            if ((Object.is(this.AgeRangeValueField, value) != true)){
                this.AgeRangeValueField = value;
            }
        }

        public get AgeRangeUOMCode():string{
            return this.AgeRangeUOMCodeField;
        }

        public set AgeRangeUOMCode(value: string){  
            if ((Object.is(this.AgeRangeUOMCodeField, value) != true)){
                this.AgeRangeUOMCodeField = value;
            }
        }
        
        public get Duration():number{
            return this.DurationField;
        }

        public set Duration(value: number){  
            if ((this.DurationField != value)){
                this.DurationField = value;
            }
        }

        public get DurationCode():string{
            return this.DurationCodeField;
        }

        public set DurationCode(value: string){  
            if ((Object.is(this.DurationCodeField, value) != true)){
                this.DurationCodeField = value;
            }
        }

        public get HeightWeight():string{
            return this.HeightWeightField;
        }

        public set HeightWeight(value: string){  
            if ((Object.is(this.HeightWeightField, value) != true)){
                this.HeightWeightField = value;
            }
        }
        
        public get HeightWeightCode():string{
            return this.HeightWeightCodeField;
        }

        public set HeightWeightCode(value: string){  
            if ((Object.is(this.HeightWeightCodeField, value) != true)){
                this.HeightWeightCodeField = value;
            }
        }

    }

    
    export class PrescribingMethodConfigData
    {
        private PowerSearchCategoriesField = '';

        private EncounPresConfigField: Array<EncounterPresConfigurations> = new Array<EncounterPresConfigurations>() ;

        public get PowerSearchCategories():string{
            return this.PowerSearchCategoriesField;
        }

        public set PowerSearchCategories(value: string){  
            if ((Object.is(this.PowerSearchCategoriesField, value) != true)){
                this.PowerSearchCategoriesField = value;
            }
        }

        public get EncounPresConfig():Array<EncounterPresConfigurations>{
            return this.EncounPresConfigField;
        }

        public set EncounPresConfig(value: Array<EncounterPresConfigurations>){  
            if ((Object.is(this.EncounPresConfigField, value) != true)){
                this.EncounPresConfigField = value;
            }
        }

    }


    export class PrescriptionViewConfigData
    {
        private ColourPriorDischargeField = '';
        private AlertDurationField = '';
        private ColourPastDischargeField = '';
        private RemovePrescriptionField = 0;

        public get ColourPriorDischarge():string{
            return this.ColourPriorDischargeField;
        }

        public set ColourPriorDischarge(value: string){  
            if ((Object.is(this.ColourPriorDischargeField, value) != true)){
                this.ColourPriorDischargeField = value;
            }
        }

        public get AlertDuration():string{
            return this.AlertDurationField;
        }

        public set AlertDuration(value: string){  
            if ((Object.is(this.AlertDurationField, value) != true)){
                this.AlertDurationField = value;
            }
        }

        public get ColourPastDischarge():string{
            return this.ColourPastDischargeField;
        }

        public set ColourPastDischarge(value: string){  
            if ((Object.is(this.ColourPastDischargeField, value) != true)){
                this.ColourPastDischargeField = value;
            }
        }

        public get RemovePrescription():number{
            return this.RemovePrescriptionField;
        }

        public set RemovePrescription(value: number){  
            if ((this.RemovePrescriptionField != value)){
                this.RemovePrescriptionField = value;
            }
        }

    }

    
    export class PrintConfigurationData
    {

        private ActivityConfigDataField: Array<ActivityConfigurationData> = new Array<ActivityConfigurationData>();

        private ReplacementDurationField = 0;
        private IsLocalPrinterOverrideField = false;

        public get ActivityConfigData():Array<ActivityConfigurationData>{
            return this.ActivityConfigDataField;
        }

        public set ActivityConfigData(value: Array<ActivityConfigurationData>){  
            if ((Object.is(this.ActivityConfigDataField, value) != true)){
                this.ActivityConfigDataField = value;
            }
        }

        public get ReplacementDuration():number{
            return this.ReplacementDurationField;
        }

        public set ReplacementDuration(value: number){  
            if ((this.ReplacementDurationField != value)){
                this.ReplacementDurationField = value;
            }
        }

        public get IsLocalPrinterOverride():boolean{
            return this.IsLocalPrinterOverrideField;
        }

        public set IsLocalPrinterOverride(value: boolean){  
            if ((this.IsLocalPrinterOverrideField != value)){
                this.IsLocalPrinterOverrideField = value;
            }
        }

    }

    export class CChartDisplayConfig
    {
        private OverDueSlotsColorField = '';
        private DueSlotsColorField = '';
        private OmittedSlotsColorField = '';
        private AsRequiredSlotsColorField = '';
        private TodayOutlineColorField = '';

        public get OverDueSlotsColor():string{
            return this.OverDueSlotsColorField;
        }

        public set OverDueSlotsColor(value: string){  
            if ((Object.is(this.OverDueSlotsColorField, value) != true)){
                this.OverDueSlotsColorField = value;
            }
        }

        public get DueSlotsColor():string{
            return this.DueSlotsColorField;
        }

        public set DueSlotsColor(value: string){  
            if ((Object.is(this.DueSlotsColorField, value) != true)){
                this.DueSlotsColorField = value;
            }
        }

        public get OmittedSlotsColor():string{
            return this.OmittedSlotsColorField;
        }

        public set OmittedSlotsColor(value: string){  
            if ((Object.is(this.OmittedSlotsColorField, value) != true)){
                this.OmittedSlotsColorField = value;
            }
        }

        public get AsRequiredSlotsColor():string{
            return this.AsRequiredSlotsColorField;
        }

        public set AsRequiredSlotsColor(value: string){  
            if ((Object.is(this.AsRequiredSlotsColorField, value) != true)){
                this.AsRequiredSlotsColorField = value;
            }
        }
        
        public get TodayOutlineColor():string{
            return this.TodayOutlineColorField;
        }

        public set TodayOutlineColor(value: string){  
            if ((Object.is(this.TodayOutlineColorField, value) != true)){
                this.TodayOutlineColorField = value;
            }
        }

    }


    export class CClinicalIncidentConfig
    {
        private AddressField = '';
        private LinkTextToDisplayField = '';
        private isModifyAdministrationField = false;
        private isStrikeThroughAdministrationField = false;
        private isRecordAdminDoseDiscrepancyField = false;
        private isRecordAdminWitnessOverrideField = false;

        public get Address():string{
            return this.AddressField;
        }

        public set Address(value: string){  
            if ((Object.is(this.AddressField, value) != true)){
                this.AddressField = value;
            }
        }

        public get LinkTextToDisplay():string{
            return this.LinkTextToDisplayField;
        }

        public set LinkTextToDisplay(value: string){  
            if ((Object.is(this.LinkTextToDisplayField, value) != true)){
                this.LinkTextToDisplayField = value;
            }
        }

        public get isModifyAdministration():boolean{
            return this.isModifyAdministrationField;
        }

        public set isModifyAdministration(value: boolean){  
            if ((this.isModifyAdministrationField != value)){
                this.isModifyAdministrationField = value;
            }
        }

        public get isStrikeThroughAdministration():boolean{
            return this.isStrikeThroughAdministrationField;
        }

        public set isStrikeThroughAdministration(value: boolean){  
            if ((this.isStrikeThroughAdministrationField != value)){
                this.isStrikeThroughAdministrationField = value;
            }
        }

        public get isRecordAdminDoseDiscrepancy():boolean{
            return this.isRecordAdminDoseDiscrepancyField;
        }

        public set isRecordAdminDoseDiscrepancy(value: boolean){  
            if ((this.isRecordAdminDoseDiscrepancyField != value)){
                this.isRecordAdminDoseDiscrepancyField = value;
            }
        }

        public get isRecordAdminWitnessOverride():boolean{
            return this.isRecordAdminWitnessOverrideField;
        }

        public set isRecordAdminWitnessOverride(value: boolean){  
            if ((this.isRecordAdminWitnessOverrideField != value)){
                this.isRecordAdminWitnessOverrideField = value;
            }
        }

    }


    export class CSlotCharacteristicsConfig
    {
        private DuenessThresholdField = 0;
        private AdvDurationForRecordingField = 0;
        private SlotModificationTimeField = 0;

        public get DuenessThreshold():number{
            return this.DuenessThresholdField;
        }

        public set DuenessThreshold(value: number){  
            if ((this.DuenessThresholdField != value)){
                this.DuenessThresholdField = value;
            }
        }

        public get AdvDurationForRecording():number{
            return this.AdvDurationForRecordingField;
        }

        public set AdvDurationForRecording(value: number){  
            if ((this.AdvDurationForRecordingField != value)){
                this.AdvDurationForRecordingField = value;
            }
        }

        public get SlotModificationTime():number{
            return this.SlotModificationTimeField;
        }

        public set SlotModificationTime(value: number){  
            if ((this.SlotModificationTimeField != value)){
                this.SlotModificationTimeField = value;
            }
        }

    }


    export class MedDrugRoundView
    {
        private ServicePointTypeField = '';
        private ServicePointField = '';
        private ServicePointOIDField = '';

        public get ServicePointType():string{
            return this.ServicePointTypeField;
        }

        public set ServicePointType(value: string){  
            if ((Object.is(this.ServicePointTypeField, value) != true)){
                this.ServicePointTypeField = value;
            }
        }

        public get ServicePoint():string{
            return this.ServicePointField;
        }

        public set ServicePoint(value: string){  
            if ((Object.is(this.ServicePointField, value) != true)){
                this.ServicePointField = value;
            }
        }

        public get ServicePointOID():string{
            return this.ServicePointOIDField;
        }

        public set ServicePointOID(value: string){  
            if ((Object.is(this.ServicePointOIDField, value) != true)){
                this.ServicePointOIDField = value;
            }
        }

    }


    export class ScheduleConfig 
    {
        private SlotTimesTypeForAdminField = '';
        private TimeParamForAlertingField = 0;
        private AdminTimeReqforPRNField = false;

        public get SlotTimesTypeForAdmin():string{
            return this.SlotTimesTypeForAdminField;
        }

        public set SlotTimesTypeForAdmin(value: string){  
            if ((Object.is(this.SlotTimesTypeForAdminField, value) != true)){
                this.SlotTimesTypeForAdminField = value;
            }
        }

        public get TimeParamForAlerting():number{
            return this.TimeParamForAlertingField;
        }

        public set TimeParamForAlerting(value: number){  
            if ((this.TimeParamForAlertingField != value)){
                this.TimeParamForAlertingField = value;
            }
        }

        public get AdminTimeReqforPRN():boolean{
            return this.AdminTimeReqforPRNField;
        }

        public set AdminTimeReqforPRN(value: boolean){  
            if ((this.AdminTimeReqforPRNField != value)){
                this.AdminTimeReqforPRNField = value;
            }
        }

    }

    //Reverting DST Part-1 :: CS # 626673 / Jira # 139785
	/*//
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name = "DSTConfig", Namespace = "http://isoftplc.com/")]
    public partial class DSTConfig : object, System.ComponentModel.INotifyPropertyChanged
    {

        private string DSTAdmintimesField;        

        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false)]
        public string DSTAdmintimes
        {
            get
            {
                return this.DSTAdmintimesField;
            }
            set
            {
                if ((object.ReferenceEquals(this.DSTAdmintimesField, value) != true))
                {
                    this.DSTAdmintimesField = value;
                    this.RaisePropertyChanged("DSTAdmintimes");
                }
            }
        }        

        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;

        protected void RaisePropertyChanged(string propertyName)
        {
            System.ComponentModel.PropertyChangedEventHandler propertyChanged = this.PropertyChanged;
            if ((propertyChanged != null))
            {
                propertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
            }
        }
    }
    //*/

    //Reverting DST Part-1 :: CS # 626673 / Jira # 139785
    /*//
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(IsWrapped = false)]
    public partial class GetDSTConfigRequest
    {
        [System.ServiceModel.MessageBodyMemberAttribute(Name = "GetDSTConfig", Namespace = "http://isoftplc.com/", Order = 0)]
        public iSOFT.LORENZO.BlueBird.Profiles.TTO.GetDSTConfigRequestBody Body;

        public GetDSTConfigRequest()
        {
        }

        public GetDSTConfigRequest(iSOFT.LORENZO.BlueBird.Profiles.TTO.GetDSTConfigRequestBody Body)
        {
            this.Body = Body;
        }
    }

    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.Runtime.Serialization.DataContractAttribute()]
    public partial class GetDSTConfigRequestBody
    {
        public GetDSTConfigRequestBody()
        {
        }
    }

    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(IsWrapped = false)]
    public partial class GetDSTConfigResponse
    {
        [System.ServiceModel.MessageBodyMemberAttribute(Name = "GetDSTConfigResponse", Namespace = "http://isoftplc.com/", Order = 0)]
        public iSOFT.LORENZO.BlueBird.Profiles.TTO.GetDSTConfigResponseBody Body;

        public GetDSTConfigResponse()
        {
        }

        public GetDSTConfigResponse(iSOFT.LORENZO.BlueBird.Profiles.TTO.GetDSTConfigResponseBody Body)
        {
            this.Body = Body;
        }
    }

    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.Runtime.Serialization.DataContractAttribute(Namespace = "http://isoftplc.com/")]
    public partial class GetDSTConfigResponseBody
    {
        [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 0)]
        public iSOFT.LORENZO.BlueBird.Profiles.TTO.DSTConfig GetDSTConfigResult;

        public GetDSTConfigResponseBody()
        {
        }

        public GetDSTConfigResponseBody(iSOFT.LORENZO.BlueBird.Profiles.TTO.DSTConfig GetDSTConfigResult)
        {
            this.GetDSTConfigResult = GetDSTConfigResult;
        }
    }
    //*/

    // [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    // public interface ProfileClsSoapChannel : iSOFT.LORENZO.BlueBird.Profiles.TTO.ProfileClsSoap, System.ServiceModel.IClientChannel
    // {
    // }

    // export class GetActivityConfigurationDataCompletedEventArgs extends AsyncCompletedEventArgs
    // {

    //     private results:object[];

    //     public get Result():ActivityConfigurationData{
    //         return ((ActivityConfigurationData)(this.results[0]));
    //     }
    // }

    // export class GetAddPrescribingConfigDataCompletedEventArgs extends AsyncCompletedEventArgs
    // {

    //     private results: object[];

    //     public get Result():AddPrescribingConfigData{
    //         return ((AddPrescribingConfigData)(this.results[0]));
    //     }

    // }


    // export class GetBSAFormulaConfigDataCompletedEventArgs extends AsyncCompletedEventArgs
    // {
    //     private results: object[];

    //     public get Result():BSAFormulaConfigData{
    //         return ((BSAFormulaConfigData)(this.results[0]));
    //     }
    // }

    // export class GetClinicalVerificationConfigurationCompletedEventArgs extends AsyncCompletedEventArgs
    // {

    //     private results: object[];

    //     public get Result():ClinicalVerificationConfiguration{
    //         return ((ClinicalVerificationConfiguration)(this.results[0]));
    //     }

    // }

    // export class GetCMedicationLineDisplayDataCompletedEventArgs extends AsyncCompletedEventArgs
    // {

    //     private results: object[];

    //     public get Result():CMedicationLineDisplayData{
    //         return ((CMedicationLineDisplayData)(this.results[0]));
    //     }

    // }

    // export class GetConflictConfigurationsCompletedEventArgs extends AsyncCompletedEventArgs
    // {

    //     private results: object[];

    //     public get Result():ConflictConfigurations{
    //         return ((ConflictConfigurations)(this.results[0]));
    //     }

    // }

    // export class GetEncounterPresConfigurationsCompletedEventArgs extends AsyncCompletedEventArgs
    // {
    //     private results: object[];

    //     public get Result():EncounterPresConfigurations{
    //         return ((EncounterPresConfigurations)(this.results[0]));
    //     }

    // }

    // export class GetLineDisplayConfigurationsCompletedEventArgs extends AsyncCompletedEventArgs
    // {

    //     private results: object[];

    //     public get Result():LineDisplayConfigurations{
    //         return ((LineDisplayConfigurations)(this.results[0]));
    //     }

    // }

    // export class GetLinkInformationCompletedEventArgs extends AsyncCompletedEventArgs
    // {

    //     private results: object[];

    //     public get Result():LinkInformation{
    //         return ((LinkInformation)(this.results[0]));
    //     }

    // }

    // export class GetMedCatalogueVersionConfigDataCompletedEventArgs extends AsyncCompletedEventArgs
    // {

    //     private results: object[];

    //     public get Result():MedCatalogueVersionConfigData{
    //         return ((MedCatalogueVersionConfigData)(this.results[0]));
    //     }

    // }

    // export class GetMedDoseConfigDataCompletedEventArgs extends AsyncCompletedEventArgs
    // {

    //     private results: object[];

    //     public get Result():MedDoseConfigData{
    //         return ((MedDoseConfigData)(this.results[0]));
    //     }

    // }

    // export class GetMedDrugDisplayConfigDataCompletedEventArgs extends AsyncCompletedEventArgs
    // {

    //     private results: object[];

    //     public get Result():MedDrugDisplayConfigData{
    //         return ((MedDrugDisplayConfigData)(this.results[0]));
    //     }

    // }

    // export class GetMedDrugInfoDataCompletedEventArgs extends AsyncCompletedEventArgs
    // {

    //     private results: object[];

    //     public get Result():MedDrugInfoData{
    //         return ((MedDrugInfoData)(this.results[0]));
    //     }

    // }

    // export class GetMedicationConflictConfigDataCompletedEventArgs extends AsyncCompletedEventArgs
    // {

    //     private results: object[];

    //     public get Result():MedicationConflictConfigData{
    //         return ((MedicationConflictConfigData)(this.results[0]));
    //     }

    // }

    // export class GetMedicationResultsViewCountCompletedEventArgs extends AsyncCompletedEventArgs
    // {

    //     private results: object[];

    //     public get Result():MedicationResultsViewCount{
    //         return ((MedicationResultsViewCount)(this.results[0]));
    //     }

    // }

    // export class GetMedicationSearchConfigDataCompletedEventArgs extends AsyncCompletedEventArgs
    // {

    //     private results: object[];

    //     public get Result():MedicationSearchConfigData{
    //         return ((MedicationSearchConfigData)(this.results[0]));
    //     }

    // }

    // export class GetMedicationViewConfigDataCompletedEventArgs extends AsyncCompletedEventArgs
    // {

    //     private results: object[];

    //     public get Result():MedicationViewConfigData{
    //         return ((MedicationViewConfigData)(this.results[0]));
    //     }

    // }

    // export class GetMedNotificDataCompletedEventArgs extends AsyncCompletedEventArgs
    // {

    //     private results: object[];

    //     public get Result():MedNotificData{
    //         return ((MedNotificData)(this.results[0]));
    //     }

    // }

    // export class GetPowerSearchConfigurationDataCompletedEventArgs extends AsyncCompletedEventArgs
    // {

    //     private results: object[];

    //     public get Result():PowerSearchConfigurationData{
    //         return ((PowerSearchConfigurationData)(this.results[0]));
    //     }

    // }

    // export class GetPrescribingConfigDataCompletedEventArgs extends AsyncCompletedEventArgs
    // {

    //     private results: object[];

    //     public get Result():PrescribingConfigData{
    //         return ((PrescribingConfigData)(this.results[0]));
    //     }

    // }

    // export class GetPrescribingMethodConfigDataCompletedEventArgs extends AsyncCompletedEventArgs
    // {

    //     private results: object[];

    //     public get Result():PrescribingMethodConfigData{
    //         return ((PrescribingMethodConfigData)(this.results[0]));
    //     }

    // }

    // export class GetPrescriptionViewConfigDataCompletedEventArgs extends AsyncCompletedEventArgs
    // {

    //     private results: object[];

    //     public get Result():PrescriptionViewConfigData{
    //         return ((PrescriptionViewConfigData)(this.results[0]));
    //     }

    // }

    // export class GetPrintConfigurationDataCompletedEventArgs extends AsyncCompletedEventArgs
    // {

    //     private results: object[];

    //     public get Result():PrintConfigurationData{
    //         return ((PrintConfigurationData)(this.results[0]));
    //     }

    // }

    // export class GetCChartDisplayConfigCompletedEventArgs extends AsyncCompletedEventArgs
    // {

    //     private results: object[];

    //     public get Result():CChartDisplayConfig{
    //         return ((CChartDisplayConfig)(this.results[0]));
    //     }

    // }

    // export class GetCClinicalIncidentConfigCompletedEventArgs extends AsyncCompletedEventArgs
    // {

    //     private results: object[];

    //     public get Result():CClinicalIncidentConfig{
    //         return ((CClinicalIncidentConfig)(this.results[0]));
    //     }

    // }

    // export class GetCSlotCharacteristicsConfigCompletedEventArgs extends AsyncCompletedEventArgs
    // {

    //     private results: object[];

    //     public get Result():CSlotCharacteristicsConfig{
    //         return ((CSlotCharacteristicsConfig)(this.results[0]));
    //     }

    // }

    // export class GetMedDrugRoundViewCompletedEventArgs extends AsyncCompletedEventArgs
    // {

    //     private results: object[];

    //     public get Result():MedDrugRoundView{
    //         return ((MedDrugRoundView)(this.results[0]));
    //     }

    // }

    // export class GetScheduleConfigCompletedEventArgs extends AsyncCompletedEventArgs
    // {

    //     private results: object[];

    //     public get Result():ScheduleConfig{
    //         return ((ScheduleConfig)(this.results[0]));
    //     }

    // }
    
    // export class GetGPConnectConfigCompletedEventArgs extends AsyncCompletedEventArgs
    // {
    //     private results: object[];

    //     public get Result():GPConnectConfiguration{
    //         return ((GPConnectConfiguration)(this.results[0]));
    //     }

    // }



    //Reverting DST Part-1 :: CS # 626673 / Jira # 139785
    /*//
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class GetDSTConfigCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs
    {

        private object[] results;

        public GetDSTConfigCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) :
            base(exception, cancelled, userState)
        {
            this.results = results;
        }

        public iSOFT.LORENZO.BlueBird.Profiles.TTO.DSTConfig Result
        {
            get
            {
                base.RaiseExceptionIfNecessary();
                return ((iSOFT.LORENZO.BlueBird.Profiles.TTO.DSTConfig)(this.results[0]));
            }
        }
    }
    //*/

    export class ProfileClsSoapClient //: System.ServiceModel.ClientBase<iSOFT.LORENZO.BlueBird.Profiles.TTO.ProfileClsSoap>, iSOFT.LORENZO.BlueBird.Profiles.TTO.ProfileClsSoap
    {

        // private BeginOperationDelegate onBeginGetActivityConfigurationDataDelegate;

        // private EndOperationDelegate onEndGetActivityConfigurationDataDelegate;

        // private System.Threading.SendOrPostCallback onGetActivityConfigurationDataCompletedDelegate;

        // private BeginOperationDelegate onBeginGetAddPrescribingConfigDataDelegate;

        // private EndOperationDelegate onEndGetAddPrescribingConfigDataDelegate;

        // private System.Threading.SendOrPostCallback onGetAddPrescribingConfigDataCompletedDelegate;

        // private BeginOperationDelegate onBeginGetBSAFormulaConfigDataDelegate;

        // private EndOperationDelegate onEndGetBSAFormulaConfigDataDelegate;

        // private System.Threading.SendOrPostCallback onGetBSAFormulaConfigDataCompletedDelegate;

        // private BeginOperationDelegate onBeginGetClinicalVerificationConfigurationDelegate;

        // private EndOperationDelegate onEndGetClinicalVerificationConfigurationDelegate;

        // private System.Threading.SendOrPostCallback onGetClinicalVerificationConfigurationCompletedDelegate;

        // private BeginOperationDelegate onBeginGetCMedicationLineDisplayDataDelegate;

        // private EndOperationDelegate onEndGetCMedicationLineDisplayDataDelegate;

        // private System.Threading.SendOrPostCallback onGetCMedicationLineDisplayDataCompletedDelegate;

        // private BeginOperationDelegate onBeginGetConflictConfigurationsDelegate;

        // private EndOperationDelegate onEndGetConflictConfigurationsDelegate;

        // private System.Threading.SendOrPostCallback onGetConflictConfigurationsCompletedDelegate;

        // private BeginOperationDelegate onBeginGetEncounterPresConfigurationsDelegate;

        // private EndOperationDelegate onEndGetEncounterPresConfigurationsDelegate;

        // private System.Threading.SendOrPostCallback onGetEncounterPresConfigurationsCompletedDelegate;

        // private BeginOperationDelegate onBeginGetLineDisplayConfigurationsDelegate;

        // private EndOperationDelegate onEndGetLineDisplayConfigurationsDelegate;

        // private System.Threading.SendOrPostCallback onGetLineDisplayConfigurationsCompletedDelegate;

        // private BeginOperationDelegate onBeginGetLinkInformationDelegate;

        // private EndOperationDelegate onEndGetLinkInformationDelegate;

        // private System.Threading.SendOrPostCallback onGetLinkInformationCompletedDelegate;

        // private BeginOperationDelegate onBeginGetMedCatalogueVersionConfigDataDelegate;

        // private EndOperationDelegate onEndGetMedCatalogueVersionConfigDataDelegate;

        // private System.Threading.SendOrPostCallback onGetMedCatalogueVersionConfigDataCompletedDelegate;

        // private BeginOperationDelegate onBeginGetMedDoseConfigDataDelegate;

        // private EndOperationDelegate onEndGetMedDoseConfigDataDelegate;

        // private System.Threading.SendOrPostCallback onGetMedDoseConfigDataCompletedDelegate;

        // private BeginOperationDelegate onBeginGetMedDrugDisplayConfigDataDelegate;

        // private EndOperationDelegate onEndGetMedDrugDisplayConfigDataDelegate;

        // private System.Threading.SendOrPostCallback onGetMedDrugDisplayConfigDataCompletedDelegate;

        // private BeginOperationDelegate onBeginGetMedDrugInfoDataDelegate;

        // private EndOperationDelegate onEndGetMedDrugInfoDataDelegate;

        // private System.Threading.SendOrPostCallback onGetMedDrugInfoDataCompletedDelegate;

        // private BeginOperationDelegate onBeginGetMedicationConflictConfigDataDelegate;

        // private EndOperationDelegate onEndGetMedicationConflictConfigDataDelegate;

        // private System.Threading.SendOrPostCallback onGetMedicationConflictConfigDataCompletedDelegate;

        // private BeginOperationDelegate onBeginGetMedicationResultsViewCountDelegate;

        // private EndOperationDelegate onEndGetMedicationResultsViewCountDelegate;

        // private System.Threading.SendOrPostCallback onGetMedicationResultsViewCountCompletedDelegate;

        // private BeginOperationDelegate onBeginGetMedicationSearchConfigDataDelegate;

        // private EndOperationDelegate onEndGetMedicationSearchConfigDataDelegate;

        // private System.Threading.SendOrPostCallback onGetMedicationSearchConfigDataCompletedDelegate;

        // private BeginOperationDelegate onBeginGetMedicationViewConfigDataDelegate;

        // private EndOperationDelegate onEndGetMedicationViewConfigDataDelegate;

        // private System.Threading.SendOrPostCallback onGetMedicationViewConfigDataCompletedDelegate;

        // private BeginOperationDelegate onBeginGetMedNotificDataDelegate;

        // private EndOperationDelegate onEndGetMedNotificDataDelegate;

        // private System.Threading.SendOrPostCallback onGetMedNotificDataCompletedDelegate;

        // private BeginOperationDelegate onBeginGetPowerSearchConfigurationDataDelegate;

        // private EndOperationDelegate onEndGetPowerSearchConfigurationDataDelegate;

        // private System.Threading.SendOrPostCallback onGetPowerSearchConfigurationDataCompletedDelegate;

        // private BeginOperationDelegate onBeginGetPrescribingConfigDataDelegate;

        // private EndOperationDelegate onEndGetPrescribingConfigDataDelegate;

        // private System.Threading.SendOrPostCallback onGetPrescribingConfigDataCompletedDelegate;

        // private BeginOperationDelegate onBeginGetPrescribingMethodConfigDataDelegate;

        // private EndOperationDelegate onEndGetPrescribingMethodConfigDataDelegate;

        // private System.Threading.SendOrPostCallback onGetPrescribingMethodConfigDataCompletedDelegate;

        // private BeginOperationDelegate onBeginGetPrescriptionViewConfigDataDelegate;

        // private EndOperationDelegate onEndGetPrescriptionViewConfigDataDelegate;

        // private System.Threading.SendOrPostCallback onGetPrescriptionViewConfigDataCompletedDelegate;

        // private BeginOperationDelegate onBeginGetPrintConfigurationDataDelegate;

        // private EndOperationDelegate onEndGetPrintConfigurationDataDelegate;

        // private System.Threading.SendOrPostCallback onGetPrintConfigurationDataCompletedDelegate;

        // private BeginOperationDelegate onBeginGetCChartDisplayConfigDelegate;

        // private EndOperationDelegate onEndGetCChartDisplayConfigDelegate;

        // private System.Threading.SendOrPostCallback onGetCChartDisplayConfigCompletedDelegate;

        // private BeginOperationDelegate onBeginGetCClinicalIncidentConfigDelegate;

        // private EndOperationDelegate onEndGetCClinicalIncidentConfigDelegate;

        // private System.Threading.SendOrPostCallback onGetCClinicalIncidentConfigCompletedDelegate;

        // private BeginOperationDelegate onBeginGetCSlotCharacteristicsConfigDelegate;

        // private EndOperationDelegate onEndGetCSlotCharacteristicsConfigDelegate;

        // private System.Threading.SendOrPostCallback onGetCSlotCharacteristicsConfigCompletedDelegate;

        // private BeginOperationDelegate onBeginGetMedDrugRoundViewDelegate;

        // private EndOperationDelegate onEndGetMedDrugRoundViewDelegate;

        // private System.Threading.SendOrPostCallback onGetMedDrugRoundViewCompletedDelegate;

        // private BeginOperationDelegate onBeginGetScheduleConfigDelegate;

        // private EndOperationDelegate onEndGetScheduleConfigDelegate;

        // private System.Threading.SendOrPostCallback onGetScheduleConfigCompletedDelegate;

        // private BeginOperationDelegate onBeginGetGPConnectConfigDelegate;
        // private EndOperationDelegate onEndGetGPConnectConfigDelegate;
        // private System.Threading.SendOrPostCallback onGetGPConnectConfigCompletedDelegate;

        //Reverting DST Part-1 :: CS # 626673 / Jira # 139785
        /*//
        private BeginOperationDelegate onBeginGetDSTConfigDelegate;

        private EndOperationDelegate onEndGetDSTConfigDelegate;

        private System.Threading.SendOrPostCallback onGetDSTConfigCompletedDelegate;
        //*/

        // private BeginOperationDelegate onBeginOpenDelegate;

        // private EndOperationDelegate onEndOpenDelegate;

        // private System.Threading.SendOrPostCallback onOpenCompletedDelegate;

        // private BeginOperationDelegate onBeginCloseDelegate;

        // private EndOperationDelegate onEndCloseDelegate;

        // private System.Threading.SendOrPostCallback onCloseCompletedDelegate;

        
        // public System.Net.CookieContainer CookieContainer
        // {
        //     get
        //     {
        //         System.ServiceModel.Channels.IHttpCookieContainerManager httpCookieContainerManager = this.InnerChannel.GetProperty<System.ServiceModel.Channels.IHttpCookieContainerManager>();
        //         if ((httpCookieContainerManager != null))
        //         {
        //             return httpCookieContainerManager.CookieContainer;
        //         }
        //         else
        //         {
        //             return null;
        //         }
        //     }
        //     set
        //     {
        //         System.ServiceModel.Channels.IHttpCookieContainerManager httpCookieContainerManager = this.InnerChannel.GetProperty<System.ServiceModel.Channels.IHttpCookieContainerManager>();
        //         if ((httpCookieContainerManager != null))
        //         {
        //             httpCookieContainerManager.CookieContainer = value;
        //         }
        //         else
        //         {
        //             throw new System.InvalidOperationException("Unable to set the CookieContainer. Please make sure the binding contains an HttpC" +
        //                     "ookieContainerBindingElement.");
        //         }
        //     }
        // }


        //Reverting DST Part-1 :: CS # 626673 / Jira # 139785
        /*//
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        System.IAsyncResult iSOFT.LORENZO.BlueBird.Profiles.TTO.ProfileClsSoap.BeginGetDSTConfig(iSOFT.LORENZO.BlueBird.Profiles.TTO.GetDSTConfigRequest request, System.AsyncCallback callback, object asyncState)
        {
            return base.Channel.BeginGetDSTConfig(request, callback, asyncState);
        }

        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        private System.IAsyncResult BeginGetDSTConfig(System.AsyncCallback callback, object asyncState)
        {
            iSOFT.LORENZO.BlueBird.Profiles.TTO.GetDSTConfigRequest inValue = new iSOFT.LORENZO.BlueBird.Profiles.TTO.GetDSTConfigRequest();
            inValue.Body = new iSOFT.LORENZO.BlueBird.Profiles.TTO.GetDSTConfigRequestBody();
            return ((iSOFT.LORENZO.BlueBird.Profiles.TTO.ProfileClsSoap)(this)).BeginGetDSTConfig(inValue, callback, asyncState);
        }

        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        iSOFT.LORENZO.BlueBird.Profiles.TTO.GetDSTConfigResponse iSOFT.LORENZO.BlueBird.Profiles.TTO.ProfileClsSoap.EndGetDSTConfig(System.IAsyncResult result)
        {
            return base.Channel.EndGetDSTConfig(result);
        }

        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        private iSOFT.LORENZO.BlueBird.Profiles.TTO.DSTConfig EndGetDSTConfig(System.IAsyncResult result)
        {
            iSOFT.LORENZO.BlueBird.Profiles.TTO.GetDSTConfigResponse retVal = ((iSOFT.LORENZO.BlueBird.Profiles.TTO.ProfileClsSoap)(this)).EndGetDSTConfig(result);
            return retVal.Body.GetDSTConfigResult;
        }

        private System.IAsyncResult OnBeginGetDSTConfig(object[] inValues, System.AsyncCallback callback, object asyncState)
        {
            return this.BeginGetDSTConfig(callback, asyncState);
        }

        private object[] OnEndGetDSTConfig(System.IAsyncResult result)
        {
            iSOFT.LORENZO.BlueBird.Profiles.TTO.DSTConfig retVal = this.EndGetDSTConfig(result);
            return new object[] {
                    retVal};
        }

        private void OnGetDSTConfigCompleted(object state)
        {
            if ((this.GetDSTConfigCompleted != null))
            {
                InvokeAsyncCompletedEventArgs e = ((InvokeAsyncCompletedEventArgs)(state));
                this.GetDSTConfigCompleted(this, new GetDSTConfigCompletedEventArgs(e.Results, e.Error, e.Cancelled, e.UserState));
            }
        }

        public void GetDSTConfigAsync()
        {
            this.GetDSTConfigAsync(null);
        }

        public void GetDSTConfigAsync(object userState)
        {
            if ((this.onBeginGetDSTConfigDelegate == null))
            {
                this.onBeginGetDSTConfigDelegate = new BeginOperationDelegate(this.OnBeginGetDSTConfig);
            }
            if ((this.onEndGetDSTConfigDelegate == null))
            {
                this.onEndGetDSTConfigDelegate = new EndOperationDelegate(this.OnEndGetDSTConfig);
            }
            if ((this.onGetDSTConfigCompletedDelegate == null))
            {
                this.onGetDSTConfigCompletedDelegate = new System.Threading.SendOrPostCallback(this.OnGetDSTConfigCompleted);
            }
            base.InvokeAsync(this.onBeginGetDSTConfigDelegate, null, this.onEndGetDSTConfigDelegate, this.onGetDSTConfigCompletedDelegate, userState);
        }
        //*/

        
            //Reverting DST Part-1 :: CS # 626673 / Jira # 139785
            /*public System.IAsyncResult BeginGetDSTConfig(iSOFT.LORENZO.BlueBird.Profiles.TTO.GetDSTConfigRequest request, System.AsyncCallback callback, object asyncState)
            {
                object[] _args = new object[1];
                _args[0] = request;
                System.IAsyncResult _result = base.BeginInvoke("GetDSTConfig", _args, callback, asyncState);
                return _result;
            }

            public iSOFT.LORENZO.BlueBird.Profiles.TTO.GetDSTConfigResponse EndGetDSTConfig(System.IAsyncResult result)
            {
                object[] _args = new object[0];
                iSOFT.LORENZO.BlueBird.Profiles.TTO.GetDSTConfigResponse _result = ((iSOFT.LORENZO.BlueBird.Profiles.TTO.GetDSTConfigResponse)(base.EndInvoke("GetDSTConfig", _args, result)));
                return _result;
            }*/
    }

    export class CChartSettingsConfig
    {

        private oDisposablereasonField!:ArrayOfLstitem;
        private oOutcomeValuesField!:ArrayOfLstitem;
        private CloseChartAfterField = 0;
        private IsManualLeaveStatusEnabledField = false;
        private IvAdminAlertAfterField = 0;
        private IsAllowSupplyReqField = false;
        private IsChangeFlowRateEnabledField = false; //CSID # 598384

        //4662/NS/Administration
		private AllowAnyUserForAdministrationField = '';

        public get oDisposablereason():ArrayOfLstitem{
            return this.oDisposablereasonField;
        }

        public set oDisposablereason(value: ArrayOfLstitem){  
            if ((Object.is(this.oDisposablereasonField, value) != true)){
                this.oDisposablereasonField = value;
            }
        }

        public get oOutcomeValues():ArrayOfLstitem{
            return this.oOutcomeValuesField;
        }

        public set oOutcomeValues(value: ArrayOfLstitem){  
            if ((Object.is(this.oOutcomeValuesField, value) != true)){
                this.oOutcomeValuesField = value;
            }
        }

        public get CloseChartAfter():number{
            return this.CloseChartAfterField;
        }

        public set CloseChartAfter(value: number){  
            if ((this.CloseChartAfterField != value)){
                this.CloseChartAfterField = value;
            }
        }

        public get IsManualLeaveStatusEnabled():boolean {
            return this.IsManualLeaveStatusEnabledField;
        }

        public set IsManualLeaveStatusEnabled(value: boolean){  
            if ((this.IsManualLeaveStatusEnabledField != value)){
                this.IsManualLeaveStatusEnabledField = value;
            }
        }

        public get IvAdminAlertAfter():number{
            return this.IvAdminAlertAfterField;
        }

        public set IvAdminAlertAfter(value: number){  
            if ((this.IvAdminAlertAfterField != value)){
                this.IvAdminAlertAfterField = value;
            }
        }

        public get IsAllowSupplyReq():boolean{
            return this.IsAllowSupplyReqField;
        }

        public set IsAllowSupplyReq(value: boolean){  
            if ((this.IsAllowSupplyReqField != value)){
                this.IsAllowSupplyReqField = value;
            }
        }

        public get IsChangeFlowRateEnabled():boolean{
            return this.IsChangeFlowRateEnabledField;
        }

        public set IsChangeFlowRateEnabled(value: boolean){  
            if ((this.IsChangeFlowRateEnabledField != value)){
                this.IsChangeFlowRateEnabledField = value;
            }
        }
        //CSID # 598384 : Stops

		//4669/NS/Administration
        public get AllowAnyUserForAdministration():string{
            return this.AllowAnyUserForAdministrationField;
        }

        public set AllowAnyUserForAdministration(value: string){  
            if (!this.AllowAnyUserForAdministrationField || (this.AllowAnyUserForAdministrationField != value)){
                this.AllowAnyUserForAdministrationField = value;
            }
        }
        
    }

    export class ArrayOfLstitem extends Array<lstitem>
    {
    }

    export class lstitem
    {

        private ItemkeyField = '';
        private IsSelectedField = false;

        public get Itemkey():string{
            return this.ItemkeyField;
        }

        public set Itemkey(value: string){  
            if ((Object.is(this.ItemkeyField, value) != true)){
                this.ItemkeyField = value;
            }
        }

        public get IsSelected():boolean{
            return this.IsSelectedField;
        }

        public set IsSelected(value: boolean){  
            if ((this.IsSelectedField != value)){
                this.IsSelectedField = value;
            }
        }

    }

    export class InfusionPresConfigData 
    {

        private IsInfusionRatePCAField = false;

        private IsEnablePrescInfusField = false

        private InfusPeriodField = 0

        private InfusVolField = 0;

        private objInfusDeliveryDeviceField!: Array<InfusDeliveryDevice>;

        private objMedicalOxyConfigField!: Array<MedicalOxyConfig>;

        private objOxygenMasksField!: Array<OxygenMasks>;


        public get IsInfusionRatePCA():boolean{
            return this.IsInfusionRatePCAField;
        }

        public set IsInfusionRatePCA(value: boolean){  
            if ((this.IsInfusionRatePCAField != value)){
                this.IsInfusionRatePCAField = value;
            }
        }

        public get IsEnablePrescInfus():boolean{
            return this.IsEnablePrescInfusField;
        }

        public set IsEnablePrescInfus(value: boolean){  
            if ((this.IsEnablePrescInfusField != value)){
                this.IsEnablePrescInfusField = value;
            }
        }

        public get InfusPeriod():number{
            return this.InfusPeriodField;
        }

        public set InfusPeriod(value: number){  
            if ((this.InfusPeriodField != value)){
                this.InfusPeriodField = value;
            }
        }

        public get InfusVol():number{
            return this.InfusVolField;
        }

        public set InfusVol(value: number){  
            if ((this.InfusVolField != value)){
                this.InfusVolField = value;
            }
        }

        public get objInfusDeliveryDevice(): Array<InfusDeliveryDevice>{
            return this.objInfusDeliveryDeviceField;
        }

        public set objInfusDeliveryDevice(value: Array<InfusDeliveryDevice>){  
            if ((Object.is(this.objInfusDeliveryDeviceField, value) != true)){
                this.objInfusDeliveryDeviceField = value;
            }
        }

        public get objMedicalOxyConfig(): Array<MedicalOxyConfig>{
            return this.objMedicalOxyConfigField;
        }

        public set objMedicalOxyConfig(value: Array<MedicalOxyConfig>){  
            if ((Object.is(this.objMedicalOxyConfigField, value) != true)){
                this.objMedicalOxyConfigField = value;
            }
        }
        
        public get objOxygenMasks(): Array<OxygenMasks>{
            return this.objOxygenMasksField;
        }

        public set objOxygenMasks(value: Array<OxygenMasks>){  
            if ((Object.is(this.objOxygenMasksField, value) != true)){
                this.objOxygenMasksField = value;
            }
        }

    }

    export class InfusDeliveryDevice
    {

        private DeviceNameField = '';

        private InfusionRateDenomUOMCodeField = '';

        private InfusionRateDenomUOMOIDField = '';
       
        private InfusionRateNumUOMCodeField = '';

        private InfusionRateNumUOMOIDField = '';

        private IsAllowBoosterDoseField = false

        public get DeviceName():string{
            return this.DeviceNameField;
        }

        public set DeviceName(value: string){  
            if ((Object.is(this.DeviceNameField, value) != true)){
                this.DeviceNameField = value;
            }
        }

        public get InfusionRateDenomUOMCode():string{
            return this.InfusionRateDenomUOMCodeField;
        }

        public set InfusionRateDenomUOMCode(value: string){  
            if ((Object.is(this.InfusionRateDenomUOMCodeField, value) != true)){
                this.InfusionRateDenomUOMCodeField = value;
            }
        }

        public get InfusionRateDenomUOMOID():string{
            return this.InfusionRateDenomUOMOIDField;
        }

        public set InfusionRateDenomUOMOID(value: string){  
            if ((Object.is(this.InfusionRateDenomUOMOIDField, value) != true)){
                this.InfusionRateDenomUOMOIDField = value;
            }
        }

        public get InfusionRateNumUOMCode():string{
            return this.InfusionRateNumUOMCodeField;
        }

        public set InfusionRateNumUOMCode(value: string){  
            if ((Object.is(this.InfusionRateNumUOMCodeField, value) != true)){
                this.InfusionRateNumUOMCodeField = value;
            }
        }

        public get InfusionRateNumUOMOID():string{
            return this.InfusionRateNumUOMOIDField;
        }

        public set InfusionRateNumUOMOID(value: string){  
            if ((Object.is(this.InfusionRateNumUOMOIDField, value) != true)){
                this.InfusionRateNumUOMOIDField = value;
            }
        }

        public get IsAllowBoosterDose():boolean{
            return this.IsAllowBoosterDoseField;
        }

        public set IsAllowBoosterDose(value: boolean){  
            if ((this.IsAllowBoosterDoseField != value)){
                this.IsAllowBoosterDoseField = value;
            }
        }

    }

    export class MedicalOxyConfig 
    {

        private MedicalOxygenNameField = '';

        private MedicalOxygenOIDField = 0;

        public get MedicalOxygenName():string{
            return this.MedicalOxygenNameField;
        }

        public set MedicalOxygenName(value: string){  
            if ((Object.is(this.MedicalOxygenNameField, value) != true)){
                this.MedicalOxygenNameField = value;
            }
        }

        public get MedicalOxygenOID():number{
            return this.MedicalOxygenOIDField;
        }

        public set MedicalOxygenOID(value: number){  
            if ((this.MedicalOxygenOIDField != value)){
                this.MedicalOxygenOIDField = value;
            }
        }

    }


    export class OxygenMasks 
    {

        private ConcentrationField = 0;

        private OxyDeviceNameField = '';

        public get Concentration():number{
            return this.ConcentrationField;
        }

        public set Concentration(value: number){  
            if ((this.ConcentrationField != value)){
                this.ConcentrationField = value;
            }
        }
        
        public get OxyDeviceName():string{
            return this.OxyDeviceNameField;
        }

        public set OxyDeviceName(value: string){  
            if ((Object.is(this.OxyDeviceNameField, value) != true)){
                this.OxyDeviceNameField = value;
            }
        }

    }

    // export class InfusionPresConfigClient : System.ServiceModel.ClientBase<iSOFT.LORENZO.BlueBird.Profiles.TTO.IInfusionPresConfig>, iSOFT.LORENZO.BlueBird.Profiles.TTO.IInfusionPresConfig
    // {

        // private BeginOperationDelegate onBeginDoWorkDelegate;

        // private EndOperationDelegate onEndDoWorkDelegate;

        // private System.Threading.SendOrPostCallback onDoWorkCompletedDelegate;

        // private BeginOperationDelegate onBeginOpenDelegate;

        // private EndOperationDelegate onEndOpenDelegate;

        // private System.Threading.SendOrPostCallback onOpenCompletedDelegate;

        // private BeginOperationDelegate onBeginCloseDelegate;

        // private EndOperationDelegate onEndCloseDelegate;

        // private System.Threading.SendOrPostCallback onCloseCompletedDelegate;

        // public InfusionPresConfigClient()
        // {
        // }

        // public InfusionPresConfigClient(string endpointConfigurationName) :
        //     base(endpointConfigurationName)
        // {
        // }

        // public InfusionPresConfigClient(string endpointConfigurationName, string remoteAddress) :
        //     base(endpointConfigurationName, remoteAddress)
        // {
        // }

        // public InfusionPresConfigClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) :
        //     base(endpointConfigurationName, remoteAddress)
        // {
        // }

        // public InfusionPresConfigClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) :
        //     base(binding, remoteAddress)
        // {
        // }

        // public System.Net.CookieContainer CookieContainer
        // {
        //     get
        //     {
        //         System.ServiceModel.Channels.IHttpCookieContainerManager httpCookieContainerManager = this.InnerChannel.GetProperty<System.ServiceModel.Channels.IHttpCookieContainerManager>();
        //         if ((httpCookieContainerManager != null))
        //         {
        //             return httpCookieContainerManager.CookieContainer;
        //         }
        //         else
        //         {
        //             return null;
        //         }
        //     }
        //     set
        //     {
        //         System.ServiceModel.Channels.IHttpCookieContainerManager httpCookieContainerManager = this.InnerChannel.GetProperty<System.ServiceModel.Channels.IHttpCookieContainerManager>();
        //         if ((httpCookieContainerManager != null))
        //         {
        //             httpCookieContainerManager.CookieContainer = value;
        //         }
        //         else
        //         {
        //             throw new System.InvalidOperationException("Unable to set the CookieContainer. Please make sure the binding contains an HttpC" +
        //                     "ookieContainerBindingElement.");
        //         }
        //     }
        // }

        // public event System.EventHandler<System.ComponentModel.AsyncCompletedEventArgs> DoWorkCompleted;

        // public event System.EventHandler<System.ComponentModel.AsyncCompletedEventArgs> OpenCompleted;

        // public event System.EventHandler<System.ComponentModel.AsyncCompletedEventArgs> CloseCompleted;

        // [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        // System.IAsyncResult iSOFT.LORENZO.BlueBird.Profiles.TTO.IInfusionPresConfig.BeginDoWork(iSOFT.LORENZO.BlueBird.Profiles.TTO.InfusionPresConfigData obj, System.AsyncCallback callback, object asyncState)
        // {
        //     return base.Channel.BeginDoWork(obj, callback, asyncState);
        // }

        // [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        // void iSOFT.LORENZO.BlueBird.Profiles.TTO.IInfusionPresConfig.EndDoWork(System.IAsyncResult result)
        // {
        //     base.Channel.EndDoWork(result);
        // }

        // private System.IAsyncResult OnBeginDoWork(object[] inValues, System.AsyncCallback callback, object asyncState)
        // {
        //     iSOFT.LORENZO.BlueBird.Profiles.TTO.InfusionPresConfigData obj = ((iSOFT.LORENZO.BlueBird.Profiles.TTO.InfusionPresConfigData)(inValues[0]));
        //     return ((iSOFT.LORENZO.BlueBird.Profiles.TTO.IInfusionPresConfig)(this)).BeginDoWork(obj, callback, asyncState);
        // }

        // private object[] OnEndDoWork(System.IAsyncResult result)
        // {
        //     ((iSOFT.LORENZO.BlueBird.Profiles.TTO.IInfusionPresConfig)(this)).EndDoWork(result);
        //     return null;
        // }

        // private void OnDoWorkCompleted(object state)
        // {
        //     if ((this.DoWorkCompleted != null))
        //     {
        //         InvokeAsyncCompletedEventArgs e = ((InvokeAsyncCompletedEventArgs)(state));
        //         this.DoWorkCompleted(this, new System.ComponentModel.AsyncCompletedEventArgs(e.Error, e.Cancelled, e.UserState));
        //     }
        // }

        // public void DoWorkAsync(iSOFT.LORENZO.BlueBird.Profiles.TTO.InfusionPresConfigData obj)
        // {
        //     this.DoWorkAsync(obj, null);
        // }

        // public void DoWorkAsync(iSOFT.LORENZO.BlueBird.Profiles.TTO.InfusionPresConfigData obj, object userState)
        // {
        //     if ((this.onBeginDoWorkDelegate == null))
        //     {
        //         this.onBeginDoWorkDelegate = new BeginOperationDelegate(this.OnBeginDoWork);
        //     }
        //     if ((this.onEndDoWorkDelegate == null))
        //     {
        //         this.onEndDoWorkDelegate = new EndOperationDelegate(this.OnEndDoWork);
        //     }
        //     if ((this.onDoWorkCompletedDelegate == null))
        //     {
        //         this.onDoWorkCompletedDelegate = new System.Threading.SendOrPostCallback(this.OnDoWorkCompleted);
        //     }
        //     base.InvokeAsync(this.onBeginDoWorkDelegate, new object[] {
        //                 obj}, this.onEndDoWorkDelegate, this.onDoWorkCompletedDelegate, userState);
        // }

        // private System.IAsyncResult OnBeginOpen(object[] inValues, System.AsyncCallback callback, object asyncState)
        // {
        //     return ((System.ServiceModel.ICommunicationObject)(this)).BeginOpen(callback, asyncState);
        // }

        // private object[] OnEndOpen(System.IAsyncResult result)
        // {
        //     ((System.ServiceModel.ICommunicationObject)(this)).EndOpen(result);
        //     return null;
        // }

        // private void OnOpenCompleted(object state)
        // {
        //     if ((this.OpenCompleted != null))
        //     {
        //         InvokeAsyncCompletedEventArgs e = ((InvokeAsyncCompletedEventArgs)(state));
        //         this.OpenCompleted(this, new System.ComponentModel.AsyncCompletedEventArgs(e.Error, e.Cancelled, e.UserState));
        //     }
        // }

        // public void OpenAsync()
        // {
        //     this.OpenAsync(null);
        // }

        // public void OpenAsync(object userState)
        // {
        //     if ((this.onBeginOpenDelegate == null))
        //     {
        //         this.onBeginOpenDelegate = new BeginOperationDelegate(this.OnBeginOpen);
        //     }
        //     if ((this.onEndOpenDelegate == null))
        //     {
        //         this.onEndOpenDelegate = new EndOperationDelegate(this.OnEndOpen);
        //     }
        //     if ((this.onOpenCompletedDelegate == null))
        //     {
        //         this.onOpenCompletedDelegate = new System.Threading.SendOrPostCallback(this.OnOpenCompleted);
        //     }
        //     base.InvokeAsync(this.onBeginOpenDelegate, null, this.onEndOpenDelegate, this.onOpenCompletedDelegate, userState);
        // }

        // private System.IAsyncResult OnBeginClose(object[] inValues, System.AsyncCallback callback, object asyncState)
        // {
        //     return ((System.ServiceModel.ICommunicationObject)(this)).BeginClose(callback, asyncState);
        // }

        // private object[] OnEndClose(System.IAsyncResult result)
        // {
        //     ((System.ServiceModel.ICommunicationObject)(this)).EndClose(result);
        //     return null;
        // }

        // private void OnCloseCompleted(object state)
        // {
        //     if ((this.CloseCompleted != null))
        //     {
        //         InvokeAsyncCompletedEventArgs e = ((InvokeAsyncCompletedEventArgs)(state));
        //         this.CloseCompleted(this, new System.ComponentModel.AsyncCompletedEventArgs(e.Error, e.Cancelled, e.UserState));
        //     }
        // }

        // public void CloseAsync()
        // {
        //     this.CloseAsync(null);
        // }

        // public void CloseAsync(object userState)
        // {
        //     if ((this.onBeginCloseDelegate == null))
        //     {
        //         this.onBeginCloseDelegate = new BeginOperationDelegate(this.OnBeginClose);
        //     }
        //     if ((this.onEndCloseDelegate == null))
        //     {
        //         this.onEndCloseDelegate = new EndOperationDelegate(this.OnEndClose);
        //     }
        //     if ((this.onCloseCompletedDelegate == null))
        //     {
        //         this.onCloseCompletedDelegate = new System.Threading.SendOrPostCallback(this.OnCloseCompleted);
        //     }
        //     base.InvokeAsync(this.onBeginCloseDelegate, null, this.onEndCloseDelegate, this.onCloseCompletedDelegate, userState);
        // }

        // protected override iSOFT.LORENZO.BlueBird.Profiles.TTO.IInfusionPresConfig CreateChannel()
        // {
        //     return new InfusionPresConfigClientChannel(this);
        // }

        // private class InfusionPresConfigClientChannel : ChannelBase<iSOFT.LORENZO.BlueBird.Profiles.TTO.IInfusionPresConfig>, iSOFT.LORENZO.BlueBird.Profiles.TTO.IInfusionPresConfig
        // {

        //     public InfusionPresConfigClientChannel(System.ServiceModel.ClientBase<iSOFT.LORENZO.BlueBird.Profiles.TTO.IInfusionPresConfig> client) :
        //         base(client)
        //     {
        //     }

        //     public System.IAsyncResult BeginDoWork(iSOFT.LORENZO.BlueBird.Profiles.TTO.InfusionPresConfigData obj, System.AsyncCallback callback, object asyncState)
        //     {
        //         object[] _args = new object[1];
        //         _args[0] = obj;
        //         System.IAsyncResult _result = base.BeginInvoke("DoWork", _args, callback, asyncState);
        //         return _result;
        //     }

        //     public void EndDoWork(System.IAsyncResult result)
        //     {
        //         object[] _args = new object[0];
        //         base.EndInvoke("DoWork", _args, result);
        //     }
        // }
    
// }
