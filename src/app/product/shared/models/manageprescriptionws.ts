

export class CLZOObject {
  private OperationModeField = '';
  private LastModifiedAtField: Date = new Date();
  private SealTypeField = '';
  private SealImageField = '';
  private SealRecordListField = '';
  private SealImageListField = '';
  private EPRFilterListField = '';
  referenceEquals(arg1: any, arg2: any) {
    return JSON.stringify(arg1) != JSON.stringify(arg2);
  }
  get OperationMode(): string {
    return this.OperationModeField;
  }
  set OperationMode(value: string) {
    if (this.referenceEquals(this.OperationModeField, value)) {
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

  get SealType(): string {
    return this.SealTypeField;
  }
  set SealType(value: string) {
    if (this.referenceEquals(this.SealTypeField, value)) {
      this.SealTypeField = value;
      // this.RaisePropertyChanged("SealType");
    }
  }

  get SealImage(): string {
    return this.SealImageField;
  }
  set SealImage(value: string) {
    if (this.referenceEquals(this.SealImageField, value)) {
      this.SealImageField = value;
      // this.RaisePropertyChanged("SealImage");
    }
  }

  get SealRecordList(): string {
    return this.SealRecordListField;
  }
  set SealRecordList(value: string) {
    if (this.referenceEquals(this.SealRecordListField, value)) {
      this.SealRecordListField = value;
      // this.RaisePropertyChanged("SealRecordList");
    }
  }

  get SealImageList(): string {
    return this.SealImageListField;
  }
  set SealImageList(value: string) {
    if (this.referenceEquals(this.SealImageListField, value)) {
      this.SealImageListField = value;
      // this.RaisePropertyChanged("SealImageList");
    }
  }

  get EPRFilterList(): string {
    return this.EPRFilterListField;
  }
  set EPRFilterList(value: string) {
    if (this.referenceEquals(this.EPRFilterListField, value)) {
      this.EPRFilterListField = value;
      // this.RaisePropertyChanged("EPRFilterList");
    }
  }
}
export class ArrayOfLong { }

export class PresItemAdditionalProperties extends CLZOObject {
  private NoOfInstallmentsField = 0;
  private IntervalBtwnInstallmentField: MeasurableObject =
    new MeasurableObject();
  private MedClerkModifyReasonField: ObjectInfo = new ObjectInfo();
  private InstalmentInstructionsField: ObjectInfo = new ObjectInfo();
  private EndorsementPropertiesField: ObjectInfo = new ObjectInfo();
  private StationeryTypeField: ObjectInfo = new ObjectInfo();
  private AdditionalCommentsField = '';
  private BatchNumberField = '';
  private ExpiryDateField: Date = new Date();
  private NonFormularyReasonField = '';
  private NonCatalogueReasonField = '';
  private StatusModifedDTTMField: Date = new Date();
  private AdminMethodField: ObjectInfo = new ObjectInfo();
  private MedClerkSourceField: ObjectInfo = new ObjectInfo();
  private DrugAttributesField = '';
  private PharmacyNotingCommentsField = '';
  private HoldReasonField = '';
  private ReasonOfStoppingField = '';
  private DateCommencedField = '';
  private NonCatalogueOtherReasonField = '';
  private ReconcileCommentsField = '';

  get NoOfInstallments(): number {
    return this.NoOfInstallmentsField;
  }
  set NoOfInstallments(value: number) {
    if (this.NoOfInstallmentsField != value) {
      this.NoOfInstallmentsField = value;
      // this.RaisePropertyChanged("NoOfInstallments");
    }
  }

  get IntervalBtwnInstallment(): MeasurableObject {
    return this.IntervalBtwnInstallmentField;
  }
  set IntervalBtwnInstallment(value: MeasurableObject) {
    if (this.referenceEquals(this.IntervalBtwnInstallmentField, value)) {
      this.IntervalBtwnInstallmentField = value;
      // this.RaisePropertyChanged("IntervalBtwnInstallment");
    }
  }

  get MedClerkModifyReason(): ObjectInfo {
    return this.MedClerkModifyReasonField;
  }
  set MedClerkModifyReason(value: ObjectInfo) {
    if (this.referenceEquals(this.MedClerkModifyReasonField, value)) {
      this.MedClerkModifyReasonField = value;
      // this.RaisePropertyChanged("MedClerkModifyReason");
    }
  }

  get InstalmentInstructions(): ObjectInfo {
    return this.InstalmentInstructionsField;
  }
  set InstalmentInstructions(value: ObjectInfo) {
    if (this.referenceEquals(this.InstalmentInstructionsField, value)) {
      this.InstalmentInstructionsField = value;
      // this.RaisePropertyChanged("InstalmentInstructions");
    }
  }

  get EndorsementProperties(): ObjectInfo {
    return this.EndorsementPropertiesField;
  }
  set EndorsementProperties(value: ObjectInfo) {
    if (this.referenceEquals(this.EndorsementPropertiesField, value)) {
      this.EndorsementPropertiesField = value;
      // this.RaisePropertyChanged("EndorsementProperties");
    }
  }

  get StationeryType(): ObjectInfo {
    return this.StationeryTypeField;
  }
  set StationeryType(value: ObjectInfo) {
    if (this.referenceEquals(this.StationeryTypeField, value)) {
      this.StationeryTypeField = value;
      // this.RaisePropertyChanged("StationeryType");
    }
  }

  get AdditionalComments(): string {
    return this.AdditionalCommentsField;
  }
  set AdditionalComments(value: string) {
    if (this.referenceEquals(this.AdditionalCommentsField, value)) {
      this.AdditionalCommentsField = value;
      // this.RaisePropertyChanged("AdditionalComments");
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

  get NonFormularyReason(): string {
    return this.NonFormularyReasonField;
  }
  set NonFormularyReason(value: string) {
    if (this.referenceEquals(this.NonFormularyReasonField, value)) {
      this.NonFormularyReasonField = value;
      // this.RaisePropertyChanged("NonFormularyReason");
    }
  }

  get NonCatalogueReason(): string {
    return this.NonCatalogueReasonField;
  }
  set NonCatalogueReason(value: string) {
    if (this.referenceEquals(this.NonCatalogueReasonField, value)) {
      this.NonCatalogueReasonField = value;
      // this.RaisePropertyChanged("NonCatalogueReason");
    }
  }

  get StatusModifedDTTM(): Date {
    return this.StatusModifedDTTMField;
  }
  set StatusModifedDTTM(value: Date) {
    if (this.StatusModifedDTTMField != value) {
      this.StatusModifedDTTMField = value;
      // this.RaisePropertyChanged("StatusModifedDTTM");
    }
  }

  get AdminMethod(): ObjectInfo {
    return this.AdminMethodField;
  }
  set AdminMethod(value: ObjectInfo) {
    if (this.referenceEquals(this.AdminMethodField, value)) {
      this.AdminMethodField = value;
      // this.RaisePropertyChanged("AdminMethod");
    }
  }

  get MedClerkSource(): ObjectInfo {
    return this.MedClerkSourceField;
  }
  set MedClerkSource(value: ObjectInfo) {
    if (this.referenceEquals(this.MedClerkSourceField, value)) {
      this.MedClerkSourceField = value;
      // this.RaisePropertyChanged("MedClerkSource");
    }
  }

  get DrugAttributes(): string {
    return this.DrugAttributesField;
  }
  set DrugAttributes(value: string) {
    if (this.referenceEquals(this.DrugAttributesField, value)) {
      this.DrugAttributesField = value;
      // this.RaisePropertyChanged("DrugAttributes");
    }
  }

  get PharmacyNotingComments(): string {
    return this.PharmacyNotingCommentsField;
  }
  set PharmacyNotingComments(value: string) {
    if (this.referenceEquals(this.PharmacyNotingCommentsField, value)) {
      this.PharmacyNotingCommentsField = value;
      // this.RaisePropertyChanged("PharmacyNotingComments");
    }
  }

  get HoldReason(): string {
    return this.HoldReasonField;
  }
  set HoldReason(value: string) {
    if (this.referenceEquals(this.HoldReasonField, value)) {
      this.HoldReasonField = value;
      // this.RaisePropertyChanged("HoldReason");
    }
  }

  get ReasonOfStopping(): string {
    return this.ReasonOfStoppingField;
  }
  set ReasonOfStopping(value: string) {
    if (this.referenceEquals(this.ReasonOfStoppingField, value)) {
      this.ReasonOfStoppingField = value;
      // this.RaisePropertyChanged("ReasonOfStopping");
    }
  }

  get DateCommenced(): string {
    return this.DateCommencedField;
  }
  set DateCommenced(value: string) {
    if (this.referenceEquals(this.DateCommencedField, value)) {
      this.DateCommencedField = value;
      // this.RaisePropertyChanged("DateCommenced");
    }
  }

  get NonCatalogueOtherReason(): string {
    return this.NonCatalogueOtherReasonField;
  }
  set NonCatalogueOtherReason(value: string) {
    if (this.referenceEquals(this.NonCatalogueOtherReasonField, value)) {
      this.NonCatalogueOtherReasonField = value;
      // this.RaisePropertyChanged("NonCatalogueOtherReason");
    }
  }

  get ReconcileComments(): string {
    return this.ReconcileCommentsField;
  }
  set ReconcileComments(value: string) {
    if (this.referenceEquals(this.ReconcileCommentsField, value) != true) {
      this.ReconcileCommentsField = value;
      // this.RaisePropertyChanged("ReconcileComments");
    }
  }
}
export class PresItemDrugProperties extends CLZOObject {
  private CanDoseBeChangedField = '';
  private MandatoryCodeField = '';
  private ContraIndicationOIDField = 0;
  private HasProhibitedRouteField = '';
  private StrengthField: MeasurableObject = new MeasurableObject();

  get CanDoseBeChanged(): string {
    return this.CanDoseBeChangedField;
  }
  set CanDoseBeChanged(value: string) {
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

  get ContraIndicationOID(): number {
    return this.ContraIndicationOIDField;
  }
  set ContraIndicationOID(value: number) {
    if (this.ContraIndicationOIDField != value) {
      this.ContraIndicationOIDField = value;
      // this.RaisePropertyChanged("ContraIndicationOID");
    }
  }

  get HasProhibitedRoute(): string {
    return this.HasProhibitedRouteField;
  }
  set HasProhibitedRoute(value: string) {
    if (this.HasProhibitedRouteField != value) {
      this.HasProhibitedRouteField = value;
      // this.RaisePropertyChanged("HasProhibitedRoute");
    }
  }

  get Strength(): MeasurableObject {
    return this.StrengthField;
  }
  set Strength(value: MeasurableObject) {
    if (this.referenceEquals(this.StrengthField, value)) {
      this.StrengthField = value;
      // this.RaisePropertyChanged("Strength");
    }
  }
}
export class PrescriptionItemFormViewParameters extends CLZOObject {
  private LineIndicatorField = '';
  private AdminDeviceField = '';
  private AdministeredByCodeField = '';
  private IntravenousInfusionDataField: IntravenousInfusionDetails =
    new IntravenousInfusionDetails();
  private AdminDeviceDataField: AdminDeviceDetails = new AdminDeviceDetails();

  get LineIndicator(): string {
    return this.LineIndicatorField;
  }
  set LineIndicator(value: string) {
    if (this.LineIndicatorField != value) {
      this.LineIndicatorField = value;
      // this.RaisePropertyChanged("LineIndicator");
    }
  }

  get AdminDevice(): string {
    return this.AdminDeviceField;
  }
  set AdminDevice(value: string) {
    if (this.referenceEquals(this.AdminDeviceField, value)) {
      this.AdminDeviceField = value;
      // this.RaisePropertyChanged("AdminDevice");
    }
  }

  get AdministeredByCode(): string {
    return this.AdministeredByCodeField;
  }
  set AdministeredByCode(value: string) {
    if (this.referenceEquals(this.AdministeredByCodeField, value)) {
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

  get AdminDeviceData(): AdminDeviceDetails {
    return this.AdminDeviceDataField;
  }
  set AdminDeviceData(value: AdminDeviceDetails) {
    if (this.referenceEquals(this.AdminDeviceDataField, value)) {
      this.AdminDeviceDataField = value;
      // this.RaisePropertyChanged("AdminDeviceData");
    }
  }
}
export class DrugMultiComponent extends CLZOObject {
  private DrugMultiComponentOIDField = 0;
  private ParentIdentifyingOIDField = 0;
  private IdentifyingTypeField = '';
  private IsEditableField = 0;
  private PrescribableItemNameField = '';
  private PrescribableItemOIDField = 0;
  private QuantityField = 0;
  private UnitOfMeasureField: UOM = new UOM();
  private IsPrimaryField = '';
  private QuantityUOMField: UOM = new UOM();

  get DrugMultiComponentOID(): number {
    return this.DrugMultiComponentOIDField;
  }
  set DrugMultiComponentOID(value: number) {
    if (this.DrugMultiComponentOIDField != value) {
      this.DrugMultiComponentOIDField = value;
      // this.RaisePropertyChanged("DrugMultiComponentOID");
    }
  }

  get ParentIdentifyingOID(): number {
    return this.ParentIdentifyingOIDField;
  }
  set ParentIdentifyingOID(value: number) {
    if (this.ParentIdentifyingOIDField != value) {
      this.ParentIdentifyingOIDField = value;
      // this.RaisePropertyChanged("ParentIdentifyingOID");
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

  get IsEditable(): number {
    return this.IsEditableField;
  }
  set IsEditable(value: number) {
    if (this.IsEditableField != value) {
      this.IsEditableField = value;
      // this.RaisePropertyChanged("IsEditable");
    }
  }
  get PrescribableItemName(): string {
    return this.PrescribableItemNameField;
  }
  set PrescribableItemName(value: string) {
    if (this.referenceEquals(this.PrescribableItemNameField, value)) {
      this.PrescribableItemNameField = value;
      // this.RaisePropertyChanged("PrescribableItemName");
    }
  }

  get PrescribableItemOID(): number {
    return this.PrescribableItemOIDField;
  }
  set PrescribableItemOID(value: number) {
    if (this.PrescribableItemOIDField != value) {
      this.PrescribableItemOIDField = value;
      // this.RaisePropertyChanged("PrescribableItemOID");
    }
  }

  get Quantity(): number {
    return this.QuantityField;
  }
  set Quantity(value: number) {
    if (this.QuantityField != value) {
      this.QuantityField = value;
      // this.RaisePropertyChanged("Quantity");
    }
  }

  get UnitOfMeasure(): UOM {
    return this.UnitOfMeasureField;
  }
  set UnitOfMeasure(value: UOM) {
    if (this.referenceEquals(this.UnitOfMeasureField, value)) {
      this.UnitOfMeasureField = value;
      // this.RaisePropertyChanged("UnitOfMeasure");
    }
  }

  get IsPrimary(): string {
    return this.IsPrimaryField;
  }
  set IsPrimary(value: string) {
    if (this.IsPrimaryField != value) {
      this.IsPrimaryField = value;
      // this.RaisePropertyChanged("IsPrimary");
    }
  }

  get QuantityUOM(): UOM {
    return this.QuantityUOMField;
  }
  set QuantityUOM(value: UOM) {
    if (this.referenceEquals(this.QuantityUOMField, value)) {
      this.QuantityUOMField = value;
      // this.RaisePropertyChanged("QuantityUOM");
    }
  }
}
export class LegalCategory extends CLZOObject {
  private LCIdField = 0;
  private LegalCategoryNameField = '';

  get LCId(): number {
    return this.LCIdField;
  }
  set LCId(value: number) {
    if (this.LCIdField != value) {
      this.LCIdField = value;
      // this.RaisePropertyChanged("LCId");
    }
  }

  get LegalCategoryName(): string {
    return this.LegalCategoryNameField;
  }
  set LegalCategoryName(value: string) {
    if (this.referenceEquals(this.LegalCategoryNameField, value)) {
      this.LegalCategoryNameField = value;
      // this.RaisePropertyChanged("LegalCategoryName");
    }
  }
}
export class PrescriptionItemAdminDetails extends CLZOObject {
  private OIDField = 0;
  private BatchNumberField = '';
  private ExpiryDateField: Date = new Date();
  private WitnessedByField: ObjectInfo = new ObjectInfo();
  private AdministredDateField: Date = new Date();
  private CommentsField = '';
  private DoseAdministeredField = '';
  private DoseAdministeredUOMField: UOM = new UOM();
  private AdministeredByField: ObjectInfo = new ObjectInfo();
  private AdminInstructionField = '';
  private RouteOIDField = 0;
  private IsPCAField = '';
  private SiteField: ObjectInfo = new ObjectInfo();

  get OID(): number {
    return this.OIDField;
  }
  set OID(value: number) {
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

  get RouteOID(): number {
    return this.RouteOIDField;
  }
  set RouteOID(value: number) {
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

  get PatientHeight(): string {
    return this.PatientHeightField;
  }
  set PatientHeight(value: string) {
    if (this.referenceEquals(this.PatientHeightField, value)) {
      this.PatientHeightField = value;
      // this.RaisePropertyChanged("PatientHeight");
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

  get BSAFormula(): string {
    return this.BSAFormulaField;
  }
  set BSAFormula(value: string) {
    if (this.referenceEquals(this.BSAFormulaField, value)) {
      this.BSAFormulaField = value;
      // this.RaisePropertyChanged("BSAFormula");
    }
  }

  get BSAValue(): string {
    return this.BSAValueField;
  }
  set BSAValue(value: string) {
    if (this.referenceEquals(this.BSAValueField, value)) {
      this.BSAValueField = value;
      // this.RaisePropertyChanged("BSAValue");
    }
  }

  get UpdatePatientRecord(): string {
    return this.UpdatePatientRecordField;
  }
  set UpdatePatientRecord(value: string) {
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
    if (this.referenceEquals(this.RequestDoseField, value)) {
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
    if (this.referenceEquals(this.RequestDoseUOMNameField, value)) {
      this.RequestDoseUOMNameField = value;
      // this.RaisePropertyChanged("RequestDoseUOMName");
    }
  }

  get RequestDosePer(): string {
    return this.RequestDosePerField;
  }
  set RequestDosePer(value: string) {
    if (this.referenceEquals(this.RequestDosePerField, value)) {
      this.RequestDosePerField = value;
      // this.RaisePropertyChanged("RequestDosePer");
    }
  }
  get CalculatedDose(): string {
    return this.CalculatedDoseField;
  }
  set CalculatedDose(value: string) {
    if (this.referenceEquals(this.CalculatedDoseField, value)) {
      this.CalculatedDoseField = value;
      // this.RaisePropertyChanged("CalculatedDose");
    }
  }

  get OrderedPerDose(): string {
    return this.OrderedPerDoseField;
  }
  set OrderedPerDose(value: string) {
    if (this.referenceEquals(this.OrderedPerDoseField, value)) {
      this.OrderedPerDoseField = value;
      // this.RaisePropertyChanged("OrderedPerDose");
    }
  }
  get RoundedTo(): string {
    return this.RoundedToField;
  }
  set RoundedTo(value: string) {
    if (this.referenceEquals(this.RoundedToField, value)) {
      this.RoundedToField = value;
      // this.RaisePropertyChanged("RoundedTo");
    }
  }

  get OrderedPerDay(): string {
    return this.OrderedPerDayField;
  }
  set OrderedPerDay(value: string) {
    if (this.referenceEquals(this.OrderedPerDayField, value)) {
      this.OrderedPerDayField = value;
      // this.RaisePropertyChanged("OrderedPerDay");
    }
  }

  get OverrideReason(): string {
    return this.OverrideReasonField;
  }
  set OverrideReason(value: string) {
    if (this.referenceEquals(this.OverrideReasonField, value)) {
      this.OverrideReasonField = value;
      // this.RaisePropertyChanged("OverrideReason");
    }
  }

  get ISAlwaysuseDosecalc(): string {
    return this.ISAlwaysuseDosecalcField;
  }
  set ISAlwaysuseDosecalc(value: string) {
    if (this.referenceEquals(this.ISAlwaysuseDosecalcField, value)) {
      this.ISAlwaysuseDosecalcField = value;
      // this.RaisePropertyChanged("ISAlwaysuseDosecalc");
    }
  }
}

export class TechnicalValidationInfo extends CLZOObject {
  private PrescriptionOIDField = 0;
  private PrescriptionItemOIDField = 0;
  private ValidatedDTTMField: Date = new Date();
  private ValidatedByField: ObjectInfo = new ObjectInfo();
  private TechValidatedItemsField: TechValidatedItem = new TechValidatedItem();
  private ValidatorRoleNameField = '';
  private IsTechnicalvalidateField = '';
  private TechnicalvalidateupdateField = false;
  private EncounterOIDField = 0;
  private IsMergePatientField = '';

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

  get ValidatedDTTM(): Date {
    return this.ValidatedDTTMField;
  }
  set ValidatedDTTM(value: Date) {
    if (this.ValidatedDTTMField != value) {
      this.ValidatedDTTMField = value;
      // this.RaisePropertyChanged("ValidatedDTTM");
    }
  }

  get ValidatedBy(): ObjectInfo {
    return this.ValidatedByField;
  }
  set ValidatedBy(value: ObjectInfo) {
    if (this.referenceEquals(this.ValidatedByField, value)) {
      this.ValidatedByField = value;
      // this.RaisePropertyChanged("ValidatedBy");
    }
  }

  get TechValidatedItems(): TechValidatedItem {
    return this.TechValidatedItemsField;
  }
  set TechValidatedItems(value: TechValidatedItem) {
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
}
export class PrescriptionItemAction extends CLZOObject {
  private IsActionPerformedField = '';
  private PerformedDTTMField: Date = new Date();
  private PerformedByField: ObjectInfo = new ObjectInfo();
  private ReasonForModificationField = '';
  private CommentsField = '';
  private ActionCodeField = '';
  private VerifyOnBehalfField: OnBehalfInfo = new OnBehalfInfo();
  private ModifiedItemOIDField = 0;
  private HoldReasonField = '';
  private OnlyUpdatedColumnField = '';
  private UpdateItemStatusField = '';
  private CancelDefaultAllergenField = '';
  private DirectDiscontinueReasonField = '';
  private ModificationCommentsField = '';
  private AmendOfItemNoField = '';
  private ReconcileCommentsField = '';

  get IsActionPerformed(): string {
    return this.IsActionPerformedField;
  }
  set IsActionPerformed(value: string) {
    if (this.IsActionPerformedField != value) {
      this.IsActionPerformedField = value;
      // this.RaisePropertyChanged("IsActionPerformed");
    }
  }

  get PerformedDTTM(): Date {
    return this.PerformedDTTMField;
  }
  set PerformedDTTM(value: Date) {
    if (this.PerformedDTTMField != value) {
      this.PerformedDTTMField = value;
      // this.RaisePropertyChanged("PerformedDTTM");
    }
  }

  get PerformedBy(): ObjectInfo {
    return this.PerformedByField;
  }
  set PerformedBy(value: ObjectInfo) {
    if (this.referenceEquals(this.PerformedByField, value)) {
      this.PerformedByField = value;
      // this.RaisePropertyChanged("PerformedBy");
    }
  }

  get ReasonForModification(): string {
    return this.ReasonForModificationField;
  }
  set ReasonForModification(value: string) {
    if (this.referenceEquals(this.ReasonForModificationField, value)) {
      this.ReasonForModificationField = value;
      // this.RaisePropertyChanged("ReasonForModification");
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

  get ActionCode(): string {
    return this.ActionCodeField;
  }
  set ActionCode(value: string) {
    if (this.referenceEquals(this.ActionCodeField, value)) {
      this.ActionCodeField = value;
      // this.RaisePropertyChanged("ActionCode");
    }
  }

  get VerifyOnBehalf(): OnBehalfInfo {
    return this.VerifyOnBehalfField;
  }
  set VerifyOnBehalf(value: OnBehalfInfo) {
    if (this.referenceEquals(this.VerifyOnBehalfField, value)) {
      this.VerifyOnBehalfField = value;
      // this.RaisePropertyChanged("VerifyOnBehalf");
    }
  }

  get ModifiedItemOID(): number {
    return this.ModifiedItemOIDField;
  }
  set ModifiedItemOID(value: number) {
    if (this.ModifiedItemOIDField != value) {
      this.ModifiedItemOIDField = value;
      // this.RaisePropertyChanged("ModifiedItemOID");
    }
  }

  get HoldReason(): string {
    return this.HoldReasonField;
  }
  set HoldReason(value: string) {
    if (this.referenceEquals(this.HoldReasonField, value)) {
      this.HoldReasonField = value;
      // this.RaisePropertyChanged("HoldReason");
    }
  }

  get OnlyUpdatedColumn(): string {
    return this.OnlyUpdatedColumnField;
  }
  set OnlyUpdatedColumn(value: string) {
    if (this.referenceEquals(this.OnlyUpdatedColumnField, value)) {
      this.OnlyUpdatedColumnField = value;
      // this.RaisePropertyChanged("OnlyUpdatedColumn");
    }
  }

  get UpdateItemStatus(): string {
    return this.UpdateItemStatusField;
  }
  set UpdateItemStatus(value: string) {
    if (this.referenceEquals(this.UpdateItemStatusField, value)) {
      this.UpdateItemStatusField = value;
      // this.RaisePropertyChanged("UpdateItemStatus");
    }
  }

  get CancelDefaultAllergen(): string {
    return this.CancelDefaultAllergenField;
  }
  set CancelDefaultAllergen(value: string) {
    if (this.referenceEquals(this.CancelDefaultAllergenField, value)) {
      this.CancelDefaultAllergenField = value;
      // this.RaisePropertyChanged("CancelDefaultAllergen");
    }
  }

  get DirectDiscontinueReason(): string {
    return this.DirectDiscontinueReasonField;
  }
  set DirectDiscontinueReason(value: string) {
    if (this.referenceEquals(this.DirectDiscontinueReasonField, value)) {
      this.DirectDiscontinueReasonField = value;
      // this.RaisePropertyChanged("DirectDiscontinueReason");
    }
  }

  get ModificationComments(): string {
    return this.ModificationCommentsField;
  }
  set ModificationComments(value: string) {
    if (this.referenceEquals(this.ModificationCommentsField, value)) {
      this.ModificationCommentsField = value;
      // this.RaisePropertyChanged("ModificationComments");
    }
  }
  get AmendOfItemNo(): string {
    return this.AmendOfItemNoField;
  }
  set AmendOfItemNo(value: string) {
    if (this.referenceEquals(this.AmendOfItemNoField, value)) {
      this.AmendOfItemNoField = value;
      // this.RaisePropertyChanged("AmendOfItemNo");
    }
  }

  get ReconcileComments(): string {
    return this.ReconcileCommentsField;
  }
  set ReconcileComments(value: string) {
    if (this.referenceEquals(this.ReconcileCommentsField, value)) {
      this.ReconcileCommentsField = value;
      // this.RaisePropertyChanged("ReconcileComments");
    }
  }
}

export class DoseFormula extends CLZOObject {
  private BSAFormulaField = '';
  private DoseCalcBasedOnField = '';
  private CalculationForField = '';
  private RequestedDoseField = '';
  private RequestedUOMField: UOM = new UOM();
  private RequestDosePerUOMField = '';
  private RoundOffDoseField = '';
  private IsDoseCalcAlwaysUseField = '';
  private RequestedUOMOIDField = 0;
  private RequestedUOMNameField = '';
  private MCVersionField = '';
  private IsCopyFavField = '';

  get BSAFormula(): string {
    return this.BSAFormulaField;
  }
  set BSAFormula(value: string) {
    if (this.referenceEquals(this.BSAFormulaField, value)) {
      this.BSAFormulaField = value;
      // this.RaisePropertyChanged("BSAFormula");
    }
  }

  get DoseCalcBasedOn(): string {
    return this.DoseCalcBasedOnField;
  }
  set DoseCalcBasedOn(value: string) {
    if (this.referenceEquals(this.DoseCalcBasedOnField, value)) {
      this.DoseCalcBasedOnField = value;
      // this.RaisePropertyChanged("DoseCalcBasedOn");
    }
  }

  get CalculationFor(): string {
    return this.CalculationForField;
  }
  set CalculationFor(value: string) {
    if (this.referenceEquals(this.CalculationForField, value)) {
      this.CalculationForField = value;
      // this.RaisePropertyChanged("CalculationFor");
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

  get RequestedUOM(): UOM {
    return this.RequestedUOMField;
  }
  set RequestedUOM(value: UOM) {
    if (this.referenceEquals(this.RequestedUOMField, value)) {
      this.RequestedUOMField = value;
      // this.RaisePropertyChanged("RequestedUOM");
    }
  }

  get RequestDosePerUOM(): string {
    return this.RequestDosePerUOMField;
  }
  set RequestDosePerUOM(value: string) {
    if (this.referenceEquals(this.RequestDosePerUOMField, value)) {
      this.RequestDosePerUOMField = value;
      // this.RaisePropertyChanged("RequestDosePerUOM");
    }
  }

  get RoundOffDose(): string {
    return this.RoundOffDoseField;
  }
  set RoundOffDose(value: string) {
    if (this.referenceEquals(this.RoundOffDoseField, value)) {
      this.RoundOffDoseField = value;
      // this.RaisePropertyChanged("RoundOffDose");
    }
  }

  get IsDoseCalcAlwaysUse(): string {
    return this.IsDoseCalcAlwaysUseField;
  }
  set IsDoseCalcAlwaysUse(value: string) {
    if (this.referenceEquals(this.IsDoseCalcAlwaysUseField, value)) {
      this.IsDoseCalcAlwaysUseField = value;
      // this.RaisePropertyChanged("IsDoseCalcAlwaysUse");
    }
  }

  get RequestedUOMOID(): number {
    return this.RequestedUOMOIDField;
  }
  set RequestedUOMOID(value: number) {
    if (this.RequestedUOMOIDField != value) {
      this.RequestedUOMOIDField = value;
      // this.RaisePropertyChanged("RequestedUOMOID");
    }
  }

  get RequestedUOMName(): string {
    return this.RequestedUOMNameField;
  }
  set RequestedUOMName(value: string) {
    if (this.referenceEquals(this.RequestedUOMNameField, value)) {
      this.RequestedUOMNameField = value;
      // this.RaisePropertyChanged("RequestedUOMName");
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

  get IsCopyFav(): string {
    return this.IsCopyFavField;
  }
  set IsCopyFav(value: string) {
    if (this.referenceEquals(this.IsCopyFavField, value)) {
      this.IsCopyFavField = value;
      // this.RaisePropertyChanged("IsCopyFav");
    }
  }
}



export class DrugProperty {
  private DrugPropertyCodeField: string = '';
  private VMChildCodeField: string = '';
  private DrugNameField: string = '';
  private HighRiskMsgField: string = '';
  private IdentifyingOIDField: number = 0;
  private IdentifyingTypeField: string = '';
  private OccuranceCodeField: string = '';
  private CompPrescribableItemListOIDField: number = 0;
  private DrugPropertyToolTipField: string = '';
  private PrescriptionMCidentifyingtypeField: string = '';
  private PrescriptionitemoidField: number = 0;
  private PrescriptionmulticomponentoidField: number = 0;
  private UniqueMCRowIDField: number = 0;

  public set DrugPropertyCode(value: string) {
    if (!(this.DrugPropertyCodeField === value)) {
      this.DrugPropertyCodeField = value;
      //this.RaisePropertyChanged("DrugPropertyCode");
    }
  }
  public get DrugPropertyCode(): string {
    return this.DrugPropertyCodeField;
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false)]
  public set VMChildCode(value: string) {
    if (!(this.VMChildCodeField === value)) {
      this.VMChildCodeField = value;
      //this.RaisePropertyChanged("VMChildCode");
    }
  }
  public get VMChildCode(): string {
    return this.VMChildCodeField;
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 2)]

  public set DrugName(value: string) {
    if (!(this.DrugNameField === value)) {
      this.DrugNameField = value;
      //this.RaisePropertyChanged("DrugName");
    }
  }
  public get DrugName(): string {
    return this.DrugNameField;
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 3)]
  public set HighRiskMsg(value: string) {
    if (!(this.HighRiskMsgField === value)) {
      this.HighRiskMsgField = value;
      //this.RaisePropertyChanged("HighRiskMsg");
    }
  }
  public get HighRiskMsg(): string {
    return this.HighRiskMsgField;
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 4)]

  public set IdentifyingOID(value: number) {
    if (!(this.IdentifyingOIDField === value)) {
      this.IdentifyingOIDField = value;
      //this.RaisePropertyChanged("IdentifyingOID");
    }
  }
  public get IdentifyingOID(): number {
    return this.IdentifyingOIDField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 5)]

  public set IdentifyingType(value: string) {
    if (!(this.IdentifyingTypeField === value)) {
      this.IdentifyingTypeField = value;
      //this.RaisePropertyChanged("IdentifyingType");
    }
  }
  public get IdentifyingType(): string {
    return this.IdentifyingTypeField;
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 6)]

  public set OccuranceCode(value: string) {
    if (!(this.OccuranceCodeField === value)) {
      this.OccuranceCodeField = value;
      //this.RaisePropertyChanged("OccuranceCode");
    }
  }
  public get OccuranceCode(): string {
    return this.OccuranceCodeField;
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 7)]

  public set CompPrescribableItemListOID(value: number) {
    if (!(this.CompPrescribableItemListOIDField === value)) {
      this.CompPrescribableItemListOIDField = value;
      //  this.RaisePropertyChanged("CompPrescribableItemListOID");
    }
  }
  public get CompPrescribableItemListOID(): number {
    return this.CompPrescribableItemListOIDField;
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 8)]
  public set DrugPropertyToolTip(value: string) {
    if (!(this.DrugPropertyToolTipField === value)) {
      this.DrugPropertyToolTipField = value;
      //this.RaisePropertyChanged("DrugPropertyToolTip");
    }
  }
  public get DrugPropertyToolTip(): string {
    return this.DrugPropertyToolTipField;
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 9)]
  public set PrescriptionMCidentifyingtype(value: string) {
    if (!(this.PrescriptionMCidentifyingtypeField === value)) {
      this.PrescriptionMCidentifyingtypeField = value;
      //this.RaisePropertyChanged("PrescriptionMCidentifyingtype");
    }
  }
  public get PrescriptionMCidentifyingtype(): string {
    return this.PrescriptionMCidentifyingtypeField;
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 10)]

  public set Prescriptionitemoid(value: number) {
    if (!(this.PrescriptionitemoidField === value)) {
      this.PrescriptionitemoidField = value;
      //  this.RaisePropertyChanged("Prescriptionitemoid");
    }
  }
  public get Prescriptionitemoid(): number {
    return this.PrescriptionitemoidField;
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 11)]

  public set Prescriptionmulticomponentoid(value: number) {
    if (!(this.PrescriptionmulticomponentoidField === value)) {
      this.PrescriptionmulticomponentoidField = value;
      //  this.RaisePropertyChanged("Prescriptionmulticomponentoid");
    }
  }
  public get Prescriptionmulticomponentoid(): number {
    return this.PrescriptionmulticomponentoidField;
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 12)]

  public set UniqueMCRowID(value: number) {
    if (!(this.UniqueMCRowIDField === value)) {
      this.UniqueMCRowIDField = value;
      //  this.RaisePropertyChanged("UniqueMCRowID");
    }
  }
  public get UniqueMCRowID(): number {
    return this.UniqueMCRowIDField;
  }
}
export class ObjectInfo extends CLZOObject {
  private OIDField: number = 0;

  private NameField: string = '';

  private CodeField: string = '';

  private RoleProfileOIDField: number = 0;
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true)]
  public set OID(value: number) {
    if (!(this.OIDField === value)) {
      this.OIDField = value;
      //  this.RaisePropertyChanged("OID");
    }
  }
  public get OID(): number {
    return this.OIDField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 1)]

  public set Name(value: string) {
    if (!(this.NameField === value)) {
      this.NameField = value;
      //  this.RaisePropertyChanged("Name");
    }
  }
  public get Name(): string {
    return this.NameField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 2)]

  public set Code(value: string) {
    if (!(this.CodeField === value)) {
      this.CodeField = value;
      //  this.RaisePropertyChanged("Code");
    }
  }
  public get Code(): string {
    return this.CodeField;
  }
  public set RoleProfileOID(value: number) {
    if (!(this.RoleProfileOIDField === value)) {
      this.RoleProfileOIDField = value;
      //  this.RaisePropertyChanged("OID");
    }
  }
  public get RoleProfileOID(): number {
    return this.RoleProfileOIDField;
  }
}
export class PrescribeItemBase extends CLZOObject {
  private PrescribeItemIDField: number = 0;

  private PrescribeItemListIDField: number = 0;

  private PrescribeItemDetailIDField: number = 0;

  private CatalogueIDField: number = 0;

  private CodeField: string = '';

  private LorenzoIDField: string = '';

  private NameField: string = '';

  private DescriptionField: string = '';

  private KeyWordField: string = '';

  private TypeField: string = '';

  private ItemSubTypeField: string = '';

  private LevelField: string = '';

  private ActiveFromField: Date = new Date();

  private ActiveToField: Date = new Date();

  private VirtualParentIDField: number = 0;

  private ActualParentIDField: number = 0;

  private ParentNameField: string = '';

  private IsDisplayInPrimaryListField: string = '';

  private StatusField: string = '';

  private ItemStatusHistoryField: PrescribeItemStatus =
    new PrescribeItemStatus();

  private HasChildField: string = '';

  private ParentItemOIDField: number = 0;

  private HOParentOIDField: number = 0;

  private OIDField: number = 0;

  private BrandNameField: string = '';

  private DeactivateFromField: Date = new Date();

  private ReinstateFromField: Date = new Date();

  private PrescriptionItemIDField: string = '';

  private PrescriptionIDField: string = '';

  private FormularynoteField: string = '';

  private OrganisationOIDField: number = 0;

  private IsFormularyField: string = '';

  private VersionField: string = '';

  private MCVersionField: string = '';

  private SourceDataProviderTypeField: string = '';

  private SourceDataProviderIDField: string = '';

  private DataProvStatusField: string = '';

  private SkipBasicField: boolean = false;

  private HierarchyField: string = '';

  private HasDataFilterField: string = '';
  private EncounterIDField: string = '';
  private ItemQuantityUOMField: string = '';

  private PresItemTypeField: string = '';

  private IsPrescribeByBrandField: string = '';

  private ItemIDField: string = '';

  private ItemClassField: string = '';

  private OrganisationNameField: string = '';

  private IsManufacturerGenericField: string = '';

  private IsParallelImportField: string = '';

  private ITEMLORENZOIDField: string = '';

  private AliasNameField: string = '';

  private DisplayField: string = '';

  private ItemStatusField: string = '';

  private MCOIDField: number = 0;
  private MCPrepStatusCodeField: string = '';
  private MCItemNameField: string = '';
  private MCItmSubtypecodeField: string = '';

  private MCIDeactitemNameField: string = '';
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true)]
  public set PrescribeItemID(value: number) {
    if (!(this.PrescribeItemIDField === value)) {
      this.PrescribeItemIDField = value;
      //  this.RaisePropertyChanged("PrescribeItemID");
    }
  }
  public get PrescribeItemID(): number {
    return this.PrescribeItemIDField;
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true)]

  public set PrescribeItemListID(value: number) {
    if (!(this.PrescribeItemListIDField === value)) {
      this.PrescribeItemListIDField = value;
      //  this.RaisePropertyChanged("PrescribeItemListID");
    }
  }
  public get PrescribeItemListID(): number {
    return this.PrescribeItemListIDField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 2)]

  public set PrescribeItemDetailID(value: number) {
    if (!(this.PrescribeItemDetailIDField === value)) {
      this.PrescribeItemDetailIDField = value;
      //  this.RaisePropertyChanged("PrescribeItemDetailID");
    }
  }
  public get PrescribeItemDetailID(): number {
    return this.PrescribeItemDetailIDField;
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 3)]

  public set CatalogueID(value: number) {
    if (!(this.CatalogueIDField === value)) {
      this.CatalogueIDField = value;
      //  this.RaisePropertyChanged("CatalogueID");
    }
  }
  public get CatalogueID(): number {
    return this.CatalogueIDField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 4)]
  public set Code(value: string) {
    if (!(this.CodeField === value)) {
      this.CodeField = value;
      //  this.RaisePropertyChanged("Code");
    }
  }
  public get Code(): string {
    return this.CodeField;
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 5)]

  public set LorenzoID(value: string) {
    if (!(this.LorenzoIDField === value)) {
      this.LorenzoIDField = value;
      //  this.RaisePropertyChanged("LorenzoID");
    }
  }
  public get LorenzoID(): string {
    return this.LorenzoIDField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 6)]

  public set Name(value: string) {
    if (!(this.NameField === value)) {
      this.NameField = value;
      //  this.RaisePropertyChanged("Name");
    }
  }
  public get Name(): string {
    return this.NameField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 7)]

  public set Description(value: string) {
    if (!(this.DescriptionField === value)) {
      this.DescriptionField = value;
      //  this.RaisePropertyChanged("Description");
    }
  }
  public get Description(): string {
    return this.DescriptionField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 8)]

  public set KeyWord(value: string) {
    if (!(this.KeyWordField === value)) {
      this.KeyWordField = value;
      //  this.RaisePropertyChanged("KeyWord");
    }
  }
  public get KeyWord(): string {
    return this.KeyWordField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 9)]

  public set Type(value: string) {
    if (!(this.TypeField === value)) {
      this.TypeField = value;
      //  this.RaisePropertyChanged("Type");
    }
  }
  public get Type(): string {
    return this.TypeField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 10)]

  public set ItemSubType(value: string) {
    if (!(this.ItemSubTypeField === value)) {
      this.ItemSubTypeField = value;
      //  this.RaisePropertyChanged("ItemSubType");
    }
  }
  public get ItemSubType(): string {
    return this.ItemSubTypeField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 11)]

  public set Level(value: string) {
    if (!(this.LevelField === value)) {
      this.LevelField = value;
      //  this.RaisePropertyChanged("Level");
    }
  }
  public get Level(): string {
    return this.LevelField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 12)]

  public set ActiveFrom(value: Date) {
    if (!(this.ActiveFromField === value)) {
      this.ActiveFromField = value;
      //  this.RaisePropertyChanged("ActiveFrom");
    }
  }
  public get ActiveFrom(): Date {
    return this.ActiveFromField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 13)]

  public set ActiveTo(value: Date) {
    if (!(this.ActiveToField === value)) {
      this.ActiveToField = value;
      //  this.RaisePropertyChanged("ActiveTo");
    }
  }
  public get ActiveTo(): Date {
    return this.ActiveToField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 14)]

  public set VirtualParentID(value: number) {
    if (!(this.VirtualParentIDField === value)) {
      this.VirtualParentIDField = value;
      //  this.RaisePropertyChanged("VirtualParentID");
    }
  }
  public get VirtualParentID(): number {
    return this.VirtualParentIDField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 15)]

  public set ActualParentID(value: number) {
    if (!(this.ActualParentIDField === value)) {
      this.ActualParentIDField = value;
      //  this.RaisePropertyChanged("ActualParentID");
    }
  }
  public get ActualParentID(): number {
    return this.ActualParentIDField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 16)]

  public set ParentName(value: string) {
    if (!(this.ParentNameField === value)) {
      this.ParentNameField = value;
      //  this.RaisePropertyChanged("ParentName");
    }
  }
  public get ParentName(): string {
    return this.ParentNameField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 17)]

  public set IsDisplayInPrimaryList(value: string) {
    if (!(this.IsDisplayInPrimaryListField === value)) {
      this.IsDisplayInPrimaryListField = value;
      //  this.RaisePropertyChanged("IsDisplayInPrimaryList");
    }
  }
  public get IsDisplayInPrimaryList(): string {
    return this.IsDisplayInPrimaryListField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 18)]

  public set Status(value: string) {
    if (!(this.StatusField === value)) {
      this.StatusField = value;
      //  this.RaisePropertyChanged("Status");
    }
  }
  public get Status(): string {
    return this.StatusField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 19)]
  public set ItemStatusHistory(value: PrescribeItemStatus) {
    if (!(this.ItemStatusHistoryField === value)) {
      this.ItemStatusHistoryField = value;
      //  this.RaisePropertyChanged("Status");
    }
  }
  public get ItemStatusHistory(): PrescribeItemStatus {
    return this.ItemStatusHistoryField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 20)]
  public set HasChild(value: string) {
    if (!(this.HasChildField === value)) {
      this.HasChildField = value;
      //  this.RaisePropertyChanged("HasChild");
    }
  }
  public get HasChild(): string {
    return this.HasChildField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 21)]
  public set ParentItemOID(value: number) {
    if (!(this.ParentItemOIDField === value)) {
      this.ParentItemOIDField = value;
      //  this.RaisePropertyChanged("ParentItemOID");
    }
  }
  public get ParentItemOID(): number {
    return this.ParentItemOIDField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 22)]

  public set HOParentOID(value: number) {
    if (!(this.HOParentOIDField === value)) {
      this.HOParentOIDField = value;
      //  this.RaisePropertyChanged("HOParentOID");
    }
  }
  public get HOParentOID(): number {
    return this.HOParentOIDField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 23)]
  public set OID(value: number) {
    if (!(this.OIDField === value)) {
      this.OIDField = value;
      //  this.RaisePropertyChanged("OID");
    }
  }
  public get OID(): number {
    return this.OIDField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 24)]
  public set BrandName(value: string) {
    if (!(this.BrandNameField === value)) {
      this.BrandNameField = value;
      //  this.RaisePropertyChanged("BrandName");
    }
  }
  public get BrandName(): string {
    return this.BrandNameField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 25)]
  public set DeactivateFrom(value: Date) {
    if (!(this.DeactivateFromField === value)) {
      this.DeactivateFromField = value;
      //  this.RaisePropertyChanged("BrandName");
    }
  }
  public get DeactivateFrom(): Date {
    return this.DeactivateFromField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 26)]
  public set ReinstateFrom(value: Date) {
    if (!(this.ReinstateFromField === value)) {
      this.ReinstateFromField = value;
      //  this.RaisePropertyChanged("BrandName");
    }
  }
  public get ReinstateFrom(): Date {
    return this.ReinstateFromField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 27)]
  public set PrescriptionItemID(value: string) {
    if (!(this.PrescriptionItemIDField === value)) {
      this.PrescriptionItemIDField = value;
      //  this.RaisePropertyChanged("PrescriptionItemID");
    }
  }
  public get PrescriptionItemID(): string {
    return this.PrescriptionItemIDField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 28)]

  public set PrescriptionID(value: string) {
    if (!(this.PrescriptionIDField === value)) {
      this.PrescriptionIDField = value;
      //  this.RaisePropertyChanged("PrescriptionID");
    }
  }
  public get PrescriptionID(): string {
    return this.PrescriptionIDField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 29)]
  public set Formularynote(value: string) {
    if (!(this.FormularynoteField === value)) {
      this.FormularynoteField = value;
      //  this.RaisePropertyChanged("Formularynote");
    }
  }
  public get Formularynote(): string {
    return this.FormularynoteField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 30)]
  public set OrganisationOID(value: number) {
    if (!(this.OrganisationOIDField === value)) {
      this.OrganisationOIDField = value;
      //  this.RaisePropertyChanged("OrganisationOID");
    }
  }
  public get OrganisationOID(): number {
    return this.OrganisationOIDField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 31)]
  public set IsFormulary(value: string) {
    if (!(this.IsFormularyField === value)) {
      this.IsFormularyField = value;
      //  this.RaisePropertyChanged("IsFormulary");
    }
  }
  public get IsFormulary(): string {
    return this.IsFormularyField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 32)]
  public set Version(value: string) {
    if (!(this.VersionField === value)) {
      this.VersionField = value;
      //  this.RaisePropertyChanged("Version");
    }
  }
  public get Version(): string {
    return this.VersionField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 33)]
  public set MCVersion(value: string) {
    if (!(this.MCVersionField === value)) {
      this.MCVersionField = value;
      //  this.RaisePropertyChanged("MCVersion");
    }
  }
  public get MCVersion(): string {
    return this.MCVersionField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 34)]
  public set SourceDataProviderType(value: string) {
    if (!(this.SourceDataProviderTypeField === value)) {
      this.SourceDataProviderTypeField = value;
      //  this.RaisePropertyChanged("SourceDataProviderType");
    }
  }
  public get SourceDataProviderType(): string {
    return this.SourceDataProviderTypeField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 35)]
  public set SourceDataProviderID(value: string) {
    if (!(this.SourceDataProviderIDField === value)) {
      this.SourceDataProviderIDField = value;
      //  this.RaisePropertyChanged("SourceDataProviderID");
    }
  }
  public get SourceDataProviderID(): string {
    return this.SourceDataProviderIDField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 36)]
  public set DataProvStatus(value: string) {
    if (!(this.DataProvStatusField === value)) {
      this.DataProvStatusField = value;
      //  this.RaisePropertyChanged("DataProvStatus");
    }
  }
  public get DataProvStatus(): string {
    return this.DataProvStatusField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 37)]
  public set SkipBasic(value: boolean) {
    if (!(this.SkipBasicField === value)) {
      this.SkipBasicField = value;
      //  this.RaisePropertyChanged("SkipBasic");
    }
  }
  public get SkipBasic(): boolean {
    return this.SkipBasicField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 38)]
  public set Hierarchy(value: string) {
    if (!(this.HierarchyField === value)) {
      this.HierarchyField = value;
      //  this.RaisePropertyChanged("Hierarchy");
    }
  }
  public get Hierarchy(): string {
    return this.HierarchyField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 39)]
  public set HasDataFilter(value: string) {
    if (!(this.HasDataFilterField === value)) {
      this.HasDataFilterField = value;
      //  this.RaisePropertyChanged("Hierarchy");
    }
  }
  public get HasDataFilter(): string {
    return this.HasDataFilterField;
  }

  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 40)]
  public set EncounterID(value: string) {
    if (!(this.EncounterIDField === value)) {
      this.EncounterIDField = value;
      //  this.RaisePropertyChanged("Hierarchy");
    }
  }
  public get EncounterID(): string {
    return this.EncounterIDField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 41)]
  public set ItemQuantityUOM(value: string) {
    if (!(this.ItemQuantityUOMField === value)) {
      this.ItemQuantityUOMField = value;
      //  this.RaisePropertyChanged("ItemQuantityUOM");
    }
  }
  public get ItemQuantityUOM(): string {
    return this.ItemQuantityUOMField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 42)]
  public set PresItemType(value: string) {
    if (!(this.PresItemTypeField === value)) {
      this.PresItemTypeField = value;
      //  this.RaisePropertyChanged("PresItemType");
    }
  }
  public get PresItemType(): string {
    return this.PresItemTypeField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 43)]
  public set IsPrescribeByBrand(value: string) {
    if (!(this.IsPrescribeByBrandField === value)) {
      this.IsPrescribeByBrandField = value;
      //  this.RaisePropertyChanged("IsPrescribeByBrand");
    }
  }
  public get IsPrescribeByBrand(): string {
    return this.IsPrescribeByBrandField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 44)]
  public set ItemID(value: string) {
    if (!(this.ItemIDField === value)) {
      this.ItemIDField = value;
      //  this.RaisePropertyChanged("ItemID");
    }
  }
  public get ItemID(): string {
    return this.ItemIDField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 45)]
  public set ItemClass(value: string) {
    if (!(this.ItemClassField === value)) {
      this.ItemClassField = value;
      //  this.RaisePropertyChanged("ItemClass");
    }
  }
  public get ItemClass(): string {
    return this.ItemClassField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 46)]
  public set OrganisationName(value: string) {
    if (!(this.OrganisationNameField === value)) {
      this.OrganisationNameField = value;
      //  this.RaisePropertyChanged("OrganisationName");
    }
  }
  public get OrganisationName(): string {
    return this.OrganisationNameField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 47)]
  public set IsManufacturerGeneric(value: string) {
    if (!(this.IsManufacturerGenericField === value)) {
      this.IsManufacturerGenericField = value;
      //  this.RaisePropertyChanged("IsManufacturerGeneric");
    }
  }
  public get IsManufacturerGeneric(): string {
    return this.IsManufacturerGenericField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 48)]
  public set IsParallelImport(value: string) {
    if (!(this.IsParallelImportField === value)) {
      this.IsParallelImportField = value;
      //  this.RaisePropertyChanged("IsParallelImport");
    }
  }
  public get IsParallelImport(): string {
    return this.IsParallelImportField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 49)]
  public set ITEMLORENZOID(value: string) {
    if (!(this.ITEMLORENZOIDField === value)) {
      this.ITEMLORENZOIDField = value;
      //  this.RaisePropertyChanged("ITEMLORENZOID");
    }
  }
  public get ITEMLORENZOID(): string {
    return this.ITEMLORENZOIDField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 50)]
  public set AliasName(value: string) {
    if (!(this.AliasNameField === value)) {
      this.AliasNameField = value;
      //  this.RaisePropertyChanged("AliasName");
    }
  }
  public get AliasName(): string {
    return this.AliasNameField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 51)]
  public set Display(value: string) {
    if (!(this.DisplayField === value)) {
      this.DisplayField = value;
      //  this.RaisePropertyChanged("Display");
    }
  }
  public get Display(): string {
    return this.DisplayField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 52)]
  public set ItemStatus(value: string) {
    if (!(this.ItemStatusField === value)) {
      this.ItemStatusField = value;
      //  this.RaisePropertyChanged("ItemStatus");
    }
  }
  public get ItemStatus(): string {
    return this.ItemStatusField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 53)]

  public set MCOID(value: number) {
    if (!(this.MCOIDField === value)) {
      this.MCOIDField = value;
      //  this.RaisePropertyChanged("MCOID");
    }
  }
  public get MCOID(): number {
    return this.MCOIDField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 54)]
  public set MCPrepStatusCode(value: string) {
    if (!(this.MCPrepStatusCodeField === value)) {
      this.MCPrepStatusCodeField = value;
      //  this.RaisePropertyChanged("MCPrepStatusCode");
    }
  }
  public get MCPrepStatusCode(): string {
    return this.MCPrepStatusCodeField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 55)]
  public set MCItemName(value: string) {
    if (!(this.MCItemNameField === value)) {
      this.MCItemNameField = value;
      //  this.RaisePropertyChanged("MCItemName");
    }
  }
  public get MCItemName(): string {
    return this.MCItemNameField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 56)]
  public set MCItmSubtypecode(value: string) {
    if (!(this.MCItmSubtypecodeField === value)) {
      this.MCItmSubtypecodeField = value;
      //  this.RaisePropertyChanged("MCItmSubtypecode");
    }
  }
  public get MCItmSubtypecode(): string {
    return this.MCItmSubtypecodeField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 57)]
  public set MCIDeactitemName(value: string) {
    if (!(this.MCIDeactitemNameField === value)) {
      this.MCIDeactitemNameField = value;
      //  this.RaisePropertyChanged("MCIDeactitemName");
    }
  }
  public get MCIDeactitemName(): string {
    return this.MCIDeactitemNameField;
  }
}
export class TechValidatedItem extends CLZOObject {
  private DrugItemField: DrugItemBasicData = new DrugItemBasicData();

  private QuantityPerDoseField: string = '';

  private QuantityPerDoseUOMField: ObjectInfo = new ObjectInfo();

  private TotalQuantityField: string = '';

  private TotalQuantityUOMField: ObjectInfo = new ObjectInfo();

  private SupplyInstructionField: ObjectInfo[] = [];

  private DispensingInstructionField: ObjectInfo[] = [];

  private ClinicalVerifyCommentsField: string = '';

  private PrescriptionItemTechOIDField: number = 0;

  private IsTechnicalvalidateField: string = '';

  private IdentifyingDomainField: string = '';

  //Ramya
  private PrescriptionItemOIDField: number = 0;
  private MedSupplyOIDField: number = 0;

  private OtherDispensingInstructionField: string = '';

  private IsDoseCombinationsDefinedField: string = '';

  private isSupplyRequestedField: string = '';

  private locationOidField: number = 0;

  private serviceOidField: number = 0;

  private supplyCommentsField: string = '';
  //Epic 7732 RX changes - Poorni
  private FluidPrescribableItemListOIDField: number = 0;

  private lastReqUrgencyField: string = '';

  private lastReqCommentsField: string = '';

  private lastRequestedByField: string = '';

  private lastRequestedDateTimeField: Date = new Date();

  private reqIconShowField: boolean = false;

  private prescriptionMultiComponentOIDField: number = 0;

  private dispenseStatusField: PresItemRequestDetails[] = [];
  private pIDRequestIdentifyingOIDField: number = 0;

  private pIDRequestIdentifyingTypeField: string = '';

  //Esakki - WSC
  private IsWardStockField: boolean = false;

  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false)]
  public set DrugItem(value: DrugItemBasicData) {
    if (!(this.DrugItemField === value)) {
      this.DrugItemField = value;
      //  this.RaisePropertyChanged("DrugItem");
    }
  }
  public get DrugItem(): DrugItemBasicData {
    return this.DrugItemField;
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 1)]
  public set QuantityPerDose(value: string) {
    if (!(this.QuantityPerDoseField === value)) {
      this.QuantityPerDoseField = value;
      //  this.RaisePropertyChanged("QuantityPerDose");
    }
  }
  public get QuantityPerDose(): string {
    return this.QuantityPerDoseField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 2)]
  public set QuantityPerDoseUOM(value: ObjectInfo) {
    if (!(this.QuantityPerDoseUOMField === value)) {
      this.QuantityPerDoseUOMField = value;
      //  this.RaisePropertyChanged("QuantityPerDoseUOM");
    }
  }
  public get QuantityPerDoseUOM(): ObjectInfo {
    return this.QuantityPerDoseUOMField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 3)]

  public set TotalQuantity(value: string) {
    if (!(this.TotalQuantityField === value)) {
      this.TotalQuantityField = value;
      //  this.RaisePropertyChanged("TotalQuantity");
    }
  }
  public get TotalQuantity(): string {
    return this.TotalQuantityField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 4)]

  public set TotalQuantityUOM(value: ObjectInfo) {
    if (!(this.TotalQuantityUOMField === value)) {
      this.TotalQuantityUOMField = value;
      //  this.RaisePropertyChanged("TotalQuantityUOM");
    }
  }
  public get TotalQuantityUOM(): ObjectInfo {
    return this.TotalQuantityUOMField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 5)]

  public set SupplyInstruction(value: Array<ObjectInfo>) {
    if (!(this.SupplyInstructionField === value)) {
      this.SupplyInstructionField = value;
      //  this.RaisePropertyChanged("SupplyInstruction");
    }
  }
  public get SupplyInstruction(): Array<ObjectInfo> {
    return this.SupplyInstructionField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 6)]

  public set DispensingInstruction(value: Array<ObjectInfo>) {
    if (!(this.DispensingInstructionField === value)) {
      this.DispensingInstructionField = value;
      //  this.RaisePropertyChanged("DispensingInstruction");
    }
  }
  public get DispensingInstruction(): Array<ObjectInfo> {
    return this.DispensingInstructionField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 7)]

  public set ClinicalVerifyComments(value: string) {
    if (!(this.ClinicalVerifyCommentsField === value)) {
      this.ClinicalVerifyCommentsField = value;
      //  this.RaisePropertyChanged("ClinicalVerifyComments");
    }
  }
  public get ClinicalVerifyComments(): string {
    return this.ClinicalVerifyCommentsField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 8)]

  public set PrescriptionItemTechOID(value: number) {
    if (!(this.PrescriptionItemTechOIDField === value)) {
      this.PrescriptionItemTechOIDField = value;
      //  this.RaisePropertyChanged("PrescriptionItemTechOID");
    }
  }
  public get PrescriptionItemTechOID(): number {
    return this.PrescriptionItemTechOIDField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 9)]
  public set IsTechnicalvalidate(value: string) {
    if (!(this.IsTechnicalvalidateField === value)) {
      this.IsTechnicalvalidateField = value;
      //  this.RaisePropertyChanged("IsTechnicalvalidate");
    }
  }
  public get IsTechnicalvalidate(): string {
    return this.IsTechnicalvalidateField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 10)]

  public set IdentifyingDomain(value: string) {
    if (!(this.IdentifyingDomainField === value)) {
      this.IdentifyingDomainField = value;
      //  this.RaisePropertyChanged("IdentifyingDomain");
    }
  }
  public get IdentifyingDomain(): string {
    return this.IdentifyingDomainField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 11)]

  public set PrescriptionItemOID(value: number) {
    if (!(this.PrescriptionItemOIDField === value)) {
      this.PrescriptionItemOIDField = value;
      //  this.RaisePropertyChanged("PrescriptionItemOID");
    }
  }
  public get PrescriptionItemOID(): number {
    return this.PrescriptionItemOIDField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 12)]
  public set MedSupplyOID(value: number) {
    if (!(this.MedSupplyOIDField === value)) {
      this.MedSupplyOIDField = value;
      //  this.RaisePropertyChanged("MedSupplyOID");
    }
  }
  public get MedSupplyOID(): number {
    return this.MedSupplyOIDField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 13)]
  public set OtherDispensingInstruction(value: string) {
    if (!(this.OtherDispensingInstructionField === value)) {
      this.OtherDispensingInstructionField = value;
      //  this.RaisePropertyChanged("OtherDispensingInstruction");
    }
  }
  public get OtherDispensingInstruction(): string {
    return this.OtherDispensingInstructionField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 14)]

  public set IsDoseCombinationsDefined(value: string) {
    if (!(this.IsDoseCombinationsDefinedField === value)) {
      this.IsDoseCombinationsDefinedField = value;
      //  this.RaisePropertyChanged("IsDoseCombinationsDefined");
    }
  }
  public get IsDoseCombinationsDefined(): string {
    return this.IsDoseCombinationsDefinedField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 15)]
  public set FluidPrescribableItemListOID(value: number) {
    if (!(this.FluidPrescribableItemListOIDField === value)) {
      this.FluidPrescribableItemListOIDField = value;
      //  this.RaisePropertyChanged("FluidPrescribableItemListOID");
    }
  }
  public get FluidPrescribableItemListOID(): number {
    return this.FluidPrescribableItemListOIDField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 16)]
  public set LastReqUrgency(value: string) {
    if (!(this.lastReqUrgencyField === value)) {
      this.lastReqUrgencyField = value;
      //  this.RaisePropertyChanged("LastReqUrgency");
    }
  }
  public get LastReqUrgency(): string {
    return this.lastReqUrgencyField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 17)]
  public set LastReqComments(value: string) {
    if (!(this.lastReqCommentsField === value)) {
      this.lastReqCommentsField = value;
      //  this.RaisePropertyChanged("LastReqComments");
    }
  }
  public get LastReqComments(): string {
    return this.lastReqCommentsField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 18)]
  public set LastRequestedBy(value: string) {
    if (!(this.lastRequestedByField === value)) {
      this.lastRequestedByField = value;
      //  this.RaisePropertyChanged("LastRequestedBy");
    }
  }
  public get LastRequestedBy(): string {
    return this.lastRequestedByField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 19)]

  public set LastRequestedDateTime(value: Date) {
    if (!(this.lastRequestedDateTimeField === value)) {
      this.lastRequestedDateTimeField = value;
      //  this.RaisePropertyChanged("LastRequestedDateTime");
    }
  }
  public get LastRequestedDateTime(): Date {
    return this.lastRequestedDateTimeField;
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 20)]

  public set ReqIconShow(value: boolean) {
    if (!(this.reqIconShowField === value)) {
      this.reqIconShowField = value;
      //  this.RaisePropertyChanged("ReqIconShow");
    }
  }
  public get ReqIconShow(): boolean {
    return this.reqIconShowField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 21)]

  public set PrescriptionMultiComponentOID(value: number) {
    if (!(this.prescriptionMultiComponentOIDField === value)) {
      this.prescriptionMultiComponentOIDField = value;
      //  this.RaisePropertyChanged("PrescriptionMultiComponentOID");
    }
  }
  public get PrescriptionMultiComponentOID(): number {
    return this.prescriptionMultiComponentOIDField;
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 22)]

  public set DispenseStatus(value: PresItemRequestDetails[]) {
    if (!(this.dispenseStatusField === value)) {
      this.dispenseStatusField = value;
      //  this.RaisePropertyChanged("DispenseStatus");
    }
  }
  public get DispenseStatus(): PresItemRequestDetails[] {
    return this.dispenseStatusField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 23)]

  public set PIDRequestIdentifyingOID(value: number) {
    if (!(this.pIDRequestIdentifyingOIDField === value)) {
      this.pIDRequestIdentifyingOIDField = value;
      //  this.RaisePropertyChanged("PIDRequestIdentifyingOID");
    }
  }
  public get PIDRequestIdentifyingOID(): number {
    return this.pIDRequestIdentifyingOIDField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 24)]
  public set PIDRequestIdentifyingType(value: string) {
    if (!(this.pIDRequestIdentifyingTypeField === value)) {
      this.pIDRequestIdentifyingTypeField = value;
      //  this.RaisePropertyChanged("PIDRequestIdentifyingType");
    }
  }
  public get PIDRequestIdentifyingType(): string {
    return this.pIDRequestIdentifyingTypeField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 25)]
  public set IsWardStock(value: boolean) {
    if (!(this.IsWardStockField === value)) {
      this.IsWardStockField = value;
      //  this.RaisePropertyChanged("PIDRequestIdentifyingType");
    }
  }
  public get IsWardStock(): boolean {
    return this.IsWardStockField;
  }
}
export class DrugItemBasicData extends CLZOObject {
  private pField: string = '';
  private qField: string = '';
  private rField: string = '';
  private sField: string = '';
  private tField: string = '';
  private yField: string = '';
  private zField: boolean = false;
  private aaField: string = '';
  private bbField: string = '';
  private ccField: number = 0;
  private ddField: number = 0;
  private eeField: string = '';
  private ffField: string = '';
  private mcField: string = '';
  private psField: string = '';
  private IdentifyingOIDField: number = 0;
  private IdentifyingTypeField: string = '';
  private IdentifyingNameField: string = '';
  private PrescribableItemListOIDField: number = 0;
  private MCVersionNoField: string = '';
  private IsAccessContraintField: string = '';
  private IsPrescribeByBrandField: string = '';
  private FormularyNoteField: string = '';
  private ItemTypeField: string = '';
  private RouteOIDField: number = 0;
  private FormOIDField: number = 0;
  private IsTechValidateCAField: string = '';
  private LorenzoIDField: string = '';
  private NonCatItemReasonField: string = '';
  private TechQtyUomNameField: string = '';
  private IsControllDrugField: string = '';
  private ITMSUBTYPField: string = '';
  private SourceDataProviderTypeField: string = '';
  private AliasNameField: string = '';
  private PrescriptionItemIdField: string = '';
  private ConflictUniqueIdField: string = '';

  private bIsReplacementField: boolean = false;

  private sDosageFormField: string = '';

  private sStrengthField: string = '';

  private DosageFormIDField: number = 0;

  private MCOIDField: number = 0;

  private MCPrepStatusCodeField: string = '';

  private MCItemNameField: string = '';

  private MCIItemDisplayField: string = '';

  private PreparationStatusField: string = '';
  private MCIDEActiveItemsField: ArrayOfString = new ArrayOfString();

  private MCIVersionMatchItemsField: ArrayOfString = new ArrayOfString();

  private ItemSubTypeField: string = '';
  private IsIndicationRequiredField: string = '';
  private IndicationOverrideResonField: string = '';
  private PrescribableItemDetailOIDField: number = 0;
  private NonCatalogueOtherCommentsField: string = '';
  private OrderSentenceDescField: string = '';
  private VMVPMCILorenzoIDField: string = '';
  private VMVPMCIdentifyingNameField: string = '';
  private FormularyOIDField: number = 0;

  //Epic 3383 - To show PrescribingNote Icon and Text in Search Results and Secondary Window ProductOptions - Divya
  private PrescribingNoteField: string = '';
  //Ramya-3383-Order set US 60058- Favourite order set search
  private GuidanceField: string = '';
  //
  //Sravani - OSS excGuidance - Start
  private IsExcludeGuidanceInSearchField: string = '';
  //Sravani - OSS excGuidance - End

  //Ramya-3383-60058-Differentiating Orderset Item note and Customised Item Note in Resolution grid and Formviewer
  private OrdersetOIDField: string = '';
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false)]

  public set p(value: string) {
    if (!(this.pField === value)) {
      this.pField = value;
      //this.RaisePropertyChanged("p");
    }
  }
  public get p(): string {
    return this.pField;
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false)]

  public set q(value: string) {
    if (!(this.qField === value)) {
      this.qField = value;
      //this.RaisePropertyChanged("q");
    }
  }
  public get q(): string {
    return this.qField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false)]

  public set r(value: string) {
    if (!(this.rField === value)) {
      this.rField = value;
      //this.RaisePropertyChanged("r");
    }
  }
  public get r(): string {
    return this.rField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false)]

  public set s(value: string) {
    if (!(this.sField === value)) {
      this.sField = value;
      //this.RaisePropertyChanged("s");
    }
  }
  public get s(): string {
    return this.sField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false)]
  public set t(value: string) {
    if (!(this.tField === value)) {
      this.tField = value;
      //this.RaisePropertyChanged("t");
    }
  }
  public get t(): string {
    return this.tField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false)]
  public set y(value: string) {
    if (!(this.yField === value)) {
      this.yField = value;
      //this.RaisePropertyChanged("y");
    }
  }
  public get y(): string {
    return this.yField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true)]
  public set z(value: boolean) {
    if (!(this.zField === value)) {
      this.zField = value;
      //this.RaisePropertyChanged("z");
    }
  }
  public get z(): boolean {
    return this.zField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 7)]
  public set aa(value: string) {
    if (!(this.aaField === value)) {
      this.aaField = value;
      //this.RaisePropertyChanged("aa");
    }
  }
  public get aa(): string {
    return this.aaField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 8)]
  public set bb(value: string) {
    if (!(this.bbField === value)) {
      this.bbField = value;
      //this.RaisePropertyChanged("bb");
    }
  }
  public get bb(): string {
    return this.bbField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 9)]
  public set cc(value: number) {
    if (!(this.ccField === value)) {
      this.ccField = value;
      //this.RaisePropertyChanged("cc");
    }
  }
  public get cc(): number {
    return this.ccField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 10)]
  public set dd(value: number) {
    if (!(this.ddField === value)) {
      this.ddField = value;
      //this.RaisePropertyChanged("dd");
    }
  }
  public get dd(): number {
    return this.ddField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 11)]
  public set ee(value: string) {
    if (!(this.eeField === value)) {
      this.eeField = value;
      //this.RaisePropertyChanged("ee");
    }
  }
  public get ee(): string {
    return this.eeField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 12)]
  public set ff(value: string) {
    if (!(this.ffField === value)) {
      this.ffField = value;
      //this.RaisePropertyChanged("ff");
    }
  }
  public get ff(): string {
    return this.ffField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 13)]
  public set mc(value: string) {
    if (!(this.mcField === value)) {
      this.mcField = value;
      //this.RaisePropertyChanged("mc");
    }
  }
  public get mc(): string {
    return this.mcField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 14)]
  public set ps(value: string) {
    if (!(this.psField === value)) {
      this.psField = value;
      //this.RaisePropertyChanged("ps");
    }
  }
  public get ps(): string {
    return this.psField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 15)]
  public set IdentifyingOID(value: number) {
    if (!(this.IdentifyingOIDField === value)) {
      this.IdentifyingOIDField = value;
      //this.RaisePropertyChanged("IdentifyingOID");
    }
  }
  public get IdentifyingOID(): number {
    return this.IdentifyingOIDField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 16)]
  public set IdentifyingType(value: string) {
    if (!(this.IdentifyingTypeField === value)) {
      this.IdentifyingTypeField = value;
      //this.RaisePropertyChanged("IdentifyingType");
    }
  }
  public get IdentifyingType(): string {
    return this.IdentifyingTypeField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 17)]
  public set IdentifyingName(value: string) {
    if (!(this.IdentifyingNameField === value)) {
      this.IdentifyingNameField = value;
      //this.RaisePropertyChanged("IdentifyingName");
    }
  }
  public get IdentifyingName(): string {
    return this.IdentifyingNameField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 18)]
  public set PrescribableItemListOID(value: number) {
    if (!(this.PrescribableItemListOIDField === value)) {
      this.PrescribableItemListOIDField = value;
      //this.RaisePropertyChanged("PrescribableItemListOID");
    }
  }
  public get PrescribableItemListOID(): number {
    return this.PrescribableItemListOIDField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 19)]
  public set MCVersionNo(value: string) {
    if (!(this.MCVersionNoField === value)) {
      this.MCVersionNoField = value;
      //this.RaisePropertyChanged("MCVersionNo");
    }
  }
  public get MCVersionNo(): string {
    return this.MCVersionNoField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 20)]
  public set IsAccessContraint(value: string) {
    if (!(this.IsAccessContraintField === value)) {
      this.IsAccessContraintField = value;
      //this.RaisePropertyChanged("IsAccessContraint");
    }
  }
  public get IsAccessContraint(): string {
    return this.IsAccessContraintField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 21)]
  public set IsPrescribeByBrand(value: string) {
    if (!(this.IsPrescribeByBrandField === value)) {
      this.IsPrescribeByBrandField = value;
      //this.RaisePropertyChanged("IsPrescribeByBrand");
    }
  }
  public get IsPrescribeByBrand(): string {
    return this.IsPrescribeByBrandField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 22)]
  public set FormularyNote(value: string) {
    if (!(this.FormularyNoteField === value)) {
      this.FormularyNoteField = value;
      //this.RaisePropertyChanged("FormularyNote");
    }
  }
  public get FormularyNote(): string {
    return this.FormularyNoteField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 23)]
  public set ItemType(value: string) {
    if (!(this.ItemTypeField === value)) {
      this.ItemTypeField = value;
      //this.RaisePropertyChanged("ItemType");
    }
  }
  public get ItemType(): string {
    return this.ItemTypeField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 24)]
  public set RouteOID(value: number) {
    if (!(this.RouteOIDField === value)) {
      this.RouteOIDField = value;
      //this.RaisePropertyChanged("RouteOID");
    }
  }
  public get RouteOID(): number {
    return this.RouteOIDField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 25)]
  public set FormOID(value: number) {
    if (!(this.FormOIDField === value)) {
      this.FormOIDField = value;
      //this.RaisePropertyChanged("FormOID");
    }
  }
  public get FormOID(): number {
    return this.FormOIDField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 26)]
  public set IsTechValidateCA(value: string) {
    if (!(this.IsTechValidateCAField === value)) {
      this.IsTechValidateCAField = value;
      //this.RaisePropertyChanged("IsTechValidateCA");
    }
  }
  public get IsTechValidateCA(): string {
    return this.IsTechValidateCAField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 27)]
  public set LorenzoID(value: string) {
    if (!(this.LorenzoIDField === value)) {
      this.LorenzoIDField = value;
      //this.RaisePropertyChanged("LorenzoID");
    }
  }
  public get LorenzoID(): string {
    return this.LorenzoIDField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 28)]
  public set NonCatItemReason(value: string) {
    if (!(this.NonCatItemReasonField === value)) {
      this.NonCatItemReasonField = value;
      //this.RaisePropertyChanged("NonCatItemReason");
    }
  }
  public get NonCatItemReason(): string {
    return this.NonCatItemReasonField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 29)]
  public set TechQtyUomName(value: string) {
    if (!(this.TechQtyUomNameField === value)) {
      this.TechQtyUomNameField = value;
      //this.RaisePropertyChanged("TechQtyUomName");
    }
  }
  public get TechQtyUomName(): string {
    return this.TechQtyUomNameField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 30)]
  public set IsControllDrug(value: string) {
    if (!(this.IsControllDrugField === value)) {
      this.IsControllDrugField = value;
      //this.RaisePropertyChanged("IsControllDrug");
    }
  }
  public get IsControllDrug(): string {
    return this.IsControllDrugField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 31)]
  public set ITMSUBTYP(value: string) {
    if (!(this.ITMSUBTYPField === value)) {
      this.ITMSUBTYPField = value;
      //this.RaisePropertyChanged("ITMSUBTYP");
    }
  }
  public get ITMSUBTYP(): string {
    return this.ITMSUBTYPField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 32)]
  public set SourceDataProviderType(value: string) {
    if (!(this.SourceDataProviderTypeField === value)) {
      this.SourceDataProviderTypeField = value;
      //this.RaisePropertyChanged("SourceDataProviderType");
    }
  }
  public get SourceDataProviderType(): string {
    return this.SourceDataProviderTypeField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 33)]
  public set AliasName(value: string) {
    if (!(this.AliasNameField === value)) {
      this.AliasNameField = value;
      //this.RaisePropertyChanged("AliasName");
    }
  }
  public get AliasName(): string {
    return this.AliasNameField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 34)]
  public set PrescriptionItemId(value: string) {
    if (!(this.PrescriptionItemIdField === value)) {
      this.PrescriptionItemIdField = value;
      //this.RaisePropertyChanged("PrescriptionItemId");
    }
  }
  public get PrescriptionItemId(): string {
    return this.PrescriptionItemIdField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 35)]
  public set ConflictUniqueId(value: string) {
    if (!(this.ConflictUniqueIdField === value)) {
      this.ConflictUniqueIdField = value;
      //this.RaisePropertyChanged("ConflictUniqueId");
    }
  }
  public get ConflictUniqueId(): string {
    return this.ConflictUniqueIdField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 36)]
  public set bIsReplacement(value: boolean) {
    if (!(this.bIsReplacementField === value)) {
      this.bIsReplacementField = value;
      //this.RaisePropertyChanged("bIsReplacement");
    }
  }
  public get bIsReplacement(): boolean {
    return this.bIsReplacementField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 37)]
  public set sDosageForm(value: string) {
    if (!(this.sDosageFormField === value)) {
      this.sDosageFormField = value;
      //this.RaisePropertyChanged("sDosageForm");
    }
  }
  public get sDosageForm(): string {
    return this.sDosageFormField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 38)]
  public set sStrength(value: string) {
    if (!(this.sStrengthField === value)) {
      this.sStrengthField = value;
      //this.RaisePropertyChanged("sStrength");
    }
  }
  public get sStrength(): string {
    return this.sStrengthField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 39)]
  public set DosageFormID(value: number) {
    if (!(this.DosageFormIDField === value)) {
      this.DosageFormIDField = value;
      //this.RaisePropertyChanged("DosageFormID");
    }
  }
  public get DosageFormID(): number {
    return this.DosageFormIDField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 40)]
  public set MCOID(value: number) {
    if (!(this.DosageFormIDField === value)) {
      this.DosageFormIDField = value;
      //this.RaisePropertyChanged("MCOID");
    }
  }
  public get MCOID(): number {
    return this.DosageFormIDField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 41)]
  public set MCPrepStatusCode(value: string) {
    if (!(this.MCPrepStatusCodeField === value)) {
      this.MCPrepStatusCodeField = value;
      //this.RaisePropertyChanged("MCPrepStatusCode");
    }
  }
  public get MCPrepStatusCode(): string {
    return this.MCPrepStatusCodeField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 42)]
  public set MCItemName(value: string) {
    if (!(this.MCItemNameField === value)) {
      this.MCItemNameField = value;
      //this.RaisePropertyChanged("MCItemName");
    }
  }
  public get MCItemName(): string {
    return this.MCItemNameField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 43)]
  public set MCIItemDisplay(value: string) {
    if (!(this.MCIItemDisplayField === value)) {
      this.MCIItemDisplayField = value;
      //this.RaisePropertyChanged("MCIItemDisplay");
    }
  }
  public get MCIItemDisplay(): string {
    return this.MCIItemDisplayField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 44)]
  public set PreparationStatus(value: string) {
    if (!(this.PreparationStatusField === value)) {
      this.PreparationStatusField = value;
      //this.RaisePropertyChanged("PreparationStatus");
    }
  }
  public get PreparationStatus(): string {
    return this.PreparationStatusField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 45)]
  public set MCIDEActiveItems(value: ArrayOfString) {
    if (!(this.MCIDEActiveItemsField === value)) {
      this.MCIDEActiveItemsField = value;
      //this.RaisePropertyChanged("MCIDEActiveItems");
    }
  }
  public get MCIDEActiveItems(): ArrayOfString {
    return this.MCIDEActiveItemsField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 46)]
  public set MCIVersionMatchItems(value: ArrayOfString) {
    if (!(this.MCIVersionMatchItemsField === value)) {
      this.MCIVersionMatchItemsField = value;
      //this.RaisePropertyChanged("MCIVersionMatchItems");
    }
  }
  public get MCIVersionMatchItems(): ArrayOfString {
    return this.MCIVersionMatchItemsField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 47)]
  public set ItemSubType(value: string) {
    if (!(this.ItemSubTypeField === value)) {
      this.ItemSubTypeField = value;
      //this.RaisePropertyChanged("ItemSubType");
    }
  }
  public get ItemSubType(): string {
    return this.ItemSubTypeField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 48)]
  public set IsIndicationRequired(value: string) {
    if (!(this.IsIndicationRequiredField === value)) {
      this.IsIndicationRequiredField = value;
      //this.RaisePropertyChanged("IsIndicationRequired");
    }
  }
  public get IsIndicationRequired(): string {
    return this.IsIndicationRequiredField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 49)]
  public set IndicationOverrideReson(value: string) {
    if (!(this.IndicationOverrideResonField === value)) {
      this.IndicationOverrideResonField = value;
      //this.RaisePropertyChanged("IndicationOverrideReson");
    }
  }
  public get IndicationOverrideReson(): string {
    return this.IndicationOverrideResonField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 50)]
  public set PrescribableItemDetailOID(value: number) {
    if (!(this.PrescribableItemDetailOIDField === value)) {
      this.PrescribableItemDetailOIDField = value;
      //this.RaisePropertyChanged("PrescribableItemDetailOID");
    }
  }
  public get PrescribableItemDetailOID(): number {
    return this.PrescribableItemDetailOIDField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 51)]
  public set NonCatalogueOtherComments(value: string) {
    if (!(this.NonCatalogueOtherCommentsField === value)) {
      this.NonCatalogueOtherCommentsField = value;
      //this.RaisePropertyChanged("NonCatalogueOtherComments");
    }
  }
  public get NonCatalogueOtherComments(): string {
    return this.NonCatalogueOtherCommentsField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 52)]

  public set OrderSentenceDesc(value: string) {
    if (!(this.OrderSentenceDescField === value)) {
      this.OrderSentenceDescField = value;
      //this.RaisePropertyChanged("OrderSentenceDesc");
    }
  }
  public get OrderSentenceDesc(): string {
    return this.OrderSentenceDescField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 53)]
  public set VMVPMCILorenzoID(value: string) {
    if (!(this.VMVPMCILorenzoIDField === value)) {
      this.VMVPMCILorenzoIDField = value;
      //this.RaisePropertyChanged("VMVPMCILorenzoID");
    }
  }
  public get VMVPMCILorenzoID(): string {
    return this.VMVPMCILorenzoIDField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 54)]
  public set VMVPMCIdentifyingName(value: string) {
    if (!(this.VMVPMCIdentifyingNameField === value)) {
      this.VMVPMCIdentifyingNameField = value;
      //this.RaisePropertyChanged("VMVPMCIdentifyingName");
    }
  }
  public get VMVPMCIdentifyingName(): string {
    return this.VMVPMCIdentifyingNameField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 55)]
  public set FormularyOID(value: number) {
    if (!(this.FormularyOIDField === value)) {
      this.FormularyOIDField = value;
      //this.RaisePropertyChanged("FormularyOID");
    }
  }
  public get FormularyOID(): number {
    return this.FormularyOIDField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 56)]
  public set PrescribingNote(value: string) {
    if (!(this.PrescribingNoteField === value)) {
      this.PrescribingNoteField = value;
      //this.RaisePropertyChanged("PrescribingNote");
    }
  }
  public get PrescribingNote(): string {
    return this.PrescribingNoteField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 57)]
  public set Guidance(value: string) {
    if (!(this.GuidanceField === value)) {
      this.GuidanceField = value;
      //this.RaisePropertyChanged("Guidance");
    }
  }
  public get Guidance(): string {
    return this.GuidanceField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 58)]

  public set OrdersetOID(value: string) {
    if (!(this.OrdersetOIDField === value)) {
      this.OrdersetOIDField = value;
      //this.RaisePropertyChanged("OrdersetOID");
    }
  }
  public get OrdersetOID(): string {
    return this.OrdersetOIDField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 59)]
  public set IsExcludeGuidanceInSearch(value: string) {
    if (!(this.IsExcludeGuidanceInSearchField === value)) {
      this.IsExcludeGuidanceInSearchField = value;
      //this.RaisePropertyChanged("IsExcludeGuidanceInSearch");
    }
  }
  public get IsExcludeGuidanceInSearch(): string {
    return this.IsExcludeGuidanceInSearchField;
  }
}
export class ArrayOfString extends Array<string> { }
export enum EnumDrugOptions {
  ALTERNATE_OPTIONS = 0,
  PRESCRIBING_OPTIONS = 1,
  RELATED_OPTIONS = 2,
  ALL = 3,
}

export class DrugItemInputData extends DrugItemBasicData {
  private PageIndexField: number = 0;
  private FavouritesDetailOIDField: number = 0;

  private IsFormularyField: boolean = false;

  private MatchIdentifyingTypesField: ArrayOfString = new ArrayOfString();

  private OptionsField: any;

  private nPageNoField: number = 0;

  private nPageSizeField: number = 0;

  private nMAXRowsField: number = 0;
  private PrepStatusCodeField: string = '';
  //2.16 Epic 3383 US 14990 Start
  private TeamOIDsField: string = '';
  //2.16 Epic 3383 US 14990 End
  private MCIDeactItemsField: string = '';
  //QC 222061   TFS 92772RR DOS FIx
  private IsFetchFormularyAndNonFormularyField: boolean = false;
  //kanimozhi Authorise CR --Start
  private IsAuthoriseField: boolean = false;
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true)]
  public set PageIndex(value: number) {
    if (!(this.PageIndexField === value)) {
      this.PageIndexField = value;
      //this.RaisePropertyChanged("PageIndex");
    }
  }
  public get PageIndex(): number {
    return this.PageIndexField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 1)]
  public set FavouritesDetailOID(value: number) {
    if (!(this.FavouritesDetailOIDField === value)) {
      this.FavouritesDetailOIDField = value;
      //this.RaisePropertyChanged("FavouritesDetailOID");
    }
  }
  public get FavouritesDetailOID(): number {
    return this.FavouritesDetailOIDField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 2)]
  public set IsFormulary(value: boolean) {
    if (!(this.IsFormularyField === value)) {
      this.IsFormularyField = value;
      //this.RaisePropertyChanged("IsFormulary");
    }
  }
  public get IsFormulary(): boolean {
    return this.IsFormularyField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 3)]
  public set MatchIdentifyingTypes(value: ArrayOfString) {
    if (!(this.MatchIdentifyingTypesField === value)) {
      this.MatchIdentifyingTypesField = value;
      //this.RaisePropertyChanged("MatchIdentifyingTypes");
    }
  }
  public get MatchIdentifyingTypes(): ArrayOfString {
    return this.MatchIdentifyingTypesField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 4)]
  public set Options(value: EnumDrugOptions) {
    if (!(this.OptionsField === value)) {
      this.OptionsField = value;
      //this.RaisePropertyChanged("Options");
    }
  }
  public get Options(): EnumDrugOptions {
    return this.OptionsField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 5)]
  public set nPageNo(value: number) {
    if (!(this.nPageNoField === value)) {
      this.nPageNoField = value;
      //this.RaisePropertyChanged("nPageNo");
    }
  }
  public get nPageNo(): number {
    return this.nPageNoField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 6)]
  public set nPageSize(value: number) {
    if (!(this.nPageSizeField === value)) {
      this.nPageSizeField = value;
      //this.RaisePropertyChanged("nPageSize");
    }
  }
  public get nPageSize(): number {
    return this.nPageSizeField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 7)]
  public set nMAXRows(value: number) {
    if (!(this.nMAXRowsField === value)) {
      this.nMAXRowsField = value;
      //this.RaisePropertyChanged("nMAXRows");
    }
  }
  public get nMAXRows(): number {
    return this.nMAXRowsField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 8)]
  public set PrepStatusCode(value: string) {
    if (!(this.PrepStatusCodeField === value)) {
      this.PrepStatusCodeField = value;
      //this.RaisePropertyChanged("PrepStatusCode");
    }
  }
  public get PrepStatusCode(): string {
    return this.PrepStatusCodeField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 9)]
  public set TeamOIDs(value: string) {
    if (!(this.TeamOIDsField === value)) {
      this.TeamOIDsField = value;
      //this.RaisePropertyChanged("TeamOIDs");
    }
  }
  public get TeamOIDs(): string {
    return this.TeamOIDsField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 10)]
  public set MCIDeactItems(value: string) {
    if (!(this.MCIDeactItemsField === value)) {
      this.MCIDeactItemsField = value;
      //this.RaisePropertyChanged("MCIDeactItems");
    }
  }
  public get MCIDeactItems(): string {
    return this.MCIDeactItemsField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 11)]
  public set IsFetchFormularyAndNonFormulary(value: boolean) {
    if (!(this.IsFetchFormularyAndNonFormularyField === value)) {
      this.IsFetchFormularyAndNonFormularyField = value;
      //this.RaisePropertyChanged("IsFetchFormularyAndNonFormulary");
    }
  }
  public get IsFetchFormularyAndNonFormulary(): boolean {
    return this.IsFetchFormularyAndNonFormularyField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 12)]
  public set IsAuthorise(value: boolean) {
    if (!(this.IsAuthoriseField === value)) {
      this.IsAuthoriseField = value;
      //this.RaisePropertyChanged("IsAuthorise");
    }
  }
  public get IsAuthorise(): boolean {
    return this.IsAuthoriseField;
  }
}
export class ConstituentItem extends PrescribeItemBase {
  private FormularyNote1Field: string = '';

  private AddedByField: string = '';

  private ProcessingInfoField: ProcessingInfo[] = [];

  private MFlagField: string = '';

  private ItemCatDetailIdField: number = 0;

  private identifyingoidField: number = 0;

  private ItemtypeField: string = '';

  private ProcessingdetailsField: string = '';

  private ItemFormularyNoteField: string = '';

  private HasAccessConstraintField: number = 0;

  private IsCopyFavField: string = '';

  private DrugPropertyField: DrugProperty[] = [];

  private IsIndicationRequiredField: string = '';
  private IsDataProviderTypeField: string = '';
  private FormularyOIDField: number = 0;
  //Ramya-3383- order set US 60058- to show the Prescribing note in order set level search result - Considering Guidance as Prescribing Note
  private GuidanceField: string = '';
  //
  //Ramya- 3383 - Common Med search
  private PrescNoteField: string = '';

  //[System.Runtime.Serialization.DataMemberAttribute(Name = "FormularyNote", EmitDefaultValue = false)]
  public set FormularyNote1(value: string) {
    if (!(this.FormularyNote1Field === value)) {
      this.FormularyNote1Field = value;
      //this.RaisePropertyChanged("FormularyNote1");
    }
  }
  public get FormularyNote1(): string {
    return this.FormularyNote1Field;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 1)]
  public set AddedBy(value: string) {
    if (!(this.AddedByField === value)) {
      this.AddedByField = value;
      //this.RaisePropertyChanged("AddedBy");
    }
  }
  public get AddedBy(): string {
    return this.AddedByField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 2)]
  public set ProcessingInfo(value: ProcessingInfo[]) {
    if (!(this.ProcessingInfoField === value)) {
      this.ProcessingInfoField = value;
      //this.RaisePropertyChanged("ProcessingInfo");
    }
  }
  public get ProcessingInfo(): ProcessingInfo[] {
    return this.ProcessingInfoField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 3)]
  public set MFlag(value: string) {
    if (!(this.MFlagField === value)) {
      this.MFlagField = value;
      //this.RaisePropertyChanged("MFlag");
    }
  }
  public get MFlag(): string {
    return this.MFlagField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 4)]
  public set ItemCatDetailId(value: number) {
    if (!(this.ItemCatDetailIdField === value)) {
      this.ItemCatDetailIdField = value;
      //this.RaisePropertyChanged("ItemCatDetailId");
    }
  }
  public get ItemCatDetailId(): number {
    return this.ItemCatDetailIdField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 5)]
  public set identifyingoid(value: number) {
    if (!(this.identifyingoidField === value)) {
      this.identifyingoidField = value;
      //this.RaisePropertyChanged("identifyingoid");
    }
  }
  public get identifyingoid(): number {
    return this.identifyingoidField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 6)]
  public set Itemtype(value: string) {
    if (!(this.ItemtypeField === value)) {
      this.ItemtypeField = value;
      //this.RaisePropertyChanged("Itemtype");
    }
  }
  public get Itemtype(): string {
    return this.ItemtypeField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 7)]

  public set Processingdetails(value: string) {
    if (!(this.ProcessingdetailsField === value)) {
      this.ProcessingdetailsField = value;
      //this.RaisePropertyChanged("Processingdetails");
    }
  }
  public get Processingdetails(): string {
    return this.ProcessingdetailsField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 8)]
  public set ItemFormularyNote(value: string) {
    if (!(this.ItemFormularyNoteField === value)) {
      this.ItemFormularyNoteField = value;
      //this.RaisePropertyChanged("ItemFormularyNote");
    }
  }
  public get ItemFormularyNote(): string {
    return this.ItemFormularyNoteField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 9)]
  public set HasAccessConstraint(value: number) {
    if (!(this.HasAccessConstraintField === value)) {
      this.HasAccessConstraintField = value;
      //this.RaisePropertyChanged("HasAccessConstraint");
    }
  }
  public get HasAccessConstraint(): number {
    return this.HasAccessConstraintField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 10)]
  public set IsCopyFav(value: string) {
    if (!(this.IsCopyFavField === value)) {
      this.IsCopyFavField = value;
      //this.RaisePropertyChanged("IsCopyFav");
    }
  }
  public get IsCopyFav(): string {
    return this.IsCopyFavField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 11)]
  public set DrugProperty(value: DrugProperty[]) {
    if (!(this.DrugPropertyField === value)) {
      this.DrugPropertyField = value;
      //this.RaisePropertyChanged("DrugProperty");
    }
  }
  public get DrugProperty(): DrugProperty[] {
    return this.DrugPropertyField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 12)]
  public set IsIndicationRequired(value: string) {
    if (!(this.IsIndicationRequiredField === value)) {
      this.IsIndicationRequiredField = value;
      //this.RaisePropertyChanged("IsIndicationRequired");
    }
  }
  public get IsIndicationRequired(): string {
    return this.IsIndicationRequiredField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 13)]

  public set IsDataProviderType(value: string) {
    if (!(this.IsDataProviderTypeField === value)) {
      this.IsDataProviderTypeField = value;
      //this.RaisePropertyChanged("IsDataProviderType");
    }
  }
  public get IsDataProviderType(): string {
    return this.IsDataProviderTypeField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 14)]
  public set FormularyOID(value: number) {
    if (!(this.FormularyOIDField === value)) {
      this.FormularyOIDField = value;
      //this.RaisePropertyChanged("FormularyOID");
    }
  }
  public get FormularyOID(): number {
    return this.FormularyOIDField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 15)]
  public set Guidance(value: string) {
    if (!(this.GuidanceField === value)) {
      this.GuidanceField = value;
      //this.RaisePropertyChanged("Guidance");
    }
  }
  public get Guidance(): string {
    return this.GuidanceField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 16)]
  public set PrescNote(value: string) {
    if (!(this.PrescNoteField === value)) {
      this.PrescNoteField = value;
      //this.RaisePropertyChanged("PrescNote");
    }
  }
  public get PrescNote(): string {
    return this.PrescNoteField;
  }
}
export class PrescriptionItemBasicData extends DrugItemBasicData {
  private SNOMEDCodeField: string = '';

  private OIDField: number = 0;

  private PrescriptionItemNumberField: string = '';

  private IsAdministeredField: string = '';

  private StartDTTMField: Date = new Date();

  private PartialStartDTTMField: string = '';

  private EndDTTMField: Date = new Date();

  private PrescriptionItemStatusField: string = '';

  private StatusModifedDTTMField: Date = new Date();

  private HealthOrganisationField: ObjectInfo = new ObjectInfo();

  private PrescriptionBasicDataField: Prescription = new Prescription();

  private IsControlledDrugField: string = '';

  //Esakki - WSC
  private CurrentDispenseStatusField: string = '';
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false)]
  public set SNOMEDCode(value: string) {
    if (!(this.SNOMEDCodeField === value)) {
      this.SNOMEDCodeField = value;
      //this.RaisePropertyChanged("SNOMEDCode");
    }
  }
  public get SNOMEDCode(): string {
    return this.SNOMEDCodeField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 1)]
  public set OID(value: number) {
    if (!(this.OIDField === value)) {
      this.OIDField = value;
      //this.RaisePropertyChanged("OID");
    }
  }
  public get OID(): number {
    return this.OIDField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 2)]
  public set PrescriptionItemNumber(value: string) {
    if (!(this.PrescriptionItemNumberField === value)) {
      this.PrescriptionItemNumberField = value;
      //this.RaisePropertyChanged("PrescriptionItemNumber");
    }
  }
  public get PrescriptionItemNumber(): string {
    return this.PrescriptionItemNumberField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 3)]
  public set IsAdministered(value: string) {
    if (!(this.IsAdministeredField === value)) {
      this.IsAdministeredField = value;
      //this.RaisePropertyChanged("IsAdministered");
    }
  }
  public get IsAdministered(): string {
    return this.IsAdministeredField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 4)]
  public set StartDTTM(value: Date) {
    if (!(this.StartDTTMField === value)) {
      this.StartDTTMField = value;
      //this.RaisePropertyChanged("StartDTTM");
    }
  }
  public get StartDTTM(): Date {
    return this.StartDTTMField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 5)]
  public set PartialStartDTTM(value: string) {
    if (!(this.PartialStartDTTMField === value)) {
      this.PartialStartDTTMField = value;
      //this.RaisePropertyChanged("PartialStartDTTM");
    }
  }
  public get PartialStartDTTM(): string {
    return this.PartialStartDTTMField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 6)]
  public set EndDTTM(value: Date) {
    if (!(this.EndDTTMField === value)) {
      this.EndDTTMField = value;
      //this.RaisePropertyChanged("EndDTTM");
    }
  }
  public get EndDTTM(): Date {
    return this.EndDTTMField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 7)]
  public set PrescriptionItemStatus(value: string) {
    if (!(this.PrescriptionItemStatusField === value)) {
      this.PrescriptionItemStatusField = value;
      //this.RaisePropertyChanged("PrescriptionItemStatus");
    }
  }
  public get PrescriptionItemStatus(): string {
    return this.PrescriptionItemStatusField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 8)]
  public set StatusModifedDTTM(value: Date) {
    if (!(this.StatusModifedDTTMField === value)) {
      this.StatusModifedDTTMField = value;
      //this.RaisePropertyChanged("StatusModifedDTTM");
    }
  }
  public get StatusModifedDTTM(): Date {
    return this.StatusModifedDTTMField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 9)]
  public set HealthOrganisation(value: ObjectInfo) {
    if (!(this.HealthOrganisationField === value)) {
      this.HealthOrganisationField = value;
      //this.RaisePropertyChanged("HealthOrganisation");
    }
  }
  public get HealthOrganisation(): ObjectInfo {
    return this.HealthOrganisationField;
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 10)]
  public set PrescriptionBasicData(value: Prescription) {
    if (!(this.PrescriptionBasicDataField === value)) {
      this.PrescriptionBasicDataField = value;
      //this.RaisePropertyChanged("PrescriptionBasicData");
    }
  }
  public get PrescriptionBasicData(): Prescription {
    return this.PrescriptionBasicDataField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 11)]
  public set IsControlledDrug(value: string) {
    if (!(this.IsControlledDrugField === value)) {
      this.IsControlledDrugField = value;
      //this.RaisePropertyChanged("IsControlledDrug");
    }
  }
  public get IsControlledDrug(): string {
    return this.IsControlledDrugField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 12)]
  public set CurrentDispenseStatus(value: string) {
    if (!(this.CurrentDispenseStatusField === value)) {
      this.CurrentDispenseStatusField = value;
      //this.RaisePropertyChanged("CurrentDispenseStatus");
    }
  }
  public get CurrentDispenseStatus(): string {
    return this.CurrentDispenseStatusField;
  }
}
export class PrescriptionItem extends PrescriptionItemBasicData {
  private PrescriptionNumberField: string = '';
  private PrescriptionOIDField: number = 0;
  private IsPGDField: string = '';
  private PrescriberDetailsField: ObjectInfo = new ObjectInfo();

  private CareProviderField: ObjectInfo = new ObjectInfo();

  private IsPRNDoseField: string = '';
  private SpecialtyField: string = '';

  private IsDrugApprovalRequiredField: string = '';
  private DrugApproverRoleOIDField: ArrayOfLong = new ArrayOfLong();

  private UniqueIDField: number = 0;

  private IsConflictsExistsField: string = '';
  private IsAmendmentField: string = '';
  private ReorderItemOIDField: number = 0;

  private IsNonformularyField: string = '';
  private ReplaceDrugActiveStatusField: string = '';
  private DrugVersionMatchField: string = '';
  private ReprintReasonField: string = '';

  private ClinicalNoteOIDField: string = '';

  private PPatientOIDField: number = 0;

  private HIIsAcknField: string = '';
  private HIWarngBhTypField: string = '';

  private EncounterTypeField: string = '';

  private InfusionSeqOrderField: number = 0;

  private ParentPrescriptionItemOIDField: number = 0;

  private AutoNumberField: number = 0;

  private PrescriberRoleNameField: string = '';

  private TotalSeqCountField: string = '';
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false)]
  public set PrescriptionNumber(value: string) {
    if (!(this.PrescriptionNumberField === value)) {
      this.PrescriptionNumberField = value;
      //this.RaisePropertyChanged("PrescriptionNumber");
    }
  }
  public get PrescriptionNumber(): string {
    return this.PrescriptionNumberField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true)]
  public set PrescriptionOID(value: number) {
    if (!(this.PrescriptionOIDField === value)) {
      this.PrescriptionOIDField = value;
      //this.RaisePropertyChanged("PrescriptionOID");
    }
  }
  public get PrescriptionOID(): number {
    return this.PrescriptionOIDField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 2)]
  public set IsPGD(value: string) {
    if (!(this.IsPGDField === value)) {
      this.IsPGDField = value;
      //this.RaisePropertyChanged("IsPGD");
    }
  }
  public get IsPGD(): string {
    return this.IsPGDField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 3)]
  public set PrescriberDetails(value: ObjectInfo) {
    if (!(this.PrescriberDetailsField === value)) {
      this.PrescriberDetailsField = value;
      //this.RaisePropertyChanged("PrescriberDetails");
    }
  }
  public get PrescriberDetails(): ObjectInfo {
    return this.PrescriberDetailsField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 4)]
  public set CareProvider(value: ObjectInfo) {
    if (!(this.CareProviderField === value)) {
      this.CareProviderField = value;
      //this.RaisePropertyChanged("CareProvider");
    }
  }
  public get CareProvider(): ObjectInfo {
    return this.CareProviderField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 5)]
  public set IsPRNDose(value: string) {
    if (!(this.IsPRNDoseField === value)) {
      this.IsPRNDoseField = value;
      //this.RaisePropertyChanged("IsPRNDose");
    }
  }
  public get IsPRNDose(): string {
    return this.IsPRNDoseField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 6)]
  public set Specialty(value: string) {
    if (!(this.SpecialtyField === value)) {
      this.SpecialtyField = value;
      //this.RaisePropertyChanged("Specialty");
    }
  }
  public get Specialty(): string {
    return this.SpecialtyField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 7)]
  public set IsDrugApprovalRequired(value: string) {
    if (!(this.IsDrugApprovalRequiredField === value)) {
      this.IsDrugApprovalRequiredField = value;
      //this.RaisePropertyChanged("IsDrugApprovalRequired");
    }
  }
  public get IsDrugApprovalRequired(): string {
    return this.IsDrugApprovalRequiredField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 8)]
  public set DrugApproverRoleOID(value: ArrayOfLong) {
    if (!(this.DrugApproverRoleOIDField === value)) {
      this.DrugApproverRoleOIDField = value;
      //this.RaisePropertyChanged("IsDrugApprovalRequired");
    }
  }
  public get DrugApproverRoleOID(): ArrayOfLong {
    return this.DrugApproverRoleOIDField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 9)]
  public set UniqueID(value: number) {
    if (!(this.UniqueIDField === value)) {
      this.UniqueIDField = value;
      //this.RaisePropertyChanged("UniqueID");
    }
  }
  public get UniqueID(): number {
    return this.UniqueIDField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 10)]
  public set IsConflictsExists(value: string) {
    if (!(this.IsConflictsExistsField === value)) {
      this.IsConflictsExistsField = value;
      //this.RaisePropertyChanged("IsConflictsExists");
    }
  }
  public get IsConflictsExists(): string {
    return this.IsConflictsExistsField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 11)]
  public set IsAmendment(value: string) {
    if (!(this.IsAmendmentField === value)) {
      this.IsAmendmentField = value;
      //this.RaisePropertyChanged("IsAmendment");
    }
  }
  public get IsAmendment(): string {
    return this.IsAmendmentField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 12)]
  public set ReorderItemOID(value: number) {
    if (!(this.ReorderItemOIDField === value)) {
      this.ReorderItemOIDField = value;
      //this.RaisePropertyChanged("ReorderItemOID");
    }
  }
  public get ReorderItemOID(): number {
    return this.ReorderItemOIDField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 13)]
  public set IsNonformulary(value: string) {
    if (!(this.IsNonformularyField === value)) {
      this.IsNonformularyField = value;
      //this.RaisePropertyChanged("IsNonformulary");
    }
  }
  public get IsNonformulary(): string {
    return this.IsNonformularyField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 14)]
  public set ReplaceDrugActiveStatus(value: string) {
    if (!(this.ReplaceDrugActiveStatusField === value)) {
      this.ReplaceDrugActiveStatusField = value;
      //this.RaisePropertyChanged("ReplaceDrugActiveStatus");
    }
  }
  public get ReplaceDrugActiveStatus(): string {
    return this.ReplaceDrugActiveStatusField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 15)]
  public set DrugVersionMatch(value: string) {
    if (!(this.DrugVersionMatchField === value)) {
      this.DrugVersionMatchField = value;
      //this.RaisePropertyChanged("DrugVersionMatch");
    }
  }
  public get DrugVersionMatch(): string {
    return this.DrugVersionMatchField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 16)]
  public set ReprintReason(value: string) {
    if (!(this.ReprintReasonField === value)) {
      this.ReprintReasonField = value;
      //this.RaisePropertyChanged("ReprintReason");
    }
  }
  public get ReprintReason(): string {
    return this.ReprintReasonField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 17)]
  public set ClinicalNoteOID(value: string) {
    if (!(this.ClinicalNoteOIDField === value)) {
      this.ClinicalNoteOIDField = value;
      //this.RaisePropertyChanged("ClinicalNoteOID");
    }
  }
  public get ClinicalNoteOID(): string {
    return this.ClinicalNoteOIDField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 18)]
  public set PPatientOID(value: number) {
    if (!(this.PPatientOIDField === value)) {
      this.PPatientOIDField = value;
      //this.RaisePropertyChanged("PPatientOID");
    }
  }
  public get PPatientOID(): number {
    return this.PPatientOIDField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 19)]
  public set HIIsAckn(value: string) {
    if (!(this.HIIsAcknField === value)) {
      this.HIIsAcknField = value;
      //this.RaisePropertyChanged("HIIsAckn");
    }
  }
  public get HIIsAckn(): string {
    return this.HIIsAcknField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 20)]
  public set HIWarngBhTyp(value: string) {
    if (!(this.HIWarngBhTypField === value)) {
      this.HIWarngBhTypField = value;
      //this.RaisePropertyChanged("HIWarngBhTyp");
    }
  }
  public get HIWarngBhTyp(): string {
    return this.HIWarngBhTypField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 21)]
  public set EncounterType(value: string) {
    if (!(this.EncounterTypeField === value)) {
      this.EncounterTypeField = value;
      //this.RaisePropertyChanged("EncounterType");
    }
  }
  public get EncounterType(): string {
    return this.EncounterTypeField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 22)]
  public set InfusionSeqOrder(value: number) {
    if (!(this.InfusionSeqOrderField === value)) {
      this.InfusionSeqOrderField = value;
      //this.RaisePropertyChanged("InfusionSeqOrder");
    }
  }
  public get InfusionSeqOrder(): number {
    return this.InfusionSeqOrderField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 23)]
  public set ParentPrescriptionItemOID(value: number) {
    if (!(this.ParentPrescriptionItemOIDField === value)) {
      this.ParentPrescriptionItemOIDField = value;
      //this.RaisePropertyChanged("ParentPrescriptionItemOID");
    }
  }
  public get ParentPrescriptionItemOID(): number {
    return this.ParentPrescriptionItemOIDField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 24)]
  public set AutoNumber(value: number) {
    if (!(this.AutoNumberField === value)) {
      this.AutoNumberField = value;
      //this.RaisePropertyChanged("AutoNumber");
    }
  }
  public get AutoNumber(): number {
    return this.AutoNumberField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 25)]
  public set PrescriberRoleName(value: string) {
    if (!(this.PrescriberRoleNameField === value)) {
      this.PrescriberRoleNameField = value;
      //this.RaisePropertyChanged("PrescriberRoleName");
    }
  }
  public get PrescriberRoleName(): string {
    return this.PrescriberRoleNameField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 26)]
  public set TotalSeqCount(value: string) {
    if (!(this.TotalSeqCountField === value)) {
      this.TotalSeqCountField = value;
      //this.RaisePropertyChanged("TotalSeqCount");
    }
  }
  public get TotalSeqCount(): string {
    return this.TotalSeqCountField;
  }
}

export class PrescriptionItemDetails extends PrescriptionItem {
  private BasicPropertiesField: PresItemBasicProperties =
    new PresItemBasicProperties();

  private AdditionalPropertiesField: PresItemAdditionalProperties =
    new PresItemAdditionalProperties();

  private DrugSpecificPropertiesField: PresItemDrugProperties =
    new PresItemDrugProperties();

  private FormViewParametersField: PrescriptionItemFormViewParameters =
    new PrescriptionItemFormViewParameters();

  private MultiComponentDetailsField: DrugMultiComponent[] = [];

  private LegalCatField: LegalCategory = new LegalCategory();

  private TechValidateDetailsField: TechnicalValidationInfo[] = [];

  private AdminDetailsField: PrescriptionItemAdminDetails =
    new PrescriptionItemAdminDetails();

  private WarningField: WarningDetails[] = [];

  private DoseCalculationField: DoseCalculatorDetails =
    new DoseCalculatorDetails();

  private ActionPerformedCodeField: string = '';

  private ActionPerformedField: PrescriptionItemAction =
    new PrescriptionItemAction();

  private IsMandatoryFilledField: boolean = false;

  private PrecriptionItemField: string = '';

  private OtherInformationField: string = '';

  private TrafficSymbolField: string = '';

  private CurrentUniqueIdField: string = '';
  // JKR
  private isMultiRouteCheckedField: boolean = false;

  //SK
  private SequentialActionPerformCodeField: string = '';
  private IsSeqGroupHasDifferentStationaryTypeField: boolean = false;
  private DoseFormulaDetField: DoseFormula = new DoseFormula();

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false)]
  public set BasicProperties(value: PresItemBasicProperties) {
    if (!(this.BasicPropertiesField === value)) {
      this.BasicPropertiesField = value;
      //this.RaisePropertyChanged("BasicProperties");
    }
  }
  public get BasicProperties(): PresItemBasicProperties {
    return this.BasicPropertiesField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 1)]
  public set AdditionalProperties(value: PresItemAdditionalProperties) {
    if (!(this.AdditionalPropertiesField === value)) {
      this.AdditionalPropertiesField = value;
      //this.RaisePropertyChanged("AdditionalProperties");
    }
  }
  public get AdditionalProperties(): PresItemAdditionalProperties {
    return this.AdditionalPropertiesField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 2)]
  public set DrugSpecificProperties(value: PresItemDrugProperties) {
    if (!(this.DrugSpecificPropertiesField === value)) {
      this.DrugSpecificPropertiesField = value;
      //this.RaisePropertyChanged("DrugSpecificProperties");
    }
  }
  public get DrugSpecificProperties(): PresItemDrugProperties {
    return this.DrugSpecificPropertiesField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 3)]
  public set FormViewParameters(value: PrescriptionItemFormViewParameters) {
    if (!(this.FormViewParametersField === value)) {
      this.FormViewParametersField = value;
      //this.RaisePropertyChanged("FormViewParameters");
    }
  }
  public get FormViewParameters(): PrescriptionItemFormViewParameters {
    return this.FormViewParametersField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 4)]
  public set MultiComponentDetails(value: DrugMultiComponent[]) {
    if (!(this.MultiComponentDetailsField === value)) {
      this.MultiComponentDetailsField = value;
      //this.RaisePropertyChanged("MultiComponentDetails");
    }
  }
  public get MultiComponentDetails(): DrugMultiComponent[] {
    return this.MultiComponentDetailsField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 5)]
  public set LegalCat(value: LegalCategory) {
    if (!(this.LegalCatField === value)) {
      this.LegalCatField = value;
      //this.RaisePropertyChanged("LegalCat");
    }
  }
  public get LegalCat(): LegalCategory {
    return this.LegalCatField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 6)]
  public set TechValidateDetails(value: TechnicalValidationInfo[]) {
    if (!(this.TechValidateDetailsField === value)) {
      this.TechValidateDetailsField = value;
      //this.RaisePropertyChanged("TechValidateDetails");
    }
  }
  public get TechValidateDetails(): TechnicalValidationInfo[] {
    return this.TechValidateDetailsField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 7)]
  public set AdminDetails(value: PrescriptionItemAdminDetails) {
    if (!(this.AdminDetailsField === value)) {
      this.AdminDetailsField = value;
      //this.RaisePropertyChanged("AdminDetails");
    }
  }
  public get AdminDetails(): PrescriptionItemAdminDetails {
    return this.AdminDetailsField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 8)]
  public set Warning(value: WarningDetails[]) {
    if (!(this.WarningField === value)) {
      this.WarningField = value;
      //this.RaisePropertyChanged("Warning");
    }
  }
  public get Warning(): WarningDetails[] {
    return this.WarningField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 9)]
  public set DoseCalculation(value: DoseCalculatorDetails) {
    if (!(this.DoseCalculationField === value)) {
      this.DoseCalculationField = value;
      //this.RaisePropertyChanged("DoseCalculation");
    }
  }
  public get DoseCalculation(): DoseCalculatorDetails {
    return this.DoseCalculationField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 10)]
  public set ActionPerformedCode(value: string) {
    if (!(this.ActionPerformedCodeField === value)) {
      this.ActionPerformedCodeField = value;
      //this.RaisePropertyChanged("ActionPerformedCode");
    }
  }
  public get ActionPerformedCode(): string {
    return this.ActionPerformedCodeField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 11)]
  public set ActionPerformed(value: PrescriptionItemAction) {
    if (!(this.ActionPerformedField === value)) {
      this.ActionPerformedField = value;
      //this.RaisePropertyChanged("ActionPerformed");
    }
  }
  public get ActionPerformed(): PrescriptionItemAction {
    return this.ActionPerformedField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 12)]
  public set IsMandatoryFilled(value: boolean) {
    if (!(this.IsMandatoryFilledField === value)) {
      this.IsMandatoryFilledField = value;
      //this.RaisePropertyChanged("IsMandatoryFilled");
    }
  }
  public get IsMandatoryFilled(): boolean {
    return this.IsMandatoryFilledField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 13)]
  public set PrecriptionItem(value: string) {
    if (!(this.PrecriptionItemField === value)) {
      this.PrecriptionItemField = value;
      //this.RaisePropertyChanged("PrecriptionItem");
    }
  }
  public get PrecriptionItem(): string {
    return this.PrecriptionItemField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 14)]
  public set OtherInformation(value: string) {
    if (!(this.OtherInformationField === value)) {
      this.OtherInformationField = value;
      //this.RaisePropertyChanged("OtherInformation");
    }
  }
  public get OtherInformation(): string {
    return this.OtherInformationField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 15)]
  public set TrafficSymbol(value: string) {
    if (!(this.TrafficSymbolField === value)) {
      this.TrafficSymbolField = value;
      //this.RaisePropertyChanged("TrafficSymbol");
    }
  }
  public get TrafficSymbol(): string {
    return this.TrafficSymbolField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 16)]
  public set CurrentUniqueId(value: string) {
    if (!(this.CurrentUniqueIdField === value)) {
      this.CurrentUniqueIdField = value;
      //this.RaisePropertyChanged("CurrentUniqueId");
    }
  }
  public get CurrentUniqueId(): string {
    return this.CurrentUniqueIdField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 17)]
  public set isMultiRouteChecked(value: boolean) {
    if (!(this.isMultiRouteCheckedField === value)) {
      this.isMultiRouteCheckedField = value;
      //this.RaisePropertyChanged("isMultiRouteChecked");
    }
  }
  public get isMultiRouteChecked(): boolean {
    return this.isMultiRouteCheckedField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 18)]
  public set SequentialActionPerformCode(value: string) {
    if (!(this.SequentialActionPerformCodeField === value)) {
      this.SequentialActionPerformCodeField = value;
      //this.RaisePropertyChanged("SequentialActionPerformCode");
    }
  }
  public get SequentialActionPerformCode(): string {
    return this.SequentialActionPerformCodeField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 19)]
  public set IsSeqGroupHasDifferentStationaryType(value: boolean) {
    if (!(this.IsSeqGroupHasDifferentStationaryTypeField === value)) {
      this.IsSeqGroupHasDifferentStationaryTypeField = value;
      //this.RaisePropertyChanged("IsSeqGroupHasDifferentStationaryType");
    }
  }
  public get IsSeqGroupHasDifferentStationaryType(): boolean {
    return this.IsSeqGroupHasDifferentStationaryTypeField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 20)]
  public set DoseFormulaDet(value: DoseFormula) {
    if (!(this.DoseFormulaDetField === value)) {
      this.DoseFormulaDetField = value;
      //this.RaisePropertyChanged("DoseFormulaDet");
    }
  }
  public get DoseFormulaDet(): DoseFormula {
    return this.DoseFormulaDetField;
  }
}
export class MonographInfo extends CLZOObject {
  private TypeField: string = '';

  private PathField: string = '';

  private InformationField: string = '';

  private SectionField: string = '';

  private StatusField: string = '';

  private MonographContentOIDField: number = 0;

  private SourceTypeField: string = '';

  private TypeDisplayField: string = '';
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false)]
  public set Type(value: string) {
    if (!(this.TypeField === value)) {
      this.TypeField = value;
      //this.RaisePropertyChanged("Type");
    }
  }
  public get Type(): string {
    return this.TypeField;
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 1)]

  public set Path(value: string) {
    if (!(this.PathField === value)) {
      this.PathField = value;
      //this.RaisePropertyChanged("Path");
    }
  }
  public get Path(): string {
    return this.PathField;
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 2)]
  public set Information(value: string) {
    if (!(this.InformationField === value)) {
      this.InformationField = value;
      //this.RaisePropertyChanged("Information");
    }
  }
  public get Information(): string {
    return this.InformationField;
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 3)]
  public set Section(value: string) {
    if (!(this.SectionField === value)) {
      this.SectionField = value;
      //this.RaisePropertyChanged("Section");
    }
  }
  public get Section(): string {
    return this.SectionField;
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 4)]
  public set Status(value: string) {
    if (!(this.StatusField === value)) {
      this.StatusField = value;
      //this.RaisePropertyChanged("Status");
    }
  }
  public get Status(): string {
    return this.StatusField;
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 5)]
  public set MonographContentOID(value: number) {
    if (!(this.MonographContentOIDField === value)) {
      this.MonographContentOIDField = value;
      //this.RaisePropertyChanged("MonographContentOID");
    }
  }
  public get MonographContentOID(): number {
    return this.MonographContentOIDField;
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 6)]
  public set SourceType(value: string) {
    if (!(this.SourceTypeField === value)) {
      this.SourceTypeField = value;
      //this.RaisePropertyChanged("SourceType");
    }
  }
  public get SourceType(): string {
    return this.SourceTypeField;
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 7)]
  public set TypeDisplay(value: string) {
    if (!(this.TypeDisplayField === value)) {
      this.TypeDisplayField = value;
      //this.RaisePropertyChanged("TypeDisplay");
    }
  }
  public get TypeDisplay(): string {
    return this.TypeDisplayField;
  }
}

export enum EnumSearchType {
  CONTAINS = 0,
  LEADING_WORD = 1,
  FULLY_RESOLVED = 2,
  NONE = 3,
  BEGINS_WITH = 4,
}

export enum EnumSearchCriteria {
  DRUG = 0,
  PROBLEM = 1,
  HIERARCHY = 2,
  FAVOURITES = 3,
  REQUESTSET_CARESET = 4,
  DEFAULT = 5,
  ORDERSET = 6,
}


export class PrescriptionBasicData extends CLZOObject {
  private OIDField = 0;
  private PrescriptionNumberField = '';
  private PrescriptionTypeField = '';
  private PrescriptionDTTMField: Date = new Date();
  private PatientOIDField = 0;
  private EncounterOIDField = 0;
  private SpecialtyField: ObjectInfo = new ObjectInfo();
  private PrescriberDetailsField: ObjectInfo = new ObjectInfo();
  private PrescriberRoleField: ObjectInfo = new ObjectInfo();
  private CareProviderField: ObjectInfo = new ObjectInfo();
  private PrescriptionStatusField = '';
  private IsMergedPatientField = '';

  get OID(): number {
    return this.OIDField;
  }
  set OID(value: number) {
    if (this.OIDField != value) {
      this.OIDField = value;
      // this.RaisePropertyChanged("OID");
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

  get PrescriptionType(): string {
    return this.PrescriptionTypeField;
  }
  set PrescriptionType(value: string) {
    if (this.referenceEquals(this.PrescriptionTypeField, value)) {
      this.PrescriptionTypeField = value;
      // this.RaisePropertyChanged("PrescriptionType");
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

  get PatientOID(): number {
    return this.PatientOIDField;
  }
  set PatientOID(value: number) {
    if (this.PatientOIDField != value) {
      this.PatientOIDField = value;
      // this.RaisePropertyChanged("PatientOID");
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

  get Specialty(): ObjectInfo {
    return this.SpecialtyField;
  }
  set Specialty(value: ObjectInfo) {
    if (this.referenceEquals(this.SpecialtyField, value)) {
      this.SpecialtyField = value;
      // this.RaisePropertyChanged("Specialty");
    }
  }

  get PrescriberDetails(): ObjectInfo {
    return this.PrescriberDetailsField;
  }
  set PrescriberDetails(value: ObjectInfo) {
    if (this.referenceEquals(this.PrescriberDetailsField, value)) {
      this.PrescriberDetailsField = value;
      // this.RaisePropertyChanged("PrescriberDetails");
    }
  }

  get PrescriberRole(): ObjectInfo {
    return this.PrescriberRoleField;
  }
  set PrescriberRole(value: ObjectInfo) {
    if (this.referenceEquals(this.PrescriberRoleField, value)) {
      this.PrescriberRoleField = value;
      // this.RaisePropertyChanged("PrescriberRole");
    }
  }

  get CareProvider(): ObjectInfo {
    return this.CareProviderField;
  }
  set CareProvider(value: ObjectInfo) {
    if (this.referenceEquals(this.CareProviderField, value)) {
      this.CareProviderField = value;
      // this.RaisePropertyChanged("CareProvider");
    }
  }

  get PrescriptionStatus(): string {
    return this.PrescriptionStatusField;
  }
  set PrescriptionStatus(value: string) {
    if (this.referenceEquals(this.PrescriptionStatusField, value)) {
      this.PrescriptionStatusField = value;
      // this.RaisePropertyChanged("PrescriptionStatus");
    }
  }

  get IsMergedPatient(): string {
    return this.IsMergedPatientField;
  }
  set IsMergedPatient(value: string) {
    if (this.referenceEquals(this.IsMergedPatientField, value)) {
      this.IsMergedPatientField = value;
      // this.RaisePropertyChanged("IsMergedPatient");
    }
  }
}
export class Prescription extends PrescriptionBasicData {
  private PrintStatusField = '';
  private StaioneryTypeField: ObjectInfo = new ObjectInfo();
  private ClerkingSourceField = '';
  private ServicePointField: ObjectInfo = new ObjectInfo();
  private LocationField: ObjectInfo = new ObjectInfo();
  private TeamMembersOIDField: ArrayOfLong = new ArrayOfLong();
  private IsPGDField = '';
  private HealthOrganisationField: ObjectInfo = new ObjectInfo();
  private PrescriptionAvailabilityStatusField: AvailabilityStatus[] = [];
  private PrescriptionItemsField: PrescriptionItemDetails[] = [];
  private MCVersionNoField = '';
  private TeamOIDField = 0;
  private IsIntrayField = '';
  private ChoosePrinterField = '';
  get PrintStatus(): string {
    return this.PrintStatusField;
  }
  set PrintStatus(value: string) {
    if (this.referenceEquals(this.PrintStatusField, value)) {
      this.PrintStatusField = value;
      // this.RaisePropertyChanged("PrintStatus");
    }
  }

  get StaioneryType(): ObjectInfo {
    return this.StaioneryTypeField;
  }
  set StaioneryType(value: ObjectInfo) {
    if (this.referenceEquals(this.StaioneryTypeField, value)) {
      this.StaioneryTypeField = value;
      // this.RaisePropertyChanged("StaioneryType");
    }
  }

  get ClerkingSource(): string {
    return this.ClerkingSourceField;
  }
  set ClerkingSource(value: string) {
    if (this.referenceEquals(this.ClerkingSourceField, value)) {
      this.ClerkingSourceField = value;
      // this.RaisePropertyChanged("ClerkingSource");
    }
  }

  get ServicePoint(): ObjectInfo {
    return this.ServicePointField;
  }
  set ServicePoint(value: ObjectInfo) {
    if (this.referenceEquals(this.ServicePointField, value)) {
      this.ServicePointField = value;
      // this.RaisePropertyChanged("ServicePoint");
    }
  }

  get Location(): ObjectInfo {
    return this.LocationField;
  }
  set Location(value: ObjectInfo) {
    if (this.referenceEquals(this.LocationField, value)) {
      this.LocationField = value;
      // this.RaisePropertyChanged("Location");
    }
  }
  get TeamMembersOID(): ArrayOfLong {
    return this.TeamMembersOIDField;
  }
  set TeamMembersOID(value: ArrayOfLong) {
    if (this.referenceEquals(this.TeamMembersOIDField, value)) {
      this.TeamMembersOIDField = value;
      // this.RaisePropertyChanged("TeamMembersOID");
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

  get HealthOrganisation(): ObjectInfo {
    return this.HealthOrganisationField;
  }
  set HealthOrganisation(value: ObjectInfo) {
    if (this.referenceEquals(this.HealthOrganisationField, value)) {
      this.HealthOrganisationField = value;
      // this.RaisePropertyChanged("HealthOrganisation");
    }
  }

  get PrescriptionAvailabilityStatus(): AvailabilityStatus[] {
    return this.PrescriptionAvailabilityStatusField;
  }
  set PrescriptionAvailabilityStatus(value: AvailabilityStatus[]) {
    if (this.referenceEquals(this.PrescriptionAvailabilityStatusField, value)) {
      this.PrescriptionAvailabilityStatusField = value;
      // this.RaisePropertyChanged("PrescriptionAvailabilityStatus");
    }
  }

  get PrescriptionItems(): PrescriptionItemDetails[] {
    return this.PrescriptionItemsField;
  }
  set PrescriptionItems(value: PrescriptionItemDetails[]) {
    if (this.referenceEquals(this.PrescriptionItemsField, value)) {
      this.PrescriptionItemsField = value;
      // this.RaisePropertyChanged("PrescriptionItems");
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

  get TeamOID(): number {
    return this.TeamOIDField;
  }
  set TeamOID(value: number) {
    if (this.TeamOIDField != value) {
      this.TeamOIDField = value;
      // this.RaisePropertyChanged("TeamOID");
    }
  }

  get IsIntray(): string {
    return this.IsIntrayField;
  }
  set IsIntray(value: string) {
    if (this.referenceEquals(this.IsIntrayField, value)) {
      this.IsIntrayField = value;
      // this.RaisePropertyChanged("IsIntray");
    }
  }

  get ChoosePrinter(): string {
    return this.ChoosePrinterField;
  }
  set ChoosePrinter(value: string) {
    if (this.referenceEquals(this.ChoosePrinterField, value)) {
      this.ChoosePrinterField = value;
      // this.RaisePropertyChanged("ChoosePrinter");
    }
  }
}
export class AvailabilityStatus extends CLZOObject {
  private CodeField = '';
  private StatusField = '';
  private CountField = 0;

  get Code(): string {
    return this.CodeField;
  }
  set Code(value: string) {
    if (this.referenceEquals(this.CodeField, value)) {
      this.CodeField = value;
      // this.RaisePropertyChanged("Code");
    }
  }
  get Status(): string {
    return this.StatusField;
  }
  set Status(value: string) {
    if (this.StatusField != value) {
      this.StatusField = value;
      // this.RaisePropertyChanged("Status");
    }
  }

  get Count(): number {
    return this.CountField;
  }
  set Count(value: number) {
    if (this.CountField != value) {
      this.CountField = value;
      // this.RaisePropertyChanged("Count");
    }
  }
}

export class StatusHistory extends CLZOObject {
  private ActivityField = '';
  private ActivityDateField: Date = new Date();
  private ReasonField = '';
  private RemarksField = '';
  private StatusField = '';
  private Status_TextField = '';
  private ActiveFromField: Date = new Date();
  private ActiveToField: Date = new Date();
  private OnBehalfUserOIdField = 0;
  private OnBehalfUserNameField = '';
  private OIDField = 0;

  get Activity(): string {
    return this.ActivityField;
  }
  set Activity(value: string) {
    if (this.referenceEquals(this.ActivityField, value)) {
      this.ActivityField = value;
      // this.RaisePropertyChanged("Activity");
    }
  }

  get ActivityDate(): Date {
    return this.ActivityDateField;
  }
  set ActivityDate(value: Date) {
    if (this.ActivityDateField != value) {
      this.ActivityDateField = value;
      // this.RaisePropertyChanged("ActivityDate");
    }
  }

  get Reason(): string {
    return this.ReasonField;
  }
  set Reason(value: string) {
    if (this.referenceEquals(this.ReasonField, value)) {
      this.ReasonField = value;
      // this.RaisePropertyChanged("Reason");
    }
  }

  get Remarks(): string {
    return this.RemarksField;
  }
  set Remarks(value: string) {
    if (this.referenceEquals(this.RemarksField, value)) {
      this.RemarksField = value;
      // this.RaisePropertyChanged("Remarks");
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

  get Status_Text(): string {
    return this.Status_TextField;
  }
  set Status_Text(value: string) {
    if (this.referenceEquals(this.Status_TextField, value)) {
      this.Status_TextField = value;
      // this.RaisePropertyChanged("Status_Text");
    }
  }

  get ActiveFrom(): Date {
    return this.ActiveFromField;
  }
  set ActiveFrom(value: Date) {
    if (this.ActiveFromField != value) {
      this.ActiveFromField = value;
      // this.RaisePropertyChanged("ActiveFrom");
    }
  }

  get ActiveTo(): Date {
    return this.ActiveToField;
  }
  set ActiveTo(value: Date) {
    if (this.ActiveToField != value) {
      this.ActiveToField = value;
      // this.RaisePropertyChanged("ActiveTo");
    }
  }

  get OnBehalfUserOId(): number {
    return this.OnBehalfUserOIdField;
  }
  set OnBehalfUserOId(value: number) {
    if (this.OnBehalfUserOIdField != value) {
      this.OnBehalfUserOIdField = value;
      // this.RaisePropertyChanged("OnBehalfUserOId");
    }
  }

  get OnBehalfUserName(): string {
    return this.OnBehalfUserNameField;
  }
  set OnBehalfUserName(value: string) {
    if (this.referenceEquals(this.OnBehalfUserNameField, value)) {
      this.OnBehalfUserNameField = value;
      // this.RaisePropertyChanged("OnBehalfUserName");
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
}
export class PrescribeItemStatus extends StatusHistory {
  private ReplacementItemsField: PrescribeItemBase[] = [];

  get ReplacementItems(): PrescribeItemBase[] {
    return this.ReplacementItemsField;
  }
  set ReplacementItems(value: PrescribeItemBase[]) {
    if (JSON.stringify(this.ReplacementItemsField) != JSON.stringify(value)) {
      this.ReplacementItemsField = value;
      // this.RaisePropertyChanged("ReplacementItems");
    }
  }
}
export class PresItemRequestDetails extends CLZOObject {
  private StatusField = '';
  private ResponseDTTMField: Date = new Date();
  private NameField = '';
  private ReasonField = '';
  private LocationnameField = '';
  private DispensedDrugNameField = '';
  private ServicenameField = '';

  get Status(): string {
    return this.StatusField;
  }
  set Status(value: string) {
    if (this.referenceEquals(this.StatusField, value)) {
      this.StatusField = value;
      // this.RaisePropertyChanged("Status");
    }
  }

  get ResponseDTTM(): Date {
    return this.ResponseDTTMField;
  }
  set ResponseDTTM(value: Date) {
    this.ResponseDTTMField = value;
    // this.RaisePropertyChanged("ResponseDTTM");
  }

  get Name(): string {
    return this.NameField;
  }
  set Name(value: string) {
    if (this.referenceEquals(this.NameField, value)) {
      this.NameField = value;
      // this.RaisePropertyChanged("Name");
    }
  }

  get Reason(): string {
    return this.ReasonField;
  }
  set Reason(value: string) {
    if (this.referenceEquals(this.ReasonField, value)) {
      this.ReasonField = value;
      // this.RaisePropertyChanged("Reason");
    }
  }

  get Locationname(): string {
    return this.LocationnameField;
  }
  set Locationname(value: string) {
    if (this.referenceEquals(this.LocationnameField, value)) {
      this.LocationnameField = value;
      // this.RaisePropertyChanged("Locationname");
    }
  }

  get DispensedDrugName(): string {
    return this.DispensedDrugNameField;
  }
  set DispensedDrugName(value: string) {
    if (this.referenceEquals(this.DispensedDrugNameField, value)) {
      this.DispensedDrugNameField = value;
      // this.RaisePropertyChanged("DispensedDrugName");
    }
  }

  get Servicename(): string {
    return this.ServicenameField;
  }
  set Servicename(value: string) {
    if (this.referenceEquals(this.ServicenameField, value)) {
      this.ServicenameField = value;
      // this.RaisePropertyChanged("Servicename");
    }
  }
}

export class ProcessingInfo extends CLZOObject {
  private IdentifyingOIDField = 0;
  private IdentifyingNameField = '';
  private IdentifyingTypeField = '';
  private ProcessOIDField = 0;
  private MUIFlagField = '';
  private ONFlagField = '';
  private NameField = '';
  private AccessConstraintField = '';
  private IndicationField: Indication[] = [];
  private RouteField: Route = new Route();
  private SiteField = '';
  private FormField: Form = new Form();
  private DoseTypeField = '';
  private DoseValueField = '';
  private MaxDoseValueField = '';
  private DoseUOMField: UOM = new UOM();
  private DoseDetailsField: DoseDetails[] = [];
  private McVersionField = '';
  private FrequencyField: Frequency = new Frequency();
  private DurationField = 0;
  private DurationCodeField = '';
  private PeriodField = '';
  private QuantityField = 0;
  private QuantityUOMField: UOM = new UOM();
  private AdminInstructionField = '';
  private AdminInstructionNameField = '';
  private SupplyInstructionField = '';
  private StationaryField = '';
  private StationaryTextField = '';
  private IsDefaultField = '';
  private MandatoryFieldsField: ArrayOfString = new ArrayOfString();
  private StatusField = '';
  private DoseFormulaField: DoseFormula = new DoseFormula();
  private ProcessingOIDField = 0;
  private ProcessingIdenOIDField = 0;
  private DisplaySeqNumField = 0;
  private AdminMethodField: AdminMethod = new AdminMethod();
  private AdmininField: AdminInstruction[] = [];
  private AdminDeviceField = '';
  private ObserveResultField = '';
  private StationaryPField: Stationary = new Stationary();
  private DrugRouteField: Route[] = [];
  private DrugFormField: Form[] = [];
  private DrugSiteField: Site[] = [];
  private DrugStationaryField: Stationary[] = [];
  private SourceDataProviderTypeField = '';
  private StrengthField = '';
  private StrengthUOMField: UOM = new UOM();
  private LorenzoIDField = '';
  private NoOfInstalmentField = 0;
  private InstalInstructionField = '';
  private InstalmentIntervalField = 0;
  private ItervalUOMField: UOM = new UOM();
  private PRNField = '';
  private AddtionlCommentsField = '';
  private SiteNameField = '';
  private AdminInstructionOIDField = 0;
  private DrugProperyField: DrugProperty[] = [];
  private SupplyQtyUOMField: UOM[] = [];
  private IsCopyFavField = '';
  private IsSwapField = '';
  private FrequencyListField: Frequency[] = [];
  private UOMListField: UOM[] = [];

  get IdentifyingOID(): number {
    return this.IdentifyingOIDField;
  }
  set IdentifyingOID(value: number) {
    if (this.IdentifyingOIDField != value) {
      this.IdentifyingOIDField = value;
      // this.RaisePropertyChanged("IdentifyingOID");
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

  get IdentifyingType(): string {
    return this.IdentifyingTypeField;
  }
  set IdentifyingType(value: string) {
    if (this.referenceEquals(this.IdentifyingTypeField, value)) {
      this.IdentifyingTypeField = value;
      // this.RaisePropertyChanged("IdentifyingType");
    }
  }

  get ProcessOID(): number {
    return this.ProcessOIDField;
  }
  set ProcessOID(value: number) {
    if (this.ProcessOIDField != value) {
      this.ProcessOIDField = value;
      // this.RaisePropertyChanged("ProcessOID");
    }
  }

  get MUIFlag(): string {
    return this.MUIFlagField;
  }
  set MUIFlag(value: string) {
    if (this.referenceEquals(this.MUIFlagField, value)) {
      this.MUIFlagField = value;
      // this.RaisePropertyChanged("MUIFlag");
    }
  }

  get ONFlag(): string {
    return this.ONFlagField;
  }
  set ONFlag(value: string) {
    if (this.referenceEquals(this.ONFlagField, value)) {
      this.ONFlagField = value;
      // this.RaisePropertyChanged("ONFlag");
    }
  }

  get Name(): string {
    return this.NameField;
  }
  set Name(value: string) {
    if (this.referenceEquals(this.NameField, value)) {
      this.NameField = value;
      // this.RaisePropertyChanged("Name");
    }
  }

  get AccessConstraint(): string {
    return this.AccessConstraintField;
  }
  set AccessConstraint(value: string) {
    if (this.referenceEquals(this.AccessConstraintField, value)) {
      this.AccessConstraintField = value;
      // this.RaisePropertyChanged("AccessConstraint");
    }
  }

  get Indication(): Indication[] {
    return this.IndicationField;
  }
  set Indication(value: Indication[]) {
    if (this.referenceEquals(this.IndicationField, value)) {
      this.IndicationField = value;
      // this.RaisePropertyChanged("Indication");
    }
  }

  get Route(): Route {
    return this.RouteField;
  }
  set Route(value: Route) {
    if (this.referenceEquals(this.RouteField, value)) {
      this.RouteField = value;
      // this.RaisePropertyChanged("Route");
    }
  }

  get Site(): string {
    return this.SiteField;
  }
  set Site(value: string) {
    if (this.referenceEquals(this.SiteField, value)) {
      this.SiteField = value;
      // this.RaisePropertyChanged("Site");
    }
  }

  get Form(): Form {
    return this.FormField;
  }
  set Form(value: Form) {
    if (this.referenceEquals(this.FormField, value)) {
      this.FormField = value;
      // this.RaisePropertyChanged("Form");
    }
  }

  get DoseType(): string {
    return this.DoseTypeField;
  }
  set DoseType(value: string) {
    if (this.referenceEquals(this.DoseTypeField, value)) {
      this.DoseTypeField = value;
      // this.RaisePropertyChanged("DoseType");
    }
  }
  get DoseValue(): string {
    return this.DoseValueField;
  }
  set DoseValue(value: string) {
    if (this.referenceEquals(this.DoseValueField, value)) {
      this.DoseValueField = value;
      // this.RaisePropertyChanged("DoseValue");
    }
  }

  get MaxDoseValue(): string {
    return this.MaxDoseValueField;
  }
  set MaxDoseValue(value: string) {
    if (this.referenceEquals(this.MaxDoseValueField, value)) {
      this.MaxDoseValueField = value;
      // this.RaisePropertyChanged("MaxDoseValue");
    }
  }

  get DoseUOM(): UOM {
    return this.DoseUOMField;
  }
  set DoseUOM(value: UOM) {
    if (this.referenceEquals(this.DoseUOMField, value)) {
      this.DoseUOMField = value;
      // this.RaisePropertyChanged("DoseUOM");
    }
  }

  get DoseDetails(): DoseDetails[] {
    return this.DoseDetailsField;
  }
  set DoseDetails(value: DoseDetails[]) {
    if (this.referenceEquals(this.DoseDetailsField, value)) {
      this.DoseDetailsField = value;
      // this.RaisePropertyChanged("DoseDetails");
    }
  }

  get McVersion(): string {
    return this.McVersionField;
  }
  set McVersion(value: string) {
    if (this.referenceEquals(this.McVersionField, value)) {
      this.McVersionField = value;
      // this.RaisePropertyChanged("McVersion");
    }
  }

  get Frequency(): Frequency {
    return this.FrequencyField;
  }
  set Frequency(value: Frequency) {
    if (this.referenceEquals(this.FrequencyField, value)) {
      this.FrequencyField = value;
      // this.RaisePropertyChanged("Frequency");
    }
  }

  get Duration(): number {
    return this.DurationField;
  }
  set Duration(value: number) {
    if (this.DurationField != value) {
      this.DurationField = value;
      // this.RaisePropertyChanged("Duration");
    }
  }

  get DurationCode(): string {
    return this.DurationCodeField;
  }
  set DurationCode(value: string) {
    if (this.referenceEquals(this.DurationCodeField, value)) {
      this.DurationCodeField = value;
      // this.RaisePropertyChanged("DurationCode");
    }
  }

  get Period(): string {
    return this.PeriodField;
  }
  set Period(value: string) {
    if (this.referenceEquals(this.PeriodField, value)) {
      this.PeriodField = value;
      // this.RaisePropertyChanged("Period");
    }
  }

  get Quantity(): number {
    return this.QuantityField;
  }
  set Quantity(value: number) {
    if (this.QuantityField != value) {
      this.QuantityField = value;
      // this.RaisePropertyChanged("Quantity");
    }
  }

  get QuantityUOM(): UOM {
    return this.QuantityUOMField;
  }
  set QuantityUOM(value: UOM) {
    if (this.referenceEquals(this.QuantityUOMField, value)) {
      this.QuantityUOMField = value;
      // this.RaisePropertyChanged("QuantityUOM");
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

  get AdminInstructionName(): string {
    return this.AdminInstructionNameField;
  }
  set AdminInstructionName(value: string) {
    if (this.referenceEquals(this.AdminInstructionNameField, value)) {
      this.AdminInstructionNameField = value;
      // this.RaisePropertyChanged("AdminInstructionName");
    }
  }

  get SupplyInstruction(): string {
    return this.SupplyInstructionField;
  }
  set SupplyInstruction(value: string) {
    if (this.referenceEquals(this.SupplyInstructionField, value)) {
      this.SupplyInstructionField = value;
      // this.RaisePropertyChanged("SupplyInstruction");
    }
  }

  get Stationary(): string {
    return this.StationaryField;
  }
  set Stationary(value: string) {
    if (this.referenceEquals(this.StationaryField, value)) {
      this.StationaryField = value;
      // this.RaisePropertyChanged("Stationary");
    }
  }

  get StationaryText(): string {
    return this.StationaryTextField;
  }
  set StationaryText(value: string) {
    if (this.referenceEquals(this.StationaryTextField, value)) {
      this.StationaryTextField = value;
      // this.RaisePropertyChanged("StationaryText");
    }
  }

  get IsDefault(): string {
    return this.IsDefaultField;
  }
  set IsDefault(value: string) {
    if (this.referenceEquals(this.IsDefaultField, value)) {
      this.IsDefaultField = value;
      // this.RaisePropertyChanged("IsDefault");
    }
  }

  get MandatoryFields(): ArrayOfString {
    return this.MandatoryFieldsField;
  }
  set MandatoryFields(value: ArrayOfString) {
    if (this.referenceEquals(this.MandatoryFieldsField, value)) {
      this.MandatoryFieldsField = value;
      // this.RaisePropertyChanged("MandatoryFields");
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

  get DoseFormula(): DoseFormula {
    return this.DoseFormulaField;
  }
  set DoseFormula(value: DoseFormula) {
    if (this.referenceEquals(this.DoseFormulaField, value)) {
      this.DoseFormulaField = value;
      // this.RaisePropertyChanged("DoseFormula");
    }
  }

  get ProcessingOID(): number {
    return this.ProcessingOIDField;
  }
  set ProcessingOID(value: number) {
    if (this.ProcessingOIDField != value) {
      this.ProcessingOIDField = value;
      // this.RaisePropertyChanged("ProcessingOID");
    }
  }

  get ProcessingIdenOID(): number {
    return this.ProcessingIdenOIDField;
  }
  set ProcessingIdenOID(value: number) {
    if (this.ProcessingIdenOIDField != value) {
      this.ProcessingIdenOIDField = value;
      // this.RaisePropertyChanged("ProcessingIdenOID");
    }
  }

  get DisplaySeqNum(): number {
    return this.DisplaySeqNumField;
  }
  set DisplaySeqNum(value: number) {
    if (this.DisplaySeqNumField != value) {
      this.DisplaySeqNumField = value;
      // this.RaisePropertyChanged("DisplaySeqNum");
    }
  }

  get AdminMethod(): AdminMethod {
    return this.AdminMethodField;
  }
  set AdminMethod(value: AdminMethod) {
    if (this.referenceEquals(this.AdminMethodField, value)) {
      this.AdminMethodField = value;
      // this.RaisePropertyChanged("AdminMethod");
    }
  }

  get Adminin(): AdminInstruction[] {
    return this.AdmininField;
  }
  set Adminin(value: AdminInstruction[]) {
    if (this.referenceEquals(this.AdmininField, value)) {
      this.AdmininField = value;
      // this.RaisePropertyChanged("Adminin");
    }
  }

  get AdminDevice(): string {
    return this.AdminDeviceField;
  }
  set AdminDevice(value: string) {
    if (this.referenceEquals(this.AdminDeviceField, value)) {
      this.AdminDeviceField = value;
      // this.RaisePropertyChanged("AdminDevice");
    }
  }

  get ObserveResult(): string {
    return this.ObserveResultField;
  }
  set ObserveResult(value: string) {
    if (this.referenceEquals(this.ObserveResultField, value)) {
      this.ObserveResultField = value;
      // this.RaisePropertyChanged("ObserveResult");
    }
  }

  get StationaryP(): Stationary {
    return this.StationaryPField;
  }
  set StationaryP(value: Stationary) {
    if (this.referenceEquals(this.StationaryPField, value)) {
      this.StationaryPField = value;
      // this.RaisePropertyChanged("StationaryP");
    }
  }

  get DrugRoute(): Route[] {
    return this.DrugRouteField;
  }
  set DrugRoute(value: Route[]) {
    if (this.referenceEquals(this.DrugRouteField, value)) {
      this.DrugRouteField = value;
      // this.RaisePropertyChanged("DrugRoute");
    }
  }

  get DrugForm(): Form[] {
    return this.DrugFormField;
  }
  set DrugForm(value: Form[]) {
    if (this.referenceEquals(this.DrugFormField, value)) {
      this.DrugFormField = value;
      // this.RaisePropertyChanged("DrugForm");
    }
  }

  get DrugSite(): Site[] {
    return this.DrugSiteField;
  }
  set DrugSite(value: Site[]) {
    if (this.referenceEquals(this.DrugSiteField, value)) {
      this.DrugSiteField = value;
      // this.RaisePropertyChanged("DrugSite");
    }
  }

  get DrugStationary(): Stationary[] {
    return this.DrugStationaryField;
  }
  set DrugStationary(value: Stationary[]) {
    if (this.referenceEquals(this.DrugStationaryField, value)) {
      this.DrugStationaryField = value;
      // this.RaisePropertyChanged("DrugStationary");
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

  get Strength(): string {
    return this.StrengthField;
  }
  set Strength(value: string) {
    if (this.referenceEquals(this.StrengthField, value)) {
      this.StrengthField = value;
      // this.RaisePropertyChanged("Strength");
    }
  }

  get StrengthUOM(): UOM {
    return this.StrengthUOMField;
  }
  set StrengthUOM(value: UOM) {
    if (this.referenceEquals(this.StrengthUOMField, value)) {
      this.StrengthUOMField = value;
      // this.RaisePropertyChanged("StrengthUOM");
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

  get NoOfInstalment(): number {
    return this.NoOfInstalmentField;
  }
  set NoOfInstalment(value: number) {
    if (this.NoOfInstalmentField != value) {
      this.NoOfInstalmentField = value;
      // this.RaisePropertyChanged("NoOfInstalment");
    }
  }

  get InstalInstruction(): string {
    return this.InstalInstructionField;
  }
  set InstalInstruction(value: string) {
    if (this.referenceEquals(this.InstalInstructionField, value) != true) {
      this.InstalInstructionField = value;
      // this.RaisePropertyChanged("InstalInstruction");
    }
  }

  get InstalmentInterval(): number {
    return this.InstalmentIntervalField;
  }
  set InstalmentInterval(value: number) {
    if (this.InstalmentIntervalField != value) {
      this.InstalmentIntervalField = value;
      // this.RaisePropertyChanged("InstalmentInterval");
    }
  }

  get ItervalUOM(): UOM {
    return this.ItervalUOMField;
  }
  set ItervalUOM(value: UOM) {
    if (this.referenceEquals(this.ItervalUOMField, value)) {
      this.ItervalUOMField = value;
      // this.RaisePropertyChanged("ItervalUOM");
    }
  }

  get PRN(): string {
    return this.PRNField;
  }
  set PRN(value: string) {
    if (this.referenceEquals(this.PRNField, value)) {
      this.PRNField = value;
      // this.RaisePropertyChanged("PRN");
    }
  }

  get AddtionlComments(): string {
    return this.AddtionlCommentsField;
  }
  set AddtionlComments(value: string) {
    if (this.referenceEquals(this.AddtionlCommentsField, value)) {
      this.AddtionlCommentsField = value;
      // this.RaisePropertyChanged("AddtionlComments");
    }
  }

  get SiteName(): string {
    return this.SiteNameField;
  }
  set SiteName(value: string) {
    if (this.referenceEquals(this.SiteNameField, value)) {
      this.SiteNameField = value;
      // this.RaisePropertyChanged("SiteName");
    }
  }

  get AdminInstructionOID(): number {
    return this.AdminInstructionOIDField;
  }
  set AdminInstructionOID(value: number) {
    if (this.AdminInstructionOIDField != value) {
      this.AdminInstructionOIDField = value;
      // this.RaisePropertyChanged("AdminInstructionOID");
    }
  }

  get DrugPropery(): DrugProperty[] {
    return this.DrugProperyField;
  }
  set DrugPropery(value: DrugProperty[]) {
    if (this.referenceEquals(this.DrugProperyField, value)) {
      this.DrugProperyField = value;
      // this.RaisePropertyChanged("DrugPropery");
    }
  }

  get SupplyQtyUOM(): UOM[] {
    return this.SupplyQtyUOMField;
  }
  set SupplyQtyUOM(value: UOM[]) {
    if (this.referenceEquals(this.SupplyQtyUOMField, value)) {
      this.SupplyQtyUOMField = value;
      // this.RaisePropertyChanged("SupplyQtyUOM");
    }
  }

  get IsCopyFav(): string {
    return this.IsCopyFavField;
  }
  set IsCopyFav(value: string) {
    if (this.referenceEquals(this.IsCopyFavField, value)) {
      this.IsCopyFavField = value;
      // this.RaisePropertyChanged("IsCopyFav");
    }
  }
  get IsSwap(): string {
    return this.IsSwapField;
  }
  set IsSwap(value: string) {
    if (this.referenceEquals(this.IsSwapField, value)) {
      this.IsSwapField = value;
      // this.RaisePropertyChanged("IsSwap");
    }
  }

  get FrequencyList(): Frequency[] {
    return this.FrequencyListField;
  }
  set FrequencyList(value: Frequency[]) {
    if (this.referenceEquals(this.FrequencyListField, value)) {
      this.FrequencyListField = value;
      // this.RaisePropertyChanged("FrequencyList");
    }
  }

  get UOMList(): UOM[] {
    return this.UOMListField;
  }
  set UOMList(value: UOM[]) {
    if (this.referenceEquals(this.UOMListField, value)) {
      this.UOMListField = value;
      // this.RaisePropertyChanged("UOMList");
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
  private PerformedOnField: Date = new Date();
  private MessageFormatField: MessageFormat = new MessageFormat();
  private PrescriptionItemField: ObjectInfo = new ObjectInfo();
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

  get WarningOID(): number {
    return this.WarningOIDField;
  }
  set WarningOID(value: number) {
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

  get MessageFormat(): MessageFormat {
    return this.MessageFormatField;
  }
  set MessageFormat(value: MessageFormat) {
    if (this.referenceEquals(this.MessageFormatField, value)) {
      this.MessageFormatField = value;
      // this.RaisePropertyChanged("MessageFormat");
    }
  }

  get PrescriptionItem(): ObjectInfo {
    return this.PrescriptionItemField;
  }
  set PrescriptionItem(value: ObjectInfo) {
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
    if (this.referenceEquals(this.IsSealField, value) != true) {
      this.IsSealField = value;
      // this.RaisePropertyChanged("IsSeal");
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
    if ((this.RouteIdField != (value))) {
      this.RouteIdField = value;
      // this.RaisePropertyChanged("RouteId");
    }
  }

  get RouteName(): string {
    return this.RouteNameField;
  }
  set RouteName(value: string) {
    if ((this.referenceEquals(this.RouteNameField, value))) {
      this.RouteNameField = value;
      // this.RaisePropertyChanged("RouteName");
    }
  }

  get Status(): string {
    return this.StatusField;
  }
  set Status(value: string) {
    if ((this.referenceEquals(this.StatusField, value))) {
      this.StatusField = value;
      // this.RaisePropertyChanged("Status");
    }
  }

  get MCVersionNumber(): string {
    return this.MCVersionNumberField;
  }
  set MCVersionNumber(value: string) {
    if ((this.referenceEquals(this.MCVersionNumberField, value))) {
      this.MCVersionNumberField = value;
      // this.RaisePropertyChanged("MCVersionNumber");
    }
  }

  get bInfusion(): string {
    return this.bInfusionField;
  }
  set bInfusion(value: string) {
    if ((this.referenceEquals(this.bInfusionField, value))) {
      this.bInfusionField = value;
      // this.RaisePropertyChanged("bInfusion");
    }
  }

  get IsProhibited(): boolean {
    return this.IsProhibitedField;
  }
  set IsProhibited(value: boolean) {
    if ((this.IsProhibitedField != (value))) {
      this.IsProhibitedField = value;
      // this.RaisePropertyChanged("IsProhibited");
    }
  }

  get DataProvider(): string {
    return this.DataProviderField;
  }
  set DataProvider(value: string) {
    if ((this.referenceEquals(this.DataProviderField, value))) {
      this.DataProviderField = value;
      // this.RaisePropertyChanged("DataProvider");
    }
  }

  get PageIndex(): number {
    return this.PageIndexField;
  }
  set PageIndex(value: number) {
    if ((this.PageIndexField != (value))) {
      this.PageIndexField = value;
      // this.RaisePropertyChanged("PageIndex");
    }
  }

  get IsStrengthReqd(): string {
    return this.IsStrengthReqdField;
  }
  set IsStrengthReqd(value: string) {
    if ((this.referenceEquals(this.IsStrengthReqdField, value))) {
      this.IsStrengthReqdField = value;
      // this.RaisePropertyChanged("IsStrengthReqd");
    }
  }

  get nPageNo(): number {
    return this.nPageNoField;
  }
  set nPageNo(value: number) {
    if ((this.nPageNoField != (value))) {
      this.nPageNoField = value;
      // this.RaisePropertyChanged("nPageNo");
    }
  }

  get nPageSize(): number {
    return this.nPageSizeField;
  }
  set nPageSize(value: number) {
    if ((this.nPageSizeField != (value))) {
      this.nPageSizeField = value;
      // this.RaisePropertyChanged("nPageSize");
    }
  }

  get nMAXRows(): number {
    return this.nMAXRowsField;
  }
  set nMAXRows(value: number) {
    if ((this.nMAXRowsField != (value))) {
      this.nMAXRowsField = value;
      // this.RaisePropertyChanged("nMAXRows");
    }
  }
}

export class Form extends CLZOObject {

  private FormIdField = 0;

  private FormNameField = '';

  private LorenzoIDField = '';

  get FormId(): number {
    return this.FormIdField;
  }
  set FormId(value: number) {
    if ((this.FormIdField != (value))) {
      this.FormIdField = value;
      // this.RaisePropertyChanged("FormId");
    }
  }

  get FormName(): string {
    return this.FormNameField;
  }
  set FormName(value: string) {
    if ((this.referenceEquals(this.FormNameField, value))) {
      this.FormNameField = value;
      // this.RaisePropertyChanged("FormName");
    }
  }
  get LorenzoID(): string {
    return this.LorenzoIDField;
  }
  set LorenzoID(value: string) {
    if ((this.referenceEquals(this.LorenzoIDField, value))) {
      this.LorenzoIDField = value;
      // this.RaisePropertyChanged("LorenzoID");
    }
  }
}

export class AdminInstruction extends CLZOObject {
  private DAOIDField = 0;
  private AdminInstructionIDField = 0;
  private AdminInstructionNameField = '';
  private StatusField = '';
  private MCVersionNumberField = '';

  get DAOID(): number {
    return this.DAOIDField;
  }
  set DAOID(value: number) {
    if ((this.DAOIDField != (value))) {
      this.DAOIDField = value;
      // this.RaisePropertyChanged("DAOID");
    }
  }

  get AdminInstructionID(): number {
    return this.AdminInstructionIDField;
  }
  set AdminInstructionID(value: number) {
    if ((this.AdminInstructionIDField != (value))) {
      this.AdminInstructionIDField = value;
      // this.RaisePropertyChanged("AdminInstructionID");
    }
  }

  get AdminInstructionName(): string {
    return this.AdminInstructionNameField;
  }
  set AdminInstructionName(value: string) {
    if ((this.referenceEquals(this.AdminInstructionNameField, value))) {
      this.AdminInstructionNameField = value;
      // this.RaisePropertyChanged("AdminInstructionName");
    }
  }

  get Status(): string {
    return this.StatusField;
  }
  set Status(value: string) {
    if ((this.referenceEquals(this.StatusField, value))) {
      this.StatusField = value;
      // this.RaisePropertyChanged("Status");
    }
  }

  get MCVersionNumber(): string {
    return this.MCVersionNumberField;
  }
  set MCVersionNumber(value: string) {
    if ((this.referenceEquals(this.MCVersionNumberField, value))) {
      this.MCVersionNumberField = value;
      // this.RaisePropertyChanged("MCVersionNumber");
    }
  }

}

export class Stationary extends CLZOObject {

  private StationaryOIDField = 0;
  private StationaryNameField = '';
  private StationaryHOrgIDField = 0;
  private DataProviderField = '';

  get StationaryOID(): number {
    return this.StationaryOIDField;
  }
  set StationaryOID(value: number) {
    if ((this.StationaryOIDField != (value))) {
      this.StationaryOIDField = value;
      // this.RaisePropertyChanged("StationaryOID");
    }
  }

  get StationaryName(): string {
    return this.StationaryNameField;
  }
  set StationaryName(value: string) {
    if ((this.referenceEquals(this.StationaryNameField, value))) {
      this.StationaryNameField = value;
      // this.RaisePropertyChanged("StationaryName");
    }
  }

  get StationaryHOrgID(): number {
    return this.StationaryHOrgIDField;
  }
  set StationaryHOrgID(value: number) {
    if ((this.StationaryHOrgIDField != (value))) {
      this.StationaryHOrgIDField = value;
      // this.RaisePropertyChanged("StationaryHOrgID");
    }
  }

  get DataProvider(): string {
    return this.DataProviderField;
  }
  set DataProvider(value: string) {
    if ((this.referenceEquals(this.DataProviderField, value))) {
      this.DataProviderField = value;
      // this.RaisePropertyChanged("DataProvider");
    }
  }
}

export class MessageFormat extends CLZOObject {

  private FirstMessageField = '';
  private SecondMessageField = '';
  private ThirdMessageField = '';
  private FourthMessageField = '';
  private FifthMessageField = '';
  private SixthMessageField = '';

  get FirstMessage(): string {
    return this.FirstMessageField;
  }
  set FirstMessage(value: string) {
    if ((this.referenceEquals(this.FirstMessageField, value))) {
      this.FirstMessageField = value;
      // this.RaisePropertyChanged("FirstMessage");
    }
  }

  get SecondMessage(): string {
    return this.SecondMessageField;
  }
  set SecondMessage(value: string) {
    if ((this.referenceEquals(this.SecondMessageField, value))) {
      this.SecondMessageField = value;
      // this.RaisePropertyChanged("SecondMessage");
    }
  }

  get ThirdMessage(): string {
    return this.ThirdMessageField;
  }
  set ThirdMessage(value: string) {
    if ((this.referenceEquals(this.ThirdMessageField, value))) {
      this.ThirdMessageField = value;
      // this.RaisePropertyChanged("ThirdMessage");
    }
  }

  get FourthMessage(): string {
    return this.FourthMessageField;
  }
  set FourthMessage(value: string) {
    if ((this.referenceEquals(this.FourthMessageField, value))) {
      this.FourthMessageField = value;
      // this.RaisePropertyChanged("FourthMessage");
    }
  }

  get FifthMessage(): string {
    return this.FifthMessageField;
  }
  set FifthMessage(value: string) {
    if ((this.referenceEquals(this.FifthMessageField, value))) {
      this.FifthMessageField = value;
      // this.RaisePropertyChanged("FifthMessage");
    }
  }

  get SixthMessage(): string {
    return this.SixthMessageField;
  }
  set SixthMessage(value: string) {
    if ((this.referenceEquals(this.SixthMessageField, value))) {
      this.SixthMessageField = value;
      // this.RaisePropertyChanged("SixthMessage");
    }
  }
}

export class PresItemCommonProperties extends CLZOObject {
  private ItemTypeField: string = "";
  private ItemSubTypeField: string = "";
  private TreatmentToContField: ObjectInfo = new ObjectInfo();
  private AdminInstructionField: ObjectInfo = new ObjectInfo();
  private DispensingInstructionField: ObjectInfo[] = [];
  private SupplyInstructionField: ObjectInfo[] = [];
  private SupplementItemsField: ObjectInfo[] = [];
  private LegalCategoryField: ObjectInfo = new ObjectInfo();
  private RouteField: ObjectInfo = new ObjectInfo();
  private FormField: ObjectInfo = new ObjectInfo();
  private StatusflagsField!: StatusFlags;
  private DrugPropertiesField: DrugProperty[] = [];
  private IsControlledDrugField = "";
  private OtherDispensingInstructionField = "";
  private OtherAdminInstructionField = "";
  private IdentifyingDomainField = "";
  private AdminIdentifyingDomainField = "";
  private TechSupplyInstructionField = "";
  public get ItemType(): string {
    return this.ItemTypeField;
  }
  public set ItemType(value: string) {
    if ((this.referenceEquals(this.ItemTypeField, value))) {
      this.ItemTypeField = value;
      //  this.RaisePropertyChanged("ItemType");
    }
  }

  public get TreatmentToCont(): ObjectInfo {
    return this.TreatmentToContField;
  }
  public set TreatmentToCont(value: ObjectInfo) {
    if ((this.referenceEquals(this.TreatmentToContField, value))) {
      this.TreatmentToContField = value;
      //  this.RaisePropertyChanged("TreatmentToCont");
    }
  }
  public get AdminInstruction(): ObjectInfo {
    return this.AdminInstructionField;
  }
  public set AdminInstruction(value: ObjectInfo) {
    if ((this.referenceEquals(this.AdminInstructionField, value))) {
      this.AdminInstructionField = value;
      // this.RaisePropertyChanged("AdminInstruction");
    }
  }
   get DispensingInstruction(): ObjectInfo[] {
    return this.DispensingInstructionField;
  }
  set DispensingInstruction(value: ObjectInfo[]) {
    if (this.referenceEquals(this.DispensingInstructionField, value)) {
      this.DispensingInstructionField = value;
      //this.RaisePropertyChanged("DispensingInstruction");
    }
  }
   get SupplyInstruction(): ObjectInfo[] {
    return this.SupplyInstructionField;
  }
  set SupplyInstruction(value: ObjectInfo[]) {
    if ((this.referenceEquals(this.SupplyInstructionField, value))) {
      this.SupplyInstructionField = value;
      // this.RaisePropertyChanged("SupplyInstruction");
    }
  }
  public get SupplementItems(): ObjectInfo[] {
    return this.SupplementItemsField;
  }
  public set SupplementItems(value: ObjectInfo[]) {
    if ((this.referenceEquals(this.SupplementItemsField, value))) {
      this.SupplementItemsField = value;
      // this.RaisePropertyChanged("SupplementItems");
    }
  }
  public get LegalCategory(): ObjectInfo {
    return this.LegalCategoryField;
  }
  public set LegalCategory(value: ObjectInfo) {
    if ((this.referenceEquals(this.LegalCategoryField, value))) {
      this.LegalCategoryField = value;
      // this.RaisePropertyChanged("LegalCategory");
    }
  }
  public get Route(): ObjectInfo {
    return this.RouteField;
  }
  public set Route(value: ObjectInfo) {
    if ((this.referenceEquals(this.RouteField, value))) {
      this.RouteField = value;
      // this.RaisePropertyChanged("Route");
    }
  }
  public get Form(): ObjectInfo {
    return this.FormField;
  }
  public set Form(value: ObjectInfo) {
    if ((this.referenceEquals(this.FormField, value))) {
      this.FormField = value;
      //this.RaisePropertyChanged("Form");
    }
  }
  public get Statusflags(): StatusFlags {
    return this.StatusflagsField;
  }
  public set Statusflags(value: StatusFlags) {
    {
      if ((this.referenceEquals(this.StatusflagsField, value))) {
        this.StatusflagsField = value;
        //this.RaisePropertyChanged("Statusflags");
      }
    }
  }
  public get DrugProperties(): DrugProperty[] {
    return this.DrugPropertiesField;
  }
  public set DrugProperties(value: DrugProperty[]) {
    if ((this.referenceEquals(this.DrugPropertiesField, value))) {
      this.DrugPropertiesField = value;
      // this.RaisePropertyChanged("DrugProperties");
    }
  }
  public get IsControlledDrug(): string {
    return this.IsControlledDrugField;
  }
  public set IsControlledDrug(value: string) {
    if ((this.referenceEquals(this.IsControlledDrugField, value))) {
      this.IsControlledDrugField = value;
      // this.RaisePropertyChanged("IsControlledDrug");
    }
  }
  public get OtherDispensingInstruction(): string {
    return this.OtherDispensingInstructionField;
  }
  public set OtherDispensingInstruction(value: string) {
    if ((this.referenceEquals(this.OtherDispensingInstructionField, value))) {
      this.OtherDispensingInstructionField = value;
      //  this.RaisePropertyChanged("OtherDispensingInstruction");
    }
  }
  public get OtherAdminInstruction(): string {
    return this.OtherAdminInstructionField;
  }
  public set OtherAdminInstruction(value: string) {
    if ((this.referenceEquals(this.OtherAdminInstructionField, value))) {
      this.OtherAdminInstructionField = value;
      //  this.RaisePropertyChanged("OtherAdminInstruction");
    }
  }
  public get IdentifyingDomain(): string {
    return this.IdentifyingDomainField;
  }
  public set IdentifyingDomain(value: string) {
    if ((this.referenceEquals(this.IdentifyingDomainField, value))) {
      this.IdentifyingDomainField = value;
      // this.RaisePropertyChanged("IdentifyingDomain");
    }
  }
  public get AdminIdentifyingDomain(): string {
    return this.AdminIdentifyingDomainField;
  }
  public set AdminIdentifyingDomain(value: string) {
    if ((this.referenceEquals(this.AdminIdentifyingDomainField, value))) {
      this.AdminIdentifyingDomainField = value;
      //this.RaisePropertyChanged("AdminIdentifyingDomain");
    }
  }
  public get TechSupplyInstruction(): string {
    return this.TechSupplyInstructionField;
  }
  public set TechSupplyInstruction(value: string) {
    if ((this.referenceEquals(this.TechSupplyInstructionField, value))) {
      this.TechSupplyInstructionField = value;
      // this.RaisePropertyChanged("TechSupplyInstruction");
    }
  }
}
export class PresItemBasicProperties extends PresItemCommonProperties {
  private defaultchkField = '';
  private DirectionField: ObjectInfo = new ObjectInfo();
  private DurationField: MeasurableObject = new MeasurableObject();
  private SiteField: ObjectInfo = new ObjectInfo();
  private QuantityField: MeasurableObject = new MeasurableObject();
  private DoseField: PrescriptionItemDose = new PrescriptionItemDose();
  private FrequencyDetailsField: FrequencyDetails = new FrequencyDetails();
  private PatientProblemField: Indication[] = [];
  private IsPresItemLevelDispenseField = '';


  get MeasurableObject(): string {
    return this.defaultchkField;
  }
  set MeasurableObject(value: string) {
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

  get Quantity(): MeasurableObject {
    return this.QuantityField;
  }
  set Quantity(value: MeasurableObject) {
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
    if (this.IsPresItemLevelDispenseField == value) {
      this.IsPresItemLevelDispenseField = value;
      // this.RaisePropertyChanged("IsPresItemLevelDispense");
    }
  }
}

export class MeasurableObject extends CLZOObject {

  private OIDField: number = 0;

  private ValueField: number = 0;

  private UOMOIDField: number = 0;

  private UOMNameField: string = "";

  private RecordedDateField: Date = new Date();

  private UOMCodeField: string = "";
  public get OID(): number {
    return this.OIDField;
  }
  public set OID(value: number) {
    if (!(this.OIDField === value)) {
      this.OIDField = value;
      // this.RaisePropertyChanged("OID");
    }
  }
  public get Value(): number {
    return this.ValueField;
  }
  public set Value(value: number) {
    if (!(this.ValueField === value)) {
      this.ValueField = value;
      //  this.RaisePropertyChanged("Value");
    }
  }

  public get UOMOID(): number {
    return this.UOMOIDField;
  }
  public set UOMOID(value: number) {
    if (!(this.UOMOIDField === value)) {
      this.UOMOIDField = value;
      // this.RaisePropertyChanged("UOMOID");
    }
  }
  public get UOMName(): string {
    return this.UOMNameField;
  }
  public set UOMName(value: string) {
    if ((this.referenceEquals(this.UOMNameField, value))) {
      this.UOMNameField = value;
      // this.RaisePropertyChanged("UOMName");
    }
  }
  public get RecordedDate(): Date {
    return this.RecordedDateField;
  }
  public set RecordedDate(value: Date) {
    if (!(this.RecordedDateField === value)) {
      this.RecordedDateField = value;
      // this.RaisePropertyChanged("RecordedDate");
    }
  }
  public get UOMCode(): string {
    return this.UOMCodeField;
  }
  public set UOMCode(value: string) {
    if ((this.referenceEquals(this.UOMCodeField, value))) {
      this.UOMCodeField = value;
      // this.RaisePropertyChanged("UOMCode");
    }
  }
}
export class PrescriptionItemDose extends CLZOObject {
  private DoseTypeField: ObjectInfo = new ObjectInfo();
  private DoseRegimeField: DoseRegime[] = [];
  private ObservationResultField: ObjectInfo = new ObjectInfo();

  public get DoseType(): ObjectInfo {
    return this.DoseTypeField;
  }
  public set DoseType(value: ObjectInfo) {
    if ((this.referenceEquals(this.DoseTypeField, value))) {
      this.DoseTypeField = value;
      // this.RaisePropertyChanged("DoseType");
    }
  }
  public get DoseRegime(): DoseRegime[] {
    return this.DoseRegimeField;
  }
  public set DoseRegime(value: DoseRegime[]) {
    if ((this.referenceEquals(this.DoseRegimeField, value))) {
      this.DoseRegimeField = value;
      //  this.RaisePropertyChanged("DoseRegime");
    }
  }
   get ObservationResult(): ObjectInfo {
    return this.ObservationResultField;
  }
  set ObservationResult(value: ObjectInfo) {
    if ((this.referenceEquals(this.ObservationResultField, value))) {
      this.ObservationResultField = value;
      //  this.RaisePropertyChanged("ObservationResult");
    }
  }
}
export class FrequencyDetails extends CLZOObject {
  private FrequencyField: ObjectInfo = new ObjectInfo();
  private IsFixedAdministrationField: string = '';
  private ScheduledTimesField: Scheduledetails[] = [];
  private StatIndicatorField: string = '';
  private StatDoseField: MeasurableObject = new MeasurableObject();
   get Frequency(): ObjectInfo {
    return this.FrequencyField;
  }
  set Frequency(value: ObjectInfo) {
    if ((this.referenceEquals(this.FrequencyField, value))) {
      this.FrequencyField = value;
      // this.RaisePropertyChanged("Frequency");
    }
  }
   get IsFixedAdministration(): string {
    return this.IsFixedAdministrationField;
  }
  set IsFixedAdministration(value: string) {
    if (!(this.IsFixedAdministrationField === value)) {
      this.IsFixedAdministrationField = value;
      //  this.RaisePropertyChanged("IsFixedAdministration");
    }
  }
   get ScheduledTimes(): Scheduledetails[] {
    return this.ScheduledTimesField;
  }
  set ScheduledTimes(value: Scheduledetails[]) {
    if ((this.referenceEquals(this.ScheduledTimesField, value))) {
      this.ScheduledTimesField = value;
      // this.RaisePropertyChanged("ScheduledTimes");
    }
  }
  public get StatIndicator(): string {
    return this.StatIndicatorField;
  }
  public set StatIndicator(value: string) {
    if (!(this.StatIndicatorField === value)) {
      this.StatIndicatorField = value;
      //this.RaisePropertyChanged("StatIndicator");
    }
  }
  public get StatDose(): MeasurableObject {
    return this.StatDoseField;
  }
  public set StatDose(value: MeasurableObject) {
    if ((this.referenceEquals(this.StatDoseField, value))) {
      this.StatDoseField = value;
      // this.RaisePropertyChanged("StatDose");
    }
  }
}
export class Indication extends CLZOObject {
  private CodingschemeCodeField: string = '';
  private VersionField: string = '';
  private CodeField: string = '';
  private TermField: string = '';
  private TermKeyField: string = '';
  private TypeField: string = '';
  public get CodingschemeCode(): string {
    return this.CodingschemeCodeField;
  }
  public set CodingschemeCode(value: string) {
    if ((this.referenceEquals(this.CodingschemeCodeField, value))) {
      this.CodingschemeCodeField = value;
      // this.RaisePropertyChanged("CodingschemeCode");
    }
  }
  public get Version(): string {
    return this.VersionField;
  }
  public set Version(value: string) {
    if ((this.referenceEquals(this.VersionField, value))) {
      this.VersionField = value;
      // this.RaisePropertyChanged("Version");
    }
  }

  public get Code(): string {
    return this.CodeField;
  }
  public set Code(value: string) {
    if ((this.referenceEquals(this.CodeField, value))) {
      this.CodeField = value;
      // this.RaisePropertyChanged("Code");
    }
  }



  public get Term(): string {
    return this.TermField;
  }
  public set Term(value: string) {
    if ((this.referenceEquals(this.TermField, value))) {
      this.TermField = value;
      //  this.RaisePropertyChanged("Term");
    }
  }

  public get TermKey(): string {
    return this.TermKeyField;
  }
  public set TermKey(value: string) {
    if ((this.referenceEquals(this.TermKeyField, value))) {
      this.TermKeyField = value;
      //this.RaisePropertyChanged("TermKey");
    }
  }

  public get Type(): string {
    return this.TypeField;
  }
  public set Type(value: string) {
    if ((this.referenceEquals(this.TypeField, value))) {
      this.TypeField = value;
      //   this.RaisePropertyChanged("Type");
    }
  }
}
export class IntravenousInfusionDetails extends CLZOObject {
  private FluidField: string = '';
  private VolumeField: string = '';
  private VolumeUOMField: UOM = new UOM();
  private InfusionPeriodField: string = '';
  private InfusionPeriodUOMField: UOM = new UOM();
  private RateField: string = '';
  private RateUOMField: UOM = new UOM();
  private HumidificationField: string = '';
  public get Fluid(): string {
    return this.FluidField;
  }
  public set Fluid(value: string) {
    if ((this.referenceEquals(this.FluidField, value))) {
      this.FluidField = value;
      // this.RaisePropertyChanged("Fluid");
    }
  }
  public get Volume(): string {
    return this.VolumeField;
  }
  public set Volume(value: string) {
    if ((this.referenceEquals(this.VolumeField, value))) {
      this.VolumeField = value;
      // this.RaisePropertyChanged("Volume");
    }
  }
  public get VolumeUOM(): UOM {
    return this.VolumeUOMField;
  }
  public set VolumeUOM(value: UOM) {
    if ((this.referenceEquals(this.VolumeUOMField, value))) {
      this.VolumeUOMField = value;
      //  this.RaisePropertyChanged("VolumeUOM");
    }
  }
  public get InfusionPeriod(): string {
    return this.InfusionPeriodField;
  }
  public set InfusionPeriod(value: string) {
    if ((this.referenceEquals(this.InfusionPeriodField, value))) {
      this.InfusionPeriodField = value;
      //  this.RaisePropertyChanged("InfusionPeriod");
    }
  }
  public get InfusionPeriodUOM(): UOM {
    return this.InfusionPeriodUOMField;
  }
  public set InfusionPeriodUOM(value: UOM) {
    if ((this.referenceEquals(this.InfusionPeriodUOMField, value))) {
      this.InfusionPeriodUOMField = value;
      //  this.RaisePropertyChanged("InfusionPeriodUOM");
    }
  }
  public get Rate(): string {
    return this.RateField;
  }
  public set Rate(value: string) {
    if ((this.referenceEquals(this.RateField, value))) {
      this.RateField = value;
      // this.RaisePropertyChanged("Rate");
    }
  }
  public get RateUOM(): UOM {
    return this.RateUOMField;
  }
  public set RateUOM(value: UOM) {
    if ((this.referenceEquals(this.RateUOMField, value))) {
      this.RateUOMField = value;
      // this.RaisePropertyChanged("RateUOM");
    }
  }

  public get Humidification(): string {
    return this.HumidificationField;
  }
  public set Humidification(value: string) {
    if ((this.referenceEquals(this.HumidificationField, value))) {
      this.HumidificationField = value;
      // this.RaisePropertyChanged("Humidification");
    }
  }
}
export class AdminDeviceDetails extends CLZOObject {
  private BackgroundRateField: string = '';
  private BackgroundRateUOMField: UOM = new UOM();
  private TopUpDoseField: string = '';
  private TopUpDoseUOMField: UOM = new UOM();
  private LockOutPeriodField: number = 0;
  private LockOutPeriodUOMField: UOM = new UOM();
  public get BackgroundRate(): string {
    return this.BackgroundRateField;
  }
  public set BackgroundRate(value: string) {
    if ((this.referenceEquals(this.BackgroundRateField, value))) {
      this.BackgroundRateField = value;
      // this.RaisePropertyChanged("BackgroundRate");
    }
  }
  public get BackgroundRateUOM(): UOM {
    return this.BackgroundRateUOMField;
  }
  public set BackgroundRateUOM(value: UOM) {
    if ((this.referenceEquals(this.BackgroundRateUOMField, value))) {
      this.BackgroundRateUOMField = value;
      //this.RaisePropertyChanged("BackgroundRateUOM");
    }
  }
   get TopUpDose(): string {
    return this.TopUpDoseField;
  }
  set TopUpDose(value: string) {
    if ((this.referenceEquals(this.TopUpDoseField, value))) {
      this.TopUpDoseField = value;
      //   this.RaisePropertyChanged("TopUpDose");
    }
  }
  public get TopUpDoseUOM(): UOM {
    return this.TopUpDoseUOMField;
  }
  public set TopUpDoseUOM(value: UOM) {
    if ((this.referenceEquals(this.TopUpDoseUOMField, value))) {
      this.TopUpDoseUOMField = value;
      //  this.RaisePropertyChanged("TopUpDoseUOM");
    }
  }
  public get LockOutPeriod(): number {
    return this.LockOutPeriodField;
  }
  public set LockOutPeriod(value: number) {
    if (!(this.LockOutPeriodField === value)) {
      this.LockOutPeriodField = value;
      // this.RaisePropertyChanged("LockOutPeriod");
    }
  }
  public get LockOutPeriodUOM(): UOM {
    return this.LockOutPeriodUOMField;
  }
  public set LockOutPeriodUOM(value: UOM) {
    if ((this.referenceEquals(this.LockOutPeriodUOMField, value))) {
      this.LockOutPeriodUOMField = value;
      // this.RaisePropertyChanged("LockOutPeriodUOM");
    }
  }
}
export class UOM extends CLZOObject {
  private UOMIdField: number = 0;
  private UOMNameField: string = '';
  public get UOMId(): number {
    return this.UOMIdField;
  }
  public set UOMId(value: number) {
    if (!(this.UOMIdField === value)) {
      this.UOMIdField = value;
      // this.RaisePropertyChanged("UOMId");
    }
  }
  public get UOMName(): string {
    return this.UOMNameField;
  }
  public set UOMName(value: string) {
    if ((this.referenceEquals(this.UOMNameField, value))) {
      this.UOMNameField = value;
      // this.RaisePropertyChanged("UOMName");
    }
  }
}
export class OnBehalfInfo extends CLZOObject {
  private NotifyFlagField: string = '';
  private OnBehalfOfUserField: ObjectInfo = new ObjectInfo();
  private OnBehalfOfUserReasonField: string = '';
  private CommunicationModeField: string = '';
  public get NotifyFlag(): string {
    return this.NotifyFlagField;
  }
  public set NotifyFlag(value: string) {
    if (!(this.NotifyFlagField === value)) {
      this.NotifyFlagField = value;
      //this.RaisePropertyChanged("NotifyFlag");
    }
  }
  public get OnBehalfOfUser(): ObjectInfo {
    return this.OnBehalfOfUserField;
  }
  public set OnBehalfOfUser(value: ObjectInfo) {
    if ((this.referenceEquals(this.OnBehalfOfUserField, value))) {
      this.OnBehalfOfUserField = value;
      //  this.RaisePropertyChanged("OnBehalfOfUser");
    }
  }
  public get OnBehalfOfUserReason(): string {
    return this.OnBehalfOfUserReasonField;
  }
  public set OnBehalfOfUserReason(value: string) {
    if ((this.referenceEquals(this.OnBehalfOfUserReasonField, value))) {
      this.OnBehalfOfUserReasonField = value;
      //this.RaisePropertyChanged("OnBehalfOfUserReason");
    }
  }
  public get CommunicationMode(): string {
    return this.CommunicationModeField;
  }
  public set CommunicationMode(value: string) {
    if ((this.referenceEquals(this.CommunicationModeField, value))) {
      this.CommunicationModeField = value;
      // this.RaisePropertyChanged("CommunicationMode");
    }
  }
}
export  class StatusFlags 
{

    private HasWarningsField='';
    private IsHoldField='';
    private PrintStatusField='';
    private HasDoseCalculationField='';
    private IsTechValidateField='';

        get HasWarnings():string
        {
            return this.HasWarningsField;
        }
        set HasWarnings(value:string)
        {
            if ((this.HasWarningsField!=(value)))
            {
                this.HasWarningsField = value;
                // this.RaisePropertyChanged("HasWarnings");
            }
        }
        get IsHold():string
        {
            return this.IsHoldField;
        }
        set IsHold(value:string)
        {
            if ((this.IsHoldField!=(value) ))
            {
                this.IsHoldField = value;
                // this.RaisePropertyChanged("IsHold");
            }
        }
        get PrintStatus():string
        {
            return this.PrintStatusField;
        }
        set PrintStatus(value:string)
        {
            if ((this.PrintStatusField!=(value)))
            {
                this.PrintStatusField = value;
                // this.RaisePropertyChanged("PrintStatus");
            }
        }

        get HasDoseCalculation():string
        {
            return this.HasDoseCalculationField;
        }
        set HasDoseCalculation(value:string)
        {
            if ((this.HasDoseCalculationField!=(value)))
            {
                this.HasDoseCalculationField = value;
                // this.RaisePropertyChanged("HasDoseCalculation");
            }
        }

        get IsTechValidate():string
        {
            return this.IsTechValidateField;
        }
        set IsTechValidate(value:string)
        {
            if ( JSON.stringify(this.IsTechValidateField)!= JSON.stringify(value))
            {
                this.IsTechValidateField = value;
                // this.RaisePropertyChanged("IsTechValidate");
            }
        }
    

}
export class DoseRegime extends CLZOObject
{

    private LowerDoseField=0;

    private UpperDoseField=0;

    private DoseUOMField:UOM= new UOM();

    private DurationField:MeasurableObject= new MeasurableObject();

    private QuantityField:MeasurableObject= new MeasurableObject();

    private  DirectionField:ObjectInfo= new ObjectInfo();

    private PrescibableItemOIDField=0;

    private StartDTTMField:Date= new Date();

    private EndDTTMField:Date= new Date();

    private LowerObservationRangeField=0;

    private UpperObservationRangeField=0;

    private ObservationRangeUOMField:UOM= new UOM();

    private DosingInstructionField='';

    private  FrequencyDetailsField:FrequencyDetails= new FrequencyDetails();

    private DurationUOMCodeField='';


        get LowerDose():number
        {
            return this.LowerDoseField;
        }
        set LowerDose(value:number)
        {
            if ((this.LowerDoseField!=(value)))
            {
                this.LowerDoseField = value;
                // this.RaisePropertyChanged("LowerDose");
            }
        }

        get UpperDose():number
        {
            return this.UpperDoseField;
        }
        set UpperDose(value:number)
        {
            if ((this.UpperDoseField!=(value)))
            {
                this.UpperDoseField = value;
                // this.RaisePropertyChanged("UpperDose");
            }
        }


        get DoseUOM():UOM
        { 
            return this.DoseUOMField;
        }
        set DoseUOM(value:UOM)
        {
            if ((this.referenceEquals(this.DoseUOMField, value) ))
            {
                this.DoseUOMField = value;
                // this.RaisePropertyChanged("DoseUOM");
            }
        }

        get Duration():MeasurableObject
        {
            return this.DurationField;
        }
        set Duration(value:MeasurableObject)
        {
            if ((this.referenceEquals(this.DurationField, value) ))
            {
                this.DurationField = value;
                // this.RaisePropertyChanged("Duration");
            }
        }

        get Quantity():MeasurableObject
        {
            return this.QuantityField;
        }
        set Quantity(value:MeasurableObject)
        {
            if ((this.referenceEquals(this.QuantityField, value)))
            {
                this.QuantityField = value;
                // this.RaisePropertyChanged("Quantity");
            }
        }

        get Direction():ObjectInfo
        {
            return this.DirectionField;
        }
        set Direction(value:ObjectInfo)
        {
            if ((this.referenceEquals(this.DirectionField, value) ))
            {
                this.DirectionField = value;
                // this.RaisePropertyChanged("Direction");
            }
          }
 
        get PrescibableItemOID():number
        {
            return this.PrescibableItemOIDField;
        }
        set PrescibableItemOID(value:number)
        {
            if ((this.PrescibableItemOIDField!=(value)))
            {
                this.PrescibableItemOIDField = value;
                // this.RaisePropertyChanged("PrescibableItemOID");
            }
        }

        get StartDTTM():Date
        {
            return this.StartDTTMField;
        }
        set StartDTTM(value:Date)
        {
            if ((this.StartDTTMField!=(value)))
            {
                this.StartDTTMField = value;
                // this.RaisePropertyChanged("StartDTTM");
            }
        }

        get EndDTTM():Date
        {
            return this.EndDTTMField;
        }
        set EndDTTM(value:Date)
        {
            if ((this.EndDTTMField!=(value)))
            {
                this.EndDTTMField = value;
                // this.RaisePropertyChanged("EndDTTM");
            }
        }

        get LowerObservationRange():number
        {
            return this.LowerObservationRangeField;
        }
        set LowerObservationRange(value:number)
        {
            if ((this.LowerObservationRangeField!=(value)))
            {
                this.LowerObservationRangeField = value;
                // this.RaisePropertyChanged("LowerObservationRange");
            }
        }

        get UpperObservationRange():number
        { 
            return this.UpperObservationRangeField;
        }
        set UpperObservationRange(value:number)
        {
            if ((this.UpperObservationRangeField!=(value)))
            {
                this.UpperObservationRangeField = value;
                // this.RaisePropertyChanged("UpperObservationRange");
            }
        }

        get ObservationRangeUOM():UOM
        {
            return this.ObservationRangeUOMField;
        }
        set ObservationRangeUOM(value:UOM)
        {
            if ((this.referenceEquals(this.ObservationRangeUOMField, value) != true))
            {
                this.ObservationRangeUOMField = value;
                // this.RaisePropertyChanged("ObservationRangeUOM");
            }
        }


        get DosingInstruction():string
        {
            return this.DosingInstructionField;
        }
        set DosingInstruction(value:string)
        {
            if ((this.referenceEquals(this.DosingInstructionField, value)))
            {
                this.DosingInstructionField = value;
                // this.RaisePropertyChanged("DosingInstruction");
            }
        }

        get FrequencyDetails():FrequencyDetails
        {
            return this.FrequencyDetailsField;
        }
        set FrequencyDetails(value:FrequencyDetails)
        {
            if ((this.referenceEquals(this.FrequencyDetailsField, value) ))
            {
                this.FrequencyDetailsField = value;
                // this.RaisePropertyChanged("FrequencyDetails");
            }
        }
   
        get DurationUOMCode():string
        {
            return this.DurationUOMCodeField;
        }
        set DurationUOMCode(value:string)
        {
            if ((this.referenceEquals(this.DurationUOMCodeField, value) ))
            {
                this.DurationUOMCodeField = value;
                // this.RaisePropertyChanged("DurationUOMCode");
            }
        }
}

export class Scheduledetails extends CLZOObject
{

    private ItemFrequencyOIDField=0;

    private ScheduledTimeInMinsField=0;

    private ScheduledTimeField='';

    private MappedDrugRoundTimeInMinsField=0;

    private MappedDrugRoundTimeField='';

    private ScheduleTimeField=0;

    private EncounterOIDField=0;

    private MCVersionField='';


        get ItemFrequencyOID():number
        {
            return this.ItemFrequencyOIDField;
        }
        set ItemFrequencyOID(value:number)
        {
            if ((this.ItemFrequencyOIDField!=(value) ))
            {
                this.ItemFrequencyOIDField = value;
                // this.RaisePropertyChanged("ItemFrequencyOID");
            }
        }

        get ScheduledTimeInMins():number
        {
            return this.ScheduledTimeInMinsField;
        }
        set ScheduledTimeInMins(value:number)
        {
            if ((this.ScheduledTimeInMinsField!=(value)))
            {
                this.ScheduledTimeInMinsField = value;
                // this.RaisePropertyChanged("ScheduledTimeInMins");
            }
        }

        get ScheduledTime():string
        {
            return this.ScheduledTimeField;
        }
        set ScheduledTime(value:string)
        {
            if ((this.referenceEquals(this.ScheduledTimeField, value)))
            {
                this.ScheduledTimeField = value;
                // this.RaisePropertyChanged("ScheduledTime");
            }
        }

        get MappedDrugRoundTimeInMins():number
        {
            return this.MappedDrugRoundTimeInMinsField;
        } 
        set MappedDrugRoundTimeInMins(value:number)
        {
            if ((this.MappedDrugRoundTimeInMinsField!=(value)))
            {
                this.MappedDrugRoundTimeInMinsField = value;
                // this.RaisePropertyChanged("MappedDrugRoundTimeInMins");
            }
        }

        get MappedDrugRoundTime():string
        {
            return this.MappedDrugRoundTimeField;
        }
        set MappedDrugRoundTime(value:string)
        {
            if ((this.referenceEquals(this.MappedDrugRoundTimeField, value)))
            {
                this.MappedDrugRoundTimeField = value;
                // this.RaisePropertyChanged("MappedDrugRoundTime");
            }
        }

        get ScheduleTime():number
        {
            return this.ScheduleTimeField;
        }
        set ScheduleTime(value:number)
        {
            if ((this.ScheduleTimeField!=(value)))
            {
                this.ScheduleTimeField = value;
                // this.RaisePropertyChanged("ScheduleTime");
            }
        }

        get EncounterOID():number
        {
            return this.EncounterOIDField;
        }
        set EncounterOID(value:number)
        {
            if ((this.EncounterOIDField!=(value)))
            {
                this.EncounterOIDField = value;
                // this.RaisePropertyChanged("EncounterOID");
            }
        }

        get MCVersion():string
        {
            return this.MCVersionField;
        }
        set MCVersion(value:string)
        {
            if ((this.referenceEquals(this.MCVersionField, value)))
            {
                this.MCVersionField = value;
                // this.RaisePropertyChanged("MCVersion");
            }
        }
}

export class AdminMethod extends CLZOObject
{

    private AdminMethodIdField=0;

    private  AdminMethodNameField='';

        get AdminMethodId():number
        {
            return this.AdminMethodIdField;
        }
        set AdminMethodId(value:number)
        {
            if ((this.AdminMethodIdField!=(value)))
            {
                this.AdminMethodIdField = value;
                // this.RaisePropertyChanged("AdminMethodId");
            }
        }

        get AdminMethodName():string
        {
            return this.AdminMethodNameField;
        } 
        set AdminMethodName(value:string)
        {
            if ((this.referenceEquals(this.AdminMethodNameField, value) ))
            {
                this.AdminMethodNameField = value;
                // this.RaisePropertyChanged("AdminMethodName");
            }
        }
}

export class Frequencys extends CLZOObject
{

    private  FrequencyvalueField=0;
    private  FrequencyIdField=0;
    private  FrequencyNameField='';
    private  ShortNameField='';

        get Frequencyvalue():number
        { 
            return this.FrequencyvalueField;
        } 
        set Frequencyvalue(value:number)
        {
            if ((this.FrequencyvalueField!=(value)))
            {
                this.FrequencyvalueField = value;
                // this.RaisePropertyChanged("Frequencyvalue");
            }
        }

        get FrequencyId():number
        {
            return this.FrequencyIdField;
        }
        set FrequencyId(value:number)
        {
            if ((this.FrequencyIdField!=(value)))
            {
                this.FrequencyIdField = value;
                // this.RaisePropertyChanged("FrequencyId");
            }
        }

        get FrequencyName():string
        {
            return this.FrequencyNameField;
        }
        set FrequencyName(value:string)
        {
            if ((this.referenceEquals(this.FrequencyNameField, value) ))
            {
                this.FrequencyNameField = value;
                // this.RaisePropertyChanged("FrequencyName");
            }
        }

        get ShortName():string
        {
            return this.ShortNameField;
        }
        set ShortName(value:string)
        {
            if ((this.referenceEquals(this.ShortNameField, value) ))
            {
                this.ShortNameField = value;
                // this.RaisePropertyChanged("ShortName");
            }
        }
}

export class Frequency extends CLZOObject
{

    private  FrequencyvalueField=0;

    private  FrequencyIdField=0;

    private FrequencyNameField='';

    private ShortNameField='';

    private IsPRNField='';

        get Frequencyvalue():number
        {
            return this.FrequencyvalueField;
        }
        set Frequencyvalue(value:number)
        {
            if ((this.FrequencyvalueField!=(value)))
            {
                this.FrequencyvalueField = value;
                // this.RaisePropertyChanged("Frequencyvalue");
            }
        }
  
        get FrequencyId():number
        {
            return this.FrequencyIdField;
        }
        set FrequencyId(value:number)
        {
            if ((this.FrequencyIdField!=(value)))
            {
                this.FrequencyIdField = value;
                // this.RaisePropertyChanged("FrequencyId");
            }
        }

        get FrequencyName():string
        {
            return this.FrequencyNameField;
        }
        set FrequencyName(value:string)
        {
            if ((this.referenceEquals(this.FrequencyNameField, value)))
            {
                this.FrequencyNameField = value;
                // this.RaisePropertyChanged("FrequencyName");
            }
        }
        get ShortName():string
        {
            return this.ShortNameField;
        }
        set ShortName(value:string)
        {
            if ((this.referenceEquals(this.ShortNameField, value) ))
            {
                this.ShortNameField = value;
                // this.RaisePropertyChanged("ShortName");
            }
        }
  
        get IsPRN():string
        {
            return this.IsPRNField;
        }
        set IsPRN(value:string)
        {
            if ((this.referenceEquals(this.IsPRNField, value) ))
            {
                this.IsPRNField = value;
                // this.RaisePropertyChanged("IsPRN");
            }
        }
}

export class Site extends CLZOObject
{

    private  SiteIdField=0;
    private SiteNameField='';
    private DataProviderField='';

        get SiteId():number
        {
            return this.SiteIdField;
        }
        set SiteId(value:number)
        {
            if ((this.SiteIdField!=(value)))
            {
                this.SiteIdField = value;
                // this.RaisePropertyChanged("SiteId");
            }
        }

        get SiteName():string
        {
            return this.SiteNameField;
        }
        set SiteName(value:string)
        {
            if ((this.referenceEquals(this.SiteNameField, value)))
            {
                this.SiteNameField = value;
                // this.RaisePropertyChanged("SiteName");
            }
        }


        get DataProvider():string
        {
            return this.DataProviderField;
        }
        set DataProvider(value:string)
        {
            if ((this.referenceEquals(this.DataProviderField, value) ))
            {
                this.DataProviderField = value;
                // this.RaisePropertyChanged("DataProvider");
            }
        }
}
export class DoseDetails extends CLZOObject {

  private FromDoseValueField: string = '';
  private FromDoseUOMField: UOM = new UOM();
  private ToDoseValueField: string = '';
  private ToDoseUOMField: UOM = new UOM();
  private FrequencyField: Frequency = new Frequency();
  private DurationField: number = 0;
  private PeriodField: string = '';
  private VariableDoseInstrField: string = '';
  private StartDttmField: Date = new Date();
  private EndDttmField: Date = new Date();
  private PrescibableItemOIDField: number = 0;
  private QualifierNameField: string = '';
  private StartValueField: string = '';
  private EndValueField: string = '';
  private ValueUOMField: UOM = new UOM();
  private DurationUOMField: UOM = new UOM();
  private DirectionField: string = '';
  private QuantityField: number = 0;
  private QuantityUOMField: UOM = new UOM();
  private LowerObservationRangeField: number = 0;
  private UpperObservationRangeField: number = 0;;
  private ObservationRangeUOMField: UOM = new UOM();
  private DosingInstructionField: string = '';
  private FrequencyDetailsField: FrequencyDetails = new FrequencyDetails();
  private LowerDoseField: string = '';
  private LowerUOMOIDField: number = 0;
  private UpperDoseField: string = '';
  private UpperUOMOIDField: number = 0;
  private MCVersionField: string = '';
  private IsCopyFavField: string = '';
  private DurationUOMOIDField: number = 0;
  private IsPRNField: string = '';
  private DurationUOMCodeField: string = '';
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false)]
  public get FromDoseValue(): string {
    return this.FromDoseValueField;
  }
  public set FromDoseValue(value: string) {
    if ((this.referenceEquals(this.FromDoseValueField, value))) {
      this.FromDoseValueField = value;
      // this.RaisePropertyChanged("FromDoseValue");
    }
  }
  public get FromDoseUOM(): UOM {
    return this.FromDoseUOMField;
  }
  public set FromDoseUOM(value: UOM) {
    if ((this.referenceEquals(this.FromDoseUOMField, value))) {
      this.FromDoseUOMField = value;
      // this.RaisePropertyChanged("FromDoseUOM");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 2)]
  public get ToDoseValue(): string {
    return this.ToDoseValueField;
  }
  public set ToDoseValue(value: string) {
    if ((this.referenceEquals(this.ToDoseValueField, value))) {
      this.ToDoseValueField = value;
      // this.RaisePropertyChanged("ToDoseValue");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 3)]
  public get ToDoseUOM(): UOM {
    return this.ToDoseUOMField;
  }
  public set ToDoseUOM(value: UOM) {
    if ((this.referenceEquals(this.ToDoseUOMField, value))) {
      this.ToDoseUOMField = value;
      //  this.RaisePropertyChanged("ToDoseUOM");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 4)]
  public get Frequency(): Frequency {
    return this.FrequencyField;
  }
  public set Frequency(value: Frequency) {
    if ((this.referenceEquals(this.FrequencyField, value))) {
      this.FrequencyField = value;
      // this.RaisePropertyChanged("Frequency");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 5)]
  public get Duration(): number {
    return this.DurationField;
  }
  public set Duration(value: number) {
    if (!(this.DurationField === value)) {
      this.DurationField = value;
      //  this.RaisePropertyChanged("Duration");
    }
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 6)]
  public get Period(): string {
    return this.PeriodField;
  }
  public set Period(value: string) {
    if ((this.referenceEquals(this.PeriodField, value) != true)) {
      this.PeriodField = value;
      //this.RaisePropertyChanged("Period");
    }
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 7)]
  public get VariableDoseInstr(): string {
    return this.VariableDoseInstrField;
  }
  public set VariableDoseInstr(value: string) {
    if ((this.referenceEquals(this.VariableDoseInstrField, value))) {
      this.VariableDoseInstrField = value;
      // this.RaisePropertyChanged("VariableDoseInstr");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 8)]
  public get StartDttm(): Date {
    return this.StartDttmField;
  }
  public set StartDttm(value: Date) {
    if (!(this.StartDttmField === value)) {
      this.StartDttmField = value;
      //this.RaisePropertyChanged("StartDttm");
    }
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 9)]
  public get EndDttm(): Date {
    return this.EndDttmField;
  }
  public set EndDttm(value: Date) {
    if (!(this.EndDttmField === value)) {
      this.EndDttmField = value;
      // this.RaisePropertyChanged("EndDttm");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 10)]
  public get PrescibableItemOID(): number {
    return this.PrescibableItemOIDField;
  }
  public set PrescibableItemOID(value: number) {
    if ((this.PrescibableItemOIDField === value)) {
      this.PrescibableItemOIDField = value;
      //  this.RaisePropertyChanged("PrescibableItemOID");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 11)]
  public get QualifierName(): string {
    return this.QualifierNameField;
  }
  public set QualifierName(value: string) {
    if ((this.referenceEquals(this.QualifierNameField, value) != true)) {
      this.QualifierNameField = value;
      // this.RaisePropertyChanged("QualifierName");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 12)]
  public get StartValue(): string {
    return this.StartValueField;
  }
  public set StartValue(value: string) {
    if ((this.referenceEquals(this.StartValueField, value) != true)) {
      this.StartValueField = value;
      // this.RaisePropertyChanged("StartValue");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 13)]
  public get EndValue(): string {
    return this.EndValueField;
  }
  public set EndValue(value: string) {
    if ((this.referenceEquals(this.EndValueField, value))) {
      this.EndValueField = value;
      //  this.RaisePropertyChanged("EndValue");
    }
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 14)]
  public get ValueUOM(): UOM {
    return this.ValueUOMField;
  }
  public set ValueUOM(value: UOM) {
    if ((this.referenceEquals(this.ValueUOMField, value))) {
      this.ValueUOMField = value;
      //  this.RaisePropertyChanged("ValueUOM");
    }
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 15)]
  public get DurationUOM(): UOM {
    return this.DurationUOMField;
  }
  public set DurationUOM(value: UOM) {
    if ((this.referenceEquals(this.DurationUOMField, value))) {
      this.DurationUOMField = value;
      //this.RaisePropertyChanged("DurationUOM");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 16)]
  public get Direction(): string {
    return this.DirectionField;
  }
  public set Direction(value: string) {
    if ((this.referenceEquals(this.DirectionField, value) != true)) {
      this.DirectionField = value;
      // this.RaisePropertyChanged("Direction");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 17)]
  public get Quantity(): number {
    return this.QuantityField;
  }
  public set Quantity(value: number) {
    if (!(this.QuantityField === value)) {
      this.QuantityField = value;
      //   this.RaisePropertyChanged("Quantity");
    }
  }

  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 18)]
  public get QuantityUOM(): UOM {
    return this.QuantityUOMField;
  }
  public set QuantityUOM(value: UOM) {
    if ((this.referenceEquals(this.QuantityUOMField, value) != true)) {
      this.QuantityUOMField = value;
      //  this.RaisePropertyChanged("QuantityUOM");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 19)]
  public get LowerObservationRange(): number {
    return this.LowerObservationRangeField;
  }
  public set LowerObservationRange(value: number) {
    if (!(this.LowerObservationRangeField === value)) {
      this.LowerObservationRangeField = value;
      //  this.RaisePropertyChanged("LowerObservationRange");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 20)]
  public get UpperObservationRange(): number {
    return this.UpperObservationRangeField;
  }
  public set UpperObservationRange(value: number) {
    if (!(this.UpperObservationRangeField === value)) {
      this.UpperObservationRangeField = value;
      // this.RaisePropertyChanged("UpperObservationRange");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 21)]
  public get ObservationRangeUOM(): UOM {
    return this.ObservationRangeUOMField;
  }
  public set ObservationRangeUOM(value: UOM) {
    if ((this.referenceEquals(this.ObservationRangeUOMField, value) != true)) {
      this.ObservationRangeUOMField = value;
      //this.RaisePropertyChanged("ObservationRangeUOM");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 22)]
  public get DosingInstruction(): string {
    return this.DosingInstructionField;
  }
  public set DosingInstruction(value: string) {
    if ((this.referenceEquals(this.DosingInstructionField, value) != true)) {
      this.DosingInstructionField = value;
      // this.RaisePropertyChanged("DosingInstruction");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 23)]
  public get FrequencyDetails(): FrequencyDetails {
    return this.FrequencyDetailsField;
  }
  public set FrequencyDetails(value: FrequencyDetails) {
    if ((this.referenceEquals(this.FrequencyDetailsField, value))) {
      this.FrequencyDetailsField = value;
      // this.RaisePropertyChanged("FrequencyDetails");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 24)]
  public get LowerDose(): string {
    return this.LowerDoseField;
  }
  public set LowerDose(value: string) {
    if ((this.referenceEquals(this.LowerDoseField, value) != true)) {
      this.LowerDoseField = value;
      //this.RaisePropertyChanged("LowerDose");
    }
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 25)]
  public get LowerUOMOID(): number {
    return this.LowerUOMOIDField;
  }
  public set LowerUOMOID(value: number) {
    if (!(this.LowerUOMOIDField === value)) {
      this.LowerUOMOIDField = value;
      //   this.RaisePropertyChanged("LowerUOMOID");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 26)]
  public get UpperDose(): string {
    return this.UpperDoseField;
  }
  public set UpperDose(value: string) {
    if ((this.referenceEquals(this.UpperDoseField, value) != true)) {
      this.UpperDoseField = value;
      //  this.RaisePropertyChanged("UpperDose");
    }
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 27)]
  public get UpperUOMOID(): number {
    return this.UpperUOMOIDField;
  }
  public set UpperUOMOID(value: number) {
    if (!(this.UpperUOMOIDField === value)) {
      this.UpperUOMOIDField = value;
      // this.RaisePropertyChanged("UpperUOMOID");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 28)]
  public get MCVersion(): string {
    return this.MCVersionField;
  }
  public set MCVersion(value: string) {
    if ((this.referenceEquals(this.MCVersionField, value))) {
      this.MCVersionField = value;
      // this.RaisePropertyChanged("MCVersion");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 29)]
  public get IsCopyFav(): string {
    return this.IsCopyFavField;
  }
  public set IsCopyFav(value: string) {
    if ((this.referenceEquals(this.IsCopyFavField, value))) {
      this.IsCopyFavField = value;
      //this.RaisePropertyChanged("IsCopyFav");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 30)]
  public get DurationUOMOID(): number {
    return this.DurationUOMOIDField;
  }
  public set DurationUOMOID(value: number) {
    if (!(this.DurationUOMOIDField === value)) {
      this.DurationUOMOIDField = value;
      //  this.RaisePropertyChanged("DurationUOMOID");
    }
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 31)]
  public get IsPRN(): string {
    return this.IsPRNField;
  }
  public set IsPRN(value: string) {
    if (!(this.IsPRNField === value)) {
      this.IsPRNField = value;
      // this.RaisePropertyChanged("IsPRN");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 32)]
  public get DurationUOMCode(): string {
    return this.DurationUOMCodeField;
  }
  public set DurationUOMCode(value: string) {
    if ((this.referenceEquals(this.DurationUOMCodeField, value) != true)) {
      this.DurationUOMCodeField = value;
      //this.RaisePropertyChanged("DurationUOMCode");
    }
  }

}