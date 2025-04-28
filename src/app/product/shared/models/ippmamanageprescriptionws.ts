import DateTime from 'epma-platform/DateTime';
import { StringWrapper } from '../../../shared/epma-platform/controls-model/string-wrapper';
import { Visibility } from '../../../shared/epma-platform/controls-model/Visibility';
import { InjectorInstance } from '../../../app.module';
import { AggregateService } from 'epma-platform/services';
export class CLZOObject {
  private OperationModeField = '';
  private LastModifiedAtField = new Date();
  private SealTypeField = '';
  private SealImageField = '';
  private SealRecordListField = '';
  private SealImageListField = '';
  private EPRFilterListField = '';
  referenceEquals(arg1:any, arg2:any) {
    return JSON.stringify(arg1) != JSON.stringify(arg2);
  }
  get OperationMode(): string {
    return this.OperationModeField;
  }
  set OperationMode(value: string) {
    if (JSON.stringify(this.OperationModeField) != JSON.stringify(value)) {
      this.OperationModeField = value;
      // this.RaisePropertyChanged("OperationMode");
    }
  }

  get LastModifiedAt(): Date {
    return this.LastModifiedAtField;
  }
  set LastModifiedAt(value: Date) {
    if (this.LastModifiedAtField != value) {
      this.LastModifiedAtField = value;
      // this.RaisePropertyChanged("LastModifiedAt");
    }
  }

  get SealType() {
    return this.SealTypeField;
  }
  set SealType(value: string) {
    if (JSON.stringify(this.SealTypeField) != JSON.stringify(value)) {
      this.SealTypeField = value;
      // this.RaisePropertyChanged("SealType");
    }
  }

  get SealImage(): string {
    return this.SealImageField;
  }
  set SealImage(value: string) {
    if (JSON.stringify(this.SealImageField) != JSON.stringify(value)) {
      this.SealImageField = value;
      // this.RaisePropertyChanged("SealImage");
    }
  }

  get SealRecordList(): string {
    return this.SealRecordListField;
  }
  set SealRecordList(value: string) {
    if (JSON.stringify(this.SealRecordListField) != JSON.stringify(value)) {
      this.SealRecordListField = value;
      // this.RaisePropertyChanged("SealRecordList");
    }
  }

  get SealImageList(): string {
    return this.SealImageListField;
  }
  set SealImageList(value: string) {
    if (JSON.stringify(this.SealImageListField) != JSON.stringify(value)) {
      this.SealImageListField = value;
      // this.RaisePropertyChanged("SealImageList");
    }
  }

  get EPRFilterList(): string {
    return this.EPRFilterListField;
  }
  set EPRFilterList(value: string) {
    if (JSON.stringify(this.EPRFilterListField) != JSON.stringify(value)) {
      this.EPRFilterListField = value;
      // this.RaisePropertyChanged("EPRFilterList");
    }
  }
}
export class PrescriptionResponse extends CLZOObject {
  private PrescriptionOIDField = 0;
  private PresItemResponseField: Array<PrescriptionItemResponse> = [];
  private StationeryTypeField: any;
  private ChooseprinterField = '';
  private TemplateStatusField = '';
  private PatientOIDField = '';
  private EncounterOIDField = '';
  private ClinicalNoteOIDField = '';
  private PPatientOIDField = '';

  get PrescriptionOID(): number {
    return this.PrescriptionOIDField;
  }
  set PrescriptionOID(value: number) {
    if (this.PrescriptionOIDField != value) {
      this.PrescriptionOIDField = value;
      // this.RaisePropertyChanged("PrescriptionOID");
    }
  }

  get PresItemResponse(): Array<PrescriptionItemResponse> {
    return this.PresItemResponseField;
  }
  set PresItemResponse(value: Array<PrescriptionItemResponse>) {
    if (JSON.stringify(this.PresItemResponseField) != JSON.stringify(value)) {
      this.PresItemResponseField = value;
      // this.RaisePropertyChanged("PresItemResponse");
    }
  }

  get StationeryType(): ObjectInfo {
    return this.StationeryTypeField;
  }
  set StationeryType(value: ObjectInfo) {
    if (JSON.stringify(this.StationeryTypeField) != JSON.stringify(value)) {
      this.StationeryTypeField = value;
      // this.RaisePropertyChanged("StationeryType");
    }
  }

  get Chooseprinter(): string {
    return this.ChooseprinterField;
  }
  set Chooseprinter(value: string) {
    if (JSON.stringify(this.ChooseprinterField) != JSON.stringify(value)) {
      this.ChooseprinterField = value;
      // this.RaisePropertyChanged("Chooseprinter");
    }
  }

  get TemplateStatus(): string {
    return this.TemplateStatusField;
  }
  set TemplateStatus(value: string) {
    if (JSON.stringify(this.TemplateStatusField) != JSON.stringify(value)) {
      this.TemplateStatusField = value;
      // this.RaisePropertyChanged("TemplateStatus");
    }
  }

  get PatientOID(): string {
    return this.PatientOIDField;
  }
  set PatientOID(value: string) {
    if (JSON.stringify(this.PatientOIDField) != JSON.stringify(value)) {
      this.PatientOIDField = value;
      // this.RaisePropertyChanged("PatientOID");
    }
  }

  get EncounterOID(): string {
    return this.EncounterOIDField;
  }
  set EncounterOID(value: string) {
    if (JSON.stringify(this.EncounterOIDField) != JSON.stringify(value)) {
      this.EncounterOIDField = value;
      // this.RaisePropertyChanged("EncounterOID");
    }
  }

  get ClinicalNoteOID(): string {
    return this.ClinicalNoteOIDField;
  }
  set ClinicalNoteOID(value: string) {
    if (JSON.stringify(this.ClinicalNoteOIDField) != JSON.stringify(value)) {
      this.ClinicalNoteOIDField = value;
      // this.RaisePropertyChanged("ClinicalNoteOID");
    }
  }

  get PPatientOID(): string {
    return this.PPatientOIDField;
  }
  set PPatientOID(value: string) {
    if (JSON.stringify(this.PPatientOIDField) != JSON.stringify(value)) {
      this.PPatientOIDField = value;
      // this.RaisePropertyChanged("PPatientOID");
    }
  }
}
export class PresItemCommonProperties extends CLZOObject {
  TreatmentToContField: any;
  AdminInstructionField: any;
  DispensingInstructionField: any;
  SupplyInstructionField: ObjectInfo[] = [];
  SupplementItemsField: any;
  LegalCategoryField: any;
  RouteField: any;
  FormField: any;
  StatusflagsField: any;
  DrugPropertiesField: any;
  MultipleRoutesField: any;
  DRCdoseTypeLorenzoIDField: any;
  PresItemEncounterField: any;
  private ItemTypeField = ' ';
  private ItemSubTypeField = ' ';
  private IsControlledDrugField = ' ';

  private OtherDispensingInstructionField = ' ';

  private OtherAdminInstructionField = ' ';

  private IdentifyingDomainField = ' ';

  private AdminIdentifyingDomainField = ' ';

  private TechSupplyInstructionField = ' ';

  private multipleRouteTypeField = 0; /* //byte */

  private IndicationOverrideReasonField = ' ';
  private TechSupplyInstrItemLevelField = ' ';

  private IsSupplyReqField = ' ';

  private LocOidField = 0;

  private ServOidField = 0;

  private IsWardStkField = true;
  private RequisitionCACodField = ' ';
  private EncOIDField = 0;
  private IsMergePatField = ' ';
  private IsAmendSupplyInstrClearField = true;
  private PrescriptionItemTechOIDField = 0;
  private IsSupplyInstChangedField = true;
  private _SupplyDTTM = new Date();

  //TFS-7732 Sprint 2
  private FluidSupplyInstField = ' ';
  private IsChildSupplyInstChangedField = true;
  //wardstock TFS 1381 NextSupplyDate store and fetch sasi
  private _NextSupplyDTTM = new Date();
  private _FluidNextSupplyDTTM = new Date();
  private isNextSupplyUpdateField = true;
  //DRC  BNS change
  //Esakki - CriticalMeds
  private IsCriticalMedField = true;

  private IsAuthorisedField = true;

  private FreqOIDField = 0;

  private IsPrescribeInControlledDrugField = true;

  private IsCalledFromSIField = true;
  private SupplyStatusField = ' ';

  get ItemType(): string {
    return this.ItemTypeField;
  }
  set ItemType(value: string) {
    if (JSON.stringify(this.ItemTypeField) != JSON.stringify(value)) {
      this.ItemTypeField = value;
      /* this.RaisePropertyChanged("ItemType"); */
    }
  }

  get ItemSubType(): string {
    return this.ItemSubTypeField;
  }
  set ItemSubType(value: string) {
    if (JSON.stringify(this.ItemSubTypeField) == JSON.stringify(value)) {
      this.ItemSubTypeField = value;
      /*  this.RaisePropertyChanged("ItemSubType"); */
    }
  }

  /* public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo TreatmentToCont */
  get TreatmentToCont() {
    return this.TreatmentToContField;
  }
  set TreatmentToCont(value: any) {
    if (JSON.stringify(this.TreatmentToContField) != JSON.stringify(value)) {
      this.TreatmentToContField = value;
      /* this.RaisePropertyChanged("TreatmentToCont"); */
    }
  }

  get AdminInstruction() {
    return this.AdminInstructionField;
  }
  set AdminInstruction(value: any) {
    if (JSON.stringify(this.AdminInstructionField) != JSON.stringify(value)) {
      this.AdminInstructionField = value;
      /* this.RaisePropertyChanged("AdminInstruction"); */
    }
  }

  /*  public System.Collections.ObjectModel.ObservableCollection<iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo> DispensingInstruction */
  get DispensingInstruction() {
    return this.DispensingInstructionField;
  }
  set DispensingInstruction(value: any) {
    if (
      JSON.stringify(this.DispensingInstructionField) != JSON.stringify(value)
    ) {
      this.DispensingInstructionField = value;
      /* this.RaisePropertyChanged("DispensingInstruction"); */
    }
  }

  /* public System.Collections.ObjectModel.ObservableCollection<iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo> SupplyInstruction  */
  get SupplyInstruction(): ObjectInfo[] {
    return this.SupplyInstructionField;
  }
  set SupplyInstruction(value: ObjectInfo[]) {
    if (JSON.stringify(this.SupplyInstructionField) != JSON.stringify(value)) {
      this.SupplyInstructionField = value;
      /* this.RaisePropertyChanged("SupplyInstruction"); */
    }
  }

  /* public System.Collections.ObjectModel.ObservableCollection<iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo> SupplementItems */
  get SupplementItems() {
    return this.SupplementItemsField;
  }
  set SupplementItems(value: any) {
    if (JSON.stringify(this.SupplementItemsField) != JSON.stringify(value)) {
      this.SupplementItemsField = value;
      /* this.RaisePropertyChanged("SupplementItems"); */
    }
  }

  /* public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo LegalCategory */
  get LegalCategory() {
    return this.LegalCategoryField;
  }
  set LegalCategory(value: any) {
    if (JSON.stringify(this.LegalCategoryField) != JSON.stringify(value)) {
      this.LegalCategoryField = value;
      /* this.RaisePropertyChanged("LegalCategory"); */
    }
  }

  /*  public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo Route */
  get Route() {
    return this.RouteField;
  }
  set Route(value: any) {
    if (JSON.stringify(this.RouteField) != JSON.stringify(value)) {
      this.RouteField = value;
      /* this.RaisePropertyChanged("Route"); */
    }
  }

  /*   public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo Form  */
  get Form() {
    return this.FormField;
  }
  set Form(value: any) {
    if (JSON.stringify(this.FormField) != JSON.stringify(value)) {
      this.FormField = value;
      /* this.RaisePropertyChanged("Form"); */
    }
  }

  /*  public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.StatusFlags Statusflags */
  get Statusflags() {
    return this.StatusflagsField;
  }
  set Statusflags(value: any) {
    if (JSON.stringify(this.StatusflagsField) != JSON.stringify(value)) {
      this.StatusflagsField = value;
      /* this.RaisePropertyChanged("Statusflags"); */
    }
  }

  /* public System.Collections.ObjectModel.ObservableCollection<iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.DrugProperty> DrugProperties */
  get DrugProperties() {
    return this.DrugPropertiesField;
  }
  set DrugProperties(value: any) {
    if (JSON.stringify(this.DrugPropertiesField) != JSON.stringify(value)) {
      this.DrugPropertiesField = value;
      /* this.RaisePropertyChanged("DrugProperties"); */
    }
  }

  get IsControlledDrug(): string {
    return this.IsControlledDrugField;
  }
  set IsControlledDrug(value: string) {
    if (JSON.stringify(this.IsControlledDrugField) != JSON.stringify(value)) {
      this.IsControlledDrugField = value;
      /* this.RaisePropertyChanged("IsControlledDrug"); */
    }
  }

  get OtherDispensingInstruction(): string {
    return this.OtherDispensingInstructionField;
  }
  set OtherDispensingInstruction(value: string) {
    if (
      JSON.stringify(this.OtherDispensingInstructionField) !=
      JSON.stringify(value)
    ) {
      this.OtherDispensingInstructionField = value;
      /* this.RaisePropertyChanged("OtherDispensingInstruction"); */
    }
  }

  get OtherAdminInstruction(): string {
    return this.OtherAdminInstructionField;
  }
  set OtherAdminInstruction(value: string) {
    if (
      JSON.stringify(this.OtherAdminInstructionField) != JSON.stringify(value)
    ) {
      this.OtherAdminInstructionField = value;
      /* this.RaisePropertyChanged("OtherAdminInstruction"); */
    }
  }

  get IdentifyingDomain(): string {
    return this.IdentifyingDomainField;
  }
  set IdentifyingDomain(value: string) {
    if (JSON.stringify(this.IdentifyingDomainField) != JSON.stringify(value)) {
      this.IdentifyingDomainField = value;
      /* this.RaisePropertyChanged("IdentifyingDomain"); */
    }
  }

  get AdminIdentifyingDomain(): string {
    return this.AdminIdentifyingDomainField;
  }
  set AdminIdentifyingDomain(value: string) {
    if (
      JSON.stringify(this.AdminIdentifyingDomainField) != JSON.stringify(value)
    ) {
      this.AdminIdentifyingDomainField = value;
      /* this.RaisePropertyChanged("AdminIdentifyingDomain"); */
    }
  }

  get TechSupplyInstruction(): string {
    return this.TechSupplyInstructionField;
  }
  set TechSupplyInstruction(value: string) {
    if (
      JSON.stringify(this.TechSupplyInstructionField) != JSON.stringify(value)
    ) {
      this.TechSupplyInstructionField = value;
      /* this.RaisePropertyChanged("TechSupplyInstruction"); */
    }
  }

  get MultipleRoutes() {
    return this.MultipleRoutesField;
  }
  set MultipleRoutes(value: any) {
    if (JSON.stringify(this.MultipleRoutesField) != JSON.stringify(value)) {
      this.MultipleRoutesField = value;
      /* this.RaisePropertyChanged("MultipleRoutes"); */
    }
  }

  get MultipleRouteType(): number {
    return this.multipleRouteTypeField;
  }
  set MultipleRouteType(value: number) {
    this.multipleRouteTypeField = value;
    /* this.RaisePropertyChanged("MultipleRouteType"); */
  }

  get IndicationOverrideReason(): string {
    return this.IndicationOverrideReasonField;
  }
  set IndicationOverrideReason(value: string) {
    if (
      JSON.stringify(this.IndicationOverrideReasonField) !=
      JSON.stringify(value)
    ) {
      this.IndicationOverrideReasonField = value;
      /* this.RaisePropertyChanged("IndicationOverrideReason"); */
    }
  }

  get TechSupplyInstrItemLevel(): string {
    return this.TechSupplyInstrItemLevelField;
  }
  set TechSupplyInstrItemLevel(value: string) {
    if (
      JSON.stringify(this.TechSupplyInstrItemLevelField) !=
      JSON.stringify(value)
    ) {
      this.TechSupplyInstrItemLevelField = value;

      /* this.RaisePropertyChanged("TechSupplyInstrItemLevel"); */
    }
  }

  get IsSupplyReq(): string {
    return this.IsSupplyReqField;
  }
  set IsSupplyReq(value: string) {
    if (JSON.stringify(this.IsSupplyReqField) != JSON.stringify(value)) {
      this.IsSupplyReqField = value;
      /*  this.RaisePropertyChanged("IsSupplyReq"); */
    }
  }

  get LocOid(): number {
    return this.LocOidField;
  }
  set LocOid(value: number) {
    if (this.LocOidField != value) {
      this.LocOidField = value;
      /* this.RaisePropertyChanged("LocOid"); */
    }
  }

  get ServOid(): number {
    return this.ServOidField;
  }
  set ServOid(value: number) {
    if (this.ServOidField != value) {
      this.ServOidField = value;
      /* this.RaisePropertyChanged("ServOid"); */
    }
  }

  get IsWardStk(): boolean {
    return this.IsWardStkField;
  }
  set IsWardStk(value: boolean) {
    if (JSON.stringify(this.IsWardStkField) != JSON.stringify(value)) {
      this.IsWardStkField = value;
      /* this.RaisePropertyChanged("IsWardStk"); */
    }
  }

  get RequisitionCACod(): string {
    return this.RequisitionCACodField;
  }
  set RequisitionCACod(value: string) {
    if (JSON.stringify(this.RequisitionCACodField) != JSON.stringify(value)) {
      this.RequisitionCACodField = value;
      /* this.RaisePropertyChanged("RequisitionCACod"); */
    }
  }

  get EncOID(): number {
    return this.EncOIDField;
  }
  set EncOID(value: number) {
    if (JSON.stringify(this.EncOIDField) != JSON.stringify(value)) {
      this.EncOIDField = value;
      /* this.RaisePropertyChanged("EncOID"); */
    }
  }

  get IsMergePat(): string {
    return this.IsMergePatField;
  }
  set IsMergePat(value: string) {
    if (JSON.stringify(this.IsMergePatField) != JSON.stringify(value)) {
      this.IsMergePatField = value;
      /* this.RaisePropertyChanged("IsMergePat"); */
    }
  }

  get IsAmendSupplyInstrClear(): boolean {
    return this.IsAmendSupplyInstrClearField;
  }
  set IsAmendSupplyInstrClear(value: boolean) {
    if (this.IsAmendSupplyInstrClearField != value) {
      this.IsAmendSupplyInstrClearField = value;
      /* this.RaisePropertyChanged("IsAmendSupplyInstrClear"); */
    }
  }

  get PrescriptionItemTechOID(): number {
    return this.PrescriptionItemTechOIDField;
  }
  set PrescriptionItemTechOID(value: number) {
    if (
      JSON.stringify(this.PrescriptionItemTechOIDField) != JSON.stringify(value)
    ) {
      this.PrescriptionItemTechOIDField = value;
      /* this.RaisePropertyChanged("PrescriptionItemTechOID"); */
    }
  }

  get IsSupplyInstChanged(): boolean {
    return this.IsSupplyInstChangedField;
  }
  set IsSupplyInstChanged(value: boolean) {
    if (this.IsSupplyInstChangedField != value) {
      this.IsSupplyInstChangedField = value;
      /* this.RaisePropertyChanged("IsSupplyInstChanged"); */
    }
  }

  get SupplyDTTM(): Date {
    return this._SupplyDTTM;
  }
  set SupplyDTTM(value: Date) {
    if (this._SupplyDTTM != value) {
      this._SupplyDTTM = value;
      /* this.RaisePropertyChanged("SupplyDTTM"); */
    }
  }

  get FluidSupplyInst(): string {
    return this.FluidSupplyInstField;
  }
  set FluidSupplyInst(value: string) {
    if (JSON.stringify(this.FluidSupplyInstField) != JSON.stringify(value)) {
      this.FluidSupplyInstField = value;

      /* this.RaisePropertyChanged("FluidSupplyInst"); */
    }
  }

  get IsChildSupplyInstChanged(): boolean {
    return this.IsChildSupplyInstChangedField;
  }
  set IsChildSupplyInstChanged(value: boolean) {
    if (this.IsChildSupplyInstChangedField != value) {
      this.IsChildSupplyInstChangedField = value;
      /* this.RaisePropertyChanged("IsChildSupplyInstChanged"); */
    }
  }

  /* public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo DRCdoseTypeLorenzoID */
  get DRCdoseTypeLorenzoID() {
    return this.DRCdoseTypeLorenzoIDField;
  }
  set DRCdoseTypeLorenzoID(value: any) {
    if (
      JSON.stringify(this.DRCdoseTypeLorenzoIDField) != JSON.stringify(value)
    ) {
      this.DRCdoseTypeLorenzoIDField = value;
      /* this.RaisePropertyChanged("DRCdoseTypeLorenzoID"); */
    }
  }

  /*  public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo PresItemEncounter */
  get PresItemEncounter() {
    return this.PresItemEncounterField;
  }
  set PresItemEncounter(value: any) {
    if (JSON.stringify(this.PresItemEncounterField) != JSON.stringify(value)) {
      this.PresItemEncounterField = value;
      /* this.RaisePropertyChanged("PresItemEncounter"); */
    }
  }

  get NextSupplyDTTM(): Date {
    return this._NextSupplyDTTM;
  }
  set NextSupplyDTTM(value: Date) {
    if (this._NextSupplyDTTM != value) {
      this._NextSupplyDTTM = value;
      /*  this.RaisePropertyChanged("NextSupplyDTTM");
       */
    }
  }

  get FluidNextSupplyDTTM() {
    return this._FluidNextSupplyDTTM;
  }
  set FluidNextSupplyDTTM(value: any) {
    if (this._FluidNextSupplyDTTM != value) {
      this._FluidNextSupplyDTTM = value;
      /* this.RaisePropertyChanged("FluidNextSupplyDTTM"); */
    }
  }

  get isNextSupplyUpdate(): boolean {
    return this.isNextSupplyUpdateField;
  }
  set isNextSupplyUpdate(value) {
    if (this.isNextSupplyUpdateField != value) {
      this.isNextSupplyUpdateField = value;
      /* this.RaisePropertyChanged("isNextSupplyUpdate"); */
    }
  }

  get IsCriticalMed(): boolean {
    return this.IsCriticalMedField;
  }
  set IsCriticalMed(value) {
    if (this.IsCriticalMedField != value) {
      this.IsCriticalMedField = value;
      /* this.RaisePropertyChanged("IsCriticalMed"); */
    }
  }

  get IsAuthorised(): boolean {
    return this.IsAuthorisedField;
  }
  set IsAuthorised(value) {
    if (this.IsAuthorisedField != value) {
      this.IsAuthorisedField = value;
      /* this.RaisePropertyChanged("IsAuthorised"); */
    }
  }

  get FreqOID(): number {
    return this.FreqOIDField;
  }
  set FreqOID(value: number) {
    if (JSON.stringify(this.FreqOIDField) != JSON.stringify(value)) {
      this.FreqOIDField = value;

      /* this.RaisePropertyChanged("FreqOID"); */
    }
  }

  get IsPrescribeInControlledDrug(): boolean {
    return this.IsPrescribeInControlledDrugField;
  }
  set IsPrescribeInControlledDrug(value) {
    if (
      JSON.stringify(this.IsPrescribeInControlledDrugField) !=
      JSON.stringify(value)
    ) {
      this.IsPrescribeInControlledDrugField = value;
      /* this.RaisePropertyChanged("IsPrescribeInControlledDrug"); */
    }
  }

  get SupplyStatus(): string {
    return this.SupplyStatusField;
  }
  set SupplyStatus(value: string) {
    if (JSON.stringify(this.SupplyStatusField) != JSON.stringify(value)) {
      this.SupplyStatusField = value;

      /* this.RaisePropertyChanged("SupplyStatus"); */
      //}
    }
  }
}
export class DrugItemBasicData extends CLZOObject {
  private pField = '';
  private qField = '';
  private rField = '';
  private sField = '';
  private tField = '';
  private yField = '';
  private zField = false;
  private aaField = '';
  private bbField = '';
  private ccField = 0;
  private ddField = 0;
  private eeField = '';
  private ffField = '';
  private mcField = '';
  private psField = '';
  private IdentifyingOIDField = 0;
  private IdentifyingTypeField = '';
  private IdentifyingNameField = '';
  private PrescribableItemListOIDField = 0;
  private MCVersionNoField = '';
  private IsAccessContraintField = '';
  private IsPrescribeByBrandField = '';
  private FormularyNoteField = '';
  private ItemTypeField = '';
  private RouteOIDField = 0;
  private FormOIDField = 0;
  private IsTechValidateCAField = 0;
  private LorenzoIDField = '';
  private NonCatItemReasonField = '';
  private TechQtyUomNameField = '';
  private IsControllDrugField = '';
  private ITMSUBTYPField = '';
  private SourceDataProviderTypeField = '';
  private AliasNameField = '';
  private PrescriptionItemIdField = '';
  private ConflictUniqueIdField = '';
  private bIsReplacementField = false;
  private sDosageFormField = '';
  private sStrengthField = '';
  private DosageFormIDField = 0;
  private MCOIDField = 0;
  private MCPrepStatusCodeField = '';
  private MCItemNameField = '';
  private MCIItemDisplayField = '';
  private PreparationStatusField = '';
  private MCIDEActiveItemsField = '';
  private MCIVersionMatchItemsField = '';
  private IsInfusionField = '';
  private DisplaySequenceField = 0;
  private ReorderedFromclerkItemOIDField = 0;
  private cMonPerMandField = 0;
  private IsIndicationRequiredField = '';
  private IndicationOverrideResonField = '';
  private PrescribableItemDetailOIDField = 0;
  private NonCatalogueOtherCommentsField = '';
  //37572
  private OrderSentenceDescField = '';
  private VMVPMCILorenzoIDField = '';
  private VMVPMCIdentifyingNameField = '';
  private FormularyOIDField = 0;
  //Epic 3383 - To show PrescribingNote Icon and Text in Search Reuslts and Secondary Window ProductOptions - Divya
  private PrescribingNoteField = '';

  //Ramya-3383- order set US 60058- to show the Prescribing note in order set level search result - Considering Guidance as Prescribing Note
  private GuidanceField = '';
  //
  //Ramya-3383-60058-Differentiating Orderset Item note and Customised Item Note in Resolution grid and Formviewer
  private OrdersetOIDField = '';
  //
  private AmendedCurrDTTMField = new Date();

  private IsAmendedStopDTTMForAlternateDaysFreqField = false;

  private NextSlotGenerateStartDTTMField = new Date();

  //Ramya-7732
  private PatientOIDField = 0;
  //Ramya-7732- -Prescribe Mode UOM's has to load for MCI parent
  private ComponentOidandTypeField = '';
  private SupplyByAtField = '';
  private _LastSupplyDTTM = new Date();
  //TFS-71610 GPConnect #START
  private GPErrorCodeField = 0;
  private IsTransformGPConRequiredField = 0;
  private GPCProductFormOIDField = 0;
  //TFS-71610 GPConnect #END

  //Esakki - WSC
  private SupplyByAtMCIFluidParentField = '';
  private _LastSupplyDTTMMCIFluidParent = new Date();
  private SupplyByAtFluidChildField = '';
  private _LastSupplyDTTMFluidChild = new Date();

  get p(): string {
    return this.pField;
  }
  set p(value: string) {
    if (this.referenceEquals(this.pField, value)) {
      this.pField = value;
      // this.RaisePropertyChanged("p");
    }
  }

  get q(): string {
    return this.qField;
  }
  set q(value: string) {
    if (this.referenceEquals(this.qField, value)) {
      this.qField = value;
      // this.RaisePropertyChanged("q");
    }
  }

  get r(): string {
    return this.rField;
  }
  set r(value: string) {
    if (this.referenceEquals(this.rField, value)) {
      this.rField = value;
      // this.RaisePropertyChanged("r");
    }
  }

  get s(): string {
    return this.sField;
  }
  set s(value: string) {
    if (this.referenceEquals(this.sField, value)) {
      this.sField = value;
      // this.RaisePropertyChanged("s");
    }
  }

  get t(): string {
    return this.tField;
  }
  set t(value: string) {
    if (this.referenceEquals(this.tField, value)) {
      this.tField = value;
      // this.RaisePropertyChanged("t");
    }
  }

  get y(): string {
    return this.yField;
  }
  set y(value: string) {
    if (this.referenceEquals(this.yField, value)) {
      this.yField = value;
      // this.RaisePropertyChanged("y");
    }
  }

  get z(): boolean {
    return this.zField;
  }
  set z(value: boolean) {
    if (this.zField != value) {
      this.zField = value;
      // this.RaisePropertyChanged("z");
    }
  }

  get aa(): string {
    return this.aaField;
  }
  set aa(value: string) {
    if (this.referenceEquals(this.aaField, value)) {
      this.aaField = value;
      // this.RaisePropertyChanged("aa");
    }
  }

  get bb(): string {
    return this.bbField;
  }
  set bb(value: string) {
    if (this.referenceEquals(this.bbField, value)) {
      this.bbField = value;
      // this.RaisePropertyChanged("bb");
    }
  }

  get cc(): number {
    return this.ccField;
  }
  set cc(value: number) {
    if (this.ccField != value) {
      this.ccField = value;
      // this.RaisePropertyChanged("cc");
    }
  }

  get dd(): number {
    return this.ddField;
  }
  set dd(value: number) {
    if ((this.ddField != value) != true) {
      this.ddField = value;
      // this.RaisePropertyChanged("dd");
    }
  }

  get ee(): string {
    return this.eeField;
  }
  set ee(value: string) {
    if (this.referenceEquals(this.eeField, value)) {
      this.eeField = value;
      // this.RaisePropertyChanged("ee");
    }
  }

  get ff(): string {
    return this.ffField;
  }
  set ff(value: string) {
    if (this.referenceEquals(this.ffField, value)) {
      this.ffField = value;
      // this.RaisePropertyChanged("ff");
    }
  }

  get mc(): string {
    return this.mcField;
  }
  set mc(value: string) {
    if (this.referenceEquals(this.mcField, value)) {
      this.mcField = value;
      // this.RaisePropertyChanged("mc");
    }
  }

  get ps(): string {
    return this.psField;
  }
  set ps(value: string) {
    if (this.referenceEquals(this.psField, value)) {
      this.psField = value;
      // this.RaisePropertyChanged("ps");
    }
  }

  get IdentifyingOID(): number {
    return this.IdentifyingOIDField;
  }
  set IdentifyingOID(value: number) {
    if (this.IdentifyingOIDField != value) {
      this.IdentifyingOIDField = value;
      // this.RaisePropertyChanged("IdentifyingOID");
    }
  }

  get IdentifyingType(): string {
    return this.IdentifyingTypeField;
  }
  set IdentifyingType(value: string) {
    if (this.referenceEquals(this.IdentifyingTypeField, value)) {
      this.IdentifyingTypeField = value;
      // this.RaisePropertyChanged("IdentifyingType");
    }
  }

  get IdentifyingName(): string {
    return this.IdentifyingNameField;
  }
  set IdentifyingName(value: string) {
    if (this.referenceEquals(this.IdentifyingNameField, value)) {
      this.IdentifyingNameField = value;
      // this.RaisePropertyChanged("IdentifyingName");
    }
  }

  get PrescribableItemListOID(): number {
    return this.PrescribableItemListOIDField;
  }
  set PrescribableItemListOID(value: number) {
    if (this.PrescribableItemListOIDField != value) {
      this.PrescribableItemListOIDField = value;
      // this.RaisePropertyChanged("PrescribableItemListOID");
    }
  }
  get MCVersionNo(): string {
    return this.MCVersionNoField;
  }
  set MCVersionNo(value: string) {
    if (this.referenceEquals(this.MCVersionNoField, value)) {
      this.MCVersionNoField = value;
      // this.RaisePropertyChanged("MCVersionNo");
    }
  }

  get IsAccessContraint(): string {
    return this.IsAccessContraintField;
  }
  set IsAccessContraint(value: string) {
    if (this.referenceEquals(this.IsAccessContraintField, value)) {
      this.IsAccessContraintField = value;
      // this.RaisePropertyChanged("IsAccessContraint");
    }
  }

  get IsPrescribeByBrand(): string {
    return this.IsPrescribeByBrandField;
  }
  set IsPrescribeByBrand(value: string) {
    if (this.referenceEquals(this.IsPrescribeByBrandField, value)) {
      this.IsPrescribeByBrandField = value;
      // this.RaisePropertyChanged("IsPrescribeByBrand");
    }
  }

  get FormularyNote(): string {
    return this.FormularyNoteField;
  }
  set FormularyNote(value: string) {
    if (this.referenceEquals(this.FormularyNoteField, value)) {
      this.FormularyNoteField = value;
      // this.RaisePropertyChanged("FormularyNote");
    }
  }

  get ItemType(): string {
    return this.ItemTypeField;
  }
  set ItemType(value: string) {
    if (this.referenceEquals(this.ItemTypeField, value)) {
      this.ItemTypeField = value;
      // this.RaisePropertyChanged("ItemType");
    }
  }

  get RouteOID(): number {
    return this.RouteOIDField;
  }
  set RouteOID(value: number) {
    if (this.RouteOIDField != value) {
      this.RouteOIDField = value;
      // this.RaisePropertyChanged("RouteOID");
    }
  }

  get FormOID(): number {
    return this.FormOIDField;
  }
  set FormOID(value: number) {
    if (this.FormOIDField != value) {
      this.FormOIDField = value;
      // this.RaisePropertyChanged("FormOID");
    }
  }

  get IsTechValidateCA(): number {
    return this.IsTechValidateCAField;
  }
  set IsTechValidateCA(value: number) {
    if (this.IsTechValidateCAField != value) {
      this.IsTechValidateCAField = value;
      // this.RaisePropertyChanged("IsTechValidateCA");
    }
  }

  get LorenzoID(): string {
    return this.LorenzoIDField;
  }
  set LorenzoID(value: string) {
    if (this.referenceEquals(this.LorenzoIDField, value)) {
      this.LorenzoIDField = value;
      // this.RaisePropertyChanged("LorenzoID");
    }
  }

  get NonCatItemReason(): string {
    return this.NonCatItemReasonField;
  }
  set NonCatItemReason(value: string) {
    if (this.referenceEquals(this.NonCatItemReasonField, value)) {
      this.NonCatItemReasonField = value;
      // this.RaisePropertyChanged("NonCatItemReason");
    }
  }

  get TechQtyUomName(): string {
    return this.TechQtyUomNameField;
  }
  set TechQtyUomName(value: string) {
    if (this.referenceEquals(this.TechQtyUomNameField, value)) {
      this.TechQtyUomNameField = value;
      // this.RaisePropertyChanged("TechQtyUomName");
    }
  }

  get IsControllDrug(): string {
    return this.IsControllDrugField;
  }
  set IsControllDrug(value: string) {
    if (this.referenceEquals(this.IsControllDrugField, value)) {
      this.IsControllDrugField = value;
      // this.RaisePropertyChanged("IsControllDrug");
    }
  }

  get ITMSUBTYP(): string {
    return this.ITMSUBTYPField;
  }
  set ITMSUBTYP(value: string) {
    if (this.referenceEquals(this.ITMSUBTYPField, value)) {
      this.ITMSUBTYPField = value;
      // this.RaisePropertyChanged("ITMSUBTYP");
    }
  }

  get SourceDataProviderType(): string {
    return this.SourceDataProviderTypeField;
  }
  set SourceDataProviderType(value: string) {
    if (this.referenceEquals(this.SourceDataProviderTypeField, value)) {
      this.SourceDataProviderTypeField = value;
      // this.RaisePropertyChanged("SourceDataProviderType");
    }
  }

  get AliasName(): string {
    return this.AliasNameField;
  }
  set AliasName(value: string) {
    if (this.referenceEquals(this.AliasNameField, value)) {
      this.AliasNameField = value;
      // this.RaisePropertyChanged("AliasName");
    }
  }

  get PrescriptionItemId(): string {
    return this.PrescriptionItemIdField;
  }
  set PrescriptionItemId(value: string) {
    if (this.referenceEquals(this.PrescriptionItemIdField, value)) {
      this.PrescriptionItemIdField = value;
      // this.RaisePropertyChanged("PrescriptionItemId");
    }
  }

  get ConflictUniqueId(): string {
    return this.ConflictUniqueIdField;
  }
  set ConflictUniqueId(value: string) {
    if (this.referenceEquals(this.ConflictUniqueIdField, value)) {
      this.ConflictUniqueIdField = value;
      // this.RaisePropertyChanged("ConflictUniqueId");
    }
  }

  get bIsReplacement(): boolean {
    return this.bIsReplacementField;
  }
  set bIsReplacement(value: boolean) {
    if (this.bIsReplacementField != value) {
      this.bIsReplacementField = value;
      // this.RaisePropertyChanged("bIsReplacement");
    }
  }

  get sDosageForm(): string {
    return this.sDosageFormField;
  }
  set sDosageForm(value: string) {
    if (this.referenceEquals(this.sDosageFormField, value)) {
      this.sDosageFormField = value;
      // this.RaisePropertyChanged("sDosageForm");
    }
  }

  get sStrength(): string {
    return this.sStrengthField;
  }
  set sStrength(value: string) {
    if (this.referenceEquals(this.sStrengthField, value)) {
      this.sStrengthField = value;
      // this.RaisePropertyChanged("sStrength");
    }
  }

  get DosageFormID(): number {
    return this.DosageFormIDField;
  }
  set DosageFormID(value: number) {
    if (this.DosageFormIDField != value) {
      this.DosageFormIDField = value;
      // this.RaisePropertyChanged("DosageFormID");
    }
  }

  get MCOID(): number {
    return this.MCOIDField;
  }
  set MCOID(value: number) {
    if (this.MCOIDField != value) {
      this.MCOIDField = value;
      // this.RaisePropertyChanged("MCOID");
    }
  }

  get MCPrepStatusCode(): string {
    return this.MCPrepStatusCodeField;
  }
  set MCPrepStatusCode(value: string) {
    if (this.referenceEquals(this.MCPrepStatusCodeField, value)) {
      this.MCPrepStatusCodeField = value;
      // this.RaisePropertyChanged("MCPrepStatusCode");
    }
  }

  get MCItemName(): string {
    return this.MCItemNameField;
  }
  set MCItemName(value: string) {
    if (this.referenceEquals(this.MCItemNameField, value)) {
      this.MCItemNameField = value;
      // this.RaisePropertyChanged("MCItemName");
    }
  }

  get MCIItemDisplay(): string {
    return this.MCIItemDisplayField;
  }
  set MCIItemDisplay(value: string) {
    if (this.referenceEquals(this.MCIItemDisplayField, value)) {
      this.MCIItemDisplayField = value;
      // this.RaisePropertyChanged("MCIItemDisplay");
    }
  }

  get PreparationStatus(): string {
    return this.PreparationStatusField;
  }
  set PreparationStatus(value: string) {
    if (this.referenceEquals(this.PreparationStatusField, value)) {
      this.PreparationStatusField = value;
      // this.RaisePropertyChanged("PreparationStatus");
    }
  }

  get MCIDEActiveItems() {
    return this.MCIDEActiveItemsField;
  }
  set MCIDEActiveItems(value) {
    if (this.referenceEquals(this.MCIDEActiveItemsField, value)) {
      this.MCIDEActiveItemsField = value;
      // this.RaisePropertyChanged("MCIDEActiveItems");
    }
  }

  get MCIVersionMatchItems() {
    return this.MCIVersionMatchItemsField;
  }
  set MCIVersionMatchItems(value) {
    if (this.referenceEquals(this.MCIVersionMatchItemsField, value)) {
      this.MCIVersionMatchItemsField = value;
      // this.RaisePropertyChanged("MCIVersionMatchItems");
    }
  }

  get IsInfusion(): string {
    return this.IsInfusionField;
  }
  set IsInfusion(value: string) {
    if (this.referenceEquals(this.IsInfusionField, value)) {
      this.IsInfusionField = value;
      // this.RaisePropertyChanged("IsInfusion");
    }
  }

  get DisplaySequence(): number {
    return this.DisplaySequenceField;
  }
  set DisplaySequence(value: number) {
    if (this.DisplaySequenceField != value) {
      this.DisplaySequenceField = value;
      // this.RaisePropertyChanged("DisplaySequence");
    }
  }

  get ReorderedFromclerkItemOID(): number {
    return this.ReorderedFromclerkItemOIDField;
  }
  set ReorderedFromclerkItemOID(value: number) {
    if (this.ReorderedFromclerkItemOIDField != value) {
      this.ReorderedFromclerkItemOIDField = value;
      // this.RaisePropertyChanged("ReorderedFromclerkItemOID");
    }
  }

  get MonPeriodMand(): number {
    return this.cMonPerMandField;
  }
  set MonPeriodMand(value: number) {
    if (this.cMonPerMandField != value) {
      this.cMonPerMandField = value;
      // this.RaisePropertyChanged("MonPeriodMand");
    }
  }

  get IsIndicationRequired(): string {
    return this.IsIndicationRequiredField;
  }
  set IsIndicationRequired(value: string) {
    this.IsIndicationRequiredField = value;
    // this.RaisePropertyChanged("IsIndicationRequired");
  }

  get IndicationOverrideReson(): string {
    return this.IndicationOverrideResonField;
  }
  set IndicationOverrideReson(value: string) {
    this.IndicationOverrideResonField = value;
    // this.RaisePropertyChanged("IndicationOverrideReson");
  }

  get PrescribableItemDetailOID(): number {
    return this.PrescribableItemDetailOIDField;
  }
  set PrescribableItemDetailOID(value: number) {
    this.PrescribableItemDetailOIDField = value;
  }

  get NonCatalogueOtherComments(): string {
    return this.NonCatalogueOtherCommentsField;
  }
  set NonCatalogueOtherComments(value: string) {
    this.NonCatalogueOtherCommentsField = value;
    //    this.RaisePropertyChanged("NonCatalogueOtherComments");
  }

  get OrderSentenceDesc(): string {
    return this.OrderSentenceDescField;
  }
  set OrderSentenceDesc(value: string) {
    this.OrderSentenceDescField = value;
    //    this.RaisePropertyChanged("OrderSentenceDesc");
  }

  get VMVPMCILorenzoID(): string {
    return this.VMVPMCILorenzoIDField;
  }
  set VMVPMCILorenzoID(value: string) {
    this.VMVPMCILorenzoIDField = value;
    //    this.RaisePropertyChanged("VMVPMCILorenzoID");
  }

  get VMVPMCIdentifyingName(): string {
    return this.VMVPMCIdentifyingNameField;
  }
  set VMVPMCIdentifyingName(value: string) {
    this.VMVPMCIdentifyingNameField = value;
    //    this.RaisePropertyChanged("VMVPMCIdentifyingName");
  }

  get FormularyOID(): number {
    return this.FormularyOIDField;
  }
  set FormularyOID(value: number) {
    this.FormularyOIDField = value;
    //    this.RaisePropertyChanged("FormularyOID");
  }

  //Epic 3383 - To show PrescribingNote Icon and Text in Search Reuslts and Secondary Window ProductOptions - Divya

  get PrescribingNote(): string {
    return this.PrescribingNoteField;
  }
  set PrescribingNote(value: string) {
    if (this.referenceEquals(this.PrescribingNoteField, value)) {
      this.PrescribingNoteField = value;
      //    this.RaisePropertyChanged("PrescribingNote");
    }
  }

  //Ramya-3383- order set US 60058- Favourite order set search - Considering Guidance as Prescribing Note

  get Guidance(): string {
    return this.GuidanceField;
  }
  set Guidance(value: string) {
    if (this.referenceEquals(this.GuidanceField, value)) {
      this.GuidanceField = value;
      //    this.RaisePropertyChanged("Guidance");
    }
  }

  //
  //Ramya-3383-60058-Differentiating Orderset Item note and Customised Item Note in Resolution grid and Formviewer

  get OrdersetOID(): string {
    return this.OrdersetOIDField;
  }
  set OrdersetOID(value: string) {
    if (this.referenceEquals(this.OrdersetOIDField, value)) {
      this.OrdersetOIDField = value;
      //    this.RaisePropertyChanged("OrdersetOID");
    }
  }

  get AmendedCurrDTTM(): Date {
    return this.AmendedCurrDTTMField;
  }
  set AmendedCurrDTTM(value: Date) {
    if (this.AmendedCurrDTTMField != value) {
      this.AmendedCurrDTTMField = value;
      //    this.RaisePropertyChanged("AmendedCurrDTTM");
    }
  }

  get IsAmendedStopDTTMForAlternateDaysFreq(): boolean {
    return this.IsAmendedStopDTTMForAlternateDaysFreqField;
  }
  set IsAmendedStopDTTMForAlternateDaysFreq(value: boolean) {
    this.IsAmendedStopDTTMForAlternateDaysFreqField = value;
    //    this.RaisePropertyChanged("IsAmendedStopDTTMForAlternateDaysFreq");
  }

  get NextSlotGenerateStartDTTM(): Date {
    return this.NextSlotGenerateStartDTTMField;
  }
  set NextSlotGenerateStartDTTM(value: Date) {
    if (this.NextSlotGenerateStartDTTMField != value) {
      this.NextSlotGenerateStartDTTMField = value;
      //    this.RaisePropertyChanged("NextSlotGenerateStartDTTM");
    }
  }

  //Ramya-7732
  get PatientOID(): number {
    return this.PatientOIDField;
  }
  set PatientOID(value: number) {
    this.PatientOIDField = value;
    //    this.RaisePropertyChanged("PatientOID");
  }

  //Ramya-7732-Prescribe Mode UOM's has to load for MCI parent

  get ComponentOidandType() {
    return this.ComponentOidandTypeField;
  }
  set ComponentOidandType(value) {
    if (this.referenceEquals(this.ComponentOidandTypeField, value)) {
      this.ComponentOidandTypeField = value;
      //    this.RaisePropertyChanged("ComponentOidandType");
    }
  }

  get SupplyByAt(): string {
    return this.SupplyByAtField;
  }
  set SupplyByAt(value: string) {
    if (this.referenceEquals(this.SupplyByAtField, value)) {
      this.SupplyByAtField = value;
      //    this.RaisePropertyChanged("SupplyByAt");
    }
  }

  get LastSupplyDTTM(): Date {
    return this._LastSupplyDTTM;
  }
  set LastSupplyDTTM(value: Date) {
    if (this._LastSupplyDTTM != value) {
      this._LastSupplyDTTM = value;
      // this.RaisePropertyChanged("LastSupplyDTTM");
    }
  }

  get GPErrorCode(): number {
    return this.GPErrorCodeField;
  }
  set GPErrorCode(value: number) {
    if (this.GPErrorCodeField != value) {
      this.GPErrorCodeField = value;
      // this.RaisePropertyChanged("GPErrorCode");
    }
  }

  get IsTransformGPConRequired(): number {
    return this.IsTransformGPConRequiredField;
  }
  set IsTransformGPConRequired(value: number) {
    if (this.IsTransformGPConRequiredField != value) {
      this.IsTransformGPConRequiredField = value;
      // this.RaisePropertyChanged("IsTransformGPConRequired");
    }
  }

  get GPCProductFormOID(): number {
    return this.GPCProductFormOIDField;
  }
  set GPCProductFormOID(value: number) {
    if (this.GPCProductFormOIDField != value) {
      this.GPCProductFormOIDField = value;
      // this.RaisePropertyChanged("GPCProductFormOID");
    }
  }
  //TFS-71610 GPConnect #END
  //Esakki - WSC
  get SupplyByAtMCIFluidParent(): string {
    return this.SupplyByAtMCIFluidParentField;
  }
  set SupplyByAtMCIFluidParent(value: string) {
    if (this.referenceEquals(this.SupplyByAtMCIFluidParentField, value)) {
      this.SupplyByAtMCIFluidParentField = value;
      // this.RaisePropertyChanged("SupplyByAtMCIFluidParent");
    }
  }

  get LastSupplyDTTMMCIFluidParent(): Date {
    return this._LastSupplyDTTMMCIFluidParent;
  }
  set LastSupplyDTTMMCIFluidParent(value: Date) {
    if (this._LastSupplyDTTMMCIFluidParent != value) {
      this._LastSupplyDTTMMCIFluidParent = value;
      // this.RaisePropertyChanged("LastSupplyDTTMMCIFluidParent");
    }
  }

  get SupplyByAtFluidChild(): string {
    return this.SupplyByAtFluidChildField;
  }
  set SupplyByAtFluidChild(value: string) {
    if (this.referenceEquals(this.SupplyByAtFluidChildField, value)) {
      this.SupplyByAtFluidChildField = value;
      // this.RaisePropertyChanged("SupplyByAtFluidChild");
    }
  }

  get LastSupplyDTTMFluidChild(): Date {
    return this._LastSupplyDTTMFluidChild;
  }
  set LastSupplyDTTMFluidChild(value: Date) {
    if (this._LastSupplyDTTMFluidChild != value) {
      this._LastSupplyDTTMFluidChild = value;
      // this.RaisePropertyChanged("LastSupplyDTTMFluidChild");
    }
  }
}
export class DrugProperty {
  private DrugPropertyCodeField = '';
  private VMChildCodeField = '';
  private DrugNameField = '';
  private HighRiskMsgField = '';
  private IdentifyingOIDField = 0;
  private IdentifyingTypeField = '';
  private OccuranceCodeField = '';
  private CompPrescribableItemListOIDField = 0;
  private DrugPropertyToolTipField = '';
  private PrescriptionMCidentifyingtypeField = '';
  private PrescriptionitemoidField = 0;
  private PrescriptionmulticomponentoidField = 0;
  private UniqueMCRowIDField = 0;

  get DrugPropertyCode(): string {
    return this.DrugPropertyCodeField;
  }
  set DrugPropertyCode(value: string) {
    if (JSON.stringify(this.DrugPropertyCodeField) != JSON.stringify(value)) {
      this.DrugPropertyCodeField = value;
      // this.RaisePropertyChanged("DrugPropertyCode");
    }
  }

  get VMChildCode(): string {
    return this.VMChildCodeField;
  }
  set VMChildCode(value: string) {
    if (JSON.stringify(this.VMChildCodeField) != JSON.stringify(value)) {
      this.VMChildCodeField = value;
      // this.RaisePropertyChanged("VMChildCode");
    }
  }

  get DrugName(): string {
    return this.DrugNameField;
  }
  set DrugName(value: string) {
    if (JSON.stringify(this.DrugNameField) != JSON.stringify(value)) {
      this.DrugNameField = value;
      // this.RaisePropertyChanged("DrugName");
    }
  }

  get HighRiskMsg(): string {
    return this.HighRiskMsgField;
  }
  set HighRiskMsg(value: string) {
    if (JSON.stringify(this.HighRiskMsgField) != JSON.stringify(value)) {
      this.HighRiskMsgField = value;
      // this.RaisePropertyChanged("HighRiskMsg");
    }
  }

  get IdentifyingOID(): number {
    return this.IdentifyingOIDField;
  }
  set IdentifyingOID(value: number) {
    if (this.IdentifyingOIDField != value) {
      this.IdentifyingOIDField = value;
      // this.RaisePropertyChanged("IdentifyingOID");
    }
  }

  get IdentifyingType(): string {
    return this.IdentifyingTypeField;
  }
  set IdentifyingType(value: string) {
    if (JSON.stringify(this.IdentifyingTypeField) != JSON.stringify(value)) {
      this.IdentifyingTypeField = value;
      // this.RaisePropertyChanged("IdentifyingType");
    }
  }

  get OccuranceCode(): string {
    return this.OccuranceCodeField;
  }
  set OccuranceCode(value: string) {
    if (JSON.stringify(this.OccuranceCodeField) != JSON.stringify(value)) {
      this.OccuranceCodeField = value;
      // this.RaisePropertyChanged("OccuranceCode");
    }
  }

  get CompPrescribableItemListOID(): number {
    return this.CompPrescribableItemListOIDField;
  }
  set CompPrescribableItemListOID(value: number) {
    if (this.CompPrescribableItemListOIDField != value) {
      this.CompPrescribableItemListOIDField = value;
      // this.RaisePropertyChanged("CompPrescribableItemListOID");
    }
  }

  get DrugPropertyToolTip(): string {
    return this.DrugPropertyToolTipField;
  }
  set DrugPropertyToolTip(value: string) {
    if (
      JSON.stringify(this.DrugPropertyToolTipField) != JSON.stringify(value)
    ) {
      this.DrugPropertyToolTipField = value;
      // this.RaisePropertyChanged("DrugPropertyToolTip");
    }
  }

  get PrescriptionMCidentifyingtype(): string {
    return this.PrescriptionMCidentifyingtypeField;
  }
  set PrescriptionMCidentifyingtype(value: string) {
    if (
      JSON.stringify(this.PrescriptionMCidentifyingtypeField) !=
      JSON.stringify(value)
    ) {
      this.PrescriptionMCidentifyingtypeField = value;
      // this.RaisePropertyChanged("PrescriptionMCidentifyingtype");
    }
  }

  get Prescriptionitemoid(): number {
    return this.PrescriptionitemoidField;
  }
  set Prescriptionitemoid(value: number) {
    if (this.PrescriptionitemoidField != value) {
      this.PrescriptionitemoidField = value;
      // this.RaisePropertyChanged("Prescriptionitemoid");
    }
  }

  get Prescriptionmulticomponentoid(): number {
    return this.PrescriptionmulticomponentoidField;
  }
  set Prescriptionmulticomponentoid(value: number) {
    if (this.PrescriptionmulticomponentoidField != value) {
      this.PrescriptionmulticomponentoidField = value;
      // this.RaisePropertyChanged("Prescriptionmulticomponentoid");
    }
  }

  get UniqueMCRowID(): number {
    return this.UniqueMCRowIDField;
  }
  set UniqueMCRowID(value: number) {
    if (this.UniqueMCRowIDField != value) {
      this.UniqueMCRowIDField = value;
      // this.RaisePropertyChanged("UniqueMCRowID");
    }
  }
}
export class PrescriptionItemView extends CLZOObject {
  private PrescriptionItemOIDField = 0;
  private oTechValidateDetailsField: TechValidatedItem[]  = [];
  private oPrescriptionItemField: PrescriptionItem = new PrescriptionItem();
  private oPresItemBasicPropertiesViewField: PresItemBasicPropertiesView = new PresItemBasicPropertiesView();
  private oPresItemAdditionalPropertiesField: PresItemAdditionalProperties = new PresItemAdditionalProperties();
  private oPrescriptionItemActionField: PrescriptionItemAction = new PrescriptionItemAction();
  private oPrescriptionItemAddnViewField: PrescriptionItemAddnView = new PrescriptionItemAddnView();
  private IPPMCPresctiptionItemField: Array<IPPMCPresctiptionItem> = [];
  // private oPrescriptionItemField=any;
  // private oPresItemBasicPropertiesViewField = '';
  // private oPresItemAdditionalPropertiesField = '';
  // private oPrescriptionItemActionField = '';
  // private oPrescriptionItemAddnViewField = '';
  // private IPPMCPresctiptionItemField = '';

  private SupplyExistsForMCICompField = false;

  get PrescriptionItemOID(): number {
    return this.PrescriptionItemOIDField;
  }
  set PrescriptionItemOID(value: number) {
    if (this.PrescriptionItemOIDField != value) {
      this.PrescriptionItemOIDField = value;
      // this.RaisePropertyChanged("PrescriptionItemOID");
    }
  }

  get oTechValidateDetails(): TechValidatedItem[] {
    return this.oTechValidateDetailsField;
  }
  set oTechValidateDetails(value: TechValidatedItem[]) {
    if (
      JSON.stringify(this.oTechValidateDetailsField) != JSON.stringify(value)
    ) {
      this.oTechValidateDetailsField = value;
      // this.RaisePropertyChanged("oTechValidateDetails");
    }
  }

  get oPrescriptionItem(): PrescriptionItem {
    return this.oPrescriptionItemField;
  }
  set oPrescriptionItem(value: PrescriptionItem) {
    if (JSON.stringify(this.oPrescriptionItemField) != JSON.stringify(value)) {
      this.oPrescriptionItemField = value;
      // this.RaisePropertyChanged("oPrescriptionItem");
    }
  }

  get oPresItemBasicPropertiesView(): PresItemBasicPropertiesView {
    return this.oPresItemBasicPropertiesViewField;
  }
  set oPresItemBasicPropertiesView(value) {
    if (
      JSON.stringify(this.oPresItemBasicPropertiesViewField) !=
      JSON.stringify(value)
    ) {
      this.oPresItemBasicPropertiesViewField = value;
      // this.RaisePropertyChanged("oPresItemBasicPropertiesView");
    }
  }

  get oPresItemAdditionalProperties() {
    return this.oPresItemAdditionalPropertiesField;
  }
  set oPresItemAdditionalProperties(value) {
    if (
      JSON.stringify(this.oPresItemAdditionalPropertiesField) !=
      JSON.stringify(value)
    ) {
      this.oPresItemAdditionalPropertiesField = value;
      // this.RaisePropertyChanged("oPresItemAdditionalProperties");
    }
  }

  get oPrescriptionItemAction() {
    return this.oPrescriptionItemActionField;
  }
  set oPrescriptionItemAction(value) {
    if (
      JSON.stringify(this.oPrescriptionItemActionField) != JSON.stringify(value)
    ) {
      this.oPrescriptionItemActionField = value;
      // this.RaisePropertyChanged("oPrescriptionItemAction");
    }
  }

  get oPrescriptionItemAddnView() {
    return this.oPrescriptionItemAddnViewField;
  }
  set oPrescriptionItemAddnView(value) {
    if (
      JSON.stringify(this.oPrescriptionItemAddnViewField) !=
      JSON.stringify(value)
    ) {
      this.oPrescriptionItemAddnViewField = value;
      // this.RaisePropertyChanged("oPrescriptionItemAddnView");
    }
  }

  //Abhishek TFS-7732

  get IPPMCPresctiptionItem() {
    return this.IPPMCPresctiptionItemField;
  }
  set IPPMCPresctiptionItem(value) {
    if (
      JSON.stringify(this.IPPMCPresctiptionItemField) != JSON.stringify(value)
    ) {
      this.IPPMCPresctiptionItemField = value;
      // this.RaisePropertyChanged("IPPMCPresctiptionItem");
    }
  }

  //TFS-7732 Sprint 2
  get SupplyExistsForMCIComp(): boolean {
    return this.SupplyExistsForMCICompField;
  }
  set SupplyExistsForMCIComp(value: boolean) {
    if (this.SupplyExistsForMCICompField != value) {
      this.SupplyExistsForMCICompField = value;
      // this.RaisePropertyChanged("SupplyExistsForMCIComp");
    }
  }
}
export class PresItemBasicProperties extends PresItemCommonProperties {
  private defaultchkField = '';
  private DirectionField: ObjectInfo = new ObjectInfo();
  private DurationField: MeasurableObject = new MeasurableObject();
  private SiteField: ObjectInfo = new ObjectInfo();
  private QuantityField: Quantity = new Quantity();
  private DoseField: PrescriptionItemDose = new PrescriptionItemDose();
  private FrequencyDetailsField: FrequencyDetails = new FrequencyDetails();
  private PatientProblemField: Indication[] = [];
  private IsPresItemLevelDispenseField = '';
  private OrderSetField: ObjectInfo = new ObjectInfo();
  private IsReviewAlertShownField = '';
  private orderSetSeqIdField = '';
  private ExistsOnAdmissionField = '';
  //mods for lzo-160054
  private IsAdministeredInAdvanceField = false;
  private LastAdministeredDTTMField: Date = new Date();
  //mods end
  private IsClinicalEncounterField = false;
  //Epic 3383 - To show PrescribingNote Icon and Text in FormViewer (Amend) and Secondary Window PrescribingOptions - Divya
  private PrescribingNoteField = '';
  //2.16 Epic 3383 US 14990 Start
  private HasPermissionField = false;
  //2.16 Epic 3383 US 14990 End
  //Ramya- 7732 TFS 69883,69885
  private RHSSupplyInstrIconTooltipField = false;
  private TopMostAmendedPrescriptionItemOIDField = 0;
  private SeqInfusionStatusField = '';
  //Esakki - WSC
  private CurrentDispenseStatusField = '';
  //kanimozhi Authorise CR --Start
  private IsAuthoriseTextField = '';
  //kanimozhi Authorise CR --End

  get defaultchk(): string {
    return this.defaultchkField;
  }
  set defaultchk(value: string) {
    if (this.referenceEquals(this.defaultchkField, value)) {
      this.defaultchkField = value;
      // this.RaisePropertyChanged("defaultchk");
    }
  }

  get Direction(): ObjectInfo {
    return this.DirectionField;
  }
  set Direction(value: ObjectInfo) {
    if (this.referenceEquals(this.DirectionField, value)) {
      this.DirectionField = value;
      // this.RaisePropertyChanged("Direction");
    }
  }

  get Duration(): MeasurableObject {
    return this.DurationField;
  }
  set Duration(value: MeasurableObject) {
    if (this.referenceEquals(this.DurationField, value)) {
      this.DurationField = value;
      // this.RaisePropertyChanged("Duration");
    }
  }

  get Site(): ObjectInfo {
    return this.SiteField;
  }
  set Site(value: ObjectInfo) {
    if (this.referenceEquals(this.SiteField, value)) {
      this.SiteField = value;
      // this.RaisePropertyChanged("Site");
    }
  }

  get Quantity(): Quantity {
    return this.QuantityField;
  }
  set Quantity(value: Quantity) {
    if (this.referenceEquals(this.QuantityField, value)) {
      this.QuantityField = value;
      // this.RaisePropertyChanged("Quantity");
    }
  }

  get Dose(): PrescriptionItemDose {
    return this.DoseField;
  }
  set Dose(value: PrescriptionItemDose) {
    if (this.referenceEquals(this.DoseField, value)) {
      this.DoseField = value;
      // this.RaisePropertyChanged("Dose");
    }
  }

  get FrequencyDetails(): FrequencyDetails {
    return this.FrequencyDetailsField;
  }
  set FrequencyDetails(value: FrequencyDetails) {
    if (this.referenceEquals(this.FrequencyDetailsField, value)) {
      this.FrequencyDetailsField = value;
      // this.RaisePropertyChanged("FrequencyDetails");
    }
  }

  get PatientProblem(): Indication[] {
    return this.PatientProblemField;
  }
  set PatientProblem(value: Indication[]) {
    if (this.referenceEquals(this.PatientProblemField, value)) {
      this.PatientProblemField = value;
      // this.RaisePropertyChanged("PatientProblem");
    }
  }

  get IsPresItemLevelDispense(): string {
    return this.IsPresItemLevelDispenseField;
  }
  set IsPresItemLevelDispense(value: string) {
    if (this.IsPresItemLevelDispenseField != value) {
      this.IsPresItemLevelDispenseField = value;
      // this.RaisePropertyChanged("IsPresItemLevelDispense");
    }
  }

  get OrderSet(): ObjectInfo {
    return this.OrderSetField;
  }
  set OrderSet(value: ObjectInfo) {
    if (this.referenceEquals(this.OrderSetField, value)) {
      this.OrderSetField = value;
      // this.RaisePropertyChanged("OrderSet");
    }
  }

  get IsReviewAlertShown(): string {
    return this.IsReviewAlertShownField;
  }
  set IsReviewAlertShown(value: string) {
    if (this.referenceEquals(this.IsReviewAlertShownField, value)) {
      this.IsReviewAlertShownField = value;
      // this.RaisePropertyChanged("IsReviewAlertShown");
    }
  }

  // get OrderSetSeqId(){
  //     return this.orderSetSeqIdField;
  // }
  // set OrderSetSeqId(value) {
  //     this.orderSetSeqIdField = value;
  //     // this.RaisePropertyChanged("OrderSetSeqId");
  // }

  get ExistsOnAdmission() {
    return this.ExistsOnAdmissionField;
  }
  set ExistsOnAdmission(value) {
    if (this.ExistsOnAdmissionField != value) {
      this.ExistsOnAdmissionField = value;
      // this.RaisePropertyChanged("ExistsOnAdmission");
    }
  }

  get LastAdministeredDTTM() {
    return this.LastAdministeredDTTMField;
  }
  set LastAdministeredDTTM(value) {
    if (this.LastAdministeredDTTMField != value) {
      this.LastAdministeredDTTMField = value;
      // this.RaisePropertyChanged("LastAdministeredDTTM");
    }
  }

  get IsAdministeredInAdvance(): boolean {
    return this.IsAdministeredInAdvanceField;
  }
  set IsAdministeredInAdvance(value) {
    if (this.IsAdministeredInAdvanceField != value) {
      this.IsAdministeredInAdvanceField = value;
      // this.RaisePropertyChanged("IsAdministeredinAdvance");
    }
  }

  get IsClinicalEncounter(): boolean {
    return this.IsClinicalEncounterField;
  }
  set IsClinicalEncounter(value: boolean) {
    if (this.IsClinicalEncounterField != value) {
      this.IsClinicalEncounterField = value;
      // this.RaisePropertyChanged("IsClinicalEncounter");
    }
  }

  get PrescribingNote(): string {
    return this.PrescribingNoteField;
  }
  set PrescribingNote(value: string) {
    if (this.referenceEquals(this.PrescribingNoteField, value)) {
      this.PrescribingNoteField = value;
      // this.RaisePropertyChanged("PrescribingNote");
    }
  }

  get HasPermission(): boolean {
    return this.HasPermissionField;
  }
  set HasPermission(value: boolean) {
    if (this.HasPermissionField != value) {
      this.HasPermissionField = value;
      // this.RaisePropertyChanged("HasPermission");
    }
  }

  get RHSSupplyInstrIconTooltip(): boolean {
    return this.RHSSupplyInstrIconTooltipField;
  }
  set RHSSupplyInstrIconTooltip(value: boolean) {
    if (this.RHSSupplyInstrIconTooltipField != value) {
      this.RHSSupplyInstrIconTooltipField = value;
      // this.RaisePropertyChanged("RHSSupplyInstrIconTooltip");
    }
  }

  get TopMostAmendedPrescriptionItemOID(): number {
    return this.TopMostAmendedPrescriptionItemOIDField;
  }
  set TopMostAmendedPrescriptionItemOID(value: number) {
    if (this.TopMostAmendedPrescriptionItemOIDField != value) {
      this.TopMostAmendedPrescriptionItemOIDField = value;
      // this.RaisePropertyChanged("TopMostAmendedPrescriptionItemOID");
    }
  }

  get SeqInfusionStatus(): string {
    return this.SeqInfusionStatusField;
  }
  set SeqInfusionStatus(value: string) {
    this.SeqInfusionStatusField = value;
    // this.RaisePropertyChanged("SeqInfusionStatus");
  }

  get CurrentDispenseStatus(): string {
    return this.CurrentDispenseStatusField;
  }
  set CurrentDispenseStatus(value: string) {
    this.CurrentDispenseStatusField = value;
    // this.RaisePropertyChanged("CurrentDispenseStatus");
  }

  private isAlreadyClinicallyVerifiedField:any;

  get IsAlreadyClinicallyVerified() {
    return this.isAlreadyClinicallyVerifiedField;
  }
  set IsAlreadyClinicallyVerified(value) {
    this.isAlreadyClinicallyVerifiedField = value;
    // this.RaisePropertyChanged("IsAlreadyClinicallyVerified");
  }

  get IsAuthoriseText(): string {
    return this.IsAuthoriseTextField;
  }
  set IsAuthoriseText(value) {
    if (this.referenceEquals(this.IsAuthoriseTextField, value)) {
      this.IsAuthoriseTextField = value;
      // this.RaisePropertyChanged("IsAuthoriseText");
    }
  }
}

export class ObjectInfo extends CLZOObject {
  private OIDField = 0;
  private NameField = '';
  private CodeField = '';
  private RoleProfileOIDField = 0;
  get OID(): number {
    return this.OIDField;
  }
  set OID(value: number) {
    if (this.OIDField != value) {
      this.OIDField = value;
      // this.RaisePropertyChanged("OID");
    }
  }

  get Name(): string {
    return this.NameField;
  }
  set Name(value: string) {
    if (JSON.stringify(this.NameField) != JSON.stringify(value)) {
      this.NameField = value;
      // this.RaisePropertyChanged("Name");
    }
  }

  get Code(): string {
    return this.CodeField;
  }
  set Code(value: string) {
    if (JSON.stringify(this.CodeField) != JSON.stringify(value)) {
      this.CodeField = value;
      // this.RaisePropertyChanged("Code");
    }
  }

  get RoleProfileOID(): number {
    return this.RoleProfileOIDField;
  }
  set RoleProfileOID(value: number) {
    if ((this.RoleProfileOIDField != value) != true) {
      this.RoleProfileOIDField = value;
      // this.RaisePropertyChanged("RoleProfileOID");
    }
  }
}
export class PrescriptionItemResponse extends CLZOObject {
  private PrescriptionItemOIDField = 0;
  private IsControlledDrugField = '';
  private PrescriptionItemNameField = '';
  private OIDField = 0;
  private StatusField = '';

  get PrescriptionItemOID(): number {
    return this.PrescriptionItemOIDField;
  }
  set PrescriptionItemOID(value: number) {
    if (this.PrescriptionItemOIDField != value) {
      this.PrescriptionItemOIDField = value;
      // this.RaisePropertyChanged("PrescriptionItemOID");
    }
  }

  get IsControlledDrug(): string {
    return this.IsControlledDrugField;
  }
  set IsControlledDrug(value: string) {
    if (this.IsControlledDrugField != value) {
      this.IsControlledDrugField = value;
      // this.RaisePropertyChanged("IsControlledDrug");`
    }
  }

  get PrescriptionItemName(): string {
    return this.PrescriptionItemNameField;
  }
  set PrescriptionItemName(value: string) {
    if (
      JSON.stringify(this.PrescriptionItemNameField) != JSON.stringify(value)
    ) {
      this.PrescriptionItemNameField = value;
      // this.RaisePropertyChanged("PrescriptionItemName");
    }
  }

  get OID(): number {
    return this.OIDField;
  }
  set OID(value: number) {
    if (this.OIDField != value) {
      this.OIDField = value;
      // this.RaisePropertyChanged("OID");
    }
  }

  get Status(): string {
    return this.StatusField;
  }
  set Status(value: string) {
    if (JSON.stringify(this.StatusField) != JSON.stringify(value)) {
      this.StatusField = value;
      // this.RaisePropertyChanged("Status");
    }
  }
}

export class TechValidatedItem extends CLZOObject {
  private DrugItemField:any;

  private QuantityPerDoseField = '';

  private QuantityPerDoseUOMField:any;

  private TotalQuantityField = '';

  private TotalQuantityUOMField:any;

  private SupplyInstructionField: ObjectInfo[] = [];

  private DispensingInstructionField: ObjectInfo[] = [];

  private ClinicalVerifyCommentsField = '';

  private PrescriptionItemTechOIDField = 0;

  private IsTechnicalvalidateField = '';

  private IdentifyingDomainField = '';

  private OtherDispensingInstructionField = '';
  private IsDoseCombinationsDefinedField = 0;

  private IsSupplyRequestedField = '';

  private LocationOidField = 0;

  private ServiceOidField = 0;

  private ReqCACodeField = '';

  //Abhishek TFS-7732
  private SupplyCommentsField = '';

  private FluidPrescribableItemListOIDField = 0;
  //Venkat ReqIcon - 7732
  private LastReqUrgencyField = '';
  private LastReqCommentsField = '';
  private LastRequestedByField = '';
  private LastRequestedDateTimeField: Date = new Date();
  private ReqIconShowField = false;
  private PrescriptionMultiComponentOIDField = 0;
  //Jothi
  private dispenseStatusField = '';

  private pIDRequestIdentifyingOIDField = 0;

  private pIDRequestIdentifyingTypeField = '';
  //wardstock TFS 1381 NextSupplyDate store and fetch sasi
  private NextSupplyDttmField: Date = new Date();
  private isNextSupplyUpdateField = false;
  private SupplyStatusField = '';
  public IsWardStock = false;

  get DrugItem() {
    return this.DrugItemField;
  }
  set DrugItem(value) {
    if (JSON.stringify(this.DrugItemField) != JSON.stringify(value)) {
      this.DrugItemField = value;
      // this.RaisePropertyChanged("DrugItem");
    }
  }

  get QuantityPerDose() {
    return this.QuantityPerDoseField;
  }
  set QuantityPerDose(value) {
    if (JSON.stringify(this.QuantityPerDoseField) != JSON.stringify(value)) {
      this.QuantityPerDoseField = value;
      // this.RaisePropertyChanged("QuantityPerDose");
    }
  }

  get QuantityPerDoseUOM() {
    return this.QuantityPerDoseUOMField;
  }
  set QuantityPerDoseUOM(value) {
    if (JSON.stringify(this.QuantityPerDoseUOMField) != JSON.stringify(value)) {
      this.QuantityPerDoseUOMField = value;
      // this.RaisePropertyChanged("QuantityPerDoseUOM");
    }
  }

  get TotalQuantity() {
    return this.TotalQuantityField;
  }
  set TotalQuantity(value) {
    if (JSON.stringify(this.TotalQuantityField) != JSON.stringify(value)) {
      this.TotalQuantityField = value;
      // this.RaisePropertyChanged("TotalQuantity");
    }
  }

  get TotalQuantityUOM() {
    return this.TotalQuantityUOMField;
  }
  set TotalQuantityUOM(value) {
    if (JSON.stringify(this.TotalQuantityUOMField) != JSON.stringify(value)) {
      this.TotalQuantityUOMField = value;
      // this.RaisePropertyChanged("TotalQuantityUOM");
    }
  }

  get SupplyInstruction() {
    return this.SupplyInstructionField;
  }
  set SupplyInstruction(value) {
    if (JSON.stringify(this.SupplyInstructionField) != JSON.stringify(value)) {
      this.SupplyInstructionField = value;
      // this.RaisePropertyChanged("SupplyInstruction");
    }
  }

  get DispensingInstruction() {
    return this.DispensingInstructionField;
  }
  set DispensingInstruction(value) {
    if (
      JSON.stringify(this.DispensingInstructionField) != JSON.stringify(value)
    ) {
      this.DispensingInstructionField = value;
      // this.RaisePropertyChanged("DispensingInstruction");
    }
  }

  get ClinicalVerifyComments(): string {
    return this.ClinicalVerifyCommentsField;
  }
  set ClinicalVerifyComments(value: string) {
    if (
      JSON.stringify(this.ClinicalVerifyCommentsField) != JSON.stringify(value)
    ) {
      this.ClinicalVerifyCommentsField = value;
      // this.RaisePropertyChanged("ClinicalVerifyComments");
    }
  }

  get PrescriptionItemTechOID(): number {
    return this.PrescriptionItemTechOIDField;
  }
  set PrescriptionItemTechOID(value: number) {
    if (this.PrescriptionItemTechOIDField != value) {
      this.PrescriptionItemTechOIDField = value;
      // this.RaisePropertyChanged("PrescriptionItemTechOID");
    }
  }

  get IsTechnicalvalidate(): string {
    return this.IsTechnicalvalidateField;
  }
  set IsTechnicalvalidate(value: string) {
    if (
      JSON.stringify(this.IsTechnicalvalidateField) != JSON.stringify(value)
    ) {
      this.IsTechnicalvalidateField = value;
      // this.RaisePropertyChanged("IsTechnicalvalidate");
    }
  }

  get IdentifyingDomain(): string {
    return this.IdentifyingDomainField;
  }
  set IdentifyingDomain(value: string) {
    if (JSON.stringify(this.IdentifyingDomainField) != JSON.stringify(value)) {
      this.IdentifyingDomainField = value;
      // this.RaisePropertyChanged("IdentifyingDomain");
    }
  }

  get OtherDispensingInstruction(): string {
    return this.OtherDispensingInstructionField;
  }
  set OtherDispensingInstruction(value: string) {
    if (
      JSON.stringify(this.OtherDispensingInstructionField) !=
      JSON.stringify(value)
    ) {
      this.OtherDispensingInstructionField = value;
      // this.RaisePropertyChanged("OtherDispensingInstruction");
    }
  }

  get IsDoseCombinationsDefined(): number {
    return this.IsDoseCombinationsDefinedField;
  }
  set IsDoseCombinationsDefined(value: number) {
    if (this.IsDoseCombinationsDefinedField != value) {
      this.IsDoseCombinationsDefinedField = value;
      // this.RaisePropertyChanged("IsDoseCombinationsDefined");
    }
  }

  //Esakki.122960

  get IsSupplyRequested(): string {
    return this.IsSupplyRequestedField;
  }
  set IsSupplyRequested(value: string) {
    if (this.IsSupplyRequestedField != value) {
      this.IsSupplyRequestedField = value;
      // this.RaisePropertyChanged("IsSupplyRequested");
    }
  }

  get LocationOid(): number {
    return this.LocationOidField;
  }
  set LocationOid(value: number) {
    if (this.LocationOidField != value) {
      this.LocationOidField = value;
      // this.RaisePropertyChanged("LocationOid");
    }
  }

  get ServiceOid(): number {
    return this.ServiceOidField;
  }
  set ServiceOid(value: number) {
    if (this.ServiceOidField != value) {
      this.ServiceOidField = value;
      // this.RaisePropertyChanged("ServiceOid");
    }
  }

  get ReqCACode(): string {
    return this.ReqCACodeField;
  }
  set ReqCACode(value: string) {
    if (JSON.stringify(this.ReqCACodeField) != JSON.stringify(value)) {
      this.ReqCACodeField = value;
      // this.RaisePropertyChanged("ReqCACode");
    }
  }

  //Abhishek TFS-7732

  get SupplyComments(): string {
    return this.SupplyCommentsField;
  }
  set SupplyComments(value: string) {
    if (JSON.stringify(this.SupplyCommentsField) != JSON.stringify(value)) {
      this.SupplyCommentsField = value;
      // this.RaisePropertyChanged("SupplyComments");
    }
  }

  get FluidPrescribableItemListOID(): number {
    return this.FluidPrescribableItemListOIDField;
  }
  set FluidPrescribableItemListOID(value: number) {
    if (this.FluidPrescribableItemListOIDField != value) {
      this.FluidPrescribableItemListOIDField = value;
      // this.RaisePropertyChanged("FluidPrescribableItemListOID");
    }
  }

  //Venkat ReqIcon - 7732

  get LastReqUrgency(): string {
    return this.LastReqUrgencyField;
  }
  set LastReqUrgency(value: string) {
    if (JSON.stringify(this.LastReqUrgencyField) != JSON.stringify(value)) {
      this.LastReqUrgencyField = value;
      // this.RaisePropertyChanged("LastReqUrgency");
    }
  }

  get LastReqComments(): string {
    return this.LastReqCommentsField;
  }
  set LastReqComments(value: string) {
    if (JSON.stringify(this.LastReqCommentsField) != JSON.stringify(value)) {
      this.LastReqCommentsField = value;
      // this.RaisePropertyChanged("LastReqComments");
    }
  }

  get LastRequestedBy(): string {
    return this.LastRequestedByField;
  }
  set LastRequestedBy(value: string) {
    if (JSON.stringify(this.LastRequestedByField) != JSON.stringify(value)) {
      this.LastRequestedByField = value;
      // this.RaisePropertyChanged("LastRequestedBy");
    }
  }

  get LastRequestedDateTime(): Date {
    return this.LastRequestedDateTimeField;
  }
  set LastRequestedDateTime(value: Date) {
    if (this.LastRequestedDateTimeField != value) {
      this.LastRequestedDateTimeField = value;
      // this.RaisePropertyChanged("LastRequestedDateTime");
    }
  }

  get ReqIconShow(): boolean {
    return this.ReqIconShowField;
  }
  set ReqIconShow(value: boolean) {
    if (this.ReqIconShowField != value) {
      this.ReqIconShowField = value;
      // this.RaisePropertyChanged("ReqIconShow");
    }
  }

  get PrescriptionMultiComponentOID(): number {
    return this.PrescriptionMultiComponentOIDField;
  }
  set PrescriptionMultiComponentOID(value: number) {
    if (this.PrescriptionMultiComponentOIDField != value) {
      this.PrescriptionMultiComponentOIDField = value;
      // this.RaisePropertyChanged("PrescriptionMultiComponentOID");
    }
  }

  //Jothi

  get DispenseStatus(): string {
    return this.dispenseStatusField;
  }
  set DispenseStatus(value: string) {
    this.dispenseStatusField = value;
    // this.RaisePropertyChanged("DispenseStatus");
  }
  get PIDRequestIdentifyingOID(): number {
    return this.pIDRequestIdentifyingOIDField;
  }
  set PIDRequestIdentifyingOID(value: number) {
    this.pIDRequestIdentifyingOIDField = value;
    //  this.RaisePropertyChanged("PIDRequestIdentifyingOID");
  }
  get PIDRequestIdentifyingType(): string {
    return this.pIDRequestIdentifyingTypeField;
  }
  set PIDRequestIdentifyingType(value: string) {
    this.pIDRequestIdentifyingTypeField = value;
    //  this.RaisePropertyChanged("PIDRequestIdentifyingType");
  }

  //wardstock TFS 1381 NextSupplyDate store and fetch sasi

  get NextSupplyDttm(): Date {
    return this.NextSupplyDttmField;
  }
  set NextSupplyDttm(value: Date) {
    if (this.NextSupplyDttmField != value) {
      this.NextSupplyDttmField = value;
      // this.RaisePropertyChanged("NextSupplyDttm");
    }
  }

  get isNextSupplyUpdate(): boolean {
    return this.isNextSupplyUpdateField;
  }
  set isNextSupplyUpdate(value: boolean) {
    if (this.isNextSupplyUpdateField != value) {
      this.isNextSupplyUpdateField = value;
      //    this.RaisePropertyChanged("isNextSupplyUpdate");
    }
  }

  get SupplyStatus(): string {
    return this.SupplyStatusField;
  }
  set SupplyStatus(value: string) {
    this.SupplyStatusField = value;
    // this.RaisePropertyChanged("SupplyStatus");
  }
}

export class PrescriptionItemBasicData extends DrugItemBasicData {
  HealthOrganisationField:any;
  PrescriptionBasicDataField:any;

  private SNOMEDCodeField = ' ';

  private OIDField = 0;

  private PrescriptionItemNumberField = ' ';

  private IsAdministeredField = ' ';

  private StartDTTMField = new Date();

  private PartialStartDTTMField = ' ';

  private EndDTTMField = new Date();

  private PrescriptionItemStatusField = ' ';

  private StatusModifedDTTMField = new Date();

  private IsControlledDrugField = ' ';

  get SNOMEDCode(): string {
    return this.SNOMEDCodeField;
  }
  set SNOMEDCode(value: string) {
    if (JSON.stringify(this.SNOMEDCodeField) != JSON.stringify(value)) {
      /* this.RaisePropertyChanged("SNOMEDCode"); */
    }
  }

  get OID(): number {
    return this.OIDField;
  }
  set OID(value: number) {
    if (this.OIDField != value) {
      this.OIDField = value;
      /* this.RaisePropertyChanged("OID"); */
    }
  }

  get PrescriptionItemNumber(): string {
    return this.PrescriptionItemNumberField;
  }
  set PrescriptionItemNumber(value: string) {
    if (
      JSON.stringify(this.PrescriptionItemNumberField) != JSON.stringify(value)
    ) {
      this.PrescriptionItemNumberField = value;
      /* this.RaisePropertyChanged("PrescriptionItemNumber"); */
    }
  }

  get IsAdministered(): string {
    return this.IsAdministeredField;
  }
  set IsAdministered(value: string) {
    if (JSON.stringify(this.IsAdministeredField) != JSON.stringify(value)) {
      this.IsAdministeredField = value;
      /* this.RaisePropertyChanged("IsAdministered"); */
    }
  }

  get StartDTTM(): Date {
    return this.StartDTTMField;
  }
  set StartDTTM(value: Date) {
    if (this.StartDTTMField != value) {
      this.StartDTTMField = value;
      /* this.RaisePropertyChanged("StartDTTM");
       */
    }
  }

  get PartialStartDTTM(): string {
    return this.PartialStartDTTMField;
  }
  set PartialStartDTTM(value: string) {
    if (JSON.stringify(this.PartialStartDTTMField) != JSON.stringify(value)) {
      this.PartialStartDTTMField = value;
      /* this.RaisePropertyChanged("PartialStartDTTM"); */
    }
  }

  get EndDTTM(): Date {
    return this.EndDTTMField;
  }
  set EndDTTM(value: Date) {
    if (this.EndDTTMField != value) {
      this.EndDTTMField = value;
      /* this.RaisePropertyChanged("EndDTTM"); */
    }
  }

  get PrescriptionItemStatus(): string {
    return this.PrescriptionItemStatusField;
  }
  set PrescriptionItemStatus(value: string) {
    if (
      JSON.stringify(this.PrescriptionItemStatusField) != JSON.stringify(value)
    ) {
      this.PrescriptionItemStatusField = value;
      /*  this.RaisePropertyChanged("PrescriptionItemStatus"); */
    }
  }

  get StatusModifedDTTM(): Date {
    return this.StatusModifedDTTMField;
  }
  set StatusModifedDTTM(value: Date) {
    if (this.StatusModifedDTTMField != value) {
      this.StatusModifedDTTMField = value;
      JSON.stringify(this.StatusModifedDTTMField) != JSON.stringify(value);
      /* this.RaisePropertyChanged("StatusModifedDTTM"); */
    }
  }

  /*  public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo HealthOrganisation */
  get HealthOrganisation() {
    return this.HealthOrganisationField;
  }
  set HealthOrganisation(value: any) {
    if (JSON.stringify(this.HealthOrganisationField) != JSON.stringify(value)) {
      this.HealthOrganisationField = value;
      /* this.RaisePropertyChanged("HealthOrganisation"); */
    }
  }

  /* public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.Prescription PrescriptionBasicData */
  get PrescriptionBasicData() {
    return this.PrescriptionBasicDataField;
  }
  set PrescriptionBasicData(value: any) {
    if (
      JSON.stringify(this.PrescriptionBasicDataField) != JSON.stringify(value)
    ) {
      this.PrescriptionBasicDataField = value;
      /* this.RaisePropertyChanged("PrescriptionBasicData"); */
    }
  }

  get IsControlledDrug(): string {
    return this.IsControlledDrugField;
  }
  set IsControlledDrug(value: string) {
    if (JSON.stringify(this.IsControlledDrugField) != JSON.stringify(value)) {
      this.IsControlledDrugField = value;
      /* this.RaisePropertyChanged("IsControlledDrug"); */
    }
  }
}

export class PresItemBasicPropertiesView extends PresItemCommonProperties {
  ProblemField:ArrayOfString = new ArrayOfString();
  PrescriptionItemField:ObjectInfo = new ObjectInfo();
  FormViewParametersField:PrescriptionItemFormViewParameters= new PrescriptionItemFormViewParameters();
  OrderSetField:ObjectInfo= new ObjectInfo();
  DurationInfoField:MeasurableObject= new MeasurableObject();

  private DoseField = ' ';

  private DoseTypeField = ' ';

  private FrequencyField = ' ';

  private StartDateField = new Date();

  private DurationField = ' ';

  private EndDateField = new Date();

  private DirectionField = ' ';

  private SiteField = ' ';

  private QuantityField = ' ';

  /* private iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ArrayOfString ProblemField;

    private iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo PrescriptionItemField; */

  private DrugStatusField = ' ';

  private UniqueRowIDField = ' ';

  private IsCurrentMedicationField = ' ';

  private MedClrkSourceField = ' ';

  private IsDeactivatedField = ' ';

  private QuantityUOMNameField = ' ';

  private IsPresItemLevelDispenseField = ' ';

  private DispenseInstructionCodeField = ' ';

  private SupplyInstructionCodeField = ' ';

  private PrepStatusCodeField = ' '; //mcca

  private MCIItemDisplayField = ' '; //mcca
  private IsSupplyRequestedField = ' '; //wardStock

  private IsWardStockField = true; //wardStock

  private RequisitionCACodeField = ' '; //wardStock
  /* private iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.PrescriptionItemFormViewParameters FormViewParametersField; //infusion phase 2
    private iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo OrderSetField;
     */
  private PRNInstructionValueField = ' ';
  //
  private RequestUrgencyField = ' ';
  private RequestUrgencyOrderField = 0;
  private RequestedDTTMField = new Date();
  private RequestedCommentsField = ' ';
  private RequestedByField = ' ';
  private SteppedDoseAdminTimesField = ' ';
  private IsinDefiniteOmitField = true;
  private IsinDefiniteOmitDTTMField = new Date();
  private OmitCommentsField = ' ';
  private OmittedByField = ' ';
  //2.16 Epic 3383 US 14990 Start
  private IsAllowedField = true;
  //2.16 Epic 3383 US 14990 End
  private ExistsOnAdmissionField = ' ';

  //Abhishek TFS-7732
  private FluidPrescribableItemListOIDField = 0;
  //TFS 73214
  private PrescriptionMulticomponentOIDField = 0;
  //
  //Epic 3383 - To show PrescribingNote Icon and Text in Search Reuslts and Secondary Window ProductOptions - Divya
  private PrescribingNoteField = ' ';

  private DoseTypeValueField = ' ';
  //Esakki - WSC
  private IsWardStockFluidField = true;
  //dosecalc - sravani
  private IsDoseCalcExistField = true;
  //DC-Bala
  private DCCalDTTMField = new Date();
  //BNS DC
  private DCHeightRecordedDTTMField = new Date();
  private DCWeightRecordedDTTMField = new Date();

  get Dose(): string {
    return this.DoseField;
  }
  set Dose(value: string) {
    if (JSON.stringify(this.DoseField) != JSON.stringify(value)) {
      this.DoseField = value;

      /* this.RaisePropertyChanged("Dose"); */
    }
  }

  get DoseType(): string {
    return this.DoseTypeField;
  }
  set DoseType(value: string) {
    if (JSON.stringify(this.DoseTypeField) != JSON.stringify(value)) {
      this.DoseTypeField = value;

      /* this.RaisePropertyChanged("DoseType"); */
    }
  }

  get Frequency(): string {
    return this.FrequencyField;
  }
  set Frequency(value: string) {
    if (JSON.stringify(this.FrequencyField) != JSON.stringify(value)) {
      this.FrequencyField = value;

      /* this.RaisePropertyChanged("Frequency"); */
    }
  }

  get StartDate(): Date {
    return this.StartDateField;
  }
  set StartDate(value: Date) {
    if (this.StartDateField != value) {
      this.StartDateField = value;

      /* this.RaisePropertyChanged("StartDate"); */
    }
  }

  get Duration(): string {
    return this.DurationField;
  }
  set Duration(value: string) {
    if (JSON.stringify(this.DurationField) != JSON.stringify(value)) {
      this.DurationField = value;

      /* this.RaisePropertyChanged("Duration"); */
    }
  }

  get EndDate(): Date {
    return this.EndDateField;
  }
  set EndDate(value: Date) {
    if (this.EndDateField != value) {
      this.EndDateField = value;

      /* this.RaisePropertyChanged("EndDate"); */
    }
  }

  get Direction(): string {
    return this.DirectionField;
  }
  set Direction(value: string) {
    if (JSON.stringify(this.DirectionField) != JSON.stringify(value)) {
      this.DirectionField = value;

      /* this.RaisePropertyChanged("Direction"); */
    }
  }

  get Site(): string {
    return this.SiteField;
  }
  set Site(value: string) {
    if (JSON.stringify(this.SiteField) != JSON.stringify(value)) {
      this.SiteField = value;

      /* this.RaisePropertyChanged("Site"); */
    }
  }

  get Quantity(): string {
    return this.QuantityField;
  }
  set Quantity(value: string) {
    if (JSON.stringify(this.QuantityField) != JSON.stringify(value)) {
      this.QuantityField = value;

      /* this.RaisePropertyChanged("Quantity"); */
    }
  }

  /* public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ArrayOfString Problem
   */
  get Problem() {
    return this.ProblemField;
  }
  set Problem(value: any) {
    if (JSON.stringify(this.ProblemField) != JSON.stringify(value)) {
      this.ProblemField = value;

      /* this.RaisePropertyChanged("Problem"); */
    }
  }

  /*   public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo PrescriptionItem */
  get PrescriptionItem() {
    return this.PrescriptionItemField;
  }
  set PrescriptionItem(value: any) {
    if (JSON.stringify(this.PrescriptionItemField) != JSON.stringify(value)) {
      this.PrescriptionItemField = value;

      /* this.RaisePropertyChanged("PrescriptionItem"); */
    }
  }

  get DrugStatus(): string {
    return this.DrugStatusField;
  }
  set DrugStatus(value: string) {
    if (JSON.stringify(this.DrugStatusField) != JSON.stringify(value)) {
      this.DrugStatusField = value;

      /* this.RaisePropertyChanged("DrugStatus"); */
    }
  }

  get UniqueRowID(): string {
    return this.UniqueRowIDField;
  }
  set UniqueRowID(value: string) {
    if (JSON.stringify(this.UniqueRowIDField) != JSON.stringify(value)) {
      this.UniqueRowIDField = value;

      /* this.RaisePropertyChanged("UniqueRowID"); */
    }
  }

  get IsCurrentMedication(): string {
    return this.IsCurrentMedicationField;
  }
  set IsCurrentMedication(value: string) {
    if (
      JSON.stringify(this.IsCurrentMedicationField) != JSON.stringify(value)
    ) {
      this.IsCurrentMedicationField = value;

      /* this.RaisePropertyChanged("IsCurrentMedication"); */
    }
  }

  get MedClrkSource(): string {
    return this.MedClrkSourceField;
  }
  set MedClrkSource(value: string) {
    if (JSON.stringify(this.MedClrkSourceField) != JSON.stringify(value)) {
      this.MedClrkSourceField = value;

      /* this.RaisePropertyChanged("MedClrkSource"); */
    }
  }

  get IsDeactivated(): string {
    return this.IsDeactivatedField;
  }
  set IsDeactivated(value: string) {
    if (JSON.stringify(this.IsDeactivatedField) != JSON.stringify(value)) {
      this.IsDeactivatedField = value;

      /* this.RaisePropertyChanged("IsDeactivated"); */
    }
  }

  get QuantityUOMName(): string {
    return this.QuantityUOMNameField;
  }
  set QuantityUOMName(value: string) {
    if (JSON.stringify(this.QuantityUOMNameField) != JSON.stringify(value)) {
      this.QuantityUOMNameField = value;

      /* this.RaisePropertyChanged("QuantityUOMName"); */
    }
  }

  get IsPresItemLevelDispense(): string {
    return this.IsPresItemLevelDispenseField;
  }
  set IsPresItemLevelDispense(value: string) {
    if (
      JSON.stringify(this.IsPresItemLevelDispenseField) != JSON.stringify(value)
    ) {
      this.IsPresItemLevelDispenseField = value;

      /* this.RaisePropertyChanged("IsPresItemLevelDispense"); */
    }
  }

  get DispenseInstructionCode(): any {
    return this.DispenseInstructionCodeField;
  }
  set DispenseInstructionCode(value: any) {
    if (
      JSON.stringify(this.DispenseInstructionCodeField) != JSON.stringify(value)
    ) {
      this.DispenseInstructionCodeField = value;

      /* this.RaisePropertyChanged("DispenseInstructionCode"); */
    }
  }

  get SupplyInstructionCode(): string {
    return this.SupplyInstructionCodeField;
  }
  set SupplyInstructionCode(value: string) {
    if (
      JSON.stringify(this.SupplyInstructionCodeField) != JSON.stringify(value)
    ) {
      this.SupplyInstructionCodeField = value;

      /* this.RaisePropertyChanged("SupplyInstructionCode"); */
    }
  }

  get PrepStatusCode(): string {
    return this.PrepStatusCodeField;
  }
  set PrepStatusCode(value: string) {
    if (JSON.stringify(this.PrepStatusCodeField) != JSON.stringify(value)) {
      this.PrepStatusCodeField = value;
      /* this.RaisePropertyChanged("PrepStatusCode"); */
    }
  }

  get MCIItemDisplay(): string {
    return this.MCIItemDisplayField;
  }
  set MCIItemDisplay(value: string) {
    if (JSON.stringify(this.MCIItemDisplayField) != JSON.stringify(value)) {
      this.MCIItemDisplayField = value;

      /* this.RaisePropertyChanged("MCIItemDisplay"); */
    }
  }

  get IsSupplyRequested(): string {
    return this.IsSupplyRequestedField;
  }
  set IsSupplyRequested(value: string) {
    if (JSON.stringify(this.IsSupplyRequestedField) != JSON.stringify(value)) {
      this.IsSupplyRequestedField = value;

      /* this.RaisePropertyChanged("IsSupplyRequested"); */
    }
  }

  get IsWardStock(): boolean {
    return this.IsWardStockField;
  }
  set IsWardStock(value) {
    if (this.IsWardStockField != value) {
      this.IsWardStockField = value;

      /* this.RaisePropertyChanged("IsWardStock"); */
    }
  }

  get RequisitionCACode(): string {
    return this.RequisitionCACodeField;
  }
  set RequisitionCACode(value: string) {
    if (JSON.stringify(this.RequisitionCACodeField) != JSON.stringify(value)) {
      this.RequisitionCACodeField = value;

      /* this.RaisePropertyChanged("RequisitionCACode"); */
    }
  }

  /* public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.PrescriptionItemFormViewParameters FormViewParameters */

  get FormViewParameters() {
    return this.FormViewParametersField;
  }
  set FormViewParameters(value: any) {
    if (JSON.stringify(this.FormViewParametersField) != JSON.stringify(value)) {
      this.FormViewParametersField = value;

      /* this.RaisePropertyChanged("FormViewParameters"); */
    }
  }

  /* public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo OrderSet
   */

  get OrderSet() {
    return this.OrderSetField;
  }
  set OrderSet(value: any) {
    if (JSON.stringify(this.OrderSetField) != JSON.stringify(value)) {
      this.OrderSetField = value;

      /* this.RaisePropertyChanged("OrderSet"); */
    }
  }

  get PRNInstructionValue(): string {
    return this.PRNInstructionValueField;
  }
  set PRNInstructionValue(value: string) {
    if (
      JSON.stringify(this.PRNInstructionValueField) != JSON.stringify(value)
    ) {
      this.PRNInstructionValueField = value;

      /* this.RaisePropertyChanged("PRNInstructionValue"); */
    }
  }

  get RequestUrgency(): string {
    return this.RequestUrgencyField;
  }
  set RequestUrgency(value: string) {
    if (JSON.stringify(this.RequestUrgencyField) != JSON.stringify(value)) {
      this.RequestUrgencyField = value;

      /* his.RaisePropertyChanged("RequestUrgency"); */
    }
  }

  get RequestUrgencyOrder(): number {
    return this.RequestUrgencyOrderField;
  }
  set RequestUrgencyOrder(value: number) {
    if (this.RequestUrgencyOrderField != value) {
      this.RequestUrgencyOrderField = value;

      /* this.RaisePropertyChanged("RequestUrgencyOrder"); */
    }
  }

  get RequestedDTTM(): Date {
    return this.RequestedDTTMField;
  }
  set RequestedDTTM(value: Date) {
    if (this.RequestedDTTMField != value) {
      this.RequestedDTTMField = value;

      /* this.RaisePropertyChanged("RequestedDTTM"); */
    }
  }

  get RequestedComments(): string {
    return this.RequestedCommentsField;
  }
  set RequestedComments(value: any) {
    if (JSON.stringify(this.RequestedCommentsField) != JSON.stringify(value)) {
      this.RequestedCommentsField = value;

      /* this.RaisePropertyChanged("RequestedComments"); */
    }
  }

  get RequestedBy(): string {
    return this.RequestedByField;
  }
  set RequestedBy(value) {
    if (JSON.stringify(this.RequestedByField) != JSON.stringify(value)) {
      this.RequestedByField = value;

      /* this.RaisePropertyChanged("RequestedBy"); */
    }
  }

  get SteppedDoseAdminTimes(): string {
    return this.SteppedDoseAdminTimesField;
  }
  set SteppedDoseAdminTimes(value: string) {
    if (
      JSON.stringify(this.SteppedDoseAdminTimesField) != JSON.stringify(value)
    ) {
      this.SteppedDoseAdminTimesField = value;

      /* this.RaisePropertyChanged("SteppedDoseAdminTimes"); */
    }
  }

  get IsinDefiniteOmit(): boolean {
    return this.IsinDefiniteOmitField;
  }
  set IsinDefiniteOmit(value) {
    if (JSON.stringify(this.IsinDefiniteOmitField) != JSON.stringify(value)) {
      this.IsinDefiniteOmitField = value;

      /* this.RaisePropertyChanged("IsinDefiniteOmit"); */
    }
  }

  get IsinDefiniteOmitDTTM(): Date {
    return this.IsinDefiniteOmitDTTMField;
  }
  set IsinDefiniteOmitDTTM(value: Date) {
    if (
      JSON.stringify(this.IsinDefiniteOmitDTTMField) != JSON.stringify(value)
    ) {
      this.IsinDefiniteOmitDTTMField = value;

      /* this.RaisePropertyChanged("IsinDefiniteOmitDTTM"); */
    }
  }

  get OmitComments(): string {
    return this.OmitCommentsField;
  }
  set OmitComments(value: string) {
    if (JSON.stringify(this.OmitCommentsField) != JSON.stringify(value)) {
      this.OmitCommentsField = value;

      /* this.RaisePropertyChanged("OmitComments"); */
    }
  }

  get OmittedBy(): string {
    return this.OmittedByField;
  }
  set OmittedBy(value: string) {
    if (JSON.stringify(this.OmittedByField) != JSON.stringify(value)) {
      this.OmittedByField = value;

      /* this.RaisePropertyChanged("OmittedBy"); */
    }
  }

  get IsAllowed(): boolean {
    return this.IsAllowedField;
  }
  set IsAllowed(value) {
    if (JSON.stringify(this.IsAllowedField) != JSON.stringify(value)) {
      this.IsAllowedField = value;

      /* this.RaisePropertyChanged("IsAllowed"); */
    }
  }

  get ExistsOnAdmission(): string {
    return this.ExistsOnAdmissionField;
  }
  set ExistsOnAdmission(value: string) {
    if (JSON.stringify(this.ExistsOnAdmissionField) != JSON.stringify(value)) {
      this.ExistsOnAdmissionField = value;

      /* this.RaisePropertyChanged("ExistsOnAdmission"); */
    }
  }

  get PrescribingNote(): string {
    return this.PrescribingNoteField;
  }
  set PrescribingNote(value: string) {
    if (JSON.stringify(this.PrescribingNoteField) != JSON.stringify(value)) {
      this.PrescribingNoteField = value;

      /* this.RaisePropertyChanged("PrescribingNote"); */
    }
  }

  get FluidPrescribableItemListOID(): number {
    return this.FluidPrescribableItemListOIDField;
  }
  set FluidPrescribableItemListOID(value: number) {
    if (this.FluidPrescribableItemListOIDField != value) {
      this.FluidPrescribableItemListOIDField = value;

      /* this.RaisePropertyChanged("FluidPrescribableItemListOID"); */
    }
  }

  get PrescriptionMulticomponentOID(): number {
    return this.PrescriptionMulticomponentOIDField;
  }
  set PrescriptionMulticomponentOID(value: number) {
    if (this.PrescriptionMulticomponentOIDField != value) {
      this.PrescriptionMulticomponentOIDField = value;

      /* this.RaisePropertyChanged("PrescriptionMulticomponentOID"); */
    }
  }

  get DoseTypeValue(): string {
    return this.DoseTypeValueField;
  }
  set DoseTypeValue(value: string) {
    if (JSON.stringify(this.DoseTypeValueField) != JSON.stringify(value)) {
      this.DoseTypeValueField = value;

      /* this.RaisePropertyChanged("DoseTypeValue"); */
    }
  }

  get IsWardStockFluid(): any {
    return this.IsWardStockFluidField;
  }
  set IsWardStockFluid(value: true) {
    if (JSON.stringify(this.IsWardStockFluidField) != JSON.stringify(value)) {
      this.IsWardStockFluidField = value;

      /* this.RaisePropertyChanged("IsWardStockFluid"); */
    }
  }

  get isDoseCalcExist(): boolean {
    return this.IsDoseCalcExistField;
  }
  set isDoseCalcExist(value) {
    if (this.IsDoseCalcExistField != value) {
      this.IsDoseCalcExistField = value;

      /* this.RaisePropertyChanged("isDoseCalcExist"); */
    }
  }

  get DCCalDTTM(): Date {
    return this.DCCalDTTMField;
  }
  set DCCalDTTM(value: Date) {
    if (this.DCCalDTTMField != value) {
      this.DCCalDTTMField = value;

      /* this.RaisePropertyChanged("DCCalDTTM"); */
    }
  }

  get DCHeightRecordedDTTM(): Date {
    return this.DCHeightRecordedDTTMField;
  }
  set DCHeightRecordedDTTM(value: Date) {
    if (this.DCHeightRecordedDTTMField != value) {
      this.DCHeightRecordedDTTMField = value;

      /* this.RaisePropertyChanged("DCHeightRecordedDTTM"); */
    }
  }

  get DCWeightRecordedDTTM(): Date {
    return this.DCWeightRecordedDTTMField;
  }
  set DCWeightRecordedDTTM(value: Date) {
    if (this.DCWeightRecordedDTTMField != value) {
      this.DCWeightRecordedDTTMField = value;

      /* this.RaisePropertyChanged("DCWeightRecordedDTTM"); */
    }
  }

  /* public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.MeasurableObject DurationInfo  */
  get DurationInfo(): any {
    return this.DurationInfoField;
  }
  set DurationInfo(value: any) {
    if (JSON.stringify(this.DurationInfoField) != JSON.stringify(value)) {
      this.DurationInfoField = value;

      /* this.RaisePropertyChanged("DurationInfo"); */
    }
  }
}

export class PresItemAdditionalProperties extends CLZOObject {
  ReviewAfterDetailsField:ReviewAfterDetail[]=[];

  IntervalBtwnInstallmentField:MeasurableObject= new MeasurableObject();
  MedClerkModifyReasonField:ObjectInfo= new ObjectInfo();
  InstalmentInstructionsField:ObjectInfo= new ObjectInfo();
  EndorsementPropertiesField:ObjectInfo= new ObjectInfo();
  StationeryTypeField:ObjectInfo= new ObjectInfo();
  AdminMethodField:ObjectInfo= new ObjectInfo();
  MedClerkSourceField:ObjectInfo= new ObjectInfo();
  manageReviewDetailField:ManageReviewPeriod= new ManageReviewPeriod();

  /*  private System.Collections.ObjectModel.ObservableCollection<iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ReviewAfterDetail> ReviewAfterDetailsField;
   */
  private NoOfInstallmentsField = ' ';

  /* private iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.MeasurableObject IntervalBtwnInstallmentField;

    private iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo MedClerkModifyReasonField;

    private System.Collections.ObjectModel.ObservableCollection<iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo> InstalmentInstructionsField;

    private System.Collections.ObjectModel.ObservableCollection<iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo> EndorsementPropertiesField;

    private iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo StationeryTypeField;
*/
  private AdditionalCommentsField = ' ';

  private BatchNumberField = ' ';

  private ExpiryDateField = new Date();

  private NonFormularyReasonField = ' ';

  private NonCatalogueReasonField = ' ';

  private StatusModifedDTTMField = new Date();

  /* private System.Collections.ObjectModel.ObservableCollection<iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo> MedClerkSourceField; */

  private DrugAttributesField = ' ';

  private PharmacyNotingCommentsField = ' ';

  private HoldReasonField = ' ';

  private ReasonOfStoppingField = ' ';

  private ReasonforReconcileField = ' ';
  private DateCommencedField = ' ';

  private NonCatalogueOtherReasonField = ' ';

  private ReconcileCommentsField = ' ';

  private PreparationStatusField = ' ';

  private SupplyInsChildExistsField = ' ';

  private NonFormComponentItemsField = ' ';

  private NonFormComponentsField = ' ';

  private NonFormCompReasonField = ' ';

  private PrescriberIdentifierField = ' ';

  private PrescriberBleepField = ' ';

  private PrescriberTelephoneField = ' ';

  private PrescriberPagerField = ' ';

  private GroupHeaderNameField = ' ';

  /*  private iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ManageReviewPeriod manageReviewDetailField;
   */
  private OtherCommentsField = ' ';

  /* public System.Collections.ObjectModel.ObservableCollection<iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ReviewAfterDetail> ReviewAfterDetails */
  get ReviewAfterDetails() {
    return this.ReviewAfterDetailsField;
  }
  set ReviewAfterDetails(value: any) {
    if (JSON.stringify(this.ReviewAfterDetailsField) != JSON.stringify(value)) {
      this.ReviewAfterDetailsField = value;

      /* this.RaisePropertyChanged("ReviewAfterDetails"); */
    }
  }

  get NoOfInstallments() {
    return this.NoOfInstallmentsField;
  }
  set NoOfInstallments(value: any) {
    if (JSON.stringify(this.NoOfInstallmentsField) != JSON.stringify(value)) {
      this.NoOfInstallmentsField = value;

      /* this.RaisePropertyChanged("NoOfInstallments"); */
    }
  }

  /* public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.MeasurableObject IntervalBtwnInstallment */
  get IntervalBtwnInstallment() {
    return this.IntervalBtwnInstallmentField;
  }
  set IntervalBtwnInstallment(value: any) {
    if (
      JSON.stringify(this.IntervalBtwnInstallmentField) != JSON.stringify(value)
    ) {
      this.IntervalBtwnInstallmentField = value;

      /* this.RaisePropertyChanged("IntervalBtwnInstallment"); */
    }
  }

  /* public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo MedClerkModifyReason */
  get MedClerkModifyReason() {
    return this.MedClerkModifyReasonField;
  }
  set MedClerkModifyReason(value: any) {
    if (
      JSON.stringify(this.MedClerkModifyReasonField) != JSON.stringify(value)
    ) {
      this.MedClerkModifyReasonField = value;

      /* this.RaisePropertyChanged("MedClerkModifyReason"); */
    }
  }

  /* public System.Collections.ObjectModel.ObservableCollection<iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo> InstalmentInstructions  */
  get InstalmentInstructions() {
    return this.InstalmentInstructionsField;
  }
  set InstalmentInstructions(value: any) {
    if (
      JSON.stringify(this.InstalmentInstructionsField) != JSON.stringify(value)
    ) {
      this.InstalmentInstructionsField = value;

      /* this.RaisePropertyChanged("InstalmentInstructions"); */
    }
  }

  /*  public System.Collections.ObjectModel.ObservableCollection<iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo> EndorsementProperties */
  get EndorsementProperties() {
    return this.EndorsementPropertiesField;
  }
  set EndorsementProperties(value: any) {
    if (
      JSON.stringify(this.EndorsementPropertiesField) != JSON.stringify(value)
    ) {
      this.EndorsementPropertiesField = value;

      /* this.RaisePropertyChanged("EndorsementProperties"); */
    }
  }

  /*  public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo StationeryType */
  get StationeryType() {
    return this.StationeryTypeField;
  }
  set StationeryType(value: any) {
    if (JSON.stringify(this.StationeryTypeField) != JSON.stringify(value)) {
      this.StationeryTypeField = value;

      /* this.RaisePropertyChanged("StationeryType"); */
    }
  }

  get AdditionalComments(): string {
    return this.AdditionalCommentsField;
  }
  set AdditionalComments(value: string) {
    if (JSON.stringify(this.AdditionalCommentsField) != JSON.stringify(value)) {
      this.AdditionalCommentsField = value;

      /*  this.RaisePropertyChanged("AdditionalComments"); */
    }
  }

  get BatchNumber(): string {
    return this.BatchNumberField;
  }
  set BatchNumber(value: string) {
    if (JSON.stringify(this.BatchNumberField) != JSON.stringify(value)) {
      this.BatchNumberField = value;

      /* this.RaisePropertyChanged("BatchNumber"); */
    }
  }

  /*  public System.DateTime ExpiryDate */

  get ExpiryDate(): Date {
    return this.ExpiryDateField;
  }
  set ExpiryDate(value: Date) {
    if (this.ExpiryDateField != value) {
      this.ExpiryDateField = value;

      /* this.RaisePropertyChanged("ExpiryDate"); */
    }
  }

  get NonFormularyReason(): string {
    return this.NonFormularyReasonField;
  }
  set NonFormularyReason(value: string) {
    if (JSON.stringify(this.ExpiryDateField) != JSON.stringify(value)) {
      this.NonFormularyReasonField = value;
      /* this.RaisePropertyChanged("NonFormularyReason"); */
    }
  }

  get NonCatalogueReason(): string {
    return this.NonCatalogueReasonField;
  }
  set NonCatalogueReason(value: string) {
    if (JSON.stringify(this.ExpiryDateField) != JSON.stringify(value)) {
      this.NonCatalogueReasonField = value;

      /* this.RaisePropertyChanged("NonCatalogueReason"); */
    }
  }

  get StatusModifedDTTM(): Date {
    return this.StatusModifedDTTMField;
  }
  set StatusModifedDTTM(value: Date) {
    if (this.StatusModifedDTTMField != value) {
      this.StatusModifedDTTMField = value;
      /* this.RaisePropertyChanged("StatusModifedDTTM");
       */
    }
  }

  /* public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo AdminMethod  */
  get AdminMethod() {
    return this.AdminMethodField;
  }
  set AdminMethod(value: any) {
    if (JSON.stringify(this.AdminMethodField) != JSON.stringify(value)) {
      this.AdminMethodField = value;
      /* this.RaisePropertyChanged("AdminMethod"); */
    }
  }

  /* public System.Collections.ObjectModel.ObservableCollection<iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo> MedClerkSource  */
  get MedClerkSource() {
    return this.MedClerkSourceField;
  }
  set MedClerkSource(value: any) {
    if (JSON.stringify(this.MedClerkSourceField) != JSON.stringify(value)) {
      this.MedClerkSourceField = value;
      /* this.RaisePropertyChanged("MedClerkSource"); */
    }
  }

  get DrugAttributes(): string {
    return this.DrugAttributesField;
  }
  set DrugAttributes(value: string) {
    if (JSON.stringify(this.DrugAttributesField) != JSON.stringify(value)) {
      this.DrugAttributesField = value;
      /* this.RaisePropertyChanged("DrugAttributes"); */
    }
  }

  get PharmacyNotingComments(): string {
    return this.PharmacyNotingCommentsField;
  }
  set PharmacyNotingComments(value: string) {
    if (
      JSON.stringify(this.PharmacyNotingCommentsField) != JSON.stringify(value)
    ) {
      this.PharmacyNotingCommentsField = value;
      /* this.RaisePropertyChanged("PharmacyNotingComments");
       */
    }
  }

  get HoldReason(): string {
    return this.HoldReasonField;
  }
  set HoldReason(value: string) {
    if (JSON.stringify(this.HoldReasonField) != JSON.stringify(value)) {
      this.HoldReasonField = value;
      /* this.RaisePropertyChanged("HoldReason"); */
    }
  }

  get ReasonOfStopping(): string {
    return this.ReasonOfStoppingField;
  }
  set ReasonOfStopping(value: string) {
    if (JSON.stringify(this.ReasonOfStoppingField) != JSON.stringify(value)) {
      this.ReasonOfStoppingField = value;
      /* this.RaisePropertyChanged("ReasonOfStopping"); */
    }
  }

  get DateCommenced(): string {
    return this.DateCommencedField;
  }
  set DateCommenced(value: string) {
    if (JSON.stringify(this.DateCommencedField) != JSON.stringify(value)) {
      this.DateCommencedField = value;
      /* this.RaisePropertyChanged("DateCommenced"); */
    }
  }

  get NonCatalogueOtherReason(): string {
    return this.NonCatalogueOtherReasonField;
  }
  set NonCatalogueOtherReason(value: string) {
    if (
      JSON.stringify(this.NonCatalogueOtherReasonField) != JSON.stringify(value)
    ) {
      this.NonCatalogueOtherReasonField = value;
      /* this.RaisePropertyChanged("NonCatalogueOtherReason"); */
    }
  }

  get ReconcileComments(): string {
    return this.ReconcileCommentsField;
  }
  set ReconcileComments(value: string) {
    if (JSON.stringify(this.ReconcileCommentsField) != JSON.stringify(value)) {
      this.ReconcileCommentsField = value;
      /* this.RaisePropertyChanged("ReconcileComments"); */
    }
  }

  get PreparationStatus(): string {
    return this.PreparationStatusField;
  }
  set PreparationStatus(value: string) {
    if (JSON.stringify(this.PreparationStatusField) != JSON.stringify(value)) {
      this.PreparationStatusField = value;
      /* this.RaisePropertyChanged("PreparationStatus"); */
    }
  }

  get SupplyInsChildExists(): string {
    return this.SupplyInsChildExistsField;
  }
  set SupplyInsChildExists(value: string) {
    if (
      JSON.stringify(this.SupplyInsChildExistsField) != JSON.stringify(value)
    ) {
      this.SupplyInsChildExistsField = value;
      /* this.RaisePropertyChanged("SupplyInsChildExists"); */
    }
  }

  get NonFormComponentItems(): string {
    return this.NonFormComponentItemsField;
  }
  set NonFormComponentItems(value: string) {
    if (
      JSON.stringify(this.NonFormComponentItemsField) != JSON.stringify(value)
    ) {
      this.NonFormComponentItemsField = value;
      /* this.RaisePropertyChanged("NonFormComponentItems"); */
    }
  }

  get NonFormComponents(): string {
    return this.NonFormComponentsField;
  }
  set NonFormComponents(value: string) {
    if (JSON.stringify(this.NonFormComponentsField) != JSON.stringify(value)) {
      this.NonFormComponentsField = value;
      /*  this.RaisePropertyChanged("NonFormComponents"); */
    }
  }

  get NonFormCompReason(): string {
    return this.NonFormCompReasonField;
  }
  set NonFormCompReason(value: string) {
    if (JSON.stringify(this.NonFormCompReasonField) == JSON.stringify(value)) {
      this.NonFormCompReasonField = value;
      /* this.RaisePropertyChanged("NonFormCompReason"); */
    }
  }

  get PrescriberIdentifier(): string {
    return this.PrescriberIdentifierField;
  }
  set PrescriberIdentifier(value: string) {
    if (
      JSON.stringify(this.PrescriberIdentifierField) == JSON.stringify(value)
    ) {
      this.PrescriberIdentifierField = value;
      /* this.RaisePropertyChanged("PrescriberIdentifier"); */
    }
  }

  get PrescriberBleep(): string {
    return this.PrescriberBleepField;
  }
  set PrescriberBleep(value: string) {
    if (JSON.stringify(this.PrescriberBleepField) != JSON.stringify(value)) {
      this.PrescriberBleepField = value;
      /* this.RaisePropertyChanged("PrescriberBleep"); */
    }
  }

  get PrescriberTelephone(): string {
    return this.PrescriberTelephoneField;
  }
  set PrescriberTelephone(value: string) {
    if (
      JSON.stringify(this.PrescriberTelephoneField) != JSON.stringify(value)
    ) {
      this.PrescriberTelephoneField = value;

      /* this.RaisePropertyChanged("PrescriberTelephone"); */
    }
  }

  get PrescriberPager(): string {
    return this.PrescriberPagerField;
  }
  set PrescriberPager(value: string) {
    if (JSON.stringify(this.PrescriberPagerField) != JSON.stringify(value)) {
      this.PrescriberPagerField = value;
      /*  this.RaisePropertyChanged("PrescriberPager"); */
    }
  }

  get ReasonforReconcile(): string {
    return this.ReasonforReconcileField;
  }
  set ReasonforReconcile(value: string) {
    if (JSON.stringify(this.ReasonforReconcileField) != JSON.stringify(value)) {
      this.ReasonforReconcileField = value;
      /* this.RaisePropertyChanged("ReasonforReconcile"); */
    }
  }

  get GroupHeaderName(): string {
    return this.GroupHeaderNameField;
  }
  set GroupHeaderName(value: string) {
    if (JSON.stringify(this.GroupHeaderNameField) != JSON.stringify(value)) {
      this.GroupHeaderNameField = value;
      /* this.RaisePropertyChanged("GroupHeaderName"); */
    }
  }

  /*  public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ManageReviewPeriod ManageReviewDetail */
  get ManageReviewDetail() {
    return this.manageReviewDetailField;
  }
  set ManageReviewDetail(value: any) {
    if (JSON.stringify(this.manageReviewDetailField) != JSON.stringify(value)) {
      this.manageReviewDetailField = value;
      /* this.RaisePropertyChanged("ManageReviewDetail"); */
    }
  }

  get OtherComments(): string {
    return this.OtherCommentsField;
  }
  set OtherComments(value: string) {
    if (JSON.stringify(this.OtherCommentsField) != JSON.stringify(value)) {
      this.OtherCommentsField = value;
      /*  this.RaisePropertyChanged("OtherComments"); */
    }
  }
}

export class PrescriptionItemAddnView extends CLZOObject {
  AdditionalPropertiesField:PresItemAdditionalProperties = new PresItemAdditionalProperties();
  AuthorisationDetailsField:PrescriptionItemAction= new PrescriptionItemAction();
  ClinicalVerificationDetailsField:PrescriptionItemAction= new PrescriptionItemAction();
  CancelDiscontinueDetailsField:PrescriptionItemAction= new PrescriptionItemAction();
  AmendDetailsField:PrescriptionItemAction= new PrescriptionItemAction();
  PrescriptionItemField:PrescriptionItem= new PrescriptionItem();

  /* private iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.PresItemAdditionalProperties AdditionalPropertiesField;

    private iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.PrescriptionItemAction AuthorisationDetailsField;

    private iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.PrescriptionItemAction ClinicalVerificationDetailsField;

    private iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.PrescriptionItemAction CancelDiscontinueDetailsField;

    private iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.PrescriptionItemAction AmendDetailsField;

    private iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.PrescriptionItem PrescriptionItemField;
*/
  /*  public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.PresItemAdditionalProperties AdditionalProperties  */
  get AdditionalProperties() {
    return this.AdditionalPropertiesField;
  }
  set AdditionalProperties(value: any) {
    if (
      JSON.stringify(this.AdditionalPropertiesField) != JSON.stringify(value)
    ) {
      this.AdditionalPropertiesField = value;

      /* this.RaisePropertyChanged("AdditionalProperties"); */
    }
  }

  /*  public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.PrescriptionItemAction AuthorisationDetails */
  get AuthorisationDetails() {
    return this.AuthorisationDetailsField;
  }
  set AuthorisationDetails(value: any) {
    if (
      JSON.stringify(this.AuthorisationDetailsField) != JSON.stringify(value)
    ) {
      this.AuthorisationDetailsField = value;

      /* this.RaisePropertyChanged("AuthorisationDetails"); */
    }
  }

  /*  public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.PrescriptionItemAction ClinicalVerificationDetails */
  get ClinicalVerificationDetails() {
    return this.ClinicalVerificationDetailsField;
  }
  set ClinicalVerificationDetails(value: any) {
    if (
      JSON.stringify(this.ClinicalVerificationDetailsField) !=
      JSON.stringify(value)
    ) {
      this.ClinicalVerificationDetailsField = value;

      /* this.RaisePropertyChanged("ClinicalVerificationDetails"); */
    }
  }

  /*  public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.PrescriptionItemAction CancelDiscontinueDetails  */
  get CancelDiscontinueDetails() {
    return this.CancelDiscontinueDetailsField;
  }
  set CancelDiscontinueDetails(value: any) {
    if (
      JSON.stringify(this.CancelDiscontinueDetailsField) !=
      JSON.stringify(value)
    ) {
      this.CancelDiscontinueDetailsField = value;

      /* this.RaisePropertyChanged("CancelDiscontinueDetails"); */
    }
  }

  /* public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.PrescriptionItemAction AmendDetails  */
  get AmendDetails() {
    return this.AmendDetailsField;
  }
  set AmendDetails(value: any) {
    if (JSON.stringify(this.AmendDetailsField) != JSON.stringify(value)) {
      this.AmendDetailsField = value;

      /* this.RaisePropertyChanged("AmendDetails"); */
    }
  }

  /* public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.PrescriptionItem PrescriptionItem  */
  get PrescriptionItem() {
    return this.PrescriptionItemField;
  }
  set PrescriptionItem(value: any) {
    if (JSON.stringify(this.PrescriptionItemField) != JSON.stringify(value)) {
      this.PrescriptionItemField = value;

      /* this.RaisePropertyChanged("PrescriptionItem"); */
    }
  }
}

export class PrescriptionItemAction extends CLZOObject {
  PerformedByField:ObjectInfo= new ObjectInfo();
  VerifyOnBehalfField:OnBehalfInfo= new OnBehalfInfo();
  HoldReasonField='';

  private IsActionPerformedField = ' '; /* //char// */

  private PerformedDTTMField = new Date();

  /* private iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo PerformedByField;
   */
  private ReasonForModificationField = ' ';

  private CommentsField = ' ';

  private ActionCodeField = ' ';

  /* private iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.OnBehalfInfo VerifyOnBehalfField;
   */
  private IPReconcileReasonField = ' ';
  private ModifiedItemOIDField = 0;

  /* private HoldReasonField " "; */

  private OnlyUpdatedColumnField = ' ';

  private UpdateItemStatusField = ' ';

  private CancelDefaultAllergenField = ' ';

  private DirectDiscontinueReasonField = ' ';

  private ModificationCommentsField = ' ';

  private AmendOfItemNoField = ' ';

  private ReconcileCommentsField = ' ';
  private IPReconcileCommentsField = ' ';

  private ClinicallySupplyInstructionField = ' ';

  private IsClinicalVerHisLinkField = true;
  private CVStatusCodeField = ' ';

  get IsActionPerformed(): string {
    return this.IsActionPerformedField;
  }
  set IsActionPerformed(value: string) {
    if (JSON.stringify(this.IsActionPerformedField) != JSON.stringify(value)) {
      this.IsActionPerformedField = value;

      /* this.RaisePropertyChanged("IsActionPerformed"); */
    }
  }

  get PerformedDTTM(): Date {
    return this.PerformedDTTMField;
  }
  set PerformedDTTM(value: Date) {
    if (this.PerformedDTTMField != value) {
      this.PerformedDTTMField = value;

      /* this.RaisePropertyChanged("PerformedDTTM"); */
    }
  }

  /*  public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo PerformedBy */

  get PerformedBy() {
    return this.PerformedByField;
  }
  set PerformedBy(value: any) {
    if (JSON.stringify(this.PerformedByField) != JSON.stringify(value)) {
      this.PerformedByField = value;

      /* this.RaisePropertyChanged("PerformedBy"); */
    }
  }

  get ReasonForModification(): string {
    return this.ReasonForModificationField;
  }
  set ReasonForModification(value: string) {
    if (
      JSON.stringify(this.ReasonForModificationField) != JSON.stringify(value)
    ) {
      this.ReasonForModificationField = value;

      /*  this.RaisePropertyChanged("ReasonForModification"); */
    }
  }

  get Comments(): string {
    return this.CommentsField;
  }
  set Comments(value: string) {
    if (JSON.stringify(this.CommentsField) != JSON.stringify(value)) {
      this.CommentsField = value;

      /*  this.RaisePropertyChanged("Comments"); */
    }
  }

  get ActionCode(): string {
    return this.ActionCodeField;
  }
  set ActionCode(value: string) {
    if (JSON.stringify(this.ActionCodeField) != JSON.stringify(value)) {
      this.ActionCodeField = value;

      /* this.RaisePropertyChanged("ActionCode"); */
    }
  }

  /* public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.OnBehalfInfo VerifyOnBehalf  */

  get VerifyOnBehalf() {
    return this.VerifyOnBehalfField;
  }
  set VerifyOnBehalf(value: any) {
    if (JSON.stringify(this.VerifyOnBehalfField) != JSON.stringify(value)) {
      this.VerifyOnBehalfField = value;

      /* this.RaisePropertyChanged("VerifyOnBehalf"); */
    }
  }

  get IPReconcileReason(): string {
    return this.IPReconcileReasonField;
  }
  set IPReconcileReason(value: string) {
    if (JSON.stringify(this.IPReconcileReasonField) != JSON.stringify(value)) {
      this.IPReconcileReasonField = value;

      /* this.RaisePropertyChanged("IPReconcileReason"); */
    }
  }

  get ModifiedItemOID(): any {
    return this.ModifiedItemOIDField;
  }
  set ModifiedItemOID(value: any) {
    if (JSON.stringify(this.ModifiedItemOIDField) != JSON.stringify(value)) {
      this.ModifiedItemOIDField = value;

      /* this.RaisePropertyChanged("ModifiedItemOID"); */
    }
  }

  get HoldReason(): string {
    return this.HoldReasonField;
  }
  set HoldReason(value: string) {
    if (JSON.stringify(this.HoldReasonField) != JSON.stringify(value)) {
      this.HoldReasonField = value;

      /* this.RaisePropertyChanged("HoldReason"); */
    }
  }

  get OnlyUpdatedColumn(): string {
    return this.OnlyUpdatedColumnField;
  }
  set OnlyUpdatedColumn(value: string) {
    if (JSON.stringify(this.OnlyUpdatedColumnField) != JSON.stringify(value)) {
      this.OnlyUpdatedColumnField = value;

      /* this.RaisePropertyChanged("OnlyUpdatedColumn"); */
    }
  }

  get UpdateItemStatus(): string {
    return this.UpdateItemStatusField;
  }
  set UpdateItemStatus(value: string) {
    if (JSON.stringify(this.UpdateItemStatusField) != JSON.stringify(value)) {
      this.UpdateItemStatusField = value;

      /* this.RaisePropertyChanged("UpdateItemStatus"); */
    }
  }

  get CancelDefaultAllergen(): string {
    return this.CancelDefaultAllergenField;
  }
  set CancelDefaultAllergen(value: string) {
    if (JSON.stringify(this.UpdateItemStatusField) != JSON.stringify(value)) {
      this.CancelDefaultAllergenField = value;

      /* this.RaisePropertyChanged("CancelDefaultAllergen"); */
    }
  }

  get DirectDiscontinueReason(): string {
    return this.DirectDiscontinueReasonField;
  }
  set DirectDiscontinueReason(value: string) {
    if (
      JSON.stringify(this.DirectDiscontinueReasonField) != JSON.stringify(value)
    ) {
      this.DirectDiscontinueReasonField = value;

      /* this.RaisePropertyChanged("DirectDiscontinueReason"); */
    }
  }

  get ModificationComments(): string {
    return this.ModificationCommentsField;
  }
  set ModificationComments(value: string) {
    if (
      JSON.stringify(this.ModificationCommentsField) != JSON.stringify(value)
    ) {
      this.ModificationCommentsField = value;

      /* this.RaisePropertyChanged("ModificationComments"); */
    }
  }

  get AmendOfItemNo(): string {
    return this.AmendOfItemNoField;
  }
  set AmendOfItemNo(value: string) {
    if (JSON.stringify(this.AmendOfItemNoField) != JSON.stringify(value)) {
      this.AmendOfItemNoField = value;

      /* this.RaisePropertyChanged("AmendOfItemNo"); */
    }
  }

  get ReconcileComments(): string {
    return this.ReconcileCommentsField;
  }
  set ReconcileComments(value: string) {
    if (JSON.stringify(this.ReconcileCommentsField) != JSON.stringify(value)) {
      this.ReconcileCommentsField = value;

      /* this.RaisePropertyChanged("ReconcileComments"); */
    }
  }

  get IPReconcileComments(): string {
    return this.IPReconcileCommentsField;
  }
  set IPReconcileComments(value: string) {
    if (
      JSON.stringify(this.IPReconcileCommentsField) != JSON.stringify(value)
    ) {
      this.IPReconcileCommentsField = value;

      /* this.RaisePropertyChanged("IPReconcileComments"); */
    }
  }

  get ClinicallySupplyInstruction(): string {
    return this.ClinicallySupplyInstructionField;
  }
  set ClinicallySupplyInstruction(value: string) {
    if (
      JSON.stringify(this.ClinicallySupplyInstructionField) !=
      JSON.stringify(value)
    ) {
      this.ClinicallySupplyInstructionField = value;

      /* this.RaisePropertyChanged("ClinicallySupplyInstruction"); */
    }
  }

  get IsClinicalVerHisLink(): boolean {
    return this.IsClinicalVerHisLinkField;
  }
  set IsClinicalVerHisLink(value) {
    if (this.IsClinicalVerHisLinkField != value) {
      this.IsClinicalVerHisLinkField = value;

      /* this.RaisePropertyChanged("IsClinicalVerHisLink"); */
    }
  }

  get CVStatusCode(): string {
    return this.CVStatusCodeField;
  }
  set CVStatusCode(value: string) {
    if (JSON.stringify(this.CVStatusCodeField) == JSON.stringify(value)) {
      this.CVStatusCodeField = value;

      /* this.RaisePropertyChanged("CVStatusCode"); */
    }
  }
}

export class OnBehalfInfo extends CLZOObject {
  OnBehalfOfUserField:ObjectInfo= new ObjectInfo();


  private NotifyFlagField = ' '; 
  private OnBehalfOfUserReasonField = ' ';

  private CommunicationModeField = ' ';

  get NotifyFlag(): string {
    return this.NotifyFlagField;
  }
  set NotifyFlag(value: string) {
    if (JSON.stringify(this.NotifyFlagField) != JSON.stringify(value)) {
      this.NotifyFlagField = value;

      /* this.RaisePropertyChanged("NotifyFlag"); */
    }
  }

  /* public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo OnBehalfOfUser */

  get OnBehalfOfUser() {
    return this.OnBehalfOfUserField;
  }
  set OnBehalfOfUser(value: any) {
    if (JSON.stringify(this.OnBehalfOfUserField) != JSON.stringify(value)) {
      this.OnBehalfOfUserField = value;

      /* this.RaisePropertyChanged("OnBehalfOfUser"); */
    }
  }

  get OnBehalfOfUserReason(): string {
    return this.OnBehalfOfUserReasonField;
  }
  set OnBehalfOfUserReason(value: string) {
    if (
      JSON.stringify(this.OnBehalfOfUserReasonField) != JSON.stringify(value)
    ) {
      this.OnBehalfOfUserReasonField = value;

      /*  this.RaisePropertyChanged("OnBehalfOfUserReason"); */
    }
  }

  get CommunicationMode(): string {
    return this.CommunicationModeField;
  }
  set CommunicationMode(value: string) {
    if (JSON.stringify(this.CommunicationModeField) != JSON.stringify(value)) {
      this.CommunicationModeField = value;

      /* this.RaisePropertyChanged("CommunicationMode"); */
    }
  }
}

export class ReviewAfterDetail extends CLZOObject {
  private prescriptionItemOIDField = 0;

  private reviewerField = ' ';

  private reviewedDTTMField = new Date();

  private reviewRequestedByField = ' ';

  private reviewRequestedDTTMField = new DateTime();

  private reviewAfterField = ' ';

  /*  private reviewAfterUOMField */

  private reviewPeriodField = ' ';

  private reviewDueDTTMField = new DateTime();

  private reviewTypeField = {}; /* //ObjectInfo  */

  private reviewOutcomeField = {};

  private reviewOutcomeCommentsField = ' ';

  private reviewRequestCommentsField = ' ';

  private reinstateReasonField = ' ';

  private IsCurrentField = ' ';

  private discontinueReasonField = ' ';

  /* public long PrescriptionItemOID */

  get PrescriptionItemOID(): number {
    return this.prescriptionItemOIDField;
  }
  set PrescriptionItemOID(value: number) {
    this.prescriptionItemOIDField = value;

    /* this.RaisePropertyChanged("PrescriptionItemOID"); */
  }

  get Reviewer(): string {
    return this.reviewerField;
  }
  set Reviewer(value: string) {
    this.reviewerField = value;

    /* this.RaisePropertyChanged("Reviewer"); */
  }

  /*  public System.DateTime ReviewedDTTM */

  get ReviewedDTTM() {
    return this.reviewedDTTMField;
  }
  set ReviewedDTTM(value: any) {
    this.reviewedDTTMField = value;
    JSON.stringify(this.reviewedDTTMField) != JSON.stringify(value);

    /* this.RaisePropertyChanged("ReviewedDTTM"); */
  }

  get ReviewRequestedBy(): string {
    return this.reviewRequestedByField;
  }
  set ReviewRequestedBy(value: string) {
    this.reviewRequestedByField = value;

    /* this.RaisePropertyChanged("ReviewRequestedBy"); */
  }

  get ReviewRequestedDTTM(): DateTime {
    return this.reviewRequestedDTTMField;
  }
  set ReviewRequestedDTTM(value: DateTime) {
    this.reviewRequestedDTTMField = value;

    /* this.RaisePropertyChanged("ReviewRequestedDTTM"); */
  }

  get ReviewAfter(): string {
    return this.reviewAfterField;
  }
  set ReviewAfter(value: string) {
    this.reviewAfterField = value;

    /* this.RaisePropertyChanged("ReviewAfter"); */
  }

  /* public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo ReviewAfterUOM  */

  get reviewAfterUOMField() {
    return this.reviewAfterUOMField;
  }
  set reviewAfterUOMField(value: any) {
    this.reviewAfterUOMField = value;

    /* this.RaisePropertyChanged("ReviewAfterUOM"); */
  }

  get ReviewPeriod(): string {
    return this.reviewPeriodField;
  }
  set ReviewPeriod(value: string) {
    this.reviewPeriodField = value;

    /* this.RaisePropertyChanged("ReviewPeriod"); */
  }

  get ReviewDueDTTM(): DateTime {
    return this.reviewDueDTTMField;
  }
  set ReviewDueDTTM(value: DateTime) {
    this.reviewDueDTTMField = value;

    /* this.RaisePropertyChanged("ReviewDueDTTM"); */
  }

  /* public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo ReviewType */

  get ReviewType() {
    return this.reviewTypeField;
  }
  set ReviewType(value: any) {
    this.reviewTypeField = value;

    /* this.RaisePropertyChanged("ReviewType"); */
  }

  /*  public iSOFT.LORENZO.Medication.IPPMA.Common.IPPManagePrescSer.ObjectInfo ReviewOutcome  */

  get ReviewOutcome() {
    return this.reviewOutcomeField;
  }
  set ReviewOutcome(value: any) {
    this.reviewOutcomeField = value;

    /* this.RaisePropertyChanged("ReviewOutcome");
     */
  }

  get ReviewOutcomeComments(): string {
    return this.reviewOutcomeCommentsField;
  }
  set ReviewOutcomeComments(value: string) {
    this.reviewOutcomeCommentsField = value;

    /* this.RaisePropertyChanged("ReviewOutcomeComments"); */
  }

  get ReviewRequestComments(): string {
    return this.reviewRequestCommentsField;
  }
  set ReviewRequestComments(value: string) {
    this.reviewRequestCommentsField = value;

    /* this.RaisePropertyChanged("ReviewRequestComments"); */
  }

  get ReinstateReason(): string {
    return this.reinstateReasonField;
  }
  set ReinstateReason(value: string) {
    this.reinstateReasonField = value;

    /* this.RaisePropertyChanged("ReinstateReason"); */
  }

  get IsCurrent(): string {
    return this.IsCurrentField;
  }
  set IsCurrent(value: string) {
    this.IsCurrentField = value;

    /* this.RaisePropertyChanged("IsCurrent"); */
  }

  get DiscontinueReason(): string {
    return this.discontinueReasonField;
  }
  set DiscontinueReason(value: string) {
    this.discontinueReasonField = value;

    this.RaisePropertyChanged('DiscontinueReason');
  }
  RaisePropertyChanged(data: any) {}
}

export class MeasurableObject extends CLZOObject {
  OIDField = 0;
  /* long */
  private ValueField = 0;

  private UOMOIDField = 0;

  private UOMNameField = '';
  oPrescriptionItemField: any;

  RecordedDateField = new Date();

  UOMCodeField = '';

  get OID(): number {
    return this.OIDField;
  }
  set OID(value: number) {
    if (this.OIDField != value) {
      this.OIDField = value;
      /* this.RaisePropertyChanged("OID");
       */
    }
  }

  get value(): number {
    return this.ValueField;
  }
  set value(value: number) {
    if (this.ValueField != value) {
      this.ValueField = value;
      /* this.RaisePropertyChanged("Value");
       */
    }
  }

  get uomoid(): number {
    return this.UOMOIDField;
  }
  set uomoid(value: number) {
    if (this.UOMOIDField != value) {
      this.UOMOIDField = value;
    }
  }

  get UOMName(): string {
    return this.UOMNameField;
  }
  set UOMName(value: string) {
    if (JSON.stringify(this.UOMNameField) != JSON.stringify(value)) {
      this.UOMNameField = value;
      /* this.RaisePropertyChanged("UOMName");
       */
    }
  }

  get RecordedDate(): Date {
    return this.RecordedDateField;
  }
  set RecordedDate(value: Date) {
    if (this.RecordedDateField != value) {
      this.RecordedDateField = value;
    }
  }

  get UOMCode(): string {
    return this.UOMCodeField;
  }
  set UOMCode(value: string) {
    if (JSON.stringify(this.UOMCodeField) != JSON.stringify(value)) {
      this.UOMCodeField = value;
      /* this.RaisePropertyChanged("UOMCode"); */
    }
  }
}

export class PrescriptionItem extends PrescriptionItemBasicData {
  private PrescriptionNumberField = '';

  private PrescriptionOIDField = 0;

  private IsPGDField = '';

  private PrescriberDetailsField:ObjectInfo= new ObjectInfo();

  private CareProviderField:ObjectInfo= new ObjectInfo();

  private IsPRNDoseField = '';

  private SpecialtyField = '';

  private IsDrugApprovalRequiredField = '';

  private DrugApproverRoleOIDField:ArrayOfLong = new ArrayOfLong();

  private UniqueIDField = 0;

  private IsConflictsExistsField = '';

  private IsAmendmentField = '';

  private ReorderItemOIDField = 0;

  private IsNonformularyField = '';

  private ReplaceDrugActiveStatusField = '';

  private DrugVersionMatchField = '';

  private ReprintReasonField = '';

  private ClinicalNoteOIDField = '';

  private PPatientOIDField = 0;

  private HIIsAcknField = '';

  private HIWarngBhTypField = '';

  private EncounterTypeField = '';

  private InfusionSeqOrderField = 0;

  private ParentPrescriptionItemOIDField = 0;

  private AutoNumberField = 0;

  private PrescriberRoleNameField = '';

  private TotalSeqCountField = 0;

  private IsConditionalExistsField = false;
  private VMVPLorenzoIDField = '';
  private VMVPIdentifyingNameField = '';
  private DaysOfWeeksField: ArrayOfString[] = [];
  private DrugFreqUOMCodeField = '';
  private IsWardStockForChildMCIField = false;

  private ordersetLorenzoIDField = '';
  private IsInclude72HrsCompletedORDisconItemField = '';
  private isGPConnectItemField = false;
  private gPConnectMedicationField: GPConnectItem = new GPConnectItem();
  private IsAutoSaveGPConnectForClerkingField = false;
  private IsAutoSaveGPCForClerkReorderField = false;
  private IsVolumeBasedInfusionField = '';
  private RoundOffCodeField = '';
  private _RoundOffTextField = '';
  private InfusionGroupSequenceNoField = 0;
  private NextSupplyDTTMField:Date= new Date();
  private AuthoriseRoleOIDField = '';
  private IsAnyItemAdministeredInSeqGroupField = 0;
  private IsAmendCompletedStatusField = false;
  private prescriberOBHNameField = '';
  private prescriberOBOUserOIDField = 0;
  private prevReorderItemOID = 0;
  private isReoderIconEnable = '';
  private ordersetGroupID = '';
  private _DisplayOrder = 0;
  private _Recordadmindatetime = new Date();
  private _IssIDSNewMeds = '';
  private supplycommentsField='';

  public get Supplycomments(): string {
    return this.supplycommentsField;
  }
  public set Supplycomments(value: string)  {
    this.supplycommentsField = value;
    // this.RaisePropertyChanged("Supplycomments");
  }

  get IssIDSNewMeds(): string {
    return this._IssIDSNewMeds;
  }
  set IssIDSNewMeds(value: string) {
    this._IssIDSNewMeds = value;
  }

  get Recordadmindatetime(): Date {
    return this._Recordadmindatetime;
  }
  set Recordadmindatetime(value: Date) {
    this._Recordadmindatetime = value;
  }


  get DisplayOrder(): number {
    return this._DisplayOrder;
  }
  set DisplayOrder(value: number) {
    this._DisplayOrder = value;
  }

  get OrdersetGroupID(): string {
    return this.ordersetGroupID;
  }
  set OrdersetGroupID(value: string) {
    this.ordersetGroupID = value;
  }

  get IsReoderIconEnable(): string {
    return this.isReoderIconEnable;
  }
  set IsReoderIconEnable(value: string) {
    this.isReoderIconEnable = value;
  }

  get PrevReorderItemOID(): number {
    return this.prevReorderItemOID;
  }
  set PrevReorderItemOID(value: number) {
    this.prevReorderItemOID = value;
  }

  get PrescriberOBOUserOID(): number {
    return this.prescriberOBOUserOIDField;
  }
  set PrescriberOBOUserOID(value: number) {
    this.prescriberOBOUserOIDField = value;
    //   this.RaisePropertyChanged("PrescriberOBOUserOID");
  }

  get PrescriberOBHName(): string {
    return this.prescriberOBHNameField;
  }
  set PrescriberOBHName(value: string) {
    this.prescriberOBHNameField = value;
    // this.RaisePropertyChanged("PrescriberOBHName");
  }

  get IsAmendCompletedStatus(): boolean {
    return this.IsAmendCompletedStatusField;
  }
  set IsAmendCompletedStatus(value: boolean) {
    if (this.IsAmendCompletedStatusField != value) {
      this.IsAmendCompletedStatusField = value;
      // this.RaisePropertyChanged("IsAmendCompletedStatus");
    }
  }

  get IsAnyItemAdministeredInSeqGroup(): number {
    return this.IsAnyItemAdministeredInSeqGroupField;
  }
  set IsAnyItemAdministeredInSeqGroup(value: number) {
    if (this.IsAnyItemAdministeredInSeqGroupField != value) {
      this.IsAnyItemAdministeredInSeqGroupField = value;
      // this.RaisePropertyChanged("IsAnyItemAdministeredInSeqGroup");
    }
  }

  get AuthoriseRoleOID(): string {
    return this.AuthoriseRoleOIDField;
  }
  set AuthoriseRoleOID(value: string) {
    this.AuthoriseRoleOIDField = value;
    // this.RaisePropertyChanged("AuthoriseRoleOID");
  }

  get NextSupplyDTTM() {
    return this.NextSupplyDTTMField;
  }
  set NextSupplyDTTM(value) {
    if (this.NextSupplyDTTMField != value) {
      this.NextSupplyDTTMField = value;
      // this.RaisePropertyChanged("NextSupplyDTTM");
    }
  }

  get InfusionGroupSequenceNo(): number {
    return this.InfusionGroupSequenceNoField;
  }
  set InfusionGroupSequenceNo(value: number) {
    if (this.InfusionGroupSequenceNoField != value) {
      this.InfusionGroupSequenceNoField = value;
      // this.RaisePropertyChanged("InfusionGroupSequenceNo");
    }
  }

  get RoundOffCode(): string {
    return this.RoundOffCodeField;
  }
  set RoundOffCode(value: string) {
    this.RoundOffCodeField = value;
    // this.RaisePropertyChanged("RoundOffCode");
  }

  get RoundOffText(): string {
    return this._RoundOffTextField;
  }
  set RoundOffText(value: string) {
    this._RoundOffTextField = value;
    // this.RaisePropertyChanged("RoundOffText");
  }

  get IsVolumeBasedInfusion(): string {
    return this.IsVolumeBasedInfusionField;
  }
  set IsVolumeBasedInfusion(value: string) {
    this.IsVolumeBasedInfusionField = value;
    // this.RaisePropertyChanged("IsVolumeBasedInfusion");
  }

  get IsAutoSaveGPCForClerkReorder(): boolean {
    return this.IsAutoSaveGPCForClerkReorderField;
  }
  set IsAutoSaveGPCForClerkReorder(value: boolean) {
    if (this.IsAutoSaveGPCForClerkReorderField != value) {
      this.IsAutoSaveGPCForClerkReorderField = value;
      // this.RaisePropertyChanged("IsAutoSaveGPCForClerkReorder");
    }
  }

  get IsAutoSaveGPConnectForClerking(): boolean {
    return this.IsAutoSaveGPConnectForClerkingField;
  }
  set IsAutoSaveGPConnectForClerking(value: boolean) {
    if (this.IsAutoSaveGPConnectForClerkingField != value) {
      this.IsAutoSaveGPConnectForClerkingField = value;
      // this.RaisePropertyChanged("IsAutoSaveGPConnectForClerking");
    }
  }

  get GPConnectMedication(): GPConnectItem {
    return this.gPConnectMedicationField;
  }
  set GPConnectMedication(value: GPConnectItem) {
    this.gPConnectMedicationField = value;
    // this.RaisePropertyChanged("GPConnectMedication");
  }

  get IsGPConnectItem(): boolean {
    return this.isGPConnectItemField;
  }
  set IsGPConnectItem(value: boolean) {
    this.isGPConnectItemField = value;
    // this.RaisePropertyChanged("IsGPConnectItem");
  }

  get IsInclude72HrsCompletedORDisconItem(): string {
    return this.IsInclude72HrsCompletedORDisconItemField;
  }
  set IsInclude72HrsCompletedORDisconItem(value: string) {
    if (this.IsInclude72HrsCompletedORDisconItemField != value) {
      this.IsInclude72HrsCompletedORDisconItemField = value;
      // this.RaisePropertyChanged("IsInclude72HrsCompletedORDisconItem");
    }
  }

  get OrdersetLorenzoID(): string {
    return this.ordersetLorenzoIDField;
  }
  set OrdersetLorenzoID(value: string) {
    this.ordersetLorenzoIDField = value;
    //  this.RaisePropertyChanged("OrdersetLorenzoID");
  }

  get PrescriptionNumber() {
    return this.PrescriptionNumberField;
  }
  set PrescriptionNumber(value: string) {
    if (JSON.stringify(this.PrescriptionNumberField) != JSON.stringify(value)) {
      this.PrescriptionNumberField = value;
      // this.RaisePropertyChanged("PrescriptionNumber");
    }
  }

  get PrescriptionOID(): number {
    return this.PrescriptionOIDField;
  }
  set PrescriptionOID(value: number) {
    if (this.PrescriptionOIDField != value) {
      this.PrescriptionOIDField = value;
      // this.RaisePropertyChanged("PrescriptionOID");
    }
  }

  get IsPGD(): string {
    return this.IsPGDField;
  }
  set IsPGD(value: string) {
    if (this.IsPGDField != value) {
      this.IsPGDField = value;
      // this.RaisePropertyChanged("IsPGD");
    }
  }

  get PrescriberDetails() {
    return this.PrescriberDetailsField;
  }
  set PrescriberDetails(value) {
    if (JSON.stringify(this.PrescriberDetailsField) != JSON.stringify(value)) {
      this.PrescriberDetailsField = value;
      // this.RaisePropertyChanged("PrescriberDetails");
    }
  }

  get CareProvider() {
    return this.CareProviderField;
  }
  set CareProvider(value) {
    if (JSON.stringify(this.CareProviderField) != JSON.stringify(value)) {
      this.CareProviderField = value;
      // this.RaisePropertyChanged("CareProvider");
    }
  }

  get IsPRNDose(): string {
    return this.IsPRNDoseField;
  }
  set IsPRNDose(value: string) {
    if (this.IsPRNDoseField != value) {
      this.IsPRNDoseField = value;
      // this.RaisePropertyChanged("IsPRNDose");
    }
  }

  get Specialty(): string {
    return this.SpecialtyField;
  }
  set Specialty(value: string) {
    if (JSON.stringify(this.SpecialtyField) != JSON.stringify(value)) {
      this.SpecialtyField = value;
      // this.RaisePropertyChanged("Specialty");
    }
  }

  get IsDrugApprovalRequired(): string {
    return this.IsDrugApprovalRequiredField;
  }
  set IsDrugApprovalRequired(value: string) {
    if (this.IsDrugApprovalRequiredField != value) {
      this.IsDrugApprovalRequiredField = value;
      // this.RaisePropertyChanged("IsDrugApprovalRequired");
    }
  }

  get DrugApproverRoleOID() {
    return this.DrugApproverRoleOIDField;
  }
  set DrugApproverRoleOID(value) {
    if (
      JSON.stringify(this.DrugApproverRoleOIDField) != JSON.stringify(value)
    ) {
      this.DrugApproverRoleOIDField = value;
      // this.RaisePropertyChanged("DrugApproverRoleOID");
    }
  }

  get UniqueID() {
    return this.UniqueIDField;
  }
  set UniqueID(value) {
    if (this.UniqueIDField != value) {
      this.UniqueIDField = value;
      // this.RaisePropertyChanged("UniqueID");
    }
  }

  get IsConflictsExists(): string {
    return this.IsConflictsExistsField;
  }
  set IsConflictsExists(value: string) {
    if (this.IsConflictsExistsField != value) {
      this.IsConflictsExistsField = value;
      // this.RaisePropertyChanged("IsConflictsExists");
    }
  }

  get IsAmendment(): string {
    return this.IsAmendmentField;
  }
  set IsAmendment(value: string) {
    if ((this.IsAmendmentField != value) != true) {
      this.IsAmendmentField = value;
      // this.RaisePropertyChanged("IsAmendment");
    }
  }

  get ReorderItemOID(): number {
    return this.ReorderItemOIDField;
  }
  set ReorderItemOID(value: number) {
    if (this.ReorderItemOIDField != value) {
      this.ReorderItemOIDField = value;
      // this.RaisePropertyChanged("ReorderItemOID");
    }
  }

  get IsNonformulary(): string {
    return this.IsNonformularyField;
  }
  set IsNonformulary(value: string) {
    if (this.IsNonformularyField != value) {
      this.IsNonformularyField = value;
      // this.RaisePropertyChanged("IsNonformulary");
    }
  }

  get ReplaceDrugActiveStatus(): string {
    return this.ReplaceDrugActiveStatusField;
  }
  set ReplaceDrugActiveStatus(value: string) {
    if (this.ReplaceDrugActiveStatusField != value) {
      this.ReplaceDrugActiveStatusField = value;
      // this.RaisePropertyChanged("ReplaceDrugActiveStatus");
    }
  }

  get DrugVersionMatch(): string {
    return this.DrugVersionMatchField;
  }
  set DrugVersionMatch(value: string) {
    if (this.DrugVersionMatchField != value) {
      this.DrugVersionMatchField = value;
      // this.RaisePropertyChanged("DrugVersionMatch");
    }
  }

  get ReprintReason(): string {
    return this.ReprintReasonField;
  }
  set ReprintReason(value: string) {
    if (JSON.stringify(this.ReprintReasonField) != JSON.stringify(value)) {
      this.ReprintReasonField = value;
      // this.RaisePropertyChanged("ReprintReason");
    }
  }

  get ClinicalNoteOID(): string {
    return this.ClinicalNoteOIDField;
  }
  set ClinicalNoteOID(value: string) {
    if (JSON.stringify(this.ClinicalNoteOIDField) != JSON.stringify(value)) {
      this.ClinicalNoteOIDField = value;
      // this.RaisePropertyChanged("ClinicalNoteOID");
    }
  }

  get PPatientOID(): number {
    return this.PPatientOIDField;
  }
  set PPatientOID(value: number) {
    if (this.PPatientOIDField != value) {
      this.PPatientOIDField = value;
      // this.RaisePropertyChanged("PPatientOID");
    }
  }

  get HIIsAckn(): string {
    return this.HIIsAcknField;
  }
  set HIIsAckn(value: string) {
    if (this.HIIsAcknField != value) {
      this.HIIsAcknField = value;
      // this.RaisePropertyChanged("HIIsAckn");
    }
  }
  get HIWarngBhTyp(): string {
    return this.HIWarngBhTypField;
  }
  set HIWarngBhTyp(value: string) {
    if (JSON.stringify(this.HIWarngBhTypField) != JSON.stringify(value)) {
      this.HIWarngBhTypField = value;
      // this.RaisePropertyChanged("HIWarngBhTyp");
    }
  }

  get EncounterType(): string {
    return this.EncounterTypeField;
  }
  set EncounterType(value: string) {
    if (JSON.stringify(this.EncounterTypeField) != JSON.stringify(value)) {
      this.EncounterTypeField = value;
      // this.RaisePropertyChanged("EncounterType");
    }
  }

  get InfusionSeqOrder(): number {
    return this.InfusionSeqOrderField;
  }
  set InfusionSeqOrder(value: number) {
    if (this.InfusionSeqOrderField != value) {
      this.InfusionSeqOrderField = value;
      // this.RaisePropertyChanged("InfusionSeqOrder");
    }
  }

  get ParentPrescriptionItemOID(): number {
    return this.ParentPrescriptionItemOIDField;
  }
  set ParentPrescriptionItemOID(value: number) {
    if (this.ParentPrescriptionItemOIDField != value) {
      this.ParentPrescriptionItemOIDField = value;
      // this.RaisePropertyChanged("ParentPrescriptionItemOID");
    }
  }

  get AutoNumber(): number {
    return this.AutoNumberField;
  }
  set AutoNumber(value: number) {
    if (this.AutoNumberField != value) {
      this.AutoNumberField = value;
      // this.RaisePropertyChanged("AutoNumber");
    }
  }

  get PrescriberRoleName(): string {
    return this.PrescriberRoleNameField;
  }
  set PrescriberRoleName(value: string) {
    if (JSON.stringify(this.PrescriberRoleNameField) != JSON.stringify(value)) {
      this.PrescriberRoleNameField = value;
      // this.RaisePropertyChanged("PrescriberRoleName");
    }
  }

  get TotalSeqCount(): number {
    return this.TotalSeqCountField;
  }
  set TotalSeqCount(value: number) {
    if (this.TotalSeqCountField != value) {
      this.TotalSeqCountField = value;
      // this.RaisePropertyChanged("TotalSeqCount");
    }
  }

  get IsConditionalExists(): boolean {
    return this.IsConditionalExistsField;
  }
  set IsConditionalExists(value: boolean) {
    if (this.IsConditionalExistsField != value) {
      this.IsConditionalExistsField = value;
      // this.RaisePropertyChanged("IsConditionalExists");
    }
  }

  get VMVPLorenzoID(): string {
    return this.VMVPLorenzoIDField;
  }
  set VMVPLorenzoID(value: string) {
    if (JSON.stringify(this.VMVPLorenzoIDField) != JSON.stringify(value)) {
      this.VMVPLorenzoIDField = value;
      // this.RaisePropertyChanged("VMVPLorenzoID");
    }
  }

  get VMVPIdentifyingName(): string {
    return this.VMVPIdentifyingNameField;
  }
  set VMVPIdentifyingName(value: string) {
    if (
      JSON.stringify(this.VMVPIdentifyingNameField) != JSON.stringify(value)
    ) {
      this.VMVPIdentifyingNameField = value;
      // this.RaisePropertyChanged("VMVPIdentifyingName");
    }
  }

  get DaysOfWeeks() {
    return this.DaysOfWeeksField;
  }
  set DaysOfWeeks(value) {
    if (JSON.stringify(this.DaysOfWeeksField) != JSON.stringify(value)) {
      this.DaysOfWeeksField = value;
      // this.RaisePropertyChanged("DaysOfWeeks");
    }
  }

  get DrugFreqUOMCode(): string {
    return this.DrugFreqUOMCodeField;
  }
  set DrugFreqUOMCode(value: string) {
    if (JSON.stringify(this.DrugFreqUOMCodeField) != JSON.stringify(value)) {
      this.DrugFreqUOMCodeField = value;
      // this.RaisePropertyChanged("DrugFreqUOMCode");
    }
  }

  //AC 69115 - IsWardStock icon for MCI child items
  get IsWardStockForChildMCI(): boolean {
    return this.IsWardStockForChildMCIField;
  }
  set IsWardStockForChildMCI(value: boolean) {
    if (this.IsWardStockForChildMCIField != value) {
      this.IsWardStockForChildMCIField = value;
      // this.RaisePropertyChanged("IsWardStockForChildMCI");
    }
  }
}

export class DoseCalculatorDetails extends CLZOObject {
  private PatientHeightField = '';
  private PatientWeightField = '';
  private BSAFormulaField = '';
  private BSAValueField = '';
  private UpdatePatientRecordField = '';
  private IsDailyDoseField = '';
  private RequestDoseField = '';
  private RequestDoseUOMOIDField = 0;
  private RequestDoseUOMNameField = '';
  private RequestDosePerField = '';
  private CalculatedDoseField = '';
  private OrderedPerDoseField = '';
  private RoundedToField = '';
  private OrderedPerDayField = '';
  private OverrideReasonField = '';
  private ISAlwaysuseDosecalcField = '';
  private USSGestationDaysField = '';

  get PatientHeight(): string {
    return this.PatientHeightField;
  }
  set PatientHeight(value: string) {
    if (JSON.stringify(this.PatientHeightField) != JSON.stringify(value)) {
      this.PatientHeightField = value;
      // this.RaisePropertyChanged("PatientHeight");
    }
  }

  get PatientWeight(): string {
    return this.PatientWeightField;
  }
  set PatientWeight(value: string) {
    if (JSON.stringify(this.PatientWeightField) != JSON.stringify(value)) {
      this.PatientWeightField = value;
      // this.RaisePropertyChanged("PatientWeight");
    }
  }

  get BSAFormula(): string {
    return this.BSAFormulaField;
  }
  set BSAFormula(value: string) {
    if (JSON.stringify(this.BSAFormulaField) != JSON.stringify(value)) {
      this.BSAFormulaField = value;
      // this.RaisePropertyChanged("BSAFormula");
    }
  }

  get BSAValue(): string {
    return this.BSAValueField;
  }
  set BSAValue(value: string) {
    if (JSON.stringify(this.BSAValueField) != JSON.stringify(value)) {
      this.BSAValueField = value;
      // this.RaisePropertyChanged("BSAValue");
    }
  }

  get UpdatePatientRecord() {
    return this.UpdatePatientRecordField;
  }
  set UpdatePatientRecord(value) {
    if (this.UpdatePatientRecordField != value) {
      this.UpdatePatientRecordField = value;
      // this.RaisePropertyChanged("UpdatePatientRecord");
    }
  }

  get IsDailyDose(): string {
    return this.IsDailyDoseField;
  }
  set IsDailyDose(value: string) {
    if (this.IsDailyDoseField != value) {
      this.IsDailyDoseField = value;
      // this.RaisePropertyChanged("IsDailyDose");
    }
  }

  get RequestDose(): string {
    return this.RequestDoseField;
  }
  set RequestDose(value: string) {
    if (JSON.stringify(this.RequestDoseField) != JSON.stringify(value)) {
      this.RequestDoseField = value;
      // this.RaisePropertyChanged("RequestDose");
    }
  }

  get RequestDoseUOMOID(): number {
    return this.RequestDoseUOMOIDField;
  }
  set RequestDoseUOMOID(value: number) {
    if (this.RequestDoseUOMOIDField != value) {
      this.RequestDoseUOMOIDField = value;
      // this.RaisePropertyChanged("RequestDoseUOMOID");
    }
  }

  get RequestDoseUOMName(): string {
    return this.RequestDoseUOMNameField;
  }
  set RequestDoseUOMName(value: string) {
    if (JSON.stringify(this.RequestDoseUOMNameField) != JSON.stringify(value)) {
      this.RequestDoseUOMNameField = value;
      // this.RaisePropertyChanged("RequestDoseUOMName");
    }
  }

  get RequestDosePer(): string {
    return this.RequestDosePerField;
  }
  set RequestDosePer(value: string) {
    if (JSON.stringify(this.RequestDosePerField) != JSON.stringify(value)) {
      this.RequestDosePerField = value;
      // this.RaisePropertyChanged("RequestDosePer");
    }
  }

  get CalculatedDose(): string {
    return this.CalculatedDoseField;
  }
  set CalculatedDose(value: string) {
    if (JSON.stringify(this.CalculatedDoseField) != JSON.stringify(value)) {
      this.CalculatedDoseField = value;
      // this.RaisePropertyChanged("CalculatedDose");
    }
  }

  get OrderedPerDose() {
    return this.OrderedPerDoseField;
  }
  set OrderedPerDose(value) {
    if (JSON.stringify(this.OrderedPerDoseField) != JSON.stringify(value)) {
      this.OrderedPerDoseField = value;
      // this.RaisePropertyChanged("OrderedPerDose");
    }
  }

  get RoundedTo(): string {
    return this.RoundedToField;
  }
  set RoundedTo(value: string) {
    if (JSON.stringify(this.RoundedToField) != JSON.stringify(value)) {
      this.RoundedToField = value;
      // this.RaisePropertyChanged("RoundedTo");
    }
  }

  get OrderedPerDay(): string {
    return this.OrderedPerDayField;
  }
  set OrderedPerDay(value: string) {
    if (JSON.stringify(this.OrderedPerDayField) != JSON.stringify(value)) {
      this.OrderedPerDayField = value;
      // this.RaisePropertyChanged("OrderedPerDay");
    }
  }

  get OverrideReason(): string {
    return this.OverrideReasonField;
  }
  set OverrideReason(value: string) {
    if (JSON.stringify(this.OverrideReasonField) != JSON.stringify(value)) {
      this.OverrideReasonField = value;
      // this.RaisePropertyChanged("OverrideReason");
    }
  }

  get ISAlwaysuseDosecalc(): string {
    return this.ISAlwaysuseDosecalcField;
  }
  set ISAlwaysuseDosecalc(value: string) {
    if (JSON.stringify(this.ISAlwaysuseDosecalcField) != JSON.stringify(value))
      this.ISAlwaysuseDosecalcField = value;
    // this.RaisePropertyChanged("ISAlwaysuseDosecalc");
  }

  get USSGestationDays(): string {
    return this.USSGestationDaysField;
  }
  set USSGestationDays(value: string) {
    if (JSON.stringify(this.USSGestationDaysField) != JSON.stringify(value)) {
      this.USSGestationDaysField = value;
      // this.RaisePropertyChanged("USSGestationDays");
    }
  }
}

export class MedicationConflictConfig extends CLZOObject {
  private DisplayConflictsField = '';

  private OIDField = 0;

  private IsReadOnlyField = '';

  private ModifiedAtField = new Date();

  private oMedicationConflictConfigDataField:MedConflictConfigData= new MedConflictConfigData();

  get DisplayConflicts(): string {
    return this.DisplayConflictsField;
  }
  set DisplayConflicts(value: string) {
    if (this.DisplayConflictsField != value) {
      this.DisplayConflictsField = value;
      // this.RaisePropertyChanged("DisplayConflicts");
    }
  }

  get OID() {
    return this.OIDField;
  }
  set OID(value) {
    if (this.OIDField != value) {
      this.OIDField = value;
      // this.RaisePropertyChanged("OID");
    }
  }

  get IsReadOnly(): string {
    return this.IsReadOnlyField;
  }
  set IsReadOnly(value: string) {
    if (JSON.stringify(this.IsReadOnlyField) != JSON.stringify(value)) {
      this.IsReadOnlyField = value;
      // this.RaisePropertyChanged("IsReadOnly");
    }
  }

  get ModifiedAt() {
    return this.ModifiedAtField;
  }
  set ModifiedAt(value) {
    if (this.ModifiedAtField != value) {
      this.ModifiedAtField = value;
      // this.RaisePropertyChanged("ModifiedAt");
    }
  }

  get oMedicationConflictConfigData() {
    return this.oMedicationConflictConfigDataField;
  }
  set oMedicationConflictConfigData(value) {
    if (
      JSON.stringify(this.oMedicationConflictConfigDataField) !=
      JSON.stringify(value)
    ) {
      this.oMedicationConflictConfigDataField = value;
      // this.RaisePropertyChanged("oMedicationConflictConfigData");
    }
  }
}

export class MedConflictConfigData extends CLZOObject {
  private OIDField = 0;
  private ConflictTypeField = '';
  private ConflictSubTypeField = '';
  private BehaviourTypeField = '';
  private TypeColorCodeField = '';
  private DisplaySeqNumberField = 0;
  private ModifiedAtField = new Date();

  get OID(): number {
    return this.OIDField;
  }
  set OID(value: number) {
    if (this.OIDField != value) {
      this.OIDField = value;
      // this.RaisePropertyChanged("OID");
    }
  }

  get ConflictType(): string {
    return this.ConflictTypeField;
  }
  set ConflictType(value: string) {
    if (JSON.stringify(this.ConflictTypeField) != JSON.stringify(value)) {
      this.ConflictTypeField = value;
      // this.RaisePropertyChanged("ConflictType");
    }
  }

  get ConflictSubType(): string {
    return this.ConflictSubTypeField;
  }
  set ConflictSubType(value: string) {
    if (JSON.stringify(this.ConflictSubTypeField) != JSON.stringify(value)) {
      this.ConflictSubTypeField = value;
      // this.RaisePropertyChanged("ConflictSubType");
    }
  }

  get BehaviourType(): string {
    return this.BehaviourTypeField;
  }
  set BehaviourType(value: string) {
    if (JSON.stringify(this.BehaviourTypeField) != JSON.stringify(value)) {
      this.BehaviourTypeField = value;
      // this.RaisePropertyChanged("BehaviourType");
    }
  }

  get TypeColorCode(): string {
    return this.TypeColorCodeField;
  }
  set TypeColorCode(value: string) {
    if (JSON.stringify(this.TypeColorCodeField) != JSON.stringify(value)) {
      this.TypeColorCodeField = value;
      // this.RaisePropertyChanged("TypeColorCode");
    }
  }

  get DisplaySeqNumber(): number {
    return this.DisplaySeqNumberField;
  }
  set DisplaySeqNumber(value: number) {
    if (this.DisplaySeqNumberField != value) {
      this.DisplaySeqNumberField = value;
      // this.RaisePropertyChanged("DisplaySeqNumber");
    }
  }

  get ModifiedAt() {
    return this.ModifiedAtField;
  }
  set ModifiedAt(value) {
    if (this.ModifiedAtField != value) {
      this.ModifiedAtField = value;
      // this.RaisePropertyChanged("ModifiedAt");
    }
  }
}

export class DRCConfigData extends CLZOObject {
  private OIDField = 0;

  private DRCTypeField = '';

  private DRCTypeDescField = '';

  private DRCSubTypeField = '';

  private DRCSubTypeDescField = '';

  private BehaviourTypeField = '';

  private BehaviourTypeDescField = '';

  private IsDisplayDRCConflictField = '';

  private DisplaySeqNumberField = 0;
  //Sameer TFS 60225 Start
  private IsOpenDRCTabField = '';
  //Sameer TFS 60225 End

  get OID(): number {
    return this.OIDField;
  }
  set OID(value: number) {
    if (this.OIDField != value) {
      this.OIDField = value;
      // this.RaisePropertyChanged("OID");
    }
  }

  get DRCType(): string {
    return this.DRCTypeField;
  }
  set DRCType(value: string) {
    if (JSON.stringify(this.DRCTypeField) != JSON.stringify(value)) {
      this.DRCTypeField = value;
      // this.RaisePropertyChanged("DRCType");
    }
  }

  get DRCTypeDesc(): string {
    return this.DRCTypeDescField;
  }
  set DRCTypeDesc(value: string) {
    if (JSON.stringify(this.DRCTypeDescField) != JSON.stringify(value)) {
      this.DRCTypeDescField = value;
      // this.RaisePropertyChanged("DRCTypeDesc");
    }
  }

  get DRCSubType(): string {
    return this.DRCSubTypeField;
  }
  set DRCSubType(value: string) {
    if (JSON.stringify(this.DRCSubTypeField) != JSON.stringify(value)) {
      this.DRCSubTypeField = value;
      // this.RaisePropertyChanged("DRCSubType");
    }
  }

  get DRCSubTypeDesc(): string {
    return this.DRCSubTypeDescField;
  }
  set DRCSubTypeDesc(value: string) {
    if (JSON.stringify(this.DRCSubTypeDescField) != JSON.stringify(value)) {
      this.DRCSubTypeDescField = value;
      // this.RaisePropertyChanged("DRCSubTypeDesc");
    }
  }

  get BehaviourType(): string {
    return this.BehaviourTypeField;
  }
  set BehaviourType(value: string) {
    if (JSON.stringify(this.BehaviourTypeField) != JSON.stringify(value)) {
      this.BehaviourTypeField = value;
      // this.RaisePropertyChanged("BehaviourType");
    }
  }

  get BehaviourTypeDesc(): string {
    return this.BehaviourTypeDescField;
  }
  set BehaviourTypeDesc(value: string) {
    if (JSON.stringify(this.BehaviourTypeDescField) != JSON.stringify(value)) {
      this.BehaviourTypeDescField = value;
      // this.RaisePropertyChanged("BehaviourTypeDesc");
    }
  }

  get IsDisplayDRCConflict(): string {
    return this.IsDisplayDRCConflictField;
  }
  set IsDisplayDRCConflict(value: string) {
    if (
      JSON.stringify(this.IsDisplayDRCConflictField) != JSON.stringify(value)
    ) {
      this.IsDisplayDRCConflictField = value;
      // this.RaisePropertyChanged("IsDisplayDRCConflict");
    }
  }

  get DisplaySeqNumber(): number {
    return this.DisplaySeqNumberField;
  }
  set DisplaySeqNumber(value: number) {
    if (this.DisplaySeqNumberField != value) {
      this.DisplaySeqNumberField = value;
      // this.RaisePropertyChanged("DisplaySeqNumber");
    }
  }

  get IsOpenDRCTab(): string {
    return this.IsOpenDRCTabField;
  }
  set IsOpenDRCTab(value: string) {
    if (JSON.stringify(this.IsOpenDRCTabField) != JSON.stringify(value)) {
      this.IsOpenDRCTabField = value;
      // this.RaisePropertyChanged("IsOpenDRCTab");
    }
  }

  //Sameer TFS 60225 End
}

export class TitratedDoseRegime extends CLZOObject {
  private DoseField = '';
  private scheduleDTTMField = new Date();
  private DoseUOMOIDField = '';
  private ScheduletimeField = '';

  get Dose(): string {
    return this.DoseField;
  }
  set Dose(value: string) {
    if (JSON.stringify(this.DoseField) != JSON.stringify(value)) {
      this.DoseField = value;
      // this.RaisePropertyChanged("Dose");
    }
  }

  get scheduleDTTM() {
    return this.scheduleDTTMField;
  }
  set scheduleDTTM(value) {
    if (this.scheduleDTTMField != value) {
      this.scheduleDTTMField = value;
      // this.RaisePropertyChanged("scheduleDTTM");
    }
  }

  get DoseUOMOID(): string {
    return this.DoseUOMOIDField;
  }
  set DoseUOMOID(value: string) {
    if (this.DoseUOMOIDField != value) {
      this.DoseUOMOIDField = value;
      // this.RaisePropertyChanged("DoseUOMOID");
    }
  }

  get Scheduletime(): string {
    return this.ScheduletimeField;
  }
  set Scheduletime(value: string) {
    if (JSON.stringify(this.ScheduletimeField) != JSON.stringify(value)) {
      this.ScheduletimeField = value;
      // this.RaisePropertyChanged("Scheduletime");
    }
  }
}

export class DoseRegime extends CLZOObject {
  private LowerDoseField = 0;
  private UpperDoseField = 0;
  private DoseUOMField: any;
  private DurationField = '';
  private QuantityField = '';
  private DirectionField = '';
  private PrescibableItemOIDField = 0;
  private StartDTTMField = new Date();
  private EndDTTMField = new Date();
  private LowerObservationRangeField = 0;
  private UpperObservationRangeField = 0;
  private ObservationRangeUOMField:UOM= new UOM();
  private DosingInstructionField = '';
  private FrequencyDetailsField:FrequencyDetails= new FrequencyDetails();
  private DurationUOMCodeField = '';
  private InfusionDetailsField: DoseRegimeInfusionDetail[] = [];
  private PrescribableItemDoseOIDField = 0;
  private administeredTimeAndDoseDetailsField: AdministeredTimeDoseDetail[] =
    [];
  private TitratedDoseInstructionsField = '';
  private TitratedDoseAdtnlCommentsField = '';
  private TitratedDoseInstructionField:ObjectInfo = new ObjectInfo();
  private IsHavingAdminTimeField = '';
  private IsStartFromNextDayField = false;
  //BNS Fix
  private vDosageScheduleTimesField=0;

  get vDosageScheduleTimes() {
    return this.vDosageScheduleTimesField;
  }
  set vDosageScheduleTimes(value) {
    {
      this.vDosageScheduleTimesField = value;
      // this.RaisePropertyChanged("vDosageScheduleTimes");
    }
  }

  get LowerDose(): number {
    return this.LowerDoseField;
  }
  set LowerDose(value: number) {
    if (this.LowerDoseField != value) {
      this.LowerDoseField = value;
      // this.RaisePropertyChanged("LowerDose");
    }
  }

  get UpperDose(): number {
    return this.UpperDoseField;
  }
  set UpperDose(value: number) {
    if (this.UpperDoseField != value) {
      this.UpperDoseField = value;
      // this.RaisePropertyChanged("UpperDose");
    }
  }

  get DoseUOM() {
    return this.DoseUOMField;
  }
  set DoseUOM(value) {
    if (JSON.stringify(this.DoseUOMField) != JSON.stringify(value)) {
      this.DoseUOMField = value;
      // this.RaisePropertyChanged("DoseUOM");
    }
  }

  get Duration() {
    return this.DurationField;
  }
  set Duration(value) {
    if (JSON.stringify(this.DurationField) != JSON.stringify(value)) {
      this.DurationField = value;
      // this.RaisePropertyChanged("Duration");
    }
  }

  get Quantity() {
    return this.QuantityField;
  }
  set Quantity(value) {
    if (JSON.stringify(this.QuantityField) != JSON.stringify(value)) {
      this.QuantityField = value;
      // this.RaisePropertyChanged("Quantity");
    }
  }

  get Direction() {
    return this.DirectionField;
  }
  set Direction(value) {
    if (JSON.stringify(this.DirectionField) != JSON.stringify(value)) {
      this.DirectionField = value;
      // this.RaisePropertyChanged("Direction");
    }
  }

  get PrescibableItemOID(): number {
    return this.PrescibableItemOIDField;
  }
  set PrescibableItemOID(value: number) {
    if (this.PrescibableItemOIDField != value) {
      this.PrescibableItemOIDField = value;
      // this.RaisePropertyChanged("PrescibableItemOID");
    }
  }

  get StartDTTM() {
    return this.StartDTTMField;
  }
  set StartDTTM(value) {
    if (this.StartDTTMField != value) {
      this.StartDTTMField = value;
      // this.RaisePropertyChanged("StartDTTM");
    }
  }

  get EndDTTM() {
    return this.EndDTTMField;
  }
  set EndDTTM(value) {
    if (this.EndDTTMField != value) {
      this.EndDTTMField = value;
      // this.RaisePropertyChanged("EndDTTM");
    }
  }

  get LowerObservationRange(): number {
    return this.LowerObservationRangeField;
  }
  set LowerObservationRange(value: number) {
    if (this.LowerObservationRangeField != value) {
      this.LowerObservationRangeField = value;
      // this.RaisePropertyChanged("LowerObservationRange");
    }
  }

  get UpperObservationRange(): number {
    return this.UpperObservationRangeField;
  }
  set UpperObservationRange(value: number) {
    if (this.UpperObservationRangeField != value) {
      this.UpperObservationRangeField = value;
      // this.RaisePropertyChanged("UpperObservationRange");
    }
  }

  get ObservationRangeUOM() {
    return this.ObservationRangeUOMField;
  }
  set ObservationRangeUOM(value) {
    if (
      JSON.stringify(this.ObservationRangeUOMField) != JSON.stringify(value)
    ) {
      this.ObservationRangeUOMField = value;
      // this.RaisePropertyChanged("ObservationRangeUOM");
    }
  }

  get DosingInstruction(): string {
    return this.DosingInstructionField;
  }
  set DosingInstruction(value: string) {
    if (JSON.stringify(this.DosingInstructionField) != JSON.stringify(value)) {
      this.DosingInstructionField = value;
      // this.RaisePropertyChanged("DosingInstruction");
    }
  }

  get FrequencyDetails() {
    return this.FrequencyDetailsField;
  }
  set FrequencyDetails(value) {
    if (JSON.stringify(this.FrequencyDetailsField) != JSON.stringify(value)) {
      this.FrequencyDetailsField = value;
      // this.RaisePropertyChanged("FrequencyDetails");
    }
  }

  get DurationUOMCode() {
    return this.DurationUOMCodeField;
  }
  set DurationUOMCode(value) {
    if (JSON.stringify(this.DurationUOMCodeField) != JSON.stringify(value)) {
      this.DurationUOMCodeField = value;
      // this.RaisePropertyChanged("DurationUOMCode");
    }
  }

  get InfusionDetails(): DoseRegimeInfusionDetail[] {
    return this.InfusionDetailsField;
  }
  set InfusionDetails(value: DoseRegimeInfusionDetail[]) {
    if (JSON.stringify(this.InfusionDetailsField) != JSON.stringify(value)) {
      this.InfusionDetailsField = value;
      // this.RaisePropertyChanged("InfusionDetails");
    }
  }

  get PrescribableItemDoseOID(): number {
    return this.PrescribableItemDoseOIDField;
  }
  set PrescribableItemDoseOID(value: number) {
    if (this.PrescribableItemDoseOIDField != value) {
      this.PrescribableItemDoseOIDField = value;
      // this.RaisePropertyChanged("PrescribableItemDoseOID");
    }
  }

  get AdministeredTimeAndDoseDetails(): AdministeredTimeDoseDetail[] {
    return this.administeredTimeAndDoseDetailsField;
  }
  set AdministeredTimeAndDoseDetails(value: AdministeredTimeDoseDetail[]) {
    if (this.referenceEquals(this.administeredTimeAndDoseDetailsField, value)) {
      this.administeredTimeAndDoseDetailsField = value;
      // this.RaisePropertyChanged("AdministeredTimeAndDoseDetails");
    }
  }

  get TitratedDoseInstructions(): string {
    return this.TitratedDoseInstructionsField;
  }
  set TitratedDoseInstructions(value: string) {
    if (this.referenceEquals(this.TitratedDoseInstructionsField, value)) {
      this.TitratedDoseInstructionsField = value;
      // this.RaisePropertyChanged("TitratedDoseInstructions");
    }
  }

  get TitratedDoseAdtnlComments(): string {
    return this.TitratedDoseAdtnlCommentsField;
  }
  set TitratedDoseAdtnlComments(value: string) {
    if (this.referenceEquals(this.TitratedDoseAdtnlCommentsField, value)) {
      this.TitratedDoseAdtnlCommentsField = value;
      // this.RaisePropertyChanged("TitratedDoseAdtnlComments");
    }
  }

  get TitratedDoseInstruction() {
    return this.TitratedDoseInstructionField;
  }
  set TitratedDoseInstruction(value) {
    if (this.referenceEquals(this.TitratedDoseInstructionField, value)) {
      this.TitratedDoseInstructionField = value;
      // this.RaisePropertyChanged("TitratedDoseInstruction");
    }
  }

  get IsHavingAdminTime(): string {
    return this.IsHavingAdminTimeField;
  }
  set IsHavingAdminTime(value: string) {
    if (this.referenceEquals(this.IsHavingAdminTimeField, value)) {
      this.IsHavingAdminTimeField = value;
      //  this.RaisePropertyChanged("IsHavingAdminTime");
    }
  }

  get IsStartFromNextDay(): boolean {
    return this.IsStartFromNextDayField;
  }
  set IsStartFromNextDay(value: boolean) {
    if (this.IsStartFromNextDayField != value) {
      this.IsStartFromNextDayField = value;
      //  this.RaisePropertyChanged("IsStartFromNextDay");
    }
  }
}

export class ConditionalDoseRegime extends CLZOObject {
  private LowerValueField = '';
  private UpperValueField = '';
  private ValueUOMField:UOM= new UOM();
  private AddlItemTypeField = '';
  private AddlItemOIDField = 0;
  private DoseField = '';
  private DoseUOMField:UOM= new UOM();
  private InstructionField = '';
  private AddlItemNameField = '';
  private AddlItemCodeField = '';
  private ParentAddlItemCodeField = '';
  private RateField = '';
  private RateUOMOIDField:UOM= new UOM();
  private RateDenaminatorUOMOIDField:UOM= new UOM();
  private ValueRangeField = '';
  private ValueRangeOpratorTextField = '';
  private UpperDoseField = '';
  private UpperRateField = '';

  get LowerValue(): string {
    return this.LowerValueField;
  }
  set LowerValue(value: string) {
    if (this.referenceEquals(this.LowerValueField, value)) {
      this.LowerValueField = value;
      // this.RaisePropertyChanged("LowerValue");
    }
  }

  get UpperValue(): string {
    return this.UpperValueField;
  }
  set UpperValue(value: string) {
    if (this.referenceEquals(this.UpperValueField, value)) {
      this.UpperValueField = value;
      // this.RaisePropertyChanged("UpperValue");
    }
  }

  get ValueUOM() {
    return this.ValueUOMField;
  }
  set ValueUOM(value) {
    if (this.referenceEquals(this.ValueUOMField, value)) {
      this.ValueUOMField = value;
      // this.RaisePropertyChanged("ValueUOM");
    }
  }

  get AddlItemType(): string {
    return this.AddlItemTypeField;
  }
  set AddlItemType(value: string) {
    if (this.referenceEquals(this.AddlItemTypeField, value)) {
      this.AddlItemTypeField = value;
      // this.RaisePropertyChanged("AddlItemType");
    }
  }

  get AddlItemOID(): number {
    return this.AddlItemOIDField;
  }
  set AddlItemOID(value: number) {
    if (this.AddlItemOIDField != value) {
      this.AddlItemOIDField = value;
      // this.RaisePropertyChanged("AddlItemOID");
    }
  }

  get Dose(): string {
    return this.DoseField;
  }
  set Dose(value: string) {
    if (this.referenceEquals(this.DoseField, value)) {
      this.DoseField = value;
      // this.RaisePropertyChanged("Dose");
    }
  }

  get DoseUOM() {
    return this.DoseUOMField;
  }
  set DoseUOM(value) {
    if (this.referenceEquals(this.DoseUOMField, value)) {
      this.DoseUOMField = value;
      // this.RaisePropertyChanged("DoseUOM");
    }
  }

  get Instruction(): string {
    return this.InstructionField;
  }
  set Instruction(value: string) {
    if (this.referenceEquals(this.InstructionField, value)) {
      this.InstructionField = value;
      // this.RaisePropertyChanged("Instruction");
    }
  }

  get AddlItemName(): string {
    return this.AddlItemNameField;
  }
  set AddlItemName(value: string) {
    if (this.referenceEquals(this.AddlItemNameField, value)) {
      this.AddlItemNameField = value;
      // this.RaisePropertyChanged("AddlItemName");
    }
  }

  get AddlItemCode(): string {
    return this.AddlItemCodeField;
  }
  set AddlItemCode(value: string) {
    if (this.referenceEquals(this.AddlItemCodeField, value)) {
      this.AddlItemCodeField = value;
      // this.RaisePropertyChanged("AddlItemCode");
    }
  }

  get ParentAddlItemCode(): string {
    return this.ParentAddlItemCodeField;
  }
  set ParentAddlItemCode(value: string) {
    if (this.referenceEquals(this.ParentAddlItemCodeField, value)) {
      this.ParentAddlItemCodeField = value;
      // this.RaisePropertyChanged("ParentAddlItemCode");
    }
  }

  get Rate(): string {
    return this.RateField;
  }
  set Rate(value: string) {
    if (this.referenceEquals(this.RateField, value)) {
      this.RateField = value;
      // this.RaisePropertyChanged("Rate");
    }
  }

  get RateUOMOID() {
    return this.RateUOMOIDField;
  }
  set RateUOMOID(value) {
    if (this.referenceEquals(this.RateUOMOIDField, value)) {
      this.RateUOMOIDField = value;
      // this.RaisePropertyChanged("RateUOMOID");
    }
  }

  get RateDenaminatorUOMOID() {
    return this.RateDenaminatorUOMOIDField;
  }
  set RateDenaminatorUOMOID(value) {
    if (this.referenceEquals(this.RateDenaminatorUOMOIDField, value)) {
      this.RateDenaminatorUOMOIDField = value;
      // this.RaisePropertyChanged("RateDenaminatorUOMOID");
    }
  }

  get ValueRange(): string {
    return this.ValueRangeField;
  }
  set ValueRange(value: string) {
    if (this.referenceEquals(this.ValueRangeField, value)) {
      this.ValueRangeField = value;
      // this.RaisePropertyChanged("ValueRange");
    }
  }

  get ValueRangeOpratorText(): string {
    return this.ValueRangeOpratorTextField;
  }
  set ValueRangeOpratorText(value: string) {
    if (this.referenceEquals(this.ValueRangeOpratorTextField, value)) {
      this.ValueRangeOpratorTextField = value;
      // this.RaisePropertyChanged("ValueRangeOpratorText");
    }
  }

  get UpperDose(): string {
    return this.UpperDoseField;
  }
  set UpperDose(value: string) {
    if (this.referenceEquals(this.UpperDoseField, value)) {
      this.UpperDoseField = value;
      // this.RaisePropertyChanged("UpperDose");
    }
  }

  get UpperRate(): string {
    return this.UpperRateField;
  }
  set UpperRate(value: string) {
    if (this.referenceEquals(this.UpperRateField, value)) {
      this.UpperRateField = value;
      // this.RaisePropertyChanged("UpperRate");
    }
  }
}

export class PrescriptionItemDetails extends PrescriptionItem {
  private BasicPropertiesField:PresItemBasicProperties = new PresItemBasicProperties();
  private AdditionalPropertiesField:PresItemAdditionalProperties = new PresItemAdditionalProperties();
  private DrugSpecificPropertiesField:PresItemDrugProperties = new PresItemDrugProperties();
  private FormViewParametersField:PrescriptionItemFormViewParameters = new PrescriptionItemFormViewParameters();
  private MultiComponentDetailsField: IPPMCPresctiptionItem[] = [];
  private LegalCatField:any;
  private TechValidateDetailsField: TechnicalValidationInfo[] = [];
  private AdminDetailsField:PrescriptionItemAdminDetails= new PrescriptionItemAdminDetails();
  private WarningField: WarningDetails[] = [];
  private DoseCalculationField:DoseCalculatorDetails= new DoseCalculatorDetails();
  private ActionPerformedCodeField = '';
  private ActionPerformedField:PrescriptionItemAction= new PrescriptionItemAction();
  private IsMandatoryFilledField = false;
  private PrecriptionItemField = '';
  private OtherInformationField = '';
  private TrafficSymbolField = '';
  private CurrentUniqueIdField = '';
  private isMultiRouteCheckedField = false;
  private DRCConflictField: DRCConflict[] = [];
  private TitratedDoseinfoField:any;
  private ClerkFormViewDefaultCodeField = '';
  private OnlyDRCConflictsUpdateField = false;
  private IsDRCReasonMandatoryField = false;
  private IsDRCAcklgdeMandatoryField = false;
  private OriginalDRCDoseTypeCodeField = '';
  private IsChangedDRCDoseTypeForAmendField = false;
  private DRCBehaviourTypeField = '';
  private IsAmendDRCDataLoadedField = false;
  private IsAmendDRCRegenaratedField = false;
  private SequentialActionPerformCodeField = '';
  private IsSeqGroupHasDifferentStationaryTypeField = false;
  private DoseFormulaDetField:any;
  private IsDoseCalcPerformedInAmendField = false;
  private IsSequencePerformedInAmendField = false;
  private IssIDSNewMedsField = '';
  private PrescribableItemListIdnOIDField = 0;
  private PresItemDetailLzoIDField = '';
  private RecordadmindatetimeField = new Date();

    
    // public get Recordadmindatetime(): Date {
    //     return this.RecordadmindatetimeField;
    // }
    // public set Recordadmindatetime(value: Date)  {
    //     if ((this.RecordadmindatetimeField !== value)) {
    //         this.RecordadmindatetimeField = value;
    //         // this.RaisePropertyChanged("Recordadmindatetime");
    //     }
        
    // }
    
  get PresItemDetailLzoID(): string {
      return this.PresItemDetailLzoIDField;
  }
  set PresItemDetailLzoID(value: string)  {
      if (JSON.stringify(this.PresItemDetailLzoIDField) !== JSON.stringify(value)) {
          this.PresItemDetailLzoIDField = value;
          // this.RaisePropertyChanged("PresItemDetailLzoID");
      }
      
  }
    
  get PrescribableItemListIdnOID(): number {
      return this.PrescribableItemListIdnOIDField;
  }
  set PrescribableItemListIdnOID(value: number)  {
      if (this.PrescribableItemListIdnOIDField !== value) {
          this.PrescribableItemListIdnOIDField = value;
          // this.RaisePropertyChanged("PrescribableItemListIdnOID");
      }
  }


  get BasicProperties() {
    return this.BasicPropertiesField;
  }
  set BasicProperties(value) {
    if (this.referenceEquals(this.BasicPropertiesField, value)) {
      this.BasicPropertiesField = value;
      // this.RaisePropertyChanged("BasicProperties");
    }
  }

  get AdditionalProperties() {
    return this.AdditionalPropertiesField;
  }
  set AdditionalProperties(value) {
    if (this.referenceEquals(this.AdditionalPropertiesField, value)) {
      this.AdditionalPropertiesField = value;
      // this.RaisePropertyChanged("AdditionalProperties");
    }
  }

  get DrugSpecificProperties() {
    return this.DrugSpecificPropertiesField;
  }
  set DrugSpecificProperties(value) {
    if (this.referenceEquals(this.DrugSpecificPropertiesField, value)) {
      this.DrugSpecificPropertiesField = value;
      // this.RaisePropertyChanged("DrugSpecificProperties");
    }
  }

  get FormViewParameters() {
    return this.FormViewParametersField;
  }
  set FormViewParameters(value) {
    if (this.referenceEquals(this.FormViewParametersField, value)) {
      this.FormViewParametersField = value;
      // this.RaisePropertyChanged("FormViewParameters");
    }
  }

  get MultiComponentDetails() {
    return this.MultiComponentDetailsField;
  }
  set MultiComponentDetails(value) {
    if (this.referenceEquals(this.MultiComponentDetailsField, value)) {
      this.MultiComponentDetailsField = value;
      // this.RaisePropertyChanged("MultiComponentDetails");
    }
  }

  get LegalCat() {
    return this.LegalCatField;
  }
  set LegalCat(value) {
    if (this.referenceEquals(this.LegalCatField, value)) {
      this.LegalCatField = value;
      // this.RaisePropertyChanged("LegalCat");
    }
  }

  get TechValidateDetails() {
    return this.TechValidateDetailsField;
  }
  set TechValidateDetails(value) {
    if (this.referenceEquals(this.TechValidateDetailsField, value)) {
      this.TechValidateDetailsField = value;
      // this.RaisePropertyChanged("TechValidateDetails");
    }
  }

  get AdminDetails() {
    return this.AdminDetailsField;
  }
  set AdminDetails(value) {
    if (this.referenceEquals(this.AdminDetailsField, value)) {
      this.AdminDetailsField = value;
      // this.RaisePropertyChanged("AdminDetails");
    }
  }

  get Warning() {
    return this.WarningField;
  }
  set Warning(value) {
    if (this.referenceEquals(this.WarningField, value)) {
      this.WarningField = value;
      // this.RaisePropertyChanged("Warning");
    }
  }

  get DoseCalculation() {
    return this.DoseCalculationField;
  }
  set DoseCalculation(value) {
    if (this.referenceEquals(this.DoseCalculationField, value)) {
      this.DoseCalculationField = value;
      // this.RaisePropertyChanged("DoseCalculation");
    }
  }

  get ActionPerformedCode(): string {
    return this.ActionPerformedCodeField;
  }
  set ActionPerformedCode(value: string) {
    if (this.referenceEquals(this.ActionPerformedCodeField, value)) {
      this.ActionPerformedCodeField = value;
      // this.RaisePropertyChanged("ActionPerformedCode");
    }
  }

  get ActionPerformed() {
    return this.ActionPerformedField;
  }
  set ActionPerformed(value) {
    if (this.referenceEquals(this.ActionPerformedField, value)) {
      this.ActionPerformedField = value;
      // this.RaisePropertyChanged("ActionPerformed");
    }
  }

  get IsMandatoryFilled(): boolean {
    return this.IsMandatoryFilledField;
  }
  set IsMandatoryFilled(value: boolean) {
    if (this.IsMandatoryFilledField != value) {
      this.IsMandatoryFilledField = value;
      // this.RaisePropertyChanged("IsMandatoryFilled");
    }
  }

  get PrecriptionItem(): string {
    return this.PrecriptionItemField;
  }
  set PrecriptionItem(value: string) {
    if (this.referenceEquals(this.PrecriptionItemField, value)) {
      this.PrecriptionItemField = value;
      // this.RaisePropertyChanged("PrecriptionItem");
    }
  }

  get OtherInformation(): string {
    return this.OtherInformationField;
  }
  set OtherInformation(value: string) {
    if (this.referenceEquals(this.OtherInformationField, value)) {
      this.OtherInformationField = value;
      // this.RaisePropertyChanged("OtherInformation");
    }
  }

  get TrafficSymbol(): string {
    return this.TrafficSymbolField;
  }
  set TrafficSymbol(value: string) {
    if (this.referenceEquals(this.TrafficSymbolField, value)) {
      this.TrafficSymbolField = value;
      // this.RaisePropertyChanged("TrafficSymbol");
    }
  }

  get CurrentUniqueId(): string {
    return this.CurrentUniqueIdField;
  }
  set CurrentUniqueId(value: string) {
    if (this.referenceEquals(this.CurrentUniqueIdField, value)) {
      this.CurrentUniqueIdField = value;
      // this.RaisePropertyChanged("CurrentUniqueId");
    }
  }

  get isMultiRouteChecked(): boolean {
    return this.isMultiRouteCheckedField;
  }
  set isMultiRouteChecked(value: boolean) {
    if (this.isMultiRouteCheckedField != value) {
      this.isMultiRouteCheckedField = value;
      // this.RaisePropertyChanged("isMultiRouteChecked");
    }
  }

  get DRCConflict() {
    return this.DRCConflictField;
  }
  set DRCConflict(value) {
    if (this.referenceEquals(this.DRCConflictField, value)) {
      this.DRCConflictField = value;
      // this.RaisePropertyChanged("DRCConflict");
    }
  }

  get TitratedDoseinfo() {
    return this.TitratedDoseinfoField;
  }
  set TitratedDoseinfo(value) {
    if (this.referenceEquals(this.TitratedDoseinfoField, value)) {
      this.TitratedDoseinfoField = value;
      // this.RaisePropertyChanged("TitratedDoseinfo");
    }
  }

  get ClerkFormViewDefaultCode(): string {
    return this.ClerkFormViewDefaultCodeField;
  }
  set ClerkFormViewDefaultCode(value: string) {
    if (this.referenceEquals(this.ClerkFormViewDefaultCodeField, value)) {
      this.ClerkFormViewDefaultCodeField = value;
      // this.RaisePropertyChanged("ClerkFormViewDefaultCode");
    }
  }

  private AuditChangesField: PresItemAuditHistory[] = [];

  get AuditChanges(): PresItemAuditHistory[] {
    return this.AuditChangesField;
  }
  set AuditChanges(value: PresItemAuditHistory[]) {
    if (this.referenceEquals(this.AuditChangesField, value)) {
      this.AuditChangesField = value;
      // this.RaisePropertyChanged("AuditChanges");
    }
  }

  private AuditChangeReasonCodeField = '';
  get AuditChangeReasonCode(): string {
    return this.AuditChangeReasonCodeField;
  }
  set AuditChangeReasonCode(value: string) {
    if (this.referenceEquals(this.AuditChangeReasonCodeField, value)) {
      this.AuditChangeReasonCodeField = value;
      // this.RaisePropertyChanged("AuditChangeReasonCode");
    }
  }

  get OnlyDRCConflictsUpdate() {
    return this.OnlyDRCConflictsUpdateField;
  }
  set OnlyDRCConflictsUpdate(value) {
    if (this.OnlyDRCConflictsUpdateField != value) {
      this.OnlyDRCConflictsUpdateField = value;
      // this.RaisePropertyChanged("OnlyDRCConflictsUpdate");
    }
  }

  get IsDRCReasonMandatory(): boolean {
    return this.IsDRCReasonMandatoryField;
  }
  set IsDRCReasonMandatory(value: boolean) {
    if (this.IsDRCReasonMandatoryField != value) {
      this.IsDRCReasonMandatoryField = value;
      // this.RaisePropertyChanged("IsDRCReasonMandatory");
    }
  }

  get IsDRCAcklgdeMandatory(): boolean {
    return this.IsDRCAcklgdeMandatoryField;
  }
  set IsDRCAcklgdeMandatory(value: boolean) {
    if (this.IsDRCAcklgdeMandatoryField != value) {
      this.IsDRCAcklgdeMandatoryField = value;
      // this.RaisePropertyChanged("IsDRCAcklgdeMandatory");
    }
  }

  get OriginalDRCDoseTypeCode(): string {
    return this.OriginalDRCDoseTypeCodeField;
  }
  set OriginalDRCDoseTypeCode(value: string) {
    if (this.referenceEquals(this.OriginalDRCDoseTypeCodeField, value)) {
      this.OriginalDRCDoseTypeCodeField = value;
      // this.RaisePropertyChanged("OriginalDRCDoseTypeCode");
    }
  }

  get IsChangedDRCDoseTypeForAmend() {
    return this.IsChangedDRCDoseTypeForAmendField;
  }
  set IsChangedDRCDoseTypeForAmend(value) {
    if (this.IsChangedDRCDoseTypeForAmendField != value) {
      this.IsChangedDRCDoseTypeForAmendField = value;
      // this.RaisePropertyChanged("IsChangedDRCDoseTypeForAmend");
    }
  }

  get DRCBehaviourType(): string {
    return this.DRCBehaviourTypeField;
  }
  set DRCBehaviourType(value: string) {
    if (this.referenceEquals(this.DRCBehaviourTypeField, value)) {
      this.DRCBehaviourTypeField = value;
      // this.RaisePropertyChanged("DRCBehaviourType");
    }
  }

  get IsAmendDRCDataLoaded(): boolean {
    return this.IsAmendDRCDataLoadedField;
  }
  set IsAmendDRCDataLoaded(value: boolean) {
    if (this.IsAmendDRCDataLoadedField != value) {
      this.IsAmendDRCDataLoadedField = value;
      // this.RaisePropertyChanged("IsAmendDRCDataLoaded");
    }
  }

  get IsAmendDRCRegenarated(): boolean {
    return this.IsAmendDRCRegenaratedField;
  }
  set IsAmendDRCRegenarated(value: boolean) {
    if (this.IsAmendDRCRegenaratedField != value) {
      this.IsAmendDRCRegenaratedField = value;
      // this.RaisePropertyChanged("IsAmendDRCRegenarated");
    }
  }

  get SequentialActionPerformCode(): string {
    return this.SequentialActionPerformCodeField;
  }
  set SequentialActionPerformCode(value: string) {
    if (this.referenceEquals(this.SequentialActionPerformCodeField, value)) {
      this.SequentialActionPerformCodeField = value;
      // this.RaisePropertyChanged("SequentialActionPerformCode");
    }
  }

  get IsSeqGroupHasDifferentStationaryType(): boolean {
    return this.IsSeqGroupHasDifferentStationaryTypeField;
  }
  set IsSeqGroupHasDifferentStationaryType(value: boolean) {
    if (this.IsSeqGroupHasDifferentStationaryTypeField != value) {
      this.IsSeqGroupHasDifferentStationaryTypeField = value;
      // this.RaisePropertyChanged("IsSeqGroupHasDifferentStationaryType");
    }
  }

  get DoseFormulaDet() {
    return this.DoseFormulaDetField;
  }
  set DoseFormulaDet(value) {
    if (this.referenceEquals(this.DoseFormulaDetField, value)) {
      this.DoseFormulaDetField = value;
      // this.RaisePropertyChanged("DoseFormulaDet");
    }
  }

  get IsDoseCalcPerformedInAmend(): boolean {
    return this.IsDoseCalcPerformedInAmendField;
  }
  set IsDoseCalcPerformedInAmend(value: boolean) {
    if (this.IsDoseCalcPerformedInAmendField != value) {
      this.IsDoseCalcPerformedInAmendField = value;
      // this.RaisePropertyChanged("IsDoseCalcPerformedInAmend");
    }
  }

  get IsSequencePerformedInAmend(): boolean {
    return this.IsSequencePerformedInAmendField;
  }
  set IsSequencePerformedInAmend(value: boolean) {
    if (this.IsSequencePerformedInAmendField != value) {
      this.IsSequencePerformedInAmendField = value;
      // this.RaisePropertyChanged("IsSequencePerformedInAmend");
    }
  }

    
  // get IssIDSNewMeds(): string {
  //     return this.IssIDSNewMedsField;
  // }
  // set IssIDSNewMeds(value: string)  {
  //     if (!StringWrapper.compare(this.IssIDSNewMedsField, value)) {
  //         this.IssIDSNewMedsField = value;
  //         // this.RaisePropertyChanged("IssIDSNewMeds");
  //     }
      
  // }
}

export class WarningItems extends CLZOObject {
  private RowIDField = '';
  private DrugItemField:any;
  private DrugInteractionField: WarningDetails[] = [];
  private DrugDoublingField: WarningDetails[] = [];
  private DrugAllergyField: WarningDetails[] = [];
  private DrugMandatoryField: WarningDetails[] = [];
  private DrugContraIndicationField: WarningDetails[] = [];
  private DrugCrossReactionField: WarningDetails[] = [];
  private DrugAllergenNotIncludedField: WarningDetails[] = [];
  private SealingDetailsField: SealingDetails[] = [];

  get RowID(): string {
    return this.RowIDField;
  }
  set RowID(value: string) {
    if (this.referenceEquals(this.RowIDField, value) != true) {
      this.RowIDField = value;
      // this.RaisePropertyChanged("RowID");
    }
  }

  get DrugItem() {
    return this.DrugItemField;
  }
  set DrugItem(value) {
    if (this.referenceEquals(this.DrugItemField, value)) {
      this.DrugItemField = value;
      // this.RaisePropertyChanged("DrugItem");
    }
  }

  get DrugInteraction(): WarningDetails[] {
    return this.DrugInteractionField;
  }
  set DrugInteraction(value: WarningDetails[]) {
    if (this.referenceEquals(this.DrugInteractionField, value)) {
      this.DrugInteractionField = value;
      // this.RaisePropertyChanged("DrugInteraction");
    }
  }

  get DrugDoubling(): WarningDetails[] {
    return this.DrugDoublingField;
  }
  set DrugDoubling(value: WarningDetails[]) {
    if (this.referenceEquals(this.DrugDoublingField, value)) {
      this.DrugDoublingField = value;
      // this.RaisePropertyChanged("DrugDoubling");
    }
  }

  get DrugAllergy(): WarningDetails[] {
    return this.DrugAllergyField;
  }
  set DrugAllergy(value: WarningDetails[]) {
    if (this.referenceEquals(this.DrugAllergyField, value)) {
      this.DrugAllergyField = value;
      // this.RaisePropertyChanged("DrugAllergy");
    }
  }

  get DrugMandatory(): WarningDetails[] {
    return this.DrugMandatoryField;
  }
  set DrugMandatory(value: WarningDetails[]) {
    if (this.referenceEquals(this.DrugMandatoryField, value)) {
      this.DrugMandatoryField = value;
      // this.RaisePropertyChanged("DrugMandatory");
    }
  }

  get DrugContraIndication(): WarningDetails[] {
    return this.DrugContraIndicationField;
  }
  set DrugContraIndication(value: WarningDetails[]) {
    if (this.referenceEquals(this.DrugContraIndicationField, value)) {
      this.DrugContraIndicationField = value;
      // this.RaisePropertyChanged("DrugContraIndication");
    }
  }

  get DrugCrossReaction(): WarningDetails[] {
    return this.DrugCrossReactionField;
  }
  set DrugCrossReaction(value: WarningDetails[]) {
    if (this.referenceEquals(this.DrugCrossReactionField, value)) {
      this.DrugCrossReactionField = value;
      // this.RaisePropertyChanged("DrugCrossReaction");
    }
  }

  get DrugAllergenNotIncluded(): WarningDetails[] {
    return this.DrugAllergenNotIncludedField;
  }
  set DrugAllergenNotIncluded(value: WarningDetails[]) {
    if (this.referenceEquals(this.DrugAllergenNotIncludedField, value)) {
      this.DrugAllergenNotIncludedField = value;
      // this.RaisePropertyChanged("DrugAllergenNotIncluded");
    }
  }

  get SealingDetails() {
    return this.SealingDetailsField;
  }
  set SealingDetails(value) {
    if (this.referenceEquals(this.SealingDetailsField, value)) {
      this.SealingDetailsField = value;
      // this.RaisePropertyChanged("SealingDetails");
    }
  }
}
export class WarningDetails extends CLZOObject {
  private WarningOIDField = 0;
  private WarningTypeField = '';
  private WarningSubTypeField = '';
  private WarningMessageField = '';
  private WarningSeverityField = '';
  private WarningBehaviourTypeField = '';
  private AcknowledgeStatusField = '';
  private PrescriberCommentsField = '';
  private AuthroiserCommentsField = '';
  private ClinicallVeriferCommentsField = '';
  private ApplicableToField = '';
  private IsProblemField = false;
  private ProblemTextField = '';
  private PerformedOnField = new Date();
  private MessageFormatField:any;
  private PrescriptionItemField:ObjectInfo= new ObjectInfo();
  private ConflictMessageField = '';
  private DisplaySequenceNumberField = 0;
  private MonoGraphcontentOIDField = 0;
  private DrugMonoInfoOIDField = 0;
  private SourceDataProviderTypeField = '';
  private AllergyMsgTriggedField = '';
  private CodeField = '';
  private ConflictTypeField = '';
  private sFrstNotAlrgyCheckField = '';
  private IsSealField = '';
  private TypeColorCodeField = '';
  private PrescriptionDTTMField = new Date();
  private PrescriptionStartDTTMField = new Date();
  private MCChildIDTypeField = '';
  private MCChildIDNameField = '';
  private MCChildIDOIDField = 0;
  private DrugMulticomponentOIDField = 0;
  private UniqueMCRowIDField = 0;
  private HealthIssueCodeField = '';
  private HealthIssueTypeField = '';
  private IsMandatoryForOthersField = false;

  get WarningOID() {
    return this.WarningOIDField;
  }
  set WarningOID(value) {
    if (this.WarningOIDField != value) {
      this.WarningOIDField = value;
      // this.RaisePropertyChanged("WarningOID");
    }
  }

  get WarningType(): string {
    return this.WarningTypeField;
  }
  set WarningType(value: string) {
    if (this.referenceEquals(this.WarningTypeField, value)) {
      this.WarningTypeField = value;
      // this.RaisePropertyChanged("WarningType");
    }
  }

  get WarningSubType(): string {
    return this.WarningSubTypeField;
  }
  set WarningSubType(value: string) {
    if (this.referenceEquals(this.WarningSubTypeField, value)) {
      this.WarningSubTypeField = value;
      // this.RaisePropertyChanged("WarningSubType");
    }
  }

  get WarningMessage(): string {
    return this.WarningMessageField;
  }
  set WarningMessage(value: string) {
    if (this.referenceEquals(this.WarningMessageField, value)) {
      this.WarningMessageField = value;
      // this.RaisePropertyChanged("WarningMessage");
    }
  }

  get WarningSeverity(): string {
    return this.WarningSeverityField;
  }
  set WarningSeverity(value: string) {
    if (this.referenceEquals(this.WarningSeverityField, value)) {
      this.WarningSeverityField = value;
      // this.RaisePropertyChanged("WarningSeverity");
    }
  }

  get WarningBehaviourType(): string {
    return this.WarningBehaviourTypeField;
  }
  set WarningBehaviourType(value: string) {
    if (this.referenceEquals(this.WarningBehaviourTypeField, value)) {
      this.WarningBehaviourTypeField = value;
      // this.RaisePropertyChanged("WarningBehaviourType");
    }
  }

  get AcknowledgeStatus(): string {
    return this.AcknowledgeStatusField;
  }
  set AcknowledgeStatus(value: string) {
    if (this.referenceEquals(this.AcknowledgeStatusField, value)) {
      this.AcknowledgeStatusField = value;
      // this.RaisePropertyChanged("AcknowledgeStatus");
    }
  }

  get PrescriberComments(): string {
    return this.PrescriberCommentsField;
  }
  set PrescriberComments(value: string) {
    if (this.referenceEquals(this.PrescriberCommentsField, value)) {
      this.PrescriberCommentsField = value;
      // this.RaisePropertyChanged("PrescriberComments");
    }
  }

  get AuthroiserComments(): string {
    return this.AuthroiserCommentsField;
  }
  set AuthroiserComments(value: string) {
    if (this.referenceEquals(this.AuthroiserCommentsField, value)) {
      this.AuthroiserCommentsField = value;
      // this.RaisePropertyChanged("AuthroiserComments");
    }
  }
  get ClinicallVeriferComments(): string {
    return this.ClinicallVeriferCommentsField;
  }
  set ClinicallVeriferComments(value: string) {
    if (this.referenceEquals(this.ClinicallVeriferCommentsField, value)) {
      this.ClinicallVeriferCommentsField = value;
      // this.RaisePropertyChanged("ClinicallVeriferComments");
    }
  }

  get ApplicableTo(): string {
    return this.ApplicableToField;
  }
  set ApplicableTo(value: string) {
    if (this.referenceEquals(this.ApplicableToField, value)) {
      this.ApplicableToField = value;
      // this.RaisePropertyChanged("ApplicableTo");
    }
  }

  get IsProblem(): boolean {
    return this.IsProblemField;
  }
  set IsProblem(value: boolean) {
    if (this.IsProblemField != value) {
      this.IsProblemField = value;
      // this.RaisePropertyChanged("IsProblem");
    }
  }

  get ProblemText(): string {
    return this.ProblemTextField;
  }
  set ProblemText(value: string) {
    if (this.referenceEquals(this.ProblemTextField, value)) {
      this.ProblemTextField = value;
      // this.RaisePropertyChanged("ProblemText");
    }
  }

  get PerformedOn(): Date {
    return this.PerformedOnField;
  }
  set PerformedOn(value: Date) {
    if (this.PerformedOnField != value) {
      this.PerformedOnField = value;
      // this.RaisePropertyChanged("PerformedOn");
    }
  }

  get MessageFormat() {
    return this.MessageFormatField;
  }
  set MessageFormat(value) {
    if (this.referenceEquals(this.MessageFormatField, value)) {
      this.MessageFormatField = value;
      // this.RaisePropertyChanged("MessageFormat");
    }
  }

  get PrescriptionItem() {
    return this.PrescriptionItemField;
  }
  set PrescriptionItem(value) {
    if (this.referenceEquals(this.PrescriptionItemField, value)) {
      this.PrescriptionItemField = value;
      // this.RaisePropertyChanged("PrescriptionItem");
    }
  }

  get ConflictMessage(): string {
    return this.ConflictMessageField;
  }
  set ConflictMessage(value: string) {
    if (this.referenceEquals(this.ConflictMessageField, value)) {
      this.ConflictMessageField = value;
      // this.RaisePropertyChanged("ConflictMessage");
    }
  }

  get DisplaySequenceNumber(): number {
    return this.DisplaySequenceNumberField;
  }
  set DisplaySequenceNumber(value: number) {
    if (this.DisplaySequenceNumberField != value) {
      this.DisplaySequenceNumberField = value;
      // this.RaisePropertyChanged("DisplaySequenceNumber");
    }
  }

  get MonoGraphcontentOID(): number {
    return this.MonoGraphcontentOIDField;
  }
  set MonoGraphcontentOID(value: number) {
    if (this.MonoGraphcontentOIDField != value) {
      this.MonoGraphcontentOIDField = value;
      // this.RaisePropertyChanged("MonoGraphcontentOID");
    }
  }

  get DrugMonoInfoOID(): number {
    return this.DrugMonoInfoOIDField;
  }
  set DrugMonoInfoOID(value: number) {
    if (this.DrugMonoInfoOIDField != value) {
      this.DrugMonoInfoOIDField = value;
      // this.RaisePropertyChanged("DrugMonoInfoOID");
    }
  }

  get SourceDataProviderType(): string {
    return this.SourceDataProviderTypeField;
  }
  set SourceDataProviderType(value: string) {
    if (this.referenceEquals(this.SourceDataProviderTypeField, value)) {
      this.SourceDataProviderTypeField = value;
      // this.RaisePropertyChanged("SourceDataProviderType");
    }
  }

  get AllergyMsgTrigged(): string {
    return this.AllergyMsgTriggedField;
  }
  set AllergyMsgTrigged(value: string) {
    if (this.referenceEquals(this.AllergyMsgTriggedField, value)) {
      this.AllergyMsgTriggedField = value;
      // this.RaisePropertyChanged("AllergyMsgTrigged");
    }
  }

  get Code(): string {
    return this.CodeField;
  }
  set Code(value: string) {
    if (this.referenceEquals(this.CodeField, value)) {
      this.CodeField = value;
      // this.RaisePropertyChanged("Code");
    }
  }

  get ConflictType(): string {
    return this.ConflictTypeField;
  }
  set ConflictType(value: string) {
    if (this.referenceEquals(this.ConflictTypeField, value)) {
      this.ConflictTypeField = value;
      // this.RaisePropertyChanged("ConflictType");
    }
  }

  get sFrstNotAlrgyCheck(): string {
    return this.sFrstNotAlrgyCheckField;
  }
  set sFrstNotAlrgyCheck(value: string) {
    if (this.referenceEquals(this.sFrstNotAlrgyCheckField, value)) {
      this.sFrstNotAlrgyCheckField = value;
      // this.RaisePropertyChanged("sFrstNotAlrgyCheck");
    }
  }

  get IsSeal(): string {
    return this.IsSealField;
  }
  set IsSeal(value: string) {
    if (this.referenceEquals(this.IsSealField, value)) {
      this.IsSealField = value;
      // this.RaisePropertyChanged("IsSeal");
    }
  }

  get TypeColorCode(): string {
    return this.TypeColorCodeField;
  }
  set TypeColorCode(value: string) {
    if (this.referenceEquals(this.TypeColorCodeField, value)) {
      this.TypeColorCodeField = value;
      // this.RaisePropertyChanged("TypeColorCode");
    }
  }

  get PrescriptionDTTM(): Date {
    return this.PrescriptionDTTMField;
  }
  set PrescriptionDTTM(value: Date) {
    if (this.PrescriptionDTTMField != value) {
      this.PrescriptionDTTMField = value;
      // this.RaisePropertyChanged("PrescriptionDTTM");
    }
  }
  get PrescriptionStartDTTM() {
    return this.PrescriptionStartDTTMField;
  }
  set PrescriptionStartDTTM(value) {
    if (this.PrescriptionStartDTTMField != value) {
      this.PrescriptionStartDTTMField = value;
      // this.RaisePropertyChanged("PrescriptionStartDTTM");
    }
  }

  get MCChildIDType(): string {
    return this.MCChildIDTypeField;
  }
  set MCChildIDType(value: string) {
    if (this.referenceEquals(this.MCChildIDTypeField, value)) {
      this.MCChildIDTypeField = value;
      // this.RaisePropertyChanged("MCChildIDType");
    }
  }
  get MCChildIDName(): string {
    return this.MCChildIDNameField;
  }
  set MCChildIDName(value: string) {
    if (this.referenceEquals(this.MCChildIDNameField, value)) {
      this.MCChildIDNameField = value;
      // this.RaisePropertyChanged("MCChildIDName");
    }
  }

  get MCChildIDOID(): number {
    return this.MCChildIDOIDField;
  }
  set MCChildIDOID(value: number) {
    if (this.MCChildIDOIDField != value) {
      this.MCChildIDOIDField = value;
      // this.RaisePropertyChanged("MCChildIDOID");
    }
  }

  get DrugMulticomponentOID(): number {
    return this.DrugMulticomponentOIDField;
  }
  set DrugMulticomponentOID(value: number) {
    if (this.DrugMulticomponentOIDField != value) {
      this.DrugMulticomponentOIDField = value;
      // this.RaisePropertyChanged("DrugMulticomponentOID");
    }
  }

  get UniqueMCRowID(): number {
    return this.UniqueMCRowIDField;
  }
  set UniqueMCRowID(value: number) {
    if (this.UniqueMCRowIDField != value) {
      this.UniqueMCRowIDField = value;
      // this.RaisePropertyChanged("UniqueMCRowID");
    }
  }

  get HealthIssueCode(): string {
    return this.HealthIssueCodeField;
  }
  set HealthIssueCode(value: string) {
    if (this.referenceEquals(this.HealthIssueCodeField, value)) {
      this.HealthIssueCodeField = value;
      // this.RaisePropertyChanged("HealthIssueCode");
    }
  }

  get HealthIssueType(): string {
    return this.HealthIssueTypeField;
  }
  set HealthIssueType(value: string) {
    if (this.referenceEquals(this.HealthIssueTypeField, value)) {
      this.HealthIssueTypeField = value;
      // this.RaisePropertyChanged("HealthIssueType");
    }
  }

  get IsMandatoryForOthers(): boolean {
    return this.IsMandatoryForOthersField;
  }
  set IsMandatoryForOthers(value: boolean) {
    if (this.IsMandatoryForOthersField != value) {
      this.IsMandatoryForOthersField = value;
      // this.RaisePropertyChanged("IsMandatoryForOthers");
    }
  }
}

export class PresItemAuditHistory {
  private FieldNameField = '';
  private OldValueField = '';
  private NewValueField = '';

  referenceEquals(arg1:string, arg2:string) {
    return JSON.stringify(arg1) != JSON.stringify(arg2);
  }
  get FieldName(): string {
    return this.FieldNameField;
  }
  set FieldName(value: string) {
    if (this.referenceEquals(this.FieldNameField, value)) {
      this.FieldNameField = value;
      // this.RaisePropertyChanged("FieldName");
    }
  }

  get NewValue(): string {
    return this.NewValueField;
  }
  set NewValue(value: string) {
    if (this.referenceEquals(this.NewValueField, value)) {
      this.NewValueField = value;
      // this.RaisePropertyChanged("NewValue");
    }
  }

  get OldValue(): string {
    return this.OldValueField;
  }
  set OldValue(value: string) {
    if (this.referenceEquals(this.OldValueField, value)) {
      this.OldValueField = value;
      // this.RaisePropertyChanged("OldValue");
    }
  }
}

export class DrugItemBasicInfo extends DrugItemBasicData {
  private FormularyNotesField = '';
  private DrugPropertiesField: DrugProperty[] = [];
  private RequestedDoseField = '';
  private CommentsField = '';
  private PackSizeField = '';
  private IsFormularyField = '';
  private DoseRegimeField: DoseRegime[] = [];
  private MultiComponentItemsField = '';
  private CompPrepStatusCodeField = '';
  private MCUOMSField = '';
  private routesField: Route[] = [];
  private isAllowMultipleRouteField = '';
  private IsIgnoreEPresRuleAdminMethodField = false;
  private IsWardStockField = false;
  private IsAuthoriseField = false;

  get FormularyNotes(): string {
    return this.FormularyNotesField;
  }
  set FormularyNotes(value: string) {
    if (this.referenceEquals(this.FormularyNotesField, value)) {
      this.FormularyNotesField = value;
      // this.RaisePropertyChanged("FormularyNotes");
    }
  }

  get DrugProperties(): DrugProperty[] {
    return this.DrugPropertiesField;
  }
  set DrugProperties(value: DrugProperty[]) {
    if (this.referenceEquals(this.DrugPropertiesField, value)) {
      this.DrugPropertiesField = value;
      // this.RaisePropertyChanged("DrugProperties");
    }
  }

  get RequestedDose(): string {
    return this.RequestedDoseField;
  }
  set RequestedDose(value: string) {
    if (this.referenceEquals(this.RequestedDoseField, value)) {
      this.RequestedDoseField = value;
      // this.RaisePropertyChanged("RequestedDose");
    }
  }

  get Comments(): string {
    return this.CommentsField;
  }
  set Comments(value: string) {
    if (this.referenceEquals(this.CommentsField, value)) {
      this.CommentsField = value;
      // this.RaisePropertyChanged("Comments");
    }
  }

  get PackSize(): string {
    return this.PackSizeField;
  }
  set PackSize(value: string) {
    if (this.referenceEquals(this.PackSizeField, value)) {
      this.PackSizeField = value;
      // this.RaisePropertyChanged("PackSize");
    }
  }

  get IsFormulary(): string {
    return this.IsFormularyField;
  }
  set IsFormulary(value: string) {
    if (this.referenceEquals(this.IsFormularyField, value)) {
      this.IsFormularyField = value;
      // this.RaisePropertyChanged("IsFormulary");
    }
  }

  get DoseRegime(): DoseRegime[] {
    return this.DoseRegimeField;
  }
  set DoseRegime(value: DoseRegime[]) {
    if (this.referenceEquals(this.DoseRegimeField, value)) {
      this.DoseRegimeField = value;
      // this.RaisePropertyChanged("DoseRegime");
    }
  }

  get MultiComponentItems(): string {
    return this.MultiComponentItemsField;
  }
  set MultiComponentItems(value: string) {
    if (this.referenceEquals(this.MultiComponentItemsField, value)) {
      this.MultiComponentItemsField = value;
      // this.RaisePropertyChanged("MultiComponentItems");
    }
  }

  get CompPrepStatusCode(): string {
    return this.CompPrepStatusCodeField;
  }
  set CompPrepStatusCode(value: string) {
    if (this.referenceEquals(this.CompPrepStatusCodeField, value)) {
      this.CompPrepStatusCodeField = value;
      // this.RaisePropertyChanged("CompPrepStatusCode");
    }
  }

  get MCUOMS(): string {
    return this.MCUOMSField;
  }
  set MCUOMS(value: string) {
    if (this.referenceEquals(this.MCUOMSField, value)) {
      this.MCUOMSField = value;
      // this.RaisePropertyChanged("MCUOMS");
    }
  }

  get Routes(): Route[] {
    return this.routesField;
  }
  set Routes(value: Route[]) {
    if (this.referenceEquals(this.routesField, value)) {
      this.routesField = value;
      // this.RaisePropertyChanged("Routes");
    }
  }

  get IsAllowMultipleRoute(): string {
    return this.isAllowMultipleRouteField;
  }
  set IsAllowMultipleRoute(value: string) {
    if (this.referenceEquals(this.isAllowMultipleRouteField, value)) {
      this.isAllowMultipleRouteField = value;
      // this.RaisePropertyChanged("IsAllowMultipleRoute");
    }
  }

  get IsIgnoreEPresRuleAdminMethod(): boolean {
    return this.IsIgnoreEPresRuleAdminMethodField;
  }
  set IsIgnoreEPresRuleAdminMethod(value: boolean) {
    if (this.referenceEquals(this.IsIgnoreEPresRuleAdminMethodField, value)) {
      this.IsIgnoreEPresRuleAdminMethodField = value;
      // this.RaisePropertyChanged("IsIgnoreEPresRuleAdminMethod");
    }
  }

  get IsWardStock(): boolean {
    return this.IsWardStockField;
  }
  set IsWardStock(value: boolean) {
    if (this.referenceEquals(this.IsWardStockField, value)) {
      this.IsWardStockField = value;
      // this.RaisePropertyChanged("IsWardStock");
    }
  }

  get IsAuthorise(): boolean {
    return this.IsAuthoriseField;
  }
  set IsAuthorise(value: boolean) {
    if (this.referenceEquals(this.IsAuthoriseField, value)) {
      this.IsAuthoriseField = value;
      // this.RaisePropertyChanged("IsAuthorise");
    }
  }
}

export class GPConnectItemAdditionalDetail {
  private identifierField = '';

  private careSettingField = '';

  private encounterField = '';

  private statusField = '';

  private noOfRepeatAllowedField=0;

  private noOfRepeatIssuedField=0;

  private dispensePlannedField: GPConnectDispenseDetail[] = [];

  private dispenseIssuedField: GPConnectDispenseDetail[] = [];

  get Identifier(): string {
    return this.identifierField;
  }
  set Identifier(value: string) {
    this.identifierField = value;
    // this.RaisePropertyChanged("Identifier");
  }

  get CareSetting(): string {
    return this.careSettingField;
  }
  set CareSetting(value: string) {
    this.careSettingField = value;
    // this.RaisePropertyChanged("CareSetting");
  }

  get Encounter(): string {
    return this.encounterField;
  }
  set Encounter(value: string) {
    this.encounterField = value;
    // this.RaisePropertyChanged("Encounter");
  }

  get Status(): string {
    return this.statusField;
  }
  set Status(value: string) {
    this.statusField = value;
    // this.RaisePropertyChanged("Status");
  }

  get NoOfRepeatAllowed() {
    return this.noOfRepeatAllowedField;
  }
  set NoOfRepeatAllowed(value) {
    this.noOfRepeatAllowedField = value;
    // this.RaisePropertyChanged("NoOfRepeatAllowed");
  }

  get NoOfRepeatIssued() {
    return this.noOfRepeatIssuedField;
  }
  set NoOfRepeatIssued(value) {
    this.noOfRepeatIssuedField = value;
    // this.RaisePropertyChanged("NoOfRepeatIssued");
  }

  get DispensePlanned(): GPConnectDispenseDetail[] {
    return this.dispensePlannedField;
  }
  set DispensePlanned(value: GPConnectDispenseDetail[]) {
    this.dispensePlannedField = value;
    // this.RaisePropertyChanged("DispensePlanned");
  }

  get DispenseIssued(): GPConnectDispenseDetail[] {
    return this.dispenseIssuedField;
  }
  set DispenseIssued(value: GPConnectDispenseDetail[]) {
    this.dispenseIssuedField = value;
    // this.RaisePropertyChanged("DispenseIssued");
  }

  private _DosageLastChanged:Date= new Date();

  get DosageLastChanged() {
    return this._DosageLastChanged;
  }
  set DosageLastChanged(value) {
    this._DosageLastChanged = value;
    // this.RaisePropertyChanged("DosageLastChanged");
  }
}
export class PrescriptionItemFormViewParameters extends CLZOObject {
  private LineIndicatorField = 0;

  private AdminDeviceField = '';

  private AdministeredByCodeField = '';

  private IntravenousInfusionDataField:IntravenousInfusionDetails= new IntravenousInfusionDetails();

  private AdminDeviceDataField:AdminDeviceDetails = new AdminDeviceDetails();

  private INFTYCODEField = '';

  private ReviewAfterDTTMField:ObjectInfo = new ObjectInfo();

  private ReviewAfterField = '';

  private ReviewAfterUOMField:ObjectInfo = new ObjectInfo();

  private IsReviewafterReqField = false;

  private IsReviewAlertField = false;

  private ReviewCommentsField = '';

  private IsReviewExistsField = false;

  private ReviewRequestedByField = '';

  private ReviewTypeField = '';
  //sameer seq fix
  private IsReviewAvailableBeforeSequenceField = false;
  //
  private LastReviewedDTTMField:Date = new Date();
  //BNS SEQ NON-IV
  private SequenceDataField:SequenceDetails= new SequenceDetails();

  get LineIndicator(): number {
    return this.LineIndicatorField;
  }
  set LineIndicator(value: number) {
    if (this.LineIndicatorField != value) {
      this.LineIndicatorField = value;
      // this.RaisePropertyChanged("LineIndicator");
    }
  }

  get AdminDevice(): string {
    return this.AdminDeviceField;
  }
  set AdminDevice(value: string) {
    if (this.AdminDeviceField != value) {
      this.AdminDeviceField = value;
      // this.RaisePropertyChanged("AdminDevice");
    }
  }

  get AdministeredByCode(): string {
    return this.AdministeredByCodeField;
  }
  set AdministeredByCode(value: string) {
    if (this.AdministeredByCodeField == value) {
      this.AdministeredByCodeField = value;
      // this.RaisePropertyChanged("AdministeredByCode");
    }
  }

  get IntravenousInfusionData(): IntravenousInfusionDetails {
    return this.IntravenousInfusionDataField;
  }
  set IntravenousInfusionData(value: IntravenousInfusionDetails) {
    if (this.referenceEquals(this.IntravenousInfusionDataField, value)) {
      this.IntravenousInfusionDataField = value;
      // this.RaisePropertyChanged("IntravenousInfusionData");
    }
  }

  get AdminDeviceData() {
    return this.AdminDeviceDataField;
  }
  set AdminDeviceData(value) {
    if (this.referenceEquals(this.AdminDeviceDataField, value)) {
      this.AdminDeviceDataField = value;
      // this.RaisePropertyChanged("AdminDeviceData");
    }
  }

  get INFTYCODE(): string {
    return this.INFTYCODEField;
  }
  set INFTYCODE(value: string) {
    if (this.referenceEquals(this.INFTYCODEField, value)) {
      this.INFTYCODEField = value;
      // this.RaisePropertyChanged("INFTYCODE");
    }
  }

  get ReviewAfterDTTM() {
    return this.ReviewAfterDTTMField;
  }
  set ReviewAfterDTTM(value) {
    this.ReviewAfterDTTMField = value;
    // this.RaisePropertyChanged("ReviewAfterDTTM");
  }

  get ReviewAfter(): string {
    return this.ReviewAfterField;
  }
  set ReviewAfter(value: string) {
    this.ReviewAfterField = value;
    // this.RaisePropertyChanged("ReviewAfter");
  }

  get ReviewAfterUOM() {
    return this.ReviewAfterUOMField;
  }
  set ReviewAfterUOM(value) {
    this.ReviewAfterUOMField = value;
    // this.RaisePropertyChanged("ReviewAfterUOM");
  }

  get IsReviewafterReq(): boolean {
    return this.IsReviewafterReqField;
  }
  set IsReviewafterReq(value: boolean) {
    if (this.IsReviewafterReqField != value) {
      this.IsReviewafterReqField = value;
      // this.RaisePropertyChanged("IsReviewafterReq");
    }
  }
  get IsReviewAlert(): boolean {
    return this.IsReviewAlertField;
  }
  set IsReviewAlert(value: boolean) {
    if (this.IsReviewAlertField != value) {
      this.IsReviewAlertField = value;
      // this.RaisePropertyChanged("IsReviewAlert");
    }
  }

  get ReviewComments(): string {
    return this.ReviewCommentsField;
  }
  set ReviewComments(value: string) {
    this.ReviewCommentsField = value;
    // this.RaisePropertyChanged("ReviewComments");
  }

  get IsReviewExists(): boolean {
    return this.IsReviewExistsField;
  }
  set IsReviewExists(value: boolean) {
    if (this.IsReviewExistsField != value) {
      this.IsReviewExistsField = value;
      // this.RaisePropertyChanged("IsReviewExists");
    }
  }

  get ReviewRequestedBy(): string {
    return this.ReviewRequestedByField;
  }
  set ReviewRequestedBy(value: string) {
    this.ReviewRequestedByField = value;
    // this.RaisePropertyChanged("ReviewRequestedBy");
  }
  get ReviewType(): string {
    return this.ReviewTypeField;
  }
  set ReviewType(value: string) {
    this.ReviewTypeField = value;
    // this.RaisePropertyChanged("ReviewType");
  }

  get IsReviewAvailableBeforeSequence(): boolean {
    return this.IsReviewAvailableBeforeSequenceField;
  }
  set IsReviewAvailableBeforeSequence(value: boolean) {
    if (this.IsReviewAvailableBeforeSequenceField != value) {
      this.IsReviewAvailableBeforeSequenceField = value;
      // this.RaisePropertyChanged("IsReviewAvailableBeforeSequence");
    }
  }

  get LastReviewedDTTM() {
    return this.LastReviewedDTTMField;
  }
  set LastReviewedDTTM(value) {
    this.LastReviewedDTTMField = value;
    // this.RaisePropertyChanged("LastReviewedDTTM");
  }

  get SequenceData() {
    return this.SequenceDataField;
  }
  set SequenceData(value) {
    if (this.referenceEquals(this.SequenceDataField, value)) {
      this.SequenceDataField = value;
      // this.RaisePropertyChanged("SequenceData");
    }
  }
}

export class IPPPresItemBasicProperties extends PresItemBasicProperties {
  private StrengthTextField = '';
  private InstructionField = '';
  private ParentPrescriptionTypeField = '';
  private ParentPrescriptionItemOIDField = 0;
  private OrginalEndDTTMField:Date=new Date();
  private PrepStatusCodeField = '';
  private IsWardStockField = false;
  private IsSupplyRequestedField=0;
  private RequisitionCACodeField = '';
  private STKREQCodeField = '';
  private oRequisitionHistoryDetailsField:RequisitionHistoryDetails= new RequisitionHistoryDetails();
  private ReviewAfterDTTMField:Date = new Date();
  private ReviewAfterField = '';
  private ReviewAfterUOMField:ObjectInfo = new ObjectInfo();
  private RouteDeactivationField = '';
  private FormDeactivationField = '';
  private SiteDeActivatedField = '';
  private RequestDoseUOMDeActivatedField = '';
  private QuantityUOMDeActivatedField = '';
  private RatenumUOMDeActivatedField = '';
  private RatedinoUOMDeActivatedField = '';
  private BoosterdoseUOMDeActivatedField = '';
  private BolusUOMDeActivatedField = '';
  private IsReviewafterReqField = false;
//   private IsReviewAlertShownField = '';
  private LastReviewedDTTMField:Date=new Date();
  private IsPresItemIgnoreAdminMethodField = false;

  private StrengthDeactivationField = '';
  get StrengthText(): string {
    return this.StrengthTextField;
  }
  set StrengthText(value: string) {
    if (this.referenceEquals(this.StrengthTextField, value)) {
      this.StrengthTextField = value;
      // this.RaisePropertyChanged("StrengthText");
    }
  }
  get Instruction() {
    return this.InstructionField;
  }
  set Instruction(value) {
    if (this.referenceEquals(this.InstructionField, value)) {
      this.InstructionField = value;
      // this.RaisePropertyChanged("Instruction");
    }
  }
  get ParentPrescriptionType(): string {
    return this.ParentPrescriptionTypeField;
  }
  set ParentPrescriptionType(value: string) {
    if (this.referenceEquals(this.ParentPrescriptionTypeField, value)) {
      this.ParentPrescriptionTypeField = value;
      // this.RaisePropertyChanged("ParentPrescriptionType");
    }
  }

  get ParentPrescriptionItemOID(): number {
    return this.ParentPrescriptionItemOIDField;
  }
  set ParentPrescriptionItemOID(value: number) {
    if (this.ParentPrescriptionItemOIDField != value) {
      this.ParentPrescriptionItemOIDField = value;
      // this.RaisePropertyChanged("ParentPrescriptionItemOID");
    }
  }

  get OrginalEndDTTM() {
    return this.OrginalEndDTTMField;
  }
  set OrginalEndDTTM(value) {
    if (this.OrginalEndDTTMField != value) {
      this.OrginalEndDTTMField = value;
      // this.RaisePropertyChanged("OrginalEndDTTM");
    }
  }

  get PrepStatusCode(): string {
    return this.PrepStatusCodeField;
  }
  set PrepStatusCode(value: string) {
    if (this.referenceEquals(this.PrepStatusCodeField, value)) {
      this.PrepStatusCodeField = value;
      // this.RaisePropertyChanged("PrepStatusCode");
    }
  }

  get IsWardStock(): boolean {
    return this.IsWardStockField;
  }
  set IsWardStock(value: boolean) {
    if (this.IsWardStockField != value) {
      this.IsWardStockField = value;
      // this.RaisePropertyChanged("IsWardStock");
    }
  }

  get IsSupplyRequested() {
    return this.IsSupplyRequestedField;
  }
  set IsSupplyRequested(value) {
    if (this.IsSupplyRequestedField != value) {
      this.IsSupplyRequestedField = value;
      // this.RaisePropertyChanged("IsSupplyRequested");
    }
  }

  get RequisitionCACode() {
    return this.RequisitionCACodeField;
  }
  set RequisitionCACode(value) {
    if (this.referenceEquals(this.RequisitionCACodeField, value)) {
      this.RequisitionCACodeField = value;
      // this.RaisePropertyChanged("RequisitionCACode");
    }
  }

  get STKREQCode(): string {
    return this.STKREQCodeField;
  }
  set STKREQCode(value: string) {
    if (this.referenceEquals(this.STKREQCodeField, value)) {
      this.STKREQCodeField = value;
      // this.RaisePropertyChanged("STKREQCode");
    }
  }

  get oRequisitionHistoryDetails() {
    return this.oRequisitionHistoryDetailsField;
  }
  set oRequisitionHistoryDetails(value) {
    if (this.referenceEquals(this.oRequisitionHistoryDetailsField, value)) {
      this.oRequisitionHistoryDetailsField = value;
      // this.RaisePropertyChanged("oRequisitionHistoryDetails");
    }
  }

  get ReviewAfterDTTM() {
    return this.ReviewAfterDTTMField;
  }
  set ReviewAfterDTTM(value) {
    this.ReviewAfterDTTMField = value;
    // this.RaisePropertyChanged("ReviewAfterDTTM");
  }

  get ReviewAfter(): string {
    return this.ReviewAfterField;
  }
  set ReviewAfter(value: string) {
    this.ReviewAfterField = value;
    // this.RaisePropertyChanged("ReviewAfter");
  }

  get ReviewAfterUOM() {
    return this.ReviewAfterUOMField;
  }
  set ReviewAfterUOM(value) {
    this.ReviewAfterUOMField = value;
    // this.RaisePropertyChanged("ReviewAfterUOM");
  }

  get RouteDeactivation(): string {
    return this.RouteDeactivationField;
  }
  set RouteDeactivation(value: string) {
    if (this.referenceEquals(this.RouteDeactivationField, value)) {
      this.RouteDeactivationField = value;
      // this.RaisePropertyChanged("RouteDeactivation");
    }
  }

  get FormDeactivation(): string {
    return this.FormDeactivationField;
  }
  set FormDeactivation(value: string) {
    if (this.referenceEquals(this.FormDeactivationField, value)) {
      this.FormDeactivationField = value;
      // this.RaisePropertyChanged("FormDeactivation");
    }
  }

  get SiteDeActivated(): string {
    return this.SiteDeActivatedField;
  }
  set SiteDeActivated(value: string) {
    if (this.referenceEquals(this.SiteDeActivatedField, value)) {
      this.SiteDeActivatedField = value;
      // this.RaisePropertyChanged("SiteDeActivated");
    }
  }

  get RequestDoseUOMDeActivated(): string {
    return this.RequestDoseUOMDeActivatedField;
  }
  set RequestDoseUOMDeActivated(value: string) {
    if (this.referenceEquals(this.RequestDoseUOMDeActivatedField, value)) {
      this.RequestDoseUOMDeActivatedField = value;
      // this.RaisePropertyChanged("RequestDoseUOMDeActivated");
    }
  }

  get QuantityUOMDeActivated(): string {
    return this.QuantityUOMDeActivatedField;
  }
  set QuantityUOMDeActivated(value: string) {
    if (this.referenceEquals(this.QuantityUOMDeActivatedField, value)) {
      this.QuantityUOMDeActivatedField = value;
      // this.RaisePropertyChanged("QuantityUOMDeActivated");
    }
  }

  get RatenumUOMDeActivated(): string {
    return this.RatenumUOMDeActivatedField;
  }
  set RatenumUOMDeActivated(value: string) {
    if (this.referenceEquals(this.RatenumUOMDeActivatedField, value)) {
      this.RatenumUOMDeActivatedField = value;
      // this.RaisePropertyChanged("RatenumUOMDeActivated");
    }
  }

  get RatedinoUOMDeActivated(): string {
    return this.RatedinoUOMDeActivatedField;
  }
  set RatedinoUOMDeActivated(value: string) {
    if (this.referenceEquals(this.RatedinoUOMDeActivatedField, value)) {
      this.RatedinoUOMDeActivatedField = value;
      // this.RaisePropertyChanged("RatedinoUOMDeActivated");
    }
  }

  get BoosterdoseUOMDeActivated(): string {
    return this.BoosterdoseUOMDeActivatedField;
  }
  set BoosterdoseUOMDeActivated(value: string) {
    if (this.referenceEquals(this.BoosterdoseUOMDeActivatedField, value)) {
      this.BoosterdoseUOMDeActivatedField = value;
      // this.RaisePropertyChanged("BoosterdoseUOMDeActivated");
    }
  }

  get BolusUOMDeActivated(): string {
    return this.BolusUOMDeActivatedField;
  }
  set BolusUOMDeActivated(value: string) {
    if (this.referenceEquals(this.BolusUOMDeActivatedField, value)) {
      this.BolusUOMDeActivatedField = value;
      // this.RaisePropertyChanged("BolusUOMDeActivated");
    }
  }

  get IsReviewafterReq(): boolean {
    return this.IsReviewafterReqField;
  }
  set IsReviewafterReq(value: boolean) {
    if (this.referenceEquals(this.IsReviewafterReqField, value)) {
      this.IsReviewafterReqField = value;
      // this.RaisePropertyChanged("IsReviewafterReq");
    }
  }



  get LastReviewedDTTM() {
    return this.LastReviewedDTTMField;
  }
  set LastReviewedDTTM(value) {
    this.LastReviewedDTTMField = value;
    // this.RaisePropertyChanged("LastReviewedDTTM");
  }

  get IsPresItemIgnoreAdminMethod(): boolean {
    return this.IsPresItemIgnoreAdminMethodField;
  }
  set IsPresItemIgnoreAdminMethod(value: boolean) {
    if (this.referenceEquals(this.IsPresItemIgnoreAdminMethodField, value)) {
      this.IsPresItemIgnoreAdminMethodField = value;
      // this.RaisePropertyChanged("IsPresItemIgnoreAdminMethod");
    }
  }

  get StrengthDeactivation(): string {
    return this.StrengthDeactivationField;
  }
  set StrengthDeactivation(value: string) {
    if (this.referenceEquals(this.StrengthDeactivationField, value)) {
      this.StrengthDeactivationField = value;
      // this.RaisePropertyChanged("StrengthDeactivation");
    }
  }
}

export class PresItemDrugProperties extends CLZOObject {
  private CanDoseBeChangedField=0;

  private MandatoryCodeField = '';

  private ContraIndicationOIDField = 0;

  private HasProhibitedRouteField=0;

  private StrengthField:MeasurableObject = new MeasurableObject();

  private isParacetamolIngredientField = false;

  get CanDoseBeChanged() {
    return this.CanDoseBeChangedField;
  }
  set CanDoseBeChanged(value) {
    if (this.CanDoseBeChangedField != value) {
      this.CanDoseBeChangedField = value;
      // this.RaisePropertyChanged("CanDoseBeChanged");
    }
  }

  get MandatoryCode(): string {
    return this.MandatoryCodeField;
  }
  set MandatoryCode(value: string) {
    if (this.referenceEquals(this.MandatoryCodeField, value)) {
      this.MandatoryCodeField = value;
      // this.RaisePropertyChanged("MandatoryCode");
    }
  }

  get ContraIndicationOID() {
    return this.ContraIndicationOIDField;
  }
  set ContraIndicationOID(value) {
    if (this.ContraIndicationOIDField != value) {
      this.ContraIndicationOIDField = value;
      // this.RaisePropertyChanged("ContraIndicationOID");
    }
  }

  get HasProhibitedRoute() {
    return this.HasProhibitedRouteField;
  }
  set HasProhibitedRoute(value) {
    if (this.HasProhibitedRouteField != value) {
      this.HasProhibitedRouteField = value;
      // this.RaisePropertyChanged("HasProhibitedRoute");
    }
  }

  get Strength() {
    return this.StrengthField;
  }
  set Strength(value) {
    if (this.referenceEquals(this.StrengthField, value)) {
      this.StrengthField = value;
      // this.RaisePropertyChanged("Strength");
    }
  }

  get IsParacetamolIngredient(): boolean {
    return this.isParacetamolIngredientField;
  }
  set IsParacetamolIngredient(value: boolean) {
    this.isParacetamolIngredientField = value;
    // this.RaisePropertyChanged("IsParacetamolIngredient");
  }
}

export class AdminDeviceDetails extends CLZOObject {
  private BackgroundRateField = '';
  private BackgroundRateUOMField:UOM= new UOM();
  private BackgroundRateDenaminatorUOMOIDField = 0;
  private TopUpDoseField = '';
  private TopUpDoseUOMField:UOM= new UOM();
  private LockOutPeriodField = 0;
  private LockOutPeriodUOMField:UOM= new UOM();
  private BackgroundRateDenaminatorUOMField:UOM= new UOM();
  private MonitorPeriodField = '';
  private MonitorPeriodUOMField:UOM= new UOM();
  private MonitoringPeriodAlertDTTMField:UOM= new UOM();
  private BoosterDoseField = '';
  private BoosterDoseUOMField:UOM= new UOM();

  get BackgroundRate() {
    return this.BackgroundRateField;
  }
  set BackgroundRate(value) {
    if (this.referenceEquals(this.BackgroundRateField, value)) {
      this.BackgroundRateField = value;
      // this.RaisePropertyChanged("BackgroundRate");
    }
  }

  get BackgroundRateUOM() {
    return this.BackgroundRateUOMField;
  }
  set BackgroundRateUOM(value) {
    if (this.referenceEquals(this.BackgroundRateUOMField, value)) {
      this.BackgroundRateUOMField = value;
      // this.RaisePropertyChanged("BackgroundRateUOM");
    }
  }

  get BackgroundRateDenaminatorUOMOID(): number {
    return this.BackgroundRateDenaminatorUOMOIDField;
  }
  set BackgroundRateDenaminatorUOMOID(value: number) {
    if (this.BackgroundRateDenaminatorUOMOIDField != value) {
      this.BackgroundRateDenaminatorUOMOIDField = value;
      // this.RaisePropertyChanged("BackgroundRateDenaminatorUOMOID");
    }
  }

  get TopUpDose(): string {
    return this.TopUpDoseField;
  }
  set TopUpDose(value: string) {
    if (this.referenceEquals(this.TopUpDoseField, value)) {
      this.TopUpDoseField = value;
      // this.RaisePropertyChanged("TopUpDose");
    }
  }

  get TopUpDoseUOM() {
    return this.TopUpDoseUOMField;
  }
  set TopUpDoseUOM(value) {
    if (this.referenceEquals(this.TopUpDoseUOMField, value)) {
      this.TopUpDoseUOMField = value;
      // this.RaisePropertyChanged("TopUpDoseUOM");
    }
  }

  get LockOutPeriod(): number {
    return this.LockOutPeriodField;
  }
  set LockOutPeriod(value: number) {
    if (this.LockOutPeriodField != value) {
      this.LockOutPeriodField = value;
      // this.RaisePropertyChanged("LockOutPeriod");
    }
  }

  get LockOutPeriodUOM() {
    return this.LockOutPeriodUOMField;
  }
  set LockOutPeriodUOM(value) {
    if (this.referenceEquals(this.LockOutPeriodUOMField, value)) {
      this.LockOutPeriodUOMField = value;
      // this.RaisePropertyChanged("LockOutPeriodUOM");
    }
  }

  get BackgroundRateDenaminatorUOM() {
    return this.BackgroundRateDenaminatorUOMField;
  }
  set BackgroundRateDenaminatorUOM(value) {
    if (this.referenceEquals(this.BackgroundRateDenaminatorUOMField, value)) {
      this.BackgroundRateDenaminatorUOMField = value;
      // this.RaisePropertyChanged("BackgroundRateDenaminatorUOM");
    }
  }

  get MonitorPeriod(): string {
    return this.MonitorPeriodField;
  }
  set MonitorPeriod(value: string) {
    if (this.referenceEquals(this.MonitorPeriodField, value)) {
      this.MonitorPeriodField = value;
      // this.RaisePropertyChanged("MonitorPeriod");
    }
  }

  get MonitorPeriodUOM() {
    return this.MonitorPeriodUOMField;
  }
  set MonitorPeriodUOM(value) {
    if (this.referenceEquals(this.MonitorPeriodUOMField, value)) {
      this.MonitorPeriodUOMField = value;
      // this.RaisePropertyChanged("MonitorPeriodUOM");
    }
  }

  get MonitoringPeriodAlertDTTM() {
    return this.MonitoringPeriodAlertDTTMField;
  }
  set MonitoringPeriodAlertDTTM(value) {
    if (this.MonitoringPeriodAlertDTTMField != value) {
      this.MonitoringPeriodAlertDTTMField = value;
      // this.RaisePropertyChanged("MonitoringPeriodAlertDTTM");
    }
  }

  get BoosterDose(): string {
    return this.BoosterDoseField;
  }
  set BoosterDose(value: string) {
    if (this.referenceEquals(this.BoosterDoseField, value)) {
      this.BoosterDoseField = value;
      // this.RaisePropertyChanged("BoosterDose");
    }
  }

  get BoosterDoseUOM() {
    return this.BoosterDoseUOMField;
  }
  set BoosterDoseUOM(value) {
    if (this.referenceEquals(this.BoosterDoseUOMField, value)) {
      this.BoosterDoseUOMField = value;
      // this.RaisePropertyChanged("BoosterDoseUOM");
    }
  }
}

export class UOM extends CLZOObject {
  private UOMIdField = 0;
  private UOMNameField = '';
  private SourceDataProviderTypeField = '';
  private UOMCodeField = '';
  private MCIPrescribableItemListOIDField = 0;
  private UOMTypeCodeField = '';

  get UOMId(): number {
    return this.UOMIdField;
  }
  set UOMId(value: number) {
    if (this.UOMIdField != value) {
      this.UOMIdField = value;
      // this.RaisePropertyChanged("UOMId");
    }
  }

  get UOMName(): string {
    return this.UOMNameField;
  }
  set UOMName(value: string) {
    if (this.referenceEquals(this.UOMNameField, value)) {
      this.UOMNameField = value;
      // this.RaisePropertyChanged("UOMName");
    }
  }

  get SourceDataProviderType(): string {
    return this.SourceDataProviderTypeField;
  }
  set SourceDataProviderType(value: string) {
    if (this.referenceEquals(this.SourceDataProviderTypeField, value)) {
      this.SourceDataProviderTypeField = value;
      // this.RaisePropertyChanged("SourceDataProviderType");
    }
  }

  get UOMCode(): string {
    return this.UOMCodeField;
  }
  set UOMCode(value: string) {
    if (this.referenceEquals(this.UOMCodeField, value)) {
      this.UOMCodeField = value;
      // this.RaisePropertyChanged("UOMCode");
    }
  }

  get MCIPrescribableItemListOID(): number {
    return this.MCIPrescribableItemListOIDField;
  }
  set MCIPrescribableItemListOID(value: number) {
    if (this.MCIPrescribableItemListOIDField != value) {
      this.MCIPrescribableItemListOIDField = value;
      // this.RaisePropertyChanged("MCIPrescribableItemListOID");
    }
  }

  get UOMTypeCode(): string {
    return this.UOMTypeCodeField;
  }
  set UOMTypeCode(value: string) {
    if (this.referenceEquals(this.UOMTypeCodeField, value)) {
      this.UOMTypeCodeField = value;
      // this.RaisePropertyChanged("UOMTypeCode");
    }
  }
}
export class ManageReviewPeriod extends CLZOObject {
  private prescriptionItemOIDField = 0;

  private encounterOIDField = 0;

  private newReviewAfterDTTMField: DateTime = new DateTime();

  private newReviewAfterField = '';

  private newReviewAfterUOMField:ReviewAfterDetail = new ReviewAfterDetail();

  private newReviewTypeField:ObjectInfo= new ObjectInfo();

  private newReviewRequestCommentsField = '';

  private oReviewAfterDetailField:ReviewAfterDetail=new ReviewAfterDetail();

  /// <remarks/>

  get PrescriptionItemOID(): number {
    return this.prescriptionItemOIDField;
  }
  set PrescriptionItemOID(value: number) {
    this.prescriptionItemOIDField = value;
    // this.RaisePropertyChanged("PrescriptionItemOID");
  }

  get NewReviewAfterDTTM(): DateTime {
    return this.newReviewAfterDTTMField;
  }
  set NewReviewAfterDTTM(value: DateTime) {
    this.newReviewAfterDTTMField = value;
    // this.RaisePropertyChanged("NewReviewAfterDTTM");
  }

  get NewReviewAfter(): string {
    return this.newReviewAfterField;
  }
  set NewReviewAfter(value: string) {
    this.newReviewAfterField = value;
    // this.RaisePropertyChanged("NewReviewAfter");
  }

  get NewReviewAfterUOM() {
    return this.newReviewAfterUOMField;
  }
  set NewReviewAfterUOM(value) {
    this.newReviewAfterUOMField = value;
    // this.RaisePropertyChanged("NewReviewAfterUOM");
  }

  get NewReviewType() {
    return this.newReviewTypeField;
  }
  set NewReviewType(value) {
    this.newReviewTypeField = value;
    // this.RaisePropertyChanged("NewReviewType");
  }

  get NewReviewRequestComments(): string {
    return this.newReviewRequestCommentsField;
  }
  set NewReviewRequestComments(value: string) {
    this.newReviewRequestCommentsField = value;
    // this.RaisePropertyChanged("NewReviewRequestComments");
  }

  get EncounterOID(): number {
    return this.encounterOIDField;
  }
  set EncounterOID(value: number) {
    this.encounterOIDField = value;
    // this.RaisePropertyChanged("EncounterOID");
  }

  get oReviewAfterDetail() {
    return this.oReviewAfterDetailField;
  }
  set oReviewAfterDetail(value) {
    this.oReviewAfterDetailField = value;
    // this.RaisePropertyChanged("oReviewAfterDetail");
  }
}

export class SequenceDetails extends CLZOObject {
  private SequenceOrderField = 0;
  private IsSequentialPrescribingField = false;
  private FirstPrescItemOIDInSeqField = 0;
  private ParentPrescriptionItemOIDField = 0;
  private IsSeqInprogressField = false;
  private IsFirstItemField = false;
  private GroupSequenceNoField = 0;
  private UparentPresitemOIDSeqField = 0;
  private IsLastItemField = false;
  private SequenceParentPrescItemOIDField = 0;

  get SequenceOrder(): number {
    return this.SequenceOrderField;
  }
  set SequenceOrder(value: number) {
    if (this.SequenceOrderField != value) {
      this.SequenceOrderField = value;
      // this.RaisePropertyChanged("SequenceOrder");
    }
  }

  get IsSequentialPrescribing(): boolean {
    return this.IsSequentialPrescribingField;
  }
  set IsSequentialPrescribing(value: boolean) {
    if (this.IsSequentialPrescribingField != value) {
      this.IsSequentialPrescribingField = value;
      // this.RaisePropertyChanged("IsSequentialPrescribing");
    }
  }

  get FirstPrescItemOIDInSeq(): number {
    return this.FirstPrescItemOIDInSeqField;
  }
  set FirstPrescItemOIDInSeq(value: number) {
    if (this.FirstPrescItemOIDInSeqField != value) {
      this.FirstPrescItemOIDInSeqField = value;
      // this.RaisePropertyChanged("FirstPrescItemOIDInSeq");
    }
  }

  get ParentPrescriptionItemOID(): number {
    return this.ParentPrescriptionItemOIDField;
  }
  set ParentPrescriptionItemOID(value: number) {
    if (this.ParentPrescriptionItemOIDField != value) {
      this.ParentPrescriptionItemOIDField = value;
      // this.RaisePropertyChanged("ParentPrescriptionItemOID");
    }
  }

  get IsSeqInprogress(): boolean {
    return this.IsSeqInprogressField;
  }
  set IsSeqInprogress(value: boolean) {
    if (this.IsSeqInprogressField != value) {
      this.IsSeqInprogressField = value;
      // this.RaisePropertyChanged("IsSeqInprogress");
    }
  }

  get GroupSequenceNo(): number {
    return this.GroupSequenceNoField;
  }
  set GroupSequenceNo(value: number) {
    if (this.GroupSequenceNoField != value) {
      this.GroupSequenceNoField = value;
      // this.RaisePropertyChanged("GroupSequenceNo");
    }
  }

  get IsFirstItem(): boolean {
    return this.IsFirstItemField;
  }
  set IsFirstItem(value: boolean) {
    if (this.referenceEquals(this.IsFirstItemField, value)) {
      this.IsFirstItemField = value;
      // this.RaisePropertyChanged("IsFirstItem");
    }
  }

  get IsLastItem(): boolean {
    return this.IsLastItemField;
  }
  set IsLastItem(value: boolean) {
    if (this.referenceEquals(this.IsLastItemField, value)) {
      this.IsLastItemField = value;
      // this.RaisePropertyChanged("IsLastItem");
    }
  }

  get SequenceParentPrescItemOID(): number {
    return this.SequenceParentPrescItemOIDField;
  }
  set SequenceParentPrescItemOID(value: number) {
    if (this.SequenceParentPrescItemOIDField != value) {
      this.SequenceParentPrescItemOIDField = value;
      // this.RaisePropertyChanged("SequenceParentPrescItemOID");
    }
  }

  get UparentPresitemOIDSeq(): number {
    return this.UparentPresitemOIDSeqField;
  }
  set UparentPresitemOIDSeq(value: number) {
    if (this.UparentPresitemOIDSeqField != value) {
      this.UparentPresitemOIDSeqField = value;
      // this.RaisePropertyChanged("UparentPresitemOIDSeq");
    }
  }
}

export class PrescriptionItemInputData extends CLZOObject {
  private OIDField = 0;
  private PatientOIDField = 0;
  private ExpirationDurationField = 0;
  private PrescriptionTypeField = '';
  private PrescriptionItemStatusField = '';
  private PrescriptionOIDField = 0;
  private EncounterOIDField = 0;
  private MCVesrionNoField = '';
  private ActiveMCVersionField = '';
  private PrescriptionNumberField = '';
  private PatientAllergyOIDField = '';
  private ActivityField = '';
  private InfusionSeqOrderField = 0;
  private ParentPrescriptionItemOIDField = 0;
  private DiscontinouscancelSequentialField = false;
  private CACodeField = '';
  private ClerkformViewerDefltCodeField = '';
  private ReviewOutcomeCommentsField = '';
  private IsPresItemStatusCompleteField = '';
  private InfusionGroupSequenceNoField = 0;
  private IsInfusionInProgressField = false;

  get OID() {
    return this.OIDField;
  }
  set OID(value) {
    if (this.OIDField != value) {
      this.OIDField = value;
      // this.RaisePropertyChanged("OID");
    }
  }

  get PatientOID(): number {
    return this.PatientOIDField;
  }
  set PatientOID(value: number) {
    if (this.PatientOIDField != value) {
      this.PatientOIDField = value;
      // this.RaisePropertyChanged("PatientOID");
    }
  }

  get ExpirationDuration(): number {
    return this.ExpirationDurationField;
  }
  set ExpirationDuration(value: number) {
    if (this.ExpirationDurationField != value) {
      this.ExpirationDurationField = value;
      // this.RaisePropertyChanged("ExpirationDuration");
    }
  }

  get PrescriptionType(): string {
    return this.PrescriptionTypeField;
  }
  set PrescriptionType(value: string) {
    if (this.referenceEquals(this.PrescriptionTypeField, value)) {
      this.PrescriptionTypeField = value;
      // this.RaisePropertyChanged("PrescriptionType");
    }
  }

  get PrescriptionItemStatus(): string {
    return this.PrescriptionItemStatusField;
  }
  set PrescriptionItemStatus(value: string) {
    if (this.referenceEquals(this.PrescriptionItemStatusField, value)) {
      this.PrescriptionItemStatusField = value;
      // this.RaisePropertyChanged("PrescriptionItemStatus");
    }
  }

  get PrescriptionOID(): number {
    return this.PrescriptionOIDField;
  }
  set PrescriptionOID(value: number) {
    if (this.PrescriptionOIDField != value) {
      this.PrescriptionOIDField = value;
      // this.RaisePropertyChanged("PrescriptionOID");
    }
  }

  get EncounterOID(): number {
    return this.EncounterOIDField;
  }
  set EncounterOID(value: number) {
    if (this.EncounterOIDField != value) {
      this.EncounterOIDField = value;
      // this.RaisePropertyChanged("EncounterOID");
    }
  }

  get MCVesrionNo(): string {
    return this.MCVesrionNoField;
  }
  set MCVesrionNo(value: string) {
    if (this.referenceEquals(this.MCVesrionNoField, value)) {
      this.MCVesrionNoField = value;
      // this.RaisePropertyChanged("MCVesrionNo");
    }
  }

  get ActiveMCVersion(): string {
    return this.ActiveMCVersionField;
  }
  set ActiveMCVersion(value: string) {
    if (this.referenceEquals(this.ActiveMCVersionField, value)) {
      this.ActiveMCVersionField = value;
      // this.RaisePropertyChanged("ActiveMCVersion");
    }
  }

  get PrescriptionNumber(): string {
    return this.PrescriptionNumberField;
  }
  set PrescriptionNumber(value: string) {
    if (this.referenceEquals(this.PrescriptionNumberField, value)) {
      this.PrescriptionNumberField = value;
      // this.RaisePropertyChanged("PrescriptionNumber");
    }
  }

  get PatientAllergyOID() {
    return this.PatientAllergyOIDField;
  }
  set PatientAllergyOID(value) {
    if (this.referenceEquals(this.PatientAllergyOIDField, value)) {
      this.PatientAllergyOIDField = value;
      // this.RaisePropertyChanged("PatientAllergyOID");
    }
  }

  get Activity(): string {
    return this.ActivityField;
  }
  set Activity(value: string) {
    if (this.referenceEquals(this.ActivityField, value)) {
      this.ActivityField = value;
      // this.RaisePropertyChanged("Activity");
    }
  }

  get InfusionSeqOrder(): number {
    return this.InfusionSeqOrderField;
  }
  set InfusionSeqOrder(value: number) {
    if (this.InfusionSeqOrderField != value) {
      this.InfusionSeqOrderField = value;
      // this.RaisePropertyChanged("InfusionSeqOrder");
    }
  }

  get ParentPrescriptionItemOID(): number {
    return this.ParentPrescriptionItemOIDField;
  }
  set ParentPrescriptionItemOID(value: number) {
    if (this.ParentPrescriptionItemOIDField != value) {
      this.ParentPrescriptionItemOIDField = value;
      // this.RaisePropertyChanged("ParentPrescriptionItemOID");
    }
  }

  get DiscontinouscancelSequential(): boolean {
    return this.DiscontinouscancelSequentialField;
  }
  set DiscontinouscancelSequential(value: boolean) {
    if (this.DiscontinouscancelSequentialField != value) {
      this.DiscontinouscancelSequentialField = value;
      // this.RaisePropertyChanged("DiscontinouscancelSequential");
    }
  }

  get CACode(): string {
    return this.CACodeField;
  }
  set CACode(value: string) {
    if (this.referenceEquals(this.CACodeField, value)) {
      this.CACodeField = value;
      // this.RaisePropertyChanged("CACode");
    }
  }

  get ClerkformViewerDefltCode(): string {
    return this.ClerkformViewerDefltCodeField;
  }
  set ClerkformViewerDefltCode(value: string) {
    if (this.referenceEquals(this.ClerkformViewerDefltCodeField, value)) {
      this.ClerkformViewerDefltCodeField = value;
      // this.RaisePropertyChanged("ClerkformViewerDefltCode");
    }
  }

  get ReviewOutcomeComments(): string {
    return this.ReviewOutcomeCommentsField;
  }
  set ReviewOutcomeComments(value: string) {
    if (this.referenceEquals(this.ReviewOutcomeCommentsField, value)) {
      this.ReviewOutcomeCommentsField = value;
      // this.RaisePropertyChanged("ReviewOutcomeComments");
    }
  }

  get IsPresItemStatusComplete(): string {
    return this.IsPresItemStatusCompleteField;
  }
  set IsPresItemStatusComplete(value: string) {
    if (this.IsPresItemStatusCompleteField != value) {
      this.IsPresItemStatusCompleteField = value;
      // this.RaisePropertyChanged("IsPresItemStatusComplete");
    }
  }

  get InfusionGroupSequenceNo(): number {
    return this.InfusionGroupSequenceNoField;
  }
  set InfusionGroupSequenceNo(value: number) {
    if (this.InfusionGroupSequenceNoField != value) {
      this.InfusionGroupSequenceNoField = value;
      // this.RaisePropertyChanged("InfusionGroupSequenceNo");
    }
  }

  get IsInfusionInProgress(): boolean {
    return this.IsInfusionInProgressField;
  }
  set IsInfusionInProgress(value: boolean) {
    if (this.IsInfusionInProgressField != value) {
      this.IsInfusionInProgressField = value;
      // this.RaisePropertyChanged("IsInfusionInProgress");
    }
  }
}

export class TechnicalValidationInfo extends CLZOObject {
  private PrescriptionOIDFiel = 0;
  private PrescriptionItemOIDFiel = 0;
  private ValidatedDTTMField = new Date();
  private ValidatedByField: ObjectInfo = new ObjectInfo();
  private TechValidatedItemsField: TechValidatedItem[] = [];
  private ValidatorRoleNameField = '';
  private IsTechnicalvalidateField = '';
  private TechnicalvalidateupdateField = false;
  private EncounterOIDFiel = 0;
  private IsMergePatientField = '';
  private SupplyInstructionField: Array<ObjectInfo> = new Array<ObjectInfo>();
  private DispensingInstructionField: Array<ObjectInfo> = new Array<ObjectInfo>();
  private OtherDispensingInstructionField = '';
  private PrepStatusCodeField = '';
  private IsWardStockField = false;
  private IsSupplyRequestedField = '';
  private RequisitionCACodeField = '';
  private LorenzoIDField = '';
  private ServiceOIDFiel = 0;
  private LocationOIDFiel = 0;
  private UsersOIDFiel = 0;
  private RoleOIDFiel = 0;
  private PresMutliCompOidFiel = 0;
  private UniqueMCRowIDFiel = 0;
  private medsupplydetailOIDFiel = 0;
  private supplyCommentsField = '';
  private PrescriptionItemOIDField = 0;

  //private string SupplyStatusField;
  //EPIC-7732 - Venkat RM
  private FluidOIDFiel = 0;

  //Phani -- 7732
  private IsChildEditedField=0;

  //wardstock TFS 1381 NextSupplyDate store and fetch sasi
  private NextSupplyDTTMField = new Date();

  //NPK - TFS 1381 - WardStock
  private PrescriptionOIDField=0;
  private IsSuppInstrInvokedFromEPRField = false;

  get PrescriptionOID(): number {
    return this.PrescriptionOIDField;
  }
  set PrescriptionOID(value: number) {
    if (this.PrescriptionOIDField != value) {
      this.PrescriptionOIDField = value;
      // this.RaisePropertyChanged("PrescriptionOID");
    }
  }

  get PrescriptionItemOID(): number {
    return this.PrescriptionItemOIDField;
  }
  set PrescriptionItemOID(value: number) {
    if (this.PrescriptionItemOIDField != value) {
      this.PrescriptionItemOIDField = value;
      // this.RaisePropertyChanged("PrescriptionItemOID");
    }
  }

  get ValidatedDTTM() {
    return this.ValidatedDTTMField;
  }
  set ValidatedDTTM(value) {
    if (this.ValidatedDTTMField != value) {
      this.ValidatedDTTMField = value;
      // this.RaisePropertyChanged("ValidatedDTTM");
    }
  }

  get ValidatedBy() {
    return this.ValidatedByField;
  }
  set ValidatedBy(value) {
    if (this.referenceEquals(this.ValidatedByField, value)) {
      this.ValidatedByField = value;
      // this.RaisePropertyChanged("ValidatedBy");
    }
  }

  get TechValidatedItems(): TechValidatedItem[] {
    return this.TechValidatedItemsField;
  }
  set TechValidatedItems(value) {
    if (this.referenceEquals(this.TechValidatedItemsField, value)) {
      this.TechValidatedItemsField = value;
      // this.RaisePropertyChanged("TechValidatedItems");
    }
  }

  get ValidatorRoleName(): string {
    return this.ValidatorRoleNameField;
  }
  set ValidatorRoleName(value: string) {
    if (this.referenceEquals(this.ValidatorRoleNameField, value)) {
      this.ValidatorRoleNameField = value;
      // this.RaisePropertyChanged("ValidatorRoleName");
    }
  }

  get IsTechnicalvalidate(): string {
    return this.IsTechnicalvalidateField;
  }
  set IsTechnicalvalidate(value: string) {
    if (this.referenceEquals(this.IsTechnicalvalidateField, value)) {
      this.IsTechnicalvalidateField = value;
      // this.RaisePropertyChanged("IsTechnicalvalidate");
    }
  }

  get Technicalvalidateupdate(): boolean {
    return this.TechnicalvalidateupdateField;
  }
  set Technicalvalidateupdate(value: boolean) {
    if (this.TechnicalvalidateupdateField != value) {
      this.TechnicalvalidateupdateField = value;
      // this.RaisePropertyChanged("Technicalvalidateupdate");
    }
  }
  private EncounterOIDField = 0;
  get EncounterOID(): number {
    return this.EncounterOIDField;
  }
  set EncounterOID(value: number) {
    if (this.EncounterOIDField != value) {
      this.EncounterOIDField = value;
      // this.RaisePropertyChanged("EncounterOID");
    }
  }

  get IsMergePatient(): string {
    return this.IsMergePatientField;
  }
  set IsMergePatient(value: string) {
    if (this.referenceEquals(this.IsMergePatientField, value)) {
      this.IsMergePatientField = value;
      // this.RaisePropertyChanged("IsMergePatient");
    }
  }

  get SupplyInstruction(): Array<ObjectInfo> {
    return this.SupplyInstructionField;
  }
  set SupplyInstruction(value: Array<ObjectInfo>) {
    if (this.referenceEquals(this.SupplyInstructionField, value)) {
      this.SupplyInstructionField = value;
      // this.RaisePropertyChanged("SupplyInstruction");
    }
  }

  get DispensingInstruction(): Array<ObjectInfo> {
    return this.DispensingInstructionField;
  }
  set DispensingInstruction(value: Array<ObjectInfo>) {
    if (this.referenceEquals(this.DispensingInstructionField, value)) {
      this.DispensingInstructionField = value;
      // this.RaisePropertyChanged("DispensingInstruction");
    }
  }

  get OtherDispensingInstruction(): string {
    return this.OtherDispensingInstructionField;
  }
  set OtherDispensingInstruction(value: string) {
    if (this.referenceEquals(this.OtherDispensingInstructionField, value)) {
      this.OtherDispensingInstructionField = value;
      // this.RaisePropertyChanged("OtherDispensingInstruction");
    }
  }

  get PrepStatusCode(): string {
    return this.PrepStatusCodeField;
  }
  set PrepStatusCode(value: string) {
    if (this.referenceEquals(this.PrepStatusCodeField, value)) {
      this.PrepStatusCodeField = value;
      // this.RaisePropertyChanged("PrepStatusCode");
    }
  }

  get IsWardStock(): boolean {
    return this.IsWardStockField;
  }
  set IsWardStock(value: boolean) {
    if (this.IsWardStockField != value) {
      this.IsWardStockField = value;
      // this.RaisePropertyChanged("IsWardStock");
    }
  }

  get IsSupplyRequested() {
    return this.IsSupplyRequestedField;
  }
  set IsSupplyRequested(value) {
    if (this.IsSupplyRequestedField != value) {
      this.IsSupplyRequestedField = value;
      // this.RaisePropertyChanged("IsSupplyRequested");
    }
  }

  get RequisitionCACode(): string {
    return this.RequisitionCACodeField;
  }
  set RequisitionCACode(value: string) {
    if (this.referenceEquals(this.RequisitionCACodeField, value)) {
      this.RequisitionCACodeField = value;
      // this.RaisePropertyChanged("RequisitionCACode");
    }
  }

  get LorenzoID(): string {
    return this.LorenzoIDField;
  }
  set LorenzoID(value: string) {
    if (this.referenceEquals(this.LorenzoIDField, value)) {
      this.LorenzoIDField = value;
      // this.RaisePropertyChanged("LorenzoID");
    }
  }
  private ServiceOIDField = 0;
  get ServiceOID(): number {
    return this.ServiceOIDField;
  }
  set ServiceOID(value: number) {
    if (this.ServiceOIDField != value) {
      this.ServiceOIDField = value;
      // this.RaisePropertyChanged("ServiceOID");
    }
  }
  private LocationOIDField = 0;
  get LocationOID(): number {
    return this.LocationOIDField;
  }
  set LocationOID(value: number) {
    if (this.LocationOIDField != value) {
      this.LocationOIDField = value;
      // this.RaisePropertyChanged("LocationOID");
    }
  }
  private UsersOIDField = 0;
  get UsersOID(): number {
    return this.UsersOIDField;
  }
  set UsersOID(value: number) {
    if (this.UsersOIDField != value) {
      this.UsersOIDField = value;
      // this.RaisePropertyChanged("UsersOID");
    }
  }
  private RoleOIDField = 0;
  get RoleOID(): number {
    return this.RoleOIDField;
  }
  set RoleOID(value: number) {
    if (this.RoleOIDField != value) {
      this.RoleOIDField = value;
      // this.RaisePropertyChanged("RoleOID");
    }
  }
  private PresMutliCompOidField = 0;
  get PresMutliCompOid(): number {
    return this.PresMutliCompOidField;
  }
  set PresMutliCompOid(value: number) {
    if (this.PresMutliCompOidField != value) {
      this.PresMutliCompOidField = value;
      // this.RaisePropertyChanged("PresMutliCompOid");
    }
  }
  private UniqueMCRowIDField = 0;
  get UniqueMCRowID(): number {
    return this.UniqueMCRowIDField;
  }
  set UniqueMCRowID(value: number) {
    if (this.UniqueMCRowIDField != value) {
      this.UniqueMCRowIDField = value;
      // this.RaisePropertyChanged("UniqueMCRowID");
    }
  }
  private medsupplydetailOIDField = 0;
  get MedsupplydetailOID(): number {
    return this.medsupplydetailOIDField;
  }
  set MedsupplydetailOID(value: number) {
    if (this.medsupplydetailOIDField != value) {
      this.medsupplydetailOIDField = value;
      // this.RaisePropertyChanged("MedsupplydetailOID ");
    }
  }

  get SupplyComments(): string {
    return this.supplyCommentsField;
  }
  set SupplyComments(value: string) {
    if (this.referenceEquals(this.supplyCommentsField, value)) {
      this.supplyCommentsField = value;
      // this.RaisePropertyChanged("SupplyComments");
    }
  }
  private FluidOIDField = 0;
  get FluidPrescribableItemListOID(): number {
    return this.FluidOIDField;
  }
  set FluidPrescribableItemListOID(value: number) {
    this.FluidOIDField = value;
    // this.RaisePropertyChanged("FluidPrescribableItemListOID");
  }
  get IsChildEdited() {
    return this.IsChildEditedField;
  }
  set IsChildEdited(value) {
    this.IsChildEditedField = value;
    // this.RaisePropertyChanged("IsChildEdited");
  }

  get IsSuppInstrInvokedFromEPR(): boolean {
    return this.IsSuppInstrInvokedFromEPRField;
  }
  set IsSuppInstrInvokedFromEPR(value: boolean) {
    if (this.IsSuppInstrInvokedFromEPRField != value) {
      this.IsSuppInstrInvokedFromEPRField = value;
      // this.RaisePropertyChanged("IsSuppInstrInvokedFromEPR");
    }
  }

  get NextSupplyDTTM() {
    return this.NextSupplyDTTMField;
  }
  set NextSupplyDTTM(value) {
    if (this.NextSupplyDTTMField != value) {
      this.NextSupplyDTTMField = value;
      // this.RaisePropertyChanged("NextSupplyDTTM");
    }
  }

  //TS:1381/NS
  private isAlreadyClinicallyVerifiedField = false;

  get IsAlreadyClinicallyVerified() {
    return this.isAlreadyClinicallyVerifiedField;
  }
  set IsAlreadyClinicallyVerified(value) {
    this.isAlreadyClinicallyVerifiedField = value;
    // this.RaisePropertyChanged("IsAlreadyClinicallyVerified");
  }

  private includeFluidField: boolean = false;
  get IncludeFluid(): boolean {
    return this.includeFluidField;
  }
  set IncludeFluid(value: boolean) {
    this.includeFluidField = value;
    // this.RaisePropertyChanged("IncludeFluid");
  }

  private ignoreIfRequestExistsField: boolean = false;

  get IgnoreIfRequestExists(): boolean {
    return this.ignoreIfRequestExistsField;
  }
  set IgnoreIfRequestExists(value: boolean) {
    this.ignoreIfRequestExistsField = value;
    // this.RaisePropertyChanged("IgnoreIfRequestExists");
  }
}

export class IPPMCPresctiptionItem extends CLZOObject {
  private PrescriptionItemOIDField = 0;
  private IdentifyingOIDField = 0;
  private IdentifyingTypeField = '';
  private ComponentNameField = '';
  private QuantityField = '';
  private QuantityUOMField = '';
  private QuantityUOMOIDField = 0;
  private IsUptoField = false;
  private LorenzoIDField = '';
  private IsNonFormularyField = false;
  private DisplayOrderField = 0;
  private isEditableField = false;
  //Epic 4267 - MCI Implememtation
  private isQtyEditableField = false;
  private isQtyUOMEditableField = false;
  private IsDisableConflictsField = false;
  private PrescribableItemListOIDField = 0;
  private UniqueMCRowIDField = 0;
  private ConflictsExistField = '';
  private OIDField = 0;
  private ActionCodeField = '';
  private QuantityUOMsField: ObjectInfo = new ObjectInfo();
  private NonformularyreasonField = '';
  private OtherNonformularyreasonField = '';
  private QuantityUomcolField = '';
  private MCQuantityField: Quantity = new Quantity();
  private DisplacementVolumeField = '';
  private DisplacementVolumeUOMField = '';
  private DisplacementVolumeUOMOIDField = 0;
  private BatchNumberField = '';
  private ExpiryDttmField: Date = new Date();
  private oDrugPrepHistoryDataField: DrugPrepHistoryData =
    new DrugPrepHistoryData();
  private IsInfusionFluidField = false;
  private CompIdentifyingOIDField = 0;
  private CompIdentifyingTypeField = '';
  private MedDrugPreparationdetailOIDField = 0;
  private QuantityUOMLZIDField = '';
  private AdminMethodField = '';
  private MCVersionField = '';
  private IdentifyingNameField = '';
  private PresItemLorenzoIDField = '';
  private MCDoseUOMDeActivatedField = '';
  private DispenseInstructionCodeField = '';
  private SupplyInstructionCodeField = '';
  private SupplyInstructionField: ObjectInfo[] = [];
  private DispensingInstructionField: ObjectInfo[] = [];
  private OtherDispensingInstructionField = '';
  private PrepStatusCodeField = '';
  private IsWardStockField = false;
  private IsSupplyRequestedField = 0;
  private RequisitionCACodeField = '';
  private TechValidateDetailsField: TechnicalValidationInfo =
    new TechnicalValidationInfo();
  private IsControlledDrugField = 0;
  private DrugPropertiesField = '';
  private VMVPLorenzoIDField = '';
  private VMVPMCIdentifyingNameField = '';
  //Abhishek TFS-7732
  private SupplyCommentsField = '';
  //Esakki - WSC
  private LastSupplyNameMCIChildField = '';
  private LastSupplyDTTMMCIChildField:Date=new Date();
  //wardstock TFS 1381 vishnu

  //shobi-Authorise
  private IsMCAuthorizeField = false;
  //end

  private NextSupplyDTTMField: Date = new Date();
  get PrescriptionItemOID(): number {
    return this.PrescriptionItemOIDField;
  }
  set PrescriptionItemOID(value: number) {
    if (this.PrescriptionItemOIDField != value) {
      this.PrescriptionItemOIDField = value;
      // this.RaisePropertyChanged("PrescriptionItemOID");
    }
  }

  get IdentifyingOID(): number {
    return this.IdentifyingOIDField;
  }
  set IdentifyingOID(value: number) {
    if (this.IdentifyingOIDField != value) {
      this.IdentifyingOIDField = value;
      // this.RaisePropertyChanged("IdentifyingOID");
    }
  }

  get IdentifyingType(): string {
    return this.IdentifyingTypeField;
  }
  set IdentifyingType(value: string) {
    if (this.referenceEquals(this.IdentifyingTypeField, value) != true) {
      this.IdentifyingTypeField = value;
      // this.RaisePropertyChanged("IdentifyingType");
    }
  }

  get ComponentName(): string {
    return this.ComponentNameField;
  }
  set ComponentName(value: string) {
    if (this.referenceEquals(this.ComponentNameField, value)) {
      this.ComponentNameField = value;
      // this.RaisePropertyChanged("ComponentName");
    }
  }

  get Quantity(): string {
    return this.QuantityField;
  }
  set Quantity(value: string) {
    if (this.referenceEquals(this.QuantityField, value)) {
      this.QuantityField = value;
      // this.RaisePropertyChanged("Quantity");
    }
  }

  get QuantityUOM(): string {
    return this.QuantityUOMField;
  }
  set QuantityUOM(value: string) {
    if (this.referenceEquals(this.QuantityUOMField, value)) {
      this.QuantityUOMField = value;
      // this.RaisePropertyChanged("QuantityUOM");
    }
  }

  get QuantityUOMOID(): number {
    return this.QuantityUOMOIDField;
  }
  set QuantityUOMOID(value: number) {
    if (this.QuantityUOMOIDField != value) {
      this.QuantityUOMOIDField = value;
      // this.RaisePropertyChanged("QuantityUOMOID");
    }
  }

  get IsUpto(): boolean {
    return this.IsUptoField;
  }
  set IsUpto(value: boolean) {
    if (this.IsUptoField != value) {
      this.IsUptoField = value;
      // this.RaisePropertyChanged("IsUpto");
    }
  }

  get LorenzoID(): string {
    return this.LorenzoIDField;
  }
  set LorenzoID(value: string) {
    if (this.referenceEquals(this.LorenzoIDField, value)) {
      this.LorenzoIDField = value;
      // this.RaisePropertyChanged("LorenzoID");
    }
  }

  get IsNonFormulary(): boolean {
    return this.IsNonFormularyField;
  }
  set IsNonFormulary(value: boolean) {
    if (this.IsNonFormularyField != value) {
      this.IsNonFormularyField = value;
      // this.RaisePropertyChanged("IsNonFormulary");
    }
  }

  get DisplayOrder(): number {
    return this.DisplayOrderField;
  }
  set DisplayOrder(value: number) {
    if (this.DisplayOrderField != value) {
      this.DisplayOrderField = value;
      // this.RaisePropertyChanged("DisplayOrder");
    }
  }

  get isEditable(): boolean {
    return this.isEditableField;
  }
  set isEditable(value: boolean) {
    if (this.isEditableField != value) {
      this.isEditableField = value;
      // this.RaisePropertyChanged("isEditable");
    }
  }

  get isQtyEditable(): boolean {
    return this.isQtyEditableField;
  }
  set isQtyEditable(value: boolean) {
    if (this.isQtyEditableField != value) {
      this.isQtyEditableField = value;
      // this.RaisePropertyChanged("isQtyEditable");
    }
  }

  get isQtyUOMEditable(): boolean {
    return this.isQtyUOMEditableField;
  }
  set isQtyUOMEditable(value: boolean) {
    if (this.isQtyUOMEditableField != value) {
      this.isQtyUOMEditableField = value;
      // this.RaisePropertyChanged("isQtyUOMEditable");
    }
  }

  get IsDisableConflicts(): boolean {
    return this.IsDisableConflictsField;
  }
  set IsDisableConflicts(value: boolean) {
    if (this.IsDisableConflictsField != value) {
      this.IsDisableConflictsField = value;
      // this.RaisePropertyChanged("IsDisableConflicts");
    }
  }

  get PrescribableItemListOID(): number {
    return this.PrescribableItemListOIDField;
  }
  set PrescribableItemListOID(value: number) {
    if (this.PrescribableItemListOIDField != value) {
      this.PrescribableItemListOIDField = value;
      // this.RaisePropertyChanged("PrescribableItemListOID");
    }
  }

  get UniqueMCRowID(): number {
    return this.UniqueMCRowIDField;
  }
  set UniqueMCRowID(value: number) {
    if (this.UniqueMCRowIDField != value) {
      this.UniqueMCRowIDField = value;
      // this.RaisePropertyChanged("UniqueMCRowID");
    }
  }

  get ConflictsExist(): string {
    return this.ConflictsExistField;
  }
  set ConflictsExist(value: string) {
    if (this.referenceEquals(this.ConflictsExistField, value)) {
      this.ConflictsExistField = value;
      // this.RaisePropertyChanged("ConflictsExist");
    }
  }

  get OID(): number {
    return this.OIDField;
  }
  set OID(value: number) {
    if (this.OIDField != value) {
      this.OIDField = value;
      // this.RaisePropertyChanged("OID");
    }
  }

  get ActionCode(): string {
    return this.ActionCodeField;
  }
  set ActionCode(value: string) {
    if (this.referenceEquals(this.ActionCodeField, value)) {
      this.ActionCodeField = value;
      // this.RaisePropertyChanged("ActionCode");
    }
  }

  get QuantityUOMs(): ObjectInfo {
    return this.QuantityUOMsField;
  }
  set QuantityUOMs(value: ObjectInfo) {
    if (this.referenceEquals(this.QuantityUOMsField, value)) {
      this.QuantityUOMsField = value;
      // this.RaisePropertyChanged("QuantityUOMs");
    }
  }

  get Nonformularyreason(): string {
    return this.NonformularyreasonField;
  }
  set Nonformularyreason(value: string) {
    if (this.referenceEquals(this.NonformularyreasonField, value)) {
      this.NonformularyreasonField = value;
      // this.RaisePropertyChanged("Nonformularyreason");
    }
  }

  get OtherNonformularyreason(): string {
    return this.OtherNonformularyreasonField;
  }
  set OtherNonformularyreason(value: string) {
    if (this.referenceEquals(this.OtherNonformularyreasonField, value)) {
      this.OtherNonformularyreasonField = value;
      // this.RaisePropertyChanged("OtherNonformularyreason");
    }
  }

  get QuantityUomcol(): string {
    return this.QuantityUomcolField;
  }
  set QuantityUomcol(value: string) {
    if (this.referenceEquals(this.QuantityUomcolField, value)) {
      this.QuantityUomcolField = value;
      // this.RaisePropertyChanged("QuantityUomcol");
    }
  }

  get MCQuantity() {
    return this.MCQuantityField;
  }
  set MCQuantity(value) {
    if (this.referenceEquals(this.MCQuantityField, value)) {
      this.MCQuantityField = value;
      // this.RaisePropertyChanged("MCQuantity");
    }
  }

  get DisplacementVolume(): string {
    return this.DisplacementVolumeField;
  }
  set DisplacementVolume(value: string) {
    if (this.referenceEquals(this.DisplacementVolumeField, value)) {
      this.DisplacementVolumeField = value;
      // this.RaisePropertyChanged("DisplacementVolume");
    }
  }

  get DisplacementVolumeUOM(): string {
    return this.DisplacementVolumeUOMField;
  }
  set DisplacementVolumeUOM(value: string) {
    if (this.referenceEquals(this.DisplacementVolumeUOMField, value)) {
      this.DisplacementVolumeUOMField = value;
      // this.RaisePropertyChanged("DisplacementVolumeUOM");
    }
  }

  get DisplacementVolumeUOMOID(): number {
    return this.DisplacementVolumeUOMOIDField;
  }
  set DisplacementVolumeUOMOID(value: number) {
    if (this.DisplacementVolumeUOMOIDField != value) {
      this.DisplacementVolumeUOMOIDField = value;
      // this.RaisePropertyChanged("DisplacementVolumeUOMOID");
    }
  }

  get BatchNumber(): string {
    return this.BatchNumberField;
  }
  set BatchNumber(value: string) {
    if (this.referenceEquals(this.BatchNumberField, value)) {
      this.BatchNumberField = value;
      // this.RaisePropertyChanged("BatchNumber");
    }
  }

  get ExpiryDttm() {
    return this.ExpiryDttmField;
  }
  set ExpiryDttm(value) {
    if (this.ExpiryDttmField != value) {
      this.ExpiryDttmField = value;
      // this.RaisePropertyChanged("ExpiryDttm");
    }
  }

  get oDrugPrepHistoryData(): DrugPrepHistoryData {
    return this.oDrugPrepHistoryDataField;
  }
  set oDrugPrepHistoryData(value) {
    if (this.referenceEquals(this.oDrugPrepHistoryDataField, value)) {
      this.oDrugPrepHistoryDataField = value;
      // this.RaisePropertyChanged("oDrugPrepHistoryData");
    }
  }

  get IsInfusionFluid(): boolean {
    return this.IsInfusionFluidField;
  }
  set IsInfusionFluid(value: boolean) {
    if (this.IsInfusionFluidField != value) {
      this.IsInfusionFluidField = value;
      // this.RaisePropertyChanged("IsInfusionFluid");
    }
  }

  get CompIdentifyingOID(): number {
    return this.CompIdentifyingOIDField;
  }
  set CompIdentifyingOID(value: number) {
    if (this.CompIdentifyingOIDField != value) {
      this.CompIdentifyingOIDField = value;
      // this.RaisePropertyChanged("CompIdentifyingOID");
    }
  }

  get CompIdentifyingType(): string {
    return this.CompIdentifyingTypeField;
  }
  set CompIdentifyingType(value: string) {
    if (this.referenceEquals(this.CompIdentifyingTypeField, value)) {
      this.CompIdentifyingTypeField = value;
      // this.RaisePropertyChanged("CompIdentifyingType");
    }
  }

  get MedDrugPreparationdetailOID(): number {
    return this.MedDrugPreparationdetailOIDField;
  }
  set MedDrugPreparationdetailOID(value: number) {
    if (this.MedDrugPreparationdetailOIDField != value) {
      this.MedDrugPreparationdetailOIDField = value;
      // this.RaisePropertyChanged("MedDrugPreparationdetailOID");
    }
  }

  get QuantityUOMLZID(): string {
    return this.QuantityUOMLZIDField;
  }
  set QuantityUOMLZID(value: string) {
    if (this.referenceEquals(this.QuantityUOMLZIDField, value)) {
      this.QuantityUOMLZIDField = value;
      // this.RaisePropertyChanged("QuantityUOMLZID");
    }
  }

  get AdminMethod(): string {
    return this.AdminMethodField;
  }
  set AdminMethod(value: string) {
    if (this.referenceEquals(this.AdminMethodField, value)) {
      this.AdminMethodField = value;
      // this.RaisePropertyChanged("AdminMethod");
    }
  }

  get MCVersion(): string {
    return this.MCVersionField;
  }
  set MCVersion(value: string) {
    if (this.referenceEquals(this.MCVersionField, value)) {
      this.MCVersionField = value;
      // this.RaisePropertyChanged("MCVersion");
    }
  }

  get IdentifyingName(): string {
    return this.IdentifyingNameField;
  }
  set IdentifyingName(value: string) {
    if (this.referenceEquals(this.IdentifyingNameField, value)) {
      this.IdentifyingNameField = value;
      // this.RaisePropertyChanged("IdentifyingName");
    }
  }

  get PresItemLorenzoID(): string {
    return this.PresItemLorenzoIDField;
  }
  set PresItemLorenzoID(value: string) {
    if (this.referenceEquals(this.PresItemLorenzoIDField, value)) {
      this.PresItemLorenzoIDField = value;
      // this.RaisePropertyChanged("PresItemLorenzoID");
    }
  }

  get MCDoseUOMDeActivated(): string {
    return this.MCDoseUOMDeActivatedField;
  }
  set MCDoseUOMDeActivated(value: string) {
    if (this.referenceEquals(this.MCDoseUOMDeActivatedField, value)) {
      this.MCDoseUOMDeActivatedField = value;
      // this.RaisePropertyChanged("MCDoseUOMDeActivated");
    }
  }

  get DispenseInstructionCode(): string {
    return this.DispenseInstructionCodeField;
  }
  set DispenseInstructionCode(value: string) {
    if (this.referenceEquals(this.DispenseInstructionCodeField, value)) {
      this.DispenseInstructionCodeField = value;
      // this.RaisePropertyChanged("DispenseInstructionCode");
    }
  }

  get SupplyInstructionCode(): string {
    return this.SupplyInstructionCodeField;
  }
  set SupplyInstructionCode(value: string) {
    if (this.referenceEquals(this.SupplyInstructionCodeField, value)) {
      this.SupplyInstructionCodeField = value;
      // this.RaisePropertyChanged("SupplyInstructionCode");
    }
  }

  get SupplyInstruction() {
    return this.SupplyInstructionField;
  }
  set SupplyInstruction(value) {
    if (this.referenceEquals(this.SupplyInstructionField, value)) {
      this.SupplyInstructionField = value;
      // this.RaisePropertyChanged("SupplyInstruction");
    }
  }

  get DispensingInstruction(): ObjectInfo[] {
    return this.DispensingInstructionField;
  }
  set DispensingInstruction(value: ObjectInfo[]) {
    if (this.referenceEquals(this.DispensingInstructionField, value)) {
      this.DispensingInstructionField = value;
      // this.RaisePropertyChanged("DispensingInstruction");
    }
  }

  get OtherDispensingInstruction(): string {
    return this.OtherDispensingInstructionField;
  }
  set OtherDispensingInstruction(value: string) {
    if (
      this.referenceEquals(this.OtherDispensingInstructionField, value) != true
    ) {
      this.OtherDispensingInstructionField = value;
      // this.RaisePropertyChanged("OtherDispensingInstruction");
    }
  }

  get PrepStatusCode(): string {
    return this.PrepStatusCodeField;
  }
  set PrepStatusCode(value: string) {
    if (this.referenceEquals(this.PrepStatusCodeField, value)) {
      this.PrepStatusCodeField = value;
      // this.RaisePropertyChanged("PrepStatusCode");
    }
  }

  get IsWardStock(): boolean {
    return this.IsWardStockField;
  }
  set IsWardStock(value: boolean) {
    if (this.IsWardStockField != value) {
      this.IsWardStockField = value;
      // this.RaisePropertyChanged("IsWardStock");
    }
  }

  get IsSupplyRequested() {
    return this.IsSupplyRequestedField;
  }
  set IsSupplyRequested(value) {
    if (this.IsSupplyRequestedField != value) {
      this.IsSupplyRequestedField = value;
      // this.RaisePropertyChanged("IsSupplyRequested");
    }
  }

  get RequisitionCACode(): string {
    return this.RequisitionCACodeField;
  }
  set RequisitionCACode(value: string) {
    if (this.referenceEquals(this.RequisitionCACodeField, value)) {
      this.RequisitionCACodeField = value;
      // this.RaisePropertyChanged("RequisitionCACode");
    }
  }

  get TechValidateDetails(): TechnicalValidationInfo {
    return this.TechValidateDetailsField;
  }
  set TechValidateDetails(value: TechnicalValidationInfo) {
    if (this.referenceEquals(this.TechValidateDetailsField, value)) {
      this.TechValidateDetailsField = value;
      // this.RaisePropertyChanged("TechValidateDetails");
    }
  }

  get IsControlledDrug() {
    return this.IsControlledDrugField;
  }
  set IsControlledDrug(value) {
    if (this.IsControlledDrugField != value) {
      this.IsControlledDrugField = value;
      // this.RaisePropertyChanged("IsControlledDrug");
    }
  }

  get DrugProperties(): string {
    return this.DrugPropertiesField;
  }
  set DrugProperties(value: string) {
    if (this.referenceEquals(this.DrugPropertiesField, value)) {
      this.DrugPropertiesField = value;
      // this.RaisePropertyChanged("DrugProperties");
    }
  }

  get VMVPLorenzoID(): string {
    return this.VMVPLorenzoIDField;
  }
  set VMVPLorenzoID(value: string) {
    if (this.referenceEquals(this.VMVPLorenzoIDField, value)) {
      this.VMVPLorenzoIDField = value;
      // this.RaisePropertyChanged("VMVPLorenzoID");
    }
  }

  get VMVPMCIdentifyingName(): string {
    return this.VMVPMCIdentifyingNameField;
  }
  set VMVPMCIdentifyingName(value: string) {
    if (this.referenceEquals(this.VMVPMCIdentifyingNameField, value)) {
      this.VMVPMCIdentifyingNameField = value;
      // this.RaisePropertyChanged("VMVPMCIdentifyingName");
    }
  }

  //Abhishek TFS-7732

  get SupplyComments(): string {
    return this.SupplyCommentsField;
  }
  set SupplyComments(value: string) {
    if (this.referenceEquals(this.SupplyCommentsField, value)) {
      this.SupplyCommentsField = value;
      // this.RaisePropertyChanged("SupplyComments");
    }
  }

  get LastSupplyNameMCIChild(): string {
    return this.LastSupplyNameMCIChildField;
  }
  set LastSupplyNameMCIChild(value: string) {
    if (this.referenceEquals(this.LastSupplyNameMCIChildField, value)) {
      this.LastSupplyNameMCIChildField = value;
      // this.RaisePropertyChanged("LastSupplyNameMCIChild");
    }
  }

  get LastSupplyDTTMMCIChild() {
    return this.LastSupplyDTTMMCIChildField;
  }
  set LastSupplyDTTMMCIChild(value) {
    if (this.LastSupplyDTTMMCIChildField != value) {
      this.LastSupplyDTTMMCIChildField = value;
      // this.RaisePropertyChanged("LastSupplyDTTMMCIChild");
    }
  }

  get NextSupplyDTTM() {
    return this.NextSupplyDTTMField;
  }
  set NextSupplyDTTM(value) {
    if (this.NextSupplyDTTMField != value) {
      this.NextSupplyDTTMField = value;
      // this.RaisePropertyChanged("NextSupplyDTTM");
    }
  }

  get IsMCAuthorize(): boolean {
    return this.IsMCAuthorizeField;
  }
  set IsMCAuthorize(value) {
    if (this.IsMCAuthorizeField != value) {
      this.IsMCAuthorizeField = value;
      // this.RaisePropertyChanged("IsMCAuthorize");
    }
  }
}

export class DRCConflict {
  private OIDField = 0;
  private PatientOIDField = 0;
  private PrescriptionItemOIDField = 0;
  private DRCDefDoseTypeLorenzoIDField = '';
  private DRCDefDoseTypeCodeField = '';
  private DRCMessageField = '';
  private IsDRCPassedField = '';
  private StatusField = '';
  private OwnerOrganisationOIDField = 0;
  private PartKeyField = 0;
  private PatientWeightField = '';
  private PatientBSAField = '';
  private ConflictDetailsField = new Array<DRCConflictDetails>();
  private IsDRCCheckedField = false;
  referenceEquals(arg1:any, arg2:any) {
    return JSON.stringify(arg1) != JSON.stringify(arg2);
  }

  get OID(): number {
    return this.OIDField;
  }
  set OID(value: number) {
    if (this.OIDField != value) {
      this.OIDField = value;
      // this.RaisePropertyChanged("OID");
    }
  }

  get PatientOID(): number {
    return this.PatientOIDField;
  }
  set PatientOID(value: number) {
    if (this.PatientOIDField != value) {
      this.PatientOIDField = value;
      // this.RaisePropertyChanged("PatientOID");
    }
  }

  get PrescriptionItemOID(): number {
    return this.PrescriptionItemOIDField;
  }
  set PrescriptionItemOID(value: number) {
    if (this.PrescriptionItemOIDField != value) {
      this.PrescriptionItemOIDField = value;
      // this.RaisePropertyChanged("PrescriptionItemOID");
    }
  }

  get DRCDefDoseTypeLorenzoID(): string {
    return this.DRCDefDoseTypeLorenzoIDField;
  }
  set DRCDefDoseTypeLorenzoID(value: string) {
    if (this.referenceEquals(this.DRCDefDoseTypeLorenzoIDField, value)) {
      this.DRCDefDoseTypeLorenzoIDField = value;
      // this.RaisePropertyChanged("DRCDefDoseTypeLorenzoID");
    }
  }

  get DRCDefDoseTypeCode(): string {
    return this.DRCDefDoseTypeCodeField;
  }
  set DRCDefDoseTypeCode(value: string) {
    if (this.referenceEquals(this.DRCDefDoseTypeCodeField, value)) {
      this.DRCDefDoseTypeCodeField = value;
      // this.RaisePropertyChanged("DRCDefDoseTypeCode");
    }
  }

  get DRCMessage(): string {
    return this.DRCMessageField;
  }
  set DRCMessage(value: string) {
    if (this.referenceEquals(this.DRCMessageField, value)) {
      this.DRCMessageField = value;
      // this.RaisePropertyChanged("DRCMessage");
    }
  }

  get IsDRCPassed(): string {
    return this.IsDRCPassedField;
  }
  set IsDRCPassed(value: string) {
    if (this.referenceEquals(this.IsDRCPassedField, value)) {
      this.IsDRCPassedField = value;
      // this.RaisePropertyChanged("IsDRCPassed");
    }
  }

  get Status(): string {
    return this.StatusField;
  }
  set Status(value: string) {
    if (this.referenceEquals(this.StatusField, value)) {
      this.StatusField = value;
      // this.RaisePropertyChanged("Status");
    }
  }

  get OwnerOrganisationOID(): number {
    return this.OwnerOrganisationOIDField;
  }
  set OwnerOrganisationOID(value: number) {
    if (this.OwnerOrganisationOIDField != value) {
      this.OwnerOrganisationOIDField = value;
      // this.RaisePropertyChanged("OwnerOrganisationOID");
    }
  }

  get PartKey() {
    return this.PartKeyField;
  }
  set PartKey(value) {
    if (this.PartKeyField != value) {
      this.PartKeyField = value;
      // this.RaisePropertyChanged("PartKey");
    }
  }

  get PatientWeight(): string {
    return this.PatientWeightField;
  }
  set PatientWeight(value: string) {
    if (this.referenceEquals(this.PatientWeightField, value)) {
      this.PatientWeightField = value;
      // this.RaisePropertyChanged("PatientWeight");
    }
  }

  get PatientBSA(): string {
    return this.PatientBSAField;
  }
  set PatientBSA(value: string) {
    if (this.referenceEquals(this.PatientBSAField, value)) {
      this.PatientBSAField = value;
      // this.RaisePropertyChanged("PatientBSA");
    }
  }

  get ConflictDetails(): Array<DRCConflictDetails> {
    return this.ConflictDetailsField;
  }
  set ConflictDetails(value: Array<DRCConflictDetails>) {
    if (this.referenceEquals(this.ConflictDetailsField, value)) {
      this.ConflictDetailsField = value;
      // this.RaisePropertyChanged("ConflictDetails");
    }
  }

  get IsDRCChecked(): boolean {
    return this.IsDRCCheckedField;
  }
  set IsDRCChecked(value: boolean) {
    if (this.IsDRCCheckedField != value) {
      this.IsDRCCheckedField = value;
      // this.RaisePropertyChanged("IsDRCChecked");
    }
  }
}
export class DRCConflictDetails {
  private OIDField = 0;
  private PresItemDRCConflictOIDField = 0;
  private ErrorCodeField = '';
  private ErrorMessageField = '';
  private AcknowledgeReasonField = '';
  private IsCheckedField = '';
  private StatusField = '';
  private OwnerOrganisationOIDField = 0;
  //sameer
  //TFS: 12014
  private CommentsField = '';
  private BehaviourTypeField = '';
  private AcknowledgeReasonCodeField = '';
  private PartKeyField = 0;

  referenceEquals(arg1:any, arg2:any) {
    return JSON.stringify(arg1) != JSON.stringify(arg2);
  }

  get OID(): number {
    return this.OIDField;
  }
  set OID(value: number) {
    if (this.OIDField != value) {
      this.OIDField = value;
      // this.RaisePropertyChanged("OID");
    }
  }

  get PresItemDRCConflictOID(): number {
    return this.PresItemDRCConflictOIDField;
  }
  set PresItemDRCConflictOID(value: number) {
    if (this.PresItemDRCConflictOIDField != value) {
      this.PresItemDRCConflictOIDField = value;
      // this.RaisePropertyChanged("PresItemDRCConflictOID");
    }
  }

  get ErrorCode(): string {
    return this.ErrorCodeField;
  }
  set ErrorCode(value: string) {
    if (this.referenceEquals(this.ErrorCodeField, value)) {
      this.ErrorCodeField = value;
      // this.RaisePropertyChanged("ErrorCode");
    }
  }

  get ErrorMessage(): string {
    return this.ErrorMessageField;
  }
  set ErrorMessage(value: string) {
    if (this.referenceEquals(this.ErrorMessageField, value)) {
      this.ErrorMessageField = value;
      // this.RaisePropertyChanged("ErrorMessage");
    }
  }

  get AcknowledgeReason(): string {
    return this.AcknowledgeReasonField;
  }
  set AcknowledgeReason(value: string) {
    if (this.referenceEquals(this.AcknowledgeReasonField, value)) {
      this.AcknowledgeReasonField = value;
      // this.RaisePropertyChanged("AcknowledgeReason");
    }
  }
  get IsChecked(): string {
    return this.IsCheckedField;
  }
  set IsChecked(value: string) {
    if (this.referenceEquals(this.IsCheckedField, value)) {
      this.IsCheckedField = value;
      // this.RaisePropertyChanged("IsChecked");
    }
  }

  get Status(): string {
    return this.StatusField;
  }
  set Status(value: string) {
    if (this.referenceEquals(this.StatusField, value)) {
      this.StatusField = value;
      // this.RaisePropertyChanged("Status");
    }
  }

  get OwnerOrganisationOID(): number {
    return this.OwnerOrganisationOIDField;
  }
  set OwnerOrganisationOID(value: number) {
    if (this.OwnerOrganisationOIDField != value) {
      this.OwnerOrganisationOIDField = value;
      // this.RaisePropertyChanged("OwnerOrganisationOID");
    }
  }

  get Comments(): string {
    return this.CommentsField;
  }
  set Comments(value: string) {
    if (this.referenceEquals(this.CommentsField, value)) {
      this.CommentsField = value;
      // this.RaisePropertyChanged("Comments");
    }
  }

  get BehaviourType(): string {
    return this.BehaviourTypeField;
  }
  set BehaviourType(value: string) {
    if (this.referenceEquals(this.BehaviourTypeField, value)) {
      this.BehaviourTypeField = value;
      // this.RaisePropertyChanged("BehaviourType");
    }
  }

  get AcknowledgeReasonCode(): string {
    return this.AcknowledgeReasonCodeField;
  }
  set AcknowledgeReasonCode(value: string) {
    if (this.referenceEquals(this.AcknowledgeReasonCodeField, value)) {
      this.AcknowledgeReasonCodeField = value;
      // this.RaisePropertyChanged("AcknowledgeReasonCode");
    }
  }

  get PartKey(): number {
    return this.PartKeyField;
  }
  set PartKey(value: number) {
    if (this.PartKeyField != value) {
      this.PartKeyField = value;
      // this.RaisePropertyChanged("PartKey");
    }
  }
}

export class GPConnectAdminDosage {
  private textField = '';
  private instructionField = '';

  get Text(): string {
    return this.textField;
  }
  set Text(value: string) {
    this.textField = value;
    // this.RaisePropertyChanged("Text");
  }

  get Instruction(): string {
    return this.instructionField;
  }
  set Instruction(value: string) {
    this.instructionField = value;
    // this.RaisePropertyChanged("Instruction");
  }
}

export class Indication extends CLZOObject {
  private CodingschemeCodeField = '';
  private VersionField = '';
  private CodeField = '';
  private TermField = '';
  private TermKeyField = '';
  private TypeField = '';

  get CodingschemeCode(): string {
    return this.CodingschemeCodeField;
  }
  set CodingschemeCode(value: string) {
    if (this.referenceEquals(this.CodingschemeCodeField, value)) {
      this.CodingschemeCodeField = value;
      // this.RaisePropertyChanged("CodingschemeCode");
    }
  }

  get Version(): string {
    return this.VersionField;
  }
  set Version(value: string) {
    if (this.referenceEquals(this.VersionField, value)) {
      this.VersionField = value;
      // this.RaisePropertyChanged("Version");
    }
  }

  get Code(): string {
    return this.CodeField;
  }
  set Code(value: string) {
    if (this.referenceEquals(this.CodeField, value)) {
      this.CodeField = value;
      // this.RaisePropertyChanged("Code");
    }
  }

  get Term(): string {
    return this.TermField;
  }
  set Term(value: string) {
    if (this.referenceEquals(this.TermField, value)) {
      this.TermField = value;
      // this.RaisePropertyChanged("Term");
    }
  }

  get TermKey(): string {
    return this.TermKeyField;
  }
  set TermKey(value: string) {
    if (this.referenceEquals(this.TermKeyField, value)) {
      this.TermKeyField = value;
      // this.RaisePropertyChanged("TermKey");
    }
  }

  get Type(): string {
    return this.TypeField;
  }
  set Type(value: string) {
    if (this.referenceEquals(this.TypeField, value)) {
      this.TypeField = value;
      // this.RaisePropertyChanged("Type");
    }
  }
}

export class Quantity extends CLZOObject {
  private QuantityValueField = '';
  private QuantityUOMIdField = 0;
  private QuantityUOMNameField = '';

  get QuantityValue(): string {
    return this.QuantityValueField;
  }
  set QuantityValue(value: string) {
    if (this.referenceEquals(this.QuantityValueField, value) != true) {
      this.QuantityValueField = value;
      // this.RaisePropertyChanged("QuantityValue");
    }
  }

  get QuantityUOMId(): number {
    return this.QuantityUOMIdField;
  }
  set QuantityUOMId(value: number) {
    if (this.QuantityUOMIdField != value) {
      this.QuantityUOMIdField = value;
      // this.RaisePropertyChanged("QuantityUOMId");
    }
  }

  get QuantityUOMName(): string {
    return this.QuantityUOMNameField;
  }
  set QuantityUOMName(value: string) {
    if (this.referenceEquals(this.QuantityUOMNameField, value)) {
      this.QuantityUOMNameField = value;
      // this.RaisePropertyChanged("QuantityUOMName");
    }
  }
}
export class FrequencyDetails extends CLZOObject {
  private FrequencyField: ObjectInfo = new ObjectInfo();
  private IsFixedAdministrationField = '';
  private ScheduledTimesField: Array<Scheduledetails> = new Array<Scheduledetails>();
  private StatIndicatorField = '';
  private StatDoseField: MeasurableObject = new MeasurableObject();
  private FrequencyUOMField = '';
  private DaysOfWeeksField: ArrayOfString = new ArrayOfString();
  private FreqCodeField = '';
  private FreqLowEventField = 0;
  private FreqLowPeriodField = 0;
  private PRNScheduledDetField = '';

  get Frequency(): ObjectInfo {
    return this.FrequencyField;
  }
  set Frequency(value: ObjectInfo) {
    if (this.referenceEquals(this.FrequencyField, value)) {
      this.FrequencyField = value;
      // this.RaisePropertyChanged("Frequency");
    }
  }

  get IsFixedAdministration() {
    return this.IsFixedAdministrationField;
  }
  set IsFixedAdministration(value) {
    if (this.IsFixedAdministrationField != value) {
      this.IsFixedAdministrationField = value;
      // this.RaisePropertyChanged("IsFixedAdministration");
    }
  }

  get ScheduledTimes(): Array<Scheduledetails> {
    return this.ScheduledTimesField;
  }
  set ScheduledTimes(value: Array<Scheduledetails>) {
    if (this.referenceEquals(this.ScheduledTimesField, value)) {
      this.ScheduledTimesField = value;
      // this.RaisePropertyChanged("ScheduledTimes");
    }
  }

  get StatIndicator() {
    return this.StatIndicatorField;
  }
  set StatIndicator(value) {
    if (this.StatIndicatorField != value) {
      this.StatIndicatorField = value;
      // this.RaisePropertyChanged("StatIndicator");
    }
  }

  get StatDose(): MeasurableObject {
    return this.StatDoseField;
  }
  set StatDose(value: MeasurableObject) {
    if (this.referenceEquals(this.StatDoseField, value)) {
      this.StatDoseField = value;
      // this.RaisePropertyChanged("StatDose");
    }
  }

  get FrequencyUOM(): string {
    return this.FrequencyUOMField;
  }
  set FrequencyUOM(value: string) {
    if (this.referenceEquals(this.FrequencyUOMField, value)) {
      this.FrequencyUOMField = value;
      // this.RaisePropertyChanged("FrequencyUOM");
    }
  }

  get DaysOfWeeks(): ArrayOfString {
    return this.DaysOfWeeksField;
  }
  set DaysOfWeeks(value: ArrayOfString) {
    if (this.referenceEquals(this.DaysOfWeeksField, value)) {
      this.DaysOfWeeksField = value;
      // this.RaisePropertyChanged("DaysOfWeeks");
    }
  }

  get FreqCode(): string {
    return this.FreqCodeField;
  }
  set FreqCode(value: string) {
    if (this.referenceEquals(this.FreqCodeField, value)) {
      this.FreqCodeField = value;
      // this.RaisePropertyChanged("FreqCode");
    }
  }

  get FreqLowEvent(): number {
    return this.FreqLowEventField;
  }
  set FreqLowEvent(value: number) {
    if (this.FreqLowEventField != value) {
      this.FreqLowEventField = value;
      // this.RaisePropertyChanged("FreqLowEvent");
    }
  }

  get FreqLowPeriod(): number {
    return this.FreqLowPeriodField;
  }
  set FreqLowPeriod(value: number) {
    if (this.FreqLowPeriodField != value) {
      this.FreqLowPeriodField = value;
      // this.RaisePropertyChanged("FreqLowPeriod");
    }
  }

  get PRNScheduledDet() {
    return this.PRNScheduledDetField;
  }
  set PRNScheduledDet(value) {
    if (this.PRNScheduledDetField != value) {
      this.PRNScheduledDetField = value;
      // this.RaisePropertyChanged("PRNScheduledDet");
    }
  }
}
export class PrescriptionItemDose extends CLZOObject {
  private DoseTypeField: ObjectInfo = new ObjectInfo();

  private DoseRegimeField: DoseRegime = new DoseRegime();

  private ObservationResultField: ObjectInfo = new ObjectInfo();
  private PresItemEncounterField: ObjectInfo = new ObjectInfo();

  private IsClinicalEncounterPresItemField = false;

  get DoseType(): ObjectInfo {
    return this.DoseTypeField;
  }
  set DoseType(value: ObjectInfo) {
    if (this.referenceEquals(this.DoseTypeField, value)) {
      this.DoseTypeField = value;
      // this.RaisePropertyChanged("DoseType");
    }
  }

  get DoseRegime(): DoseRegime {
    return this.DoseRegimeField;
  }
  set DoseRegime(value: DoseRegime) {
    if (this.referenceEquals(this.DoseRegimeField, value)) {
      this.DoseRegimeField = value;
      // this.RaisePropertyChanged("DoseRegime");
    }
  }

  get ObservationResult(): ObjectInfo {
    return this.ObservationResultField;
  }
  set ObservationResult(value: ObjectInfo) {
    if (this.referenceEquals(this.ObservationResultField, value)) {
      this.ObservationResultField = value;
      // this.RaisePropertyChanged("ObservationResult");
    }
  }

  get PresItemEncounter(): ObjectInfo {
    return this.PresItemEncounterField;
  }
  set PresItemEncounter(value: ObjectInfo) {
    if (this.referenceEquals(this.PresItemEncounterField, value)) {
      this.PresItemEncounterField = value;
      // this.RaisePropertyChanged("PresItemEncounter");
    }
  }

  get IsClinicalEncounterPresItem(): boolean {
    return this.IsClinicalEncounterPresItemField;
  }
  set IsClinicalEncounterPresItem(value: boolean) {
    if (this.IsClinicalEncounterPresItemField != value) {
      this.IsClinicalEncounterPresItemField = value;
      // this.RaisePropertyChanged("IsClinicalEncounterPresItem");
    }
  }
}

export class GPConnectItem extends CLZOObject {
  private gPConnectIDField = '';
  private medicationItemDetailField = '';
  private itemTypeDisplayField = '';
  private lastIssuedField: Date = new Date();
  private dosageField: GPConnectAdminDosage[] = [];
  private medicationCodeField = '';
  private itemTypeCodeField = '';

  get GPConnectID(): string {
    return this.gPConnectIDField;
  }
  set GPConnectID(value: string) {
    this.gPConnectIDField = value;
    // this.RaisePropertyChanged("GPConnectID");
  }

  get MedicationItemDetail(): string {
    return this.medicationItemDetailField;
  }
  set MedicationItemDetail(value: string) {
    this.medicationItemDetailField = value;
    // this.RaisePropertyChanged("MedicationItemDetail");
  }

  get ItemTypeDisplay(): string {
    return this.itemTypeDisplayField;
  }
  set ItemTypeDisplay(value: string) {
    this.itemTypeDisplayField = value;
    // this.RaisePropertyChanged("ItemTypeDisplay");
  }

  get LastIssued() {
    return this.lastIssuedField;
  }
  set LastIssued(value) {
    this.lastIssuedField = value;
    // this.RaisePropertyChanged("LastIssued");
  }

  get Dosage(): GPConnectAdminDosage[] {
    return this.dosageField;
  }
  set Dosage(value) {
    this.dosageField = value;
    // this.RaisePropertyChanged("Dosage");
  }

  get MedicationCode(): string {
    return this.medicationCodeField;
  }
  set MedicationCode(value: string) {
    if (this.medicationCodeField != value) {
      this.medicationCodeField = value;
      // this.RaisePropertyChanged("MedicationCode");
    }
  }

  get ItemTypeCode(): string {
    return this.itemTypeCodeField;
  }
  set ItemTypeCode(value: string) {
    this.itemTypeCodeField = value;
    // this.RaisePropertyChanged("ItemTypeCode");
  }
}

export class IntravenousInfusionDetails extends CLZOObject {
  private FluidField: ObjectInfo = new ObjectInfo();

  private VolumeFiel = '';

  private VolumeUOMField: UOM = new UOM();
  private InfusionPeriodUOMField: UOM = new UOM();
  private RateUOMField: UOM = new UOM();
  private RateDenominatorUOMField: UOM = new UOM();
  private IsOxygenField = '';
  private IsSequentialPrescribingField = false;
  private FirstPrescItemOIDInSeqField = 0;
  private ParentPrescriptionItemOIDField = 0;
  private IsAlertShownField = false;
  private IsReviewAlertField = false;
  private IsInfusionInprogressField = false;
  private IsInfusionStartDTTMReachedField = false;
  private InfScheduleDTTMsField: ArrayOfDateTime = new ArrayOfDateTime();
  private IsInfusionRouteFiel = '';
  private IsInfAmendStartDTTMBlankField = false;
  private IsEstimatedStopRecalculationRequiredField = false;
  private SequentialPrescriptionItemOIDsField: ArrayOfLong = new ArrayOfLong();
  private LowConcentrationUOMOIDField: UOM = new UOM();
  private UpperConcentrationUOMOIDField: UOM = new UOM();
  private PreviousLowConcentrationUOMField: UOM = new UOM();
  private PreviousUpperConcentrationUOMField: UOM = new UOM();
  private IsInfusionField = false;
  private IsVolumeBasedInfusionField = '';
  private RoundOffCodeFiel = '';
  private RoundOffTextFiel = '';

  //Abhishek TFS-7732
  private FluidIdentifyingTypeFiel = '';

  private FluidIdentifyingOIDField = 0;

  private FluidLorenzoIDFiel = '';

  //Vijaya Seq Fix to get first active item
  private IsFirstItemField = false;
  //TFSID-39667
  //sameer seq fix
  private IsLastItemField = false;
  //
  private SequenceParentPrescItemOIDField = 0;


  private IsFluidAuthoriseField = false;

  get Fluid(): ObjectInfo {
    return this.FluidField;
  }
  set Fluid(value: ObjectInfo) {
    if (this.referenceEquals(this.FluidField, value)) {
      this.FluidField = value;
      // this.RaisePropertyChanged("Fluid");
    }
  }
  private VolumeField = '';
  get Volume(): string {
    return this.VolumeField;
  }
  set Volume(value: string) {
    if (this.referenceEquals(this.VolumeField, value)) {
      this.VolumeField = value;
      // this.RaisePropertyChanged("Volume");
    }
  }

  get VolumeUOM(): UOM {
    return this.VolumeUOMField;
  }
  set VolumeUOM(value: UOM) {
    if (this.referenceEquals(this.VolumeUOMField, value)) {
      this.VolumeUOMField = value;
      // this.RaisePropertyChanged("VolumeUOM");
    }
  }
  private InfusionPeriodField = '';
  get InfusionPeriod(): string {
    return this.InfusionPeriodField;
  }
  set InfusionPeriod(value: string) {
    if (this.referenceEquals(this.InfusionPeriodField, value)) {
      this.InfusionPeriodField = value;
      // this.RaisePropertyChanged("InfusionPeriod");
    }
  }

  get InfusionPeriodUOM(): UOM {
    return this.InfusionPeriodUOMField;
  }
  set InfusionPeriodUOM(value: UOM) {
    if (this.referenceEquals(this.InfusionPeriodUOMField, value)) {
      this.InfusionPeriodUOMField = value;
      // this.RaisePropertyChanged("InfusionPeriodUOM");
    }
  }
  private RateField = '';
  get Rate(): string {
    return this.RateField;
  }
  set Rate(value: string) {
    if (this.referenceEquals(this.RateField, value)) {
      this.RateField = value;
      // this.RaisePropertyChanged("Rate");
    }
  }
  get RateUOM(): UOM {
    return this.RateUOMField;
  }
  set RateUOM(value: UOM) {
    if (this.referenceEquals(this.RateUOMField, value)) {
      this.RateUOMField = value;
      // this.RaisePropertyChanged("RateUOM");
    }
  }

  get RateDenominatorUOM(): UOM {
    return this.RateDenominatorUOMField;
  }
  set RateDenominatorUOM(value: UOM) {
    if (this.referenceEquals(this.RateDenominatorUOMField, value)) {
      this.RateDenominatorUOMField = value;
      // this.RaisePropertyChanged("RateDenominatorUOM");
    }
  }
  private HumidificationField = '';
  get Humidification(): string {
    return this.HumidificationField;
  }
  set Humidification(value: string) {
    if (this.referenceEquals(this.HumidificationField, value)) {
      this.HumidificationField = value;
      // this.RaisePropertyChanged("Humidification");
    }
  }
  private PreviousRateField = '';
  get PreviousRate(): string {
    return this.PreviousRateField;
  }
  set PreviousRate(value: string) {
    if (this.referenceEquals(this.PreviousRateField, value)) {
      this.PreviousRateField = value;
      // this.RaisePropertyChanged("PreviousRate");
    }
  }
  private PreviousRateDrUOMNameField = '';
  get PreviousRateDrUOMName(): string {
    return this.PreviousRateDrUOMNameField;
  }
  set PreviousRateDrUOMName(value: string) {
    if (this.referenceEquals(this.PreviousRateDrUOMNameField, value)) {
      this.PreviousRateDrUOMNameField = value;
      // this.RaisePropertyChanged("PreviousRateDrUOMName");
    }
  }
  private PreviousRateUOMNameField = '';
  get PreviousRateUOMName(): string {
    return this.PreviousRateUOMNameField;
  }
  set PreviousRateUOMName(value: string) {
    if (this.referenceEquals(this.PreviousRateUOMNameField, value)) {
      this.PreviousRateUOMNameField = value;
      // this.RaisePropertyChanged("PreviousRateUOMName");
    }
  }
  private DeliveryDeviceField = '';
  get DeliveryDevice(): string {
    return this.DeliveryDeviceField;
  }
  set DeliveryDevice(value: string) {
    if (this.referenceEquals(this.DeliveryDeviceField, value)) {
      this.DeliveryDeviceField = value;
      // this.RaisePropertyChanged("DeliveryDevice");
    }
  }
  private LumenField = '';
  get Lumen(): string {
    return this.LumenField;
  }
  set Lumen(value: string) {
    if (this.referenceEquals(this.LumenField, value)) {
      this.LumenField = value;
      // this.RaisePropertyChanged("Lumen");
    }
  }
  private InfusionSeqOrderField = 0;
  get InfusionSeqOrder(): number {
    return this.InfusionSeqOrderField;
  }
  set InfusionSeqOrder(value: number) {
    if (this.InfusionSeqOrderField != value) {
      this.InfusionSeqOrderField = value;
      // this.RaisePropertyChanged("InfusionSeqOrder");
    }
  }
  private IsOnGoingField = '';
  get IsOnGoing(): string {
    return this.IsOnGoingField;
  }
  set IsOnGoing(value: string) {
    if (this.referenceEquals(this.IsOnGoingField, value)) {
      this.IsOnGoingField = value;
      // this.RaisePropertyChanged("IsOnGoing");
    }
  }

  private MaxDoseField = '';
  get MaxDose(): string {
    return this.MaxDoseField;
  }
  set MaxDose(value: string) {
    if (this.referenceEquals(this.MaxDoseField, value)) {
      this.MaxDoseField = value;
      // this.RaisePropertyChanged("MaxDose");
    }
  }
  private ConcentrationField = 0;
  get Concentration(): number {
    return this.ConcentrationField;
  }
  set Concentration(value: number) {
    if (this.ConcentrationField != value) {
      this.ConcentrationField = value;
      // this.RaisePropertyChanged("Concentration");
    }
  }
  private TargetSaturationUpperField = 0;
  get TargetSaturationUpper(): number {
    return this.TargetSaturationUpperField;
  }
  set TargetSaturationUpper(value: number) {
    if (this.TargetSaturationUpperField != value) {
      this.TargetSaturationUpperField = value;
      // this.RaisePropertyChanged("TargetSaturationUpper");
    }
  }
  private TargetSaturationLowerField = 0;
  get TargetSaturationLower(): number {
    return this.TargetSaturationLowerField;
  }
  set TargetSaturationLower(value: number) {
    if (this.TargetSaturationLowerField != value) {
      this.TargetSaturationLowerField = value;
      // this.RaisePropertyChanged("TargetSaturationLower");
    }
  }

  get IsOxygen(): string {
    return this.IsOxygenField;
  }
  set IsOxygen(value: string) {
    if (this.IsOxygenField != value) {
      this.IsOxygenField = value;
      // this.RaisePropertyChanged("IsOxygen");
    }
  }

  get IsSequentialPrescribing(): boolean {
    return this.IsSequentialPrescribingField;
  }
  set IsSequentialPrescribing(value: boolean) {
    if (this.IsSequentialPrescribingField != value) {
      this.IsSequentialPrescribingField = value;
      // this.RaisePropertyChanged("IsSequentialPrescribing");
    }
  }

  get FirstPrescItemOIDInSeq(): number {
    return this.FirstPrescItemOIDInSeqField;
  }
  set FirstPrescItemOIDInSeq(value: number) {
    if (this.FirstPrescItemOIDInSeqField != value) {
      this.FirstPrescItemOIDInSeqField = value;
      // this.RaisePropertyChanged("FirstPrescItemOIDInSeq");
    }
  }

  get ParentPrescriptionItemOID(): number {
    return this.ParentPrescriptionItemOIDField;
  }
  set ParentPrescriptionItemOID(value: number) {
    if (this.ParentPrescriptionItemOIDField != value) {
      this.ParentPrescriptionItemOIDField = value;
      // this.RaisePropertyChanged("ParentPrescriptionItemOID");
    }
  }
  private UparentPresitemOIDSeqField = 0;
  get UparentPresitemOIDSeq(): number {
    return this.UparentPresitemOIDSeqField;
  }
  set UparentPresitemOIDSeq(value: number) {
    if (this.UparentPresitemOIDSeqField != value) {
      this.UparentPresitemOIDSeqField = value;
      // this.RaisePropertyChanged("UparentPresitemOIDSeq");
    }
  }
  private InfusionSeqCountField = 0;
  get InfusionSeqCount(): number {
    return this.InfusionSeqCountField;
  }
  set InfusionSeqCount(value: number) {
    if (this.InfusionSeqCountField != value) {
      this.InfusionSeqCountField = value;
      // this.RaisePropertyChanged("InfusionSeqCount");
    }
  }

  get IsAlertShown(): boolean {
    return this.IsAlertShownField;
  }
  set IsAlertShown(value: boolean) {
    if (this.IsAlertShownField != value) {
      this.IsAlertShownField = value;
      // this.RaisePropertyChanged("IsAlertShown");
    }
  }
  private IsBolusInfusionField = '';
  get IsBolusInfusion(): string {
    return this.IsBolusInfusionField;
  }
  set IsBolusInfusion(value: string) {
    if (this.referenceEquals(this.IsBolusInfusionField, value)) {
      this.IsBolusInfusionField = value;
      // this.RaisePropertyChanged("IsBolusInfusion");
    }
  }

  get IsReviewAlert(): boolean {
    return this.IsReviewAlertField;
  }
  set IsReviewAlert(value: boolean) {
    if (this.IsReviewAlertField != value) {
      this.IsReviewAlertField = value;
      // this.RaisePropertyChanged("IsReviewAlert");
    }
  }

  get IsInfusionInprogress(): boolean {
    return this.IsInfusionInprogressField;
  }
  set IsInfusionInprogress(value: boolean) {
    if (this.IsInfusionInprogressField != value) {
      this.IsInfusionInprogressField = value;
      // this.RaisePropertyChanged("IsInfusionInprogress");
    }
  }

  get IsInfusionStartDTTMReached(): boolean {
    return this.IsInfusionStartDTTMReachedField;
  }
  set IsInfusionStartDTTMReached(value: boolean) {
    if (this.IsInfusionStartDTTMReachedField != value) {
      this.IsInfusionStartDTTMReachedField = value;
      // this.RaisePropertyChanged("IsInfusionStartDTTMReached");
    }
  }

  get InfScheduleDTTMs(): ArrayOfDateTime {
    return this.InfScheduleDTTMsField;
  }
  set InfScheduleDTTMs(value) {
    if (this.referenceEquals(this.InfScheduleDTTMsField, value)) {
      this.InfScheduleDTTMsField = value;
      // this.RaisePropertyChanged("InfScheduleDTTMs");
    }
  }
  private IsInfusionRouteField = '';
  get IsInfusionRoute(): string {
    return this.IsInfusionRouteField;
  }
  set IsInfusionRoute(value: string) {
    if (this.referenceEquals(this.IsInfusionRouteField, value)) {
      this.IsInfusionRouteField = value;
      // this.RaisePropertyChanged("IsInfusionRoute");
    }
  }

  get IsInfAmendStartDTTMBlank(): boolean {
    return this.IsInfAmendStartDTTMBlankField;
  }
  set IsInfAmendStartDTTMBlank(value: boolean) {
    if (this.IsInfAmendStartDTTMBlankField != value) {
      this.IsInfAmendStartDTTMBlankField = value;
      // this.RaisePropertyChanged("IsInfAmendStartDTTMBlank");
    }
  }

  get IsEstimatedStopRecalculationRequired(): boolean {
    return this.IsEstimatedStopRecalculationRequiredField;
  }
  set IsEstimatedStopRecalculationRequired(value: boolean) {
    if (this.IsEstimatedStopRecalculationRequiredField != value) {
      this.IsEstimatedStopRecalculationRequiredField = value;
      // this.RaisePropertyChanged("IsEstimatedStopRecalculationRequired");
    }
  }

  get SequentialPrescriptionItemOIDs(): ArrayOfLong {
    return this.SequentialPrescriptionItemOIDsField;
  }
  set SequentialPrescriptionItemOIDs(value) {
    if (this.referenceEquals(this.SequentialPrescriptionItemOIDsField, value)) {
      this.SequentialPrescriptionItemOIDsField = value;
      // this.RaisePropertyChanged("SequentialPrescriptionItemOIDs");
    }
  }

  private IsHUMIDCodeField = '';
  get HUMIDCode(): string {
    return this.IsHUMIDCodeField;
  }
  set HUMIDCode(value: string) {
    if (this.referenceEquals(this.IsHUMIDCodeField, value)) {
      this.IsHUMIDCodeField = value;
      // this.RaisePropertyChanged("HUMIDCode");
    }
  }
  private LowConcentrationField = '';
  get LowConcentration(): string {
    return this.LowConcentrationField;
  }
  set LowConcentration(value: string) {
    if (this.referenceEquals(this.LowConcentrationField, value)) {
      this.LowConcentrationField = value;
      // this.RaisePropertyChanged("LowConcentration");
    }
  }

  get LowConcentrationUOMOID(): UOM {
    return this.LowConcentrationUOMOIDField;
  }
  set LowConcentrationUOMOID(value: UOM) {
    if (this.referenceEquals(this.LowConcentrationUOMOIDField, value)) {
      this.LowConcentrationUOMOIDField = value;
      // this.RaisePropertyChanged("LowConcentrationUOMOID");
    }
  }
  private UpperConcentrationField = '';
  get UpperConcentration(): string {
    return this.UpperConcentrationField;
  }
  set UpperConcentration(value: string) {
    if (this.referenceEquals(this.UpperConcentrationField, value)) {
      this.UpperConcentrationField = value;
      // this.RaisePropertyChanged("UpperConcentration");
    }
  }

  get UpperConcentrationUOMOID(): UOM {
    return this.UpperConcentrationUOMOIDField;
  }
  set UpperConcentrationUOMOID(value: UOM) {
    if (this.referenceEquals(this.UpperConcentrationUOMOIDField, value)) {
      this.UpperConcentrationUOMOIDField = value;
      // this.RaisePropertyChanged("UpperConcentrationUOMOID");
    }
  }
  private UpperRateField = '';
  get UpperRate(): string {
    return this.UpperRateField;
  }
  set UpperRate(value: string) {
    if (this.referenceEquals(this.UpperRateField, value)) {
      this.UpperRateField = value;
      // this.RaisePropertyChanged("UpperRate");
    }
  }
  private PreviousUpperRateField = '';
  get PreviousUpperRate(): string {
    return this.PreviousUpperRateField;
  }
  set PreviousUpperRate(value: string) {
    if (this.referenceEquals(this.PreviousUpperRateField, value)) {
      this.PreviousUpperRateField = value;
      // this.RaisePropertyChanged("PreviousUpperRate");
    }
  }
  private PreviousLowConcentrationField = '';
  get PreviousLowConcentration(): string {
    return this.PreviousLowConcentrationField;
  }
  set PreviousLowConcentration(value: string) {
    if (this.referenceEquals(this.PreviousLowConcentrationField, value)) {
      this.PreviousLowConcentrationField = value;
      // this.RaisePropertyChanged("PreviousLowConcentration");
    }
  }

  get PreviousLowConcentrationUOM(): UOM {
    return this.PreviousLowConcentrationUOMField;
  }
  set PreviousLowConcentrationUOM(value: UOM) {
    if (this.referenceEquals(this.PreviousLowConcentrationUOMField, value)) {
      this.PreviousLowConcentrationUOMField = value;
      // this.RaisePropertyChanged("PreviousLowConcentrationUOM");
    }
  }
  private PreviousUpperConcentrationField = '';
  get PreviousUpperConcentration(): string {
    return this.PreviousUpperConcentrationField;
  }
  set PreviousUpperConcentration(value: string) {
    if (this.referenceEquals(this.PreviousUpperConcentrationField, value)) {
      this.PreviousUpperConcentrationField = value;
      // this.RaisePropertyChanged("PreviousUpperConcentration");
    }
  }

  get PreviousUpperConcentrationUOM(): UOM {
    return this.PreviousUpperConcentrationUOMField;
  }
  set PreviousUpperConcentrationUOM(value: UOM) {
    if (this.referenceEquals(this.PreviousUpperConcentrationUOMField, value)) {
      this.PreviousUpperConcentrationUOMField = value;
      // this.RaisePropertyChanged("PreviousUpperConcentrationUOM");
    }
  }

  private IsAlertShownValueField = '';
  get IsAlertShownValue(): string {
    return this.IsAlertShownValueField;
  }
  set IsAlertShownValue(value: string) {
    if (this.referenceEquals(this.IsAlertShownValueField, value)) {
      this.IsAlertShownValueField = value;
      // this.RaisePropertyChanged("IsAlertShownValue");
    }
  }

  get IsInfusion(): boolean {
    return this.IsInfusionField;
  }
  set IsInfusion(value: boolean) {
    if (this.IsInfusionField != value) {
      this.IsInfusionField = value;
      // this.RaisePropertyChanged("IsInfusion");
    }
  }

  get IsVolumeBasedInfusion(): string {
    return this.IsVolumeBasedInfusionField;
  }
  set IsVolumeBasedInfusion(value: string) {
    if (this.IsVolumeBasedInfusionField != value) {
      this.IsVolumeBasedInfusionField = value;
      // this.RaisePropertyChanged("IsVolumeBasedInfusion");
    }
  }
  private RoundOffCodeField = '';
  get RoundOffCode(): string {
    return this.RoundOffCodeField;
  }
  set RoundOffCode(value: string) {
    if (this.referenceEquals(this.RoundOffCodeField, value)) {
      this.RoundOffCodeField = value;
      // this.RaisePropertyChanged("RoundOffCode");
    }
  }
  private RoundOffTextField = '';
  get RoundOffText(): string {
    return this.RoundOffTextField;
  }
  set RoundOffText(value: string) {
    if (this.referenceEquals(this.RoundOffTextField, value)) {
      this.RoundOffTextField = value;
      // this.RaisePropertyChanged("RoundOffText");
    }
  }

  private FluidIdentifyingTypeField = '';
  get FluidIdentifyingType(): string {
    return this.FluidIdentifyingTypeField;
  }
  set FluidIdentifyingType(value: string) {
    if (this.referenceEquals(this.FluidIdentifyingTypeField, value)) {
      this.FluidIdentifyingTypeField = value;
      // this.RaisePropertyChanged("FluidIdentifyingType");
    }
  }

  get FluidIdentifyingOID(): number {
    return this.FluidIdentifyingOIDField;
  }
  set FluidIdentifyingOID(value: number) {
    if (this.FluidIdentifyingOIDField != value) {
      this.FluidIdentifyingOIDField = value;
      // this.RaisePropertyChanged("FluidIdentifyingOID");
    }
  }
  private FluidLorenzoIDField = '';
  get FluidLorenzoID(): string {
    return this.FluidLorenzoIDField;
  }
  set FluidLorenzoID(value: string) {
    if (this.referenceEquals(this.FluidLorenzoIDField, value)) {
      this.FluidLorenzoIDField = value;
      // this.RaisePropertyChanged("FluidLorenzoID");
    }
  }

  get IsFirstItem(): boolean {
    return this.IsFirstItemField;
  }
  set IsFirstItem(value: boolean) {
    if (this.referenceEquals(this.IsFirstItemField, value)) {
      this.IsFirstItemField = value;
      // this.RaisePropertyChanged("IsFirstItem");
    }
  }
  private InfusionGroupSequenceNoField = 0;
  get InfusionGroupSequenceNo(): number {
    return this.InfusionGroupSequenceNoField;
  }
  set InfusionGroupSequenceNo(value: number) {
    if (this.InfusionGroupSequenceNoField != value) {
      this.InfusionGroupSequenceNoField = value;
      // this.RaisePropertyChanged("InfusionGroupSequenceNo");
    }
  }

  get IsLastItem(): boolean {
    return this.IsLastItemField;
  }
  set IsLastItem(value: boolean) {
    if (this.referenceEquals(this.IsLastItemField, value)) {
      this.IsLastItemField = value;
      // this.RaisePropertyChanged("IsLastItem");
    }
  }

  get SequenceParentPrescItemOID(): number {
    return this.SequenceParentPrescItemOIDField;
  }
  set SequenceParentPrescItemOID(value: number) {
    if (this.SequenceParentPrescItemOIDField != value) {
      this.SequenceParentPrescItemOIDField = value;
      // this.RaisePropertyChanged("SequenceParentPrescItemOID");
    }
  }
  private SeqInfOrderForPervImmediateItmField = 0;
  get SeqInfOrderForPervImmediateItm(): number {
    return this.SeqInfOrderForPervImmediateItmField;
  }
  set SeqInfOrderForPervImmediateItm(value: number) {
    if (this.SeqInfOrderForPervImmediateItmField != value) {
      this.SeqInfOrderForPervImmediateItmField = value;
      // this.RaisePropertyChanged("SeqInfOrderForPervImmediateItm");
    }
  }

  get IsFluidAuthorise(): boolean {
    return this.IsFluidAuthoriseField;
  }
  set IsFluidAuthorise(value: boolean) {
    if (this.referenceEquals(this.IsFluidAuthoriseField, value)) {
      this.IsFluidAuthoriseField = value;
      // this.RaisePropertyChanged("IsFluidAuthorise");
    }
  }
}

export class PrescriptionItemAdminDetails extends CLZOObject {
  private gnField = false;
  private OIDField? = '';
  private BatchNumberField = '';
  private ExpiryDateField: Date = new Date();
  private WitnessedByField: ObjectInfo = new ObjectInfo();
  private AdministredDateField: Date = new Date();
  private CommentsField = '';
  private DoseAdministeredField = '';
  private DoseAdministeredUOMField: UOM = new UOM();
  private AdministeredByField: ObjectInfo = new ObjectInfo();
  private AdminInstructionField = '';
  private RouteOIDField = '';
  private IsPCAField = '';
  private SiteField: ObjectInfo = new ObjectInfo();
  private IsNoWitnessAvailableField = false;
  private ConcentrationStrengthField = '';
  private ConcentrationStrengthUOMField: ObjectInfo = new ObjectInfo();
  private ConcentrationVolumeField = '';
  private ConcentrationVolumeUOMField: ObjectInfo = new ObjectInfo();
  private InfusionPeriodforMedAdminField = 0;
  private InfusionPeriodUOMforMedAdminField: ObjectInfo = new ObjectInfo();
  private InfusionDoseField = '';
  private InfusionDoseUOMNumeratorField: ObjectInfo = new ObjectInfo();
  private InfusionDoseUOMDenominatorField: ObjectInfo = new ObjectInfo();
  private BagSequenceField = 0;
  private DeliveryDeviceField = '';
  private InfusionRateField = '';
  private InfusionRateUOMField: ObjectInfo = new ObjectInfo();
  private InfusionRatePerUOMField: ObjectInfo = new ObjectInfo();
  private DripRateField = '';
  private DripRateUOMField: ObjectInfo = new ObjectInfo();
  private DripRatePerUOMField: ObjectInfo = new ObjectInfo();
  private BagVolumeField = '';
  private BagVolumeUOMField: ObjectInfo = new ObjectInfo();
  private LumenField = '';
  private InfusionEndDateField: Date = new Date();
  private AdminEndTimeField: Date = new Date();
  private MedicationActionField = '';
  private InfuationTypeField = '';
  private InfusionPeriodField = '';
  private InfusionPeriodUOMField: ObjectInfo = new ObjectInfo();
  private isInfusionBolusIntermittentField = false;
  private HumidCodeField = '';
  private slotScheduleDateField: Date = new Date();

  //BNS Homeleave-73655
  private IsDuringHomeLeaveField = false;
  get gn(): boolean {
    return this.gnField;
  }
  set gn(value: boolean) {
    if (this.gnField != value) {
      this.gnField = value;
      // this.RaisePropertyChanged("gn");
    }
  }

  get OID() {
    return this.OIDField;
  }
  set OID(value) {
    if (this.OIDField != value) {
      this.OIDField = value;
      // this.RaisePropertyChanged("OID");
    }
  }

  get BatchNumber(): string {
    return this.BatchNumberField;
  }
  set BatchNumber(value: string) {
    if (this.referenceEquals(this.BatchNumberField, value)) {
      this.BatchNumberField = value;
      // this.RaisePropertyChanged("BatchNumber");
    }
  }

  get ExpiryDate(): Date {
    return this.ExpiryDateField;
  }
  set ExpiryDate(value: Date) {
    if (this.ExpiryDateField != value) {
      this.ExpiryDateField = value;
      // this.RaisePropertyChanged("ExpiryDate");
    }
  }

  get WitnessedBy(): ObjectInfo {
    return this.WitnessedByField;
  }
  set WitnessedBy(value: ObjectInfo) {
    if (this.referenceEquals(this.WitnessedByField, value)) {
      this.WitnessedByField = value;
      // this.RaisePropertyChanged("WitnessedBy");
    }
  }

  get AdministredDate(): Date {
    return this.AdministredDateField;
  }
  set AdministredDate(value: Date) {
    if (this.AdministredDateField != value) {
      this.AdministredDateField = value;
      // this.RaisePropertyChanged("AdministredDate");
    }
  }

  get Comments(): string {
    return this.CommentsField;
  }
  set Comments(value: string) {
    if (this.referenceEquals(this.CommentsField, value)) {
      this.CommentsField = value;
      // this.RaisePropertyChanged("Comments");
    }
  }

  get DoseAdministered(): string {
    return this.DoseAdministeredField;
  }
  set DoseAdministered(value: string) {
    if (this.referenceEquals(this.DoseAdministeredField, value)) {
      this.DoseAdministeredField = value;
      // this.RaisePropertyChanged("DoseAdministered");
    }
  }

  get DoseAdministeredUOM(): UOM {
    return this.DoseAdministeredUOMField;
  }
  set DoseAdministeredUOM(value: UOM) {
    if (this.referenceEquals(this.DoseAdministeredUOMField, value)) {
      this.DoseAdministeredUOMField = value;
      // this.RaisePropertyChanged("DoseAdministeredUOM");
    }
  }

  get AdministeredBy(): ObjectInfo {
    return this.AdministeredByField;
  }
  set AdministeredBy(value: ObjectInfo) {
    if (this.referenceEquals(this.AdministeredByField, value)) {
      this.AdministeredByField = value;
      // this.RaisePropertyChanged("AdministeredBy");
    }
  }

  get AdminInstruction(): string {
    return this.AdminInstructionField;
  }
  set AdminInstruction(value: string) {
    if (this.referenceEquals(this.AdminInstructionField, value)) {
      this.AdminInstructionField = value;
      // this.RaisePropertyChanged("AdminInstruction");
    }
  }

  get RouteOID() {
    return this.RouteOIDField;
  }
  set RouteOID(value) {
    if (this.RouteOIDField != value) {
      this.RouteOIDField = value;
      // this.RaisePropertyChanged("RouteOID");
    }
  }

  get IsPCA(): string {
    return this.IsPCAField;
  }
  set IsPCA(value: string) {
    if (this.IsPCAField != value) {
      this.IsPCAField = value;
      // this.RaisePropertyChanged("IsPCA");
    }
  }

  get Site(): ObjectInfo {
    return this.SiteField;
  }
  set Site(value: ObjectInfo) {
    if (this.referenceEquals(this.SiteField, value)) {
      this.SiteField = value;
      // this.RaisePropertyChanged("Site");
    }
  }

  get IsNoWitnessAvailable(): boolean {
    return this.IsNoWitnessAvailableField;
  }
  set IsNoWitnessAvailable(value: boolean) {
    if (this.IsNoWitnessAvailableField != value) {
      this.IsNoWitnessAvailableField = value;
      // this.RaisePropertyChanged("IsNoWitnessAvailable");
    }
  }

  get ConcentrationStrength(): string {
    return this.ConcentrationStrengthField;
  }
  set ConcentrationStrength(value: string) {
    if (this.referenceEquals(this.ConcentrationStrengthField, value)) {
      this.ConcentrationStrengthField = value;
      // this.RaisePropertyChanged("ConcentrationStrength");
    }
  }

  get ConcentrationStrengthUOM(): ObjectInfo {
    return this.ConcentrationStrengthUOMField;
  }
  set ConcentrationStrengthUOM(value: ObjectInfo) {
    if (this.referenceEquals(this.ConcentrationStrengthUOMField, value)) {
      this.ConcentrationStrengthUOMField = value;
      // this.RaisePropertyChanged("ConcentrationStrengthUOM");
    }
  }

  get ConcentrationVolume(): string {
    return this.ConcentrationVolumeField;
  }
  set ConcentrationVolume(value: string) {
    if (this.referenceEquals(this.ConcentrationVolumeField, value)) {
      this.ConcentrationVolumeField = value;
      // this.RaisePropertyChanged("ConcentrationVolume");
    }
  }
  get ConcentrationVolumeUOM(): ObjectInfo {
    return this.ConcentrationVolumeUOMField;
  }
  set ConcentrationVolumeUOM(value: ObjectInfo) {
    if (this.referenceEquals(this.ConcentrationVolumeUOMField, value)) {
      this.ConcentrationVolumeUOMField = value;
      // this.RaisePropertyChanged("ConcentrationVolumeUOM");
    }
  }

  get InfusionPeriodforMedAdmin(): number {
    return this.InfusionPeriodforMedAdminField;
  }
  set InfusionPeriodforMedAdmin(value: number) {
    if (this.InfusionPeriodforMedAdminField != value) {
      this.InfusionPeriodforMedAdminField = value;
      // this.RaisePropertyChanged("InfusionPeriodforMedAdmin");
    }
  }

  get InfusionPeriodUOMforMedAdmin(): ObjectInfo {
    return this.InfusionPeriodUOMforMedAdminField;
  }
  set InfusionPeriodUOMforMedAdmin(value: ObjectInfo) {
    if (this.referenceEquals(this.InfusionPeriodUOMforMedAdminField, value)) {
      this.InfusionPeriodUOMforMedAdminField = value;
      // this.RaisePropertyChanged("InfusionPeriodUOMforMedAdmin");
    }
  }

  get InfusionDose(): string {
    return this.InfusionDoseField;
  }
  set InfusionDose(value: string) {
    if (this.referenceEquals(this.InfusionDoseField, value)) {
      this.InfusionDoseField = value;
      // this.RaisePropertyChanged("InfusionDose");
    }
  }

  get InfusionDoseUOMNumerator(): ObjectInfo {
    return this.InfusionDoseUOMNumeratorField;
  }
  set InfusionDoseUOMNumerator(value: ObjectInfo) {
    if (this.referenceEquals(this.InfusionDoseUOMNumeratorField, value)) {
      this.InfusionDoseUOMNumeratorField = value;
      // this.RaisePropertyChanged("InfusionDoseUOMNumerator");
    }
  }

  get InfusionDoseUOMDenominator(): ObjectInfo {
    return this.InfusionDoseUOMDenominatorField;
  }
  set InfusionDoseUOMDenominator(value: ObjectInfo) {
    if (this.referenceEquals(this.InfusionDoseUOMDenominatorField, value)) {
      this.InfusionDoseUOMDenominatorField = value;
      // this.RaisePropertyChanged("InfusionDoseUOMDenominator");
    }
  }

  get BagSequence(): number {
    return this.BagSequenceField;
  }
  set BagSequence(value: number) {
    if (this.BagSequenceField != value) {
      this.BagSequenceField = value;
      // this.RaisePropertyChanged("BagSequence");
    }
  }

  get DeliveryDevice(): string {
    return this.DeliveryDeviceField;
  }
  set DeliveryDevice(value: string) {
    if (this.referenceEquals(this.DeliveryDeviceField, value)) {
      this.DeliveryDeviceField = value;
      // this.RaisePropertyChanged("DeliveryDevice");
    }
  }

  get InfusionRate(): string {
    return this.InfusionRateField;
  }
  set InfusionRate(value: string) {
    if (this.referenceEquals(this.InfusionRateField, value)) {
      this.InfusionRateField = value;
      // this.RaisePropertyChanged("InfusionRate");
    }
  }

  get InfusionRateUOM(): ObjectInfo {
    return this.InfusionRateUOMField;
  }
  set InfusionRateUOM(value: ObjectInfo) {
    if (this.referenceEquals(this.InfusionRateUOMField, value)) {
      this.InfusionRateUOMField = value;
      // this.RaisePropertyChanged("InfusionRateUOM");
    }
  }

  get InfusionRatePerUOM(): ObjectInfo {
    return this.InfusionRatePerUOMField;
  }
  set InfusionRatePerUOM(value: ObjectInfo) {
    if (this.referenceEquals(this.InfusionRatePerUOMField, value)) {
      this.InfusionRatePerUOMField = value;
      // this.RaisePropertyChanged("InfusionRatePerUOM");
    }
  }

  get DripRate(): string {
    return this.DripRateField;
  }
  set DripRate(value: string) {
    if (this.referenceEquals(this.DripRateField, value) != true) {
      this.DripRateField = value;
      // this.RaisePropertyChanged("DripRate");
    }
  }

  get DripRateUOM(): ObjectInfo {
    return this.DripRateUOMField;
  }
  set DripRateUOM(value: ObjectInfo) {
    if (this.referenceEquals(this.DripRateUOMField, value)) {
      this.DripRateUOMField = value;
      // this.RaisePropertyChanged("DripRateUOM");
    }
  }

  get DripRatePerUOM(): ObjectInfo {
    return this.DripRatePerUOMField;
  }
  set DripRatePerUOM(value: ObjectInfo) {
    if (this.referenceEquals(this.DripRatePerUOMField, value)) {
      this.DripRatePerUOMField = value;
      // this.RaisePropertyChanged("DripRatePerUOM");
    }
  }

  get BagVolume(): string {
    return this.BagVolumeField;
  }
  set BagVolume(value: string) {
    if (this.referenceEquals(this.BagVolumeField, value)) {
      this.BagVolumeField = value;
      // this.RaisePropertyChanged("BagVolume");
    }
  }

  get BagVolumeUOM(): ObjectInfo {
    return this.BagVolumeUOMField;
  }
  set BagVolumeUOM(value: ObjectInfo) {
    if (this.referenceEquals(this.BagVolumeUOMField, value)) {
      this.BagVolumeUOMField = value;
      // this.RaisePropertyChanged("BagVolumeUOM");
    }
  }

  get Lumen(): string {
    return this.LumenField;
  }
  set Lumen(value: string) {
    if (this.referenceEquals(this.LumenField, value)) {
      this.LumenField = value;
      // this.RaisePropertyChanged("Lumen");
    }
  }

  get InfusionEndDate(): Date {
    return this.InfusionEndDateField;
  }
  set InfusionEndDate(value: Date) {
    if (this.InfusionEndDateField != value) {
      this.InfusionEndDateField = value;
      // this.RaisePropertyChanged("InfusionEndDate");
    }
  }

  get AdminEndTime(): Date {
    return this.AdminEndTimeField;
  }
  set AdminEndTime(value: Date) {
    if (this.AdminEndTimeField != value) {
      this.AdminEndTimeField = value;
      // this.RaisePropertyChanged("AdminEndTime");
    }
  }

  get MedicationAction(): string {
    return this.MedicationActionField;
  }
  set MedicationAction(value: string) {
    if (this.referenceEquals(this.MedicationActionField, value)) {
      this.MedicationActionField = value;
      // this.RaisePropertyChanged("MedicationAction");
    }
  }

  get InfuationType(): string {
    return this.InfuationTypeField;
  }
  set InfuationType(value: string) {
    if (this.referenceEquals(this.InfuationTypeField, value)) {
      this.InfuationTypeField = value;
      // this.RaisePropertyChanged("InfuationType");
    }
  }

  get InfusionPeriod(): string {
    return this.InfusionPeriodField;
  }
  set InfusionPeriod(value: string) {
    if (this.referenceEquals(this.InfusionPeriodField, value)) {
      this.InfusionPeriodField = value;
      // this.RaisePropertyChanged("InfusionPeriod");
    }
  }

  get InfusionPeriodUOM(): ObjectInfo {
    return this.InfusionPeriodUOMField;
  }
  set InfusionPeriodUOM(value: ObjectInfo) {
    if (this.referenceEquals(this.InfusionPeriodUOMField, value)) {
      this.InfusionPeriodUOMField = value;
      // this.RaisePropertyChanged("InfusionPeriodUOM");
    }
  }
  get isInfusionBolusIntermittent(): boolean {
    return this.isInfusionBolusIntermittentField;
  }
  set isInfusionBolusIntermittent(value: boolean) {
    if (this.isInfusionBolusIntermittentField != value) {
      this.isInfusionBolusIntermittentField = value;
      // this.RaisePropertyChanged("isInfusionBolusIntermittent");
    }
  }

  get HumidCode(): string {
    return this.HumidCodeField;
  }
  set HumidCode(value: string) {
    if (this.referenceEquals(this.HumidCodeField, value)) {
      this.HumidCodeField = value;
      // this.RaisePropertyChanged("HumidCode");
    }
  }

  get SlotScheduleDate(): Date {
    return this.slotScheduleDateField;
  }
  set SlotScheduleDate(value: Date) {
    if (this.slotScheduleDateField != value) {
      this.slotScheduleDateField = value;
      // this.RaisePropertyChanged("SlotScheduleDate");
    }
  }

  //BNS Homeleave-73655

  get IsDuringHomeLeave(): boolean {
    return this.IsDuringHomeLeaveField;
  }
  set IsDuringHomeLeave(value: boolean) {
    if (this.IsDuringHomeLeaveField != value) {
      this.IsDuringHomeLeaveField = value;
      // this.RaisePropertyChanged("IsDuringHomeLeave");
    }
  }
}

export class RequisitionHistoryDetails extends CLZOObject {
  private ServiceOIDField = 0;
  private ServicePointNameField = '';
  private LocationOIDField = 0;
  private UsersOIDField = 0;
  private RequisitionedByField = '';
  private RoleOIDField = 0;
  private RoleNameField = '';
  private RequisitionDTTMField: Date = new Date();
  private LocationNameField = '';
  //NPK - TFS 1381 - WardStock - Start
  private RequestedCancelledByField = '';
  private RequestStatusField = '';
  //NPK - TFS 1381 - WardStock - End

  get ServiceOID(): number {
    return this.ServiceOIDField;
  }
  set ServiceOID(value: number) {
    if (this.ServiceOIDField != value) {
      this.ServiceOIDField = value;
      // this.RaisePropertyChanged("ServiceOID");
    }
  }

  get ServicePointName(): string {
    return this.ServicePointNameField;
  }
  set ServicePointName(value: string) {
    if (this.referenceEquals(this.ServicePointNameField, value)) {
      this.ServicePointNameField = value;
      // this.RaisePropertyChanged("ServicePointName");
    }
  }

  get LocationOID(): number {
    return this.LocationOIDField;
  }
  set LocationOID(value: number) {
    if (this.LocationOIDField != value) {
      this.LocationOIDField = value;
      // this.RaisePropertyChanged("LocationOID");
    }
  }

  get UsersOID(): number {
    return this.UsersOIDField;
  }
  set UsersOID(value: number) {
    if (this.UsersOIDField != value) {
      this.UsersOIDField = value;
      // this.RaisePropertyChanged("UsersOID");
    }
  }

  get RequisitionedBy(): string {
    return this.RequisitionedByField;
  }
  set RequisitionedBy(value: string) {
    if (this.referenceEquals(this.RequisitionedByField, value)) {
      this.RequisitionedByField = value;
      // this.RaisePropertyChanged("RequisitionedBy");
    }
  }

  get RoleOID(): number {
    return this.RoleOIDField;
  }
  set RoleOID(value: number) {
    if (this.RoleOIDField != value) {
      this.RoleOIDField = value;
      // this.RaisePropertyChanged("RoleOID");
    }
  }

  get RoleName(): string {
    return this.RoleNameField;
  }
  set RoleName(value: string) {
    if (this.referenceEquals(this.RoleNameField, value)) {
      this.RoleNameField = value;
      // this.RaisePropertyChanged("RoleName");
    }
  }

  get RequisitionDTTM(): Date {
    return this.RequisitionDTTMField;
  }
  set RequisitionDTTM(value: Date) {
    if (this.RequisitionDTTMField != value) {
      this.RequisitionDTTMField = value;
      // this.RaisePropertyChanged("RequisitionDTTM");
    }
  }

  get LocationName(): string {
    return this.LocationNameField;
  }
  set LocationName(value: string) {
    if (this.referenceEquals(this.LocationNameField, value)) {
      this.LocationNameField = value;
      // this.RaisePropertyChanged("LocationName");
    }
  }

  get RequestedCancelledBy(): string {
    return this.RequestedCancelledByField;
  }
  set RequestedCancelledBy(value: string) {
    if (this.referenceEquals(this.RequestedCancelledByField, value)) {
      this.RequestedCancelledByField = value;
      // this.RaisePropertyChanged("RequestedCancelledBy");
    }
  }

  get RequestStatus(): string {
    return this.RequestStatusField;
  }
  set RequestStatus(value: string) {
    if (this.referenceEquals(this.RequestStatusField, value)) {
      this.RequestStatusField = value;
      // this.RaisePropertyChanged("RequestStatus");
    }
  }
}

export class DoseRegimeInfusionDetail extends CLZOObject {
  private OIDField = 0;
  private PrescriptionItemDosageOIDField = 0;
  private InfusionRateField = '';
  private RateNumeratorField: UOM = new UOM();
  private RateDenominatorField: UOM = new UOM();
  private DurationField: MeasurableObject = new MeasurableObject();
  private VariableDoseInstructionField = '';
  private IsAlertShownField = false;
  private UpperInfusionRateField = '';

  get OID(): number {
    return this.OIDField;
  }
  set OID(value: number) {
    if (this.OIDField != value) {
      this.OIDField = value;
      // this.RaisePropertyChanged("OID");
    }
  }
  get PrescriptionItemDosageOID(): number {
    return this.PrescriptionItemDosageOIDField;
  }
  set PrescriptionItemDosageOID(value: number) {
    if ((this.PrescriptionItemDosageOIDField != value) != true) {
      this.PrescriptionItemDosageOIDField = value;
      // this.RaisePropertyChanged("PrescriptionItemDosageOID");
    }
  }

  get InfusionRate(): string {
    return this.InfusionRateField;
  }
  set InfusionRate(value: string) {
    if (this.referenceEquals(this.InfusionRateField, value) != true) {
      this.InfusionRateField = value;
      // this.RaisePropertyChanged("InfusionRate");
    }
  }

  get RateNumerator(): UOM {
    return this.RateNumeratorField;
  }
  set RateNumerator(value: UOM) {
    if (this.referenceEquals(this.RateNumeratorField, value)) {
      this.RateNumeratorField = value;
      // this.RaisePropertyChanged("RateNumerator");
    }
  }

  get RateDenominator(): UOM {
    return this.RateDenominatorField;
  }
  set RateDenominator(value: UOM) {
    if (this.referenceEquals(this.RateDenominatorField, value) != true) {
      this.RateDenominatorField = value;
      // this.RaisePropertyChanged("RateDenominator");
    }
  }

  get Duration(): MeasurableObject {
    return this.DurationField;
  }
  set Duration(value: MeasurableObject) {
    if (this.referenceEquals(this.DurationField, value)) {
      this.DurationField = value;
      // this.RaisePropertyChanged("Duration");
    }
  }

  get VariableDoseInstruction(): string {
    return this.VariableDoseInstructionField;
  }
  set VariableDoseInstruction(value: string) {
    if (this.referenceEquals(this.VariableDoseInstructionField, value)) {
      this.VariableDoseInstructionField = value;
      // this.RaisePropertyChanged("VariableDoseInstruction");
    }
  }

  get IsAlertShown(): boolean {
    return this.IsAlertShownField;
  }
  set IsAlertShown(value: boolean) {
    if (this.IsAlertShownField != value) {
      this.IsAlertShownField = value;
      // this.RaisePropertyChanged("IsAlertShown");
    }
  }

  get UpperInfusionRate(): string {
    return this.UpperInfusionRateField;
  }
  set UpperInfusionRate(value: string) {
    if (this.referenceEquals(this.UpperInfusionRateField, value)) {
      this.UpperInfusionRateField = value;
      // this.RaisePropertyChanged("UpperInfusionRate");
    }
  }
}

export class AdministeredTimeDoseDetail extends CLZOObject {
  private presItemDosageOIDField = 0;
  private doseField = '';
  private doseUOMField: UOM = new UOM();
  private scheduledTimeInMinsField = 0;

  get PresItemDosageOID(): number {
    return this.presItemDosageOIDField;
  }
  set PresItemDosageOID(value: number) {
    if (this.presItemDosageOIDField != value) {
      this.presItemDosageOIDField = value;
      // this.RaisePropertyChanged("PresItemDosageOID");
    }
  }

  get Dose(): string {
    return this.doseField;
  }
  set Dose(value: string) {
    if (this.referenceEquals(this.doseField, value)) {
      this.doseField = value;
      // this.RaisePropertyChanged("Dose");
    }
  }

  get DoseUOM(): UOM {
    return this.doseUOMField;
  }
  set DoseUOM(value: UOM) {
    if (this.referenceEquals(this.doseUOMField, value)) {
      this.doseUOMField = value;
      // this.RaisePropertyChanged("DoseUOM");
    }
  }

  get ScheduledTimeInMins(): number {
    return this.scheduledTimeInMinsField;
  }
  set ScheduledTimeInMins(value: number) {
    if (this.scheduledTimeInMinsField != value) {
      this.scheduledTimeInMinsField = value;
      // this.RaisePropertyChanged("ScheduledTimeInMins");
    }
  }
}

export class SealingDetails extends CLZOObject {
  private IdentifyingCodeField = '';
  private IdentifyingTypeField = '';

  get IdentifyingCode(): string {
    return this.IdentifyingCodeField;
  }
  set IdentifyingCode(value: string) {
    if (this.referenceEquals(this.IdentifyingCodeField, value)) {
      this.IdentifyingCodeField = value;
      // this.RaisePropertyChanged("IdentifyingCode");
    }
  }

  get IdentifyingType(): string {
    return this.IdentifyingTypeField;
  }
  set IdentifyingType(value: string) {
    if (this.referenceEquals(this.IdentifyingTypeField, value)) {
      this.IdentifyingTypeField = value;
      // this.RaisePropertyChanged("IdentifyingType");
    }
  }
}

export class Route extends CLZOObject {
  private RouteIdField = 0;
  private RouteNameField = '';
  private StatusField = '';
  private MCVersionNumberField = '';
  private bInfusionField = '';
  private IsProhibitedField = false;
  private DataProviderField = '';
  private PageIndexField = 0;
  private IsStrengthReqdField = '';
  private nPageNoField = 0;
  private nPageSizeField = 0;
  private nMAXRowsField = 0;

  get RouteId(): number {
    return this.RouteIdField;
  }
  set RouteId(value: number) {
    if (this.RouteIdField != value) {
      this.RouteIdField = value;
      // this.RaisePropertyChanged("RouteId");
    }
  }

  get RouteName(): string {
    return this.RouteNameField;
  }
  set RouteName(value: string) {
    if (this.referenceEquals(this.RouteNameField, value)) {
      this.RouteNameField = value;
      // this.RaisePropertyChanged("RouteName");
    }
  }

  get Status(): string {
    return this.StatusField;
  }
  set Status(value: string) {
    if (this.referenceEquals(this.StatusField, value)) {
      this.StatusField = value;
      // this.RaisePropertyChanged("Status");
    }
  }

  get MCVersionNumber(): string {
    return this.MCVersionNumberField;
  }
  set MCVersionNumber(value: string) {
    if (this.referenceEquals(this.MCVersionNumberField, value)) {
      this.MCVersionNumberField = value;
      // this.RaisePropertyChanged("MCVersionNumber");
    }
  }

  get bInfusion(): string {
    return this.bInfusionField;
  }
  set bInfusion(value: string) {
    if (this.referenceEquals(this.bInfusionField, value)) {
      this.bInfusionField = value;
      // this.RaisePropertyChanged("bInfusion");
    }
  }

  get IsProhibited(): boolean {
    return this.IsProhibitedField;
  }
  set IsProhibited(value: boolean) {
    if (this.IsProhibitedField != value) {
      this.IsProhibitedField = value;
      // this.RaisePropertyChanged("IsProhibited");
    }
  }

  get DataProvider(): string {
    return this.DataProviderField;
  }
  set DataProvider(value: string) {
    if (this.referenceEquals(this.DataProviderField, value)) {
      this.DataProviderField = value;
      // this.RaisePropertyChanged("DataProvider");
    }
  }

  get PageIndex(): number {
    return this.PageIndexField;
  }
  set PageIndex(value: number) {
    if (this.PageIndexField != value) {
      this.PageIndexField = value;
      // this.RaisePropertyChanged("PageIndex");
    }
  }

  get IsStrengthReqd(): string {
    return this.IsStrengthReqdField;
  }
  set IsStrengthReqd(value: string) {
    if (this.referenceEquals(this.IsStrengthReqdField, value)) {
      this.IsStrengthReqdField = value;
      // this.RaisePropertyChanged("IsStrengthReqd");
    }
  }

  get nPageNo(): number {
    return this.nPageNoField;
  }
  set(value: number) {
    if (this.nPageNoField != value) {
      this.nPageNoField = value;
      // this.RaisePropertyChanged("nPageNo");
    }
  }

  get nPageSize(): number {
    return this.nPageSizeField;
  }
  set nPageSize(value: number) {
    if (this.nPageSizeField != value) {
      this.nPageSizeField = value;
      // this.RaisePropertyChanged("nPageSize");
    }
  }

  get nMAXRows(): number {
    return this.nMAXRowsField;
  }
  set nMAXRows(value: number) {
    if (this.nMAXRowsField != value) {
      this.nMAXRowsField = value;
      // this.RaisePropertyChanged("nMAXRows");
    }
  }
}

export class GPConnectDispenseDetail {
  private quantityField = '';
  private startDateField:Date = new Date();
  private endDateField:Date = new Date();

  get Quantity(): string {
    return this.quantityField;
  }
  set Quantity(value: string) {
    this.quantityField = value;
    // this.RaisePropertyChanged("Quantity");
  }

  get StartDate() {
    return this.startDateField;
  }
  set StartDate(value) {
    this.startDateField = value;
    // this.RaisePropertyChanged("StartDate");
  }

  get EndDate() {
    return this.endDateField;
  }
  set EndDate(value) {
    this.endDateField = value;
    // this.RaisePropertyChanged("EndDate");
  }

  private _DosageInstruction = '';
  get DosageInstruction(): string {
    return this._DosageInstruction;
  }
  set DosageInstruction(value: string) {
    this._DosageInstruction = value;
    // this.RaisePropertyChanged("DosageInstruction");
  }

  private _statusChangeDate:any;
  get StatusChangeDate() {
    return this._statusChangeDate;
  }
  set StatusChangeDate(value) {
    this._statusChangeDate = value;
    // this.RaisePropertyChanged("StatusChangeDate");
  }

  private _statusReason = '';
  get StatusReason() {
    return this._statusReason;
  }
  set StatusReason(value) {
    this._statusReason = value;
    // this.RaisePropertyChanged("StatusReason");
  }
}

export class DrugPrepHistoryData extends CLZOObject {
  private AttributeNameField = '';
  private FromValueField = '';
  private ToValueField = '';
  private ModifiedbyField = '';
  private ModifieddttmField: Date = new Date();
  private ComponentNameField = '';

  get AttributeName(): string {
    return this.AttributeNameField;
  }
  set AttributeName(value: string) {
    if (this.referenceEquals(this.AttributeNameField, value)) {
      this.AttributeNameField = value;
      // this.RaisePropertyChanged("AttributeName");
    }
  }

  get FromValue(): string {
    return this.FromValueField;
  }
  set FromValue(value: string) {
    if (this.referenceEquals(this.FromValueField, value)) {
      this.FromValueField = value;
      // this.RaisePropertyChanged("FromValue");
    }
  }

  get ToValue(): string {
    return this.ToValueField;
  }
  set ToValue(value: string) {
    if (this.referenceEquals(this.ToValueField, value)) {
      this.ToValueField = value;
      // this.RaisePropertyChanged("ToValue");
    }
  }

  get Modifiedby(): string {
    return this.ModifiedbyField;
  }
  set Modifiedby(value: string) {
    if (this.referenceEquals(this.ModifiedbyField, value)) {
      this.ModifiedbyField = value;
      // this.RaisePropertyChanged("Modifiedby");
    }
  }

  get Modifieddttm() {
    return this.ModifieddttmField;
  }
  set Modifieddttm(value) {
    if (this.ModifieddttmField != value) {
      this.ModifieddttmField = value;
      // this.RaisePropertyChanged("Modifieddttm");
    }
  }

  get ComponentName(): string {
    return this.ComponentNameField;
  }
  set ComponentName(value: string) {
    if (this.referenceEquals(this.ComponentNameField, value)) {
      this.ComponentNameField = value;
      // this.RaisePropertyChanged("ComponentName");
    }
  }
}

export class Scheduledetails extends CLZOObject {
  private ItemFrequencyOIDField = 0;
  private ScheduledTimeInMinsField = 0;
  private ScheduledTimeField = '';
  private MappedDrugRoundTimeInMinsField = 0;
  private MappedDrugRoundTimeField = '';
  private ScheduleTimeField = 0;
  private EncounterOIDField = 0;
  private MCVersionField = '';

  get ItemFrequencyOID(): number {
    return this.ItemFrequencyOIDField;
  }
  set ItemFrequencyOID(value: number) {
    if (this.ItemFrequencyOIDField != value) {
      this.ItemFrequencyOIDField = value;
      // this.RaisePropertyChanged("ItemFrequencyOID");
    }
  }

  get ScheduledTimeInMins(): number {
    return this.ScheduledTimeInMinsField;
  }
  set ScheduledTimeInMins(value: number) {
    if (this.ScheduledTimeInMinsField != value) {
      this.ScheduledTimeInMinsField = value;
      // this.RaisePropertyChanged("ScheduledTimeInMins");
    }
  }

  get ScheduledTime(): string {
    return this.ScheduledTimeField;
  }
  set ScheduledTime(value: string) {
    if (this.referenceEquals(this.ScheduledTimeField, value)) {
      this.ScheduledTimeField = value;
      // this.RaisePropertyChanged("ScheduledTime");
    }
  }

  get MappedDrugRoundTimeInMins(): number {
    return this.MappedDrugRoundTimeInMinsField;
  }
  set MappedDrugRoundTimeInMins(value: number) {
    if (this.MappedDrugRoundTimeInMinsField != value) {
      this.MappedDrugRoundTimeInMinsField = value;
      // this.RaisePropertyChanged("MappedDrugRoundTimeInMins");
    }
  }

  get MappedDrugRoundTime(): string {
    return this.MappedDrugRoundTimeField;
  }
  set MappedDrugRoundTime(value: string) {
    if (this.referenceEquals(this.MappedDrugRoundTimeField, value)) {
      this.MappedDrugRoundTimeField = value;
      // this.RaisePropertyChanged("MappedDrugRoundTime");
    }
  }

  get ScheduleTime(): number {
    return this.ScheduleTimeField;
  }
  set ScheduleTime(value: number) {
    if (this.ScheduleTimeField != value) {
      this.ScheduleTimeField = value;
      // this.RaisePropertyChanged("ScheduleTime");
    }
  }

  get EncounterOID(): number {
    return this.EncounterOIDField;
  }
  set EncounterOID(value: number) {
    if (this.EncounterOIDField != value) {
      this.EncounterOIDField = value;
      // this.RaisePropertyChanged("EncounterOID");
    }
  }

  get MCVersion(): string {
    return this.MCVersionField;
  }
  set MCVersion(value: string) {
    if (this.referenceEquals(this.MCVersionField, value)) {
      this.MCVersionField = value;
      // this.RaisePropertyChanged("MCVersion");
    }
  }
}

export class ArrayOfString extends Array<string> {}
export class ArrayOfDateTime extends Array<Date> {}
export class ArrayOfLong extends Array<Number> {}

export class Frequency extends CLZOObject {
  private FrequencyvalueField!: number;
  private FrequencyIdField!: number;
  private FrequencyNameField!: string;
  private ShortNameField!: string;
  private IsPRNField!: string;

  public get Frequencyvalue(): number {
    return this.FrequencyvalueField;
  }
  public set Frequencyvalue(value: number) {
    if (this.FrequencyvalueField != value) {
      this.FrequencyvalueField = value;
      //this.RaisePropertyChanged("Frequencyvalue");
    }
  }

  public get FrequencyId(): number {
    return this.FrequencyIdField;
  }
  public set FrequencyId(value: number) {
    if (this.FrequencyIdField != value) {
      this.FrequencyIdField = value;
      //this.RaisePropertyChanged("FrequencyId");
    }
  }

  public get FrequencyName(): string {
    return this.FrequencyNameField;
  }
  public set FrequencyName(value: string) {
    if (this.FrequencyNameField !== value) {
      this.FrequencyNameField = value;
      //this.RaisePropertyChanged("FrequencyName");
    }
  }

  public get ShortName(): string {
    return this.ShortNameField;
  }
  public set ShortName(value: string) {
    if (this.ShortNameField !== value) {
      this.ShortNameField = value;
      //this.RaisePropertyChanged("ShortName");
    }
  }

  public get IsPRN(): string {
    return this.IsPRNField;
  }
  public set IsPRN(value: string) {
    if (this.IsPRNField !== value) {
      this.IsPRNField = value;
      //this.RaisePropertyChanged("IsPRN");
    }
  }
}

export class IPPFrequency extends Frequency {
  private LowEventField!: number;
  private HighEventField!: number;
  private LowPeriodField!: number;
  private HighPeriodField!: number;
  private TypeField!: string;
  private UOMField!: string;
  private IsSundayField!: boolean;
  private IsMondayField!: boolean;
  private IsTuesdayField!: boolean;
  private IsWednesdayField!: boolean;
  private IsThursdayField!: boolean;
  private IsFridayField!: boolean;
  private IsSaturdayField!: boolean;
  private NoOfEventsPerDayField!: number;

  public get LowEvent(): number {
    return this.LowEventField;
  }
  public set LowEvent(value: number) {
    if (this.LowEventField != value) {
      this.LowEventField = value;
      //this.RaisePropertyChanged("LowEvent");
    }
  }

  public get HighEvent(): number {
    return this.HighEventField;
  }
  public set HighEvent(value: number) {
    if (this.HighEventField != value) {
      this.HighEventField = value;
      //this.RaisePropertyChanged("HighEvent");
    }
  }

  public get LowPeriod(): number {
    return this.LowPeriodField;
  }
  public set LowPeriod(value: number) {
    if (this.LowPeriodField != value) {
      this.LowPeriodField = value;
      //this.RaisePropertyChanged("LowPeriod");
    }
  }

  public get HighPeriod(): number {
    return this.HighPeriodField;
  }
  public set HighPeriod(value: number) {
    if (this.HighPeriodField != value) {
      this.HighPeriodField = value;
      //this.RaisePropertyChanged("HighPeriod");
    }
  }

  public get Type(): string {
    return this.TypeField;
  }
  public set Type(value: string) {
    if (this.TypeField !== value) {
      this.TypeField = value;
      //this.RaisePropertyChanged("Type");
    }
  }

  public get UOM(): string {
    return this.UOMField;
  }
  public set UOM(value: string) {
    if (this.UOMField !== value) {
      this.UOMField = value;
      //this.RaisePropertyChanged("UOM");
    }
  }

  public get IsSunday(): boolean {
    return this.IsSundayField;
  }
  public set IsSunday(value: boolean) {
    if (this.IsFridayField != value) {
      this.IsFridayField = value;
      //this.RaisePropertyChanged("IsSunday");
    }
  }

  public get IsMonday(): boolean {
    return this.IsMondayField;
  }
  public set IsMonday(value: boolean) {
    if (this.IsMondayField != value) {
      this.IsMondayField = value;
      //this.RaisePropertyChanged("IsMonday");
    }
  }

  public get IsTuesday(): boolean {
    return this.IsTuesdayField;
  }
  public set IsTuesday(value: boolean) {
    if (this.IsTuesdayField != value) {
      this.IsTuesdayField = value;
      //this.RaisePropertyChanged("IsTuesday");
    }
  }

  public get IsWednesday(): boolean {
    return this.IsWednesdayField;
  }
  public set IsWednesday(value: boolean) {
    if (this.IsWednesdayField != value) {
      this.IsWednesdayField = value;
      //this.RaisePropertyChanged("IsWednesday");
    }
  }

  public get IsThursday(): boolean {
    return this.IsThursdayField;
  }
  public set IsThursday(value: boolean) {
    if (this.IsThursdayField != value) {
      this.IsThursdayField = value;
      //this.RaisePropertyChanged("IsThursday");
    }
  }

  public get IsFriday(): boolean {
    return this.IsFridayField;
  }
  public set IsFriday(value: boolean) {
    if (this.IsFridayField != value) {
      this.IsFridayField = value;
      //this.RaisePropertyChanged("IsFriday");
    }
  }

  public get IsSaturday(): boolean {
    return this.IsSaturdayField;
  }
  public set IsSaturday(value: boolean) {
    if (this.IsSaturdayField != value) {
      this.IsSaturdayField = value;
      //this.RaisePropertyChanged("IsSaturday");
    }
  }

  public get NoOfEventsPerDay(): number {
    return this.NoOfEventsPerDayField;
  }
  public set NoOfEventsPerDay(value: number) {
    if (this.NoOfEventsPerDayField != value) {
      this.NoOfEventsPerDayField = value;
      //this.RaisePropertyChanged("NoOfEventsPerDay");
    }
  }
}

export class IPPScheduledetails extends Scheduledetails {
  private ScheduleDateField!: Date;
  private DoseField!: number;
  private DosewithUOMField!: string;
  private EventField!: number;
  private DayField!: number;

  public get ScheduleDate(): Date {
    return this.ScheduleDateField;
  }
  public set ScheduleDate(value: Date) {
    if (this.ScheduleDateField != value) {
      this.ScheduleDateField = value;
      //this.RaisePropertyChanged("ScheduleDate");
    }
  }

  public get Dose(): number {
    return this.DoseField;
  }
  public set Dose(value: number) {
    if (this.DoseField != value) {
      this.DoseField = value;
      //this.RaisePropertyChanged("Dose");
    }
  }

  public get DosewithUOM(): string {
    return this.DosewithUOMField;
  }
  public set DosewithUOM(value: string) {
    if (this.DosewithUOMField !== value) {
      this.DosewithUOMField = value;
      //this.RaisePropertyChanged("DosewithUOM");
    }
  }

  public get Event(): number {
    return this.EventField;
  }
  public set Event(value: number) {
    if (this.EventField != value) {
      this.EventField = value;
      //this.RaisePropertyChanged("Event");
    }
  }

  public get Day(): number {
    return this.DayField;
  }
  public set Day(value: number) {
    if (this.DayField != value) {
      this.DayField = value;
      //this.RaisePropertyChanged("Day");
    }
  }
}

export class CResMsgGetAdministrationTimes {
  private oFrequencyField = new IPPFrequency();
  private oFixedTimesField = new Array<IPPScheduledetails>();
  private oDrugRoundTimesField = new Array<IPPScheduledetails>();
  private oContextInformationField = new CContextInformation();

  public get oFrequency(): IPPFrequency {
    return this.oFrequencyField;
  }
  public set oFrequency(value: IPPFrequency) {
    if (Object.is(this.oFrequencyField, value) != true) {
      this.oFrequencyField = value;
    }
  }

  public get oFixedTimes(): Array<IPPScheduledetails> {
    return this.oFixedTimesField;
  }
  public set oFixedTimes(value: Array<IPPScheduledetails>) {
    if (Object.is(this.oFixedTimesField, value) != true) {
      this.oFixedTimesField = value;
    }
  }

  public get oDrugRoundTimes(): Array<IPPScheduledetails> {
    return this.oDrugRoundTimesField;
  }
  public set oDrugRoundTimes(value: Array<IPPScheduledetails>) {
    if (Object.is(this.oDrugRoundTimesField, value) != true) {
      this.oDrugRoundTimesField = value;
    }
  }

  public get oContextInformation(): CContextInformation {
    return this.oContextInformationField;
  }
  public set oContextInformation(value: CContextInformation) {
    if (Object.is(this.oContextInformationField, value) != true) {
      this.oContextInformationField = value;
    }
  }

}


export class IPPPresItemBasicPropertiesView extends PresItemBasicPropertiesView {
  private StrengthField = '';
  private PRNInstructionField: Array<ObjectInfo> = new Array<ObjectInfo>();
  private ScheduleTimeField = '';
  private ParentPrescriptionItemOIDField = 0;
  private ParentPrescriptionTypeField = '';
  private ReorderFlagField = '';
  private ParentPrescriptionitemstatusField = '';
  private parentEncounteroidField = 0;
  private parentreordertypeField = '';

  get Strength(): string {
    return this.StrengthField;
  }
  set Strength(value: string) {
    if (this.referenceEquals(this.StrengthField, value)) {
      this.StrengthField = value;
      // this.RaisePropertyChanged("Strength");
    }
  }

  get PRNInstruction(): Array<ObjectInfo> {
    return this.PRNInstructionField;
  }
  set PRNInstruction(value: Array<ObjectInfo>) {
    if (this.referenceEquals(this.PRNInstructionField, value)) {
      this.PRNInstructionField = value;
      // this.RaisePropertyChanged("PRNInstruction");
    }
  }

  get ScheduleTime(): string {
    return this.ScheduleTimeField;
  }
  set ScheduleTime(value: string) {
    if (this.referenceEquals(this.ScheduleTimeField, value)) {
      this.ScheduleTimeField = value;
      // this.RaisePropertyChanged("ScheduleTime");
    }
  }

  get ParentPrescriptionItemOID(): number {
    return this.ParentPrescriptionItemOIDField;
  }
  set ParentPrescriptionItemOID(value: number) {
    if (this.ParentPrescriptionItemOIDField != value) {
      this.ParentPrescriptionItemOIDField = value;
      // this.RaisePropertyChanged("ParentPrescriptionItemOID");
    }
  }

  get ParentPrescriptionType(): string {
    return this.ParentPrescriptionTypeField;
  }
  set ParentPrescriptionType(value: string) {
    if (this.referenceEquals(this.ParentPrescriptionTypeField, value)) {
      this.ParentPrescriptionTypeField = value;
      // this.RaisePropertyChanged("ParentPrescriptionType");
    }
  }
  get ReorderFlag(): string {
    return this.ReorderFlagField;
  }
  set ReorderFlag(value: string) {
    if (this.referenceEquals(this.ReorderFlagField, value)) {
      this.ReorderFlagField = value;
      // this.RaisePropertyChanged("ReorderFlag");
    }
  }

  get ParentPrescriptionitemstatus(): string {
    return this.ParentPrescriptionitemstatusField;
  }
  set ParentPrescriptionitemstatus(value: string) {
    if (this.referenceEquals(this.ParentPrescriptionitemstatusField, value)) {
      this.ParentPrescriptionitemstatusField = value;
      // this.RaisePropertyChanged("ParentPrescriptionitemstatus");
    }
  }

  get ParentEncounteroid(): number {
    return this.parentEncounteroidField;
  }
  set ParentEncounteroid(value: number) {
    if (this.parentEncounteroidField != value) {
      this.parentEncounteroidField = value;
      // this.RaisePropertyChanged("ParentEncounteroid");
    }
  }

  get ParentReordertype(): string {
    return this.parentreordertypeField;
  }
  set ParentReordertype(value: string) {
    if (this.referenceEquals(this.parentreordertypeField, value)) {
      this.parentreordertypeField = value;
      // this.RaisePropertyChanged("ParentReordertype");
    }
  }
}
export class IPPFrequencyDetails extends FrequencyDetails {
  private DaysOfWeekField: string[] = [];

  get DaysOfWeek(): string[] {
    return this.DaysOfWeekField;
  }
  set DaysOfWeek(value: string[]) {
    if (this.referenceEquals(this.DaysOfWeekField, value)) {
      this.DaysOfWeekField = value;
      // this.RaisePropertyChanged("DaysOfWeek");
    }
  }
}
export class IPPPrescriptionItem extends PrescriptionItem {
  private StrengthTextField = '';
  private InstructionField: ObjectInfo = new ObjectInfo();
  private PrescriptionItemStatusCodeField = '';
  private DrugFrequencyUOMCodeField = '';
  private IsWardStockField = false;
  private IsSupplyRequestedField = '';
  private RequestedDTTMField: Date = new Date();
  private RequestedByField = '';
  private RequestedCommentsField = '';
  private RequestUrgencyField = '';
  private RequisitionCACodeField = '';
  private InstructionCountField = 1;
  private FrequencyDetailsField: IPPFrequencyDetails =
    new IPPFrequencyDetails();

  get StrengthText(): string {
    return this.StrengthTextField;
  }
  set StrengthText(value: string) {
    if (this.referenceEquals(this.StrengthTextField, value)) {
      this.StrengthTextField = value;
      // this.RaisePropertyChanged("StrengthText");
    }
  }
  get Instruction(): ObjectInfo {
    return this.InstructionField;
  }
  set Instruction(value: ObjectInfo) {
    if (this.referenceEquals(this.InstructionField, value)) {
      this.InstructionField = value;
      // this.RaisePropertyChanged("Instruction");
    }
  }

  get PrescriptionItemStatusCode(): string {
    return this.PrescriptionItemStatusCodeField;
  }
  set PrescriptionItemStatusCode(value: string) {
    if (this.referenceEquals(this.PrescriptionItemStatusCodeField, value)) {
      this.PrescriptionItemStatusCodeField = value;
      // this.RaisePropertyChanged("PrescriptionItemStatusCode");
    }
  }

  get DrugFrequencyUOMCode(): string {
    return this.DrugFrequencyUOMCodeField;
  }
  set DrugFrequencyUOMCode(value: string) {
    if (this.referenceEquals(this.DrugFrequencyUOMCodeField, value)) {
      this.DrugFrequencyUOMCodeField = value;
      // this.RaisePropertyChanged("DrugFrequencyUOMCode");
    }
  }

  get IsWardStock(): boolean {
    return this.IsWardStockField;
  }
  set IsWardStock(value: boolean) {
    if (this.IsWardStockField != value) {
      this.IsWardStockField = value;
      // this.RaisePropertyChanged("IsWardStock");
    }
  }

  get IsSupplyRequested(): string {
    return this.IsSupplyRequestedField;
  }
  set IsSupplyRequested(value: string) {
    if (this.IsSupplyRequestedField != value) {
      this.IsSupplyRequestedField = value;
      // this.RaisePropertyChanged("IsSupplyRequested");
    }
  }
  get RequestedDTTM(): Date {
    return this.RequestedDTTMField;
  }
  set RequestedDTTM(value: Date) {
    if (this.RequestedDTTMField != value) {
      this.RequestedDTTMField = value;
      // this.RaisePropertyChanged("RequestedDTTM");
    }
  }

  get RequestedBy(): string {
    return this.RequestedByField;
  }
  set RequestedBy(value: string) {
    if (this.referenceEquals(this.RequestedByField, value)) {
      this.RequestedByField = value;
      // this.RaisePropertyChanged("RequestedBy");
    }
  }

  get RequestedComments(): string {
    return this.RequestedCommentsField;
  }
  set RequestedComments(value: string) {
    if (this.referenceEquals(this.RequestedCommentsField, value)) {
      this.RequestedCommentsField = value;
      // this.RaisePropertyChanged("RequestedComments");
    }
  }

  get RequestUrgency(): string {
    return this.RequestUrgencyField;
  }
  set RequestUrgency(value: string) {
    if (this.referenceEquals(this.RequestUrgencyField, value)) {
      this.RequestUrgencyField = value;
      // this.RaisePropertyChanged("RequestUrgency");
    }
  }

  get RequisitionCACode(): string {
    return this.RequisitionCACodeField;
  }
  set RequisitionCACode(value: string) {
    if (this.referenceEquals(this.RequisitionCACodeField, value)) {
      this.RequisitionCACodeField = value;
      // this.RaisePropertyChanged("RequisitionCACode");
    }
  }

  get InstructionCount(): number {
    return this.InstructionCountField;
  }
  set InstructionCount(value: number) {
    if (this.InstructionCountField != value) {
      this.InstructionCountField = value;
      // this.RaisePropertyChanged("InstructionCount");
    }
  }

  get FrequencyDetails(): IPPFrequencyDetails {
    return this.FrequencyDetailsField;
  }
  set FrequencyDetails(value: IPPFrequencyDetails) {
    if (this.referenceEquals(this.FrequencyDetailsField, value)) {
      this.FrequencyDetailsField = value;
      // this.RaisePropertyChanged("FrequencyDetails");
    }
  }
}


export class MedicationListCriteria extends CLZOObject {

  private PatientOIDField: number = 0;
  private EncounterOIDField: number = 0;
  private PrescriptionTypeField: string = '';
  private ProfileCancelledDrugFlagField: string = '';
  private ProfileDiscontinuedDrugFlagField: string = '';
  private ProfileHoldDurationField: number = 0;
  private McVersionField: string = '';
  private IsDoPanelField: number = 0;
  private FilterCriteriaField: string = '';
  private ConflictCheckField: string = '';
  private DUCodeField: string = '';
  private ServiceOIDField: number = 0;
  private LocationOIDField: number = 0;
  private sMenuCodeField: string = '';
  private CAPresTypeField: string = '';
  private IdentifyingtypeField: string = '';
  private IdentifyingoidField: number = 0;
  private AlreadyPrescribedItemField: string = '';
  private currentEncounterOIDField: number = 0;
  //TFSID-39667
  private IsResolutionGirdField: number = 0;

  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true)]
  public get PatientOID(): number {
    return this.PatientOIDField;
  }
  public set PatientOID(value: number) {
    if (this.PatientOIDField !== value) {
      this.PatientOIDField = value;
      // this.RaisePropertyChanged("PatientOID");
    }
  }


  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 1)]
  public get EncounterOID(): number {
    return this.EncounterOIDField;
  }
  public set EncounterOID(value: number) {
    if (this.EncounterOIDField !== value) {
      this.EncounterOIDField = value;
      // this.RaisePropertyChanged("EncounterOID");
    }
  }

  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 2)]
  public get PrescriptionType(): string {
    return this.PrescriptionTypeField;
  }
  public set PrescriptionType(value: string) {
    if (this.PrescriptionTypeField !== value) {
      this.PrescriptionTypeField = value;
      // this.RaisePropertyChanged("PrescriptionType");
    }
  }


  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 3)]
  public get ProfileCancelledDrugFlag(): string {
    return this.ProfileCancelledDrugFlagField;
  }
  public set ProfileCancelledDrugFlag(value: string) {
    if (this.ProfileCancelledDrugFlagField !== value) {
      this.ProfileCancelledDrugFlagField = value;
      // this.RaisePropertyChanged("ProfileCancelledDrugFlag");
    }
  }


  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 4)]
  public get ProfileDiscontinuedDrugFlag(): string {
    return this.ProfileDiscontinuedDrugFlagField;
  }
  public set ProfileDiscontinuedDrugFlag(value: string) {
    if (this.ProfileDiscontinuedDrugFlagField !== value) {
      this.ProfileDiscontinuedDrugFlagField = value;
      // this.RaisePropertyChanged("ProfileDiscontinuedDrugFlag");
    }
  }


  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 5)]
  public get ProfileHoldDuration(): number {
    return this.ProfileHoldDurationField;
  }
  public set ProfileHoldDuration(value: number) {
    if (this.ProfileHoldDurationField !== value) {
      this.ProfileHoldDurationField = value;
      // this.RaisePropertyChanged("ProfileHoldDuration");
    }
  }


  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 6)]
  public get McVersion(): string {
    return this.McVersionField;
  }
  public set McVersion(value: string) {
    if (this.McVersionField !== value) {
      this.McVersionField = value;
      // this.RaisePropertyChanged("McVersion");
    }
  }


  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 7)]
  public get IsDoPanel(): number {
    return this.IsDoPanelField;
  }
  public set IsDoPanel(value: number) {
    if (this.IsDoPanelField !== value) {
      this.IsDoPanelField = value;
      // this.RaisePropertyChanged("IsDoPanel");
    }
  }


  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 8)]
  public get FilterCriteria(): string {
    return this.FilterCriteriaField;
  }
  public set FilterCriteria(value: string) {
    if (this.FilterCriteriaField !== value) {
      this.FilterCriteriaField = value;
      // this.RaisePropertyChanged("FilterCriteria");
    }
  }


  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 9)]
  public get ConflictCheck(): string {
    return this.ConflictCheckField;
  }
  public set ConflictCheck(value: string) {
    if (this.ConflictCheckField !== value) {
      this.ConflictCheckField = value;
      // this.RaisePropertyChanged("ConflictCheck");
    }
  }

  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 10)]
  public get DUCode(): string {
    return this.DUCodeField;
  }
  public set DUCode(value: string) {
    if (this.DUCodeField !== value) {
      this.DUCodeField = value;
      // this.RaisePropertyChanged("DUCode");
    }
  }


  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 11)]
  public get ServiceOID(): number {
    return this.ServiceOIDField;
  }
  public set ServiceOID(value: number) {
    if (this.ServiceOIDField !== value) {
      this.ServiceOIDField = value;
      // this.RaisePropertyChanged("ServiceOID");
    }
  }


  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 12)]
  public get LocationOID(): number {
    return this.LocationOIDField;
  }
  public set LocationOID(value: number) {
    if (this.LocationOIDField !== value) {
      this.LocationOIDField = value;
      // this.RaisePropertyChanged("LocationOID");
    }
  }


  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 13)]
  public get sMenuCode(): string {
    return this.sMenuCodeField;
  }
  public set sMenuCode(value: string) {
    if (this.sMenuCodeField !== value) {
      this.sMenuCodeField = value;
      // this.RaisePropertyChanged("sMenuCode");
    }
  }


  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 14)]
  public get CAPresType(): string {
    return this.CAPresTypeField;
  }
  public set CAPresType(value: string) {
    if (this.CAPresTypeField !== value) {
      this.CAPresTypeField = value;
      // this.RaisePropertyChanged("CAPresType");
    }
  }


  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 15)]
  public get Identifyingtype(): string {
    return this.IdentifyingtypeField;
  }
  public set Identifyingtype(value: string) {
    if (this.IdentifyingtypeField !== value) {
      this.IdentifyingtypeField = value;
      // this.RaisePropertyChanged("Identifyingtype");
    }
  }


  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 16)]
  public get Identifyingoid(): number {
    return this.IdentifyingoidField;
  }
  public set Identifyingoid(value: number) {
    if (this.IdentifyingoidField !== value) {
      this.IdentifyingoidField = value;
      // this.RaisePropertyChanged("Identifyingoid");
    }
  }


  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 17)]
  public get AlreadyPrescribedItem(): string {
    return this.AlreadyPrescribedItemField;
  }
  public set AlreadyPrescribedItem(value: string) {
    if (this.AlreadyPrescribedItemField !== value) {
      this.AlreadyPrescribedItemField = value;
      // this.RaisePropertyChanged("AlreadyPrescribedItem");
    }
  }


  //  [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=18)]
  public get currentEncounterOID(): number {
    return this.currentEncounterOIDField;
  }
  public set currentEncounterOID(value: number) {
    if (this.currentEncounterOIDField !== value) {
      this.currentEncounterOIDField = value;
      // this.RaisePropertyChanged("currentEncounterOID");
    }
  }


  //TFSID-39667
  //  [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 19)]
  public get IsResolutionGird(): number {
    return this.IsResolutionGirdField;
  }
  public set IsResolutionGird(value: number) {
    if (this.IsResolutionGirdField !== value) {
      this.IsResolutionGirdField = value;
      // this.RaisePropertyChanged("IsResolutionGird");
    }
  }


  //#117045
  private IsDefaultRouteFormField: boolean = false;
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 20)]
  public get IsDefaultRouteForm(): boolean {
    return this.IsDefaultRouteFormField;
  }
  public set IsDefaultRouteForm(value: boolean) {
    this.IsDefaultRouteFormField = value;
    // this.RaisePropertyChanged("IsDefaultRouteForm");
  }

  private AlreadyReorderdOIDField: string = '';
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 21)]
  public get AlreadyReorderdOID(): string {
    return this.AlreadyReorderdOIDField;
  }
  public set AlreadyReorderdOID(value: string) {
    this.AlreadyReorderdOIDField = value;
    // this.RaisePropertyChanged("AlreadyReorderdOID");
  }


}

export class MedDispensingDetail extends CLZOObject {
    
    private presItemDispenseRequestOIDField=0;
    
    private prescriptionItemOIDField=0;
    
    private prescriptionMulticomponentOIDField=0;
    
    private fluidPrescribableItemListOIDField=0;
    
    private prescriptionItemTechOIDField=0;
    
    private presItemDispenseStatusOIDField=0;
    
    private dispenseStatusField='';
    
    private responseDTTMField=new Date();
    
    private responseDTTMTextField='';
    
    private drugNameField='';
    
    private requestedLocationNameField='';
    
    private userForenameField='';
    
    private userSurnameField='';
    
    private reasonField='';
    
    private lastDispensingTextField='';
    
    private presRequisitionHistoryOIDField=0;
    
    // BNS WSC
    private PrescribeStartDTTMField=new Date();
    
    private LorenzoIDField='';
    
    
    public get PresItemDispenseRequestOID(): number {
        return this.presItemDispenseRequestOIDField;
    }
    
    public set PresItemDispenseRequestOID(value: number)  {
        this.presItemDispenseRequestOIDField = value;
        // this.RaisePropertyChanged("PresItemDispenseRequestOID");
    }
    
    
    public get PrescriptionItemOID(): number {
        return this.prescriptionItemOIDField;
    }
    
    public set PrescriptionItemOID(value: number)  {
        this.prescriptionItemOIDField = value;
        // this.RaisePropertyChanged("PrescriptionItemOID");
    }
    
    
    public get PrescriptionMulticomponentOID(): number {
        return this.prescriptionMulticomponentOIDField;
    }
    
    public set PrescriptionMulticomponentOID(value: number)  {
        this.prescriptionMulticomponentOIDField = value;
        // this.RaisePropertyChanged("PrescriptionMulticomponentOID");
    }
    
    
    public get FluidPrescribableItemListOID(): number {
        return this.fluidPrescribableItemListOIDField;
    }
    
    public set FluidPrescribableItemListOID(value: number)  {
        this.fluidPrescribableItemListOIDField = value;
        // this.RaisePropertyChanged("FluidPrescribableItemListOID");
    }
    
    
    public get PrescriptionItemTechOID(): number {
        return this.prescriptionItemTechOIDField;
    }
    
    public set PrescriptionItemTechOID(value: number)  {
        this.prescriptionItemTechOIDField = value;
        // this.RaisePropertyChanged("PrescriptionItemTechOID");
    }
    
    
    public get PresItemDispenseStatusOID(): number {
        return this.presItemDispenseStatusOIDField;
    }
    
    public set PresItemDispenseStatusOID(value: number)  {
        this.presItemDispenseStatusOIDField = value;
        // this.RaisePropertyChanged("PresItemDispenseStatusOID");
    }
    
    
    public get DispenseStatus(): string {
        return this.dispenseStatusField;
    }
    
    public set DispenseStatus(value: string)  {
        this.dispenseStatusField = value;
        // this.RaisePropertyChanged("DispenseStatus");
    }
    
    
    public get ResponseDTTM(): Date {
        return this.responseDTTMField;
    }
    
    public set ResponseDTTM(value: Date)  {
        this.responseDTTMField = value;
        // this.RaisePropertyChanged("ResponseDTTM");
    }
    
    
    public get ResponseDTTMText(): string {
        return this.responseDTTMTextField;
    }
    
    public set ResponseDTTMText(value: string)  {
        this.responseDTTMTextField = value;
        // this.RaisePropertyChanged("ResponseDTTMText");
    }
    
    
    public get DrugName(): string {
        return this.drugNameField;
    }
    
    public set DrugName(value: string)  {
        this.drugNameField = value;
        // this.RaisePropertyChanged("DrugName");
    }
    
    
    public get RequestedLocationName(): string {
        return this.requestedLocationNameField;
    }
    
    public set RequestedLocationName(value: string)  {
        this.requestedLocationNameField = value;
        // this.RaisePropertyChanged("RequestedLocationName");
    }
    
    
    public get UserForename(): string {
        return this.userForenameField;
    }
    
    public set UserForename(value: string)  {
        this.userForenameField = value;
        // this.RaisePropertyChanged("UserForename");
    }
    
    
    public get UserSurname(): string {
        return this.userSurnameField;
    }
    
    public set UserSurname(value: string)  {
        this.userSurnameField = value;
        // this.RaisePropertyChanged("UserSurname");
    }
    
    
    public get Reason(): string {
        return this.reasonField;
    }
    
    public set Reason(value: string)  {
        this.reasonField = value;
        // this.RaisePropertyChanged("Reason");
    }
    
    
    public get LastDispensingText(): string {
        return this.lastDispensingTextField;
    }
    
    public set LastDispensingText(value: string)  {
        this.lastDispensingTextField = value;
        // this.RaisePropertyChanged("LastDispensingText");
    }
    
    
    public get PresRequisitionHistoryOID(): number {
        return this.presRequisitionHistoryOIDField;
    }
    
    public set PresRequisitionHistoryOID(value: number)  {
        this.presRequisitionHistoryOIDField = value;
        // this.RaisePropertyChanged("PresRequisitionHistoryOID");
    }
    
    // BNS WSC
    
    public get PrescribeStartDTTM(): Date {
        return this.PrescribeStartDTTMField;
    }
    
    public set PrescribeStartDTTM(value: Date)  {
        this.PrescribeStartDTTMField = value;
        // this.RaisePropertyChanged("PrescribeStartDTTM");
    }
    
    
    public get LorenzoID(): string {
        return this.LorenzoIDField;
    }
    
    public set LorenzoID(value: string)  {
        this.LorenzoIDField = value;
        // this.RaisePropertyChanged("LorenzoID");
    }
}

export class IPPDoseRegime extends DoseRegime
{

    private  oConditionalDoseRegimeField:Array<ConditionalDoseRegime>=[];
    private  oTitratedDoseRegimeField:Array<TitratedDoseRegime>=[];

  private InfusionRateField = '';

    private InfusionRateNumUOMField:UOM= new UOM();

    private InfusionRateDenUOMField:UOM= new UOM();

  private ValueRangeField = '';

  private FreqUOMCodeField = '';

  private LowerValueRangeField = '';

  private UpperValueRangeField = '';

  private IsDaywiseField = '';

  private ParentAdditionalItemValueField = '';

  private PrescriptionTypeField = '';

  private FrequencyTypeField = '';

    private FrequencyField:IPPFrequency= new IPPFrequency();

    private FixedTimesField:IPPScheduledetails= new IPPScheduledetails();

    private DrugroundTimesField:IPPScheduledetails= new IPPScheduledetails();

  private RateField = '';

  private RateUOMOIDField: UOM = new UOM();

  private RateDenaminatorUOMOIDField: UOM = new UOM();

  private UpperRateField = '';

  private SVScheduleTimeAndDoseValuesField = '';

  private PreviousServiceDRTValuesField = '';

  get oConditionalDoseRegime(): ConditionalDoseRegime[] {
    return this.oConditionalDoseRegimeField;
  }
  set oConditionalDoseRegime(value: ConditionalDoseRegime[]) {
    if (this.referenceEquals(this.oConditionalDoseRegimeField, value)) {
      this.oConditionalDoseRegimeField = value;
      // this.RaisePropertyChanged("oConditionalDoseRegime");
    }
  }

  get oTitratedDoseRegime(): TitratedDoseRegime[] {
    return this.oTitratedDoseRegimeField;
  }
  set oTitratedDoseRegime(value: TitratedDoseRegime[]) {
    if (this.referenceEquals(this.oTitratedDoseRegimeField, value)) {
      this.oTitratedDoseRegimeField = value;
      // this.RaisePropertyChanged("oTitratedDoseRegime");
    }
  }

  get InfusionRate(): string {
    return this.InfusionRateField;
  }
  set InfusionRate(value: string) {
    if (this.referenceEquals(this.InfusionRateField, value)) {
      this.InfusionRateField = value;
      // this.RaisePropertyChanged("InfusionRate");
    }
  }

  get InfusionRateNumUOM(): UOM {
    return this.InfusionRateNumUOMField;
  }
  set InfusionRateNumUOM(value: UOM) {
    if (this.referenceEquals(this.InfusionRateNumUOMField, value)) {
      this.InfusionRateNumUOMField = value;
      // this.RaisePropertyChanged("InfusionRateNumUOM");
    }
  }

  get InfusionRateDenUOM(): UOM {
    return this.InfusionRateDenUOMField;
  }
  set InfusionRateDenUOM(value: UOM) {
    if (this.referenceEquals(this.InfusionRateDenUOMField, value)) {
      this.InfusionRateDenUOMField = value;
      // this.RaisePropertyChanged("InfusionRateDenUOM");
    }
  }

  get ValueRange(): string {
    return this.ValueRangeField;
  }
  set ValueRange(value: string) {
    if (this.referenceEquals(this.ValueRangeField, value)) {
      this.ValueRangeField = value;
      // this.RaisePropertyChanged("ValueRange");
    }
  }

  get FreqUOMCode(): string {
    return this.FreqUOMCodeField;
  }
  set FreqUOMCode(value: string) {
    if (this.referenceEquals(this.FreqUOMCodeField, value)) {
      this.FreqUOMCodeField = value;
      // this.RaisePropertyChanged("FreqUOMCode");
    }
  }

  get LowerValueRange(): string {
    return this.LowerValueRangeField;
  }
  set LowerValueRange(value: string) {
    if (this.referenceEquals(this.LowerValueRangeField, value)) {
      this.LowerValueRangeField = value;
      // this.RaisePropertyChanged("LowerValueRange");
    }
  }

  get UpperValueRange(): string {
    return this.UpperValueRangeField;
  }
  set UpperValueRange(value: string) {
    if (this.referenceEquals(this.UpperValueRangeField, value)) {
      this.UpperValueRangeField = value;
      // this.RaisePropertyChanged("UpperValueRange");
    }
  }

  // get PrescribableItemDoseOID():number
  // {
  //     return this.PrescribableItemDoseOIDField;
  // }
  // set PrescribableItemDoseOID(value:number)
  // {
  //     if ((this.PrescribableItemDoseOIDField!=(value)))
  //     {
  //         this.PrescribableItemDoseOIDField = value;
  //         // this.RaisePropertyChanged("PrescribableItemDoseOID");
  //     }
  // }

  get IsDaywise(): string {
    return this.IsDaywiseField;
  }
  set IsDaywise(value: string) {
    if (this.IsDaywiseField != value) {
      this.IsDaywiseField = value;
      // this.RaisePropertyChanged("IsDaywise");
    }
  }

  get ParentAdditionalItemValue(): string {
    return this.ParentAdditionalItemValueField;
  }
  set ParentAdditionalItemValue(value: string) {
    if (this.referenceEquals(this.ParentAdditionalItemValueField, value)) {
      this.ParentAdditionalItemValueField = value;
      // this.RaisePropertyChanged("ParentAdditionalItemValue");
    }
  }

  get PrescriptionType(): string {
    return this.PrescriptionTypeField;
  }
  set PrescriptionType(value: string) {
    if (this.referenceEquals(this.PrescriptionTypeField, value)) {
      this.PrescriptionTypeField = value;
      // this.RaisePropertyChanged("PrescriptionType");
    }
  }

  get FrequencyType(): string {
    return this.FrequencyTypeField;
  }
  set FrequencyType(value: string) {
    if (this.referenceEquals(this.FrequencyTypeField, value)) {
      this.FrequencyTypeField = value;
      // this.RaisePropertyChanged("FrequencyType");
    }
  }

  get Frequency(): IPPFrequency {
    return this.FrequencyField;
  }
  set Frequency(value: IPPFrequency) {
    if (this.referenceEquals(this.FrequencyField, value)) {
      this.FrequencyField = value;
      // this.RaisePropertyChanged("Frequency");
    }
  }

  get FixedTimes(): IPPScheduledetails {
    return this.FixedTimesField;
  }
  set FixedTimes(value: IPPScheduledetails) {
    if (this.referenceEquals(this.FixedTimesField, value)) {
      this.FixedTimesField = value;
      // this.RaisePropertyChanged("FixedTimes");
    }
  }

  get DrugroundTimes(): IPPScheduledetails {
    return this.DrugroundTimesField;
  }
  set DrugroundTimes(value: IPPScheduledetails) {
    if (this.referenceEquals(this.DrugroundTimesField, value)) {
      this.DrugroundTimesField = value;
      // this.RaisePropertyChanged("DrugroundTimes");
    }
  }

  get Rate(): string {
    return this.RateField;
  }
  set Rate(value: string) {
    if (this.referenceEquals(this.RateField, value)) {
      this.RateField = value;
      // this.RaisePropertyChanged("Rate");
    }
  }

  get RateUOMOID(): UOM {
    return this.RateUOMOIDField;
  }
  set RateUOMOID(value: UOM) {
    if (this.referenceEquals(this.RateUOMOIDField, value)) {
      this.RateUOMOIDField = value;
      // this.RaisePropertyChanged("RateUOMOID");
    }
  }

  get RateDenaminatorUOMOID(): UOM {
    return this.RateDenaminatorUOMOIDField;
  }
  set RateDenaminatorUOMOID(value: UOM) {
    if (this.referenceEquals(this.RateDenaminatorUOMOIDField, value)) {
      this.RateDenaminatorUOMOIDField = value;
      // this.RaisePropertyChanged("RateDenaminatorUOMOID");
    }
  }

  get UpperRate(): string {
    return this.UpperRateField;
  }
  set UpperRate(value: string) {
    if (this.referenceEquals(this.UpperRateField, value)) {
      this.UpperRateField = value;
      // this.RaisePropertyChanged("UpperRate");
    }
  }

  get SVScheduleTimeAndDoseValues(): string {
    return this.SVScheduleTimeAndDoseValuesField;
  }
  set SVScheduleTimeAndDoseValues(value: string) {
    if (this.referenceEquals(this.SVScheduleTimeAndDoseValuesField, value)) {
      this.SVScheduleTimeAndDoseValuesField = value;
      // this.RaisePropertyChanged("SVScheduleTimeAndDoseValues");
    }
  }

  get PreviousServiceDRTValues(): string {
    return this.PreviousServiceDRTValuesField;
  }
  set PreviousServiceDRTValues(value: string) {
    if (this.referenceEquals(this.PreviousServiceDRTValuesField, value)) {
      this.PreviousServiceDRTValuesField = value;
      // this.RaisePropertyChanged("PreviousServiceDRTValues");
    }
  }
}


export class DrugAdminStatus extends CLZOObject {
    
  private OIDField=0;
  
  private IsAdministeredField=false;
  
  private InProgScheduleDateField=new Date();
  
  public get OID(): number {
    return this.OIDField;
  }
  public set OID(value: number) {
    if (this.OIDField !== value) {
      this.OIDField = value;
      // this.RaisePropertyChanged("OID");
    }
  }

  public get IsAdministered(): boolean {
    return this.IsAdministeredField;
  }
  public set IsAdministered(value: boolean) {
    if (this.IsAdministeredField !== value) {
      this.IsAdministeredField = value;
      // this.RaisePropertyChanged("IsAdministered");
    }
  }
  
  public get InProgScheduleDate(): Date {
    return this.InProgScheduleDateField;
  }
  public set InProgScheduleDate(value: Date) {
    if (this.InProgScheduleDateField !== value) {
      this.InProgScheduleDateField = value;
      // this.RaisePropertyChanged("InProgScheduleDate");
    }
  }

}

export class PresItemIPPRequestDetails extends CLZOObject {

  private StatusField = '';
  private ResponseDTTMField = new Date();
  private NameField = '';
  private ReasonField = '';
  private LocationnameField = '';
  private DispensedDrugNameField = '';
  private ServicenameField = '';

  public get Status(): string {
    return this.StatusField;
  }
  public set Status(value: string) {
    if (Object.is(this.StatusField, value) != true) {
      this.StatusField = value;
    }
  }

  public get ResponseDTTM(): Date {
    return this.ResponseDTTMField;
  }
  public set ResponseDTTM(value: Date) {
    this.ResponseDTTMField = value;
  }

  public get Name(): string {
    return this.NameField;
  }
  public set Name(value: string) {
    if (Object.is(this.NameField, value) != true) {
      this.NameField = value;
    }
  }

  public get Reason(): string {
    return this.ReasonField;
  }
  public set Reason(value: string) {
    if (Object.is(this.ReasonField, value) != true) {
      this.ReasonField = value;
    }
  }

  public get Locationname(): string {
    return this.LocationnameField;
  }
  public set Locationname(value: string) {
    if (Object.is(this.LocationnameField, value) != true) {
      this.LocationnameField = value;
    }
  }

  public get DispensedDrugName(): string {
    return this.DispensedDrugNameField;
  }
  public set DispensedDrugName(value: string) {
    if (Object.is(this.DispensedDrugNameField, value) != true) {
      this.DispensedDrugNameField = value;
    }
  }

  public get Servicename(): string {
    return this.ServicenameField;
  }
  public set Servicename(value: string) {
    if (Object.is(this.ServicenameField, value) != true) {
      this.ServicenameField = value;
    }
  }
}


export class CReqMsgGetPatientMedicationList {
  oMedicationListCriteriaBC: MedicationListCriteria;
  oContextInformation: CContextInformation = new CContextInformation();
}

export interface CResMsgGetPatientMedicationList {
  oPrescriptionItemView: Array<PrescriptionItemView>;
  oViewData: MedicationViewData;
  oContextInformation: CContextInformation;
}

export class CContextInformation {
  UserID: string = '';
  PatientID: string = '';
  OrganizationID: string = '';
  SecurityToken: string = '';
  WorkingAreaOID: string = '';
  ReleaseVersion: string = '';
  CultureCode: string = '';
  MultiCampusPattern: string = '';
}

export interface MedicationViewData extends CLZOObject {
  isMedClrk: string;
  adhocMCIdentifyingoid: number;
  adhocMCILorenzoid: string;
  adhocMCIdentifyingname: string;
  reviewPeriodAlertItems: string;
  completedStatus: string;
  maxGrpSeqNo: number;
  clinicalEncouterOIDCollection: string;
  teamOIDs: string;
  teamNames: string;
}


export class IPPMAManagePrescriptionWSSoapClient {
  flowId: string = "GetPatientMedicationList"
  GetPatientMedicationListAsync(oMedicationListCriteria: CReqMsgGetPatientMedicationList, delegateArgs: { instance: object, delegate: string }) {
    HelperService.invoke<CResMsgGetPatientMedicationList>(this.flowId, oMedicationListCriteria, delegateArgs);
  }
}

// export type object =  Object
export class HelperService {
  public static invoke<T>(id: any, method: CReqMsgGetPatientMedicationList, delegateArgs: any) {
    let aggregateService: AggregateService = InjectorInstance.get<AggregateService>(AggregateService);
    aggregateService.postAggregateData(id, method).subscribe(res => {
      console.table(res);
      let response = JSON.parse(res) as T;
      delegateArgs.instance[delegateArgs.delegate](response);
    });
  }
}